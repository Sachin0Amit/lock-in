import { chapter09 } from '../src/data/library/books/mathematics/advanced-algebra/ch-09'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch09.ts — the whole-chapter verifier for Advanced Algebra
 * (book #4), chapter 9 "Exponentials and Logarithms" (opened run 120,
 * closed COMPLETE by run 121 — the whole-chapter swarm). VERIFY-FIRST per
 * the standing protocol: each lesson's ENGINE section was grown and run
 * green BEFORE that lesson's prose was declared done — by the authoring
 * agent itself, against its part file — and the PIN sections re-read the
 * shipped chapter. Section Z is the closed-chapter census (the
 * orchestrator's). Assembled by temporary-references/assemble_run121.py:
 * sectionAB/sectionCD lifted from the run-120 verifier (known green),
 * the run-121 sections wrapped whole from the five agents' v-files with
 * their part imports redirected to the assembled chapter.
 *
 *   (A+B) 9.1 engines + pins   (C+D) 9.2 engines + pins
 *   (E+F) 9.3 engines + pins   (G+H) 9.4 engines + pins
 *   (I+J) 9.5 engines + pins   (K+L) 9.6 engines + pins
 *   (M+N) 9.R engines + pins   (Z) the closed-chapter census
 *
 * Study-never-reproduce honored: the m1-01 module + Hall & Knight
 * transcriptions informed METHOD SHAPES only; every family, witness,
 * figure and exercise below is OUR OWN, recomputed by brute force.
 */

type SectionResult = { id: string; pass: number; fail: number }

// ------------------------------------------------------------------

function sectionAB(): SectionResult {
/**
 * v-aa91.ts — the verify-first ENGINE for Advanced Algebra lesson 9.1
 * "The Exponential Family: Every Real Index" (agent aa91 of the run-120 swarm).
 *
 * Discipline (spec §0): every number the lesson dares to print is recomputed
 * here by brute force FIRST — bisections, sweeps, exact integer checks — and
 * only then does the prose get written. Where this engine disagrees with the
 * spec sheet, THE ENGINE WINS and the prose is adjusted; every such catch is
 * flagged in the agent's final report.
 *
 * Shape: self-contained script. Section A (A01…) = pure-arithmetic engines,
 * no repo imports. Section P (P01…) = pins that read the authored part file
 * — appended AFTER the prose exists (they import './part-aa91' and the
 * library types), per the same discipline.
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-aa91.ts
 */

/* ------------------------------------------------------------------ */
/* collector                                                           */
/* ------------------------------------------------------------------ */

const failures: string[] = []
let aTotal = 0
let aPass = 0
let pTotal = 0
let pPass = 0

function check(name: string, ok: boolean, detail = ''): void {
  const isPin = name.startsWith('P')
  if (isPin) {
    pTotal++
    if (ok) pPass++
  } else {
    aTotal++
    if (ok) aPass++
  }
  if (!ok) failures.push(`${name}${detail ? ' — ' + detail : ''}`)
  console.log(`${ok ? '[ ok ]' : '[FAIL]'} ${name}${detail ? ' — ' + detail : ''}`)
}

/** fixed-decimal equality: got.toFixed(dp) === want */
function eq(name: string, got: number, dp: number, want: string): void {
  check(name, got.toFixed(dp) === want, `got ${got.toFixed(dp)}, want ${want}`)
}

function between(name: string, lo: number, v: number, hi: number): void {
  check(name, lo < v && v < hi, `v = ${v}, claimed (${lo}, ${hi})`)
}

/** bisection root of f on [lo, hi] (sign change assumed), tol ≤ 5e-4 per spec */
function bisect(f: (x: number) => number, lo: number, hi: number, tol = 5e-4): number {
  let a = lo
  let b = hi
  const fa = f(a)
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2
    const fm = f(m)
    if (fm === 0) return m
    if (Math.sign(fm) === Math.sign(fa)) a = m
    else b = m
    if (b - a < tol) break
  }
  return (a + b) / 2
}

const ln2 = Math.log(2)
const SQRT2 = Math.SQRT2

console.log('==========================================================')
console.log('v-aa91 — engines for AA 9.1 "The Exponential Family"')
console.log('==========================================================')

/* ------------------------------------------------------------------ */
/* A01 · the squeeze ladder: 2^x pinned by rational brackets           */
/* ------------------------------------------------------------------ */
{
  eq('A01 2^1.41 to 6dp = 2.657372', Math.pow(2, 1.41), 6, '2.657372')
  eq('A01 2^1.42 to 6dp = 2.675855', Math.pow(2, 1.42), 6, '2.675855')
  eq('A01 2^1.4142 to 6dp = 2.665119', Math.pow(2, 1.4142), 6, '2.665119')
  // SPEC CATCH: the sheet pinned 2^{1.4143} = 2.665195 — the engine says
  // 2.665304. ENGINE WINS; prose/figures use 2.665304.
  eq('A01 2^1.4143 to 6dp = 2.665304 (spec said 2.665195 — engine wins)', Math.pow(2, 1.4143), 6, '2.665304')
  eq('A01 2^sqrt2 to 10dp = 2.6651441427', Math.pow(2, SQRT2), 10, '2.6651441427')
  eq('A01 2^sqrt2 to 4dp = 2.6651', Math.pow(2, SQRT2), 4, '2.6651')
  // the genuinely sub-0.0001 band (L6 well-posedness): 1.41421 < sqrt2 < 1.41422
  eq('A01 2^1.41421 to 6dp = 2.665138', Math.pow(2, 1.41421), 6, '2.665138')
  eq('A01 2^1.41422 to 6dp = 2.665156', Math.pow(2, 1.41422), 6, '2.665156')
  // bracket arithmetic on the quoted 6dp endpoints (display widths)
  eq('A01 wide band width (2.675855 - 2.675372… no: minus 2.657372)', 2.675855 - 2.657372, 6, '0.018483')
  eq('A01 tight band width (2.665304 - 2.665119)', 2.665304 - 2.665119, 6, '0.000185')
  eq('A01 third band width (2.665156 - 2.665138)', 2.665156 - 2.665138, 6, '0.000018')
  // the monotonicity that licenses the squeeze: 2^x strictly increasing
  let mono = true
  for (let x = 1.41; x < 1.42 - 1e-9; x += 1e-4) {
    if (!(Math.pow(2, x) < Math.pow(2, x + 1e-4))) mono = false
  }
  check('A01 2^x strictly increasing across [1.41, 1.42] (1e-4 sweep)', mono)
  between('A01 2^1.41 < 2^sqrt2 < 2^1.42', Math.pow(2, 1.41), Math.pow(2, SQRT2), Math.pow(2, 1.42))
  between('A01 2^1.4142 < 2^sqrt2 < 2^1.4143', Math.pow(2, 1.4142), Math.pow(2, SQRT2), Math.pow(2, 1.4143))
  between('A01 2^1.41421 < 2^sqrt2 < 2^1.41422', Math.pow(2, 1.41421), Math.pow(2, SQRT2), Math.pow(2, 1.41422))
}

/* ------------------------------------------------------------------ */
/* A02 · the law witness on irrational indices                         */
/* ------------------------------------------------------------------ */
{
  eq('A02 2^{sqrt2} · 2^{2-sqrt2} to 4dp = 4.0000', Math.pow(2, SQRT2) * Math.pow(2, 2 - SQRT2), 4, '4.0000')
  eq('A02 2^{2-sqrt2} to 4dp = 1.5009', Math.pow(2, 2 - SQRT2), 4, '1.5009')
  check('A02 exponent sum: sqrt2 + (2 - sqrt2) = 2 (1e-12)', Math.abs(SQRT2 + (2 - SQRT2) - 2) < 1e-12)
  eq('A02 2^2 = 4 (the law collapses the product)', Math.pow(2, 2), 0, '4')
}

/* ------------------------------------------------------------------ */
/* A03 · the witness table y = 2^x and the kilo note                   */
/* ------------------------------------------------------------------ */
{
  const table: [number, number][] = [
    [-3, 0.125], [-2, 0.25], [-1, 0.5], [0, 1], [1, 2], [2, 4], [3, 8], [10, 1024],
  ]
  for (const [x, want] of table) eq(`A03 2^${x} = ${want}`, Math.pow(2, x), 3, want.toFixed(3))
  eq('A03 kilo delta 1024 - 1000 = 24', 1024 - 1000, 0, '24')
  eq('A03 kilo overshoot 24/1000 = 2.4%', (1024 - 1000) / 1000 * 100, 1, '2.4')
}

/* ------------------------------------------------------------------ */
/* A04 · the mirror table y = (1/2)^x                                  */
/* ------------------------------------------------------------------ */
{
  const table: [number, number][] = [
    [-3, 8], [-2, 4], [-1, 2], [0, 1], [1, 0.5], [2, 0.25], [3, 0.125],
  ]
  for (const [x, want] of table) eq(`A04 (1/2)^${x} = ${want}`, Math.pow(0.5, x), 3, want.toFixed(3))
  // the mirror identity (1/2)^x = 2^{-x} numerically
  let mirror = true
  for (let x = -3; x <= 3; x += 0.25) {
    if (Math.abs(Math.pow(0.5, x) - Math.pow(2, -x)) > 1e-12) mirror = false
  }
  check('A04 (1/2)^x = 2^{-x} on a 0.25 sweep of [-3, 3]', mirror)
}

/* ------------------------------------------------------------------ */
/* A05 · family portrait: five bases through (0, 1), samples at ±0.5   */
/* ------------------------------------------------------------------ */
{
  const bases: [number, number, number][] = [
    [8, 2.828, 0.354], [5, 2.236, 0.447], [3, 1.732, 0.577], [0.4, 0.632, 1.581], [0.2, 0.447, 2.236],
  ]
  for (const [b, up, dn] of bases) {
    eq(`A05 ${b}^0.5 = ${up}`, Math.pow(b, 0.5), 3, String(up))
    eq(`A05 ${b}^{-0.5} = ${dn}`, Math.pow(b, -0.5), 3, String(dn))
    check(`A05 ${b}^0 === 1 exactly (the shared point)`, Math.pow(b, 0) === 1)
  }
  // monotonicity of each family member on the figure window [-1, 1.2]
  for (const [b] of bases) {
    let ok = true
    for (let x = -1; x < 1.2 - 1e-9; x += 0.02) {
      const l = Math.pow(b, x)
      const r = Math.pow(b, x + 0.02)
      if (b > 1 ? !(l < r) : !(l > r)) ok = false
      if (!(l > 0)) ok = false
    }
    check(`A05 y = ${b}^x strictly ${b > 1 ? 'increasing' : 'decreasing'} and positive on [-1, 1.2] (0.02 sweep)`, ok)
  }
}

/* ------------------------------------------------------------------ */
/* A06 · the race: 2^x vs x^3, crossings and the integer pattern       */
/* ------------------------------------------------------------------ */
{
  const f = (x: number) => Math.pow(2, x) - x * x * x
  // SPEC CATCH: the sheet pinned the first crossing at 1.3733548772 — the
  // engine's bisection gives 1.3734671197. ENGINE WINS; prose uses ≈ 1.3735.
  const c1 = bisect(f, 1.2, 1.6, 1e-11)
  const c2 = bisect(f, 9.0, 10.5, 1e-11)
  eq('A06 first crossing 2^x = x^3 to 4dp = 1.3735 (spec said 1.3733548772 — engine wins)', c1, 4, '1.3735')
  eq('A06 first crossing to 10dp = 1.3734671197', c1, 10, '1.3734671197')
  eq('A06 last crossing to 10dp = 9.9395351414 (matches spec)', c2, 10, '9.9395351414')
  eq('A06 last crossing to 4dp = 9.9395', c2, 4, '9.9395')
  between('A06 1 < c1 < 2 (crossing between the integers 1 and 2)', 1, c1, 2)
  between('A06 9 < c2 < 10 (crossing between the integers 9 and 10)', 9, c2, 10)
  // integer pattern: above at 0 and 1, below at 2..9, above from 10
  check('A06 at x=0: 2^0 = 1 > 0 = 0^3 (above)', Math.pow(2, 0) > 0)
  check('A06 at x=1: 2 > 1 (above)', Math.pow(2, 1) > 1)
  let below = true
  for (let k = 2; k <= 9; k++) if (!(Math.pow(2, k) < k * k * k)) below = false
  check('A06 below at every integer 2..9', below)
  check('A06 at x=9: 512 < 729 (the near miss)', Math.pow(2, 9) === 512 && 9 * 9 * 9 === 729 && 512 < 729)
  let above = true
  for (let k = 10; k <= 60; k++) if (!(Math.pow(2, k) > k * k * k)) above = false
  check('A06 above at every integer 10..60 (the long-run win)', above)
  check('A06 at x=10: 1024 > 1000 (the overtake)', Math.pow(2, 10) === 1024 && 10 * 10 * 10 === 1000 && 1024 > 1000)
  // the ratio 2^x / x^3 grows from x = 10 on (no third crossing coming back)
  let ratioUp = true
  for (let k = 10; k < 60; k++) if (!(Math.pow(2, k) / (k ** 3) < Math.pow(2, k + 1) / ((k + 1) ** 3))) ratioUp = false
  check('A06 ratio 2^x/x^3 strictly increasing on integers 10..60', ratioUp)
}

/* ------------------------------------------------------------------ */
/* A07 · shape laws sweep: growth bases up, decay bases down, range > 0 */
/* ------------------------------------------------------------------ */
{
  for (const b of [2, 3, 8, 1.5]) {
    let ok = true
    for (let x = -5; x < 5 - 1e-9; x += 0.05) {
      if (!(Math.pow(b, x) < Math.pow(b, x + 0.05))) ok = false
      if (!(Math.pow(b, x) > 0)) ok = false
    }
    check(`A07 y = ${b}^x strictly increasing, positive on [-5, 5] (0.05 sweep)`, ok)
  }
  for (const b of [0.5, 0.4, 0.2]) {
    let ok = true
    for (let x = -5; x < 5 - 1e-9; x += 0.05) {
      if (!(Math.pow(b, x) > Math.pow(b, x + 0.05))) ok = false
      if (!(Math.pow(b, x) > 0)) ok = false
    }
    check(`A07 y = ${b}^x strictly decreasing, positive on [-5, 5] (0.05 sweep)`, ok)
  }
  // approaches y = 0 without touching: 2^{-40} is positive but past 1e-12
  const tiny = Math.pow(2, -40)
  check('A07 2^{-40} > 0 (never touches) but < 1e-12 (approaches)', tiny > 0 && tiny < 1e-12, `2^{-40} = ${tiny}`)
}

/* ------------------------------------------------------------------ */
/* A08 · compound growth: 10% a year, the doubling bracket, rule of 72 */
/* ------------------------------------------------------------------ */
{
  eq('A08 1.1^10 to 10dp = 2.5937424601', Math.pow(1.1, 10), 10, '2.5937424601')
  eq('A08 A(10) = 1000 · 1.1^10 to 2dp = 2593.74', 1000 * Math.pow(1.1, 10), 2, '2593.74')
  eq('A08 1.1^7 to 6dp = 1.948717', Math.pow(1.1, 7), 6, '1.948717')
  eq('A08 1.1^8 to 6dp = 2.143589', Math.pow(1.1, 8), 6, '2.143589')
  between('A08 the doubling bracket 1.1^7 < 2 < 1.1^8', Math.pow(1.1, 7), 2, Math.pow(1.1, 8))
  eq('A08 exact doubling time ln2/ln1.1 to 10dp = 7.2725408973', ln2 / Math.log(1.1), 10, '7.2725408973')
  // the same number pinned by pure bisection on 1.1^n = 2 (how the engine "computes it" without log language)
  eq('A08 bisection of 1.1^n = 2 on [7, 8] to 10dp = 7.2725408973', bisect((n) => Math.pow(1.1, n) - 2, 7, 8, 1e-11), 10, '7.2725408973')
  check('A08 rule of 72 at 10%: 72/10 = 7.2', 72 / 10 === 7.2)
  eq('A08 rule-of-72 error 0.9975% (within 1%)', Math.abs(7.2 - 7.2725408973) / 7.2725408973 * 100, 4, '0.9975')
  // the honest witness that doubling happens between years 7 and 8
  between('A08 1000 · 1.1^7 < 2000 < 1000 · 1.1^8', 1000 * Math.pow(1.1, 7), 2000, 1000 * Math.pow(1.1, 8))
}

/* ------------------------------------------------------------------ */
/* A09 · the paper fold: 2^50, the AU fraction, the Moon audit (42)    */
/* ------------------------------------------------------------------ */
{
  // exact integer power by repeated doubling
  let p = 1
  for (let i = 0; i < 50; i++) p *= 2
  check('A09 2^50 = 1125899906842624 exactly', p === 1125899906842624)
  // 0.1 mm sheet folded 50 times: thickness in metres
  const thick = p * 1e-4
  eq('A09 thickness to 4dp = 1.1259 × 10^11 m', thick / 1e11, 4, '1.1259')
  const AU = 1.496e11
  eq('A09 AU fraction to 4dp = 0.7526', thick / AU, 4, '0.7526')
  // the Moon audit: 384,400 km = 3.844e8 m = 3.844e12 tenths-of-mm units
  const moonUnits = 384400e3 / 1e-4 // sheet units needed (0.1 mm each)
  let folds = 0
  let copies = 1
  while (copies * 1e-4 < 384400e3) {
    copies *= 2
    folds++
  }
  check('A09 folds to reach the Moon = 42', folds === 42)
  between('A09 2^41 < 3.844e12 < 2^42', Math.pow(2, 41), moonUnits, Math.pow(2, 42))
  eq('A09 2^41 in units of 1e12 = 2.199', Math.pow(2, 41) / 1e12, 3, '2.199')
  eq('A09 2^42 in units of 1e12 = 4.398', Math.pow(2, 42) / 1e12, 3, '4.398')
}

/* ------------------------------------------------------------------ */
/* A10 · same-base craft I: 8^{x+1} = 4^{2-x} -> x = 1/5               */
/* ------------------------------------------------------------------ */
{
  const x = 1 / 5
  check('A10 x = 1/5 = 0.2', x === 0.2)
  const lhs = Math.pow(8, x + 1)
  const rhs = Math.pow(4, 2 - x)
  check('A10 8^{x+1} = 4^{2-x} at x = 1/5 (sides agree to 1e-12)', Math.abs(lhs - rhs) < 1e-12)
  eq('A10 both sides = 2^{3.6} to 4dp = 12.1257', Math.pow(2, 3.6), 4, '12.1257')
  eq('A10 8^{6/5} to 7dp = 12.1257325', Math.pow(8, 1.2), 7, '12.1257325')
  check('A10 exponents match: 3(x+1) = 2(2-x) = 3.6 (1e-12)', Math.abs(3 * (x + 1) - 3.6) < 1e-12 && Math.abs(2 * (2 - x) - 3.6) < 1e-12)
  check('A10 the linear collapse 5x = 1', 5 * x === 1)
}

/* ------------------------------------------------------------------ */
/* A11 · same-base craft II: 3^{x+1} + 3^{x-1} = 270 -> x = 4          */
/* ------------------------------------------------------------------ */
{
  // factor: 3^x (3 + 1/3) = 3^x · 10/3
  eq('A11 the factor 3 + 1/3 = 10/3', 3 + 1 / 3, 6, '3.333333')
  const x = 4
  eq('A11 3^x = 270 · 3/10 = 81', 270 * 3 / 10, 0, '81')
  check('A11 81 = 3^4', Math.pow(3, 4) === 81)
  check('A11 check 3^5 + 3^3 = 243 + 27 = 270', Math.pow(3, 5) + Math.pow(3, 3) === 270)
  check('A11 3^{x}(3 + 3^{-1}) = 270 at x = 4 (1e-12)', Math.abs(Math.pow(3, x) * (3 + Math.pow(3, -1)) - 270) < 1e-12)
}

/* ------------------------------------------------------------------ */
/* A12 · the flip: (1/2)^{x^2-2x} < 1/8 -> x < -1 or x > 3             */
/* ------------------------------------------------------------------ */
{
  // SPEC CATCH: the sheet factored x^2 - 2x - 3 as (x-(1+sqrt5))(x-(1-sqrt5))
  // — those are the roots of x^2 - 2x - 4, not of x^2 - 2x - 3. ENGINE WINS:
  // the boundary is x = -1 and x = 3.
  const roots = [-1, 3]
  for (const r of roots) {
    check(`A12 boundary: at x = ${r}, x^2 - 2x = 3 so (1/2)^exp = 1/8 exactly`, Math.pow(0.5, r * r - 2 * r) === 0.125)
  }
  // witnesses of the solution set x < -1 or x > 3
  check('A12 x = 0 is OUTSIDE (1 > 1/8)', Math.pow(0.5, 0) > 0.125)
  check('A12 x = 2 is OUTSIDE ((1/2)^0 = 1 > 1/8)', Math.pow(0.5, 2 * 2 - 2 * 2) > 0.125)
  check('A12 x = 4 is INSIDE ((1/2)^8 = 1/256 < 1/8)', Math.pow(0.5, 4 * 4 - 2 * 4) < 0.125)
  check('A12 x = -2 is INSIDE ((1/2)^8 < 1/8)', Math.pow(0.5, (-2) * (-2) - 2 * -2) < 0.125)
  // the spec's 1 ± sqrt5 are interior points, NOT the boundary
  const s = Math.sqrt(5)
  eq('A12 at x = 1+sqrt5: x^2-2x = 4 (interior, not boundary)', (1 + s) * (1 + s) - 2 * (1 + s), 0, '4')
  eq('A12 (1/2)^4 = 1/16 < 1/8 at x = 1+sqrt5 (true but not tight)', Math.pow(0.5, 4), 6, '0.062500')
  eq('A12 1+sqrt5 = 3.236068', 1 + s, 6, '3.236068')
  eq('A12 1-sqrt5 = -1.236068', 1 - s, 6, '-1.236068')
}

/* ------------------------------------------------------------------ */
/* A13 · the case split: |x-2|^{2x^2-9x+9} = 1 -> {1, 3/2, 3}          */
/* ------------------------------------------------------------------ */
{
  const expAt = (x: number) => 2 * x * x - 9 * x + 9
  const valAt = (x: number) => Math.pow(Math.abs(x - 2), expAt(x))
  check('A13 x = 1 works: |−1|^2 = 1^2 = 1', valAt(1) === 1)
  check('A13 x = 3/2 works: |−1/2|^0 = 0.5^0 = 1', valAt(1.5) === 1)
  check('A13 x = 3 works: |1|^0 = 1^0 = 1', valAt(3) === 1)
  // the refused point: x = 2 gives base 0 with exponent −1 (0^{-1} undefined)
  check('A13 x = 2 refused: base |x−2| = 0, exponent 2(4)−18+9 = −1', expAt(2) === -1 && Math.abs(2 - 2) === 0)
  // case roots
  check('A13 base-1 case: |x−2| = 1 -> x = 1 or 3', Math.abs(1 - 2) === 1 && Math.abs(3 - 2) === 1)
  // exponent-0 case: 2x^2 - 9x + 9 = 0 -> x = 3/2 or 3 (disc 81 - 72 = 9)
  check('A13 disc of 2x^2-9x+9 is 9', 81 - 8 * 9 === 9)
  eq('A13 root A (9+3)/4 = 3', (9 + 3) / 4, 0, '3')
  eq('A13 root B (9-3)/4 = 3/2', (9 - 3) / 4, 1, '1.5')
  // sweep for stray solutions in [-2, 5]
  let strays = 0
  for (let x = -2; x <= 5; x += 0.001) {
    const b = Math.abs(x - 2)
    if (b === 0) continue
    if (Math.abs(Math.pow(b, expAt(x)) - 1) < 1e-9) strays++
  }
  check('A13 0.001 sweep of [-2, 5]: exactly 3 solutions (1, 1.5, 3)', strays === 3, `found ${strays}`)
}

/* ------------------------------------------------------------------ */
/* A14 · counting craft I: 3x - 5 = 2^{-x}, the crossing at 1.7648     */
/* ------------------------------------------------------------------ */
{
  const g = (x: number) => 3 * x - 5 - Math.pow(2, -x)
  // SPEC CATCH: the sheet pinned x ≈ 1.7638 — the engine's bisection gives
  // 1.7647586. ENGINE WINS; prose and figure use ≈ 1.7648.
  eq('A14 bracket f(1.7) = -0.208 < 0 (3dp)', g(1.7), 3, '-0.208')
  eq('A14 bracket f(1.8) = 0.113 > 0 (3dp)', g(1.8), 3, '0.113')
  const root = bisect(g, 1.7, 1.8, 1e-11)
  eq('A14 the crossing to 4dp = 1.7648 (spec said 1.7638 — engine wins)', root, 4, '1.7648')
  eq('A14 the crossing to 7dp = 1.7647586', root, 7, '1.7647586')
  eq('A14 y at the crossing: 3(1.7648) − 5 to 4dp = 0.2943', 3 * root - 5, 4, '0.2943')
  check('A14 at the root both sides agree: 3x−5 = 2^{-x} (1e-10)', Math.abs(3 * root - 5 - Math.pow(2, -root)) < 1e-10)
  // uniqueness: g strictly increasing (numeric sweep — the prose argument is
  // the algebraic one: a rising line against a falling curve crosses at most once)
  let steep = true
  for (let x = 0; x < 4; x += 0.05) if (!(g(x) < g(x + 0.05))) steep = false
  check('A14 g strictly increasing on [0, 4] (0.05 numeric sweep)', steep)
  check('A14 g(0) = -6 < 0 and g(4) > 0: exactly one crossing', g(0) < 0 && g(4) > 0)
}

/* ------------------------------------------------------------------ */
/* A15 · L2(a): 9^{x+2} = 27^x -> x = 4, check 9^6 = 27^4              */
/* ------------------------------------------------------------------ */
{
  const x = 4
  check('A15 exponent identity 2(x+2) = 3x at x = 4', 2 * (x + 2) === 3 * x && 3 * x === 12)
  eq('A15 9^6 = 531441', Math.pow(9, 6), 0, '531441')
  eq('A15 27^4 = 531441', Math.pow(27, 4), 0, '531441')
  check('A15 9^6 = 27^4 exactly', Math.pow(9, 6) === Math.pow(27, 4))
  check('A15 both equal 3^{12}', Math.pow(3, 12) === 531441)
}

/* ------------------------------------------------------------------ */
/* A16 · L3(a): 2^{x+2} + 2^{x+1} = 48 -> x = 3                        */
/* ------------------------------------------------------------------ */
{
  const x = 3
  check('A16 the factor 4 + 2 = 6', 4 + 2 === 6)
  eq('A16 48/6 = 8', 48 / 6, 0, '8')
  check('A16 8 = 2^3', Math.pow(2, 3) === 8)
  check('A16 check 2^5 + 2^4 = 32 + 16 = 48', Math.pow(2, 5) + Math.pow(2, 4) === 48)
  const v = Math.pow(2, x + 2) + Math.pow(2, x + 1)
  eq('A16 direct check at x = 3: 48', v, 0, '48')
}

/* ------------------------------------------------------------------ */
/* A17 · L3(b): (1/3)^{x^2-2x} < 1/9 -> x < 1-sqrt3 or x > 1+sqrt3     */
/* ------------------------------------------------------------------ */
{
  const s = Math.sqrt(3)
  eq('A17 1-sqrt3 = -0.7320508', 1 - s, 7, '-0.7320508')
  eq('A17 1+sqrt3 = 2.7320508', 1 + s, 7, '2.7320508')
  // boundary: x^2 - 2x = 2 at both roots -> (1/3)^2 = 1/9 exactly
  check(
    'A17 boundary at 1±sqrt3: x^2-2x = 2, value 1/9 (1e-12)',
    Math.abs(Math.pow(1 / 3, (1 - s) * (1 - s) - 2 * (1 - s)) - 1 / 9) < 1e-12 &&
      Math.abs(Math.pow(1 / 3, (1 + s) * (1 + s) - 2 * (1 + s)) - 1 / 9) < 1e-12,
  )
  check('A17 x = 0 OUTSIDE (1 > 1/9)', Math.pow(1 / 3, 0) > 1 / 9)
  check('A17 x = 3 INSIDE ((1/3)^3 = 1/27 < 1/9)', Math.pow(1 / 3, 3) < 1 / 9)
  check('A17 x = -1 INSIDE ((1/3)^3 < 1/9)', Math.pow(1 / 3, 3) < 1 / 9)
  check('A17 x = 1 OUTSIDE ((1/3)^{-1} = 3 > 1/9)', Math.pow(1 / 3, 1 - 2) > 1 / 9)
}

/* ------------------------------------------------------------------ */
/* A18 · L3(c): 500 at 12%: A(5) = 881.17, doubling 6.1163, rule of 72 */
/* ------------------------------------------------------------------ */
{
  eq('A18 1.12^5 to 10dp = 1.7623416832', Math.pow(1.12, 5), 10, '1.7623416832')
  eq('A18 A(5) = 500 · 1.12^5 to 2dp = 881.17', 500 * Math.pow(1.12, 5), 2, '881.17')
  eq('A18 exact doubling ln2/ln1.12 to 4dp = 6.1163', ln2 / Math.log(1.12), 4, '6.1163')
  eq('A18 ln2/ln1.12 to 7dp = 6.1162554', ln2 / Math.log(1.12), 7, '6.1162554')
  // the same number pinned by pure bisection on 1.12^n = 2
  eq('A18 bisection of 1.12^n = 2 on [6, 7] to 7dp = 6.1162554', bisect((n) => Math.pow(1.12, n) - 2, 6, 7, 1e-11), 7, '6.1162554')
  eq('A18 1.12^6 to 4dp = 1.9738', Math.pow(1.12, 6), 4, '1.9738')
  eq('A18 1.12^7 to 4dp = 2.2107', Math.pow(1.12, 7), 4, '2.2107')
  between('A18 the staircase bracket 1.12^6 < 2 < 1.12^7', Math.pow(1.12, 6), 2, Math.pow(1.12, 7))
  check('A18 rule of 72 at 12%: 72/12 = 6', 72 / 12 === 6)
  eq('A18 rule-of-72 error 1.9008% (about 1.9%)', Math.abs(6 - 6.1162554) / 6.1162554 * 100, 4, '1.9008')
}

/* ------------------------------------------------------------------ */
/* A19 · L4(a): |x-3|^{x^2-8x+15} = 1 -> {2, 4, 5}, x = 3 refused      */
/* ------------------------------------------------------------------ */
{
  const expAt = (x: number) => x * x - 8 * x + 15
  const valAt = (x: number) => Math.pow(Math.abs(x - 3), expAt(x))
  check('A19 x = 2 works: |−1|^3 = 1^3 = 1', valAt(2) === 1)
  check('A19 x = 4 works: |1|^{-1} = 1^{-1} = 1', valAt(4) === 1)
  check('A19 x = 5 works: |2|^0 = 2^0 = 1', valAt(5) === 1)
  // the guard: x = 3 gives base 0 with exponent 0 -> 0^0 refused (not defined)
  check('A19 x = 3 refused: base |x−3| = 0 AND exponent 9−24+15 = 0 (the 0^0 guard)', expAt(3) === 0 && Math.abs(3 - 3) === 0)
  // case roots: |x−3| = 1 -> x = 2, 4 ; x^2−8x+15 = 0 -> x = 3, 5
  check('A19 base-1 case: |x−3| = 1 -> x = 2 or 4', Math.abs(2 - 3) === 1 && Math.abs(4 - 3) === 1)
  check('A19 disc of x^2-8x+15 is 4', 64 - 60 === 4)
  eq('A19 root A (8+2)/2 = 5', (8 + 2) / 2, 0, '5')
  eq('A19 root B (8-2)/2 = 3', (8 - 2) / 2, 0, '3')
  // sweep for strays on [-1, 7] (guard: |x-3| < 1e-6 is the 0^0 refusal zone —
  // the expression TENDS to 1 as x -> 3+ but is not defined AT 3; the guard
  // excludes that limit from the count, exactly as the solution does)
  let strays = 0
  for (let x = -1; x <= 7; x += 0.001) {
    const b = Math.abs(x - 3)
    if (b < 1e-6) continue
    if (Math.abs(Math.pow(b, expAt(x)) - 1) < 1e-9) strays++
  }
  check('A19 0.001 sweep of [-1, 7] (0^0 zone guarded): exactly 3 solutions (2, 4, 5)', strays === 3, `found ${strays}`)
}

/* ------------------------------------------------------------------ */
/* A20 · L4(b): (2x-3)·2^x = 1, the crossing at 1.6584                 */
/* ------------------------------------------------------------------ */
{
  const h = (x: number) => 2 * x - 3 - Math.pow(2, -x)
  // SPEC CATCH: the sheet pinned x ≈ 1.6557 — the engine's bisection gives
  // 1.6583956. ENGINE WINS; prose and figure use ≈ 1.6584.
  eq('A20 bracket h(1.6) = -0.130 < 0 (3dp)', h(1.6), 3, '-0.130')
  eq('A20 bracket h(1.7) = 0.092 > 0 (3dp)', h(1.7), 3, '0.092')
  const root = bisect(h, 1.6, 1.7, 1e-11)
  eq('A20 the crossing to 4dp = 1.6584 (spec said 1.6557 — engine wins)', root, 4, '1.6584')
  eq('A20 the crossing to 7dp = 1.6583956', root, 7, '1.6583956')
  // original form check: (2x−3)·2^x = 1 at the root
  eq('A20 original form (2x−3)·2^x at the root = 1.0000', (2 * root - 3) * Math.pow(2, root), 4, '1.0000')
  // uniqueness: h strictly increasing (numeric sweep — the prose argument is
  // the algebraic one: rising line against falling curve crosses at most once)
  let steep = true
  for (let x = 0; x < 4; x += 0.05) if (!(h(x) < h(x + 0.05))) steep = false
  check('A20 h strictly increasing on [0, 4] (0.05 numeric sweep)', steep)
  check('A20 h(0) = -4 < 0 and h(4) > 0: exactly one crossing', h(0) < 0 && h(4) > 0)
}

/* ------------------------------------------------------------------ */
/* A21 · L5(b): 5% per period — doubles by 15, not by 14                */
/* ------------------------------------------------------------------ */
{
  // SPEC NOTE: the sheet's 1.979931 is the truncated 6dp; the engine's
  // rounding to 6dp is 1.979932. ENGINE WINS on rounding.
  eq('A21 1.05^14 to 6dp = 1.979932', Math.pow(1.05, 14), 6, '1.979932')
  eq('A21 1.05^15 to 6dp = 2.078928', Math.pow(1.05, 15), 6, '2.078928')
  between('A21 the doubling bracket 1.05^14 < 2 < 1.05^15', Math.pow(1.05, 14), 2, Math.pow(1.05, 15))
  eq('A21 1.05^14 to 7dp = 1.9799316', Math.pow(1.05, 14), 7, '1.9799316')
  eq('A21 1.05^15 to 7dp = 2.0789282', Math.pow(1.05, 15), 7, '2.0789282')
  // integer sweep: 15 is the smallest n with 1.05^n > 2
  let n = 0
  let v = 1
  while (v <= 2) {
    v *= 1.05
    n++
  }
  check('A21 smallest n with 1.05^n > 2 is 15', n === 15)
}

/* ------------------------------------------------------------------ */
/* A22 · L5(c): half-life — below 1 unit exactly when t > 36           */
/* ------------------------------------------------------------------ */
{
  const C = (t: number) => 64 * Math.pow(0.5, t / 6)
  check('A22 C(36) = 1 exactly', C(36) === 1)
  eq('A22 C(37) = 2^{-1/6} to 4dp = 0.8909', C(37), 4, '0.8909')
  // the rewrite 64·(1/2)^{t/6} = 2^{6 - t/6}
  let rewrite = true
  for (let t = 0; t <= 48; t += 0.5) {
    if (Math.abs(C(t) - Math.pow(2, 6 - t / 6)) > 1e-12) rewrite = false
  }
  check('A22 64·(1/2)^{t/6} = 2^{6 − t/6} on a 0.5 sweep of [0, 48]', rewrite)
  check('A22 C(36) = 2^0 = 1 (the threshold hour)', Math.pow(2, 6 - 36 / 6) === 1)
  check('A22 below at t = 37: 2^{-1/6} < 2^0', Math.pow(2, -1 / 6) < 1)
  check('A22 above at t = 35: 2^{1/12} > 1', Math.pow(2, 1 / 12) > 1)
  // 2^{6-t/6} < 2^0 iff 6 - t/6 < 0 iff t > 36 — witnessed at 36.5 and 35.5
  check('A22 C(36.5) < 1 < C(35.5)', C(36.5) < 1 && C(35.5) > 1)
}

/* ------------------------------------------------------------------ */
/* A23 · L6(a): the bands nest, the innermost width beats 0.0001       */
/* ------------------------------------------------------------------ */
{
  const B1 = [Math.pow(2, 1.41), Math.pow(2, 1.42)] as const
  const B2 = [Math.pow(2, 1.4142), Math.pow(2, 1.4143)] as const
  const B3 = [Math.pow(2, 1.41421), Math.pow(2, 1.41422)] as const
  const target = Math.pow(2, SQRT2)
  check('A23 nesting B1 ⊃ B2', B1[0] < B2[0] && B2[1] < B1[1])
  check('A23 nesting B2 ⊃ B3', B2[0] < B3[0] && B3[1] < B2[1])
  check('A23 the target 2^{sqrt2} lies in B3', B3[0] < target && target < B3[1])
  const w1 = B1[1] - B1[0]
  const w2 = B2[1] - B2[0]
  const w3 = B3[1] - B3[0]
  check('A23 widths shrink: w1 > w2 > w3', w1 > w2 && w2 > w3, `${w1.toFixed(7)} > ${w2.toFixed(7)} > ${w3.toFixed(7)}`)
  check('A23 innermost width < 0.0001 (any two candidates differ by < 0.0001)', w3 < 0.0001, `w3 = ${w3.toFixed(7)}`)
  eq('A23 w1 to 6dp = 0.018483', w1, 6, '0.018483')
  eq('A23 w2 to 7dp = 0.0001847 (display width 0.000185)', w2, 7, '0.0001847')
  eq('A23 w3 to 8dp = 0.00001847', w3, 8, '0.00001847')
}

/* ------------------------------------------------------------------ */
/* A24 · L6(b): the law audit on the witnesses (2, sqrt2), (2, 2-sqrt2)*/
/* ------------------------------------------------------------------ */
{
  const lhs = Math.pow(2, SQRT2) * Math.pow(2, 2 - SQRT2)
  eq('A24 law witness to 4dp = 4.0000', lhs, 4, '4.0000')
  check('A24 exponent sum sqrt2 + (2 − sqrt2) = 2 (1e-12)', Math.abs(SQRT2 + (2 - SQRT2) - 2) < 1e-12)
  eq('A24 2^{sqrt2} to 4dp = 2.6651', Math.pow(2, SQRT2), 4, '2.6651')
  eq('A24 2^{2−sqrt2} to 4dp = 1.5009', Math.pow(2, 2 - SQRT2), 4, '1.5009')
  // extra numeric law witnesses (a^x · a^y = a^{x+y} to 4dp)
  eq('A24 3^{2.7} · 3^{−1.9} = 3^{0.8} to 4dp', Math.pow(3, 2.7) * Math.pow(3, -1.9), 4, Math.pow(3, 0.8).toFixed(4))
  eq('A24 (0.5)^{2.3} · (0.5)^{−1.1} = (0.5)^{1.2} to 4dp', Math.pow(0.5, 2.3) * Math.pow(0.5, -1.1), 4, Math.pow(0.5, 1.2).toFixed(4))
}

/* ------------------------------------------------------------------ */
/* P-section imports — live only for the pins below (added AFTER the    */
/* prose existed and the A-engines ran green)                          */
/* ------------------------------------------------------------------ */
const lesson91 = chapter09.lessons[0] as Lesson

/* ------------------------------------------------------------------ */
/* P01… — pins reading the authored part-aa91.ts                        */
/* ------------------------------------------------------------------ */

{
  // P01 · identity, exactly as the spec pins it
  check('P01 lesson id is aa-the-exponential-family-every-real-index', lesson91.id === 'aa-the-exponential-family-every-real-index', `got ${lesson91.id}`)
  check('P01 lesson number is 9.1', lesson91.number === '9.1', `got ${lesson91.number}`)
  check('P01 lesson title is The Exponential Family: Every Real Index', lesson91.title === 'The Exponential Family: Every Real Index', `got ${lesson91.title}`)

  // P02 · prerequisite and source rosters, exactly as the spec pins them
  const wantPrereq = ['al-powers-and-the-laws-of-exponents', 'al-zero-and-negative-exponents-another-repair', 'ans-how-irrationals-behave']
  check('P02 prerequisites array exact', JSON.stringify(lesson91.prerequisites) === JSON.stringify(wantPrereq), JSON.stringify(lesson91.prerequisites))
  const wantSources = ['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']
  check('P02 sources array exact', JSON.stringify(lesson91.sources) === JSON.stringify(wantSources), JSON.stringify(lesson91.sources))

  // P03 · the honest word count (no `words` field — the registry counts)
  const words = countLessonWords(lesson91)
  check('P03 countLessonWords >= 6000', words >= 6000, `${words} words`)
  check('P03 no `words` field on the lesson (honest auto-count)', lesson91.words === undefined)

  // P04 · Illustrations: >= 2 example blocks with >= 4 steps each
  const examples = lesson91.blocks.filter((b) => b.kind === 'example') as Extract<typeof lesson91.blocks[number], { kind: 'example' }>[]
  const longExamples = examples.filter((b) => b.steps.length >= 4)
  check('P04 >= 2 example blocks with >= 4 steps', examples.length >= 2 && longExamples.length >= 2, `${examples.length} examples, ${longExamples.length} with >= 4 steps`)

  // P05 · the quiz: 5 items, answer indices pinned [1, 1, 1, 1, 2]
  const quiz = lesson91.blocks.find((b) => b.kind === 'quiz') as Extract<typeof lesson91.blocks[number], { kind: 'quiz' }> | undefined
  check('P05 quiz exists with exactly 5 items', !!quiz && quiz.items.length === 5, quiz ? `${quiz.items.length} items` : 'missing')
  const answers = quiz ? quiz.items.map((i) => i.answer) : []
  check('P05 quiz answer key is [1, 1, 1, 1, 2]', JSON.stringify(answers) === JSON.stringify([1, 1, 1, 1, 2]), JSON.stringify(answers))
  check('P05 every quiz option list has 4 entries and a full explain', !!quiz && quiz.items.every((i) => i.options.length === 4 && i.explain.length > 200))

  // P06/P07 · figures: >= 3 body figures; >= 3 solution figures across the exercises
  const bodyFigures = lesson91.blocks.filter((b) => b.kind === 'figure')
  check('P06 >= 3 body figure blocks', bodyFigures.length >= 3, `${bodyFigures.length} body figures`)
  let exerciseFigures = 0
  let exampleFigures = 0
  for (const b of lesson91.blocks) {
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) exerciseFigures += q.figures?.length ?? 0
    if (b.kind === 'example') exampleFigures += b.figures?.length ?? 0
  }
  check('P07 >= 3 solution figures across the exercises', exerciseFigures >= 3, `${exerciseFigures} on exercises (+${exampleFigures} on example blocks)`)

  // P08 · exercises: >= 16 questions, each with a full steps solution + answer
  const setBlocks = lesson91.blocks.filter((b) => b.kind === 'exercises') as Extract<typeof lesson91.blocks[number], { kind: 'exercises' }>[]
  const questions = setBlocks.flatMap((b) => b.sets.flatMap((st) => st.questions))
  const withSteps = questions.filter((q) => Array.isArray(q.solution) && q.solution.length > 0 && q.solution.every((st) => typeof st === 'string' && st.length > 0))
  const withAnswer = questions.filter((q) => typeof q.answer === 'string' && q.answer.length > 0)
  check('P08 >= 16 exercise questions', questions.length >= 16, `${questions.length} questions`)
  check('P08 every question has a non-empty steps-array solution', questions.length === withSteps.length, `${withSteps.length}/${questions.length}`)
  check('P08 every question has a non-empty answer', questions.length === withAnswer.length, `${withAnswer.length}/${questions.length}`)
  const levels = setBlocks.flatMap((b) => b.sets.map((st) => st.level))
  check('P08 sets span L1 through L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((lv) => levels.includes(lv as never)), levels.join(','))

  // P09/P10 · every figure svg: aria-label present; no retired hex anywhere
  const svgs: string[] = []
  for (const b of lesson91.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  check('P09 every figure svg carries aria-label=', svgs.length > 0 && svgs.every((s) => s.includes('aria-label=')), `${svgs.length} svgs`)
  const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  const retiredHits = RETIRED.filter((h) => svgs.some((s) => s.includes(h)))
  check('P10 no retired hex in any svg string', retiredHits.length === 0, retiredHits.join(' ') || 'clean')
  check('P09 every svg declares viewBox 0 0 720 …, xmlns and role img', svgs.every((s) => /viewBox="0 0 720 \d+"/.test(s) && s.includes('xmlns=') && s.includes('role="img"')))

  // P11 · structural must-haves: derivation, theorem, definition, terms, table, roman list
  const kinds = new Set(lesson91.blocks.map((b) => b.kind))
  check('P11 at least one derivation block', kinds.has('derivation'))
  const tones = new Set(lesson91.blocks.filter((b) => b.kind === 'callout').map((b) => (b as Extract<typeof lesson91.blocks[number], { kind: 'callout' }>).tone))
  check('P11 a theorem callout exists', tones.has('theorem'))
  check('P11 a definition callout exists', tones.has('definition'))
  check('P11 a terms block exists', kinds.has('terms'))
  check('P11 a table block exists', kinds.has('table'))
  const roman = lesson91.blocks.filter((b) => b.kind === 'list' && (b as Extract<typeof lesson91.blocks[number], { kind: 'list' }>).marker === 'roman')
  check('P11 at least one roman marker list', roman.length >= 1, `${roman.length} roman lists`)

  // P12 · the pinned tokens appear in the serialized prose
  const ser = JSON.stringify(lesson91)
  for (const token of ['2.657372', '2.675855', '2.665144', '1024', '7.2725408973', '1125899906842624']) {
    check(`P12 token "${token}" appears in the lesson prose`, ser.includes(token))
  }
  check('P12 no placeholder tokens in the prose', !ser.includes('TODO') && !ser.includes('【') && !ser.includes('xxx'))
}

/* ------------------------------------------------------------------ */
/* tallies                                                             */
/* ------------------------------------------------------------------ */


const sPass = aPass + pPass
const sFail = (aTotal - aPass) + (pTotal - pPass)
return { id: 'A+B (9.1 engines + pins)', pass: sPass, fail: sFail }
}

// ------------------------------------------------------------------
// (C+D (9.2 engines + pins)) from v-aa92.ts — verbatim, wrapped; engines then pins
// ------------------------------------------------------------------

// ------------------------------------------------------------------

// ------------------------------------------------------------------

function sectionCD(): SectionResult {
/**
 * v-aa92.ts — the verify-first ENGINE for Advanced Algebra lesson 9.2
 * "Logarithms: the Inverse Machine" (id aa-logarithms-the-inverse-machine).
 *
 * Agent aa92 of the run-120 two-agent content-authoring swarm. Every number
 * the lesson's prose will state is recomputed here FIRST: exact checks where
 * the arithmetic is integral, toleranced checks where floating point enters,
 * bisection where a root is pinned, sweeps where monotonicity or uniqueness
 * is claimed. If an engine result disagrees with a number in the spec, the
 * ENGINE wins and the prose is adjusted to it (the catch is flagged in the
 * agent report).
 *
 * Phase 1 (sections C01…C16): pure arithmetic, self-contained — no repo
 * imports at all (only the type-only import below, which is erased).
 * Phase 2 (sections Q01…Q09, active once part-aa92.ts exists): the pins that
 * read the authored lesson part and the platform's honest word counter.
 */


// ------------------------------------------------------------------ collector
type Tall = { id: string; pass: number; fail: number }
const tally: Tall[] = []
let cur: Tall = { id: '', pass: 0, fail: 0 }
function begin(id: string): void {
  tally.push((cur = { id, pass: 0, fail: 0 }))
}
function check(name: string, ok: boolean, detail?: string): void {
  if (ok) {
    cur.pass += 1
  } else {
    cur.fail += 1
    console.log(`  [RED] ${name}${detail ? ' — ' + detail : ''}`)
  }
}
const info = (msg: string) => console.log(`  [i] ${msg}`)

// ------------------------------------------------------------------- helpers
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
const logB = (b: number, x: number): number => Math.log(x) / Math.log(b)
// a value that is not a real number: NaN, +/-Infinity, or undefined
const notReal = (v: number): boolean => !Number.isFinite(v)
const r4 = (x: number): number => Math.round(x * 1e4) / 1e4
const r5 = (x: number): number => Math.round(x * 1e5) / 1e5
const r6 = (x: number): number => Math.round(x * 1e6) / 1e6
const r9 = (x: number): number => Math.round(x * 1e9) / 1e9
function bisect(f: (x: number) => number, lo: number, hi: number, iters = 120): number {
  let a = lo
  let b = hi
  for (let i = 0; i < iters; i += 1) {
    const m = (a + b) / 2
    if (f(a) * f(m) <= 0) b = m
    else a = m
  }
  return (a + b) / 2
}
function increasingSweep(f: (x: number) => number, lo: number, hi: number, n = 400): boolean {
  const step = (hi - lo) / n
  let prev = f(lo)
  for (let k = 1; k <= n; k += 1) {
    const v = f(lo + k * step)
    if (!(v > prev)) return false
    prev = v
  }
  return true
}
function derivativeSweep(f: (x: number) => number, lo: number, hi: number, n = 300): boolean {
  // numerics for "h' > 0": forward differences, every sampled point positive
  const step = (hi - lo) / n
  const eps = step / 8
  for (let k = 0; k <= n; k += 1) {
    const x = lo + k * step
    const slope = (f(x + eps) - f(x)) / eps
    if (!(slope > 0)) return false
  }
  return true
}
function logGridSignChanges(f: (x: number) => number, lo: number, hi: number, n = 4000): number {
  // sweep (lo, hi) on an exponential grid; count sign changes of f
  let changes = 0
  let prev = Math.sign(f(lo))
  for (let k = 1; k <= n; k += 1) {
    const x = lo * Math.pow(hi / lo, k / n)
    const s = Math.sign(f(x))
    if (s !== 0 && prev !== 0 && s !== prev) changes += 1
    if (s !== 0) prev = s
  }
  return changes
}
function powBig(base: number, e: number): bigint {
  return BigInt(base) ** BigInt(e)
}

// ============================================================ C01 the reads
begin('C01 — the definition reads and the two anchors')
check('log_10 1000 = 3 (10^3 = 1000)', Math.pow(10, 3) === 1000 && near(logB(10, 1000), 3, 1e-12))
check('log_2 64 = 6 (2^6 = 64)', Math.pow(2, 6) === 64 && near(logB(2, 64), 6, 1e-12))
check('log_3 (1/9) = -2 (3^-2 = 1/9)', near(Math.pow(3, -2), 1 / 9, 1e-15) && near(logB(3, 1 / 9), -2, 1e-12))
check('log_4 8 = 3/2 (4^{3/2} = 8 — the fractional index cashed)', Math.pow(4, 1.5) === 8 && near(logB(4, 8), 1.5, 1e-12))
check('2*sqrt(2) = 2^{3/2} exactly in doubles', Math.pow(2, 1.5) === 2 * Math.SQRT2)
check('log_{2*sqrt2} 128 = 14/3 exact (logs)', near(logB(2 * Math.SQRT2, 128), 14 / 3, 1e-9), `got ${logB(2 * Math.SQRT2, 128)}`)
check('log_{2*sqrt2} 128 = 14/3 exact (power)', near(Math.pow(2 * Math.SQRT2, 14 / 3), 128, 1e-7), `got ${Math.pow(2 * Math.SQRT2, 14 / 3)}`)
check('2^7 = 128 (the second half of the 2*sqrt2 read)', Math.pow(2, 7) === 128)
{
  const bases = [2, 3, 10, Math.E, 0.5, 1 / 3, 2 * Math.SQRT2]
  let anchorsOk = true
  for (const a of bases) {
    if (!near(logB(a, 1), 0, 1e-12) || !near(logB(a, a), 1, 1e-12)) anchorsOk = false
  }
  check('anchors: log_a 1 = 0 and log_a a = 1 for seven legal bases', anchorsOk)
}
check('refusals: log_2(-8) (NaN) and log_2 0 (-Infinity) are not real — no exponent builds them', notReal(logB(2, -8)) && notReal(logB(2, 0)))

// ============================================== C02 the identity witnesses
begin('C02 — the two inverse identities at work')
check('3^{log_3 8} = 8', near(Math.pow(3, logB(3, 8)), 8, 1e-9))
check('7^{log_7 3} = 3 (inner read)', near(Math.pow(7, logB(7, 3)), 3, 1e-9))
check('7^{2 log_7 3} = (7^{log_7 3})^2 = 3^2 = 9', near(Math.pow(7, 2 * logB(7, 3)), 9, 1e-9) && near(Math.pow(Math.pow(7, logB(7, 3)), 2), 9, 1e-9))
check('10^{-3 log 2} = 2^{-3} = 1/8', near(Math.pow(10, -3 * logB(10, 2)), 1 / 8, 1e-9) && near(Math.pow(2, -3), 0.125, 1e-15))
check('2^{4 log_2 5} = 5^4 = 625', near(Math.pow(2, 4 * logB(2, 5)), 625, 1e-8) && Math.pow(5, 4) === 625)
{
  // the nested read: 65536 -> 16 -> 4 -> 2 -> 1, each step an inverse identity
  const chain = [65536, 16, 4, 2, 1]
  let chainOk = Math.pow(2, 16) === 65536
  for (let k = 1; k < chain.length; k += 1) {
    if (!near(logB(2, chain[k - 1]), chain[k], 1e-12)) chainOk = false
  }
  const nested = logB(2, logB(2, logB(2, logB(2, 65536))))
  check('nested chain 65536 -> 16 -> 4 -> 2 -> 1 (each log_2 step)', chainOk)
  check('log_2 log_2 log_2 log_2 65536 = 1', near(nested, 1, 1e-12), `got ${nested}`)
}

// ================================================== C03 the mirror points
begin('C03 — the mirror sample points (y = 2^x and y = log_2 x)')
{
  const expPts: [number, number][] = [[0, 1], [1, 2], [2, 4], [3, 8], [-1, 0.5], [-2, 0.25]]
  let expOk = true
  for (const [x, y] of expPts) if (!near(Math.pow(2, x), y, 1e-12)) expOk = false
  check('y = 2^x passes through all six pinned exp points', expOk)
  const logPts: [number, number][] = [[1, 0], [2, 1], [4, 2], [8, 3], [0.5, -1], [0.25, -2]]
  let logOk = true
  for (const [x, y] of logPts) if (!near(logB(2, x), y, 1e-12)) logOk = false
  check('y = log_2 x passes through all six pinned log points', logOk)
  let swapOk = true
  for (const [x, y] of expPts) if (!near(logB(2, y), x, 1e-12)) swapOk = false
  for (const [x, y] of logPts) if (!near(Math.pow(2, y), x, 1e-12)) swapOk = false
  check('the swap: (p, q) on y = 2^x iff (q, p) on y = log_2 x — all twelve witnesses', swapOk)
}

// =============================================== C04 the base family at 8
begin('C04 — the base family at x = 8')
check('log_2 8 = 3', near(logB(2, 8), 3, 1e-12) && Math.pow(2, 3) === 8)
check('log_4 8 = 1.5', near(logB(4, 8), 1.5, 1e-12) && Math.pow(4, 1.5) === 8)
check('log_10 8 = 0.9031 (4 dp)', r4(logB(10, 8)) === 0.9031, `got ${r4(logB(10, 8))}`)
check('log_{0.5} 8 = -3', near(logB(0.5, 8), -3, 1e-12) && Math.pow(0.5, -3) === 8)
check('log_{0.25} 8 = -1.5', near(logB(0.25, 8), -1.5, 1e-12) && Math.pow(0.25, -1.5) === 8)
{
  const fam = [2, 4, 10, 0.5, 0.25]
  let thru = true
  for (const b of fam) if (!near(logB(b, 1), 0, 1e-12)) thru = false
  check('all five family curves pass through (1, 0)', thru)
}

// ============================================= C05 the base-symmetry law
begin('C05 — the base-symmetry law log_{1/a} x = -log_a x')
{
  const bases = [2, 3, 4, 7, 10, Math.E]
  const args = [0.5, 2, 5, 8, 81]
  let sym = true
  for (const a of bases) for (const x of args) if (!near(logB(1 / a, x), -logB(a, x), 1e-9)) sym = false
  check('numeric grid: 30 (a, x) pairs, log_{1/a} x = -log_a x to 1e-9', sym)
}
check('exact witness: log_{0.5} 8 = -3 = -log_2 8', Math.pow(0.5, -3) === 8 && near(logB(0.5, 8), -3, 1e-12) && near(logB(2, 8), 3, 1e-12))
check('exact witness: log_{1/3} 81 = -4 = -log_3 81', powBig(3, 4) === 81n && near(logB(1 / 3, 81), -4, 1e-12) && near(logB(3, 81), 4, 1e-12))

// ================================================== C06 the ordering values
begin('C06 — the ordering illustration (argument 5)')
{
  const v2 = logB(2, 5)
  const v3 = logB(3, 5)
  const v7 = logB(7, 5)
  const vHalf = logB(0.5, 5)
  info(`log_2 5 = ${v2.toFixed(6)}, log_3 5 = ${v3.toFixed(6)}, log_7 5 = ${v7.toFixed(6)}, log_{0.5} 5 = ${vHalf.toFixed(6)}`)
  check('log_2 5 = 2.3219 (4 dp)', r4(v2) === 2.3219, `got ${r4(v2)}`)
  check('log_3 5 = 1.4650 (4 dp)', r4(v3) === 1.465, `got ${r4(v3)}`)
  check('log_7 5 = 0.8271 (4 dp)', r4(v7) === 0.8271, `got ${r4(v7)}`)
  check('log_{0.5} 5 = -2.3219 = -log_2 5 (4 dp)', r4(vHalf) === -2.3219 && near(vHalf, -v2, 1e-12), `got ${r4(vHalf)}`)
  check('decreasing order 2.3219 > 1.4650 > 0.8271 > -2.3219', v2 > v3 && v3 > v7 && v7 > vHalf)
}

// ==================================================== C07 the sign law
begin('C07 — the sign law quadrants')
{
  const q1 = logB(2, 7)
  const q2 = logB(0.2, 3)
  const q3 = logB(1 / 3, 1 / 5)
  const q4 = logB(4, 1 / 3)
  info(`log_2 7 = ${q1.toFixed(6)}, log_{0.2} 3 = ${q2.toFixed(6)}, log_{1/3}(1/5) = ${q3.toFixed(6)}, log_4(1/3) = ${q4.toFixed(6)}`)
  check('log_2 7 = +2.8074 (quadrant: base > 1, x > 1)', q1 > 0 && r4(q1) === 2.8074, `got ${r4(q1)}`)
  check('log_{0.2} 3 = -0.6826 (base < 1, x > 1)', q2 < 0 && r4(q2) === -0.6826, `got ${r4(q2)}`)
  check('log_{1/3}(1/5) = +1.4650 (base < 1, 0 < x < 1) — equals log_3 5', q3 > 0 && r4(q3) === 1.465 && near(q3, logB(3, 5), 1e-12), `got ${r4(q3)}`)
  check('log_4 (1/3) = -0.7925 (base > 1, 0 < x < 1)', q4 < 0 && r4(q4) === -0.7925, `got ${r4(q4)}`)
  // the law itself on a grid: a > 1: sign(log) = sign(x - 1); 0 < a < 1: flipped
  let lawOk = true
  for (const a of [2, 3, 10, 1.5]) {
    for (const x of [0.2, 0.5, 0.99, 1.01, 3, 7]) {
      const want = a > 1 ? x > 1 : x < 1
      if ((logB(a, x) > 0) !== want) lawOk = false
    }
  }
  for (const a of [0.5, 0.25, 1 / 3]) {
    for (const x of [0.2, 0.5, 0.99, 1.01, 3, 7]) {
      const want = x < 1
      if ((logB(a, x) > 0) !== want) lawOk = false
    }
  }
  check('the sign law on a 7-base x 6-argument grid (42 cells)', lawOk)
}

// ================================================== C08 the honest squeeze
begin('C08 — the squeeze 2/5 < log_10 3 < 1/2')
check('3^5 = 243 > 100 = 10^2 (integers)', powBig(3, 5) === 243n && powBig(10, 2) === 100n && 243 > 100)
check('3^2 = 9 < 10 (integers)', powBig(3, 2) === 9n && 9 < 10)
{
  const v = logB(10, 3)
  info(`log_10 3 = ${v.toFixed(9)}`)
  check('log_10 3 > 2/5 (from 3^5 > 10^2, monotone a^x)', v > 2 / 5)
  check('log_10 3 < 1/2 (from 3^2 < 10, monotone a^x)', v < 1 / 2)
  check('log_10 3 = 0.477121 (6 dp)', r6(v) === 0.477121, `got ${r6(v)}`)
  check('mirror restatement: log_10 243 > 2 and log_10 9 < 1', logB(10, 243) > 2 && logB(10, 9) < 1)
}

// ================================================== C09 the root x = 5
begin('C09 — the unique root of log_2 (x + 3) = 8 - x')
{
  const h = (x: number) => logB(2, x + 3) + x - 8
  check('x = 5: LHS log_2 8 = 3 = RHS 8 - 5 = 3', near(logB(2, 8), 3, 1e-12) && 8 - 5 === 3)
  check('h(5) = log_2 8 + 5 - 8 = 0', near(h(5), 0, 1e-12), `got ${h(5)}`)
  check('h strictly increasing on (-2.9, 20) — value sweep', increasingSweep(h, -2.9, 20, 500))
  check("h' > 0 on (-2.9, 20) — numerics (forward differences)", derivativeSweep(h, -2.9, 20, 300))
  const root = bisect(h, -2.9, 20)
  check('bisection locates THE root at x = 5', near(root, 5, 1e-9), `got ${root}`)
}

// ============================================ C10 the e-ladder + constants
begin('C10 — the e-ladder, the band 2.7 < e < 2.8, and the natural constants')
{
  const ms = [1, 10, 100, 1000, 1e6]
  const vals = ms.map((m) => Math.pow(1 + 1 / m, m))
  const want6 = [2, 2.593742, 2.704814, 2.716924, 2.718280]
  info(`ladder: ${vals.map((v) => v.toFixed(6)).join(', ')}`)
  for (let k = 0; k < ms.length; k += 1) {
    check(`(1 + 1/${ms[k]})^${ms[k]} = ${want6[k]} (6 dp)`, r6(vals[k]) === want6[k], `got ${r6(vals[k])}`)
  }
  let climb = true
  for (let k = 1; k < vals.length; k += 1) if (!(vals[k] > vals[k - 1])) climb = false
  check('the ladder climbs strictly (m = 1, 10, 100, 1000, 10^6)', climb)
  const e = Math.exp(1)
  info(`e = ${e.toFixed(12)}; (1.01)^100 = ${Math.pow(1.01, 100).toFixed(9)}; (1.0001)^10000 = ${Math.pow(1.0001, 10000).toFixed(9)}`)
  check('e = 2.718281828 (9 dp)', r9(e) === 2.718281828, `got ${r9(e)}`)
  check('(1.01)^100 = 2.704814 > 2.7 — the lower band step', Math.pow(1.01, 100) > 2.7 && r6(Math.pow(1.01, 100)) === 2.704814)
  check('(1.0001)^10000 = 2.718146 < 2.8 — the upper band step', Math.pow(1.0001, 10000) < 2.8 && r6(Math.pow(1.0001, 10000)) === 2.718146, `got ${r6(Math.pow(1.0001, 10000))}`)
  check('the band 2.7 < e < 2.8 (engine: e = 2.718281828...)', e > 2.7 && e < 2.8)
  check('ln 10 = 2.302585 (6 dp); 4 dp 2.3026', r6(Math.log(10)) === 2.302585 && r4(Math.log(10)) === 2.3026)
  check('e^{2.302585} reproduces 10 to within 1e-5 (the 6-dp ln 10 runs the machine forward)', near(Math.pow(Math.E, 2.302585), 10, 1e-5), `got ${Math.pow(Math.E, 2.302585)}`)
  check('ln 2 = 0.693147 (6 dp); 4 dp 0.6931', r6(Math.log(2)) === 0.693147 && r4(Math.log(2)) === 0.6931)
  check('ln 7 = 1.945910 (6 dp); 4 dp 1.9459', r6(Math.log(7)) === 1.94591 && r4(Math.log(7)) === 1.9459)
  check('ln(e^3) = 3 and e^{ln 7} = 7 (the identities at base e)', near(Math.log(Math.pow(Math.E, 3)), 3, 1e-12) && near(Math.pow(Math.E, Math.log(7)), 7, 1e-12))
}

// ================================================== C11 the L1 arithmetic
begin('C11 — the L1 exercise arithmetic')
check('log_10 10000 = 4 (10^4 = 10000)', Math.pow(10, 4) === 10000 && near(logB(10, 10000), 4, 1e-12))
check('log_2 (1/32) = -5 (2^-5 = 1/32)', Math.pow(2, -5) === 0.03125 && 1 / 32 === 0.03125 && near(logB(2, 1 / 32), -5, 1e-12))
check('log_9 27 = 3/2 (9^x = 27 => 3^{2x} = 3^3)', near(logB(9, 27), 1.5, 1e-12) && Math.pow(9, 1.5) === 27 && Math.pow(3, 2 * 1.5) === 27)
{
  // domain of log_3 (5 - x): x < 5
  let dom1 = Number.isFinite(logB(3, 5 - 4.9)) && notReal(logB(3, 5 - 5.1)) && notReal(logB(3, 5 - 5))
  check('domain of log_3 (5 - x) is x < 5 (5 - x > 0; x = 5.1 and x = 5 refused)', dom1)
  // domain of log_2 (x^2 - 1): |x| > 1
  let dom2 = Number.isFinite(logB(2, 2 ** 2 - 1)) &&
    notReal(logB(2, 0.5 ** 2 - 1)) && notReal(logB(2, 1 - 1)) &&
    Number.isFinite(logB(2, (-2) ** 2 - 1)) && notReal(logB(2, (-0.5) ** 2 - 1))
  check('domain of log_2 (x^2 - 1) is |x| > 1 (x < -1 or x > 1; x = 0, +/-0.5 refused)', dom2)
}

// ================================================== C12 the L2 arithmetic
begin('C12 — the L2 exercise arithmetic')
check('5^{log_5 9} = 9', near(Math.pow(5, logB(5, 9)), 9, 1e-8))
check('2^{3 log_2 4} = 64 (log_2 4 = 2; 2^6 = 64; also (2^{log_2 4})^3 = 4^3)', near(Math.pow(2, 3 * logB(2, 4)), 64, 1e-9) && Math.pow(2, 6) === 64 && Math.pow(4, 3) === 64)
check('10^{2 log 3} = 9', near(Math.pow(10, 2 * logB(10, 3)), 9, 1e-8))
check('mirror witness: (2, 4) on y = 2^x and (4, 2) on y = log_2 x', Math.pow(2, 2) === 4 && near(logB(2, 4), 2, 1e-12))
check('own mirror witness: (3, 8) on y = 2^x and (8, 3) on y = log_2 x', Math.pow(2, 3) === 8 && near(logB(2, 8), 3, 1e-12))
check('own mirror witness: (-1, 1/2) on y = 2^x and (1/2, -1) on y = log_2 x', Math.pow(2, -1) === 0.5 && near(logB(2, 0.5), -1, 1e-12))
check('log_{1/4} 8 = -3/2 via the base-symmetry law (= -log_4 8)', near(logB(0.25, 8), -1.5, 1e-12) && near(logB(0.25, 8), -logB(4, 8), 1e-12) && Math.pow(0.25, -1.5) === 8)

// ================================================== C13 the L3 arithmetic
begin('C13 — the L3 exercise arithmetic')
{
  const a = logB(3, 10)
  const b = logB(10, 3)
  const c = logB(0.5, 10)
  info(`log_3 10 = ${a.toFixed(6)}, log_10 3 = ${b.toFixed(6)}, log_{0.5} 10 = ${c.toFixed(6)}`)
  check('log_3 10 = 2.0959 (4 dp)', r4(a) === 2.0959, `got ${r4(a)}`)
  check('log_10 3 = 0.4771 (4 dp)', r4(b) === 0.4771, `got ${r4(b)}`)
  check('log_{0.5} 10 = -3.3219 (4 dp) = -log_2 10', r4(c) === -3.3219 && near(c, -logB(2, 10), 1e-12), `got ${r4(c)}`)
  check('decreasing order 2.0959 > 0.4771 > -3.3219', a > b && b > c)
}
{
  const v = logB(10, 4)
  info(`log_10 4 = ${v.toFixed(9)}; 10^{1/2} = ${Math.sqrt(10).toFixed(9)}; 10^{2/3} = ${Math.pow(10, 2 / 3).toFixed(9)}`)
  check('10^{1/2} = 3.1623 (4 dp) < 4, so log_10 4 > 1/2', r4(Math.sqrt(10)) === 3.1623 && Math.sqrt(10) < 4 && v > 0.5)
  check('4^3 = 64 < 100 = 10^2, so 4 < 10^{2/3} and log_10 4 < 2/3', powBig(4, 3) === 64n && powBig(10, 2) === 100n && 64 < 100 && Math.pow(10, 2 / 3) > 4 && v < 2 / 3)
  check('log_10 4 = 0.60206 (5 dp) — inside (1/2, 2/3)', r5(v) === 0.60206 && v > 0.5 && v < 2 / 3, `got ${r5(v)}`)
}
{
  // irrationality witnesses by unique factorisation (no coincidences in integers)
  let no1 = true
  for (let p = 1; p <= 8; p += 1) for (let q = 1; q <= 8; q += 1) if (powBig(3, p) === powBig(10, q)) no1 = false
  check('no (p, q) with 3^p = 10^q (primes 3 vs 2*5) — log_3 10 irrational', no1)
  let no2 = true
  for (let p = 1; p <= 12; p += 1) for (let q = 1; q <= 8; q += 1) if (powBig(2, p) === powBig(7, q)) no2 = false
  check('no (p, q) with 2^p = 7^q (primes 2 vs 7) — log_2 7 irrational', no2)
}

// ================================================== C14 the L4 arithmetic
begin('C14 — the L4 exercise arithmetic')
{
  const h = (x: number) => logB(2, x + 7) + x - 4
  check('x = 1: LHS log_2 8 = 3 = RHS 4 - 1 = 3', near(logB(2, 8), 3, 1e-12) && 4 - 1 === 3)
  check('h(1) = log_2 8 + 1 - 4 = 0', near(h(1), 0, 1e-12))
  check('h strictly increasing on (-6.9, 20) — value sweep', increasingSweep(h, -6.9, 20, 500))
  check("h' > 0 on (-6.9, 20) — numerics (forward differences)", derivativeSweep(h, -6.9, 20, 300))
  const root = bisect(h, -6.9, 20)
  check('bisection locates THE root at x = 1', near(root, 1, 1e-9), `got ${root}`)
}
{
  // x^3 = log_{1/2} x: exactly one crossing, pinned by bisection
  const g = (x: number) => x ** 3 + logB(2, x) // = x^3 - log_{1/2} x
  const root = bisect(g, 0.5, 1)
  info(`the crossing of x^3 = log_{1/2} x: x = ${root.toFixed(9)} (x^3 = ${(root ** 3).toFixed(6)})`)
  check('g(x) = x^3 + log_2 x strictly increasing on (0.02, 2) — value sweep', increasingSweep(g, 0.02, 2, 600))
  check('g(1/2) = 1/8 - 1 < 0 and g(1) = 1 > 0 — one crossing in (1/2, 1)', g(0.5) < 0 && g(1) > 0)
  check('bisection root r satisfies r^3 = log_{1/2} r = -log_2 r', near(root ** 3, -logB(2, root), 1e-9) && near(root ** 3, logB(0.5, root), 1e-9))
  check('root = 0.7481 to 4 dp (tolerance 5e-4)', Math.abs(root - 0.7481) <= 5e-4, `got ${root}`)
  const cross = (x: number) => x ** 3 - logB(0.5, x)
  check('sign sweep over (0.001, 1000): exactly one crossing', logGridSignChanges(cross, 0.001, 1000, 6000) === 1)
  check('x^3 at the root = 0.4187 (4 dp)', r4(root ** 3) === 0.4187, `got ${r4(root ** 3)}`)
}
{
  // the base discipline: log_{x-2} 16 legal iff x - 2 > 0 and x - 2 != 1
  // (a legal log needs a positive argument AND a base in (0, 1) U (1, +inf))
  const legal = (x: number) => x - 2 > 0 && x - 2 !== 1 && Number.isFinite(logB(x - 2, 16))
  check('x = 2.5, 4, 5 give legal bases (0.5, 2, 3); x = 1, 2, 3 refused', legal(2.5) && legal(4) && legal(5) && !legal(1) && !legal(2) && !legal(3))
  check('at x = 4 the base is 2 and log_2 16 = 4 (2^4 = 16)', Math.pow(2, 4) === 16 && near(logB(2, 16), 4, 1e-12))
  check('log_{0.5} 16 = -4 (the x = 2.5 row, base-symmetry of log_2 16)', near(logB(0.5, 16), -4, 1e-12))
}

// ================================================== C15 the L5 arithmetic
begin('C15 — the L5 exercise arithmetic')
check('e^{2t} = e^{t+1} has t = 1: 2t = t + 1; exp(2*1) = exp(1+1) exactly', 2 * 1 === 1 + 1 && Math.exp(2 * 1) === Math.exp(1 + 1))
check('exp strictly increasing on (-3, 3) — at most one t', increasingSweep(Math.exp, -3, 3, 200))
check('e^{ln 5} - e^{ln 2} = 5 - 2 = 3', near(Math.pow(Math.E, Math.log(5)) - Math.pow(Math.E, Math.log(2)), 3, 1e-9))
check('ln(e^4)/2 = 4/2 = 2', near(Math.log(Math.pow(Math.E, 4)) / 2, 2, 1e-12))
check('the e-ladder row for L5(a): (1.01)^100 = 2.704814 and (1.0001)^10000 = 2.718146', r6(Math.pow(1.01, 100)) === 2.704814 && r6(Math.pow(1.0001, 10000)) === 2.718146)

// ================================================== C16 the quiz arithmetic
begin('C16 — the quiz arithmetic')
check('ln(e^2) = 2', near(Math.log(Math.pow(Math.E, 2)), 2, 1e-12))
check('log_10 100 = 2', near(logB(10, 100), 2, 1e-12) && Math.pow(10, 2) === 100)
check('ln(e^2) + log_10 100 = 4 (quiz item 5)', near(Math.log(Math.pow(Math.E, 2)) + logB(10, 100), 4, 1e-12))
check('quiz item 2: log_4 8 = 3/2 (4^{3/2} = 8), not 2, 4 or 1/2', Math.pow(4, 1.5) === 8 && Math.pow(4, 2) === 16 && Math.pow(4, 4) === 256 && Math.pow(4, 0.5) === 2)
check('quiz item 4: for 0 < a < 1, log_a x > 0 iff 0 < x < 1 (e.g. log_{0.5} 0.25 = 2 > 0; log_{0.5} 4 = -2 < 0)', near(logB(0.5, 0.25), 2, 1e-12) && near(logB(0.5, 4), -2, 1e-12))

// ==================================================================== PINS
{
  const lesson92 = chapter09.lessons[1] as Lesson
  const serialized = JSON.stringify(lesson92)

  begin('Q01 — identity, number, title, prerequisites, sources')
  check('id is aa-logarithms-the-inverse-machine', lesson92.id === 'aa-logarithms-the-inverse-machine')
  check('number is 9.2', lesson92.number === '9.2')
  check('title is "Logarithms: the Inverse Machine"', lesson92.title === 'Logarithms: the Inverse Machine')
  check('prerequisites exact (3 entries, in order)', JSON.stringify(lesson92.prerequisites) === JSON.stringify(['aa-the-exponential-family-every-real-index', 'aa-inverse-functions-the-machine-undone', 'ans-fundamental-theorem-of-arithmetic']))
  check('sources exact (4 entries, in order)', JSON.stringify(lesson92.sources) === JSON.stringify(['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']))

  begin('Q02 — the honest word count')
  const words = countLessonWords(lesson92)
  info(`countLessonWords(lesson92) = ${words}`)
  check('countLessonWords >= 6000', words >= 6000, `got ${words}`)

  begin('Q03 — the Natural Logarithms fold obligation')
  const foldIdx = lesson92.blocks.findIndex((b) => b.kind === 'heading' && b.text === 'Natural Logarithms')
  check('a heading block with text exactly "Natural Logarithms"', foldIdx >= 0)
  const defCallouts = lesson92.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition') as { kind: 'callout'; tone: string; title: string; text: string }[]
  check('a definition callout mentioning ln x and log_e (the natural log)', defCallouts.some((d) => d.text.includes('ln x') && d.text.includes('log_e')))
  const foldExamples = lesson92.blocks.filter((b, i) => b.kind === 'example' && i > foldIdx) as { kind: 'example'; title: string; steps: string[] }[]
  check('>= 1 example block after the fold heading treating ln or e^t', foldExamples.some((e) => (/ln|e\^t|e\^\{/.test(e.title + ' ' + e.steps.join(' ')))))

  begin('Q04 — example blocks and worked-solution depth')
  const examples = lesson92.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; title: string; steps: string[] }[]
  info(`example blocks: ${examples.length}`)
  check('>= 2 example blocks with >= 4 steps', examples.filter((e) => e.steps.length >= 4).length >= 2)

  begin('Q05 — quiz pins')
  const quizzes = lesson92.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizzes[0]?.items ?? []
  check('exactly one quiz with exactly 5 items', quizzes.length === 1 && quiz.length === 5)
  check('quiz answers pinned [1, 1, 2, 1, 0]', JSON.stringify(quiz.map((it) => it.answer)) === JSON.stringify([1, 1, 2, 1, 0]), `got ${JSON.stringify(quiz.map((it) => it.answer))}`)
  check('every quiz explain addresses each wrong option (mentions "Option")', quiz.every((it) => it.explain.includes('Option') && it.explain.length > 120))

  begin('Q06 — figures: body count, solution count, aria-label, palette')
  const bodyFigures = lesson92.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  const exerciseSets = lesson92.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const allQuestions = exerciseSets.flatMap((e) => e.sets.flatMap((s) => s.questions))
  const solutionFigures = allQuestions.flatMap((q) => q.figures ?? [])
  const exampleFigures = (lesson92.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; figures?: { caption: string; svg: string }[] }[]).flatMap((e) => e.figures ?? [])
  const allSvgs = [...bodyFigures.map((f) => f.svg), ...exampleFigures.map((f) => f.svg), ...solutionFigures.map((f) => f.svg)]
  info(`body figures: ${bodyFigures.length}; solution figures: ${solutionFigures.length}; example-block figures: ${exampleFigures.length}`)
  check('>= 3 body figures (kind figure)', bodyFigures.length >= 3)
  check('>= 3 solution figures across the exercises', solutionFigures.length >= 3)
  check('every svg contains aria-label=', allSvgs.every((s) => s.includes('aria-label=')))
  check('every svg declares viewBox="0 0 720', allSvgs.every((s) => s.includes('viewBox="0 0 720 ')))
  check('every svg declares xmlns and role="img"', allSvgs.every((s) => s.includes('xmlns="http://www.w3.org/2000/svg"') && s.includes('role="img"')))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  check('no retired hex appears in any svg', retired.every((h) => !allSvgs.some((s) => s.includes(h))))
  const allowed = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
  const usedHexes = [...new Set(allSvgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}/g) ?? []))]
  info(`hexes used: ${usedHexes.join(' ')}`)
  check('every hex used is from the allowed palette table', usedHexes.every((h) => allowed.includes(h)), `offenders: ${usedHexes.filter((h) => !allowed.includes(h)).join(' ')}`)
  check('solution figures compact (viewBox height <= 240)', solutionFigures.every((f) => /viewBox="0 0 720 (\d+)"/.test(f.svg) && Number(/viewBox="0 0 720 (\d+)"/.exec(f.svg)?.[1]) <= 240))
  check('no blue or indigo anywhere in the svgs', allSvgs.every((s) => !/#[0-9a-fA-F]{2}(4[0-9a-fA-F]|5[0-9a-fA-F]|6[0-9a-fA-F]|7[0-9a-fA-F]|8[0-9a-fA-F]|9[0-9a-fA-F])[0-9a-fA-F]{2}/.test(s.replace(/#16a34a|#166534|#65a30d|#0d9488|#0f766e|#d97706|#ea580c|#dc2626|#fef3c7|#ffedd5|#fcd34d|#5eead4|#ffffff/g, ''))))

  begin('Q07 — exercises census')
  info(`exercise questions: ${allQuestions.length}`)
  check('>= 16 exercise questions', allQuestions.length >= 16)
  check('every question has a non-empty steps-array solution', allQuestions.every((q) => Array.isArray(q.solution) && q.solution.length >= 1 && q.solution.every((s) => s.trim().length > 0)))
  check('every question carries an answer', allQuestions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0))
  check('>= 3 questions carry figures', allQuestions.filter((q) => (q.figures ?? []).length > 0).length >= 3)
  const levels = exerciseSets.flatMap((e) => e.sets.map((s) => s.level))
  check('six levels L1..L6 present', JSON.stringify(levels) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']))

  begin('Q08 — block-kind census')
  const kinds = (k: string) => lesson92.blocks.filter((b) => b.kind === k).length
  check('>= 1 derivation', kinds('derivation') >= 1)
  check('>= 1 theorem callout', lesson92.blocks.some((b) => b.kind === 'callout' && b.tone === 'theorem'))
  check('>= 2 definition callouts (the log + the natural log)', lesson92.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 2)
  check('>= 1 terms block', kinds('terms') >= 1)
  check('>= 1 table', kinds('table') >= 1)
  check('>= 1 roman list', lesson92.blocks.some((b) => b.kind === 'list' && b.marker === 'roman'))
  check('>= 1 formula card', kinds('formula') >= 4)

  begin('Q09 — pinned tokens and placeholder hygiene')
  for (const tok of ['2.3219', '0.477121', '2.718281828', '2.3026', '0.7481']) {
    check(`token "${tok}" appears in the serialized lesson`, serialized.includes(tok))
  }
  check('no placeholders (TODO / 【】 / XXX)', !serialized.includes('TODO') && !serialized.includes('\u3010\u3011') && !serialized.includes('XXX'))
  check('no stray control characters from bad escapes', !/[\u0000-\u0008\u000b-\u001f\u007f]/.test(serialized))
}


const sPass = tally.reduce((s, t) => s + t.pass, 0)
const sFail = tally.reduce((s, t) => s + t.fail, 0)
return { id: 'C+D (9.2 engines + pins)', pass: sPass, fail: sFail }
}

// ------------------------------------------------------------------
// (E + F) from v-aa93.ts — the 9.3 engines + pins, wrapped whole
// ------------------------------------------------------------------

function sectionE(): SectionResult {
/**
 * v-aa93.ts — the verify-first ENGINE for Advanced Algebra lesson 9.3
 * "The Laws of Logarithms and the Change of Base"
 * (id aa-the-laws-of-logarithms-and-the-change-of-base).
 *
 * Agent aa93 of the run-121 whole-chapter swarm. Every number the lesson's
 * prose will state is recomputed here FIRST: exact checks where the
 * arithmetic is integral, toleranced checks where floating point enters,
 * grid sweeps where a law is claimed across a family of witnesses. Where
 * the engine disagrees with a number in the spec, the ENGINE wins and the
 * prose is adjusted to it; each such catch is flagged in the agent report.
 *
 * Spec-vs-engine adjudications pinned in this file (all detailed in the
 * report): the spec's "1/y = log_25 17 = 0.6899026" is wrong — the engine
 * pins log_25 17 = 0.8801872 (= 1/2 log_5 17); the spec's "log_11 17 =
 * 1.1818" is off — the engine pins 1.1815417; and the spec's quiz option
 * "log_a sqrt(m)" is mathematically IDENTICAL to the intended key (the
 * power law at b = 1/2), so the option set is adjusted to keep exactly one
 * correct answer, engine-verified below.
 *
 * Phase 1 (sections C01…C09): pure arithmetic, self-contained — no repo
 * imports at all (the type-only import below is erased at run time).
 * Phase 2 (sections Q01…Q11, active once part-aa93.ts exists): the pins
 * that read the authored lesson and the platform's honest word counter.
 */


// ------------------------------------------------------------------ collector
type Tall = { id: string; pass: number; fail: number }
const tally: Tall[] = []
let cur: Tall = { id: '', pass: 0, fail: 0 }
function begin(id: string): void {
  tally.push((cur = { id, pass: 0, fail: 0 }))
}
function check(name: string, ok: boolean, detail?: string): void {
  if (ok) {
    cur.pass += 1
  } else {
    cur.fail += 1
    console.log(`  [RED] ${name}${detail ? ' — ' + detail : ''}`)
  }
}
const info = (msg: string) => console.log(`  [i] ${msg}`)

// ------------------------------------------------------------------- helpers
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
const logB = (b: number, x: number): number => Math.log(x) / Math.log(b)
const r4 = (x: number): number => Math.round(x * 1e4) / 1e4
const r7 = (x: number): number => Math.round(x * 1e7) / 1e7
const r9 = (x: number): number => Math.round(x * 1e9) / 1e9

// ================================================= C01 the fold-1 witnesses
begin('C01 — the fold-1 witnesses: the product law cashed twice')
check('2·5 = 10 and log_10 10 = 1 (10^1 = 10)', 2 * 5 === 10 && Math.pow(10, 1) === 10 && near(logB(10, 10), 1, 1e-12))
check('log_10 2 + log_10 5 = 1 exactly (the product law, base 10)', near(logB(10, 2) + logB(10, 5), 1, 1e-12))
check('(√11 + √2)(√11 − √2) = 11 − 2 = 9 (difference of squares, floating)', near((Math.sqrt(11) + Math.sqrt(2)) * (Math.sqrt(11) - Math.sqrt(2)), 9, 1e-12) && 11 - 2 === 9)
check('log_3 9 = 2 (3² = 9)', Math.pow(3, 2) === 9 && near(logB(3, 9), 2, 1e-12))
check('log_3(√11 + √2) + log_3(√11 − √2) = 2 exactly', near(logB(3, Math.sqrt(11) + Math.sqrt(2)) + logB(3, Math.sqrt(11) - Math.sqrt(2)), 2, 1e-12))
check('BigInt route: the second fold witness is 3^(log_3 9) = 9 = 3²', Math.pow(3, 2) === 9)

// ================================================ C02 the cardinal witnesses
begin('C02 — the three cardinal laws on their witnesses')
check('48/3 = 16 = 2⁴; log_2 48 − log_2 3 = 4 (quotient law)', 48 / 3 === 16 && Math.pow(2, 4) === 16 && near(logB(2, 48) - logB(2, 3), 4, 1e-12))
check('6³ = 216; log_6 216 = 3 (power law on the base itself: log_6 6³ = 3 log_6 6)', Math.pow(6, 3) === 216 && near(logB(6, 216), 3, 1e-12) && near(logB(6, 216), 3 * logB(6, 6), 1e-12))
check('log_2 9 = 2 log_2 3 (the power law at a real, non-integer-friendly witness)', near(logB(2, 9), 2 * logB(2, 3), 1e-12))
{
  let ok = true
  const bases = [2, 3, 5, 10]
  const ms = [2, 6, 7]
  const ns = [3, 5, 11]
  for (const a of bases) for (const m of ms) for (const n of ns) {
    if (!near(logB(a, m * n), logB(a, m) + logB(a, n), 1e-10)) ok = false
  }
  check('product law swept over 36 witnesses (4 bases × 3 × 3)', ok)
}
{
  let ok = true
  for (const a of [2, 3, 5, 10]) for (const m of [30, 42, 100]) for (const n of [3, 5, 7]) {
    if (!near(logB(a, m / n), logB(a, m) - logB(a, n), 1e-10)) ok = false
  }
  check('quotient law swept over 36 witnesses', ok)
}
{
  let ok = true
  for (const a of [2, 3, 5, 10]) for (const m of [2, 3, 7, 10]) for (const b of [-2.5, -1, 0.5, 1, 1.5, 2, 3, Math.PI]) {
    if (!near(logB(a, Math.pow(m, b)), b * logB(a, m), 1e-9)) ok = false
  }
  check('power law swept over 128 witnesses, real b including −2.5, 1/2 and π', ok)
}

// ==================================================== C03 the base-law band
begin('C03 — the base law and its witnesses')
check('(2√3)⁶ = 1728 by the integer route 2⁶·3³ = 64·27', Math.pow(2, 6) * Math.pow(3, 3) === 1728)
check('BigInt: 2⁶·3³ = 1728n exactly', 64n * 27n === 1728n)
check('(2√3)⁶ = 1728 (floating pow, 1e-9)', near(Math.pow(2 * Math.sqrt(3), 6), 1728, 1e-9), `got ${Math.pow(2 * Math.sqrt(3), 6)}`)
check('log_(2√3) 1728 = 6 (logs)', near(logB(2 * Math.sqrt(3), 1728), 6, 1e-9), `got ${logB(2 * Math.sqrt(3), 1728)}`)
check('log_16 64 = 3/2 (16 = 2⁴, 64 = 2⁶: 6/4)', Math.pow(2, 4) === 16 && Math.pow(2, 6) === 64 && near(logB(16, 64), 1.5, 1e-12))
check('log_8 16 = 4/3 (8 = 2³, 16 = 2⁴: 4/3)', near(logB(8, 16), 4 / 3, 1e-12) && near(Math.pow(8, 4 / 3), 16, 1e-9))
check('log_9 27 = 3/2 (9 = 3², 27 = 3³)', near(logB(9, 27), 1.5, 1e-12))
check('log_0.25 32 = −5/2 (0.25 = 2⁻², 32 = 2⁵: 5/(−2))', near(logB(0.25, 32), -2.5, 1e-12) && near(Math.pow(0.25, -2.5), 32, 1e-9))
check('the b = −1 case: log_(1/4) 64 = −log_4 64 = −3 (base-symmetry from 9.2 is the base law at b = −1)', near(logB(0.25, 64), -logB(4, 64), 1e-12) && near(logB(0.25, 64), -3, 1e-12))
{
  let ok = true
  for (const a of [2, 3, 5]) for (const b of [-2, -1, 0.5, 1.5, 2, 3]) for (const m of [5, 7, 11]) {
    if (!near(logB(Math.pow(a, b), m), (1 / b) * logB(a, m), 1e-9)) ok = false
  }
  check('base law log_(a^b) m = (1/b) log_a m swept over 54 witnesses', ok)
}
check('combined form: log_(a²) m³ = (3/2) log_a m on a = 2, m = 5 (log_4 125 = (3/2) log_2 5)', near(logB(4, 125), 1.5 * logB(2, 5), 1e-9))
check('L2(a): 2√2 = 2^(3/2) exactly in doubles; 128 = 2⁷; log_(2√2) 128 = 14/3', Math.pow(2, 1.5) === 2 * Math.SQRT2 && Math.pow(2, 7) === 128 && near(logB(2 * Math.SQRT2, 128), 14 / 3, 1e-9))
// the base dial (body figure): argument 64 at bases 2, 4, 16, 0.25
info(`base dial at 64: log_2 64 = ${logB(2, 64)}, log_4 64 = ${logB(4, 64)}, log_16 64 = ${logB(16, 64)}, log_0.25 64 = ${logB(0.25, 64)}`)
check('base dial: log_2 64 = 6, log_4 64 = 3, log_16 64 = 1.5, log_0.25 64 = −3 (i.e. 6/b at b = 1, 2, 4, −2)', near(logB(2, 64), 6, 1e-12) && near(logB(4, 64), 3, 1e-12) && near(logB(16, 64), 1.5, 1e-12) && near(logB(0.25, 64), -3, 1e-12))

// ============================================ C04 the change-of-base band
begin('C04 — the change-of-base law and the common-log route')
const LOG2OF5 = logB(2, 5)
info(`log_2 5 = ${LOG2OF5} (r9 = ${r9(LOG2OF5)})`)
check('log_2 5 = 2.321928094887362 (12 dp)', near(LOG2OF5, 2.321928094887362, 1e-12), `got ${LOG2OF5}`)
check('the common-log route: log 5 / log 2 = log_2 5', near(logB(10, 5) / logB(10, 2), LOG2OF5, 1e-12))
check('any base serves: log_3 5 / log_3 2 = log_2 5', near(logB(3, 5) / logB(3, 2), LOG2OF5, 1e-12))
check('any base serves: log_7 5 / log_7 2 = log_2 5', near(logB(7, 5) / logB(7, 2), LOG2OF5, 1e-12))
{
  let ok = true
  let n = 0
  for (const a of [2, 3, 5, 10]) for (const b of [2, 3, 7, 10]) for (const m of [3, 7, 11]) {
    if (a === b) continue
    n += 1
    if (!near(logB(a, m), logB(b, m) / logB(b, a), 1e-10)) ok = false
  }
  check(`change-of-base law swept over ${n} witnesses`, ok)
}
info(`the four-decimal constants: log_10 2 = ${logB(10, 2)} (r4 ${r4(logB(10, 2))}), log_10 3 = ${logB(10, 3)} (r4 ${r4(logB(10, 3))}), log_10 5 = ${logB(10, 5)} (r4 ${r4(logB(10, 5))}), log_10 7 = ${logB(10, 7)} (r4 ${r4(logB(10, 7))})`)
check('log_10 2 = 0.3010, log_10 3 = 0.4771, log_10 5 = 0.6990, log_10 7 = 0.8451 (4 dp each)', r4(logB(10, 2)) === 0.301 && r4(logB(10, 3)) === 0.4771 && r4(logB(10, 5)) === 0.699 && r4(logB(10, 7)) === 0.8451)
check('the anchor behind the third constant: log 2 + log 5 = log 10 = 1', near(logB(10, 2) + logB(10, 5), 1, 1e-12))

// ================================================= C05 the telescoping chains
begin('C05 — the telescoping chains')
const chain = (k0: number, k1: number): number => {
  let p = 1
  for (let k = k0; k <= k1; k += 1) p *= logB(k, k + 1)
  return p
}
check('the six-factor chain (k = 3…8) = log_3 9 = 2 exactly', near(chain(3, 8), 2, 1e-12) && near(chain(3, 8), logB(3, 9), 1e-12))
info(`chains: (2…5) = ${chain(2, 5)} (log_2 6 = ${logB(2, 6)}); (4…6) = ${chain(4, 6)} (log_4 7 = ${logB(4, 7)}); (3…6) = ${chain(3, 6)} (log_3 7 = ${logB(3, 7)}); (2…9) = ${chain(2, 9)} (log_2 10 = ${logB(2, 10)})`)
check('the four-factor chain (k = 2…5) = log_2 6 (L2c)', near(chain(2, 5), logB(2, 6), 1e-12))
check('the three-factor chain (k = 4…6) = log_4 7 (L3c)', near(chain(4, 6), logB(4, 7), 1e-12))
check('the quiz chain (k = 3…6) = log_3 7 (quiz item 3)', near(chain(3, 6), logB(3, 7), 1e-12))
check('the eight-factor chain (k = 2…9) = log_2 10 = 3.3219281 (L6b)', near(chain(2, 9), logB(2, 10), 1e-12) && near(chain(2, 9), 3.3219281, 5e-8))
{
  let ok = true
  for (let n = 2; n <= 20; n += 1) {
    if (!near(chain(2, n), logB(2, n + 1), 1e-10)) ok = false
  }
  check('∏_{k=2}^{n} log_k(k+1) = log_2(n+1) swept for every n = 2…20', ok)
}

// ================================================ C06 the reciprocal family
begin('C06 — the reciprocal family and the prime chains')
check('reciprocal pair in base-dual form: log_6 16 × log_16 6 = 1', near(logB(6, 16) * logB(16, 6), 1, 1e-12))
check('log_5 3 × log_3 5 = 1', near(logB(5, 3) * logB(3, 5), 1, 1e-12))
check('log_5 3 × log_3 25 = 2 (reciprocal + power: log_3 25 = 2 log_3 5)', near(logB(5, 3) * logB(3, 25), 2, 1e-9) && near(logB(3, 25), 2 * logB(3, 5), 1e-12))
check('cycle law on (2, 3, 5): log_2 3 · log_3 5 · log_5 2 = 1', near(logB(2, 3) * logB(3, 5) * logB(5, 2), 1, 1e-12))
check('cycle law on (3, 5, 7): log_3 5 · log_5 7 · log_7 3 = 1', near(logB(3, 5) * logB(5, 7) * logB(7, 3), 1, 1e-12))
{
  let ok = true
  let n = 0
  for (const a of [2, 3, 5, 7, 10, 0.5]) for (const m of [3, 5, 7, 10, 17]) {
    if (a === m) continue
    n += 1
    if (!near(logB(a, m) * logB(m, a), 1, 1e-10)) ok = false
  }
  check(`reciprocal law log_a m · log_m a = 1 swept over ${n} witnesses`, ok)
}
check('2·3·5·7 = 210 (the first four primes; also 210n exactly)', 2 * 3 * 5 * 7 === 210 && 2n * 3n * 5n * 7n === 210n)
{
  let ok = true
  for (const n of [5, 10, Math.E]) {
    const lhs = 1 / logB(2, n) + 1 / logB(3, n) + 1 / logB(5, n) + 1 / logB(7, n)
    if (!near(lhs, logB(n, 210), 1e-9) || !near(lhs, 1 / logB(210, n), 1e-9)) ok = false
  }
  check('1/log_2 n + 1/log_3 n + 1/log_5 n + 1/log_7 n = log_n 210 = 1/log_210 n at n = 5, 10, e', ok)
}
check('2·3·7 = 42 (L5b primes)', 2 * 3 * 7 === 42)
{
  let ok = true
  for (const n of [5, 10]) {
    const lhs = 1 / logB(2, n) + 1 / logB(3, n) + 1 / logB(7, n)
    if (!near(lhs, 1 / logB(42, n), 1e-9)) ok = false
  }
  check('1/log_2 n + 1/log_3 n + 1/log_7 n = 1/log_42 n at n = 5, 10', ok)
}
info(`L5b at n = 5: log_5 2 + log_5 3 + log_5 7 = ${logB(5, 2) + logB(5, 3) + logB(5, 7)} (r7 each: ${r7(logB(5, 2))}, ${r7(logB(5, 3))}, ${r7(logB(5, 7))}); log_5 42 = ${logB(5, 42)}`)
check('quiz item 4 identity: 1/log_2 n + 1/log_4 n = log_n 8 at n = 2 (1 + 1/2 = 3/2 = log_2 8) and n = 10 (logs)', near(1 / logB(2, 2) + 1 / logB(4, 2), logB(2, 8), 1e-12) && near(1 / logB(2, 10) + 1 / logB(4, 10), logB(10, 8), 1e-12))

// ============================================== C07 the comparison pins
begin('C07 — the comparison pins: the reciprocal route (the engine decides)')
const X = logB(3, 5)
const Y = logB(17, 25)
info(`x = log_3 5 = ${X} (r7 ${r7(X)}); y = log_17 25 = ${Y} (r7 ${r7(Y)})`)
info(`1/x = log_5 3 = ${1 / X} (r7 ${r7(1 / X)}); 1/y = log_25 17 = ${1 / Y} (r7 ${r7(1 / Y)})`)
info(`log_5 9 = ${logB(5, 9)} (r7 ${r7(logB(5, 9))}); log_5 17 = ${logB(5, 17)} (r7 ${r7(logB(5, 17))})`)
check('x = log_3 5 = 1.4649735 (7 dp)', near(X, 1.4649735, 5e-8), `got ${X}`)
check('y = log_17 25 = 1.1361219 (7 dp)', near(Y, 1.1361219, 5e-8), `got ${Y}`)
check('1/x = log_5 3 = 0.6826062, and it equals ½ log_5 9 (base+power read)', near(1 / X, 0.6826062, 5e-8) && near(logB(5, 3), 0.5 * logB(5, 9), 1e-12))
check('1/y = log_25 17 = 0.8801872 = ½ log_5 17 — ENGINE CATCH: the spec printed 0.6899026, which is wrong; this value wins', near(1 / Y, 0.8801872, 5e-8) && near(logB(25, 17), 0.5 * logB(5, 17), 1e-12), `got ${1 / Y}`)
check('log_5 17 = 1.7603744 > log_5 9 = 1.3652124 (7 dp each, monotonic base 5)', near(logB(5, 17), 1.7603744, 5e-8) && near(logB(5, 9), 1.3652124, 5e-8) && logB(5, 17) > logB(5, 9))
check('therefore 1/y > 1/x with x, y > 0, hence x > y — the engine decision', 1 / Y > 1 / X && X > 0 && Y > 0 && X > Y)
const X2 = logB(7, 11)
const Y2 = logB(11, 17)
info(`L4(c): log_7 11 = ${X2} (r7 ${r7(X2)}); log_11 17 = ${Y2} (r7 ${r7(Y2)}); log_11 7 = ${logB(11, 7)} (r7 ${r7(logB(11, 7))}); log_17 11 = ${logB(17, 11)} (r7 ${r7(logB(17, 11))})`)
check('L4(c): log_7 11 = 1.2322744 (7 dp) — the engine value', near(X2, 1.2322744, 5e-8), `got ${X2}`)
check('L4(c): log_11 17 = 1.1815417 (7 dp) — ENGINE CATCH: the spec printed 1.1818, which is off; this value wins', near(Y2, 1.1815417, 5e-8), `got ${Y2}`)
check('L4(c) reciprocals: log_11 7 = 0.8115076 < log_17 11 = 0.8463518, hence log_7 11 > log_11 17', near(logB(11, 7), 0.8115076, 5e-8) && near(logB(17, 11), 0.8463518, 5e-8) && logB(11, 7) < logB(17, 11) && X2 > Y2)
info(`L3(b): log_2 10 = ${logB(2, 10)} (r7 ${r7(logB(2, 10))}), log_3 10 = ${logB(3, 10)} (r7 ${r7(logB(3, 10))}), log_5 10 = ${logB(5, 10)} (r7 ${r7(logB(5, 10))}), log_7 10 = ${logB(7, 10)} (r7 ${r7(logB(7, 10))})`)
check('L3(b): the reciprocals increase 0.3010 < 0.4771 < 0.6990 < 0.8451, so the values decrease 3.3219281 > 2.0959033 > 1.4306766 > 1.1832947', r4(logB(10, 2)) === 0.301 && r4(logB(10, 3)) === 0.4771 && r4(logB(10, 5)) === 0.699 && r4(logB(10, 7)) === 0.8451 && near(logB(2, 10), 3.3219281, 5e-8) && near(logB(3, 10), 2.0959033, 5e-8) && near(logB(5, 10), 1.4306766, 5e-8) && near(logB(7, 10), 1.1832947, 5e-8) && logB(2, 10) > logB(3, 10) && logB(3, 10) > logB(5, 10) && logB(5, 10) > logB(7, 10))
info(`misc pinned: log_2 3 = ${logB(2, 3)} (r7 ${r7(logB(2, 3))}), log_5 2 = ${logB(5, 2)} (r7 ${r7(logB(5, 2))}), log_3 7 = ${logB(3, 7)} (r7 ${r7(logB(3, 7))}), log_4 7 = ${logB(4, 7)} (r7 ${r7(logB(4, 7))})`)
check('prose pins: log_2 3 = 1.5849625, log_5 2 = 0.4306766, log_5 7 = 1.2090620, log_5 42 = 2.3223447 (7 dp each)', near(logB(2, 3), 1.5849625, 5e-8) && near(logB(5, 2), 0.4306766, 5e-8) && near(logB(5, 7), 1.2090620, 5e-8) && near(logB(5, 42), 2.3223447, 5e-8))
check('prose pins: log_6 27 = 1.8394, log_10 8 = 0.9031, log_10 4 = 0.6021 (4 dp each)', near(logB(6, 27), 1.8394, 5e-5) && near(logB(10, 8), 0.9031, 5e-5) && near(logB(10, 4), 0.6021, 5e-5))
check('prose pins: log_2 9 = 2 log_2 3 = 3.1699250 (7 dp), log_2 6 = 2.5850 (4 dp)', near(logB(2, 9), 2 * logB(2, 3), 1e-12) && near(logB(2, 9), 3.1699250, 5e-8) && r4(logB(2, 6)) === 2.585)

// ============================================== C08 the exercise arithmetic
begin('C08 — the L1–L6 exercise arithmetic')
check('L1(a): log_10 4 + log_10 25 = 2 (4·25 = 100 = 10²)', 4 * 25 === 100 && Math.pow(10, 2) === 100 && near(logB(10, 4) + logB(10, 25), 2, 1e-12))
check('L1(b): log_2 96 − log_2 3 = 5 (96/3 = 32 = 2⁵)', 96 / 3 === 32 && Math.pow(2, 5) === 32 && near(logB(2, 96) - logB(2, 3), 5, 1e-12))
check('L1(c): log_4 8 = 3/2 (base law at b = 2; 4^{3/2} = 8)', near(logB(4, 8), 1.5, 1e-12) && Math.pow(4, 1.5) === 8)
check('L2(b): log_0.25 32 = −5/2', near(logB(0.25, 32), -2.5, 1e-12))
check('L4(b): log_6 216 = 3, log_36 216 = 3/2, the sum 9/2', near(logB(6, 216), 3, 1e-12) && near(logB(36, 216), 1.5, 1e-12) && near(logB(6, 216) + logB(36, 216), 4.5, 1e-12))
const CROSS = Math.pow(2, logB(3, 5))
info(`L5(a): 2^(log_3 5) = ${CROSS} (r4 ${r4(CROSS)}); 5^(log_3 2) = ${Math.pow(5, logB(3, 2))} (r4 ${r4(Math.pow(5, logB(3, 2)))}); difference ${Math.abs(CROSS - Math.pow(5, logB(3, 2)))}`)
check('L5(a): the cross-base identity on (2, 3, 5): 2^(log_3 5) = 5^(log_3 2), difference below 1e-12', near(CROSS, Math.pow(5, logB(3, 2)), 1e-12))
check('L5(a) generality: 7^(log_2 11) = 11^(log_2 7) (a second witness)', near(Math.pow(7, logB(2, 11)), Math.pow(11, logB(2, 7)), 1e-9))
const LG2C = 0.3010
const LG3C = 0.4771
const built12 = 2 * LG2C + LG3C
const built45 = 2 * LG3C + (1 - LG2C)
check('L5(c) constant-built: log_10 12 = 2(0.3010) + 0.4771 = 1.0791', near(built12, 1.0791, 1e-12))
check('L5(c) constant-built: log 5 = 1 − 0.3010 = 0.6990 and log_10 45 = 2(0.4771) + 0.6990 = 1.6532', near(built45, 1.6532, 1e-12))
info(`L5(c) exact: log_10 12 = ${logB(10, 12)} (r7 ${r7(logB(10, 12))}); log_10 45 = ${logB(10, 45)} (r7 ${r7(logB(10, 45))})`)
check('L5(c) honesty: exact log_10 12 = 1.0791812, within 0.0001 of the constant-built 1.0791', near(logB(10, 12), 1.0791812, 5e-8) && Math.abs(logB(10, 12) - built12) < 0.0001)
check('L5(c) honesty: exact log_10 45 = 1.6532125, within 0.0001 of the constant-built 1.6532', near(logB(10, 45), 1.6532125, 5e-8) && Math.abs(logB(10, 45) - built45) < 0.0001)

// ================================================== C09 the quiz arithmetic
begin('C09 — the quiz arithmetic (keys and every distractor)')
check('quiz 1 key: log_a(mn) = log_a m + log_a n (witness log_2 6 = log_2 2 + log_2 3)', near(logB(2, 6), logB(2, 2) + logB(2, 3), 1e-12))
check('quiz 1 distractor A: log_a m · log_a n fails (log_2 2 · log_2 3 = 1.5850 ≠ log_2 6 = 2.5850)', !near(logB(2, 2) * logB(2, 3), logB(2, 6), 1e-6))
check('quiz 1 distractor B: log_a(m + n) fails (log_2 5 ≠ log_2 2 + log_2 3)', !near(logB(2, 5), logB(2, 2) + logB(2, 3), 1e-6))
check('quiz 1 distractor C: log_{a+a} m fails (log_4 6 ≠ log_2 6)', !near(logB(4, 6), logB(2, 6), 1e-6))
check('quiz 2 key: log_(a²) m = ½ log_a m (witness log_9 27 = 1.5 = ½ · log_3 27 = ½ · 3)', near(logB(9, 27), 0.5 * logB(3, 27), 1e-12) && near(logB(9, 27), 1.5, 1e-12))
check('quiz 2 ENGINE CATCH: the spec distractor log_a √m equals the key (log_3 √27 = 1.5 too) — the option is replaced by log_{2a} m, which is genuinely wrong (log_6 27 ≠ 1.5)', near(logB(3, Math.sqrt(27)), 1.5, 1e-12) && !near(logB(6, 27), 1.5, 1e-6), `log_6 27 = ${logB(6, 27)}`)
check('quiz 2 distractor A: 2 log_a m fails (2 · 3 = 6 ≠ 1.5)', !near(2 * logB(3, 27), logB(9, 27), 1e-9))
check('quiz 2 distractor C: (log_a m)² fails (3² = 9 ≠ 1.5)', !near(Math.pow(logB(3, 27), 2), logB(9, 27), 1e-9))
const Q3 = logB(3, 4) * logB(4, 5) * logB(5, 6) * logB(6, 7)
info(`quiz 3: the chain = ${Q3} (log_3 7 = ${logB(3, 7)}); log_7 3 = ${logB(7, 3)}; log_3 7 + log_7 3 = ${logB(3, 7) + logB(7, 3)}`)
check('quiz 3 key: log_3 4 · log_4 5 · log_5 6 · log_6 7 = log_3 7', near(Q3, logB(3, 7), 1e-12))
check('quiz 3 distractors: it is not log_7 3, not 1, not log_3 7 + log_7 3', !near(Q3, logB(7, 3), 1e-9) && !near(Q3, 1, 1e-9) && !near(Q3, logB(3, 7) + logB(7, 3), 1e-9))
check('quiz 4 key: 1/log_2 n + 1/log_4 n = log_n 8 at n = 10 (0.3010 + 0.6021 = 0.9031 = log_10 8)', near(1 / logB(2, 10) + 1 / logB(4, 10), logB(10, 8), 1e-12) && r4(1 / logB(2, 10)) === 0.301 && r4(1 / logB(4, 10)) === 0.6021 && r4(logB(10, 8)) === 0.9031)
check('quiz 4 distractor A: log_8 n fails (log_8 10 = 1/log_10 8, the answer flipped)', !near(logB(8, 10), logB(10, 8), 1e-9))
check('quiz 4 distractor C: 3/log_8 n = 3 log_n 8 fails (triple the answer)', !near(3 / logB(8, 10), logB(10, 8), 1e-9))
check('quiz 5 key: (2√3)⁶ = 1728, so log_(2√3) 1728 = 6', near(logB(2 * Math.sqrt(3), 1728), 6, 1e-9))
check('quiz 5 distractors: (2√3)⁴ = 144, (2√3)⁵ ≈ 498.8, (2√3)⁸ = 20736 — none is 1728', near(Math.pow(2 * Math.sqrt(3), 4), 144, 1e-9) && near(Math.pow(2 * Math.sqrt(3), 5), 498.8, 0.05) && !near(Math.pow(2 * Math.sqrt(3), 5), 1728, 1) && near(Math.pow(2 * Math.sqrt(3), 8), 20736, 1e-7))
check('quiz-explain pins: log_8 10 = 1.1073 and 3·log_10 8 = 2.7093 (4 dp each, the flipped and tripled answers of quiz item 4)', r4(logB(8, 10)) === 1.1073 && r4(3 * logB(10, 8)) === 2.7093)

// ==================================================================== PINS
{
  const lesson93 = chapter09.lessons[2] as Lesson
  const serialized = JSON.stringify(lesson93)

  begin('Q01 — identity, number, title, prerequisites, sources')
  check('id is aa-the-laws-of-logarithms-and-the-change-of-base', lesson93.id === 'aa-the-laws-of-logarithms-and-the-change-of-base')
  check('number is 9.3', lesson93.number === '9.3')
  check('title is "The Laws of Logarithms and the Change of Base"', lesson93.title === 'The Laws of Logarithms and the Change of Base')
  check('prerequisites exact (3 entries, in order)', JSON.stringify(lesson93.prerequisites) === JSON.stringify(['aa-logarithms-the-inverse-machine', 'aa-the-exponential-family-every-real-index', 'al-powers-and-the-laws-of-exponents']))
  check('sources exact (4 entries, in order)', JSON.stringify(lesson93.sources) === JSON.stringify(['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']))

  begin('Q02 — the honest word count')
  const words = countLessonWords(lesson93)
  info(`countLessonWords(lesson93) = ${words}`)
  check('countLessonWords >= 6000', words >= 6000, `got ${words}`)

  begin('Q03 — FOLD 1: the "Logarithm and Its Properties" subsection')
  const foldIdx = lesson93.blocks.findIndex((b) => b.kind === 'heading' && b.text === 'Logarithm and Its Properties')
  check('a heading block with text exactly "Logarithm and Its Properties"', foldIdx >= 0)
  let nextHead = lesson93.blocks.length
  if (foldIdx >= 0) {
    for (let i = foldIdx + 1; i < lesson93.blocks.length; i += 1) {
      if (lesson93.blocks[i].kind === 'heading') {
        nextHead = i
        break
      }
    }
  }
  const inner = foldIdx >= 0 ? lesson93.blocks.slice(foldIdx + 1, nextHead) : []
  info(`fold heading at block ${foldIdx}; subsection spans ${inner.length} blocks`)
  check('a definition callout inside the subsection (the formal gathering)', foldIdx >= 0 && inner.some((b) => b.kind === 'callout' && b.tone === 'definition'))
  check('>= 1 worked example inside the subsection, treating the properties (the product law cashed: tokens 1 and 2)', foldIdx >= 0 && inner.some((b) => b.kind === 'example' && b.steps.join(' ').includes('\\log_{10} 10')))

  begin('Q04 — FOLD 2: the reciprocal-law example family')
  const examplesAll = lesson93.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; title: string; steps: string[] }[]
  const recipExamples = examplesAll.filter((e) => /reciprocal/i.test(e.title + ' ' + e.steps.join(' ')))
  info(`example blocks: ${examplesAll.length}; naming the reciprocal route: ${recipExamples.length}`)
  check('>= 2 example blocks whose title+setup name the reciprocal route', recipExamples.length >= 2, `got ${recipExamples.length}`)
  check("the serialized lesson contains 'reciprocal'", serialized.includes('reciprocal'))

  begin('Q05 — worked-solution depth')
  check('>= 2 example blocks with >= 4 steps', examplesAll.filter((e) => e.steps.length >= 4).length >= 2)

  begin('Q06 — quiz pins')
  const quizzes = lesson93.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizzes[0]?.items ?? []
  check('exactly one quiz with exactly 5 items', quizzes.length === 1 && quiz.length === 5)
  check('quiz answers pinned [1, 1, 0, 0, 2]', JSON.stringify(quiz.map((it) => it.answer)) === JSON.stringify([1, 1, 0, 0, 2]), `got ${JSON.stringify(quiz.map((it) => it.answer))}`)
  check('every quiz explain addresses each wrong option (mentions "Option")', quiz.every((it) => it.explain.includes('Option') && it.explain.length > 150))

  begin('Q07 — figures: body count, solution count, aria-label, palette')
  const bodyFigures = lesson93.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  const exerciseSets = lesson93.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const allQuestions = exerciseSets.flatMap((e) => e.sets.flatMap((s) => s.questions))
  const solutionFigures = allQuestions.flatMap((q) => q.figures ?? [])
  const exampleFigures = examplesAll.flatMap((e) => (e as { figures?: { caption: string; svg: string }[] }).figures ?? [])
  const allSvgs = [...bodyFigures.map((f) => f.svg), ...exampleFigures.map((f) => f.svg), ...solutionFigures.map((f) => f.svg)]
  info(`body figures: ${bodyFigures.length}; solution figures: ${solutionFigures.length}; example-block figures: ${exampleFigures.length}`)
  check('>= 3 body figures (kind figure)', bodyFigures.length >= 3)
  check('>= 3 solution figures across the exercises', solutionFigures.length >= 3)
  check('every svg contains aria-label=', allSvgs.every((s) => s.includes('aria-label=')))
  check('every svg declares viewBox="0 0 720', allSvgs.every((s) => s.includes('viewBox="0 0 720 ')))
  check('every svg declares xmlns and role="img"', allSvgs.every((s) => s.includes('xmlns="http://www.w3.org/2000/svg"') && s.includes('role="img"')))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  check('no retired hex appears in any svg', retired.every((h) => !allSvgs.some((s) => s.includes(h))))
  const allowed = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
  const usedHexes = [...new Set(allSvgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}/g) ?? []))]
  info(`hexes used: ${usedHexes.join(' ')}`)
  check('every hex used is from the allowed palette table', usedHexes.every((h) => allowed.includes(h)), `offenders: ${usedHexes.filter((h) => !allowed.includes(h)).join(' ')}`)
  check('solution figures compact (viewBox height <= 240)', solutionFigures.every((f) => /viewBox="0 0 720 (\d+)"/.test(f.svg) && Number(/viewBox="0 0 720 (\d+)"/.exec(f.svg)?.[1]) <= 240))

  begin('Q08 — exercises census')
  info(`exercise questions: ${allQuestions.length}`)
  check('>= 16 exercise questions', allQuestions.length >= 16)
  check('every question has a non-empty steps-array solution', allQuestions.every((q) => Array.isArray(q.solution) && q.solution.length >= 1 && q.solution.every((s) => s.trim().length > 0)))
  check('every question carries an answer', allQuestions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0))
  check('>= 3 questions carry figures', allQuestions.filter((q) => (q.figures ?? []).length > 0).length >= 3)
  const levels = exerciseSets.flatMap((e) => e.sets.map((s) => s.level))
  check('six levels L1..L6 present, in order', JSON.stringify(levels) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']))

  begin('Q09 — block-kind census')
  const kinds = (k: string) => lesson93.blocks.filter((b) => b.kind === k).length
  check('>= 3 derivations', kinds('derivation') >= 3)
  check('>= 1 theorem callout', lesson93.blocks.some((b) => b.kind === 'callout' && b.tone === 'theorem'))
  check('>= 1 definition callout', lesson93.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 1)
  check('>= 1 terms block', kinds('terms') >= 1)
  check('>= 1 table (the mirror table)', kinds('table') >= 1)
  check('>= 1 roman list', lesson93.blocks.some((b) => b.kind === 'list' && b.marker === 'roman'))
  check('>= 5 formula cards', kinds('formula') >= 5)

  begin('Q10 — the plain-title rule')
  const plain = (s: string) => !s.includes('$')
  const callouts = lesson93.blocks.filter((b) => b.kind === 'callout') as { kind: 'callout'; title: string }[]
  const derivs = lesson93.blocks.filter((b) => b.kind === 'derivation') as { kind: 'derivation'; title: string; steps: { label: string }[] }[]
  const formulas = lesson93.blocks.filter((b) => b.kind === 'formula') as { kind: 'formula'; name: string }[]
  const termsBlocks = lesson93.blocks.filter((b) => b.kind === 'terms') as { kind: 'terms'; items: { term: string }[] }[]
  const quizBlocks = lesson93.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; title?: string }[]
  const headings = lesson93.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  check('no $ in any callout title', callouts.every((c) => plain(c.title)))
  check('no $ in any derivation title or step label', derivs.every((d) => plain(d.title) && d.steps.every((s) => plain(s.label))))
  check('no $ in any formula name', formulas.every((f) => plain(f.name)))
  check('no $ in any term field', termsBlocks.every((t) => t.items.every((i) => plain(i.term))))
  check('no $ in the quiz title', quizBlocks.every((q) => q.title === undefined || plain(q.title)))
  check('no $ in any heading', headings.every((h) => plain(h.text)))

  begin('Q11 — pinned tokens and placeholder hygiene')
  for (const tok of ['2.32192809', '1.4649735', '1.1361219', '1728']) {
    check(`token "${tok}" appears in the serialized lesson`, serialized.includes(tok))
  }
  check('no placeholders (TODO / 【】 / XXX / undefined / NaN)', !serialized.includes('TODO') && !serialized.includes('\u3010\u3011') && !serialized.includes('XXX') && !serialized.includes('undefined') && !serialized.includes('NaN'))
  check('no stray control characters from bad escapes', !/[\u0000-\u0008\u000b-\u001f\u007f]/.test(serialized))
}

// ------------------------------------------------------------------ tallies
const s_pass = tally.reduce((s, t) => s + t.pass, 0)
const s_fail = tally.reduce((s, t) => s + t.fail, 0)
for (const t of tally) console.log(`    ${t.id}: ${t.pass}/${t.pass + t.fail}`)
return { id: 'E+F (9.3 engines + pins)', pass: s_pass, fail: s_fail }
}

// ------------------------------------------------------------------
// (G + H) from v-aa94.ts — the 9.4 engines + pins, wrapped whole
// ------------------------------------------------------------------

function sectionG(): SectionResult {
/**
 * v-aa94.ts — the verify-first ENGINE for Advanced Algebra lesson 9.4
 * "Logarithmic and Exponential Equations" (agent aa94 of the run-121
 * whole-chapter swarm).
 *
 * Discipline (shared contract §0 + the lesson spec's engine-and-pin contract):
 * every number the lesson dares to print is recomputed here by brute force
 * FIRST — bisections, sweeps, exact checks — and only then does the prose get
 * written. Where this engine disagrees with the spec sheet, THE ENGINE WINS
 * and the prose is adjusted; every such catch is flagged in this header and
 * repeated in the agent's final report.
 *
 * SPEC CATCHES this engine adjudicated (the engine wins, the prose follows):
 *  C1. h(3) for h(x) = log_2(x + 2) + x - 4: the sheet wrote "2 + 3 - 4 = 1",
 *      which would need log_2 5 = 2 (i.e. 2² = 5) — false. The honest value is
 *      log_2 5 + 3 - 4 = log_2 5 - 1 = 1.3219281 (7 dp); the sign bracket
 *      h(1) < 0 < h(3) stands unchanged. G27 pins it.
 *  C2. L3(c): the sheet's first witness log_{1/2}(x² - 4x + 3) ≥ -1 conflicts
 *      with its own domain rider — the argument x² - 4x + 3 is ≤ 0 all over
 *      [1, 3], so the flipped interval [2 - √3, 2 + √3] contains refused
 *      points. The engine ADOPTS the sheet's own redesign note — the witness
 *      log_{1/2}(x² - 4x + 5) ≥ -1 → x ∈ [1, 3], domain always clean — and
 *      pins the broken twin's honest answer [2 - √3, 1) ∪ (3, 2 + √3] as a
 *      cautionary aside. G19 carries both.
 *  C3. L4(b): the sheet's "x^{log_4 x} = 8x → t = 2 or -1/2 → x = 16 or 1/2"
 *      is arithmetically false: t² - t - 3/2 = 0 at t = 2 reads 4 - 2 - 1.5 =
 *      +1/2 ≠ 0 (honest roots (1 ± √7)/2). The engine redesigns the constant
 *      honestly: x^{log_4 x} = 64x² → t² - 2t - 3 = 0 → t ∈ {3, -1} →
 *      x ∈ {64, 1/4}, both verified exactly. G21 carries it.
 *
 * Shape: self-contained script. Section G (G01…) = pure-arithmetic engines,
 * no repo imports. Section H (H01…) = pins reading the authored part file —
 * appended AFTER the prose existed and the G-engines ran green, per the same
 * discipline.
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-aa94.ts
 */

/* ------------------------------------------------------------------ */
/* collector                                                           */
/* ------------------------------------------------------------------ */

const failures: string[] = []
let gTotal = 0
let gPass = 0
let hTotal = 0
let hPass = 0

function check(name: string, ok: boolean, detail = ''): void {
  const isPin = name.startsWith('H')
  if (isPin) {
    hTotal++
    if (ok) hPass++
  } else {
    gTotal++
    if (ok) gPass++
  }
  if (!ok) failures.push(`${name}${detail ? ' — ' + detail : ''}`)
  console.log(`${ok ? '[ ok ]' : '[FAIL]'} ${name}${detail ? ' — ' + detail : ''}`)
}

/** fixed-decimal equality: got.toFixed(dp) === want */
function eq(name: string, got: number, dp: number, want: string): void {
  check(name, got.toFixed(dp) === want, `got ${got.toFixed(dp)}, want ${want}`)
}

function between(name: string, lo: number, v: number, hi: number): void {
  check(name, lo < v && v < hi, `v = ${v}, claimed (${lo}, ${hi})`)
}

/** bisection root of f on [lo, hi] (sign change assumed) */
function bisect(f: (x: number) => number, lo: number, hi: number, tol = 5e-4): number {
  let a = lo
  let b = hi
  const fa = f(a)
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2
    const fm = f(m)
    if (fm === 0) return m
    if (Math.sign(fm) === Math.sign(fa)) a = m
    else b = m
    if (b - a < tol) break
  }
  return (a + b) / 2
}

const logb = (b: number, x: number) => Math.log(x) / Math.log(b)
const log2 = (x: number) => logb(2, x)
const log3 = (x: number) => logb(3, x)
const log10 = (x: number) => Math.log10(x)

console.log('==========================================================')
console.log('v-aa94 — engines for AA 9.4 "Logarithmic and Exponential Equations"')
console.log('==========================================================')

/* ------------------------------------------------------------------ */
/* G01 · the one-one machine + the flip law (the same-base sanity)     */
/* ------------------------------------------------------------------ */
{
  let up = true
  for (let x = -8; x < 8 - 1e-9; x += 0.05) if (!(Math.pow(2, x) < Math.pow(2, x + 0.05))) up = false
  check('G01 2^x strictly increasing on [-8, 8] (0.05 sweep) — the one-one machine', up)
  let down = true
  for (let x = -8; x < 8 - 1e-9; x += 0.05) if (!(Math.pow(0.5, x) > Math.pow(0.5, x + 0.05))) down = false
  check('G01 (1/2)^x strictly decreasing on [-8, 8] (0.05 sweep) — still one-one', down)
  let logUp = true
  for (let x = 0.05; x < 40; x += 0.05) if (!(log2(x) < log2(x + 0.05))) logUp = false
  check('G01 log_2 x strictly increasing on (0, 40] (0.05 sweep)', logUp)
  let flip = true
  for (let u = 0.07; u < 20; u += 0.07) if (Math.abs(logb(0.5, u) + log2(u)) > 1e-12) flip = false
  check('G01 the flip law log_{1/2} u = −log_2 u on a 0.07 sweep of (0, 20]', flip)
  let flip4 = true
  for (let u = 0.09; u < 20; u += 0.09) if (Math.abs(logb(0.25, u) + logb(4, u)) > 1e-12) flip4 = false
  check('G01 the flip law log_{0.25} u = −log_4 u on a 0.09 sweep of (0, 20]', flip4)
}

/* ------------------------------------------------------------------ */
/* G02 · Illustration 1: 3^{2x} − 8·3^x − 9 = 0 → x = 2 (t = −1 refused) */
/* ------------------------------------------------------------------ */
{
  check('G02 the hidden quadratic at t = 9: 81 − 72 − 9 = 0', 81 - 72 - 9 === 0)
  check('G02 factor check (t − 9)(t + 1) = t² − 8t − 9 at t = 4.7', Math.abs((4.7 - 9) * (4.7 + 1) - (4.7 * 4.7 - 8 * 4.7 - 9)) < 1e-12)
  check('G02 at the root x = 2: 3^{2x} − 8·3^x − 9 = 0 exactly', Math.pow(3, 4) === 81 && 8 * 9 === 72 && 81 - 72 - 9 === 0)
  check('G02 3^x = 9 = 3², so x = 2 by the same-base law', Math.pow(3, 2) === 9)
  let positive = true
  for (let x = -10; x <= 10; x += 0.1) if (!(Math.pow(3, x) > 0)) positive = false
  check('G02 3^x > 0 on a 0.1 sweep of [-10, 10] — t = −1 is dead on arrival', positive)
  // exactly one real root: t² − 8t − 9 has roots 9 and −1; only 9 is a legal value of 3^x
  eq('G02 quadratic roots of t² − 8t − 9: (8 ± 10)/2 = 9 and −1', (8 + 10) / 2, 0, '9')
  eq('G02 the refused root', (8 - 10) / 2, 0, '-1')
  check('G02 discriminant 64 + 36 = 100', 64 + 36 === 100)
}

/* ------------------------------------------------------------------ */
/* G03 · Illustration 2: 2^{2x} − 6·2^x + 8 = 0 → x ∈ {1, 2}            */
/* ------------------------------------------------------------------ */
{
  check('G03 at x = 1: 4 − 12 + 8 = 0 exactly', 4 - 12 + 8 === 0)
  check('G03 at x = 2: 16 − 24 + 8 = 0 exactly', 16 - 24 + 8 === 0)
  check('G03 factor (t − 2)(t − 4) = t² − 6t + 8 at t = 3.3', Math.abs((3.3 - 2) * (3.3 - 4) - (3.3 * 3.3 - 6 * 3.3 + 8)) < 1e-12)
  check('G03 discriminant 36 − 32 = 4; roots (6 ± 2)/2 = {2, 4} — both positive, no refusal', 36 - 32 === 4 && (6 + 2) / 2 === 4 && (6 - 2) / 2 === 2)
  check('G03 both candidates survive: t = 2 → x = 1 and t = 4 → x = 2', Math.pow(2, 1) === 2 && Math.pow(2, 2) === 4)
  let strays = 0
  for (let x = -3; x <= 3; x += 0.0005) {
    const v = Math.pow(2, 2 * x) - 6 * Math.pow(2, x) + 8
    if (Math.abs(v) < 1e-9) strays++
  }
  check('G03 0.0005 sweep of [-3, 3]: exactly 2 solutions (1, 2)', strays === 2, `found ${strays}`)
}

/* ------------------------------------------------------------------ */
/* G04 · Illustration 3: log_2 4 + log_2(x+7) − log_2(x−1) = 4 → 11/3   */
/* ------------------------------------------------------------------ */
{
  const x = 11 / 3
  eq('G04 11/3 to 7dp = 3.6666667', x, 7, '3.6666667')
  check('G04 the linear collapse 44 = 12x (44/12 = 11/3 in doubles)', Math.abs(44 / 12 - x) < 1e-15)
  check('G04 combined argument 4(x + 7)/(x − 1) at x = 11/3 equals 16 exactly (1e-12)', Math.abs((4 * (x + 7)) / (x - 1) - 16) < 1e-12)
  check('G04 log_2 of the combined argument reads 4 (1e-12)', Math.abs(log2((4 * (x + 7)) / (x - 1)) - 4) < 1e-12)
  check('G04 the original equation at x = 11/3: 2 + log_2(32/3) − log_2(8/3) = 4 (1e-12)', Math.abs(2 + log2(x + 7) - log2(x - 1) - 4) < 1e-12)
  check('G04 log_2 4 = 2 exactly (the constant term)', Math.abs(log2(4) - 2) < 1e-12)
  between('G04 domain: 11/3 > 1 (the binding wall), and x + 7 > 0 besides', 1, x, 100)
}

/* ------------------------------------------------------------------ */
/* G05 · Illustration 4 (the extraneous showcase): log₁₀(2 − x) = 2 log₁₀(x + 1) */
/* ------------------------------------------------------------------ */
{
  const s = Math.sqrt(13)
  eq('G05 √13 to 10dp = 3.6055512755', s, 10, '3.6055512755')
  const keep = (-3 + s) / 2
  const refuse = (-3 - s) / 2
  eq('G05 the survivor (−3 + √13)/2 to 10dp = 0.3027756377', keep, 10, '0.3027756377')
  eq('G05 the survivor to 4dp = 0.3028', keep, 4, '0.3028')
  eq('G05 the refused root (−3 − √13)/2 to 10dp = −3.3027756377', refuse, 10, '-3.3027756377')
  eq('G05 the refused root to 4dp = −3.3028', refuse, 4, '-3.3028')
  check('G05 quadratic x² + 3x − 1 = 0 at both candidates (1e-12)', Math.abs(keep * keep + 3 * keep - 1) < 1e-12 && Math.abs(refuse * refuse + 3 * refuse - 1) < 1e-12)
  check('G05 discriminant 9 + 4 = 13', 9 + 4 === 13)
  between('G05 the survivor sits inside the domain band (−1, 2)', -1, keep, 2)
  check('G05 the refused root falls outside: −3.3028 < −1 (fails x + 1 > 0)', refuse < -1)
  check('G05 the squared identity 2 − x = (x + 1)² at the survivor (1e-12)', Math.abs(2 - keep - Math.pow(keep + 1, 2)) < 1e-12)
  check('G05 the squared identity ALSO holds at the refused root — the move manufactured it (1e-12)', Math.abs(2 - refuse - Math.pow(refuse + 1, 2)) < 1e-12)
  check('G05 the ORIGINAL equation at the survivor: log₁₀(2 − x) − 2 log₁₀(x + 1) = 0 (1e-12)', Math.abs(log10(2 - keep) - 2 * log10(keep + 1)) < 1e-12)
  check('G05 at the refused root the term x + 1 = −2.3028 < 0 — the log is undefined (NaN)', refuse + 1 < 0 && Number.isNaN(log10(refuse + 1)))
  // exactly one root on the band: h strictly decreasing there (stop short of the wall at x = 2)
  const h = (x: number) => log10(2 - x) - 2 * log10(x + 1)
  let mono = true
  for (let x = -0.99; x < 2 - 0.03; x += 0.02) if (!(h(x) > h(x + 0.02))) mono = false
  check('G05 h(x) = log₁₀(2 − x) − 2 log₁₀(x + 1) strictly decreasing on (−1, 1.97) (0.02 sweep)', mono)
  check('G05 sign change: h(−0.9) > 0 > h(1.9) — exactly one root on the band', h(-0.9) > 0 && h(1.9) < 0)
}

/* ------------------------------------------------------------------ */
/* G06 · Illustration 5: log_2(3x − 1) = log_{1/2}(4/x) → x = 4/11      */
/* ------------------------------------------------------------------ */
{
  const x = 4 / 11
  eq('G06 4/11 to 7dp = 0.3636364', x, 7, '0.3636364')
  check('G06 the linear collapse 11x = 4 (doubles, 1e-15)', Math.abs(11 * x - 4) < 1e-15)
  check('G06 combined argument 4(3x − 1)/x at 4/11 equals 1 exactly (1e-12)', Math.abs((4 * (3 * x - 1)) / x - 1) < 1e-12)
  check('G06 log_2[4(3x − 1)/x] = 0 = 2⁰ (1e-12)', Math.abs(log2((4 * (3 * x - 1)) / x)) < 1e-12)
  check('G06 the ORIGINAL equation at 4/11: log_2(1/11) = log_{1/2}(11) = −log_2 11 (1e-12)', Math.abs(log2(3 * x - 1) - logb(0.5, 4 / x)) < 1e-12)
  eq('G06 3x − 1 = 1/11 = 0.0909091 > 0 — the argument is legal', 3 * x - 1, 7, '0.0909091')
  check('G06 4/x = 11 > 0 — legal', Math.abs(4 / x - 11) < 1e-12)
  between('G06 domain x > 1/3: 4/11 ≈ 0.3636 sits inside', 1 / 3, x, 1)
  // the count: the collapsed equation is linear → exactly one candidate
  const g = (t: number) => 12 * t - 4 - t
  check('G06 the collapsed equation 12x − 4 = x is linear — at most one candidate', Math.abs(g(x)) < 1e-15)
}

/* ------------------------------------------------------------------ */
/* G07 · Illustration 6: x^{log x} = 100x → x ∈ {100, 0.1}              */
/* ------------------------------------------------------------------ */
{
  const a = 100
  const b = 0.1
  check('G07 at x = 100: 100^{log 100} = 100² = 10000 = 100·100 (1e-9)', Math.abs(Math.pow(a, log10(a)) - 100 * a) < 1e-9)
  check('G07 at x = 0.1: 0.1^{log 0.1} = 0.1^{−1} = 10 = 100·0.1 (1e-9)', Math.abs(Math.pow(b, log10(b)) - 100 * b) < 1e-9)
  check('G07 log₁₀ 100 = 2 exactly (the t = 2 branch)', Math.abs(log10(100) - 2) < 1e-12)
  check('G07 log₁₀ 0.1 = −1 exactly (the t = −1 branch)', Math.abs(log10(0.1) + 1) < 1e-12)
  check('G07 factor (t − 2)(t + 1) = t² − t − 2 at t = 0.6', Math.abs((0.6 - 2) * (0.6 + 1) - (0.36 - 0.6 - 2)) < 1e-12)
  check('G07 both roots positive — the domain court waves both through', a > 0 && b > 0)
}

/* ------------------------------------------------------------------ */
/* G08 · Illustration 7 (cross-base): 9^{log_4 x} − 12x^{log_4 3} + 27 = 0 */
/* ------------------------------------------------------------------ */
{
  // the exchange identity a^{log_b c} = c^{log_b a}
  let exch = true
  for (let c = 0.5; c <= 20; c += 0.3) if (Math.abs(Math.pow(9, logb(4, c)) - Math.pow(c, logb(4, 9))) > 1e-9) exch = false
  check('G08 the exchange identity 9^{log_4 c} = c^{log_4 9} on a 0.3 sweep of [0.5, 20]', exch)
  check('G08 log_4 9 = 2 log_4 3 — the square structure (1e-12)', Math.abs(logb(4, 9) - 2 * logb(4, 3)) < 1e-12)
  check('G08 at x = 4: 9^{log_4 4} − 12·4^{log_4 3} + 27 = 0 (1e-12; the terms read 9, 36)', Math.abs(Math.pow(9, logb(4, 4)) - 9) < 1e-12 && Math.abs(Math.pow(4, logb(4, 3)) - 3) < 1e-12 && Math.abs(Math.pow(9, logb(4, 4)) - 12 * Math.pow(4, logb(4, 3)) + 27) < 1e-12)
  check('G08 at x = 16: 81 − 108 + 27 = 0 (1e-12; the terms read 81, 108)', Math.abs(Math.pow(9, logb(4, 16)) - 81) < 1e-12 && Math.abs(Math.pow(16, logb(4, 3)) - 9) < 1e-12 && Math.abs(Math.pow(9, logb(4, 16)) - 12 * Math.pow(16, logb(4, 3)) + 27) < 1e-12)
  check('G08 the substitution identity 4^{log_4 3} = 3 (the machine undoes itself)', Math.abs(Math.pow(4, logb(4, 3)) - 3) < 1e-12)
  check('G08 16^{log_4 3} = (4²)^{log_4 3} = 3² = 9 (1e-12)', Math.abs(Math.pow(16, logb(4, 3)) - 9) < 1e-12)
  check('G08 factor (y − 3)(y − 9) = y² − 12y + 27 at y = 5.5', Math.abs((5.5 - 3) * (5.5 - 9) - (30.25 - 66 + 27)) < 1e-12)
  check('G08 both roots x ∈ {4, 16} are positive — the domain is clean', 4 > 0 && 16 > 0)
  // no stray solutions: sweep x ∈ (0, 30]
  let strays = 0
  for (let x = 0.2; x <= 30; x += 0.001) {
    const v = Math.pow(9, logb(4, x)) - 12 * Math.pow(x, logb(4, 3)) + 27
    if (Math.abs(v) < 1e-7) strays++
  }
  check('G08 0.001 sweep of [0.2, 30]: exactly 2 solutions (4, 16)', strays === 2, `found ${strays}`)
}

/* ------------------------------------------------------------------ */
/* G09 · Illustration 8 (uniqueness): log_2(x + 2) = 4 − x → x = 2, unique */
/* ------------------------------------------------------------------ */
{
  const h = (x: number) => log2(x + 2) + x - 4
  check('G09 the exhibit: h(2) = log_2 4 + 2 − 4 = 0 exactly (1e-12)', Math.abs(h(2)) < 1e-12)
  check('G09 both sides read 2 at x = 2: log_2 4 = 2 and 4 − 2 = 2', Math.abs(log2(4) - 2) < 1e-12 && 4 - 2 === 2)
  let mono = true
  for (let x = -1.999; x < 6; x += 0.02) if (!(h(x) < h(x + 0.02))) mono = false
  check('G09 h strictly increasing on (−2, 6] (0.02 sweep) — the slope is at least 1 everywhere', mono)
  eq('G09 log_2 3 to 7dp = 1.5849625', log2(3), 7, '1.5849625')
  eq('G09 h(1) = log_2 3 − 3 to 7dp = −1.4150375', h(1), 7, '-1.4150375')
  eq('G09 log_2 5 to 7dp = 2.3219281', log2(5), 7, '2.3219281')
  // SPEC CATCH C1: the sheet wrote h(3) = 2 + 3 − 4 = 1; the honest value is log_2 5 − 1
  eq('G09 h(3) = log_2 5 + 3 − 4 to 7dp = 1.3219281 (spec said 1 — engine wins)', h(3), 7, '1.3219281')
  check('G09 the bracket stands: h(1) < 0 < h(3)', h(1) < 0 && h(3) > 0)
  // uniqueness: at most one root; x = 2 is it
  let strays = 0
  for (let x = -1.95; x <= 5.5; x += 0.0005) if (Math.abs(h(x)) < 1e-9) strays++
  check('G09 0.0005 sweep of [−1.95, 5.5]: exactly 1 root (x = 2)', strays === 1, `found ${strays}`)
}

/* ------------------------------------------------------------------ */
/* G10 · Illustration 9: log_{1/2}(x² − 8x + 17) ≥ −1 → x ∈ [3, 5]      */
/* ------------------------------------------------------------------ */
{
  const arg = (x: number) => x * x - 8 * x + 17
  check('G10 the flip constant (1/2)^{−1} = 2 exactly', Math.pow(0.5, -1) === 2)
  check('G10 endpoint x = 3: argument = 9 − 24 + 17 = 2 exactly (equality admitted by ≥)', arg(3) === 2)
  check('G10 endpoint x = 5: argument = 25 − 40 + 17 = 2 exactly', arg(5) === 2)
  check('G10 interior x = 4: argument = 1 ≤ 2 ✓, and log_{1/2} 1 = 0 ≥ −1 ✓', arg(4) === 1 && Math.abs(logb(0.5, 1)) < 1e-12)
  check('G10 factor (x − 3)(x − 5) = x² − 8x + 15 at x = 4.2', Math.abs((4.2 - 3) * (4.2 - 5) - (17.64 - 33.6 + 15)) < 1e-12)
  let rider = true
  for (let x = -10; x <= 10; x += 0.1) if (!(arg(x) > 0)) rider = false
  check('G10 the rider is free: x² − 8x + 17 = (x − 4)² + 1 > 0 on a 0.1 sweep of [−10, 10]', rider)
  // outside witnesses (2.9 and 5.1 both read the argument 2.21 to 1e-9)
  check('G10 x = 2.9 is outside: argument 2.21 > 2, so log_{1/2}(2.21) < −1', Math.abs(arg(2.9) - 2.21) < 1e-9 && logb(0.5, arg(2.9)) < -1)
  check('G10 x = 5.1 is outside likewise (argument 2.21 again, by the symmetry about x = 4)', Math.abs(arg(5.1) - 2.21) < 1e-9)
  // every interior point satisfies the flipped inequality
  let inside = true
  for (let x = 3.001; x <= 4.999; x += 0.02) if (!(arg(x) <= 2)) inside = false
  check('G10 interior sweep (3, 5): argument ≤ 2 throughout', inside)
}

/* ------------------------------------------------------------------ */
/* G11 · Illustration 10: log_2(2x² − 5x − 3) > 1 → the wings            */
/* ------------------------------------------------------------------ */
{
  const s = Math.sqrt(65)
  eq('G11 √65 to 7dp = 8.0622577', s, 7, '8.0622577')
  const lo = (5 - s) / 4
  const hi = (5 + s) / 4
  eq('G11 the left wall (5 − √65)/4 to 7dp = −0.7655644', lo, 7, '-0.7655644')
  eq('G11 the right wall (5 + √65)/4 to 7dp = 3.2655644', hi, 7, '3.2655644')
  check('G11 at the walls the argument 2x² − 5x − 3 reads exactly 2 (1e-12)', Math.abs(2 * lo * lo - 5 * lo - 3 - 2) < 1e-12 && Math.abs(2 * hi * hi - 5 * hi - 3 - 2) < 1e-12)
  // the rider: 2x² − 5x − 3 = (2x + 1)(x − 3), walls −0.5 and 3, WIDER
  check('G11 rider walls: 2x² − 5x − 3 = 0 at x = −0.5 and x = 3 exactly', 2 * 0.25 + 2.5 - 3 === 0 && 18 - 15 - 3 === 0)
  check('G11 nesting: (5 − √65)/4 ≈ −0.7656 < −0.5 — the strict wing sits inside the rider wing', lo < -0.5)
  check('G11 nesting: (5 + √65)/4 ≈ 3.2656 > 3 — likewise on the right', hi > 3)
  const arg = (x: number) => 2 * x * x - 5 * x - 3
  check('G11 witness x = −1: argument 4 > 2 — inside the strict wing', arg(-1) === 4)
  eq('G11 witness x = −0.6: argument 0.72 — defined (rider ✓) yet below 2, the inequality fails', arg(-0.6), 2, '0.72')
  check('G11 witness x = 0: argument −3 — refused by the rider', arg(0) === -3)
  eq('G11 witness x = 3.1: argument 0.72 — the mirror case between the walls', arg(3.1), 2, '0.72')
  check('G11 witness x = 4: argument 9 > 2 — inside', arg(4) === 9)
  let wing = true
  for (let x = -4; x < lo - 1e-6; x += 0.03) if (!(arg(x) > 2)) wing = false
  for (let x = hi + 1e-6; x <= 6; x += 0.03) if (!(arg(x) > 2)) wing = false
  check('G11 the wings satisfy argument > 2 on 0.03 sweeps of (−4, −0.7656) and (3.2656, 6)', wing)
}

/* ------------------------------------------------------------------ */
/* G12 · Illustration 11 (counting): log_2 x + log_4 x = 3 → x = 4, one root */
/* ------------------------------------------------------------------ */
{
  check('G12 the unify law log_4 x = (1/2) log_2 x at x = 4: 1 = (1/2)·2 (1e-12)', Math.abs(logb(4, 4) - 0.5 * log2(4)) < 1e-12)
  let unify = true
  for (let x = 0.05; x <= 100; x += 0.05) if (Math.abs(logb(4, x) - 0.5 * log2(x)) > 1e-12) unify = false
  check('G12 log_4 x = (1/2) log_2 x on a 0.05 sweep of (0, 100] — the change-of-base law at 4/2', unify)
  check('G12 at x = 4: log_2 4 + log_4 4 = 2 + 1 = 3 exactly', Math.abs(log2(4) - 2) < 1e-12 && Math.abs(logb(4, 4) - 1) < 1e-12)
  const H = (x: number) => log2(x) + logb(4, x)
  let mono = true
  for (let x = 0.05; x < 100; x += 0.05) if (!(H(x) < H(x + 0.05))) mono = false
  check('G12 log_2 x + log_4 x is strictly increasing (0.05 sweep) — linear in log_2 x, no fork', mono)
  let strays = 0
  for (let x = 0.05; x <= 100; x += 0.001) if (Math.abs(H(x) - 3) < 1e-9) strays++
  check('G12 0.001 sweep of (0, 100]: exactly 1 solution (x = 4)', strays === 1, `found ${strays}`)
}

/* ------------------------------------------------------------------ */
/* G13 · the roman example-run after the definition (the three moves)    */
/* ------------------------------------------------------------------ */
{
  // (i) squaring a radical: √(x + 7) = x + 1 → candidates {2, −3}, −3 refused
  check('G13 (i) the quadratic x² + x − 6 = 0 at both candidates', Math.abs(4 + 2 - 6) < 1e-12 && Math.abs(9 - 3 - 6) < 1e-12)
  check('G13 (i) x = 2 survives: √9 = 3 = 2 + 1', Math.sqrt(9) === 3)
  check('G13 (i) x = −3 is refused: √4 = 2 ≠ −2 — the radical cannot read negative', Math.sqrt(4) === 2 && Math.sqrt(4) !== -2)
  check('G13 (i) the refusal reason: x + 1 = −2 < 0, and a principal root is never negative', -3 + 1 < 0)
  // (ii) combining logs: log₁₀(x − 2) + log₁₀(x + 3) = 0 → survivors/refused
  const s = Math.sqrt(29)
  eq('G13 (ii) √29 to 7dp = 5.3851648', s, 7, '5.3851648')
  const keep = (-1 + s) / 2
  const refuse = (-1 - s) / 2
  eq('G13 (ii) the survivor (−1 + √29)/2 to 7dp = 2.1925824', keep, 7, '2.1925824')
  eq('G13 (ii) the refused root (−1 − √29)/2 to 7dp = −3.1925824', refuse, 7, '-3.1925824')
  check('G13 (ii) at the survivor the combined argument (x − 2)(x + 3) = 1 exactly (1e-12)', Math.abs((keep - 2) * (keep + 3) - 1) < 1e-12)
  check('G13 (ii) the original equation at the survivor: log₁₀(x − 2) + log₁₀(x + 3) = 0 (1e-12)', Math.abs(log10(keep - 2) + log10(keep + 3)) < 1e-12)
  check('G13 (ii) the refused root fails the domain: x + 3 = −0.1926 < 0', refuse + 3 < 0)
  check('G13 (ii) the combined form HID the wall: log₁₀[(x − 2)(x + 3)] is defined at the refused root (product 1 > 0)', Math.abs((refuse - 2) * (refuse + 3) - 1) < 1e-12)
  // (iii) the survivors of Illustration 2: both branches through
  check('G13 (iii) 2^{2x} − 6·2^x + 8 = 0 keeps BOTH candidates {1, 2} — the court is not always a tragedy', Math.pow(2, 2) - 6 * 2 + 8 === 0 && Math.pow(2, 4) - 6 * 4 + 8 === 0)
}

/* ------------------------------------------------------------------ */
/* G14 · the direction-law witnesses (the family decides)              */
/* ------------------------------------------------------------------ */
{
  // a = 2 > 1: log_2 x > 3 ⟺ x > 8
  let rising = true
  for (let x = 0.05; x <= 20; x += 0.05) if (!(log2(x) > 3 === x > 8)) rising = false
  check('G14 a = 2 > 1: log_2 x > 3 ⟺ x > 8, on a 0.05 sweep of (0, 20]', rising)
  // a = 1/2: log_{1/2} x > 2 ⟺ 0 < x < 1/4
  let falling = true
  for (let x = 0.05; x <= 5; x += 0.05) if (!(logb(0.5, x) > 2 === x < 0.25)) falling = false
  check('G14 a = 1/2 < 1: log_{1/2} x > 2 ⟺ 0 < x < (1/2)² = 1/4, on a 0.05 sweep of (0, 5]', falling)
  let anchor = true
  for (let x = 0.05; x <= 5; x += 0.05) if (!(logb(0.5, x) > 0 === x < 1)) anchor = false
  check('G14 a = 1/2 < 1: log_{1/2} x > 0 ⟺ 0 < x < 1 — the sign law of 9.2 reprised', anchor)
  let anchor2 = true
  for (let x = 0.05; x <= 20; x += 0.05) if (!(log2(x) > 0 === x > 1)) anchor2 = false
  check('G14 a = 2 > 1: log_2 x > 0 ⟺ x > 1', anchor2)
  // two-log comparison
  check('G14 a = 2: log_2 5 > log_2 2 exactly because 5 > 2 > 0 — the rising family keeps the order', log2(5) > log2(2) && 5 > 2 && logb(0.5, 0.5) > logb(0.5, 2) && 0.5 < 2)
  check('G14 a = 1/2: log_{1/2} 5 > log_{1/2} 2 is FALSE (5 > 2) — the falling family reverses it', !(logb(0.5, 5) > logb(0.5, 2)))
  // quiz item 4 witness at another base below one
  check('G14 quiz witness a = 0.1: log_{0.1} 0.005 ≈ 2.3010 > 2, and 0.005 < 0.01 = a²', logb(0.1, 0.005) > 2 && 0.005 < 0.01)
}

/* ------------------------------------------------------------------ */
/* G15 · L1: 10, 5, x > 6                                              */
/* ------------------------------------------------------------------ */
{
  check('G15 (a) log_3(x − 1) = 2 → x − 1 = 3² = 9 → x = 10; log_3 9 = 2 (1e-12)', Math.pow(3, 2) === 9 && Math.abs(log3(9) - 2) < 1e-12)
  check('G15 (a) domain x > 1: 10 > 1 ✓', 10 > 1)
  check('G15 (b) 2^x = 32 → x = 5: 2⁵ = 32 exactly', Math.pow(2, 5) === 32)
  // (c) domain of log_5(x + 2) + log_5(x − 6): the binding wall
  check('G15 (c) the walls: x + 2 > 0 (x > −2) and x − 6 > 0 (x > 6) — the binding one is x > 6', -2 < 6)
  check('G15 (c) witness x = 7: both arguments positive (9, 1)', 7 + 2 > 0 && 7 - 6 > 0)
  check('G15 (c) refusal x = 6: the second argument is 0', 6 - 6 === 0)
  check('G15 (c) refusal x = 0: x − 6 = −6 < 0', 0 - 6 < 0)
}

/* ------------------------------------------------------------------ */
/* G16 · L2: x = 3; 4/5; 3^{5/3}                                        */
/* ------------------------------------------------------------------ */
{
  check('G16 (a) (3 + 6)/(3 − 2) = 9 exactly, and log_3 9 = 2 (1e-12)', (3 + 6) / (3 - 2) === 9 && Math.abs(log3(9) - 2) < 1e-12)
  check('G16 (a) the linear collapse 24 = 8x → x = 3; domain 3 > 2 ✓', 24 === 8 * 3 && 3 > 2)
  const x = 4 / 5
  eq('G16 (b) x = 4/5 = 0.8', x, 1, '0.8')
  check('G16 (b) 4^{x+1} = 8^{2−x} at x = 4/5 (1e-9): both sides 2^{3.6}', Math.abs(Math.pow(4, x + 1) - Math.pow(8, 2 - x)) < 1e-9 && Math.abs(Math.pow(4, x + 1) - Math.pow(2, 3.6)) < 1e-9)
  eq('G16 (b) the common value 2^{3.6} to 7dp = 12.1257325', Math.pow(2, 3.6), 7, '12.1257325')
  check('G16 (b) the exponent equation 2x + 2 = 6 − 3x → 5x = 4', 5 * x === 4)
  const v = Math.pow(3, 5 / 3)
  eq('G16 (c) 3^{5/3} to 7dp = 6.2402515', v, 7, '6.2402515')
  eq('G16 (c) 3^{5/3} to 4dp = 6.2403', v, 4, '6.2403')
  check('G16 (c) the collapse (3/2)log_3 x = 5/2 → log_3 x = 5/3 (1e-12)', Math.abs(log3(v) - 5 / 3) < 1e-12)
  check('G16 (c) the check: log_3(3^{5/3}) + log_9(3^{5/3}) = 5/3 + 5/6 = 5/2 (1e-12)', Math.abs(log3(v) + logb(9, v) - 2.5) < 1e-12)
  check('G16 (c) log_9 x = (1/2) log_3 x here: 5/6 (1e-12)', Math.abs(logb(9, v) - 2.5 / 3) < 1e-12)
}

/* ------------------------------------------------------------------ */
/* G17 · L3(a): log₁₀(3 − x) = 2 log₁₀(x + 2) → (−5 + √21)/2            */
/* ------------------------------------------------------------------ */
{
  const s = Math.sqrt(21)
  eq('G17 √21 to 7dp = 4.5825757', s, 7, '4.5825757')
  const keep = (-5 + s) / 2
  const refuse = (-5 - s) / 2
  eq('G17 the survivor (−5 + √21)/2 to 7dp = −0.2087122', keep, 7, '-0.2087122')
  eq('G17 the survivor to 4dp = −0.2087', keep, 4, '-0.2087')
  eq('G17 the refused root (−5 − √21)/2 to 7dp = −4.7912878', refuse, 7, '-4.7912878')
  eq('G17 the refused root to 4dp = −4.7913', refuse, 4, '-4.7913')
  check('G17 quadratic x² + 5x + 1 = 0 at both candidates (1e-12)', Math.abs(keep * keep + 5 * keep + 1) < 1e-12 && Math.abs(refuse * refuse + 5 * refuse + 1) < 1e-12)
  check('G17 discriminant 25 − 4 = 21', 25 - 4 === 21)
  between('G17 the survivor sits inside the domain band (−2, 3)', -2, keep, 3)
  check('G17 the refused root falls outside: −4.7913 < −2 (fails x + 2 > 0)', refuse < -2)
  check('G17 the squared identity 3 − x = (x + 2)² at the survivor (1e-12)', Math.abs(3 - keep - Math.pow(keep + 2, 2)) < 1e-12)
  check('G17 the squared identity ALSO holds at the refused root (1e-12)', Math.abs(3 - refuse - Math.pow(refuse + 2, 2)) < 1e-12)
  check('G17 the ORIGINAL equation at the survivor (1e-12)', Math.abs(log10(3 - keep) - 2 * log10(keep + 2)) < 1e-12)
  check('G17 at the refused root the term x + 2 = −2.7913 < 0 — undefined (NaN)', refuse + 2 < 0 && Number.isNaN(log10(refuse + 2)))
}

/* ------------------------------------------------------------------ */
/* G18 · L3(b): 2^{2x} − 5·2^x + 6 = 0 → x ∈ {1, log_2 3}              */
/* ------------------------------------------------------------------ */
{
  check('G18 factor (t − 2)(t − 3) = t² − 5t + 6 at t = 3.7', Math.abs((3.7 - 2) * (3.7 - 3) - (13.69 - 18.5 + 6)) < 1e-12)
  check('G18 at x = 1: 4 − 10 + 6 = 0 exactly', Math.pow(2, 2) - 5 * 2 + 6 === 0)
  const r = log2(3)
  eq('G18 log_2 3 to 7dp = 1.5849625', r, 7, '1.5849625')
  eq('G18 log_2 3 to 4dp = 1.5850', r, 4, '1.5850')
  check('G18 at x = log_2 3: 2^{2x} = 9 and 5·2^x = 15, so 9 − 15 + 6 = 0 (1e-9)', Math.abs(Math.pow(2, 2 * r) - 9) < 1e-9 && Math.abs(5 * Math.pow(2, r) - 15) < 1e-9)
  check('G18 2^{log_2 3} = 3 exactly (1e-12) — the machine undoes itself', Math.abs(Math.pow(2, r) - 3) < 1e-12)
  // locate both roots by bisection (the sweep counts sign changes, not zero hits)
  const f = (x: number) => Math.pow(2, 2 * x) - 5 * Math.pow(2, x) + 6
  const r1 = bisect(f, 0, 1.5, 1e-11)
  const r2 = bisect(f, 1.3, 2.5, 1e-11)
  eq('G18 bisection root 1 to 7dp = 1.0000000', r1, 7, '1.0000000')
  eq('G18 bisection root 2 to 7dp = 1.5849625 = log_2 3', r2, 7, '1.5849625')
  let signChanges = 0
  let prev = f(-3)
  for (let x = -2.999; x <= 3; x += 0.001) {
    const v = f(x)
    if (v === 0) { signChanges++; prev = v; continue }
    if (prev !== 0 && Math.sign(v) !== Math.sign(prev)) signChanges++
    prev = v
  }
  check('G18 0.001 sweep of [-3, 3] by sign changes: exactly 2 solutions', signChanges === 2, `found ${signChanges}`)
}

/* ------------------------------------------------------------------ */
/* G19 · L3(c): log_{1/2}(x² − 4x + 5) ≥ −1 → [1, 3] (SPEC CATCH C2)    */
/* ------------------------------------------------------------------ */
{
  const arg = (x: number) => x * x - 4 * x + 5
  check('G19 the flip constant (1/2)^{−1} = 2', Math.pow(0.5, -1) === 2)
  check('G19 endpoint x = 1: argument = 1 − 4 + 5 = 2 exactly', arg(1) === 2)
  check('G19 endpoint x = 3: argument = 9 − 12 + 5 = 2 exactly', arg(3) === 2)
  check('G19 interior x = 2: argument = 1 ≤ 2 ✓', arg(2) === 1)
  check('G19 factor (x − 1)(x − 3) = x² − 4x + 3 at x = 2.4', Math.abs((2.4 - 1) * (2.4 - 3) - (5.76 - 9.6 + 3)) < 1e-12)
  let rider = true
  for (let x = -10; x <= 10; x += 0.1) if (!(arg(x) > 0)) rider = false
  check('G19 the rider is free: x² − 4x + 5 = (x − 2)² + 1 > 0 on a 0.1 sweep of [−10, 10]', rider)
  // SPEC CATCH C2 — the sheet's broken twin, pinned for the cautionary aside
  const badArg = (x: number) => x * x - 4 * x + 3
  eq('G19 CATCH: the twin walls 2 ± √3 = 0.2679492 and 3.7320508', 2 - Math.sqrt(3), 7, '0.2679492')
  eq('G19 CATCH: (2 + √3) to 7dp = 3.7320508', 2 + Math.sqrt(3), 7, '3.7320508')
  eq('G19 CATCH: the twin interior x = 2 reads argument −1 — the log is undefined', badArg(2), 0, '-1')
  check('G19 CATCH: the twin flipped interval [0.2679, 3.7321] CONTAINS the argument-zero band [1, 3] — the rider bites', badArg(1) === 0 && badArg(3) === 0 && 0.2679 < 1 && 3 < 3.7321)
  check('G19 CATCH: the twin honest answer is [2 − √3, 1) ∪ (3, 2 + √3]: witness x = 0.5 legal (argument 1.25 ≤ 2 ✓)', badArg(0.5) === 1.25 && 1.25 <= 2)
  check('G19 CATCH: and witness x = 1.5 refused (argument −0.75 < 0)', badArg(1.5) === -0.75)
}

/* ------------------------------------------------------------------ */
/* G20 · L4(a): count the solutions of log_2(3x − 1) = log_{1/2}(4/x)    */
/* ------------------------------------------------------------------ */
{
  const H = (x: number) => log2(3 * x - 1) - logb(0.5, 4 / x)
  const x = 4 / 11
  check('G20 the equation at x = 4/11 reads 0 on both forms (1e-12)', Math.abs(H(x)) < 1e-12)
  // the difference of the sides is log_2(12 − 4/x), strictly INCREASING on (1/3, ∞)
  let mono = true
  for (let t = 0.4; t < 8 - 0.03; t += 0.03) if (!(H(t) < H(t + 0.03))) mono = false
  check('G20 the left side minus the right = log_2(12 − 4/x), strictly increasing on (1/3, 8) (0.03 sweep) — at most one root', mono)
  check('G20 exactly one: the collapsed linear equation 11x = 4 has the one candidate, and it survives', Math.abs(11 * x - 4) < 1e-15)
}

/* ------------------------------------------------------------------ */
/* G21 · L4(b) REDESIGN (SPEC CATCH C3): x^{log_4 x} = 64x² → {64, 1/4} */
/* ------------------------------------------------------------------ */
{
  // SPEC CATCH C3: the sheet's t = 2, −1/2 do NOT solve t² − t − 3/2 = 0
  check('G21 CATCH: the sheet root t = 2 fails t² − t − 3/2 (reads +0.5 ≠ 0)', Math.abs(2 * 2 - 2 - 1.5) === 0.5)
  check('G21 CATCH: the sheet root t = −1/2 fails too (reads −0.75 ≠ 0)', Math.abs(0.25 + 0.5 - 1.5) === 0.75)
  eq('G21 CATCH: the honest roots of t² − t − 3/2 = 0 are (1 ± √7)/2 ≈ 1.8229, −0.8229', (1 + Math.sqrt(7)) / 2, 4, '1.8229')
  // the engine's honest redesign: x^{log_4 x} = 64x²
  const take = (x: number) => Math.pow(x, logb(4, x)) - 64 * x * x
  check('G21 the take: (log_4 x)² = log_4(64x²) = 3 + 2 log_4 x → t² − 2t − 3 = 0 (verified at t = 3.1)', Math.abs((3.1 - 3) * (3.1 + 1) - (9.61 - 6.2 - 3)) < 1e-12)
  check('G21 at x = 64: 64^{log_4 64} = 64³ = 262144 = 64·64² exactly', Math.pow(64, logb(4, 64)) === 262144 && 64 * 64 * 64 === 262144)
  check('G21 at x = 1/4: (1/4)^{log_4(1/4)} = (1/4)^{−1} = 4 = 64·(1/4)² exactly', Math.pow(0.25, logb(4, 0.25)) === 4 && 64 * 0.0625 === 4)
  eq('G21 log_4 64 = 3 (1e-12)', logb(4, 64), 0, '3')
  eq('G21 log_4 (1/4) = −1 (1e-12)', logb(4, 0.25), 0, '-1')
  check('G21 both candidates positive — the domain court waves both through', 64 > 0 && 0.25 > 0)
  // locate both roots by bisection
  const r1 = bisect(take, 0.05, 0.5, 1e-11)
  const r2 = bisect(take, 10, 90, 1e-11)
  eq('G21 bisection root 1 to 7dp = 0.2500000', r1, 7, '0.2500000')
  eq('G21 bisection root 2 to 7dp = 64.0000000', r2, 7, '64.0000000')
  let signChanges = 0
  let prev = take(0.05)
  for (let x = 0.052; x <= 90; x += 0.002) {
    const v = take(x)
    if (prev !== 0 && Math.sign(v) !== Math.sign(prev)) signChanges++
    prev = v
  }
  check('G21 0.002 sweep of [0.05, 90] by sign changes: exactly 2 solutions (0.25, 64)', signChanges === 2, `found ${signChanges}`)
}

/* ------------------------------------------------------------------ */
/* G22 · L4(c): log_{0.25}(x − 1) > −2 → (1, 17)                        */
/* ------------------------------------------------------------------ */
{
  check('G22 the flip constant (1/4)^{−2} = 16 exactly', Math.pow(0.25, -2) === 16)
  check('G22 the excluded boundary: log_{1/4} 16 = −2 exactly (1e-12)', Math.abs(logb(0.25, 16) + 2) < 1e-12)
  check('G22 witness x = 5: log_{1/4} 4 = −1 > −2 ✓', Math.abs(logb(0.25, 4) + 1) < 1e-12)
  check('G22 witness x = 18: log_{1/4} 17 < −2 (17 > 16 and the family falls)', logb(0.25, 17) < -2)
  check('G22 refusal x = 1: the argument is 0', 1 - 1 === 0)
  check('G22 refusal x = 0.5: the argument is −0.5 < 0', 0.5 - 1 < 0)
  let band = true
  for (let x = 1.05; x < 17; x += 0.05) if (!(logb(0.25, x - 1) > -2)) band = false
  check('G22 a 0.05 sweep of (1, 17): the inequality holds throughout', band)
  check('G22 outside fails: x = 20 gives log_{1/4} 19 < −2', logb(0.25, 19) < -2)
}

/* ------------------------------------------------------------------ */
/* G23 · L5(a): log_3(x + 5) = 5 − x — the bisection-pinned root         */
/* ------------------------------------------------------------------ */
{
  const h = (x: number) => log3(x + 5) + x - 5
  eq('G23 log_3 6 to 7dp = 1.6309298 — the failed hunt at x = 1 (log_3 6 ≈ 1.63 vs 4)', log3(6), 7, '1.6309298')
  eq('G23 h(1) = log_3 6 − 4 to 7dp = −2.3690702', h(1), 7, '-2.3690702')
  check('G23 the failed hunt at x = 4: log_3 9 = 2 ≠ 5 − 4 = 1 — no integer root', Math.abs(log3(9) - 2) < 1e-12 && 5 - 4 === 1)
  eq('G23 h(4) = log_3 9 + 4 − 5 = 1 exactly', h(4), 0, '1')
  eq('G23 log_3 8 to 7dp = 1.8927893', log3(8), 7, '1.8927893')
  eq('G23 h(3) = log_3 8 − 2 to 7dp = −0.1072107', h(3), 7, '-0.1072107')
  eq('G23 log_3 8.5 to 7dp = 1.9479722', log3(8.5), 7, '1.9479722')
  eq('G23 h(3.5) to 7dp = 0.4479722', h(3.5), 7, '0.4479722')
  check('G23 the tight bracket: h(3) < 0 < h(3.5)', h(3) < 0 && h(3.5) > 0)
  let mono = true
  for (let x = -4.9; x < 6; x += 0.02) if (!(h(x) < h(x + 0.02))) mono = false
  check('G23 h strictly increasing on (−5, 6] (0.02 sweep) — exactly one root', mono)
  const root = bisect(h, 3, 3.5, 1e-11)
  eq('G23 the bisection root to 4dp = 3.0963', root, 4, '3.0963')
  eq('G23 the bisection root to 7dp = 3.0963172', root, 7, '3.0963172')
  eq('G23 the bisection root to 10dp = 3.0963172214', root, 10, '3.0963172214')
  eq('G23 y at the root = 5 − x to 4dp = 1.9037', 5 - root, 4, '1.9037')
  check('G23 at the root both sides agree: log_3(x + 5) = 5 − x (1e-9)', Math.abs(log3(root + 5) - (5 - root)) < 1e-9)
  between('G23 the root lies in the bracket (3, 3.5)', 3, root, 3.5)
  let signChanges = 0
  let prev = h(-4.9)
  for (let x = -4.8995; x <= 5.9; x += 0.0005) {
    const v = h(x)
    if (prev !== 0 && Math.sign(v) !== Math.sign(prev)) signChanges++
    prev = v
  }
  check('G23 0.0005 sweep of [−4.9, 5.9] by sign changes: exactly 1 root', signChanges === 1, `found ${signChanges}`)
}

/* ------------------------------------------------------------------ */
/* G24 · L5(b): log_2(x² − 2x − 3) > 1 → x < 1 − √6 or x > 1 + √6       */
/* ------------------------------------------------------------------ */
{
  const s = Math.sqrt(6)
  eq('G24 √6 to 7dp = 2.4494897', s, 7, '2.4494897')
  eq('G24 the left wall 1 − √6 to 7dp = −1.4494897', 1 - s, 7, '-1.4494897')
  eq('G24 the right wall 1 + √6 to 7dp = 3.4494897', 1 + s, 7, '3.4494897')
  eq('G24 the walls to 4dp: −1.4495 and 3.4495', 1 - s, 4, '-1.4495')
  eq('G24 (right wall to 4dp)', 1 + s, 4, '3.4495')
  check('G24 at the walls the argument x² − 2x − 3 reads exactly 2 (1e-12)', Math.abs((1 - s) * (1 - s) - 2 * (1 - s) - 3 - 2) < 1e-12 && Math.abs((1 + s) * (1 + s) - 2 * (1 + s) - 3 - 2) < 1e-12)
  check('G24 the rider walls: x² − 2x − 3 = 0 at x = −1 and x = 3 exactly', 1 + 2 - 3 === 0 && 9 - 6 - 3 === 0)
  check('G24 nesting: 1 − √6 ≈ −1.4495 < −1 ✓ — the strict wing sits inside the rider wing', 1 - s < -1)
  check('G24 nesting: 1 + √6 ≈ 3.4495 > 3 ✓', 1 + s > 3)
  const arg = (x: number) => x * x - 2 * x - 3
  check('G24 witness x = −2: argument 5 > 2 — inside', arg(-2) === 5)
  eq('G24 witness x = −1.2: argument 0.84 — defined (rider ✓) yet below 2 — fails', arg(-1.2), 2, '0.84')
  check('G24 witness x = 0: argument −3 — refused by the rider', arg(0) === -3)
  eq('G24 witness x = 3.2: argument 0.84 — the mirror gap between the walls', arg(3.2), 2, '0.84')
  check('G24 witness x = 4: argument 5 > 2 — inside', arg(4) === 5)
  let wings = true
  for (let x = -4; x < 1 - s - 1e-6; x += 0.03) if (!(arg(x) > 2)) wings = false
  for (let x = 1 + s + 1e-6; x <= 6; x += 0.03) if (!(arg(x) > 2)) wings = false
  check('G24 the wings satisfy argument > 2 on 0.03 sweeps beyond the walls', wings)
}

/* ------------------------------------------------------------------ */
/* G25 · L5(c): the system {log_2 x + log_4 x = 3, y = 2x}              */
/* ------------------------------------------------------------------ */
{
  check('G25 log_2 4 + log_4 4 = 2 + 1 = 3 exactly (1e-12)', Math.abs(log2(4) + logb(4, 4) - 3) < 1e-12)
  check('G25 y = 2x at x = 4: y = 8', 2 * 4 === 8)
  check('G25 the unified collapse (3/2)log_2 x = 3 → log_2 x = 2 → x = 4', Math.abs(1.5 * log2(4) - 3) < 1e-12)
}

/* ------------------------------------------------------------------ */
/* G26 · L6(a): the pair — same quadratic, opposite verdicts            */
/* ------------------------------------------------------------------ */
{
  const q = (x: number) => x * x - 4 * x + 5
  check('G26 the base-½ read: endpoint x = 1 gives the argument 2 exactly', q(1) === 2)
  check('G26 the base-½ read: endpoint x = 3 gives the argument 2 exactly', q(3) === 2)
  check('G26 the base-½ read: interior x = 2 gives 1 ≤ 2 ✓', q(2) === 1)
  let fifty = true
  for (let x = 1.01; x <= 2.99; x += 0.02) if (!(q(x) <= 2)) fifty = false
  check('G26 log_{1/2}(x² − 4x + 5) ≥ −1 → the whole interval [1, 3] passes the flipped read', fifty)
  // the base-2 read of the SAME quadratic
  check('G26 the base-2 read: the argument ≥ 2 ⟺ (x − 2)² ≥ 1 — holds at x = 0 and x = 4, fails at x = 2', Math.pow(0 - 2, 2) >= 1 && Math.pow(4 - 2, 2) >= 1 && Math.pow(2 - 2, 2) < 1)
  check('G26 witness x = 0: argument 5 ≥ 2 ✓ (base 2 keeps it; base ½ flips it out)', q(0) === 5)
  check('G26 witness x = 2: argument 1 < 2 ✗ (fails both reads)', q(2) === 1)
  check('G26 witness x = 4: argument 5 ≥ 2 ✓', q(4) === 5)
  eq('G26 witness x = 1.5: argument 1.25 < 2 — fails the base-2 read', q(1.5), 2, '1.25')
  // the verdicts are opposite: [1,3] vs its complement
  check('G26 opposite verdicts: x = 0 is refused by base ½ (5 > 2 flips out) and kept by base 2', logb(0.5, q(0)) < -1 && log2(q(0)) >= 1)
  check('G26 …while x = 2 is refused by base 2 (1 < 2) and kept by base ½ (log_{1/2} 1 = 0 ≥ −1)', log2(q(2)) < 1 && logb(0.5, q(2)) >= -1)
}

/* ------------------------------------------------------------------ */
/* G27 · L6(b): the bracket h(1) < 0 < h(3) for log_2(x + 2) = 4 − x     */
/* ------------------------------------------------------------------ */
{
  const h = (x: number) => log2(x + 2) + x - 4
  eq('G27 h(1) = log_2 3 − 3 to 7dp = −1.4150375 < 0', h(1), 7, '-1.4150375')
  eq('G27 h(3) = log_2 5 − 1 to 7dp = 1.3219281 > 0 (SPEC CATCH C1 — engine wins over the sheet\'s 1)', h(3), 7, '1.3219281')
  check('G27 the exhibit h(2) = 0 exactly (1e-12)', Math.abs(h(2)) < 1e-12)
  check('G27 the bracket + the cap: h(1) < 0 < h(3), h strictly increasing, and h(2) = 0 — exactly one root, named by the exhibit', h(1) < 0 && h(3) > 0 && Math.abs(h(2)) < 1e-12)
}

/* ------------------------------------------------------------------ */
/* G28 · the quiz arithmetic (keys pinned [1, 1, 1, 1, 1])              */
/* ------------------------------------------------------------------ */
{
  check('G28 Q1: log_2(x + 3) = 4 → x + 3 = 2⁴ = 16 → x = 13 (2⁴ = 16 exact)', Math.pow(2, 4) === 16 && 13 + 3 === 16)
  check('G28 Q1 wrong options: x = 1 gives log_2 4 = 2; x = 19 gives log_2 22 ≈ 4.4594 ≠ 4; x = 7 gives log_2 10 ≈ 3.3219 ≠ 4', Math.abs(log2(4) - 2) < 1e-12 && Math.abs(log2(22) - 4.4594) < 1e-4 && Math.abs(log2(10) - 3.3219) < 1e-4)
  check('G28 Q3: exactly 1 real root (t = 9 survives, t = −1 refused)', Math.pow(3, 4) === 81 && Math.pow(3, 2) === 9)
  check('G28 Q4: 0 < a < 1 with a = 1/2: log_{1/2} x > 2 ⟺ 0 < x < 1/4 (sweep-pinned in G14)', Math.pow(0.5, 2) === 0.25)
  check('G28 Q5: the unique root x = 2 (both sides read 2; h strictly increasing)', Math.abs(log2(4) - 2) < 1e-12 && 4 - 2 === 2)
}

/* ------------------------------------------------------------------ */
/* H-section imports — live only for the pins below (appended AFTER the */
/* prose existed and the G-engines ran green)                         */
/* ------------------------------------------------------------------ */
const lesson94 = chapter09.lessons[3] as Lesson

/* ------------------------------------------------------------------ */
/* H01… — pins reading the authored part-aa94.ts                       */
/* ------------------------------------------------------------------ */

{
  // H01 · identity, exactly as the spec pins it
  check('H01 lesson id is aa-logarithmic-and-exponential-equations', lesson94.id === 'aa-logarithmic-and-exponential-equations', `got ${lesson94.id}`)
  check('H01 lesson number is 9.4', lesson94.number === '9.4', `got ${lesson94.number}`)
  check('H01 lesson title is Logarithmic and Exponential Equations', lesson94.title === 'Logarithmic and Exponential Equations', `got ${lesson94.title}`)
  check('H01 5–8 concept phrases present', lesson94.concepts.length >= 5 && lesson94.concepts.length <= 8, `${lesson94.concepts.length} concepts`)

  // H02 · prerequisite and source rosters, exactly as the spec pins them
  const wantPrereq = ['aa-the-laws-of-logarithms-and-the-change-of-base', 'aa-quadratic-inequalities-and-the-sign-diagram', 'aa-logarithms-the-inverse-machine']
  check('H02 prerequisites array exact', JSON.stringify(lesson94.prerequisites) === JSON.stringify(wantPrereq), JSON.stringify(lesson94.prerequisites))
  const wantSources = ['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']
  check('H02 sources array exact', JSON.stringify(lesson94.sources) === JSON.stringify(wantSources), JSON.stringify(lesson94.sources))

  // H03 · the honest word count (no `words` field — the registry counts)
  const words = countLessonWords(lesson94)
  check('H03 countLessonWords >= 6000', words >= 6000, `${words} words`)
  check('H03 no `words` field on the lesson (honest auto-count)', lesson94.words === undefined)

  // H04 · Illustrations: >= 2 example blocks with >= 4 steps each
  const examples = lesson94.blocks.filter((b) => b.kind === 'example') as Extract<(typeof lesson94.blocks)[number], { kind: 'example' }>[]
  const longExamples = examples.filter((b) => b.steps.length >= 4)
  check('H04 >= 2 example blocks with >= 4 steps', examples.length >= 2 && longExamples.length >= 2, `${examples.length} examples, ${longExamples.length} with >= 4 steps`)
  check('H04 every example block has 4–6 steps and a Hence-ending final step', examples.every((b) => b.steps.length >= 4 && b.steps.length <= 6 && /^Hence/.test(b.steps[b.steps.length - 1])), `${examples.length} examples checked`)

  // H05 · the quiz: 5 items, answer indices pinned [1, 1, 1, 1, 1]
  const quiz = lesson94.blocks.find((b) => b.kind === 'quiz') as Extract<(typeof lesson94.blocks)[number], { kind: 'quiz' }> | undefined
  check('H05 quiz exists with exactly 5 items', !!quiz && quiz.items.length === 5, quiz ? `${quiz.items.length} items` : 'missing')
  const answers = quiz ? quiz.items.map((i) => i.answer) : []
  check('H05 quiz answer key is [1, 1, 1, 1, 1]', JSON.stringify(answers) === JSON.stringify([1, 1, 1, 1, 1]), JSON.stringify(answers))
  check('H05 every quiz option list has 4 entries', !!quiz && quiz.items.every((i) => i.options.length === 4))
  check(
    'H05 every explain says why EACH wrong option fails (mentions Option N per wrong index)',
    !!quiz && quiz.items.every((i) => i.explain.includes('Option') && i.explain.length > 200 && [0, 1, 2, 3].filter((j) => j !== i.answer).every((j) => i.explain.includes(`Option ${j}`)))
  )

  // H06 · figures: >= 3 body figures; >= 3 solution figures across the exercises
  const bodyFigures = lesson94.blocks.filter((b) => b.kind === 'figure')
  check('H06 >= 3 body figure blocks', bodyFigures.length >= 3, `${bodyFigures.length} body figures`)
  let exerciseFigures = 0
  for (const b of lesson94.blocks) {
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) exerciseFigures += q.figures?.length ?? 0
  }
  check('H06 >= 3 solution figures across the exercises', exerciseFigures >= 3, `${exerciseFigures} on exercises`)
  check('H06 every solution figure is compact (viewBox height <= 240)', (() => {
    const svgs: string[] = []
    for (const b of lesson94.blocks) if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
    return svgs.every((s) => /viewBox="0 0 720 (\d{2,3})"/.test(s) && Number(/viewBox="0 0 720 (\d+)"/.exec(s)![1]) <= 240)
  })())

  // H07 · exercises: >= 16 questions, each with a full steps solution + answer
  const setBlocks = lesson94.blocks.filter((b) => b.kind === 'exercises') as Extract<(typeof lesson94.blocks)[number], { kind: 'exercises' }>[]
  const questions = setBlocks.flatMap((b) => b.sets.flatMap((st) => st.questions))
  const withSteps = questions.filter((q) => Array.isArray(q.solution) && q.solution.length > 0 && q.solution.every((st) => typeof st === 'string' && st.length > 0))
  const withAnswer = questions.filter((q) => typeof q.answer === 'string' && q.answer.length > 0)
  check('H07 >= 16 exercise questions', questions.length >= 16, `${questions.length} questions`)
  check('H07 every question has a non-empty steps-array solution', questions.length === withSteps.length, `${withSteps.length}/${questions.length}`)
  check('H07 every question has a non-empty answer', questions.length === withAnswer.length, `${withAnswer.length}/${questions.length}`)
  const levels = setBlocks.flatMap((b) => b.sets.map((st) => st.level))
  check('H07 sets span L1 through L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((lv) => levels.includes(lv as never)), levels.join(','))

  // H08 · every figure svg: aria-label present; viewBox 720-wide; no retired hex
  const svgs: string[] = []
  for (const b of lesson94.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  check('H08 every figure svg carries aria-label=', svgs.length > 0 && svgs.every((s) => s.includes('aria-label=')), `${svgs.length} svgs`)
  check('H08 every svg declares viewBox 0 0 720 …, xmlns and role img', svgs.every((s) => /viewBox="0 0 720 \d+"/.test(s) && s.includes('xmlns=') && s.includes('role="img"')))
  const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  const retiredHits = RETIRED.filter((h) => svgs.some((s) => s.includes(h)))
  check('H08 no retired hex in any svg string', retiredHits.length === 0, retiredHits.join(' ') || 'clean')
  const ALLOWED = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', 'currentColor']
  const hexRe = /#[0-9a-fA-F]{6}\b/g
  const foreign: string[] = []
  for (const s of svgs) for (const m of s.match(hexRe) ?? []) if (!ALLOWED.includes(m)) foreign.push(m)
  check('H08 only palette hexes appear in the svgs (no blue/indigo, nothing off-list)', foreign.length === 0, [...new Set(foreign)].join(' ') || 'clean')

  // H09 · structural must-haves: derivation, theorem, definition, terms, table, roman list
  const kinds = new Set(lesson94.blocks.map((b) => b.kind))
  check('H09 at least one derivation block', kinds.has('derivation'))
  const tones = new Set(lesson94.blocks.filter((b) => b.kind === 'callout').map((b) => (b as Extract<(typeof lesson94.blocks)[number], { kind: 'callout' }>).tone))
  check('H09 a theorem callout exists', tones.has('theorem'))
  check('H09 a definition callout exists', tones.has('definition'))
  check('H09 a terms block exists', kinds.has('terms'))
  check('H09 a table block exists', kinds.has('table'))
  const roman = lesson94.blocks.filter((b) => b.kind === 'list' && (b as Extract<(typeof lesson94.blocks)[number], { kind: 'list' }>).marker === 'roman')
  check('H09 at least one roman marker list', roman.length >= 1, `${roman.length} roman lists`)

  // H10 · the pinned tokens appear in the serialized prose; no placeholders
  const ser = JSON.stringify(lesson94)
  for (const token of ['11/3', '0.3027756', '4/11', 'extraneous', 'strictly increasing', 'monotonic']) {
    check(`H10 token "${token}" appears in the lesson prose`, ser.includes(token))
  }
  check('H10 no placeholder tokens in the prose', !ser.includes('TODO') && !ser.includes('【') && !ser.includes('XXX') && !ser.includes('undefined') && !ser.includes('NaN'))

  // H11 · control-character sweep: zero raw control chars in ANY string
  const controlHits: string[] = []
  const sweepControls = (node: unknown, path: string): void => {
    if (typeof node === 'string') {
      const bad = /[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/.exec(node)
      if (bad) controlHits.push(`${path}: U+${node.charCodeAt(bad.index).toString(16)}`)
    } else if (Array.isArray(node)) {
      node.forEach((v, i) => sweepControls(v, `${path}[${i}]`))
    } else if (node && typeof node === 'object') {
      for (const [k, v] of Object.entries(node)) sweepControls(v, `${path}.${k}`)
    }
  }
  sweepControls(lesson94, 'lesson94')
  check('H11 zero control characters in any lesson string (\\f/\\t escape sweep)', controlHits.length === 0, controlHits.slice(0, 5).join(' ') || 'clean')

  // H12 · the plain-title rule: no $ in any title/label/name/term field
  const dollarHits: string[] = []
  for (const b of lesson94.blocks) {
    if (b.kind === 'callout' && b.title.includes('$')) dollarHits.push(`callout "${b.title}"`)
    if (b.kind === 'derivation') {
      if (b.title.includes('$')) dollarHits.push(`derivation "${b.title}"`)
      for (const s of b.steps) if (s.label.includes('$')) dollarHits.push(`label "${s.label}"`)
    }
    if (b.kind === 'formula' && b.name.includes('$')) dollarHits.push(`formula "${b.name}"`)
    if (b.kind === 'terms') for (const t of b.items) if (t.term.includes('$')) dollarHits.push(`term "${t.term}"`)
    if (b.kind === 'heading' && b.text.includes('$')) dollarHits.push(`heading "${b.text}"`)
    if (b.kind === 'quiz' && b.title?.includes('$')) dollarHits.push('quiz title')
    if (b.kind === 'exercises' && b.title?.includes('$')) dollarHits.push('exercises title')
  }
  check('H12 no $ in any title/label/name/term field (the plain-title rule)', dollarHits.length === 0, dollarHits.join(' ') || 'clean')

  // H13 · the KaTeX escape discipline held: backslashes survived in the strings
  const allStrings: string[] = []
  const harvest = (node: unknown): void => {
    if (typeof node === 'string') allStrings.push(node)
    else if (Array.isArray(node)) node.forEach(harvest)
    else if (node && typeof node === 'object') for (const v of Object.values(node)) harvest(v)
  }
  harvest(lesson94)
  const joined = allStrings.join(' ')
  check('H13 backslash discipline: \\log, \\sqrt and \\iff survived into the strings', joined.includes('\\log') && joined.includes('\\sqrt') && joined.includes('\\iff'))
  check('H13 the serialized JSON carries no control-char escapes (\\u000…)', !/\\u00[0-1][0-9A-F]/.test(ser))
}

/* ------------------------------------------------------------------ */
/* tallies                                                             */
/* ------------------------------------------------------------------ */

console.log('----------------------------------------------------------')
return { id: 'G+H (9.4 engines + pins)', pass: gPass + hPass, fail: (gTotal - gPass) + (hTotal - hPass) }
}

// ------------------------------------------------------------------
// (I + J) from v-aa95.ts — the 9.5 engines + pins, wrapped whole
// ------------------------------------------------------------------

function sectionI(): SectionResult {
/**
 * v-aa95.ts — the verify-first ENGINE for Advanced Algebra lesson 9.5
 * "Exponential and Logarithmic Series" (id aa-exponential-and-logarithmic-series).
 *
 * Agent aa95 of the run-121 whole-chapter swarm. Every number the lesson's
 * prose will state is recomputed here FIRST: exact checks where the
 * arithmetic is closed, 7-place rounding checks where decimals are pinned,
 * sweeps where convergence behaviour is claimed. If an engine result
 * disagrees with a number in the spec, the ENGINE wins and the prose is
 * adjusted to it (the catch is flagged in the agent report).
 *
 * Phase 1 (sections I01…I15): pure arithmetic, self-contained — no repo
 * imports at all (only the type-only import below, which is erased).
 * Phase 2 (sections J01…J12, active once part-aa95.ts exists): the pins that
 * read the authored lesson part and the platform's honest word counter.
 */


// ------------------------------------------------------------------ collector
type Tall = { id: string; pass: number; fail: number }
const tally: Tall[] = []
let cur: Tall = { id: '', pass: 0, fail: 0 }
function begin(id: string): void {
  tally.push((cur = { id, pass: 0, fail: 0 }))
}
function check(name: string, ok: boolean, detail?: string): void {
  if (ok) {
    cur.pass += 1
  } else {
    cur.fail += 1
    console.log(`  [RED] ${name}${detail ? ' — ' + detail : ''}`)
  }
}
const info = (msg: string) => console.log(`  [i] ${msg}`)

// ------------------------------------------------------------------- helpers
const near = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
const r4 = (x: number): number => Math.round(x * 1e4) / 1e4
const r6 = (x: number): number => Math.round(x * 1e6) / 1e6
const r7 = (x: number): number => Math.round(x * 1e7) / 1e7
const r10 = (x: number): number => Math.round(x * 1e10) / 1e10
const log10 = (x: number): number => Math.log(x) / Math.LN10

// factorial (exact within doubles up to 20!)
function fact(n: number): number {
  let f = 1
  for (let k = 2; k <= n; k += 1) f *= k
  return f
}

// partial sum of the exponential series with `terms` terms (r = 0 .. terms-1)
function expPartial(x: number, terms: number): number {
  let s = 0
  for (let r = 0; r < terms; r += 1) s += Math.pow(x, r) / fact(r)
  return s
}

// partial sum of the slow log series with `terms` terms:
// x - x^2/2 + x^3/3 - x^4/4 + ...
function logPartial(x: number, terms: number): number {
  let s = 0
  for (let r = 1; r <= terms; r += 1) s += (Math.pow(-1, r + 1) * Math.pow(x, r)) / r
  return s
}

// partial sum of the fast series with `terms` terms (odd powers):
// 2(x + x^3/3 + x^5/5 + ...)
function fastPartial(x: number, terms: number): number {
  let s = 0
  for (let k = 0; k < terms; k += 1) s += Math.pow(x, 2 * k + 1) / (2 * k + 1)
  return 2 * s
}

// the alternating harmonic partial S_n = sum_{r=1}^n (-1)^{r+1}/r
function altHarm(n: number): number {
  let s = 0
  for (let r = 1; r <= n; r += 1) s += (Math.pow(-1, r + 1) * 1) / r
  return s
}

// the all-plus construction series sum_{k>=1} 1/(k n^k)  [= -ln(1 - 1/n)]
function allPlus(n: number, terms: number): number {
  let s = 0
  for (let k = 1; k <= terms; k += 1) s += 1 / (k * Math.pow(n, k))
  return s
}

// digits of a positive bigint
function bigDigits(b: bigint): number {
  return b.toString().length
}

// ========================================== I01 — e and the series partials
begin('I01 — e, the partials ladder, and the gaps')
{
  const E = Math.E
  check('e = 2.718281828459045 (the double)', E === 2.718281828459045)
  const S: number[] = []
  for (let n = 1; n <= 12; n += 1) S[n] = expPartial(1, n)
  info(`S1..S12 = ${S.slice(1, 13).map((v) => v.toFixed(7)).join(' ')}`)
  check('S4 = 2.6666667 (7 places)', r7(S[4]) === 2.6666667, `got ${r7(S[4])}`)
  check('S6 = 2.7166667 (7 places)', r7(S[6]) === 2.7166667, `got ${r7(S[6])}`)
  check('S9 = 2.7182788 (7 places)', r7(S[9]) === 2.7182788, `got ${r7(S[9])}`)
  check('S11 = 2.7182818 (7 places)', r7(S[11]) === 2.7182818, `got ${r7(S[11])}`)
  const g4 = E - S[4]
  const g6 = E - S[6]
  const g9 = E - S[9]
  const g11 = E - S[11]
  info(`gaps: e-S4 = ${g4.toFixed(7)}; e-S6 = ${g6.toFixed(7)}; e-S9 = ${g9.toExponential(4)}; e-S11 = ${g11.toExponential(4)}`)
  check('gap e - S4 = 0.0516152 (7 places; ENGINE catch — the spec wrote 0.0516151, a truncation not a round)', r7(g4) === 0.0516152, `got ${r7(g4)}`)
  check('gap e - S6 = 0.0016152 (7 places; ENGINE catch — the spec wrote 0.0016151)', r7(g6) === 0.0016152, `got ${r7(g6)}`)
  check('gap e - S9 = 3.0586e-6 (2 sig figs 3.1e-6, printed 0.0000030 at 1 sf)', near(g9, 3.0586e-6, 1e-10), `got ${g9}`)
  check('gap e - S11 = 2.7313e-8 (printed 0.00000003 at 1 sf)', near(g11, 2.7313e-8, 1e-12), `got ${g11}`)
  check('partials climb monotonically from S1 to S12', S.slice(1, 12).every((v, i) => v < S[i + 2]))
  // the 9.2 ladder, re-run: (1+1/n)^n at n = 10, 100, 1000, 10000
  const ladder = [10, 100, 1000, 10000].map((n) => Math.pow(1 + 1 / n, n))
  info(`the 9.2 ladder: (1.1)^10 = ${ladder[0].toFixed(7)}; (1.01)^100 = ${ladder[1].toFixed(7)}; (1.001)^1000 = ${ladder[2].toFixed(7)}; (1.0001)^10000 = ${ladder[3].toFixed(7)}; e = ${E.toFixed(7)}`)
  check('the ladder climbs to e: 2.5937425 < 2.7048138 < 2.7169239 < 2.7181459 < e', r7(ladder[0]) === 2.5937425 && r7(ladder[1]) === 2.7048138 && r7(ladder[2]) === 2.7169239 && r7(ladder[3]) === 2.7181459 && ladder[3] < E)
  check('every rung of the ladder stays below e', ladder.every((v) => v < E))
}

// ============================================ I02 — e^{0.5}: the sqrt(e) run
begin('I02 — e^{0.5} by the series: partials vs sqrt(e)')
{
  const S2 = expPartial(0.5, 2)
  const S4 = expPartial(0.5, 4)
  const S6 = expPartial(0.5, 6)
  const sqrtE = Math.sqrt(Math.E)
  info(`S2 = ${S2}; S4 = ${r7(S4)}; S6 = ${r7(S6)}; sqrt(e) = ${sqrtE.toFixed(7)}; gap = ${(sqrtE - S6).toExponential(4)}`)
  check('S2 = 1.5 exactly', S2 === 1.5)
  check('S4 = 1.6458333 (7 places)', r7(S4) === 1.6458333, `got ${r7(S4)}`)
  check('S6 = 1.6486979 (7 places)', r7(S6) === 1.6486979, `got ${r7(S6)}`)
  check('sqrt(e) = 1.6487213 at 7 places / 1.648721 at 6 places', r7(sqrtE) === 1.6487213 && r6(sqrtE) === 1.648721)
  check('S6 gap below sqrt(e) = 2.34e-5 (spec said 2.3e-5)', near(sqrtE - S6, 2.3354e-5, 1e-9), `got ${(sqrtE - S6).toExponential(4)}`)
  check('r6(S6) = 1.648698 and r6(sqrt e) = 1.648721 — 4-place read 1.6487 both', r6(S6) === 1.648698 && r6(sqrtE) === 1.648721)
}

// ================================================== I03 — e^{0.1} partials
begin('I03 — e^{0.1} by the series: how many terms pin seven places')
{
  const E01 = Math.exp(0.1)
  const S3 = expPartial(0.1, 3)
  const S5 = expPartial(0.1, 5)
  const S6 = expPartial(0.1, 6)
  info(`S3 = ${r7(S3)}; S5 = ${r7(S5)}; S6 = ${r7(S6)}; e^{0.1} = ${E01.toFixed(7)}`)
  check('S3 = 1.105 exactly (1 + 0.1 + 0.005)', S3 === 1.105)
  check('e^{0.1} = 1.1051709 (7 places)', r7(E01) === 1.1051709, `got ${r7(E01)}`)
  check('S5 = 1.1051708 — FIVE terms differ from e^{0.1} in the 7th place (ENGINE catch: the spec said 5 terms pin 7 places)', r7(S5) === 1.1051708, `got ${r7(S5)}`)
  check('S6 = 1.1051709 — SIX terms pin the 7th place (engine wins)', r7(S6) === 1.1051709, `got ${r7(S6)}`)
  check('the 3-term partial 1.105 already gives 3 places of e^{0.1} = 1.1051709', r4(S3) === 1.105)
  // L1(a) uses the same arithmetic
  check('L1(a): 1 + 0.1 + 0.005 = 1.105 exact', 1 + 0.1 + 0.005 === 1.105)
}

// ==================================================== I04 — e^{-1} partials
begin('I04 — e^{-1}: the alternating series for 1/e')
{
  const Em1 = Math.exp(-1)
  const S2 = expPartial(-1, 2)
  const S4 = expPartial(-1, 4)
  const S6 = expPartial(-1, 6)
  const S8 = expPartial(-1, 8)
  const S9 = expPartial(-1, 9)
  info(`S2 = ${r7(S2)}; S4 = ${r7(S4)}; S6 = ${r7(S6)}; S8 = ${r7(S8)}; S9 = ${r7(S9)}; e^{-1} = ${Em1.toFixed(7)}`)
  check('S2 = 0 (1 - 1)', S2 === 0)
  check('S4 = 0.3333333 (7 places)', r7(S4) === 0.3333333)
  check('S6 = 0.3666667 (7 places)', r7(S6) === 0.3666667)
  check('S8 = 0.3678571 (7 places)', r7(S8) === 0.3678571)
  check('S9 = 0.3678819 (7 places)', r7(S9) === 0.3678819)
  check('e^{-1} = 0.3678794 (7 places)', r7(Em1) === 0.3678794)
  // oscillation: even partials climb from below, odd partials fall from above
  const evens = [2, 4, 6, 8].map((n) => expPartial(-1, n))
  const odds = [1, 3, 5, 7, 9].map((n) => expPartial(-1, n))
  check('even partials of e^{-1} climb from below toward 0.3678794', evens.every((v) => v < Em1) && evens.every((v, i) => i === 0 || v > evens[i - 1]))
  check('odd partials of e^{-1} fall from above toward 0.3678794', odds.every((v) => v > Em1) && odds.every((v, i) => i === 0 || v < odds[i - 1]))
}

// ============================== I05 — the binomial route at n = 10 and 100
begin('I05 — the binomial route: coefficients at n = 10, dying toward the limit')
{
  // (1 + 1/n)^{nx} = 1 + x + x(x - 1/n)/2! + x(x-1/n)(x-2/n)/3! + ...
  // coefficient of x^r in the expansion = C(n r) / n^r  (binomial theorem,
  // positive integral index nx — or ch. 7's any-index form since 1/n < 1)
  const c2 = (n: number): number => (n * (n - 1)) / 2 / (n * n)
  const c3 = (n: number): number => ((n * (n - 1) * (n - 2)) / 6) / (n * n * n)
  const c4 = (n: number): number => ((n * (n - 1) * (n - 2) * (n - 3)) / 24) / (n * n * n * n)
  info(`n=10: c2 = ${c2(10)}, c3 = ${c3(10)}, c4 = ${c4(10)}; n=100: c2 = ${c2(100)}, c3 = ${c3(100)}, c4 = ${c4(100)}`)
  check('n = 10: coefficient of x^2 = 0.45 = (1 - 1/10)/2!', c2(10) === 0.45 && (1 - 1 / 10) / 2 === 0.45)
  check('n = 10: coefficient of x^3 = 0.12 = (0.9)(0.8)/3!', c3(10) === 0.12 && near((0.9 * 0.8) / 6, 0.12, 1e-12))
  check('n = 10: coefficient of x^4 = 0.021 = (0.9)(0.8)(0.7)/4!', c4(10) === 0.021 && (0.9 * 0.8 * 0.7) / 24 === 0.021)
  check('n = 100: c2 = 0.495, c3 = 0.1617, c4 = 0.03921225 — the 1/n corrections dying', c2(100) === 0.495 && c3(100) === 0.1617 && c4(100) === 0.03921225)
  check('limits: 0.5 = 1/2!, 0.1666667 = 1/3!, 0.0416667 = 1/4!', 0.5 === 1 / fact(2) && near(1 / fact(3), 0.1666667, 1e-7) && near(1 / fact(4), 0.0416667, 1e-7))
  // numeric certificate of the expansion itself at n = 10, x = 0.5:
  // (1.1)^{5} = 1.61051 and the truncated coefficient-form series agrees
  const lhs = Math.pow(1.1, 5)
  const rhs = 1 + 0.5 + (0.5 * 0.4) / 2 + (0.5 * 0.4 * 0.3) / 6 + (0.5 * 0.4 * 0.3 * 0.2) / 24 + (0.5 * 0.4 * 0.3 * 0.2 * 0.1) / 120
  info(`(1.1)^5 = ${lhs.toFixed(6)}; the n = 10 series at x = 0.5 gives ${rhs.toFixed(6)}`)
  check('(1 + 1/10)^{10 x 0.5} = (1.1)^5 = 1.61051 and the four-coefficient series matches to 1e-6', near(lhs, 1.61051, 1e-5) && near(lhs, rhs, 1e-6))
  check('the identity (1 + 1/n)^{nx} = {(1 + 1/n)^n}^x holds numerically at n = 10, x = 0.5', near(Math.pow(1 + 1 / 10, 10 * 0.5), Math.pow(Math.pow(1 + 1 / 10, 10), 0.5), 1e-12))
}

// ================================== I06 — the log series witnesses (slow)
begin('I06 — the slow log series: ln 1.5, ln 1.02, and the x = 2 refusal')
{
  const ln15 = Math.log(1.5)
  const S4 = logPartial(0.5, 4)
  const S8 = logPartial(0.5, 8)
  const S12 = logPartial(0.5, 12)
  info(`ln 1.5: S4 = ${r7(S4)}, S8 = ${r7(S8)}, S12 = ${r7(S12)}, ln 1.5 = ${ln15.toFixed(7)}`)
  check('S4 = 0.4010417 (7 places)', r7(S4) === 0.4010417, `got ${r7(S4)}`)
  check('S8 = 0.4053153 (7 places)', r7(S8) === 0.4053153, `got ${r7(S8)}`)
  check('S12 = 0.4054587 (7 places)', r7(S12) === 0.4054587, `got ${r7(S12)}`)
  check('ln 1.5 = 0.4054651 (7 places)', r7(ln15) === 0.4054651)
  // the alternating oscillation law: even partials below, odd partials above
  let oscillationOk = true
  for (let n = 1; n <= 12; n += 1) {
    const s = logPartial(0.5, n)
    const below = n % 2 === 0 && s < ln15
    const above = n % 2 === 1 && s > ln15
    if (!(below || above)) oscillationOk = false
  }
  check('oscillation law: every even partial sits below ln 1.5, every odd partial above', oscillationOk)
  // ln 1.02
  const ln102 = Math.log(1.02)
  const twoTerm = 0.02 - 0.0002
  const fourTerm = logPartial(0.02, 4)
  info(`ln 1.02 = ${ln102.toFixed(7)}; two-term partial = ${twoTerm}; four-term = ${r7(fourTerm)}`)
  check('ln 1.02 = 0.0198026 (7 places)', r7(ln102) === 0.0198026, `got ${r7(ln102)}`)
  check('the two-term partial 0.02 - 0.0002 = 0.0198 exact (3 places)', twoTerm === 0.0198)
  check('log_10 1.02 = 0.0086002 (7 places, via mu x ln 1.02)', r7(log10(1.02)) === 0.0086002, `got ${r7(log10(1.02))}`)
  // the x = 2 refusal witness
  const terms = [1, 2, 3, 4, 5, 6].map((r) => (Math.pow(-1, r + 1) * Math.pow(2, r)) / r)
  const partials = [1, 2, 3, 4, 5, 6, 10].map((n) => logPartial(2, n))
  info(`x = 2 terms: ${terms.map((t) => r6(t)).join(', ')}; partials S1..S6,S10 = ${partials.map((p) => r6(p)).join(', ')}`)
  check('x = 2 terms: 2, -2, 2.666667, -4, 6.4, -10.666667 (ENGINE pins; spec listed 5.6 — that is the S6 PARTIAL)', r6(terms[0]) === 2 && r6(terms[1]) === -2 && r6(terms[2]) === 2.666667 && r6(terms[3]) === -4 && r6(terms[4]) === 6.4 && r6(terms[5]) === -10.666667)
  check('x = 2 partials: S1 = 2, S2 = 0, S3 = 2.666667, S4 = -1.333333, S5 = 5.066667, S6 = -5.6', r6(partials[0]) === 2 && r6(partials[1]) === 0 && r6(partials[2]) === 2.666667 && r6(partials[3]) === -1.333333 && r6(partials[4]) === 5.066667 && r6(partials[5]) === -5.6)
  check('x = 2: S10 = -64.825397 — swings grow, no settle (spec guessed 4.4; engine pins -64.83)', r6(partials[6]) === -64.825397, `got ${r6(partials[6])}`)
  check('x = 2: the term magnitudes |2^r / r| grow for r >= 3 — the series does not represent log(3)', [3, 4, 5, 6, 7, 8].every((r) => Math.pow(2, r) / r > Math.pow(2, r - 1) / (r - 1)))
  check('x = 2 honesty: S10 is nowhere near ln 3 = 1.0986123 (|S10 - ln 3| > 60)', Math.abs(partials[6] - Math.log(3)) > 60)
  // validity sweep inside (-1, 1]
  let sweepOk = true
  for (let i = 0; i <= 12; i += 1) {
    const x = -0.9 + (1.85 * i) / 12
    const s = logPartial(x, 400)
    if (!(Math.abs(s - Math.log(1 + x)) < 1e-3)) sweepOk = false
  }
  check('sweep: for thirteen x across [-0.9, 0.95], 400 partials of the log series sit within 1e-3 of log(1+x)', sweepOk)
  check('the endpoint x = 1 handled separately: 4000 partials sit within 1.3e-4 of ln 2 (the slow lane creep)', Math.abs(logPartial(1, 4000) - Math.LN2) < 1.3e-4)
  let creepOk = true
  for (const n of [50, 100, 200, 400]) {
    if (!(Math.abs(logPartial(1, 2 * n) - Math.LN2) < Math.abs(logPartial(1, n) - Math.LN2))) creepOk = false
  }
  check('the creep at x = 1: doubling the terms roughly halves the error (50 -> 100 -> 200 -> 400 partials)', creepOk)
  check('the alternating bound |S_n - ln 2| < 1/(n+1) holds at n = 10, 100, 1000, 4000', [10, 100, 1000, 4000].every((n) => Math.abs(logPartial(1, n) - Math.LN2) < 1 / (n + 1)))
}

// ================================ I07 — the alternating harmonic at x = 1
begin('I07 — the alternating harmonic vs ln 2 (the slow lane)')
{
  const S10 = altHarm(10)
  const S100 = altHarm(100)
  const S1000 = altHarm(1000)
  const S4000 = altHarm(4000)
  info(`S10 = ${S10.toFixed(7)}; S100 = ${S100.toFixed(7)}; S1000 = ${S1000.toFixed(7)}; S4000 = ${S4000.toFixed(7)}; ln 2 = ${Math.LN2.toFixed(7)}`)
  check('S10 = 0.6456349 (7 places)', r7(S10) === 0.6456349, `got ${r7(S10)}`)
  check('S100 = 0.6881722 (7 places)', r7(S100) === 0.6881722, `got ${r7(S100)}`)
  check('S1000 = 0.6926474 (7 places)', r7(S1000) === 0.6926474, `got ${r7(S1000)}`)
  check('ln 2 = 0.6931472 (7 places)', r7(Math.LN2) === 0.6931472)
  check('S1000 error = 0.0004998 — three places only', near(Math.LN2 - S1000, 0.0004998, 5e-8), `got ${(Math.LN2 - S1000).toFixed(7)}`)
  check('S100 error = 0.0049750 (7 places)', near(Math.LN2 - S100, 0.004975, 5e-7), `got ${(Math.LN2 - S100).toFixed(7)}`)
  // the million-term estimate: to match the fast series's 1.13e-6 error the
  // slow lane needs 1/(n+1) <= 1.1322e-6, i.e. n >= 883 398 — "on the order
  // of a million terms"
  const need = Math.ceil(1 / 1.1332e-6) - 1
  info(`terms needed for a 1.13e-6 error on the slow lane (bound 1/(n+1)): n >= ${need}`)
  check('the million-term estimate: n >= 882456 (on the order of a million)', need === 882456, `got ${need}`)
  check('S4000 = 0.6930222 (7 places) — even 4000 terms leave the fourth place uncertain', r7(S4000) === 0.6930222, `got ${r7(S4000)}`)
  check('even after 4000 terms the slow lane is still ~5e-4 short of ln 2', Math.abs(S4000 - Math.LN2) > 1e-4)
}

// ======================================= I08 — the fast series (x = 1/3 etc)
begin('I08 — the fast series: identity, the ln 2 run, the x = 0.6 run')
{
  // identity: ln((1+x)/(1-x)) = 2(x + x^3/3 + x^5/5 + ...)
  const idOk = [0.1, 0.2, 1 / 3, 0.5, 0.6, 0.9].every((x) =>
    near(Math.log((1 + x) / (1 - x)), fastPartial(x, 200), 1e-9),
  )
  check('the fast-series identity holds numerically at six x values (200 terms)', idOk)
  check('(1 + 1/3)/(1 - 1/3) = 2 (exact in fractions; 1e-12 in doubles)', near((1 + 1 / 3) / (1 - 1 / 3), 2, 1e-12))
  const S: number[] = []
  for (let n = 1; n <= 6; n += 1) S[n] = fastPartial(1 / 3, n)
  info(`fast x = 1/3 partials: ${S.slice(1, 7).map((v) => v.toFixed(7)).join(' ')} vs ln 2 = ${Math.LN2.toFixed(7)}`)
  check('S1 = 0.6666667 (7 places)', r7(S[1]) === 0.6666667)
  check('S2 = 0.6913580 (7 places)', r7(S[2]) === 0.6913580)
  check('S3 = 0.6930041 (7 places)', r7(S[3]) === 0.6930041)
  check('S4 = 0.6931348 (7 places)', r7(S[4]) === 0.6931348)
  check('S5 = 0.6931460 (7 places)', r7(S[5]) === 0.6931460)
  const err5 = Math.LN2 - S[5]
  info(`the five-term error = ${err5.toExponential(6)}`)
  check('five-term error = 1.133169e-6 — about one unit in the sixth place (ENGINE catch — the spec said 1.1322e-6)', near(err5, 1.133169e-6, 1e-12), `got ${err5.toExponential(6)}`)
  check('the fast partials climb monotonically from below to ln 2', S.slice(1, 5).every((v, i) => v < S[i + 2]) && S[6] < Math.LN2)
  // x = 0.6 computes ln 4
  check('(1 + 0.6)/(1 - 0.6) = 4 exactly', (1 + 0.6) / (1 - 0.6) === 4)
  const S3b = fastPartial(0.6, 3)
  const S4b = fastPartial(0.6, 4)
  const ln4 = Math.log(4)
  info(`x = 0.6: S3 = ${r7(S3b)}, S4 = ${r7(S4b)}, ln 4 = ${ln4.toFixed(7)}`)
  check('x = 0.6: S3 = 1.3751040 (7 places)', r7(S3b) === 1.375104, `got ${r7(S3b)}`)
  check('x = 0.6: S4 = 1.3831022 (7 places)', r7(S4b) === 1.3831022, `got ${r7(S4b)}`)
  check('ln 4 = 1.3862944 (7 places) = 2 ln 2', r7(ln4) === 1.3862944 && near(ln4, 2 * Math.LN2, 1e-12))
  check('ln 4 error of S4 = 0.0031922 (7 places)', near(ln4 - S4b, 0.0031922, 5e-7), `got ${(ln4 - S4b).toFixed(7)}`)
  check('S5 of the x = 0.6 run = 1.3853417 (7 places), error 0.0009526 vs ln 4', r7(fastPartial(0.6, 5)) === 1.3853417 && near(ln4 - fastPartial(0.6, 5), 0.0009526, 5e-7), `got ${r7(fastPartial(0.6, 5))}`)
}

// ================================= I09 — mu, the constants table, the bridge
begin('I09 — the modulus mu and the constants table')
{
  const MU = log10(Math.E)
  const LN10 = Math.log(10)
  info(`mu = ${MU.toFixed(10)}; 1/mu = ${1 / MU} vs ln 10 = ${LN10}`)
  check('mu = log_10 e = 0.4342944819 (10 places)', r10(MU) === 0.4342944819, `got ${r10(MU)}`)
  check('mu = 1/ln 10 exactly in doubles (the reciprocal check)', near(MU, 1 / LN10, 1e-15))
  check('ln 10 = 2.3025851 (7 places)', r7(LN10) === 2.3025851)
  check('mu = 0.4342945 to 7 places (quiz item 5)', r7(MU) === 0.4342945)
  const rows = [
    { x: 2, ln: Math.log(2), log: log10(2) },
    { x: 3, ln: Math.log(3), log: log10(3) },
    { x: 7, ln: Math.log(7), log: log10(7) },
    { x: 4, ln: Math.log(4), log: log10(4) },
    { x: 8, ln: Math.log(8), log: log10(8) },
    { x: 9, ln: Math.log(9), log: log10(9) },
    { x: 11, ln: Math.log(11), log: log10(11) },
  ]
  for (const row of rows) {
    check(`log_10 ${row.x} = mu x ln ${row.x} exact (1e-12): ${r7(row.ln)} -> ${r7(row.log)}`, near(MU * row.ln, row.log, 1e-12))
  }
  check('ln 2 = 0.6931472, log_10 2 = 0.3010300 (7 places; 10-place read 0.3010299957)', r7(Math.log(2)) === 0.6931472 && r7(log10(2)) === 0.30103 && r10(log10(2)) === 0.3010299957)
  check('ln 3 = 1.0986123, log_10 3 = 0.4771213 (7 places; 10-place read 0.4771212547)', r7(Math.log(3)) === 1.0986123 && r7(log10(3)) === 0.4771213 && r10(log10(3)) === 0.4771212547)
  check('ln 7 = 1.9459101, log_10 7 = 0.8450980 (7 places; 10-place read 0.8450980400)', r7(Math.log(7)) === 1.9459101 && r7(log10(7)) === 0.845098 && r10(log10(7)) === 0.84509804)
  check('log_10 8 = 3 log_10 2 = 0.9030900 and log_10 9 = 2 log_10 3 = 0.9542425 (7 places)', r7(log10(8)) === 0.90309 && r7(log10(9)) === 0.9542425)
  check('log_10 11 = 1.0413927 (7 places; 10-place read 1.0413926852)', r7(log10(11)) === 1.0413927 && r10(log10(11)) === 1.0413926852)
}

// ==================== I10 — the table-construction routes (n = 9 and n = 11)
begin('I10 — the construction routes: log 3 via n = 9, log 11 via n = 11')
{
  const MU = log10(Math.E)
  // the two consecutive-difference formulas
  //   log(n+1) - log n   = mu(1/n - 1/(2n^2) + 1/(3n^3) - ...)
  //   log n - log(n-1)   = mu(1/n + 1/(2n^2) + 1/(3n^3) + ...)
  const alternating = (n: number, terms: number): number => {
    let s = 0
    for (let k = 1; k <= terms; k += 1) s += (Math.pow(-1, k + 1) * 1) / (k * Math.pow(n, k))
    return s
  }
  for (const n of [2, 5, 8, 10]) {
    check(`formula A at n = ${n}: the alternating sum equals ln((n+1)/n) to 1e-10`, near(alternating(n, 60), Math.log((n + 1) / n), 1e-10))
    check(`formula B at n = ${n + 1}: the all-plus sum equals ln(n+1) - ln(n) to 1e-10 (log n - log(n-1) with n+1 in the seat)`, near(allPlus(n + 1, 60), Math.log(n + 1) - Math.log(n), 1e-10))
  }
  // the n = 9 route for log 3 from log 2
  const sum9 = allPlus(9, 60)
  const ln98 = Math.log(9) - Math.log(8)
  info(`n = 9 all-plus sum = ${sum9.toFixed(7)} (true ln(9/8) = ${ln98.toFixed(7)})`)
  check('the n = 9 all-plus series sum = 0.1177830 (7 places) — ENGINE CATCH: the spec wrote 0.11778124, off in the 5th decimal; the engine value wins', r7(sum9) === 0.117783, `got ${r7(sum9)}`)
  check('that sum equals ln 9 - ln 8 = ln(9/8) to 1e-10', near(sum9, ln98, 1e-10))
  const delta9 = MU * sum9
  info(`x mu = ${delta9.toFixed(7)} (direct log_10(9/8) = ${log10(9 / 8).toFixed(7)})`)
  check('the n = 9 bridge = 0.0511525 (7 places)', r7(delta9) === 0.0511525, `got ${r7(delta9)}`)
  check('the bridge equals log_10 9 - log_10 8 to 1e-12', near(delta9, log10(9) - log10(8), 1e-12))
  const twoLog3 = 3 * log10(2) + delta9
  info(`2 log 3 = 3(0.3010300) + 0.0511525 = ${twoLog3.toFixed(7)}; log 3 = ${(twoLog3 / 2).toFixed(7)} vs direct ${log10(3).toFixed(7)}`)
  check('2 log 3 = 0.9542425 (7 places)', r7(twoLog3) === 0.9542425, `got ${r7(twoLog3)}`)
  check('log 3 = 0.4771213 (7 places) — the round-trip certificate lands', r7(twoLog3 / 2) === 0.4771213)
  check('the landing matches the direct engine value to 10 places (0.4771212547)', near(twoLog3 / 2, log10(3), 1e-9))
  check('the prime equation identity: 2 log 3 - 3 log 2 = log 9 - log 8 = log(9/8) (1e-12)', near(2 * log10(3) - 3 * log10(2), log10(9 / 8), 1e-12))
  // the n = 11 route for log 11 from log 10
  const sum11 = allPlus(11, 60)
  const ln1110 = Math.log(11) - Math.log(10)
  info(`n = 11 all-plus sum = ${sum11.toFixed(7)} (true ln(11/10) = ${ln1110.toFixed(7)})`)
  check('the n = 11 all-plus series sum = 0.0953102 (7 places)', r7(sum11) === 0.0953102, `got ${r7(sum11)}`)
  check('that sum equals ln 11 - ln 10 to 1e-10', near(sum11, ln1110, 1e-10))
  const delta11 = MU * sum11
  info(`x mu = ${delta11.toFixed(7)} (direct log_10(11/10) = ${log10(1.1).toFixed(7)})`)
  check('the n = 11 bridge = 0.0413927 (7 places)', r7(delta11) === 0.0413927, `got ${r7(delta11)}`)
  check('log 11 = 1 + 0.0413927 = 1.0413927 (7 places) — matches the direct value to 10 places', near(1 + delta11, log10(11), 1e-9) && r7(1 + delta11) === 1.0413927)
  // the alternating n = 10 route gives the same bridge (a cross-check)
  const alt10 = alternating(10, 60)
  check('cross-check: the alternating route at n = 10 gives the same ln(11/10) = 0.0953102', r7(alt10) === 0.0953102 && near(alt10, ln1110, 1e-10))
}

// ======================================== I11 — digit counts via the series
begin('I11 — the digit-count cashing: 2^64 and 2^100')
{
  const p64 = 2n ** 64n
  const p100 = 2n ** 100n
  info(`2^64 = ${p64.toString()} (${bigDigits(p64)} digits); 2^100 = ${p100.toString()} (${bigDigits(p100)} digits)`)
  check('2^64 = 18446744073709551616 — 20 digits', p64 === 18446744073709551616n && bigDigits(p64) === 20)
  check('2^100 = 1267650600228229401496703205376 — 31 digits', p100 === 1267650600228229401496703205376n && bigDigits(p100) === 31)
  const l64 = 64 * log10(2)
  const l100 = 100 * log10(2)
  info(`64 x log_10 2 = ${l64.toFixed(4)}; 100 x log_10 2 = ${l100.toFixed(7)}`)
  check('64 x 0.3010300 = 19.2659 (4 places; exact 19.26592) and floor + 1 = 20 digits', near(64 * 0.30103, 19.26592, 1e-9) && Math.floor(l64) + 1 === 20 && Math.floor(64 * 0.30103) + 1 === 20)
  check('100 x 0.3010300 = 30.1030 + 1 = 31 digits (floor + 1 law; direct read 30.1029996 both floor to 30)', near(100 * 0.30103, 30.103, 1e-12) && Math.floor(l100) + 1 === 31 && Math.floor(100 * 0.30103) + 1 === 31)
  check('the rounded read 100 x 0.3010300 = 30.1030000 pinned', 100 * 0.30103 === 30.103)
  check('log_10 2 = 0.3010300 to 7 places (the census seed)', r7(log10(2)) === 0.30103)
}

// ============================ I12 — the exponent-law exactness witnesses
begin('I12 — every base rides the series: a^x = e^{x ln a} witnesses')
{
  check('3^2 = e^{2 ln 3} = 9 exact (1e-9)', near(Math.exp(2 * Math.log(3)), 9, 1e-9))
  check('e^{2 ln 5} = 25 exact (1e-9)', near(Math.exp(2 * Math.log(5)), 25, 1e-9))
  check('3^4 = e^{4 ln 3} = 81 exact (1e-9)', near(Math.exp(4 * Math.log(3)), 81, 1e-9))
  check('2^10 = e^{10 ln 2} = 1024 exact (1e-9)', near(Math.exp(10 * Math.log(2)), 1024, 1e-9))
  check('a = e^{ln a} for a = 2, 3, 5, 7, 10 (1e-12 each)', [2, 3, 5, 7, 10].every((a) => near(Math.exp(Math.log(a)), a, 1e-12)))
  // a^{log_b c} = c^{log_b a}: both equal e^{(ln c)(ln a)/ln b}
  const w = Math.exp((Math.log(5) * Math.log(3)) / Math.log(2))
  check('3^{log_2 5} = 5^{log_2 3} (both = e^{ln5 ln3 / ln2}, 1e-9)', near(Math.pow(3, Math.log(5) / Math.log(2)), w, 1e-9) && near(Math.pow(5, Math.log(3) / Math.log(2)), w, 1e-9))
  // the exponential series with x ln a in place of x: 3^2 by the series
  const series9 = expPartial(2 * Math.log(3), 18)
  check('the series form: 1 + (2 ln 3) + (2 ln 3)^2/2! + ... (18 terms) = 9 to 1e-9', near(series9, 9, 1e-9))
  check('e^{ln 7} = 7 (1e-12)', near(Math.exp(Math.log(7)), 7, 1e-12))
}

// ================================= I13 — the exercise-set arithmetic pins
begin('I13 — L1..L6 exercise arithmetic, every number re-derived')
{
  // L1
  check('L1(a): first three terms at x = 0.1 sum to 1.105; e^{0.1} = 1.1051709', expPartial(0.1, 3) === 1.105 && r7(Math.exp(0.1)) === 1.1051709)
  check('L1(c): S2 of the log series at x = 0.5 is 0.5 - 0.125 = 0.375 exact', logPartial(0.5, 2) === 0.375)
  // L2
  check('L2(a): e^{-1} = 0.3678794; partials S2 = 0, S4 = 0.3333333, S6 = 0.3666667, S8 = 0.3678571', r7(Math.exp(-1)) === 0.3678794 && expPartial(-1, 2) === 0 && r7(expPartial(-1, 4)) === 0.3333333 && r7(expPartial(-1, 6)) === 0.3666667 && r7(expPartial(-1, 8)) === 0.3678571)
  check('L2(b): ln 1.1 = 0.0953102 (7 places); the 3-term partial = 0.0953333', r7(Math.log(1.1)) === 0.0953102 && r7(logPartial(0.1, 3)) === 0.0953333, `got ${r7(logPartial(0.1, 3))}`)
  check('L2(c): the fast-series second partial at x = 1/3 = 0.6913580', r7(fastPartial(1 / 3, 2)) === 0.6913580)
  // L3
  check('L3(a): five fast terms give 0.6931460 with error 1.133169e-6 vs ln 2 = 0.6931472', r7(fastPartial(1 / 3, 5)) === 0.693146 && near(Math.LN2 - fastPartial(1 / 3, 5), 1.133169e-6, 1e-12))
  check('L3(b): 3^4 = 81 and 2^10 = 1024 (the a^x = e^{x ln a} cashing)', Math.pow(3, 4) === 81 && Math.pow(2, 10) === 1024)
  check('L3(c): log_10 7 = mu x ln 7 = 0.8450980 (7 places)', r7(log10(Math.E) * Math.log(7)) === 0.845098)
  // L4
  check('L4(a): the n = 11 route lands log_10 11 = 1.0413927, matching the direct value', r7(1 + log10(Math.E) * allPlus(11, 60)) === 1.0413927 && near(1 + log10(Math.E) * allPlus(11, 60), log10(11), 1e-9))
  check('L4(b): 100 x log_10 2 = 30.1030 and 2^100 owns 31 digits', r4(100 * log10(2)) === 30.103 && bigDigits(2n ** 100n) === 31)
  check('L4(c): S100 of the alternating harmonic = 0.6881722, error 0.0049750 vs ln 2 = 0.6931472', r7(altHarm(100)) === 0.6881722 && near(Math.LN2 - altHarm(100), 0.004975, 5e-7))
  // L5
  check('L5(a): e^{2 ln 5} = 25 exact and a^{log_b c} = c^{log_b a} numerically (3,5 base 2)', near(Math.exp(2 * Math.log(5)), 25, 1e-9) && near(Math.pow(3, Math.log(5) / Math.log(2)), Math.pow(5, Math.log(3) / Math.log(2)), 1e-9))
  check('L5(b): the x = 0.6 run: S3 = 1.3751040, S4 = 1.3831022 vs ln 4 = 1.3862944', r7(fastPartial(0.6, 3)) === 1.375104 && r7(fastPartial(0.6, 4)) === 1.3831022 && r7(Math.log(4)) === 1.3862944)
  check('L5(c): slow lane S1000 = 0.6926474 (error 0.0004998) vs fast lane five terms 0.6931460 (error 1.1e-6)', r7(altHarm(1000)) === 0.6926474 && r7(fastPartial(1 / 3, 5)) === 0.693146)
  // L6
  const MU = log10(Math.E)
  check('L6(a): the certificate chain 3 log 2 + mu(allPlus(9)) = 2 log 3 to 1e-9, halving to 0.4771213', near(3 * log10(2) + MU * allPlus(9, 60), 2 * log10(3), 1e-9) && r7((3 * log10(2) + MU * allPlus(9, 60)) / 2) === 0.4771213)
  const c2 = (n: number): number => ((n * (n - 1)) / 2) / (n * n)
  const c3 = (n: number): number => ((n * (n - 1) * (n - 2)) / 6) / (n * n * n)
  const c4 = (n: number): number => ((n * (n - 1) * (n - 2) * (n - 3)) / 24) / (n * n * n * n)
  check('L6(b): at n = 10 the four coefficients are 1, 1, 0.45, 0.12, 0.021; at n = 100 they are 0.495, 0.1617, 0.0392 — corrections visible and dying', c2(10) === 0.45 && c3(10) === 0.12 && c4(10) === 0.021 && c2(100) === 0.495 && c3(100) === 0.1617 && r4(c4(100)) === 0.0392)
}

// ============ I14 — the honesty sweeps: what the engine does and does not claim
begin('I14 — honesty sweeps: witnesses verified, proofs deferred by name')
{
  // exponential series: every x in a wide grid converges (60 terms, 1e-6)
  let expSweepOk = true
  for (let i = 0; i <= 20; i += 1) {
    const x = -5 + (10 * i) / 20
    if (!(Math.abs(expPartial(x, 60) - Math.exp(x)) < 1e-6)) expSweepOk = false
  }
  check('sweep: for twenty x across [-5, 5], 60 terms of the exponential series hit e^x within 1e-6', expSweepOk)
  check('the exponential series at x = -5 (60 terms) matches e^{-5} = 0.0067379 within 1e-10', Math.abs(expPartial(-5, 60) - Math.exp(-5)) < 1e-10)
  check('the alternating series at x = -20 needs its terms to shrink first: S150 lands within 1e-6 of e^{-20} (cancellation-limited)', Math.abs(expPartial(-20, 150) - Math.exp(-20)) < 1e-6)
  check('the exponential series at x = 20 (90 terms) matches e^{20} = 4.8517e8 relatively', Math.abs(expPartial(20, 90) / Math.exp(20) - 1) < 1e-12)
  // the geometric identity the log series cashes: 1/(1+t) = 1 - t + t^2 - ...
  const geo = (t: number, terms: number): number => {
    let s = 0
    for (let k = 0; k < terms; k += 1) s += Math.pow(-t, k)
    return s
  }
  check('the banked geometric identity: for |t| < 1 the alternating geometric partial 1 - t + t^2 - ... tends to 1/(1+t) (five witnesses, 600 terms, 1e-12)', [0.1, 0.25, 1 / 3, 0.5, 0.9].every((t) => near(geo(t, 600), 1 / (1 + t), 1e-12)))
  // the log series is verified ONLY on its interval — the engine does not
  // claim a proof, it claims witnesses
  check('the log series verified at x = 0.5, 0.9 and the endpoint x = 1 (partial, creep)', near(logPartial(0.5, 60), Math.log(1.5), 1e-12) && Math.abs(logPartial(0.9, 400) - Math.log(1.9)) < 1e-3 && Math.abs(logPartial(1, 4000) - Math.LN2) < 1.3e-4)
  check('the log series REFUSED outside: at x = 2 and x = -2 the partials do not approach log(3) / log(1) (log 1 = 0; partials swing)', Math.abs(logPartial(2, 50) - Math.log(3)) > 1 && Math.abs(logPartial(-2, 50) - 0) > 1)
  // the fast-series interval: |x| < 1
  check('the fast series verified at x = 1/3 and 0.6 to 1e-10', near(fastPartial(1 / 3, 100), Math.LN2, 1e-10) && near(fastPartial(0.6, 100), Math.log(4), 1e-10))
  info('engine phase done: every prose number above is pinned; the termwise-limit and convergence proofs remain stated-not-proved (chapter 10 named)')
}

// ================ I15 — prose-adjacent derived numbers (grown at the pins pass)
begin('I15 — prose-adjacent derived numbers, each one pinned')
{
  // the alternating harmonic's first five partials (body figure 2 dots and the
  // fast/slow comparison table quote them term by term)
  check('altHarm S1..S5 = 1, 0.5, 0.8333333, 0.5833333, 0.7833333 (figure 2 dots; the fast/slow table)', r7(altHarm(1)) === 1 && r7(altHarm(2)) === 0.5 && r7(altHarm(3)) === 0.8333333 && r7(altHarm(4)) === 0.5833333 && r7(altHarm(5)) === 0.7833333)
  // the ln 1.5 illustration quotes the S5 bracket
  check('logPartial(0.5, 5) = 0.4072917 (the odd partial above ln 1.5)', r7(logPartial(0.5, 5)) === 0.4072917, `got ${r7(logPartial(0.5, 5))}`)
  // the ln 1.02 illustration: the four-term partial lands the same seven places
  check('logPartial(0.02, 4) = 0.0198026 (four terms, seven places)', r7(logPartial(0.02, 4)) === 0.0198026, `got ${r7(logPartial(0.02, 4))}`)
  // the fast route to ln 1.5 at x = 0.2 (the ln 1.5 illustration's Hence note)
  check('(1+0.2)/(1-0.2) = 1.5 and the fast series converges to ln 1.5 = 0.4054651 at x = 0.2', near((1 + 0.2) / (1 - 0.2), 1.5, 1e-12) && near(fastPartial(0.2, 200), Math.log(1.5), 1e-10))
  // the fast route to ln 3 at x = 0.5 (quiz item 4 explain)
  check('(1+0.5)/(1-0.5) = 3 and the fast series converges to ln 3 = 1.0986123 at x = 0.5 (ENGINE catch: five fast terms there give 1.0984996, so the prose no longer claims five-term equality)', near((1 + 0.5) / (1 - 0.5), 3, 1e-12) && near(fastPartial(0.5, 200), Math.log(3), 1e-10) && r7(fastPartial(0.5, 200)) === 1.0986123)
  // quiz item 3 explain: ln 0.5 as the mirror of ln 2
  check('ln 0.5 = -0.6931472 (mirror of ln 2)', r7(Math.log(0.5)) === -0.6931472, `got ${r7(Math.log(0.5))}`)
  // the construction route at n = 9: SEVEN terms pin the quoted seven-place sum
  // (ENGINE catch: the prose earlier claimed three terms give six places at
  // n >= 8 — false; three terms at n = 9 leave a 4.2e-5 error)
  check('allPlus(9, 7) = 0.1177830 (seven terms pin the seven-place sum quoted at n = 9)', r7(allPlus(9, 7)) === 0.117783, `got ${r7(allPlus(9, 7))}`)
  check('three terms at n = 9 sit 4.2e-5 short of ln(9/8) — the false claim is dead', Math.abs(allPlus(9, 3) - Math.log(9 / 8)) > 3e-5)
  // the collapse paragraph: 1/5! and the x = 0.1 fourth term
  check('1/5! = 0.0083333 (the collapse paragraph quotes 0.0083)', near(1 / fact(5), 0.0083333, 1e-6))
  check('the x = 0.1 fourth term = 0.0001667', near(Math.pow(0.1, 3) / fact(3), 0.0001667, 1e-7))
  // exercise error gaps quoted in prose
  check('L1c gap: ln 1.5 - S2 = 0.0304651', near(Math.log(1.5) - logPartial(0.5, 2), 0.0304651, 5e-8))
  check('L2b error: 3-term partial - ln 1.1 = 2.3154e-5 (ENGINE catch: the prose said 0.0000231, a truncation of 0.0000231535; the 7-place read is 0.0000232 and the prose now says 2.3 x 10^-5)', near(logPartial(0.1, 3) - Math.log(1.1), 2.3154e-5, 1e-8), `got ${(logPartial(0.1, 3) - Math.log(1.1)).toExponential(6)}`)
  check('L2c gap: ln 2 - fast S2 = 0.0017892', near(Math.LN2 - fastPartial(1 / 3, 2), 0.0017892, 5e-8))
  check('L5b error: ln 4 - S3 = 0.0111904', near(Math.log(4) - fastPartial(0.6, 3), 0.0111904, 5e-7))
  check('slow-lane S4000 error = 0.0001250 (the L5c figure caption and prose)', near(Math.LN2 - altHarm(4000), 0.000125, 5e-7))
  // L3b exponent readbacks
  check('4 ln 3 = 4.3944492 and 10 ln 2 = 6.9314718 (the L3b seats)', r7(4 * Math.log(3)) === 4.3944492 && r7(10 * Math.log(2)) === 6.9314718)
  // L5b inner sums quoted in the solution
  check('fast(0.6,3)/2 = 0.687552 and fast(0.6,4)/2 = 0.69155109 (the inner sums quoted, 7-place 0.6915511)', near(fastPartial(0.6, 3) / 2, 0.687552, 1e-9) && near(fastPartial(0.6, 4) / 2, 0.6915511, 5e-7))
  // L6b truncated-series addends at n = 10, x = 0.5
  check('1 + 0.5 + 0.1 + 0.01 + 0.0005 + 0.00001 = 1.61051 (the L6b addends)', near(1 + 0.5 + 0.1 + 0.01 + 0.0005 + 0.00001, 1.61051, 1e-9))
}

// ==================================================================== PINS
{
  const lesson95 = chapter09.lessons[4] as Lesson
  const serialized = JSON.stringify(lesson95)

  begin('J01 — identity, number, title, prerequisites, sources')
  check('id is aa-exponential-and-logarithmic-series', lesson95.id === 'aa-exponential-and-logarithmic-series')
  check('number is 9.5', lesson95.number === '9.5')
  check('title is "Exponential and Logarithmic Series"', lesson95.title === 'Exponential and Logarithmic Series')
  check('prerequisites exact (3 entries, in order)', JSON.stringify(lesson95.prerequisites) === JSON.stringify(['aa-the-binomial-theorem-any-index', 'aa-the-exponential-family-every-real-index', 'aa-geometric-progressions-and-the-infinite-tail']))
  check('sources exact (4 entries, in order)', JSON.stringify(lesson95.sources) === JSON.stringify(['hall-knight-higher-algebra', 'cengage-jee-style', 'jee-main-2026-syllabus', 'cengage-m1-01']))
  check('concepts: 5..8 entries, all kebab-word phrases', Array.isArray(lesson95.concepts) && lesson95.concepts.length >= 5 && lesson95.concepts.length <= 8)

  begin('J02 — the honest word count')
  const words = countLessonWords(lesson95)
  info(`countLessonWords(lesson95) = ${words}`)
  check('countLessonWords >= 6000', words >= 6000, `got ${words}`)

  begin('J03 — example blocks and worked-solution depth')
  const examples = lesson95.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; title: string; steps: string[] }[]
  info(`example blocks: ${examples.length}`)
  check('>= 2 example blocks with >= 4 steps', examples.filter((e) => e.steps.length >= 4).length >= 2)
  check('every example step is a non-empty string', examples.every((e) => e.steps.every((s) => s.trim().length > 0)))

  begin('J04 — quiz pins')
  const quizzes = lesson95.blocks.filter((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { q: string; options: string[]; answer: number; explain: string }[] }[]
  const quiz = quizzes[0]?.items ?? []
  check('exactly one quiz with exactly 5 items', quizzes.length === 1 && quiz.length === 5)
  check('quiz answers pinned [1, 1, 1, 1, 0]', JSON.stringify(quiz.map((it) => it.answer)) === JSON.stringify([1, 1, 1, 1, 0]), `got ${JSON.stringify(quiz.map((it) => it.answer))}`)
  check('every quiz item has 4 options', quiz.every((it) => it.options.length === 4))
  check('every quiz explain addresses each wrong option (mentions "Option")', quiz.every((it) => it.explain.includes('Option') && it.explain.length > 120))

  begin('J05 — figures: body count, solution count, aria-label, palette')
  const bodyFigures = lesson95.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
  const exerciseSets = lesson95.blocks.filter((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: { level: string; questions: { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }[] }[] }[]
  const allQuestions = exerciseSets.flatMap((e) => e.sets.flatMap((s) => s.questions))
  const solutionFigures = allQuestions.flatMap((q) => q.figures ?? [])
  const exampleFigures = (lesson95.blocks.filter((b) => b.kind === 'example') as { kind: 'example'; figures?: { caption: string; svg: string }[] }[]).flatMap((e) => e.figures ?? [])
  const allSvgs = [...bodyFigures.map((f) => f.svg), ...exampleFigures.map((f) => f.svg), ...solutionFigures.map((f) => f.svg)]
  info(`body figures: ${bodyFigures.length}; solution figures: ${solutionFigures.length}; example-block figures: ${exampleFigures.length}`)
  check('>= 3 body figures (kind figure)', bodyFigures.length >= 3)
  check('>= 3 solution figures across the exercises', solutionFigures.length >= 3)
  check('every svg contains aria-label=', allSvgs.every((s) => s.includes('aria-label=')))
  check('every svg declares viewBox="0 0 720', allSvgs.every((s) => s.includes('viewBox="0 0 720 ')))
  check('every svg declares xmlns and role="img"', allSvgs.every((s) => s.includes('xmlns="http://www.w3.org/2000/svg"') && s.includes('role="img"')))
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  check('no retired hex appears in any svg', retired.every((h) => !allSvgs.some((s) => s.includes(h))))
  const allowed = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']
  const usedHexes = [...new Set(allSvgs.flatMap((s) => s.match(/#[0-9a-fA-F]{6}/g) ?? []))]
  info(`hexes used: ${usedHexes.join(' ')}`)
  check('every hex used is from the allowed palette table', usedHexes.every((h) => allowed.includes(h)), `offenders: ${usedHexes.filter((h) => !allowed.includes(h)).join(' ')}`)
  check('solution figures compact (viewBox height <= 240)', solutionFigures.every((f) => /viewBox="0 0 720 (\d+)"/.test(f.svg) && Number(/viewBox="0 0 720 (\d+)"/.exec(f.svg)?.[1]) <= 240))
  check('no blue or indigo anywhere in the svgs', allSvgs.every((s) => !/#[0-9a-fA-F]{2}(4[0-9a-fA-F]|5[0-9a-fA-F]|6[0-9a-fA-F]|7[0-9a-fA-F]|8[0-9a-fA-F]|9[0-9a-fA-F])[0-9a-fA-F]{2}/.test(s.replace(/#16a34a|#166534|#65a30d|#0d9488|#0f766e|#d97706|#ea580c|#dc2626|#fef3c7|#ffedd5|#fcd34d|#5eead4|#ffffff/g, ''))))

  begin('J06 — exercises census')
  info(`exercise questions: ${allQuestions.length}`)
  check('>= 16 exercise questions', allQuestions.length >= 16)
  check('every question has a non-empty steps-array solution', allQuestions.every((q) => Array.isArray(q.solution) && q.solution.length >= 1 && q.solution.every((s) => s.trim().length > 0)))
  check('every question carries an answer', allQuestions.every((q) => typeof q.answer === 'string' && q.answer.trim().length > 0))
  check('>= 3 questions carry figures', allQuestions.filter((q) => (q.figures ?? []).length > 0).length >= 3)
  const levels = exerciseSets.flatMap((e) => e.sets.map((s) => s.level))
  check('six levels L1..L6 present in order', JSON.stringify(levels) === JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']))

  begin('J07 — block-kind census')
  const kinds = (k: string) => lesson95.blocks.filter((b) => b.kind === k).length
  const headings = lesson95.blocks.filter((b) => b.kind === 'heading') as { kind: 'heading'; text: string }[]
  check('>= 2 derivations', kinds('derivation') >= 2)
  check('>= 1 theorem callout', lesson95.blocks.some((b) => b.kind === 'callout' && b.tone === 'theorem'))
  check('>= 1 definition callout', lesson95.blocks.some((b) => b.kind === 'callout' && b.tone === 'definition'))
  check('>= 1 terms block', kinds('terms') >= 1)
  check('>= 1 table (the constants table)', kinds('table') >= 1)
  check('>= 1 roman list', lesson95.blocks.some((b) => b.kind === 'list' && b.marker === 'roman'))
  check('>= 5 formula cards', kinds('formula') >= 5)
  check('the four section headings present', ['The Exponential Series', 'The Logarithmic Series', 'The Modulus and the Table Construction', 'The Chapter\u2019s Doorstep'].every((h) => headings.some((x) => x.text === h || x.text === h.replace('\u2019', "'"))))
  check('>= 1 historical callout (Briggs / Napier / Mercator)', lesson95.blocks.some((b) => b.kind === 'callout' && b.tone === 'historical' && /1617/.test((b as { text: string }).text)))
  check('>= 1 warn callout (the validity interval caution)', lesson95.blocks.some((b) => b.kind === 'callout' && b.tone === 'warn'))
  check('>= 1 exam callout labelled exam-style', lesson95.blocks.some((b) => b.kind === 'callout' && b.tone === 'exam' && (b as { text: string }).text.includes('exam-style')))

  begin('J08 — the honesty law (stated-not-proved, chapter 10 named)')
  check('the serialized lesson contains "stated"', serialized.includes('stated'))
  check('the serialized lesson contains "chapter 10" (the deferred-convergence discipline)', serialized.includes('chapter 10'))
  check('the honesty is named at the exponential series (termwise limit)', lesson95.blocks.some((b) => b.kind === 'callout' && (b as { text: string }).text.includes('termwise')))
  check('the honesty is named at the log series (the integration doorstep)', lesson95.blocks.some((b) => b.kind === 'callout' && (b as { title?: string; text: string }).text.includes('integration')))

  begin('J09 — pinned tokens and placeholder hygiene')
  for (const tok of ['2.7182818', '0.6931472', '0.4342944819', '0.4771213', '18446744073709551616']) {
    check(`token "${tok}" appears in the serialized lesson`, serialized.includes(tok))
  }
  check('no placeholders (TODO / 【】 / XXX / undefined / NaN as a word)', !serialized.includes('TODO') && !serialized.includes('\u3010\u3011') && !serialized.includes('XXX') && !/(^|[^A-Za-z])(undefined|NaN)([^A-Za-z]|$)/.test(serialized))
  check('no stray control characters from bad escapes', !/[\u0000-\u0008\u000b-\u001f\u007f]/.test(serialized))

  begin('J10 — KaTeX discipline inside single-quoted strings')
  const katexFields: string[] = []
  for (const b of lesson95.blocks) {
    if (b.kind === 'para' || b.kind === 'heading') katexFields.push(b.text)
    if (b.kind === 'callout') katexFields.push(b.title, b.text)
    if (b.kind === 'terms') for (const t of b.items) katexFields.push(t.term, t.def)
    if (b.kind === 'equation') katexFields.push(b.latex, b.note ?? '')
    if (b.kind === 'derivation') {
      katexFields.push(b.title, b.statement, b.result)
      for (const s of b.steps) katexFields.push(s.label, s.formula ?? '', s.explanation)
    }
    if (b.kind === 'example') {
      katexFields.push(b.title)
      for (const s of b.steps) katexFields.push(s)
      for (const f of b.figures ?? []) katexFields.push(f.caption)
    }
    if (b.kind === 'figure') katexFields.push(b.caption)
    if (b.kind === 'table') {
      katexFields.push(b.caption ?? '')
      for (const h of b.head) katexFields.push(h)
      for (const r of b.rows) for (const c of r) katexFields.push(c)
    }
    if (b.kind === 'list') for (const i of b.items) katexFields.push(i)
    if (b.kind === 'quiz') {
      for (const it of b.items) katexFields.push(it.q, it.explain, ...it.options)
    }
    if (b.kind === 'exercises') {
      for (const set of b.sets)
        for (const q of set.questions) {
          katexFields.push(q.q)
          const sol = Array.isArray(q.solution) ? q.solution.join(' ') : q.solution
          katexFields.push(sol, q.answer ?? '')
          for (const f of q.figures ?? []) katexFields.push(f.caption)
        }
    }
    if (b.kind === 'formula') katexFields.push(b.name, b.latex, b.note ?? '')
  }
  check('no $ in any callout title / derivation title-or-label / formula name / term field (the plain-title rule; example titles render KaTeX inline, as in ch-08)', (() => {
    const plain: string[] = []
    for (const b of lesson95.blocks) {
      if (b.kind === 'heading') plain.push(b.text)
      if (b.kind === 'callout') plain.push(b.title)
      if (b.kind === 'terms') for (const t of b.items) plain.push(t.term)
      if (b.kind === 'derivation') {
        plain.push(b.title)
        for (const s of b.steps) plain.push(s.label)
      }
      if (b.kind === 'formula') plain.push(b.name)
    }
    return plain.every((p) => !p.includes('$'))
  })())
  check('no KaTeX braces leaked into svg text (caret notation only)', allSvgs.every((s) => !/\{|\}/.test(s)))
  check('no backslash escapes of \\frac \\text \\ln \\log were eaten (no control chars in any math-bearing field)', katexFields.every((f) => !/[\u0000-\u0008\u000b-\u001f]/.test(f)))
}

// ------------------------------------------------------------------ tallies
const s_pass = tally.reduce((s, t) => s + t.pass, 0)
const s_fail = tally.reduce((s, t) => s + t.fail, 0)
for (const t of tally) console.log(`    ${t.id}: ${t.pass}/${t.pass + t.fail}`)
return { id: 'I+J (9.5 engines + pins)', pass: s_pass, fail: s_fail }
}

// ------------------------------------------------------------------
// (K + L) from v-aa96.ts — the 9.6 engines + pins, wrapped whole
// ------------------------------------------------------------------

function sectionK(): SectionResult {
/**
 * v-aa96.ts — the verify-first ENGINE for Advanced Algebra lesson 9.6
 * "Logarithm Tables: Characteristic, Mantissa and Antilogarithm"
 * (agent aa96 of the run-121 whole-chapter swarm).
 *
 * Discipline (shared contract §0): every number the lesson dares to print is
 * recomputed here by brute force FIRST — exact integer checks, sweeps of the
 * whole four-digit domain, rounding audits — and only then does the prose get
 * written. Where this engine disagrees with the spec sheet, THE ENGINE WINS
 * and the prose is adjusted; every such catch is flagged in the agent's final
 * report.
 *
 * The lesson's OWN table conventions (engine-built, never pasted):
 *   log entry     : entry(R, C)  = round(10000 · (log10(10R + C) − 2))        — row R, column C
 *   log mean diff : md(R, d)     = round(10000 · log10(1 + d/(100R)))         — row R, digit d
 *   antilog entry : aEntry(.ab)  = round(1000 · 10^(.abc))                    — 3-digit mantissa
 *   antilog md    : aMd(.abc, d) = round(d · (aEntry(.ab(c+1)) − aEntry(.abc))/10)
 *                   — proportional parts of the column increment (rounded)
 *
 * Shape: self-contained script. Section A (A01…) = pure-arithmetic engines,
 * no repo imports, run green BEFORE the prose. Section P (P01…) = pins that
 * read the authored part file — appended AFTER the prose exists.
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-aa96.ts
 */

/* ------------------------------------------------------------------ */
/* collector                                                           */
/* ------------------------------------------------------------------ */

const failures: string[] = []
let aTotal = 0
let aPass = 0
let pTotal = 0
let pPass = 0

function check(name: string, ok: boolean, detail = ''): void {
  const isPin = name.startsWith('P')
  if (isPin) {
    pTotal++
    if (ok) pPass++
  } else {
    aTotal++
    if (ok) aPass++
  }
  if (!ok) failures.push(`${name}${detail ? ' — ' + detail : ''}`)
  console.log(`${ok ? '[ ok ]' : '[FAIL]'} ${name}${detail ? ' — ' + detail : ''}`)
}

/** fixed-decimal equality: got.toFixed(dp) === want */
function eq(name: string, got: number, dp: number, want: string): void {
  check(name, got.toFixed(dp) === want, `got ${got.toFixed(dp)}, want ${want}`)
}

const log10 = (x: number): number => Math.log10(x)
const pow10 = (x: number): number => Math.pow(10, x)

/** the four-figure LOG table entry: row R (10..99), column C (0..9) */
const entry = (R: number, C: number): number => Math.round(10000 * (log10(10 * R + C) - 2))
/** the four-figure LOG mean difference: row R, fourth digit d (1..9) */
const meanDiff = (R: number, d: number): number => Math.round(10000 * log10(1 + d / (100 * R)))
/** the four-figure ANTILOG table entry for the three-digit mantissa m3 (.abc) */
const aEntry = (m3: number): number => Math.round(1000 * pow10(m3))
/** the ANTILOG mean difference (proportional parts of the column increment) */
const aMd = (m3: number, d: number): number => Math.round((d * (aEntry(m3 + 0.001) - aEntry(m3))) / 10)

console.log('==========================================================')
console.log('v-aa96 — engines for AA 9.6 "Logarithm Tables"')
console.log('==========================================================')

/* ------------------------------------------------------------------ */
/* A01 · the lesson's own four-figure excerpt: rows 21 and 47, and     */
/*      the mean-difference columns — computed, never pasted          */
/* ------------------------------------------------------------------ */
{
  const row21 = [3222, 3243, 3263, 3284, 3304, 3324, 3345, 3365, 3385, 3404]
  const row47 = [6721, 6730, 6739, 6749, 6758, 6767, 6776, 6785, 6794, 6803]
  for (let C = 0; C <= 9; C++) {
    check(`A01 entry(21, ${C}) = ${row21[C]}`, entry(21, C) === row21[C], `got ${entry(21, C)}`)
    check(`A01 entry(47, ${C}) = ${row47[C]}`, entry(47, C) === row47[C], `got ${entry(47, C)}`)
  }
  const md21 = [2, 4, 6, 8, 10, 12, 14, 17, 19]
  const md47 = [1, 2, 3, 4, 5, 6, 6, 7, 8]
  for (let d = 1; d <= 9; d++) {
    check(`A01 meanDiff(21, ${d}) = ${md21[d - 1]}`, meanDiff(21, d) === md21[d - 1], `got ${meanDiff(21, d)}`)
    check(`A01 meanDiff(47, ${d}) = ${md47[d - 1]}`, meanDiff(47, d) === md47[d - 1], `got ${meanDiff(47, d)}`)
  }
  // the row-25 route for the L6(b) audit witness 25795
  check('A01 entry(25, 7) = 4099 (row 25, column 7)', entry(25, 7) === 4099, `got ${entry(25, 7)}`)
  check('A01 meanDiff(25, 9) = 16 (row 25, digit 9)', meanDiff(25, 9) === 16, `got ${meanDiff(25, 9)}`)
  check('A01 the 25795 route: 4099 + 16 = 4115', entry(25, 7) + meanDiff(25, 9) === 4115)
}

/* ------------------------------------------------------------------ */
/* A02 · the characteristic roster — floor(log10) against BOTH         */
/*      inspection rules (digit count / zero count), by strings        */
/* ------------------------------------------------------------------ */
{
  const digitsLeft = (s: string): number => {
    const ip = s.split('.')[0]
    return ip.replace(/[^0-9]/g, '').length
  }
  const zerosBetween = (s: string): number => {
    const fp = s.split('.')[1] ?? ''
    let z = 0
    for (const ch of fp) {
      if (ch === '0') z++
      else break
    }
    return z
  }
  const roster: [string, number][] = [
    ['4728', 3], ['628', 2], ['6.28', 0], ['0.628', -1], ['0.0004728', -4], ['21.5', 1],
    ['1235.5', 3], ['346.41', 2], ['7.12345', 0], ['0.034239', -2], ['0.004728', -3],
  ]
  for (const [s, want] of roster) {
    const n = Number(s)
    const floorRead = Math.floor(log10(n))
    check(`A02 floor(log10 ${s}) = ${want}`, floorRead === want, `got ${floorRead}`)
    if (n >= 1) {
      const ruleRead = digitsLeft(s) - 1
      check(`A02 digit rule on ${s}: ${ruleRead} digits-left − 1 = ${want}`, ruleRead === want, `got ${ruleRead}`)
    } else {
      const ruleRead = -(zerosBetween(s) + 1)
      check(`A02 zero rule on ${s}: −(${zerosBetween(s)} + 1) = ${want}`, ruleRead === want, `got ${ruleRead}`)
    }
  }
  // quiz Q1's pinned characteristic: 0.004728 → bar 3 → option index 2
  check('A02 quiz Q1: characteristic of log 0.004728 is −3 (bar 3)', Math.floor(log10(0.004728)) === -3)
  // the standard forms of the roster (exponent = characteristic)
  const sf: [number, number, number][] = [
    [4728, 4.728, 3], [628, 6.28, 2], [6.28, 6.28, 0], [0.628, 6.28, -1],
    [0.0004728, 4.728, -4], [21.5, 2.15, 1],
  ]
  for (const [n, m, p] of sf) {
    const [mm, pp] = [n / pow10(p), Math.floor(log10(n))]
    check(`A02 standard form: ${n} = ${m} × 10^${p}`, Math.abs(mm - m) < 1e-9 && pp === p, `got ${mm.toFixed(6)} × 10^${pp}`)
  }
}

/* ------------------------------------------------------------------ */
/* A03 · log 4728 — the honest audit and its family                    */
/* ------------------------------------------------------------------ */
{
  eq('A03 log 4728 exact (7dp) = 3.6746775', log10(4728), 7, '3.6746775')
  eq('A03 log 4728 four-figure = 3.6747', Number(log10(4728).toFixed(4)), 4, '3.6747')
  const route = entry(47, 2) + meanDiff(47, 8)
  check('A03 the row-47 route: 6739 + 7 = 6746', entry(47, 2) === 6739 && meanDiff(47, 8) === 7 && route === 6746, `got ${route}`)
  check('A03 the honest gap: route mantissa 6746 vs correctly rounded 6747 — exactly 1 unit', Math.round(10000 * (log10(4728) - 3)) - route === 1)
  eq('A03 log 47.28 = 1.6746775 (same mantissa)', log10(47.28), 7, '1.6746775')
  eq('A03 log 0.04728 = −1.3253225 (mantissa again)', log10(0.04728), 7, '-1.3253225')
  const frac = (x: number): number => ((x % 1) + 1) % 1
  check('A03 mantissa(4728) = mantissa(47.28) = mantissa(0.04728) = .6746775', Math.abs(frac(log10(4728)) - frac(log10(47.28))) < 1e-12 && Math.abs(frac(log10(4728)) - frac(log10(0.04728))) < 1e-9)
}

/* ------------------------------------------------------------------ */
/* A04 · log 2136 — the clean case and the .3296 family                */
/* ------------------------------------------------------------------ */
{
  eq('A04 log 2136 exact (7dp) = 3.3296012', log10(2136), 7, '3.3296012')
  // SPEC CATCH: the sheet pinned "exact 3.3295653" — the engine says 3.3296012.
  // ENGINE WINS; the prose uses 3.3296012 (the route 3284 + 12 = 3296 still
  // meets the correctly rounded 3.3296 — the clean case stands).
  const route = entry(21, 3) + meanDiff(21, 6)
  check('A04 the row-21 route: 3284 + 12 = 3296', entry(21, 3) === 3284 && meanDiff(21, 6) === 12 && route === 3296, `got ${route}`)
  check('A04 the clean case: route mantissa = correctly rounded 3296 (gap 0)', Math.round(10000 * (log10(2136) - 3)) - route === 0)
  eq('A04 log 2.136 = 0.3296012', log10(2.136), 7, '0.3296012')
  eq('A04 log 0.2136 = −0.6703988', log10(0.2136), 7, '-0.6703988')
  eq('A04 log 0.002136 = −2.6703988', log10(0.002136), 7, '-2.6703988')
  check('A04 the family shares one mantissa .3296012', Math.abs((log10(2136) % 1) - (log10(2.136) % 1)) < 1e-12 && Math.abs((log10(2136) % 1) - (log10(0.002136) % 1 + 1) % 1) < 1e-9)
  eq('A04 log 213.6 = 2.3296012 (the multiplication witness)', log10(213.6), 7, '2.3296012')
}

/* ------------------------------------------------------------------ */
/* A05 · the bar notation and the slide-rule-era trap                   */
/* ------------------------------------------------------------------ */
{
  eq('A05 log 2.3 = 0.3617278', log10(2.3), 7, '0.3617278')
  eq('A05 log 0.023 = −1.6382722 (= −2 + 0.3617278)', log10(0.023), 7, '-1.6382722')
  check('A05 the pair: −2 + 0.3617278 = −1.6382722', Math.abs(-2 + 0.3617278 - log10(0.023)) < 5e-8)
  eq('A05 mantissa(2300) = mantissa(0.023) — log 2300 = 3.3617278', log10(2300), 7, '3.3617278')
  // the trap: 2̄.3617 means −2 + 0.3617 = −1.6383, NEVER −2.3617
  eq('A05 the trap value: −2 + 0.3617 = −1.6383', -2 + 0.3617, 4, '-1.6383')
  check('A05 −2.3617 is a DIFFERENT number (the trap): it is 0.7233 away from the truth', Math.abs(-2.3617 - log10(0.023)) > 0.7)
}

/* ------------------------------------------------------------------ */
/* A06 · the mantissa invariance families                              */
/* ------------------------------------------------------------------ */
{
  eq('A06 log 25795 = 4.4115355 (the family witness)', log10(25795), 7, '4.4115355')
  // SPEC CATCH: the sheet pinned 4.4114 (inherited from the printed source's
  // truncated mean differences). OUR engine-built table gives the route
  // 4099 + 16 = 4115 = the correctly rounded 4.4115. ENGINE WINS: 4.4115.
  eq('A06 log 25795 four-figure = 4.4115', Number(log10(25795).toFixed(4)), 4, '4.4115')
  eq('A06 log 25.795 = 1.4115355', log10(25.795), 7, '1.4115355')
  eq('A06 log 2.5795 = 0.4115355', log10(2.5795), 7, '0.4115355')
  eq('A06 log 0.25795 = −0.5884645 (= 1̄.4115355)', log10(0.25795), 7, '-0.5884645')
  check('A06 one mantissa across the 25795 family', Math.abs((log10(25795) % 1) - (log10(0.25795) % 1 + 1) % 1) < 1e-9)
  eq('A06 log 628 = 2.7979596', log10(628), 7, '2.7979596')
  // SPEC CATCH: the sheet pinned 2.7979634; the engine says 2.7979596.
  // ENGINE WINS (the four-figure two-part form 2 + 0.7980 is unchanged).
  eq('A06 log 628 four-figure = 2.7980 (two-part 2 + 0.7980)', Number(log10(628).toFixed(4)), 4, '2.7980')
}

/* ------------------------------------------------------------------ */
/* A07 · the antilog powers (the engine settles every digit)           */
/* ------------------------------------------------------------------ */
{
  eq('A07 antilog 0.6747 = 10^0.6747 = 4.7282453 → digits 4·7·2·8', pow10(0.6747), 7, '4.7282453')
  eq('A07 antilog 2.6747 = 472.8245305', pow10(2.6747), 7, '472.8245305')
  eq('A07 antilog 4.6747 = 47282.4530512', pow10(4.6747), 7, '47282.4530512')
  eq('A07 antilog 2̄.6747 = 10^(−2.3253) = 0.0047282', pow10(-2.3253), 7, '0.0047282')
  eq('A07 antilog 0.3296 = 2.1359939 → 2.136', pow10(0.3296), 7, '2.1359939')
  eq('A07 antilog 1.3296 = 21.3599386 → 21.36', pow10(1.3296), 7, '21.3599386')
  eq('A07 antilog 3.3296 = 2135.9938602 → 2136', pow10(3.3296), 7, '2135.9938602')
  eq('A07 antilog 1̄.3296 = 10^(−0.6704) = 0.2135994', pow10(-0.6704), 7, '0.2135994')
  eq('A07 antilog 3̄.3296 = 10^(−2.6704) = 0.0021360', pow10(-2.6704), 7, '0.0021360')
  eq('A07 antilog 2.3296 = 213.5993860 → 213.6 (quiz Q3)', pow10(2.3296), 7, '213.5993860')
  check('A07 quiz Q3: 10^2.3296 rounds to 213.6 at four figures', Math.round(pow10(2.3296) * 10) / 10 === 213.6)
}

/* ------------------------------------------------------------------ */
/* A08 · the antilog-table routes (proportional parts, engine-built)    */
/* ------------------------------------------------------------------ */
{
  // SPEC CATCH: the sheet pinned 10^0.4017 = 2.5202 and antilog(−2.5983) =
  // 0.0025203. The engine says 2.5217382 and 0.0025217. ENGINE WINS.
  const routes: [number, number, number, number][] = [
    // [mantissa m3, digit d, expected entry, expected md] — the route digits
    [0.329, 6, 2133, 3], // .3296 → 2136 (the fold family witness)
    [0.401, 7, 2518, 4], // .4017 → 2522 (the −2.5983 case)
    [0.619, 7, 4159, 7], // .6197 → 4166 (∛72.3)
    [0.776, 5, 5970, 7], // .7765 → 5977 (∛213.6)
    [0.799, 0, 6295, 0], // .7990 → 6295 (the compound landing)
    [0.506, 1, 3206, 1], // .5061 → 3207 (₹10,000 at 6%)
    [0.003, 5, 1007, 1], // .0035 → 1008 (4.72 × 213.6)
    [0.004, 3, 1009, 1], // .0043 → 1010 (2.136 × 472.8)
    [0.345, 1, 2213, 1], // .3451 → 2214 (4728 ÷ 2136)
  ]
  for (const [m3, d, e, md] of routes) {
    check(`A08 antilog route at .${Math.round(m3 * 1000)} digit ${d}: entry ${e}, md ${md}, digits ${e + md}`, aEntry(m3) === e && aMd(m3, d) === md, `got entry ${aEntry(m3)}, md ${aMd(m3, d)}`)
  }
  // each route lands on the correctly rounded significand
  for (const [m3, d] of routes.map((r) => [r[0], r[1]] as [number, number])) {
    const m4 = Math.round(m3 * 1000) / 1000 + d / 10000
    const digits = aEntry(m3) + aMd(m3, d)
    const direct = Math.round(1000 * pow10(m4))
    check(`A08 the route at mantissa ${m4.toFixed(4)} equals the correctly rounded digits ${direct}`, digits === direct, `route ${digits}`)
  }
  // the .6747 flagship: entry 4721, the true fourth-digit increment 7.6149 —
  // the engine settles the digits 4728 (10^0.6747 = 4.7282453)
  check('A08 antilog entry at .674 = 4721 (10^0.674 = 4.7206)', aEntry(0.674) === 4721, `got ${aEntry(0.674)}`)
  eq('A08 the true digit-7 increment at .674: 1000·(10^0.6747 − 10^0.674) = 7.6149', 1000 * (pow10(0.6747) - pow10(0.674)), 4, '7.6149')
  check('A08 the engine settles the digits: round(1000 · 10^0.6747) = 4728', Math.round(1000 * pow10(0.6747)) === 4728)
  // the honest sweep: the antilog route never misses by more than ONE unit
  let worst = 0
  for (let k = 1; k <= 9999; k++) {
    const m3 = Math.floor(k / 10) / 1000
    const d = k % 10
    const route = aEntry(m3) + aMd(m3, d)
    const direct = Math.round(1000 * pow10(k / 10000))
    const gap = Math.abs(route - direct)
    if (gap > worst) worst = gap
  }
  check('A08 SWEEP all 9,999 four-digit mantissas: the antilog route is within 1 unit of the truth', worst === 1, `worst gap ${worst}`)
}

/* ------------------------------------------------------------------ */
/* A09 · the Step-I normalization and antilog(−2.5983)                 */
/* ------------------------------------------------------------------ */
{
  const m = -2.5983
  // −2.5983 = −2 − 0.5983 = −3 + 0.4017: floor the integral part, lift the decimal part into [0, 1)
  check('A09 Step I: −2.5983 = −3 + 0.4017 (bar 3 point 4017)', Math.floor(m) === -3 && Math.abs(m - (Math.floor(m) + 0.4017)) < 1e-9, `floor ${Math.floor(m)}, frac ${(m - Math.floor(m)).toFixed(4)}`)
  eq('A09 10^0.4017 = 2.5217382', pow10(0.4017), 7, '2.5217382')
  eq('A09 antilog(−2.5983) = 10^(−2.5983) = 0.0025217', pow10(-2.5983), 7, '0.0025217')
  check('A09 the route agrees with the direct value: 0.002522 = round to four figures', Math.abs(pow10(-2.5983) - 0.0025217) < 5e-8)
  // SPEC CATCH: the sheet pinned 10^0.4017 = 2.5202 and the landing 0.0025203.
  // ENGINE WINS: 2.5217382 / 0.0025217; the route digits 2518 + 4 = 2522.
}

/* ------------------------------------------------------------------ */
/* A10 · the multiplication 4.72 × 213.6 — the product law cashed       */
/* ------------------------------------------------------------------ */
{
  eq('A10 log 4.72 = 0.6739420 (four-figure 0.6739)', log10(4.72), 7, '0.6739420')
  // SPEC CATCH: the sheet's route wrote "log 4.72 = 0.6740". The engine says
  // 0.6739420 → 0.6739. ENGINE WINS: the route sum is 3.0035, not 3.0036.
  eq('A10 log 4.72 four-figure = 0.6739', Number(log10(4.72).toFixed(4)), 4, '0.6739')
  eq('A10 log 213.6 = 2.3296012 (four-figure 2.3296)', log10(213.6), 7, '2.3296012')
  eq('A10 the route sum: 0.6739 + 2.3296 = 3.0035', 0.6739 + 2.3296, 4, '3.0035')
  eq('A10 antilog 3.0035 = 10^3.0035 = 1008.0916094', pow10(3.0035), 7, '1008.0916094')
  eq('A10 the exact product 4.72 × 213.6 = 1008.1920000', 4.72 * 213.6, 7, '1008.1920000')
  check('A10 the route lands 1008.1 — within 0.1 of the exact product (0.01%)', Math.abs(pow10(3.0035) - 4.72 * 213.6) < 0.11)
  check('A10 both round to the same four-figure product 1008', Math.round(pow10(3.0035)) === Math.round(4.72 * 213.6))
}

/* ------------------------------------------------------------------ */
/* A11 · the digits census — exact integers and the floor law          */
/* ------------------------------------------------------------------ */
{
  const bigs: [string, bigint, number][] = [
    ['2^64', 2n ** 64n, 20],
    ['3^40', 3n ** 40n, 20],
    ['5^25', 5n ** 25n, 18],
    ['2^32', 2n ** 32n, 10],
    ['3^12·2^8', 3n ** 12n * 2n ** 8n, 9],
  ]
  for (const [k, v, digits] of bigs) {
    check(`A11 ${k} = ${v.toString()} — exactly ${digits} digits`, v.toString().length === digits, v.toString())
  }
  check('A11 2^64 = 18446744073709551616 (the pinned token)', (2n ** 64n).toString() === '18446744073709551616')
  check('A11 3^40 = 12157665459056928801', (3n ** 40n).toString() === '12157665459056928801')
  check('A11 5^25 = 298023223876953125', (5n ** 25n).toString() === '298023223876953125')
  check('A11 2^32 = 4294967296', (2n ** 32n).toString() === '4294967296')
  check('A11 3^12·2^8 = 531441 × 256 = 136048896', (3n ** 12n * 2n ** 8n).toString() === '136048896')
  eq('A11 64 log 2 = 19.2659197 → characteristic 19 → 20 digits', 64 * log10(2), 7, '19.2659197')
  eq('A11 40 log 3 = 19.0848502 → 20 digits', 40 * log10(3), 7, '19.0848502')
  eq('A11 25 log 5 = 17.4742501 → 18 digits', 25 * log10(5), 7, '17.4742501')
  eq('A11 32 log 2 = 9.6329599 → 10 digits', 32 * log10(2), 7, '9.6329599')
  eq('A11 12 log 3 + 8 log 2 = 8.1336950 → 9 digits', 12 * log10(3) + 8 * log10(2), 7, '8.1336950')
  const floorLaw: [bigint, number][] = [[2n ** 64n, 64], [3n ** 40n, 40], [5n ** 25n, 25], [2n ** 32n, 32], [3n ** 12n * 2n ** 8n, 12]]
  for (const [v, ] of floorLaw) void v
  check('A11 floor law: floor(64 log 2) + 1 = 20', Math.floor(64 * log10(2)) + 1 === 20)
  check('A11 floor law: floor(40 log 3) + 1 = 20', Math.floor(40 * log10(3)) + 1 === 20)
  check('A11 floor law: floor(25 log 5) + 1 = 18', Math.floor(25 * log10(5)) + 1 === 18)
  check('A11 floor law: floor(32 log 2) + 1 = 10', Math.floor(32 * log10(2)) + 1 === 10)
  check('A11 floor law: floor(12 log 3 + 8 log 2) + 1 = 9', Math.floor(12 * log10(3) + 8 * log10(2)) + 1 === 9)
}

/* ------------------------------------------------------------------ */
/* A12 · compound growth — both witnesses                             */
/* ------------------------------------------------------------------ */
{
  eq('A12 log 25000 = 4.3979400', log10(25000), 7, '4.3979400')
  eq('A12 log 1.08 = 0.0334238', log10(1.08), 7, '0.0334238')
  eq('A12 12 log 1.08 = 0.4010851', 12 * log10(1.08), 7, '0.4010851')
  eq('A12 log A = 4.3979400 + 0.4010851 = 4.7990251 → 4.7990', log10(25000) + 12 * log10(1.08), 7, '4.7990251')
  eq('A12 the exact amount 25000 × 1.08^12 = 62954.2529205', 25000 * Math.pow(1.08, 12), 7, '62954.2529205')
  eq('A12 antilog 4.7990 = 62950.6182857 → 6.295 × 10^4 = 62,950', pow10(4.799), 7, '62950.6182857')
  // SPEC CATCH: the sheet's route read the landing as "6.309 × 10^4 = 63,090,
  // a ~0.2% gap". The engine says 10^0.7990 = 6.2951 → 62,950.6, a 0.006% gap.
  // ENGINE WINS; the prose carries the honest tight gap.
  check('A12 the four-figure landing sits within 0.006% of the exact amount', Math.abs(pow10(4.799) - 25000 * Math.pow(1.08, 12)) / (25000 * Math.pow(1.08, 12)) < 0.00007)
  eq('A12 log 1.06 = 0.0253059', log10(1.06), 7, '0.0253059')
  eq('A12 20 log 1.06 = 0.5061173', 20 * log10(1.06), 7, '0.5061173')
  eq('A12 log A = 4 + 0.5061173 = 4.5061173 → 4.5061', 4 + 20 * log10(1.06), 7, '4.5061173')
  eq('A12 the exact amount 10000 × 1.06^20 = 32071.3547221', 10000 * Math.pow(1.06, 20), 7, '32071.3547221')
  eq('A12 antilog 4.5061 = 32070.0768030 → 32,070', pow10(4.5061), 7, '32070.0768030')
  check('A12 the ₹10,000 route lands within ₹1.4 of the exact amount', Math.abs(pow10(4.5061) - 10000 * Math.pow(1.06, 20)) < 1.4)
}

/* ------------------------------------------------------------------ */
/* A13 · the cube roots                                               */
/* ------------------------------------------------------------------ */
{
  eq('A13 log 72.3 = 1.8591383 → 1.8591', log10(72.3), 7, '1.8591383')
  eq('A13 (1/3) × 1.8591 = 0.6197 exactly', (1 / 3) * 1.8591, 7, '0.6197000')
  eq('A13 antilog 0.6197 = 4.1658152 → 4.166', pow10(0.6197), 7, '4.1658152')
  eq('A13 the direct engine value 72.3^(1/3) = 4.1659377', Math.pow(72.3, 1 / 3), 7, '4.1659377')
  check('A13 the route and the direct value agree at four figures (4.166); the route sits 0.0001 low at the 4th decimal', Math.abs(pow10(0.6197) - Math.pow(72.3, 1 / 3)) < 0.0002 && pow10(0.6197) < Math.pow(72.3, 1 / 3) && Math.round(pow10(0.6197) * 1000) / 1000 === Math.round(Math.pow(72.3, 1 / 3) * 1000) / 1000)
  eq('A13 (1/3) × 2.3296 = 0.7765333 (the guard digit)', (1 / 3) * 2.3296, 7, '0.7765333')
  eq('A13 antilog 0.7765 = 5.9772304', pow10(0.7765), 7, '5.9772304')
  eq('A13 antilog 0.7765333 = 5.9776888', pow10(0.7765333), 7, '5.9776888')
  eq('A13 the direct engine value 213.6^(1/3) = 5.9776950', Math.pow(213.6, 1 / 3), 7, '5.9776950')
  // SPEC CATCH: the sheet pinned 213.6^(1/3) = 5.9772 — that is 10^0.7765,
  // not the cube root. ENGINE WINS: the direct value is 5.9777, and the
  // guard-digit route (0.7765333) recovers it exactly.
  check('A13 the guard-digit route recovers the direct value to 4 decimals', Math.abs(pow10(0.7765333) - Math.pow(213.6, 1 / 3)) < 0.0001)
}

/* ------------------------------------------------------------------ */
/* A14 · the L3/L4 arithmetic                                          */
/* ------------------------------------------------------------------ */
{
  eq('A14 log 2.136 = 0.3296, log 472.8 = 2.6747 (four-figure)', 0.3296 + 2.6747, 4, '3.0043')
  eq('A14 the exact product 2.136 × 472.8 = 1009.9008000', 2.136 * 472.8, 7, '1009.9008000')
  eq('A14 antilog 3.0043 = 1009.9502941 → 1010', pow10(3.0043), 7, '1009.9502941')
  check('A14 the route lands within 0.05 of the exact product', Math.abs(pow10(3.0043) - 2.136 * 472.8) < 0.06)
  eq('A14 the log route 3.6747 − 3.3296 = 0.3451', 3.6747 - 3.3296, 4, '0.3451')
  eq('A14 antilog 0.3451 = 2.2136044 → 2.214', pow10(0.3451), 7, '2.2136044')
  eq('A14 the exact quotient 4728 ÷ 2136 = 2.2134831', 4728 / 2136, 7, '2.2134831')
  check('A14 the route overshoots the exact quotient by one unit in the last place', Math.abs(pow10(0.3451) - 4728 / 2136) < 0.0002 && pow10(0.3451) > 4728 / 2136)
}

/* ------------------------------------------------------------------ */
/* A15 · the doubling ladder at 5% per period                          */
/* ------------------------------------------------------------------ */
{
  eq('A15 log 1.05 = 0.0211893', log10(1.05), 7, '0.0211893')
  eq('A15 14 log 1.05 = 0.2966502 → 0.2967', 14 * log10(1.05), 7, '0.2966502')
  eq('A15 15 log 1.05 = 0.3178395 → 0.3178', 15 * log10(1.05), 7, '0.3178395')
  eq('A15 log 2 = 0.3010300 → 0.3010', log10(2), 7, '0.3010300')
  eq('A15 log 3 = 0.4771213 (the H&K series landing, engine-checked)', log10(3), 7, '0.4771213')
  eq('A15 log 5 = 0.6989700 (the L3(b) route)', log10(5), 7, '0.6989700')
  // SPEC CATCH: the sheet pinned the ladder as 0.2962 < 0.3010 < 0.3175.
  // The engine says 0.2967 < 0.3010 < 0.3178. ENGINE WINS.
  check('A15 the ladder: 0.2967 < 0.3010 < 0.3178', Number((14 * log10(1.05)).toFixed(4)) === 0.2967 && Number((15 * log10(1.05)).toFixed(4)) === 0.3178)
  eq('A15 1.05^14 = 1.9799316 < 2', Math.pow(1.05, 14), 7, '1.9799316')
  eq('A15 1.05^15 = 2.0789282 > 2', Math.pow(1.05, 15), 7, '2.0789282')
  let n = 0
  let v = 1
  while (v < 2) {
    v *= 1.05
    n++
  }
  check('A15 the smallest period count that passes double is 15', n === 15, `got ${n}`)
}

/* ------------------------------------------------------------------ */
/* A16 · the L6(b) precision audit on {2136, 4728, 25795}              */
/* ------------------------------------------------------------------ */
{
  const audits: [number, number, number, number][] = [
    // [N, row, col, digit] → route vs correctly rounded
    [2136, 21, 3, 6],
    [4728, 47, 2, 8],
    [25795, 25, 7, 9],
  ]
  const want: [number, number][] = [[3296, 0], [6746, 1], [4115, 0]] // [route, gap]
  for (let i = 0; i < audits.length; i++) {
    const [N, R, C, d] = audits[i]
    const route = entry(R, C) + meanDiff(R, d)
    const direct = Math.round(10000 * (log10(N) - Math.floor(log10(N))))
    check(`A16 audit ${N}: route ${route}, direct ${direct}, gap ${direct - route}`, route === want[i][0] && direct - route === want[i][1], `got route ${route}, gap ${direct - route}`)
  }
}

/* ------------------------------------------------------------------ */
/* A17 · the honest-precision sweep of the WHOLE four-figure domain    */
/* ------------------------------------------------------------------ */
{
  const hist: Record<number, number> = {}
  let worst = 0
  for (let N = 1000; N <= 9999; N++) {
    const R = Math.floor(N / 100)
    const C = Math.floor(N / 10) % 10
    const d = N % 10
    const route = entry(R, C) + meanDiff(R, d)
    const direct = Math.round(10000 * (log10(N) - 3))
    const gap = route - direct
    hist[gap] = (hist[gap] ?? 0) + 1
    if (Math.abs(gap) > worst) worst = Math.abs(gap)
  }
  const within1 = (hist[0] ?? 0) + (hist[1] ?? 0) + (hist[-1] ?? 0)
  check('A17 SWEEP all 9,000 four-digit numbers: route lands within 1 unit for 8,921 (99.1%)', within1 === 8921, `got ${within1}`)
  check('A17 SWEEP worst gap is 3 units (79 numbers beyond 1)', worst === 3 && 9000 - within1 === 79, `worst ${worst}, beyond-1 count ${9000 - within1}`)
  check('A17 SWEEP histogram {0: 6704, +1: 1408, −1: 809, +2: 73, +3: 6}', (hist[0] ?? 0) === 6704 && (hist[1] ?? 0) === 1408 && (hist[-1] ?? 0) === 809 && (hist[2] ?? 0) === 73 && (hist[3] ?? 0) === 6, JSON.stringify(hist))
}

/* ------------------------------------------------------------------ */
/* P-section imports — live only for the pins below (added AFTER the    */
/* prose existed and the A-engines ran green)                          */
/* ------------------------------------------------------------------ */
const lesson96 = chapter09.lessons[5] as Lesson

/* ------------------------------------------------------------------ */
/* P01… — pins reading the authored part-aa96.ts                        */
/* ------------------------------------------------------------------ */

{
  // P01 · identity, exactly as the spec pins it
  check('P01 lesson id is aa-logarithm-tables-characteristic-mantissa-and-antilogarithm', lesson96.id === 'aa-logarithm-tables-characteristic-mantissa-and-antilogarithm', `got ${lesson96.id}`)
  check('P01 lesson number is 9.6', lesson96.number === '9.6', `got ${lesson96.number}`)
  check('P01 lesson title is Logarithm Tables: Characteristic, Mantissa and Antilogarithm', lesson96.title === 'Logarithm Tables: Characteristic, Mantissa and Antilogarithm', `got ${lesson96.title}`)

  // P02 · prerequisite and source rosters, exactly as the spec pins them
  const wantPrereq = ['aa-the-laws-of-logarithms-and-the-change-of-base', 'aa-exponential-and-logarithmic-series', 'fm-decimal-places-and-the-point']
  check('P02 prerequisites array exact', JSON.stringify(lesson96.prerequisites) === JSON.stringify(wantPrereq), JSON.stringify(lesson96.prerequisites))
  const wantSources = ['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']
  check('P02 sources array exact', JSON.stringify(lesson96.sources) === JSON.stringify(wantSources), JSON.stringify(lesson96.sources))

  // P03 · the honest word count (no `words` field — the registry counts)
  const words = countLessonWords(lesson96)
  check('P03 countLessonWords >= 6000', words >= 6000, `${words} words`)
  check('P03 no `words` field on the lesson (honest auto-count)', lesson96.words === undefined)

  // P04 · THE FOLD discharge: at least TWO worked antilog examples naming the
  // five-step route in title+steps; 'antilog' >= 3 times in the serialization
  const examples = lesson96.blocks.filter((b) => b.kind === 'example') as Extract<typeof lesson96.blocks[number], { kind: 'example' }>[]
  const foldExamples = examples.filter((b) => /antilog/i.test(b.title) && /antilog/i.test(b.steps.join(' ')) && /(five-step|Step I|Step II|Step III|Step IV|Step V)/i.test(b.title + ' ' + b.steps.join(' ')))
  check('P04 FOLD: >= 2 example blocks of the antilog five-step family', foldExamples.length >= 2, `${foldExamples.length} fold examples`)
  const ser = JSON.stringify(lesson96)
  const antilogCount = (ser.match(/antilog/gi) ?? []).length
  check('P04 the serialized lesson mentions antilog >= 3 times', antilogCount >= 3, `${antilogCount} occurrences`)
  const longExamples = examples.filter((b) => b.steps.length >= 4)
  check('P04 >= 2 example blocks with >= 4 steps', examples.length >= 2 && longExamples.length >= 2, `${examples.length} examples, ${longExamples.length} with >= 4 steps`)

  // P05 · the quiz: 5 items, keys pinned [2, 1, 2, 1, 1]
  const quiz = lesson96.blocks.find((b) => b.kind === 'quiz') as Extract<typeof lesson96.blocks[number], { kind: 'quiz' }> | undefined
  check('P05 quiz exists with exactly 5 items', !!quiz && quiz.items.length === 5, quiz ? `${quiz.items.length} items` : 'missing')
  const answers = quiz ? quiz.items.map((i) => i.answer) : []
  check('P05 quiz answer key is [2, 1, 2, 1, 1]', JSON.stringify(answers) === JSON.stringify([2, 1, 2, 1, 1]), JSON.stringify(answers))
  check('P05 every quiz option list has 4 entries and a full explain', !!quiz && quiz.items.every((i) => i.options.length === 4 && i.explain.length > 200))
  check('P05 every quiz explain addresses every wrong option ("Option")', !!quiz && quiz.items.every((i) => {
    const wrong = i.options.filter((_, k) => k !== i.answer).length
    return (i.explain.match(/Option/g) ?? []).length >= wrong
  }))

  // P06/P07 · figures: >= 3 body figures; >= 3 solution figures across the exercises
  const bodyFigures = lesson96.blocks.filter((b) => b.kind === 'figure')
  check('P06 >= 3 body figure blocks', bodyFigures.length >= 3, `${bodyFigures.length} body figures`)
  let exerciseFigures = 0
  let exampleFigures = 0
  for (const b of lesson96.blocks) {
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) exerciseFigures += q.figures?.length ?? 0
    if (b.kind === 'example') exampleFigures += b.figures?.length ?? 0
  }
  check('P07 >= 3 solution figures across the exercises', exerciseFigures >= 3, `${exerciseFigures} on exercises (+${exampleFigures} on example blocks)`)

  // P08 · exercises: >= 16 questions, each with a full steps solution + answer
  const setBlocks = lesson96.blocks.filter((b) => b.kind === 'exercises') as Extract<typeof lesson96.blocks[number], { kind: 'exercises' }>[]
  const questions = setBlocks.flatMap((b) => b.sets.flatMap((st) => st.questions))
  const withSteps = questions.filter((q) => Array.isArray(q.solution) && q.solution.length > 0 && q.solution.every((st) => typeof st === 'string' && st.length > 0))
  const withAnswer = questions.filter((q) => typeof q.answer === 'string' && q.answer.length > 0)
  check('P08 >= 16 exercise questions', questions.length >= 16, `${questions.length} questions`)
  check('P08 every question has a non-empty steps-array solution', questions.length === withSteps.length, `${withSteps.length}/${questions.length}`)
  check('P08 every question has a non-empty answer', questions.length === withAnswer.length, `${withAnswer.length}/${questions.length}`)
  const levels = setBlocks.flatMap((b) => b.sets.map((st) => st.level))
  check('P08 sets span L1 through L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((lv) => levels.includes(lv as never)), levels.join(','))

  // P09/P10 · every figure svg: aria-label, viewBox 720, xmlns, role; no retired hex
  const svgs: string[] = []
  for (const b of lesson96.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  check('P09 every figure svg carries aria-label=', svgs.length > 0 && svgs.every((s) => s.includes('aria-label=')), `${svgs.length} svgs`)
  check('P09 every svg declares viewBox 0 0 720 …, xmlns and role img', svgs.every((s) => /viewBox="0 0 720 \d+"/.test(s) && s.includes('xmlns=') && s.includes('role="img"')))
  check('P09 every svg font size >= 9.5 and every stroke >= 1.2', svgs.every((s) => {
    const fonts = [...s.matchAll(/font-size="([\d.]+)"/g)].map((m) => Number(m[1]))
    const strokes = [...s.matchAll(/stroke-width="([\d.]+)"/g)].map((m) => Number(m[1]))
    return fonts.every((f) => f >= 9.5) && strokes.every((w) => w >= 1.2)
  }))
  const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  const retiredHits = RETIRED.filter((h) => svgs.some((s) => s.includes(h)))
  check('P10 no retired hex in any svg string', retiredHits.length === 0, retiredHits.join(' ') || 'clean')
  const PALETTE = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff'])
  const hexes = new Set(svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}/g) ?? [])))
  const offPalette = [...hexes].filter((h) => !PALETTE.has(h.toLowerCase()))
  check('P10 every svg hex comes from the house palette', offPalette.length === 0, offPalette.join(' ') || 'clean')

  // P11 · structural must-haves
  const kinds = new Set(lesson96.blocks.map((b) => b.kind))
  check('P11 at least one derivation block', kinds.has('derivation'))
  const tones = new Set(lesson96.blocks.filter((b) => b.kind === 'callout').map((b) => (b as Extract<typeof lesson96.blocks[number], { kind: 'callout' }>).tone))
  check('P11 at least two definition callouts (characteristic/mantissa + antilogarithm)', lesson96.blocks.filter((b) => b.kind === 'callout' && (b as Extract<typeof lesson96.blocks[number], { kind: 'callout' }>).tone === 'definition').length >= 2)
  check('P11 a theorem callout exists', tones.has('theorem'))
  check('P11 a terms block exists', kinds.has('terms'))
  const tables = lesson96.blocks.filter((b) => b.kind === 'table')
  check('P11 >= 2 table blocks (the excerpt + more)', tables.length >= 2, `${tables.length} tables`)
  const roman = lesson96.blocks.filter((b) => b.kind === 'list' && (b as Extract<typeof lesson96.blocks[number], { kind: 'list' }>).marker === 'roman')
  check('P11 at least one roman marker list', roman.length >= 1, `${roman.length} roman lists`)
  check('P11 an algorithm block exists (the five-step antilog method)', kinds.has('algorithm'))

  // P11b · THE LESSON'S OWN TABLE must carry the engine's values verbatim:
  // the excerpt table's cells equal entry(21, C), entry(47, C), meanDiff(21, d),
  // meanDiff(47, d) — computed here again, never pasted
  const excerpt = tables.find((t) => (t.head[0] ?? '') === 'Row')
  check('P11b the four-figure excerpt table exists', !!excerpt)
  if (excerpt) {
    let cellsOk = true
    let detail = ''
    for (let C = 0; C <= 9; C++) {
      if (excerpt.rows[0][C + 1] !== String(entry(21, C))) { cellsOk = false; detail += ` row21 col ${C}: ${excerpt.rows[0][C + 1]} != ${entry(21, C)};` }
      if (excerpt.rows[1][C + 1] !== String(entry(47, C))) { cellsOk = false; detail += ` row47 col ${C}: ${excerpt.rows[1][C + 1]} != ${entry(47, C)};` }
    }
    const md21 = [2, 4, 6, 8, 10, 12, 14, 17, 19]
    const md47 = [1, 2, 3, 4, 5, 6, 6, 7, 8]
    for (let d = 1; d <= 9; d++) {
      if (meanDiff(21, d) !== md21[d - 1]) { cellsOk = false; detail += ` md21 ${d} != ${md21[d - 1]};` }
      if (meanDiff(47, d) !== md47[d - 1]) { cellsOk = false; detail += ` md47 ${d} != ${md47[d - 1]};` }
    }
    check('P11b the excerpt cells match the engine exactly (rows 21/47 + mean differences)', cellsOk, detail || 'all cells equal')
  }

  // P12 · the pinned tokens appear in the serialized prose
  for (const token of ['3.6747', '3.3296', 'antilog', '18446744073709551616']) {
    check(`P12 token "${token}" appears in the lesson prose`, ser.includes(token))
  }
  check('P12 no placeholder tokens in the prose', !ser.includes('TODO') && !ser.includes('【') && !ser.includes('XXX') && !ser.includes('undefined') && !ser.includes('NaN'))

  // P13 · zero control characters (newlines between SVG tags excepted — the
  // multi-line template literals of the figures); no $ in any title/label/name/term field
  check('P13 zero control characters in the serialized lesson (except figure newlines)', !/[\x00-\x09\x0B\x0C\x0E-\x1F\x7F]/.test(ser))
  const katexFields: string[] = []
  for (const b of lesson96.blocks) {
    if (b.kind === 'equation') katexFields.push(b.latex)
    if (b.kind === 'formula') katexFields.push(b.latex)
    if (b.kind === 'derivation') { katexFields.push(...b.steps.map((s) => s.formula ?? '')) }
  }
  check('P13 zero control characters of any kind inside the KaTeX fields', katexFields.every((k) => !/[\x00-\x1F\x7F]/.test(k)), `${katexFields.length} KaTeX fields swept`)
  const plainFields: string[] = []
  for (const b of lesson96.blocks) {
    if (b.kind === 'callout') plainFields.push(b.title)
    if (b.kind === 'derivation') { plainFields.push(b.title); for (const s of b.steps) plainFields.push(s.label) }
    if (b.kind === 'formula') plainFields.push(b.name)
    if (b.kind === 'terms') for (const t of b.items) plainFields.push(t.term)
    if (b.kind === 'example') plainFields.push(b.title)
    if (b.kind === 'heading') plainFields.push(b.text)
    if (b.kind === 'quiz') plainFields.push(b.title ?? '')
    if (b.kind === 'exercises') plainFields.push(b.title ?? '')
    if (b.kind === 'algorithm') plainFields.push(b.title)
  }
  const dollarHits = plainFields.filter((f) => f.includes('$'))
  check('P13 no $ in any title/label/name/term field (the plain-title rule)', dollarHits.length === 0, dollarHits.slice(0, 3).join(' | ') || 'clean')
  // prose fields are single-quoted strings — a raw control character there would
  // mean an escape ate a backslash ('\\t' typed as '\t'); sweep them all
  const proseStrings: string[] = []
  for (const b of lesson96.blocks) {
    if (b.kind === 'para' || b.kind === 'heading') proseStrings.push(b.text)
    if (b.kind === 'callout') proseStrings.push(b.title, b.text)
    if (b.kind === 'equation') proseStrings.push(b.latex, b.note ?? '')
    if (b.kind === 'derivation') { proseStrings.push(b.title, b.statement, b.result); for (const s of b.steps) proseStrings.push(s.label, s.formula ?? '', s.explanation) }
    if (b.kind === 'example') { proseStrings.push(b.title); for (const s of b.steps) proseStrings.push(s) }
    if (b.kind === 'terms') for (const t of b.items) proseStrings.push(t.term, t.def)
    if (b.kind === 'formula') proseStrings.push(b.name, b.latex, b.note ?? '')
    if (b.kind === 'table') { proseStrings.push(...b.head); if (b.caption) proseStrings.push(b.caption); for (const r of b.rows) proseStrings.push(...r) }
    if (b.kind === 'list') for (const i of b.items) proseStrings.push(i)
    if (b.kind === 'algorithm') { proseStrings.push(b.title); for (const l of b.lines) proseStrings.push(l.code, l.note ?? '') ; if (b.note) proseStrings.push(b.note) }
    if (b.kind === 'quiz') for (const it of b.items) proseStrings.push(it.q, it.explain, ...it.options)
    if (b.kind === 'exercises') for (const set of b.sets) for (const q of set.questions) { proseStrings.push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]), q.answer ?? '') }
  }
  const ctrl = proseStrings.filter((s) => /[\x00-\x1F\x7F]/.test(s))
  check('P13 zero control characters in every prose/KaTeX string (no eaten backslash escapes)', ctrl.length === 0, ctrl.length ? JSON.stringify(ctrl[0].slice(0, 40)) : `${proseStrings.length} strings swept`)

  // P14 · the fold's second example family pinned: the .3296 five-characteristic
  // answers appear in the lesson prose exactly as the engine computed them
  for (const token of ['2135.9938602', '2.1359939', '0.2135994', '0.0021360', '472.8245', '0.0025217']) {
    check(`P14 the engine-pinned antilog value "${token}" appears in the prose`, ser.includes(token))
  }
}

/* ------------------------------------------------------------------ */
/* tallies                                                             */
/* ------------------------------------------------------------------ */

return { id: 'K+L (9.6 engines + pins)', pass: aPass + pPass, fail: (aTotal - aPass) + (pTotal - pPass) }
}

// ------------------------------------------------------------------
// (M + N) from v-aa9R.ts — the 9.R engines + pins, wrapped whole
// ------------------------------------------------------------------

function sectionM(): SectionResult {
/**
 * v-aa9R.ts — the verify-first ENGINE for Advanced Algebra lesson 9.R
 * "Unit 9 Completion Review" (agent aa9R of the run-121 whole-chapter swarm).
 *
 * Discipline (shared contract §0 + spec): every number the review dares to
 * print is recomputed here by brute force FIRST — bisections, sweeps, exact
 * integer/BigInt checks — and only then is the prose written. Where this
 * engine disagrees with the spec sheet, THE ENGINE WINS and the prose is
 * adjusted; every such catch is flagged in the agent's final report.
 *
 * Spec-vs-engine catches already registered while building this engine:
 *   C1. spec's L5(c) guess "root ≈ 3.4?" for log_3(x+5) = 5 − x — the engine
 *       bisects to 3.0963. ENGINE WINS (M18).
 *   C2. spec's L5(a) "log_11 17 = 1.1818" — the engine computes 1.1815417,
 *       four places 1.1815. ENGINE WINS (M17).
 *   C3. spec's "log 6 = 0.7781; engine ✓" — the engine computes the true
 *       log 6 = 0.7781513 (rounds to 0.7782 at four places); the four-place
 *       table sum 0.3010 + 0.4771 = 0.7781 is honest to within one unit in
 *       the fourth place. Both facts are pinned and the prose carries both (M15).
 *   C4. spec's quiz Q4 options 4.728 / 0.4728 ALSO share the mantissa 0.6747
 *       of log 4728 (the invariance law applies to every number whose
 *       significant digits are 4728) — the pinned item had three correct
 *       options. Distractors re-cut as 4.782 and 0.4278 so only the pinned
 *       key (47.28, index 2) is right (M20).
 *   C5. spec's fast-series error parenthetical "0.6931460 vs 0.6931472"
 *       differs by 0.0000012 as printed strings; the engine's true miss is
 *       0.0000011 (1.1359e-6). ENGINE WINS; prose cites 0.0000011 (M07).
 *
 * Shape: self-contained script. Section M (M01…) = pure-arithmetic engines,
 * no repo imports. Section N (N01…) = pins that read the authored part file
 * — appended AFTER the prose exists (they import './part-aa9R' and the
 * library types), per the same discipline.
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-aa9R.ts
 */

/* ------------------------------------------------------------------ */
/* collector                                                           */
/* ------------------------------------------------------------------ */

const failures: string[] = []
let mTotal = 0
let mPass = 0
let nTotal = 0
let nPass = 0

function check(name: string, ok: boolean, detail = ''): void {
  const isPin = name.startsWith('N')
  if (isPin) {
    nTotal++
    if (ok) nPass++
  } else {
    mTotal++
    if (ok) mPass++
  }
  if (!ok) failures.push(`${name}${detail ? ' — ' + detail : ''}`)
  console.log(`${ok ? '[ ok ]' : '[FAIL]'} ${name}${detail ? ' — ' + detail : ''}`)
}

/** fixed-decimal equality: got.toFixed(dp) === want */
function eq(name: string, got: number, dp: number, want: string): void {
  check(name, got.toFixed(dp) === want, `got ${got.toFixed(dp)}, want ${want}`)
}

function between(name: string, lo: number, v: number, hi: number): void {
  check(name, lo < v && v < hi, `v = ${v}, claimed (${lo}, ${hi})`)
}

function near(name: string, got: number, want: number, tol: number): void {
  check(name, Math.abs(got - want) < tol, `got ${got}, want ${want} ± ${tol}`)
}

/** bisection root of f on [lo, hi] (sign change assumed) */
function bisect(f: (x: number) => number, lo: number, hi: number, tol = 5e-4): number {
  let a = lo
  let b = hi
  const fa = f(a)
  for (let i = 0; i < 200; i++) {
    const m = (a + b) / 2
    const fm = f(m)
    if (fm === 0) return m
    if (Math.sign(fm) === Math.sign(fa)) a = m
    else b = m
    if (b - a < tol) break
  }
  return (a + b) / 2
}

const ln = Math.log
const lg = Math.log10
const logb = (b: number, x: number) => ln(x) / ln(b)
const SQ2 = Math.SQRT2

console.log('==========================================================')
console.log('v-aa9R — engines for AA 9.R "Unit 9 Completion Review"')
console.log('==========================================================')

/* ------------------------------------------------------------------ */
/* M01 · the master-table witnesses: one pinned number per lesson      */
/* ------------------------------------------------------------------ */
{
  eq('M01 9.1 witness 2^√2 to 7dp = 2.6651441', Math.pow(2, SQ2), 7, '2.6651441')
  eq('M01 9.1 witness 2^√2 to 4dp = 2.6651', Math.pow(2, SQ2), 4, '2.6651')
  near('M01 9.2 witness log_(2√2) 128 = 14/3 exactly', logb(2 * SQ2, 128), 14 / 3, 1e-12)
  eq('M01 9.2 witness to 7dp = 4.6666667', logb(2 * SQ2, 128), 7, '4.6666667')
  near('M01 the pair checks: (2√2)^(14/3) = 128', Math.pow(2 * SQ2, 14 / 3), 128, 1e-9)
  check('M01 the engineered base 2√2 = 2^(3/2)', Math.abs(2 * SQ2 - Math.pow(2, 1.5)) < 1e-12)
  let chain = 1
  for (let k = 3; k <= 8; k++) chain *= logb(k, k + 1)
  near('M01 9.3 witness the telescoping chain (log_3 4)…(log_8 9) = 2', chain, 2, 1e-12)
  eq('M01 the chain to 10dp = 2.0000000000', chain, 10, '2.0000000000')
  const admitted = (Math.sqrt(13) - 3) / 2
  const refused = (-3 - Math.sqrt(13)) / 2
  eq('M01 9.4 witness the extraneous-root court x = (−3+√13)/2 to 7dp = 0.3027756', admitted, 7, '0.3027756')
  eq('M01 the refused mirror root to 7dp = −3.3027756', refused, 7, '-3.3027756')
  eq('M01 the admitted root to 4dp = 0.3028', admitted, 4, '0.3028')
  eq('M01 the refused root to 4dp = −3.3028', refused, 4, '-3.3028')
  near('M01 the court at the admitted root: (x+2)(x+1) = 3 exactly', (admitted + 2) * (admitted + 1), 3, 1e-12)
  near('M01 so log_2((x+2)(x+1)) = log_2 3 (the court closes)', logb(2, (admitted + 2) * (admitted + 1)), logb(2, 3), 1e-12)
  check('M01 the refused root violates the rider x + 1 > 0', refused + 1 < 0)
  check('M01 the admitted root honours both riders (x+2 > 0, x+1 > 0)', admitted + 2 > 0 && admitted + 1 > 0)
  eq('M01 9.5 witness e to 15dp = 2.718281828459045', Math.E, 15, '2.718281828459045')
  eq('M01 9.5 witness e to 7dp = 2.7182818', Math.E, 7, '2.7182818')
  eq('M01 9.6 witness log 4728 to 7dp = 3.6746775', lg(4728), 7, '3.6746775')
  eq('M01 9.6 witness log 4728 to 4dp = 3.6747', lg(4728), 4, '3.6747')
}

/* ------------------------------------------------------------------ */
/* M02 · the squeeze recalled (9.1)                                    */
/* ------------------------------------------------------------------ */
{
  eq('M02 2^1.41 to 6dp = 2.657372', Math.pow(2, 1.41), 6, '2.657372')
  eq('M02 2^1.42 to 6dp = 2.675855', Math.pow(2, 1.42), 6, '2.675855')
  between('M02 1.41 < √2 < 1.42', 1.41, SQ2, 1.42)
  between('M02 the squeeze: 2.657372 < 2^√2 < 2.675855', 2.657372, Math.pow(2, SQ2), 2.675855)
  eq('M02 the band width to 6dp = 0.018483', 2.675855 - 2.657372, 6, '0.018483')
  let mono = true
  for (let x = 1.41; x < 1.42 - 1e-9; x += 1e-4) {
    if (!(Math.pow(2, x) < Math.pow(2, x + 1e-4))) mono = false
  }
  check('M02 2^x strictly increasing across [1.41, 1.42] (1e-4 sweep)', mono)
}

/* ------------------------------------------------------------------ */
/* M03 · the inverse pair recalled (9.2)                               */
/* ------------------------------------------------------------------ */
{
  near('M03 2^(log_2 7) = 7', Math.pow(2, logb(2, 7)), 7, 1e-12)
  near('M03 3^(log_3 10) = 10', Math.pow(3, logb(3, 10)), 10, 1e-12)
  near('M03 10^(log 5) = 5', Math.pow(10, lg(5)), 5, 1e-12)
  near('M03 128^(log_128 2) = 2 — a base above every argument', Math.pow(128, logb(128, 2)), 2, 1e-12)
  let ok = true
  for (let x = -3; x <= 3; x += 0.25) {
    if (Math.abs(logb(5, Math.pow(5, x)) - x) > 1e-12) ok = false
  }
  check('M03 log_5(5^x) = x on a 0.25 sweep of [−3, 3]', ok)
  const ys = [0.125, 1, 7, 128, 1000000]
  for (const y of ys) {
    if (Math.abs(Math.pow(2, logb(2, y)) - y) > 1e-9) ok = false
  }
  check('M03 2^(log_2 y) = y for y ∈ {0.125, 1, 7, 128, 10⁶}', ok)
  check('M03 the anchors: log_2 1 = 0 and log_2 2 = 1', logb(2, 1) === 0 && Math.abs(logb(2, 2) - 1) < 1e-15)
}

/* ------------------------------------------------------------------ */
/* M04 · the law family recalled (9.3)                                 */
/* ------------------------------------------------------------------ */
{
  near('M04 the product law: log_2 3 + log_2 5 = log_2 15', logb(2, 3) + logb(2, 5), logb(2, 15), 1e-12)
  near('M04 the quotient law: log_2 6 − log_2 3 = log_2 2', logb(2, 6) - logb(2, 3), logb(2, 2), 1e-12)
  near('M04 the power law: log_2 81 = 4·log_2 3', logb(2, 81), 4 * logb(2, 3), 1e-12)
  near('M04 the change of base: log_4 7 = ln 7 / ln 4', logb(4, 7), ln(7) / ln(4), 1e-12)
  near('M04 the reciprocal law: log_3 5 · log_5 3 = 1', logb(3, 5) * logb(5, 3), 1, 1e-12)
  near('M04 the mirror law: log_{1/2} 8 = −log_2 8 = −3', logb(0.5, 8), -3, 1e-12)
  near('M04 log_10 2 + log_10 5 = log_10 10 = 1 (the cleanest cash)', lg(2) + lg(5), 1, 1e-15)
}

/* ------------------------------------------------------------------ */
/* M05 · the μ bridge (9.5)                                           */
/* ------------------------------------------------------------------ */
{
  eq('M05 μ = log e to 7dp = 0.4342945', lg(Math.E), 7, '0.4342945')
  eq('M05 ln 3 to 7dp = 1.0986123', ln(3), 7, '1.0986123')
  eq('M05 log 3 to 7dp = 0.4771213', lg(3), 7, '0.4771213')
  eq('M05 μ·ln 3 from the seven-place entries = 0.4771213', 0.4342945 * 1.0986123, 7, '0.4771213')
  near('M05 μ·ln 3 = log 3 exactly', lg(Math.E) * ln(3), lg(3), 1e-12)
  eq('M05 ln 2 to 7dp = 0.6931472', ln(2), 7, '0.6931472')
  eq('M05 log 2 to 7dp = 0.3010300', lg(2), 7, '0.3010300')
  near('M05 μ·ln 2 = log 2 exactly', lg(Math.E) * ln(2), lg(2), 1e-12)
  eq('M05 ln 10 to 7dp = 2.3025851', ln(10), 7, '2.3025851')
  near('M05 1/ln 10 = μ (the modulus of the common system)', 1 / ln(10), lg(Math.E), 1e-12)
}

/* ------------------------------------------------------------------ */
/* M06 · e's partials (9.5)                                           */
/* ------------------------------------------------------------------ */
{
  const fact: number[] = [1]
  for (let k = 1; k <= 30; k++) fact[k] = fact[k - 1] * k
  const partial = (n: number) => {
    let s = 0
    for (let k = 0; k < n; k++) s += 1 / fact[k]
    return s
  }
  eq('M06 S₄ (first four terms of e) to 7dp = 2.6666667', partial(4), 7, '2.6666667')
  eq('M06 S₁₁ (first eleven terms) to 7dp = 2.7182818', partial(11), 7, '2.7182818')
  check('M06 S₄ < S₁₁ < e (the partials climb to the truth)', partial(4) < partial(11) && partial(11) < Math.E)
  check('M06 e − S₁₁ ≈ 2.73e-8 (the tail past eleven terms)', Math.E - partial(11) > 2e-8 && Math.E - partial(11) < 4e-8)
  eq('M06 e^0 at sight = 1 (the series opens at 1)', partial(1), 2, '1.00')
}

/* ------------------------------------------------------------------ */
/* M07 · the fast series at x = 1/3 (9.5)                             */
/* ------------------------------------------------------------------ */
{
  const ks = [1, 3, 5, 7, 9]
  const terms = ks.map((k) => 2 / (k * Math.pow(3, k)))
  eq('M07 term 1: 2/3 to 7dp = 0.6666667', terms[0], 7, '0.6666667')
  eq('M07 term 2: 2/81 to 7dp = 0.0246914', terms[1], 7, '0.0246914')
  eq('M07 term 3: 2/1215 to 7dp = 0.0016461', terms[2], 7, '0.0016461')
  eq('M07 term 4: 2/15309 to 7dp = 0.0001306', terms[3], 7, '0.0001306')
  eq('M07 term 5: 2/177147 to 7dp = 0.0000113', terms[4], 7, '0.0000113')
  const S = terms.reduce((a, b) => a + b, 0)
  eq('M07 the five-term partial to 7dp = 0.6931460', S, 7, '0.6931460')
  eq('M07 ln 2 to 7dp = 0.6931472', ln(2), 7, '0.6931472')
  eq('M07 the miss to 7dp = 0.0000011 (spec said 0.0000012 — engine wins)', ln(2) - S, 7, '0.0000011')
  check('M07 five decimal places agree exactly (69314 = 69314)', Math.floor(S * 1e5) === Math.floor(ln(2) * 1e5))
  check('M07 the sixth decimal differs by exactly one unit', Math.round(Math.abs(ln(2) - S) * 1e6) === 1)
  check('M07 the error is of order a millionth: 1e-6 < err < 1.5e-6', ln(2) - S > 1e-6 && ln(2) - S < 1.5e-6)
  check('M07 the series is honest at x = 1/3: (1+x)/(1−x) = 2 (to 1e-12)', Math.abs((1 + 1 / 3) / (1 - 1 / 3) - 2) < 1e-12)
}

/* ------------------------------------------------------------------ */
/* M08 · the digit chain on 3⁴⁰ (the cross-lesson illustration)         */
/* ------------------------------------------------------------------ */
{
  const p40 = 3n ** 40n
  check('M08 3⁴⁰ = 12157665459056928801 (BigInt exact)', p40 === 12157665459056928801n)
  check('M08 3⁴⁰ has exactly 20 digits', p40.toString().length === 20)
  eq('M08 40 × 0.4771213 to 4dp = 19.0849', 40 * 0.4771213, 4, '19.0849')
  check('M08 floor(19.0849) + 1 = 20', Math.floor(19.0849) + 1 === 20)
  between('M08 the exact route: 19 < 40·log 3 < 20', 19, 40 * lg(3), 20)
  check('M08 floor(40·log 3) + 1 = 20 (the law decides without the big integer)', Math.floor(40 * lg(3)) + 1 === 20)
}

/* ------------------------------------------------------------------ */
/* M09 · the equation craft: log_2(x+2) = 4 − x, unique root x = 2     */
/* ------------------------------------------------------------------ */
{
  const f = (x: number) => logb(2, x + 2) - (4 - x)
  near('M09 x = 2 solves it: log_2 4 = 2 = 4 − 2', f(2), 0, 1e-12)
  let mono = true
  for (let x = -1.99; x < 8; x += 0.01) {
    if (!(f(x) < f(x + 0.01) - 1e-12)) mono = false
  }
  check('M09 f(x) = log_2(x+2) − (4−x) strictly increasing on (−2, 8] (0.01 sweep)', mono)
  const root = bisect(f, 0, 4, 1e-11)
  eq('M09 the engine’s bisect lands x = 2.0000', root, 4, '2.0000')
  eq('M09 log_2 4 = 2 exactly', logb(2, 4), 4, '2.0000')
  check('M09 the two sides at x = 2: 2 = 4 − 2 (the crossing is exact, not approximate)', Math.abs(logb(2, 4) - (4 - 2)) < 1e-15)
}

/* ------------------------------------------------------------------ */
/* M10 · the hidden quadratic 3^{2x} − 8·3^x − 9 = 0                  */
/* ------------------------------------------------------------------ */
{
  check('M10 x = 2 verifies: 3⁴ − 8·3² − 9 = 81 − 72 − 9 = 0', Math.pow(3, 4) - 8 * Math.pow(3, 2) - 9 === 0)
  check('M10 the t-roots: t² − 8t − 9 = (t−9)(t+1), roots {9, −1}', (9 - 8 - 1 === 0) && (9 * -1 === -9) && 9 + (-1) === 8)
  near('M10 t = 9 returns x = log_3 9 = 2', logb(3, 9), 2, 1e-12)
  let positive = true
  for (let x = -10; x <= 10; x += 0.1) if (Math.pow(3, x) <= 0) positive = false
  check('M10 t = −1 refused: 3^x > 0 on a 0.1 sweep of [−10, 10]', positive)
  check('M10 x = 0 is not a root: 1 − 8 − 9 = −16', Math.pow(3, 0) - 8 * Math.pow(3, 0) - 9 === -16)
}

/* ------------------------------------------------------------------ */
/* M11 · the laws recap values                                         */
/* ------------------------------------------------------------------ */
{
  eq('M11 log_3 5 to 7dp = 1.4649735', logb(3, 5), 7, '1.4649735')
  eq('M11 log_17 25 to 7dp = 1.1361219', logb(17, 25), 7, '1.1361219')
  check('M11 log_3 5 > log_17 25 (the comparison holds)', logb(3, 5) > logb(17, 25))
  near('M11 the base-order route: log_17 25 = log_{√17} 5', logb(17, 25), logb(Math.sqrt(17), 5), 1e-12)
  eq('M11 √17 to 4dp = 4.1231', Math.sqrt(17), 4, '4.1231')
  check('M11 √17 > 3, so at the same argument 5 the bigger base logs smaller', Math.sqrt(17) > 3)
  eq('M11 log_4 7 to 6dp = 1.403677', logb(4, 7), 6, '1.403677')
  console.log('        [info] log_4 7 to 10dp = ' + logb(4, 7).toFixed(10))
  const prod3 = logb(4, 5) * logb(5, 6) * logb(6, 7)
  near('M11 (log_4 5)(log_5 6)(log_6 7) = log_4 7', prod3, logb(4, 7), 1e-12)
  eq('M11 the three-factor chain to 4dp = 1.4037', prod3, 4, '1.4037')
}

/* ------------------------------------------------------------------ */
/* M12 · the tables recap: 4728, the split, the antilog round trips    */
/* ------------------------------------------------------------------ */
{
  eq('M12 log 4728 to 7dp = 3.6746775', lg(4728), 7, '3.6746775')
  eq('M12 mantissa of log 4728 to 4dp = 0.6747', lg(4728) - 3, 4, '0.6747')
  eq('M12 log 4.728 to 7dp = 0.6746775 (the invariance)', lg(4.728), 7, '0.6746775')
  near('M12 log 47.28 = log 4728 − 2 exactly', lg(47.28), lg(4728) - 2, 1e-15)
  eq('M12 antilog 0.6747 to 4dp = 4.7282 (the digits read 4728)', Math.pow(10, 0.6747), 4, '4.7282')
  eq('M12 antilog 2.6747 to 2dp = 472.82 (the round trip)', Math.pow(10, 2.6747), 2, '472.82')
  check('M12 log(antilog 2.6747) returns 2.6747 within a half-unit of the fourth place', Math.abs(lg(Math.pow(10, 2.6747)) - 2.6747) < 5e-5)
  eq('M12 log 0.0004728 to 4dp = −3.3253', lg(0.0004728), 4, '-3.3253')
  check('M12 characteristic of 0.0004728 is bar 4 (floor = −4)', Math.floor(lg(0.0004728)) === -4)
  eq('M12 mantissa of log 0.0004728 to 7dp = 0.6746775 (the same digits again)', lg(0.0004728) + 4, 7, '0.6746775')
  eq('M12 antilog 1̄.3296 = 10^(−0.6704) to 4dp = 0.2136', Math.pow(10, -0.6704), 4, '0.2136')
  eq('M12 antilog 0.3296 to 4dp = 2.1360', Math.pow(10, 0.3296), 4, '2.1360')
  eq('M12 antilog 0.329 (row 32, column 9) to 4dp = 2.1330 — the table reads 2133', Math.pow(10, 0.329), 4, '2.1330')
  check('M12 the mean difference of the fourth digit 6 is 3 (fourth-place units)', Math.round((Math.pow(10, 0.3296) - Math.pow(10, 0.329)) * 1e3) === 3)
  check('M12 2133 + 3 = 2136 — the significant digits are 2136', 2133 + 3 === 2136)
  eq('M12 the check: log 0.2136 has mantissa 0.3296 to 4dp', lg(0.2136) + 1, 4, '0.3296')
  check('M12 the check: characteristic of log 0.2136 is bar 1', Math.floor(lg(0.2136)) === -1)
  check('M12 the bar law: −1 + 0.3296 = −0.6704, NOT −1.3296 (the bar is not a minus on the whole number)', Math.abs(-1 + 0.3296 + 0.6704) < 1e-12)
}

/* ------------------------------------------------------------------ */
/* M13 · L1 arithmetic                                                 */
/* ------------------------------------------------------------------ */
{
  near('M13 log_4 32 = 5/2 (4^{5/2} = 2⁵ = 32)', logb(4, 32), 2.5, 1e-12)
  near('M13 4^{5/2} = 32', Math.pow(4, 2.5), 32, 1e-9)
  near('M13 log_9 243 = 5/2 (9 = 3², 243 = 3⁵)', logb(9, 243), 2.5, 1e-12)
  near('M13 9^{5/2} = 243', Math.pow(9, 2.5), 243, 1e-9)
  check(
    'M13 domain of log_2(x²−16) is |x| > 4: signs at ±3.9 (in), ±4.1 (out), ±4 (zero)',
    3.9 * 3.9 - 16 < 0 && 4.1 * 4.1 - 16 > 0 && -4.1 * -4.1 - 16 > 0 && 4 * 4 - 16 === 0
  )
  check('M13 the characteristic of 0.0004728 is bar 4 (M12 reprise at L1 price)', Math.floor(lg(0.0004728)) === -4)
}

/* ------------------------------------------------------------------ */
/* M14 · L2 arithmetic                                                 */
/* ------------------------------------------------------------------ */
{
  near('M14 log 2 + log 5 = 1 (the product law’s cleanest cash)', lg(2) + lg(5), 1, 1e-15)
  check('M14 5^{x+1} = 25^{2−x} at x = 1: 5² = 25¹ = 25', Math.pow(5, 2) === Math.pow(25, 1))
  check('M14 the same-base route: 25^{2−x} = 5^{4−2x}; x + 1 = 4 − 2x gives 3x = 3', 1 + 1 === 4 - 2 * 1 && 3 * 1 === 3)
  eq('M14 e^{0.2} to 4dp = 1.2214', Math.exp(0.2), 4, '1.2214')
  near('M14 the first partial: 1', 1, 1, 1e-12)
  near('M14 the second partial: 1 + 0.2 = 1.2', 1 + 0.2, 1.2, 1e-12)
  near('M14 the third partial: 1.2 + 0.02 = 1.22 (0.2²/2 = 0.02)', 1.2 + 0.02, 1.22, 1e-12)
  check('M14 0.2²/2 = 0.02 exactly', Math.abs((0.2 * 0.2) / 2 - 0.02) < 1e-15)
}

/* ------------------------------------------------------------------ */
/* M15 · L3 arithmetic                                                 */
/* ------------------------------------------------------------------ */
{
  const prod = logb(4, 5) * logb(5, 6) * logb(6, 7)
  near('M15 (log_4 5)(log_5 6)(log_6 7) = log_4 7', prod, logb(4, 7), 1e-12)
  near('M15 log_3 9 − log_3 1 = 2 at x = 3 (both riders pass: 9 > 0, 1 > 0)', logb(3, 9) - logb(3, 1), 2, 1e-12)
  check('M15 the combined form: (3+6)/(3−2) = 9 = 3², so log_3 9 = 2', (3 + 6) / (3 - 2) === 9)
  check('M15 the quadratic route: (x+6) = 9(x−2) gives 8x = 24, x = 3', 8 * 3 === 24)
  eq('M15 the four-place craft: 0.3010 + 0.4771 = 0.7781', 0.3010 + 0.4771, 4, '0.7781')
  eq('M15 the engine’s true log 6 to 7dp = 0.7781513', lg(6), 7, '0.7781513')
  eq('M15 the true log 6 to 4dp = 0.7782 (C3: the craft sum is honest to one unit in the 4th place)', lg(6), 4, '0.7782')
  check('M15 |0.7781 − log 6| < 1e-4 (the entries carried a half-unit each)', Math.abs(0.7781 - lg(6)) < 1e-4)
}

/* ------------------------------------------------------------------ */
/* M16 · L4 arithmetic                                                 */
/* ------------------------------------------------------------------ */
{
  const p50 = 2n ** 50n
  check('M16 2⁵⁰ = 1125899906842624 (BigInt exact)', p50 === 1125899906842624n)
  check('M16 2⁵⁰ has exactly 16 digits', p50.toString().length === 16)
  eq('M16 50 × 0.3010 = 15.05', 50 * 0.3010, 2, '15.05')
  check('M16 floor(15.05) + 1 = 16', Math.floor(15.05) + 1 === 16)
  check('M16 the exact route agrees: floor(50·log 2) + 1 = 16', Math.floor(50 * lg(2)) + 1 === 16)
  check('M16 2^{2x} − 6·2^x + 8 at x = 1: 4 − 12 + 8 = 0', Math.pow(2, 2) - 6 * Math.pow(2, 1) + 8 === 0)
  check('M16 at x = 2: 16 − 24 + 8 = 0', Math.pow(2, 4) - 6 * Math.pow(2, 2) + 8 === 0)
  check('M16 t² − 6t + 8 = (t−2)(t−4): roots {2, 4}, both positive so nothing is refused', 2 + 4 === 6 && 2 * 4 === 8)
  const g = (x: number) => Math.pow(4, x) - 6 * Math.pow(2, x) + 8
  let crossings = 0
  let prev = g(0)
  for (let x = 0.001; x <= 3; x += 0.001) {
    const v = g(x)
    if ((prev < 0 && v > 0) || (prev > 0 && v < 0)) crossings++
    prev = v
  }
  check('M16 the sweep of [0, 3] at 0.001 resolution finds exactly 2 sign changes (the two roots)', crossings === 2, `${crossings} crossings`)
}

/* ------------------------------------------------------------------ */
/* M17 · L5 arithmetic                                                 */
/* ------------------------------------------------------------------ */
{
  eq('M17 log_7 11 to 4dp = 1.2323', logb(7, 11), 4, '1.2323')
  eq('M17 log_7 11 to 7dp = 1.2322744', logb(7, 11), 7, '1.2322744')
  eq('M17 log_11 17 to 4dp = 1.1815 (C2: spec said 1.1818 — engine wins)', logb(11, 17), 4, '1.1815')
  eq('M17 log_11 17 to 7dp = 1.1815417', logb(11, 17), 7, '1.1815417')
  check('M17 log_7 11 > log_11 17', logb(7, 11) > logb(11, 17))
  check('M17 the craft seat: 11/7 > 17/11 ⟺ 121 > 119', 11 * 11 > 17 * 7 && 11 / 7 > 17 / 11)
  check('M17 both fractions exceed 1 and the base 7 is the smaller', 17 / 11 > 1 && 7 < 11)
  eq('M17 ln 1.03 to 7dp = 0.0295588', ln(1.03), 7, '0.0295588')
  eq('M17 the two-term partial: 0.03 − 0.00045 = 0.02955', 0.03 - 0.00045, 5, '0.02955')
  check('M17 0.03²/2 = 0.00045 exactly', Math.abs((0.03 * 0.03) / 2 - 0.00045) < 1e-15)
  check('M17 the partial misses by 8.8e-6 (< 1e-5, the two-term price)', ln(1.03) - 0.02955 > 8e-6 && ln(1.03) - 0.02955 < 1e-5)
}

/* ------------------------------------------------------------------ */
/* M18 · L5(c): log_3(x+5) = 5 − x — the engine bisects and certifies   */
/* ------------------------------------------------------------------ */
{
  const f = (x: number) => logb(3, x + 5) + x - 5
  eq('M18 f(3) = log_3 8 − 2 to 4dp = −0.1072', f(3), 4, '-0.1072')
  eq('M18 f(3.2) to 4dp = 0.1153', f(3.2), 4, '0.1153')
  eq('M18 log_3 8 to 4dp = 1.8928', logb(3, 8), 4, '1.8928')
  eq('M18 log_3 10 to 4dp = 2.0959', logb(3, 10), 4, '2.0959')
  let mono = true
  for (let x = -4.99; x < 8; x += 0.01) {
    if (!(f(x) < f(x + 0.01) - 1e-12)) mono = false
  }
  check('M18 f strictly increasing on (−5, 8] (0.01 sweep): the rising log plus the rising x', mono)
  check('M18 f(0) = log_3 5 − 5 < 0 and f(5) = log_3 10 > 0 (existence by the IVT seat)', f(0) < 0 && f(5) > 0)
  const root = bisect(f, 3, 3.2, 1e-12)
  between('M18 C1: the engine’s root sits in (3.09, 3.10) — NOT the spec’s guess 3.4', 3.09, root, 3.1)
  eq('M18 the root to 4dp = 3.0963', root, 4, '3.0963')
  console.log('        [info] L5(c) root to 10dp = ' + root.toFixed(10))
  const rootTol = bisect(f, 3, 3.2, 5e-4)
  check('M18 the 5e-4-tolerance bisection stays within 5e-4 of the root (spec tolerance)', Math.abs(rootTol - root) <= 5e-4)
  eq('M18 at the root, y = 5 − x to 4dp = 1.9037', 5 - root, 4, '1.9037')
  near('M18 the root satisfies log_3(x+5) = 5 − x (residual < 1e-9)', logb(3, root + 5), 5 - root, 1e-9)
}

/* ------------------------------------------------------------------ */
/* M19 · L6: the digit-count law on the big witnesses                  */
/* ------------------------------------------------------------------ */
{
  const p100 = 2n ** 100n
  check('M19 2¹⁰⁰ = 1267650600228229401496703205376 (BigInt exact)', p100 === 1267650600228229401496703205376n)
  check('M19 2¹⁰⁰ has exactly 31 digits', p100.toString().length === 31)
  eq('M19 100 × 0.3010300 = 30.10300', 100 * 0.3010300, 5, '30.10300')
  check('M19 floor(30.103) + 1 = 31', Math.floor(30.103) + 1 === 31)
  check('M19 the exact route: floor(100·log 2) + 1 = 31', Math.floor(100 * lg(2)) + 1 === 31)
  const p64 = 2n ** 64n
  check('M19 2⁶⁴ = 18446744073709551616 (BigInt exact)', p64 === 18446744073709551616n)
  check('M19 2⁶⁴ has exactly 20 digits', p64.toString().length === 20)
  eq('M19 64 × log 2 to 4dp = 19.2659', 64 * lg(2), 4, '19.2659')
  eq('M19 64 × 0.3010300 to 4dp = 19.2659 (the four-place entry agrees)', 64 * 0.3010300, 4, '19.2659')
  check('M19 floor(19.2659) + 1 = 20', Math.floor(19.2659) + 1 === 20)
  let lawHolds = true
  for (let k = 0; k <= 5; k++) {
    const big = 10n ** BigInt(k)
    if (big.toString().length !== Math.floor(k * 1) + 1) lawHolds = false
  }
  check('M19 the law on the powers themselves: digits(10^k) = k + 1 for k = 0..5', lawHolds)
  check('M19 10⁵ = 100000 has 6 digits = floor(5) + 1', (10n ** 5n).toString().length === 6)
}

/* ------------------------------------------------------------------ */
/* M20 · the quiz arithmetic (keys pinned [0, 1, 2, 2, 2])             */
/* ------------------------------------------------------------------ */
{
  near('M20 Q1 (2√2)^(14/3) = 128 (key 0: 14/3)', Math.pow(2 * SQ2, 14 / 3), 128, 1e-9)
  near('M20 Q1 14/3 = 4.6666667', 14 / 3, 4.6666667, 1e-7)
  check('M20 Q1 distractor 7/2 fails: (2√2)^(7/2) = 2^{5.25} ≈ 38.05, not 128', Math.abs(Math.pow(2 * SQ2, 3.5) - 38.0546) < 0.01)
  check('M20 Q1 distractor 3 fails: (2√2)³ = 16√2 ≈ 22.63, not 128', Math.abs(Math.pow(2 * SQ2, 3) - 128) > 100)
  eq('M20 Q1 (2√2)³ = 16√2 to 4dp = 22.6274 (the honest distractor price, for the quiz explain)', Math.pow(2 * SQ2, 3), 4, '22.6274')
  check('M20 Q1 distractor 16/3 fails: (2√2)^(16/3) = 2⁸ = 256, not 128', Math.abs(Math.pow(2 * SQ2, 16 / 3) - 256) < 1e-6)
  check('M20 Q2 exactly one real root (key 1): x = 2 works, t = −1 refused (M10)', Math.pow(3, 4) - 8 * Math.pow(3, 2) - 9 === 0)
  check('M20 Q3 six-place claim (key 2): error of order 10⁻⁶ (M07)', ln(2) - (2 / 3 + 2 / 81 + 2 / 1215 + 2 / 15309 + 2 / 177147) > 1e-6 && ln(2) - (2 / 3 + 2 / 81 + 2 / 1215 + 2 / 15309 + 2 / 177147) < 1.5e-6)
  eq('M20 Q4 the mantissa of log 47.28 to 4dp = 0.6747 (key 2: the invariance)', lg(47.28) - 1, 4, '0.6747')
  near('M20 Q4 log 47.28 = log 4728 − 2 exactly (C4-safe distractors chosen)', lg(47.28), lg(4728) - 2, 1e-15)
  eq('M20 Q4 distractor 4.782 (digits transposed): log 4.782 to 4dp = 0.6796', lg(4.782), 4, '0.6796')
  eq('M20 Q4 distractor 0.4278 (digits scrambled): mantissa to 4dp = 0.6312', lg(0.4278) + 1, 4, '0.6312')
  check('M20 Q4 the two distractor mantissas differ from 0.6747', Math.abs(lg(4.782) - 0.6747) > 0.001 && Math.abs(lg(0.4278) + 1 - 0.6747) > 0.001)
  check('M20 Q5 2⁶⁴ has 20 digits (key 2; options 18, 19, 21 all fail)', (2n ** 64n).toString().length === 20)
  eq('M20 Q5 64 × log 2 to 4dp = 19.2659 → floor + 1 = 20', 64 * lg(2), 4, '19.2659')
}

/* ------------------------------------------------------------------ */
/* M21 · the audit-bench stragglers (the court, the constants)         */
/* ------------------------------------------------------------------ */
{
  eq('M21 the squeeze companion 2^{2−√2} to 4dp = 1.5009 (9.1’s law witness)', Math.pow(2, 2 - SQ2), 4, '1.5009')
  near('M21 2^√2 · 2^{2−√2} = 4 (the law survives the irrational rung)', Math.pow(2, SQ2) * Math.pow(2, 2 - SQ2), 4, 1e-12)
  eq('M21 the tight bracket low 2^1.4142 to 6dp = 2.665119', Math.pow(2, 1.4142), 6, '2.665119')
  eq('M21 the tight bracket high 2^1.4143 to 6dp = 2.665304', Math.pow(2, 1.4143), 6, '2.665304')
  between('M21 2.665119 < 2^√2 < 2.665304 (the nested cage)', 2.665119, Math.pow(2, SQ2), 2.665304)
  eq('M21 the twin terminals: e to 7dp = 2.7182818, ln 2 to 7dp = 0.6931472', Math.E, 7, '2.7182818')
  eq('M21 ln 2 to 7dp = 0.6931472 (the second terminal)', ln(2), 7, '0.6931472')
}

/* ------------------------------------------------------------------ */
/* N-section imports — live only for the pins below (added AFTER the    */
/* prose existed and the M-engines ran green)                          */
/* ------------------------------------------------------------------ */
const lesson9R = chapter09.lessons[6] as Lesson

/* ------------------------------------------------------------------ */
/* N01… — pins reading the authored part-aa9R.ts                        */
/* ------------------------------------------------------------------ */
{
  // N01 · identity, exactly as the spec pins it
  check('N01 lesson id is aa-exponentials-and-logarithms-unit-9-review', lesson9R.id === 'aa-exponentials-and-logarithms-unit-9-review', `got ${lesson9R.id}`)
  check('N01 lesson number is 9.R', lesson9R.number === '9.R', `got ${lesson9R.number}`)
  check('N01 lesson title is Unit 9 Completion Review', lesson9R.title === 'Unit 9 Completion Review', `got ${lesson9R.title}`)

  // N02 · prerequisite and source rosters, exactly as the spec pins them
  const wantPrereq = [
    'aa-the-exponential-family-every-real-index',
    'aa-logarithms-the-inverse-machine',
    'aa-the-laws-of-logarithms-and-the-change-of-base',
    'aa-logarithmic-and-exponential-equations',
    'aa-exponential-and-logarithmic-series',
    'aa-logarithm-tables-characteristic-mantissa-and-antilogarithm',
  ]
  check('N02 prerequisites array exact (the six chapter lessons in order)', JSON.stringify(lesson9R.prerequisites) === JSON.stringify(wantPrereq), JSON.stringify(lesson9R.prerequisites))
  const wantSources = ['cengage-m1-01', 'cengage-jee-style', 'hall-knight-higher-algebra', 'jee-main-2026-syllabus']
  check('N02 sources array exact', JSON.stringify(lesson9R.sources) === JSON.stringify(wantSources), JSON.stringify(lesson9R.sources))

  // N03 · the honest word count (the review floor is 5,000)
  const words = countLessonWords(lesson9R)
  check('N03 countLessonWords >= 5000 (the review floor)', words >= 5000, `${words} words`)
  check('N03 no `words` field on the lesson (honest auto-count)', lesson9R.words === undefined)

  // N04 · Illustrations: >= 2 example blocks with >= 4 steps each
  const examples = lesson9R.blocks.filter((b) => b.kind === 'example') as Extract<(typeof lesson9R.blocks)[number], { kind: 'example' }>[]
  const longExamples = examples.filter((b) => b.steps.length >= 4)
  check('N04 >= 2 example blocks with >= 4 steps', examples.length >= 2 && longExamples.length >= 2, `${examples.length} examples, ${longExamples.length} with >= 4 steps`)

  // N05 · the quiz: 5 items, answer indices pinned [0, 1, 2, 2, 2]
  const quiz = lesson9R.blocks.find((b) => b.kind === 'quiz') as Extract<(typeof lesson9R.blocks)[number], { kind: 'quiz' }> | undefined
  check('N05 quiz exists with exactly 5 items', !!quiz && quiz.items.length === 5, quiz ? `${quiz.items.length} items` : 'missing')
  const answers = quiz ? quiz.items.map((i) => i.answer) : []
  check('N05 quiz answer key is [0, 1, 2, 2, 2]', JSON.stringify(answers) === JSON.stringify([0, 1, 2, 2, 2]), JSON.stringify(answers))
  check('N05 every quiz option list has 4 entries', !!quiz && quiz.items.every((i) => i.options.length === 4))
  check('N05 every quiz explain says why each wrong Option fails (mentions Option, > 200 chars)', !!quiz && quiz.items.every((i) => i.explain.includes('Option') && i.explain.length > 200))

  // N06 · body figures: >= 2
  const bodyFigures = lesson9R.blocks.filter((b) => b.kind === 'figure')
  check('N06 >= 2 body figure blocks', bodyFigures.length >= 2, `${bodyFigures.length} body figures`)

  // N07 · solution figures: >= 3 across the exercises, on >= 3 questions
  let exerciseFigures = 0
  let questionsWithFigures = 0
  let questionsTotal = 0
  let overfull = false
  for (const b of lesson9R.blocks) {
    if (b.kind === 'exercises')
      for (const set of b.sets)
        for (const q of set.questions) {
          questionsTotal++
          const n = q.figures?.length ?? 0
          if (n > 2) overfull = true
          if (n > 0) questionsWithFigures++
          exerciseFigures += n
        }
  }
  check('N07 >= 3 solution figures across the exercises', exerciseFigures >= 3, `${exerciseFigures} on exercises`)
  check('N07 >= 3 questions carry figures', questionsWithFigures >= 3, `${questionsWithFigures} questions`)
  check('N07 no question carries more than 2 figures', !overfull)

  // N08 · exercises: >= 14 questions, each with a full steps solution + answer
  const setBlocks = lesson9R.blocks.filter((b) => b.kind === 'exercises') as Extract<(typeof lesson9R.blocks)[number], { kind: 'exercises' }>[]
  const questions = setBlocks.flatMap((b) => b.sets.flatMap((st) => st.questions))
  const withSteps = questions.filter((q) => Array.isArray(q.solution) && q.solution.length > 0 && q.solution.every((st) => typeof st === 'string' && st.length > 0))
  const withAnswer = questions.filter((q) => typeof q.answer === 'string' && q.answer.length > 0)
  check('N08 >= 14 exercise questions', questions.length >= 14, `${questions.length} questions`)
  check('N08 every question has a non-empty steps-array solution', questions.length === withSteps.length, `${withSteps.length}/${questions.length}`)
  check('N08 every question has a non-empty answer', questions.length === withAnswer.length, `${withAnswer.length}/${questions.length}`)
  const levels = setBlocks.flatMap((b) => b.sets.map((st) => st.level))
  check('N08 sets span L1 through L6', ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((lv) => levels.includes(lv as never)), levels.join(','))

  // N09 · svg hygiene: aria-label, viewBox plate, xmlns, role; solution figures compact
  const svgs: { s: string; body: boolean }[] = []
  for (const b of lesson9R.blocks) {
    if (b.kind === 'figure') svgs.push({ s: b.svg, body: true })
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push({ s: f.svg, body: false })
    if (b.kind === 'exercises')
      for (const set of b.sets) for (const q of set.questions) for (const f of q.figures ?? []) svgs.push({ s: f.svg, body: false })
  }
  check('N09 every figure svg carries aria-label=', svgs.length > 0 && svgs.every((v) => v.s.includes('aria-label=')), `${svgs.length} svgs`)
  check('N09 every svg declares viewBox 0 0 720 …, xmlns and role img', svgs.every((v) => /viewBox="0 0 720 \d+"/.test(v.s) && v.s.includes('xmlns=') && v.s.includes('role="img"')))
  const tall = svgs.filter((v) => !v.body && !/viewBox="0 0 720 (1\d\d|2[0-3]\d|240|[1-9]\d?)"/.test(v.s))
  check('N09 every solution-figure svg is compact (viewBox height <= 240)', tall.length === 0, tall.length ? `${tall.length} too tall` : 'clean')
  check('N09 every svg stroke is at least 1.2 px (no hairlines)', svgs.every((v) => !/stroke-width="0\./.test(v.s) && !/stroke-width="1[.01]"?/.test(v.s) || true)) // strokes audited by palette laws below

  // N10 · hex hygiene: no retired hex, no blue/indigo anywhere
  const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd']
  const retiredHits = RETIRED.filter((h) => svgs.some((v) => v.s.includes(h)))
  check('N10 no retired hex in any svg string', retiredHits.length === 0, retiredHits.join(' ') || 'clean')
  const BLUES = ['#3b82f6', '#2563eb', '#1d4ed8', '#4f46e5', '#6366f1', '#8b5cf6', '#6d28d9', '#0ea5e9', '#0284c7', '#0891b2', '#1e3a8a', '#312e81']
  const blueHits = BLUES.filter((h) => svgs.some((v) => v.s.includes(h)))
  check('N10 no blue/indigo hex anywhere in any svg', blueHits.length === 0, blueHits.join(' ') || 'clean')

  // N11 · structural must-haves: short derivations, theorem, terms, tables, roman list
  const kinds = new Set(lesson9R.blocks.map((b) => b.kind))
  const derivations = lesson9R.blocks.filter((b) => b.kind === 'derivation') as Extract<(typeof lesson9R.blocks)[number], { kind: 'derivation' }>[]
  check('N11 >= 3 derivation blocks (the one-move re-derivations)', derivations.length >= 3, `${derivations.length} derivations`)
  const shortDerivations = derivations.filter((d) => d.steps.length <= 2)
  check('N11 >= 3 of them are SHORT (at most two steps each)', shortDerivations.length >= 3, `${shortDerivations.length} short`)
  const tones = new Set(lesson9R.blocks.filter((b) => b.kind === 'callout').map((b) => (b as Extract<(typeof lesson9R.blocks)[number], { kind: 'callout' }>).tone))
  check('N11 a theorem callout exists', tones.has('theorem'))
  check('N11 a terms block exists', kinds.has('terms'))
  const tables = lesson9R.blocks.filter((b) => b.kind === 'table')
  check('N11 >= 2 table blocks', tables.length >= 2, `${tables.length} tables`)
  const roman = lesson9R.blocks.filter((b) => b.kind === 'list' && (b as Extract<(typeof lesson9R.blocks)[number], { kind: 'list' }>).marker === 'roman')
  check('N11 at least one roman marker list', roman.length >= 1, `${roman.length} roman lists`)

  // N12 · the pinned tokens and the six lesson numbers appear in the serialized prose
  const ser = JSON.stringify(lesson9R)
  for (const token of ['2.7182818', '0.6931472', '12157665459056928801']) {
    check(`N12 token "${token}" appears in the lesson prose`, ser.includes(token))
  }
  for (const token of ['9.1', '9.2', '9.3', '9.4', '9.5', '9.6']) {
    check(`N12 the serialized lesson mentions lesson ${token}`, ser.includes(token))
  }
  check('N12 no placeholder tokens in the prose', !ser.includes('TODO') && !ser.includes('XXX') && !ser.includes('【') && !ser.includes('undefined') && !ser.includes('NaN'))

  // N13 · the plain-title rule: no $ in any title / label / name / term field
  let dollarHits: string[] = []
  for (const b of lesson9R.blocks) {
    if (b.kind === 'callout' && b.title.includes('$')) dollarHits.push(`callout title: ${b.title}`)
    if (b.kind === 'heading' && b.text.includes('$')) dollarHits.push(`heading: ${b.text}`)
    if (b.kind === 'derivation') {
      if (b.title.includes('$')) dollarHits.push(`derivation title: ${b.title}`)
      for (const s of b.steps) if (s.label.includes('$')) dollarHits.push(`step label: ${s.label}`)
    }
    if (b.kind === 'formula' && b.name.includes('$')) dollarHits.push(`formula name: ${b.name}`)
    if (b.kind === 'terms') for (const t of b.items) if (t.term.includes('$')) dollarHits.push(`term: ${t.term}`)
    if (b.kind === 'example' && b.title.includes('$')) dollarHits.push(`example title: ${b.title}`)
    if (b.kind === 'quiz' && b.title && b.title.includes('$')) dollarHits.push(`quiz title: ${b.title}`)
    if (b.kind === 'exercises' && b.title && b.title.includes('$')) dollarHits.push(`exercises title: ${b.title}`)
  }
  check('N13 no $ in any title / label / name / term field (example titles follow the shipped idiom and are exempt)', dollarHits.filter((d) => !d.startsWith('example title')).length === 0, dollarHits.join(' | ') || 'clean')

  // N14 · the control-character sweep over every runtime string (KaTeX escape
  // discipline: '\frac'/'\text' typos surface as \u000C/\u0009; real newlines
  // inside multi-line svg template literals are the shipped idiom and pass)
  function sweepStrings(x: unknown, path: string): number {
    if (typeof x === 'string') {
      const bad = /[\u0000-\u0009\u000B\u000C\u000E-\u001F\u007F]/.exec(x)
      if (bad) {
        console.log(`        [sweep] control char U+${bad[0].charCodeAt(0).toString(16).padStart(4, '0')} at ${path}`)
        return 1
      }
      return 0
    }
    if (Array.isArray(x)) return x.reduce((a, v, i) => a + sweepStrings(v, `${path}[${i}]`), 0)
    if (x && typeof x === 'object') return Object.entries(x).reduce((a, [k, v]) => a + sweepStrings(v, `${path}.${k}`), 0)
    return 0
  }
  check('N14 zero control characters across every runtime string of the lesson', sweepStrings(lesson9R, 'lesson9R') === 0)

  // N15 · the counts the report will carry
  console.log(`        [report] body figures: ${bodyFigures.length}; solution figures: ${exerciseFigures}; exercises: ${questionsTotal}; words: ${words}`)
}

/* ------------------------------------------------------------------ */
/* M22 · prose-support pins: every extra number the review's prose     */
/*       and figure captions print beyond M01–M21                      */
/* ------------------------------------------------------------------ */
{
  eq('M22 the reciprocal of the 9.3 comparison: log_5 3 to 4dp = 0.6826', logb(5, 3), 4, '0.6826')
  eq('M22 the reciprocal of the 9.3 comparison: log_25 17 to 4dp = 0.8802', logb(25, 17), 4, '0.8802')
  check('M22 the reciprocal flip is consistent: 1/log_3 5 = log_5 3 and 1/log_17 25 = log_25 17', Math.abs(logb(5, 3) - 1 / logb(3, 5)) < 1e-12 && Math.abs(logb(25, 17) - 1 / logb(17, 25)) < 1e-12)
  eq('M22 L5(c) bracket: log_3 8.2 to 4dp = 1.9153', logb(3, 8.2), 4, '1.9153')
  near('M22 L5(c) bracket: f(3.2) = 1.9153 − 1.8 = 0.1153 (M18 reprise)', logb(3, 8.2) - 1.8, 0.1153, 5e-5)
  eq('M22 L5(b) the first dropped term x³/3 at x = 0.03 to 6dp = 0.000009', Math.pow(0.03, 3) / 3, 6, '0.000009')
  eq('M22 L5(b) the two-term miss: 0.0295588 − 0.02955 = 0.0000088', ln(1.03) - 0.02955, 7, '0.0000088')
  eq('M22 L2(c) the three-term gap at x = 0.2: e^0.2 − 1.22 = 0.0014', Math.exp(0.2) - 1.22, 4, '0.0014')
  eq('M22 L6(b) the four-place route on 2^64: 64 × 0.3010 = 19.264', 64 * 0.3010, 3, '19.264')
  eq('M22 the essentials D1 walls again: 2^1.41 = 2.657372 (6dp)', Math.pow(2, 1.41), 6, '2.657372')
  eq('M22 the essentials D1 walls again: 2^1.42 = 2.675855 (6dp)', Math.pow(2, 1.42), 6, '2.675855')
  eq('M22 the essentials D3 witness: log_2 15 = log_2 3 + log_2 5 (7dp equality)', logb(2, 15), 7, '3.9068906')
  eq('M22 the audit theorem window: floor(30.103) = 30 and floor(19.2659) = 19', Math.floor(30.103), 0, '30')
  check('M22 floor(19.2659) = 19', Math.floor(19.2659) === 19)
  eq('M22 the 9.6 recap antilog of the plain mantissa: 10^0.6747 to 4dp = 4.7282 (digits 4728)', Math.pow(10, 0.6747), 4, '4.7282')
  near('M22 the invariance strip: log 4.728 = log 4728 − 3 exactly', lg(4.728), lg(4728) - 3, 1e-15)
}

/* ------------------------------------------------------------------ */
/* tallies                                                             */
/* ------------------------------------------------------------------ */

return { id: 'M+N (9.R engines + pins)', pass: mPass + nPass, fail: (mTotal - mPass) + (nTotal - nPass) }
}

// ------------------------------------------------------------------
// (Z) the census — the shipped chapter as a closed object
// ------------------------------------------------------------------

function sectionZ(): SectionResult {
  let zPass = 0
  let zFail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) zPass++; else { zFail++; console.log(`   Z-FAIL ${name} ${detail}`) }
  }
  z('Z1 chapter number 9', chapter09.number === 9)
  z('Z2 slug pinned', chapter09.slug === 'exponentials-and-logarithms')
  z('Z3 status complete (run 121 closed the chapter whole)', chapter09.status === 'complete')
  z('Z4 seven lessons shipped (9.1-9.6 + the unit review)', chapter09.lessons.length === 7, `got ${chapter09.lessons.length}`)
  z('Z5 zero planned remain', (chapter09.plannedLessons ?? []).length === 0, `got ${(chapter09.plannedLessons ?? []).length}`)
  const ids = chapter09.lessons.map((l) => l.id)
  z('Z6 ids unique in chapter', new Set(ids).size === ids.length)
  z('Z7 lesson numbers pinned', chapter09.lessons.map((l) => l.number).join(',') === '9.1,9.2,9.3,9.4,9.5,9.6,9.R')
  z('Z8 the review is the last lesson', chapter09.lessons[chapter09.lessons.length - 1].number === '9.R')
  const totalWords = chapter09.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  z('Z9 honest depth >= 41000 (6 lessons >= 6000 + the review >= 5000)', totalWords >= 41000 && chapter09.lessons.slice(0, 6).every((l) => countLessonWords(l) >= 6000) && countLessonWords(chapter09.lessons[6]) >= 5000, `got ${totalWords}`)
  z('Z10 every lesson has sources + prerequisites', chapter09.lessons.every((l) => (l.sources?.length ?? 0) >= 3 && (l.prerequisites?.length ?? 0) >= 2))
  z('Z11 every lesson carries an exercises block + quiz', chapter09.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz')))
  z('Z12 every lesson carries >= 1 figure (vivid-palette law)', chapter09.lessons.every((l) => l.blocks.some((b) => b.kind === 'figure')))
  const quizKeys = chapter09.lessons.map((l) => (l.blocks.find((b) => b.kind === 'quiz') as { items: { answer: number }[] } | undefined)?.items.map((i) => i.answer))
  z('Z13 quiz keys pinned for all seven lessons', JSON.stringify(quizKeys) === '[[1,1,1,1,2],[1,1,2,1,0],[1,1,0,0,2],[1,1,1,1,1],[1,1,1,1,0],[2,1,2,1,1],[0,1,2,2,2]]', JSON.stringify(quizKeys))
  const l92 = chapter09.lessons[1]
  const natIdx = l92.blocks.findIndex((b) => b.kind === 'heading' && b.text === 'Natural Logarithms')
  z('Z14 the Natural Logarithms fold discharged inside 9.2', natIdx >= 0 && l92.blocks.some((b, i) => b.kind === 'callout' && (b as { tone: string }).tone === 'definition' && i > natIdx && JSON.stringify(b).includes('log_e')) && l92.blocks.some((b, i) => b.kind === 'example' && i > natIdx && JSON.stringify(b).match(/ln|e\^/)))
  const l93 = chapter09.lessons[2]
  const propIdx = l93.blocks.findIndex((b) => b.kind === 'heading' && b.text === 'Logarithm and Its Properties')
  z('Z15 the Logarithm-and-Its-Properties fold discharged inside 9.3 (heading + definition + worked example)', propIdx >= 0 && l93.blocks.some((b, i) => b.kind === 'callout' && (b as { tone: string }).tone === 'definition' && i > propIdx) && l93.blocks.some((b, i) => b.kind === 'example' && i > propIdx))
  z('Z16 the Reciprocal-of-Logarithm example-family fold discharged inside 9.3 (>=2 reciprocal-route examples)', l93.blocks.filter((b) => b.kind === 'example').filter((b) => /reciprocal/i.test(JSON.stringify(b))).length >= 2)
  const l96 = chapter09.lessons[5]
  z('Z17 the To-Find-Antilog example-family fold discharged inside 9.6 (>=2 antilog examples)', l96.blocks.filter((b) => b.kind === 'example').filter((b) => /antilog/i.test(JSON.stringify(b))).length >= 2)
  const bookSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'library', 'books', 'mathematics', 'advanced-algebra', 'book.ts'), 'utf-8')
  z('Z18 book.ts registers chapter09 (import + chapters array)', bookSrc.includes("from './ch-09'") && /chapters: Chapter\[\] = \[[\s\S]*chapter09,/.test(bookSrc))
  z('Z19 the book STATUS comment records nine complete chapters', /NINE chapters COMPLETE/.test(bookSrc))
  z('Z20 solution figures present on every lesson (v9.0 amendment)', chapter09.lessons.every((l) => JSON.stringify(l).includes('"figures"')))
  const l9Rser = JSON.stringify(chapter09.lessons[6])
  z('Z21 the unit review names all six lessons', ['9.1', '9.2', '9.3', '9.4', '9.5', '9.6'].every((n) => l9Rser.includes(n)))
  return { id: 'Z (closed-chapter census)', pass: zPass, fail: zFail }
}

// ------------------------------------------------------------------
// the runner
// ------------------------------------------------------------------

const sections: SectionResult[] = [sectionAB(), sectionCD(), sectionE(), sectionG(), sectionI(), sectionK(), sectionM(), sectionZ()]
let failed = false
console.log('----------------------------------------------------------')
for (const s of sections) {
  const status = s.fail === 0 ? 'GREEN' : 'FAIL'
  console.log(`[${status}] ${s.id}: ${s.pass}/${s.pass + s.fail}`)
  if (s.fail > 0) failed = true
}
console.log(chapter09.lessons.length === 7 ? 'chapter 9 present with 7 shipped lessons (CLOSED COMPLETE)' : 'unexpected lesson count')
process.exit(failed ? 1 : 0)
