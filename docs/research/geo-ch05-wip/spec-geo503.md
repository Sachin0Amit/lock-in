# SPEC geo503 — 'Line and Rotational Symmetry' (GEOMETRY 5.3, RUN 131)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch04-wip/part-geo401.ts` — the exemplar part (shape only).
2. `src/data/library/types.ts` — the Lesson type; `countLessonWords` exported here.
3. `docs/research/geo-ch04-wip/v-geo401.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — pinned numbers IMMUTABLE (`scripts/pin_check_geo131.py` 81/81 green).

## Lesson id/slug/fields
- id: `geo-line-and-rotational-symmetry`; number: `'5.3'`; title: `'Line and Rotational Symmetry'`
- prereqs: lesson 5.1 (the motions — a symmetry IS a fixed-set motion), 5.2 (composition)
- sources: `geo-ncert-symmetry-ground-131`, `geo-common-core-gco-ground-131` (G-CO.3: the rotations/reflections that carry a figure onto itself)
- palette `const c53` (same family, cyan shift: ink #155e75, mid #0e7490, teal #0891b2, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panels #cffafe/#fef9c3, sep #a5f3fc, faint #67e8f9, white, paper #f0fdfa); helpers `geo53`; `export const lessonGeo503: Lesson`.

## Arc (sections, ~7)
1. Symmetry defined by motion: a figure HAS a symmetry when a rigid motion carries it ONTO ITSELF; line symmetry = a reflection fixes it; rotational symmetry = a turn (not the identity) fixes it (NCERT's pin-in/full-turn reading).
2. The mirror census of the regular polygons: a regular n-gon carries exactly n mirror lines and rotational order n; the angle of rotation 360/n — n = 3,4,5,6,8,10 → 120°, 90°, 72°, 60°, 45°, 36°.
3. The quadrilateral census: square 4 lines + order 4; rectangle exactly 2 (the midlines) + order 2 with centre at the diagonal intersection; rhombus exactly 2 (the DIAGONALS) + order 2; parallelogram ZERO lines yet order 2 — NCERT's famous rotational-only case (the vertex-chase proof: a mirror would have to swap the unequal adjacent sides 5 and √5).
4. The triangle census: equilateral 3 + order 3; isosceles exactly 1 (line-symmetry-only, NCERT's archetype); scalene 0 and no rotational symmetry.
5. How the census is PROVED, not memorized: the brute-force machine — test all candidate mirror lines through the centre; the generic parallelogram survives 0 of them, the rectangle exactly 2, the rhombus 2, the square 4 (your engine re-runs the sweep).
6. Rotational symmetry beyond polygons: the 8-spoke wheel (order 8, 45°), the 5-blade fan (order 5, 72°); the alphabet archetypes — A/M/T/U/V/W/Y one line each; H/I/X two lines + order 2; N/S/Z rotational-only (order 2, NO mirror); F/G/J/L/P/R nothing; O the circle's infinite census; the both/only-line/only-rotational/neither four-way classification table.
7. Why symmetry earns its lesson: the fixed-set view (mirror = the figure's own bisector machinery; centre of rotation = the diagonal intersection the parallelogram already taught), the design/world applications, and the bridge to 5.4 (a dilation is the motion that is NOT a symmetry of anything but a point — it changes size, the one thing rigid motions swore to keep).

## PINNED NUMBERS (engine truth — 81/81; NEVER deviate; re-derive ALL in your TS engine)
- Regular n-gons: lines = n, order = n, angle = 360/n: n=3 → 120°, n=4 → 90°, n=5 → 72°, n=6 → 60°, n=8 → 45°, n=10 → 36°.
- Rectangle (0,0),(6,0),(6,4),(0,4): centre (3,2) = diagonal intersection; 180° rotation about it maps the vertex set onto itself ((0,0)→(6,4) etc.); exactly 2 mirror lines survive the sweep.
- Generic parallelogram (0,0),(5,0),(6,2),(1,2): centre (3,1); 180° rotation is a symmetry; ZERO mirror lines survive the 180-candidate sweep; adjacent sides 5 and √5 ≈ 2.2360680 unequal.
- Rhombus (0,0),(2,1),(4,0),(2,−1): sides √5, diagonals 4 and 2 unequal; exactly 2 mirror lines (the diagonals).
- Square (0,0),(4,0),(4,4),(0,4): exactly 4 mirror lines.
- Scalene triangle (0,0),(5,0),(1,3): 0 mirror lines. Isosceles (0,0),(4,0),(2,3): exactly 1.
- 8-spoke wheel: order 8, angle 45°. 5-blade fan: order 5, angle 72°.

## Figures (≥9 body + ≥3 solution, ALL code-computed SVG, every one referenced in prose)
The regular n-gon mirror-line family (n=5 or 6 drawn fully); the square's 4 lines vs rectangle's 2 vs rhombus's diagonal pair — three-panel census; the parallelogram's failed mirror (the vertex-chase figure); the rotational-order wheel (8 spokes with the 45° arc); the alphabet census strip; the four-way classification table diagram; the fan; the 180°-about-the-centre witness. Solution figures: the mirror-sweep sketch, the parallelogram contradiction diagram, the alphabet strip answer.

## Exercises: 15, L1–L6 spread, full step solutions, ≥3 with solution figures. Quiz: 5 MCQ, key [4,1,0,3,2].

## Hard laws
- Minus U+2212 in SVG text; NO TeX in SVG strings; prose math `$...$` only (never `$$`, never `\qquad`); no `words` field; plain-text headings.
- `export const lessonGeo503: Lesson`; APPEND TAIL marker as exemplar; valid TS after every staged write.
- ORIGINAL content only. House voice.
- True-to-scale SVG; accurate aria-labels; ≥3px label clearance.

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
(1) engine green first; (2) part skeleton; (3) sections one-by-one; (4) exercises; (5) quiz + report. `bun run docs/research/geo-ch05-wip/v-geo503.ts` ALL GREEN at the end.

## Output files (exact)
- `docs/research/geo-ch05-wip/part-geo503.ts`
- `docs/research/geo-ch05-wip/v-geo503.ts`
- `docs/research/geo-ch05-wip/REPORT-geo503.md`

## REPORT BACK: paths + word count + engine/pin score + figure counts + quiz key + any re-derived pin.
