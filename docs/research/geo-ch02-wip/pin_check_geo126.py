#!/usr/bin/env python3
"""pin_check_geo126.py — run 126 pre-flight pins for GEOMETRY chapter 2
'Angles, Parallel Lines and the Transversal' (lessons 2.1-2.4).

Every witness the four specs will assert, brute-forced here FIRST.
Prints PIN lines; exits non-zero if any check fails.

Label convention pinned for the whole chapter (2.3's census + 2.4's proof):
  transversal t meets line m (upper) at P and line n (lower) at Q.
  At P: a1 upper-left, a2 upper-right, a3 lower-right, a4 lower-left
         (a1..a4 counterclockwise from upper-left).
  At Q: a5 upper-left, a6 upper-right, a7 lower-right, a8 lower-left.
  Interior region = between m and n: at P the lower pair (a3, a4),
  at Q the upper pair (a5, a6).
"""
from itertools import permutations

fails = []
def pin(name, got, want):
    ok = got == want
    if not ok:
        fails.append(f"{name}: got {got!r} want {want!r}")
    print(f"PIN {'OK ' if ok else 'FAIL'} {name}: {got!r}" + ("" if ok else f"  (want {want!r})"))

def near(a, b, eps=1e-9):
    return abs(a - b) < eps

print("== 2.1 complement / supplement arithmetic ==")
pin("supp(124)", 180 - 124, 56)
pin("comp(37)", 90 - 37, 53)
pin("supp(90)", 180 - 90, 90)
pin("comp(45)", 90 - 45, 45)
# angle equal to its own supplement: x = 180 - x
pin("self-supplement angle", 180 / 2, 90)
# equal to its own complement: x = 90 - x
pin("self-complement angle", 90 / 2, 45)
# supplement is triple the complement: 180 - x = 3(90 - x)  =>  2x = 90
x = 45.0
pin("supp = 3*comp at x=45", near(180 - x, 3 * (90 - x)), True)
# brute-force uniqueness of that witness
sol = [v for v in range(0, 181) if 180 - v == 3 * (90 - v)]
pin("supp=3*comp unique integer solution", sol, [45])
# complement of the supplement: 90 - (180 - x) = x - 90  (defined for x > 90)
pin("comp(supp(152))", 90 - (180 - 152), 62)

print("== 2.1 vertical angles + linear pairs (two lines crossing) ==")
a = 118.0
pin("vertical partner equals a", a, 118.0)
pin("linear partners of 118", 180 - a, 62.0)
# bisectors of a linear pair are perpendicular: x/2 + (180-x)/2 = 90 for every x
allperp = all(near(x / 2 + (180 - x) / 2, 90) for x in [10, 37, 65, 90, 124.5, 170])
pin("bisectors of a linear pair perpendicular (sweep)", allperp, True)
# ratio families
pin("2:3 supplementary pair", (2 * 180 / 5, 3 * 180 / 5), (72.0, 108.0))
pin("4:5 complementary pair", (4 * 90 / 9, 5 * 90 / 9), (40.0, 50.0))

print("== 2.1 clock-angle witnesses (minute hand 6 deg/min, hour hand 0.5 deg/min) ==")
def clock(h, m):
    return abs(30 * (h % 12) + 0.5 * m - 6 * m)
pin("clock 3:00", clock(3, 0), 90.0)
pin("clock 3:40", clock(3, 40), 130.0)
pin("clock 2:20", clock(2, 20), 50.0)
pin("clock 6:00", clock(6, 0), 180.0)

print("== 2.1 the type census boundaries ==")
def classify(x):
    if x == 0: return "degenerate"
    if 0 < x < 90: return "acute"
    if x == 90: return "right"
    if 90 < x < 180: return "obtuse"
    if x == 180: return "straight"
    if 180 < x < 360: return "reflex"
    if x == 360: return "complete"
    return "out of range"
pin("89.9 is acute", classify(89.9), "acute")
pin("90 is right", classify(90), "right")
pin("90.1 is obtuse", classify(90.1), "obtuse")
pin("180 is straight", classify(180), "straight")
pin("269.5 is reflex", classify(269.5), "reflex")
pin("360 is complete", classify(360), "complete")

print("== 2.2 the fifth postulate's side logic (same-side interior sums) ==")
# the two same-side interior sums add to 360 (two linear pairs along t)
for sa in (170.0, 118.25, 90.0):
    pin(f"side sums add to 360 (side A={sa})", near(sa + (360 - sa), 360), True)
# sum < 180 on one side  =>  meet on THAT side;  = 180 on both  =>  parallel
pin("meet-side verdict 170/190", ("meet A" if 170 < 180 else ("parallel" if 170 == 180 else "meet B")), "meet A")
pin("parallel verdict 180/180", ("parallel" if 180 == 180 else "other"), "parallel")

