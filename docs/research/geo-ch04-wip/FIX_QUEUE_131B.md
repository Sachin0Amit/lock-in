# RUN 131-B FIX QUEUE — Geometry ch.4 figure defects (VLM-swept, coordinate-verified)

Parts: `docs/research/geo-ch04-wip/part-geo40X.ts` (X = lesson 4.X; SVG helper consts `geo401`…`geo404`-prefixed).
Engines `v-geo401.ts`…`v-geo404.ts` are IMMUTABLE TRUTH — fixes are VISUAL ONLY (label nudges, anchors, viewBox widen if genuinely needed, contrast). NEVER change a computed value or pinned string.
Source: `bash scripts/sweep_vlm_geo131.sh` + `bash scripts/audit_vlm_geo131.sh`; verdicts banked in `docs/research/geo-ch04-wip/vlm-sweep-run131-verdicts/` (41.txt–44.txt + SUMMARY.md). Every FAIL reproduced in BOTH themes → one nudge per figure fixes light and dark together.

Figure-index map (vlmfigN = Nth body `figure` in page order; verified by label text in the crops):
- 4.2: vlmfig0 geo42Lemma, vlmfig1 geo42Bpt, vlmfig2 geo42Ladder, vlmfig3 geo42Mid, **vlmfig4 geo42Numeric**.
- 4.3: vlmfig0 geo43AAProof, vlmfig1 geo43SASPair, vlmfig2 geo43Ladder, vlmfig3 geo43SSSCensus, vlmfig4 geo43SSSCheck, **vlmfig5 geo43SSAFail**, **vlmfig6 geo43Shadow**.
- 4.4: vlmfig0 geo44Split, vlmfig1 geo44Mean, vlmfig2 geo44Ladder, vlmfig3 geo44Squares, **vlmfig4 geo44Shadow**, **vlmfig5 geo44Census**; vlmsol0 = first non-figure solution svg = the shared Σ "Remember" FormulaBlock header (src/components/library/blocks.tsx — NOT a part file).
- 4.1: all figures (geo41Family…geo41RectPair) PASSED — nothing queued.

## Queue (priority order)

1. **part-geo402.ts `geo42Numeric`** (lesson 4.2, vlmfig4 = images 5/13, light+dark): "AB = 14" (end-anchored, x=112, y=342) overlaps vertex label "B" (x=84, y=334) ≈10×6px, and symmetrically "AC = 21" (start-anchored, x=534, y=342) overlaps vertex label "C" (x=556, y=334) ≈10×6px — teal segment labels run directly under the bold B/C glyphs. Fix: drop both labels one text-line lower (y 342→≈354) or end/start-anchor them clear of the vertex glyphs (AB end x 112→≤70; AC start x 534→≥590 is clipped — prefer the y-drop). Keep "BC = 28" (320,348) as-is.
2. **part-geo403.ts `geo43Shadow`** (lesson 4.3, vlmfig6 = images 7/15): caption "AA: right angle at the ground + the shared sun angle" (start-anchored, x=320, y=130) is crossed by the tree's vertical green line (x=330, through "AA:") and by the dashed treetop sun ray (crosses the caption band at x≈354, through "right") — two strokes through two words. Fix: move the caption off both strokes — smallest change is start x 320→≈362 (clears tree and the ray at that height), or relocate below the ground line (y≈345, middle-anchored ≈320, clear of "2 m"/"12 m" glyphs); do NOT move the tree or rays (they carry the AA geometry).
3. **part-geo403.ts `geo43SSAFail`** (lesson 4.3, vlmfig5 = images 6/14): "c ≈ 9.6328920" (start-anchored, x=322, y=352) overlaps the orange vertex label "B₂" (x=330, y=348) ≈12×9px — the c₂ label's first glyphs print on top of B₂, with the dashed red arc passing ≈5px above the pair. Fix: nudge the c₂ label down-right clear of B₂ (x 322→≈352, or y 352→364 — viewBox height 370 makes the x-shift safer); leave the arc and both triangles untouched (computed truth).
4. **part-geo404.ts `geo44Shadow`** (lesson 4.4, vlmfig4 = images 5/12): "2 m" (start-anchored, x=172, y=254) sits on the dashed orange sun ray (150,237)→(194,270) — the "2" glyph is struck by the stroke ≈8×14px (the label was placed inside the stick-shadow triangle). Fix: smallest move that clears the ray — tuck the label under the amber shadow bar (middle ≈172, y≈268) or end-anchor at x≤168; do not move the ray or shadow bar.
5. **part-geo404.ts `geo44Census`** (lesson 4.4, vlmfig5 = images 6/13): x-axis title "a (shorter leg)" (middle-anchored, x=470, y=464) collides with the "80" tick label (start-anchored, x=454, y=458) ≈22×8px — "(shorter" prints over the last tick. Fix: widen the viewBox height 470→480 and move the title to y≈474 (keeps all 16 pinned dot positions and the arc untouched), or shift the title right so its glyph box starts at x≥480.

Suspected FALSE POSITIVES (kept for the record, not queued — do not "fix" these):

- **4.4 vlmsol0-dark (image 14): "Σ Remember band nearly illegible in dark"** — REJECTED. Live DOM measurement on the dark page: header text `lab(73.5, −32.1, 19.0)` on background `lab(18.0, −7.6, 4.5)` ≈ **6.8:1 contrast** (light green on near-black, comfortably legible). The band is the shared `FormulaBlock` (src/components/library/blocks.tsx) — out of ch.4's part files — and the identical band PASSED in the 4.1 audit (image 15). Doubtful because the VLM called light-green text "dark green"; the DOM numbers override it.
- **4.3 vlmfig5 sub-claims** (images 6/14): "c ≈ 2.4914636 crosses the triangle sides near C" — coordinate check: side C→B₁ passes x≈172–186 within the label's y-band while the label starts at x=196 (≥10px clear); "'radius a = 5' sits on the dashed circle" — arc start (341,318) lies ≈10px below that label's band (≤3px corner graze at worst). The image still FAILS on the real B₂ collision (queue item 3), so only these two sub-claims are rejected, not the image.

## Laws

- Smallest visual change that clears the collision; palette colors; accurate aria-labels; U+2212 minus only; no TeX in SVG.
- Fixes live ONLY in part-geo401..404.ts figure consts named above; computed coordinates feeding triangles/points (D, E, B₁, B₂, the 16 census pts, arc radii) are pinned truth — move labels/captions/viewBox, not geometry.
- After fixes: `bash scripts/sweep_vlm_geo131.sh && bash scripts/audit_vlm_geo131.sh` → previously-FAIL images (42: img 5/13; 43: img 6/7/14/15; 44: img 5/6/12/13) must now PASS, and `bunx tsc --noEmit 2>&1 | grep 'geometry/ch-04'` must output nothing.
- Budget: items 1–3 first (text-on-text, worst legibility); 4–5 polish. Part files must stay valid TypeScript at every write.
