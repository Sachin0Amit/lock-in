# SPEC geo202-S2 — BACK-HALF SEAT (quiz + exercises + coda), lesson 2.2 "Parallel Lines and the Fifth Postulate" (run 127 salvage, GEOMETRY ch.2)

You are authoring agent geo202-s2 (Task ID 127-b) for the LockIn Library. Your ONLY
deliverable is a NEW file `docs/research/geo-ch02-wip/part-geo202-back.ts`. The prose
half of the lesson is being written by another agent in `part-geo202.ts` — you may READ
that file for voice and helper patterns but MUST NEVER WRITE to it (or to any other
file in the repo). The orchestrator splices your blocks into the lesson after both
seats land.

## THE FILE YOU WRITE (exact shape)
```ts
import type { Lesson } from '../../../src/data/library/types'

export {}

/* const c22b = { ... }  vivid palette (copy the hex set from part-geo202.ts's c22)
   const f22b = "'Segoe UI', 'Helvetica Neue', Arial, sans-serif"
   const geo22bTxt / geo22bLine / ... — your OWN helpers, prefixed geo22b (no collisions) */

export const geo202BackBlocks: Lesson['blocks'] = [
  /* the quiz block */
  /* the exercises block */
  /* the coda: one heading + two paras */
]
```
The array holds EXACTLY: the `quiz` block, the `exercises` block, then the closing
coda (`heading` + 2 `para` blocks — the "what you now own" wrap of the fifth-postulate
story, pointing forward to 2.3 where Euclid first spends the postulate at I.29).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~30 minutes from now. Write the file in stages: palette +
  helpers first, then the quiz block, save; then exercises set by set (L1..L6), save
  after each set; then the coda. Never one giant write at the end.
- Syntax self-check after each save:
  `cd /home/z/my-project && bun -e "import('./docs/research/geo-ch02-wip/part-geo202-back.ts').then(m => console.log('loads OK, blocks:', m.geo202BackBlocks.length)).catch(e => { console.error('FAIL', e.message); process.exit(1) })"`
  (The full engine gate runs at the orchestrator's splice — your report is the inventory.)

## READ FIRST (in this order)
- `/home/z/my-project/src/data/library/types.ts` (exact block shapes: quiz, exercises)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/docs/research/geo-ch02-wip/spec-geo202.md` (the base spec — the lesson's full outline)
- `/home/z/my-project/docs/research/geo-ch02-wip/v-geo202.ts` — THE CONTRACT, especially the PIN section lines ~215-264: P02 (quiz), P03/P08 (exercises), P04b/P09 (solution figures). Your blocks must satisfy every one.
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo204.ts` — banked green exemplar of a finished quiz + exercises + coda (READ ONLY; copy its structural shapes, never its content)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo202.ts` — items 1-2 already written; the voice and the geo22 helper patterns (READ ONLY)

## QUIZ BLOCK (pinned by the engine — P02)
- Exactly 5 items, each with exactly 4 options; `answer` indices are EXACTLY
  **[1, 2, 0, 3, 1]** (that order — the engine pins it).
- The CORRECT option of item i must contain the pinned token (verbatim substring):
  1. `meet on THAT side`   2. `Existence and uniqueness`   3. `exactly one`
  4. `less than 180`       5. `repugnant` (Proclus's word for the fifth postulate)
- Item 4's scenario uses the pinned witness: same-side interior sums 62 + 105 = 167
  degrees (engine E26: 167 < 180 ⟹ meet that side; the other side is 360 − 167 = 193).
- Every `explain` is a full why-each-fails audit (>= 60 chars; say why each wrong
  option fails, not just why the right one works). Cengage voice, math in `$...$`.

## EXERCISES BLOCK (pinned by the engine — P03/P08/P04b)
- `sets` spans L1..L6 (all six levels present), EXACTLY 15 questions total.
- Every question: `q` (may carry `$...$`), `solution` array with >= 3 non-empty steps
  (full worked steps, Cengage voice), `answer` string (non-empty).
- NUMERIC CONTAINMENT LAW (P08): every numeric token in `answer` must appear in the
  solution text joined together (e.g. answer "x = 34; angles 83 and 97" needs 34, 83,
  97 all present in the solution steps).
- >= 2 SOLUTION FIGURES: `figures: [{ svg: string, caption: string }]` on chosen
  questions — precise computed SVGs that genuinely aid the solution (e.g. the
  year-ladder timeline 450->1733->1795->1829->1832 for the history question; a
  trichotomy census trio for the geometry-count question). Reference each figure in
  the solution steps beside it.
- PINNED WITNESSES (engine E23-E27 — these exact numbers must appear at these positions):
  - Exercise 1: same-side sums 64 + 116 = 180 exactly ⟹ verdict parallel (no side under 180).
  - Exercise 2: 47 + 121 = 168 < 180 ⟹ meet on the left; the other side is 360 − 168 = 192.
  - Exercise 4: 45 + 73.25 = 118.25 < 180 ⟹ meet that side; the other side is 241.75.
  - Exercise 13: (2x+15) + (3x−5) = 180 ⟹ 5x + 10 = 180 ⟹ x = 34; the angles are 83 and 97.
  - Somewhere: the spherical witness (two distinct great circles meet in exactly 2
    antipodal points — hence 0 parallels), and the I.29 ground (Euclid first spends
    the fifth postulate at Book I, Proposition 29).
- Difficulty arc: L1-L2 recall/one-step verdicts; L3-L4 multi-step derivations and
  Playfair walks; L5-L6 the honest-history and proof-flavour items (label exam-style
  items honestly).

## SVG LAW (engine P09 — binding for your solution figures)
`role="img"` + `aria-label` + `viewBox` on every root; text PLAIN (minus is U+2212,
NEVER a hyphen-minus directly before a digit); only these hex values: #16a34a #166534
#65a30d #0d9488 #0f766e #d97706 #ea580c #dc2626 #fef3c7 #ffedd5 #fcd34d #5eead4
#ffffff #fffdf5; stroke-width >= 1.2; font-size within 11-14.5; no label clipping the
viewBox width (estimate 0.62em per character); every figure carries an accurate caption.

## REPORT (final message)
File path; quiz key as written; the 15 questions one line each (level + one-phrase
topic + which carry figures); solution-figure count; the bun load-check output.
