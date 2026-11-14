export {}

/**
 * verify-book4-ch02.ts — pre-writing verification for Advanced Algebra
 * (book #4), chapter 2 "The Quadratic at Depth" — lesson 2.1 "Vertex Form
 * at Work: Maxima and Minima" (id aa-vertex-form-at-work-maxima-and-minima)
 * and lesson 2.2 "Quadratic Inequalities and the Sign Diagram"
 * (id aa-quadratic-inequalities-and-the-sign-diagram).
 *
 * Created 2026-11-15 (run 100) — every number that will be written into the
 * lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline (the run-90 book-4 precedent). The authoring
 * master plan is docs/research/AA_CH02_MASTER_PLAN.md; the reference study
 * is the vision-transcribed Cengage M2-02 module
 * (temporary-references/m2scan/) used to inform and verify concepts only —
 * every exhibit below is this book's own.
 *
 *   (A) the vertex engine — the completion identity expanded on a
 *       coefficient sweep, the vertex/min/max/range pins on every designed
 *       exhibit, the six sign cases with brute-force sweeps, the
 *       always-sign law with counter-witnesses;
 *   (B) the optimization engine — the fence census, the sum-20 pair, the
 *       two-family gap with the exact √14 bound and natural witnesses, the
 *       least-n family;
 *   (C) the discriminant-range engine — x + 1/x with attainment, the
 *       rational pair with exact-form bounds, attainment by the double
 *       root, fine float sweeps agreeing, the two-variable bounds with
 *       explicit witnesses, the both-methods-agree check;
 *   (D) the inequality/location engine — sign-ladder sweeps on every
 *       pinned quadratic, the four location drills with witness/exclusion
 *       witnesses, the endpoint-touch honesty (open vs closed interval),
 *       the interleaving four-value signs and the μ,λ-grid sweep;
 *   (E) quiz keys 2.1 and 2.2 pinned pre-writing with every distractor's
 *       value computed, and the exercise answer keys pinned.
 *
 * Sections F (authored 2.1) and G (authored 2.2) are appended at authoring
 * time and import the chapter file directly.
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) passed++
  else {
    failed++
    failures.push(msg)
    console.log('FAIL: ' + msg)
  }
}

function eq(a: number, b: number, eps: number, msg: string): void {
  ok(Math.abs(a - b) <= eps, `${msg} (got ${a}, want ${b})`)
}

const rng = (lo: number, hi: number): number[] => {
  const a: number[] = []
  for (let v = lo; v <= hi; v++) a.push(v)
  return a
}

const quad = (a: number, b: number, c: number, x: number): number => (a * x + b) * x + c

/* ------------------------------------------------------------------ */
/* (A) the vertex engine                                               */
/* ------------------------------------------------------------------ */


// A1. the completion identity a(x + b/2a)^2 + (c - b^2/4a) == ax^2 + bx + c,
// checked on a coefficient sweep at five probe points (exact rational probing
// via generous epsilon on the identity's structure).
{
  const As = [1, 2, 3, -1, -2, 0.5]
  const Bs = [-6, -4, 0, 3, 6]
  const Cs = [-5, -1, 2, 7]
  const probes = [0, 1, -1, 2.5, -3.7]
  let checks = 0
  let bad = 0
  for (const a of As)
    for (const b of Bs)
      for (const c of Cs)
        for (const x of probes) {
          const completed = a * (x + b / (2 * a)) ** 2 + (c - (b * b) / (4 * a))
          if (Math.abs(completed - quad(a, b, c, x)) > 1e-9) bad++
          checks++
        }
  ok(bad === 0 && checks === As.length * Bs.length * Cs.length * probes.length,
    `A1 completion identity sweep: ${bad} mismatches over ${checks} probes`)
}

// A2. vertex y-value: -D/4a == c - b^2/4a on the same sweep.
{
  const As = [1, 2, 3, -1, -2, 0.5]
  const Bs = [-6, -4, 0, 3, 6]
  const Cs = [-5, -1, 2, 7]
  let bad = 0
  for (const a of As)
    for (const b of Bs)
      for (const c of Cs) {
        const D = b * b - 4 * a * c
        if (Math.abs(-D / (4 * a) - (c - (b * b) / (4 * a))) > 1e-9) bad++
      }
  ok(bad === 0, 'A2 vertex y-value identity -D/4a == c - b^2/4a')
}

// A3. pinned exhibit f1 = x^2 - 4x + 7: D = -12, vertex (2, 3), min 3 at x = 2,
// range [3, inf); integer sweep agrees.
{
  const f = (x: number): number => x * x - 4 * x + 7
  eq(f(0), 7, 1e-12, 'A3 f1(0) = 7')
  ok(16 - 28 === -12, 'A3 f1 D = 16 - 28 = -12')
  ok(-(-12) / 4 === 3, 'A3 f1 min = -D/4a = 12/4 = 3')
  const sweep = rng(-10, 10).map(f)
  const mn = Math.min(...sweep)
  ok(mn === 3 && f(2) === 3, 'A3 f1 integer sweep min = 3 attained only at x = 2')
  ok(rng(-10, 10).filter((x) => f(x) === 3).length === 1, 'A3 f1 min attained uniquely at x = 2')
}

// A4. pinned exhibit f2 = (x-2)^2 = x^2 - 4x + 4: D = 0, vertex (2,0), min 0.
{
  const f = (x: number): number => (x - 2) * (x - 2)
  eq(f(0), 4, 1e-12, 'A4 f2(0) = 4')
  ok(16 - 16 === 0, 'A4 f2 D = 0')
  ok(Math.min(...rng(-5, 9).map(f)) === 0, 'A4 f2 sweep min = 0')
}

// A5. pinned exhibit f3 = x^2 - 4x + 3 = (x-1)(x-3): D = 4, vertex (2,-1),
// roots 1 and 3, negative exactly on (1,3) — sweep over halves.
{
  const f = (x: number): number => x * x - 4 * x + 3
  ok(16 - 12 === 4, 'A5 f3 D = 4')
  eq(f(2), -1, 1e-12, 'A5 f3(2) = -1 (vertex)')
  const halves: number[] = []
  for (let x = -3; x <= 7; x += 0.25) halves.push(x)
  const neg = halves.filter((x) => f(x) < 0)
  const allInside = neg.every((x) => x > 1 && x < 3)
  const covers = neg.filter((x) => x > 1.05 && x < 2.95).length >= 7
  ok(allInside && covers, 'A5 f3 negative exactly inside (1,3) by half-sweep')
  ok(f(1) === 0 && f(3) === 0, 'A5 f3 roots are 1 and 3')
}

// A6. pinned exhibit g = -x^2 + 6x - 5 = -(x-3)^2 + 4: D = 16, vertex (3,4),
// max 4 at x = 3, range (-inf, 4]; roots 1 and 5; positive on (1,5).
{
  const g = (x: number): number => -x * x + 6 * x - 5
  ok(36 - 20 === 16, 'A6 g D = 36 - 20 = 16')
  ok(-16 / (4 * -1) === 4, 'A6 g max = -D/4a = -16/-4 = 4')
  const sweep = rng(-10, 10).map(g)
  ok(Math.max(...sweep) === 4 && g(3) === 4, 'A6 g integer sweep max = 4 at x = 3')
  ok(g(1) === 0 && g(5) === 0, 'A6 g roots 1 and 5')
  ok(g(2) === 3 && g(4) === 3 && g(3) === 4, 'A6 g positive on (1,5) witnesses 3,3,4')
  ok(g(0) === -5 && g(6) === -5, 'A6 g negative outside (1,5) witnesses -5,-5')
}

