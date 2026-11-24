#!/usr/bin/env python3
"""pin_check_122.py — run 122 pre-flight pins for AA chapter 10.
Every witness the five specs will assert, brute-forced here FIRST.
Prints PIN lines; exits non-zero if any check fails."""
import math
from math import log, log2, sqrt
from fractions import Fraction as F

fails = []
def pin(name, got, want):
    ok = got == want
    if not ok:
        fails.append(f"{name}: got {got!r} want {want!r}")
    print(f"PIN {'OK ' if ok else 'FAIL'} {name}: {got!r}" + ("" if ok else f"  (want {want!r})"))

def close(name, got, want, tol=5e-7):
    ok = abs(got - want) <= tol
    if not ok:
        fails.append(f"{name}: got {got!r} want {want!r} (tol {tol})")
    print(f"PIN {'OK ' if ok else 'FAIL'} {name}: {got:.7f}" + ("" if ok else f"  (want {want:.7f}, tol {tol})"))

print("== 10.1 substitution game ==")
roots = []
for t in (3, 4):
    c = 5 - t  # x^2-5x+(5-t)=0
    disc = 25 - 4 * c
    r1 = (5 + sqrt(disc)) / 2
    r2 = (5 - sqrt(disc)) / 2
    roots += [r1, r2]
    pin(f"10.1 disc for t={t}", disc, 17 if t == 3 else 21)
def orig(x):
    t = x * x - 5 * x + 5
    return t * t - 7 * t + 12
for r in roots:
    close(f"10.1 root {r:.7f} satisfies original", orig(r), 0.0, tol=1e-6)
close("10.1 root sum (Vieta)", sum(roots), 10.0, tol=1e-9)
close("10.1 root product (Vieta)", roots[0]*roots[1]*roots[2]*roots[3], 2.0, tol=1e-9)
close("10.1 root (5+sqrt17)/2", (5+sqrt(17))/2, 4.5615528, tol=5e-7)

print("== 10.1 x+1/x ladder ==")
s = [3.0, 7.0]
for k in range(2, 9):
    s.append(3 * s[-1] - s[-2])
pin("10.1 ladder s3..s9", s[1:],
    [7.0, 18.0, 47.0, 123.0, 322.0, 843.0, 2207.0, 5778.0])

print("== 10.1 symmetric reads on x^2-7x+11 ==")
a = (7 + sqrt(5)) / 2
b = (7 - sqrt(5)) / 2
close("10.1 a^3+b^3", a**3 + b**3, 112.0, tol=1e-6)
close("10.1 a^4+b^4", a**4 + b**4, 487.0, tol=1e-6)
close("10.1 (a-b)^2", (a - b) ** 2, 5.0, tol=1e-9)
close("10.1 1/a+1/b", 1/a + 1/b, 7/11, tol=1e-9)

print("== 10.1 AM-GM ==")
best = min(((x + 4/x, x) for x in [i/1000 for i in range(1, 10001)]))
close("10.1 min x+4/x", best[0], 4.0, tol=1e-3)
pin("10.1 min x+4/x at x=2", best[1], 2.0)
best = min(((9*x + 4/x) for x in [i/10000 for i in range(1, 100001)]))
close("10.1 min 9x+4/x", best, 12.0, tol=1e-4)
best = max(((x*(6-x)) for x in [i/10000 for i in range(1, 60000)]))
close("10.1 max x(6-x)", best, 9.0, tol=1e-4)
best = max((x*y*z for x in [i/10 for i in range(1,121)] for y in [j/10 for j in range(1,121)] for z in [k/10 for k in range(1,121)] if abs(x+y+z-12) < 1e-9))
close("10.1 max xyz (grid)", best, 64.0, tol=1e-3)

print("== 10.1 telescoping ==")
for n in (5, 10, 1000):
    direct = sum(1/(k*(k+2)) for k in range(1, n+1))
    formula = F(1,2)*(F(3,2) - F(1,n+1) - F(1,n+2))
    close(f"10.1 telescoping n={n}", direct, float(formula), tol=1e-12)
close("10.1 telescoping S5 decimal", sum(1/(k*(k+2)) for k in range(1,6)), 0.5952381, tol=5e-7)
close("10.1 telescoping infinite", 3/4, 0.75, tol=0)
import math as m
for n in (5, 7):
    direct = sum(k * m.factorial(k) for k in range(1, n+1))
    pin(f"10.1 sum k*k! n={n}", direct, m.factorial(n+1) - 1)
s6 = sum(k / 2**k for k in range(1, 7))
s10 = sum(k / 2**k for k in range(1, 11))
close("10.1 S6 k/2^k", s6, 1.875, tol=1e-12)
close("10.1 S10 k/2^k", s10, 1.98828125, tol=1e-8)
close("10.1 inf k/2^k", sum(k / 2**k for k in range(1, 400)), 2.0, tol=1e-12)

