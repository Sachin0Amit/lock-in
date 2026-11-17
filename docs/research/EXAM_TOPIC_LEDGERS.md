# EXAM TOPIC LEDGERS — the all-disciplines exam/TOC coverage pass

> Built by the **all-disciplines TOC + exam-topic coverage pass** of 2026-11-16
> (owner directive: *"do a table of content scan for all the books in the
> drive, and from those table of content, none of the topics should be
> missing. So plan all those topics inside the chapters and categories,
> distributed books, segregate them book-wise and include them in chapters.
> Then search for each book, search exam in which those books are used, asked,
> and see that none of the topics related to those exams are missing in that
> book ... for each books of all the fields or disciplines. be comprehensive
> take your time"*). This file is the durable record of BOTH layers.

## The 2026-11-17 REBUILD (read this first)

The 2026-11-16 pass's ledger infrastructure — the six ledger JSONs, the
routing gate `verify-shelf-exam-topics.ts`, the builders, the drive-TOC
matcher and the Drive working copies — lived under un-whitelisted
`scripts/` paths and `temporary-references/`. The sandbox wipe of
2026-11-17 (the same restart that emptied the content DB) destroyed ALL of
it; only the git-committed artifacts survived (the survey MDs, the book.ts
plans, this doc). The owner re-issued the directive on 2026-11-17 and the
pass was REBUILT end-to-end, wider than before:

1. **Durability root-cause fixed** — the `.gitignore` now whitelists
   `scripts/ledger_data/**` (all raw + routed + report JSONs), the central
   builder/router/fixer, the gate, the shelf gates and the emitter. The
   data layer is committed; a future wipe cannot take it again.
2. **The research wave re-done** — every exam syllabus re-researched from
   live sources (subagent batches, one ledger each, every URL actually
   fetched; official preferred, honest mirrors marked). EIGHT ledgers now:
   the original six PLUS the two that the 2026-11-16 pass queued
   (arts_music_exams, ese_exams) — the queue is cleared.
3. **The gate re-derived and hardened** — `build_exam_ledger.ts` routes
   every line to the owning book with the ≥60% significant-token standard
   (honest cross-shelf only when no home book reaches 0.60, whitelisted
   candidates only); `apply_exam_gap_fixes.ts` fixes every gap by CONTENT;
   `verify-shelf-exam-topics.ts` re-verifies all routing LIVE against the
   registry.

## The exam layer census (the standing gate, GREEN)

`scripts/verify-shelf-exam-topics.ts` — **1,473 syllabus lines / 27 honest
cross-routes / 0 gaps / 4,555 live checks** across eight ledgers:

| ledger | lines | cross | exams |
| --- | --- | --- | --- |
| physics_exams | 250 | 13 | jee-main, jee-advanced, neet-ug, cuet-ug, gate-ph, csir-net-physical, ap-physics-1/2/c-mech/c-em, ib-physics, a-levels-physics (9702), ipho |
| chemistry_exams | 310 | 0 | jee-main, jee-advanced, neet-ug, cuet-ug, gate-cy, csir-net-chemical, ap-chemistry, ib-chemistry, a-levels-chemistry (9701), icho |
| biology_exams | 276 | 9 | neet-ug, ncert-biology-11/12, cuet-ug, gate-xl (P/Q/R/S/T/U), ap-biology, ib-biology, a-levels-biology (9700), ibo |
| medical_exams | 140 | 3 | fmge, neet-pg, gpat, nclex-rn (2026 test plan), inc-bsc, vci-bvsc, dci-bds, mcat |
| ecf_exams | 89 | 0 | cuet-ug (301/305/309 — codes corrected to the official 2026 mapping), ncert econ/BS/accountancy 11+12 |
| humanities_exams | 188 | 0 | upsc-cse-gs, upsc-optional-polity, upsc-optional-anthropology, ugc-net (history/poli-sci/sociology/geography/philosophy/psychology/education), ap-world-history, ap-human-geography, ap-psychology, ap-us-government, clat |
| arts_music_exams | 95 | 2 | ugc-net (performing-arts 65 / visual-arts 79 / music 16), nata, uceed, nid-dat, cbse-fine-arts, a-levels-music (9483), ib-visual-arts |
| ese_exams | 125 | 0 | ese-civil/mechanical/electrical/electronics (the ESE 2027 notification No. 02/2027-ENGG) + the GS/engineering-aptitude lines |

Every source URL is recorded per exam inside the ledger JSONs
(`scripts/ledger_data/*_raw.json`) with its nature (official vs mirror);
the honest research notes (mirrors used and why, unreachable officials,
vintage caveats) ride the same files. Notable research events: the GATE XL
letter-map corrected to the official 2026 mapping (P=Chemistry compulsory,
Q=Biochemistry, R=Botany, S=Microbiology, T=Zoology, U=Food Technology);
the CUET domain codes corrected (301=Accountancy, 305=Business Studies,
309=Economics); the NCERT rationalised chapter lists confirmed against the
CBSE 2026-27 curriculum PDFs; the ESE syllabus taken from the official 2027
notification PDF.

## The gap-fix record (what this rebuild ADDED to the plans)

**355 planned lessons added across 116 book files** — every exposed gap
fixed by CONTENT (planning-level only, zero authoring), then the routing
re-run to **0 gaps**. Distribution: physics +34 (the IPhO/Ib lines onto the
shelf books), chemistry +55, biology +25, medical +43 (FMGE/NEET-PG/GPAT
sub-unit registers), ECF +15, humanities +60 (the UPSC GS/optional + NET
unit registers), arts-music +84 (the NET performing/visual/music unit
registers), engineering +37 (the ESE four-branch syllabi). Fixes ride the
dedicated fixer `apply_exam_gap_fixes.ts` (idempotent; per-book
cleaned-title dedupe). Six books gained honest cross-reference sentences in
their descriptions (the handoff-language guarantee), and two clean-title
collision duplicates were caught by the chemistry gate and removed.

## The shelf census gates (the other queued debt, ALSO cleared)

The four referenced-but-missing gates were rebuilt via
`scripts/emit_shelf_gates.py` and are GREEN with the post-gap census:

| gate | checks | census pinned |
| --- | --- | --- |
| verify-physics-shelf-planning.ts | 1,098 | 19 books / 172 ch / 754 planned |
| verify-chemistry-shelf-planning.ts | 585 | 10 books / 91 ch / 530 planned |
| verify-ecf-shelf-planning.ts | 1,261 | 23 books / 195 ch / 820 planned |
| verify-bio-med-arts-shelf-planning.ts | 3,309 | biology 23/182/867 · medical 19/121/585 · arts 36/183/816 |

The engineering/humanities shelf gates' census pins were amended honestly
for the ESE/humanities exam-gap additions (1,289→1,326; 644→704).

## Standing set at this pass's close

verify-shelf-exam-topics 4,555 · physics 1,098 · chemistry 585 · ecf 1,261 ·
bio-med-arts 3,309 · math-shelf 1,240 · cs-shelf 2,348 · engineering 2,257 ·
humanities 1,121 · languages 923 · toc-as-lessons 3,883 · topic 667 · exam
2,433 · cs-exam 696 · practice 274 · revision 88 · content-db verify PASS
(pack 269 books / 146 written lessons / 730,992 words / 9,079 planned
lessons) · tsc 0 errors project-wide · lint 0 errors (5 pre-existing
warnings) · routes 200.

## Queued continuation (recorded honestly)

1. The **six shelf generators** (gen_physics/chemistry/economics_finance/
   biology/medical/arts_music_shelf.py + their scripts/shelf_data modules)
   were lost with the wipe; their plan data is fully recoverable from the
   committed book.ts files (extraction is mechanical). The gates' census
   guarantees stand; the generators remain the idempotent-plan-source debt.
2. The 78 biology/medical/arts-music cover PNGs (the gen_covers.py roster
   carries all 269 books; generation runs in bounded chunks —
   `python3 scripts/gen_covers.py gen`).
3. The Drive TOC subtopic continuation (~440 lines, the 2026-11-16 queue):
   `scripts/rebuild_drive_survey.ts` + the re-download pipeline; the
   DRIVE_TOC_SURVEY.md transcriptions (committed, 86KB) remain the durable
   evidence base.
4. The Campbell 11e download retry (the one unresolved Drive source).
5. The WORK_INVENTORY regeneration (blocked on the Drive survey rebuild).
