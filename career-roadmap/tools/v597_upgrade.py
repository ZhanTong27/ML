#!/usr/bin/env python3
from __future__ import annotations

from pathlib import Path
import re

ROOT = Path(__file__).resolve().parents[1]
REPO = ROOT.parent


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Missing source fragment: {label}")
    return text.replace(old, new, 1)


def upgrade_app() -> None:
    path = ROOT / "app.js"
    text = path.read_text(encoding="utf-8")

    start = text.index("function weeklyRangeText(")
    end = text.index("\n\nfunction renderToday()", start)
    helpers = """function weeklyRangeBounds(range,record={}){
  let start=String(record?.rangeStart||record?.start||''),end=String(record?.rangeEnd||record?.end||'');
  if(range&&typeof range==='object'){
    start=String(range.start||start||'');end=String(range.end||end||'')
  }else if(typeof range==='string'){
    const dates=range.match(/\\d{4}-\\d{2}-\\d{2}/g)||[];
    start=start||dates[0]||'';end=end||dates[1]||dates[0]||''
  }
  const label=start&&end?`${start}—${end}`:(start||end||(typeof range==='string'?range:''));
  return{start,end,label}
}
function weeklyRangeText(range,record={}){return weeklyRangeBounds(range,record).label}
function weeklyRangeIncludes(range,date,record={}){
  const b=weeklyRangeBounds(range,record);
  if(!date)return false;
  if(b.start&&b.end)return date>=b.start&&date<=b.end;
  return b.label.includes(date)
}
function normalizeLegacyWeeklyRecord(record={}){
  const b=weeklyRangeBounds(record.range,record);
  return{...record,range:b.label,rangeStart:b.start,rangeEnd:b.end,rangeContract:'legacy-weekly-v2'}
}
function latestWeekly(){return [...S.weeklyReviews].sort((a,b)=>(b.createdAt||weeklyRangeText(b.range,b)).localeCompare(a.createdAt||weeklyRangeText(a.range,a)))[0]}"""
    text = text[:start] + helpers + text[end:]

    text = replace_once(
        text,
        "['dailyLogs','problemLogs','weeklyReviews','schedule','cycleArchives','customLearning'].forEach(k=>out[k]=arr(out[k]));\n  out.checks=out.checks||{};",
        "['dailyLogs','problemLogs','weeklyReviews','schedule','cycleArchives','customLearning'].forEach(k=>out[k]=arr(out[k]));\n  out.weeklyReviews=out.weeklyReviews.map(normalizeLegacyWeeklyRecord);\n  out.checks=out.checks||{};",
        "normalize legacy weekly records",
    )

    text = text.replace("weeklyRangeIncludes(x.range,start)", "weeklyRangeIncludes(x.range,start,x)")
    text = text.replace(
        "(b.createdAt||weeklyRangeText(b.range)).localeCompare(a.createdAt||weeklyRangeText(a.range))",
        "(b.createdAt||weeklyRangeText(b.range,b)).localeCompare(a.createdAt||weeklyRangeText(a.range,a))",
    )
    text = text.replace("weeklyRangeText(x.range)||'周度复盘'", "weeklyRangeText(x.range,x)||'周度复盘'")

    text = replace_once(
        text,
        "if(mode==='weekly'){data.id=data.id||uid('weekly');data.range=data.range||$('#qRange').value;data.createdAt=localISO();S.weeklyReviews.unshift(data);applyWeeklyOutputs(data)}",
        "if(mode==='weekly'){data.id=data.id||uid('weekly');data.range=data.range||$('#qRange').value;data.createdAt=localISO();const normalized=normalizeLegacyWeeklyRecord(data);S.weeklyReviews.unshift(normalized);applyWeeklyOutputs(normalized)}",
        "quick weekly import normalization",
    )

    text = replace_once(
        text,
        "const id=t.id||`custom-${(data.range||localISO()).replace(/\\D/g,'')}-${i}`;",
        "const period=weeklyRangeBounds(data.range,data);\n    const id=t.id||`custom-${(period.label||localISO()).replace(/\\D/g,'')}-${i}`;",
        "weekly output id",
    )
    text = text.replace("source:data.range})", "source:weeklyRangeText(data.range,data)})")

    path.write_text(text, encoding="utf-8")


