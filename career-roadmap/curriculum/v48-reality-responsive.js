window.addEventListener('load',()=>{try{installRealityResponsiveV48()}catch(e){console.error('Reality Responsive V4.8 failed',e)}},{once:true});
function installRealityResponsiveV48(){
 updateRealityDataV48();updateCareerFrameworkV48();injectRealityStylesV48();
 const oldCareer=renderCareer;renderCareer=function(){oldCareer();tuneCareerRealityV48()};
 const oldResume=renderResume;renderResume=function(){oldResume();tuneResumeRealityV48()};
 const oldAnalysis=renderPersonalAnalysisV45;renderPersonalAnalysisV45=function(){oldAnalysis();tuneProfileRealityV48()};
 const oldAll=renderAll;renderAll=function(){oldAll();tuneCareerRealityV48();tuneResumeRealityV48();tuneProfileRealityV48()};
 document.title='Jett · Career OS V4.8';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V4.8';save();renderAll()
}
function updateRealityDataV48(){
 const projectUpdates={
  '某SoC频率监控IP验证（VFM）':{time:'2026.07—至今',role:'模块验证工程师',scope:'承担UT用例开发与执行，并推进ST数据链路、调节闭环和系统时钟检查场景；在已有UVM/RAL/APB环境中完成配置、激励、检查和调试。',result:'24个UT用例完成并通过；ST数据链路场景已验证；调节闭环仍在调试，Coverage、稳定性和正式Sign-off结论待补充。',publicBoundary:'已脱敏内部IP版本、层级路径、寄存器地址和协作者信息；不将当前任务表述为正式IP Owner或完整Sign-off。'},
  '某SoC时钟复位模块验证（CRG）':{time:'2026.07—至今',role:'模块验证与环境适配',background:'接手已有CRG UT环境并进行当前SoC环境适配，具体芯片代号与内部路径已脱敏。',result:'已推进主要环境适配、用例执行及脚本/配置问题排查；ST接入、覆盖分析和完整交付状态仍在继续确认。',publicBoundary:'内部芯片代号、人员、revision和精确路径已脱敏；当前证据不足以写成模块Owner或完整交付。'},
  '某快速电压跌落检测IP验证（FDD）':{time:'2026.07—至今',role:'模块验证与方法接入',result:'已推进UT、ST、FPV、数据混仿和IPTEST相关任务，并识别多类RTL、模型或配置问题；最终Coverage、问题关闭数量和正式交付结论待补充。',publicBoundary:'内部模块名、文件名、地址、人员和具体配置已脱敏；不将多方法参与直接等同于正式验证Owner。'},
  '片上LDO验证规划与工作量评估':{time:'2026.07',role:'验证规划与估算参与',result:'形成测试点、工作计划和资源风险说明；实际验证尚未启动，不作为已完成交付成果。',publicBoundary:'仅展示方法和量级，内部项目代号、详细需求与计划数据已脱敏。'}
 };
 const r=S.resume||{};arr(r.projects).forEach(p=>{const u=projectUpdates[p.title];if(u)Object.assign(p,u)});r.sourceVersion='career-assets-v48-reality-check-2026-07-14';r.version='2026年7月 Reality Check';S.resume=r;
 const candidateUpdates={
  soc:{candidateLevel:2,candidateStatus:'开始进入跨模块与系统路径',signal:'已有跨模块数据链、调节闭环和ST场景经历，但完整SoC控制、错误、恢复与软件协同仍未形成稳定独立证据。',confirm:'一次陌生SoC综合案例通过＋一次真实跨模块场景闭环证据'},
  verification:{candidateLevel:3,candidateStatus:'较完整模块验证能力正在形成',signal:'已覆盖UT、ST、FPV、混仿和IPTEST等活动，但正式Owner范围、环境组件独立设计、Coverage Closure和Sign-off尚未确认。',confirm:'两类独立项目证据＋正式Testplan/Closure Review或Sign-off责任'},
  debug:{candidateLevel:3,candidateStatus:'能够推进多类问题，方法稳定性待确认',signal:'已参与时钟、X传播、位宽、配置和跨模块问题排查；7月14日仍出现由设计人员识别的低可见度force/release根因，系统化调试流程需继续验证。',confirm:'两个不同类型问题独立闭环＋陌生变式复测＋外部Review'},
  productivity:{candidateLevel:2,candidateStatus:'局部脚本与环境应用已出现',signal:'能够使用环境生成脚本并提出子系统配置假设，也有Python脚本适配经历；完整环境架构理解和跨子系统迁移尚未确认。',confirm:'在新子系统独立生成环境并帮助他人复现＋一个可重复运行工具'},
  ownership:{candidateLevel:3,candidateStatus:'出现任务推进与协调信号',signal:'已参与验证规划、资源差距和数模混合模型交付边界讨论，但正式决策权、责任划分闭环和最终Sign-off范围尚未确认。',confirm:'一次跨团队责任/交付闭环＋主管明确反馈独立责任范围'},
  industry:{candidateLevel:1,candidateStatus:'尚未形成稳定行业判断',signal:'目前主要是工程任务与资源讨论，尚缺连续的产品、市场和商业约束分析输出。',confirm:'至少两次结构化产品或行业分析通过Review'}
 };
 arr(S.abilityCandidates).forEach(a=>{if(candidateUpdates[a.id])Object.assign(a,candidateUpdates[a.id])});
 S.realityReviewV48={date:'2026-07-14',principle:'Only confirmed facts are presented as current reality; roles, stage gates and decision signals remain provisional until reviewed.'}
}
function updateCareerFrameworkV48(){
 if(typeof CAREER_STAGES!=='undefined'){
  const s1=CAREER_STAGES.find(x=>x.id==='s1');if(s1){s1.title='IP验证工程师 → 独立Owner能力积累';s1.items=['推进复杂模块验证任务','建立系统化Debug与环境方法','补齐Coverage与Sign-off证据','逐步获得跨团队责任闭环']}
 }
 if(typeof STAGE_GATES!=='undefined'){
  const rows=[
   ['复杂IP完整交付','已承担多类模块验证任务；完整计划、Coverage、回归和Sign-off尚未闭合。','进行中'],
   ['跨模块与系统问题','已进入ST数据链和调节闭环场景，但通用SoC错误与恢复路径仍需扩展。','开始出现'],
   ['验证策略独立性','能够拆解测试点和场景；独立定义Closure、Waiver与取舍的证据不足。','待确认'],
   ['Review与反馈闭环','已获得设计与团队反馈，并开始把问题转成下一步行动。','进行中'],
   ['小范围责任扩大','已出现模型交付边界和资源讨论机会，但尚未完成跨团队闭环。','开始出现']
  ];STAGE_GATES.splice(0,STAGE_GATES.length,...rows.map(x=>({name:x[0],description:x[1],state:x[2]})))
 }
 if(typeof DECISIONS!=='undefined'){
  const rows=[
   ['技术成长','已进入VFM、CRG、FDD、ST闭环和混合方法相关任务','完整Closure、系统化Debug和跨项目迁移仍待验证'],
   ['交付Scope','已承担多类验证任务，并开始参与模型交付和资源讨论','正式Owner、Sign-off、资源取舍与最终责任边界尚未确认'],
   ['协调机会','已出现与设计、项目经理及模拟设计侧沟通的真实议题','能否推动责任、接口、时间和验收闭环，尚无结果证据'],
   ['外部通用性','UVM、RAL、APB、SVA/FPV、Cosim和Python具备通用基础','需将内部环境经验抽象为可迁移方法和脱敏成果'],
   ['回报与成长','当前处于入职早期，暂不对收入回报趋势作结论','积累6—12个月职责、绩效、税后现金流和公积金数据后再评估']
  ];DECISIONS.splice(0,DECISIONS.length,...rows)
 }
}
function tuneCareerRealityV48(){
 const gate=document.getElementById('stage-gates');if(gate){const h=gate.querySelector('.section-title h2');if(h)h.textContent='下一阶段进入条件 · 按证据区分状态';const p=gate.querySelector('.section-title p')||document.createElement('p');p.textContent='“进行中”“开始出现”“待确认”含义不同，不因接触过相关任务就视为已经满足。';if(!p.parentElement)gate.querySelector('.section-title')?.appendChild(p);gate.querySelectorAll('.gate-row').forEach(row=>{const s=row.querySelector('.gate-state');if(s)s.dataset.state=s.textContent.trim()})}
 const summary=document.querySelector('#stageGateLayout .gate-summary h3');if(summary)summary.textContent='IP验证工程师 · Owner能力积累期';const summaryP=document.querySelector('#stageGateLayout .gate-summary p');if(summaryP)summaryP.textContent='已经进入多类模块验证与跨团队议题，但正式Owner、完整Sign-off和独立决策范围仍需用后续结果确认。';
 const sec=document.getElementById('career-decisions');if(sec){const h=sec.querySelector('.section-title h2');if(h)h.textContent='留任、跳槽与转型观察框架';let p=sec.querySelector('.section-title p');if(!p){p=document.createElement('p');sec.querySelector('.section-title')?.appendChild(p)}p.textContent='以下是当前事实与仍需验证的条件，不是对未来两年或收入趋势的既定判断。';const th=sec.querySelectorAll('thead th');if(th[1])th[1].textContent='当前积极信号';if(th[2])th[2].textContent='仍需验证 / 触发调整的信号'}
}
function tuneResumeRealityV48(){
 document.querySelectorAll('.portfolio-project').forEach(card=>{const role=card.querySelector('header .tag.work');if(role){role.classList.add('project-role-v48');role.title='当前职责表述基于已确认事实，不代表正式Owner任命'};const n=card.querySelector('.project-number');if(n)n.setAttribute('aria-hidden','true')});
 const note=document.querySelector('#project-library .section-title p');if(note)note.textContent='只保留已确认的时间、职责、过程和结果；“Owner/负责人”仅在有正式责任证据时使用。'
}
function tuneProfileRealityV48(){
 const root=document.getElementById('personalAnalysisBodyV45');if(!root)return;const stages=root.querySelectorAll('.profile-stage-v45 article');if(stages[0])stages[0].innerHTML='<small>当前职业阶段</small><h3>IP验证工程师 · Owner能力积累期</h3><p>已承担多项模块验证和跨层任务，但正式Owner、Sign-off与独立决策范围尚未确认。</p>';if(stages[2])stages[2].innerHTML='<small>下一升级条件</small><h3>完整Closure＋正式责任反馈</h3><p>需要Coverage、Regression、Sign-off、跨团队闭环和主管对独立范围的明确确认。</p>';
 const cards=root.querySelectorAll('.profile-grid-v45 .card');if(cards[0])cards[0].innerHTML='<div class="eyebrow">CONFIRMED</div><h3>当前已经确认</h3><ul><li>能够在已有环境中推进UT、ST、FPV、混仿与IPTEST相关任务</li><li>在真实调试中开始追踪控制、状态和数据来源</li><li>能够使用部分环境生成脚本并提出配置假设</li><li>开始参与验证范围、人力和交付边界讨论</li></ul>';if(cards[1])cards[1].innerHTML='<div class="eyebrow">EMERGING</div><h3>正在形成</h3><ul><li>从结果检查走向系统化Debug证据链</li><li>从任务执行走向模块级Closure判断</li><li>数模混合模型的跨团队交付与验收意识</li><li>环境生成架构与跨子系统迁移能力</li></ul>';if(cards[2])cards[2].innerHTML='<div class="eyebrow">NOT YET CONFIRMED</div><h3>暂不能写成事实</h3><ul><li>正式独立IP Owner身份</li><li>完整Coverage、Regression与Sign-off结果</li><li>独立设计Checker、Scoreboard、Monitor的明确范围</li><li>已完成跨团队责任划分和交付闭环</li><li>收入与责任已经形成长期匹配趋势</li></ul>'
}
function injectRealityStylesV48(){if(document.getElementById('v48-reality-style'))return;const s=document.createElement('style');s.id='v48-reality-style';s.textContent=`
.gate-layout{grid-template-columns:minmax(220px,.7fr) minmax(0,1.3fr)!important}.gate-list,.gate-row,.gate-row>*{min-width:0}.gate-row{grid-template-columns:minmax(145px,.8fr) minmax(0,1.7fr) auto!important;gap:12px!important;align-items:center!important}.gate-row p{overflow-wrap:anywhere}.gate-state{display:inline-flex!important;width:auto!important;min-width:64px!important;height:auto!important;min-height:28px!important;padding:5px 9px!important;border-radius:999px!important;align-items:center!important;justify-content:center!important;white-space:nowrap!important;font-size:9px!important}.gate-state[data-state="开始出现"]{border-color:#315687!important;color:var(--blue)!important}.gate-state[data-state="待确认"]{border-color:#6d552d!important;color:var(--amber)!important}
.table-wrap{overflow-x:auto}.decision-table{width:100%;table-layout:fixed}.decision-table th:first-child,.decision-table td:first-child{width:22%}.decision-table th,.decision-table td{overflow-wrap:anywhere;word-break:break-word;vertical-align:top;line-height:1.65}
.project-grid{grid-template-columns:repeat(2,minmax(0,1fr))!important}.project-grid>*{min-width:0}.portfolio-project{min-width:0;isolation:isolate;overflow:hidden}.portfolio-project .project-number{z-index:0!important;width:auto!important;height:auto!important;border:0!important;border-radius:0!important;background:transparent!important;padding:0!important;display:block!important;line-height:1!important;pointer-events:none!important}.portfolio-project>header{position:relative;z-index:2;display:grid!important;grid-template-columns:minmax(0,1fr) auto!important;align-items:start!important}.portfolio-project>header>div,.project-columns>div{min-width:0}.portfolio-project .project-role-v48{position:relative!important;inset:auto!important;width:auto!important;height:auto!important;min-width:0!important;display:inline-flex!important;border-radius:999px!important;padding:4px 8px!important;white-space:nowrap!important;align-items:center!important;justify-content:center!important;z-index:3!important;background:#07141e!important}.portfolio-project h3,.portfolio-project p,.portfolio-project li,.portfolio-project details{overflow-wrap:anywhere;word-break:break-word}.project-columns{grid-template-columns:minmax(0,1.15fr) minmax(0,.85fr)!important}.tag-row{min-width:0}.portfolio-project .tag-row .tag,.asset-card-v43 .tag-row .tag{max-width:100%;white-space:normal;overflow-wrap:anywhere;line-height:1.35}.asset-table-v43 article{grid-template-columns:minmax(0,1fr) auto!important}.asset-table-v43 article>*{min-width:0}.asset-table-v43 .tag{white-space:nowrap;align-self:start}
@media(max-width:1180px){.project-grid{grid-template-columns:1fr!important}.portfolio-project .project-number{display:none!important}}
@media(max-width:900px){.gate-layout{grid-template-columns:1fr!important}.gate-row{grid-template-columns:minmax(0,1fr) auto!important}.gate-row p{grid-column:1/-1;margin:0}.decision-table thead{display:none}.decision-table,.decision-table tbody,.decision-table tr,.decision-table td{display:block;width:100%!important}.decision-table tr{padding:14px;border-bottom:1px solid var(--line2)}.decision-table tr:last-child{border-bottom:0}.decision-table td{border:0!important;padding:6px 0!important}.decision-table td:before{display:block;color:var(--cyan);font-size:9px;letter-spacing:.12em;margin-bottom:3px}.decision-table td:nth-child(1):before{content:'维度'}.decision-table td:nth-child(2):before{content:'当前积极信号'}.decision-table td:nth-child(3):before{content:'仍需验证 / 触发调整'}}
@media(max-width:620px){.gate-row{grid-template-columns:1fr!important}.gate-state{justify-self:start}.portfolio-project>header{grid-template-columns:1fr!important}.portfolio-project .project-role-v48{justify-self:start;margin-top:8px}.project-columns{grid-template-columns:1fr!important}.asset-table-v43 article{grid-template-columns:1fr!important}.asset-table-v43 .tag{justify-self:start}.section-title.split-title{align-items:flex-start}}
`;document.head.appendChild(s)}
