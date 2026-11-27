# REPORT — geo503 (seat 3-c, RUN 131) — Lesson 5.3 'Line and Rotational Symmetry'

## Status: COMPLETE — harness ALL GREEN, exit 0

```
=== ENGINE (recompute everything) ===
geo503-engine: 37 pass, 0 fail
=== PINS (audit the part file) ===
geo503-pins: 47 pass, 0 fail
geo503 TOTAL: 84 pass, 0 fail   (bun run docs/research/geo-ch05-wip/v-geo503.ts → exit 0)
```

## The three output files (only files touched)

1. `docs/research/geo-ch05-wip/part-geo503.ts` — the lesson part (exports `lessonGeo503: Lesson`; APPEND TAIL marker in place).
2. `docs/research/geo-ch05-wip/v-geo503.ts` — the verify-first engine + pin harness (engine runs standalone; pins auto-arm when the part lands).
3. `docs/research/geo-ch05-wip/REPORT-geo503.md` — this report.

## Headline numbers

| Item | Value |
|---|---|
| Word count (`countLessonWords`) | **12,303** (floor 8,500; target ~9,500+ — exceeded) |
| Engine score | **37 pass / 0 fail** |
| Pins score | **47 pass / 0 fail** (total 84/84, exit 0) |
| Body figures | **10** (F1–F10: sym-idea, regular census, quad three-panel, failed mirror, order wheel, 180° witness, triangle census, alphabet strip, four-way diagram, fan) |
| Solution figures | **4** (S1 sweep sketch, S2 parallelogram contradiction, S3 alphabet answer strip, S4 rectangle diagonal witness — all inside exercises) |
| Exercises | **15** — L1:3, L2:2, L3:3, L4:3, L5:2, L6:2 (spans L1..L6), full step solutions, all answer-token containment green |
| Quiz | **5 MCQ, key [4,1,0,3,2]** (item 1 carries 5 options; intended token verified inside each correct option) |
| Other blocks | 11 headings, 3 derivations, 3 examples (≥4 steps each), 16 terms, 5 formula cards, 4 tables (regular census / quadrilateral census / triangle census / four-way classification) |

## Sections landed (arc order, per spec)

1. Symmetry as motion (symmetry = motion with $M(F) = F$; line vs rotational; NCERT fold/turn readings; F1)
2. The mirror census of the regular polygons (n mirrors = order n, 360/n = 120/90/72/60/45/36 at n = 3,4,5,6,8,10; F2, T1, census + angle laws)
3. The quadrilateral census (square 4 + order 4; rectangle exactly 2 midlines, centre (3,2); rhombus exactly 2 diagonals, sides √5, diagonals 4 and 2; parallelogram 0 lines yet order 2 about (3,1) — F3, F4, T2, the vertex-chase derivation)
4. The triangle census (equilateral 3 + order 3; isosceles exactly 1; scalene 0/none — F7, T3)
5. How the census is PROVED (sweep lemma derivation: mirrors pierce the centroid; 180 one-degree candidates; verdict column 0,2,2,4,3,1,0; granularity-trap callout; F6)
6. Beyond polygons (8-spoke wheel order 8 / 45°; 5-blade fan order 5 / 72°; alphabet census A M T U V W Y / H I X / N S Z / F G J L P R / O infinite; four-way classification — F5, F10, F8, F9, T4)
7. Why symmetry earns its lesson (fixed-set view, world applications, dilation anti-symmetry bridge to 5.4, exam callout)
8–9. Collected terms & laws (16 terms, 5 formula cards) + 3 illustrated chains (octagon, rectangle-diagonal chase, letters M/S/B)
10–11. Quiz (key [4,1,0,3,2]) + 15 graded exercises (L1–L6)

## Re-derived pins (engine value vs spec — flagged catches)

1. **Scalene-triangle witness — the one substantive re-derivation.** Spec/master pinned "scalene (0,0),(5,0),(1,3): 0 mirror lines". The engine shows that triangle is **not scalene**: |AB| = |BC| = 5 exactly (isosceles, sides 5, 5, √10), with a genuine mirror line through B(5,0) and the AC-midpoint (0.5,1.5) at direction 161.565° (slope −1/3) — which the master's 1-degree sweep never samples, so the master's census returned 0 vacuously. Engine verdict (direct line-survival check, E19b): that line IS a mirror. Fix: the lesson uses the honestly scalene witness **(0,0),(5,0),(2,3)** (sides 5, √18 ≈ 4.2426407, √13 ≈ 3.6055513 — all different; 0 mirror lines at half-degree granularity, order 1). Documented in prose (Section 4 honesty note + Section 5 granularity-trap callout). The isosceles pin (0,0),(4,0),(2,3): exactly 1 — unchanged and green.
2. **Sweep granularity for the regular family** — the octagon's mirror axes sit at 22.5° multiples, so the engine's regular-n-gon sweep runs at half-degree (360 candidates); the pinned quadrilateral/triangle sweeps stay at the canonical 180 one-degree candidates (all their axes sit on integer degrees). No pinned value changed; E02/E04 record the granularity.
3. Everything else matched the pinned set exactly on first compute: regular angles 120/90/72/60/45/36; rectangle centre (3,2), 2 midlines, vertex map (0,0)→(6,4) etc.; parallelogram centre (3,1), 0/180 survivors, sides 5 vs √5 = 2.2360680, chase images (4,3)/(2,−1); rhombus sides √5, diagonals 4 and 2, survivors [0°, 90°]; square [0°, 45°, 90°, 135°], order 4; wheel 8/45°; fan 5/72°; N/Z rotational-only (0 mirrors, order 2 by coordinate outline); rectangle-diagonal chase images (30/13, 72/13) ≈ (2.3077, 5.5385) and (48/13, −20/13) ≈ (3.6923, −1.5385).

## Compliance notes

- U+2212 minus in SVG text (P09d green); no TeX in SVG strings (P09c green); `$...$` prose math only — no `$$`, no `\qquad` (P10a/b green); no raw TeX outside math (P10c green); plain-text headings (P10d green).
- No `words` field (P15); `export const lessonGeo503: Lesson`; APPEND TAIL marker present.
- All SVG hexes from the c53 palette; strokes ≥ 1.2; font sizes 11–14.5; no label clips (P09e–h green); role="img" + aria-label + viewBox on all 14 SVGs (P09a/b green).
- Identity fields exact: id `geo-line-and-rotational-symmetry`, number '5.3', title 'Line and Rotational Symmetry'; sources [geo-ncert-symmetry-ground-131, geo-common-core-gco-ground-131]; prereqs [geo-rigid-motions-slides-flips-and-turns (5.1), geo-composing-transformations-and-the-isometry-idea (5.2)].
- Staged-seat discipline held: engine went green (36→37 checks) BEFORE prose hardened; part file was valid TS after every staged write.
