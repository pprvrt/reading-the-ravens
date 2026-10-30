/* ===================== PLAY LIBRARY ===================== */
const pB = (id, lab, x, y, m, o) => Object.assign({ id, lab, team: 'B', side: 'off', x, y, m }, o || {});
const pBD = (id, lab, x, y, m, o) => Object.assign({ id, lab, team: 'B', side: 'def', x, y, m, kind: 'drop' }, o || {});
const pO = (id, lab, x, y, m, o) => Object.assign({ id, lab, team: 'O', side: 'off', x, y, m }, o || {});
const pOD = (id, lab, x, y, m, o) => Object.assign({ id, lab, team: 'O', side: 'def', x, y, m, kind: 'drop' }, o || {});
const OLN = ['LT', 'LG', 'C', 'RG', 'RT'];
function OL5(team, moves, o) {
  o = o || {};
  return OLN.map((n, i) => ({ id: n, lab: n, team, side: 'off', x: OLX[i], y: -0.9, m: moves ? moves[i] : null, kind: o.kind || 'block', v: o.v || 3.6, d: o.d || 0 }));
}
const SET = (d) => OLX.map(x => [[x, d == null ? -2.6 : d]]);
const T = (x) => MID + x;

/* ---------- 1. Opening snap, Week 1: under-center boot left ---------- */
const sc_boot = {
  title: 'Week 1, first snap: the fake that moved seven defenders',
  src: 'Ravens 41, Colts 23 · Sept. 13',
  tag: 'Play-action boot',
  los: 30, first: 40, view: { y0: -9, y1: 36 }, t: [-1.0, 5.9], rest: -1.0, end: 5.7, pursuit: 0.9, noTackle: true,
  players: [
    ...OL5('B', [[[T(-2.9), 0.2]], [[T(-0.6), 0.6]], [[T(1.6), 0.5]], [[T(3.8), 0.6]], [[T(6), 0.3]]], { v: 3.4 }).map((p, i) => Object.assign(p, { on: [null, 'T1', null, 'T2', 'E2'][i] || undefined })),
    pB('QB', 'QB', MID, -2.9, [[T(1), -3.2], [T(1.6), -4.2, 0.75], { v: 8 }, [T(-1.6), -6.2], [20.5, -7], [17.6, -6.6], { v: 3 }, [17.2, -6.4]], { kind: 'drop', v: 5.5, name: 'Lamar Jackson' }),
    pB('RB', 'RB', MID, -7, [[29, -4.6], [31.5, -2.2], [33.5, 0.5]], { kind: 'fake', v: 6, name: 'Derrick Henry' }),
    pB('Y', 'Y', T(6.6), -1.1, [[31.5, 1.5], [22, 3.5], [13, 4.5], [9.5, 4.5]], { v: 6.5, d: 0.3 }),
    pB('U', 'U', T(8.8), -2.2, [[37.2, 0.6]], { kind: 'block', v: 4, on: 'SL' }),
    pB('X', 'X', 9, -0.9, [[9, 10.5], [11.5, 12], [21, 12.8, 2.85], { v: 8.8 }, [18.5, 21], [15.5, 30], [13.4, 37]], { v: 8, name: 'Zay Flowers' }),
    pB('Z', 'Z', 45.5, -0.9, [[45.5, 9], [40, 15], [30, 19], [22, 21]], { v: 8 }),
    pOD('E1', 'E', 20.5, 0.9, [[22.5, -1], [22, -3.5], [20, -5.6]], { kind: 'rush', v: 4.2, d: 0.1 }),
    pOD('T1', 'T', 24.5, 0.9, [[26.2, 0.2]], { kind: 'rush', v: 3 }),
    pOD('T2', 'T', 29.2, 0.9, [[31, -0.2]], { kind: 'rush', v: 3 }),
    pOD('E2', 'E', 35.4, 0.9, [[36.6, -0.6]], { kind: 'rush', v: 3 }),
    pOD('W', 'W', 22.5, 5, [[26.5, 3.2], [28, 2.6]], { v: 5, d: 0.15 }),
    pOD('M', 'M', 27.5, 5.2, [[31, 3], [32, 2.5]], { v: 5, d: 0.15 }),
    pOD('SL', 'S', 33.5, 4.6, [[35.5, 2.6]], { v: 4, d: 0.15 }),
    pOD('LC', 'CB', 9.6, 7, [[9.6, 7.4], [9.4, 9.5], [11, 11.8], [19.4, 12.3, 2.95], [18.3, 15.5], [16, 21]], { v: 7.5, name: 'Justin Walley' }),
    pOD('RC', 'CB', 45, 7, [[45, 10], [40.5, 16.2], [31, 19.8], [24, 21.5]], { v: 7.8 }),
    pOD('SS', 'SS', 34, 10.5, [[34.5, 6.5], [33, 6]], { v: 5, d: 0.2 }),
    pOD('FS', 'FS', 26, 14, [[28, 14.5], [26.5, 16.5], [21.5, 21], [17.5, 26]], { v: 6.4 }),
  ],
  ball: [{ t: 2.35, pass: 'X', at: 2.85 }],
  rings: [[0.6, 1.6, 'RB'], [1.4, 2.4, 'QB'], [2.3, 5.9, 'X']],
  beats: [
    [-1.0, 'Pre-snap. The Ravens hurry to the line and snap while several Colts are still talking and pointing. Formation: Lamar <span class="g" data-g="under-center">under center</span>, two tight ends to the right, Henry seven yards deep.'],
    [0, 'Snap. All five linemen step right together, the signature of <span class="g" data-g="outside-zone">outside zone</span>, Derrick Henry\'s best run. A linebacker reading the line sees run.'],
    [0.75, 'Mesh point. Lamar turns his back to the defense and extends the ball to Henry. The fake works because the real run looks exactly like this.'],
    [1.4, 'Seven of eleven Colts have stepped toward the run. Lamar keeps the ball and <span class="g" data-g="boot">boots</span> to his left, his non-throwing side.'],
    [2.35, 'Throw. Flowers has crossed behind the linebackers who chased the fake. Cornerback Justin Walley is alone with him, trailing.'],
    [2.95, 'Catch at about 13 yards. Flowers makes Walley miss in the open field.'],
    [4.6, 'The run continues past the top of this frame: a 49-yard gain on the first snap of Declan Doyle\'s play-calling career.']
  ],
  recon: 'Schematic reconstruction. Established by the Ravens\' film review (Sept. 15) and The Banner: no-huddle tempo, under-center fake to Henry going right, boot left, seven of 11 defenders biting, Flowers isolated on Justin Walley, 49-yard catch-and-run. Field position, route stems and defender alignments are illustrative.'
};

/* ---------- 2. Unbalanced read keeper, Week 1 TD ---------- */
const sc_arc = {
  title: 'Week 1: unbalanced line, read the end, arc the corner',
  src: 'First-drive touchdown at Indianapolis',
  tag: 'Read option', gun: true,
  los: 91, view: { y0: -8, y1: 13 }, t: [-1.2, 3.3], rest: -1.2, end: 2.95, pursuit: 0.85, noTackle: true,
  players: [
    { id: 'LG', lab: 'LG', team: 'B', side: 'off', x: T(-2.2), y: -0.9, m: [[T(0.4), 0.7]], kind: 'block', v: 3.4, on: 'T1' },
    { id: 'C', lab: 'C', team: 'B', side: 'off', x: MID, y: -0.9, m: [[T(2), 0.8]], kind: 'block', v: 3.4 },
    { id: 'RG', lab: 'RG', team: 'B', side: 'off', x: T(2.2), y: -0.9, m: [[T(4), 0.8]], kind: 'block', v: 3.4, on: 'T2' },
    { id: 'RT', lab: 'RT', team: 'B', side: 'off', x: T(4.4), y: -0.9, m: [[T(5.8), 0.6], [T(6), 2.8]], kind: 'block', v: 3.4, on: 'WL' },
    pB('LT', 'LT', T(6.6), -0.9, [[T(8), 0.4]], { kind: 'block', v: 3.4, name: 'Ronnie Stanley, aligned on the right', on: 'E2' }),
    pB('TE', 'Y', T(-4.4), -1.1, [[T(-3.2), 1.8], [T(-1.8), 3.6]], { kind: 'block', v: 4.5, d: 0.1, name: 'Durham Smythe', on: 'M' }),
    pB('W', 'U', T(-6.4), -2.2, [[T(-7.6), -0.6], [T(-9.2), 1.8], [T(-9.6), 3.0]], { kind: 'block', v: 6, name: 'Matthew Hibner', on: 'GAR' }),
    pB('QB', 'QB', MID, -4.5, [[T(0.4), -4.7, 0.55], [T(-3), -3.6], [T(-6.5), -1], [T(-9.4), 3], [T(-10.5), 7], [T(-10.8), 10.5]], { kind: 'run', v: 8.3, name: 'Lamar Jackson' }),
    pB('RB', 'RB', T(1.8), -4.5, [[T(3.6), -3.4], [T(4.6), -2.2, 0.85]], { kind: 'fake', v: 6, name: 'Derrick Henry' }),
    pB('S', 'H', 40, -1.6, [[40, 2.4], [T(12.2), 2.6]], { kind: 'block', v: 6, on: 'NB' }),
    pB('Z', 'Z', 45.5, -0.9, [[45, 3], [44.6, 4.2]], { kind: 'block', v: 6, on: 'RC' }),
    pOD('KEY', 'E', T(-5.8), 0.9, [[T(-4), -1.2], [T(-2.6), -2.4, 0.85]], { kind: 'rush', v: 5, name: 'Arden Key (unblocked, read)', chase: 'RB' }),
    pOD('T1', 'T', T(-1.2), 0.9, [[T(0.6), 0.2]], { kind: 'rush', v: 3 }),
    pOD('T2', 'T', T(3.3), 0.9, [[T(4.5), -0.1]], { kind: 'rush', v: 3 }),
    pOD('E2', 'E', T(8.8), 0.9, [[T(9.2), -0.4]], { kind: 'rush', v: 3 }),
    pOD('M', 'M', T(-2.5), 4.5, [[T(-1.8), 3.9]], { v: 4 }),
    pOD('WL', 'W', T(3), 4.5, [[T(5.5), 3]], { v: 4 }),
    pOD('NB', 'N', T(11.5), 3.5, [[T(12), 2.2]], { v: 4 }),
    pOD('RC', 'CB', 45, 4, [[44.6, 4.8]], { v: 4 }),
    pOD('GAR', 'CB', T(-9.8), 3.4, [[T(-9.6), 3.6], [T(-9.2), 3.2, 1.0]], { v: 3, name: 'Sauce Gardner (edge defender)' }),
    pOD('FS', 'FS', T(1), 8, [[T(-4), 8.2], [T(-9), 9.6], [T(-10.4), 10.8, 3.1]], { v: 6.5 }),
    pOD('SS', 'SS', T(8), 7.5, [[T(6), 6.5]], { v: 4 }),
  ],
  rings: [[0.2, 0.95, 'KEY'], [1.0, 1.9, 'W'], [1.9, 3.4, 'FS']],
  beats: [
    [-1.2, 'Pre-snap. The line is <span class="g" data-g="unbalanced">unbalanced</span>: left tackle Ronnie Stanley has moved to the right side, leaving only the left guard and a tight end left of the center. The defense shifts its strength right, and cornerback Sauce Gardner becomes the edge defender on the light side.'],
    [0, 'Snap. The line zone-blocks to the right and Henry runs right. Everything says run strong.'],
    [0.45, 'The <span class="g" data-g="read-option">read</span>. Nobody blocks end Arden Key; he is the read. Key crashes inside on Henry, so Lamar pulls the ball and runs where Key used to be.'],
    [1.0, 'Tight end Matthew Hibner <span class="g" data-g="arc">arcs</span> around the edge and blocks Gardner; Durham Smythe climbs to the linebacker.'],
    [1.9, 'Two blocks, one defender left: the free safety. The play becomes a footrace from the hash to the pylon.'],
    [2.85, 'Touchdown.']
  ],
  recon: 'Reconstruction from Steven Ruiz\'s breakdown quoted in the Ravens\' film review: unbalanced line with Stanley on the right, read of Arden Key, arc block on Sauce Gardner, blocks by Hibner and Smythe, footrace with the free safety. Yard line, receiver alignment and depths are illustrative.'
};

/* ---------- 3. Flowers from the backfield, choice route vs blitz ---------- */
const sc_choice = {
  title: 'Week 1: Flowers from the backfield beats the blitz',
  src: '54-yard touchdown · 48 yards after the catch (Next Gen Stats)',
  tag: 'Choice route vs blitz', gun: true,
  los: 54, first: 64, view: { y0: -9, y1: 28 }, t: [-1.0, 4.3], rest: -1.0, end: 4.1, pursuit: 0.9, noTackle: true,
  players: [
    ...OL5('B', SET(-2.4), { kind: 'pp', v: 3 }),
    pB('QB', 'QB', MID, -5, [[MID, -6.2, 0.6], { w: 0.75 }, [T(0.4), -6.2, 1.45], [T(1.2), -6.5, 1.7]], { kind: 'none', name: 'Lamar Jackson' }),
    pB('ZF', 'F', T(-1.9), -5, [[T(-3.2), -2.4], [T(-3.9), 2.5], [T(-3.9), 5.6, 1.35], [T(-4.4), 6.4, 1.5], [T(-3.1), 9.6, 2.0], { v: 9.5 }, [T(-1.2), 18], [T(0.8), 27.5], [T(1.4), 33]], { v: 8, name: 'Zay Flowers, aligned in the backfield' }),
    pB('RB', 'RB', T(1.9), -5, [[T(3.8), -3.2]], { kind: 'block', v: 5, on: 'E2' }),
    pB('X', 'X', 8, -0.9, [[8, 8], [9, 26]], { v: 8 }),
    pB('Z', 'Z', 46, -0.9, [[46, 26]], { v: 8.4 }),
    pB('Y', 'Y', T(6.6), -1.1, [[T(7.2), 8], [T(6.6), 24]], { v: 7 }),
    pOD('CAR', 'LB', T(-1), 4.5, [[T(-0.8), 1.2], [T(-0.5), -2.8], [T(-0.1), -4.7, 1.62]], { kind: 'rush', v: 6.5, name: 'Jaylon Carlies (free blitzer)' }),
    pOD('HAU', 'S', T(-6), 10, [[T(-5), 7.4, 1.45], [T(-4.6), 6.2, 1.7], [T(-3.6), 6.6, 1.95], [T(-2.8), 9.2, 2.35]], { name: 'A.J. Haulcy' }),
    pOD('E1', 'E', T(-6.2), 0.9, [[T(-5.6), -1.8]], { kind: 'rush', v: 2.4 }),
    pOD('T1', 'T', T(-3.3), 0.9, [[T(-3), -1.9]], { kind: 'rush', v: 2.4 }),
    pOD('T2', 'T', T(3.3), 0.9, [[T(3.2), -2]], { kind: 'rush', v: 2.4 }),
    pOD('E2', 'E', T(8.3), 0.9, [[T(6.6), -2.6]], { kind: 'rush', v: 3 }),
    pOD('M', 'M', T(3), 4.6, [[T(3.6), 4]], { v: 3 }),
    pOD('NB', 'N', T(8.5), 5, [[T(7.8), 9], [T(7), 20]], { v: 7 }),
    pOD('LC', 'CB', 8.5, 6, [[8.6, 9], [9.4, 24]], { v: 7.6 }),
    pOD('RC', 'CB', 45.5, 6, [[46, 24]], { v: 7.8 }),
    pOD('FS', 'FS', T(3.5), 14, [[T(5), 17], [T(3), 22.5]], { v: 6 }),
  ],
  ball: [{ t: 1.7, pass: 'ZF', at: 2.05 }],
  rings: [[0.1, 1.6, 'CAR'], [1.3, 1.9, 'HAU'], [1.95, 4.3, 'ZF']],
  labels: [{ t0: 1.25, t1: 1.6, x: T(3.2), y: -7.4, text: 'Pump fake', anchor: 'start' }],
  beats: [
    [-1.0, 'Pre-snap. Flowers lines up in the backfield beside Lamar. From there nobody can jam him at the line, and the defense must decide who covers a receiver dressed as a running back.'],
    [0, 'Snap. Linebacker Jaylon Carlies blitzes up the middle. The protection has slid right; nobody is assigned to him.'],
    [0.9, 'Flowers runs a <span class="g" data-g="choice">choice route</span>: he can break in, break out or keep going, depending on how the defender in front of him plays.'],
    [1.35, 'Pump fake. Lamar shows the ball; Carlies flinches for a beat and rookie safety A.J. Haulcy jumps the short break he expects.'],
    [1.7, 'Lamar throws sidearm around the blitzer. Flowers has already accelerated past Haulcy.'],
    [2.4, 'Nobody left in front of him. 48 of the 54 yards came after the catch, 33 more than expected according to Next Gen Stats.']
  ],
  recon: 'Reconstruction from the Ravens\' Week 1 film review: Flowers aligned in the backfield, a choice route, an unblocked Carlies, Lamar\'s pump fake, Haulcy crashing on the route, a sidearm throw. Other routes and alignments are illustrative.'
};

