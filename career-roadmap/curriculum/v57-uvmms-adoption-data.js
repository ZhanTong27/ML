window.UVMMS_ADOPTION_V57={
 id:'uvmms-adoption-program-v57',
 title:'UVM-MS 方法学引入与数模验证资产复用试点',
 shortTitle:'UVM-MS 方法学试点',
 status:'baseline_collecting',
 currentGate:'gate0',
 currentConclusion:'存在评估价值，尚无工具、A/B或团队提效证据。',
 objective:'验证 UVM-MS 能否降低数模验证中的模型切换、重复连接、测试重写和长期维护成本，并形成可被其他成员复用的方法学资产。',
 coreQuestion:'当前数模验证在不同模型表示接入、接口刺激监控和验证资产复用方面，是否存在可量化且值得通过标准化架构解决的重复开发成本？',
 hypothesis:'在保持 MS Proxy API 稳定的情况下，将模型表示差异隔离在 Bridge Core，可以减少 sequence、test、monitor、scoreboard 和 coverage 在模型切换时的修改范围。',
 currentActions:[
  '选择一个使用真实工具链、但不影响正式交付的窄接口作为试点对象。',
  '记录现有方案的接入流程、修改文件、工时和模型切换方式。',
  '确认仿真器版本、现有 UVM 框架和编译流程对最小 UVM-MS 链路的支持。'
 ],
 boundaries:[
  'UVM-MS 负责结构统一、接口标准化和验证资产复用，不自动生成或校准模拟模型。',
  'SV-RNM 的主要收益是数字事件驱动下的回归吞吐，不能把其速度收益归入 UVM-MS。',
  '模型合同负责行为定义、有效范围、精度、校准和验收，可能比框架本身更先产生收益。',
  '试点不得影响当前正式项目交付；工具或复用假设不成立时允许停止。'
 ],
 organization:[
  {id:'sponsor',label:'Sponsor',value:'待确认',note:'允许有限试点并帮助协调资源的人'},
  {id:'technicalPartner',label:'技术协作人',value:'待确认',note:'熟悉现有 UVM、AMS 或工具链的同事'},
  {id:'decisionOwner',label:'采用决策人',value:'待确认',note:'决定采用、有限采用或停止的人'},
  {id:'weeklyBudget',label:'每周投入上限',value:'待确认',note:'与当前交付隔离的明确时间预算'},
  {id:'protectedDelivery',label:'不得影响的交付',value:'当前正式验证任务',note:'试点发生冲突时优先保障正式交付'}
 ],
 gates:[
  {
   id:'gate0',index:'G0',title:'基线与启动授权',state:'active',
   question:'当前痛点是否真实存在，并且是否获得有限试点空间？',
   deliverables:[
    {id:'g0-problem',title:'当前问题与重复工作清单'},
    {id:'g0-architecture',title:'现有环境与模型切换架构图'},
    {id:'g0-baseline',title:'现有方案工时、修改范围和复用基线'},
    {id:'g0-scope',title:'试点接口、时间预算与正式交付边界'},
    {id:'g0-sponsor',title:'Sponsor、协作人和采用决策人确认'},
    {id:'g0-stop',title:'成功标准与停止条件'}
   ],
   pass:'确认当前存在值得解决的模型切换或重复连接成本，并获得不影响正式交付的有限试点授权。'
  },
  {
   id:'gate1',index:'G1',title:'最小技术可行性',state:'not_started',
   question:'最小 Proxy—Bridge—Bridge Core 链路能否在真实工具链中稳定运行？',
   deliverables:[
    {id:'g1-agent',title:'最小 Agent、transaction、driver 与 monitor'},
    {id:'g1-proxy',title:'MS Proxy API 与 MS Bridge'},
    {id:'g1-core',title:'一个可运行的 Bridge Core'},
    {id:'g1-tests',title:'3—5 个自检测试与 scoreboard'},
    {id:'g1-tool',title:'编译、elaboration、波形和调试记录'},
    {id:'g1-limit',title:'工具限制与技术可行性结论'}
   ],
   pass:'最小链路在公司真实仿真器、UVM 框架和编译入口中稳定运行，且调试成本可接受。'
  },
  {
   id:'gate2',index:'G2',title:'双模型与 A/B 评估',state:'not_started',
   question:'模型差异能否主要隔离在 Bridge Core，并比现有方案减少重复修改？',
   deliverables:[
    {id:'g2-second-core',title:'第二个模型表示对应的 Bridge Core'},
    {id:'g2-common-tests',title:'同一批测试在两种表示下运行'},
    {id:'g2-change-audit',title:'修改文件、代码行和配置变更审计'},
    {id:'g2-reuse',title:'Test、Checker 与 Coverage 复用统计'},
    {id:'g2-ab',title:'现有方案与 UVM-MS 方案 A/B 数据'},
    {id:'g2-attribution',title:'UVM-MS、RNM 与模型合同收益归因'}
   ],
   pass:'能够用可复查数据说明哪些资产被复用、哪些仍需重写、收益来自哪里，以及方法学适用范围。'
  },
  {
   id:'gate3',index:'G3',title:'团队复用与采用决策',state:'not_started',
   question:'另一名工程师或另一个模块能否以更低成本复用该方案？',
   deliverables:[
    {id:'g3-second-user',title:'第二名工程师或第二个模块试用'},
    {id:'g3-template',title:'Proxy、Bridge、Bridge Core 与检查模板包'},
    {id:'g3-guide',title:'接入说明、常见问题与调试路径'},
    {id:'g3-contract',title:'模型合同与相关性测试模板'},
    {id:'g3-decision',title:'使用／不使用 UVM-MS 的决策矩阵'},
    {id:'g3-report',title:'采用、有限采用或停止的最终报告'}
   ],
   pass:'由非作者或新场景完成复用，并形成 adopted、limited_adoption 或 stopped 的明确工程决策。'
  }
 ],
 metrics:[
  {id:'current-first-integration',label:'现有方案首次接入工时',unit:'人时',group:'成本',reason:'建立真实基线，不能用主观感受代替。'},
  {id:'uvmms-first-integration',label:'UVM-MS 首次接入工时',unit:'人时',group:'成本',reason:'单独记录首次学习和框架搭建成本。'},
  {id:'second-model-integration',label:'第二模型接入工时',unit:'人时',group:'成本',reason:'这是验证抽象切换价值的核心指标。'},
  {id:'changed-files',label:'模型切换修改文件数',unit:'个',group:'变更范围',reason:'判断变化是否被隔离在 Bridge 与配置层。'},
  {id:'test-reuse',label:'Test 无修改复用比例',unit:'%',group:'复用',reason:'验证上层验证意图能否跨模型复用。'},
  {id:'checker-coverage-reuse',label:'Checker／Coverage 核心逻辑复用',unit:'定性+比例',group:'复用',reason:'避免只复用 driver，却重写检查体系。'},
  {id:'second-user-first-pass',label:'第二工程师首个测试通过时间',unit:'人时',group:'团队',reason:'排除作者优势，验证团队接入成本。'},
  {id:'framework-maintenance',label:'新增框架代码量与维护问题数',unit:'行／项',group:'负向成本',reason:'提效必须同时扣除架构复杂度和维护负担。'}
 ],
 attribution:[
  {id:'uvmms',title:'UVM-MS 架构收益',items:['统一 Proxy 与 Bridge 分层','降低模型表示切换的上层改动','复用 sequence、test、checker 和 coverage','形成跨模块的接口与模板规范']},
  {id:'rnm',title:'SV-RNM 收益',items:['数字事件驱动下的仿真速度','扩大随机回归规模','提高单位时间回归吞吐','更容易接入数字验证流程']},
  {id:'contract',title:'模型合同收益',items:['明确行为定义和有效范围','统一数值与时间容差','减少模型与设计责任争议','建立 RNM、Verilog-A 与网表相关性']}
 ],
 stopConditions:[
  '当前工具版本无法稳定支持关键 UVM-MS 结构，且没有可接受的替代路径。',
  '主要瓶颈被证明来自模型交付或模型准确性，而不是连接架构与资产复用。',
  'Bridge API 无法覆盖主要接口，或上层 test、checker 仍需大面积重写。',
  '首次与长期维护成本明显高于可以避免的重复开发成本。',
  '试点开始影响当前正式项目交付或占用不可接受的团队资源。'
 ],
 evidenceLevels:[
  {id:'level1',level:'L1',title:'问题识别',claim:'已识别数模验证资产复用问题，并提出 UVM-MS 试点假设。',defaultDone:true},
  {id:'level2',level:'L2',title:'技术验证',claim:'在真实工具链中完成可运行的最小 UVM-MS 原型。',defaultDone:false},
  {id:'level3',level:'L3',title:'工程判断',claim:'完成双模型与 A/B 对照，得到适用范围和收益归因。',defaultDone:false},
  {id:'level4',level:'L4',title:'团队复用',claim:'另一名工程师或另一个模块完成模板复用。',defaultDone:false},
  {id:'level5',level:'L5',title:'方法学影响',claim:'形成团队模板、决策规范或正式采用结论。',defaultDone:false}
 ],
 currentClaim:'当前可证明：完成问题识别和试点设计。尚不能声称已引入 UVM-MS、已经团队采用或已经产生提效。',
 decisionStates:[
  {id:'adopted',label:'adopted',text:'在目标模块类型中正式采用并维护。'},
  {id:'limited_adoption',label:'limited adoption',text:'仅在多模型切换或跨项目复用价值明确的模块中采用。'},
  {id:'stopped',label:'stopped',text:'数据证明收益不足或工具限制不可接受，停止推广。'}
 ]
};
