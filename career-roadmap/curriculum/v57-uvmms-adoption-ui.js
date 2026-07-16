window.addEventListener('load',()=>{try{installUVMMSAdoptionV57()}catch(e){console.error('UVM-MS Adoption Program V5.7 failed',e)}},{once:true});

function installUVMMSAdoptionV57(){
 const data=window.UVMMS_ADOPTION_V57;if(!data||typeof S==='undefined')return;
 ensureUVMMSStateV57();
 injectUVMMSStylesV57();
 ensureUVMMSProgramShellV57();
 wrapAMSFrontierBoundaryV57();
 renderUVMMSAdoptionV57();
}

function ensureUVMMSStateV57(){
 const data=window.UVMMS_ADOPTION_V57;
 const existing=S.uvmmsProgramV57||{};
 const deliverables={...Object.fromEntries(data.gates.flatMap(g=>g.deliverables).map(x=>[x.id,false])),...(existing.deliverables||{})};
 const evidence={...Object.fromEntries(data.evidenceLevels.map(x=>[x.id,Boolean(x.defaultDone)])),...(existing.evidence||{})};
 const metrics={...Object.fromEntries(data.metrics.map(x=>[x.id,{baseline:'',pilot:'',conclusion:''}])),...(existing.metrics||{})};
 data.metrics.forEach(x=>metrics[x.id]={baseline:'',pilot:'',conclusion:'',...(metrics[x.id]||{})});
 const organization={...Object.fromEntries(data.organization.map(x=>[x.id,x.value])),...(existing.organization||{})};
 S.uvmmsProgramV57={
  currentGate:data.currentGate,
  decision:'evaluating',
  deliverables,
  evidence,
  metrics,
  organization,
  note:'',
  updatedAt:'',
  ...existing,
  deliverables,
  evidence,
  metrics,
  organization
 };
 save()
}

function ensureUVMMSProgramShellV57(){
 const weekly=document.getElementById('weeklyReminder');
 if(weekly&&!document.getElementById('uvmmsTodayV57')){
  const host=document.createElement('div');host.id='uvmmsTodayV57';host.className='uvmms-today-v57';weekly.insertAdjacentElement('afterend',host)
 }
 const growth=document.getElementById('growth'),problem=document.getElementById('problem-journal'),growthLibrary=document.getElementById('growth-library-v50');
 let program=document.getElementById('uvmms-adoption-v57');
 if(growth&&!program){program=document.createElement('section');program.className='content-section';program.id='uvmms-adoption-v57'}
 if(growth&&program){
  if(growthLibrary)growthLibrary.insertAdjacentElement('beforebegin',program);
  else if(problem)problem.parentNode.insertBefore(program,problem);
  else growth.appendChild(program)
 }
 const growthIndex=growth?.querySelector('.page-index');
 if(growthIndex){
  let button=growthIndex.querySelector('[data-scroll-v50="uvmms-adoption-v57"],[data-scroll="uvmms-adoption-v57"]');
  if(!button){
   button=document.createElement('button');button.textContent='UVM-MS试点';button.setAttribute('data-scroll-v50','uvmms-adoption-v57');
   const libraryButton=growthIndex.querySelector('[data-scroll-v50="growth-library-v50"]');
   const currentButton=growthIndex.querySelector('[data-scroll-v50="weekly-command-v50"],[data-scroll="current-execution"]');
   if(libraryButton)libraryButton.insertAdjacentElement('beforebegin',button);else if(currentButton)currentButton.insertAdjacentElement('afterend',button);else growthIndex.appendChild(button)
  }
  button.onclick=()=>{document.getElementById('uvmms-adoption-v57')?.scrollIntoView({behavior:'smooth'});growthIndex.querySelectorAll('button').forEach(x=>x.classList.toggle('active',x===button))}
 }
 const library=document.getElementById('project-library'),grid=document.getElementById('projectGrid');
 if(library&&grid&&!document.getElementById('uvmmsPortfolioV57')){
  const host=document.createElement('div');host.id='uvmmsPortfolioV57';host.className='uvmms-portfolio-host-v57';grid.insertAdjacentElement('beforebegin',host)
 }
}

