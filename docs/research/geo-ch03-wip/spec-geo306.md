# SPEC geo306 — lesson 3.6 "Stewart's Theorem and the Median Relation" (run 128, GEOMETRY ch.3)

You are authoring agent geo306 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch03-wip/v-geo306.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch03-wip/part-geo306.ts` — the lesson object, >= 6,000 words (target 9,000+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~40 minutes from now. ENGINE FIRST (`v-geo306.ts` ALL GREEN before any prose). Then `part-geo306.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo306.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH03_MASTER_PLAN.md` (arc + notation law + pins + ground register)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo203.ts` + `v-geo203.ts` (exemplars)
- `/home/z/my-project/docs/research/geo-ch03-wip/pin_check_geo128.py` (57/57 GREEN — re-derive the 3.6 witnesses in TypeScript)

## REFERENCE GROUND (v9.2 amendment 9 — author AGAINST these)
- Stewart history (geo-ch03-web-ground, fetched 2026-11-27): named for the Scottish mathematician Matthew Stewart, who published it in 1746 in "Some General Theorems of Considerable Use in the Higher Parts of Mathematics" (while a candidate to succeed Colin Maclaurin at Edinburgh); per Hutton & Gregory (1843) the result is used by Simson in 1748 and by Simpson in 1752; Coxeter & Greitzer (1967) note it was probably known to Archimedes around 300 BCE. The median special case is Apollonius's theorem. State ALL of this in OUR OWN words; the register explicitly warns NO Simpson-1740 claim is supported — use 1746/Archimedes honestly.
- Cengage M1-05 vision extract (docs/research/geo-ch03-wip/cengage-m105-extract.txt): the trig-side companions (cosine rule use in cevian-length contexts; practice-question ARCHETYPES — patterns only, never copy).

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-stewarts-theorem-and-the-median-relation'`, `number: '3.6'`, `title: "Stewart's Theorem and the Median Relation"`
- `concepts`: 5-8 from {Stewart's theorem, cevian length, Apollonius's theorem, median relation, centroid 2:1, angle-bisector length, the three-cevian comparison}
- `prerequisites: ['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles']`
- `sources: ['geo-ch03-web-ground', 'cengage-m1-05']`
- quiz key PINNED: [0,3,1,2,0].

