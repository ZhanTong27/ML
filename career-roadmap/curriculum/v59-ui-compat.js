(function(){
 function aliases(){
  document.querySelectorAll('[data-v59-open-track]').forEach(node=>node.dataset.v59Route=node.dataset.v59OpenTrack);
  document.querySelectorAll('[data-v59-assessment]').forEach(node=>node.dataset.v59Assess=node.dataset.v59Assessment)
 }
 function install(){
  const V=window.V59UI;if(!V?.mount)return;
  if(!V.mount.__v59Compat){const old=V.mount;const wrapped=function(){const r=old.apply(this,arguments);setTimeout(aliases,0);return r};wrapped.__v59Compat=true;V.mount=wrapped;window.mountSpecializationV59=()=>V.mount()}
  aliases()
 }
 window.addEventListener('load',()=>setTimeout(install,20),{once:true});
 window.addEventListener('pageshow',()=>setTimeout(install,0));
})();
