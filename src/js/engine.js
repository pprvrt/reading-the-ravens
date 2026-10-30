/* ===================== FIELD ENGINE ===================== */
const NS = 'http://www.w3.org/2000/svg';
const S = 10, FW = 160 / 3, MID = FW / 2, HL = 23.583, HR = 29.75, SP = 2.2;
const RM = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
let UID = 0;
function sv(tag, a, p) { const e = document.createElementNS(NS, tag); if (a) for (const k in a) e.setAttribute(k, a[k]); if (p) p.appendChild(e); return e; }
function hx(tag, a, p, html) { const e = document.createElement(tag); if (a) for (const k in a) { if (k === 'class') e.className = a[k]; else e.setAttribute(k, a[k]); } if (html != null) e.innerHTML = html; if (p) p.appendChild(e); return e; }
const OLX = [MID - 2 * SP, MID - SP, MID, MID + SP, MID + 2 * SP];
/* illustrations show roles, not players: Ravens initials map back to position letters */
const ROLE_LAB = { TH: 'E', TR: 'E', MG: 'E', NM: 'T', TJ: 'N', CC: 'T', BW: 'T', RS: 'M', TB: 'W', TS: 'W', KH: 'S', JH: 'S', MS: 'S', NW: 'CB', MH: 'CB', KM: 'CB', KJ: 'S' };
const VMAX = 10; // yd/s, roughly 20.5 mph: the ceiling for any scripted segment

/* build keyframes [[t,x,y],...] from a compact player spec */
function track(p) {
  if (p.kf) return p.kf;
  let cur = [p.x, p.y];
  const kf = [[-60, cur[0], cur[1]]];
  const walk = (pts, t, v) => {
    kf.push([t, cur[0], cur[1]]);
    for (const q of pts) {
      if (q.stay) continue;
      if (q.w != null) { t += q.w; kf.push([t, cur[0], cur[1]]); continue; }
      if (q.v != null) { v = q.v; continue; }
      const dist = Math.hypot(q[0] - cur[0], q[1] - cur[1]);
      // a forced arrival time may slow a player down, never push him past a human top speed
      const nt = q[2] != null ? Math.max(q[2], t + dist / VMAX) : t + dist / v;
      t = Math.max(nt, t + 0.01); cur = [q[0], q[1]]; kf.push([t, cur[0], cur[1]]);
    }
    return t;
  };
  let tEnd = -60;
  if (p.pre) tEnd = walk(p.pre.pts, p.pre.t0, p.pre.v || 6);
  if (p.m) walk(p.m, Math.max(p.d || 0, tEnd, 0), p.v || 7);
  kf.push([60, cur[0], cur[1]]);
  return kf;
}
/* ---------- after-path simulation ----------
   Scripted paths describe each player's assignment. When a path ends before the whistle,
   the player keeps playing: defenders pursue the ball (or mirror receivers while the QB
   still holds it on a pass), blockers latch onto the nearest defender and sustain,
   receivers keep running or convoy for the ball carrier, fakers carry out the fake.  */
