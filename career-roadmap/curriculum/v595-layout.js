(function(){
 const MARKER='CAREER_OS_V595_LAYOUT';
 function install(){
  if(!document.getElementById('v595-layout-style')){
   const s=document.createElement('style');
   s.id='v595-layout-style';
   s.textContent='.v59-track-grid>#crg-learning-library-v595{grid-column:1/-1;min-width:0;width:100%;max-width:100%}.crg-learning-library-v595,.crg-library-layout-v595,.crg-chapter-v595,.crg-sources-v595{min-width:0}.crg-source-v595 a,.crg-chapter-v595 h2,.crg-question-v595{overflow-wrap:anywhere}';
   document.head.appendChild(s);
  }
  window.CAREER_OS_V595_LAYOUT={marker:MARKER,complete:Boolean(document.getElementById('v595-layout-style')),updatedAt:new Date().toISOString()};
 }
 install();
 window.addEventListener('load',install,{once:true});
 window.addEventListener('pageshow',install);
})();
