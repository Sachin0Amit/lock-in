# SPEC geo104 — lesson 1.4 "Incidence: how Points, Lines and Planes Interlock" (run 124, GEOMETRY ch.1)

You are authoring agent geo104 for the LockIn Library. Your ONLY deliverables:
1. `temporary-references/v-geo104.ts` — the verify-first ENGINE + PIN harness, ALL GREEN
2. `temporary-references/part-geo104.ts` — the lesson object, ≥6,000 words
Report (final message): file paths, engine score X/X GREEN, word count, quiz key, figure counts.

## READ FIRST (in this order)
- `/home/z/my-project/docs/project/BOOK_FORMAT.md`
- `/home/z/my-project/src/data/library/types.ts`
- `/home/z/my-project/docs/research/GEO_CH01_MASTER_PLAN.md` — the verified ground (Hilbert incidence axioms, Fano census, de Bruijn–Erdős attribution, the four-point plane census)
- `/home/z/my-project/docs/research/aa-ch10-wip/part-aa101.ts.txt` + `v-aa101.ts.txt` (exemplars)
- `/home/z/my-project/temporary-references/pin_check_geo124.py` (pre-flight pins GREEN — reuse its computed structures)

## LESSON OBJECT (pinned)
- `id: 'geo-incidence-how-points-lines-and-planes-interlock'`, `number: '1.4'`, `title: 'Incidence: how Points, Lines and Planes Interlock'`
- `concepts`: 5–8 (incidence axiom, existence and uniqueness, general position, model, Fano plane, affine plane, parallel classes)
- `prerequisites: ['geo-the-undefined-words-and-the-defined-ones', 'geo-euclids-five-postulates-the-rules-of-the-game', 'geo-axioms-theorems-and-the-shape-of-a-proof']`
- `sources: ['geo-hilbert-grundlagen', 'geo-fano-plane', 'geo-dbe-1948']`

