#!/usr/bin/env python3
"""reconcile_exam_ledgers.py — the 2026-11-17 swarm-reorg exam-ledger
reconciliation: the ledger lines' routed books trail the cleaned registry
(witness lessons removed/moved/retitled). Re-scores EVERY line of every
ledger against the live registry blobs (the gate's exact standard) and
re-routes lines that re-score >= 0.60 on a different book (direct when the
home discipline still owns it, cross honestly otherwise). True gaps are
emitted to reorg/exam_true_gaps.json for the witness pass."""
import json
import os
import re
from collections import defaultdict

ROOT = '/home/z/my-project'
REORG = f'{ROOT}/scripts/ledger_data_working/reorg'
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


def toks(text):
    return {norm(w) for w in re.split(r'[^A-Za-z0-9]+', text)
            if len(norm(w)) >= 3 and norm(w) not in STOP}


fresh = json.load(open(f'{REORG}/global_topic_index.json'))
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
tok_by_book = blob


def score(tt, book_id):
    if not tt:
        return 0.0
    bt = tok_by_book.get(book_id, set())
    return len(set(tt) & bt) / len(set(tt))


rerouted = 0
still_failing = []
true_gaps = []
for fn in sorted(os.listdir(DATA)):
    if not fn.endswith('_exams.json'):
        continue
    path = f'{DATA}/{fn}'
    d = json.load(open(path))
    disc = d.get('discipline')
    changed = False
    for ex in d.get('exams', []):
        for ln in ex.get('lines', []):
            tt = toks(ln.get('topic', ''))
            if not tt:
                continue
            s = score(tt, ln['book'])
            if s >= 0.6:
                continue
            # find the best live home
            scored = []
            for bid, bt in tok_by_book.items():
                if bid == ln['book']:
                    continue
                sc = len(set(tt) & bt) / len(set(tt))
                if sc >= 0.6:
                    scored.append((sc, bid))
            scored.sort(reverse=True)
            # prefer the home-discipline book among qualifying
            home = [x for x in scored if disc_of[x[1]] == disc]
            pick = home[0] if home else (scored[0] if scored else None)
            if pick is None:
                true_gaps.append({'ledger': d.get('ledger'), 'exam': ex.get('exam'),
                                  'topic': ln['topic'], 'oldBook': ln['book'],
                                  'oldScore': round(s, 2), 'discipline': disc})
                continue
            sc, bid = pick
            ln['book'] = bid
            ln['score'] = round(sc, 2)
            ln['status'] = 'direct' if disc_of[bid] == disc else 'cross'
            changed = True
            rerouted += 1
    if changed:
        d.setdefault('notes', []).append(
            'The 2026-11-17 swarm-reorganisation pass deduplicated/moved the planned '
            'lessons the lines witnessed; the affected lines were re-routed to the '
            'books that now own their topics (re-scored live, >=0.60 standard).')
        with open(path, 'w') as f:
            json.dump(d, f, indent=1, ensure_ascii=False)
        print(f'{fn}: re-routed lines (cumulative {rerouted})')

print(f're-routed: {rerouted}; true gaps: {len(true_gaps)}')
with open(f'{REORG}/exam_true_gaps.json', 'w') as f:
    json.dump(true_gaps, f, indent=1, ensure_ascii=False)
for g in true_gaps[:20]:
    print(' GAP:', g['ledger'], '|', g['topic'][:60], '| was', g['oldBook'])
print('DONE')
