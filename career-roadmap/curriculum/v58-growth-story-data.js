window.GROWTH_STORY_V58={
 version:'5.8.0',
 stage:{title:'IP独立交付能力形成期',description:'正在从完成明确验证任务，走向理解设计意图、定义验证边界并沉淀可复用方法。'},
 mainLine:{title:'数模模型理解与相关性能力',description:'把模拟侧行为、Verilog-A、SV-RNM和真实网表组织成可解释、可验证的模型合同与相关性流程。'},
 supportLine:{title:'低功耗与时域边界验证闭环',description:'从发现波形异常，提升到规格依据、边界场景、检查器和修改后回归的完整闭环。'},
 currentTopic:{title:'UVM-MS验证方法学研究',description:'研究它是否能复用UVM验证资产，并减少不同数模表示接入时的重复工作；目前只做认知和最小实验准备。'},
 abilityScale:[
  {level:0,label:'尚未接触',meaning:'没有理解或实践证据'},
  {level:1,label:'已接触',meaning:'知道基本概念和使用场景'},
  {level:2,label:'能解释',meaning:'能用自己的话讲清机制和边界'},
  {level:3,label:'能应用',meaning:'在练习或真实任务中使用过'},
  {level:4,label:'独立闭环',meaning:'能独立完成、定位问题并验证结果'},
  {level:5,label:'迁移与影响',meaning:'能跨场景复用、形成方法或帮助他人'}
 ],
 abilities:[
  {id:'ams-modeling',title:'数模行为建模与相关性',level:2,trend:'emerging',evidence:'已识别Verilog-A、SV-RNM和真实网表的不同职责，并开始推动上游提供行为波形和模型。',next:'实际分析一份脱敏模型，形成端口、状态、动态行为、容差和相关性测试合同。'},
  {id:'low-power-intent',title:'低功耗设计意图判断',level:3,trend:'improving',evidence:'已从检查输出结果推进到检查掉电恢复、软件模式和硬件控制路径是否符合低功耗意图。',next:'用规格、修改后波形和回归结果完成一次独立闭环。'},
  {id:'temporal-corner',title:'时域Corner设计',level:3,trend:'emerging',evidence:'已新增时域边界场景，并开始关注模式、时间和不同设计表示的组合。',next:'形成Corner分类、选择依据、容差、超时边界和覆盖闭环。'},
  {id:'cross-team-input',title:'跨团队交付输入定义',level:3,trend:'improving',evidence:'已主动收集模拟、数字和项目侧交付信息，并推动接口波形、Verilog-A和前期资料输出。',next:'把沟通结果沉淀成模型合同、责任边界和里程碑。'},
  {id:'uvmms-research',title:'UVM-MS方法学研究',level:2,trend:'first_seen',evidence:'已完成基础资料学习，并能区分UVM-MS、RNM和模型合同的收益边界。',next:'完成真实工具链下的最小架构解释和可行性问题清单，尚不要求推广。'}
 ],
 signals:[
  {id:'sig-lowpower-transfer',title:'低功耗判断开始发生迁移',fact:'在新的掉电和软件模式场景中，不只检查输出，还追踪硬件控制路径是否应继续活动。',change:'从功能正确性检查，向设计意图和动态活动合理性判断扩展。',strength:'中',missing:'仍缺正式规格、修改后波形和回归结果。'},
  {id:'sig-corner-expansion',title:'验证范围开始扩展到时域边界',fact:'新增两个时域边界场景，并完成另一版本部分网表接入。',change:'从定向功能场景向时间、模式和表示组合扩展。',strength:'中',missing:'尚缺Corner选择依据、仿真结论和覆盖率增量。'},
  {id:'sig-model-contract',title:'开始识别模型合同而不只是模型代码',fact:'主动推动模拟侧提供接口波形和Verilog-A，并讨论行为定义、精度、校准和责任边界。',change:'从“谁来写模型”转向“模型应该满足什么、如何验收”。',strength:'强',missing:'尚未获得并分析实际交付物。'},
  {id:'sig-project-initiation',title:'开始提前定义验证启动条件',fact:'在完整网表尚未到位时，主动与项目负责人沟通行为模型提前启动和临时输入方案。',change:'从被动等待交付，向提前识别输入、依赖和延期风险发展。',strength:'中',missing:'尚未形成正式责任矩阵和项目里程碑。'},
  {id:'sig-method-opportunity',title:'出现方法学贡献机会',fact:'将UVM-MS与多模型切换、刺激监控和UVM资产复用问题联系起来。',change:'开始从个人任务思考可复用方法，但仍处于机会识别阶段。',strength:'弱',missing:'没有工具验证、代码、A/B数据或团队反馈。'}
 ],
 actions:[
  {
   id:'main-model-contract',group:'main',title:'建立片上电源类模块的模型合同',priority:'本周主线',
   why:'当前最大的风险不是“不会写模型”，而是模拟侧、数字侧和验证侧对模型范围、精度、有效条件和验收方式没有共同定义。先建立合同，能够减少后续反复修改和差异争议。',
   learn:['模型合同包含哪些字段：接口、单位、方向、默认值、状态、稳态映射、动态行为、异常、Corner、容差、已知限制和Owner。','哪些行为必须由模拟侧定义，哪些实现细节可以由验证侧抽象。','如何区分功能合同、数值合同、时间合同和不建模项目。'],
   questions:['数字系统真正能够观察到哪些模拟行为？','哪些阈值、迟滞、斜率和延迟会改变数字侧判断？','模型在哪些输入、电源、负载、模式和Corner范围内有效？','模型与Verilog-A或网表不一致时由谁判断和更新？'],
   materials:[
    {type:'经典方法',title:'Verification of Complex Analog and RF IC Designs',url:'http://www.designers-guide.com/docs/proc2006.pdf',source:'Henry Chang & Ken Kundert',use:'理解为什么模拟验证需要行为模型、自检Testbench、分层相关性和同一测试作用于模型与实现。',limit:'提供方法论，不会替你定义公司模块的具体模型合同。'},
    {type:'公开论文',title:'Early Development of UVM based Verification Environment using TLM Reference Model',url:'https://arxiv.org/abs/1408.1150',source:'Jain et al.',use:'理解在RTL或最终实现未就绪时，如何用更高层模型提前开发验证环境和测试。',limit:'对象不是模拟电源模块，也不是UVM-MS标准实践。'},
    {type:'内部必需',title:'公司批准的接口、模式、状态和模拟行为资料',url:'',source:'项目交付物',use:'这是合同字段和验收标准的最终来源。',limit:'不得上传真实接口、参数、模型或文档。'}
   ],
   selfCheck:['模型合同和模型代码有什么区别？','为什么“接口波形看起来一致”不足以证明模型可信？','哪些行为必须保留，哪些可以简化？','如何写出模型的有效范围与已知限制？','谁应该负责行为定义、实现、校准、验收和维护？'],
   output:'一份脱敏模型合同模板，并用虚拟电源模块填完端口、状态、动态行为、异常、容差、限制和Owner字段。',
   aiPrompt:'你是我的数模行为模型合同Review教练。请基于一个完全虚拟的片上电源模块，先给出接口、模式、启动、关断、valid和故障的简化说明。要求我逐项填写：端口与单位、状态、稳态关系、动态行为、阈值与迟滞、异常、Corner、数值容差、时间容差、不建模项目、校准方法、验收用例和Owner。每轮只Review一个部分，指出遗漏、不可验证表述和责任边界不清之处。不要要求或推断任何公司内部参数。'
  },
  {
   id:'main-veriloga-reading',group:'main',title:'从Verilog-A中提取可验证行为，而不是逐行翻译',priority:'本周主线',
   why:'模拟侧可能先提供Verilog-A。你需要能读懂它表达的连续时间关系和事件，但最终目标是提取影响数字系统判断的行为合同，而不是机械转换成SystemVerilog。',
   learn:['electrical节点、branch、V()/I()、analog块和贡献语句的基本含义。','transition、slew、cross、timer、ddt、idt等常见构造对应的动态行为。','参数、条件分支、限幅、阈值和状态如何影响输出。','哪些连续时间细节在SV-RNM中需要保留，哪些可以抽象。'],
   questions:['这个模型的输入输出关系是什么？','哪些状态或事件会改变方程？','输出什么时候被视为建立完成？','模型是否包含负载、电源不足、饱和、限流、迟滞或故障？','哪些语句是为了数值收敛而不是功能行为？'],
   materials:[
    {type:'语言教程',title:"The Designer's Guide to Verilog-AMS",url:'https://designers-guide.org/verilog-ams/dg-vams/index.html',source:"Designer's Guide Community",use:'按需学习Verilog-A/AMS的节点、贡献语句、事件和行为建模方式。',limit:'教程示例不能替代当前仿真器版本和模型作者说明。'},
    {type:'官方标准',title:'Verilog-AMS Language Reference入口',url:'https://www.accellera.org/downloads/standards/v-ams',source:'Accellera',use:'遇到语义不确定时查标准和版本信息，不要求通读。',limit:'语言语义正确不代表模型行为与电路实现一致。'},
    {type:'内部必需',title:'模型说明、参数表、参考Testbench和已知限制',url:'',source:'模拟侧交付',use:'确认模型作者的预期用途、有效范围和校准状态。',limit:'不上传模型源码或内部参数。'}
   ],
   selfCheck:['贡献语句和普通赋值的差异是什么？','transition和固定数字延时表达的行为有什么不同？','如何区分功能行为、模拟非理想性和数值收敛技巧？','为什么不能把每个Verilog-A内部变量都映射到SV-RNM？','拿到模型后首先要向作者确认哪五件事？'],
   output:'对一个公开或虚拟Verilog-A模型生成“接口—状态—稳态—动态—异常—限制”六栏阅读笔记。',
   aiPrompt:'你是我的Verilog-A阅读教练。请给出一个不涉及真实公司的简化电源行为模型，包含enable、目标电压、启动斜率、valid、关断放电和一个异常条件。先让我解释每个端口和analog语句，再要求我提取稳态映射、动态行为、阈值、完成条件和不需要进入SV-RNM的细节。不要直接给答案；根据我的解释逐项纠错，并最终让我输出模型合同摘要。'
  },
  {
   id:'main-correlation-plan',group:'main',title:'设计SV-RNM、Verilog-A与真实网表的相关性测试',priority:'本周主线',
   why:'SV-RNM适合高吞吐回归，Verilog-A适合连续行为参考，网表用于关键实现级确认。三者必须通过统一刺激和统一指标关联，否则模型切换后出现差异时无法归因。',
   learn:['相关性不是波形完全重合，而是针对可观察指标定义容差。','统一刺激、统一采样、统一测量窗口和统一结果格式。','稳态值、进入容差带时间、峰值、valid时刻、fault时刻和恢复时刻。','差异分类：模型抽象、参数配置、接口连接、设计变化或仿真器设置。'],
   questions:['哪些指标决定数字系统功能？','哪些差异允许存在，哪些必须一致？','容差来自规格、模型精度还是测量误差？','Corner排序是否需要一致？','网表到位后如何更新RNM而不破坏历史回归？'],
   materials:[
    {type:'经典方法',title:'Verification of Complex Analog and RF IC Designs',url:'http://www.designers-guide.com/docs/proc2006.pdf',source:'Chang & Kundert',use:'学习同一自检Testbench作用于模型和实现，以及分层相关性思想。',limit:'需要结合你们实际可运行规模和签核流程。'},
    {type:'研究案例',title:'iVAMS 1.0: Fast, Accurate Mixed-Signal Design Optimization',url:'https://arxiv.org/abs/1905.12812',source:'Mohanty & Kougianos',use:'观察行为模型如何用误差和运行时间指标与更真实表示比较。',limit:'这是PLL设计优化研究，不是UVM-MS或片上电源验证模板。'},
    {type:'内部必需',title:'模拟侧参考波形与网表校准结果',url:'',source:'项目交付物',use:'确定真实指标、Corner和容差来源。',limit:'不把内部数值输入外部AI。'}
   ],
   selfCheck:['相关性为什么不等于逐点波形相等？','怎样保证三种表示的刺激和测量一致？','哪些指标适合绝对误差、相对误差或事件时间误差？','发现差异后如何分类，而不是立即修改RNM？','如何选择少量高价值相关性用例？'],
   output:'一张三表示相关性矩阵：场景、输入、测量指标、容差来源、预期一致项、允许简化项和差异归因步骤。',
   aiPrompt:'请用一个虚拟片上稳压模块帮助我设计三表示相关性测试。表示包括SV-RNM、Verilog-A和晶体管级网表。要求我为启动、关断、模式切换、输入跌落、负载变化和故障恢复定义统一刺激、稳态指标、动态指标、数值容差、时间容差和差异分类。请挑战任何“波形看起来差不多”或“全部逐点相等”的模糊标准。'
  },
  {
   id:'aux-lowpower-closure',group:'support',title:'把低功耗疑点完成到规格—修改—回归闭环',priority:'本周辅线',
   why:'发现软件模式下硬件路径仍活动只是起点。真正的能力证据是能说明设计意图、提出检查、确认修改并用功能与活动性结果闭环。',
   learn:['模式与电源状态下的控制Owner矩阵。','功能正确、控制路径静止和实际功耗之间的区别。','掉电、重启、软件/硬件切换和旁路路径组合。','如何用波形、断言、覆盖和必要的活动率信息建立证据。'],
   questions:['软件模式下哪些路径必须失效，哪些仍承担安全或恢复职责？','掉电后重新同步valid是否为规格允许行为？','如何证明状态机或门控路径没有持续动态翻转？','修改会不会影响恢复、异常处理或其他模式？'],
   materials:[
    {type:'低功耗标准',title:'IEEE 1801-2018 Unified Power Format',url:'https://ieeexplore.ieee.org/document/8686430',source:'IEEE',use:'理解电源意图、状态和低功耗验证的标准背景；只查相关概念。',limit:'当前问题可能是RTL控制逻辑而非UPF结构，不能机械套用。'},
    {type:'内部必需',title:'低功耗Spec、模式优先级和设计实现说明',url:'',source:'公司批准资料',use:'判断哪些逻辑应活动、冻结或复位的唯一正式依据。',limit:'不上传内部状态、端口和功耗数据。'},
    {type:'自建模板',title:'模式×电源状态×控制Owner矩阵',url:'',source:'Career OS模板',use:'把“感觉不应该动”转化为可Review的控制意图。',limit:'矩阵必须由设计和规格确认。'}
   ],
   selfCheck:['功能输出正确时，为什么仍可能存在低功耗问题？','门控信号不变是否足以证明内部没有动态活动？','怎样区分设计缺陷、规格歧义和合理保留路径？','修改后至少需要哪几类回归？','什么证据可以支持你独立闭环？'],
   output:'一个脱敏的模式—状态—Owner—允许活动—禁止活动—验证方法矩阵，以及修改后回归清单。',
   aiPrompt:'请生成一个虚拟低功耗控制模块，包含软件模式、硬件模式、掉电、重启和valid同步。让我先建立模式×电源状态×控制Owner矩阵，再设计功能检查、路径静止检查、快速重启和模式切换场景。请持续追问我依据来自规格、实现还是推测，并要求我列出支持结论所需的修改后证据。'
  },
  {
   id:'aux-temporal-corner',group:'support',title:'建立时域Corner分类与有界检查方法',priority:'本周辅线',
   why:'新增两个边界Case说明你已经在扩展范围，但要形成能力，需要能够系统说明边界来自哪里、预期如何定义、Checker怎样避免假失败。',
   learn:['事件相对状态切换前/中/后的分类。','请求相位、最短间隔、快速重复操作、中断和恢复。','条件完成与有界超时的分工。','最坏延迟推导、容差和Coverpoint/Cross设计。'],
   questions:['这个Corner是规格边界、实现边界还是已知问题回归？','两个事件的相对顺序和最坏相位是什么？','为什么固定等待时间会产生假失败或掩盖问题？','如何证明边界被真正激励而不是只写了Case名？'],
   materials:[
    {type:'语言标准',title:'IEEE 1800-2023 SystemVerilog标准入口',url:'https://ieeexplore.ieee.org/document/10458102',source:'IEEE',use:'按需查事件采样、时序表达、断言和覆盖语义。',limit:'标准不提供当前设计的实际时间边界。'},
    {type:'已有学习包',title:'规格驱动的时钟切换有界延迟检查',url:'',source:'Career OS V5.4',use:'复用请求相位、边沿数、条件完成和超时分离的推导方式。',limit:'需迁移到当前模块，不能照搬时钟切换参数。'},
    {type:'内部必需',title:'状态机、接口时序和最大响应时间说明',url:'',source:'公司批准资料',use:'确定合法顺序和最大时间范围。',limit:'不上传真实时间参数或状态名。'}
   ],
   selfCheck:['怎样从事件顺序生成Corner，而不是只靠经验列Case？','条件检查和超时检查分别证明什么？','如何处理两个方向不对称的延迟？','Coverage如何证明边界相位被命中？','什么时候需要随机化，什么时候需要定向精确控制？'],
   output:'一个虚拟模块的时域Corner表：前置状态、事件A、相对时刻、事件B、预期、超时、检查器和覆盖点。',
   aiPrompt:'你是我的时域Corner训练教练。请给一个虚拟模块，包含enable、模式切换、掉电请求、valid和内部完成事件。要求我从状态切换前、中、后，最短间隔、快速重复、中断和恢复六类生成Corner；对每个Corner定义预期、条件完成、超时边界和覆盖点。不要允许我只写“多测几个边界Case”，必须追问选择依据。'
  },
  {
   id:'aux-version-attribution',group:'support',title:'管理跨版本网表接入与差异归因',priority:'本周辅线',
   why:'把另一版本部分网表嵌入当前环境可以提前验证，但也会引入接口、参数、时序和真实配置不一致，必须避免把组合问题误判为设计缺陷。',
   learn:['版本组合清单、接口契约和配置指纹。','正式配置、临时Shadow配置和仅用于定位的实验配置。','差异分类：接口、参数、编译、时序、模型和设计变化。','可复现记录和回退条件。'],
   questions:['当前组合代表未来正式交付吗？','哪些接口和参数在两个版本之间可能变化？','失败是否能在单一版本配置复现？','如何保存足够信息而不泄露内部版本细节？'],
   materials:[
    {type:'内部必需',title:'版本发布说明、接口清单和编译配置',url:'',source:'项目资料',use:'确认允许组合、已知差异和正式版本关系。',limit:'不上传版本号、文件、脚本和内部接口。'},
    {type:'自建模板',title:'跨版本配置指纹与差异分类表',url:'',source:'Career OS模板',use:'记录表示类型、来源版本、接口假设、用途、结果和回退条件。',limit:'模板不替代配置管理系统。'}
   ],
   selfCheck:['为什么混合版本通过也不能直接代表正式配置通过？','如何证明失败来自设计而不是组合不一致？','最少需要记录哪些配置元数据？','什么情况下应停止继续在临时组合上调试？'],
   output:'一份脱敏的配置指纹模板和“设计问题/模型问题/版本组合问题”归因树。',
   aiPrompt:'请构造一个虚拟验证环境：RTL来自版本A，部分网表来自版本B，Testbench来自版本C。给出一个失败现象，让我通过接口、参数、编译、时序、模型和设计变化六类进行归因。每轮只允许我选择两个检查点，并评价我是否过早把问题归因于DUT。'
  },
  {
   id:'topic-uvmms-architecture',group:'topic',title:'理解UVM-MS的架构、职责和适用边界',priority:'专题学习',
   why:'只有先能准确解释MS Proxy、MS Bridge、Bridge Core和Agent之间的职责，才能判断它是否比现有interface/wrapper方案更值得使用。',
   learn:['UVM-MS的目标是连接class-based UVM与structural mixed-signal环境。','MS Proxy提供class侧API，MS Bridge连接结构层，Bridge Core负责具体产生或测量信号。','push、pull、monitor和同步完成模式。','从已有数字UVM Agent扩展到混合信号Agent的方式。','标准化架构不等于模型准确、仿真提速或工具自动生成组件。'],
   questions:['为什么仅用virtual interface可能无法覆盖全部目标？','哪些内容必须对上层transaction保持稳定？','Bridge Core怎样随SV-RNM、Verilog-A或其他表示变化？','什么简单场景不值得引入完整结构？'],
   materials:[
    {type:'官方标准',title:'UVM Mixed-Signal Standard Version 1.0',url:'https://www.accellera.org/images/downloads/standards/uvm-ms/UVM-MS_1.0.pdf',source:'Accellera · 2025',use:'核心必读。优先阅读Overview、Architecture、Agent、Communication和迁移示例。',limit:'标准声明的是框架目标，不证明你们团队一定提效。'},
    {type:'官方社区',title:'Accellera UVM-MS Community Forum',url:'https://forums.accellera.org/forum/60-uvm-mixed-signal/',source:'Accellera',use:'查看标准解释、问题讨论和后续更新信号。',limit:'论坛回答需要结合版本和工具验证。'},
    {type:'内部必需',title:'当前UVM框架、interface/wrapper和工具支持说明',url:'',source:'公司批准资料',use:'完成现有架构与标准架构的映射。',limit:'不上传代码和工具配置。'}
   ],
   selfCheck:['用一分钟解释Proxy、Bridge和Bridge Core分别做什么。','UVM-MS和SV-RNM分别解决什么问题？','更换Bridge Core时哪些上层资产理论上不应变化？','标准没有替团队开发哪些组件？','什么情况下简单wrapper可能更合适？'],
   output:'一张现有方案与UVM-MS架构映射图，并写出采用和不采用的各三条理由。',
   aiPrompt:'你是UVM-MS标准口试官。请围绕Accellera UVM-MS 1.0对我进行逐题口试，覆盖MS Proxy、MS Bridge、Bridge Core、Agent扩展、push/pull/monitor/push-sync、模型表示切换和已知边界。每次只问一题；我回答后指出概念混淆，并要求我用一个虚拟接口举例。不要把RNM速度、模型准确性或工具能力错误归因给UVM-MS。'
  },
  {
   id:'topic-uvmms-industry',group:'topic',title:'建立UVM-MS行业证据地图，不把参与标准等同于采用',priority:'专题学习',
   why:'你希望寻找AMD、NVIDIA、MediaTek等先进团队的做法，但公开材料必须按证据强度分类，避免用标准参与、厂商宣传或招聘描述推断公司内部全面采用。',
   learn:['直接采用证据、标准参与信号、相关方法实践、工具厂商案例和二手解读的区别。','论文和演讲需要记录作者单位、场景、工具、对照方案、指标和限制。','找不到公开采用证据本身也是结论。'],
   questions:['材料是否明确写出使用UVM-MS，还是只提UVM/RNM/AMS？','是否来自公司工程师署名论文或官方演讲？','是否有可复查的工时、复用或切换数据？','案例场景与当前片上电源模块有多大可迁移性？'],
   materials:[
    {type:'标准参与信号',title:'UVM-MS 1.0 Working Group participant list',url:'https://www.accellera.org/images/downloads/standards/uvm-ms/UVM-MS_1.0.pdf',source:'Accellera · Participants',use:'可确认Intel、NXP、Qualcomm、Renesas及主要EDA厂商参与标准制定。',limit:'参与标准制定不等于公司内部正式采用，更不等于全团队提效。'},
    {type:'研究状态',title:'AMD / NVIDIA / MediaTek公开采用证据观察项',url:'',source:'公开资料检索 · 2026-07-16',use:'持续寻找公司官方技术演讲、DVCon/DAC论文和工程师署名材料。',limit:'当前未找到足以证明这三家公司正式采用UVM-MS的权威公开材料，网站不得写成已采用。'},
    {type:'相关方法',title:'Early Development of UVM Verification Environment using Reference Models',url:'https://arxiv.org/abs/1408.1150',source:'公开论文',use:'作为“提前建环境和复用验证资产”的相关方法案例。',limit:'不是UVM-MS采用证据。'}
   ],
   selfCheck:['标准参与与生产采用有什么区别？','怎样判断一篇材料能否支持“提效”结论？','工具厂商案例为什么需要额外审慎？','没有找到公开证据时应该怎样表述？','怎样记录适用范围和负向成本？'],
   output:'一个行业证据表：公司/作者、来源类型、是否直接使用UVM-MS、证明内容、不能证明内容、可迁移性和可信度。',
   aiPrompt:'你是我的半导体验证行业研究审稿人。我会提供一条公开材料的标题、摘要和来源。请判断它属于直接采用证据、标准参与信号、相关方法实践、工具厂商案例、招聘信号还是二手解读；列出它能证明和不能证明的内容，并指出需要继续查找的原始证据。禁止根据公司知名度或作者职位推断内部全面采用。'
  },
  {
   id:'topic-uvmms-poc',group:'topic',title:'设计真实工具链上的最小UVM-MS实验',priority:'专题学习',
   why:'资料理解必须落到可运行结构，但最小实验应隔离于正式交付，只验证工具支持、职责分层和调试体验，不预设提效。',
   learn:['一个transaction、driver、monitor、Proxy、Bridge和Bridge Core的最小关系。','目标值、斜率、完成事件、测量值和容差怎样进入transaction。','固定延时等待与完成事件/容差判断的差异。','工具编译、elaboration、连接、波形和错误分类。'],
   questions:['最小接口需要哪些数字控制和连续量？','哪些API应与具体模型表示无关？','怎样证明上层Test不依赖Bridge Core？','哪些工具问题足以停止投入？'],
   materials:[
    {type:'官方标准',title:'UVM-MS 1.0 Examples and Use Cases',url:'https://www.accellera.org/images/downloads/standards/uvm-ms/UVM-MS_1.0.pdf',source:'Accellera',use:'参考标准中的架构、通信和扩展示例设计最小结构。',limit:'必须按当前工具版本重新验证。'},
    {type:'内部必需',title:'当前仿真器、UVM框架和编译入口帮助',url:'',source:'公司批准工具资料',use:'确认实际支持、语言组合和调试路径。',limit:'不复制许可证、命令、路径或内部脚本。'},
    {type:'自建实验',title:'单接口双Bridge Core虚拟实验说明',url:'',source:'Career OS模板',use:'先用虚拟目标值、启动和valid完成结构验证。',limit:'Demo成功不代表真实模块提效。'}
   ],
   selfCheck:['最小实验究竟要证明什么，不证明什么？','哪些文件允许随Bridge Core变化？','怎样记录第一次学习成本和工具阻断？','为什么同一批Test跨两种表示运行才更有意义？','何时应停止而不是继续修框架？'],
   output:'一页最小实验设计：接口、组件图、两个Bridge Core假设、3—5个测试、成功标准、停止条件和记录指标。',
   aiPrompt:'请和我共同设计一个完全虚拟的UVM-MS最小实验。接口包含enable、目标real值、输出real值和valid。要求上层sequence与test不依赖具体表示，Bridge Core A使用SV-RNM思想，Bridge Core B代表另一种结构表示。请让我先定义transaction和Proxy API，再Review职责边界、同步方式、3—5个自检测试、工具验证点和停止条件。不要生成可直接用于公司项目的完整代码。'
  },
  {
   id:'reserve-rnm-template',group:'reserve',title:'沉淀可复用的SV-RNM模型与相关性模板',priority:'长期储备',
   why:'当模型合同和相关性方法经过真实场景验证后，模板才能降低下一模块的启动成本；现在先定义应沉淀什么，不急于做完整框架。',
   learn:['通用端口/状态/动态行为模板。','参数、异常注入、测量和日志接口。','模型版本、限制、校准和回归元数据。','模板通用性与模块特定行为的边界。'],
   questions:['哪些部分在不同电源类模块之间真正通用？','怎样避免首个模块的特殊行为污染通用模板？','模板如何绑定模型合同和相关性用例？','谁负责版本和兼容性？'],
   materials:[
    {type:'经典方法',title:'Verification of Complex Analog and RF IC Designs',url:'http://www.designers-guide.com/docs/proc2006.pdf',source:'Chang & Kundert',use:'复习分层模型与自检Testbench方法。',limit:'模板结构必须来自你们真实复用证据。'},
    {type:'内部证据',title:'完成后的首个模型合同、相关性报告和Debug记录',url:'',source:'未来真实产物',use:'从重复出现的字段和流程中抽取模板。',limit:'在出现第二个场景前，不声称已经可复用。'}
   ],
   selfCheck:['模板化的前提是什么？','怎样证明某字段具有跨模块通用性？','第二个使用者暴露的问题如何反馈到模板？','哪些内容必须保留为模块特定配置？'],
   output:'模板候选清单和“至少经过两个场景后才升级为团队模板”的准入规则。',
   aiPrompt:'请作为方法学模板Review者，帮助我从两个完全虚拟的片上电源模型合同中抽取共同结构。要求区分通用字段、可配置字段和模块专用字段；为每个候选模板项说明至少需要什么跨场景证据，避免仅根据第一个模块过度抽象。'
  }
 ],
 topics:[
  {id:'uvmms',title:'UVM-MS验证方法学研究',summary:'从标准架构、公开证据到真实工具链最小实验；默认只显示一句话，完整试点方案按需展开。'},
  {id:'model-correlation',title:'Verilog-A、SV-RNM与网表相关性',summary:'学习如何从连续行为中提取模型合同，并用统一刺激与指标建立相关性。'},
  {id:'lowpower-time',title:'低功耗与时域边界验证',summary:'把设计意图、模式控制、边界时刻、Checker和回归结果连接成闭环。'},
  {id:'course',title:'16周专业课程与工程工具',summary:'保留原有课程和学习资料，但默认收起，不与本周行动争夺注意力。'}
 ]
};