/* ---------- 4. Henry outside zone, 32-yard TD ---------- */
const sc_oz = {
  title: 'Week 1: Henry\'s 32-yard outside-zone touchdown',
  src: '13 outside-zone/stretch carries, 89 yards, 3 TD vs. Indianapolis (The Banner)',
  tag: 'Outside zone',
  los: 68, first: 78, view: { y0: -9, y1: 36 }, t: [-0.8, 5.8], rest: -0.8, end: 5.5, pursuit: 0.85, noTackle: true,
  players: [
    ...OL5('B', [[[T(-2.6), 0.6]], [[T(-0.2), 1.4]], [[T(1.9), 1.5], [T(3), 3.6]], [[T(4.2), 1.6]], [[T(6.4), 1.2], [T(6.8), 3.6]]], { v: 3.6 }).map((p, i) => Object.assign(p, { on: ['E1', 'T1', 'W', 'T2', 'M'][i] })),
    pB('QB', 'QB', MID, -2.9, [[T(3), -3.5, 0.55], [T(2.6), -5]], { kind: 'none', name: 'Lamar Jackson' }),
    pB('RB', 'RB', MID, -7, [[T(2.6), -4.6], [T(5.8), -2.3, 0.95], [T(7.6), -0.2], [T(8.4), 1.8], [T(9.4), 6.5], [T(11), 14], [T(12.6), 22], [T(13.6), 32.5]], { kind: 'run', v: 8, name: 'Derrick Henry' }),
    pB('Y', 'Y', T(6.6), -1.1, [[T(8.4), 1.0]], { kind: 'block', v: 3.6, on: 'E2' }),
    pB('U', 'U', T(8.8), -2.2, [[T(10.6), 0.5], [T(11.6), 3.8]], { kind: 'block', v: 5, on: 'SL' }),
    pB('X', 'X', 16, -0.9, [[17.6, 7], [T(-2), 14.6], [T(5), 19.4], [T(6.6), 21.8]], { kind: 'block', v: 8.6, name: 'Chris Moore', on: 'FS' }),
    pB('Z', 'Z', 45, -0.9, [[45, 5], [43.6, 8.4]], { kind: 'block', v: 6, name: 'Rashod Bateman', on: 'RC' }),
    pOD('E1', 'E', T(-5.3), 0.9, [[T(-3.2), -0.6]], { kind: 'rush', v: 3 }),
    pOD('T1', 'T', T(-1.1), 0.9, [[T(0.6), 0.8]], { kind: 'rush', v: 3 }),
    pOD('T2', 'T', T(3.3), 0.9, [[T(4.4), 1.2]], { kind: 'rush', v: 3 }),
    pOD('E2', 'E', T(7.7), 0.9, [[T(8.9), 0.9]], { kind: 'rush', v: 3 }),
    pOD('W', 'W', T(-2.5), 4.6, [[T(1.6), 3.9], [T(3.4), 3.8]], { v: 5, d: 0.2 }),
    pOD('M', 'M', T(1.8), 4.8, [[T(5.2), 4.2], [T(6.6), 4.2]], { v: 5, d: 0.2 }),
    pOD('SL', 'S', T(9.6), 4.2, [[T(11.2), 3.6]], { v: 4, d: 0.2 }),
    pOD('LC', 'CB', 16.4, 6.4, [[16.8, 8.4], [20, 14]], { v: 6, d: 0.5 }),
    pOD('RC', 'CB', 44.6, 7, [[44, 8.3]], { v: 4 }),
    pOD('SS', 'SS', T(8), 10.5, [[T(7.6), 9.8], [T(8.2), 9.8, 2.5]], { v: 5 }),
    pOD('FS', 'FS', T(-2), 14, [[T(1), 15.6, 1.8], [T(5.6), 19.6, 3.4], [T(7.4), 21.6, 3.9]], { v: 5 }),
  ],
  ball: [{ t: 0.6, pass: 'RB', at: 0.66 }],
  rings: [[0, 0.9, 'C'], [0.9, 1.7, 'RB'], [2.4, 2.9, 'SS'], [3.0, 4.2, 'X']],
  beats: [
    [-0.8, 'Pre-snap. <span class="g" data-g="personnel">12 personnel</span>, Lamar under center, Henry seven yards deep. One tight end is attached to the right tackle; the other is a <span class="g" data-g="wing">wing</span> just outside him.'],
    [0, 'Snap. Every lineman takes a lateral "bucket" step right and tries to <span class="g" data-g="reach">reach</span> the defender to his right. This is <span class="g" data-g="outside-zone">outside zone</span>: no one pulls, the whole line moves as one.'],
    [0.95, 'Henry presses the edge, aiming outside the tight end, eyes on the first defender outside the box.'],
    [1.55, 'The edge is sealed, so he plants and goes vertical. Coaches call the three options "bend, bang or bounce"; this is bang.'],
    [2.45, 'The strong safety comes down to fill the alley and takes a poor angle. Henry is past him.'],
    [3.1, 'This is <span class="g" data-g="perimeter">perimeter blocking</span>. Bateman has <span class="g" data-g="stalk">stalked</span> his cornerback since the snap; Chris Moore has run 25 yards across the field to wall off the free safety, the last defender with an angle.'],
    [5.45, 'Touchdown, 32 yards, about five and a half seconds after the snap.']
  ],
  recon: 'Reconstruction. Established: 32-yard Henry touchdown on an outside-zone/stretch run, with downfield blocks credited to Rashod Bateman and Chris Moore (Ravens film review). Personnel, formation and defender alignments are illustrative.'
};

/* ---------- 5. Tunnel screen, Week 7 ---------- */
const sc_screen = {
  title: 'Week 7: the screen that went 48 yards',
  src: 'Bengals 35, Ravens 13 · Oct. 25 · Tyler Huntley at QB',
  tag: 'Wide-receiver screen', gun: true,
  los: 52, first: 62, view: { y0: -9, y1: 31 }, t: [-0.8, 5.1], rest: -0.8, end: 4.9, pursuit: 0.9, noTackle: true,
  players: [
    pB('LT', 'LT', OLX[0], -0.9, [[T(-4.8), -1.6], { w: 0.25 }, [T(-8), 0.6], [T(-10.4), 2.6], [T(-11.2), 3.3]], { kind: 'block', v: 6.5, on: 'NB' }),
    pB('LG', 'LG', OLX[1], -0.9, [[T(-2.4), -1.7], { w: 0.25 }, [T(-5), 1.6], [T(-8), 5], [T(-8.5), 6.6]], { kind: 'block', v: 6.5, on: 'W' }),
    pB('C', 'C', OLX[2], -0.9, [[MID, -1.8], { w: 0.3 }, [T(-1.6), 2.4], [T(-4.4), 7.4]], { kind: 'block', v: 6.5, on: 'M' }),
    pB('RG', 'RG', OLX[3], -0.9, [[OLX[3], -2.6]], { kind: 'pp', v: 3 }),
    pB('RT', 'RT', OLX[4], -0.9, [[OLX[4], -2.6]], { kind: 'pp', v: 3 }),
    pB('QB', 'QB', MID, -5, [[MID, -6.2], [T(-0.6), -6.3]], { kind: 'none', name: 'Tyler Huntley' }),
    pB('RB', 'RB', T(1.8), -5, [[T(3.4), -3.6]], { kind: 'block', v: 4 }),
    pB('X', 'X', 8.5, -0.9, [[8.6, 1.2], [9.8, 0.6], [13.5, -1.2, 1.1], [16, 3], [17.5, 12], [19.2, 24.5], [20.4, 31]], { kind: 'run', v: 8.4, name: 'Zay Flowers' }),
    pB('H', 'H', 15.5, -1.6, [[12.2, 1.8], [10.8, 3]], { kind: 'block', v: 6, on: 'LC' }),
    pB('Y', 'Y', T(6.6), -1.1, [[T(7), 7], [T(6), 14]], { v: 6.5, kind: 'block', on: 'FS', name: 'Tight end (clear-out, then blocks downfield)' }),
    pB('Z', 'Z', 45.5, -0.9, [[45.5, 14]], { v: 8 }),
    pOD('LC', 'CB', 8.8, 6, [[9.6, 4.5], [11.2, 3.2]], { v: 5 }),
    pOD('NB', 'N', 15.6, 5, [[15.8, 5.4], [15, 3.4]], { v: 4, d: 0.3 }),
    pOD('W', 'W', T(-3.5), 5, [[T(-6), 4.6], [T(-8), 6.4], { w: 0.4 }], { v: 4.5, d: 0.5 }),
    pOD('M', 'M', T(1.5), 5, [[T(-2.5), 6.2], [T(-4.2), 7.6]], { v: 4.5, d: 0.5 }),
    pOD('E1', 'E', T(-6.3), 0.9, [[T(-5.2), -2.6], [T(-2.8), -4.8]], { kind: 'rush', v: 4.5 }),
    pOD('T1', 'T', T(-1.2), 0.9, [[T(-1.4), -2], [T(-1.4), -4.2]], { kind: 'rush', v: 4.2 }),
    pOD('T2', 'T', T(3.3), 0.9, [[T(3), -2.2]], { kind: 'rush', v: 3 }),
    pOD('E2', 'E', T(7.8), 0.9, [[T(6.6), -2.6]], { kind: 'rush', v: 3 }),
    pOD('S', 'S', 17, 12, [[17.2, 11.2], [18.6, 14.8, 3.1], [18.2, 16]], { v: 4 }),
    pOD('FS', 'FS', 36, 13, [[30, 15], [24.5, 20], [21.4, 24.6, 4.3]], { v: 6.5 }),
    pOD('RC', 'CB', 45, 6, [[45, 10]], { v: 6 }),
  ],
  ball: [{ t: 0.95, pass: 'X', at: 1.25 }],
  rings: [[0, 0.9, 'LG'], [1.0, 5.1, 'X']],
  beats: [
    [-0.8, 'Pre-snap. Tyler Huntley in the shotgun, Flowers split wide left. Nothing tells you what is coming.'],
    [0, 'Snap. Watch the left side of the line, not the ball. The tackle, guard and center show pass for a beat, then leave. Linemen releasing downfield is the tell for a run or a <span class="g" data-g="screen">screen</span>.'],
    [0.45, 'The pass rushers are let through on purpose. They run themselves out of the play.'],
    [1.1, 'Flowers comes back toward the ball behind a wall of blockers: a "tunnel" screen.'],
    [1.7, 'The slot receiver walls off the cornerback; the linemen reach the linebackers.'],
    [2.6, 'Former NFL coordinator Scott Turner, breaking down the play: "The most important thing of a positive screen is who you\'re throwing it to." 48 yards, touchdown.']
  ],
  recon: 'Generic illustration of a tunnel screen. Established: a screen to Flowers for a 48-yard touchdown on Baltimore\'s first possession of Week 7, credited by Scott Turner to Flowers and the blocking. The exact screen type, formation and blocking are not documented in the sources used.'
};

/* ---------- RPO ---------- */
const sc_rpo = {
  generic: true,
  title: 'The RPO: one defender, two jobs',
  src: 'Concept illustration · 11 personnel, shotgun',
  tag: 'Run-pass option', gun: true,
  los: 45, first: 55, view: { y0: -9, y1: 18 }, t: [-0.6, 2.7], rest: -0.6, end: 2.4,
  players: [
    ...OL5('B', [[[T(-5.6), 0.6]], [[T(-3.2), 1.2]], [[T(-1.2), 1.4]], [[T(1.2), 1.2]], [[T(3.4), 0.8]]], { v: 3.2 }),
    pB('QB', 'QB', MID, -5, [[T(-0.4), -5.2, 0.5], [T(0.4), -5.4, 0.75]], { kind: 'none', name: 'Lamar Jackson' }),
    pB('RB', 'RB', T(1.8), -5, [[T(-0.8), -4.4, 0.5], [T(-3.4), -2.4], [T(-4), -0.2]], { kind: 'fake', v: 6, name: 'Derrick Henry' }),
    pB('H', 'H', 38, -1.6, [[39.2, 1.8], [35.8, 5.6], [33, 7.4], [30.6, 11], [29.4, 15]], { v: 8, name: 'Zay Flowers' }),
    pB('Z', 'Z', 46, -0.9, [[46, 5], [46, 9]], { v: 6, name: 'Rashod Bateman' }),
    pB('X', 'X', 7.5, -0.9, [[7.5, 4], [8, 6]], { kind: 'block', v: 6 }),
    pB('Y', 'Y', T(-6.6), -1.1, [[T(-7.6), 1.2]], { kind: 'block', v: 3.6, name: 'Mark Andrews' }),
    pOD('NB', 'N', 37, 4.6, [[35, 3.2], [33, 1.6]], { v: 5, d: 0.2, name: 'Conflict defender' }),
    pOD('E1', 'E', T(-8.5), 0.9, [[T(-7.8), 0.4]], { kind: 'rush', v: 3 }),
    pOD('T1', 'T', T(-3.3), 0.9, [[T(-3.2), 1.0]], { kind: 'rush', v: 3 }),
    pOD('T2', 'T', T(1.1), 0.9, [[T(0.2), 1.2]], { kind: 'rush', v: 3 }),
    pOD('E2', 'E', T(5.4), 0.9, [[T(4.6), -1.4]], { kind: 'rush', v: 3 }),
    pOD('W', 'W', T(-3), 4.8, [[T(-4), 3.4]], { v: 4, d: 0.2 }),
    pOD('M', 'M', T(2), 4.8, [[T(0), 3.2]], { v: 4, d: 0.2 }),
    pOD('LC', 'CB', 8, 6.5, [[8, 7]], { v: 3 }),
    pOD('RC', 'CB', 46, 6.5, [[46.2, 9.5]], { v: 5 }),
    pOD('FS', 'FS', T(-4), 13, [[T(-3), 12]], { v: 3 }),
    pOD('SS', 'SS', T(8), 12, [[T(8.6), 12.6]], { v: 3 }),
  ],
  ball: [{ t: 0.82, pass: 'H', at: 1.12 }],
  rings: [[0, 0.85, 'NB'], [0.85, 2.7, 'H']],
  beats: [
    [-0.6, 'Pre-snap. The nickel defender aligns between the box and the slot receiver. He is responsible for the run if it bounces outside and for the slot receiver if he runs a quick route. He cannot do both.'],
    [0, 'Snap. The line run-blocks inside zone to the left, so they never pass-set. Under NFL rules linemen may not be more than a yard downfield when a pass that crosses the line is thrown, which is why RPO throws come out fast and short.'],
    [0.5, 'The QB rides the ball in Henry\'s belly with his eyes on the nickel. If the nickel stays wide, it is a handoff into a box with one fewer defender.'],
    [0.8, 'The nickel triggers on the run. Lamar pulls the ball and throws the slant into the space he just left.'],
    [1.2, 'The defense guessed right on the run and still lost. That is the point of the RPO: the defender\'s correct reaction becomes the wrong one.']
  ],
  recon: 'Concept illustration with Ravens personnel. Not a specific 2026 play.'
};

