(function(){
const REVIEW={
 marker:'CAREER_OS_V592_WEEKLY_REVIEW',reviewId:'2026-W29-external-review',schemaVersion:'career-os-weekly-review-1',range:{start:'2026-07-13',end:'2026-07-17'},
 summary:'本周最重要的变化不是新增了多少数模或后仿知识，而是判断开始从“能否把环境跑通、让用例通过”转向“配置为何有效、检查器依据是什么、谁承担接口与签核责任”。最大误判风险是把尚未获得项目边界信息写成验证计划本身缺失，以及把上游延期转化为个人能力问题。下周围绕后仿和数模任务建立经确认的输入、配置、检查、签核和责任最小合同。',
 weeklyTheme:'从依托现有流程跑通用例，转向确认机制、接口合同与签核边界。',
 diagnoses:[
  {id:'D1',topic:'数模环境配置',decision:'keep',confidence:.88,status:'active_intervention',hypothesis:'已能在当前既有环境中完成模拟网表接入和基础数模混合仿真，但尚未证明能够脱离模板独立解释、修改和迁移模型选择、层级绑定、接口转换及运行配置。',nextProof:'在干净副本或第二个最小环境中独立接入，解释实际绑定与接口转换，并预测一次配置修改的仿真变化。'},
  {id:'D2',topic:'数模验证边界',decision:'modify',confidence:.83,status:'active_intervention',hypothesis:'当前证据只说明尚未获得或确认本项目的数模接口合同与签核职责，不能据此判断验证计划本身缺失连续行为检查。',nextProof:'获得明确职责边界，并据此实现自己的接口检查项。'},
  {id:'D3',topic:'后仿任务入口',decision:'modify',confidence:.90,status:'active_intervention',hypothesis:'针对即将开展的后仿任务，尚未获得网表阶段、回标方式、模型与库、必跑场景、corner和签核目标等入口信息；不能泛化为普遍无法理解所有后仿类型。',nextProof:'独立识别网表、回标、库、模式和签核标准，并完成一次运行与结果解释。'},
  {id:'D4',topic:'交付与责任依赖',decision:'downgrade_to_observation',confidence:.82,status:'continue_observing',hypothesis:'存在上游延期及模型开发、验收责任未完全确认的项目依赖，但是否显著影响关键路径证据不足。',nextProof:'用依赖矩阵区分完全阻塞、可替代启动和不受影响任务。'},
  {id:'D5',topic:'Debug方法',decision:'keep',confidence:.85,status:'active_intervention',hypothesis:'已在时钟等待、控制残留、模式切换和低功耗路径问题中重复使用控制—状态—数据—检查器分析思路，但尚未证明能在陌生问题中独立、稳定且高效闭环。',nextProof:'在陌生失败中记录假设和排除路径，独立定位并使用固定checklist。'},
  {id:'D6',topic:'低功耗判断',decision:'keep',confidence:.82,status:'continue_observing',hypothesis:'已能识别掉电恢复、模式切换及非必要路径活动问题并形成被设计认可的反馈，但尚未证明能够独立建立完整低功耗检查体系。',nextProof:'完成修改后回归，并独立检查第二个低功耗边界。'}
 ],
 observation:{id:'O1-Verification-Contract-Mindset',topic:'验证合同与签核思维正在形成',confidence:.78,impact:'high',hypothesis:'正在从执行测试和处理单点失败，转向确认检查依据、输入有效性、接口合同、消费者及签核责任；目前仍是判断意识，尚未成为稳定方法资产。'},
 capabilityUpdates:[
  {capability:'功能验证',from:'Applied',to:'Repeated Application',note:'多类模式、随机和时域边界场景连续实践；仅更新状态描述，不提高长期能力评分。'},
  {capability:'Debug',from:'Applied',to:'Repeated Application',note:'在多个不同问题中重复开展机制和路径分析。'},
  {capability:'跨团队协作',from:'Applied',to:'Repeated Application',note:'持续与设计、模拟、导师和负责人推进问题及交付。'}
 ],
 interventions:[
  {priority:1,title:'当前后仿任务的入口与签核地图',hours:3,deliverable:'一页《后仿任务 Intake Checklist》',scope:'确认网表阶段、回标、库与模型、必跑场景和corner、日志检查项、通过责任人。'},
  {priority:2,title:'数模最小配置地图与接口合同',hours:4,deliverable:'AMS配置地图、接口合同表和最小受控实验记录',scope:'只处理一个接口或最小场景：模型来源、binding、接口转换、单位阈值和必要运行参数。'},
  {priority:3,title:'Clock / Force / Wave Debug Checklist',hours:2.5,deliverable:'一页Checklist及checker等待窗口推导说明',scope:'固化一个时钟切换等待推导、Force建立释放、波形保留预检查和假设记录。'}
 ],
 trackReview:{ocldo:{action:'add_prior_knowledge',state:'in_progress',note:'加入模型责任、接口合同、低功耗场景和基础接入经验；不完成Unit。'},uvmms:{action:'add_note',state:'not_started',note:'记录基础阅读、试点假设和量化指标；无代码、baseline或收益数据。'},priority:'OCLDO primary / UVM-MS secondary'},
 roadmap:{decision:'minor_priority_adjustment',proposalOnly:true,note:'短期提高后仿入口、数模配置和接口合同优先级；自动化作为横向机会观察；长期SoC、低功耗与数模候选差异化路线不变。'},
 nextQuestions:[
  '当前后仿使用哪一阶段网表？是否需要SDF、寄生或其他回标，本次主要防范什么风险？',
  '连续量、阈值穿越、稳定时间和数字结果分别由谁负责签核？',
  '行为模型在哪些输入、负载、模式和corner下有效，完成过哪些相关性检查？',
  '正式数模配置中，模型选择、层级绑定、接口转换、单位和阈值分别由哪些文件控制？',
  '延期交付物分别阻塞哪些任务，哪些可用波形、模型或部分网表提前开始？'
 ]
};
window.CAREER_OS_V592_WEEKLY=REVIEW;
function escV592(s){return String(s??'').replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))}
function install(){
 if(typeof S!=='object')return;
 S.weeklyReviewRecords=Array.isArray(S.weeklyReviewRecords)?S.weeklyReviewRecords:[];
 if(!S.weeklyReviewRecords.some(x=>x.reviewId===REVIEW.reviewId))S.weeklyReviewRecords.push({reviewId:REVIEW.reviewId,range:REVIEW.range,summary:REVIEW.summary,schemaVersion:REVIEW.schemaVersion,weeklyTheme:REVIEW.weeklyTheme,externalReview:true,details:REVIEW});
 S.weeklyObservations=Array.isArray(S.weeklyObservations)?S.weeklyObservations:[];
 if(!S.weeklyObservations.some(x=>x.id===REVIEW.observation.id))S.weeklyObservations.push(REVIEW.observation);
 S.weeklyCapabilityReviews=Array.isArray(S.weeklyCapabilityReviews)?S.weeklyCapabilityReviews:[];
 if(!S.weeklyCapabilityReviews.some(x=>x.reviewId===REVIEW.reviewId))S.weeklyCapabilityReviews.push({reviewId:REVIEW.reviewId,updates:REVIEW.capabilityUpdates,scoreChange:false});
 S.learningInterventions=Array.isArray(S.learningInterventions)?S.learningInterventions:[];
 if(!S.learningInterventions.some(x=>x.reviewId===REVIEW.reviewId))S.learningInterventions.push({reviewId:REVIEW.reviewId,totalHours:9.5,items:REVIEW.interventions});
 S.roadmapInterventions=Array.isArray(S.roadmapInterventions)?S.roadmapInterventions:[];
 if(!S.roadmapInterventions.some(x=>x.reviewId===REVIEW.reviewId))S.roadmapInterventions.push({reviewId:REVIEW.reviewId,...REVIEW.roadmap});
 try{save()}catch(e){}
 inject();render();
}
function inject(){
 if(document.getElementById('weekly-review-v592'))return;
 const anchor=document.getElementById('review-layer-v4')||document.getElementById('weekly-review');if(!anchor)return;
 anchor.insertAdjacentHTML('beforebegin','<section class="content-section" id="weekly-review-v592"><div class="section-title"><div class="eyebrow">WEEKLY REVIEW · 2026 W29</div><h2>Career Model Weekly Review</h2><p>2026-07-13 至 2026-07-17 · 外部审查结果已写回</p></div><div id="weeklyReviewV592"></div></section>');
 if(!document.getElementById('v592-style')){const s=document.createElement('style');s.id='v592-style';s.textContent='.v592-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:12px}.v592-card{padding:16px;border:1px solid var(--line2);border-radius:14px;background:var(--card)}.v592-card h3{margin:4px 0 8px}.v592-meta{display:flex;gap:8px;flex-wrap:wrap;margin:8px 0}.v592-pill{font-size:12px;padding:4px 8px;border-radius:999px;background:var(--soft)}.v592-list{margin:8px 0 0;padding-left:18px}.v592-span{grid-column:1/-1}@media(max-width:800px){.v592-grid{grid-template-columns:1fr}.v592-span{grid-column:auto}}';document.head.appendChild(s)}
}
function render(){const b=document.getElementById('weeklyReviewV592');if(!b)return;b.innerHTML=`<div class="v592-grid"><article class="v592-card v592-span"><div class="eyebrow">EXECUTIVE REVIEW</div><h3>${escV592(REVIEW.weeklyTheme)}</h3><p>${escV592(REVIEW.summary)}</p></article><article class="v592-card v592-span"><div class="eyebrow">DIAGNOSIS CALIBRATION</div>${REVIEW.diagnoses.map(d=>`<div style="padding:10px 0;border-top:1px solid var(--line2)"><b>${escV592(d.id)} · ${escV592(d.topic)}</b><div class="v592-meta"><span class="v592-pill">${escV592(d.decision)}</span><span class="v592-pill">Confidence ${d.confidence.toFixed(2)}</span><span class="v592-pill">${escV592(d.status)}</span></div><p>${escV592(d.hypothesis)}</p><p class="muted">下一证明：${escV592(d.nextProof)}</p></div>`).join('')}</article><article class="v592-card"><div class="eyebrow">NEW OBSERVATION</div><h3>${escV592(REVIEW.observation.topic)}</h3><p>${escV592(REVIEW.observation.hypothesis)}</p><div class="v592-meta"><span class="v592-pill">Confidence ${REVIEW.observation.confidence}</span><span class="v592-pill">Impact ${REVIEW.observation.impact}</span></div></article><article class="v592-card"><div class="eyebrow">CAPABILITY UPDATE</div>${REVIEW.capabilityUpdates.map(x=>`<p><b>${escV592(x.capability)}</b> · ${escV592(x.from)} → ${escV592(x.to)}<br><span class="muted">${escV592(x.note)}</span></p>`).join('')}</article><article class="v592-card v592-span"><div class="eyebrow">NEXT WEEK · 9.5 HOURS</div><div class="v592-grid">${REVIEW.interventions.map(x=>`<div><h3>${x.priority}. ${escV592(x.title)} · ${x.hours}h</h3><p>${escV592(x.scope)}</p><p><b>交付：</b>${escV592(x.deliverable)}</p></div>`).join('')}</div></article><article class="v592-card"><div class="eyebrow">TRACK PRIORITY</div><h3>${escV592(REVIEW.trackReview.priority)}</h3><p><b>OCLDO：</b>${escV592(REVIEW.trackReview.ocldo.note)}</p><p><b>UVM-MS：</b>${escV592(REVIEW.trackReview.uvmms.note)}</p></article><article class="v592-card"><div class="eyebrow">ROADMAP</div><h3>Minor priority adjustment</h3><p>${escV592(REVIEW.roadmap.note)}</p></article><article class="v592-card v592-span"><div class="eyebrow">NEXT-WEEK QUESTIONS</div><ol class="v592-list">${REVIEW.nextQuestions.map(q=>`<li>${escV592(q)}</li>`).join('')}</ol></article></div>`}
window.addEventListener('load',()=>setTimeout(install,1800),{once:true});
})();