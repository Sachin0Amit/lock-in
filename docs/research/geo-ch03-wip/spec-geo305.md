# SPEC geo305 — lesson 3.5 "The Cevian Theorems: Ceva and Menelaus" (run 128, GEOMETRY ch.3)

You are authoring agent geo305 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch03-wip/v-geo305.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch03-wip/part-geo305.ts` — the lesson object, >= 6,000 words (target 9,000+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~40 minutes from now. ENGINE FIRST (`v-geo305.ts` ALL GREEN before any prose). Then `part-geo305.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo305.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH03_MASTER_PLAN.md` (arc + notation law + pins + ground register)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo203.ts` + `v-geo203.ts` (exemplars)
- `/home/z/my-project/docs/research/geo-ch03-wip/pin_check_geo128.py` (57/57 GREEN — re-derive the 3.5 witnesses in TypeScript)

## REFERENCE GROUND (v9.2 amendment 9 — author AGAINST these)
- Ceva history (geo-ch03-web-ground, fetched 2026-11-27): Giovanni Ceva published the theorem in De lineis rectis, 1678; a proof was known much earlier to Yusuf Al-Mu'taman ibn Hud, the eleventh-century king of Zaragoza, whose work fell into oblivion and was rediscovered only in 1985; the converse also holds (with the all-three-parallel caveat); a sine-form generalization exists (en.wikipedia.org/wiki/Ceva%27s_theorem; math.osu.edu/sites/math.osu.edu/files/ceva-menelaus.pdf).
- Menelaus history (geo-ch03-web-ground): the plane theorem appears as a lemma in Menelaus of Alexandria's Sphaerica (c. 100 CE); the Greek original is lost, the work survives via an Arabic translation; Ptolemy applied the theorem in the Almagest; Islamic-era scholars called it "the proposition on the secants" (shakl al-qatta') and Thabit ibn Qurra wrote a treatise on the figure of secants (en.wikipedia.org/wiki/Menelaus%27s_theorem; britannica.com Menelaus of Alexandria).
- Euclid Elements (banked ground): the area-comparison machinery Ceva's proof needs rests on congruence-era facts (equal bases, equal heights — the parallelogram-area comparisons of Book I) — cite by content, honestly.

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-the-cevian-theorems-ceva-and-menelaus'`, `number: '3.5'`, `title: 'The Cevian Theorems: Ceva and Menelaus'`
- `concepts`: 5-8 from {cevian, Ceva's theorem, Menelaus's theorem, directed ratio, concurrence, collinearity, area telescoping}
- `prerequisites: ['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles']`
- `sources: ['geo-ch03-web-ground', 'geo-euclid-elements']`
- quiz key PINNED: [1,0,2,3,1].

