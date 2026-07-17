#!/usr/bin/env python3
from __future__ import annotations

import argparse
import re
from pathlib import Path

BASE_SOURCES = [
    'legacy-data-v22.js',
    'curriculum/base.js',
    'curriculum/cycle1.js',
    'curriculum/cycle2.js',
    'curriculum/cycle3.js',
    'curriculum/cycle4.js',
    'app.js',
    'curriculum/patch.js',
    'curriculum/finalize.js',
]

EXTRA_SOURCES = [
    'curriculum/manual-v31.js',
    'curriculum/v32.js',
    'curriculum/resume-v33.js',
    'curriculum/resume-portfolio-v34.js',
    'curriculum/daily-20260713.js',
    'curriculum/daily-20260714-core.js',
    'curriculum/daily-20260714-analysis.js',
    'curriculum/daily-20260714.js',
    'curriculum/daily-20260715-record.js',
    'curriculum/daily-20260715-analysis.js',
    'curriculum/daily-20260715.js',
    'curriculum/daily-20260716-record.js',
    'curriculum/daily-20260716-analysis.js',
    'curriculum/daily-20260716.js',
    'curriculum/daily-20260717-record.js',
    'curriculum/daily-20260717-analysis.js',
    'curriculum/daily-20260717.js',
    'curriculum/v40-career-model.js',
    'curriculum/v40-reviews.js',
    'curriculum/v41-explorer.js',
    'curriculum/v42-demo.js',
    'curriculum/v43-dji-assets.js',
    'curriculum/v44-finance-simple.js',
    'curriculum/v45-personalized-learning.js',
    'curriculum/v46-pack-w1.js',
    'curriculum/v46-pack-w2.js',
    'curriculum/v46-pack-w3.js',
    'curriculum/v46-pack-w4.js',
    'curriculum/v46-learning-pack-ui.js',
    'curriculum/v47-ai-native-overlay.js',
    'curriculum/v48-reality-responsive.js',
    'curriculum/v49-identity-education.js',
    'curriculum/v50-profile-source.js',
    'curriculum/v50-frontier-methods.js',
    'curriculum/v50-frontier-labs.js',
    'curriculum/v50-frontier-ui.js',
    'curriculum/v50-asset-system.js',
    'curriculum/v50-simplicity-core.js',
    'curriculum/v50-frontier-kickoff.js',
    'curriculum/v50-finalize.js',
    'curriculum/v51-daily-closure-loop.js',
    'curriculum/v51-daily-closure-fixes.js',
    'curriculum/v52-learning-seeds-a.js',
    'curriculum/v52-learning-seeds-b.js',
    'curriculum/v52-problem-learning-ui.js',
    'curriculum/v52-problem-learning-core.js',
    'curriculum/v53-daily-history-demo.js',
    'curriculum/v53-demo-fix.js',
    'curriculum/v54-learning-seeds-0715-a.js',
    'curriculum/v54-learning-seeds-0715-b.js',
    'curriculum/v54-finalize.js',
    'curriculum/v55-ams-frontier-data.js',
    'curriculum/v55-source-corrections.js',
    'curriculum/v55-ams-frontier-ui.js',
    'curriculum/v55-frontier-integration-fix.js',
    'curriculum/v55-finalize.js',
    'curriculum/v551-daily-integrity-hotfix.js',
    'curriculum/v552-safari-daily-recovery.js',
    'curriculum/v56-daily-0716-finalize.js',
    'curriculum/v57-uvmms-adoption-data.js',
    'curriculum/v57-uvmms-adoption-ui.js',
    'curriculum/v57-finalize.js',
    'curriculum/v58-growth-safety.js',
    'curriculum/v58-growth-story-data.js',
    'curriculum/v58-growth-story-ui.js',
    'curriculum/v58-compact-legacy.js',
    'curriculum/v58-finalize.js',
    'curriculum/v59-specialization-data.js',
    'curriculum/v59-specialization-migration.js',
    'curriculum/v59-specialization-assessment.js',
    'curriculum/v59-ui-foundation.js',
    'curriculum/v59-ui-unit.js',
    'curriculum/v59-ui-views.js',
    'curriculum/v59-ui-hotfix.js',
    'curriculum/v59-ui-install.js',
    'curriculum/v59-finalize.js',
]