print("== 10.1 binomial hunts ==")
from math import comb
pin("10.1 C(12,5)", comb(12, 5), 792)
pin("10.1 C(12,6)", comb(12, 6), 924)
pin("10.1 sum C(12,k)", sum(comb(12, k) for k in range(13)), 4096)
pin("10.1 alternating sum C(12,k)", sum((-1)**k * comb(12, k) for k in range(13)), 0)
pin("10.1 independent term (2x-1/x)^10", comb(10,5) * 2**5 * (-1)**5, -8064)
pin("10.1 x^4 coeff (2x-1/x)^10", comb(10,3) * 2**7 * (-1)**3, -15360)
C = comb(50, 25)
pin("10.1 C(50,25)", C, 126410606437752)
pin("10.1 digits C(50,25)", len(str(C)), 15)
close("10.1 log10 C(50,25)", log(C, 10), 14.1017, tol=1e-3)

print("== 10.1 log speed reads ==")
chain = [(2,3),(3,4),(4,5),(5,6),(6,7)]
vals = [log(n, b) for b, n in chain]
close("10.1 log_2 3", vals[0], 1.5849625, tol=5e-7)
close("10.1 log_3 4", vals[1], 1.2618595, tol=5e-7)
close("10.1 log_4 5", vals[2], 1.1609640, tol=5e-7)
close("10.1 log_5 6", vals[3], 1.1132827, tol=5e-7)
close("10.1 log_6 7", vals[4], 1.0860331, tol=5e-7)
pin("10.1 chain strictly decreasing", all(vals[i] > vals[i+1] for i in range(4)), True)
close("10.1 25*log10(8)", 25 * log(8, 10), 22.5772497, tol=5e-7)
pin("10.1 digits 8^25", len(str(8**25)), 23)
close("10.1 300*ln2", 300 * math.log(2), 207.9441542, tol=5e-6)
close("10.1 200*ln3", 200 * math.log(3), 219.7224577, tol=5e-6)
pin("10.1 3^200 bigger", 3**200 > 2**300, True)

print("== 10.2 value ladders ==")
pin("10.2 f(2026) additive c=3", 3 * 2026, 6078)
pin("10.2 f(1/2) additive", 3 * F(1,2), F(3,2))
close("10.2 2*sqrt2", 2 * sqrt(2), 2.8284271, tol=5e-7)
pin("10.2 squeeze band", (2*1.41 < 2*sqrt(2) < 2*1.42), True)
for x, y in [(2,5),(0,7),(1,1),(3.5,2.5)]:
    fxy = 4*(x+y) - 1
    rhs = (4*x-1) + (4*y-1) + 1
    close(f"10.2 shifted ladder check ({x},{y})", fxy, rhs, tol=1e-12)
close("10.2 f(5) shifted", 4*5-1, 19.0, tol=0)
pin("10.2 f(4) product family", 3**4, 81)
pin("10.2 (2*3)^4", (2*3)**4, 1296)
pin("10.2 2^4*3^4", 2**4 * 3**4, 1296)
def fq(x): return x*(x+1)/2
for x, y in [(2,3),(5,7),(10,10),(1,1)]:
    close(f"10.2 quad rule ({x},{y})", fq(x+y), fq(x)+fq(y)+x*y, tol=1e-12)
pin("10.2 f(6) quad", fq(6), 21)
pin("10.2 f(100) quad (Gauss)", fq(100), 5050)
def f4(x): return (x - 1) / (x + 1)
witness = [2.0, 3.5, -0.5, 7.0, 0.25]
it2 = [f4(f4(x)) for x in witness]
it3 = [f4(f4(f4(x))) for x in witness]
it4 = [f4(f4(f4(f4(x)))) for x in witness]
close("10.2 f^2(2) = -1/2", it2[0], -0.5, tol=1e-12)
pin("10.2 f^4 all x", all(abs(it4[i] - witness[i]) < 1e-9 for i in range(5)), True)
close("10.2 f^3(2) exact", (1 + witness[0]) / (1 - witness[0]), -3.0, tol=1e-12)
pin("10.2 2026 mod 4", 2026 % 4, 2)
pin("10.2 x^2 not additive", (1+2)**2 != 1**2 + 2**2, True)
pin("10.2 2^x not additive", 2**(1+2) != 2**1 + 2**2, True)
pin("10.2 a^x mult-over-sums", 2**(1+2) == 2**1 * 2**2, True)
pin("10.2 log mult-add", log(6,2) == log(2,2) + log(3,2), True)

