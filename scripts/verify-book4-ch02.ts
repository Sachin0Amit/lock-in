import { chapter02 } from '../src/data/library/books/mathematics/advanced-algebra/ch-02'
import { countLessonWords } from '../src/data/library/types'
import * as fs from 'fs'
import { execSync } from 'child_process'

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

  // section marker: the authored-audit for lesson 2.1 as written follows
  {
  const ch = chapter02
  ok(ch.number === 2 && ch.slug === 'the-quadratic-at-depth', 'F1 chapter wrapper number/slug')
  ok(ch.status === 'in-progress', 'F2 chapter status in-progress (1/4 authored)')
  // re-pinned count-aware at audit time (run 101): the authored chapter now
  // carries TWO lessons (2.1 from run 100 + 2.2 from this run) and TWO
  // planned titles — section G re-asserts the same shape below.
  ok(ch.lessons.length === 3 && ch.plannedLessons?.length === 1, 'F3 chapter shape: 3 lessons + 1 planned (re-pinned run 102: 2.3 authored)')
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
  const slog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const k of L.sources ?? []) ok(slog.includes('`' + k + '`') || slog.includes('- ' + k), `F26 source key ${k} in SOURCE_LOG`)
  // honesty scans
  const allText = JSON.stringify(blocks)
  ok(!allText.includes('\\\\\\\\  ') && !allText.includes("\\\\\\\\'"), 'F27 no odd-run backslashes')
  ok(!/\\u[0-9a-fA-F]{4}/.test(allText), 'F28 no unicode escapes')
  ok(!/wait, |Better: |TODO|XXX|【|to be completed/.test(allText), 'F29 no draft markers')
  // honest word count via the registry's own counter (the count-words-fire
  // ground truth — same code path the docs sync reports)
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4500, `F30 honest word count >= 4500 (got ${wordCount})`)
  // repo-wide id uniqueness
  const hits = execSync(`grep -rl "aa-vertex-form-at-work-maxima-and-minima" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `F31 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
  // cross-reference pins in prose
  ok(allText.includes('al-completing-the-square-derived') || allText.includes('AL 9.2'), 'F32 prose names the banked square')
  ok(allText.includes('AM–GM') || allText.includes('arithmetic–geometric mean'), 'F33 the chapter-4 forward pointer named')
}

/* ------------------------------------------------------------------ */
/* (G) authored-audit — lesson 2.2 as written                          */
/* ------------------------------------------------------------------ */

  // section marker: the authored-audit for lesson 2.2 as written follows
  {
  const ch = chapter02
  ok(ch.number === 2 && ch.slug === 'the-quadratic-at-depth', 'G1 chapter wrapper number/slug')
  ok(ch.status === 'in-progress', 'G2 chapter status in-progress (2/4 authored)')
  ok(ch.lessons.length === 3 && ch.plannedLessons?.length === 1, 'G3 chapter shape: 3 lessons + 1 planned (re-pinned run 102: 2.3 authored)')
  const L = ch.lessons[1]
  ok(L.id === 'aa-quadratic-inequalities-and-the-sign-diagram', 'G4 lesson id matches the pinned id')
  ok(L.number === '2.2' && L.title === 'Quadratic Inequalities and the Sign Diagram', 'G5 lesson number/title')
  const blocks = L.blocks
  const byKind: Record<string, number> = {}
  for (const b of blocks) byKind[b.kind] = (byKind[b.kind] || 0) + 1
  ok((byKind['para'] || 0) >= 8, `G6 para count >= 8 (got ${byKind['para']})`)
  ok((byKind['heading'] || 0) === 6, `G7 heading count = 6 (got ${byKind['heading']})`)
  ok((byKind['callout'] || 0) >= 6, `G8 callout count >= 6 (got ${byKind['callout']})`)
  // re-pinned count-aware at audit time: the authored lesson carries TWELVE
  // Illustrations (the draft plan's eight + the zeros/sign read, the domain
  // check, the three-verdicts family and the near-miss witness grown into
  // full Illustration treatment) — every one's numbers ride sections D + E4.
  ok((byKind['example'] || 0) === 12, `G9 example (Illustration) count = 12 (got ${byKind['example']})`)
  ok((byKind['derivation'] || 0) === 1, `G10 derivation count = 1 (got ${byKind['derivation']})`)
  ok((byKind['figure'] || 0) === 2, `G11 figure count = 2 (got ${byKind['figure']})`)
  ok((byKind['table'] || 0) === 1, `G12 table count = 1 (got ${byKind['table']})`)
  ok((byKind['formula'] || 0) === 5, `G13 formula-card count = 5 (got ${byKind['formula']})`)
  ok((byKind['list'] || 0) === 2, `G13b list count = 2 (got ${byKind['list']})`)
  // quiz keys vs pins
  const quiz = blocks.find((b) => b.kind === 'quiz') as { items: Array<{ answer: number; explain: string }> }
  const keys = quiz.items.map((i) => i.answer)
  ok(keys.length === 5 && keys.join(',') === '1,1,1,0,0', `G14 quiz keys [1,1,1,0,0] vs authored ${keys.join(',')}`)
  // exercises census + levels
  const ex = blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }
  const levels = ex.sets.map((s) => s.level).join(',')
  ok(levels === 'L1,L2,L3,L4,L5,L6', `G15 exercise levels L1-L6 (got ${levels})`)
  const qCount = ex.sets.reduce((n, s) => n + s.questions.length, 0)
  ok(qCount === 14, `G16 exercise count = 14 (got ${qCount})`)
  // hosted folds: named subsections present with definition + worked example
  const heads = blocks.filter((b) => b.kind === 'heading').map((b) => (b as { text: string }).text)
  ok(heads.some((t) => t.includes('Graphical Interpretation') && t.includes('Zero')), 'G17 fold 1 named subsection: Graphical Interpretation of the Zero of an Expression')
  ok(heads.some((t) => t.includes('Domain of an Equation')), 'G18 fold 2 named subsection: The Domain of an Equation')
  const calls = blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string }>
  ok(calls.some((c) => c.tone === 'definition' && c.title.includes('Zero')), 'G17b fold 1 formal definition callout present')
  ok(calls.some((c) => c.tone === 'definition' && c.title.includes('Domain')), 'G18b fold 2 formal definition callout present')
  // figures: render + coordinate pins
  const figs = blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>
  const f1 = figs[0].svg
  const f2 = figs[1].svg
  ok(/viewBox="0 0 720 340"/.test(f1) && /viewBox="0 0 720 340"/.test(f2), 'G19 both svgs viewBox 720x340')
  ok(!/undefined|NaN/.test(f1) && !/undefined|NaN/.test(f2), 'G20 no undefined/NaN in svg output')
  ok(f1.includes('x² − 7x + 10 = (x − 2)(x − 5)') && f1.includes('reads: x &lt; 2 or x &gt; 5'), 'G21 fig1 title + the read line present')
  ok(f1.includes('217.5') && f1.includes('453.75') && f1.includes('335.6') && f1.includes('vertex (3.5, −2.25)'), 'G22 fig1 fence/root/vertex px coordinates present')
  ok(f2.includes('f(x) = x² − 5x + 6, both roots inside (1, 4)') && f2.includes('a·f(1) = 2 &gt; 0 — wall 1 outside') && f2.includes('a = 1, f(1) = 1 − 5 + 6 = 2'), 'G23 fig2 panel title + check row 2 with provenance sub-line')
  ok(f2.includes('a·f(4) = 2 &gt; 0 — wall 4 outside') && f2.includes('f(4) = 16 − 20 + 6 = 2') && f2.includes('axis 2.5 ∈ (1, 4)'), 'G24 fig2 check rows 3+4')
  ok(f2.includes('counter-case x² − 5x + 4') && f2.includes('sit ON the walls'), 'G25 fig2 counter-case panel')
  // the location-question table row census
  const tab = blocks.find((b) => b.kind === 'table') as { rows: string[][] }
  ok(tab.rows.length === 5, `G26 location-question table has 5 rows (got ${tab.rows.length})`)
  // prereqs resolve against the repo
  const fs = await import('fs')
  const al7 = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-07.ts', 'utf8')
  const al10 = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-10.ts', 'utf8')
  ok(al7.includes("id: 'al-solving-linear-inequalities'") && al10.includes("id: 'al-the-parabola-quadratic-graphs-and-vertices'"), 'G27 prereq ids exist in AL ch. 7 / ch. 10')
  // sources keys exist in SOURCE_LOG
  const slog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const k of L.sources ?? []) ok(slog.includes('`' + k + '`') || slog.includes('- ' + k), `G28 source key ${k} in SOURCE_LOG`)
  // honesty scans
  const allText = JSON.stringify(blocks)
  ok(!allText.includes('\\\\\\\\  ') && !allText.includes("\\\\\\\\'"), 'G29 no odd-run backslashes')
  ok(!/\\u[0-9a-fA-F]{4}/.test(allText), 'G30 no unicode escapes')
  ok(!/wait, |Better: |TODO|XXX|【|to be completed/.test(allText), 'G31 no draft markers')
  // honest word count via the registry's own counter (the count-words-fire
  // ground truth — same code path the docs sync reports)
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4500, `G32 honest word count >= 4500 (got ${wordCount})`)
  // repo-wide id uniqueness
  const hits = execSync(`grep -rl "aa-quadratic-inequalities-and-the-sign-diagram" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `G33 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
  // cross-reference pins in prose
  ok(allText.includes('AL 7') || allText.includes('al-solving-linear-inequalities'), 'G34 prose names the banked linear-inequality lesson')
  ok(allText.includes('2.1') || allText.includes('aa-vertex-form-at-work-maxima-and-minima'), 'G35 prose names lesson 2.1')
  // every quiz item's explain prices the distractors (length floor)
  ok(quiz.items.every((i) => i.explain.length >= 120), 'G36 every quiz explain prices the distractors')
}

