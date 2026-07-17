(function(){
 let busy=false;
 function count(log){if(!log)return 0;if(Array.isArray(log.work)&&log.work.length)return log.work.length;if(Array.isArray(log.workItems)&&log.workItems.length)return log.workItems.length;if(log.dailyRecord&&Array.isArray(log.dailyRecord.workItems))return log.dailyRecord.workItems.length;return 0}
 function byDate(){return Array.isArray(S?.dailyLogs)?S.dailyLogs.find(x=>(x.date||x.dailyRecord?.date)==='2026-07-17'):null}
 function ensure(reason){
  if(busy||typeof S==='undefined')return false;busy=true;
  try{
   let log=byDate();if(count(log)!==5&&typeof seedDaily20260717==='function')seedDaily20260717();
   if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);
   log=byDate();const complete=count(log)===5;
   if(complete){S.selectedDate='2026-07-17';S.calendarMonth='2026-07'}
   S.dailyUpdateV591={version:'5.9.1',reason:reason||'runtime',date:'2026-07-17',workItems:count(log),diagnoses:Array.isArray(log?.diagnoses)?log.diagnoses.length:0,facts:Array.isArray(S.facts)?S.facts.filter(x=>x.date==='2026-07-17').length:0,evidence:Array.isArray(S.evidence)?S.evidence.filter(x=>x.sourceDate==='2026-07-17').length:0,complete,updatedAt:new Date().toISOString()};
   window.CAREER_OS_V591_DAILY=S.dailyUpdateV591;
   if(typeof save==='function')save();return complete
  }catch(e){console.error('July 17 Daily finalizer failed',e);return false}finally{busy=false}
 }
 function settle(reason){const ok=ensure(reason);if(ok&&typeof renderAll==='function'){try{renderAll()}catch(e){console.error('July 17 Daily render failed',e)}}if(typeof S!=='undefined'){S.version='5.9.0';document.title='Zhantong · Career OS V5.9';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.9';if(typeof save==='function')save()}}
 window.addEventListener('load',()=>[50,500,1400,3200].forEach((d,i)=>setTimeout(()=>settle('load-'+i),d)),{once:true});
 window.addEventListener('pageshow',()=>settle('pageshow'));
 window.addEventListener('focus',()=>settle('focus'));
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)settle('visible')});
})();
