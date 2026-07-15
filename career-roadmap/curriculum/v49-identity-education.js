window.addEventListener('load',()=>{try{installIdentityEducationV49()}catch(e){console.error('Identity Education V4.9 failed',e)}},{once:true});
function installIdentityEducationV49(){
 migrateIdentityStorageV49();updateIdentityDataV49();
 const oldResume=renderResume;renderResume=function(){oldResume();applyIdentityUiV49()};
 const oldAll=renderAll;renderAll=function(){oldAll();applyIdentityUiV49()};
 document.title='Zhantong · Career OS V4.9';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V4.9';save();renderAll();applyIdentityUiV49()
}
function migrateIdentityStorageV49(){
 try{const legacy=JSON.parse(localStorage.getItem('zhantong-career-os-v22')||'null');if(legacy&&!localStorage.getItem('zhantong-career-os-v5'))S=normalizeState(legacy)}catch{}
}
function updateIdentityDataV49(){
 const r=S.resume||{};
 r.experiences=arr(r.experiences).filter(x=>!String(x.title||'').includes('民华微电子'));
 r.education=arr(r.education).map(x=>{
  if(String(x.title||'').includes('Lund University'))return{time:'2024.09—2026.06',title:'Lund University · Electronic Design（电子设计）硕士',detail:'Degree of Master of Science (120 credits)；Main Field of Study: Electronic Design；学业于2026年6月5日完成。'};
  return x
 });
 if(!r.education.some(x=>String(x.title||'').includes('Lund University')))r.education.unshift({time:'2024.09—2026.06',title:'Lund University · Electronic Design（电子设计）硕士',detail:'Degree of Master of Science (120 credits)；Main Field of Study: Electronic Design；学业于2026年6月5日完成。'});
 r.summary='Electronic Design（电子设计）硕士背景，当前从事SoC与数字IC验证，项目覆盖模块级和系统级验证、UT/ST、FPV、数据混仿、IPTEST及验证规划。能够结合规格、RTL、寄存器模型、日志与波形推进问题分析，并严格区分本人贡献、已有平台能力和待确认事实。';
 r.sourceVersion='career-assets-v49-identity-education-2026-07-14';r.version='2026年7月 Identity & Education Correction';
 r.versions=[{name:'2026年7月 Identity & Education Correction',date:'2026-07-14',target:'SoC / 数字IC验证方向',changes:'姓名统一为Zhantong；硕士专业依据正式学位证改为Electronic Design（电子设计）；清理不保留的旧FPGA经历。'},...arr(r.versions).filter(x=>x.name!=='2026年7月 Identity & Education Correction')];
 S.resume=r;S.identityV49={displayName:'Zhantong',officialDegreeName:'Tong Zhan',degree:'Degree of Master of Science (120 credits)',mainField:'Electronic Design',educationCompleted:'2026-06-05',source:'Lund University degree certificate'}
}
function applyIdentityUiV49(){
 document.title='Zhantong · Career OS V4.9';
 const logo=document.querySelector('.logo');if(logo)logo.textContent='ZT';
 const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V4.9';
 const topName=document.querySelector('.top>div:first-child b');if(topName)topName.textContent='Zhantong';
 const portfolioName=document.querySelector('.portfolio-intro h2');if(portfolioName)portfolioName.textContent='Zhantong';
 const legacyName=document.querySelector('#current-resume .resume-hero h2');if(legacyName)legacyName.textContent='Zhantong';
 document.querySelectorAll('#experienceTimeline .career-step').forEach(step=>{if(step.textContent.includes('民华微电子'))step.remove()});
 const intro=document.querySelector('.portfolio-intro p');if(intro)intro.textContent='Electronic Design（电子设计）硕士，当前从事SoC与数字IC验证，项目覆盖模块级和系统级验证、UT/ST、FPV、数据混仿和IPTEST。公开页面仅展示经过脱敏且有事实支撑的职责、方法和结果。';
 const candidate=document.querySelector('#candidateFeed');if(candidate&&candidate.textContent.includes('当前FPGA验证工作'))candidate.innerHTML='<article class="entry portfolio-note"><header><span>RESUME EVIDENCE REVIEW</span><span class="tag learn">持续更新</span></header><h3>下一版最值得补充的证据</h3><ul><li>当前SoC验证工作的正式责任范围与可公开结果</li><li>能够证明独立Debug、环境复用或验证策略能力的案例</li><li>真实Coverage、Regression、缺陷关闭或Sign-off证据</li></ul><p class="muted">在证据不足前，不把日常任务包装成正式简历成果。</p></article>'
}