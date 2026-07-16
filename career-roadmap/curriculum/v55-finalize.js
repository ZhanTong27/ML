window.addEventListener('load',()=>{
 try{
  const newerIdentity=()=>typeof seedDaily20260716==='function'||Boolean(window.CAREER_OS_V56)||String(S?.version||'').startsWith('5.6');
  const apply=()=>{
   if(!newerIdentity()){
    document.title='Zhantong · Career OS V5.5';
    const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.5';
    S.version='5.5'
   }
   if(typeof DEMO_STEPS_V42!=='undefined'){
    const intro=DEMO_STEPS_V42[0];
    if(intro){
     intro.title='4分钟看懂 Career OS V5.5';
     intro.text='网站保存每日原始记录，把工作暴露的问题转换成针对性补足，同时用独立Frontier Track研究不受当前任务限制的行业方法、论文和AI趋势。'
    }
    const frontier=DEMO_STEPS_V42.find(x=>x.view==='growth');
    if(frontier){
     frontier.title='固定课程与独立Frontier Track并行';
     frontier.text='Daily问题转换只解决工作暴露的缺口；AMS Verification Frontier Track独立研究行业标准、论文、AI与OCL-LDO，不由当前任务决定学习上限。';
     frontier.you='固定课程照常推进，Frontier Track按认知价值阅读。';
     frontier.ai='解释公开标准和论文，帮助形成方法地图与批判性判断。';
     frontier.site='把Daily补足与独立行业认知分开保存。'
    }
   }
   window.CAREER_OS_V55={version:'5.5',frontier:'independent-ams-verification',dailyLearningCount:S.learningResponses.filter(x=>x.date==='2026-07-15').length,removedWorkLinkedTopics:['learn-2026-07-15-ams-strategy','learn-2026-07-15-ocldo-prep']}
  };
  const oldAll=renderAll;
  renderAll=function(){oldAll();apply()};
  apply();save();renderAll()
 }catch(e){console.error('Career OS V5.5 finalize failed',e)}
},{once:true});
