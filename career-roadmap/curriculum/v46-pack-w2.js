window.LEARNING_PACKS_V46=window.LEARNING_PACKS_V46||{};
window.LEARNING_PACKS_V46.w2={
 title:'Week 2 Learning Pack · Spec→VFL→工作量估算',
 objective:'把测试点清单升级为可解释的范围、依赖、不确定性和资源判断。',
 modes:{
  high:{label:'高压周',hours:'2—3h',items:['完成Top 5 Spec歧义','完成8类工作包粗估','对Top 10测试点做风险分级']},
  normal:{label:'正常周',hours:'4—6h',items:['完成Spec审查表与估算模型','完成资源不足Scope决策','输出一页估算风险说明']},
  deep:{label:'深度周',hours:'8—10h',items:['对估算模型做敏感性分析','邀请主管挑战关键假设','一周后用不同成熟度项目复测']}
 },
 materials:[
  {title:'OpenTitan Hardware IP Documentation',source:'OpenTitan官方IP文档入口',required:true,scope:'观察成熟IP文档如何组织寄存器、接口、状态、错误和验证信息；选择一个IP浏览即可。',use:'识别一份可验证Spec至少应包含哪些层次。',url:'https://opentitan.org/book/hw/ip/index.html'},
  {title:'OpenTitan Design Verification Methodology',source:'OpenTitan官方文档',required:true,scope:'重点看Testplan、Coverage和验证环境与Feature之间的关系。',use:'把Spec问题连接到验证工作量。',url:'https://opentitan.org/book/hw/dv/index.html'},
  {title:'lowRISC Style Guides',source:'lowRISC官方GitHub',required:false,scope:'只查看文档与SystemVerilog表达规范，不要求通读。',use:'理解清晰接口和约束表达如何降低实现与验证歧义。',url:'https://github.com/lowRISC/style-guides'}
 ],
 starter:{
  title:'Starter Case：PMON-Lite验证规划与资源评估',
  background:'PMON-Lite是双通道电源监控IP，支持APB配置、8—64周期采样窗口、阈值比较、sticky alert、soft reset和可选模拟行为模型。已有APB VIP与RAL，但没有独立Reference Model和Coverage。计划由1名验证工程师在6周内完成。',
  facts:['Spec写“告警应尽快产生”，未定义最大延迟。','双通道同时越阈值时，告警优先级未定义。','soft reset是否清除sticky alert存在两处冲突描述。','采样窗口运行中是否允许重配置未说明。','模拟模型预计第4周才交付。','系统集成要求第5周提供一个ST smoke。','团队初始估算为2.5人月，但未拆分环境、Debug、Coverage和Review成本。','可复用内容：APB VIP、RAL、基础Clock/Reset agent；不可复用内容：Reference Model、Checker、Coverage、Cosim接口。'],
  questions:['形成Spec歧义与影响清单。','建立工作包、复杂度、复用度、依赖和缓冲构成的估算模型。','判断6周/1人是否可行。','若资源不增加，提出必须做、可降级、可延期和需升级事项。']
 },
 templates:[
  {title:'Spec审查表',content:'| ID | Spec原句/主题 | 歧义或冲突 | 验证影响 | 设计影响 | 需要谁确认 | 最晚确认时间 | 临时假设 |\n|---|---|---|---|---|---|---|---|'},
  {title:'工作量估算模型',content:'| 工作包 | 基础工作量 | 复杂度系数 | 复用系数 | 依赖系数 | 不确定性缓冲 | Review/Debug成本 | 合计 | 关键假设 |\n|---|---:|---:|---:|---:|---:|---:|---:|---|\n工作包建议：环境接入、Testplan、Case、Model/Checker、Coverage、Regression、Debug、交付。'},
  {title:'Scope四象限',content:'必须做：\n可降级：\n可延期：\n必须升级：\n\n每项说明：对应风险 / 可检测性 / 最晚验证点 / 替代方案 / 残留风险。'},
  {title:'估算假设与敏感性',content:'最敏感的三个假设：\n1. \n2. \n3. \n\n若假设变差20%，总量如何变化：\n最容易被低估的工作包：\n可以通过复用或并行降低的工作包：'}
 ],
 answerGuide:{
  checkpoints:['“测试点数量”不能直接代表工作量，环境、Model、Coverage、Debug和交付常是隐藏成本。','模拟模型第4周交付会把Cosim风险推迟到后半程，应单列依赖和缓冲。','第5周ST smoke与第4周模型交付形成关键路径，必须在估算中显式体现。','1人6周是否可行不能只看总人月，还要看并行性、Review等待和关键依赖。','Scope取舍应保护最高风险和最晚才能暴露的问题，而不是平均删除测试点。'],
  mistakes:['用统一“每个case几天”估算全部工作。','把可复用环境等同于无需接入和验证。','只给总人月，不列假设和风险缓冲。','资源不足时按比例砍所有模块。']
 },
 rubric:[
  {score:1,label:'清单级',criteria:'只能列测试点和总工期。'},
  {score:2,label:'工作包级',criteria:'能拆工作包，但系数、依赖和缓冲缺少依据。'},
  {score:3,label:'可解释估算',criteria:'估算能追溯到工作包、复用和不确定性，并给出基本Scope建议。'},
  {score:4,label:'资源决策',criteria:'能识别关键路径、敏感假设和资源不足下的风险优先级。'},
  {score:5,label:'动态估算',criteria:'能根据Spec成熟度、依赖变化和Review反馈实时更新估算与交付方案。'}
 ],
 retest:{due:'2026-08-02前',variant:'同一PMON-Lite项目改为Spec已成熟、模拟模型可复用，但增加三种PVT Corner和硅后IPTEST要求。重新估算并比较与第一次的差异。',pass:'必须说明哪些工作量下降、哪些上升，以及关键路径如何变化。'},
 aiPrompt:'你是验证项目估算Reviewer。请基于PMON-Lite Starter Case逐步挑战我的Spec问题清单、工作包估算和Scope决策。一次只问一题，不给标准答案。重点追问假设、复用、依赖、关键路径和风险缓冲。最后按1—5分Rubric评分。'
};