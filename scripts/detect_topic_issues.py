#!/usr/bin/env python3
"""detect_topic_issues.py — the 2026-11-17 swarm-reorganisation pass's
deterministic layer (layer 1) under the owner directive: 'no duplicacy, each
topic in its correct book, everything in arranged order'.

RECREATED VERBATIM after a swarm agent's mid-flight `git clean` wiped the
untracked early-pipeline scripts (the pass state itself survived on disk;
see reorg/global_topic_index.pre.json for the frozen pre-state).

Reads reorg/global_topic_index.json (the frozen registry dump) and emits:
  reorg/junk.json           — OCR/TOC-artifact lesson titles (certain/suspect)
  reorg/dupes_cross.json    — same-topic-in-different-books clusters
  reorg/dupes_within.json   — same-topic-in-two-chapters (one book)
  reorg/misplaced.json      — lessons whose tokens fit ANOTHER book better
                              (clean profiles + the exam-ledger ground truth)
  reorg/intra_book.json     — lessons in the wrong CHAPTER of their own book
  reorg/swarm/<disc>.json   — per-discipline swarm briefs for the agents

The >=60% significant-token standard and the STOP/norm/toks machinery mirror
process_drive_tocs.py / build_exam_ledger.ts (the house standard). Rare-token
grounding: a near-duplicate pair needs >= 2 shared tokens that each appear in
<= 40 books' clean profiles (scaffolding words alone never constitute a dup).
CRITICAL: book profiles are CLEAN — title+subtitle+description+chapter
titles+chapter summaries+written lesson titles only; the auto-appended
plannedLessons are excluded so the pass judges the deliberate planning
layer, not the pollution being cleaned.
"""
import json
import os
import re
import sys
from collections import defaultdict

ROOT = '/home/z/my-project'
REORG = f'{ROOT}/scripts/ledger_data_working/reorg'
DATA_DIR = f'{ROOT}/scripts/ledger_data'

# ---- the house token machinery ----------------------------------------
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


def normtitle(title):
    t = re.sub(r'\s+', ' ', re.sub(r'[^a-z0-9 ]+', ' ', title.lower())).strip()
    return t


def overlap(a, b):
    a, b = set(a), set(b)
    if not a or not b:
        return 0.0
    return len(a & b) / min(len(a), len(b))


# ---- load the frozen registry -----------------------------------------
index = json.load(open(f'{REORG}/global_topic_index.json'))
books = {b['id']: b for b in index}

# ---- CLEAN book profiles (no plannedLessons!) --------------------------
clean_tokens = {}
title_tokens = {}
for b in index:
    parts = [b['title'], b.get('subtitle') or '', b['description'] or '']
    title_tokens[b['id']] = set(toks(b['title'] + ' ' + (b.get('subtitle') or '')))
    for c in b['chapters']:
        parts.append(c['title'])
        parts.append(c.get('summary') or '')
        for w in c.get('written') or []:
            parts.append(w['title'])
    clean_tokens[b['id']] = set(toks(' '.join(parts)))

# per-chapter profiles
chapter_tokens = {}
for b in index:
    for c in b['chapters']:
        parts = [c['title'], c.get('summary') or '']
        for w in c.get('written') or []:
            parts.append(w['title'])
        chapter_tokens[(b['id'], c['number'])] = set(toks(' '.join(parts)))

# inverted index: token -> books whose clean profile has it
tok_books = defaultdict(set)
for bid, ts in clean_tokens.items():
    for t in ts:
        tok_books[t].add(bid)
# rare token: appears in the clean profile of <= 40 books — scaffolding words
# ('named', 'ledger', 'register', 'held'...) live everywhere and must NOT
# alone constitute a duplicate relationship
RARE_MAX_BOOKS = 40

# ---- the exam-ledger ground truth (topic -> owning book) ---------------
ledger_truth = []  # {topic, tokens, book, discipline, ledger}
for fn in sorted(os.listdir(DATA_DIR)):
    if not fn.endswith('_exams.json'):
        continue
    try:
        d = json.load(open(f'{DATA_DIR}/{fn}'))
    except Exception:
        continue
    for ex in d.get('exams', []):
        for ln in ex.get('lines', []):
            tt = toks(ln.get('topic', ''))
            if tt:
                ledger_truth.append({'topic': ln['topic'], 'tokens': tt,
                                     'book': ln['book'], 'discipline': d.get('discipline'),
                                     'ledger': d.get('ledger'), 'status': ln.get('status')})
print(f'ledger ground truth: {len(ledger_truth)} audited topic->book lines')

# ---- every planned lesson as a record ---------------------------------
records = []  # dicts: book, discipline, chapter, chapterTitle, idx, title
for b in index:
    for c in b['chapters']:
        for i, title in enumerate(c.get('planned') or []):
            records.append({'book': b['id'], 'discipline': b['discipline'],
                            'chapter': c['number'], 'chapterTitle': c['title'],
                            'idx': i, 'title': title})

written_titles = defaultdict(list)  # normtitle -> [(book, title)]
for b in index:
    for c in b['chapters']:
        for w in c.get('written') or []:
            written_titles[normtitle(w['title'])].append((b['id'], w['title']))
