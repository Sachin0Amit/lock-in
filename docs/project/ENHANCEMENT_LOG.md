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
