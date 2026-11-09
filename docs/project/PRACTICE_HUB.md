# Practice — mock exams, adaptive drills, Mistake Bank, readiness

Added 2026-11-08 (feature run, after the Revision Hub and the palette
brightening). The fifth primary surface of the app (`/practice`, nav
"Practice"): **practice the library's own questions under honest exam
conditions, drill your weakest chapters, and never lose a mistake
again** — all fed by the same data spine as the Revision Hub.

**CORE PRINCIPLE: NO NEW CONTENT, ONLY NEW COMBINATION.** Papers are
re-combinations of the written library's own quiz and exercise
questions (referenced by stable keys), graded server-side, with every
derived number traceable to a pure function. Nothing is copied from
real past papers; exam formats are approximate and labelled; scopes are
provisional and their gaps are listed, never hidden.

## What the user gets

1. **Mock exams** — six preset papers (Library Sweep, JEE Main ·
   Mathematics, CUET UG · Mathematics, CAT · Quantitative Ability, SSC
   CGL · Quantitative Aptitude, NDA · Mathematics), each served in an
   authentic **CBT (computer-based test) shell** modelled on the real
   exam interfaces (the NTA/JEE/NEET/SSC conventions): an instructions
   screen with the palette legend explained and a declaration checkbox
   (the timer does not start until "I am ready to begin"); a primary-
   coloured header strip with the paper name, candidate chip and a
   HH:MM:SS countdown (red + pulse in the last 5 minutes, auto-submit
   at zero); a two-column body with the question pane (radio options
   numbered 1–4, marks +4/−1 per question, and the classic **Clear
   Response / Mark for Review &amp; Next / Save &amp; Next** action
   bar) beside a right-hand **question palette** with the real CBT
   button states — answered (green), not answered (red), marked for
   review (violet), answered &amp; marked (violet + green tick), not
   visited (grey), current (highlight ring) — plus a live-count legend
   and an NTA-style submit-confirmation modal (state-count table,
   negative-marking warning). Mobile keeps the palette behind a
   floating drawer button. Keyboard: ←/→ move · 1–4 answer · M mark ·
   C clear. Honest negative marking graded SERVER-side (`scorePaper`:
   correct +marks, wrong −|negative|, skipped 0; self-marked free
   responses never score). Results view: score + percent + time, the
   **difficulty calibration read-out** (band, pool difficulty,
   difficulty-weighted accuracy, calibrated-question count), per-
   chapter weakness breakdown (weakest first), full question review
   with per-question difficulty chips, wrong answers sent to the
   Mistake Bank, attempt persisted to history.
2. **Adaptive drill** — targets the study ledger's weakest chapters
   (server-side `autoFocusChapters` reuses `scoreQueueItem`: forgetting
   risk, overdue days, low mastery — top 5, with the queue's own reason
   strings shown), or one book, or the whole library; 5/10/20 questions,
   MCQ + free-response mix. One question at a time: MCQs grade
   instantly with the explanation; exercises reveal the worked solution
   and trust an honest self-mark ("I got it" / "I missed it"). End
   summary: accuracy, chapters touched, misses → Mistake Bank,
   per-lesson quiz-quality signals → the study ledger (same path as
   reader quizzes).
3. **Mistake Bank** — every wrong quiz answer in the reader, every
   drill/exam miss, and every self-reported exercise miss becomes ONE
   spaced-repetition card per question (SM-2-lite via the same
   `srs.ts`; Again/Hard/Good/Easy buttons; "Again" resets, two
   CONSECUTIVE good reviews retire a card; a correct retake in the
   reader retires it immediately — same stable question key). Due /
   upcoming / retired views with stats and a resolution progress bar.
4. **Readiness** — per book and per exam: **readiness = coverage ×
   mastery × freshness** (coverage = share of lessons in the ledger, a
   chapter-level mark covers its whole chapter; freshness = 100 −
   forgetting risk; unstudied → exactly 0, the number never flatters).
   Per-chapter drill-down per book; exam cards carry provisional-scope
   caveats (pending topics listed) and launch straight into a mock
   paper. A second, **difficulty-weighted readiness** re-weighs those
   chapter scores by question-pool difficulty (harder chapters weigh
   up to 2×), alongside the pool difficulty mix, the calibrated-
   question count and YOUR difficulty-weighted accuracy on attempted
   in-scope questions.

