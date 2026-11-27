# RUN 130-A FIX QUEUE — Geometry ch.3 figure defects (VLM + DOM-verified)

Parts: `docs/research/geo-ch03-wip/part-geo30X.ts` (X = lesson 3.X; SVG helpers `geo301`…`geo306`-prefixed consts).
Engines `v-geo30X.ts` are IMMUTABLE TRUTH — fixes are VISUAL ONLY (label nudges, anchors, viewBox widen, callout reposition, contrast). NEVER change a computed value or pinned string.

## Queue (priority order)

1. **part-geo301.ts `geo31Mirror`**: "B (6, 0)" x "(8, 0)" overlap 3.3x14.2px (x=296/x=336, same y=368, both start-anchored). Separate labels (offset one / end-anchor one).
2. **part-geo303.ts fig0**: opaque yellow callout rect (20,96→350,286) hides apex A (~310,155); "C→B" label overlaps caption/footnote; paths run to y=600 vs viewBox 470 (clipped). Make callout transparent or move it off the apex; move label; extend viewBox height to fit if needed.
3. **part-geo303.ts fig3**: lines to x=665, circle to x=669, viewBox width 640 (right truncation). Widen 640→680 without changing computed points.
4. **part-geo303.ts fig1**: "1" tick x "√3/2≈0.866025" 3.0x6.2px + sqrt label crossed by two strokes. Nudge.
5. **part-geo303.ts fig3/fig5-area labels**: "45.24°" x "t=22.62°" 31x3.7px; "h=12" crossed by dashed axis. Nudge.
6. **part-geo303.ts fig4**: fourth triangle (t=40°) right leg clipped at right edge. Widen viewBox.
7. **part-geo303.ts fig6**: "22.62°" x "eave" 20.4x3.9px + struck by stroke. Nudge.
8. **part-geo305.ts fig2**: "F(6,0)" x "AF/FB = 1" 37.2x8.3px. Separate.
9. **part-geo305.ts fig2 right panel**: "F(6,0)" bottom-left grazed by solid transversal ~4.6px. Small nudge.
10. **part-geo306.ts fig0**: "d = 3√17 ≈ 12.37" struck by median 18px. Nudge off the line.
11. **part-geo306.ts fig1**: left "2 : 1" crossed by median near G. Nudge.
12. **part-geo306.ts fig2**: "AG = 4√37/3 ≈ 8.11" crossed by median 17px. Nudge.
13. **part-geo302.ts fig0 apex**: "AB" struck by triangle side stroke ~11px. Nudge outside.
14. **part-geo304.ts fig2/fig3**: "21.79°"/"38.21°" collide with strokes (15/20px); "5" x "60°" 5.9x6.2px; "≈3"/"5" struck. Nudge.
15. **part-geo304.ts fig1**: two legend texts struck 14-20px. Nudge.
16. **part-geo302.ts fig0**: "c1 = 5.268438" struck 20px. Nudge.
17. **part-geo303.ts fig5**: "[h=8] x [t=45°]" 26.9x3.7px. Nudge.
18. **part-geo305.ts fig1**: "O(2,3)" struck through line 41px. Nudge.
19. **part-geo306.ts fig0**: "A" x caption 9.8x4.6px. Nudge.

NOT defects (ignore): lesson 31 img8 (Remember band is light sage, high contrast); lesson 34 img10 (dark formula legible).

## Laws

- Smallest visual change that clears the collision; palette colors; accurate aria-labels; U+2212 minus only; no TeX in SVG.
- After fixes: `python3 scripts/assemble_run129.py` → check `git diff src/data/library/books/mathematics/geometry/book.ts` (assembler regex may eat the `*/` terminator — restore by hand if eaten; it should need NO change) → `bun run scripts/verify-book5-ch03.ts` MUST be 677/677 ALL GREEN (a broke pin = you touched computed truth; revert and find a visual-only alternative) → re-run `bash scripts/sweep_vlm_geo130.sh && bash scripts/audit_vlm_geo130.sh` → previously-FAIL images must now PASS.
- `bunx tsc --noEmit 2>&1 | grep 'geometry/ch-03'` must output nothing.
- Budget 35 min. Items 1-12 first; 13-19 polish. Part files must stay valid TypeScript at every write.
