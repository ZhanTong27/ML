window.addEventListener('load',()=>{try{installGrowthStoryV58()}catch(e){console.error('Career OS V5.8 Growth failed',e)}},{once:true});

function installGrowthStoryV58(){
 if(!window.GROWTH_STORY_V58||typeof S==='undefined')return;
 ensureGrowthStateV58();
 injectGrowthStylesV58();
 mountGrowthHubV58();
 if(typeof renderAll==='function'&&!renderAll.__growthV58Wrapped){
  const previous=renderAll;
  const wrapped=function(){const result=previous.apply(this,arguments);setTimeout(()=>{try{mountGrowthHubV58()}catch(e){console.error('V5.8 remount failed',e)}},0);return result};
  wrapped.__growthV58Wrapped=true;renderAll=wrapped
 }
 save()
}

function ensureGrowthStateV58(){
 const existing=S.growthHubV58||{};
 const selected={},notes={},selfChecks={};
 GROWTH_STORY_V58.actions.forEach(a=>{
  selected[a.id]=Boolean(existing.selectedActions?.[a.id]);
  notes[a.id]=existing.actionNotes?.[a.id]||'';
  selfChecks[a.id]=a.selfCheck.map((_,i)=>Boolean(existing.selfChecks?.[a.id]?.[i]))
 });
 S.growthHubV58={activeView:existing.activeView||'week',openLegacy:existing.openLegacy||'',signalsExpanded:Boolean(existing.signalsExpanded),selectedActions:selected,actionNotes:notes,selfChecks,updatedAt:existing.updatedAt||'',...existing,selectedActions:selected,actionNotes:notes,selfChecks}
}

function mountGrowthHubV58(){
 const growth=document.getElementById('growth');if(!growth)return;
 const head=growth.querySelector(':scope > .page-head');
 if(head){const h=head.querySelector('h1'),p=head.querySelector('p');if(h)h.textContent='成长';if(p)p.textContent='先看本周怎么行动，再看最近发生了什么变化；完整资料按需展开。'}
 let index=growth.querySelector(':scope > .page-index');
 if(!index){index=document.createElement('nav');index.className='page-index';head?.insertAdjacentElement('afterend',index)}
 index.id='growth-nav-v58';
 index.innerHTML=`<button data-v58-nav="week" class="${S.growthHubV58.activeView==='week'?'active':''}">本周成长</button><button data-v58-nav="topics" class="${S.growthHubV58.activeView==='topics'?'active':''}">学习专题</button><button data-v58-nav="evidence" class="${S.growthHubV58.activeView==='evidence'?'active':''}">能力与证据</button><button data-v58-nav="archive" class="${S.growthHubV58.activeView==='archive'?'active':''}">复盘档案</button>`;
 let root=document.getElementById('growth-hub-v58');
 if(!root){root=document.createElement('section');root.id='growth-hub-v58';root.className='content-section growth-hub-v58';index.insertAdjacentElement('afterend',root)}
 root.innerHTML=renderGrowthHubV58();
 markLegacyGrowthV58();
 bindGrowthHubV58();
 showGrowthViewV58(S.growthHubV58.activeView||'week',false)
}

function renderGrowthHubV58(){
 const d=GROWTH_STORY_V58;
 return `<div id="growth-week-v58" class="growth-view-v58">${renderGrowthWeekV58(d)}</div><div id="growth-topics-v58" class="growth-view-v58">${renderGrowthTopicsV58(d)}</div><div id="growth-evidence-v58" class="growth-view-v58">${renderGrowthEvidenceV58(d)}</div><div id="growth-archive-v58" class="growth-view-v58">${renderGrowthArchiveV58()}</div>`
}

function renderGrowthWeekV58(d){
 return `<div class="section-title"><div class="eyebrow">HUMAN-CENTERED GROWTH</div><h2>这周我怎么成长</h2><p>先理解方向，再从完整行动池里选择；未选择不等于欠账。</p></div>
 <article class="card growth-status-v58"><div><small>当前成长阶段</small><h3>${esc(d.stage.title)}</h3><p>${esc(d.stage.description)}</p></div><div class="growth-status-grid-v58"><div><small>本周主线</small><b>${esc(d.mainLine.title)}</b><span>${esc(d.mainLine.description)}</span></div><div><small>本周辅线</small><b>${esc(d.supportLine.title)}</b><span>${esc(d.supportLine.description)}</span></div><div><small>当前成长专题</small><b>${esc(d.currentTopic.title)}</b><span>${esc(d.currentTopic.description)}</span></div></div></article>
 ${renderAbilityScaleV58(d)}
 <div class="section-title split-title"><div><div class="eyebrow">WEEKLY ACTION LIBRARY</div><h2>本周全部成长行动</h2><p>每项都包含学习原因、内容、资料、带着的问题、自测、产出和AI检测Prompt。</p></div><span class="tag learn">已选择 ${Object.values(S.growthHubV58.selectedActions).filter(Boolean).length}/${d.actions.length}</span></div>
 ${['main','support','topic','reserve'].map(renderActionGroupV58).join('')}
 ${renderSignalsV58(d)}`
}

