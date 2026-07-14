window.addEventListener('load',()=>{try{installFinanceV44()}catch(e){console.error('Finance V4.4 failed',e)}},{once:true});
function installFinanceV44(){
  migrateFinanceV44();
  const oldNormalize=normalizeState;normalizeState=function(s){const o=oldNormalize(s);o.resources=normalizeFinanceV44(o.resources);return o};
  const oldDefault=defaultState;defaultState=function(){const o=oldDefault();o.resources=normalizeFinanceV44(o.resources);return o};
  renderResources=renderSimpleFinanceV44;
  const oldCareer=renderCareer;renderCareer=function(){oldCareer();renderSimpleFinanceV44()};
  const oldAll=renderAll;renderAll=function(){oldAll();renderSimpleFinanceV44()};
  document.title='Jett · Career OS V4.4';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V4.4';injectFinanceStylesV44();renderAll()
}
function normalizeFinanceV44(r){
  r=r||{};const s=r.snapshot||{};
  r.snapshot={
    cash:num(s.cash),investments:num(s.investments),housingFund:num(s.housingFund),debt:num(s.debt),
    takeHomeIncome:num(s.takeHomeIncome||s.monthlyIncome),monthlyExpense:num(s.monthlyExpense),monthlyInvestment:num(s.monthlyInvestment),
    housingFundAdded:num(s.housingFundAdded),passiveIncome:num(s.passiveIncome)
  };
  r.goals=arr(r.goals);r.months=arr(r.months);r.hideAmounts=!!r.hideAmounts;r.updatedAt=r.updatedAt||'';return r
}
function migrateFinanceV44(){S.resources=normalizeFinanceV44(S.resources)}
function renderSimpleFinanceV44(){
  const box=document.getElementById('resourceDashboard');if(!box)return;const r=S.resources=normalizeFinanceV44(S.resources),s=r.snapshot;
  const net=num(s.cash)+num(s.investments)+num(s.housingFund)-num(s.debt);
  const cashSurplus=num(s.takeHomeIncome)+num(s.passiveIncome)-num(s.monthlyExpense);
  const liquid=num(s.cash)+num(s.investments)-num(s.debt);
  const emergency=num(s.monthlyExpense)>0?num(s.cash)/num(s.monthlyExpense):0;
  const money=v=>r.hideAmounts?'••••••':formatMoney(v);
  const totalAssets=Math.max(0,num(s.cash)+num(s.investments)+num(s.housingFund));
  const parts=[['现金',num(s.cash)],['投资',num(s.investments)],['公积金',num(s.housingFund)]].filter(x=>x[1]>0);
  box.innerHTML=`
    <section class="finance-hero-v44">
      <div><div class="eyebrow">MY WEALTH</div><small>当前净资产</small><h2>${money(net)}</h2><p>${r.updatedAt?`最近更新 ${esc(r.updatedAt)}`:'尚未填写财务数据'}</p></div>
      <div class="finance-hero-side-v44"><article><small>本月现金结余</small><b>${money(cashSurplus)}</b></article><article><small>流动净资产</small><b>${money(liquid)}</b></article><article><small>应急资金</small><b>${emergency.toFixed(1)}个月</b></article></div>
    </section>
    <div class="grid2 finance-main-v44">
      <article class="card"><div class="eyebrow">MONTHLY UPDATE</div><h3>本月只填5个数字</h3><p class="muted">工资条和税费拆解交给ChatGPT；网站只保存最终结果。</p><div class="finance-form simple-finance-form-v44">
        <label>实际到账<input data-fin44="takeHomeIncome" type="number" value="${num(s.takeHomeIncome)}"></label>
        <label>本月花销<input data-fin44="monthlyExpense" type="number" value="${num(s.monthlyExpense)}"></label>
        <label>本月投入投资<input data-fin44="monthlyInvestment" type="number" value="${num(s.monthlyInvestment)}"></label>
        <label>公积金本月新增<input data-fin44="housingFundAdded" type="number" value="${num(s.housingFundAdded)}"></label>
        <label>被动收入<input data-fin44="passiveIncome" type="number" value="${num(s.passiveIncome)}"></label>
      </div><button class="primary small-btn" id="saveFinanceMonthlyV44">保存本月</button></article>
      <article class="card"><div class="eyebrow">WEALTH MIX</div><h3>财富组成</h3>${parts.length?`<div class="wealth-bars-v44">${parts.map(x=>`<div><span>${x[0]}</span><i><b style="width:${totalAssets?x[1]/totalAssets*100:0}%"></b></i><strong>${money(x[1])}</strong></div>`).join('')}</div>`:'<p class="muted">填写资产快照后显示财富组成。</p>'}<details class="asset-details-v44"><summary>更新资产快照</summary><div class="finance-form"><label>现金<input data-asset44="cash" type="number" value="${num(s.cash)}"></label><label>投资资产<input data-asset44="investments" type="number" value="${num(s.investments)}"></label><label>公积金余额<input data-asset44="housingFund" type="number" value="${num(s.housingFund)}"></label><label>负债<input data-asset44="debt" type="number" value="${num(s.debt)}"></label></div><button class="secondary small-btn" id="saveFinanceAssetsV44">保存资产快照</button></details></article>
    </div>
    <article class="card finance-goals-v44"><div class="eyebrow">GOALS</div><h3>财务目标</h3><div id="financeGoals">${arr(r.goals).length?r.goals.map(renderGoal).join(''):'<p class="muted">还没有目标。MBA、旅行或购房都可以作为普通目标添加。</p>'}</div><div class="goal-add"><input id="goalName" placeholder="目标名称"><input id="goalTarget" type="number" placeholder="目标金额"><input id="goalCurrent" type="number" placeholder="当前金额"><input id="goalDate" type="date"><button class="secondary small-btn" id="addFinanceGoal">添加目标</button></div></article>`;
  box.querySelector('#saveFinanceMonthlyV44')?.addEventListener('click',()=>{box.querySelectorAll('[data-fin44]').forEach(i=>s[i.dataset.fin44]=num(i.value));r.updatedAt=localISO();r.months=arr(r.months);const month=localISO().slice(0,7);const row={month,takeHomeIncome:s.takeHomeIncome,monthlyExpense:s.monthlyExpense,monthlyInvestment:s.monthlyInvestment,housingFundAdded:s.housingFundAdded,passiveIncome:s.passiveIncome,cashSurplus:num(s.takeHomeIncome)+num(s.passiveIncome)-num(s.monthlyExpense)};const idx=r.months.findIndex(x=>x.month===month);if(idx>=0)r.months[idx]=row;else r.months.push(row);save();renderSimpleFinanceV44();toast('本月财务已保存')});
  box.querySelector('#saveFinanceAssetsV44')?.addEventListener('click',()=>{box.querySelectorAll('[data-asset44]').forEach(i=>s[i.dataset.asset44]=num(i.value));r.updatedAt=localISO();save();renderSimpleFinanceV44();toast('资产快照已保存')});
  box.querySelector('#addFinanceGoal')?.addEventListener('click',()=>{const name=$('#goalName').value.trim();if(!name)return toast('请输入目标名称');r.goals.push({id:uid('goal'),name,target:num($('#goalTarget').value),current:num($('#goalCurrent').value),date:$('#goalDate').value});save();renderSimpleFinanceV44();toast('目标已添加')});
  box.querySelectorAll('[data-goal-delete]').forEach(b=>b.onclick=()=>{r.goals=r.goals.filter(x=>x.id!==b.dataset.goalDelete);save();renderSimpleFinanceV44()});
  const privacy=document.getElementById('toggleMoneyPrivacy');if(privacy&&!privacy.dataset.bound44){privacy.onclick=()=>{r.hideAmounts=!r.hideAmounts;save();renderSimpleFinanceV44()};privacy.dataset.bound44='1'}if(privacy)privacy.textContent=r.hideAmounts?'显示金额':'隐藏金额'
}
function injectFinanceStylesV44(){if(document.getElementById('finance-v44-style'))return;const s=document.createElement('style');s.id='finance-v44-style';s.textContent=`.finance-hero-v44{display:grid;grid-template-columns:1.15fr 1fr;gap:18px;padding:24px;border:1px solid #31596a;border-radius:16px;background:linear-gradient(145deg,#0b202c,#07141c);margin-bottom:14px}.finance-hero-v44 h2{font-size:38px;margin:8px 0}.finance-hero-v44 p,.finance-hero-v44 small{color:var(--muted)}.finance-hero-side-v44{display:grid;grid-template-columns:repeat(3,1fr);gap:8px}.finance-hero-side-v44 article{padding:13px;border:1px solid var(--line2);border-radius:10px;background:rgba(255,255,255,.025)}.finance-hero-side-v44 small{display:block;margin-bottom:7px}.finance-hero-side-v44 b{font-size:14px}.simple-finance-form-v44{grid-template-columns:1fr 1fr}.wealth-bars-v44{display:grid;gap:13px;margin:16px 0}.wealth-bars-v44>div{display:grid;grid-template-columns:58px 1fr auto;gap:10px;align-items:center}.wealth-bars-v44 span,.wealth-bars-v44 strong{font-size:11px}.wealth-bars-v44 i{height:7px;background:#142c38;border-radius:8px;overflow:hidden}.wealth-bars-v44 b{display:block;height:100%;background:var(--cyan);border-radius:8px}.asset-details-v44{margin-top:18px;border-top:1px solid var(--line2);padding-top:13px}.asset-details-v44 summary{cursor:pointer;color:var(--cyan)}.finance-goals-v44{margin-top:12px}@media(max-width:900px){.finance-hero-v44{grid-template-columns:1fr}.finance-hero-side-v44{grid-template-columns:1fr 1fr 1fr}}@media(max-width:620px){.finance-hero-side-v44,.simple-finance-form-v44{grid-template-columns:1fr}.finance-hero-v44 h2{font-size:30px}}`;document.head.appendChild(s)}
