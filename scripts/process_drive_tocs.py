#!/usr/bin/env python3
"""process_drive_tocs.py — the Drive TOC matcher (REBUILT 2026-11-17; the
original matcher was destroyed with the un-whitelisted working copies).

The all-disciplines owner directive: 'do a table of content scan for all
the books in the drive ... none of the topics should be missing' — this
script is the re-runnable engine of that guarantee's Drive layer:

  read temporary-references/manifest.tsv + tocs/<key>.txt (the 123-source
  extraction: 96 chem/phys module PDFs + 27 root classics, Campbell 11e
  resolved via the sanctioned web fallback) → parse every chapter/section
  line → route each against the 269-book registry (the >=60% significant-
  token standard, the exact STOP/norm machinery of build_exam_ledger.ts)
  → emit the durable ledger + a fixer-compatible gap report.

Outputs:
  scripts/ledger_data_working/drive_tocs.json      — every parsed line,
    its routing (book + score + status), per-source census
  scripts/ledger_data/drive_gap_report.json        — the gaps in the
    apply_exam_gap_fixes.ts input shape ({ledger, exam, topic, bestHome,
    bestHomeScore}) so the SAME content-fix loop fixes them: a planned
    lesson titled to carry the line's tokens is appended to the best
    owning chapter of the best-scoring book. Planning-level only.

Run: python3 scripts/process_drive_tocs.py        (route + report)
     python3 scripts/process_drive_tocs.py --summary   (census only)
"""
import json
import os
import re
import sys

ROOT = '/home/z/my-project'
TR = f'{ROOT}/temporary-references'
OUT_DIR = f'{ROOT}/scripts/ledger_data_working'
DATA_DIR = f'{ROOT}/scripts/ledger_data'

# ---- the >=60% token machinery (mirrors build_exam_ledger.ts) ----------
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


# ---- registry blob ----------------------------------------------------
blob = json.load(open(f'{DATA_DIR}/registry_blob.json'))
book_tokens = {}
for b in blob:
    parts = [b.get('title', ''), b.get('subtitle') or '', b.get('description') or '']
    for c in b.get('chapters', []):
        parts.append(c.get('title', ''))
        parts.append(c.get('summary') or '')
        for p in c.get('plannedLessons') or []:
            parts.append(p)
        for l in c.get('lessons') or []:
            parts.append(l if isinstance(l, str) else l.get('title', ''))
    book_tokens[b['id']] = set(toks(' '.join(parts)))


def score(tt, book_id):
    if not tt:
        return 0.0
    bt = book_tokens.get(book_id, set())
    uniq = set(tt)
    hit = sum(1 for t in uniq if t in bt)
    return hit / len(uniq)


# ---- TOC line parsing --------------------------------------------------
FURNITURE = [
    'cover/title page', '---pagebreak---', 'answers', 'answer key',
    'hints and solutions', 'solutions', 'chapter summary', 'summary',
    'subjective problems', 'objective problems', 'fill in the blanks',
    'true/false', 'true false', 'multiple choice', 'assertion-reasoning',
    'assertion reasoning', 'matrix-match', 'matrix match',
    'integer answer type', 'integer type', 'linked comprehension',
    'archive', 'jee main', 'jee advanced', 'concept application',
    'exercises', 'exercise', 'problems', 'index', 'preface',
    'foreword', 'about the authors', 'about authors', 'acknowledg',
    'contents', 'brief contents', 'provenance', 'unit ', 'paper ',
    'part ', 'appendix', 'glossary', 'references', 'title page',
    'front matter', 'dedication', 'copyright', 'review questions',
    'additional problems', 'sample questions', 'past year', 'pyq',
    'syllabus', 'discussion questions', 'case study', 'casestudy',
    'internet exercises', 'web exercises', 'fill blanks', 'short answer',
    'long answer', 'very short answer', 'ncert corner', 'board corner',
    'exam corner', 'intellectual development', 'skill development',
    'quick revision', 'key points', 'key terms', 'key concepts',
    'important points', 'formulae', 'formulas', 'formula sheet',
    'further reading', 'additional reading', 'suggested reading',
    'see also', 'blanks', ' crossword', ' crossword puzzle',
    # exercise-format banners (the physics modules' back-of-chapter
    # registers — question formats, never topics)
    'single correct answer', 'multiple correct answers',
    'one correct answer', 'more than one correct',
    'one or more correct', 'numerical value type',
    'match the following', 'column matching', 'linkage type',
    'statement type', 'reason assertion',
]
FURNITURE_EXACT = {'answers', 'answer', 'index', 'preface', 'contents',
                   'foreword', 'introduction', 'overview', 'appendix',
                   'appendices', 'glossary', 'bibliography', 'references',
                   'notes'}


