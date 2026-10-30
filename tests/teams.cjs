// Colour validator: within each scene, the offense must be one team and the defense the other
// (Ravens purple vs opponent slate). Run: node tests/teams.cjs
const { SOURCE } = require('./_load.cjs');
eval(SOURCE + `
const list={sc_boot,sc_arc,sc_choice,sc_oz,sc_screen,sc_rpo,sc_disguise,sc_pressure,sc_fit,sc_rush3,sc_q_motion,sc_q_box,sc_q_mug,sc_field,sc_gaps,sc_tree,prog_check:progScene('check'),prog_scramble:progScene('scramble')};
['run','pass','pa','screen','gap'].forEach(k=>list['line-'+k]=lineScene(k));
for(const k in PERS) list['pers'+k]=persScene(k);
for(const c in COVS) list['lab'+c]=buildLab(c,'smash');
for(const n in list){const sc=list[n]; const o=new Set(sc.players.filter(p=>p.side!=='def').map(p=>p.team||'B')), d=new Set(sc.players.filter(p=>p.side==='def').map(p=>p.team||'B'));
 const bad=[...o].some(t=>d.has(t))||o.size>1||d.size>1; console.log((bad?'BAD ':'ok  ')+n.padEnd(14),'off',[...o].join(),'def',[...d].join());}`);
