# FIGURE AUDIT LOG — append-only record of the strict visual verification sweep

> Format: `date | lesson | figure | layer | verdict | notes`. See
> `docs/project/FIGURE_VERIFICATION_PROTOCOL.md` for the rubric and the ladder.

## 2026-11-11 — run 91 (AA ch. 1, lessons 1.3 + 1.4 — the first protocol run)

- 2026-11-11 | aa-composition-machines-in-series | fig 1 (composite conveyor, 18 texts) | DOM overlap+clip | 0 issues | manual detector pass, live page.
- 2026-11-11 | aa-composition-machines-in-series | fig 2 (inheritance wirings, 25 texts) | DOM overlap+clip | 0 issues | live page.
- 2026-11-11 | aa-composition-machines-in-series | fig 1 | VLM strict (pass 1) | FAIL | red "8 ↦ 40 unused wiring" annotation collided with the 8↦40 arrow and node 8.
- 2026-11-11 | aa-composition-machines-in-series | fig 2 | VLM strict (pass 1) | FAIL | witness label covered the 2→1 amber arrow, making the stated collapse g(1)=g(2)=1 invisible.
- 2026-11-11 | aa-composition-machines-in-series | fig 1 | VLM strict (pass 2) | FAIL | relocated annotation now crossed the dashed teal arcs at the label band.
- 2026-11-11 | aa-composition-machines-in-series | fig 2 | VLM strict (pass 2) | PASS | label moved under the panel title; both amber arrows visible.
- 2026-11-11 | aa-composition-machines-in-series | fig 1 | VLM strict (pass 3) | FAIL | arcs clean, but the pass escalated: the three set labels straddled the ellipse top strokes.
- 2026-11-11 | aa-composition-machines-in-series | fig 1 | VLM strict (pass 4) | PASS | annotation folded into a red bottom line below the arc trough (y=372); set labels lifted to y=20 above the ellipses.
- 2026-11-11 | aa-inverse-functions-the-machine-undone | fig 1 (three-panel invertibility, 26 texts) | DOM overlap+clip | 0 issues | live page.
- 2026-11-11 | aa-inverse-functions-the-machine-undone | fig 2 (y = x mirror, 9 texts) | DOM overlap+clip | 0 issues | live page.
- 2026-11-11 | aa-inverse-functions-the-machine-undone | fig 1 | VLM strict (pass 1) | FAIL | (a) panel-ii annotation clipped behind node 1; (b) panel-iii GEOMETRY WRONG — arrow 2→8 drawn while the caption says "8 never hit".
- 2026-11-11 | aa-inverse-functions-the-machine-undone | fig 2 (mirror) | VLM strict (pass 1) | PASS | labels, slopes, intercepts, marked partners (2,5)/(5,2), mirror crossing at (−1,−1) all verified.
- 2026-11-11 | aa-inverse-functions-the-machine-undone | fig 1 | VLM strict (pass 2) | PASS | panel ii annotation moved to the clear band; panel iii rebuilt honestly: B = {6, 8, 10}, arrows 1→6 and 2→8 only, target 10 unhit with its label; caption updated to match.
- 2026-11-11 | run 91 sweep | queue status | — | INFO | sweep initiated by docs/project/FIGURE_VERIFICATION_PROTOCOL.md §6: the 4 figures of the lessons authored this run audited; the shelf-wide queue (217 SVGs + 28 covers) awaits its builder script in a future fire.

## Historical (pre-protocol, recorded for the trail)

- 2026-11-11 | ans-square-and-cube-root-crafts | gnomon + division panel | VLM strict | PASS | after two clipping catches fixed (gnomon caption split to two lines; panel bottom line split, viewBox 392 → 414) — the audit-turn record.
- 2026-11-11 | aa-relations + aa-one-one-and-onto | all four figures | VLM strict | PASS | run-90 record (arrow diagram, mod-5 classes, probe twins, pigeonhole panel).

## 2026-11-11 — the dedicated figure-audit job stands up (owner-directed turn)