def is_furniture(clean):
    cl = clean.lower().strip()
    # roman-numeral contents headers ('xii CONTENTS', 'viii Contents',
    # 'Contents vii')
    if re.match(r'^[ivxl]+\s+contents\b', cl):
        return True
    if re.match(r'^contents\s+[ivxl]+$', cl):
        return True
    if cl in FURNITURE_EXACT:
        return True
    for f in FURNITURE:
        if cl.startswith(f) and len(cl) < len(f) + 12:
            return True
    return False


PAGE_TAIL = [
    re.compile(r'\s[—–-]\s*\d{1,4}(?:\.\d{1,3})*$'),
    re.compile(r'\.{2,}\s*\d{1,4}(?:\.\d{1,3})*$'),
    re.compile(r'\s+\d{1,4}(?:\.\d{1,3})*$'),
]
LEAD_NUM = re.compile(r'^(\d{1,3}(?:\.\d{1,3})*)[\s.)]+')
LEAD_CHAPTER = re.compile(r'^(?:chapter|chp|chap)\s+\d{1,3}\s*[:.\-–—]?\s*', re.I)
BRACKET_NOISE = re.compile(r'^\[[^\]]*\]$')


def parse_line(raw):
    """Return (level, clean_title) or None for non-entry lines."""
    s = raw.strip()
    if not s or len(s) < 4:
        return None
    if BRACKET_NOISE.match(s):
        return None
    if s.startswith('PROVENANCE:'):
        return None
    # page references off the tail (incl. glue-forms like 'Group IIIA.611')
    s = re.sub(r'[a-z]\.\d{3,4}$', '', s).rstrip(' .')
    for pat in PAGE_TAIL:
        s = pat.sub('', s).rstrip(' .')
    if not s or len(s) < 4:
        return None
    level = 'section'
    # leading numbering: 1.1 / 2.4.3 / A. / 12.
    m = LEAD_NUM.match(s)
    num = ''
    if m:
        num = m.group(1)
        s = s[m.end():].strip()
        level = 'chapter' if num.count('.') == 0 else 'section'
    # chapter banners
    m = LEAD_CHAPTER.match(s)
    if m:
        s = s[m.end():].strip()
        level = 'chapter'
    if not s:
        return None
    if is_furniture(s):
        return None
    tt = toks(s)
    if not tt:
        return None
    # title sanitation: strip trailing punctuation; drop UNBALANCED square
    # brackets (a wrapped TOC line's fragment like 'Cupric Oxide [(CuO)
    # Black Copper Oxide,' carries a stray '[' — and any ']' inside a title
    # would blind the fixer's array regex, so strays never survive)
    s = s.rstrip(' ,:;')
    if s.count('[') != s.count(']'):
        s = s.replace('[', ' ').replace(']', ' ')
        s = ' '.join(s.split())
    if not s or len(s) < 4:
        return None
    return (level, s, num)


# ---- home-discipline routing (the source's subject family) ----------
# A Drive source's TOC lines route HOME first — the book of its own
# discipline family; the fixer's law (a book whose own title carries a
# topic token owns that ground) rides the bestHome selection.
HOME_DISCIPLINE = {}
for prefix in ('ioc', 'oc', 'pc'):
    pass  # chemistry prefixes handled below via key startswith
HOME_BY_KEY = {
    'ioc': 'chemistry', 'oc': 'chemistry', 'pc': 'chemistry',
    'p1': 'physics', 'p2': 'physics', 'p3': 'physics', 'p4': 'physics',
    'p5': 'physics', 'p6': 'physics', 'p7': 'physics',
}
ROOT_HOME = {
    'root-microelectronic-circuits-8e': 'engineering',
    'root-art-of-electronics': 'engineering',
    'root-electric-circuits-12e': 'engineering',
    'root-hughes-eet-12e': 'engineering',
    'root-goldstein-classical-mechanics-3e': 'physics',
    'root-griffiths-electrodynamics-4e': 'physics',
    'root-griffiths-quantum-3e': 'physics',
    'root-halliday-resnick-fop-11e': 'physics',
    'root-young-university-physics-15e': 'physics',
    'root-feynman-lectures': 'physics',
    'root-applied-physics-11e': 'physics',
    'root-physics-fundamental': 'physics',
    'root-zumdahl-chemistry-11e': 'chemistry',
    'root-atkins-pchem-12e': 'chemistry',
    'root-clayden-organic': 'chemistry',
    'root-lee-concise-inorganic-5e': 'chemistry',
    'root-mahan-university-chemistry': 'chemistry',
    'root-solomons-organic': 'chemistry',
    'root-lehninger-biochem-8e': 'biology',
    'root-campbell-biology-11e': 'biology',
    'root-laxmikanth-indian-polity': 'humanities',
    'root-spectrum-modern-india': 'humanities',
    'root-russell-western-philosophy': 'humanities',
    'root-mankiw-economics-8e': 'economics-commerce',
    'root-murphy-english-grammar': 'languages',
    'root-hammer-german-grammar': 'languages',
    'root-genki-japanese-i': 'languages',
}