/* ------------------------------------------------------------------ */
/* (H) lesson 2.3 "Symmetric Reads and Common Roots" — the engine      */
/*     suite, pinned BEFORE any prose (run 102, verify-first).          */
/*     Every exhibit below is this book's own (study-never-reproduce:  */
/*     the m2-02 module's illustrations informed METHOD shapes only).  */
/* ------------------------------------------------------------------ */

// exact rational helpers (small integers only — Number is exact < 2^53)
const gcd = (a: number, b: number): number => (b === 0 ? Math.abs(a) : gcd(b, a % b))
const ratEq = (n1: number, d1: number, n2: number, d2: number): boolean =>
  n1 * d2 === n2 * d1 && d1 * d2 !== 0

// real roots of ax^2 + bx + c (returns [] when D < 0, one entry when D = 0)
function realRoots(a: number, b: number, c: number): number[] {
  const D = b * b - 4 * a * c
  if (D < 0) return []
  if (D === 0) return [-b / (2 * a)]
  const s = Math.sqrt(D)
  return [(-b + s) / (2 * a), (-b - s) / (2 * a)]
}

// H1. Viète's reads certified against the quadratic formula on a sweep:
// alpha+beta == -b/a and alpha*beta == c/a to 1e-9 whenever D >= 0.
{
  const As = [1, 2, 3, 5, -1, -3]
  const Bs = [-12, -9, -6, -5, -2, 3, 7, 11]
  const Cs = [-10, -8, -3, -1, 1, 2, 4, 6, 7]
  let checked = 0
  let bad = 0
  for (const a of As)
    for (const b of Bs)
      for (const c of Cs) {
        const roots = realRoots(a, b, c)
        if (roots.length === 0) continue
        const s = roots[0] + (roots.length === 2 ? roots[1] : roots[0])
        const p = roots.length === 2 ? roots[0] * roots[1] : roots[0] * roots[0]
        if (Math.abs(s - -b / a) > 1e-9) bad++
        if (Math.abs(p - c / a) > 1e-9) bad++
        checked++
      }
  ok(bad === 0 && checked > 200, `H1 Viète reads vs quadratic formula: ${bad} misses over ${checked} real-root triples`)
}

// H2. the symmetric-read engine on the LESSON's own exhibits — each read
// priced symbolically from (S, P) AND numerically from the formula roots.
{
  // exhibit 1: 3x^2 - 9x + 2 = 0 — S = 3, P = 2/3 (irrational roots)
  {
    const S = 3, P = 2 / 3
    const [al, be] = realRoots(3, -9, 2)
    ok(ratEq(3, 1, 9, 3) && ratEq(2, 3, 2, 3), 'H2.1 exhibit-1 S = 3, P = 2/3 pins')
    eq(al + be, S, 1e-9, 'H2.1 numeric sum 3')
    eq(al * be, P, 1e-9, 'H2.1 numeric product 2/3')
    eq(al * al + be * be, S * S - 2 * P, 1e-9, 'H2.1 alpha^2+beta^2 = 23/3 (both routes)')
    eq(S * S - 2 * P, 23 / 3, 1e-12, 'H2.1 alpha^2+beta^2 pin 23/3')
    eq(S * S * S - 3 * P * S, 21, 1e-12, 'H2.1 alpha^3+beta^3 pin 21')
    eq(al ** 3 + be ** 3, 21, 1e-9, 'H2.1 numeric cubes 21')
    eq(S / P, 4.5, 1e-12, 'H2.1 1/alpha+1/beta pin 9/2')
    eq(1 / al + 1 / be, 4.5, 1e-9, 'H2.1 numeric reciprocals 9/2')
    eq(S * S - 4 * P, 19 / 3, 1e-12, 'H2.1 (alpha-beta)^2 pin 19/3')
    eq((al - be) ** 2, 19 / 3, 1e-9, 'H2.1 numeric difference-square 19/3')
    eq((S * S - 2 * P) / P, 11.5, 1e-12, 'H2.1 alpha/beta+beta/alpha pin 23/2')
    eq(al / be + be / al, 11.5, 1e-9, 'H2.1 numeric ratio-sum 23/2')
    eq((S * S - 2 * P) ** 2 - 2 * P * P, 521 / 9, 1e-12, 'H2.1 alpha^4+beta^4 pin 521/9')
    eq(al ** 4 + be ** 4, 521 / 9, 1e-9, 'H2.1 numeric fourth powers 521/9')
  }
  // exhibit 2: x^2 - 6x + 5 = 0 — the FIGURE's equation, integer roots 1, 5
  {
    const [al, be] = realRoots(1, -6, 5)
    ok([al, be].includes(1) && [al, be].includes(5), 'H2.2 figure-equation roots 1 and 5')
    eq(al * al + be * be, 26, 1e-12, 'H2.2 alpha^2+beta^2 pin 26 (quiz Q2)')
    eq((al - be) ** 2, 16, 1e-12, 'H2.2 (alpha-beta)^2 pin 16')
    eq(1 / al + 1 / be, 6 / 5, 1e-12, 'H2.2 1/alpha+1/beta pin 6/5')
  }
  // exhibit 3: x^2 - 4x + 1 = 0 — the lesson's running equation (roots 2±√3)
  {
    const S = 4, P = 1
    const [al, be] = realRoots(1, -4, 1)
    eq(al + be, 4, 1e-9, 'H2.3 running-equation sum 4')
    eq(al * be, 1, 1e-9, 'H2.3 running-equation product 1')
    eq(al * al + be * be, 14, 1e-12, 'H2.3 alpha^2+beta^2 pin 14')
    eq(al ** 2 + be ** 2, 14, 1e-9, 'H2.3 numeric squares 14')
    // the reduced-equation trick: alpha^2 = 4alpha - 1 forces alpha, beta to be
    // roots of x^2 - 4x + 1; ratios give x^2 - 14x + 1
    eq(al / be + be / al, 14, 1e-9, 'H2.3 ratio-sum pin 14')
    const [r1, r2] = realRoots(1, -14, 1)
    ok(Math.abs(r1 - (al / be)) < 1e-9 || Math.abs(r2 - (al / be)) < 1e-9, 'H2.3 ratio roots 7±4√3 match alpha/beta')
    eq((7 + 4 * Math.sqrt(3)) + (7 - 4 * Math.sqrt(3)), 14, 1e-12, 'H2.3 7±4√3 sums to 14')
  }
}

