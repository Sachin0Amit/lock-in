# SPEC geo303 — lesson 3.3 "Isosceles Triangles: the Classic Consequences" (run 128, GEOMETRY ch.3)

You are authoring agent geo303 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch03-wip/v-geo303.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch03-wip/part-geo303.ts` — the lesson object, >= 6,000 words (target 9,000+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~40 minutes from now. ENGINE FIRST (`v-geo303.ts` ALL GREEN before any prose). Then `part-geo303.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo303.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH03_MASTER_PLAN.md` (arc + notation law + pins + ground register)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo203.ts` + `v-geo203.ts` (exemplars)
- `/home/z/my-project/docs/research/geo-ch03-wip/pin_check_geo128.py` (57/57 GREEN — re-derive the 3.3 witnesses in TypeScript)

## REFERENCE GROUND (v9.2 amendment 9 — author AGAINST these)
- Euclid Elements Book I (banked ground geo-euclid-elements): I.5 (pons asinorum — base angles of an isosceles triangle equal; proved by SAS on the triangle "doubled": triangle ABC congruent to triangle ACB), I.6 (the converse — equal base angles force the equal sides; proved by contradiction with the same doubled-SAS move), and the equilateral corollary (I.5 applied to all three sides at once).
- Pons asinorum history (geo-ch03-web-ground, fetched 2026-11-27): Latin "bridge of asses"; medieval students' name for I.5, the first genuinely difficult proposition of Book I; the proposition's figure resembles a bridge (en.wikipedia.org/wiki/Pons_asinorum; mathworld.wolfram.com/PonsAsinorum.html). State the history in OUR OWN words.
- Pappus's shortcut (classical commentary tradition): the two triangles ABC and ACB are congruent by SAS without any auxiliary construction — name it honestly as the later commentator's observation.

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-isosceles-triangles-the-classic-consequences'`, `number: '3.3'`, `title: 'Isosceles Triangles: the Classic Consequences'`
- `concepts`: 5-8 from {isosceles, pons asinorum, base angles, the converse, equilateral, apex axis, altitude-median-bisector coincidence}
- `prerequisites: ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs']`
- `sources: ['geo-euclid-elements', 'geo-ch03-web-ground']`
- quiz key PINNED: [2,0,3,1,0].

