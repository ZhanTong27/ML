const KEY = 'jett-career-os-v22';
const PREVIOUS_KEYS = ['jett-career-os-v2','jett-growth-static-v1'];
const $ = s => document.querySelector(s);
const $$ = s => [...document.querySelectorAll(s)];

function localISO(date = new Date()){
  const y=date.getFullYear(),m=String(date.getMonth()+1).padStart(2,'0'),d=String(date.getDate()).padStart(2,'0');
  return `${y}-${m}-${d}`;
}
function uid(prefix='id'){return `${prefix}-${Date.now()}-${Math.random().toString(36).slice(2,7)}`}
function esc(value=''){return String(value).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#039;'}[c]))}
function arr(value){return Array.isArray(value)?value:(value? [value]:[])}
function parseMaybeJSON(text){
  const raw=(text||'').trim(); if(!raw) throw new Error('内容为空');
  const cleaned=raw.replace(/^```(?:json)?\s*/i,'').replace(/\s*```$/,'').trim();
  try{return JSON.parse(cleaned)}catch{return {raw:raw}}
}
function save(){try{localStorage.setItem(KEY,JSON.stringify(S))}catch{}}
function toast(msg){const t=$('#toast');t.textContent=msg;t.classList.add('show');clearTimeout(toast.timer);toast.timer=setTimeout(()=>t.classList.remove('show'),1900)}
function download(name,text,type='application/json'){const a=document.createElement('a');a.href=URL.createObjectURL(new Blob([text],{type}));a.download=name;a.click();setTimeout(()=>URL.revokeObjectURL(a.href),1000)}
function weekStart(dateStr=localISO()){
  const d=new Date(`${dateStr}T12:00:00`);const day=d.getDay()||7;d.setDate(d.getDate()-day+1);return localISO(d)
}
function addDays(dateStr,n){const d=new Date(`${dateStr}T12:00:00`);d.setDate(d.getDate()+n);return localISO(d)}
function dateLabel(dateStr){if(!dateStr)return '—';const d=new Date(`${dateStr}T12:00:00`);return `${d.getMonth()+1}月${d.getDate()}日 · ${'日一二三四五六'[d.getDay()]}`}

function defaultState(){return{
  version:CAREER_OS_VERSION,
  selectedDate:localISO(),calendarMonth:localISO().slice(0,7),week:'w1',checks:{},
  dailyLogs:[],problemLogs:[],weeklyReviews:[],schedule:[],
  abilities:structuredClone(DEFAULT_ABILITIES),
  cycleArchives:[{id:'cycle-202607',title:'2026年7月 · Debug与验证工作流',range:'2026-07-13—2026-08-09',status:'进行中',goal:'建立工作流、Debug证据链、Spec接入、Corner与验证策略。',summary:'当前固定四周周期。周期结束后保留完整计划、实际变化和能力结论。'}],
  resume:{filename:'',version:'入职前版本待导入',target:'SoC系统型验证工程师 → 芯片项目负责人',summary:'等待导入入职前简历。',education:[],experiences:[],projects:[],skills:[],awards:[],versions:[],candidates:[]},
  customLearning:[],settings:{lastView:'today'}
}}
function normalizeState(s){
  const base=defaultState(),out={...base,...(s||{})};
  out.abilities=arr(out.abilities).length?out.abilities:base.abilities;
  out.resume={...base.resume,...(out.resume||{})};
  ['dailyLogs','problemLogs','weeklyReviews','schedule','cycleArchives','customLearning'].forEach(k=>out[k]=arr(out[k]));
  out.checks=out.checks||{};out.settings={...base.settings,...(out.settings||{})};out.version=CAREER_OS_VERSION;
  return out
}
function load(){
  try{const current=JSON.parse(localStorage.getItem(KEY)||'null');if(current)return normalizeState(current)}catch{}
  for(const oldKey of PREVIOUS_KEYS){
    try{const old=JSON.parse(localStorage.getItem(oldKey)||'null');if(!old)continue;
      if(oldKey==='jett-career-os-v2'){
        const migrated=normalizeState(old);migrated.version=CAREER_OS_VERSION;localStorage.setItem(KEY,JSON.stringify(migrated));return migrated
      }
      const migrated=defaultState();migrated.checks=old.checks||{};migrated.week=old.week||'w1';
      if(old.evidence?.length)migrated.cycleArchives.push({id:uid('archive'),title:'旧版成长证据迁移',range:'旧版数据',status:'已迁移',summary:old.evidence.map(x=>`${x.date||''} ${x.title||''}：${x.summary||''}`).join('\n')});
      if(old.reflection&&Object.values(old.reflection).some(Boolean))migrated.weeklyReviews.push({id:uid('weekly'),range:'旧版周复盘',raw:JSON.stringify(old.reflection,null,2),createdAt:localISO()});
      localStorage.setItem(KEY,JSON.stringify(migrated));return migrated
    }catch{}
  }
  return defaultState()
}
let S=load();

function switchView(view,anchor){
  $$('.view').forEach(v=>v.classList.toggle('active',v.id===view));
  $$('.nav button').forEach(b=>b.classList.toggle('active',b.dataset.view===view));
  S.settings.lastView=view;save();
  window.scrollTo({top:0,behavior:'instant'});
  renderAll();
  if(anchor)setTimeout(()=>document.getElementById(anchor)?.scrollIntoView({behavior:'smooth'}),80)
}
$$('.nav button').forEach(b=>b.onclick=()=>switchView(b.dataset.view));
$$('[data-view-jump]').forEach(b=>b.onclick=()=>switchView(b.dataset.viewJump,b.dataset.anchor));
$$('.page-index button').forEach(b=>b.onclick=()=>{
  const id=b.dataset.scroll;document.getElementById(id)?.scrollIntoView({behavior:'smooth'});
  b.closest('.page-index').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b));
});

