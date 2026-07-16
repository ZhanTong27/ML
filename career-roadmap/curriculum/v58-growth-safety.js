(function(){
 const canonical='zhantong-career-os-v5';
 const backup='zhantong-career-os-v5-pre-v58-backup';
 const manifest='zhantong-career-os-v5-pre-v58-manifest';
 try{
  const raw=localStorage.getItem(canonical);
  if(raw&&!localStorage.getItem(backup)){
   localStorage.setItem(backup,raw);
   localStorage.setItem(manifest,JSON.stringify({createdAt:new Date().toISOString(),sourceKey:canonical,backupKey:backup,bytes:raw.length,reason:'Before V5.8 human-centered Growth UI migration'}));
  }
  window.CAREER_OS_V58_SAFETY={version:'5.8.0',canonicalKey:canonical,backupKey:backup,manifestKey:manifest,backupPresent:Boolean(localStorage.getItem(backup))};
 }catch(e){
  window.CAREER_OS_V58_SAFETY={version:'5.8.0',backupPresent:false,error:String(e&&e.message?e.message:e)};
  console.error('Career OS V5.8 safety backup failed',e)
 }
})();
