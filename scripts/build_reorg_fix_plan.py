#!/usr/bin/env python3
"""build_reorg_fix_plan.py — layer 2 of the 2026-11-17 swarm reorganisation:
turns the deterministic detections into a guarded, reviewable FIX PLAN.

RECREATED VERBATIM after a swarm agent's mid-flight `git clean` wiped the
untracked early-pipeline scripts (the pass state survived on disk).

Auto-rules (all planning-level, zero authoring; authored books exempt):
  J  junk-certain  -> remove; SALVAGE when exactly one clean alpha fragment
                      remains that fits the book's clean profile (>=0.5) and
                      is not already covered (retitle in place)
  D  cross-book dupes -> ONE winner survives: authored-book member wins, else
                      title-level specialist; NEAR-dup clusters and
                      non-grounded winners go to the swarm (the token layer's
                      scaffolding-word false positives proved it untrustworthy
                      for auto consolidation)
  W  within-book dupes -> keep the earliest-chapter copy
  M  misplaced     -> AUTO-move ONLY when grounded (the exam-ledger truth
                      agrees, or the target is a title-level specialist);
                      everything else -> swarm adjudication
  I  intra-book chapter moves -> move to the best-fitting chapter of the same
                      book (dedup-guarded)

Emits reorg/fix_plan.json {actions, dupAdjudicate, misAdjudicate,
thinChapters, stats} and per-discipline review slices
reorg/swarm/<disc>-plan.json for the agents.
"""
import json
import re
from collections import defaultdict

ROOT = '/home/z/my-project'
REORG = f'{ROOT}/scripts/ledger_data_working/reorg'

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
    out = []
    for w in re.split(r'[^A-Za-z0-9]+', text):
        t = norm(w)
        if len(t) >= 3 and t not in STOP:
            out.append(t)
    return out


def overlap(a, b):
    a, b = set(a), set(b)
    if not a or not b:
        return 0.0
    return len(a & b) / min(len(a), len(b))


def normtitle(title):
    t = re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]+', ' ', title.lower())).strip()
    return t


AUTHORED = {'foundation-mathematics', 'arithmetic-number-systems',
            'elementary-algebra', 'advanced-algebra'}

index = json.load(open(f'{REORG}/global_topic_index.json'))
books = {b['id']: b for b in index}

clean_tokens = {}
title_tokens = {}
chapter_tokens = {}
for b in index:
    parts = [b['title'], b.get('subtitle') or '', b['description'] or '']
    title_tokens[b['id']] = set(toks(b['title'] + ' ' + (b.get('subtitle') or '')))
    for c in b['chapters']:
        parts.append(c['title'])
        parts.append(c.get('summary') or '')
        for w in c.get('written') or []:
            parts.append(w['title'])
        cp = set(toks(c['title'] + ' ' + (c.get('summary') or '')))
        for w in c.get('written') or []:
            cp |= set(toks(w['title']))
        chapter_tokens[(b['id'], c['number'])] = cp
    clean_tokens[b['id']] = set(toks(' '.join(parts)))

# live model of every book's title lists (mutated as the plan applies)
live_planned = {(b['id'], c['number']): list(c.get('planned') or [])
                for b in index for c in b['chapters']}
live_written = {(b['id'], c['number']): [w['title'] for w in c.get('written') or []]
                for b in index for c in b['chapters']}


def all_titles(bid):
    out = []
    for c in books[bid]['chapters']:
        out.extend(live_planned[(bid, c['number'])])
        out.extend(live_written[(bid, c['number'])])
    return out


def title_exists(bid, title, thresh=0.6):
    tt = set(toks(title))
    if not tt:
        return True
    for other in all_titles(bid):
        ot = set(toks(other))
        if ot and normtitle(other) == normtitle(title):
            return True
        if ot and len(tt) >= 2 and overlap(tt, ot) >= thresh:
            return True
    return False


def best_chapter(bid, title, exclude=None):
    tt = set(toks(title))
    if not tt:
        return None
    best, bs = None, -1.0
    for c in books[bid]['chapters']:
        if exclude is not None and c['number'] == exclude:
            continue
        ct = chapter_tokens[(bid, c['number'])]
        s = len(tt & ct) / len(tt)
        if s > bs:
            best, bs = c['number'], s
    return (best, bs) if best is not None else (None, 0.0)


actions = []          # {op, book, chapter, idx?, title, targetBook?, targetChapter?, newTitle?}
keep_both_pending = []


def act(op, book, chapter, idx, title, **kw):
    a = {'op': op, 'book': book, 'chapter': chapter, 'idx': idx, 'title': title}
    a.update(kw)
    actions.append(a)
    return a


def locate(book, chapter, title):
    """Re-locate a title in the LIVE list — recorded idx values go stale as
    earlier classes drop items from the same chapter."""
    lst = live_planned[(book, chapter)]
    if title in lst:
        return lst.index(title)
    return -1


