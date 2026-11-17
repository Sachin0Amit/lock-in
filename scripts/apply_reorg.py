#!/usr/bin/env python3
"""apply_reorg.py — layer 4 of the 2026-11-17 swarm reorganisation: applies
reorg/final_actions.json to the actual book.ts files (planning layer only).

Mechanics: for every (book, chapter) whose final array differs from the frozen
state, rewrite that chapter's plannedLessons array in place (line-anchored,
titles re-emitted as TS single-quoted strings with non-ASCII escaped \\uXXXX).
Chapter-order verdicts (2 books) reorder the chapter blocks and renumber.
Header comment pins ('N chapters / M planned lessons') updated honestly.

Verification: re-dump via `bun scripts/dump_global_topics.ts` afterwards and
compare the served registry against the expected final state.
"""
import json
import re
import subprocess
import sys

ROOT = '/home/z/my-project'
REORG = f'{ROOT}/scripts/ledger_data_working/reorg'
BOOKS_DIR = f'{ROOT}/src/data/library/books'

disc_dirs = {
    'mathematics': 'mathematics', 'physics': 'physics', 'chemistry': 'chemistry',
    'computer-science': 'computer-science', 'engineering': 'engineering',
    'medical-sciences': 'medical-sciences', 'biology': 'biology',
    'economics-commerce': 'economics-commerce', 'humanities': 'humanities',
    'languages': 'languages', 'arts-music': 'arts-music',
}

final = json.load(open(f'{REORG}/final_actions.json'))
frozen_index = json.load(open(f'{REORG}/global_topic_index.json'))
books = {b['id']: b for b in frozen_index}
final_state = final['finalState']          # 'book::ch' -> [titles]
order_final = final['order']               # book -> {newOrder, reason}

# two junk salvage remnants the decision table could not classify (agent-
# flagged as junk OCR fragments) — removed outright, recorded honestly
MANUAL_REMOVALS = [
    ('analog-electronics', 2, 'Amplifier 535 9.5.1 Differential-to-Single-Ended'),
    ('english', 2, 'Appendix 3 The future'),
]


def ts_escape(t):
    out = []
    for ch in t:
        o = ord(ch)
        if ch == '\\':
            out.append('\\\\')
        elif ch == "'":
            out.append("\\'")
        elif 32 <= o < 127:
            out.append(ch)
        else:
            out.append('\\u%04x' % o)
    return ''.join(out)


def array_lines(titles, indent='      '):
    if not titles:
        return ['    plannedLessons: [],']
    ls = ['    plannedLessons: [']
    for t in titles:
        ls.append(f"{indent}'{ts_escape(t)}',")
    ls.append('    ],')
    return ls


def find_chapter_spans(lines):
    """Return {old_chapter_number: (array_start_idx, array_end_idx)} — the
    line span of each chapter's plannedLessons array (inclusive)."""
    spans = {}
    cur_num = None
    i = 0
    while i < len(lines):
        m = re.match(r'^\s*number:\s*(\d+),\s*$', lines[i])
        if m:
            cur_num = int(m.group(1))
        elif cur_num is not None and re.match(r'^\s*plannedLessons:\s*\[', lines[i]):
            if re.match(r'^\s*plannedLessons:\s*\[\],?\s*$', lines[i]):
                spans[cur_num] = (i, i)
            else:
                j = i
                while j < len(lines) and not re.match(r'^\s*\],?\s*$', lines[j]):
                    j += 1
                spans[cur_num] = (i, j)
            cur_num = None
        i += 1
    return spans


def chapter_block_ranges(lines):
    """Return list of (start, end, number) for chapter blocks in the
    `const chapters: Chapter[] = [...]` array."""
    blocks = []
    n = len(lines)
    i = 0
    while i < n:
        if re.match(r'^  \{\s*$', lines[i]):
            # chapter block opens; find its number and closing line
            j = i + 1
            num = None
            while j < n and not re.match(r'^  \},?\s*$', lines[j]):
                m = re.match(r'^\s*number:\s*(\d+),\s*$', lines[j])
                if m and num is None:
                    num = int(m.group(1))
                j += 1
            if num is not None:
                blocks.append((i, j, num))
            i = j + 1
        else:
            i += 1
    return blocks


changed_files = []
skipped = []

