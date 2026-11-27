# SPEC geo401 — 'Similar Figures: Same Shape at Any Scale' (GEOMETRY 4.1, RUN 130)

You author ONE lesson for the LockIn Library. Deliverables (both required, in this order):
1. `docs/research/geo-ch04-wip/v-geo401.ts` — TypeScript pin engine + harness.
2. `docs/research/geo-ch04-wip/part-geo401.ts` — the lesson object (the shipped artifact).

## Conventions — READ THESE FILES FIRST (they are the law)
- `docs/research/geo-ch03-wip/v-geo203.ts` — the engine/harness pattern: Chk collectors, `runPins` with `mod = await import('./part-geo401')`, the bottom harness marker + report/exit. Copy the structure exactly (rename prefixes 203→401, geo20→geo40).
- `docs/research/geo-ch03-wip/part-geo301.ts` — the part conventions: palette `const c41 = {...}` (vivid, dark-mode safe — copy c31's hexes and shift hues to a similarity-appropriate family), `const f41` font stack, SVG helpers prefixed `geo41`, export `export const lessonGeo401: Lesson`, import line EXACTLY `import type { Lesson } from '../../../src/data/library/types'`.
- `docs/research/GEO_CH04_MASTER_PLAN.md` — the notation law + arc (READ IT).
- BOOK_FORMAT: sections/illustrations/formula cards/quiz/exercise structure exactly as part-geo301.ts does them.

## Lesson id/slug
id `geo-similar-figures-same-shape-at-any-scale`, number 4.1, chapter 4 'Similarity: the Geometry of Proportion'.

## Arc (sections, ~6-8)
Same shape different size — the photograph idea → what MUST match (ALL angles, ALL side ratios one common k) and what need not (areas, perimeters scale their own way) → the definition: △ABC ~ △DEF with the correspondence stated, k with direction → the k, k, k² machine (perimeter ×k, area ×k², diagonal/height/median ×k) → similar polygons beyond triangles (the regular hexagon; the rectangle family's honest failure — 2×6 vs 3×4 same angles, different shape) → scale drawings and maps (1:50000) → similar solids teaser (cubes: k³ volumes — one paragraph only, the deep dive rides a later book) → the historical frame (Thales measuring pyramids by shadow — set up, the AA proof rides 4.3/4.4).

## PINNED NUMBERS (engine truth — scripts/pin_check_geo130.py 62/62 green; NEVER deviate)
- 3-4-5 scaled k=1,2,3,5: perimeters 12,24,36,60; areas 6,24,54,150.
- Regular hexagon: interior angles all 120° (invariant under scaling); perim k=2 doubles; area ratio 4.
- 2×6 vs 3×4 rectangles: 2/6 ≠ 3/4 → same angles, NOT similar.
- Map 1:50000: 6 cm → 3,000 m (3 km); 36 cm² → 9 km² (the cm²→km² conversion via 1e10 cm² = 1 km²).
- Photo 4×6 → 8×12: k=2, area ×4.
- Perimeter ratio 3-4-5 vs 9-12-15 = 3 (k=3), area 6 → 54.
- Quiz key: [2,1,3,0,4].

## Figures (≥3 body + ≥3 solution, ALL code-computed SVG, each referenced in prose)
Body: (1) the 3-4-5 family at k=1,2,3 side by side with the ratio table; (2) the k/k² machine chart (bar pairs: perimeter ×k vs area ×k² for k=1..5); (3) similar hexagons nested + the 2×6 vs 3×4 counterexample pair; (4) the map-scale figure (6 cm map arrow → 3 km ground arrow).
Solution figures: the scaled-triangle perim/area computation ladder; the map area conversion; the photo enlargement; the hexagon angle invariance — pick ≥3, place them inside the worked solutions they illustrate.

## Exercises: 15, L1–L6 spread, full step solutions, ≥3 with solution figures. Quiz: 5 MCQ, key [2,1,3,0,4].

## Hard laws
ENGINE WINS: every number in prose/quiz/exercises must appear in (or be derived live in) v-geo401.ts first; engine is immutable truth — if prose and engine disagree, fix prose. SVG: pure text, U+2212 minus, aria-label, no TeX, computed points. Voice: Cengage-style, warm, rigorous; results math $...$ clause-wise; no \qquad, no $$. Word floor 6,000, target 9,000+.

## Staged-seat law — HARD WORKING WINDOW: 35 MINUTES
Write v-geo401.ts first, run it green (`cd /home/z/my-project && bun run docs/research/geo-ch04-wip/v-geo401.ts`), then write part-geo401.ts SECTION BY SECTION to disk as each completes (write-early-often). Valid TypeScript at every write. At window end STOP and report exactly what is on disk.

## REPORT BACK: file paths + word count + engine score (x/x) + figures count + quiz key + sections landed.
