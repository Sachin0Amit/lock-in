# SPEC geo301 — lesson 3.1 "Congruence: the Idea of Same Shape and Size" (run 128, GEOMETRY ch.3)

You are authoring agent geo301 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch03-wip/v-geo301.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch03-wip/part-geo301.ts` — the lesson object, >= 6,000 words (target 9,000+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~40 minutes from now. ENGINE FIRST (`v-geo301.ts` ALL GREEN before any prose). Then `part-geo301.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk (write-early-often — a partial file can be salvaged, an empty one cannot).
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo301.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH03_MASTER_PLAN.md` (chapter arc + BINDING notation law + pre-flight pins + ground-truth register)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo203.ts` + `v-geo203.ts` (exemplars — same book, house voice, exact harness contract, palette/helper conventions)
- `/home/z/my-project/docs/research/geo-ch03-wip/pin_check_geo128.py` (57/57 GREEN — re-derive the 3.1 witnesses in TypeScript)

## REFERENCE GROUND (v9.2 amendment 9 — author AGAINST these, never memory alone)
- NCERT Class 7 ch.7 "Congruence of Triangles" (temporary-references/geo-ch03/ncert7-ch7-congruence.pdf — text layer, read the 7.1-7.3 region): the superposition definition ("same shape and same size", exact copies) — re-state in OUR OWN words, never reproduce.
- Euclid Elements Book I (banked ground): superposition as Euclid's own instrument in I.4.
- The library's sibling books: cross-reference (prerequisites/prose) rather than repeat — 3.1 builds on ch.2's angle-sum work.

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-congruence-the-idea-of-same-shape-and-size'`, `number: '3.1'`, `title: 'Congruence: the Idea of Same Shape and Size'`
- `concepts`: 5-8 from {congruence, superposition, correspondence, rigid motion, orientation, mirror image, SSS distance check}
- `prerequisites: ['geo-angle-sum-of-a-triangle-and-its-consequences']`
- `sources: ['geo-euclid-elements', 'ncert-math7-ch7-congruence', 'geo-ch03-web-ground']`
- quiz key PINNED: [1,3,0,2,1] — every answer index must point at the intended option, explanations say why the others fail.

