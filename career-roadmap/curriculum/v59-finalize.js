(function(){
 function identity(){if(typeof S!=='undefined')S.version='5.9.0';document.title='Zhantong · Career OS V5.9';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.9'}
 function marker(reason){
  const s=typeof S!=='undefined'?S.specializationV59:null,o=window.SPECIALIZATION_V59?.tracks?.ocldo?.units||[],u=window.SPECIALIZATION_V59?.tracks?.uvmms?.units||[];
  const complete=Boolean(s&&o.length===10&&u.length===9&&document.querySelectorAll('.v59-track-card').length===2);
  window.CAREER_OS_V59={version:'5.9.0',reason:reason||'runtime',complete,tracks:2,unitCounts:{ocldo:o.length,uvmms:u.length,total:o.length+u.length},backupPresent:Boolean(localStorage.getItem('zhantong-career-os-v5-pre-v59-backup')),migration:window.CAREER_OS_V59_MIGRATION||null,ui:window.CAREER_OS_V59_UI||null,updatedAt:new Date().toISOString()};
  if(typeof S!=='undefined'){S.specializationUpdateV59=window.CAREER_OS_V59;identity();if(typeof save==='function')save()}return complete
 }
 function installOuter(){if(typeof renderAll!=='function'||renderAll.__v59Outermost)return;const old=renderAll;const wrapped=function(){const r=old.apply(this,arguments);setTimeout(()=>settle('render'),0);return r};wrapped.__v59Outermost=true;renderAll=wrapped}
 function settle(reason){try{window.ensureSpecializationV59?.();window.mountSpecializationV59?.();identity();marker(reason)}catch(e){console.error('Career OS V5.9 finalize failed',e)}}
 window.addEventListener('load',()=>{installOuter();[0,350,1200,2600].forEach((d,i)=>setTimeout(()=>settle('load-'+i),d))},{once:true});
 window.addEventListener('pageshow',()=>settle('pageshow'));
 window.addEventListener('focus',()=>settle('focus'));
 document.addEventListener('visibilitychange',()=>{if(!document.hidden)settle('visible')});
})();
