window.addEventListener('load',()=>{try{seedDaily20260716()}catch(e){console.error('July 16 daily seed failed',e)}},{once:true});
function seedDaily20260716(){
 const record=window.DAILY_20260716_RECORD,analysis=window.DAILY_20260716_ANALYSIS;if(!record||!analysis||typeof S==='undefined')return;
 S.dailyLogs=arr(S.dailyLogs);S.diagnoses=arr(S.diagnoses);S.facts=arr(S.facts);S.evidence=arr(S.evidence);S.patchHistory=arr(S.patchHistory);S.pendingConfidence=arr(S.pendingConfidence);
 const log={...record,workItems:record.work,diagnoses:analysis.diagnoses,diagnosisIds:analysis.diagnoses.map(x=>x.id),weeklyObservations:analysis.weeklyObservations,roadmapIntervention:analysis.roadmapIntervention,missingInformation:analysis.missingInformation,candidateConfidenceNote:'Daily Diagnosis confidence is provisional; formal Career Model Confidence remains unchanged until Weekly Review.',sourceVersion:'v56-july16-career-patch'};
 const li=S.dailyLogs.findIndex(x=>(x.date||x.dailyRecord?.date)===record.date);if(li>=0)S.dailyLogs[li]={...S.dailyLogs[li],...log};else S.dailyLogs.push(log);
 analysis.diagnoses.forEach(d=>{const i=S.diagnoses.findIndex(x=>x.id===d.id);const item={...d,date:record.date,lastSeen:record.date,firstSeen:i>=0?(S.diagnoses[i].firstSeen||S.diagnoses[i].date||record.date):record.date,lifecycle:i>=0?(S.diagnoses[i].lifecycle||'collecting'):'collecting'};if(i>=0)S.diagnoses[i]={...S.diagnoses[i],...item};else S.diagnoses.push(item)});
 const facts=[
  {id:'fact-0716-01',type:'work',statement:'用户与设计人员重新核对了前一日反馈的功能波形。',sourceWorkItemId:'wi-0716-design-feedback'},
  {id:'fact-0716-02',type:'feedback',statement:'设计复核确认，掉电流程需要调整控制模式，以避免重新开启后再次同步并产生非预期有效输出。',sourceWorkItemId:'wi-0716-design-feedback'},
  {id:'fact-0716-03',type:'feedback',statement:'设计复核确认，软件控制模式下部分原硬件控制路径不应继续保持活动。',sourceWorkItemId:'wi-0716-design-feedback'},
  {id:'fact-0716-04',type:'work',statement:'用户新增了两个时域相关的边界场景并运行仿真。',sourceWorkItemId:'wi-0716-corner-netlist'},
  {id:'fact-0716-05',type:'application',statement:'用户将另一版本中的部分网表嵌入当前验证环境。',sourceWorkItemId:'wi-0716-corner-netlist'},
  {id:'fact-0716-06',type:'work',statement:'用户主动与项目负责人沟通完整设计交付物到位前提前启动模拟行为模型开发的可能性。',sourceWorkItemId:'wi-0716-ms-project-start'},
  {id:'fact-0716-07',type:'assessment',statement:'用户确认当前团队实践中模拟行为模型主要由验证人员编写。',sourceWorkItemId:'wi-0716-ms-project-start'},
  {id:'fact-0716-08',type:'assessment',statement:'用户认为自身对模拟模块行为理解有限，可能导致初始建模效率较低和较长迭代周期。',sourceWorkItemId:'wi-0716-ms-project-start'},
  {id:'fact-0716-09',type:'work',statement:'用户推动设计人员尽快提供支持模型开发的资料。',sourceWorkItemId:'wi-0716-ms-project-start'},
  {id:'fact-0716-10',type:'feedback',statement:'模拟侧计划提供数模接口行为波形并安排进一步沟通。',sourceWorkItemId:'wi-0716-model-deliverables'},
  {id:'fact-0716-11',type:'feedback',statement:'数字侧代码、手册和详细文档预计较晚提供，当前存在延期风险。',sourceWorkItemId:'wi-0716-model-deliverables'},
  {id:'fact-0716-12',type:'feedback',statement:'数字设计正在与模拟设计进行多个子模块联合调试，并推进顶层接口、寄存器和代码整合。',sourceWorkItemId:'wi-0716-model-deliverables'},
  {id:'fact-0716-13',type:'feedback',statement:'完整模拟网表预计较晚提供，但模拟侧可以提前提供Verilog-A模型。',sourceWorkItemId:'wi-0716-model-deliverables'},
  {id:'fact-0716-14',type:'learning',statement:'用户已完成UVM-MS基础资料学习，并认为其与当前工作存在潜在关联。',sourceWorkItemId:'wi-0716-uvm-ms-evaluation'},
  {id:'fact-0716-15',type:'assessment',statement:'用户提出在组内评估UVM-MS，并希望量化系统级复用、验证效率和验证质量收益。',sourceWorkItemId:'wi-0716-uvm-ms-evaluation'},
  {id:'fact-0716-16',type:'assessment',statement:'当前尚未开展UVM-MS工具兼容性验证、代码试点或收益基线收集。',sourceWorkItemId:'wi-0716-uvm-ms-evaluation'}
 ].map(x=>({...x,date:record.date,immutable:true}));facts.forEach(f=>{const i=S.facts.findIndex(x=>x.id===f.id);if(i>=0)S.facts[i]=f;else S.facts.push(f)});
 const evidence=[
  {id:'ev-0716-lowpower-01',diagnosisId:'diag-lowpower-intent-judgment',direction:'support',sourceType:'real_work',sourceDate:record.date,sourceFactIds:['fact-0716-01','fact-0716-02','fact-0716-03'],statement:'用户将掉电恢复、模式控制和硬件路径活动与低功耗设计意图联系起来，并通过设计复核形成两个待改进方向。',quality:'high',independence:'assisted',transferLevel:'similar_context',limitations:['尚无正式规格和功耗数据。','尚未完成修改和回归。','结论来自用户对会议结果的口述。']},
  {id:'ev-0716-lowpower-02',diagnosisId:'diag-lowpower-intent-judgment',direction:'counter',sourceType:'self_report',sourceDate:record.date,sourceFactIds:['fact-0716-02','fact-0716-03'],statement:'当前只有设计讨论结论，尚未通过修改后波形、回归或功耗分析确认。',quality:'medium',independence:'assisted',transferLevel:'same_context',limitations:['缺少设计变更产物。','缺少客观功耗或活动率结果。']},
  {id:'ev-0716-boundary-01',diagnosisId:'diag-verification-boundary-expansion',direction:'support',sourceType:'real_work',sourceDate:record.date,sourceFactIds:['fact-0716-04','fact-0716-05'],statement:'用户在真实验证任务中新增时域边界场景，并完成不同版本设计表示的混合接入。',quality:'medium',independence:'independent',transferLevel:'same_context',limitations:['未记录场景结果。','未说明选择依据。','未确认混合配置是否正式有效。']},
  {id:'ev-0716-boundary-02',diagnosisId:'diag-verification-boundary-expansion',direction:'counter',sourceType:'self_report',sourceDate:record.date,sourceFactIds:['fact-0716-04','fact-0716-05'],statement:'当前没有覆盖率增量、仿真结论或跨场景迁移结果，无法判断corner设计的系统性。',quality:'medium',independence:'independent',transferLevel:'none',limitations:['用户口述未包含结果细节。']},
  {id:'ev-0716-delivery-01',diagnosisId:'diag-mixedsignal-delivery-boundary',direction:'support',sourceType:'real_work',sourceDate:record.date,sourceFactIds:['fact-0716-06','fact-0716-07','fact-0716-08','fact-0716-09'],statement:'用户已因模型开发效率和迭代风险主动与项目负责人及设计侧沟通提前启动和上游资料问题。',quality:'high',independence:'independent',transferLevel:'same_context',limitations:['尚未形成正式项目决策。','尚未开始模型开发。','无法确认实际迭代成本。']},
  {id:'ev-0716-delivery-02',diagnosisId:'diag-mixedsignal-delivery-boundary',direction:'support',sourceType:'supervisor_feedback',sourceDate:record.date,sourceFactIds:['fact-0716-10','fact-0716-11','fact-0716-12','fact-0716-13'],statement:'来自模拟和数字侧的交付信息显示，接口波形和Verilog-A可提前提供，但完整代码、文档和网表较晚，模型合同和相关性流程尚未建立。',quality:'high',independence:'assisted',transferLevel:'same_context',limitations:['反馈通过用户口述。','交付时间和内容仍可能变化。','尚未检查实际交付物质量。']},
  {id:'ev-0716-delivery-03',diagnosisId:'diag-mixedsignal-delivery-boundary',direction:'counter',sourceType:'supervisor_feedback',sourceDate:record.date,sourceFactIds:['fact-0716-10','fact-0716-12','fact-0716-13'],statement:'上游团队已经提供部分联合调试进展，并承诺提供接口波形和Verilog-A，因此任务并非完全缺少可启动输入。',quality:'medium',independence:'assisted',transferLevel:'same_context',limitations:['尚未收到实际文件。','无法判断交付内容是否足够。']},
  {id:'ev-0716-uvmms-01',diagnosisId:'diag-uvm-ms-adoption-opportunity',direction:'support',sourceType:'self_report',sourceDate:record.date,sourceFactIds:['fact-0716-14','fact-0716-15'],statement:'用户已完成基础资料学习，并主动将UVM-MS与当前多模型表示和UVM复用问题联系起来。',quality:'medium',independence:'independent',transferLevel:'none',limitations:['没有代码产物。','没有工具验证。','没有组内反馈或收益数据。']},
  {id:'ev-0716-uvmms-02',diagnosisId:'diag-uvm-ms-adoption-opportunity',direction:'counter',sourceType:'self_report',sourceDate:record.date,sourceFactIds:['fact-0716-16'],statement:'当前未开展兼容性验证、试点或基线数据收集，因此不能判断UVM-MS是否适合组内推广。',quality:'high',independence:'independent',transferLevel:'none',limitations:['后续试点结果可能改变当前判断。']}
 ];evidence.forEach(e=>{const i=S.evidence.findIndex(x=>x.id===e.id);if(i>=0)S.evidence[i]=e;else S.evidence.push(e)});
 const pending=[
  {diagnosisId:'diag-lowpower-intent-judgment',range:[78,88],reason:'低功耗判断出现跨日迁移并获得设计复核，但仍待规格、修改和回归确认。'},
  {diagnosisId:'diag-verification-boundary-expansion',range:[60,74],reason:'开始新增时域边界并接入跨版本表示，但缺少选择依据和结果闭环。'},
  {diagnosisId:'diag-mixedsignal-delivery-boundary',range:[86,94],reason:'模型交付问题继续影响任务启动，并新增模拟、数字和项目侧多源信息。'},
  {diagnosisId:'diag-uvm-ms-adoption-opportunity',range:[45,62],reason:'存在合理方法学机会，但尚无工具、代码、团队反馈和量化收益证据。'}
 ];pending.forEach(p=>{S.pendingConfidence=S.pendingConfidence.filter(x=>!(x.diagnosisId===p.diagnosisId&&x.patchId===record.patchId));S.pendingConfidence.push({...p,patchId:record.patchId,date:record.date,requiresWeeklyConfirmation:true})});
 if(!S.patchHistory.some(x=>x.patchId===record.patchId))S.patchHistory.push({patchId:record.patchId,date:record.date,version:'career-os-v56-daily-0716',summary:'保存7月16日工作事实、Daily Diagnosis、数模模型合同风险和UVM-MS试点机会。'});
 S.selectedDate=record.date;S.calendarMonth='2026-07';if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);save();renderAll()
}
