# SPEC geo302 — lesson 3.2 "The Congruence Criteria: SAS, ASA, AAS, SSS, RHS" (run 128, GEOMETRY ch.3)

You are authoring agent geo302 for the LockIn Library. Your ONLY deliverables:
1. `docs/research/geo-ch03-wip/v-geo302.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `docs/research/geo-ch03-wip/part-geo302.ts` — the lesson object, >= 6,000 words (target 9,000+)

Report (final message): file paths, engine score X/X GREEN, word count, quiz key (5 indices), figure counts (body + solution).

## WORKING DISCIPLINE (v9.1 staged law — BINDING)
- Hard working window: ~40 minutes from now. ENGINE FIRST (`v-geo302.ts` ALL GREEN before any prose). Then `part-geo302.ts` SECTION BY SECTION (skeleton first, append as you draft); SAVE OFTEN. If time runs short, leave the partial file on disk.
- Run command: `cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo302.ts`

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH03_MASTER_PLAN.md` (arc + notation law + pins + ground register)
- `/home/z/my-project/docs/research/geo-ch02-wip/part-geo203.ts` + `v-geo203.ts` (exemplars — harness contract, palette/helper conventions)
- `/home/z/my-project/docs/research/geo-ch03-wip/pin_check_geo128.py` (57/57 GREEN — re-derive the 3.2 witnesses in TypeScript)

## REFERENCE GROUND (v9.2 amendment 9 — author AGAINST these)
- Euclid Elements Book I: SAS is I.4 (proved by superposition), ASA/AAS live in I.26, SSS is I.8 (proved via I.7) — banked ground geo-euclid-elements; state each proposition in OUR OWN words.
- NCERT Class 7 ch.7 (temporary-references/geo-ch03/ncert7-ch7-congruence.pdf): the school canon's SAS/ASA/RHS naming — RHS is NCERT's name for the right-angle-hypotenuse-side case; re-state in our own words.
- Cengage M1-05 vision extract (docs/research/geo-ch03-wip/cengage-m105-extract.txt): practice-question ARCHETYPES for the exercise set (pattern only, never copy).

## LESSON OBJECT (pinned — verbatim)
- `id: 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'`, `number: '3.2'`, `title: 'The Congruence Criteria: SAS, ASA, AAS, SSS, RHS'`
- `concepts`: 5-8 from {SAS, ASA, AAS, SSS, RHS, included angle, the SSA failure, the AAA failure}
- `prerequisites: ['geo-congruence-the-idea-of-same-shape-and-size']`
- `sources: ['geo-euclid-elements', 'ncert-math7-ch7-congruence', 'cengage-m1-05', 'geo-ch03-web-ground']`
- quiz key PINNED: [0,2,1,3,2].

## THE NOTATION LAW (binding)
Triangle ABC: side a = BC opposite A, b = CA opposite B, c = AB opposite C. "Included angle" between sides p and q of a triangle is the angle the two sides span at their common vertex. SAS's angle is INCLUDED; SSA's angle is NOT (it is opposite one of the named sides) — this naming distinction IS the lesson's central trap.

