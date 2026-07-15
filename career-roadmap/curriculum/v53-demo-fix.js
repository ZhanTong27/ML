window.addEventListener('load',()=>{try{applyV53DemoFix()}catch(e){console.error('V5.3 Demo fix failed',e)}},{once:true});
function applyV53DemoFix(){
 if(typeof DEMO_STEPS_V42==='undefined')return;
 DEMO_STEPS_V42.splice(0,DEMO_STEPS_V42.length,
  {view:'today',selector:null,kicker:'WELCOME',title:'4分钟看懂 Career OS V5.3',text:'网站保存每日原始记录，并把工作中暴露的问题转换成学习材料。它不管理你在公司的项目状态。',you:'每天自然口述，最后说“口述结束”。',ai:'整理工作记录、Diagnosis和能力补足建议。',site:'永久保存原始记录，并展示后续学习转换。'},
  {view:'today',selector:'[data-quick="daily"]',kicker:'STEP 1 · DAILY INPUT',title:'继续用自然语言口述',text:'你不需要自己先运行Prompt。直接在同一对话中口述当天做了什么、遇到什么问题、哪里不理解，最后说“口述结束”。',you:'只负责提供真实、脱敏的事实。',ai:'自动使用最新Daily结构完成分析。',site:'接收整理后的结构化更新。'},
  {view:'today',selector:'#daily-history-v53',kicker:'STEP 2 · ORIGINAL RECORD',title:'原始记录永远保留',text:'7月13日、14日和以后每一天都在每日记录档案中。工作事实不会因为后续分析模式改变而消失。',you:'按日期回看当时真实发生的事情。',ai:'不覆盖原始事实，只能新增分析。',site:'按日期保存工作项、过程和当时的问题。'},
  {view:'today',selector:'#problem-learning-v52',kicker:'STEP 3 · LEARNING CONVERSION',title:'问题转换成学习补足',text:'系统从工作问题中挑选重要能力缺口，提供正式材料、15分钟、60分钟、2小时方案、迁移练习和自测。',you:'按时间选择最合适的学习深度。',ai:'负责知识地图、材料解释、训练和纠错。',site:'保存学习建议，不跟踪工作修复状态。'},
  {view:'growth',selector:'#weekly-command-v50',kicker:'STEP 4 · WEEKLY PRIORITY',title:'不要每天把所有问题都学一遍',text:'Daily可以产生多个学习建议，但只有周复盘会判断哪些值得进入本周主线。其余内容留在资料库按需使用。',you:'优先完成本周主线，其余按需查阅。',ai:'周末分析重复性、影响和长期相关性。',site:'保持固定课程与动态建议分离。'},
  {view:'today',selector:'.top-actions',kicker:'FINISH',title:'你的实际使用只有两步',text:'第一步：自然口述并说“口述结束”。第二步：我完成分析和网站更新后，你打开网站回看原始记录与学习建议。网站Prompt只在你想去另一个AI对话自行处理时使用。',you:'不需要复制Prompt，也不需要手工导入。',ai:'在当前长期对话中自动使用最新规则。',site:'作为长期可回看的数据库和学习入口。'}
 );
 window.CAREER_OS_DEMO_V53={version:'5.3',steps:DEMO_STEPS_V42.length};
}
