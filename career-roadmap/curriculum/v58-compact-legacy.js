(function(){
 function compactV58(){
  const today=document.getElementById('uvmmsTodayV57');
  if(today&&!today.querySelector('.v58-topic-line')){
   today.dataset.v58Compact='true';
   today.innerHTML=`<article class="card v58-topic-line"><div><div class="eyebrow">CURRENT LEARNING TOPIC</div><h3>UVM-MS验证方法学研究</h3><p>研究它是否能减少多模型接入中的重复工作；完整路线、资料和AI自测集中在“成长 → 学习专题”。</p></div><button class="secondary small-btn" id="openGrowthTopicV58">打开学习专题 →</button></article>`;
   document.getElementById('openGrowthTopicV58')?.addEventListener('click',()=>{switchView('growth');S.growthHubV58.activeView='topics';S.growthHubV58.openLegacy='';save();mountGrowthHubV58()})
  }
  const portfolio=document.getElementById('uvmmsPortfolioV57');
  if(portfolio&&!portfolio.querySelector('.v58-topic-line')){
   portfolio.dataset.v58Compact='true';
   portfolio.innerHTML=`<article class="card v58-topic-line"><div><div class="eyebrow">EVIDENCE BOUNDARY</div><h3>UVM-MS暂不计入履历成果</h3><p>只有真实工具链原型、A/B工程判断和第二人／第二模块复用出现后，才升级为职业证据。</p></div><button class="secondary small-btn" id="openGrowthEvidenceV58">查看能力与证据 →</button></article>`;
   document.getElementById('openGrowthEvidenceV58')?.addEventListener('click',()=>{switchView('growth');S.growthHubV58.activeView='evidence';S.growthHubV58.openLegacy='';save();mountGrowthHubV58()})
  }
 }
 window.compactLegacyV58=compactV58;
 function install(){
  compactV58();
  if(typeof renderAll==='function'&&!renderAll.__compactV58Wrapped){const previous=renderAll;const wrapped=function(){const r=previous.apply(this,arguments);setTimeout(compactV58,0);return r};wrapped.__compactV58Wrapped=true;renderAll=wrapped}
  if(!document.getElementById('v58-compact-style')){const s=document.createElement('style');s.id='v58-compact-style';s.textContent=`.v58-topic-line{display:flex;justify-content:space-between;gap:14px;align-items:center;border-left:3px solid var(--cyan)}.v58-topic-line p{color:var(--muted);line-height:1.55}.v58-topic-line h3{margin:4px 0}@media(max-width:700px){.v58-topic-line{display:grid}}`;document.head.appendChild(s)}
 }
 window.addEventListener('load',()=>{[0,400,1200,2600].forEach(x=>setTimeout(install,x))},{once:true});
 window.addEventListener('pageshow',install);
 window.addEventListener('focus',install)
})();
