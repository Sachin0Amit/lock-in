# SPEC geo504 — 'Dilations, Scale Factors and Similarity Re-Read' (GEOMETRY 5.4, RUN 131)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch04-wip/part-geo401.ts` — the exemplar part (shape only).
2. `src/data/library/types.ts` — the Lesson type; `countLessonWords` exported here.
3. `docs/research/geo-ch04-wip/v-geo401.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — pinned numbers IMMUTABLE (`scripts/pin_check_geo131.py` 81/81 green).

## Lesson id/slug/fields
- id: `geo-dilations-scale-factors-and-similarity-re-read`; number: `'5.4'`; title: `'Dilations, Scale Factors and Similarity Re-Read'`
- prereqs: 5.1 + 5.2 (the isometry idea), chapter 4 whole (similarity: 4.1 figures, 4.2 Thales, 4.3 criteria, 4.4 Pythagoras)
- sources: `geo-common-core-gco-ground-131` (G-CO.2's "preserve distance vs not" contrast; the dilation-completes-the-family framing), `geo-im-rigid-motion-ground-131`
- palette `const c54` (same family, emerald shift: ink #065f46, mid #059669, teal #0d9488, amber #d97706, orange #ea580c, red #dc2626, green #0f766e, panels #d1fae5/#fce7f3, sep #a7f3d0, faint #6ee7b7, white, paper #f0fdfa); helpers `geo54`; `export const lessonGeo504: Lesson`.

## Arc (sections, ~7)
1. The dilation machine: D_(O,k)(P) = O + k(P−O); centre O, scale factor k; k>1 enlarges, 0<k<1 shrinks, k=1 is the identity; negative k carries the half-turn sense (honest note, pinned witness).
2. Reading k off images: the coordinate machine — (2,3)→(5,7.5) about the origin means k=2.5; foreign centres (O=(1,1), O=(2,3)) worked both ways.
3. What scales and what does not: distances by |k|; perimeters by |k|; AREAS by k²; angles NEVER (the right-angle dot-product witness); lines not through O to parallel lines (slope preserved); lines through O to themselves — the ray structure that makes dilations the similarity engines.
4. The honest non-similarity: 2×6 vs 3×4 rectangles — ratios 2/3 and 3/2 with no single k (4.1's failure re-read: no dilation carries one to the other); the 1:3 family (3,9),(4,12),(5,15) all dilations of (1,3).
5. Similarity re-read (the chapter payoff): two figures SIMILAR iff a dilation followed by an isometry (or the composition in either order) carries one onto the other — similarity = dilation + motion, the machine definition that completes G-CO.2's preserve/not-preserve contrast; ch.4's AA re-read as angle-invariance; 4.2's Thales re-read as the shadow dilation (the apex-centred machine, k = 18/2.4 = 7.5, stake 1.7 → tree 12.75).
6. Pythagoras re-read as dilations: the 3-4-5 triangle's altitude construction — the two small triangles are the big one at scales 3/5 and 4/5; the leg² laws a² = c·BF (9 = 5×1.8) and b² = c·FC (16 = 5×3.2), altitude 12/5 = 2.4 — the geometric-mean machine 4.4 earned, now seen as scale arithmetic.
7. The doorstep: centres of similitude of two circles — external (−5,0) with DIRECT k=+3 (5:15 = 2:6), internal (2.5,0) with OPPOSITE k=−3 (2.5:7.5 = 1:3) for circles r=2 at (0,0) and r=6 at (10,0) — the homothety reading the circle chapter (ch.7 common tangents) will build on.

## PINNED NUMBERS (engine truth — 81/81; NEVER deviate; re-derive ALL in your TS engine)
- D origin k=3: (2,1)→(6,3); k=1/2: (4,6)→(2,3); k=−2: (1,2)→(−2,−4).
- D_(1,1) k=2: (3,5)→(5,9); D_(2,3) k=1/2: (6,7)→(4,5).
- Segment (1,1)–(4,5): length 5; images under D origin k=3: (3,3),(12,15): length 15 = 3×5.
- Triangle (0,0),(4,0),(0,3): area 6; k=3 → area 54 (k²=9); k=1/2 → 1.5; perimeter 12 → 36.
- Right angle at the origin vertex preserved under k=3 (image vectors (12,0),(0,9), dot 0).
- Line y=2x+1 (points (0,1),(1,3)) under k=3 → (0,3),(3,9): still slope 2 (parallel image); line y=2x through O maps to itself ((1,2)→(3,6)).
- k read off (2,3)→(5,7.5): k=2.5; area ratio witness 2.5² = 6.25.
- Thales re-read: k = 18/2.4 = 7.5; stake 1.7 → tree 12.75.
- 3-4-5 re-read: right angle at A=(0,0), legs AB=3, AC=4, hypotenuse BC=5; foot F of the altitude from A: BF = 1.8, FC = 3.2, h = 2.4; 9 = 5×1.8; 16 = 5×3.2; scales 3/5 = 0.6 and 4/5 = 0.8.
- 2×6 vs 3×4: side ratios 2/3, 3/2 — two distinct values, no single k.
- (1,3) dilated by 3,4,5 → (3,9),(4,12),(5,15).
- Circles r=2 at (0,0), r=6 at (10,0): external centre (−5,0), distances 5 and 15, ratio 1:3 = 2:6, DIRECT k=+3 maps the small circle onto the large ((0,0)→(10,0)); internal centre (2.5,0), distances 2.5 and 7.5, OPPOSITE k=−3 also maps (0,0)→(10,0).

## Figures (≥9 body + ≥3 solution, ALL code-computed SVG, every one referenced in prose)
The dilation machine (centre O, rays, k=3 on a triangle); the k-family (k=1/2, 1, 3 on one figure); the ray structure (line through O self-maps, line off O goes parallel); the area-k² grid witness; the Thales shadow dilation re-read (the 4.2 figure re-drawn as a dilation from the shadow tip); the 3-4-5 altitude scale re-read; the 2×6 vs 3×4 honest failure; the two-circle similitude centres. Solution figures: the k-from-images construction, the area grid, the similitude-centre ratios.

## Exercises: 15, L1–L6 spread, full step solutions, ≥3 with solution figures. Quiz: 5 MCQ, key [0,3,2,4,1].

## Hard laws
- Minus U+2212 in SVG text; NO TeX in SVG strings; prose math `$...$` only (never `$$`, never `\qquad`); no `words` field; plain-text headings.
- `export const lessonGeo504: Lesson`; APPEND TAIL marker as exemplar; valid TS after every staged write.
- ORIGINAL content only; the ch.4 re-reads cite the lessons by number (4.1/4.2/4.4) without quoting their prose.
- True-to-scale SVG; accurate aria-labels; ≥3px label clearance.

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
(1) engine green first; (2) part skeleton; (3) sections one-by-one; (4) exercises; (5) quiz + report. `bun run docs/research/geo-ch05-wip/v-geo504.ts` ALL GREEN at the end.

## Output files (exact)
- `docs/research/geo-ch05-wip/part-geo504.ts`
- `docs/research/geo-ch05-wip/v-geo504.ts`
- `docs/research/geo-ch05-wip/REPORT-geo504.md`

## REPORT BACK: paths + word count + engine/pin score + figure counts + quiz key + any re-derived pin.
