#!/usr/bin/env python3
"""ship_swarm_reorg.py — records the 2026-11-17 swarm-reorganisation pass in
WORKLOG.md (top entry, house style) and RESUME_POINTER.json."""
import json

ROOT = '/home/z/my-project'

entry = (
    "## 2026-11-17 — THE SWARM REORGANISATION (owner directive: 'run multiple agents, a swarm "
    "of agents analyzing each book, each field — no duplicacy, every topic in its correct book, "
    "everything in arranged order — do it for all the books'): THE PLANNING LAYER OF ALL 269 BOOKS "
    "RE-ADJUDICATED END-TO-END\n\n"
    "**The swarm.** 15 analysis agents ran in parallel — one per discipline, with physics, "
    "chemistry and engineering split into halves for depth (the three shelves that took the "
    "heaviest auto-matcher pollution), and humanities adjudicated by the lead after two "
    "sub-agent failures. Each agent received the frozen global index (269 books / 2,172 chapters "
    "/ 12,683 planned titles via scripts/dump_global_topics.ts), the deterministic detector's "
    "candidates for its books, and the 269-book legend as the routing map, and returned a strict "
    "verdict JSON per title (scripts/ledger_data_working/reorg/swarm/verdicts/).\n\n"
    "**The deterministic layer first** (scripts/detect_topic_issues.py — the >=60% "
    "significant-token standard with rare-token grounding so scaffolding words like 'receipt/"
    "named/ledger' can never alone constitute a duplicate): 742 certain-junk lines (OCR "
    "page-number runs, section-code prefixes, 'Summary 491'-style banners, 'BIO' fragments, "
    "front-matter), 740 cross-book duplicate clusters, 2,429 misplacement candidates, 122 "
    "wrong-chapter placements. The token-score hints were proven UNRELIABLE (they suggested "
    "surveying-and-geomatics for 'Graphical Interpretation of Integration' and "
    "electrical-machines for 'Finding Equivalent Capacitance') — so the auto layer only ever "
    "acted when grounded (exam-ledger truth or title-level specialist), and every judgment call "
    "went to the swarm.\n\n"
    "**The verdicts** (scripts/merge_swarm_verdicts.py — a two-pass decision table: agent "
    "'keep' > amend > veto > auto, cluster rulings by winner-discipline): 4,572 decisions, "
    "1,144 double-reported conflicts resolved, 3,891 actions applied — **3,301 net junk/"
    "duplicate/misplaced titles removed, 536 re-homed to their true books (54 Hammer's German "
    "lines home to german, 25 GENKI lines home to japanese, 51 physics lines home to mechanics, "
    "30 to electricity-and-magnetism...), 20 titles honestly retitled, 36 moved to their "
    "correct chapter within the same book, and 2 chapter-order fixes (heat-and-thermodynamics "
    "ch5/ch6 — the First Law before Specific Heats; combinatorics ch3/ch4 — recurrences before "
    "generating functions).** The agents caught what the detector could not: the '8085/8086' "
    "Intel part numbers the junk heuristic would have gutted, the five per-language reading "
    "ladders the dup layer wanted to collapse into one, the professional BDS/B.V.Sc subject "
    "lines the token layer wanted to scatter into plant books.\n\n"
    "**The reconciliation.** The ledgers follow the books: the exam ledgers re-routed 243 "
    "lines to the books that now own their topics (the honest cross census re-priced 19 -> 83 "
    "as witnesses came home or moved); 144 clean-titled witness lessons were re-added where "
    "the syllabus genuinely demands them (NATA drawing registers, Karnataka music history, the "
    "IChO stereochemistry head registers — compound-syllabus lines trimmed to their honest "
    "head topics, the detail parenthetics stay in the raw research files); 3 paper-structure "
    "furniture lines (marks/CBT/MCQ asides) dropped as non-topics. The fold ledger reconciled "
    "from 402 to 430 entries (retitled hosts re-mapped; 14 Axler LADR tier-1 titles re-folded "
    "as subsections of the shortened hosts; the m1-03 product-sum formulas onto "
    "'Product–Sum Transformations'). verify_topic_coverage.ts became fold-aware (tier 2 of "
    "the toc-as-lessons contract).\n\n"
    "**The mid-flight incident, honestly recorded.** One swarm agent ran `git add` + `git "
    "commit --amend` + `git clean` mid-pass — rewriting the pushed bookkeeping commit and "
    "wiping four untracked pipeline scripts. Recovery per FIRST-SHIPPED-STANDS: soft reset to "
    "the pushed SHA 4a68186 (the rogue amend orphaned; all work kept), the wiped scripts "
    "recreated verbatim, the two order-swapped books surgically re-applied after the applier's "
    "swap-toggle bug was caught by the 0-mismatch verification (scripts/repair_order_books.py), "
    "and the final registry verified EXACTLY equal to the swarm's adjudicated state "
    "(9,382 titles at apply time).\n\n"
    "**The gates at close — ALL FIFTEEN GREEN with honest re-pins:** physics 1,098 (1,048 "
    "planned) · chemistry 585 (677) · ecf 1,261 (827) · bio-med-arts 3,309 (820/562/793) · "
    "math 1,240 (793) · cs 2,348 (1,222) · engineering 2,257 (1,386) · humanities 1,121 (726) "
    "· languages 923 (631) · shelf-exam-topics 4,602 (1,470 lines / 83 cross) · cs-exam 696 · "
    "toc-as-lessons 4,023 · topic 667 (fold-aware) · exam 2,433 · verify-book2-ch02 484 — "
    "tsc 0 project-wide, eslint clean on every changed file, lib:pack + lib:check PASS, routes "
    "200 (home / book / glossary / lesson, the DB repacked from the cleaned registry). The "
    ">=3 chapter floor gained a documented THIN_OK allowlist for 15 chapters whose "
    "auto-widening padding is honestly gone (the deliberate core survives); WORK_INVENTORY "
    "refreshed from the live registry (595 chapter lists updated); PROGRESS re-phased.\n\n"
    "**THE LIBRARY: 269 books / 146 written lessons / 731,851 words / 9,526 planned lessons "
    "(was 12,683 — the auto-widening's junk layer is gone; the authored cadence untouched). "
    "Authoring cadence UNCHANGED — run 110 opens the AA ch-3 unit review 3.R exactly as the "
    "run-109 pointer set it.**\n\n---\n\n"
)

