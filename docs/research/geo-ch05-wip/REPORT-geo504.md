# REPORT-geo504 — Lesson 5.4 'Dilations, Scale Factors and Similarity Re-Read' (RUN 131, seat 4/4)

## Output files (the three, and only the three)

| File | Role |
|---|---|
| `docs/research/geo-ch05-wip/part-geo504.ts` | the lesson (`export const lessonGeo504: Lesson`), valid TS, APPEND TAIL marker in place |
| `docs/research/geo-ch05-wip/v-geo504.ts` | verify-first ENGINE + PIN harness (tolerates missing part mid-staging; pins armed once the part landed) |
| `docs/research/geo-ch05-wip/REPORT-geo504.md` | this report |

No other file was touched (specs, sibling parts, book.ts, ch-0*.ts, scripts read-only, no git commits).

## Final harness state

`bun run docs/research/geo-ch05-wip/v-geo504.ts` → **engine 49 pass / 0 fail, pins 47 pass / 0 fail, TOTAL 96 pass / 0 fail, exit 0.**

- ENGINE score: **49/49** — every pinned value re-derived by brute force in TypeScript (dilation machine at all five pinned settings + inverse runs; distance/area/perimeter laws; dot-product angle witness + cosine-rule invariance; line laws; k-from-images reads; the 2×6 vs 3×4 walking audit + diagonal third read; the 1:3 family; the Thales shadow machine; the 3-4-5 altitude segments and all six small-triangle ratios; both similitude centres incl. five probe points under both homotheties; the dilate-then-translate collapse; the hidden-centre recovery; the 9-copy area grid; the quiz/exercise witness sweep).
- PINS score: **47/47** — identity fields, sources `[geo-common-core-gco-ground-131, geo-im-rigid-motion-ground-131]`, prerequisites (5.1, 5.2, 4.1, 4.2, 4.3, 4.4), quiz key + tokens + full why-each-fails explains, 15 exercises spanning L1–L6 with steps ≥ 3 + answers + numeric containment, figure counts, SVG hygiene (role/aria/viewBox, plain text, U+2212 minus law, c54 palette, strokes ≥ 1.2, fonts 11–14.5, no label clipping), math-span laws, terms ≥ 6, formula cards ≥ 3, ≥ 2 derivations, exam callout, census tables, 20-token printed-number census, word floor.

## Lesson census

- **Word count: 11,178** (`countLessonWords`; floor 9,000, target 10,000+ — met).
- **Body figures: 10** (F1 machine, F2 k-family, F3 negative-k half-turn, F4 area–k² nine-copy grid, F5 ray structure, F6 2×6-vs-3×4 refusal, F7 the 1:3 family, F8 Thales shadow dilation true-to-scale at 26 px/m, F9 3-4-5 altitude as two dilations, F10 similitude centres true-to-scale at 28 px/unit) — all code-computed SVG, every one referenced in prose.
- **Solution figures: 6** — 3 in examples (S1 foreign-centre construction, S2 compact shadow dilation, S3 similitude ratio strip) + 3 in exercises (S4 area-dial bars, S5 walking audit, S6 hidden-centre recovery) ≥ 3 required.
- **Quiz key: [0, 3, 2, 4, 1]** (pinned, verified; item 4 carries five options).
- **Exercises: 15** at L1:2, L2:3, L3:3, L4:3, L5:2, L6:2 — all with full Cengage step solutions + terminal answers.
- **Sections landed (9 headings):** 1 the dilation machine; 2 reading k off images (both ways, foreign centres); 3 the |k|, k² census (incl. line laws + 3 derivations across the lesson); 4 the honest non-similarity; 5 similarity re-read = dilation + motion (AA/BPT/4.1 re-reads by number, Thales re-read); 6 Pythagoras re-read (altitude as two dilations, leg² laws as scale arithmetic); 7 the doorstep: centres of similitude; 8 three worked chains (examples); 9 the collected law (5 formula cards + exam corner) — then terms (12), quiz, exercises.

