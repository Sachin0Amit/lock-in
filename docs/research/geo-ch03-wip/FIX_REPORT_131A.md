# RUN 131-A FIX REPORT — Rider A (Task 2-a), Geometry ch.3 figure queue

Source spec: FIX_QUEUE_130A.md (19 items). All fixes VISUAL ONLY (label nudges,
anchor changes, viewBox widening, callout narrowing/reposition, white halos).
No computed value, pinned string, or engine truth touched. Minus U+2212 only.

## Per-item status

| # | File / figure | Defect | Status | What changed |
|---|---|---|---|---|
| 1 | geo301 geo31Mirror | B (6,0) x (8,0) overlap | FIXED (pre-applied in run 130; verified: '(8, 0)' at y=388 vs 'B (6, 0)' at y=368 — 20px separation) | none needed this run |
| 2 | geo303 geo33Doubled | callout hides apex A; C→B x caption; paths to y=600 vs H=470 | FIXED | SAS panel narrowed 330→240 wide (right edge x=260, clear of apex x≥267 leg / labels at x≥290); data lines re-columned (x 30, font 11); title block recentered x=140; caption moved y 452→616; viewBox H 470→626 so both swap arcs render unclipped |
| 3 | geo303 geo33Sweep | lines to x=665, dots to x=669 vs W=640 | FIXED | W 640→680 (computed points untouched); ground line extended 616→656; title/footers auto-recenter via W/2 |
| 4 | geo303 geo33Equi (fig side=1) | '√3/2 ≈ 0.866025' crosses right leg + '1'; 60°/30° apex pile-up | FIXED | apex 60° end-anchored left of axis (A−42, A+56); 30° start-anchored right (A+6, A+80) — both clear of axis+legs; height label moved into clear interior via new hLabX/hLabY (326, 354); side-6 instance given (486, 430) |
| 5 | geo303 geo33Tri witness ×2 (body + example 1) | 45.24° x t=22.62° on axis; h=12 crossed | FIXED | apexLabSide:true parks 45.24° left of axis (256,268); new halfApexAt override parks t=22.62° right (360,274); hLab relocated to (cx+14, yB−26) with white halo (leg graze ≤2px tail, halo-clean) |
| 6 | geo303 geo33Sweep 4th triangle (t=40°) clipped | right leg ran past viewBox | FIXED | same W 640→680 as item 3 |
| 7 | geo303 geo33Tri truss | 22.62° x 'eave' + struck by arc | FIXED | new cAngAt override: eave-angle label moved to (602,372), clear of arc, 'eave' and right edge |
| 8 | geo305 geo35Menelaus | F(6,0) x AF/FB = 1 | FIXED | AF/FB = 1 dropped Y(−1.15)→Y(−1.85) (~16px lower, below F(6,0) box, clear of transversal + B) |
| 9 | geo305 geo35Duality right panel | F(6,0) grazed by transversal | FIXED | F(6, 0) moved to end-anchored (X−8, Y+24): below AB, left of the descending transversal |
| 10 | geo306 geo36F1 | d = 3√17 ≈ 12.37 struck by side c (AB) | FIXED | label end-anchor moved x 266→186 (fully left of AB stroke; halo kept) |
| 11 | geo306 geo36F3 | left '2 : 1' crossed by C→P median near G | FIXED | x 272→246 (clears C→P median by ≥12px; clear of AM and B→N) |
| 12 | geo306 geo36S2 | AG = 4√37/3 ≈ 8.11 struck | FIXED | end-anchor moved x 262→200, now left of side AB |
| 13 | geo302 geo32Corr | 'AB' struck by side AB ~11px (DC mirrored) | FIXED | AB → (206,148), DC → (454,148): both now left of their rising sides |
| 14 | geo304 geo34Exterior + geo34Hinge | 21.79° collides with arc/side at A; hinge '5' x 60°; '= 5' struck by orange third side | FIXED | Exterior 21.79° moved outside-right of AC (284,170, halo kept); hinge upper '5' → end (150,246) left of orange arm (clears 60° overlap); '= 5' → end (222,214) between the two arms, clear of third side |
| 14b | geo304 geo34I20 (3.4 fig0) | CA '5' at (214,208) pinched: red equal-tick crosses glyph bottom, teal 21.79°-arc terminus grazes top-right, dashed CA grazes bottom-right | FIXED (run-131A iteration) | '5' moved to (208,252) — stays right of the CA dashed line (same side as the AD '5'), below tick + teal arc, clear of BA and of every other label |
| 15 | geo304 geo34I20 | 81.79° struck by its own arc; 21.79° struck by side AB | FIXED | 81.79° → (A+6, A+111) inside the AB/AD wedge below the arc; 21.79° → start (A+56, A−27) right of side AB |
| 16 | geo302 geo32SSA | c1 = 5.268438 struck by side CA1 ~20px | FIXED | x 496→524 (right of the CA1 stroke, clear of C label and edge) |
| 17 | geo303 geo33Tri t=45 fig | h=8 label x t=45° pile-up on axis | FIXED | apexLabSide:true (90° parked left); t=45° → halfApexAt (324,338) between axis and leg, clear of sideR and h=8 |
| 18 | geo305 geo35Duality left panel | O(2,3) struck by teal BE cevian 41px | FIXED | moved into the AD/BE wedge right of O: (X+14, Y−6) — clears both cevians ≥9px |
| 19 | geo306 geo36F1 | 'A' x caption (subtitle) 9.8×4.6px | FIXED | 'A' → (A−16, A−6) = (302,72), below the subtitle line, clear of apex dot |

