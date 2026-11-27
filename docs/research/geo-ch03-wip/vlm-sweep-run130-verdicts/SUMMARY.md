# RUN 130 — the ch.3 VLM light+dark sweep: verdicts + fix record

Sweep: sweep_vlm_geo130.sh (80 crops, 6 lessons x light+dark, body figures
+ first solution figure each). Audit: audit_vlm_geo130.sh (one vision call
per lesson, the -i flag form). Per-lesson raw verdicts sit beside this file.

## Fixed in-run (part level, re-assembled, verify-book5-ch03 677/677 green)
- 3.1 (geo301) F4 mirror figure: '(8, 0)' moved y 368 -> 388 — the B (6, 0)
  vs (8, 0) collision CLEARED (re-audit: no overlap flagged).
- 3.2 (geo302) fig5 ambiguous case: 'a = 5' end-anchored at (318, 300) off
  the green CB1 segment — re-audit PASS.
- 3.4 (geo304) fig3: '21.79 deg' + '38.21 deg' white halos (paint-order
  stroke) — 38.21 re-audit PASS; 21.79 STILL flagged (needs a coordinate
  move, not just the halo) -> rider below.
- 3.6 (geo306) fig1: 'd = 3*sqrt(17) ~ 12.37' white halo — re-audit PASS.

## Residual debt -> run 131 riders (precise, from the raw verdicts)
- 3.3 (geo303) SIX figures systemic: apex label pile-ups (45.24/22.62,
  90/45, 60/30), the callout covering the apex, 'h =12' crossing the dashed
  axis, 'sqrt3/2 ~ 0.866025' crossing the leg, the fourth triangle (t = 40)
  clipped at the right edge.
- 3.2 (geo302) fig4: 'AB' overlaps the angle-BAC = 50 text + apex strokes;
  the 75-arc overlaps the 'C' label.
- 3.4 (geo304) '21.79 deg' still crossed by the green side stroke near A.
- 3.5 (geo305) fig3/fig5: 'F(6,0)' vs 'AF/FB = 1' overlap at F; 'F(6,-9)'
  collides with side AB and point B.
- 3.1 (geo301) minor: 'A = A'' struck by the teal mirror line (image 1
  re-audit), vertex B/C labels touched by sides (second figure) —
  low-severity, fix with the 3.3 pass.
