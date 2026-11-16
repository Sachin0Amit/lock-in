# EXAM TOPIC LEDGERS — the all-disciplines exam/TOC coverage pass

> Built by the **all-disciplines TOC + exam-topic coverage pass** of 2026-11-16
> (owner directive: *"do a table of content scan for all the books in the
> drive, and from those table of content, none of the topics should be
> missing. So plan all those topics inside the chapters and categories,
> distributed books, segregate them book-wise and include them in chapters.
> Then search for each book, search exam in which those books are used, asked,
> and see that none of the topics related to those exams are missing in that
> book ... for each books of all the fields or disciplines. be comprehensive
> take your time"*). This file is the durable record of BOTH layers:

1. **The exam layer (the standing gate, GREEN)** — every topic line of every
   researched exam syllabus, routed to the owning shelf book (the
   "segregate them book-wise" artifact) and token-matched against that
   book's plan blob (the same ≥60% standard as the maths drive-TOC gate and
   the CS exam pass). Standing gate: `scripts/verify-shelf-exam-topics.ts`
   — **1,069 direct / 0 cross / 0 gap** across six ledgers. The routing
   tables (canonical form) live in `scripts/ledger_data/*.json` with their
   per-exam source URLs; the builders are committed
   (`build_phys_chem_ledgers.py`, `build_biology_ledger.py`,
   `build_medical_ledger.py`, `build_ecf_ledger.py`,
   `build_humanities_ledger.py`).

2. **The Drive TOC layer (the first directive)** — every remaining Drive
   book TOC extracted this pass (124 sources in
   `temporary-references/manifest.tsv`: 28 root classics + 96 Cengage
   chemistry/physics module PDFs; extraction by
   `scripts/toc_pipeline_chunk.sh` with VLM transcription for scanned
   files — **123/124 resolved**; `root-campbell-biology-11e` is the one
   DOWNLOAD-FAILED retry candidate). The chapter/section-level ledger
   (2,399 routed lines) lives at `scripts/ledger_data_working/
   drive_tocs.json` with the working report; the highest-value root-classic
   gaps were filled by content this pass (76 planned lessons from
   Sedra-Smith/Horowitz/Nilsson/Hughes/Goldstein/Griffiths/Zumdahl/Atkins/
   Clayden/Laxmikanth/Spectrum/Russell/Murphy/Hammer's TOCs) and the
   remaining ~440 subtopic-level lines are recorded honestly as the
   queued continuation of the same gap-fill loop
   (`scripts/process_drive_tocs.py` is the re-runnable matcher).

## The exam layer census (the standing gate's ledgers)

| ledger | lines | exams | verdict |
| --- | --- | --- | --- |
| physics_exams | 256 | jee-main, jee-advanced, neet-ug, cuet-ug, gate-ph, csir-net-physical, ap-physics-1/2/c-mech/c-em, ib-physics, a-levels-physics (9702), ipho | all direct |
| chemistry_exams | 246 | jee-main, jee-advanced, neet-ug, cuet-ug, gate-cy, csir-net-chemical, ap-chemistry, ib-chemistry, a-levels-chemistry (9701), icho | all direct |
| biology_exams | 297 | neet-ug (full Biology section), ncert-biology (11+12), cuet-ug (Biology 304), gate-xl (P/Q/R/S/T/U in full), ap-biology, ib-biology, a-levels-biology (9700), ibo | all direct |
| medical_exams | 108 | fmge (subject-wise), neet-pg, gpate, nclex-rn (2026 test plan), inc-bsc (2020 Regulations), vci-bvsc (MSVE 2016), dci-bds (BDS Regulations), mcat | all direct |
| ecf_exams | 98 | ncert (econ/BS/accountancy 11+12), cuet-ug (309/301/305) | all direct |
| humanities_exams | 63 | upsc-cse (GS I-IV), upsc-optional, ugc-net, ap-clat (AP World/HumanGeo/Psych/USGov + CLAT) | all direct |

Every source URL is recorded per exam inside the ledger JSONs (official
NTA/NBEMS/council/board sites preferred; honest mirrors marked with their
nature — the same convention as the CS pass).

## The gap-fix record (what this pass ADDED to the plans)

~397 planned lessons added across 11 disciplines — every hard gap or cross
was fixed by CONTENT (planned lessons added to the owning book's chapter,
planning-level only — zero lesson authoring) or by honest re-routing
(cross-shelf where another book already owns the ground, e.g. GATE PH
vector calculus → multivariable-calculus). Highlights:
- physics/chemistry: 92 lessons (the experiment register, the p-block
  compound registers, coordination bonding, catalysis, polymers, everyday
  chemistry, the named organic reactions...)
- biology: ~160 lessons (NEET's physiology disorder registers, the
  reproductive-health register, GATE XL's plant/microbe/immunology lines,
  the food-technology cross-routes...)
- medical: 53 lessons (FMGE/NEET-PG specialty registers for surgery and
  medicine, the INC/VCI/DCI professional subjects, NCLEX client needs...)
- ECF: 20 lessons (partnership/company accounts, LPG, financial markets...)
- humanities: 24 lessons (the UPSC GS registers, NET unit registers...)
- languages + engineering + drive classics: 76 lessons (grammar-chapter
  registers, op-amp/feedback/machines topics, the classics' chapter arcs...)

## Standing set at this pass's close

`verify-shelf-exam-topics` (new — 1,069 checks) · math-shelf 1,240 · cs-shelf
2,348 · engineering-shelf 2,257 (pin amended 1,268→1,289 planned) ·
humanities 1,121 (620→644) · languages 923 (488→500) · topic-coverage 667 ·
toc-as-lessons 3,883 · exam 2,433 · cs-exam 696 · practice 274 · revision 88
· content-db verify PASS (pack v2 — 269 books / 8,725 planned+written) ·
tsc clean · lint clean on new files.

## Queued continuation (recorded honestly)

1. The ~440 remaining drive-TOC subtopic lines
   (`scripts/ledger_data_working/drive_tocs.json`) — same gap-fill loop,
   run `scripts/process_drive_tocs.py` after each wave.
2. `root-campbell-biology-11e` download retry (the one unresolved source).
3. The arts-music and ESE exam ledgers (the agent service was down at the
   end of this pass; the arts survey's graded-exam registers + the
   engineering GATE routing remain the recorded evidence for those two
   shelves).
4. The four referenced-but-missing shelf gates from the earlier waves
   (`verify-bio-med-arts-shelf-planning.ts`, `verify-chemistry-shelf-planning.ts`,
   `verify-physics-shelf-planning.ts`, `verify-ecf-shelf-planning.ts`) and
   the six shelf generators — this pass's exam gate covers the topic-
   coverage guarantee for those shelves; the census gates remain queued.
5. The languages/humanities generators now trail the book.ts files (the
   pass's lessons are not in their data modules yet) — fold before any
   regeneration.