def drop_live(book, chapter, idx):
    lst = live_planned[(book, chapter)]
    if 0 <= idx < len(lst):
        lst.pop(idx)


# ============================ J: junk ===================================
junk = json.load(open(f'{REORG}/junk.json'))
salvaged = 0


def salvage_fragment(title):
    t = title
    t = re.sub(r'^\s*\d{1,2}\s?[-\u2013.]\s?\d{1,2}\b', ' ', t)
    t = re.sub(r'\b\d{2,}\b', ' ', t)
    t = re.sub(r'(?i)\b(summary|bio|b io)\b', ' ', t)
    frags = [f.strip(' ,;-\u2013:;()') for f in re.split(r'\s{2,}|(?=\b[A-Z]\w+ )', t)]
    frags = [f for f in frags if f and re.fullmatch(r"[A-Za-z][A-Za-z'\u2019-]*(?:\s[A-Za-z][A-Za-z'\u2019-]*){0,5}", f)]
    return frags


for r in junk['certain']:
    book, chapter, title = r['book'], r['chapter'], r['title']
    if book in AUTHORED:
        continue
    tidx = locate(book, chapter, title)
    if tidx < 0:
        continue
    frags = salvage_fragment(title)
    salvage = None
    if len(frags) == 1:
        cand = frags[0].strip()
        tt = set(toks(cand))
        if tt and len(tt) >= 1 and len(tt & clean_tokens.get(book, set())) / len(tt) >= 0.5:
            salvage = cand
    if salvage and not title_exists(book, salvage):
        act('salvage', book, chapter, tidx, title, newTitle=salvage)
        live_planned[(book, chapter)][tidx] = salvage
        salvaged += 1
    else:
        act('remove', book, chapter, tidx, title, why='junk-certain: ' + r.get('why', ''))
        drop_live(book, chapter, tidx)

# ==================== D: cross-book duplicates ==========================
dupes_cross = json.load(open(f'{REORG}/dupes_cross.json'))
consolidated = 0
dup_adjudicate = []
for e in dupes_cross:
    members = e['members']
    tt = set(toks(e['title']))
    exact = len({normtitle(m['title']) for m in members}) == 1
    authored = [m for m in members if m['book'] in AUTHORED]
    winners = None
    mode = None
    if authored:
        winners, losers = authored, [m for m in members if m not in authored]
        mode = 'authored-owns'
    elif exact and tt and tt <= title_tokens.get(members[0]['book'], set()):
        winners = [members[0]]
        losers = [m for m in members if m is not members[0]]
        mode = 'specialist'
    else:
        specialists = [m for m in members if tt and tt <= title_tokens.get(m['book'], set())]
        if len(specialists) == 1:
            winners, losers = specialists, [m for m in members if m not in specialists]
            mode = 'specialist'
        else:
            dup_adjudicate.append({**e, 'exact': exact})
            continue
    for m in losers:
        if m['book'] in AUTHORED:
            continue
        tidx = locate(m['book'], m['chapter'], m['title'])
        if tidx < 0:
            continue
        act('remove', m['book'], m['chapter'], tidx, m['title'],
            why=f'dup: consolidated to {winners[0]["book"]} ({mode})',
            targetBook=winners[0]['book'])
        drop_live(m['book'], m['chapter'], tidx)
    consolidated += 1

# ==================== W: within-book duplicates =========================
dupes_within = json.load(open(f'{REORG}/dupes_within.json'))
for e in dupes_within:
    members = sorted(e['members'], key=lambda m: (m['chapter'], m['idx']))
    for m in members[1:]:
        if m['book'] in AUTHORED:
            continue
        tidx = locate(m['book'], m['chapter'], m['title'])
        if tidx < 0:
            continue
        act('remove', m['book'], m['chapter'], tidx, m['title'],
            why=f'dup within book: kept the ch{members[0]["chapter"]} copy')
        drop_live(m['book'], m['chapter'], tidx)

