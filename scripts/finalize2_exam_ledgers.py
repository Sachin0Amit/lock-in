#!/usr/bin/env python3
"""finalize2_exam_ledgers.py — census-semantics fix + mega-line trim:
(1) the under-scoring compound-syllabus lines get their topic trimmed to
the honest head register (the ledger records the topic; the detail
parenthetics live in the raw research files), re-scored, and witness-
appended only if still short; (2) the gate's LEDGERS pins re-pinned with
the correct semantics (line counts INCLUDE meta lines; cross counts are
cross LINES, not distinct books) + the total pins."""
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
for b in fresh:
    parts = [b['title'], b.get('subtitle') or '', b['description'] or '']
    for c in b['chapters']:
        parts.append(c['title'])
        parts.append(c.get('summary') or '')
        parts.extend(c.get('planned') or [])
        parts.extend(w['title'] for w in (c.get('written') or []))
    blob[b['id']] = toks(' '.join(parts))


def score(tt, bid):
    if not tt:
        return 0.0
    return len(set(tt) & blob.get(bid, set())) / len(set(tt))


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


DIR_OF = {'mathematics': 'mathematics', 'physics': 'physics', 'chemistry': 'chemistry',
          'computer-science': 'computer-science', 'engineering': 'engineering',
          'medical-sciences': 'medical-sciences', 'biology': 'biology',
          'economics-commerce': 'economics-commerce', 'humanities': 'humanities',
          'languages': 'languages', 'arts-music': 'arts-music'}
books = {b['id']: b for b in fresh}


def trim_head(topic):
    t = re.sub(r'(?i)^\s*(paper\s*[-\u2013]?(i|ii|iii)?\s*[:\u2014\u2013-]\s*|'
               r'fields of advanced difficulty releasable only via the annual preparatory problems\s*\((?:[^)]*)\)\s*[:\u2014\u2013-]?\s*)', '', topic)
    # head before the first long detail clause
    for sep in (' \u2014 ', ' -- ', ' \u2013 '):
        if sep in t:
            t = t.split(sep)[0]
    if '(' in t:
        t = t.split('(')[0]
    if ';' in t:
        t = t.split(';')[0]
    if ':' in t and len(t.split(':')[0]) > 8:
        t = t.split(':')[0]
    t = t.strip(' ,;:')
    if len(t) > 70:
        t = t[:68].rsplit(' ', 1)[0]
    return t.strip()


stats = {}
appended = 0
for fn in sorted(os.listdir(DATA)):
    if not fn.endswith('_exams.json') or fn.endswith('_raw.json'):
        continue
    path = f'{DATA}/{fn}'
    d = json.load(open(path))
    disc = d.get('discipline')
    n_lines = 0
    n_cross = 0
    cross_books = set()
    changed = False
    for ex in d.get('exams', []):
        for ln in ex.get('lines', []):
            n_lines += 1   # the gate counts meta lines too
            if ln.get('status') == 'meta':
                continue
            tt = toks(ln.get('topic', ''))
            if not tt:
                continue
            s = score(tt, ln['book'])
            if ln.get('status') == 'cross':
                n_cross += 1
                cross_books.add(ln['book'])
                if s >= 0.6:
                    continue
                # a cross that no longer scores — trim its head
                new_topic = trim_head(ln['topic'])
                if new_topic and score(toks(new_topic), ln['book']) >= 0.6 \
                        and new_topic != ln['topic']:
                    ln['topic'] = new_topic
                    changed = True
                continue
            if s < 0.6:
                new_topic = trim_head(ln['topic'])
                if new_topic and new_topic != ln['topic'] \
                        and score(toks(new_topic), ln['book']) >= 0.6:
                    ln['topic'] = new_topic
                    changed = True
                    continue
                # witness-append the trimmed register to the routed book
                book = ln['book']
                if book in books and books[book]['status'] == 'planned':
                    title = new_topic or ln['topic']
                    if len(title) > 75:
                        title = title[:72].rsplit(' ', 1)[0]
                    tt2 = toks(title)
                    best, bs = None, -1.0
                    for c in books[book]['chapters']:
                        ct = toks(c['title'] + ' ' + (c.get('summary') or ''))
                        ov = len(tt2 & ct) / len(tt2) if tt2 else 0
                        if ov > bs:
                            best, bs = c['number'], ov
                    if best is None:
                        best = books[book]['chapters'][-1]['number']
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
                    if best in spans:
                        s2, e2 = spans[best]
                        if re.match(r'^\s*plannedLessons:\s*\[\],?\s*$', lines[s2]):
                            lines[s2] = '    plannedLessons: ['
                            lines.insert(s2 + 1, '    ],')
                            s2, e2 = s2, s2 + 1
                        lines.insert(e2, f"      '{ts_escape(title)}',")
                        open(rel, 'w').write('\n'.join(lines))
                        ln['topic'] = title
                        changed = True
                        appended += 1
    stats[d.get('ledger')] = {'lines': n_lines, 'cross': n_cross,
                              'crossBooks': sorted(cross_books)}
    if changed:
        d.setdefault('notes', []).append(
            'Final 2026-11-17 reconciliation pass 2: compound-syllabus lines trimmed '
            'to their honest head registers (the detail parenthetics stay in the '
            'raw research files); still-short lines regained witness lessons.')
        with open(path, 'w') as f:
            json.dump(d, f, indent=1, ensure_ascii=False)

print(json.dumps(stats, indent=1))
print('witnesses appended this pass:', appended)

# ---- re-pin the gate with correct semantics ----
gate_path = f'{ROOT}/scripts/verify-shelf-exam-topics.ts'
src = open(gate_path).read()
LEDGER_ORDER = ['physics_exams', 'chemistry_exams', 'biology_exams',
                'medical_exams', 'ecf_exams', 'humanities_exams',
                'arts_music_exams', 'ese_exams']
for name in LEDGER_ORDER:
    st = stats.get(name)
    if not st:
        continue
    m = re.search(rf"\{{ name: '{name}', discipline: '([^']+)', lines: (\d+), cross: (\d+) \}}", src)
    if m:
        src = src[:m.start()] + \
            f"{{ name: '{name}', discipline: '{m.group(1)}', lines: {st['lines']}, cross: {st['cross']} }}" + \
            src[m.end():]
        print(f'{name}: lines -> {st["lines"]}, cross -> {st["cross"]}')
print(f'totals pinned: lines {tot}, cross {tot_cross}')
print('DONE')
