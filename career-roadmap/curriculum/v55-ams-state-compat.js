(function(){
 const MARKER='CAREER_OS_V55_AMS_STATE_COMPAT';
 function ensure(){
  if(typeof S!=='object'||!S)return false;
  const raw=S.amsFrontierV55;
  const base=raw&&typeof raw==='object'&&!Array.isArray(raw)?raw:{};
  const reading=base.reading&&typeof base.reading==='object'&&!Array.isArray(base.reading)?base.reading:{};
  const chapters=base.chapters&&typeof base.chapters==='object'&&!Array.isArray(base.chapters)?base.chapters:{};
  S.amsFrontierV55={...base,reading,chapters,note:typeof base.note==='string'?base.note:'',updatedAt:typeof base.updatedAt==='string'?base.updatedAt:''};
  window.CAREER_OS_V55_AMS_STATE_COMPAT={marker:MARKER,complete:true,readingKeys:Object.keys(reading).length,chapterKeys:Object.keys(chapters).length,updatedAt:new Date().toISOString()};
  return true;
 }
 window.ensureAMSFrontierStateV55=ensure;
 ensure();
 window.addEventListener('load',ensure,{once:true});
 window.addEventListener('pageshow',ensure);
 window.addEventListener('focus',ensure);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)ensure()});
})();
