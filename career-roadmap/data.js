const CAREER_OS_VERSION = '2.2';

const ABILITY_LEVELS = [
  '尚未展开','初步理解','能够在提示下完成','能够独立完成','能够处理复杂情况','能够形成方法并指导他人'
];

const DEFAULT_ABILITIES = [
  {id:'spec',name:'Spec理解',status:'初步理解',level:2,signal:'能够从触发、状态、结果和异常路径拆解功能，但系统影响仍需积累。',next:'在新功能接入时独立形成边界、功能树和Top问题清单。',opportunity:'当前工作可持续观察'},
  {id:'strategy',name:'验证计划与策略',status:'能够在提示下完成',level:3,signal:'已能从功能列表转向功能—风险—检查闭环。',next:'为复杂功能独立完成风险排序与sign-off标准。',opportunity:'需要结合真实任务'},
  {id:'debug',name:'Debug与根因定位',status:'能够在提示下完成',level:3,signal:'可以追踪现象并完成排查，但候选假设和最小实验仍需强化。',next:'连续两次独立形成“预期—首次异常—假设—证据—根因”链路。',opportunity:'当前周期重点'},
  {id:'uvm',name:'UVM与验证环境',status:'初步理解',level:2,signal:'Agent代码可用，环境组件关系与复用假设需要继续校准。',next:'不看代码说明完整数据流，并独立审查一条model/checker链路。',opportunity:'个人环境受限'},
  {id:'check',name:'Checker / Model / Assertion / Coverage',status:'初步理解',level:2,signal:'能够区分基本职责，Assertion正反测试经验不足。',next:'完成一条规则的自然语言、时序、property与正反测试。',opportunity:'可用AI与纸笔训练'},
  {id:'soc',name:'SoC系统理解',status:'初步理解',level:2,signal:'正在从寄存器行为走向跨IP状态和异常传播。',next:'对一个真实任务说清上下游、系统条件和故障传播路径。',opportunity:'需要项目机会'},
  {id:'lowpower',name:'低功耗验证',status:'尚未展开',level:1,signal:'作为第二技术标签保留，尚缺真实项目证据。',next:'建立power domain、isolation、retention与power state基础框架。',opportunity:'等待合适项目'},
  {id:'tools',name:'Linux / Verdi / 脚本与自动化',status:'初步理解',level:2,signal:'工具熟练度仍影响定位和效率。',next:'每周沉淀一个可迁移命令、脚本或波形分析方法。',opportunity:'需结合公司环境'},
  {id:'delivery',name:'交付与风险管理',status:'能够在提示下完成',level:3,signal:'能够按时完成明确任务，正在建立任务拆解和风险台账。',next:'独立管理一块交付的标准、依赖、风险和升级条件。',opportunity:'当前阶段关键'},
  {id:'communication',name:'技术表达与协作',status:'能够在提示下完成',level:3,signal:'愿意暴露不懂并主动确认，表达结构可继续提升。',next:'连续使用15分钟Review结构，获得可执行反馈并闭环。',opportunity:'每周可实践'}
];

