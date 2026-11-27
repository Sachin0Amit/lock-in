# SPEC geo402 — 'The Basic Proportionality Theorem (Thales)' (GEOMETRY 4.2, RUN 130)

Deliverables (in order): `docs/research/geo-ch04-wip/v-geo402.ts` (pin engine + harness) then `docs/research/geo-ch04-wip/part-geo402.ts` (lesson object).

## Conventions — READ FIRST
`docs/research/geo-ch03-wip/v-geo203.ts` (engine/harness pattern — copy structure, prefixes 203→402, geo20→geo42) · `docs/research/geo-ch03-wip/part-geo301.ts` (part conventions: palette `const c42`, `const f42`, SVG helpers `geo42`-prefixed, `export const lessonGeo402: Lesson`, import EXACTLY `import type { Lesson } from '../../../src/data/library/types'`) · `docs/research/GEO_CH04_MASTER_PLAN.md` (notation law + arc).

## Lesson
id `geo-the-basic-proportionality-theorem-thales`, 4.2, chapter 4.

## Arc (~6-8 sections)
Thales and the shadow story (history grounded: Thales of Miletus, ~600 BCE, the pyramid-shadow measurement as tradition — label tradition as tradition) → the equal-altitude area lemma (two triangles on the SAME base and between the SAME parallels have equal areas — prove it, it is the engine of the chapter) → BPT STATEMENT: a line parallel to one side of a triangle divides the other two sides in the same ratio → THE PROOF via the area lemma (join BE, CD; [BDE]=[CDE] by the lemma; divide through by the common-altitude triangles to get AD/DB = AE/EC) → the converse (if the ratios match, the line is parallel — proof by contradiction) → the intercept ladder (equally spaced parallels cut equal segments; 3 gaps → 4 parts) → the midsegment theorem as the k=1/2 case (DE ∥ BC with D,E midpoints → DE = BC/2, and its use) → converse-of-midsegment + the trapezium tease (rides ch.5).

## PINNED NUMBERS (engine truth — pin_check_geo130.py green)
- DE ∥ BC with AD/DB = 3/4 → AE/EC = 3/4; AD/AB = 3/7; DE/BC = 3/7 (both directions of k stated).
- Numeric: AB = 14, AD = 6 → DB = 8; AC = 21 → AE = 9, EC = 12; BC = 28 → DE = 12.
- Converse counterexample: AD/DB = 3/4 but AE/EC = 4/5 → NOT parallel.
- Intercept: 3 gaps → 4 equal segments. Midsegment: k = 1/2.
- Quiz key: [1,3,0,4,2].

## Figures (≥3 body + ≥3 solution, code-computed SVG, referenced in prose)
Body: (1) the BPT configuration (△ABC with DE ∥ BC, the two auxiliary triangles shaded — the proof's own figure); (2) the equal-altitude area lemma figure (same base, same parallels, sliding vertex); (3) the intercept ladder (3 rungs, 4 parts); (4) the midsegment k=1/2 figure.
Solution: the numeric 14/6/21 computation ladder with the ratio checks; the converse test figure (the 4/5 mismatch drawn as a visibly non-parallel line); the midsegment computation; pick ≥3.

## Exercises: 15 L1–L6, full step solutions, ≥3 solution figures. Quiz 5 MCQ key [1,3,0,4,2].

## Hard laws
ENGINE WINS (prose satisfies engine, never the reverse) · SVG pure text, U+2212, aria-label, computed · $...$ clause-wise, no \qquad, no $$ · Cengage voice · floor 6,000 words, target 9,000+.

## HARD WORKING WINDOW: 35 MINUTES. Engine green first (`bun run docs/research/geo-ch04-wip/v-geo402.ts`), then the part SECTION BY SECTION to disk as it completes; valid TypeScript at every write; STOP at window end and report what is on disk.

## REPORT BACK: paths + word count + engine x/x + figures + quiz key + sections landed.
