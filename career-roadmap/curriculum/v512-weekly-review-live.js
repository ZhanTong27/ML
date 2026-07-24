(function(){
 const MARKER='CAREER_OS_V512_WEEKLY_REVIEW_LIVE';
 const BACKUP='zhantong-career-os-v5-pre-v512-weekly-live';
 let busy=false,captureInstalled=false,lastSignature='';
 const arr=value=>Array.isArray(value)?value:[];
 const esc=value=>String(value??'').replace(/[&<>"']/g,ch=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[ch]));

 function bounds(range,record={}){
  let start=String(record?.rangeStart||record?.start||''),end=String(record?.rangeEnd||record?.end||'');
  if(range&&typeof range==='object'){start=String(range.start||start||'');end=String(range.end||end||'')}
  else if(typeof range==='string'){const dates=range.match(/\d{4}-\d{2}-\d{2}/g)||[];start=start||dates[0]||'';end=end||dates[1]||dates[0]||''}
  return{start,end,label:start&&end?`${start}—${end}`:(start||end||(typeof range==='string'?range:''))}
 }
 function isFormal(record){return record?.schemaVersion==='career-os-v4-weekly-1'||Boolean(record?.reviewId&&Array.isArray(record?.diagnosisUpdates)&&record?.range)}
 function normalize(record,fallbackRange=''){
  const copy={...(record||{})};const b=bounds(copy.range||fallbackRange,copy);
  if(!b.start||!b.end)throw new Error('Weekly Patch range必须包含开始和结束日期');
  copy.schemaVersion=copy.schemaVersion||'career-os-v4-weekly-1';
  copy.reviewId=copy.reviewId||`weekly-${b.start}-${b.end}`;
  copy.range={start:b.start,end:b.end};copy.rangeStart=b.start;copy.rangeEnd=b.end;copy.rangeLabel=b.label;copy.rangeContract='career-os-weekly-period-v2';
  copy.highlights=arr(copy.highlights);copy.topEvidenceIds=arr(copy.topEvidenceIds);copy.diagnosisUpdates=arr(copy.diagnosisUpdates);copy.resumeCandidates=arr(copy.resumeCandidates);copy.missingInformation=arr(copy.missingInformation);
  copy.courseDecision=copy.courseDecision||{};copy.courseDecision.addedTasks=arr(copy.courseDecision.addedTasks);copy.nextWeek=copy.nextWeek||{};
  copy.importedAt=copy.importedAt||new Date().toISOString();copy.isCanonical=copy.isCanonical!==false;
  return copy
 }
 function backup(){try{if(!localStorage.getItem(BACKUP))localStorage.setItem(BACKUP,JSON.stringify(S))}catch(e){}}
 function reviewKey(record){return record?.reviewId||`${bounds(record?.range,record).label}|${record?.summary||''}`}
 function upsertFormal(record){
  S.weeklyReviewRecords=arr(S.weeklyReviewRecords);const key=reviewKey(record);const index=S.weeklyReviewRecords.findIndex(x=>reviewKey(x)===key);
  if(index>=0)S.weeklyReviewRecords[index]={...S.weeklyReviewRecords[index],...record};else S.weeklyReviewRecords.push(record);
 }
 function applyDiagnosisUpdates(record){
  S.diagnoses=arr(S.diagnoses);S.careerModel=arr(S.careerModel);S.diagnosisHistory=arr(S.diagnosisHistory);S.pendingConfidence=arr(S.pendingConfidence);
  record.diagnosisUpdates.forEach(update=>{
   const diagnosis=S.diagnoses.find(x=>x.id===update.diagnosisId);if(diagnosis&&update.lifecycle)diagnosis.lifecycle=update.lifecycle;
   let model=S.careerModel.find(x=>x.diagnosisId===update.diagnosisId);
   if(!model){model={diagnosisId:update.diagnosisId,topic:diagnosis?.topic||update.diagnosisId,hypothesis:diagnosis?.hypothesis||'',diagnosisConfidence:0};S.careerModel.push(model)}
   model.diagnosisConfidence=Number(update.confirmedConfidence||0);model.evidenceStrength=update.evidenceStrength||model.evidenceStrength;model.lastReason=update.reason||'';model.lastSeen=record.range.end;model.lastReviewId=record.reviewId;
   const historyIndex=S.diagnosisHistory.findIndex(x=>x.reviewId===record.reviewId&&x.diagnosisId===update.diagnosisId);
   const history={diagnosisId:update.diagnosisId,date:record.range.end,confidence:Number(update.confirmedConfidence||0),source:'weekly_review',reviewId:record.reviewId};
   if(historyIndex>=0)S.diagnosisHistory[historyIndex]={...S.diagnosisHistory[historyIndex],...history};else S.diagnosisHistory.push(history);
   S.pendingConfidence=S.pendingConfidence.filter(x=>x.diagnosisId!==update.diagnosisId)
  })
 }
 function ensureLegacyMirror(record){
  S.weeklyReviews=arr(S.weeklyReviews);const existing=S.weeklyReviews.find(x=>x.formalReviewId===record.reviewId||x.reviewId===record.reviewId);
  const mirror={id:existing?.id||`weekly-formal-${record.reviewId}`,formalReviewId:record.reviewId,reviewId:record.reviewId,schemaVersion:record.schemaVersion,range:record.rangeLabel,rangeStart:record.range.start,rangeEnd:record.range.end,summary:record.summary||'',highlights:record.highlights,createdAt:record.importedAt,rangeContract:'legacy-weekly-v2'};
  if(existing)Object.assign(existing,mirror);else S.weeklyReviews.unshift(mirror)
 }
 function migrate(){
  if(typeof S!=='object')return false;backup();let changed=false;
  S.weeklyReviewRecords=arr(S.weeklyReviewRecords).map(item=>{try{const normalized=normalize(item);if(JSON.stringify(normalized)!==JSON.stringify(item))changed=true;return normalized}catch(e){return item}});
  arr(S.weeklyReviews).forEach(item=>{if(!isFormal(item))return;try{const normalized=normalize(item);const before=S.weeklyReviewRecords.length;upsertFormal(normalized);applyDiagnosisUpdates(normalized);ensureLegacyMirror(normalized);if(S.weeklyReviewRecords.length!==before||!item.promotedToFormalV512){item.promotedToFormalV512=true;item.formalReviewId=normalized.reviewId;changed=true}}catch(e){console.error('V5.12 weekly promotion failed',e)}});
  S.weeklyReviewRecords.forEach(record=>{if(!isFormal(record))return;try{const normalized=normalize(record);applyDiagnosisUpdates(normalized);ensureLegacyMirror(normalized)}catch(e){}});
  S.weeklyLiveV512={version:'5.12.0',formalCount:S.weeklyReviewRecords.length,updatedAt:new Date().toISOString()};
  if(changed)try{save()}catch(e){};return changed
 }
 function sortedReviews(){return arr(S?.weeklyReviewRecords).filter(isFormal).map(item=>{try{return normalize(item)}catch(e){return null}}).filter(Boolean).sort((a,b)=>{const ad=a.range.end||'',bd=b.range.end||'';if(ad!==bd)return bd.localeCompare(ad);return String(b.importedAt||b.reviewId).localeCompare(String(a.importedAt||a.reviewId))})}
 function latestReview(){return sortedReviews()[0]||null}
 function weekLabel(record){const match=String(record.reviewId||'').match(/\d{4}-W\d+/i);return match?match[0].toUpperCase():record.rangeLabel}
 function headline(record){return record.headline||record.title||record.nextWeek?.priority||record.highlights?.[0]||String(record.summary||'最新周度Career Model Review').slice(0,42)}
 function actionLabel(action){return({keep:'保持当前路线',light_adjustment:'轻量调整',defer:'暂缓',gate_review:'进入Gate Review'})[action]||action||'待确认'}
 function diagnosisRows(record){return record.diagnosisUpdates.map(update=>`<article><div><h4>${esc(S?.diagnoses?.find(x=>x.id===update.diagnosisId)?.topic||update.diagnosisId)}</h4><p>${esc(update.reason||'')}</p><small>支持：${esc(arr(update.supportingEvidenceIds).join(' · ')||'无')}<br>反证：${esc(arr(update.counterEvidenceIds).join(' · ')||'无')}</small></div><div class="weekly-pills-v595"><span>${esc(update.lifecycle||'collecting')}</span><span>${Number(update.previousConfidence||0)}% → ${Number(update.confirmedConfidence||0)}%</span><span>${esc(update.evidenceStrength||'low')}</span></div></article>`).join('')}
 function compact(record){return `<div class="weekly-current-head-v595"><div><div class="eyebrow">WEEKLY CAREER MODEL REVIEW · ${esc(weekLabel(record))} · 最新记录</div><h2>${esc(headline(record))}</h2></div><span class="tag good">${esc(record.reviewId)}</span></div><p>${esc(record.summary||'')}</p><div class="weekly-current-grid-v595"><section><small>Diagnosis校准</small><b>${record.diagnosisUpdates.length} 项</b></section><section><small>课程判断</small><b>${esc(actionLabel(record.courseDecision?.action))}</b></section><section><small>范围</small><b>${esc(record.rangeLabel)}</b></section></div>`}
 function archiveCards(reviews){return reviews.map((record,index)=>`<article class="card weekly-v512-archive-card" data-review-id="${esc(record.reviewId)}"><div class="weekly-current-head-v595"><div><div class="eyebrow">${esc(weekLabel(record))}${index===0?' · 最新':''}</div><h3>${esc(headline(record))}</h3></div><span class="tag">${esc(record.rangeLabel)}</span></div><p>${esc(record.summary||'')}</p></article>`).join('')}
 function full(record,reviews){
  const resumeText=record.resumeCandidates.length?`${record.resumeCandidates.length} 项候选证据，仍需人工确认。`:'本周未形成新的简历候选条目。';
  return `<div class="section-title split-title"><div><div class="eyebrow">WEEKLY CAREER MODEL REVIEW · ${esc(weekLabel(record))} · SOURCE OF TRUTH</div><h2>${esc(record.range.start)} 至 ${esc(record.range.end)}</h2><p>页面动态读取最新正式周复盘；历史记录保留在下方归档。</p></div><span class="tag good">${esc(record.reviewId)}</span></div><article class="card weekly-executive-v595"><h3>本周结论</h3><p>${esc(record.summary||'')}</p></article>${record.highlights.length?`<article class="card weekly-v596-highlights"><div class="eyebrow">HIGHLIGHTS</div><h3>本周工作主线与关键判断</h3><ol>${record.highlights.map(item=>`<li>${esc(item)}</li>`).join('')}</ol>${record.topEvidenceIds.length?`<p><b>Top Evidence：</b>${esc(record.topEvidenceIds.join(' · '))}</p>`:''}</article>`:''}<details class="card weekly-calibration-v595" open><summary><b>Diagnosis Calibration</b><span>${record.diagnosisUpdates.length} 项</span></summary><div>${diagnosisRows(record)||'<p class="muted">本周没有Diagnosis调整。</p>'}</div></details><div class="weekly-detail-grid-v595"><article class="card"><div class="eyebrow">COURSE DECISION</div><h3>${esc(actionLabel(record.courseDecision?.action))}</h3><p>${esc(record.courseDecision?.reason||'')}</p></article><article class="card"><div class="eyebrow">NEXT WEEK PRIORITY</div><h3>最重要行动</h3><p>${esc(record.nextWeek?.priority||'待补充')}</p></article><article class="card"><div class="eyebrow">RESUME EVIDENCE</div><h3>${record.resumeCandidates.length?'存在候选':'暂无新增'}</h3><p>${esc(resumeText)}</p></article></div>${record.courseDecision?.addedTasks?.length?`<div class="section-title"><div class="eyebrow">NEXT WEEK INTERVENTIONS</div><h2>建议行动</h2></div><div class="weekly-interventions-v595">${record.courseDecision.addedTasks.map((item,index)=>`<article class="card"><span class="tag">P${index+1}</span><p>${esc(item)}</p></article>`).join('')}</div>`:''}<article class="card weekly-v596-next"><div class="eyebrow">WORK / LEARNING / FEEDBACK</div><p><b>工作重点：</b>${esc(record.nextWeek?.workFocus||'待补充')}</p><p><b>学习重点：</b>${esc(record.nextWeek?.learningFocus||'待补充')}</p><p><b>反馈问题：</b>${esc(record.nextWeek?.feedbackQuestion||'待补充')}</p></article>${record.missingInformation.length?`<details class="card weekly-questions-v595"><summary><b>仍缺少的信息</b><span>${record.missingInformation.length} 项</span></summary><ol>${record.missingInformation.map(item=>`<li>${esc(item)}</li>`).join('')}</ol></details>`:''}<div class="section-title"><div class="eyebrow">WEEKLY REVIEW ARCHIVE</div><h2>历史周复盘</h2></div><div class="weekly-v512-archive-list">${archiveCards(reviews)}</div>`
 }
 function mount(){
  if(busy||typeof document==='undefined'||typeof S!=='object')return false;busy=true;
  try{
   migrate();const reviews=sortedReviews(),record=reviews[0];if(!record)return false;
   const signature=`${record.reviewId}|${record.rangeLabel}|${reviews.length}|${record.importedAt}`;
   let current=document.getElementById('weekly-review-current-v595');
   if(!current){const week=document.getElementById('growth-week-v58');if(week){const status=week.querySelector('.growth-status-v58');const html='<article class="card weekly-current-v595 weekly-current-v596 weekly-current-v512" id="weekly-review-current-v595"></article>';if(status)status.insertAdjacentHTML('afterend',html);else week.insertAdjacentHTML('afterbegin',html);current=document.getElementById('weekly-review-current-v595')}}
   let detail=document.getElementById('weekly-review-detail-v595');
   if(!detail){const archive=document.getElementById('growth-archive-v58');if(archive){archive.insertAdjacentHTML('afterbegin','<section id="weekly-review-detail-v595" class="weekly-detail-v595 weekly-detail-v596 weekly-detail-v512"></section>');detail=document.getElementById('weekly-review-detail-v595')}}
   if(signature!==lastSignature||current?.dataset.v512Signature!==signature||detail?.dataset.v512Signature!==signature){
    if(current){current.classList.add('weekly-current-v596','weekly-current-v512');current.dataset.v512Signature=signature;current.innerHTML=compact(record)}
    if(detail){detail.classList.add('weekly-detail-v596','weekly-detail-v512');detail.dataset.v512Signature=signature;detail.innerHTML=full(record,reviews)}
    lastSignature=signature
   }
   return Boolean(current&&detail)
  }finally{busy=false}
 }
 function saveFormalFromQuick(record){
  const fallback=document.querySelector('#qRange')?.value||'';const normalized=normalize(record,fallback);backup();upsertFormal(normalized);applyDiagnosisUpdates(normalized);ensureLegacyMirror(normalized);S.weeklyLiveV512={version:'5.12.0',lastImportedReviewId:normalized.reviewId,updatedAt:new Date().toISOString()};save();closeModals();renderAll();mount();toast(`周度Review已导入并展示：${normalized.rangeLabel}`)
 }
 function installCapture(){
  if(captureInstalled)return;captureInstalled=true;
  document.addEventListener('click',event=>{
   const button=event.target?.closest?.('#quickContent [data-save]');if(!button)return;
   const mode=document.querySelector('#quickTabs button.active')?.dataset?.mode;if(mode!=='weekly')return;
   let parsed;try{parsed=parseMaybeJSON(document.querySelector('#qText')?.value||'')}catch(e){return}
   if(!isFormal(parsed))return;
   event.preventDefault();event.stopImmediatePropagation();try{saveFormalFromQuick(parsed)}catch(e){toast(e.message||'Weekly Patch格式错误')}
  },true);
  document.addEventListener('click',event=>{if(event.target?.closest?.('#importWeeklyV4'))setTimeout(()=>{migrate();mount()},80)},true)
 }
 function styles(){if(document.getElementById('v512-style'))return;const style=document.createElement('style');style.id='v512-style';style.textContent='.weekly-current-v512{border-left-color:#38bdf8}.weekly-v512-archive-list{display:grid;gap:12px}.weekly-v512-archive-card{margin:0}.weekly-detail-v512 .weekly-calibration-v595>div>article{align-items:start}.weekly-detail-v512 small{color:var(--muted);line-height:1.55}';document.head.appendChild(style)}
 function install(){styles();installCapture();migrate();mount();if(!window.__careerOSV512Observer){window.__careerOSV512Observer=new MutationObserver(()=>{if(!busy)requestAnimationFrame(mount)});window.__careerOSV512Observer.observe(document.body,{childList:true,subtree:true})}window.CAREER_OS_V512={marker:MARKER,version:'5.12.0',complete:true,backupKey:BACKUP,sourceOfTruth:'weeklyReviewRecords'}}
 if(document.readyState==='loading')window.addEventListener('load',()=>[0,150,700,2200,5000].forEach(delay=>setTimeout(install,delay)),{once:true});else install();
 window.addEventListener('pageshow',()=>setTimeout(install,120));window.addEventListener('focus',()=>setTimeout(()=>{migrate();mount()},100));window.addEventListener('storage',()=>setTimeout(()=>{migrate();mount()},80));
})();
