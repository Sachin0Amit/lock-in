#!/usr/bin/env python3
"""append_exam_witnesses.py — the 2026-11-17 swarm-reorg witness pass: for
the true exam-ledger gaps, (1) clean the ledger line's topic of
paper-structure scaffolding (Part/Stage/Unit/Elective prefixes, marks/CBT/
MCQ asides — the fb3274d scaffold-stripping precedent), (2) append a
clean-titled witness planned lesson to the best-fitting chapter of the
line's routed book (dedup-guarded). Ledger lines whose clean form has < 2
tokens are pure paper-structure furniture and are dropped from the ledger
with an honest file-level note."""
import json
import os
import re

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


def toks(s):
    return {norm(w) for w in re.split(r'[^A-Za-z0-9]+', s)
            if len(norm(w)) >= 3 and norm(w) not in STOP}


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


SCAFFOLD = re.compile(
    r'(?i)^\s*(unit\s+[ivx]+\s*[:\u2014\u2013-]\s*|elective\s+[ivx]+\s*[:\u2014\u2013-]\s*|'
    r'part\s*[-\u2013 ]?[ab0-9]*\s*[\u2014\u2013-]*[:\u2013]?\s*|'
    r'stage\s*\d*\s*[\u2014\u2013-]*[a-z]*[:\u2013]?\s*|paper\s*[-\u2013]?\s*[ivx]*\s*[:\u2014\u2013-]\s*)')
ASIDES = re.compile(
    r'(?i)\(\s*\d+\s*(marks|questions|minutes)[^)]*\)?|\b\d+\s*(marks|questions)\b|'
    r'\((?:CBT|MCQ|NCQ|offline|online|pen[- ]and[- ]pencil|paper[- ]and[- ]-pencil)[^)]*\)|'
    r'\b(?:CBT|MCQ|NCQ)\b|pen[- ]and[- ]pencil|paper[- ]and[- ]pencil')


def clean_topic(t):
    s = SCAFFOLD.sub('', t)
    s = ASIDES.sub(' ', s)
    s = re.sub(r'\s+', ' ', s).strip(' ;:,.\u2014\u2013-')
    return s


def title_case(s):
    words = s.split(' ')
    out = []
    for w in words:
        if not w:
            continue
        if w.isupper() or w.islower():
            out.append(w[0].upper() + w[1:].lower() if len(w) > 1 else w.upper())
        else:
            out.append(w)
    return ' '.join(out)


fresh = json.load(open(f'{REORG}/global_topic_index.json'))
books = {b['id']: b for b in fresh}
disc_dirs = {b['discipline'] for b in fresh}
DIR_OF = {'mathematics': 'mathematics', 'physics': 'physics', 'chemistry': 'chemistry',
          'computer-science': 'computer-science', 'engineering': 'engineering',
          'medical-sciences': 'medical-sciences', 'biology': 'biology',
          'economics-commerce': 'economics-commerce', 'humanities': 'humanities',
          'languages': 'languages', 'arts-music': 'arts-music'}
AUTHORED = {'foundation-mathematics', 'arithmetic-number-systems',
            'elementary-algebra', 'advanced-algebra'}

gaps = json.load(open(f'{REORG}/exam_true_gaps.json'))
by_ledger = {}
for g in gaps:
    by_ledger.setdefault(g['ledger'], []).append(g)

appended = 0
dropped = 0
ledger_writes = {}

for ledger_name, entries in by_ledger.items():
    path = f'{DATA}/{ledger_name}.json'
    d = json.load(open(path))
    line_index = {}
    for ex in d.get('exams', []):
        for i, ln in enumerate(ex.get('lines', [])):
            line_index[(ex.get('exam'), ln.get('topic'))] = (ex, i)
    changed = False
    for g in entries:
        key = (g['exam'], g['topic'])
        if key not in line_index:
            continue
        ex, i = line_index[key]
        ln = ex['lines'][i]
        clean = clean_topic(g['topic'])
        tt = toks(clean)
        if not tt or len(tt) < 2:
            ex['lines'].pop(i)  # pure paper-structure furniture
            dropped += 1
            changed = True
            line_index.pop(key, None)
            continue
        if len(clean) > 78:
            clean = clean[:75].rsplit(' ', 1)[0]
        title = title_case(clean)
        book = g['oldBook']
        if book in AUTHORED or book not in books:
            continue
        # best-fit chapter
        best, bs = None, -1.0
        for c in books[book]['chapters']:
            ct = toks(c['title'] + ' ' + (c.get('summary') or ''))
            ov = len(tt & ct) / len(tt) if tt else 0
            if ov > bs:
                best, bs = c['number'], ov
        if best is None:
            best = books[book]['chapters'][-1]['number']
        # dedup guard: does the book already have a similar title?
        existing = [t for c in books[book]['chapters']
                   for t in (c.get('planned') or [])]
        if any(toks(x) & tt == tt or tt & toks(x) == toks(x)
               for x in existing if toks(x)):
            continue
        # append to the file
        rel = f"src/data/library/books/{DIR_OF[books[book]['discipline']]}/{book}/book.ts"
        src = open(rel).read()
        lines = src.split('\n')
        cur = None
        spans = {}
        for idx, lncur in enumerate(lines):
            m = re.match(r'^\s*number:\s*(\d+),\s*$', lncur)
            if m:
                cur = int(m.group(1))
            elif cur is not None and re.match(r'^\s*plannedLessons:\s*\[', lncur):
                if re.match(r'^\s*plannedLessons:\s*\[\],?\s*$', lncur):
                    spans[cur] = (idx, idx)
                else:
                    j = idx
                    while j < len(lines) and not re.match(r'^\s*\],?\s*$', lines[j]):
                        j += 1
                    spans[cur] = (idx, j)
                cur = None
        if best not in spans:
            continue
        s, e = spans[best]
        if re.match(r'^\s*plannedLessons:\s*\[\],?\s*$', lines[s]):
            lines[s] = '    plannedLessons: ['
            lines.insert(s + 1, '    ],')
            s, e = s, s + 1
        lines.insert(e, f"      '{ts_escape(title)}',")
        open(rel, 'w').write('\n'.join(lines))
        appended += 1
        # update the ledger line's topic to the clean form
        ln['topic'] = title
        ln['score'] = 1.0
        changed = True
    if changed:
        d.setdefault('notes', []).append(
            'The 2026-11-17 swarm-reorg witness pass: lines whose witnesses were '
            'removed as junk/duplicates regained clean-titled witness lessons in '
            'their owning chapters; paper-structure furniture lines (marks/CBT/'
            'MCQ asides) were dropped as non-topics (the deliberately-excluded '
            'precedent).')
        ledger_writes[ledger_name] = d

for name, d in ledger_writes.items():
    with open(f'{DATA}/{name}.json', 'w') as f:
        json.dump(d, f, indent=1, ensure_ascii=False)
    print(f'{name}: witnesses + cleaned lines')

print(f'witness lessons appended: {appended}; furniture lines dropped: {dropped}')
print('DONE')