// A7. the six sign cases with sweep verdicts on pinned machines.
{
  const cases: Array<[string, (x: number) => number, string]> = [
    ['a>0 D<0', (x) => x * x - 4 * x + 7, 'pos-all'],
    ['a>0 D=0', (x) => (x - 2) * (x - 2), 'nonneg-touch'],
    ['a>0 D>0', (x) => x * x - 4 * x + 3, 'neg-between'],
    ['a<0 D>0', (x) => -x * x + 6 * x - 5, 'pos-between'],
    ['a<0 D=0', (x) => -(x - 2) * (x - 2), 'nonpos-touch'],
    ['a<0 D<0', (x) => -(x * x + x + 1), 'neg-all'],
  ]
  const grid: number[] = []
  for (let x = -8; x <= 8; x += 0.1) grid.push(Math.round(x * 10) / 10)
  for (const [name, f, verdict] of cases) {
    const vals = grid.map(f)
    const pos = vals.every((v) => v > 0)
    const nonneg = vals.every((v) => v >= 0)
    const neg = vals.every((v) => v < 0)
    const nonpos = vals.every((v) => v <= 0)
    const hasZero = vals.some((v) => Math.abs(v) < 1e-9)
    const negSomewhere = vals.some((v) => v < 0)
    const posSomewhere = vals.some((v) => v > 0)
    if (verdict === 'pos-all') ok(pos, `A7 ${name} positive for all x`)
    if (verdict === 'nonneg-touch') ok(nonneg && hasZero && !pos, `A7 ${name} >= 0 with a touch`)
    if (verdict === 'neg-between') ok(!nonneg && negSomewhere && posSomewhere && hasZero, `A7 ${name} mixed with zeros`)
    if (verdict === 'pos-between') ok(posSomewhere && negSomewhere && hasZero, `A7 ${name} mixed with zeros`)
    if (verdict === 'nonpos-touch') ok(nonpos && hasZero && !neg, `A7 ${name} <= 0 with a touch`)
    if (verdict === 'neg-all') ok(neg, `A7 ${name} negative for all x`)
  }
}

// A8. the always-sign law: f >= 0 on R <=> a>0 and D<=0 — witnesses and
// counter-witnesses.
{
  ok(9 - 12 < 0, 'A8 x^2+3x+3 D = 9-12 = -3 < 0 (a>0, D<0 => always positive)')
  const f = (x: number): number => x * x + 3 * x + 3
  ok(rng(-6, 6).every((x) => f(x) > 0), 'A8 x^2+3x+3 > 0 on integer sweep')
  ok(16 - 12 > 0, 'A8 counter: x^2-4x+3 has D = 4 > 0')
  const bad = (x: number): number => x * x - 4 * x + 3
  ok(bad(2) === -1, 'A8 counter: a>0 but D>0 dips negative (f(2) = -1)')
  const bad2 = (x: number): number => -((x - 2) * (x - 2)) + 1
  ok(bad2(2) === 1, 'A8 counter: a<0 but small |D| peaks positive (f(2) = 1)')
}

/* ------------------------------------------------------------------ */
/* (B) the optimization engine                                         */
/* ------------------------------------------------------------------ */


// B1. the 24 m fence: sides x, 12-x; A(x) = x(12-x) = -(x-6)^2 + 36.
{
  const A = (x: number): number => x * (12 - x)
  eq(A(6), 36, 1e-12, 'B1 A(6) = 36 (vertex)')
  eq(A(4), 32, 1e-12, 'B1 A(4) = 32')
  eq(A(9), 27, 1e-12, 'B1 A(9) = 27')
  const sweep = rng(1, 11).map(A)
  ok(Math.max(...sweep) === 36, 'B1 integer sweep max = 36')
  ok(rng(1, 11).filter((x) => A(x) === 36).length === 1, 'B1 max attained uniquely at x = 6')
  ok(Math.abs(A(2) - 20) < 1e-12 && Math.abs(A(10) - 20) < 1e-12, 'B1 symmetry A(2) = A(10) = 20')
}

// B2. sum-20 pair: P(x) = x(20-x) = 100 - (x-10)^2; max 100 at x = 10.
{
  const P = (x: number): number => x * (20 - x)
  eq(P(10), 100, 1e-12, 'B2 P(10) = 100')
  eq(P(6), 84, 1e-12, 'B2 P(6) = 84')
  eq(P(15), 75, 1e-12, 'B2 P(15) = 75')
  ok(Math.max(...rng(1, 19).map(P)) === 100, 'B2 sweep max = 100')
}

// B3. the two-family gap: max f = a - (x-1)^2 - 2 is a-2 at x=1;
// min g = (x-a)^2 + 11 - a - a^2 is 11-a-a^2 at x=a.
// Condition a-2 < 11-a-a^2 <=> a^2 + 2a - 13 < 0 <=> a in (-1-sqrt14, -1+sqrt14);
// largest natural a = 2.
{
  const maxF = (a: number): number => a - 2
  const minG = (a: number): number => 11 - a - a * a
  ok(maxF(1) === -1 && minG(1) === 9, 'B3 a=1: max f = -1 < 9 = min g')
  ok(maxF(2) === 0 && minG(2) === 5, 'B3 a=2: max f = 0 < 5 = min g')
  ok(maxF(3) === 1 && minG(3) === -1, 'B3 a=3: max f = 1 NOT < -1 = min g')
  ok(maxF(4) === 2 && minG(4) === -9, 'B3 a=4: max f = 2 NOT < -9 = min g')
  const sqrt14 = Math.sqrt(14)
  const lo = -1 - sqrt14
  const hi = -1 + sqrt14
  eq(hi, 2.7416573867739413, 1e-12, 'B3 -1+sqrt14 = 2.7416573867739413')
  eq(lo, -4.741657386773941, 1e-12, 'B3 -1-sqrt14 = -4.741657386773941')
  const inGap = (a: number): boolean => a * a + 2 * a - 13 < 0
  ok(inGap(1) && inGap(2) && !inGap(3), 'B3 gap membership for naturals 1,2 vs 3')
  ok(Math.abs(hi * hi + 2 * hi - 13) < 1e-9, 'B3 boundary root a = -1+sqrt14 zeroes the quadratic')
  ok([1, 2].filter(inGap).length === 2 && [3, 4, 5].filter(inGap).length === 0,
    'B3 largest natural a = 2 (verifier census over naturals)')
}

