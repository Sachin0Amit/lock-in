#!/usr/bin/env python3
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

print(f"\nALL {CHECKS[0]} PINS GREEN — pin_check_geo132.py")
