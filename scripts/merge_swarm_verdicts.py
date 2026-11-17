#!/usr/bin/env python3
"""merge_swarm_verdicts.py — layer 3 of the 2026-11-17 swarm reorganisation
(REWRITTEN as a two-pass decision table after the sequential merge was found
to let later 'keep' verdicts lose to earlier removals).

PASS 1 collects every ruling per title into a decision table with priority:
  0 auto-action (the deterministic plan)
  1 dup-cluster removal (deliberate duplicate resolution — beats auto)
  2 agent veto / verdict actions (misplaced, extra, autoReview amend)
  3 agent 'keep' ruling (misplaced/extra keep) — the strongest: the agent
    read the book and ruled the title FITS. Only a competing keep-losing
    cluster ruling outranks it via the owner-directive (none expected).
PASS 2 applies the winning decision per title exactly once.

Emits reorg/final_actions.json {actions, order, thin, stats, skips}.
"""
import json
import os
import re
from collections import defaultdict

ROOT = '/home/z/my-project'
REORG = f'{ROOT}/scripts/ledger_data_working/reorg'
VD = f'{REORG}/swarm/verdicts'

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


AUTHORED = {'foundation-mathematics', 'arithmetic-number-systems',
            'elementary-algebra', 'advanced-algebra'}

index = json.load(open(f'{REORG}/global_topic_index.json'))
books = {b['id']: b for b in index}
disc_of = {b['id']: b['discipline'] for b in index}

# frozen pre-state: (book, chapter) -> [titles]; plus a title locator
frozen = {(b['id'], c['number']): list(c.get('planned') or [])
          for b in index for c in b['chapters']}
frozen_pos = {}
for (k, lst) in frozen.items():
    for i, t in enumerate(lst):
        frozen_pos.setdefault(k, {})[t] = i


def locate_key(book, chapter, title):
    """Map a (possibly truncated/paraphrased) title reference to the frozen
    record key (book, chapter, exact-title)."""
    lst = frozen.get((book, chapter))
    if lst is None:
        return None
    if title in lst:
        return (book, chapter, title)
    tt = toks(title)
    best, bt = 0.0, None
    for t in lst:
        if t[:28] == title[:28]:
            return (book, chapter, t)
        ov = overlap(tt, toks(t))
        if ov > best:
            best, bt = ov, t
    if best >= 0.6 and bt is not None:
        return (book, chapter, bt)
    return None


def rkey(k):
    return (k[0], k[1], norm(re.sub(r'\s+', ' ', k[2].lower()))[:60])


# ---------------- pass 1: decision table --------------------------------
plan = json.load(open(f'{REORG}/fix_plan.json'))

verdicts = []
for fn in sorted(os.listdir(VD)):
    if fn.endswith('.json'):
        verdicts.append(json.load(open(f'{VD}/{fn}')))
print(f'verdicts loaded: {len(verdicts)}')

decisions = {}   # record key -> (priority, action dict, source)
conflicts = []


def offer(key, priority, action, source):
    k = rkey(key)
    cur = decisions.get(k)
    if cur is None or priority > cur[0]:
        if cur is not None and cur[0] != priority:
            conflicts.append({'title': key[2], 'book': key[0],
                              'winner': source, 'loser': cur[2],
                              'kept': action['op']})
        decisions[k] = (priority, action, source)
        return True
    return False


# 1a. auto actions (priority 0)
auto_n = 0
for a in plan['actions']:
    key = locate_key(a['book'], a['chapter'], a['title'])
    if key is None:
        continue
    offer(key, 0, {**a, 'title': key[2]}, 'auto')
    auto_n += 1

# 1b. dup-cluster removals (priority 1)
dup_pend = plan['dupAdjudicate']
dup_rulings = defaultdict(list)
for v in verdicts:
    for e in v.get('dupes', []) or []:
        if isinstance(e, dict):
            k2 = norm(re.sub(r'\s+', ' ', e.get('title', '').lower()))[:40]
            dup_rulings[k2].append({'agent': v.get('agent'), **e})