## THE NOTATION LAW (binding)
Triangle ABC: side a = BC opposite A, b = CA, c = AB. A cevian from a vertex meets the opposite side at a point (from A: AD with D on BC). D on BC: BD = m (adjacent to c, i.e. next to vertex B), DC = n (adjacent to b). Directed ratios use the side's OWN direction (B->C on BC, C->A on CA, A->B on AB): a point BETWEEN the endpoints gives a POSITIVE ratio, a point OUTSIDE gives a NEGATIVE one. E on CA: CE/EA; F on AB: AF/FB. Every engine, table and figure uses these.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: which three cevians meet in ONE point? The medians do (the centroid — 3.6 develops the 2:1 split), the altitudes do (orthocenter), the bisectors do (incenter) — Ceva's theorem is the census law behind EVERY such claim: three cevians are concurrent exactly when the product of the side-ratios is 1. And Menelaus is its mirror: three side-points are COLLINEAR exactly when the directed product is -1. One flips concurrence, the other collinearity; 1 vs -1.
2. **Ceva's theorem, direct form** (a full `derivation` block): for D on BC, E on CA, F on AB: AD, BE, CF concurrent IF AND ONLY IF (BD/DC)(CE/EA)(AF/FB) = 1. The proof by AREA TELESCOPING (the classical one, our own words): for an interior point O, BD/DC = area(ABD)/area(ADC) = area(OBD)/area(ODC) — equal ratios because the paired triangles share heights; subtract to get BD/DC = area(ABO)/area(ACO); cycle the three sides; multiply — everything cancels but 1. The engine verifies the telescoping NUMERICALLY on the witness.
3. **The witness, fully walked** (PINNED — engine recomputes everything): A(0,0), B(12,0), C(0,9). D on BC with BD/DC = 2 gives D(4,6) (the two-thirds point); E on CA with CE/EA = 3/2 gives E(0, 3.6); F on AB with AF/FB = 1/3 gives F(3, 0); product (2)(3/2)(1/3) = 1; the cevians AD, BE, CF are CONCURRENT at (2,3) — the engine lands all three lines on that point by direct line intersection (no floating-point drift: exact fractions 5/9 and 2/3 appear in the walk). Figure F1 is THE figure.
4. **The converse** (a shorter `derivation`): if the product is 1, the cevians are concurrent — proof: let AD meet BE at O; join CO and extend to meet AB at F'; Ceva direct gives (BD/DC)(CE/EA)(AF'/F'B) = 1, so AF'/F'B = AF/FB, hence F' = F (a ratio on a segment determines the point); done. The all-parallel caveat stated honestly (for points chosen with the product 1 the cevians are concurrent OR all three parallel — the degenerate case named, not hidden).
5. **The median check** (a `derivation` or Note): each midpoint ratio is 1, product 1 — the medians are concurrent (the centroid); on the witness triangle the centroid is (4,3) and the engine lands all three medians there. The 2:1 split itself belongs to 3.6 — cross-reference, do not develop.
6. **Menelaus's theorem** (a full `derivation` block): for D, E, F on the LINES BC, CA, AB: D, E, F collinear IF AND ONLY IF the DIRECTED product (BD/DC)(CE/EA)(AF/FB) = -1. The directed convention from the notation law carries the sign (each side's own direction; a point outside gives a negative segment ratio). Proof sketch via the same area machinery with signed areas (honestly sketched, the algebra the engine verifies on the witness). PINNED witness: the SAME triangle A(0,0), B(12,0), C(0,9); D on line BC BEYOND B with directed BD/DC = -1/2 gives D(24,-9); E(0,3) on CA with CE/EA = 2; F(6,0) on AB with AF/FB = 1; directed product (-1/2)(2)(1) = -1; the engine verifies D, E, F COLLINEAR on the line y = -x/2 + 3 (equal slopes, no drift). Figure F2 is THE figure: the transversal cutting two sides and one side's extension.
7. **The duality read** (a Note or short section): Ceva's product 1 = concurrence; Menelaus's directed product -1 = collinearity; the same ratio trio counted two ways; why one sign flips the geometry (the engine's witnesses sit side by side). This is the lesson's signature synthesis.
8. **History callout** (tone 'historical'): Ceva 1678 (De lineis rectis) — and the eleventh-century prior of ibn Hud, king of Zaragoza, rediscovered 1985; Menelaus c. 100 CE (Sphaerica, Greek lost, Arabic transmission; Ptolemy's Almagest used it; shakl al-qatta'; Thabit ibn Qurra). OUR OWN words; dates verified against the ground register.
9. **Worked applications** (>= 3 Illustrations, >= 4 steps): (a) the witness concurrency fully walked (ratios -> product -> the (2,3) landing, exact fractions); (b) the witness collinearity fully walked (directed ratios -> product -1 -> the y = -x/2 + 3 landing); (c) a converse use — given two cevians' ratios, choose the third's so the three are forced concurrent (product 1 fixes AF/FB, the point follows).
10. **Exam callout** (tone 'exam'): the product test as the concurrency/collinearity decision; directed-sign discipline (outside = negative); the median special case as the instant check.
11. **Quiz** (5 MCQs, key [1,0,2,3,1], why-they-fail) + **Exercises** (15, L1-L6, full step solutions; >= 3 solutions carry SVG figures — the concurrency picture, the transversal picture, a directed-sign strip).

## FIGURE PLAN (v9.2 amendment 10)
>= 3 body figures (F1 the Ceva concurrency witness with D,E,F and O(2,3); F2 the Menelaus transversal witness with D(24,-9) beyond B and the y = -x/2 + 3 line; F3 the area-telescoping diagram, the six sub-triangles color-coded) + >= 3 solution figures. ALL computed SVG; vivid palette; PLAIN SVG text (U+2212 minus); aria-labels; prose references every figure. NO AI rasters.

## FORMAT LAW (binding)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; no `$$`; vivid palette only; aria-labels; `terms` block; `formula` cards (Ceva product 1; Menelaus directed product -1; the median case); >= 3 `example` blocks >= 4 steps; >= 2 `derivation` blocks (Ceva direct by area telescoping; Menelaus directed); >= 6,000 words (target 9,000+); palette `const c35 = {...}` + `const f35`; helpers prefixed `geo35`; export `export const lessonGeo305: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first)
`v-geo305.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo203.ts), then the ENGINE section (NO part import): the witness triangle A(0,0), B(12,0), C(0,9); D(4,6) with BD/DC = 2 verified by distances; E(0,3.6) with CE/EA = 3/2; F(3,0) with AF/FB = 1/3; product = 1; line-intersection concurrence at (2,3) (both pairings AD-BE and AD-CF); the median check (midpoints, product 1, concurrence at the centroid (4,3)); the Menelaus witness D(24,-9) with directed BD/DC = -1/2, E(0,3) with CE/EA = 2, F(6,0) with AF/FB = 1, directed product -1, collinearity verified by slope equality AND by the y = -x/2 + 3 substitution; a directed-sign sweep (a point between -> positive ratio, beyond an endpoint -> negative, verified on parameterized points along each side line). Then `async function runPins()` (with `mod = await import('./part-geo305')`) auditing: identity fields exact; word floor >= 6,000; quiz key [1,0,2,3,1]; 15 exercises L1-L6 full steps; >= 3 body + >= 3 solution figures; terms + formula cards; >= 3 examples >= 4 steps; >= 2 derivations; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field, SVG text no `$`). End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo203.ts. ENGINE wins.
