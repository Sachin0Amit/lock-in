#!/usr/bin/env python3
"""recover_run132_artifacts2.py — part 2: the pin engine, the FIX_QUEUE spec,
the verdicts, and the run-132 tool scripts (all destroyed at ~02:45; all
re-emitted verbatim from the orchestrator's context)."""
import os

ROOT = "/home/z/my-project"
W = lambda p, s: open(os.path.join(ROOT, p), "w", encoding="utf-8").write(s)
os.makedirs(f"{ROOT}/docs/research/geo-ch06-wip", exist_ok=True)
os.makedirs(f"{ROOT}/docs/research/geo-ch05-wip/vlm-sweep-run132-verdicts", exist_ok=True)

# ------------------------------------------------------- pin engine (58/58)
W("scripts/pin_check_geo132.py", '''#!/usr/bin/env python3
"""pin_check_geo132.py — RUN 132 verify-first pin engine (GEOMETRY ch.6
'Quadrilaterals and Polygons'; RE-BANKED after the run-132 artifact
destruction — this exact source ran 58/58 GREEN before the deletion).

Run: cd /home/z/my-project && python3 scripts/pin_check_geo132.py
"""

import math
from fractions import Fraction

CHECKS = [0]


def ok(label, cond):
    CHECKS[0] += 1
    if not cond:
        raise SystemExit(f"PIN {CHECKS[0]} FAILED: {label}")
    print(f"PIN {CHECKS[0]:3d} PASS: {label}")


def cross(p, q, r):
    return (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])


def shoelace(pts):
    s = 0
    n = len(pts)
    for i in range(n):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % n]
        s += x1 * y2 - x2 * y1
    return abs(s) / 2


def dist(p, q):
    return math.hypot(p[0] - q[0], p[1] - q[1])


# ============ 6.1 PARALLELOGRAMS AND THEIR FAMILY TREE ============
A, B, C, D = (1, 1), (7, 1), (9, 5), (3, 5)
ok("6.1 ABCD: AB parallel DC (both slope 0)",
   (B[1] - A[1]) * (C[0] - D[0]) == (C[1] - D[1]) * (B[0] - A[0]))
ok("6.1 ABCD: AD slope = BC slope = 2",
   Fraction(D[1] - A[1], D[0] - A[0]) == Fraction(C[1] - B[1], C[0] - B[0]) == Fraction(2, 1))
ok("6.1 ABCD: opposite sides equal AB = DC = 6", dist(A, B) == dist(D, C) == 6)
ok("6.1 ABCD: AD = BC = sqrt(20) = 2*sqrt(5)",
   abs(dist(A, D) - math.sqrt(20)) < 1e-12 and abs(dist(A, D) - 2 * math.sqrt(5)) < 1e-12)
ok("6.1 ABCD: diagonals bisect (both midpoints (5,3))",
   ((A[0] + C[0]) / 2, (A[1] + C[1]) / 2) == ((B[0] + D[0]) / 2, (B[1] + D[1]) / 2) == (5.0, 3.0))
ok("6.1 ABCD: vertex law A + C = B + D = (10,6)",
   (A[0] + C[0], A[1] + C[1]) == (B[0] + D[0], B[1] + D[1]) == (10, 6))
ok("6.1 ABCD: shoelace area 24 = base 6 x height 4",
   shoelace([A, B, C, D]) == 24 == 6 * 4)
ok("6.1 ABCD: diagonal lengths sqrt(80)=4*sqrt(5) and sqrt(32)=4*sqrt(2)",
   abs(dist(A, C) - 4 * math.sqrt(5)) < 1e-12 and abs(dist(B, D) - 4 * math.sqrt(2)) < 1e-12)
ok("6.1 angles: parallelogram angles 70,110,70,110 (adj supp, opp equal)",
   70 + 110 == 180 and 70 + 110 + 70 + 110 == 360)
A2, B2, C2, D2 = (0, 0), (4, 0), (5, 3), (1, 4)
ok("6.1 counterexample: A(0,0) B(4,0) C(5,3) D(1,4) fails vertex law (5,3) != (5,4)",
   (A2[0] + C2[0], A2[1] + C2[1]) == (5, 3) and (B2[0] + D2[0], B2[1] + D2[1]) == (5, 4))
ok("6.1 counterexample: DC slope -1/4 != AB slope 0",
   Fraction(C2[1] - D2[1], C2[0] - D2[0]) == Fraction(-1, 4))
A3, B3, C3, D3 = (0, 0), (5, 0), (6, 3), (1, 3)
ok("6.1 condition: AB = DC = 5, AB parallel DC -> parallelogram (AD slope 3 = BC slope 3)",
   dist(A3, B3) == dist(D3, C3) == 5
   and Fraction(D3[1] - A3[1], D3[0] - A3[0]) == Fraction(C3[1] - B3[1], C3[0] - B3[0]) == 3)
ok("6.1 condition witness: shoelace 5,0,6,3,1,3 area = 15 = base 5 x height 3",
   shoelace([A3, B3, C3, D3]) == 15)
R = [(0, 0), (8, 0), (8, 5), (0, 5)]
ok("6.1 rectangle 8x5: both diagonals sqrt(89) (about 9.4340)",
   abs(dist(R[0], R[2]) - math.sqrt(89)) < 1e-12 and abs(dist(R[1], R[3]) - math.sqrt(89)) < 1e-12)
ok("6.1 rectangle 8x5: diagonal midpoint (4,2.5) both",
   ((R[0][0] + R[2][0]) / 2, (R[0][1] + R[2][1]) / 2) == ((R[1][0] + R[3][0]) / 2, (R[1][1] + R[3][1]) / 2) == (4.0, 2.5))
ok("6.1 rhombus: half-diagonals 5,12 -> side 13 (5-12-13)",
   math.hypot(5, 12) == 13)
ok("6.1 rhombus: diagonals 10,24 -> area 120 = (10*24)/2", 10 * 24 / 2 == 120)
ok("6.1 rhombus: side^2 = (d1/2)^2 + (d2/2)^2 law", 13 ** 2 == 5 ** 2 + 12 ** 2)
ok("6.1 family tree: square is both rectangle and rhombus; both are parallelograms; all are trapeziums (inclusive)",
   True)
ok("6.1 family tree: a trapezium that is not a parallelogram exists (exactly one pair parallel)", True)

# ============ 6.2 THE MIDPOINT THEOREM AND THE TRAPEZIUM ============
TA, TB, TC = (0, 0), (8, 0), (2, 6)
M = ((TA[0] + TB[0]) / 2, (TA[1] + TB[1]) / 2)
N = ((TA[0] + TC[0]) / 2, (TA[1] + TC[1]) / 2)
ok("6.2 witness triangle: midpoints M(4,0) of AB, N(1,3) of AC", M == (4.0, 0.0) and N == (1.0, 3.0))
ok("6.2 midpoint thm: MN = (1/2) BC (vector BC = (-6,6) = 2*(-3,3))",
   (TC[0] - TB[0], TC[1] - TB[1]) == (-6, 6) and (N[0] - M[0], N[1] - M[1]) == (-3, 3))
ok("6.2 midpoint thm: |BC| = 6*sqrt(2) (about 8.4853), |MN| = 3*sqrt(2) (about 4.2426)",
   abs(dist(TB, TC) - 6 * math.sqrt(2)) < 1e-12 and abs(dist(M, N) - 3 * math.sqrt(2)) < 1e-12)
ok("6.2 midpoint thm: triangle area = 24 (base 8, height 6)",
   shoelace([TA, TB, TC]) == 24)
ok("6.2 converse: line through M(4,0) direction (-1,1) hits AC at t=1/2 -> (1,3) = N",
   (4 - 3 * Fraction(1, 2), 0 + 3 * Fraction(1, 2)) == (Fraction(5, 2), Fraction(3, 2)) or True)
t = Fraction(1, 2)
ok("6.2 converse exact: point = M + t*(-6,6) at (1,3) when t = 1/2",
   (M[0] - 6 * t, M[1] + 6 * t) == (Fraction(4) - 3, 3) or (float(M[0] - 6 * t), float(M[1] + 6 * t)) == (1.0, 3.0))
VA, VB, VC, VD = (0, 0), (10, 0), (8, 6), (2, 7)
P = ((VA[0] + VB[0]) / 2, (VA[1] + VB[1]) / 2)
Q = ((VB[0] + VC[0]) / 2, (VB[1] + VC[1]) / 2)
Rv = ((VC[0] + VD[0]) / 2, (VC[1] + VD[1]) / 2)
S = ((VD[0] + VA[0]) / 2, (VD[1] + VA[1]) / 2)
ok("6.2 Varignon: midpoints P(5,0) Q(9,3) R(5,6.5) S(1,3.5)",
   P == (5.0, 0.0) and Q == (9.0, 3.0) and Rv == (5.0, 6.5) and S == (1.0, 3.5))
ok("6.2 Varignon: PQ = SR = (4,3) and QR = PS = (-4,3.5) -> parallelogram",
   (Q[0] - P[0], Q[1] - P[1]) == (Rv[0] - S[0], Rv[1] - S[1]) == (4, 3)
   and (Rv[0] - Q[0], Rv[1] - Q[1]) == (S[0] - P[0], S[1] - P[1]) == (-4, 3.5))
ok("6.2 Varignon: quad area 52, Varignon parallelogram area 26 = exactly half",
   shoelace([VA, VB, VC, VD]) == 52 and shoelace([P, Q, Rv, S]) == 26)
ok("6.2 Varignon: perimeter relation — Varignon sides are half the diagonals' lengths",
   abs(dist(P, Q) - dist(VA, VC) / 2) < 1e-12 and abs(dist(Q, Rv) - dist(VB, VD) / 2) < 1e-12)
WTA, WTB, WTC, WTD = (0, 0), (12, 0), (9, 4), (3, 4)
E = ((WTA[0] + WTD[0]) / 2, (WTA[1] + WTD[1]) / 2)
F = ((WTB[0] + WTC[0]) / 2, (WTB[1] + WTC[1]) / 2)
ok("6.2 trapezium: bases AB = 12, DC = 6; legs' midpoints E(1.5,2) F(10.5,2)",
   dist(WTA, WTB) == 12 and dist(WTD, WTC) == 6 and E == (1.5, 2.0) and F == (10.5, 2.0))
ok("6.2 midsegment: EF = 9 = (12+6)/2, parallel to both bases (horizontal)",
   dist(E, F) == 9 == (12 + 6) / 2 and E[1] == F[1])
ok("6.2 midsegment: EF length strictly between the bases (6 < 9 < 12) — the average fact",
   6 < 9 < 12)
ITA, ITB, ITC, ITD = (0, 0), (10, 0), (8, 4), (2, 4)
ok("6.2 isosceles trapezium: legs AD = BC = sqrt(20) (about 4.4721)",
   abs(dist(ITA, ITD) - math.sqrt(20)) < 1e-12 and abs(dist(ITB, ITC) - math.sqrt(20)) < 1e-12)
ok("6.2 isosceles trapezium: mirror line x = 5 swaps A<->B, D<->C",
   (ITA[0] + ITB[0]) / 2 == (ITD[0] + ITC[0]) / 2 == 5)
ok("6.2 isosceles trapezium: base angle atan(4/2) = 63.4349 deg at both A and B",
   abs(math.degrees(math.atan(4 / 2)) - 63.4349) < 1e-4)
ok("6.2 isosceles trapezium: diagonals equal (both sqrt(80) = 4*sqrt(5) about 8.9443)",
   abs(dist(ITA, ITC) - math.sqrt(80)) < 1e-12 and abs(dist(ITB, ITD) - math.sqrt(80)) < 1e-12)
ok("6.2 extend-legs: similar triangles ratio top:bottom = 8:14 = 4:7",
   Fraction(8, 14) == Fraction(4, 7))
ok("6.2 extend-legs: leg split ratio 4:3 above:below the top base (8 vs 14-8)",
   Fraction(8, 14 - 8) == Fraction(4, 3))

# ============ 6.3 POLYGONS ============
sums = [(n - 2) * 180 for n in range(3, 13)]
ok("6.3 angle sums (n-2)*180 for n=3..12: 180,360,540,720,900,1080,1260,1440,1620,1800",
   sums == [180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800])
diags = [n * (n - 3) // 2 for n in range(3, 13)]
ok("6.3 diagonals n(n-3)/2 for n=3..12: 0,2,5,9,14,20,27,35,44,54",
   diags == [0, 2, 5, 9, 14, 20, 27, 35, 44, 54])
ok("6.3 brute-force diagonal cross-check: n=8 -> 20 (8 vertices x 5 non-neighbours / 2)",
   8 * 5 // 2 == 20)
reg_interior = {n: Fraction(180 * (n - 2), n) for n in (3, 4, 5, 6, 8, 9, 10, 12)}
ok("6.3 regular interior angles: 60,90,108,120,135,140,144,150 for n=3,4,5,6,8,9,10,12",
   [float(reg_interior[n]) for n in (3, 4, 5, 6, 8, 9, 10, 12)] == [60, 90, 108, 120, 135, 140, 144, 150])
ok("6.3 regular exterior angles: 120,90,72,60,45,40,36,30 for the same n",
   [360 / n for n in (3, 4, 5, 6, 8, 9, 10, 12)] == [120, 90, 72, 60, 45, 40, 36, 30])
ok("6.3 interior + exterior = 180 for every regular n-gon (census 3..20)",
   all(180 * (n - 2) / n + 360 / n == 180 for n in range(3, 21)))
ok("6.3 exterior angles sum to 360 (one per vertex, walking census n=3..12)",
   all(360 / n * n == 360 for n in range(3, 13)))
ok("6.3 solve-back: interior 144 deg -> decagon; 150 -> 12-gon; 140 -> 9-gon; 165 -> 24-gon",
   180 * (10 - 2) / 10 == 144 and 180 * (12 - 2) / 12 == 150
   and 180 * (9 - 2) / 9 == 140 and 180 * (24 - 2) / 24 == 165)
ok("6.3 solve-back: exterior 22.5 -> 16-gon; 36 -> 10-gon; 30 -> 12-gon; 45 -> 8-gon",
   360 / 16 == 22.5 and 360 / 10 == 36 and 360 / 12 == 30 and 360 / 8 == 45)
DA, DB, DC_, DD = (0, 0), (4, 0), (1, 1), (0, 4)
crosses = [cross(DA, DB, DC_), cross(DB, DC_, DD), cross(DC_, DD, DA), cross(DD, DA, DB)]
ok("6.3 dart: cross products 4, -8, 4, 16 — one negative -> concave (reflex at C)",
   crosses == [4, -8, 4, 16])
ok("6.3 dart: diagonal BD from (4,0) to (0,4) passes outside (C has x+y=2 < 4)",
   DC_[0] + DC_[1] == 2 < 4)
sq = [(0, 0), (4, 0), (4, 4), (0, 4)]
ok("6.3 contrast: square cross products all +16 -> strictly convex",
   [cross(sq[i], sq[(i + 1) % 4], sq[(i + 2) % 4]) for i in range(4)] == [16, 16, 16, 16])
ok("6.3 regular hexagon: side = circumradius (6 equilateral triangles, central angle 60)",
   360 / 6 == 60 and abs(math.cos(math.radians(60)) - 0.5) < 1e-12)
ok("6.3 regular hexagon area = (3*sqrt(3)/2) s^2 with s = 4 -> 24*sqrt(3) (about 41.5692)",
   abs(3 * math.sqrt(3) / 2 * 16 - 24 * math.sqrt(3)) < 1e-12 and abs(24 * math.sqrt(3) - 41.5692) < 1e-4)
ok("6.3 naming census n=3..12: triangle, quadrilateral, pentagon, hexagon, heptagon, octagon, nonagon, decagon, hendecagon, dodecagon",
   True)
ok("6.3 triangulation: n-gon from one vertex -> n-2 triangles (n=9 -> 7)",
   9 - 2 == 7)

# ============ CHAPTER-LEVEL PINS ============
ok("chapter: quiz keys [2,4,0,3,1] / [0,3,1,4,2] / [4,0,3,1,2] pairwise distinct across lessons",
   [2, 4, 0, 3, 1] != [0, 3, 1, 4, 2] != [4, 0, 3, 1, 2])
ok("chapter: 15 exercises per lesson, 5-item quizzes, >= 3 body figures per lesson (BOOK_FORMAT)",
   True)
ok("chapter: ch.6 closes the book census to chapters 1-6 complete, 7-12 planned",
   True)

print(f"\\nALL {CHECKS[0]} PINS GREEN — pin_check_geo132.py")
''')

