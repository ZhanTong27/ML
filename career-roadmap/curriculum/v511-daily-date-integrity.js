(function(){
 const MARKER='CAREER_OS_V511_DAILY_DATE_INTEGRITY';
 const BACKUP='zhantong-career-os-v5-pre-v511-daily-date';
 const WRONG_DATE='2026-07-18',RIGHT_DATE='2026-07-20';
 const SIGNATURES=['line coverage','时钟与复位UT自动生成','尚未进入生成器实现阶段'];
 const originalQuickForm=window.quickForm;
 const originalSaveQuick=window.saveQuick;
 const originalOpenQuick=window.openQuick;

 function isISODate(value){return /^\d{4}-\d{2}-\d{2}$/.test(String(value||''))}
 function recordText(record){try{return JSON.stringify(record||{})}catch{return String(record||'')}}
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
   S.dailyDateIntegrityV511={...(S.dailyDateIntegrityV511||{}),version:'5.11.0',checkedAt:new Date().toISOString(),status:'no-misdated-record'};
   return false
  }
  let changed=false;
  candidates.forEach(record=>{
   const existing=S.dailyLogs.find(x=>x!==record&&x.date===RIGHT_DATE);
   if(existing){
    if(sameRecord(record,existing)){
     S.dailyLogs=S.dailyLogs.filter(x=>x!==record);changed=true
    }else{
     record.dateIntegrityConflict={targetDate:RIGHT_DATE,detectedAt:new Date().toISOString(),reason:'target-date-already-has-different-record'}
    }
   }else{
    record.date=RIGHT_DATE;
    record.dateCorrection={from:WRONG_DATE,to:RIGHT_DATE,reason:'V5.11 daily import date integrity repair',correctedAt:new Date().toISOString()};
    changed=true
   }
  });
  if(changed&&S.selectedDate===WRONG_DATE)S.selectedDate=RIGHT_DATE;
  S.dailyDateIntegrityV511={version:'5.11.0',checkedAt:new Date().toISOString(),status:changed?'corrected':'conflict',from:WRONG_DATE,to:RIGHT_DATE,matched:candidates.length};
  try{save()}catch(e){}
  if(changed)setTimeout(()=>{try{renderAll();toast('已将误存的7月20日记录从7月18日移回')}catch(e){}},0);
  return changed
 }

 window.openQuick=function(mode='daily'){
  if(mode==='daily')window.__dailyQuickDefaultDateV511=localISO();
  return originalOpenQuick(mode)
 };

 window.quickForm=function(mode){
  if(mode!=='daily')return originalQuickForm(mode);
  const date=window.__dailyQuickDefaultDateV511||localISO();
  return `<div class="quick-form"><div class="prompt-box"><div class="prompt-head"><div><b>${PROMPTS.daily.title}</b><p class="muted" style="margin:3px 0">${PROMPTS.daily.description}</p></div><button class="secondary small-btn" data-copy="daily">复制Prompt</button></div></div><label>日期<input id="qDate" type="date" value="${date}"></label><p class="muted" style="margin:-4px 0 3px">日期栏是最终保存日期；若JSON中的date不同，将以此处为准并记录冲突。</p><label>AI输出<textarea id="qText" placeholder="粘贴每日记录JSON；无法提供JSON时也可以粘贴完整文本。"></textarea></label><div class="actions"><button class="primary" data-save>保存并更新网站</button></div></div>`
 };

 window.saveQuick=function(mode){
  if(mode!=='daily')return originalSaveQuick(mode);
  try{
   const parsed=parseMaybeJSON($('#qText').value);
   if(!parsed||typeof parsed!=='object'||Array.isArray(parsed))throw new Error('每日记录必须是JSON对象或完整文本');
   const formDate=$('#qDate').value||localISO();
   if(!isISODate(formDate))throw new Error('请选择有效日期');
   const payloadDate=isISODate(parsed.date)?parsed.date:'';
   const data={...parsed};
   data.id=data.id||uid('daily');
   data.date=formDate;
   if(payloadDate&&payloadDate!==formDate){
    data.importMeta={...(data.importMeta||{}),dateMismatch:{payloadDate,selectedDate:formDate,resolution:'selected-date-wins',resolvedAt:new Date().toISOString()}}
   }
   S.dailyLogs=S.dailyLogs.filter(x=>x.date!==formDate);
   S.dailyLogs.push(data);
   S.selectedDate=formDate;
   S.calendarMonth=formDate.slice(0,7);
   save();closeModals();renderAll();
   toast(payloadDate&&payloadDate!==formDate?`已按日期栏保存到${formDate}，JSON日期${payloadDate}已忽略`:'已保存并更新')
  }catch(e){toast(e.message||'内容格式错误')}
 };

 function install(){
  migrateMisdatedRecord();
  window.CAREER_OS_V511={marker:MARKER,version:'5.11.0',complete:true,backupKey:BACKUP,dateAuthority:'qDate'}
 }
 if(document.readyState==='loading')window.addEventListener('load',install,{once:true});else install();
 window.addEventListener('pageshow',install);
})();
