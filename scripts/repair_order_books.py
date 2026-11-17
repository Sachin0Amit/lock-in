#!/usr/bin/env python3
"""repair_order_books.py — one-shot: the two order-swapped books
(heat-and-thermodynamics, combinatorics) were cross-wired by the applier's
mid-loop swap toggle (its order branch re-ran per key because the pop() was
dead code). Restore both files from git HEAD, write the final_state arrays
at OLD chapter numbering, then apply the chapter reorder ONCE and renumber.
"""
import json
import re
import subprocess

ROOT = '/home/z/my-project'
REORG = f'{ROOT}/scripts/ledger_data_working/reorg'

final = json.load(open(f'{REORG}/final_actions.json'))
fs = final['finalState']
orders = final['order']          # book -> {newOrder, reason}

BOOKS = {
    'heat-and-thermodynamics': ('physics', [1, 2, 3, 4, 6, 5, 7, 8, 9, 10]),
    'combinatorics': ('mathematics', [1, 2, 4, 3, 5, 6]),
}


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


def array_lines(titles):
    if not titles:
        return ['    plannedLessons: [],']
    ls = ['    plannedLessons: [']
    for t in titles:
        ls.append(f"      '{ts_escape(t)}',")
    ls.append('    ],')
    return ls


def find_chapter_spans(lines):
    spans = {}
    cur_num = None
    for i, ln in enumerate(lines):
        m = re.match(r'^\s*number:\s*(\d+),\s*$', ln)
        if m:
            cur_num = int(m.group(1))
        elif cur_num is not None and re.match(r'^\s*plannedLessons:\s*\[', ln):
            if re.match(r'^\s*plannedLessons:\s*\[\],?\s*$', ln):
                spans[cur_num] = (i, i)
            else:
                j = i
                while j < len(lines) and not re.match(r'^\s*\],?\s*$', lines[j]):
                    j += 1
                spans[cur_num] = (i, j)
            cur_num = None
    return spans


def chapter_block_ranges(lines):
    blocks = []
    n = len(lines)
    i = 0
    while i < n:
        if re.match(r'^  \{\s*$', lines[i]):
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


for book_id, (disc, new_order) in BOOKS.items():
    rel = f'src/data/library/books/{disc}/{book_id}/book.ts'
    path = f'{ROOT}/{rel}'
    src = subprocess.run(['git', 'show', f'HEAD:{rel}'], cwd=ROOT,
                         capture_output=True, text=True, check=True).stdout
    lines = src.split('\n')

    # 1. write final_state arrays at OLD numbering (bottom-up so spans stay valid)
    spans = find_chapter_spans(lines)
    book_lists = {}
    for ch in sorted(spans, reverse=True):
        key = f'{book_id}::{ch}'
        titles = fs.get(key)
        if titles is None:
            continue  # unchanged chapter — leave the array as-is
        book_lists[ch] = titles
        s, e = spans[ch]
        lines[s:e + 1] = array_lines(titles)

    # 2. reorder chapter blocks ONCE + renumber
    blocks = chapter_block_ranges(lines)
    have = [b[2] for b in blocks]
    if sorted(new_order) != have:
        raise SystemExit(f'{book_id}: order mismatch blocks={have} new={new_order}')
    by_num = {n: b for b in blocks for n in [b[2]]}
    reordered = []
    for pos, old_num in enumerate(new_order, start=1):
        st, en, _ = by_num[old_num]
        blk = lines[st:en + 1]
        blk = [re.sub(r'^(\s*number:\s*)\d+(,)$',
                      lambda mm: f'{mm.group(1)}{pos}{mm.group(2)}', ln)
               for ln in blk]
        reordered.append(blk)
    first_st = min(b[0] for b in blocks)
    last_en = max(b[1] for b in blocks)
    lines = lines[:first_st] + [ln for blk in reordered for ln in blk] + lines[last_en + 1:]

    out = '\n'.join(lines)
    # 3. header pin
    frozen = json.load(open(f'{REORG}/global_topic_index.pre.json'))
    fb = next(b for b in frozen if b['id'] == book_id)
    changed = {int(k.split('::')[1]) for k in fs if k.split('::')[0] == book_id}
    untouched = sum(len(c.get('planned') or []) for c in fb['chapters']
                    if c['number'] not in changed)
    new_total = untouched + sum(len(v) for k, v in fs.items()
                                if k.split('::')[0] == book_id)
    out = re.sub(r'(\d+)(\s+)chapters(\s*/\s*)(\d+)(\s+planned lessons)',
                 lambda mm: f'{len(fb["chapters"])}{mm.group(2)}chapters{mm.group(3)}{new_total}{mm.group(5)}',
                 out, count=1)
    open(path, 'w').write(out)
    print(f'{book_id}: restored + {len(book_lists)} arrays rewritten + '
          f'order {new_order} applied; header total {new_total}')

print('REPAIR DONE')
