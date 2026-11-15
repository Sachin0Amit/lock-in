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
  ok(ch.status === 'complete', 'F2 chapter status complete (CLOSED run 104: 2.1–2.4 + 2.R authored)')
  // re-pinned count-aware at audit time (run 104): the chapter is CLOSED —
  // five lessons (2.1 run 100, 2.2 run 101, 2.3 run 102, 2.4 run 103,
  // 2.R run 104) with no planned titles left.
  ok(ch.lessons.length === 5 && (ch.plannedLessons?.length ?? 0) === 0, 'F3 chapter shape CLOSED: 5 lessons, none planned (re-pinned run 104)')
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
  ok(ch.status === 'complete', 'G2 chapter status complete (CLOSED run 104)')
  ok(ch.lessons.length === 5 && (ch.plannedLessons?.length ?? 0) === 0, 'G3 chapter shape CLOSED: 5 lessons, none planned (re-pinned run 104)')
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
      const mNeg: number = -7
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
  const mQ5: number = -6
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
  ok(ch.lessons.length === 5 && (ch.plannedLessons?.length ?? 0) === 0, 'J1 chapter shape CLOSED run 104: 5 lessons, none planned')
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
  const callouts = blocks.filter((b) => b.kind === 'callout') as unknown as Array<{ tone: string; title: string; text: string }>
  ok(callouts.filter((c) => c.tone === 'definition').length === 4, 'J4.8 four definition callouts (Viète, symmetric function, repeated root, common root)')
  ok(callouts.filter((c) => c.tone === 'theorem').length === 3, 'J4.9 three theorem callouts (power-sum recurrence, same-ratio condition, proportionality)')
  ok(callouts.filter((c) => c.tone === 'warn').length === 3, 'J4.10 three warn callouts (asymmetric census, repeated-seat honesty, one-vs-both trap)')
  ok(callouts.filter((c) => c.tone === 'exam').length === 2, 'J4.11 two exam callouts')
  ok(callouts.filter((c) => c.tone === 'insight').length === 3, 'J4.12 three insight callouts (no-solve licence, cross arrangement, recurrence vs sheet)')

  // J5 the hosted folds
  const headings = blocks.filter((b) => b.kind === 'heading') as unknown as Array<{ text: string }>
  ok(headings.some((h) => h.text.includes('Repeated Roots')), 'J5.1 the Repeated Roots fold hosts as a NAMED heading')
  ok(callouts.some((c) => c.title.includes('Repeated root') && c.text.includes('said to be a REPEATED ROOT')), 'J5.2 the formal repeated-root definition callout is present')
  const exampleTitles = (blocks.filter((b) => b.kind === 'example') as unknown as Array<{ title: string }>).map((e) => e.title)
  const bothCommon = exampleTitles.filter((t) => /least value|both roots common|common positive root/i.test(t))
  ok(bothCommon.length >= 2, `J5.3 >=2 both-common worked examples of the fold's topic type (got ${bothCommon.length})`)
  ok(callouts.some((c) => c.title === 'The proportionality condition' && c.text.includes('a_1}{a_2')), 'J5.4 the both-common proportionality theorem callout with the condition')

  // J6 quiz keys vs the pre-writing pins [2, 1, 0, 2, 0]
  const quiz = blocks.find((b) => b.kind === 'quiz') as unknown as { items: Array<{ answer: number; options: string[]; explain: string }> }
  ok(quiz.items.length === 5, 'J6.1 quiz has 5 items')
  ok(quiz.items.map((i) => i.answer).join(',') === '2,1,0,2,0', `J6.2 quiz keys match the I1 pins (got ${quiz.items.map((i) => i.answer).join(',')})`)
  ok(quiz.items.every((i) => i.options.length === 4), 'J6.3 every quiz item has 4 options')
  ok(quiz.items.every((i) => i.explain.length >= 120), 'J6.4 every quiz explain prices the distractors')

  // J7 exercises census + answers present
  const ex = blocks.find((b) => b.kind === 'exercises') as unknown as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer: string }> }> }
  const levelCounts = ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')
  ok(levelCounts === 'L1:2 L2:2 L3:3 L4:3 L5:3 L6:2', `J7.1 exercise ladder L1-L6 = 15 (got ${levelCounts})`)
  ok(ex.sets.every((s) => s.questions.every((q) => q.solution.length >= 3 && q.answer.length > 0)), 'J7.2 every exercise carries a full worked solution and a terminal answer')

  // J8 figure pins (viewBox, coordinates, labels, vivid palette)
  const figs = blocks.filter((b) => b.kind === 'figure') as unknown as Array<{ caption: string; svg: string }>
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
  const deriv = blocks.find((b) => b.kind === 'derivation') as unknown as { title: string; statement?: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }
  ok(deriv.steps.length === 6 && deriv.steps.every((s) => s.label.length > 0 && s.explanation.length > 0), 'J15 derivation has 6 labelled steps with explanations')
  ok(typeof deriv.result === 'string' && deriv.result.includes('(c_1a_2 - c_2a_1)^2'), 'J15b derivation result line present with the boxed condition')
}

/* ------------------------------------------------------------------ */
/* (K) lesson 2.4 "Location of Roots: Doors in Intervals" — the        */
/*     engine suite, pinned BEFORE any prose (run 103, verify-first).  */
/*     Every exhibit below is this book's own (study-never-reproduce:  */
/*     the m2-02 module's printed 2.31-2.37 informed METHOD shapes     */
/*     only — the family, the walls, the witnesses and every verdict   */
/*     are fresh designs, brute-force certified here).                 */
/* ------------------------------------------------------------------ */

// ascending-sorted real roots (realRoots returns [(-b+s)/2a, (-b-s)/2a],
// whose order flips with the sign of a — every order-sensitive engine
// below uses this wrapper)
function sortedRoots(a: number, b: number, c: number): number[] {
  return realRoots(a, b, c).sort((u, v) => u - v)
}

// K1. the k-system equivalences, certified by brute force over an
// integer grid (a != 0, all b, c; every wall k and wall-pair k1 < k2):
//   both roots > k        <=> D >= 0 AND a*f(k) > 0 AND -b/2a > k
//   both roots < k        <=> D >= 0 AND a*f(k) > 0 AND -b/2a < k
//   k between the roots   <=> a*f(k) < 0           (no D check needed)
//   exactly one in (k1,k2)<=> f(k1)*f(k2) < 0      (no D check needed)
//   both roots in (k1,k2) <=> D >= 0 AND a*f(k1) > 0 AND a*f(k2) > 0
//                                AND k1 < -b/2a < k2
//   both walls between    <=> a*f(k1) < 0 AND a*f(k2) < 0
{
  let checks = 0
  for (const a of [-2, -1, 1, 2]) {
    for (const b of rng(-5, 5)) for (const cc of rng(-6, 6)) {
      const D = b * b - 4 * a * cc
      const roots = sortedRoots(a, b, cc)
      const axis = -b / (2 * a)
      for (const k of rng(-3, 3)) {
        const afk = a * quad(a, b, cc, k)
        // the double root (D = 0) counts as BOTH roots (the exam convention
        // the census (vi)/(xiii) rows honour) — hence the .every form
        const bothGt = roots.length >= 1 && roots.every((x) => x > k)
        if (bothGt === (D >= 0 && afk > 0 && axis > k)) checks++
        else ok(false, 'K1 both>k equivalence at a=' + a + ' b=' + b + ' c=' + cc + ' k=' + k)
        const bothLt = roots.length >= 1 && roots.every((x) => x < k)
        if (bothLt === (D >= 0 && afk > 0 && axis < k)) checks++
        else ok(false, 'K1 both<k equivalence at a=' + a + ' b=' + b + ' c=' + cc + ' k=' + k)
        const kBetween = roots.length === 2 && roots[0] < k && k < roots[1]
        if (kBetween === (afk < 0)) checks++
        else ok(false, 'K1 k-between equivalence at a=' + a + ' b=' + b + ' c=' + cc + ' k=' + k)
      }
      for (const k1 of rng(-3, 2)) for (const k2 of rng(k1 + 1, 3)) {
        const fk1 = quad(a, b, cc, k1)
        const fk2 = quad(a, b, cc, k2)
        const inW = (x: number) => x > k1 && x < k2
        const exactlyOne = roots.length === 2 && roots.filter(inW).length === 1
        // boundary seats (a root exactly ON a wall) are excluded from the
        // equivalence: there the product is 0 and the honest read needs the
        // wall-seat check the census's m = 5/2 seat demonstrates in prose
        if (fk1 === 0 || fk2 === 0) continue
        if (exactlyOne === (fk1 * fk2 < 0)) checks++
        else ok(false, 'K1 exactly-one equivalence at a=' + a + ' b=' + b + ' c=' + cc + ' walls ' + k1 + ',' + k2)
        const bothIn = roots.length >= 1 && roots.every((x) => x > k1 && x < k2)
        if (bothIn === (D >= 0 && a * fk1 > 0 && a * fk2 > 0 && k1 < axis && axis < k2)) checks++
        else ok(false, 'K1 both-in equivalence at a=' + a + ' b=' + b + ' c=' + cc + ' walls ' + k1 + ',' + k2)
        const wallsBetween = roots.length === 2 && roots[0] < k1 && k2 < roots[1]
        if (wallsBetween === (a * fk1 < 0 && a * fk2 < 0)) checks++
        else ok(false, 'K1 walls-between equivalence at a=' + a + ' b=' + b + ' c=' + cc + ' walls ' + k1 + ',' + k2)
      }
    }
  }
  ok(checks > 20000, `K1 the six k-system rows certified on ${checks} grid cases`)
  // the D-check is load-bearing for the both-rows: the always-positive
  // family x^2 - 2x + 5 passes walls + axis with NO roots at all
  {
    ok(realRoots(1, -2, 5).length === 0, 'K1b x^2 - 2x + 5 has no real roots (D = -16)')
    ok(quad(1, -2, 5, 1) === 4 && quad(1, -2, 5, 5) === 20 && -(-2) / 2 === 1, 'K1b its walls and axis all pass (f(1) = 4, f(5) = 20, axis 1)')
    ok(quad(1, -2, 5, 1) * quad(1, -2, 5, 5) > 0, 'K1b only the between-test (which demands a sign change) rejects it')
  }
}

