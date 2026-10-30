/* ===================== GLOSSARY ===================== */
const GLOSS = {
  'glossary-term': ['Glossary term', 'Underlined terms like this one show a definition on hover, focus or tap. All of them are collected in the glossary at the end.'],
  down: ['Down', 'One play. The offense has four downs to gain ten yards; "third-and-4" means third down with four yards to go.'],
  los: ['Line of scrimmage', 'The imaginary line through the tip of the ball that neither team may cross before the snap. Drawn blue on television.'],
  'line-to-gain': ['Line to gain', 'The spot the offense must reach for a new set of downs. The yellow line on television.'],
  hash: ['Hash marks', 'Two rows of short lines, 70 feet 9 inches from each sideline in the NFL. A play that ends outside them restarts on the nearer hash.'],
  boundary: ['Boundary (short side)', 'The side of the field nearer the sideline when the ball is on a hash. Less space to throw into, easier to defend with fewer players.'],
  'field-side': ['Field (wide side)', 'The side with more room when the ball is on a hash. Defenses often put their best cover players and their pressure to the field.'],
  motion: ['Motion', 'One offensive player moving parallel to or away from the line as the ball is snapped. Only one player may be in motion, and he may not be moving forward at the snap.'],
  shift: ['Shift', 'Two or more offensive players changing position before the snap. All must then be set for one second.'],
  personnel: ['Personnel', 'The offense\'s mix of skill players, named by two digits: running backs, then tight ends. "12" is one back and two tight ends.'],
  formation: ['Formation', 'Where the offensive players line up. The same personnel can produce many formations.'],
  trips: ['Trips (3x1)', 'Three receivers to one side of the formation and one to the other.'],
  bunch: ['Bunch', 'Three receivers packed close together, which makes it hard for defenders to press and easy to create traffic.'],
  empty: ['Empty', 'No running back behind the quarterback: all five eligible players are spread out as receivers.'],
  strength: ['Strength', 'The side of the formation with more blockers (run strength, usually the tight end side) or more receivers (pass strength). Defenses align to it.'],
  shotgun: ['Shotgun', 'The quarterback stands about five yards behind the center and receives a short snap through the air.'],
  'under-center': ['Under center', 'The quarterback takes the snap directly from the center\'s hands. He must turn his back to the defense to hand off, which disguises play-action.'],
  pistol: ['Pistol', 'A shorter shotgun, about four yards deep, with the running back directly behind the quarterback.'],
  unbalanced: ['Unbalanced line', 'An offensive line with three linemen on one side of the center and one on the other, usually by moving a tackle. It creates an extra blocker to one side.'],
  wing: ['Wing', 'A tight end or back aligned just outside and behind the end of the line. Useful for arc blocks, motion and leverage.'],
  gaps: ['Gaps (A, B, C, D)', 'The spaces between offensive linemen: A between center and guard, B between guard and tackle, C outside the tackle, D outside the tight end.'],
  technique: ['Technique', 'A number describing where a defensive lineman aligns relative to the offensive linemen: 0 head-up on the center, 3 on the guard\'s outside shoulder, 5 on the tackle\'s outside shoulder, 9 wide of the tight end.'],
  fit: ['Run fit', 'The gap each defender is responsible for on a run. A defense "fits" a run when every gap is filled.'],
  force: ['Force player', 'The defender who sets the outside edge on a run, turning the ball carrier back inside toward help.'],
  box: ['The box', 'The area near the line from roughly one tight end to the other, about seven yards deep. Coaches count how many defenders are in it.'],
  'plus-one': ['Plus-one', 'One more defender than the offense has blockers at the point of attack. The unblocked defender who makes the tackle.'],
  man: ['Man coverage', 'Each defender is assigned a specific receiver and follows him.'],
  zone: ['Zone coverage', 'Each defender is assigned an area of the field and covers whoever enters it.'],
  match: ['Match coverage', 'Zone coverage that converts to man according to rules about receiver routes ("if the slot goes vertical, take him"). Most modern coverages are match coverages.'],
  mofc: ['Middle of the field closed (MOFC)', 'A single safety deep in the middle. Suggests Cover 1 or Cover 3, unless the defense rotates at the snap.'],
  mofo: ['Middle of the field open (MOFO)', 'Two deep safeties, leaving the deep middle open. Suggests Cover 2, Cover 4 or Cover 6, unless the defense rotates at the snap.'],
  'cover-3': ['Cover 3', 'Three deep defenders (two corners and a safety) each take a third of the deep field; four defenders play underneath zones.'],
  rotation: ['Rotation', 'Safeties changing their alignment at the snap, turning one coverage shell into another (for example two-high into one-high).'],
  bail: ['Bail', 'A cornerback turning his hips at the snap and running to a deep zone, typically a deep third in Cover 3.'],
  leverage: ['Leverage', 'Which side of a receiver a defender aligns on. Inside leverage takes away inside routes and invites outside ones; it often reveals where help is.'],
  mugged: ['Mugged A-gaps', 'Linebackers standing on the line of scrimmage in the A-gaps, threatening to blitz. A classic look for simulated pressures.'],
  sim: ['Simulated pressure', 'A four-man rush that looks like a blitz: a linebacker or safety rushes while a lineman drops into coverage, confusing the protection without sacrificing coverage.'],
  nickel: ['Nickel', 'A defense with five defensive backs, usually adding a cornerback to cover a slot receiver.'],
  'big-nickel': ['Big nickel', 'A nickel defense whose fifth defensive back is a safety rather than a cornerback. The Ravens\' primary package under Minter.'],
  dime: ['Dime', 'A defense with six defensive backs, used against obvious passing situations.'],
  'route-tree': ['Route tree', 'A numbered set of basic routes a receiver can run. Numbering varies between teams.'],
  concept: ['Concept', 'A combination of routes designed to work together against a coverage, such as smash, flood, mesh or dagger.'],
  conflict: ['Conflict defender', 'The defender a play is built to attack: whatever he chooses, he leaves something open.'],
  rub: ['Rub (pick)', 'Receivers crossing close together so man defenders are slowed by traffic. Legal as long as the receiver does not deliberately block a defender before the pass.'],
  'zone-run': ['Zone run', 'A run scheme in which the line moves together in one direction and blocks areas rather than specific defenders. The back chooses the hole.'],
  'inside-zone': ['Inside zone', 'A zone run aimed between the guard and tackle, with the back reading the defensive linemen for a cutback.'],
  'outside-zone': ['Outside zone', 'A zone run aimed outside the tight end. Linemen try to reach the defender to their play-side; the back presses the edge, then bends, bangs (cuts up) or bounces outside.'],
  'gap-scheme': ['Gap scheme', 'A run scheme with angled down-blocks and one or more pulling linemen leading through a specific hole.'],
  power: ['Power', 'A gap run in which the backside guard pulls to lead through the hole, with a back or tight end kicking out the end man.'],
  counter: ['Counter', 'A gap run in which the back takes a step one way before following two pulling blockers the other way.'],
  pull: ['Pull', 'A lineman stepping back and running along the line to block at another point. Linebackers are taught to follow pullers.'],
  reach: ['Reach block', 'A lineman stepping laterally to get his head across a defender who lines up to his play-side. The core block of outside zone.'],
  arc: ['Arc block', 'A tight end or back looping around the edge to block a defender in space, usually a safety or cornerback, instead of the nearest lineman.'],
  'read-option': ['Read option', 'A run where one defender is left unblocked on purpose and the quarterback decides after the snap whether to hand off or keep, based on that defender.'],
  rpo: ['Run-pass option (RPO)', 'A play where the line blocks a run and the quarterback reads a second-level defender to decide between handing off and throwing a quick pass.'],
  boot: ['Bootleg', 'A play-action pass in which the quarterback fakes the run one way and rolls out the other, often without a blocker in front of him.'],
  choice: ['Choice route', 'An option route on which the receiver decides after the snap to break inside, outside or continue, based on the defender\'s leverage. The quarterback must read the same thing.'],
  screen: ['Screen', 'A pass behind or near the line after the offensive linemen let rushers through and release to block in space.'],
  perimeter: ['Perimeter blocking', 'Blocking outside the tackles and downfield, in open space, mostly by wide receivers and tight ends: stalk blocks on cornerbacks, crack blocks on linebackers and safeties, arc blocks and screen convoys. It turns medium gains into explosive plays.'],
  stalk: ['Stalk block', 'A receiver runs at a cornerback as if on a route, then squares up and mirrors him, staying between the defender and the ball carrier.'],
  crack: ['Crack block', 'A receiver steps back inside to block a linebacker or safety pursuing toward the sideline, usually from the defender\'s blind side.'],
  smash: ['Smash', 'A two-route combination: #1 runs a five-yard hitch, #2 a corner route over him. Reads the cornerback; designed to beat Cover 2.'],
  flood: ['Flood', 'Three receivers at three depths on one side (go, sail at 12 to 14 yards, flat). Reads the flat defender high to low; designed to beat Cover 3.'],
  mesh: ['Mesh', 'Two shallow crossing routes in opposite directions that pass within an arm\'s length, creating traffic that frees a receiver against man coverage.'],
  'four-verts': ['Four verticals', 'Four receivers run straight downfield (two go routes outside, two seams inside) to outnumber the deep defenders.'],
  dagger: ['Dagger', '#2 runs a seam to clear the middle; #1 runs a deep dig at 15 to 18 yards into the space left behind. Designed to beat quarters.'],
  proe: ['Pass rate over expected (PROE)', 'How much more (or less) often a team passes than an average team would in the same down, distance, field position and score. Negative values mean run-leaning.'],
  'light-box': ['Light box / stacked box', 'A light box has six or fewer defenders near the line; a stacked (heavy) box has eight or more. They measure how much the defense is committing to stop the run.'],
  'sub-package': ['Sub package', 'Any defense with five or more defensive backs (nickel, dime), substituted in place of linebackers.'],
  front: ['Front', 'The alignment of the defensive linemen, edge players and linebackers before the snap. Separate from personnel: the same players can line up in many fronts.'],
  'odd-even': ['Odd and even fronts', 'An odd front has a defender head-up on the center (a 0-technique nose), as in the 3-4, tite and bear fronts. An even front has nobody directly over the center, as in 4-3 over and under fronts and most nickel fronts.'],
  covered: ['Covered / uncovered lineman', 'An offensive lineman with a defensive lineman aligned on him is covered. One with nobody on him is uncovered and free to double-team or climb to a linebacker.'],
  'two-gap': ['One-gap and two-gap', 'A one-gap lineman attacks a single gap at the snap. A two-gap lineman engages the blocker in front of him and controls the gaps on both sides, freeing the linebackers.'],
  epa: ['Expected points added (EPA)', 'The change in a drive\'s expected points from before a play to after it, based on down, distance and field position.'],
  'success-rate': ['Success rate', 'The share of plays that keep an offense on schedule. One common version counts plays with positive EPA; an older one counts 40% of the needed yards on first down, 60% on second and 100% on third and fourth.'],
};