/* ---------- Ravens defense: disguise & rotation ---------- */
function offense2x2(team, routes, o) {
  o = o || {};
  const r = routes || {};
  return [
    ...OL5(team, SET(-2.6), { kind: 'pp', v: 3 }),
    { id: 'QB', lab: 'QB', team, side: 'off', x: MID, y: -5, m: r.QB || [[MID, -6.2, 0.6]], kind: 'none', v: 4 },
    { id: 'RB', lab: 'RB', team, side: 'off', x: o.rbx || T(1.8), y: -5, m: r.RB || [[T(3.6), -3.4]], kind: r.RBk || 'block', v: 5 },
    { id: 'X', lab: 'X', team, side: 'off', x: 7, y: -0.9, m: r.X, v: 7.8 },
    { id: 'H', lab: 'H', team, side: 'off', x: 16, y: -1.6, m: r.H, v: 7.8 },
    { id: 'Y', lab: 'Y', team, side: 'off', x: 37.4, y: -1.6, m: r.Y, v: 7.2 },
    { id: 'Z', lab: 'Z', team, side: 'off', x: 46.3, y: -0.9, m: r.Z, v: 7.8 },
  ];
}
const sc_disguise = {
  generic: true,
  title: 'Two-high before the snap, one-high after it',
  src: 'Illustration of Minter-style disguise',
  tag: 'Disguise & rotation', gun: true,
  los: 40, view: { y0: -9, y1: 24 }, t: [-1.5, 3.4], rest: -1.5, end: 3.1, passPlay: true,
  players: [
    ...offense2x2('O', {
      X: [[7, 12], [6.2, 10.4]], H: [[16, 10], [23, 11.2]], Y: [[37.4, 9], [42, 10.6]], Z: [[46.3, 11], [47.6, 20]],
      RB: [[T(3.5), -3]], QB: [[MID, -6.2, 0.6], { w: 2.3 }, [T(-0.8), -6.6]]
    }),
    pBD('TH', 'TH', T(8.6), 1, [[T(7.6), -1.6], [T(5.4), -3.6], [T(1.2), -6.2, 3.0]], { kind: 'rush', v: 4, name: 'Trey Hendrickson' }),
    pBD('TR', 'TR', T(-7.8), 1, [[T(-6.2), -2], [T(-5), -3.4]], { kind: 'rush', v: 3, name: 'Tavius Robinson' }),
    pBD('NM', 'NM', T(3.2), 0.9, [[T(3), -2]], { kind: 'rush', v: 2.5, name: 'Nnamdi Madubuike' }),
    pBD('TJ', 'TJ', T(-1.1), 0.9, [[T(-1.2), -2.1]], { kind: 'rush', v: 2.5, name: 'Travis Jones' }),
    pBD('RS', 'RS', T(-2.5), 5, [[T(-4.5), 8.5], [T(-5), 9.5]], { v: 5, name: 'Roquan Smith' }),
    pBD('TB', 'TB', T(3), 5, [[T(3), 8.8], [T(4.2), 9.6]], { v: 5, name: 'Teddye Buchanan' }),
    pBD('JH', 'JH', 16.3, 5.5, [[13, 7], [10.5, 8.6]], { v: 5, name: 'Jaylinn Hawkins' }),
    pBD('NW', 'NW', 7.4, 7, [[7.2, 11], [8.2, 17], [9, 19]], { v: 6.5, name: 'Nate Wiggins', pre: { t0: -0.7, pts: [[6.6, 8]], v: 3 } }),
    pBD('MH', 'MH', 46, 7, [[46.5, 11], [45.8, 17], [45, 19.5]], { v: 6.5, name: 'Marlon Humphrey', pre: { t0: -0.7, pts: [[46.8, 8]], v: 3 } }),
    pBD('MS', 'MS', 19.5, 13, [[T(-2.5), 15.5], [MID, 18], [T(1), 19.5]], { v: 7, name: 'Malaki Starks' }),
    pBD('KH', 'KH', 34.5, 13, [[36, 10], [39.5, 7.6], [41.2, 8.4]], { v: 7, name: 'Kyle Hamilton' }),
  ],
  zones: [
    { t0: 0.7, cx: 8.9, cy: 19, rx: 8.4, ry: 4, label: 'Deep ⅓' }, { t0: 0.7, cx: MID, cy: 20, rx: 8.4, ry: 4, label: 'Deep ⅓' }, { t0: 0.7, cx: 44.4, cy: 19, rx: 8.4, ry: 4, label: 'Deep ⅓' },
    { t0: 0.9, cx: 41.5, cy: 8, rx: 5, ry: 3, label: 'Sky (curl-flat)' }
  ],
  labels: [{ t0: -1.6, t1: -0.05, x: MID, y: 17.5, text: 'TWO HIGH: Cover 2, 4 or 6?' }, { t0: 1.0, t1: 3.4, x: MID, y: 23, text: 'ONE HIGH: Cover 3' }],
  rings: [[-1.5, -0.6, 'MS'], [-1.5, -0.6, 'KH'], [0, 1.2, 'MS'], [0.2, 1.6, 'KH']],
  beats: [
    [-1.5, 'Pre-snap. The Ravens show two deep safeties at about 13 yards. To a quarterback that is a <span class="g" data-g="mofo">middle-of-the-field-open</span> shell: Cover 2, 4 or 6. The deep middle should be empty.'],
    [-0.6, 'Late movement. In the final half-second the corners widen and give ground. Disguise lives in these last moments, after the quarterback has made his read.'],
    [0, 'Snap: the <span class="g" data-g="rotation">rotation</span>. One safety sprints to the deep middle; the other spins down toward the flat. Two-high has become one-high.'],
    [0.9, 'The corners <span class="g" data-g="bail">bail</span> to deep thirds. The coverage is <span class="g" data-g="cover-3">Cover 3</span>, with the rotated safety as the "sky" defender in the curl-flat, outside the slot receiver.'],
    [1.6, 'The out route the quarterback expected to throw against a squatting Cover 2 corner now runs straight at the rotated safety.'],
    [2.9, 'Everything is capped. The quarterback holds the ball, and a normal four-man rush gets home.']
  ],
  recon: 'Illustration, not a specific play: it combines elements described in 2026 coverage of Minter\'s defense (three-safety looks, pre-snap disguise, late rotation, Hamilton aligning at all three levels).'
};

/* ---------- Ravens defense: Week 1 pressure ---------- */
const sc_pressure = {
  title: 'Week 1: the wrong four rushers',
  src: 'Colts at own 30 · 1st quarter, 12:40 (Filmstudy Baltimore)',
  tag: 'Simulated pressure', gun: true,
  los: 30, view: { y0: -9, y1: 19 }, t: [-1.5, 2.2], rest: -1.5, end: 1.9,
  players: [
    pO('LT', 'LT', OLX[0], -0.9, [[T(-4.8), -2.4]], { kind: 'pp' }),
    pO('LG', 'LG', OLX[1], -0.9, [[OLX[1], -2.4]], { kind: 'pp' }),
    pO('C', 'C', OLX[2], -0.9, [[OLX[2], -2.4]], { kind: 'pp' }),
    pO('RG', 'RG', OLX[3], -0.9, [[T(2.6), -2.2]], { kind: 'pp' }),
    pO('RT', 'RT', OLX[4], -0.9, [[T(3.9), -1.4]], { kind: 'block', v: 3, name: 'Jalen Travis (turns inside)' }),
    pO('QB', 'QB', MID, -5, [[MID, -6, 0.5], { w: 0.5 }, [T(-0.4), -6.2, 1.35]], { kind: 'none', name: 'Daniel Jones' }),
    pO('RB', 'RB', T(-1.8), -5, [[T(-4), -3.5]], { kind: 'block', v: 4 }),
    pO('X', 'X', 7, -0.9, [[7, 18]], { v: 8 }),
    pO('H', 'H', 15.6, -1.6, [[16.3, 3], [22.5, 6.4], [26, 7.5]], { v: 8 }),
    pO('Y', 'Y', 37, -1.6, [[37, 15]], { v: 7 }),
    pO('Z', 'Z', 46, -0.9, [[46, 6], [49, 6.5]], { v: 7.5 }),
    pBD('TH', 'E', T(-7.6), 1, [[T(-6), -1.8]], { kind: 'rush', v: 3 }),
    pBD('CC', 'T', T(-1.2), 0.9, [[T(-1), -1.9]], { kind: 'rush', v: 3 }),
    pBD('BW', 'BW', T(3.2), 0.9, [[T(2.6), 3], [T(0.8), 6.4], [T(0.4), 7.1, 1.7]], { v: 4.3, name: 'Broderick Washington (drops)' }),
    pBD('TR', 'TR', T(7.8), 1, [[T(6.8), -1.4], [T(3.6), -4.4], [T(1.4), -5.6]], { kind: 'rush', v: 6.6, name: 'Tavius Robinson' }),
    pBD('KH', 'KH', T(6.2), 8, [[T(3.4), 1], [T(3.6), -1.0]], { kind: 'rush', v: 6, name: 'Kyle Hamilton', pre: { t0: -1.4, pts: [[T(4.6), 3.8]], v: 3.6 } }),
    pBD('RS', 'M', T(-2.4), 4.8, [[T(-3.8), 7.2]], { v: 4 }),
    pBD('TS', 'W', T(10), 5, [[T(13), 7.6]], { v: 4.5 }),
    pBD('JH', 'S', 16, 5, [[12.5, 7.5]], { v: 4.5 }),
    pBD('NW', 'CB', 7.4, 7, [[7.8, 16]], { v: 6.5 }),
    pBD('MH', 'CB', 46, 7, [[45.5, 16]], { v: 6.5 }),
    pBD('MS', 'S', MID, 13, [[MID, 16.5]], { v: 5 }),
  ],
  ball: [{ t: 1.4, pass: 'BW', at: 1.72 }, { t: 1.74, hold: '' }],
  rings: [[-1.4, 0.3, 'KH'], [0.3, 1.1, 'TR'], [0.7, 2.2, 'BW']],
  labels: [{ t0: 1.72, t1: 2.2, x: T(0.4), y: 9.6, text: 'Pass broken up' }],
  beats: [
    [-1.5, 'Pre-snap. Kyle Hamilton walks down from safety depth into the box, over the gap between the right guard and right tackle. The protection now has to account for a possible fifth rusher.'],
    [0, 'Snap. Hamilton blitzes the <span class="g" data-g="gaps">B-gap</span>. Right tackle Jalen Travis must take the most dangerous inside rusher, so he turns in on Hamilton.'],
    [0.5, 'That leaves Tavius Robinson coming free off the right edge: nobody in the protection is assigned to him.'],
    [0.8, 'The second layer of the trick: defensive tackle Broderick Washington does not rush. He drops into the short middle, the window a quarterback throws to when he sees a blitz.'],
    [1.4, 'Hurried by Robinson, Daniel Jones throws over the middle on time…'],
    [1.75, '…into Washington, who knocks it down. Four rushers, as on any normal down, but not the four the protection expected. That is the idea of a <span class="g" data-g="sim">simulated pressure</span>.']
  ],
  recon: 'Reconstruction from Filmstudy Baltimore\'s Week 1 defensive notes (Q1, 12:40): Hamilton\'s B-gap blitz drew RT Jalen Travis inside, Robinson rushed unblocked off the offensive right side for a QB hit, and Washington broke up the pass after dropping into coverage. Receiver routes, the coverage behind the rush and the exact rush count are illustrative.'
};

/* ---------- Ravens defense: big nickel run fit ---------- */
const sc_fit = {
  generic: true,
  title: 'Big nickel against the run: every gap has an owner',
  src: 'Concept illustration · Week 1: 28 big-nickel snaps, 17 runs for 92 yards',
  tag: 'Run fits',
  los: 50, view: { y0: -9, y1: 14 }, t: [-0.8, 2.4], rest: -0.8, end: 2.05,
  players: [
    ...OL5('O', [[[T(-2.4), 0.6]], [[T(0), 1.4]], [[T(2.1), 1.4]], [[T(4.3), 1.4]], [[T(6.4), 1.0]]], { v: 3.6 }),
    pO('QB', 'QB', MID, -2.9, [[T(2.8), -3.4, 0.55], [T(2.4), -5]], { kind: 'none' }),
    pO('RB', 'RB', MID, -7, [[T(2.6), -4.6], [T(5.8), -2.3, 0.95], [T(7.4), -0.4, 1.3], [T(6.6), 1.2, 1.6], [T(5.4), 2.6, 1.95]], { kind: 'run', v: 8 }),
    pO('Y', 'Y', T(6.6), -1.1, [[T(8.6), 0.8]], { kind: 'block', v: 3.6 }),
    pO('U', 'U', T(8.8), -2.2, [[T(10.6), 0.2]], { kind: 'block', v: 4 }),
    pO('X', 'X', 9, -0.9, [[10, 5]], { kind: 'block', v: 6 }),
    pO('Z', 'Z', 45, -0.9, [[44.6, 4.6]], { kind: 'block', v: 6 }),
    pBD('TH', 'TH', T(-5.5), 1, [[T(-3), -0.4]], { kind: 'rush', v: 3, name: 'Trey Hendrickson' }),
    pBD('TJ', 'TJ', T(-1.1), 0.9, [[T(0.4), 0.8]], { kind: 'rush', v: 3, name: 'Travis Jones' }),
    pBD('BW', 'BW', T(3.3), 0.9, [[T(4.2), 1.6]], { kind: 'rush', v: 3, name: 'Broderick Washington' }),
    pBD('TR', 'TR', T(7.8), 1, [[T(8.4), 0.4], [T(7.8), 0.6]], { kind: 'rush', v: 3, name: 'Tavius Robinson' }),
    pBD('RS', 'RS', T(1.8), 4.8, [[T(5.6), 2.8], [T(6.4), 2.0, 1.4]], { v: 6, d: 0.15, name: 'Roquan Smith' }),
    pBD('TB', 'TB', T(-2.4), 4.8, [[T(1.6), 3.4], [T(4.8), 3.0, 1.85]], { v: 5.5, d: 0.2, name: 'Teddye Buchanan' }),
    pBD('KH', 'KH', T(12.4), 4.4, [[T(11.4), 2.2], [T(9.6), 0.8, 1.25]], { v: 6, name: 'Kyle Hamilton (force)' }),
    pBD('JH', 'JH', T(4.5), 8.5, [[T(7.4), 4.6], [T(6.4), 2.9, 1.8]], { v: 6.5, d: 0.25, name: 'Jaylinn Hawkins (alley)' }),
    pBD('MS', 'MS', T(-5), 12.5, [[T(-1), 10]], { v: 5, name: 'Malaki Starks' }),
    pBD('NW', 'NW', 9.6, 6.5, [[10.6, 6.6]], { v: 3, name: 'Nate Wiggins' }),
    pBD('MH', 'MH', 44.4, 6.5, [[44, 6.4]], { v: 3, name: 'Marlon Humphrey' }),
  ],
  ball: [{ t: 0.6, pass: 'RB', at: 0.66 }],
  extra: (g, X, Y) => {
    const gaps = [['D', T(-7.7)], ['C', T(-5.5)], ['B', T(-3.3)], ['A', T(-1.1)], ['A', T(1.1)], ['B', T(3.3)], ['C', T(5.5)], ['D', T(7.7)], ['D+', T(10)]];
    gaps.forEach(([l, x]) => { const t = sv('text', { x: X(x), y: Y(-3.4), class: 'gap-lbl', 'text-anchor': 'middle' }, g); t.textContent = l; });
  },
  rings: [[0.3, 1.4, 'KH'], [0.9, 1.8, 'RS'], [1.2, 2.0, 'JH']],
  beats: [
    [-0.8, 'Pre-snap. The offense brings two tight ends (12 personnel) and hopes to run at the Ravens\' lighter <span class="g" data-g="big-nickel">big nickel</span>: five defensive backs, three of them safeties who tackle like linebackers. Count the <span class="g" data-g="box">box</span>: six defenders, with a third safety as a seventh at eight yards.'],
    [0, 'Snap. Outside zone to the right. Each defender owns a gap: this is the <span class="g" data-g="fit">run fit</span>. Gap letters are drawn behind the line.'],
    [0.6, 'The overhang safety is the <span class="g" data-g="force">force</span> player. He attacks from the outside in and must never let the ball carrier get outside him.'],
    [1.1, 'The Mike linebacker fast-flows to the gap outside the tight end; the third safety triggers from depth into the alley; the Will linebacker holds the cutback.'],
    [1.95, 'The runner cuts back into the Will linebacker and the third safety. Every gap was filled: gain of three.']
  ],
  recon: 'Concept illustration of big-nickel run fits. The package counts come from Filmstudy Baltimore\'s Week 1 notes.'
};

/* ---------- Week 7: rush three, drop eight ---------- */
const sc_rush3 = {
  generic: true,
  title: 'Week 7: why "rush three, drop eight" is not automatically safe',
  src: 'Illustration of the second-half problem vs. Cincinnati',
  tag: 'Three-man rush', gun: true,
  los: 45, view: { y0: -9, y1: 23 }, t: [-0.6, 3.9], rest: -0.6, end: 3.7,
  players: [
    ...offense2x2('O', {
      X: [[7, 8], [8, 18]], H: [[16, 12], [18, 21]],
      Y: [[37.4, 6], [33.5, 8.5]], Z: [[46.3, 14.5], [40, 15.4], [31, 15.8], [27, 16]],
      RB: [[T(3), -3.2]], QB: [[MID, -6.3, 0.6], { w: 2.3 }, [T(0.3), -6.6, 3.0]]
    }),
    pBD('E1', 'E', T(-7.6), 1, [[T(-6), -1.8], [T(-5.2), -2.8]], { kind: 'rush', v: 2 }),
    pBD('NT', 'T', MID, 0.9, [[MID, -1.9]], { kind: 'rush', v: 1.5 }),
    pBD('E2', 'E', T(7.6), 1, [[T(6), -1.8], [T(5.2), -3]], { kind: 'rush', v: 2 }),
    pBD('L1', 'LB', T(-2.6), 5, [[T(-4), 10]], { v: 4.5 }),
    pBD('KJ', 'KJ', T(3.2), 5.5, [[T(5.5), 10.6], [T(6.8), 11.2]], { v: 4.5, name: 'Keondre Jackson' }),
    pBD('L3', 'LB', T(-0.4), 7, [[MID, 10.6]], { v: 4 }),
    pBD('N', 'S', 16.5, 5.5, [[12, 9]], { v: 4.5 }),
    pBD('O1', 'S', 39, 5.5, [[43.5, 9]], { v: 4.5 }),
    pBD('CL', 'CB', 7.4, 7, [[7.6, 18]], { v: 6 }),
    pBD('CR', 'CB', 46, 7, [[45.6, 19]], { v: 6 }),
    pBD('FS', 'S', MID, 13, [[T(-3.5), 20]], { v: 5 }),
  ],
  zones: [{ t0: 1.2, poly: [[20, 12], [40, 12], [40, 17.5], [20, 17.5]], label: 'Open band', team: 'B' }],
  ball: [{ t: 2.85, pass: 'Z', at: 3.15 }],
  rings: [[0, 1.4, 'E1'], [0, 1.4, 'E2'], [2.2, 3.9, 'Z']],
  beats: [
    [-0.6, 'Pre-snap. A standard two-by-two set. The defense will rush three and drop eight into zone coverage.'],
    [0, 'Snap. Three rushers against five linemen and a back: the protection can double-team two of them. The quarterback will have a clean pocket for three seconds or more.'],
    [1.2, 'Zone defenders run to their landmarks and wait. Underneath defenders settle at 8 to 11 yards, deep defenders at 18 or more. Between those layers is a band of open grass.'],
    [2.2, 'With time, the receiver can cross the whole field and settle in that band, next to whichever underneath defender the quarterback chooses to attack.'],
    [3.2, 'Catch. In the second half Joe Burrow went 16-of-18 for 249 yards and four touchdowns as a 13–0 Ravens halftime lead became a 35–13 loss.']
  ],
  recon: 'Illustration of the pattern described in Week 7 post-game analysis: three- and four-man rushes with extra droppers, a clean pocket, completions over the middle to Tee Higgins, and Keondre Jackson targeted in an expanded role. Not a reconstruction of a specific snap; the receiver is generic.'
};

