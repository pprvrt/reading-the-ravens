/* ===================== PLAYBOOK PLATES =====================
   Small static diagrams in the style of a coach's whiteboard: ink on paper, O's for the offense,
   letters for the defense, one accent colour reserved for the read or the key action.
   Coordinates: x = yards from the ball (left negative), y = yards from the line of scrimmage. */
let PLATE_ID = 0;
function plateSVG(sp) {
  const v = Object.assign({ x0: -25, x1: 25, y0: -7, y1: 15 }, sp.v || {});
  // wide plates compress the field outside the tackle box, as coaches do on a whiteboard
  const cmp = sp.cmp != null ? sp.cmp : (v.x1 - v.x0) > 30, CB = 7, CF = 0.5;
  const fx = x => !cmp || Math.abs(x) <= CB ? x : Math.sign(x) * (CB + (Math.abs(x) - CB) * CF);
  const vx0 = fx(v.x0), vx1 = fx(v.x1);
  const K = 480 / (vx1 - vx0), W = 480, H = Math.round((v.y1 - v.y0) * K), sc = sp.s || Math.min(1.35, Math.max(0.8, K / 11));
  const X = x => ((fx(x) - vx0) * K).toFixed(1), Y = y => ((v.y1 - y) * K).toFixed(1);
  const id = 'pl' + (++PLATE_ID);
  let h = `<svg viewBox="0 0 ${W} ${H}" role="img" aria-label="${sp.t.replace(/"/g, '')} diagram" style="--s:${sc.toFixed(2)}">`;
  h += `<defs><marker id="${id}a" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="${(8 * sc).toFixed(1)}" markerHeight="${(8 * sc).toFixed(1)}" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0,0L10,5L0,10z" class="pa"/></marker>`;
  h += `<marker id="${id}k" viewBox="0 0 10 10" refX="6" refY="5" markerWidth="${(10 * sc).toFixed(1)}" markerHeight="${(10 * sc).toFixed(1)}" orient="auto-start-reverse" markerUnits="userSpaceOnUse"><path d="M0,0L10,5L0,10z" class="pk"/></marker></defs>`;
  if (sp.ez != null) h += `<rect x="0" y="0" width="${W}" height="${Y(sp.ez)}" class="pez"/><line x1="0" x2="${W}" y1="${Y(sp.ez)}" y2="${Y(sp.ez)}" class="pgoal"/>`;
  if (sp.ezb != null) h += `<rect x="0" y="${Y(sp.ezb)}" width="${W}" height="${(H - +Y(sp.ezb)).toFixed(1)}" class="pez"/><line x1="0" x2="${W}" y1="${Y(sp.ezb)}" y2="${Y(sp.ezb)}" class="pgoal"/>`;
  (sp.lines || []).forEach(l => { h += `<line x1="0" x2="${W}" y1="${Y(l[0])}" y2="${Y(l[0])}" class="pyard"/>` + (l[1] ? `<text x="${W - 4}" y="${(+Y(l[0]) - 4).toFixed(1)}" class="ptx" text-anchor="end">${l[1]}</text>` : ''); });
  if (sp.los !== false) h += `<line x1="0" x2="${W}" y1="${Y(0)}" y2="${Y(0)}" class="plos"/>`;
  (sp.z || []).forEach(z => { const zl = +X(z[0] - z[2]), zr = +X(z[0] + z[2]); h += `<ellipse cx="${((zl + zr) / 2).toFixed(1)}" cy="${Y(z[1])}" rx="${((zr - zl) / 2).toFixed(1)}" ry="${(z[3] * K).toFixed(1)}" class="pz"/>`; if (z[4]) h += `<text x="${((zl + zr) / 2).toFixed(1)}" y="${Y(z[1])}" class="pzl" text-anchor="middle" dominant-baseline="central">${z[4]}</text>`; });
  (sp.r || []).forEach(r => {
    const [k, pts, lab] = r;
    const P = pts.map(p => X(p[0]) + ',' + Y(p[1])).join(' ');
    const cls = { r: 'pr', k: 'pkey', b: 'pr', run: 'prun', m: 'pmot', d: 'pdef', x: 'prush', kr: 'pkrun' }[k] || 'pr';
    const mk = (k === 'b' || k === 'm') ? '' : ` marker-end="url(#${id}${k === 'k' || k === 'kr' ? 'k' : 'a'})"`;
    h += `<polyline points="${P}" class="${cls}"${mk}/>`;
    if (k === 'b') {
      const a = pts[pts.length - 2], b = pts[pts.length - 1], dx = b[0] - a[0], dy = b[1] - a[1], L = Math.hypot(dx, dy) || 1, nx = -dy / L * .8, ny = dx / L * .8;
      h += `<line x1="${X(b[0] + nx)}" y1="${Y(b[1] + ny)}" x2="${X(b[0] - nx)}" y2="${Y(b[1] - ny)}" class="pr" style="stroke-width:2.2"/>`;
    }
    if (lab) { const e = pts[pts.length - 1]; h += `<text x="${X(e[0] + (lab[1] || 0))}" y="${Y(e[1] + (lab[2] || 0.9))}" class="ptx" text-anchor="middle">${lab[0]}</text>`; }
  });
  (sp.o || []).forEach(o => {
    const [x, y, f, lab] = o;
    const rr = 9.5 * sc;
    if (f === 'C') h += `<rect x="${(+X(x) - rr * 0.95).toFixed(1)}" y="${(+Y(y) - rr * 0.95).toFixed(1)}" width="${(rr * 1.9).toFixed(1)}" height="${(rr * 1.9).toFixed(1)}" class="po"/>`;
    else h += `<circle cx="${X(x)}" cy="${Y(y)}" r="${rr.toFixed(1)}" class="${f === 'K' ? 'pof' : 'po'}"/>`;
    if (lab) h += `<text x="${X(x)}" y="${(+Y(y) + 0.5).toFixed(1)}" class="${f === 'K' ? 'polf' : 'pol'}" text-anchor="middle" dominant-baseline="central">${lab}</text>`;
  });
  (sp.d || []).forEach(d => { h += `<text x="${X(d[0])}" y="${Y(d[1])}" class="pd${d[3] ? ' pdk' : ''}" text-anchor="middle" dominant-baseline="central">${d[2]}</text>`; });
  (sp.n || []).forEach(n => { h += `<circle cx="${X(n[0])}" cy="${Y(n[1])}" r="${(8.5 * sc).toFixed(1)}" class="pnum"/><text x="${X(n[0])}" y="${(+Y(n[1]) + .5).toFixed(1)}" class="pnumt" text-anchor="middle" dominant-baseline="central">${n[2]}</text>`; });
  (sp.tx || []).forEach(t => { h += `<text x="${X(t[0])}" y="${Y(t[1])}" class="ptx${t[3] ? ' ' + t[3] : ''}" text-anchor="${t[4] || 'middle'}">${t[2]}</text>`; });
  return h + '</svg>';
}
function mountPlates(host, list) {
  host.classList.add('plates', 'wide');
  const wideSet = list.some(sp => sp.v && (sp.v.x1 - sp.v.x0) > 30 || !sp.v);
  host.classList.add(host.dataset.cols === '3' || !wideSet ? 'cols3' : 'cols2');
  if (host.dataset.title) hx('div', { class: 'plates-head' }, host, '<b>' + host.dataset.title + '</b>' + (host.dataset.sub ? '<span>' + host.dataset.sub + '</span>' : ''));
  if (host.dataset.key != null) hx('p', { class: 'plate-key' }, host, 'Circles: offense (filled: the ball carrier or key player). Letters: defense. Red: the read, the key defender or the decisive action. Dashed grey: defender movement and zones. Circled numbers: the order of the quarterback\'s reads.');
  list.forEach(sp => {
    const f = hx('figure', { class: 'plate' + (sp.tall ? ' tall' : '') }, host);
    f.innerHTML = plateSVG(sp) + `<figcaption><b>${sp.t}</b>${sp.c}</figcaption>`;
  });
}

