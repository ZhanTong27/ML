window.addEventListener('load',()=>{
  try{
    const weeks=window.CURRICULUM_WEEKS||[];
    const tasks=weeks.flatMap(w=>w.tasks||[]);
    const ids=tasks.map(t=>t.id);
    if(weeks.length!==16||tasks.length!==64||new Set(ids).size!==ids.length){
      console.error('Curriculum integrity check failed',{weeks:weeks.length,tasks:tasks.length,uniqueIds:new Set(ids).size});
      const target=document.getElementById('dynamicWeekTasks');
      if(target)target.innerHTML='<div class="warning">课程数据加载不完整，请强制刷新页面。</div>';
      return;
    }
    const updateGoalChain=()=>{
      const nodes=document.querySelectorAll('#goalChain .goal-node');
      if(!nodes[2])return;
      const h=nodes[2].querySelector('h3'),p=nodes[2].querySelector('p');
      const title='SoC验证第一阶段课程';
      const detail='验证环境 → SoC数据流 → 系统状态与低功耗 → 完整交付';
      if(h&&h.textContent!==title)h.textContent=title;
      if(p&&p.textContent!==detail)p.textContent=detail;
    };
    updateGoalChain();
    const goal=document.getElementById('goalChain');
    if(goal)new MutationObserver(updateGoalChain).observe(goal,{childList:true,subtree:true});
    document.documentElement.dataset.curriculum='soc-verification-16w-v1';
    installCareerModelV3();
  }catch(error){console.error('Curriculum finalization failed',error)}
},{once:true});