# ==================== M: misplaced =====================================
misplaced = json.load(open(f'{REORG}/misplaced.json'))
moved = removed_as_dup = 0
mis_adjudicate = []
for r in misplaced:
    book, chapter, title = r['book'], r['chapter'], r['title']
    if book in AUTHORED:
        continue
    lst = live_planned[(book, chapter)]
    if title not in lst:
        continue
    tidx = lst.index(title)
    best = r.get('bestBook')
    # AUTO only when the routing is grounded: the exam-ledger truth agrees
    # with bestBook, or bestBook is a title-level specialist of the topic
    tt = set(toks(title))
    grounded = False
    if r.get('ledgerTruth') and best:
        grounded = True
    if best and tt and tt <= title_tokens.get(best, set()):
        grounded = True
    if not grounded:
        mis_adjudicate.append({**r, 'liveIdx': tidx})
        continue
    if best in AUTHORED or best is None:
        alt = None
        for cand in r.get('top3', []):
            if cand['book'] not in AUTHORED and cand['score'] >= 0.5:
                alt = cand['book']
                break
        best = alt
    if not best:
        act('remove', book, chapter, tidx, title,
            why='misplaced; no planned home (authored book owns the topic)')
        drop_live(book, chapter, tidx)
        removed_as_dup += 1
        continue
    if title_exists(best, title):
        act('remove', book, chapter, tidx, title,
            why=f'misplaced; already covered in {best}')
        drop_live(book, chapter, tidx)
        removed_as_dup += 1
        continue
    tch, ts = best_chapter(best, title)
    if tch is None:
        tch = books[best]['chapters'][-1]['number']
    act('move', book, chapter, tidx, title, targetBook=best, targetChapter=tch,
        why=f'misplaced, grounded (own {r.get("ownScore")} -> {best} '
            f'{r.get("bestScore")})')
    drop_live(book, chapter, tidx)
    live_planned[(best, tch)].append(title)
    moved += 1

# ==================== I: intra-book chapter moves =======================
intra = json.load(open(f'{REORG}/intra_book.json'))
for r in intra:
    book, chapter, title = r['book'], r['chapter'], r['title']
    if book in AUTHORED:
        continue
    lst = live_planned[(book, chapter)]
    if title not in lst:
        continue
    tidx = lst.index(title)
    tch = r['bestChapter']
    if title in live_planned[(book, tch)]:
        act('remove', book, chapter, tidx, title,
            why=f'dup of the ch{tch} copy (intra-book)')
        drop_live(book, chapter, tidx)
        continue
    act('move-chapter', book, chapter, tidx, title, targetChapter=tch,
        why=f'fits ch{tch} "{r["bestChapterTitle"]}" '
            f'({r["bestChapterScore"]} vs {r["actualChapterScore"]})')
    drop_live(book, chapter, tidx)
    live_planned[(book, tch)].append(title)

# ==================== thin chapters (< 3 planned left) ==================
thin = []
for b in index:
    if b['id'] in AUTHORED:
        continue
    for c in b['chapters']:
        n = len(live_planned[(b['id'], c['number'])])
        if 0 < n < 3:
            thin.append({'book': b['id'], 'chapter': c['number'],
                         'chapterTitle': c['title'], 'plannedLeft': n})

# ==================== stats + emit ======================================
stats = {
    'junkCertain': len(junk['certain']),
    'junkRemoved': sum(1 for a in actions if a['op'] == 'remove' and 'junk' in a.get('why', '')),
    'salvaged': salvaged,
    'dupCrossClusters': len(dupes_cross),
    'consolidatedAuto': consolidated,
    'dupAdjudicate': len(dup_adjudicate),
    'misplacedAutoGrounded': moved,
    'misAdjudicate': len(mis_adjudicate),
    'removedNoHome': removed_as_dup,
    'withinBookDedup': sum(1 for a in actions if a['op'] == 'remove' and 'dup within' in a.get('why', '')),
    'thinChapters': len(thin),
}
plan = {'actions': actions, 'dupAdjudicate': dup_adjudicate,
        'misAdjudicate': mis_adjudicate,
        'thinChapters': thin, 'stats': stats}
with open(f'{REORG}/fix_plan.json', 'w') as f:
    json.dump(plan, f, indent=1, ensure_ascii=False)
print(json.dumps(stats, indent=1))

# per-discipline review slices for the swarm
DISCIPLINES = sorted({b['discipline'] for b in index})
by_book = {b['id']: b['discipline'] for b in index}
for disc in DISCIPLINES:
    mine = []
    for a in actions:
        if by_book.get(a['book']) == disc or by_book.get(a.get('targetBook')) == disc:
            mine.append(a)
    dup_pend = [e for e in dup_adjudicate
                if any(by_book.get(m['book']) == disc for m in e['members'])]
    mis_pend = [r for r in mis_adjudicate
                if by_book.get(r['book']) == disc]
    thn = [t for t in thin if by_book.get(t['book']) == disc]
    slice_ = {'discipline': disc, 'autoActions': mine, 'dupAdjudicate': dup_pend,
              'misAdjudicate': mis_pend, 'thinChapters': thn,
              'note': 'review auto-actions; adjudicate the pending lists; free-scan the books'}
    with open(f'{REORG}/swarm/{disc}-plan.json', 'w') as f:
        json.dump(slice_, f, indent=1, ensure_ascii=False)
    print(f'{disc}: auto {len(mine)}, dupPend {len(dup_pend)}, misPend {len(mis_pend)}, thin {len(thn)}')
print('DONE')
