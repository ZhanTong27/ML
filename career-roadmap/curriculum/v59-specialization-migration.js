(function(){
 const KEY='zhantong-career-os-v5';
 const BACKUP='zhantong-career-os-v5-pre-v59-backup';
 const MANIFEST='zhantong-career-os-v5-pre-v59-manifest';
 const dims=['understanding','practice','verificationDesign','communication'];
 function now(){return new Date().toISOString()}
 function backup(){
  try{
   const raw=localStorage.getItem(KEY);
   if(raw&&!localStorage.getItem(BACKUP)){
    localStorage.setItem(BACKUP,raw);
    localStorage.setItem(MANIFEST,JSON.stringify({createdAt:now(),sourceKey:KEY,backupKey:BACKUP,bytes:raw.length,reason:'Before V5.9 parallel specialization tracks migration'}));
   }
   return Boolean(localStorage.getItem(BACKUP))
  }catch(e){console.error('V5.9 backup failed',e);return false}
 }
 function emptyAssessment(){return{understanding:0,practice:0,verificationDesign:0,communication:0,reviewNote:'',reviewedAt:''}}
 function normalizeTrack(trackId,raw){
  const data=SPECIALIZATION_V59.tracks[trackId],base=raw||{},unitStates={},notes={},selfChecks={},assessments={};
  data.units.forEach((unit,i)=>{
   unitStates[unit.id]=base.unitStates?.[unit.id]||((trackId==='ocldo'&&i===0)?'in_progress':'not_started');
   notes[unit.id]=base.notes?.[unit.id]||'';
   selfChecks[unit.id]=unit.selfCheck.map((_,idx)=>Boolean(base.selfChecks?.[unit.id]?.[idx]));
   const a=base.assessments?.[unit.id]||{};assessments[unit.id]={...emptyAssessment(),...a};dims.forEach(k=>assessments[unit.id][k]=Math.max(0,Math.min(5,Number(assessments[unit.id][k])||0)));
  });
  return{
   status:base.status||(trackId==='ocldo'?'in_progress':'not_started'),
   currentUnitId:data.units.some(x=>x.id===base.currentUnitId)?base.currentUnitId:data.units[0].id,
   unitStates,notes,selfChecks,assessments,
   evidence:Array.isArray(base.evidence)?base.evidence:[],
   timeLogs:Array.isArray(base.timeLogs)?base.timeLogs:[],
   priorKnowledge:Array.isArray(base.priorKnowledge)?base.priorKnowledge:[],
   cyclePlan:Array.isArray(base.cyclePlan)?base.cyclePlan:[],
   updatedAt:base.updatedAt||''
  }
 }
 function collectPriorKnowledge(state){
  const o=[],u=[];
  const gh=state.growthHubV58||{};
  const selected=gh.selectedActions||{},notes=gh.actionNotes||{};
  if(selected['main-model-contract']||notes['main-model-contract'])u.push({source:'V5.8 Growth',label:'已有模型合同接触',detail:'保留原行动选择/笔记，但不完成任何Unit。'});
  if(selected['topic-uvmms-architecture']||notes['topic-uvmms-architecture'])u.push({source:'V5.8 Growth',label:'已有UVM-MS架构接触',detail:'作为Prior Knowledge，不自动完成UVMMS-06。'});
  if(selected['main-correlation-plan']||notes['main-correlation-plan'])u.push({source:'V5.8 Growth',label:'已有模型相关性接触',detail:'不自动完成UVMMS-08。'});
  if(state.uvmmsProgramV57)u.push({source:'V5.7 Program',label:'存在历史UVM-MS工程试点',detail:'Gate、Metric、Sponsor和A/B数据保留在历史模块，不计个人课程进度。'});
  if(state.amsFrontierV55||state.frontierV55||state.frontierStateV50){u.push({source:'V5.5 Frontier',label:'已有AMS行业资料阅读',detail:'阅读状态保留，不自动完成Unit。'});o.push({source:'V5.5 Frontier',label:'已有模拟LDO背景阅读',detail:'归入Analog Output-Capacitorless LDO Background，不等同Digital OCLDO。'});}
  if(selected['aux-lowpower-closure']||notes['aux-lowpower-closure'])o.push({source:'V5.8 Growth',label:'已有低功耗设计意图接触',detail:'可作为OCLDO-01/03背景，不自动推进。'});
  return{ocldo:o,uvmms:u}
 }
 function install(){
  if(!window.SPECIALIZATION_V59||typeof S==='undefined')return;
  const backupPresent=backup();
  const existing=S.specializationV59||{};
  const prior=collectPriorKnowledge(S);
  const o=normalizeTrack('ocldo',existing.tracks?.ocldo),u=normalizeTrack('uvmms',existing.tracks?.uvmms);
  if(!o.priorKnowledge.length)o.priorKnowledge=prior.ocldo;
  if(!u.priorKnowledge.length)u.priorKnowledge=prior.uvmms;
  S.specializationV59={
   version:'5.9.0',
   activeTrack:['ocldo','uvmms'].includes(existing.activeTrack)?existing.activeTrack:'ocldo',
   learningFocus:{primaryTrack:existing.learningFocus?.primaryTrack||'ocldo',secondaryTrack:existing.learningFocus?.secondaryTrack||'uvmms'},
   tracks:{ocldo:o,uvmms:u},
   integrationProject:{unlocked:false,status:'locked',notes:existing.integrationProject?.notes||'',evidence:Array.isArray(existing.integrationProject?.evidence)?existing.integrationProject.evidence:[]},
   ui:{openTrack:existing.ui?.openTrack||'',openUnit:existing.ui?.openUnit||'',activeArchive:existing.ui?.activeArchive||''},
   updatedAt:existing.updatedAt||now()
  };
  const capO=S.specializationV59.tracks.ocldo.unitStates['ocldo-10']==='completed';
  const capU=S.specializationV59.tracks.uvmms.unitStates['uvmms-09']==='completed';
  S.specializationV59.integrationProject.unlocked=capO&&capU;
  S.specializationV59.integrationProject.status=capO&&capU?(existing.integrationProject?.status==='completed'?'completed':'not_started'):'locked';
  window.CAREER_OS_V59_MIGRATION={version:'5.9.0',complete:true,backupPresent,trackCounts:{ocldo:SPECIALIZATION_V59.tracks.ocldo.units.length,uvmms:SPECIALIZATION_V59.tracks.uvmms.units.length},priorKnowledge:{ocldo:o.priorKnowledge.length,uvmms:u.priorKnowledge.length},migratedAt:now()};
  if(typeof save==='function')save()
 }
 window.ensureSpecializationV59=install;
 window.addEventListener('load',install,{once:true});
})();