/* ===================== LAB UI ===================== */
function mountLab(host) {
  host.classList.add('fig');
  const head = hx('div', { class: 'fig-head' }, host, '<h5>Coverage vs. concept</h5><span class="src">Simulation · Ravens offense, 2x2 shotgun</span>');
  const ctrls = hx('div', { style: 'display:flex;flex-wrap:wrap;gap:.2rem 1.6rem' }, host);
  const c1 = hx('div', null, ctrls), c2 = hx('div', null, ctrls);
  hx('p', { class: 'seg-label' }, c1, 'Defense calls');
  const segC = hx('div', { class: 'seg', role: 'group', 'aria-label': 'Coverage' }, c1);
  hx('p', { class: 'seg-label' }, c2, 'Offense calls');
  const segR = hx('div', { class: 'seg', role: 'group', 'aria-label': 'Concept' }, c2);
  const grid = hx('div', { class: 'fig-grid' }, host);
  const left = hx('div', { style: 'min-width:0' }, grid), right = hx('div', { style: 'min-width:0' }, grid);
  const ver = hx('div', { class: 'verdict' }, right);
  const beats = hx('div', { style: 'margin-top:1rem' }, right);
  let cov = 'C2', conc = 'smash';
  const B = Board(left, buildLab(cov, conc), { beatsHost: beats });
  legend(left);
  hx('p', { class: 'seg-label', style: 'margin-top:1.1rem' }, right, 'All 30 matchups · click a cell');
  const mx = hx('div', { class: 'matrix' }, right);
  const sym = { win: '✓', ok: '~', loss: '✗' };
  const cells = {};
  mx.appendChild(hx('div', { class: 'h' }));
  Object.keys(COVS).forEach(c => hx('div', { class: 'h' }, mx, COVS[c].short === '4' ? 'C4' : 'C' + COVS[c].short));
  Object.keys(ROUTES).forEach(r => {
    hx('div', { class: 'rh' }, mx, ROUTES[r].name);
    Object.keys(COVS).forEach(c => {
      const g = VERDICT[r][c][0], wrap = hx('div', { style: 'padding:0;background:transparent' }, mx);
      const b = hx('button', { type: 'button', class: g, 'aria-label': ROUTES[r].name + ' against ' + COVS[c].name + ': ' + ({ win: 'offense wins', ok: 'playable', loss: 'defense wins' })[g] }, wrap, sym[g]);
      b.onclick = () => { cov = c; conc = r; update(true); };
      cells[r + c] = b;
    });
  });
  hx('p', { class: 'recon', style: 'margin-top:.5rem' }, right, '✓ concept beats the coverage · ~ playable, small gain or one-on-one · ✗ coverage takes it away. Verdicts describe this simulated, textbook version of each matchup; on the field, alignment, leverage, timing and individual talent can change the answer.');
  const btnsC = Object.keys(COVS).map(c => { const b = hx('button', { type: 'button' }, segC, COVS[c].name); b.onclick = () => { cov = c; update(true); }; return [c, b]; });
  const btnsR = Object.keys(ROUTES).map(r => { const b = hx('button', { type: 'button' }, segR, ROUTES[r].name); b.onclick = () => { conc = r; update(true); }; return [r, b]; });
  function update(play) {
    btnsC.forEach(([c, b]) => b.setAttribute('aria-pressed', c === cov ? 'true' : 'false'));
    btnsR.forEach(([r, b]) => b.setAttribute('aria-pressed', r === conc ? 'true' : 'false'));
    Object.keys(cells).forEach(k => cells[k].classList.toggle('cur', k === conc + cov));
    const V = VERDICT[conc][cov];
    ver.innerHTML = `<span class="pill ${V[0]}">${({ win: 'Offense wins', ok: 'Playable', loss: 'Defense wins' })[V[0]]}</span><h6>${ROUTES[conc].name} vs ${COVS[cov].name}: ${V[3]}</h6><p class="why">${V[4]}</p><p class="recon">Simulated matchup: the verdict holds for this textbook version, not for every snap.</p>`;
    B.setScene(buildLab(cov, conc));
    if (play && !RM) B.play();
  }
  update(false);
}

