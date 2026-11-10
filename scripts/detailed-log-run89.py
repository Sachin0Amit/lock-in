#!/usr/bin/env python3
"""detailed-log-run89.py — one-shot run-89 DETAILED_LOG.md updater:
(1) Maintained-through line -> run 89 + the run-89 narrative inserted at top;
(2) section 4: repair the mislabeled Elementary Algebra entry (it was a
    copy of the ANS section since run 66 — wrong heading, subtitle, body,
    chapter table) with data generated from WORK_INVENTORY.json;
(3) section 4: add the Advanced Algebra (book #4) entry;
(4) section 7: add the run-89 git-history row;
(5) section 8: prepend the CURRENT (run 89) / NEXT (run 90) block.
"""
import json, re, sys

DL = '/home/z/my-project/docs/project/DETAILED_LOG.md'
INV = '/home/z/my-project/docs/project/WORK_INVENTORY.json'
text = open(DL).read()
inv = json.load(open(INV))
books = {b['id']: b for b in inv['content']['books']}
al, aa = books['elementary-algebra'], books['advanced-algebra']

# ---------- (1) header + run-89 narrative ----------
old_line = text.split('\n', 12)
assert 'Maintained through **run 88' in text, 'run-88 line not found'

narrative = """Maintained through **run 89 (2026-11-10, job 516929's v4 hybrid-cadence day window, fired on a continuation turn carrying the full LOCKIN RUN payload with the PAT re-embedded)**: **BOOK #4 'ADVANCED ALGEBRA' PROMOTED — the research phase complete (reference survey + syllabus audit + the 10-chapter/35-lesson plan); the fourth spine on the Mathematics shelf; the library stands at 4 books / 120 lessons / 583,505 words / 3 complete books + 1 planned. ZERO lesson authoring this run** (run 88 closed Elementary Algebra; a closing run never opens the next book — the run-66 separation precedent followed exactly).

**The research phase.** (1) Reference survey: the Drive survey rebuilt post-recycle (89 entries intact) and the MATHS subfolder machine-listed — the **Cengage M2 Algebra module** (14 chapter PDFs: 01 Set Theory and the Real Number System [ANS-banked ground], 02 Theory of Equations, 03 Complex Numbers, 04 Principle of Mathematical Induction, 05 Progression and Series, 06 Inequalities Involving Means, 07 Permutation and Combination, 08 Binomial Theorem [the module's algebra arc = the plan's chapters 2–7], 09–14 Probability/Reasoning/Statistics/Determinants/Matrices [other shelf books]); Hall & Knight *Higher Algebra* (two Drive copies, banked run 66; the classic stretch, 35-chapter arc re-confirmed by web-check); Khattar QA 4e (the aptitude scope). Zero downloads (survey-only; folder metadata via embeddedfolderview). (2) Syllabus audit, web-checked 2026-11-10: the NCERT senior arc — class 11 is now the rationalized 14-chapter book (ch. 2 Relations and Functions, with composition added per the CBSE 2025-26 syllabus; ch. 4 Complex Numbers and Quadratic Equations; ch. 5 Linear Inequalities; ch. 6 Permutations and Combinations; ch. 7 Binomial Theorem; ch. 8 Sequences and Series; **PMI and Mathematical Reasoning dropped from the textbook** — recorded honestly, induction retained via JEE unit 5 + the M2 module ch. 04 + Hall & Knight ch. XII), class 12 ch. 1 (types of relations, one-one/onto, composition, invertible); OpenStax *College Algebra 2e* (the modern sequencing cross-check: functions → polynomial/rational → exponential & logarithmic → sequences/counting); the **JEE Main 2026 syllabus** units 1/2/4/5/6/7 (the competitive scope, incl. the arithmetico-geometric progression and Sn/Sn²/Sn³ of unit 7, and mathematical induction of unit 5).

**The plan (10 chapters / 35 lessons):** 1 Functions as Objects (4 — relations as sets of pairs, one-one/onto, composition with honest domains, the inverse machine: **AL 11.3's handoff honoured as the opening ground**) · 2 The Quadratic at Depth (4 — vertex-form optimization, the sign diagram, symmetric reads and common roots, location of roots) · 3 Complex Numbers: the New Rung (3 — the closure failure that forces i, conjugate and modulus, negative discriminants) · 4 Inequalities: the Classical Engine (3 — AM–GM, Cauchy-Schwarz and Engel's form, the triangle inequality) · 5 Sequences and Series (4 — AP, GP and the infinite tail, harmonic and arithmetico-geometric, special series and the method of differences) · 6 Counting: Permutations and Combinations (4 — the fundamental principle, the arrangement count, the selection count, distributions and the classic puzzles) · 7 Induction and the Binomial Theorem (4 — the domino principle, the theorem proved, the coefficients at work, applications and approximations) · 8 The Theory of Equations (3 — degree n = n roots, cubics and quartics: the symmetric functions, transformation of equations) · 9 Exponentials and Logarithms (3 — every real index, the inverse machine, the equations) · 10 The Synthesis and the Doorstep (3 — the advanced competition craft, the book in one page, limits and the changing output). **21 FM/ANS/AL cross-reference anchors verified to exist** (15 AL + 3 ANS + 3 FM).

**The promotion + gates.** `src/data/library/books/mathematics/advanced-algebra/book.ts` created — status **'planned'** (the run-66 precedent; flips to 'in-progress' with the first written lesson at run 90), the `aa-` id prefix reserved (verified unused across all 120 existing lesson ids), rose-crimson accent `#be123c/#881337` (distinct from FM's burnt orange, ANS's teal, AL's olive), level 'Class 11–12 algebra → the doorstep of calculus', the full researched TOC as plannedLessons with real pedagogical chapter summaries; registered in `index.ts` → allBooks (4 books). `verify-book4-promotion.ts` **290/290** (A structure incl. the per-chapter plan 4,4,3,3,4,4,4,3,3,3 pinned + the ch.-1 handoff check; B registry 4 books / 0 written / 35 planned / 0 words; C uniqueness vs ALL of FM+ANS+AL + the aa- reservation over 120 prior ids; D the 21 anchors; E the research mapping incl. the honest PMI note). Gates: lint **0 errors** (3 warnings: 2 pre-existing promotion-script class + 1 same-class from the new e2e-book4-promotion.page.js — the shipped book2/book3 precedent); tsc clean; routes 200 (home/book/revise/glossary) + 404 (unknown lesson/book); browser E2E `e2e-book4-promotion.sh` **ALL GREEN** (home: the 4th spine + '4Books' + FM/ANS/AL intact; book page: h1 + breadcrumb + Planned badge + '0 written · 35 planned' + 10 chapter tiles + ALL 35 planned titles + ZERO lesson links + no overflow at 1280 AND 390; revise/glossary empty states; 404s honest; **the console-error trap installed on EVERY page — a run-89 harness improvement — zero errors everywhere**); pixel checks (86.9%/96.6%/94.8% non-white, 0% blue cast) + VLM visual inspection. **Authoring catch:** the first subtitle draft (66 chars) clipped the small cover's bottom edge — caught by VLM, priced by exact DOM geometry (1160 > 1153), shortened to 'Functions as objects — the second course' (41 chars → 1147 < 1153, clean; large cover clean at 296 < 410). **Logging-integrity repairs this run:** (a) `build_work_inventory.ts` had hardcoded `books: [fmRecord, ansRecord]` — Elementary Algebra was silently missing from WORK_INVENTORY.json's content.books across runs 67–88; the array is now derived (`allLiveBooks.map(bookRecordOf)`) and the regenerated inventory reads honest: 4 books / 32 chapters / 120 lessons / 583,505 words / 277 backlog; (b) DETAILED_LOG section 4's Elementary Algebra entry had been a mislabeled copy of the ANS section since run 66 — rewritten this run from the live inventory data; (c) observed, NOT fixed (out of the promotion's scope, queued for a platform run): the small home-card BookCover clips long subtitles — ANS by ~70px, AL by ~7px. **9 citation keys reserved** (cengage-m2-algebra, ncert-math11-ch4/5/6/7/8, ncert-math12-ch1, openstax-college-algebra, jee-main-2026-syllabus) + 4 carried; zero downloads. **Run 90 opens AA ch. 1 with 1.1 'Relations: the Set-of-Pairs View' + 1.2 'One-One and Onto: Classifying the Machines' (verify-book4-ch01.ts written FIRST).**

---

"""

