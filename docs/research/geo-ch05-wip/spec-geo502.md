# SPEC geo502 — 'Composing Transformations and the Isometry Idea' (GEOMETRY 5.2, RUN 131)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch04-wip/part-geo401.ts` — the exemplar part (shape only).
2. `src/data/library/types.ts` — the Lesson type; `countLessonWords` exported here.
3. `docs/research/geo-ch04-wip/v-geo401.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — pinned numbers IMMUTABLE (`scripts/pin_check_geo131.py` 81/81 green).

## Lesson id/slug/fields
- id: `geo-composing-transformations-and-the-isometry-idea`; number: `'5.2'`; title: `'Composing Transformations and the Isometry Idea'`
- prereqs: lesson 5.1 (the rigid motions), the congruence criteria (geometry 3.2)
- sources: `geo-common-core-gco-ground-131`, `geo-im-rigid-motion-ground-131`
- palette `const c52` (same emerald/teal family, hue-shifted one step: ink #115e59, mid #0f766e, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panels #d1fae5/#e0f2fe, sep #a7f3d0, faint #6ee7b7, white, paper #f0fdfa); helpers `geo52`; `export const lessonGeo502: Lesson`.

## Arc (sections, ~7)
1. Composition as the machine of machines: (S∘T)(P) = S(T(P)) — apply T first, then S; the "do the right-hand motion first" reading convention.
2. Order matters: T∘F ≠ F∘T on the same point — the pinned counterexample pair, computed both ways.
3. The reflection machines compose: two mirrors in PARALLEL lines = translation by twice the gap; two mirrors at an ANGLE θ = rotation by 2θ about the intersection; the double-mirror = identity; every rigid motion decomposes into reflections (the mirror-machine theorem, stated and motivated).
4. The glide reflection: mirror + slide along the mirror — the fourth isometry family; footprints walking.
5. Parity census: even # of reflections → translation/rotation/identity; odd → reflection/glide; the three-reflection sandwich (F∘F′∘F) collapses to a single reflection in the sandwich family.
6. The isometry idea (G-CO.6): rigid motions take lines to lines, angles to angles, distance to distance; compositions of rigid motions are rigid; every rigid motion has a rigid inverse (the undo law); the plane's five isometry families named (identity, translation, rotation, reflection, glide).
7. Congruence re-read (G-CO.7/8): two figures congruent IFF a rigid-motion sequence carries one onto the other; ch.3's SAS/ASA/SSS re-read as invariance certificates (matching sides/angles survive every motion); the distance-matrix witness; the honest contrast — dilation k=2 is NOT an isometry (distance doubles), the doorstep to 5.4.

## PINNED NUMBERS (engine truth — 81/81; NEVER deviate; re-derive ALL in your TS engine)
- Order matters: on (3,1): T_(2,0) then y-axis reflection → (−5,1); y-axis reflection then T_(2,0) → (−1,1). Different results.
- Glide (mirror x-axis, then slide (0,3)): (4,1)→(4,2); (1,0)→(1,3); the join midpoint (4,1.5) sits on the glide axis y=1.5.
- Parallel mirrors x=1, x=4 (gap 3): composition = T_(6,0): (0,0)→(6,0); (1,2)→(7,2); shift = 2×gap = 6.
- Intersecting mirrors y=x then x-axis (45° apart): composition (2,5)→(5,−2) = rotation −90° about the origin — equals the direct R270 formula (x,y)→(y,−x).
- Double mirror = identity: (3,2) round-trips through the x-axis mirror.
- Undo law: T_(−2,0)∘T_(2,0) = identity on (5,1).
- Sandwich: triangle (0,0),(4,0),(1,3) under mirrors y=0 then y=2 → (0,4),(4,4),(1,7): all three side lengths preserved (isometry witness).
- Congruence-by-motion: triangles (0,0),(4,0),(4,3) and (6,5),(10,5),(10,8): identical distance matrices; T_(6,5) carries the first onto the second vertex-for-vertex.
- The honest non-isometry: dilation k=2 about the origin sends (0,0)–(3,0) (length 3) to length 6.

## Figures (≥9 body + ≥3 solution, ALL code-computed SVG, every one referenced in prose)
Composition-map diagram (P → T(P) → S(T(P))); the order-matters pair side by side; parallel-mirror machine (two mirrors, the double-gap slide); intersecting-mirror machine (the 2θ turn); glide-reflection footprints; parity tree of compositions; the sandwich collapse; the congruence-by-motion witness; the non-isometry contrast. Solution figures: the two-mirror trace, the glide axis construction, the distance-matrix witness diagram.

## Exercises: 15, L1–L6 spread, full step solutions, ≥3 with solution figures. Quiz: 5 MCQ, key [1,4,2,0,3].

## Hard laws
- Minus U+2212 in SVG text; NO TeX in SVG strings; prose math `$...$` only (never `$$`, never `\qquad`); no `words` field; plain-text headings.
- `export const lessonGeo502: Lesson`; APPEND TAIL marker as exemplar; valid TS after every staged write.
- ORIGINAL content only. House voice: reasons before results.
- True-to-scale SVG; accurate aria-labels; ≥3px label clearance.

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
(1) engine green first; (2) part skeleton; (3) sections one-by-one, saving each; (4) exercises; (5) quiz + report. `bun run docs/research/geo-ch05-wip/v-geo502.ts` ALL GREEN at the end.

## Output files (exact)
- `docs/research/geo-ch05-wip/part-geo502.ts`
- `docs/research/geo-ch05-wip/v-geo502.ts`
- `docs/research/geo-ch05-wip/REPORT-geo502.md`

## REPORT BACK: paths + word count + engine/pin score + figure counts + quiz key + any re-derived pin.
