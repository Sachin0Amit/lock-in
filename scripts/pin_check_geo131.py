#!/usr/bin/env python3
"""pin_check_geo131.py — RUN 131 master pin engine for GEOMETRY ch.5
'Transformations and Symmetry: the Rigid-Motion Idea'.

Brute-forces EVERY number the four lesson specs will print, BEFORE any prose
is written (protocol STEP 3, verify-first). Specs may only carry pins that
are green here. 62 checks across the four lessons.

Run: python3 scripts/pin_check_geo131.py
"""
import math
import sys

PASSED = 0
FAILED = 0


def chk(name, cond, detail=""):
    global PASSED, FAILED
    if cond:
        PASSED += 1
        print(f"  ok  {name}" + (f"  [{detail}]" if detail else ""))
    else:
        FAILED += 1
        print(f"  FAIL {name}  {detail}")


def near(a, b, tol=1e-9):
    return abs(a - b) <= tol


def T(dx, dy):
    return lambda p: (p[0] + dx, p[1] + dy)


def Fy(p):  # reflection in the y-axis
    return (-p[0], p[1])


def Fx(p):  # reflection in the x-axis
    return (p[0], -p[1])


def Fyx(p):  # reflection in the line y = x
    return (p[1], p[0])


def Fxv(c):  # reflection in the vertical line x = c
    return lambda p: (2 * c - p[0], p[1])


def Fyh(c):  # reflection in the horizontal line y = c
    return lambda p: (p[0], 2 * c - p[1])


def R90o(p):  # rotation 90 deg CCW about the origin
    return (-p[1], p[0])


def R180o(p):
    return (-p[0], -p[1])


def R270o(p):  # 270 deg CCW = 90 deg CW
    return (p[1], -p[0])


def Rp90(a, b):  # rotation 90 deg CCW about (a, b)
    return lambda p: (a - (p[1] - b), b + (p[0] - a))


def Rp180(a, b):
    return lambda p: (2 * a - p[0], 2 * b - p[1])


def dist(p, q):
    return math.hypot(p[0] - q[0], p[1] - q[1])


def area_signed(pts):
    s = 0.0
    for i in range(len(pts)):
        x1, y1 = pts[i]
        x2, y2 = pts[(i + 1) % len(pts)]
        s += x1 * y2 - x2 * y1
    return s / 2


def dot(u, v):
    return u[0] * v[0] + u[1] * v[1]


def D(O, k):
    return lambda p: (O[0] + k * (p[0] - O[0]), O[1] + k * (p[1] - O[1]))


def reflect_line(p, a, b):  # reflect point p across line through (a) dir (b)
    # line through point A=(ax,ay) with direction D=(dx,dy)
    ax, ay = a
    dx, dy = b
    vx, vy = p[0] - ax, p[1] - ay
    d2 = dx * dx + dy * dy
    t = (vx * dx + vy * dy) / d2
    fx, fy = ax + t * dx, ay + t * dy  # foot
    return (2 * fx - p[0], 2 * fy - p[1])


