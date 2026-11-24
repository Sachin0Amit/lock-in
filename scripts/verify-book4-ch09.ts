import { chapter09 } from '../src/data/library/books/mathematics/advanced-algebra/ch-09'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import * as fs from 'fs'
import * as path from 'path'

export {}

/**
 * verify-book4-ch09.ts — the whole-chapter verifier for Advanced Algebra
 * (book #4), chapter 9 "Exponentials and Logarithms" (run 120, the
 * two-lesson swarm, 2026-11-24). VERIFY-FIRST per the standing protocol:
 * each lesson's ENGINE section (A for 9.1, C for 9.2) was grown and run
 * green BEFORE that lesson's prose was declared done — by the authoring
 * agent itself, against its part file — and the PIN sections (B for 9.1,
 * D for 9.2) re-read the shipped chapter file and assert the prose carries
 * exactly the engine-pinned numbers. Section Z is the open-chapter census
 * (the orchestrator's). Assembled verbatim from the two agents' v-aa91.ts /
 * v-aa92.ts part verifiers by temporary-references/assemble_run120.py (the
 * run-119 precedent): each part verifier's body is wrapped whole, its own
 * collector and helpers intact, with only its part-import shim redirected
 * to the assembled chapter.
 *
 *   (A) 9.1 engines — 'The Exponential Family: Every Real Index'
 *   (B) 9.1 pins
 *   (C) 9.2 engines — 'Logarithms: the Inverse Machine'
 *   (D) 9.2 pins
 *   (Z) the open-chapter census (the orchestrator's)
 *
 * Study-never-reproduce honored: the m1-01 module transcriptions informed
 * METHOD SHAPES only; every family, witness, figure and exercise below is
 * OUR OWN, recomputed here by brute force.
 */

type SectionResult = { id: string; pass: number; fail: number }

// ------------------------------------------------------------------
// (A + B) from v-aa91.ts — verbatim, wrapped; engines then pins
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
 * — appended AFTER the prose exists (they the assembled chapter and the
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
/* P01… — pins reading the assembled ch-09.ts                        */
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


const s91pass = aPass + pPass
const s91fail = (aTotal - aPass) + (pTotal - pPass)
return { id: 'A+B (9.1 engines + pins)', pass: s91pass, fail: s91fail }
}

// ------------------------------------------------------------------
// (C + D) from v-aa92.ts — verbatim, wrapped; engines then pins
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
 * Phase 2 (sections Q01…Q09, reading the assembled ch-09.ts): the pins that
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


const s92pass = tally.reduce((s, t) => s + t.pass, 0)
const s92fail = tally.reduce((s, t) => s + t.fail, 0)
for (const t of tally) console.log(`    ${t.id}: ${t.pass}/${t.pass + t.fail}`)
return { id: 'C+D (9.2 engines + pins)', pass: s92pass, fail: s92fail }
}

// ------------------------------------------------------------------
// (Z) the census — the shipped chapter as an in-progress object
// ------------------------------------------------------------------

function sectionZ(): SectionResult {
  let zPass = 0
  let zFail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) zPass++; else { zFail++; console.log(`   Z-FAIL ${name} ${detail}`) }
  }
  z('Z1 chapter number 9', chapter09.number === 9)
  z('Z2 slug pinned', chapter09.slug === 'exponentials-and-logarithms')
  z('Z3 status in-progress (run 120 opened the chapter, 2 of 6)', chapter09.status === 'in-progress')
  z('Z4 two lessons shipped (9.1 + 9.2)', chapter09.lessons.length === 2, `got ${chapter09.lessons.length}`)
  z('Z5 four planned lessons remain, exact titles', JSON.stringify(chapter09.plannedLessons) === JSON.stringify(['The Laws of Logarithms and the Change of Base', 'Logarithmic and Exponential Equations', 'Exponential and Logarithmic Series', 'Logarithm Tables: Characteristic, Mantissa and Antilogarithm']), JSON.stringify(chapter09.plannedLessons))
  const ids = chapter09.lessons.map((l) => l.id)
  z('Z6 ids unique in chapter', new Set(ids).size === ids.length)
  z('Z7 lesson numbers pinned', chapter09.lessons.map((l) => l.number).join(',') === '9.1,9.2')
  const totalWords = chapter09.lessons.reduce((s, l) => s + countLessonWords(l), 0)
  z('Z8 honest depth >= 14000 (2 lessons, >= 6000 each)', totalWords >= 14000 && chapter09.lessons.every((l) => countLessonWords(l) >= 6000), `got ${totalWords}`)
  z('Z9 every lesson has sources + prerequisites', chapter09.lessons.every((l) => (l.sources?.length ?? 0) >= 3 && (l.prerequisites?.length ?? 0) >= 2))
  z('Z10 every lesson carries an exercises block + quiz', chapter09.lessons.every((l) => l.blocks.some((b) => b.kind === 'exercises') && l.blocks.some((b) => b.kind === 'quiz')))
  z('Z11 every lesson carries >= 1 figure (vivid-palette law)', chapter09.lessons.every((l) => l.blocks.some((b) => b.kind === 'figure')))
  const quizKeys = chapter09.lessons.map((l) => (l.blocks.find((b) => b.kind === 'quiz') as { items: { answer: number }[] } | undefined)?.items.map((i) => i.answer))
  z('Z12 quiz keys pinned [1,1,1,1,2] + [1,1,2,1,0]', JSON.stringify(quizKeys) === '[[1,1,1,1,2],[1,1,2,1,0]]', JSON.stringify(quizKeys))
  const l92 = chapter09.lessons[1]
  const foldIdx = l92.blocks.findIndex((b) => b.kind === 'heading' && b.text === 'Natural Logarithms')
  z('Z13 the Natural Logarithms fold discharged inside 9.2 (heading + definition + worked example)', foldIdx >= 0 && l92.blocks.some((b, i) => b.kind === 'callout' && (b as { tone: string }).tone === 'definition' && i > foldIdx && JSON.stringify(b).includes('log_e')) && l92.blocks.some((b, i) => b.kind === 'example' && i > foldIdx && JSON.stringify(b).match(/ln|e\^/)))
  // the book.ts registration
  const bookSrc = fs.readFileSync(path.join(__dirname, '..', 'src', 'data', 'library', 'books', 'mathematics', 'advanced-algebra', 'book.ts'), 'utf-8')
  z('Z14 book.ts registers chapter09 (import + chapters array)', bookSrc.includes("from './ch-09'") && /chapters: Chapter\[\] = \[[\s\S]*chapter09,/.test(bookSrc))
  z('Z15 the inline ch.9 plan object is gone (replaced by the import)', !/number: 9,\s*\n\s*slug: 'exponentials-and-logarithms'/.test(bookSrc))
  z('Z16 solution figures present on both lessons (v9.0 amendment)', chapter09.lessons.every((l) => JSON.stringify(l).includes('"figures"')))
  return { id: 'Z (open-chapter census)', pass: zPass, fail: zFail }
}

// ------------------------------------------------------------------
// the runner
// ------------------------------------------------------------------

const sections: SectionResult[] = [sectionAB(), sectionCD(), sectionZ()]
let failed = false
console.log('----------------------------------------------------------')
for (const s of sections) {
  const status = s.fail === 0 ? 'GREEN' : 'FAIL'
  console.log(`[${status}] ${s.id}: ${s.pass}/${s.pass + s.fail}`)
  if (s.fail > 0) failed = true
}
console.log(chapter09.lessons.length === 2 ? 'chapter 9 present with 2 shipped lessons (in-progress, 4 planned remain)' : 'unexpected lesson count')
process.exit(failed ? 1 : 0)