const LEARNING_WEEKS = [
  {
    id:'w1',dates:'07.13—07.19',title:'工作流与Debug基线',
    shift:'从沿信号追踪，转向用假设和证据定位根因',
    focus:['个人验证工作流','验证闭环','Debug证据链'],reviewer:'带教导师 · 15分钟',
    observations:['今天的任务最终交付和最大风险是什么？','定位过程中哪一步最没有效率？','类似跨模块问题应先确认哪三类信息？'],
    gates:['不看代码画出验证闭环','完成1份可复现Debug复盘','完成1次AI口试且核心项≥3分','获得1条可执行导师反馈'],
    tasks:[
      {id:'w1-map',priority:'core',kind:'学习',title:'任务—能力映射',time:'周一晚 · 45–60min',env:'纸笔 / 文档',steps:['写清最终交付与本周风险','区分知识、工具、经验和沟通缺口','只选两项本周训练能力'],output:'1张脱敏任务卡',pass:'3分钟说清本任务要重新证明哪些假设',fallback:'只完成最终交付、最大风险、一个能力缺口'},
      {id:'w1-loop',priority:'core',kind:'自测',title:'关闭资料画验证闭环',time:'灵活早晨 · 45min',env:'纸笔 / AI',steps:['画输入→激励→DUT→monitor→model→checker→coverage','标记每段输入输出与可能错误','查一次资料后重新闭卷画'],output:'1张通用验证闭环图',pass:'能解释expected来源、比较位置与reset处理',fallback:'只画model到checker链路'},
      {id:'w1-debug',priority:'core',kind:'练习',title:'重做一份Debug复盘',time:'周三晚 · 60–90min',env:'文档 / AI',steps:['写预期、实际和首次异常','区分DUT/model/environment','列3个候选假设及反证实验','总结如何把检查前移'],output:'1份脱敏Debug案例',pass:'别人能复现你的排除逻辑',fallback:'只完成首次异常、3个假设和根因'},
      {id:'w1-oral',priority:'regular',kind:'自测',title:'AI口头Debug测试',time:'周四晚 · 20min',env:'AI口试',steps:['只描述通用抽象场景','让AI逐题追问而非直接给答案','记录结构、因果、证据、效率和迁移评分'],output:'口试评分与卡点',pass:'五项均≥3分',fallback:'只完成10分钟解释测试'},
      {id:'w1-review',priority:'regular',kind:'反馈',title:'导师技术Review',time:'本周 · 15min',env:'导师 / 主管',steps:['1分钟背景、3分钟定位、3分钟不足','只问两个准备好的问题','会后立刻写一句评价和一个动作'],output:'导师反馈记录',pass:'反馈被转化成下一次行动',fallback:'异步发一页复盘'},
      {id:'w1-flow',priority:'optional',kind:'方法',title:'建立个人验证工作流V1',time:'周末 · 3–4h',env:'文档',steps:['拆任务澄清到sign-off十个阶段','每阶段写输入、动作、输出、错误和标准','标记需要找谁确认'],output:'个人验证工作流V1',pass:'能用于下一个新IP',fallback:'先完成前五个阶段'}
    ]
  },
  {
    id:'w2',dates:'07.20—07.26',title:'环境复用与Spec接入',
    shift:'从旧环境能运行，转向重新证明设计和model假设',
    focus:['复用检查','Spec结构化','Corner六维变换'],reviewer:'直属主管 · 15分钟',
    observations:['新Spec到达后24小时内是否形成边界和问题清单？','旧环境中的哪些假设需要重新证明？','接触跨IP前最应先确认什么？'],
    gates:['完成环境复用检查','新spec形成结构化理解','10个corner中5个说清价值','获得主管对成长重点的判断'],
    tasks:[
      {id:'w2-reuse',priority:'core',kind:'学习',title:'八项环境复用检查',time:'周一晚 · 60min',env:'文档 / AI',steps:['检查接口、寄存器、clock/reset、状态、时序、model、coverage和系统条件','每项标记已确认/未确认/不适用','禁止写“应该没问题”'],output:'环境复用检查表',pass:'未确认项都有确认对象和截止时间',fallback:'先做model、时序和系统条件'},
      {id:'w2-recall',priority:'core',kind:'自测',title:'关闭资料复述一个功能',time:'灵活早晨 · 45min',env:'纸笔 / AI',steps:['写触发、前置状态、状态变化、结果、标志、错误与恢复','列3个答不上来的问题','回到资料验证'],output:'功能路径卡',pass:'因果链完整且无模糊词',fallback:'只做触发—状态—结果'},
      {id:'w2-model',priority:'core',kind:'练习',title:'Checker / Model审查',time:'周三晚 · 60min',env:'抽象案例 / AI',steps:['追expected规则来源','检查输入、状态、延迟和reset','安全改变一个预期条件','观察并判断model错误'],output:'Model审查清单',pass:'能区分model和DUT错误',fallback:'只审查一条expected链路'},
      {id:'w2-corner',priority:'regular',kind:'自测',title:'Corner六维变换',time:'周四晚 · 60min',env:'纸笔 / AI',steps:['从数值、时间、状态、组合、异常、恢复生成候选','写违反假设、激励、检查与价值','按影响×可能性×检查缺口排序'],output:'10个候选corner',pass:'至少5个说清检查方式与价值',fallback:'每维生成1个'},
      {id:'w2-review',priority:'regular',kind:'反馈',title:'主管成长Review',time:'本周 · 15min',env:'主管',steps:['汇报交付、方法和缺口','询问下一阶段能力重点','只记录通用反馈'],output:'下一阶段重点',pass:'得到一个明确改进方向',fallback:'5分钟即时沟通'},
      {id:'w2-script',priority:'optional',kind:'方法',title:'沉淀一个通用工具动作',time:'周末 · 45min',env:'个人电脑 / 文档',steps:['选择一个Linux、脚本或波形分析动作','写清输入、命令、输出和常见错误','用抽象数据复现'],output:'工具卡片V1',pass:'一周后不看资料仍能复现',fallback:'只完成命令与解释'}
    ]
  },
  {
    id:'w3',dates:'07.27—08.02',title:'从Spec到验证策略',
    shift:'从功能列表和用例，转向功能—风险—检查闭环',
    focus:['风险映射','Assertion入门','Corner价值判断'],reviewer:'带教导师 · 15分钟',
    observations:['主要功能是否具备风险映射？','最高风险的遗漏是什么？','哪些corner没有价值？'],
    gates:['主要功能具备风险映射','说清三类检查工具边界','第一条assertion完成正反测试','导师遗漏项进入计划'],
    tasks:[
      {id:'w3-map',priority:'core',kind:'学习',title:'功能—风险—验证映射',time:'周一晚 · 60–90min',env:'文档 / AI',steps:['列前置状态与风险','选择stimulus、checker、assertion和coverage','标记无法确认的系统假设'],output:'验证策略映射表',pass:'不再只写“写一个用例”',fallback:'只做Top5功能'},
      {id:'w3-boundary',priority:'core',kind:'学习',title:'Checker / Assertion / Coverage边界',time:'灵活早晨 · 45min',env:'AI口试',steps:['各用一句话定义职责','为3条规则选择机制','让AI追问理由'],output:'检查机制决策卡',pass:'能说明Coverage为何不证明正确性',fallback:'只比较Assertion和Checker'},
      {id:'w3-sva',priority:'core',kind:'练习',title:'第一条Assertion正反测试',time:'周三晚 · 60–90min',env:'纸笔 / 开源环境',steps:['自然语言写规则并画时序','明确采样clock和reset','转成property','制造违反与合法边界'],output:'正反测试Assertion',pass:'该报能报、合法不误报、语义可解释',fallback:'先完成自然语言和时序图'},
      {id:'w3-oral',priority:'regular',kind:'自测',title:'AI Spec分析口试',time:'周四晚 · 20min',env:'AI口试',steps:['使用抽象功能','回答边界、状态、时序、异常、恢复和检查','记录四项评分'],output:'口试评分',pass:'四项均≥3分',fallback:'10分钟功能—风险解释'},
      {id:'w3-review',priority:'regular',kind:'反馈',title:'导师验证策略Review',time:'本周 · 15min',env:'导师',steps:['准备一页映射','确认最高风险遗漏','删除低价值corner'],output:'策略修订记录',pass:'删一个低价值项并补一个高风险项',fallback:'只看Top5风险'},
      {id:'w3-retro',priority:'optional',kind:'方法',title:'验证策略复盘',time:'周末 · 2–3h',env:'文档',steps:['记录被推翻的理解','区分功能、状态、环境和model风险','总结如何更早发现'],output:'验证策略复盘V1',pass:'形成可迁移方法',fallback:'只写3个被推翻假设'}
    ]
  },
  {
    id:'w4',dates:'08.03—08.09',title:'复杂交付与准负责人意识',
    shift:'从完成个人任务，转向提高一块交付的确定性',
    focus:['任务拆解','风险台账','月度复盘'],reviewer:'直属主管 · 15分钟',
    observations:['任务是否有明确完成标准、依赖与风险owner？','Top风险是否有升级条件？','如果获得更大scope，最可能失败在哪里？'],
    gates:['任务具有标准和风险owner','Top5风险有升级条件','完成60分钟交付模拟','四周关键结果达到预期'],
    tasks:[
      {id:'w4-break',priority:'core',kind:'学习',title:'任务拆解与风险台账',time:'周一晚 · 60min',env:'文档',steps:['拆功能、未知项、环境/model、用例、assertion、coverage、回归、bug和sign-off','写状态、标准、依赖与截止时间','设升级条件'],output:'任务与风险台账',pass:'能向主管清晰同步',fallback:'只做Top5风险'},
      {id:'w4-risk',priority:'core',kind:'自测',title:'风险排序闭卷测试',time:'灵活早晨 · 45min',env:'纸笔 / AI',steps:['选Top5风险','判断影响、检测、最晚解决点、owner和升级条件','回到资料校正'],output:'Top5风险判断',pass:'理由清楚且能被挑战',fallback:'只做Top3'},
      {id:'w4-sim',priority:'core',kind:'自测',title:'60分钟完整交付模拟',time:'周三晚 · 60min',env:'AI / 文档',steps:['10分钟功能结构','10分钟未知项','15分钟corner','10分钟检查','10分钟coverage','5分钟sign-off'],output:'抽象功能验证策略',pass:'时间内形成闭环',fallback:'只完成前四步'},
      {id:'w4-evidence',priority:'regular',kind:'方法',title:'整理四类成长记录',time:'周四晚 · 60min',env:'网站 / AI',steps:['分类技术、交付、反馈和方法资产','由AI判断记录质量','只保留脱敏内容'],output:'月度成长包',pass:'至少3条具备真实应用或反馈',fallback:'Debug、交付和反馈各1条'},
      {id:'w4-review',priority:'regular',kind:'反馈',title:'主管月度成长Review',time:'本周 · 15min',env:'主管',steps:['汇报交付、方法、缺口和scope','只问一个最大风险','反馈转成下月目标'],output:'下月能力目标',pass:'获得明确担忧或任务范围',fallback:'异步五行总结'},
      {id:'w4-month',priority:'optional',kind:'方法',title:'月度四指标复盘',time:'周末 · 2h',env:'AI / 网站',steps:['检查计划完成、自测通过、工作转化和记录充分度','区分能力不足与机会不足','决定下月增删内容'],output:'可导出月报',pass:'能决定下月调整',fallback:'只完成四指标与一个调整'}
    ]
  }
];

