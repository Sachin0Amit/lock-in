#!/usr/bin/env python3
"""ship_full_shelf_planning.py — the memory shipper for the full-shelf
planning pass (2026-11-10, owner directive): updates PROGRESS.json,
RESUME_POINTER.json, WORKLOG.md, SOURCE_LOG.md, DETAILED_LOG.md,
MASTER_PLAN.md and EXAM_REGISTRY.json. No lesson authoring happened;
the authoring cadence is unchanged (run 90 opens AA 1.1 + 1.2).
"""
import json
from datetime import date

TODAY = "2026-11-10"
PLANNED_BOOKS = [
    # (id, title, chapters, plannedLessons, prefix, reference spine)
    ("geometry", "Geometry", 11, 38, "geo-", "web-audited school canon + Euclid/Hilbert arcs"),
    ("coordinate-geometry", "Coordinate Geometry", 13, 44, "cg-", "M3 + M5 modules (11 chapter PDFs)"),
    ("trigonometry", "Trigonometry", 8, 30, "tr-", "M1 module + Loney classic"),
    ("differential-calculus", "Differential Calculus", 9, 36, "dc-", "M4 ch. 2-6 + Thomas/Stewart"),
    ("integral-calculus", "Integral Calculus", 6, 20, "ic-", "M4 ch. 7-9 + Thomas"),
    ("multivariable-calculus", "Multivariable Calculus", 6, 19, "mc-", "Thomas/Stewart multivariable"),
    ("differential-equations", "Differential Equations", 6, 22, "de-", "M4 ch. 10 + Kreyszig ch. 1-2"),
    ("linear-algebra", "Linear Algebra", 8, 28, "la-", "M2 ch. 12-13 + Strang/Axler/Lay"),
    ("discrete-mathematics", "Discrete Mathematics", 9, 29, "dm-", "Rosen 8e (Drive)"),
    ("number-theory", "Number Theory", 10, 31, "nt-", "Burton arc (web-checked)"),
    ("set-theory", "Set Theory", 8, 27, "st-", "Halmos arc (web-checked)"),
    ("mathematical-logic", "Mathematical Logic", 7, 23, "ml-", "M2 ch. 10 + Rosen ch. 1"),
    ("combinatorics", "Combinatorics", 6, 20, "co-", "Rosen ch. 6/8 + web-checked arcs"),
    ("probability-theory", "Probability Theory", 7, 22, "pr-", "M2 ch. 09 + 14"),
    ("statistics", "Statistics", 8, 30, "stat-", "M2 ch. 11 + OpenStax arc"),
    ("real-analysis", "Real Analysis", 9, 34, "ra-", "Rudin PMA 3e (Drive scan)"),
    ("complex-analysis", "Complex Analysis", 7, 23, "ca-", "Churchill arc (web) + Kreyszig"),
    ("abstract-algebra", "Abstract Algebra", 8, 26, "ab-", "Gallian arc (web-checked)"),
    ("topology", "Topology", 8, 26, "top-", "Munkres arc (web-checked)"),
    ("numerical-analysis", "Numerical Analysis", 7, 24, "na-", "Burden & Faires arc + Kreyszig"),
    ("mathematical-methods-for-engineering", "Mathematical Methods for Engineering", 8, 28, "em-", "Kreyszig (Drive)"),
    ("optimization-and-operations-research", "Optimization and Operations Research", 8, 27, "or-", "Hillier arc (web-checked)"),
    ("advanced-mathematical-foundations", "Advanced Mathematical Foundations", 7, 23, "af-", "the capstone (verified open-problems list)"),
]
TOTAL_CH = sum(b[2] for b in PLANNED_BOOKS)
TOTAL_LES = sum(b[3] for b in PLANNED_BOOKS)