function renderUVMMSAdoptionV57(){
 ensureUVMMSProgramShellV57();
 renderUVMMSTodayV57();
 renderUVMMSGrowthV57();
 renderUVMMSPortfolioV57();
 renderUVMMSFrontierBoundaryV57()
}

function uvmmsStateV57(){return S.uvmmsProgramV57}
function uvmmsDataV57(){return window.UVMMS_ADOPTION_V57}
function uvmmsGateV57(){const d=uvmmsDataV57(),s=uvmmsStateV57();return d.gates.find(x=>x.id===s.currentGate)||d.gates[0]}
function uvmmsGateProgressV57(gate){const s=uvmmsStateV57(),done=gate.deliverables.filter(x=>s.deliverables[x.id]).length;return{done,total:gate.deliverables.length,pct:gate.deliverables.length?Math.round(done/gate.deliverables.length*100):0}}
function uvmmsEvidenceProgressV57(){const d=uvmmsDataV57(),s=uvmmsStateV57(),done=d.evidenceLevels.filter(x=>s.evidence[x.id]).length;return{done,total:d.evidenceLevels.length,pct:Math.round(done/d.evidenceLevels.length*100)}}
function uvmmsGateStatusV57(gate){const d=uvmmsDataV57(),s=uvmmsStateV57(),activeIndex=d.gates.findIndex(x=>x.id===s.currentGate),index=d.gates.findIndex(x=>x.id===gate.id),p=uvmmsGateProgressV57(gate);if(p.done===p.total&&p.total)return'done';if(index===activeIndex)return'active';if(index<activeIndex)return'review';return'not_started'}
function uvmmsGateStatusLabelV57(status){return({done:'已形成证据',active:'当前 Gate',review:'待复核',not_started:'未开始'})[status]||status}

function renderUVMMSTodayV57(){
 const host=document.getElementById('uvmmsTodayV57');if(!host)return;
 const d=uvmmsDataV57(),gate=uvmmsGateV57(),gp=uvmmsGateProgressV57(gate),ep=uvmmsEvidenceProgressV57();
 host.innerHTML=`<article class="card uvmms-today-card-v57"><div class="uvmms-today-main-v57"><div><div class="eyebrow">STRATEGIC INITIATIVE · UVM-MS</div><h3>${esc(d.shortTitle)}</h3><p>${esc(d.currentConclusion)}</p></div><div class="uvmms-today-stats-v57"><span><small>当前阶段</small><b>${esc(gate.index)} · ${esc(gate.title)}</b></span><span><small>Gate证据</small><b>${gp.done}/${gp.total}</b></span><span><small>职业证据</small><b>${ep.done}/${ep.total}</b></span></div></div><div class="uvmms-next-v57"><div><small>当前下一步</small><b>${esc(d.currentActions[0])}</b></div><button class="secondary small-btn" id="openUVMMSProgramV57">查看完整试点路线 →</button></div></article>`;
 document.getElementById('openUVMMSProgramV57')?.addEventListener('click',()=>switchView('growth','uvmms-adoption-v57'))
}

