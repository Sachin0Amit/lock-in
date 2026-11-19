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
