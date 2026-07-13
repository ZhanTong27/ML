(function(){
  const weeks=()=>window.CURRICULUM_WEEKS||[];
  window.addEventListener('load',()=>{
    try{
      Object.assign(PROMPTS,window.CURRICULUM_PROMPTS||{});
      currentWeek=function(){return weeks().find(w=>w.id===S.week)||weeks()[0]};
      weekTaskStats=function(){const tasks=currentWeek().tasks;const done=tasks.filter(t=>S.checks[t.id]).length;return{done,total:tasks.length,pct:tasks.length?Math.round(done/tasks.length*100):0}};
      learningStats=function(){const all=weeks().flatMap(w=>w.tasks),done=all.filter(t=>S.checks[t.id]).length,self=all.filter(t=>t.kind==='自测'),feedback=all.filter(t=>t.kind==='反馈');return{all:all.length?Math.round(done/all.length*100):0,self:self.length?Math.round(self.filter(t=>S.checks[t.id]).length/self.length*100):0,feedback:feedback.length?Math.round(feedback.filter(t=>S.checks[t.id]).length/feedback.length*100):0,week:weekTaskStats().pct}};
      renderLearning=function(){
        const s=learningStats();$('#learningMetrics').innerHTML=[['全部课外任务',s.all],['本周完成',s.week],['自测通过动作',s.self],['反馈闭环动作',s.feedback]].map(x=>`<article class="metric"><small>${x[0]}</small><b>${x[1]}%</b><div class="progress"><i style="width:${x[1]}%"></i></div></article>`).join('');
        const custom=S.customLearning.filter(t=>!t.archived);$('#dynamicWeekTasks').innerHTML=custom.length?`<article class="observation"><div class="eyebrow">AI-GENERATED DIAGNOSTIC TASKS</div><h3>周复盘新增的诊断任务</h3><p class="muted">只有重复、影响交付或暴露关键前置缺口的问题才进入这里；不覆盖16周主干。</p></article>${['core','regular','optional'].map(g=>{const ts=custom.filter(t=>t.priority===g);return ts.length?`<div class="priority-group"><div class="priority-head"><h3>${priorityLabel(g)}任务</h3><small>AI周复盘生成</small></div><div class="tasks">${ts.map(renderTask).join('')}</div></div>`:''}).join('')}`:'';
        $('#dynamicWeekTasks').querySelectorAll('input[type=checkbox]').forEach(c=>c.onchange=()=>{S.checks[c.dataset.id]=c.checked;save();renderLearning();renderToday()});
        $('#weekTabs').innerHTML=weeks().map((w,i)=>`<button data-week="${w.id}" class="${S.week===w.id?'active':''}"><span>W${String(i+1).padStart(2,'0')}</span><b>${w.dates}</b><small>${w.title}</small></button>`).join('');
        $$('#weekTabs button').forEach(b=>b.onclick=()=>{S.week=b.dataset.week;save();renderLearning();renderToday()});
        const w=currentWeek(),groups=['core','regular','optional'];$('#weekContent').innerHTML=`<div class="week-head"><div><div class="eyebrow">${w.cycle} · ${w.dates}</div><h2>${w.title}</h2><p>${w.shift}</p></div><div class="tag-row">${w.focus.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div><article class="observation"><div class="eyebrow">WORK DIAGNOSIS · 不计入课外完成率</div><h3>真实工作只提供诊断与迁移机会</h3><ul>${w.observations.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>${groups.map(g=>renderTaskGroup(w,g)).join('')}<div class="grid2" style="margin-top:10px"><article class="card"><div class="eyebrow">WEEK PASS GATE</div><h3>本周通过条件</h3><ul class="muted">${w.gates.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="card"><div class="eyebrow">15-MIN REVIEW</div><h3>${esc(w.reviewer)}</h3><p class="muted">准备一个真实问题、一条自己的判断和两个具体问题。会后将反馈转化成能力动作或机会动作。</p></article></div>`;
        $$('#weekContent input[type=checkbox]').forEach(c=>c.onchange=()=>{S.checks[c.dataset.id]=c.checked;save();renderLearning();renderToday()});setTimeout(syncCurriculumUI,0)
      };
      exportWeekMaterial=function(){const start=weekStart(),end=addDays(start,6),payload={range:`${start}—${end}`,dailyLogs:S.dailyLogs.filter(x=>x.date>=start&&x.date<=end),problemLogs:S.problemLogs.filter(x=>x.date>=start&&x.date<=end),curriculum:{week:S.week,cycle:curriculumCycleForWeek(S.week),checks:S.checks,tasks:currentWeek().tasks},schedule:S.schedule.filter(x=>x.date>=start&&x.date<=end),prompt:PROMPTS.weekly.text};download(`jett-week-material-${start}.json`,JSON.stringify(payload,null,2));toast('本周材料已导出')};
    }catch(e){console.error('Curriculum overrides failed',e)}
  },{once:true});
})();

