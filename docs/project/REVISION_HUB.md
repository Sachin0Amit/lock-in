# Revision & Mastery (Revision Hub) — feature documentation

Added 2026-11-08 (feature run, after the Custom Book Builder).
A product feature inside the existing LockIn Library application: **track
what you have studied, and get autonomously prompted to revise it** — with
a spaced-repetition schedule, a knowledge graph of the whole library, and
honest per-chapter / per-topic / per-book revision analytics.

**CORE PRINCIPLE: ONE STUDY LEDGER, FEED FROM EVERYWHERE, PROMPT
EVERYWHERE.** The Main Academic Library remains the single source of
academic content; the study ledger stores only references to canonical
ids (chapters as `${bookId}:${chapterNumber}` — the catalog key — and
lessons by their stable lesson ids) plus derived scheduling state. No
content is ever copied, generated or invented.

## What the user gets

1. **Mark studied, on the go** — one click on any book page chapter row
   (`QuickMarkChapter`). Signed in, the mark lands in the server ledger
   (cross-device); as a guest it falls back to the device-local progress
   store with an honest "this device" label and a sign-in hint. The same
   control then shows live state: mastery chip, revision pass counter
   (×N), due badge, quick "Revise" and "Undo" actions.
2. **One ledger, many entry points** — chapter marks, lesson completion
   in the library reader, completion in the custom-book reader, and quiz
   results (score ratio → SRS quality) all feed the same per-user ledger.
   Reading a custom book is studying its underlying library lesson.
