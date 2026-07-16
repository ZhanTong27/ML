window.addEventListener('load',()=>{try{installDailyIntegrityV551()}catch(e){console.error('Career OS V5.5.1 Daily integrity hotfix failed',e)}},{once:true});

function installDailyIntegrityV551(){
  backupCanonicalStateV551();
  normalizeDailyStoreV551(S);
  if(typeof ensureHistoricalDailyV53==='function')ensureHistoricalDailyV53();
  normalizeDailyStoreV551(S);
  if(!hasUsableDailyV551('2026-07-15')&&typeof seedDaily20260715==='function')seedDaily20260715();
  normalizeDailyStoreV551(S);

  const oldNormalize=normalizeState;
  normalizeState=function(state){return normalizeDailyStoreV551(oldNormalize(state))};

  selectedDaily=function(){return dailyByDateV551(S.selectedDate)};
  renderDailyCard=renderDailyCardV551;
  renderCalendarDetail=renderCalendarDetailV551;

  const oldSaveQuick=saveQuick;
  saveQuick=function(mode){oldSaveQuick(mode);if(mode==='daily'){normalizeDailyStoreV551(S);save();renderAll()}};

  const oldAll=renderAll;
  renderAll=function(){normalizeDailyStoreV551(S);oldAll();applyIdentityV551()};

  if(!S.dailyIntegrityV551){
    const latest=latestDailyDateV551();
    if(latest&&!hasUsableDailyV551(S.selectedDate)){S.selectedDate=latest;S.calendarMonth=latest.slice(0,7)}
    S.dailyIntegrityV551={installedAt:localISO(),schema:'daily-display-v551',canonicalDates:['2026-07-13','2026-07-14','2026-07-15']};
  }
  save();renderAll()
}

function backupCanonicalStateV551(){
  try{
    const source='zhantong-career-os-v5',backup='zhantong-career-os-v5-pre-v551-backup';
    const raw=localStorage.getItem(source);
    if(raw&&!localStorage.getItem(backup))localStorage.setItem(backup,raw)
  }catch{}
}

function dailyDateV551(log){return log?.date||log?.dailyRecord?.date||log?.sourceDate||''}
function dailyWorkV551(log){
  if(!log)return[];
  const sets=[log.work,log.workItems,log.dailyRecord?.workItems];
  const source=sets.find(x=>Array.isArray(x)&&x.length)||[];
  return source.map((item,i)=>typeof item==='string'?{id:`work-${dailyDateV551(log)}-${i+1}`,title:item,progress:'',status:'unknown',problem:''}:{...item,title:item.title||item.name||`工作项 ${i+1}`,progress:item.progress||arr(item.process).join('；'),problem:item.problem||item.result||arr(item.unresolved).join('；')})
}
function dailyByDateV551(date){return arr(S.dailyLogs).find(x=>dailyDateV551(x)===date)}
function hasUsableDailyV551(date){const log=dailyByDateV551(date);return!!(log&&dailyWorkV551(log).length)}
function latestDailyDateV551(){return arr(S.dailyLogs).map(dailyDateV551).filter(Boolean).sort().at(-1)||''}

function normalizeDailyStoreV551(state){
  state.dailyLogs=arr(state.dailyLogs);
  const byDate=new Map();
  state.dailyLogs.forEach((raw,index)=>{
    const date=dailyDateV551(raw);if(!date)return;
    const work=dailyWorkV551(raw),record=raw.dailyRecord||{};
    const normalized={...raw,date,summary:raw.summary||record.summary||'每日工作记录',work,workItems:work,workLearning:arr(raw.workLearning).length?arr(raw.workLearning):arr(record.workLearning),outsideLearning:arr(raw.outsideLearning).length?arr(raw.outsideLearning):arr(record.outsideLearning),life:arr(raw.life).length?arr(raw.life):arr(record.life),tomorrow:raw.tomorrow||record.tomorrow||{},diagnoses:arr(raw.diagnoses).length?arr(raw.diagnoses):arr(record.diagnoses),sourceOrder:index};
    const previous=byDate.get(date);
    if(!previous){byDate.set(date,normalized);return}
    const prevScore=dailyWorkV551(previous).length*100+String(previous.summary||'').length;
    const nextScore=work.length*100+String(normalized.summary||'').length;
    const richer=nextScore>=prevScore?normalized:previous,other=richer===normalized?previous:normalized;
    byDate.set(date,{...other,...richer,work:dailyWorkV551(richer).length?dailyWorkV551(richer):dailyWorkV551(other),workItems:dailyWorkV551(richer).length?dailyWorkV551(richer):dailyWorkV551(other)})
  });
  state.dailyLogs=[...byDate.values()].sort((a,b)=>a.date.localeCompare(b.date));
  return state
}

function renderDailyCardV551(log){
  const work=dailyWorkV551(log),outside=arr(log.outsideLearning),life=arr(log.life),diagnoses=arr(log.diagnoses);
  return `<article class="card record-card"><header><span class="eyebrow">${esc(dailyDateV551(log)||'未标日期')}</span></header><h3>${esc(log.summary||'每日记录')}</h3><p>${work[0]?esc(work[0].title):'未拆分具体工作任务'}</p><div class="tag-row"><span class="tag work">工作 ${work.length}</span><span class="tag problem">观察 ${diagnoses.length}</span><span class="tag learn">额外学习 ${outside.length}</span><span class="tag life">生活 ${life.length}</span></div><footer>精力：${esc(log.energy||'未记录')}</footer></article>`
}

function renderCalendarDetailV551(){
  const date=S.selectedDate,log=dailyByDateV551(date),work=dailyWorkV551(log),problems=arr(S.problemLogs).filter(x=>x.date===date),schedules=arr(S.schedule).filter(x=>x.date===date);
  const workHtml=log?`<p class="muted"><b>工作记录：</b>${esc(log.summary||'已记录')}</p>${work.length?`<p class="muted"><b>工作项 ${work.length}：</b>${work.slice(0,4).map(x=>esc(x.title)).join('；')}${work.length>4?'；…':''}</p>`:''}`:'<p class="muted">当天没有工作记录。</p>';
  $('#calendarDayDetail').innerHTML=`<div class="card-head"><div><div class="eyebrow">DAY DETAIL</div><h3>${dateLabel(date)}</h3></div><button class="secondary small-btn" data-quick="schedule">添加安排</button></div>${workHtml}${problems.length?`<p class="muted"><b>问题：</b>${problems.map(x=>esc(x.title||'问题记录')).join('、')}</p>`:''}${schedules.length?`<p class="muted"><b>安排：</b>${schedules.map(x=>`${esc(x.time||'')} ${esc(x.title)}`).join('；')}</p>`:''}`;
  $('#calendarDayDetail').querySelectorAll('[data-quick]').forEach(bindQuickButton)
}

function newerCareerIdentityV551(){
  return typeof seedDaily20260716==='function'||Boolean(window.CAREER_OS_V56)||String(S?.version||'').startsWith('5.6')
}

function applyIdentityV551(){
  window.CAREER_OS_V551={version:'5.5.1',type:'incremental-hotfix',dailyCounts:Object.fromEntries(['2026-07-13','2026-07-14','2026-07-15'].map(d=>[d,dailyWorkV551(dailyByDateV551(d)).length])),backupKey:'zhantong-career-os-v5-pre-v551-backup'};
  if(newerCareerIdentityV551())return;
  document.title='Zhantong · Career OS V5.5.1';
  const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.5.1';
  S.version='5.5.1'
}