function installCareerModelV3(){
  const DAILY_PROMPT=`你是我的长期芯片验证职业发展Agent。我接下来会用自然语言或语音描述今天的工作、问题、处理过程、学习、反馈和生活情况。你必须先等待我明确说“口述结束”，再开始整理和分析。\n\n你的任务不是写形式化日报，也不是立刻布置学习任务，而是同时完成：\n1. 一份准确、完整、可长期回看的 Daily Work Record；\n2. 一份基于证据、允许被推翻的 Daily Diagnosis；\n3. 一份供 Career OS 网站导入的结构化 Patch。\n\n【基本原则】\n- 事实和诊断严格分开；不夸大成果、独立程度、影响或能力。\n- AI只能提出假设，不能把诊断写成确定事实。\n- 每个诊断必须列支持证据、反对证据或替代解释。\n- 一次性Bug不能直接改变16周课程；每日层面只能标记进入周复盘。\n- 严格脱敏：不保留公司代码、日志、信号名、项目代号、客户名、内部参数、地址或未公开架构。\n- 不输出“收获很多、继续努力、保持学习”等无信息量表达。\n- 不因主观感受直接判断能力不足，必须结合可观察行为。\n\n【分析顺序】\n1. 提取事实：任务目标、实际推进、问题、检查、判断变化、结果、未解决事项、反馈、独立程度和下一步。\n2. 形成可阅读工作记录：半年后仍能清楚看懂当天做了什么、为什么卡住、如何处理和结果。\n3. 识别学习信号：区分exposed、understood、applied、transferred和unverified。\n4. 提出诊断假设：knowledge、skill、judgment、transfer、habit、communication、opportunity、environment或insufficient。最多追到证据能够支持的位置。\n5. 评估证据：分别给出支持、反对、替代解释、Evidence Strength和Diagnosis Confidence。证据强度取决于来源质量、多样性、独立程度和迁移程度，不只看数量。\n6. 判断趋势：只能使用first_seen、emerging、repeated、improving、stable、resolved_candidate、contradicted或insufficient_evidence。没有历史数据时不得声称重复或改善。\n7. 判断是否进入周复盘：只有重复、明显影响交付、暴露关键前置缺口、强外部反馈或学过但无法迁移时，interventionFlag才可为true。每日不得直接改课。\n\n【先给我看的内容】\nA. Daily Work Record：日期、整体概述、每项任务的目标/过程/结果/未解决事项/独立程度/反馈/下一步，以及工作中学习、工作外学习、生活和明日安排。\nB. Daily Diagnosis：最重要信号、诊断假设、支持证据、反对证据或替代解释、Evidence Strength、Diagnosis Confidence、趋势、可能影响、是否进入周复盘、缺失信息。证据不足时明确写“暂不形成诊断”。\n\n【最后输出Career OS Patch】\n最后单独输出一段纯JSON，不要在JSON中加入注释，严格使用以下结构：\n{\n  "schemaVersion":"career-os-v3-daily-1",\n  "patchId":"YYYY-MM-DD-唯一短标识",\n  "date":"YYYY-MM-DD",\n  "dailyRecord":{\n    "summary":"今日整体概述",\n    "workItems":[{\n      "id":"唯一ID",\n      "title":"脱敏任务名称",\n      "goal":"任务目标",\n      "process":["按时间和因果顺序描述处理过程"],\n      "result":"当前结果",\n      "status":"completed|in_progress|blocked|waiting",\n      "unresolved":["仍未解决事项"],\n      "independence":"independent|prompted|assisted|unknown",\n      "feedback":[{"source":"主管|导师|同事|AI|其他","content":"脱敏反馈"}],\n      "next":["下一步"]\n    }],\n    "workLearning":[{"statement":"工作中新理解","masteryStatus":"exposed|understood|applied|transferred|unverified","basis":"判断依据"}],\n    "outsideLearning":[{"title":"工作外学习","result":"完成情况","courseRelation":"w1-w16或none"}],\n    "life":[{"title":"生活或锻炼事项","result":"情况"}],\n    "tomorrow":{"work":[],"learning":[],"life":[]}\n  },\n  "facts":[{\n    "id":"唯一ID",\n    "type":"work|problem|learning|feedback|application|assessment",\n    "statement":"不混入诊断的事实",\n    "sourceWorkItemId":"对应工作项ID或null",\n    "immutable":true\n  }],\n  "diagnoses":[{\n    "id":"稳定诊断主题ID",\n    "topic":"诊断主题",\n    "hypothesis":"使用可能、倾向于、目前怀疑等假设性语言",\n    "gapType":"knowledge|skill|judgment|transfer|habit|communication|opportunity|environment|insufficient",\n    "supportingEvidence":["本次支持证据"],\n    "counterEvidence":["反对证据"],\n    "alternativeExplanations":["其他解释"],\n    "evidenceStrength":"low|medium|high",\n    "diagnosisConfidence":0,\n    "confidenceReason":"置信度依据",\n    "trend":"first_seen|emerging|repeated|improving|stable|resolved_candidate|contradicted|insufficient_evidence",\n    "impact":["可能影响"],\n    "interventionFlag":false,\n    "weeklyReviewReason":"进入周复盘的原因"\n  }],\n  "evidence":[{\n    "id":"Evidence唯一ID",\n    "diagnosisId":"对应诊断ID",\n    "direction":"support|counter|neutral",\n    "sourceType":"real_work|oral_exam|controlled_practice|novel_case|artifact|supervisor_feedback|self_report",\n    "sourceDate":"YYYY-MM-DD",\n    "sourceFactIds":["关联Fact ID"],\n    "statement":"证据具体说明什么",\n    "quality":"low|medium|high",\n    "independence":"independent|prompted|assisted|unknown",\n    "transferLevel":"none|same_context|similar_context|novel_context",\n    "limitations":["证据限制"]\n  }],\n  "careerModelUpdates":[{\n    "diagnosisId":"对应诊断ID",\n    "action":"create_hypothesis|add_evidence|update_confidence|add_counter_evidence|mark_for_review|no_change",\n    "previousConfidence":null,\n    "newConfidence":0,\n    "evidenceStrength":"low|medium|high",\n    "reason":"更新理由"\n  }],\n  "weeklyObservations":[{"topic":"继续观察主题","reason":"原因","priority":"low|medium|high"}],\n  "roadmapIntervention":{"flag":false,"proposalOnly":true,"reason":"每日不直接修改课程"},\n  "missingInformation":["仍需确认的信息"],\n  "privacyCheck":{"containsSensitiveDetails":false,"redactionsMade":["已脱敏内容类型"]}\n}\n\n【输出前自检】\n工作记录是否半年后仍可读；Facts是否混入判断；Diagnosis是否被写成结论；证据与替代解释是否齐全；Evidence Strength与Confidence是否混淆；是否因单日问题改课；是否夸大独立程度；JSON字段是否严格一致；是否完成脱敏；历史不足时是否诚实标记insufficient_evidence。`;

  PROMPTS.daily={title:'每日芯片工作记录与诊断Prompt',description:'在对话中口述一次，同时生成可回看的工作记录、证据化诊断和网站Patch。',text:DAILY_PROMPT};

  S.facts=arr(S.facts);S.evidence=arr(S.evidence);S.diagnoses=arr(S.diagnoses);S.careerModel=arr(S.careerModel);S.patchHistory=arr(S.patchHistory);S.weeklyObservations=arr(S.weeklyObservations);
  S.version='3.0';save();

  injectV3Styles();
  injectV3Sections();
  const oldNormalize=normalizeState;
  normalizeState=function(s){const out=oldNormalize(s);out.facts=arr(out.facts);out.evidence=arr(out.evidence);out.diagnoses=arr(out.diagnoses);out.careerModel=arr(out.careerModel);out.patchHistory=arr(out.patchHistory);out.weeklyObservations=arr(out.weeklyObservations);return out};
  const oldDefault=defaultState;
  defaultState=function(){const out=oldDefault();return{...out,version:'3.0',facts:[],evidence:[],diagnoses:[],careerModel:[],patchHistory:[],weeklyObservations:[]}};

  const oldRenderToday=renderToday;
  renderToday=function(){oldRenderToday();renderDailyRecordDetail();renderWorkRecordArchive()};
  const oldRenderGrowth=renderGrowth;
  renderGrowth=function(){oldRenderGrowth();renderCareerModel();renderEvidenceTimeline()};
  const oldRenderTools=renderTools;
  renderTools=function(tab='prompts'){oldRenderTools(tab);if(tab==='prompts'){const intro=document.createElement('article');intro.className='card v3-principles';intro.innerHTML='<div class="eyebrow">CAREER AGENT WORKFLOW</div><h3>网站不调用AI：对话负责推理，网站负责保存</h3><p>你向我口述当天工作，我返回 Daily Work Record、Daily Diagnosis 和 Career OS Patch。网站只导入经过Review的Patch。</p><div class="tag-row"><span class="tag">事实不可覆盖</span><span class="tag">证据可追溯</span><span class="tag">诊断可修正</span><span class="tag">每日不直接改课</span></div>';document.querySelector('#toolContent .prompt-grid')?.prepend(intro)}};

  const oldQuickForm=quickForm;
  quickForm=function(mode){if(mode!=='daily')return oldQuickForm(mode);return `<div class="quick-form"><article class="card v3-flow"><div class="eyebrow">CHAT → PATCH → WEBSITE</div><h3>先在我们的对话里完成分析</h3><ol><li>复制Prompt并向我口述今天做了什么</li><li>我生成工作记录、诊断和结构化Patch</li><li>只粘贴最后的JSON Patch到下方</li></ol></article><div class="prompt-box"><div class="prompt-head"><div><b>${PROMPTS.daily.title}</b><p class="muted" style="margin:3px 0">${PROMPTS.daily.description}</p></div><button class="secondary small-btn" data-copy="daily">复制完整Prompt</button></div></div><label>日期<input id="qDate" type="date" value="${S.selectedDate}"></label><label>Career OS Patch<textarea id="qText" placeholder="粘贴 schemaVersion 为 career-os-v3-daily-1 的JSON Patch"></textarea></label><div class="actions"><button class="primary" data-save>校验并导入网站</button></div></div>`};

  const oldSaveQuick=saveQuick;
  saveQuick=function(mode){if(mode!=='daily')return oldSaveQuick(mode);try{const patch=parseMaybeJSON(document.querySelector('#qText').value);if(patch.raw||patch.schemaVersion!=='career-os-v3-daily-1')throw new Error('请粘贴完整的V3 Daily Patch JSON');applyDailyPatchV3(patch);save();closeModals();renderAll();toast('工作记录、Evidence和Career Model已更新')}catch(e){toast(e.message||'Patch格式错误')}};

  const oldRenderAll=renderAll;
  renderAll=function(){oldRenderAll();renderDailyRecordDetail();renderWorkRecordArchive();renderCareerModel();renderEvidenceTimeline()};

  document.title='Jett · Career OS V3.0';
  const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V3.0';
  renderAll();
}