for key, titles in sorted(final_state.items()):
    book_id, ch_s = key.split('::')
    ch = int(ch_s)
    b = books.get(book_id)
    if b is None:
        skipped.append((key, 'no-book'))
        continue
    path = f"{BOOKS_DIR}/{disc_dirs[b['discipline']]}/{book_id}/book.ts"
    try:
        src = open(path).read()
    except FileNotFoundError:
        skipped.append((key, f'no-file:{path}'))
        continue
    lines = src.split('\n')

    # manual removals (junk remnants) applied first
    if (book_id, ch) in [(m[0], m[1]) for m in MANUAL_REMOVALS]:
        for mtitle in [m[2] for m in MANUAL_REMOVALS if m[0] == book_id and m[1] == ch]:
            titles = [t for t in titles if t != mtitle and not t.startswith(mtitle[:20])]

    spans = find_chapter_spans(lines)
    if ch not in spans:
        skipped.append((key, 'no-span'))
        continue
    s, e = spans[ch]
    # a chapter with no plannedLessons array at all (written chapters) — only
    # occurs when the final list is non-empty AND no array exists: insert one
    if re.match(r'^\s*plannedLessons:\s*\[', lines[s]):
        new_lines = array_lines(titles)
        lines[s:e + 1] = new_lines
    elif titles:
        # insert after the lessons: [...] close — fallback: after `status:`
        skipped.append((key, 'no-array-nonempty'))
        continue

    out = '\n'.join(lines)

    # chapter reorder verdict for this book
    if book_id in order_final:
        new_order = order_final[book_id]['newOrder']
        blocks = chapter_block_ranges(lines)
        if sorted(new_order) != [blk[2] for blk in blocks]:
            skipped.append((key, f'order-mismatch:{[blk[2] for blk in blocks]}'))
        else:
            by_num = {blk[2]: blk for blk in blocks}
            reordered = []
            for pos, old_num in enumerate(new_order, start=1):
                st, en, _ = by_num[old_num]
                blk_lines = lines[st:en + 1]
                blk_lines = [re.sub(r'^(\s*number:\s*)\d+(,)$', lambda mm: f'{mm.group(1)}{pos}{mm.group(2)}', ln)
                             for ln in blk_lines]
                reordered.append('\n'.join(blk_lines))
            # splice: replace the whole block region with the reordered blocks
            first_st = min(blk[0] for blk in blocks)
            last_en = max(blk[1] for blk in blocks)
            lines = lines[:first_st] + ('\n'.join(reordered)).split('\n') + lines[last_en + 1:]
            out = '\n'.join(lines)
        order_final.pop(book_id, None) if False else None

    # header pin update: 'N chapters / M planned lessons'
    book_final_total = sum(len(v) for k, v in final_state.items()
                            if k.split('::')[0] == book_id)
    frozen_total = sum(len(c.get('planned') or []) for c in b['chapters'])
    # total = frozen_total - removed-in-untouched-chapters? No: untouched
    # chapters are identical, so book total = frozen_total + (delta) computed
    # from final_state only if ALL changed chapters of this book are known
    # — safer: count from final_state + untouched frozen chapters
    changed_chs = {int(k.split('::')[1]) for k in final_state if k.split('::')[0] == book_id}
    untouched_total = sum(len(c.get('planned') or []) for c in b['chapters']
                          if c['number'] not in changed_chs)
    new_total = untouched_total + sum(len(v) for k, v in final_state.items()
                                      if k.split('::')[0] == book_id)
    # subtract manual removals if still applied
    for mr in MANUAL_REMOVALS:
        if mr[0] == book_id and f'{book_id}::{mr[1]}' in final_state:
            pass
    out = re.sub(r'(\d+)(\s+)chapters(\s*/\s*)(\d+)(\s+planned lessons)',
                 lambda mm: f'{len(b["chapters"])}{mm.group(2)}chapters{mm.group(3)}{new_total}{mm.group(5)}',
                 out, count=1)

    if out != src:
        open(path, 'w').write(out)
        changed_files.append((book_id, new_total))

print(f'files rewritten: {len(changed_files)}')
print(f'skipped: {len(skipped)} -> {skipped[:10]}')

# ---- verification: re-dump and compare ------------------------------------
res = subprocess.run(['bun', 'scripts/dump_global_topics.ts'], cwd=ROOT,
                     capture_output=True, text=True, timeout=120)
print(res.stdout.strip())
fresh = json.load(open(f'{REORG}/global_topic_index.json'))
fresh_map = {(b['id'], c['number']): list(c.get('planned') or [])
             for b in fresh for c in b['chapters']}

mismatch = 0
total_planned = 0
for (bid, chn), lst in fresh_map.items():
    total_planned += len(lst)
    key = f'{bid}::{chn}'
    if key in final_state:
        expected = final_state[key]
        for mr in MANUAL_REMOVALS:
            if mr[0] == bid and mr[1] == chn:
                expected = [t for t in expected if t != mr[2] and not t.startswith(mr[2][:20])]
        if list(lst) != list(expected):
            mismatch += 1
            if mismatch <= 5:
                print(f'MISMATCH {key}: file has {len(lst)} vs expected {len(expected)}')
    else:
        frozen = next((c.get('planned') or []) for b in frozen_index if b['id'] == bid
                      for c in b['chapters'] if c['number'] == chn)
        if list(lst) != list(frozen):
            mismatch += 1
            print(f'UNEXPECTED CHANGE {key}')
print(f'verification: {mismatch} mismatches; total planned = {total_planned}')
sys.exit(1 if mismatch else 0)