/* ===================== PERSONNEL UI ===================== */
function mountPersonnel(host) {
  host.classList.add('fig');
  hx('div', { class: 'fig-head' }, host, '<h5>Personnel groupings and the defense\'s answer</h5><span class="src">Ravens offense · typical defensive response</span>');
  hx('p', { class: 'seg-label' }, host, 'Offensive personnel (backs, tight ends)');
  const seg = hx('div', { class: 'seg', role: 'group', 'aria-label': 'Personnel' }, host);
  const grid = hx('div', { class: 'fig-grid' }, host);
  const left = hx('div', { style: 'min-width:0' }, grid), right = hx('div', { style: 'min-width:0' }, grid);
  const B = Board(left, persScene('11'), { static: true });
  const txt = hx('div', { class: 'verdict' }, right);
  const keys = ['11', '12', '21', '22', '13', '10'];
  const btns = keys.map(k => { const b = hx('button', { type: 'button' }, seg, k); b.onclick = () => set(k); return [k, b]; });
  function set(k) {
    btns.forEach(([x, b]) => b.setAttribute('aria-pressed', x === k ? 'true' : 'false'));
    B.setScene(persScene(k));
    const p = PERS[k];
    txt.innerHTML = `<span class="pill ok" style="background:var(--purple)">${k} personnel</span><h6>${p.head.split(': ')[1]}</h6><p class="why"><b>Typical answer:</b> ${p.def}.</p><p class="why">${p.text}</p>`;
    initTerms(txt);
  }
  set('11');
}

