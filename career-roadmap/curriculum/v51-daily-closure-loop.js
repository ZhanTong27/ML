window.addEventListener('load',()=>{try{installDailyClosureV51()}catch(e){console.error('Daily Closure V5.1 failed',e)}},{once:true});

function installDailyClosureV51(){
  S.dailyClosures=arr(S.dailyClosures);S.closureUI=S.closureUI||{view:'date'};
  const oldNormalize=normalizeState;normalizeState=function(s){const o=oldNormalize(s);o.dailyClosures=arr(o.dailyClosures);o.closureUI=o.closureUI||{view:'date'};return o};
  const oldDefault=defaultState;defaultState=function(){return{...oldDefault(),dailyClosures:[],closureUI:{view:'date'}}};
  installClosurePromptsV51();injectDailyClosureV51();injectDailyClosureStylesV51();
  const oldSaveQuick=saveQuick;saveQuick=function(mode){if(mode!=='daily')return oldSaveQuick(mode);saveDailyWithClosureV51()};
  if(typeof applyDailyPatchV3==='function'){
    const oldApplyDaily=applyDailyPatchV3;applyDailyPatchV3=function(patch){oldApplyDaily(patch);importClosuresFromDailyV51(patch,patch.date||patch.dailyRecord?.date||localISO());save()}
  }
  backfillDailyClosuresV51();
  const oldToday=renderToday;renderToday=function(){oldToday();renderDailyClosureV51();injectClosureActionsIntoTodayV51()};
  const oldAll=renderAll;renderAll=function(){oldAll();renderDailyClosureV51();injectClosureActionsIntoTodayV51()};
  exportWeekMaterial=function(){const start=weekStart(),end=addDays(start,6),payload={schemaVersion:'zhantong-week-material-v51',range:`${start}—${end}`,dailyLogs:S.dailyLogs.filter(x=>x.date>=start&&x.date<=end),dailyClosures:S.dailyClosures.filter(x=>x.date>=start&&x.date<=end||!['resolved','deferred'].includes(x.status)),problemManual:arr(S.manualEntries).filter(x=>x.date>=start&&x.date<=end),learning:{week:S.week,checks:S.checks,tasks:currentWeek().tasks},frontier:S.frontierV50,aiExperiments:S.aiVerificationV47,schedule:S.schedule.filter(x=>x.date>=start&&x.date<=end),prompt:PROMPTS.weekly.text};download(`zhantong-week-review-${start}.json`,JSON.stringify(payload,null,2));toast('本周材料已导出，包含问题闭环状态')};
  document.title='Zhantong · Career OS V5.1';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.1';S.version='5.1';save();renderAll()
}