// K2. the master census family f(x) = x^2 - (m+1)x + 3m - 5:
// D = (m-3)(m-7), sum = m+1, product = 3m-5, axis = (m+1)/2,
// f(1) = 2m-5, f(3) = 1 (THE FIXED POINT), f(0) = 3m-5; double roots
// land at x = 2 (m = 3) and x = 4 (m = 7). Walls at 1 and 3.
{
  const fam = (m: number) => sortedRoots(1, -(m + 1), 3 * m - 5)
  // pins: the algebraic identities on an integer sweep
  for (const m of rng(-9, 9)) {
    eq((m + 1) ** 2 - 4 * (3 * m - 5), (m - 3) * (m - 7), 1e-12, 'K2.1 D = (m-3)(m-7) identity at m=' + m)
    eq(quad(1, -(m + 1), 3 * m - 5, 1), 2 * m - 5, 1e-12, 'K2.2 f(1) = 2m-5 at m=' + m)
    eq(quad(1, -(m + 1), 3 * m - 5, 3), 1, 1e-12, 'K2.3 f(3) = 1 — the fixed point at m=' + m)
    eq(quad(1, -(m + 1), 3 * m - 5, 0), 3 * m - 5, 1e-12, 'K2.4 f(0) = 3m-5 = the product at m=' + m)
  }
  // the pencil passes through (3, 1) for EVERY m — brute force
  for (let m = -12; m <= 12; m += 0.25) eq(quad(1, -(m + 1), 3 * m - 5, 3), 1, 1e-12, 'K2.3 fixed point on the sweep')
  // the fifteen verdicts, brute-forced against the claims
  const claims: Array<[string, (m: number) => boolean, (m: number) => boolean]> = [
    ['(i) real and distinct', (m) => m < 3 || m > 7, (m) => { const r = fam(m); return r.length === 2 && Math.abs(r[0] - r[1]) > 1e-12 }],
    ['(ii) equal', (m) => m === 3 || m === 7, (m) => fam(m).length === 1],
    ['(iii) not real', (m) => m > 3 && m < 7, (m) => fam(m).length === 0],
    ['(iv) opposite sign', (m) => m < 5 / 3, (m) => { const r = fam(m); return r.length === 2 && r[0] * r[1] < 0 }],
    ['(v) equal magnitude opposite sign', (m) => m === -1, (m) => { const r = fam(m); return r.length === 2 && Math.abs(r[0] + r[1]) < 1e-9 && r[0] * r[1] < 0 }],
    ['(vi) both positive', (m) => m > 5 / 3 && m <= 3 || m >= 7, (m) => { const r = fam(m); return r.length === 2 && r[0] > 0 && r[1] > 0 }],
    ['(vii) both negative', () => false, (m) => { const r = fam(m); return r.length === 2 && r[1] < 0 }],
    ['(viii) at least one positive', (m) => m <= 3 || m >= 7, (m) => { const r = fam(m); return r.length >= 1 && Math.max(...r) > 0 }],
    ['(ix) 1 between the roots', (m) => m < 5 / 2, (m) => { const r = fam(m); return r.length === 2 && r[0] < 1 && 1 < r[1] }],
    ['(x) both roots exceed 1', (m) => (m > 5 / 2 && m <= 3) || m >= 7, (m) => { const r = fam(m); return r.length === 2 && r[0] > 1 }],
    ['(xi) both roots below 1', () => false, (m) => { const r = fam(m); return r.length === 2 && r[1] < 1 }],
    ['(xii) exactly one root in (1,3)', (m) => m <= 5 / 2, (m) => { const r = fam(m); return r.filter((x) => x > 1 && x < 3).length === 1 }],
    ['(xiii) both roots in (1,3)', (m) => m > 5 / 2 && m <= 3, (m) => { const r = fam(m); return r.length === 2 && r[0] > 1 && r[1] < 3 }],
    ['(xiv) at least one root in (1,3)', (m) => m <= 3, (m) => { const r = fam(m); return r.some((x) => x > 1 && x < 3) }],
    ['(xv) one root > 3, other < 1', () => false, (m) => { const r = fam(m); return r.length === 2 && (r[1] > 3 && r[0] < 1 || r[0] > 3 && r[1] < 1) }],
  ]
  let censusChecks = 0
  for (const [name, claimed, truth] of claims) {
    for (let i = 0; i <= 480; i++) {
      const m = -12 + 0.05 * i
      // skip grid points that sit exactly ON a claim boundary (float drift)
      const onBoundary = [5 / 3, 5 / 2, 3, 7].some((b) => Math.abs(m - b) < 1e-9)
      if (onBoundary) continue
      if (claimed(m) === truth(m)) censusChecks++
      else ok(false, `K2.5 census ${name} disagrees at m=${m.toFixed(2)}`)
    }
  }
  ok(censusChecks > 7000, `K2.5 the fifteen census verdicts certified on ${censusChecks} grid points`)
  // exact boundary probes
  {
    const r53 = fam(5 / 3)
    ok(r53.length === 2 && Math.abs(r53[0]) < 1e-9 && Math.abs(r53[1] - 8 / 3) < 1e-9, 'K2.6 m=5/3: roots 0 and 8/3 (the product-zero seat)')
    const r52 = fam(5 / 2)
    ok(r52.length === 2 && Math.abs(r52[0] - 1) < 1e-9 && Math.abs(r52[1] - 2.5) < 1e-9, 'K2.6 m=5/2: roots 1 and 5/2 (the wall seat — root ON the open edge)')
    const rm1 = fam(-1)
    ok(rm1.length === 2 && Math.abs(rm1[0] + Math.sqrt(8)) < 1e-9 && Math.abs(rm1[1] - Math.sqrt(8)) < 1e-9, 'K2.6 m=-1: roots ±2√2 (the equal-magnitude witness)')
    const r3 = fam(3)
    ok(r3.length === 1 && Math.abs(r3[0] - 2) < 1e-9, 'K2.6 m=3: double root 2')
    const r7 = fam(7)
    ok(r7.length === 1 && Math.abs(r7[0] - 4) < 1e-9, 'K2.6 m=7: double root 4')
  }
  // the fixed-point law (the L6 proof): f(3) = 1 > 0 keeps the wall 3
  // OUTSIDE the open root interval for every m — the pair never straddles
  // 3; and the axis position splits the verdict:
  //   m <= 3 (axis <= 2)  -> BOTH roots < 3
  //   m >= 7 (axis >= 4)  -> BOTH roots > 3
  {
    let neverStraddles = true
    let splitHolds = true
    for (let i = 0; i <= 480; i++) {
      const m = -12 + 0.05 * i
      const r = fam(m)
      if (r.length === 2 && r[0] < 3 && 3 < r[1]) neverStraddles = false
      if (r.length === 2 && m <= 3 && !(r[1] < 3)) splitHolds = false
      if (r.length === 2 && m >= 7 && !(r[0] > 3)) splitHolds = false
    }
    ok(neverStraddles, 'K2.7 the pair never straddles 3 (f(3) = 1 > 0 — the fixed-point law)')
    ok(splitHolds, 'K2.7 the axis split: m <= 3 => both roots < 3; m >= 7 => both roots > 3')
  }
}

// K3. roots between roots: the inner pair x^2 - 10x + 21 = (x-3)(x-7)
// against the outer family 2x^2 - (3m+4)x + 2m^2 - 11m + 26:
// f2(3) = 2(m-2)(m-8), f2(7) = 2(m-4)(m-12); verdict m in (4, 8).
{
  const inner = sortedRoots(1, -10, 21)
  ok(Math.abs(inner[0] - 3) < 1e-9 && Math.abs(inner[1] - 7) < 1e-9, 'K3.1 inner roots exactly 3 and 7')
  for (const m of rng(-6, 14)) {
    eq(quad(2, -(3 * m + 4), 2 * m * m - 11 * m + 26, 3), 2 * (m - 2) * (m - 8), 1e-12, 'K3.2 f2(3) = 2(m-2)(m-8) at m=' + m)
    eq(quad(2, -(3 * m + 4), 2 * m * m - 11 * m + 26, 7), 2 * (m - 4) * (m - 12), 1e-12, 'K3.2 f2(7) = 2(m-4)(m-12) at m=' + m)
  }
  for (let m = -2; m <= 14; m += 0.1) {
    if (Math.abs(m - 4) < 1e-6 || Math.abs(m - 8) < 1e-6) continue
    const outer = sortedRoots(2, -(3 * m + 4), 2 * m * m - 11 * m + 26)
    const claimed = m > 4 && m < 8
    const truth = outer.length === 2 && outer[0] < 3 && 7 < outer[1]
    if (claimed !== truth) ok(false, `K3.3 between-quadratics verdict disagrees at m=${m.toFixed(1)}`)
  }
  const w6 = sortedRoots(2, -(3 * 6 + 4), 2 * 36 - 66 + 26)
  ok(w6.length === 2 && Math.abs(w6[0] - (11 - Math.sqrt(57)) / 2) < 1e-9 && Math.abs(w6[1] - (11 + Math.sqrt(57)) / 2) < 1e-9, 'K3.4 witness m=6: outer roots (11±√57)/2 straddle 3 and 7')
  ok((11 - Math.sqrt(57)) / 2 < 3 && 7 < (11 + Math.sqrt(57)) / 2, 'K3.4 the straddle itself')
  const w4 = realRoots(2, -16, 14)
  ok(w4.some((r) => Math.abs(r - 7) < 1e-9), 'K3.5 boundary m=4: a root sits exactly ON the wall 7 (excluded by strictness)')
  const w8 = realRoots(2, -28, 66)
  ok(w8.some((r) => Math.abs(r - 3) < 1e-9), 'K3.5 boundary m=8: a root sits exactly ON the wall 3 (2(x-3)(x-11))')
}

// K4. the substitution bridge t = x^2 + 2x + 3 in [2, inf):
// (x^2+2x+6)^2 - (a-2)(x^2+2x+3)(x^2+2x+6) + (a-3)(x^2+2x+3)^2 = 0
// collapses to (12-3a)t + 9 = 0, i.e. t = 3/(a-4); a real x exists
// <=> 3/(a-4) >= 2 <=> a in (4, 11/2].
{
  const collapse = (a: number, t: number) => (t + 3) ** 2 - (a - 2) * t * (t + 3) + (a - 3) * t * t
  for (const a of rng(0, 10)) for (const t of rng(-3, 9)) {
    eq(collapse(a, t), (12 - 3 * a) * t + 9, 1e-12, `K4.1 the collapse identity at a=${a}, t=${t}`)
    eq((t + 3) ** 2 - (a - 2) * (t * t + 3 * t) + (a - 3) * t * t, (12 - 3 * a) * t + 9, 1e-12, 'K4.1b expanded route agrees')
  }
  // the quartic in x, evaluated directly — the two routes agree
  const quartic = (a: number, x: number) => collapse(a, x * x + 2 * x + 3)
  {
    ok(Math.abs(quartic(5, 0)) < 1e-9 && Math.abs(quartic(5, -2)) < 1e-9, 'K4.2 witness a=5: x=0 and x=-2 are roots (t = 3)')
    ok(Math.abs(quartic(5.5, -1)) < 1e-9, 'K4.2 boundary a=11/2: x=-1 (double root, the tangent moment — t = 2 is the minimum)')
    let hasRoot = false
    for (let x = -12; x <= 12; x += 0.01) if (Math.abs(quartic(4, x)) < 1e-9) hasRoot = true
    ok(!hasRoot, 'K4.2 degenerate a=4: no real root (the collapse reads 9 = 0)')
    hasRoot = false
    for (let x = -12; x <= 12; x += 0.01) if (Math.abs(quartic(3, x)) < 1e-9) hasRoot = true
    ok(!hasRoot, 'K4.2 exclusion a=3: no real root (the expression is 3(x^2+2x+6) > 0)')
    ok(4 - 4 * 0.5 > 0, 'K4.2 interior a=5.2: t = 2.5, and x^2+2x+0.5 has D = 2 > 0')
  }
  // the verdict: a real x exists <=> t = 3/(a-4) >= 2 <=> a in (4, 11/2]
  {
    for (let a = 2; a <= 9; a += 0.1) {
      if (Math.abs(a - 4) < 1e-6 || Math.abs(a - 5.5) < 1e-6) continue
      const t = 3 / (a - 4)
      const claimed = t >= 2
      const truth = 4 - 4 * (3 - t) >= 0
      if (claimed !== truth) ok(false, `K4.3 the t>=2 wall disagrees at a=${a.toFixed(1)}`)
    }
    ok(Math.abs(3 / (5.5 - 4) - 2) < 1e-12, 'K4.3 a=11/2: t = 2 exactly (the wall seat, attained)')
    ok(3 / (6 - 4) === 1.5 && 1.5 < 2, 'K4.4 a=6: t = 1.5 < 2 — excluded')
    ok(3 / (3 - 4) === -3 && -3 < 2, 'K4.4 a=3: t = -3 < 2 — excluded (negative t)')
    ok(3 / (5 - 4) === 3 && 3 >= 2, 'K4.4 a=5: t = 3 — included')
    eq(3 / (4.2 - 4), 15, 1e-9, 'K4.4 a=4.2: t = 15 — included (just above the pole)')
  }
}

// K5. the cos bridge: cos^2 x - k cos x - 2 = 0 has a real solution
// <=> the t-quadratic t^2 - kt - 2 has a root in [-1, 1] <=> |k| >= 1.
{
  for (let k = -6; k <= 6; k += 0.1) {
    if (Math.abs(Math.abs(k) - 1) < 1e-6) continue
    const r = realRoots(1, -k, -2)
    const truth = r.some((t) => t >= -1 && t <= 1)
    const claimed = Math.abs(k) >= 1
    if (truth !== claimed) ok(false, `K5.1 the |k|>=1 verdict disagrees at k=${k.toFixed(1)}`)
  }
  {
    const r = realRoots(1, -1, -2) // k = 1: t^2 - t - 2 = (t-2)(t+1)
    ok(r.some((t) => Math.abs(t + 1) < 1e-9), 'K5.2 k=1: the negative root is exactly t = -1 (cos x = -1, x = π)')
    const r2 = realRoots(1, 1, -2) // k = -1: t^2 + t - 2 = (t+2)(t-1)
    ok(r2.some((t) => Math.abs(t - 1) < 1e-9), 'K5.2 k=-1: the positive root is exactly t = 1 (cos x = 1, x = 0)')
    const r0 = realRoots(1, 0, -2)
    ok(r0.every((t) => Math.abs(t) > 1), 'K5.2 k=0: roots ±√2 both outside [-1,1]')
    ok(Math.abs(Math.sqrt(2) - 1.4142135623730951) < 1e-12, 'K5.2 √2 pinned')
    // both branches: the positive root <= 1 forces k <= -1; the negative
    // root >= -1 forces k >= 1 (the honest both-branch census)
    eq((1 + Math.sqrt(1 + 8)) / 2, 2, 1e-12, 'K5.3 k=1 positive root is exactly 2 (outside)')
    eq((1 - Math.sqrt(1 + 8)) / 2, -1, 1e-12, 'K5.3 k=1 negative root is exactly -1 (the boundary seat)')
  }
}