5. **Difficulty calibration (data-derived)** — no new data collection:
   every finished `PracticeAttempt` already stores per-question
   outcomes, and those are pooled into per-question difficulty scores
   — the classic inverted p-value (1 − correct-rate) smoothed toward a
   prior with Bayesian pseudo-counts (α = 3). The prior is honest by
   construction: exercise levels L1..L6 map to a correctness ladder
   (0.85 → 0.30), quiz MCQs default to 0.55; zero attempts → the prior
   exactly, labelled "est." in the UI. Skips are excluded — an
   unanswered question is not evidence. Difficulty feeds three places:
   **paper bands** (Warm-up / Standard / Exam-level — "the JEE-level
   set"; each chapter contributes its easiest or hardest questions
   first, papers stay chapter-balanced and duplicate-free), **weighted
   accuracy** (each answered question weighs max(1, difficulty) — hard
   questions count more, shown on results and readiness), and the
   **difficulty-weighted readiness** above. Pooled stats are
   install-wide (a property of the question, not the user; only
   aggregate correct-rates, never identities) with a 15-second cache.

## Honesty rules (the feature's contract)

- Questions come ONLY from written library content; presets declare
  `scope: '*' | explicit chapter keys` over WRITTEN chapters — pending
  topics appear in `caveats` and in the UI, never silently.
- Formats (duration/questions/marking) are approximate public shapes,
  labelled `formatNote`; EXAM_REGISTRY.json research stays the backlog.
- Answers travel with the paper (self-study trust model, same as reader
  quizzes) but the SUBMIT endpoint re-grades server-side and stores the
  authoritative score; attempts store answers + derived numbers only
  (papers regenerate deterministically from presetKey + seed).
- Self-marked free responses count toward accuracy but never toward the
  score (prose is never graded).

## Architecture

```
src/data/exams/presets.ts      6 exam presets (formats, provisional
                               scopes, caveats, registryId links)
src/lib/practice/
  types.ts                     isomorphic contracts (+ DifficultyBand,
                               DifficultyInfo, difficulty fields on
                               PaperMeta / QuestionResult /
                               SubmitResponse / ExamReadiness)
  engine.ts                    pure: mulberry32 RNG, chapter-balanced
                               paper generation (no duplicates, seeded,
                               OPTIONAL band targeting — warmup/challenge
                               sort each chapter pool by calibrated
                               difficulty), scorePaper marking,
                               chapterBreakdown, difficultyPrior /
                               difficultyOf (p-value + shrinkage) /
                               bandOfDifficulty / weightedAccuracyOf /
                               aggregateReadinessWeighted,
                               computeChapterReadiness / aggregate
  questions.ts                 server-side extraction of every quiz +
                               exercise question into ONE pool, keyed
                               `${lessonId}#q<block>.<i>` /
                               `${lessonId}#x<block>.<set>.<i>`
  mistake-service.ts           record/review/resolve/list + validation
                               (questionKey must belong to lessonId)
  practice-service.ts          paper building (exam + drill/auto-focus,
                               band parameter + difficulty targeting),
                               pooledDifficultyStats (aggregate over
                               stored attempts, 15s cache), submit
                               (grade → attempt + mistakes + ledger
                               signals + difficulty enrichment), attempts
                               history, readiness read model (plain +
                               difficulty-weighted)
  client-api.ts                typed fetch helpers (fail-soft nulls)
prisma/schema.prisma           PracticeAttempt (answers+scores, meta
                               seed/questionIds), Mistake (SRS state +
                               snapshots, unique per user+questionKey)
src/app/api/practice/          readiness · paper (+band) · submit · attempts
src/app/api/mistakes/          list+record · review · resolve
src/components/practice/       hub shell, 4 tabs, the CBT exam runner
                               (instructions → paper → results), drill
                               runner, shared bits (dials, option grid,
                               DifficultyChip, formatHMS)