function applyDailyPatchV3(patch){
  if(S.patchHistory.some(x=>x.patchId===patch.patchId))throw new Error('这个Patch已经导入过');
  const date=patch.date||localISO();const r=patch.dailyRecord||{};
  const log={id:patch.patchId||uid('daily'),patchId:patch.patchId,date,summary:r.summary||'每日工作记录',workItems:arr(r.workItems),work:arr(r.workItems).map(w=>({title:w.title,progress:w.process?.join('；'),status:w.status,result:w.result,unknown:arr(w.unresolved).join('；'),next:arr(w.next).join('；')})),workLearning:arr(r.workLearning),outsideLearning:arr(r.outsideLearning),life:arr(r.life),tomorrow:r.tomorrow||{work:[],learning:[],life:[]},diagnosisIds:arr(patch.diagnoses).map(x=>x.id),privacyCheck:patch.privacyCheck};
  S.dailyLogs=S.dailyLogs.filter(x=>x.date!==date);S.dailyLogs.push(log);S.selectedDate=date;
  arr(patch.facts).forEach(f=>{if(!S.facts.some(x=>x.id===f.id))S.facts.push({...f,date,patchId:patch.patchId,immutable:true})});
  arr(patch.diagnoses).forEach(d=>{const idx=S.diagnoses.findIndex(x=>x.id===d.id);const item={...d,date,lastSeen:date,patchId:patch.patchId};if(idx>=0)S.diagnoses[idx]={...S.diagnoses[idx],...item,firstSeen:S.diagnoses[idx].firstSeen||date};else S.diagnoses.push({...item,firstSeen:date})});
  arr(patch.evidence).forEach(e=>{if(!S.evidence.some(x=>x.id===e.id))S.evidence.push({...e,patchId:patch.patchId})});
  arr(patch.careerModelUpdates).forEach(u=>{
    const diagnosis=S.diagnoses.find(d=>d.id===u.diagnosisId)||{};let idx=S.careerModel.findIndex(x=>x.diagnosisId===u.diagnosisId);
    const ev=S.evidence.filter(e=>e.diagnosisId===u.diagnosisId),supports=ev.filter(e=>e.direction==='support').length,counters=ev.filter(e=>e.direction==='counter').length;
    const model={diagnosisId:u.diagnosisId,topic:diagnosis.topic||u.diagnosisId,hypothesis:diagnosis.hypothesis||'',diagnosisConfidence:Number(u.newConfidence??diagnosis.diagnosisConfidence??0),evidenceStrength:u.evidenceStrength||diagnosis.evidenceStrength||'low',trend:diagnosis.trend||'insufficient_evidence',supportCount:supports,counterCount:counters,firstSeen:idx>=0?S.careerModel[idx].firstSeen:date,lastSeen:date,alternativeExplanations:arr(diagnosis.alternativeExplanations),impact:arr(diagnosis.impact),interventionFlag:!!diagnosis.interventionFlag,lastReason:u.reason||diagnosis.confidenceReason||''};
    if(idx>=0)S.careerModel[idx]={...S.careerModel[idx],...model};else S.careerModel.push(model)
  });
  arr(patch.weeklyObservations).forEach(o=>S.weeklyObservations.push({...o,date,patchId:patch.patchId}));
  S.patchHistory.push({patchId:patch.patchId,date,importedAt:new Date().toISOString(),counts:{facts:arr(patch.facts).length,evidence:arr(patch.evidence).length,diagnoses:arr(patch.diagnoses).length}})
}

