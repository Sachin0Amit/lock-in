#!/usr/bin/env python3
"""ship-run89.py — one-shot run-89 memory shipper (PROGRESS.json update).
Historical record; safe to re-run only with care (it overwrites phase/awaiting).
"""
import json

P = '/home/z/my-project/docs/project/PROGRESS.json'
p = json.load(open(P))

p['updated'] = '2026-11-10'

p['phase'] = (
    "PLATFORM 2026-11-10 (cron cadence v4 hybrid: night hourly 23:50-04:50 IST + day every-3h). "
    "BOOK #4 'ADVANCED ALGEBRA' PROMOTED (run 89, 2026-11-10) — the research/promotion run, the run-66 "
    "precedent followed exactly, ZERO lesson authoring per the one-book-at-a-time separation rule (run 88 "
    "closed Elementary Algebra; a closing run never opens the next book). Research phase complete: "
    "(1) reference survey — the Drive survey REBUILT post-recycle (89 entries intact) and the MATHS "
    "subfolder machine-listed: the Cengage M2 Algebra module (14 chapter PDFs; 02 Theory of Equations, "
    "03 Complex Numbers, 04 PMI, 05 Progression and Series, 06 Inequalities Involving Means, 07 P&C, "
    "08 Binomial Theorem = the JEE-mains-level arc behind the plan's chapters 2-7; 09-14 belong to other "
    "shelf books), Hall & Knight Higher Algebra (banked run 66; the classic stretch, 35-chapter arc "
    "re-confirmed), Khattar QA 4e (the aptitude scope). "
    "(2) syllabus audit, web-checked 2026-11-10: the NCERT senior arc (class 11 rationalized 14-chapter "
    "book — ch. 2 Relations and Functions with composition per CBSE 2025-26, ch. 4 Complex Numbers and "
    "Quadratic Equations, ch. 5 Linear Inequalities, ch. 6 P&C, ch. 7 Binomial Theorem, ch. 8 Sequences "
    "and Series; PMI + Mathematical Reasoning DROPPED from the textbook — noted honestly, induction kept "
    "via JEE unit 5 + the classic/module arcs; class 12 ch. 1 one-one/onto/composition/invertible), "
    "OpenStax College Algebra 2e (the modern sequencing cross-check), the JEE Main 2026 syllabus "
    "(units 1/2/4/5/6/7 — the competitive scope). "
    "(3) THE PLAN: 10 chapters / 35 planned lessons — 1 Functions as Objects (4: the set-of-pairs view, "
    "one-one/onto, composition with honest domains, the inverse machine — AL 11.3's handoff honoured as "
    "the opening ground), 2 The Quadratic at Depth (4: vertex-form optimization, the sign diagram, "
    "symmetric reads and common roots, location of roots), 3 Complex Numbers: the New Rung (3: the "
    "closure failure that forces i, conjugate and modulus, negative discriminants), 4 Inequalities: the "
    "Classical Engine (3: AM-GM, Cauchy-Schwarz and Engel's form, the triangle inequality), 5 Sequences "
    "and Series (4: AP, GP and the infinite tail, harmonic and arithmetico-geometric, special series and "
    "the method of differences), 6 Counting: Permutations and Combinations (4), 7 Induction and the "
    "Binomial Theorem (4: the domino principle, the theorem proved, the coefficients, applications), "
    "8 The Theory of Equations (3: degree n = n roots, cubics and quartics symmetric functions, "
    "transformation of equations), 9 Exponentials and Logarithms (3: every real index, the inverse "
    "machine, the equations), 10 The Synthesis and the Doorstep (3). "
    "(4) the promotion: src/data/library/books/mathematics/advanced-algebra/book.ts created (status "
    "'planned' per the run-66 precedent — the flip to 'in-progress' lands with the first written lesson "
    "at run 90; the pointer's compressed 'in-progress' phrasing was resolved in favour of the precedent "
    "and the tested planned-book rendering path), the aa- id prefix reserved (verified unused across all "
    "120 existing lesson ids), rose-crimson accent #be123c/#881337 (distinct from FM amber, ANS teal, AL "
    "olive), registered in index.ts (4 books). "
    "GATES: verify-book4-promotion.ts 290/290 (A structure, B registry 4 books, C uniqueness vs ALL of "
    "FM+ANS+AL incl. the aa- reservation, D 21 cross-reference anchors verified to exist, E the research "
    "mapping); lint 0 errors (3 warnings — 2 pre-existing promotion-script class + 1 same-class from the "
    "new e2e-book4-promotion.page.js); tsc clean; routes 200 (home/book/revise/glossary) + 404 honest "
    "(unknown lesson + unknown book); browser E2E e2e-book4-promotion.sh ALL GREEN (home: the 4th spine "
    "on the shelf + '4Books' stat + FM/ANS/AL intact; book page: h1 + breadcrumb + Planned badge + "
    "'0 written' + '35 planned' + 10 chapter tiles + ALL 35 planned titles + ZERO lesson links + no "
    "overflow at 1280 AND 390; revise/glossary empty states hold; the console-error trap installed on "
    "EVERY page — a run-89 harness improvement over run 66 — zero errors everywhere); screenshot pixel "
    "checks (86.9%/96.6%/94.8% non-white, 0% blue cast) + VLM visual inspection of the book page, the "
    "home shelf and the new card. AUTHORING CATCH: the first subtitle draft (66 chars) clipped the "
    "cover's bottom edge — caught by VLM, priced by exact DOM geometry (subtitle bottom 1160 > cover "
    "bottom 1153), fixed by shortening to 'Functions as objects — the second course' (41 chars; now "
    "1147 < 1153, clean; the large cover clean at 296 < 410). PRE-EXISTING PLATFORM ISSUE OBSERVED (out "
    "of this run's scope, logged for a future platform run): the small home-card covers clip long "
    "subtitles — ANS by ~70px, AL by ~7px (BookCover renders title+subtitle inside the fixed "
    "aspect-[3/4] box with overflow-hidden; a component-level line-clamp/autosize fix would change "
    "shipped books' rendering, so it was NOT touched in the promotion run). Nine citation keys reserved "
    "(cengage-m2-algebra, ncert-math11-ch4/5/6/7/8, ncert-math12-ch1, openstax-college-algebra, "
    "jee-main-2026-syllabus) + four carried; zero downloads. RUN 90 = AA ch. 1 OPENS with 1.1 "
    "'Relations: the Set-of-Pairs View' + 1.2 'One-One and Onto: Classifying the Machines' "
    "(verify-book4-ch01.ts written FIRST — the verify-first discipline)."
)

