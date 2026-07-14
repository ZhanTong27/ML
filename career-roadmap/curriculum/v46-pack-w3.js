window.LEARNING_PACKS_V46=window.LEARNING_PACKS_V46||{};
window.LEARNING_PACKS_V46.w3={
 title:'Week 3 Learning Pack · UT / ST / FPV / Cosim / IPTEST方法融合',
 objective:'按风险选择验证层级，并判断多种方法是否真正提供独立证据。',
 modes:{
  high:{label:'高压周',hours:'2—3h',items:['完成五方法对比表','为一个Feature分配主方法和辅助方法','完成6题方法边界口试']},
  normal:{label:'正常周',hours:'4—6h',items:['完成方法矩阵和多层Feature方案','分析冲突结果','完成10题口试']},
  deep:{label:'深度周',hours:'8—10h',items:['增加正反Trace和约束审查','让方法学同事Review','一周后完成新Feature变式']}
 },
 materials:[
  {title:'OpenTitan Design Verification Methodology',source:'OpenTitan官方文档',required:true,scope:'重点看不同验证组件、测试、Coverage和系统级环境如何分工。',use:'比较动态仿真和系统验证的证据边界。',url:'https://opentitan.org/book/hw/dv/index.html'},
  {title:'SymbiYosys Documentation',source:'YosysHQ形式化工具官方文档',required:true,scope:'只理解形式化任务、property、assume/assert/cover和反例概念，不要求安装商业工具。',use:'建立FPV能证明什么、依赖哪些约束的基础。',url:'https://symbiyosys.readthedocs.io/en/latest/'},
  {title:'Universal Verification Methodology Standards',source:'Accellera官方入口',required:false,scope:'查UVM环境、sequence、monitor、scoreboard和RAL职责。',use:'明确UT/ST动态仿真中的控制与观察机制。',url:'https://accellera.org/downloads/standards/uvm'}
 ],
 starter:{
  title:'Starter Case：FDD快速跌落检测Feature',
  background:'FDD对模拟输入进行采样；当连续3个样本低于阈值时，应在2个数字周期内置位alarm，通过APB暴露sticky status，并请求系统降频。产品还要求量产时能够注入测试模式。',
  facts:['UT nominal与边界用例均PASS。','FPV在soft reset与第3个低样本同周期时找到反例：alarm可能短暂保持。','Cosim在TT/SS/FF标称Corner均匹配，但行为模型与RTL使用相同阈值舍入公式。','ST中系统降频场景暂时Blocked，因为上游控制器版本未就绪。','IPTEST能够注入alarm，但不能覆盖真实模拟采样路径。','Coverage显示阈值上下1LSB已覆盖，连续样本与reset交叉未覆盖。'],
  questions:['为功能、边界、状态空间、模型真实性、系统联动和量产可测性分配主验证方法。','说明每种方法新增了什么置信度。','判断哪些结果不是独立证据。','定义冲突结果的排查顺序和当前可交付结论。']
 },
 templates:[
  {title:'五方法选择矩阵',content:'| 风险 | UT | ST | FPV | Cosim | IPTEST | 主方法 | 辅助方法 | 关键假设 | 输出证据 |\n|---|---|---|---|---|---|---|---|---|---|'},
  {title:'单Feature多层验证方案',content:'Feature：\n产品/系统风险：\nUT目标与判据：\nFPV property与约束：\nCosim模型与Corner：\nST端到端行为：\nIPTEST可测性：\nCoverage映射：\n方法间不能互相替代的部分：'},
  {title:'证据独立性检查',content:'证据A：\n证据B：\n是否共享同一模型/公式/Stimulus/Observer：\n共同失效模式：\n能够互相补强的部分：\n仍需第三类证据：'},
  {title:'冲突结果处理流程',content:'冲突现象：\n各方法输入假设：\n各方法观察点：\n优先检查约束/模型/接口：\n最小区分实验：\n暂时结论：\n影响的交付门槛：'}
 ],
 answerGuide:{
  checkpoints:['FPV反例直接暴露reset交叉状态问题，不能被UT nominal PASS覆盖。','Cosim与RTL共享舍入公式，意味着它对公式错误缺乏独立性。','IPTEST证明可测入口和数字链路，不证明真实模拟采样行为。','ST Blocked意味着系统降频闭环尚未形成证据，不能宣称系统级完成。','合理分工通常是FPV主责状态空间边界、Cosim主责模拟接口与Corner、ST主责系统因果、IPTEST主责量产可测性。'],
  mistakes:['认为方法越多，置信度必然越高。','把FPV clean解释为系统功能完整。','把Cosim通过解释为数字逻辑和模型都正确。','忽略assumption、Reference Model和观察点是否独立。']
 },
 rubric:[
  {score:1,label:'工具名称级',criteria:'知道五种方法名称，但无法按风险分工。'},
  {score:2,label:'经验匹配级',criteria:'能凭经验选择方法，但不能解释假设和盲区。'},
  {score:3,label:'风险分工级',criteria:'能为主要风险选择主方法、辅助方法和判据。'},
  {score:4,label:'证据审查级',criteria:'能识别共享模型、约束不足和系统Blocked造成的证据弱点。'},
  {score:5,label:'方法Owner级',criteria:'能处理方法冲突、设计第三类证据，并根据成本与最晚暴露点调整方案。'}
 ],
 retest:{due:'2026-08-09前',variant:'将Feature改为异步短Pulse捕获：动态仿真偶尔通过、FPV因约束过强clean、Cosim不相关、ST发现低频目的域丢事件。重新分配方法并解释第一次矩阵为何不能直接复用。',pass:'必须根据数据类型、时钟关系和约束重新选择方法，不得按固定模板套用。'},
 aiPrompt:'你是数字IC验证方法学Reviewer。请基于FDD Starter Case逐题追问UT、ST、FPV、Cosim和IPTEST的主责、假设、盲区和证据独立性。一次只问一题。对我任何“都通过所以可信”的表达继续追问共同失效模式。最后按1—5分Rubric评分。'
};