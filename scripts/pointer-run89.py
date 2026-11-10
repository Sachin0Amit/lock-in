#!/usr/bin/env python3
"""pointer-run89.py — one-shot run-89 RESUME_POINTER.json updater.
Sets nextAction for run 90 (AA ch. 1 opens 1.1 + 1.2), banks run89Extras,
refreshes lastCompleted. lastPush is updated separately after the push.
"""
import json

P = '/home/z/my-project/docs/project/RESUME_POINTER.json'
p = json.load(open(P))

p['updated'] = '2026-11-10'

p['nextAction'] = (
    "NEXT RUN 90: OPEN AA (BOOK #4 'ADVANCED ALGEBRA') CHAPTER 1 'FUNCTIONS AS OBJECTS' — lessons 1.1 "
    "'Relations: the Set-of-Pairs View' (aa-relations-the-set-of-pairs-view) + 1.2 'One-One and Onto: "
    "Classifying the Machines' (aa-one-one-and-onto-classifying-the-machines), strictly sequentially, "
    "the two-lessons-per-run cadence (owner directive 2026-11-06 v2). THE VERIFY-FIRST DISCIPLINE: create "
    "scripts/verify-book4-ch01.ts FIRST and grow it green BEFORE any prose (the run-67/83 precedent for a "
    "book's first chapter) — the relation engines (A×B pair counts, relation-as-subset censuses, the "
    "total+single-valued function conditions priced on counterexample pairs), the one-one/onto census "
    "engines (the classic families x², x³, 1/x, |x|, ax+b swept; the finite-set pigeonhole verdicts; "
    "horizontal-probe reads cross-checked against AL 10.1/11.3's probe craft), quiz keys + exercise "
    "anchors pinned pre-prose, figure plans rect-exact. Whitelist verify-book4-ch01.ts + e2e-aa-11.sh/"
    ".page.js + e2e-aa-12.sh/.page.js in .gitignore BEFORE the commit. AUTHORING CONTRACT: book #4 is at "
    "src/data/library/books/mathematics/advanced-algebra/book.ts (status 'planned' → flips to 'in-progress' "
    "with the first written lesson; the chapter skeleton lives INLINE in book.ts as plannedLessons — the "
    "run-67 precedent: create ch-01.ts, move chapter 1 there, register the import, plannedLessons of 1.1/"
    "1.2 consumed as they are written); lesson ids use the aa- prefix (reserved, verified unused); "
    "cross-references carry (al-the-function-idea-the-doorstep is 1.1/1.2's doorstep — the machine view is "
    "AL's, the set-of-pairs view is the new ground; ncert-math11-ch2-functions + ncert-math12-ch1-"
    "relations-functions are the reserved school-canon keys; cengage-m2-algebra + hall-knight-higher-algebra "
    "the stretch; per-unit reference downloads may begin at authoring time per the storage law, working "
    "copies deleted after the unit verifies). Gates per lesson: lint, tsc, dev server routes 200 "
    "(restart with 'nohup bun run dev > dev.log 2>&1 &' if the sandbox recycled — check dev.log), and a "
    "browser E2E of the new lesson (KaTeX renders, quiz works, no console errors — the run-89 trap-on-"
    "every-page harness pattern). Ship + log the six-file suite (WORKLOG, PROGRESS, RESUME_POINTER, "
    "SOURCE_LOG, WORK_INVENTORY regenerated via build_work_inventory.ts — now derived, no hand-listed "
    "books — DETAILED_LOG at the unit ship), commit, push per the PAT one-time-URL protocol. Run 91 "
    "closes ch. 1: 1.3 'Composition: Machines in Series' + 1.4 'Inverse Functions: the Machine Undone' + "
    "the unit-1 completion review. NEVER open chapter 2 in run 90. NOTE: the sibling visual-upgrade job "
    "stays disabled at the gateway but its guard rules stand (docs/project/.figure_upgrade_lock 45-minute "
    "freshness, wait ≤10 min, never revert its uncommitted changes, add chapter files explicitly). "
    "PLATFORM DEBT QUEUED (observed run 89, for a future platform run, NOT for lesson runs): the small "
    "home-card BookCover clips long subtitles (ANS ~70px, AL ~7px) — a component-level fix, out of the "
    "promotion's scope."
)