/* ---------- "The line tells you": five variants from one pre-snap picture ---------- */
function lineScene(kind) {
  const base = {
    los: 40, first: 50, view: { y0: -10, y1: 20 }, t: [-0.4, 2.6], rest: -0.4, tag: 'Watch the linemen', generic: true
  };
  const D = (moves) => [
    pOD('E1', 'E', T(-6.4), 0.9, moves.E1, { kind: 'rush', v: 3.2 }),
    pOD('T1', 'T', T(-1.1), 0.9, moves.T1, { kind: 'rush', v: 3 }),
    pOD('T2', 'T', T(3.3), 0.9, moves.T2, { kind: 'rush', v: 3 }),
    pOD('E2', 'E', T(9.6), 0.9, moves.E2, { kind: 'rush', v: 3.2 }),
    pOD('W', 'W', T(-3.5), 4.8, moves.W, { v: 4.6, d: 0.15 }),
    pOD('M', 'M', T(0.6), 5, moves.M, { v: 4.6, d: 0.15 }),
    pOD('SL', 'S', T(6.4), 4.6, moves.SL, { v: 4.6, d: 0.15 }),
    pOD('LC', 'CB', 9, 7, moves.LC, { v: 6 }),
    pOD('RC', 'CB', 45, 7, moves.RC, { v: 6 }),
    pOD('FS', 'FS', T(-3), 13, moves.FS, { v: 5 }),
    pOD('SS', 'SS', T(8), 11, moves.SS, { v: 5 }),
  ];
  const Y = (m, k) => pB('Y', 'Y', T(6.6), -1.1, m, { kind: k || 'block', v: 4.5, name: 'Mark Andrews' });
  const U = (m, k) => pB('U', 'U', T(-6.6), -1.1, m, { kind: k || 'block', v: 4.5, name: 'Durham Smythe' });
  if (kind === 'run') return Object.assign(base, {
    title: 'Run: low hats, moving forward and sideways',
    players: [
      ...OL5('B', [[[T(-2.4), 0.8]], [[T(0), 1.6]], [[T(2.1), 1.6]], [[T(4.3), 1.6]], [[T(6.4), 1.2]]]),
      pB('QB', 'QB', MID, -2.9, [[T(3), -3.5, 0.55], [T(2.6), -5]], { kind: 'none', name: 'Lamar Jackson' }),
      pB('RB', 'RB', MID, -7, [[T(2.6), -4.6], [T(5.8), -2.3, 0.95], [T(7.8), 0.4], [T(8.6), 4.6], [T(9.4), 8.6]], { kind: 'run', v: 8, name: 'Derrick Henry' }),
      Y([[T(8.6), 1.0]]), U([[T(-4.6), 0.6]]),
      pB('X', 'X', 9, -0.9, [[9.4, 5], [9.6, 6]], { kind: 'block', v: 5 }), pB('Z', 'Z', 45, -0.9, [[44.8, 5]], { kind: 'block', v: 5 }),
      ...D({ E1: [[T(-4.6), 0.2]], T1: [[T(0.6), 1.2]], T2: [[T(4.4), 1.8]], E2: [[T(10.4), 0.8]], W: [[T(1), 3.8], [T(3.6), 3.4]], M: [[T(4.6), 3.6], [T(6), 3.8]], SL: [[T(8.6), 3.2]], LC: [[9.2, 7.4]], RC: [[44.6, 6.6]], FS: [[T(0), 12]], SS: [[T(8.6), 8]] })
    ],
    ball: [{ t: 0.6, pass: 'RB', at: 0.66 }], rings: [[0, 0.8, 'LG'], [0, 0.8, 'RG']], end: 2.4,
    beats: [
      [-0.4, 'Pre-snap: 12 personnel, the quarterback under center. Same picture for all five variants.'],
      [0, 'At the snap the linemen fire out low, pads down, and move forward or sideways together. Coaches call this "low hats." A lineman who steps toward the defense is almost never protecting a pass.'],
      [0.6, 'Linebackers read the guards: when the guards come forward, they "trigger" downhill. Now watch the second level flow with the play.'],
      [1.2, 'Everything is moving the same direction: zone. The back picks his hole off the blocks.']
    ]
  });
  if (kind === 'pass') return Object.assign(base, {
    title: 'Dropback pass: high hats, moving backward', passPlay: true,
    players: [
      ...OL5('B', [[[T(-5.2), -2.8]], [[T(-2.4), -2.4]], [[MID, -2.2]], [[T(2.4), -2.4]], [[T(5.2), -2.8]]], { v: 3.2 }),
      pB('QB', 'QB', MID, -2.9, [[MID, -7.6, 0.95], [MID, -7.2]], { kind: 'drop', v: 6, name: 'Lamar Jackson' }),
      pB('RB', 'RB', MID, -7, [[T(-2.4), -5]], { kind: 'block', v: 3.6, name: 'Derrick Henry' }),
      Y([[T(7.2), 6], [T(11.2), 7.4]], 'route'), U([[T(-6.2), 4], [T(-4.6), 9.5]], 'route'),
      pB('X', 'X', 9, -0.9, [[9, 12], [10.4, 10.4]], { v: 7.8, name: 'Zay Flowers' }), pB('Z', 'Z', 45, -0.9, [[45, 14], [34, 15.4]], { v: 7.8, name: 'Rashod Bateman' }),
      ...D({ E1: [[T(-6), -1.8], [T(-5.4), -3.2]], T1: [[T(-1.2), -1.6]], T2: [[T(3), -1.6]], E2: [[T(8.6), -1.6], [T(6.6), -3.4]], W: [[T(-4.6), 8.6]], M: [[T(1), 9.6]], SL: [[T(8.4), 7.6]], LC: [[9.6, 11]], RC: [[44.6, 12]], FS: [[T(-4), 15]], SS: [[T(6), 15]] })
    ],
    rings: [[0, 0.8, 'LT'], [0, 0.8, 'RT']],
    beats: [
      [-0.4, 'Same pre-snap picture.'],
      [0, 'At the snap the linemen pop up and step backward: "high hats." The tackles kick-slide to the outside to meet the edge rushers. That backward step is the clearest pass tell in football.'],
      [0.5, 'Linebackers see high hats and drop to their zones, eyes on the quarterback.'],
      [1.0, 'The quarterback finishes his drop. From here on, watch the receivers against the coverage.']
    ]
  });
  if (kind === 'pa') return Object.assign(base, {
    title: 'Play-action: run look up front, but no lineman goes downfield', passPlay: true,
    players: [
      ...OL5('B', [[[T(-3.6), 0.3]], [[T(-1.2), 0.5]], [[T(1), 0.5]], [[T(3.2), 0.5]], [[T(5.4), 0.2]]], { v: 3.2 }),
      pB('QB', 'QB', MID, -2.9, [[T(1.6), -3.6, 0.6], [T(1), -6.6], [T(0.2), -8]], { kind: 'drop', v: 5, name: 'Lamar Jackson' }),
      pB('RB', 'RB', MID, -7, [[T(2.6), -4.4], [T(4.2), -2.6]], { kind: 'fake', v: 6, name: 'Derrick Henry' }),
      Y([[T(8.4), 0.4]]), U([[T(-6.6), 6], [T(2), 13.5], [T(10), 15]], 'route'),
      pB('X', 'X', 9, -0.9, [[9.4, 12], [17, 22]], { v: 8, name: 'Zay Flowers' }), pB('Z', 'Z', 45, -0.9, [[45, 9], [42, 16], [36, 20]], { v: 8, name: 'Rashod Bateman' }),
      ...D({ E1: [[T(-4.6), -0.2], [T(-4.2), -2.4]], T1: [[T(0.2), 0.4]], T2: [[T(3.6), 0.6]], E2: [[T(9.6), -0.6]], W: [[T(-1), 3.4], [T(-1.6), 7]], M: [[T(2.8), 3.4], [T(2.2), 7]], SL: [[T(7.6), 3], [T(7.8), 5.6]], LC: [[9.4, 9], [11.6, 15]], RC: [[44.8, 10], [41, 16]], FS: [[T(-1.6), 13], [T(-4), 17]], SS: [[T(7.4), 8.4]] })
    ],
    rings: [[0, 0.9, 'LG'], [0, 0.9, 'C'], [0.5, 1.4, 'M']],
    beats: [
      [-0.4, 'Same pre-snap picture.'],
      [0, 'Low hats again: the linemen fire forward as if blocking a run. Their goal is to fool the linebackers, who read them.'],
      [0.5, 'The tell is subtle: the linemen stop at the line. On a legal pass they cannot be more than one yard downfield when the ball is thrown, so they "sell" the run without climbing to the second level.'],
      [0.9, 'Linebackers step up for the run, then realize. Every step forward is a step they must recover before the routes behind them break open.']
    ]
  });
  if (kind === 'screen') return Object.assign(base, {
    title: 'Screen: pass set, then let the rushers go',
    players: [
      pB('LT', 'LT', OLX[0], -0.9, [[T(-4.6), -2.2], { w: 0.25 }, [T(-6.2), -1], [T(-10), 0.6]], { kind: 'block', v: 4.6 }),
      pB('LG', 'LG', OLX[1], -0.9, [[T(-2.2), -2.2], { w: 0.25 }, [T(-4.2), -1.4], [T(-8), 1.6]], { kind: 'block', v: 4.6 }),
      pB('C', 'C', OLX[2], -0.9, [[MID, -2.2], { w: 0.3 }, [T(-2.2), -0.6], [T(-5.6), 3]], { kind: 'block', v: 4.6 }),
      pB('RG', 'RG', OLX[3], -0.9, [[T(2.2), -2.6]], { kind: 'pp' }), pB('RT', 'RT', OLX[4], -0.9, [[T(4.6), -2.8]], { kind: 'pp' }),
      pB('QB', 'QB', MID, -2.9, [[MID, -7.4, 0.95], [T(0.6), -8.2, 1.5]], { kind: 'drop', v: 5, name: 'Lamar Jackson' }),
      pB('RB', 'RB', MID, -7, [[T(-1.6), -5.6], { w: 0.45 }, [T(-6), -3.4], [T(-8), -2.8], [T(-9), 3], [T(-9.6), 8]], { kind: 'route', v: 6, name: 'Derrick Henry' }),
      Y([[T(7.2), 9], [T(7.4), 14]], 'route'), U([[T(-6.2), 2.4], [T(-7.6), 4]]),
      pB('X', 'X', 9, -0.9, [[9, 12]], { v: 7.8 }), pB('Z', 'Z', 45, -0.9, [[45, 15]], { v: 7.8 }),
      ...D({ E1: [[T(-5.6), -2], [T(-3), -5.4]], T1: [[T(-1.2), -2.2], [T(-0.4), -5.8]], T2: [[T(3), -2]], E2: [[T(8.6), -1.6], [T(6.4), -3.6]], W: [[T(-4.6), 8]], M: [[T(1), 9]], SL: [[T(8.4), 7.6]], LC: [[9.4, 11]], RC: [[44.6, 12]], FS: [[T(-4), 15]], SS: [[T(6), 15]] })
    ],
    ball: [{ t: 1.45, pass: 'RB', at: 1.75 }], rings: [[0.3, 1.2, 'T1'], [0.3, 1.2, 'E1']], end: 2.9, t: [-0.4, 3.0],
    beats: [
      [-0.4, 'Same pre-snap picture.'],
      [0, 'High hats: it looks like a dropback pass.'],
      [0.35, 'Then the linemen on one side "whiff" on purpose and let the rushers run past them. A defensive lineman suddenly running free is often a screen.'],
      [0.9, 'Those linemen release laterally to form a convoy in front of the back. The defense\'s best rushers are now behind the play.']
    ]
  });
  if (kind === 'gap') return Object.assign(base, {
    title: 'Gap scheme: someone pulls',
    players: [
      pB('LT', 'LT', OLX[0], -0.9, [[T(-3.2), -2.4], [T(-1.4), -2.6]], { kind: 'block', v: 3.6 }),
      pB('LG', 'LG', OLX[1], -0.9, [[T(-2), -2.4], [T(3), -2.4], [T(6.8), -0.6], [T(7.4), 2.4]], { kind: 'block', v: 6 }),
      pB('C', 'C', OLX[2], -0.9, [[T(-1.6), 0.6]], { kind: 'block', v: 3.4 }),
      pB('RG', 'RG', OLX[3], -0.9, [[T(1), 0.8]], { kind: 'block', v: 3.4 }),
      pB('RT', 'RT', OLX[4], -0.9, [[T(3.2), 1.2]], { kind: 'block', v: 3.4 }),
      pB('QB', 'QB', MID, -2.9, [[T(2), -3.6, 0.6], [T(1.6), -5]], { kind: 'none', name: 'Lamar Jackson' }),
      pB('RB', 'RB', MID, -7, [[T(-0.8), -6.4, 0.3], [T(2.4), -4], [T(5.2), -1.2], [T(6.4), 2.2], [T(7.6), 7]], { kind: 'run', v: 6.6, name: 'Derrick Henry' }),
      Y([[T(5.4), 0.8]]), U([[T(-7.6), 0.6]]),
      pB('X', 'X', 9, -0.9, [[9.4, 5]], { kind: 'block', v: 5 }), pB('Z', 'Z', 45, -0.9, [[44.8, 5]], { kind: 'block', v: 5 }),
      ...D({ E1: [[T(-5), 0.2], [T(-3.4), -1.4]], T1: [[T(-0.2), 1.2]], T2: [[T(2.6), 1.6]], E2: [[T(9), 0.4]], W: [[T(1.6), 4], [T(4.6), 3.6]], M: [[T(4.4), 3.4], [T(6.8), 3]], SL: [[T(8.6), 2.6]], LC: [[9.2, 7.4]], RC: [[44.6, 6.6]], FS: [[T(0), 12]], SS: [[T(8.6), 8]] })
    ],
    ball: [{ t: 0.55, pass: 'RB', at: 0.6 }], rings: [[0, 1.2, 'LG']], end: 2.9, t: [-0.4, 3.0],
    beats: [
      [-0.4, 'Same pre-snap picture.'],
      [0, 'One lineman steps backward and runs along the line behind his teammates: a <span class="g" data-g="pull">pull</span>. The rest of the line blocks down, toward the center.'],
      [0.6, 'Linebackers are taught "follow the guard": a pulling guard leads them to the point of attack. That is why offenses use fake pulls on play-action and screens.'],
      [1.1, 'The puller turns up through the hole and blocks the linebacker. Gap schemes create a new gap with a moving blocker; zone schemes move everyone together.']
    ]
  });
}