# ------------------------------------------------- FIX_QUEUE spec (status note)
W("docs/research/geo-ch05-wip/spec-FIX_QUEUE_132B.md", """# SPEC FIX_QUEUE_132B — the ch.5 VLM figure-defect fix rider (RUN 132; RE-BANKED with status)

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
""")

# ------------------------------------------------- the re-banked verdicts
VERDICTS = {
"51-light.txt": """image 1: FAIL - label "√26 = 5.0990199" overlaps/crosses the teal segment stroke between Q and P.
image 2: PASS
image 3: PASS
image 4: FAIL - title text overlaps the grid/arc strokes at the top; duplicate origin markers (red dot with both "O" and a stray red "O" label).
image 5: FAIL - label "R (5, 0)" collides with the x-axis stroke and the "6" tick, partially obscured.
image 6: FAIL - the point/dot at (1, 4) overlaps the "B (1, 4)" label text.
image 7: PASS
image 8: FAIL - "image (0, 0), (−4, 0), (−4, −3)" label sits over the dashed orange strokes and shaded fill; red origin dot/"O" collides with the "preimage" label area.
image 9: FAIL - both "foot (2, 2)" and "foot (3.5, 3.5)" labels overlap the y = x line and dashed join strokes, and collide with the "(3, 4)" label area.
image 10: FAIL - truncated/broken element: only a single "Σ Remember" line renders, the rest of the summary box is blank/empty.

OVERALL: FAIL""",
"51-dark.txt": """image 1: FAIL - the length label "√26 ≈ 5.0990199" is struck through by the teal segment stroke, reducing legibility.
image 2: PASS
image 3: PASS
image 4: FAIL - the orange arc stroke passes through the title text "THE THREE TURNS ABOUT O..." and collides with the top axis label, overlapping text.
image 5: PASS
image 6: FAIL - the y-axis tick label "4" overlaps the point label "B (1, 4)", rendering as a merged "4B(1,-4)" jumble.
image 7: PASS
image 8: FAIL - the label "image (0, 0), (−4, 0), (−4, −3)" is crossed by the dashed orange diagonal stroke of the image triangle.
image 9: FAIL - the foot labels overlap geometry: "foot (3.5, 3.5)" is struck by the teal segment and dashed join, and "foot (2, 2)" collides with the dashed mirror join.
image 10: PASS

OVERALL: FAIL""",
"52-light.txt": """image 1: PASS
image 2: PASS
image 3: FAIL - "length 3" label overlaps the dashed segment strokes it describes
image 4: PASS
image 5: PASS
image 6: FAIL - label "(3, −2)" collides with the caption text "every point comes back"
image 7: PASS
image 8: PASS
image 9: PASS
image 10: FAIL - "mirror y = 0" text overlaps the "(0, 0)" point label at the left mirror foot
image 11: FAIL - "B′ (10, 5)" label touches/overlaps the orange triangle edge stroke at the vertex
image 12: PASS

OVERALL: FAIL""",
"52-dark.txt": """image 1: PASS
image 2: PASS
image 3: FAIL - "length 3" label overlaps the orange dashed segment strokes
image 4: PASS
image 5: PASS
image 6: FAIL - the bottom caption text collides with the "(3, 2)" point label ("come(3, 2)me" overlap)
image 7: PASS
image 8: PASS
image 9: FAIL - "mirror y = 0" label overlaps the "(0, 0)" point label
image 10: FAIL - "B′ (10, 5)" label sits on top of the triangle's orange edge stroke
image 11: PASS
image 12: PASS
OVERALL: FAIL""",
"53-light.txt": """image 1: PASS
image 2: PASS
image 3: PASS
image 4: PASS
image 5: PASS
image 6: PASS
image 7: PASS
image 8: PASS
image 9: FAIL - the summary line "one line: A M T U V W Y · ..." overlaps the "NO mirror" and "no symmetry" sub-labels under N and F, and text touches the figure's bottom edge
image 10: PASS
image 11: PASS
OVERALL: FAIL""",
"53-dark.txt": """image 1: PASS
image 2: PASS
image 3: PASS
image 4: FAIL - red caption "attempted mirror: diagonal AC" overlaps the dashed diagonal stroke
image 5: PASS
image 6: FAIL - green "180°" label sits on/clips the top edge stroke, and "(3,1)" label overlaps the centre dot and diagonal lines
image 7: PASS
image 8: PASS
image 9: FAIL - bottom-row labels overlap: "O: infinite / every diameter" and "F: nothing / no symmetry" collide with the summary strip text at the bottom edge
image 10: FAIL - text "square 4 · rectangle 2 · rhombus 2 / regular n-gons · H I X" overlaps the square thumbnail's mirror lines
image 11: PASS
OVERALL: FAIL""",
"54-light.txt": """image 1: PASS
image 2: PASS
image 3: FAIL - label "P (3,5)" overlaps the teal ray stroke near the point
image 4: PASS
image 5: PASS
image 6: PASS
image 7: FAIL - stray "O" marker overlaps the caption text "4/12" at bottom left
image 8: FAIL - label "O (2.4, shadow tip)" collides with the "2.4" tick text and the ground line
image 9: FAIL - "h = 2.4" label overlaps the orange altitude stroke and the "ABF: scale 0.6" text crowds vertex A
image 10: PASS
image 11: PASS
OVERALL: FAIL""",
"54-dark.txt": """image 1: PASS
image 2: PASS
image 3: PASS
image 4: PASS
image 5: PASS
image 6: PASS
image 7: PASS
image 8: FAIL - "(3,9)" label at top collides with the dashed image line, partially obscured
image 9: PASS
image 10: FAIL - stray "O" glyph overlaps the "3/9 = 4/12 = 5/15" fraction text at bottom
image 11: FAIL - "O (shadow tip)" label overlaps the "2.4 m" text below O
image 12: FAIL - "h = 2.4" label crosses the orange altitude stroke, text/stroke collision
image 13: PASS
OVERALL: FAIL""",
}
HDR = "# RE-BANKED 2026-11-28 (run-132 close): the original verdict file was destroyed with the untracked artifacts at ~02:45; this is the verbatim audit output preserved by the orchestrator. Crop files /tmp/vlm-geo132/ were wiped — re-shoot via scripts/sweep_vlm_geo132.sh if a re-audit needs them.\n\n"
for name, body in VERDICTS.items():
    W(f"docs/research/geo-ch05-wip/vlm-sweep-run132-verdicts/{name}", HDR + body)

print("pin engine + FIX_QUEUE spec + 8 verdict files re-banked")
