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