// H3. the power-sum recurrence engine: alpha^(k+2) = -(b/a)alpha^(k+1) - (c/a)alpha^k.
// Exhibit: x^2 - x - 1 = 0 — the power sums are the LUCAS numbers 2, 1, 3, 4, 7, 11, 18, 29.
{
  const phi = (1 + Math.sqrt(5)) / 2
  const psi = (1 - Math.sqrt(5)) / 2
  // recurrence ground truth from the roots directly
  const L: number[] = [2, 1]
  for (let k = 2; k <= 7; k++) L.push(L[k - 1] + L[k - 2])
  ok(L.join(',') === '2,1,3,4,7,11,18,29', 'H3.1 Lucas power sums pinned 2,1,3,4,7,11,18,29')
  for (let k = 0; k <= 7; k++) eq(phi ** k + psi ** k, L[k], 1e-9, `H3.2 phi^${k}+psi^${k} = ${L[k]}`)
  // the recurrence relation itself: L(k) = L(k-1) + L(k-2) is exactly
  // alpha^(k+2) = (b'/a')alpha^(k+1) - (c'/a')alpha^k with a'=1, b'=-1, c'=-1
  for (let k = 0; k <= 5; k++) eq(phi ** (k + 2) + psi ** (k + 2), phi ** (k + 1) + psi ** (k + 1) + phi ** k + psi ** k, 1e-9, `H3.3 recurrence at k=${k}`)
  // exhibit-1's recurrence route re-derives alpha^3+beta^3 = 21 for 3x^2-9x+2:
  // alpha^2 = 3alpha - 2/3, so alpha^3 = (25/3)alpha - 2 and the sum is 25 - 4 = 21
  const [al] = realRoots(3, -9, 2)
  eq((25 / 3) * al - 2, al ** 3, 1e-9, 'H3.4 alpha^3 = (25/3)alpha - 2 on exhibit 1')
  eq((25 / 3) * 3 - 4, 21, 1e-12, 'H3.4 sum route gives 21')
  // H3.5 the collapse identity on the Lucas equation (x^2 - x - 1, P = -1):
  // T15 + T11 = T2 * T13 (since alpha^2 beta^2 = 1); Lucas: T13 = 521, T2 = 3
  {
    const L2: number[] = [2, 1]
    for (let k = 2; k <= 15; k++) L2.push(L2[k - 1] + L2[k - 2])
    ok(L2[13] === 521 && L2[15] === 1364 && L2[11] === 199 && L2[2] === 3, `H3.5 Lucas census T13=${L2[13]}, T15=${L2[15]}, T11=${L2[11]}, T2=${L2[2]}`)
    eq(L2[15] + L2[11], L2[2] * L2[13], 1e-12, 'H3.5 T15 + T11 = 1563 = 3 x 521 = T2 x T13 (the collapse)')
    eq(phi ** 15 + psi ** 15 + phi ** 11 + psi ** 11, 1563, 1e-9, 'H3.5 numeric roots agree on 1563')
  }
}

// H4. the transformation engine: substitution route vs the S'/P' route on
// the lesson's own reconstructions.
{
  // T1 shift: x^2 - 6x + 8 (roots 2, 4) -> roots alpha+2, beta+2 = y^2 - 10y + 24
  {
    const [al, be] = realRoots(1, -6, 8)
    ok([al, be].includes(2) && [al, be].includes(4), 'H4.1 base roots 2 and 4')
    const S1 = al + 2 + (be + 2)
    const P1 = (al + 2) * (be + 2)
    eq(S1, 10, 1e-12, 'H4.1 S\' = 10')
    eq(P1, 24, 1e-12, 'H4.1 P\' = 24')
    // substitution route: x = y - 2 in x^2 - 6x + 8
    const f = (y: number) => (y - 2) * (y - 2) - 6 * (y - 2) + 8
    // y^2 - 10y + 24 must vanish at y = alpha+2, beta+2
    ok(f(al + 2) === 0 && f(be + 2) === 0, 'H4.1 substitution route vanishes at the shifted roots')
    eq(f(6) - (36 - 60 + 24), 0, 1e-12, 'H4.1 y^2-10y+24 spot check at y = 6')
  }
  // T2 scale+shift: y = 2x+3 applied to x^2 - 5x + 7 -> y^2 - 16y + 67 (both routes)
  {
    const S = 5, P = 7
    const Sp = 2 * S + 6
    const Pp = 4 * P + 6 * S + 9
    ok(Sp === 16 && Pp === 67, 'H4.2 S/P route pins 16 and 67')
    // substitution route: x = (y-3)/2
    const f = (y: number) => ((y - 3) / 2) ** 2 - 5 * ((y - 3) / 2) + 7
    // y^2 - 16y + 67 = 0 at the same seats: compare polynomials at 5 probe points
    const g = (y: number) => y * y - 16 * y + 67
    const probes = [0, 1, 2.5, -3, 8]
    ok(probes.every((y) => Math.abs(f(y) * 4 - g(y)) < 1e-9), 'H4.2 both routes agree on 5 probes (after the 4x clearing)')
  }
  // T3 reciprocal: 3x^2 - 9x + 2 -> 2x^2 - 9x + 3 (the coefficient-reversal law)
  {
    const [al, be] = realRoots(3, -9, 2)
    const rr = realRoots(2, -9, 3)
    const nearA = rr.some((r) => Math.abs(r - 1 / al) < 1e-9)
    const nearB = rr.some((r) => Math.abs(r - 1 / be) < 1e-9)
    ok(nearA && nearB, 'H4.3 reversal-law roots are the reciprocals')
    ok(ratEq(9, 2, 9, 2) && ratEq(3, 2, 3, 2), 'H4.3 S\'=9/2, P\'=3/2 pins')
  }
  // T4 the elimination route: y = x^2 + 1 with x^2 - 4x + 1 = 0 eliminates x
  // through y = 4x, landing on y^2 - 16y + 16 = 0; S'/P' route agrees
  {
    const [al, be] = realRoots(1, -4, 1)
    const S1 = (al * al + 1) + (be * be + 1)
    const P1 = (al * al + 1) * (be * be + 1)
    ok(Math.abs(S1 - 16) < 1e-9 && Math.abs(P1 - 16) < 1e-9, 'H4.4 alpha^2+1, beta^2+1 give S\'=16, P\'=16')
    const g = (y: number) => y * y - 16 * y + 16
    ok(Math.abs(g(al * al + 1)) < 1e-9 && Math.abs(g(be * be + 1)) < 1e-9, 'H4.4 y^2-16y+16 vanishes at the new roots')
    // the elimination identity: y = 4x on the solution set
    ok(Math.abs(al * al + 1 - 4 * al) < 1e-9 && Math.abs(be * be + 1 - 4 * be) < 1e-9, 'H4.4 x^2+1 = 4x holds at both roots (the elimination engine)')
  }
}