def upgrade_v4_import() -> None:
    path = ROOT / "curriculum/v40-reviews.js"
    text = path.read_text(encoding="utf-8")
    helper = """function normalizeWeeklyPatchRangeV597(p){
 const copy={...(p||{})},range=copy.range;let start='',end='';
 if(range&&typeof range==='object'){start=String(range.start||'');end=String(range.end||'')}
 else if(typeof range==='string'){const dates=range.match(/\\d{4}-\\d{2}-\\d{2}/g)||[];start=dates[0]||'';end=dates[1]||dates[0]||''}
 start=start||String(copy.rangeStart||'');end=end||String(copy.rangeEnd||'');
 if(!start||!end)throw new Error('Weekly Patch range必须包含start和end');
 copy.range={start,end};copy.rangeLabel=`${start}—${end}`;copy.rangeContract='career-os-weekly-period-v2';return copy
}
"""
    if "function normalizeWeeklyPatchRangeV597" not in text:
        text = text.replace("function installV40Reviews(){", helper + "function installV40Reviews(){", 1)
    text = replace_once(
        text,
        "function importWeeklyV40(){try{const p=parseMaybeJSON($('#weeklyPatchV4').value);if(p.schemaVersion!=='career-os-v4-weekly-1')throw new Error('Weekly Patch版本不正确');",
        "function importWeeklyV40(){try{const p=normalizeWeeklyPatchRangeV597(parseMaybeJSON($('#weeklyPatchV4').value));if(p.schemaVersion!=='career-os-v4-weekly-1')throw new Error('Weekly Patch版本不正确');",
        "V4 weekly import",
    )
    path.write_text(text, encoding="utf-8")


def write_contract() -> None:
    path = ROOT / "curriculum/v597-weekly-range-contract.js"
    path.write_text(
        """(function(){
 const MARKER='CAREER_OS_V597_WEEKLY_RANGE_CONTRACT',BACKUP='zhantong-career-os-v5-pre-v597-weekly-range';
 function bounds(range,record={}){
  let start=String(record?.rangeStart||record?.start||''),end=String(record?.rangeEnd||record?.end||'');
  if(range&&typeof range==='object'){start=String(range.start||start||'');end=String(range.end||end||'')}
  else if(typeof range==='string'){const d=range.match(/\\d{4}-\\d{2}-\\d{2}/g)||[];start=start||d[0]||'';end=end||d[1]||d[0]||''}
  return{start,end,label:start&&end?`${start}—${end}`:(start||end||(typeof range==='string'?range:''))}
 }
 function migrate(){
  if(typeof S!=='object')return false;
  try{if(!localStorage.getItem(BACKUP))localStorage.setItem(BACKUP,JSON.stringify(S))}catch(e){}
  S.weeklyReviews=Array.isArray(S.weeklyReviews)?S.weeklyReviews.map(x=>{const b=bounds(x?.range,x);return{...x,range:b.label,rangeStart:b.start,rangeEnd:b.end,rangeContract:'legacy-weekly-v2'}}):[];
  S.weeklyReviewRecords=Array.isArray(S.weeklyReviewRecords)?S.weeklyReviewRecords.map(x=>{const b=bounds(x?.range,x);return{...x,range:{start:b.start,end:b.end},rangeLabel:b.label,rangeContract:'career-os-weekly-period-v2'}}):[];
  S.weeklyRangeContractV597={version:'5.9.7',legacyCollection:'weeklyReviews.range:string + rangeStart/rangeEnd',formalCollection:'weeklyReviewRecords.range:{start,end} + rangeLabel',migratedAt:S.weeklyRangeContractV597?.migratedAt||new Date().toISOString()};
  try{if(typeof save==='function')save()}catch(e){console.error('V5.9.7 range migration save failed',e)}return true
 }
 function badge(){document.title='Zhantong · Career OS V5.9.7';const side=document.querySelector('.side-title');if(side)side.textContent='CAREER OS · V5.9.7';const actions=document.querySelector('.top-actions');if(actions&&!document.getElementById('versionBadgeV597'))actions.insertAdjacentHTML('afterbegin','<span class="sync" id="versionBadgeV597">V5.9.7 · 周报范围已升级</span>')}
 function install(){migrate();badge();window.CAREER_OS_V597={marker:MARKER,version:'5.9.7',complete:true,backupKey:BACKUP}}
 if(document.readyState==='loading')window.addEventListener('load',install,{once:true});else install();
 window.addEventListener('pageshow',()=>{migrate();badge()});window.addEventListener('focus',()=>{migrate();badge()});
})();
""",
        encoding="utf-8",
    )