dup_consolidated = dup_keepboth = dup_unmatched = 0
for cluster in dup_pend:
    ct = toks(cluster['title'])
    key = norm(re.sub(r'\s+', ' ', cluster['title'].lower()))[:40]
    rs = dup_rulings.get(key)
    if not rs:
        best, bov = None, 0.0
        for k2, lst in dup_rulings.items():
            ov = overlap(ct, toks(k2))
            if ov > bov:
                best, bov = lst, ov
        rs = best if bov >= 0.5 else None
    if not rs:
        dup_unmatched += 1
        continue
    members = [m['book'] for m in cluster['members']]

    def rank(r):
        w = r.get('winner', '')
        score = 0
        if r.get('action') == 'consolidate' and w in members:
            score += 2
        if w and w in disc_of and str(r.get('agent', '')).startswith(disc_of[w].split('-')[0] if disc_of[w] else ''):
            score += 1
        return score

    r = sorted(rs, key=rank, reverse=True)[0]
    if r.get('action') == 'keep-both':
        dup_keepboth += 1
        continue
    w = r.get('winner', '')
    if w and w in members:
        kept = False
        for m in cluster['members']:
            if m['book'] == w and not kept:
                kept = True
                continue
            key = locate_key(m['book'], m['chapter'], m['title'])
            if key is None:
                continue
            offer(key, 1, {'op': 'remove', 'book': m['book'], 'chapter': m['chapter'],
                           'title': key[2], 'targetBook': w,
                           'why': f'dup: consolidated to {w} (swarm)'},
                  f'dup:{r.get("agent")}')
    else:
        for m in cluster['members']:
            if m['book'] in AUTHORED:
                continue
            key = locate_key(m['book'], m['chapter'], m['title'])
            if key is None:
                continue
            offer(key, 1, {'op': 'remove', 'book': m['book'], 'chapter': m['chapter'],
                           'title': key[2],
                           'why': f'dup: junk cluster / covered by {w or "owning book"} (swarm)'},
                  f'dup:{r.get("agent")}')
    dup_consolidated += 1

# 1c. agent verdicts (misplaced + extra + veto/amend autoReview) — priority 2/3
mis_done = set()
mis_keeps = mis_acts = 0
for v in verdicts:
    for e in v.get('misplaced', []) or []:
        if not isinstance(e, dict):
            continue
        key = locate_key(e['book'], e['chapter'], e['title'])
        if key is None:
            continue
        mis_done.add(rkey(key))
        act = e.get('action')
        if act == 'keep':
            offer(key, 3, {'op': 'keep', 'book': e['book'], 'chapter': e['chapter'],
                            'title': key[2]}, f'mis-keep:{v.get("agent")}')
            mis_keeps += 1
        elif act in ('move', 'remove', 'retitle', 'move-chapter'):
            offer(key, 2, {'op': act, 'book': e['book'], 'chapter': e['chapter'],
                           'title': key[2], 'targetBook': e.get('targetBook'),
                           'targetChapter': e.get('targetChapter'),
                           'newTitle': e.get('newTitle'),
                           'why': 'swarm-verdict: ' + (e.get('reason') or '')[:160]},
                  f'mis:{v.get("agent")}')
            mis_acts += 1

extra_acts = 0
for v in verdicts:
    for e in v.get('extra', []) or []:
        if not isinstance(e, dict):
            continue
        act = e.get('action')
        if act not in ('move', 'remove', 'retitle', 'move-chapter', 'keep'):
            continue
        key = locate_key(e['book'], e['chapter'], e['title'])
        if key is None:
            continue
        if act == 'keep':
            offer(key, 3, {'op': 'keep', 'book': e['book'], 'chapter': e['chapter'],
                            'title': key[2]}, f'extra-keep:{v.get("agent")}')
        else:
            offer(key, 2, {'op': act, 'book': e['book'], 'chapter': e['chapter'],
                           'title': key[2], 'targetBook': e.get('targetBook'),
                           'targetChapter': e.get('targetChapter'),
                           'newTitle': e.get('newTitle'),
                           'why': 'free-scan: ' + (e.get('reason') or '')[:160]},
                  f'extra:{v.get("agent")}')
            extra_acts += 1

auto_amend = auto_veto = 0
for v in verdicts:
    ar = v.get('autoReview', [])
    if isinstance(ar, str):
        continue
    for e in ar or []:
        if not isinstance(e, dict):
            continue
        key = locate_key(e['book'], e['chapter'], e.get('title', ''))
        if key is None:
            continue
        kind = e.get('verdict')
        rep = e.get('action')
        if kind == 'veto' and rep in ('remove', 'move', 'retitle', 'move-chapter'):
            offer(key, 2, {'op': rep, 'book': e['book'], 'chapter': e['chapter'],
                           'title': key[2], 'targetBook': e.get('targetBook') or None,
                           'targetChapter': e.get('targetChapter'),
                           'newTitle': e.get('newTitle') or None,
                           'why': 'veto-replacement: ' + (e.get('reason') or '')[:140]},
                  f'veto:{v.get("agent")}')
            auto_veto += 1
        elif kind == 'veto':
            # plain veto: the auto action must NOT run; title stays unless a
            # higher-priority rule removes it
            rk = rkey(key)
            a = decisions.get(rk)
            keep_act = {'op': 'keep', 'book': e['book'],
                        'chapter': e['chapter'], 'title': key[2]}
            if a is None or a[1].get('op') != 'keep':
                decisions[rk] = (3, keep_act, f'veto-keep:{v.get("agent")}')
            auto_veto += 1
        elif kind == 'amend' and rep in ('remove', 'move', 'retitle', 'move-chapter'):
            offer(key, 2, {'op': rep, 'book': e['book'], 'chapter': e['chapter'],
                           'title': key[2], 'targetBook': e.get('targetBook') or None,
                           'targetChapter': e.get('targetChapter'),
                           'newTitle': e.get('newTitle') or None,
                           'why': 'amended: ' + (e.get('reason') or '')[:140]},
                  f'amend:{v.get("agent")}')
            auto_amend += 1