p['lastCompleted'] = (
    "RUN 89 (2026-11-10): BOOK #4 'ADVANCED ALGEBRA' PROMOTED — the research + promotion run (the run-66 "
    "precedent followed exactly, zero lesson authoring). Reference survey (Drive rebuilt 89 entries; MATHS "
    "subfolder machine-listed: Cengage M2 Algebra module = 14 chapter PDFs, its ch. 02–08 the JEE-mains "
    "arc behind the plan's ch. 2–7; Hall & Knight Higher Algebra the classic stretch; Khattar QA the "
    "aptitude scope) + syllabus audit web-checked (NCERT class 11 rationalized 14-chapter arc + class 12 "
    "ch. 1; CBSE 2025-26 composition note; PMI dropped from the textbook, honestly recorded; OpenStax "
    "College Algebra 2e; JEE Main 2026 units 1/2/4/5/6/7). The plan: 10 chapters / 35 lessons, ch. 1 "
    "opening exactly on AL 11.3's handoff (composites, inverses, domains of composites); 21 FM/ANS/AL "
    "cross-reference anchors verified. The promotion: advanced-algebra/book.ts (status 'planned', aa- "
    "prefix reserved, rose-crimson accent, researched TOC with real summaries), index.ts allBooks = 4. "
    "Gates: verify-book4-promotion.ts 290/290; lint 0 errors; tsc clean; routes 200/404; E2E all green "
    "(console-error trap on every page, zero errors; mobile 390 clean; pixel checks + VLM visual passes; "
    "one authoring catch fixed — the cover-subtitle clip caught by VLM + DOM geometry). Logging repairs: "
    "WORK_INVENTORY's books array now derived (book #3 had been missing since run 67); DETAILED_LOG's AL "
    "section rewritten (it had been a mislabeled ANS copy since run 66). 9 citation keys reserved + 4 "
    "carried; zero downloads. Platform debt queued: home-card subtitle clipping (ANS/AL)."
)

p['run89Extras'] = {
    "run": 89,
    "nature": "research + promotion run for book #4 (run-66 precedent; zero lesson authoring)",
    "promoted": "advanced-algebra (10 chapters / 35 planned lessons, status 'planned', aa- prefix reserved)",
    "verifier": "scripts/verify-book4-promotion.ts — 290/290 (A structure incl. per-chapter plan 4,4,3,3,4,4,4,3,3,3 + the ch.-1 handoff check; B registry 4 books; C uniqueness vs FM+ANS+AL + aa- reservation over 120 prior ids; D 21 cross-reference anchors; E research mapping incl. the honest PMI note)",
    "e2e": "scripts/e2e-book4-promotion.sh + .page.js — all green; the console-error trap installed on EVERY page (harness improvement over run 66); mobile 390 clean; pixel checks + VLM visual inspection; one authoring catch: the 66-char subtitle clipped the small cover (VLM-caught, DOM-geometry-priced 1160>1153, fixed to the 41-char 'Functions as objects — the second course' → 1147<1153)",
    "chapterPlan": "1 Functions as Objects (4) · 2 The Quadratic at Depth (4) · 3 Complex Numbers: the New Rung (3) · 4 Inequalities: the Classical Engine (3) · 5 Sequences and Series (4) · 6 Counting: Permutations and Combinations (4) · 7 Induction and the Binomial Theorem (4) · 8 The Theory of Equations (3) · 9 Exponentials and Logarithms (3) · 10 The Synthesis and the Doorstep (3)",
    "citationKeysReserved": ["cengage-m2-algebra", "ncert-math11-ch4-complex-numbers", "ncert-math11-ch5-linear-inequalities", "ncert-math11-ch6-permutations-combinations", "ncert-math11-ch7-binomial-theorem", "ncert-math11-ch8-sequences-series", "ncert-math12-ch1-relations-functions", "openstax-college-algebra", "jee-main-2026-syllabus"],
    "citationKeysCarried": ["hall-knight-higher-algebra", "khattar-qa-4e", "cengage-jee-style", "ncert-math11-ch2-functions"],
    "repairs": [
        "build_work_inventory.ts books array now derived (allLiveBooks.map(bookRecordOf)) — book #3 had been missing from WORK_INVENTORY content.books since run 67",
        "DETAILED_LOG section-4 Elementary Algebra entry rewritten from live data — it had been a mislabeled copy of the ANS section since run 66"
    ],
    "platformDebtQueued": "home-card BookCover clips long subtitles (ANS ~70px, AL ~7px) — component-level fix for a future platform run, never touched in the promotion run",
    "downloads": "zero (survey-only; folder metadata via embeddedfolderview)"
}

json.dump(p, open(P, 'w'), ensure_ascii=False, indent=1)
print('RESUME_POINTER.json updated: nextAction (run 90), lastCompleted (run 89), run89Extras banked')