- 2026-11-11 | — (queue build) | — | INFO | FIGURE_AUDIT_QUEUE.json built by `scripts/build_figure_audit_queue.ts`: 125 lessons / 221 figures (FM 48/92, ANS 36/47, AL 37/74, AA 4/8), pre-written books first per the owner directive, 5 lessons seeded done from the records above, cursor 0; rebuilds are progress-preserving (statuses never wiped).
- 2026-11-11 | — (reconciliation) | — | INFO | the gateway snapshot commit dcad9d7 carries the audit turn's DOM-level figure label fixes across FM/ANS/AL (e.g. the AL 1.2 anchor-scale tick shortened y2 128→112) plus escaped-unicode rewrites — those lessons remain PENDING in the queue and get their strict VLM pass in sweep order; nothing is pre-cleared by a DOM-only fix.
- 2026-11-11 | — (suite health) | — | INFO | the verifier suite refreshed to current reality by the same turn: verify-book3 ch01/ch02/ch05/ch07/ch09/ch10/ch11 ALL GREEN (one dcad9d7 regression — the ch-01 library census check — restored; six stale run-era snapshots refreshed to the post-audit state: AL 37 lessons, 11-of-12 chapters with ch. 12 planned, library 125).

## 2026-11-11 — fire 1 of the dedicated figure-audit job (job 524541, ~21:05-22:35 IST) — FM sweep items 1-12 (12 lessons / 18 figures)