const CAREER_STAGES = [
  {id:'s1',index:'01',range:'2026—2027',title:'可靠的IP Owner',active:true,items:['独立交付复杂IP','补齐Linux、Verdi与Debug','从寄存器行为走向系统影响','形成个人验证工作流']},
  {id:'s2',index:'02',range:'2028—2029',title:'双标签技术骨干',items:['SoC验证成为第一标签','低功耗验证形成专业壁垒','进入跨IP和SoC级场景','开始Review与小范围协调']},
  {id:'s3',index:'03',range:'2030—2032',title:'子系统负责人',items:['主导验证计划与sign-off','带2—5人或协调模块Owner','负责质量、进度和风险','形成Spec到Silicon闭环']},
  {id:'s4',index:'04',range:'2032—2034',title:'MBA决策窗口',items:['具备完整项目交付履历','具备真实带队经历','英语达到商业沟通水平','资金覆盖学习和机会成本']},
  {id:'s5',index:'05',range:'2035+',title:'产品 / 战略 / 经营',items:['连接终端需求与芯片定义','参与人员和预算分配','影响业务与技术路线','为创业积累团队和信用']}
];

const STAGE_GATES = [
  {name:'复杂IP完整交付',description:'能够独立管理边界、计划、风险、Debug、回归与sign-off。',state:'进行中'},
  {name:'跨模块与系统问题',description:'能够理解上下游、系统状态和异常传播，而不是只看单一寄存器行为。',state:'进行中'},
  {name:'验证策略独立性',description:'从功能、风险、检查和coverage形成闭环，并能解释取舍。',state:'进行中'},
  {name:'Review与反馈闭环',description:'能结构化表达问题、接收挑战，并将反馈转化成下一次行动。',state:'进行中'},
  {name:'小范围责任扩大',description:'开始拆任务、Review他人工作或管理一块交付的质量和进度。',state:'待机会'}
];