function installClosurePromptsV51(){
  const daily={title:'每日记录与问题闭环Prompt',description:'记录事实和Diagnosis后，为重要未解决问题生成建议方案、AI深挖Prompt与闭环证据。',text:`你是我的芯片验证职业发展与问题闭环Agent。我会口述今天的工作、疑问、遗漏、反馈和生活情况。请等待我明确说“口述结束”后再整理。

目标不是只做记录，而是让当天值得处理的问题进入闭环。先严格区分事实与诊断，再对仍未解决的问题给出下一步。但不得假装知道公司内部实现，也不能把AI建议写成已验证结论。

输出纯JSON，不使用Markdown代码块：
{
  "schemaVersion":"career-os-v51-daily-closure-1",
  "date":"YYYY-MM-DD",
  "summary":"今日整体概述",
  "work":[{"id":"工作项id","title":"任务","progress":"推进过程","status":"completed/in_progress/blocked","problem":"事实性的现象、处理和结果","unknown":"仍不清楚的地方","next":"工作中的下一步"}],
  "workLearning":["工作中形成的新理解"],
  "outsideLearning":[],
  "life":[],
  "tomorrow":{"work":[],"learning":[],"life":[]},
  "energy":"充足/正常/偏低/高压",
  "diagnosis":{"type":"知识缺口/技能缺口/判断缺口/迁移失败/执行习惯/沟通协作/机会不足/临时环境/无明确缺口","evidence":"判断依据","needsCourseChange":false},
  "aiObservation":{"signals":[],"repeats":[],"weeklyWatch":[],"candidate":""},
  "closureActions":[{
    "id":"closure-日期-短标识",
    "sourceWorkItemId":"关联工作项id",
    "title":"需要闭环的问题",
    "category":"debug/knowledge/environment/coordination/evidence/process",
    "priority":"high/medium/low",
    "problem":"已经确认的事实、当前疑问和为什么尚未解决",
    "solutionMode":"direct_action/minimum_experiment/ask_owner/structured_learning/collect_evidence",
    "recommendedApproach":["当天或次日可执行的最小动作，不要写空泛建议"],
    "aiPrompt":"可直接复制给AI继续深挖的脱敏Prompt",
    "closureEvidence":["看到什么客观结果才算闭环"],
    "owner":"self/design/pm/colleague/shared",
    "status":"open/waiting/in_progress",
    "nextReviewDate":"YYYY-MM-DD或空",
    "courseImpact":"none/weekly_watch/propose_dynamic_task",
    "safetyNote":"需要脱敏或必须在公司批准环境中确认的边界"
  }],
  "gaps":["仍需补充的信息"]
}

生成closureActions时遵守：
1. 不把每个小疑问都变成任务；只选择影响交付、可能重复、暴露关键前置缺口或用户明确想解决的问题。
2. 能直接处理的给最小动作；存在多个解释的给最小实验；依赖他人的给沟通问题和责任人；信息不足的先列信息收集，不编造答案。
3. AI Prompt必须要求对方区分已知事实、假设、反例、最小实验和验收标准，并提醒不要补写公司内部信息。
4. closureEvidence必须可观察、可验证，例如回归通过、配置差异被确认、Reviewer接受、在陌生场景复用成功，而不是“已经理解”。
5. Daily不得直接修改正式能力等级或16周课程。只有重复、影响交付或高度关联长期目标的问题，才标记weekly_watch或propose_dynamic_task。
6. 严格脱敏，不保留项目代号、内部路径、脚本原文、信号名、参数、代码、日志或未公开架构。`};
  const closure={title:'技术问题闭环Prompt',description:'针对一条未闭环问题，生成假设树、最小实验、沟通动作和验收证据。',text:`你是我的芯片验证问题闭环助手。我会提供一条已经脱敏的真实工作问题。不要直接猜唯一根因，也不要补写公司内部实现。

请按以下顺序回答：
1. 已知事实、未知信息和当前假设分别是什么。
2. 这是知识、Debug、环境、流程、证据还是协作问题；可能同时属于多类。
3. 给出2—5个候选解释，并为每个解释列支持证据、反对证据和可推翻条件。
4. 设计信息增益最高的最小实验或最小信息收集动作，说明预期观察和不同结果分别意味着什么。
5. 若依赖设计、项目经理或同事，列出应询问的问题、需要对方确认的交付物和责任边界。
6. 给出今天可执行的最小版本，以及时间充足时的完整版本。
7. 定义客观闭环标准：看到什么结果才算解决，什么只能算暂时绕过。
8. 说明哪些内容适合沉淀到问题手册，哪些结论必须在公司批准环境中验证。

最后输出一个行动表：动作、责任人、所需输入、预期证据、截止/复查时间。`};
  PROMPTS.daily=daily;PROMPTS.closure=closure;if(window.CURRICULUM_PROMPTS)window.CURRICULUM_PROMPTS.daily=daily
}

