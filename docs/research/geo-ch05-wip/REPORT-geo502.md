# REPORT — geo502 (seat two, RUN 131) — Lesson 5.2 "Composing Transformations and the Isometry Idea"

## Output files (the three seats of this task)
1. `docs/research/geo-ch05-wip/part-geo502.ts` — the lesson part (`export const lessonGeo502: Lesson`)
2. `docs/research/geo-ch05-wip/v-geo502.ts` — verify-first engine + pin harness
3. `docs/research/geo-ch05-wip/REPORT-geo502.md` — this report

## End state (the command of record)
`bun run docs/research/geo-ch05-wip/v-geo502.ts` →
- **geo502-engine: 46 pass, 0 fail**
- **geo502-pins: 46 pass, 0 fail**
- **geo502 TOTAL: 92 pass, 0 fail** — exit 0, all green.
Additionally `tsc --noEmit --strict --target esnext --module esnext` passes clean on both files.

## Scores / counts
| Item | Value |
|---|---|
| Word count (`countLessonWords`) | **10,668** (floor 9,000, target ~10,000+) |
| Engine score | 46/46 |
| Pins score | 46/46 (92/92 total) |
| Body figures | **11** (F1–F11, all code-computed SVG, all referenced in prose) |
| Solution figures | **3** (S1 two-mirror trace · Ex3, S2 glide-axis construction · Ex5, S3 distance-matrix witness · Ex11) |
| Quiz key | **[1,4,2,0,3]** (5 MCQ; item 2 carries index 4 → five options) |
| Exercises | 15, sets spanning L1–L6, full step solutions + answers, numeric-core containment verified (P08) |
| Headings | 8 sections |
| Concepts / objectives | 8 (from the pinned set) / 5 |
| Palette / helpers | `c52` (ink #115e59, mid #0f766e, amber #d97706, orange #ea580c, red #dc2626, green #16a34a, panels #d1fae5/#e0f2fe, sep #a7f3d0, faint #6ee7b7, white, paper #f0fdfa); helpers `geo52*`; `words` field omitted |

## Sections landed (in order)
1. The composition of motions: the machine of machines (F1; definition callout)
2. Order matters: the same two machines, different destinations (F2; pinned pair (−5,1) vs (−1,1))
3. The mirror machines compose: two mirrors make a slide or a turn (F3 parallel, F4 crossing, F5 double-identity; two derivations; mirror-machine theorem callout)
4. The glide reflection: mirror plus slide, the fourth family (F7 perpendicular-collapse pinned witness, F6 footprints true glide)
5. The parity census: count the mirrors, name the motion (F8 parity tree, F9 sandwich; parity census table)
6. The isometry idea: what rigid motions never change (G-CO.6 theorem callout; undo-law derivation; 5 formula cards)
7. Congruence re-read: two figures, one motion (G-CO.7/8; F10 witness; F11 non-isometry; composition census table; exam corner)
8. Composing transformations in action: three worked chains (Illustrations 1–3) + terms census (12 items) + quiz + exercises

## Pinned numbers — every one re-derived in TS (E01–E46), all matching
Order-matters pair; glide witness values and the y = 1.5 join midpoints; parallel mirrors x = 1/x = 4 → T_(6,0) on (0,0) and (1,2); crossing mirrors y = x then x-axis → (2,5) → (5,−2) = (y,−x); double-mirror identity on (3,2); undo law on (5,1); sandwich triangle → (0,4),(4,4),(1,7) with sides 4, √18, √10 preserved; congruence pair with identical 4-3-5 matrices carried by T_(6,5); dilation k = 2 length 3 → 6 (triangle 4,3,5 → 8,6,10).

## Pins re-derived / engine catches (flagged per the "engine wins" discipline)
1. **E19 (caught at engine stage, before prose):** my draft witness for the y = x / y = −x pair claimed (4,1) → (−1,−4). The engine's value is **(−4,−1)** — F_{y=−x}∘F_{y=x} maps (4,1) → (1,4) → (−4,−1), which matches R_{180} exactly. The exercise (Ex14) prints the engine's value; the draft number never reached prose.
2. **Glide pin re-interpreted honestly (no number changed):** the pinned "glide (mirror x-axis, then slide (0,3))" values all reproduce exactly — (4,1) → (4,2), (1,0) → (1,3), join midpoint (4,1.5) on y = 1.5 — but the engine verdict (E08) is that this perpendicular slide **collapses to the single reflection in y = 1.5** (it fixes that line, so it is not a glide). The prose prints the pinned numbers verbatim and teaches the collapse (Figure F7 + warn callout "a shifted mirror is not a glide"), then builds the true along-mirror glide g(x,y) = (x+2,−y) with engine-derived witnesses: (4,1) → (6,−1), join midpoints on y = 0, zero fixed points on a 21×21 grid, g∘g = T_(4,0), infinite order (E09–E13).
3. **Order-matters deepened (E03):** both pinned compositions are themselves single reflections — F_{x=0}∘T_(2,0) = mirror x = −1, T_(2,0)∘F_{x=0} = mirror x = 1 — engine-verified and added as the "beautiful postscript" paragraph; the pinned pair (−5,1)/(−1,1) is printed unchanged.

## Law compliance spot-check (all enforced by the pin harness)
- SVG text: plain (no `$`, no backslash TeX); minus is U+2212 only (P09d regex-clean); palette hexes all from `c52`; strokes ≥ 1.2; font sizes 11–14.5; role="img" + aria-label + viewBox on all 14 SVGs; no label clips (P09h, incl. one real fix: an empty `<text>` in S2 removed).
- Prose math `$...$` only; no `$$`, no `\qquad`; no raw TeX outside math spans; headings plain; no `words` field; APPEND TAIL marker in place; `export const lessonGeo502: Lesson`; prerequisites/sources exactly per spec.
- **KaTeX hygiene catch:** the draft used literal `\u2212`/`\u2032` sequences inside math spans; a KaTeX probe showed `\u` parses as the breve text accent (renders garbage under strict warn), so all such spans were converted to the real − character and `^{\prime}`; katex render probe passes clean for every pattern used (−, ′ via `^{\prime}`, ∘, →, θ, °, √, \text, \mathrm).

## Staged-seat log
Engine green first (46/46 after one engine-side catch, E19) → part skeleton + §1–3 → §4–5 → §6–7 + illustrations + terms + formula cards → quiz + exercises → final run ALL GREEN (92/92, exit 0). Valid TS at every save; harness tolerated the missing part only mid-staging.
