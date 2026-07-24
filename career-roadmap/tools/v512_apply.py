#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Missing source fragment: {label}")
    return text.replace(old, new, 1)


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
    old = "copy.importedAt=copy.importedAt||new Date().toISOString();copy.isCanonical=copy.isCanonical!==false;"
    new = "copy.importedAt=copy.importedAt||copy.createdAt||new Date().toISOString();copy.isCanonical=copy.isCanonical!==false;"
    if old in text:
        text = replace_once(text, old, new, "stable weekly importedAt")
    elif new not in text:
        raise RuntimeError("Missing source fragment: stable weekly importedAt")
    path.write_text(text, encoding="utf-8")


def main() -> None:
    patch_builder()
    patch_live_source()
    print("V5.12 weekly live source registered and stabilized")


if __name__ == "__main__":
    main()