/* ===================== COVERAGE vs CONCEPT LAB ===================== */
const ROUTES = {
  smash: { name: 'Smash', idea: 'High-low on the corner: hitch underneath, corner route over the top.',
    r: { X: [[7, 5], [7.4, 4.6], { stay: 1 }], H: [[16, 10], [10.5, 15.5], [7, 17.5]], Y: [[37.4, 10], [43, 15.5], [46.5, 17.5]], Z: [[46.3, 5], [45.9, 4.6], { stay: 1 }], RB: [[T(3), 0.6], [T(3.4), 2.4], { stay: 1 }], RBk: 'route' } },
  flood: { name: 'Flood', idea: 'Three receivers at three depths on one side: go, sail at 12–14, flat.',
    r: { X: [[7, 11.5], [20, 13], [24, 13.2]], H: [[16, 14], [17, 22]], Y: [[37.4, 8], [44, 12.4], [48.4, 13.6]], Z: [[46.3, 26]], RB: [[T(4), -4.2], [T(8), -1.8], [44, 1.2]], RBk: 'route' } },
  mesh: { name: 'Mesh', idea: 'Two shallow crossers pass inches apart; a corner route and a swing complete it.',
    r: { X: [[7, 26]], H: [[16, 3.4], [26, 5], [38, 5.6], [44, 5.2]], Y: [[37.4, 2.6], [27.4, 4.3], [16, 4.8], [10, 4.8]], Z: [[46.3, 10.5], [50, 17]], RB: [[T(-2.4), -4.8], [T(-7), -2.8], [12, -0.8]], RBk: 'route' } },
  verts: { name: 'Four verticals', idea: 'Four receivers run straight downfield: two outside, two up the seams.',
    r: { X: [[7, 30]], H: [[16, 8], [19.6, 30]], Y: [[37.4, 8], [33.6, 30]], Z: [[46.3, 30]], RB: [[T(2.4), 0.4], [T(0.6), 4], { stay: 1 }], RBk: 'route' } },
  dagger: { name: 'Dagger', idea: 'The slot clears up the seam; the outside receiver runs a deep dig into the space he empties.',
    r: { X: [[7, 28]], H: [[16, 5], [10.4, 5.4]], Y: [[37.4, 8], [34.4, 30]], Z: [[46.3, 15.5], [33, 17.2], [26, 17.4]], RB: [[T(3), 0.4], [T(3.4), 3], { stay: 1 }], RBk: 'route' } },
};
const COVS = {
  C0: { name: 'Cover 0', short: '0', pre: 'Pre-snap: no safety deeper than six yards, corners pressed. Count the defenders near the line: more than the offense can block.',
    tell: 'At the snap everyone turns and runs with a receiver; the extra defenders blitz. There is no one in the deep middle.',
    a: { LC: [7, 1.6, 'man', 'X'], RC: [46.3, 1.6, 'man', 'Z'], N: [16, 2.6, 'man', 'H'], S: [T(-5.5), 5.6, 'blitz'], F: [37.2, 4.4, 'man', 'Y'], M: [T(-1.2), 4.6, 'man', 'RB'], W: [T(3.6), 3.6, 'blitz'] }, zones: [] },
  C1: { name: 'Cover 1', short: '1', pre: 'Pre-snap: one safety in the middle at 13–15 yards, corners pressed or tight, one safety rolled down near the box.',
    tell: 'At the snap the corners turn and run with their receivers; the free safety stays in the middle; a robber sits underneath.',
    a: { LC: [7, 1.8, 'man', 'X'], RC: [46.3, 1.8, 'man', 'Z'], N: [16, 4, 'man', 'H'], S: [37.2, 6, 'man', 'Y'], F: [MID, 14.5, 'zone', MID, 19.5], M: [T(-1.4), 5, 'man', 'RB'], W: [T(3.4), 6, 'zone', T(1), 9] },
    zones: [{ cx: MID, cy: 19.5, rx: 9, ry: 4.4, label: 'Deep middle' }, { cx: T(1), cy: 9, rx: 4, ry: 2.6, label: 'Robber' }] },
  C2: { name: 'Cover 2', short: '2', pre: 'Pre-snap: two safeties at 12–14 yards, near the hashes; corners at about 5 yards with outside leverage.',
    tell: 'At the snap the corners "squat" in the flat with eyes on the quarterback; the safeties backpedal toward the numbers.',
    a: { LC: [6.4, 5.4, 'zone', 6.6, 6], RC: [46.8, 5.4, 'zone', 46.8, 6], S: [17.5, 13, 'zone', 13.3, 19.5], F: [36, 13, 'zone', 40, 19.5], N: [16.4, 5.4, 'zone', 14.5, 10], M: [T(-1.6), 5.2, 'zone', MID, 10.8], W: [T(3.8), 5.2, 'zone', 38.6, 10] },
    zones: [{ cx: 13.3, cy: 20, rx: 12.6, ry: 4.6, label: 'Deep ½' }, { cx: 40, cy: 20, rx: 12.6, ry: 4.6, label: 'Deep ½' }, { cx: 6, cy: 5.6, rx: 5, ry: 3.2, label: 'Flat' }, { cx: 47.3, cy: 5.6, rx: 5, ry: 3.2, label: 'Flat' }, { cx: 15, cy: 10.4, rx: 4.6, ry: 3.2, label: 'Curl' }, { cx: MID, cy: 11, rx: 4.6, ry: 3.2, label: 'Hook' }, { cx: 38.3, cy: 10.4, rx: 4.6, ry: 3.2, label: 'Curl' }] },
  C3: { name: 'Cover 3', short: '3', pre: 'Pre-snap: one safety in the middle; corners off at about 7 yards; a second safety near the box or rotating down.',
    tell: 'At the snap the corners "bail": turn their hips and run to the deep thirds. The middle safety stays deep; four defenders sink underneath.',
    a: { LC: [7.6, 7, 'zone', 8.4, 19], RC: [45.8, 7, 'zone', 45, 19], F: [MID, 14, 'zone', MID, 21], S: [35.6, 9, 'zone', 42.2, 8], N: [16.2, 5.4, 'zone', 11, 8], M: [T(-2.6), 5, 'zone', 21.6, 9.4], W: [T(3.2), 5, 'zone', 31.8, 9.4] },
    zones: [{ cx: 8.9, cy: 19.6, rx: 8.4, ry: 4.4, label: 'Deep ⅓' }, { cx: MID, cy: 21, rx: 8.4, ry: 4.4, label: 'Deep ⅓' }, { cx: 44.4, cy: 19.6, rx: 8.4, ry: 4.4, label: 'Deep ⅓' }, { cx: 10.4, cy: 8, rx: 5.6, ry: 3.2, label: 'Curl-flat' }, { cx: 21.6, cy: 9.6, rx: 4.4, ry: 3.2, label: 'Hook' }, { cx: 31.8, cy: 9.6, rx: 4.4, ry: 3.2, label: 'Hook' }, { cx: 43, cy: 8, rx: 5.6, ry: 3.2, label: 'Curl-flat' }] },
  C4: { name: 'Cover 4', short: '4', pre: 'Pre-snap: two safeties, but shallower than Cover 2 (9–11 yards) and closer to the box; corners off with inside leverage.',
    tell: 'At the snap the safeties pedal slowly with their eyes on the slot receiver (#2); the corners stay on top of the outside receiver (#1). Nobody squats.',
    a: { LC: [7.9, 7.4, 'match', 'X', 7.6, 17], RC: [45.4, 7.4, 'match', 'Z', 45.8, 17], S: [18.2, 10.4, 'read2', 'H', 'X', 19.6, 17.5], F: [35.4, 10.4, 'read2', 'Y', 'Z', 33.6, 17.5], N: [16.4, 5.4, 'zone', 11.4, 7.6], M: [T(-0.8), 5, 'zone', MID, 9.2], W: [T(4.6), 5.2, 'zone', 42, 7.6] },
    zones: [{ cx: 7.6, cy: 18.4, rx: 6.4, ry: 4.4, label: 'Deep ¼' }, { cx: 20, cy: 19, rx: 6.4, ry: 4.4, label: 'Deep ¼' }, { cx: 33.3, cy: 19, rx: 6.4, ry: 4.4, label: 'Deep ¼' }, { cx: 45.8, cy: 18.4, rx: 6.4, ry: 4.4, label: 'Deep ¼' }, { cx: 11.4, cy: 7.6, rx: 5, ry: 3, label: 'Curl-flat' }, { cx: MID, cy: 9.4, rx: 4.6, ry: 3, label: 'Hook' }, { cx: 42, cy: 7.6, rx: 5, ry: 3, label: 'Curl-flat' }] },
  C6: { name: 'Cover 6', short: '6', pre: 'Pre-snap: two-high, but asymmetrical. One side (here the left) looks like Cover 2, the other like quarters.',
    tell: 'At the snap the left corner squats like Cover 2 and the left safety takes a deep half; on the right the corner and safety play quarters.',
    a: { LC: [6.4, 5.2, 'zone', 6.6, 6], S: [17.6, 13, 'zone', 13.3, 19.5], RC: [45.4, 7.4, 'match', 'Z', 45.8, 17], F: [35.4, 10.6, 'read2', 'Y', 'Z', 33.6, 17.5], N: [16.4, 5.4, 'zone', 15, 10], M: [T(-0.8), 5, 'zone', T(-1), 10.2], W: [T(4.6), 5.2, 'zone', 42, 7.6] },
    zones: [{ cx: 13.3, cy: 20, rx: 12.6, ry: 4.6, label: 'Deep ½' }, { cx: 33.3, cy: 19, rx: 6.4, ry: 4.4, label: 'Deep ¼' }, { cx: 45.8, cy: 18.4, rx: 6.4, ry: 4.4, label: 'Deep ¼' }, { cx: 6, cy: 5.6, rx: 5, ry: 3.2, label: 'Flat' }, { cx: 15, cy: 10.4, rx: 4.6, ry: 3.2, label: 'Curl' }, { cx: T(-1), cy: 10.4, rx: 4.4, ry: 3, label: 'Hook' }, { cx: 42, cy: 7.6, rx: 5, ry: 3, label: 'Curl-flat' }] },
};
const VERDICT = {
  smash: {
    C0: ['win', 'X', 0.85, 'Throw the hitch now', 'Cover 0 sends six and leaves every receiver alone with no safety behind him. The ball must come out before the free rusher arrives, and the five-yard hitch is the fastest throw on the field. The pressed corner has no help, so a sharp break wins.'],
    C1: ['ok', 'Y', 2.05, 'A one-on-one, not a read', 'Man coverage spoils the high-low idea: the corner follows the hitch, the man defender trails the corner route, and the free safety can drive on either corner route. Smash becomes isolated matchups. Throw where the leverage is best: here, the tight end against a safety.'],
    C2: ['win', 'Y', 2.0, 'Smash beats Cover 2', 'This is the concept\'s reason to exist. The Cover 2 corner squats in the flat and cannot cover the hitch in front of him and the corner route behind him. The deep-half safety starts near the hash and arrives late to the sideline. Throw the corner route over the corner\'s head.', { F: { slow: 0.8 }, W: { key: 'RB' } }],
    C3: ['ok', 'X', 1.05, 'Take the hitch', 'The deep-third corner bails at the snap, so the corner route runs straight into him. The hitch is open underneath because the curl-flat defender is aligned inside. A reliable five or six yards.', { N: { key: 'H' }, S: { key: 'Y' } }],
    C4: ['loss', 'RB', 2.25, 'Quarters takes it away', 'The quarters safety reads the slot: when #2 goes vertical on the corner route, the safety carries him. The corner sits on top of #1 and drives on the hitch. Two defenders for two routes; the checkdown is what is left.'],
    C6: ['win', 'H', 2.05, 'Throw to the Cover 2 side', 'Cover 6 is quarters on one side and Cover 2 on the other. On the left the corner squats and the half-field safety is stretched exactly as against Cover 2, so the corner route is open there. On the quarters side smash is covered. The quarterback must know which half is which before the snap.', { S: { slow: 0.8 }, N: { key: 'RB' } }] },
  flood: {
    C0: ['loss', 'RB', 1.15, 'Too slow for zero', 'A three-level flood needs about two and a half seconds. Cover 0 brings six and covers everyone man-to-man, so the levels stretch nobody. The quarterback throws hot to the back in the flat for a short gain.'],
    C1: ['ok', 'Y', 2.35, 'Win the matchup or nothing', 'Every receiver has his own defender, so three levels overload no one. Flood becomes the tight end against a safety on the sail route: a matchup an offense with a strong tight end likes, not a schematic win.'],
    C2: ['ok', 'RB', 1.6, 'The flat is free, the sail is a race', 'The squatting corner must choose between the flat route in front of him and the sail route behind him. If he sinks, the flat is open; if he jumps the flat, the deep-half safety has a long way to the sail. The usual answer is the flat for a modest gain.', { RC: { key: 'Y' } }],
    C3: ['win', 'Y', 2.3, 'Flood beats Cover 3', 'The classic Cover 3 beater. Three receivers attack two defenders on one side: the deep-third corner must carry the go route, which leaves the curl-flat defender alone between the sail behind him and the flat in front of him. Read him and throw the other one.', { S: { key: 'RB' } }],
    C4: ['ok', 'RB', 1.6, 'Quarters helps over the sail', 'The quarters safety sees the slot break outside and helps over the top of the sail; the corner runs with the go route. The flat is open early, but only for a short gain.', { W: { key: 'Y' } }],
    C6: ['loss', 'RB', 1.6, 'Wrong side of Cover 6', 'The flood ran into the quarters half of Cover 6, where two deep defenders sit over three routes. Against Cover 6 the call belongs on the Cover 2 side, or behind a motion that flips the strength.', { W: { key: 'Y' } }] },
  mesh: {
    C0: ['win', 'H', 2.2, 'Crossers kill man coverage', 'Crossing routes are poison for man coverage, and Cover 0 has no help inside. The two shallow crossers pass inches apart; their defenders collide in the traffic and one receiver runs away from his man.'],
    C1: ['win', 'Y', 2.25, 'Rub the man defenders', 'Same logic as against zero. The robber can take away one crosser, but the second runs away from his trailing defender into open grass. Mesh is a standard third-down answer to Cover 1.', { W: { key: 'H' } }],
    C2: ['ok', 'H', 1.95, 'Sit down in the window', 'Zone defenders do not chase across the field, so there is no collision. The crossers find the windows between five underneath defenders and sit. A completion, with little room to run after it.'],
    C3: ['ok', 'H', 1.9, 'Under the hooks', 'Against Cover 3 the crossers run underneath the two hook defenders. The throw is easy; the yards after the catch depend on how fast the curl-flat defender closes.'],
    C4: ['win', 'Y', 2.0, 'Too few defenders underneath', 'Quarters keeps only three defenders underneath, and its safeties start around ten yards deep. Two crossers at five yards outnumber the hook defender, and the safeties are too deep to drive on them.', { M: { key: 'H' } }],
    C6: ['ok', 'H', 1.95, 'Workable, not ideal', 'Underneath, Cover 6 looks like quarters on one side and Cover 2 on the other. The crossers work, but the windows are tighter than against pure quarters.'] },
  verts: {
    C0: ['win', 'Y', 1.5, 'Throw early: it is a touchdown', 'There is no deep safety, so any vertical won is a touchdown. The risk is time: four verticals need nearly three seconds to fully develop and Cover 0 brings six. Throw the seam on the first step of separation.', { F: { lag: 0.45 } }],
    C1: ['ok', 'H', 2.3, 'Hold the safety, throw away from him', 'The single free safety can take only one seam. The quarterback looks him toward one side and throws the other seam, or an outside go if a corner is beaten. Precise but productive.', { F: { key: 'Y' } }],
    C2: ['win', 'Y', 2.1, 'Split the safeties', 'Four vertical stems against two deep halves: each safety must cover two vertical routes. The seams run between them, and the window opens around 18 to 20 yards.', { F: { key: 'Z' } }],
    C3: ['win', 'H', 2.2, 'The seams beat the thirds', 'The seams attack the hook defenders, who cannot run 20 yards with a receiver, while each deep-third corner has a go route outside him. The middle safety can take only one seam.', { F: { key: 'Y' } }],
    C4: ['loss', 'RB', 2.4, 'Quarters was built for this', 'Four deep defenders against four vertical routes: every go and every seam has someone on top. The quarterback checks the ball down.'],
    C6: ['ok', 'H', 2.2, 'Attack the half-field side', 'On the quarters side both verticals are covered. On the Cover 2 side one safety has the go and the seam; throw the one he does not take.', { S: { key: 'X' } }] },
  dagger: {
    C0: ['loss', 'H', 0.95, 'No time for a deep dig', 'A dig at 16 yards takes too long against six rushers. The quarterback throws hot to the quick out.'],
    C1: ['ok', 'Z', 2.5, 'A one-on-one in-breaker', 'In man coverage the seam does not clear the dig: the slot\'s defender runs with him and the free safety stays home. The dig is a one-on-one against the corner, with the safety lurking.'],
    C2: ['win', 'Z', 2.5, 'Behind the hooks, under the safety', 'The seam occupies the deep-half safety; the dig settles behind the hook defenders and in front of the safety.', { F: { key: 'Y' } }],
    C3: ['win', 'Z', 2.5, 'Clear the middle, then fill it', 'The seam pulls the hook defender and the middle safety; the dig arrives behind them at 16 yards, in the hole they left.', { F: { key: 'Y' }, RC: { slow: 0.55 } }],
    C4: ['win', 'Z', 2.5, 'Dagger is a quarters beater', 'The quarters safety reads #2 vertical and carries the seam, emptying the space the dig runs into. The corner, playing on top of #1, is too deep to drive on the in-breaking route.', { RC: { lag: 0.6, deep: 2.8 } }],
    C6: ['win', 'Z', 2.5, 'Into the quarters side', 'Dagger ran into the quarters half of Cover 6, where the same seam-and-dig conflict applies, and the half-field safety on the other side cannot help.', { RC: { lag: 0.6, deep: 2.8 } }] },
};
const ROLE_NAMES = { QB: 'the quarterback', RB: 'the running back', X: 'the split end (X)', H: 'the slot receiver (H)', Y: 'the tight end (Y)', Z: 'the flanker (Z)' };
const OFF_NAMES = { QB: 'Lamar Jackson', RB: 'Derrick Henry', X: 'Rashod Bateman', H: 'Zay Flowers', Y: 'Mark Andrews', Z: "Ja'Kobi Lane" };