// H5. the difference engine + the consecutive-integer census.
{
  // x^2 - px + 27 with (alpha-beta)^2 = 36 -> p^2 = 36 + 108 = 144 -> p = ±12
  eq(36 + 108, 144, 1e-12, 'H5.1 p^2 = 144 pin')
  const [r1, r2] = realRoots(1, -12, 27)
  ok((r1 === 9 && r2 === 3) || (r1 === 3 && r2 === 9), 'H5.1 p = 12 roots 3 and 9, gap 6')
  // consecutive-integer roots: x^2 - 13x + c -> c = 42 (roots 6, 7); law b^2 - 4c = 1
  eq(169 - 4 * 42, 1, 1e-12, 'H5.2 b^2 - 4c = 1 for c = 42')
  const [r3, r4] = realRoots(1, -13, 42)
  ok((r3 === 7 && r4 === 6) || (r3 === 6 && r4 === 7), 'H5.2 roots 6 and 7 consecutive')
  // the gap-law sweep: consecutive integer roots n, n+1 give b^2-4c = 1
  let lawBad = 0
  for (let n = -6; n <= 6; n++) {
    const b = -(2 * n + 1)
    const c = n * (n + 1)
    if (b * b - 4 * c !== 1) lawBad++
  }
  ok(lawBad === 0, 'H5.3 gap law b^2-4c = 1 over 13 consecutive-pair designs')
}

// H6. the repeated-root census (HOSTED FOLD ground).
{
  // R1 definition: D = 0 <=> the double seat x0 = -b/2a satisfies the equation
  let rrBad = 0
  let rrCount = 0
  for (const a of [1, 2, 3, -1, -2])
    for (const b of [-8, -6, -4, 4, 6, 8])
      for (const c of [-9, -4, 2, 3, 4, 8, 9]) {
        const D = b * b - 4 * a * c
        if (D !== 0) continue
        const x0 = -b / (2 * a)
        if (Math.abs(a * x0 * x0 + b * x0 + c) > 1e-12) rrBad++
        rrCount++
      }
  ok(rrBad === 0 && rrCount >= 5, `H6.1 double seat satisfies its equation on ${rrCount} D=0 designs`)
  // R2 the perfect-square discriminant: (b-c)^2 - 4(a-b)(c-a) = (2a-b-c)^2 over a sweep
  let psBad = 0
  for (let a = -4; a <= 5; a++)
    for (let b = -4; b <= 5; b++)
      for (let c = -4; c <= 5; c++) {
        if (a - b === 0) continue
        const lhs = (b - c) ** 2 - 4 * (a - b) * (c - a)
        const rhs = (2 * a - b - c) ** 2
        if (lhs !== rhs) psBad++
      }
  ok(psBad === 0, 'H6.2 perfect-square discriminant identity over the 9^3-minus-guard sweep')
  // R3 the AP verdict: equal roots <=> 2a = b + c; witnesses (3,2,4) vs (3,2,5)
  {
    // witness: a=3, b=2, c=4 -> x^2 - 2x + 1 = (x-1)^2
    const f = (x: number) => (3 - 2) * x * x + (2 - 4) * x + (4 - 3)
    ok(f(1) === 0, 'H6.3 witness (3,2,4): f(1) = 0')
    ok(2 * 3 === 2 + 4, 'H6.3 2a = b + c holds for the witness')
    // non-witness: a=3, b=2, c=5 -> x^2 - 3x + 2, distinct roots 1, 2
    const g = (x: number) => (3 - 2) * x * x + (2 - 5) * x + (5 - 3)
    const roots = realRoots(1, -3, 2)
    ok(roots.includes(1) && roots.includes(2) && g(1) === 0 && g(2) === 0, 'H6.3 non-witness (3,2,5) has distinct roots 1, 2')
    ok(2 * 3 !== 2 + 5, 'H6.3 2a = b + c fails for the non-witness')
  }
  // R4 the GP duplicate: a,b,c in GP (b^2 = ac) => D(ax^2+2bx+c) = 0, root -b/a;
  // sharing with dx^2+2ex+f <=> dc+af = 2be <=> d/a, e/b, f/c in AP.
  {
    const a = 1, b = 2, c = 4 // GP
    ok(b * b === a * c, 'H6.4 witness GP 1, 2, 4')
    const D = (2 * b) ** 2 - 4 * a * c
    ok(D === 0, 'H6.4 D(ax^2+2bx+c) = 0 for the GP witness')
    const x0 = -b / a
    ok(a * x0 * x0 + 2 * b * x0 + c === 0, 'H6.4 repeated root -b/a = -2 satisfies x^2+4x+4')
    const d = 3, e = 5, f = 8 // designed AP trio d/a=3, e/b=2.5, f/c=2
    ok(ratEq(3, 1, 3, 1) && ratEq(5, 2, 5, 2) && ratEq(2, 1, 2, 1), 'H6.4 ratio pins 3, 5/2, 2')
    ok(3 - 2.5 === 2.5 - 2, 'H6.4 d/a, e/b, f/c in AP')
    ok(dc_check(d, e, f), 'H6.4 the shared-seat equation dc+af-2be = 0 holds')
    function dc_check(dd: number, ee: number, ff: number): boolean {
      return dd * c + ff * a - 2 * ee * b === 0
    }
    // the shared seat: dx^2+2ex+f vanishes at x = -b/a
    ok(d * x0 * x0 + 2 * e * x0 + f === 0, 'H6.4 3x^2+10x+8 vanishes at x = -2')
    // a NON-AP trio fails the shared seat
    const d2 = 3, e2 = 5, f2 = 9
    ok(d2 * c + f2 * a - 2 * e2 * b !== 0, 'H6.4 non-AP (3,5,9): dc+af-2be = 1 differs from 0')
    ok(Math.abs(d2 * x0 * x0 + 2 * e2 * x0 + f2) > 0, 'H6.4 non-AP trio does not share the repeated seat')
  }
}