function injectV3Sections(){
  const recent=document.getElementById('recentRecords');if(recent&&!document.getElementById('dailyRecordDetail'))recent.insertAdjacentHTML('beforebegin','<section class="content-section v3-record-section"><div class="section-title split-title"><div><div class="eyebrow">DAILY WORK RECORD</div><h2>当日完整工作记录</h2><p>工作事实用于回看；诊断单独呈现，不与事实混写。</p></div><button class="primary" data-quick="daily">导入今日Patch</button></div><div id="dailyRecordDetail"></div></section>');
  const growth=document.getElementById('growth');if(growth&&!document.getElementById('career-model')){
    const nav=growth.querySelector('.page-index');nav?.insertAdjacentHTML('afterbegin','<button data-scroll="career-model">Career Model</button>');
    nav?.insertAdjacentHTML('beforeend','<button data-scroll="evidence-timeline">Evidence</button>');
    const execution=document.getElementById('current-execution');execution?.insertAdjacentHTML('beforebegin','<section class="content-section" id="career-model"><div class="section-title"><div class="eyebrow">CURRENT CAREER MODEL</div><h2>当前职业诊断模型</h2><p>不是能力打分，而是可修正的假设、证据强度和诊断置信度。</p></div><div class="career-model-grid" id="careerModelGrid"></div></section>');
    const problem=document.getElementById('problem-journal');problem?.insertAdjacentHTML('beforebegin','<section class="content-section" id="evidence-timeline"><div class="section-title"><div class="eyebrow">EVIDENCE TIMELINE</div><h2>证据时间线</h2><p>每条判断都能追溯到具体工作、口试、案例、输出物或外部反馈。</p></div><div class="stack" id="evidenceFeed"></div></section>')
  }
  document.querySelectorAll('[data-quick]').forEach(b=>{if(!b.dataset.v3bound){bindQuickButton(b);b.dataset.v3bound='1'}});
  document.querySelectorAll('.page-index button').forEach(b=>{if(!b.dataset.v3bound){b.onclick=()=>{document.getElementById(b.dataset.scroll)?.scrollIntoView({behavior:'smooth'});b.closest('.page-index').querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===b))};b.dataset.v3bound='1'}})
}