function renderUVMMSGrowthV57(){
 const host=document.getElementById('uvmms-adoption-v57');if(!host)return;
 const d=uvmmsDataV57(),s=uvmmsStateV57(),gate=uvmmsGateV57(),ep=uvmmsEvidenceProgressV57();
 host.innerHTML=`
  <div class="section-title split-title"><div><div class="eyebrow">METHODOLOGY ADOPTION PROGRAM</div><h2>${esc(d.title)}</h2><p>不是学习打卡，而是用真实工具链、A/B数据和团队复用决定是否采用。</p></div><span class="tag learn">${esc(gate.index)} · ${esc(gate.title)}</span></div>
  <article class="card uvmms-hero-v57"><div><div class="eyebrow">CURRENT POSITION</div><h3>${esc(d.currentConclusion)}</h3><p>${esc(d.objective)}</p><div class="tag-row"><span class="tag">试点假设</span><span class="tag problem">未证明提效</span><span class="tag good">允许停止</span></div></div><div class="uvmms-hero-score-v57"><small>职业证据等级</small><b>${ep.done}/${ep.total}</b><div class="progress"><i style="width:${ep.pct}%"></i></div><p>${esc(d.currentClaim)}</p></div></article>
  <div class="grid2 uvmms-question-grid-v57"><article class="card"><div class="eyebrow">CORE QUESTION</div><h3>要解决的问题</h3><p>${esc(d.coreQuestion)}</p></article><article class="card"><div class="eyebrow">METHOD HYPOTHESIS</div><h3>需要被证伪的假设</h3><p>${esc(d.hypothesis)}</p></article></div>
  <article class="card uvmms-current-actions-v57"><div class="eyebrow">CURRENT ACTIONS</div><h3>Gate 0 当前只做三件事</h3><ol>${d.currentActions.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></article>
  <div class="section-title"><div class="eyebrow">ORGANIZATION CONDITIONS</div><h3>授权、资源与交付边界</h3><p>没有 Sponsor 和投入边界时，只能继续极小实验，不能直接进入团队推广。</p></div>
  <div class="uvmms-org-grid-v57">${d.organization.map(x=>`<label class="card uvmms-org-card-v57"><small>${esc(x.label)}</small><input data-v57-org="${esc(x.id)}" value="${esc(s.organization[x.id]||'')}" placeholder="待确认"><p>${esc(x.note)}</p></label>`).join('')}</div>
  <div class="section-title"><div class="eyebrow">FOUR EVIDENCE GATES</div><h3>从问题识别到团队采用</h3><p>只有通过前一 Gate，才扩大投入；标准化不是预设目标。</p></div>
  <div class="uvmms-gate-grid-v57">${d.gates.map(renderUVMMSGateV57).join('')}</div>
  <div class="section-title"><div class="eyebrow">A/B EVIDENCE METRICS</div><h3>八项最小量化指标</h3><p>先采集基线，再设置目标；速度收益不得默认归因于 UVM-MS。</p></div>
  <article class="card uvmms-metrics-wrap-v57"><table class="uvmms-metrics-v57"><thead><tr><th>指标</th><th>现有方案基线</th><th>试点结果</th><th>结论／限制</th></tr></thead><tbody>${d.metrics.map(renderUVMMSMetricV57).join('')}</tbody></table></article>
  <div class="section-title"><div class="eyebrow">BENEFIT ATTRIBUTION</div><h3>严格区分三类收益来源</h3></div>
  <div class="uvmms-attribution-grid-v57">${d.attribution.map(x=>`<article class="card"><div class="eyebrow">${esc(x.id.toUpperCase())}</div><h3>${esc(x.title)}</h3><ul>${x.items.map(i=>`<li>${esc(i)}</li>`).join('')}</ul></article>`).join('')}</div>
  <div class="grid2 uvmms-stop-decision-v57"><article class="card"><div class="eyebrow">STOP CONDITIONS</div><h3>出现这些信号时停止扩大投入</h3><ul>${d.stopConditions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="card"><div class="eyebrow">FINAL DECISION SPACE</div><h3>试点允许得出三种结论</h3>${d.decisionStates.map(x=>`<label class="uvmms-decision-v57"><input type="radio" name="uvmms-decision-v57" data-v57-decision="${esc(x.id)}" ${s.decision===x.id?'checked':''}><span><b>${esc(x.label)}</b><small>${esc(x.text)}</small></span></label>`).join('')}<label class="uvmms-note-v57"><small>项目备注</small><textarea id="uvmmsNoteV57" placeholder="记录当前判断、阻断项或下一次需要向谁确认">${esc(s.note||'')}</textarea></label><button class="secondary small-btn" id="saveUVMMSNoteV57">保存项目备注</button></article></div>`;
 bindUVMMSProgramV57()
}

