#!/usr/bin/env python3
"""trim_root_tocs.py — trim the pdftotext front-matter dumps of the root
classic books to their actual contents pages (keep pages that look like
TOC pages: dot-leaders + trailing page numbers, or numbered section
entries), replacing noise pages with a one-line marker. The module TOCs
(VLM output) are already clean and untouched. Idempotent-ish: writes
tocs/<key>.trimmed.txt only for root-* keys with a .txt source.
"""
import os
import re

TR = '/home/z/my-project/temporary-references/tocs'
DOT = re.compile(r'\.{2,}\s*\d{1,4}\s*$')
DOT2 = re.compile(r'\s\d{1,4}\s*$')
NUM = re.compile(r'^\s*\d{1,2}(\.\d{1,2})?\s+[A-Z&(]')

for name in sorted(os.listdir(TR)):
    if not name.endswith('.txt') or not name.startswith('root-'):
        continue
    key = name[:-4]
    if key in ('root-loney-trigonometry', 'root-rudin-pma-3e'):
        continue  # VLM output, already clean
    raw = open(f'{TR}/{name}').read()
    pages = raw.split('---PAGEBREAK---')
    kept = []
    for i, page in enumerate(pages):
        lines = [ln.rstrip() for ln in page.splitlines()]
        nonempty = [ln for ln in lines if ln.strip()]
        if not nonempty:
            continue
        score = 0
        for ln in nonempty:
            if DOT.search(ln):
                score += 2
            elif NUM.match(ln) and DOT2.search(ln):
                score += 1
            elif re.match(r'^\s*(Part|PART|Chapter|CHAPTER|Appendix|Answers|Index|Review|Problems|Exercises)\b', ln):
                score += 1
        if score >= 3:
            kept.append(page.strip('\n'))
        else:
            kept.append(f'[front-matter page {i+1}: not contents — omitted]')
    out = '\n\n'.join(kept)
    open(f'{TR}/{name}', 'w').write(out)
    print(f'{key}: trimmed to {len(out)} chars')
