# REPORT — geo501 (Task 3-a, seat ONE, run 131)

Lesson **5.1 — 'The Rigid Motions: Slides, Flips and Turns'**

## Output files (the only files touched)

1. `docs/research/geo-ch05-wip/part-geo501.ts` — the part (palette `c51` teal/emerald, `geo51*` helpers, 7 sections, 9 body figures, 3 Illustrations, census + rule tables, 5 formula cards, 12 terms, quiz, 15 exercises with 4 solution figures, APPEND TAIL marker in place).
2. `docs/research/geo-ch05-wip/v-geo501.ts` — verify-first ENGINE + PIN harness (engine recomputes every pinned number; pins audit the part; staged-seat tolerant of a missing part).
3. `docs/research/geo-ch05-wip/REPORT-geo501.md` — this report.

## Scores

- **Engine: 38 pass, 0 fail** (E01–E38: every pinned slide image, mirror image, turn image, preserved distance, midpoint read, right-angle dot, signed area and distance matrix re-derived in TypeScript before prose hardened).
- **Pins: 46 pass, 0 fail** (P01–P20 incl. quiz-key [3,0,4,1,2], 15 exercises L1–L6, figure floors, SVG hygiene, math-span laws, identity/sources/prereqs, words-field omission).
- `bun run docs/research/geo-ch05-wip/v-geo501.ts` → **TOTAL: 84 pass, 0 fail, exit 0**.

## Word count

`countLessonWords(lessonGeo501)` = **10,089** (floor 9,000; target ~10,000+ met).

## Figures

- **Body figures: 9** (F1 slide vector diagram; F2 mirror x = 3 perpendicular-bisector machine; F3 y = x swap; F4 the three origin rotations on one grid; F5 foreign-centre turn about (2, 3); F6 midpoint invariance; F7 signed-area orientation flip, three panels; F8 identify-the-motion pair; F9 plot-vertex-by-vertex worked triangle) — all code-computed SVG, all referenced in prose.
- **Solution figures: 4** (mirror x = 3 construction in Ex 3; slide-of-a-line y = 0 → y = −2 in Ex 7; identify-the-motion answer diagram in Ex 9; three-step R90-about-(2, 3) arc in Ex 13) — 0 in examples, 4 in exercises.
- All SVGs: role="img" + aria-label + viewBox, plain text (no $, no TeX), U+2212 minus only, c51 palette hexes only, strokes ≥ 1.2, fonts 11–14.5, no label clipping.

## Quiz key

**[3, 0, 4, 1, 2]** — verified pairwise-distinct, legal, item 3 carries five options. Tokens pinned in the correct options: 'function of the plane', '(3, 4)', '(−1, 4)', 'flips the sign', 'identical distance matrices'.

## Sections landed

1. A machine that eats points: the transformation idea (G-CO.2 function framing; slide/flip/turn vocabulary; rigid-motion definition callout)
2. The slide machine: the translation T_(a, b) (F1; distance-preservation derivation; lines-to-lines y = 0 → y = −2)
3. The flip machines: reflections in a mirror (F2, F3; mirror law derivation, G-CO.9; reflection-mistakes warn callout)
4. The turn machines: rotations about a centre (F4, F5; origin rules + foreign-centre three-step machine; fixed-point fingerprint callout)
5. What never changes: the invariance census (F6, F7; shoelace derivation; census table)
6. Drawing the image: the graph-paper craft (F8, F9; motion-rule table; Illustrations 1–3)
7. Why this matters: congruence redefined (G-CO.6), symmetry doorstep (5.3 preview), exam corner
+ formula cards (5), terms (12), quiz (5), exercises (15: L1×2, L2×3, L3×3, L4×3, L5×2, L6×2).

## Pins re-derived / catches

All 24 master pins (51.01–51.24) reproduce exactly — **no pinned number deviated**. Two engine catches during staging, both fixed to the engine's value:

1. **Illustration 1 side order** (E07): the harness first asserted sides in order 3, 2, √13; the triangle (1, 1), (4, 1), (1, 3) under T_(2, −1) gives |AB| = 3, |BC| = √13 ≈ 3.6055513, |CA| = 2 in triangle order. Engine value confirmed: **3, √13 ≈ 3.6055513, 2, all preserved exactly** (and signed area +3 → +3). Prose/caption written to the engine's values; a labelling-order bug, not a pin deviation.
2. **Exercise 9 answer containment** (P08): the answer token 'R180' was not literally inside the solution ('R_{180}'); the answer was rewritten as '$R_{180}$ about the origin …' so the numeric core '180' matches the solution chain. No numeric change.

Also re-derived (engine values): √26 ≈ 5.0990199; √17 ≈ 4.1231056; √18 ≈ 4.2426407; √13 ≈ 3.6055513; the closed foreign-centre rule (a − (y − b), b + (x − a)) checked against the translate-turn-translate machine on a 4-point sweep; the R90-about-(2, 3) image of the origin (5, 1) for Illustration 3 (E38, added for the Illustration).

## Discipline notes

- Staged seat honoured: v-geo501.ts engine went green (38/38) BEFORE prose hardened; part saved skeleton-first, sections landed one at a time, valid TS after every save; harness run after each stage.
- Working window respected (~25 min of the 40-minute window).
- No other part/v/spec/report file, no ch-0*.ts, no book.ts, no scripts modified; no git commits.
