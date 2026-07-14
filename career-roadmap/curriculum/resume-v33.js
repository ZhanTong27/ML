window.addEventListener('load',()=>{try{installResumeV33()}catch(e){console.error('Resume V3.3 failed',e)}},{once:true});

function installResumeV33(){
  const resume={
    sourceVersion:'resume-upload-2026-07-14',
    filename:'詹彤_东南大学_LUND_硕士.pdf',
    version:'2026年7月上传简历',
    target:'SoC / 数字IC验证工程师',
    summary:'电子科学与嵌入式电子工程背景，具备从RTL开发、UVM验证、FPGA验证到综合与PnR的完整项目实践。熟悉SystemVerilog/UVM、Verilog、C/Python/Tcl/Bash/Makefile及主流数字设计验证工具链，曾参与RISC-V SoC、CNN加速器、数字滤波器和GPU应用验证相关工作。',
    education:[
      {time:'2024.09—2026.06',title:'Lund University · 嵌入式电子工程 硕士',detail:'Embedded Electronics Engineering；聚焦数字IC、SoC、验证与后端实现。'},
      {time:'2020.09—2024.06',title:'东南大学 · 电子科学与技术 本科',detail:'GPA 84.6/100。'}
    ],
    experiences:[
      {time:'2025.07—至今',title:'民华微电子科技有限公司 · FPGA验证工程师',detail:'基于Xilinx Kintex-7 XC7K325T平台进行GPIO、PWM、UART等外设寄存器级验证与波形观测；编写裸机C SDK，将寄存器操作封装为可复用的.h/.c接口，提升外设验证与主控调用效率。',abilities:['FPGA验证','寄存器级验证','Vivado','JTAG','裸机C','SDK封装']},
      {time:'2023.12—2024.06',title:'英特尔亚太研发公司 · GPU技术支持工程师',detail:'参与IPEX与OpenVINO相关AIPC场景验证，完成多类生成式AI模型在Arc GPU上的量化部署；使用Python构建多线程自动化测试工具和场景化验证矩阵，并参与GPU基准、游戏性能、稳定性与散热测试。',abilities:['GPU验证','Python自动化','AIPC','OpenVINO','性能测试','需求协作']}
    ],
    projects:[
      {time:'2025.02—2025.06',title:'面向ML加速的RISC-V SoC',role:'团队负责人',background:'面向机器学习加速场景的RISC-V SoC课程与团队项目。',scope:'完成SRAM替换与读写验证、3×3/5×5卷积IP设计及AMBA3-APB集成；搭建UVM验证并覆盖APB、DMA、FIFO、MAC场景；负责综合、Floorplan、CTS、布局布线与时序收敛。',challenge:'同时覆盖RTL设计、验证自动化、功能覆盖率及65nm后端实现，确保卷积数据通路和系统集成闭环。',process:'使用ModelSim开展功能验证，编写Tcl/Makefile自动化仿真；以SystemVerilog/UVM构建验证场景和覆盖模型；使用Cadence Genus与Innovus完成综合和PnR，并通过SDC约束跨域时序。',result:'卷积IP语句、分支及功能覆盖率达到95%以上；完成65nm工艺下的综合、布局布线和时序收敛。',abilities:['RISC-V SoC','SystemVerilog/UVM','APB','DMA/FIFO/MAC','Tcl/Makefile','Genus/Innovus','PnR'],publicBoundary:'仅展示课程项目的公开技术概述，不包含受限代码、网表或环境文件。'},
      {time:'2024.06—2024.09',title:'面向CNN加速器的UVM验证',role:'团队成员',background:'对CNN加速器开展模块级、子系统级及IP级多层级验证。',scope:'分别为KPE、LPE、regif搭建UVM环境；验证DDR与Weight/Global/Local Buffer之间的数据搬运和握手时序；串联CNN卷积全流程并结合中断环境驱动操作。',challenge:'在统一平台内覆盖多个模块、数据搬运子系统及端到端卷积流程，同时形成高覆盖率与可重复回归。',process:'基于VCS完成仿真，使用covergroup和交叉覆盖验证主控信号、精度及模式组合；通过Makefile集成RTL编译、C模型编译、仿真与覆盖率报告。',result:'KPE、LPE、regif的line/fsm/branch/condition/toggle覆盖率均达到98%以上，全局功能点覆盖率达到100%。',abilities:['UVM验证架构','VCS','DPI-C','覆盖率','DDR与Buffer数据通路','自动化回归'],publicBoundary:'仅展示项目结构、验证方法和公开覆盖率结果。'},
      {time:'2023.12—2024.06',title:'针对ΣΔ ADC的多级数字抽取滤波器设计',role:'项目负责人',background:'为ΣΔ ADC设计CIC、ISOP和半带滤波器组成的多级数字抽取链路。',scope:'完成核心滤波模块的Verilog设计、Quartus综合、ModelSim RTL及时序仿真，并使用MATLAB/Simulink搭建算法验证平台。',challenge:'需要在算法模型、RTL实现和FPGA验证之间保持滤波器结构与频率响应的一致性。',process:'使用MATLAB Filter Designer生成滤波器参数与响应，结合Simulink验证抽取链路，再完成Verilog实现与时序仿真。',result:'完成多级数字抽取滤波器的算法模型、RTL设计、综合与仿真验证闭环。',abilities:['Verilog','数字信号处理','MATLAB/Simulink','Quartus','ModelSim','FPGA'],publicBoundary:'可公开展示项目架构、工具链和验证方法。'}
    ],
    skills:[
      'Verilog','SystemVerilog','UVM','Python','Tcl','Bash','Makefile','C/C++','汇编',
      'Vivado','Quartus','ModelSim','VCS','Cadence Genus','Cadence Innovus','Linux',
      'MATLAB/Simulink','COMSOL','Altium Designer','Xilinx Kintex-7 XC7K325T',
      'AXI','AMBA3-APB','JTAG','UART','I²C','GPIO','SPI','PWM','UVM TLM','DPI-C',
      '团队协调与学生组织经历'
    ],
    awards:[],
    versions:[
      {name:'2026年7月上传简历',date:'2026-07-14',target:'SoC / 数字IC验证方向',changes:'根据上传的一页中文简历更新教育、两段实习、三项芯片项目和完整工具技能；公开网站不展示手机号与邮箱。'}
    ],
    candidates:[]
  };
  if(!S.resume||S.resume.sourceVersion!==resume.sourceVersion){S.resume=resume;save()}
  renderResume();
}