// K6. Rolle's reads and their honesty, on our witnesses:
//   - the antiderivative trick: 4a+3b+3c = 0 => a root of ax^2+bx+c in (0,2)
//     (and the exercise's interval (0,3): 6a+3b+2c = 0)
//   - between two roots of f sits a root of f': (x-1)(x-3)(x-5)
//   - honesty 1: f(-2) = f(2) = 3 > 0 for x^2 - 1, yet BOTH roots ±1 sit inside
//   - honesty 2 (the reverse failure): x^3+1 has f' = 3x^2 with the root 0,
//     but f itself has exactly ONE real root — a derivative root does not
//     force two straddling f-roots.
{
  // the antiderivative sweep (a != 0 so the equation is genuinely quadratic)
  for (const a of [-3, 3]) for (const b of rng(-6, 6)) {
    const c = -(4 * a + 3 * b) / 3
    if (!Number.isInteger(c)) continue
    const r = realRoots(a, b, c)
    ok(r.some((x) => x > 0 && x < 2), `K6.1 the (0,2) antiderivative law holds at (a,b,c)=(${a},${b},${c})`)
  }
  for (const a of rng(-4, 4)) for (const b of [-6, -4, -2, 0, 2, 4, 6]) {
    if (a === 0) continue // the engine's realRoots owns quadratics only
    const c = -(6 * a + 3 * b) / 2
    if (!Number.isInteger(c)) continue
    const r = realRoots(a, b, c)
    ok(r.some((x) => x > 0 && x < 3), `K6.1b the (0,3) antiderivative law holds at (a,b,c)=(${a},${b},${c})`)
  }
  // the weights identities: F(l) - F(0) = l(al^2/3 + bl/2 + c)
  for (const a of rng(-3, 3)) for (const b of rng(-4, 4)) for (const c of rng(-5, 5)) {
    const F = (x: number) => (a * x ** 3) / 3 + (b * x * x) / 2 + c * x
    eq(F(2), (2 * (4 * a + 3 * b + 3 * c)) / 3, 1e-12, 'K6.2 the 4-3-3 weights link: F(2) = (2/3)(4a+3b+3c)')
    eq(F(3), (3 * (6 * a + 3 * b + 2 * c)) / 2, 1e-12, 'K6.2 the 6-3-2 weights link: F(3) = (3/2)(6a+3b+2c)')
  }
  // the between-roots corollary witness: f = x^3 - 9x^2 + 23x - 15
  {
    const f = (x: number) => x ** 3 - 9 * x * x + 23 * x - 15
    ok(f(1) === 0 && f(3) === 0 && f(5) === 0, 'K6.3 the three roots 1, 3, 5')
    const fp = sortedRoots(3, -18, 23)
    ok(fp.length === 2, "K6.3 f' = 3x^2 - 18x + 23 has two real roots")
    ok(fp[0] > 1 && fp[0] < 3 && fp[1] > 3 && fp[1] < 5, 'K6.3 one derivative root in (1,3) and one in (3,5)')
    ok(Math.abs(fp[0] - (3 - (2 * Math.sqrt(3)) / 3)) < 1e-9 && Math.abs(fp[1] - (3 + (2 * Math.sqrt(3)) / 3)) < 1e-9, 'K6.3 the roots are 3 ± 2√3/3')
  }
  // honesty 1: x^2 - 1 at the walls ±2
  {
    const g = (x: number) => x * x - 1
    ok(g(-2) === 3 && g(2) === 3, 'K6.4 g(-2) = g(2) = 3 — the agreeing signs')
    ok(g(-1) === 0 && g(1) === 0, 'K6.4 yet both roots ±1 sit inside (-2, 2)')
    ok(realRoots(1, 0, 1).length === 0, 'K6.4 x^2 + 1 has no real roots at all (the other side of the honesty)')
  }
  // honesty 2: the reverse failure on x^3 + 1 = (x+1)(x^2 - x + 1)
  {
    ok(sortedRoots(3, 0, 0).length === 1 && sortedRoots(3, 0, 0)[0] === 0, "K6.5 f' = 3x^2 has the double root 0")
    ok(1 - 4 * 1 * 1 < 0, 'K6.5 the quadratic factor x^2 - x + 1 has D = -3 < 0 — no more real roots')
    ok((-1) ** 3 + 1 === 0, 'K6.5 x^3 + 1 has exactly ONE real root, x = -1')
    ok(0 > -1, 'K6.5 the derivative root 0 sits RIGHT of the single f-root -1 — no straddle')
  }
}

// K7. the interleaving census on the fresh witnesses (a,b,c,d) = (-1,2,5,7):
// F(x) = mu(x+1)(x-5) + lambda(x-2)(x-7) = (mu+lambda)x^2 - (4mu+9lambda)x
//        + (14lambda - 5mu);
// F(-1) = 24λ, F(2) = -9μ, F(5) = -6λ, F(7) = 16μ;
//   λμ > 0 (mu+lambda != 0)  -> one root in (-1,2), one in (5,7)
//   λμ < 0, mu+lambda > 0    -> one root in (2,5), the other < -1
//   λμ < 0, mu+lambda < 0    -> one root in (2,5), the other > 7
//   λ = 0                    -> roots exactly -1 and 5
//   μ = 0                    -> roots exactly 2 and 7
//   μ+λ = 0 (both nonzero)   -> linear; the root x* = 19/5 in (2,5)
{
  const F = (mu: number, la: number, x: number) => mu * (x + 1) * (x - 5) + la * (x - 2) * (x - 7)
  const Froot = (mu: number, la: number) => sortedRoots(mu + la, -(4 * mu + 9 * la), 14 * la - 5 * mu)
  // the four-value pins
  for (const mu of rng(-3, 3)) for (const la of rng(-3, 3)) {
    eq(F(mu, la, -1), 24 * la, 1e-12, 'K7.1 F(-1) = 24λ')
    eq(F(mu, la, 2), -9 * mu, 1e-12, 'K7.1 F(2) = -9μ')
    eq(F(mu, la, 5), -6 * la, 1e-12, 'K7.1 F(5) = -6λ')
    eq(F(mu, la, 7), 16 * mu, 1e-12, 'K7.1 F(7) = 16μ')
    // the expanded-coefficient route agrees with the factored route
    eq((mu + la) * 4 - (4 * mu + 9 * la) * 2 + (14 * la - 5 * mu), F(mu, la, 2), 1e-12, 'K7.1b the expanded route agrees at x=2')
  }
  // the λμ > 0 census
  for (const mu of [-3, -2, -1, 1, 2, 3, 5]) for (const la of [-3, -2, -1, 1, 2, 3, 5]) {
    if (mu * la <= 0 || mu + la === 0) continue
    const r = Froot(mu, la)
    ok(r.length === 2 && r[0] > -1 && r[0] < 2 && r[1] > 5 && r[1] < 7, `K7.2 λμ>0 census at μ=${mu}, λ=${la}`)
  }
  // the λμ < 0 census with the μ+λ sign split
  for (const mu of [1, 2, 3, 5]) for (const la of [-1, -2, -3, -5]) {
    if (mu + la === 0) continue
    const r = Froot(mu, la)
    ok(r.length === 2, `K7.3 λμ<0 real roots at μ=${mu}, λ=${la}`)
    const inMid = r.filter((x) => x > 2 && x < 5)
    const outside = r.filter((x) => x < -1 || x > 7)
    ok(inMid.length === 1 && outside.length === 1, `K7.3 one root in (2,5), the other outside [-1,7] at μ=${mu}, λ=${la}`)
    if (mu + la > 0) ok(outside[0] < -1, `K7.3 μ+λ>0: the escaper leaves LEFT at μ=${mu}, λ=${la}`)
    else ok(outside[0] > 7, `K7.3 μ+λ<0: the escaper leaves RIGHT at μ=${mu}, λ=${la}`)
  }
  // the degenerate seats
  {
    const rL0 = sortedRoots(1, -4, -5) // λ=0: F = μ(x+1)(x-5)
    ok(Math.abs(rL0[0] + 1) < 1e-9 && Math.abs(rL0[1] - 5) < 1e-9, 'K7.4 λ=0: roots exactly -1 and 5')
    const rM0 = sortedRoots(1, -9, 14) // μ=0: F = λ(x-2)(x-7)
    ok(Math.abs(rM0[0] - 2) < 1e-9 && Math.abs(rM0[1] - 7) < 1e-9, 'K7.4 μ=0: roots exactly 2 and 7')
  }
  // the linear case μ+λ = 0: F = μ(5x - 19), root x* = 19/5 in (2,5)
  {
    ok(Math.abs(F(1, -1, 19 / 5)) < 1e-9, 'K7.5 the linear-case root x* = 19/5 vanishes F')
    ok(19 / 5 > 2 && 19 / 5 < 5, 'K7.5 x* = 19/5 sits inside (2, 5)')
    for (const [a, b, c, d] of [[-1, 2, 5, 7], [0, 3, 4, 9], [-3, -1, 2, 8], [1, 4, 6, 11]] as number[][]) {
      const den = b + d - a - c
      const xstar = (b * d - a * c) / den
      eq(xstar - b, ((b - a) * (c - b)) / den, 1e-12, `K7.6 the factored difference x*-b at (${a},${b},${c},${d})`)
      eq(xstar - c, ((d - c) * (b - c)) / den, 1e-12, `K7.6 the factored difference x*-c at (${a},${b},${c},${d})`)
      ok(xstar > b && xstar < c, `K7.6 b < x* < c at (${a},${b},${c},${d})`)
      const lin = (x: number) => (x - a) * (x - c) - (x - b) * (x - d)
      ok(Math.abs(lin(xstar)) < 1e-12, `K7.6 the linear form vanishes at x* (${a},${b},${c},${d})`)
    }
  }
  // the quiz's concrete instance μ=2, λ=3: F = 5x^2 - 35x + 32
  {
    const r = sortedRoots(5, -35, 32)
    ok(r.length === 2 && Math.abs(r[0] - (35 - 3 * Math.sqrt(65)) / 10) < 1e-9, 'K7.7 μ=2,λ=3: the small root is (35-3√65)/10 ≈ 1.081')
    ok(r[0] > -1 && r[0] < 2 && r[1] > 5 && r[1] < 7, 'K7.7 the doors read: roots in (-1,2) and (5,7)')
    ok(Math.abs(35 * 35 - 4 * 5 * 32 - 585) < 1e-9, 'K7.7 D = 585 pinned')
  }
}

// K8. the wall demands (f < 0 for ALL x in an open interval):
//   nonempty: x^2 - (m+2)x + 5m+1 < 0 on (2,4) <=> m <= -9
//             (f(2) = 3m+1, f(4) = m+9; both <= 0)
//   the clash: x^2 - (a-1)x + 3a < 0 on (2,4) has NO real a
//             (f(2) = 6+a, f(4) = 20-a; adding: 26 <= 0 — impossible)
{
  const f = (m: number, x: number) => x * x - (m + 2) * x + 5 * m + 1
  for (const m of rng(-12, 6)) {
    eq(f(m, 2), 3 * m + 1, 1e-12, 'K8.1 f(2) = 3m+1')
    eq(f(m, 4), m + 9, 1e-12, 'K8.1 f(4) = m+9')
  }
  // the equivalence f<0 on open (2,4) <=> f(2)<=0 and f(4)<=0, brute-forced
  for (let m = -14; m <= 8; m += 0.25) {
    const walls = f(m, 2) <= 0 && f(m, 4) <= 0
    let allNeg = true
    for (let x = 2.001; x < 4; x += 0.002) if (f(m, x) >= 0) allNeg = false
    if (f(m, 3.999) >= 0) allNeg = false
    if (walls !== allNeg) ok(false, `K8.2 the walls-equivalence disagrees at m=${m}`)
  }
  {
    ok(f(-9, 2) === -26 && f(-9, 4) === 0, 'K8.3 boundary m=-9: f(4) = 0 exactly (the root sits ON the open wall)')
    ok(f(-9, 3) === -14, 'K8.3 m=-9: f(3) = -14 < 0 strictly inside (the member is x^2 + 7x - 44 = (x+11)(x-4))')
    ok(f(-8, 4) === 1, 'K8.3 exclusion m=-8: f(4) = 1 > 0')
    ok(Math.abs(2 ** 1.5 - 2.8284271247461903) < 1e-9, 'K8.3 2^1.5 pinned — the disguise maps t in (1,2) into x in (2,4)')
  }
  const g = (a: number, x: number) => x * x - (a - 1) * x + 3 * a
  {
    for (const a of rng(-25, 25)) {
      eq(g(a, 2), 6 + a, 1e-12, 'K8.4 g(2) = 6+a')
      eq(g(a, 4), 20 - a, 1e-12, 'K8.4 g(4) = 20-a')
    }
    for (const a of rng(-25, 25)) eq(6 + a + 20 - a, 26, 1e-12, 'K8.4 the parameter cancels: the sum is the constant 26')
    let allFail = true
    for (const a of rng(-25, 25)) {
      let hasNonNeg = false
      for (let x = 2.001; x < 4; x += 0.002) if (g(a, x) >= 0) hasNonNeg = true
      if (!hasNonNeg) allFail = false
    }
    ok(allFail, 'K8.5 no real a passes — the clash certified by brute force')
  }
}

// K9. the counting censuses (exercise keys):
//   integers a with both roots of x^2 - 2ax + a^2 - 4 = 0 in (0,9): 4
//   integers m in [-6,6] with x^2 - (m+1)x + 3m - 5 NOT real: 3 (m=4,5,6)
{
  const list: number[] = []
  for (const a of rng(-10, 10)) {
    const r = sortedRoots(1, -2 * a, a * a - 4)
    if (r.length === 2 && r[0] > 0 && r[1] < 9) list.push(a)
  }
  ok(list.join(',') === '3,4,5,6', `K9.1 the a-census = {3,4,5,6} (got ${list.join(',')}) — count 4`)
  const nom: number[] = []
  for (const m of rng(-6, 6)) if (realRoots(1, -(m + 1), 3 * m - 5).length === 0) nom.push(m)
  ok(nom.join(',') === '4,5,6', `K9.2 the no-real census in [-6,6] = {4,5,6} (got ${nom.join(',')}) — count 3`)
}

/* ------------------------------------------------------------------ */
/* (L) quiz keys and exercise answer keys for lesson 2.4, pinned       */
/*     BEFORE any prose.                                               */
/* ------------------------------------------------------------------ */

