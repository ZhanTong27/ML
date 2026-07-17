(function(){
 const V=window.V59UI,E=V.E;
 V.patchLegacy=()=>{
  if(window.GROWTH_STORY_V58)GROWTH_STORY_V58.currentTopic={title:'平行专项学习：OCLDO Verification + UVM-MS',description:'一条建立数字控制片上电源领域能力，一条建立通用数模混合验证方法；状态、证据和Capstone完全独立。'};
  if(typeof renderOCLDODossierV55==='function'&&!renderOCLDODossierV55.__v59Term){
   const old=renderOCLDODossierV55;
   const wrapped=o=>`<article class="card v59-term-boundary"><div class="eyebrow">TERMINOLOGY BOUNDARY</div><h3>${E(V.spec().legacy.analogOcldoTitle)}</h3><p><b>${E(V.spec().legacy.analogOcldoCn)}</b></p><p>${E(V.spec().legacy.analogOcldoDisclaimer)}</p></article>`+old(o).replace('Output-Capacitorless LDO / OCL-LDO','Analog Output-Capacitorless LDO Background');
   wrapped.__v59Term=true;renderOCLDODossierV55=wrapped
  }
 };
 const oldBind=V.bind;
 V.bind=()=>{
  oldBind();
  V.qa('[data-v59-pause-week]').forEach(b=>b.onclick=()=>v59PauseTrack(b.dataset.v59PauseWeek));
  V.qa('[data-v59-open-track-week]').forEach(b=>b.onclick=()=>V.openTrack(b.dataset.v59OpenTrackWeek))
 };
})();