Integration: site-chrome (nav + footer), reader blocks.tsx (quiz
finish → wrong answers recorded, correct retakes resolve; exercise
solutions → honest self-report buttons), readiness CTA launches the
exams tab.
```

### Question keys — the shared spine

`PracticeQuestion.id` IS the Mistake Bank `questionKey` IS the reader's
report key. One wrong answer from any surface lands on ONE card; one
proven retake from any surface retires it.

### Drill auto-focus

`autoFocusChapters` builds chapter-level candidates from the ledger
(chapter entries, or orphan lesson entries aggregated weaker-wins) and
ranks them with the revision queue's own `scoreQueueItem` — the drill
targets exactly what the Revision Hub would prompt. Empty ledger →
honest fallback to the whole library with a stated reason.

### Difficulty calibration

`difficultyOf` is the whole model: `p = (correct + α·prior) /
(attempts + α)` with α = 3, `difficulty = round(100·(1 − p))`.
Data-driven when attempts > 0, prior-only otherwise (honestly labelled
"est." with the attempt count shown as n=…). Papers target a band by
SORTING (not filtering) each chapter pool — warm-up ascending,
challenge descending, tie-broken by question id — so papers never come
up short and stay chapter-balanced. Pooled stats aggregate every
stored attempt on the install; a skip is never evidence. The submit
endpoint re-derives difficulty server-side and attaches it to every
question result; the band on the submit request is display-only
(scores are computed from the answers alone).

### Readiness formula

Per chapter: `readiness = coverage × (mastery/100) × (freshness/100)`.
Books/exams/library: mean over chapters (unstudied drag included).
Components shown separately — the headline number decomposes visibly.
The difficulty-weighted variant re-weighs chapters by `1 + mean
chapter difficulty/100` (up to 2×) — shown beside the plain number,
never replacing it.

## Quality gates (all green, 2026-11-09)

- `bun run scripts/verify-practice.ts` — **165/165**: pool shape + key
  uniqueness, determinism (same seed → same paper; different seed →
  different), count clamps, no duplicates, mcqOnly, chapter balance,
  marking (negative, skips, self-marks unscored), breakdown ordering,
  readiness arithmetic (coverage scaling, mean-of-chapters, zeros),
  **difficulty calibration** (level-ladder priors, shrinkage math
  hand-computed, band boundaries, weighted-accuracy arithmetic,
  weighted-readiness aggregation, band-targeted generation ordering +
  determinism, service band parameters, pooled-stats aggregation,
  skips-excluded, answered-attempts-counted, submit enrichment,
  weighted accuracy, readiness difficulty fields), preset integrity,
  and the live-DB Mistake Bank lifecycle (create → re-open →
  Again/Good sequencing → consecutive-good retirement → reopen →
  retake-retire → validation + isolation).
- API E2E over HTTP: paper/submit/mistakes/review/attempts/resolve
  flows, negative marking math, ledger quiz signals, band parameter.
- Browser E2E via agent-browser: hub + 4 tabs, difficulty band
  selector, full CBT sitting (instructions + declaration → begin →
  radio options → palette states green/red/violet/violet+tick/grey +
  current ring → Mark for Review & Next → keyboard 1–4/←/→ → submit
  modal with the state-count table → No-keep-going → Yes-submit →
  results with the difficulty strip + per-question difficulty chips),
  mobile 390px (floating palette drawer, jump-to-question, no
  overflow), dark-mode contrast, drill flow regression, readiness
  difficulty-weighted rows, no console errors at 1280px and 390px.
- Regression: `verify-revision` 88/88 · `smoke-revision` 42/42 ·
  `bunx tsc --noEmit` clean · `bunx eslint .` 0 errors (2
  pre-existing warnings).

## Known limitations (honest)

- Exam scopes are provisional chapter maps; they grow automatically
  when '*' scope books gain chapters, but explicit lists (CAT) are
  reviewed per library expansion. EXAM_REGISTRY research (official
  syllabus PDFs) is still pending and will supersede these mappings.
- The CBT shell imitates the shared NTA/JEE/NEET/SSC conventions
  (palette states, action bar, submit modal) — it is a practice
  trainer, not a pixel clone of any vendor's client, and the formats
  stay approximate + labelled.
- Difficulty calibration is honest but young: with zero attempts
  every MCQ sits at the prior (45/100), so bands only differentiate
  once the install has attempt data. Pooled stats evolve as attempts
  accumulate — the same seed may regenerate a slightly different
  band-targeted paper later (attempts store their questionIds, so
  history never rewrites).
- The paper's answers ship to the client (self-study trust model);
  authoritative scores come from the server-side submit only.
- Free-response scoring is self-reported by design — counts toward
  accuracy and the Mistake Bank, never toward exam marks.
- The drill's time estimate is not shown (no per-question timing yet);
  attempt `secs` is the client's honest self-report.
- One paper section per preset today (the data model carries a
  sections array for future multi-section papers).