function finalize(sc) {
  if (sc._fin || sc.static) return sc;
  sc._fin = true;
  sc._ev = ballEvents(sc);
  const pl = sc.players, dt = 0.05;
  pl.forEach(p => { p.kf = track(p); });
  const tEnd = sc.end != null ? sc.end : sc.t[1];
  const S = {}, DEF = pl.filter(p => p.side === 'def'), OFF = pl.filter(p => p.side !== 'def');
  const vy1 = (sc.view && sc.view.y1 != null ? sc.view.y1 : 20) - 1.5;
  pl.forEach(p => {
    const kf = p.kf; let li = kf.length - 2; const last = kf[li];
    const endT = last[0] < -50 ? 0 : Math.max(0, last[0]);
    let dir = [0, 1], spd = 0;
    for (let i = li; i > 0; i--) { const a = kf[i - 1], b = kf[i], d = Math.hypot(b[1] - a[1], b[2] - a[2]), tt = b[0] - a[0];
      if (a[0] > -50 && tt > 0 && d > 0.05) { dir = [(b[1] - a[1]) / d, (b[2] - a[2]) / d]; spd = d / tt; break; } }
    const stay = p.after === 'stay' || (p.m && p.m.some(q => q && q.stay));
    const q0 = posAt(kf, 0);
    S[p.id] = { p, endT, x: q0[0], y: q0[1], vx: 0, vy: 0, dir, spd, stay, ext: [], eng: null, engBy: null, shOff: null, shId: null, tack: null };
  });
  pl.forEach(p => { if (p.on && S[p.on]) S[p.on].heldBy = p.id; });
  const passLater = (t) => sc._ev.some(e => e.pass && !e.snap && e.t > t) || (sc.passPlay && !sc._ev.some(e => e.pass && !e.snap));
  function ball(t) {
    let holder = null, fl = null;
    for (const e of sc._ev) { if (e.t > t) break; if (e.hold != null) { holder = e.hold; fl = null; } if (e.pass) { if (t < e.at) fl = e; else { holder = e.pass; fl = null; } } }
    if (fl && !fl.snap && S[fl.pass]) { const s = S[fl.pass], r = fl.at - t; return { air: true, holder: null, target: fl.pass, x: s.x + s.vx * r, y: s.y + s.vy * r }; }
    if (fl && fl.snap) holder = 'QB';
    if (holder && S[holder]) return { air: false, holder, x: S[holder].x, y: S[holder].y };
    return { air: false, holder: null, x: null, y: null };
  }
  const move = (s, tx, ty, v) => { const dx = tx - s.x, dy = ty - s.y, d = Math.hypot(dx, dy), st = Math.min(d, v * dt * (s.f == null ? 1 : s.f)); if (d > 1e-6) { s.x += dx / d * st; s.y += dy / d * st; } };
  for (let i = 1; i * dt <= tEnd + 1e-6; i++) {
    const t = i * dt;
    const px = {}; pl.forEach(p => { const s = S[p.id]; px[p.id] = [s.x, s.y]; });
    pl.forEach(p => { const s = S[p.id]; if (t <= s.endT + 1e-9) { const q = posAt(p.kf, t); s.x = q[0]; s.y = q[1]; } else if (!s.go) { s.go = 1; s.f = Math.min(1, (t - s.endT) / dt); const q = posAt(p.kf, s.endT); s.x = q[0]; s.y = q[1]; px[p.id] = [s.x, s.y]; } else s.f = 1; });
    const B = ball(t), car = B.holder, pend = car === 'QB' && passLater(t);
    // offense after their scripts
    OFF.forEach(p => {
      const s = S[p.id]; if (t <= s.endT + 1e-9) return;
      const k = p.kind || 'route';
      if (p.id === car) {
        if (p.id !== 'QB' && !s.stay) { const d0 = [s.dir[0] * 0.4, s.dir[1] * 0.4 + 0.6], n = Math.hypot(d0[0], d0[1]); s.dir = [d0[0] / n, d0[1] / n]; move(s, s.x + s.dir[0] * 5, s.y + s.dir[1] * 5, Math.min(Math.max(s.spd, 6), 8.5)); }
        return;
      }
      if (k === 'block' || k === 'pp') {
        if (!s.eng && p.on && S[p.on]) { const d = S[p.on], dd = Math.hypot(d.x - s.x, d.y - s.y); if (dd <= 2.2) { s.eng = p.on; d.engBy = p.id; let o = [s.x - d.x, s.y - d.y], L = Math.hypot(o[0], o[1]) || 1; o = [o[0] / L * 1.8, o[1] / L * 1.8]; s.off = o; } else { move(s, d.x, d.y, 7.5); return; } }
        if (!s.eng && !p.on) { let best = null, bd = 1.9; DEF.forEach(d => { const sd = S[d.id]; if (sd.engBy || d.id === car) return; const dd = Math.hypot(sd.x - s.x, sd.y - s.y); if (dd < bd) { bd = dd; best = d.id; } }); if (best) { s.eng = best; S[best].engBy = p.id; const o = [s.x - S[best].x, s.y - S[best].y], L = Math.hypot(o[0], o[1]) || 1; s.off = [o[0] / L * 1.8, o[1] / L * 1.8]; } }
        if (s.eng) { const d = S[s.eng]; move(s, d.x + s.off[0], d.y + s.off[1], k === 'pp' ? 5 : 7); if (Math.hypot(d.x - s.x, d.y - s.y) > 3.2) { d.engBy = null; s.eng = null; } }
        else if (k === 'block') { let best = null, bd = 6; DEF.forEach(d => { const sd = S[d.id]; if (sd.engBy) return; const dd = Math.hypot(sd.x - s.x, sd.y - s.y); if (dd < bd) { bd = dd; best = sd; } }); if (best) move(s, best.x, best.y, 3.5); else if (car && car !== 'QB' && !B.air && !(['LT', 'LG', 'C', 'RG', 'RT'].includes(p.id) && s.y > 5)) { const c = S[car]; if (Math.hypot(c.x - s.x, c.y - s.y) > 5) move(s, c.x, c.y - 2, 3.5); } }
        return;
      }
      if (k === 'route' && !s.stay && s.dir[1] < -0.3 && !(car && car !== 'QB' && !B.air)) return; // comebacks and curls settle
      if (k === 'route' && !s.stay) {
        if (car && car !== 'QB' && car !== p.id && !B.air) { const c = S[car], dd = Math.hypot(c.x - s.x, c.y - s.y); if (dd > 3) move(s, c.x + c.vx * 0.5, c.y + c.vy * 0.5 + 2, 6.5); return; }
        let v = Math.min(s.spd || 7, 8.5);
        let nx = s.x + s.dir[0] * v * dt * s.f, ny = s.y + s.dir[1] * v * dt * s.f;
        if (nx < 1 || nx > FW - 1) { s.dir = [0, 1]; nx = Math.max(1, Math.min(FW - 1, nx)); }
        if (ny > vy1) { s.dir = [0, 0]; return; }
        s.x = nx; s.y = ny; return;
      }
      if (['fake', 'run', 'drop', 'none', 'route'].includes(k) && !s.stay) {
        const f = Math.max(0, 1 - (t - s.endT) / 0.8); const v = Math.min(s.spd, 8) * f; s.x += s.dir[0] * v * dt * s.f; s.y += s.dir[1] * v * dt * s.f;
      }
    });
    // defense after their scripts
    DEF.forEach(p => {
      const s = S[p.id]; if (t <= s.endT + 1e-9) return;
      if (s.stay) return;
      const rusher = p.kind === 'rush';
      let v = (rusher ? 5.6 : 7.2) * (sc.pursuit || 1);
      if (s.tack) { const c = S[s.tack]; s.x = c.x + s.tko[0]; s.y = c.y + s.tko[1]; return; }
      if (p.chase && S[p.chase]) { const c = S[p.chase]; move(s, c.x, c.y, 6.5); if (Math.hypot(c.x - s.x, c.y - s.y) < 1.0) { s.tack = p.chase; s.tko = [s.x - c.x, s.y - c.y]; } return; }
      if (s.heldBy && !s.engBy) { if (B.x != null) move(s, B.x, B.y, 1.2); return; }
      if (pend && !rusher) {
        if (!s.shId) { let best = null, bd = 1e9; OFF.forEach(o => { if (['QB', 'LT', 'LG', 'C', 'RG', 'RT'].includes(o.id)) return; const so = S[o.id], dd = Math.hypot(so.x - s.x, so.y - s.y); if (dd < bd) { bd = dd; best = o.id; } }); if (best) { s.shId = best; s.shOff = [s.x - S[best].x, s.y - S[best].y]; } }
        if (s.shId && s.y > vy1) return;
        if (s.shId) { const o = S[s.shId]; const far = Math.hypot(s.shOff[0], s.shOff[1]) > 7; move(s, far ? s.x + (o.x - s.x) * 0.02 + o.vx * 0.5 * dt : o.x + s.shOff[0], far ? s.y + (o.y - s.y) * 0.02 + Math.max(0, o.vy) * 0.6 * dt : o.y + s.shOff[1], far ? 3 : 7.2); }
        return;
      }
      if (B.x == null) return;
      let tx = B.x, ty = B.y;
      if (!B.air && car) { const c = S[car]; tx += c.vx * 0.35; ty += c.vy * 0.35; }
      if (s.engBy) v = 1.3;
      if (s.whiff && t < s.whiff) v = 0.6;
      move(s, tx, ty, v);
      if (car && !B.air && !s.engBy) { const c = S[car], dd = Math.hypot(c.x - s.x, c.y - s.y);
        if (dd < 1.2) { if (sc.noTackle) { if (!s.whiff) s.whiff = t + 0.7; } else { s.tack = car; s.tko = [s.x - c.x, s.y - c.y]; } } }
    });
    pl.forEach(p => { const s = S[p.id]; s.vx = (s.x - px[p.id][0]) / dt; s.vy = (s.y - px[p.id][1]) / dt; if (t > s.endT + 1e-9 && i % 2 === 0) s.ext.push([t, s.x, s.y]); });
  }
  pl.forEach(p => {
    const s = S[p.id];
    p._endT = s.endT;
    if (!s.ext.length) return;
    const kf = p.kf.slice(0, p.kf.length - 1).filter(k => k[0] <= s.endT || k[0] < -50);
    kf.push(...s.ext); kf.push([60, s.x, s.y]);
    p.kf = kf;
  });
  separate(sc);
  return sc;
}
/* Keep markers legible: players closer than R are nudged apart (smoothed over time),
   so blocks, tackles and tight coverage read as contact instead of one marker hiding another. */
