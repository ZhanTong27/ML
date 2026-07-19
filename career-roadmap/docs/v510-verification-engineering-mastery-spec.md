# Career OS V5.10.0 — Verification Engineering Mastery

## 1. 定位

新增第四条并行个人学习 Track：

- OCLDO Verification
- UVM-MS
- CRG Architecture & Verification
- **Verification Engineering Mastery**

中文名称：**验证工程全流程、工具链与资深方法专项**。

该 Track 不属于工作项目管理模块，不追踪公司任务、回归进度、网表交付、Bug关闭或Sign-off状态。它只使用公开、合成和脱敏材料，系统培养验证工程的通用知识、工具能力和资深判断。

## 2. 三个 Package

### Package A — Cross-Stage Verification, Role & Collaboration

目标：理解芯片从产品需求、架构、RTL、综合、DFT、后端、后仿、软件、Tape-out到Silicon/ATE的完整证据链，并明确验证工程师在每个环节：

- 与谁交互；
- 接收什么；
- 交付什么；
- 可以提供什么证据；
- 不能独立决定什么；
- 应主动提出什么问题。

章节：

1. Product、Architecture与Verifiability
2. Microarchitecture、RTL与Design Review
3. IP、Subsystem与SoC集成
4. Synthesis、STA与Timing Constraints
5. DFT、Scan与Test Mode
6. Place & Route、Extraction与Post-Simulation
7. Firmware与HW/SW Co-verification
8. Closure、Sign-off与Tape-out
9. Silicon Bring-up、IPTEST与ATE

每章统一包含 `Verification Interaction Card`：角色、关系、接收物、输出物、主动问题和责任边界。

### Package B — Verification Toolchain & Engineering Productivity

目标：系统培养验证工具链能力，不把软件训练缩减为命令清单。

章节：

1. Linux与Shell for Verification
2. VCS Build、Run与Performance
3. Verdi Navigation与高效Debug
4. PrimeSim XA与AMS工具使用
5. Regression Engineering
6. Coverage Collection与Closure
7. Automation、Python、Make与Git

课程重点：

- 先讲工具执行模型；
- 再讲常用工作流；
- 再讲效率技巧；
- 再讲Failure Taxonomy；
- 最后讲如何从日志确认选项真正生效。

具体命令、开关和许可证能力必须以用户本机版本的 `-help`、授权文档和公司Wrapper为准。网站不把某个版本命令写成永久通用结论。

### Package C — Senior Verification Reasoning & Industry Practice

目标：展示资深验证工程师如何组织问题，而不是只提供更多测试技巧。

章节：

1. Senior Verification Mental Model
2. Feature→Risk→Verification Strategy
3. Facts、Hypotheses与Alternative Explanations
4. First Divergence与Propagation Chain
5. Root Cause Taxonomy
6. Checker & Measurement Engineering
7. Coverage as Unproven Space
8. Regression as Feedback System
9. Method Selection & Evidence Independence
10. Sign-off、Risk Communication与Technical Influence

每章必须展示：

- Junior Approach；
- Senior Approach；
- Decision Point；
- Common Trap；
- Reusable Question Set。

## 3. 教学顺序

每章固定采用以下顺序：

1. **Lecture**：AI完整讲解概念、结构、工程意义和边界；
2. **Verification Relationship**：说明与验证工作的关系，但不引用内部项目；
3. **Interaction Map**：说明可能交互的角色、输入和输出；
4. **Tool Walkthrough**：涉及软件时讲执行路径、技巧和诊断；
5. **Guided Reading**：说明为什么读、读哪里、带着什么问题；
6. **Senior Commentary**：展示资深工程师的思考方式；
7. **Industry Case**：分析公开团队的方法、输入、收益、成本和适用边界；
8. **Knowledge Files**：沉淀Guide、Map、Matrix、Checklist、FAQ和Case Card；
9. **Guided Example**：AI先完整讲一个公开或合成案例；
10. **Assessment**：默认锁定，最后才验证掌握程度。

Assessment不是教学主体，也不得因为工作中做过相似任务而自动通过。

## 4. 工作分离规则

1. Track不显示内部项目、模块代号、代码、信号、波形、参数、路径和工具配置。
2. Daily记录只能生成`Prior Knowledge`或调整学习优先级。
3. 工作任务完成不自动完成Chapter。
4. 工作能力由真实交付、独立程度、迁移和外部反馈评价。
5. Track能力由公开学习、知识文件、合成案例和最终Assessment评价。
6. 课程目的不是帮助用户完成当前具体任务，而是建立完整、长期、可迁移的验证知识体系。

## 5. 阅读材料数据合同

每份材料保存：

