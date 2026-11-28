# SPEC geo602 — 'The Midpoint Theorem and the Trapezium' (GEOMETRY 6.2, RUN 132; RE-BANKED — PROVEN, it landed 86/86 before the run-132 artifact destruction; re-execute exactly)

## Conventions — READ THESE FILES FIRST (they are the law)
1. `docs/research/geo-ch05-wip/part-geo502.ts` — the exemplar part. Copy its SHAPE, never its content.
2. `src/data/library/types.ts` — the Lesson type (the law).
3. `docs/research/geo-ch05-wip/v-geo502.ts` — the exemplar engine+pin harness (staged-seat shape).
4. This spec — the pinned numbers are IMMUTABLE (`scripts/pin_check_geo132.py` 58/58 green).

## Lesson id/slug/fields
- id: `geo-the-midpoint-theorem-and-the-trapezium`; number: `'6.2'`; title: `'The Midpoint Theorem and the Trapezium'`
- prereqs: the congruence criteria (geometry 3.2), similarity and BPT (geometry 4.2), line symmetry (geometry 5.3)
- sources: `geo-ncert9-midpoint-ground-132`, `geo-midsegment-web-canon-132`
- palette: `const c62` — indigo family hue-shift off the c51 teal family: ink #312e81, mid #4338ca, teal #0e7490, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panel #e0e7ff, panel2 #fef3c7, sep #c7d2fe, faint #a5b4fc, white #ffffff, paper #eef2ff. Helpers prefixed `geo62`.

## Arc (sections, ~7)
1. Midpoints as averages: M = (A+B)/2; the theorem stated (G-CO.C.10's wording acknowledged).
2. Proof one — the congruence construction: extend MN beyond N to P with MN = NP; the SAS chase; the parallelogram sandwich.
3. Proof two — coordinates: M(4,0), N(1,3); vector BC = (−6,6) = 2 × vector MN.
4. The converse: through a midpoint parallel to a side bisects the third side (uniqueness of parallels).
5. Varignon's parallelogram: midpoints of ANY quadrilateral (two midpoint-theorem applications); honest history (Pierre Varignon 1654–1722, Élemens de mathematique published posthumously 1731); the half-area law.
6. The trapezium: the honest conventions note (inclusive school convention adopted and stated); the midsegment theorem M = ½(b₁ + b₂) — extend-the-legs similar-triangles proof + coordinate proof; the average fact.
7. The isosceles trapezium: equal legs, equal base angles, the mirror line, equal diagonals; the exam corner.

## PINNED NUMBERS (engine truth — NEVER deviate; re-derive ALL in your TS engine)
- Witness triangle A(0,0), B(8,0), C(2,6): M(4,0), N(1,3); vector BC = (−6,6) = 2·vector MN = 2·(−3,3); |BC| = 6√2 ≈ 8.4853, |MN| = 3√2 ≈ 4.2426; triangle area 24.
- Converse: through M(4,0) parallel to BC meets AC at exactly (1,3) (t = 1/2).
- Varignon quadrilateral A(0,0), B(10,0), C(8,6), D(2,7): midpoints P(5,0), Q(9,3), R(5,6.5), S(1,3.5); PQ = SR = (4,3), QR = PS = (−4,3.5); quad area 52, Varignon area 26 = exactly half; Varignon sides are half the DIAGONALS.
- Trapezium A(0,0), B(12,0), C(9,4), D(3,4): bases 12 and 6; legs' midpoints E(1.5,2), F(10.5,2); midsegment EF = 9 = ½(12+6); 6 < 9 < 12.
- Extend-the-legs: bases 8 and 14 → ratio 4:7; leg split 4:3.
- Isosceles trapezium A(0,0), B(10,0), C(8,4), D(2,4): legs √20 ≈ 4.4721; mirror x = 5; base angles atan(4/2) = 63.4349°; diagonals both √80 ≈ 8.9443.

## Figures (>=9 body + >=3 solution, ALL code-computed SVG)
The witness triangle with MN and BC; the double-and-extend construction; the coordinate proof figure; the converse figure; THE Varignon figure; the trapezium with midsegment 9; the extend-legs 4:7 figure; the isosceles trapezium with mirror; the equal-diagonals figure. Solution figures: the Varignon half-area diagram; the midsegment round-trip; the isosceles diagonal check.

## Exercises: 15, L1–L6 spread, full step solutions, >=3 with solution figures. Quiz: 5 MCQ, key [0,3,1,4,2]. Terms >=6. Formula block: midpoint theorem + converse + midsegment law + Varignon half-area.

## Hard laws
- Minus U+2212 everywhere in SVG text; NO TeX inside SVG strings (plain text only); prose math in `$...$` inline only (never `$$`, never `\qquad`); no `words` field; headings plain text.
- `export const lessonGeo02: Lesson`; parts end with the APPEND TAIL marker exactly as the exemplar; file must be valid TypeScript after every staged write.
- ORIGINAL content only — the references inform, every sentence and figure is ours. House voice: reasons before results, every number earned.
- SVG true-to-scale where the figure shows measured geometry; accurate aria-labels; no label collisions (compute label extents; keep >=3px clearance; NUDGE LABELS AWAY from strokes, never let text sit on a segment).

## Staged-seat law — HARD WORKING WINDOW: 40 MINUTES
Write-early-often: (1) v-geo02.ts engine section green FIRST; (2) part skeleton (palette/helpers + export shell) saved; (3) sections landed one at a time, saving after each; (4) exercises + solutions; (5) quiz + terms + report. Staged saves must always leave valid TS. Run `bun run docs/research/geo-ch06-wip/v-geo02.ts` at the end — ALL GREEN required (engine x/x + pins x/x).

## REPORT BACK: the three paths + word count (countLessonWords) + engine/pin score + body & solution figure counts + quiz key + any pin you had to re-derive (with the engine's value).