function separate(sc) {
  const pl = sc.players, dt = 0.05, t0 = sc.t[0], t1 = sc.t[1], R = 1.8;
  const n = Math.max(2, Math.round((t1 - t0) / dt) + 1);
  const P = pl.map(p => { const a = []; for (let i = 0; i < n; i++) a.push(posAt(p.kf, t0 + i * dt)); return a; });
  const Q = P.map(a => a.map(q => [q[0], q[1]]));
  for (let i = 0; i < n; i++) for (let it = 0; it < 4; it++) for (let a = 0; a < pl.length; a++) for (let b = a + 1; b < pl.length; b++) {
    const A = Q[a][i], Bq = Q[b][i]; let dx = Bq[0] - A[0], dy = Bq[1] - A[1], d = Math.hypot(dx, dy);
    if (d >= R) continue;
    if (d < 1e-3) { dx = 1; dy = 0; d = 1; }
    const push = (R - d) / 2, ux = dx / d, uy = dy / d;
    A[0] -= ux * push; A[1] -= uy * push; Bq[0] += ux * push; Bq[1] += uy * push;
  }
  pl.forEach((p, k) => {
    const D = Q[k].map((q, i) => [q[0] - P[k][i][0], q[1] - P[k][i][1]]);
    if (!D.some(d => Math.abs(d[0]) + Math.abs(d[1]) > 0.02)) return;
    // smooth the nudges over time, then cap how fast a nudge may change (keeps speeds human)
    const W = 4, M = [];
    for (let i = 0; i < n; i++) { let sx = 0, sy = 0, c = 0, mx = 0, my = 0;
      for (let j = Math.max(0, i - W); j <= Math.min(n - 1, i + W); j++) { sx += D[j][0]; sy += D[j][1]; c++; if (Math.abs(D[j][0]) > Math.abs(mx)) mx = D[j][0]; if (Math.abs(D[j][1]) > Math.abs(my)) my = D[j][1]; }
      M.push([0.5 * (sx / c) + 0.5 * mx, 0.5 * (sy / c) + 0.5 * my]); }
    const cap = 0.07;
    for (let pass = 0; pass < 2; pass++) {
      for (let i = 1; i < n; i++) for (let a = 0; a < 2; a++) { const d = M[i][a] - M[i - 1][a]; if (Math.abs(d) > cap) M[i][a] = M[i - 1][a] + Math.sign(d) * cap; }
      for (let i = n - 2; i >= 0; i--) for (let a = 0; a < 2; a++) { const d = M[i][a] - M[i + 1][a]; if (Math.abs(d) > cap) M[i][a] = M[i + 1][a] + Math.sign(d) * cap; }
    }
    const kf = [[-60, P[k][0][0] + M[0][0], P[k][0][1] + M[0][1]]];
    for (let i = 0; i < n; i++) kf.push([t0 + i * dt, P[k][i][0] + M[i][0], P[k][i][1] + M[i][1]]);
    const l = kf[kf.length - 1]; kf.push([60, l[1], l[2]]);
    p.kf = kf;
  });
}
function posAt(kf, t) {
  if (t <= kf[0][0]) return [kf[0][1], kf[0][2]];
  for (let i = 1; i < kf.length; i++) {
    if (t <= kf[i][0]) {
      const a = kf[i - 1], b = kf[i], u = (t - a[0]) / Math.max(1e-6, b[0] - a[0]);
      return [a[1] + (b[1] - a[1]) * u, a[2] + (b[2] - a[2]) * u];
    }
  }
  const l = kf[kf.length - 1]; return [l[1], l[2]];
}
function ptsBetween(kf, t0, t1) {
  const out = [posAt(kf, t0)];
  for (const k of kf) if (k[0] > t0 && k[0] < t1) out.push([k[1], k[2]]);
  out.push(posAt(kf, t1));
  const d = [out[0]];
  for (let i = 1; i < out.length; i++) { const l = d[d.length - 1]; if (Math.hypot(out[i][0] - l[0], out[i][1] - l[1]) > 0.05) d.push(out[i]); }
  return d;
}
function plen(pts) { let s = 0; for (let i = 1; i < pts.length; i++) s += Math.hypot(pts[i][0] - pts[i - 1][0], pts[i][1] - pts[i - 1][1]); return s; }