function renderUVMMSGateV57(gate){
 const s=uvmmsStateV57(),status=uvmmsGateStatusV57(gate),p=uvmmsGateProgressV57(gate);
 return `<article class="card uvmms-gate-v57 ${status}" data-uvmms-gate="${esc(gate.id)}"><header><div><span>${esc(gate.index)}</span><h3>${esc(gate.title)}</h3></div><span class="tag ${status==='done'?'good':status==='active'?'learn':''}">${esc(uvmmsGateStatusLabelV57(status))}</span></header><p><b>回答：</b>${esc(gate.question)}</p><div class="mini-progress"><i style="width:${p.pct}%"></i></div><small>${p.done}/${p.total} 项证据</small><div class="uvmms-deliverables-v57">${gate.deliverables.map(x=>`<label><input type="checkbox" data-v57-deliverable="${esc(x.id)}" ${s.deliverables[x.id]?'checked':''}><span>${esc(x.title)}</span></label>`).join('')}</div><div class="uvmms-pass-v57"><b>通过条件</b><span>${esc(gate.pass)}</span></div><button class="secondary small-btn" data-v57-current-gate="${esc(gate.id)}">设为当前 Gate</button></article>`
}

function renderUVMMSMetricV57(metric){
 const value=uvmmsStateV57().metrics[metric.id]||{};
 return `<tr data-uvmms-metric="${esc(metric.id)}"><td><b>${esc(metric.label)}</b><small>${esc(metric.group)} · ${esc(metric.unit)}</small><p>${esc(metric.reason)}</p></td><td><input data-v57-metric="${esc(metric.id)}" data-v57-field="baseline" value="${esc(value.baseline||'')}" placeholder="待采集"></td><td><input data-v57-metric="${esc(metric.id)}" data-v57-field="pilot" value="${esc(value.pilot||'')}" placeholder="待试点"></td><td><textarea data-v57-metric="${esc(metric.id)}" data-v57-field="conclusion" placeholder="收益、限制或归因">${esc(value.conclusion||'')}</textarea></td></tr>`
}

function renderUVMMSPortfolioV57(){
 const host=document.getElementById('uvmmsPortfolioV57');if(!host)return;
 const d=uvmmsDataV57(),s=uvmmsStateV57(),ep=uvmmsEvidenceProgressV57();
 host.innerHTML=`<article class="card uvmms-portfolio-v57"><div class="card-head"><div><div class="eyebrow">METHODOLOGY EVIDENCE · CANDIDATE PROJECT</div><h3>${esc(d.shortTitle)}</h3><p>${esc(d.currentClaim)}</p></div><span class="tag learn">证据 ${ep.done}/${ep.total}</span></div><div class="uvmms-evidence-grid-v57">${d.evidenceLevels.map(x=>`<label class="${s.evidence[x.id]?'done':''}" data-uvmms-evidence="${esc(x.id)}"><input type="checkbox" data-v57-evidence="${esc(x.id)}" ${s.evidence[x.id]?'checked':''}><span><small>${esc(x.level)} · ${esc(x.title)}</small><b>${esc(x.claim)}</b></span></label>`).join('')}</div><div class="uvmms-claim-v57"><b>当前可写入职业材料</b><span>完成问题识别并定义方法学试点；尚不能声称已引入、已推广或已产生团队提效。</span></div></article>`;
 host.querySelectorAll('[data-v57-evidence]').forEach(input=>input.onchange=()=>{s.evidence[input.dataset.v57Evidence]=input.checked;s.updatedAt=localISO();save();renderUVMMSAdoptionV57()})
}