function selectedDaily(){return S.dailyLogs.find(x=>x.date===S.selectedDate)}
function currentWeek(){return LEARNING_WEEKS.find(w=>w.id===S.week)||LEARNING_WEEKS[0]}
function weekTaskStats(){const tasks=currentWeek().tasks;const done=tasks.filter(t=>S.checks[t.id]).length;return{done,total:tasks.length,pct:Math.round(done/tasks.length*100)}}
function learningStats(){
  const all=LEARNING_WEEKS.flatMap(w=>w.tasks),done=all.filter(t=>S.checks[t.id]).length;
  const self=all.filter(t=>t.kind==='自测'),feedback=all.filter(t=>t.kind==='反馈');
  return{all:Math.round(done/all.length*100),self:self.length?Math.round(self.filter(t=>S.checks[t.id]).length/self.length*100):0,feedback:feedback.length?Math.round(feedback.filter(t=>S.checks[t.id]).length/feedback.length*100):0,week:weekTaskStats().pct}
}
function weeklyLogCount(){const start=weekStart(),end=addDays(start,6);return S.dailyLogs.filter(x=>x.date>=start&&x.date<=end).length}
function latestWeekly(){return [...S.weeklyReviews].sort((a,b)=>(b.createdAt||b.range||'').localeCompare(a.createdAt||a.range||''))[0]}

function renderToday(){
  $('#todayDate').value=S.selectedDate;$('#todayTitle').textContent=dateLabel(S.selectedDate);
  const log=selectedDaily(),week=currentWeek(),stats=weekTaskStats();
  $('#todayRecordStatus').textContent=log?'已记录':'未记录';$('#todayRecordStatus').classList.toggle('done',!!log);
  const start=weekStart(),weeklyDone=!!S.weeklyReviews.find(x=>(x.range||'').includes(start));
  $('#todayStatusRow').innerHTML=[
    ['今日记录',log?'已完成':'等待口述',log?'事实已经进入系统':'点击“记录今天”即可'],
    ['本周额外学习',`${stats.done} / ${stats.total} 项`,`${stats.pct}% 完成，只统计工作之外`],
    ['周度复盘',weeklyDone?'已完成':(new Date().getDay()===0?'待生成':'本周进行中'),weeklyDone?'下周计划已可更新':'周末由AI统一分析']
  ].map(x=>`<article class="status-card"><small>${x[0]}</small><b>${x[1]}</b><p>${x[2]}</p></article>`).join('');

  const previousLog=S.dailyLogs.find(x=>x.date===addDays(S.selectedDate,-1));
  const tomorrow=previousLog?.tomorrow||{};
  const defaultLearning=week.tasks.filter(t=>!S.checks[t.id]).slice(0,3);
  const actions=[];
  arr(tomorrow.work).forEach(x=>actions.push({type:'work',title:x,meta:'工作重点'}));
  arr(tomorrow.learning).forEach(x=>actions.push({type:'learn',title:x,meta:'工作之外学习'}));
  if(!arr(tomorrow.learning).length)defaultLearning.forEach(t=>actions.push({type:'learn',title:t.title,meta:`${priorityLabel(t.priority)} · ${t.time}`}));
  arr(tomorrow.life).forEach(x=>actions.push({type:'life',title:x,meta:'生活 / 锻炼'}));
  const schedules=S.schedule.filter(x=>x.date===S.selectedDate);schedules.forEach(x=>actions.push({type:x.type,title:x.title,meta:x.time||typeLabel(x.type)}));
  if(!actions.length)actions.push({type:'work',title:'完成今日记录并确认明日重点',meta:'先留下事实，再由AI分析'});
  $('#todayActionList').innerHTML=actions.slice(0,8).map(a=>`<div class="action-item"><i class="action-icon ${a.type}"></i><div><b>${esc(a.title)}</b><p>${esc(a.meta)}</p></div><small>${typeLabel(a.type)}</small></div>`).join('');

  const timeline=S.schedule.filter(x=>x.date===S.selectedDate).sort((a,b)=>(a.time||'').localeCompare(b.time||''));
  $('#todayTimeline').innerHTML=timeline.length?timeline.map(x=>`<article><time>${esc(x.time||'待安排')}</time><h4>${esc(x.title)}</h4><p>${typeLabel(x.type)}</p></article>`).join(''):'<div class="empty">今天还没有单独安排。可以继续保持轻量。</div>';
  const next=[];for(let i=1;i<=3;i++){const d=addDays(S.selectedDate,i),items=S.schedule.filter(x=>x.date===d);next.push(`<div class="compact-row"><b>${dateLabel(d)}</b><span>${items.length?esc(items.map(x=>x.title).join('、')):'暂无特别安排'}</span></div>`)}
  $('#nextThreeDays').innerHTML=next.join('');

  $('#weekOverview').innerHTML=`
    <article class="card overview-card"><div class="eyebrow">WORK FOCUS</div><h3>记录真实交付与问题</h3><p>${esc(week.observations[0])}</p></article>
    <article class="card overview-card"><div class="eyebrow">LEARNING FOCUS</div><h3>${esc(week.title)}</h3><p>${esc(week.shift)}</p><div class="mini-progress"><i style="width:${stats.pct}%"></i></div></article>
    <article class="card overview-card"><div class="eyebrow">NEXT ACTION</div><h3>${esc(defaultLearning[0]?.title||'进入本周复盘')}</h3><p>${esc(defaultLearning[0]?.fallback||'检查本周记录并生成下一周计划')}</p></article>`;
  const day=new Date().getDay();
  $('#weeklyReminder').innerHTML=(day===0||day===6)?`<article class="reminder-card"><div><h3>本周记录可以开始复盘</h3><p>网站会汇总原始事实，AI负责分析重复问题、能力变化和下周任务。</p></div><button class="primary" data-quick="weekly">开始周复盘</button></article>`:'';
  $('#weeklyReminder').querySelectorAll('[data-quick]').forEach(bindQuickButton);

  const recent=[...S.dailyLogs].sort((a,b)=>b.date.localeCompare(a.date)).slice(0,3);
  $('#recentRecords').innerHTML=recent.length?recent.map(renderDailyCard).join(''):'<div class="empty" style="grid-column:1/-1">还没有每日记录。第一次口述后，这里会自动形成最近记录。</div>';
  renderCalendar();
}
function renderDailyCard(x){
  const work=arr(x.work),outside=arr(x.outsideLearning),life=arr(x.life);
  return `<article class="card record-card"><header><span class="eyebrow">${esc(x.date||'未标日期')}</span></header><h3>${esc(x.summary||'每日记录')}</h3><p>${work[0]?esc(work[0].title||work[0]):'未拆分具体工作任务'}</p><div class="tag-row"><span class="tag work">工作 ${work.length}</span><span class="tag learn">额外学习 ${outside.length}</span><span class="tag life">生活 ${life.length}</span></div><footer>精力：${esc(x.energy||'未记录')}</footer></article>`
}
function priorityLabel(p){return({core:'核心',regular:'常规',optional:'可选'})[p]||p}
function typeLabel(type){return({work:'工作',learn:'额外学习',life:'生活',problem:'问题'})[type]||type||'事项'}