## THE NOTATION LAW (binding — from the master plan)
Triangle ABC: side a = BC opposite A, b = CA opposite B, c = AB opposite C. Congruence statements name the correspondence IN ORDER: triangle ABC congruent to triangle DEF means A<->D, B<->E, C<->F (AB = DE, BC = EF, CA = FD, angle A = angle D, angle B = angle E, angle C = angle F). EVERY table, figure and engine uses this.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: two stamps, two tiles, two machine parts — when are two figures THE SAME? The superposition idea (NCERT ground, our words): one figure moved onto the other, coinciding exactly. Euclid used the same move in I.4. The word's two halves (con- + gruer, to agree) — but no folklore you cannot verify.
2. **The correspondence discipline** (the lesson's signature rigor): congruence is not "these two triangles" but "THIS vertex to THAT vertex" — the ordered statement; six facts ride one correspondence (3 side equalities + 3 angle equalities); the engine's census table structure. Figure F1: the two witness triangles with the correspondence arrows A->A', B->C', C->B'.
3. **The witness triangles and the census** (PINNED — engine recomputes): T1 = (0,0),(6,0),(0,8) — sides 6, 8, 10 (right angle at (0,0)); T2 = (0,0),(8,0),(0,6) — sides 8, 6, 10; both listed counterclockwise. The 6-permutation correspondence census: EXACTLY ONE permutation maps all three sides to equal sides (A->A, B->C, C->B) — for a scalene triangle the congruence correspondence is UNIQUE, and finding it IS the SSS distance check. That unique correspondence is realized by the REFLECTION across y = x — an orientation-REVERSING motion; no direct motion (translation/rotation) realizes it: mirror images are congruent but not by a direct move.
4. **Rigid motions preserve distance** (the machinery behind the idea): translation, rotation, reflection; the engine's witness — rotation by 90 degrees maps (6,0)->(0,6) and preserves every pairwise distance; direct vs opposite motions named (this seeds ch.5's transformation-first re-reading). Figure F3: the quarter-turn arc.
5. **What congruence is NOT** (the honest negatives, each with a PINNED witness): same perimeter does not imply congruent — (6,8,10) vs (5,9,10), both perimeter 24, sides differ; same area does not imply congruent — the 8x2 rectangle vs the 4x4 square, both area 16; same angles do not imply congruent (teaser for 3.2's AAA failure). Figure F2: the perimeter-trap strip.
6. **Worked applications** (Illustration chains, >= 3, >= 4 steps each): (a) the SSS distance check on the witness pair — compute all six distances, match the multiset, name the correspondence; (b) the mirror-pair read — which motion carries T1 onto T2, and why no rotation can; (c) a real-world congruence audit (two floor tiles specified by three measurements — congruent or not, with reasons).
7. **Exam callout** (tone 'exam'): correspondence-first answering (name the mapping BEFORE the equalities); the multiset check as the fast SSS screen; the mirror trap (congruent does not mean "reachable without flipping").
8. **Quiz** (5 MCQs, key [1,3,0,2,1], why-they-fail explanations) + **Exercises** (15, L1-L6, full Cengage step solutions; >= 3 of the solutions carry SVG figures where they genuinely aid — e.g. the coordinate grid for a distance check, the mirror line for a reflection read, the strip diagram for the perimeter trap).

## FIGURE PLAN (v9.2 amendment 10 — body figure bar)
>= 3 body figures (F1 correspondence diagram, F2 perimeter-trap strip, F3 rotation-arc witness) + >= 3 solution figures. ALL computed SVG: every coordinate derived in the engine or in the part file's own helpers; vivid palette (BOOK_FORMAT table — never blue/indigo); SVG text PLAIN (no $, minus U+2212); aria-labels; every figure referenced by the surrounding prose; captions that teach. NO AI-generated rasters in this lesson (SVG expresses all of it).

## FORMAT LAW (binding — identical contract to spec-geo203)
Cengage voice; definitions open formally ("X is said to be congruent to Y if ...") + symbolic restatement; result math in `$...$` clause-wise; no `\qquad` in `$...$`; no `$$`; SVG text PLAIN; vivid palette only; aria-labels; `terms` block (5-8); `formula` cards (the correspondence law, the SSS screen); >= 3 `example` blocks with >= 4 steps each; >= 2 `derivation` blocks; >= 6,000 words (target 9,000+); palette `const c31 = {...}` + `const f31`; helpers prefixed `geo31`; export `export const lessonGeo301: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first — the harness contract the assembler depends on)
`v-geo301.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo203.ts), then the ENGINE section (NO part import): the witness triangle side computations (T1 = [6,10,8] consecutive, T2 = [8,10,6]); the full 6-permutation correspondence census over T1/T2 (EXACTLY 1 valid: (0,2,1)); both triangles counterclockwise; the perimeter checks (24 and 24); the area checks (16 and 16); the rotation-90 distance-preservation sweep; the (6,8,10) vs (5,9,10) non-congruence; a distance-preservation brute-force over a small motion family (e.g. rotations by k*30 degrees and one reflection, all pairwise distances of T1 preserved). Then `async function runPins()` (with `mod = await import('./part-geo301')`, exemplar shape) auditing: identity fields exact; word floor >= 6,000; quiz key [1,3,0,2,1]; 15 exercises L1-L6 with full steps solutions; >= 3 body + >= 3 solution figures; terms + formula blocks; >= 3 examples with >= 4 steps; >= 2 derivations; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field, SVG text has no `$`). End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo203.ts. ENGINE wins over prose — where they disagree, fix the prose and flag the catch in your report.
