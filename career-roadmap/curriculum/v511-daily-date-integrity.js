(function(){
 const MARKER='CAREER_OS_V511_DAILY_DATE_INTEGRITY';
 const BACKUP='zhantong-career-os-v5-pre-v511-daily-date';
 const WRONG_DATE='2026-07-18',RIGHT_DATE='2026-07-20';
 const SIGNATURES=['line coverage','时钟与复位UT自动生成','尚未进入生成器实现阶段'];
 let migratedThisSession=false,captureInstalled=false;

 function recordText(record){try{return JSON.stringify(record||{})}catch{return String(record||'')}}
 function isISODate(value){return /^\d{4}-\d{2}-\d{2}$/.test(String(value||''))}
 function matchesMisdatedJuly20(record){
  if(record?.date!==WRONG_DATE)return false;
  const text=recordText(record);
  return SIGNATURES.every(x=>text.includes(x))
 }
 function sameRecord(a,b){
  const ta=recordText({...a,id:'',date:'',dateCorrection:null,importMeta:null});
  const tb=recordText({...b,id:'',date:'',dateCorrection:null,importMeta:null});
  return ta===tb
 }
 function backup(){
  try{if(!localStorage.getItem(BACKUP))localStorage.setItem(BACKUP,JSON.stringify(S))}catch(e){}
 }
 function migrateMisdatedRecord(){
  if(typeof S!=='object'||!Array.isArray(S.dailyLogs))return false;
  backup();
  const candidates=S.dailyLogs.filter(matchesMisdatedJuly20);
  if(!candidates.length){
   if(S.dailyDateIntegrityV511?.status!=='corrected')S.dailyDateIntegrityV511={...(S.dailyDateIntegrityV511||{}),version:'5.11.0',checkedAt:new Date().toISOString(),status:'no-misdated-record'};
   return false
  }
  let changed=false;
  candidates.forEach(record=>{
   const existing=S.dailyLogs.find(x=>x!==record&&x.date===RIGHT_DATE);
   if(existing){
    if(sameRecord(record,existing)){S.dailyLogs=S.dailyLogs.filter(x=>x!==record);changed=true}
    else record.dateIntegrityConflict={targetDate:RIGHT_DATE,detectedAt:new Date().toISOString(),reason:'target-date-already-has-different-record'}
   }else{
    record.date=RIGHT_DATE;
    record.dateCorrection={from:WRONG_DATE,to:RIGHT_DATE,reason:'V5.11 daily import date integrity repair',correctedAt:new Date().toISOString()};
    changed=true
   }
  });
  if(changed){migratedThisSession=true;S.selectedDate=RIGHT_DATE;S.calendarMonth=RIGHT_DATE.slice(0,7)}
  S.dailyDateIntegrityV511={version:'5.11.0',checkedAt:new Date().toISOString(),status:changed?'corrected':'conflict',from:WRONG_DATE,to:RIGHT_DATE,matched:candidates.length};
  try{save()}catch(e){}
  return changed
 }
 function saveDailyCanonicalV511(){
  try{
   const data=parseMaybeJSON(document.querySelector('#qText')?.value||'');
   if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('每日记录必须是JSON对象或完整文本');
   const formDate=document.querySelector('#qDate')?.value||localISO();
   if(!isISODate(formDate))throw new Error('请选择有效日期');
   const payloadDate=isISODate(data.date)?String(data.date):'';
   data.id=data.id||uid('daily');data.date=formDate;
   if(payloadDate&&payloadDate!==formDate)data.importMeta={...(data.importMeta||{}),dateMismatch:{payloadDate,selectedDate:formDate,resolution:'selected-date-wins',resolvedAt:new Date().toISOString()}};
   S.dailyLogs=S.dailyLogs.filter(x=>x.date!==formDate);S.dailyLogs.push(data);S.selectedDate=formDate;S.calendarMonth=formDate.slice(0,7);
   if(typeof importClosuresFromDailyV51==='function')importClosuresFromDailyV51(data,formDate);
   if(typeof normalizeDailyStoreV551==='function')normalizeDailyStoreV551(S);
   save();closeModals();renderAll();
   toast(payloadDate&&payloadDate!==formDate?`已按日期栏保存到${formDate}，JSON日期${payloadDate}已忽略；重要问题已进入闭环队列`:'每日记录已保存，重要问题已进入闭环队列')
  }catch(e){toast(e.message||'每日记录格式错误')}
 }
 function installFinalSaveCapture(){
  if(captureInstalled)return;captureInstalled=true;
  document.addEventListener('click',event=>{
   const button=event.target?.closest?.('#quickContent [data-save]');
   if(!button)return;
   const activeMode=document.querySelector('#quickTabs button.active')?.dataset?.mode;
   if(activeMode!=='daily')return;
   event.preventDefault();event.stopImmediatePropagation();
   saveDailyCanonicalV511()
  },true)
 }
 function reconcileAfterLegacyFinalizers(final=false){
  if(migratedThisSession&&typeof S==='object'){
   const corrected=S.dailyLogs?.some(x=>x.date===RIGHT_DATE&&x.dateCorrection?.reason==='V5.11 daily import date integrity repair');
   if(corrected){S.selectedDate=RIGHT_DATE;S.calendarMonth=RIGHT_DATE.slice(0,7);try{save();renderAll()}catch(e){}}
  }
  if(final){
   window.CAREER_OS_V511={marker:MARKER,version:'5.11.0',complete:true,backupKey:BACKUP,dateAuthority:'qDate',finalSaveCapture:true};
   if(migratedThisSession)try{toast('已将误存的7月20日记录从7月18日移回')}catch(e){}
  }
 }
 function install(){
  installFinalSaveCapture();
  migrateMisdatedRecord();
  if(migratedThisSession)[250,1000,2500,5200].forEach((ms,i)=>setTimeout(()=>reconcileAfterLegacyFinalizers(i===3),ms));
  else window.CAREER_OS_V511={marker:MARKER,version:'5.11.0',complete:true,backupKey:BACKUP,dateAuthority:'qDate',finalSaveCapture:true}
 }
 window.saveDailyCanonicalV511=saveDailyCanonicalV511;
 if(document.readyState==='loading')window.addEventListener('load',install,{once:true});else install();
 window.addEventListener('pageshow',()=>{installFinalSaveCapture();if(!window.CAREER_OS_V511?.complete)install()});
})();