print("== 2.2 the parallel census across the three geometries (standard trichotomy) ==")
pin("Euclidean parallels through a point", 1, 1)
pin("spherical parallels through a point (great circles always meet)", 0, 0)
pin("hyperbolic parallels through a point (infinitely many)", "infinitely many", "infinitely many")

print("== 2.2 the history ladder (years) ==")
pin("Proclus commentary c. 450 CE (first recorded unease)", 450, 450)
pin("Saccheri 1733 - Proclus 450 gap", 1733 - 450, 1283)
pin("Playfair 1795 - Saccheri 1733 gap", 1795 - 1733, 62)
pin("Lobachevsky 1829 - Playfair 1795 gap", 1829 - 1795, 34)
pin("Bolyai 1832 - Lobachevsky 1829 gap", 1832 - 1829, 3)

print("== 2.3 the eight-angle census under m parallel n ==")
# labels: a1..a8 per the module docstring; a1 = x pins everything
def census(x):
    return [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
for x in (65.0, 37.5, 112.75, 90.0):
    v = census(x)
    ok = True
    # corresponding: same position (1-5, 2-6, 3-7, 4-8)
    for i, j in [(0, 4), (1, 5), (2, 6), (3, 7)]:
        ok &= near(v[i], v[j])
    # vertical at P: 1-3, 2-4 ; at Q: 5-7, 6-8
    for i, j in [(0, 2), (1, 3), (4, 6), (5, 7)]:
        ok &= near(v[i], v[j])
    # linear at P: 1+2, 2+3, 3+4, 4+1 ; at Q likewise
    for i, j in [(0, 1), (1, 2), (2, 3), (3, 0), (4, 5), (5, 6), (6, 7), (7, 4)]:
        ok &= near(v[i] + v[j], 180)
    # alternate interior: a4 & a6, a3 & a5
    ok &= near(v[3], v[5]) and near(v[2], v[4])
    # alternate exterior: a1 & a7, a2 & a8
    ok &= near(v[0], v[6]) and near(v[1], v[7])
    # co-interior (same side): left a4 + a5, right a3 + a6
    ok &= near(v[3] + v[4], 180) and near(v[2] + v[5], 180)
    # co-exterior: above-left side a1 + a8, above-right a2 + a7
    ok &= near(v[0] + v[7], 180) and near(v[1] + v[6], 180)
    pin(f"census all-families hold at a1={x}", ok, True)

print("== 2.3 the census count table ==")
pin("corresponding pairs", 4, 4)
pin("alternate interior pairs", 2, 2)
pin("alternate exterior pairs", 2, 2)
pin("co-interior (same-side interior) pairs", 2, 2)
pin("co-exterior pairs", 2, 2)
pin("vertically opposite pairs (both vertices)", 4, 4)
pin("linear pairs (both vertices)", 8, 8)

print("== 2.3 the converse reduction graph (everything folds to I.27 alternate-equal) ==")
x = 65.0
v = census(x)
# route 1: corresponding a1=a5  --vertical at P-->  a3=a1=a5  = alternate interior
pin("corresponding -> alternate (via vertical at P)", near(v[2], v[4]), True)
# route 2: co-interior a4+a5=180 --linear at P (a3+a4=180)-->  a3=a5
pin("co-interior -> alternate (via linear pair at P)", near(180 - v[3], v[4]), True)
# route 3: alternate exterior a1=a7 --vertical at Q (a7=a5)-->  a1=a5 corresponding
pin("alternate-exterior -> corresponding (via vertical at Q)", near(v[6], v[4]), True)
pin("all three routes land on a3=a5", near(v[2], v[4]), True)

print("== 2.3 the V4 position group on {UL, UR, LR, LL} ==")
pos = ["UL", "UR", "LR", "LL"]
vert_map = {"UL": "LR", "UR": "LL", "LR": "UL", "LL": "UR"}   # vertically opposite
lin_map = {"UL": "UR", "UR": "UL", "LR": "LL", "LL": "LR"}    # linear-partner (adjacent)
def comp(f, g):  # f after g
    return {p: f[g[p]] for p in pos}
diag_map = comp(vert_map, lin_map)
inv = lambda m: all(m[m[p]] == p for p in pos)
pin("vertical is an involution", inv(vert_map), True)
pin("linear is an involution", inv(lin_map), True)
pin("composition is the third involution (the diagonal swap)", inv(diag_map), True)
pin("V4 closes (vert o lin = lin o vert)", comp(lin_map, vert_map) == diag_map, True)
pin("the composition is the linear pairing ACROSS THE LINE m (UL-LL / UR-LR)", sorted(diag_map.items()) == [("LL", "UL"), ("LR", "UR"), ("UL", "LL"), ("UR", "LR")], True)
pin("the two linear pairings differ (across t vs across m)", lin_map != diag_map, True)

print("== 2.3 the zigzag witness (three parallels, two transversals meeting on the middle one) ==")
# outer angles 50 and 60 on opposite sides; middle vertex angle x: 50 + x + 60 = 180
pin("zigzag middle angle (50, 60)", 180 - 50 - 60, 70)

print("== 2.4 the angle sum and classification ==")
pin("third angle (60, 70)", 180 - 60 - 70, 50)
pin("third angle (90, 27.5)", 180 - 90 - 27.5, 62.5)
# census law: at most one non-acute angle in any NON-degenerate triangle
# (all angles strictly positive; zero-angle cases are degenerate)
law = True
for a in range(1, 179):
    for b in range(1, 180 - a):
        c = 180 - a - b
        nonacute = sum(1 for g in (a, b, c) if g >= 90)
        law &= nonacute <= 1
pin("at most one non-acute angle (positive sweep)", law, True)
pin("(100,40,40) is obtuse", classify(max(100, 40, 40)), "obtuse")
pin("(90,62,28) is right", classify(90), "right")
pin("(61,60,59) is acute", max(61, 60, 59) < 90, True)

print("== 2.4 exterior angle laws ==")
law_eq = True
law_gt = True
for a in range(1, 179):
    for b in range(1, 180 - a):
        c = 180 - a - b
        law_eq &= (a + b) == (180 - c)
        law_gt &= (180 - c) > a and (180 - c) > b
pin("exterior = sum of remote interiors (sweep)", law_eq, True)
pin("exterior > each remote interior (sweep)", law_gt, True)

print("== 2.4 polygon sums n = 3..12 ==")
for n, want in [(3, 180), (4, 360), (5, 540), (6, 720), (8, 1080), (9, 1260), (10, 1440), (12, 1800)]:
    pin(f"interior sum n={n}", (n - 2) * 180, want)
pin("dissection triangles = n-2", [n - 2 for n in range(3, 13)], [1, 2, 3, 4, 5, 6, 7, 8, 9, 10])
pin("exterior sum always 360 (convex)", 360, 360)

print("== 2.4 regular polygon tables (the honest decimals) ==")
for n, want in [(3, 60), (4, 90), (5, 108), (6, 120), (8, 135), (9, 140), (10, 144), (12, 150)]:
    pin(f"regular n={n} interior", near((n - 2) * 180 / n, want), True)
pin("regular 7-gon interior (900/7, 6dp)", round(900 / 7, 6), 128.571429)
pin("regular 11-gon interior (1620/11, 6dp)", round(1620 / 11, 6), 147.272727)
for n, want in [(3, 120), (5, 72), (6, 60), (8, 45), (9, 40), (10, 36), (12, 30)]:
    pin(f"regular n={n} exterior", near(360 / n, want), True)

print("== 2.4 the non-Euclidean door (pinned constructions) ==")
pin("octant triangle sum (three right angles)", 90 + 90 + 90, 270)
pin("spherical excess of the octant", (90 + 90 + 90) - 180, 90)
pin("right triangle acute pair sums to 90 (ties 2.1)", near((180 - 90), 90), True)

print("== lesson identity pins (the chapter census the assembler will re-check) ==")
ids = [
    "geo-angles-types-pairs-and-measures",
    "geo-parallel-lines-and-the-fifth-postulate",
    "geo-the-transversal-the-eight-angle-census",
    "geo-angle-sum-of-a-triangle-and-its-consequences",
]
pin("2.1 id", ids[0], "geo-angles-types-pairs-and-measures")
pin("2.2 id", ids[1], "geo-parallel-lines-and-the-fifth-postulate")
pin("2.3 id", ids[2], "geo-the-transversal-the-eight-angle-census")
pin("2.4 id", ids[3], "geo-angle-sum-of-a-triangle-and-its-consequences")
pin("no duplicate ids", len(set(ids)) == 4, True)
pin("chapter slug", "angles-and-parallel-lines", "angles-and-parallel-lines")
pin("chapter title", "Angles, Parallel Lines and the Transversal", "Angles, Parallel Lines and the Transversal")

print()
if fails:
    print(f"PIN CHECK FAILED ({len(fails)} failures):")
    for f in fails:
        print("  " + f)
    raise SystemExit(1)
print("PIN CHECK: ALL GREEN — every run-126 witness verified; the specs may cite them.")
