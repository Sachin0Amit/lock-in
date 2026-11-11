# MASTER PLAN — LockIn Library

> The authoritative project directive. Every session starts by reading this
> file and `RESUME_POINTER.json`. Condensed from the owner's master
> instruction (kept in `upload/` history); when in doubt, the owner's
> instruction wins.

## 1. Mission

A full-stack educational platform where anyone can learn any major subject
**from absolute zero to research level** through complete, professionally
written digital textbooks — with derivations, figures, worked examples and
graded exercises, and full examination coverage as a *by-product* of genuine
understanding, never as the boundary of the content.

**Core philosophy:** books that make people knowledgeable, not books that
merely help them pass examinations.

## 2. Authoring workflow — one unit of one subject at a time

**Owner directive (2026-11-03): content is written one unit of one subject
at a time.** A *unit* = one chapter of one book. The unit is the delivery
cadence: research → write → verify → ship → log, then the next unit. Books
complete chapter by chapter; subjects complete book by book. Never plan,
draft or queue multiple units in one pass.

**Owner directive (2026-11-06): each scheduled run completes one full
chapter** — every not-yet-written lesson of the current unit plus its
completion review, authored sequentially through the unit's full gates,
at the same or higher per-lesson depth; never thinned to fit a run. This
supersedes the 2026-11-05 two-lessons-per-run interim rule. (Cadence:
every 2 hours since the owner's same-day chat directive; job 507350.)

**Owner directive (2026-11-10, full-shelf planning pass):** the ENTIRE
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

**Owner directive (2026-11-11, cover wiring + highlighter — this pass):**
"wire the cover image and and add feature to hightlight of text with
diffrent color highliter advanced features" — the owner approved the first
two items off the PROPOSED_FEATURES list. Executed: (1) **CV-01 DONE** —
the 28 AI covers are wired into the site: `BookCover`
(`src/components/library/book-view.tsx`) now renders the generated art
(`src/data/library/covers.ts` manifest → `public/covers/<bookId>.webp`)
with the title/subtitle/level/discipline as a CSS typography overlay over a
legibility scrim (the art stays text-free by design, so titles can never be
wrong), an accent frame from the book's own palette, per-variant text
budgets (thumbnail = eyebrow + title; large = full hierarchy, all
line-clamped), and automatic gradient fallback for any book without art;
E2E + programmatic ink-overflow audit: 28/28 home thumbnails + 28/28 book
pages clean. (2) **The highlighter DONE** — the ST-02 highlighting half as
a full multi-colour highlighter: six colours (yellow/green/blue/pink/
purple/orange), select-any-text palette, click-a-mark popover (recolour,
private note, copy quote, erase), a lesson-footer Highlights panel (list
with jump-to + flash, note editing, erase, copy-all, clear-all with
confirm), persistence on the device (`lockin-highlights` localStorage,
zustand persist, bookmarks pattern), and per-RichText-host anchoring
(`data-hl` in math.tsx threaded through every prose site in blocks.tsx —
139 hosts in the sample lesson) so quiz answers and collapsible solutions
can never shift a highlight; a MutationObserver repaints marks when
collapsible content re-mounts. Verified end-to-end (paint, recolour, note,
jump, persistence, collapse/reopen repaint, quiz-click React safety,
clear-all, dark-mode, mobile 390 palette in-viewport, 0 console errors
throughout). **Zero lesson authoring — run 90 still opens AA 1.1 + 1.2**
(the remaining 44 proposed items still await the owner's add/skip IDs).

**Owner directive (2026-11-11, palette-undo follow-up — same day):**
"where you have addede to choose color ad there only to undo the
selected highlite" — the colour-chooser itself (the selection palette in
`highlight-layer.tsx`) now carries the undo as a seventh control: an
eraser button after the six swatches behind a hairline divider,
faded-disabled (40% opacity) when the selected text carries no highlight,
live when it does; one click erases every highlight the selection touches
(same-host range intersection, partial overlaps included) from both the
prose and the persisted `lockin-highlights` store, then clears the
selection. Nothing else was added to the palette. Verified: e2e
palette-undo phase green (enabled over a painted mark → click → 0 marks +
0 stored; disabled on fresh text; all downstream highlighter phases
unchanged, 0 console errors), computed-style ground truth (0.4/1 opacity,
1px×26px separator) and a VLM zoomed-crop check of both states PASS.
**Zero lesson authoring — run 90 still opens AA 1.1 + 1.2.**

**Owner directive (2026-11-11, TOC-as-lessons pass):**
"make sure those TOC are written as lessons and make a guide when a
scheduled task is on it should [state] what should be included if that
TOC does not require separate lesson, be elaborate." Executed: (1) the
lesson-level gate `scripts/verify_toc_as_lessons.ts` (machinery shared
verbatim via `scripts/lib/survey_topics.ts`; routing fixed where the
blob gate had masked a wrong ANS id, and re-arranged per the directive —
LP/Lay-geometry → Optimization, series-testing → Real Analysis,
hyperbolic → Methods-for-Engineering, numerical → Numerical Analysis,
computation → its own DM chapter); (2) 25 new planned lessons inserted
(plans only; shelf then 207 ch / 736 planned lessons across the 25
planned books); (3) `docs/project/TOC_FOLD_LEDGER.json` — 403 surveyed
topics that do not warrant separate lessons, each folded into a real
host lesson with one of seven audited minimum-treatment modes;
(4) `docs/project/TOC_LESSON_GUIDE.md` — the elaborate scheduled-task
guide (pre-flight checklist, lesson anatomy bar, the lesson-worthiness
test, the fold rules). Lesson-level census: 1,861 topics — 1,068
lessons + 403 folds + 390 cross-refs, 0 gaps (gate 3,883/3,883). The
authoring cadence is untouched: run 90 still opens AA 1.1 + 1.2.

**Owner directive (2026-11-11, internet-research gap pass — this pass):**
"use internet research for each book and think of your own if any
lesson is missing add it." Executed: every one of the 25 planned books
researched against its canonical sources on the internet (Hall & Knight
*Higher Algebra* full TOC from archive.org — the survey had only its
Elementary sibling; Loney Part I/II; NCERT + Common Core geometry;
*Challenge and Thrill of Pre-College Mathematics*; Arihant/Cengage JEE
calculus; Thomas 14e/OpenStax; Raisinghania/Boyce–DiPrima; Strang 6e;
Rudin PMA ch 6/7/9; Brown & Churchill ch 7; Gallian ch 11/24 +
Dummit–Foote; Burton ch 10–12; Halmos §14/§22; Brualdi ch 9–10; Rosen
7e bipartite/Hall; Ross ch 5–7; Triola ch 13; Burden & Faires 3.3/5.6/
8.3/9; Boas; Taha ch 13 + Hillier ch 14/15; Aggarwal + Arun Sharma;
Munkres ch 8; Polya — every opened source and URL recorded in
SOURCE_LOG.md's 'Internet-research gap pass' section). Result: **91 new
planned lessons + 3 new chapters** (Geometry: 'Transformations and
Symmetry' ch 5; Probability: 'Jointly Distributed Random Variables'
ch 7; QA: 'Modern Maths at Aptitude Speed' ch 11) — shelf now **210
ch / 827 planned lessons** (+ the 3 complete books' 120 written); AA
pins 47→57; the lesson gate re-run green with tier-1 grown 1,068→1,113
(24 survey topics released from folds into full lessons). Decisions
lesson-vs-fold recorded in WORKLOG; plans only, zero lesson authoring —
run 90 still opens AA 1.1 + 1.2.

**Owner directive (2026-11-10, topic-inclusion guarantee pass — this pass):**
"make sure that all the topics or TOC of research drive survey must be
included in their respective books maths of library, make sure to arrange
them accordingly and add extra researched topics also if you want or
download popular books and use there detailed toc if needed and make sure
these books are able to cover all the top exams of the world to maximum
level so include everything possible from basic engineering, to
competitive exams of the world." Executed: (1) the machine-checked audit
`scripts/verify_topic_coverage.ts` — every topic line of the 53 surveyed
TOCs routed to its owning shelf book and token-matched against that
book's plan (1,876 topic entries; first run surfaced 128 hard gaps); (2)
gaps fixed in the plans only — the Khattar aptitude census's commercial
family given its own book (#28 Quantitative Aptitude, 11 ch / 39 planned
lessons, `qa-`), AA's log-tables lesson, Trigonometry's
quadrilaterals-and-regular-polygons lesson, Differential Equations' new
systems/phase-plane chapter, and ~50 named-topic summary enrichments
across AA/CG/DC/IC/LA/MC/MM/RA/combinatorics/DM/probability/logic; (3)
EXAM_REGISTRY.json researched and filled — 56 examinations (22 Indian +
34 international), 30 researched with mathUnits + coverage maps and a
book-wise rollup, from basic engineering (GATE, FE) to the world's
competitive exams (JEE, CUET, CAT, SSC, SAT, ACT, AP, IB, A-Level, STEP,
MAT, TMUA, Gaokao, Korean CSAT, EJU, GRE, GMAT, Putnam/AMC/IMO/Euclid…).
Zero lessons written; the authoring cadence and the run-90 opening are
unchanged. Final state: **1,876/1,876 topics included; 0 missing.**

The owner will supply a Google Drive link with a large reference book
collection. Workflow per unit:

1. Fix the current subject and book (owner's order; default: Mathematics —
   Foundation Mathematics, continuing at chapter 1).
2. Survey the Drive listing (or the internet — the sanctioned fallback)
   for reference material covering **this unit's topics only**.
3. Download only that material into `temporary-references/` (gitignored).
4. Study its TOCs, explanations, derivations, examples and exercises for
   the unit's topics.
5. Write OUR OWN original chapter — reference books inform and verify
   concepts; **never** reproduce or imitate protected expression.
6. Supplement with internet research (official syllabi, university
   curricula, authoritative references) — **explicitly mandated as the
   fallback whenever the Drive has no books for a topic/field.**
7. Run the quality gates (§6) for the unit, integrate it into the reading
   platform, and log it in `PROGRESS.json` + `WORKLOG.md` **and regenerate
   `WORK_INVENTORY.json` + `DETAILED_LOG.md`** (owner directive 2026-11-03:
   maintain a detailed log of everything written/worked on — regenerate the
   inventory with `bun run scripts/build_work_inventory.ts`).
8. Delete the downloaded working copies (never the Drive originals) once
   the unit is verified and log it in `SOURCE_LOG.md`.
9. Move to the next unit of the same book. Switch book or subject only
   when that book is complete or the owner redirects.

**Storage law:** ~9 GB total. One unit at a time. Never bulk-download.
Keep only final textbooks, assets, metadata, project files.

## 3. Examination database (research-first)

Before writing any book: research the relevant examinations. Target registry:
50+ major examinations — ≥10 Indian, ≥20 international, government
recruitment, university entrance, professional licensing, olympiads.
**Registry FILLED by the topic-inclusion guarantee pass (2026-11-10):
56 examinations (22 Indian + 34 international; 30 researched with
mathUnits + coverage maps; non-math exams honestly marked
not-applicable); machine-checked by scripts/verify_topic_coverage.ts
section I — see docs/project/EXAM_REGISTRY.json.**

Indian: JEE Main/Advanced, NEET UG + PG medical, UPSC CSE, GATE, UGC NET,
CUET UG/PG, CAT, CLAT, NDA/CDS, SSC, banking, state PSCs, VITEEE, …
International: SAT, ACT, AP, IB, Cambridge A Levels/IGCSE, Gaokao, EJU,
GRE, GMAT, LSAT, MCAT, UCAT, UK professional exams, …
Languages: JLPT, Goethe-Zertifikat, DELF/DALF, DELE, HSK, TOPIK, IELTS, TOEFL.

**Principle:** a syllabus is a coverage checklist, never the boundary of
knowledge. Track in `EXAM_REGISTRY.json`; map exams → books → chapters →
topics before marking a book complete.

## 4. Library scope (the shelves)

Eleven disciplines (`src/data/library/disciplines.ts`):
mathematics · physics · chemistry · computer-science · engineering ·
medical-sciences · biology · economics-commerce · humanities · languages ·
arts-music.

Book lists per discipline live in `SUBJECT_BACKLOG.md` (from the master
instruction §4) and get promoted to real books one at a time.

## 5. How every textbook must be written

- Begin from absolute zero; no unexplained terminology.
- Full chapter anatomy (adapt per subject): introduction → objectives →
  prerequisites → terminology → history where relevant → concepts →
  step-by-step explanations → derivations → figures → worked examples →
  applications → advanced ideas → theorems/proofs → misconceptions →
  comparisons → solved numericals → graded questions (6 levels:
  beginner → intermediate → advanced → competitive → university/professional
  → research/olympiad) → summary → formula sheet → further reading.
- Teaching voice: intuitive first, formal second; every symbol explained;
  assumptions stated; answers verified; alternative methods shown.
- **Theory presentation: Cengage JEE-book manner (owner directive
  2026-11-03)** — the Drive `MATHS` M1–M5 modules are the style reference
  (studied, never reproduced). Formal definition sentences + symbolic
  "Thus, …" restatements, "For example," runs with (i)(ii)(iii) items,
  worked examples as Illustrations with Sol. steps, properties as bullet
  lists, boxed notes. The reader renders the print look (ink-green caps
  heads, green pills/bars, sage bands); the authoring contract is
  `BOOK_FORMAT.md` § House style.
- Accuracy over volume: never fabricate formulas, history, data, or exam
  questions. Exam-style items must be labelled "exam-style" unless verified
  against official sources.
- Original figures (inline SVG) with real labels, captions, numbering.

## 6. Quality gates before "complete"

Gates run **per unit (chapter)** before that unit counts as written, and
once more over the whole book before the book is marked complete:

1. Unit drafted → 2. content verified (math recomputed) →
3. examination coverage audit run → 4. structure/navigation verified →
5. integrated into the reading platform → 6. logged in `PROGRESS.json` +
`WORKLOG.md`, with `WORK_INVENTORY.json` + `DETAILED_LOG.md` regenerated
(owner directive 2026-11-03). Drafting alone never means complete.

## 7. Non-negotiable rules

1. Completeness > speed. 2. Understanding > memorisation.
3. Accuracy > volume. 4. No artificial length limits or omissions.
5. No filler chapters. 6. No fabricated anything.
7. No duplicate material across books — cross-reference instead.
8. Preserve completed books forever. 9. Keep the 9 GB workflow honest.
10. Every book readable in the web reader, not just present in the repo.

## 8. Platform architecture (v2 — routed, advanced)

```
src/app/                              Next.js App Router, SSG (generateStaticParams)
  page.tsx                            home: hero, stats, "Your desk" dashboard
  template.tsx                        per-navigation fade transition
  not-found.tsx                       friendly 404
  book/[bookId]/page.tsx              book cover, stats, tools, TOC (JSON-LD)
  book/[bookId]/lesson/[lessonId]/    the reader (see below)
  book/[bookId]/revise/               flashcard mode (auto from `terms` blocks)
  book/[bookId]/glossary/             A–Z glossary + formula sheet

src/components/library/
  site-chrome.tsx                     header (⌘/Ctrl+K palette, lessons-done
                                      badge, theme) + footer
  command-palette.tsx                 full-text search: books/lessons/terms + actions
  lesson-view.tsx                     reader: scrollspy TOC, reading-progress bar,
                                      prerequisites, sources, keyboard shortcuts
  on-this-page.tsx                    IntersectionObserver scrollspy
  reading-progress.tsx                framer-motion scroll bar
  blocks.tsx                          all 14 block renderers + quiz scoring
  flashcards.tsx                      flip cards, know/again, shuffle, per-term memory
  glossary-view.tsx                   A–Z index + formula cards
  progress-store.ts                   completed · bookmarks · quizBest · knownTerms ·
                                      fontScale (zustand persist v2)
                                      — NOTE: daily streak removed by owner
                                      request 2026-11-03 (never reintroduce)
```

Reader keyboard shortcuts: `←`/`→` prev/next lesson · `B` bookmark ·
`C` complete. Palette: `Ctrl/Cmd+K`, ↑↓/↵, actions + recent + results.

URLs are shareable deep links (`/book/<id>/lesson/<id>`) and statically
generated. cmdk's built-in filter is OFF (`shouldFilter={false}`) —
`searchLibrary` does its own token-aware scoring (title > concepts >
chapter > full-text > scattered tokens) with snippets.
