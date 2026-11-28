# SPEC geo603 — 'Polygons: Vertex, Side, Angle Sums, Convexity' (GEOMETRY 6.3, RUN 132; RE-BANKED — PROVEN, it landed 69/69 before the run-132 artifact destruction; re-execute exactly)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch05-wip/part-geo503.ts` — the exemplar part. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law).
3. `docs/research/geo-ch05-wip/v-geo503.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — the pinned numbers are IMMUTABLE (`scripts/pin_check_geo132.py` 58/58 green).

## Lesson id/slug/fields
- id: `geo-polygons-vertex-side-angle-sums-convexity`; number: `'6.3'`; title: `'Polygons: Vertex, Side, Angle Sums, Convexity'`
- prereqs: the triangle angle sum (FM 8.4 sibling), line and rotational symmetry (geometry 5.3), the parallelogram family (geometry 6.1)
- sources: `geo-ncert8-polygons-ground-132`, `geo-polygon-canon-132`, `loney-trig-ch16-ground-132`
- palette: `const c63` — rose family hue-shift off the c51 teal family: ink #881337, mid #be123c, teal #0f766e, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panel #ffe4e6, panel2 #fef3c7, sep #fecdd3, faint #fda4af, white #ffffff, paper #fff1f2. Helpers prefixed `geo63`.

## Arc (sections, ~7)
1. The polygon charter: simple closed polyline; the naming census n = 3..12 (triangle→dodecagon, honest n-gon beyond).
2. Convexity: the every-diagonal-inside test; the dart witness; the honest convex-only note for the angle-sum proofs.
3. The interior angle sum (n−2)×180°: the triangulation proof from one vertex; the Euclid I.32/Proclus lineage; the census table.
4. The exterior angle sum 360°: the walking proof; ONE exterior angle per vertex (the two-at-a-vertex trap); the solve-back engines.
5. Diagonals: n(n−3)/2 by double counting; the octagon's 20; the handshake analogy.
6. Regular polygons: interior 180(n−2)/n, exterior 360/n; the limit re-read; the solve-back census; the hexagon = 6 equilateral triangles (area 24√3 for s = 4); the symmetry re-read from 5.3 (G-CO.A.3).
7. Why this matters: the ch.7 circle preview; the exam corner.

## PINNED NUMBERS (engine truth — NEVER deviate; re-derive ALL in your TS engine)
- Angle sums (n−2)×180° for n = 3..12: 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800.
- Diagonals n(n−3)/2 for n = 3..12: 0, 2, 5, 9, 14, 20, 27, 35, 44, 54; octagon 8×5/2 = 20.
- Regular interior angles for n = 3,4,5,6,8,9,10,12: 60, 90, 108, 120, 135, 140, 144, 150; exteriors: 120, 90, 72, 60, 45, 40, 36, 30; interior + exterior = 180 (census 3..20); exteriors sum 360 (n = 3..12).
- Solve-backs: interior 144° → n=10; 150° → n=12; 140° → n=9; 165° → n=24. Exterior 22.5° → n=16; 36° → n=10; 30° → n=12; 45° → n=8.
- Dart A(0,0), B(4,0), C(1,1), D(0,4): cross products [4, −8, 4, 16] — one negative → concave, reflex at C; diagonal BD (x+y=4) passes OUTSIDE (C at x+y=2); the walk turns [+90°, +161.5651°, −53.1301°, +161.5651°] at A,B,C,D totalling 360° (the engine-caught run-132 catch).
- Contrast square (0,0),(4,0),(4,4),(0,4): all cross products +16.
- Regular hexagon: central angle 60°, side = circumradius; area for s = 4: 24√3 ≈ 41.5692.
- Triangulation: n−2 triangles (9-gon → 7).

## Figures (>=9 body + >=3 solution, ALL code-computed SVG)
The polygon zoo (convex vs the dart); the naming census strip; the 9-gon triangulation fan (7 triangles); THE walking pentagon (five 72° turns); the octagon's 20 diagonals; the census table; the hexagon-as-6-triangles; the pentagon symmetry (5 mirrors + 72° rotation); the limit ladder. Solution figures: the missing-angle engine; the decagon diagonal check; the 144° solve-back.

## Exercises: 15, L1–L6 spread, full step solutions, >=3 with solution figures. Quiz: 5 MCQ, key [4,0,3,1,2]. Terms >=6. Formula block: (n−2)×180°, 360°, n(n−3)/2, 180(n−2)/n, 360/n.

## Hard laws
- Minus U+2212 everywhere in SVG text; NO TeX inside SVG strings (plain text only); prose math in `$...$` inline only (never `$$`, never `\qquad`); no `words` field; headings plain text.
- `export const lessonGeo03: Lesson`; parts end with the APPEND TAIL marker exactly as the exemplar; file must be valid TypeScript after every staged write.
- ORIGINAL content only — the references inform, every sentence and figure is ours. House voice: reasons before results, every number earned.
- SVG true-to-scale where the figure shows measured geometry; accurate aria-labels; no label collisions (compute label extents; keep >=3px clearance; NUDGE LABELS AWAY from strokes, never let text sit on a segment).

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
Write-early-often: (1) v-geo03.ts engine section green FIRST; (2) part skeleton (palette/helpers + export shell) saved; (3) sections landed one at a time, saving after each; (4) exercises + solutions; (5) quiz + terms + report. Staged saves must always leave valid TS. Run `bun run docs/research/geo-ch06-wip/v-geo03.ts` at the end — ALL GREEN required (engine x/x + pins x/x).

## REPORT BACK: the three paths + word count (countLessonWords) + engine/pin score + body & solution figure counts + quiz key + any pin you had to re-derive (with the engine's value).
