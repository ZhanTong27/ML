(function(){
 var busy=false;
 function workCount(log){
  if(!log)return 0;
  if(Array.isArray(log.work)&&log.work.length)return log.work.length;
  if(Array.isArray(log.workItems)&&log.workItems.length)return log.workItems.length;
  if(log.dailyRecord&&Array.isArray(log.dailyRecord.workItems))return log.dailyRecord.workItems.length;
  return 0
 }
 function byDate(date){
  if(typeof S==='undefined'||!Array.isArray(S.dailyLogs))return null;
  return S.dailyLogs.find(function(x){return (x.date||(x.dailyRecord&&x.dailyRecord.date))===date})||null
 }
 function applyIdentity(){
  if(typeof S!=='undefined')S.version='5.6.0';
  document.title='Zhantong · Career OS V5.6';
  var side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.6'
 }
 function installOutermostRenderIdentity(){
  if(typeof renderAll!=='function'||renderAll.__careerV56Outermost)return;
  var previousRenderAll=renderAll;
  var renderAllV56=function(){
   var result=previousRenderAll.apply(this,arguments);
   applyIdentity();
   return result
  };
  renderAllV56.__careerV56Outermost=true;
  renderAll=renderAllV56
 }
 function ensure(reason){
  if(busy||typeof S==='undefined')return false;
  busy=true;
  try{
   var log=byDate('2026-07-16');
   if(workCount(log)!==5&&typeof seedDaily20260716==='function')seedDaily20260716();
   if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);
   log=byDate('2026-07-16');
   var complete=workCount(log)===5;
   if(complete){S.selectedDate='2026-07-16';S.calendarMonth='2026-07'}
   S.dailyUpdateV56={version:'5.6.0',reason:reason||'runtime',date:'2026-07-16',workItems:workCount(log),diagnoses:Array.isArray(log&&log.diagnoses)?log.diagnoses.length:0,complete:complete,updatedAt:typeof localISO==='function'?localISO():new Date().toISOString().slice(0,10)};
   window.CAREER_OS_V56=S.dailyUpdateV56;
   applyIdentity();
   if(typeof save==='function')save();
   return complete
  }catch(e){
   window.CAREER_OS_V56={version:'5.6.0',complete:false,error:String(e&&e.message?e.message:e)};
   console.error('Career OS V5.6 July 16 finalizer failed',e);
   return false
  }finally{busy=false}
 }
 function ensureAndRender(reason){
  installOutermostRenderIdentity();
  var ok=ensure(reason);
  try{if(ok&&typeof renderAll==='function')renderAll()}catch(e){console.error('Career OS V5.6 render retry failed',e)}
  applyIdentity();
  try{if(typeof save==='function')save()}catch(e){}
 }
 window.addEventListener('load',function(){
  installOutermostRenderIdentity();
  [0,250,900,2200].forEach(function(delay,index){setTimeout(function(){ensureAndRender('load-'+index)},delay)})
 },{once:true});
 window.addEventListener('pageshow',function(){installOutermostRenderIdentity();ensureAndRender('pageshow')});
 window.addEventListener('focus',function(){installOutermostRenderIdentity();ensureAndRender('focus')});
 document.addEventListener('visibilitychange',function(){if(!document.hidden){installOutermostRenderIdentity();ensureAndRender('visible')}});
})();
