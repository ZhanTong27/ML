(function(){
 function applyIdentityV58(){
  if(typeof S!=='undefined')S.version='5.8.0';
  document.title='Zhantong · Career OS V5.8';
  const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.8'
 }
 function installOutermostV58(){
  if(typeof renderAll!=='function'||renderAll.__careerV58Outermost)return;
  const previous=renderAll;
  const wrapped=function(){const result=previous.apply(this,arguments);setTimeout(()=>{try{mountGrowthHubV58();window.compactLegacyV58?.();applyIdentityV58();publishMarkerV58('render')}catch(e){console.error('V5.8 outer render failed',e)}},0);return result};
  wrapped.__careerV58Outermost=true;renderAll=wrapped
 }
 function publishMarkerV58(reason){
  const actions=window.GROWTH_STORY_V58?.actions||[];
  const state=typeof S!=='undefined'?S.growthHubV58:null;
  const complete=Boolean(document.getElementById('growth-hub-v58')&&state&&actions.length>=10);
  window.CAREER_OS_V58={version:'5.8.0',reason:reason||'runtime',complete,actionCount:actions.length,abilityCount:window.GROWTH_STORY_V58?.abilities?.length||0,signalCount:window.GROWTH_STORY_V58?.signals?.length||0,backupPresent:Boolean(window.CAREER_OS_V58_SAFETY?.backupPresent),backupApplicable:Boolean(localStorage.getItem('zhantong-career-os-v5-pre-v58-backup')||localStorage.getItem('zhantong-career-os-v5')),updatedAt:new Date().toISOString()};
  if(typeof S!=='undefined'){S.growthUpdateV58=window.CAREER_OS_V58;applyIdentityV58();if(typeof save==='function')save()}
  return complete
 }
 function settleV58(reason){installOutermostV58();try{mountGrowthHubV58();window.compactLegacyV58?.()}catch(e){console.error('V5.8 Growth settle failed',e)}applyIdentityV58();publishMarkerV58(reason)}
 window.addEventListener('load',()=>{installOutermostV58();[0,300,1000,2500].forEach((delay,index)=>setTimeout(()=>settleV58('load-'+index),delay))},{once:true});
 window.addEventListener('pageshow',()=>settleV58('pageshow'));
 window.addEventListener('focus',()=>settleV58('focus'));
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)settleV58('visible')});
})();