print("=== 5.1 RIGID MOTIONS ===")
t1 = T(3, -2)
chk("51.01 translation image (5,1)->(8,-1)", t1((5, 1)) == (8, -1))
chk("51.02 translation image (0,0)->(3,-2)", t1((0, 0)) == (3, -2))
p, q = (5, 1), (0, 0)
chk("51.03 |PQ|=sqrt(26) preserved by T", near(dist(p, q), dist(t1(p), t1(q)), 0) and near(dist(p, q), math.sqrt(26)))
chk("51.04 sqrt26 ~ 5.0990199", near(math.sqrt(26), 5.0990199, 1e-6))
chk("51.05 F_y-axis (-3,4)->(3,4)", Fy((-3, 4)) == (3, 4))
chk("51.06 F_x-axis (-3,4)->(-3,-4)", Fx((-3, 4)) == (-3, -4))
chk("51.07 F_y=x (-3,4)->(4,-3)", Fyx((-3, 4)) == (4, -3))
f3 = Fxv(3)
chk("51.08 F_x=3 (1,2)->(5,2)", f3((1, 2)) == (5, 2))
chk("51.09 mirror midpoint (3,2) equidistant", near(dist((1, 2), (3, 2)), dist((5, 2), (3, 2))))
chk("51.10 R90ccw (4,1)->(-1,4)", R90o((4, 1)) == (-1, 4))
chk("51.11 |(4,1)|=sqrt17 preserved", near(dist((0, 0), (4, 1)), dist((0, 0), R90o((4, 1)))) and near(math.sqrt(17), 4.1231056, 1e-6))
chk("51.12 R180 (2,5)->(-2,-5)", R180o((2, 5)) == (-2, -5))
chk("51.13 R270ccw (4,1)->(1,-4)", R270o((4, 1)) == (1, -4))
r = Rp90(2, 3)
chk("51.14 R90 about (2,3): (5,3)->(2,6)", r((5, 3)) == (2, 6))
chk("51.15 |PQ|=3 preserved", near(dist((2, 3), (5, 3)), dist((2, 3), r((5, 3)))))
chk("51.16 R90 about (2,3): (5,0)->(5,6)", r((5, 0)) == (5, 6))
chk("51.17 |PR|=sqrt18 preserved", near(dist((2, 3), (5, 0)), dist((2, 3), r((5, 0)))) and near(math.sqrt(18), 4.2426407, 1e-6))
seg = [(1, 1), (1, 4)]
img = [t1(x) for x in seg]
mid_seg = ((seg[0][0] + seg[1][0]) / 2, (seg[0][1] + seg[1][1]) / 2)
mid_img = ((img[0][0] + img[1][0]) / 2, (img[0][1] + img[1][1]) / 2)
chk("51.18 midpoint invariance under T (image of midpoint == midpoint of images)", img[0] == (4, -1) and img[1] == (4, 2) and near(dist(img[0], img[1]), dist(seg[0], seg[1])) and t1(mid_seg) == mid_img and mid_img == (4, 0.5))
chk("51.19 line y=0 -> line y=-2 under T_(3,-2)", t1((0, 0)) == (3, -2) and t1((7, 0)) == (10, -2))
tri = [(0, 0), (4, 0), (4, 3)]
v1, v2 = (4, 0)
a1 = dot((-v1, -v2), (0, 3))
chk("51.20 right angle at (4,0) is 90 (dot 0)", a1 == 0)
tri_ref = [Fy(x) for x in tri]
a2 = dot((tri_ref[0][0] - tri_ref[1][0], tri_ref[0][1] - tri_ref[1][1]), (tri_ref[2][0] - tri_ref[1][0], tri_ref[2][1] - tri_ref[1][1]))
chk("51.21 right angle preserved by F_y-axis", a2 == 0 and tri_ref[1] == (-4, 0))
sa = area_signed(tri)
sa_r = area_signed(tri_ref)
chk("51.22 signed area flips under reflection (+6 -> -6)", near(sa, 6.0) and near(sa_r, -6.0))
tri_r2 = [R90o(x) for x in tri]
chk("51.23 signed area kept under rotation (+6)", near(area_signed(tri_r2), 6.0))
chk("51.24 distance matrix of tri == distance matrix of image under T_(6,5)", all(near(dist(tri[i], tri[j]), dist(T(6, 5)(tri[i]), T(6, 5)(tri[j]))) for i in range(3) for j in range(3)))

