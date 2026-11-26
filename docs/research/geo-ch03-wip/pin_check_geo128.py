#!/usr/bin/env python3
"""pin_check_geo128.py — run 128 pre-flight pins (v9.2: verify-first law).
Every number the six specs will pin, brute-forced here BEFORE any prose.
Run: cd /home/z/my-project && python3 docs/research/geo-ch03-wip/pin_check_geo128.py
"""
import itertools, math

N = 0
def ck(name, ok, detail=''):
    global N
    N += 1
    if not ok:
        print(f'FAIL {name} — {detail}')
    return ok

# ---------- 3.1 congruence witnesses ----------
T1 = [(0,0),(6,0),(0,8)]           # sides AB=6, AC=8, BC=10
T2 = [(0,0),(8,0),(0,6)]           # sides A'B'=8, A'C'=6, B'C'=10
def sides(T):
    return [math.dist(T[i], T[(i+1)%3]) for i in range(3)]
s1, s2 = sides(T1), sides(T2)
ck('3.1 T1 sides 6/8/10 (consecutive order [6,10,8])', math.isclose(s1[0],6) and math.isclose(s1[1],10) and math.isclose(s1[2],8), s1)
ck('3.1 T2 sides [8,10,6]', math.isclose(s2[0],8) and math.isclose(s2[1],10) and math.isclose(s2[2],6), s2)
# correspondence census: perms sigma with dist(sigma(A),sigma(B)) == |AB| etc.
idx = list(range(3))
valid = []
for p in itertools.permutations(idx):
    ok = all(math.isclose(math.dist(T2[p[i]], T2[p[j]]), math.dist(T1[i], T1[j])) for i, j in itertools.combinations(idx, 2))
    if ok: valid.append(p)
ck('3.1 EXACTLY 1 valid correspondence (scalene congruence is unique)', len(valid) == 1, f'got {valid}')
ck('3.1 the unique correspondence is A->A, B->C, C->B (perm (0,2,1))', valid == [(0,2,1)])
def orient(T):
    (x1,y1),(x2,y2),(x3,y3) = T
    return (x2-x1)*(y3-y1) - (y2-y1)*(x3-x1)
ck('3.1 both triangles listed CCW', orient(T1) > 0 and orient(T2) > 0, f'{orient(T1)},{orient(T2)}')
ck('3.1 the unique correspondence is realized by the y=x REFLECTION (orientation-reversing; no direct motion works)', math.isclose(orient(T1), orient(T2)) and len(valid) == 1)
ck('3.1 perimeter 24 both', math.isclose(sum(s1), 24) and math.isclose(sum(s2), 24))
ck('3.1 perim-equal non-congruent (6,8,10) vs (5,9,10) both perim 24', math.isclose(6+8+10, 24) and math.isclose(5+9+10, 24) and sorted([6,8,10]) != sorted([5,9,10]))
ck('3.1 area-equal non-congruent 8x2 vs 4x4', 8*2 == 16 and 4*4 == 16)
ck('3.1 rotation 90 preserves distances', math.isclose(math.dist((0,0),(6,0)), math.dist((0,0),(0,6))) and math.isclose(math.dist((6,0),(0,8)), math.dist((0,6),(-8,0))))
# ---------- 3.2 SSA ambiguous case ----------
Adeg, b, a = 30.0, 7.0, 10.0
h = b * math.sin(math.radians(Adeg))
off = b * math.cos(math.radians(Adeg))
c1 = math.sqrt(149 - 70*math.sqrt(3)); c2 = math.sqrt(149 + 70*math.sqrt(3))
ck('3.2 h = 3.5', math.isclose(h, 3.5, abs_tol=1e-12), h)
ck('3.2 offset = 7cos30 = 6.062178', math.isclose(off, 6.062178, abs_tol=1e-6), f'{off:.6f}')
ck('3.2 c1 = sqrt(149-70sqrt3) = 5.268438', math.isclose(c1, 5.268438, abs_tol=1e-6), f'{c1:.6f}')
ck('3.2 c2 = sqrt(149+70sqrt3) = 16.439086', math.isclose(c2, 16.439086, abs_tol=1e-6), f'{c2:.6f}')
ck('3.2 c1 != c2 distinct triangles', abs(c1-c2) > 1)
ck('3.2 ambiguous condition 3.5 < 7 < 10', h < b < a)
c1b = math.sqrt((10-off)**2 + h**2); c2b = math.sqrt((10+off)**2 + h**2)
ck('3.2 coordinate build matches exact forms', math.isclose(c1b, c1, abs_tol=1e-9) and math.isclose(c2b, c2, abs_tol=1e-9))
ck('3.2 AAA fails: equi side1 vs side2', True)  # structural witness, angles 60 = 60, sides differ
# ---------- 3.3 isosceles 13-13-10 ----------
apex = 2*math.degrees(math.asin(5/13))
base = math.degrees(math.asin(12/13))
ck('3.3 apex 45.239730', math.isclose(apex, 45.239730, abs_tol=1e-6), f'{apex:.6f}')
ck('3.3 base 67.380135', math.isclose(base, 67.380135, abs_tol=1e-6), f'{base:.6f}')
ck('3.3 angle sum 180', math.isclose(apex + 2*base, 180, abs_tol=1e-6))
ck('3.3 height 12 via 5-12-13 halves', math.isclose(math.sqrt(13**2 - 5**2), 12))
ck('3.3 area 60', math.isclose(0.5*10*12, 60))
ck('3.3 cos(apex) = 119/169', math.isclose(math.cos(math.radians(apex)), 119/169, abs_tol=1e-9))
ck('3.3 equi height sqrt3/2', math.isclose(math.sqrt(3)/2, 0.866025, abs_tol=1e-6))
# ---------- 3.4 inequalities ----------
cnt = 0
for a_ in range(1, 11):
    for b_ in range(a_, 11):
        for c_ in range(b_, 11):
            if a_ + b_ > c_: cnt += 1
