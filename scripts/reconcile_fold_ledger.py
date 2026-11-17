#!/usr/bin/env python3
"""reconcile_fold_ledger.py — one-shot for the 2026-11-17 swarm reorg:
the fold ledger's host references trail the cleaned/retitled books. This
reconciles docs/project/TOC_FOLD_LEDGER.json:
  1. retitle mapping — hosts that were retitled by the swarm get the new title
  2. token match — hosts absorbed/removed remap to the best surviving lesson
     of the same book (topic+host tokens, >= 0.5 overlap)
  3. unresolved entries reported for manual adjudication
Also re-emits a reconciliation report."""
import json
import re

ROOT = '/home/z/my-project'

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


def overlap(a, b):
    if not a or not b:
        return 0.0
    return len(a & b) / min(len(a), len(b))


fresh = json.load(open(f'{ROOT}/scripts/ledger_data_working/reorg/global_topic_index.json'))
lesson_titles = {}   # book -> [titles]
for b in fresh:
    lesson_titles[b['id']] = [t for c in b['chapters']
                              for t in (list((c.get('planned') or [])) +
                                        [w['title'] for w in (c.get('written') or [])])]

final = json.load(open(f'{ROOT}/scripts/ledger_data_working/reorg/final_actions.json'))
retitle_map = {}      # (book, oldTitle) -> newTitle
for a in final['actions']:
    if a['op'] == 'retitle':
        retitle_map[(a['book'], a['title'])] = a.get('newTitle')

ledger = json.load(open(f'{ROOT}/docs/project/TOC_FOLD_LEDGER.json'))
resolved, unresolved = [], []
for e in ledger:
    book, host = e['book'], e['host']
    if host in lesson_titles.get(book, []):
        continue   # still valid
    # 1. retitle?
    nt = retitle_map.get((book, host))
    if nt and nt in lesson_titles.get(book, []):
        resolved.append({**e, 'oldHost': host, 'host': nt,
                         'note': e.get('note', '') +
                                 ' [host retitle-mapped 2026-11-17 swarm reorg]'})
        e.update(host=nt)
        continue
    # 2. token match on topic + host against the book's surviving lessons
    tt = toks(e['topic'] + ' ' + host)
    best, bov = None, 0.0
    for t in lesson_titles.get(book, []):
        ov = overlap(tt, toks(t))
        if ov > bov:
            best, bov = t, ov
    if best is not None and bov >= 0.5:
        resolved.append({**e, 'oldHost': host, 'host': best,
                         'note': e.get('note', '') +
                                 f' [host remapped after the 2026-11-17 swarm reorg; match {bov:.2f}]'})
        e.update(host=best)
        continue
    unresolved.append(e)

with open(f'{ROOT}/docs/project/TOC_FOLD_LEDGER.json', 'w') as f:
    json.dump(ledger, f, indent=1, ensure_ascii=False)
print(f'resolved: {len(resolved)}, unresolved: {len(unresolved)}')
for e in unresolved:
    print(' UNRESOLVED:', e['book'], '|', e['topic'][:40], '| host was:', e['host'][:60])
with open(f'{ROOT}/scripts/ledger_data_working/reorg/fold_reconcile_report.json', 'w') as f:
    json.dump({'resolved': resolved, 'unresolved': unresolved}, f, indent=1, ensure_ascii=False)
print('DONE')