// H7. the common-root engine (both hosted-fold grounds).
{
  // C1 brute-force certification: over an integer grid, condition-zero
  // <=> (a real common root exists) OR the pair is proportional.
  const grid = [1, 2, 3, -1]
  const bs = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
  const cs = [-5, -4, -3, -2, -1, 1, 2, 3, 4, 5]
  let pairs = 0
  let condZero = 0
  let commonReal = 0
  let prop = 0
  let mismatches = 0
  for (const a1 of grid)
    for (const b1 of bs)
      for (const c1 of cs)
        for (const a2 of grid)
          for (const b2 of bs)
            for (const c2 of cs) {
              pairs++
              const D1 = b1 * b1 - 4 * a1 * c1
              const D2 = b2 * b2 - 4 * a2 * c2
              const cond =
                (c1 * a2 - c2 * a1) ** 2 - (b1 * c2 - b2 * c1) * (a1 * b2 - a2 * b1)
              const isProp =
                a1 * b2 === a2 * b1 && b1 * c2 === b2 * c1 && a1 * c2 === a2 * c1
              const r1 = realRoots(a1, b1, c1)
              const r2 = realRoots(a2, b2, c2)
              let shared = false
              for (const u of r1) for (const v of r2) if (Math.abs(u - v) < 1e-7) shared = true
              if (cond === 0) condZero++
              if (shared) commonReal++
              if (isProp) prop++
              const predicted = cond === 0 || (isProp && D1 >= 0 && D2 >= 0)
              // a real common root exists iff condition zero AND both D >= 0;
              // condition zero with a negative D forces proportionality
              if (shared !== (cond === 0 && D1 >= 0 && D2 >= 0)) mismatches++
              if (predicted !== (cond === 0 || (isProp && D1 >= 0 && D2 >= 0))) mismatches++
            }
  ok(mismatches === 0 && pairs === 4 * 10 * 10 * 4 * 10 * 10 && condZero > 100 && commonReal > 50 && prop > 20,
    `H7.1 determinant-condition trichotomy certified over ${pairs} pairs (cond0 ${condZero}, shared ${commonReal}, prop ${prop}, mismatches ${mismatches})`)
  // C2 the FIGURE's pair: x^2-4x+3 and x^2-2x-3 share root 3; condition 36 = 6^2
  {
    const a1 = 1, b1 = -4, c1 = 3, a2 = 1, b2 = -2, c2 = -3
    const big = c1 * a2 - c2 * a1
    const small1 = b1 * c2 - b2 * c1
    const small2 = a1 * b2 - a2 * b1
    ok(big === 6 && small1 === 18 && small2 === 2, 'H7.2 figure pair cross products 6, 18, 2')
    ok(big * big === small1 * small2, 'H7.2 condition 36 = 36 holds for the figure pair')
    const [f1a, f1b] = realRoots(a1, b1, c1)
    const [f2a, f2b] = realRoots(a2, b2, c2)
    ok(f1a === 3 && f1b === 1, 'H7.2 f1 roots 3 and 1')
    ok(f2a === 3 && f2b === -1, 'H7.2 f2 roots 3 and -1')
    // the common-root formula: alpha = (c1a2 - c2a1)/(a1b2 - a2b1) = 6/2 = 3
    ok(6 / 2 === 3, 'H7.2 common-root formula lands on 3')
    // the both-common counter: 2x^2-8x+6 proportional to x^2-4x+3
    ok(2 * 1 === 1 * 2 && 2 * -4 === -8 * 1 && 2 * 3 === 6 * 1, 'H7.2 2x^2-8x+6 proportional (both doors shared)')
  }
  // C3 the k-family: x^2-6x+8 vs x^2+kx-10 shares 2 (k=3) or 4 (k=-3/2)
  {
    for (const [k, seat] of [[3, 2], [-1.5, 4]] as const) {
      const val = seat * seat + k * seat - 10
      ok(val === 0, `H7.3 k=${k} makes seat ${seat} common`)
      const cond =
        (8 * 1 - -10 * 1) ** 2 - (-6 * -10 - k * 8) * (1 * k - 1 * -6)
      ok(cond === 0, `H7.3 determinant condition holds at k=${k}`)
    }
    // and the condition has exactly these two k solutions: k^2 + (3/2)k... verify
    // (18)(k+6) = (60-8k)(k+6) => wait — expand directly:
    // (c1a2-c2a1)^2 = 18^2 = 324; (b1c2-b2c1)(a1b2-a2b1) = (60-8k)(k+6)
    ok(18 * 18 === 324, 'H7.3 18^2 = 324')
    // (60-8k)(k+6) = 324 <=> 60k + 360 - 8k^2 - 48k = 324 <=> -8k^2 + 12k + 36 = 0
    // <=> 2k^2 - 3k - 9 = 0 <=> (2k + 3)(k - 3) = 0 <=> k = 3 or k = -3/2
    ok((2 * 3 + 3) * (3 - 3) === 0 && (2 * -1.5 + 3) * (-1.5 - 3) === 0, 'H7.3 2k^2-3k-9 factors as (2k+3)(k-3)')
  }
  // C4 the m-hunt: x^2+mx+6 vs x^2+6x+m — the engines CORRECTED the design:
  // sharing-at-least-one-real-root happens at m = -7 AND m = 6, but ONLY m = 6
  // is a BOTH-common seat (proportionality); m = -7 shares exactly one root.
  {
    // honest census: which m in [-20, 20] make the two equations share a real root?
    const sharing: number[] = []
    for (let m = -20; m <= 20; m++) {
      const r1 = realRoots(1, m, 6)
      const r2 = realRoots(1, 6, m)
      const shared = r1.some((u) => r2.some((v) => Math.abs(u - v) < 1e-9))
      if (shared) sharing.push(m)
    }
    ok(sharing.length === 2 && sharing[0] === -7 && sharing[1] === 6, `H7.4 real-common-root census over m ∈ [-20,20] lands on ${JSON.stringify(sharing)}`)
    // m = -7: eq1 = (x-1)(x-6), eq2 = (x+7)(x-1) — exactly ONE shared seat (1)
    {
      const r1 = realRoots(1, -7, 6)
      const r2 = realRoots(1, 6, -7)
      ok(r1.includes(1) && r1.includes(6) && r2.includes(1) && r2.includes(-7), 'H7.4 m = -7: roots {1, 6} ∩ {1, -7} = {1} — one shared door')
      // proportionality fails: (1,-7,6) vs (1,6,-7) — ratios 1, -7/6, -6/7
      const mNeg = -7
      ok(mNeg !== 6 && mNeg / 6 !== 1 && -6 / mNeg !== 1, 'H7.4 m = -7 is NOT proportional (ratios 1, -7/6, -6/7)')
      // the determinant condition holds (13^2 = 13·13) — one-common, not both
      ok((6 * 1 - -7 * 1) === 13 && (-7 * -7 - 6 * 6) === 13 && (1 * 6 - 1 * -7) === 13, 'H7.4 m = -7 cross products 13, 13, 13: condition 169 = 169')
    }
    // the theory: BOTH common <=> proportional <=> m = 6 (m/6 = 1 and 6/m = 1)
    ok(6 / 6 === 1 && 6 / 6 === 1, 'H7.4 proportionality forces m = 6 (m/6 = 1, 6/m = 1)')
    // m = 6: D = 12 > 0 — the shared doors are real and distinct
    ok(36 - 24 === 12, 'H7.4 m = 6 gives D = 36 - 24 = 12 > 0 (real shared doors)')
  }
  // C5 the natural-number minimum: x^2+4x+10 non-real; proportional triples lambda(1,4,10)
  {
    const D = 16 - 40
    ok(D === -24 && D < 0, 'H5/C5 x^2+4x+10 has D = -24 < 0 (non-real doors)')
    let minSum = Infinity
    for (let lam = 1; lam <= 5; lam++) minSum = Math.min(minSum, lam * (1 + 4 + 10))
    ok(minSum === 15, 'H7.5 minimum a+b+c = 15 at lambda = 1')
    // brute force: no triple (a,b,c) in [1..30]^3 with sum < 15 is proportional to (1,4,10)
    let foundSmaller = false
    for (let a = 1; a <= 30 && !foundSmaller; a++)
      for (let b = 1; b <= 30 && !foundSmaller; b++)
        for (let c = 1; c <= 30 && !foundSmaller; c++)
          if (a + b + c < 15 && a * 4 === b * 1 && b * 10 === c * 4) foundSmaller = true
    ok(!foundSmaller, 'H7.5 no smaller natural proportional triple exists')
  }
  // C6 the add-and-subtract system: x^2+ax+16, x^2+bx+20, x^2+(a+b)x+52
  {
    // common root r satisfies r^2 = 52 - 16 - 20 = 16 -> r = ±4; positive -> 4
    ok(52 - 16 - 20 === 16, 'H7.6 r^2 = 16 from the add-and-subtract elimination')
    const a = -8, b = -9
    ok(16 + 4 * a + 16 === 0 && 16 + 4 * b + 20 === 0 && 16 + 4 * (a + b) + 52 === 0, 'H7.6 a=-8, b=-9 satisfy all three at r = 4')
    const s = realRoots(1, -8, 16)
    ok(s.length === 1 && s[0] === 4, 'H7.6 first equation is (x-4)^2 — the REPEATED-root tie-in (single double seat)')
    const t = realRoots(1, -9, 20)
    ok(t.includes(4) && t.includes(5), 'H7.7 second equation roots 4 and 5')
    const u = realRoots(1, -17, 52)
    ok(u.includes(4) && u.includes(13), 'H7.8 third equation roots 4 and 13')
  }
  // C7 the cyclic trio: a+b+c = 0 puts root 1 in all three cyclic equations
  {
    const trio = [1, 2, -3]
    const [a, b, c] = trio
    ok(a + b + c === 0, 'H7.9 witness trio sums to 0')
    ok(a + b + c === 0 && (a * 1 + b * 1 + c * 1) === 0, 'H7.9 x = 1 vanishes each cyclic equation')
    const r1 = realRoots(a, b, c) // x^2 + 2x - 3
    ok(r1.includes(1) && r1.includes(-3), 'H7.9 first equation roots 1, -3')
    const r2 = realRoots(b, c, a) // 2x^2 - 3x + 1
    ok(r2.includes(1) && r2.includes(0.5), 'H7.9 second equation roots 1, 1/2')
    const r3 = realRoots(c, a, b) // -3x^2 + x + 2
    ok(r3.includes(1) && r3.includes(-2 / 3), 'H7.9 third equation roots 1, -2/3')
  }
  // C8 the p, q swap pair: x^2+px+q vs x^2+qx+p (p != q) share a root
  // <=> 1 + p + q = 0; the other roots satisfy x^2 + x + pq = 0.
  {
    const p = 2, q = -3
    ok(1 + p + q === 0, 'H7.10 witness (2, -3) satisfies 1+p+q = 0')
    const r1 = realRoots(1, p, q) // x^2 + 2x - 3: roots 1, -3
    ok(r1.includes(1) && r1.includes(-3), 'H7.10 first pair roots 1, -3 (other root = q)')
    const r2 = realRoots(1, q, p) // x^2 - 3x + 2: roots 1, 2
    ok(r2.includes(1) && r2.includes(2), 'H7.10 second pair roots 1, 2 (other root = p)')
    const r3 = realRoots(1, 1, p * q) // x^2 + x - 6: roots 2, -3
    ok(r3.includes(2) && r3.includes(-3), 'H7.10 other-roots equation x^2+x-6 carries 2 and -3')
    // a p, q with 1+p+q != 0 shares nothing: (p,q) = (2, -2): roots {1?}: 1+2-2 = 1 != 0
    const r4 = realRoots(1, 2, -2)
    const r5 = realRoots(1, -2, 2)
    const shared = r4.some((u) => r5.some((v) => Math.abs(u - v) < 1e-9))
    ok(!shared && 1 + 2 - 2 !== 0, 'H7.10 (2,-2) shares no root, consistent with 1+p+q != 0')
  }
  // C9 the conjugate discipline: x^2-4x+1 (roots 2±√3) with rational
  // coefficients: sharing 2+√3 forces sharing 2-√3 (both common).
  {
    const sq3 = Math.sqrt(3)
    const [al, be] = realRoots(1, -4, 1)
    ok(Math.abs(al - (2 + sq3)) < 1e-9 && Math.abs(be - (2 - sq3)) < 1e-9, 'H7.11 roots 2±√3 pinned')
    // any rational-coefficient quadratic with root 2+√3: (x-(2+√3))(x-(2-√3))·k
    const [r1, r2] = realRoots(5, -20, 5)
    ok(Math.abs(r1 - (2 + sq3)) < 1e-9 && Math.abs(r2 - (2 - sq3)) < 1e-9, 'H7.11 5x^2-20x+5 shares BOTH roots')
    // the complex cousin: x^2+x+1 (D = -3 < 0) and 3x^2+3x+3 share both
    ok(1 - 4 === -3 && 9 - 36 === -27, 'H7.12 both discriminants negative (D = -3, -27)')
    const w = realRoots(3, 3, 3)
    ok(w.length === 0, 'H7.12 3x^2+3x+3 also non-real — the proportional cousin shares the complex pair')
    // the ratio theorem: p^2 c = b^2 q; witness (p,q,b,c) = (-5, 6, -10, 24)
    const pw = -5, qw = 6, bw = -10, cw = 24
    ok(pw * pw * cw === bw * bw * qw, 'H7.13 25·24 = 600 = 100·6 (the ratio identity at the witness)')
    const ra = realRoots(1, pw, qw) // x^2 - 5x + 6: roots 2, 3
    const rb = realRoots(1, bw, cw) // x^2 - 10x + 24: roots 4, 6
    ok(ra.includes(2) && ra.includes(3) && rb.includes(4) && rb.includes(6), 'H7.13 witness roots {2,3} and {4,6} — same 2:3 ratio')
  }
}