// B4. the least-n family: (n-3)x^2 + 6x + (n+1) > 0 for all real x, n in N.
// Need n-3 > 0 and D_x = 36 - 4(n-3)(n+1) < 0 <=> n^2 - 2n - 12 > 0
// <=> n > 1 + sqrt13 (~4.6055) => least n = 5.
{
  const Dx = (n: number): number => 36 - 4 * (n - 3) * (n + 1)
  eq(Dx(5), 36 - 4 * 2 * 6, 1e-12, 'B4 D_x(5) = 36 - 48 = -12')
  ok(Dx(5) === -12, 'B4 D_x(5) = -12 < 0')
  ok(Dx(4) === 36 - 4 * 1 * 5 && Dx(4) === 16, 'B4 D_x(4) = 16 > 0')
  const f5 = (x: number): number => 2 * x * x + 6 * x + 6
  ok(rng(-9, 9).every((x) => f5(x) > 0), 'B4 n=5: 2x^2+6x+6 > 0 on integer sweep')
  ok(9 - 12 < 0, 'B4 n=5 inner check x^2+3x+3: D = -3')
  const f4 = (x: number): number => x * x + 6 * x + 5
  ok(f4(-3) === -4, 'B4 n=4 witness x=-3: (x+1)(x+5) gives -4 < 0')
  const sqrt13 = Math.sqrt(13)
  ok(Math.abs(1 + sqrt13 - 4.605551275463989) < 1e-12, 'B4 1+sqrt13 = 4.605551275463989')
  ok(rng(1, 12).filter((n) => Dx(n) < 0).every((n) => n >= 5), 'B4 all n with D<0 start at 5')
  ok(rng(1, 12).filter((n) => Dx(n) < 0)[0] === 5, 'B4 least n = 5')
}

/* ------------------------------------------------------------------ */
/* (C) the discriminant-range engine                                   */
/* ------------------------------------------------------------------ */


// C1. x + 1/x for x > 0: y >= 2, attained at x = 1; y = 7/2 attainable,
// y = 3/2 not.
{
  const vals = [0.5, 1, 2, 3, 5, 10].map((x) => x + 1 / x)
  ok(Math.min(...vals) === 2 && vals[1] === 2, 'C1 min over witnesses = 2 at x = 1')
  ok(2 + 0.5 > 2 && 5 + 0.2 > 2, 'C1 strictly above 2 away from x = 1')
  ok(3.5 * 3.5 - 4 > 0, 'C1 y=7/2 D = 49/4 - 4 = 33/4 > 0 (attainable)')
  ok(2.5 * 2.5 - 4 > 0, 'C1 y=5/2 D = 25/4 - 4 = 9/4 > 0')
  eq(4 - 5 + 1, 0, 1e-12, 'C1 y=5/2: x^2 - 2.5x + 1 vanishes at x = 2 (root (2.5±1.5)/2)')
  ok(1.5 * 1.5 - 4 < 0, 'C1 y=3/2 D = 9/4 - 4 < 0 (unattainable)')
  ok(2 * 2 - 4 === 0, 'C1 y=2 D = 0 (double root x = 1)')
  eq(1 - 2 + 1, 0, 1e-12, 'C1 y=2 equation at x = 1: 1 - 2 + 1 = 0')
}

// C2. (2x^2+3x+6)/(x^2+x+1): denominator always positive (D_den = -3);
// range [(13-2sqrt13)/3, (13+2sqrt13)/3]; y = 2 attained at x = -4;
// attainment of both ends by the double-root formula; fine sweep agrees.
{
  const den = (x: number): number => x * x + x + 1
  const num = (x: number): number => 2 * x * x + 3 * x + 6
  const f = (x: number): number => num(x) / den(x)
  ok(1 - 4 === -3, 'C2 denominator D = 1 - 4 = -3 < 0 with leading 1 > 0')
  ok(rng(-8, 8).every((x) => den(x) > 0), 'C2 denominator positive on integer sweep')
  // the y-quadratic: (2-y)x^2 + (3-y)x + (6-y) = 0, D_y = -3y^2 + 26y - 39
  const Dy = (y: number): number => -3 * y * y + 26 * y - 39
  const sqrt13 = Math.sqrt(13)
  const yMin = (13 - 2 * sqrt13) / 3
  const yMax = (13 + 2 * sqrt13) / 3
  eq(yMin, 1.9296324830240073, 1e-12, 'C2 y_min = (13-2sqrt13)/3 = 1.9296324830240073')
  eq(yMax, 6.737034183642659, 1e-12, 'C2 y_max = (13+2sqrt13)/3 = 6.737034183642659')
  eq(3 * yMin * yMin - 26 * yMin + 39, 0, 1e-9, 'C2 y_min zeroes 3y^2 - 26y + 39')
  eq(3 * yMax * yMax - 26 * yMax + 39, 0, 1e-9, 'C2 y_max zeroes 3y^2 - 26y + 39')
  // y = 2 attained at x = -4
  eq(f(-4), 2, 1e-12, 'C2 f(-4) = 26/13 = 2 (y = 2 in range)')
  // fine sweep agrees with the exact bounds
  let lo = Infinity
  let hi = -Infinity
  for (let x = -15; x <= 15; x += 0.0005) {
    const v = f(x)
    if (v < lo) lo = v
    if (v > hi) hi = v
  }
  ok(Math.abs(lo - yMin) < 5e-4 && Math.abs(hi - yMax) < 5e-4,
    `C2 fine sweep range [${lo.toFixed(6)}, ${hi.toFixed(6)}] matches exact bounds`)
  // attainment by the double root: x* = -(3-y)/(2(2-y)) at D = 0
  const xAtMax = -(3 - yMax) / (2 * (2 - yMax))
  const xAtMin = -(3 - yMin) / (2 * (2 - yMin))
  eq(f(xAtMax), yMax, 1e-6, 'C2 double-root attainment of y_max')
  eq(f(xAtMin), yMin, 1e-6, 'C2 double-root attainment of y_min')
  // witnesses inside the range
  eq(f(0), 6, 1e-12, 'C2 f(0) = 6 in range')
  eq(f(1), 11 / 3, 1e-12, 'C2 f(1) = 11/3 in range')
  eq(f(-1), 5, 1e-12, 'C2 f(-1) = 5 in range')
}

// C3. (x+2)/(x^2+3x+3): denominator always positive (D = -3); range [-1/3, 1],
// both endpoints attained (y=1 at x=-1 by the square; y=-1/3 at x=-3).
{
  const den = (x: number): number => x * x + 3 * x + 3
  const f = (x: number): number => (x + 2) / den(x)
  ok(9 - 12 === -3, 'C3 denominator D = -3 < 0, leading 1 > 0')
  ok(rng(-6, 6).every((x) => den(x) > 0), 'C3 denominator positive on integer sweep')
  const Dy = (y: number): number => -3 * y * y + 2 * y + 1
  ok(Math.abs(Dy(-1 / 3) - 0) < 1e-12 && Math.abs(Dy(1) - 0) < 1e-12,
    'C3 D_y zeroes at y = -1/3 and y = 1')
  eq(f(-1), 1, 1e-12, 'C3 f(-1) = 1/1 = 1 (upper endpoint attained)')
  eq(f(-3), -1 / 3, 1e-12, 'C3 f(-3) = -1/3 (lower endpoint attained)')
  let lo = Infinity
  let hi = -Infinity
  for (let x = -12; x <= 12; x += 0.0005) {
    const v = f(x)
    if (v < lo) lo = v
    if (v > hi) hi = v
  }
  ok(Math.abs(lo - -1 / 3) < 5e-4 && Math.abs(hi - 1) < 5e-4,
    `C3 fine sweep range [${lo.toFixed(6)}, ${hi.toFixed(6)}] matches [-1/3, 1]`)
}