function buildLab(cov, conc, o) {
  o = o || {};
  const C = COVS[cov], R = ROUTES[conc], V = VERDICT[conc][cov];
  const off = offense2x2('B', R.r).map(p => Object.assign(p, { name: OFF_NAMES[p.id] }));
  if (R.r.RBk) off.find(p => p.id === 'RB').kind = R.r.RBk;
  const okf = {}; off.forEach(p => okf[p.id] = track(p));
  const rec = ['X', 'H', 'Y', 'Z', 'RB'];
  const tEnd = o.noThrow ? (o.tEnd || 2.4) : null;
  // throw timing
  let tThrow = V[2], target = V[1], arrive = 0;
  if (!o.noThrow) {
    const qb = posAt(okf.QB, tThrow), est = posAt(okf[target], tThrow + 0.35);
    arrive = tThrow + 0.1 + Math.hypot(est[0] - qb[0], est[1] - qb[1]) / 21;
  }
  const T1 = o.noThrow ? tEnd : arrive + 0.8;
  // defense
  const defs = [['LE', 'E', T(-7.2), 0.9], ['DT', 'T', T(-1.1), 0.9], ['NT', 'T', T(3.3), 0.9], ['RE', 'E', T(7.6), 0.9]].map(([id, lab, x, y]) => ({ id, lab, x, y, asg: ['rush'] }));
  for (const k in C.a) { const a = C.a[k]; defs.push({ id: k, lab: k === 'LC' || k === 'RC' ? 'CB' : k, x: a[0], y: a[1], asg: a.slice(2) }); }
  const st = {}, out = {};
  const OV = V[5] || {};
  defs.forEach(d => { st[d.id] = { x: d.x, y: d.y, rub: -1 }; out[d.id] = [[-60, d.x, d.y], [0, d.x, d.y]]; });
  const dt = 0.05, react = 0.18;
  const P = (id, t) => posAt(okf[id], t);
  for (let i = 1, t = dt; t <= T1 + 1e-6; i++, t = i * dt) {
    defs.forEach(d => {
      const s = st[d.id], a = d.asg, ov = OV[d.id] || {}; let tg = null, vmax = 6.6;
      if (t < (a[0] === 'rush' ? 0.05 : react)) { /* hold */ }
      else if (!o.noThrow && t > tThrow + 0.12) {
        // ball in the air or caught: every defender breaks on the ball
        const q = P(target, Math.max(t, Math.min(arrive, t + 0.3)));
        tg = [q[0], q[1]]; vmax = a[0] === 'rush' ? 4.5 : 7.2;
        if (Math.hypot(q[0] - s.x, q[1] - s.y) < 1.1) tg = [s.x, s.y];
      }
      else if (a[0] === 'rush') {
        const lim = t < 2.6 ? -2.0 : -3.3; tg = [d.x * 0.82 + MID * 0.18 + Math.sin(t * 4 + d.x) * 0.7, Math.max(lim, -6) + Math.cos(t * 3 + d.x) * 0.3]; vmax = 2.6;
      } else if (a[0] === 'blitz') {
        const q = P('QB', t); tg = [q[0] + (d.x < MID ? -1.2 : 1.2), q[1] + 1.1]; vmax = 6.2;
      } else {
        let mode = a[0], man = null, L = null;
        if (mode === 'man') man = a[1];
        if (mode === 'zone') L = [a[1], a[2]];
        if (mode === 'match') { const r = P(a[1], t); L = [a[2], a[3]]; if (r[1] > 6 && t > 0.5) man = a[1]; }
        if (mode === 'read2') {
          const r2 = P(a[1], t), r2p = P(a[1], Math.max(0, t - 0.3)), r1 = P(a[2], t); L = [a[3], a[4]];
          if (r2[1] > 6.5 && r2[1] - r2p[1] > 1.1) man = a[1];
          else if (t > 0.9) L = [r1[0] * 0.55 + a[3] * 0.45, Math.max(a[4] - 2, r1[1] + 4)];
        }
        if (man) {
          const r = P(man, Math.max(0, t - (ov.lag || 0.22))); const sg = r[0] < MID ? 1 : -1;
          const deep = ov.deep || ((mode === 'match' || mode === 'read2') ? 1.4 : 0.7);
          tg = [r[0] + 0.7 * sg, r[1] + deep]; vmax = 8.1;
          // rub: a man defender who runs into another receiver's path is knocked off stride
          if (s.rub < 0) for (const o2 of rec) { if (o2 === man) continue; const q = P(o2, t); if (Math.hypot(q[0] - s.x, q[1] - s.y) < 1.8 && t > 0.3 && t < 2.4) { s.rub = t + 0.55; break; } }
          if (t < s.rub) vmax *= 0.12;
        } else if (L) {
          const deepZ = L[1] >= 14;
          let best = null, bd = 1e9;
          if (ov.key && t > 0.45) { const q = P(ov.key, deepZ ? Math.max(0, t - 0.35) : t); if (q[1] > (deepZ ? 6 : -2)) best = q; }
          if (!best) for (const id of rec) {
            const q = P(id, deepZ ? Math.max(0, t - 0.35) : t);
            if (deepZ) { if (Math.abs(q[0] - L[0]) < 9.5 && q[1] > 7.5 && q[1] + 0.0 > (best ? best[1] : -1)) { best = q; } }
            else { const dd = Math.hypot(q[0] - L[0], q[1] - L[1]); if (Math.abs(q[0] - L[0]) < 7.5 && q[1] > L[1] - 7 && q[1] < L[1] + 7 && dd < bd) { bd = dd; best = q; } }
          }
          if (best && t > (deepZ ? 0.9 : 0.55)) tg = deepZ ? [L[0] * (ov.key ? 0.2 : 0.6) + best[0] * (ov.key ? 0.8 : 0.4), Math.max(L[1] - (ov.key ? 6 : 2.5), best[1] + 2.4)]
            : (ov.key ? [best[0], Math.min(L[1] + 4, best[1] + 0.8)] : [L[0] + Math.max(-5, Math.min(5, 0.62 * (best[0] - L[0]))), Math.min(L[1] + 2.5, L[1] + 0.4 * (best[1] - L[1]))]);
          else tg = L;
          vmax = (deepZ ? 6.4 : 6.2) * (ov.slow || 1);
        }
      }
      if (tg) {
        const dx = tg[0] - s.x, dy = tg[1] - s.y, dd = Math.hypot(dx, dy), step = Math.min(dd, vmax * dt);
        if (dd > 1e-6) { s.x += dx / dd * step; s.y += dy / dd * step; }
      }
      if (i % 2 === 0) out[d.id].push([t, s.x, s.y]);
    });
  }
  const defP = defs.map(d => {
    const kf = out[d.id]; kf.push([60, st[d.id].x, st[d.id].y]);
    const kind = d.asg[0] === 'rush' || d.asg[0] === 'blitz' ? 'rush' : (d.asg[0] === 'man' ? 'drop' : 'drop');
    return { id: d.id, lab: d.lab, team: 'O', side: 'def', x: d.x, y: d.y, kf, kind, name: d.asg[0] === 'man' ? null : null };
  });
  const tag = C.name + ' vs ' + R.name;
  const sc = {
    title: tag, tag, gun: true, generic: true, los: 40, view: { y0: -9, y1: 32 },
    t: [o.t0 != null ? o.t0 : -0.8, T1], rest: o.rest != null ? o.rest : -0.8,
    players: off.concat(defP),
    zones: (C.zones || []).map(z => Object.assign({ t0: 0.5, team: 'O' }, z)),
    ball: o.noThrow ? [] : [{ t: tThrow, pass: target, at: arrive }],
    rings: o.noThrow ? (o.rings || []) : [[tThrow - 0.45, T1, target]],
    beats: o.beats || [
      [-0.8, C.pre],
      [0, C.tell],
      [0.7, '<b>' + R.name + '.</b> ' + R.idea],
      [Math.max(0.9, tThrow - 0.05), '<b>' + V[3] + '.</b> Throw to ' + (ROLE_NAMES[target] || target) + '.']
    ],
    recon: o.recon != null ? o.recon : 'Simulated, not filmed: defenders follow simplified coverage rules (zone landmarks, man trail, quarters reads of #2). Ravens colors, generic players.',
    labels: o.labels || []
  };
  return sc;
}

/* ===================== PERSONNEL & FORMATIONS (static) ===================== */
function formation(pers) {
  const L = [];
  const add = (id, lab, x, y, name) => L.push(pB(id, lab, x, y, null, { kind: 'none', name }));
  OLN.forEach((n, i) => add(n, n, OLX[i], -0.9));
  const uc = pers !== '11' && pers !== '10';
  add('QB', 'QB', MID, uc ? -2.9 : -5, 'Lamar Jackson');
  if (pers === '11') { add('RB', 'RB', T(1.8), -5, 'Derrick Henry'); add('Y', 'Y', T(6.6), -1.1, 'Mark Andrews'); add('X', 'X', 7, -0.9, 'Rashod Bateman'); add('H', 'H', 15.6, -1.6, 'Zay Flowers'); add('Z', 'Z', 46.3, -0.9, "Ja'Kobi Lane"); }
  if (pers === '10') { add('RB', 'RB', T(1.8), -5, 'Derrick Henry'); add('X', 'X', 7, -0.9); add('H', 'H', 15.6, -1.6, 'Zay Flowers'); add('Y', 'S', 37.6, -1.6); add('Z', 'Z', 46.3, -0.9); }
  if (pers === '12') { add('RB', 'RB', MID, -7, 'Derrick Henry'); add('Y', 'Y', T(6.6), -1.1, 'Mark Andrews'); add('U', 'U', T(8.8), -2.2, 'Durham Smythe'); add('X', 'X', 9, -0.9, 'Zay Flowers'); add('Z', 'Z', 45, -0.9, 'Rashod Bateman'); }
  if (pers === '21') { add('F', 'FB', MID, -5.1); add('RB', 'RB', MID, -7.4, 'Derrick Henry'); add('Y', 'Y', T(6.6), -1.1, 'Mark Andrews'); add('X', 'X', 9, -0.9, 'Zay Flowers'); add('Z', 'Z', 45, -0.9, 'Rashod Bateman'); }
  if (pers === '22') { add('F', 'FB', MID, -5.1); add('RB', 'RB', MID, -7.4, 'Derrick Henry'); add('Y', 'Y', T(6.6), -1.1, 'Mark Andrews'); add('U', 'U', T(-6.6), -1.1, 'Durham Smythe'); add('Z', 'Z', 44, -0.9, 'Zay Flowers'); }
  if (pers === '13') { add('RB', 'RB', MID, -7, 'Derrick Henry'); add('Y', 'Y', T(6.6), -1.1, 'Mark Andrews'); add('U', 'U', T(-6.6), -1.1, 'Durham Smythe'); add('W', 'W', T(8.8), -2.2, 'Matthew Hibner'); add('X', 'X', 9, -0.9, 'Zay Flowers'); }
  return L;
}
function defense(pkg, pers) {
  const L = [];
  const add = (id, lab, x, y) => L.push(pOD(id, lab, x, y, null, { kind: 'none' }));
  const heavyR = ['12', '13', '21', '22'].includes(pers);
  const dl = [['E', T(-5.6)], ['T', T(-1.1)], ['T', T(3.3)], ['E', T(heavyR ? 8.6 : 6.4)]];
  dl.forEach(([l, x], i) => add('D' + i, l, x, 0.9));
  const wideL = pers === '22' ? null : 9, wideR = pers === '13' ? null : (pers === '22' ? 44 : (pers === '11' || pers === '10' ? 46.3 : 45));
  if (pkg === 'base') { add('S', 'S', T(10), 4.6); add('M', 'M', T(1), 5); add('W', 'W', T(-4), 4.6); add('LC', 'CB', wideL || T(-10.5), wideL ? 7 : 5); add('RC', 'CB', wideR || T(12.5), wideR ? 7 : 5); add('FS', 'FS', T(-3), 13); add('SS', 'SS', T(7), 10); }
  if (pkg === 'heavy') { add('S', 'S', T(10.8), 3.4); add('M', 'M', T(1), 4.4); add('W', 'W', T(-4), 4.2); add('LC', 'CB', T(-9.6), 4.8); add('RC', 'CB', wideR || T(12), 6); add('FS', 'FS', MID, 12.5); add('SS', 'SS', T(-9.4), 7.6); }
  if (pkg === 'nickel') { add('M', 'M', T(1.4), 5); add('W', 'W', T(-3.4), 4.8); add('N', 'N', 15.8, 5.2); add('LC', 'CB', 7.4, 7); add('RC', 'CB', 46, 7); add('FS', 'FS', T(-6.5), 13); add('SS', 'SS', T(7), 12.5); }
  if (pkg === 'bignickel') { add('M', 'M', T(1.2), 5); add('W', 'W', T(-3.2), 4.8); add('N', 'S', T(10.6), 4.6); add('LC', 'CB', 9.4, 7); add('RC', 'CB', 44.6, 7); add('FS', 'FS', T(-6.5), 12.5); add('SS', 'SS', T(5), 12); }
  if (pkg === 'dime') { add('M', 'M', MID, 5.4); add('N', 'N', 15.8, 5.2); add('D', 'D', 37.6, 5.2); add('LC', 'CB', 7.4, 7); add('RC', 'CB', 46, 7); add('FS', 'FS', T(-6.5), 13); add('SS', 'SS', T(6.5), 13); }
  return L;
}
const PERS = {
  '11': { d: 'nickel', label: '11', head: '11 personnel: 1 back, 1 tight end, 3 receivers', def: 'Nickel (5 defensive backs)', text: 'The default of the modern NFL, on the field for most snaps league-wide; the Ravens used it on 52% of plays in their first seven games, a low share by league standards. Three receivers spread the defense horizontally, so defenses answer with a fifth defensive back (the <span class="g" data-g="nickel">nickel</span>). Minter\'s Ravens often answer with a third safety instead of a third corner: <span class="g" data-g="big-nickel">big nickel</span>.' },
  '12': { d: 'base', label: '12', head: '12 personnel: 1 back, 2 tight ends, 2 receivers', def: 'Base (4 defensive backs) or big nickel', text: 'Two tight ends can block like linemen or run routes like receivers. If the defense stays in nickel, the offense runs; if it goes base, the offense spreads the tight ends out and throws against linebackers. Declan Doyle\'s 2025 Bears used 12 personnel on 34.4% of plays, sixth-most in the league; his 2026 Ravens used it on 32%.' },
  '21': { d: 'base', label: '21', head: '21 personnel: 2 backs, 1 tight end, 2 receivers', def: 'Base', text: 'A fullback adds a lead blocker and makes the defense commit a linebacker to the run. Classic I-formation football, now mostly used in short yardage and to build play-action.' },
  '22': { d: 'heavy', label: '22', head: '22 personnel: 2 backs, 2 tight ends, 1 receiver', def: 'Base or heavy (8 in the box)', text: 'Nine potential blockers. Over the five seasons through 2025 the Ravens used 22 personnel on 14.4% of snaps, almost twice as often as any other team (TSN). Under Doyle it has nearly vanished (about 1% with 21 personnel included): the extra blockers are now tight ends. It forces the defense to bring big bodies, which is precisely when play-action shots work.' },
  '13': { d: 'base', label: '13', head: '13 personnel: 1 back, 3 tight ends, 1 receiver', def: 'Base', text: 'Three tight ends: a short-yardage and goal-line look that can still pass. The Ravens used it on 14% of plays in their first seven games, an unusually high share. The 2026 room opened with Mark Andrews, Durham Smythe and rookies Matthew Hibner and Josh Cuevas; Smythe tore his Achilles in Week 4 against Tennessee, and the two rookies absorbed his snaps.' },
  '10': { d: 'dime', label: '10', head: '10 personnel: 1 back, 0 tight ends, 4 receivers', def: 'Dime (6 defensive backs)', text: 'Four receivers stretch the field sideline to sideline. Defenses answer with a sixth defensive back (<span class="g" data-g="dime">dime</span>). In Week 1 Minter played some form of dime on every third down of four yards or more.' },
};
function persScene(k) {
  const p = PERS[k];
  return { title: p.head, tag: k + ' personnel  ·  ' + p.def, static: true, generic: true, los: 40, view: { y0: -9, y1: 15 }, t: [0, 0], players: formation(k).concat(defense(p.d, k)) };
}