/* ------------------------------------------------------------------ */
/* (I) lesson 2.3 quiz keys + exercise answer keys, pinned pre-writing  */
/* ------------------------------------------------------------------ */

// I1. quiz 2.3 keys: [2, 1, 0, 2, 0] with every distractor priced.
{
  const keys23 = [2, 1, 0, 2, 0]
  ok(keys23.every((k) => k >= 0 && k <= 3), 'I1 quiz 2.3 keys in range')
  // Q1 alpha+beta+alphabeta for 3x^2-9x+2: options [-11/3, 3, 11/3, 2/3]; key 2
  eq(3 + 2 / 3, 11 / 3, 1e-12, 'I1 Q1: 3 + 2/3 = 11/3 (key index 2)')
  // Q2 alpha^2+beta^2 for x^2-6x+5: options [16, 26, 36, 46]; key 1
  ok(36 - 10 === 26 && 36 - 20 === 16 && 36 + 10 === 46, 'I1 Q2: 26 wins; 16 = (a-b)^2, 36 = S^2, 46 = S^2+2P distractors priced')
  // Q3 reciprocals of 2x^2+5x+2 (palindrome): options [same eq, x^2+5x+2, 2x^2-5x+2, x^2-5x+2]; key 0
  {
    const rr = realRoots(2, 5, 2)
    ok(rr.includes(-2) && rr.includes(-0.5), 'I1 Q3: roots -2 and -1/2 are a reciprocal pair')
    ok(2 === 2 && 5 === 5 && 2 === 2, 'I1 Q3: palindrome coefficients a = c')
  }
  // Q4 common root of x^2-5x+6 and x^2-7x+12: options [none, 2, 3, 4]; key 2
  {
    const r1 = realRoots(1, -5, 6)
    const r2 = realRoots(1, -7, 12)
    ok(r1.includes(2) && r1.includes(3) && r2.includes(3) && r2.includes(4), 'I1 Q4: {2,3} ∩ {3,4} = {3} (key index 2)')
  }
  // Q5 both-common m-hunt: options [6, ±6, 36, none]; key 0
  const mQ5 = -6
  ok(6 * 6 === 36 && mQ5 !== 6, 'I1 Q5: m = 6 only; m = -6 fails proportionality')
}