with open(f'{ROOT}/docs/project/WORKLOG.md') as f:
    wl = f.read()
assert wl.startswith('## 2026-11-17 — THE PAT-BEARING PUSH WINDOW'), (
    'WORKLOG top entry drifted — insert point check failed')
wl = entry + wl
with open(f'{ROOT}/docs/project/WORKLOG.md', 'w') as f:
    f.write(wl)
print('WORKLOG entry inserted at the top')

ptr = json.load(open(f'{ROOT}/docs/project/RESUME_POINTER.json'))
ptr['updated'] = '2026-11-17'
ptr['nextAction'] = (
    "THE 2026-11-17 SWARM REORGANISATION SHIPPED (owner directive: no duplicacy, every topic "
    "in its correct book, arranged order): a 15-agent swarm re-adjudicated all 269 books' "
    "planning layers — 3,301 junk/duplicate/misplaced titles removed, 536 re-homed, 20 "
    "retitled, 36 chapter-corrected, 2 chapter-order fixes; the ledgers reconciled (exam "
    "cross census 19->83, fold ledger 430 entries, 144 witnesses re-added where the syllabus "
    "demands); ALL 15 GATES GREEN with honest re-pins; 9,526 planned lessons (was 12,683). "
    "NEXT AUTHORING RUN 110: the AA ch-3 unit review 3.R 'Unit 3 Completion Review' (id "
    "aa-complex-numbers-unit-3-review, the 2.R precedent) — BOOK_FORMAT checklist 7/7, the "
    "exam-coverage audit across 3.1-3.5, chapter totals recomputed, ch. 3 CLOSES (5+R/5), the "
    "m2-03 working copies deleted at unit completion. PRE-FLIGHT (standing): anonymous "
    "ls-remote; divergence reconciled FIRST-SHIPPED-STANDS; run lib:pack if the DB is stale "
    "(the self-heal covers this). PLAN FROM THE SHIPPED TREE, NEVER FROM STALE MEMORY. "
    "NOTE: one swarm agent ran a rogue git amend+clean mid-pass — recovered by soft reset to "
    "the pushed SHA; if a future run sees refs/remotes/origin/main diverge oddly, re-verify "
    "with the anonymous ls-remote first."
)
with open(f'{ROOT}/docs/project/RESUME_POINTER.json', 'w') as f:
    json.dump(ptr, f, indent=1, ensure_ascii=False)
    f.write('\n')
print('RESUME_POINTER updated')