- 2026-11-11 | — (quota) | — | INFO | the z-ai vision endpoint returned 429 for the whole window (retried at 0/1/5/12 min); layer 2 executed as AUDITOR-MODEL VISION instead — the fire's own multimodal reads of 980px figure montages (scripts/figure-audit-montage.py), same strict rubric; z-ai vision PASS retained for the one figure it did audit before the block.
- 2026-11-11 | fm-numbers-digits-place-value | figs 1-2 (seat chart + number line) | DOM overlap+clip | 0 issues | layer 1, scripts/audit-svg-overlaps.sh.
- 2026-11-11 | fm-numbers-digits-place-value | fig 1 (one digit four seats) | VLM strict (z-ai vision, pre-block) | PASS | 3 x10 arrows attach 5→50→500→5000; contributions 5x10^0..10^3 correct.
- 2026-11-11 | fm-numbers-digits-place-value | fig 2 (number line -10..10) | auditor vision | PASS | 7 at seven right, -4 at four left; origin marked; bold every 5th.
- 2026-11-11 | fm-numbers-digits-place-value | figs 1-2 | dark mode | PASS | cream figure cards, all strokes/labels legible.
- 2026-11-11 | fm-comparing-ordering-numbers | figs 1-2 | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-11 | fm-comparing-ordering-numbers | fig 1 (seat-by-seat 4589 vs 4598) | auditor vision | PASS | digits match numerals; tens seat tinted; difference-9 note correct.
- 2026-11-11 | fm-comparing-ordering-numbers | fig 2 (domination bound) | auditor vision | PASS | top bar to 10 = (9-8)x10, bottom to 9 = 9x1, dashed gap 1 unclosable.
- 2026-11-11 | fm-rounding-and-estimating | fig 1 (rounding line 40..50) | DOM + auditor vision | PASS | 43 down / 47 up / midpoint 45 dashed; arcs attach right endpoints.
- 2026-11-11 | fm-addition-carrying | figs 1-2 | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-11 | fm-addition-carrying | fig 1 (4+3 / 3+4 jumps) | auditor vision | PASS | both hops land on 7; commutativity drawn.
- 2026-11-11 | fm-addition-carrying | fig 2 (column seat map) | auditor vision | FAIL | carry pills sat above the BIRTHING columns' left edges (pill 3 above ONES - a carry into ones is impossible); aria+caption both describe pills above the RECEIVING tens/hundreds/thousands.
- 2026-11-11 | fm-addition-carrying | fig 2 | fix in SVG (ladder 1) | FIXED | pills moved to receiving columns (centers 215/355/495), leaders re-drawn birthing-top→landing-pill, "each carry = 1" note re-anchored (ch-02.ts).
- 2026-11-11 | fm-addition-carrying | fig 2 | auditor vision (re-audit) | PASS | pills above tens/hundreds/thousands; leaders attach correctly; DOM re-gate 0 issues.
- 2026-11-11 | fm-subtraction-borrowing | figs 1-2 | DOM + auditor vision | PASS | 3-7 lands at -4 beyond the edge; struck digits 4→3, 5→15; result 1,825.
- 2026-11-11 | fm-multiplication-repeated-addition | figs 1-2 | DOM + auditor vision | PASS | 4x6 four +6 arcs / 6x4 six +4 arcs; partial rows 1,482 + 7,410 (dashed 0 shift) = 8,892.
- 2026-11-11 | fm-division-remainders-zero | figs 1-2 | DOM + auditor vision | PASS | 24÷6 / 25÷6 r1 landings; tableau verified at SOURCE precision: quotient 2/4/7 over chunk-end seats, 72 under 88, bring-down circles on 9 then 2, 252 rows aligned.
- 2026-11-11 | fm-order-of-operations | fig 1 (two expression trees) | DOM + auditor vision | PASS | 8+(2x5)=18 vs (8+2)x5=50 trees; precedence node tinted.
- 2026-11-11 | fm-divisibility-and-its-tests | fig 1 (screening desk) | DOM + auditor vision | FAIL | drawing shows SEVEN screens but caption said "six" (folding the 7-test into the sixth) and aria said "six divisibility screens" — count mismatch (lesson prose elsewhere carries no count).
- 2026-11-11 | fm-divisibility-and-its-tests | fig 1 | fix caption+aria (ladder 1) | FIXED | caption → "seven screens … the sixth splits … the seventh, for the stubborn 7 …"; aria → "seven divisibility screens" (ch-03.ts).
- 2026-11-11 | fm-divisibility-and-its-tests | fig 1 | auditor vision (re-audit) | PASS | 7 boxes = 7 screens = caption = aria; DOM re-gate 0 issues.
- 2026-11-11 | fm-prime-numbers-factorisation | fig 1 (two factor trees for 60) | DOM + auditor vision | PASS | 6x10 and 4x15 roads both end in 2,2,3,5; 60 = 2^2·3·5.
- 2026-11-11 | fm-highest-common-factor | fig 1 (HCF Venn 96/720) | DOM + auditor vision | PASS | regions 2 / 2·2·2·2·3=48 / 3x5; everything 2x48x15=1,440; 48x1,440=69,120=96x720.
- 2026-11-11 | fm-lowest-common-multiple | fig 1 (two bus timelines) | DOM + auditor vision | PASS | rings at 36/72/108 on both lanes; ticks every 12 / 18 correct.
- 2026-11-11 | run 524541 fire 1 | layer 1.5 (scripts/figure-audit-domvalues.sh) | INFO | all 18 figures: viewBox+aria present, 0 raw-$, 0 raw-^, 0 blue/indigo palette hits; every drawn value cross-read against the lesson math (4589+2764=7353; 4589-2764=1825; 1482+7410=8892; 8892=247x36; HCF/LCM identities) — all correct.
- 2026-11-11 | run 524541 fire 1 | gates | INFO | lint 0 errors; tsc 0 errors; verify-unit-2 165/165; verify-unit-3 260/260; E2E smoke (scripts/figure-audit-smoke.sh) on both changed lessons x 1280 + 390 + dark: route 200, figures render, quiz 5/5 on intended keys ([0,1,2,1,2] / [2,3,1,2,3]), KaTeX 0 errors, 0 console errors, no overflow.
- 2026-11-11 | run 524541 fire 1 | queue | INFO | items 1-12 flipped done (2 fixed-then-PASS, 16 straight PASS); 17 done / 108 pending; next fire starts at fm-hcf-lcm-and-how-they-relate.

## 2026-11-12 — fire 2 of the dedicated figure-audit job (job 524541, ~22:30-01:55 IST) — FM sweep items 12-23 (12 lessons / 23 figures)

