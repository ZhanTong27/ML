const KEY='jett-career-os-v2';
const OLD_KEY='jett-growth-static-v1';
const dateISO=d=>`${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,'0')}-${String(d.getDate()).padStart(2,'0')}`;
const todayISO=()=>dateISO(new Date());
const DEFAULT_ABILITIES=[
{id:'spec',name:'Spec理解',status:'初步理解',level:2,signal:'能够开始从触发、状态、异常和恢复拆解功能。',next:'在真实任务中独立形成结构化问题清单。'},
{id:'strategy',name:'验证计划与策略',status:'初步理解',level:2,signal:'具备功能列表和基本验证闭环意识。',next:'能够将功能、风险、检查和Coverage完整映射。'},
{id:'debug',name:'Debug与根因定位',status:'能够在提示下完成',level:3,signal:'可以沿证据定位问题，但假设生成和排除效率仍需训练。',next:'连续两次独立完成可复现的Debug证据链。'},
{id:'uvm',name:'UVM与验证环境',status:'能够在提示下完成',level:3,signal:'能够使用和修改现有Agent及环境。',next:'独立解释环境数据流、Model和Checker边界。'},
{id:'check',name:'Checker / Assertion / Coverage',status:'初步理解',level:2,signal:'能够理解三类机制的基本职责。',next:'完成一条Assertion正反测试并解释语义。'},
{id:'soc',name:'SoC系统理解',status:'初步理解',level:2,signal:'正在从寄存器行为走向跨IP和系统状态。',next:'解释一个跨模块功能的状态、异常传播与恢复。'},
{id:'power',name:'低功耗验证',status:'尚未展开',level:1,signal:'长期第二标签，尚缺真实项目证据。',next:'建立Power Domain、Isolation、Retention和Power State基础框架。'},
{id:'tools',name:'Linux / Verdi / 脚本自动化',status:'初步理解',level:2,signal:'能够完成基础操作，但效率和自动化能力仍弱。',next:'形成一项可复用的个人脚本或Debug操作流程。'},
{id:'delivery',name:'交付与风险管理',status:'初步理解',level:2,signal:'能够完成明确任务并主动确认。',next:'为一块交付建立任务拆解、风险Owner和升级条件。'},
{id:'communication',name:'技术表达与协作',status:'能够在提示下完成',level:3,signal:'愿意暴露不懂并主动寻求反馈。',next:'稳定完成15分钟结构化Review并闭环反馈。'}];
const W=[
{id:'w1',dates:'07.13—07.19',title:'工作流与Debug基线',shift:'从沿信号追踪，转向用假设和证据定位根因',observations:['在真实工作中记录首次异常，而不是只记录最终根因','观察自己在哪一步开始依赖同事提示','向导师确认类似问题优先检查的三类信息'],items:[
['w1-loop','自测','闭卷画验证闭环','45分钟 · 纸笔/文档',['画输入→激励→DUT→Monitor→Model→Checker→Coverage','标记每段输入输出与可能错误','查一次资料后重新闭卷画'],'通用验证闭环图','能解释Expected来源、比较位置与Reset处理','只画Model到Checker链路'],
['w1-debug','练习','抽象Debug案例复盘','60分钟 · AI/文档',['写预期、实际和首次异常','区分DUT、Model、Environment','列3个候选假设及反证实验','总结如何把检查前移'],'脱敏Debug案例','别人能复现排除逻辑','只写首次异常、3个假设和根因'],
['w1-oral','自测','AI口头Debug测试','20分钟 · AI',['使用通用抽象场景','让AI逐题追问而非直接给答案','记录结构、因果、证据、效率和迁移评分'],'口试评分与卡点','五项均≥3分','只完成10分钟解释测试'],
['w1-flow','方法','个人验证工作流V1','周末3小时 · 文档',['拆任务澄清到Sign-off的阶段','每阶段写输入、动作、输出、错误和标准','标记需要找谁确认'],'个人验证工作流V1','能用于下一个新IP','先完成前五个阶段']]},
{id:'w2',dates:'07.20—07.26',title:'环境复用与Spec接入',shift:'从旧环境能运行，转向重新证明设计和Model假设',observations:['新任务到来后24小时内记录边界和Top5未知项','观察自己是否默认旧环境与新设计完全一致','向主管确认验证计划最需要提升的维度'],items:[
['w2-reuse','学习','八项环境复用检查','60分钟 · 文档',['接口、寄存器、Clock/Reset、状态、时序、Model、Coverage和系统条件','为每项写“需重证的假设”','形成脱敏模板'],'环境复用检查表','每个未确认项都有确认方式','先做Model、时序和系统条件'],
['w2-recall','自测','闭卷复述一个功能','45分钟 · 纸笔',['写触发、前置状态、状态变化、结果、标志、错误与恢复','列3个答不上来的问题','回到资料校正'],'功能路径卡','因果链完整且无模糊词','只做触发—状态—结果'],
['w2-model','练习','Checker/Model抽象审查','60分钟 · AI/文档',['追Expected规则来源','检查输入、状态、延迟和Reset','设计一个Model错误场景','说明怎样区分Model和DUT错误'],'Model审查清单','能解释最小反证实验','只审查一条Expected链路'],
['w2-corner','自测','Corner六维变换','60分钟 · AI',['从数值、时间、状态、组合、异常、恢复生成候选','写违反假设、激励、检查与价值','按影响×可能性×检查缺口排序'],'10个候选Corner','至少5个说清检查方式与价值','每维生成1个']]},
{id:'w3',dates:'07.27—08.02',title:'从Spec到验证策略',shift:'从功能列表和用例，转向功能—风险—检查闭环',observations:['在工作中观察最高风险遗漏来自功能、状态、环境还是Model','记录哪些Corner被证明没有价值','准备一页内容请求导师Review'],items:[
['w3-map','练习','功能—风险—验证映射','75分钟 · 文档',['选择抽象功能并列前置状态与风险','选择Stimulus、Checker、Assertion和Coverage','标记无法确认的系统假设'],'验证策略映射表','不再只写“写一个用例”','只做Top5功能'],
['w3-boundary','学习','三类检查机制边界','45分钟 · AI',['各用一句话定义职责','为3条规则选择机制','让AI追问理由'],'检查机制决策卡','能说明Coverage为何不证明正确性','只比较Assertion和Checker'],
['w3-sva','练习','第一条Assertion正反测试','75分钟 · 开源/纸笔',['自然语言写规则并画时序','明确采样Clock和Reset','转成Property','制造违反与合法边界'],'正反测试Assertion','该报能报、合法不误报、语义可解释','先完成自然语言和时序图'],
['w3-oral','自测','AI Spec分析口试','20分钟 · AI',['回答边界、状态、时序、异常、恢复和检查','不允许AI直接讲答案','记录四项评分'],'口试评分','四项均≥3分','10分钟功能—风险解释']]},
{id:'w4',dates:'08.03—08.09',title:'复杂交付与准负责人意识',shift:'从完成个人任务，转向提高一块交付的确定性',observations:['在工作中记录Top5风险及其Owner','观察自己是否能提前识别最晚解决点','向主管询问更大Scope下最担心的不足'],items:[
['w4-break','方法','抽象任务拆解与风险台账','60分钟 · 文档',['拆功能、未知项、环境/Model、用例、Assertion、Coverage、回归、Bug和Sign-off','写状态、标准、依赖与截止时间','设升级条件'],'任务与风险台账','能够向主管清晰同步','只做Top5风险'],
['w4-risk','自测','风险排序闭卷测试','45分钟 · 纸笔',['选Top5风险','判断影响、检测、最晚解决点、Owner和升级条件','回到资料校正'],'Top5风险判断','理由清楚且能被挑战','只做Top3'],
['w4-sim','自测','60分钟完整交付模拟','60分钟 · AI/文档',['10分钟功能结构','10分钟未知项','15分钟Corner','10分钟检查','10分钟Coverage','5分钟Sign-off'],'抽象功能验证策略','时间内形成闭环','只完成前四步'],
['w4-month','复盘','月度四指标复盘','90分钟 · AI',['检查独立解决、重复问题、额外学习和工作转化','区分能力不足与机会不足','决定下月增删内容'],'周期总结','能决定下周期调整','只完成四指标与一个调整']]}];
const PROMPTS={
daily:{title:'每日工作记录',desc:'一次口述同时整理工作、工作中的学习、额外学习、生活与明日重点。',text:`你是我的职业发展记录Agent。我会用口语描述今天发生的事情。请保留因果关系，区分正常工作、工作中的新学习、工作之外主动学习以及生活锻炼，不要让我再次填写多张表。请脱敏处理公司信息，不得写代码、日志原文、具体信号名、内部参数或项目代号。

请只输出可被网站导入的JSON，不要使用Markdown代码块：
{
  "date":"YYYY-MM-DD",
  "overview":"一段今日概述",
  "work":[{"task":"任务名称","progress":"今天推进","status":"当前状态","issue":"问题、处理方式与结果的完整因果叙述","unclear":"仍不清楚的地方或无","next":"下一步"}],
  "workLearning":["工作中形成的新技术、工具、流程或协作认知"],
  "outsideLearning":[{"title":"工作之外的学习","result":"完成情况或收获"}],
  "life":[{"title":"锻炼或生活事项","time":"时间，可留空","result":"结果"}],
  "tomorrow":[{"type":"work|learn|life","title":"明日行动"}],
  "aiObservations":["只记录可能的能力信号、重复问题或值得周复盘的事项，不轻易判断能力升级"],
  "pending":["待确认信息"]
}

我说“口述结束”后再整理。`},
problem:{title:'技术问题学习日志',desc:'完整保留错误判断、证据变化、根因、解决方式和可迁移方法。',text:`你是我的技术学习与职业成长记录Agent。我会口述一个问题，内容可能顺序混乱，并包含错误判断、尝试、他人提示和未解决疑问。请不要美化过程，也不要因为最终解决就判断我已经掌握。请脱敏公司信息。

请只输出可导入网站的JSON，不要使用Markdown代码块：
{
  "date":"YYYY-MM-DD",
  "title":"问题标题",
  "background":"背景与场景",
  "expected":"原本预期",
  "actual":"实际现象",
  "initial":"最初理解、默认假设及后来被证明不完整之处",
  "analysis":["按因果顺序记录检查、证据、排除和判断变化"],
  "rootCause":"确定根因；不确定时明确写当前推测",
  "solution":"解决方式、为什么有效、当前结果与后续风险",
  "understanding":"理解发生了什么变化",
  "transfer":["可迁移的方法、检查顺序和常见误区"],
  "nextTime":["下次行动流程"],
  "openQuestions":["尚未理解或待确认内容"],
  "abilities":["真正相关的能力及原因"],
  "independence":"他人主导|提示后完成|独立完成|独立完成并形成方法",
  "aiObservation":"是否值得周复盘、安排额外学习、进入周期档案或简历候选池，以及还缺什么证据"
}

我说“口述结束”后再整理。`},
weekly:{title:'周度复盘',desc:'读取一周每日记录和问题日志，生成下周工作关注点与工作外学习。',text:`你是我的周度职业成长Agent。我会提供本周的每日工作记录、问题日志、额外学习和反馈。请以真实工作内容为主要依据，不用完成清单代替能力判断。

请只输出JSON，不要使用Markdown代码块：
{
  "week":"YYYY-MM-DD—YYYY-MM-DD",
  "workSummary":["主要交付、推进、问题和工作中的学习"],
  "learningSummary":["工作之外学习的完成情况、未完成原因和工作转化"],
  "repeatedProblems":["重复出现的问题及变化"],
  "abilitySignals":[{"ability":"能力","signal":"证据","judgement":"仅观察，不夸大"}],
  "nextWeek":{
    "work":["下周工作关注点"],
    "learning":[{"title":"工作之外学习任务","time":"时间预算","reason":"为何安排","minimum":"高压降级版本"}],
    "stop":["下周应停止或减少的事项"]
  },
  "reviewQuestions":["向主管或导师提出的1—2个具体问题"],
  "resumeCandidates":[{"title":"可能进入简历的经历","evidence":"已有事实","missing":"仍缺证据"}]
}`},
resume:{title:'简历与履历整理',desc:'把入职前简历整理成可持续更新的履历档案。',text:`你是我的履历与简历管理Agent。我会提供一份入职前简历。请保持事实准确，不夸大成果；无法确认的内容标为待确认。

请只输出JSON：
{
  "version":"V1 入职前简历",
  "updated":"YYYY-MM-DD",
  "target":"当前职业定位",
  "summary":"个人概述",
  "education":[{"time":"时间","title":"学校与专业","detail":"学位、课程或重点"}],
  "experiences":[{"time":"时间","title":"组织与角色","detail":"职责与成果","skills":["能力"]}],
  "projects":[{"time":"时间","title":"项目","detail":"背景、个人职责、技术、挑战和结果"}],
  "skills":["技术与工具"],
  "awards":["奖项、专利或研究成果"],
  "versions":[{"name":"版本名称","purpose":"适用方向","change":"本版说明"}],
  "candidates":[]
}`}};