function bindUVMMSProgramV57(){
 const s=uvmmsStateV57();
 document.querySelectorAll('[data-v57-deliverable]').forEach(input=>input.onchange=()=>{s.deliverables[input.dataset.v57Deliverable]=input.checked;s.updatedAt=localISO();save();renderUVMMSAdoptionV57()});
 document.querySelectorAll('[data-v57-current-gate]').forEach(button=>button.onclick=()=>{s.currentGate=button.dataset.v57CurrentGate;s.updatedAt=localISO();save();renderUVMMSAdoptionV57()});
 document.querySelectorAll('[data-v57-org]').forEach(input=>input.onchange=()=>{s.organization[input.dataset.v57Org]=input.value.trim();s.updatedAt=localISO();save();renderUVMMSAdoptionV57()});
 document.querySelectorAll('[data-v57-metric]').forEach(input=>input.onchange=()=>{const id=input.dataset.v57Metric,field=input.dataset.v57Field;s.metrics[id]=s.metrics[id]||{};s.metrics[id][field]=input.value.trim();s.updatedAt=localISO();save()});
 document.querySelectorAll('[data-v57-decision]').forEach(input=>input.onchange=()=>{if(input.checked){s.decision=input.dataset.v57Decision;s.updatedAt=localISO();save()}});
 document.getElementById('saveUVMMSNoteV57')?.addEventListener('click',()=>{s.note=document.getElementById('uvmmsNoteV57').value.trim();s.updatedAt=localISO();save();toast('UVM-MS试点备注已保存')})
}

function wrapAMSFrontierBoundaryV57(){
 if(typeof renderFrontierV50==='function'&&!renderFrontierV50.__uvmmsBoundaryV57){const old=renderFrontierV50;renderFrontierV50=function(){const out=old.apply(this,arguments);renderUVMMSFrontierBoundaryV57();return out};renderFrontierV50.__uvmmsBoundaryV57=true}
 if(typeof renderAMSFrontierV55==='function'&&!renderAMSFrontierV55.__uvmmsBoundaryV57){const old=renderAMSFrontierV55;renderAMSFrontierV55=function(){const out=old.apply(this,arguments);renderUVMMSFrontierBoundaryV57();return out};renderAMSFrontierV55.__uvmmsBoundaryV57=true}
}

function renderUVMMSFrontierBoundaryV57(){
 const box=document.getElementById('frontierBodyV50');if(!box||document.getElementById('uvmmsFrontierBoundaryV57'))return;
 const note=document.createElement('article');note.id='uvmmsFrontierBoundaryV57';note.className='card uvmms-frontier-boundary-v57';note.innerHTML='<div><div class="eyebrow">LEARNING ≠ ADOPTION</div><h3>本区保留公开知识学习；UVM-MS工程试点独立管理</h3><p>标准阅读用于建立认知，工具验证、A/B数据、团队复用和采用决策进入上方的 UVM-MS 方法学试点项目。</p></div><button class="secondary small-btn">查看试点项目 →</button>';note.querySelector('button').onclick=()=>document.getElementById('uvmms-adoption-v57')?.scrollIntoView({behavior:'smooth'});box.prepend(note)
}

