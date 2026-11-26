# SPEC geo204 — lesson 2.4 "Angle Sum of a Triangle and Its Consequences" (run 126, GEOMETRY ch.2)

You are authoring agent geo204 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch02-wip/v-geo204.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch02-wip/part-geo204.ts` — the lesson object, >= 6,000 words (target 9,000+; the chapter's payoff lesson)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~30 minutes from now. ENGINE FIRST (`v-geo204.ts` ALL GREEN before any prose). Then `part-geo204.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo204.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH02_MASTER_PLAN.md` (chapter arc + the BINDING label convention + ground-truth register)
- `/home/z/my-project/docs/research/geo-ch01-wip/part-geo103.ts.txt` + `v-geo103.ts.txt` (exemplars — same book, house voice, exact harness contract)
- `/home/z/my-project/docs/research/geo-ch02-wip/pin_check_geo126.py` (104/104 GREEN — re-derive its 2.4 witnesses in TypeScript)

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-angle-sum-of-a-triangle-and-its-consequences'`, `number: '2.4'`, `title: 'Angle Sum of a Triangle and Its Consequences'`
- `concepts`: 5-8 from {angle sum property, exterior angle, remote interior angles, interior angle sum of a polygon, exterior angle sum, spherical excess, triangle classification}
- `prerequisites: ['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census']`
- `sources: ['geo-euclid-elements', 'geo-ch02-web-ground']`

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: everything since 2.1 converges here. The theorem the reader has used since school — a + b + c = 180° — is finally EARNED, and the earning takes exactly one new parallel line.
2. **THE proof (Euclid I.32, the lesson's centerpiece `derivation` block, every license named)**: triangle ABC; through the vertex A draw the line ℓ parallel to BC (existence: Playfair's axiom, 2.2; the ruler-and-compass construction itself rides ch.8 — named). The census of 2.3 reads the two new transversals AB and AC: the angle at B equals the angle ℓ makes with AB on the far side (alternate interior, a4=a6-class license); likewise the angle at C onto AC's other side; the two carried angles plus ∠A sit on the straight line ℓ = 180° (2.1's straight angle). Hence a + b + c = 180°. Body figure F1: the triangle, the parallel through the vertex, the carried angles marked with matching colors and the 180° straight-angle brace — every arc coordinate derived, never eyeballed.
3. **The exterior angle**: extend one side of the triangle past a vertex; the exterior angle equals the SUM of the two remote interior angles (I.32's second half — a one-line derivation from the sum + the linear pair). PINNED sweeps: for every positive integer pair (a, b) with a + b < 180: exterior = a + b exactly, and exterior > a and > b strictly. **The honest note**: Euclid proves the INEQUALITY earlier (I.16) without any fifth postulate; the EQUALITY needs I.32 and therefore the fifth. Which results cost the postulate — the 2.3 discipline, kept.
4. **The classification census**: acute / right / obtuse triangles; the engine's positive-sweep law — at most one non-acute angle; witnesses (100, 40, 40) obtuse, (90, 62, 28) right, (61, 60, 59) acute. The right triangle's two acute angles are complementary (a + b = 90) — 2.1 rings closed.
5. **Polygon sums by dissection**: from one vertex, a convex n-gon dissects into n − 2 triangles ⟹ interior sum (n − 2)·180°. PINNED table n = 3..12: 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800. Body figure F2: the pentagon with its three dissecting diagonals and the 540° ledger. The walk-around: one lap of ANY convex polygon turns you exactly 360° ⟹ the exterior-angle sum is 360° for every n (the turning reading, with the small turning arrows).
6. **Regular polygons**: interior (n−2)·180/n and exterior 360/n; PINNED table: interiors 60, 90, 108, 120, 135, 140, 144, 150 for n = 3, 4, 5, 6, 8, 9, 10, 12; exteriors 120, 72, 60, 45, 40, 36, 30. THE HONEST DECIMALS: the regular 7-gon's interior is 900/7 = 128.571429° (6 dp) and the 11-gon's is 1620/11 = 147.272727° — the book does not round what it can compute; the exact fractions are shown beside the decimals.
7. **The non-Euclidean door (the ch.11 tease, machinery now in hand)**: on a sphere, take the north pole and two points on the equator 90° apart — the octant triangle has three right angles, sum 270°, spherical excess 90° (the construction is pinned; body or solution figure F-sphere: the octant drawn on the sphere with its three 90° angles). Hyperbolic triangles sum to LESS than 180°. The equivalence NAMED (proof rides ch.11): the 180° angle sum ⟺ the parallel postulate — this is why the fifth was worth two thousand years of argument. Tie to 2.2's census (1 / 0 / ∞ parallels).
8. **Exam callout** (tone 'exam'): the exterior-angle-at-the-WRONG-vertex trap; n − 2 vs n miscount; using the sum on a "triangle" whose three points are collinear (the degenerate 180 = 180, honestly named); regular-polygon two-equation systems (interior + exterior = 180).
9. **Illustrations** (>= 3 Cengage chains, >= 4 steps): (a) the proof walk re-performed on a specific triangle (62°, 54° ⟹ 64° — pick your own engine-checked witnesses); (b) the pentagon ledger; (c) a regular-polygon system solve.
10. **Figures**: >= 3 body (F1 the I.32 proof; F2 the dissection + walk-around; F3 the exterior angle with the remote-sum braces) + >= 3 solution figures (the octant sphere; the regular-polygon table as a computed ring diagram; one worked sum problem's figure) — required wherever they aid understanding. Computed SVG, constants derived, vivid palette (never blue/indigo), aria-labels.
11. **Quiz** (5, why-they-fail) + **Exercises** (15, L1-L6, full step solutions with figures).

## FORMAT LAW (binding — identical to spec-geo201)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; SVG text PLAIN (U+2212); vivid palette only; aria-labels; `terms` block; `formula` cards (triangle sum 180; exterior = remote sum; polygon (n−2)·180; exterior sum 360); >= 2 example blocks; >= 6,000 words (target 9,000+); palette `const c24 = {...}` + `const f24`; helpers prefixed `geo24`; export `export const lessonGeo204: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first — the harness contract the assembler depends on)
`v-geo204.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo103.ts.txt), then the ENGINE section (NO part import): re-derive in TypeScript every pinned witness (third-angle arithmetic; the positive-integer sweep at-most-one-non-acute over all a, b ≥ 1 with a + b ≤ 179; both exterior sweeps — equality to the remote sum and strict inequality over each remote angle; the polygon table n = 3..12 with the dissection count; the regular tables incl. the honest decimals round(900/7, 6) = 128.571429 and round(1620/11, 6) = 147.272727; the octant 270/excess 90; the right-triangle complement). Then `async function runPins()` (with `mod = await import('./part-geo204')`, exemplar shape) auditing: word floor >= 6,000; quiz key self-check; 15 exercises; >= 3 body + >= 3 solution figures; terms + formula blocks; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field); identity fields exact; concepts 5-8 + objectives 4-6; >= 3 examples with >= 4 steps; >= 3 derivation blocks. End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo103.ts.txt. ENGINE wins.
