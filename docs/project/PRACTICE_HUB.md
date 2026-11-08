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
   CGL · Quantitative Aptitude, NDA · Mathematics). Full-screen runner:
   countdown timer (auto-submit at zero), question palette with
   answered / marked-for-review states, keyboard navigation (←/→, 1–4,
   M), unanswered warning on submit. Honest negative marking graded
   SERVER-side (`scorePaper`: correct +marks, wrong −|negative|,
   skipped 0; self-marked free responses never score). Results view:
   score + percent + time, per-chapter weakness breakdown (weakest
   first), full question review with explanations, wrong answers sent
   to the Mistake Bank, attempt persisted to history.
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
   paper.

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
  types.ts                     isomorphic contracts
  engine.ts                    pure: mulberry32 RNG, chapter-balanced
                               paper generation (no duplicates, seeded),
                               scorePaper marking, chapterBreakdown,
                               computeChapterReadiness / aggregate
  questions.ts                 server-side extraction of every quiz +
                               exercise question into ONE pool, keyed
                               `${lessonId}#q<block>.<i>` /
                               `${lessonId}#x<block>.<set>.<i>`
  mistake-service.ts           record/review/resolve/list + validation
                               (questionKey must belong to lessonId)
  practice-service.ts          paper building (exam + drill/auto-focus),
                               submit (grade → attempt + mistakes +
                               ledger signals), attempts history,
                               readiness read model
  client-api.ts                typed fetch helpers (fail-soft nulls)
prisma/schema.prisma           PracticeAttempt (answers+scores, meta
                               seed/questionIds), Mistake (SRS state +
                               snapshots, unique per user+questionKey)
src/app/api/practice/          readiness · paper · submit · attempts
src/app/api/mistakes/          list+record · review · resolve
src/components/practice/       hub shell, 4 tabs, exam runner, drill
                               runner, shared bits (dials, option grid)
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

### Readiness formula

Per chapter: `readiness = coverage × (mastery/100) × (freshness/100)`.
Books/exams/library: mean over chapters (unstudied drag included).
Components shown separately — the headline number decomposes visibly.

## Quality gates (all green, 2026-11-08)

- `bun run scripts/verify-practice.ts` — **52/52**: pool shape + key
  uniqueness, determinism (same seed → same paper; different seed →
  different), count clamps, no duplicates, mcqOnly, chapter balance,
  marking (negative, skips, self-marks unscored), breakdown ordering,
  readiness arithmetic (coverage scaling, mean-of-chapters, zeros),
  preset integrity, and the live-DB Mistake Bank lifecycle (create →
  re-open → Again/Good sequencing → consecutive-good retirement →
  reopen → retake-retire → validation + isolation).
- API E2E over HTTP: paper/submit/mistakes/review/attempts/resolve
  flows, negative marking math, ledger quiz signals.
- Browser E2E via agent-browser: hub + 4 tabs, full exam run (palette,
  timer, submit-with-unanswered, results + breakdown + review), full
  drill run (self-marks, instant feedback, summary), mistake review
  (Again/Hard/Good/Easy), readiness dials + per-chapter + CTA
  cross-tab launch, reader quiz wrong-answer capture (+3 cards
  verified deterministically), exercise self-report, no console
  errors, no overflow at 1280px and 390px (tabs wrap on mobile).
- Regression: `verify-revision` 88/88 · `smoke-revision` 42/42 ·
  `bunx tsc --noEmit` clean · `bunx eslint .` 0 errors (2
  pre-existing warnings).

## Known limitations (honest)

- Exam scopes are provisional chapter maps; they grow automatically
  when '*' scope books gain chapters, but explicit lists (CAT) are
  reviewed per library expansion. EXAM_REGISTRY research (official
  syllabus PDFs) is still pending and will supersede these mappings.
- The paper's answers ship to the client (self-study trust model);
  authoritative scores come from the server-side submit only.
- Free-response scoring is self-reported by design — counts toward
  accuracy and the Mistake Bank, never toward exam marks.
- The drill's time estimate is not shown (no per-question timing yet);
  attempt `secs` is the client's honest self-report.
- One paper section per preset today (the data model carries a
  sections array for future multi-section papers).
