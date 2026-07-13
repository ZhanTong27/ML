window.addEventListener('load',()=>{
  try{installWorkManualV31()}catch(error){console.error('Work manual V3.1 failed',error)}
},{once:true});

function installWorkManualV31(){
  const MANUAL_PROMPT=`你是我的芯片验证工作问题手册整理助手。\n\n我会描述一个实际遇到的小问题、操作困境、命令技巧、环境配置方法或以后可能重复使用的处理方式。它可能很简单，例如Linux快捷键；也可能是一段仿真环境复用流程。\n\n请先听我把情况说完。我说“描述结束”后再整理。\n\n你的目标不是做职业能力诊断，也不是写深度技术报告，而是帮我留下这样一条记录：几个月后我再次遇到类似情况时，能够迅速搜索到、看懂当时为什么卡住，并照着记录完成操作。\n\n请重点保留四件事：\n- 我当时面临的具体困境，以及什么现象让我意识到有问题；\n- 最后有效的操作或处理方式，按实际需要写清楚，但不要为了格式强行拆成很多步骤；\n- 哪些条件、路径、环境或前提可能不同，哪些地方不能机械照抄；\n- 怎样确认处理已经生效，以及以后搜索这条记录时最可能使用的关键词。\n\n如果只是一个快捷键或一句命令，回答可以很短；如果是一套环境复用流程，就把关键因果和操作写完整。不要用固定篇幅，也不要为了显得专业加入无关原理。\n\n不确定的地方直接标记“待确认”，不要自行补全。严格脱敏，不保留公司项目名、内部路径、用户名、服务器名、数据库名、脚本原文、信号名、参数或未公开架构。必要时用“原环境目录”“启动脚本”“输出目录”等通用说法替代。\n\n先输出一版给我看的自然语言手册条目，建议采用以下轻量结构，但可以根据问题复杂度合并或省略：\n\n标题\n用我以后真正会搜索的说法命名。\n\n当时的困境\n清楚说明我想做什么、哪里不对、为什么会卡住。\n\n处理方式\n直接说明有效操作。简单问题一句话即可；复杂问题按执行顺序讲清楚。\n\n需要注意\n写明前提、常见误区、不能照抄的部分或仍待确认的地方。\n\n如何确认\n说明看到什么结果，才能认为处理真正生效。\n\n检索词\n给出中英文关键词和我可能会输入的自然语言搜索词。\n\n最后输出一段纯JSON供网站导入：\n{\n  "schemaVersion":"career-os-manual-1",\n  "entryId":"YYYY-MM-DD-唯一短标识",\n  "date":"YYYY-MM-DD",\n  "title":"便于以后搜索的标题",\n  "situation":"当时想做什么、遇到什么现象、为什么卡住",\n  "solution":"有效处理方式。可以是简短说明，也可以是带换行的完整操作过程",\n  "cautions":["前提、适用边界、常见误区或待确认信息"],\n  "verification":"如何确认操作生效",\n  "keywords":["中文关键词","英文关键词","自然语言搜索词"],\n  "type":"shortcut|command|procedure|troubleshooting|tool_tip|concept_note|other",\n  "topic":"linux|shell|simulation|environment|verdi|git|uvm|systemverilog|debug|workflow|other",\n  "status":"confirmed|partially_confirmed|unverified",\n  "source":"self_discovered|colleague_tip|supervisor_tip|documentation|ai_assisted|other",\n  "privacyNote":"脱敏说明"\n}\n\n输出前检查：这条记录是否能让我下次迅速解决问题；是否清楚写出了困境而不只是答案；是否保留了操作与验证方式；是否能通过标题和关键词搜到；是否存在未经确认的猜测或敏感信息。`;

  PROMPTS.problem={title:'工作问题手册记录Prompt',description:'把一次小困境、操作诀窍或复用流程整理成以后能迅速搜索和调用的手册条目。',text:MANUAL_PROMPT};
  S.manualEntries=Array.isArray(S.manualEntries)?S.manualEntries:[];
  migrateLegacyProblemsToManual();

  const oldNormalize=normalizeState;
  normalizeState=function(s){const out=oldNormalize(s);out.manualEntries=Array.isArray(out.manualEntries)?out.manualEntries:[];return out};
  const oldDefault=defaultState;
  defaultState=function(){const out=oldDefault();return{...out,manualEntries:[]}};

  relabelManualUI();
  const oldRenderProblems=renderProblems;
  renderProblems=function(){renderManualEntries()};
  const oldRenderGrowth=renderGrowth;
  renderGrowth=function(){oldRenderGrowth();renderManualEntries()};
  const oldRenderAll=renderAll;
  renderAll=function(){oldRenderAll();renderManualEntries()};

  const previousQuickForm=quickForm;
  quickForm=function(mode){
    if(mode!=='problem')return previousQuickForm(mode);
    return `<div class="quick-form"><article class="card manual-intro"><div class="eyebrow">DESCRIBE → ORGANIZE → REUSE</div><h3>记录一条以后真正找得到的问题手册</h3><p>先在我们的对话里描述当时的困境和有效处理方式。我会根据复杂度决定写多长，不会强行拆成十几个固定模块。</p></article><div class="prompt-box"><div class="prompt-head"><div><b>${PROMPTS.problem.title}</b><p class="muted" style="margin:3px 0">${PROMPTS.problem.description}</p></div><button class="secondary small-btn" data-copy="problem">复制Prompt</button></div></div><label>手册JSON<textarea id="qText" placeholder="粘贴 schemaVersion 为 career-os-manual-1 的JSON"></textarea></label><div class="actions"><button class="primary" data-save>导入问题手册</button></div></div>`
  };
  const previousSaveQuick=saveQuick;
  saveQuick=function(mode){
    if(mode!=='problem')return previousSaveQuick(mode);
    try{
      const item=parseMaybeJSON(document.querySelector('#qText').value);
      if(item.raw||item.schemaVersion!=='career-os-manual-1')throw new Error('请粘贴完整的问题手册JSON');
      if(!item.title||!item.situation||!item.solution)throw new Error('手册条目缺少标题、困境或处理方式');
      const entry={...item,id:item.entryId||uid('manual'),entryId:item.entryId||uid('manual'),date:item.date||localISO(),keywords:arr(item.keywords),cautions:arr(item.cautions),useCount:Number(item.useCount||0),lastUsed:item.lastUsed||''};
      const idx=S.manualEntries.findIndex(x=>x.entryId===entry.entryId);
      if(idx>=0)S.manualEntries[idx]={...S.manualEntries[idx],...entry};else S.manualEntries.unshift(entry);
      save();closeModals();renderAll();toast('问题手册已更新')
    }catch(error){toast(error.message||'手册JSON格式错误')}
  };

  injectManualStyles();
  renderAll();
}

