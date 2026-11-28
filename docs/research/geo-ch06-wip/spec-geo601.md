# SPEC geo601 — 'Parallelograms and Their Family Tree' (GEOMETRY 6.1, RUN 132; RE-BANKED — PROVEN, it landed 99/99 before the run-132 artifact destruction; re-execute exactly)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch05-wip/part-geo501.ts` — the exemplar part: palette block, namespaced SVG helpers, figure usage, section/exercise/quiz shape, the `/* -- APPEND TAIL -- */` marker at the end. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law); `countLessonWords` exported here.
3. `docs/research/geo-ch05-wip/v-geo501.ts` — the exemplar engine+pin harness (staged-seat shape: engine section recomputes everything; pin section imports ./part-geo601 and tolerates a MISSING part by exiting 0 engine-only).
4. This spec — the pinned numbers are IMMUTABLE (master pin engine `scripts/pin_check_geo132.py` 58/58 green).

## Lesson id/slug/fields
- id: `geo-parallelograms-and-their-family-tree`; number: `'6.1'`; title: `'Parallelograms and Their Family Tree'`
- prereqs: the congruence criteria (geometry 3.2), the rigid-motion idea (geometry 5.1)
- sources: `geo-common-core-gco11-ground-132`, `geo-ncert9-quadrilaterals-ground-132`
- palette: `const c61` — emerald family hue-shift off the c51 teal family: ink #14532d, mid #15803d, teal #0f766e, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panel #dcfce7, panel2 #fef3c7, sep #bbf7d0, faint #86efac, white #ffffff, paper #f0fdf4. Font family string as exemplar; helpers prefixed `geo61`.

## Arc (sections, ~7)
1. The quadrilateral charter: four sides, four vertices, the angle sum 360° via ONE diagonal splitting into two triangles (the 6.3 preview, honestly flagged); the definition under test — BOTH pairs of opposite sides parallel.
2. The first diagnosis: a diagonal divides a parallelogram into two congruent triangles — the alternate-interior + ASA proof.
3. The diagnosis cascade: opposite sides equal; opposite angles equal; adjacent angles supplementary; the 70°/110° running witness.
4. The diagonals bisect each other — the vertical-angle SAS proof (G-CO.C.11 verbatim acknowledged).
5. The converses (the conditions for a parallelogram): both pairs of opposite sides equal; ONE pair equal AND parallel; diagonals bisect each other — each proved, plus the counterexample discipline.
6. The family tree: rectangle (equal diagonals, proved), rhombus (perpendicular bisecting diagonals, proved), square (both — the meet); the honest inclusion chain (inclusive trapezium convention stated).
7. Coordinates and the vertex law: A + C = B + D; the shoelace re-read; the coordinate machine as the 10-second diagnosis.

## PINNED NUMBERS (engine truth — NEVER deviate; re-derive ALL in your TS engine)
- Running parallelogram ABCD: A(1,1), B(7,1), C(9,5), D(3,5). AB ∥ DC (slope 0 both); AD ∥ BC (slope 2 both); AB = DC = 6; AD = BC = √20 = 2√5 ≈ 4.4721.
- Diagonals AC = √80 = 4√5 ≈ 8.9443, BD = √32 = 4√2 ≈ 5.6569; BOTH midpoints (5,3).
- Vertex law: A + C = B + D = (10,6). Shoelace area 24 = base 6 × height 4.
- Angle witness: angles 70°, 110°, 70°, 110°.
- Trap counterexample (NOT a parallelogram): A(0,0), B(4,0), C(5,3), D(1,4) — vertex law fails ((5,3) ≠ (5,4)); DC slope −1/4 ≠ AB slope 0.
- Condition engine: A(0,0), B(5,0), C(6,3), D(1,3) — AB = DC = 5, AB ∥ DC → parallelogram (AD slope 3 = BC slope 3); area 15.
- Rectangle 8×5: A(0,0), B(8,0), C(8,5), D(0,5) — both diagonals √89 ≈ 9.4340, midpoint (4,2.5).
- Rhombus: diagonals 10 and 24 → half-diagonals 5,12 → side 13; area 120; side² = (d₁/2)² + (d₂/2)².
- Family census: square is both a rectangle and a rhombus; every parallelogram is a trapezium (inclusive convention).

## Figures (>=9 body + >=3 solution, ALL code-computed SVG, every one referenced in prose)
The running ABCD with both slope-2 side pairs marked; the diagonal-split congruence figure (ASA tick marks); the angle cascade 70/110; the diagonal bisection with midpoint ticks; the three converse figures; the trap counterexample; THE family-tree diagram (nested containers, square at the meet); the rectangle equal-diagonals witness; the rhombus 10-24 perpendicular diagonals; the vertex-law coordinate figure. Solution figures: the trap-quad disproof; the 5-12-13 rhombus construction; the coordinate diagnosis check.

## Exercises: 15, L1–L6 spread, full step solutions, >=3 with solution figures. Quiz: 5 MCQ, key [2,4,0,3,1]. Terms >=6. Formula block: the family inclusions + the vertex law + the rhombus diagonal law.

## Hard laws
- Minus U+2212 everywhere in SVG text; NO TeX inside SVG strings (plain text only); prose math in `$...$` inline only (never `$$`, never `\qquad`); no `words` field; headings plain text.
- `export const lessonGeo01: Lesson`; parts end with the APPEND TAIL marker exactly as the exemplar; file must be valid TypeScript after every staged write.
- ORIGINAL content only — the references inform, every sentence and figure is ours. House voice: reasons before results, every number earned.
- SVG true-to-scale where the figure shows measured geometry; accurate aria-labels; no label collisions (compute label extents; keep >=3px clearance; NUDGE LABELS AWAY from strokes, never let text sit on a segment).

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
Write-early-often: (1) v-geo01.ts engine section green FIRST; (2) part skeleton (palette/helpers + export shell) saved; (3) sections landed one at a time, saving after each; (4) exercises + solutions; (5) quiz + terms + report. Staged saves must always leave valid TS. Run `bun run docs/research/geo-ch06-wip/v-geo01.ts` at the end — ALL GREEN required (engine x/x + pins x/x).

## REPORT BACK: the three paths + word count (countLessonWords) + engine/pin score + body & solution figure counts + quiz key + any pin you had to re-derive (with the engine's value).
