(function(){
  var timers=[];
  var running=false;
  var backupKey='zhantong-career-os-v5-pre-v552-backup';

  function usableWork(log){
    if(!log)return[];
    if(Array.isArray(log.work)&&log.work.length)return log.work;
    if(Array.isArray(log.workItems)&&log.workItems.length)return log.workItems;
    if(log.dailyRecord&&Array.isArray(log.dailyRecord.workItems)&&log.dailyRecord.workItems.length)return log.dailyRecord.workItems;
    return[];
  }

  function logFor(date){
    if(typeof S==='undefined'||!Array.isArray(S.dailyLogs))return null;
    for(var i=0;i<S.dailyLogs.length;i++){
      var item=S.dailyLogs[i];
      var d=item&&(item.date||(item.dailyRecord&&item.dailyRecord.date));
      if(d===date)return item;
    }
    return null;
  }

  function count(date){return usableWork(logFor(date)).length}

  function backup(){
    try{
      var raw=localStorage.getItem('zhantong-career-os-v5');
      if(raw&&!localStorage.getItem(backupKey))localStorage.setItem(backupKey,raw)
    }catch(e){}
  }

  function recover(reason){
    if(running||typeof S==='undefined')return false;
    running=true;
    try{
      backup();
      if(typeof ensureHistoricalDailyV53==='function')ensureHistoricalDailyV53();
      if(typeof seedDaily20260715==='function')seedDaily20260715();
      if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);

      var c13=count('2026-07-13');
      var c14=count('2026-07-14');
      var c15=count('2026-07-15');
      var complete=c13===3&&c14===4&&c15===4;

      if(!complete){
        if(typeof ensureHistoricalDailyV53==='function')ensureHistoricalDailyV53();
        if(typeof seedDaily20260715==='function')seedDaily20260715();
        if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);
        c13=count('2026-07-13');c14=count('2026-07-14');c15=count('2026-07-15');
        complete=c13===3&&c14===4&&c15===4;
      }

      if(complete){
        var selected=logFor(S.selectedDate);
        if(!selected||usableWork(selected).length===0){S.selectedDate='2026-07-15';S.calendarMonth='2026-07'}
      }

      S.version='5.5.2';
      S.dailyRecoveryV552={version:'5.5.2',reason:reason||'runtime',counts:{'2026-07-13':c13,'2026-07-14':c14,'2026-07-15':c15},complete:complete,updatedAt:(typeof localISO==='function'?localISO():new Date().toISOString().slice(0,10))};
      window.CAREER_OS_V552=S.dailyRecoveryV552;
      document.title='Zhantong · Career OS V5.5.2';
      var side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.5.2';
      if(typeof save==='function')save();
      return complete
    }catch(e){
      window.CAREER_OS_V552={version:'5.5.2',complete:false,error:String(e&&e.message?e.message:e)};
      console.error('Career OS V5.5.2 Safari Daily recovery failed',e);
      return false
    }finally{running=false}
  }

  function recoverAndRender(reason){
    var ok=recover(reason);
    try{if(ok&&typeof renderAll==='function')renderAll()}catch(e){console.error('Career OS V5.5.2 render retry failed',e)}
  }

  function schedule(reason){
    var delays=[0,250,900,2200];
    for(var i=0;i<delays.length;i++){
      (function(delay,index){timers.push(setTimeout(function(){recoverAndRender(reason+'-'+index)},delay))})(delays[i],i)
    }
  }

  window.addEventListener('load',function(){schedule('load')},{once:true});
  window.addEventListener('pageshow',function(){schedule('pageshow')});
  window.addEventListener('focus',function(){recoverAndRender('focus')});
  document.addEventListener('visibilitychange',function(){if(!document.hidden)recoverAndRender('visible')});
})();
