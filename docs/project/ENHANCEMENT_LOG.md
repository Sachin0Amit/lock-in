# ENHANCEMENT_LOG.md — Figure & Visual Upgrade job (job 507527)

> Hourly visual-upgrade run (pinned to :15; sibling of the every-2-hour
> chapter job at odd-hour :45). One lesson hands-on per run, oldest queued
> lesson first (see ENHANCEMENT_POINTER.json). This file is owned by the
> visual job; RESUME_POINTER.json / PROGRESS.json / WORK_INVENTORY.json /
> DETAILED_LOG.md belong to the chapter job. Commits are LOCAL ONLY — the
> chapter job pushes all unpushed commits on main.

---

## Run 1 — 2026-11-06 (job 507527, fired 15:45 +08:00, trace cron-agent-loop-202611061545)

- **Lesson:** `fm-numbers-digits-place-value` (FM 1.1 — first in the queue)
- **Collision guard:** tree clean, no `.figure_upgrade_lock`, no index.lock → proceeded; lock created at start, refreshed per step, deleted at end.
- **State files:** ENHANCEMENT_LOG.md / ENHANCEMENT_POINTER.json created by this run (first run) — queue rebuilt from live book data by `scripts/build_enhancement_pointer.ts`: 67 lessons (FM 48 + ANS ch.1–5 19; ANS ch.6 excluded while `RESUME_POINTER.nextUnit` names it in flight, re-enters when the chapter job flips the pointer; ANS ch.7+ not yet written).

### (a) Diagram/SVG precision — audited & upgraded

All geometry recomputed by script BEFORE touching anything
(`scripts/enhance-fm-11-audit.ts`, independently re-derived constants).

**Number line figure (existing):** tick mapping x = 380 + 33v (v = −10…10),
tick heights 14/9 by v % 5, labels at y = 112, axis 50…710 — all exact, kept.
Three defects found and fixed:
1. `positive direction →` text (start-anchored at x=640) estimated to render
   ≈ 780 px — past the 760-wide viewBox (clipped). Fixed: `text-anchor="end"`
   at x=710, symmetric with `← negative direction` now start-anchored at x=50.