# replace the Maintained-through run 88 line, keep the run-88 narrative below
marker = "Maintained through **run 88 (2026-11-10"
idx = text.index(marker)
end = text.index("\n\n", idx)  # end of that single paragraph line
# the paragraph is one long line; find its true end (next blank line)
text = narrative + text[idx:]
# the original run-88 line remains right after our narrative, as the previous-run detail —
# actually we replaced from idx; re-insert the original run-88 line after the narrative? No:
# pattern: new "Maintained through run 89" narrative, then the OLD run-88 narrative follows naturally
# because text[idx:] starts with the old run-88 paragraph. Good.

# ---------- (2) repair the AL section + (3) add the AA section ----------
def lessons_cell(ch):
    parts = []
    for l in ch['lessons']:
        parts.append(f"{l['number'].replace('al-','')}{' ' if False else ''}")
    return parts

def chapter_row(book_id_prefix, ch):
    title = ch['title']
    slug = ch['slug']
    if ch['lessons']:
        lessons = ' · '.join(
            f"{l['number']} {l['title'].replace(': ', ': ')} ({l['words']:,} w)"
            for l in ch['lessons']
        )
        state = f"**COMPLETE {len(ch['lessons'])}/{len(ch['lessons']) + len(ch['plannedLessons'])}**"
    else:
        lessons = ' · '.join(ch['plannedLessons'])
        state = "**PLANNED**"
    return f"| {ch['number']} | {title} (`{slug}`) — {state} | {lessons} |"