## CONTENT OUTLINE
1. **Opening motivation**: the thinnest axioms — the ones that only say "lies on" — already force geometry to DO things. The reader expects the deep rules to be about distance and angle; the surprise: incidence alone counts lines.
2. **Hilbert's planar incidence axioms, our words** (from the verified listing; study-never-reproduce): I.1 — through any two distinct points there is exactly one line (existence AND uniqueness in one breath; Hilbert's I.1 merges the two clauses); I.2 — every line contains at least two points; I.3 — three non-collinear points exist. Note the full incidence GROUP has 8 axioms (I.1–I.8), of which five are essentially spatial (I.4–I.8: three non-collinear points determine a plane, every plane has three non-collinear points, two plane-points put the line in the plane, planes meeting share a second point, four non-coplanar points exist) — the full rulebook is ch.11's lesson; deleting those five + rewording two others yields plane geometry exactly.
3. **The first theorems** (each a `derivation`):
   - T1 (uniqueness read): two distinct points lie on exactly one line — the two halves (existence, uniqueness) separated and each argued from I.1.
   - T2 (by contradiction, 1.3's shape in action): two distinct lines meet in at most one point — suppose two distinct common points; I.1's uniqueness forces the two lines to be the same line; contradiction.
   - T3 (the counting theorem): n points in general position (no three collinear) determine $\binom{n}{2} = \frac{n(n-1)}{2}$ lines — proved by counting pairs (each pair a line, each line a pair). Census table pinned: n=3→3, 4→6, 5→10, 6→15, 7→21, 8→28, 9→36, 10→45.
   - T4 (the boundary cases): all n collinear → 1 line; n−1 collinear + 1 off → exactly n lines; the pencil of n lines through one common point. The named result: de Bruijn–Erdős (1948) — every n points NOT all collinear determine at least n lines; the boundary case shows n is attained (attribution honest: N. G. de Bruijn & P. Erdős, Indagationes Mathematicae 10, 1948).
4. **Models you can hold** (the 1.3 machinery doing real work):
   - The four-point affine plane: points A,B,C,D; six lines AB,AC,AD,BC,BD,CD; census: 2 points per line, 3 lines through each point, 3 parallel classes {AB,CD},{AC,BD},{AD,BC} — every number brute-forced (the pin checker's structure, re-verified in your engine).
   - The Fano plane (Gino Fano, 1892): 7 points, 7 lines, 3 points on every line, 3 lines through every point, every two points on exactly one line, every two lines meeting in exactly one point — total incidences 21. Our own 7-line listing (the triples {0,1,2},{0,3,4},{0,5,6},{1,3,5},{1,4,6},{2,3,6},{2,4,5} relabelled geometrically, e.g. points named A..G with lines as triples) — the model where PARALLEL lines do not exist: incidence alone does not give parallels; that is WHY the parallel postulate is a separate assumption (the chapter's closing thought).
   - The non-models (what failing looks like): a configuration where two points lie on two different lines (I.1 uniqueness fails); a "line" with exactly one point (I.2 fails) — drawn and explained.
5. **A table**: the model census — four-point plane vs Fano plane vs the Euclidean plane (points/lines/points-per-line/lines-through-point/parallel-pairs yes-no).
6. **Exam callout**: line-counting in figures (given a diagram, count the lines), the at-most-one-point lemma, and model-verification items are the assessment shapes.
7. **Illustrations** (Cengage chain): (a) count the lines in a drawn configuration (6 points, no three collinear → 15) and recount when three are made collinear (→ 11: lose the 3 pair-lines among the triple, keep the 1 collinear line = 15−3+1−? — ENGINE COMPUTES THE EXACT NUMBER; fix prose to engine); (b) exam-shaped: verify the Fano census from the seven-line listing (count 3/3, pair-incidence, line-pair meets); (c) the four-point plane's parallel classes named from the drawing.
8. **Figures** (≥3 body, computed, true-to-scale): (F1) the four-point plane — a drawn quadrilateral with its two diagonals as the six lines, parallel classes colour-coded; (F2) the Fano plane — the classic seven-point drawing (six segments + one circle) computed from exact coordinates, points labelled, lines named; (F3) the C(n,2) growth picture or the general-position vs collinear contrast pair. Solution figures ≥2 (e.g. the recount configuration with the removed lines struck through; the Fano verification checklist).
9. **Quiz** (5, why-they-fail explains) + **Exercises** (15, L1–L6, full steps solutions): every printed count engine-verified (C(n,2) values, the collinear-recount, the Fano census, the affine-plane census, the boundary cases, T2's contradiction skeleton).
10. **Close the chapter honestly**: one closing para — four lessons, one arc: undefined words → postulates → proof shapes → the first counted consequences; the chapter's rules now POWER ch.2 (angles, parallels, the transversal census).

## FORMAT LAW (binding — identical to spec-geo101.md)
Cengage voice; result math in `$...$` clause-wise; no `\qquad` in `$...$`; SVG text PLAIN (U+2212 minus); vivid palette only; aria-labels; quiz/exercise indices at intended options; `terms` block; `formula` cards ($\binom{n}{2} = \frac{n(n-1)}{2}$; the at-most-one-point statement); ≥2 example blocks (second exam-shaped); ≥6,000 words; `const C`/`const FONT`, helpers prefixed `geo14`, `export const lessonGeo104: Lesson`.

## ENGINE LAW (verify-first — identical to spec-geo101)
`temporary-references/v-geo104.ts`: ENGINE section (no repo imports): C(n,2) sweep n=3..10; the four-point affine plane rebuilt (6 lines; through-count 3; parallel classes; pair-uniqueness); the Fano plane rebuilt (7 triples; 3/3 census; pair-incidence; line-pair meets; total 21); the collinear-recount witness (compute the EXACT line count for the drawn configuration you will print — 6 points with exactly one collinear triple → engine gives the number, prose cites it); boundary cases; the non-model checks; de Bruijn–Erdős year pin; quiz-key self-check; exercise witnesses. Engine ALL GREEN → prose → PIN section importing `./part-geo104` auditing (words ≥6000, quiz key, 15 exercises with steps solutions, ≥3 body + ≥2 solution figures, terms, no-\qquad-in-math, no-$-in-SVG, id/number/title/sources exact). ALL GREEN. Engine wins; fix prose to engine values.
