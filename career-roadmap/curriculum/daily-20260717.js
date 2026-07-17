window.addEventListener('load',()=>{try{seedDaily20260717()}catch(e){console.error('July 17 daily seed failed',e)}},{once:true});
function seedDaily20260717(){
 const r=window.DAILY_20260717_RECORD,a=window.DAILY_20260717_ANALYSIS;if(!r||!a||typeof S==='undefined')return;
 ['dailyLogs','diagnoses','facts','evidence','patchHistory','pendingConfidence'].forEach(k=>S[k]=arr(S[k]));
 const log={...r,workItems:r.work,diagnoses:a.diagnoses,diagnosisIds:a.diagnoses.map(x=>x.id),weeklyObservations:a.weeklyObservations,roadmapIntervention:a.roadmapIntervention,missingInformation:a.missingInformation,sourceVersion:'v59-july17-career-patch'};
 const li=S.dailyLogs.findIndex(x=>(x.date||x.dailyRecord?.date)===r.date);if(li>=0)S.dailyLogs[li]={...S.dailyLogs[li],...log};else S.dailyLogs.push(log);
 a.diagnoses.forEach(d=>{const i=S.diagnoses.findIndex(x=>x.id===d.id);const item={...d,date:r.date,lastSeen:r.date,firstSeen:i>=0?(S.diagnoses[i].firstSeen||S.diagnoses[i].date||r.date):r.date,lifecycle:i>=0?(S.diagnoses[i].lifecycle||'collecting'):'collecting'};if(i>=0)S.diagnoses[i]={...S.diagnoses[i],...item};else S.diagnoses.push(item)});
 const f=[
 ['fact-0717-01','application','用户完成了模拟网表向数字验证环境的接入。','wi-0717-ams-netlist-integration'],
 ['fact-0717-02','work','用户运行了一次基础数模混合仿真。','wi-0717-ams-netlist-integration'],
 ['fact-0717-03','assessment','用户自述对若干数模混仿配置文件和相关配置机制的认识尚不透彻。','wi-0717-ams-netlist-integration'],
 ['fact-0717-04','assessment','用户当前在数模混仿中主要关注数字检查器和数字激励顺序。','wi-0717-ams-scope'],
 ['fact-0717-05','learning','用户不确定数字前端验证是否需要关注模拟连续行为和数模接口动态过程。','wi-0717-ams-scope'],
 ['fact-0717-06','work','用户后续将承担一项后仿任务。','wi-0717-post-simulation-prep'],
 ['fact-0717-07','learning','用户自述目前不清楚后仿所需交付物、执行方式、关注点和目的。','wi-0717-post-simulation-prep'],
 ['fact-0717-08','assessment','用户希望补充从架构设计、前端验证、后端实现、系统验证到流片后测试的整体流程知识。','wi-0717-post-simulation-prep'],
 ['fact-0717-09','problem','片上电源类模块的部分上游交付仍存在延期，并可能影响后续工作。','wi-0717-upstream-delay'],
 ['fact-0717-10','feedback','导师提出后续可能安排用户参与时钟与复位相关单元测试自动化脚本工作。','wi-0717-clock-reset-automation']
 ].map(x=>({id:x[0],type:x[1],statement:x[2],sourceWorkItemId:x[3],date:r.date,immutable:true}));
 f.forEach(x=>{const i=S.facts.findIndex(y=>y.id===x.id);if(i>=0)S.facts[i]=x;else S.facts.push(x)});
 a.evidence.forEach(x=>{const i=S.evidence.findIndex(y=>y.id===x.id);if(i>=0)S.evidence[i]=x;else S.evidence.push(x)});
 const p=[['diag-mixedsignal-environment-configuration',[72,86]],['diag-ams-verification-boundary',[66,82]],['diag-post-simulation-flow',[82,93]],['diag-mixedsignal-delivery-boundary',[87,95]]];
 p.forEach(x=>{S.pendingConfidence=S.pendingConfidence.filter(y=>!(y.diagnosisId===x[0]&&y.patchId===r.patchId));S.pendingConfidence.push({diagnosisId:x[0],range:x[1],patchId:r.patchId,date:r.date,requiresWeeklyConfirmation:true})});
 if(!S.patchHistory.some(x=>x.patchId===r.patchId))S.patchHistory.push({patchId:r.patchId,date:r.date,version:'career-os-v59-daily-0717',summary:'保存7月17日工作事实、诊断和周复盘观察。'});
 S.selectedDate=r.date;S.calendarMonth='2026-07';if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);save();renderAll()
}