function renderAbilityScaleV58(d){return `<article class="card ability-scale-v58"><div class="card-head"><div><div class="eyebrow">ABILITY EVIDENCE SCALE</div><h3>统一的0—5级成长线</h3></div><span class="tag">看证据，不看主观小数分</span></div><div class="ability-scale-line-v58">${d.abilityScale.map(x=>`<div><b>${x.level}</b><span>${esc(x.label)}</span><small>${esc(x.meaning)}</small></div>`).join('')}</div></article>`}
function actionGroupMetaV58(group){return({main:{title:'主线行动',desc:'直接推进数模模型理解与相关性能力。'},support:{title:'辅线行动',desc:'完成低功耗、时域边界和工程归因闭环。'},topic:{title:'专题学习',desc:'建立UVM-MS的标准理解、行业证据和实验设计。'},reserve:{title:'长期储备',desc:'先保存方向，待真实证据出现后再投入。'}})[group]}
function renderActionGroupV58(group){const m=actionGroupMetaV58(group),items=GROWTH_STORY_V58.actions.filter(x=>x.group===group);return `<section class="action-group-v58" data-v58-action-group="${group}"><div class="action-group-head-v58"><div><h3>${m.title}</h3><p>${m.desc}</p></div><span>${items.length}项</span></div><div class="action-list-v58">${items.map(renderActionV58).join('')}</div></section>`}
function renderActionV58(a){
 const selected=S.growthHubV58.selectedActions[a.id],checks=S.growthHubV58.selfChecks[a.id]||[],done=checks.filter(Boolean).length;
 return `<details class="card action-card-v58" data-v58-action="${esc(a.id)}"><summary><div><span class="tag ${a.group==='main'?'good':a.group==='topic'?'learn':''}">${esc(a.priority)}</span><h3>${esc(a.title)}</h3><p>${esc(a.why)}</p></div><span class="action-check-progress-v58">自测 ${done}/${a.selfCheck.length}</span></summary><div class="action-body-v58"><label class="action-select-v58"><input type="checkbox" data-v58-select="${esc(a.id)}" ${selected?'checked':''}><span><b>选为本周实际行动</b><small>不选择仍会保留在行动池，不算未完成。</small></span></label><div class="action-grid-v58"><section><h4>为什么现在学</h4><p>${esc(a.why)}</p></section><section><h4>完成后要产出什么</h4><p>${esc(a.output)}</p></section><section><h4>具体学什么</h4><ul>${a.learn.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section><section><h4>带着什么问题学</h4><ul>${a.questions.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section></div><section class="action-materials-v58"><h4>相关资料与证据边界</h4>${a.materials.map(renderMaterialV58).join('')}</section><section class="action-selfcheck-v58"><h4>自我检测</h4>${a.selfCheck.map((x,i)=>`<label><input type="checkbox" data-v58-selfcheck="${esc(a.id)}" data-v58-check-index="${i}" ${checks[i]?'checked':''}><span>${esc(x)}</span></label>`).join('')}</section><details class="action-prompt-v58"><summary>AI检测与训练Prompt</summary><pre>${esc(a.aiPrompt)}</pre><button class="secondary small-btn" data-v58-copy-prompt="${esc(a.id)}">复制Prompt</button></details><label class="action-note-v58"><small>我的学习记录／尚未想通</small><textarea data-v58-action-note="${esc(a.id)}" placeholder="只记录自己的理解、公开信息和脱敏练习，不粘贴内部资料。">${esc(S.growthHubV58.actionNotes[a.id]||'')}</textarea></label></div></details>`
}
function renderMaterialV58(m){return `<article><header><span class="tag">${esc(m.type)}</span>${m.url?`<a href="${esc(m.url)}" target="_blank" rel="noopener noreferrer"><b>${esc(m.title)}</b> ↗</a>`:`<b>${esc(m.title)}</b>`}</header><small>${esc(m.source)}</small><p><b>用来回答：</b>${esc(m.use)}</p><p class="material-limit-v58"><b>不能证明：</b>${esc(m.limit)}</p></article>`}
function renderSignalsV58(d){const visible=S.growthHubV58.signalsExpanded?d.signals:d.signals.slice(0,3);return `<div class="section-title split-title"><div><div class="eyebrow">RECENT GROWTH SIGNALS</div><h2>最近哪里发生了变化</h2><p>默认显示三项；展开后查看全部真实证据信号。</p></div><button class="secondary small-btn" id="toggleSignalsV58">${S.growthHubV58.signalsExpanded?'收起':'展开全部 '+d.signals.length+' 项'}</button></div><div class="signal-grid-v58">${visible.map(x=>`<article class="card"><header><h3>${esc(x.title)}</h3><span class="tag ${x.strength==='强'?'good':x.strength==='弱'?'problem':'learn'}">证据 ${esc(x.strength)}</span></header><p><b>发生了什么：</b>${esc(x.fact)}</p><p><b>能力变化：</b>${esc(x.change)}</p><small><b>仍缺：</b>${esc(x.missing)}</small></article>`).join('')}</div>`}