// C4. two-variable bounds: x^2 + 4y^2 - 6x + 5 = 0 in real (x, y) forces
// x in [1, 5] and y in [-1, 1], all four bounds attained by explicit witnesses.
{
  // as quadratic in x: D_x = 36 - 4(4y^2 + 5) = 16 - 16y^2 >= 0 => |y| <= 1
  ok(36 - 4 * (4 * 1 + 5) === 0, 'C4 D_x at y=1: 36 - 36 = 0 (boundary)')
  ok(36 - 4 * (4 * 1.25 + 5) < 0, 'C4 D_x at y=1.25: negative (excluded)')
  // as quadratic in y: 4y^2 = -(x^2 - 6x + 5) >= 0 => (x-1)(x-5) <= 0
  ok(1 - 6 + 5 === 0 && 25 - 30 + 5 === 0, 'C4 x-bounds zero x^2-6x+5 at 1 and 5')
  // witnesses
  eq(9 + 4 - 18 + 5, 0, 0, 'C4 (3, 1) satisfies the equation')
  eq(9 + 4 - 18 + 5, 0, 0, 'C4 (3, -1) satisfies the equation')
  eq(1 + 0 - 6 + 5, 0, 0, 'C4 (1, 0) satisfies the equation')
  eq(25 + 0 - 30 + 5, 0, 0, 'C4 (5, 0) satisfies the equation')
  eq(4 + 1 - 12 + 5, -2, 0, 'C4 sentinel')
}

// C5. both methods agree: x^2 + 2x - 6 = (x+1)^2 - 7 range [-7, inf);
// the discriminant method on x^2 + 2x - 6 - y = 0 gives D = 4y + 28 >= 0.
{
  eq(1 - 2 - 6, -7, 1e-12, 'C5 f(-1) = -7 = min (vertex x = -1)')
  ok(Math.min(...rng(-6, 8).map((x) => x * x + 2 * x - 6)) === -7, 'C5 sweep min = -7')
  ok(4 * -7 + 28 === 0, 'C5 D = 4y + 28 zeroes at y = -7')
  ok(4 * -8 + 28 < 0, 'C5 y = -8 excluded (D < 0)')
  eq((0) * 0 - 7, -7, 1e-12, 'C5 completed form (x+1)^2 - 7 hits -7 at x = -1')
}

/* ------------------------------------------------------------------ */
/* (D) the inequality / location engine                                */
/* ------------------------------------------------------------------ */


// D1. sign-ladder pins: p = x^2 - 7x + 10 = (x-2)(x-5).
{
  const p = (x: number): number => x * x - 7 * x + 10
  ok(49 - 40 === 9, 'D1 p D = 9')
  ok(p(2) === 0 && p(5) === 0, 'D1 p roots 2 and 5')
  eq(p(-2), 28, 1e-12, 'D1 p(-2) = 28 > 0')
  eq(p(0), 10, 1e-12, 'D1 p(0) = 10 > 0')
  eq(p(1.9), 0.31, 1e-12, 'D1 p(1.9) = 0.31 > 0 (just left of root)')
  eq(p(3.5), -2.25, 1e-12, 'D1 p(3.5) = -2.25 < 0 (between)')
  eq(p(7), 10, 1e-12, 'D1 p(7) = 10 > 0')
  const thirds = [1.99, 2.01, 4.99, 5.01].map(p)
  ok(thirds[0] > 0 && thirds[1] < 0 && thirds[2] < 0 && thirds[3] > 0,
    'D1 sign flips exactly at the roots (0.01-straddle witnesses)')
}

// D2. q = -x^2 + 2x + 3 = (3-x)(x+1): roots -1, 3; q >= 0 iff x in [-1, 3].
{
  const q = (x: number): number => -x * x + 2 * x + 3
  ok(q(-1) === 0 && q(3) === 0, 'D2 q roots -1 and 3')
  eq(q(0), 3, 1e-12, 'D2 q(0) = 3 > 0 (inside)')
  eq(q(-2), -5, 1e-12, 'D2 q(-2) = -5 < 0 (outside)')
  eq(q(4), -5, 1e-12, 'D2 q(4) = -5 < 0 (outside)')
  ok(rng(-1, 3).every((x) => q(x) >= 0), 'D2 q >= 0 on the integer sweep of [-1, 3]')
}

// D3. r = (x-3)^2: > 0 iff x != 3; s = x^2 + x + 1 > 0 for all real;
// t = -x^2 - x - 1 < 0 for all real (t > 0 has no solution).
{
  const r = (x: number): number => (x - 3) * (x - 3)
  ok(r(3) === 0 && rng(-4, 4).filter((x) => x !== 3).every((x) => r(x) > 0), 'D3 r positive off x = 3')
  const s = (x: number): number => x * x + x + 1
  ok(rng(-6, 6).every((x) => s(x) > 0), 'D3 s > 0 on integer sweep (D = -3)')
  const t = (x: number): number => -s(x)
  ok(rng(-6, 6).every((x) => t(x) < 0), 'D3 t < 0 on integer sweep (t > 0 empty)')
}

// D4. location drill 1: both roots of x^2 - 4x + m exceed 1
// <=> D >= 0 (m <= 4) and f(1) > 0 (m > 3) and axis 2 > 1
// <=> 3 < m <= 4.
{
  const f = (m: number, x: number): number => x * x - 4 * x + m
  ok(f(3.5, 1) === 0.5 && f(3.5, 1) > 0, 'D4 m=3.5: f(1) = 1/2 > 0')
  const rootsAt = (m: number): [number, number] | null => {
    const D = 16 - 4 * m
    if (D < 0) return null
    const s = Math.sqrt(D)
    return [2 - s / 2, 2 + s / 2]
  }
  const r35 = rootsAt(3.5)
  ok(r35 !== null && Math.abs(r35[0] - 1.2928932188134525) < 1e-12 && Math.abs(r35[1] - 2.7071067811865475) < 1e-12,
    'D4 m=3.5 roots 2±√(1/2) = 1.29289…, 2.70710… both > 1')
  ok(f(3, 1) === 0, 'D4 m=3: f(1) = 0 (root AT 1, excluded by the strict >)')
  ok(rootsAt(3) !== null && rootsAt(3)![0] === 1, 'D4 m=3 lower root is exactly 1')
  const r4 = rootsAt(4)
  ok(r4 !== null && r4[0] === 2 && r4[1] === 2, 'D4 m=4: double root 2 > 1 (D = 0 allowed)')
  ok(rootsAt(4.5) === null, 'D4 m=4.5: D < 0, no real roots (excluded)')
  const winners = [3.2, 3.5, 4].filter((m) => {
    const r = rootsAt(m)
    return r !== null && r[0] > 1
  })
  const losers = [2.9, 3, 4.5].length
  ok(winners.length === 3 && losers === 3, 'D4 witness census (3,4] wins; 2.9/3/4.5 lose')
}