## CONTENT OUTLINE (pinned)
1. **Opening motivation**: 3.1 gave congruence the idea; checking all six facts (3 sides + 3 angles) to prove one congruence is wasteful — the criteria are the MINIMAL checkpoints. Why five letters? Because five combinations actually work and two seductive ones (AAA, SSA) DO NOT — the lesson proves both failures with witnesses.
2. **The five criteria, each stated formally + why it works** (each a `definition`/`theorem` callout + a short `derivation` or proof sketch): SAS (Euclid I.4 — superposition: lay the included angle on the included angle, the third sides must coincide); ASA and AAS (Euclid I.26 — the third angle is forced by the angle sum (2.4's theorem), so ASA and AAS carry the same information; state BOTH and note they are one criterion worn twice); SSS (Euclid I.8, resting on I.7 — the two-triangle squeeze; sketch honestly, credit the I.7 lemma); RHS (the right-angle case: right angle + hypotenuse + one leg forces the other leg by Pythagoras — PROVED here via the Pythagoras the reader already owns, or honestly deferred: the leg is determined by sqrt(hypotenuse^2 - leg^2), a unique length). PINNED witnesses for each: SAS (6-8-10 built two ways); ASA (the angle-sum closes the triangle); RHS (5-12-13 vs 5-12-13 — and 5-12-13 vs 5-12-c NOT congruent for c != 13).
3. **The two failures — the lesson's heart** (PINNED witnesses, engine recomputes): AAA is NOT a criterion — equilateral side 1 vs equilateral side 2: same three angles, different sizes; congruence fails, SIMILARITY is the right word (ch.4's doorstep, name it and defer). SSA is NOT a criterion — the ambiguous-case witness: angle A = 30 degrees, b = CA = 7, a = BC = 10; h = b sin A = 3.5; the foot offset from C = b cos A = 6.062178 (7 sqrt(3)/2); TWO distinct triangles satisfy the same SSA data, with third sides c1 = sqrt(149 - 70 sqrt(3)) approx 5.268438 and c2 = sqrt(149 + 70 sqrt 3) approx 16.439086; the ambiguity lives exactly when b sin A < b < a (3.5 < 7 < 10). Figure F1 is THE figure: both A positions on the same base BC, c1 and c2 marked. State the honest condition without overreach (the engine verifies the witness; the prose names the general condition as a remark).
4. **The included-angle discipline** (the naming trap): SAS with the angle between the sides vs SSA with the angle opposite — Figure F3 side by side; a worked Illustration that REPAIRS an SSA read into a genuine SAS read (find the included angle by the angle sum first, then conclude by SAS).
5. **The criteria map** (table + Figure F2): five green paths from checkpoints to congruence; the two red paths (AAA, SSA) with their failure witnesses; which Euclid proposition backs each green path (I.4, I.26, I.8, RHS-as-Pythagoras).
6. **Worked applications** (>= 3 Illustrations, >= 4 steps): (a) a two-triangle proof written correspondence-first (map named, criterion cited, conclusion licensed); (b) the SSA ambiguous case fully walked (both triangles constructed, both third sides computed against the engine's exact forms); (c) the ASA/AAS identity read (a data set stated as AAS, re-derived as ASA via the angle sum, one conclusion).
7. **Exam callout** (tone 'exam'): cite the criterion BY NAME after the map is named; never write "by congruency" without naming the path; the SSA distractor option in MCQs; the RHS shortcut on right triangles.
8. **Quiz** (5 MCQs, key [0,2,1,3,2], why-they-fail) + **Exercises** (15, L1-L6, full step solutions; >= 3 solutions carry SVG figures — the SSA construction, the included-angle repair, an RHS pair).

## FIGURE PLAN (v9.2 amendment 10)
>= 3 body figures (F1 the SSA two-triangle construction with c1/c2; F2 the criteria map, five green + two red; F3 the included-vs-opposite angle diagram) + >= 3 solution figures. ALL computed SVG; vivid palette; PLAIN SVG text (U+2212 minus); aria-labels; prose references every figure. NO AI rasters.

## FORMAT LAW (binding)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; no `$$`; vivid palette only; aria-labels; `terms` block; `formula` cards (the five criteria rows); >= 3 `example` blocks with >= 4 steps; >= 2 `derivation` blocks; >= 6,000 words (target 9,000+); palette `const c32 = {...}` + `const f32`; helpers prefixed `geo32`; export `export const lessonGeo302: Lesson`; import line EXACT: `import type { Lesson } from '../../../src/data/library/types'`.

## ENGINE LAW (verify-first)
`v-geo302.ts` starts with EXACTLY:
```
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'
```
then `export {}`, `Chk` + collectors + helpers (copy v-geo203.ts), then the ENGINE section (NO part import): the SSA witness recomputed BOTH ways (trig and coordinate: h = 3.5; offset = 6.062178; c1 = sqrt(149 - 70 sqrt(3)) = 5.268438; c2 = sqrt(149 + 70 sqrt(3)) = 16.439086; c1 != c2; condition 3.5 < 7 < 10); the AAA witness (equilateral side 1 vs 2, angles equal, sides not); the RHS Pythagoras closure (sqrt(13^2 - 5^2) = 12 unique); the 6-8-10 SAS two-build witness; the angle-sum ASA closure (30 + 60 + 90 = 180). Then `async function runPins()` (with `mod = await import('./part-geo302')`) auditing: identity fields exact; word floor >= 6,000; quiz key [0,2,1,3,2]; 15 exercises L1-L6 with full steps; >= 3 body + >= 3 solution figures; terms + formula cards; >= 3 examples >= 4 steps; >= 2 derivations; hygiene scans (no `\qquad`, no `$$`, no raw TeX outside math, headings plain, no `words` field, SVG text no `$`). End with EXACTLY:
```
/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
```
plus the report/exit harness copied from v-geo203.ts. ENGINE wins.