print(f'auto offered {auto_n}; dup: consolidated {dup_consolidated}, '
      f'keep-both {dup_keepboth}, unmatched {dup_unmatched}; '
      f'mis: {mis_acts} actions + {mis_keeps} keeps; extra {extra_acts}; '
      f'autoReview: {auto_amend} amends + {auto_veto} vetoes')
print(f'decisions: {len(decisions)}; conflicts resolved: {len(conflicts)}')

# ---------------- pass 2: apply to the live model ------------------------
live = {(b['id'], c['number']): list(c.get('planned') or [])
        for b in index for c in b['chapters']}

action_log = []
skips = []
keeps = 0
for k, (priority, action, source) in decisions.items():
    book, chapter, title = action['book'], action['chapter'], action['title']
    if book in AUTHORED:
        skips.append({'what': 'authored-protected', 'action': action})
        continue
    lst = live.get((book, chapter))
    if lst is None or title not in lst:
        skips.append({'what': 'not-in-live', 'action': action})
        continue
    op = action['op']
    if op == 'keep':
        keeps += 1
        continue
    i = lst.index(title)
    if op == 'remove':
        lst.pop(i)
        action_log.append(action)
    elif op == 'retitle':
        new_title = action.get('newTitle') or title
        lst[i] = new_title
        action_log.append(action)
    elif op == 'move':
        tb, tc = action.get('targetBook'), action.get('targetChapter')
        if not tb or tb in AUTHORED or tb not in books:
            skips.append({'what': 'bad-target', 'action': action})
            continue
        if not isinstance(tc, int) or (tb, tc) not in live:
            tc = books[tb]['chapters'][-1]['number']
        lst.pop(i)
        live[(tb, tc)].append(title)
        action['targetChapter'] = tc
        action_log.append(action)
    elif op == 'move-chapter':
        tc = action.get('targetChapter')
        if not isinstance(tc, int) or (book, tc) not in live:
            skips.append({'what': 'bad-target-chapter', 'action': action})
            continue
        lst.pop(i)
        live[(book, tc)].append(title)
        action_log.append(action)
    else:
        skips.append({'what': 'unknown-op', 'action': action})

# order + thin verdicts
order_final = {}
for v in verdicts:
    for o in v.get('order', []) or []:
        if isinstance(o, dict) and o.get('newOrder') and o.get('book'):
            order_final[o['book']] = {'newOrder': o['newOrder'], 'reason': o.get('reason', '')}
thin_final = []
for v in verdicts:
    for t in v.get('thin', []) or []:
        if isinstance(t, dict) and t.get('action') == 'merge':
            thin_final.append(t)

stats = {
    'autoOffered': auto_n, 'dupConsolidated': dup_consolidated,
    'dupKeepBoth': dup_keepboth, 'dupUnmatched': dup_unmatched,
    'misActions': mis_acts, 'misKeeps': mis_keeps, 'extraActions': extra_acts,
    'autoAmends': auto_amend, 'autoVetoes': auto_veto,
    'decisions': len(decisions), 'keeps': keeps,
    'appliedActions': len(action_log), 'skips': len(skips),
    'conflicts': len(conflicts),
    'plannedBefore': sum(len(v2) for v2 in live.values()),
    'orderBooks': list(order_final), 'thinMerges': len(thin_final),
}
stats['plannedAfter'] = sum(len(l) for l in live.values())
with open(f'{REORG}/final_actions.json', 'w') as f:
    json.dump({'actions': action_log, 'order': order_final, 'thin': thin_final,
               'decisions': {str(k): v[1] for k, v in decisions.items()},
               'finalState': {f'{b}::{c}': lst for (b, c), lst in live.items()
                              if lst != frozen.get((b, c), [])},
               'stats': stats, 'skips': skips, 'conflicts': conflicts}, f,
              indent=1, ensure_ascii=False)
print(json.dumps(stats, indent=1))
print('DONE')