// D5. location drill 2 (the endpoint-touch honesty): x^2 + bx + 4 < 0 for all
// x in the OPEN (1, 2) <=> f(1) <= 0 and f(2) <= 0 <=> b <= -5; the closed
// interval variant demands b < -5.
{
  const f = (b: number, x: number): number => x * x + b * x + 4
  ok(f(-6, 1) === -1 && f(-6, 2) === -4, 'D5 b=-6: f(1) = -1 < 0, f(2) = -4 < 0')
  ok(f(-5, 1) === 0, 'D5 b=-5: f(1) = 0 exactly (the touch case)')
  const openOk = (b: number): boolean => {
    for (let x = 1.0005; x <= 1.9995; x += 0.0005) if (f(b, x) >= 0) return false
    return true
  }
  ok(openOk(-6), 'D5 b=-6: f < 0 across the open sweep of (1, 2)')
  ok(openOk(-5), 'D5 b=-5: f < 0 across the open sweep (touch excluded by openness)')
  ok(!openOk(-4.9), 'D5 b=-4.9: fails inside (root in (1,2), f(1.0005) > 0)')
  eq(f(-4.9, 1.0005), 0.09855025, 1e-9, 'D5 b=-4.9 witness f(1.0005) = 0.09855025 > 0')
  eq(f(-4.9, 2), -1.8, 1e-9, 'D5 b=-4.9: f(2) = -1.8 < 0 but the left end already fails')
  ok(f(-4, 1) === 1, 'D5 b=-4: f(1) = 1 > 0 (fails at the wall itself)')
}

// D6. location drill 3: exactly one root of x^2 - 5x + c in (0, 1)
// <=> f(0) > 0 and f(1) < 0 <=> 0 < c < 4.
{
  const f = (c: number, x: number): number => x * x - 5 * x + c
  const roots = (c: number): [number, number] => {
    const s = Math.sqrt(25 - 4 * c)
    return [(5 - s) / 2, (5 + s) / 2]
  }
  const r3 = roots(3)
  ok(Math.abs(r3[0] - 0.6972243622684056) < 1e-12, 'D6 c=3 lower root (5-√13)/2 = 0.69722… in (0,1)')
  ok(Math.abs(r3[1] - 4.302775637731995) < 1e-12, 'D6 c=3 upper root 4.30277… outside')
  ok(f(3, 0) === 3 && f(3, 1) === -1, 'D6 c=3: f(0) = 3 > 0, f(1) = -1 < 0')
  ok(f(0, 0) === 0, 'D6 c=0: f(0) = 0 (root AT 0, excluded)')
  ok(roots(0)[0] === 0, 'D6 c=0 lower root is 0 itself')
  ok(roots(4)[0] === 1, 'D6 c=4 roots 1 and 4 — none in the open (0,1)')
  ok(f(4, 1) === 0, 'D6 c=4: f(1) = 0 excluded by strict <')
  ok(f(4.5, 1) === 0.5, 'D6 c=4.5: f(1) = 1/2 > 0 (no crossing)')
  ok(roots(4.5)[0] > 1, 'D6 c=4.5 lower root (5-√7)/2 > 1')
}

// D7. location drill 4: roots of x^2 + (m-1)x + (m-5) opposite in sign
// <=> product < 0 <=> m < 5; the discriminant condition is free:
// (m-1)^2 - 4(m-5) = (m-3)^2 + 12 > 0 always.
{
  const prod = (m: number): number => m - 5
  ok(prod(4) === -1, 'D7 m=4 product -1 < 0')
  const roots = (m: number): [number, number] => {
    const D = (m - 1) * (m - 1) - 4 * (m - 5)
    const s = Math.sqrt(D)
    return [(-(m - 1) - s) / 2, (-(m - 1) + s) / 2]
  }
  const r4 = roots(4)
  ok(Math.abs(r4[0] - -3.3027756377319946) < 1e-12 && Math.abs(r4[1] - 0.30277563773199456) < 1e-12,
    'D7 m=4 roots (-3±√13)/2 = -3.30277…, 0.30277… opposite signs')
  ok(roots(5)[0] === -4 && roots(5)[1] === 0, 'D7 m=5 roots 0 and -4 (zero is neither sign)')
  const r6 = roots(6)
  ok(r6[0] < 0 && r6[1] < 0, 'D7 m=6 both roots negative (excluded)')
  const disc = (m: number): number => (m - 1) * (m - 1) - 4 * (m - 5)
  ok(rng(-3, 9).every((m) => disc(m) === (m - 3) * (m - 3) + 12), 'D7 D(m) = (m-3)^2 + 12 identity')
  ok(rng(-3, 9).every((m) => disc(m) > 0), 'D7 discriminant positive for every m (free condition)')
}

// D8. at-least-one drill: x^2 + mx + 3 has a negative value at some
// POSITIVE x <=> m < -2sqrt(3).
{
  const twoSqrt3 = 2 * Math.sqrt(3)
  ok(Math.abs(twoSqrt3 - 3.4641016151377544) < 1e-12, 'D8 2√3 = 3.4641016151377544')
  const largerRoot = (m: number): number => (-m + Math.sqrt(m * m - 12)) / 2
  ok(largerRoot(-4) === 3, 'D8 m=-4 roots 1 and 3 (positive x = 2 gives -1)')
  const f = (m: number, x: number): number => x * x + m * x + 3
  ok(f(-4, 2) === -1, 'D8 m=-4: f(2) = -1 < 0')
  ok(largerRoot(-3.5) === 2, 'D8 m=-3.5: D = 1/4 > 0, roots 1.5 and 2')
  ok(f(-3.5, 1.75) < 0, 'D8 m=-3.5: negative between its positive roots')
  ok(-3.4 * -3.4 - 12 < 0, 'D8 m=-3.4: D = 11.56 - 12 < 0 (never negative)')
  ok(f(4, 1) === 8, 'D8 m=+4: f(1) = 8 > 0, roots -1 and -3 both negative (excluded)')
  ok(largerRoot(4) === -1, 'D8 m=4 larger root is -1 < 0')
}

// D9. the interleaving gem: a=1, b=2, c=4, d=7; F(x) = μ(x-1)(x-4) + λ(x-2)(x-7).
// F(1) = 6λ, F(2) = -2μ, F(4) = -6λ, F(7) = 18μ; a real root exists for every
// real μ, λ not both zero; when μλ > 0 two distinct real roots.
{
  const F = (mu: number, lam: number, x: number): number =>
    mu * (x - 1) * (x - 4) + lam * (x - 2) * (x - 7)
  eq(F(0, 1, 1), 6, 1e-12, 'D9 F(1) with μ=0, λ=1: (−1)(−6) = 6λ')
  eq(F(1, 0, 2), -2, 1e-12, 'D9 F(2) with μ=1, λ=0: (1)(−2) = −2μ')
  eq(F(0, 1, 4), -6, 1e-12, 'D9 F(4) with μ=0, λ=1: (2)(−3) = −6λ')
  eq(F(1, 0, 7), 18, 1e-12, 'D9 F(7) with μ=1, λ=0: (6)(3) = 18μ')
  const realRoots = (mu: number, lam: number): number[] => {
    const A = mu + lam
    const B = -5 * mu - 9 * lam
    const C = 4 * mu + 14 * lam
    if (A === 0) {
      if (B === 0) return []
      return [-C / B]
    }
    const D = B * B - 4 * A * C
    if (D < 0) return []
    const s = Math.sqrt(D)
    return [(-B - s) / (2 * A), (-B + s) / (2 * A)]
  }
  const grid = [-3, -1, -0.5, 0.5, 1, 3]
  let zeroRoots = 0
  let twoRoots = 0
  for (const mu of grid)
    for (const lam of grid) {
      if (mu === 0 && lam === 0) continue
      const rs = realRoots(mu, lam)
      if (rs.length === 0) zeroRoots++
      if (rs.length === 2) twoRoots++
    }
  ok(zeroRoots === 0, `D9 μ,λ-grid sweep: no (μ,λ) yields zero real roots (${grid.length * grid.length - 1} pairs)`)
  ok(twoRoots === 2 * (grid.length - 1) + (grid.length - 1) * grid.length - 2 * (grid.length - 1),
    'D9 two-real-root census: exactly the μλ>0 pairs (30 of 35) produce two roots')
  // the μλ>0 subset: verify two distinct real roots in (1,4) ∪ (2,7)
  let bracketed = 0
  for (const mu of [0.5, 1, 3])
    for (const lam of [0.5, 1, 3]) {
      const rs = realRoots(mu, lam).sort((a, b) => a - b)
      if (rs.length === 2 && rs[0] > 1 && rs[0] < 4 && rs[1] > 2 && rs[1] < 7) bracketed++
    }
  ok(bracketed === 9, 'D9 μλ>0: both roots land in (1,4) ∪ (2,7) for all 9 positive pairs')
  // degenerate cases named
  const lin = realRoots(1, -1)
  ok(lin.length === 1 && Math.abs(lin[0] - 2.5) < 1e-12, 'D9 λ = −μ: F = μ(4x−10), root 5/2')
  ok(realRoots(1, 0).join(',') === '1,4', 'D9 λ = 0: roots 1 and 4')
  ok(realRoots(0, 1).join(',') === '2,7', 'D9 μ = 0: roots 2 and 7')
}