function renderGrowthTopicsV58(d){
 const topicActions=d.actions.filter(x=>x.group==='topic'),materials=[];topicActions.forEach(a=>a.materials.forEach(m=>{if(!materials.some(x=>x.title===m.title))materials.push(m)}));
 return `<div class="section-title"><div class="eyebrow">LEARNING TOPICS</div><h2>学习专题</h2><p>默认只显示一句话；需要深入时再展开路线、资料和原有完整方案。</p></div><div class="topic-list-v58"><details class="card topic-card-v58"><summary><div><h3>${esc(d.currentTopic.title)}</h3><p>${esc(d.currentTopic.description)}</p></div><span>展开学习路线</span></summary><div class="topic-body-v58"><section><h4>这个专题要回答什么</h4><ul>${topicActions.flatMap(x=>x.questions.slice(0,2)).map(x=>`<li>${esc(x)}</li>`).join('')}</ul></section><section><h4>建议学习顺序</h4><ol><li>标准目标与整体架构</li><li>Proxy、Bridge与Bridge Core职责</li><li>push、pull、monitor与同步完成</li><li>行业证据强度与适用边界</li><li>真实工具链最小实验</li><li>双模型与A/B评估方法</li></ol></section><section class="action-materials-v58"><h4>资料与行业证据</h4>${materials.map(renderMaterialV58).join('')}</section><div class="legacy-launch-v58"><button class="secondary" data-v58-open-legacy="uvmms-adoption-v57">打开完整试点与提效评估方案</button><small>原V5.7的Sponsor、四个Gate、A/B指标和停止条件完整保留，按需打开。</small></div></div></details>${d.topics.filter(x=>x.id!=='uvmms').map(x=>`<details class="card topic-card-v58"><summary><div><h3>${esc(x.title)}</h3><p>${esc(x.summary)}</p></div><span>查看入口</span></summary><p class="muted">完整内容已拆入本周行动卡；也可打开原有资料区查看历史内容。</p></details>`).join('')}</div><div class="legacy-entry-grid-v58"><article class="card"><h3>16周课程与原执行视图</h3><p>旧课程、周任务和完成数据仍在原节点中，不迁移、不重建。</p><button class="secondary small-btn" data-v58-open-legacy="current-execution">打开原课程视图</button></article><article class="card"><h3>AMS公开资料与行业认知库</h3><p>保留公开标准、论文和OCL-LDO认知资料，但不占用成长首页。</p><button class="secondary small-btn" data-v58-open-legacy="frontier-radar-v50">打开AMS资料库</button></article></div>${renderLegacyReturnV58()}`
}

function renderGrowthEvidenceV58(d){return `<div class="section-title"><div class="eyebrow">ABILITY & EVIDENCE</div><h2>我处在哪个阶段，凭什么</h2><p>等级由真实应用、独立程度、反馈和迁移证据共同决定。</p></div>${renderAbilityScaleV58(d)}<div class="ability-cards-v58">${d.abilities.map(a=>`<article class="card"><header><div><h3>${esc(a.title)}</h3><span class="trend-v58">${esc(a.trend)}</span></div><b>${a.level}/5 · ${esc(d.abilityScale.find(x=>x.level===a.level)?.label||'')}</b></header><div class="ability-bar-v58"><i style="width:${a.level/5*100}%"></i></div><p><b>最近证据：</b>${esc(a.evidence)}</p><small><b>升级仍缺：</b>${esc(a.next)}</small></article>`).join('')}</div><article class="card legacy-launch-v58"><div><h3>完整能力地图</h3><p>查看旧能力项、历史评分与完整证据，不影响新的0—5成长线。</p></div><button class="secondary small-btn" data-v58-open-legacy="ability-map">打开完整能力地图</button></article>${renderLegacyReturnV58()}`}