function renderCalendar(){
  const [y,m]=S.calendarMonth.split('-').map(Number),first=new Date(y,m-1,1),last=new Date(y,m,0),startOffset=(first.getDay()+6)%7;
  $('#monthTitle').textContent=`${y}年${m}月`;
  const cells=[];for(let i=0;i<42;i++){
    const day=i-startOffset+1,d=new Date(y,m-1,day),iso=localISO(d),other=d.getMonth()!==m-1;
    const hasDaily=S.dailyLogs.some(x=>x.date===iso),hasProblem=S.problemLogs.some(x=>x.date===iso),schedules=S.schedule.filter(x=>x.date===iso);
    const marks=[hasDaily?'work':'',hasProblem?'problem':'',...schedules.map(x=>x.type)].filter(Boolean);
    cells.push(`<button class="day ${other?'other':''} ${iso===localISO()?'today':''} ${iso===S.selectedDate?'selected':''}" data-date="${iso}"><strong>${d.getDate()}</strong><div class="day-marks">${[...new Set(marks)].map(x=>`<i class="mark ${x}"></i>`).join('')}</div></button>`)
  }
  $('#calendarGrid').innerHTML=cells.join('');
  $$('#calendarGrid .day').forEach(b=>b.onclick=()=>{S.selectedDate=b.dataset.date;save();renderToday();renderCalendarDetail()});
  renderCalendarDetail();
}
function renderCalendarDetail(){
  const d=S.selectedDate,log=S.dailyLogs.find(x=>x.date===d),problems=S.problemLogs.filter(x=>x.date===d),schedules=S.schedule.filter(x=>x.date===d);
  $('#calendarDayDetail').innerHTML=`<div class="card-head"><div><div class="eyebrow">DAY DETAIL</div><h3>${dateLabel(d)}</h3></div><button class="secondary small-btn" data-quick="schedule">添加安排</button></div>
  ${log?`<p class="muted"><b>工作记录：</b>${esc(log.summary||'已记录')}</p>`:'<p class="muted">当天没有工作记录。</p>'}
  ${problems.length?`<p class="muted"><b>问题：</b>${problems.map(x=>esc(x.title||'问题记录')).join('、')}</p>`:''}
  ${schedules.length?`<p class="muted"><b>安排：</b>${schedules.map(x=>`${esc(x.time||'')} ${esc(x.title)}`).join('；')}</p>`:''}`;
  $('#calendarDayDetail').querySelectorAll('[data-quick]').forEach(bindQuickButton)
}

