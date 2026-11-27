# RUN 131-B — Geometry ch.4 VLM light+dark figure sweep — VERDICT SUMMARY

Swept: `bash scripts/sweep_vlm_geo131.sh` → audited: `bash scripts/audit_vlm_geo131.sh`.
Crops: `/tmp/vlm-geo131/<code>-vlmfigN|vlmsol0-{light,dark}.png` (62 files, all non-zero-byte; no retries were needed — the concurrent db repack caused no blanks and no 500s during the window).
Verdicts banked verbatim here as `41.txt`–`44.txt` (raw `z-ai vision` output, prompt copied verbatim from `scripts/audit_vlm_geo127.sh`).

Crop→figure mapping (image K in the verdicts ⇒ crop): light crops come first in figure order (vlmfig0…N, then vlmsol0), then the same set in dark. 4.4 has 6 body figures (not 7), so its dark block starts at image 8.

## Per-lesson tally

### 4.1 geo-similar-figures-same-shape-at-any-scale — verdict 41.txt
- Captured: 16 crops (vlmfig0–6 + vlmsol0 × light/dark).
- Reported: 15 images, **15 PASS / 0 FAIL** (the vision call consolidated/dropped one crop; every reported image passed).
- **OVERALL: PASS** — zero defects queued for part-geo401.ts.

### 4.2 geo-the-basic-proportionality-theorem-thales — verdict 42.txt
- Captured: 16 crops (vlmfig0–6 + vlmsol0 × light/dark).
- Reported: 16 images, **14 PASS / 2 FAIL** — image 5 (vlmfig4 light) and image 13 (vlmfig4 dark), the same defect twice: vertex/edge-label collision on the numeric-ladder figure.
- **OVERALL: FAIL** — 1 real defect (2 theme instances), `geo42Numeric` in part-geo402.ts.

### 4.3 geo-the-similarity-criteria-aa-sas-sss — verdict 43.txt
- Captured: 16 crops (vlmfig0–6 + vlmsol0 × light/dark).
- Reported: 16 images, **12 PASS / 4 FAIL** — images 6/14 (vlmfig5 light+dark, SSA ambiguous-pair figure) and images 7/15 (vlmfig6 light+dark, shadow-method figure caption).
- **OVERALL: FAIL** — 2 real defects (4 theme instances), `geo43SSAFail` + `geo43Shadow` in part-geo403.ts.

### 4.4 geo-pythagoras-proved-the-theorem-earned — verdict 44.txt
- Captured: 14 crops (vlmfig0–5 + vlmsol0 × light/dark).
- Reported: 14 images, **8 PASS / 6 FAIL** — images 5/12 (vlmfig4 light+dark, "2 m" on dashed ray), images 6/13 (vlmfig5 light+dark, "80" tick × axis title), image 14 (vlmsol0 dark, Σ Remember band).
- **OVERALL: FAIL** — 2 real defects (4 theme instances), `geo44Shadow` + `geo44Census` in part-geo404.ts; image 14 rejected as a DOM-verified false positive (see queue).

## OVERALL (all four lessons)

- 62 crops captured, 61 audited images reported, **49 PASS / 12 FAIL** verdict lines.
- **5 real defects** queued in `docs/research/geo-ch04-wip/FIX_QUEUE_131B.md` (all label/stroke collisions or label-on-label; no blank/broken SVG regions, no incoherent geometry anywhere).
- **1 false positive rejected** with live DOM evidence (4.4 vlmsol0-dark Σ Remember contrast: computed text `lab(73.5,−32,19)` on background `lab(18,−7.6,4.5)` ≈ 6.8:1 — legible; same shared `FormulaBlock` band passed in the 4.1 audit).
- Every FAIL appears in BOTH themes (the defects are theme-independent — pure geometry/label placement), so the fix is one nudge per figure, not a theme patch.

Defect-free lessons: 4.1 (all 15 reported images PASS). No defects were invented to fill the queue; lesson 4.1 is a clean pass.
