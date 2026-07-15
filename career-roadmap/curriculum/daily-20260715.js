window.addEventListener('load',()=>{try{seedDaily20260715()}catch(e){console.error('July 15 daily seed failed',e)}},{once:true});
function seedDaily20260715(){
 const record=window.DAILY_20260715_RECORD,analysis=window.DAILY_20260715_ANALYSIS;if(!record||!analysis)return;
 S.dailyLogs=arr(S.dailyLogs);S.diagnoses=arr(S.diagnoses);S.facts=arr(S.facts);S.evidence=arr(S.evidence);S.patchHistory=arr(S.patchHistory);S.pendingConfidence=arr(S.pendingConfidence);
 const log={...record,workItems:record.work,diagnoses:analysis.diagnoses,diagnosisIds:analysis.diagnoses.map(x=>x.id),weeklyObservations:analysis.weeklyObservations,roadmapIntervention:analysis.roadmapIntervention,missingInformation:analysis.missingInformation,candidateConfidenceNote:'Daily Diagnosis confidence is provisional; formal Career Model Confidence remains unchanged until Weekly Review.',sourceVersion:'v54-july15-record-learning'};
 const li=S.dailyLogs.findIndex(x=>x.date===record.date);if(li>=0)S.dailyLogs[li]={...S.dailyLogs[li],...log};else S.dailyLogs.push(log);
 analysis.diagnoses.forEach(d=>{const i=S.diagnoses.findIndex(x=>x.id===d.id);const item={...d,date:record.date,lastSeen:record.date,firstSeen:i>=0?(S.diagnoses[i].firstSeen||S.diagnoses[i].date||record.date):record.date,lifecycle:i>=0?(S.diagnoses[i].lifecycle||'collecting'):'collecting'};if(i>=0)S.diagnoses[i]={...S.diagnoses[i],...item};else S.diagnoses.push(item)});
 const facts=[
  {id:'fact-0715-01',type:'application',statement:'用户在新的低频时钟切换问题中，使用边沿数量和时钟周期推导检查窗口边界。',sourceWorkItemId:'wi-0715-clock-switch-debug'},
  {id:'fact-0715-02',type:'problem',statement:'长时间波形分析中出现波形回卷或历史数据不完整。',sourceWorkItemId:'wi-0715-waveform-data'},
  {id:'fact-0715-03',type:'application',statement:'用户开始使用顶层接口、子系统接口、功能块边界和用例关键路径的层级化波形Review顺序。',sourceWorkItemId:'wi-0715-waveform-review'},
  {id:'fact-0715-04',type:'feedback',statement:'导师反馈后续数模混合电源模块任务较重，原人力安排难以覆盖。',sourceWorkItemId:'wi-0715-mixedsignal-planning'},
  {id:'fact-0715-05',type:'assessment',statement:'用户与导师开始区分数字UT、子系统验证和真实数模混仿对模型抽象层级的不同需求。',sourceWorkItemId:'wi-0715-mixedsignal-planning'},
  {id:'fact-0715-06',type:'assessment',statement:'数模混合模型的最终提供方、覆盖范围、相关性验证和维护责任尚未确定。',sourceWorkItemId:'wi-0715-mixedsignal-planning'}
 ].map(x=>({...x,date:record.date,immutable:true}));facts.forEach(f=>{const i=S.facts.findIndex(x=>x.id===f.id);if(i>=0)S.facts[i]=f;else S.facts.push(f)});
 const evidence=[
  {id:'ev-0715-timing-01',diagnosisId:'diag-sim-timing-debug',direction:'support',sourceType:'real_work',sourceDate:record.date,sourceFactIds:['fact-0715-01'],statement:'用户在新的时钟切换场景中独立使用边沿和周期推导检查边界。',quality:'medium',independence:'independent',transferLevel:'similar_context',limitations:['尚未通过修改后的回归和正式规格确认。']},
  {id:'ev-0715-debug-01',diagnosisId:'diag-systematic-debug-method',direction:'support',sourceType:'real_work',sourceDate:record.date,sourceFactIds:['fact-0715-03'],statement:'用户已在真实任务中采用层级化波形Review顺序。',quality:'medium',independence:'independent',transferLevel:'same_context',limitations:['尚未形成跨模块和效率证据。']},
  {id:'ev-0715-wave-01',diagnosisId:'diag-waveform-data-management',direction:'support',sourceType:'self_report',sourceDate:record.date,sourceFactIds:['fact-0715-02'],statement:'用户在实际调试中遇到波形历史不完整，并明确表示不了解分段、容量和范围设置。',quality:'low',independence:'unknown',transferLevel:'none',limitations:['尚未检查日志、文件时间戳和分段信息。']},
  {id:'ev-0715-mixed-01',diagnosisId:'diag-mixedsignal-delivery-boundary',direction:'support',sourceType:'supervisor_feedback',sourceDate:record.date,sourceFactIds:['fact-0715-04','fact-0715-05','fact-0715-06'],statement:'导师再次指出任务规模和人力存在矛盾，并讨论由模拟设计侧提供网表或模型、按验证层级划分覆盖。',quality:'medium',independence:'assisted',transferLevel:'same_context',limitations:['尚未获得模拟设计侧和项目经理的正式方案。']}
 ];evidence.forEach(e=>{const i=S.evidence.findIndex(x=>x.id===e.id);if(i>=0)S.evidence[i]=e;else S.evidence.push(e)});
 const pending=[
  {diagnosisId:'diag-sim-timing-debug',range:[70,82],reason:'新的相似场景中出现独立周期推导证据，但仍待回归和规格确认。'},
  {diagnosisId:'diag-systematic-debug-method',range:[72,84],reason:'已从识别缺口发展到应用层级化Review框架，尚缺跨模块迁移。'},
  {diagnosisId:'diag-waveform-data-management',range:[50,65],reason:'首次出现真实波形回卷问题，具体原因尚未分类。'},
  {diagnosisId:'diag-mixedsignal-delivery-boundary',range:[76,86],reason:'连续两天出现并获得导师关于工作量和交付边界的反馈。'}
 ];pending.forEach(p=>{S.pendingConfidence=S.pendingConfidence.filter(x=>!(x.diagnosisId===p.diagnosisId&&x.patchId===record.patchId));S.pendingConfidence.push({...p,patchId:record.patchId,date:record.date,requiresWeeklyConfirmation:true})});
 if(!S.patchHistory.some(x=>x.patchId===record.patchId))S.patchHistory.push({patchId:record.patchId,date:record.date,version:'career-os-v54-daily-learning',summary:'保存7月15日原始Daily、Diagnosis与学习转换。'});
 S.selectedDate=record.date;save();renderAll()
}