EXTRAS = {
    "run": "full-shelf planning pass (owner-directed turn, 2026-11-10 — not a numbered LOCKIN RUN; zero lesson authoring)",
    "directive": "owner instruction 2026-11-10: download the Drive's mathematics books one by one, extract EVERY table of contents (vision model for the scanned ones — 'nothing can be missed out, not a single TOC'), research each subject (internet included), and create the complete Mathematics-section plan for every book the way Advanced Algebra's was created — plans only, no content",
    "tocs": "53/53 sources processed one at a time (42 Cengage M-module chapter PDFs M1-M5 + 11 root classics incl. Loney, Thomas 14e, Stewart ET, Kreyszig, Rudin PMA, Rosen 8e, Strang 5e, Axler 4e, Lay 5e, Khattar QA, Hall & Knight Elementary Algebra identified); 44 scanned sources transcribed by the vision model (z-ai vision, 6-16 front pages each); working copies deleted after extraction per the storage law",
    "evidence": "docs/research/DRIVE_TOC_SURVEY.md (the durable book-wise/theory-wise record: every TOC in full, the source->book mapping, the exam/exercise typology census, the web-research findings)",
    "books": [f"{b[0]} ({b[2]} ch / {b[3]} lessons, {b[4]} prefix, {b[5]})" for b in PLANNED_BOOKS],
    "totals": f"23 books promoted to status 'planned': {TOTAL_CH} chapters / {TOTAL_LES} planned lessons; mathematics shelf = 27 books (3 complete + 24 planned incl. AA)",
    "corrections": "the AA book.ts JEE note corrected this pass: mathematical induction/reasoning/LPP were removed from JEE Main in the 2024 revision (run 89's unit listing was stale; verified against multiple sources 2026-11-10)",
    "gates": "verify-math-shelf-planning.ts 1204/1204 GREEN (shelf load+statuses, per-book honest census, planned-chapter hygiene, id-prefix reservation over the 120 written ids, survey evidence base); lint 0 errors; tsc clean; routes 200; e2e-math-shelf.sh all green (home 27 books + 23/23 new titles, sampled planned TOCs with correct chips, empty states, 404 integrity, mobile 390 no overflow, 0 console errors everywhere, pixel checks non-blank/no blue cast; VLM visual confirmation of the Geometry book page)",
    "authoring_unchanged": "run 90 opens AA 1.1 + 1.2 exactly as the run-89 pointer set; the 23 planned books follow in backlog order as predecessors complete",
}

# ---------- PROGRESS.json ----------
p_path = "docs/project/PROGRESS.json"
p = json.load(open(p_path))
p["updated"] = TODAY
p["phase"] = (
    f"FULL MATHEMATICS SHELF PLANNED (owner-directed pass, {TODAY}): the Drive's mathematics "
    "collection downloaded book-by-book with ALL 53 TOCs extracted (44 by vision-model "
    "transcription), web syllabus audits, and 23 books promoted to complete researched "
    "plans (status 'planned') — the shelf now 27 books: 3 complete (FM/ANS/AL), AA "
    f"authoring-ready, and {TOTAL_CH} chapters / {TOTAL_LES} planned lessons across the 23. "
    "Zero lessons written; the one-book-at-a-time authoring cadence is unchanged (run 90 "
    "opens AA 1.1+1.2). Evidence: docs/research/DRIVE_TOC_SURVEY.md."
)
lib = p["library"]
lib["books"] = [b for b in lib["books"] if b["id"] in (
    "foundation-mathematics", "arithmetic-number-systems", "elementary-algebra", "advanced-algebra")]
for bid, title, ch, les, pref, spine in PLANNED_BOOKS:
    lib["books"].append({
        "id": bid, "title": title, "status": "planned",
        "chaptersPlanned": ch, "chaptersWritten": 0, "lessonsWritten": 0,
        "termsAvailableForFlashcards": 0,
        "notes": f"PLANNED (full-shelf pass {TODAY}) — {ch} ch / {les} planned lessons, "
                 f"`{pref}` prefix reserved; research: {spine}. Authoring opens in backlog "
                 "order after Advanced Algebra completes.",
    })
p["fullShelfPlanning20261110"] = EXTRAS
p["lastCompleted"] = {
    "run": "full-shelf planning pass", "date": TODAY,
    "what": f"23 mathematics books promoted to planned status with complete researched "
            f"chapter/lesson layouts ({TOTAL_CH} ch / {TOTAL_LES} planned lessons); 53/53 "
            "Drive TOCs extracted (44 vision-transcribed); DRIVE_TOC_SURVEY.md evidence "
            "base committed; verify-math-shelf-planning 1204/1204 + full E2E green; zero "
            "lesson authoring — the AA authoring opening (run 90) is unchanged",
}
json.dump(p, open(p_path, "w"), indent=1, ensure_ascii=False)
print(f"PROGRESS.json updated: {len(lib['books'])} books")