/* ===================== QUIZ ===================== */
let QUIZ_N = 0, QUIZ_OK = 0, QUIZ_DONE = 0;
const QUIZ_TOTAL = 7;
function mountQuiz(host, q) {
  const n = ++QUIZ_N;
  host.className = 'quiz';
  hx('div', { class: 'qn' }, host, 'Read ' + n + ' of ' + QUIZ_TOTAL + ' · ' + q.kind);
  hx('h5', null, host, q.q);
  const grid = hx('div', { class: 'fig-grid' }, host);
  const left = hx('div', { style: 'min-width:0' }, grid), right = hx('div', { style: 'min-width:0' }, grid);
  const st = !!q.scene.static;
  const opts0 = hx('div', null, right);
  const bh = hx('div', { hidden: '', style: 'margin-top:1rem' }, right);
  const B = Board(left, q.scene, { static: st, noAuto: true, beatsHost: st ? null : bh });
  if (!st) { B.lock(true); B.seek(q.freeze); }
  const opts = hx('div', { class: 'opts' }, opts0);
  const ans = hx('div', { class: 'answer', hidden: '' }, opts0);
  const score = hx('div', { class: 'score' }, opts0);
  const bs = q.opts.map((o, i) => {
    const b = hx('button', { type: 'button', class: 'opt' }, opts, '<span class="k">' + 'ABCD'[i] + '</span><span>' + o + '</span>');
    b.onclick = () => {
      bs.forEach((x, j) => { x.disabled = true; if (j === q.ans) x.classList.add('right'); });
      const ok = i === q.ans; if (!ok) b.classList.add('wrong');
      QUIZ_DONE++; if (ok) QUIZ_OK++;
      ans.hidden = false;
      ans.innerHTML = (ok ? '<b class="r">Correct.</b> ' : '<b class="x">Not quite.</b> ') + q.explain + (st ? '' : ' <em>Press play to see the snap.</em>');
      initTerms(ans);
      document.querySelectorAll('.score').forEach(s => s.textContent = 'Score: ' + QUIZ_OK + ' of ' + QUIZ_DONE + ' answered');
      if (!st) { bh.hidden = false; B.lock(false); B.seek(q.scene.t[0]); if (!RM) B.play(); }
    };
    return b;
  });
}