## THE NOTATION LAW (binding)
Triangle ABC: side a = BC opposite A, b = CA opposite B, c = AB opposite C. Cevian from A meets BC at D: BD = m (adjacent to c), DC = n (adjacent to b), a = m + n, cevian length AD = d. The median case: m = n = a/2. The angle-bisector case: m/n = c/b. Every engine, table and figure uses this.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: 3.5 asked WHERE cevians meet; this lesson asks HOW LONG a cevian is — the length question every draftsperson and structural engineer actually needs (the king post, the brace, the strut). One theorem answers for EVERY cevian at once.
2. **Stewart's theorem** (the center; a full `derivation` block): for a cevian AD with BD = m, DC = n, a = m + n: b^2 * m + c^2 * n = a(d^2 + m n). Proof sketch OUR OWN words: drop the foot of the perpendicular from A to BC (call its offsets from D x on one side or the other), apply the Pythagorean relation in the two right triangles ABD and ACD (c^2 = (m -+ x)^2 + h^2, b^2 = (n -+ x)^2 + h^2 — the sign cases handled honestly: the foot may fall on either side of D, including ON it); subtract and eliminate x^2 + h^2 to land the theorem. The engine verifies the algebra on the witness BOTH sign cases (foot between B and D; foot between D and C).
3. **The witness triangle, fully walked** (PINNED — engine recomputes everything): the 13-14-15 triangle with a = BC = 14, b = CA = 13, c = AB = 15; placed at B(0,0), C(14,0), A(9,12) (x = (c^2 + a^2 - b^2)/(2a) = 9, height 12); area 84 (Heron: s = 21, sqrt(21*8*7*6) = sqrt(7056) = 84). Median from A: d^2 = (2b^2 + 2c^2 - a^2)/4 = (338 + 450 - 196)/4 = 148, d = 2 sqrt(37) approx 12.165525. Angle bisector from A: m/n = c/b = 15/13 gives m = 7.5, n = 6.5; d^2 = b c (1 - a^2/(b + c)^2) = 195 * (1 - 196/784) = 146.25, d approx 12.093387; STEWART CHECK: b^2 m + c^2 n = 169*7.5 + 225*6.5 = 2730 and a(d^2 + m n) = 14(146.25 + 48.75) = 14*195 = 2730 — equal to the digit. Figure F1 is THE figure (a, m, n, d, b, c all labelled on the witness).
4. **Apollonius's theorem** (the median case; a `derivation` block): m = n = a/2 turns Stewart into d^2 = (2b^2 + 2c^2 - a^2)/4 — named for Apollonius of Perga, older than Stewart by eighteen centuries. On the witness: 148 = (2*169 + 2*225 - 196)/4. The median-sum identity PINNED: m_a^2 = 148, m_b^2 = 673/4 = 168.25, m_c^2 = 505/4 = 126.25, sum = 442.5 = (3/4)(a^2 + b^2 + c^2) = (3/4)(590) — the engine verifies both readings (a lovely all-three-medians census).
5. **The centroid 2:1** (a `derivation` block): the medians are concurrent (3.5's Ceva on unit ratios) and the centroid divides EACH in the ratio 2:1 from the vertex — proof sketch by the midpoint theorem's parallelogram argument or by coordinates (honest, one route only, cleanly done); on the witness the centroid is (23/3, 4) and AG = (2/3)*median = (4 sqrt(37))/3 approx 8.110350; the engine verifies by direct distance. Figure F3: the 2:1 picture.
6. **The angle-bisector length** (a `derivation` block): m/n = c/b (the bisector's defining ratio, which 3.3's angle-bisector construction and the SAS symmetry force — state it as the known ratio, derive d^2 = b c (1 - a^2/(b + c)^2) FROM Stewart by substituting m = a c/(b + c), n = a b/(b + c); the engine verifies the substitution algebra and the witness numbers 146.25 and 12.093387).
7. **The three-cevian comparison** (the lesson's signature census; a table + Figure F2): from the SAME vertex A of the witness triangle — the altitude drops 12 (the perpendicular to BC, the shortest possible, the distance to the LINE), the bisector is sqrt(146.25) approx 12.093387, the median is 2 sqrt(37) approx 12.165525: altitude < bisector < median on this witness, each number engine-verified; the prose explains WHY the order is forced generally (the altitude minimizes distance to the line; the median leans toward the longer side... — argue carefully and honestly, mark as verified ON THE WITNESS, and note the general order altitude <= bisector <= median holds with equality cases named: equilateral, all three coincide).
8. **History callout** (tone 'historical'): Stewart 1746 (the Maclaurin succession context), the probable Archimedes priority, Simson 1748 / Simpson 1752 usage (Hutton & Gregory 1843), Apollonius's median case eighteen centuries earlier. OUR OWN words.
9. **Exam callout** (tone 'exam'): the Stewart substitution reflex (m, n from the ratio, then one equation); Apollonius as the instant median formula; the 2:1 split; the bisector length formula; "altitude <= bisector <= median" as the quick ordering answer.
10. **Quiz** (5 MCQs, key [0,3,1,2,0], why-they-fail) + **Exercises** (15, L1-L6, full step solutions; >= 3 solutions carry SVG figures — the Stewart anatomy, the 2:1 centroid, the three-cevian comparison).

## FIGURE PLAN (v9.2 amendment 10)
>= 3 body figures (F1 the Stewart anatomy on the 13-14-15 witness — a=m+n split, d, b, c labelled; F2 the three-cevian comparison from A with the three lengths marked; F3 the centroid 2:1 figure) + >= 3 solution figures. ALL computed SVG; vivid palette; PLAIN SVG text (U+2212 minus); aria-labels; prose references every figure. NO AI rasters.

## FORMAT LAW (binding)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; no `$$`; vivid palette only; aria-labels; `terms` block; `formula` cards (Stewart; Apollonius; bisector length; centroid 2:1; the median-sum identity); >= 3 `example` blocks >= 4 steps; >= 2 `derivation` blocks (Stewart's proof; the bisector derivation from Stewart); >= 6,000 words (target 9,000+); palette `const c36 = {...}` + `const f36`; helpers prefixed `geo36`; export `export const lessonGeo306: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first)
`v-geo306.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo203.ts), then the ENGINE section (NO part import): the witness placement (B(0,0), C(14,0), A(9,12); AB = 15, AC = 13; area 84; Heron cross-check); Stewart verified on the witness for the median (b^2*7 + c^2*7 = 14*(148 + 49) — check BOTH sides), for the bisector (2730 = 2730 with m = 7.5, n = 6.5), and for one MORE cevian of your own pinned choice (e.g. m = 4, n = 10: compute d^2 from Stewart and verify against the coordinate distance — the engine does both); Apollonius (148 = (2b^2 + 2c^2 - a^2)/4); the median-sum identity (148 + 168.25 + 126.25 = 442.5 = (3/4)(590)); the centroid (23/3, 4) with AG = (4 sqrt(37))/3 approx 8.110350; the bisector length sqrt(146.25) approx 12.093387; the comparison order altitude 12 < bisector 12.093387 < median 12.165525 on the witness. Then `async function runPins()` (with `mod = await import('./part-geo306')`) auditing: identity fields exact; word floor >= 6,000; quiz key [0,3,1,2,0]; 15 exercises L1-L6 full steps; >= 3 body + >= 3 solution figures; terms + formula cards; >= 3 examples >= 4 steps; >= 2 derivations; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field, SVG text no `$`). End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo203.ts. ENGINE wins.
