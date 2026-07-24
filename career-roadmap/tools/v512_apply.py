#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Missing source fragment: {label}")
    return text.replace(old, new, 1)


def replace_if_needed(text: str, old: str, new: str, label: str) -> str:
    if new in text:
        return text
    return replace_once(text, old, new, label)


def patch_builder() -> None:
    path = ROOT / "build_single_file.py"
    text = path.read_text(encoding="utf-8")
    source = "    'curriculum/v512-weekly-review-live.js',\n"
    if source not in text:
        anchor = "    'curriculum/v511-daily-date-integrity.js',\n"
        text = replace_once(text, anchor, anchor + source, "V5.11 source anchor")
    marker = "    'CAREER_OS_V512_WEEKLY_REVIEW_LIVE',\n"
    if marker not in text:
        anchor = "    'CAREER_OS_V511_DAILY_DATE_INTEGRITY',\n"
        text = replace_once(text, anchor, anchor + marker, "V5.11 marker anchor")
    path.write_text(text, encoding="utf-8")


def patch_live_source() -> None:
    path = ROOT / "curriculum/v512-weekly-review-live.js"
    text = path.read_text(encoding="utf-8")

    text = replace_if_needed(
        text,
        "function isFormal(record){return record?.schemaVersion==='career-os-v4-weekly-1'||Boolean(record?.reviewId&&Array.isArray(record?.diagnosisUpdates)&&record?.range)}",
        "function isFormal(record){return Boolean(record?.reviewId&&Array.isArray(record?.diagnosisUpdates)&&record?.range&&(record.schemaVersion==='career-os-v4-weekly-1'||record.diagnosisUpdates.length>=0))}",
        "formal weekly review predicate",
    )
    text = replace_if_needed(
        text,
        "copy.importedAt=copy.importedAt||new Date().toISOString();copy.isCanonical=copy.isCanonical!==false;",
        "copy.importedAt=copy.importedAt||copy.createdAt||new Date().toISOString();copy.isCanonical=copy.isCanonical!==false;",
        "stable weekly importedAt",
    )
    text = replace_if_needed(
        text,
        "schemaVersion:record.schemaVersion,range:record.rangeLabel",
        "schemaVersion:'career-os-weekly-mirror-1',range:record.rangeLabel",
        "legacy weekly mirror schema",
    )

    old_migrate = """ function migrate(){
  if(typeof S!=='object')return false;backup();let changed=false;
  S.weeklyReviewRecords=arr(S.weeklyReviewRecords).map(item=>{try{const normalized=normalize(item);if(JSON.stringify(normalized)!==JSON.stringify(item))changed=true;return normalized}catch(e){return item}});
  arr(S.weeklyReviews).forEach(item=>{if(!isFormal(item))return;try{const normalized=normalize(item);const before=S.weeklyReviewRecords.length;upsertFormal(normalized);applyDiagnosisUpdates(normalized);ensureLegacyMirror(normalized);if(S.weeklyReviewRecords.length!==before||!item.promotedToFormalV512){item.promotedToFormalV512=true;item.formalReviewId=normalized.reviewId;changed=true}}catch(e){console.error('V5.12 weekly promotion failed',e)}});
  S.weeklyReviewRecords.forEach(record=>{if(!isFormal(record))return;try{const normalized=normalize(record);applyDiagnosisUpdates(normalized);ensureLegacyMirror(normalized)}catch(e){}});
  S.weeklyLiveV512={version:'5.12.0',formalCount:S.weeklyReviewRecords.length,updatedAt:new Date().toISOString()};
  if(changed)try{save()}catch(e){};return changed
 }"""
    new_migrate = """ function migrate(){
  if(typeof S!=='object')return false;backup();let changed=false;
  S.weeklyReviewRecords=arr(S.weeklyReviewRecords).map(item=>{try{const normalized=normalize(item);if(JSON.stringify(normalized)!==JSON.stringify(item))changed=true;return normalized}catch(e){return item}});
  arr(S.weeklyReviews).forEach(item=>{if(!isFormal(item))return;try{const normalized=normalize(item);const before=S.weeklyReviewRecords.length;upsertFormal(normalized);if(S.weeklyReviewRecords.length!==before||!item.promotedToFormalV512){item.promotedToFormalV512=true;item.formalReviewId=normalized.reviewId;item.importedAt=normalized.importedAt;changed=true}}catch(e){console.error('V5.12 weekly promotion failed',e)}});
  const chronological=arr(S.weeklyReviewRecords).filter(isFormal).map(item=>{try{return normalize(item)}catch(e){return null}}).filter(Boolean).sort((a,b)=>{const endCompare=String(a.range.end).localeCompare(String(b.range.end));return endCompare||String(a.importedAt||a.reviewId).localeCompare(String(b.importedAt||b.reviewId))});
  chronological.forEach(record=>{applyDiagnosisUpdates(record);ensureLegacyMirror(record)});
  S.weeklyLiveV512={version:'5.12.0',formalCount:S.weeklyReviewRecords.length,updatedAt:new Date().toISOString()};
  if(changed)try{save()}catch(e){};return changed
 }"""
    text = replace_if_needed(text, old_migrate, new_migrate, "chronological weekly migration")

    text = replace_if_needed(
        text,
        "save();closeModals();renderAll();mount();toast(`周度Review已导入并展示：${normalized.rangeLabel}`)",
        "save();closeModals();renderAll();[0,120,500,1400].forEach(delay=>setTimeout(mount,delay));toast(`周度Review已导入并展示：${normalized.rangeLabel}`)",
        "weekly post-save remount",
    )

    path.write_text(text, encoding="utf-8")


def main() -> None:
    patch_builder()
    patch_live_source()
    print("V5.12 weekly live source registered, stabilized and ordered")


if __name__ == "__main__":
    main()
