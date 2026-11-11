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