function migrateLegacyProblemsToManual(){
  (S.problemLogs||[]).forEach((p,i)=>{
    const id=`legacy-problem-${p.id||p.date||i}`;
    if(S.manualEntries.some(x=>x.entryId===id))return;
    S.manualEntries.push({
      schemaVersion:'career-os-manual-legacy',entryId:id,id,date:p.date||'',title:p.title||'旧版问题记录',
      situation:p.background||p.context||p.actual||p.summary||'旧版记录未拆分困境',
      solution:p.solution||p.result||p.transferableMethods?.join('；')||'旧版记录未拆分处理方式',
      cautions:arr(p.openQuestions),verification:p.result||'',keywords:[...(arr(p.abilities)),p.rootCause||''].filter(Boolean),
      type:'troubleshooting',topic:'other',status:p.rootCauseStatus==='confirmed'?'confirmed':'partially_confirmed',source:'other',privacyNote:'由旧版问题日志迁移',useCount:0,lastUsed:''
    })
  });
}

function relabelManualUI(){
  const section=document.getElementById('problem-journal');if(!section)return;
  const eyebrow=section.querySelector('.section-title .eyebrow');if(eyebrow)eyebrow.textContent='PERSONAL WORK MANUAL';
  const title=section.querySelector('.section-title h2');if(title)title.textContent='我的问题手册';
  const desc=section.querySelector('.section-title p');if(desc)desc.textContent='记录真实困境和有效操作，下一次遇到时可以迅速搜索、理解并调用。';
  const add=section.querySelector('[data-quick="problem"]');if(add)add.textContent='＋ 记录一条手册';
  const search=document.getElementById('problemSearch');if(search)search.placeholder='搜索标题、困境、处理方式或关键词';
  const filter=document.getElementById('problemFilter');if(filter)filter.innerHTML='<option value="">全部条目</option><option value="confirmed">已确认</option><option value="unverified">待确认</option><option value="recent">最近使用</option>';
  document.querySelectorAll('[data-quick="problem"]').forEach(b=>{if(b.textContent.includes('记录一个问题'))b.textContent='记录问题手册'});
  document.querySelectorAll('#quickTabs [data-mode="problem"]').forEach(b=>b.textContent='问题手册');
  document.querySelectorAll('[data-scroll="problem-journal"]').forEach(b=>b.textContent='问题手册');
}

