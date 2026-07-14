window.LEARNING_PACKS_V46=window.LEARNING_PACKS_V46||{};
window.LEARNING_PACKS_V46.w1={
 title:'Week 1 Learning Pack · 验证闭环与Owner基线',
 objective:'把“用例通过”升级为可审计的风险闭环与交付判断。',
 modes:{
  high:{label:'高压周',hours:'2—3h',items:['完成Feature→Risk→Check→Evidence四段','完成15分钟Owner口试','记录一条真实工作迁移']},
  normal:{label:'正常周',hours:'4—6h',items:['完成闭环图与Closure台账','完成Owner口试并自评','整理一页导师Review材料']},
  deep:{label:'深度周',hours:'8—10h',items:['完成全部任务与示例修订','邀请导师或主管Review','一周后完成陌生变式复测']}
 },
 materials:[
  {title:'OpenTitan Design Verification Methodology',source:'OpenTitan官方文档',required:true,scope:'重点看验证计划、环境、检查、Coverage和回归如何组成闭环；不需要阅读具体IP实现。',use:'建立Spec→Risk→Stimulus→Check→Coverage→Sign-off结构。',url:'https://opentitan.org/book/hw/dv/index.html'},
  {title:'Universal Verification Methodology Standards',source:'Accellera官方入口',required:false,scope:'只作为UVM术语与职责边界参考，不要求重新学习UVM基础。',use:'确认Driver、Monitor、Scoreboard、RAL在证据链中的职责。',url:'https://accellera.org/downloads/standards/uvm'},
  {title:'IEEE 1800.2 UVM Standard',source:'IEEE标准页面',required:false,scope:'仅在术语或机制有争议时查阅。',use:'正式标准索引，不作为主教材。',url:'https://standards.ieee.org/ieee/1800.2/7323/'}
 ],
 starter:{
  title:'Starter Case：AMON双通道自适应监控IP',
  background:'AMON通过APB配置两个监控通道，在16周期窗口内测量输入事件数；超过阈值后置位sticky status、产生interrupt，并通过串行接口发送结果。环境已有APB VIP、RAL和基础Monitor。',
  facts:['Feature共8项：CSR配置、启动测量、16周期窗口、阈值告警、sticky status/interrupt、串行发送、soft reset、双通道。','18/18定向用例PASS。','Requirement closure为82%，未闭合项集中在soft reset期间在途发送和双通道同时告警。','Functional coverage为89%，一个Cross从未命中。','Nightly最近10次有1次超时，尚未稳定复现。','存在2个Known issue：一个文档歧义，一个环境Model与DUT使用同一公式。','当前Deadline要求本周给出交付建议。'],
  questions:['画出AMON的风险驱动验证闭环。','建立Closure台账并区分数量、质量和剩余风险。','给出Go、Conditional Go或No-go建议。','列出必须升级给设计、系统或主管的事项。']
 },
 templates:[
  {title:'风险驱动验证闭环图模板',content:'目标/Feature：\n业务或产品风险：\n设计失效模式：\nStimulus/场景：\nChecker/Assertion：\nCoverage：\nRegression证据：\n剩余风险：\nSign-off门槛：\n贡献边界/外部依赖：'},
  {title:'Closure台账模板',content:'| ID | Requirement/Risk | Test状态 | Check证据 | Coverage | Bug/Known issue | Owner | 下一动作 | 截止条件 | 交付影响 |\n|---|---|---|---|---|---|---|---|---|---|'},
  {title:'Go / No-go决策备忘录',content:'结论：Go / Conditional Go / No-go\n已确认事实：\n关键未知：\nTop 3剩余风险：\n风险可检测性与最晚解决点：\n必要条件/限制：\n升级对象：\n下一次复核时间：'},
  {title:'导师Review记录',content:'Reviewer：\n日期：\n团队最看重的三项完成证据：\n我可以独立决定的范围：\n必须升级的范围：\n被挑战的假设：\n本周标准修订：\n下一次实践机会：'}
 ],
 answerGuide:{
  checkpoints:['18/18 PASS只能证明已执行用例通过，不能替代Requirement closure、Coverage、回归稳定性和Model独立性。','Requirement closure 82%且两个高价值场景未闭合，不能直接宣称完整Sign-off。','Model与DUT共享公式削弱证据独立性，需要其他Reference或端到端结果补强。','一次Nightly超时必须先分类为DUT、环境、flaky或unknown，不能简单忽略。','较稳妥的建议通常是Conditional Go，并明确关闭条件、Owner和最晚复核点。'],
  mistakes:['把用例通过率直接当验证完成度。','只列问题，不说明交付影响和下一动作。','所有未覆盖项都要求补测，没有区分风险价值。','使用“基本完成”“问题不大”等不可审计措辞。']
 },
 rubric:[
  {score:1,label:'概念复述',criteria:'只能列Test、Coverage、Bug等名词，不能建立因果和交付关系。'},
  {score:2,label:'局部完整',criteria:'能填写模板，但风险、证据和决策之间关联较弱。'},
  {score:3,label:'基本Owner判断',criteria:'能区分事实、未知和风险，给出基本合理的Conditional Go条件。'},
  {score:4,label:'证据驱动',criteria:'能审查Model独立性、回归稳定性和未闭合项价值，并明确责任边界。'},
  {score:5,label:'可迁移Owner能力',criteria:'能在新条件下调整决策，主动提出反证、最晚解决点和替代方案。'}
 ],
 retest:{due:'2026-07-26前',variant:'将AMON改为三通道；所有Requirement已覆盖，但97% Coverage主要来自低价值Cross，并发现一个低概率双通道错序。重新做Sign-off判断。',pass:'不得沿用第一次结论；必须根据风险价值、可检测性和最晚解决点重新排序。'},
 aiPrompt:'你是我的IP验证Owner口试官。请基于AMON Starter Case一次只问一题。先检查我能否区分Test Pass、Requirement closure、Coverage、Bug、Known issue和Model可信度，再追问Go/Conditional Go/No-go。不要提前给答案。最后按1—5分Rubric评分，并指出一周后变式复测应重点检查什么。'
};