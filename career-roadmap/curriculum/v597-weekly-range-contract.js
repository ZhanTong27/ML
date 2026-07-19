(function(){
 const MARKER='CAREER_OS_V597_WEEKLY_RANGE_CONTRACT',BACKUP='zhantong-career-os-v5-pre-v597-weekly-range';
 function bounds(range,record={}){
  let start=String(record?.rangeStart||record?.start||''),end=String(record?.rangeEnd||record?.end||'');
  if(range&&typeof range==='object'){start=String(range.start||start||'');end=String(range.end||end||'')}
  else if(typeof range==='string'){const d=range.match(/\d{4}-\d{2}-\d{2}/g)||[];start=start||d[0]||'';end=end||d[1]||d[0]||''}
  return{start,end,label:start&&end?`${start}—${end}`:(start||end||(typeof range==='string'?range:''))}
 }
 function migrate(){
  if(typeof S!=='object')return false;
  try{if(!localStorage.getItem(BACKUP))localStorage.setItem(BACKUP,JSON.stringify(S))}catch(e){}
  S.weeklyReviews=Array.isArray(S.weeklyReviews)?S.weeklyReviews.map(x=>{const b=bounds(x?.range,x);return{...x,range:b.label,rangeStart:b.start,rangeEnd:b.end,rangeContract:'legacy-weekly-v2'}}):[];
  S.weeklyReviewRecords=Array.isArray(S.weeklyReviewRecords)?S.weeklyReviewRecords.map(x=>{const b=bounds(x?.range,x);return{...x,range:{start:b.start,end:b.end},rangeLabel:b.label,rangeContract:'career-os-weekly-period-v2'}}):[];
  S.weeklyRangeContractV597={version:'5.9.7',legacyCollection:'weeklyReviews.range:string + rangeStart/rangeEnd',formalCollection:'weeklyReviewRecords.range:{start,end} + rangeLabel',migratedAt:S.weeklyRangeContractV597?.migratedAt||new Date().toISOString()};
  try{if(typeof save==='function')save()}catch(e){console.error('V5.9.7 range migration save failed',e)}return true
 }
 function badge(){document.title='Zhantong · Career OS V5.9.7';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.9.7';const actions=document.querySelector('.top-actions');if(actions&&!document.getElementById('versionBadgeV597'))actions.insertAdjacentHTML('afterbegin','<span class="sync" id="versionBadgeV597">V5.9.7 · 周报范围已升级</span>')}
 function install(){migrate();badge();window.CAREER_OS_V597={marker:MARKER,version:'5.9.7',complete:true,backupKey:BACKUP}}
 if(document.readyState==='loading')window.addEventListener('load',install,{once:true});else install();
 window.addEventListener('pageshow',()=>{migrate();badge()});window.addEventListener('focus',()=>{migrate();badge()});
})();