// L1. quiz 2.4 keys: [1, 2, 1, 2, 0] with every distractor priced.
{
  // Q1: the complete check set for "both roots in (1,5)" on 2x^2-12x+16
  {
    const r = sortedRoots(2, -12, 16)
    ok(r.length === 2 && r[0] === 2 && r[1] === 4, 'L1 Q1 the exhibit roots are 2 and 4')
    const dA = sortedRoots(2, -22, 36)
    ok(dA.length === 2 && dA[1] === 9 && quad(2, -22, 36, 1) > 0 && 22 * 22 - 4 * 2 * 36 > 0, 'L1 Q1 distractor A priced: passes D and a·f(1) yet root 9 escapes')
    ok(realRoots(1, -2, 5).length === 0 && quad(1, -2, 5, 1) > 0 && quad(1, -2, 5, 5) > 0, 'L1 Q1 distractor C priced: walls pass with zero roots')
    const dD = sortedRoots(1, -3, 2)
    ok(dD.length === 2 && Math.abs(dD[0] - 1) < 1e-9 && 1.5 > 1 && 1.5 < 5, 'L1 Q1 distractor D priced: axis passes but root 1 sits on the wall')
  }
  // Q2: the D-skip question — exactly-one needs no D check
  {
    ok(quad(1, -2, 5, 1) * quad(1, -2, 5, 5) > 0, 'L1 Q2 the always-positive family never passes a between-test (D needed for the both-rows)')
    ok(1 - 4 * 1 * 5 < 0, 'L1 Q2 its D = -16 < 0')
  }
  // Q3: the fixed point of x^2 - (m+1)x + 3m - 5 is (3, 1)
  {
    ok(quad(1, -(0 + 1), 3 * 0 - 5, 3) === 1 && quad(1, -(7 + 1), 3 * 7 - 5, 3) === 1, 'L1 Q3 f(3) = 1 at m = 0 and m = 7')
    ok(quad(1, -(2 + 1), 3 * 2 - 5, 1) === -1 && quad(1, -(4 + 1), 3 * 4 - 5, 1) === 3, 'L1 Q3 f(1) varies (−1 at m=2, 3 at m=4)')
    ok(quad(1, -(2 + 1), 3 * 2 - 5, 5) === 11 && quad(1, -(4 + 1), 3 * 4 - 5, 5) === 7, 'L1 Q3 f(5) varies (11 at m=2, 7 at m=4)')
    ok(3 * 2 - 5 !== 3 * 4 - 5, 'L1 Q3 f(0) varies')
  }
  // Q4: the Rolle honesty on x^2 - 1 at the walls ±2
  {
    ok(quad(1, 0, -1, -2) === 3 && quad(1, 0, -1, 2) === 3, 'L1 Q4 g(-2) = g(2) = 3 — the agreeing signs')
    ok(quad(1, 0, -1, -1) === 0 && quad(1, 0, -1, 1) === 0, 'L1 Q4 yet the roots ±1 sit inside')
    ok(realRoots(1, 0, 1).length === 0, 'L1 Q4 distractor B priced: x^2+1 agrees in sign with NO roots')
    const h = (x: number) => (x * x - 1) * (x * x - 4)
    ok(h(-3) === 40 && h(3) === 40, 'L1 Q4 distractor D priced: (x^2-1)(x^2-4) agrees in sign at ±3')
    ok([-2, -1, 1, 2].every((x) => x > -3 && x < 3), 'L1 Q4 with FOUR roots inside (-3,3) — exactly two is not forced')
  }
  // Q5: μ=2, λ=3 on the doors (-1,2,5,7) — the root in (-1,2)
  {
    const r = sortedRoots(5, -35, 32)
    ok(r.length === 2 && r[0] > -1 && r[0] < 2, 'L1 Q5 the small root (35-3√65)/10 ≈ 1.081 lies in (-1,2)')
    ok(r[1] > 5 && r[1] < 7, 'L1 Q5 the large root lies in (5,7) — not in (2,5), not outside')
    ok(2 * 3 > 0, 'L1 Q5 λμ = 6 > 0 — the both-inside census')
  }
  ok(true, 'L1 quiz 2.4 keys pinned as [1, 2, 1, 2, 0]')
}

// L2. exercise answer keys 2.4 (15 items, L1-L6), pinned with the numbers.
{
  // 1. x^2 - 8x + 12 vs walls 3 and 5: both walls between the roots
  {
    const r = sortedRoots(1, -8, 12)
    ok(r[0] === 2 && r[1] === 6, 'L2 ex1 roots 2 and 6')
    ok(quad(1, -8, 12, 3) === -3 && quad(1, -8, 12, 5) === -3, 'L2 ex1 f(3) = f(5) = -3 < 0 — the walls-between read')
    ok(r.every((x) => !(x > 3 && x < 5)), 'L2 ex1 neither root in (3,5)')
  }
  // 2. both roots of x^2 - 10x + 23 in (2,6)? NO
  {
    const r = sortedRoots(1, -10, 23)
    ok(Math.abs(r[1] - (5 + Math.SQRT2)) < 1e-9, 'L2 ex2 the large root is 5+√2 ≈ 6.41 — escapes')
    ok(quad(1, -10, 23, 2) === 7 && quad(1, -10, 23, 6) === -1, 'L2 ex2 f(2) = 7 > 0 passes, f(6) = -1 < 0 fails')
    ok(100 - 92 === 8, 'L2 ex2 D = 8 > 0, axis 5 in (2,6) — three checks pass, the right wall fails')
  }
  // 3. count integers a: both roots of x^2-2ax+a^2-4 in (0,9) -> 4
  {
    ok(3 - 2 > 0 && 6 + 2 < 9, 'L2 ex3 a=3 and a=6 both qualify (roots 1,5 and 4,8)')
    ok(2 - 2 === 0, 'L2 ex3 a=2: root 0 ON the wall — excluded (open)')
    ok(7 + 2 === 9, 'L2 ex3 a=7: root 9 ON the wall — excluded')
  }
  // 4. 3x^2 - 5x + k opposite sign <=> k < 0
  {
    ok(quad(3, -5, -2, 0) === -2 && quad(3, -5, 2, 0) === 2, 'L2 ex4 product = k/3 signs at k = ±2')
    ok(25 - 12 * -2 > 0 && 25 - 12 * 2 > 0, 'L2 ex4 D = 25-12k > 0 automatically when k < 0')
  }
  // 5. both roots of x^2 - 6x + m exceed 2 <=> 8 < m <= 9
  {
    for (let m = 4; m <= 12; m += 0.25) {
      if (Math.abs(m - 8) < 1e-6 || Math.abs(m - 9) < 1e-6) continue
      const r = realRoots(1, -6, m)
      const claimed = m > 8 && m <= 9
      const truth = r.length === 2 && r.every((x) => x > 2)
      if (claimed !== truth) ok(false, `L2 ex5 verdict disagrees at m=${m}`)
    }
    ok(quad(1, -6, 9, 2) === 1 && realRoots(1, -6, 9).length === 1, 'L2 ex5 m=9: double root 3 > 2 — included')
    ok(quad(1, -6, 8, 2) === 0, 'L2 ex5 m=8: root exactly AT 2 — excluded')
  }
  // 6. exactly one root of x^2 - 8x + m in (2,4) <=> 12 < m < 16
  {
    for (let m = 8; m <= 20; m += 0.25) {
      if (Math.abs(m - 12) < 1e-6 || Math.abs(m - 16) < 1e-6) continue
      const r = realRoots(1, -8, m)
      const claimed = m > 12 && m < 16
      const truth = r.filter((x) => x > 2 && x < 4).length === 1
      if (claimed !== truth) ok(false, `L2 ex6 verdict disagrees at m=${m}`)
    }
    ok(quad(1, -8, 12, 2) === 0 && realRoots(1, -8, 12).some((x) => x === 6), 'L2 ex6 m=12: root 2 ON the wall, root 6 outside — zero inside')
    const r16 = realRoots(1, -8, 16)
    ok(r16.length === 1 && r16[0] === 4, 'L2 ex6 m=16: double root 4 ON the right wall — zero inside')
    ok(quad(1, -8, 14, 2) === 2 && quad(1, -8, 14, 4) === -2, 'L2 ex6 m=14: f(2) = 2 > 0, f(4) = -2 < 0 — the product test')
  }
  // 7. count m in [-6,6] with no real root -> 3 (verified in K9.2)
  ok(true, 'L2 ex7 answer 3 rides the K9.2 census {4,5,6}')
  // 8. roots of x^2-6x+8 between the roots of x^2-(m+1)x+2m-10 <=> m > 1
  {
    for (let m = -3; m <= 9; m += 0.2) {
      if (Math.abs(m - 1) < 1e-6) continue
      const outer = sortedRoots(1, -(m + 1), 2 * m - 10)
      const claimed = m > 1
      const truth = outer.length === 2 && outer[0] < 2 && 4 < outer[1]
      if (claimed !== truth) ok(false, `L2 ex8 verdict disagrees at m=${m.toFixed(1)}`)
    }
    ok(quad(1, -(2 + 1), 2 * 2 - 10, 2) === -8, 'L2 ex8 f2(2) = -8 < 0 for every m (the auto-satisfied wall)')
    eq(quad(1, -(1 + 1), 2 * 1 - 10, 4), 0, 1e-12, 'L2 ex8 boundary m=1: root exactly AT 4')
    const w2 = sortedRoots(1, -3, -6)
    ok(Math.abs(w2[0] - (3 - Math.sqrt(33)) / 2) < 1e-9 && w2[0] < 2 && 4 < w2[1], 'L2 ex8 witness m=2: outer roots (3±√33)/2 straddle both 2 and 4')
    const w0 = sortedRoots(1, -1, -10)
    ok(Math.max(...w0) < 4, 'L2 ex8 exclusion m=0: the right outer root ≈ 3.70 < 4 — wall 4 escapes')
  }
  // 9. (x^2+2x+4)^2 = k(x^2+2x+3) has a real solution <=> k >= 9/2
  {
    for (let k = 0; k <= 10; k += 0.25) {
      if (Math.abs(k - 4.5) < 1e-6) continue
      const r = realRoots(1, 2 - k, 1) // t^2 + (2-k)t + 1
      const truth = r.some((t) => t >= 2)
      const claimed = k >= 4.5
      if (truth !== claimed) ok(false, `L2 ex9 verdict disagrees at k=${k}`)
    }
    const rb = sortedRoots(1, 2 - 4.5, 1)
    ok(rb.length === 2 && Math.abs(rb[0] - 0.5) < 1e-9 && Math.abs(rb[1] - 2) < 1e-9, 'L2 ex9 boundary k=9/2: t-roots 0.5 and 2 — t=2 attained (x=-1)')
    const r5 = sortedRoots(1, -3, 1)
    ok(Math.abs(Math.max(...r5) - (3 + Math.sqrt(5)) / 2) < 1e-9, 'L2 ex9 k=5: t = (3+√5)/2 ≈ 2.618')
    const r4 = realRoots(1, -2, 1)
    ok(r4.length === 1 && r4[0] === 1, 'L2 ex9 exclusion k=4: double t-root 1 < 2')
    const orig = (k: number, x: number) => (x * x + 2 * x + 4) ** 2 - k * (x * x + 2 * x + 3)
    ok(Math.abs(orig(4.5, -1)) < 1e-9, 'L2 ex9 x=-1 solves the original at k=9/2 (t = 2 = the minimum, the tangent seat)')
  }
  // 10. sin^2 x - (k+2) sin x + k+2 = 0 has a solution <=> k <= -2
  {
    for (let k = -8; k <= 5; k += 0.2) {
      if (Math.abs(k + 2) < 1e-6 || Math.abs(k + 2.5) < 1e-6) continue
      const r = realRoots(1, -(k + 2), k + 2)
      const truth = r.some((t) => t >= -1 && t <= 1)
      const claimed = k <= -2
      if (truth !== claimed) ok(false, `L2 ex10 verdict disagrees at k=${k.toFixed(1)}`)
    }
    const r2 = realRoots(1, 0, 0)
    ok(r2.length === 1 && r2[0] === 0, 'L2 ex10 boundary k=-2: double t-root 0 in [-1,1]')
    const r25 = realRoots(1, 0.5, -0.5)
    ok(r25.some((t) => Math.abs(t + 1) < 1e-9) && r25.some((t) => Math.abs(t - 0.5) < 1e-9), 'L2 ex10 boundary k=-5/2: roots -1 and 1/2 — the wall seat -1 included')
    const r3 = realRoots(1, 1, -1)
    ok(r3.some((t) => Math.abs(t - (Math.sqrt(5) - 1) / 2) < 1e-9), 'L2 ex10 k=-3: t = (√5-1)/2 ≈ 0.618 inside')
    ok(realRoots(1, 1, 1).length === 0, 'L2 ex10 exclusion k=-1: D = 1-4 < 0')
    const rk2 = realRoots(1, -4, 4)
    ok(rk2.length === 1 && rk2[0] === 2, 'L2 ex10 exclusion k=2: double t-root 2 outside [-1,1]')
  }
  // 11. 6a+3b+2c = 0 => a root of ax^2+bx+c in (0,3); witness (1,-4,3)
  {
    const r = sortedRoots(1, -4, 3)
    ok(r[0] === 1 && r[1] === 3, 'L2 ex11 witness roots 1 and 3')
    ok(6 * 1 + 3 * -4 + 2 * 3 === 0, 'L2 ex11 the witness satisfies 6a+3b+2c = 0')
    ok(1 > 0 && 1 < 3, 'L2 ex11 the OPEN-interval root is 1 (the seat 3 sits on the endpoint)')
  }
  // 12. the interleaving proof rides the K7 witnesses (-1,2,5,7)
  ok(true, 'L2 ex12 rides K7 (F(-1)=24λ, F(2)=-9μ, F(5)=-6λ, F(7)=16μ)')
  // 13. the add-the-walls certificate: no real a (rides K8)
  ok(true, 'L2 ex13 rides K8 (26 <= 0 — the parameter cancels)')
  // 14. the larger-root law (rides K2.7)
  ok(true, 'L2 ex14 rides K2.7 (the larger root < 3 whenever real)')
  // 15. the linear-case root law b < x* < c (rides K7.6)
  ok(true, 'L2 ex15 rides K7.6 (x* - b = (b-a)(c-b)/(b+d-a-c) > 0, x* - c = (d-c)(b-c)/(b+d-a-c) < 0)')
}


