# SPEC FIX_QUEUE_132B — the ch.5 VLM figure-defect fix rider (RUN 132; RE-BANKED with status)

> STATUS (run-132 close): the geo504 items (#17-#24 below) were FIXED at part level + mirrored into the ch-05.ts twin by the fix seat before the artifact destruction — verified geo504 96/96 harness-green + tsc 0 AFTER the fixes; the VISION RE-AUDIT of those fixes still PENDING (the crops were wiped). The geo501/502/503 items are STILL OPEN. Run 133 executes the remainder + the 504 re-audit.

## MISSION
The RUN 132 VLM light+dark sweep of GEOMETRY chapter 5 (verdicts re-banked at `docs/research/geo-ch05-wip/vlm-sweep-run132-verdicts/*.txt`; the /tmp/vlm-geo132 crops were wiped — re-shoot via `scripts/sweep_vlm_geo132.sh` if re-audits need them) found real label-collision defects in all four lessons. Fix EVERY open defect below at the PART level, mirror each fix into the assembled twin, re-pack, re-shoot ONLY the affected figures, and re-audit them with the vision CLI until every fixed figure passes in BOTH themes.

## THE FILES (single-writer law)
- Parts: `docs/research/geo-ch05-wip/part-geo501.ts`, `part-geo502.ts`, `part-geo503.ts` (504 already done)
- Twin (MIRROR every part edit): `src/data/library/books/mathematics/geometry/ch-05.ts`
- The 504 fixes ALREADY LANDED (part + twin, harness-verified): '(3,9)' off the dashed image line; stray 'O' at (O[0]-14, O[1]-10); '2.4 m' +48px down (figure height 430->452); 'h = 2.4' re-anchored start at (283,377); 'ABF: scale 0.6' at (196,404); 'P (3,5)' at (160,244); 'BC = 5' +8px.

## THE OPEN DEFECT QUEUE (from the re-banked verdicts; figure numbers are per-lesson body-figure order)

### part-geo501.ts (lesson 5.1)
1. fig1: the label `√26 = 5.0990199` crosses the teal segment stroke between Q and P — MOVE clear (>=8px), or shorten to `√26 ≈ 5.10` in empty space.
2. fig4: title overlaps grid/arc strokes at top; duplicate origin marker (red dot with `O` AND a stray second `O`) — move the title to a clear band, delete the stray `O`.
3. fig5: `R (5, 0)` collides with the x-axis stroke and the `6` tick — lift clear.
4. fig6: the dot at (1,4) overlaps `B (1, 4)` (dark: the y-tick `4` merges) — offset the label right with clearance.
5. fig8: `image (0, 0), (−4, 0), (−4, −3)` sits over dashed orange strokes — relocate to the clearest pocket.
6. fig9: `foot (2, 2)` and `foot (3.5, 3.5)` overlap the y = x line and dashed joins — nudge each perpendicular OFF the line.
7. vlmsol0 (LIGHT only): the `Σ Remember` summary figure rendered one line with the rest blank — re-shoot first (may be a crop artifact); if it still truncates, fix the figure's height/viewBox.

### part-geo502.ts (lesson 5.2)
8. fig3: `length 3` overlaps the dashed segments it measures — move clear.
9. fig6: `(3, −2)` / `(3, 2)` collides with the caption `every point comes back` — separate.
10. fig10: `mirror y = 0` overlaps the `(0, 0)` point label — move along the mirror away from the origin.
11. fig11: `B′ (10, 5)` touches the orange triangle edge — offset outward.

### part-geo503.ts (lesson 5.3)
12. fig9 (light): the summary line `one line: A M T U V W Y · ...` overlaps the `NO mirror`/`no symmetry` sub-labels; text touches the bottom edge — move the summary strip into its own band (grow SVG height if needed).
13. fig4 (dark): the red caption `attempted mirror: diagonal AC` overlaps the dashed diagonal — move below the figure.
14. fig6 (dark): `180°` clips the top edge; `(3,1)` overlaps the centre dot — move inward / offset.
15. fig9 (dark): bottom-row labels collide with the summary strip — same spacing fix as #12 (must hold in BOTH themes).
16. fig10 (dark): `square 4 · rectangle 2 · rhombus 2 / regular n-gons · H I X` overlaps the thumbnail mirror lines — shrink/move clear.

NOTE: light and dark crops of the SAME figure are the SAME SVG — one coordinate fix serves both.

## THE FIX LADDER (in order)
1. COORDINATE MOVE (preferred; the run-131 precedent — halos fail in dark mode).
2. RE-ANCHOR (start/middle/end).
3. SHORTEN (two stacked lines, dy >= 1.4em).
4. HALO last resort, solid background rect only, never paint-order stroke.

## HARD LAWS
- Edit the SVG helper CALLS' coordinate arguments; never rewrite a whole figure; keep palette/helper names.
- EVERY part edit mirrored byte-equivalently into `src/data/library/books/mathematics/geometry/ch-05.ts`.
- Do NOT touch any other file. Do NOT change ids, figure counts, structure or prose.
- Minus U+2212 in SVG text; no TeX in SVG strings.

## THE VERIFY LOOP
1. `cd /home/z/my-project && bun run lib:pack` (the PACK LAW — the site serves the packed db).
2. Re-shoot only the affected figures (the sweep tagging method; re-shoots to /tmp/vlmfix132/).
3. Re-audit each re-shot batch with `z-ai vision` (the audit prompt inside scripts/audit_vlm_geo132.sh) — PASS in BOTH themes required; iterate (max 2 extra rounds; report residuals honestly).
4. Sanity: the four `bun run docs/research/geo-ch05-wip/v-geo50X.ts` harnesses ALL GREEN; `npx tsc --noEmit` 0.

## REPORT: docs/research/geo-ch05-wip/FIX_QUEUE_132B-REPORT.md — per defect: file, figure, fix, verdict (light+dark); residuals; twin-mirror + harness + tsc confirmation.