function injectUVMMSStylesV57(){
 if(document.getElementById('v57-uvmms-style'))return;
 const style=document.createElement('style');style.id='v57-uvmms-style';style.textContent=`
 #uvmmsTodayV57,#uvmms-adoption-v57,#uvmmsPortfolioV57,#uvmmsTodayV57 *,#uvmms-adoption-v57 *,#uvmmsPortfolioV57 *{box-sizing:border-box;min-width:0}
 #uvmms-adoption-v57 h2,#uvmms-adoption-v57 h3,#uvmms-adoption-v57 p,#uvmms-adoption-v57 li,#uvmms-adoption-v57 span,#uvmms-adoption-v57 small,#uvmmsPortfolioV57 *{overflow-wrap:anywhere;word-break:break-word}
 .uvmms-today-v57{margin:12px 0 0}.uvmms-today-card-v57{border-color:#315687;background:linear-gradient(130deg,rgba(33,58,91,.22),rgba(7,18,28,.97))}.uvmms-today-main-v57{display:grid;grid-template-columns:minmax(0,1.4fr) minmax(300px,.6fr);gap:18px;align-items:start}.uvmms-today-main-v57 h3{margin:7px 0}.uvmms-today-main-v57 p{color:var(--muted);line-height:1.65}.uvmms-today-stats-v57{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:7px}.uvmms-today-stats-v57 span{border:1px solid var(--line2);border-radius:9px;padding:10px;background:#07141e}.uvmms-today-stats-v57 small,.uvmms-today-stats-v57 b{display:block}.uvmms-today-stats-v57 small{color:var(--muted);font-size:9px}.uvmms-today-stats-v57 b{margin-top:5px;color:#c6edf2;font-size:11px}.uvmms-next-v57{display:flex;justify-content:space-between;gap:14px;align-items:center;border-top:1px solid var(--line2);margin-top:14px;padding-top:13px}.uvmms-next-v57 small,.uvmms-next-v57 b{display:block}.uvmms-next-v57 small{color:var(--cyan);font-size:9px}.uvmms-next-v57 b{margin-top:4px;font-size:11px}
 .uvmms-hero-v57{display:grid;grid-template-columns:minmax(0,1.35fr) minmax(250px,.65fr);gap:18px;border-left:3px solid var(--cyan)}.uvmms-hero-v57 h3{margin:7px 0}.uvmms-hero-v57 p,.uvmms-question-grid-v57 p,.uvmms-current-actions-v57 li{color:var(--muted);line-height:1.65}.uvmms-hero-score-v57{border:1px solid var(--line2);border-radius:10px;padding:14px;background:#07141e}.uvmms-hero-score-v57>small{color:var(--muted)}.uvmms-hero-score-v57>b{display:block;font-size:30px;color:var(--cyan);margin:7px 0}.uvmms-hero-score-v57 p{font-size:10px}.uvmms-question-grid-v57{margin-top:10px}.uvmms-current-actions-v57{margin-top:10px}.uvmms-current-actions-v57 ol{margin-bottom:0}
 .uvmms-org-grid-v57{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:8px}.uvmms-org-card-v57{display:block}.uvmms-org-card-v57 small{color:var(--cyan)}.uvmms-org-card-v57 input,.uvmms-metrics-v57 input,.uvmms-metrics-v57 textarea,.uvmms-note-v57 textarea{width:100%;max-width:100%;background:#06111a;border:1px solid #294858;color:white;border-radius:7px;padding:9px;margin-top:8px}.uvmms-org-card-v57 p{color:var(--muted);font-size:9px;line-height:1.5;margin-bottom:0}
 .uvmms-gate-grid-v57{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:9px}.uvmms-gate-v57{position:relative}.uvmms-gate-v57.active{border-color:var(--amber);box-shadow:inset 0 0 0 1px rgba(230,170,81,.15)}.uvmms-gate-v57.done{border-color:#287d73}.uvmms-gate-v57 header{display:flex;justify-content:space-between;gap:10px;align-items:flex-start}.uvmms-gate-v57 header div{display:flex;gap:9px;align-items:center}.uvmms-gate-v57 header div>span{width:34px;height:34px;border:1px solid var(--line);border-radius:9px;display:grid;place-items:center;color:var(--cyan);font-weight:800}.uvmms-gate-v57 h3{margin:0}.uvmms-gate-v57>p,.uvmms-gate-v57>small{color:var(--muted);line-height:1.55}.uvmms-deliverables-v57{display:grid;gap:6px;margin:12px 0}.uvmms-deliverables-v57 label{display:grid;grid-template-columns:auto minmax(0,1fr);gap:8px;align-items:start;padding:8px;border:1px solid var(--line2);border-radius:7px;background:#07141e;cursor:pointer;font-size:10px}.uvmms-deliverables-v57 input{accent-color:var(--cyan)}.uvmms-pass-v57{display:grid;gap:4px;padding:10px;border-left:2px solid var(--cyan);background:rgba(53,214,232,.035);margin-bottom:10px}.uvmms-pass-v57 b{font-size:9px;color:var(--cyan)}.uvmms-pass-v57 span{font-size:10px;color:var(--muted);line-height:1.5}
 .uvmms-metrics-wrap-v57{max-width:100%;overflow-x:auto;padding:0}.uvmms-metrics-v57{border-collapse:collapse;width:100%;min-width:840px}.uvmms-metrics-v57 th,.uvmms-metrics-v57 td{padding:11px;border-bottom:1px solid var(--line2);text-align:left;vertical-align:top}.uvmms-metrics-v57 th{color:var(--cyan);font-size:10px;background:#07141e}.uvmms-metrics-v57 td:first-child{width:31%}.uvmms-metrics-v57 td b,.uvmms-metrics-v57 td small{display:block}.uvmms-metrics-v57 td small{color:var(--muted);margin:4px 0}.uvmms-metrics-v57 td p{color:#667e89;font-size:9px;line-height:1.45;margin:4px 0}.uvmms-metrics-v57 textarea{min-height:66px;resize:vertical}
 .uvmms-attribution-grid-v57{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:9px}.uvmms-attribution-grid-v57 ul,.uvmms-stop-decision-v57 ul{padding-left:18px;color:var(--muted);line-height:1.65;font-size:10px}.uvmms-stop-decision-v57{margin-top:10px}.uvmms-decision-v57{display:grid;grid-template-columns:auto minmax(0,1fr);gap:9px;padding:9px;border:1px solid var(--line2);border-radius:8px;margin:7px 0;cursor:pointer}.uvmms-decision-v57 input{accent-color:var(--cyan)}.uvmms-decision-v57 b,.uvmms-decision-v57 small{display:block}.uvmms-decision-v57 small{color:var(--muted);margin-top:3px;line-height:1.45}.uvmms-note-v57{display:block;margin-top:12px}.uvmms-note-v57 small{color:var(--cyan)}.uvmms-note-v57 textarea{min-height:90px;resize:vertical}
 .uvmms-portfolio-host-v57{margin-bottom:10px}.uvmms-portfolio-v57{border-color:#315687}.uvmms-portfolio-v57 p{color:var(--muted);line-height:1.6}.uvmms-evidence-grid-v57{display:grid;grid-template-columns:repeat(5,minmax(0,1fr));gap:7px;margin-top:12px}.uvmms-evidence-grid-v57 label{display:grid;grid-template-columns:auto minmax(0,1fr);gap:7px;padding:10px;border:1px solid var(--line2);border-radius:8px;background:#07141e;cursor:pointer}.uvmms-evidence-grid-v57 label.done{border-color:#287d73;background:rgba(40,125,115,.07)}.uvmms-evidence-grid-v57 input{accent-color:var(--green)}.uvmms-evidence-grid-v57 small,.uvmms-evidence-grid-v57 b{display:block}.uvmms-evidence-grid-v57 small{color:var(--cyan);font-size:9px}.uvmms-evidence-grid-v57 b{font-size:10px;line-height:1.5;margin-top:4px}.uvmms-claim-v57{display:grid;grid-template-columns:auto minmax(0,1fr);gap:10px;padding:11px;border-left:2px solid var(--amber);background:rgba(230,170,81,.035);margin-top:10px}.uvmms-claim-v57 b{color:var(--amber);font-size:10px}.uvmms-claim-v57 span{color:var(--muted);font-size:10px;line-height:1.5}.uvmms-frontier-boundary-v57{display:flex;justify-content:space-between;align-items:center;gap:14px;margin-bottom:10px;border-color:#315687}.uvmms-frontier-boundary-v57 h3{margin:5px 0}.uvmms-frontier-boundary-v57 p{color:var(--muted);margin:0;line-height:1.55}
 @media(max-width:1150px){.uvmms-org-grid-v57{grid-template-columns:repeat(2,minmax(0,1fr))}.uvmms-evidence-grid-v57{grid-template-columns:repeat(2,minmax(0,1fr))}}
 @media(max-width:760px){.uvmms-today-main-v57,.uvmms-hero-v57,.uvmms-gate-grid-v57,.uvmms-attribution-grid-v57,.uvmms-org-grid-v57,.uvmms-evidence-grid-v57{grid-template-columns:minmax(0,1fr)}.uvmms-today-stats-v57{grid-template-columns:minmax(0,1fr)}.uvmms-next-v57,.uvmms-frontier-boundary-v57{display:grid;grid-template-columns:minmax(0,1fr)}.uvmms-question-grid-v57,.uvmms-stop-decision-v57{grid-template-columns:minmax(0,1fr)}.uvmms-metrics-wrap-v57{margin-left:0;margin-right:0}.uvmms-claim-v57{grid-template-columns:minmax(0,1fr)}}`;
 document.head.appendChild(style)
}