function saveDailyWithClosureV51(){
  try{
    const data=parseMaybeJSON(document.querySelector('#qText').value);
    if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('每日记录必须是JSON对象或完整文本');
    const formDate=document.querySelector('#qDate')?.value||localISO();
    if(!/^\d{4}-\d{2}-\d{2}$/.test(formDate))throw new Error('请选择有效日期');
    const payloadDate=/^\d{4}-\d{2}-\d{2}$/.test(String(data.date||''))?String(data.date):'';
    data.id=data.id||uid('daily');data.date=formDate;
    if(payloadDate&&payloadDate!==formDate)data.importMeta={...(data.importMeta||{}),dateMismatch:{payloadDate,selectedDate:formDate,resolution:'selected-date-wins',resolvedAt:new Date().toISOString()}};
    S.dailyLogs=S.dailyLogs.filter(x=>x.date!==formDate);S.dailyLogs.push(data);S.selectedDate=formDate;S.calendarMonth=formDate.slice(0,7);
    importClosuresFromDailyV51(data,formDate);save();closeModals();renderAll();
    toast(payloadDate&&payloadDate!==formDate?`已按日期栏保存到${formDate}，JSON日期${payloadDate}已忽略；重要问题已进入闭环队列`:'每日记录已保存，重要问题已进入闭环队列')
  }catch(e){toast(e.message||'每日记录格式错误')}
}
function importClosuresFromDailyV51(data,date){
  const explicit=arr(data.closureActions||data.dailyRecord?.closureActions);const items=explicit.length?explicit:deriveClosuresV51(data,date);items.forEach((x,i)=>upsertClosureV51(normalizeClosureV51(x,date,i)))
}

function deriveClosuresV51(data,date){
  const work=arr(data.dailyRecord?.workItems||data.work);return work.filter(w=>arr(w.unresolved).length||String(w.unknown||'').trim()||String(w.problem||'').trim()&&w.status!=='completed').map((w,i)=>{
    const unresolved=[...arr(w.unresolved),w.unknown].filter(Boolean);const problem=[w.result,w.problem,...unresolved].filter(Boolean).join('；');const category=inferClosureCategoryV51(`${w.title} ${problem}`);const approach=arr(w.next).length?arr(w.next):defaultApproachV51(category,w.title);return{id:`closure-${date}-${w.id||i+1}`,sourceWorkItemId:w.id||'',title:`${w.title||'工作问题'} · 待闭环`,category,priority:arr(w.unresolved).length>=3?'high':'medium',problem,recommendedApproach:approach,solutionMode:modeForCategoryV51(category),aiPrompt:buildClosurePromptV51({title:w.title,problem,recommendedApproach:approach,category}),closureEvidence:defaultEvidenceV51(category,w.title),owner:['assisted','prompted'].includes(w.independence)?'shared':'self',status:'open',nextReviewDate:'',courseImpact:'none',safetyNote:'仅使用脱敏描述；具体实现和结果必须在公司批准环境中确认'}
  })
}

function normalizeClosureV51(x,date,i){
  const category=x.category||inferClosureCategoryV51(`${x.title||''} ${x.problem||''}`);const c={id:x.id||`closure-${date}-${i+1}`,date:x.date||date,sourceWorkItemId:x.sourceWorkItemId||'',sourceDiagnosisId:x.sourceDiagnosisId||'',linkedLab:x.linkedLab||'',title:x.title||'未命名问题',category,priority:x.priority||'medium',problem:x.problem||x.whyOpen||'待补充问题事实',solutionMode:x.solutionMode||modeForCategoryV51(category),recommendedApproach:arr(x.recommendedApproach||x.actions),aiPrompt:x.aiPrompt||'',closureEvidence:arr(x.closureEvidence||x.evidence),evidenceDone:x.evidenceDone||{},owner:x.owner||'self',status:x.status||'open',nextReviewDate:x.nextReviewDate||'',courseImpact:x.courseImpact||'none',safetyNote:x.safetyNote||'仅使用脱敏材料；最终结论需由公司环境或相关责任人确认',notes:x.notes||'',resolution:x.resolution||'',createdAt:x.createdAt||localISO(),updatedAt:x.updatedAt||localISO()};if(!c.recommendedApproach.length)c.recommendedApproach=defaultApproachV51(category,c.title);if(!c.closureEvidence.length)c.closureEvidence=defaultEvidenceV51(category,c.title);if(!c.aiPrompt)c.aiPrompt=buildClosurePromptV51(c);return c
}