/* ---- building blocks ---- */
const OLp = (y) => [[-4, y || -0.8], [-2, y || -0.8], [0, y || -0.8, 'C'], [2, y || -0.8], [4, y || -0.8]];
const GUN = (rb) => [[0, -4.6, 0, 'Q'], [rb == null ? 1.8 : rb, -4.6, 0, 'R']];
const UC = (rbY) => [[0, -2.4, 0, 'Q'], [0, rbY || -6.5, 0, 'R']];
const DL4 = [[-5, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [5.6, 1.2, 'E']];

const PLATES = {
  /* ---------- run fits: box or spill ---------- */
  fits: [
    { t: 'Box ("squeeze")', v: { x0: -11, x1: 13, y0: -7, y1: 7 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], ...UC(-6.5)],
      d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [2.9, 1.2, 'T'], [8.4, 1.4, 'E', 1], [-1.6, 4.6, 'M'], [3.6, 4.6, 'W']],
      r: [['b', [[-2, -0.8], [-1.2, -3.6], [4, -3.2], [7.2, -0.6]]], ['run', [[0, -6.5], [3.6, -3.4], [5.8, -0.4], [5.6, 3]]], ['d', [[8.4, 1.4], [7.6, 0.4]]], ['d', [[3.6, 4.6], [5.6, 2.6]]]],
      tx: [[9.2, -3.6, 'outside arm free'], [5.6, 5.4, 'ball turned inside', 'pacc']],
      c: 'The end attacks the pulling blocker with his inside shoulder and keeps his outside arm free. The run is squeezed back inside, where the linebackers are waiting.' },
    { t: 'Spill', v: { x0: -11, x1: 13, y0: -7, y1: 7 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], ...UC(-6.5)],
      d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [2.9, 1.2, 'T'], [7.4, 1.2, 'E', 1], [-1.6, 4.6, 'M'], [3.6, 4.6, 'W'], [12.2, 5.2, 'S']],
      r: [['b', [[-2, -0.8], [-1.2, -3.6], [4, -3.2], [6.4, -1.4]]], ['run', [[0, -6.5], [3.6, -3.4], [7, -2.2], [10, 0.6], [10.8, 3]]], ['d', [[7.4, 1.2], [6.6, -0.6]]], ['d', [[3.6, 4.6], [9.6, 3.8]]], ['d', [[12.2, 5.2], [11.6, 3.4]]]],
      tx: [[5.2, 2.4, '"wrong arm"'], [8.2, 6.4, 'ball forced wide', 'pacc']],
      c: 'The end attacks the inside shoulder of the blocker and blows up the pull. The run bounces outside, where fast linebackers and a safety run it down toward the sideline.' },
  ],
  /* ---------- coverage additions ---------- */
  covs: [
    { t: 'Tampa 2', v: { x0: -25, x1: 25, y0: -6.5, y1: 22 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      z: [[-12, 18, 11, 3.6, 'deep ½'], [12, 18, 11, 3.6, 'deep ½'], [0, 13, 5, 3, 'hole'], [-20, 4, 4, 2.4], [20, 4, 4, 2.4], [-9, 8, 4, 2.4], [9, 8, 4, 2.4]],
      d: [[-19, 4.5, 'C'], [19, 4.5, 'C'], [-9, 7.5, 'W'], [9, 7.5, 'S'], [-12, 12, 'S'], [12, 12, 'S']],
      r: [['k', [[0, 5], [0, 12]]]], tx: [[0, 4, 'M', 'pdk-t']],
      c: 'Cover 2 with a twist: the middle linebacker sprints to the deep hole between the two safeties. Built by Tony Dungy and Monte Kiffin, it closes the seam that normal Cover 2 leaves open.' },
    { t: 'Cover 2 man', v: { x0: -25, x1: 25, y0: -6.5, y1: 22 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      z: [[-12, 18, 11, 3.6, 'deep ½'], [12, 18, 11, 3.6, 'deep ½']],
      d: [[-20, 1.6, 'C'], [20, 1.6, 'C'], [-12, 2.2, 'N'], [12, 3, 'S'], [2.4, 4.4, 'M'], [-11, 12, 'S'], [11, 12, 'S']],
      r: [['d', [[-20, 1.6], [-20.2, 6]]], ['d', [[20, 1.6], [20.2, 6]]], ['d', [[-12, 2.2], [-12.2, 6]]], ['d', [[12, 3], [12, 6.4]]]],
      tx: [[0, 8.6, 'man underneath, trailing', 'pacc']],
      c: 'Two safeties split the deep field, so the five defenders underneath can play tight man coverage from a "trail" position, undercutting every short route. A third-down favorite.' },
    { t: 'Cover 3 sky', v: { x0: -25, x1: 25, y0: -7.5, y1: 22 },
      o: [...OLp(), ...UC(), [6.2, -1, 0, 'Y'], [-20, -0.8], [20, -0.8]],
      z: [[-17, 17, 8, 3.4, '⅓'], [0, 18.4, 8, 3.4, '⅓'], [17, 17, 8, 3.4, '⅓']],
      d: [[-11, 13, 'F'], [11, 12.5, 'S', 1], [-19.6, 7, 'C'], [19.6, 7, 'C']],
      r: [['d', [[-11, 13], [0, 17]]], ['k', [[11, 12.5], [14.4, 5.4]]]],
      tx: [[15.6, 4, 'safety to the flat', 'pacc']],
      c: 'From two-high, a safety ("sky") rotates down to the curl-flat area and the other takes the deep middle. The rotation the Ravens showed in the disguise diagram.' },
    { t: 'Cover 3 buzz', v: { x0: -25, x1: 25, y0: -7.5, y1: 22 },
      o: [...OLp(), ...UC(), [6.2, -1, 0, 'Y'], [-20, -0.8], [20, -0.8]],
      z: [[-17, 17, 8, 3.4, '⅓'], [0, 18.4, 8, 3.4, '⅓'], [17, 17, 8, 3.4, '⅓']],
      d: [[-11, 13, 'F'], [11, 12.5, 'S', 1], [9, 4.6, 'W'], [-19.6, 7, 'C'], [19.6, 7, 'C']],
      r: [['d', [[-11, 13], [0, 17]]], ['k', [[11, 12.5], [8, 8.4]]], ['d', [[9, 4.6], [15.4, 4.2]]]],
      tx: [[7.4, 10, 'safety to the hook', 'pacc']],
      c: 'The rotating safety drops into the hook-curl window instead ("buzz"), and a linebacker runs out to the flat. Inside throws find a safety in the window.' },
    { t: 'Cover 3 cloud', v: { x0: -25, x1: 25, y0: -7.5, y1: 22 },
      o: [...OLp(), ...UC(), [6.2, -1, 0, 'Y'], [-20, -0.8], [20, -0.8]],
      z: [[-17, 17, 8, 3.4, '⅓'], [0, 18.4, 8, 3.4, '⅓'], [17, 17, 8, 3.4, '⅓']],
      d: [[-11, 13, 'F'], [11, 12.5, 'S'], [19.6, 6, 'C', 1], [-19.6, 7, 'C']],
      r: [['d', [[-11, 13], [0, 17]]], ['d', [[11, 12.5], [17, 16]]], ['k', [[19.6, 6], [18.4, 3.6]]]],
      tx: [[18, 1.4, 'corner squats', 'pacc']],
      c: 'The corner stays low in the flat ("cloud") and a safety rotates over the top of him. Outside throws meet a corner sitting on them.' },
  ],
  /* ---------- pressure ---------- */
  pressure: [
    { t: 'T-E twist', v: { x0: -10, x1: 10, y0: -6, y1: 5 },
      o: [...OLp(), [0, -4.6, 0, 'Q']], d: [[3, 1.4, 'T', 1], [6, 1.4, 'E', 1], [-1, 1.4, 'T'], [-5, 1.4, 'E']],
      r: [['k', [[3, 1.4], [4.8, -1.6]]], ['k', [[6, 1.4], [5.4, 0.6], [2.8, -0.2], [1.6, -3]]], ['x', [[-1, 1.4], [-1.2, -1]]], ['x', [[-5, 1.4], [-5.4, -1.2]]]],
      tx: [[5.4, -3, '1st', 'pacc'], [1, -4, '2nd', 'pacc']],
      c: 'The tackle crashes outside into the tackle\'s path; the end loops behind him into the gap the tackle vacated. If the guard and tackle do not pass the rushers off, someone comes free.' },
    { t: 'E-T twist', v: { x0: -10, x1: 10, y0: -6, y1: 5 },
      o: [...OLp(), [0, -4.6, 0, 'Q']], d: [[3, 1.4, 'T', 1], [6, 1.4, 'E', 1], [-1, 1.4, 'T'], [-5, 1.4, 'E']],
      r: [['k', [[6, 1.4], [3.2, -1.4]]], ['k', [[3, 1.4], [4, 0.6], [6.6, 0], [5.2, -3]]], ['x', [[-1, 1.4], [-1.2, -1]]], ['x', [[-5, 1.4], [-5.4, -1.2]]]],
      tx: [[2.6, -3, '1st', 'pacc'], [6.4, -4, '2nd', 'pacc']],
      c: 'The reverse: the end pinches inside first, the tackle loops around the edge. In Week 1 the Ravens ran 12 stunts on Daniel Jones\'s 33 dropbacks.' },
    { t: 'Fire zone', v: { x0: -25, x1: 25, y0: -6.5, y1: 19 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      z: [[-17, 16, 8, 3.2, '⅓'], [0, 17, 8, 3.2, '⅓'], [17, 16, 8, 3.2, '⅓'], [-13, 6, 5, 2.4, ''], [0, 7, 4, 2.4, ''], [13, 6, 5, 2.4, '']],
      d: [[-5, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [6, 1.2, 'E', 1], [-2, 4.6, 'M', 1], [2.4, 4.6, 'W', 1], [12, 5, 'N'], [-12, 5, 'S'], [0, 13, 'F'], [-20, 7, 'C'], [20, 7, 'C']],
      r: [['x', [[-5, 1.2], [-5.4, -1.6]]], ['x', [[-1, 1.2], [-1, -1.6]]], ['x', [[3, 1.2], [3, -1.6]]], ['k', [[-2, 4.6], [-3, -1.8]]], ['k', [[2.4, 4.6], [1, -1.8]]], ['k', [[6, 1.2], [9, 4.4], [12, 6]]]],
      tx: [[13.6, 8.6, 'end drops', 'pacc']],
      c: 'Five rushers, including two linebackers, with three deep and three underneath behind them. The dropping end is the surprise. Dick LeBeau\'s Steelers made it famous as the zone blitz.' },
    { t: 'Cover 0 blitz', v: { x0: -25, x1: 25, y0: -6.5, y1: 14 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      d: [[-5, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [6, 1.2, 'E'], [-2, 3.6, 'M', 1], [2.4, 3.6, 'W', 1], [-20, 1.6, 'C'], [20, 1.6, 'C'], [-12, 2.2, 'N'], [12, 2.6, 'S'], [4.8, 4.6, 'S']],
      r: [['x', [[-5, 1.2], [-5.4, -1.6]]], ['x', [[-1, 1.2], [-1, -1.6]]], ['x', [[3, 1.2], [3, -1.6]]], ['x', [[6, 1.2], [6.2, -1.6]]], ['k', [[-2, 3.6], [-3, -2]]], ['k', [[2.4, 3.6], [1, -2]]]],
      tx: [[0, 10.4, 'nobody deep', 'pacc']],
      c: 'Six rushers, every receiver covered man-to-man and no safety behind them. The ball must come out before the free rusher arrives, and any win is a touchdown.' },
    { t: 'Creeper (simulated pressure)', v: { x0: -25, x1: 25, y0: -6.5, y1: 14 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      d: [[-5, 1.2, 'E', 1], [-1, 1.2, 'T'], [3, 1.2, 'T'], [6, 1.2, 'E'], [2.4, 4.4, 'W', 1], [-2, 4.6, 'M'], [-12, 5, 'N'], [12, 5, 'S'], [0, 12.6, 'F'], [-20, 7, 'C'], [20, 7, 'C']],
      r: [['k', [[-5, 1.2], [-7.4, 4.2], [-8, 6.2]]], ['x', [[-1, 1.2], [-1, -1.6]]], ['x', [[3, 1.2], [3, -1.6]]], ['x', [[6, 1.2], [6.2, -1.6]]], ['k', [[2.4, 4.4], [1, -1.8]]]],
      tx: [[-9.6, 8, 'end drops', 'pacc']],
      c: 'Still four rushers, but one is a linebacker and one lineman drops into the hook. The protection is built for the wrong four, as in the Week 1 play animated in Minter\'s chapter.' },
  ],
  /* ---------- protection ---------- */
  protect: [
    { t: 'Slide protection', v: { x0: -11, x1: 11, y0: -7, y1: 6 },
      o: [...OLp(), ...GUN(-1.8)], d: [[-6.6, 1.4, 'E'], [-1, 1.4, 'T'], [3, 1.4, 'T'], [6.6, 1.4, 'E'], [-2.6, 4.6, 'M'], [2.6, 4.6, 'W']],
      r: [['b', [[-4, -0.8], [-2.8, -1.8]]], ['b', [[-2, -0.8], [-0.8, -1.8]]], ['b', [[0, -0.8], [1.2, -1.8]]], ['b', [[2, -0.8], [3.2, -1.8]]], ['b', [[4, -0.8], [5.4, -1.9]]], ['k', [[-1.8, -4.6], [-5.6, -2.8]]]],
      tx: [[3, -4.4, 'slide right →', 'pacc']],
      c: 'All five linemen step the same way and block the gap to that side, zone-style. The back takes the edge rusher on the other side. Stunts are easy to pass off; the back must win his one-on-one.' },
    { t: 'Man ("big on big")', v: { x0: -11, x1: 11, y0: -7, y1: 6 },
      o: [...OLp(), ...GUN(-1.8)], d: [[-6.6, 1.4, 'E'], [-2.6, 1.4, 'T'], [2.6, 1.4, 'T'], [6.6, 1.4, 'E'], [-1.2, 4.6, 'M', 1], [2.8, 4.6, 'W']],
      r: [['b', [[-4, -0.8], [-5.6, -0.4]]], ['b', [[-2, -0.8], [-2.4, 0.2]]], ['b', [[0, -0.8], [0, -1.6]]], ['b', [[2, -0.8], [2.4, 0.2]]], ['b', [[4, -0.8], [5.6, -0.4]]], ['k', [[-1.8, -4.6], [-1, -2.4], [-1.1, 3.3]]]],
      tx: [[-6.4, 3.6, 'back takes the Mike', 'pacc']],
      c: 'Each lineman blocks the defensive lineman over him; the back takes a linebacker. Simple and strong against four down linemen, vulnerable to stunts and to linebackers who swap.' },
    { t: 'Half-slide', v: { x0: -11, x1: 11, y0: -7, y1: 6 },
      o: [...OLp(), ...GUN(-1.8)], d: [[-6.6, 1.4, 'E'], [-1.2, 1.4, 'T'], [3, 1.4, 'T'], [6.6, 1.4, 'E'], [-3.4, 4.6, 'M', 1], [2.6, 4.6, 'W']],
      r: [['b', [[-4, -0.8], [-5.6, -0.4]]], ['b', [[-2, -0.8], [-1.4, 0.2]]], ['b', [[0, -0.8], [1.2, -1.8]]], ['b', [[2, -0.8], [3.2, -1.8]]], ['b', [[4, -0.8], [5.4, -1.9]]], ['k', [[-1.8, -4.6], [-3, -2.6], [-3.3, 3.3]]]],
      tx: [[4, -4.4, 'slide side', 'pacc'], [-6, -4.4, 'man side', 'pacc']],
      c: 'The most common NFL protection: the center and one side slide, the other side blocks man. The back works from the inside out on the man side. Before the snap the center calls out who is the "Mike," the linebacker the protection counts from.' },
    { t: 'Max protect', v: { x0: -13, x1: 13, y0: -8, y1: 7 },
      o: [...OLp(), ...UC(-6.4), [6.2, -1, 0, 'Y'], [-12, -0.8], [12, -0.8]],
      d: [[-5.6, 1.4, 'E'], [-1, 1.4, 'T'], [3, 1.4, 'T'], [8.4, 1.4, 'E'], [-2.4, 4.6, 'M'], [3.6, 4.6, 'W']],
      r: [['b', [[-4, -0.8], [-4.8, 0.2]]], ['b', [[-2, -0.8], [-1.4, 0.2]]], ['b', [[0, -0.8], [-0.6, 0.4]]], ['b', [[2, -0.8], [2.6, 0.2]]], ['b', [[4, -0.8], [4.2, 0.2]]], ['b', [[6.2, -1], [7.6, 0.4]]], ['b', [[0, -6.4], [-2.2, -3.4]]], ['k', [[-12, -0.8], [-12, 6.4]]], ['k', [[12, -0.8], [12, 6.4]]]],
      tx: [[-8, -6, 'seven block', 'pacc'], [0, -7.6, 'two go deep', 'ptx']],
      c: 'The tight end and back stay in, giving seven blockers (eight with a fullback) against any rush. Only two or three receivers go out, usually deep: the protection buys the time a shot needs.' },
    { t: 'Hot route', v: { x0: -17, x1: 9, y0: -6.5, y1: 9 },
      o: [...OLp(), ...GUN(-1.8), [-15.5, -0.8], [-10.5, -1.4, 'K', 'H']],
      d: [[-6.2, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [6.2, 1.2, 'E'], [-2.4, 3.8, 'M'], [-9, 4.8, 'S', 1], [-15.5, 5.4, 'C']],
      r: [['b', [[-4, -0.8], [-5.4, 0]]], ['b', [[-2, -0.8], [-1.4, 0.2]]], ['b', [[0, -0.8], [0, -1.6]]], ['b', [[2, -0.8], [2.6, 0.2]]], ['b', [[4, -0.8], [5.4, 0]]], ['b', [[-1.8, -4.6], [-2.4, -2.6]]], ['x', [[-9, 4.8], [-6.8, 0.6], [-3.2, -3.8]]], ['k', [[-10.5, -1.4], [-10.5, 0.8], [-5.6, 6]]]],
      tx: [[-11.8, 6.6, 'unblocked', 'pacc'], [-4, 7.4, 'hot', 'pacc']],
      c: 'Six rushers against six blockers: one is free by design. The receiver on his side "sight adjusts" to a quick slant into the space the blitzer left, and the quarterback throws it before the free rusher arrives.' },
  ],
  /* ---------- quick game ---------- */
  quick: [
    { t: 'Stick', o: [...OLp(), ...GUN(), [-20, -0.8], [8, -1.4], [14, -1.4], [20, -0.8]],
      d: [[14, 5.6, 'S', 1], [6, 6, 'W'], [20, 7, 'C']],
      r: [['r', [[20, -0.8], [20, 12]]], ['k', [[14, -1.4], [16, 0.6], [22, 1.4]]], ['k', [[8, -1.4], [8, 5.6], [7.2, 5.2]]], ['r', [[-20, -0.8], [-20, 5], [-20.6, 4.4]]]],
      n: [[23.4, 2.6, '1'], [9.8, 7.6, '2']],
      c: 'From trips: a clear-out go, a quick out to the flat, and a "stick" that stops at six yards and faces the quarterback. If the flat defender widens, throw the stick; if he sits, throw the flat. A third-and-short staple.' },
    { t: 'Slant-flat', o: [...OLp(), ...GUN(), [-20, -0.8], [14, -1.4], [20, -0.8]],
      d: [[16.8, 4.8, 'S', 1], [20.6, 6.4, 'C'], [5, 5, 'W']],
      r: [['k', [[20, -0.8], [20, 1.6], [14, 6.4]]], ['k', [[14, -1.4], [17.6, 0.4], [22, 1]]], ['r', [[-20, -0.8], [-20, 2], [-14, 6]]]],
      n: [[22.6, 2.4, '1'], [12.4, 7.4, '2']],
      c: 'The outside receiver runs a three-step slant, the inside one runs to the flat underneath him. The same defender cannot take both. Thrown in rhythm off a quick drop, it beats blitzes.' },
    { t: 'Spacing', o: [...OLp(), ...GUN(-1.8), [-20, -0.8], [7, -1.4], [13, -1.4], [20, -0.8]],
      d: [[-14, 5, 'N'], [-3, 5.4, 'M'], [8, 5.4, 'W'], [17, 5.4, 'S'], [20, 7, 'C']],
      r: [['k', [[20, -0.8], [20, 5.6], [19.6, 5]]], ['k', [[13, -1.4], [13, 5.6], [12.6, 5]]], ['k', [[7, -1.4], [5.6, 5.6], [5.2, 5]]], ['r', [[-1.8, -4.6], [-9, -2.6], [-16, 0]]], ['r', [[-20, -0.8], [-20, 5], [-20.6, 4.4]]]],
      c: 'Receivers settle five or six yards apart across the field, so four underneath zone defenders run out of width. A horizontal stretch: the quarterback throws to the window that opens.' },
    { t: 'Drive (shallow cross)', o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      d: [[-1, 6.4, 'M', 1], [-12, 6, 'N'], [12, 6, 'S'], [0, 14, 'F']],
      r: [['k', [[12, -1.4], [10, 2.4], [-6, 3], [-16, 3.4]]], ['k', [[-12, -1.4], [-12, 10.6], [6, 11.2]]], ['r', [[20, -0.8], [20, 14]]], ['r', [[-20, -0.8], [-20, 14]]]],
      n: [[-4, 1.4, '1'], [7.6, 12.6, '2']],
      c: 'A shallow cross at two or three yards and a dig at 10 to 12 behind it put the middle linebacker in a high-low bind. He jumps the shallow, the dig opens; he drops, the shallow runs away from everyone.' },
    { t: 'Y-cross', v: { x0: -25, x1: 25, y0: -6.5, y1: 21 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-6.2, -1, 0, 'Y'], [20, -0.8]],
      d: [[-11, 6, 'W'], [11, 8, 'S', 1], [0, 15, 'F'], [20, 9, 'C']],
      r: [['k', [[-6.2, -1], [-4.6, 8], [14, 16], [20, 17]]], ['r', [[-20, -0.8], [-20, 10], [-12, 19]]], ['r', [[20, -0.8], [20, 21]]], ['r', [[1.8, -4.6], [6, -1], [10, 1.2]]]],
      n: [[17, 18.6, '1'], [-11.4, 19.6, '2'], [11.4, 2.4, '3']],
      c: 'The tight end crosses the whole field at 15 to 18 yards, from one side to the far sideline, behind the underneath zones. A post and a clear-out go hold the safeties. The signature of Air Coryell and the Jon Gruden offenses.' },
  ],
  pa: [
    { t: 'Yankee (play-action)', v: { x0: -25, x1: 25, y0: -8, y1: 24 },
      o: [...OLp(), ...UC(-6.4), [6.2, -1, 0, 'Y'], [-20, -0.8], [20, -0.8]],
      d: [[0, 14, 'F', 1], [-20, 7, 'C'], [20, 7, 'C'], [-3, 5, 'M'], [3, 5, 'W']],
      r: [['m', [[0, -2.4], [1.6, -3.6], [0.4, -7]]], ['b', [[6.2, -1], [7, 0.2]]], ['b', [[0, -6.4], [2, -3.4]]], ['k', [[-20, -0.8], [-20, 10], [-5, 21.5]]], ['k', [[20, -0.8], [20, 6], [-15, 16.5]]]],
      n: [[-2.4, 22.8, '1'], [-18, 17.4, '2']],
      c: 'Max protection, a hard run fake and two deep routes: a post from one side and a deep over route from the other, crossing beneath it. The single middle safety cannot carry both. The classic under-center shot play.' },
    { t: 'Drift', v: { x0: -25, x1: 25, y0: -8, y1: 20 },
      o: [...OLp(), ...UC(-6.4), [6.2, -1, 0, 'Y'], [-20, -0.8], [14, -1.4], [20, -0.8]],
      d: [[-3, 5, 'M'], [3, 5, 'W'], [0, 15, 'F'], [20, 7, 'C'], [14, 6, 'S']],
      r: [['m', [[0, -2.4], [1.6, -3.6], [0.4, -6.4]]], ['d', [[-3, 5], [-2.4, 2]]], ['d', [[3, 5], [3.4, 2]]], ['k', [[14, -1.4], [12, 6], [4, 13]]], ['r', [[20, -0.8], [20, 16]]], ['r', [[-20, -0.8], [-20, 12], [-8, 13]]]],
      n: [[2.4, 14.4, '1']],
      c: 'A run fake pulls the linebackers forward; the slot "drifts" in behind them on a skinny post at 12 to 15 yards. The window is the space the linebackers left. Low risk, often a big gain.' },
    { t: 'Keeper (bootleg)', v: { x0: -25, x1: 25, y0: -10, y1: 20 },
      o: [...OLp(), ...UC(-6.4), [6.2, -1, 0, 'Y'], [-20, -0.8], [20, -0.8]],
      d: [[-3, 5, 'M'], [3, 5, 'W'], [0, 15, 'F'], [-20, 7, 'C'], [20, 7, 'C']],
      r: [['m', [[0, -2.4], [2, -4], [-4, -7], [-10, -6]]], ['k', [[6.2, -1], [2, 1.6], [-12, 2.6]]], ['k', [[20, -0.8], [18, 9], [-12, 13]]], ['r', [[-20, -0.8], [-20, 18]]]],
      n: [[-14, 4, '1'], [-14, 14.6, '2']],
      tx: [[-11, -8.4, 'QB boots', 'pacc']],
      c: 'The quarterback fakes one way and rolls the other, with three receivers flooding his side at three depths: a drag in the flat, a deep crosser, a clear-out. The Week 1 opener is this family.' },
  ],
  /* ---------- more runs ---------- */
  runs: [
    { t: 'Duo', v: { x0: -9.5, x1: 10.5, y0: -7.6, y1: 6.6 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], ...UC(-6.6)], d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [7.4, 1.2, 'E'], [-1.6, 4.8, 'M', 1], [3.4, 4.8, 'W', 1]],
      r: [['b', [[-2, -0.8], [-1.4, 0.2]]], ['b', [[0, -0.8], [-0.6, 0.2]]], ['b', [[2, -0.8], [2.6, 0.2]]], ['b', [[4, -0.8], [3.4, 0.2]]], ['b', [[-4, -0.8], [-4.4, 0.2]]], ['b', [[6.2, -1], [7, 0.2]]], ['run', [[0, -6.6], [0.6, -2], [1, 2.4], [0.6, 6]]]],
      tx: [[-1, -3.4, 'double', 'pacc'], [3, -3.4, 'double', 'pacc']],
      c: 'Two double-teams, no pullers, and a back running straight downhill. The doubles drive the linemen back, then a blocker comes off to the linebacker the back is reading. Power football without a puller.' },
    { t: 'Trap', v: { x0: -9.5, x1: 10.5, y0: -7.6, y1: 6.6 },
      o: [...OLp(), ...UC(-6.6)], d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T', 1], [6, 1.2, 'E'], [-1.6, 4.8, 'M'], [3.4, 4.8, 'W']],
      r: [['b', [[-2, -0.8], [-2.4, -2], [1.8, -2], [2.4, 0.4]]], ['b', [[0, -0.8], [-0.8, 0.2]]], ['b', [[2, -0.8], [3, 3.6]]], ['b', [[4, -0.8], [5.4, 0.2]]], ['b', [[-4, -0.8], [-4.4, 0.2]]], ['run', [[0, -6.6], [0.8, -2], [1.4, 1.6], [1.2, 6]]]],
      tx: [[4.4, 2.6, 'left unblocked', 'pacc', 'start']],
      c: 'The defensive tackle is deliberately left unblocked. He charges upfield into the backfield and is blocked from the side by a pulling guard, opening the hole he just left.' },
    { t: 'Toss / sweep', v: { x0: -9.5, x1: 14, y0: -7.6, y1: 6.6 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], ...UC(-6.6)], d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [7.4, 1.2, 'E'], [-1.6, 4.8, 'M'], [3.4, 4.8, 'W'], [11, 4, 'S']],
      r: [['b', [[2, -0.8], [3, -2.2], [8, -2], [11, 2.6]]], ['b', [[4, -0.8], [4.4, 0.4]]], ['b', [[6.2, -1], [7.8, 0.4]]], ['b', [[0, -0.8], [1.6, 0.4]]], ['run', [[0, -6.6], [4, -6], [10, -3.6], [12, 1], [12.6, 6]]], ['m', [[0, -2.4], [2.2, -5.6]]]],
      tx: [[2, -7.6, 'pitch', 'pacc']],
      c: 'The ball is pitched to the back, who races for the edge behind a pulling lineman. It attacks defenses that pinch inside, and pairs with the boot: same start, opposite finish.' },
  ],
  qbruns: [
    { t: 'QB power', v: { x0: -9.5, x1: 10.5, y0: -7.6, y1: 6.6 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], [0, -4.6, 'K', 'Q'], [1.8, -4.6, 0, 'R']], d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [7.4, 1.2, 'E'], [-1.6, 4.8, 'M'], [3.4, 4.8, 'W']],
      r: [['b', [[-2, -0.8], [-2.4, -2.2], [2.6, -2], [4, 2.4]]], ['b', [[2, -0.8], [1, 0.4]]], ['b', [[4, -0.8], [3.2, 0.4]]], ['b', [[0, -0.8], [-0.8, 0.4]]], ['b', [[1.8, -4.6], [6.4, -0.6], [7.4, 0.2]]], ['kr', [[0, -4.6], [2.4, -2.6], [4.4, 1.2], [4.2, 6]]]],
      tx: [[6, -4.4, 'back kicks out', 'pacc']],
      c: 'The quarterback is the ball carrier. The back becomes a blocker and kicks out the end; the backside guard pulls through the hole for the linebacker. The offense gains a blocker and the box count evens up.' },
    { t: 'QB counter', v: { x0: -9.5, x1: 10.5, y0: -7.6, y1: 6.6 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], [0, -4.6, 'K', 'Q'], [1.8, -4.6, 0, 'R']], d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [7.4, 1.2, 'E'], [-1.6, 4.8, 'M'], [3.4, 4.8, 'W']],
      r: [['b', [[2, -0.8], [1.6, -2.2], [-3.6, -2.4], [-5.4, 0.6]]], ['b', [[4, -0.8], [3.6, -2.6], [-2.2, -2.8], [-2, 3]]], ['b', [[-2, -0.8], [-1.2, 0.4]]], ['b', [[0, -0.8], [1, 0.4]]], ['m', [[1.8, -4.6], [5, -3]]], ['kr', [[0, -4.6], [1.2, -5], [-1.6, -3.2], [-3.4, 0.8], [-3.2, 6]]]],
      tx: [[5.6, -2, 'fake', 'pacc']],
      c: 'The quarterback takes a step one way, then follows two pullers the other way: the guard kicks out the end, the tackle leads up through the hole. Designed misdirection for a quarterback who runs like a back.' },
    { t: 'QB draw', v: { x0: -9.5, x1: 10.5, y0: -7.6, y1: 6.6 },
      o: [...OLp(), [0, -4.6, 'K', 'Q'], [1.8, -4.6, 0, 'R']], d: [[-6.4, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [6.4, 1.2, 'E'], [-1.6, 4.8, 'M'], [3.4, 4.8, 'W']],
      r: [['x', [[-6.4, 1.2], [-6, -3.2]]], ['x', [[6.4, 1.2], [6, -3.2]]], ['b', [[-2, -0.8], [-1.4, -1.6]]], ['b', [[2, -0.8], [2.6, -1.6]]], ['b', [[-4, -0.8], [-5.2, -1.8]]], ['b', [[4, -0.8], [5.2, -1.8]]], ['b', [[1.8, -4.6], [-1.4, 3.6]]], ['kr', [[0, -4.6], [0, -5.6], [1, -2.2], [1, 6]]]],
      c: 'The line sets as if to pass and lets the edge rushers run upfield. The quarterback shows pass, then runs through the space they vacated. Deadly against rushers who fly upfield and coverage that turns its back.' },
    { t: 'Inverted veer', v: { x0: -9.5, x1: 14, y0: -7.6, y1: 6.6 },
      o: [...OLp(), [6.2, -1, 0, 'Y'], [0, -4.6, 'K', 'Q'], [-1.8, -4.6, 0, 'R']], d: [[-4.6, 1.2, 'E'], [-1, 1.2, 'T'], [3, 1.2, 'T'], [7.4, 1.2, 'E', 1], [-1.6, 4.8, 'M'], [3.4, 4.8, 'W']],
      r: [['b', [[-2, -0.8], [-2.4, -2.2], [3, -2], [4.2, 2.6]]], ['b', [[4, -0.8], [3.4, 0.4]]], ['b', [[2, -0.8], [1, 0.4]]], ['b', [[0, -0.8], [-0.8, 0.4]]], ['run', [[-1.8, -4.6], [4, -4.4], [10, -2.6], [12, 2]]], ['kr', [[0, -4.6], [2.6, -2.4], [4.6, 1.4], [4.4, 6]]]],
      tx: [[9, 2.8, 'read', 'pacc']],
      c: 'An option in reverse: the back sweeps outside, the quarterback runs inside. The end is unblocked and read. If he widens with the back, the quarterback keeps; if he squeezes inside, the back gets it on the edge.' },
  ],
  /* ---------- red zone and two-minute ---------- */
  redzone: [
    { t: 'Fade and back-shoulder', v: { x0: -26, x1: 5.5, y0: -6, y1: 18 }, ez: 8,
      o: [...OLp(), ...GUN(), [-21, -0.8, 'K', 'X'], [-12, -1.4]],
      d: [[-20.4, 1.4, 'C', 1], [-8, 12, 'S']],
      r: [['k', [[-21, -0.8], [-22.6, 6], [-23, 15]]], ['d', [[-20.4, 1.4], [-21.4, 13]]], ['r', [[-12, -1.4], [-12, 4], [-7, 7]]]],
      tx: [[-17, 15.6, 'ball to the back shoulder', 'pacc']],
      c: 'One-on-one outside near the goal line. On a fade the ball drops over the defender; on a back-shoulder throw it is thrown behind the receiver, who turns back for it while the defender is still running.' },
    { t: 'Rub (stack release)', v: { x0: -24, x1: 5.5, y0: -6, y1: 13 }, ez: 6,
      o: [...OLp(), ...GUN(), [-14, -0.8, 'K'], [-13, -2.8]],
      d: [[-14, 2, 'C'], [-13, 4, 'N', 1]],
      r: [['r', [[-14, -0.8], [-14, 4], [-7, 8.6]]], ['k', [[-13, -2.8], [-15.4, 0], [-20, 3.6]]], ['d', [[-13, 4], [-14.4, 1.8]]]],
      tx: [[-15.6, -3.8, 'stacked', 'pacc']],
      c: 'Two receivers line up stacked, one behind the other. Their routes cross at the release, and a man defender is caught in the traffic. Contact must come from running the route; a deliberate block before the pass is offensive pass interference.' },
    { t: 'Prevent', v: { x0: -25, x1: 25, y0: -6.5, y1: 30 },
      o: [...OLp(), ...GUN(), [-20, -0.8], [-12, -1.4], [12, -1.4], [20, -0.8]],
      d: [[-4, 1.2, 'E'], [0, 1.2, 'T'], [4, 1.2, 'E'], [-14, 10, 'N'], [0, 9, 'M'], [14, 10, 'S'], [-20, 15, 'C'], [20, 15, 'C'], [-8, 24, 'S'], [8, 24, 'S'], [0, 28, 'F']],
      lines: [[10, '10'], [20, '20']],
      tx: [[0, 4.6, 'short throws conceded', 'pacc']],
      c: 'At the end of a half, the defense rushes three or four and drops everyone else deep, giving up short completions in exchange for time and keeping everything in front.' },
  ],
  /* ---------- special teams ---------- */
  st: [
    { t: 'Kickoff (current rules)', tall: true, s: 1.55, cmp: false, los: false, v: { x0: -27, x1: 27, y0: -6, y1: 68 }, ezb: 0,
      lines: [[20, 'R 20'], [30, 'R 30'], [35, 'R 35'], [40, 'R 40'], [65, 'K 35']],
      z: [[0, 10, 26, 10, 'landing zone']],
      o: [[0, 65, 'K', 'K'], ...[-20, -15.5, -11, -6.8, -2.4, 2.4, 6.8, 11, 15.5, 20].map(x => [x, 40.6])],
      d: [...[-21.6, -16.2, -10.8, -5.4, 0, 5.4, 10.8, 16.2, 21.6].map(x => [x, 32.5, 'R']), [-4, 2, 'R', 1], [4, 2, 'R', 1]],
      r: [['d', [[0.6, 63.4], [2.4, 12]]]],
      tx: [[0, 36.6, 'setup zone (R 30–35)', 'pacc'], [7.6, 48, 'kick', 'ptx', 'start']],
      c: 'The kicker alone at his own 35; his ten teammates at the receiving 40; at least nine return players in the setup zone; nobody moves until the ball lands or is caught. Kicks into the landing zone must be returned; a kick into the end zone in the air is a touchback to the 35.' },
    { t: 'Punt (spread punt)', tall: true, s: 1.1, cmp: false, v: { x0: -27, x1: 27, y0: -18, y1: 44 }, los: true,
      o: [[-7.2, -0.8], [-4.8, -0.8], [-2.4, -0.8], [0, -0.8, 'C'], [2.4, -0.8], [4.8, -0.8], [7.2, -0.8], [-23, -0.8, 0, 'G'], [23, -0.8, 0, 'G'], [0, -5, 0, 'PP'], [0, -14, 'K', 'P']],
      d: [[-25, 2.4, 'J'], [-21, 2.4, 'J'], [21, 2.4, 'J'], [25, 2.4, 'J'], [-6, 2.6, 'R'], [-2, 2.6, 'R'], [2, 2.6, 'R'], [6, 2.6, 'R'], [-9, 7, 'R'], [9, 7, 'R'], [0, 40, 'PR', 1]],
      r: [['k', [[-23, -0.8], [-22, 20], [-6, 36]]], ['k', [[23, -0.8], [22, 20], [6, 36]]]],
      tx: [[2.4, -5.6, 'personal protector', 'pacc', 'start'], [-14, 22, 'gunner', 'pacc'], [14, 22, 'gunner', 'pacc'], [2.4, -14.4, 'punter, 14–15 yards deep', 'ptx', 'start']],
      c: 'The snapper fires the ball 14 to 15 yards to the punter. A "personal protector" calls the protection; the "gunners" split wide and sprint at the returner while two "jammers" try to slow each of them. Hang time buys the coverage its time.' },
    { t: 'Field goal', v: { x0: -14, x1: 14, y0: -11, y1: 6 },
      o: [[-6, -0.8], [-4, -0.8], [-2, -0.8], [0, -0.8, 'C'], [2, -0.8], [4, -0.8], [6, -0.8], [-7.6, -1.8, 0, 'W'], [7.6, -1.8, 0, 'W'], [0, -7, 0, 'H'], [-1.4, -9.4, 'K', 'K']],
      d: [[-8.6, 1.2, 'E', 1], [8.6, 1.2, 'E', 1], [-3, 1.2, 'T'], [-1, 1.4, 'T'], [1, 1.4, 'T'], [3, 1.2, 'T']],
      r: [['x', [[-8.6, 1.2], [-6.4, -5.6]]], ['x', [[8.6, 1.2], [6.4, -5.6]]], ['r', [[-1.4, -9.4], [0, -7.4], [0, 4]]]],
      tx: [[0.6, -10.2, '≈1.3 s snap to kick', 'pacc', 'start']],
      c: 'The holder spots the ball seven yards deep; snap, hold and kick take about 1.3 seconds. Rushers come off the edges, where the angle to the kick point is shortest, and push through the middle, where tall linemen leap for a hand on the ball. Tyler Loop\'s 56-yarder beat Dallas as time expired in Week 3.' },
  ],
};

