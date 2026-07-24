#!/usr/bin/env python3
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]


def replace_once(text: str, old: str, new: str, label: str) -> str:
    if old not in text:
        raise RuntimeError(f"Missing source fragment: {label}")
    return text.replace(old, new, 1)


def main() -> None:
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
    print("V5.12 weekly live source registered")


if __name__ == "__main__":
    main()
