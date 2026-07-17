(function(){
 const DIMS=['understanding','practice','verificationDesign','communication'];
 function state(){return S.specializationV59}
 function unit(trackId,unitId){return SPECIALIZATION_V59.tracks[trackId]?.units.find(x=>x.id===unitId)}
 function track(trackId){return state()?.tracks?.[trackId]}
 function stamp(){return new Date().toISOString()}
 function persist(){state().updatedAt=stamp();if(typeof save==='function')save();window.mountSpecializationV59?.()}
 function stats(trackId){
  const t=track(trackId),units=SPECIALIZATION_V59.tracks[trackId].units,counts={};Object.keys(SPECIALIZATION_V59.statuses).forEach(k=>counts[k]=0);
  units.forEach(u=>counts[t.unitStates[u.id]]=(counts[t.unitStates[u.id]]||0)+1);
  return{total:units.length,completed:counts.completed||0,inProgress:counts.in_progress||0,paused:counts.paused||0,counts,hours:t.timeLogs.reduce((a,x)=>a+(Number(x.hours)||0),0)}
 }
 function completion(trackId,unitId){
  const t=track(trackId),a=t.assessments[unitId]||{},ev=t.evidence.filter(x=>x.unitId===unitId),practice=ev.some(x=>x.kind==='practice'),verification=ev.some(x=>x.kind==='verification'),output=ev.some(x=>['output','practice','verification'].includes(x.kind));
  const core=(Number(a.understanding)||0)>=3&&(Number(a.practice)||0)>=3&&(Number(a.verificationDesign)||0)>=3;
  return{output,practice,verification,core,confirmed:t.unitStates[unitId]==='completed',ready:output&&practice&&verification&&core}
 }
 function setStatus(trackId,unitId,status){
  if(!SPECIALIZATION_V59.statuses[status])return;
  const t=track(trackId);t.unitStates[unitId]=status;t.currentUnitId=unitId;t.updatedAt=stamp();
  if(status==='completed'){const units=SPECIALIZATION_V59.tracks[trackId].units,next=units.find(x=>t.unitStates[x.id]!=='completed');if(next)t.currentUnitId=next.id}
  const capO=state().tracks.ocldo.unitStates['ocldo-10']==='completed',capU=state().tracks.uvmms.unitStates['uvmms-09']==='completed';
  state().integrationProject.unlocked=capO&&capU;state().integrationProject.status=capO&&capU?(state().integrationProject.status==='completed'?'completed':'not_started'):'locked';persist()
 }
 function complete(trackId,unitId){const c=completion(trackId,unitId);if(!c.ready)return{ok:false,missing:[!c.output?'学习输出':'',!c.practice?'动手证据':'',!c.verification?'验证设计证据':'',!c.core?'核心Assessment达到3':''].filter(Boolean)};setStatus(trackId,unitId,'completed');return{ok:true,missing:[]}}
 function addEvidence(trackId,unitId,kind,title,detail){const t=track(trackId);t.evidence.push({id:`ev-${Date.now()}-${Math.random().toString(36).slice(2,6)}`,unitId,kind,title:(title||'').trim(),detail:(detail||'').trim(),createdAt:stamp(),careerEligible:false});t.updatedAt=stamp();persist()}
 function addTime(trackId,unitId,hours,note){const t=track(trackId);t.timeLogs.push({id:`time-${Date.now()}`,unitId,hours:Math.max(0,Number(hours)||0),note:(note||'').trim(),date:new Date().toISOString().slice(0,10)});t.updatedAt=stamp();persist()}
 function assessment(trackId,unitId,dim,value){if(!DIMS.includes(dim))return;track(trackId).assessments[unitId][dim]=Math.max(0,Math.min(5,Number(value)||0));track(trackId).updatedAt=stamp();persist()}
 function setNote(trackId,unitId,value){track(trackId).notes[unitId]=String(value||'');track(trackId).updatedAt=stamp();persist()}
 function setCheck(trackId,unitId,index,value){track(trackId).selfChecks[unitId][index]=Boolean(value);track(trackId).updatedAt=stamp();persist()}
 function swapFocus(){const f=state().learningFocus,[f.primaryTrack,f.secondaryTrack]=[f.secondaryTrack,f.primaryTrack];persist()}
 function pauseTrack(trackId){const t=track(trackId);t.status=t.status==='paused'?'in_progress':'paused';persist()}
 function setActive(trackId,unitId){state().activeTrack=trackId;track(trackId).currentUnitId=unitId||track(trackId).currentUnitId;state().ui.openTrack=trackId;state().ui.openUnit=unitId||track(trackId).currentUnitId;persist()}
 window.v59TrackStats=stats;window.v59UnitCompletion=completion;window.v59SetUnitStatus=setStatus;window.v59CompleteUnit=complete;window.v59AddEvidence=addEvidence;window.v59AddTime=addTime;window.v59SetAssessment=assessment;window.v59SetUnitNote=setNote;window.v59SetSelfCheck=setCheck;window.v59SwapFocus=swapFocus;window.v59PauseTrack=pauseTrack;window.v59SetActive=setActive;
})();