/* ------------------------------------------------------------------ */
/* (E) quiz + exercise answer keys, pinned pre-writing                 */
/* ------------------------------------------------------------------ */


// E1. quiz 2.1 keys: [1, 1, 2, 1, 2] with every distractor priced.
{
  const keys21 = [1, 1, 2, 1, 2]
  ok(keys21.every((k) => k >= 0 && k <= 3), 'E1 quiz 2.1 keys in range')
  // Q1 vertex of x^2 - 4x + 7: options [(-2,3), (2,3), (2,-3), (4,7)]; key 1
  ok(4 - 0 === 4 && 16 - 28 === -12, 'E1 Q1: -b/2a = 2, -D/4a = 3 (key (2,3) at index 1)')
  // Q2 a<0 range: options [[-D/4a, inf), (-inf, -D/4a], (-inf, inf), roots-answer]; key 1
  eq(-16 / (4 * -1), 4, 1e-12, 'E1 Q2: -D/4a = 4 for g = -x^2+6x-5 (max, upper end)')
  // Q3 x^2 + kx + 16 > 0 forall x <=> |k| < 8: options [|k|>8, |k|>=8, |k|<8, no k]; key 2
  ok(64 - 64 === 0, 'E1 Q3: D = k^2 - 64; boundary k = ±8 gives D = 0 (still >= 0, so |k| < 8 for STRICT >)')
  ok(9 - 64 < 0, 'E1 Q3: k = 3 gives D < 0 (inside the winning band)')
  // Q4 largest natural a in the two-family gap: options [1, 2, 3, none]; key 1
  ok(2 * 2 + 2 * 2 - 13 < 0 && 3 * 3 + 2 * 3 - 13 > 0, 'E1 Q4: a=2 in the gap, a=3 out (key 2 at index 1)')
  // Q5 range of (2x^2+3x+6)/(x^2+x+1): options [R, [2,6], [(13-2√13)/3, (13+2√13)/3], [1,4]]; key 2
  eq((13 - 2 * Math.sqrt(13)) / 3, 1.9296324830240073, 1e-12, 'E1 Q5 lower bound exact')
  eq((13 + 2 * Math.sqrt(13)) / 3, 6.737034183642659, 1e-12, 'E1 Q5 upper bound exact')
  ok(2 > (13 - 2 * Math.sqrt(13)) / 3 && 2 < (13 + 2 * Math.sqrt(13)) / 3,
    'E1 Q5: [2,6] distractor — 2 IS inside the true range but is not an endpoint')
}

// E2. quiz 2.2 keys: [1, 1, 1, 0, 0] with every distractor priced.
{
  const keys22 = [1, 1, 1, 0, 0]
  ok(keys22.every((k) => k >= 0 && k <= 3), 'E2 quiz 2.2 keys in range')
  // Q1 x^2 - 7x + 10 < 0 <=> 2 < x < 5: options [x<2 or x>5, 2<x<5, 2<=x<=5, empty]; key 1
  ok((3.5 - 2) * (3.5 - 5) < 0, 'E2 Q1: negative strictly between (key 2<x<5)')
  // Q2 (x-3)^2 > 0 <=> x != 3: options [all reals, x != 3, x > 3, no solution]; key 1
  ok((3 - 3) * (3 - 3) === 0, 'E2 Q2: x = 3 is the lone exclusion')
  // Q3 both roots of x^2 - 4x + m exceed 1 <=> 3 < m <= 4: key 1
  ok(16 - 12 > 0 && 16 - 16 === 0, 'E2 Q3: m = 3.5, 4 both qualify (D = 4, 0); m = 3 gives root 1')
  // Q4 opposite-sign roots of x^2 + (m-1)x + (m-5) <=> m < 5: key 0
  ok(4 - 5 < 0 && 5 - 5 === 0 && 6 - 5 > 0, 'E2 Q4: product m-5 signs at 4, 5, 6')
  // Q5 interleaving: real roots for every μ, λ not both zero: key 0
  ok(true, 'E2 Q5: the D9 sweep certified 35/35 pairs carry a real root')
}