REQUIRED_MARKERS = [
    'ENGINEERING PORTFOLIO',
    'Recruiter View',
    '2026-07-13-a7f3',
    '2026-07-14-k8m4',
    '2026-07-15-c4t8',
    '2026-07-16-ms7q',
    '2026-07-17-n4s8',
    'DIAGNOSIS LIFECYCLE',
    'career-profile-v50-single-source',
    'PERSONAL CAPITAL',
    '目标资金桶',
    'zhantong-career-os-v5',
    'THIS WEEK · EXECUTION',
    'V5.2 · PROBLEM-TO-LEARNING BRIDGE',
    '每日记录与能力补足Prompt',
    'DAILY HISTORY · SOURCE OF TRUTH',
    'AMS Verification Frontier Track',
    'Output-Capacitorless LDO / OCL-LDO',
    'UVM-MS 方法学引入与数模验证资产复用试点',
    'METHODOLOGY ADOPTION PROGRAM',
    'HUMAN-CENTERED GROWTH',
    '本周全部成长行动',
    'AI检测与训练Prompt',
    'zhantong-career-os-v5-pre-v58-backup',
    'PARALLEL SPECIALIZATION TRACKS',
    'OCLDO Verification',
    'Digitally Controlled On-Chip LDO',
    'UVM-MS Personal Learning Track',
    'Analog Output-Capacitorless LDO Background',
    'zhantong-career-os-v5-pre-v59-backup',
    'CAREER_OS_V551',
    'CAREER_OS_V552',
    'CAREER_OS_V56',
    'CAREER_OS_V57',
    'CAREER_OS_V58',
    'CAREER_OS_V59',
    'Zhantong · Career OS V5.9',
]


def inline_script(root: Path, source: str) -> str:
    path = root / source
    if not path.exists():
        raise FileNotFoundError(f'Missing source: {source}')
    code = path.read_text(encoding='utf-8')
    code = re.sub(r'</script', r'<\/script', code, flags=re.I)
    return f'<script data-source="{source}">\n{code}\n</script>'


def build(root: Path, output: Path) -> None:
    template = (root / 'index.template.html').read_text(encoding='utf-8')
    css = (root / 'style.css').read_text(encoding='utf-8')
    style_marker = '<link rel="stylesheet" href="style.css">'
    if style_marker not in template:
        raise RuntimeError('Template stylesheet marker not found')
    html = template.replace(style_marker, f'<style>\n{css}\n</style>', 1)

    script_markers = '\n'.join(f'<script src="{src}"></script>' for src in BASE_SOURCES)
    if script_markers not in html:
        raise RuntimeError('Template script marker sequence not found')

    bootstrap = inline_script(root, 'curriculum/v50-storage-bootstrap.js')
    base_blocks = [bootstrap] + [inline_script(root, source) for source in BASE_SOURCES]
    html = html.replace(script_markers, '\n'.join(base_blocks), 1)
    extra_blocks = [inline_script(root, source) for source in EXTRA_SOURCES]
    html = html.replace('</body>', '\n'.join(extra_blocks) + '\n</body>', 1)

    if re.search(r'<script\s+[^>]*src=', html, re.I):
        raise RuntimeError('External script remains')
    if re.search(r'<link\s+[^>]*rel=["\']stylesheet["\']', html, re.I):
        raise RuntimeError('External stylesheet remains')
    missing = [marker for marker in REQUIRED_MARKERS if marker not in html]
    if missing:
        raise RuntimeError(f'Missing bundled markers: {missing}')

    output.parent.mkdir(parents=True, exist_ok=True)
    output.write_text(html, encoding='utf-8')
    print(f'Built {output} ({len(html)} bytes)')


def main() -> None:
    parser = argparse.ArgumentParser()
    parser.add_argument('--output', default='index.html')
    args = parser.parse_args()
    root = Path(__file__).resolve().parent
    output = Path(args.output)
    if not output.is_absolute():
        output = root / output
    build(root, output)


if __name__ == '__main__':
    main()