/* ball state */
function ballEvents(sc) {
  const ev = [];
  if (!sc.noSnap) { ev.push({ t: -60, hold: sc.snapFrom || 'C' }); ev.push({ t: 0, pass: 'QB', at: sc.gun ? 0.32 : 0.1, snap: 1 }); }
  return ev.concat(sc.ball || []).sort((a, b) => a.t - b.t);
}
function ballAt(sc, P, t) {
  const ev = sc._ev; let holder = null, fl = null;
  for (const e of ev) {
    if (e.t > t) break;
    if (e.hold != null) { holder = e.hold; fl = null; }
    if (e.pass) { if (t < e.at) { fl = e; } else { holder = e.pass; fl = null; } }
  }
  if (fl) {
    const from = posAt(P[fl.from || holder].kf, fl.t), to = posAt(P[fl.pass].kf, fl.at);
    const u = (t - fl.t) / (fl.at - fl.t);
    return { x: from[0] + (to[0] - from[0]) * u, y: from[1] + (to[1] - from[1]) * u, air: !fl.snap, u };
  }
  if (!holder || !P[holder]) return null;
  const p = posAt(P[holder].kf, t); return { x: p[0] + 0.75, y: p[1] + 0.55, air: false };
}

/* ---------- Board: one animated diagram ---------- */
function Board(host, scene, o) {
  o = o || {};
  const self = { t: 0, playing: false, speed: 0.5, scene: null };
  const id = 'b' + (++UID);
  const board = hx('div', { class: 'board' }, host);
  const tag = hx('div', { class: 'tag' }, board);
  const svg = sv('svg', { role: 'img' }, board);
  let ctrl, play, scrub, clock, beatsEl, castEl, reconEl;
  if (!o.static) {
    ctrl = hx('div', { class: 'ctrl' }, host);
    play = hx('button', { class: 'btn', type: 'button', 'aria-label': 'Play' }, ctrl);
    scrub = hx('input', { class: 'scrub', type: 'range', step: '0.01', 'aria-label': 'Play timeline', id: id + '-scrub' }, ctrl);
    clock = hx('span', { class: 'clock' }, ctrl);
    const sp = hx('span', { class: 'speed' }, ctrl, 'Speed ');
    [['¼×', .25], ['½×', .5], ['1× real time', 1]].forEach(([l, v]) => {
      const b = hx('button', { type: 'button', 'aria-pressed': v === .5 ? 'true' : 'false' }, sp, l);
      b.onclick = () => { self.speed = v; sp.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false')); };
    });
    play.onclick = () => self.playing ? self.pause() : self.play();
    scrub.oninput = () => { self.pause(); self.seek(+scrub.value); };
  }
  castEl = hx('div', { class: 'cast' }, host);
  reconEl = hx('div', { class: 'recon' }, host);
  if (o.beatsHost) beatsEl = hx('ol', { class: 'beats' }, o.beatsHost);

  const icon = (p) => p ? '<svg viewBox="0 0 10 10"><rect x="1.5" y="1" width="2.4" height="8"/><rect x="6.1" y="1" width="2.4" height="8"/></svg>Pause'
    : '<svg viewBox="0 0 10 10"><path d="M2 1 L9 5 L2 9Z"/></svg>Play';

  self.setScene = function (sc, keepT) {
    self.pause();
    self.scene = sc;
    finalize(sc);
    sc._ev = ballEvents(sc);
    const v = Object.assign({ y0: -10, y1: 20, x0: 0, x1: FW }, sc.view || {});
    if (board.clientWidth && board.clientWidth < 560 && sc.mobileView) { v.x0 = sc.mobileView.x0; v.x1 = sc.mobileView.x1; }
    else if (board.clientWidth && board.clientWidth < 560 && !(sc.view && (sc.view.x0 || sc.view.x1))) {
      // narrow screens: crop to the sideline-to-sideline extent the play actually uses
      let mn = FW, mx = 0; const ta = sc.t ? sc.t[0] : 0, tb = sc.t ? sc.t[1] : 0;
      sc.players.forEach(p => { const kf = track(p); for (let t = ta; t <= tb + 1e-9; t += 0.1) { const q = posAt(kf, t); if (q[1] < v.y1 && q[1] > v.y0) { mn = Math.min(mn, q[0]); mx = Math.max(mx, q[0]); } } });
      v.x0 = Math.max(0, Math.min(mn - 1.8, 9)); v.x1 = Math.min(FW, Math.max(mx + 1.8, FW - 9));
    }
    const X = x => x * S, Y = y => (v.y1 - y) * S;
    self.X = X; self.Y = Y;
    while (svg.firstChild) svg.removeChild(svg.firstChild);
    svg.setAttribute('viewBox', `${v.x0 * S} 0 ${(v.x1 - v.x0) * S} ${(v.y1 - v.y0) * S}`);
    svg.setAttribute('aria-label', sc.alt || sc.title || 'Play diagram');
    tag.textContent = sc.tag || '';
    tag.hidden = !sc.tag;
    // defs
    const defs = sv('defs', null, svg);
    const mk = (n, cls, sz) => {
      const m = sv('marker', { id: id + n, viewBox: '0 0 10 10', refX: '6', refY: '5', markerWidth: sz, markerHeight: sz, orient: 'auto-start-reverse', markerUnits: 'userSpaceOnUse' }, defs);
      sv('path', { d: 'M0,0 L10,5 L0,10 Z', style: 'fill:var(' + cls + ')' }, m);
    };
    mk('aB', '--purple', 11); mk('aO', '--opp', 11); mk('aR', '--rush', 9); mk('aG', '--gold-bright', 13);
    // field
    const fg = sv('g', null, svg);
    sv('rect', { x: v.x0 * S, y: 0, width: (v.x1 - v.x0) * S, height: (v.y1 - v.y0) * S, style: 'fill:var(--field)' }, fg);
    const los = sc.los == null ? 35 : sc.los;
    const a0 = Math.floor(los + v.y0), a1 = Math.ceil(los + v.y1);
    if (a1 > 100) { const yy = 100 - los; sv('rect', { x: 0, y: 0, width: FW * S, height: Y(yy), class: 'f-ez' }, fg); }
    if (a0 < 0) { const yy = -los; sv('rect', { x: 0, y: Y(yy), width: FW * S, height: (v.y1 - v.y0) * S - Y(yy), class: 'f-ez' }, fg); }
    for (let a = a0; a <= a1; a++) {
      if (a < 0 || a > 100) continue;
      const yy = Y(a - los);
      if (a % 5 === 0) {
        sv('line', { x1: 0, x2: FW * S, y1: yy, y2: yy, class: (a === 0 || a === 100) ? 'f-goal' : (a % 10 === 0 ? 'f-line5' : 'f-line') }, fg);
        if (a % 10 === 0 && a > 0 && a < 100) {
          const n = a <= 50 ? a : 100 - a;
          const t1 = sv('text', { x: X(9.5), y: yy, class: 'f-num', 'text-anchor': 'middle', 'dominant-baseline': 'central', transform: `rotate(-90 ${X(9.5)} ${yy})` }, fg); t1.textContent = String(n).split('').join(' ');
          const t2 = sv('text', { x: X(FW - 9.5), y: yy, class: 'f-num', 'text-anchor': 'middle', 'dominant-baseline': 'central', transform: `rotate(90 ${X(FW - 9.5)} ${yy})` }, fg); t2.textContent = String(n).split('').join(' ');
        }
      } else if (a > 0 && a < 100) {
        [[HL - .35, HL + .35], [HR - .35, HR + .35], [0.6, 1.3], [FW - 1.3, FW - .6]].forEach(([p, q]) => sv('line', { x1: X(p), x2: X(q), y1: yy, y2: yy, class: 'f-hash' }, fg));
      }
    }
    if (sc.extraBelow) sc.extraBelow(sv('g', null, svg), X, Y);
    if (!sc.noLos) sv('line', { x1: 0, x2: FW * S, y1: Y(0), y2: Y(0), class: 'los' }, fg);
    if (sc.first != null && sc.first < 100) sv('line', { x1: 0, x2: FW * S, y1: Y(sc.first - los), y2: Y(sc.first - los), class: 'fdl' }, fg);
    // zones
    const zg = sv('g', null, svg); self.zones = [];
    (sc.zones || []).forEach(z => {
      const g = sv('g', { style: 'transition:opacity .25s' }, zg);
      if (z.poly) sv('polygon', { points: z.poly.map(p => X(p[0]) + ',' + Y(p[1])).join(' '), class: 'zone' + (z.team === 'O' ? ' o' : '') }, g);
      else sv('ellipse', { cx: X(z.cx), cy: Y(z.cy), rx: z.rx * S, ry: z.ry * S, class: 'zone' + (z.team === 'O' ? ' o' : '') }, g);
      if (z.label) { const cx = z.poly ? z.poly.reduce((a, p) => a + p[0], 0) / z.poly.length : z.cx, cy = z.poly ? z.poly.reduce((a, p) => a + p[1], 0) / z.poly.length : z.cy; const tx = sv('text', { x: X(z.lx != null ? z.lx : cx), y: Y(z.ly != null ? z.ly : cy), class: 'zone-lbl', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, g); tx.textContent = z.label; }
      self.zones.push([z, g]);
    });
    if (sc.extra) sc.extra(sv('g', null, svg), X, Y);
    // players
    const P = {}; self.P = P;
    const gGhost = sv('g', { class: 'ghost' }, svg), gLive = sv('g', null, svg), gBallP = sv('g', null, svg), gPl = sv('g', null, svg), gRing = sv('g', null, svg), gLab = sv('g', null, svg);
    sc.players.forEach(p => {
      const kf = track(p); const team = p.team || 'B'; const side = p.side || 'off';
      const kind = p.kind || (side === 'def' ? 'none' : 'route');
      const P0 = { spec: p, kf, team, side, kind };
      const preStart = p.pre ? p.pre.t0 : null;
      const cls = 'pth ' + team + ' ' + kind;
      const drawPath = (g, pts, k, live) => {
        if (pts.length < 2 || plen(pts) < (k === 'block' ? 0.6 : 1.2)) return null;
        const pl = sv('polyline', { points: pts.map(q => X(q[0]) + ',' + Y(q[1])).join(' '), class: k === 'motion' ? 'pth ' + team + ' motion' : cls }, g);
        if (!live) {
          if (['route', 'run', 'drop', 'rush'].includes(k)) {
            const m = k === 'run' ? 'aG' : k === 'rush' ? 'aR' : (team === 'B' ? 'aB' : 'aO');
            pl.setAttribute('marker-end', 'url(#' + id + m + ')');
          }
          if (k === 'block') {
            const a = pts[pts.length - 2], b = pts[pts.length - 1];
            const dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * .75, ny = dx / L * .75;
            sv('line', { x1: X(b[0] + nx), y1: Y(b[1] + ny), x2: X(b[0] - nx), y2: Y(b[1] - ny), class: cls, style: 'stroke-width:2.4' }, g);
          }
        }
        return pl;
      };
      if (kind !== 'none' && kind !== 'pp') {
        if (preStart != null) drawPath(gGhost, ptsBetween(kf, preStart, 0), 'motion');
        const tEndP = p._endT != null ? p._endT : kf[kf.length - 2][0];
        if (tEndP > 0) drawPath(gGhost, ptsBetween(kf, Math.max(0, p.d || 0), Math.max(tEndP, 0.02)), kind);
      }
      P0.live = sv('polyline', { class: cls, points: '' }, gLive);
      P0.liveM = sv('polyline', { class: 'pth ' + team + ' motion', points: '' }, gLive);
      const g = sv('g', { class: 'pl ' + team + (side === 'def' ? ' d' : ' o') }, gPl);
      if (side === 'def') sv('rect', { x: -10, y: -10, width: 20, height: 20, rx: 4, class: 'body' }, g);
      else sv('circle', { r: 10.5, class: 'body' }, g);
      const lab = sc.generic && ROLE_LAB[p.lab] ? ROLE_LAB[p.lab] : (p.lab || p.id);
      const tx = sv('text', { y: .5 }, g); tx.textContent = lab;
      if (lab.length > 2) tx.style.fontSize = '7.2px';
      if (p.name && !sc.generic) { const ti = sv('title', null, g); ti.textContent = (p.pos ? p.pos + ' · ' : '') + p.name; }
      P0.g = g; P[p.id] = P0;
    });
    // ball path ghosts
    sc._ev.forEach(e => {
      if (e.pass && !e.snap && P[e.pass]) {
        const holderAt = (() => { let h = null; for (const x of sc._ev) { if (x.t > e.t) break; if (x.hold != null) h = x.hold; if (x.pass && x !== e && x.at <= e.t) h = x.pass; } return e.from || h; })();
        if (!holderAt || !P[holderAt]) return;
        const a = posAt(P[holderAt].kf, e.t), b = posAt(P[e.pass].kf, e.at);
        if (Math.hypot(a[0] - b[0], a[1] - b[1]) > 3) sv('line', { x1: X(a[0]), y1: Y(a[1]), x2: X(b[0]), y2: Y(b[1]), class: 'ballpath' }, gBallP);
      }
    });
    self.ballEl = sv('ellipse', { rx: 4.2, ry: 2.8, class: 'ballc' }, svg);
    // rings & labels
    self.rings = (sc.rings || []).map(r => [r, sv('circle', { r: 15, class: 'ring', style: 'display:none' }, gRing)]);
    self.labels = (sc.labels || []).map(l => {
      const g = sv('g', { style: 'display:none' }, gLab);
      const w = l.text.length * 5.7 + 10;
      const ax = l.anchor === 'end' ? -w : l.anchor === 'start' ? 0 : -w / 2;
      sv('rect', { x: X(l.x) + ax, y: Y(l.y) - 8, width: w, height: 16, rx: 2, class: 'callout-bg' }, g);
      const t = sv('text', { x: X(l.x) + ax + w / 2, y: Y(l.y) + .5, class: 'callout', 'text-anchor': 'middle', 'dominant-baseline': 'central' }, g); t.textContent = l.text;
      return [l, g];
    });
    // range
    self.t0 = sc.t ? sc.t[0] : -1; self.t1 = sc.t ? sc.t[1] : 4;
    if (scrub) {
      scrub.min = self.t0; scrub.max = self.t1;
      const pct = (0 - self.t0) / (self.t1 - self.t0) * 100;
      scrub.style.background = 'none';
      scrub.title = 'Snap at ' + pct.toFixed(0) + '% of the timeline';
    }
    // beats
    if (beatsEl) {
      beatsEl.innerHTML = '';
      self.beatLis = (sc.beats || []).map(b => {
        const li = hx('li', { tabindex: '0' }, beatsEl, '<span class="t">' + fmtT(b[0], true) + '</span>' + b[1]);
        const go = () => { self.pause(); self.seek(b[0] + 0.001); };
        li.onclick = go; li.onkeydown = e => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); go(); } };
        return li;
      });
    }
    // cast
    const cast = sc.generic ? [] : sc.players.filter(p => p.name);
    castEl.innerHTML = cast.length ? cast.map(p => `<span><span class="sw" style="background:var(${p.team === 'O' ? '--opp' : '--purple'})"></span><b>${p.lab || p.id}</b> ${p.name}</span>`).join('') : '';
    castEl.hidden = !cast.length;
    reconEl.innerHTML = sc.recon || ''; reconEl.hidden = !sc.recon;
    self.seek(keepT != null ? keepT : (sc.rest != null ? sc.rest : self.t0));
  };

  function fmtT(t, short) {
    if (Math.abs(t) < 0.005) return 'SNAP';
    return (t < 0 ? '−' : '+') + Math.abs(t).toFixed(1) + 's';
  }
  self.seek = function (t) {
    const sc = self.scene; t = Math.max(self.t0, Math.min(self.t1, t)); self.t = t;
    const X = self.X, Y = self.Y, P = self.P;
    for (const k in P) {
      const p = P[k], q = posAt(p.kf, t);
      p.g.setAttribute('transform', `translate(${X(q[0])},${Y(q[1])})`);
      p.pos = q;
      if (p.kind !== 'none' && p.kind !== 'pp') {
        const d = Math.max(0, p.spec.d || 0);
        if (t > d) { const pts = ptsBetween(p.kf, d, t); p.live.setAttribute('points', pts.map(r => X(r[0]) + ',' + Y(r[1])).join(' ')); }
        else p.live.setAttribute('points', '');
        if (p.spec.pre) { const t0 = p.spec.pre.t0; if (t > t0) { const pts = ptsBetween(p.kf, t0, Math.min(t, 0)); p.liveM.setAttribute('points', pts.map(r => X(r[0]) + ',' + Y(r[1])).join(' ')); } else p.liveM.setAttribute('points', ''); }
      }
    }
    // keep the ball carrier drawn on top of everyone else
    let hold = null; for (const e of sc._ev) { if (e.t > t) break; if (e.hold != null) hold = e.hold; if (e.pass && t >= e.at) hold = e.pass; }
    if (hold && P[hold] && hold !== self._top) { P[hold].g.parentNode.appendChild(P[hold].g); self._top = hold; }
    const b = ballAt(sc, P, t);
    if (b) { self.ballEl.style.display = ''; self.ballEl.setAttribute('cx', X(b.x)); self.ballEl.setAttribute('cy', Y(b.y)); const s = b.air ? 1 + Math.sin(Math.PI * b.u) * .45 : 1; self.ballEl.setAttribute('rx', 4.2 * s); self.ballEl.setAttribute('ry', 2.8 * s); }
    else self.ballEl.style.display = 'none';
    self.rings.forEach(([r, c]) => {
      const on = t >= r[0] && t <= r[1];
      c.style.display = on ? '' : 'none';
      if (on && P[r[2]]) { const q = P[r[2]].pos; c.setAttribute('cx', X(q[0])); c.setAttribute('cy', Y(q[1])); }
    });
    self.labels.forEach(([l, g]) => { g.style.display = (t >= l.t0 && t <= l.t1) ? '' : 'none'; });
    self.zones.forEach(([z, g]) => { const on = (z.t0 == null || t >= z.t0) && (z.t1 == null || t <= z.t1); g.style.opacity = on ? 1 : 0; });
    if (scrub) { scrub.value = t; clock.textContent = t < -0.005 ? 'Pre-snap ' + fmtT(t) : (Math.abs(t) < 0.005 ? 'Snap' : fmtT(t)); }
    if (self.beatLis) {
      const bs = sc.beats || []; let cur = -1;
      bs.forEach((b, i) => { if (t >= b[0] - 0.001) cur = i; });
      self.beatLis.forEach((li, i) => li.classList.toggle('on', i === cur));
    }
    if (self.onSeek) self.onSeek(t);
  };
  let last = 0, raf = 0;
  function frame(ts) {
    if (!self.playing) return;
    const dt = Math.min(0.05, (ts - last) / 1000); last = ts;
    let t = self.t + dt * self.speed;
    if (t >= self.t1) { self.seek(self.t1); self.pause(); return; }
    self.seek(t); raf = requestAnimationFrame(frame);
  }
  self.play = function () {
    if (self.locked) return;
    if (self.t >= self.t1 - 0.01) self.seek(self.t0);
    self.playing = true; if (play) { play.innerHTML = icon(true); play.setAttribute('aria-label', 'Pause'); }
    last = performance.now(); raf = requestAnimationFrame(frame);
  };
  self.pause = function () { self.playing = false; cancelAnimationFrame(raf); if (play) { play.innerHTML = icon(false); play.setAttribute('aria-label', 'Play'); } };
  self.lock = function (on) { self.locked = on; if (ctrl) ctrl.style.display = on ? 'none' : ''; };
  if (play) play.innerHTML = icon(false);
  self.setScene(scene);
  // autoplay once in view
  if (!o.static && !RM && 'IntersectionObserver' in window && !o.noAuto) {
    const io = new IntersectionObserver(es => es.forEach(e => {
      if (e.isIntersecting && e.intersectionRatio > .55 && !self.autod && !self.locked) { self.autod = true; self.play(); io.disconnect(); }
    }), { threshold: [0, .55, .8] });
    io.observe(board);
  }
  return self;
}