## Pinned numbers — all printed exactly as pinned (54.01–54.22 of `scripts/pin_check_geo131.py`)

D origin k=3: (2,1)→(6,3); k=1/2: (4,6)→(2,3); k=−2: (1,2)→(−2,−4) · D_(1,1) k=2: (3,5)→(5,9); D_(2,3) k=1/2: (6,7)→(4,5) (both read forward AND inverse) · segment 5 → 15 with images (3,3),(12,15) · area 6 → 54 (k²=9) → 1.5 (k=1/2); perimeter 12 → 36 · right angle preserved, (12,0)·(0,9)=0 · y=2x+1 → (0,3),(3,9) slope 2 (parallel image y=2x+3); y=2x self-map ((1,2)→(3,6)) · k read off (2,3)→(5,7.5): 2.5, area ratio 2.5²=6.25 · Thales re-read k=18/2.4=7.5, 1.7→12.75 (cross-check 30.6/2.4) · 3-4-5 altitude BF=1.8, FC=3.2, h=2.4, F=(1.92,1.44), 9=5×1.8, 16=5×3.2, h²=1.8×3.2=5.76, scales 3/5=0.6 and 4/5=0.8 (all six ratios) · 2×6 vs 3×4 ratios 2/3, 3/2 — no single k (diagonal √40≈6.3246 vs 5 as third read) · (1,3) dilated by 3,4,5 → (3,9),(4,12),(5,15), areas 27/48/75 · circles r=2@(0,0), r=6@(10,0): external (−5,0) 5:15=2:6 DIRECT k=+3; internal (2.5,0) 2.5:7.5=1:3 OPPOSITE k=−3 — both verified on 5 probe points.

**No spec pin was re-derived to a different value — the engine confirmed all of them before the prose hardened.**

## Catches (verify-first discipline — engine found them, prose fixed to the engine)

1. **The nine-copy area grid (engine E45).** My first tiling list for the k=3 image of the 3-4-5 witness contained two triangles that lie OUTSIDE the image ((8,0),(12,0),(12,3) and (4,3),(8,3),(8,6) — each had area 6, so an area-only check would have passed). The correct tiling is **6 upright** (at (0,0),(4,0),(8,0),(0,3),(4,3),(0,6)) **+ 3 half-turned** ((4,0),(0,3),(4,3) / (8,0),(4,3),(8,3) / (4,3),(0,6),(4,6)); the engine now also checks each copy's centroid is strictly inside 3x+4y<36. Figure F4 and prose ('six upright, three half-turned') were written to the engine's decomposition.
2. **areaSigned helper** first computed the parallelogram area (E12 read 12/108 instead of 6/54) — fixed with /2 before any prose printed an area.
3. **E42 side order**: in the dilate-then-translate witness the hypotenuse is (22,5)–(10,14) = **15**, the vertical leg is 9 — my check had them swapped; fixed.
4. **E15 angle order**: the 3-4-5 angles at vertices [(0,0),(3,0),(0,4)] read [90, 53.1301, 36.8699] — the check was re-pinned to that order (values unchanged, as the spec pins them).

Engine-derived (not spec-pinned, but engine-green before printing): the composition collapse centre **(−5,−2.5)** for dilate-k=3-then-translate-(10,5), image triangle **(10,5),(22,5),(10,14)** sides **12, 15, 9**; hidden-centre recovery **O = (−3,−1)** with prediction **(2,2)→(7,5)**; exercise predictions **(6,1)→(15,2.5)** and probe maps (2,0)→(16,0), (0,2)→(10,−6).

## Staging discipline observed

Engine written and run green (49/49) **before** any prose; the part landed in five stages (helpers+figures+S1–S6 → sections 1–3 → sections 4–7 → examples/law/terms/quiz → exercises), valid TS and harness-run after every stage; hard window respected; harness printed the staged-seat skip message while the part was partial and went fully green on landing.