function renderGrowthArchiveV58(){return `<div class="section-title"><div class="eyebrow">REVIEW & ARCHIVE</div><h2>复盘档案</h2><p>只保留三个清楚入口；原节点和数据始终留在原位置。</p></div><div class="legacy-entry-grid-v58"><article class="card"><h3>问题与学习记录</h3><p>错误判断、根因、知识补足、迁移方法和历史问题记录。</p><button class="secondary small-btn" data-v58-open-legacy="problem-journal">打开问题与学习记录</button></article><article class="card"><h3>周度与周期复盘</h3><p>本周判断、下周调整、历史周报和周期能力变化。</p><div class="button-row-v58"><button class="secondary small-btn" data-v58-open-legacy="weekly-review">打开周度复盘</button><button class="secondary small-btn" data-v58-open-legacy="cycle-archive">打开周期档案</button></div></article><article class="card"><h3>历史计划与课程版本</h3><p>旧学习计划、课程调整、已结束专题和历史版本仍完整保留。</p><button class="secondary small-btn" data-v58-open-legacy="growth-library-v50">打开历史资料库</button></article></div><details class="card archive-detail-v58"><summary><span><b>数据安全与恢复</b><small>V5.8升级前已保存原始浏览器数据快照。</small></span><span>${window.CAREER_OS_V58_SAFETY?.backupPresent?'备份已存在':'请检查'}</span></summary><p>备份键：<code>zhantong-career-os-v5-pre-v58-backup</code>。升级不删除Daily、能力、课程、UVM-MS或历史复盘数据。</p></details>${renderLegacyReturnV58()}`}
function renderLegacyReturnV58(){return S.growthHubV58.openLegacy?`<button class="secondary small-btn v58-close-legacy" id="closeLegacyV58">收起已打开的旧资料</button>`:''}

const LEGACY_GROWTH_IDS_V58=['current-execution','problem-journal','weekly-review','ability-map','cycle-archive','uvmms-adoption-v57','growth-library-v50','frontier-radar-v50'];
function legacyHostV58(id){const node=document.getElementById(id);if(!node)return null;return node.classList.contains('content-section')?node:(node.closest('#growth > .content-section')||node)}
function markLegacyGrowthV58(){
 LEGACY_GROWTH_IDS_V58.forEach(id=>{const host=legacyHostV58(id);if(host&&host.id!=='growth-hub-v58')host.dataset.v58Legacy='true'});
}
function setLegacyVisibilityV58(id){
 const shown=new Set();
 LEGACY_GROWTH_IDS_V58.forEach(key=>{const host=legacyHostV58(key);if(!host||host.id==='growth-hub-v58'||shown.has(host))return;shown.add(host);host.classList.add('v58-managed-legacy');host.hidden=true});
 if(id){const host=legacyHostV58(id);if(host){host.hidden=false;host.classList.add('v58-managed-legacy');setTimeout(()=>host.scrollIntoView({behavior:'smooth',block:'start'}),30)}}
}