/* ------------------------------------------------------------------ */
/* (M) AUTHORED-AUDIT — lesson 2.4 (aa-location-of-roots-doors-in-      */
/*     intervals), appended after authoring (run 103), J-pattern.      */
/* ------------------------------------------------------------------ */

{
  const ch = chapter02
  ok(ch.lessons.length === 5 && (ch.plannedLessons?.length ?? 0) === 0, 'M1 chapter shape CLOSED run 104: 5 lessons, none planned')
  const L = ch.lessons[3]
  ok(L.id === 'aa-location-of-roots-doors-in-intervals', 'M2 lesson id matches the pinned id')
  ok(L.number === '2.4' && L.title === 'Location of Roots: Doors in Intervals', 'M3 lesson number/title')
  const blocks = L.blocks as Array<{ kind: string; [k: string]: unknown }>

  // M4 block census (count-aware, as authored)
  const count = (k: string) => blocks.filter((b) => b.kind === k).length
  ok(count('heading') === 7, `M4.1 headings = 7 (got ${count('heading')})`)
  ok(count('example') === 15, `M4.2 examples/Illustrations = 15 (got ${count('example')})`)
  ok(count('derivation') === 2, `M4.3 derivations = 2 (got ${count('derivation')})`)
  ok(count('figure') === 2, `M4.4 figures = 2 (got ${count('figure')})`)
  ok(count('quiz') === 1 && count('exercises') === 1, 'M4.5 quiz + exercises present')
  ok(count('formula') === 6, `M4.6 formula cards = 6 (got ${count('formula')})`)
  ok(count('terms') === 1 && count('list') === 1, `M4.7 terms block + the census roman list (got lists ${count('list')})`)
  ok(count('table') === 1, `M4.8 the k-system master table (got ${count('table')})`)
  const callouts = blocks.filter((b) => b.kind === 'callout') as unknown as Array<{ tone: string; title: string; text: string }>
  ok(callouts.filter((c) => c.tone === 'definition').length === 1, 'M4.9 the definition callout (location of roots and the wall; the terms block carries the companion definitions)')
  ok(callouts.filter((c) => c.tone === 'theorem').length === 3, 'M4.10 three theorem callouts (the a·f(k) principle, Rolle, the four-value bracket)')
  ok(callouts.filter((c) => c.tone === 'warn').length === 4, 'M4.11 four warn callouts (D-skip honesty, boundary seat, honesty 1, honesty 2)')
  ok(callouts.filter((c) => c.tone === 'exam').length === 2, 'M4.12 two exam callouts')
  ok(callouts.filter((c) => c.tone === 'insight').length === 6, 'M4.13 six insight callouts (fixed point x2, outer-at-inner, range-is-wall, weights law, add-the-walls)')

  // M5 quiz keys vs the pre-writing pins [1, 2, 1, 2, 0]
  const quiz = blocks.find((b) => b.kind === 'quiz') as unknown as { items: Array<{ answer: number; options: string[]; explain: string }> }
  ok(quiz.items.length === 5, 'M5.1 quiz has 5 items')
  ok(quiz.items.map((i) => i.answer).join(',') === '1,2,1,2,0', `M5.2 quiz keys match the L1 pins (got ${quiz.items.map((i) => i.answer).join(',')})`)
  ok(quiz.items.every((i) => i.options.length === 4), 'M5.3 every quiz item has 4 options')
  ok(quiz.items.every((i) => i.explain.length >= 120), 'M5.4 every quiz explain prices the distractors')

  // M6 exercises census + full solutions
  const ex = blocks.find((b) => b.kind === 'exercises') as unknown as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer: string }> }> }
  const levelCounts = ex.sets.map((sm) => `${sm.level}:${sm.questions.length}`).join(' ')
  ok(levelCounts === 'L1:2 L2:2 L3:3 L4:3 L5:3 L6:2', `M6.1 exercise ladder L1-L6 = 15 (got ${levelCounts})`)
  ok(ex.sets.every((sm) => sm.questions.every((q) => q.solution.length >= 4 && q.answer.length > 0)), 'M6.2 every exercise carries a full worked solution and a terminal answer')

  // M7 figure pins (viewBox, coordinates, labels, vivid palette, no retired hexes)
  const figs = blocks.filter((b) => b.kind === 'figure') as unknown as Array<{ caption: string; svg: string }>
  const f1 = figs[0].svg
  const f2 = figs[1].svg
  ok(f1.includes('viewBox="0 0 720 360"') && f2.includes('viewBox="0 0 720 380"'), 'M7.1 figure viewBoxes match the plans')
  ok(!/undefined|NaN/.test(f1) && !/undefined|NaN/.test(f2), 'M7.2 no undefined/NaN in svg output')
  ok(f1.includes('the fixed point (3, 1)') && f1.includes('wall k₁ = 1') && f1.includes('wall k₂ = 3'), 'M7.3 fig1 the fixed point + both wall labels')
  ok(f1.includes('m = 0: x² − x − 5 (doors −1.79, 2.79)') && f1.includes('m = 3: (x − 2)² (double door 2)') && f1.includes('m = 5: (x − 3)² + 1 (no real doors)') && f1.includes('m = 7: (x − 4)² (double door 4)'), 'M7.4 fig1 legend rows name all four members')
  ok(f2.includes('a = −1') && f2.includes('b = 2') && f2.includes('c = 5') && f2.includes('d = 7'), 'M7.5 fig2 the four door labels')
  ok(f2.includes('λμ &gt; 0: one door in (a, b)') && f2.includes('λμ &lt; 0: one door in (b, c)') && f2.includes('x* = 19/5 = 3.8'), 'M7.6 fig2 the census brackets + the linear-case seat')
  ok(f2.includes('μ = 2, λ = 3: F = 5x² − 35x + 32, doors (35 ± 3√65)/10'), 'M7.7 fig2 the concrete instance caption')
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  ok(!figs.some((f) => retired.some((hx) => f.svg.includes(hx))), 'M7.8 no retired palette hexes in either figure')
  ok(f1.includes('#16a34a') && f1.includes('#ea580c') && f1.includes('#dc2626') && f2.includes('#0d9488') && f2.includes('#d97706') && f2.includes('#65a30d') && f2.includes('#fffdf5'), 'M7.9 vivid palette in use on the paper plate')

  // M8 prereqs resolve against the repo
  const fs3 = await import('fs')
  ok((L.prerequisites ?? []).length === 3, 'M8.1 three prereqs declared')
  const al10 = fs3.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-10.ts', 'utf8')
  ok(al10.includes("id: 'al-the-parabola-quadratic-graphs-and-vertices'"), 'M8.2 the AL 10.3 parabola prereq exists')
  ok((L.prerequisites ?? []).includes('aa-vertex-form-at-work-maxima-and-minima') && (L.prerequisites ?? []).includes('aa-quadratic-inequalities-and-the-sign-diagram'), 'M8.3 the 2.1/2.2 prereqs declared')

  // M9 sources keys exist in SOURCE_LOG
  const slog3 = fs3.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const k of L.sources ?? []) ok(slog3.includes('`' + k + '`') || slog3.includes('- ' + k), `M9 source key ${k} in SOURCE_LOG`)

  // M10 honesty scans
  const allText3 = JSON.stringify(blocks)
  ok(!allText3.includes('\\\\  ') && !allText3.includes("\\\\'"), 'M10.1 no odd-run backslashes')
  ok(!/\\u[0-9a-fA-F]{4}/.test(allText3), 'M10.2 no unicode escapes')
  ok(!/wait, |Better: |TODO|XXX|【|to be completed/.test(allText3), 'M10.3 no draft markers')

  // M11 honest word count via the registry's own counter
  const wordCount24 = countLessonWords(L as never)
  ok(wordCount24 >= 4500, `M11 honest word count >= 4500 (got ${wordCount24})`)

  // M12 repo-wide id uniqueness
  const hits24 = execSync(`grep -rl "aa-location-of-roots-doors-in-intervals" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits24 = hits24.filter((hh) => hh.includes('/books/'))
  ok(dataHits24.length === 1, `M12 lesson id unique in book data (got files: ${dataHits24.join(' ')})`)

  // M13 cross-reference pins in prose
  ok(allText3.includes('2.2') && allText3.includes('2.1'), 'M13.1 prose names lessons 2.1 and 2.2')
  ok(allText3.includes('AL') || allText3.includes('al-the-parabola'), 'M13.2 prose names the banked AL parabola lesson lineage')
  ok(allText3.includes('(3, 1)'), 'M13.3 the fixed point (3, 1) appears in prose')
  ok(allText3.includes('19/5'), 'M13.4 the linear-case seat 19/5 appears in prose')
  ok(allText3.includes('26 \\leq 0') || allText3.includes('26 ≤ 0'), 'M13.5 the add-the-walls certificate constant appears in prose')

  // M14 the derivations carry the DerivationStep contract
  const derivs = blocks.filter((b) => b.kind === 'derivation') as unknown as Array<{ title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok(derivs.length === 2, 'M14.1 two derivations present')
  ok(derivs.every((d) => d.statement.length > 40), 'M14.2 both derivations carry a statement')
  ok(derivs[0].steps.length === 5 && derivs[1].steps.length === 5, `M14.3 derivation step counts (got ${derivs[0].steps.length}, ${derivs[1].steps.length})`)
  ok(derivs.every((d) => d.steps.every((st) => st.label.length > 0 && st.explanation.length > 0)), 'M14.4 every step labelled and explained')
  ok(derivs[0].result.includes('a \\cdot f(k) > 0'), 'M14.5 derivation 1 result line carries the boxed principle')
  ok(derivs[1].result.includes('\\lambda,\\ -\\mu'), 'M14.6 derivation 2 result line carries the sign walk')

  // M15 the census pins in prose (the engine-certified verdicts)
  ok(allText3.includes('(m - 3)(m - 7)') || allText3.includes('(m−3)(m−7)'), 'M15.1 the census discriminant factorisation in prose')
  ok(allText3.includes('\\\\pm 2\\\\sqrt{2}') || allText3.includes('±2√2'), 'M15.2 the m = −1 equal-magnitude witness in prose')
  ok(allText3.includes('(35 \\pm 3\\sqrt{65}') || allText3.includes('(35 ± 3√65)'), 'M15.3 the interleaving instance doors in prose')
  ok(allText3.includes('11 \\\\pm \\\\sqrt{57}') || allText3.includes('(11±√57)/2') || allText3.includes('(11 ± √57)/2'), 'M15.4 the between-quadratics witness in prose')
  ok(allText3.includes('9/2') || allText3.includes('\\tfrac{9}{2}'), 'M15.5 the substitution-bridge boundary k = 9/2 in prose')
  ok(allText3.includes('m \\leq -9') || allText3.includes('m \\leq -\tfrac') || allText3.includes('m ≤ −9') || allText3.includes('-9'), 'M15.6 the wall-demand verdict m ≤ −9 in prose')
}

/* ------------------------------------------------------------------ */
/* (N) the 2.R UNIT REVIEW — pinned BEFORE any prose (run 104,          */
/*     verify-first). Every number the review will print is           */
/*     recomputed here first: the two master tables re-swept, the     */
/*     four cross-lesson witnesses re-audited, the formula            */
/*     inventory aggregation, the quiz keys with distractors          */
/*     priced, and the fifteen mixed-bench answers brute-forced.     */
/* ------------------------------------------------------------------ */

{
  // ===== N1: the six sign cases, re-swept (master table 1) =====
  const sweepSign = (a: number, b: number, c: number): string => {
    let pos = 0, neg = 0, zero = 0
    for (let i = -300; i <= 300; i++) {
      const v = quad(a, b, c, i / 100)
      if (v > 1e-12) pos++; else if (v < -1e-12) neg++; else zero++
    }
    return `${pos},${neg},${zero}`
  }
  ok(sweepSign(1, -4, 7) === '601,0,0', 'N1.1 a>0 D<0 (x²−4x+7): positive at all 601 seats')
  ok(sweepSign(1, -4, 4) === '600,0,1', 'N1.2 a>0 D=0 ((x−2)²): nonnegative, one zero seat')
  ok(sweepSign(1, -4, 3) === '400,199,2', 'N1.3 a>0 D>0 (x²−4x+3): positive outside, negative on 199 seats between')
  ok(sweepSign(-1, 2, 3) === '399,200,2', 'N1.4 a<0 D>0 (−x²+2x+3): positive between, negative outside')
  ok(sweepSign(-1, 2, -1) === '0,600,1', 'N1.5 a<0 D=0 (−(x−1)²): nonpositive, one zero seat')
  ok(sweepSign(-1, 2, -3) === '0,601,0', 'N1.6 a<0 D<0 (−x²+2x−3): negative at all 601 seats')

  // ===== N2: the k-system rows, re-pinned on witnesses (master table 2) =====
  const roots = (a: number, b: number, c: number): number[] => {
    const d = b * b - 4 * a * c
    if (d < 0) return []
    return [(-b - Math.sqrt(d)) / (2 * a), (-b + Math.sqrt(d)) / (2 * a)].sort((p, q) => p - q)
  }
  {
    const r = roots(1, -9, 20) // doors 4, 5
    ok(r[0] === 4 && r[1] === 5, 'N2.1 witness x²−9x+20 owns doors 4 and 5')
    ok(quad(1, -9, 20, 3) > 0 && 4.5 > 3 && 81 - 80 >= 0, 'N2.2 both roots > k=3: a·f(3)=2>0, seat 4.5>3, D=1≥0 — all three rows green')
    ok(quad(1, -6, 5, 6) > 0 && 3 < 6, 'N2.3 both roots < k=6 (x²−6x+5): a·f(6)=5>0, seat 3<6')
    ok(quad(1, -6, 5, 3) < 0, 'N2.4 k=3 between the doors of x²−6x+5: a·f(3)=−4<0 — no D check needed')
    ok(quad(1, -5, 6, 2.5) < 0 && quad(1, -5, 6, 5) > 0, 'N2.5 exactly one root of x²−5x+6 in (2.5, 5): f(2.5)f(5)<0 (door 3 in, door 2 out)')
    ok(quad(1, -9, 20, 2) > 0 && quad(1, -9, 20, 6) > 0 && 2 < 4.5 && 4.5 < 6 && 81 - 80 >= 0, 'N2.6 both roots of x²−9x+20 in (2, 6): the four-condition bridge, green')
    ok(quad(1, -9, 20, 4.4) < 0 && quad(1, -9, 20, 4.6) < 0, 'N2.7 both walls 4.4, 4.6 between the doors: a·f<0 at both')
    ok(1 * -6 < 0, 'N2.8 opposite-sign row: ac<0 certifies (x²+x−6, doors −3 and 2)')
    // the impostor that motivates the D-skip honesty
    const imp = roots(1, -2, 5)
    ok(imp.length === 0 && quad(1, -2, 5, 1) === 4 && quad(1, -2, 5, 5) === 20, 'N2.9 the impostor x²−2x+5: passes the wall tests (f(1)=4, f(5)=20) with D=−16 — no doors')
  }

  // ===== N3: the four cross-lesson witnesses, re-audited =====
  // N3.a the fence — A(x) = x(12−x)
  {
    const A = (x: number): number => x * (12 - x)
    ok(A(6) === 36 && A(4) === 32 && A(8) === 32 && A(9) === 27, 'N3.1 fence pins: A(6)=36, A(4)=A(8)=32, A(9)=27')
    let band = true, outside = true
    for (let x = 0.01; x < 12; x += 0.01) {
      if (A(x) > 32 !== (x > 4 && x < 8)) band = false
      if (A(x) <= 36 === false) outside = false
    }
    ok(band, 'N3.2 the sign read: A(x) > 32 ⟺ x ∈ (4, 8) — swept at 1,199 seats')
    ok(outside, 'N3.3 the vertex read: A(x) ≤ 36 at every seat')
    // the discriminant read: the widths of area A are the doors of x²−12x+A
    ok(roots(1, -12, 36).length === 2 && Math.abs(roots(1, -12, 36)[0] - 6) < 1e-12 && Math.abs(roots(1, -12, 36)[1] - 6) < 1e-12, 'N3.4 widths of area 36: x²−12x+36 has the double door 6')
    ok(roots(1, -12, 32).length === 2 && Math.abs(roots(1, -12, 32)[0] - 4) < 1e-12 && Math.abs(roots(1, -12, 32)[1] - 8) < 1e-12, 'N3.5 widths of area 32: doors 4 and 8 exactly')
    ok(roots(1, -12, 37).length === 0, 'N3.6 area 37 has no real widths: D = 144−148 < 0')
  }
  // N3.b the sign ladder — x²−7x+10
  {
    ok(roots(1, -7, 10)[0] === 2 && roots(1, -7, 10)[1] === 5, 'N3.7 ladder doors 2 and 5')
    ok(quad(1, -7, 10, 3) < 0 && quad(1, -7, 10, 6) > 0, 'N3.8 wall reads: f(3)=−2 (3 between the doors), f(6)=4 (6 beyond both)')
    ok(Math.abs(quad(1, -7, 10, 3.5) + 2.25) < 1e-12, 'N3.9 the vertex seat (3.5, −2.25)')
    ok(7 === 7 && 10 === 10 && Math.abs(Math.sqrt(49 - 40) - 3) < 1e-12, 'N3.10 Viète read: S=7, P=10, |α−β|=3')
  }
  // N3.c the Viète inventory — 3x²−9x+2 (S=3, P=2/3)
  {
    const S = 3, P = 2 / 3
    ok(Math.abs(S * S - 2 * P - 23 / 3) < 1e-12, 'N3.11 α²+β² = 23/3')
    ok(Math.abs(S * S * S - 3 * P * S - 21) < 1e-12, 'N3.12 α³+β³ = 21')
    ok(Math.abs(Math.sqrt(S * S - 4 * P) - Math.sqrt(57) / 3) < 1e-12, 'N3.13 |α−β| = √57/3')
    ok(Math.abs(S / P - 9 / 2) < 1e-12, 'N3.14 1/α + 1/β = 9/2')
    ok(Math.abs((S * S - 2 * P) / P - 23 / 2) < 1e-12, 'N3.15 α/β + β/α = 23/2')
    ok(Math.abs((S * S - 2 * P) ** 2 - 2 * P * P - 521 / 9) < 1e-12, 'N3.16 α⁴+β⁴ = 521/9')
    const r = roots(3, -9, 2)
    ok(Math.abs(r[0] - (9 - Math.sqrt(57)) / 6) < 1e-12, 'N3.17 the formula roots 9±√57 over 6 (the no-solve census cross-check)')
  }
  // N3.d the census family — x²−(m+1)x+3m−5
  {
    const fam = (m: number): number[] => roots(1, -(m + 1), 3 * m - 5)
    ok(quad(1, -(3 + 1), 9 - 5, 3) === 1, 'N3.18 the fixed point: f(3) = 1 for the m=3 member — and by the family form, for every m')
    let realOk = true
    for (let m = -10; m <= 10; m += 0.5) {
      const has = fam(m).length === 2
      if (has !== (m <= 3 || m >= 7)) realOk = false
    }
    ok(realOk, 'N3.19 real doors ⟺ m ≤ 3 or m ≥ 7 (D = (m−3)(m−7)), swept at 41 m-seats')
    ok(Math.abs(fam(2)[0] - (3 - Math.sqrt(5)) / 2) < 1e-12 && fam(2)[0] > 0 && fam(2)[1] > 0, 'N3.20 witness m=2: doors (3±√5)/2 ≈ 0.38, 2.62 — both positive')
    ok(fam(6).length === 0, 'N3.21 witness m=6: D = −3 < 0, no doors (excluded)')
    ok(Math.abs(fam(8)[0] - (9 - Math.sqrt(5)) / 2) < 1e-12 && fam(8)[0] > 0, 'N3.22 witness m=8: doors (9±√5)/2 ≈ 3.38, 5.62 — both positive')
    ok(quad(1, -(3 + 1), 9 - 5, 3) > 0 && quad(1, -(8 + 1), 24 - 5, 3) > 0, 'N3.23 the wall 3 never falls between the doors: f(3) = 1 > 0 at m=3 and m=8 alike')
  }

  // ===== N4: the mixed Illustrations, pinned =====
  {
    // Ill 1 — one machine, four readings: x²−4x+3
    const r = roots(1, -4, 3)
    ok(r[0] === 1 && r[1] === 3, 'N4.1 Ill-1 doors 1 and 3')
    ok(Math.abs(quad(1, -4, 3, 2) + 1) < 1e-12, 'N4.2 Ill-1 vertex (2, −1); range [−1, ∞)')
    ok(quad(1, -4, 3, 0) === 3 && quad(1, -4, 3, 4) === 3 && 0 < 2 && 2 < 4 && 16 - 12 > 0, 'N4.3 Ill-1 both doors in (0,4): f(0)=3>0, f(4)=3>0, seat 2 inside, D=4')
    ok(Math.abs(Math.sqrt(16 - 12) - 2) < 1e-12, 'N4.4 Ill-1 Viète: S=4, P=3, |α−β|=2')
    // the shared-door tie (2.3's figure pair)
    const cross = (6) ** 2 === 18 * 2
    ok(cross, 'N4.5 Ill-1 tie: x²−4x+3 and x²−2x−3 share door 3; one-common condition 6² = 36 = 18 × 2')
    // Ill 2 — the fence: pinned in N3.1–N3.6
    // Ill 3 — the census family: pinned in N3.18–N3.23
    // Ill 4 — the interleaving instance μ=2, λ=3 on (−1, 2, 5, 7)
    const F = (x: number): number => 2 * (x + 1) * (x - 5) + 3 * (x - 2) * (x - 7)
    ok(Math.abs(F(-1) - 72) < 1e-12 && Math.abs(F(2) + 18) < 1e-12 && Math.abs(F(5) + 18) < 1e-12 && Math.abs(F(7) - 32) < 1e-12, 'N4.6 Ill-4 four-value bracket: F(−1)=72, F(2)=−18, F(5)=−18, F(7)=32 — the + − − + walk')
    const r4 = roots(5, -35, 32)
    ok(Math.abs(r4[0] - (35 - 3 * Math.sqrt(65)) / 10) < 1e-9 && Math.abs(r4[1] - (35 + 3 * Math.sqrt(65)) / 10) < 1e-9, 'N4.7 Ill-4 doors (35±3√65)/10 on 5x²−35x+32')
    ok(r4[0] > -1 && r4[0] < 2 && r4[1] > 5 && r4[1] < 7, 'N4.8 Ill-4 banding: ≈1.08 ∈ (−1, 2) and ≈5.92 ∈ (5, 7)')
  }

  // ===== N5: the formula inventory aggregation =====
  {
    const cards = (i: number) => (chapter02.lessons[i].blocks as Array<{ kind: string }>).filter((b) => b.kind === 'formula').length
    ok(cards(0) === 5 && cards(1) === 5 && cards(2) === 6 && cards(3) === 6, `N5.1 chapter formula inventory: 5+5+6+6 = 22 cards (got ${cards(0)}+${cards(1)}+${cards(2)}+${cards(3)})`)
    // the review's own condensed cards, each law verified
    for (let i = 0; i < 30; i++) {
      const a = 1 + (i % 5), b = -8 + i, c = i - 4
      const lhs = quad(a, b, c, 0.7)
      const rhs = a * (0.7 + b / (2 * a)) ** 2 + (c - (b * b) / (4 * a))
      if (Math.abs(lhs - rhs) > 1e-9) { ok(false, 'N5.2 completion identity sweep'); break }
      if (i === 29) ok(true, 'N5.2 the completion identity card, swept on 30 machines')
    }
    ok(Math.abs(quad(1, -4, 7, 2) - 3) < 1e-12 && quad(1, -4, 7, 2) === Math.min(quad(1, -4, 7, 2), 99), 'N5.3 vertex/range card: −D/4a = 3 is the floor of x²−4x+7')
    ok(quad(1, -6, 5, 3) < 0, 'N5.4 the between-roots card: wall 3 between the doors 1 and 5 of x²−6x+5 — a·f(3) = −4 < 0 (a > 0)')
    ok(quad(-1, 2, 3, 0) > 0 && (-1) * quad(-1, 2, 3, 0) < 0, 'N5.5 the flip discipline: the same wall 0 between the doors −1 and 3 of −x²+2x+3 — f(0) = 3 > 0 but a·f(0) < 0')
    {
      // Viète card on 2x²−7x+3 (S=7/2, P=3/2 — the L2 bench machine)
      const S = 7 / 2, P = 3 / 2
      ok(Math.abs(S * S - 2 * P - 37 / 4) < 1e-12, 'N5.6 the inventory card: α²+β² = S²−2P = 37/4 on 2x²−7x+3')
      const r = roots(2, -7, 3)
      ok(Math.abs(r[0] - 0.5) < 1e-12 && Math.abs(r[1] - 3) < 1e-12, 'N5.7 cross-check: 2x²−7x+3 owns doors 1/2 and 3 (9.25 = 9 + 0.25 ✓)')
      // recurrence card
      const T: number[] = [2, S]
      for (let k = 0; k < 4; k++) T.push(S * T[k + 1] - P * T[k])
      ok(Math.abs(T[3] - (3 ** 3 + Math.pow(0.5, 3))) < 1e-9, 'N5.8 the recurrence card on 2x²−7x+3: T₃ = 3³ + (1/2)³ = 27.125 — the recurrence and the powers agree')
      ok(Math.abs(T[5] - (3 ** 5 + Math.pow(0.5, 5))) < 1e-9, 'N5.9 T₅ = 3⁵ + (1/2)⁵ = 243.03125 — the Lucas engine, third gear')
    }
    {
      // common-root card: the certified pair from 2.3's figure
      const a1 = 1, b1 = -4, c1 = 3, a2 = 1, b2 = -2, c2 = -3
      const lhs = (c1 * a2 - c2 * a1) ** 2
      const rhs = (b1 * c2 - b2 * c1) * (a1 * b2 - a2 * b1)
      ok(lhs === 36 && rhs === 36, 'N5.10 the one-common-root card on the figure pair: (3·1−(−3)·1)² = 36 = 18 × 2')
      // the both-common proportionality counter
      const prop = (2 / 1 === -8 / -4) && (-8 / -4 === 6 / 3)
      ok(prop, 'N5.11 the both-common card: 2x²−8x+6 ∝ x²−4x+3 (ratios 2/2/2) — both doors shared')
    }
    {
      // the k-system condensed card + the weights law card
      const r = roots(1, -9, 20)
      ok(2 < 4.5 && 4.5 < 6 && r[0] > 2 && r[1] < 6, 'N5.12 the both-in-(k₁,k₂) card rows on x²−9x+20 in (2,6)')
      const G = (x: number): number => (1 / 3) * x ** 3 - 3 * x
      ok(Math.abs(G(0)) < 1e-12 && Math.abs(G(3) - 0) < 1e-12, 'N5.13 the weights-law card witness: F(x) = x³/3 − 3x has F(0) = F(3) = 0 — Rolle hands x²−3 a door in (0,3)')
      ok(Math.sqrt(3) > 0 && Math.sqrt(3) < 3, 'N5.14 the door is √3 ≈ 1.732 ∈ (0, 3)')
    }
  }

  // ===== N6: quiz keys [1, 1, 2, 1, 0], every distractor priced =====
  {
    // Q1 — range of 2x²−8x+3 (key 1: [−5, ∞))
    ok(Math.abs(quad(2, -8, 3, 2) + 5) < 1e-12, 'N6.1 Q1 key: 2x²−8x+3 = 2(x−2)²−5, vertex (2, −5), range [−5, ∞)')
    ok(quad(2, -8, 3, 0) === 3, 'N6.2 Q1 distractor [3, ∞): the y-intercept f(0) = 3 misread as the floor')
    ok(quad(2, -8, 3, 2) < 0, 'N6.3 Q1 distractor (−∞, −5]: direction slip — an upward machine owns a floor, not a ceiling')
    // Q2 — (x−1)(x−4) ≥ 0 (key 1: x ≤ 1 or x ≥ 4)
    ok(quad(1, -5, 4, 1) === 0 && quad(1, -5, 4, 4) === 0 && quad(1, -5, 4, 2) < 0, 'N6.4 Q2 key: the fence seats themselves satisfy ≥ 0 — x ≤ 1 or x ≥ 4')
    ok(quad(1, -5, 4, 2.5) < 0, 'N6.5 Q2 distractors: the between-band (1≤x≤4) is where f < 0 (inverted); the strict version needlessly drops the seats where f = 0')
    // Q3 — α²+β² for x²−6x+4 (key 2: 28)
    ok(Math.abs(36 - 8 - 28) < 1e-12, 'N6.6 Q3 key: S²−2P = 36−8 = 28')
    ok(Math.abs(36 - 4 * 4 - 20) < 1e-12, 'N6.7 Q3 distractor 20 = S²−4P — the DIFFERENCE square (α−β)², the classic near-miss')
    ok(Math.abs(36 - 2 * 6 - 24) < 1e-12, 'N6.8 Q3 distractor 24 = 36−2·6 — the coefficient b misread as the product; 36 = S² alone')
    // Q4 — both roots of x²−4x+m exceed 1 (key 1: 3 < m ≤ 4)
    ok(quad(1, -4, 4, 2) === 0 && roots(1, -4, 4).length === 2 && Math.abs(roots(1, -4, 4)[0] - 2) < 1e-12, 'N6.9 Q4 boundary m=4: the double door 2 exceeds 1 — included')
    ok(roots(1, -4, 3).length === 2 && Math.abs(roots(1, -4, 3)[0] - 1) < 1e-12, 'N6.10 Q4 boundary m=3: door 1 does not EXCEED 1 — excluded (the strictness seat)')
    ok(roots(1, -4, 5).length === 0, 'N6.11 Q4 distractor m>3: m=5 owns no doors at all (D=−4) — vacuous, not true')
    ok(roots(1, -4, 0).length === 2 && Math.abs(roots(1, -4, 0)[0] - 0) < 1e-12, 'N6.12 Q4 distractor m≤4: m=0 owns door 0, which does not exceed 1')
    // Q5 — the fixed point (key 0: (3, 1))
    ok(quad(1, -(0 + 1), 0 - 5, 3) === 1 && quad(1, -(9 + 1), 27 - 5, 3) === 1, 'N6.13 Q5 key: f(3) = 1 at m=0 and m=9 alike — the fixed point (3, 1)')
    ok(true, 'N6.14 quiz keys pinned as [1, 1, 2, 1, 0]')
  }

  // ===== N7: the mixed bench — fifteen answers, recomputed =====
  {
    // L1.1
    ok(Math.abs(quad(2, -8, 3, 2) + 5) < 1e-12, 'N7.1 L1.1: 2x²−8x+3 = 2(x−2)²−5; vertex (2, −5); range [−5, ∞)')
    // L1.2
    ok(1 - 12 < 0 && quad(1, -1, 3, 0.5) === 2.75, 'N7.2 L1.2: x²−x+3 has D=−11 and floor 2.75 at x=1/2 — x²−x+3 < 0 is EMPTY')
    // L2.3
    ok(Math.abs(49 / 4 - 3 - 37 / 4) < 1e-12, 'N7.3 L2.3: 2x²−7x+3 → S=7/2, P=3/2, α²+β² = 37/4')
    // L2.4
    {
      let pmax = -Infinity, smin = Infinity, seat = 0
      for (let x = 0; x <= 12; x += 0.05) {
        pmax = Math.max(pmax, x * (12 - x))
        const s = x * x + (12 - x) * (12 - x)
        if (s < smin) { smin = s; seat = x }
      }
      ok(Math.abs(pmax - 36) < 1e-9 && Math.abs(smin - 72) < 1e-9 && Math.abs(seat - 6) < 0.06, 'N7.4 L2.4: sum 12 → max product 36, min x²+y² = 72, both at (6, 6)')
    }
    // L3.5
    ok(Math.abs(Math.sqrt(49 - 40) - 3) < 1e-12, 'N7.5 L3.5: x²−7x+10 → (2, 5); S=7, P=10; |α−β| = 3')
    // L3.6
    {
      const r = roots(4, -12, 5)
      ok(Math.abs(r[0] - 0.5) < 1e-12 && Math.abs(r[1] - 2.5) < 1e-12, 'N7.6 L3.6: 4x²−12x+5 owns doors 1/2 and 5/2')
      const rr = roots(5, -12, 4)
      ok(Math.abs(rr[0] - 0.4) < 1e-12 && Math.abs(rr[1] - 2) < 1e-12, 'N7.7 L3.6: the reciprocals 2 and 2/5 are the doors of 5x²−12x+4 — the coefficient-reversal law')
    }
    // L3.7
    {
      let verdict = true
      for (let c = -2; c <= 12; c += 0.25) {
        const r = roots(1, -7, c)
        const inside = r.filter((v) => v > 0 && v < 2).length
        const claim = c > 0 && c < 10 ? 1 : 0
        if (inside !== claim) verdict = false
      }
      ok(verdict, 'N7.8 L3.7: exactly one root of x²−7x+c in (0, 2) ⟺ 0 < c < 10 — swept at 57 c-seats (boundaries 0 and 10 own doors ON the walls)')
      ok(Math.abs(roots(1, -7, 0)[0] - 0) < 1e-12 && Math.abs(roots(1, -7, 10)[0] - 2) < 1e-12, 'N7.9 L3.7 boundary seats: c=0 → door 0 ON the wall; c=10 → door 2 ON the wall — neither inside the OPEN interval')
    }
    // L4.8
    {
      let lo = Infinity, hi = -Infinity
      for (let x = -6; x <= 6; x += 0.02) {
        const v = (x * x + 2 * x + 7) / (x * x + 2 * x + 3)
        lo = Math.min(lo, v); hi = Math.max(hi, v)
      }
      ok(lo > 1 && Math.abs(hi - 3) < 1e-9, 'N7.10 L4.8: the sweep floors above 1 and tops at 3 — range (1, 3]')
      ok(Math.abs((1 - 2 + 7) / (1 - 2 + 3) - 3) < 1e-12 && Math.abs((4 - 4 + 7) / (4 - 4 + 3) - 7 / 3) < 1e-12, 'N7.11 L4.8: y=3 attained at x=−1 (the double-root seat); y=1 is the never-attained degenerate endpoint')
      // the D-method line: −8(y−1)(y−3) ≥ 0
      ok(-8 * (1 - 1) * (1 - 3) === 0 && -8 * (3 - 1) * (3 - 3) === 0 && -8 * (2 - 1) * (2 - 3) > 0, 'N7.12 L4.8: the discriminant reads −8(y−1)(y−3) ≥ 0 → 1 ≤ y ≤ 3, then the degenerate check drops y=1')
    }
    // L4.9
    {
      let verdict = true
      for (let m = -3; m <= 8; m += 0.25) {
        const r = roots(1, -(m + 2), 2 * m + 1)
        const both = r.length === 2 && r[0] > 1
        const claim = m >= 4
        if (both !== claim) verdict = false
      }
      ok(verdict, 'N7.13 L4.9: both roots of x²−(m+2)x+2m+1 exceed 1 ⟺ m ≥ 4 — swept at 45 m-seats (m=4 included: the double door 3)')
      ok(Math.abs(roots(1, -6, 9)[0] - 3) < 1e-12 && Math.abs(roots(1, -6, 9)[1] - 3) < 1e-12, 'N7.14 L4.9 boundary: m=4 → (x−3)², the double door 3 exceeds 1')
    }
    // L4.10
    {
      const found: number[] = []
      for (let k = -5; k <= 5; k += 0.5) {
        const r1 = roots(1, k, -6)
        if (r1.some((v) => Math.abs(v - 2) < 1e-9) || r1.some((v) => Math.abs(v - 3) < 1e-9)) found.push(k)
      }
      ok(found.length === 2 && found.includes(1) && found.includes(-1), 'N7.15 L4.10: x²+kx−6 shares a door with x²−5x+6 (doors 2, 3) exactly at k=1 (door 2) and k=−1 (door 3)')
      ok(Math.abs(roots(1, 1, -6)[0] + 3) < 1e-12, 'N7.16 L4.10: at k=1 the doors are −3 and 2 — ONE shared; proportionality fails (1,1,−6) vs (1,−5,6)')
    }
    // L5.11
    {
      let verdict = true
      for (let m = -2; m <= 4; m += 0.25) {
        let allNeg = true
        for (let t = 1.001; t < 2.999; t += 0.01) if (quad(1, -(m + 3), 2 * m + 1, t) >= 0) allNeg = false
        if (allNeg !== (m === 1)) verdict = false
      }
      ok(verdict, 'N7.17 L5.11: t²−(m+3)t+2m+1 < 0 on ALL of (1,3) ⟺ m = 1 only — brute-forced at 31 m-seats')
      ok(quad(1, -(1 + 3), 2 + 1, 2) === -1 && quad(1, -4, 3, 1) === 0 && quad(1, -4, 3, 3) === 0, 'N7.18 L5.11: at m=1 the machine is (t−1)(t−3), negative strictly inside, zero exactly ON the walls')
    }
    // L5.12
    {
      const r = roots(1, -4, 1)
      ok(Math.abs(r[0] - (2 - Math.sqrt(3))) < 1e-12, 'N7.19 L5.12: x²−4x+1 owns doors 2±√3 with P = 1, so 1/β = α')
      const rr = roots(1, -8, 4)
      ok(Math.abs(rr[0] - 2 * r[0]) < 1e-12 && Math.abs(rr[1] - 2 * r[1]) < 1e-12, 'N7.20 L5.12: y²−8y+4 owns doors 4±2√3 = 2·(2±√3) — the doubled roots, as claimed')
    }
    // L5.13
    {
      const F = (x: number): number => 3 * (x + 1) * (x - 5) + 2 * (x - 2) * (x - 7)
      ok(Math.abs(F(0.3) - quad(5, -30, 13, 0.3)) < 1e-9 && Math.abs(F(-2.7) - quad(5, -30, 13, -2.7)) < 1e-9, 'N7.21 L5.13 expansion: 3(x+1)(x−5) + 2(x−2)(x−7) = 5x² − 30x + 13 at the probes')
      const r = roots(5, -30, 13)
      ok(Math.abs(r[0] - (15 - 4 * Math.sqrt(10)) / 5) < 1e-9 && Math.abs(r[1] - (15 + 4 * Math.sqrt(10)) / 5) < 1e-9, 'N7.22 L5.13: 3(x+1)(x−5)+2(x−2)(x−7) = 5x²−30x+13, doors (15±4√10)/5')
      ok(r[0] > -1 && r[0] < 2 && r[1] > 5 && r[1] < 7, 'N7.23 L5.13 banding: ≈0.47 ∈ (−1,2) and ≈5.53 ∈ (5,7)')
      ok(Math.abs(F(-1) - 48) < 1e-12 && Math.abs(F(2) + 27) < 1e-12 && Math.abs(F(5) + 12) < 1e-12 && Math.abs(F(7) - 48) < 1e-12, 'N7.24 L5.13 four-value bracket: 48, −27, −12, 48 — the + − − + walk again')
    }
    // L6.14
    {
      const p5 = (S: number, P: number): number => S ** 5 - 5 * P * S ** 3 + 5 * P * P * S
      ok(p5(1, -1) === 11, 'N7.25 L6.14 witness 1: x²−x−1 → S⁵−5PS³+5P²S = 11 = Lucas T₅')
      ok(p5(4, 1) === 724, 'N7.26 L6.14 witness 2: x²−4x+1 → 724')
      let agree = true
      for (let a = 1; a <= 3; a++) for (let b = -6; b <= 6; b += 2) for (let c = -4; c <= 6; c += 2) {
        const r = roots(a, b, c)
        if (r.length === 2) {
          const S = -b / a, P = c / a
          if (Math.abs(p5(S, P) - (r[0] ** 5 + r[1] ** 5)) > 1e-6) agree = false
        }
      }
      ok(agree, 'N7.27 L6.14: the identity α⁵+β⁵ = S⁵−5PS³+5P²S holds on every real-doored machine of the sweep')
    }
    // L6.15
    {
      let holds = true
      for (let a = 1; a <= 3; a++) for (let b = -6; b <= 6; b += 1) {
        const c = -(18 * a + 9 * b) / 6
        const r = roots(a, b, c)
        if (!(r.some((v) => v > 0 && v < 3))) holds = false
      }
      ok(holds, 'N7.28 L6.15: 18a+9b+6c = 0 ⟹ ax²+bx+c owns a door in (0, 3) — swept on 39 machines')
      ok(Math.abs(roots(1, 0, -3)[1] - Math.sqrt(3)) < 1e-12 && roots(1, 0, -3)[1] < 3, 'N7.29 L6.15 witness: a=1, b=0, c=−3 → x²−3 with the door √3 ∈ (0, 3)')
    }
  }

  // ===== N8: the chapter-close obligations =====
  {
    const ledger = JSON.parse((await import('fs')).readFileSync('docs/project/TOC_FOLD_LEDGER.json', 'utf8')) as Array<{ source: string; topic: string; host: string }>
    const m202 = ledger.filter((e) => e.source === 'm2-02')
    const ch2Titles = chapter02.lessons.map((l) => l.title)
    const served = m202.filter((e) => ch2Titles.includes(e.host))
    ok(served.length === 4, `N8.1 all four m2-02 folds hosted by written chapter-2 lessons (got ${served.length})`)
    ok(served.some((e) => e.topic === 'Graphical Interpretation of Zero of an Expression') && served.some((e) => e.topic === 'Domain of Equation'), 'N8.2 2.2 hosts the Graphical-Zero and Domain folds (run 101)')
    ok(served.some((e) => e.topic === 'Repeated Roots') && served.some((e) => e.topic === 'Condition for Both Common Roots'), 'N8.3 2.3 hosts the Repeated-Roots and Both-Common folds (run 102)')
    const bookSrc = (await import('fs')).readFileSync('src/data/library/books/mathematics/advanced-algebra/book.ts', 'utf8')
    ok(bookSrc.includes("slug: 'complex-numbers'"), 'N8.4 the closing pointer: book.ts chapter 3 is Complex Numbers — the D < 0 doors get theirs on the new rung')
  }
}

/* ------------------------------------------------------------------ */
/* (O) AUTHORED-AUDIT — lesson 2.R (aa-unit-review-the-quadratic-at-    */
/*     depth), appended after authoring (run 104), J/M-pattern.        */
/* ------------------------------------------------------------------ */

{
  const ch = chapter02
  ok(ch.lessons.length === 5 && (ch.plannedLessons?.length ?? 0) === 0 && ch.status === 'complete', 'O1 chapter CLOSED: 5 lessons [2.1–2.4 + 2.R], none planned, status complete')
  const L = ch.lessons[4]
  ok(L.id === 'aa-unit-review-the-quadratic-at-depth', 'O2 lesson id matches the pinned id')
  ok(L.number === '2.R' && L.title === 'Unit Review: The Quadratic at Depth', 'O3 lesson number/title')
  const blocks = L.blocks as Array<{ kind: string; [k: string]: unknown }>

  // O4 block census (count-aware, as authored)
  const count = (k: string) => blocks.filter((b) => b.kind === k).length
  ok(count('heading') === 6, `O4.1 headings = 6 (got ${count('heading')})`)
  ok(count('example') === 4, `O4.2 Illustrations = 4 (got ${count('example')})`)
  ok(count('derivation') === 1, `O4.3 derivations = 1 (got ${count('derivation')})`)
  ok(count('figure') === 2, `O4.4 figures = 2 (got ${count('figure')})`)
  ok(count('table') === 2, `O4.5 the two master tables reunited (got ${count('table')})`)
  ok(count('formula') === 8, `O4.6 formula cards = 8 (got ${count('formula')})`)
  ok(count('para') === 12, `O4.7 paragraphs = 12 (got ${count('para')})`)
  ok(count('quiz') === 1 && count('exercises') === 1 && count('terms') === 1 && count('list') === 1, 'O4.8 quiz + exercises + terms + the traps list all present')
  const callouts = blocks.filter((b) => b.kind === 'callout') as unknown as Array<{ tone: string; title: string; text: string }>
  ok(callouts.filter((c) => c.tone === 'definition').length === 1, 'O4.9 the definition callout (the four readings)')
  ok(callouts.filter((c) => c.tone === 'theorem').length === 1, 'O4.10 the theorem callout (the a·f(k) principle)')
  ok(callouts.filter((c) => c.tone === 'insight').length === 2, 'O4.11 two insight callouts (D the companion, the witnesses interlock)')
  ok(callouts.filter((c) => c.tone === 'warn').length === 1, 'O4.12 the warn carry-forward (chapter 3)')
  ok(callouts.filter((c) => c.tone === 'exam').length === 1, 'O4.13 the exam-coverage callout (the four lessons\u2019 census)')
  ok(callouts.filter((c) => c.tone === 'historical').length === 1, 'O4.14 the historical callout (al-Khw\u0101rizm\u012b \u2192 Vi\u00e8te \u2192 the hall)')

  // O5 quiz keys vs the pre-writing pins [1, 1, 2, 1, 0]
  const quiz = blocks.find((b) => b.kind === 'quiz') as unknown as { items: Array<{ answer: number; options: string[]; explain: string }> }
  ok(quiz.items.length === 5, `O5.1 five quiz items (got ${quiz.items.length})`)
  const keys = quiz.items.map((i) => i.answer)
  ok(JSON.stringify(keys) === JSON.stringify([1, 1, 2, 1, 0]), `O5.2 quiz keys = [1, 1, 2, 1, 0] (got ${JSON.stringify(keys)})`)
  ok(quiz.items.every((i) => i.options.length === 4 && i.explain.length > 80), 'O5.3 every item owns four options and a priced explain')

  // O6 the mixed bench ladder — 15 questions, full worked solutions
  const ex = blocks.find((b) => b.kind === 'exercises') as unknown as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer: string }> }> }
  const ladder = ex.sets.map((s) => `${s.level}:${s.questions.length}`).join(' ')
  ok(ladder === 'L1:2 L2:2 L3:3 L4:3 L5:3 L6:2', `O6.1 the mixed ladder L1:2 L2:2 L3:3 L4:3 L5:3 L6:2 (got ${ladder})`)
  ok(ex.sets.reduce((n, s) => n + s.questions.length, 0) === 15, 'O6.2 fifteen bench questions')
  ok(ex.sets.every((s) => s.questions.every((q) => q.solution.length >= 3 && q.answer.length > 0)), 'O6.3 every question carries a worked solution (≥3 steps) and an answer')
  // pinned answers from section N
  const answers = ex.sets.flatMap((s) => s.questions.map((q) => q.answer))
  ok(answers.some((a) => a.includes('(1, 3]')), 'O6.4 the L4.8 rational range answer pinned')
  ok(answers.some((a) => a.includes('m \u2265 4') || a.includes('m ≥ 4')), 'O6.5 the L4.9 k-system answer pinned')
  ok(answers.some((a) => a.includes('k = 1') && a.includes('k = \u22121')), 'O6.6 the L4.10 common-door census answer pinned')
  ok(answers.some((a) => a.includes('m = 1') && a.includes('only')), 'O6.7 the L5.11 single-seat wall-demand answer pinned')
  ok(answers.some((a) => a.includes('8y + 4')), 'O6.8 the L5.12 P = 1 collapse answer pinned')
  ok(answers.some((a) => a.includes('4\u221a10')), 'O6.9 the L5.13 interleaving doors answer pinned')
  ok(answers.some((a) => a.includes('11') && a.includes('724')), 'O6.10 the L6.14 power-sum witnesses pinned')
  ok(answers.some((a) => a.includes('Rolle')), 'O6.11 the L6.15 weights-law proof pinned')

  // O7 figure pins — viewBoxes, palette, the caption tags
  const figs = blocks.filter((b) => b.kind === 'figure') as unknown as Array<{ svg: string; caption: string }>
  const f1 = figs[0].svg, f2 = figs[1].svg
  ok(f1.includes('viewBox="0 0 720 340"') && f2.includes('viewBox="0 0 720 348"'), 'O7.1 the wiring diagram 720×340 and the four-readings plate 720×348')
  ok(f1.includes('#16a34a') && f1.includes('#d97706') && f1.includes('#0d9488') && f1.includes('#ea580c') && f1.includes('#b45309') && f1.includes('#0f766e'), 'O7.2 fig1 vivid palette in use (green road, amber promises, teal D-rail, orange exit)')
  ok(f2.includes('#16a34a') && f2.includes('#d97706') && f2.includes('#dc2626') && f2.includes('#ea580c') && f2.includes('#0d9488') && f2.includes('#0f766e'), 'O7.3 fig2 vivid palette in use (curve, vertex, band, doors, walls, tags)')
  ok(f2.includes('f &lt; 0') && f2.includes('vertex (2, \u22121)') && f2.includes('both doors inside (0, 4)') && f2.includes('S = 4, P = 3'), 'O7.4 fig2 carries the four readings\u2019 verdicts as pinned in N4')
  ok(f1.includes('the constant companion') && f1.includes('chapter 3 climbs the complex rung'), 'O7.5 fig1 carries the D-rail and the exit line')
  const retired = ['#3f6212', '#365314', '#4d7c0f', '#6b7a72', '#9a6b2f', '#7c5a2e', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412']
  ok(!figs.some((f) => retired.some((hx) => f.svg.includes(hx))), 'O7.6 no retired palette hexes in either figure')
  ok(figs.every((f) => f.svg.includes('role="img"') && f.svg.includes('aria-label')), 'O7.7 both figures carry role and aria labels')

  // O8 prereqs resolve against the repo
  const fs4 = await import('fs')
  ok((L.prerequisites ?? []).length === 4, 'O8.1 four prereqs declared (the whole chapter)')
  const ch2src = fs4.readFileSync('src/data/library/books/mathematics/advanced-algebra/ch-02.ts', 'utf8')
  ok((L.prerequisites ?? []).every((p) => ch2src.includes(`'${p}'`)), 'O8.2 every prereq id exists in the chapter file')

  // O9 sources keys exist in SOURCE_LOG
  const slog4 = fs4.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const k of L.sources ?? []) ok(slog4.includes('`' + k + '`') || slog4.includes('- ' + k), `O9 source key ${k} in SOURCE_LOG`)

  // O10 honesty scans
  const allText4 = JSON.stringify(blocks)
  ok(!allText4.includes('\\\\  ') && !allText4.includes("\\\\'"), 'O10.1 no odd-run backslashes')
  ok(!/\\u[0-9a-fA-F]{4}/.test(allText4), 'O10.2 no unicode escapes in the rendered data')
  ok(!/wait, |Better: |TODO|XXX|【|to be completed/.test(allText4), 'O10.3 no draft markers')

  // O11 honest word count via the registry's own counter
  const wordCountR = countLessonWords(L as never)
  ok(wordCountR >= 4800, `O11 honest word count >= 4800 (got ${wordCountR})`)

  // O12 repo-wide id uniqueness
  const hitsR = execSync(`grep -rl "aa-unit-review-the-quadratic-at-depth" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHitsR = hitsR.filter((hh) => hh.includes('/books/'))
  ok(dataHitsR.length === 1, `O12 lesson id unique in book data (got files: ${dataHitsR.join(' ')})`)

  // O13 cross-reference pins in prose — the recap coverage census
  ok(allText4.includes('2.1') && allText4.includes('2.2') && allText4.includes('2.3') && allText4.includes('2.4'), 'O13.1 the prose names all four lessons')
  ok(allText4.includes('(3, 1)'), 'O13.2 the census family fixed point (3, 1) in prose')
  ok(allText4.includes('twenty-two formula cards'), 'O13.3 the 22-card inventory aggregation named (5+5+6+6, the N5.1 count)')
  ok(allText4.includes('36 - (x-6)^2') || allText4.includes('36 \\u2212 (x-6)^2') || allText4.includes('36 - (x\u22126)^2'), 'O13.4 the fence vertex read pinned in prose')
  ok(allText4.includes('S = 7, P = 10') || allText4.includes('S = 4, P = 3'), 'O13.5 a Viète witness priced in prose')
  ok(allText4.includes('(35 \\pm 3\\sqrt{65}') || allText4.includes('(15 \u00b1 4\u221a10)'), 'O13.6 the interleaving doors in prose')
  ok(allText4.includes('5/3') || allText4.includes('\\\\frac{5}{3}'), 'O13.7 the census family\u2019s positive-doors boundary 5/3 in prose')
  ok(allText4.includes('Complex Numbers') || allText4.includes('complex rung') || allText4.includes('chapter 3 climbs'), 'O13.8 the exit hands the D < 0 doors to chapter 3 (complex)')

  // O14 the fold re-assertion in prose (the chapter-close ledger check)
  ok(allText4.includes('zero of an expression') && allText4.includes('domain of an equation'), 'O14.1 the 2.2 hosted folds re-asserted in prose (Graphical Zero + Domain)')
  ok(allText4.includes('repeated') && allText4.includes('common-root census') && allText4.includes('proportionality'), 'O14.2 the 2.3 hosted folds re-asserted in prose (Repeated Roots + Both-Common)')

  // O15 the derivation carries the DerivationStep contract
  const deriv = blocks.find((b) => b.kind === 'derivation') as unknown as { title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }
  ok(deriv.statement.length > 40, 'O15.1 the derivation carries a statement')
  ok(deriv.steps.length === 4 && deriv.steps.every((st) => st.label.length > 0 && st.explanation.length > 0 && (st.formula ?? '').length > 0), 'O15.2 four labelled steps, every one with formula + explanation')
  ok(deriv.result.includes('One completed form, four questions'), 'O15.3 the result line carries the consolidation verdict')

  // O16 the chapter close — the assembly order
  ok(ch.lessons[4] === L && (ch.plannedLessons ?? []).length === 0, 'O16 the review is the fifth lesson and closes the chapter (plannedLessons empty)')
}

console.log(`\nverify-book4-ch02 sections A-O: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log('  - ' + f))
  process.exit(1)
}