3. **Autonomous revision prompts** — a header chip ("N due") on every
   page, a library-home banner, per-book due badges, and the Revision
   Hub hero. The queue ranks items by an explainable urgency score:
   forgetting risk, overdue days and weak mastery; every item carries a
   human reason ("Due 5 days ago — revised 2×", "High forgetting risk
   (78%) — last revised 12 days ago").
4. **The Revision Hub (`/revision`)** — three tabs:
   - *Overview*: stat tiles (due, watch list, chapters studied, average
     mastery, revisions this week, active days), the ranked queue with
     per-item revise/open actions, a 12-week activity calendar, mastery
     distribution across all chapters, and a "needs your attention"
     callout.
   - *Knowledge graph*: an interactive, hand-rolled force-directed map of
     every lesson (deterministic seeded layout — stable mental map).
     Solid arrows = author-declared prerequisites (the real dependency
     structure); dotted faint links = in-chapter reading order; dashed
     amber = concept bridges (cross-chapter lessons sharing concepts,
     Jaccard ≥ 0.3, capped at 80). Node colour = mastery state, size =
     revision passes, rose dashed ring = overdue. Pan/zoom, book & state
     filters, search, edge toggles, chapter hulls, and a detail panel
     with prerequisite chains ("Builds on" / "Unlocks") and one-click
     marking.
   - *Insights*: per-book standing (coverage, passes, due, last
     activity), least-revised chapters AND lessons (the neglect
     rankings), the study log tail, and a transparent "how these numbers
     work" explainer.
5. **Guided revision session** — walks the queue item by item: why now,
   mastery/risk bars, an "open the material" link, and four honest
   self-ratings (Again / Hard / Good / Easy; keyboard 1–4) that feed the
   schedule immediately and show the next revision date. Skip advances
   without writing; the end screen summarises what was cleared.
6. **The reader shows its promise** — completing a lesson in the library
   or custom-book reader displays "Revision pass N · next revision
   {date} (mastery M/100)" with a "Log revision now" action.

## The engine (fully explainable, no black boxes)

- **Scheduling — SM-2-lite** (`src/lib/revision/srs.ts`): first study →
  1-day interval; "Again" (q ≤ 2) resets to 1 day; "Hard" (q 3) grows
  ×1.3; "Good/Easy" (q ≥ 4) walk the classic ladder 1 → 3 → 7 →
  interval × ease. Ease follows the SM-2 formula, clamped [1.3, 3.0].
  Quiz scores map onto the same quality scale (ratio × 5).
- **Mastery 0–100** = 50% revision depth (saturating log of passes) +
  30% memory freshness + 20% answer quality. Buckets: Learning < 40 ≤
  Familiar < 65 ≤ Strong < 85 ≤ Mastered.
- **Forgetting risk 0–100** = logistic curve in the overdue ratio
  (elapsed ÷ interval): ≈3% right after study, ≈14% on the due day, 50%
  at twice the interval, ≈86% at three times.
- **Revision minutes** ≈ 40% of a first read (floor 2 min) — the queue's
  honest time estimate.

## Architecture

```
prisma/schema.prisma        StudyEntry (userId+scope+refId unique, SRS
                            state, mastery), StudyEvent (audit trail —
                            first/revision/quiz/chapter-mark/lesson-complete)
src/lib/revision/
  types.ts                  isomorphic contracts
  srs.ts                    the pure engine (unit-tested)
  ledger-service.ts         persistence + overview/graph assembly +
                            validation (unknown refIds rejected, batches
                            answered per-item, idempotent by design)
  client-api.ts             typed fetch helpers
src/app/api/revision/
  overview/route.ts         GET — full dashboard; ?summary=1 → compact
                            counts for the header chip
  mark/route.ts             POST — the single write endpoint
  graph/route.ts            GET — nodes/edges + mastery overlay
  entry/route.ts            GET — one entry (reader schedule line)
src/components/revision/    hub shell, overview/insights tabs, knowledge
                            graph, revision session, quick-mark, due chip,
                            home banner, mastery visual vocabulary
Integration points: site-chrome (nav/chip/footer), home-view (banner),
book-view (chapter anchors + quick-mark + per-book due), lesson-view
(completion sync + schedule line), blocks.tsx (quiz → quality), builder
reader-view (completion sync), command palette (hub action).
```

### Queue composition rule

Chapters are the primary revision unit (as requested). Lesson entries
surface in the queue only when their chapter has no chapter-level entry
("orphan lessons") — so nothing is tracked twice and nothing is missed.

### Data isolation & honesty

- Every ledger query is scoped by `userId`; foreign data is unreachable.
- refIds are validated against the live catalog; unknown ids → 400.
- `study` on an existing entry is a no-op (no double counting);
  `unmark` deletes the entry and its events; both are idempotent.
- All displayed numbers derive from these two tables via the documented
  formulas; nothing is decorative or invented.

## Quality gates (all green, 2026-11-08)

- `bun run scripts/verify-revision.ts` — **88/88** checks: the pure
  engine (ladder, ease clamps, mastery bounds/monotonicity, risk curve,
  queue ranking & reasons) + service semantics on the live DB
  (idempotency, quiz quality, unmark, isolation, overview aggregation,
  graph invariants: every declared prerequisite is an edge, bridges
  cross chapters only, deterministic builds).
- `bun run scripts/smoke-revision.ts` — **42/42** API checks (auth
  gating, validation, marking flows, payload shapes, isolation, logout).
- `bash scripts/e2e-revision-hub.sh` — **49/49** browser E2E via
  agent-browser: guest surfaces (hub explainer, on-device marking with
  sync hint) → registered marking (chip/counter/due/revise/undo) →
  reader schedule line → ledger backdate (time travel) → header chip +
  home banner + queue with reasons → guided session (skip, restart,
  rating) → knowledge graph (render, filters, node panel) → insights →
  unmark → 0 console errors, mobile 390 no-overflow, dark mode.
  Screenshots + programmatic ink/chroma sanity on 11 captures.
- Regression: `verify-custom-book-builder` **78/78** ·
  `smoke-custom-books` **57/57** · `e2e-custom-book-builder` **62/62**
  (the reader integration did not disturb the builder flows).
- `bunx tsc --noEmit` clean · `bunx eslint` 0 errors · all routes 200.

## Known limitations (honest)

- **Guest marks are device-local** and are not merged into the account
  ledger on sign-in (deliberate: no silent cross-device guessing). The
  hub itself requires an account, like My Custom Books.
- The knowledge-graph layout is computed client-side on tab open
  (~100 nodes — instant); it is deterministic, not animated.
- Concept bridges use declared `concepts` arrays (5–8 phrases per
  lesson) with a 0.3 Jaccard threshold — a curated approximation of
  topical relatedness, not semantic AI.
- Activity-calendar dates use server-local day boundaries (UTC in this
  sandbox).
- No notifications outside the app (no email/push) — prompts live on
  the header chip, the home banner, book pages and the hub.
- Quiz→ledger logging happens for finished quizzes only (the existing
  best-score hook); untimed partial attempts are not counted.