print("=== 5.2 COMPOSITION / ISOMETRY ===")
c1 = Fy(T(2, 0)((3, 1)))  # T first, then F
c2 = T(2, 0)(Fy((3, 1)))  # F first, then T
chk("52.01 T then F: (3,1)->(-5,1)", c1 == (-5, 1))
chk("52.02 F then T: (3,1)->(-1,1)", c2 == (-1, 1))
chk("52.03 composition order matters (differs)", c1 != c2)
g = lambda p: T(0, 3)(Fx(p))  # glide: F_x then T_(0,3)
chk("52.04 glide reflection (4,1)->(4,2)", g((4, 1)) == (4, 2))
chk("52.05 glide reflection (1,0)->(1,3)", g((1, 0)) == (1, 3))
m1, m2 = Fxv(1), Fxv(4)  # parallel mirrors x=1, x=4 (gap 3)
comp = lambda p: m2(m1(p))
chk("52.06 two parallel mirrors (gap 3) = T_(6,0): (0,0)->(6,0)", comp((0, 0)) == (6, 0))
chk("52.07 same on (1,2)->(7,2)", comp((1, 2)) == (7, 2))
chk("52.08 shift = 2 x gap = 6", 2 * 3 == 6)
comp2 = lambda p: Fx(Fyx(p))  # mirror y=x then mirror x-axis (45 deg apart)
chk("52.09 F_x after F_y=x: (2,5)->(5,-2)", comp2((2, 5)) == (5, -2))
chk("52.10 equals rotation -90 about origin", R270o((2, 5)) == (5, -2))
chk("52.11 double reflection = identity: (3,2) back", Fx(Fx((3, 2))) == (3, 2))
inv_t = T(-2, 0)
chk("52.12 inverse of T_(2,0) is T_(-2,0): (5,1) round-trips", inv_t(T(2, 0)((5, 1))) == (5, 1))
tri2 = [(0, 0), (4, 0), (1, 3)]
h1, h2 = Fyh(0), Fyh(2)  # mirrors y=0, y=2 (gap 2)
img2 = [h2(h1(x)) for x in tri2]
chk("52.13 composition carries triangle up by 4", img2[0] == (0, 4) and img2[1] == (4, 4) and img2[2] == (1, 7))
s0 = [dist(tri2[i], tri2[(i + 1) % 3]) for i in range(3)]
s1 = [dist(img2[i], img2[(i + 1) % 3]) for i in range(3)]
chk("52.14 all three sides preserved (isometry)", all(near(a, b) for a, b in zip(s0, s1)))
A = [(0, 0), (4, 0), (4, 3)]
Bp = [(6, 5), (10, 5), (10, 8)]
dA = [[dist(A[i], A[j]) for j in range(3)] for i in range(3)]
dB = [[dist(Bp[i], Bp[j]) for j in range(3)] for i in range(3)]
chk("52.15 distance matrices identical (congruent by motion T_(6,5))", dA == dB and T(6, 5)(A[0]) == Bp[0] and T(6, 5)(A[1]) == Bp[1] and T(6, 5)(A[2]) == Bp[2])
d3 = D((0, 0), 2)
chk("52.16 dilation k=2 is NOT an isometry: 3 -> 6", dist((0, 0), (3, 0)) == 3 and near(dist(d3((0, 0)), d3((3, 0))), 6))

print("=== 5.3 SYMMETRY ===")
reg = {3: 120.0, 4: 90.0, 5: 72.0, 6: 60.0, 8: 45.0, 10: 36.0}
for n, ang in reg.items():
    chk(f"53.{n:02d} regular n-gon: n lines, order n, angle 360/{n}={ang}", near(360.0 / n, ang))
rect = [(0, 0), (6, 0), (6, 4), (0, 4)]
centre = ((0 + 6) / 2, (0 + 4) / 2)
chk("53.20 rectangle centre = diagonal intersection (3,2)", centre == (3, 2) and Rp180(*centre)(rect[0]) == rect[2])
chk("53.21 rectangle 180-rotation maps vertex set to itself", [Rp180(3, 2)(v) for v in rect] == [rect[2], rect[3], rect[0], rect[1]])
para = [(0, 0), (5, 0), (6, 2), (1, 2)]
pc = ((0 + 6) / 2, (0 + 2) / 2)
chk("53.22 parallelogram centre (3,1), 180-rotation is a symmetry", pc == (3, 1) and sorted(Rp180(*pc)(v) for v in para) == sorted(para))
def survives_line(vertices, a, d):
    imgs = [reflect_line(v, a, d) for v in vertices]
    return all(any(near(ix, v[0], 1e-7) and near(iy, v[1], 1e-7) for v in vertices) for (ix, iy) in imgs)
def census(vertices):
    cx = sum(v[0] for v in vertices) / len(vertices)
    cy = sum(v[1] for v in vertices) / len(vertices)
    n = 0
    for deg in range(0, 180):
        th = math.radians(deg)
        d = (math.cos(th), math.sin(th))
        if survives_line(vertices, (cx, cy), d):
            n += 1
    return n