## THE NOTATION LAW (binding)
Triangle ABC: side a = BC opposite A (the BASE in an isosceles reading with AB = AC the equal sides), b = CA, c = AB. Apex = the vertex where the equal sides meet; base angles = at the other two vertices. The apex axis = the line from the apex to the midpoint of the base.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: the roof truss, the compass arms, the road sign — the isosceles shape is everywhere symmetry lives. The theorem medieval students feared: I.5, pons asinorum, "bridge of asses". Why it earned the name (first genuinely hard proposition; the figure looks like a bridge) — history in our own words, Exam corner later.
2. **I.5 proved the Euclidean way** (the lesson's center; a full `derivation` block): triangle ABC with AB = AC; consider the triangle "doubled" — triangle ABC vs triangle ACB (the same triangle read with B and C swapped); AB = AC and AC = AB (given, read both ways), the shared angle at A is the INCLUDED angle in both readings (the angle between AB,AC equals the angle between AC,AB); by SAS (3.2's I.4) triangle ABC congruent to triangle ACB; hence angle ABC = angle ACB — the base angles are equal, AND the extra coincidences ride along: angle ACB = angle ABC and the bases' far angles too (Euclid's conclusion extends to the angles below the base: angle CBD = angle BCD in his figure — keep the clean modern form: base angles equal). Figure F2 is THE figure: the doubled-triangle correspondence arrows.
3. **Pappus's shortcut** (a shorter `derivation` or a Note callout): no auxiliary lines needed at all — the same SAS read on the same two namings; the observation is Pappus's (4th century), stated honestly as commentary tradition.
4. **The converse I.6** (a full `derivation` block): if the base angles are equal, the sides opposite them are equal — Euclid proves it by contradiction: suppose AB > AC; take DB = AC on AB; then triangle DBC... walk the classical argument through 3.2's SAS and 3.3's own I.5 (the proof cites I.5 — the theorem proving its own converse's tool); the engine verifies the contradiction's arithmetic on the witness triangle. Alternatively prove directly by SAS on triangle ACB vs ABC — the doubled reading again (state the direct proof and note Euclid's reductio; be honest about which you give).
5. **The equilateral corollary** (a short `derivation`): all three sides equal implies all three angles equal; the angle sum (2.4) closes each at 60 degrees. PINNED witness: equilateral side 1 — height sqrt(3)/2 approx 0.866025 (the 30-60-90 half).
6. **The apex axis package** (the lesson's structure theorem; a `derivation` + Figure F1): in triangle ABC with AB = AC, let M be the midpoint of BC; triangle ABM congruent to triangle ACM BY SSS (AM shared, AB = AC, BM = CM); therefore angle AMB = angle AMC = 90 degrees (linear pair) and angle BAM = angle CAM — ONE line is simultaneously the median, the altitude and the angle bisector. THE witness triangle PINNED: AB = AC = 13, BC = 10 — M splits the base into 5 + 5, the halves are 5-12-13, height AM = 12, area = 60; apex angle = 2 arcsin(5/13) approx 45.239730 degrees; base angles = arcsin(12/13) approx 67.380135 degrees each; cos(apex) = 119/169; the engine recomputes EVERY number.
7. **Worked applications** (>= 3 Illustrations, >= 4 steps): (a) the witness triangle fully read (height, area, all three angles, the axis package verified); (b) a base-angle walk — given the apex angle, both base angles and the equal-side ratio reasoning (honest degrees); (c) the roof-truss read — a real isosceles truss with the apex axis as the king post, lengths computed from the span and the rise.
8. **History callout** (tone 'historical'): pons asinorum — the bridge of asses; why the name stuck (first hard gate in the Elements; the figure's bridge shape; the medieval university joke), Euclid's place, Pappus's later shortcut. OUR OWN words throughout.
9. **Exam callout** (tone 'exam'): the isosceles shortcut list (base angles equal; converse; axis package = median = altitude = bisector in one); citing I.5/I.6 by content; the equilateral-60 reflex.
10. **Quiz** (5 MCQs, key [2,0,3,1,0], why-they-fail) + **Exercises** (15, L1-L6, full step solutions; >= 3 solutions carry SVG figures — the axis-package halves, a base-angle walk, the equilateral half).

## FIGURE PLAN (v9.2 amendment 10)
>= 3 body figures (F1 the witness triangle with the apex axis and the 5-12-13 halves; F2 the doubled-triangle proof diagram with correspondence arrows; F3 the equilateral half-figure with sqrt(3)/2) + >= 3 solution figures. ALL computed SVG; vivid palette; PLAIN SVG text (U+2212 minus); aria-labels; prose references every figure. NO AI rasters.

## FORMAT LAW (binding)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; no `$$`; vivid palette only; aria-labels; `terms` block; `formula` cards (base angles equal; the axis package; equilateral 60; height = sqrt(3)/2 * side); >= 3 `example` blocks >= 4 steps; >= 2 `derivation` blocks (I.5's doubled SAS; the axis package); >= 6,000 words (target 9,000+); palette `const c33 = {...}` + `const f33`; helpers prefixed `geo33`; export `export const lessonGeo303: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first)
`v-geo303.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo203.ts), then the ENGINE section (NO part import): the witness triangle recomputed whole (halves 5-12-13; height 12; area 60; apex 45.239730 = 2 arcsin(5/13); base angles 67.380135 = arcsin(12/13); cos(apex) = 119/169; angle sum 180); the equilateral half (height sqrt(3)/2, angles 60); the SSS axis-package congruence verified numerically (ABM vs ACM distances equal pairwise); a general isosceles sweep — for apex half-angle t in {10, 22.62, 30, 40} degrees verify base angle = 90 - t and height/leg = cos(t) (the identity the lesson teaches). Then `async function runPins()` (with `mod = await import('./part-geo303')`) auditing: identity fields exact; word floor >= 6,000; quiz key [2,0,3,1,0]; 15 exercises L1-L6 full steps; >= 3 body + >= 3 solution figures; terms + formula cards; >= 3 examples >= 4 steps; >= 2 derivations; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field, SVG text no `$`). End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo203.ts. ENGINE wins.