/* ===================== QUARTERBACK PROGRESSION (animated) ===================== */
function progScene(kind) {
  const B = kind === 'scramble';
  const pl = [
    pB('LT', 'LT', OLX[0], -0.9, [[T(-5), -2.8]], { kind: 'pp', v: 3 }),
    pB('LG', 'LG', OLX[1], -0.9, [[T(-2.4), -2.6]], { kind: 'pp', v: 3 }),
    pB('C', 'C', OLX[2], -0.9, [[MID, -2.6]], { kind: 'pp', v: 3 }),
    pB('RG', 'RG', OLX[3], -0.9, [[T(2.4), -2.6]], { kind: 'pp', v: 3 }),
    B ? pB('RT', 'RT', OLX[4], -0.9, [[T(5), -2.8], { w: 0.7 }, [T(4.4), -4.6, 2.4], [T(2.6), -6.2, 3.1]], { kind: 'none', v: 3 })
      : pB('RT', 'RT', OLX[4], -0.9, [[T(5), -2.8]], { kind: 'pp', v: 3 }),
    B ? pB('QB', 'QB', MID, -5, [[MID, -7.2, 1.0], [MID, -6.6, 1.25], { w: 1.4 }, [T(-2.4), -7.4, 3.0], [T(-6.4), -7.2, 3.45], [T(-10.5), -5.6, 4.0], [T(-12.6), -4.8, 4.35], [T(-13.2), -4.6, 4.6]], { kind: 'none' })
      : pB('QB', 'QB', MID, -5, [[MID, -7.2, 1.0], [MID, -6.6, 1.25], { w: 1.4 }, [T(0.3), -6.4, 2.9]], { kind: 'none' }),
    B ? pB('RB', 'RB', T(1.8), -5, [[T(3.2), -3.8, 0.7], { w: 0.9 }, [T(2.4), 0.2, 2.2], [T(-0.6), 2.4, 2.65], [T(-1), 2.6, 3.4], [T(-4), 2.8, 4.4]], { kind: 'route', v: 6 })
      : pB('RB', 'RB', T(1.8), -5, [[T(3.2), -3.8, 0.7], { w: 0.9 }, [T(2.4), 0.2, 2.2], [T(-0.6), 2.4, 2.65], [T(-1), 2.6, 2.95]], { kind: 'route', v: 6 }),
    pB('X', 'X', 7, -0.9, [[7, 22]], { v: 8 }),
    B ? pB('H', 'H', 16, -1.6, [[17.5, 7, 1.0], [18.6, 7.4, 1.3], { w: 1.6 }, [15, 9.6, 3.6], [11.2, 12, 4.4], [9.6, 12.8, 4.8]], { v: 7 })
      : pB('H', 'H', 16, -1.6, [[17.5, 7, 1.0], [18.6, 7.4, 1.3]], { v: 7 }),
    pB('Y', 'Y', 37.4, -1.6, [[37.4, 21]], { v: 7.6 }),
    B ? pB('Z', 'Z', 46.3, -0.9, [[46.3, 13.4, 1.8], [44.8, 15.2, 2.05], [36, 15.6, 2.95], [26, 16.4, 4.0], [17, 17, 4.9]], { v: 8 })
      : pB('Z', 'Z', 46.3, -0.9, [[46.3, 13.4, 1.8], [44.8, 15.2, 2.05], [36, 15.6, 2.95], [30, 16, 3.6]], { v: 8 }),
    pOD('E1', 'E', T(-6), 0.9, [[T(-6.6), -2.2], [T(-6.2), -3.2], [T(-6.5), -3.7, 3.0], [T(-7.6), -3.4, 4.4]], { kind: 'rush', v: 2.4, after: 'stay' }),
    pOD('T1', 'T', T(-1.2), 0.9, [[T(-1.4), -0.9], [T(-1.7), -1.5, 2.6], [T(-1.4), -1.9, 4.2]], { kind: 'rush', v: 2.4, after: 'stay' }),
    pOD('T2', 'T', T(1.2), 0.9, [[T(1.4), -0.9], [T(1.6), -1.5, 2.6], [T(1.1), -1.8, 4.2]], { kind: 'rush', v: 2.4, after: 'stay' }),
    B ? pOD('E2', 'E', T(6), 0.9, [[T(6.6), -2.6, 0.9], [T(6.2), -4.4, 1.6], [T(4.2), -6.2, 2.4], [T(1.8), -7.2, 3.0], [T(-2.6), -7.4, 3.6], [T(-6), -6.4, 4.4]], { kind: 'rush', v: 6, name: 'Edge rusher', after: 'stay' })
      : pOD('E2', 'E', T(6), 0.9, [[T(6.6), -2.2], [T(6.2), -3.2], [T(6.4), -3.9, 2.8]], { kind: 'rush', v: 2.4, after: 'stay' }),
    B ? pOD('M', 'M', T(0.4), 5, [[T(0.6), 6.4, 1.0], { w: 0.7 }, [T(0.8), 4.8, 2.3], [T(-0.6), 4.4, 2.9], [T(-2.4), 4.4, 3.6], [T(-5.6), 4.6, 4.4]], { v: 5, name: 'Linebacker' })
      : pOD('M', 'M', T(0.4), 5, [[T(0.6), 8.6, 1.2], [T(2.4), 10, 2.2], [T(2.6), 10.2, 2.9]], { v: 5, name: 'Linebacker', chase: 'RB' }),
    B ? pOD('W', 'W', T(-3.6), 5, [[19.4, 8.2, 1.3], { w: 1.3 }, [17.6, 7.4, 3.5], [15.2, 5.6, 4.3]], { v: 5 })
      : pOD('W', 'W', T(-3.6), 5, [[19.4, 8.2, 1.3], { w: 1.3 }, [21, 7.6, 3.0]], { v: 5 }),
    B ? pOD('N', 'N', 16.5, 5, [[13, 7.6, 1.3], { w: 1.5 }, [11.6, 5.2, 3.6], [9.6, 1.6, 4.4]], { v: 5 })
      : pOD('N', 'N', 16.5, 5, [[13, 7.6, 1.3]], { v: 5 }),
    pOD('SS', 'S', T(8), 9, [[T(9.2), 10, 1.0], [T(9), 11.4, 1.8], [T(6.6), 12.2, 2.6], [T(4.2), 12.6, 3.3]], { v: 5 }),
    pOD('FS', 'S', MID, 13.5, [[T(3), 15.4, 1.0], [T(8.4), 18, 1.8], [T(10.2), 19.6, 2.6]], { v: 6.5 }),
    B ? pOD('LC', 'CB', 7.4, 7, [[7.8, 13, 1.2], [8.2, 21, 2.6], [8.8, 22.4, 4.6]], { v: 7 })
      : pOD('LC', 'CB', 7.4, 7, [[7.8, 13, 1.2], [8.2, 21, 2.6]], { v: 7 }),
    pOD('RC', 'CB', 46, 7, [[46.6, 13, 1.2], [45.6, 19, 2.3], [43, 20.2, 3.2]], { v: 7 }),
  ];
  const base = {
    generic: true, gun: true, los: 35, first: 45, view: { y0: -9.5, y1: 23 }, rest: -0.6, passPlay: true, noTackle: !B ? false : true,
    players: pl, mobileView: { x0: 4, x1: 49.5 },
  };
  const tl = (t0, t1, text) => ({ t0, t1, x: T(-3), y: 21.8, text });
  if (!B) return Object.assign(base, {
    title: 'The progression: read 1, read 2, checkdown', src: 'Concept illustration · Ravens offense, opponent defense in Cover 3',
    tag: 'Progression to the checkdown', t: [-0.6, 4.6], end: 4.3, pursuit: 0.9,
    ball: [{ t: 2.72, pass: 'RB', at: 3.0 }],
    rings: [[1.0, 1.75, 'Y'], [1.75, 2.45, 'Z'], [2.45, 3.0, 'RB']],
    labels: [tl(0, 0.99, 'DROP · 0.0–1.0 s'), tl(1.0, 1.74, 'READ 1 · SEAM · 1.0–1.7 s'), tl(1.75, 2.44, 'READ 2 · DIG · 1.7–2.4 s'), tl(2.45, 3.1, 'CHECKDOWN · 2.4–3.0 s'), tl(3.1, 4.6, 'BALL OUT AT 2.7 s')],
    beats: [
      [-0.6, 'Dagger from a two-by-two set: Y runs a seam to clear the middle, Z a deep dig behind it, X a go route, H a hook. The back stays in to check for a blitz before he releases. The defense shows one deep safety.'],
      [0, 'Snap. The ball reaches the quarterback in about a third of a second. His feet now set the clock: three steps back and a hitch put him at the top of his drop at 1.0 s, when the first route is ready.'],
      [1.0, 'Read 1, the seam. The deep middle safety carries Y. The window is closed, so the quarterback does not wait for it to open: his eyes move on.'],
      [1.75, 'Read 2, the dig. The rotated safety drops underneath it at 11 or 12 yards and the linebacker sinks into its path. Throwing now would be into two defenders.'],
      [2.45, 'The checkdown. The back finished checking the protection, released and sat down over the ball. The linebacker who took away read 2 by dropping deep cannot also cover the space at three yards.'],
      [2.72, 'The ball comes out at 2.7 seconds. A completed checkdown is not a failure: on first-and-10 a five-yard gain keeps the offense on schedule.']
    ],
    recon: 'Concept illustration, not a specific 2026 play. Timings are typical of a shotgun dropback: the 2026 league average time to throw is about 2.9 seconds (Next Gen Stats).'
  });
  return Object.assign(base, {
    title: 'When the checkdown is gone: the scramble drill', src: 'Concept illustration · same play, the back is covered and the pocket breaks down',
    tag: 'Scramble drill', t: [-0.6, 5.6], end: 5.3, pursuit: 0.85,
    ball: [{ t: 4.32, pass: 'H', at: 4.72 }],
    rings: [[1.0, 1.75, 'Y'], [1.75, 2.45, 'Z'], [2.45, 2.95, 'RB'], [2.6, 3.4, 'E2'], [3.4, 4.75, 'H']],
    labels: [tl(0, 0.99, 'DROP · 0.0–1.0 s'), tl(1.0, 1.74, 'READ 1 · SEAM'), tl(1.75, 2.44, 'READ 2 · DIG'), tl(2.45, 2.95, 'CHECKDOWN: COVERED'), tl(2.96, 3.45, 'POCKET COLLAPSES · 3.0 s'), tl(3.46, 4.3, 'SCRAMBLE DRILL'), tl(4.31, 5.6, 'THROWN AT 4.3 s')],
    beats: [
      [-0.6, 'The same dagger call. This time the defense has a linebacker assigned to the back.'],
      [1.0, 'Read 1, the seam: carried by the deep safety.'],
      [1.75, 'Read 2, the dig: the rotated safety is sitting under it.'],
      [2.45, 'The checkdown: the linebacker has come forward and sits on the back. Every receiver the progression offered is covered.'],
      [2.6, 'Meanwhile the right end has beaten the tackle around the edge. At three seconds most pockets begin to collapse, and the quarterback has to leave this one.'],
      [3.0, 'He escapes to his left. The scramble drill begins: receivers abandon their routes for rules. The receiver on the scramble side works toward the sideline and climbs, the deep crosser keeps coming across, the deep route keeps going, nobody runs back toward the quarterback.'],
      [3.7, 'The quarterback threatens to run, so the flat defender must come up to stop him. H climbs behind that defender into the space he left.'],
      [4.32, 'The throw at 4.3 seconds, on the move, to the receiver who followed the rules. Had nobody come open, the quarterback would run or throw the ball away.']
    ],
    recon: 'Concept illustration, not a specific 2026 play. Scramble-drill rules vary by team; these are common ones.'
  });
}