/* ===================== INIT ===================== */
function initTerms(root) {
  root.querySelectorAll('.g:not([data-bound])').forEach(el => {
    el.dataset.bound = '1';
    el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button');
    el.addEventListener('mouseenter', () => TIP.show(el));
    el.addEventListener('mouseleave', () => { if (TIP.pinned !== el) TIP.hide(); });
    el.addEventListener('focus', () => TIP.show(el));
    el.addEventListener('blur', () => TIP.hide());
    el.addEventListener('click', e => { e.stopPropagation(); if (TIP.pinned === el) TIP.hide(); else { TIP.show(el); TIP.pinned = el; } });
    el.addEventListener('keydown', e => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); e.stopPropagation(); if (TIP.pinned === el) TIP.hide(); else { TIP.show(el); TIP.pinned = el; } }
    });
  });
}
const TIP = { el: null, pinned: null,
  show(el) {
    const d = GLOSS[el.dataset.g]; if (!d) return;
    const tip = this.el; tip.innerHTML = '<b>' + d[0] + '</b>' + d[1]; tip.classList.add('on');
    if (this.cur && this.cur !== el) this.cur.removeAttribute('aria-describedby');
    this.cur = el; el.setAttribute('aria-describedby', 'tip'); el.setAttribute('aria-expanded', 'true');
    const r = el.getBoundingClientRect(), tw = tip.offsetWidth, th = tip.offsetHeight;
    const x = Math.min(window.innerWidth - tw - 10, Math.max(10, r.left + r.width / 2 - tw / 2));
    let y = r.top - th - 8; if (y < 54) y = r.bottom + 8;
    tip.style.left = x + 'px'; tip.style.top = y + 'px';
  },
  hide() { this.el.classList.remove('on'); this.pinned = null; if (this.cur) { this.cur.removeAttribute('aria-describedby'); this.cur.setAttribute('aria-expanded', 'false'); this.cur = null; } }
};