2. Caption promises "the number 7 sits seven unit steps right of the origin"
   — no marker existed in the SVG. Fixed: amber dot (r=5, #b45309) at
   x = 380 + 7·33 = **611**, label "7" promoted to amber bold.
3. Same for −4: amber dot at x = 380 − 4·33 = **248**, amber bold label.
Mobile legibility: tick labels 12→14, bold/marked 13→15, direction labels
13→14, origin caption 11→12 (33 px tick spacing still clears the widest
adjacent pair at 15 px bold). In-browser overlap audit: 0 issues.

### (b) Generated images

None added — the lesson's two concepts (number line; digit × seat) are
structural/geometric, best served by exact SVG. Rationale recorded per
owner directive v2 ("pick the medium that teaches best").

### (c) Other visual enhancements

**NEW figure "One digit, four seats"** inserted between the 4725 equation and
the overflow derivation — visualises the sentence it follows ("the same digit
5 is worth 5, or 50, or 500 according to the seat it occupies"):
- Per-digit rendering: every digit its own `<text>` anchored at its seat's
  right edge (monospace advance 0.6em × 24 px = 14.4 px), so each digit
  occupies exactly one 14.4 px seat — the picture IS the definition.
- Amber strip spans each whole numeral; its left edge retreats by exactly one
  seat (14.4 px) per appended zero (206.8 → 192.4 → 178.0 → 163.6 for the
  leading 5). Dotted amber arrows + ×10 labels connect consecutive rows.
- Seat names (ones/tens/hundreds/thousands) + "contributes 5 × 10ᵏ" lines
  (tspan superscripts) + value boxes (= 5 / = 50 / = 500 / = 5,000).
- All coordinates derived from constants in-source (DIGIT_W 14.4, RIGHT_X
  214, BASE0 58, ROW_H 64); nothing hand-placed; float-safe via toFixed(1).
- Chosen static over animation deliberately: the concept is positional
  structure, not a process in time. No prose/quiz/ids touched.

### Gates (all green)

| Gate | Result |
| --- | --- |
| `bun run scripts/enhance-fm-11-audit.ts` (geometry, both figures) | CLEAN |
| `bash scripts/audit-svg-overlaps.sh fm-numbers-digits-place-value` | svg0 0 issues, svg1 0 issues |
| `bun run lint` | 0 errors (1 pre-existing warning in e2e-book2-promotion.page.js, unrelated) |
| `bunx tsc --noEmit` | 0 errors |
| Route 200 | `GET /book/foundation-mathematics/lesson/fm-numbers-digits-place-value` → 200 |
| Browser E2E (`scripts/e2e-fm-11.sh`) | 44/44 PASS at 1280 AND 390 (+ dark mode): 2 figures with exact structure (8 rects / 3 arrows / 28 texts; 21 ticks, dots at 611 & 248), KaTeX 67 nodes 0 errors, no raw `$` anywhere, quiz 5/5 ("You scored 5/5"), 9 solutions expand (+1 example Sol pill = 10), no horizontal overflow (1280 & 390), 0 console errors |
| Screenshots reviewed | seat-1280, seat-dark-1280, nl-1280, seat-390, nl-390 — light + dark + mobile all correct |

Notes: the 4725 display equation is horizontally scrollable (`overflow-x:
auto`) at 390 px — existing convention, verified acceptable, out of scope.

### Commit

`enhance(fm-numbers-digits-place-value): precise figures + visual upgrades` —
LOCAL ONLY (never pushed; the chapter job pushes all unpushed main commits).

Files touched: `ch-01.ts` (module-level seat-figure computation + figure
block + number-line fixes), `.gitignore` (whitelist: e2e-fm-11.sh,
e2e-fm-11.page.js, build_enhancement_pointer.ts, enhance-fm-11-audit.ts),
`docs/project/ENHANCEMENT_LOG.md`, `docs/project/ENHANCEMENT_POINTER.json`,
plus the whitelisted scripts themselves.

---

## Run 2 — 2026-11-06 (job 507527, fired 18:45 +08:00, trace cron-agent-loop-202611061845)

- **Lesson:** `fm-comparing-ordering-numbers` (FM 1.2 — next in the queue after run 1)
- **Collision guard:** tree clean, no `.figure_upgrade_lock`, no index.lock → proceeded; lock created/refreshed per step, deleted at end.
- **Queue:** ENHANCEMENT_POINTER.json read; 1.1 marked done in run 1 → this run took 1.2 (`pending-review`).

### (a) Diagram/SVG precision — existing chart audited & polished

All geometry recomputed by script BEFORE touching anything
(`scripts/enhance-fm-12-gen.ts` derives + prints every value;
`scripts/enhance-fm-12-audit.ts` re-derives everything independently from
the committed file; 35 checks, CLEAN).

**Place-value chart 4,589 vs 4,598 (existing, Figure 1):** grid verified exact
(cols x = 150+140c, w = 130; rows y = 94/156, h = 46; header y = 44, h = 40;
digit centers x = col+65; amber tint exactly at the tens column 430 in header
and both rows; digits read 4,5,8,9 / 4,5,9,8; 4,598 − 4,589 = 9 recomputed).
No defects. Mobile legibility bumps (run-1 precedent): seat-name headers,
corner label and row labels 13→14 px, footer 12→13 px — all width-checked
against their cells/viewBox (widest header "thousands" 69.3 px in a 130 px
cell; footer ≈ 570 px centered at 425, inside 760). In-browser overlap audit:
0 issues.

### (b) Generated images

None added — deliberate medium choice per owner directive v2. The lesson's
core content (seat-scan comparison; the domination bound) is quantitative and
structural: exact numbers ARE the teaching content, and the no-text rule for
AI images would force all precise labels into adjacent HTML anyway. SVG
carries the real values at publication precision; a raster illustration would
duplicate the metaphor without adding clarity.

### (c) Other visual enhancements

**NEW figure "the domination bound at j = 1, drawn to scale" (Figure 2)**,
inserted between the existing chart and the next heading (flow: the equation
states the bound → chart shows WHERE the decision happens → new figure shows
WHY the loser's best counter still falls short):
- Two bars on one 0–10 ruler, x(v) = 150 + 52v: amber bar (one step of the
  deciding tens seat, (9 − 8) × 10 = 10, w = 520) vs striped bar (every lower
  seat at maximum, 9 × 1 = 9, w = 468), dashed amber segment closing 9→10
  labelled "1 / unclosable gap".
- Static by design: the bound is a comparison of magnitudes, not a process in
  time — animation would add motion, not meaning (rationale logged per
  directive v2). Interactivity skipped: the block framework exposes no
  interactive block type, and adding one would break the surgical constraint.
- Striped bar uses a currentColor-only `<pattern>` (dark-mode safe); amber
  #b45309 matches the site accent; value labels white-on-amber / currentColor
  on stripes; aria-label present; no text below 13 px in viewBox units.
- All coordinates in-source from UNIT=52, X0=150, BAR_H=32, row ys 48/128,
  axis 204; nothing hand-placed.

### Gates (all green)

| Gate | Result |
| --- | --- |
| `bun run scripts/enhance-fm-12-audit.ts` (geometry, both figures, 35 checks) | CLEAN |
| `bash scripts/audit-svg-overlaps.sh fm-comparing-ordering-numbers` | svg0 0 issues, svg1 0 issues |
| `bun run lint` | 0 errors (1 pre-existing warning in e2e-book2-promotion.page.js, unrelated) |
| `bunx tsc --noEmit` | 0 errors |
| Route 200 | `GET /book/foundation-mathematics/lesson/fm-comparing-ordering-numbers` → 200 |
| Browser E2E (`scripts/e2e-fm-12.sh`) | 27/27 PASS at 1280 AND 390 (+ dark): 2 figures with exact structure (chart 12 rects/16 texts, amber digits 8,9; tug 4 rects/13 lines/17 texts, bars w=520/468, gap w=52, ticks 0..10), KaTeX 170 nodes 0 errors, no raw `$`, quiz 5/5 ("You scored 5/5"), 8 exercise pills + 2 example Sol pills = 10, no horizontal overflow (1280 & 390), 0 console errors |
| Screenshots reviewed | tug-1280, chart-1280, tug-dark-1280, tug-390, chart-390 — light + dark + mobile all correct |

### Commit

`enhance(fm-comparing-ordering-numbers): precise figures + visual upgrades` —
LOCAL ONLY (never pushed; the chapter job pushes all unpushed main commits).

Files touched: `ch-01.ts` (new Figure 2 block + chart font bumps),
`.gitignore` (whitelist: enhance-fm-12-gen.ts, enhance-fm-12-audit.ts,
e2e-fm-12.sh, e2e-fm-12.page.js), `docs/project/ENHANCEMENT_LOG.md`,
`docs/project/ENHANCEMENT_POINTER.json`, plus the whitelisted scripts themselves.

---

## Owner-directive interlude — 2026-11-08 (direct tasking, NOT a queue run): GLOBAL FIGURE PALETTE BRIGHTENING — all books, all chapters, one sweep

> Owner words: *"make all written chapter svgs or graphs bright — colour is
> dull so visibility is less — do it for all, and make improvements in docs
> accordingly for future."* Executed by the main agent between queue runs;
> the per-lesson queue is untouched (every already-done lesson inherited the
> new palette automatically — that is the point of a global swap).

### What changed

- **All 171 figure SVGs in all 26 written chapter files** (FM 11, ANS 10,
  AL 5) migrated from the retired muted set (olive `#3f6212`/`#365314`/
  `#4d7c0f`, gray-green `#6b7a72`, dull browns `#9a6b2f`/`#7c5a2e`/
  `#b45309`, dark teals, cream tints) to the **vivid figure palette** now
  specified in `docs/project/BOOK_FORMAT.md` (structure `#16a34a`, primary
  text `#166534`, mid `#65a30d`, captions `#0d9488`, connectors `#d97706`,
  accent `#ea580c`, teal `#0d9488`/`#0f766e`, warning `#dc2626`, panels
  `#fef3c7`/`#ffedd5`, separators `#fcd34d`, grids `#5eead4`).
  963 hex tokens swapped by `scripts/brighten-figure-palette.py`
  (case-insensitive — AL files carried UPPERCASE `#365314`); residual
  scan: **0 retired hexes remain in scope**.
- **Reader plate fix (the dark-mode visibility bug):** `blocks.tsx` figure
  chrome switched `bg-card text-foreground` → forced light paper plate
  `bg-[#fffdf5] text-[#1c1917]` (+`shadow-sm`, stone borders) in BOTH
  themes. Before: hex-coloured figures were near-invisible on the dark
  card. `currentColor` figures inherit the plate ink — verified
  `rgb(28,25,23)` on `rgb(255,253,245)` with dark media active.
- **Cover accents + graph nodes brightened:** FM `['#ea580c','#c2410c']`,
  ANS `['#14b8a6','#0f766e']`, AL `['#65a30d','#166534']` (feeds cover
  gradients and Revision-Hub knowledge-graph chapter halos — verified
  live: `#ea580c`, `#14b8a6`, `#65a30d`); builder custom-cover presets
  upgraded to vivid pairs.
- **Generators + gates re-pointed at the new hexes:** gen-43/44-figures.py,
  fix-figure-overlaps.py, enhance-fm-12-gen.ts emit the new palette;
  e2e-fm-11/12.page.js + enhance-fm-11/12-audit.ts assert it.

### Gates (all green)

| Gate | Result |
| --- | --- |
| `bunx tsc --noEmit` | 0 errors |
| `bun run lint` | 0 errors (2 pre-existing warnings, unrelated e2e scripts) |
| `bash scripts/e2e-fm-11.sh` | 44/44 PASS (desktop + dark + 390) |
| `bash scripts/e2e-fm-12.sh` | 54/54 PASS — incl. "3 amber-tinted cells", "amber digits exactly 8,9" now on `#ea580c`, quiz 5/5, 0 console errors, no overflow 1280/390 |
| `bun run scripts/enhance-fm-11-audit.ts` | CLEAN |
| `bun run scripts/enhance-fm-12-audit.ts` | CLEAN |
| Pixel audit (`scripts/analyze-figure-brightness.py`) | AL fig1 light 1,816 vivid px / dark 1,860 / **0 old-dull-olive px**; ANS 9.1 1,284 vivid; FM 6.1 currentColor 409 — light + dark |
| Residual hex scan | 0 retired hexes in chapters / books / scripts |

### Docs for the future

`BOOK_FORMAT.md`: figure block row re-points to the vivid palette; new
**"Figure colour palette"** house-style section (role→hex table with the
retired column, warm-families-only rule, no-blue/indigo rule, paper-plate
note, ≥4.5:1 text / ≥3:1 stroke contrast floors, "add new colours to the
table first" law); checklist item blacklists the retired hexes. Future
chapters and any figure regeneration inherit this automatically.

## Audit-bot fire — 2026-11-15 (job 530242, §10 v2 protocol; target fm-patterns-and-rules, FM 11.1)

The owner's 2026-11-13 §10 directive run as a cron fire: pull → pick the next
pending queue lesson (item 45, the first not-yet-done written lesson in
allBooks order) → three passes → docs → commit → push.

### (a) Pass A — strict audit of the two existing figures

Figure 1 (matchstick): the strict VLM pass flagged the "+3" tags floating
inside the newest squares as ambiguous (read as a property of the whole
square). Fix-ladder rung 1: the tags now ride above the newest squares at
computed centres (x0 + sq·n − sq/2, baseline y0 − 14), the caption says "a
bold +3 tag riding above each new square", and the verifier's K3/K4 pins
were re-pinned to the new geometry (plus a K4b header-clearance check).
Re-audit PASS. A second VLM claim (borrowed edges "all heavy") was dismissed
on pixel evidence — the dash runs [2,4,4,4…] prove the dashed convention
intact. Figure 2 (gnomon wrap) PASSed untouched.

### (b) Pass B — seven solution visual aids (§10.1)

- L2-Q1 matchstick row at n=5: cumulative counts 4, 7, 10, 13, 16 under the
  squares, the fifth square's three fresh sticks teal, +3 tag above it;
  caption phrasing tightened once (a VLM convention nit).
- L2-Q2 the number-line gap walk: ticks 2..27 spaced 5, two labelled +5 hop
  arcs into the gap at 17 (teal tick), the −5 back-arrow to 2.
- L2-Q3 (NEW exercise) the 10→15 dot-triangle panel: the fifth triangle's
  fresh bottom row of five teal dots, the handshake-graph tie in the caption.
- L3-Q2 the circle game at six points: 15 chords, 15 interior crossings,
  31 regions — the angles (0/45/120/175/250/320°) were certified
  general-position by an Euler face-count check BEFORE embedding, and the
  VLM verified the drawing is a complete K6 with every label outside the rim.
- L4-Q2 the handshake graphs: 4/5/6 guests, 6/10/15 edges, the newcomer's
  edges teal, counts under each panel.
- L5-Q1 the ×2-then-+1 arrow chain: nodes 2→95 in boxes, ×2 above and +1
  below each arrow; the VLM caught the arrow-endpoint overrun (arrowheads
  hidden under the following box) — endpoint math fixed, re-PASS.
- L5-Q2 the 6×6 gnomon L-stack: nested Ls tinted stepwise, odd counts on
  the diagonal corners, running totals 1..36 on the right margin; the
  dark-mode VLM check FAILed the dark-amber diagonal labels on amber tints
  → labels and L-strokes moved to currentColor, re-PASS in both modes.

### (c) Pass C — subtopic enrichment (§10.2)

The triangular numbers' paragraph pair described the dot stacking and the
handshake double life in words only — the family had NO figure while every
other named family in the lesson had one. Added the dot-triangle body
figure (panels 1, 3, 6, 10 dots, counts with "then 15, 21") plus the
read-the-picture paragraph cashing it to the handshake arrivals, and one
new L2 exercise reading the picture both ways (dots ↔ handshakes). No other
thin subtopics warranted enrichment inside the scope guards. Verify-first
held: verify-unit-11 extended 187→201 (section AM) ALL PASS before prose.

### Gates (all green)

verify-unit-11 201/0 · audit-content-completeness 0 errors · tsc 0 new
errors · overlap 0 on all 10 mounted svgs (body + solutions-expanded
capture) · VLM light+dark PASS after fixes · quiz keys and exercise
answers untouched.

## 2026-11-15 — audit-bot fire (job 530242, 08:30 IST): fm-patterns-to-formulas (11.2) §10 passes

### Pass B — solution visual aids (3 figures, §10.1 discipline)

- Example 'A committee of 30…': K5 complete-graph panel — five numbered friends on a circle, all ten pairs joined (edges trimmed to the circle boundary), green arrival tags +0…+4, right column 0+1+2+3+4 = 10 = (5 × 4)/2 and N = 30 → 435. One DOM-driven fix, then VLM PASS.
- Example 'Which position holds 99…': two-lane arrow chain — the dress forwards (n →×5→ 5n →−1→ 5n − 1) above the undo backwards (99 →+1→ 100 →÷5→ 20 = n, green), teaching last-step-first undressing. PASS first time.
- L5-Q1 shop window: forty bars of heights 1..40 drawn to scale; first 20 dashed amber = 210 lifted off; kept band 820 − 210 = 610 with both region brackets and the arithmetic column. PASS first time.
- Reasoning, steps and answers untouched; every caption states what THIS diagram shows for THIS solution.

### Pass C — enrichment (4 additions, §10.2)

- insight callout 'Why the halving is always exact' after the staircase equation — consecutive integers n, n + 1 put an even factor in every numerator (T7 = 28, T9 = 45); the quiet wholeness promise named.
- insight callout 'When no dress fits' after the dresses table — the doubling list 1, 2, 4, 8, … refuses the dress (differences 1, 2, 4, 8 grow); the difference test taught as a refusal certificate too; powers of 2 deferred to later books.
- terms entry 'Arithmetic undoing' — the lesson's own reverse-order undressing habit, named in the glossary.
- one new L2 exercise: dress-refusal on the doubling list + the dress on 6, 10, 14, … ($T_n = 4n + 2$, 30th term 122) with the full Sol. chain and checks.
- Note: the previous fire's thin-subtopic scan of 11.2 judged the scope guards deliberate; these additions supply the §10.2 method-variant/edge-case layer without touching the lesson's arc, ids or answers.

### Gates (all green)

tsc 0 errors in the touched files · audit-content-completeness 0 errors · overlap 0 on 5 mounted svgs (solutions-expanded) · VLM strict PASS on every figure, re-audited post-fix.

## 2026-11-15 — audit-bot fire (job 530242, 14:30 IST): fm-letter-for-the-unknown (11.3) §10 passes

### Pass B — solution visual aids (4 figures, §10.1 discipline)

- L2-Q2 matchstick sentence $3n + 1 = 31$: the row of 10 squares drawn at exact 50px pitch — amber seed stick (the +1) plus 3 sticks per square; count line 1 seed + 30 = 31, undo line 3n + 1 = 31 → 3n = 30 → n = 10, check 3 × 10 + 1 = 31 ✓. Grounds the equation's answer in the structure 11.1 counted square by square.
- L3-Q2 ribbon 47 cm: the whole ribbon as one bar to scale (11 px/cm; short 198px = 18 cm amber-filled, long 319px = 29 cm), the 11-cm overhang bracketed in amber as the promise the words made, solve and both checks below.
- L4-Q1 rectangle 6 by 12: true 2:1 rectangle (192 × 96 from sc = 16), sides labelled x = 6 / 2x = 12, four green clockwise perimeter arrows, panel collecting x + 2x + x + 2x = 6x = 36 with both conditions checked.
- L5-Q1 father-son ages: one amber son-cell x beside a 4-cell father bar (46px unit, exact 4×), panel 1 + 4 = 5 copies → 5x = 50 → x = 10 with both checks.
- Judged and refused (pure algebra, no spatial content — §10.1): L1-Q1, L1-Q2, L2-Q1, L3-Q1, L4-Q2, L5-Q2, L6-Q1, L6-Q2. The six example blocks already sit beside body figures 1–2; no example doubles a figure its twin exercise now carries. Reasoning, steps, quiz keys and exercise answers untouched.

### Pass C — enrichment (2 additions, §10.2)

- insight callout 'The wrong order jams the machine' after the undo-machine figure: dividing 3x + 1 = 31 by 3 first gives x + 1/3 = 31/3 — true, but the +1 never gets its legal exit; the LAST-out-first rule grounded, not ritualized (the L6-Q2 proof now meets a forewarned reader).
- new example 'Does every equation have exactly one solution?' before The harvest: 2(x + 3) = 2x + 6 collects to 2x + 6 = 2x + 6 — every number a solution (8 = 8 at x = 1, 16 = 16 at x = 5); 2(x + 3) = 2x + 7 collects to 2x + 6 = 2x + 7 — none (8 = 9 at x = 1). The definition's 'many, or none' promise cashed with collecting only.
- Scope discipline: an x-on-both-sides subsection was considered and REFUSED — the lesson's scope guard (i) (verify-unit-11 section AL) explicitly excludes that machinery.
- Verify-first: verify-unit-11 section AN grown green (9 pins: AN1–AN2 the callout's numbers, AN3–AN4 the example's witnesses, AN5–AN8 the four figures' drawn values) — 209/0 ALL PASS before the prose.

### Gates (all green)

tsc 0 errors in the touched files · overlap 0 on 6 mounted svgs (solutions-expanded, re-run after the Pass C edits) · VLM strict PASS on every figure · quiz keys and exercise answers untouched.

## 2026-11-16 — audit-bot fire (job 530242, 02:30 IST): ans-architecture-of-counting-successors-order (1.1) §10 passes

### Pass B — solution visual aids (4 figures, §10.1 discipline)

- L2-Q2 transitivity splice ($2<5$, $5<9$ ⇒ $2<9$): the two runs drawn as arcs over the 2..9 line — amber 3-step 2→5, teal 4-step 5→9, hand-over at 5 — with the green 7-step bracket underneath ("one walk: 3 + 4 = 7 ⇒ 2 < 9") and the direct-run check 9 − 2 = 7 ✓. The concatenation argument, made visible.
- L2-Q3 count formula ($b - a - 1$): interval picture — teal endpoint circles 8/21, the twelve interiors 9–20 as green dots on the amber band, green interior bracket (20 − 9 + 1 = 12 ✓) and orange full-run bracket (13 steps, 14 numbers touched — 21 − 8 − 1 = 12 strictly inside).
- L3-Q2 clock vs axiom (iv): the wheel drawn honestly — 12 nodes at true clock angles, 11 clockwise tangent arrows + the RED wrap arrow in the 12→1 gap; right column reads the failure (axiom (ii) holds; (iv) dies; 13 o'clock is 1 again). First render caught by the strict pass and repaired in-SVG (angle normalisation + the arc-marker class fix — details in FIGURE_AUDIT_LOG).
- L5-Q1 succession preserves order: the shift on the concrete instance a = 3, b = 7 (k = 4) — above the row: amber "S once" 3→4 then teal 4-step run 4→8; below: teal "run 3 → 7 : k = 4 steps" then amber "S once"; both walks land on 8 ⇒ 4 < 8.
- Judged and refused (pure algebra/symbolic, no spatial content — §10.1): L1-Q1, L1-Q3, L2-Q1, L3-Q1, L4-Q1, L4-Q2, L6-Q1. L1-Q2's run walk refused as redundant with body fig 1's run bracket; the example block needs no figure — its two readings (order/distance) are exactly what L2-Q2's splice now shows. Reasoning, steps, quiz keys and exercise answers untouched.

### Pass C — enrichment (3 additions, §10.2)

- 'Predecessor' term added to the terms block (right after Successor): the one-full-step-back language, uniqueness from axiom (iii), the lone exception from axiom (iv) — closes the gap where the intro used the word but the lesson never taught it.
- New Exercise L1-Q4 with a full worked Sol. chain: the predecessor of 1000 is 999 — uniqueness from axiom (iii), existence from the shape fact established after the axiom table, the exception at 1 from axiom (iv).
- 'A fork in the axioms: some rebuilds start the chain at 0' insight callout (after the shape-fact paragraph): the 0-start reformulation read against the axiom list — the same architecture with the first link renamed; why this book stays 1-first and lets 0 enter later (placeholder digit, first integer). No new citations; reuses the lesson's own FM/ch-6 anchors.

### Accuracy catches (real arithmetic errors found and fixed; quiz/exercise KEYS untouched)

- The example block's "strictly between 8 and 21" step asserted $13 - 2 = 12$ — false arithmetic (13 − 2 = 11). The endpoint-exclusion route counts touched numbers: 14 − 2 = 12; equivalently b − a − 1. Repaired in place; the final answer (12) was and stays correct.
- Quiz Q4's explanation called the 12→20 run "the 9-step run" (it is 8 steps; 9 is the inclusive count) — repaired to "subtract 2 from the inclusive count of $9$ numbers, not 1"; key (7) unchanged.
- Provenance: the verify-first harness surfaced the first catch BEFORE the figure shipped (the figure's own label had initially inherited the flawed pattern from the prose — pinned, caught, fixed); section AN of verify-book2-ch01 now pins 21 − 8 + 1 = 14, 14 − 2 = 12 = 21 − 8 − 1, and the 12..20 instance 9 − 2 = 7.

### Gates (all green)

verify-book2-ch01 251/0 (section AN grown green BEFORE the prose/figures per verify-first) · DOM overlap 0 on all 5 mounted svgs (solutions-expanded) · VLM strict PASS on every figure (1 FAIL → in-SVG fix → PASS) · e2e: 0 KaTeX errors, 0 raw $ leaks, no overflow, quiz 5/5 · tsc 0 errors in touched files (3 pre-existing app-shell owner-stray errors at HEAD).

## 2026-11-16 — audit-bot fire (job 530242, 08:30): ans-induction-proving-for-every-number (ANS 1.2)

### Pass B — solution visual aids (4 added, §10.1)

- L1-Q2 (odd sums, first dominoes): the gnomon squares — three 24px-cell grids (1×1, 2×2, 3×3), the previous square neutral, the new odd count an amber L (+1 / +3 / +5), captions 1 = 1², 1 + 3 = 2², 1 + 3 + 5 = 3², right column landing on the step k² + (2k+1) = (k+1)².
- L2-Q3 (9 | 10^n − 1): the peel-and-patch machine — hypothesis box (the k-nine number = 9m), amber ×10 arrow to "ten × (9m) = 90m", amber +9 arrow to the green verdict "90m + 9 = 9(10m + 1)"; conclusion "the (k+1)-nine number is 9 × (10m + 1)" + the n = 6 instance 999999 = 10 × 99999 + 9 = 9 × 111111.
- L5-Q2 (the "even" autopsy): the floating chain — 8 upright dominoes with the valid step drawn as 7 arrows that transmit nothing, P(1) red-dashed under a red ✗ badge ("P(1) = 3 — odd: the base fails"), footer: k(k+1) always even, so k² + k + 1 always odd — every rung false.
- L6-Q1 (Euler's polynomial): the prime-run strip — 41 cells n = 0..40, 40 green (f(0) = 41 through f(39) = 1601), the last red with "n = 40 → f(40) = 1681 = 41²"; the first untested input betrays.
- Judged and refused (pure algebra/symbolic, no spatial content — §10.1): L1-Q1, L2-Q1, L2-Q2, L3-Q2, L4-Q1, L4-Q2, L5-Q1. Reasoning, steps, quiz keys and exercise answers untouched.

### Pass C — enrichment (2 additions + 1 metadata, §10.2)

- New subsection "When the truth starts late: the shifted base" (right after the two-wrecks callout, before the terms block): para + derivation "The wreck, repaired: n ≥ 2 from the base n₀ = 2" + example "A shifted base doing real work: n² ≥ 2n for every n ≥ 2" — the Q(n) wreck from the callout gets its honest-domain repair, then a non-trivial shifted-base proof where the hypothesis lifts (k² ≥ 2k) and the shift supplies room (2k − 1 ≥ 3). The "Shifted base" glossary term now has a taught subsection behind it.
- New Exercise L6-Q2 with a full worked Sol. chain: the telescoping sum Σ 1/(i(i+1)) = n/(n+1) — the guess read off the partial sums 1/2, 2/3, 3/4 (patterns propose, induction disposes), the step's numerator identity k(k+2) + 1 = (k+1)², instance n = 4 → 48/60 = 4/5. Balances L6 (was 1 question).
- 'The shifted base' added to concepts[] (the concept was declared in the glossary but absent from the concept list).

### Gates (all green)

verify-book2-ch01 273/0 (section AO grown green BEFORE the prose/figures per verify-first: the C1 shifted-base sweeps, the C2 telescoping numerator identity + the BigInt exact-fraction sweep n = 1..200, and every solution figure's drawn values) · DOM overlap 0 on all 5 mounted svgs (solutions-expanded) · VLM strict PASS on every figure (3 FAILs → in-SVG fixes → re-audit PASS each time) · audit-content-completeness 0 errors · e2e collector: 0 KaTeX errors, 0 raw $, no overflow, 13 show-solution buttons · tsc 0 errors in touched files (3 pre-existing app-shell.tsx owner-stray errors at HEAD, flagged for the owner).

---

## 2026-11-17 — audit-bot fire (job 530242, 02:30 +08:00, trace cron-agent-loop-202611170230): ANS 1.3 §10 passes

- **Lesson:** `ans-least-number-principle-recursion` (arithmetic-and-number-systems ch-01, lesson 1.3 "The Least-Number Principle and Recursion", queue item 51). Rotation: state re-pinned by the previous fire after the 14:30 duplicate run was discarded (fm-patterns-to-formulas already shipped by the sibling fire 71e445d — first-shipped-stands); this fire pulled first (36caaa3) and took the queue's first pending written lesson.
- **Pass A (§4):** 2 body figures. Fig 1 (LNP sweep) FIXED→PASS (annotation arrow re-aimed onto the ring edge); fig 2 (3 + 4 unroll) PASS untouched with a documented false-positive dismissal (the strict pass assumed the 0-based convention; the book's rule 1 add(a, 1) = S(a) is 1-based — definition callout, worked example, quiz item 4 and prose all corroborate).
- **Pass B (§10.1) — 5 solution figures** attached via the typed SolutionFigure schema (`figures?: SolutionFigure[]`, plural, no schema change needed):
  - L2-Q1 (unroll add(4, 3)): four-box peel chain with left S-counts 0..3, orange base row, rule annotations per peel, green value line "run the steps: 4 → 5 → 6 → 7" — the same peel machine as the body's fig 2, one peel fewer.
  - L2-Q2 (mul(3, 4)): four-box unpack-then-climb ladder — rule 2 rewrites each product as the one below plus a 3, rule 1 grounds the chain at 3 (orange), green climb annotations add(3,3)=6 / add(6,3)=9 / add(9,3)=12 aligned to their rows.
  - L5-Q2 (stamps {4, 9}): number line 20..30 — red 23 (the Frobenius point, "23 − 9t = 23, 14, 5 — never a multiple of 4"), green bases 24–27 under a bracket, the strong-step arc reaching back 4 rungs (n − 4), top line stating the step's licence.
  - L6-Q1 (the equivalence triangle): three nodes — induction, least-number principle, strong induction — with the twinhood's solid pair ((i) down, (iii) up) on the left edge, (ii) the conjunction re-branding inside the interior, and the dashed immediate strong⇒weak return; FAIL→FIX (floating dashed arrowhead re-attached within the induction box's span; (ii) label moved off the dashed arrow into stacked interior lines), re-audit PASS.
  - L6-Q2 (Zeckendorf): four-box greedy descent on 100 — 100 = 89 + 11 → 11 = 8 + 3 → 3 itself a Fibonacci (orange) → the gap-safe sum (green), with rank annotations (11th/10th, 6th/5th, 4th) proving the "drop by at least two" mechanism.
  - Judged and refused (pure algebra / redundant): L1-Q1, L1-Q2, L3-Q1, L3-Q2, L4-Q1, L4-Q2, L5-Q1, and both example blocks (rationale in FIGURE_AUDIT_LOG).
- **Pass C (§10.2) — 3 enrichments INTO the lesson:**
  - `formula` card "The least-number principle" (∀A ⊆ ℕ, A ≠ ∅ ⟹ ∃m ∈ A with m ≤ a for every a ∈ A; note names its three jobs: least-element searches, the descent, the twinhood) — the lesson's centrepiece was the only principle without a card; prepended to the card group.
  - `terms` entry "Frobenius point" (7 for {3, 5}, 23 for {4, 9}; one below the first formable window) — the concept is named three times in the lesson (example step 6, Exercise L5-Q2's answer, the exam callout) but was never glossed; inserted after "Strong induction" in lesson order.
  - `callout` warn "The descent only works if the pieces are strictly smaller" (the f = 1·f wreck — why the prime-divisor derivation leans on the composite classification before taking factors) — placed after the prime-divisor derivation, before the Fermat para.
- **Gates (all green):** verify-book2-ch01 296/0 (new section AP, 23 pins, grown BEFORE/AFTER discipline noted: every drawn value re-derived by the script) · DOM overlap 0/7 svgs solutions-expanded · VLM strict PASS ×7 figures (2 fix rounds total) · audit-content-completeness 0 errors · e2e collector 0 KaTeX errors / 0 raw $ / no overflow / 12 show-solution buttons · tsc 0 errors in touched files (3 pre-existing app-shell.tsx owner-stray errors untouched, flagged).
- **No AI-generated images this fire** (all five figures hand-authored SVG); SOURCE_LOG untouched. WORK_INVENTORY/PROGRESS/RESUME_POINTER untouched (main-AI-owned per this job's constraints — census-sync divergence noted in the run report).

## 2026-11-17 — audit-bot fire (job 530242, 08:30 IST) — ans-division-with-rest-the-division-algorithm (ANS 2.1, queue item 52)

- **Pass B (§10.1) — 4 solution visual aids (all hand-authored SVG; coordinates computed from in-template constants; unique marker ids da-/sl-/im-/ck-arrow; house palette; aria honest; no $…$ in SVG text):**
  - `L2-Q2` (53 ÷ 7 by repeated subtraction): descent-staircase chain — 8 boxes 53→46→39→32→25→18→11→4 with seven −7 arrows, amber walked steps, green bottom box r = 4 (4 < 7), a measure line spanning the 7 gap-centres, and the "count the arrows: q = 7" + rebuild-check lines.
  - `L2-Q3` (smallest 3-digit number leaving r = 4 on ÷ 9): nine-slot ladder — cells r = 0..8 at 60 px, 100/101/102 amber in slots 1–3, 103 green in slot 4, an arc arrow "three slots up the 9-ladder: 100 + (4 − 1) = 103", and the floor/ceiling + check lines.
  - `L4-Q1` (why (3, 8) is an equation, not an answer): two proportional bar panels at 12 px/unit — left: three 5-bars + a red 8-bar dashed-split into hidden 5 | true 3 with the failing band-check; middle: "hand the hidden group back: (3, 8) → (4, 3)"; right: four 5-bars + a green 3-stub with the passing band-check; the re-dress line 3·5 + (5 + 3) = 4·5 + 3.
  - `L5-Q3` (division on a clock): the subtract-5 wheel — entry chain 23→18→13→8 with a curved join onto the GREEN node 8, bold hops 3→10→5→12, thin {12/5} star chords closing the 12-cycle 3,10,5,12,7,2,9,4,11,6,1,8, a note column, and the cycle text ("every clock number exactly once — the staircase never bottoms").
- **Accuracy catch (§10.1):** Exercise L5-Q3's shipped clock walk wrapped wrong at all four transitions (on the S(12) = 1 clock, 3 − 5 is 10, not 11; 1 − 5 is 8; 4 − 5 is 11; 2 − 5 is 9 — five predecessor steps each). Solution step 2 rewritten with the true 12-cycle (3, 10, 5, 12, 7, 2, 9, 4, 11, 6, 1, 8 — gcd(5, 12) = 1, every clock number exactly once); the "no least element" answer line untouched (still true, and now stronger). The verifier needle-guards both the removal and the corrected string.
- **Pass C (§10.2) — 3 enrichments INTO the lesson:**
  - `example` "Count the slot-3 numbers between 100 and 300: the general form 7k + 3, swept end to end" — the general-form + range-count exam pattern the lesson only gestured at (smallest/largest were exercised; the COUNT was not): floor 100 = 7·14 + 2 → first 101 = 7·14 + 3; ceiling 300 = 7·42 + 6 → last 297 = 7·42 + 3; the k-run count 42 − 14 + 1 = 29 with the shortcut (297 − 101)/7 + 1 = 29 agreeing; placed after the a-mod-b para.
  - `callout` warn "The band has b values, not b + 1" — the classic off-by-one (seven slots for b = 7, not eight; the run-count "+ 1" is not optional) plus the endpoint-audit habit; placed between the new example and the historical callout.
  - `exercises` L3 gains a 4th question: write the general form 13k + 4 and count the members between 50 and 350 (50 = 13·3 + 11 → first 56 = 13·4 + 4; 350 = 13·26 + 12 → last 342 = 13·26 + 4; count 26 − 4 + 1 = 23, the shortcut agreeing) — the new pattern re-applied on fresh numbers, with a full worked solution.
- **Gates (all green):** verify-book2-ch02 433/0 (new section AO, 26 pins, grown BEFORE the prose edit: every drawn value re-derived; needle guards on the accuracy catch) · DOM overlap 0/5 svgs solutions-expanded · VLM strict PASS ×5 figures (1 dismissal with pixel evidence, 1 fix round on the clock join) · tsc 0 errors in touched files (3 pre-existing app-shell.tsx owner-stray errors untouched, flagged).
- **No AI-generated images this fire** (all four figures hand-authored SVG); SOURCE_LOG untouched. WORK_INVENTORY/PROGRESS/RESUME_POINTER untouched (main-AI-owned per this job's constraints — census-sync divergence noted in the run report).
## 2026-11-17 — audit-bot fire (job 530242, 14:30 IST) — ans-the-algebra-of-divisibility (ANS 2.2, queue item 52)

- **Pass B (§10.1) — 4 solution visual aids (all coordinates computed from in-template constants; unique marker ids l36-/tc-/sc-/dc-arrow; house palette; no $…$ in svg text; aria honest):**
  - `L1-Q2` (divisors of 36): the divisor lattice of 36 on the exponent grid — 9 nodes (2^i·3^j, i,j = 0..2; cols x = 100/240/380, rows y = 310/215/120, R = 16), rightward ×2 and upward ×3, 12 cover arrows each satisfying to = from × label, the 36 node tinted green; the node count IS the solution's nine-divisor list, and every 1→36 path carries 2·2·3·3 — the picture the solution's own last line ("the node count of 36's lattice") points at.
  - `L2-Q1` (transitivity, composed certificate): the chain 4 →×5→ 20 →×5→ 100 (boxes at x 150/340/530, arrows trimmed 3/6 px off rims) with the composed-certificate bracket spanning box centres (5 × 5 = 25, 100 = 4 · 25 ✓) and the caption noting the skip edge is deliberately not drawn in the lattice — transitivity is exactly what certifies it.
  - `L4-Q3` (the cancellation form): twin panels at c = 2 (panels at x 48 / 408) — green TRUE panel 3 | 21 →×2→ 6 | 42, certificate 7 surviving both sides; amber FALSE panel 3 ∤ 22 →×2→ 6 ∤ 44, remainders 1 → 2 (scaling the equation 22 = 3·7 + 1 forces 44 = 6·7 + 2); the verdict survives scaling either way — which IS the equivalence.
  - `L5-Q1` (the chain 45 | 225 ⟺ 9 | 45 ⟺ 5 | 25): three rows of one shape k | 5k (certificates all 5; k-boxes x 120 w 64, 5k-boxes x 240 w 92, rows y 48/116/184), link 1 an honest cancellation (5·9 | 5·45 ⟶ 9 | 45), link 2 honestly labelled shape-repetition with fresh k — mirroring the solution's own honest-chain move; the base fact 5 | 25 green.
- **Pass C (§10.2) — 3 enrichments INTO the lesson:**
  - `example` "Product compatibility, proved and worked" — law four of the six-law list had no proof of its own (the six-law intro promises "the three that carry real content" and delivers transitivity, combinations, cancellation): the example proves it by certificate-scaling (bc = (ak)·c = a(kc), certificate k·c), works 7 | 21 → 7 | 105 (cert 15 = 3·5), and names its transitivity dress (b | bc always, certificate c); placed after the transitivity bookkeeping para, before the closure-law derivation.
  - `para` + `example` "Prime-power chains: the lattice of 8, of 9, and 36 again" — the lattice instrument generalised: p^e forces a single ×p chain (count = exponent + 1, swept for (2,1),(2,2),(2,3),(3,1),(3,2),(5,2),(7,3)); two-prime numbers cross the chains in a grid; 36's nine divisors gain an address — (2 + 1)(2 + 1) = 9 — closing the loop with L1-Q2 and foreshadowing Chapter 4's unique factorisation; placed after the lattice read-back para, before the historical callout.
  - `callout` warn "The combination law does not run backwards" — the one-way arrow the exercises lean on but the prose never warns about: 8 | 136 certifies nothing about its summands; 6 | 12 = 7 + 5 with 6 ∤ 7 (remainder 1), 6 ∤ 5 (remainder 5); placed after the combination-law example, before the order-link para.
- **Refused (§10.1 discipline):** 11 further questions + all 3 example blocks — each with a stated reason (arithmetic-only content; shape-duplicates of the four drawn; the body figure's own ground; tabulated steps).
- **Gates (all green):** verify-book2-ch02 section AP — 38 new pins + needle guards grown BEFORE the prose (484/0 total) · DOM overlap 0/5 svgs solutions-expanded · VLM strict PASS ×4 sol figures + 1 body PASS untouched · tsc 0 errors project-wide · lesson route 200 with all five figures mounted.
- **No AI-generated images this fire** (all four figures hand-authored SVG); SOURCE_LOG untouched. WORK_INVENTORY/PROGRESS/RESUME_POINTER untouched (main-AI-owned per this job's constraints — census-sync divergence noted in the run report).



## 2026-11-18 — audit-bot fire (job 530242, 02:30 IST) — ans-euclidean-algorithm-proven-bezout-identity (ANS 2.3, queue item 53)

- **Pass B (§10.1) — 3 solution visual aids (all coordinates computed from in-template constants; unique marker ids sw-/bs-arrow; house amber/green palette; no $…$ in svg text; aria honest):**
  - `example 2` (backward substitution on (210, 45)): the climb as three landing rows — the bottom sentence isolating 15 = 45 − 1·30, the substituted row 15 = 45 − 1·(210 − 4·45), the collected Bézout line 15 = 5·45 − 1·210 (green); two vertical substitution arrows labelled ("substitute sentence 2: 30 = 210 − 4·45", "collect the 45s: 1 + 4 = 5"), amber stage tags left of each row, the check line 225 − 210 = 15 ✓ beneath — the picture the solution's own "climb the chain … bottom sentence first" walks.
  - `L1-Q2` (subtraction form vs division loop on (48, 18)): two aligned lanes — the walk's five states (48, 18) → (30, 18) → (12, 18) → (12, 6) → (6, 6) with −18/−18/−12/−6 arrows over the loop's four pairs (48, 18) → (18, 12) → (12, 6) → (6, 0) with the three division sentences; dashed amber drop-lines connect the shared stages; notes mark the packed state (30, 18) and the seat swap; banner "4 subtraction steps vs 3 division steps — survivor 6 both ways" — exactly the exercise's count-and-check ask.
  - `L2-Q3` (lcm(210, 45) via the product rule): the two multiple ladders on one number line — amber ticks every 45, green tall ticks at 210, 420, 630, the first shared tick 630 ringed; miss-notes at 210 (4·45 + 30) and 420 (9·45 + 15); banner 15 · 630 = 9,450 = 210 · 45 ✓ — leastness made visible.
- **Pass B fixes (ladder rung 1, in-SVG):** two real overlaps caught by the strict pass — the division-sentence labels grazed the bottom boxes' lower borders (glyph tops vs box edge y = 194) and the '630' label collided with the ring's lower arc (label top ~179 vs ring edge 185); both fixed by recompute-and-move, re-rendered, re-audited PASS; DOM 0 re-run after each fix.
- **Pass C (§10.2) — 2 enrichments INTO the lesson:**
  - `derivation` "The bulk step: q subtractions in one division" — the algorithm's note invoked "the invariance lemma, with subtraction run in bulk" without ever proving the bulk licence: the derivation marches the lemma down the pair (a, b) → (a − b, b) → … → (a mod b, b), composes the per-step preserves into a whole-march preserve, and lands gcd(a, b) = gcd(b, a mod b) with the (210, 45) four-subtraction packing instance (set {1, 3, 5, 15} never moving); placed between the algorithm block and the termination derivation.
  - `example` "Put the certificate to work: gcd(91, 104), the ladder of FM 4.2, and the scaled line" — the exam callout names FM 4.2's 91/104 ladder but the lesson never ran it: loop 104 = 1·91 + 13, 91 = 7·13 + 0 → gcd 13; 91/104 = 7/8; Bézout 13 = 1·104 − 1·91 (check 104 − 91 = 13 ✓); scaled certificate 1 = 1·8 − 1·7 ✓ — coprime-check, reduction and scaled reduction in one small instance; placed after the scaled-reduction para, before the Lamé callout.
- **Refused (§10.1 discipline):** 10 further questions + 2 example blocks — each with a stated reason (near-duplicates of drawn shapes; tables carrying themselves; symbolic one-liners; the essay).
- **Gates (all green):** DOM overlap 0/4 svgs solutions-expanded · VLM strict PASS ×4 (1 body untouched, 1 sol first-pass, 2 sol fixed→PASS) · lib:pack verify PASS · KaTeX clean · route 200 · tsc 0 errors project-wide.
- **No AI-generated images this fire** (all three figures hand-authored SVG); SOURCE_LOG untouched. WORK_INVENTORY/PROGRESS/RESUME_POINTER untouched (main-AI-owned per this job's constraints).


## 2026-11-18 — audit-bot fire (job 530242, 08:30 IST): ans-linear-diophantine-equations (ANS 2.4, queue item 54) — §10 passes

- **Pass B (§10.1) — 3 solution visual aids (all coordinates computed from in-template constants; unique marker id pay-arrow; house amber/green palette with red only for the last-gap ring; no $…$ in svg text; aria honest):**
  - `L2-Q1` (12x + 42y = 6, empty window): the t-axis verdict picture — family line "family x = −3 + 7t, y = 1 − 2t (stride +7, −2)" on top, the green y-grip band (t ≤ ⌊1/2⌋ = 0) above the axis with a left-pointing continuation arrow, the amber x-grip band (t ≥ ⌈3/7⌉ = 1) below with a right-pointing one, ticks −2..3 labelled with true minus glyphs, and the verdict "every t ≤ 0 lands x = −3 + 7t < 0; every t ≥ 1 lands y = 1 − 2t < 0 — the window is empty" — the two bands never meet, which IS the answer.
  - `example 3` (₹100 in ₹5/₹7 notes): the pay lattice — grid, axes with ticks 0..20 (x) and 0..12 (y), the line from its y-intercept (0, 100/7) to its x-intercept (20, 0), three green dots with coordinate labels, a step arrow running dot-to-dot below the segment labelled +7, −5, and the green window bracket from x = 6 to x = 20 captioned "the nonnegative window: t = −2, −1, 0 — three makeable ways" — the lesson's second lattice, answering "how many ways" by showing the bracket holds three.
  - `L3-Q2` (4- and 9-rupee stamps, amounts 1..30): the sweep strip — 31 cells in one row, makeable green and gaps amber, legend on top, the last gap 23 ringed red with the leader label "23 = 4·9 − 4 − 9 — the last gap", the green witness bracket under 24..30 with "the run is continuous from 24 / witnesses 24..31, then the +4 walk", and the Sylvester count line "twelve gaps — (4 − 1)(9 − 1)/2 = 12 — the largest is 23 = 4 · 9 − 4 − 9".
- **Pass B fixes (ladder rung 1, in-SVG, each re-gated):** two real catches on the pay lattice — (1) the DOM gate flagged TEXT/LINE between the "(20, 0)" label and a horizontal gridline whose right ENDPOINT (x = 690) landed inside the label box; horizontals now end one unit short of the intercept; (2) the strict VLM re-audit read the step arrow's (15, 25) offset as non-parallel drift past the (13, 5) dot; the arrow now runs (270, 165) → (480, 265), a pure vertical offset below the dot columns; both re-rendered, re-audited PASS.
- **Pass C (§10.2) — 3 enrichments INTO the lesson:**
  - `callout (insight)` "The gatekeeper is the gcd — not the coefficients" (after Illustration 1): the criterion never asks whether a or b divides c — 6x + 10y = 4 passes (2 | 4, (−1, 1) = 10 − 6) though 6 ∤ 4 and 10 ∤ 4; a coefficient dividing c would carry the gcd along (d | a, a | c ⇒ d | c), so the gcd alone is the gate; the exam trap named (the veto on 6x + 10y = 7 is the gcd's, 2 ∤ 7).
  - `example` "Run the whole pipeline on a fresh d > 1 equation: 14x + 21y = 77" (Illustration 4, after the grips para — the window heading previously had no worked example): criterion (gcd 7 | 77), reduce (2x + 3y = 11), Bézout (1 = 3 − 1·2, scaled 11 = 33 − 22 → (−11, 11) read as 33 − 22 ✓), family (stride (+3, −2)), grips (⌈11/3⌉ = 4 ≤ t ≤ ⌊11/2⌋ = 5), window {4, 5} → (1, 3) and (4, 1), both strictly positive, dressed back 14·1 + 21·3 = 77 ✓ and 14·4 + 21·1 = 77 ✓ — "reduce to solve, dress back to answer".
  - `callout (insight)` "How many ways, at a glance" (after Illustration 4): on every nonnegative-counting instance of the lesson the count lands at ⌊c/(ab)⌋ or one more — (5, 7, 100): ⌊100/35⌋ + 1 = 3 ✓; (3, 5, 16): ⌊16/15⌋ = 1 ✓; reduced (2, 7, 10): ⌊10/14⌋ + 1 = 1 ✓; the fresh (2, 3, 11): ⌊11/6⌋ + 1 = 2 ✓; empty windows sit at the ⌊·⌋ value (2x + 7y = 6: ⌊6/14⌋ = 0) — the stride consuming roughly ab of target per makeable solution; honest ledger matches Sylvester's (instances verified, general formula deferred to chapter 4).
- **Refused (§10.1 discipline):** 11 further questions + 2 example blocks — each with a stated reason (divisibility verdicts; one-subtraction arithmetic; shapes already drawn by this fire's figures; symbolic proofs; the essay).
- **Gates (all green):** DOM overlap 0/4 svgs solutions-expanded (re-run after each fix) · VLM strict PASS ×4 · dark-mode crop PASS · lib:pack v4 (9.48 MB, verify PASS) after each content edit · KaTeX clean · route 200 · tsc 0 errors project-wide.
- **No AI-generated images this fire** (all three figures hand-authored SVG); SOURCE_LOG untouched. WORK_INVENTORY/PROGRESS/RESUME_POINTER untouched (main-AI-owned per this job's constraints). FIGURE_AUDIT_QUEUE cursor left untouched (the sweep rebuild owns it); item 54 marked done.

## 2026-11-18 — audit-bot fire (job 530242, 14:30 IST): ans-representation-theorem-unique-name (ANS 3.1, queue item 55) — §10 passes

- **Pass B (§10.1) — 4 solution visual aids (all coordinates computed from in-template constants; unique marker ids casc13-arrow / win3-arrow; house amber/green/teal palette, red unused; no $…$ in svg text; aria honest):**
  - `L1-Q2` (name 13 in base two): the engine on 13 as a compact cascade — four machine rows (13 ÷ 2 … 1 ÷ 2) chained by quotient arrows, each remainder in an amber cell tagged with its digit identity (r = 1 = d₀ down to r = 1 = d₃: the digits ARE the remainders), dashed leaders into the read-upward arrow, green footer "13 = 1101₂ — four machines, four bits; rebuild: 8 + 4 + 0 + 1 = 13 ✓". Two fix rounds (digit tags added for reading-direction ambiguity; floating captions removed after a DOM TEXT/RECT catch), then PASS.
  - `L2-Q3` (rebuild 2F₁₆): the two-seat strip — the digit 2 in the sixteens seat, the letter-digit F amber-filled in the ones seat with the teal charter tag "the charter: F carries 15", product stems down to 2 × 16 = 32 and 15 × 1 = 15, sum line "32 + 15 = 47 — the letter is a digit, not an unknown". PASS first time.
  - `L3-Q2` (smallest/largest five-digit base-three names): the window on the number line — orange band from the green wall 81 = 10000₃ (smallest) to the green wall 242 = 22222₃ = 3⁵ − 1 (largest), side annotations (0 … 80: four digits at most; 243 …: six digits), green count bracket "162 numbers — 3⁵ − 3⁴ = 243 − 81". One fix round (superscript tspans 10 → 11 px after a misread), then PASS.
  - `L5-Q2` (exactly b^k numbers wear at most k digits): the stacking figure — windows {0}, [1, 1], [2, 3], [4, 7], [8, 15] drawn one cell per value at their true positions (widths 1, 1, 2, 4, 8 cells), running totals "so far: 1, 2, 4, 8, 16" beside each bar, green union bar "at most four bits: exactly 0 through 15 — 2⁴ = 16 numbers", boundary ticks 0, 1, 2, 4, 8, 16, and the in-figure legend stating the half-open cell convention. Three fix rounds (segment→cell convention; "0..255"→"0–255" against decimal misreads; legend added against closed-interval misreads), then PASS.
- **Judged and refused (§10.1 discipline):** L1-Q1 (digit-band listing — nothing spatial), L1-Q3 (23 = 43₅ — one division, the body figure's shape at minimum scale), L2-Q1 (100 = 144₈ — same cascade shape as the new L1-Q2 figure, adds nothing), L2-Q2 (2025 = 1209₁₂ — the new digit-theorem example reads these digits without a machine), L3-Q1 (divisible-by-b ⟺ trailing zero — symbolic iff), L4-Q1 (5555₆ = 6⁴ − 1 — seat arithmetic the L2-Q3 strip already dresses), L4-Q2 (million: 20 bits / 5 hex — window-gripping prose, no new geometry), L5-Q1 (three-base relay 5031₇ → 8C1₁₄ — the cascade shape twice over), L6-Q1 (essay — textual); examples 1 and 3 (the 45-cascade and the impostor hunt — example 2's own figure watches this lesson's engine, and the impostor sweep's 20-candidate strip would be clutter, not teaching).
- **Pass C (§10.2) — 2 enrichments INTO the lesson:**
  - `callout (warn)` "Why the charter starts at two: there is no base one" (after the digit-charter list): b = 1 forces band {0} and n = q·1 + 0 pins the quotient to n — the descent never shrinks, no finite name is ever emitted; a usable base needs two digits AND a strictly-eating divisor; unary tallies record without positions. The theorem's b ≥ 2 shown to be necessity, not caution (swept n ≤ 30 in the verifier).
  - `example` "Read any digit directly: the digit theorem on 2025 in base twelve" (after the digits-are-remainders insight callout): dᵢ = ⌊2025/12ⁱ⌋ mod 12 gives 9, 0, 2, 1 for i = 0..3 — assembling 1209₁₂, exactly Illustration 2's engine answer read without a single machine; rebuild 1728 + 288 + 9 = 2025 ✓; the exam shortcut "last digit in base b" = one division. Every number pinned in the verifier (section BB) BEFORE the prose was written — the verify-first house rule.
- **Gates (all green):** DOM overlap 0/5 svgs solutions-expanded (re-run after each fix round) · VLM strict PASS ×5 on the canonical browser render (1 body untouched, 1 sol first-pass, 3 sol fixed→PASS) · dark-mode paper pinned (#fffdf5 + #1c1917 both themes) · verifier 511/0 (section BB added) · lib:pack verify PASS after each content edit · KaTeX clean · route 200 · tsc 0 errors project-wide.
- **No AI-generated images this fire** (all four figures hand-authored SVG); SOURCE_LOG untouched. WORK_INVENTORY/PROGRESS/RESUME_POINTER/TOC_FOLD_LEDGER/ENHANCEMENT_POINTER untouched (main-AI-owned per this job's constraints). FIGURE_AUDIT_QUEUE item 55 marked done; cursor left untouched (the sweep rebuild owns it).


## 2026-11-19 — audit-bot fire (job 530242, 02:30 IST): ans-converting-between-bases (ANS 3.2, queue item 56) — §10 passes

- **Pass A (1 body figure):** the regrouping machine — one real geometry catch (nibble braces 2/3 cutting into box 9's cell; E/9 labels 18 px off center), fixed in-SVG from the box constants, re-audited PASS (pixels + VLM 9/9 + DOM 0). The bottom line's tspan garbling re-classified a cairosvg audit-method artifact (browser renders clean; screenshot evidence). Full record in FIGURE_AUDIT_LOG.
- **Pass B (§10.1) — 3 solution visual aids (all coordinates computed from in-template constants; house palette ink/currentColor + green #166534 + amber #b45309/#fef3c7; no $…$ in svg text; aria honest; TS annotations inside the template IIFEs compile clean):**
  - `example 1` (2025 → binary): the eleven-machine cascade — each row one division-algorithm instance right-aligned ('2025 = 1012 · 2 + 1' … '1 = 0 · 2 + 1'), remainder chips stacking in production order 1,0,0,1,0,1,1,1,1,1,1, green read-upward arrow ('read upward — last first' / 'first emitted = the units digit'), footer trio (the name / the rebuild / the eleven-bit window check). One fix round (footer clipped at a 3 px margin → split lines, viewBox 560×376), then PASS.
  - `bridge example` (1209₁₂ → base five, 67₁₂ → base three): the bridge run twice — two lanes of three boxes with the base-ten middleman green-stroked, up-arrows in ink (rebuild labels: '1728 + 288 + 0 + 9', '6 · 12 + 7'), down-arrows in green ('down: engine by 5/3' + remainder lists '0 · 0 · 1 · 1 · 3', '1 · 2 · 2 · 2'), footer certifying both legs' rebuilds. PASS first time.
  - `L3-Q1` (35_b = 23): the band-veto figure — left panel the digit band rows (b = 5: chips 0..4 plus a dashed amber chip 5, '5 has no seat in the band — vetoed'; b = 6: chips 0..5 with the green 5, 'the digit 5 finds its seat — admissible'), divider, right panel the rebuild speaking ('35 (base b) = 3b + 5', '3b + 5 = 23, so 3b = 18', bold green 'b = 6', 'check: 3·6 + 5 = 23 ✓'). PASS first time.
- **Judged and refused (§10.1 discipline):** 4 examples + 12 further questions refused with stated reasons (engine-cascade repeats at smaller scales; linear doubling walks; the body figure already watching the same content; symbolic proofs and the essay). Full refusal list in FIGURE_AUDIT_LOG.
- **Pass C (§10.2) — 2 enrichments INTO the lesson:**
  - `table` 'The octal charter' (after the octal nibble para, before the power-law derivation): the eight triples 000..111 as a table twin of the hex charter — the quiz (Q4), L4-Q1 and L5-Q1 all lean on the triple table, which previously lived only in one prose sentence.
  - `example` 'Sew the unwoven dresses: 45 into bases three and twelve; 2025 into bases seven and twelve' (after the wardrobe para, before the Leibniz callout): four mini-cascades sewing 1200₃ (27 + 18 = 45 ✓), 39₁₂ (36 + 9 = 45 ✓), 5622₇ (1715 + 294 + 14 + 2 = 2025 ✓), 1209₁₂ (1728 + 288 + 9 = 2025 ✓) — the wardrobe paragraphs previously QUOTED these dresses without deriving any of them; now every dress the lesson cites is sewn and certified inside the lesson, and the closing Hence line says so honestly.
- **Gates (all green):** DOM overlap 0/4 svgs solutions-expanded (re-run after each round) · VLM strict PASS ×4 (1 body fixed→PASS, 1 sol fixed→PASS, 2 sol first-pass) · lib:pack v14 verify PASS after each content edit · KaTeX clean · route 200 · tsc 0 errors project-wide.
- **No AI-generated images this fire** (all four figures hand-authored SVG); SOURCE_LOG untouched. RESUME_POINTER/PROGRESS/WORK_INVENTORY/TOC_FOLD_LEDGER/ENHANCEMENT_POINTER untouched (main-AI-owned per this job's constraints). FIGURE_AUDIT_QUEUE item 56 marked done; cursor left untouched (the sweep rebuild owns it).

## 2026-11-19 (08:30 IST fire, job 530242) — ANS 3.3 'Arithmetic in Other Bases': Pass B + Pass C

- **Lesson ans-arithmetic-in-other-bases** (arithmetic-and-number-systems ch-03, queue item 57 — the rotation state's next lesson after ANS 3.2).
- **ACCURACY CATCH (Pass B authoring byproduct, fixed + re-pinned):** L2-Q2's step 3 read "the twenty-fives seat: $3 - 1$(paid) $- 2 = 0$" — the subtrahend's twenty-fives digit is **1** (144₅ = 49), so the seat writes 3 − 1 − 1 = **1**; the old line contradicted the question's own (correct) final name 113₅ and the rebuild 82 − 49 = 33. Fixed in place; verifier section AY pins 144₅ = 49, the corrected seat line, and the add-back 33 + 49 = 82.
- **Pass B (§10.1) — 3 solution visual aids attached via `figures:`:**
  - `L2-Q2` (312₅ − 144₅): the borrow chain — two green loan arrows (+5 fives, +5 units) above the minuend row 3|1|2 over seats 25s/5s/1s, each seat's pay-and-write line under it (3−1−1 = 1, (1−1+5)−4 = 1, (2+5)−4 = 3), rule, written row 1|1|3, rebuild line. PASS first time.
  - `L5-Q1` (4231₅ ÷ 3₅): the division ladder — four rung chips, working lines ("bring down 2 → 12₅ = 7; 7 = 2·3 + 1" …), q/r chip pairs (1,1)(2,1)(2,2)(3,2), assembly line. Two fix rounds (assembly-line right-edge clip 925 > 920; rung-4 text touched the q chip at 0 px — pixel-measured, then 12.8 px after the fix). PASS.
  - `L5-Q2` (1209₁₂ → base five): the machine cascade — six value boxes chained by ÷ 5 arrows, five amber remainder chips 0,0,1,1,3, green read-upward arrow ("last first"), assembly line. One fix round (the DOM detector caught 5 × "÷ 5"-label/box collisions; labels moved clear). PASS.
- **Judged and refused (§10.1 discipline):** 9 further questions refused with stated reasons (column-machine repeats at b = 2/8; single-carry products; the cast's four residues; table rows already dressed by the table block; the cascade's twin instance on L3-Q2; the essay). Full list in FIGURE_AUDIT_LOG.
- **Pass C (§10.2) — 3 enrichments INTO the lesson:**
  - `derivation` 'The shift law: appending a zero multiplies by b' (in 'Long multiplication and the shift', between the assertive para and the 23₅ × 34₅ example): three steps — the name is its seat sum (representation theorem), appending the zero re-seats every digit one seat up (Σdᵢbⁱ⁺¹ = b·n, instance 7₅ → 70₅ = 35), and the staircase is iterated shifting (digit c in seat j ⇒ partial at seat j, worth bʲ times). The shift was previously asserted with "swept across five bases by the verify script" — now it is PROVED, matching the lesson's own standard for carries and borrows.
  - `derivation` 'Why the remainders read upward: the naming engine, generalised' (in 'Division in base b', between the two-consequences list and the 1209₁₂ cascade example): three steps — the first remainder is band-legal AND forced (n mod b₂ = the last digit), the peel ((n − r₀)/b₂ = q, Lesson 3.1's lemma), and the descent (q < n for b₂ ≥ 2, finite termination; upward reading assembles the name; the working wears any base's alphabet, which IS the direct conversion). The lesson's flagship promise ("the middleman removed") previously rested on one worked example; now it has its theorem.
  - `example` 'Subtract 1A3₁₂ − B8₁₂ — letters borrow too' (after the roll-down callout, closing the subtraction section): the letter-borrow shape the section lacked — units (3+12)−8 = 7; twelves (A−1+12)−11 = 10 = A (double borrow, letters paying and receiving); 144s spends itself; certified through ten (267 − 140 = 127 = 10·12 + 7 = A7₁₂ ✓). The exam callout names "add or subtract in a given base" as a standing paper shape, but every subtraction instance in the lesson was digits-only; letters now borrow too.
- **Verify-first:** all new numbers pinned in `scripts/verify-book2-ch03.ts` section AY (operands, seat lines, rungs, cascade chain, two sweeps for the shift law and the generalised engine, the letter-borrow arithmetic); the AY pins caught one bug in the fire's own pin draft (566 vs 188 conflation, and a "12₅-as-decimal-12" slip) before any doc shipped. Verifier: **526 passed / 0 failed**.
- **Gates (all green):** DOM overlap 0/4 svgs solutions-expanded · VLM strict PASS ×4 · lib:pack v15 verify PASS (run after each content edit — the first DOM gate after Pass B ran against the stale pack and under-reported; caught and re-run) · KaTeX clean · lesson route 200 · tsc 0 errors project-wide.
- **No AI-generated images this fire** (all figures hand-authored SVG); SOURCE_LOG untouched. RESUME_POINTER/PROGRESS/WORK_INVENTORY/TOC_FOLD_LEDGER/ENHANCEMENT_POINTER untouched (main-AI-owned per this job's constraints). FIGURE_AUDIT_QUEUE item 57 marked done (cursor untouched — the sweep rebuild owns it).

## 2026-11-19 — audit-bot fire (job 530242, 14:30 IST): ANS 3.4 'Binary, Hexadecimal and the Machine' — §10 passes

- **Pass B (§10.1) — 4 solution visual aids added, all VLM strict PASS first time:**
  - `example` 'An adder, run by hand: 1011 + 0110 through the gates' (a NEW Pass C example — see Pass C below — carries the figure): 5-row × 4-col adder grid (a, b, carry in, sum, carry out × weights 8 4 2 1), carry-in 1100 orange-lit, sum 0001 green, carry-out 1110 amber-lit, arrow "carry walks out — the overflow" under the leftmost carry-out cell, closing lines true sum 10001₂ = 17 = 11 + 6 / the register keeps 0001.
  - L2-Q2 mask (11010110 AND 00001111 = 00000110): three 8-box rows, the mask's open seats amber, the result's kept nibble green with braces "zeroed: 1101 (13) gone" / "kept: 0110 = 6 = 214 mod 16" — masking as visible modular arithmetic.
  - The toggle-case example ('XOR flips "A" into "a" with one seat'): A/a bytes stacked with the 32s-seat mask row between, the single differing seat orange in all three rows + dashed guide through it — the one-seat distance made visible.
  - L4-Q1 three ops (0110 vs 1011): a/b rows plus AND 0010 (amber), OR 1111 (orange), XOR 1101 (green) — the OR = AND + XOR identity (2 + 13 = 15) reads off the fills.
  - L5-Q2 peel (2025 ≫ 3): the 11-bit register 11111101001 with the 8-kept/3-dropped split drawn in green/amber, teal boundary, quotient 253 and remainder 1 labelled, 253·8 + 1 = 2025 certified.
- **Judged and refused (§10.1):** 9 questions with reasons (byte seat-maps that repeat the body anatomy figure; charter/table facts with no geometry; the essay). Full list in FIGURE_AUDIT_LOG.
- **Pass C (§10.2) — 2 enrichments INTO the lesson:**
  - `example` 'The other two verbs at work: NOT, and OR setting a seat' (after the masks para, before the half-adder derivation): the lesson named all four verbs but only AND and XOR ever did anything — NOT now has its instance (NOT 0110 = 1001) and value law (within k bits, NOT n = 2^k − 1 − n, 15 − 6 = 9), OR has its set-a-seat instance (0110 OR 0001 = 0111, 6 OR 1 = 7), and the disjoint check (0110 AND 1001 = 0000) proves the flip seat by seat; closes with the four-verb toolkit sentence.
  - `example` 'An adder, run by hand: 1011 + 0110 through the gates' (immediately after the half-adder derivation, before the toggle-case example): the derivation proved the half-adder identity and asserted the ripple — now it is RUN: charter question first (17 needs five bits, so the register must overflow honestly), column zero's clean half-adder pair, the ripple through columns 1–3 (majority votes), the honest exit (kept 0001, carry walks out, 10001₂ = 17 = 11 + 6 ✓), overflow named as the window nailed shut — with the adder-grid figure above. Ties the derivation, the overflow section and the exam callout together.
- **Verify-first:** verifier section AZ added to `scripts/verify-book2-ch03.ts` — 9 pins (half-adder identity swept; the adder walk column by column; the NOT law swept k ≤ 12; OR-set; disjoint; the case law swept over all 26 letters both ways; the mask; the three ops; the peel). The AZ pins caught one precedence slip in the fire's own draft (`^` binds looser than `!==` in JS — the very trap this lesson warns about) before docs shipped. **Verifier: 536 passed / 0 failed.**
- **Gates (all green, one substitution honestly logged):** the sandbox dev server died three times (stale .next cache fixed once; died again serving the lesson route) — the browser DOM gate could not run this fire; layer 1 substituted by the new offline static-geometry gate (`offline-svg-gate.py`: 0 issues on all 6 svgs) + layer 2 VLM strict PASS on all 6 figures (1 body untouched first-pass, 4 new first-pass). tsc --noEmit exit 0 project-wide · verifier 536/0 · lib:pack v17 verify PASS. NEXT FIRE: re-run `bash scripts/audit-svg-overlaps-expanded.sh ans-binary-hex-machine` when the server holds.
- **No AI-generated images this fire** (all figures hand-authored SVG); SOURCE_LOG untouched. RESUME_POINTER/PROGRESS/WORK_INVENTORY/TOC_FOLD_LEDGER/ENHANCEMENT_POINTER untouched (main-AI-owned). FIGURE_AUDIT_QUEUE item marked done (cursor untouched — the sweep rebuild owns it).
## 2026-11-20 — audit-bot fire: ans-primes-never-end-euclid-and-the-sieve (arithmetic-and-number-systems 4.1)

**Pass B — solution visual aids (4 figures added, all VLM strict PASS, DOM gate 0):**
1. **Primorial-ladder example** — six-rung ladder figure: P → +1 → N with verdict pills; five prime rungs (3, 7, 31, 211, 2311) amber, rung six 30031 = 59 · 509 as the orange break with red verdict + green "both strangers — the list still grows". The honesty instance gets its picture.
2. **L2-Q1** (91 full trial band) — trial-band line figure: band 2 ≤ d ≤ ⌊√91⌋ = 9 shaded, prime trials 2/3/5 miss, 7 lands (91 = 7 × 13), co-factor 13 drawn outside the band, four-division verdict line.
3. **L4-Q1** (primes strictly between 100 and 200) — number line: 21 amber dots at true positions 101..199, endpoints 100/200 ticked and marked "not prime, not counted", labels 101/107/199 + deep-row 103, bracket π(200) − π(100) = 46 − 25.
4. **L5-Q2** (unique prime triplet 3, 5, 7) — residue-wheel figure: three-spoke mod-3 wheel, arrows from "p, p + 2, p + 4 / start anywhere" fanning to all three spokes, three case rows (which member is the multiple of 3 per class of p), green p = 3 survivor line, red p > 3 composite line.

9 exercise questions + 5 quiz items judged and refused with recorded reasons (see FIGURE_AUDIT_LOG.md) — pure-arithmetic/logic solutions get no decoration.

**Pass C — subtopic enrichments (2, authored into the existing lesson):**
1. **"Refinement: the trials only need to be prime"** — new para + insight callout after the least-divisor-is-prime theorem (Elements VII.31): the composite trials of the √n band are provably redundant (a composite trial d is shadowed by its own least prime factor q ≤ d ≤ √n, tried earlier), with the cashed numbers: band 2..19 holds 18 candidates vs 8 primes (this lesson's L4 397 certificate), band 2..1000 holds 999 candidates vs π(1000) = 168 primes; the sieve hands the shortened list over for free. Closes the gap between the bound statement ("try every d") and the worked solutions (which try primes only) — previously an unexplained jump.
2. **"The rounds and the census are one function"** — new insight callout after the π(n) table: the number of sieve rounds below N is exactly π(⌊√N⌋) — π(10) = 4 rounds below 100 (the 2/3/5/7 that just ran), π(100) = 25 rounds below 10,000, π(10⁴) = 1,229 rounds below 10⁸ — tying the sieve's cost to the counting function the lesson just named, before Euclid's section takes over.

**Verification:** every new number pinned in scripts/verify-book2-ch04.ts section AR (370 passed / 0 failed, was 356); tsc --noEmit 0 project-wide; content pack re-run (v18) so the site serves the new figures; all five lesson figures DOM-gate 0 + VLM strict PASS (light; body figure also dark PASS).

## Run 3 — 2026-11-19 (job 507527, fired ~17:15 IST)

- **Lesson:** `fm-rounding-and-estimating` (FM 1.3 — first `pending-review` in the queue after runs 1-2; the audit-bot's §10 fires touch lessons but never ENHANCEMENT_POINTER, so the queue order stands). MISSED-FIRE note honored: runs 3-13 never started; all state read fresh from this log + the pointer.
- **Pull-first (owner directive, this fire's message):** anonymous HTTPS fetch (repo public) — local was strictly behind (0 local-only / 1 remote-only) → clean fast-forward `f98c5ee..b86a316` (the audit-bot's ANS 3.4 fire). No divergence, no conflicts, nothing to reconcile.
- **Collision guard:** tree clean, no `.figure_upgrade_lock`, no index.lock → proceeded; lock created 17:13 IST, refreshed per completed step, deleted at run end.
- **Server honesty note:** the long-lived dev server was serving a STALE content pack (the reader serves the packed database, not the source — the audit-bot's documented trap) AND the server died repeatedly mid-run. Fixed: `bun run lib:pack` re-run after every content edit (verify PASS each time), and the dev server + E2E launched in one shell call so the server had no idle window to die in. Every DOM gate below ran against the fresh pack.

### (a) Diagram/SVG precision — figure 1 audited & polished

All geometry recomputed by script BEFORE touching anything
(`scripts/enhance-fm-13-gen.ts` derives + verifies, 68 checks;
`scripts/enhance-fm-13-audit.ts` re-derives everything independently from
the COMMITTED file — 82 checks, CLEAN).

**Number line figure (existing, Figure 1):** tick mapping x = 70 + 62(n−40)
(n = 40..50), tick heights 16/12/20, labels y=122, dots at 256/504 — all
exact, kept. Two precision defects found and fixed:
1. Both rounded-decision arrow tips landed ~14px short of and off-centre from
   their target ticks ((84,82)/(676,82) vs the 40/50 tick tops at (70,87)/(690,87)).
   Fixed: curves recomputed to `M256,88 Q160,34 70,86` / `M504,88 Q600,34 690,86`
   — tips now land exactly on the tick tops (1px above, on the centreline).
2. Mobile legibility (run-1/2 precedent): tick labels 13→14 (group font),
   arrow labels 13→14, midpoint note 12→13 — width-checked (15.4px labels at
   the 62px pitch leave 46.6px; the 176px midpoint note centred at 380 fits).

### (b) Generated images

None added — medium choice per owner directive v2 (runs 1-2 precedent): the
lesson's content is quantitative and structural — the exact numbers ARE the
teaching content, and the no-text rule for AI images would force every precise
label into adjacent HTML anyway. Exact SVG carries the real values at
publication precision; a raster illustration would duplicate the metaphor
without adding clarity.

### (c) Other visual enhancements — NEW Figure 2: "the close-numbers trap, drawn to scale"

The lesson's most distinctive idea — the warn callout's 4,851 − 4,829 instance
(true gap 22, rounded gap 100, moves −29/+49, 100 = 22 + 29 + 49, "more than
four times too large") — existed only in prose and in a quiz option. Inserted
immediately after the callout, drawing its own numbers:
- Two rails at ONE shared scale (x(v) = 80 + 6(v−4800), both rails 80..680):
  top rail = the true positions (green dots at 4,829/4,851 straddling the
  dashed orange midpoint 4,850, dot-to-dot bracket tagged "true gap = 22");
  bottom rail = after rounding (bold 4,800/4,900, full-span bracket tagged
  "gap the subtraction now measures = 100"); two amber move-arrows from the
  dot tops to the rail-B tick tops (computed tips (82,178)/(678,178), 4px
  above the tick tops), tagged "rounds down −29" / "rounds up +49" — the
  inflation 22 → 100 reads off the two brackets at a glance.
- Static two-rail comparison by design: the concept is a comparison of two
  states, not a process in time — animation would add motion, not meaning
  (rationale per directive v2). Interactivity skipped: the block framework
  exposes no interactive block type (run-2 precedent, surgical constraint).
- Vivid palette only (structure #16a34a, green ink #166534, amber #d97706,
  orange #ea580c, currentColor ink — dark-mode safe on the paper plate);
  aria-label present; all coordinates in-source from constants, nothing
  hand-placed; smallest text 14px.
- Two REAL defects caught by the visual gates and fixed BEFORE shipping
  (recompute-then-verify, the whole point of this job):
  1. VLM strict audit (first render): the "rounds down/up" word tags
     straddled the top rail stroke (baseline 76 put the text midline exactly
     on y=70 — the pairwise text matrix had missed it because the rail is a
     stroke, not a text). Fixed: words moved above the rail (baseline 38,
     14px), values shifted outward to x=125/635; the defect class PINNED in
     the audit script (rail-stroke clearance check + near-row collision
     matrix ≤12px baseline distance).
  2. In-browser overlap audit: the dashed midpoint tick (y 56..84) clipped the
     «4,851» label bbox (top 82) by a 2px sliver. Fixed: tick shortened to
     y2=78 (4px clear); pinned as an audit check.

### Gates (all green)

| Gate | Result |
| --- | --- |
| `bun run scripts/enhance-fm-13-gen.ts` (recompute-before-write) | CLEAN — 68 checks |
| `bun run scripts/enhance-fm-13-audit.ts` (independent, from the committed file) | CLEAN — 82 passed, 0 failed |
| `bash scripts/audit-svg-overlaps.sh fm-rounding-and-estimating` | svg0 0 issues, svg1 0 issues |
| `bun run lint` | 0 errors (5 pre-existing warnings, all in other jobs' scripts; this run's four scripts add none) |
| `bunx tsc --noEmit` | 0 errors |
| `bun run lib:pack` + `lib:check` | verify PASS (269 books / 156 lessons / 806,748 words) — re-run after every content edit |
| Route 200 | `GET /book/foundation-mathematics/lesson/fm-rounding-and-estimating` → 200 |
| Browser E2E (`scripts/e2e-fm-13.sh`) | ALL PASS at 1280 AND 390: exactly 2 figures with exact structure (nl: 12 lines / 14 texts / 2 dots at 256,504 / arrows M256,88 Q160,34 70,86 + M504,88 Q600,34 690,86; trap: 13 lines / 13 texts / 2 green dots / amber move arrows M254,62 Q120,108 82,178 + M386,62 Q640,108 678,178 / brackets 3+3 strokes), KaTeX 138 nodes 0 errors, no raw $ anywhere, quiz 5/5 ("You scored 5/5"), 8 exercise pills + 3 example Sol pills = 11, no horizontal overflow (1280 & 390), 0 console errors |
| Screenshots + VLM strict audits | trap-1280 PASS · trap-390 PASS · nl-1280 PASS · nl-390 PASS · trap-dark-1280 PASS · nl-dark-1280 PASS (paper-plate contrast verified) · final acceptance PASS |

### Commit

`enhance(fm-rounding-and-estimating): precise figures + visual upgrades` —
LOCAL ONLY (never pushed; the chapter job pushes all unpushed main commits).

Files touched: `ch-01.ts` (figure 1 arrow-tip + font fixes; NEW figure 2 block
after the close-numbers-trap callout), `.gitignore` (whitelist:
enhance-fm-13-gen.ts, enhance-fm-13-audit.ts, e2e-fm-13.sh, e2e-fm-13.page.js),
`docs/project/ENHANCEMENT_LOG.md`, `docs/project/ENHANCEMENT_POINTER.json`,
plus the whitelisted scripts themselves. RESUME_POINTER / PROGRESS /
WORK_INVENTORY / DETAILED_LOG untouched (chapter-job owned).

## Run 4 — 2026-11-19 (job 507527, fired ~21:15 IST)

- **Lesson:** `fm-addition-carrying` (FM 2.1 — next `pending-review` in the queue; runs 1-3 covered 1.1/1.2/1.3).
- **Pull-first:** anonymous HTTPS fetch of `main` — remote had 0 new commits (local ahead 1: run 3's ship). No divergence, nothing to reconcile.
- **Collision guard:** tree clean at start, no `.figure_upgrade_lock`, no index.lock → proceeded; lock created, refreshed per step, deleted at run end. Dev server already live (route 200); one pack timestamp staleness caught and fixed (re-packed after every content edit, `lib:pack` v3+).

### (a) Diagram/SVG precision — both existing figures audited & polished

All geometry recomputed by script BEFORE touching anything
(`scripts/enhance-fm-21-gen.ts`, 131 checks; `scripts/enhance-fm-21-audit.ts`
re-derives everything independently from the EDITED file — 100 checks, CLEAN).

**Figure 1 (commutativity number line, 760×240):** tick mapping x = 60 + 70n
(n = 0..9) verified exact; dots at x(3)/x(4)/x(7) verified. Four precision
defects found and fixed:
1. Hop arcs floated with 8px insets both sides — chords 194px/264px instead of
   the true hops 210px/280px (ratio 0.735 vs the exact 3/4). Fixed: arcs
   re-anchored on the dot columns — top `M 340 82 Q 445 10 550 80`, bottom
   `M 270 194 Q 410 122 550 192` — chords exactly 3 and 4 units, drawn ratio
   exactly 3/4, endpoints 1px above their dot tops.
2. No direction on the hops (motion was only implied by labels). Fixed:
   arrowhead markers (`nl-hop`) landing just above the landing dots.
3. Rails asymmetric (50..710 = 10px/20px overhangs). Fixed to 50..700.
4. Mobile legibility (run-1..3 precedent): group font 13→14 (titles, tick
   labels, +3/+4 hop labels all inherit).
Also: the tick `.map()` interpolation was replaced with the static expanded
SVG (identical output, but the svg string is now uniformly auditable — the
audit's backtick extraction had truncated at the nested template).

**Figure 2 (4,589 + 2,764 seat map, 760×290):** cells/columns/carry cells all
verified at centres 215/355/495/635. Three precision defects found and fixed:
1. Carry-arrow starts sat +5px right of their column centres and tips landed
   +2px off carry-cell centres (640→635, 500→495, 360→355; 497→495, 357→355,
   217→215) with controls off-midpoint. Fixed: arrows now start exactly at
   column-top centres and land exactly on carry-cell bottom centres
   (`M 635 94 Q 565 76 495 58` etc., controls at exact chord midpoints), with
   arrowhead markers (`ca-arrow`) — the +5/+2 offsets are gone.
2. Sum line asymmetric (130..710). Fixed to 140..710 (±10 around the cell
   block), same fix mirrored in figure 3.
3. Font bumps: group 13→14, carry digits →15px bold, each-carry annotation
   11→13 (run-3 precedent), totals note 12→13.

### (b) Generated images — attempted, verified, refused (3 attempts)

The counting-board history paragraph ("when a wire held ten counters you
physically carried one counter over to the next wire") was chosen as the
lesson's one genuine image candidate — hand-drawn style. Three generations,
each inspected with the VLM skill under a strict protocol:
1. Attempt 1 (with hand lifting from the bottom wire): bottom wire showed 12
   counters; hand on the wrong wire; nothing in mid-air; fused anatomy →
   discarded.
2. Attempt 2 (simplified, counter in mid-flight): 9 counters on the base,
   4 wires, no mid-air counter → discarded.
3. Attempt 3 ("two groups of five", empty upper wires): 5 wires, 14 on the
   bottom wire, floating bead above the frame → discarded.
**Verdict:** image models cannot honour "exactly ten" — the count IS the
mathematics of this figure, so a raster could only ship a wrong fact. No image
shipped; the concept moved to a hand-authored SVG (below) where the count is
exact by construction. Rationale logged per owner directive v2.

### (c) Other visual enhancements — two NEW figures

**NEW Figure (counting board, 760×250)** — inserted directly after the
counting-board paragraph, before the algorithm block:
- A three-wire board in structure green with EXACTLY ten amber counters
  resting on the bottom wire (r=9, uniform 46px pitch, row centred on the
  frame centre — count and positions are computed, not eyeballed), one orange
  counter mid-flight exactly midway between the wires, a dashed rise guide
  with arrowhead, and a dashed landing ghost on the next wire. Labels reuse
  the lesson's own Carry-term phrasing verbatim: «ten of one seat — the wire
  is full» / «one of the next seat». The caption ties it forward: "the small 1
  written above each column in the next figure is exactly that carried
  counter" — the etymology of *carry* made physical, pre-figuring figure 2's
  carry cells. Static still-frame by design (the exchange is a state, not a
  process; the pencil algorithm that follows supplies the motion).
**NEW Figure (999 + 1 ripple, 760×290)** — inserted after the 999+1 example,
  before the carrying-traps callout:
- Same design grammar as figure 2 (cells, carry pills, identical arrow paths),
  walking the example's own numbers: digits 9/9/9 over 0/0/1 (the padding
  zeros drawn faint at opacity 0.45 — placeholders doing a real job, per
  Lesson 1.1 and the example's own words); every existing column totals
  exactly 10 (the boundary case) → write 0, carry 1, three chained arrows;
  the third carry creates the NEW thousands seat, drawn as a dashed teal zone
  over the empty column tagged «the new seat» — whose only content is the
  incoming carry (0 + 0 + 1 = 1, the sum's orange leading 1). The figure the
  lesson's formula block ("the extra digit, when present, is the final carry")
  and quiz Q2 always pointed at, now drawn.
- Rationale: the ripple is a PROCESS (leftward carry chain) but its teaching
  value is the final STATE at each seat — a static sequenced grid with the
  chain of arrows shows all four columns at once, which animation would hide;
  interactivity skipped (block framework exposes no interactive block type —
  run-2 precedent, surgical constraint).

### Gates (all green)

| Gate | Result |
| --- | --- |
| `bun run scripts/enhance-fm-21-gen.ts` (recompute-before-write) | CLEAN — 131 checks |
| `bun run scripts/enhance-fm-21-audit.ts` (independent, from the edited file; walks the digits parsed out of the SVGs) | CLEAN — 100 passed, 0 failed |
| `bash scripts/audit-svg-overlaps.sh fm-addition-carrying` | 0 issues on all 4 svgs (texts 24/2/20/18) |
| `bun run lint` | 0 errors (5 pre-existing warnings in other jobs' scripts) |
| `bunx tsc --noEmit` | 0 errors |
| `bun run lib:pack` + `lib:check` | verify PASS (269 books / 156 lessons / 806,920 words) — re-run after every content edit |
| Route 200 | `GET /book/foundation-mathematics/lesson/fm-addition-carrying` → 200 |
| Browser E2E (`scripts/e2e-fm-21.sh`) | ALL PASS at 1280 AND 390: exactly 4 figures with exact structure (nl: 22 lines / 24 texts / arcs M 340 82 Q 445 10 550 80 + M 270 194 Q 410 122 550 192; board: 3 wires + guide / EXACTLY 10 counters at pitch 46 / aloft + ghost / rise guide 380,206→152; seat map: 11 rects / file digits 4589+2764 = sum 7353 / arrows M 635 94 Q 565 76 495 58 + …; ripple: new-seat zone / row 001 / two faint zeros / sum 1000 / same arrow grammar), KaTeX 120 nodes 0 errors, no raw $ anywhere, quiz 5/5 ("You scored 5/5"), 8 exercise pills + 3 example Sol pills = 11, no horizontal overflow (1280 & 390), 0 console errors |
| Screenshots + VLM strict audits | nl-1280 PASS · seatmap-1280 PASS · ripple-1280 PASS · dark-mode triple PASS (contrast on the paper plate) · mobile-390 structural PASS. **Two honest catches:** (1) the full-figure VLM audits MIScounted the board's small amber discs as 9 (twice, "with a gap") — resolved by three independent ground truths (DOM element count, exact cx pins, and a pixel-cluster analysis of the renders themselves: 10 clusters at uniform pitch in BOTH the 390 and 1280 renders) plus a zoomed-crop VLM recount of 10; the miscount is a documented VLM weakness on tiny identical discs, not a figure defect. (2) mobile nit on the smallest annotations — bounded fix applied per run-1..3 precedent (board labels 13→14, new-seat tag 13→14, each-carry 12→13; totals notes stay at 13 as run 3 shipped, since 14px would overflow figure 3's note) — then re-gated: overlap 0/4, E2E ALL PASS ×2 viewports again |

### Commit

`enhance(fm-addition-carrying): precise figures + visual upgrades` — LOCAL
ONLY (never pushed; the chapter job pushes all unpushed main commits).

Files touched: `ch-02.ts` (figure 1 arc/anchor/font fixes, now static; figure
2 arrow-centring/sum-line/font fixes; NEW board figure after the counting-board
para; NEW ripple figure after the 999+1 example), `.gitignore` (whitelist:
enhance-fm-21-gen.ts, enhance-fm-21-audit.ts, e2e-fm-21.sh,
e2e-fm-21.page.js), `docs/project/ENHANCEMENT_LOG.md`,
`docs/project/ENHANCEMENT_POINTER.json`, plus the whitelisted scripts. No
raster assets shipped (the failed generation attempts were deleted;
public/images left clean). RESUME_POINTER / PROGRESS / WORK_INVENTORY /
DETAILED_LOG untouched (chapter-job owned).
## Run 5 — 2026-11-19 (job 507527, fired ~21:15 IST cadence; continued session, state rebuilt from ENHANCEMENT_LOG + POINTER)

- **Lesson:** `fm-subtraction-borrowing` (FM 2.2 — next `pending-review` in the queue; runs 1-4 covered 1.1/1.2/1.3/2.1).
- **Pull-first (owner chat directive):** anonymous HTTPS fetch of `main` — remote 1 ahead (the chapter job's Revision Hub ship `e34cdc2`), local 2 ahead (runs 3-4's ships) → reconciled by a clean LOCAL merge commit (this job never pushes; the chapter job pushes the merged line).
- **Collision guard:** tree clean at start, no `.figure_upgrade_lock`, no index.lock, in-flight chapter (AA 5.3) untouched → proceeded; lock created, refreshed per step, deleted at run end.
- **Environment catches (logged for future runs):** (1) the dev server can serve STALE lesson content after a source edit — the reader serves the PACKED library DB, so `bun run lib:pack` must be re-run after every content edit (run-4 documented the rule; run 5 hit it for real and re-packed after each edit — final pack v7, 807,165 words). (2) the sandbox reaps background processes between tool calls — server + E2E must run inside single commands.

### (a) Diagram/SVG precision — both existing figures audited & polished

All geometry recomputed by script BEFORE touching anything
(`scripts/enhance-fm-22-gen.ts`, 164 checks; `scripts/enhance-fm-22-audit.ts`
re-derives everything independently from the EDITED file — 102 checks, CLEAN;
the file edits applied by `scripts/patch-fm-22.py`, anchored and asserted).

**Figure 1 (subtraction number line, 760×258):** top ticks x = 60 + 70n and
bottom ticks x = 60 + (n+4)·50 verified exact (dots at x(7)/x(4)/x(3)/x(−4)
all on their columns). Four precision defects found and fixed:
1. Hop arcs floated with 8px insets both sides — chords 194px/334px instead of
   the true hops 210px (3 units) and 350px (7 units). Fixed: arcs re-anchored
   dot-column to dot-column — top `M 550 82 Q 445 10 340 80`, bottom
   `M 410 194 Q 235 122 60 192` — chords exactly 3 and 7 units, endpoints 1px
   above their dot tops (start r5 → 82/194; landing r7 → 80/192).
2. No direction on the hops. Fixed: arrowhead markers (`nl-hop`) landing just
   above the landing dot / the dashed ghost ring.
3. Rails asymmetric and inconsistent with the sibling lesson: top 50..710,
   bottom solid 260..710 with the dashed stretch starting at the −4 tick.
   Fixed: top 50..700 (2.1's exact rail); bottom solid 260..720 and dashed
   50..260 — the dashed stretch now covers the WHOLE negative territory
   −4..0 including its edge margin, symmetric ±10 overhangs everywhere.
4. Mobile legibility (run-1..4 precedent): group font 13→14 (titles, tick
   labels, hop labels inherit), edge note 11.5→13; ghost ring dasharray
   normalised 3 3 → 4 3 (run-4 ghost grammar). The nested `.map()` template
   interpolation replaced by static expanded SVG (uniformly auditable —
   run-4 precedent).

**Figure 2 (4,589 − 2,764 borrow seat map, 760×290):** cells/columns verified
at centres 215/355/495/635, digits re-walked by the independent audit's own
decomposition walker (ONE borrow, at the hundreds seat — `0,1,0,0`). Four
precision defects found and fixed:
1. The borrow arc floated between the seats — start (225,92), end (345,92),
   10px inward of both column centres, no direction, stroke 2 dasharray 5 4.
   Fixed: re-anchored exactly on the lender→receiver column centres
   `M 215 94 Q 285 66 355 94` (control at the exact chord midpoint), with the
   run-4 seat-exchange arrow grammar (1.5 / 4 3 / 0.8) and an arrowhead
   marker (`bo-arrow`) pointing into the receiver seat.
2. The exchange-rate pill was a tag-style rect (205,20,170×24, rx12, text
   12px) off the sibling grammar. Fixed to the run-4 carry-cell row metrics:
   (185,24,210×34, rx17) with «1 thousand = 10 hundreds» bold 14 at (290,46),
   label «the borrow» at (30,46).
3. Sum line asymmetric (130..710). Fixed to 140..710 (±10 around the cell
   block), matching 2.1's seat maps.
4. Font bumps: group 13→14, corrections 13→14 with positions normalised to
   the computed formula centre+33 («3» 252→248, «15» at 388, baseline 112);
   the bottom note stays at 12px — 13 would overflow the viewBox width
   (run-3/run-4 precedent applied with the gen script's width proof).

### (b) Generated images — none shipped, by medium decision (owner directive v2)

Every visual candidate in this lesson is structural/numeric: the edge-of-the-
world number line, seat-exchange grids, the borrow chain, the true-scale
climb. In each the exact counts and proportions ARE the mathematics, and
run-4's three-attempt refusal proved image models cannot honour exact counts
(ten counters → 12/9/14). A shopkeeper-scene raster beside the journey bar
would be decoration — the bar already carries the concept. Chosen medium for
every candidate: computed SVG. Rationale logged per owner directive v2
("pick the medium that teaches that concept best").

### (c) Other visual enhancements — two NEW figures

**NEW Figure (the 1,000 − 1 dissolve, 760×290)** — inserted after the
"1,000 − 1, seat by seat" example, before the borrowing-traps callout (the
mirror position of run-4's ripple figure):
- The exact mirror of 2.1's 999+1 ripple on the same seat grammar: three
  CHAINED lend arrows travelling lender→receiver
  `M 215 94 Q 285 66 355 94 | M 355 94 Q 425 66 495 94 | M 495 94 Q 565 66
  635 94` — each exactly one seat (140px centre-to-centre), chained
  head-to-tail so the cash visibly flows back down the chain rightward, the
  direction mirror of the ripple's leftward carries («lends →» labels the
  row, mirroring 2.1's «carries →»).
- Pencil bookkeeping drawn seat by seat: all four top digits struck (1,0,0,0)
  with small corrections 1→0 (lends everything), 0→9, 0→9 (receive 10, lend
  1, keep 9 — the lesson's own sentence and the fastest visual diagnostic of
  a zero-crossing borrow), 0→10 (the ones receives the full ten); subtrahend
  padded 0,0,0,1 with THREE faint zeros (placeholders doing a real job,
  Lesson 1.1 grammar); answer row 9,9,9 with NO digit in the thousands slot —
  the dashed teal zone «the dissolved seat» over the empty answer slot (the
  leading zero that drops away; "subtraction never grows the digit count").
- Rationale: static sequenced grid again — the dissolve is a process but its
  teaching value is the final state at each seat (run-4 ripple precedent);
  the caption narrates the request's leftward travel while the arrows draw
  the lends' rightward cash flow. Interactivity skipped (block framework
  exposes no interactive block type — run-2 precedent, surgical constraint).

**NEW Figure (the shopkeeper's climb, 760×250)** — inserted after the
counting-up paragraph, before the equal-additions historical callout:
- The lesson's spine made geometry: the bar between 2,764 and 4,589 IS the
  difference itself — 660px for 1,825 units (scale 0.36164 px/unit) —
  partitioned into four hand-over segments with widths EXACTLY proportional
  to 36/200/1,500/89 (13.02 / 72.33 / 542.47 / 32.19 px; proportions
  re-verified to 1e-9 by the independent audit from the drawn x's); the +1,500
  dominance is a visible fact, the +36 sliver honestly thin.
- Milestones at the boundaries: bold 15px ends (2,764 / 4,589) on row y=56,
  milestones (2,800 / 3,000 / 4,500) on row y=78 — 2,800 start-anchored
  exactly at its tick so the 13px-apart 2,764/2,800 pair cannot collide
  (binding ticks proven to cross nothing by the gen script); hop labels
  +36/+200/+1,500/+89 centred under their segment centres with connector
  ticks; an arrival arrowhead at the right end (count-UP direction); note
  «36 + 200 + 1,500 + 89 = 1,825 — the same difference, found with no borrow».
- Rationale: true scale is the only honest encoding (a uniform-scale ladder
  would lie about where the work is); the counting-up route is the lesson's
  missing-addend definition promoted to working method — now drawn.

### Gates (all green)

| Gate | Result |
| --- | --- |
| `bun run scripts/enhance-fm-22-gen.ts` (recompute-before-write) | CLEAN — 164 checks |
| `bun run scripts/enhance-fm-22-audit.ts` (independent, from the edited file; walks the digits parsed out of the SVGs with its own decomposition solver) | CLEAN — 102 passed, 0 failed |
| `bash scripts/audit-svg-overlaps.sh fm-subtraction-borrowing` | 0 issues on all 4 svgs (texts 29/19/20/11) |
| `bun run lint` | 0 errors (5 pre-existing warnings in other jobs' scripts) |
| `bunx tsc --noEmit` | 0 errors |
| `bun run lib:pack` + `lib:check` | verify PASS (269 books / 156 lessons / 807,165 words; pack v7) — re-run after every content edit |
| Route 200 | `GET /book/foundation-mathematics/lesson/fm-subtraction-borrowing` → 200 |
| Browser E2E (`scripts/e2e-fm-22.sh`) | ALL PASS at 1280 AND 390: exactly 4 figures with exact structure (nl: 27 lines / 29 texts / 4 dots incl. the dashed −4 ghost / arcs M 550 82 Q 445 10 340 80 + M 410 194 Q 235 122 60 192 with arrowheads; borrow map: 9 rects / pill rx17 / arrow M 215 94 Q 285 66 355 94 / digits 4589 − 2764 = 1825 / corrections 3,15 / sum line 140..710; dissolve: chained lend arrows / row 0001 with 3 faint zeros / answer 999 / dissolved-seat zone / corrections 0,9,9,10; climb: 660px bar / true-scale dividers 73.02,145.35,687.81 / hops +36,+200,+1,500,+89 / milestones 2,800,3,000,4,500 / ends 2,764,4,589), KaTeX 185 nodes 0 errors, no raw $ anywhere, quiz 5/5 ("You scored 5/5"), 8 exercise pills + 2 example Sol pills = 10, no horizontal overflow (1280 & 390), 0 console errors |
| Screenshots + VLM strict audits | light 4/4 PASS (nl · borrow map · dissolve · climb) · dark-mode 4-tile sheet PASS (contrast on the paper plate, no bleed) · mobile-390 4-tile sheet PASS. **Two honest catches:** (1) the standing overlap audit caught the journey bar's hop ticks (y2=158) running into the hop-label band top (≈154) — fixed by shortening the ticks to y2=150, assertion added to the gen script, re-gated (overlap 0/4, E2E ALL PASS ×2 viewports). (2) the strict VLM flagged the dissolve's ones-seat correction «10» vs the answer 9 as a reader inconsistency — the bookkeeping is correct (the pencil method writes the received ten) but the caption was silent about it; bounded caption fix applied («the ones seat receives the full ten (its small correction reads 10) and pays 10 − 1 = 9»), re-packed, re-captured, re-audited PASS. Mobile cosmetic floor (12-13px notes) matches the run-3/4 shipped bound |

### Commit

`enhance(fm-subtraction-borrowing): precise figures + visual upgrades` — LOCAL
ONLY (never pushed; the chapter job pushes all unpushed main commits).

Files touched: `ch-02.ts` (figure 1 arc/anchor/rail/font fixes, now static;
figure 2 arrow-centring/pill/sum-line/font fixes; NEW dissolve figure after
the 1,000−1 example; NEW journey-bar figure after the counting-up para;
dissolve caption clarification), `.gitignore` (whitelist: enhance-fm-22-gen.ts,
patch-fm-22.py, enhance-fm-22-audit.ts, e2e-fm-22.sh, e2e-fm-22.page.js),
`docs/project/ENHANCEMENT_LOG.md`, `docs/project/ENHANCEMENT_POINTER.json`,
plus the whitelisted scripts. No raster assets shipped (public/images left
clean). RESUME_POINTER / PROGRESS / WORK_INVENTORY / DETAILED_LOG untouched
(chapter-job owned).

## 2026-11-21 — audit-bot fire: ans-fundamental-theorem-of-arithmetic (arithmetic-and-number-systems 4.2)

**Pass B — solution visual aids (4 figures added, all VLM strict PASS, expanded DOM gate 0):**
1. **L2-Q1** (factor 2025 by trial division showing every division) — the six-machine cascade: stacked "2025 ÷ 3 … 5 ÷ 5" boxes chained by quotient arrows, each row's equation beside it, the amber least-divisor column (VII.31's guarantee named), the prime list growing in the right margin 3 → 3·3·3·3·5·5, and the 25-resists-3 switch called out in the footer. The exercise's "showing every division" becomes a picture.
2. **L2-Q2** (list the nine divisors of 100, confirm τ(100) = 9) — the 3 × 3 exponent lattice: e₂ rows × e₅ columns, nine cells = nine divisors with their 2^a·5^b makeups, corners 1 and 100 highlighted — the divisor-count formula seen AS a grid, counted by rows × columns.
3. **L3-Q1** (canonical form of 2047, the trial that lands) — the trial band: band 2..45 shaded, eight teal misses bracketed, 23 lands amber with the leader line, the primes past 23 dim and never divided, the co-factor 89 drawn outside the band exactly where the bound promised.
4. **L6-Q1** (τ odd ⟺ square, the divisor-pairing argument) — the pairing mirror: nine divisors at true positions, four nested arcs pairing d with 36/d, every arc straddling the dashed √36 = 6 mirror, the root 6 double-ringed as the self-pair — the parity theorem as a symmetry picture.

10 exercise questions + 6 example blocks judged and refused with recorded reasons (see FIGURE_AUDIT_LOG.md) — the body figure already dresses 60's two routes, and pure census/comparison arithmetic gets no decoration.

**Pass C — subtopic enrichments (2 + 1 accuracy catch, authored into the existing lesson):**
1. **"Why the twos never bind — the domination, proved in one line"** (insight callout, after the factorial-zero table) — the lesson claimed v₂ ≥ v₅ "swept to 500" in three places without a reason; the callout proves it termwise: 2^i ≤ 5^i ⇒ ⌊n/2^i⌋ ≥ ⌊n/5^i⌋ at every level, so the census for 2 dominates the census for 5 column-wise — a theorem, not a sweep, strict from n = 2 on. Pinned by a fresh n ≤ 500 double sweep in verifier section AS.
2. **"Zeros of a product, not a factorial: 2¹⁰ · 5⁸ · 3⁵"** (worked example, same section) — the trailing-zero census was taught factorial-only; the example runs min(v₂, v₅) on a plain product, rebuilds 97,200,000,000 = 972 · 10⁸ by hand, and names the 972 unpaired remainder — the census is a product law.
3. **Accuracy catch (the exam callout)** — the quoted exam shape "n = 2^a 3^b has 12 divisors and n is a square, find a + b" was vacuous: τ = 12 is even, and this lesson's own L6 pairing theorem (τ odd ⟺ square) forbids it — no such n exists. The clause now teaches the trap (and the honest τ = 9 version: a = b = 2, n = 36, a + b = 4). Quiz keys and exercise answers untouched; the trap defuser is the lesson's own theorem.

**Verification:** every new number pinned in scripts/verify-book2-ch04.ts section AS BEFORE any prose (verify-first): 392 passed / 0 failed, was 370; tsc --noEmit 0 project-wide; content pack re-run (v23) so the site serves the new figures; all five lesson figures DOM-gate 0 + VLM strict PASS (the fix rounds and their re-audits are logged in FIGURE_AUDIT_LOG.md).
## 2026-11-21 — audit-bot fire 16:30 IST (job 538572) — ANS 4.3 ans-divisors-from-dna-divisor-counts: 5 solution figures + 4 enrichments

**Pass B — solution visual aids (5 authored, all VLM strict PASS + DOM gate 0):**
1. **example-2 (220, 284)** — the amicable friendship loop: σ(220) = σ(284) = 504 chips over the DNA boxes, s-arrows crossing both ways, the eleven-name proper-divisor list, verdict line. 1 fix round (verdict-line clip).
2. **example-4 (smallest with 12 divisors)** — the shape tree: τ(n) = 12 → {12, 6·2, 4·3, 3·2·2} → {2048, 96, 72, 60}, champion 60. First-pass PASS.
3. **L1-Q1 (σ(12), classify)** — the divisor-pair rectangles: 1×12, 2×6, 3×4 to scale on a shared baseline — every divisor of 12 is a rectangle side. 1 fix round (browser-gate label graze).
4. **L2-Q2 (HCF/LCM of 12, 18)** — the min–max exponent duel: two exponent lines with amber/teal dots, green min rings → HCF, teal max rings → LCM, 6·36 = 216 = 12·18. 3 fix rounds.
5. **L2-Q3 (zeros of 200!)** — the Legendre census bars: 40 : 8 : 1 at true proportion, the dashed 625 ghost slot. First-pass PASS.

8 examples + 10 questions judged and refused with recorded reasons (see FIGURE_AUDIT_LOG.md).

**Pass C — subtopic enrichments (4, authored into the existing lesson):**
1. **σ-parity para + example** (after the coprime-split insight callout) — "when is σ(n) odd?" developed in the body: the odd-prime series is odd iff the exponent is even, the 2-series is odd always; the example reads σ(9) = 13, σ(18) = 39, σ(36) = 91 odd vs σ(12) = 28 even straight off the DNAs. The terms block had banked the theorem; the body now teaches it. Swept n ≤ 600 in verifier section AT.
2. **Thābit's rule example** (after the friendship callout) — the historical callout named the rule; the example runs it at n = 2: p = 5, q = 11, r = 71 all prime → (2²·5·11, 2²·71) = (220, 284) — the Greeks' pair regenerated, σ-check re-certified both ways.
3. **"The skips repeat past every power of five" insight callout** (after the skipped-counts para) — the 125 jump was the only skip instance; the callout adds the 625 = 5⁴ landing: v₅(624!) = 152 → v₅(625!) = 156, counts 153/154/155 never occur, and the k-fives-jump / (k−1)-skips law.
4. **L6-Q2** (new question in the thin L6 level, 1 → 2 questions) — σ(120) = 3·120 multiperfect verification: 2³·3·5 → 15·4·6 = 360, sweep-certified smallest of order 3, the σ = kn family named with 6/28/496 as the k = 2 charter members.

**Verification:** every new number pinned in scripts/verify-book2-ch04.ts section AT BEFORE any prose (verify-first): 423 passed / 0 failed, was 392 (one pin self-corrected mid-flight — v₂(200!) = 197, not 196); tsc --noEmit 0; pack v28; all six svgs expanded-DOM-gate 0; VLM strict PASS ×6 (fix rounds in FIGURE_AUDIT_LOG.md).

## 2026-11-21 — audit-bot fire 17:00 IST (job 537272 family, job 538572) — ANS 4.4 ans-how-the-primes-are-distributed: 4 solution figures + 2 enrichments

**Pass B — solution visual aids (4 authored, all VLM strict PASS + DOM gate 0):**
1. **L2-Q3 (Bertrand chain)** — the doubling windows, strip by strip: each (n, 2n] normalised to one row with the tenant at its TRUE relative depth (40%, 10%, 15%, 2.5%, 3.75%) — the figure the tightness claim deserves. 1 fix round (right-label clip).
2. **L3-Q1 (first gap of 10 vs earlier first gap of 14)** — one line 100..160, both deserts shaded as proportionally-wide bands: 14 wide after 113 lands before 10 wide after 139. First-pass PASS.
3. **example-2 (π-difference exam shape)** — the two π bars to true proportion (168, 303) with a green bracket measuring the 135 between. 1 fix round (title collision + caption clip).
4. **L1-Q3 (twins of 101..200)** — the second hundred with 21 prime dots (twins teal, partnerless dimmed) and the seven gap-2 pairs bracketed, labels staggered two rows. First-pass PASS.

13 judged and refused with recorded reasons (see FIGURE_AUDIT_LOG.md).

**Pass C — subtopic enrichments (2, authored into the existing lesson):**
1. **"Why n/ln n is the right companion — the density heuristic"** (insight callout, after the read-the-table para) — the table's companion column was asserted without a why; the callout gives the honest heuristic (primality probability ≈ 1/ln n near n → expected count n/ln n), labels it a plausibility argument whose independence assumption is deep, and hands off to the PNT as the theorem that makes the form exact. No new numbers — the table's own rows carry it.
2. **L6-Q2** (thin L6 level 1 → 2 questions) — the π table extended one row: π(10⁷) = 664,579 **sieved fresh by the verifier** (not quoted), companion 10⁷/ln 10⁷ ≈ 620,421, ratio ≈ 1.071 (1.084 → 1.071, drift toward 1 continues), share 6.65% — the PNT's shadow lengthens one more decade.

**Verification:** every new number pinned in scripts/verify-book2-ch04.ts section AU BEFORE any prose (verify-first): 435 passed / 0 failed, was 423 — including the π(10⁷) sieve computed by the verifier itself; tsc 0; pack v30; all five svgs expanded-DOM-gate 0; VLM strict PASS ×5 (fix rounds in FIGURE_AUDIT_LOG.md).


## 2026-11-21 — job 538572 fire 3 (cron 0,30 * * * ? IST) — ans-remainders-become-numbers-congruence-defined

**Pass B — three solution visual aids (§10.1), all inline SVG from named constants:**
1. **Example-1 clock face** (3 o'clock + 1000 hours → 7) — reuses the body figure's clock-face coordinate pattern (center (250,180), face r=95, tick r=118, label r~145); arc from 3 to 7 clockwise (4 hours = 120°, large-arc-flag=0, sweep=1) on the clock circle; bold **3** and **7** mark start and landing; start dot at 3; arrowhead at 7 in the clockwise-tangent direction; center label "+4"; caption "1000 = 12·83 + 4, so 1000 ≡ 4 (mod 12) — the dial advances 4 hours from 3 to 7 — computed without a single sweep of the hand". VLM PASS first time.
2. **L1-Q2 dual-arc clock** (9 + 7 = 16 ≡ 4 and 10 + 6 = 16 ≡ 4) — same clock face; arc 1 from 9 to 4 clockwise (7 hours = 210°, large-arc-flag=1, opacity 0.95); arc 2 from 10 to 4 clockwise (6 hours = 180°, large-arc-flag=0, opacity 0.6); bold **9**, **10**, **4** mark both starts and the shared landing; start dots at 9 and 10; shared arrowhead at 4; center label "both → 4"; caption "9 + 7 ≡ 4 (mod 12) and 10 + 6 ≡ 4 (mod 12) — both wrap to 4". VLM PASS after 1 fix round (caption shortened to fit viewBox).
3. **L2-Q1 residue-class column** ([4] mod 9 between 0 and 40 = {4, 13, 22, 31, 40}) — single column of 5 cells (matching fig 2's column style: 100×52 rect rx=8, stroke-width 0.8) at center x=160, cells at y=70/134/198/262/326 stride 64; values 4 (bold, font-size 19) / 13 / 22 / 31 / 40; four downward +9 arrows between consecutive cells (line + polygon arrowhead, "+9" label to the right of each arrow); header "[4] mod 9" above; caption "[4] mod 9 between 0 and 40 — five members, +9 apart" below. VLM PASS after 1 fix round (caption shortened to fit viewBox).

**Pass C — three enrichments INTO the existing lesson (§10.2):**
1. **New example: "Today is Monday. What day of the week is it 1000 days from now?"** — parallels the existing Example 1 (clock + 1000 hours) with a mod-7 calendar application; same engine, dial set to 7 instead of 12. Inserted in the 'Arithmetic on a clock' section, right before the 'The modulus is whatever wraps' insight callout. Solution: 1000 = 7·142 + 6, so 1000 ≡ 6 (mod 7); Monday + 6 = Sunday (counted forward); the same engine as the clock, dial set to 7.
2. **New example: "Reduce −17 to its residue modulo 5"** — develops the negative-residue case (the residue-class para mentions "-3 ≡ 2 (mod 5) since -3 - 2 = -5" but no worked example shows the method). Inserted in the 'Residue classes: the columns' section, right before the mod-5 columns figure. Solution: -17 = 5·(-4) + 3 (quotient -4, remainder 3 in [0, 5)); -17 - 3 = -20 = 5·(-4) ✓; hence -17 lands in residue class [3] mod 5, same column as 3, 8, 13, ... and as -2, -7, -12, ...
3. **New L4 exercise question: "Today is Wednesday. What day of the week is it 365 days from now? Use residues; verify by a direct count."** — L4 was the thinnest level (2 questions vs 3 in L1-L3); now 3 questions. Solution: 365 = 7·52 + 1, so 365 ≡ 1 (mod 7); Wednesday + 1 = Thursday; verification via "52 weeks = 364 days, 364 + 1 = 365" — the calendar engine cashed in one division.

**Verification:** every coordinate in the 3 new SVGs computed from named constants (CX=250, CY=180, R_FACE=95, R_TICK=118, COL_X=110, COL_W=100, CELL_H=52, CELL_GAP=12, etc.); generator script /home/z/my-project/scripts/audit-figs-5-1.py preserved for reproducibility (audit bot's own scripts directory, not the lock-in repo's). VLM strict PASS on all 3 new figures after fix rounds. Static XML DOM gate (text-clip + text-text-overlap) clean modulo 2 false-positive CLIP flags from the 0.6em/char text-width heuristic (pixel measurement overruled). tsc --noEmit could not run project-wide (deps not installed); ZERO errors in the edited file ch-05.ts. Sanity check: braces balance (202/202), all 14 kind values valid against types.ts Block union, 5 SVG template-literal blocks contain no stray backticks. 13 refusals with recorded reasons (see FIGURE_AUDIT_LOG.md). No AI-generated images this run.


## 2026-11-21 — job 538572 fire (cron 0,30 * * * ? IST) — ans-why-the-divisibility-tests-work

**Pass B — three solution visual aids (§10.1), all inline SVG from named constants:**
1. **Example-4 alternating-sum table** (918082 div 11) — 6 columns showing each digit (9,1,8,0,8,2) with its sign (−,+,−,+,−,+) from the units end, contributions (−9,+1,−8,+0,−8,+2), and the sum −22=−2·11. Caption: "The alternating-sum test on 918082: each digit from the units end receives a sign (+,−,+,−,+,−), the contributions −9+1−8+0−8+2 sum to −22=−2·11, so 11 divides 918082." VLM PASS first time.
2. **Example-5 truncation chain** (3584 div 7) — 3 boxes connected by downward arrows: 3584 (b=358,c=4→358−2·4=350), 350 (b=35,c=0→35−2·0=35), 35 (=5·7✓). Caption: "The truncation test on 3584: cut the units digit 4, double it (2·4=8), subtract from the rest (358−8=350); iterate (350→35); 35=5·7 — divisible, so 7 | 3584=7·512." VLM PASS after 1 fix round (box width + number padding).
3. **L6-Q1 mod-7 weighted digit test** (3584 div 7 via weight cycle) — 4 columns showing digits 3,5,8,4 with weights 6,2,3,1 (from the units-end cycle 1,3,2,6,4,5), contributions 18,10,24,4, sum 56=7·8. Caption: "The weighted digit test for 7 on 3584: powers of ten mod 7 cycle with period 6 (1,3,2,6,4,5 from the units place); 3·6+5·2+8·3+4·1=18+10+24+4=56=7·8, so 7 | 3584." VLM PASS first time.

**Pass C — two enrichments INTO the existing lesson (§10.2):**
1. **New insight callout: "Why coprime? — the disjoint-prime-factors reading"** — in the 'Composite divisors' section, after the 18-trap warn callout. Explains WHY gcd(a,b)=1 is the right condition: the fundamental theorem writes numbers as prime-exponent vectors; two parts are coprime iff their prime-factor sets are disjoint; the product demands each prime at the SUM of the two exponents, while divisibility by each part guarantees the MAX — sum exceeds max whenever both exponents are positive (the 18-trap in one line: gcd(2,6)=2 means prime 2 is in both parts, 12=2·6 demands 2², but divisibility by 2 and by 6 only guarantees 2¹ each).
2. **New L4 exercise question: "Use the 1001 block engine to find the remainder when 1234567 is divided by 7, by 11, and by 13"** — L4 was thinnest (2 questions vs 3 in L1-L3), now 3 questions. Tests the block engine on a 3-block number (1|234|567), the existing examples only use 2-block numbers. Solution: alternating block sum 567−234+1=334; 334 mod 7=5, mod 11=4, mod 13=9. Verified by direct division: 1234567=7·176366+5, =11·112233+4, =13·94966+9.

**Verification:** every coordinate in the 3 new SVGs computed from named constants (COL_W, COL_GAP, LEFT_MARGIN, BOX_W, BOX_H, BOX_GAP, etc.); generator script /home/z/my-project/scripts/audit-figs-5-2.py preserved. VLM strict PASS on all 3 new figures (2 first-pass + 1 after fix round). Static XML DOM gate clean (all margins ≥8px). tsc --noEmit unavailable project-wide (deps not installed); ZERO errors in edited file ch-05.ts. Sanity check: braces 142/142, all 14 kinds valid, 4 SVG blocks no stray backticks. 11 refusals with recorded reasons. No AI-generated images this run.


## 2026-11-21 — job 538572 fire (cron 0,30 * * * ? IST) — ans-unit-digit-cycles-of-powers

**Pass B — three solution visual aids (all inline SVG from named constants):**
1. **Example-1 7-wheel with exponent reduction** (7^2025) — the 7-wheel (cycle 7,9,3,1 period 4) with the answer position (7, top) highlighted by a dashed circle; exponent reduction computation shown to the right (2025=4·506+1 → 2025≡1 mod 4 → position 1 → 7). VLM PASS after 1 fix round (labels moved outside circle).
2. **L1-Q2 two-cycle 4↔6** — two boxes (4 and 6) with a double-arrow; labels "odd exponent" above 4, "even exponent" above 6; examples 4^19→4 and 4^18→6. VLM PASS first time.
3. **L5-Q2 factorial wall** — 10 columns for 1! through 10! with unit digits 1,2,6,4,0,0,0,0,0,0; dashed vertical "wall" between 4! and 5! (5!=120); sum 1+2+6+4=13→3 highlighted; footer "1!+2!+⋯+100! ends in 3 (verified: Σ to 10 = 4,037,913)". VLM PASS first time.

**Pass C — two enrichments INTO existing lesson:**
1. **New example "The cube census — every digit appears"** — in the 'squares census' section. Lists all 10 cube unit digits (0³→0, 1³→1, 2³=8, 3³=27→7, 4³=64→4, 5³=125→5, 6³=216→6, 7³=343→3, 8³=512→2, 9³=729→9) showing the bijection is its own inverse on non-fixed points (2↔8, 3↔7). Explains via mod-2/mod-5 permutation.
2. **New L5 question "Find the unit digit of 7^7^7"** — L5 2→3 questions. Power tower (right-associative): 7^7=823543, 823543 mod 4=3, position 3 on 7-wheel=3. Answer: 3.


## 2026-11-21 — job 538572 fire (cron 0,30 * * * ? IST) — ans-linear-congruences-glimpse-of-fermat

**Pass B — three solution visual aids (all inline SVG from named constants), all first-pass VLM PASS:**
1. **Example-4 Sunzi ladder** — 3-rung table showing conditions merged rung by rung (x≡2 mod 3 → ∧ x≡3 mod 5 → x≡8 mod 15 → ∧ x≡2 mod 7 → x≡23 mod 105), modulus growing 3→15→105, downward arrows between rungs, footer with the three checks.
2. **Example-6 Fermat reduction** — 4-box arrow flow for 2^100 mod 13: the power → Fermat 2^12≡1 (mod 13) → split 100=12·8+4 → leftover 2^4=16≡3; footer 2^100=(2^12)^8·2^4≡3 (mod 13).
3. **L2-Q2 solution family** — number line 0-14 with the three solutions of 9x≡12 (mod 15) at x=3, 8, 13 circled and bolded, +5 spacing annotations, footer with the three checks (27=15+12, 72=60+12, 117=105+12).

**Pass C — two enrichments INTO existing lesson + one accuracy catch:**
1. **New L5 question: the non-coprime trap** (x ≡ 2 mod 6 ∧ x ≡ 3 mod 4 — no solution): gcd(6,4)=2≠1 so CRT guarantee does not apply; the conditions demand contradictory parities (even vs odd). General lesson: agreement on the shared prime part → class mod lcm; disagreement → no solution.
2. **New L5 question: the non-coprime pair that works** (x ≡ 6 mod 8 ∧ x ≡ 6 mod 12): both demand x ≡ 2 (mod 4), agreement → x ≡ 6 (mod lcm(8,12) = 24), smallest 6. L5 1→3 questions.
3. **ACCURACY CATCH (inherited defect fixed):** the previous fire's 5.3 cube-census enrichment shipped a duplicate kind property (kind: 'para' + kind: 'example' in one object literal — TS error TS1117) plus a mis-indented following para; both fixed this run; tsc clean on ch-05.ts after the fix.

**Verification:** every coordinate in the 3 new SVGs computed from named constants (ROW_H, ROW_GAP, TOP_Y, COL_*, BOX_W2, BOX_H2, GAP2, LINE_Y, X_START, X_END, TICK_W). Generator: /home/z/my-project/scripts/audit-figs-5-4.py. VLM strict PASS ×4 (all first-pass). Static XML DOM gate clean. tsc 0 errors in ch-05.ts (after the inherited-defect fix). Sanity: braces 790/790 full file; no duplicate kinds. 13 refusals recorded.


---

## 2026-11-21 — audit-bot run: ans-closure-failures-that-force-extension (ANS 6.1 The Closure Failures That Force Extension)

**Pass A (figure audit):** 1 body figure audited (the wall and the repair) — VLM round 1 FAIL (bottom caption clipped left, top caption clipped right: both text extents escaped the 520-wide viewBox), FIXED in-SVG by widening viewBox 0 0 520 210 → -50 0 600 210 (element coordinates untouched; all verifier pins hold; re-pinned the verifier's viewBox comment), round 2 VLM PASS. Verifier baseline 233/233 after.

**Pass B — four solution visual aids (all VLM PASS, 3 first time + 1 one-round fix):**
1. **Example-1 two backward walks from 7** — row 1: 7−5, five steps down the chain landing on bold 2 (alive); row 2: 7−9, six steps consumed down to 1 then a dashed demand arrow into the wall glyph left of 1 (three steps still demanded; 1 is nobody's successor).
2. **Example-2 the 0-less repair line** — the audited proposal drawn: dashed mirrors −3..−1 (far wall repaired, x+9=4 answers x=−5), empty dashed box between −1 and 1 where 0 was refused (the hole in the middle: x+5=5 still dead), solid naturals 1..7 (ℕ unchanged). One VLM fix round: the dashed overlay over a solid underlay did not read as dashed — the axis itself now switches style at the hole.
3. **L2-Q3 the lift shaft** — two-column floor|signed table with the ground floor as chosen zero (1→+1, G→0, B1→−1, B2→−2 bold, B3→−3 bold) and the 'deeper = smaller' arrow from B2 to B3: more depth below zero = a smaller number, −3 < −2, B3 is lower.
4. **L3-Q1 the census grid** — the x+b=a 6×6 square: shaded upper-right triangle (a ≤ b) = the 21 dead pairs with the diagonal wall cases emphasized, 15 unshaded live cells below; 'more than half the map is water.'

**Pass C — two enrichments INTO existing lesson (+1 accuracy catch):**
1. **New example: the rubber stamp audited** (declare 4−7=1 and watch a law die) — placed after the four-demands list; the inverse reading forces 1+7=4 while the chain gives 1+7=8: one question, two answers — demand (iii) is what the stamp breaks. The prose claim from 'Not every patch is a repair' now has its worked instance.
2. **New L5 question: the zero-without-mirrors audit** (admit 0, refuse the mirrors) — fixes x+b=b via 0 but leaves x+9=4 dead; breaches demand (i); the mirror twin of the existing L6 0-less audit. L5 1→2 questions.
3. **ACCURACY CATCH (verifier descriptor):** verify-book2-ch06.ts's P L6.1 line said the 0-less repair 'violates demand (iv)' while the lesson prose (both Example 2 and L6-Q1's solution) says the breach is demand (i) (demand (iv) is explicitly *not* broken — nothing that solved before stopped solving). Verifier descriptor aligned to demand (i).

**Verification:** all SVG coordinates computed from named constants (generator /home/z/my-project/scripts/audit-figs-6-1.py with built-in text-extent margin asserts); VLM strict PASS ×5 this run (body round 2 + 4 solution figs); tsc --noEmit 0 errors PROJECT-WIDE (node_modules present this fire — no infra-error fallback needed); verify-book2-ch06.ts 235/235 (233 authored + 2 new pins: P L5.2 zero-without-mirrors, P Ex-RS rubber stamp); static XML DOM gate clean (pixel margins all ≥8px on every SVG); file-level re-extraction of all 4 solution figures re-rendered identical to the VLM-passed renders. 12 refusals recorded with reasons. No AI-generated images (nothing texture-class in this lesson — all four figures are number-line/table/grid class, SVG by law).


## 2026-11-24 — audit-bot run: ans-constructing-the-integers-from-the-naturals (ANS 6.2)

**Pass A — body figure FIXED (3 real defects):** the difference lattice — (i) the owe-box label was jammed between the (1,2) mirror endpoint and the (1,1) diagonal endpoint (ink gaps 0.6px/1.9px, ambiguous association) → viewBox widened left, label moved to the left margin as two end-anchored lines bracketing the (1,2) row; (ii) the aria-label's above/below directions were inverted (b counts upward: positive class below-right, negative above-left) → corrected; (iii) the caption's 'one step into the have region' mis-described the drawn d=+2 line → 'two steps'. Verifier V2 re-pinned 233→244 checks, all green.

**Pass B — four solution visual aids (all VLM first-pass PASS):**
1. **Illustration-1 the cross-sum X-bridge** — (a,b)=(5,2) and (c,d)=(8,5) as have/owe cards; the amber arrow pairs first-have with second-owe (a+d = 5+5 = 10), the teal arrow first-owe with second-have (b+c = 2+8 = 10): equal cross-sums, equivalence without subtracting.
2. **Illustration-3 the box-rule routing** — the four products of (2,1)·(1,3) as chips routed by arrows: like-with-like (a·c = 2, b·d = 3) into the amber have box (5), mixed (a·d = 6, b·c = 1) into the orange owe box (7) → the pair (5,7) names −2.
3. **L3-Q1 the value-3 family** — six pairs (4,1)..(9,6) on one ruled diagonal (a−b = 3), '+1 have, +1 owe' per step, the dashed (10,7) beyond the ≤ 9 bound: exactly six members.
4. **L3-Q2 the pooling line** — [(1,3)] walks −2 from 0, [(1,4)] walks −3 more; the sum pair (2,7) reduces to [(1,6)] = −5: two owe-boxes pool their debts.

**Pass C — two enrichments INTO existing lesson:**
1. **New example: the fault-tolerant audit** (re-run −3 + 7 + (−5) + 9 as have versus owe) — placed after the ℤ operation tables; the exam corner's promised two-second recomputation gets its worked instance and its class cross-check (boxes: 16 vs 8; pairs: [(20,12)] ~ [(9,1)] = 8).
2. **New L5 question: the mirror sum** — [(a,b)] + [(b,a)] = [(a+b, a+b)] diagonal/zero; the mirror of the mirror returns the original (−(−x) = x); self-opposites ⟺ the diagonal (a+a = b+b ⟹ a = b). L5 1→2 questions.

**Verification:** all SVG coordinates computed from named constants (generator /home/z/my-project/scripts/audit-figs-6-2.py with text-extent margin asserts ≥8 viewBox units before render); VLM strict PASS ×5 this run (body after fixes + 4 solution figures, all re-derived values correct); verify-book2-ch06.ts 244/244 (233 authored + 11 new pins: V2 label/aria/viewBox re-pins, R L5.2 ×4, V3 ×3 — verify-first, pinned before the prose); bun-import syntax+shape validation of ch-06.ts (node_modules missing this fire — npx pulled the wrong stub, the established fallback used); static XML + pixel-margin DOM-gate substitution (audit-svg-overlaps.sh NAV FAIL — dev server not running, 8th consecutive precedent); 15 refusals recorded with reasons; no AI-generated images (nothing texture-class — bridge/routing/lattice/number-line are all SVG by law).

## 2026-11-24 — audit-bot run: ans-the-laws-of-integer-arithmetic (ANS 6.3)

**Pass B — four solution visual aids (0–2 discipline, 15 refusals logged):**
1. **Example 2 (two computations ℕ refused: 3 − 8 and 5 − 5)** — the two backward walks: amber 8-step arrow 3→−5 past zero, teal 5-step arrow 5→0, green diagonal landing dot, the pair computations [(5,10)] ~ [(1,6)] and [(7,7)] beneath. First-time VLM PASS.
2. **Example 3 (derive a · (−b) = −(ab) at a = 2, b = 3)** — the owe-box-wins balance: amber have-bar 7 (3·1 + 1·4) vs teal owe-bar 13 (3·4 + 1·1), dashed have-top level line, double-headed lead arrow 'ab = 2·3 = 6' — the mixed products out-owe by exactly ab, so (7,13) ~ (1,7) names −6. One fix round (self-contained relabel), then PASS.
3. **L1-Q2 (order the chain −7, −2, 0, 4, 9)** — the chain line: the five values as bold amber/green/teal dots with canonical forms [(1,8)], [(1,3)], [(1,1)], [(5,1)], [(10,1)], side brackets owe/have, top chain reading −7 < −2 < 0 < 4 < 9. Offline-gate fix round (viewBox height), then first-time VLM PASS.
4. **L2-Q3 ([(1,1)] · [(7,2)] vs [(5,1)] · [(1,6)])** — the pair-space diagonals: two have/owe squares, solid diagonals have = owe; the (9,9) dot ON the diagonal names 0 (zero eats), the (11,31) dot OFF on the owe side names −20 (nonzero survives) — the zero-product lemma as a picture. One fix round (solid diagonal after a pixel-disproven spatial flag), then PASS.

**Pass C — three enrichments INTO the existing lesson:**
1. **New example: the equation inventory at a glance** (3 + x = 2; 3·x = 12; 3·x = 13; 3·x = 0) — the one-paragraph 'equation inventory settled' claim now has its worked four-verdict instance: solve, solve-because-c | d, dead-because-3 ∤ 13 (brute-swept), forced-zero (5,5) diagonal.
2. **New L5.2 question: the distributive sign factoring** — (−6)·47 + (−6)·53 = −600 as literal class arithmetic, term route vs distributed route, both landing on −600. The exam corner's advertised instance, cashed. L5 1→2 questions.
3. **New L6.2 question: existence + uniqueness of x + b = a** — the 'exactly one solution' headline proved (mirror + associativity for existence; right-side cancellation for uniqueness), with both sweeps run. L6 1→2 questions.

**Verification:** VERIFY-FIRST — verify-book2-ch06.ts extended with section V4 (10 new pins: V4a–V4e the inventory example, V4f the wall case 5 − 5 = [(7,7)], V4g–V4h the factoring routes, V4i–V4j the existence/uniqueness sweeps) BEFORE any prose was written; 244 → 254/254 green. All SVG coordinates computed from named constants (generator /home/z/my-project/scripts/audit-figs-6-3.py). VLM strict: body figure PASS (one terminology false-positive trail recorded — have/owe is house vocabulary), 4 solution figures PASS (2 first time, 2 after one fix round each; one spatial flag disproven by pixel measurement). npx tsc unavailable (node_modules missing — pulled the wrong stub; established fallback: bun-import syntax + shape validation of ch-06.ts — 47 blocks, 1 body figure, 2 example figures + 2 question figures, 16 questions, all SVGs viewBox+aria'd). Static XML + pixel-margin DOM-gate substitution (audit-svg-overlaps.sh NAV FAIL — dev server not running, 9th consecutive precedent). No AI-generated images (nothing texture-class — walks/bars/lines/pair-spaces are all SVG by law).



---

## 2026-11-25 — audit-bot run: ans-from-fractions-to-the-rational-system (ANS 7.1 'From Fractions to the Rational System')

**Pass B — 4 solution figures added** (schema: `figures: SolutionFigure[]`):
1. **Example-1** (canonical reduction of four inscriptions + the refusal) — *the reception desk*: five lanes, inscription chip -> gcd arrow -> canonical chip in chapter orange, the fifth lane refused in red at a wall ('not an object').
2. **L2-Q2** (1/2 + 1/3 through the pair formula) — *the common-denominator bar model*: three bars over one six-column grid, 3 amber + 2 teal = 5 green sixths; the note ties the shaded counts to the numerator seats of (5, 6).
3. **L3-Q1** ((2,5) ~ (10,25)) — *the slope-2/5 ray zoom*: amber seed, four dashed hops of (+2,+5), the emphasized multiple 'four hops out', the cross-product witness.
4. **L6-Q1** (transitivity needs d != 0) — *partition vs collapse*: left the 18-dot lattice with three example rays (the partition, transitivity drawn); right every dot bound to (0,0) inside one red universal class (the collapse, the failure witness in house red).

12 candidate solutions judged and refused with reasons (see FIGURE_AUDIT_LOG INFO line).

**Pass C — 2 enrichments INTO the existing lesson:**
1. New example *'Count the 14 patterns yourself — the census arithmetic, derived'* after the division-census table (the 6+3+2+1+1+1 = 14 column walk, x 4 sign combinations = 56 of 144).
2. New **L5 exercise set** (2 questions) — the ladder's missing level: the two-name class-sum landing on 7/6 (well-definedness, named) and the general repair statement [(d,c)] answers x*c = d (proved through the pair algebra, both chapter probes checked, uniqueness forward-referenced to 7.2).

**Verification:** VERIFY-FIRST — verify-book2-ch07.ts extended with section U (22 new pins: U1 the 14-pattern derivation; U2 the two-name sum landings (7,6)/(42,36); U3 the general witness (d,c)*(c,1) ~ (d,1) swept on four sign cases; U4 the bar-model counts; U5 the five ray hops each equivalent; U6 the desk gcd labels; U7 the collapse cross-products) BEFORE any prose — 239 -> 261/261 green. All SVG coordinates computed from named constants (generator /home/z/my-project/scripts/audit-figs-7-1.py, text-extent margin asserts, offline static XML gate with <g> attribute inheritance, pixel-margin measurement per figure). VLM strict: body figure PASS light+dark untouched; 4 solution figures PASS (1 first time, 3 after fix rounds — one real generator axis-swap caught by the offline gate, one real ray-terminus-short caught by VLM, one arrowhead-attach ambiguity fixed, three colour claims disproven by direct pixel census and logged). npx tsc unavailable (node_modules missing — the wrong-stub pull; established fallback): bun-import syntax + shape validation of ch-07.ts — 48 blocks, 1 body figure + 4 solution figures, 3 examples, 16 questions L1-L6 complete, all SVGs viewBox'd + aria'd, braces 1683/1683 balanced, backticks even. No AI-generated images (nothing texture-class — desks, bars, rays and panel contrasts are all SVG by law).


---

## 2026-11-26 — audit-bot run: ans-the-field-laws-division-joins-the-family (ANS 7.2 'The Field Laws: Division Joins the Family')

**Pass A — body figure audited, FIXED (2 real defect classes found):**
The mirror-map figure failed the strict label-anchor audit on recompute: 7 of 11 fraction labels were placed at their MIRROR pair's coordinates (3/2's label sat on the 2/3 dot, 2/3's floated in blank space, 1/4↔4 and 1/3↔3 swapped, 1/2 detached) — the VLM's round-1 'arrows run backwards' flags were the swapped labels misreading correct arrows; and the dashed diagonal was drawn at screen slope −1.326 from y-offset +28 (below the origin), missing the amber (1,1) dot by ~35px — with unequal axis scales (56 vs 44 px/unit) the seat-swap is not a Euclidean reflection, so 'sit symmetric across the diagonal' could not be pixel-true. **Fix (ladder step 1, all from constants):** equal 48px/48px axis scales — the swap becomes the exact Euclidean reflection across x+y=320 through the amber dot; straight rim-to-rim arrows with disjoint perpendicular bows (the (2,3)/(1,4) connectors are collinear; the original quadratics shared a ctrl point and crossed); labels re-anchored from an explicit per-dot offset table (3/2 and 1/2 above, 1/3 below their dots after an ambiguity catch); caption 'Amber dots' → 'Amber arrows trace mirrored pairs'. The offline DOM-substitute gate then caught a collision the VLM missed (raised top row vs the 'numerator a ↑' caption) — caption to y=28. VLM strict round 2: PASS.

**Pass B — 5 solution figures added** (schema: `figures: SolutionFigure[]`):
1. **L2-Q1** (7/3 ÷ 2/3, why the denominators vanish) — *the thirds bar*: seven third-cells, three teal two-cell brackets 'one 2/3' + one orange single-cell bracket 'half a 2/3'; the counting reading of the quotient drawn. (1 clarity fix round: the verdict line now names its units.)
2. **L2-Q2** (−9/4 ÷ 3/8 = −6) — *the 8ths hop line*: six equal backward arcs of 3 eighths from 0 to the amber −18/8 landing dot; the quotient counts the hops, sign and all.
3. **L3-Q1** (sign test on −7/12, 0/9, 5/6) — *the sign-test strip*: three amber verdict boxes (ab computations + verdict word) staggered over the number line, dashed leaders to the ticks.
4. **L3-Q2** (midpoint of −1/2 and 1/6) — *the bisection line*: amber −1/6 exactly halfway, two equal '2/6' measure bars, the (ps+rq)/(2qs) annotation, the strict chain in green.
5. **L4-Q1** (tank 2/3 full, drain 1/4) — *the tank bookkeeping*: 12-cell tank bar (5 green remains / 3 dashed-orange drained / 4 empty), then the drained 3 laid against the remaining 5 → 3/5.

11 candidate solutions judged and refused with reasons (see FIGURE_AUDIT_LOG INFO line).

**Pass C — 3 enrichments INTO the existing lesson:**
1. New example *'The sign test is class-invariant: two names, one verdict'* after the positivity para — three names of one class, one verdict, the ab·d² = cd·b² engine shown numerically.
2. New derivation *'Order compatibility through the seats — and why the multiplier's sign governs'* before Density I — objective 4 promised the compatibility proof; the lesson only asserted sweeps. Now derived: addition (same-denominator numerator comparison), multiplication (cross-multiply, cancel cd — the sign of cd IS the flip point), plus the printed chain's leading pair put through all three moves.
3. New **L5 exercise set** (1 question) — the ladder's missing level: solve 3/4·x = 5/6 in ℚ by the reciprocal law (x = 10/9, checked) with the ℤ death of 3x = 5 named. Ladder now L1:4 L2:4 L3:3 L4:2 L5:1 L6:2.

**Verification:** verify-book2-ch07.ts extended with section V (20 new pins: the invariance identities, the compatibility worked instances including the flip, the L5 solve/check/death, and per-figure number pins) BEFORE prose shipped — the verifier itself caught one dishonest pin of mine (sign products agree in sign, not value; corrected) — 261 → 281/281 green; npx tsc --noEmit 0 errors (node_modules installed this fire). All SVG coordinates computed from named constants (generator scripts/audit-figs-7-2.py, text-extent margin asserts, offline static XML gate, offline DOM-substitute overlap gate with containment rule, pixel margins per figure). VLM strict: body figure FIXED→PASS, 5 solution figures PASS (4 first time, 1 after one clarity fix round). audit-svg-overlaps.sh NAV FAIL (11th consecutive) — offline substitution logged. No AI-generated images (nothing texture-class — bars, hop lines, strips and tank cells are all SVG by law). No new lesson authored; RESUME_POINTER/PROGRESS/WORK_INVENTORY/TOC_FOLD_LEDGER/ENHANCEMENT_POINTER untouched.

## 2026-11-26 — audit-bot run: ANS 7.3 'Density and the Decimal Mirror, Proven'

**Pass B — 2 solution visual aids (embedded via `figures` on ExerciseQuestion):**
1. L2-Q1 (5/12 off the engine) — the walk machine with the strip: three states, arrows d=4/d=1, the 8→8 self-loop (d=6), and a digit strip splitting the two amber free digits from the teal 6-cycle — the third machine shape (tail then self-loop) the body figures do not show.
2. L3-Q2 (0.2\overline{9} interpreted) — two names, one point: 0.3 and 0.2999… leader-anchored to the same dot on a 0.29–0.31 window.

**Pass C — 3 enrichments INTO the existing lesson:**
1. New **L5 exercise set** — the ladder's missing level (shipped L1/L2/L3/L4/L6): L5-Q1 the full-box sweep b = 2..20 (answer 7, 17, 19; 13 gives 6 of 12, 14 gives 6 of 13) tied to the Fermat shadow; L5-Q2 0.\overline{6} + 0.\overline{1} computed two ways (convert-then-add 2/3 + 1/9 = 7/9 vs digit-column 0.777… with the legality argument). Ladder now L1:4 L2:4 L3:3 L4:4 L5:2 L6:2.
2. New insight callout **"The cyclic number: 142857 wears every multiple as a rotation"** after the Fermat-shadow paras — ×2..×6 all rotations (engine-verified), 2/7 = 0.\overline{285714} enters the ring at r = 2, 5/7 = 0.\overline{714285} at r = 5, and 142857 × 7 = 999999 as the ring closing.
3. **Accuracy catch (4 fixes, keys untouched):** the quiz explanations' option references were scrambled — Q1/Q3 references shifted +1 off their targets, Q2/Q4 transposed the correct option's label with a distractor's (each explain's "Option N" no longer matched the option it described; Q5 alone was consistent). All four explains reworded to unambiguous ordinal references ("the first/second/third/fourth option") with the mathematical content unchanged. Quiz answers/keys untouched.

**Verification:** verify-ans-7-3.py (78 checks) ran BEFORE authoring — every number of the lesson (mirror table, 13-prime period list, criterion sweep to 60, all conversions, all 15 existing exercise answers, quiz keys) plus the planned L5/callout numbers; 0 failures. verify-book2-ch07.ts extended with section W (14 new pins: the 5/12 walk, the 27/90 point, the five rotations + 2/7/5/7 entries, the full-box sweep, the (21,27)→7/9 reduction) → 281 → 295/295 green; npx tsc --noEmit 0 errors. Both solution figures embedded byte-identical to their VLM-audited files (sha256 in the splice script). audit-svg-overlaps.sh NAV FAIL (12th consecutive) — offline substitution logged. No AI-generated images (machine diagrams and number lines stay SVG by law). No new lesson authored; RESUME_POINTER/PROGRESS/WORK_INVENTORY/TOC_FOLD_LEDGER/ENHANCEMENT_POINTER untouched.


## 2026-11-26 — owner-directive run: AI hero images for the authored CS lessons (computer-fundamentals, 12 of 22)

**Directive (owner, in-channel 2026-11-26):** use very high quality and clear
AI-generated images for the already-authored computer-science lessons
wherever required.

**What was judged "required" — and what was not.** The 12 content lessons
whose subject is physical or scene-setting: all of ch.1 (1.1 structure,
1.2 hardware census, 1.3 software), all of ch.2 (2.1 input, 2.2 output,
2.3 usability) and all of ch.4 (4.1 motherboard, 4.2 processor, 4.3 memory
hierarchy, 4.4 buses and ports), plus the two ch.3 lessons with a genuinely
visual anchor (3.1 bits — the two-symbol switches; 3.4 the parade — the
RGB subpixel macro). The four Unit Review lessons (1.R, 2.R, 3.R, 4.R) and
the six pure-procedure lessons of ch.3 (3.2, 3.3, 3.5, 3.6, 3.7, 3.8) were
judged NOT to need a raster hero: their SVG diagrams, ladders and tables
carry the pedagogy, and a decorative photograph would add noise, not
understanding.

**Schema (one-time, additive):** new block kind
`{ kind: 'image'; caption: string; src: string; alt: string }` in
src/data/library/types.ts (with its `countLessonWords` case — captions
count as read prose), and a `case 'image'` renderer in
src/components/library/blocks.tsx (next/image `fill`, aspect 2:1,
max-w-3xl, caption beneath — the figure block's furniture). The image is
deliberately OUTSIDE the Figure N numbering: `figureNumbers` counts only
`kind:'figure'`, so no existing figure number, verifier pin or caption
reference moved.

**Images:** 12 wide heroes, 2048x1024, .webp q90, text-free prompts,
placed immediately after each lesson's opening paragraph. Fix rounds until
VLM PASS: 6 first-pass, 6 after regeneration (worst case the 4.2 processor
at round 5 — full trail in FIGURE_AUDIT_LOG).

**Verification:** `tsc --noEmit` 0 errors; eslint 0 on the two touched src
files; verify-cs-book1-ch01 GREEN; verify-cs-book2-ch02 GREEN;
verify-cs-book2-ch04 542/542 GREEN; verify-cs-book2-ch03 carries 2
PRE-EXISTING Z failures (Z19 "chapters 4-8 still planned", Z23 "17 written
lessons" vs the 22 that RUN 7/8 shipped) — proven pre-existing by stashing
this pass's ch-03.ts edits and re-running (identical failures); that ledger
belongs to the CS RUN 9 riders. No rotation state was touched: this pass
does not bump lastAuditedLessonId.
