# SPEC geo304 — lesson 3.4 "Inequalities in a Triangle: Sides and Angles" (run 128, GEOMETRY ch.3)

You are authoring agent geo304 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch03-wip/v-geo304.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch03-wip/part-geo304.ts` — the lesson object, >= 6,000 words (target 9,000+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~40 minutes from now. ENGINE FIRST (`v-geo304.ts` ALL GREEN before any prose). Then `part-geo304.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo304.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH03_MASTER_PLAN.md` (arc + notation law + pins + ground register)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo203.ts` + `v-geo203.ts` (exemplars)
- `/home/z/my-project/docs/research/geo-ch03-wip/pin_check_geo128.py` (57/57 GREEN — re-derive the 3.4 witnesses in TypeScript)

## REFERENCE GROUND (v9.2 amendment 9 — author AGAINST these)
- Euclid Elements Book I (banked ground geo-euclid-elements): I.20 (the triangle inequality — "in any triangle two sides taken together in any manner are greater than the remaining one"; proved by extending the base and an isosceles detour), I.18 (the greater side subtends the greater angle), I.19 (the greater angle is subtended by the greater side — by contradiction), I.16 (the exterior angle exceeds each remote interior angle — proved FIFTH-FREE, no parallel postulate; ch.2 banked this fact's direction).
- Cengage M1-05 vision extract (docs/research/geo-ch03-wip/cengage-m105-extract.txt): side/angle inequality archetypes (a>b iff sin A>sin B is the trig-side companion — name the connection honestly as the ch.6-of-Trigonometry bridge, prove nothing you cannot verify synthetically) and practice-question ARCHETYPES for the exercise set (patterns only, never copy).

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-inequalities-in-a-triangle-sides-and-angles'`, `number: '3.4'`, `title: 'Inequalities in a Triangle: Sides and Angles'`
- `concepts`: 5-8 from {triangle inequality, degenerate triangle, exterior angle inequality, larger side larger angle, larger angle larger side, hinge theorem, converse of hinge}
- `prerequisites: ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-isosceles-triangles-the-classic-consequences']`
- `sources: ['geo-euclid-elements', 'cengage-m1-05', 'geo-ch03-web-ground']`
- quiz key PINNED: [3,1,2,0,3].

## THE NOTATION LAW (binding)
Triangle ABC: side a = BC opposite A, b = CA opposite B, c = AB opposite C. Exterior angle at a vertex = the supplement of the interior angle there; the REMOTE interior angles are the two at the other vertices.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: 3.2 and 3.3 were equality theorems; real triangles keep INEQUALITIES honest — which triples of lengths close into a triangle at all, which side is longest, which angle is largest. The inequality side of the theory is where wrong designs collapse (the bridge strut that cannot close, the fence that cannot reach).
2. **The triangle inequality I.20 — the existence law** (a full `derivation` block): statement in our own words (two sides together greater than the third, every choice of the pair); Euclid's proof sketch: extend BC beyond C to D with CD = CA; triangle ACD isosceles (3.3's I.5) gives angle ADC = angle CAD; angle ADC is exterior... walk the classical chain honestly through I.19 on triangle ABD (angle ADB < angle BAD since angle BAD > angle ADC = angle ADB), then I.19 turns the angle order into BD > BA, and BD = BC + CD = BC + CA — done. The engine verifies the witness coordinates for the chain. PINNED census: of the triples 1 <= a <= b <= c <= 10, EXACTLY 125 satisfy a + b > c — the existence census, brute-forced by the engine (of 220 candidate triples, 95 fail). The STRICT inequality: equality collapses the triangle FLAT (the degenerate case — three collinear points); Figure F1 shows the collapse.
3. **The exterior angle inequality I.16** (a `derivation` or Note + Figure F3): the exterior angle exceeds EACH remote interior angle — and (ch.2's honest note) it is proved FIFTH-FREE, before any parallel postulate work; on the witness below, exterior at C = 60 = angle A + angle B exactly, and 60 > 21.786789 and 60 > 38.213211 (the equality-with-the-SUM vs strict-inequality-with-EACH distinction is exam gold).
4. **The ordering theorems I.18 and I.19** (two `derivation` blocks or one tall one): greater side subtends greater angle (I.18, proved from I.16 via an isosceles detour — the classical walk sketched) and its converse, greater angle subtended by greater side (I.19, by contradiction: suppose the shorter side were opposite the greater angle, I.18 would force an impossible chain). Each theorem's proof uses the OTHER'S statement's toolset — say so honestly (they interlock, not nest).
5. **The witness triangle, fully read** (PINNED — engine recomputes): sides 3-5-7 (a=3, b=5, c=7): angle A = arccos(13/14) approx 21.786789 degrees, angle B = arccos(11/14) approx 38.213211 degrees, angle C = arccos(-1/2) = 120 degrees; angle A + angle B = 60 EXACTLY (= the exterior angle at C); the ordering a < b < c matches angle A < angle B < angle C — the ordering law in one witness; the triangle inequality holds strictly (3+5 > 7).
6. **The hinge theorem and its converse** (SAS-inequality + SSS-inequality; a `derivation` + Figure F2): two triangles with two sides pairwise equal — the one with the larger included angle has the longer third side, and conversely. PINNED swing witness: equal sides 5 and 5 from a vertex; included angle 40 degrees gives third side 10 sin(20 degrees) approx 3.420201; included angle 60 degrees gives 10 sin(30 degrees) = 5; the engine verifies both and the monotone growth. The compass-arms picture (Figure F2): the wider the opening, the farther the tips.
7. **Worked applications** (>= 3 Illustrations, >= 4 steps): (a) the existence screen — three claimed length triples, each accepted or refused with the inequality checked (one of them degenerate-by-equality, refused); (b) the shortest-path read — the detour through a point vs the straight segment (the inequality as the straight line's charter); (c) the 3-5-7 witness fully ordered (angles computed against the engine's exact values, exterior read, ordering stated both ways).
8. **Exam callout** (tone 'exam'): the inequality as an instant eliminator in MCQs (two sides given, third must lie strictly between their difference and their sum — e.g. third side of a 4-9 triangle: 5 < x < 13); "exterior > each remote, not the sum"; citing I.16/I.18/I.19/I.20 by content.
9. **Quiz** (5 MCQs, key [3,1,2,0,3], why-they-fail) + **Exercises** (15, L1-L6, full step solutions; >= 3 solutions carry SVG figures — the collapse figure, the hinge swing, the detour path).

## FIGURE PLAN (v9.2 amendment 10)
>= 3 body figures (F1 the degenerate collapse strip; F2 the hinge/compass-arms swing with both third sides marked; F3 the exterior-angle figure on the witness) + >= 3 solution figures. ALL computed SVG; vivid palette; PLAIN SVG text (U+2212 minus); aria-labels; prose references every figure. NO AI rasters.

## FORMAT LAW (binding)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; no `$$`; vivid palette only; aria-labels; `terms` block; `formula` cards (the inequality bound |b-c| < a < b+c; exterior > each remote; the hinge pair); >= 3 `example` blocks >= 4 steps; >= 2 `derivation` blocks (I.20's chain; the hinge); >= 6,000 words (target 9,000+); palette `const c34 = {...}` + `const f34`; helpers prefixed `geo34`; export `export const lessonGeo304: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first)
`v-geo304.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo203.ts), then the ENGINE section (NO part import): the census brute-force (125 of the ordered triples 1..10; 220 candidates total); the witness angles (21.786789, 38.213211, 120; A+B = 60 exact; sum 180; the strict inequality 3+5 > 7 and the bound 2 < 7 < 8); the exterior comparisons (60 > each remote); the hinge witness (3.420201 vs 5, monotone in the included angle — sweep 20,30,40,50,60 degrees and verify growth); the degenerate case (3+5 = 8 collinear). Then `async function runPins()` (with `mod = await import('./part-geo304')`) auditing: identity fields exact; word floor >= 6,000; quiz key [3,1,2,0,3]; 15 exercises L1-L6 full steps; >= 3 body + >= 3 solution figures; terms + formula cards; >= 3 examples >= 4 steps; >= 2 derivations; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field, SVG text no `$`). End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo203.ts. ENGINE wins.