function renderManualEntries(){
  relabelManualUI();
  const feed=document.getElementById('problemFeed');if(!feed)return;
  const search=document.getElementById('problemSearch');const filter=document.getElementById('problemFilter');
  const q=(search?.value||'').trim().toLowerCase();const f=filter?.value||'';
  let items=[...(S.manualEntries||[])].sort((a,b)=>(b.lastUsed||b.date||'').localeCompare(a.lastUsed||a.date||''));
  if(q)items=items.filter(x=>[x.title,x.situation,x.solution,x.verification,...arr(x.keywords),...arr(x.cautions)].join(' ').toLowerCase().includes(q));
  if(f==='confirmed')items=items.filter(x=>x.status==='confirmed');
  if(f==='unverified')items=items.filter(x=>x.status!=='confirmed');
  if(f==='recent')items=items.filter(x=>x.lastUsed);
  feed.innerHTML=items.length?items.map(renderManualCard).join(''):'<div class="empty">还没有匹配的问题手册条目。遇到一个值得复用的小诀窍时，直接记录即可。</div>';
  feed.querySelectorAll('[data-manual-used]').forEach(b=>b.onclick=()=>{const item=S.manualEntries.find(x=>x.entryId===b.dataset.manualUsed);if(!item)return;item.useCount=Number(item.useCount||0)+1;item.lastUsed=localISO();save();renderManualEntries();toast('已记录本次复用')});
  if(search&&!search.dataset.manualBound){search.addEventListener('input',renderManualEntries);search.dataset.manualBound='1'}
  if(filter&&!filter.dataset.manualBound){filter.addEventListener('change',renderManualEntries);filter.dataset.manualBound='1'}
}

function renderManualCard(x){
  const status=x.status==='confirmed'?'已确认':x.status==='partially_confirmed'?'部分确认':'待确认';
  return `<article class="entry manual-card"><header><span>${esc(x.date||'未标日期')} · ${esc(topicLabel(x.topic))}</span><div class="tag-row"><span class="tag ${x.status==='confirmed'?'good':'problem'}">${status}</span><span class="tag">使用 ${Number(x.useCount||0)} 次</span></div></header><h3>${esc(x.title||'未命名手册')}</h3><div class="manual-core"><p><b>当时的困境：</b>${esc(x.situation||'待补充')}</p><p><b>处理方式：</b>${formatManualText(x.solution||'待补充')}</p></div>${arr(x.cautions).length?`<details><summary>需要注意</summary><ul>${arr(x.cautions).map(v=>`<li>${esc(v)}</li>`).join('')}</ul></details>`:''}${x.verification?`<p><b>如何确认：</b>${esc(x.verification)}</p>`:''}<div class="tag-row manual-keywords">${arr(x.keywords).slice(0,10).map(k=>`<span class="tag">${esc(k)}</span>`).join('')}</div><footer class="manual-footer"><small>${x.lastUsed?`最近使用 ${esc(x.lastUsed)}`:'尚未记录复用'}</small><button class="secondary small-btn" data-manual-used="${esc(x.entryId)}">我又用到了</button></footer></article>`
}

function formatManualText(value){return esc(String(value)).replace(/\n/g,'<br>')}
function topicLabel(x){return({linux:'Linux',shell:'Shell',simulation:'仿真',environment:'环境复用',verdi:'Verdi',git:'Git',uvm:'UVM',systemverilog:'SystemVerilog',debug:'Debug',workflow:'工作流',other:'其他'})[x]||x||'其他'}
function injectManualStyles(){if(document.getElementById('manual-v31-style'))return;const s=document.createElement('style');s.id='manual-v31-style';s.textContent=`.manual-card{border-left:3px solid var(--amber)}.manual-card h3{font-size:16px}.manual-core{margin:10px 0;padding:12px;background:rgba(230,170,81,.045);border:1px solid rgba(230,170,81,.18);border-radius:9px}.manual-core p{margin:5px 0 10px}.manual-keywords{margin-top:12px}.manual-footer{display:flex;align-items:center;justify-content:space-between;gap:12px;border-top:1px solid var(--line2);margin-top:12px;padding-top:10px}.manual-footer small{color:var(--muted)}.manual-intro{border-color:#6d552d;background:rgba(230,170,81,.05)}`;document.head.appendChild(s)}