# ---------- RESUME_POINTER.json ----------
r_path = "docs/project/RESUME_POINTER.json"
r = json.load(open(r_path))
r["updated"] = TODAY
r["nextAction"] = (
    "NEXT RUN 90: OPEN AA (BOOK #4 'ADVANCED ALGEBRA') CHAPTER 1 'FUNCTIONS AS OBJECTS' — "
    "lessons 1.1 'Relations: the Set-of-Pairs View' (aa-relations-the-set-of-pairs-view) + "
    "1.2 'One-One and Onto: Classifying the Machines' "
    "(aa-one-one-and-onto-classifying-the-machines), strictly sequentially, the "
    "two-lessons-per-run cadence (owner directive 2026-11-06 v2). THE VERIFY-FIRST "
    "DISCIPLINE: create scripts/verify-book4-ch01.ts FIRST and grow it green BEFORE any "
    "prose (the run-67/83 precedent for a book's first chapter). NOTE (full-shelf planning "
    "pass, 2026-11-10, owner directive — zero lessons written): the ENTIRE mathematics "
    "shelf is now planned (27 books: FM/ANS/AL complete, AA authoring-ready, 23 promoted "
    f"to status 'planned' with {TOTAL_CH} ch / {TOTAL_LES} researched planned lessons — "
    "evidence base docs/research/DRIVE_TOC_SURVEY.md). The authoring order is unchanged: "
    "complete AA first; the 23 planned books follow in SUBJECT_BACKLOG order as each "
    "predecessor completes. Their lesson-id prefixes are reserved and verified unused "
    "(geo- cg- tr- dc- ic- mc- de- la- dm- nt- st- ml- co- pr- stat- ra- ca- ab- top- "
    "na- em- or- af-). Per-unit reference downloads for any planned book's chapters can "
    "use the Drive file ids recorded in the survey."
)
r["fullShelfPlanning20261110"] = {
    "nature": "owner-directed planning turn (not a numbered run); zero lesson authoring",
    "promoted": f"23 books, {TOTAL_CH} chapters, {TOTAL_LES} planned lessons, status 'planned'",
    "evidence": "docs/research/DRIVE_TOC_SURVEY.md (53/53 TOCs incl. 44 vision-transcribed)",
    "verifier": "scripts/verify-math-shelf-planning.ts — 1204/1204 green",
    "e2e": "scripts/e2e-math-shelf.sh + e2e-math-shelf.page.js — all green (0 console errors)",
    "next": "AA ch. 1 lessons 1.1 + 1.2 at run 90, unchanged",
}
json.dump(r, open(r_path, "w"), indent=1, ensure_ascii=False)
print("RESUME_POINTER.json updated")

