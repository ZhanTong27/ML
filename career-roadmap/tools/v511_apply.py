#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Missing source fragment: {label}")
    return text.replace(old, new, 1)


def patch_build() -> None:
    path = ROOT / "build_single_file.py"
    text = path.read_text(encoding="utf-8")
    source = "    'curriculum/v511-daily-date-integrity.js',\n"
    if source not in text:
        anchor = "    'curriculum/v510-verification-mastery-ui.js',\n"
        text = replace_once(text, anchor, anchor + source, "V5.10 source anchor")
    marker = "    'CAREER_OS_V511_DAILY_DATE_INTEGRITY',\n"
    if marker not in text:
        anchor = "    'Verification Engineering Mastery',\n"
        text = replace_once(text, anchor, anchor + marker, "V5.10 marker anchor")
    path.write_text(text, encoding="utf-8")


def daily_save_body() -> str:
    return """function saveDailyWithClosureV51(){
  try{
    const data=parseMaybeJSON(document.querySelector('#qText').value);
    if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('每日记录必须是JSON对象或完整文本');
    const formDate=document.querySelector('#qDate')?.value||localISO();
    if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(formDate))throw new Error('请选择有效日期');
    const payloadDate=/^\\d{4}-\\d{2}-\\d{2}$/.test(String(data.date||''))?String(data.date):'';
    data.id=data.id||uid('daily');data.date=formDate;
    if(payloadDate&&payloadDate!==formDate)data.importMeta={...(data.importMeta||{}),dateMismatch:{payloadDate,selectedDate:formDate,resolution:'selected-date-wins',resolvedAt:new Date().toISOString()}};
    S.dailyLogs=S.dailyLogs.filter(x=>x.date!==formDate);S.dailyLogs.push(data);S.selectedDate=formDate;S.calendarMonth=formDate.slice(0,7);
    importClosuresFromDailyV51(data,formDate);save();closeModals();renderAll();
    toast(payloadDate&&payloadDate!==formDate?`已按日期栏保存到${formDate}，JSON日期${payloadDate}已忽略；重要问题已进入闭环队列`:'每日记录已保存，重要问题已进入闭环队列')
  }catch(e){toast(e.message||'每日记录格式错误')}
}"""


def patch_app() -> None:
    path = ROOT / "app.js"
    text = path.read_text(encoding="utf-8")

    if "日期栏是最终保存日期" not in text:
        old = "  const dateField=mode==='daily'||mode==='problem'?`<label>日期<input id=\"qDate\" type=\"date\" value=\"${S.selectedDate}\"></label>`:mode==='weekly'?`<label>周次<input id=\"qRange\" value=\"${weekStart()}—${addDays(weekStart(),6)}\"></label>`:'';"
        new = "  const dateField=mode==='daily'?`<label>日期<input id=\"qDate\" type=\"date\" value=\"${localISO()}\"></label><p class=\"muted\" style=\"margin:-4px 0 3px\">日期栏是最终保存日期；若JSON中的date不同，将以此处为准并记录冲突。</p>`:mode==='problem'?`<label>日期<input id=\"qDate\" type=\"date\" value=\"${S.selectedDate}\"></label>`:mode==='weekly'?`<label>周次<input id=\"qRange\" value=\"${weekStart()}—${addDays(weekStart(),6)}\"></label>`:'';"
        text = replace_once(text, old, new, "Daily quick-form date field")

    if "resolution:'selected-date-wins'" not in text:
        start = text.index("function saveQuick(mode){")
        end = text.index("\nfunction applyWeeklyOutputs", start)
        replacement = """function saveQuick(mode){
  try{
    let successMessage='已保存并更新';
    if(mode==='schedule'){
      const title=$('#qTitle').value.trim();if(!title)throw new Error('请填写标题');S.schedule.push({id:uid('schedule'),date:$('#qDate').value||S.selectedDate,type:$('#qType').value,title,time:$('#qTime').value.trim()});
    }else{
      const data=parseMaybeJSON($('#qText').value);
      if(mode==='daily'){
        if(!data||typeof data!=='object'||Array.isArray(data))throw new Error('每日记录必须是JSON对象或完整文本');
        const formDate=$('#qDate').value||localISO();
        if(!/^\\d{4}-\\d{2}-\\d{2}$/.test(formDate))throw new Error('请选择有效日期');
        const payloadDate=/^\\d{4}-\\d{2}-\\d{2}$/.test(String(data.date||''))?String(data.date):'';
        data.id=data.id||uid('daily');data.date=formDate;
        if(payloadDate&&payloadDate!==formDate)data.importMeta={...(data.importMeta||{}),dateMismatch:{payloadDate,selectedDate:formDate,resolution:'selected-date-wins',resolvedAt:new Date().toISOString()}};
        S.dailyLogs=S.dailyLogs.filter(x=>x.date!==formDate);S.dailyLogs.push(data);S.selectedDate=formDate;S.calendarMonth=formDate.slice(0,7);
        if(payloadDate&&payloadDate!==formDate)successMessage=`已按日期栏保存到${formDate}，JSON日期${payloadDate}已忽略`;
      }
      if(mode==='problem'){data.id=data.id||uid('problem');data.date=data.date||$('#qDate').value||S.selectedDate;S.problemLogs.unshift(data)}
      if(mode==='weekly'){data.id=data.id||uid('weekly');data.range=data.range||$('#qRange').value;data.createdAt=localISO();const normalized=normalizeLegacyWeeklyRecord(data);S.weeklyReviews.unshift(normalized);applyWeeklyOutputs(normalized)}
      if(mode==='ability'){applyAbilityUpdate(data)}
      if(mode==='resume'){S.resume={...S.resume,...data};['education','experiences','projects','skills','awards','versions','candidates'].forEach(k=>S.resume[k]=arr(S.resume[k]))}
    }
    save();closeModals();renderAll();toast(successMessage)
  }catch(e){toast(e.message||'内容格式错误')}
}"""
        text = text[:start] + replacement + text[end:]

    path.write_text(text, encoding="utf-8")


def patch_daily_closure() -> None:
    path = ROOT / "curriculum/v51-daily-closure-loop.js"
    text = path.read_text(encoding="utf-8")
    if "已按日期栏保存到${formDate}" not in text:
        start = text.index("function saveDailyWithClosureV51(){")
        end = text.index("\nfunction importClosuresFromDailyV51", start)
        text = text[:start] + daily_save_body() + text[end:]
    path.write_text(text, encoding="utf-8")


def main() -> None:
    patch_build()
    patch_app()
    patch_daily_closure()
    print("V5.11 daily date integrity source patch applied")


if __name__ == "__main__":
    main()
