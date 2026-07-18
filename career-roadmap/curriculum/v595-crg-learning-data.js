(function(){
 const source=(id,title,type,url,use,limit)=>({id,title,type,url,use,limit});
 const chapter=(id,pack,title,question,objectives,reading,sources,questions,practice,output)=>({id,pack,title,question,objectives,reading,sources,questions,practice,output});
 const SOURCES={
  clkmgrSpec:source('clkmgr-spec','OpenTitan Clock Manager HWIP Technical Specification','官方架构文档','https://opentitan.org/book/hw/top_earlgrey/ip_autogen/clkmgr/','理解Clock Group、软件可控时钟、外部时钟切换和频率/超时监测如何被组织。','只能说明OpenTitan公开实现，不能直接代表其他SoC或公司内部CRG。'),
  clkmgrTheory:source('clkmgr-theory','OpenTitan Clock Manager Theory of Operation','官方机制文档','https://opentitan.org/book/hw/top_earlgrey/ip_autogen/clkmgr/doc/theory_of_operation.html','观察逻辑Clock Group、gateable与hintable控制、Power Manager交互和安全控制边界。','不能据此推断所有CRG都采用相同分组或控制协议。'),
  clkmgrDv:source('clkmgr-dv','OpenTitan CLKMGR Design Verification','官方验证文档','https://opentitan.org/book/hw/top_darjeeling/ip_autogen/clkmgr/dv/index.html','学习公开UVM环境、动态仿真目标、clock-gating assertions和Testplan组织方式。','文档展示的是特定版本环境，不等同于通用Sign-off模板。'),
  clkmgrTestplan:source('clkmgr-testplan','OpenTitan CLKMGR Testplan','官方测试计划','https://opentitan.org/book/hw/top_earlgrey/ip_autogen/clkmgr/data/clkmgr_testplan.html','把功能点转成Stimulus、Checks和Coverage，并观察随机化Power/Clock交互。','Testpoint覆盖不代表你的项目需求完整；需根据真实接口合同补充。'),
  glitchMux:source('glitch-mux','OpenTitan prim_clock_gp_mux2','官方原语说明','https://opentitan.org/book/hw/ip/prim/doc/prim_clock_gp_mux2.html','直观看异步Clock Source切换为何产生窄脉冲，以及互锁同步结构怎样避免双路径同时打开。','原语结构只是一个实现例子；不能直接复制到内部RTL。'),
  rstmgrSpec:source('rstmgr-spec','OpenTitan Reset Manager HWIP Technical Specification','官方架构文档','https://opentitan.org/book/hw/ip/rstmgr/index.html','理解POR拉伸、级联Reset、软件/外设Reset、Reset Cause、Crash Information和Consistency Check。','不能证明其他SoC具有相同Reset类型、树结构或安全策略。'),
  rstmgrTheory:source('rstmgr-theory','OpenTitan Reset Manager Theory of Operation','官方机制文档','https://opentitan.org/book/hw/top_earlgrey/ip_autogen/rstmgr/doc/theory_of_operation.html','理解Reset Domain、Reset Tree、Power Manager请求、Reset Cause记录和不同Warm Reset影响。','只支持公开架构理解，不能替代具体项目Reset Spec。'),
  rstmgrDv:source('rstmgr-dv','OpenTitan RSTMGR Design Verification','官方验证文档','https://opentitan.org/book/hw/ip/rstmgr/dv/index.html','学习Reset请求、Crash Dump、软件Reset、接口监控和公开UVM环境分工。','不应把OpenTitan Testbench组件名称当作公司内部方法。'),
  rstmgrTestplan:source('rstmgr-testplan','OpenTitan RSTMGR Testplan','官方测试计划','https://opentitan.org/book/hw/top_earlgrey/ip_autogen/rstmgr/data/rstmgr_testplan.html','观察多类Reset Stimulus、Reset Info检查、CSR在不同Reset下的恢复以及Security Countermeasure Testpoint。','不能证明某个项目需要完全相同的Reset Sweep范围。'),
  pwrmgrDv:source('pwrmgr-dv','OpenTitan Power Manager Design Verification','官方交互验证文档','https://opentitan.org/book/hw/ip/pwrmgr/dv/index.html','理解Clock Enable/Status握手、低功耗Entry/Exit与Reset Cause之间的联合检查。','只用于理解交互验证思路，不能推断内部Power State Machine。'),
  formalGuide:source('formal-guide','OpenTitan Assertions and Formal Guide','官方方法文档','https://opentitan.org/book/hw/formal/','学习SVA绑定、Clock/Reset语义和独立Checker模块的公开写法。','不是完整Formal Methodology，也不能替代项目工具约束。'),
  cdcStandard:source('cdc-standard','Accellera CDC/RDC Integration Standard 1.0','行业标准','https://www.accellera.org/downloads/standards/clock-domain-crossing','理解IP到SoC之间如何以工具中立方式交付CDC/RDC意图与抽象Collateral。','标准解决Collateral交换，不自动保证具体Crossing功能正确。'),
  cdcWorkshop:source('cdc-workshop','Hierarchical CDC and RDC Closure with Standard Abstract Models','行业公开教程','https://www.accellera.org/resources/videos/cdc-rdc-workshop-2024','建立CDC/RDC基础、Setup、Structural Check、Assertions和层次化Closure全景。','公开教程是方法概览，实际Waiver和Sign-off仍需项目规则。'),
  clockFormal:source('clock-formal','A Formal Verification App Towards Efficient, Chip-Wide Clock Gating Verification','DVCon论文','https://dvcon-proceedings.org/document/a-formal-verification-app-towards-efficient-chip-wide-clock-gating-verification/','了解如何把大量Clock Gate检查抽象为可扩展Formal App和自动化流程。','论文只证明作者展示过该方法，不能推断其在整个行业或公司普遍部署。'),
  clockGatingThesis:source('clock-gating-thesis','Verification and Synthesis of Clock-Gated Circuits','学术技术报告','https://www2.eecs.berkeley.edu/Pubs/TechRpts/2017/EECS-2017-122.html','理解Clock Gating改变状态更新后为何需要Sequential Equivalence与控制逻辑提取。','研究重点偏综合与等价性，不覆盖完整CRG功能验证。'),
  pragmaticCdc:source('pragmatic-cdc','Pragmatic Formal Verification Methodology for CDC','公开论文','https://arxiv.org/abs/2406.06533','了解Metastability Injection与Formal如何补充单纯静态结构检查。','论文方案需要结合工具、设计规模和误报成本评估，不能直接视为Sign-off要求。'),
  autogate:source('autogate','AUTOGATE: Toggling-Aware LLM-based RTL Rewriting','前沿论文','https://arxiv.org/abs/2606.17461','观察波形压缩、层次化Agent和Formal/等价性约束怎样用于Clock Gating优化。','这是设计优化研究，不是成熟CRG验证流程；不能写成已被行业普遍采用。')
 };
 const PACKS=[
  {id:'crg-pack-1',title:'Architecture Knowledge Pack',purpose:'先建立验证对象模型：Source、Path、Reset、Power、Safety以及功能CRG与物理CTS边界。'},
  {id:'crg-pack-2',title:'Verification Knowledge Pack',purpose:'把对象模型转成Feature、Checker、Coverage、Formal Property和Sign-off Evidence。'},
  {id:'crg-pack-3',title:'Frontier & Industry Pack',purpose:'阅读公开项目、标准和论文，区分可复用方法、适用条件与不能证明的内容。'}
 ];
 const CHAPTERS=[
  chapter('crg-01-object-boundary','crg-pack-1','CRG系统位置与对象边界','功能CRG到底负责什么，它与PLL模拟行为、CDC/RDC和物理Clock Tree分别在哪交界？',
   ['画出Source—Root Control—Derived Clock—Leaf Domain—Reset—Power的对象链。','区分功能正确性、跨域安全和物理实现三类责任。','形成后续验证Feature Tree的顶层分类。'],
   [
    'CRG不是单一寄存器模块，而是一组围绕时钟源选择、分频、门控、请求握手、Reset生成和Power交互的控制功能。验证时首先要明确“输入是什么、状态是什么、输出给谁、通过依据是什么”。',
    '功能CRG通常位于RTL和SoC控制层。它可以决定选择哪个Source、何时Gate、如何Divider、何时发出或响应Clock Request，并与Reset和Power状态交互。物理Clock Tree则处理Buffer Tree、Skew、Insertion Delay、Jitter、OCV和Routing。功能仿真能够证明控制协议与输出逻辑，不能直接证明CTS质量。',
    'PLL或Oscillator内部模拟环路也不属于纯数字CRG验证的全部责任。数字验证通常检查Enable、Lock/Valid、切换条件、Timeout和Failover接口；环路稳定性、相噪等要由模拟或AMS证据承担。',
    '建议把对象边界写成合同表：对象、输入、控制者、消费者、可观察量、Checker依据、责任人和不能由本层证明的内容。'
   ],[SOURCES.clkmgrSpec,SOURCES.clkmgrTheory,SOURCES.rstmgrSpec],
   ['一个Clock输出“有波形”为什么仍不足以证明CRG正确？','Glitch、CDC和Skew分别属于哪一类问题？','对一个未知CRG，最先向设计或架构确认的五项边界是什么？'],
   '使用虚拟名称画一张CRG对象图，并给每条边标出控制/状态/数据/检查依据。不得使用内部接口名。',
   '一页《CRG对象与责任边界图》＋一张接口合同表。'),
  chapter('crg-02-clock-source-path','crg-pack-1','Clock Source、Path与控制语义','Source、Mux、Divider、Gate、Clock Group和Request/Acknowledge如何共同决定一个Clock是否应当出现？',
   ['理解Source可用性与Clock输出使能不是同一概念。','区分直接软件控制、Hint控制、硬件自动门控和Power握手。','建立Parent-child与Derived Clock关系。'],
   [
    'Clock Source层关注Crystal、RC Oscillator、PLL/FLL、External/Test/Safe Clock以及Source Startup、Valid和Lock。验证不能只看最终Clock，还要确认Source在被选择前是否有效、失效时怎样处理、Timeout和Fallback是否符合合同。',
    'Clock Path层由Source Mux、Root Gate、Divider、Local Mux、Local Gate和Leaf Clock组成。路径上的每个控制都可能改变频率、相位连续性和可用性。Reference Model应从配置和状态推导“当前Parent、期望频率区间、是否允许停止、是否应答请求”。',
    'Clock Group是逻辑分组，不一定等于物理Clock Tree。公开设计常按安全属性、软件权限或Power Domain分组。验证应检查组内共同控制、组间独立性、非法控制被拒绝以及状态回读。',
    'Request/Acknowledge用于避免在消费者尚未安全停机时关Clock，或在Clock尚未稳定时继续状态迁移。检查应覆盖正常响应、延迟响应、Timeout、撤销和并发请求。'
   ],[SOURCES.clkmgrSpec,SOURCES.clkmgrTheory,SOURCES.pwrmgrDv],
   ['Gateable Clock与Hintable Clock的验证差异是什么？','Clock Request被撤销时，输出与Ack应怎样定义？','怎样从Divider配置推导允许的周期区间而非固定等待时间？'],
   '构造三个虚拟Clock Group和两种Power状态，写出每个Clock的Parent、控制权、允许停止条件和期望状态。',
   '《Clock Source/Path控制矩阵》＋简化Reference Model伪代码。'),
  chapter('crg-03-glitch-free-switch','crg-pack-1','Glitch-free切换与时间边界','两个异步或不同频率Source切换时，为什么会出现窄脉冲、长脉冲或Missing Pulse，怎样定义正确？',
   ['理解break-before-make互锁。','从边沿与同步级数推导切换窗口。','区分禁止Glitch与保证无Clock Gap。'],
   [
    '组合Mux直接切换异步Clock时，Select可能在任一Source的有效电平中改变，从而截断当前Pulse或拼接两个Pulse。Glitch-free结构通常先关闭旧路径，在确认关闭后再允许新路径打开，形成break-before-make。',
    '互锁同步会引入若干源Clock边沿的延迟，因此切换期间可能合法出现延长周期或Clock Gap。验证目标通常不是“周期完全不变”，而是没有低于最小Pulse Width的窄脉冲、没有双源重叠，并在有界时间内切到目标Source。',
    'Checker应同时监测：输出边沿间隔、High/Low Pulse Width、切换前后频率、选择状态、旧/新路径Enable以及完成条件。窗口应由Source周期、同步级数、门控相位和协议定义推导，而不是使用经验固定值。',
    '异步Source停摆是重要Corner：若关闭或开启逻辑依赖不再跳变的Clock，切换可能无法完成。必须确认设计是否有Safe Clock、异步控制或Timeout/Fallback。'
   ],[SOURCES.glitchMux,SOURCES.clkmgrTestplan,SOURCES.clkmgrDv],
   ['为什么Glitch-free不等于Gap-free？','如何给“完成切换”写可观察定义？','Source停止时，哪一类互锁结构可能卡死？'],
   '用两个虚拟Clock周期10ns和17ns，手工列出四种Select变化相位，推导允许的最短/最长输出间隔和Timeout假设。',
   '《Glitch/Gap/Missing Pulse Checker设计》＋四张核心时序图。'),
  chapter('crg-04-reset-architecture','crg-pack-1','Reset架构、类型与Cause','POR、Warm、Software、Watchdog、Debug、Low-power Reset为什么不能只当作同一根Reset线？',
   ['区分Reset来源、影响范围、保持状态和恢复路径。','理解Reset Cause与Crash Information。','建立Parent/Leaf Reset和Selective Reset模型。'],
   [
    'Reset的语义至少包含来源、作用范围、Assert条件、Release条件、Pulse/Stretch、是否清除Retention以及Cause记录。不同Warm Reset即使都重置CPU，也可能保留不同Always-on或Peripheral状态。',
    'Reset Tree常由POR或系统Reset生成多个Parent/Leaf Reset。Selective Reset允许只复位某些模块，但必须检查被复位模块与未复位模块之间的接口是否进入安全状态。',
    'Reset Cause寄存器不是装饰信息。它影响软件恢复策略，也能用于验证多原因并发、优先级、Write-one-clear、掉电保留和旧Cause清除责任。Crash/Alert/CPU信息需要检查捕获时刻和Reset后的可读性。',
    '验证Reset时应从“线是否拉低”升级为“系统状态转移是否符合该Reset类别”：哪些寄存器恢复、哪些保留、哪些Clock存在、哪些握手重启、哪些Cause被记录。'
   ],[SOURCES.rstmgrSpec,SOURCES.rstmgrTheory,SOURCES.rstmgrTestplan],
   ['同为Warm Reset，为什么恢复检查可能不同？','Selective Reset最容易遗漏哪类接口风险？','多Reset原因同周期出现时，应如何定义Cause预期？'],
   '建立一个虚拟SoC的Reset分类表，至少包含POR、SW、Watchdog、Low-power Exit和Peripheral Reset。',
   '《Reset类型—影响范围—恢复证据矩阵》＋Reset Cause模型。'),
  chapter('crg-05-reset-sync-power','crg-pack-1','Reset同步、RDC与Power交互','异步Assert、同步Deassert解决什么问题，Reset跨域和低功耗恢复为什么需要联合验证？',
   ['理解Reset Synchronizer与Release Clock。','识别Reset Reconvergence和RDC风险。','把Clock/Reset/Power Entry与Exit放进同一状态图。'],
   [
    '异步Assert允许在Clock不可用时快速进入Reset；同步Deassert则让状态元件在目标Clock边沿附近一致释放，降低亚稳态和部分逻辑提前运行的风险。Release所依赖的Clock必须存在且满足设计假设。',
    'RDC关注不同Reset Domain之间的数据或控制传播，以及异步Reset释放导致的亚稳、Glitch和Reconvergence。只做CDC分析不足以覆盖Reset独立Assert/Deassert引起的风险。',
    '低功耗Entry常要求先停止事务、关Clock、Assert Reset或Isolation，再关Power；Exit则可能按Power稳定、Clock有效、Reset释放和状态恢复的顺序进行。验证需要检查握手和时序边界，而不是只分别测试Power、Clock、Reset。',
    '层次化SoC中，IP应交付Clock/Reset Domain、Synchronizer、Assumption和Waiver等Collateral。Accellera 1.0标准的价值在于让这类信息可以跨工具和层级复用，但它不替代功能验证。'
   ],[SOURCES.rstmgrTheory,SOURCES.pwrmgrDv,SOURCES.cdcStandard,SOURCES.cdcWorkshop],
   ['没有Clock时同步Deassert会发生什么？','Reset Reconvergence与普通CDC Reconvergence有什么不同？','Power Exit中Clock Valid和Reset Release的先后关系如何转成Assertion？'],
   '画一个虚拟Power Domain的Entry/Exit状态图，为每个转移写Clock、Reset、Power和Ack条件。',
   '《Clock/Reset/Power联合状态机》＋五条RDC/恢复检查。'),
  chapter('crg-06-verification-model','crg-pack-2','Feature Tree、Reference Model与Checker Catalogue','怎样把一堆Clock/Reset概念变成可执行、可追溯的验证体系？',
   ['建立Feature—Stimulus—Observation—Checker—Coverage映射。','区分结构、寄存器、时序、协议和系统状态Checker。','定义最小Sign-off Evidence。'],
   [
    'Feature Tree应从架构责任出发，而不是从已有Case名称反推。一级可分为Clock Source/Path、Dynamic Switch、Gate/Request、Reset Type/Tree、Clock-Reset-Power、Safety/DFT、Software Control和Error Handling。',
    '每个Feature至少回答：前置条件、刺激、可观察量、期望模型、允许窗口、异常路径、Coverage和通过证据。缺少期望模型的Case容易退化为“跑通且没有报错”。',
    'Checker Catalogue可分为Connectivity、CSR、State/Protocol、Frequency/Period、Pulse Width、Glitch/Gap、Reset Effect、Cause/Status、Timeout、Consistency、End-to-end和Assertion。不同Checker应写清数据来源与误报边界。',
    'Sign-off Evidence不只是回归通过率。还应包含Feature覆盖、结构/CDC/RDC报告、Formal结果、Known Limitation、Waiver、模型/Checker审查和关键Corner结果。'
   ],[SOURCES.clkmgrDv,SOURCES.clkmgrTestplan,SOURCES.rstmgrDv,SOURCES.rstmgrTestplan],
   ['一个Case通过但没有独立Checker，能证明什么？','Connectivity检查和End-to-end检查分别防什么漏网？','哪些Feature更适合Assertion/Formal而非纯随机仿真？'],
   '选一个虚拟Glitch-free Mux和一个Selective Reset，分别写Feature—Stimulus—Checker—Coverage表。',
   '《CRG验证维度矩阵》＋《Checker Catalogue v1》。'),
  chapter('crg-07-dynamic-debug','crg-pack-2','动态Clock/Reset验证与Debug方法','切换、门控、Force、等待窗口和Checker报错如何形成可复用的Debug闭环？',
   ['把控制—状态—输出—Checker分层。','推导时间窗口而非盲目加等待。','覆盖并发、撤销、超时与异常Source。'],
   [
    '动态验证的核心是状态转移。对每次操作保存控制请求、内部可观察状态、Clock/Reset输出和Checker采样窗口，避免只看最终波形。',
    'Debug可固定为四层：控制输入是否被接受；状态机或握手是否进入期望状态；输出边沿/Reset是否符合物理可观察定义；Checker使用的参考、采样点和容忍窗口是否正确。',
    '等待时间应由协议和边沿累计推导。旧路径关闭需要若干旧Clock边沿，新路径开启又需要若干新Clock边沿；两个过程叠加后，输出可能合法出现较长间隔。',
    'Force、Backdoor或环境覆盖可能留下残余控制。每个用例应有建立、作用域、释放、Reset影响和结束清理Checklist，并在Failure中优先确认环境控制是否仍在生效。'
   ],[SOURCES.clkmgrTestplan,SOURCES.rstmgrTestplan,SOURCES.formalGuide],
   ['如何证明一个长周期是机制结果而非Bug？','Force未释放为何可能伪装成设计失效？','切换期间应记录哪些假设，才能让下一次Debug更快？'],
   '基于公开/合成波形写一份Clock Switch Debug记录，包含假设、证据、反证和Checker窗口推导。',
   '《Clock/Reset Debug Checklist》＋一份可复用Failure Record。'),
  chapter('crg-08-formal-coverage-signoff','crg-pack-2','Formal、Coverage与Sign-off','哪些CRG属性适合穷尽证明，Coverage又怎样避免只覆盖配置而漏掉时序组合？',
   ['识别Safety、Liveness和Equivalence属性。','构建配置×状态×时序×异常Cross Coverage。','区分Proof、Bounded Proof、Vacuity与Assumption风险。'],
   [
    'CRG适合Formal的属性包括：互斥Clock Path、Gate关闭后无边沿、切换后最终到达目标Source、Reset Assert传播、Reset Release有界、非法控制不改变输出、Request/Ack协议和错误监测。',
    'Formal结果必须审查Assumption、Cone、Vacuity和Bound。一个Property被证明，可能只是因为前置条件永远不成立；一个有界Liveness通过，也不等于无限时间必达。',
    'Coverage不应只覆盖寄存器值。建议至少交叉：Source组合、频率关系、Select相位、Gate状态、Power状态、Reset类别、并发请求、异常Source和Checker结果。',
    'Clock Gating引入状态更新变化时，Sequential Equivalence可用于验证优化前后功能关系；但这属于实现/优化验证的一部分，不能代替CRG控制协议和系统场景验证。'
   ],[SOURCES.formalGuide,SOURCES.clockFormal,SOURCES.clockGatingThesis,SOURCES.pragmaticCdc],
   ['互斥Property与最终切换Property分别属于什么类型？','怎样识别Clock停止导致的Vacuous Pass？','哪些Coverage Cross可能组合爆炸，应该如何分层？'],
   '为虚拟双Source Clock Mux写八条自然语言Property，并标注Safety/Liveness、Clock、Reset、Assumption和Cover。',
   '《Formal Property Catalogue》＋《Coverage Catalogue》＋Sign-off Evidence Map。'),
  chapter('crg-09-opentitan-case','crg-pack-3','OpenTitan公开案例拆解','怎样从一个公开项目提取架构、验证和证据，而不是只摘几个名词？',
   ['完成Clock Manager与Reset Manager案例卡。','对照Spec、Theory、DV、Testplan和Results。','明确能借鉴与不能外推的边界。'],
   [
    '案例阅读按五层进行：Spec回答功能承诺；Theory回答机制和状态关系；Interface/Register回答可观察合同；DV/Testplan回答如何刺激和检查；Regression/Checklist回答公开成熟度证据。',
    'OpenTitan Clock Manager公开展示了属性化Clock Group、软件Gate/Hint、外部Clock切换、频率/Timeout测量以及与Power Manager交互。Reset Manager公开展示了POR拉伸、级联/选择性Reset、Cause、Crash Information和Consistency Check。',
    '验证层面可以观察UVM环境、Clock/Reset Interface、Scoreboard、SVA、Testpoint和Coverage组织。但复用时应抽象成方法：Feature如何落到Stimulus与Check，而不是复制模块名或目录结构。',
    '案例卡必须写“不能证明什么”：公开文档不能证明其他公司采用相同架构，也不能证明所有Corner已经闭环。'
   ],[SOURCES.clkmgrSpec,SOURCES.clkmgrTheory,SOURCES.clkmgrDv,SOURCES.clkmgrTestplan,SOURCES.rstmgrSpec,SOURCES.rstmgrTheory,SOURCES.rstmgrDv,SOURCES.rstmgrTestplan],
   ['Spec、Theory和Testplan各自回答什么？','公开Regression通过率为什么不能直接迁移成你的Sign-off标准？','从OpenTitan最值得抽象的三个验证方法是什么？'],
   '使用网站提供的案例模板完成OpenTitan Clock Manager或Reset Manager案例卡。',
   '一张《OpenTitan CRG公开案例卡》＋三条可迁移方法＋三条适用边界。'),
  chapter('crg-10-frontier-automation','crg-pack-3','标准化、自动化与AI前沿','CRG验证中哪些内容适合元数据驱动、自动Property、层次化CDC/RDC和AI辅助？',
   ['识别重复、结构化和可审查的自动化对象。','理解CDC/RDC Collateral复用趋势。','给AI使用设置证据与隐私边界。'],
   [
    'Metadata-driven Verification适合从Clock/Reset清单生成Connectivity Check、Monitor配置、基础Property、Coverage骨架和文档。前提是元数据有稳定Schema、来源可追溯并由人审查。',
    'Accellera CDC/RDC 1.0把IP级意图和抽象Collateral标准化，目标是减少SoC集成时跨工具重做。对个人成长的价值在于学习“可复用Sign-off资产”而不只是某个工具命令。',
    'Formal App展示了把大规模重复Clock Gate规则封装为自动检查的思路；AI/LLM研究则尝试用波形摘要和层次化Agent辅助Clock Gating优化。两者都需要Formal、Equivalence或人工Review作为护栏。',
    'Career OS中的AI只能处理公开、合成或脱敏数据。AI可以生成问题清单、Property草案和案例对照，但不得根据缺失信息编造内部架构，也不能直接作为Sign-off。'
   ],[SOURCES.cdcStandard,SOURCES.cdcWorkshop,SOURCES.clockFormal,SOURCES.autogate],
   ['哪些CRG信息最适合成为Machine-readable Metadata？','自动生成Property后必须进行哪几类审查？','AI波形摘要会丢失哪些时序信息，如何设置反证检查？'],
   '设计一个虚拟CRG Metadata Schema，并手工生成三条Connectivity Check、三条Property和两个Coverage Point。',
   '《CRG自动化机会地图》＋一个脱敏Metadata原型＋风险与停止条件。')
 ];
 window.CRG_LEARNING_LIBRARY_V595={marker:'CAREER_OS_V595_CRG_LEARNING_LIBRARY',version:'5.9.5',title:'CRG Learning Library',packs:PACKS,chapters:CHAPTERS,sources:SOURCES,principles:['站内讲义优先，外部资料作为证据与延伸。','每个来源说明能回答什么、不能证明什么。','阅读、自测和工作接触不自动完成Pack或提高能力等级。','完成仍需要输出、受控练习、验证设计证据与用户确认。']};
})();
