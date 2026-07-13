window.addEventListener('load',()=>{
  try{
    const weeks=window.CURRICULUM_WEEKS||[];
    const tasks=weeks.flatMap(w=>w.tasks||[]);
    const ids=tasks.map(t=>t.id);
    if(weeks.length!==16||tasks.length!==64||new Set(ids).size!==ids.length){
      console.error('Curriculum integrity check failed',{weeks:weeks.length,tasks:tasks.length,uniqueIds:new Set(ids).size});
      const target=document.getElementById('dynamicWeekTasks');
      if(target)target.innerHTML='<div class="warning">课程数据加载不完整，请强制刷新页面。</div>';
      return;
    }
    const updateGoalChain=()=>{
      const nodes=document.querySelectorAll('#goalChain .goal-node');
      if(nodes[2]){
        const h=nodes[2].querySelector('h3'),p=nodes[2].querySelector('p');
        if(h)h.textContent='SoC验证第一阶段课程';
        if(p)p.textContent='验证环境 → SoC数据流 → 系统状态与低功耗 → 完整交付';
      }
    };
    updateGoalChain();
    const goal=document.getElementById('goalChain');
    if(goal)new MutationObserver(updateGoalChain).observe(goal,{childList:true,subtree:true});
    document.documentElement.dataset.curriculum='soc-verification-16w-v1';
  }catch(error){console.error('Curriculum finalization failed',error)}
},{once:true});
