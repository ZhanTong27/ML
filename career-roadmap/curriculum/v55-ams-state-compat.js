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
 function wrap(){
  if(typeof installAMSFrontierV55==='function'&&!installAMSFrontierV55.__stateCompat){
   const oldInstall=installAMSFrontierV55;
   const wrappedInstall=function(){ensure();return oldInstall.apply(this,arguments)};
   wrappedInstall.__stateCompat=true;
   installAMSFrontierV55=wrappedInstall;
  }
  if(typeof renderAMSFrontierV55==='function'&&!renderAMSFrontierV55.__stateCompat){
   const oldRender=renderAMSFrontierV55;
   const wrappedRender=function(){ensure();return oldRender.apply(this,arguments)};
   wrappedRender.__stateCompat=true;
   renderAMSFrontierV55=wrappedRender;
   if(typeof renderFrontierV50==='function'&&renderFrontierV50===oldRender)renderFrontierV50=wrappedRender;
  }
 }
 function settle(){ensure();wrap()}
 window.ensureAMSFrontierStateV55=ensure;
 settle();
 window.addEventListener('load',settle,{once:true});
 window.addEventListener('pageshow',settle);
 window.addEventListener('focus',settle);
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)settle()});
})();