function renderGrowth(){renderLearning();renderProblems();renderWeekly();renderAbilities();renderArchives()}
function renderLearning(){
  const s=learningStats();$('#learningMetrics').innerHTML=[['全部课外任务',s.all],['本周完成',s.week],['自测通过动作',s.self],['反馈闭环动作',s.feedback]].map(x=>`<article class="metric"><small>${x[0]}</small><b>${x[1]}%</b><div class="progress"><i style="width:${x[1]}%"></i></div></article>`).join('');
  const custom=S.customLearning.filter(t=>!t.archived);
  $('#dynamicWeekTasks').innerHTML=custom.length?`<article class="observation"><div class="eyebrow">AI-GENERATED WEEKLY PLAN</div><h3>根据周复盘新增的学习任务</h3><p class="muted">这些任务来自真实工作记录与周度分析，不会覆盖固定四周计划。</p></article>${['core','regular','optional'].map(g=>{const ts=custom.filter(t=>t.priority===g);return ts.length?`<div class="priority-group"><div class="priority-head"><h3>${priorityLabel(g)}任务</h3><small>AI周复盘生成</small></div><div class="tasks">${ts.map(renderTask).join('')}</div></div>`:''}).join('')}`:'';
  $('#dynamicWeekTasks').querySelectorAll('input[type=checkbox]').forEach(c=>c.onchange=()=>{S.checks[c.dataset.id]=c.checked;save();renderLearning();renderToday()});
  $('#weekTabs').innerHTML=LEARNING_WEEKS.map((w,i)=>`<button data-week="${w.id}" class="${S.week===w.id?'active':''}"><span>W0${i+1}</span><b>${w.dates}</b><small>${w.title}</small></button>`).join('');
  $$('#weekTabs button').forEach(b=>b.onclick=()=>{S.week=b.dataset.week;save();renderLearning();renderToday()});
  const w=currentWeek();
  const groups=['core','regular','optional'];
  $('#weekContent').innerHTML=`<div class="week-head"><div><div class="eyebrow">${w.dates}</div><h2>${w.title}</h2><p>${w.shift}</p></div><div class="tag-row">${w.focus.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div>
    <article class="observation"><div class="eyebrow">WORK OBSERVATION · 不计入课外完成率</div><h3>本周在真实工作中重点观察</h3><ul>${w.observations.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article>
    ${groups.map(g=>renderTaskGroup(w,g)).join('')}
    <div class="grid2" style="margin-top:10px"><article class="card"><div class="eyebrow">WEEK PASS GATE</div><h3>本周通过条件</h3><ul class="muted">${w.gates.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="card"><div class="eyebrow">15-MIN REVIEW</div><h3>${esc(w.reviewer)}</h3><p class="muted">准备一个真实问题、一条自己的判断和两个具体问题。会后将反馈转化成下一次行动。</p></article></div>`;
  $$('#weekContent input[type=checkbox]').forEach(c=>c.onchange=()=>{S.checks[c.dataset.id]=c.checked;save();renderLearning();renderToday()})
}
function renderTaskGroup(w,priority){
  const tasks=w.tasks.filter(t=>t.priority===priority);if(!tasks.length)return'';
  return `<div class="priority-group"><div class="priority-head"><h3>${priorityLabel(priority)}任务</h3><small>${priority==='core'?'当前周期必须优先':'regular'===priority?'按计划推进':'有余力时探索'}</small></div><div class="tasks">${tasks.map(renderTask).join('')}</div></div>`
}
function kindClass(k){return k==='自测'?'test':k==='反馈'?'feedback':k==='方法'?'method':''}
function renderTask(t){return `<article class="task ${S.checks[t.id]?'done':''}"><label><input type="checkbox" data-id="${t.id}" ${S.checks[t.id]?'checked':''}><span class="kind ${kindClass(t.kind)}">${t.kind}</span><div><h3>${esc(t.title)}</h3><small>${esc(t.time)} · ${esc(t.env)}</small></div></label><div class="task-body"><ol>${arr(t.steps).map(x=>`<li>${esc(x)}</li>`).join('')}</ol><dl><div><dt>为什么做</dt><dd>${esc(t.reason||'支持当前能力主题')}</dd></div><div><dt>留下什么</dt><dd>${esc(t.output)}</dd></div><div><dt>怎样算会</dt><dd>${esc(t.pass)}</dd></div><div><dt>高压降级</dt><dd>${esc(t.fallback)}</dd></div></dl></div></article>`}