p['awaiting'] = (
    "nothing blocking - next run 90 = AA (Advanced Algebra) ch. 1 'Functions as Objects' OPENS with "
    "1.1 + 1.2 (create scripts/verify-book4-ch01.ts with the 1.1/1.2 engines FIRST; whitelist the "
    "verify + e2e-aa-11/12 scripts in .gitignore BEFORE commit; per-unit reference downloads begin at "
    "authoring time; run 91 continues ch. 1 with 1.3 + 1.4 + the unit-1 review)"
)

# library books list: add the promoted book entry
books = p['library']['books']
if not any(b['id'] == 'advanced-algebra' for b in books):
    books.append({
        "id": "advanced-algebra",
        "title": "Advanced Algebra",
        "status": "planned",
        "chaptersPlanned": 10,
        "chaptersWritten": 0,
        "lessonsWritten": 0,
        "lessonsPlanned": 35,
        "termsAvailableForFlashcards": 0,
        "notes": "PROMOTED (run 89, 2026-11-10) — research phase complete, 10 chapters / 35 planned lessons, "
                 "zero lessons written. Opening ground = AL 11.3's handoff (composites, inverses, the domains "
                 "of composites). aa- id prefix reserved. Authoring opens run 90 (1.1 + 1.2).",
    })

# research.sourceCollection status: note the fresh rebuild
sc = p['research']['sourceCollection']
sc['status'] = (
    "surveyed 2026-11-03 — 89 root items + MATHS/CHEM/PHYSICS/_DPPs subfolders; re-confirmed after "
    "sandbox recycles (embeddedfolderview re-pull, same 89 entries, ids intact; rebuilt again 2026-11-10 "
    "run 89, and the MATHS subfolder machine-listed: M2 Algebra = 14 chapter PDFs, the JEE-mains-level "
    "advanced-algebra scope); machine listing at temporary-references/inventory.json"
)

json.dump(p, open(P, 'w'), ensure_ascii=False, indent=1)
print('PROGRESS.json updated: phase (run 89 promotion), awaiting (run 90), library.books +advanced-algebra, sourceCollection status')
