# SPEC geo202 — lesson 2.2 "Parallel Lines and the Fifth Postulate" (run 126, GEOMETRY ch.2)

You are authoring agent geo202 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch02-wip/v-geo202.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch02-wip/part-geo202.ts` — the lesson object, >= 6,000 words (target 8,500+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~30 minutes from now. ENGINE FIRST: write `v-geo202.ts`, run it, get the ENGINE section ALL GREEN **before any prose**. Then write `part-geo202.ts` SECTION BY SECTION (skeleton first, append as you draft) — never one giant write at the end. If time runs short, SAVE WHAT EXISTS on disk. 
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo202.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH02_MASTER_PLAN.md` (chapter arc + BINDING label convention + ground-truth register)
- `/home/z/my-project/docs/research/geo-ch01-wip/part-geo103.ts.txt` + `v-geo103.ts.txt` (exemplars — same book, house voice, exact harness contract)
- `/home/z/my-project/docs/research/geo-ch02-wip/pin_check_geo126.py` (104/104 GREEN — re-derive its 2.2 witnesses in TypeScript)

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-parallel-lines-and-the-fifth-postulate'`, `number: '2.2'`, `title: 'Parallel Lines and the Fifth Postulate'`
- `concepts`: 5-8 from {parallel lines, parallel postulate, Playfair's axiom, transversal, equidistant lines, non-Euclidean geometry, same-side interior angles}
- `prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures']`
- `sources: ['geo-euclid-elements', 'geo-hilbert-grundlagen', 'geo-ch02-web-ground']`

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: lesson 1.2 met the fifth postulate and called it the awkward one; today it gets its own stage — the postulate that took two thousand years to understand and decided geometry's fate.
2. **Parallel DEFINED**: lines in one plane that never meet — the "never" is a promise about the infinite (echo ch.1's extendable line), so it cannot be CHECKED by looking; it must be DERIVED. That gap between checking and proving is exactly the fifth postulate's trouble. Notation m ∥ n; the degenerate note (a line is not parallel to itself in our convention — "distinct" is in the definition; stated honestly).
3. **The fifth postulate, restated in our own words** (a `derivation`-flavored reading of Euclid's statement): two lines cut by a transversal whose same-side interior angles sum to less than 180° meet on that side; summing to exactly 180° on both sides is the parallel case. The side-logic arithmetic (PINNED): the two same-side sums add to 360° (two linear pairs along the transversal — licensed from 2.1); sum 170°/190° ⟹ meet on the 170° side; 180°/180° ⟹ parallel. Body figure F1: the two lines, the transversal, the same-side interior angles shaded on the light side, the meeting side marked.
4. **The historical unease** (the honest history, ground register in the master plan): Proclus (c. 450 CE) argued the postulate "ought even to be struck out of the Postulates altogether; for it is a theorem involving many difficulties" — the first recorded unease; the two-millennium proof hunt; Saccheri 1733 (his almost-discovery, banked by 1.2); the denouement named (Lobachevsky 1829, Bolyai 1832 — the full door belongs to ch.11). Year ladder PINNED: 450 → 1733 (1283 years) → 1795 (62) → 1829 (34) → 1832 (3).
5. **Playfair's axiom (1795)**: through a point P not on a line ℓ there is EXACTLY ONE line parallel to ℓ. The existence half and the uniqueness half — the ∃! quantifier from lesson 1.3 doing real work. The EQUIVALENCE with the fifth postulate: one direction PROVED as a worked derivation (fifth ⟹ Playfair: given the interior-angle condition, the line through P making same-side sums 180° exists and is unique among parallels — sketch each license honestly); the converse direction honestly SKETCHED (flagged as a sketch, not a proof — the ch.11 machinery). Body figure F2: P above ℓ, the unique parallel through P drawn bold, the near-miss lines through P (they tilt toward ℓ and must meet — the meeting points marked), and one greyed "never meets" line labeled as the hyperbolic tease.
6. **The parallel census across the three geometries** (the trichotomy table, PINNED as standard): Euclidean — exactly 1 parallel through P; spherical — 0 (any two great circles meet; the flight-path aside: airplane routes as great circles); hyperbolic — infinitely many. A table block, honestly labeled as the ch.11 preview.
7. **Distance between parallels**: the common perpendicular; in Euclidean geometry every perpendicular segment between two parallels is EQUAL (the equidistant character); the honest note that this is itself equivalent to the fifth postulate — in hyperbolic geometry non-meeting lines are NOT equidistant (the gap grows). Body figure F3: the strip of equal perpendiculars between two parallels, beside a circle with its non-parallel "latitude" chords as the counter-picture (equal-looking gaps that do not continue).
8. **Exam callout** (tone 'exam'): identifying WHICH form of the postulate a statement uses; the "exactly one" quantifier trap (zero? one? many?); same-side interior sums and the meet-side verdict.
9. **Illustrations** (>= 2 Cengage chains, >= 4 steps): (a) from a same-side sum, the meet-side verdict with reasons; (b) the Playfair uniqueness walk — eliminate the tilting lines one by one.
10. **Figures**: >= 3 body (F1, F2, F3 above) + >= 2 solution figures (e.g. the year-ladder timeline; the census Venn-style trio) — solution figures wherever they aid understanding. Computed SVG, constants derived, vivid palette (never blue/indigo), aria-labels.
11. **Quiz** (5, why-they-fail) + **Exercises** (15, L1-L6, full step solutions).

## FORMAT LAW (binding — identical to spec-geo201)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; SVG text PLAIN (U+2212); vivid palette only; aria-labels; `terms` block; `formula` cards (e.g. same-side sums add to 360; sum < 180 ⟹ meet that side); >= 2 example blocks; >= 6,000 words (target 8,500+); palette `const c22 = {...}` + `const f22`; helpers prefixed `geo22`; export `export const lessonGeo202: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first — the harness contract the assembler depends on)
`v-geo202.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, the `Chk` type + `engine`/`pins` collectors + helpers (copy the exemplar v-geo103.ts.txt), then the ENGINE section (NO part import): re-derive in TypeScript every pinned witness (the side-sum arithmetic 360 with the three sweep values 170/118.25/90; the meet-side verdict table; the trichotomy census as a pinned table; the year ladder with all four gaps 1283/62/34/3; Playfair's ∃! structure as assertion checks). Then `async function runPins()` (with `mod = await import('./part-geo202')`, exemplar shape) auditing: word floor >= 6,000; quiz key self-check; 15 exercises with solutions; >= 3 body + >= 2 solution figures; terms + formula blocks; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field); identity fields exact; concepts 5-8 + objectives 4-6; >= 2 examples with >= 4 steps; >= 2 derivation blocks (the fifth⟹Playfair direction and one more). End with EXACTLY the marker block:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo103.ts.txt. ENGINE wins.