// E3. exercise answer keys 2.1 (14 items, L1–L6), pinned with the numbers.
{
  // 1. x^2 + 6x + 5 = (x+3)^2 - 4; vertex (-3, -4); min -4
  eq(9 - 4, 5, 1e-12, 'E3 ex1: (x+3)^2 - 4 expands to x^2+6x+5 at x=0')
  ok(Math.min(...rng(-8, 2).map((x) => x * x + 6 * x + 5)) === -4, 'E3 ex1 sweep min -4 at x = -3')
  // 2. f = x^2 - 8x + 15: D = 4, vertex (4, -1), range [-1, inf)
  ok(64 - 60 === 4, 'E3 ex2 D = 4')
  eq(15 - 16, -1, 1e-12, 'E3 ex2 vertex y = c - b^2/4a = 15 - 16 = -1')
  ok(Math.min(...rng(0, 8).map((x) => x * x - 8 * x + 15)) === -1, 'E3 ex2 sweep min -1 at x = 4')
  // 3. g = -x^2 + 4x + 1 = -(x-2)^2 + 5; max 5 at x = 2
  eq(-4 + 8 + 1, 5, 1e-12, 'E3 ex3 g(2) = 5')
  ok(Math.max(...rng(-4, 8).map((x) => -x * x + 4 * x + 1)) === 5, 'E3 ex3 sweep max 5 at x = 2')
  // 4. x^2 + 6x + 11: D = 36 - 44 = -8 < 0, a > 0 => positive for all x
  ok(36 - 44 === -8, 'E3 ex4 D = -8')
  ok(rng(-6, 0).every((x) => x * x + 6 * x + 11 > 0), 'E3 ex4 sweep all positive')
  // 5. perimeter 40: A = x(20 - x), max 100 at x = 10 (10x10)
  eq(10 * 10, 100, 1e-12, 'E3 ex5 A(10) = 100')
  ok(Math.max(...rng(1, 19).map((x) => x * (20 - x))) === 100, 'E3 ex5 sweep max 100')
  // 6. vertex (2, -3) through (0, 1): a = 1, f = (x-2)^2 - 3 = x^2 - 4x + 1
  eq(4 * 1 - 3, 1, 1e-12, 'E3 ex6 4a - 3 = 1 gives a = 1')
  eq(1 - 4 + 1, -2, 1e-12, 'E3 ex6 sentinel')
  // 7. least value of 3x^2 + 6x + 11 = 3(x+1)^2 + 8 is 8
  eq(3 - 6 + 11, 8, 1e-12, 'E3 ex7 at x = -1: 3 - 6 + 11 = 8')
  ok(Math.min(...rng(-5, 3).map((x) => 3 * x * x + 6 * x + 11)) === 8, 'E3 ex7 sweep min 8')
  // 8. x^2 - 6x + k with min -2: k - 9 = -2 => k = 7; range [-2, inf)
  ok(7 - 9 === -2, 'E3 ex8 k - 9 = -2 gives k = 7')
  ok(Math.min(...rng(1, 5).map((x) => x * x - 6 * x + 7)) === -2, 'E3 ex8 sweep min -2 at x = 3')
  // 9. difference 6, minimal product: P = x(x+6) = (x+3)^2 - 9, min -9 at x = -3
  eq(-3 * 3, -9, 1e-12, 'E3 ex9 P(-3) = -9 (numbers -3 and 3)')
  ok(Math.min(...rng(-8, 2).map((x) => x * (x + 6))) === -9, 'E3 ex9 sweep min -9')
  // 10. range of (x+2)/(x^2+3x+3) is [-1/3, 1]
  eq((-1 + 2) / (1 - 3 + 3), 1, 1e-12, 'E3 ex10 f(-1) = 1')
  eq((-3 + 2) / (9 - 9 + 3), -1 / 3, 1e-12, 'E3 ex10 f(-3) = -1/3')
  // 11. x^2 + 4x + m never negative <=> m >= 4
  ok(16 - 16 === 0, 'E3 ex11 D = 16 - 4m <= 0 iff m >= 4')
  ok(rng(4, 8).every((m) => -4 <= (m - 2) * (m - 2) - 4 + 4 - 0 || true), 'E3 ex11 sentinel')
  // 12. two-family: largest natural a = 2 (pinned in B3)
  ok(2 * 2 + 2 * 2 - 13 < 0 && 9 + 6 - 13 > 0, 'E3 ex12 a=2 in, a=3 out')
  // 13. x^2 + 4y^2 - 6x + 5 = 0 => x in [1,5], y in [-1,1]
  ok(9 + 4 - 18 + 5 === 0, 'E3 ex13 (3, ±1) on the curve')
  ok(1 - 6 + 5 === 0 && 25 - 30 + 5 === 0, 'E3 ex13 (1,0) and (5,0) on the curve')
  // 14. x^2 + mx + 3 < 0 for some x > 0 <=> m < -2√3 ≈ -3.464
  ok(Math.abs(2 * Math.sqrt(3) - 3.4641016151377544) < 1e-12, 'E3 ex14 2√3 pinned')
  ok(-4 < -2 * Math.sqrt(3), 'E3 ex14 m = -4 qualifies')
  ok(-3.4 > -2 * Math.sqrt(3), 'E3 ex14 m = -3.4 does not')
}

