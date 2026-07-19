# V5.10.0 Draft Review Status

## 当前定位

本Draft已经把第四条并行Track **Verification Engineering Mastery** 整理成可运行的网站课程结构，但尚未合并到正式网站。

当前完成的是：

- Track与三个Package的信息架构；
- 26个Chapter的讲授范围、验证关系、角色交互、导读问题、资深视角、工具路径和知识文件清单；
- 首批官方/公开阅读资料索引及适用边界；
- 五组公开行业案例及`cannotProve`限制；
- 学习状态、浏览器本地备份和Assessment锁定逻辑；
- “成长 → 验证工程”独立入口；
- 桌面和移动端页面骨架。

当前尚未声称完成：

- 26章逐章的完整长篇Lecture正文；
- 每份阅读材料的全文导读笔记；
- 所有Knowledge Files的实际正文；
- Guided Example的完整案例讲解；
- Package Assessment Prompt与题库；
- 用户学习后的真实课程进度和能力评价。

这些内容应在课程结构确认后逐章生产，不应为了快速上线用简短卡片替代完整讲授。

## 网站入口

Draft中的正式入口为：

`成长 → 验证工程`

它与以下成长视图并列：

- 本周成长
- 学习专题
- 能力与证据
- 复盘档案
- 验证工程

进入后可在三个Package之间切换，并在左侧/移动端章节导航中选择Chapter。

## 专用验收结果

V5.10专用浏览器验收已经通过：

- Desktop Chromium：通过；
- iPhone WebKit：通过；
- 页面错误：0；
- 横向溢出：0；
- Package数量：3；
- Chapter数量：9 / 7 / 10；
- 工作分离规则：5条；
- Assessment：全部保持`locked`；
- Package B中可见VCS、Verdi和PrimeSim XA；
- Package C中可见5组公开行业案例。

测试Artifact：`career-os-v510-acceptance`，对应Draft构建运行 `29684086690`。

## 合并前需要用户Review的内容

1. Track正式名称是否保留为`Verification Engineering Mastery`；
2. 三个Package名称是否保持当前版本；
3. “成长 → 验证工程”是否作为长期入口；
4. Package A的九章边界是否完整；
5. Package B是否还需要加入其他公司常用工具类别；
6. Package C中行业案例的比例是否合适；
7. 第一批正式编写的Lecture从哪个Chapter开始；
8. 正式上线时是否将全站版本标识升级到V5.10.0。

## 工作分离确认

本Track继续执行以下边界：

- 不跟踪内部项目进度；
- 不使用内部代码、网表、波形、参数、路径、配置和Sign-off标准；
- 工作接触只进入Prior Knowledge；
- 工作任务完成不自动完成Chapter；
- 课程进度只来自公开学习、知识文件、合成案例和最终Assessment。
