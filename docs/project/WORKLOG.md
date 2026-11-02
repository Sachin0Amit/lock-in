# WORKLOG — append-only work journal

Every work session appends one entry at the top. Format:
`## YYYY-MM-DD — <session summary>` with what changed, what was verified,
and what remains.

---

## 2026-11-02 — Platform v2: routed architecture + advanced study features

**Goal:** owner approved the book structure ("structure of book is ok") and asked
for improvements to it plus a more advanced website. Content authoring still
waits for the Google Drive link — no new lesson content written.

**Book structure improvements (additive, non-breaking):**
- `Lesson.prerequisites?: string[]` — rendered as completion-aware chips.
- `Lesson.sources?: string[]` — SOURCE_LOG.md citation keys, rendered at the
  lesson footer.
- New block `formula` (revision formula card → auto formula-sheet page).
- New block `algorithm` (numbered pseudocode for CS books / procedures).
- `countLessonWords` extended to both new blocks.

**Website v2:**
- Real URL routing (App Router, SSG via generateStaticParams, dynamicParams
  false): `/`, `/book/[bookId]`, `/book/[bookId]/lesson/[lessonId]`,
  `/book/[bookId]/revise`, `/book/[bookId]/glossary`, custom 404, per-page
  metadata + Book JSON-LD. Shareable deep links; browser back/forward work.
  Old client-state shell (app-shell.tsx) deleted.
- Command palette (Ctrl/Cmd+K, cmdk + Dialog): full-text search across books,
  lessons AND glossary terms with snippets; quick actions (continue reading,
  random lesson, theme toggle, home); recently-written group. cmdk's internal
  filter disabled (`shouldFilter={false}`) — `searchLibrary` does token-aware
  scoring instead (fixed multi-word queries being dropped).
- Reader upgrades: scrollspy "On this page" sidebar (IntersectionObserver,
  auto heading anchors), scroll-linked reading-progress bar, keyboard
  shortcuts (←/→ lessons, B bookmark, C complete), prerequisites block,
  sources footer, shareable-path hint.
- Quiz: score summary, persisted best score per lesson (zustand persist v2),
  retake button; scoring made batch-safe via functional setState + effect.
- Flashcards (`/revise`): auto-generated deck from every `terms` block; 3D flip
  (framer-motion + CSS backface), know/again self-marking persisted per term,
  shuffle, all/not-yet-known modes, keyboard (Space/1/2), session summary.
- Glossary (`/glossary`): A–Z jump bar + entries linking to lessons; formula
  sheet from `formula` blocks (empty-state until chapters use them).
- Home "Your desk" dashboard: continue reading card with book progress,
  streak (consecutive completion days), words read, bookmarks list.
- Progress store v2: quizBest, knownTerms (+reset per book), streak helper;
  persisted shape v2, backward compatible.

**Verified:** lint clean; all routes 200 (unknown ids 404); browser E2E —
palette multi-word search + navigation, quiz answered-all → "You scored 5/5" +
quizBest persisted + retake reset, keyboard c/b, flashcards flip/mark/mode
switch (2/5 known → "3 in deck" in todo mode), scrollspy present, progress
bar, Your desk + continue card, localStorage persistence; per-page fresh loads
show zero hydration warnings; VLM screenshot review of home/lesson/book/
revise/glossary pages (only dev-tools badge + viewport cutoff noted).

**Remaining:** awaiting Google Drive link → begin subject workflow
(Mathematics first). Exam registry research. Chapters 1.2–1.11 + books 2–27.

**Git:** commit `v2: routed platform, command palette, flashcards, glossary, reader upgrades, model v2`.

---

## 2026-11-02 — Platform base built and verified

**Goal:** prepare the base (files, structure, memory) so book authoring can
start the moment the owner supplies the Google Drive link.

**Built:**
- Content model `src/data/library/types.ts` — Book/Chapter/Lesson + 12 block
  types (para, heading, callout×6 tones, terms, equation, derivation,
  example, figure, table, list, quiz, exercises) + honest word counter.
- Disciplines taxonomy (11 shelves) `disciplines.ts`.
- First book: **Foundation Mathematics** — full 11-chapter TOC planned;
  Chapter 1 (Numbers and Place Value) with lesson 1.1
  "Numbers, Digits and Place Value" fully authored (~2.8k words: derivation
  of positional value, place-value chart, number-line SVG figure,
  international vs Indian numeration, 5-question quiz with why-wrong
  explanations, 9 exercises across L1/L2/L4 with worked solutions,
  exam-relevance callout). Accuracy pass fixed 4 issues (numeral paragraph,
  10^11 kharab column, modular-arithmetic wording, digit-reversal formula
  999(a−d)+90(b−c) — now verified by substitution).
- Reader UI: library home (hero/stats/shelves/book cards/plan grid),
  book page (cover/TOC/progress/continue-reading), lesson reader
  (typeset typography, KaTeX, interactive quiz, collapsible solutions,
  bookmark, mark-complete, font-size control, prev/next), header search
  (Cmd+K), dark mode, warm academic palette (no blue/indigo), sticky footer.
- Progress persistence (zustand persist → localStorage, keyed by
  forever-stable lesson ids).
- Memory system: docs/project/{MASTER_PLAN, BOOK_FORMAT, PROGRESS.json,
  RESUME_POINTER.json, EXAM_REGISTRY.json, SOURCE_LOG.md,
  SUBJECT_BACKLOG.md, WORKLOG.md} + README.md.

**Verified:** lint clean; tsc clean under src/; agent-browser E2E — home
render, book TOC, lesson render (55 KaTeX nodes, 1 SVG), quiz feedback,
solution expansion, completion persistence, search, dark mode, no overflow
at 390px/1280px, no console errors.

**Remaining:** awaiting Google Drive link → begin subject workflow
(Mathematics first). Exam registry research (44 skeleton entries, all
unresearched). Chapters 1.2–1.11 + books 2–27 of mathematics.

**Git:** commit `base: platform + content model + Foundation Mathematics ch1 §1.1 + memory docs`.
