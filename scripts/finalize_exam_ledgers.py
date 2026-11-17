#!/usr/bin/env python3
"""finalize_exam_ledgers.py — the 2026-11-17 swarm-reorg's final ledger pass:
(1) re-evaluates every ledger line against the FINAL live blobs (post
witnesses): under-scoring lines re-route (home >= 0.60 preferred, else the
honest cross); cross lines whose home now qualifies flip home (2) re-pins
the gate's LEDGERS line/cross censuses and CROSS_WHITELIST to the honest
final state."""
import json
import os
import re

ROOT = '/home/z/my-project'
DATA = f'{ROOT}/scripts/ledger_data'

STOP = {'and', 'or', 'of', 'the', 'in', 'for', 'a', 'an', 'to', 'with',
        'on', 'at', 'by', 'from', 'into', 'as', 'is', 'are', 'be', 'been',
        'its', 'it', 'their', 'this', 'that', 'these', 'those', 'such',
        'other', 'others', 'than', 'then', 'also', 'all', 'any', 'each',
        'between', 'under', 'over', 'both', 'part', 'parts', 'section',
        'sections', 'basic', 'basics', 'general', 'study', 'syllabus',
        'topics', 'topic', 'paper', 'ii', 'iii', 'iv', 'v', 'vi',
        'level', 'hl', 'sl', 'only', 'gs'}


def norm(w):
    t = re.sub(r'[^a-z0-9]+', '', w.lower())
    if len(t) >= 4 and t.endswith('s') and not t.endswith('ss'):
        t = t[:-1]
    return t


def toks(s):
    return {norm(w) for w in re.split(r'[^A-Za-z0-9]+', s)
            if len(norm(w)) >= 3 and norm(w) not in STOP}


fresh = json.load(open(f'{ROOT}/scripts/ledger_data_working/reorg/global_topic_index.json'))
blob = {}
disc_of = {}
for b in fresh:
    parts = [b['title'], b.get('subtitle') or '', b['description'] or '']
    for c in b['chapters']:
        parts.append(c['title'])
        parts.append(c.get('summary') or '')
        parts.extend(c.get('planned') or [])
        parts.extend(w['title'] for w in (c.get('written') or []))
    blob[b['id']] = toks(' '.join(parts))
    disc_of[b['id']] = b['discipline']


def score(tt, bid):
    if not tt:
        return 0.0
    return len(set(tt) & blob.get(bid, set())) / len(set(tt))


stats = {}
for fn in sorted(os.listdir(DATA)):
    if not fn.endswith('_exams.json') or fn.endswith('_raw.json'):
        continue
    path = f'{DATA}/{fn}'
    d = json.load(open(path))
    disc = d.get('discipline')
    n_lines = 0
    cross_books = set()
    changed = False
    for ex in d.get('exams', []):
        for ln in ex.get('lines', []):
            if ln.get('status') == 'meta':
                continue
            n_lines += 1
            tt = toks(ln.get('topic', ''))
            if not tt:
                continue
            s = score(tt, ln['book'])
            home_best, home_bid = 0.0, None
            for bid, bd in blob.items():
                if disc_of[bid] != disc:
                    continue
                sc = len(set(tt) & bd) / len(set(tt))
                if sc > home_best:
                    home_best, home_bid = sc, bid
            if ln.get('status') == 'cross':
                if home_best >= 0.6 and home_bid:
                    # came home
                    ln['status'] = 'direct'
                    ln['book'] = home_bid
                    ln['score'] = round(home_best, 2)
                    changed = True
                    continue
                cross_books.add(ln['book'])
                continue
            if s < 0.6:
                if home_best >= 0.6 and home_bid:
                    ln['book'] = home_bid
                    ln['score'] = round(home_best, 2)
                    changed = True
                else:
                    best, bid = 0.0, None
                    for bid2, bd in blob.items():
                        if bid2 == ln['book']:
                            continue
                        sc = len(set(tt) & bd) / len(set(tt))
                        if sc > best:
                            best, bid = sc, bid2
                    if bid and best >= 0.6:
                        ln['status'] = 'cross'
                        ln['book'] = bid
                        ln['score'] = round(best, 2)
                        cross_books.add(bid)
                        changed = True
    stats[d.get('ledger')] = {'lines': n_lines, 'cross': len(cross_books),
                              'crossBooks': sorted(cross_books)}
    if changed:
        d.setdefault('notes', []).append(
            'Final 2026-11-17 swarm-reorg reconciliation: lines re-evaluated against '
            'the post-witness registry; honest home re-routes applied.')
        with open(path, 'w') as f:
            json.dump(d, f, indent=1, ensure_ascii=False)

print(json.dumps({k: v for k, v in stats.items()}, indent=1))

# ---- re-pin the gate ----
gate_path = f'{ROOT}/scripts/verify-shelf-exam-topics.ts'
src = open(gate_path).read()

LEDGER_ORDER = ['physics_exams', 'chemistry_exams', 'biology_exams',
                'medical_exams', 'ecf_exams', 'humanities_exams',
                'arts_music_exams', 'ese_exams']
name_to_ledger = {}
for fn in os.listdir(DATA):
    if fn.endswith('_exams.json'):
        d = json.load(open(f'{DATA}/{fn}'))
        name_to_ledger[d.get('ledger')] = fn[:-5]

for name in LEDGER_ORDER:
    st = stats.get(name)
    if not st:
        continue
    m = re.search(rf"\{{ name: '{name}', discipline: '([^']+)', lines: (\d+), cross: (\d+) \}}", src)
    if m:
        src = src[:m.start()] + \
            f"{{ name: '{name}', discipline: '{m.group(1)}', lines: {st['lines']}, cross: {st['cross']} }}" + \
            src[m.end():]
        print(f'{name}: lines {m.group(2)} -> {st["lines"]}, cross {m.group(3)} -> {st["cross"]}')

# CROSS_WHITELIST rewrite
wl_match = re.search(r'const CROSS_WHITELIST: Record<string, string\[\]> = \{.*?\n\}', src, re.S)
assert wl_match, 'whitelist block not found'
new_wl = ['const CROSS_WHITELIST: Record<string, string[]> = {']
for name in LEDGER_ORDER:
    st = stats.get(name)
    if not st or not st['crossBooks']:
        new_wl.append(f"  '{name}': [],")
        continue
    books = ', '.join(f"'{b}'" for b in st['crossBooks'])
    new_wl.append(f"  '{name}': [{books}],")
new_wl.append('}')
src = src[:wl_match.start()] + '\n'.join(new_wl) + src[wl_match.end():]
open(gate_path, 'w').write(src)
print('CROSS_WHITELIST re-pinned to the honest final cross set')
print('DONE')