/* ===================== STATIC TEACHING BOARDS ===================== */
const sc_field = {
  generic: true,
  title: 'The field as a coach sees it', tag: 'Anatomy', static: true, los: 35, first: 45, view: { y0: -12, y1: 18 }, t: [0, 0], noSnap: true,
  players: formation('11'),
  extra: (g, X, Y) => {
    const box = sv('rect', { x: X(T(-7.5)), y: Y(7), width: 15 * S, height: 7 * S, style: 'fill:none;stroke:var(--rush);stroke-width:1.6;stroke-dasharray:6 4' }, g);
    const lab = (x, y, t, anchor) => { const e = sv('text', { x: X(x), y: Y(y), class: 'callout', 'text-anchor': anchor || 'middle' }, g); e.textContent = t; };
    lab(MID, 7.6, 'THE BOX (≈ 7 yds deep, tackle to tackle +)');
    lab(2.2, 0.6, 'LINE OF SCRIMMAGE', 'start'); lab(2.2, 10.6, 'LINE TO GAIN (1st down)', 'start');
    lab(HL, -10.6, 'LEFT HASH', 'end'); lab(HR, -10.6, 'RIGHT HASH', 'start');
    lab(MID, 15.6, '← 53⅓ yards sideline to sideline →');
  }
};
const sc_gaps = {
  title: 'Gaps and techniques: the language of the front', tag: 'Fronts', static: true, los: 40, view: { y0: -6, y1: 8.6, x0: 10, x1: 43.3 }, t: [0, 0], noSnap: true,
  players: [...OLN.map((n, i) => pB(n, n, OLX[i], -0.9, null, { kind: 'none' })), pB('Y', 'Y', T(6.6), -1.1, null, { kind: 'none' }), pB('QB', 'QB', MID, -2.9, null, { kind: 'none' })],
  extra: (g, X, Y) => {
    const gaps = [['D', T(-7.7)], ['C', T(-5.5)], ['B', T(-3.3)], ['A', T(-1.1)], ['A', T(1.1)], ['B', T(3.3)], ['C', T(5.5)], ['D', T(7.7)]];
    gaps.forEach(([l, x]) => { sv('line', { x1: X(x), x2: X(x), y1: Y(0.3), y2: Y(2.2), style: 'stroke:var(--purple);stroke-width:1.2;stroke-dasharray:2 2' }, g); const t = sv('text', { x: X(x), y: Y(2.9), class: 'gap-lbl', 'text-anchor': 'middle' }, g); t.textContent = l; });
    const tech = [['0', MID], ['1', T(-0.9)], ['2i', T(1.5)], ['2', T(2.2)], ['3', T(3.1)], ['4i', T(3.7)], ['4', T(4.4)], ['5', T(5.3)], ['7', T(5.9)], ['6', T(6.6)], ['9', T(7.6)]];
    tech.forEach(([l, x], i) => { const yy = 4.2 + (i % 3) * 1.15; const t = sv('text', { x: X(x), y: Y(yy), class: 'tech-lbl', 'text-anchor': 'middle' }, g); t.textContent = l; sv('line', { x1: X(x), x2: X(x), y1: Y(0.2), y2: Y(yy - 0.6), style: 'stroke:var(--muted);stroke-width:.6;opacity:.6' }, g); });
    const a = sv('text', { x: X(10.4), y: Y(5.35), class: 'callout', 'text-anchor': 'start' }, g); a.textContent = 'Techniques →';
    const b = sv('text', { x: X(10.4), y: Y(2.9), class: 'callout', 'text-anchor': 'start' }, g); b.textContent = 'Gaps';
  }
};
const sc_tree = {
  title: 'The route tree', tag: 'Routes', static: true, los: 40, view: { y0: -3, y1: 24, x0: 14, x1: FW }, t: [0, 0], noSnap: true,
  players: [pB('Z', 'Z', 36, -0.9, null, { kind: 'none' })],
  extra: (g, X, Y) => {
    const R = [
      ['1 Flat', [[36, 1.5], [44.5, 2.8]]], ['2 Slant', [[36, 2.5], [29, 8]]], ['3 Comeback', [[36, 15], [38.6, 12.6]]], ['4 Curl', [[36, 12], [34.4, 10.4]]],
      ['5 Out', [[36, 9.5], [43.6, 9.5]]], ['6 Dig', [[36, 12.5], [24, 12.5]]], ['7 Corner', [[36, 11], [43.4, 18]]], ['8 Post', [[36, 11], [28, 20.4]]], ['9 Go', [[36, 22]]]];
    R.forEach(([lab, pts]) => {
      const all = [[36, -0.9]].concat(pts);
      sv('polyline', { points: all.map(p => X(p[0]) + ',' + Y(p[1])).join(' '), class: 'pth B route', style: 'opacity:.85' }, g);
      const e = pts[pts.length - 1], dx = e[0] - 36;
      const t = sv('text', { x: X(e[0] + (dx < -0.5 ? -0.6 : dx > 0.5 ? 0.6 : 0)), y: Y(e[1] + (Math.abs(dx) <= 0.5 ? 1.2 : 0)), class: 'callout', 'text-anchor': dx < -0.5 ? 'end' : (dx > 0.5 ? 'start' : 'middle'), 'dominant-baseline': 'central' }, g); t.textContent = lab;
    });
  }
};
/* ===================== QUIZ SCENES ===================== */
const sc_q_motion = {
  generic: true,
  title: 'Motion read', gun: true, los: 40, view: { y0: -9, y1: 20 }, t: [-2.4, 2.4], rest: -0.2, passPlay: true,
  players: [
    ...offense2x2('B', { X: [[7, 10], [11, 15]], Y: [[37.4, 6], [41, 7]], Z: [[46.3, 12], [50, 18]], RB: [[T(3.6), -3.4]], QB: [[MID, -6.2, 0.6]] }).map(p => p.id === 'H' ? Object.assign(p, { pre: { t0: -2.2, pts: [[T(-3), -2.6], [T(5.2), -2.6], [33.2, -2.2]], v: 7.2 }, m: [[31, 3], [20, 5.5], [12, 6]], name: 'Zay Flowers (motion)' }) : p),
    pOD('NB', 'N', 16.2, 5, [[30.6, 4.4], [20.6, 6.4], [13, 6.8]], { v: 7.4, d: 0.2, pre: { t0: -2.0, pts: [[22, 5], [32.6, 5]], v: 6.8 }, name: 'Nickel: travels with the motion' }),
    pOD('LE', 'E', T(-7.2), 0.9, [[T(-6), -1.9]], { kind: 'rush', v: 2.4 }), pOD('DT', 'T', T(-1.1), 0.9, [[T(-1.2), -2]], { kind: 'rush', v: 2.4 }),
    pOD('NT', 'T', T(3.3), 0.9, [[T(3), -2]], { kind: 'rush', v: 2.4 }), pOD('RE', 'E', T(7.6), 0.9, [[T(6.4), -2]], { kind: 'rush', v: 2.4 }),
    pOD('LC', 'CB', 7, 1.8, [[7.6, 9], [11.6, 14.6]], { v: 7.6 }), pOD('RC', 'CB', 46.3, 1.8, [[46.6, 11], [49.4, 17]], { v: 7.6 }),
    pOD('SS', 'SS', 37.2, 5.6, [[38, 6.4], [40.4, 7.4]], { v: 6 }), pOD('FS', 'FS', MID, 14.5, [[MID, 16]], { v: 3 }),
    pOD('M', 'M', T(-1.4), 5, [[T(2.6), 3.4]], { v: 5 }), pOD('W', 'W', T(3.4), 6, [[T(1), 8.6]], { v: 4 }),
  ],
  rings: [[-2.0, -0.1, 'NB']],
  beats: [
    [-2.4, 'The slot receiver motions from the left side across the formation.'],
    [-1.4, 'The nickel defender runs with him, all the way across.'],
    [0, 'At the snap the nickel trails him back across the field: man coverage, with one deep safety. Cover 1.']
  ]
};
const sc_q_box = {
  generic: true,
  title: 'Count the box', tag: 'Pre-snap', static: false, los: 40, first: 50, view: { y0: -9, y1: 32 }, t: [-0.5, 3.6], rest: -0.5, end: 3.4,
  players: [
    ...OL5('B', [[[T(-3.6), 0.3]], [[T(-1.2), 0.5]], [[T(1), 0.5]], [[T(3.2), 0.5]], [[T(5.4), 0.2]]], { v: 3.2 }),
    pB('QB', 'QB', MID, -2.9, [[T(1.6), -3.6, 0.6], [T(1), -6.6], [T(0.2), -8, 2.0], [T(0.2), -7.6]], { kind: 'drop', v: 5, name: 'Lamar Jackson' }),
    pB('RB', 'RB', MID, -7, [[T(2.6), -4.4], [T(4.2), -2.6]], { kind: 'fake', v: 6, name: 'Derrick Henry' }),
    pB('Y', 'Y', T(6.6), -1.1, [[T(8.4), 0.4]], { kind: 'block', v: 4 }), pB('U', 'U', T(-6.6), -1.1, [[T(-7.4), 0.2]], { kind: 'block', v: 4 }),
    pB('X', 'X', 9, -0.9, [[9.4, 12], [16, 22]], { v: 8.2, name: 'Zay Flowers' }), pB('Z', 'Z', 45, -0.9, [[45, 14], [47.4, 21]], { v: 8, name: 'Rashod Bateman' }),
    pOD('E1', 'E', T(-8.4), 0.9, [[T(-6.6), -0.6]], { kind: 'rush', v: 3 }), pOD('T1', 'T', T(-1.1), 0.9, [[T(-0.6), 0.2]], { kind: 'rush', v: 3 }),
    pOD('T2', 'T', T(3.3), 0.9, [[T(3.4), 0.4]], { kind: 'rush', v: 3 }), pOD('E2', 'E', T(8.4), 0.9, [[T(7.6), -0.4]], { kind: 'rush', v: 3 }),
    pOD('W', 'W', T(-3.4), 4.4, [[T(-2.4), 2.6], [T(-3.6), 6.4]], { v: 4 }), pOD('M', 'M', T(1), 4.6, [[T(2), 2.8], [T(1), 6.6]], { v: 4 }),
    pOD('S', 'S', T(9.4), 3.6, [[T(9.8), 2.2]], { v: 3 }), pOD('SS', 'SS', T(-8.6), 6.6, [[T(-7.8), 3.4], [T(-8.4), 6]], { v: 4 }),
    pOD('LC', 'CB', 9, 2, [[9.6, 9], [14.4, 19.4]], { v: 7.6 }), pOD('RC', 'CB', 45, 2, [[45.4, 12], [46.8, 19]], { v: 7.6 }),
    pOD('FS', 'FS', MID, 14, [[T(-1), 16.4], [T(-4), 19]], { v: 5 }),
  ],
  ball: [{ t: 2.0, pass: 'X', at: 2.75 }],
  extra: (g, X, Y) => { sv('rect', { x: X(T(-10.4)), y: Y(7.4), width: 20.8 * S, height: 7.4 * S, style: 'fill:none;stroke:var(--rush);stroke-width:1.4;stroke-dasharray:6 4' }, g); },
  rings: [[2.0, 3.6, 'X']],
  beats: [[-0.5, 'Eight defenders inside the dashed box against seven blockers (five linemen, two tight ends). One safety deep, both corners pressed.'], [0, 'Play-action. The run fake pulls the linebackers and the rolled-down safety forward.'], [2.0, 'Flowers is one-on-one outside with a single safety who cannot cover both sides. Shot.']]
};
const sc_q_mug = {
  generic: true,
  title: 'Mugged A-gaps', gun: true, los: 40, view: { y0: -9, y1: 18 }, t: [-0.6, 2.4], rest: -0.6, passPlay: true,
  players: [
    ...offense2x2('O', { X: [[7, 6], [6, 5.6]], H: [[16, 5], [21, 6.4]], Y: [[37.4, 5], [32.4, 6.2]], Z: [[46.3, 10], [44, 13]], RB: [[T(-1.6), -3.4]], QB: [[MID, -6.2, 0.6]] }),
    pBD('RS', 'RS', T(-1.1), 1.4, [[T(-1.4), -2.2]], { kind: 'rush', v: 5, name: 'Roquan Smith (rushes)' }),
    pBD('TB', 'TB', T(1.1), 1.4, [[T(1.6), 4], [T(4.6), 6.4]], { v: 5, name: 'Teddye Buchanan (drops)' }),
    pBD('TH', 'TH', T(7.6), 1, [[T(6), -1.8], [T(4.6), -3]], { kind: 'rush', v: 3.6, name: 'Trey Hendrickson' }),
    pBD('TR', 'TR', T(-7.6), 1, [[T(-8.4), 3], [T(-10), 5.4]], { v: 4.6, name: 'Tavius Robinson (drops)' }),
    pBD('NM', 'NM', T(-3.3), 0.9, [[T(-3.2), -2.2]], { kind: 'rush', v: 3, name: 'Nnamdi Madubuike' }),
    pBD('KH', 'KH', T(5.6), 6, [[T(4.4), 1.4], [T(3.2), -2]], { kind: 'rush', v: 6, name: 'Kyle Hamilton (blitzes)' }),
    pBD('JH', 'JH', 16.4, 5, [[18, 7.4]], { v: 4, name: 'Jaylinn Hawkins' }),
    pBD('NW', 'NW', 7.4, 7, [[8, 16]], { v: 6 }), pBD('MH', 'MH', 46, 7, [[45.4, 16]], { v: 6 }),
    pBD('MS', 'MS', MID, 13, [[MID, 16]], { v: 4, name: 'Malaki Starks' }),
    pBD('X1', 'S', 37, 6, [[39.4, 7.6]], { v: 4 }),
  ],
  rings: [[-0.6, 0.1, 'RS'], [-0.6, 0.1, 'TB'], [0.3, 1.4, 'TR'], [0.3, 1.4, 'TB'], [0.3, 1.4, 'KH']],
  beats: [[-0.6, 'Two linebackers stand in the A-gaps, on either side of the center. The center cannot block both; the protection has to commit before the snap.'], [0, 'At the snap only one of the two linebackers rushes; the other drops. An edge rusher drops too, while a safety blitzes from depth.'], [0.9, 'Four rushers again, but from places the protection did not plan for. This is how a defense "creeps" pressure without sending extra men.']]
};

