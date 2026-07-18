(function(){
 const MARKER='CAREER_OS_V596_WEEKLY_CAREER_MODEL_REVIEW';
 const PATCH={
  schemaVersion:'career-os-v4-weekly-1',
  reviewId:'2026-W29-career-model-review-20260718',
  range:{start:'2026-07-13',end:'2026-07-17'},
  summary:'本周验证判断开始从依托现有流程跑通用例，转向解释检查机制、配置有效性、模型合同和签核边界。时钟机制推导、低功耗设计反馈和跨团队交付判断获得了重复或外部反馈支持；AMS配置、数模验证边界、后仿、UVM-MS和自动化仍未形成可迁移或可签核能力。下周应围绕后仿入口合同、AMS最小配置与接口合同、Clock/Force/Wave Debug Checklist进行轻量干预。',
  highlights:[
   '在新的低频时钟切换场景中开始依据有效边沿、时钟周期和状态机过程推导Checker窗口，而不再只增加固定等待时间。',
   '掉电恢复和软件模式下非必要硬件路径活动问题获得设计复核，支持低功耗判断正在形成。',
   '完成模拟网表接入和基础AMS运行，但能力仍局限于当前环境，未证明配置解释和跨环境迁移。',
   '数模模型合同与交付责任问题获得团队、导师、模拟侧和数字侧多来源支持，但关键路径影响尚未量化。',
   '系统化Debug方法出现重复应用，但Force生命周期遗漏、波形管理和缺少效率数据阻止其升级为稳定方法。',
   'UVM-MS和CRG自动化仍是机会假设，不应记录为已应用能力或自动推进Track。'
  ],
  topEvidenceIds:['ev-0715-timing-01','ev-0714-debug-02','ev-0716-lowpower-01','ev-0716-delivery-02','ev-0717-config-01','ev-0717-postsim-01'],
  diagnosisUpdates:[
   {diagnosisId:'diag-mixedsignal-environment-configuration',lifecycle:'supported',previousConfidence:80,confirmedConfidence:86,evidenceStrength:'medium',reason:'真实工程中的模拟网表接入和基础AMS运行支持用户已具备当前环境下的操作能力；不能解释配置文件、模型绑定和接口转换，且缺少新环境重建证据，支持其尚未形成可解释、可迁移的配置能力。成功运行和内部流程可能高度模板化构成反证，因此不能表述为完全缺少环境使用能力。',supportingEvidenceIds:['ev-0717-config-01'],counterEvidenceIds:['ev-0717-config-02']},
   {diagnosisId:'diag-ams-verification-boundary',lifecycle:'collecting',previousConfidence:74,confirmedConfidence:68,evidenceStrength:'low',reason:'能够确认用户尚未获得或确认连续响应、阈值转换和数字结果的检查责任，但证据主要来自个人自述，缺少验证计划、负责人意见和现有Checker清单。项目可能只要求连通性或数字接口验证，也可能已有检查机制但尚未传达，因此不能断言项目验证计划本身缺少连续行为检查。',supportingEvidenceIds:['ev-0717-scope-01'],counterEvidenceIds:['ev-0717-scope-02']},
   {diagnosisId:'diag-post-simulation-flow',lifecycle:'collecting',previousConfidence:88,confirmedConfidence:78,evidenceStrength:'medium',reason:'即将开展真实后仿任务但尚不能说明网表阶段、回标方式、输入物、目的和签核标准，支持存在任务准备知识缺口。用户已有RTL、网表接入和AMS局部实践，且尚未获得正式任务说明；内部后仿称呼也可能较宽泛。因此应收窄为当前任务入口和跨阶段流程尚未建立，不能泛化为整体仿真能力不足。',supportingEvidenceIds:['ev-0717-postsim-01'],counterEvidenceIds:['ev-0717-postsim-02']},
   {diagnosisId:'diag-mixedsignal-delivery-boundary',lifecycle:'supported',previousConfidence:91,confirmedConfidence:86,evidenceStrength:'high',reason:'问题连续多日出现，并获得团队会议、导师、模拟侧、数字侧及实际延期信息支持，来源多样性高于其他Diagnosis。模型行为定义、有效范围、校准、验收和维护责任仍未形成正式合同。不过已有接口波形、Verilog-A和部分网表可支持提前工作，且关键路径影响未量化，因此Confidence从过高水平下调。',supportingEvidenceIds:['ev-0714-mixed-01','ev-0715-mixed-01','ev-0716-delivery-01','ev-0716-delivery-02','ev-0717-delivery-01'],counterEvidenceIds:['ev-0716-delivery-03','ev-0717-delivery-02']},
   {diagnosisId:'diag-systematic-debug-method',lifecycle:'supported',previousConfidence:78,confirmedConfidence:82,evidenceStrength:'medium',reason:'用户已在多个真实问题中采用控制、状态、数据、Checker和层级化波形Review思路，并开始形成固定分析顺序。Force未释放问题仍由设计人员识别，缺少跨模块独立闭环、效率数据和书面资产，说明方法正在形成但尚未稳定。模块熟悉度和设计信息不对称仍是重要替代解释。',supportingEvidenceIds:['ev-0714-debug-01','ev-0714-debug-02','ev-0715-debug-01'],counterEvidenceIds:['ev-0714-debug-03']},
   {diagnosisId:'diag-lowpower-intent-judgment',lifecycle:'supported',previousConfidence:76,confirmedConfidence:84,evidenceStrength:'medium',reason:'用户将功能结果、掉电恢复、模式控制和路径活动与低功耗意图联系起来，并获得设计复核形成两个待改进方向，构成跨日迁移和外部反馈支持。尚无正式规格、设计修改、回归或功耗活动数据，且部分路径可能承担安全或恢复用途，因此只能支持判断能力正在形成，不能升级为完整低功耗验证体系。',supportingEvidenceIds:['ev-0716-lowpower-01'],counterEvidenceIds:['ev-0716-lowpower-02']}
  ],
  courseDecision:{action:'light_adjustment',reason:'长期SoC验证、低功耗和数模差异化路线不需要重构。未来一周应临时提高后仿任务入口、AMS配置与接口合同、Checker和Debug方法固化的优先级。OCLDO保持主要Track；UVM-MS保持未开始并以工具兼容性和最小试点为门槛；CRG自动化在需求和验收未明确前仅作为机会观察。',addedTasks:[
   '3小时：形成当前后仿任务Intake Checklist，确认网表阶段、回标、库和模型、必跑场景、corner、日志检查项及签核责任人。',
   '4小时：选择一个AMS接口，形成最小配置地图、接口合同和受控实验记录，覆盖模型来源、binding、接口转换、单位、阈值和必要运行参数。',
   '2.5小时：形成Clock/Force/Wave Debug Checklist，并完成一个时钟切换Checker等待窗口的边沿、周期和最坏相位推导。'
  ]},
  nextWeek:{priority:'建立后仿入口合同和AMS接口配置合同，优先解决当前任务如何被正确执行和签核，而不是扩展新的宽泛方法学。',workFocus:'向负责人确认后仿与数模任务的输入、检查项、corner、输出、Owner和通过标准；跟踪低功耗改进点、Force修复及相关回归结果。',learningFocus:'围绕当前任务反查AMS配置和后仿流程，并把时钟等待推导、Force生命周期和波形保留固化为一页可复用Checklist。',feedbackQuestion:'本次后仿和数模混仿分别使用哪些正式输入，由谁检查连续响应、阈值转换、数字结果和时间关系，最终依据哪些用例、corner和结果判定通过？'},
  resumeCandidates:[],
  missingInformation:[
   '时钟切换正式状态机规格、两个方向的最大允许延迟及修改Checker后的回归结果。',
   'Force未释放问题是否已修复、是否完成回归，以及环境是否存在其他残留Force入口。',
   '当前AMS配置中模型选择、层级绑定、接口转换、单位、阈值和solver参数分别由哪些文件控制。',
   '是否能够在第二个环境或最小受控工程中独立复现AMS配置和连接正确性。',
   '当前项目对连续量、阈值穿越、稳定时间、异常恢复和数字结果的检查及签核责任。',
   '即将开展的后仿属于哪一阶段、需要哪些网表、回标、库模型、corner和签核输出。',
   'Verilog-A、SV-RNM和真实网表的有效范围、相关性状态、已知限制和验收Owner。',
   '上游延期分别影响哪些关键任务、替代输入、新交付日期和风险升级责任人。',
   '低功耗两个改进方向的具体修改、Owner、完成时间及修改后功能与活动路径回归结果。',
   'UVM-MS工具兼容性、最小试点对象、现有框架重叠、baseline和成功标准。',
   'CRG自动化任务针对的人工瓶颈、脚本范围、输入输出及验收标准。',
   '层级化Debug方法在第二个陌生问题中的独立闭环时间和团队反馈。'
  ]
 };
 window.CAREER_OS_V596_WEEKLY_REVIEW=PATCH;
 const esc=s=>String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
 const arr=x=>Array.isArray(x)?x:[];
 const topic=id=>S?.diagnoses?.find(x=>x.id===id)?.topic||id;
 function seed(){
  if(typeof S!=='object')return false;
  S.weeklyReviewRecords=arr(S.weeklyReviewRecords);S.diagnoses=arr(S.diagnoses);S.careerModel=arr(S.careerModel);S.diagnosisHistory=arr(S.diagnosisHistory);S.pendingConfidence=arr(S.pendingConfidence);
  const old=S.weeklyReviewRecords.find(x=>x.reviewId==='2026-W29-external-review');if(old){old.supersededBy=PATCH.reviewId;old.isCanonical=false}
  const wi=S.weeklyReviewRecords.findIndex(x=>x.reviewId===PATCH.reviewId);const record={...PATCH,isCanonical:true,source:'weekly_career_model_review'};if(wi>=0)S.weeklyReviewRecords[wi]={...S.weeklyReviewRecords[wi],...record};else S.weeklyReviewRecords.push(record);
  PATCH.diagnosisUpdates.forEach(u=>{
   const d=S.diagnoses.find(x=>x.id===u.diagnosisId);if(d)d.lifecycle=u.lifecycle;
   let m=S.careerModel.find(x=>x.diagnosisId===u.diagnosisId);if(!m){m={diagnosisId:u.diagnosisId,topic:d?.topic||u.diagnosisId,hypothesis:d?.hypothesis||'',diagnosisConfidence:0};S.careerModel.push(m)}
   m.diagnosisConfidence=Number(u.confirmedConfidence||0);m.evidenceStrength=u.evidenceStrength;m.lastReason=u.reason;m.lastSeen=PATCH.range.end;m.lastReviewId=PATCH.reviewId;
   const hi=S.diagnosisHistory.findIndex(x=>x.diagnosisId===u.diagnosisId&&x.reviewId===PATCH.reviewId);const h={diagnosisId:u.diagnosisId,date:PATCH.range.end,confidence:Number(u.confirmedConfidence||0),source:'weekly_review',reviewId:PATCH.reviewId};if(hi>=0)S.diagnosisHistory[hi]={...S.diagnosisHistory[hi],...h};else S.diagnosisHistory.push(h);
   S.pendingConfidence=S.pendingConfidence.filter(x=>x.diagnosisId!==u.diagnosisId)
  });
  S.weeklyCareerModelV596={version:'5.9.6',reviewId:PATCH.reviewId,applied:true,updatedAt:S.weeklyCareerModelV596?.updatedAt||new Date().toISOString()};
  try{if(typeof save==='function')save()}catch(e){console.error('V5.9.6 weekly save failed',e)}
  return true
 }
 function diagnosisRows(){return PATCH.diagnosisUpdates.map(u=>`<article><div><h4>${esc(topic(u.diagnosisId))}</h4><p>${esc(u.reason)}</p><small>支持：${esc(u.supportingEvidenceIds.join(' · ')||'无')}<br>反证：${esc(u.counterEvidenceIds.join(' · ')||'无')}</small></div><div class="weekly-pills-v595"><span>${esc(u.lifecycle)}</span><span>${u.previousConfidence}% → ${u.confirmedConfidence}%</span><span>${esc(u.evidenceStrength)}</span></div></article>`).join('')}
 function compact(){return `<article class="card weekly-current-v595 weekly-current-v596" id="weekly-review-current-v595"><div class="weekly-current-head-v595"><div><div class="eyebrow">WEEKLY CAREER MODEL REVIEW · 2026 W29 · 已正式写回</div><h2>从跑通任务转向建立验证合同与机制依据</h2></div><span class="tag good">${esc(PATCH.reviewId)}</span></div><p>${esc(PATCH.summary)}</p><div class="weekly-current-grid-v595"><section><small>正式校准</small><b>${PATCH.diagnosisUpdates.length} 项 Diagnosis</b><span>${PATCH.diagnosisUpdates.filter(x=>x.lifecycle==='supported').length} 项获得支持</span></section><section><small>课程决定</small><b>Light adjustment</b><span>长期路线不重构</span></section><section><small>下周投入</small><b>9.5 小时</b><span>后仿入口 · AMS合同 · Debug清单</span></section></div><div class="actions"><button class="primary small-btn" id="openWeeklyArchiveV595">查看完整周复盘</button></div></article>`}
 function full(){return `<section id="weekly-review-detail-v595" class="weekly-detail-v595 weekly-detail-v596"><div class="section-title split-title"><div><div class="eyebrow">WEEKLY CAREER MODEL REVIEW · 2026 W29 · SOURCE OF TRUTH</div><h2>${esc(PATCH.range.start)} 至 ${esc(PATCH.range.end)}</h2><p>这是经过证据、反证、来源多样性、独立程度与替代解释审查后正式写回的周度Career Model Patch。</p></div><span class="tag good">${esc(PATCH.reviewId)}</span></div><article class="card weekly-executive-v595"><h3>本周结论</h3><p>${esc(PATCH.summary)}</p></article><article class="card weekly-v596-highlights"><div class="eyebrow">HIGHLIGHTS</div><h3>本周工作主线与关键判断</h3><ol>${PATCH.highlights.map(x=>`<li>${esc(x)}</li>`).join('')}</ol><p><b>Top Evidence：</b>${esc(PATCH.topEvidenceIds.join(' · '))}</p></article><details class="card weekly-calibration-v595" open><summary><b>Diagnosis Calibration</b><span>${PATCH.diagnosisUpdates.length} 项</span></summary><div>${diagnosisRows()}</div></details><div class="weekly-detail-grid-v595"><article class="card"><div class="eyebrow">COURSE DECISION</div><h3>Light adjustment</h3><p>${esc(PATCH.courseDecision.reason)}</p></article><article class="card"><div class="eyebrow">NEXT WEEK PRIORITY</div><h3>最重要行动</h3><p>${esc(PATCH.nextWeek.priority)}</p></article><article class="card"><div class="eyebrow">RESUME EVIDENCE</div><h3>本周不形成简历条目</h3><p>低功耗反馈、AMS接入和跨团队推动仍缺少修改回归、正式采用或可量化结果。</p></article></div><div class="section-title"><div class="eyebrow">NEXT WEEK · 9.5 HOURS</div><h2>轻量干预，不自动形成课程欠账</h2><p>以下任务是审查建议；只有用户确认选择后才进入执行层。</p></div><div class="weekly-interventions-v595">${PATCH.courseDecision.addedTasks.map((x,i)=>`<article class="card"><span class="tag">P${i+1}</span><h3>${esc(x.split('：')[0])}</h3><p>${esc(x.includes('：')?x.slice(x.indexOf('：')+1):x)}</p></article>`).join('')}</div><article class="card weekly-v596-next"><div class="eyebrow">WORK / LEARNING / FEEDBACK</div><p><b>工作重点：</b>${esc(PATCH.nextWeek.workFocus)}</p><p><b>学习重点：</b>${esc(PATCH.nextWeek.learningFocus)}</p><p><b>反馈问题：</b>${esc(PATCH.nextWeek.feedbackQuestion)}</p></article><details class="card weekly-questions-v595"><summary><b>仍缺少的信息</b><span>${PATCH.missingInformation.length} 项</span></summary><ol>${PATCH.missingInformation.map(x=>`<li>${esc(x)}</li>`).join('')}</ol></details></section>`}
 let busy=false;
 function mount(){
  if(busy||typeof document==='undefined')return false;busy=true;
  try{
   seed();
   const oldCurrent=document.getElementById('weekly-review-current-v595');if(oldCurrent&&!oldCurrent.classList.contains('weekly-current-v596'))oldCurrent.remove();
   const oldDetail=document.getElementById('weekly-review-detail-v595');if(oldDetail&&!oldDetail.classList.contains('weekly-detail-v596'))oldDetail.remove();
   const week=document.getElementById('growth-week-v58');if(week&&!document.querySelector('.weekly-current-v596')){const status=week.querySelector('.growth-status-v58');if(status)status.insertAdjacentHTML('afterend',compact());else week.insertAdjacentHTML('afterbegin',compact())}
   const archive=document.getElementById('growth-archive-v58');if(archive&&!document.querySelector('.weekly-detail-v596'))archive.insertAdjacentHTML('afterbegin',full());
   document.getElementById('weekly-review-v594')?.setAttribute('hidden','');document.getElementById('weekly-review-v592')?.setAttribute('hidden','');
   const open=document.getElementById('openWeeklyArchiveV595');if(open)open.onclick=()=>{if(typeof S==='object'&&S.growthHubV58){S.growthHubV58.activeView='archive';try{if(typeof save==='function')save()}catch(e){}}if(typeof mountGrowthHubV58==='function')mountGrowthHubV58();setTimeout(()=>{mount();document.querySelector('.weekly-detail-v596')?.scrollIntoView({block:'start',behavior:'smooth'})},120)};
   return Boolean(document.querySelector('.weekly-current-v596')&&document.querySelector('.weekly-detail-v596'))
  }finally{busy=false}
 }
 function styles(){if(document.getElementById('v596-style'))return;const s=document.createElement('style');s.id='v596-style';s.textContent='.weekly-current-v596{border-left-color:#7dd3fc}.weekly-v596-highlights ol,.weekly-v596-next{line-height:1.65}.weekly-v596-highlights li{margin:7px 0}.weekly-detail-v596 small{color:var(--muted);line-height:1.55}.weekly-detail-v596 .weekly-calibration-v595>div>article{align-items:start}.weekly-detail-v596 .weekly-pills-v595 span{text-transform:none}';document.head.appendChild(s)}
 function install(){styles();mount();if(!window.__careerOSV596Observer){window.__careerOSV596Observer=new MutationObserver(()=>{if(!busy)requestAnimationFrame(mount)});window.__careerOSV596Observer.observe(document.body,{childList:true,subtree:true})}window.CAREER_OS_V596={marker:MARKER,version:'5.9.6',reviewId:PATCH.reviewId,complete:true}}
 if(document.readyState==='loading')window.addEventListener('load',()=>[0,120,600,1800,4200].forEach(d=>setTimeout(install,d)),{once:true});else install();
 window.addEventListener('pageshow',()=>setTimeout(install,120));window.addEventListener('focus',()=>setTimeout(mount,80));
})();