```json
{
  "id": "",
  "type": "官方标准/厂商官方/开源方法学/公开行业案例",
  "title": "",
  "url": "",
  "source": "",
  "authority": "core|reference|frontier",
  "whyRead": "",
  "readSections": [],
  "keyQuestions": [],
  "limits": "",
  "lastVerified": "YYYY-MM-DD",
  "status": "verified"
}
```

首批核心来源：

- GNU Bash Reference Manual
- Git官方文档
- Synopsys VCS产品与能力页
- Synopsys Verdi产品与能力页
- Synopsys Verdi VMS
- Synopsys PrimeSim XA
- OpenTitan Verification Methodology
- Accellera UVM-MS 1.0
- Accellera Verilog-AMS 2023
- Accellera UCIS

首批行业案例：

- OpenTitan公开DV方法学
- Samsung Semiconductor公开Clock Monitor与ACRMG案例
- NXP公开Reset Sweep案例
- Advantest、Qualcomm、Cadence公开DV/Silicon/ATE统一环境案例
- DVCon公开AI/ML Regression Triage案例

行业案例必须显示`cannotProve`，防止将单一论文扩大为公司统一实践。

## 6. 每章知识文件

每章不是只有完成状态，至少对应若干可持续维护的文件：

- Concept Guide
- Architecture/Flow Map
- Role & Responsibility Matrix
- Checklist
- Failure Taxonomy
- Decision Tree
- FAQ
- Reading Note
- Industry Practice Card
- Senior Reasoning Card

Package级最终资产：

### Package A

- Architecture-to-Verification Map
- IP–Subsystem–SoC Responsibility Matrix
- DV–STA Interaction Guide
- DV–DFT Responsibility Map
- Post-Simulation Intake Checklist
- Hardware–Software Interaction Map
- Verification Closure Dossier
- Verification-to-ATE Handoff Guide
- Silicon Correlation Evidence Map

### Package B

- Linux for Verification Engineers
- VCS Build Taxonomy
- Verdi Hierarchical Debug Workflow
- PrimeSim XA/SPICE Deck Guide
- Regression Architecture Guide
- Coverage Closure Dossier
- Verification Automation Guide

### Package C

- Senior Verification Question Bank
- Feature-to-Risk Guide
- Evidence Reasoning Handbook
- First Divergence Guide
- Root Cause Taxonomy
- Checker & Measurement Engineering Handbook
- Coverage Hole Decision Tree
- Senior Regression Triage Guide
- Method Capability Matrix
- Risk Communication Template

## 7. 状态模型

Track状态：

- `not_started`
- `learning`
- `reading`
- `knowledge_building`
- `guided_example`
- `assessment_ready`
- `assessment_pending`
- `needs_reinforcement`
- `completed`
- `paused`

Chapter状态记录：

- Lecture是否完成；
- 已阅读材料ID；
- 已生成知识文件；
- Guided Example状态；
- Notes；
- Assessment状态和Review。

首次安装前备份本地状态：

`zhantong-career-os-v5-pre-v510-verification-mastery`

## 8. 网站信息架构

第四Track作为独立Section显示在现有专业Track附近。

页面结构：

- Track Hero：定位、三条核心问题、教学原则、工作分离规则；
- Package Tabs：三个Package平行切换；
- Chapter Navigation：章节列表与状态；
- Chapter Detail：Lecture、与验证的关系、角色交互、导读、资深视角、工具路径、知识文件；
- Industry Practice Library：仅在Package C显示；
- Assessment Policy：折叠显示，默认锁定。

## 9. 当前Draft内容

本分支已包含：

- `v510-verification-mastery-data.js`：完整Track、三个Package、26个章节、阅读资料和行业案例数据；
- `v510-verification-mastery-state.js`：状态、备份和工作分离数据模型；
- `v510-verification-mastery-ui.js`：网站渲染骨架；
- 本规格文件。

正式合并前仍需：

1. 将三个JS文件加入`build_single_file.py`；
2. 重新生成`index.html`；
3. 运行`node --check`；
4. 在Desktop Chromium与Mobile WebKit检查布局；
5. 检查所有外部资料链接；
6. 决定是否在顶部版本标识升级到V5.10.0；
7. 决定首页只显示Track入口还是直接展示完整章节。

## 10. 验收标准

- 新Track与OCLDO、UVM-MS、CRG明确平行；
- 三个Package全部可导航；
- Package A每章包含验证关系和角色交互；
- Package B覆盖Linux、VCS、Verdi、XA、Regression、Coverage和Automation；
- Package C包含资深视角和公开行业案例；
- 所有Assessment默认锁定；
- 工作内容不能自动推进学习状态；
- 公开资料均标明用途和限制；
- 手机端无横向溢出；
- 旧Career OS数据不丢失。
