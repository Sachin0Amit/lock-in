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
