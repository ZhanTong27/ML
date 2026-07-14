(function(){
window.CURRICULUM_CYCLES=[
{id:'c1',index:'01',range:'Week 1—4',title:'IP Owner与验证闭环升级',main:'风险、估算、多方法与复杂Debug',support:'量化证据与外部Review',outcome:'从完成用例升级为能够定义范围、选择方法、判断Closure并说明剩余风险。',weeks:['w1','w2','w3','w4']},
{id:'c2',index:'02',range:'Week 5—8',title:'SoC系统路径与闭环验证',main:'软件可见状态、数据链与动态闭环',support:'Interconnect、DMA与Interrupt',outcome:'从模块功能验证扩展到跨模块因果链、系统可观察性和SoC验证层级。',weeks:['w5','w6','w7','w8']},
{id:'c3',index:'03',range:'Week 9—12',title:'Clock / Reset / Power与混合方法专业线',main:'CRG、CDC/RDC、Power state与Cosim',support:'SVA、FPV、Corner与产品视角',outcome:'把现有监控类与混仿经历升级为可迁移的Clock、Power和混合验证专业标签。',weeks:['w9','w10','w11','w12']},
{id:'c4',index:'04',range:'Week 13—16',title:'Quantitative Closure、自动化与Owner影响力',main:'Coverage、Regression、Sign-off与Capstone',support:'资源判断、沟通与职业资产',outcome:'形成可审计的交付结论、可复用自动化工具和下一阶段系统级责任证据。',weeks:['w13','w14','w15','w16']}
];
window.CURRICULUM_ABILITIES=[
{id:'soc',name:'SoC系统推理',status:'正在从IP走向系统级',level:3,signal:'已在跨模块数据链和电压频率闭环中形成真实应用，但通用Interconnect、DMA、Interrupt、软件驱动和复杂恢复路径仍需系统训练。',next:'在陌生SoC子系统中独立画出数据、控制、错误和恢复路径，并完成验证层级分工。',opportunity:'真实ST继续积累；课外用通用SoC案例扩展宽度'},
{id:'verification',name:'验证工程设计',status:'接近独立IP Owner',level:4,signal:'已有VFM 24/24 UT、ST场景、FDD多方法验证和OCLDO测试点拆解等多来源证据，说明已能独立承担较完整IP验证工作。',next:'补齐Coverage数字、Bug/waiver、环境可信度和正式Sign-off证据，证明不仅能完成用例，也能定义完成。',opportunity:'争取独立Review Testplan、Closure和交付状态'},
{id:'debug',name:'Debug与证据判断',status:'能够处理复杂情况',level:4,signal:'已覆盖clock glitch、OneHot卡死、X传播、位宽一致性和跨模块数据链等不同类型问题，具备从现象走向根因的实际经验。',next:'稳定使用假设树、最小实验和环境自证，并量化定位时间、首次异常和预防机制。',opportunity:'继续沉淀S级案例并接受外部Review'},
{id:'productivity',name:'工程效率与自动化',status:'能够独立完成常见任务',level:3,signal:'已出现环境迁移、脚本适配、越界修复和LRS→VFL生成等证据，但自动化收益和可复用工具资产尚未量化。',next:'完成一个公开可运行的Regression分析工具，并为真实脚本建立效率基线。',opportunity:'个人电脑练Python；公司环境只记录脱敏结果'},
{id:'ownership',name:'交付责任与技术影响力',status:'强信号、仍待正式确认',level:3,signal:'VFM负责人角色、跨层UT/ST推进和OCLDO工作量评估显示Owner意识正在形成，但正式Sign-off、资源取舍和主管评价仍不足。',next:'完成一次有证据的Scope/Go-No-go建议，并获得主管对独立程度的明确反馈。',opportunity:'争取状态汇报、风险升级、估算Review和系统级责任'},
{id:'lowpower',name:'低功耗与电源时钟专业化',status:'已形成监控/混仿入口',level:2,signal:'已有频率、电压、快速跌落检测、LDO规划和混仿相关经历；但这些不等同于完整的UPF、Isolation、Retention和Power-state验证。',next:'明确区分监测调节、模拟接口和经典Power intent三条知识线，补齐Power domain与恢复闭环。',opportunity:'工作中深化监控类IP；课外补UPF与Power state系统框架'},
{id:'industry',name:'行业、产品与商业视野',status:'开始形成工程资源判断',level:2,signal:'已能从测试点规模、计划资源和系统价值分析项目，但对不同芯片产品、验证成本和商业约束仍缺少持续输出。',next:'完成AVFS、移动/汽车/AI低功耗、验证估算和自动化价值四次结构化分析。',opportunity:'每个Cycle至少一项一页行业输出'}
];
window.addEventListener('load',()=>{try{installPersonalizedLearningV45()}catch(e){console.error('Personalized learning V4.5 failed',e)}},{once:true});
})();
function installPersonalizedLearningV45(){
 const version='soc-verification-16w-v2-personalized';
 S.abilities=window.CURRICULUM_ABILITIES.map(base=>{const old=arr(S.abilities).find(x=>x.id===base.id);return old?{...old,...base,level:Math.max(Number(old.level)||0,base.level)}:base});
 if(S.curriculumVersion!==version){
  S.cycleArchives=arr(S.cycleArchives);
  if(!S.cycleArchives.some(x=>x.id==='curriculum-16w-v2-2026'))S.cycleArchives.unshift({id:'curriculum-16w-v2-2026',title:'2026年7—11月 · 个性化SoC验证进阶课程',range:'2026-07-13—2026-11-01',status:'进行中',goal:'IP Owner闭环 → SoC系统路径 → Clock/Power/混合方法 → Quantitative Closure与Owner影响力。',summary:'根据VFM、CRG、FDD、OCLDO等近期真实工作重新校准。工作只提供迁移证据，课外主干继续扩展系统、方法和行业能力。'});
  S.curriculumVersion=version;S.version='4.5';save()
 }
 document.documentElement.dataset.curriculum=version;
 injectPersonalAnalysisV45();
 const strip=document.querySelector('.career-strip p');if(strip)strip.textContent='当前阶段：独立IP Owner候选 → 系统级验证推进　·　核心优势：多方法验证、复杂Debug、Spec/Testplan　·　关键缺口：系统闭环量化、Power-state与正式Sign-off证据';
 const heading=document.querySelector('#current-execution .section-title h2');if(heading)heading.textContent='本周学习与个性化16周课程';
 const desc=document.querySelector('#current-execution .section-title p');if(desc)desc.textContent='主干学习、工作迁移和行业/Owner视角三线并行；真实工作不自动挤占课外课程。';
 document.title='Jett · Career OS V4.5';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V4.5';
 renderAll();setTimeout(()=>{syncCurriculumUI();renderPersonalAnalysisV45()},0)
}
function injectPersonalAnalysisV45(){
 if(document.getElementById('personal-analysis-v45'))return;const execution=document.getElementById('current-execution');if(!execution)return;
 execution.insertAdjacentHTML('beforebegin','<section class="content-section" id="personal-analysis-v45"><div class="section-title split-title"><div><div class="eyebrow">JULY 2026 · PROVISIONAL PROFILE</div><h2>近期工作后的立体分析</h2><p>基于已整理的真实工作事实形成，属于阶段性画像；正式Diagnosis Confidence仍由Weekly Review确认。</p></div><span class="tag learn">不直接改Confidence</span></div><div id="personalAnalysisBodyV45"></div></section>');injectPersonalStylesV45();renderPersonalAnalysisV45()
}
function renderPersonalAnalysisV45(){
 const box=document.getElementById('personalAnalysisBodyV45');if(!box)return;
 const formed=['能够将Feature拆成较完整的UT/ST验证任务，并承担一块IP的连续交付','已经接触动态仿真、FPV、Cosim和IPTEST，具备多方法验证入口','能处理时钟、X传播、位宽、环境迁移和跨模块数据一致性等不同问题','开始从测试点规模、依赖和资源差距进行工作量评估','具备将真实工作沉淀为项目素材、案例和证据边界的意识'];
 const emerging=['从模块级负责人走向系统级闭环验证','从用例PASS走向Coverage、Bug、Waiver和Sign-off量化','从脚本适配走向可复用自动化方法','从电压频率监测与混仿走向完整Power-state/UPF专业线'];
 const gaps=['ST闭环最终PASS、响应时间和稳定等待机制仍需证据','功能覆盖率、问题关闭数量和Regression稳定性缺少统一量化','Checker、Scoreboard、Monitor等环境组件的本人设计贡献范围仍待确认','正式Sign-off、Scope取舍和主管对独立程度的评价不足','当前低功耗经验不能直接等同于Isolation、Retention和Power intent能力'];
 box.innerHTML=`<section class="profile-stage-v45"><article><small>当前职业阶段</small><h3>独立IP Owner候选</h3><p>模块级交付证据已经明显超过新人基础阶段，正在向系统级验证和方法Owner过渡。</p></article><article><small>学习策略</small><h3>50 / 30 / 20</h3><p>50%长期主干 · 30%真实工作迁移 · 20%行业、方法和Owner视角。</p></article><article><small>下一升级条件</small><h3>量化Closure＋正式反馈</h3><p>需要系统级闭环结果、Coverage/Regression/Sign-off证据和外部Review共同支持。</p></article></section><div class="profile-grid-v45"><article class="card"><div class="eyebrow">FORMED</div><h3>已经形成</h3><ul>${formed.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="card"><div class="eyebrow">EMERGING</div><h3>正在形成</h3><ul>${emerging.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article><article class="card"><div class="eyebrow">EVIDENCE GAPS</div><h3>升级前必须补齐</h3><ul>${gaps.map(x=>`<li>${esc(x)}</li>`).join('')}</ul></article></div><article class="card learning-rule-v45"><div class="eyebrow">LEARNING RULE</div><h3>工作影响课程，但不统治课程</h3><p>真实工作用于验证迁移、暴露高价值前置缺口和生成Evidence；只有重复、影响交付或高度关联长期目标的问题才进入动态任务。课程主干继续补齐通用SoC系统、Power-state、方法边界、量化Closure和行业判断。</p></article>`
}
function injectPersonalStylesV45(){if(document.getElementById('v45-style'))return;const s=document.createElement('style');s.id='v45-style';s.textContent=`.profile-stage-v45{display:grid;grid-template-columns:repeat(3,1fr);gap:10px;margin-bottom:12px}.profile-stage-v45 article{padding:16px;border:1px solid #31596a;border-radius:12px;background:linear-gradient(145deg,#0b202c,#07141c)}.profile-stage-v45 small{color:var(--muted)}.profile-stage-v45 h3{margin:7px 0}.profile-stage-v45 p,.profile-grid-v45 li,.learning-rule-v45 p{color:var(--muted);line-height:1.7}.profile-grid-v45{display:grid;grid-template-columns:repeat(3,1fr);gap:10px}.profile-grid-v45 ul{padding-left:20px}.learning-rule-v45{margin-top:10px}@media(max-width:900px){.profile-stage-v45,.profile-grid-v45{grid-template-columns:1fr}}`;document.head.appendChild(s)}