# ---------- WORKLOG.md ----------
wl_path = "docs/project/WORKLOG.md"
wl = open(wl_path).read()
entry = f"""## {TODAY} — OWNER-DIRECTED FULL-SHELF PLANNING PASS (not a numbered LOCKIN RUN; trace 1a1c5eab9115d8e1 turn): **THE ENTIRE MATHEMATICS SHELF IS PLANNED** — 23 books promoted to status 'planned' with complete researched chapter/lesson layouts ({TOTAL_CH} chapters / {TOTAL_LES} planned lessons); the Drive's mathematics collection downloaded one book at a time with ALL 53 tables of contents extracted (44 by vision-model transcription); ZERO lesson authoring (the one-book-at-a-time authoring cadence is unchanged — run 90 opens AA 1.1 + 1.2 exactly as the run-89 pointer set)

**The owner's directive (this turn):** use the Google Drive books, download them one by one, extract every TOC — "if you can't extract TOC, then use imaging vision... nothing can be missed out, not a single TOC" — research every subject (internet included), and create the complete mathematics-section plan for every book the way the fourth book (Advanced Algebra) was planned: plans only, no content.

**Execution:** (1) The Drive survey rebuilt post-recycle (89 entries) and the MATHS subfolder machine-listed: the Cengage M1-M5 modules (7+14+7+10+4 chapter PDFs). (2) A 53-source manifest (42 module PDFs + 11 root classics: Loney, Thomas 14e, Stewart ET metric, Kreyszig, Rudin PMA, Rosen 8e, Strang 5e, Axler 4e, Lay 5e, Khattar QA, Hall & Knight Elementary Algebra — the last IDENTIFIED this pass). (3) The extraction pipeline: one file at a time (storage law) — download → pdftotext for digital PDFs → for the 44 SCANNED sources, front pages rendered at 120 dpi and transcribed by the vision model (`z-ai vision`, the transcribe-everything prompt incl. exercise types) → PDF deleted immediately. The sandbox reaped background daemons mid-pass, so the pipeline was restructured as bounded chunks inside single invocations (scripts/toc_pipeline_chunk.sh). Two VLM 429 rate-limit pauses absorbed with retries. A trim heuristic damaged the Khattar TOC once — the Drive original re-downloaded and re-extracted clean (the recovery is logged in extract.log). (4) Web research: NCERT class 9-12 chapter lists (rationalized; the NEP 'Ganita Manjari' class-9 transition noted), JEE Main 2026 units (with the verified 2024 removals — induction, reasoning, LPP, heights-and-distances), OpenStax arcs, and the classic TOCs for the no-Drive subjects (Munkres, Gallian, Burton, Churchill-Brown, Burden & Faires, Hillier, Halmos — every numerically-stated list web-checked). (5) The 23 book.ts plans authored in the house manner (positioning + no-duplication contract + research notes + chapters with summaries + plannedLessons), registered in index.ts; accents kept in the warm/earth family. (6) The AA header's stale JEE unit listing corrected (PMI/reasoning/LPP removal noted — accuracy over volume).

**Gates:** verify-math-shelf-planning.ts **1204/1204 GREEN** (shelf 27 books: 3 complete + 24 planned; per-book honest census; planned-chapter hygiene incl. >=3 lessons and substantial summaries; the 23 prefixes verified unused over the 120 written ids; survey evidence checks). lint 0 errors (4 pre-existing-style warnings); tsc clean; routes 200 (home + sampled planned books); e2e-math-shelf.sh **all green** — home shows 27 books with all 23 new titles, sampled planned books render full TOC plans with correct chips (38/44/34/30 planned etc.), planned-lesson titles verified present, empty states hold, 404 integrity, mobile 390 no overflow, **0 console errors on every page**, pixel checks non-blank/no blue cast, and a VLM visual confirmation of the Geometry book page.

**Deliverables:** 23 x src/data/library/books/mathematics/&lt;slug&gt;/book.ts; docs/research/DRIVE_TOC_SURVEY.md (294 KB — every TOC in full, book-wise arrangement, the exam/exercise typology census, the web-research findings); SUBJECT_BACKLOG.md rewritten for the planned shelf; MASTER_PLAN.md §2 records the directive; the six-file memory set updated.

**Zero lessons written. Authoring unchanged: run 90 opens AA 1.1 + 1.2.**

**Git:** ship commit follows this entry; **push PENDING** — no PAT in this turn's payload (the owner's instruction message carried no fire payload), so per the standing push protocol the commit stays local and the next scheduled fire (whose payload re-embeds the PAT) or the owner pushes it; logged here without any token value, as always.

---

"""
open(wl_path, "w").write(entry + wl)
print("WORKLOG.md entry prepended")

# ---------- SOURCE_LOG.md ----------
sl_path = "docs/project/SOURCE_LOG.md"
sl = open(sl_path).read()
sl_entry = f"""## Full-shelf planning pass ({TODAY}) — the 53-source TOC extraction (owner directive)

- Downloaded ONE AT A TIME into temporary-references/pdfs/ and DELETED after
  extraction (storage law honored; Drive originals untouched): 42 Cengage
  module chapter PDFs (MATHS M1-M5) + 11 root classics. Digital PDFs ->
  pdftotext front matter; the 44 scanned sources -> 120-dpi page renders ->
  vision-model transcription (z-ai vision) with the transcribe-everything
  prompt (topics, subtopics, exercise types, page numbers). 53/53 TOCs
  extracted; the durable record is **docs/research/DRIVE_TOC_SURVEY.md**.
- The Khattar TOC was re-extracted once after a trim heuristic damaged it
  (the Drive original re-downloaded; recovery clean).
- Root classics' Drive file ids and the same-arc editions NOT re-downloaded
  this pass (Anton, Larson x2, Stewart 8e + solutions, Schaum 6e, Strang
  LAA 4e, Hall & Knight Higher Algebra x2 — banked run 66) are all listed
  with ids in the survey and temporary-references/inventory.json: they are
  per-unit download candidates at authoring time.
- Web-checked this pass (no-Drive subjects): Munkres 2e, Gallian, Burton 7e,
  Churchill-Brown 9e, Burden & Faires 10e, Hillier & Lieberman, Halmos,
  OpenStax Precalculus/Introductory Statistics/Calculus arcs; NCERT class
  9-12 chapter lists; the JEE Main 2026 unit list with the verified 2024
  removals (induction, mathematical reasoning, LPP, heights-and-distances).

"""
open(sl_path, "w").write(sl.replace("# SOURCE LOG — Google Drive reference-book ledger\n\nStorage law: ~9 GB total; download only the current unit's books into\n`temporary-references/` (gitignored); delete local copies when the unit is\nverified; **never** touch Drive originals. Internet research is the\nsanctioned fallback/supplement when the Drive lacks a topic (MASTER_PLAN §2\nstep 6).\n\n",
                                    "# SOURCE LOG — Google Drive reference-book ledger\n\nStorage law: ~9 GB total; download only the current unit's books into\n`temporary-references/` (gitignored); delete local copies when the unit is\nverified; **never** touch Drive originals. Internet research is the\nsanctioned fallback/supplement when the Drive lacks a topic (MASTER_PLAN §2\nstep 6).\n\n" + sl_entry, 1))