al_total_w = sum(ch['words'] for ch in al['chapters'])
al_rows = '\n'.join(chapter_row('al-', ch) for ch in al['chapters'])

al_section = f"""### Elementary Algebra — mathematics shelf · **COMPLETE (run 88, 2026-11-10: 11/11 chapters, 37 lessons, 171,460 words — closed by 11.3 'The Function Idea: the Doorstep' + the unit-11 review + THE BOOK CLOSE)**

*Letters with structure — the first full algebra course* · Class 6–10 algebra → the
doorway to higher algebra · accent olive · cover auto-generated.

The first full algebra course: letters stop being abbreviations and become objects with
structure. Research phase (run 66, 2026-11-07): reference survey (Hall & Knight's
*Elementary Algebra for Schools* [the Drive copy, corrected run 67] + *Higher Algebra*
[two copies] + the Cengage M2 Algebra module + Khattar QA 4e) + syllabus audit (the
NCERT algebra arc class 6–10 · OpenStax *Elementary Algebra 2e* · the competitive-exam
scope · the classic stretch · the function doorstep). verify-book3-promotion.ts 218/218;
E2E green. Authoring ran runs 67–88, two lessons per run, strictly sequential,
verify-first throughout; the book closed complete at 11/11 chapters / 37 lessons /
171,460 words. Lesson ids use the `al-` prefix.

| # | Chapter (slug) | Lessons (words) |
|---|---|---|
{al_rows}

### Advanced Algebra — mathematics shelf · **PROMOTED (run 89, 2026-11-10: research phase complete — 10 chapters / 35 planned lessons; authoring opens run 90)**

*Functions as objects — the second course* · Class 11–12 algebra → the doorstep of
calculus · accent rose-crimson · cover auto-generated.

The second algebra course, opening exactly on Elementary Algebra 11.3's handoff
(composites, inverses, the domains of composites). Research phase (run 89, 2026-11-10):
reference survey (the Drive MATHS subfolder machine-listed — the **Cengage M2 Algebra
module**'s chapters 02–08 are the JEE-mains-level arc; Hall & Knight *Higher Algebra*
the classic stretch; Khattar QA 4e the aptitude scope) + syllabus audit (the NCERT
senior arc class 11 ch. 2/4/5/6/7/8 + class 12 ch. 1, with the honest PMI note ·
OpenStax *College Algebra 2e* the sequencing cross-check · the JEE Main 2026 syllabus
units 1/2/4/5/6/7 the competitive scope). verify-book4-promotion.ts 290/290; E2E
green (planned-book rendering: '0 written · 35 planned', greyed TOC, empty states,
404s honest, zero console errors). Lesson ids will use the `aa-` prefix (reserved,
verified unused). 9 citation keys reserved + 4 carried.

| # | Chapter (slug) | Planned lessons |
|---|---|---|
{chr(10).join(chapter_row('aa-', ch) for ch in aa['chapters'])}
"""

# replace the wrong AL section (from its heading to just before "## 5. Engineering work")
al_bad_start = text.index("### Elementary Algebra — mathematics shelf")
al_bad_end = text.index("## 5. Engineering work (platform history)")
text = text[:al_bad_start] + al_section + '\n' + text[al_bad_end:]

