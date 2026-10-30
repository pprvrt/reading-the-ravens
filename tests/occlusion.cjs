// Legibility validator: player counts, overlapping markers (>=25% of a play), players out of view,
// players hidden under callout labels or the scene tag. Run: node tests/occlusion.cjs
// Known residuals at the time of writing: sc_fit RT+RS, line-gap SL+SS and FS+SS, lab-C0-verts RG+W
// (contact during blocks and tight coverage) and one frame of RB under a tag.
const { SOURCE } = require('./_load.cjs');
eval(SOURCE + `
const L={sc_boot,sc_arc,sc_choice,sc_oz,sc_screen,sc_rpo,sc_disguise,sc_pressure,sc_fit,sc_rush3,sc_q_motion,sc_q_box,sc_q_mug,sc_field,sc_gaps,sc_tree,prog_check:progScene('check'),prog_scr:progScene('scramble')};
['run','pass','pa','screen','gap'].forEach(k=>L['line-'+k]=lineScene(k));
for(const k in PERS) L['pers'+k]=persScene(k);
for(const c in COVS) for(const r in ROUTES) L['lab-'+c+'-'+r]=buildLab(c,r);
const OL=new Set(['LT','LG','C','RG','RT']);
for(const n in L){ const sc=L[n]; finalize(sc); const out=[];
  const off=sc.players.filter(p=>p.side!=='def').length, def=sc.players.filter(p=>p.side==='def').length;
  if(!['sc_field','sc_gaps','sc_tree'].includes(n) && (off!==11 || (def!==11 && def!==0))) out.push('  COUNT off '+off+' def '+def);
  const v=Object.assign({y0:-10,y1:20,x0:0,x1:FW},sc.view||{});
  const t0=sc.static?0:sc.t[0], t1=sc.static?0:sc.t[1], end=sc.end!=null?sc.end:t1;
  const pairs={}, outv={}, lab={}, tag={};
  const tagW=((sc.tag||'').length*6.6+18)/570*(v.x1-v.x0), tagH=26/570*(v.x1-v.x0);
  for(let t=t0;t<=Math.max(t0,t1)+1e-9;t+=0.1){
    const pos=sc.players.map(p=>[p,posAt(track(p),t)]);
    for(let i=0;i<pos.length;i++){ const [p,a]=pos[i];
      if(t<=end && (a[0]<v.x0+0.6||a[0]>v.x1-0.6||a[1]<v.y0+0.6||a[1]>v.y1-0.6)) outv[p.id]=(outv[p.id]||0)+1;
      if(sc.tag && a[0]<v.x0+tagW+0.8 && a[1]<v.y0+tagH+0.8) tag[p.id]=(tag[p.id]||0)+1;
      (sc.labels||[]).forEach(l=>{ if(t>=l.t0&&t<=l.t1){ const w=(l.text.length*5.7+10)/10; const lx=l.anchor==='end'?l.x-w:l.anchor==='start'?l.x:l.x-w/2; if(a[0]>lx-0.9&&a[0]<lx+w+0.9&&Math.abs(a[1]-l.y)<1.7) lab[p.id+'/'+l.text]=(lab[p.id+'/'+l.text]||0)+1; }});
      for(let j=i+1;j<pos.length;j++){ const [q,b]=pos[j]; const d=Math.hypot(a[0]-b[0],a[1]-b[1]);
        if(d<1.4){ const k=p.id+'+'+q.id; pairs[k]=(pairs[k]||0)+1; } } } }
  const steps=sc.static?1:Math.round((t1-t0)/0.1)+1;
  for(const k in pairs){ const frac=pairs[k]/steps; const [a,b]=k.split('+'); if(frac>=0.25 || sc.static) out.push('  OVERLAP '+k+' '+(frac*100).toFixed(0)+'% of play'); }
  for(const k in outv) if(outv[k]>3) out.push('  OUT-OF-VIEW '+k+' '+outv[k]+' frames');
  for(const k in lab) out.push('  UNDER-LABEL '+k+' '+lab[k]+' frames');
  for(const k in tag) if(tag[k]>0) out.push('  UNDER-TAG '+k+' '+tag[k]+' frames');
  if(out.length) console.log(n+'\\n'+out.join('\\n'));
}`);