function upsertClosureV51(c){const idx=S.dailyClosures.findIndex(x=>x.id===c.id);if(idx>=0){const old=S.dailyClosures[idx];S.dailyClosures[idx]={...c,status:old.status||c.status,evidenceDone:old.evidenceDone||c.evidenceDone,notes:old.notes||c.notes,resolution:old.resolution||c.resolution,resolvedAt:old.resolvedAt||c.resolvedAt,updatedAt:old.updatedAt||c.updatedAt}}else S.dailyClosures.push(c)}

function inferClosureCategoryV51(text){const t=String(text).toLowerCase();if(/模型|交付|责任|项目经理|协作|验收方|提供方/.test(t))return'coordination';if(/环境|脚本|配置|子系统|生成/.test(t))return'environment';if(/根因|波形|异常|报错|强制|force|状态|debug/.test(t))return'debug';if(/coverage|sign-off|回归|证据|通过|确认/.test(t))return'evidence';if(/不清楚|不了解|原理|知识|如何/.test(t))return'knowledge';return'process'}
function modeForCategoryV51(c){return({debug:'minimum_experiment',knowledge:'structured_learning',environment:'minimum_experiment',coordination:'ask_owner',evidence:'collect_evidence',process:'direct_action'})[c]||'direct_action'}
function defaultApproachV51(c,title){return({debug:['重述现象并定位首次异常，而不是从最终报错倒推','保留至少两个候选假设，为每个假设设计一个最小区分实验','检查控制来源、状态生命周期、数据路径和Checker独立性'],knowledge:['先列出当前已知、未知和必须掌握的概念边界','使用公开或批准资料建立一页结构图','用一个陌生但脱敏的小案例复述并自测'],environment:['对比成功与失败配置，先做结构化Diff','列出脚本运行的最低前置条件和依赖','在另一个脱敏场景复现并记录验证结果'],coordination:['明确需要谁提供什么交付物、何时提供、由谁验收','准备不超过五个可拍板的问题','会后记录责任、接口、时间和验收标准'],evidence:['先定义通过、绕过、未验证分别需要什么证据','补充回归、Review或独立检查结果','记录剩余风险和责任人'],process:['把问题转成下一次可重复执行的检查顺序','先完成最小版本并记录耗时与结果','在下一次相似任务中验证能否复用']})[c]||[`为“${title}”定义一个最小可执行动作和客观验收标准`]}
function defaultEvidenceV51(c,title){return({debug:['根因或主要候选被最小实验区分','修复后目标回归通过且无同类残留','在相似问题中能主动复用该检查路径'],knowledge:['能够脱离原材料解释概念边界','完成一个陌生场景自测并得到Review','知识被应用到真实或受控任务'],environment:['成功与失败配置差异被确认','最低配置清单可被另一场景复用','同事或Reviewer能够依据记录复现'],coordination:['责任人、交付物、时间和验收标准被明确','相关方确认职责划分','交付按约定进入验收'],evidence:['证据来源、分母和判断标准可追溯','Reviewer接受结论或明确剩余风险','不存在把绕过误写成解决'],process:['形成可重复Checklist','下一次执行时间或漏项明显下降','至少一次独立复用成功']})[c]||[`“${title}”获得可观察、可复现的完成证据`]}
function buildClosurePromptV51(c){return `你是我的芯片验证问题闭环助手。以下内容已经脱敏，不要补写公司内部实现。\n\n问题：${c.title||''}\n类别：${closureCategoryLabelV51(c.category)}\n已知事实与当前疑问：${c.problem||''}\n当前准备采取的动作：${arr(c.recommendedApproach).join('；')}\n\n请区分已知事实、假设和未知信息；给出候选解释、反例、信息增益最高的最小实验或沟通动作，并说明不同结果分别意味着什么。最后列出客观闭环标准、仍需责任人确认的内容和可沉淀到问题手册的方法。不要宣布未经验证的唯一根因。`}