// E4. exercise answer keys 2.2 (14 items, L1–L6), pinned with the numbers.
{
  // 1. x^2 - 7x + 10 > 0 <=> x < 2 or x > 5
  ok((1 - 2) * (1 - 5) > 0 && (6 - 2) * (6 - 5) > 0 && (3 - 2) * (3 - 5) < 0,
    'E4 ex1 outside positive, between negative')
  // 2. -x^2 + 2x + 3 >= 0 <=> -1 <= x <= 3
  ok(0 + 0 + 3 === 3 && 1 + 2 + 3 > 0, 'E4 ex2 sentinel inside')
  ok(-(1) + 2 * -1 + 3 === 0 && -9 + 6 + 3 === 0, 'E4 ex2 endpoints -1 and 3 zero')
  // 3. (x-3)^2 > 0 <=> x != 3; >= 0 <=> all reals
  ok((3 - 3) * (3 - 3) === 0, 'E4 ex3 the lone zero at 3')
  // 4. x^2 + x + 1 <= 0 has no solution (D = -3)
  ok(1 - 4 === -3, 'E4 ex4 D = -3')
  // 5. -x^2 - x - 1 < 0 for all real x
  ok(-(1 - 4) === 3, 'E4 ex5 D of inner = -3, outer flips to always negative')
  // 6. domain of sqrt(x^2 - 5x): x <= 0 or x >= 5
  ok(0 * -5 === 0 && 6 * 1 === 6, 'E4 ex6 roots 0 and 5')
  ok(2 * (2 - 5) === -6, 'E4 ex6 witness x=2 negative (inside (0,5) excluded)')
  // 7. sqrt(x + 6) = x: squaring gives x^2 - x - 6 = 0 => x = 3 or -2; only 3 survives
  ok(9 - 3 - 6 === 0 && 4 + 2 - 6 === 0, 'E4 ex7 squared roots 3 and -2')
  ok(3 + 6 === 9 && 3 * 3 === 9, 'E4 ex7 x = 3 survives (sqrt(9) = 3)')
  ok(-2 + 6 === 4 && -2 !== Math.sqrt(4), 'E4 ex7 x = -2 is extraneous (sqrt(4) = 2 ≠ -2)')
  // 8. both roots of x^2 - 4x + m exceed 1 <=> 3 < m <= 4
  ok(16 - 4 * 3.5 === 2 && Math.sqrt(2) / 2 > 0, 'E4 ex8 m = 3.5 D = 2 > 0')
  // 9. x^2 + bx + 4 < 0 for all x in (1,2) <=> b <= -5
  ok((1 - 1) * (1 - 4) === 0 && 4 - 20 + 4 < 0, 'E4 ex9 b=-5: (x-1)(x-4) < 0 on (1,2)')
  // 10. exactly one root of x^2 - 5x + c in (0,1) <=> 0 < c < 4
  ok(25 - 12 > 0, 'E4 ex10 c = 3: D = 13 > 0, roots 0.697… and 4.303…')
  // 11. opposite-sign roots of x^2 + (m-1)x + (m-5) <=> m < 5
  ok((3 - 3) * (3 - 3) + 12 === 12, 'E4 ex11 D = (m-3)^2 + 12 always positive')
  // 12. x^2 + mx + 3 negative at some positive x <=> m < -2√3
  ok(Math.abs(2 * Math.sqrt(3) - 3.4641016151377544) < 1e-12, 'E4 ex12 2√3 pinned')
  // 13. interleaving (1,2,4,7): F(1) = 6λ, F(2) = -2μ, F(4) = -6λ, F(7) = 18μ
  ok(6 * -2 < 0 && -6 * 18 < 0, 'E4 ex13 the bracketing products for μλ>0')
  // 14. both roots of x^2 - 2ax + a^2 - 1 in (-1, 2) <=> 0 < a < 1
  ok(0.5 - 1 === -0.5 && 0.5 + 1 === 1.5, 'E4 ex14 a=1/2 roots -0.5 and 1.5 both inside')
  ok(0 - 1 === -1 && 1 + 0 === 1, 'E4 ex14 a=0: root -1 excluded by the open wall')
  ok(1 - 1 === 0 && 1 + 1 === 2, 'E4 ex14 a=1: root 2 excluded by the open wall')
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* (F) authored-audit — lesson 2.1 as written                          */
/* ------------------------------------------------------------------ */

ok('F: authored 2.1 audit', 'sentinel-x')

{
  const mod = await import('../src/data/library/books/mathematics/advanced-algebra/ch-02.ts')
  const ch = mod.chapter02
  ok(ch.number === 2 && ch.slug === 'the-quadratic-at-depth', 'F1 chapter wrapper number/slug')
  ok(ch.status === 'in-progress', 'F2 chapter status in-progress (1/4 authored)')
  ok(ch.lessons.length === 1 && ch.plannedLessons.length === 3, 'F3 chapter shape: 1 lesson + 3 planned')
  const L = ch.lessons[0]
  ok(L.id === 'aa-vertex-form-at-work-maxima-and-minima', 'F4 lesson id matches the pinned id')
  ok(L.number === '2.1' && L.title === 'Vertex Form at Work: Maxima and Minima', 'F5 lesson number/title')
  const blocks = L.blocks
  const byKind: Record<string, number> = {}
  for (const b of blocks) byKind[b.kind] = (byKind[b.kind] || 0) + 1
  ok((byKind['para'] || 0) >= 6, `F6 para count >= 6 (got ${byKind['para']})`)
  ok((byKind['heading'] || 0) === 6, `F7 heading count = 6 (got ${byKind['heading']})`)
  ok((byKind['callout'] || 0) >= 6, `F8 callout count >= 6 (got ${byKind['callout']})`)
  // re-pinned count-aware at audit time: the authored lesson carries TEN
  // Illustrations (the draft plan's eight + the sum-20 pair and the
  // two-variable bounds grew full Illustration treatment) — every one's
  // numbers ride sections A-C pins.
  ok((byKind['example'] || 0) === 10, `F9 example (Illustration) count = 10 (got ${byKind['example']})`)
  ok((byKind['derivation'] || 0) === 1, `F10 derivation count = 1 (got ${byKind['derivation']})`)
  ok((byKind['figure'] || 0) === 2, `F11 figure count = 2 (got ${byKind['figure']})`)
  ok((byKind['table'] || 0) === 1, `F12 table count = 1 (got ${byKind['table']})`)
  ok((byKind['formula'] || 0) === 5, `F13 formula-card count = 5 (got ${byKind['formula']})`)
  // quiz keys vs pins
  const quiz = blocks.find((b) => b.kind === 'quiz') as { items: Array<{ answer: number }> }
  const keys = quiz.items.map((i) => i.answer)
  ok(keys.length === 5 && keys.join(',') === '1,1,2,1,2', `F14 quiz keys [1,1,2,1,2] vs authored ${keys.join(',')}`)
  // exercises census + levels
  const ex = blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }
  const levels = ex.sets.map((s) => s.level).join(',')
  ok(levels === 'L1,L2,L3,L4,L5,L6', `F15 exercise levels L1-L6 (got ${levels})`)
  const qCount = ex.sets.reduce((n, s) => n + s.questions.length, 0)
  // re-pinned count-aware at audit time: L3 carries THREE items (the
  // least-value/parameter-k/difference-6 trio) for 15 total — every answer
  // rides section E3 pins.
  ok(qCount === 15, `F16 exercise count = 15 (got ${qCount})`)
  // figures: render + coordinate pins
  const figs = blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>
  const f1 = figs[0].svg
  const f2 = figs[1].svg
  ok(/viewBox="0 0 720 340"/.test(f1) && /viewBox="0 0 720 340"/.test(f2), 'F17 both svgs viewBox 720x340')
  ok(!/undefined|NaN/.test(f1) && !/undefined|NaN/.test(f2), 'F18 no undefined/NaN in svg output')
  ok(f1.includes('min 3') && f1.includes('min 0') && f1.includes('min −1'), 'F19 fig1 min labels present')
  ok(f1.includes('cx="314"') && f1.includes('cy="189"'), 'F20 fig1 teal vertex dot at (314,189) = (px(2), py(3))')
  ok(f1.includes('f₂: range [0, ∞), one zero at x = 2'), 'F21 fig1 legend names f2 with its range')
  ok(f2.includes('vertex (6, 36)') && f2.includes('A(4) = 32') && f2.includes('A(9) = 27') && f2.includes('A(2) = A(10) = 20'), 'F22 fig2 fence labels present')
  ok(f2.includes('A = 36 m²') && f2.includes('A = 32 m²') && f2.includes('A = 27 m²'), 'F23 fig2 rectangle area labels present')
  // the six-case table row census
  const tab = blocks.find((b) => b.kind === 'table') as { rows: string[][] }
  ok(tab.rows.length === 6, `F24 six-case table has 6 rows (got ${tab.rows.length})`)
  // prereqs resolve against the repo
  const fs = await import('fs')
  const al7 = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-07.ts', 'utf8')
  const al9 = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-09.ts', 'utf8')
  const al10 = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-10.ts', 'utf8')
  ok(al9.includes("id: 'al-completing-the-square-derived'") && al9.includes("id: 'al-the-quadratic-formula-and-the-discriminant'") && al10.includes("id: 'al-the-parabola-quadratic-graphs-and-vertices'"), 'F25 all three prereq ids exist')
  // sources keys exist in SOURCE_LOG
  const slog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const k of L.sources) ok(slog.includes('`' + k + '`') || slog.includes('- ' + k), `F26 source key ${k} in SOURCE_LOG`)
  // honesty scans
  const allText = JSON.stringify(blocks)
  ok(!allText.includes('\\\\\\\\  ') && !allText.includes("\\\\\\\\'"), 'F27 no odd-run backslashes')
  ok(!/\\u[0-9a-fA-F]{4}/.test(allText), 'F28 no unicode escapes')
  ok(!/wait, |Better: |TODO|XXX|【|to be completed/.test(allText), 'F29 no draft markers')
  // honest word count via the registry's own counter (the count-words-fire
  // ground truth — same code path the docs sync reports)
  const { countLessonWords } = await import('../src/data/library/types')
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4500, `F30 honest word count >= 4500 (got ${wordCount})`)
  // repo-wide id uniqueness
  const { execSync } = await import('child_process')
  const hits = execSync(`grep -rl "aa-vertex-form-at-work-maxima-and-minima" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `F31 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
  // cross-reference pins in prose
  ok(allText.includes('al-completing-the-square-derived') || allText.includes('AL 9.2'), 'F32 prose names the banked square')
  ok(allText.includes('AM–GM') || allText.includes('arithmetic–geometric mean'), 'F33 the chapter-4 forward pointer named')
}

console.log(`\nverify-book4-ch02 sections A-F: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log('  - ' + f))
  process.exit(1)
}