Also fixed en route (previously-FAIL images not split into their own queue rows):
- geo305 Menelaus + Slope: D(24,−9) label raised Y+3→Y−14 — was grazing the dashed
  BC-extension and crowding the D dot (verdict images 5/10 FAIL).
- geo303 ex-4 figure: apexLabSide for 73.74° (same systemic axis pile-up).

## Verification (filled at the end)

- assemble_run129: OK — ch-03.ts regenerated (7121 lines) from the six parts
- git diff book.ts: 0 lines (untouched, as required)
- verify-book5-ch03: **677 pass, 0 fail — ALL GREEN** (Geo301 96, Geo302 100, Geo303 113, Geo304 115, Geo305 103, Geo306 106, Z 44)
- tsc grep geometry/ch-03: empty (clean)
- lib:pack: PASS — pack v3 refreshed (269 books, 2172 chapters, 241 lessons), registry verify PASS
- re-audit tally (LIGHT theme only, 1280x900, /tmp/vlm-geo131a/, 34 body-figure crops, prompt from audit_vlm_geo127.sh):
  - 3.1 (31): 7/7 PASS — OVERALL PASS (run-130 FAIL 'B (6, 0)' x '(8, 0)' now clean)
  - 3.2 (32): 6/6 PASS — OVERALL PASS ('AB' apex, 'a = 5' now clean)
  - 3.3 (33): 7/7 PASS — OVERALL PASS (all six systemic apex/callout/clip defects cleared)
  - 3.4 (34): first pass 3/4 (vlmfig0 flagged: CA '5' pinched by tick + teal arc + dashed CA) → ONE nudge (item 14b, (214,208)→(208,252)) → re-assembled/re-packed → re-crop re-audit PASS; full-lesson re-audit 4/4 PASS — OVERALL PASS
  - 3.5 (35): 5/5 PASS — OVERALL PASS ('F(6,0)' x 'AF/FB = 1', 'F(6,-9)' x AB now clean)
  - 3.6 (36): 5/5 PASS — OVERALL PASS ('d = 3√17 ≈ 12.37' now clean)
  - Total: 34/34 crops PASS across 6 lessons; all previously-FAILing run-130 defects now PASS

NOT committed (per brief). Files touched: part-geo302/303/304/305/306.ts, generated ch-03.ts, this report, /tmp/vlm-geo131a/ only.