function boot() {
  if (typeof GLOSS_ADD !== 'undefined') Object.assign(GLOSS, GLOSS_ADD);
  TIP.el = hx('div', { id: 'tip', role: 'tooltip' }, document.body);
  document.addEventListener('click', () => TIP.hide());
  document.addEventListener('keydown', e => { if (e.key === 'Escape') TIP.hide(); });
  window.addEventListener('scroll', () => { if (TIP.el.classList.contains('on')) TIP.hide(); }, { passive: true });

  const safe = (fn, id) => { try { fn(); } catch (e) { console.error('mount failed: ' + id, e); } };
  const $ = id => document.getElementById(id);
  safe(() => Figure($('f-boot'), [{ scene: sc_boot }], { noAuto: true }), 'boot');
  safe(() => { const f = $('f-field'); const B = Figure(f, [{ scene: sc_field }]); f.querySelector('.fig-grid > div:last-child').innerHTML = '<div class="verdict"><h6>Read it like a coach</h6><p class="why">The blue <b>line of scrimmage</b> and the yellow <b>line to gain</b> frame every down. The two rows of <b>hash marks</b> decide where the ball is spotted. The dashed rectangle is <b>the box</b>, where run defense is decided. This is the Ravens\' 11 personnel in the shotgun: five linemen (LT to RT), a quarterback, a running back, a tight end (Y) and three receivers (X, H, Z).</p></div>'; }, 'field');
  safe(() => mountPersonnel($('f-pers')), 'pers');
  safe(() => { const f = $('f-gaps'); Figure(f, [{ scene: sc_gaps }], { narrow: true }); f.querySelector('.fig-grid > div:last-child').innerHTML = '<div class="verdict"><h6>Two vocabularies</h6><p class="why"><b>Gaps</b> (letters) are spaces; defenders are assigned to them. <b>Techniques</b> (numbers) are alignments; defensive linemen are named by them. Even numbers are head-up on a blocker, odd numbers are on a shoulder, and an "i" marks an inside shoulder. A "3-technique" lines up on the outside shoulder of a guard and attacks the B-gap. Numbering systems differ between staffs; this is a common one.</p></div>'; }, 'gaps');
  safe(() => { const f = $('f-tree'); Figure(f, [{ scene: sc_tree }], { narrow: true }); f.querySelector('.fig-grid > div:last-child').innerHTML = '<div class="verdict"><h6>Odd numbers break out, even numbers break in</h6><p class="why">In this common system, routes that break toward the sideline carry odd numbers and routes that break toward the middle carry even numbers, with the 9 (go) straight ahead. Depth matters as much as direction: a 5-yard out and a 15-yard out attack different defenders. A play call can combine numbers, so "896" tells three receivers to run a post, a go and a dig.</p></div>'; }, 'tree');
  safe(() => Figure($('f-oz'), [{ scene: sc_oz }]), 'oz');
  safe(() => Figure($('f-arc'), [{ scene: sc_arc }]), 'arc');
  safe(() => Figure($('f-rpo'), [{ scene: sc_rpo }]), 'rpo');
  safe(() => Figure($('f-choice'), [{ scene: sc_choice }]), 'choice');
  safe(() => Figure($('f-screen'), [{ scene: sc_screen }]), 'screen');
  safe(() => Figure($('f-disguise'), [{ scene: sc_disguise }]), 'disguise');
  safe(() => Figure($('f-pressure'), [{ scene: sc_pressure }]), 'pressure');
  safe(() => Figure($('f-fit'), [{ scene: sc_fit }]), 'fit');
  safe(() => Figure($('f-rush3'), [{ scene: sc_rush3 }]), 'rush3');
  safe(() => Figure($('f-lines'), [['Run (zone)', 'run'], ['Pass', 'pass'], ['Play-action', 'pa'], ['Screen', 'screen'], ['Gap (pull)', 'gap']].map(([l, k]) => ({ label: l, scene: lineScene(k) })),
    { title: 'Same picture, five plays: what the linemen reveal in the first second', src: 'Ravens 12 personnel, under center', segLabel: 'Choose the play' }), 'lines');
  safe(() => Figure($('f-covs'), ['C0', 'C1', 'C2', 'C3', 'C4', 'C6'].map(c => ({
    label: COVS[c].name, scene: Object.assign(buildLab(c, 'verts', { noThrow: true, tEnd: 2.2, beats: [[-0.8, COVS[c].pre], [0, COVS[c].tell], [1.0, 'Against four vertical routes, watch who carries each receiver deep and who stays underneath.']], recon: 'Simulated against four verticals so every defender must show his deep responsibility. Opponent defense, Ravens offense.' }), { title: COVS[c].name + ': what it looks like before and at the snap', tag: COVS[c].name })
  })), { title: 'The coverage gallery', src: 'Simulated · scrub to 0.5 s to compare the tells', segLabel: 'Choose a coverage' }), 'covs');
  const CB = {
    smash: ['C2', [[-0.8, 'Smash to both sides. On each side #1 (here: X on the left, Z on the right) runs a hitch and #2 (here: H on the left, Y on the right) a corner route. The defense is in Cover 2: two deep safeties, corners at about five yards.'], [0, 'Snap. #1 (X, Z) sprints five yards; #2 (H, Y) pushes straight upfield, aiming at the deep safety to hold him inside.'], [0.7, 'The hitch stops and turns. The Cover 2 corner, responsible for the flat, must choose: come up on the hitch or sink under the corner route.'], [1.25, '#2 (H, Y) breaks toward the sideline at 45 degrees: the corner route. Two receivers at two depths, one cornerback between them.'], [2.0, 'The corner stayed on the hitch, so the ball goes over his head to the corner route before the deep-half safety can cover the 15 yards to the sideline.']]],
    flood: ['C3', [[-0.8, 'Flood to the right: #1 (here: Z) runs a go, #2 (here: Y) a sail route, the back (here: RB) a flat route. The defense is in Cover 3.'], [0, 'Snap. The go route runs straight at the deep-third corner and drives him toward the sideline and deep.'], [0.9, 'The back releases into the flat, the lowest level. Y stems vertically to eight yards.'], [1.5, 'Y breaks for the sideline at 12 to 14 yards, the middle level, into the space the corner vacated. The curl-flat defender is now between two receivers.'], [2.3, 'He widened to the flat route, so the quarterback throws the sail behind him. Had he sunk under the sail, the flat would have been the throw.']]],
    mesh: ['C1', [[-0.8, 'Mesh: both slot receivers, the #2s (here: H and Y), will run shallow crossers. Outside, the #1s run a corner (here: Z) and a go (here: X); the back swings. The defense is in Cover 1: man-to-man with one deep safety.'], [0, 'Snap. Each defender locks onto his receiver.'], [0.8, 'The crossers race toward each other at five or six yards. Their defenders must follow them through the same crowded space.'], [1.9, 'The mesh point: the receivers pass shoulder to shoulder. The defender chasing Y runs into traffic and loses a step.'], [2.25, 'Y is running away from his man toward open grass. Throw it and let him run.']]],
    verts: ['C3', [[-0.8, 'Four verticals: both #1s (here: X and Z) run go routes outside, both #2s (here: H and Y) run seams up the hashes. Cover 3: three deep defenders against four vertical routes.'], [0, 'Snap. All four receivers sprint straight upfield. Underneath defenders cannot carry them past about 15 yards.'], [1.0, 'Each deep-third corner has a go route outside him. The middle safety has a seam on each side of him and can take only one.'], [1.6, 'The safety commits to Y\'s seam. That leaves H\'s seam in front of the left corner, who is occupied by X.'], [2.2, 'Throw H\'s seam, between the corner and the safety, at about 20 yards.']]],
    dagger: ['C4', [[-0.8, 'Dagger to the right: #2 (here: Y) runs a seam to clear the middle; #1 (here: Z) runs a deep dig at 15 to 17 yards. The defense is in Cover 4 (quarters).'], [0, 'Snap. The right safety reads Y. Y goes vertical, so the safety\'s rule says: carry him.'], [1.2, 'The seam drags the safety upfield and away from the middle. The linebackers drop to about nine or ten yards.'], [2.0, 'Z plants at 15 yards and breaks inside, behind the linebackers and in front of the safety who left. The corner, playing over the top of #1 (Z), trails.'], [2.5, 'Throw the dig into the space the seam emptied.']]],
  };
  safe(() => Figure($('f-concepts'), Object.keys(CB).map(k => ({ label: ROUTES[k].name, scene: Object.assign(buildLab(CB[k][0], k, { beats: CB[k][1] }), { title: ROUTES[k].name + ' against ' + COVS[CB[k][0]].name + ', the coverage it was built to beat', tag: ROUTES[k].name + ' vs ' + COVS[CB[k][0]].name }) })),
    { title: 'The five concepts, animated', src: 'Simulation · Ravens offense vs. the coverage each concept attacks', segLabel: 'Choose a concept' }), 'concepts');
  safe(() => Figure($('f-fronts'), FRONT_SCENES, { title: 'The front gallery', src: 'Gold rings: uncovered offensive linemen · dashed lines: gap ownership', segLabel: 'Choose a front' }), 'fronts');
  safe(() => Figure($('f-oddiz'), [{ scene: sc_odd_iz }]), 'oddiz');
  safe(() => mountLab($('lab')), 'lab');
  document.querySelectorAll('[data-plates]').forEach(h => safe(() => mountPlates(h, PLATES[h.dataset.plates]), 'plates-' + h.dataset.plates));
  safe(() => Figure($('f-prog'), [{ label: 'Progression to the checkdown', scene: progScene('check') }, { label: 'Scramble drill', scene: progScene('scramble') }],
    { title: 'One dropback, two endings', src: 'Concept illustration · Ravens offense vs. Cover 3', segLabel: 'Choose the ending' }), 'prog');

  const Q = [
    ['q1', { kind: 'Personnel', scene: persScene('12'), q: 'Count the players behind and beside the line. What personnel grouping are the Ravens in?', opts: ['11 personnel', '12 personnel', '21 personnel', '22 personnel'], ans: 1,
      explain: 'One running back and two tight ends (one attached to the right tackle, one on the wing) makes 12. The first digit counts backs, the second tight ends; the receivers are whatever is left of five. The defense here stayed in base, with four defensive backs.' }],
    ['q2', { kind: 'The safeties', scene: buildLab('C1', 'smash'), freeze: -0.8, q: 'Look only at the deepest defenders. Which coverage family should the quarterback expect?', opts: ['Two-high: Cover 2, 4 or 6', 'Single-high: Cover 1 or Cover 3', 'Cover 0: no deep safety', 'Impossible to tell before the snap'], ans: 1,
      explain: 'One safety sits alone in the deep middle at about 14 yards; the other is down near the slot. The middle of the field is closed, which points to Cover 1 or Cover 3 unless the defense rotates at the snap. Both corners are pressed tight on their receivers, which leans toward Cover 1, man coverage, and the snap confirms it.' }],
    ['q3', { kind: 'Motion', scene: sc_q_motion, freeze: -0.15, q: 'The slot receiver has just motioned across the formation. What did the defense tell you?', opts: ['Zone: the defenders passed him along', 'Man: one defender traveled all the way with him', 'A blitz is guaranteed', 'Nothing: motion is decoration'], ans: 1,
      explain: 'When a defender runs across the formation with the motion man, it usually points to man coverage, though only the snap confirms it. Against zone, defenders slide a step or two and hand the receiver to a teammate. That is a major reason modern offenses, Doyle\'s included, use so much motion: it forces the defense to declare before the snap.' }],
    ['q4', { kind: 'The box', scene: sc_q_box, freeze: -0.5, q: 'Ravens in 12 personnel, first-and-10. Count the box. What is the best call?', opts: ['Hand off to Henry inside', 'Play-action shot to the outside receiver', 'A screen to the tight end'], ans: 1,
      explain: 'Eight defenders in the box against seven blockers means the defense has a free tackler on any handoff. That eighth defender came out of the secondary: one deep safety, two pressed corners. Play-action uses the run look to pull the second level forward, then throws behind it. With Lamar Jackson there is a second fix: a designed quarterback run makes it eight against eight.' }],
    ['q5', { kind: 'Pressure', scene: sc_q_mug, freeze: -0.6, q: 'Two Ravens linebackers are standing in the A-gaps, right over the center. As the offense, what should you assume?', opts: ['Both are blitzing: keep everyone in to block', 'Pressure is coming from somewhere, but some of the six threats will drop', 'They are aligned to stop an inside run', 'It is a sign of a busted call'], ans: 1,
      explain: 'Mugged A-gaps threaten more rushers than the protection can handle, so the protection must commit before the snap. The defense rarely sends everyone: it rushes four or five from the places the protection left uncovered and drops the rest. Watch who actually crosses the line in the first half-second.' }],
    ['q6', { kind: 'The line', scene: lineScene('pass'), freeze: 0.45, q: 'Freeze-frame, 0.45 seconds after the snap. Run or pass?', opts: ['Run: the line is moving', 'Pass: the linemen stood up and stepped backward', 'Impossible to tell until the ball is handed off'], ans: 1,
      explain: 'Every lineman popped up and stepped back: high hats. Run blockers step forward with their pads low. A screen begins the same way, so the next tell matters: do the linemen keep blocking (dropback) or let the rushers go and release (screen)?' }],
    ['q7', { kind: 'The secondary', scene: buildLab('C3', 'verts', { noThrow: true, tEnd: 2.2, beats: [[-0.8, COVS.C3.pre], [0, COVS.C3.tell]] }), freeze: 0.75, q: '0.75 seconds after the snap. Which coverage is the defense playing?', opts: ['Cover 1', 'Cover 2', 'Cover 3', 'Cover 4'], ans: 2,
      explain: 'The corners turned their hips and ran to deep thirds (they bailed), one safety stayed deep in the middle, and four defenders sank underneath: three deep, four under. Cover 2 corners would squat near the flats; Cover 4 would show two deep safeties reading the slots; Cover 1 corners would be running stride for stride with their receivers.' }],
  ];
  Q.forEach(([id, q]) => safe(() => mountQuiz($(id), q), id));

  // glossary list, terms, nav
  const gl = $('glossary-list');
  Object.keys(GLOSS).filter(k => k !== 'glossary-term').map(k => GLOSS[k]).sort((a, b) => a[0].localeCompare(b[0])).forEach(d => hx('div', null, gl, '<dt>' + d[0] + '</dt><dd>' + d[1] + '</dd>'));
  initTerms(document);

  const chapters = [...document.querySelectorAll('section.chapter, .part-open')];
  const tocOl = document.querySelector('#toc ol'), sel = $('jump');
  let n = 0;
  chapters.forEach(c => {
    if (c.classList.contains('part-open')) { hx('li', { class: 'part' }, tocOl, c.dataset.part); return; }
    const isNum = c.id !== 'glossary' && c.id !== 'sources';
    if (isNum) { n++; const cn = c.querySelector('.chapnum b'); if (cn) cn.textContent = n; }
    const li = hx('li', null, tocOl, '<span>' + (isNum ? n : '') + '</span><a href="#' + c.id + '">' + c.dataset.title + '</a>');
    const o = hx('option', { value: c.id }, sel, (isNum ? n + '. ' : '') + c.dataset.title);
  });
  sel.onchange = () => { if (sel.value) { const t = $(sel.value); t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' }); sel.value = ''; } };
  const now = $('now'), prog = $('progress');
  const onScroll = () => {
    const h = document.documentElement, max = h.scrollHeight - h.clientHeight;
    prog.style.width = (max > 0 ? (h.scrollTop / max) * 100 : 0) + '%';
    let cur = null; for (const c of chapters) { if (c.getBoundingClientRect().top < 120) cur = c; }
    now.textContent = cur ? (cur.dataset.title || cur.dataset.part) : 'A field guide to modern football';
  };
  window.addEventListener('scroll', onScroll, { passive: true }); onScroll();
}
if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', boot); else boot();