function curriculumCycleForWeek(weekId){
  return window.CURRICULUM_CYCLES.find(c=>c.weeks.includes(weekId))||window.CURRICULUM_CYCLES[0]
}
function installCurriculumStyles(){
  if(document.getElementById('curriculum-v23-style'))return;
  const style=document.createElement('style');style.id='curriculum-v23-style';style.textContent=`
    .curriculum-map{display:grid;grid-template-columns:repeat(4,1fr);gap:10px;margin:14px 0}.curriculum-cycle{border:1px solid var(--line);background:linear-gradient(145deg,rgba(14,29,42,.96),rgba(7,18,28,.97));border-radius:12px;padding:15px;text-align:left;color:var(--text);cursor:pointer}.curriculum-cycle:hover,.curriculum-cycle.active{border-color:var(--cyan);background:rgba(53,214,232,.07)}.curriculum-cycle span,.curriculum-cycle b,.curriculum-cycle small{display:block}.curriculum-cycle span{font-size:9px;color:var(--cyan);letter-spacing:.12em}.curriculum-cycle b{margin:7px 0;font-size:14px}.curriculum-cycle small{color:var(--muted);line-height:1.5}.course-context{display:grid;grid-template-columns:1.1fr .9fr;gap:10px;margin:10px 0}.course-context article{border:1px solid #294b5a;background:#081721;border-radius:10px;padding:14px}.course-context h3{margin:5px 0}.course-context p{margin:0;color:var(--muted);font-size:11px;line-height:1.65}.week-tabs.curriculum-filtered{grid-template-columns:repeat(4,1fr)}.cycle-progress{height:5px;background:#17303c;border-radius:9px;overflow:hidden;margin-top:10px}.cycle-progress i{display:block;height:100%;background:linear-gradient(90deg,#25bcd0,#6ce8ee)}@media(max-width:950px){.curriculum-map{grid-template-columns:1fr 1fr}.course-context{grid-template-columns:1fr}}@media(max-width:720px){.curriculum-map{grid-template-columns:1fr}.week-tabs.curriculum-filtered{grid-template-columns:1fr 1fr}}
  `;document.head.appendChild(style)
}
function syncCurriculumUI(){
  const tabs=document.getElementById('weekTabs');if(!tabs||typeof S==='undefined')return;
  installCurriculumStyles();
  const current=curriculumCycleForWeek(S.week);
  let map=document.getElementById('curriculumMap');
  if(!map){map=document.createElement('div');map.id='curriculumMap';map.className='curriculum-map';const metrics=document.getElementById('learningMetrics');metrics?.insertAdjacentElement('afterend',map)}
  map.innerHTML=window.CURRICULUM_CYCLES.map(c=>`<button class="curriculum-cycle ${c.id===current.id?'active':''}" data-cycle="${c.id}"><span>CYCLE ${c.index} · ${c.range}</span><b>${c.title}</b><small>主干：${c.main}<br>辅助：${c.support}</small></button>`).join('');
  map.querySelectorAll('[data-cycle]').forEach(b=>b.onclick=()=>{const c=window.CURRICULUM_CYCLES.find(x=>x.id===b.dataset.cycle);if(!c)return;S.week=c.weeks[0];save();renderLearning();renderToday();setTimeout(syncCurriculumUI,0)});
  let context=document.getElementById('courseContext');
  if(!context){context=document.createElement('div');context.id='courseContext';context.className='course-context';map.insertAdjacentElement('afterend',context)}
  const done=current.weeks.flatMap(id=>window.CURRICULUM_WEEKS.find(w=>w.id===id)?.tasks||[]).filter(t=>S.checks[t.id]).length;
  const total=current.weeks.flatMap(id=>window.CURRICULUM_WEEKS.find(w=>w.id===id)?.tasks||[]).length;
  const pct=total?Math.round(done/total*100):0;
  context.innerHTML=`<article><div class="eyebrow">CURRENT CURRICULUM</div><h3>${current.title}</h3><p>${current.outcome}</p><div class="cycle-progress"><i style="width:${pct}%"></i></div></article><article><div class="eyebrow">LOAD RULE</div><h3>主干不被临时工作覆盖</h3><p>高压周缩小任务规模；普通工作问题只进入诊断，不自动生成课外任务。当前Cycle完成 ${done}/${total} 项。</p></article>`;
  tabs.classList.add('curriculum-filtered');
  [...tabs.querySelectorAll('button')].forEach((b,i)=>{const w=window.CURRICULUM_WEEKS[i];if(!w)return;b.style.display=current.weeks.includes(w.id)?'block':'none';const label=b.querySelector('span');if(label&&label.textContent!==`W${String(i+1).padStart(2,'0')}`)label.textContent=`W${String(i+1).padStart(2,'0')}`});
}
function migrateCurriculumV23(){
  if(typeof S==='undefined'||S.curriculumVersion==='soc-verification-16w-v1')return;
  const oldMap={spec:'verification',strategy:'verification',check:'verification',uvm:'productivity',tools:'productivity',delivery:'ownership',communication:'ownership',soc:'soc',debug:'debug',lowpower:'lowpower'};
  const old=Array.isArray(S.abilities)?S.abilities:[];
  S.abilities=window.CURRICULUM_ABILITIES.map(a=>{const related=old.filter(x=>oldMap[x.id]===a.id);if(!related.length)return a;const strongest=related.sort((x,y)=>(y.level||0)-(x.level||0))[0];return {...a,level:Math.min(a.level,Number(strongest.level)||a.level),signal:`旧版记录迁移：${strongest.signal||a.signal}`,status:a.status}});
  const legacy=S.cycleArchives?.find(x=>x.id==='cycle-202607');if(legacy){legacy.status='已升级';legacy.summary='原四周Debug/Spec/Corner Bootcamp已重新编入16周课程的Cycle 1与Cycle 4。旧记录继续保留。'}
  if(!S.cycleArchives?.some(x=>x.id==='curriculum-16w-2026'))S.cycleArchives=[{id:'curriculum-16w-2026',title:'2026年7—11月 · SoC验证第一阶段课程',range:'2026-07-13—2026-11-01',status:'进行中',goal:'验证环境 → SoC数据流 → 系统状态与低功耗 → Coverage、Regression与Sign-off。',summary:'四个Cycle、16周。工作日志用于诊断与迁移，但不直接控制全部课程。'},...(S.cycleArchives||[])];
  S.curriculumVersion='soc-verification-16w-v1';S.version='2.3';save();renderAll()
}
window.addEventListener('load',()=>{
  try{
    document.title='Jett · Career OS V2.3';
    const st=document.querySelector('.side-title');if(st)st.textContent='CAREER OS · V2.3';
    const strip=document.querySelector('.career-strip p');if(strip)strip.textContent='当前阶段：可靠的IP Owner　·　当前课程：16周SoC验证第一阶段　·　关键差距：系统推理、验证闭环与独立判断';
    const heading=document.querySelector('#current-execution .section-title h2');if(heading)heading.textContent='本周学习与16周专业课程';
    const desc=document.querySelector('#current-execution .section-title p');if(desc)desc.textContent='四个Cycle连续推进；任务详细保留，工作观察与工作之外训练继续分开。';
    migrateCurriculumV23();syncCurriculumUI();
    const tabs=document.getElementById('weekTabs');if(tabs)new MutationObserver(()=>setTimeout(syncCurriculumUI,0)).observe(tabs,{childList:true,subtree:true});
  }catch(e){console.error('Curriculum V2.3 patch failed',e)}
});