/* ---------- Figure shell ---------- */
function Figure(host, scenes, o) {
  o = o || {};
  host.classList.add('fig'); if (o.narrow) host.classList.add('narrow');
  const first = scenes[0].scene;
  const head = hx('div', { class: 'fig-head' }, host);
  const h5 = hx('h5', null, head, o.title || first.title || '');
  const src = hx('span', { class: 'src' }, head, o.src || first.src || '');
  let seg;
  if (scenes.length > 1) {
    if (o.segLabel) hx('p', { class: 'seg-label' }, host, o.segLabel);
    seg = hx('div', { class: 'seg', role: 'group', 'aria-label': o.segLabel || 'Variants' }, host);
  }
  const grid = hx('div', { class: 'fig-grid' }, host);
  const left = hx('div', { style: 'min-width:0' }, grid), right = hx('div', { style: 'min-width:0' }, grid);
  const st = !!first.static;
  const B = Board(left, first, { beatsHost: st ? null : right, static: st, noAuto: o.noAuto });
  if (st && first.side) right.innerHTML = '<div class="verdict">' + first.side + '</div>';
  if (o.legend !== false) legend(left);
  if (seg) scenes.forEach((s, i) => {
    const b = hx('button', { type: 'button', 'aria-pressed': i === 0 ? 'true' : 'false' }, seg, s.label);
    b.onclick = () => {
      seg.querySelectorAll('button').forEach(x => x.setAttribute('aria-pressed', x === b ? 'true' : 'false'));
      B.setScene(s.scene); if (s.scene.title && !o.title) h5.innerHTML = s.scene.title; if (s.scene.src && !o.src) src.innerHTML = s.scene.src;
      if (s.scene.static) { right.innerHTML = '<div class="verdict">' + (s.scene.side || '') + '</div>'; if (window.initTerms) initTerms(right); }
      if (!RM) B.play();
    };
  });
  return B;
}
function legend(host) {
  const L = hx('div', { class: 'legend' }, host);
  const item = (svgInner, label) => hx('span', null, L, `<svg viewBox="0 0 32 14">${svgInner}</svg>${label}`);
  item('<circle cx="8" cy="7" r="5.5" style="fill:var(--purple)"/><rect x="18" y="1.5" width="11" height="11" rx="2" style="fill:var(--purple)"/>', 'Ravens (O offense, ▢ defense)');
  item('<circle cx="8" cy="7" r="5.5" style="fill:var(--opp)"/><rect x="18" y="1.5" width="11" height="11" rx="2" style="fill:var(--opp)"/>', 'Opponent');
  item('<line x1="2" y1="7" x2="30" y2="7" style="stroke:var(--gold-bright);stroke-width:3.5"/>', 'Ball carrier');
  item('<line x1="2" y1="7" x2="30" y2="7" style="stroke:var(--ink-2);stroke-width:2;stroke-dasharray:4 3"/>', 'Motion / drop');
  item('<line x1="2" y1="7" x2="26" y2="7" style="stroke:var(--ink-2);stroke-width:2"/><line x1="26" y1="2" x2="26" y2="12" style="stroke:var(--ink-2);stroke-width:2.4"/>', 'Block');
  item('<line x1="2" y1="7" x2="30" y2="7" style="stroke:var(--rush);stroke-width:2"/>', 'Pass rush');
  item('<line x1="2" y1="7" x2="30" y2="7" style="stroke:var(--los);stroke-width:2.6"/>', 'Line of scrimmage');
  item('<line x1="2" y1="7" x2="30" y2="7" style="stroke:var(--first);stroke-width:2.6"/>', 'Line to gain');
}

