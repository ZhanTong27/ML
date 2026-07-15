window.AMS_FRONTIER_V55={
 version:'5.5',
 title:'AMS Verification Frontier Track',
 principle:'独立于当前工作任务，用公开标准、论文和行业信号建立数模混合验证认知。',
 publicSignal:{
  title:'公开行业信号',
  text:'UVM-MS 1.0的标准化参与者公开包括Cadence、Intel、NXP、Qualcomm、Renesas、Siemens EDA和Synopsys。这里仅说明它们参与了标准制定，不等同于断言每家公司已在所有项目全面部署。',
  organizations:['Cadence','Intel','NXP','Qualcomm','Renesas','Siemens EDA','Synopsys']
 },
 maturity:[
  {id:'uvm-ms',name:'UVM-MS 1.0：统一AMS验证组件',level:'标准已发布',summary:'把数字中心的UVM扩展到混合信号驱动、监测、Scoreboard和Coverage，并通过MS bridge连接class-based与structural环境。',why:'它代表AMS验证从各团队自建胶水代码走向可复用组件和统一架构。',questions:['MS bridge、proxy和agent分别解决什么问题？','模拟值是连续监测、事件查询还是量化后进入UVM？','哪些数字UVM组件可以复用，哪些必须成为mixed-signal aware？'],source:'Accellera UVM-MS 1.0',url:'https://www.accellera.org/images/downloads/standards/uvm-ms/UVM-MS_1.0.pdf'},
  {id:'sv-msi',name:'SystemVerilog Mixed-Signal Interface Types',level:'标准制定中',summary:'Accellera正在推动SystemVerilog原生支持logic、UDN、real和analog/electrical之间的单向与双向连接、转换和resolution。',why:'这针对当前connect module和跨语言连接在复杂SoC中的可用性与一致性问题。',questions:['为什么双向mixed-signal net比单向采样复杂？','UDN、real与electrical的语义差异是什么？','标准化接口如何减少vendor-specific glue？'],source:'Accellera SystemVerilog MSI Working Group',url:'https://www.accellera.org/activities/systemverilog-mixed-signal-interface-types'},
  {id:'multi-fidelity',name:'多精度模型与相关性闭环',level:'成熟方法',summary:'以行为模型、RNM、Verilog-AMS和晶体管级网表形成模型梯度；系统回归使用快模型，关键场景使用mixed-level或网表，并持续比较模型与实现。',why:'先进AMS验证的核心不是选择唯一模型，而是证明每种模型在其有效范围内可信。',questions:['模型合同如何声明Purpose、Accuracy和Excluded Effects？','哪些场景必须做model-to-netlist correlation？','如何识别快速模型造成的假通过？'],source:'Analog verification hierarchy and model correlation methodology',url:'http://www.designers-guide.com/docs/proc2006.pdf'},
  {id:'corner-search',name:'连续空间Coverage与智能Corner搜索',level:'研究到试点',summary:'模拟输入、负载、频率和PVT形成连续空间，普通随机难以定义和命中Corner；研究开始使用频域启发式与Bayesian Optimization引导仿真。',why:'它把“跑很多Corner”升级为可度量的搜索问题，重点寻找接近失败边界的区域。',questions:['AMS Coverage的目标如何从连续量中定义？','Bayesian Optimization的objective和constraint如何构造？','如何防止代理模型漏掉不连续失效区？'],source:'Sanyal et al., Biasing Random Simulation for AMS Corner Cases',url:'https://arxiv.org/abs/2104.14785'},
  {id:'formal-hybrid',name:'非线性与Hybrid-System形式验证',level:'研究前沿',summary:'用灵敏度、可达性和simulation-driven verification分析包含非线性ODE、离散切换与输入的模拟/混合系统。',why:'它探索仿真难以穷举的亚稳态、恢复时间和非线性边界，但可扩展性仍是限制。',questions:['连续状态可达集与数字状态空间有什么差异？','灵敏度为什么会决定验证保守度？','哪些AMS模块适合低维形式化，哪些仍只能以仿真为主？'],source:'Fan et al., Verifying nonlinear AMS circuits with inputs',url:'https://arxiv.org/abs/1803.02975'},
  {id:'federated',name:'Federated Simulation与跨工具协同',level:'新兴标准方向',summary:'Accellera正在制定开放的联邦仿真基础设施，使不同模型、仿真器、软件栈、环境模型和硬件在环能够被分布式编排。',why:'未来复杂SoC验证不只连接数字和模拟求解器，还要连接软件、物理环境、供应链模型与不同工具。',questions:['跨仿真器时间同步由谁控制？','数据交换与同步协议如何分离？','如何处理确定性、回放和IP保护？'],source:'Accellera Federated Simulation Standard WG',url:'https://www.accellera.org/activities/working-groups/federated-simulation'},
  {id:'ai-ams',name:'AI辅助AMS设计与验证',level:'研究观察',summary:'当前公开研究集中在论文信息提取、仿真方案生成、Testbench生成、外部仿真闭环、参数优化和快速metamodel，而不是让LLM独立签核。',why:'真正有价值的方向是让AI调用确定性仿真器并读取可验证结果，而不是只生成看似合理的代码。',questions:['AI输出怎样通过编译、仿真和Golden结果约束？','LLM与模板、DSL、知识库的职责如何分开？','如何评估未见拓扑上的泛化和稳定性？'],source:'AnalogTester / AMS sizing agents / ACDC / iVAMS',url:'https://arxiv.org/abs/2507.09965'}
 ],
 readings:[
  {id:'r-uvmms-standard',group:'标准主线',priority:'必读',title:'UVM Mixed-Signal Standard 1.0',authors:'Accellera',year:'2025',why:'看架构图、bridge、agent、scoreboard/coverage和通信模式，不需要第一次通读所有API。',url:'https://www.accellera.org/images/downloads/standards/uvm-ms/UVM-MS_1.0.pdf'},
  {id:'r-msi-wg',group:'标准主线',priority:'必读',title:'SystemVerilog Mixed-Signal Interface Types WG',authors:'Accellera',year:'current',why:'理解行业为什么仍在解决logic/UDN/real/electrical的双向连接标准化。',url:'https://www.accellera.org/activities/systemverilog-mixed-signal-interface-types'},
  {id:'r-federated',group:'标准主线',priority:'观察',title:'Federated Simulation Standard WG',authors:'Accellera',year:'2024—',why:'建立跨仿真器、软件和物理环境协同的未来视角。',url:'https://www.accellera.org/activities/working-groups/federated-simulation'},
  {id:'r-kundert',group:'方法学基础',priority:'必读',title:'Verification of Complex Analog and RF IC Designs',authors:'Henry Chang, Ken Kundert',year:'2007',why:'理解模型—实现—Spec三角验证、层级化和mixed-level simulation。',url:'http://www.designers-guide.com/docs/proc2006.pdf'},
  {id:'r-corner',group:'前沿验证',priority:'必读',title:'Methodology for Biasing Random Simulation for Rapid Coverage of Corner Cases in AMS Designs',authors:'Sanyal et al.',year:'2021',why:'用工业LDO案例理解频域启发式和Bayesian Optimization如何寻找连续Corner。',url:'https://arxiv.org/abs/2104.14785'},
  {id:'r-formal',group:'前沿验证',priority:'进阶',title:'Verifying Nonlinear Analog and Mixed-Signal Circuits with Inputs',authors:'Fan et al.',year:'2018',why:'理解simulation-driven formal、灵敏度和非线性hybrid model。',url:'https://arxiv.org/abs/1803.02975'},
  {id:'r-analogtester',group:'AI观察',priority:'必读',title:'AnalogTester: Automatic Analog Testbench Generation with LLMs',authors:'Chen et al.',year:'2025',why:'直接包含Op-Amp、BGR和LDO，观察知识提取—仿真方案—代码生成的完整链路。',url:'https://arxiv.org/abs/2507.09965'},
  {id:'r-agent-sizing',group:'AI观察',priority:'进阶',title:'LLM-based AI Agent for Sizing of Analog and Mixed Signal Circuit',authors:'Liu et al.',year:'2025',why:'观察LLM如何调用外部仿真和数据分析函数，以及成功率仍有限的现实。',url:'https://arxiv.org/abs/2504.11497'},
  {id:'r-acdc',group:'AI观察',priority:'批判阅读',title:'LLMs for Analog Circuit Design Continuum',authors:'Esfandiari et al.',year:'2025',why:'重点看格式敏感、输出不稳定和未见电路泛化不足，而不是只看成功案例。',url:'https://arxiv.org/abs/2512.09199'},
  {id:'r-ivams',group:'AI观察',priority:'观察',title:'iVAMS 3.0: ML Metamodel Integrated Verilog-AMS',authors:'Mohanty, Kougianos',year:'2025',why:'了解Kriging、ANN和PSO如何形成快速、variation-aware的AMS metamodel。',url:'https://arxiv.org/abs/2506.01045'}
 ],
 ocldo:{
  term:'公开文献中更常写作Output-Capacitorless LDO、Output Capacitor-Less LDO、Capacitor-Free LDO或OCL-LDO。',
  oralNote:'“MPK”未作为公开术语检索到；可能是口述中的P.K.T. Mok，但需用户确认。',
  thesis:'OCL-LDO不是简单地删除外部电容，而是把输出极点、补偿、负载范围、瞬态响应与静态功耗之间的矛盾重新放回片上电路解决。',
  families:[
   {name:'DFC / Miller / Multi-stage Compensation',focus:'用阻尼因子控制、Miller或多级补偿保证不同负载下稳定；代价通常是带宽、面积、静态电流或复杂度。'},
   {name:'FVF与Multi-loop Architecture',focus:'利用Flipped Voltage Follower、局部快环和全局慢环提升负载瞬态，同时需要审查多环稳定性与模式切换。'},
   {name:'Adaptive / Dynamic Bias',focus:'在大负载变化时临时提高驱动能力，在稳态降低Iq；验证重点是触发边界、退出条件和不同负载区间。'},
   {name:'Fast Transient / Spike Detection',focus:'检测输出偏差并直接加速pass device控制；需要关注误触发、过冲、恢复和额外路径的稳定性。'}
  ],
  papers:[
   {id:'o-mok-2003',priority:'经典',title:'A Capacitor-Free CMOS Low-Dropout Regulator with Damping-Factor-Control Frequency Compensation',authors:'K.N. Leung, P.K.T. Mok',year:'2003',why:'OCL-LDO经典工作之一，用来理解为什么无大输出电容后稳定性补偿成为核心。',url:'https://doi.org/10.1109/JSSC.2003.817256'},
   {id:'o-li-2014',priority:'基础',title:'Design of a Capacitor-Less Low-Dropout Voltage Regulator',authors:'X.R. Li et al.',year:'2014',why:'展示Miller补偿、相位裕量和快速瞬态电路之间的关系。',url:'https://arxiv.org/abs/1405.0806'},
   {id:'o-engur-2023',priority:'近年设计',title:'A 0.21-ps FOM Capacitor-Less Analog LDO with Dual-Range Load Current',authors:'Y. Engur, M. Shoaran',year:'2023',why:'用FVF、双反馈环和双负载区间理解近年OCL-LDO的速度—功耗折中。',url:'https://arxiv.org/abs/2310.18998'},
   {id:'o-analogtester-2025',priority:'AI交叉',title:'AnalogTester',authors:'Chen et al.',year:'2025',why:'该框架把LDO作为自动Testbench生成对象之一，可用于观察AI如何从论文抽取测试知识。',url:'https://arxiv.org/abs/2507.09965'}
  ],
  cognition:[
   '先理解环路、极点/零点和负载相关稳定性，再理解数字控制接口。',
   '把steady-state、transient、stability、PSRR/noise、dropout、Iq和area视为相互制约的多目标空间。',
   '论文中的单一FOM不能代替完整比较，必须检查负载阶跃、边沿速度、输出电容、Iq、工艺和测试条件。',
   '验证视角需要把连续输入空间、测量提取、PVT/Monte Carlo、启动/关断、保护和模型相关性连接起来。',
   'AI可以帮助提取论文参数、生成测试骨架和寻找Corner，但结果仍需仿真器、Golden数据和人工审查。'
  ]
 },
 track:[
  {id:'c1',title:'Chapter 1 · 行业架构',output:'画出UVM-MS、structural AMS、RNM、netlist和scoreboard/coverage的关系图。'},
  {id:'c2',title:'Chapter 2 · 模型可信度',output:'建立Model Fidelity Ladder与model-to-netlist correlation矩阵。'},
  {id:'c3',title:'Chapter 3 · 连续Corner与Formal',output:'比较随机、覆盖引导、Bayesian Optimization和hybrid formal的适用边界。'},
  {id:'c4',title:'Chapter 4 · AI与联邦仿真',output:'写一页“AI能做什么、不能做什么、怎样获得确定性证据”。'},
  {id:'c5',title:'Chapter 5 · OCL-LDO公开案例',output:'形成架构族—性能权衡—验证维度—公开论文四列表。'}
 ]
};