/* ===================== DEFENSIVE FRONTS ===================== */
const GAPX = { 'A-L': T(-1.1), 'A-R': T(1.1), 'B-L': T(-3.3), 'B-R': T(3.3), 'C-L': T(-5.5), 'C-R': T(5.5), 'D-R': T(7.7), 'D-L': T(-7.7) };
function frontOffense(team, gun) {
  const P = gun ? pO : pB;
  const L = OLN.map((n, i) => P(n, n, OLX[i], -0.9, null, { kind: 'none' }));
  L.push(P('QB', 'QB', MID, gun ? -5 : -2.9, null, { kind: 'none' }));
  L.push(P('RB', 'RB', gun ? T(1.8) : MID, gun ? -5 : -7, null, { kind: 'none' }));
  L.push(P('Y', 'Y', T(6.6), -1.1, null, { kind: 'none' }));
  L.push(P('X', 'X', 9, -0.9, null, { kind: 'none' }));
  L.push(P('H', 'H', 15.6, -1.6, null, { kind: 'none' }));
  L.push(P('Z', 'Z', 45, -0.9, null, { kind: 'none' }));
  return L.map(p => Object.assign(p, { team }));
}
/* D rows: [id, label, x, y, fit, technique, name]. fit: gap key(s) joined by '+', 'rush', or '' */
function frontScene(f) {
  const dteam = f.ravens ? 'B' : 'O', oteam = f.ravens ? 'O' : 'B';
  const def = f.D.map(r => [r[0], r[1], r[2], r[3] < 1.5 ? 2.1 : r[3] + 0.8, r[4], r[5], r[6]]).map(r => Object.assign(f.ravens ? pBD(r[0], r[1], r[2], r[3], null, { kind: 'none' }) : pOD(r[0], r[1], r[2], r[3], null, { kind: 'none' }), { fit: r[4], tech: r[5], name: r[6] || undefined }));
  return {
    title: f.title, tag: f.tag, static: true, generic: true, los: 40, t: [0, 0], view: { y0: -8.5, y1: 16.5 }, mobileView: { x0: 13, x1: 41.5 }, side: f.side,
    players: frontOffense(oteam, f.gun).concat(def),
    extra: (g, X, Y) => {
      const col = f.ravens ? 'var(--purple)' : 'var(--opp)';
      // gap letters along the line of scrimmage
      Object.keys(GAPX).forEach(k => { if (k === 'D-L') return; const t = sv('text', { x: X(GAPX[k]), y: Y(0.55), class: 'gap-lbl', 'text-anchor': 'middle', 'dominant-baseline': 'central', style: 'font-size:9px;opacity:.85' }, g); t.textContent = k[0]; });
      sv('text', { x: X(T(-9.2)), y: Y(0.55), class: 'tech-lbl', 'text-anchor': 'end', 'dominant-baseline': 'central', style: 'font-size:8.5px' }, g).textContent = 'gaps';
      // fits: dashed line from each defender to the gap(s) he owns
      def.forEach(d => {
        if (!d.fit) return;
        if (d.fit === 'rush') { sv('line', { x1: X(d.x), y1: Y(d.y), x2: X(d.x + (MID - d.x) * 0.35), y2: Y(-2.6), style: 'stroke:var(--rush);stroke-width:1.6;stroke-dasharray:4 3' }, g); return; }
        d.fit.split('+').forEach(k => { const gx = GAPX[k]; if (gx == null) return; sv('line', { x1: X(d.x), y1: Y(d.y), x2: X(gx), y2: Y(1.05), style: `stroke:${col};stroke-width:1.5;stroke-dasharray:3 3;opacity:.85` }, g); sv('circle', { cx: X(gx), cy: Y(1.05), r: 2.4, style: `fill:${col}` }, g); });
      });
      // technique numbers under the down linemen and edge players
      def.forEach(d => { if (d.tech == null) return; const t = sv('text', { x: X(d.x), y: Y(d.y + 1.75), class: 'tech-lbl', 'text-anchor': 'middle', style: 'font-size:9px;font-weight:600;fill:var(--ink-2)' }, g); t.textContent = d.tech; });
      // uncovered offensive linemen: nobody aligned on them within the front
      OLX.forEach((ox, i) => {
        const covered = def.some(d => d.y < 2.6 && Math.abs(d.x - ox) < 1.15);
        if (!covered) { sv('circle', { cx: X(ox), cy: Y(-0.9), r: 15.5, style: 'fill:none;stroke:var(--gold-bright);stroke-width:2;stroke-dasharray:3 2' }, g); }
      });
    }
  };
}
const FRONTS = [
  { key: 'over', label: 'Over (4-3)', title: '4-3 Over: the 3-technique to the tight end', tag: 'Even front · 4 down linemen',
    D: [['E1', 'E', T(-5.3), 0.9, 'C-L', '5'], ['N', 'N', T(-0.9), 0.9, 'A-L', '1'], ['T3', 'T', T(3.1), 0.9, 'B-R', '3'], ['E2', 'E', T(7.7), 0.9, 'D-R', '9'],
      ['W', 'W', T(-3.3), 4.6, 'B-L'], ['M', 'M', T(0.8), 4.9, 'A-R'], ['S', 'S', T(6.6), 4.4, 'C-R'],
      ['LC', 'CB', 9.4, 6.5, ''], ['RC', 'CB', 45, 6.5, ''], ['FS', 'FS', T(-2), 13, ''], ['SS', 'SS', 15.8, 7, '']],
    side: '<h6>The classic 4-3</h6><p class="why"><b>Alignment.</b> Four down linemen: a 5-technique end on the weak side, a nose shaded on the center (1), a 3-technique on the strong-side guard and a 9-technique end outside the tight end. Three linebackers behind them.</p><p class="why"><b>Logic.</b> One defender per gap. The 3-technique, the front\'s best pass rusher, is aligned over (toward) the strength, where he faces single blocks.</p><p class="why"><b>How offenses attack it.</b> Run weak, away from the 3-technique, where the line is lighter, and double-team the 3-technique. Here the weak-side guard and the strong-side tackle are uncovered (gold rings) and free to climb to linebackers.</p><p class="why"><b>Where you will see it.</b> Rarely in pure form in the NFL: it needs three linebackers on the field, which most defenses play on a small fraction of snaps.</p>' },
  { key: 'under', label: 'Under (4-3)', title: '4-3 Under: the line shifts away from the tight end', tag: 'Even front · 4 down linemen',
    D: [['L', 'E', T(-5.3), 0.9, 'C-L', '5'], ['T3', 'T', T(-3.1), 0.9, 'B-L', '3'], ['N', 'N', T(0.9), 0.9, 'A-R', '1'], ['E', 'E', T(5.3), 0.9, 'C-R', '5'],
      ['S', 'S', T(7.7), 1.0, 'D-R', '9'], ['W', 'W', T(-1), 4.6, 'A-L'], ['M', 'M', T(2.6), 4.8, 'B-R'],
      ['LC', 'CB', 9.4, 6.5, ''], ['RC', 'CB', 45, 6.5, ''], ['FS', 'FS', MID, 13.5, ''], ['SS', 'SS', T(-8.4), 8, '']],
    side: '<h6>Under: strength to the weak side</h6><p class="why"><b>Alignment.</b> The nose shades the center toward the tight end, the 3-technique moves to the weak side, a 5-technique sits on the strong tackle and the strong-side linebacker walks up onto the line outside the tight end.</p><p class="why"><b>Logic.</b> The strong side gets a big body on every lineman (5-technique, Sam on the line), and the quick 3-technique attacks the weak guard. It is Pete Carroll\'s and the Seattle-tree staple.</p><p class="why"><b>How offenses attack it.</b> Motion or shifts that move the tight end, flipping the strength after the defense has set; runs at the bubble between the 5-technique and the Sam.</p><p class="why"><b>Read it.</b> Is the 3-technique on the tight end side (over) or away from it (under)?</p>' },
  { key: 'odd', label: 'Odd (3-4)', title: '3-4 odd front: a nose over the center', tag: 'Odd front · 3 down linemen',
    D: [['O1', 'OLB', T(-7), 1.0, 'C-L', ''], ['E1', 'E', T(-5.3), 0.9, 'B-L+C-L', '5'], ['N', 'N', MID, 0.9, 'A-L+A-R', '0'], ['E2', 'E', T(5.3), 0.9, 'B-R+C-R', '5'], ['O2', 'OLB', T(7.7), 1.0, 'D-R', '9'],
      ['I1', 'ILB', T(-2.2), 4.7, ''], ['I2', 'ILB', T(2.2), 4.7, ''],
      ['LC', 'CB', 9.4, 6.5, ''], ['RC', 'CB', 45, 6.5, ''], ['FS', 'FS', T(-4), 13, ''], ['SS', 'SS', 15.8, 7.4, '']],
    side: '<h6>The odd front</h6><p class="why"><b>Alignment.</b> A nose head-up on the center (0-technique), two ends on the tackles (5-technique), two outside linebackers on the edges, two inside linebackers stacked behind the guards.</p><p class="why"><b>Logic.</b> The linemen <span class="g" data-g="two-gap">two-gap</span>: they control the blocker in front of them and can play either side of him, so the inside linebackers are free to run to the ball.</p><p class="why"><b>The catch.</b> Both guards are uncovered (gold rings). If they reach the inside linebackers cleanly, the front breaks. A strong nose must survive double-teams.</p><p class="why"><b>How offenses attack it.</b> Inside zone and duo: double-team the nose and the ends, then climb. See the animated example below.</p>' },
  { key: 'tite', label: 'Tite / Mint', title: 'Tite front: 4i-0-4i, the inside gaps closed', tag: 'Odd front · Fangio tree',
    D: [['O1', 'OLB', T(-6.8), 1.0, 'C-L', '5w'], ['E1', 'E', T(-3.8), 0.9, 'B-L', '4i'], ['N', 'N', MID, 0.9, 'A-L+A-R', '0'], ['E2', 'E', T(3.8), 0.9, 'B-R', '4i'], ['O2', 'OLB', T(7.7), 1.0, 'D-R', '9'],
      ['W', 'W', T(-2), 5.2, ''], ['M', 'M', T(3.2), 5.2, 'C-R'],
      ['LC', 'CB', 9.4, 7, ''], ['RC', 'CB', 45, 7, ''], ['FS', 'S', T(-6.4), 12.5, ''], ['SS', 'S', T(6.4), 12.5, '']],
    side: '<h6>Tite (also called mint)</h6><p class="why"><b>Alignment.</b> A nose on the center and two ends on the inside shoulders of the tackles (4i). The center and both tackles are covered; both guards are uncovered but have a lineman on each side of them, so they struggle to climb cleanly.</p><p class="why"><b>Logic.</b> The A and B gaps, where zone runs and duo want to hit, are filled by three big bodies. Runs are pushed outside, toward edge players and safeties who fill from depth. That lets the defense keep <b>two safeties high</b> against the run, the foundation of Vic Fangio\'s defense and its descendants, including Jesse Minter\'s.</p><p class="why"><b>How offenses attack it.</b> Outside zone, toss and perimeter runs; spread formations that pull the linebackers out of the box.</p><p class="why"><b>Context.</b> Minter\'s 2025 Chargers played base personnel on only 18% of snaps (sixth-lowest) and a light box on 45% (fourth-highest), per The Banner: the two-high, light-box trade this front is built for.</p>' },
  { key: 'bear', label: 'Bear', title: 'Bear front: the center and both guards covered', tag: 'Odd-family front · 8-man box',
    D: [['E1', 'E', T(-6.2), 0.9, 'C-L', '5w'], ['T1', 'T', T(-3.1), 0.9, 'B-L', '3'], ['N', 'N', MID, 0.9, 'A-L+A-R', '0'], ['T2', 'T', T(3.1), 0.9, 'B-R', '3'], ['E2', 'E', T(7.7), 1.0, 'D-R', '9'],
      ['S', 'S', T(5.5), 4.0, 'C-R'], ['M', 'M', T(-1.4), 5, ''], ['SS', 'SS', T(-7.6), 5.2, ''],
      ['LC', 'CB', 9.2, 2, ''], ['RC', 'CB', 45, 2, ''], ['FS', 'FS', MID, 14, '']],
    side: '<h6>Bear (the "46")</h6><p class="why"><b>Alignment.</b> Three interior linemen cover the center and both guards (3-0-3), with ends outside. A strong safety joins the box; one deep safety, corners pressed.</p><p class="why"><b>Logic.</b> No interior lineman is uncovered, so nobody can climb to the linebackers. Buddy Ryan built the 1985 Bears around it; it is still the standard goal-line and short-yardage answer.</p><p class="why"><b>How offenses attack it.</b> Throw. Eight defenders near the line means single-high coverage with pressed corners: quick throws, play-action shots and the tackles left on islands against wide edge rushers.</p>' },
  { key: 'wide9', label: 'Wide-9 nickel', title: 'Nickel 4-2-5 with wide-9 ends', tag: 'Even front · 6-man box',
    D: [['E1', 'E', T(-7.6), 0.9, 'C-L', 'w9'], ['N', 'N', T(-0.9), 0.9, 'A-L', '1'], ['T3', 'T', T(3.1), 0.9, 'B-R', '3'], ['E2', 'E', T(9.6), 0.9, 'D-R', 'w9'],
      ['W', 'W', T(-3.2), 5, 'B-L'], ['M', 'M', T(1.4), 5, 'A-R'], ['NB', 'N', 16.4, 5, ''],
      ['LC', 'CB', 9.4, 7, ''], ['RC', 'CB', 45, 7, ''], ['FS', 'S', T(-6.4), 12.5, ''], ['SS', 'S', T(8.4), 9, 'C-R']],
    side: '<h6>Nickel with wide-9 ends</h6><p class="why"><b>Alignment.</b> The standard modern nickel: four linemen, two linebackers, a nickel back over the slot. Here the ends line up very wide ("wide-9"), well outside the tackles and tight end.</p><p class="why"><b>Logic.</b> Width gives the edge rushers a running start and a clear path around the tackle. It is a pass-rush-first front for passing downs.</p><p class="why"><b>The catch.</b> Wide ends open a large C gap. A safety or linebacker has to fill it from depth (dashed line from the strong safety).</p><p class="why"><b>How offenses attack it.</b> Runs inside the end, traps and gap schemes with pullers, and screens behind the rushers.</p>' },
  { key: 'bignickel', ravens: true, label: 'Ravens big nickel', title: 'Ravens big nickel (2-4-5): three safeties, two down linemen', tag: 'Ravens · primary package', gun: false,
    D: [['TH', 'TH', T(-6.6), 1.0, 'C-L', '5w', 'Trey Hendrickson (OLB)'], ['NM', 'NM', T(-3.1), 0.9, 'B-L', '3', 'Nnamdi Madubuike'], ['TJ', 'TJ', T(0.9), 0.9, 'A-R', '1', 'Travis Jones'], ['TR', 'TR', T(7.7), 1.0, 'D-R', '9', 'Tavius Robinson (OLB)'],
      ['TB', 'TB', T(-1.1), 4.7, 'A-L', '', 'Teddye Buchanan'], ['RS', 'RS', T(2.8), 4.9, 'B-R', '', 'Roquan Smith'], ['KH', 'KH', T(10.8), 4.6, 'C-R', '', 'Kyle Hamilton (overhang)'],
      ['NW', 'NW', 9.4, 7, '', '', 'Nate Wiggins'], ['MH', 'MH', 45, 7, '', '', 'Marlon Humphrey'], ['JH', 'JH', T(-6.4), 12.5, '', '', 'Jaylinn Hawkins'], ['MS', 'MS', T(6.4), 12.5, '', '', 'Malaki Starks']],
    side: '<h6>The Ravens\' base, in practice</h6><p class="why"><b>Personnel.</b> Two interior linemen, two outside linebackers who stand up on the edges, two inside linebackers, two corners and three safeties. In Week 1 the Ravens used it on 28 of 53 snaps; base 3-4 personnel appeared twice.</p><p class="why"><b>Why it looks like a four-man front.</b> With the outside linebackers on the line, it plays like a 4-2-5 even front. "3-4" and "4-3" describe who is on the field; the front describes where they stand.</p><p class="why"><b>The trade.</b> The box holds six; Hamilton is the seventh run defender, entering from outside as the force player while two safeties stay deep. Through seven games the Ravens played a light box on 55% of snaps, second-most in the league.</p><p class="recon">Alignment illustrative; personnel counts from Filmstudy Baltimore, box rate from Sharp Football Analysis. Madubuike is shown as the current 3-technique: he missed Weeks 1–2 after April 2026 neck surgery and debuted in Week 3 against Dallas, so Broderick Washington and Calais Campbell took the interior snaps in the opener.</p>' },
  { key: 'rushdime', ravens: true, gun: true, label: 'Ravens rush dime', title: 'Ravens rush dime: four pass rushers, six defensive backs', tag: 'Ravens · obvious passing downs',
    D: [['TH', 'TH', T(-7.2), 1.0, 'rush', 'w', 'Trey Hendrickson'], ['CC', 'CC', T(-3.1), 0.9, 'rush', '3', 'Calais Campbell'], ['TR', 'TR', T(2.0), 0.9, 'rush', '2i', 'Tavius Robinson (kicked inside)'], ['MG', 'MG', T(7.4), 1.0, 'rush', 'w', 'Mike Green'],
      ['RS', 'RS', T(0.4), 5.4, '', '', 'Roquan Smith'], ['KH', 'KH', 16.4, 5.4, '', '', 'Kyle Hamilton'], ['KM', 'KM', 38.6, 5.4, '', '', 'Keyon Martin'],
      ['NW', 'NW', 8.8, 7, '', '', 'Nate Wiggins'], ['MH', 'MH', 45.6, 7, '', '', 'Marlon Humphrey'], ['JH', 'JH', T(-6.4), 13, '', '', 'Jaylinn Hawkins'], ['MS', 'MS', T(6.4), 13, '', '', 'Malaki Starks']],
    side: '<h6>Rush dime</h6><p class="why"><b>Personnel.</b> One true defensive lineman (Calais Campbell), three outside linebackers, one inside linebacker, six defensive backs. In Week 1 Minter used it only on extreme passing downs (third-and-7 or longer, fourth-and-11): five snaps, three net yards.</p><p class="why"><b>Logic.</b> Replace run defenders with speed. Tavius Robinson kicks inside to rush from a tackle spot, so all four rushers are edge players, and six defensive backs cover. The red lines are rush lanes rather than run gaps.</p><p class="why"><b>How offenses attack it.</b> Run the ball or throw screens and draws: there is one linebacker and one interior lineman to stop them. That is why it appears only when a run would not move the chains.</p><p class="recon">Package and players from Filmstudy Baltimore\'s Week 1 notes; alignment illustrative.</p>' },
];
const FRONT_SCENES = FRONTS.map(f => ({ label: f.label, scene: frontScene(f) }));

/* ---------- attacking an odd front: double-team and climb ---------- */
const sc_odd_iz = {
  generic: true,
  title: 'Inside zone against an odd front: double-team, then climb', src: 'Concept illustration · Ravens offense', tag: 'Attacking a front',
  los: 40, first: 50, view: { y0: -9, y1: 15, x0: 7.5, x1: 46 }, t: [-0.5, 2.4], rest: -0.5, end: 2.15,
  players: [
    pB('LT', 'LT', OLX[0], -0.9, [[T(-5), 0.3]], { kind: 'block', v: 3, on: 'E1' }),
    pB('LG', 'LG', OLX[1], -0.9, [[T(-1.3), 0.1], { w: 0.35 }, [T(-1.9), 2.6], [T(-1.6), 3.6]], { kind: 'block', v: 3.6, on: 'I1' }),
    pB('C', 'C', OLX[2], -0.9, [[T(0.4), 0.1], [T(0.7), 0.9]], { kind: 'block', v: 2.6, on: 'N' }),
    pB('RG', 'RG', OLX[3], -0.9, [[T(2.6), 1.8], [T(2.4), 3.4]], { kind: 'block', v: 4.2, on: 'I2' }),
    pB('RT', 'RT', OLX[4], -0.9, [[T(4.9), 0.2]], { kind: 'block', v: 3, on: 'E2' }),
    pB('Y', 'Y', T(6.6), -1.1, [[T(7.4), 0.3]], { kind: 'block', v: 3, on: 'O2' }),
    pB('QB', 'QB', MID, -2.9, [[T(1.2), -4.2, 0.55], [T(0.6), -5.6]], { kind: 'none', name: 'Lamar Jackson' }),
    pB('RB', 'RB', MID, -7, [[T(1.4), -5], [T(2.4), -2.2, 0.75], [T(2.1), 0.6], [T(1.7), 4.2], [T(1.9), 7.4]], { kind: 'run', v: 6.8, name: 'Derrick Henry' }),
    pB('X', 'X', 10.5, -0.9, [[10.9, 5], [11.4, 6.4]], { kind: 'block', v: 5, on: 'LC' }),
    pB('H', 'H', 15.6, -1.6, [[15.8, 3.4]], { kind: 'block', v: 5, on: 'SL' }),
    pB('Z', 'Z', 43, -0.9, [[42.8, 5]], { kind: 'block', v: 5, on: 'RC' }),
    pOD('O1', 'OLB', T(-7), 1.0, [[T(-6), -0.6], [T(-4.4), -2.2]], { kind: 'rush', v: 3.6 }),
    pOD('E1', 'E', T(-5.3), 0.9, [[T(-4.8), 0.9]], { kind: 'rush', v: 2.4 }),
    pOD('N', 'N', MID, 0.9, [[T(0.2), 1.6]], { kind: 'rush', v: 1.6 }),
    pOD('E2', 'E', T(5.3), 0.9, [[T(5.0), 1.0]], { kind: 'rush', v: 2.4 }),
    pOD('O2', 'OLB', T(7.7), 1.0, [[T(7.6), 1.1]], { kind: 'rush', v: 2.4 }),
    pOD('I1', 'ILB', T(-2.2), 4.7, [[T(-0.8), 4.0], { w: 0.5 }], { v: 4 }),
    pOD('I2', 'ILB', T(2.2), 4.7, [[T(3.2), 3.8], { w: 0.4 }], { v: 4 }),
    pOD('LC', 'CB', 10.9, 6.5, [[11.1, 7.2]], { v: 3 }),
    pOD('RC', 'CB', 43, 6.5, [[42.8, 7]], { v: 3 }),
    pOD('SL', 'S', 15.8, 7.4, [[17, 7.6], { w: 0.3 }], { v: 4 }),
    pOD('FS', 'FS', T(-4), 13, [[T(-1), 11.6], [T(1.2), 10.2]], { v: 5.5 }),
  ],
  ball: [{ t: 0.6, pass: 'RB', at: 0.66 }],
  rings: [[0, 0.7, 'N'], [0.6, 1.4, 'LG'], [0.3, 1.2, 'RG'], [1.3, 2.4, 'RB']],
  beats: [
    [-0.5, 'Odd front: the nose is head-up on the center, ends on both tackles. The two guards are uncovered and the inside linebackers sit right behind them.'],
    [0, 'Inside zone. The center and the left guard double-team the nose, the most important defender in an odd front: if he holds both A gaps, the linebackers run free.'],
    [0.45, 'The right guard has nobody on him, so he climbs straight to the inside linebacker. The back presses toward the right guard\'s outside hip.'],
    [0.8, 'Once the nose is moved, the left guard comes off the double-team and climbs to the second linebacker. Coaches call this "deuce to the backer."'],
    [1.3, 'Both linebackers are blocked, the ends are sealed, and the back is through the line before a safety can fill from depth.'],
  ],
  recon: 'Concept illustration. Not a specific 2026 play.'
};