const DECISIONS = [
  ['技术成长','进入复杂SoC、低功耗和系统问题','长期停留在重复性零散IP UT'],
  ['交付Scope','从个人任务走向IP、子系统责任','连续两年责任范围没有实质扩大'],
  ['领导机会','开始拆任务、Review、控风险','只承担执行，没有决策和协调机会'],
  ['外部通用性','能力能被其他芯片或终端公司认可','工具和方法高度内部化、难以迁移'],
  ['收入回报','收入随责任和市场价值同步增长','责任持续扩大但回报长期不匹配']
];

const PROMPTS = {
  daily:{title:'每日记录Prompt',description:'一次口述同时整理工作、工作中的学习、工作之外学习与生活。',text:`你是我的职业发展记录Agent。我接下来会用口语描述今天发生的事情。请先等待我说“口述结束”，再整理。

请输出纯JSON，不要使用Markdown代码块：
{
  "date":"YYYY-MM-DD",
  "summary":"今日整体概述",
  "work":[{"title":"任务名称","progress":"今天推进","status":"当前状态","problem":"问题、处理和结果的完整因果描述","unknown":"仍不清楚的地方","next":"下一步"}],
  "workLearning":["工作中形成的新理解"],
  "outsideLearning":[{"title":"工作之外学习","result":"完成情况或收获"}],
  "life":[{"title":"锻炼或生活事项","result":"情况"}],
  "tomorrow":{"work":["工作事项"],"learning":["工作外学习"],"life":["生活事项"]},
  "energy":"充足/正常/偏低/高压",
  "aiObservation":{"signals":["可能的能力信号"],"repeats":["可能重复的问题"],"weeklyWatch":["周复盘继续观察"],"candidate":"是否可能值得长期沉淀及原因"},
  "gaps":["待确认信息"]
}

要求：保留因果关系，不夸大成果，严格区分工作中的学习和工作之外学习；对公司内容进行脱敏，不写代码、日志、信号名、项目代号、内部参数或未公开信息。`},
  problem:{title:'问题日志Prompt',description:'完整保留错误判断、证据变化、根因与可迁移方法。',text:`你是我的技术学习与职业成长记录Agent。我会口述一个问题的真实过程。请等待我说“口述结束”后，输出纯JSON，不要使用Markdown代码块：
{
  "date":"YYYY-MM-DD",
  "title":"问题标题",
  "context":"脱敏背景",
  "expected":"预期",
  "actual":"实际",
  "initialJudgment":"最初判断及依据",
  "analysis":["按因果顺序的检查、证据、排除与方向变化"],
  "rootCause":"根因；未确认时明确写当前推测",
  "solution":"处理方式、为什么有效、结果与后续风险",
  "understandingChange":"之前如何理解，现在如何理解",
  "transferableMethod":["可复用的方法、检查顺序、证据和误区"],
  "nextTime":["下次的简洁行动流程"],
  "unknowns":["尚未理解或待确认内容"],
  "abilities":[{"id":"debug","reason":"关联原因"}],
  "aiObservation":{"importance":"ordinary/important","repeat":false,"weekly":true,"learningTask":"是否应生成额外学习任务及建议","resumePotential":"是否可能进入候选池及仍缺什么"},
  "independence":"他人主导/提示后完成/独立完成/独立完成并形成方法"
}

不要美化过程，不要因问题解决就判断能力已掌握；区分直接原因和深层机制；严格脱敏。`},
  weekly:{title:'周度复盘Prompt',description:'读取整周事实，生成分析、下周计划与反馈问题。',text:`你是我的周度职业成长分析Agent。我会提供本周每日记录、问题日志、学习任务完成情况、日程和反馈。请基于事实输出纯JSON：
{
  "range":"YYYY-MM-DD—YYYY-MM-DD",
  "workSummary":["主要交付与进展"],
  "workLearning":["工作中形成的新认知"],
  "outsideLearning":{"completed":["已完成"],"notCompleted":[{"task":"未完成任务","reason":"时间/计划/能力/机会"}]},
  "importantProblems":["重要问题"],
  "repeatedProblems":["重复问题及是否改善"],
  "abilityChanges":[{"id":"debug","change":"可能的变化","evidence":"依据","confidence":"低/中/高"}],
  "workloadEnergy":"工作负荷与精力分析",
  "nextWeekWorkFocus":["工作关注点，不是额外任务"],
  "nextWeekLearning":[{"title":"工作之外学习任务","priority":"core/regular/optional","reason":"来源","time":"预算","environment":"环境","steps":["步骤"],"pass":"掌握标准","fallback":"降级版"}],
  "stopOrReduce":["下周停止或减少什么"],
  "reviewQuestions":["给主管或导师的具体问题"],
  "resumeCandidates":[{"title":"候选经历","reason":"价值","missing":"仍缺事实","sourceIds":["原始记录ID，可留空"]}]
}

不要重复粘贴原始记录；分析结果应引用事实，不夸大能力变化。`},
  oral:{title:'AI口试Prompt',description:'AI逐题追问，不直接给答案。',text:`你是我的验证工程师口试官。围绕我给出的抽象技术主题逐题追问，不要直接讲答案。

规则：
1. 一次只问一个问题；
2. 优先追问边界、因果、证据、异常、恢复和迁移；
3. 当我使用“应该、一般、可能”等模糊词时继续追问；
4. 每题根据结构、正确性、因果、证据和迁移各给1—5分；
5. 只有在我明确说“结束口试”后，才总结卡点、错误理解、推荐补充学习和一项最小训练；
6. 不接收任何公司代码、日志、信号名、项目代号或未公开信息。

先问我：今天要测试哪个主题，以及希望进行10分钟还是20分钟。`},
  ability:{title:'能力更新Prompt',description:'根据工作和复盘更新能力状态，但避免过度升级。',text:`你是我的能力地图审查Agent。根据我提供的原始记录和周复盘，输出纯JSON：
{"abilities":[{"id":"debug","status":"初步理解/能够在提示下完成/能够独立完成/能够处理复杂情况/能够形成方法并指导他人","level":1,"signal":"最近变化及证据","next":"下一次升级条件","opportunity":"当前是否有足够工作机会"}]}

规则：完成学习任务不能直接升级；必须考虑真实应用、独立程度、复杂度、反向测试、复用和外部反馈。证据不足时保持原等级，只更新观察。`},
  resume:{title:'简历整理Prompt',description:'将原始简历整理为网站档案，并保留事实边界。',text:`你是我的职业履历整理Agent。我会提供一份入职前简历或后续经历。请输出纯JSON：
{
  "filename":"原文件名",
  "version":"版本名称",
  "target":"目标方向",
  "summary":"职业概述",
  "education":[{"time":"时间","title":"学校与专业","detail":"关键信息"}],
  "experiences":[{"time":"时间","title":"组织与角色","detail":"职责与成果","abilities":["能力"]}],
  "projects":[{"time":"时间","title":"项目名称","role":"角色","background":"背景","scope":"负责范围","challenge":"挑战","process":"解决过程","result":"结果","abilities":["能力"],"publicBoundary":"可公开边界"}],
  "skills":["技能"],
  "awards":["奖项/专利/论文"],
  "versions":[{"name":"版本","date":"日期","target":"适用方向","changes":"变化"}],
  "candidates":[]
}

不得夸大职责和结果；缺少量化结果时不要编造；同一事实可生成不同方向的表达，但基础事实保持一致。`},
  cycle:{title:'四周周期总结Prompt',description:'完整归档当前周期并生成下一周期建议。',text:`你是我的四周成长周期分析Agent。读取四周的每日记录、问题日志、周报、学习任务、能力地图和反馈后，输出纯JSON：
{
  "title":"周期名称",
  "range":"日期范围",
  "goal":"最初目标",
  "planned":["原计划"],
  "actual":["实际完成"],
  "adjustments":["计划变化及原因"],
  "problems":["重要与重复问题"],
  "abilityChanges":["能力变化与依据"],
  "feedback":["外部反馈"],
  "summary":"周期结论",
  "nextCycle":{"theme":"下一周期主题","reason":"为什么","focus":["重点能力"],"suggestedTasks":["建议任务"]}
}

区分能力不足和工作机会不足，不用完成率掩盖计划不合理。`},
  career:{title:'职业规划复盘Prompt',description:'使用履历、能力与机会校准长期路线。',text:`你是我的长期职业规划审查Agent。请结合我的履历、工作档案、能力地图、当前岗位机会、收入和生活约束进行分析：
1. 当前处于哪个职业阶段；
2. 下一阶段条件已满足、进行中和暂时缺机会的部分；
3. 当前工作是否仍提供足够成长Scope；
4. SoC验证和低功耗双标签是否正在形成；
5. 未来12个月最值得获得的三类经历；
6. 留任、跳槽、MBA或产品/管理转型的触发条件；
7. 将建议连接到年度、季度、四周周期和下周行动。

必须区分事实、推断和不确定信息，不因焦虑而建议频繁切换方向。`}
};