function renderDailyRecordDetail(){
  const box=document.getElementById('dailyRecordDetail');if(!box)return;const log=S.dailyLogs.find(x=>x.date===S.selectedDate);if(!log){box.innerHTML='<div class="empty">这一天还没有工作记录。向我完成口述后，将V3 Patch导入即可。</div>';return}
  const items=arr(log.workItems).length?log.workItems:arr(log.work).map((w,i)=>({id:`legacy-${i}`,title:w.title||String(w),goal:'旧版记录未拆分目标',process:[w.progress||w.problem||''],result:w.result||'',status:w.status||'unknown',unresolved:arr(w.unknown),independence:'unknown',feedback:[],next:arr(w.next)}));
  const diagnoses=S.diagnoses.filter(d=>arr(log.diagnosisIds).includes(d.id)||d.date===log.date);
  box.innerHTML=`<article class="card daily-full"><header><div><div class="eyebrow">${esc(log.date)}</div><h3>${esc(log.summary||'每日工作记录')}</h3></div><span class="tag work">${items.length}项工作</span></header>${items.map(w=>`<section class="work-item-detail"><div class="work-item-head"><h4>${esc(w.title||'工作任务')}</h4><span class="status-pill">${esc(workStatusLabel(w.status))}</span></div><p><b>目标：</b>${esc(w.goal||'待补充')}</p><div><b>处理过程：</b><ol>${arr(w.process).map(x=>`<li>${esc(x)}</li>`).join('')}</ol></div><p><b>结果：</b>${esc(w.result||'待补充')}</p>${arr(w.unresolved).length?`<p><b>未解决：</b>${arr(w.unresolved).map(esc).join('；')}</p>`:''}<p><b>独立程度：</b>${esc(independenceLabel(w.independence))}</p>${arr(w.feedback).length?`<div><b>反馈：</b><ul>${arr(w.feedback).map(f=>`<li>${esc(f.source||'反馈')}：${esc(f.content||f)}</li>`).join('')}</ul></div>`:''}${arr(w.next).length?`<p><b>下一步：</b>${arr(w.next).map(esc).join('；')}</p>`:''}</section>`).join('')}<div class="grid2 record-bottom"><div><h4>工作中学习</h4>${arr(log.workLearning).length?`<ul>${arr(log.workLearning).map(x=>`<li>${esc(x.statement||x)}${x.masteryStatus?` <span class="tag">${esc(x.masteryStatus)}</span>`:''}</li>`).join('')}</ul>`:'<p class="muted">暂无明确学习证据</p>'}</div><div><h4>当日诊断</h4>${diagnoses.length?diagnoses.map(d=>`<article class="mini-diagnosis"><b>${esc(d.topic)}</b><span>${Number(d.diagnosisConfidence||0)}%</span><p>${esc(d.hypothesis)}</p></article>`).join(''):'<p class="muted">暂无诊断或证据不足</p>'}</div></div></article>`
}