function backfillDailyClosuresV51(){S.dailyLogs.forEach(log=>importClosuresFromDailyV51(log,log.date||localISO()));seedJuly14ClosuresV51();save()}
function seedJuly14ClosuresV51(){[
 {id:'closure-2026-07-14-systematic-debug',date:'2026-07-14',sourceWorkItemId:'wi-0714-function-debug',sourceDiagnosisId:'diag-systematic-debug-method',title:'建立可重复的系统化Debug顺序',category:'debug',priority:'high',problem:'已经开始追踪控制、状态和数据来源，但尚未形成稳定流程；一次特殊集成问题在自行分析和AI辅助后仍由设计人员识别。',solutionMode:'minimum_experiment',recommendedApproach:['用“现象→首次异常→控制来源→状态生命周期→数据路径→Checker”作为固定第一轮','每次保留至少两个候选假设，并用最小实验区分','将force/deposit、覆盖范围和release生命周期加入陌生问题检查项'],closureEvidence:['连续两次真实或受控问题使用同一模板','至少一次在设计人员揭示答案前收敛主要候选','Reviewer确认检查顺序没有关键漏项'],owner:'self',status:'open',nextReviewDate:'2026-07-19',courseImpact:'weekly_watch'},
 {id:'closure-2026-07-14-force-lifecycle',date:'2026-07-14',sourceWorkItemId:'wi-0714-force-rootcause',title:'确认强制状态未释放问题真正关闭',category:'evidence',priority:'high',problem:'根因已由设计人员说明，但修复方式、回归结果、相似入口和残留强制状态检测仍未确认。',solutionMode:'collect_evidence',recommendedApproach:['向设计人员确认force建立与release的修复位置和触发条件','完成目标回归并检查相似入口','评估能否增加结束时残留force或非预期控制状态检查'],closureEvidence:['修复方式由责任人确认','目标回归与至少一个相邻场景通过','相似入口排查完成或剩余风险被明确记录'],owner:'shared',status:'waiting',nextReviewDate:'2026-07-16',courseImpact:'weekly_watch'},
 {id:'closure-2026-07-14-mixedsignal-handoff',date:'2026-07-14',sourceWorkItemId:'wi-0714-mixedsignal-handoff',sourceDiagnosisId:'diag-mixedsignal-delivery-boundary',linkedLab:'mixed-contract',title:'明确数模混合行为模型的交付与验收责任',category:'coordination',priority:'high',problem:'当前可能由验证侧同时编写和验证行为模型，存在人力、职责分离和模型错误未被独立发现的风险。',solutionMode:'ask_owner',recommendedApproach:['列出模型用途、接口、关键行为、精度、异常和版本要求','与项目经理确认提供方、验收方、时间和维护责任','定义至少一个可以发现错误模型的独立验收用例'],closureEvidence:['形成脱敏Model Delivery Contract V1','项目经理及相关团队确认RACI','模型验收标准和维护责任被记录'],owner:'shared',status:'in_progress',nextReviewDate:'2026-07-19',courseImpact:'weekly_watch'},
 {id:'closure-2026-07-14-env-generation',date:'2026-07-14',sourceWorkItemId:'wi-0714-env-generation',sourceDiagnosisId:'diag-environment-integration-understanding',title:'验证环境生成失败是否由子系统配置缺失导致',category:'environment',priority:'medium',problem:'自身环境能够成功生成，并提出子系统未加入配置的假设；但其他人员失败的真实根因和完整依赖尚未闭环。',solutionMode:'minimum_experiment',recommendedApproach:['对比一个成功配置和一个失败配置的结构化差异','确认子系统注册所需字段、路径和依赖','在另一个子系统复用最低配置清单'],closureEvidence:['失败原因被配置Diff或工具结果确认','最低配置清单完成','至少一个新环境依据清单成功生成'],owner:'shared',status:'open',nextReviewDate:'2026-07-19',courseImpact:'none'}
 ].forEach((x,i)=>upsertClosureV51(normalizeClosureV51(x,x.date,i)))}