print(f'planned records: {len(records)}')

# ---- JUNK detection ----------------------------------------------------
FURNITURE_EXACT = {'answers', 'answer', 'index', 'preface', 'contents',
                   'appendix', 'glossary', 'bibliography', 'references',
                   'foreword', 'dedication', 'copyright', 'review questions',
                   'additional problems', 'sample questions'}
junk_certain, junk_suspect = [], []


def junk_class(title):
    t = title.strip()
    tl = t.lower()
    if re.search(r'\b\d{3,}\b', t):
        return 'certain', 'page-number/section-code run'
    if re.match(r'^\d{1,2}\s?[-.]\s?\d{1,2}\b', t):
        return 'certain', 'section-number prefix'
    if re.match(r'^(summary|bio\b)\b', tl) and re.search(r'\d', t):
        return 'certain', 'summary/BIO banner with digits'
    if re.search(r'\b\d{2,3}\b.*\b\d{2,3}\b', t):
        return 'certain', 'two numeric runs (concatenated TOC lines)'
    if tl in FURNITURE_EXACT:
        return 'certain', 'back-matter furniture'
    if re.match(r'^(preface|appendix|answers|index|glossary|bibliography)\b', tl):
        return 'certain', 'front/back-matter furniture'
    words = t.split()
    if len(t) > 62 and len(words) >= 9:
        return 'suspect', 'long concatenated line'
    if re.search(r'\b\d{2}\b', t):
        return 'suspect', 'numeric run'
    if t.endswith((' and', ' or', ' the', ' of', ' in', ' to', ' a')):
        return 'suspect', 'cut-off fragment'
    return None


for r in records:
    k = junk_class(r['title'])
    if k:
        (junk_certain if k[0] == 'certain' else junk_suspect).append(
            {**r, 'why': k[1]})
print(f'junk: certain {len(junk_certain)} / suspect {len(junk_suspect)}')

# ---- DUPLICATE detection ----------------------------------------------
by_norm = defaultdict(list)
for r in records:
    by_norm[normtitle(r['title'])].append(r)
exact_groups = [g for g in by_norm.values() if len(g) > 1]

planned_tok_lists = []
for r in records:
    tt = sorted(set(toks(r['title'])))
    if len(tt) >= 2:
        planned_tok_lists.append((r, tt))
tok_records = defaultdict(list)
for r, tt in planned_tok_lists:
    for t in tt:
        tok_records[t].append((r, tt))

pair_seen = set()
near_pairs = []
for t, lst in tok_records.items():
    if len(lst) > 400:
        continue  # ubiquitous tokens add nothing
    for i in range(len(lst)):
        for j in range(i + 1, len(lst)):
            (ra, ta), (rb, tb) = lst[i], lst[j]
            if ra['book'] == rb['book'] and ra['chapter'] == rb['chapter']:
                continue
            key = (ra['book'], ra['chapter'], ra['idx'], rb['book'], rb['chapter'], rb['idx'])
            rkey = (rb['book'], rb['chapter'], rb['idx'], ra['book'], ra['chapter'], ra['idx'])
            if key in pair_seen or rkey in pair_seen:
                continue
            pair_seen.add(key)
            if overlap(ta, tb) >= 0.6:
                shared_rare = sum(1 for tk in set(ta) & set(tb)
                                   if len(tok_books.get(tk, ())) <= RARE_MAX_BOOKS)
                if shared_rare >= 2:
                    near_pairs.append((ra, rb))
print(f'exact dup groups: {len(exact_groups)}, near-dup pairs: {len(near_pairs)}')

# union-find clustering over dup pairs
parent = {}


def find(x):
    parent.setdefault(x, x)
    while parent[x] != x:
        parent[x] = parent[parent[x]]
        x = parent[x]
    return x


def union(a, b):
    parent[find(a)] = find(b)


def rkey_of(r):
    return (r['book'], r['chapter'], r['idx'])


for g in exact_groups:
    for r in g[1:]:
        union(rkey_of(g[0]), rkey_of(r))
for ra, rb in near_pairs:
    union(rkey_of(ra), rkey_of(rb))

clusters = defaultdict(list)
for r in records:
    if rkey_of(r) in parent:
        clusters[find(rkey_of(r))].append(r)

for r in records:
    hits = written_titles.get(normtitle(r['title']), [])
    for (wb, wt) in hits:
        if wb != r['book']:
            r.setdefault('writtenCollision', []).append({'book': wb, 'title': wt})

dupes_cross, dupes_within = [], []
for root, members in clusters.items():
    books_involved = {m['book'] for m in members}
    recs = []
    for m in sorted(members, key=lambda m: (m['book'], m['chapter'], m['idx'])):
        rec = dict(m)
        if m.get('writtenCollision'):
            rec['writtenCollision'] = m['writtenCollision']
        recs.append(rec)
    entry = {'title': recs[0]['title'], 'members': recs}
    if len(books_involved) > 1:
        dupes_cross.append(entry)
    else:
        dupes_within.append(entry)
