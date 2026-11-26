# SPEC geo203 — lesson 2.3 "The Transversal: the Eight-Angle Census" (run 126, GEOMETRY ch.2)

You are authoring agent geo203 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch02-wip/v-geo203.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch02-wip/part-geo203.ts` — the lesson object, >= 6,000 words (target 9,000+; this is the chapter's machinery lesson)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~30 minutes from now. ENGINE FIRST (`v-geo203.ts` ALL GREEN before any prose). Then `part-geo203.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo203.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH02_MASTER_PLAN.md` (chapter arc + the BINDING a1..a8 label convention + ground-truth register)
- `/home/z/my-project/docs/research/geo-ch01-wip/part-geo103.ts.txt` + `v-geo103.ts.txt` (exemplars — same book, house voice, exact harness contract)
- `/home/z/my-project/docs/research/geo-ch02-wip/pin_check_geo126.py` (104/104 GREEN — re-derive its 2.3 witnesses in TypeScript)

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-the-transversal-the-eight-angle-census'`, `number: '2.3'`, `title: 'The Transversal: the Eight-Angle Census'`
- `concepts`: 5-8 from {transversal, corresponding angles, alternate interior angles, alternate exterior angles, co-interior angles, vertically opposite angles, the converse direction}
- `prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate']`
- `sources: ['geo-euclid-elements', 'geo-ch02-web-ground']`

## THE LABEL LAW (binding — from the master plan)
Transversal t meets line m (upper) at P, line n (lower) at Q. At P: a1 upper-left, a2 upper-right, a3 lower-right, a4 lower-left (counterclockwise). At Q: a5 upper-left, a6 upper-right, a7 lower-right, a8 lower-left. Interior = between m and n (at P: a3, a4; at Q: a5, a6). EVERY table, figure and engine in this lesson uses these labels.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: 2.2 bought the parallel; the transversal is the instrument that READS it. Definition: a transversal is a line that meets two (or more) lines at DISTINCT points; the eight angles it creates; the label law above (with body figure F1 labeling all eight exactly).
2. **The census table — the heart** (when m ∥ n, ALL families at once, table + figure F2 color-coded): corresponding a1=a5, a2=a6, a3=a7, a4=a8 (4 pairs, EQUAL — the F-pattern); alternate interior a4=a6, a3=a5 (2 pairs, EQUAL — the Z); alternate exterior a1=a7, a2=a8 (2, EQUAL); co-interior (same-side interior) a4+a5=180, a3+a6=180 (2 pairs, SUM 180 — the C); co-exterior a1+a8=180, a2+a7=180 (2, SUM 180); vertically opposite a1=a3, a2=a4, a5=a7, a6=a8 (4 pairs — 2.1's theorem at both vertices); linear pairs (8 pairs, sum 180). PINNED drill: given a1 = 65° the full census is 65, 115, 65, 115, 65, 115, 65, 115 — odds equal, evens equal; the same census verified at a1 ∈ {37.5°, 112.75°, 90°}.
3. **The honest history — which direction costs the postulate** (the lesson's signature move): the CONVERSE direction (make parallels: alternate equal OR corresponding equal OR co-interior summing 180 ⟹ parallel) is Euclid I.27/I.28 and needs NO fifth postulate; the FORWARD direction (parallels buy the equalities) is I.29 — THE FIFTH POSTULATE'S FIRST APPEARANCE in the Elements (Joyce's note, ground register). State I.29 in our own words. This split is why 2.2's story mattered.
4. **The reduction graph** (a `derivation` block + figure F3): every converse route folds down to I.27's alternate-interior equality — corresponding a1=a5 + vertical at P (a1=a3) ⟹ a3=a5; co-interior a4+a5=180 + linear at P (a3+a4=180) ⟹ a3=a5; alternate exterior a1=a7 + vertical at Q (a7=a5) ⟹ a1=a5 (then route 1). All three routes land on a3=a5 — the engine pins all three.
5. **The position group V4** (light language, exact structure): at each vertex the four positions {UL, UR, LR, LL} carry three pairings — vertical (UL↔LR, UR↔LL; EQUAL), linear across the transversal (UL↔UR, LL↔LR; SUM 180), linear across the line (UL↔LL, UR↔LR; SUM 180); each is an involution and the composition of any two gives the third (the engine checks the whole table). Why it matters: the eight-angle census is four V4 facts plus the ONE corresponding-equality the parallels buy.
6. **Worked applications** (Illustration chains): (a) given one angle, all eight WITH REASONS (each step licensed: vertical/linear/corresponding); (b) the ZIGZAG — three parallels, two transversals meeting at a point B on the middle parallel, outer angles 50° and 60° ⟹ middle angle 70° (50 + x + 60 = 180 along the straight line at B; the parallel at B is what makes it a straight-angle story); (c) the x-ladder: expressions on the census (a1 = 2x+10, a6 = 3x−5 ⟹ corresponding-equal ⟹ x = 15, both 40° — design your own pinned pair and engine-check it).
7. **Exam callout** (tone 'exam'): the F/Z/C pattern finder; "which family is this pair" by POSITION not by picture; direction identification (is the parallel GIVEN or DERIVED?) — the I.27/I.28 vs I.29 split is itself an exam-shaped distinction.
8. **Illustrations**: the three chains above (>= 3 full Cengage examples, >= 4 steps each).
9. **Figures**: >= 3 body (F1 the labeled eight; F2 the family color-coding; F3 the reduction graph) + >= 3 solution figures (the zigzag figure; the ladder figure; one census walk figure) — required wherever they aid understanding. Computed SVG (every coordinate derived), vivid palette (never blue/indigo), aria-labels.
10. **Quiz** (5, why-they-fail) + **Exercises** (15, L1-L6, full step solutions with figures).

## FORMAT LAW (binding — identical to spec-geo201)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; SVG text PLAIN (U+2212); vivid palette only; aria-labels; `terms` block; `formula` cards (the census rows: corresponding equal, alternate equal, co-interior 180); >= 2 example blocks; >= 6,000 words (target 9,000+); palette `const c23 = {...}` + `const f23`; helpers prefixed `geo23`; export `export const lessonGeo203: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first — the harness contract the assembler depends on)
`v-geo203.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo103.ts.txt), then the ENGINE section (NO part import): the full census function `census(x)` = [x, 180−x, x, 180−x, x, 180−x, x, 180−x]; for x ∈ {65, 37.5, 112.75, 90} verify EVERY family relation (corresponding 4, vertical 4, linear 8, alternate interior 2, alternate exterior 2, co-interior 2, co-exterior 2 — all with near-epsilon checks); the family count table 4/2/2/2/2/4/8; the three reduction routes landing on a3=a5; the V4 table (three involutions, composition law, the two linear pairings differ); the zigzag 70; your pinned ladder pair. Then `async function runPins()` (with `mod = await import('./part-geo203')`, exemplar shape) auditing: word floor >= 6,000; quiz key self-check; 15 exercises; >= 3 body + >= 3 solution figures; terms + formula blocks; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field); identity fields exact; concepts 5-8 + objectives 4-6; >= 3 examples with >= 4 steps; >= 2 derivation blocks. End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo103.ts.txt. ENGINE wins.