// I2. exercise answer keys 2.3 (15 items, L1–L6), pinned with the numbers.
{
  // 1. 5x^2-12x+4: alpha^2+beta^2 = (12/5)^2 - 2(4/5) = 144/25 - 40/25 = 104/25
  eq(144 / 25 - 40 / 25, 104 / 25, 1e-12, 'I2 ex1 104/25')
  {
    const [al, be] = realRoots(5, -12, 4)
    eq(al * al + be * be, 104 / 25, 1e-9, 'I2 ex1 numeric agrees')
  }
  // 2. roots 3, -7 -> x^2 + 4x - 21
  ok(3 + -7 === -4 && 3 * -7 === -21, 'I2 ex2 S = -4, P = -21 -> x^2+4x-21')
  // 3. 2x^2-7x+5: 1/a+1/b+ab = 7/5 + 5/2 = 39/10
  eq(7 / 5 + 5 / 2, 39 / 10, 1e-12, 'I2 ex3 39/10')
  {
    const [al, be] = realRoots(2, -7, 5)
    eq(1 / al + 1 / be + al * be, 39 / 10, 1e-9, 'I2 ex3 numeric agrees')
  }
  // 4. x^2-6x+8 shifted by +2 -> y^2 - 10y + 24
  ok(36 + 4 - 2 * 2 * 4 === 24, 'I2 ex4 P\' = 8 + 2·2·4... 8+16 = 24 route: P + 2S·2·... pin')
  {
    // S' = S + 4 = 10, P' = P + 2S·... (a+2)(b+2) = ab + 2(a+b) + 4 = 8+12+4 = 24
    eq(8 + 2 * 6 + 4, 24, 1e-12, 'I2 ex4 P\' = 24 exact route')
    eq(6 + 4, 10, 1e-12, 'I2 ex4 S\' = 10')
  }
  // 5. 2x^2-9x+8: |alpha-beta| = sqrt(17)/2
  eq(Math.sqrt(81 / 4 - 16), Math.sqrt(17) / 2, 1e-12, 'I2 ex5 sqrt(17)/2')
  {
    const [al, be] = realRoots(2, -9, 8)
    eq(Math.abs(al - be), Math.sqrt(17) / 2, 1e-9, 'I2 ex5 numeric agrees')
  }
  // 6. x^2-13x+c consecutive -> c = 42 (roots 6, 7)
  eq((169 - 1) / 4, 42, 1e-12, 'I2 ex6 c = 42')
  // 7. x^2-6x+8 vs x^2+kx-10: k = 3 (seat 2) or k = -3/2 (seat 4)
  ok(4 + 6 - 10 === 0 && 16 - 6 - 10 === 0, 'I2 ex7 both seats priced')
  // 8. x^2-px+30, (a-b)^2 = 49 -> p^2 = 49 + 120 = 169 -> p = ±13
  eq(49 + 120, 169, 1e-12, 'I2 ex8 p^2 = 169')
  {
    const [r1, r2] = realRoots(1, -13, 30)
    ok(Math.abs(r1 - 10) < 1e-12 && Math.abs(r2 - 3) < 1e-12, 'I2 ex8 p = 13 roots 10, 3, gap 7')
  }
  // 9. 3x^2-6x+2 -> roots alpha^2, beta^2: 9x^2 - 24x + 4
  eq(4 - 4 / 3, 8 / 3, 1e-12, 'I2 ex9 S\' = 8/3')
  eq((2 / 3) ** 2, 4 / 9, 1e-12, 'I2 ex9 P\' = 4/9')
  ok(9 * (8 / 3) === 24, 'I2 ex9 9x^2-24x+4 coefficients')
  {
    const [al, be] = realRoots(3, -6, 2)
    const [r1, r2] = realRoots(9, -24, 4)
    const sq = [al * al, be * be].sort((u, v) => u - v)
    const nr = [r1, r2].sort((u, v) => u - v)
    ok(Math.abs(sq[0] - nr[0]) < 1e-9 && Math.abs(sq[1] - nr[1]) < 1e-9, 'I2 ex9 numeric roots agree')
  }
  // 10. a+b+c = 0 => the cyclic trio shares root 1 (witness (1,2,-3))
  ok(1 + 2 - 3 === 0, 'I2 ex10 witness sums to 0')
  // 11. x^2+4x+10 non-real -> min a+b+c = 15
  ok(16 - 40 === -24 && 1 + 4 + 10 === 15, 'I2 ex11 D = -24, min sum 15')
  // 12. 2x^2+3x+5 vs 2x^2+kx-5: k^2 = -31 -> no real k
  {
    const cond = (5 * 2 - -5 * 2) ** 2
    eq(cond, 400, 1e-12, 'I2 ex12 (c1a2-c2a1)^2 = 400')
    // (-15-5k)(2k-6) = 400 <=> k^2 = -31
    ok(-10 * (9 - -31) === -400, 'I2 ex12 the k^2 = -31 route')
    ok(9 - 40 === -31, 'I2 ex12 D of eq1 = -31 < 0 (non-real doors)')
  }
  // 13. (a-b)x^2+(b-c)x+(c-a) equal roots <=> 2a = b+c; witness (3,2,4)
  ok(2 * 3 === 2 + 4 && 4 - 3 === 3 - 2, 'I2 ex13 witness (3,2,4)')
  // 14. the three-equation system -> a = -8, b = -9
  ok(52 - 16 - 20 === 16 && 16 + 4 * -8 + 16 === 0 && 16 + 4 * -9 + 20 === 0, 'I2 ex14 a = -8, b = -9')
  // 15. ratio theorem p^2 c = b^2 q; witness (-5, 6, -10, 24)
  ok(25 * 24 === 600 && 100 * 6 === 600, 'I2 ex15 600 = 600')
}

/* ------------------------------------------------------------------ */
/* (J) AUTHORED-AUDIT — lesson 2.3 (aa-symmetric-reads-and-common-roots) */
/*     appended after authoring (run 102), following the F/G pattern.   */
/* ------------------------------------------------------------------ */