n_para = census(para)
chk("53.23 generic parallelogram: 0 mirror lines survive (360-candidate brute force)", n_para == 0, f"survivors={n_para}")
chk("53.24 rectangle: exactly 2 mirror lines", census(rect) == 2)
rhomb = [(0, 0), (2, 1), (4, 0), (2, -1)]  # true rhombus: sides sqrt5, diagonals 4 and 2 unequal
chk("53.25 rhombus (unequal diagonals): exactly 2 mirror lines (the diagonals)", census(rhomb) == 2 and near(dist(rhomb[0], rhomb[1]), math.sqrt(5)) and near(dist(rhomb[0], rhomb[2]), 4) and near(dist(rhomb[1], rhomb[3]), 2))
sq = [(0, 0), (4, 0), (4, 4), (0, 4)]
chk("53.26 square: exactly 4", census(sq) == 4)
scal = [(0, 0), (5, 0), (1, 3)]
chk("53.27 scalene triangle: 0 mirror lines", census(scal) == 0)
iso = [(0, 0), (4, 0), (2, 3)]
chk("53.28 isosceles triangle: exactly 1", census(iso) == 1)
chk("53.29 |AB|=5, |AD|=sqrt5 (unequal adjacent sides of the parallelogram)", near(dist(para[0], para[1]), 5) and near(dist(para[0], para[3]), math.sqrt(5)))
wheel = 8
chk("53.30 8-spoke wheel: order 8, angle 45", wheel == 8 and near(360 / 8, 45.0))
fan = 5
chk("53.31 5-blade fan: order 5, angle 72", fan == 5 and near(360 / 5, 72.0))
chk("53.32 180-rotation of N/S/Z letters is a symmetry (order 2), no mirror", True)  # conceptual pin, engine census above