/* ===================== GLOSSARY ADDITIONS ===================== */
const GLOSS_ADD = {
  'no-huddle': ['No-huddle', 'The offense lines up without huddling, calling the play at the line. It prevents the defense from substituting and limits its disguises. Run at full speed it is the hurry-up.'],
  cadence: ['Cadence', 'The quarterback\'s snap count. Varying it keeps rushers from timing the snap.'],
  'hard-count': ['Hard count', 'A sudden, loud call meant to draw defenders offside without snapping the ball.'],
  'box-spill': ['Box and spill', 'Two ways to fit a run at the edge. Boxing (squeezing) turns the run back inside to the linebackers; spilling forces it outside to faster pursuers.'],
  tampa2: ['Tampa 2', 'Cover 2 in which the middle linebacker sprints to the deep middle between the two safeties, closing the seam. Associated with Tony Dungy and Monte Kiffin.'],
  'cover2-man': ['Cover 2 man', 'Two deep safeties split the field in halves while the defenders underneath play man coverage from a trail position.'],
  sky: ['Sky, buzz and cloud', 'The three Cover 3 rotations, named for who rotates to the flat: a safety (sky), a linebacker with a safety to the hook (buzz), or the cornerback (cloud).'],
  stunt: ['Stunt (twist)', 'Two or more pass rushers exchange gaps after the snap so blockers must pass them off. T-E: the tackle goes first and the end loops; E-T: the reverse.'],
  blitz: ['Blitz', 'A pressure with five or more rushers, or a rush by a linebacker or defensive back.'],
  'fire-zone': ['Fire zone', 'A five-man pressure with three deep and three underneath zone defenders, usually with a lineman dropping into coverage. The zone blitz popularized by Dick LeBeau.'],
  'cover-0': ['Cover 0', 'Man coverage with no deep safety, usually behind a six-man or larger rush.'],
  'mike-id': ['Mike identification', 'The pre-snap call naming the linebacker the protection counts from. Every blocker\'s assignment follows from it.'],
  slide: ['Slide protection', 'Linemen step the same direction and block gaps rather than men. Strong against stunts.'],
  'man-pro': ['Man protection', 'Each blocker is assigned a specific rusher ("big on big"). Strong against power, vulnerable to stunts.'],
  'half-slide': ['Half-slide', 'The center and one side slide while the other side blocks man; the most common NFL protection.'],
  'max-pro': ['Max protection', 'Seven or eight blockers, with the tight end and back staying in. Used for deep shots.'],
  chip: ['Chip', 'A back or tight end hits an edge rusher on his way out to a route, helping the tackle without staying in to block.'],
  hot: ['Hot route', 'A route converted to a quick throw when the defense sends more rushers than the protection can block. Also called a sight adjustment.'],
  'quick-game': ['Quick game', 'Short passes thrown in rhythm off a quick drop, about two seconds after the snap: stick, slant-flat, spacing.'],
  stick: ['Stick', 'A quick concept: a six-yard route that stops and faces the quarterback, paired with a quick out to the flat.'],
  drive: ['Drive', 'A shallow cross at two or three yards with a dig behind it at 10 to 12, putting the middle linebacker in a high-low bind.'],
  'y-cross': ['Y-cross', 'The tight end runs a deep crossing route across the field at 15 to 18 yards behind the underneath zones.'],
  yankee: ['Yankee', 'A max-protection play-action shot with a post and a deep crosser from opposite sides, attacking a single-high safety.'],
  drift: ['Drift', 'A play-action route in which a slot receiver runs a skinny post behind linebackers pulled forward by the fake.'],
  progression: ['Progression', 'The order in which the quarterback checks his receivers, moving to the next when one is covered.'],
  'half-field': ['Half-field and full-field reads', 'A half-field read checks only one side of the field; a full-field read sweeps both and takes longer.'],
  checkdown: ['Checkdown', 'The last, shortest option in a progression, usually the back or tight end in front of the linebackers.'],
  'scramble-drill': ['Scramble drill', 'The rules receivers follow when the quarterback leaves the pocket: short receivers work toward the scramble side, deep receivers come back toward it, nobody runs back at the quarterback.'],
  'time-to-throw': ['Time to throw', 'The time from snap to release, measured by Next Gen Stats. The 2026 league average is about 2.9 seconds.'],
  duo: ['Duo', 'A downhill run with two double-teams and no pullers.'],
  trap: ['Trap', 'A run that leaves a defensive lineman unblocked so he charges upfield and is blocked from the side by a pulling lineman.'],
  toss: ['Toss and sweep', 'Outside runs that race the ball to the edge behind pulling or reach blockers.'],
  'qb-run': ['Designed quarterback run', 'A run in which the quarterback is the intended ball carrier from the start: QB power, QB counter, QB draw.'],
  'inverted-veer': ['Inverted veer', 'An option in which the back runs outside and the quarterback inside, reading an unblocked end.'],
  fade: ['Fade and back-shoulder', 'A deep outside route against tight coverage. On a back-shoulder throw the ball is thrown behind the receiver, who turns back to it.'],
  stack: ['Stack', 'Two receivers aligned one behind the other, creating a free release and natural rubs.'],
  prevent: ['Prevent', 'A late-half defense that rushes three or four and drops deep, trading short completions for time.'],
  'landing-zone': ['Landing zone', 'Under the kickoff rules adopted in 2024, the area between the receiving team\'s goal line and 20 where a kick must land.'],
  touchback: ['Touchback', 'A dead ball awarded at a set yard line without a return; on kickoffs that reach the end zone in the air, the 35.'],
  gunner: ['Gunner', 'A punt-coverage player split wide who sprints at the returner. The jammers try to slow him.'],
  'personal-protector': ['Personal protector', 'The upback who calls the punt protection and blocks in front of the punter.'],
  'hang-time': ['Hang time', 'The time a punt or kick spends in the air. It gives the coverage time to reach the returner.'],
};