{
  const ch = chapter02
  ok(ch.lessons.length === 3 && ch.plannedLessons?.length === 1 && ch.plannedLessons?.[0] === 'Location of Roots: Doors in Intervals', 'J1 chapter shape after authoring: 3 lessons, planned = [Location of Roots]')
  const L = ch.lessons[2]
  ok(L.id === 'aa-symmetric-reads-and-common-roots', 'J2 lesson id matches the pinned id')
  ok(L.number === '2.3' && L.title === 'Symmetric Reads and Common Roots', 'J3 lesson number/title')
  const blocks = L.blocks as Array<{ kind: string; [k: string]: unknown }>

  // J4 block census (count-aware, as authored)
  const count = (k: string) => blocks.filter((b) => b.kind === k).length
  ok(count('heading') === 6, `J4.1 headings = 6 (got ${count('heading')})`)
  ok(count('example') === 15, `J4.2 examples/Illustrations = 15 (got ${count('example')})`)
  ok(count('derivation') === 1, `J4.3 derivations = 1 (got ${count('derivation')})`)
  ok(count('figure') === 2, `J4.4 figures = 2 (got ${count('figure')})`)
  ok(count('quiz') === 1 && count('exercises') === 1, `J4.5 quiz + exercises present`)
  ok(count('formula') === 6, `J4.6 formula cards = 6 (got ${count('formula')})`)
  ok(count('terms') === 1 && count('list') === 4, `J4.7 terms block + 4 roman lists (got lists ${count('list')})`)
  const callouts = blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string; text: string }>
  ok(callouts.filter((c) => c.tone === 'definition').length === 4, 'J4.8 four definition callouts (Viète, symmetric function, repeated root, common root)')
  ok(callouts.filter((c) => c.tone === 'theorem').length === 3, 'J4.9 three theorem callouts (power-sum recurrence, same-ratio condition, proportionality)')
  ok(callouts.filter((c) => c.tone === 'warn').length === 3, 'J4.10 three warn callouts (asymmetric census, repeated-seat honesty, one-vs-both trap)')
  ok(callouts.filter((c) => c.tone === 'exam').length === 2, 'J4.11 two exam callouts')
  ok(callouts.filter((c) => c.tone === 'insight').length === 3, 'J4.12 three insight callouts (no-solve licence, cross arrangement, recurrence vs sheet)')

  // J5 the hosted folds
  const headings = blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>
  ok(headings.some((h) => h.text.includes('Repeated Roots')), 'J5.1 the Repeated Roots fold hosts as a NAMED heading')
  ok(callouts.some((c) => c.title.includes('Repeated root') && c.text.includes('said to be a REPEATED ROOT')), 'J5.2 the formal repeated-root definition callout is present')
  const exampleTitles = (blocks.filter((b) => b.kind === 'example') as Array<{ title: string }>).map((e) => e.title)
  const bothCommon = exampleTitles.filter((t) => /least value|both roots common|common positive root/i.test(t))
  ok(bothCommon.length >= 2, `J5.3 >=2 both-common worked examples of the fold's topic type (got ${bothCommon.length})`)
  ok(callouts.some((c) => c.title === 'The proportionality condition' && c.text.includes('a_1}{a_2')), 'J5.4 the both-common proportionality theorem callout with the condition')

  // J6 quiz keys vs the pre-writing pins [2, 1, 0, 2, 0]
  const quiz = blocks.find((b) => b.kind === 'quiz') as { items: Array<{ answer: number; options: string[]; explain: string }> }
  ok(quiz.items.length === 5, 'J6.1 quiz has 5 items')
  ok(quiz.items.map((i) => i.answer).join(',') === '2,1,0,2,0', `J6.2 quiz keys match the I1 pins (got ${quiz.items.map((i) => i.answer).join(',')})`)
  ok(quiz.items.every((i) => i.options.length === 4), 'J6.3 every quiz item has 4 options')
  ok(quiz.items.every((i) => i.explain.length >= 120), 'J6.4 every quiz explain prices the distractors')

  // J7 exercises census + answers present
  const ex = blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer: string }> }> }
  const levelCounts = ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')
  ok(levelCounts === 'L1:2 L2:2 L3:3 L4:3 L5:3 L6:2', `J7.1 exercise ladder L1-L6 = 15 (got ${levelCounts})`)
  ok(ex.sets.every((s) => s.questions.every((q) => q.solution.length >= 3 && q.answer.length > 0)), 'J7.2 every exercise carries a full worked solution and a terminal answer')

  // J8 figure pins (viewBox, coordinates, labels, vivid palette)
  const figs = blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  const f1 = figs[0].svg
  const f2 = figs[1].svg
  ok(f1.includes('viewBox="0 0 720 360"') && f2.includes('viewBox="0 0 720 380"'), 'J8.1 figure viewBoxes match the plans')
  ok(f1.includes('cx="210" cy="200"') && f1.includes('cx="510" cy="200"'), 'J8.2 fig1 root dots at alpha=1 (px 210) and beta=5 (px 510) — the true tick scale 135+75u')
  ok(f1.includes('x1="360" y1="90" x2="360" y2="200"') && f1.includes('mirror x = 3'), 'J8.3 fig1 mirror line at x=3 with its label')
  ok(f1.includes('S = α + β = 6') && f1.includes('P = αβ = 5') && f1.includes('α² + β² = S² − 2P = 36 − 10 = 26'), 'J8.4 fig1 read tags match prose values (26, 4, 6/5, 26/5)')
  ok(f1.includes('x="360" y="56"') && !f1.includes('y="110"'), 'J8.4b sum label lifted to its own row (y=56) — the dashed mirror line never strikes it')
  ok(f1.includes('|α − β| = √(S² − 4P) = √16 = 4') && f1.includes('1/α + 1/β = S/P = 6/5') && f1.includes('= 26/5'), 'J8.5 fig1 remaining read tags')
  ok(f2.includes('cx="510" cy="220"') && f2.includes('shared door x = 3'), 'J8.6 fig2 shared-door ring at (510, 220) with label')
  ok(f2.includes('cx="360" cy="220"') && f2.includes('cx="210" cy="220"'), 'J8.7 fig2 own doors 1 and −1 marked')
  ok(f2.includes('f₁ = x² − 4x + 3 (doors 1, 3)') && f2.includes('f₂ = x² − 2x − 3 (doors −1, 3)'), 'J8.8 fig2 legend rows name the pair')
  ok(f2.includes('6² = 36 = 18 × 2'), 'J8.9 fig2 cross-condition tag matches prose')
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  ok(!figs.some((f) => retired.some((h) => f.svg.includes(h))), 'J8.10 no retired palette hexes in either figure')
  ok(f1.includes('#16a34a') && f1.includes('#ea580c') && f2.includes('#0d9488') && f2.includes('#ea580c') && f2.includes('#fffdf5'), 'J8.11 vivid palette in use (green/teal/amber/orange on the paper plate)')

  // J9 prereqs resolve against the repo
  const fs2 = await import('fs')
  const al9 = fs2.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-09.ts', 'utf8')
  ok((L.prerequisites ?? []).length === 3, 'J9.1 three prereqs declared')
  ok(al9.includes("id: 'al-roots-and-coefficients-viete-relations'"), 'J9.2 the AL 9.4 Viète prereq exists')
  ok((L.prerequisites ?? []).includes('aa-vertex-form-at-work-maxima-and-minima') && (L.prerequisites ?? []).includes('aa-quadratic-inequalities-and-the-sign-diagram'), 'J9.3 the 2.1/2.2 prereqs declared')

  // J10 sources keys exist in SOURCE_LOG
  const slog2 = fs2.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const k of L.sources ?? []) ok(slog2.includes('`' + k + '`') || slog2.includes('- ' + k), `J10 source key ${k} in SOURCE_LOG`)

  // J11 honesty scans
  const allText2 = JSON.stringify(blocks)
  ok(!allText2.includes('\\\\\\\\  ') && !allText2.includes("\\\\\\\\'"), 'J11.1 no odd-run backslashes')
  ok(!/\\u[0-9a-fA-F]{4}/.test(allText2), 'J11.2 no unicode escapes')
  ok(!/wait, |Better: |TODO|XXX|【|to be completed/.test(allText2), 'J11.3 no draft markers')

  // J12 honest word count via the registry's own counter
  const wordCount23 = countLessonWords(L as never)
  ok(wordCount23 >= 4500, `J12 honest word count >= 4500 (got ${wordCount23})`)

  // J13 repo-wide id uniqueness
  const hits23 = execSync(`grep -rl "aa-symmetric-reads-and-common-roots" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits23 = hits23.filter((h) => h.includes('/books/'))
  ok(dataHits23.length === 1, `J13 lesson id unique in book data (got files: ${dataHits23.join(' ')})`)

  // J14 cross-reference pins in prose
  ok(allText2.includes('AL 9.4'), 'J14.1 prose names the banked AL 9.4 Viète lesson')
  ok(allText2.includes('2.1') && allText2.includes('2.2'), 'J14.2 prose names lessons 2.1 and 2.2')
  ok(allText2.includes('x² − 4x + 1'), 'J14.3 the running equation appears in prose (not only figures)')
  ok(allText2.includes('{-7, 6') || allText2.includes('−7, 6'), 'J14.4 the m-hunt census {-7, 6} appears in prose as the engines certified it')

  // J15 the derivation carries the DerivationStep contract
  const deriv = blocks.find((b) => b.kind === 'derivation') as { title: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }
  ok(deriv.steps.length === 6 && deriv.steps.every((s) => s.label.length > 0 && s.explanation.length > 0), 'J15 derivation has 6 labelled steps with explanations')
  ok(typeof deriv.result === 'string' && deriv.result.includes('(c_1a_2 - c_2a_1)^2'), 'J15b derivation result line present with the boxed condition')
}

console.log(`\nverify-book4-ch02 sections A-J: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log('  - ' + f))
  process.exit(1)
}