function injectDailyClosureV51(){if(document.getElementById('daily-closure-v51'))return;const anchor=document.getElementById('todayStatusRow');if(anchor)anchor.insertAdjacentHTML('beforebegin','<section class="daily-closure-v51" id="daily-closure-v51"><div id="dailyClosureBodyV51"></div></section>')}
function renderDailyClosureV51(){const box=document.getElementById('dailyClosureBodyV51');if(!box)return;const view=S.closureUI.view||'date',day=S.dailyClosures.filter(x=>x.date===S.selectedDate),open=S.dailyClosures.filter(x=>!['resolved','deferred'].includes(x.status)).sort(sortClosuresV51),items=(view==='open'?open:day).sort(sortClosuresV51),resolved=S.dailyClosures.filter(x=>x.status==='resolved').length;box.innerHTML=`<div class="section-title split-title"><div><div class="eyebrow">V5.1 · DAILY PROBLEM CLOSURE</div><h2>当天的问题必须有下一步</h2><p>AI提供建议、最小实验和Prompt；公司环境、责任人反馈和客观证据决定是否真正闭环。</p></div><div class="closure-metrics-v51"><span>当天 <b>${day.length}</b></span><span>未闭环 <b>${open.length}</b></span><span>已关闭 <b>${resolved}</b></span></div></div><div class="closure-tabs-v51"><button data-closure-view="date" class="${view==='date'?'active':''}">${dateLabel(S.selectedDate)}的问题</button><button data-closure-view="open" class="${view==='open'?'active':''}">全部未闭环</button></div><div class="closure-list-v51">${items.length?items.map(renderClosureCardV51).join(''):`<div class="empty">${view==='date'?'这一天没有需要单独追踪的问题。':'当前没有未闭环问题。'}</div>`}</div>`;bindDailyClosureV51()}
function sortClosuresV51(a,b){const p={high:3,medium:2,low:1};return(p[b.priority]||0)-(p[a.priority]||0)||(a.nextReviewDate||'9999').localeCompare(b.nextReviewDate||'9999')}
function renderClosureCardV51(c){const done=Object.values(c.evidenceDone||{}).filter(Boolean).length;return `<article class="card closure-card-v51 ${c.status==='resolved'?'resolved':''}" data-closure-card="${esc(c.id)}"><header><div><div class="eyebrow">${esc(c.date)} · ${esc(closureCategoryLabelV51(c.category))}</div><h3>${esc(c.title)}</h3></div><div class="tag-row"><span class="tag ${c.priority==='high'?'problem':c.priority==='medium'?'learn':''}">${closurePriorityLabelV51(c.priority)}</span><span class="tag ${c.status==='resolved'?'good':c.status==='waiting'?'learn':''}">${closureStatusLabelV51(c.status)}</span></div></header><p class="closure-problem-v51"><b>为什么还没闭环：</b>${esc(c.problem)}</p><div class="closure-grid-v51"><section><b>${solutionModeLabelV51(c.solutionMode)}</b><ol>${arr(c.recommendedApproach).map(x=>`<li>${esc(x)}</li>`).join('')}</ol></section><section><b>闭环证据 ${done}/${c.closureEvidence.length}</b><div class="closure-evidence-v51">${c.closureEvidence.map((x,i)=>`<label><input type="checkbox" data-closure-evidence="${i}" ${c.evidenceDone?.[i]?'checked':''}>${esc(x)}</label>`).join('')}</div></section></div><details><summary>安全边界与AI深挖Prompt</summary><p class="muted">${esc(c.safetyNote)}</p><pre>${esc(c.aiPrompt)}</pre></details><div class="closure-controls-v51"><label>状态<select data-closure-status><option value="open" ${c.status==='open'?'selected':''}>待处理</option><option value="in_progress" ${c.status==='in_progress'?'selected':''}>进行中</option><option value="waiting" ${c.status==='waiting'?'selected':''}>等待他人/结果</option><option value="resolved" ${c.status==='resolved'?'selected':''}>已闭环</option><option value="deferred" ${c.status==='deferred'?'selected':''}>暂缓</option></select></label><label>复查日期<input data-closure-review type="date" value="${esc(c.nextReviewDate||'')}"></label><label class="closure-note-v51">结果、证据或等待事项<textarea data-closure-note placeholder="记录实验结果、同事反馈、仍未解释的部分或最终解决方式">${esc(c.resolution||c.notes||'')}</textarea></label></div><footer><span>${c.linkedLab?`关联Frontier Lab：${esc(c.linkedLab)}`:`责任：${esc(closureOwnerLabelV51(c.owner))}`}</span><div><button class="secondary small-btn" data-copy-closure>复制AI Prompt</button>${c.status==='resolved'?'<button class="secondary small-btn" data-closure-manual>沉淀到手册</button>':''}<button class="primary small-btn" data-save-closure>保存闭环状态</button></div></footer></article>`}