function renderWorkRecordArchive(){
  const recent=document.getElementById('recentRecords');if(!recent)return;const logs=[...S.dailyLogs].sort((a,b)=>(b.date||'').localeCompare(a.date||'')).slice(0,6);recent.innerHTML=logs.length?logs.map(x=>`<article class="card record-card clickable-record" data-record-date="${esc(x.date)}"><header><span class="eyebrow">${esc(x.date||'未标日期')}</span></header><h3>${esc(x.summary||'每日工作记录')}</h3><p>${esc(arr(x.workItems)[0]?.title||arr(x.work)[0]?.title||'未拆分具体工作')}</p><div class="tag-row"><span class="tag work">工作 ${arr(x.workItems).length||arr(x.work).length}</span><span class="tag">Facts ${S.facts.filter(f=>f.date===x.date).length}</span><span class="tag learn">Evidence ${S.evidence.filter(e=>e.sourceDate===x.date).length}</span></div><footer>点击查看当日完整记录</footer></article>`).join(''):'<div class="empty" style="grid-column:1/-1">还没有每日工作记录。</div>';recent.querySelectorAll('[data-record-date]').forEach(c=>c.onclick=()=>{S.selectedDate=c.dataset.recordDate;save();renderToday();document.getElementById('dailyRecordDetail')?.scrollIntoView({behavior:'smooth'})})
}

