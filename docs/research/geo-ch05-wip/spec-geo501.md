# SPEC geo501 — 'The Rigid Motions: Slides, Flips and Turns' (GEOMETRY 5.1, RUN 131)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch04-wip/part-geo401.ts` — the exemplar part: palette block, namespaced SVG helpers, figure usage, section/exercise/quiz shape, the `/* -- APPEND TAIL -- */` marker at the end. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law); `countLessonWords` exported here.
3. `docs/research/geo-ch04-wip/v-geo401.ts` — the exemplar engine+pin harness (staged-seat shape: engine section recomputes everything; pin section imports ./part-geo501 and tolerates a MISSING part by exiting 0 engine-only).
4. This spec — the pinned numbers are IMMUTABLE (master pin engine `scripts/pin_check_geo131.py` 81/81 green).

## Lesson id/slug/fields
- id: `geo-rigid-motions-slides-flips-and-turns`; number: `'5.1'`; title: `'The Rigid Motions: Slides, Flips and Turns'`
- prereqs: the congruence idea (geometry 3.1), angles and coordinates craft (FM)
- sources: `geo-common-core-gco-ground-131`, `geo-im-rigid-motion-ground-131`
- palette: `const c51` — teal/emerald family hue-shift off the c41 blueprint family (ink #0f766e, mid #0d9488, teal #0891b2, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panels #ccfbf1/#fef3c7, sep #99f6e4, faint #5eead4, white, paper #f0fdfa); font family string as exemplar; helpers prefixed `geo51`.

## Arc (sections, ~7)
1. The machine idea: a transformation is a FUNCTION of the plane — points in, points out (G-CO.2's exact framing); the motion vocabulary slide/flip/turn named against translation/reflection/rotation.
2. Translation T_(a,b): the slide rule (x,y)→(x+a,y+b); the machine preserves distance and angle because every point moves by the same vector.
3. Reflection: the mirror machines — y-axis, x-axis, y=x, and the general vertical mirror x=c; the mirror lies on every segment joining P to its image (midpoint on the mirror, segment perpendicular — G-CO.9's perpendicular-bisector fact).
4. Rotation: the turn machines about the origin (90° CCW (x,y)→(−y,x), 180° (x,y)→(−x,−y), 270° CCW = 90° CW (x,y)→(y,−x)) and about an arbitrary centre P(a,b) (translate–turn–translate back).
5. What never changes: the invariance census — distances, angles, midpoints, parallelism, lines to lines; the signed-area orientation flip under reflection (+6 → −6) vs the flip kept under translation/rotation (the one visible difference between the motion families).
6. Drawing the image: the graph-paper craft (G-CO.5) — plot-vertex-by-vertex on a worked triangle; identify the motion from a preimage/image pair.
7. Why this matters: congruence re-defined as "carried by a rigid motion" (G-CO.6 preview of 5.2) and the doorstep to symmetry (5.3) — a symmetry IS a motion that leaves the figure fixed.

## PINNED NUMBERS (engine truth — 81/81; NEVER deviate; re-derive ALL of them in your TS engine)
- T_(3,−2): (5,1)→(8,−1); (0,0)→(3,−2); |PQ| = √26 ≈ 5.0990199 preserved exactly.
- Reflections of (−3,4): y-axis → (3,4); x-axis → (−3,−4); y=x → (4,−3).
- Mirror x=3: (1,2)→(5,2); the mirror midpoint (3,2) equidistant (2 and 2).
- R90 CCW origin: (4,1)→(−1,4), |(4,1)| = √17 ≈ 4.1231056 kept; R180: (2,5)→(−2,−5); R270 CCW: (4,1)→(1,−4).
- R90 CCW about (2,3): (5,3)→(2,6) (|PQ| = 3 kept); (5,0)→(5,6) (|PR| = √18 ≈ 4.2426407 kept).
- Midpoint invariance: segment (1,1)–(1,4) under T_(3,−2): images (4,−1),(4,2); image of midpoint (1,2.5) = midpoint of images (4,0.5).
- Line y=0 → line y=−2 under T_(3,−2) (points (0,0),(7,0) → (3,−2),(10,−2)).
- Right-angle triangle (0,0),(4,0),(4,3): the 90° at (4,0) (dot 0) survives reflection in the y-axis (image (−4,0), dot 0).
- Signed area (shoelace): (0,0),(4,0),(0,3) = +6; under y-axis reflection −6; under R90 +6.
- Distance-matrix congruence: triangle (0,0),(4,0),(4,3) vs (6,5),(10,5),(10,8) — identical distance matrices, T_(6,5) carries the first onto the second.

## Figures (≥9 body + ≥3 solution, ALL code-computed SVG, every one referenced in prose)
Slide vector diagram; mirror machine with the perpendicular-bisector join; y=x mirror swap; the three origin rotations on one coordinate figure; rotation about a foreign centre (2,3); midpoint-invariance figure; signed-area orientation flip (before/after); identify-the-motion preimage/image pair; a plot-vertex-by-vertex worked triangle. Solution figures: e.g. the mirror-x=3 construction, the R90-about-(2,3) three-step arc, the identify-the-motion answer diagram.

## Exercises: 15, L1–L6 spread, full step solutions, ≥3 with solution figures. Quiz: 5 MCQ, key [3,0,4,1,2].

## Hard laws
- Minus U+2212 everywhere in SVG text; NO TeX inside SVG strings (plain text only); prose math in `$...$` inline only (never `$$`, never `\qquad`); no `words` field; headings plain text.
- `export const lessonGeo501: Lesson`; parts end with the APPEND TAIL marker exactly as the exemplar; file must be valid TypeScript after every staged write.
- ORIGINAL content only — the references inform, every sentence and figure is ours. House voice: reasons before results, every number earned.
- SVG true-to-scale where the figure shows measured geometry; accurate aria-labels; no label collisions (compute label extents; keep ≥3px clearance).

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
Write-early-often: (1) v-geo501.ts engine section green FIRST; (2) part skeleton (palette/helpers + export shell) saved; (3) sections landed one at a time, saving after each; (4) exercises + solutions; (5) quiz + terms + report. Staged saves must always leave valid TS. Run `bun run docs/research/geo-ch05-wip/v-geo501.ts` at the end — ALL GREEN required (engine x/x + pins x/x).

## Output files (exact paths)
- `docs/research/geo-ch05-wip/part-geo501.ts`
- `docs/research/geo-ch05-wip/v-geo501.ts`
- `docs/research/geo-ch05-wip/REPORT-geo501.md`

## REPORT BACK: the three paths + word count (countLessonWords) + engine/pin score + body & solution figure counts + quiz key + any pin you had to re-derive (with the engine's value).