function bindDailyClosureV51(){document.querySelectorAll('[data-closure-view]').forEach(b=>b.onclick=()=>{S.closureUI.view=b.dataset.closureView;save();renderDailyClosureV51()});document.querySelectorAll('[data-closure-card]').forEach(card=>{const item=S.dailyClosures.find(x=>x.id===card.dataset.closureCard);if(!item)return;card.querySelector('[data-copy-closure]').onclick=()=>copyTextV51(item.aiPrompt,'问题闭环Prompt已复制');card.querySelector('[data-save-closure]').onclick=()=>saveClosureCardV51(card,item);card.querySelector('[data-closure-manual]')?.addEventListener('click',()=>promoteClosureToManualV51(item))})}
function saveClosureCardV51(card,item){const evidence={};card.querySelectorAll('[data-closure-evidence]').forEach(x=>evidence[x.dataset.closureEvidence]=x.checked);const status=card.querySelector('[data-closure-status]').value,note=card.querySelector('[data-closure-note]').value.trim();if(status==='resolved'&&(!note||!Object.values(evidence).some(Boolean)))return toast('标记已闭环前，请记录结果并至少确认一项客观证据');item.status=status;item.evidenceDone=evidence;item.nextReviewDate=card.querySelector('[data-closure-review]').value;item.resolution=status==='resolved'?note:item.resolution;item.notes=status!=='resolved'?note:item.notes;item.updatedAt=localISO();if(status==='resolved')item.resolvedAt=localISO();save();renderAll();toast(status==='resolved'?'问题已闭环':'闭环状态已保存')}
function promoteClosureToManualV51(item){S.manualEntries=arr(S.manualEntries);const id=`manual-from-${item.id}`;const entry={schemaVersion:'career-os-manual-1',entryId:id,id,date:item.resolvedAt||localISO(),title:item.title,situation:item.problem,solution:item.resolution||item.recommendedApproach.join('\n'),cautions:[item.safetyNote],verification:item.closureEvidence.filter((x,i)=>item.evidenceDone?.[i]).join('；'),keywords:[closureCategoryLabelV51(item.category),item.title],type:'troubleshooting',topic:item.category==='environment'?'environment':item.category==='debug'?'debug':'workflow',status:'confirmed',source:'ai_assisted',privacyNote:'由脱敏Daily Closure闭环后沉淀',useCount:0,lastUsed:''};const idx=S.manualEntries.findIndex(x=>x.entryId===id);if(idx>=0)S.manualEntries[idx]=entry;else S.manualEntries.unshift(entry);save();renderAll();toast('已沉淀到问题手册')}
function injectClosureActionsIntoTodayV51(){const list=document.getElementById('todayActionList');if(!list||S.selectedDate!==localISO()||list.dataset.closureInjected===localISO())return;const due=S.dailyClosures.filter(x=>!['resolved','deferred'].includes(x.status)&&(!x.nextReviewDate||x.nextReviewDate<=localISO())).sort(sortClosuresV51).slice(0,2);if(!due.length)return;list.insertAdjacentHTML('afterbegin',due.map(x=>`<div class="action-item closure-action-v51"><i class="action-icon problem"></i><div><b>${esc(x.recommendedApproach[0]||x.title)}</b><p>问题闭环 · ${esc(x.title)}</p></div><small>${closurePriorityLabelV51(x.priority)}</small></div>`).join(''));list.dataset.closureInjected=localISO()}
function copyTextV51(text,msg){navigator.clipboard?.writeText(text).then(()=>toast(msg)).catch(()=>{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();toast(msg)})}
function closureCategoryLabelV51(x){return({debug:'Debug',knowledge:'知识前置',environment:'环境/工具',coordination:'协作/交付',evidence:'证据/Closure',process:'工作方法'})[x]||x}
function solutionModeLabelV51(x){return({direct_action:'建议的最小动作',minimum_experiment:'最小实验与排查顺序',ask_owner:'沟通与责任确认',structured_learning:'结构化学习路径',collect_evidence:'证据补全路径'})[x]||'建议方案'}
function closureStatusLabelV51(x){return({open:'待处理',in_progress:'进行中',waiting:'等待他人/结果',resolved:'已闭环',deferred:'暂缓'})[x]||x}
function closurePriorityLabelV51(x){return({high:'高优先级',medium:'中优先级',low:'低优先级'})[x]||x}
function closureOwnerLabelV51(x){return({self:'本人',design:'设计侧',pm:'项目经理',colleague:'同事',shared:'共同推进'})[x]||x}

