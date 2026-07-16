(function(){
 var busy=false;
 function applyIdentityV57(){
  if(typeof S!=='undefined')S.version='5.7.0';
  document.title='Zhantong · Career OS V5.7';
  var side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.7'
 }
 function updateMarkerV57(reason){
  var data=window.UVMMS_ADOPTION_V57,state=typeof S!=='undefined'?S.uvmmsProgramV57:null;
  var gateCount=document.querySelectorAll('[data-uvmms-gate]').length;
  var metricCount=document.querySelectorAll('[data-uvmms-metric]').length;
  var evidenceCount=document.querySelectorAll('[data-uvmms-evidence]').length;
  var complete=Boolean(data&&state&&document.getElementById('uvmmsTodayV57')&&document.getElementById('uvmms-adoption-v57')&&document.getElementById('uvmmsPortfolioV57')&&gateCount===4&&metricCount===8&&evidenceCount===5);
  window.CAREER_OS_V57={version:'5.7.0',program:'uvmms-adoption',currentGate:state?.currentGate||'gate0',gateCount,metricCount,evidenceCount,complete,reason:reason||'runtime',updatedAt:typeof localISO==='function'?localISO():new Date().toISOString().slice(0,10)};
  if(typeof S!=='undefined')S.uvmmsUpdateV57=window.CAREER_OS_V57;
  return complete
 }
 function installOutermostV57(){
  if(typeof renderAll!=='function'||renderAll.__careerV57Outermost)return;
  var previous=renderAll;
  var current=function(){
   var result=previous.apply(this,arguments);
   try{if(typeof installUVMMSAdoptionV57==='function')installUVMMSAdoptionV57();else if(typeof renderUVMMSAdoptionV57==='function')renderUVMMSAdoptionV57()}catch(e){console.error('Career OS V5.7 program render failed',e)}
   applyIdentityV57();updateMarkerV57('renderAll');
   return result
  };
  current.__careerV57Outermost=true;
  renderAll=current
 }
 function finalizeV57(reason){
  if(busy)return false;busy=true;
  try{
   installOutermostV57();
   if(typeof installUVMMSAdoptionV57==='function')installUVMMSAdoptionV57();
   else if(typeof renderUVMMSAdoptionV57==='function')renderUVMMSAdoptionV57();
   applyIdentityV57();
   var complete=updateMarkerV57(reason);
   if(typeof save==='function')save();
   return complete
  }catch(e){
   window.CAREER_OS_V57={version:'5.7.0',program:'uvmms-adoption',complete:false,error:String(e&&e.message?e.message:e)};
   console.error('Career OS V5.7 finalize failed',e);
   return false
  }finally{busy=false}
 }
 function finalizeAndRenderV57(reason){
  installOutermostV57();
  try{if(typeof renderAll==='function')renderAll()}catch(e){console.error('Career OS V5.7 full render failed',e)}
  finalizeV57(reason)
 }
 window.addEventListener('load',function(){
  installOutermostV57();
  [0,250,900,2200].forEach(function(delay,index){setTimeout(function(){finalizeAndRenderV57('load-'+index)},delay)})
 },{once:true});
 window.addEventListener('pageshow',function(){installOutermostV57();finalizeAndRenderV57('pageshow')});
 window.addEventListener('focus',function(){installOutermostV57();finalizeAndRenderV57('focus')});
 document.addEventListener('visibilitychange',function(){if(!document.hidden){installOutermostV57();finalizeAndRenderV57('visible')}});
})();