function renderCareerModel(){
  const box=document.getElementById('careerModelGrid');if(!box)return;const models=[...S.careerModel].sort((a,b)=>(b.diagnosisConfidence||0)-(a.diagnosisConfidence||0));box.innerHTML=models.length?models.map(m=>`<article class="card model-card"><div class="model-head"><div><div class="eyebrow">${esc(trendLabel(m.trend))}</div><h3>${esc(m.topic)}</h3></div><b>${Number(m.diagnosisConfidence||0)}%</b></div><p>${esc(m.hypothesis||'诊断假设待补充')}</p><div class="model-meter"><i style="width:${Math.max(0,Math.min(100,Number(m.diagnosisConfidence||0)))}%"></i></div><div class="model-stats"><span>证据强度 <b>${esc(strengthLabel(m.evidenceStrength))}</b></span><span>支持 <b>${m.supportCount||0}</b></span><span>反对 <b>${m.counterCount||0}</b></span></div><p><b>最近依据：</b>${esc(m.lastReason||'待补充')}</p>${arr(m.alternativeExplanations).length?`<details><summary>替代解释</summary><ul>${arr(m.alternativeExplanations).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`:''}${m.interventionFlag?'<span class="tag problem">进入周复盘Review</span>':'<span class="tag good">继续观察，不改课程</span>'}</article>`).join(''):'<div class="empty" style="grid-column:1/-1">还没有足够证据形成Career Model。第一份V3 Daily Patch导入后从假设开始积累。</div>'
}

function renderEvidenceTimeline(){
  const box=document.getElementById('evidenceFeed');if(!box)return;const items=[...S.evidence].sort((a,b)=>(b.sourceDate||'').localeCompare(a.sourceDate||''));box.innerHTML=items.length?items.slice(0,50).map(e=>{const d=S.diagnoses.find(x=>x.id===e.diagnosisId);return `<article class="entry evidence-entry"><header><span>${esc(e.sourceDate||'未标日期')} · ${esc(sourceTypeLabel(e.sourceType))}</span><div class="tag-row"><span class="tag ${e.direction==='counter'?'problem':e.direction==='support'?'good':''}">${esc(e.direction==='support'?'支持':e.direction==='counter'?'反对':'中性')}</span><span class="tag">质量 ${esc(strengthLabel(e.quality))}</span></div></header><h3>${esc(d?.topic||e.diagnosisId||'证据')}</h3><p>${esc(e.statement)}</p><p class="muted">独立程度：${esc(independenceLabel(e.independence))}　·　迁移：${esc(transferLabel(e.transferLevel))}</p>${arr(e.limitations).length?`<details><summary>证据限制</summary><ul>${arr(e.limitations).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></details>`:''}</article>`}).join(''):'<div class="empty">还没有Evidence。网站不会凭空评价你，只保存Agent Review后的证据。</div>'
}

function injectV3Styles(){if(document.getElementById('career-v3-style'))return;const s=document.createElement('style');s.id='career-v3-style';s.textContent=`.v3-record-section{margin-top:28px}.daily-full>header{display:flex;justify-content:space-between;gap:16px;align-items:flex-start;margin-bottom:16px}.work-item-detail{padding:16px 0;border-top:1px solid var(--line2)}.work-item-detail:first-of-type{border-top:0}.work-item-head{display:flex;justify-content:space-between;gap:12px;align-items:center}.work-item-detail h4{margin:0}.work-item-detail ol,.work-item-detail ul{color:var(--muted);line-height:1.7}.record-bottom{margin-top:14px;padding-top:14px;border-top:1px solid var(--line)}.mini-diagnosis{border-left:2px solid var(--cyan);padding:8px 10px;margin:7px 0;background:rgba(53,214,232,.05)}.mini-diagnosis b,.mini-diagnosis span{display:inline-block}.mini-diagnosis span{float:right;color:var(--cyan);font-weight:700}.mini-diagnosis p{clear:both;margin:5px 0;color:var(--muted)}.clickable-record{cursor:pointer}.clickable-record:hover{border-color:var(--cyan);transform:translateY(-1px)}.career-model-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.model-head{display:flex;justify-content:space-between;gap:12px}.model-head b{font-size:28px;color:var(--cyan)}.model-meter{height:6px;background:#17303c;border-radius:8px;overflow:hidden;margin:12px 0}.model-meter i{display:block;height:100%;background:linear-gradient(90deg,#25bcd0,#6ce8ee)}.model-stats{display:grid;grid-template-columns:repeat(3,1fr);gap:6px;margin:10px 0}.model-stats span{padding:8px;background:rgba(255,255,255,.03);border:1px solid var(--line2);border-radius:7px;font-size:10px;color:var(--muted)}.model-stats b{display:block;color:var(--text);margin-top:3px}.v3-flow ol{color:var(--muted);line-height:1.8}.v3-principles{grid-column:1/-1}.evidence-entry{border-left:3px solid #2f6975}@media(max-width:850px){.career-model-grid{grid-template-columns:1fr}.model-stats{grid-template-columns:1fr 1fr 1fr}.daily-full>header{flex-direction:column}}`;document.head.appendChild(s)}

function workStatusLabel(x){return({completed:'已完成',in_progress:'进行中',blocked:'阻塞',waiting:'等待',unknown:'待确认'})[x]||x||'待确认'}
function independenceLabel(x){return({independent:'独立完成',prompted:'提示后完成',assisted:'他人协助',unknown:'待确认'})[x]||x||'待确认'}
function strengthLabel(x){return({low:'低',medium:'中',high:'高'})[x]||x||'待判断'}
function trendLabel(x){return({first_seen:'首次出现',emerging:'正在形成',repeated:'重复出现',improving:'改善中',stable:'稳定',resolved_candidate:'可能已解决',contradicted:'受到反证',insufficient_evidence:'证据不足'})[x]||x||'证据不足'}
function sourceTypeLabel(x){return({real_work:'真实工作',oral_exam:'AI口试',controlled_practice:'受控练习',novel_case:'陌生案例',artifact:'学习产出',supervisor_feedback:'主管/导师反馈',self_report:'自述'})[x]||x||'未知来源'}
function transferLabel(x){return({none:'无迁移',same_context:'同一情境',similar_context:'相似情境',novel_context:'陌生情境'})[x]||x||'待确认'}