function injectDailyClosureStylesV51(){if(document.getElementById('v51-closure-style'))return;const s=document.createElement('style');s.id='v51-closure-style';s.textContent=`.daily-closure-v51{margin:14px 0}.closure-metrics-v51{display:flex;gap:7px;flex-wrap:wrap}.closure-metrics-v51 span{padding:8px 10px;border:1px solid var(--line2);border-radius:8px;color:var(--muted)}.closure-metrics-v51 b{color:var(--cyan)}.closure-tabs-v51{display:flex;gap:7px;margin:10px 0}.closure-tabs-v51 button{background:#07141e;color:var(--muted);border:1px solid var(--line2);border-radius:8px;padding:8px 11px}.closure-tabs-v51 button.active{border-color:var(--cyan);color:var(--cyan)}.closure-list-v51{display:grid;gap:10px}.closure-card-v51{border-left:3px solid var(--amber)}.closure-card-v51.resolved{border-left-color:#4bd39b}.closure-card-v51 header,.closure-card-v51 footer{display:flex;justify-content:space-between;gap:12px}.closure-problem-v51{padding:10px;border:1px solid var(--line2);border-radius:8px;background:rgba(230,170,81,.035);line-height:1.65}.closure-grid-v51{display:grid;grid-template-columns:1fr 1fr;gap:9px;margin:10px 0}.closure-grid-v51>section{padding:11px;border:1px solid var(--line2);border-radius:9px}.closure-grid-v51 ol{padding-left:19px;color:var(--muted);line-height:1.65}.closure-evidence-v51{display:grid;gap:7px;margin-top:9px}.closure-evidence-v51 label{display:flex;gap:7px;color:var(--muted);line-height:1.45}.closure-card-v51 pre{white-space:pre-wrap;color:var(--muted);background:#06111a;border:1px solid var(--line2);padding:10px;border-radius:8px}.closure-controls-v51{display:grid;grid-template-columns:160px 170px 1fr;gap:8px;margin:10px 0}.closure-controls-v51 label{display:grid;gap:5px;color:var(--muted);font-size:10px}.closure-controls-v51 select,.closure-controls-v51 input,.closure-controls-v51 textarea{background:#06111a;border:1px solid #294858;color:white;border-radius:8px;padding:9px}.closure-note-v51 textarea{min-height:66px}.closure-card-v51 footer{align-items:center;border-top:1px solid var(--line2);padding-top:10px}.closure-card-v51 footer>span{color:var(--muted);font-size:10px}.closure-card-v51 footer>div{display:flex;gap:7px;flex-wrap:wrap}.closure-action-v51{border-color:rgba(230,170,81,.35)}@media(max-width:900px){.closure-grid-v51{grid-template-columns:1fr}.closure-controls-v51{grid-template-columns:1fr 1fr}.closure-note-v51{grid-column:1/-1}}@media(max-width:620px){.closure-controls-v51{grid-template-columns:1fr}.closure-note-v51{grid-column:auto}.closure-card-v51 header,.closure-card-v51 footer{display:grid}}`;document.head.appendChild(s)}