function renderProblems(){
  const q=($('#problemSearch')?.value||'').toLowerCase(),f=$('#problemFilter')?.value||'';
  let items=[...S.problemLogs].sort((a,b)=>(b.date||'').localeCompare(a.date||''));
  items=items.filter(x=>{const hay=JSON.stringify(x).toLowerCase();if(q&&!hay.includes(q))return false;if(f==='important'&&x.aiObservation?.importance!=='important')return false;if(f==='repeat'&&!x.aiObservation?.repeat)return false;return true});
  $('#problemFeed').innerHTML=items.length?items.map(x=>`<article class="entry"><header><span>${esc(x.date||'未标日期')} · ${esc(x.independence||'独立程度待确认')}</span><div class="tag-row">${x.aiObservation?.importance==='important'?'<span class="tag good">重要经历</span>':''}${x.aiObservation?.repeat?'<span class="tag problem">重复问题</span>':''}</div></header><h3>${esc(x.title||'问题日志')}</h3><p><b>根因：</b>${esc(x.rootCause||x.raw||'待整理')}</p><p><b>理解变化：</b>${esc(x.understandingChange||'待补充')}</p><div class="tag-row">${arr(x.abilities).map(a=>`<span class="tag">${esc(typeof a==='string'?a:a.id)}</span>`).join('')}</div><details><summary>展开完整过程</summary><p><b>预期与实际：</b>${esc(x.expected||'')} / ${esc(x.actual||'')}</p><p><b>最初判断：</b>${esc(x.initialJudgment||'')}</p><ol>${arr(x.analysis).map(a=>`<li>${esc(a)}</li>`).join('')}</ol><p><b>解决方式：</b>${esc(x.solution||'')}</p><p><b>可迁移方法：</b>${arr(x.transferableMethod).map(esc).join('；')}</p></details></article>`).join(''):'<div class="empty">还没有问题日志。只有重要或值得复盘的问题才需要单独记录。</div>'
}
function renderWeekly(){
  const items=[...S.weeklyReviews].sort((a,b)=>(b.createdAt||b.range||'').localeCompare(a.createdAt||a.range||''));
  const html=items.length?items.map(x=>`<article class="entry"><header><span>${esc(x.range||'周度复盘')}</span><span>${esc(x.createdAt||'')}</span></header><h3>${esc(arr(x.workSummary)[0]||'本周总结')}</h3>${x.raw?`<p>${esc(x.raw)}</p>`:`<div class="grid2"><div><p><b>主要工作</b></p><ul>${arr(x.workSummary).map(a=>`<li>${esc(a)}</li>`).join('')}</ul><p><b>能力观察</b></p><ul>${arr(x.abilityChanges).map(a=>`<li>${esc(a.change||a)}</li>`).join('')}</ul></div><div><p><b>下周工作关注点</b></p><ul>${arr(x.nextWeekWorkFocus).map(a=>`<li>${esc(a)}</li>`).join('')}</ul><p><b>反馈问题</b></p><ul>${arr(x.reviewQuestions).map(a=>`<li>${esc(a)}</li>`).join('')}</ul></div></div>`}</article>`).join(''):'<div class="empty">还没有周度复盘。周末由AI读取一整周记录后生成。</div>';
  $('#weeklyFeed').innerHTML=html;$('#historicalWeeklyFeed').innerHTML=html
}
function renderAbilities(){
  $('#abilityGrid').innerHTML=S.abilities.map(a=>`<article class="card ability"><div class="ability-status"><div><div class="eyebrow">${esc(a.id.toUpperCase())}</div><h3>${esc(a.name)}</h3></div><b>${esc(a.status)}</b></div><div class="level"><i style="width:${Math.min(100,(Number(a.level)||1)/6*100)}%"></i></div><p><b>最近信号：</b>${esc(a.signal||'暂无')}</p><p><b>升级条件：</b>${esc(a.next||'待定义')}</p><p><b>机会判断：</b>${esc(a.opportunity||'待观察')}</p></article>`).join('')
}
function renderArchives(){
  $('#archiveFeed').innerHTML=S.cycleArchives.length?S.cycleArchives.map(x=>`<article class="entry"><header><span>${esc(x.range||'')}</span><span class="tag ${x.status==='进行中'?'learn':'good'}">${esc(x.status||'已归档')}</span></header><h3>${esc(x.title)}</h3><p><b>目标：</b>${esc(x.goal||'')}</p><p>${esc(x.summary||'')}</p>${arr(x.nextCycle?.focus).length?`<div class="tag-row">${x.nextCycle.focus.map(a=>`<span class="tag">${esc(a)}</span>`).join('')}</div>`:''}</article>`).join(''):'<div class="empty">暂无周期档案。</div>'
}