# ---------- (4) git-history row ----------
git_row = ("| 89 | ship + bookkeeping + memory | 11-10 | **BOOK #4 PROMOTED: Advanced Algebra** — research phase complete "
           "(Drive survey rebuilt 89 entries; MATHS subfolder machine-listed: the Cengage M2 Algebra module's 14 chapters; "
           "web-checked NCERT class 11/12 arc + OpenStax College Algebra 2e + JEE Main 2026 units 1/2/4/5/6/7 + Hall & Knight's 35-chapter arc); "
           "the 10-chapter/35-lesson plan with the AL 11.3 handoff as ch. 1's opening ground; book.ts (planned, aa- prefix reserved, "
           "rose-crimson accent, 21 FM/ANS/AL cross-reference anchors verified) + index.ts allBooks = 4; verify-book4-promotion.ts 290/290; "
           "e2e-book4-promotion green with the console-error trap on every page; the cover-subtitle clip caught by VLM + DOM geometry and fixed; "
           "WORK_INVENTORY books-array drift repaired (book #3 had been missing since run 67) + the DETAILED_LOG AL section rewritten "
           "(it had been a mislabeled ANS copy since run 66); 9 citation keys reserved + 4 carried; zero downloads — pushed per protocol |\n")
anchor = "Per-commit file-level detail (every path with insertions/deletions) lives in"
text = text.replace(anchor, git_row + anchor, 1)

# ---------- (5) section 8 CURRENT/NEXT ----------
s8 = """## 8. Current state & what's next

- **CURRENT (run 89, 2026-11-10): BOOK #4 'ADVANCED ALGEBRA' PROMOTED.** Tree was
  clean at HEAD `20f6b69` (the run-88 ship, remote-verified). The research phase ran
  in full (reference survey + syllabus audit, web-checked), the 10-chapter/35-lesson
  plan written into `advanced-algebra/book.ts` (status 'planned', the aa- prefix
  reserved, 21 cross-reference anchors verified), the book registered as the 4th of
  allBooks. Gates: verify-book4-promotion.ts 290/290; lint 0 errors; tsc clean;
  routes 200/404; browser E2E all green with the console-error trap on every page
  (zero errors); pixel checks + VLM visual inspection; one authoring catch fixed
  (the cover-subtitle clip). Logging repairs: the WORK_INVENTORY books-array drift
  (book #3 missing since run 67) and the DETAILED_LOG AL section (a mislabeled ANS
  copy since run 66). 9 citation keys reserved, 4 carried, zero downloads. The
  library: 4 books (3 complete + 1 planned) / 120 lessons / 583,505 words.
- **NEXT (run 90): OPEN AA CHAPTER 1 'FUNCTIONS AS OBJECTS'** — author lessons 1.1
  'Relations: the Set-of-Pairs View' + 1.2 'One-One and Onto: Classifying the
  Machines' (two-lesson cadence, strictly sequential). Create
  scripts/verify-book4-ch01.ts FIRST (the verify-first discipline: the relation
  engines, the one-one/onto census engines, quiz + exercise keys pinned pre-prose),
  whitelist it + the e2e-aa-11/12 scripts in .gitignore BEFORE the commit, then
  author ch-01.ts with the AL 11.3 cross-references carried (never re-teach the
  machine view). Run 91 closes ch. 1 with 1.3 + 1.4 + the unit-1 review.
- HEAD: the run-89 ship pushed per protocol (one-time URL; synced sha recorded in
  WORKLOG.md / RESUME_POINTER.json). The home-card subtitle clipping (ANS ~70px,
  AL ~7px) is queued for a future platform run.
"""
old_s8_start = text.index("## 8. Current state & what's next")
next_h = text.index("\n## ", old_s8_start + 10) if "\n## " in text[old_s8_start+10:] else len(text)
# keep only the newest entries below? The section is long with stale blocks; keep them (append-only history) after our block
text = text[:old_s8_start] + s8 + text[old_s8_start + len("## 8. Current state & what's next\n"):]

open(DL, 'w').write(text)
print('DETAILED_LOG.md updated: run-89 narrative, AL section repaired, AA section added, git row 89, section 8 CURRENT/NEXT')
print('AL total words check:', al_total_w)
