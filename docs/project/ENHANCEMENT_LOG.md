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
