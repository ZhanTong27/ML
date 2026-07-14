window.LEARNING_PACKS_V46=window.LEARNING_PACKS_V46||{};
window.LEARNING_PACKS_V46.w4={
 title:'Week 4 Learning Pack · 复杂Debug与环境可信度',
 objective:'用假设树、最小实验和环境自证区分DUT、Spec、Model、环境和时序根因。',
 modes:{
  high:{label:'高压周',hours:'2—3h',items:['完成五类假设树','设计Top 2最小实验','完成20分钟陌生案例']},
  normal:{label:'正常周',hours:'4—6h',items:['完成完整证据链与环境清单','完成混合根因案例','提出一个预防性检查']},
  deep:{label:'深度周',hours:'8—10h',items:['执行全部正反实验推演','让Reviewer复核首次有效分叉点','一周后完成新的双根因变式']}
 },
 materials:[
  {title:'Verilator Warnings Guide',source:'Verilator官方文档',required:true,scope:'浏览与宽度、未初始化、时序和结构有关的warning类别；重点学习warning如何成为排查入口。',use:'训练从工具信号建立候选，而不是直接把warning当根因。',url:'https://verilator.org/guide/latest/warnings.html'},
  {title:'lowRISC SystemVerilog Style Guide',source:'lowRISC官方GitHub',required:true,scope:'重点查看Reset、时序逻辑、位宽与可读性相关规则。',use:'理解哪些编码和接口习惯能减少X传播、位宽和状态问题。',url:'https://github.com/lowRISC/style-guides'},
  {title:'OpenTitan Design Verification Methodology',source:'OpenTitan官方文档',required:false,scope:'查环境、Scoreboard、Coverage和回归职责。',use:'设计环境自检与预防性机制。',url:'https://opentitan.org/book/hw/dv/index.html'}
 ],
 starter:{
  title:'Starter Case：随机时钟切换后的超时与X传播',
  background:'一个双时钟监控IP在nightly随机场景中偶发超时。测试会在运行中切换source clock，并可能在切换附近触发局部reset。最终software-visible status保持busy，串行输出出现X。',
  facts:['强制固定source clock后100次未复现。','时钟MUX select在源时钟边沿前后1个周期内更新。','设计文档只写“支持动态切换”，未给无毛刺前置条件。','行为Model在reset释放后延迟2周期初始化。','Scoreboard在局部reset时不会清空pending transaction。','busy首次异常出现在串行输出X之前约20周期。','一次波形显示Clock gate enable保持开启，但MUX输出少了一个脉冲。','编译存在一个位宽截断warning，位置在状态回读路径。'],
  questions:['分别建立DUT、Spec、Model、环境和时序五类假设。','识别首次异常与后续传播结果。','设计能够区分Top 3候选的最小实验。','提出环境自证、预防性Checker或Assertion。']
 },
 templates:[
  {title:'Debug证据链',content:'首次可观察异常：\n最终失败：\n时间差：\nDUT候选：\nSpec候选：\nModel候选：\n环境候选：\n时序/仿真假设候选：\n已排除：\n未排除：\n当前最强证据：'},
  {title:'最小实验矩阵',content:'| 实验 | 只改变什么 | 保持什么不变 | 候选A预期 | 候选B预期 | 观察点 | 停止条件 | 结果解释 |\n|---|---|---|---|---|---|---|---|'},
  {title:'环境可信度清单',content:'输入是否可控：\n输出是否独立可见：\nReference Model是否独立：\nClock/Reset时间基准是否一致：\nScoreboard/Monitor reset行为：\nforce/release生命周期：\n随机seed与复现条件：\nX和warning处理策略：\n环境自检结果：'},
  {title:'预防性机制',content:'问题类别：\n更早检查点：\nChecker/Assertion/环境自检：\n触发条件：\n避免误报的边界：\nRegression加入方式：\n是否需要Spec修订：'}
 ],
 answerGuide:{
  checkpoints:['busy异常早于串行X约20周期，串行X更可能是传播结果而不是首次异常。','固定source clock不复现支持时钟切换相关候选，但不能单独证明DUT有bug。','Spec未定义无毛刺切换条件，可能是Spec缺口、测试非法或设计鲁棒性问题，必须先确认契约。','Scoreboard未清pending可制造环境假失败，但无法解释MUX输出缺脉冲，需要分别验证是否存在双根因。','Model延迟初始化可能解释部分X，但应通过绕开Model或使用独立观察点区分。','位宽warning位于状态回读路径，应检查但不能因为存在warning就认定它解释时钟缺脉冲。'],
  mistakes:['从最终X开始反向猜测，忽略首次异常。','一次只保留一个根因候选，过早收敛。','同时修改多个条件，导致实验无法区分假设。','发现环境问题后就停止，不再检查DUT是否还有独立问题。']
 },
 rubric:[
  {score:1,label:'现象追踪',criteria:'只能描述波形和最终错误。'},
  {score:2,label:'多候选',criteria:'能列多个候选，但实验同时改变多个变量。'},
  {score:3,label:'证据链',criteria:'能识别首次异常并设计基本最小实验。'},
  {score:4,label:'环境自证',criteria:'能分别证明或推翻DUT、Spec、Model和环境候选，并处理双根因。'},
  {score:5,label:'预防与迁移',criteria:'能形成更早检测机制，并在陌生时钟/Reset/X场景中稳定复用方法。'}
 ],
 retest:{due:'2026-08-16前',variant:'新案例中时钟稳定，但soft reset后第二次启动失败；DUT状态已清零，Monitor丢失reset事件，Reference Model保留上次累计值，同时存在一个真实W1C竞争问题。识别双根因并设计最小实验。',pass:'必须同时保留环境和DUT候选，并证明两个问题如何独立影响结果。'},
 aiPrompt:'你是高级验证Debug Reviewer。请基于随机时钟切换Starter Case，让我先陈述首次异常、五类候选和Top 3实验。一次只问一题，不允许我直接跳到根因。重点追问实验是否只改变一个变量、证据是否能区分候选、是否存在双根因。最后按1—5分Rubric评分。'
};