# SPEC geo403 — 'The Similarity Criteria: AA, SAS, SSS' (GEOMETRY 4.3, RUN 130)

Deliverables (in order): `docs/research/geo-ch04-wip/v-geo403.ts` (pin engine + harness) then `docs/research/geo-ch04-wip/part-geo403.ts` (lesson object).

## Conventions — READ FIRST
`docs/research/geo-ch03-wip/v-geo203.ts` (engine/harness pattern — copy structure, prefixes 203→403, geo20→geo43) · `docs/research/geo-ch03-wip/part-geo301.ts` (part conventions: palette `const c43`, `const f43`, SVG helpers `geo43`-prefixed, `export const lessonGeo403: Lesson`, import EXACTLY `import type { Lesson } from '../../../src/data/library/types'`) · `docs/research/GEO_CH04_MASTER_PLAN.md` (notation law + arc).

## Lesson
id `geo-the-similarity-criteria-aa-sas-sss`, 4.3, chapter 4.

## Arc (~6-8 sections)
Why criteria at all — checking all angles and all ratios is six measurements; a criterion is the short gate (the congruence chapter's SAS/ASA/SSS echo, now relaxed) → AA: two angles suffice (the third is forced by the angle sum 180°) — proof via BPT (construct the copy on the matched angle, the parallel line forces the ratios) → SAS-similarity: two sides in a common ratio with the included angle equal → SSS-similarity: all three ratios the common k (the honest check that k must be the SAME across pairs) → the negative census: why SSA dies (the ch.3 two-triangles lesson re-armed for similarity), why AAA-of-angles is exactly AA, and the congruence criteria as the k=1 special cases → RHS-similarity (right angle + hypotenuse ratio + one side ratio) → applications: the shadow method (Thales cashed), the indirect-measurement workshop (tree height by stick-and-shadow) → criteria in the wild: choosing the right gate for a given figure.

## PINNED NUMBERS (engine truth — pin_check_geo130.py green)
- AA pair: 40°-60°-80° (sum 180°) similar regardless of size.
- SAS: 4,6 with included 60° vs 6,9 with included 60° → k = 3/2; third sides sqrt(28) = 5.2915026 and sqrt(63) = 7.9372539, ratio exactly 1.5 (law of cosines); areas 10.3923048 and 23.3826859, ratio 2.25 = k².
- SSS: 6,8,10 vs 9,12,15 similar (all ratios 3/2); counter: 6,8,11 vs 9,12,15 NOT similar.
- RHS-similarity: 5,12,13 vs 10,24,26 (k=2).
- SAS area ratio k² = 9/4.
- Quiz key: [0,4,2,1,3].

## Figures (≥3 body + ≥3 solution, code-computed SVG, referenced in prose)
Body: (1) the AA construction proof figure (copy triangle on the shared angle, the forced parallel); (2) the SAS pair 4,6@60° / 6,9@60° with the k=3/2 arcs marked; (3) the SSS ratio census table-figure (6,8,10 vs 9,12,15 with per-pair ratios, plus the 11-side counter); (4) the SSA failure figure (two different triangles on the same SSA data — adapt ch.3's, do not copy its code).
Solution: the tree-shadow AA computation (1.5 m stick, 2 m shadow, 12 m tree shadow → 9 m); the SAS third-side law-of-cosines ladder; the SSS check; pick ≥3.

## Exercises: 15 L1–L6, full step solutions, ≥3 solution figures. Quiz 5 MCQ key [0,4,2,1,3].

## Hard laws
ENGINE WINS · SVG pure text, U+2212, aria-label, computed · $...$ clause-wise, no \qquad, no $$ · Cengage voice · floor 6,000 words, target 9,000+.

## HARD WORKING WINDOW: 35 MINUTES. Engine green first (`bun run docs/research/geo-ch04-wip/v-geo403.ts`), then the part SECTION BY SECTION to disk; valid TypeScript at every write; STOP at window end and report.

## REPORT BACK: paths + word count + engine x/x + figures + quiz key + sections landed.