def upgrade_build() -> None:
    path = ROOT / "build_single_file.py"
    text = path.read_text(encoding="utf-8")
    if "curriculum/v597-weekly-range-contract.js" not in text:
        text = replace_once(
            text,
            "    'curriculum/v596-weekly-career-model-review.js',\n]",
            "    'curriculum/v596-weekly-career-model-review.js',\n    'curriculum/v597-weekly-range-contract.js',\n]",
            "build source list",
        )
    if "CAREER_OS_V597_WEEKLY_RANGE_CONTRACT" not in text:
        text = replace_once(
            text,
            "    'CAREER_OS_V595_LAYOUT',\n",
            "    'CAREER_OS_V595_LAYOUT',\n    'CAREER_OS_V597_WEEKLY_RANGE_CONTRACT',\n",
            "required marker list",
        )
    path.write_text(text, encoding="utf-8")


def upgrade_template() -> None:
    path = ROOT / "index.template.html"
    text = path.read_text(encoding="utf-8")
    if "career-os-build" not in text:
        text = replace_once(
            text,
            '  <meta name="color-scheme" content="dark">\n',
            '  <meta name="color-scheme" content="dark">\n  <meta http-equiv="Cache-Control" content="no-cache, no-store, must-revalidate">\n  <meta http-equiv="Pragma" content="no-cache">\n  <meta http-equiv="Expires" content="0">\n  <meta name="career-os-build" content="5.9.7-weekly-range-contract">\n',
            "template cache metadata",
        )
    path.write_text(text, encoding="utf-8")


def upgrade_latest_entry() -> None:
    path = ROOT / "latest.html"
    if not path.exists():
        return
    text = path.read_text(encoding="utf-8")
    text = text.replace("range-fix-c7cd2bd", "weekly-range-contract-v597")
    text = text.replace("html.includes('weeklyRangeIncludes')", "html.includes('CAREER_OS_V597_WEEKLY_RANGE_CONTRACT')")
    text = text.replace("正在修复旧周报兼容格式，并绕过浏览器缓存。", "正在迁移周报范围数据并加载Career OS V5.9.7。")
    path.write_text(text, encoding="utf-8")


def upgrade_acceptance() -> None:
    path = REPO / ".github/workflows/v59-live-artifact-acceptance.yml"
    text = path.read_text(encoding="utf-8")
    if "Weekly range object compatibility" not in text:
        marker = "      - name: Install browser runtimes\n"
        block = """      - name: Weekly range object compatibility
        run: |
          grep -q "CAREER_OS_V597_WEEKLY_RANGE_CONTRACT" career-roadmap/index.html
          if grep -RInE "\\(x\\.range\\|\\|['\\\"]{2}\\)\\.includes|\\(data\\.range\\|\\|localISO\\(\\)\\)\\.replace" career-roadmap --include='*.js' --include='*.html'; then
            echo "Unsafe weekly range handling found"
            exit 1
          fi

"""
        text = replace_once(text, marker, block + marker, "acceptance insertion")
        path.write_text(text, encoding="utf-8")


def scan() -> None:
    patterns = [
        re.compile(r"\(x\.range\|\|['\"]{2}\)\.includes"),
        re.compile(r"\(data\.range\|\|localISO\(\)\)\.replace"),
        re.compile(r"(?:b|a)\.range\|\|['\"]{2}\)\.localeCompare"),
    ]
    hits: list[tuple[str, str]] = []
    for path in ROOT.rglob("*"):
        if path.suffix not in {".js", ".html", ".py"}:
            continue
        text = path.read_text(encoding="utf-8")
        for pattern in patterns:
            hits.extend((str(path), m.group(0)) for m in pattern.finditer(text))
    if hits:
        raise RuntimeError(f"Unsafe weekly range patterns remain: {hits}")


def main() -> None:
    upgrade_app()
    upgrade_v4_import()
    write_contract()
    upgrade_build()
    upgrade_template()
    upgrade_latest_entry()
    upgrade_acceptance()
    scan()
    print("Career OS V5.9.7 weekly range contract upgrade prepared")


if __name__ == "__main__":
    main()