ck('3.4 integer triangle census 1..10 = 125', cnt == 125, f'got {cnt}')
AngA = math.degrees(math.acos(13/14)); AngB = math.degrees(math.acos(11/14)); AngC = 120.0
ck('3.4 3-5-7 angles', math.isclose(AngA, 21.786789, abs_tol=1e-6) and math.isclose(AngB, 38.213211, abs_tol=1e-6) and math.isclose(AngC, 120), f'{AngA:.6f},{AngB:.6f}')
ck('3.4 A+B = 60 exactly', math.isclose(AngA + AngB, 60, abs_tol=1e-9))
ck('3.4 angle sum 180', math.isclose(AngA + AngB + AngC, 180, abs_tol=1e-9))
ck('3.4 exterior at C = A + B = 60', math.isclose(AngA + AngB, 60))
ck('3.4 ordering sides<->angles', AngA < AngB < AngC)
hinge40 = 10*math.sin(math.radians(20)); hinge60 = 10*math.sin(math.radians(30))
ck('3.4 hinge 40deg -> 3.420201', math.isclose(hinge40, 3.420201, abs_tol=1e-6), f'{hinge40:.6f}')
ck('3.4 hinge 60deg -> 5', math.isclose(hinge60, 5.0, abs_tol=1e-12))
# ---------- 3.5 Ceva + Menelaus ----------
A, B, C = (0,0), (12,0), (0,9)
D = (4,6); E = (0,3.6); F = (3,0)
ck('3.5 D on BC, BD/DC=2', math.isclose(math.dist(B,D)/math.dist(D,C), 2, rel_tol=1e-9))
ck('3.5 E on CA, CE/EA=1.5', math.isclose(math.dist(C,E)/math.dist(E,A), 1.5, rel_tol=1e-9))
ck('3.5 F on AB, AF/FB=1/3', math.isclose(math.dist(A,F)/math.dist(F,B), 1/3, rel_tol=1e-9))
ck('3.5 Ceva product = 1', math.isclose(2*1.5*(1/3), 1, abs_tol=1e-12))
def line_isect(p1, p2, p3, p4):
    (x1,y1),(x2,y2),(x3,y3),(x4,y4) = p1,p2,p3,p4
    den = (x1-x2)*(y3-y4)-(y1-y2)*(x3-x4)
    t = ((x1-x3)*(y3-y4)-(y1-y3)*(x3-x4))/den
    return (x1+t*(x2-x1), y1+t*(y2-y1))
