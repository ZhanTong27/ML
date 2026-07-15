window.PROFILE_V50={
 displayName:'Zhantong',officialName:'Tong Zhan',target:'SoC / 数字IC验证工程师',
 education:[
  {time:'2024.09—2026.06',title:'Lund University · Electronic Design（电子设计）硕士',detail:'Degree of Master of Science (120 credits)；Main Field of Study: Electronic Design；学业于2026年6月5日完成。'},
  {time:'2020.09—2024.07',title:'东南大学 · 电子科学与技术 本科',detail:'本科成绩信息待以正式成绩单统一确认，公开版本暂不展示冲突GPA。'}
 ],
 experiences:[
  {time:'2026.07—至今',title:'DJI（大疆）· SoC / 数字IC验证工程师',detail:'在SoC IP验证团队承担模块级与系统级验证任务，当前项目覆盖频率监控、时钟复位、快速电压跌落检测、混仿、形式化、IPTEST与验证规划。',abilities:['SoC验证','SystemVerilog/UVM','RAL','UT/ST','Debug','FPV','混仿','IPTEST']},
  {time:'2023.12—2024.06',title:'英特尔亚太研发公司 · GPU技术支持工程师',detail:'参与IPEX与OpenVINO相关AIPC场景验证，使用Python构建自动化测试工具和场景化验证矩阵，并参与GPU性能、稳定性与散热测试。',abilities:['GPU验证','Python自动化','AIPC','OpenVINO','性能测试']}
 ],
 summary:'Electronic Design（电子设计）硕士背景，当前从事SoC与数字IC验证。能力建设聚焦模块与系统验证、Clock/Reset、Formal、Mixed-Signal、Coverage Closure、验证自动化与AI原生验证工作流。'
};
window.addEventListener('load',()=>{try{const r=S.resume||{};r.target=PROFILE_V50.target;r.summary=PROFILE_V50.summary;r.education=structuredClone(PROFILE_V50.education);r.experiences=structuredClone(PROFILE_V50.experiences);r.sourceVersion='career-profile-v50-single-source';r.version='Career OS V5.0 Canonical Profile';S.resume=r;S.profileV50=structuredClone(PROFILE_V50);save()}catch(e){console.error('Profile V5.0 failed',e)}},{once:true});