function bindGrowthHubV58(){
 document.querySelectorAll('#growth-nav-v58 [data-v58-nav]').forEach(b=>b.onclick=()=>{S.growthHubV58.activeView=b.dataset.v58Nav;S.growthHubV58.openLegacy='';S.growthHubV58.updatedAt=localISO();save();showGrowthViewV58(b.dataset.v58Nav)});
 document.querySelectorAll('[data-v58-select]').forEach(i=>i.onchange=()=>{S.growthHubV58.selectedActions[i.dataset.v58Select]=i.checked;S.growthHubV58.updatedAt=localISO();save();mountGrowthHubV58()});
 document.querySelectorAll('[data-v58-selfcheck]').forEach(i=>i.onchange=()=>{const id=i.dataset.v58Selfcheck,index=Number(i.dataset.v58CheckIndex);S.growthHubV58.selfChecks[id][index]=i.checked;S.growthHubV58.updatedAt=localISO();save();mountGrowthHubV58()});
 document.querySelectorAll('[data-v58-action-note]').forEach(t=>t.onchange=()=>{S.growthHubV58.actionNotes[t.dataset.v58ActionNote]=t.value.trim();S.growthHubV58.updatedAt=localISO();save();toast('学习记录已保存')});
 document.querySelectorAll('[data-v58-copy-prompt]').forEach(b=>b.onclick=()=>{const action=GROWTH_STORY_V58.actions.find(x=>x.id===b.dataset.v58CopyPrompt);copyTextV58(action?.aiPrompt||'')});
 document.querySelectorAll('[data-v58-open-legacy]').forEach(b=>b.onclick=()=>{S.growthHubV58.openLegacy=b.dataset.v58OpenLegacy;S.growthHubV58.updatedAt=localISO();save();setLegacyVisibilityV58(S.growthHubV58.openLegacy);mountGrowthHubV58()});
 const close=document.getElementById('closeLegacyV58');if(close)close.onclick=()=>{S.growthHubV58.openLegacy='';save();setLegacyVisibilityV58('');mountGrowthHubV58()};
 const toggle=document.getElementById('toggleSignalsV58');if(toggle)toggle.onclick=()=>{S.growthHubV58.signalsExpanded=!S.growthHubV58.signalsExpanded;save();mountGrowthHubV58()}
}

function showGrowthViewV58(view,scroll=true){
 document.querySelectorAll('.growth-view-v58').forEach(x=>x.hidden=x.id!==`growth-${view}-v58`);
 document.querySelectorAll('#growth-nav-v58 [data-v58-nav]').forEach(x=>x.classList.toggle('active',x.dataset.v58Nav===view));
 setLegacyVisibilityV58(S.growthHubV58.openLegacy||'');
 const target=document.getElementById(`growth-${view}-v58`);if(scroll&&target&&!target.hidden)target.scrollIntoView({block:'start'})
}
function copyTextV58(text){navigator.clipboard?.writeText(text).then(()=>toast('AI Prompt已复制')).catch(()=>{const t=document.createElement('textarea');t.value=text;document.body.appendChild(t);t.select();document.execCommand('copy');t.remove();toast('AI Prompt已复制')})}