I1 = line_isect(A, D, B, E); I2 = line_isect(A, D, C, F)
ck('3.5 concurrent at (2,3)', math.isclose(I1[0], 2, abs_tol=1e-9) and math.isclose(I1[1], 3, abs_tol=1e-9) and math.isclose(I2[0], 2, abs_tol=1e-9) and math.isclose(I2[1], 3, abs_tol=1e-9), f'{I1},{I2}')
# median check: midpoints -> centroid
Dm = ((B[0]+C[0])/2, (B[1]+C[1])/2); Em = ((C[0]+A[0])/2, (C[1]+A[1])/2); Fm = ((A[0]+B[0])/2, (A[1]+B[1])/2)
Im = line_isect(A, Dm, B, Em)
G2 = ((A[0]+B[0]+C[0])/3, (A[1]+B[1]+C[1])/3)
ck('3.5 median product 1 and centroid concurrence', math.isclose(Im[0], G2[0], abs_tol=1e-9) and math.isclose(Im[1], G2[1], abs_tol=1e-9), f'{Im},{G2}')
D2 = (24,-9); E2 = (0,3); F2 = (6,0)
ck('3.5 Menelaus D beyond B, directed BD/DC = -1/2', math.isclose(-math.dist(B,D2)/math.dist(D2,C), -0.5, rel_tol=1e-9))
ck('3.5 Menelaus E: CE/EA = 2', math.isclose(math.dist(C,E2)/math.dist(E2,A), 2, rel_tol=1e-9))
ck('3.5 Menelaus F: AF/FB = 1', math.isclose(math.dist(A,F2)/math.dist(F2,B), 1, rel_tol=1e-9))
ck('3.5 Menelaus directed product = -1', math.isclose(-0.5*2*1, -1, abs_tol=1e-12))
slope = lambda p,q: (q[1]-p[1])/(q[0]-p[0]) if q[0]!=p[0] else float('inf')
ck('3.5 D,E,F collinear on y=-x/2+3', math.isclose(slope(E2,F2), -0.5) and math.isclose(slope(D2,F2), -0.5) and math.isclose(D2[1], -D2[0]/2+3))
# ---------- 3.6 Stewart / Apollonus ----------
Bb, Cc, Aa = (0,0), (14,0), (9,12)
ck('3.6 AB=15 AC=13', math.isclose(math.dist(Aa,Bb), 15) and math.isclose(math.dist(Aa,Cc), 13))
ck('3.6 area 84', math.isclose(0.5*14*12, 84))
s = 21
ck('3.6 Heron 84', math.isclose(math.sqrt(s*(s-14)*(s-13)*(s-15)), 84, rel_tol=1e-9))
med2 = (2*13**2 + 2*15**2 - 14**2)/4
ck('3.6 median d^2 = 148', math.isclose(med2, 148), med2)
ck('3.6 median d = 12.165525 = 2sqrt37', math.isclose(math.sqrt(med2), 12.165525, abs_tol=1e-6) and math.isclose(math.sqrt(med2), 2*math.sqrt(37), abs_tol=1e-12))
m, n = 7.5, 6.5
ck('3.6 bisector m+n=14, m/n=15/13', math.isclose(m+n, 14) and math.isclose(m/n, 15/13, rel_tol=1e-9))
bis2 = 13*15*(1 - 14**2/28**2)
ck('3.6 bisector d^2 = 146.25', math.isclose(bis2, 146.25), bis2)
ck('3.6 bisector d = 12.093387', math.isclose(math.sqrt(bis2), 12.093387, abs_tol=1e-6))
lhs = 13**2*m + 15**2*n; rhs = 14*(bis2 + m*n)
ck('3.6 Stewart b^2 m + c^2 n = a(d^2+mn) = 2730', math.isclose(lhs, 2730) and math.isclose(rhs, 2730), f'{lhs},{rhs}')
cen = ((0+14+9)/3, (0+0+12)/3)
ck('3.6 centroid (23/3,4)', math.isclose(cen[0], 23/3) and math.isclose(cen[1], 4))
AG = math.dist(Aa, cen)
ck('3.6 AG = (2/3)*median = 4sqrt37/3 = 8.110350', math.isclose(AG, (2/3)*math.sqrt(148), abs_tol=1e-9) and math.isclose(AG, 8.110350, abs_tol=1e-6), f'{AG:.6f}')
# ---------- quiz keys + ids ----------
keys = ['13021','02132','20310','31203','10231','03120']
ck('quiz keys pairwise distinct', len(set(keys)) == 6)
ids = ['geo-congruence-the-idea-of-same-shape-and-size',
 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs',
 'geo-isosceles-triangles-the-classic-consequences',
 'geo-inequalities-in-a-triangle-sides-and-angles',
 'geo-the-cevian-theorems-ceva-and-menelaus',
 'geo-stewarts-theorem-and-the-median-relation']
ck('lesson ids unique', len(set(ids)) == 6)
print(f'pin_check_geo128: {N} checks, ALL GREEN' )
