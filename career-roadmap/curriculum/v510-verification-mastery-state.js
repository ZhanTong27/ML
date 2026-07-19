(function(){
 const KEY='zhantong-career-os-v5';
 const BACKUP='zhantong-career-os-v5-pre-v510-verification-mastery';
 function now(){return new Date().toISOString()}
 function chapterState(ch){return{id:ch.id,status:'not_started',lecture:false,readingIds:[],knowledgeFiles:[],guidedExample:false,notes:'',assessment:{status:'locked',score:null,review:''},updatedAt:''}}
 function install(){
  if(typeof S!=='object'||!window.VERIFICATION_MASTERY_V510)return;
  try{const raw=localStorage.getItem(KEY);if(raw&&!localStorage.getItem(BACKUP))localStorage.setItem(BACKUP,raw)}catch(e){console.error('V5.10 backup failed',e)}
  const old=S.verificationMasteryV510||{},packages={};
  VERIFICATION_MASTERY_V510.packages.forEach(p=>{
   const prev=old.packages?.[p.id]||{},chapters={};
   p.chapters.forEach(ch=>chapters[ch.id]={...chapterState(ch),...(prev.chapters?.[ch.id]||{}),id:ch.id});
   packages[p.id]={id:p.id,status:prev.status||'not_started',currentChapterId:p.chapters.some(x=>x.id===prev.currentChapterId)?prev.currentChapterId:p.chapters[0].id,chapters,notes:prev.notes||'',updatedAt:prev.updatedAt||''};
  });
  S.verificationMasteryV510={
   version:'5.10.0',trackId:'verification-mastery',status:old.status||'not_started',
   activePackageId:VERIFICATION_MASTERY_V510.packages.some(x=>x.id===old.activePackageId)?old.activePackageId:VERIFICATION_MASTERY_V510.ui.defaultPackage,
   packages,priorKnowledge:Array.isArray(old.priorKnowledge)?old.priorKnowledge:[],
   readingNotes:old.readingNotes&&typeof old.readingNotes==='object'?old.readingNotes:{},
   knowledgeFiles:old.knowledgeFiles&&typeof old.knowledgeFiles==='object'?old.knowledgeFiles:{},
   industryCaseNotes:old.industryCaseNotes&&typeof old.industryCaseNotes==='object'?old.industryCaseNotes:{},
   workSeparationAccepted:Boolean(old.workSeparationAccepted),updatedAt:old.updatedAt||now()
  };
  window.CAREER_OS_V510_STATE={version:'5.10.0',complete:true,backupKey:BACKUP,installedAt:now()};
  try{if(typeof save==='function')save()}catch(e){console.error('V5.10 state save failed',e)}
 }
 window.ensureVerificationMasteryV510=install;
 window.addEventListener('load',install,{once:true});
 window.addEventListener('pageshow',install);
})();