function renderResume(){
  const r=S.resume;$('#resumeTarget').textContent=r.target||'SoC系统型验证工程师 → 芯片项目负责人';
  $('#resumeTags').innerHTML=`<span class="tag">${esc(r.version||'待导入')}</span><span class="tag work">持续更新</span>${r.filename?`<span class="tag">${esc(r.filename)}</span>`:''}`;
  $('#resumeFileInfo').textContent=r.filename?`已记录原始文件：${r.filename}。静态网站不上传文件内容。`:'尚未选择原始简历文件。文件内容需先由AI整理，再导入网站。';
  $('#resumeDisplay').innerHTML=`<div class="eyebrow">PROFILE SUMMARY</div><h2>当前简历快照</h2><p class="muted">${esc(r.summary||'等待导入入职前简历。')}</p>
  ${r.education.length?`<div class="resume-section"><h3>教育背景</h3>${r.education.map(resumeItem).join('')}</div>`:''}
  ${r.experiences.length?`<div class="resume-section"><h3>工作与实习经历</h3>${r.experiences.map(resumeItem).join('')}</div>`:''}
  ${r.skills.length?`<div class="resume-section"><h3>技能</h3><div class="tag-row">${r.skills.map(x=>`<span class="tag">${esc(x)}</span>`).join('')}</div></div>`:''}
  ${r.awards.length?`<div class="resume-section"><h3>奖项 / 专利 / 研究</h3><ul class="muted">${r.awards.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></div>`:''}`;
  const timeline=[...r.education.map(x=>({...x,type:'教育'})),...r.experiences.map(x=>({...x,type:'经历'})),...r.projects.map(x=>({...x,type:'项目'}))];
  $('#experienceTimeline').innerHTML=timeline.length?timeline.map(x=>`<article class="timeline-record"><time>${esc(x.time||'')}</time><div class="card"><div class="eyebrow">${esc(x.type)}</div><h3>${esc(x.title)}</h3><p class="muted">${esc(x.detail||x.role||x.result||'')}</p></div></article>`).join(''):'<div class="empty">导入简历后自动形成经历时间线。</div>';
  $('#projectGrid').innerHTML=r.projects.length?r.projects.map(x=>`<article class="card project-card"><div class="eyebrow">${esc(x.time||'PROJECT')}</div><h3>${esc(x.title)}</h3><p><b>角色：</b>${esc(x.role||'')}</p><p><b>负责范围：</b>${esc(x.scope||'')}</p><p><b>核心挑战：</b>${esc(x.challenge||'')}</p><details><summary>查看完整项目档案</summary><p><b>背景：</b>${esc(x.background||'')}</p><p><b>解决过程：</b>${esc(x.process||'')}</p><p><b>结果：</b>${esc(x.result||'')}</p><p><b>可公开边界：</b>${esc(x.publicBoundary||'待确认')}</p></details><div class="tag-row">${arr(x.abilities).map(a=>`<span class="tag">${esc(a)}</span>`).join('')}</div></article>`).join(''):'<div class="empty" style="grid-column:1/-1">尚未建立项目档案。</div>';
  $('#candidateFeed').innerHTML=r.candidates.length?r.candidates.map(x=>`<article class="entry"><header><span>${esc(x.source||x.date||'来源待关联')}</span><span class="tag ${x.status==='confirmed'?'good':'learn'}">${x.status==='confirmed'?'已确认':'候选'}</span></header><h3>${esc(x.title)}</h3><p><b>为什么值得：</b>${esc(x.reason||'')}</p><p><b>仍缺事实：</b>${esc(x.missing||'无')}</p><p><b>适用版本：</b>${esc(x.target||'待判断')}</p></article>`).join(''):'<div class="empty">当前没有简历候选。AI不会把普通日常任务都塞进这里。</div>';
  $('#versionGrid').innerHTML=r.versions.length?r.versions.map(x=>`<article class="card version-card"><div class="eyebrow">${esc(x.date||'VERSION')}</div><h3>${esc(x.name)}</h3><p>${esc(x.target||'')}</p><p>${esc(x.changes||'')}</p></article>`).join(''):'<article class="card version-card"><div class="eyebrow">INITIAL VERSION</div><h3>入职前简历</h3><p>等待上传并由AI整理。</p></article>'
}
function resumeItem(x){return `<div class="resume-item"><time>${esc(x.time||'')}</time><div><h4>${esc(x.title||'')}</h4><p>${esc(x.detail||'')}</p></div></div>`}

function renderCareer(){
  $('#northStarCards').innerHTML=[['主标签','SoC验证','跨IP协同、系统状态、异常传播与完整交付'],['第二标签','低功耗验证','power domain、isolation、retention与异常切换'],['责任方向','芯片项目负责人','从个人交付走向质量、进度、风险和团队'],['长期选择','产品 / 战略 / 经营','在技术信用基础上连接产品与商业判断']].map(x=>`<article class="card north-card"><small>${x[0]}</small><b>${x[1]}</b><p>${x[2]}</p></article>`).join('');
  $('#careerLine').innerHTML=CAREER_STAGES.map(s=>`<article class="card career-stage ${s.active?'active':''}"><span>${s.index}</span><div class="eyebrow">${s.range}</div><h3>${s.title}</h3><ul>${s.items.map(x=>`<li>${x}</li>`).join('')}</ul></article>`).join('');
  $('#stageGateLayout').innerHTML=`<article class="card gate-summary"><div class="eyebrow">CURRENT STAGE</div><h3>可靠的IP Owner</h3><p class="muted">下一阶段不是由年份自动到来，而是由完整交付、系统问题、验证策略、Review和责任范围共同触发。</p></article><div class="gate-list">${STAGE_GATES.map(g=>`<article class="gate-row"><b>${g.name}</b><p>${g.description}</p><span class="gate-state ${g.state==='已满足'?'done':g.state==='进行中'?'progress':''}">${g.state}</span></article>`).join('')}</div>`;
  const w=currentWeek();$('#goalChain').innerHTML=[['长期目标','芯片项目负责人','能够连接技术、产品、团队与经营'],['年度目标','可靠的IP Owner','形成完整交付与系统理解'],['季度重点','Debug / Spec / Corner','建立可迁移的问题定位与验证策略'],['当前周期',w.title,w.shift],['本周行动',w.tasks.filter(t=>t.priority==='core').map(t=>t.title).join('、'),'工作之外训练，工作内只观察与应用']].map(x=>`<article class="card goal-node"><small>${x[0]}</small><h3>${esc(x[1])}</h3><p>${esc(x[2])}</p></article>`).join('');
  $('#decisionRows').innerHTML=DECISIONS.map(x=>`<tr><td>${x[0]}</td><td>${x[1]}</td><td>${x[2]}</td></tr>`).join('');
  $('#transitionCards').innerHTML=`<article class="card"><div class="eyebrow">MBA & TRANSITION</div><h3>MBA是条件触发的转型工具</h3><ul class="muted"><li>具备子系统或芯片项目交付记录</li><li>具备真实带队、协调和风险决策经历</li><li>英语达到课堂讨论与商业表达水平</li><li>资金覆盖学费、生活费和机会成本</li></ul></article><article class="card"><div class="eyebrow">PRIORITY</div><h3>转型优先级</h3><ol class="muted"><li>芯片 / 技术产品</li><li>企业战略 / 业务管理</li><li>战略投资</li></ol><p class="muted">如果内部持续扩大Scope并进入产品、规划或项目管理，可推迟或放弃MBA。</p></article>`;
  $('#moneyCards').innerHTML=[['当前税前年薪','¥600K'],['3年目标','¥800K'],['5年目标','¥1M'],['10年目标','¥1.5M+']].map(x=>`<article class="card north-card"><small>${x[0]}</small><b>${x[1]}</b></article>`).join('');
  $('#lifeCards').innerHTML=`<article class="card"><h3>50岁前获得退休选择权</h3><p class="muted">目标是被动收入覆盖日常开销。优先建立应急资金、稳定储蓄和长期分散投资，并将MBA资金与高波动资产分开。</p></article><article class="card"><h3>职业成功的底线</h3><p class="muted">即使没有创业、战略投资或提前退休，只要最终成为高收入、能够主导完整芯片项目的负责人，依然是一段成功的职业生涯。</p></article>`
}

function openModal(id){const m=$(id);m.classList.add('open');m.setAttribute('aria-hidden','false');document.body.style.overflow='hidden'}
function closeModals(){$$('.modal').forEach(m=>{m.classList.remove('open');m.setAttribute('aria-hidden','true')});document.body.style.overflow=''}
$$('[data-close-modal]').forEach(x=>x.onclick=closeModals);document.addEventListener('keydown',e=>{if(e.key==='Escape')closeModals()});
$('#openQuick').onclick=()=>{openQuick('daily')};$('#openTools').onclick=()=>{renderTools('prompts');openModal('#toolsModal')};
function bindQuickButton(b){b.onclick=()=>openQuick(b.dataset.quick)}
$$('[data-quick]').forEach(bindQuickButton);
$$('[data-copy-prompt]').forEach(b=>b.onclick=()=>copyPrompt(b.dataset.copyPrompt));
function copyPrompt(key){navigator.clipboard.writeText(PROMPTS[key]?.text||'').then(()=>toast('Prompt已复制')).catch(()=>toast('复制失败，请在工具箱手动复制'))}

function openQuick(mode='daily'){
  openModal('#quickModal');renderQuick(mode)
}
function renderQuick(mode){
  $$('#quickTabs button').forEach(b=>b.classList.toggle('active',b.dataset.mode===mode));
  const map={
    daily:['记录今天','一次口述可以同时包含工作、工作中的学习、工作之外学习和生活。'],
    problem:['记录一个问题','只在问题值得完整复盘时使用，不需要每天都写。'],
    schedule:['添加安排','快速添加工作、额外学习、锻炼或生活事项。'],
    weekly:['导入周度复盘','先将本周事实与Prompt交给AI，再把结果粘贴回来。'],
    ability:['导入能力更新','能力等级必须由真实应用、独立程度和反馈支持。'],
    resume:['导入简历档案','将入职前简历或后续经历先交给AI整理。']
  };
  $('#quickTitle').textContent=map[mode][0];$('#quickDescription').textContent=map[mode][1];
  $('#quickContent').innerHTML=quickForm(mode);
  $$('#quickContent [data-copy]').forEach(b=>b.onclick=()=>copyPrompt(b.dataset.copy));
  $('#quickContent [data-save]')?.addEventListener('click',()=>saveQuick(mode));
  $$('#quickTabs button').forEach(b=>b.onclick=()=>renderQuick(b.dataset.mode));
}
function quickForm(mode){
  if(mode==='schedule')return `<div class="quick-form"><label>日期<input id="qDate" type="date" value="${S.selectedDate}"></label><label>类别<select id="qType"><option value="work">工作</option><option value="learn">额外学习</option><option value="life">锻炼 / 生活</option></select></label><label>标题<input id="qTitle" placeholder="例如：力量训练 / AI口试"></label><label>时间<input id="qTime" placeholder="例如：20:30—21:10"></label><div class="actions"><button class="primary" data-save>保存安排</button></div></div>`;
  const promptKey={daily:'daily',problem:'problem',weekly:'weekly',ability:'ability',resume:'resume'}[mode];
  const placeholders={daily:'粘贴每日记录JSON；无法提供JSON时也可以粘贴完整文本。',problem:'粘贴问题日志JSON。',weekly:'粘贴周复盘JSON。',ability:'粘贴能力更新JSON。',resume:'粘贴简历档案JSON。'};
  const dateField=mode==='daily'||mode==='problem'?`<label>日期<input id="qDate" type="date" value="${S.selectedDate}"></label>`:mode==='weekly'?`<label>周次<input id="qRange" value="${weekStart()}—${addDays(weekStart(),6)}"></label>`:'';
  return `<div class="quick-form"><div class="prompt-box"><div class="prompt-head"><div><b>${PROMPTS[promptKey].title}</b><p class="muted" style="margin:3px 0">${PROMPTS[promptKey].description}</p></div><button class="secondary small-btn" data-copy="${promptKey}">复制Prompt</button></div></div>${dateField}<label>AI输出<textarea id="qText" placeholder="${placeholders[mode]}"></textarea></label><div class="actions"><button class="primary" data-save>保存并更新网站</button></div></div>`
}
function saveQuick(mode){
  try{
    if(mode==='schedule'){
      const title=$('#qTitle').value.trim();if(!title)throw new Error('请填写标题');S.schedule.push({id:uid('schedule'),date:$('#qDate').value||S.selectedDate,type:$('#qType').value,title,time:$('#qTime').value.trim()});
    }else{
      const data=parseMaybeJSON($('#qText').value);
      if(mode==='daily'){data.id=data.id||uid('daily');data.date=data.date||$('#qDate').value||S.selectedDate;S.dailyLogs=S.dailyLogs.filter(x=>x.date!==data.date);S.dailyLogs.push(data);S.selectedDate=data.date}
      if(mode==='problem'){data.id=data.id||uid('problem');data.date=data.date||$('#qDate').value||S.selectedDate;S.problemLogs.unshift(data)}
      if(mode==='weekly'){data.id=data.id||uid('weekly');data.range=data.range||$('#qRange').value;data.createdAt=localISO();S.weeklyReviews.unshift(data);applyWeeklyOutputs(data)}
      if(mode==='ability'){applyAbilityUpdate(data)}
      if(mode==='resume'){S.resume={...S.resume,...data};['education','experiences','projects','skills','awards','versions','candidates'].forEach(k=>S.resume[k]=arr(S.resume[k]))}
    }
    save();closeModals();renderAll();toast('已保存并更新')
  }catch(e){toast(e.message||'内容格式错误')}
}
function applyWeeklyOutputs(data){
  arr(data.nextWeekLearning).forEach((t,i)=>{
    const id=t.id||`custom-${(data.range||localISO()).replace(/\D/g,'')}-${i}`;
    if(!S.customLearning.some(x=>x.id===id))S.customLearning.push({...t,id,priority:t.priority||'regular',kind:t.kind||'学习',output:t.output||'学习记录',fallback:t.fallback||'完成最小版本'})
  });
  arr(data.resumeCandidates).forEach(c=>{if(!S.resume.candidates.some(x=>x.title===c.title))S.resume.candidates.unshift({...c,status:'candidate',source:data.range})});
  if(arr(data.abilityChanges).length)applyAbilityUpdate({abilities:data.abilityChanges.map(a=>({...a,signal:a.evidence||a.change}))})
}
function applyAbilityUpdate(data){
  arr(data.abilities).forEach(u=>{const i=S.abilities.findIndex(a=>a.id===u.id);if(i>=0)S.abilities[i]={...S.abilities[i],...u};else S.abilities.push(u)})
}

function renderTools(tab='prompts'){
  $$('.tool-tabs button').forEach(b=>b.classList.toggle('active',b.dataset.tool===tab));
  $$('.tool-tabs button').forEach(b=>b.onclick=()=>renderTools(b.dataset.tool));
  if(tab==='prompts'){
    $('#toolContent').innerHTML=`<div class="prompt-grid">${Object.entries(PROMPTS).map(([k,p])=>`<article class="prompt-box"><div class="prompt-head"><div><b>${p.title}</b><p class="muted" style="margin:4px 0">${p.description}</p></div><button class="secondary small-btn" data-copy-tool="${k}">复制</button></div><details><summary>查看完整Prompt</summary><pre>${esc(p.text)}</pre></details></article>`).join('')}</div>`;
    $$('[data-copy-tool]').forEach(b=>b.onclick=()=>copyPrompt(b.dataset.copyTool))
  }else{
    $('#toolContent').innerHTML=`<div class="data-grid"><article class="card"><h3>导出全部数据</h3><p class="muted">生成JSON备份，用于跨设备迁移或交给Agent分析。</p><button class="primary" id="exportAll">导出JSON</button></article><article class="card"><h3>导入全部数据</h3><p class="muted">导入会替换当前浏览器中的Career OS数据。</p><label class="file-label">选择JSON<input id="importAll" type="file" accept="application/json"></label></article><article class="card"><h3>生成本周AI材料</h3><p class="muted">汇总本周每日记录、问题、学习状态和安排，不重复生成新事实。</p><button class="secondary" id="exportWeek">导出本周材料</button></article><article class="card"><h3>重置本机数据</h3><p class="muted">只清除当前浏览器的数据，不影响GitHub页面代码。</p><button class="danger" id="resetData">清除数据</button></article></div>`;
    $('#exportAll').onclick=()=>download(`jett-career-os-${localISO()}.json`,JSON.stringify(S,null,2));
    $('#importAll').onchange=e=>{const f=e.target.files[0];if(!f)return;const r=new FileReader();r.onload=()=>{try{S=normalizeState(JSON.parse(r.result));save();renderAll();closeModals();toast('数据已导入')}catch{toast('文件格式错误')}};r.readAsText(f)};
    $('#exportWeek').onclick=exportWeekMaterial;
    $('#resetData').onclick=()=>{if(confirm('确认清除当前浏览器中的全部Career OS数据？')){S=defaultState();save();renderAll();closeModals();toast('已重置')}}
  }
}
function exportWeekMaterial(){
  const start=weekStart(),end=addDays(start,6),payload={range:`${start}—${end}`,dailyLogs:S.dailyLogs.filter(x=>x.date>=start&&x.date<=end),problemLogs:S.problemLogs.filter(x=>x.date>=start&&x.date<=end),learning:{week:S.week,checks:S.checks,tasks:currentWeek().tasks},schedule:S.schedule.filter(x=>x.date>=start&&x.date<=end),prompt:PROMPTS.weekly.text};
  download(`jett-week-material-${start}.json`,JSON.stringify(payload,null,2));toast('本周材料已导出')
}

$('#prevMonth').onclick=()=>{const [y,m]=S.calendarMonth.split('-').map(Number),d=new Date(y,m-2,1);S.calendarMonth=localISO(d).slice(0,7);save();renderCalendar()};
$('#nextMonth').onclick=()=>{const [y,m]=S.calendarMonth.split('-').map(Number),d=new Date(y,m,1);S.calendarMonth=localISO(d).slice(0,7);save();renderCalendar()};
$('#todayDate').onchange=e=>{S.selectedDate=e.target.value||localISO();S.calendarMonth=S.selectedDate.slice(0,7);save();renderToday()};
$('#problemSearch').oninput=renderProblems;$('#problemFilter').onchange=renderProblems;
$('#resumeFile').onchange=e=>{const f=e.target.files[0];if(!f)return;S.resume.filename=f.name;save();renderResume();toast('已记录文件名')};

function renderAll(){renderToday();renderGrowth();renderResume();renderCareer()}
renderAll();
switchView(S.settings.lastView||'today');
