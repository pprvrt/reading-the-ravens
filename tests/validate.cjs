// Motion validator: flags players moving faster than a human (teleports) and players who stop
// playing before the end of a scene. Run: node tests/validate.cjs
// Baseline at the time of writing (accepted): 14 brief speed blips, mostly linemen at 7.2–9 yd/s as they
// engage a block and two ball carriers at 10.6–10.7 yd/s; "idle" lines for pass-protecting backs, blockers
// holding a block and lab man defenders on stationary hitches. 11 of 56 scenes report something.
// A new SPEED line well above these values usually means a forced arrival time in a path.
const { SOURCE } = require('./_load.cjs');
eval(SOURCE + `
const list=[['boot',sc_boot],['arc',sc_arc],['choice',sc_choice],['oz',sc_oz],['screen',sc_screen],['rpo',sc_rpo],['disguise',sc_disguise],['pressure',sc_pressure],['fit',sc_fit],['rush3',sc_rush3],['q_motion',sc_q_motion],['q_box',sc_q_box],['q_mug',sc_q_mug],['prog-check',progScene('check')],['prog-scramble',progScene('scramble')]];
['run','pass','pa','screen','gap'].forEach(k=>list.push(['line-'+k,lineScene(k)]));
for(const c in COVS) for(const r in ROUTES) list.push(['lab-'+c+'-'+r,buildLab(c,r)]);
for(const c in COVS) list.push(['gal-'+c,buildLab(c,'verts',{noThrow:true,tEnd:2.2})]);
const OL=['LT','LG','C','RG','RT'];
let bad=0, speed=0;
for(const [name,sc] of list){
  finalize(sc); const end=sc.end!=null?sc.end:sc.t[1]; const out=[];
  if(end>sc.t[1]+1e-6) out.push('  END after t1');
  for(const p of sc.players){ const kf=p.kf; let lastMove=-1;
    for(let t=0;t<=end;t+=0.05){ const a=posAt(kf,t), b=posAt(kf,t+0.05); const v=Math.hypot(b[0]-a[0],b[1]-a[1])/0.05;
      const cap=OL.includes(p.id)?7.2:10.6; if(v>cap) {out.push('  SPEED '+p.id+' '+v.toFixed(1)+' yd/s @'+t.toFixed(2)); speed++; break;}
      if(v>0.4) lastMove=t; }
    const exempt = p.kind==='none' || p.kind==='pp' || p.kind==='fake' || p.id==='QB' || p.after==='stay' || (p.m&&p.m.some(q=>q&&q.stay));
    if(!exempt && lastMove < end-0.9) out.push('  idle '+p.id+' ('+(p.kind||'route')+') last move '+lastMove.toFixed(2)+' / end '+end);
  }
  if(out.length){bad++; console.log(name+' end='+end+'\\n'+out.join('\\n'));}
}
console.log('scenes with issues:',bad,'of',list.length,'· speed violations:',speed);`);