function injectGrowthStylesV58(){
 if(document.getElementById('growth-v58-style'))return;
 const style=document.createElement('style');style.id='growth-v58-style';style.textContent=`#growth,#growth *{box-sizing:border-box;min-width:0}.growth-hub-v58{max-width:100%;overflow:hidden}.growth-view-v58[hidden],.v58-managed-legacy[hidden]{display:none!important}.growth-status-v58{display:grid;grid-template-columns:minmax(0,.8fr) minmax(0,1.5fr);gap:14px;border-left:3px solid var(--cyan)}.growth-status-v58 p,.growth-status-v58 span{color:var(--muted);line-height:1.55}.growth-status-grid-v58{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.growth-status-grid-v58>div{padding:11px;border:1px solid var(--line2);border-radius:9px;display:grid;gap:5px}.growth-status-grid-v58 small,.ability-scale-v58 small{color:var(--muted)}.ability-scale-line-v58{display:grid;grid-template-columns:repeat(6,minmax(0,1fr));gap:6px;margin-top:10px}.ability-scale-line-v58>div{padding:10px;border:1px solid var(--line2);border-radius:8px;display:grid;gap:4px}.ability-scale-line-v58 b{font-size:19px;color:var(--cyan)}.ability-scale-line-v58 span{font-weight:700}.action-group-v58{margin:14px 0}.action-group-head-v58{display:flex;justify-content:space-between;gap:10px;align-items:end;margin-bottom:7px}.action-group-head-v58 p{color:var(--muted);margin:3px 0}.action-group-head-v58>span{color:var(--cyan)}.action-list-v58{display:grid;gap:8px}.action-card-v58{padding:0;overflow:hidden}.action-card-v58>summary{display:flex;justify-content:space-between;gap:12px;padding:14px;cursor:pointer}.action-card-v58>summary>div{display:grid;gap:5px}.action-card-v58>summary h3{margin:0}.action-card-v58>summary p{margin:0;color:var(--muted);line-height:1.5;max-width:880px}.action-check-progress-v58{white-space:nowrap;color:var(--cyan);font-size:11px}.action-body-v58{padding:0 14px 14px;display:grid;gap:10px}.action-select-v58{display:flex;gap:9px;padding:10px;border:1px solid var(--cyan);border-radius:8px;background:rgba(53,214,232,.035)}.action-select-v58 span{display:grid;gap:3px}.action-select-v58 small{color:var(--muted)}.action-grid-v58{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.action-grid-v58>section,.action-materials-v58,.action-selfcheck-v58,.action-prompt-v58,.action-note-v58{padding:11px;border:1px solid var(--line2);border-radius:9px}.action-grid-v58 p,.action-grid-v58 li,.action-materials-v58 p,.action-selfcheck-v58 span{color:var(--muted);line-height:1.6}.action-materials-v58{display:grid;gap:8px}.action-materials-v58>article{padding:10px;border:1px solid var(--line2);border-radius:8px;background:#07141e}.action-materials-v58 header{display:flex;align-items:center;gap:7px;flex-wrap:wrap}.action-materials-v58 a{color:var(--cyan);overflow-wrap:anywhere}.action-materials-v58 small{display:block;color:var(--muted);margin-top:5px}.material-limit-v58{border-left:2px solid var(--amber);padding-left:8px}.action-selfcheck-v58{display:grid;gap:7px}.action-selfcheck-v58 label{display:grid;grid-template-columns:auto 1fr;gap:8px}.action-prompt-v58>summary{cursor:pointer;font-weight:700}.action-prompt-v58 pre{white-space:pre-wrap;overflow-wrap:anywhere;color:var(--muted);background:#06111a;border:1px solid var(--line2);padding:10px;border-radius:8px}.action-note-v58{display:grid;gap:7px}.action-note-v58 textarea{width:100%;min-height:82px;background:#06111a;border:1px solid var(--line2);color:var(--text);border-radius:8px;padding:9px;resize:vertical}.signal-grid-v58,.ability-cards-v58{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.signal-grid-v58 article header,.ability-cards-v58 article header{display:flex;justify-content:space-between;gap:8px}.signal-grid-v58 p,.signal-grid-v58 small,.ability-cards-v58 p,.ability-cards-v58 small{color:var(--muted);line-height:1.55}.topic-list-v58{display:grid;gap:8px}.topic-card-v58>summary,.archive-detail-v58>summary{display:flex;justify-content:space-between;gap:12px;cursor:pointer}.topic-card-v58>summary p,.archive-detail-v58>summary small{color:var(--muted);margin:4px 0}.topic-body-v58{display:grid;gap:10px;margin-top:12px}.topic-body-v58>section{padding:11px;border:1px solid var(--line2);border-radius:9px}.ability-cards-v58 article header>b{color:var(--cyan);white-space:nowrap}.trend-v58{color:var(--muted);font-size:10px}.ability-bar-v58{height:5px;background:#0a1a25;border-radius:9px;overflow:hidden;margin:10px 0}.ability-bar-v58 i{display:block;height:100%;background:var(--cyan)}.archive-detail-v58{margin:9px 0;overflow:hidden}.archive-detail-v58 code{overflow-wrap:anywhere}.legacy-entry-grid-v58{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:8px}.legacy-entry-grid-v58 p,.legacy-launch-v58 p,.legacy-launch-v58 small{color:var(--muted);line-height:1.55}.legacy-launch-v58{display:flex;justify-content:space-between;gap:12px;align-items:center;padding:11px;border:1px solid var(--line2);border-radius:9px}.button-row-v58{display:flex;gap:7px;flex-wrap:wrap}.v58-close-legacy{margin:10px 0}.growth-hub-v58 h2,.growth-hub-v58 h3,.growth-hub-v58 h4,.growth-hub-v58 p,.growth-hub-v58 li,.growth-hub-v58 span,.growth-hub-v58 small,.growth-hub-v58 summary{overflow-wrap:anywhere;word-break:break-word}@media(max-width:1050px){.growth-status-v58{grid-template-columns:1fr}.growth-status-grid-v58,.signal-grid-v58,.ability-cards-v58,.legacy-entry-grid-v58{grid-template-columns:repeat(2,minmax(0,1fr))}.ability-scale-line-v58{grid-template-columns:repeat(3,minmax(0,1fr))}}@media(max-width:700px){.growth-status-grid-v58,.signal-grid-v58,.ability-cards-v58,.action-grid-v58,.ability-scale-line-v58,.legacy-entry-grid-v58{grid-template-columns:1fr}.action-card-v58>summary,.topic-card-v58>summary,.archive-detail-v58>summary,.action-group-head-v58,.legacy-launch-v58{display:grid}.action-check-progress-v58{white-space:normal}.growth-hub-v58 .section-title.split-title{display:grid}.growth-hub-v58 table{display:block;overflow-x:auto}}`;
 document.head.appendChild(style)
}