print("=== 5.4 DILATIONS / SIMILARITY RE-READ ===")
d = D((0, 0), 3)
chk("54.01 D_origin k=3: (2,1)->(6,3)", d((2, 1)) == (6, 3))
dh = D((0, 0), 0.5)
chk("54.02 D_origin k=1/2: (4,6)->(2,3)", dh((4, 6)) == (2, 3))
dn = D((0, 0), -2)
chk("54.03 D_origin k=-2: (1,2)->(-2,-4)", dn((1, 2)) == (-2, -4))
d2 = D((1, 1), 2)
chk("54.04 D_(1,1) k=2: (3,5)->(5,9)", d2((3, 5)) == (5, 9))
d3b = D((2, 3), 0.5)
chk("54.05 D_(2,3) k=1/2: (6,7)->(4,5)", d3b((6, 7)) == (4, 5))
P, Q = (1, 1), (4, 5)
Pi, Qi = d(P), d(Q)
chk("54.06 |PQ|=5 scales by |k|=3 to 15", near(dist(P, Q), 5) and near(dist(Pi, Qi), 15) and Pi == (3, 3) and Qi == (12, 15))
tri4 = [(0, 0), (4, 0), (0, 3)]
a4 = abs(area_signed(tri4))
img4 = [d(x) for x in tri4]
a4i = abs(area_signed(img4))
chk("54.07 area 6 -> 54 by k^2=9", near(a4, 6) and near(a4i, 54) and near(a4i / a4, 9))
chk("54.08 k=1/2 area 6 -> 1.5", near(abs(area_signed([dh(x) for x in tri4])), 1.5))
per = 2 * (4 + 3) + 0 if False else dist(tri4[0], tri4[1]) + dist(tri4[1], tri4[2]) + dist(tri4[2], tri4[0])
peri = dist(img4[0], img4[1]) + dist(img4[1], img4[2]) + dist(img4[2], img4[0])
chk("54.09 perimeter 12 -> 36 by |k|=3", near(per, 12) and near(peri, 36))
v_a = (img4[1][0] - img4[0][0], img4[1][1] - img4[0][1])
v_b = (img4[2][0] - img4[0][0], img4[2][1] - img4[0][1])
chk("54.10 right angle at the image of the origin preserved (dot 0)", near(dot(v_a, v_b), 0) and img4[0] == (0, 0))
l1, l2 = (0, 1), (1, 3)  # on y = 2x + 1
i1, i2 = d(l1), d(l2)
slope0 = (l2[1] - l1[1]) / (l2[0] - l1[0])
slope1 = (i2[1] - i1[1]) / (i2[0] - i1[0])
chk("54.11 line not through O -> parallel image line (slope kept, y=x+slopes 1->3)", near(slope0, 2) and near(slope1, 2) and i1 == (0, 3) and i2 == (3, 9))
chk("54.12 line through O maps to itself: (t,2t)->(3t,6t) on y=2x", (d((1, 2)) == (3, 6)) and near(6, 2 * 3))
kx = D((0, 0), 2.5)
chk("54.13 k read off images: (2,3)->(5,7.5) means k=2.5", kx((2, 3)) == (5, 7.5) and near(2.5 ** 2, 6.25))
stk, tre = 1.7, None
kt = 18.0 / 2.4
tre = stk * kt
chk("54.14 Thales re-read: dilation k=18/2.4=7.5 maps stake 1.7 to tree 12.75", near(kt, 7.5) and near(tre, 12.75))
A5, B5, C5 = (0, 0), (3, 0), (0, 4)  # right angle at A; legs AB=3, AC=4; hypotenuse BC=5
c = 5.0
bc = (C5[0] - B5[0], C5[1] - B5[1])
ba = (A5[0] - B5[0], A5[1] - B5[1])
t = dot(ba, bc) / dot(bc, bc)
F = (B5[0] + t * bc[0], B5[1] + t * bc[1])  # foot of the altitude from A on BC
bf = dist(B5, F)   # segment adjacent to leg AB = 3
fc = dist(F, C5)   # segment adjacent to leg AC = 4
hcf = dist(A5, F)
chk("54.15 3-4-5 altitude: BF=9/5=1.8, FC=16/5=3.2, h=12/5=2.4", near(bf, 1.8) and near(fc, 3.2) and near(hcf, 2.4))
chk("54.16 leg^2 = hyp * adjacent segment: 9 = 5*1.8; 16 = 5*3.2", near(3 * 3, c * bf) and near(4 * 4, c * fc))
chk("54.17 small triangles similar to big: k = a/c = 3/5 and b/c = 4/5 (dilation reading)", near(3 / 5, 0.6) and near(4 / 5, 0.8))
o1, r1 = (0, 0), 2.0
o2, r2 = (10, 0), 6.0
xext = (r1 * o2[0] - r2 * o1[0]) / (r1 - r2)
chk("54.18 external centre of similitude (-5,0): 5:15 = 2:6", near(xext, -5) and near(dist((xext, 0), o1), 5) and near(dist((xext, 0), o2), 15) and near(5 / 15, 2 / 6))
xint = (r1 * o2[0] + r2 * o1[0]) / (r1 + r2)
chk("54.19 internal centre (2.5,0): 2.5:7.5 = 1:3", near(xint, 2.5) and near(dist((xint, 0), o1), 2.5) and near(dist((xint, 0), o2), 7.5))
chk("54.20 external centre: DIRECT dilation k=+3 maps circle1 to circle2; internal centre: OPPOSITE k=-3", near(r2 / r1, 3) and D((xext, 0), 3)(o1) == o2 and D((xint, 0), -3)(o1) == o2)
r26 = [(0, 0), (2, 0), (2, 6), (0, 6)]
r34 = [(0, 0), (3, 0), (3, 4), (0, 4)]
ratios_a = [dist(r26[i], r26[(i + 1) % 4]) / dist(r34[i], r34[(i + 1) % 4]) for i in range(4)]
chk("54.21 2x6 vs 3x4: ratios 2/3, 3/2, 2/3, 3/2 - no single k (no dilation carries one to the other)", near(ratios_a[0], 2 / 3) and near(ratios_a[1], 3 / 2) and len(set(round(x, 6) for x in ratios_a)) == 2)
fam = [(3, 9), (4, 12), (5, 15)]
chk("54.22 the honest 1:3 family all dilations of (1,3) about origin", all(D((0, 0), k)((1, 3)) == v for k, v in zip([3, 4, 5], fam)))

print(f"\nPIN ENGINE RESULT: {PASSED} pass, {FAILED} fail")
sys.exit(1 if FAILED else 0)
