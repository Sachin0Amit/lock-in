# SPEC geo404 — 'Pythagoras Proved: the Theorem Earned' (GEOMETRY 4.4, RUN 130)

Deliverables (in order): `docs/research/geo-ch04-wip/v-geo404.ts` (pin engine + harness) then `docs/research/geo-ch04-wip/part-geo404.ts` (lesson object).

## Conventions — READ FIRST
`docs/research/geo-ch03-wip/v-geo203.ts` (engine/harness pattern — copy structure, prefixes 203→404, geo20→geo44) · `docs/research/geo-ch03-wip/part-geo301.ts` (part conventions: palette `const c44`, `const f44`, SVG helpers `geo44`-prefixed, `export const lessonGeo404: Lesson`, import EXACTLY `import type { Lesson } from '../../../src/data/library/types'`) · `docs/research/GEO_CH04_MASTER_PLAN.md` (notation law + arc).

## Lesson
id `geo-pythagoras-proved-the-theorem-earned`, 4.4, chapter 4 — the chapter's cash-out: the theorem the reader has USED since Foundation Mathematics is finally EARNED.

## Arc (~6-8 sections)
The debt named: a² + b² = c² used for years, never proved — today similarity pays it → the altitude-on-hypotenuse construction (drop the altitude from the right angle to the hypotenuse; the big triangle splits into TWO triangles each similar to the original — walk all three Similarity statements) → Euclid VI.8 read off: each leg is the geometric mean of the hypotenuse and its adjacent segment; the altitude is the geometric mean of the two segments → THE PROOF BY SIMILARITY (from leg² = hyp × segment, add: a² + b² = c(p + q) = c²) → the second proof by areas (squares on the sides: 9 + 16 = 25) and Euclid I.47's named windmill as the classic cousin → areas of similar figures scale k² (Euclid VI.19 duplicate ratio — the third-proportional idea sketched honestly) → the tree-shadow application cashed (AA from 4.3 + ratios) → the primitive-triple census and the 45-45-90 / 30-60-90 specials as similarity families → the converse (if a² + b² = c² then right — 8,15,17 yes; 4,5,7 no) and why the converse matters (the carpenter's 3-4-5 check).

## PINNED NUMBERS (engine truth — pin_check_geo130.py green)
- 3-4-5 altitude-on-hypotenuse: hyp = 5; segments p = 9/5 = 1.8, q = 16/5 = 3.2; altitude h = 12/5 = 2.4; h² = pq = 5.76; leg² = hyp×segment: 9 = 5×1.8, 16 = 5×3.2.
- Geometric mean: √(1.8 × 3.2) = 2.4.
- The split triangles: 1.8-2.4-3.0 and 2.4-3.2-4.0, ratios (3/5, 4/5, 1).
- Squares: 9 + 16 = 25. Tree-shadow: 1.5 m stick, 2 m shadow, 12 m tree shadow → height 9 m.
- Areas k=3: 6 → 54 (k² = 9). Perimeter ratio k = 3 (36/12).
- VI.19 duplicate ratio: k = 3/2 → 9/4.
- Primitive triples with hyp ≤ 100: exactly 16 — (3,4,5) (5,12,13) (8,15,17) (7,24,25) (20,21,29) (12,35,37) (9,40,41) (28,45,53) (11,60,61) (16,63,65) (33,56,65) (48,55,73) (13,84,85) (36,77,85) (39,80,89) (65,72,97) — 20-21-29 and 9-40-41 pinned present.
- Converse: 8²+15² = 64+225 = 289 = 17² (right); 4²+5² = 41 ≠ 49 = 7² (not right).
- 45-45-90 sides 1 : 1 : √2 (1.4142136); 30-60-90 sides 1 : √3 (1.7320508) : 2.
- Quiz key: [3,0,4,2,1].

## Figures (≥3 body + ≥3 solution, code-computed SVG, referenced in prose)
Body: (1) the altitude-on-hypotenuse split of 3-4-5 with all three similarity markings; (2) the mean-proportional diagram (p, q, h labelled with the geometric-mean relations); (3) the squares-on-sides area proof 9+16=25; (4) the primitive-triple census scatter (16 points on the (a,b) grid, hyp ≤ 100).
Solution: the similarity proof ladder (leg² = hyp×segment computed for both legs); the tree-shadow figure; the converse check (8,15,17 vs 4,5,7 squares); pick ≥3.

## Exercises: 15 L1–L6, full step solutions, ≥3 solution figures. Quiz 5 MCQ key [3,0,4,2,1].

## Hard laws
ENGINE WINS · SVG pure text, U+2212, aria-label, computed · $...$ clause-wise, no \qquad, no $$ · Cengage voice · floor 6,000 words, target 9,000+.

## HARD WORKING WINDOW: 35 MINUTES. Engine green first (`bun run docs/research/geo-ch04-wip/v-geo404.ts`), then the part SECTION BY SECTION to disk; valid TypeScript at every write; STOP at window end and report.

## REPORT BACK: paths + word count + engine x/x + figures + quiz key + sections landed.