dupes_cross.sort(key=lambda e: -len(e['members']))
dupes_within.sort(key=lambda e: -len(e['members']))
print(f'dup clusters: cross-book {len(dupes_cross)}, within-book {len(dupes_within)}')

# ---- MISPLACEMENT detection --------------------------------------------
misplaced = []
for r in records:
    tt = set(toks(r['title']))
    if not tt:
        continue
    own = len(tt & clean_tokens.get(r['book'], set())) / len(tt)
    cand = defaultdict(int)
    for t in tt:
        for bid in tok_books.get(t, ()):
            if bid != r['book']:
                cand[bid] += 1
    ranked = sorted(((bid, c / len(tt)) for bid, c in cand.items()),
                    key=lambda x: -x[1])[:3]
    best_bid, best_score = ranked[0] if ranked else (None, 0.0)
    truth_hit = None
    for lt in ledger_truth:
        if lt['book'] != r['book'] and overlap(tt, lt['tokens']) >= 0.6:
            truth_hit = lt
            break
    if (best_bid and best_score >= 0.5 and best_score - own >= 0.25) or \
       (truth_hit and own < 0.5):
        misplaced.append({**r, 'ownScore': round(own, 2),
                          'bestBook': (truth_hit['book'] if truth_hit and own < 0.5
                                       else best_bid),
                          'bestScore': round(max(best_score, 0.5 if truth_hit else 0), 2),
                          'top3': [{'book': b, 'score': round(s, 2)} for b, s in ranked],
                          'ledgerTruth': (truth_hit['topic'] if truth_hit else None),
                          'isSpecialist': bool(tt and best_bid and all(t in title_tokens.get(best_bid, set()) for t in tt))})
print(f'misplacement candidates: {len(misplaced)}')

# ---- INTRA-BOOK chapter placement --------------------------------------
intra = []
for r in records:
    tt = set(toks(r['title']))
    if not tt or len(tt) < 2:
        continue
    b = books[r['book']]
    actual = chapter_tokens.get((r['book'], r['chapter']), set())
    a_score = len(tt & actual) / len(tt)
    best_c, best_s = None, -1.0
    for c in b['chapters']:
        ct = chapter_tokens.get((r['book'], c['number']), set())
        s = len(tt & ct) / len(tt)
        if s > best_s:
            best_c, best_s = c['number'], s
    if best_c is not None and best_c != r['chapter'] and best_s >= 0.5 \
            and best_s - a_score >= 0.3:
        intra.append({**r, 'actualChapterScore': round(a_score, 2),
                      'bestChapter': best_c,
                      'bestChapterTitle': next(c['title'] for c in b['chapters']
                                               if c['number'] == best_c),
                      'bestChapterScore': round(best_s, 2)})
print(f'intra-book chapter-move candidates: {len(intra)}')

# ---- persist the reports ------------------------------------------------
for name, obj in [('junk', {'certain': junk_certain, 'suspect': junk_suspect}),
                  ('dupes_cross', dupes_cross), ('dupes_within', dupes_within),
                  ('misplaced', misplaced), ('intra_book', intra)]:
    with open(f'{REORG}/{name}.json', 'w') as f:
        json.dump(obj, f, indent=1, ensure_ascii=False)
    print(f'wrote reorg/{name}.json')

# ---- per-discipline swarm briefs ----------------------------------------
DISCIPLINES = sorted({b['discipline'] for b in index})


def cluster_owner(entry):
    tt = set(toks(entry['title']))
    scored = []
    for m in entry['members']:
        s = len(tt & clean_tokens.get(m['book'], set())) / len(tt) if tt else 0
        scored.append((s, m['discipline'], m['book']))
    scored.sort()
    return scored[0][1]


for disc in DISCIPLINES:
    disc_books = [b for b in index if b['discipline'] == disc]
    brief = {
        'discipline': disc,
        'books': disc_books,
        'junkCertain': [r for r in junk_certain if r['discipline'] == disc],
        'junkSuspect': [r for r in junk_suspect if r['discipline'] == disc],
        'dupClusters': [e for e in dupes_cross
                        if cluster_owner(e) == disc],
        'dupClustersInvolved': [e for e in dupes_cross
                                if any(m['discipline'] == disc for m in e['members'])
                                and cluster_owner(e) != disc],
        'dupesWithin': [e for e in dupes_within
                        if any(m['discipline'] == disc for m in e['members'])],
        'misplacedOut': [r for r in misplaced if r['discipline'] == disc],
        'misplacedIn': [r for r in misplaced if r.get('bestBook')
                        and books.get(r['bestBook'], {}).get('discipline') == disc
                        and r['discipline'] != disc],
        'intraBook': [r for r in intra if r['discipline'] == disc],
    }
    with open(f'{REORG}/swarm/{disc}.json', 'w') as f:
        json.dump(brief, f, indent=1, ensure_ascii=False)
    print(f'swarm brief {disc}: books {len(disc_books)} '
          f'junk {len(brief["junkCertain"])}/{len(brief["junkSuspect"])} '
          f'cross {len(brief["dupClusters"])} out {len(brief["misplacedOut"])} '
          f'in {len(brief["misplacedIn"])} intra {len(brief["intraBook"])}')

print('DONE')