print("SOURCE_LOG.md entry prepended")

# ---------- DETAILED_LOG.md ----------
dl_path = "docs/project/DETAILED_LOG.md"
dl = open(dl_path).read()
dl_entry = f"""## {TODAY} — FULL-SHELF PLANNING PASS (owner-directed): 23 mathematics books planned, 53/53 Drive TOCs extracted

- **Books promoted to 'planned'** (id — chapters / planned lessons / prefix / spine): """ + "; ".join(f"{b[0]} — {b[2]}/{b[3]}/{b[4]}/{b[5]}" for b in PLANNED_BOOKS) + f""".
- **Shelf state:** 27 mathematics books — Foundation Mathematics (complete, 48 lessons), Arithmetic and Number Systems (complete, 34), Elementary Algebra (complete, 37), Advanced Algebra (planned, 35, authoring opens run 90), and the 23 above ({TOTAL_CH} ch / {TOTAL_LES} planned lessons).
- **Evidence base:** docs/research/DRIVE_TOC_SURVEY.md — every source's TOC in full (42 module chapter-books + 11 classics), the source->book mapping, the Cengage exercise typology census (Concept Application Exercises; Single/Multiple Correct, Linked Comprehension, Matrix Match, Numerical Value; JEE Archives), and the web-research findings for the no-Drive subjects.
- **Gates:** verify-math-shelf-planning.ts 1204/1204; lint 0 errors; tsc clean; routes 200; e2e-math-shelf.sh all green incl. 0 console errors and mobile no-overflow; VLM visual check of the rendered Geometry page.
- **Zero lesson authoring.** Run 90 opens AA 1.1 + 1.2 per the unchanged cadence.

"""
open(dl_path, "w").write(dl_entry + dl)
print("DETAILED_LOG.md entry prepended")

# ---------- MASTER_PLAN.md ----------
mp_path = "docs/project/MASTER_PLAN.md"
mp = open(mp_path).read()
marker = "The owner will supply a Google Drive link with a large reference book\ncollection. Workflow per unit:"
addition = """**Owner directive (2026-11-10, full-shelf planning pass):** the ENTIRE
Mathematics shelf's remaining books were planned in one owner-directed
pass — the Drive's mathematics collection downloaded one book at a time,
ALL 53 tables of contents extracted (vision-model transcription for the 44
scanned sources — "nothing can be missed out, not a single TOC"), each
subject researched (Drive + internet + verified classic arcs), and 23 books
promoted to complete researched plans (`status: 'planned'` in
`src/data/library/books/mathematics/*/book.ts`; the evidence base is
`docs/research/DRIVE_TOC_SURVEY.md`). This was a PLANNING pass only: zero
lessons were written and the one-unit-at-a-time AUTHORING cadence above is
unchanged. The per-unit workflow (download -> study -> write -> verify ->
ship) now draws on the survey's recorded Drive ids and TOCs for its
per-unit downloads.

The owner will supply a Google Drive link with a large reference book
collection. Workflow per unit:"""
if marker in mp and "full-shelf planning pass" not in mp:
    mp = mp.replace(marker, addition, 1)
    open(mp_path, "w").write(mp)
    print("MASTER_PLAN.md directive recorded")

# ---------- EXAM_REGISTRY.json ----------
er_path = "docs/project/EXAM_REGISTRY.json"
er = json.load(open(er_path))
er["updated"] = TODAY
er["note"] = (
    "The 2026-11-10 full-shelf planning pass mapped the mathematics shelf's "
    "exam-relevant scope per book (JEE Main units incl. the verified 2024 "
    "removals of induction/reasoning/LPP; NCERT class 9-12 chapters; GATE/"
    "IIT-JAM university poles; olympiad L6 craft; the Cengage exercise "
    "typology census in docs/research/DRIVE_TOC_SURVEY.md). Per-examination "
    "research (status fields below) is still its own pending workflow."
)
json.dump(er, open(er_path, "w"), indent=2, ensure_ascii=False)
print("EXAM_REGISTRY.json note updated")