def home_of(key):
    if key.startswith('root-'):
        return ROOT_HOME.get(key, '')
    for pref, disc in HOME_BY_KEY.items():
        if key.startswith(pref + '-'):
            return disc
    return ''


book_title_tokens = {}
book_discipline = {}
first_of_disc = {}  # discipline -> first registry book (the zero-hit default home)
for b in blob:
    book_discipline[b['id']] = b.get('discipline', '')
    if b.get('discipline') not in first_of_disc:
        first_of_disc[b.get('discipline')] = b['id']
    book_title_tokens[b['id']] = set(toks((b.get('title', '') + ' ' + (b.get('subtitle') or '')).strip()))
summary_only = '--summary' in sys.argv
manifest = []
for line in open(f'{TR}/manifest.tsv'):
    parts = line.rstrip('\n').split('\t')
    if len(parts) >= 3:
        manifest.append((parts[0], parts[1], parts[2]))

ledger = []
gap_report = []
total = matched = gaps = 0
per_source = {}

for key, fid, label in manifest:
    path = f'{TR}/tocs/{key}.txt'
    if not os.path.exists(path):
        per_source[key] = {'label': label, 'lines': 0, 'matched': 0, 'gaps': 0, 'note': 'NO TOC'}
        continue
    text = open(path, encoding='utf-8', errors='replace').read()
    seen = set()
    src_lines = 0
    src_matched = 0
    src_gaps = 0
    for raw in text.splitlines():
        parsed = parse_line(raw)
        if not parsed:
            continue
        level, clean, num = parsed
        dk = re.sub(r'[^a-z0-9]+', '', clean.lower())
        if len(dk) < 3 or dk in seen:
            continue
        seen.add(dk)
        tt = toks(clean)
        if not tt:
            continue
        home_disc = home_of(key)
        home_books = [bid for bid, d in book_discipline.items() if d == home_disc] if home_disc else list(book_tokens)
        # home best with the title-token boost (the fixer's placement law:
        # a book whose own title carries a topic token owns the ground)
        best = ('', 0.0)
        for bid in home_books:
            s = score(tt, bid)
            if any(t in book_title_tokens.get(bid, set()) for t in set(tt)):
                s = min(1.0, s + 0.15)
            if s > best[1]:
                best = (bid, s)
        # zero-hit lines still need an honest owning home — the discipline's
        # first registry book (the fixer re-places by content anyway)
        if best[0] == '' and home_disc and first_of_disc.get(home_disc):
            best = (first_of_disc[home_disc], 0.0)
        total += 1
        src_lines += 1
        if best[1] >= 0.60:
            ledger.append({'source': key, 'label': label, 'num': num,
                           'level': level, 'topic': clean,
                           'book': best[0], 'score': round(best[1], 2),
                           'status': 'matched'})
            matched += 1
            src_matched += 1
        else:
            ledger.append({'source': key, 'label': label, 'num': num,
                           'level': level, 'topic': clean,
                           'book': best[0], 'score': round(best[1], 2),
                           'status': 'gap'})
            gap_report.append({'ledger': 'drive-toc', 'exam': label[:80],
                               'topic': clean, 'bestHome': best[0],
                               'bestHomeScore': round(best[1], 2)})
            gaps += 1
            src_gaps += 1
    per_source[key] = {'label': label, 'lines': src_lines,
                       'matched': src_matched, 'gaps': src_gaps}

if summary_only:
    for k, v in per_source.items():
        print(f"{k}: {v['lines']} lines / {v['matched']} matched / {v.get('gaps', 0)} gaps")
    print(f'TOTAL: {total} lines / {matched} matched / {gaps} gaps')
    sys.exit(0)

os.makedirs(OUT_DIR, exist_ok=True)
json.dump({'captured': '2026-11-17',
           'method': '>=60% significant-token routing vs the 269-book registry (mirrors build_exam_ledger.ts)',
           'sources': per_source,
           'lines': ledger},
          open(f'{OUT_DIR}/drive_tocs.json', 'w'), indent=1)
json.dump(gap_report, open(f'{DATA_DIR}/drive_gap_report.json', 'w'), indent=1)
print(f'drive-toc ledger: {total} lines / {matched} matched / {gaps} gaps')
print(f'  durable: {OUT_DIR}/drive_tocs.json + {DATA_DIR}/drive_gap_report.json')
print(f'  coverage: {100.0 * matched / total if total else 0:.1f}%')