- 2026-11-12 | — (quota) | — | INFO | z-ai vision endpoint RECOVERED this window (fire 1's 429 block gone): layer 2 executed as true VLM strict audits via 900px figure montages (6 contact sheets over 23 figures), same §4 prompt; three montage-scale misreads (hcf-lcm right square "9 cells"/"4 cells", ratio ×2 row "5 dots") were each re-verified at full resolution + against the SVG source and DISMISSED as false positives — the targeted high-res re-audit confirmed the right square exactly (1 vertical + 2 horizontal dividers → 6 cells, 2 across × 3 up, VERDICT PASS) and the source circle-count is 3/5, 6/10, 9/15 exact. Montage-header "Figure n" vs per-lesson figcaption numbering flagged twice — montage artifact, not a defect (captions restart per lesson by design).
- 2026-11-12 | fm-hcf-lcm-and-how-they-relate | figs 1 (product rule) | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | fm-hcf-lcm-and-how-they-relate | fig 1 | VLM strict (pass 1) | FAIL | left 6×4 rectangle drawn with unit-cell dividers (6 cols × 4 rows of 1-unit cells) while caption + label claim six 2×2 tiles "3 across, 2 down" — tile grouping invisible. (Vision's parallel claim "right square 3×3 = 9 cells" disproven by source + high-res re-audit.)
- 2026-11-12 | fm-hcf-lcm-and-how-they-relate | fig 1 | fix in SVG (ladder 1) | FIXED | unit-cell dividers → tile dividers: verticals at x=96,144 + horizontal at y=118 — exactly six 2×2 tiles (ch-03.ts); right panel untouched (verified correct).
- 2026-11-12 | fm-hcf-lcm-and-how-they-relate | fig 1 | VLM strict (re-audit) | PASS | left shows six 2×2 tiles, right shows six 6×4 copies (2 across, 3 up); dark-mode pass also PASS (cream card, crisp strokes).
- 2026-11-12 | fm-idea-of-a-fraction | figs 1-2 | DOM + VLM strict | PASS | quarters line 3/4 + 7/4=1 3/4 with eighths magnification all placed; Egyptian bar 6 cells/5 shaded, brackets 1/2=3 cells + 1/3=2 cells. Cosmetic (logged, 1 nit, no fix per rubric §2.9): "the last 1/6" label implies its cell without a bracket/leader, unlike the other two.
- 2026-11-12 | fm-equivalent-fractions-simplification | figs 1-2 | DOM + VLM strict | PASS | 3/4=6/8=12/16 shading aligns across all three rulers; 18-ruler 1/3=6/18 vs 2/3=12/18=4/6, cross-products 2×6=12=3×4. Cosmetic: 1/3=6/18 label a hair off tick center.
- 2026-11-12 | fm-comparing-fractions | figs 1-2 | DOM + VLM strict | PASS | 7/12=14/24 vs 5/8=15/24 with the deciding twenty-fourth tinted; number line 7/11<2/3<4/5 verified proportional (positions measured by the auditor).
- 2026-11-12 | fm-adding-subtracting-fractions | figs 1-2 | DOM + VLM strict | PASS | 1/4+1/6 stacking on the 12-ruler = 5/12; subtraction gap 5/8−7/12=1/24 with the 1/24 sub-tick drawn. Cosmetic: dashed contribution boundary in the sum bar faint but present.
- 2026-11-12 | fm-multiplying-dividing-fractions | figs 1-2 | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | fm-multiplying-dividing-fractions | fig 2 | VLM strict (pass 1) | FAIL | figcaption stated "3/4 sits at 550 px" AND "6 × 85 = 510 px of the 680 px unit" — two unreconcilable frames (550 is the screen x with the 0-tick at x=40; 510 is the distance from 0; the offset is never stated), a material inconsistency for the reader.
- 2026-11-12 | fm-multiplying-dividing-fractions | fig 2 | fix caption (ladder 1) | FIXED | px apparatus removed — caption now count-based: "cut into eighths; 3/4 sits six eighth-steps from 0. The arc spans exactly those six steps — so 3/4 ÷ 1/8 = 6 …" (ch-04.ts); SVG geometry untouched (verified exact: 0 at x=40, unit 680 px, ticks every 85, 3/4 marker at 40+510).
- 2026-11-12 | fm-multiplying-dividing-fractions | fig 2 | VLM strict (re-audit) | PASS | caption reads clean, arc 0→3/4 with 3/4 bold at the sixth tick.
- 2026-11-12 | fm-multiplying-dividing-fractions | fig 1 | DOM + VLM strict | PASS | overlap rectangle: 5 cols × 3 rows, 3 shaded cols × 2 shaded rows → 6 of 15 = 2/5 = 2/3 × 3/5. Cosmetic: right-edge 3/5 label sits beside the unshaded columns (ambiguous placement only).
- 2026-11-12 | fm-decimal-places-and-the-point | figs 1-2 | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | fm-decimal-places-and-the-point | fig 1 | VLM strict (pass 1) | FAIL | in-figure bottom line "one number, seven places, every digit counted in its own column" — 305.274 has SIX digits and the chart draws six digit columns (the prose's separate "seven places" line refers to a different number, 42.357, under a hypothetical mirror).
- 2026-11-12 | fm-decimal-places-and-the-point | fig 1 | fix in SVG (ladder 1) | FIXED | "seven places" → "six places" (ch-05.ts).
- 2026-11-12 | fm-decimal-places-and-the-point | fig 1 | VLM strict (re-audit) | PASS | fix landed; decomposition 300+0+5+0.2+0.07+0.004 correct.
- 2026-11-12 | fm-decimal-places-and-the-point | fig 2 | DOM + VLM strict | PASS | 2.7 on tenths ruler → 2.74 on hundredths zoom, all 11 tick labels correct each panel. Cosmetic: dashed leaders terminate at ruler endpoints rather than the highlighted 2.7 dot.
- 2026-11-12 | fm-decimals-and-fractions-two-ways | figs 1-2 | DOM + VLM strict | PASS | 1/7 carousel: remainders 1→3→2→6→4→5→1 with digits 142857 verified step-by-step; three-lane atom map: 7/8=0.875 (3 places), 5/12 head-2-cycle-1, 1/3, 1/7, 1/11 all correct.
- 2026-11-12 | fm-operating-on-decimals | figs 1-2 | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | fm-operating-on-decimals | fig 1 | VLM strict (pass 1) | FAIL | bottom strip chained equality "4.75 × 10 = 47.5 × 10 = 475" is false as written (implies 47.5 = 475); prose states the honest two-step form.
- 2026-11-12 | fm-operating-on-decimals | fig 1 | fix in SVG (ladder 1) | FIXED | → "4.75 × 10 = 47.5, again × 10 = 475" (ch-05.ts), matching the prose; spacing verified clear of the ÷ strip.
- 2026-11-12 | fm-operating-on-decimals | fig 1 | VLM strict (re-audit) | PASS | fix landed; rooms/digits/point leader correct. Cosmetic: "the point" label a touch left of the dot.
- 2026-11-12 | fm-operating-on-decimals | fig 2 | DOM + VLM strict | PASS | long-division tableau 128.76 ÷ 12 = 10.73: quotient point aligned, bring-downs 7 and 6 marked, 12 × 10.73 = 128.76 check.
- 2026-11-12 | fm-percent-and-its-meaning | figs 1-2 | DOM + VLM strict | PASS | 100-square: 25% + 10% builds 35 cells = 7/20 = 0.35; conversion map arrows + benchmark strip all correct.
- 2026-11-12 | fm-percentage-change-discounts-simple-interest | figs 1-2 | DOM + VLM strict | PASS | round-trip 12,500 →15,000 (×6/5) →12,500 (×5/6) with the wrong ticket to 12,000 labelled; two-lane CP 600→690 / MP 750→690 both verified. Cosmetic: wrong-ticket arrow terminates at the original box while landing value 12,000 lives in the label (stylization).
- 2026-11-12 | fm-ratio-as-a-comparison | figs 1-2 | DOM + VLM strict | PASS | dot rows counted exact 3/5, 6/10, 9/15 (vision's "5 dots" misread disproven by source + own render count); sharing bar 1,200 ÷ 8 = 150/part → 450 + 750 with both checks. Cosmetic: 3-parts/5-parts tags sit inside cells rather than centered under brackets.
- 2026-11-12 | run 524541 fire 2 | layer 1.5 (scripts/figure-audit-domvalues.sh) | INFO | all 23 figures: viewBox+aria present, 0 raw-$, 0 raw-^, 0 blue/indigo palette hits; every drawn value cross-read against the lesson math (1/4+1/6=5/12; 5/8−7/12=1/24; 2/3×3/5=2/5; 305.274 six-place decomposition; 4.75→47.5→475 hop chain (values right; the chained-equality FORM was caught as false by the vision pass below and fixed); 128.76=12×10.73; 35%=7/20; 12,500×6/5=15,000×5/6; 1,200÷8=150; cross-test 45=45) — all correct.
- 2026-11-12 | run 524541 fire 2 | gates | INFO | lint 0 errors (5 pre-existing warnings); tsc 0 errors; verify-unit-3 260/260; verify-unit-4 330/330; verify-unit-5 455/455; verify-unit-6 444/444; E2E smoke (scripts/figure-audit-smoke.sh) on all 4 changed lessons × desktop 1280 + mobile 390 + dark: route 200, figure counts exact, no zero-size, honest aria, KaTeX 0 errors, quiz 5/5 on intended keys ([2,1,2,3,1] / [1,2,1,0,3] / [1,2,3,1,2] / [2,1,2,0,1]), 0 console errors, no overflow. (Dev server reaped mid-run twice by the sandbox — restarted with setsid+nohup inline with the smoke, per fire 1's known issue.)
- 2026-11-12 | run 524541 fire 2 | queue | INFO | items 12-23 flipped done (4 fixed-then-PASS, 19 straight PASS, 3 vision misreads dismissed on evidence); 29 done / 96 pending; next fire starts at fm-rates-and-unit-rates.

## 2026-11-12 — run 92 (authoring job 523435) — new-lesson figure audits (AA 1.5 + 1.6, 4 figures)

- 2026-11-12 | aa-function-zoo-modulus-signum-gif-elementary-catalog | fig 1 (six-panel catalog) | DOM overlap+clip | 0 issues | layer 1, live page.
- 2026-11-12 | aa-function-zoo-modulus-signum-gif-elementary-catalog | fig 1 | VLM strict (pass 1) | FAIL | the six domain/range caption lines ran together into one overlapping run-on band across the panel row (each caption wider than its 104px panel).
- 2026-11-12 | aa-function-zoo-modulus-signum-gif-elementary-catalog | fig 1 | fix in SVG (ladder 1) | FIXED | captions re-cut to two compact lines per panel (D: line + R: line, ≤ 13 chars each, font 10.5) — no panel boundary touched.
- 2026-11-12 | aa-function-zoo-modulus-signum-gif-elementary-catalog | fig 1 | VLM strict (re-audit) | PASS | captions centered, no collision, all six graphs match their names.
- 2026-11-12 | aa-function-zoo-modulus-signum-gif-elementary-catalog | fig 2 (staircase + sawtooth) | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | aa-function-zoo-modulus-signum-gif-elementary-catalog | fig 2 | VLM strict | PASS | staircase solid-left/open-right per stair verified incl. the [−0.6] = −1 witness; sawtooth 0→1 resets with the {−0.6} = 0.4 witness and the period-1 dashed marker; two cosmetics logged (period label near tooth tops; witness label near an open dot — no overlap).
- 2026-11-12 | aa-even-and-odd-functions-and-extensions | fig 1 (mirror + half-turn) | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | aa-even-and-odd-functions-and-extensions | fig 1 | VLM strict | PASS | (x,y)→(−x,y) same-height leader on the parabola and (x,y)→(−x,−y) through-origin leader on the cubic both attach correctly; labels clear.
- 2026-11-12 | aa-even-and-odd-functions-and-extensions | fig 2 (two mirrors of x+1) | DOM overlap+clip | 0 issues | layer 1.
- 2026-11-12 | aa-even-and-odd-functions-and-extensions | fig 2 | VLM strict (pass 1) | FAIL | four catches: "]" clipped at the right frame edge on the f(x) = x + 1 label; stray hinge circles off the y-axis; a filled dot where the open-at-0 domain demands an open circle; the teal witness leader struck through its label.
- 2026-11-12 | aa-even-and-odd-functions-and-extensions | fig 2 | fix in SVG (ladder 1) | FIXED | label re-anchored inside the frame; stray circles removed; hinge open circles placed at the TRUE seats (0, 1) and (0, −1) matching the honest caption; witness dots given dashed axis drop-lines; leaders re-routed clear of all text.
- 2026-11-12 | aa-even-and-odd-functions-and-extensions | fig 2 | VLM strict (pass 3) | PASS-on-evidence | pass 3's sole material claim ("f_x subscript") DISMISSED as a vision misread — the source writes f_e(−1) and the full-resolution render reads f_e(−1) = f(1) = 2 exactly (auditor-model read, fire-2 precedent); remaining items cosmetic (hinge label touches the axis line hair-thin; mirror slopes near-proportional). Figure honest and legible in light + dark.