print("== 10.3 synthesis witnesses ==")
pin("10.3 ch1 g(f(3))", (2*3+1)**2, 49)
pin("10.3 ch1 f(g(3))", 2*3**2+1, 19)
pin("10.3 ch2 vertex value", -2*9 + 36 - 7, 11)
z = complex(1, 1) ** 8
pin("10.3 ch3 (1+i)^8", int(round(z.real)), 16)
close("10.3 ch5 sum 1/2^k", sum(1/2**k for k in range(1, 200)), 1.0, tol=1e-12)
pin("10.3 ch6 C(10,3)", comb(10, 3), 120)
pin("10.3 ch6 10P3", m.perm(10, 3), 720)
pin("10.3 ch7 sum k at 100", 100*101//2, 5050)
close("10.3 ch8 a^3+b^3", a**3 + b**3, 112.0, tol=1e-6)
chainv = 1.0
for k in range(3, 9):
    chainv *= log(k + 1, k)
close("10.3 ch9 log chain", chainv, 2.0, tol=1e-9)
close("10.3 ch9 e", math.e, 2.7182818, tol=5e-8)
pin("10.3 ch9 digits 2^100", len(str(2**100)), 31)

print("== 10.4 doorstep ==")
exact = {n: 9*(1-0.9**n) for n in (10, 30, 50)}
for n in (10, 30, 50):
    print(f"   S{n} = {exact[n]:.7f}")
close("10.4 S10 of 0.9^k", exact[10], 5.8618940, tol=5e-6)
close("10.4 S30 of 0.9^k", exact[30], 8.6184796, tol=5e-6)
close("10.4 S50 of 0.9^k", exact[50], 8.9536160, tol=5e-6)
def dq(f, x, h): return (f(x + h) - f(x)) / h
sq = lambda x: x * x
close("10.4 dq x^2 x=3 h=1", dq(sq, 3, 1), 7.0, tol=0)
close("10.4 dq x^2 x=3 h=0.1", dq(sq, 3, 0.1), 6.1, tol=1e-9)
close("10.4 dq x^2 x=3 h=0.01", dq(sq, 3, 0.01), 6.01, tol=1e-9)
inv = lambda x: 1 / x
close("10.4 dq 1/x x=2 h=0.1", dq(inv, 2, 0.1), -0.2380952, tol=5e-7)
close("10.4 -1/x^2 at 2", -1/4, -0.25, tol=0)
ex = lambda x: 2 ** x
close("10.4 dq 2^x x=1 h=0.1", dq(ex, 1, 0.1), 1.4354693, tol=5e-7)
close("10.4 dq 2^x x=1 h=0.01", dq(ex, 1, 0.01), 1.3911100, tol=5e-7)
close("10.4 dq 2^x x=1 h=0.001", dq(ex, 1, 0.001), 1.3867749, tol=5e-7)
close("10.4 2*ln2", 2 * math.log(2), 1.3862944, tol=5e-7)
close("10.4 ln2", math.log(2), 0.6931472, tol=5e-8)
for h, w in [(0.1, 0.7177346), (0.01, 0.6955550), (0.001, 0.6933875), (0.0001, 0.6931712)]:
    close(f"10.4 (2^h-1)/h h={h}", (2**h - 1) / h, w, tol=5e-7)
e = math.e
for h, w in [(0.1, 1.0517092), (0.01, 1.0050167)]:
    close(f"10.4 (e^h-1)/h h={h}", (e**h - 1) / h, w, tol=5e-7)
lg = lambda x: log(x, 2)
close("10.4 dq log2 x=1 h=0.1", dq(lg, 1, 0.1), 1.3750352, tol=5e-7)
close("10.4 dq log2 x=1 h=0.01", dq(lg, 1, 0.01), 1.4355293, tol=5e-7)
close("10.4 1/ln2", 1 / math.log(2), 1.4426950, tol=5e-7)
def signum(x): return 0 if x == 0 else (1 if x > 0 else -1)
pin("10.4 signum jump at 0", signum(0.001) - signum(-0.001), 2)
def gif(x): return math.floor(x)
pin("10.4 GIF jump at 1", gif(1.0001) - gif(0.9999), 1)
close("10.4 x^2 delta at 3, h=0.01", sq(3.01) - sq(3), 0.0601, tol=1e-9)

print("== 10.R audit chains ==")
pin("10.R digits 2^100", len(str(2**100)), 31)
pin("10.R Gauss 5050", fq(100), 5050)
pin("10.R 2026 mod 4", 2026 % 4, 2)
close("10.R f^2(2)=-1/2", f4(f4(2)), -0.5, tol=1e-12)
pin("10.R C(50,25) 15 digits", len(str(comb(50, 25))), 15)

print()
print(f"TOTAL FAILS: {len(fails)}")
for f in fails:
    print("  FAIL:", f)
print("RESULT:", "ALL GREEN" if not fails else "RED")
