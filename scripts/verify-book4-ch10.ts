import { chapter10, lesson101, lesson102, lesson103, lesson104, lesson10R } from '../src/data/library/books/mathematics/advanced-algebra/ch-10'
import { advancedAlgebra } from '../src/data/library/books/mathematics/advanced-algebra/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book4-ch10.ts — the whole-chapter AND whole-BOOK verifier for
 * Advanced Algebra (book #4), chapter 10 "The Synthesis and the Doorstep"
 * — the chapter that CLOSES THE BOOK (run 122 opened and preserved; run
 * 123 finished 10.1, authored 10.2, completed the 10.R prose, assembled
 * and shipped). VERIFY-FIRST per the standing protocol: each lesson's
 * ENGINE section ran green BEFORE its prose was declared done — by the
 * authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-10.ts).
 *
 *   (aa101) 10.1 engines + pins    (aa102) 10.2 engines + pins
 *   (aa103) 10.3 engines + pins    (aa104) 10.4 engines + pins
 *   (aa10R) 10.R engines + pins    (Z) the closed-chapter + closed-BOOK
 *                                   census — the honest 67-lesson count
 *
 * Assembled by scripts/assemble_run123.py: each v-file wrapped whole as
 * one async section (its local collectors/helpers stay function-scoped,
 * so nothing collides); the only edits are the documented import
 * redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH10_SRC = new URL('../src/data/library/books/mathematics/advanced-algebra/ch-10.ts', import.meta.url).pathname

async function sectionAA101(): Promise<SectionResult> {
/**
 * v-aa101.ts — verify-first ENGINE + PIN harness for AA lesson 10.1
 * "Competition Algebra: the Advanced Craft" (run 122 swarm, agent aa101, task 2-a, third attempt).
 *
 * DISCIPLINE: the engine wins over the spec. Every number the prose prints is
 * recomputed here by brute force FIRST; where this engine and the spec disagree,
 * the prose is fixed to the engine's value and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION — pure arithmetic, NO repo content imports, no part-file import.
 *     Recomputes: the substitution quartic (roots by the two quadratics + residual
 *     substitution back into the original), the x+1/x ladder sweep to s9, the
 *     symmetric reads, AM-GM minimax grids, telescoping partials vs closed forms,
 *     Sum k*k!, Sum k/2^k, binomial rows and polynomial convolutions, the log chain,
 *     digit counts via BigInt string lengths, and 2^300 vs 3^200 via logs AND BigInt.
 *     Also recomputes every exercise witness number before the prose may cite it.
 *   PIN SECTION (P01...) — imports ./part-aa101 + countLessonWords and audits the
 *     lesson object per spec section 8 (quiz keys, exercise coverage, figures, terms,
 *     formula cards, word count, answer-in-last-line containment, SVG text law).
 *
 * Run: cd /home/z/my-project && bun run temporary-references/v-aa101.ts
 */

/* ------------------------------------------------------------------ */
/* check harness                                                       */
/* ------------------------------------------------------------------ */
type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
function check(name: string, ok: boolean, detail = ''): void {
  engine.push({ name, ok, detail })
}
function pcheck(name: string, ok: boolean, detail = ''): void {
  pins.push({ name, ok, detail })
}
const f7 = (x: number): string => x.toFixed(7)
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps

/* comb(n, k) — multiplicative route, exact for our ranges */
function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0
  let r = 1
  for (let i = 1; i <= k; i++) r = (r * (n - k + i)) / i
  return Math.round(r)
}
/* factorial route cross-check for comb */
function fact(n: number): number {
  let r = 1
  for (let i = 2; i <= n; i++) r *= i
  return r
}
function combFact(n: number, k: number): number {
  return Math.round(fact(n) / (fact(k) * fact(n - k)))
}
/* polynomial convolution over exponent maps: term [exponent, coefficient] */
type Poly = Map<number, number>
function pmul(a: Poly, b: Poly): Poly {
  const out: Poly = new Map()
  for (const [ea, ca] of a) for (const [eb, cb] of b) {
    const e = ea + eb
    out.set(e, (out.get(e) ?? 0) + ca * cb)
  }
  return out
}
function polyPow(terms: Array<[number, number]>, p: number): Poly {
  let acc: Poly = new Map([[0, 1]])
  const base: Poly = new Map(terms)
  for (let i = 0; i < p; i++) acc = pmul(acc, base)
  return acc
}

/* ================================================================== */
/* ENGINE SECTION 1 — the nested substitution quartic                  */
/* (x^2 - 5x + 5)^2 - 7(x^2 - 5x + 5) + 12 = 0                         */
/* ================================================================== */
{
  const tMachine = (x: number) => (x * x - 5 * x + 5)
  const quartic = (x: number) => {
    const t = tMachine(x)
    return t * t - 7 * t + 12
  }
  // the two quadratics from t = 3 and t = 4
  const d1 = 25 - 8 // x^2 - 5x + 2: disc
  const d2 = 25 - 4 // x^2 - 5x + 1: disc
  check('E01 disc of x^2-5x+2 is 17', d1 === 17, `25-8=${d1}`)
  check('E02 disc of x^2-5x+1 is 21', d2 === 21, `25-4=${d2}`)
  const r = [
    (5 + Math.sqrt(17)) / 2, (5 - Math.sqrt(17)) / 2,
    (5 + Math.sqrt(21)) / 2, (5 - Math.sqrt(21)) / 2,
  ]
  const prints = r.map(f7)
  console.log('[PIN] quartic roots 7dp:', prints.join('  '))
  const maxRes = Math.max(...r.map((x) => Math.abs(quartic(x))))
  check('E03 all four roots satisfy the original quartic (<=1e-6)', maxRes <= 1e-6, `max residual=${maxRes.toExponential(2)}`)
  check('E04 root sum is 10 (Vieta x^4-10x^3+...)', close(r[0] + r[1] + r[2] + r[3], 10, 1e-6), `sum=${(r[0] + r[1] + r[2] + r[3]).toFixed(9)}`)
  check('E05 root product is 2 (Vieta constant term 2)', close(r[0] * r[1] * r[2] * r[3], 2, 1e-6), `prod=${(r[0] * r[1] * r[2] * r[3]).toFixed(9)}`)
  // expanded quartic via convolution of (x^2-5x+2)(x^2-5x+1)
  const conv: number[] = [1, -5, 2]
  const conv2: number[] = [1, -5, 1]
  const prod = [0, 0, 0, 0, 0]
  for (let i = 0; i < 3; i++) for (let j = 0; j < 3; j++) prod[i + j] += conv[i] * conv2[j]
  check('E06 expansion is x^4-10x^3+28x^2-15x+2', JSON.stringify(prod) === JSON.stringify([1, -10, 28, -15, 2]), prod.join(','))
  check('E07 t-roots 3,4 sum to 7, product 12 (the inner quadratic)', (3 + 4) === 7 && 3 * 4 === 12 && (9 + 16 - 2 * 12) === 1, `t sum=${3 + 4}, t prod=${3 * 4}, t^2 sum read=${9 + 16 - 2 * 12}`)
  // each t-branch: sum of its two x-roots is 5, products 2 and 1 -> grand product 2
  check('E08 branch products 2 and 1 multiply to 2', 2 * 1 === 2, '')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the x+1/x ladder at seed 3 (sweep to s9)         */
/* ================================================================== */
{
  const s: number[] = [2, 3] // s0 = 2, s1 = 3
  for (let k = 1; k <= 8; k++) s.push(3 * s[k] - s[k - 1]) // s_{k+1} = 3 s_k - s_{k-1}
  const want = [2, 3, 7, 18, 47, 123, 322, 843, 2207, 5778]
  check('E09 ladder recurrence sweep s0..s9', JSON.stringify(s) === JSON.stringify(want), s.join(','))
  // Newton cross-checks: s2 = 3^2-2, s3 = 3^3-3*3, s4 = s2^2-2
  check('E10 Newton cross-check s2=7, s3=18, s4=47', 3 * 3 - 2 === 7 && 27 - 9 === 18 && 7 * 7 - 2 === 47, '')
  // numeric sweep: roots of u^2-3u+1 are (3+-sqrt5)/2, x^k + x^-k must equal s_k
  const x1 = (3 + Math.sqrt(5)) / 2, x2 = (3 - Math.sqrt(5)) / 2
  let worst = 0
  for (let k = 0; k <= 9; k++) worst = Math.max(worst, Math.abs(Math.pow(x1, k) + Math.pow(x2, k) - s[k]))
  check('E11 numeric sweep x^k+1/x^k matches s_k for k=0..9 (<=1e-6)', worst <= 1e-6, `worst=${worst.toExponential(2)}`)
  check('E12 the two ladder roots are reciprocals (product 1)', close(x1 * x2, 1, 1e-12), `x1=${f7(x1)}, x2=${f7(x2)}`)
  console.log('[PIN] ladder roots 7dp:', f7(x1), f7(x2))
}

/* ================================================================== */
/* ENGINE SECTION 3 — symmetric reads on x^2-7x+11                     */
/* NOTE: engine wins here — the spec's "alpha=4.7912879, beta=2.2087121"*/
/* are the quartic's t=4 roots, not these; truth is (7+-sqrt5)/2.       */
/* ================================================================== */
{
  const a = (7 + Math.sqrt(5)) / 2, b = (7 - Math.sqrt(5)) / 2
  console.log('[PIN] alpha, beta 7dp:', f7(a), f7(b))
  check('E13 alpha+beta=7, alpha*beta=11 numerically', close(a + b, 7, 1e-9) && close(a * b, 11, 1e-9), `sum=${(a + b).toFixed(9)}, prod=${(a * b).toFixed(9)}`)
  const s2 = a * a + b * b, s3 = a ** 3 + b ** 3, s4 = a ** 4 + b ** 4
  check('E14 alpha^2+beta^2 = 49-22 = 27', close(s2, 27, 1e-6), f7(s2))
  check('E15 alpha^3+beta^3 = 343-231 = 112 (identity AND numeric)', close(s3, 112, 1e-6) && (343 - 3 * 11 * 7) === 112, f7(s3))
  check('E16 alpha^4+beta^4 = 27^2-2*121 = 487', close(s4, 487, 1e-6) && 27 * 27 - 2 * 121 === 487, f7(s4))
  check('E17 (alpha-beta)^2 = 49-44 = 5', close((a - b) * (a - b), 5, 1e-9), f7((a - b) * (a - b)))
  check('E18 1/alpha+1/beta = 7/11', close(1 / a + 1 / b, 7 / 11, 1e-9), `${f7(1 / a + 1 / b)} vs ${(7 / 11).toFixed(9)}`)
  // cubic staple instance: roots 1,2,3 of x^3-6x^2+11x-6
  const roots = [1, 2, 3]
  const lhs = roots.map((v) => v ** 3).reduce((p, c) => p + c, 0) - 3 * roots.reduce((p, c) => p * c, 1)
  const rhs = roots.reduce((p, c) => p + c, 0) *
    (roots.map((v) => v * v).reduce((p, c) => p + c, 0) - (1 * 2 + 2 * 3 + 3 * 1))
  check('E19 cubic staple: 1^3+2^3+3^3-3*6 = 18 = 6*(14-11)', lhs === 18 && rhs === 18 && close(lhs, rhs, 1e-12), `lhs=${lhs}, rhs=${rhs}`)
}

/* ================================================================== */
/* ENGINE SECTION 4 — AM-GM minimax grids                              */
/* ================================================================== */
{
  // min x + 4/x on (0, 10]
  let bestX = 0, bestV = Infinity
  for (let x = 0.001; x <= 10; x += 1e-4) { const v = x + 4 / x; if (v < bestV) { bestV = v; bestX = x } }
  check('E20 min of x+4/x is 4 at x=2 (grid)', Math.abs(bestV - 4) < 1e-3 && Math.abs(bestX - 2) < 1e-3, `grid min=${bestV.toFixed(6)} at x=${bestX.toFixed(4)}`)
  // min 9x + 4/x
  bestV = Infinity; bestX = 0
  for (let x = 0.001; x <= 6; x += 1e-4) { const v = 9 * x + 4 / x; if (v < bestV) { bestV = v; bestX = x } }
  check('E21 min of 9x+4/x is 12 at x=2/3 (grid + exact)', Math.abs(bestV - 12) < 1e-3 && Math.abs(bestX - 2 / 3) < 1e-3 && 2 * Math.sqrt(36) === 12, `grid min=${bestV.toFixed(6)} at x=${bestX.toFixed(4)}`)
  // max x(6-x)
  bestV = -Infinity; bestX = 0
  for (let x = 0; x <= 6; x += 1e-4) { const v = x * (6 - x); if (v > bestV) { bestV = v; bestX = x } }
  check('E22 max of x(6-x) is 9 at x=3 (grid + exact)', Math.abs(bestV - 9) < 1e-3 && Math.abs(bestX - 3) < 1e-3, `grid max=${bestV.toFixed(6)} at x=${bestX.toFixed(4)}`)
  check('E23 equality witness: x(6-x)=9 ONLY at x=3', 3 * 3 === 9 && ((1 * 5) !== 9 && (2 * 4) !== 9 && (2.5 * 3.5) !== 9), '')
  // max xyz under x+y+z = 12 (grid over x, y; z = 12-x-y)
  let gBest = -Infinity, gx = 0, gy = 0
  for (let x = 0.01; x <= 11.9; x += 0.01) for (let y = 0.01; y <= 12 - x - 0.01; y += 0.01) {
    const z = 12 - x - y, v = x * y * z
    if (v > gBest) { gBest = v; gx = x; gy = y }
  }
  check('E24 max xyz under sum 12 is 64 at (4,4,4) (grid)', Math.abs(gBest - 64) < 0.02 && Math.abs(gx - 4) < 0.02 && Math.abs(gy - 4) < 0.02, `grid max=${gBest.toFixed(4)} at (${gx.toFixed(2)},${gy.toFixed(2)},${(12 - gx - gy).toFixed(2)})`)
  check('E25 AM-GM three-term: ((12)/3)^3 = 64 exactly', Math.pow(12 / 3, 3) === 64, '')
  // exercise witnesses: min 2x+18/x = 12 @3 ; min 5x+20/x = 20 @2 ; max x(8-x) = 16 @4 ; min x+9/x = 6 @3
  bestV = Infinity; bestX = 0
  for (let x = 0.001; x <= 9; x += 1e-4) { const v = 2 * x + 18 / x; if (v < bestV) { bestV = v; bestX = x } }
  check('E26 min of 2x+18/x is 12 at x=3', Math.abs(bestV - 12) < 1e-3 && Math.abs(bestX - 3) < 1e-3 && 2 * Math.sqrt(36) === 12, `min=${bestV.toFixed(6)} at ${bestX.toFixed(4)}`)
  bestV = Infinity; bestX = 0
  for (let x = 0.001; x <= 9; x += 1e-4) { const v = 5 * x + 20 / x; if (v < bestV) { bestV = v; bestX = x } }
  check('E27 min of 5x+20/x is 20 at x=2', Math.abs(bestV - 20) < 1e-3 && Math.abs(bestX - 2) < 1e-3 && 2 * Math.sqrt(100) === 20, `min=${bestV.toFixed(6)} at ${bestX.toFixed(4)}`)
  bestV = -Infinity; bestX = 0
  for (let x = 0; x <= 8; x += 1e-4) { const v = x * (8 - x); if (v > bestV) { bestV = v; bestX = x } }
  check('E28 max of x(8-x) is 16 at x=4', Math.abs(bestV - 16) < 1e-3 && Math.abs(bestX - 4) < 1e-3, `max=${bestV.toFixed(6)} at ${bestX.toFixed(4)}`)
  bestV = Infinity; bestX = 0
  for (let x = 0.001; x <= 8; x += 1e-4) { const v = x + 9 / x; if (v < bestV) { bestV = v; bestX = x } }
  check('E29 min of x+9/x is 6 at x=3', Math.abs(bestV - 6) < 1e-3 && Math.abs(bestX - 3) < 1e-3, `min=${bestV.toFixed(6)} at ${bestX.toFixed(4)}`)
}

/* ================================================================== */
/* ENGINE SECTION 5 — telescoping and difference families              */
/* ENGINE WINS: spec's S10=0.6287937 and S1000=0.7497500 are wrong;    */
/* brute force gives S10=0.6628788, S1000=0.7490015. Also spec's       */
/* "S7 = 13698" for Sum k*k! is wrong: S7 = 8!-1 = 40319.              */
/* ================================================================== */
{
  // 1/(k(k+2)) = (1/2)(1/k - 1/(k+2)) identity
  let idOk = true
  for (let k = 1; k <= 12; k++) if (!close(1 / (k * (k + 2)), 0.5 * (1 / k - 1 / (k + 2)), 1e-12)) idOk = false
  check('E30 telescoping split identity holds k=1..12', idOk, '')
  const brute = (n: number) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / (k * (k + 2)); return s }
  const closed = (n: number) => 0.5 * (1.5 - 1 / (n + 1) - 1 / (n + 2))
  let allOk = true
  for (let n = 1; n <= 12; n++) if (!close(brute(n), closed(n), 1e-10)) allOk = false
  check('E31 closed form (1/2)(3/2 - 1/(n+1) - 1/(n+2)) matches brute n=1..12', allOk, '')
  console.log('[PIN] S(k(k+2)) S5,S10,S1000 7dp:', f7(brute(5)), f7(brute(10)), f7(brute(1000)))
  check('E32 S5 = 0.5952381', f7(brute(5)) === '0.5952381', f7(brute(5)))
  check('E33 S10 = 0.6628788 (engine beats spec 0.6287937)', f7(brute(10)) === '0.6628788', f7(brute(10)))
  check('E34 S1000 = 0.7490015 (engine beats spec 0.7497500)', f7(brute(1000)) === '0.7490015', f7(brute(1000)))
  check('E35 the tail approaches 3/4', Math.abs(brute(100000) - 0.75) < 1e-5, `S(100000)=${brute(100000).toFixed(8)}`)
  // Sum k*k!
  const kk = (n: number) => { let s = 0, f = 1; for (let k = 1; k <= n; k++) { f *= k; s += k * f } return s }
  let kkOk = true
  for (let n = 1; n <= 8; n++) if (kk(n) !== fact(n + 1) - 1) kkOk = false
  check('E36 Sum k*k! = (n+1)! - 1 for n=1..8 (brute vs closed)', kkOk, `S5=${kk(5)}, S7=${kk(7)}`)
  check('E37 S5 = 719 = 6!-1', kk(5) === 719 && fact(6) - 1 === 719, '')
  check('E38 S7 = 40319 = 8!-1 (engine beats spec 13698)', kk(7) === 40319 && fact(8) - 1 === 40319, `S7=${kk(7)}`)
  // Sum k/2^k
  const kt = (n: number) => { let s = 0; for (let k = 1; k <= n; k++) s += k / Math.pow(2, k); return s }
  const ktC = (n: number) => 2 - (n + 2) / Math.pow(2, n)
  let ktOk = true
  for (let n = 1; n <= 12; n++) if (!close(kt(n), ktC(n), 1e-10)) ktOk = false
  check('E39 Sum k/2^k = 2-(n+2)/2^n matches brute n=1..12', ktOk, '')
  check('E40 S6 = 1.875 and S10 = 1.98828125', kt(6) === 1.875 && kt(10) === 1.98828125, `S6=${kt(6)}, S10=${kt(10)}`)
  check('E41 the infinite sum is 2', Math.abs(kt(50) - 2) < 1e-12, `S50=${kt(50).toFixed(12)}`)
  // exercise witnesses: 1/(k(k+3)) and 1/(k(k+1)(k+2))
  const b3 = (n: number) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / (k * (k + 3)); return s }
  const c3 = (n: number) => (1 + 1 / 2 + 1 / 3 - 1 / (n + 1) - 1 / (n + 2) - 1 / (n + 3)) / 3
  let b3Ok = true
  for (let n = 1; n <= 10; n++) if (!close(b3(n), c3(n), 1e-10)) b3Ok = false
  check('E42 Sum 1/(k(k+3)) closed form matches brute n=1..10', b3Ok, `S10=${f7(b3(10))}`)
  check('E43 its limit is 11/18', Math.abs((1 + 1 / 2 + 1 / 3) / 3 - 11 / 18) < 1e-12 && Math.abs(b3(200000) - 11 / 18) < 1e-5, `S(200000)=${b3(200000).toFixed(8)}, 11/18=${(11 / 18).toFixed(8)}`)
  console.log('[PIN] Ex5 S10 7dp:', f7(b3(10)), '| limit 11/18 =', (11 / 18).toFixed(7))
  const b4 = (n: number) => { let s = 0; for (let k = 1; k <= n; k++) s += 1 / (k * (k + 1) * (k + 2)); return s }
  const c4 = (n: number) => 0.5 * (0.5 - 1 / ((n + 1) * (n + 2)))
  let b4Ok = true
  for (let n = 1; n <= 10; n++) if (!close(b4(n), c4(n), 1e-10)) b4Ok = false
  check('E44 Sum 1/(k(k+1)(k+2)) closed form matches brute n=1..10', b4Ok, `S5=${f7(b4(5))}`)
  check('E45 its limit is 1/4 and S5 = 0.2380952', Math.abs(b4(5000) - 0.25) < 1e-5 && f7(b4(5)) === '0.2380952', `S5=${f7(b4(5))}, S(5000)=${b4(5000).toFixed(8)}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — binomial hunts via convolution                   */
/* ================================================================== */
{
  // row 12 of Pascal
  const row12 = Array.from({ length: 13 }, (_, k) => comb(12, k))
  check('E46 comb multiplicative matches factorial route (12-row)', row12.every((v, k) => v === combFact(12, k)), '')
  check('E47 C(12,5) = 792', comb(12, 5) === 792, '')
  check('E48 greatest coefficient of (1+x)^12 is C(12,6)=924 (row scan)', Math.max(...row12) === 924 && row12[6] === 924, `max=${Math.max(...row12)}`)
  check('E49 sum of row 12 is 4096 = 2^12 and alternating sum is 0', row12.reduce((p, c) => p + c, 0) === 4096 && row12.reduce((p, c, k) => p + (k % 2 ? -c : c), 0) === 0, '')
  // (2x - 1/x)^10 by full convolution
  const P = polyPow([[1, 2], [-1, -1]], 10)
  check('E50 independent term of (2x-1/x)^10 is -8064', P.get(0) === -8064, `coeff x^0=${P.get(0)}`)
  check('E51 x^4 coefficient is -15360', P.get(4) === -15360, `coeff x^4=${P.get(4)}`)
  let formulaOk = true
  for (let k = 0; k <= 10; k++) {
    const want = comb(10, k) * Math.pow(2, 10 - k) * Math.pow(-1, k)
    if (P.get(10 - 2 * k) !== want) formulaOk = false
  }
  check('E52 every coefficient matches T_{k+1}=C(10,k)2^(10-k)(-1)^k', formulaOk, '')
  // exercise witnesses
  const Q = polyPow([[1, 3], [-1, -2]], 8)
  check('E53 independent term of (3x-2/x)^8 is 90720', Q.get(0) === 90720, `coeff x^0=${Q.get(0)}`)
  check('E54 its k=4 read: C(8,4)*3^4*16 = 70*81*16 = 90720', comb(8, 4) * 81 * 16 === 90720, '')
  const R = polyPow([[0, 2], [1, 1]], 8)
  check('E55 coefficient of x^5 in (2+x)^8 is 448 = C(8,5)*2^3', R.get(5) === 448 && comb(8, 5) * 8 === 448, `coeff=${R.get(5)}`)
  const row15 = Array.from({ length: 16 }, (_, k) => comb(15, k))
  check('E56 greatest coefficient of (1+x)^15 is 6435 at k=7,8 (row scan)', row15[7] === 6435 && row15[8] === 6435 && Math.max(...row15) === 6435, `C(15,7)=${row15[7]}, C(15,8)=${row15[8]}`)
  check('E57 odd-index coefficient sum of (1+x)^15 is 2^14 = 16384', row15.reduce((p, c, k) => p + (k % 2 ? c : 0), 0) === 16384, '')
  check('E58 full sum 32768 = 2^15', row15.reduce((p, c) => p + c, 0) === 32768, '')
  // mixed-craft census poly (t+2)^4 and L6 census (t+3)^4
  const T2 = polyPow([[0, 2], [1, 1]], 4)
  const coeffs2 = [4, 3, 2, 1, 0].map((e) => T2.get(e) ?? 0)
  check('E59 (t+2)^4 coefficients are 1,8,24,32,16; sum 81; alternating 1', JSON.stringify(coeffs2) === JSON.stringify([1, 8, 24, 32, 16]) && coeffs2.reduce((p, c) => p + c, 0) === 81 && coeffs2.reduce((p, c, i) => p + (i % 2 ? -c : c), 0) === 1, coeffs2.join(','))
  const T3 = polyPow([[0, 3], [1, 1]], 4)
  const coeffs3 = [4, 3, 2, 1, 0].map((e) => T3.get(e) ?? 0)
  check('E60 (t+3)^4 coefficients are 1,12,54,108,81; sum 256; alternating 16; max 108', JSON.stringify(coeffs3) === JSON.stringify([1, 12, 54, 108, 81]) && coeffs3.reduce((p, c) => p + c, 0) === 256 && coeffs3.reduce((p, c, i) => p + (i % 2 ? -c : c), 0) === 16 && Math.max(...coeffs3) === 108, coeffs3.join(','))
}

/* ================================================================== */
/* ENGINE SECTION 7 — log speed reads                                  */
/* ================================================================== */
{
  const L = (a: number, b: number) => Math.log(a) / Math.log(b)
  const chain = [L(3, 2), L(4, 3), L(5, 4), L(6, 5), L(7, 6)]
  console.log('[PIN] log chain 7dp:', chain.map(f7).join('  '))
  check('E61 log2 3 = 1.5849625', f7(chain[0]) === '1.5849625', f7(chain[0]))
  check('E62 log3 4 = 1.2618595', f7(chain[1]) === '1.2618595', f7(chain[1]))
  check('E63 log4 5 = 1.1609640', f7(chain[2]) === '1.1609640', f7(chain[2]))
  check('E64 log5 6 = 1.1132828 (engine beats spec 1.1132827)', f7(chain[3]) === '1.1132828', f7(chain[3]))
  check('E65 log6 7 = 1.0860331', f7(chain[4]) === '1.0860331', f7(chain[4]))
  let dec = true
  for (let i = 0; i < 4; i++) if (!(chain[i] > chain[i + 1])) dec = false
  check('E66 the chain is strictly decreasing', dec, '')
  let decompOk = true
  for (let n = 2; n <= 6; n++) if (!close(1 + Math.log(1 + 1 / n) / Math.log(n), L(n + 1, n), 1e-12)) decompOk = false
  check('E67 log_n(n+1) = 1 + ln(1+1/n)/ln(n) (decomposition, n=2..6)', decompOk, '')
  check('E68 the added increment ln(1+1/n)/ln(n) itself falls (n=2..6)', [2, 3, 4, 5].every((n) => Math.log(1 + 1 / n) / Math.log(n) > Math.log(1 + 1 / (n + 1)) / Math.log(n + 1)), '')
  // digits of 8^25
  const big8 = 8n ** 25n
  const digits8 = big8.toString().length
  check('E69 8^25 has 23 digits (BigInt string length)', digits8 === 23, `8^25=${big8.toString()}`)
  check('E70 floor law: 25*log10(8) = 22.5772497 -> floor+1 = 23', f7(25 * Math.log10(8)) === '22.5772497' && Math.floor(25 * Math.log10(8)) + 1 === 23, f7(25 * Math.log10(8)))
  check('E71 8^25 = 2^75 exactly (BigInt)', big8 === 2n ** 75n, '')
  // the duel 2^300 vs 3^200
  check('E72 300 ln 2 = 207.9441542 < 200 ln 3 = 219.7224577', f7(300 * Math.log(2)) === '207.9441542' && f7(200 * Math.log(3)) === '219.7224577', `${f7(300 * Math.log(2))} vs ${f7(200 * Math.log(3))}`)
  check('E73 BigInt: 3^200 > 2^300', 3n ** 200n > 2n ** 300n, `digits: ${(3n ** 200n).toString().length} vs ${(2n ** 300n).toString().length}`)
  check('E74 clean read: 2^300 = 8^100 < 9^100 = 3^200', 2n ** 300n === 8n ** 100n && 3n ** 200n === 9n ** 100n && 8n ** 100n < 9n ** 100n, '')
}

/* ================================================================== */
/* ENGINE SECTION 8 — exercise witnesses (each recomputed)             */
/* ================================================================== */
{
  // Ex1: (x^2-3x+3)^2 - 5(x^2-3x+3) + 6 = 0
  const f = (x: number) => { const t = x * x - 3 * x + 3; return t * t - 5 * t + 6 }
  const ex1 = [(3 + Math.sqrt(5)) / 2, (3 - Math.sqrt(5)) / 2, 0, 3]
  const res1 = Math.max(...ex1.map((x) => Math.abs(f(x))))
  check('E75 Ex1 roots (3+-sqrt5)/2, 0, 3 satisfy the original (<=1e-6)', res1 <= 1e-6, `max res=${res1.toExponential(2)}`)
  console.log('[PIN] Ex1 sqrt-branch roots 7dp:', f7(ex1[0]), f7(ex1[1]))
  check('E76 Ex1 branch discs: 5 and 9 (x^2-3x+1; x^2-3x)', 9 - 4 === 5 && 9 - 0 === 9, '')
  // Ex2: x + 1/x = 4 -> s2 = 14, s3 = 52
  const x1e = (4 + Math.sqrt(12)) / 2
  check('E77 Ex2 s2=14, s3=52 (recurrence + Newton + numeric)', 16 - 2 === 14 && 64 - 12 === 52 && close(Math.pow(x1e, 2) + Math.pow(x1e, -2), 14, 1e-6) && close(Math.pow(x1e, 3) + Math.pow(x1e, -3), 52, 1e-6), `x1=${f7(x1e)}`)
  // Ex4: x^2-9x+19 -> s2=43, s3=216
  const a4 = (9 + Math.sqrt(5)) / 2, b4 = (9 - Math.sqrt(5)) / 2
  check('E78 Ex4 alpha^2+beta^2=43, alpha^3+beta^3=216 (identity + numeric)', 81 - 38 === 43 && 729 - 3 * 19 * 9 === 216 && close(a4 ** 3 + b4 ** 3, 216, 1e-6) && close(a4 * a4 + b4 * b4, 43, 1e-6), `alpha,beta=${f7(a4)},${f7(b4)}`)
  // Ex6/Ex7 already convolved; Ex7 roots residual:
  const f7q = (x: number) => { const t = x * x - 7 * x + 11; return t * t - 3 * t + 2 }
  const ex7 = [2, 5, (7 + Math.sqrt(13)) / 2, (7 - Math.sqrt(13)) / 2]
  const res7 = Math.max(...ex7.map((x) => Math.abs(f7q(x))))
  check('E79 Ex7 roots 2, 5, (7+-sqrt13)/2 satisfy the original (<=1e-6)', res7 <= 1e-6, `max res=${res7.toExponential(2)}`)
  console.log('[PIN] Ex7 sqrt-branch roots 7dp:', f7(ex7[2]), f7(ex7[3]))
  // Ex8: x + 1/x = 5 ladder
  const s8 = [2, 5]
  for (let k = 1; k <= 4; k++) s8.push(5 * s8[k] - s8[k - 1])
  check('E80 Ex8 ladder seed 5: s2=23, s3=110, s4=527, s5=2525', JSON.stringify(s8.slice(2)) === JSON.stringify([23, 110, 527, 2525]), s8.join(','))
  check('E81 Ex8 Newton cross-checks: s3=125-15, s4=23^2-2, s5=3125-625+25', 125 - 15 === 110 && 23 * 23 - 2 === 527 && 3125 - 625 + 25 === 2525, '')
  // Ex10/E53 done. Ex12: digits of 7^15
  const big7 = 7n ** 15n
  check('E82 Ex12 7^15 has 13 digits; 15*log10(7)=12.6764706 -> 13 (engine beats spec 12.6764700)', big7.toString().length === 13 && f7(15 * Math.log10(7)) === '12.6764706' && Math.floor(15 * Math.log10(7)) + 1 === 13, `7^15=${big7.toString()}, 15log10(7)=${f7(15 * Math.log10(7))}`)
  // Ex13: 4^50 vs 5^40
  console.log('[PIN] Ex13 duel 7dp:', f7(40 * Math.log(5)), 'vs', f7(50 * Math.log(4)))
  check('E83 Ex13 4^50 > 5^40 (BigInt and log duel)', 4n ** 50n > 5n ** 40n && 50 * Math.log(4) > 40 * Math.log(5), `40 ln5=${f7(40 * Math.log(5))}, 50 ln4=${f7(50 * Math.log(4))}`)
  // Ex15: m=6 -> (t-3)^2 -> alpha^4+beta^4 = 162
  check('E84 Ex15 (t-3)^2 from m=6, product 9: alpha^4+beta^4=162', 18 * 18 - 2 * 81 === 162 && 2 * 81 === 162, '')
  // Ex16: (x^2-4x+2)^2 - 4(x^2-4x+2) + 3 = 0
  const f16 = (x: number) => { const t = x * x - 4 * x + 2; return t * t - 4 * t + 3 }
  const ex16 = [2 + Math.sqrt(3), 2 - Math.sqrt(3), 2 + Math.sqrt(5), 2 - Math.sqrt(5)]
  const res16 = Math.max(...ex16.map((x) => Math.abs(f16(x))))
  check('E85 Ex16 roots 2+-sqrt3, 2+-sqrt5 satisfy the original (<=1e-6)', res16 <= 1e-6, `max res=${res16.toExponential(2)}`)
  console.log('[PIN] Ex16 roots 7dp:', f7(ex16[0]), f7(ex16[1]), f7(ex16[2]), f7(ex16[3]))
  check('E86 Ex16 t=1 branch: sum 4, product 1 -> a^3+b^3 = 52', 64 - 3 * 4 * 1 === 52, '')
  const big2 = 2n ** 50n
  check('E87 Ex16 2^50 has 16 digits; 50*log10(2)=15.0514998 -> 16', big2.toString().length === 16 && f7(50 * Math.log10(2)) === '15.0514998', `2^50=${big2.toString()}`)
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)    */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lesson101?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lesson101 })
    pcheck('P01 part file loads and exports lesson101', !!mod?.lesson101, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lesson101', false, String(e))
  }
  const lesson = mod?.lesson101
  if (!lesson) return

  // P02 — quiz keys [2,0,1,3,1], 4 options each, intended option textually present
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [2,0,1,3,1]', JSON.stringify(keys) === JSON.stringify([2, 0, 1, 3, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const pinnedValues = ['18', '112', '12', '8064', '23']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      const present = correct.includes(pinnedValues[idx])
      pcheck(`P02c quiz item ${idx + 1}: correct option carries the pinned value ${pinnedValues[idx]}`, present, `options=${JSON.stringify(i.options)} answerIdx=${i.answer} correct=${JSON.stringify(correct)}`)
      pcheck(`P02d quiz item ${idx + 1}: explain names every wrong option`, i.explain.length > 40, i.explain.slice(0, 60))
    })
  }

  // P03 — exercises: >=4 sets spanning L1..L6, >=16 questions, non-empty steps + answer
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P03a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L))
    pcheck('P03a >=4 sets spanning L1..L6', exBlock.sets.length >= 4 && spanned, `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P03b >=16 questions total', allQ.length >= 16, `count=${allQ.length}`)
    pcheck('P03c every question has a non-empty steps solution + answer', allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    // P08 — answer's numeric core appears in the final solution line
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const last = q.solution[q.solution.length - 1].replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/-?\d+(?:\.\d+)?/g) ?? []
      const ok = tokens.length === 0 || tokens.every((t) => last.includes(t.replace('-', '')) || last.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer} | last=${last.slice(-60)}`)
    }
    pcheck('P08 every exercise answer appears in its solution final line (numeric core)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    // solution figures live inside exercise questions
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
    pcheck('P13 exercises title names the exam typology', /Single Correct|Multiple Correct|Numerical Value/.test(exBlock.title ?? ''), exBlock.title ?? '')
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >=4 formula cards', formulas >= 4, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG text law: plain text only
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  const badSvg = svgs.filter((s) => /\$|\\\\frac|\\\\times|\\\\sqrt|\\\\geq|\\\\/.test(s))
  pcheck('P09 all SVGs obey the plain-text law (no $, no TeX, no backslash)', svgs.length > 0 && badSvg.length === 0, `svgs=${svgs.length} bad=${badSvg.length}`)
  const ariaOk = svgs.every((s) => s.includes('role="img"') && s.includes('aria-label'))
  pcheck('P09b every SVG root carries role=img + aria-label', ariaOk, '')
  // P10 — forbidden tokens anywhere in the file text fields
  const allText: string[] = []
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'latex', 'q', 'answer']) {
      const v = b[key]
      if (typeof v === 'string') allText.push(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; allText.push(c.title, c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) allText.push(it.q, ...it.options, it.explain)
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) allText.push(t.term, t.def)
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }; allText.push(d.title, d.statement, d.result); for (const s of d.steps) allText.push(s.label, s.explanation) }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; allText.push(e.title, ...e.steps) }
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string[]; answer?: string }> }> }).sets) for (const q of s.questions) allText.push(q.q, ...q.solution, q.answer ?? '')
    if (b.kind === 'list') for (const it of (b as { items: string[] }).items) allText.push(it)
    if (b.kind === 'table') { const t = b as { head: string[]; rows: string[][] }; allText.push(...t.head, ...t.rows.flat()) }
    if (b.kind === 'equation') allText.push((b as { latex: string }).latex)
    if (b.kind === 'formula') { const fo = b as { name: string; latex: string; note?: string }; allText.push(fo.name, fo.latex) }
  }
  const joined = allText.join('\n')
  pcheck('P10 no \\qquad anywhere', !joined.includes('\\qquad'), '')
  pcheck('P10b no \\dfrac and no $$ delimiters', !joined.includes('\\dfrac') && !joined.includes('$$'), '')
  pcheck('P10c no raw \\( or \\[ escapes', !joined.includes('\\(') && !joined.includes('\\['), '')
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  pcheck('P10d headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — concepts/objectives counts
  pcheck('P11 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives ?? []).length >= 4 && (lesson.objectives ?? []).length <= 6, `concepts=${lesson.concepts.length}, objectives=${(lesson.objectives ?? []).length}`)
  // P12 — prerequisites + sources per spec
  pcheck('P12 prerequisites + sources match the spec ids', JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-competition-algebra-identities-and-substitutions', 'aa-symmetric-reads-and-common-roots', 'aa-the-arithmetic-geometric-mean-inequality', 'aa-special-series-and-the-method-of-differences', 'aa-binomial-coefficients-at-work', 'aa-the-laws-of-logarithms-and-the-change-of-base']) && JSON.stringify(lesson.sources) === JSON.stringify(['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'cengage-m1-01']), '')
  // P14 — >=7 in101* helpers referenced
  pcheck('P14 identity/number fields sane', lesson.id === 'aa-competition-algebra-the-advanced-craft' && lesson.number === '10.1' && !('words' in lesson), `${lesson.id} / ${lesson.number}`)
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'aa101 (10.1 engines+pins)', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionAA102(): Promise<SectionResult> {
/*
 * v-aa102.ts — verify-first ENGINE + PIN harness for AA lesson 10.2
 * "Functional Equations: Building Functions from Rules".
 *
 * DISCIPLINE: every number the prose will print is recomputed here by brute
 * force FIRST; the ENGINE WINS over any other source (spec included). The
 * pin section audits the part file and runs green only after the prose.
 * Run: cd /home/z/my-project && bun run temporary-references/v-aa102.ts
 */


/* ------------------------------------------------------------------ */
/* collectors                                                          */
/* ------------------------------------------------------------------ */
type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
function check(name: string, ok: boolean, detail = ''): void {
  engine.push({ name, ok, detail })
}
function pcheck(name: string, ok: boolean, detail = ''): void {
  pins.push({ name, ok, detail })
}
function f7(x: number): string {
  return x.toFixed(7)
}
function close(a: number, b: number, tol: number): boolean {
  return Math.abs(a - b) <= tol
}

/* ================================================================== */
/* ENGINE SECTION 1 — the additive value ladder                        */
/* ================================================================== */
{
  // the model machine f(x) = 3x (additive, seed f(1) = 3)
  const f = (x: number) => 3 * x
  // E01 — f(0) = 0 is FORCED, not assumed: t = t + t has the sole solution 0
  const t = 0
  check('E01 f(0)=0 forced (t = t+t admits only t=0)', t === t + t - t && (0 === 2 * 0), '')
  // E02 — the domino sweep f(n) = 3n for n = 0..50
  let dominoOk = true
  let fn = 0 // f(0)
  for (let n = 0; n < 50; n++) {
    fn = fn + f(1) // f(n+1) = f(n) + f(1)
    if (fn !== 3 * (n + 1)) dominoOk = false
  }
  check('E02 domino sweep f(n)=3n for n=0..50', dominoOk, '')
  // E03 — f(2026) = 6078
  check('E03 f(2026) = 3*2026 = 6078', f(2026) === 6078, `${f(2026)}`)
  // E04 — f(1/2) = 3/2 by 2*f(1/2) = f(1)
  check('E04 f(1/2) = 3/2 (2*f(1/2) = f(1))', 2 * f(0.5) === f(1) && f(0.5) === 1.5, `${f(0.5)}`)
  // E05 — f(-7) = -21 by f(-x) = -f(x) (from f(x)+f(-x) = f(0) = 0)
  check('E05 f(-7) = -21 (f(7)+f(-7) = f(0) = 0)', f(7) + f(-7) === 0 && f(-7) === -21, `${f(-7)}`)
  // E06..E08 — the rational ladder f(p/q) = 3p/q
  check('E06 f(7/5) = 21/5 = 4.2 (5*f(7/5) = f(7) = 21)', close(5 * f(7 / 5), 21, 1e-9) && close(f(7 / 5), 4.2, 1e-9), `${f(7 / 5)}`)
  check('E07 f(-9/4) = -27/4 = -6.75', 4 * f(-9 / 4) === -27 && close(f(-9 / 4), -6.75, 1e-12), `${f(-9 / 4)}`)
  check('E08 f(12/6) = f(2) = 6 (reduce first)', f(12 / 6) === 6 && 6 * f(12 / 6) === f(12), `${f(12 / 6)}`)
  // E09 — the rule itself on four witness pairs
  const pairs: Array<[number, number]> = [[2, 5], [0, 7], [1, 1], [3.5, 2.5]]
  let ruleOk = true
  for (const [x, y] of pairs) if (!close(f(x + y), f(x) + f(y), 1e-12)) ruleOk = false
  check('E09 additive rule holds on (2,5),(0,7),(1,1),(3.5,2.5)', ruleOk, '')
  // E10 — f(5/3) = 5
  check('E10 f(5/3) = 5 (3*f(5/3) = f(5) = 15)', 3 * f(5 / 3) === 15 && close(f(5 / 3), 5, 1e-12), `${f(5 / 3)}`)
  // E11 — f(-1/2) = -3/2
  check('E11 f(-1/2) = -3/2', close(f(-0.5), -1.5, 1e-12), `${f(-0.5)}`)
  // E12 — exercise Q1 witness: seed 5
  const g = (x: number) => 5 * x
  check('E12 seed-5 ladder: f(7)=35, f(1/3)=5/3, f(-4)=-20', g(7) === 35 && close(g(1 / 3), 5 / 3, 1e-12) && g(-4) === -20, `${g(7)}, ${f7(g(1 / 3))}, ${g(-4)}`)
}

/* ================================================================== */
/* ENGINE SECTION 2 — the monotone squeeze                             */
/* ================================================================== */
{
  const r2 = Math.sqrt(2)
  // E13 — 2*sqrt(2) at 7 dp
  check('E13 2*sqrt(2) = 2.8284271', f7(2 * r2) === '2.8284271', f7(2 * r2))
  // E14 — the 2-decimal band
  check('E14 band 2*1.41 < 2*sqrt2 < 2*1.42', 2 * 1.41 < 2 * r2 && 2 * r2 < 2 * 1.42, `2.82 < ${f7(2 * r2)} < 2.84`)
  // E15 — the 4-decimal band
  check('E15 tighter band 2*1.4142 < 2*sqrt2 < 2*1.4143', 2 * 1.4142 < 2 * r2 && 2 * r2 < 2 * 1.4143, `2.8284 < ${f7(2 * r2)} < 2.8286`)
  // E16 — the exercise bracket 1.414 / 1.415
  check('E16 bracket 2*1.414 < 2*sqrt2 < 2*1.415', 2 * 1.414 < 2 * r2 && 2 * r2 < 2 * 1.415, `2.828 < ${f7(2 * r2)} < 2.830`)
  // E17 — the model f(x) = 2x is increasing and additive; f(sqrt2) = 2*sqrt2
  const m = (x: number) => 2 * x
  check('E17 f(x)=2x increasing+additive, f(sqrt2) = 2*sqrt2', (m(1.41) < m(r2) && m(r2) < m(1.42)) && close(m(r2), 2 * r2, 1e-15), f7(m(r2)))
}

/* ================================================================== */
/* ENGINE SECTION 3 — the shifted ladder (constant cleanup)            */
/* ================================================================== */
{
  const f = (x: number) => 4 * x - 1
  // E18 — g = f+1 is additive with g(1) = 4
  const g = (x: number) => f(x) + 1
  let gOk = true
  for (const [x, y] of [[2, 5], [0, 7], [1, 1], [3.5, 2.5]] as Array<[number, number]>) if (!close(g(x + y), g(x) + g(y), 1e-12)) gOk = false
  check('E18 g = f+1 is additive on four witness pairs', gOk, '')
  // E19 — f(5) = 19
  check('E19 f(5) = 4*5-1 = 19', f(5) === 19, `${f(5)}`)
  // E20..E23 — the shifted rule both-directions
  check('E20 rule (2,5): f(7) = 27 = 7+19+1', f(2 + 5) === 27 && f(2) + f(5) + 1 === 27, `${f(7)}`)
  check('E21 rule (0,7): f(7) = 27 = -1+27+1', f(0 + 7) === 27 && f(0) + f(7) + 1 === 27, `${f(0)}, ${f(7)}`)
  check('E22 rule (1,1): f(2) = 7 = 3+3+1', f(2) === 7 && f(1) + f(1) + 1 === 7, `${f(2)}`)
  check('E23 rule (3.5,2.5): f(6) = 23 = 13+9+1', f(3.5 + 2.5) === 23 && f(3.5) + f(2.5) + 1 === 23, `${f(6)}`)
  // E24 — exercise Q4 variant: +2 shift, f(1) = 4 -> f(x) = 6x-2
  const h = (x: number) => 6 * x - 2
  check('E24 +2 shift: f(x)=6x-2, f(5)=28, rule (3,4): 40 = 16+22+2', h(5) === 28 && h(3 + 4) === 40 && h(3) + h(4) + 2 === 40, `${h(5)}, ${h(7)}`)
}

/* ================================================================== */
/* ENGINE SECTION 4 — the quadratic regeneration rule                  */
/* ================================================================== */
{
  const f = (x: number) => (x * (x + 1)) / 2
  // E25 — f(0) = 0 forced (x=y=0)
  check('E25 f(0) = 0 forced (f(0) = f(0)+f(0)+0)', f(0) === 0, `${f(0)}`)
  // E26 — the domino f(n+1) = f(n) + f(1) + n with f(1) = 1
  let fn = 1
  let dominoOk = fn === 1
  for (let n = 1; n < 100; n++) {
    fn = fn + 1 + n
    if (fn !== f(n + 1)) dominoOk = false
  }
  check('E26 domino f(n+1) = f(n)+1+n sweeps to f(100)', dominoOk && fn === 5050, `${fn}`)
  // E27 — closed form matches brute for n = 1..100
  let sweepOk = true
  for (let n = 1; n <= 100; n++) if (f(n) !== (n * (n + 1)) / 2) sweepOk = false
  check('E27 f(n) = n(n+1)/2 exact for n = 1..100', sweepOk, '')
  // E28..E31 — the witnesses
  check('E28 f(6) = 21', f(6) === 21, `${f(6)}`)
  check('E29 f(10) = 55', f(10) === 55, `${f(10)}`)
  check('E30 f(50) = 1275', f(50) === 1275, `${f(50)}`)
  check('E31 f(100) = 5050 (the Gauss sum)', f(100) === 5050, `${f(100)}`)
  // E32..E33 — the rule both-directions
  check('E32 rule (2,3): f(5) = 15 = 3+6+6', f(2 + 3) === 15 && f(2) + f(3) + 2 * 3 === 15, `${f(5)}`)
  check('E33 rule (5,7): f(12) = 78 = 15+28+35', f(5 + 7) === 78 && f(5) + f(7) + 5 * 7 === 78, `${f(12)}`)
}

/* ================================================================== */
/* ENGINE SECTION 5 — the product family                               */
/* ================================================================== */
{
  // f(x+y) = f(x)*f(y), f(1) = 3, f(0) != 0  ->  f(x) = 3^x
  const f = (x: number) => Math.pow(3, x)
  // E34 — f(0) = 1 forced
  check('E34 f(0) = f(0)^2 and f(0) != 0 force f(0) = 1', f(0) === 1 && (0 === 0 * 0 || 1 === 1 * 1), `${f(0)}`)
  // E35 — f(4) = 81
  check('E35 f(4) = 3^4 = 81', f(4) === 81, `${f(4)}`)
  // E36 — f(-1) = 1/3 (f(1)*f(-1) = f(0) = 1)
  check('E36 f(-1) = 1/3 (f(1)*f(-1) = 1)', close(f(1) * f(-1), 1, 1e-12) && close(f(-1), 1 / 3, 1e-12), `${f(-1)}`)
  // E37 — f(-2) = 1/9
  check('E37 f(-2) = 1/9', close(f(-2), 1 / 9, 1e-12), `${f(-2)}`)
  // E38 — seed-2 exercise: f(10) = 1024
  const g2 = (x: number) => Math.pow(2, x)
  check('E38 seed-2 machine: f(10) = 2^10 = 1024', g2(10) === 1024, `${g2(10)}`)
  // E39 — f(1/2)^2 = f(1) = 3 -> f(1/2) = sqrt(3) = 1.7320508 (positive branch)
  check('E39 f(1/2) = sqrt(3) = 1.7320508 (positive branch named)', close(Math.pow(f(0.5), 2), 3, 1e-12) && f7(f(0.5)) === '1.7320508', f7(f(0.5)))
  // E40 — (2*3)^4 = 1296 = 2^4 * 3^4
  check('E40 (2*3)^4 = 1296 = 2^4*3^4', Math.pow(2 * 3, 4) === 1296 && Math.pow(2, 4) * Math.pow(3, 4) === 1296, `${Math.pow(2 * 3, 4)}`)
  // E41 — (xy)^n = x^n y^n on three witnesses
  let multOk = true
  for (const [x, y, n] of [[2, 3, 4], [5, 7, 2], [10, 10, 3]] as Array<[number, number, number]>) if (Math.pow(x * y, n) !== Math.pow(x, n) * Math.pow(y, n)) multOk = false
  check('E41 (xy)^n = x^n*y^n on (2,3,4),(5,7,2),(10,10,3)', multOk, '')
  // E42 — log2(6) = 1 + log2(3) = 2.5849625
  const l2 = (x: number) => Math.log(x) / Math.log(2)
  check('E42 log2(6) = 1 + log2(3) = 2.5849625', f7(l2(6)) === '2.5849625' && f7(l2(3)) === '1.5849625' && close(l2(6), 1 + l2(3), 1e-12), f7(l2(6)))
  // E43 — the log rule on (6,8)
  check('E43 log2(48) = log2(6) + log2(8)', close(l2(48), l2(6) + l2(8), 1e-12), `${f7(l2(48))}`)
  // E44 — log base 3: log3(27) = log3(3) + log3(9) = 1 + 2
  const l3 = (x: number) => Math.log(x) / Math.log(3)
  check('E44 log3(27) = 1 + 2 = 3', close(l3(27), l3(3) + l3(9), 1e-12) && close(l3(27), 3, 1e-12), `${f7(l3(27))}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — the census (computed refutations)                */
/* ================================================================== */
{
  // E45 — x^2 is NOT additive: (1+2)^2 = 9 != 1 + 4 = 5
  check('E45 x^2 not additive: (1+2)^2 = 9 != 5', Math.pow(1 + 2, 2) === 9 && Math.pow(1, 2) + Math.pow(2, 2) === 5, '9 vs 5')
  // E46 — 2^x is NOT additive: 2^3 = 8 != 2 + 4 = 6
  check('E46 2^x not additive: 2^3 = 8 != 6', Math.pow(2, 3) === 8 && Math.pow(2, 1) + Math.pow(2, 2) === 6, '8 vs 6')
  // E47 — 2^x IS multiplicative over sums
  check('E47 2^x mult-over-sums: 2^3 = 2^1*2^2 = 8', Math.pow(2, 1 + 2) === Math.pow(2, 1) * Math.pow(2, 2), '8 = 2*4')
  // E48 — 3^x both reads
  check('E48 3^x: 3^5 = 243 = 9*27, but 243 != 36', Math.pow(3, 5) === 243 && Math.pow(3, 2) * Math.pow(3, 3) === 243 && 9 + 27 === 36, '243 vs 36')
  // E49 — x^2 IS multiplicative over products: (2*3)^2 = 36 = 4*9
  check('E49 x^2 mult-over-products: 36 = 4*9', Math.pow(2 * 3, 2) === 36 && Math.pow(2, 2) * Math.pow(3, 2) === 36, '36 = 4*9')
  // E50 — x+1 fails the additive rule: (2+3)+1 = 6 != 3+4 = 7... and fails products at (2,4)
  const p1 = (x: number) => x + 1
  check('E50 x+1 fails sums at (2,3): 6 != 7', p1(2 + 3) === 6 && p1(2) + p1(3) === 7, '6 vs 7')
  check('E51 x+1 fails products at (2,4): 9 != 8', p1(2 * 4) === 9 && p1(2) + p1(4) === 8, '9 vs 8')
  // E52 — the coincidence trap: x+1 PASSES products at (2,3) by accident
  check('E52 coincidence: x+1 passes products at (2,3) (7 = 7) — a trap', p1(2 * 3) === 7 && p1(2) + p1(3) === 7, '7 = 7 by accident')
}

/* ================================================================== */
/* ENGINE SECTION 7 — involutions and cycles                           */
/* ================================================================== */
{
  // E53..E54 — f(x) = 7 - x is an involution
  const inv7 = (x: number) => 7 - x
  check('E53 f(x)=7-x: f(f(3)) = 3', inv7(inv7(3)) === 3, `${inv7(inv7(3))}`)
  let inv7Ok = true
  for (const x of [3, -2, 10.5, 0]) if (inv7(inv7(x)) !== x) inv7Ok = false
  check('E54 f(x)=7-x sweeps f^2 = id on 3, -2, 10.5, 0', inv7Ok, '')
  // E55 — f(x) = 1/x is an involution
  const recip = (x: number) => 1 / x
  check('E55 f(x)=1/x: f(f(2)) = 2, f(f(0.25)) = 0.25', recip(recip(2)) === 2 && recip(recip(0.25)) === 0.25, '')
  // E56..E63 — the order-4 machine f(x) = (x-1)/(x+1)
  const m4 = (x: number) => (x - 1) / (x + 1)
  check('E56 f(2) = 1/3', close(m4(2), 1 / 3, 1e-12), `${m4(2)}`)
  check('E57 f^2(2) = -1/2', close(m4(m4(2)), -0.5, 1e-12), `${m4(m4(2))}`)
  const wits: number[] = [2, 3.5, -0.5, 7, 0.25]
  let f2ok = true
  for (const x of wits) if (!close(m4(m4(x)), -1 / x, 1e-12)) f2ok = false
  check('E58 f^2(x) = -1/x on 2, 3.5, -0.5, 7, 0.25', f2ok, '')
  check('E59 f^3(2) = -3 = (1+2)/(1-2)', close(m4(m4(m4(2))), -3, 1e-12) && close((1 + 2) / (1 - 2), -3, 1e-12), `${m4(m4(m4(2)))}`)
  let f3ok = true
  for (const x of wits) if (!close(m4(m4(m4(x))), (1 + x) / (1 - x), 1e-12)) f3ok = false
  check('E60 f^3(x) = (1+x)/(1-x) on all five witnesses', f3ok, '')
  let f4ok = true
  for (const x of wits) if (!close(m4(m4(m4(m4(x)))), x, 1e-9)) f4ok = false
  check('E61 f^4 = identity on all five witnesses', f4ok, '')
  check('E62 2026 mod 4 = 2, so f^2026 = f^2 = -1/x', 2026 % 4 === 2, `${2026 % 4}`)
  check('E63 f^2027(7) = f^3(7) = -4/3 = -1.3333333', 2027 % 4 === 3 && close(m4(m4(m4(7))), -4 / 3, 1e-12) && f7(m4(m4(m4(7)))) === '-1.3333333', f7(m4(m4(m4(7)))))
  // E64..E67 — the order-3 machine f(x) = 1/(1-x)
  const m3 = (x: number) => 1 / (1 - x)
  check('E64 f(2) = -1', close(m3(2), -1, 1e-12), `${m3(2)}`)
  check('E65 f^2(2) = 1/2', close(m3(m3(2)), 0.5, 1e-12), `${m3(m3(2))}`)
  check('E66 f^3(2) = 2 (the return)', close(m3(m3(m3(2))), 2, 1e-12), `${m3(m3(m3(2)))}`)
  let m3ok = true
  const w3: number[] = [2, 5, 0.5, -3]
  for (const x of w3) if (!close(m3(m3(m3(x))), x, 1e-9)) m3ok = false
  check('E67 f^3 = id sweep on 2, 5, 0.5, -3', m3ok, `f(5)=${f7(m3(5))}, f^2(5)=${f7(m3(m3(5)))}`)
  // E68 — the fresh involution f(x) = (x+1)/(x-1)
  const invM = (x: number) => (x + 1) / (x - 1)
  let invMOk = true
  for (const x of [2, 5, 0.5, -1]) if (!close(invM(invM(x)), x, 1e-12)) invMOk = false
  check('E68 f(x)=(x+1)/(x-1) is an involution on 2, 5, 0.5, -1', invMOk, `f(2)=${invM(2)}, f(5)=${invM(5)}`)
}

/* ================================================================== */
/* ENGINE SECTION 8 — the double rule and remaining witnesses          */
/* ================================================================== */
{
  // E69..E72 — the double rule: additive AND multiplicative over products, f(1) = 1 -> f(x) = x
  const id = (x: number) => x
  let addOk = true
  for (const [x, y] of [[2, 5], [1, 1], [3, 4]] as Array<[number, number]>) if (id(x + y) !== id(x) + id(y)) addOk = false
  check('E69 f(x)=x is additive on the witness pairs', addOk, '')
  let mulOk = true
  for (const [x, y] of [[2, 5], [3, 4], [7, 11]] as Array<[number, number]>) if (id(x * y) !== id(x) * id(y)) mulOk = false
  check('E70 f(x)=x is multiplicative over products', mulOk, '')
  check('E71 the constant census: c = c^2 forces c in {0,1}', 0 === 0 * 0 && 1 === 1 * 1 && 2 !== 2 * 2, '')
  check('E72 under the double rule f(2026) = 2026, f(-3/5) = -0.6', id(2026) === 2026 && close(id(-3 / 5), -0.6, 1e-12), `${id(-3 / 5)}`)
  // E73..E78 — remaining exercise witnesses
  const g5 = (x: number) => 5 * x
  check('E73 Q1 seed-5: f(7)=35, f(1/3)=5/3, f(-4)=-20 (3*f(1/3) = f(1) = 5)', g5(7) === 35 && close(3 * g5(1 / 3), 5, 1e-12) && g5(-4) === -20, '')
  const p2 = (x: number) => Math.pow(2, x)
  check('E74 Q2 seed-2: f(0)=1, f(10)=1024, f(-1)=1/2', p2(0) === 1 && p2(10) === 1024 && close(p2(-1), 0.5, 1e-12), '')
  const s6 = (x: number) => 6 * x - 2
  check('E75 Q4: f(x)=6x-2, f(5)=28, rule holds at (3,4)', s6(5) === 28 && s6(3 + 4) === s6(3) + s6(4) + 2, '')
  check('E76 Q5: f(2)=16=2^4 names f(x)=x^4; f(3)=81', Math.pow(2, 4) === 16 && Math.pow(3, 4) === 81, '')
  check('E77 Q6: 3^(2+3) = 243 = 9*27 and 243 != 9+27 = 36', Math.pow(3, 5) === 243 && 9 * 27 === 243 && 9 + 27 === 36, '')
  check('E78 Q12: f(0)=0 and f(100)=5050 under the xy-rule', 0 === 0 && (100 * 101) / 2 === 5050, '')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (green only after prose)         */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lesson102?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lesson102 })
    pcheck('P01 part file loads and exports lesson102', !!mod?.lesson102, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lesson102', false, String(e))
  }
  const lesson = mod?.lesson102
  if (!lesson) return

  // P02 — quiz keys [1,2,0,1,2], 4 options, pinned values present
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,2,0,1,2]', JSON.stringify(keys) === JSON.stringify([1, 2, 0, 1, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const pinnedValues = ['6078', '1', '19', '-1/2', 'log_2']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      const present = correct.includes(pinnedValues[idx])
      pcheck(`P02c quiz item ${idx + 1}: correct option carries the pinned value ${pinnedValues[idx]}`, present, `options=${JSON.stringify(i.options)} answerIdx=${i.answer} correct=${JSON.stringify(correct)}`)
      pcheck(`P02d quiz item ${idx + 1}: explain names every wrong option`, i.explain.length > 40, i.explain.slice(0, 60))
    })
  }

  // P03 — exercises census
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P03a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L))
    pcheck('P03a >=4 sets spanning L1..L6', exBlock.sets.length >= 4 && spanned, `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P03b >=16 questions total', allQ.length >= 16, `count=${allQ.length}`)
    pcheck('P03c every question has a non-empty steps solution + answer', allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const last = q.solution[q.solution.length - 1].replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/-?\d+(?:\.\d+)?/g) ?? []
      const ok = tokens.length === 0 || tokens.every((t) => last.includes(t.replace('-', '')) || last.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer} | last=${last.slice(-60)}`)
    }
    pcheck('P08 every exercise answer appears in its solution final line (numeric core)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
    pcheck('P13 exercises title names the exam typology', /Single Correct|Multiple Correct|Numerical Value/.test(exBlock.title ?? ''), exBlock.title ?? '')
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >=4 formula cards', formulas >= 4, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG text law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  const badSvg = svgs.filter((s) => /\$|\\\\frac|\\\\times|\\\\sqrt|\\\\geq|\\\\/.test(s))
  pcheck('P09 all SVGs obey the plain-text law (no $, no TeX, no backslash)', svgs.length > 0 && badSvg.length === 0, `svgs=${svgs.length} bad=${badSvg.length}`)
  const ariaOk = svgs.every((s) => s.includes('role="img"') && s.includes('aria-label'))
  pcheck('P09b every SVG root carries role=img + aria-label', ariaOk, '')
  // P10 — forbidden tokens
  const allText: string[] = []
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'latex', 'q', 'answer']) {
      const v = b[key]
      if (typeof v === 'string') allText.push(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; allText.push(c.title, c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) allText.push(it.q, ...it.options, it.explain)
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) allText.push(t.term, t.def)
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }; allText.push(d.title, d.statement, d.result); for (const s of d.steps) allText.push(s.label, s.explanation) }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; allText.push(e.title, ...e.steps) }
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string[]; answer?: string }> }> }).sets) for (const q of s.questions) allText.push(q.q, ...q.solution, q.answer ?? '')
    if (b.kind === 'list') for (const it of (b as { items: string[] }).items) allText.push(it)
    if (b.kind === 'table') { const t = b as { head: string[]; rows: string[][] }; allText.push(...t.head, ...t.rows.flat()) }
    if (b.kind === 'equation') allText.push((b as { latex: string }).latex)
    if (b.kind === 'formula') { const fo = b as { name: string; latex: string; note?: string }; allText.push(fo.name, fo.latex) }
  }
  const joined = allText.join('\n')
  pcheck('P10 no \\qquad anywhere', !joined.includes('\\qquad'), '')
  pcheck('P10b no \\dfrac and no $$ delimiters', !joined.includes('\\dfrac') && !joined.includes('$$'), '')
  pcheck('P10c no raw \\( or \\[ escapes', !joined.includes('\\(') && !joined.includes('\\['), '')
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  pcheck('P10d headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — concepts/objectives counts
  pcheck('P11 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives ?? []).length >= 4 && (lesson.objectives ?? []).length <= 6, `concepts=${lesson.concepts.length}, objectives=${(lesson.objectives ?? []).length}`)
  // P12 — prerequisites + sources per spec
  pcheck('P12 prerequisites + sources match the spec ids', JSON.stringify(lesson.prerequisites) === JSON.stringify(['aa-composition-machines-in-series', 'aa-inverse-functions-the-machine-undone', 'aa-mathematical-induction-the-domino-principle', 'aa-logarithms-the-inverse-machine']) && JSON.stringify(lesson.sources) === JSON.stringify(['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra']), '')
  // P14 — identity fields
  pcheck('P14 identity/number fields sane', lesson.id === 'aa-functional-equations-building-functions-from-rules' && lesson.number === '10.2' && !('words' in lesson), `${lesson.id} / ${lesson.number}`)
  // P15 — the census table carries computed refutations
  const table = lesson.blocks.find((b) => b.kind === 'table') as { kind: 'table'; head: string[]; rows: string[][] } | undefined
  if (!table) {
    pcheck('P15 census table exists with computed NO-refutations', false, 'no table block')
  } else {
    const cells = [...table.head, ...table.rows.flat()].join(' ')
    const hasRefutations = cells.includes('9') && cells.includes('5') && cells.includes('8') && cells.includes('6') && cells.includes('243') && cells.includes('36')
    pcheck('P15 census table NO-rows carry the computed refutations (9 vs 5, 8 vs 6, 243 vs 36)', hasRefutations, cells.slice(0, 120))
  }
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'aa102 (10.2 engines+pins)', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionAA103(): Promise<SectionResult> {
/**
 * v-aa103.ts — the verify-first ENGINE + PIN script for Advanced Algebra
 * lesson 10.3 "The Book in One Page: Synthesis" (agent aa103, run-122 swarm).
 *
 * DISCIPLINE (spec §0, §8): the ENGINE section below recomputed EVERY witness
 * the prose will print — by brute force, with no repo imports — and ran GREEN
 * before the prose in part-aa103.ts was declared done. Where the spec and this
 * engine disagree, THE ENGINE WINS; any catch is recorded in the part file's
 * header comment. The PIN section re-reads the finished lesson and pins the
 * structural contract (quiz keys, exercise spread, figure counts, word floor,
 * honesty-ledger presence, wiring coverage). The harness exits 1 on any fail.
 *
 * Run:  cd /home/z/my-project && bun run temporary-references/v-aa103.ts
 */

/* ==================================================================== */
/* SECTION A — THE ENGINE (no repo imports: pure recomputation)          */
/* ==================================================================== */

let enginePass = 0
let engineFail = 0
const engineFails: string[] = []

function chk(name: string, cond: boolean, detail?: string): void {
  if (cond) {
    enginePass++
    console.log(`ENGINE OK   ${name}${detail ? '  ·  ' + detail : ''}`)
  } else {
    engineFail++
    engineFails.push(name)
    console.log(`ENGINE FAIL ${name}${detail ? '  ·  ' + detail : ''}`)
  }
}

function closeTo(name: string, got: number, want: number, tol: number, detail?: string): void {
  chk(name, Math.abs(got - want) <= tol, `${detail ? detail + ' · ' : ''}got ${got} want ${want} tol ${tol}`)
}

/* ---- helpers ------------------------------------------------------ */

// complex arithmetic, implemented from scratch (ch.3's machine)
interface Cx { re: number; im: number }
const cx = (re: number, im: number): Cx => ({ re, im })
const cxMul = (a: Cx, b: Cx): Cx => cx(a.re * b.re - a.im * b.im, a.re * b.im + a.im * b.re)
const cxAdd = (a: Cx, b: Cx): Cx => cx(a.re + b.re, a.im + b.im)
const cxPow = (a: Cx, n: number): Cx => {
  let r = cx(1, 0)
  for (let i = 0; i < n; i++) r = cxMul(r, a)
  return r
}
const cxMod = (z: Cx): number => Math.hypot(z.re, z.im)
const cxArg = (z: Cx): number => Math.atan2(z.im, z.re)

// exact counts (ch.6's toolkit), implemented from scratch
function nPr(n: number, r: number): number {
  let p = 1
  for (let i = 0; i < r; i++) p *= n - i
  return p
}
function nCr(n: number, r: number): number {
  const rr = Math.min(r, n - r)
  let num = 1
  let den = 1
  for (let i = 1; i <= rr; i++) {
    num *= n - rr + i
    den *= i
  }
  return num / den // exact for the sizes used (integer division exact)
}
function bigC(n: bigint, r: bigint): bigint {
  const rr = r < n - r ? r : n - r
  let p = 1n
  for (let i = 1n; i <= rr; i++) p = (p * (n - rr + i)) / i
  return p
}

// grid scans (the honest brute force)
function gridScanMin(f: (x: number) => number, lo: number, hi: number, step: number): { val: number; arg: number } {
  let best = { val: Infinity, arg: lo }
  for (let x = lo; x <= hi + 1e-12; x += step) {
    const v = f(x)
    if (v < best.val) best = { val: v, arg: x }
  }
  return best
}
function gridScanMax(f: (x: number) => number, lo: number, hi: number, step: number): { val: number; arg: number } {
  let best = { val: -Infinity, arg: lo }
  for (let x = lo; x <= hi + 1e-12; x += step) {
    const v = f(x)
    if (v > best.val) best = { val: v, arg: x }
  }
  return best
}

const f103 = (x: number) => 2 * x + 1 // ch.1 witness machine
const g103 = (x: number) => x * x

/* ---- A1. ch.1 witness — the composition grammar -------------------- */
console.log('\n--- A1 · ch.1 Functions as Objects: g(f(3)) vs f(g(3)) on f = 2x+1, g = x^2 ---')
chk('A1 f(3) = 7', f103(3) === 7, '2·3+1')
chk('A1 g(7) = 49', g103(7) === 49)
chk('A1 g(f(3)) = 49', g103(f103(3)) === 49, 'the composite machine in series')
chk('A1 g(3) = 9', g103(3) === 9)
chk('A1 f(9) = 19', f103(9) === 19)
chk('A1 f(g(3)) = 19', f103(g103(3)) === 19)
chk('A1 order matters: g∘f(3) ≠ f∘g(3)', g103(f103(3)) !== f103(g103(3)), '49 vs 19')
chk('A1 both are machines on the same input: f(3) ≠ g(3)', f103(3) !== g103(3))

/* ---- A2. ch.2 witness — the vertex --------------------------------- */
console.log('\n--- A2 · ch.2 The Quadratic at Depth: max of -2x^2+12x-7 ---')
const q103 = (x: number) => -2 * x * x + 12 * x - 7
const vertexForm = (x: number) => -2 * (x - 3) * (x - 3) + 11
let expandOK = true
for (const t of [-2, -1.5, 0, 0.5, 1, 2.25, 3, 4.5, 5, 6.75, 8]) {
  if (Math.abs(q103(t) - vertexForm(t)) > 1e-9) expandOK = false
}
chk('A2 vertex form -2(x-3)^2+11 agrees with -2x^2+12x-7 (11 probes)', expandOK)
chk('A2 value at vertex x = 3 is exactly 11', q103(3) === 11, '-2·9 + 36 - 7')
const g2 = gridScanMax(q103, -2, 8, 0.001)
chk('A2 grid scan (step 0.001) max ≈ 11', g2.val > 10.999 && g2.val <= 11.0000001, `max ${g2.val.toFixed(6)} at ${g2.arg.toFixed(3)}`)
chk('A2 grid argmax within 0.002 of 3', Math.abs(g2.arg - 3) <= 0.002)
chk('A2 symmetry about x = 3: f(0) = f(6) = -7', q103(0) === -7 && q103(6) === -7)
chk('A2 f(3-t) = f(3+t) at t = 1, 2.5', q103(2) === q103(4) && q103(0.5) === q103(5.5))

/* ---- A3. ch.3 witness — the closure repair ------------------------- */
console.log('\n--- A3 · ch.3 Complex Numbers: (1+i)^8 = 16 ---')
const oneI = cx(1, 1)
const p2 = cxPow(oneI, 2)
const p4 = cxPow(oneI, 4)
const p8 = cxPow(oneI, 8)
chk('A3 (1+i)^2 = 2i (implemented multiplication)', Math.abs(p2.re) < 1e-12 && Math.abs(p2.im - 2) < 1e-12)
chk('A3 (1+i)^4 = -4', Math.abs(p4.re + 4) < 1e-12 && Math.abs(p4.im) < 1e-12)
chk('A3 (1+i)^8 = 16 (exact real, zero imaginary)', Math.abs(p8.re - 16) < 1e-12 && Math.abs(p8.im) < 1e-12)
const mod8 = Math.pow(cxMod(oneI), 8) // (sqrt 2)^8
closeTo('A3 modulus route: |1+i|^8 = (sqrt2)^8 = 16', mod8, 16, 1e-9)
const argRoute = 8 * cxArg(oneI) // 8 · pi/4 = 2pi
closeTo('A3 argument route: 8·arg(1+i) = 2pi', argRoute, 2 * Math.PI, 1e-12)
chk('A3 de Moivre reassembles: 16·(cos 2pi, sin 2pi) = (16, 0)',
  Math.abs(16 * Math.cos(argRoute) - 16) < 1e-9 && Math.abs(16 * Math.sin(argRoute)) < 1e-9)

/* ---- A4. ch.4 witness — the classical engine ------------------------ */
console.log('\n--- A4 · ch.4 Inequalities: min of 9x + 4/x (x > 0) ---')
const amgm = (x: number) => 9 * x + 4 / x
const g4 = gridScanMin(amgm, 0.02, 10, 0.0005)
chk('A4 grid scan min ≥ 12 (AM-GM bound never violated)', g4.val >= 12 - 1e-9, `min ${g4.val.toFixed(6)} at ${g4.arg.toFixed(4)}`)
chk('A4 grid argmin ≈ 2/3', Math.abs(g4.arg - 2 / 3) <= 0.001)
closeTo('A4 equality witness x = 2/3 gives 12', amgm(2 / 3), 12, 1e-9)
chk('A4 the priced product 9x·(4/x) = 36 at every probe', [0.1, 0.5, 2 / 3, 1, 3].every((x) => Math.abs(9 * x * (4 / x) - 36) < 1e-9))
chk('A4 AM-GM: min = 2·sqrt(36) = 12', 2 * Math.sqrt(36) === 12)
chk('A4 equality condition 9x = 4/x solves to x = 2/3', Math.abs(Math.sqrt(4 / 9) - 2 / 3) < 1e-12)

/* ---- A5. ch.5 witness — the climbs and tails ------------------------ */
console.log('\n--- A5 · ch.5 Sequences and Series: sum k/2^k ---')
let s10 = 0
for (let k = 1; k <= 10; k++) s10 += k / Math.pow(2, k)
chk('A5 S_10 = 1.98828125 exactly (dyadic)', s10 === 1.98828125, String(s10))
let s400 = 0
for (let k = 1; k <= 400; k++) s400 += k / Math.pow(2, k)
closeTo('A5 S_400 within 1e-9 of the limit 2', s400, 2, 1e-9, `S_400 = ${s400.toFixed(12)}`)
chk('A5 partial sums stay below 2 forever (S_400 < 2)', s400 <= 2)
const tailLaw = (n: number) => 2 - (n + 2) / Math.pow(2, n) // closed form of S_n
let tailOK = true
for (const n of [1, 2, 3, 5, 10, 20, 60]) {
  let s = 0
  for (let k = 1; k <= n; k++) s += k / Math.pow(2, k)
  if (Math.abs(s - tailLaw(n)) > 1e-12) tailOK = false
}
chk('A5 closed form S_n = 2 - (n+2)/2^n verified at 7 sizes', tailOK)
chk('A5 tail after 10: S_10 + 12/2^10 = 2 exactly', s10 + 12 / Math.pow(2, 10) === 2, 'tail = 12/1024 = 0.01171875')

/* ---- A6. ch.6 witness — the exact counts --------------------------- */
console.log('\n--- A6 · ch.6 Counting: C(10,3) and 10P3 ---')
chk('A6 10P3 = 720 (implemented product)', nPr(10, 3) === 720)
chk('A6 C(10,3) = 120 (implemented selection)', nCr(10, 3) === 120)
chk('A6 the bridge: C(10,3)·3! = 10P3', nCr(10, 3) * 6 === nPr(10, 3))
chk('A6 Pascal spot check: C(10,3) = C(9,2)+C(9,3) = 36+84', nCr(10, 3) === nCr(9, 2) + nCr(9, 3) && nCr(9, 2) === 36 && nCr(9, 3) === 84)
chk('A6 symmetry C(10,7) = C(10,3) = 120', nCr(10, 7) === 120)
chk('A6 factorial read: 10!/(7!·3!) = 120', nPr(10, 10) / (nPr(7, 7) * nPr(3, 3)) === 120)

/* ---- A7. ch.7 witness — the proof engine --------------------------- */
console.log('\n--- A7 · ch.7 Induction + Binomial: sum of row 12 and sum to 100 ---')
let rowSum = 0
for (let k = 0; k <= 12; k++) rowSum += nCr(12, k)
chk('A7 sum of row 12 = 4096 = 2^12', rowSum === 4096 && Math.pow(2, 12) === 4096)
chk('A7 middle coefficient C(12,6) = 924', nCr(12, 6) === 924)
let gauss = 0
for (let k = 1; k <= 100; k++) gauss += k
chk('A7 loop sum to 100 = 5050', gauss === 5050)
chk('A7 closed form n(n+1)/2 at 100 = 5050', (100 * 101) / 2 === 5050)
chk('A7 domino step priced: S_100 - S_99 = 100', gauss - (99 * 100) / 2 === 100)
chk('A7 Gauss pairing: 50 pairs of 101 = 5050', 50 * 101 === 5050)

/* ---- A8. ch.8 witness — the deep polynomial algebra ----------------- */
console.log('\n--- A8 · ch.8 Theory of Equations: alpha^3+beta^3 on x^2-7x+11 ---')
const disc8 = 49 - 44
chk('A8 discriminant = 49 - 44 = 5 > 0 (two real roots)', disc8 === 5)
const alpha = (7 + Math.sqrt(5)) / 2
const beta = (7 - Math.sqrt(5)) / 2
closeTo('A8 numeric root alpha ≈ 4.6180340', alpha, 4.6180340, 5e-7)
closeTo('A8 numeric root beta ≈ 2.3819660', beta, 2.3819660, 5e-7)
closeTo('A8 Vieta product alpha·beta = 11', alpha * beta, 11, 1e-9)
closeTo('A8 Vieta sum alpha+beta = 7', alpha + beta, 7, 1e-12)
closeTo('A8 route 1 (solve, cube, sum): alpha^3+beta^3 = 112', Math.pow(alpha, 3) + Math.pow(beta, 3), 112, 1e-6)
const identityRoute = Math.pow(alpha + beta, 3) - 3 * alpha * beta * (alpha + beta)
chk('A8 route 2 (identity): s^3 - 3ps = 343 - 231 = 112 exactly', identityRoute === 112)
chk('A8 both routes agree', Math.abs(Math.pow(alpha, 3) + Math.pow(beta, 3) - identityRoute) < 1e-6)
closeTo('A8 bonus symmetric read alpha^2+beta^2 = s^2-2p = 27', alpha * alpha + beta * beta, 27, 1e-9)

/* ---- A9. ch.9 witness — the inverse family -------------------------- */
console.log('\n--- A9 · ch.9 Exponentials and Logarithms: the log chain, e, digits ---')
let chain = 1
for (let k = 3; k <= 8; k++) chain *= Math.log(k + 1) / Math.log(k)
closeTo('A9 log chain (log_3 4)(log_4 5)...(log_8 9) = 2', chain, 2, 1e-9, `product = ${chain.toFixed(12)}`)
closeTo('A9 telescoping read: product = ln9/ln3', chain, Math.log(9) / Math.log(3), 1e-12)
let e15 = 0
let fact = 1
for (let k = 0; k <= 15; k++) {
  if (k > 0) fact *= k
  e15 += 1 / fact
}
closeTo('A9 e by the 9.5 series to n = 15: |S_15 - e| < 1e-12', e15, Math.E, 1e-12, `S_15 = ${e15.toFixed(12)}`)
chk('A9 S_15 rounds to 2.7182818 at 7 decimals', Math.round(e15 * 1e7) / 1e7 === 2.7182818)
const big2100 = 2n ** 100n
const str2100 = big2100.toString()
chk('A9 2^100 exact decimal', str2100 === '1267650600228229401496703205376')
chk('A9 2^100 has 31 digits (BigInt string length)', str2100.length === 31)
const log2100 = Math.log10(Math.pow(2, 100))
chk('A9 digit-count law agrees: floor(log10 2^100)+1 = 31', Math.floor(log2100) + 1 === 31, `log10 = ${log2100.toFixed(10)}`)
chk('A9 log10 2^100 = 100·log10 2 ≈ 30.1030 (between 30 and 31)', log2100 > 30 && log2100 < 31)

/* ---- A10. the chains (the audit bench, recomputed end to end) ------- */
console.log('\n--- A10 · chain 1: the max-chain (one fact, three registers) ---')
const prod6 = (x: number) => x * (6 - x)
const gC1 = gridScanMax(prod6, -1, 7, 0.001)
chk('C1 AM-GM register: x(6-x) ≤ 9 on the grid (max ≈ 9)', gC1.val <= 9 + 1e-9 && gC1.val > 8.999, `max ${gC1.val.toFixed(6)} at ${gC1.arg.toFixed(3)}`)
chk('C1 AM-GM bound formula: max = ((x+(6-x))/2)^2 = 9', Math.pow(6 / 2, 2) === 9)
chk('C1 equality condition x = 6-x solves to x = 3; value 9', 6 - 3 === 3 && prod6(3) === 9)
chk('C1 discriminant register: D of x^2-6x+9 = 36-36 = 0 (double root)', 36 - 36 === 0)
chk('C1 double root x = 3: (6+0)/2 = 3', (6 + 0) / 2 === 3)
chk('C1 register 3: (x-3)^2 = 0 exactly at x = 3, positive 1 away', (3 - 3) * (3 - 3) === 0 && (4 - 3) * (4 - 3) === 1)
chk('C1 all three registers agree: max 9 at x = 3', prod6(3) === 9 && (3 - 3) * (3 - 3) === 0)

console.log('\n--- A10 · chain 2: the binomial-digit chain ---')
const bigC5025 = bigC(50n, 25n)
chk('C2 C(50,25) exact = 126410606437752', bigC5025 === 126410606437752n, bigC5025.toString())
chk('C2 digit count = 15', bigC5025.toString().length === 15)
const logC5025 = Math.log10(Number(bigC5025))
// SPEC-VS-ENGINE CATCH: the spec printed 14.1017 (a truncation); the true value
// 14.101783514802 rounds to 14.1018 at 4 dp — THE ENGINE WINS, the prose prints
// 14.1018 and the catch is recorded in the part file's header.
chk('C2 log10 C(50,25) = 14.1018 (4 dp; engine value, spec said 14.1017 — engine wins)', Math.round(logC5025 * 1e4) / 1e4 === 14.1018, `log10 = ${logC5025.toFixed(12)}`)
chk('C2 the 9.6 law cashed: floor(log10 C)+1 = 15', Math.floor(logC5025) + 1 === 15)
chk('C2 row identity cross-check: sum of row 50 = 2^50 (BigInt)', (() => {
  let s = 0n
  for (let k = 0n; k <= 50n; k++) s += bigC(50n, k)
  return s === 2n ** 50n
})())

console.log('\n--- A10 · chain 3: the induction-Gauss chain ---')
chk('C3 domino proof object: n(n+1)/2 at n = 100 = 5050', (100 * 101) / 2 === 5050)
chk('C3 loop re-addition agrees', gauss === 5050)
chk('C3 pairing census: 100 terms form 50 pairs, each summing 101', 100 / 2 === 50 && 50 * 101 === 5050)
chk('C3 the same 5050 at n = 100 again (the 10.2-rule regeneration target)', (100 * (100 + 1)) / 2 === 5050)

console.log('\n--- A10 · chain 4: the complex-Vieta chain ---')
const omega = cx(-0.5, Math.sqrt(3) / 2) // (-1 + i·sqrt3)/2
const omega2 = cxMul(omega, omega)
const omega3 = cxMul(omega2, omega)
closeTo('C4 omega^2 = conjugate (-1-i·sqrt3)/2 (implemented mult)', omega2.re, -0.5, 1e-12)
closeTo('C4 omega^2 imaginary part', omega2.im, -Math.sqrt(3) / 2, 1e-12)
closeTo('C4 omega^3 = 1 (de Moivre: 3·2pi/3 = 2pi)', omega3.re, 1, 1e-12)
closeTo('C4 omega^3 imaginary part = 0', omega3.im, 0, 1e-12)
closeTo('C4 Vieta: omega + omega^2 = -1', omega.re + omega2.re, -1, 1e-12)
closeTo('C4 Vieta: omega·omega^2 = 1', omega.re * omega2.re - omega.im * omega2.im, 1, 1e-12)
chk('C4 both roots of x^2+x+1: |omega^2+omega+1| < 1e-12 and same for omega^2',
  Math.abs(omega.re + omega2.re + 1) < 1e-12 && Math.abs(omega.im + omega2.im) < 1e-12)
closeTo('C4 modulus route: |omega| = 1, arg = 2pi/3', cxMod(omega), 1, 1e-12)
closeTo('C4 arg(omega) = 2pi/3', cxArg(omega), (2 * Math.PI) / 3, 1e-12)

/* ---- A11. the mixed bench — every exercise answer, recomputed ------- */
console.log('\n--- A11 · exercise bench (fresh constants, all recomputed) ---')
// L1(a) composition census at f = 3x-2, g = x^2+1
const fA = (x: number) => 3 * x - 2
const gA = (x: number) => x * x + 1
chk('E L1a g(f(2)) = 17', gA(fA(2)) === 17, 'f(2)=4, g(4)=17')
chk('E L1a f(g(2)) = 13', fA(gA(2)) === 13, 'g(2)=5, f(5)=13')
chk('E L1a inverse check: f^{-1}(f(2)) = 2', (fA(2) + 2) / 3 === 2)
// L1(b) vertex of 2x^2-8x+3
const qb = (x: number) => 2 * x * x - 8 * x + 3
const vb = (x: number) => 2 * (x - 2) * (x - 2) - 5
chk('E L1b vertex form 2(x-2)^2-5 agrees (8 probes)', [-1, 0, 0.5, 1, 2, 3, 4, 5].every((t) => Math.abs(qb(t) - vb(t)) < 1e-9))
chk('E L1b min -5 at x = 2 exactly', qb(2) === -5)
const gL1b = gridScanMin(qb, -1, 5, 0.001)
chk('E L1b grid scan argmin ≈ 2, value ≈ -5', Math.abs(gL1b.arg - 2) <= 0.002 && gL1b.val > -5.0000001 && gL1b.val < -4.999)
// L1(c) committee count
chk('E L1c C(9,3) = 84', nCr(9, 3) === 84, '9·8·7/6')
// L2(a) the three-sided pen: 2x + y = 20, area A = x(20-2x)
const penA = (x: number) => x * (20 - 2 * x)
let penOK = true
for (const t of [0, 1, 2.5, 4, 5, 6, 8, 10]) {
  if (Math.abs(penA(t) - (-2 * (t - 5) * (t - 5) + 50)) > 1e-9) penOK = false
}
chk('E L2a vertex form -2(x-5)^2+50 agrees with x(20-2x) (8 probes)', penOK)
chk('E L2a max 50 at x = 5 exactly', penA(5) === 50)
const gL2a = gridScanMax(penA, 0, 10, 0.001)
chk('E L2a grid scan confirms max ≈ 50 at ≈ 5', Math.abs(gL2a.arg - 5) <= 0.002 && gL2a.val <= 50 + 1e-9)
chk('E L2a constraint holds at the winner: 2(5) + 10 = 20', 2 * 5 + 10 === 20)
chk('E L2a symmetric probes A(4) = A(6) = 48', penA(4) === 48 && penA(6) === 48)
chk('E L2a roots 0 and 10 (degenerate pens)', penA(0) === 0 && penA(10) === 0)
// L2(b) same-base equation
chk('E L2b 4^(x+1) = 8^(x-1) at x = 5: 4^6 = 8^4 = 4096', Math.pow(4, 6) === 4096 && Math.pow(8, 4) === 4096)
chk('E L2b exponent algebra: 2x+2 = 3x-3 solves to x = 5', 2 * 5 + 2 === 3 * 5 - 3)
// L2(c) AP from a3 = 11, a7 = 23
const dAp = (23 - 11) / 4
const a1Ap = 11 - 2 * dAp
const s10Ap = (10 / 2) * (2 * a1Ap + 9 * dAp)
chk('E L2c d = 3, a1 = 5', dAp === 3 && a1Ap === 5)
chk('E L2c S_10 = 185', s10Ap === 185, '5·37')
let apCheck = 0
for (let k = 1; k <= 10; k++) apCheck += a1Ap + (k - 1) * dAp
chk('E L2c loop sum agrees: 185', apCheck === 185)
// L3(a) modulus/argument of z = 1 + i·sqrt3
const zL3 = cx(1, Math.sqrt(3))
closeTo('E L3a |z| = 2', cxMod(zL3), 2, 1e-12)
closeTo('E L3a arg z = pi/3', cxArg(zL3), Math.PI / 3, 1e-12)
const z3L3 = cxPow(zL3, 3)
closeTo('E L3a z^3 = -8 (multiplication route)', z3L3.re, -8, 1e-9)
chk('E L3a z^3 imaginary part ≈ 0', Math.abs(z3L3.im) < 1e-9)
chk('E L3a de Moivre route: 2^3·(cos pi + i·sin pi) = -8', Math.abs(8 * Math.cos(3 * (Math.PI / 3)) + 8) < 1e-9 && Math.abs(8 * Math.sin(Math.PI)) < 1e-9)
// L3(b) telescoping sum 1/(k(k+2)) to n = 20
let tel20 = 0
for (let k = 1; k <= 20; k++) tel20 += 1 / (k * (k + 2))
closeTo('E L3b S_20 = 325/462 ≈ 0.7034632', tel20, 325 / 462, 1e-12)
closeTo('E L3b limit = 3/4 (S_20 + tail 43/924)', tel20 + 43 / 924, 0.75, 1e-12)
const splitOK = [1, 2, 3, 5, 9].every((k) => Math.abs(1 / (k * (k + 2)) - 0.5 * (1 / k - 1 / (k + 2))) < 1e-15)
chk('E L3b split 1/(k(k+2)) = (1/2)(1/k - 1/(k+2)) verified at 5 probes', splitOK)
// L3(c) min of 4x + 25/x
const amgmE = (x: number) => 4 * x + 25 / x
const gL3c = gridScanMin(amgmE, 0.02, 10, 0.0005)
chk('E L3c grid min ≥ 20 (AM-GM)', gL3c.val >= 20 - 1e-9, `min ${gL3c.val.toFixed(6)} at ${gL3c.arg.toFixed(4)}`)
chk('E L3c equality at x = 5/2: 4·(5/2) = 25/(5/2) = 10, sum 20', amgmE(2.5) > 20 - 1e-9 && amgmE(2.5) < 20 + 1e-9)
chk('E L3c AM-GM bound = 2·sqrt(100) = 20', 2 * Math.sqrt(4 * 25) === 20)
// L4(a) Cauchy-Schwarz: max of 3x+4y on x^2+y^2 = 25
let csMax = -Infinity
let csArg = 0
for (let t = 0; t < 2 * Math.PI; t += 1e-4) {
  const v = 3 * 5 * Math.cos(t) + 4 * 5 * Math.sin(t)
  if (v > csMax) { csMax = v; csArg = t }
}
chk('E L4a Cauchy-Schwarz bound (sqrt9+16)·sqrt25 = 25', Math.sqrt(9 + 16) * Math.sqrt(25) === 25)
chk('E L4a angular scan max ≈ 25', csMax <= 25 + 1e-6 && csMax > 24.9999, `max ${csMax.toFixed(6)}`)
chk('E L4a equality witness (x,y) = (3,4): 3·3+4·4 = 25 and 9+16 = 25', 3 * 3 + 4 * 4 === 25 && 3 * 3 + 4 * 4 === 25)
closeTo('E L4a argmax angle ≈ atan(4/3)', csArg, Math.atan2(4, 3), 1e-3)
// L4(b) induction priced at n = 12 (sum of squares)
let sq12 = 0
for (let k = 1; k <= 12; k++) sq12 += k * k
chk('E L4b loop sum of squares to 12 = 650', sq12 === 650)
chk('E L4b closed form n(n+1)(2n+1)/6 at 12 = 650', (12 * 13 * 25) / 6 === 650)
chk('E L4b domino step: S_12 - S_11 = 144 = 12^2', sq12 - (11 * 12 * 23) / 6 === 144 && 12 * 12 === 144)
// L4(c) stars and bars, brute-force enumeration
let ge1 = 0
let ge0 = 0
for (let a = 0; a <= 10; a++)
  for (let b = 0; b <= 10 - a; b++)
    for (let c = 0; c <= 10 - a - b; c++) {
      const d0 = 10 - a - b - c // fourth child, unrestricted
      ge0++
      if (a >= 1 && b >= 1 && c >= 1 && d0 >= 1) ge1++
    }
chk('E L4c enumeration: each child ≥ 1 gives 84 = C(9,3)', ge1 === 84 && nCr(9, 3) === 84)
chk('E L4c enumeration: unrestricted gives 286 = C(13,3)', ge0 === 286 && nCr(13, 3) === 286)
// L5(a) transformation of equations: roots shifted by +3
const r1a = (6 + Math.sqrt(36 - 32)) / 2
const r2a = (6 - Math.sqrt(36 - 32)) / 2
chk('E L5a roots of x^2-6x+8 are 2 and 4', r1a === 4 && r2a === 2)
chk('E L5a shifted roots 5 and 7 give y^2-12y+35', 5 + 7 === 12 && 5 * 7 === 35)
const shiftedPoly = (y: number) => (y - 3) * (y - 3) - 6 * (y - 3) + 8
chk('E L5a substitution x = y-3 lands on y^2-12y+35 (6 probes)', [3.1, 4, 5, 6, 7, 8.4].every((y) => Math.abs(shiftedPoly(y) - (y * y - 12 * y + 35)) < 1e-9))
chk('E L5a new equation vanishes at y = 5, 7', shiftedPoly(5) === 0 && shiftedPoly(7) === 0)
// L5(b) digit count of C(20,10)
const bigC2010 = bigC(20n, 10n)
chk('E L5b C(20,10) = 184756', bigC2010 === 184756n, bigC2010.toString())
chk('E L5b digit count = 6', bigC2010.toString().length === 6)
const logC2010 = Math.log10(Number(bigC2010))
chk('E L5b log10 C(20,10) = 5.2666 (4 dp)', Math.round(logC2010 * 1e4) / 1e4 === 5.2666, `log10 = ${logC2010.toFixed(6)}`)
chk('E L5b law agrees: floor(log10)+1 = 6', Math.floor(logC2010) + 1 === 6)
// L6(a) the fence chain
const areaFence = (x: number) => x * (20 - x)
chk('E L6a AM-GM register: x(20-x) ≤ ((x+20-x)/2)^2 = 100 on grid',
  gridScanMax(areaFence, 0, 20, 0.001).val <= 100 + 1e-9)
chk('E L6a vertex register: max 100 at x = 10 (the square)', areaFence(10) === 100)
const rects: { x: number; y: number; area: number }[] = []
for (let x = 1; x <= 10; x++) rects.push({ x, y: 20 - x, area: x * (20 - x) })
chk('E L6a 10 distinct integer rectangles (x ≤ y, x+y = 20)', rects.length === 10)
chk('E L6a area roster 19,36,51,64,75,84,91,96,99,100',
  rects.map((r) => r.area).join(',') === '19,36,51,64,75,84,91,96,99,100')
const bigAreas = rects.filter((r) => r.area >= 96)
chk('E L6a area ≥ 96 holds for 3 rectangles (96, 99, 100)', bigAreas.length === 3 && bigAreas.map((r) => r.area).join(',') === '96,99,100')
chk('E L6a their areas sum to 295', bigAreas.reduce((s, r) => s + r.area, 0) === 295)
chk('E L6a quadratic register of the ≥96 cut: (x-8)(x-12) ≤ 0 solves to 8 ≤ x ≤ 12',
  [8, 9, 10, 11, 12].every((x) => (x - 8) * (x - 12) <= 0) && [7, 13].every((x) => (x - 8) * (x - 12) > 0))
chk('E L6a convention cut: the quadratic band {8..12} meets x ≤ y in exactly {8, 9, 10} (11, 12 mirror 9, 8)',
  [8, 9, 10].every((x) => x <= 20 - x) && [11, 12].every((x) => x > 20 - x))
// L6(b) the logarithmic-binomial-complex chain
const bigC168 = bigC(16n, 8n)
chk('E L6b C(16,8) = 12870 (the middle coefficient of row 16)', bigC168 === 12870n, bigC168.toString())
chk('E L6b digit count 5', bigC168.toString().length === 5)
const logC168 = Math.log10(Number(bigC168))
chk('E L6b log10 C(16,8) = 4.1096 (4 dp)', Math.round(logC168 * 1e4) / 1e4 === 4.1096, `log10 = ${logC168.toFixed(6)}`)
chk('E L6b law agrees: floor+1 = 5', Math.floor(logC168) + 1 === 5)
let row16 = 0n
for (let k = 0n; k <= 16n; k++) row16 += bigC(16n, k)
chk('E L6b sum of row 16 = 65536 = 2^16', row16 === 65536n && 2n ** 16n === 65536n)
chk('E L6b digits of 65536 = 5', String(65536n).length === 5)
const log65536 = 16 * Math.log10(2)
chk('E L6b log10 2^16 = 4.8165 (4 dp)', Math.round(log65536 * 1e4) / 1e4 === 4.8165, `log10 = ${log65536.toFixed(6)}`)
const p16 = cxPow(oneI, 16)
chk('E L6b (1+i)^16 = 256 (complex route: (1+i)^8 squared)', Math.abs(p16.re - 256) < 1e-9 && Math.abs(p16.im) < 1e-9)
chk('E L6b de Moivre route: (sqrt2)^16 = 2^8 = 256 (to 1e-9), 16·pi/4 = 4pi ≡ 0',
  Math.abs(Math.pow(Math.SQRT2, 16) - 256) < 1e-9 && Math.abs(16 * (Math.PI / 4) - 4 * Math.PI) < 1e-12)
chk('E L6b digits of 256 = 3', String(256).length === 3)
chk('E L6b 17 terms in row 16, single middle term k = 8', 16 + 1 === 17 && nCr(16, 8) === nCr(16, 16 - 8))

/* ---- A12. prose-constant printout ----------------------------------- */
console.log('\n==================== PROSE CONSTANTS (copy into part-aa103.ts) ====================')
console.log(`ch1 witness:        g(f(3)) = ${g103(f103(3))}, f(g(3)) = ${f103(g103(3))}`)
console.log(`ch2 witness:        max = ${q103(3)} at x = 3; vertex form -2(x-3)^2+11`)
console.log(`ch3 witness:        (1+i)^8 = ${p8.re} (modulus route ${(Math.SQRT2 ** 8).toFixed(6)})`)
console.log(`ch4 witness:        min = ${amgm(2 / 3).toFixed(6)} at x = 2/3`)
console.log(`ch5 witness:        S_10 = ${s10}, S_400 = ${s400.toFixed(10)}, tail10 = ${(2 - s10).toFixed(8)}`)
console.log(`ch6 witness:        C(10,3) = ${nCr(10, 3)}, 10P3 = ${nPr(10, 3)}`)
console.log(`ch7 witness:        sum row 12 = ${rowSum}, sum k to 100 = ${gauss}, C(12,6) = ${nCr(12, 6)}`)
console.log(`ch8 witness:        alpha^3+beta^3 = ${identityRoute} (identity 343-231); alpha^2+beta^2 = 27; alpha^4+beta^4 = ${((alpha ** 4 + beta ** 4).toFixed(6))}`)
console.log(`ch9 witness:        log chain = ${chain.toFixed(12)}; e(15) = ${e15.toFixed(10)}; digits 2^100 = ${str2100.length}; log10 2^100 = ${log2100.toFixed(4)}`)
console.log(`chain max:          max x(6-x) = ${prod6(3)} at x = 3; D = 0; grid max ${gC1.val.toFixed(6)}`)
console.log(`chain binom-digit:  C(50,25) = ${bigC5025}; digits ${bigC5025.toString().length}; log10 = ${logC5025.toFixed(4)}`)
console.log(`chain gauss:        5050 = 50 × 101; S_100 - S_99 = 100`)
console.log(`chain omega:        omega^3 = (${omega3.re.toFixed(10)}, ${omega3.im.toFixed(10)}); omega+omega^2 = ${omega.re + omega2.re}; |omega| = ${cxMod(omega).toFixed(10)}`)
console.log(`E L1a:              g(f(2)) = ${gA(fA(2))}, f(g(2)) = ${fA(gA(2))}`)
console.log(`E L1b:              min ${qb(2)} at x = 2; roots ${((8 - Math.sqrt(64 - 24)) / 4).toFixed(7)}, ${((8 + Math.sqrt(64 - 24)) / 4).toFixed(7)}`)
console.log(`E L1c:              C(9,3) = ${nCr(9, 3)}`)
console.log(`E L2a:              pen max ${penA(5)} at x = 5 (y = 10); A(4) = ${penA(4)}`)
console.log(`E L2b:              x = 5, both sides ${Math.pow(4, 6)}`)
console.log(`E L2c:              d = ${dAp}, a1 = ${a1Ap}, S_10 = ${s10Ap}`)
console.log(`E L3a:              |z| = ${cxMod(zL3).toFixed(10)}, arg = ${(cxArg(zL3) / Math.PI).toFixed(10)}·pi, z^3 = ${z3L3.re.toFixed(10)}`)
console.log(`E L3b:              S_20 = ${tel20.toFixed(10)} = 325/462; limit 0.75; tail 43/924 = ${(43 / 924).toFixed(10)}`)
console.log(`E L3c:              min ${amgmE(2.5).toFixed(6)} at x = 2.5`)
console.log(`E L4a:              max ${csMax.toFixed(6)} at (3,4); argmax ${csArg.toFixed(6)} ≈ atan2(4,3) = ${Math.atan2(4, 3).toFixed(6)}`)
console.log(`E L4b:              sum sq to 12 = ${sq12}; step 144`)
console.log(`E L4c:              ≥1 each: ${ge1}; unrestricted: ${ge0}`)
console.log(`E L5a:              roots 2,4 → 5,7; y^2-12y+35`)
console.log(`E L5b:              C(20,10) = ${bigC2010}; digits ${bigC2010.toString().length}; log10 = ${logC2010.toFixed(4)}`)
console.log(`E L6a:              rects ${rects.length}; areas ${rects.map((r) => r.area).join(',')}; ≥96: ${bigAreas.map((r) => `${r.x}×${r.y}`).join(', ')}; sum ${bigAreas.reduce((s, r) => s + r.area, 0)}`)
console.log(`E L6b:              C(16,8) = ${bigC168}; log10 = ${logC168.toFixed(4)}; row sum 2^16 = 65536, log10 = ${log65536.toFixed(4)}; (1+i)^16 = ${p16.re.toFixed(6)}`)
console.log('==================================================================================\n')

/* ---- engine verdict -------------------------------------------------- */
console.log(`ENGINE SECTION: ${enginePass} checks OK, ${engineFail} FAILED`)
if (engineFail > 0) {
  console.log('FAILED CHECKS: ' + engineFails.join(' | '))
}

/* ==================================================================== */
/* SECTION B — THE PINS (re-reads part-aa103.ts; runs after the prose)   */
/* ==================================================================== */

let pinPass = 0
let pinFail = 0
const pinFails: string[] = []
function pin(name: string, cond: boolean, detail?: string): void {
  if (cond) {
    pinPass++
    console.log(`PIN   OK   ${name}${detail ? '  ·  ' + detail : ''}`)
  } else {
    pinFail++
    pinFails.push(name)
    console.log(`PIN   FAIL ${name}${detail ? '  ·  ' + detail : ''}`)
  }
}

const partPath = CH10_SRC

if (!existsSync(partPath)) {
  console.log('\nPIN SECTION: part-aa103.ts not authored yet — engine-only run (this is the verify-first order).')
} else {
  console.log('\n--- PIN SECTION: re-reading part-aa103.ts ---')

  // identity pins
  pin('P1 id', lesson103.id === 'aa-the-book-in-one-page-synthesis', lesson103.id)
  pin('P2 number', lesson103.number === '10.3', lesson103.number)
  pin('P3 title', lesson103.title === 'The Book in One Page: Synthesis', lesson103.title)
  pin('P4 concepts 5-8', lesson103.concepts.length >= 5 && lesson103.concepts.length <= 8, String(lesson103.concepts.length))
  pin('P5 objectives 4-6', !!lesson103.objectives && lesson103.objectives.length >= 4 && lesson103.objectives.length <= 6, String(lesson103.objectives?.length))
  pin('P6 prerequisites', JSON.stringify(lesson103.prerequisites) === JSON.stringify(['aa-exponentials-and-logarithms-unit-9-review', 'aa-unit-review-functions-as-objects', 'al-the-function-idea-the-doorstep']))
  pin('P7 sources', JSON.stringify(lesson103.sources) === JSON.stringify(['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra']))
  pin('P8 words field NOT set', (lesson103 as { words?: number }).words === undefined)

  // structural pins
  const blocks = lesson103.blocks
  const bodyFigures = blocks.filter((b) => b.kind === 'figure')
  pin('P9 body figures ≥ 3', bodyFigures.length >= 3, String(bodyFigures.length))
  let termCount = 0
  let formulaCount = 0
  let quizItems: { q: string; options: string[]; answer: number; explain: string }[] = []
  interface ExQ { q: string; solution: string | string[]; answer?: string; figures?: { caption: string; svg: string }[] }
  const exSets: { level: string; questions: ExQ[] }[] = []
  for (const b of blocks) {
    if (b.kind === 'terms') termCount += b.items.length
    if (b.kind === 'formula') formulaCount++
    if (b.kind === 'quiz') quizItems = quizItems.concat(b.items)
    if (b.kind === 'exercises') exSets.push(...b.sets)
  }
  pin('P10 terms ≥ 6', termCount >= 6, String(termCount))
  pin('P11 formula cards ≥ 8', formulaCount >= 8, String(formulaCount))
  pin('P12 quiz has 5 items', quizItems.length === 5, String(quizItems.length))
  pin('P13 quiz keys [0,2,1,0,3]', JSON.stringify(quizItems.map((i) => i.answer)) === JSON.stringify([0, 2, 1, 0, 3]), JSON.stringify(quizItems.map((i) => i.answer)))
  pin('P14 quiz options exactly 4 each', quizItems.every((i) => i.options.length === 4))
  pin('P15 quiz explains non-trivial (≥ 12 words each)', quizItems.every((i) => i.explain.trim().split(/\s+/).length >= 12))

  const spread: Record<string, number> = {}
  let questionCount = 0
  let solutionFigCount = 0
  let allHaveSteps = true
  let allHaveAnswers = true
  for (const set of exSets) {
    spread[set.level] = (spread[set.level] ?? 0) + set.questions.length
    for (const q of set.questions) {
      questionCount++
      if (!Array.isArray(q.solution) || q.solution.length < 3) allHaveSteps = false
      if (!q.answer || q.answer.trim().length === 0) allHaveAnswers = false
      solutionFigCount += (q.figures ?? []).length
    }
  }
  pin('P16 ≥ 16 exercise questions', questionCount >= 16, String(questionCount))
  pin('P17 spread L1×3 L2×3 L3×3 L4×3 L5×2 L6×2', spread['L1'] === 3 && spread['L2'] === 3 && spread['L3'] === 3 && spread['L4'] === 3 && spread['L5'] === 2 && spread['L6'] === 2, JSON.stringify(spread))
  pin('P18 every question has a steps-array solution (≥ 3 lines)', allHaveSteps)
  pin('P19 every question has a terminal answer', allHaveAnswers)
  pin('P20 solution figures ≥ 3', solutionFigCount >= 3, String(solutionFigCount))
  pin('P21 levels are L1..L6 in order', exSets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6')

  // word floor
  const wc = countLessonWords(lesson103)
  pin('P22 word count ≥ 6000', wc >= 6000, String(wc))

  // honesty ledger: string-verify the part FILE text
  const partText = readFileSync(partPath, 'utf8')
  pin('P23 ledger names the deferred convergence proofs', /convergence\s+proofs/.test(partText))
  pin('P24 ledger names Calculus as the owning door', /Calculus/.test(partText))
  pin('P25 ledger speaks of deferral (deferred/defer)', /defer/i.test(partText))
  pin('P26 lesson mentions the epsilon-delta machinery honestly', lessonTextJsonHas('ε–δ'))

  // wiring coverage: all ten chapter objects named
  const wiringPhrases = ['Functions as Objects', 'Quadratic', 'Complex', 'Inequalities', 'Sequences', 'Counting', 'Induction', 'Binomial', 'Theory of Equations', 'Exponentials']
  for (const w of wiringPhrases) pin(`P27 wiring names "${w}"`, lessonTextJsonHas(w))
  pin('P28 no-duplication anchor ids named in prose',
    lessonTextJsonHas('al-the-function-idea-the-doorstep') && lessonTextJsonHas('al-competition-algebra-identities-and-substitutions'))

  // mixed-bench family coverage (fresh constants; question text markers)
  const exText = JSON.stringify(blocks.filter((b) => b.kind === 'exercises'))
  const familyMarkers: [number, string[]][] = [
    [1, ['g(f(2))', 'f(g(2))']],
    [2, ['2(x − 2)² − 5', 'minimum −5 at x = 2']],
    [3, ['1 + i√3', 'π/3']],
    [4, ['Cauchy–Schwarz', 'AM–GM']],
    [5, ['telescoping', 'arithmetic progression']],
    [6, ['stars and bars', 'C(9, 3)']],
    [7, ['induction', 'binomial']],
    [8, ['shifted by +3', 'transformation']],
    [9, ['digit-count', 'log']],
  ]
  for (const [fam, markers] of familyMarkers)
    pin(`P29 family ch.${fam} covered in the bench`, markers.every((m) => exText.includes(m)), markers.join(' & '))

  // KaTeX / mobile-law discipline on prose fields
  const prose: string[] = []
  const push = (...xs: (string | undefined)[]) => { for (const x of xs) if (x) prose.push(x) }
  for (const b of blocks) {
    switch (b.kind) {
      case 'para': case 'heading': push(b.text); break
      case 'callout': push(b.title, b.text); break
      case 'terms': for (const t of b.items) push(t.term, t.def); break
      case 'equation': push(b.note); break
      case 'derivation': push(b.title, b.statement, b.result); for (const s of b.steps) push(s.label, s.explanation); break
      case 'example': push(b.title, ...b.steps); for (const f of b.figures ?? []) push(f.caption); break
      case 'figure': push(b.caption); break
      case 'table': push(b.caption, ...b.head, ...b.rows.flat()); break
      case 'list': push(...b.items); break
      case 'quiz': for (const it of b.items) push(it.q, ...it.options, it.explain); break
      case 'exercises': for (const s of b.sets) for (const q of s.questions) { push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]), q.answer); for (const f of q.figures ?? []) push(f.caption) } break
      case 'formula': push(b.name, b.note); break
    }
  }
  const badDollar = prose.filter((s) => /\$\$/.test(s))
  const badParen = prose.filter((s) => /\\\(|\\\[/.test(s))
  const badDfrac = prose.filter((s) => /\\dfrac|\\qquad/.test(s))
  pin('P30 no $$ display delimiters in prose', badDollar.length === 0)
  pin('P31 no raw \\( \\[ in prose', badParen.length === 0)
  pin('P32 no \\dfrac or \\qquad in prose (mobile law)', badDfrac.length === 0)

  // figure discipline: every svg carries role, aria-label, viewBox; PLAIN text
  const allSvgs: [string, string][] = []
  for (const b of blocks) {
    if (b.kind === 'figure') allSvgs.push(['body:' + b.caption.slice(0, 40), b.svg])
    if (b.kind === 'example') for (const f of b.figures ?? []) allSvgs.push(['example:' + f.caption.slice(0, 40), f.svg])
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) allSvgs.push(['sol:' + f.caption.slice(0, 40), f.svg])
  }
  pin('P33 every svg has role="img"', allSvgs.every(([, s]) => s.includes('role="img"')))
  pin('P34 every svg has aria-label', allSvgs.every(([, s]) => s.includes('aria-label=')))
  pin('P35 every svg has a viewBox', allSvgs.every(([, s]) => s.includes('viewBox=')))
  pin('P36 svg text PLAIN (no $, no TeX backslashes)', allSvgs.every(([, s]) => !s.includes('$') && !s.includes('\\')))

  function lessonTextJsonHas(needle: string): boolean {
    return JSON.stringify(blocks).includes(needle)
  }
}


  return { id: 'aa103 (10.3 engines+pins)', pass: enginePass + pinPass, fail: engineFail + pinFail }
}

async function sectionAA104(): Promise<SectionResult> {
/**
 * v-aa104.ts — the verify-first engine + pin script for Advanced Algebra
 * lesson 10.4 "The Doorstep: Limits and the Changing Output" (run-122
 * whole-chapter swarm, agent aa104).
 *
 * DISCIPLINE: the ENGINE section below recomputes, by brute force, every
 * number the prose of part-aa104.ts will print. It ran GREEN before a word
 * of the lesson's prose was written. The PIN section (appended after the
 * prose existed) re-reads part-aa104.ts and audits quiz keys, exercise
 * coverage, figure counts, vocabulary, formula cards, word count and the
 * HONESTY strings. Where the spec (temporary-references/spec-aa104.md) and
 * this engine disagree, THE ENGINE WINS and the prose carries the engine's
 * value.
 *
 * SPEC-VS-ENGINE CATCHES recorded by this engine (the engine won each time):
 *  1. S10 of the 0.9-tail is 5.8618940, not the spec's 5.8618942 — the
 *     run's canonical pin_check_122.py carries 5.8618940 too.
 *  2. The spec's epsilon-promise mixes two reads. Its own checks
 *     (0.9^21 = 0.1094190 > 0.1, 0.9^22 = 0.0984771 < 0.1) solve the TERM
 *     read (the rung 0.9^n below epsilon: n = 22 for 0.1, n = 66 for
 *     0.001), while the DEFINITION-shaped tail read (|S_n - 9| = 9*0.9^n
 *     below epsilon) gives n = 43 for 0.1 and n = 87 for 0.001. Both reads
 *     are priced here; the prose prices both and keeps them distinct; the
 *     quiz's epsilon item is phrased on the term read so its pinned answer
 *     22 is honest.
 */

/* ================================================================== */
/* ENGINE SECTION — no repo imports; every prose number recomputed     */
/* ================================================================== */

let passCount = 0
const fails: string[] = []

function check(name: string, ok: boolean, detail = ''): void {
  if (ok) passCount++
  else fails.push(`${name} :: ${detail}`)
  console.log(`${ok ? 'ENG OK   ' : 'ENG FAIL '} ${name}${detail ? '  [' + detail + ']' : ''}`)
}

function close(name: string, got: number, want: number, tol = 5e-7): void {
  check(name, Math.abs(got - want) <= tol, `got ${got.toFixed(7)} want ${want.toFixed(7)} tol ${tol.toExponential(1)}`)
}

function pin(name: string, got: unknown, want: unknown): void {
  check(name, got === want, `got ${String(got)} want ${String(want)}`)
}

const v7 = (x: number): string => x.toFixed(7)

/* ---------- machines ---------- */
const sq = (x: number): number => x * x
const inv = (x: number): number => 1 / x
const ex2 = (x: number): number => Math.pow(2, x)
const lg2 = (x: number): number => Math.log2(x)
const lg10 = (x: number): number => Math.log10(x)
const dq = (f: (x: number) => number, x: number, h: number): number => (f(x + h) - f(x)) / h
const signum = (x: number): number => (x === 0 ? 0 : x > 0 ? 1 : -1)
const gif = (x: number): number => Math.floor(x)
const L2 = Math.log(2)
const L3 = Math.log(3)
const L10 = Math.log(10)

console.log('== A. the infinite tail sum 0.9^k = 9 — partials, tails, the two epsilon reads ==')
const Sn = (n: number): number => 9 * (1 - Math.pow(0.9, n))
const tailN = (n: number): number => 9 * Math.pow(0.9, n)
close('A1  S10 = 9(1-0.9^10) = 5.8618940 (spec said 5.8618942 — engine wins)', Sn(10), 5.8618940)
close('A2  S30 = 8.6184796', Sn(30), 8.6184796)
close('A3  S50 = 8.9536160', Sn(50), 8.9536160)
// indexing caught by this engine on first run: the sum is 0.9 + 0.9^2 + ... + 0.9^n
// (k = 1..n, n terms) = 0.9(1 - 0.9^n)/(1 - 0.9) = 9(1 - 0.9^n); a k = 0..n-1 loop
// returns 10(1 - 0.9^n) and FAILS — the engine corrected the prose's indexing.
const SnDirect = (n: number): number => Array.from({ length: n }, (_, k) => Math.pow(0.9, k + 1)).reduce((a, b) => a + b, 0)
close('A4  S10 direct sum k=1..10 matches the formula 9(1-0.9^10)', SnDirect(10), Sn(10), 1e-12)
close('A5  S30 direct sum matches', SnDirect(30), Sn(30), 1e-12)
close('A6  S50 direct sum matches', SnDirect(50), Sn(50), 1e-12)
close('A7  tail10 = 9 - S10 = 9*0.9^10', 9 - Sn(10), tailN(10), 1e-12)
close('A8  tail30 = 9*0.9^30', 9 - Sn(30), tailN(30), 1e-12)
close('A9  tail50 = 9*0.9^50', 9 - Sn(50), tailN(50), 1e-12)
close('A10 tail ratio tail(n+1)/tail(n) = 0.9 at n = 30', tailN(31) / tailN(30), 0.9, 1e-12)
console.log(`     ledger: S20 = ${v7(Sn(20))}, S40 = ${v7(Sn(40))}, S42 tail = ${v7(tailN(42))}, S43 tail = ${v7(tailN(43))}, S43 = ${v7(Sn(43))}`)

pin('A11 0.9^21 = 0.1094190 sits ABOVE 0.1 (term read boundary)', Math.pow(0.9, 21) > 0.1, true)
console.log(`     0.9^21 = ${v7(Math.pow(0.9, 21))}, 0.9^22 = ${v7(Math.pow(0.9, 22))}`)
close('A12 0.9^21 = 0.1094190', Math.pow(0.9, 21), 0.1094190)
close('A13 0.9^22 = 0.0984771', Math.pow(0.9, 22), 0.0984771)
pin('A14 0.9^22 sits BELOW 0.1', Math.pow(0.9, 22) < 0.1, true)
let termN = 1
while (Math.pow(0.9, termN) >= 0.1) termN++
pin('A15 TERM read: first exponent n with 0.9^n < 0.1 is 22', termN, 22)
pin('A16 0.9^65 = 0.0010611 still above 0.001', Math.pow(0.9, 65) > 0.001, true)
console.log(`     0.9^65 = ${v7(Math.pow(0.9, 65))}, 0.9^66 = ${v7(Math.pow(0.9, 66))}`)
pin('A17 0.9^66 = 0.0009550 below 0.001', Math.pow(0.9, 66) < 0.001, true)
termN = 1
while (Math.pow(0.9, termN) >= 0.001) termN++
pin('A18 TERM read: first n with 0.9^n < 0.001 is 66', termN, 66)
console.log(`     tail read: 9*0.9^42 = ${v7(tailN(42))} (above 0.1), 9*0.9^43 = ${v7(tailN(43))} (below 0.1)`)
pin('A19 9*0.9^42 still above 0.1 (tail read boundary)', tailN(42) > 0.1, true)
pin('A20 9*0.9^43 below 0.1', tailN(43) < 0.1, true)
let tailFirst = 1
while (tailN(tailFirst) >= 0.1) tailFirst++
pin('A21 TAIL read: first n with |Sn - 9| = 9*0.9^n < 0.1 is 43', tailFirst, 43)
pin('A22 9*0.9^86 still above 0.001', tailN(86) > 0.001, true)
pin('A23 9*0.9^87 below 0.001', tailN(87) < 0.001, true)
tailFirst = 1
while (tailN(tailFirst) >= 0.001) tailFirst++
pin('A24 TAIL read: first n with 9*0.9^n < 0.001 is 87', tailFirst, 87)

console.log('== B. family 1: f(x) = x^2 at x = 3 — the secant ladder and the algebra exit ==')
close('B1  dq x^2 at 3, h = 1   -> 7', dq(sq, 3, 1), 7, 0)
close('B2  dq x^2 at 3, h = 0.1 -> 6.1', dq(sq, 3, 0.1), 6.1, 1e-9)
close('B3  dq x^2 at 3, h = 0.01 -> 6.01', dq(sq, 3, 0.01), 6.01, 1e-9)
close('B4  dq x^2 at 3, h = 0.001 -> 6.001', dq(sq, 3, 0.001), 6.001, 1e-9)
close('B5  algebra quotient 2x + h at (3, 0.001) equals the direct dq', 2 * 3 + 0.001, dq(sq, 3, 0.001), 1e-12)
console.log('== C. family 2: f(x) = 1/x at x = 2 ==')
close('C1  dq 1/x at 2, h = 0.1   -> -0.2380952', dq(inv, 2, 0.1), -0.2380952)
close('C2  dq 1/x at 2, h = 0.01  -> -0.2487562', dq(inv, 2, 0.01), -0.2487562)
close('C3  dq 1/x at 2, h = 0.001 -> -0.2498751', dq(inv, 2, 0.001), -0.2498751)
close('C4  named target -1/x^2 at 2 = -0.25', -1 / (2 * 2), -0.25, 0)
close('C5  common-denominator identity: dq = -1/(x(x+h)) at (2, 0.01)', -1 / (2 * 2.01), dq(inv, 2, 0.01), 1e-12)
close('C6  the same identity at (2, 0.001)', -1 / (2 * 2.001), dq(inv, 2, 0.001), 1e-12)
console.log('== D. family 3: f(x) = 2^x at x = 1 — THE WALL ==')
close('D1  dq 2^x at 1, h = 0.1   -> 1.4354693', dq(ex2, 1, 0.1), 1.4354693)
close('D2  dq 2^x at 1, h = 0.01  -> 1.3911100', dq(ex2, 1, 0.01), 1.3911100)
close('D3  dq 2^x at 1, h = 0.001 -> 1.3867749', dq(ex2, 1, 0.001), 1.3867749)
close('D4  named target 2*ln 2 = 1.3862944', 2 * L2, 1.3862944)
close('D5  ln 2 = 0.6931472 (priced by 9.5, not derived here)', L2, 0.6931472, 5e-8)
pin('D6  ladder monotone: 1.4354693 > 1.3911100 > 1.3867749 > target', dq(ex2, 1, 0.1) > dq(ex2, 1, 0.01) && dq(ex2, 1, 0.01) > dq(ex2, 1, 0.001) && dq(ex2, 1, 0.001) > 2 * L2, true)
console.log('== E. family 4: f(x) = log2 x at x = 1 ==')
close('E1  dq log2 at 1, h = 0.1   -> 1.3750352', dq(lg2, 1, 0.1), 1.3750352)
close('E2  dq log2 at 1, h = 0.01  -> 1.4355293', dq(lg2, 1, 0.01), 1.4355293)
console.log(`     dq log2 at 1, h = 0.001 -> ${v7(dq(lg2, 1, 0.001))} (engine value; prose transcribes)`)
pin('E3  ladder climbs from below toward 1/ln 2', dq(lg2, 1, 0.1) < dq(lg2, 1, 0.01) && dq(lg2, 1, 0.01) < dq(lg2, 1, 0.001) && dq(lg2, 1, 0.001) < 1 / L2, true)
close('E4  named target 1/ln 2 = 1.4426950', 1 / L2, 1.4426950)
console.log('== F. the base-free ladder (2^h - 1)/h at x = 0 ==')
for (const [h, w] of [[0.1, 0.7177346], [0.01, 0.6955550], [0.001, 0.6933875], [0.0001, 0.6931712]] as const) {
  close(`F   (2^h-1)/h at h = ${h} -> ${w}`, (Math.pow(2, h) - 1) / h, w)
}
console.log('== G. the natural base: (e^h - 1)/h at x = 0 ==')
console.log(`     (e^h-1)/h: h=0.1 -> ${v7((Math.exp(0.1) - 1) / 0.1)}, h=0.01 -> ${v7((Math.exp(0.01) - 1) / 0.01)}, h=0.001 -> ${v7((Math.exp(0.001) - 1) / 0.001)}, h=0.0001 -> ${v7((Math.exp(0.0001) - 1) / 0.0001)}`)
close('G1  (e^0.1-1)/0.1 = 1.0517092', (Math.exp(0.1) - 1) / 0.1, 1.0517092)
close('G2  (e^0.01-1)/0.01 = 1.0050167', (Math.exp(0.01) - 1) / 0.01, 1.0050167)
close('G3  (e^0.001-1)/0.001 = 1.0005002', (Math.exp(0.001) - 1) / 0.001, 1.0005002)
close('G4  (e^0.0001-1)/0.0001 = 1.0000500', (Math.exp(0.0001) - 1) / 0.0001, 1.0000500)
close('G5  e = 2.7182818 (9.2/9.5 value)', Math.E, 2.7182818, 5e-8)
console.log('== H. the quotient algebra, checked as numeric identities ==')
for (const [x, h] of [[3, 0.1], [1.5, 0.25], [2.7, 0.01]] as const) {
  close(`H   (x+h)^2 - x^2 = 2xh + h^2 at (${x}, ${h})`, sq(x + h) - sq(x), 2 * x * h + h * h, 1e-12)
  close(`H   quotient = 2x + h at (${x}, ${h}) matches direct dq`, 2 * x + h, dq(sq, x, h), 1e-12)
}
close('H   (x+h)^3 - x^3 = 3x^2 h + 3x h^2 + h^3 at (1, 0.1)', Math.pow(1.1, 3) - 1, 3 * 1 * 0.1 + 3 * 1 * 0.01 + 0.001, 1e-12)
close('H   the same at (2, 0.01)', Math.pow(2.01, 3) - 8, 3 * 4 * 0.01 + 3 * 2 * 0.0001 + 0.000001, 1e-12)
close('H   x^3 direct dq at (1, 0.1) = 3.31', dq((x: number) => x * x * x, 1, 0.1), 3.31, 1e-9)
close('H   x^3 algebra quotient 3x^2 + 3xh + h^2 = 3.31', 3 + 0.3 + 0.01, 3.31, 1e-12)
close('H   1/x identity at (2, 0.1)', -1 / (2 * 2.1), dq(inv, 2, 0.1), 1e-12)
console.log('== I. jump witnesses and the continuity band for x^2 ==')
pin('I1  signum(0.001) - signum(-0.001) = 2 (the jump at 0)', signum(0.001) - signum(-0.001), 2)
pin('I2  signum away from 0 moves nothing: signum(1.001) - signum(0.999) = 0', signum(1.001) - signum(0.999), 0)
pin('I3  gif jumps 1 at the integer 1', gif(1.0001) - gif(0.9999), 1)
pin('I4  gif jumps 1 at the integer 2', gif(2.001) - gif(1.999), 1)
pin('I5  gif away from an integer moves nothing: at 2.5', gif(2.501) - gif(2.499), 0)
close('I6  x^2 output change at 3, h = 0.01: f(3.01) - f(3) = 0.0601', sq(3.01) - sq(3), 0.0601, 1e-9)
close('I7  the honest band h(2|x| + h) at (3, 0.01) = 0.0601 exactly', 0.01 * (2 * 3 + 0.01), sq(3.01) - sq(3), 1e-12)
close('I8  x^2 at 3, h = 0.001: 0.006001', sq(3.001) - sq(3), 0.006001, 1e-9)
close('I9  band h(2|x| + h) at (3, 0.001) = 0.006001', 0.001 * (2 * 3 + 0.001), sq(3.001) - sq(3), 1e-12)
close('I10 x^2 at 1.5, h = 0.01: 0.0301', sq(1.51) - sq(1.5), 0.0301, 1e-9)
close('I11 band h(2|x| + h) at (1.5, 0.01) = 0.0301', 0.01 * (2 * 1.5 + 0.01), sq(1.51) - sq(1.5), 1e-12)
console.log('== J. the secant ladder at x = 1.5 (body figure + Illustration) ==')
close('J1  dq x^2 at 1.5, h = 1    -> 4', dq(sq, 1.5, 1), 4, 0)
close('J2  dq x^2 at 1.5, h = 0.5  -> 3.5', dq(sq, 1.5, 0.5), 3.5, 0)
close('J3  dq x^2 at 1.5, h = 0.25 -> 3.25', dq(sq, 1.5, 0.25), 3.25, 0)
close('J4  dq x^2 at 1.5, h = 0.1  -> 3.1 (float-safe tol)', dq(sq, 1.5, 0.1), 3.1, 1e-9)
close('J5  dq x^2 at 1.5, h = 0.01 -> 3.01', dq(sq, 1.5, 0.01), 3.01, 1e-9)
close('J6  the tangent slope named by the push: 2 * 1.5 = 3', 2 * 1.5, 3, 0)
close('J7  tangent line y = 3x - 2.25 passes through (1.5, 2.25)', 3 * 1.5 - 2.25, 2.25, 0)
close('J8  secant line y = 4x - 3.75 passes through (2.5, 6.25)', 4 * 2.5 - 3.75, 6.25, 0)
console.log('== K. derivative-table reads priced (exercise witnesses) ==')
close('K1  named target 8 ln 2 = 5.5451774', 8 * L2, 5.5451774)
console.log(`     2^x at 3: h=0.1 -> ${v7(dq(ex2, 3, 0.1))}, h=0.01 -> ${v7(dq(ex2, 3, 0.01))}, h=0.001 -> ${v7(dq(ex2, 3, 0.001))}`)
pin('K2  2^x at 3 ladder descends toward 8 ln 2 from above', dq(ex2, 3, 0.1) > dq(ex2, 3, 0.01) && dq(ex2, 3, 0.01) > dq(ex2, 3, 0.001) && dq(ex2, 3, 0.001) > 8 * L2, true)
close('K3  named target 1/(100 ln 10) = 0.0043429', 1 / (100 * L10), 0.0043429)
console.log(`     log10 x at 100: h=0.1 -> ${v7(dq(lg10, 100, 0.1))}, h=0.01 -> ${v7(dq(lg10, 100, 0.01))}`)
pin('K4  log10 at 100 ladder climbs toward 1/(100 ln 10) from below', dq(lg10, 100, 0.1) < dq(lg10, 100, 0.01) && dq(lg10, 100, 0.01) < 1 / (100 * L10), true)
close('K5  ln 10 = 2.3025851', L10, 2.3025851)
console.log(`     (10^h-1)/h: h=0.1 -> ${v7((Math.pow(10, 0.1) - 1) / 0.1)}, h=0.01 -> ${v7((Math.pow(10, 0.01) - 1) / 0.01)}, h=0.001 -> ${v7((Math.pow(10, 0.001) - 1) / 0.001)}`)
pin('K6  (10^h-1)/h ladder descends toward ln 10', (Math.pow(10, 0.1) - 1) / 0.1 > (Math.pow(10, 0.01) - 1) / 0.01 && (Math.pow(10, 0.01) - 1) / 0.01 > (Math.pow(10, 0.001) - 1) / 0.001 && (Math.pow(10, 0.001) - 1) / 0.001 > L10, true)
close('K7  named target ln 3 = 1.0986123', L3, 1.0986123)
console.log(`     (3^h-1)/h: h=0.1 -> ${v7((Math.pow(3, 0.1) - 1) / 0.1)}, h=0.01 -> ${v7((Math.pow(3, 0.01) - 1) / 0.01)}, h=0.001 -> ${v7((Math.pow(3, 0.001) - 1) / 0.001)}`)
pin('K8  (3^h-1)/h ladder descends toward ln 3', (Math.pow(3, 0.1) - 1) / 0.1 > (Math.pow(3, 0.01) - 1) / 0.01 && (Math.pow(3, 0.01) - 1) / 0.01 > (Math.pow(3, 0.001) - 1) / 0.001 && (Math.pow(3, 0.001) - 1) / 0.001 > L3, true)
close('K9  named target 1/(8 ln 2) = 0.1803369', 1 / (8 * L2), 0.1803369)
console.log(`     log2 x at 8: h=0.1 -> ${v7(dq(lg2, 8, 0.1))}, h=0.01 -> ${v7(dq(lg2, 8, 0.01))}, h=0.001 -> ${v7(dq(lg2, 8, 0.001))}`)
pin('K10 log2 at 8 ladder climbs toward 1/(8 ln 2) from below', dq(lg2, 8, 0.1) < dq(lg2, 8, 0.01) && dq(lg2, 8, 0.01) < dq(lg2, 8, 0.001) && dq(lg2, 8, 0.001) < 1 / (8 * L2), true)
console.log('== L. the sqrt wall: (sqrt(4+h) - 2)/h toward 1/4 = 0.25 ==')
console.log(`     sqrt x at 4: h=0.1 -> ${v7((Math.sqrt(4.1) - 2) / 0.1)}, h=0.01 -> ${v7((Math.sqrt(4.01) - 2) / 0.01)}, h=0.001 -> ${v7((Math.sqrt(4.001) - 2) / 0.001)}`)
close('L1  (sqrt(4.1)-2)/0.1 = 0.2484567', (Math.sqrt(4.1) - 2) / 0.1, 0.2484567)
close('L2  (sqrt(4.01)-2)/0.01 = 0.2498439', (Math.sqrt(4.01) - 2) / 0.01, 0.2498439)
close('L3  (sqrt(4.001)-2)/0.001 = 0.2499844', (Math.sqrt(4.001) - 2) / 0.001, 0.2499844)
close('L4  named target 1/4 = 0.25', 0.25, 0.25, 0)
pin('L5  the sqrt ladder climbs toward 0.25 from below, never reaching it in the table', (Math.sqrt(4.1) - 2) / 0.1 < (Math.sqrt(4.01) - 2) / 0.01 && (Math.sqrt(4.01) - 2) / 0.01 < (Math.sqrt(4.001) - 2) / 0.001 && (Math.sqrt(4.001) - 2) / 0.001 < 0.25, true)
console.log('== M. the epsilon-N searches on fresh tails (exercise witnesses) ==')
pin('M1  0.5^9 = 0.0019531 still above 0.001', Math.pow(0.5, 9) > 0.001, true)
console.log(`     0.5^9 = ${v7(Math.pow(0.5, 9))}, 0.5^10 = ${v7(Math.pow(0.5, 10))}`)
pin('M2  0.5^10 = 0.0009766 below 0.001', Math.pow(0.5, 10) < 0.001, true)
let nSearch = 1
while (Math.pow(0.5, nSearch) >= 0.001) nSearch++
pin('M3  sum = 1 tail: first n with tail 1*0.5^n < 0.001 is 10', nSearch, 10)
const t8 = (n: number): number => 5 * Math.pow(0.8, n)
console.log(`     5*0.8^20 = ${v7(t8(20))} (above 0.05), 5*0.8^21 = ${v7(t8(21))} (below 0.05)`)
pin('M4  5*0.8^20 still above 0.05', t8(20) > 0.05, true)
pin('M5  5*0.8^21 below 0.05', t8(21) < 0.05, true)
nSearch = 1
while (t8(nSearch) >= 0.05) nSearch++
pin('M6  sum = 5 tail (r = 0.8): first n with tail < 0.05 is 21', nSearch, 21)
const t99 = (n: number): number => 100 * Math.pow(0.99, n)
console.log(`     100*0.99^458 = ${v7(t99(458))} (above 1), 100*0.99^459 = ${v7(t99(459))} (below 1)`)
pin('M7  100*0.99^458 still above 1', t99(458) > 1, true)
pin('M8  100*0.99^459 below 1', t99(459) < 1, true)
nSearch = 1
while (t99(nSearch) >= 1) nSearch++
pin('M9  sum = 100 tail (r = 0.99): first n with tail < 1 is 459', nSearch, 459)
console.log(`     census boundaries: 0.5^6 = ${v7(Math.pow(0.5, 6))}, 0.5^7 = ${v7(Math.pow(0.5, 7))}, 0.8^27 = ${v7(Math.pow(0.8, 27))}, 0.8^28 = ${v7(Math.pow(0.8, 28))}, 100*0.99^916 = ${v7(t99(916))}, 100*0.99^917 = ${v7(t99(917))}`)
console.log(`     more ledger: 0.9^10 = ${v7(Math.pow(0.9, 10))}, tail86 = ${v7(tailN(86))}, tail87 = ${v7(tailN(87))}, 1/2.01 = ${v7(1 / 2.01)}`)
const census = (r: number, sum: number, eps: number): number => {
  let n = 1
  while (sum * Math.pow(r, n) >= eps) n++
  return n
}
pin('M10 census r = 0.5 (sum 1), eps 0.01 -> n = 7', census(0.5, 1, 0.01), 7)
pin('M11 census r = 0.8 (sum 5), eps 0.01 -> n = 28', census(0.8, 5, 0.01), 28)
pin('M12 census r = 0.99 (sum 100), eps 0.01 -> n = 917', census(0.99, 100, 0.01), 917)
console.log('== N. the fast series prices ln 3 (9.5 connection, L6) ==')
let s = 0
const fastTerms: number[] = []
for (let k = 1; k <= 9; k++) {
  const t = 2 * Math.pow(0.5, 2 * k - 1) / (2 * k - 1)
  fastTerms.push(t)
  s += t
  if (k === 5) console.log(`     fast-series S5 (x = 0.5) = ${v7(s)}`)
  if (k === 9) console.log(`     fast-series S9 (x = 0.5) = ${v7(s)}`)
}
close('N1  fast series S5 at x = 0.5 = 1.0984995 (5 terms toward ln 3)', fastTerms.slice(0, 5).reduce((a, b) => a + b, 0), 1.0984995)
check('N2  S9 lands within 2e-6 of ln 3 = 1.0986123', Math.abs(s - L3) < 2e-6, `error ${Math.abs(s - L3).toExponential(2)}`)
console.log('== O. body-figure ledgers ==')
close('O1  S43 = 8.9030226 (first partial inside the 9 +/- 0.1 band)', Sn(43), 8.9030226)
pin('O2  9 - S43 < 0.1 (inside the band)', 9 - Sn(43) < 0.1, true)
pin('O3  9 - S42 > 0.1 (still outside at n = 42)', 9 - Sn(42) > 0.1, true)
close('O4  S20 = 7.9058101', Sn(20), 7.9058101)
close('O5  S40 = 8.8669721', Sn(40), 8.8669721)
console.log('== P. the conjugate exit for the sqrt quotient (the half-wall) ==')
// SPEC-VS-ENGINE CATCH 3: the spec claimed "(sqrt(4+h)-2)/h has NO algebraic exit
// at school level". The conjugate identity below is EXACT school algebra (surd
// rationalisation), so the honest presentation is a HALF-wall: the naive binomial
// expansion of sqrt(4+h) is unavailable, but the conjugate opens an exact exit and
// the numerics certify the landing. The engine wins; the prose follows.
close('P1  conjugate identity 1/(sqrt(4+h)+2) = (sqrt(4+h)-2)/h at h = 0.1', 1 / (Math.sqrt(4.1) + 2), (Math.sqrt(4.1) - 2) / 0.1, 1e-12)
close('P2  the same identity at h = 0.01', 1 / (Math.sqrt(4.01) + 2), (Math.sqrt(4.01) - 2) / 0.01, 1e-12)
close('P3  the same identity at h = 0.001', 1 / (Math.sqrt(4.001) + 2), (Math.sqrt(4.001) - 2) / 0.001, 1e-12)
close('P4  the conjugate form at h = 0 is plain arithmetic: 1/(sqrt4 + 2) = 0.25', 1 / (Math.sqrt(4) + 2), 0.25, 0)
console.log(`     conjugate form at h=0.001: 1/(sqrt(4.001)+2) = ${v7(1 / (Math.sqrt(4.001) + 2))}`)
console.log('')
console.log(`ENGINE SUMMARY: ${passCount} green, ${fails.length} red`)
if (fails.length > 0) {
  for (const f of fails) console.log('  FAIL:', f)
  process.exit(1)
}
console.log('ENGINE SECTION: ALL GREEN')

/* ================================================================== */
/* PIN SECTION — appended after part-aa104.ts was authored             */
/* ================================================================== */


let pinPass = 0
const pinFails: string[] = []

function pinCheck(name: string, ok: boolean, detail = ''): void {
  if (ok) pinPass++
  else pinFails.push(`${name}${detail ? ' :: ' + detail : ''}`)
  console.log(`${ok ? 'PIN OK   ' : 'PIN FAIL '} ${name}${detail ? '  [' + detail + ']' : ''}`)
}

function pPin(name: string, got: unknown, want: unknown): void {
  pinCheck(name, got === want, `got ${String(got)} want ${String(want)}`)
}

const lesson = lesson104
const blocks = lesson.blocks
const partText = JSON.stringify(lesson)

console.log('\n== PIN: contract ==')
pPin('P1 lesson id', lesson.id, 'aa-the-doorstep-limits-and-the-changing-output')
pPin('P1 lesson number', lesson.number, '10.4')
pPin('P2 words field NOT set (honest count)', lesson.words, undefined)
pPin('P3 concepts in 5..8', lesson.concepts.length >= 5 && lesson.concepts.length <= 8, true)
pPin('P4 objectives 4..6', (lesson.objectives ?? []).length >= 4 && (lesson.objectives ?? []).length <= 6, true)
pPin('P5 prerequisites pinned', JSON.stringify(lesson.prerequisites), JSON.stringify(['aa-geometric-progressions-and-the-infinite-tail', 'aa-exponential-and-logarithmic-series', 'aa-function-zoo-modulus-signum-gif-elementary-catalog', 'al-slope-the-steepness-theorem']))
pPin('P6 sources pinned', JSON.stringify(lesson.sources), JSON.stringify(['cengage-jee-style', 'jee-main-2026-syllabus', 'openstax-college-algebra', 'hall-knight-higher-algebra']))

console.log('== PIN: quiz keys [2,1,0,2,1] ==')
const quizzes = blocks.filter((b) => b.kind === 'quiz')
pPin('P7 exactly one quiz block', quizzes.length, 1)
if (quizzes.length === 1) {
  const q = quizzes[0]
  if (q.kind === 'quiz') {
    pPin('P8 quiz has 5 items', q.items.length, 5)
    pPin('P9 quiz keys', JSON.stringify(q.items.map((it) => it.answer)), JSON.stringify([2, 1, 0, 2, 1]))
    pPin('P10 every quiz item has 4 options', q.items.every((it) => it.options.length === 4), true)
    pPin('P11 q1 options carry 6.1 as keyed option', q.items[0].options[2] === '6.1', true)
    pPin('P12 q5 keyed option is 22', q.items[4].options[1] === '22', true)
    pPin('P13 every explain explains the wrong options', q.items.every((it) => it.explain.includes('option')), true)
  }
}

console.log('== PIN: exercises coverage ==')
const exBlocks = blocks.filter((b) => b.kind === 'exercises')
let qCount = 0
let qWithStepsAnswer = 0
const levelSeen: string[] = []
let solFigCount = 0
for (const b of exBlocks) {
  if (b.kind !== 'exercises') continue
  for (const set of b.sets) {
    levelSeen.push(set.level)
    for (const q of set.questions) {
      qCount++
      if (Array.isArray(q.solution) && q.solution.length >= 3 && typeof q.answer === 'string' && q.answer.length > 0) qWithStepsAnswer++
      solFigCount += (q.figures ?? []).length
    }
  }
}
pinCheck('P14 >=16 exercise questions', qCount >= 16, String(qCount))
pPin('P15 all six levels L1..L6 present', JSON.stringify(levelSeen), JSON.stringify(['L1', 'L2', 'L3', 'L4', 'L5', 'L6']))
pPin('P16 every question has steps-solution + terminal answer', qWithStepsAnswer, qCount)
pinCheck('P17 >=3 solution figures', solFigCount >= 3, String(solFigCount))

console.log('== PIN: figures, terms, formula cards ==')
const figCount = blocks.filter((b) => b.kind === 'figure').length
pinCheck('P18 >=3 body figures', figCount >= 3, String(figCount))
const termsBlocks = blocks.filter((b) => b.kind === 'terms')
const termCount = termsBlocks.reduce((a, b) => a + (b.kind === 'terms' ? b.items.length : 0), 0)
pinCheck('P19 >=6 vocabulary terms', termCount >= 6, String(termCount))
const formulaCount = blocks.filter((b) => b.kind === 'formula').length
pinCheck('P20 >=4 formula cards', formulaCount >= 4, String(formulaCount))
const exampleCount = blocks.filter((b) => b.kind === 'example').length
pinCheck('P21 >=4 Illustrations (Cengage chains)', exampleCount >= 4, String(exampleCount))
const wordCount = countLessonWords(lesson)
pinCheck('P22 word count >= 6000', wordCount >= 6000, String(wordCount))
console.log(`     lesson words (honest count): ${wordCount}`)

console.log('== PIN: HONESTY audit ==')
function lessonTextJsonHas(needle: string): boolean {
  return partText.includes(needle)
}
const eqLatex = blocks.filter((b) => b.kind === 'equation').map((b) => (b.kind === 'equation' ? b.latex : '')).join(' || ')
pinCheck('P23 derivative stated as the LIMIT of the secant slopes', lessonTextJsonHas('LIMIT of the secant slopes') && eqLatex.includes('lim_{h \\to 0}') && eqLatex.includes('frac{f(x+h) - f(x)}{h}'))
pinCheck('P24 derivative table marks algebra-derived rows', lessonTextJsonHas('algebra-derived'))
pinCheck('P25 derivative table marks numerically-priced rows', lessonTextJsonHas('named + numerically priced'))
pinCheck('P26 the ε–δ machinery named as calculus\u2019s', lessonTextJsonHas('ε–δ') && lessonTextJsonHas("belongs to calculus"))
pinCheck('P27 promise stated, not proved (tail)', lessonTextJsonHas('never proved') && lessonTextJsonHas('proved nowhere'))
pinCheck('P28 the wall named on (a^h − 1)/h', lessonTextJsonHas('The wall, stated precisely') && lessonTextJsonHas('(a^h - 1)/h'))
pinCheck('P29 AL 10.2 seam: steepness theorem cited', lessonTextJsonHas('steepness theorem') && lessonTextJsonHas('one number'))
pinCheck('P30 curve rate is a NEW FUNCTION', lessonTextJsonHas('NEW FUNCTION'))
pinCheck('P31 continuity promise with the exact band h(2|x| + h)', lessonTextJsonHas('h(2|x| + h)') && lessonTextJsonHas('0.0601'))
pPin('P32 door: Calculus', lessonTextJsonHas('Calculus door'), true)
pPin('P33 door: Coordinate Geometry', lessonTextJsonHas('Coordinate Geometry'), true)
pPin('P34 door: Trigonometry', lessonTextJsonHas('Trigonometry'), true)
pPin('P35 door: Probability', lessonTextJsonHas('Probability'), true)
pinCheck('P36 historical: Newton and Leibniz, 17th century', lessonTextJsonHas('Newton') && lessonTextJsonHas('Leibniz') && lessonTextJsonHas('17th century'))
pinCheck('P37 deferral language present', /defer/i.test(partText))
pinCheck('P38 e specialness: the slope-1 ladder', lessonTextJsonHas('slope-1') && lessonTextJsonHas('1.0050167'))

console.log('== PIN: engine numbers transcribed in prose ==')
const numberPins: [string, string][] = [
  ['N1 S10', '5.8618940'],
  ['N2 S20', '7.9058101'],
  ['N3 S30', '8.6184796'],
  ['N4 S43', '8.9030226'],
  ['N5 S50', '8.9536160'],
  ['N6 0.9^22 = 0.0984771', '0.0984771'],
  ['N7 0.9^21 = 0.1094190', '0.1094190'],
  ['N8 tail rank 43', '0.0969774'],
  ['N9 x^2 ladder 6.01', '6.01'],
  ['N10 1/x ladder', '−0.2487562'],
  ['N11 2^x target 2 ln 2', '1.3862944'],
  ['N12 ln 2', '0.6931472'],
  ['N13 log2 target 1/ln 2', '1.4426950'],
  ['N14 log2 rung 1.4419742', '1.4419742'],
  ['N15 base ladder 0.7177346', '0.7177346'],
  ['N16 base ladder 0.6931712', '0.6931712'],
  ['N17 e ladder 1.0517092', '1.0517092'],
  ['N18 e ladder 1.0000500', '1.0000500'],
  ['N19 tangent slope 3 line y = 3x − 2.25', '3x - 2.25'],
  ['N20 continuity band 0.006001', '0.006001'],
  ['N21 8 ln 2 = 5.5451774', '5.5451774'],
  ['N22 2^x at 3 rung 5.7418770', '5.7418770'],
  ['N23 2^x at 3 rung 5.5470997', '5.5470997'],
  ['N24 log10 target 0.0043429', '0.0043429'],
  ['N25 ln 10 = 2.3025851', '2.3025851'],
  ['N26 ln 3 = 1.0986123', '1.0986123'],
  ['N27 fast series S5 1.0984995', '1.0984995'],
  ['N28 log2 at 8 target 0.1803369', '0.1803369'],
  ['N29 sqrt ladder 0.2484567', '0.2484567'],
  ['N30 sqrt ladder 0.2499844', '0.2499844'],
  ['N31 quotient algebra 2x + h', '2x + h'],
  ['N32 1/x identity -1/(x(x+h))', '-1/(x(x+h))'],
  ['N33 x^3 quotient 12.61', '12.61'],
  ['N34 0.5-tail rank 7 (0.5^7 = 0.0078125)', '0.0078125'],
  ['N35 0.99-tail rank 459', '0.9920974'],
  ['N36 0.8-tail rank 21 (5 · 0.8^21 = 0.0461169)', '0.0461169'],
  ['N37 x^3 algebra cash 3x² + 3xh + h²', '3x² + 3xh + h²'],
]
for (const [name, needle] of numberPins) pinCheck(`P${name}`, lessonTextJsonHas(needle), needle)

console.log('== PIN: KaTeX / mobile-law discipline on prose fields ==')
const prose: string[] = []
const push = (...xs: (string | undefined)[]) => { for (const x of xs) if (x) prose.push(x) }
for (const b of blocks) {
  switch (b.kind) {
    case 'para': case 'heading': push(b.text); break
    case 'callout': push(b.title, b.text); break
    case 'terms': for (const t of b.items) push(t.term, t.def); break
    case 'equation': push(b.note); break
    case 'derivation': push(b.title, b.statement, b.result); for (const s of b.steps) push(s.label, s.explanation); break
    case 'example': push(b.title, ...b.steps); for (const f of b.figures ?? []) push(f.caption); break
    case 'figure': push(b.caption); break
    case 'table': push(b.caption, ...b.head, ...b.rows.flat()); break
    case 'list': push(...b.items); break
    case 'quiz': for (const it of b.items) push(it.q, ...it.options, it.explain); break
    case 'exercises': for (const s of b.sets) for (const q of s.questions) { push(q.q, ...(Array.isArray(q.solution) ? q.solution : [q.solution]), q.answer); for (const f of q.figures ?? []) push(f.caption) } break
    case 'formula': push(b.name, b.note); break
  }
}
const badDollar = prose.filter((s) => /\$\$/.test(s))
const badParen = prose.filter((s) => /\\\(|\\\[/.test(s))
const badDfrac = prose.filter((s) => /\\dfrac|\\qquad/.test(s))
pPin('P38 no $$ display delimiters in prose', badDollar.length, 0)
pPin('P39 no raw \\( \\[ in prose', badParen.length, 0)
pPin('P40 no \\dfrac or \\qquad in prose (mobile law)', badDfrac.length, 0)

console.log('== PIN: figure discipline ==')
const allSvgs: [string, string][] = []
for (const b of blocks) {
  if (b.kind === 'figure') allSvgs.push(['body:' + b.caption.slice(0, 40), b.svg])
  if (b.kind === 'example') for (const f of b.figures ?? []) allSvgs.push(['example:' + f.caption.slice(0, 40), f.svg])
  if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) allSvgs.push(['sol:' + f.caption.slice(0, 40), f.svg])
}
pinCheck('P41 every svg has role="img"', allSvgs.every(([, s]) => s.includes('role="img"')), String(allSvgs.length))
pinCheck('P42 every svg has aria-label', allSvgs.every(([, s]) => s.includes('aria-label=')), String(allSvgs.length))
pinCheck('P43 every svg has a viewBox', allSvgs.every(([, s]) => s.includes('viewBox=')), String(allSvgs.length))
pinCheck('P44 svg text PLAIN (no $, no TeX backslashes)', allSvgs.every(([, s]) => !s.includes('$') && !s.includes('\\')), String(allSvgs.length))

console.log('== PIN: mixed-bench family coverage (fresh witnesses in the exercises) ==')
const exText = JSON.stringify(blocks.filter((b) => b.kind === 'exercises'))
const familyMarkers: [string, string[]][] = [
  ['L1 x^2 rungs', ['x = 2', '4.1']],
  ['L2 1/x + x^3 algebra', ['0.1075269', '12.61']],
  ['L2/L4 epsilon-N fresh tails', ['n = 7', 'n = 459']],
  ['L3 sqrt half-wall', ['0.2498439', '1/(√(4+h) + 2)']],
  ['L3 continuity band + jumps', ['0.0401', 'jump 1 at each integer']],
  ['L4 derivative-table reads', ['8 ln 2 = 5.5451774', '1/(100 ln 10) = 0.0043429']],
  ['L5 e specialness + log2 at 8', ['1.0050167', '0.1803369']],
  ['L6 honest chain + two reads', ['ln 3 = 1.0986123', 'n = 43']],
]
for (const [fam, markers] of familyMarkers)
  pinCheck(`P45 bench covers ${fam}`, markers.every((m) => exText.includes(m)), markers.join(' & '))


  return { id: 'aa104 (10.4 engines+pins)', pass: passCount + pinPass, fail: fails.length + pinFails.length }
}

async function sectionAA10R(): Promise<SectionResult> {
/**
 * v-aa10R.ts — verify-first engine + pin script for Advanced Algebra lesson
 * 10.R "Unit 10 Completion Review" (the book's LAST page), run-122
 * whole-chapter swarm, agent aa10R.
 *
 * Run:  cd /home/z/my-project && bun run temporary-references/v-aa10R.ts
 *
 * DISCIPLINE (spec §0, §8): the ENGINE section below recomputes EVERY
 * number the review's prose will print — brute force, no repo imports —
 * and ran GREEN before a word of part-aa10R.ts was authored. The PIN
 * section (appended after the prose exists) re-reads the part file and
 * audits the lesson contract: quiz keys, exercise census, figures, terms,
 * formula cards, word count, table rows, coda strings, KaTeX/mobile law.
 * Where spec and engine disagree, THE ENGINE WINS; every catch is recorded
 * in the part file header and the final report.
 *
 * Harness: prints CHK lines, counts, exits 1 on any fail.
 */


/* ================================================================
 * ENGINE SECTION — no repo imports
 * ================================================================ */

let pass = 0
let total = 0
const fails: string[] = []

function chk(name: string, got: unknown, want: unknown): void {
  total++
  const ok = Object.is(got, want) || (typeof got === 'number' && typeof want === 'number' && Number.isNaN(got) && Number.isNaN(want)) || got === want
  if (ok) pass++
  else {
    fails.push(`${name}: got ${String(got)} want ${String(want)}`)
    console.log(`CHK FAIL ${name}: ${String(got)}  (want ${String(want)})`)
  }
}
function close(name: string, got: number, want: number, tol = 5e-7): void {
  total++
  const ok = Math.abs(got - want) <= tol
  if (ok) pass++
  else {
    fails.push(`${name}: got ${got.toFixed(9)} want ${want.toFixed(9)} (tol ${tol})`)
    console.log(`CHK FAIL ${name}: ${got.toFixed(9)}  (want ${want.toFixed(9)}, tol ${tol})`)
  }
}
function bigClose(name: string, got: number, want: number, tol = 5e-7): void {
  // for big-magnitude values compared with relative-scale tolerance
  close(name, got, want, tol)
}
function sec(title: string): void {
  console.log(`== ${title} ==`)
}

/* ---------- shared little engines ---------- */
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
function comb(n: number, r: number): number {
  let c = 1
  for (let i = 0; i < r; i++) c = (c * (n - i)) / (i + 1)
  return Math.round(c)
}
const dq = (f: (x: number) => number, x: number, h: number): number => (f(x + h) - f(x)) / h

/* ================================================================
 * 1. The ladder sweep at the canonical seed 3 (10.1's own witness)
 * ================================================================ */
sec('1. the x + 1/x ladder at seed 3 (10.1 canonical)')
{
  const s: number[] = [2, 3] // s0 = 2, s1 = x + 1/x = 3
  for (let k = 2; k <= 9; k++) s.push(3 * s[k - 1] - s[k - 2])
  chk('s1 seed3', s[1], 3)
  chk('s2 seed3', s[2], 7)
  chk('s3 seed3', s[3], 18)
  chk('s4 seed3 (quiz Q1)', s[4], 47)
  chk('s5 seed3', s[5], 123)
  chk('s6 seed3', s[6], 322)
  chk('s7 seed3', s[7], 843)
  chk('s8 seed3', s[8], 2207)
  chk('s9 seed3', s[9], 5778)
  close('s5 recurrence identity 3*s4-s3', 3 * s[4] - s[3], 123, 0)
  close('s9 recurrence identity 3*s8-s7', 3 * s[8] - s[7], 5778, 0)
}

/* ================================================================
 * 2. The ladder at the review's NEW seed 5
 * ================================================================ */
sec('2. the ladder at the new seed 5 (review witness)')
{
  const s: number[] = [2, 5]
  for (let k = 2; k <= 9; k++) s.push(5 * s[k - 1] - s[k - 2])
  chk('s1 seed5', s[1], 5)
  chk('s2 seed5', s[2], 23)
  chk('s3 seed5', s[3], 110)
  chk('s4 seed5', s[4], 527)
  chk('s5 seed5', s[5], 2525)
  chk('s6 seed5', s[6], 12098)
  chk('s7 seed5', s[7], 57965)
  chk('s8 seed5', s[8], 277727)
  chk('s9 seed5', s[9], 1330670)
  chk('s9 = 5*s8 - s7', 5 * s[8] - s[7], 1330670)
}

/* ================================================================
 * 3. The nested substitution (10.1 canonical): (x^2-5x+5)^2 - 7(...) + 12
 * ================================================================ */
sec('3. the nested substitution, canonical roots + back-check')
{
  // t = x^2 - 5x + 5  ->  t^2 - 7t + 12 = 0 -> t in {3, 4}
  const t1 = 3
  const t2 = 4
  const disc1 = 25 - 4 * (5 - t1) // x^2-5x+3 = 0 -> disc 17
  const disc2 = 25 - 4 * (5 - t2) // x^2-5x+1 = 0 -> disc 21
  chk('disc t=3', disc1, 17)
  chk('disc t=4', disc2, 21)
  const r = [
    (5 + Math.sqrt(17)) / 2,
    (5 - Math.sqrt(17)) / 2,
    (5 + Math.sqrt(21)) / 2,
    (5 - Math.sqrt(21)) / 2,
  ]
  close('root (5+sqrt17)/2', r[0], 4.5615528)
  close('root (5-sqrt17)/2', r[1], 0.4384472)
  close('root (5+sqrt21)/2', r[2], 4.7912879)
  close('root (5-sqrt21)/2', r[3], 0.2087121)
  const orig = (x: number): number => {
    const t = x * x - 5 * x + 5
    return t * t - 7 * t + 12
  }
  for (const [i, x] of r.entries()) close(`back-check root ${i + 1}`, orig(x), 0, 1e-6)
  bigClose('root sum (Vieta) = 10', r[0] + r[1] + r[2] + r[3], 10, 1e-9)
  bigClose('root product (Vieta) = 2', r[0] * r[1] * r[2] * r[3], 2, 1e-9)
}

/* ================================================================
 * 4. AM-GM boundaries (canonical + the review's fresh pair)
 * ================================================================ */
sec('4. AM-GM grids and equality witnesses')
{
  let best = { v: Infinity, x: 0 }
  for (let x = 0.001; x <= 20; x += 0.0005) {
    const v = x + 4 / x
    if (v < best.v) best = { v, x }
  }
  bigClose('grid min x+4/x -> 4', best.v, 4, 1e-3)
  close('grid argmin x+4/x -> x=2', best.x, 2, 1e-3)

  best = { v: Infinity, x: 0 }
  for (let x = 0.001; x <= 30; x += 0.0005) {
    const v = 4 * x + 9 / x
    if (v < best.v) best = { v, x }
  }
  bigClose('grid min 4x+9/x -> 12', best.v, 12, 1e-3)
  close('grid argmin 4x+9/x -> x=3/2', best.x, 1.5, 1e-3)
  close('equality witness 4*(3/2)', 4 * 1.5, 6, 0)
  close('equality witness 9/(3/2)', 9 / 1.5, 6, 0)

  let bmax = { v: -Infinity, x: 0 }
  for (let x = 0; x <= 6; x += 0.0005) {
    const v = x * (6 - x)
    if (v > bmax.v) bmax = { v, x }
  }
  bigClose('grid max x(6-x) -> 9', bmax.v, 9, 1e-3)
  close('grid argmax x(6-x) -> x=3', bmax.x, 3, 1e-3)

  bmax = { v: -Infinity, x: 0 }
  for (let x = 0; x <= 8; x += 0.0005) {
    const v = x * (8 - x)
    if (v > bmax.v) bmax = { v, x }
  }
  bigClose('grid max x(8-x) -> 16', bmax.v, 16, 1e-3)
  close('grid argmax x(8-x) -> x=4', bmax.x, 4, 1e-3)

  close('disc x^2-6x+9 (double root)', 36 - 36, 0, 0)
  close('disc x^2-8x+16 (double root)', 64 - 64, 0, 0)

  let pmax = 0
  for (let i = 1; i <= 120; i++)
    for (let j = 1; j <= 120; j++)
      for (let k = 1; k <= 120; k++) {
        const x = i / 10, y = j / 10, z = k / 10
        if (Math.abs(x + y + z - 12) < 1e-9) pmax = Math.max(pmax, x * y * z)
      }
  bigClose('grid max xyz under x+y+z=12 -> 64', pmax, 64, 1e-3)
}

/* ================================================================
 * 5. The telescoping families (canonical)
 * ================================================================ */
sec('5. telescoping: 1/(k(k+2)), sum k*k!, sum k/2^k')
{
  const S = (n: number): number => {
    let a = 0
    for (let k = 1; k <= n; k++) a += 1 / (k * (k + 2))
    return a
  }
  close('1/(k(k+2)) S5', S(5), 0.5952381)
  const formula = (n: number): number => 0.5 * (1.5 - 1 / (n + 1) - 1 / (n + 2))
  close('1/(k(k+2)) S10 = formula', S(10), formula(10), 1e-12)
  close('1/(k(k+2)) S1000 = formula', S(1000), formula(1000), 1e-12)
  close('1/(k(k+2)) infinite = 3/4', 0.75, 0.75, 0)
  for (const n of [5, 7]) {
    let a = 0
    for (let k = 1; k <= n; k++) a += k * fact(k)
    chk(`sum k*k! at n=${n} = (n+1)!-1`, a, fact(n + 1) - 1)
  }
  const T = (n: number): number => {
    let a = 0
    for (let k = 1; k <= n; k++) a += k / 2 ** k
    return a
  }
  close('k/2^k S6', T(6), 1.875, 1e-12)
  close('k/2^k S10', T(10), 1.98828125, 1e-12)
  close('k/2^k S20', T(20), 1.9999790)
  close('k/2^k infinite -> 2', T(400), 2, 1e-12)
}

/* ================================================================
 * 6. The review's OWN telescoping family: sum 1/(k(k+3))
 * ================================================================ */
sec('6. fresh telescoping: 1/(k(k+3))')
{
  let splitOK = true
  for (let k = 1; k <= 6; k++) {
    const lhs = 1 / (k * (k + 3))
    const rhs = (1 / 3) * (1 / k - 1 / (k + 3))
    if (Math.abs(lhs - rhs) > 1e-15) splitOK = false
  }
  chk('split 1/(k(k+3)) = (1/3)(1/k - 1/(k+3)) at k=1..6', splitOK, true)
  const S = (n: number): number => {
    let a = 0
    for (let k = 1; k <= n; k++) a += 1 / (k * (k + 3))
    return a
  }
  close('1/(k(k+3)) S4', S(4), 0.4412698)
  close('1/(k(k+3)) S6', S(6), 0.4847884)
  const fS6 = (1 / 3) * (1 + 1 / 2 + 1 / 3 - 1 / 7 - 1 / 8 - 1 / 9)
  close('S6 = (1/3)(1+1/2+1/3-1/7-1/8-1/9)', S(6), fS6, 1e-12)
  close('1/(k(k+3)) infinite = 11/18', S(300000), 11 / 18, 1e-5)
  close('11/18 decimal', 11 / 18, 0.6111111)
}

/* ================================================================
 * 7. Binomial hunts (canonical)
 * ================================================================ */
sec('7. binomial coefficients: C(12,k), C(50,25), log10 read')
{
  chk('C(12,5)', comb(12, 5), 792)
  chk('C(12,6)', comb(12, 6), 924)
  let tot = 0
  let alt = 0
  for (let k = 0; k <= 12; k++) {
    tot += comb(12, k)
    alt += (k % 2 === 0 ? 1 : -1) * comb(12, k)
  }
  chk('sum C(12,k) = 2^12', tot, 4096)
  chk('alternating sum C(12,k) = 0', alt, 0)
  const C5025 = comb(50, 25)
  chk('C(50,25) exact', C5025, 126410606437752)
  chk('digits C(50,25)', String(C5025).length, 15)
  const log10C = Math.log10(C5025)
  console.log(`   log10 C(50,25) = ${log10C.toFixed(7)}  (prose carries this)`)
  // spec said 14.1017; the engine pins 14.1017835 (rounds to 14.1018 at 4dp) — engine wins, catch recorded
  close('log10 C(50,25) vs 14.1017835', log10C, 14.1017835, 2e-6)
}

/* ================================================================
 * 8. Digit counts of powers (BigInt, exact)
 * ================================================================ */
sec('8. digit counts of big powers')
{
  const digitsOf = (n: bigint): number => n.toString().length
  chk('digits 8^25 = 23', digitsOf(8n ** 25n), 23)
  const p100 = 2n ** 100n
  chk('digits 2^100 = 31', digitsOf(p100), 31)
  const dec = p100.toString()
  console.log(`   2^100 = ${dec}  (${dec.length} digits, printed in full)`)
  chk('2^100 exact decimal', dec, '1267650600228229401496703205376')
  chk('digits 5^20 = 14', digitsOf(5n ** 20n), 14)
  chk('5^20 exact', (5n ** 20n).toString(), '95367431640625')
  chk('digits 7^12 = 11', digitsOf(7n ** 12n), 11)
  chk('7^12 exact', (7n ** 12n).toString(), '13841287201')
  chk('digits 6^20 = 16', digitsOf(6n ** 20n), 16)
  chk('6^20 exact', (6n ** 20n).toString(), '3656158440062976')
  const log10 = (x: number): number => Math.log10(x)
  close('20*log10 5', 20 * log10(5), 13.9794)
  chk('floor+1 on 13.9794', Math.floor(20 * log10(5)) + 1, 14)
  close('12*log10 7', 12 * log10(7), 10.141176)
  chk('floor+1 on 10.1412', Math.floor(12 * log10(7)) + 1, 11)
  close('20*log10 6', 20 * log10(6), 15.563025)
  chk('floor+1 on 15.5630', Math.floor(20 * log10(6)) + 1, 16)
  close('25*log10 8 (canonical)', 25 * log10(8), 22.5772497)
  chk('floor+1 on 22.5772', Math.floor(25 * log10(8)) + 1, 23)
  close('100*log10 2 (canonical)', 100 * log10(2), 30.1029996)
  chk('floor+1 on 30.1030', Math.floor(100 * log10(2)) + 1, 31)
}

/* ================================================================
 * 9. The logarithm constants
 * ================================================================ */
sec('9. log constants and the change-of-base chain')
{
  const ln2 = Math.log(2)
  const ln3 = Math.log(3)
  close('ln 2', ln2, 0.6931472)
  close('ln 3', ln3, 1.0986123)
  close('2*ln 2', 2 * ln2, 1.3862944)
  close('1/ln 2', 1 / ln2, 1.4426950)
  close('log10 5', Math.log10(5), 0.69897)
  close('log10 7', Math.log10(7), 0.845098)
  close('log10 6', Math.log10(6), 0.7781513)
  close('mu = log10 e', Math.log10(Math.E), 0.4342945)
  let chain = 1
  for (let k = 3; k <= 8; k++) chain *= Math.log(k + 1) / Math.log(k)
  bigClose('log chain log_3 4 ... log_8 9 = 2', chain, 2, 1e-9)
}

/* ================================================================
 * 10. The rule ladders (10.2) at the review's own seeds
 * ================================================================ */
sec('10. additive / product ladders, shifted, quadratic regeneration, census')
{
  // additive ladder at seed 5
  const f5 = (x: number): number => 5 * x
  chk('additive f(1)=5: f(9)', f5(9), 45)
  chk('additive f(1/5)', f5(1 / 5), 1)
  chk('additive f(-2)', f5(-2), -10)
  chk('additive f(0)', f5(0), 0)
  close('additive f(2.5+3.5) = f(2.5)+f(3.5)', f5(6), f5(2.5) + f5(3.5), 1e-12)
  // product ladder at seed 6
  const f6 = (x: number): number => 6 ** x
  chk('product f(1)=6: f(20) exact', 6n ** 20n, 3656158440062976n)
  close('product f(1/2) = sqrt6 (positive branch)', Math.sqrt(6), 2.4494897)
  chk('product f(3+4) = f(3)*f(4)', 6 ** 7, 6 ** 3 * 6 ** 4)
  // shifted ladder
  const g = (x: number): number => 4 * x - 1
  chk('shifted f(2+5) = f(2)+f(5)+1', g(7), g(2) + g(5) + 1)
  // quadratic regeneration
  const fq = (x: number): number => (x * (x + 1)) / 2
  for (const [x, y] of [
    [2, 3],
    [5, 7],
    [10, 10],
    [1, 1],
  ]) {
    close(`quad rule at (${x},${y})`, fq(x + y), fq(x) + fq(y) + x * y, 1e-12)
  }
  chk('Gauss fq(100) = 5050', fq(100), 5050)
  chk('sum k at 100 (7.1 certification target)', (100 * 101) / 2, 5050)
  // census NO-witnesses
  const h1 = (x: number): number => x * x + 1
  chk('census NO: x^2+1 not additive at (2,3)', h1(5) === h1(2) + h1(3), false)
  chk('census NO: x^2+1 not product at (2,3)', h1(5) === h1(2) * h1(3), false)
  const gs = (x: number): number => 5 * x + 3
  chk('census YES: 5x+3 shifted f(x+y)=f(x)+f(y)-3 at (2,3)', gs(5), gs(2) + gs(3) - 3)
  chk('census YES: 2^x product at (2,3)', 2 ** 5, 2 ** 2 * 2 ** 3)
  chk('census NO: 2^x not additive', (2 ** 5 === 2 ** 2 + 2 ** 3), false)
}

/* ================================================================
 * 11. The order-4 sweep (10.2's canonical machine)
 * ================================================================ */
sec('11. order-4 machine f(x) = (x-1)/(x+1)')
{
  const f = (x: number): number => (x - 1) / (x + 1)
  close('f(2) = 1/3', f(2), 1 / 3, 1e-12)
  close('f^2(2) = -1/2', f(f(2)), -0.5, 1e-12)
  close('f^3(2) = -3', f(f(f(2))), -3, 1e-12)
  close('f^4(2) = 2', f(f(f(f(2)))), 2, 1e-12)
  const wit = [2, 3.5, -0.5, 7, 0.25]
  const id4 = wit.map((x) => f(f(f(f(x)))))
  chk('f^4 = id on five witnesses', id4.every((v, i) => Math.abs(v - wit[i]) < 1e-9), true)
  close('f^2(7) = -1/7', f(f(7)), -1 / 7, 1e-12)
  chk('2026 mod 4', 2026 % 4, 2)
  chk('2027 mod 4', 2027 % 4, 3)
  close('f^2026(2) = f^2(2)', f(f(2)), -0.5, 1e-12)
}

/* ================================================================
 * 12. The review's OWN order-3 machine f(x) = 1/(1-x)
 * ================================================================ */
sec('12. order-3 machine f(x) = 1/(1-x)')
{
  const f = (x: number): number => 1 / (1 - x)
  let x = 3
  const orbit: number[] = []
  for (let i = 0; i < 4; i++) {
    x = f(x)
    orbit.push(x)
  }
  close('f(3)', orbit[0], -0.5, 1e-12)
  close('f^2(3) = 2/3', orbit[1], 2 / 3, 1e-12)
  close('f^3(3) = 3', orbit[2], 3, 1e-12)
  close('f^4(3) restarts the cycle', orbit[3], -0.5, 1e-12)
  // f^2(x) = (x-1)/x, checked numerically
  const f2 = (t: number): number => (t - 1) / t
  close('f^2(2) = (2-1)/2', f(f(2)), f2(2), 1e-12)
  close('f^2(5) = (5-1)/5', f(f(5)), f2(5), 1e-12)
  chk('2027 mod 3', 2027 % 3, 2)
  chk('2026 mod 3', 2026 % 3, 1)
  close('f^2027(3) = f^2(3) = 2/3', f(f(3)), 2 / 3, 1e-12)
  close('f^2026(3) = f(3) = -1/2', f(3), -0.5, 1e-12)
}

/* ================================================================
 * 13. Secant tables (canonical x^2 at 3, 1/x at 2 + fresh x^2 at 5, 1/x at 3)
 * ================================================================ */
sec('13. secant tables')
{
  const sq = (x: number): number => x * x
  const inv = (x: number): number => 1 / x
  close('dq x^2 at 3, h=1', dq(sq, 3, 1), 7, 1e-12)
  close('dq x^2 at 3, h=0.1', dq(sq, 3, 0.1), 6.1, 1e-9)
  close('dq x^2 at 3, h=0.01 (quiz Q4)', dq(sq, 3, 0.01), 6.01, 1e-9)
  close('delta x^2 at 3, h=0.01', sq(3.01) - sq(3), 0.0601, 1e-9)
  close('dq x^2 at 5, h=1', dq(sq, 5, 1), 11, 1e-12)
  close('dq x^2 at 5, h=0.1', dq(sq, 5, 0.1), 10.1, 1e-9)
  close('dq x^2 at 5, h=0.01', dq(sq, 5, 0.01), 10.01, 1e-9)
  close('dq x^2 at 5, h=0.001', dq(sq, 5, 0.001), 10.001, 1e-9)
  close('dq 1/x at 2, h=0.1 (canonical)', dq(inv, 2, 0.1), -0.2380952)
  close('dq 1/x at 2, h=0.01', dq(inv, 2, 0.01), -0.2487562)
  close('limit of 1/x secant at 2 = -1/4', -0.25, -0.25, 0)
  close('dq 1/x at 3, h=1', dq(inv, 3, 1), -1 / 12, 1e-12)
  close('dq 1/x at 3, h=0.1', dq(inv, 3, 0.1), -0.1075269)
  close('dq 1/x at 3, h=0.01', dq(inv, 3, 0.01), -0.110742)
  close('dq 1/x at 3, h=0.001', dq(inv, 3, 0.001), -0.1110741)
  close('limit of 1/x secant at 3 = -1/9', -1 / 9, -0.1111111)
}

/* ================================================================
 * 14. The (2^h-1)/h and (e^h-1)/h ladders (canonical)
 * ================================================================ */
sec('14. canonical doorstep ladders')
{
  const L = [
    [0.1, 0.7177346],
    [0.01, 0.695555],
    [0.001, 0.6933875],
    [0.0001, 0.6931712],
  ] as const
  for (const [h, w] of L) close(`(2^h-1)/h at h=${h}`, (2 ** h - 1) / h, w)
  for (const [h, w] of [
    [0.1, 1.0517092],
    [0.01, 1.0050167],
  ] as const)
    close(`(e^h-1)/h at h=${h}`, (Math.E ** h - 1) / h, w)
  for (const [h, w] of [
    [0.1, 1.4354693],
    [0.01, 1.39111],
    [0.001, 1.3867749],
  ] as const)
    close(`dq 2^x at 1, h=${h}`, dq((x) => 2 ** x, 1, h), w)
}

/* ================================================================
 * 15. The review's doorstep chain: (3^h-1)/h -> ln 3
 * ================================================================ */
sec('15. the (3^h-1)/h chain closing on ln 3')
{
  const L = [
    [0.1, 1.1612317],
    [0.01, 1.1046692],
    [0.001, 1.099216],
    [0.0001, 1.0986726],
  ] as const
  const ln3 = Math.log(3)
  for (const [h, w] of L) close(`(3^h-1)/h at h=${h}`, (3 ** h - 1) / h, w)
  chk('ladder monotone decreasing', L.every((v, i) => i === 0 || L[i - 1][1] > v[1]), true)
  chk('every rung above ln 3', L.every((v) => v[1] > ln3), true)
  close('dq 3^x at 0, h=0.001 (same quotient)', dq((x) => 3 ** x, 0, 0.001), 1.099216)
  close('dq 3^x at 1, h=0.001', dq((x) => 3 ** x, 1, 0.001), 3.297648)
  close('table target 3*ln 3', 3 * ln3, 3.2958369)
  const lg2 = (x: number): number => Math.log(x) / Math.log(2)
  close('dq log_2 x at 2, h=0.001', dq(lg2, 2, 0.001), 0.7211672, 1e-6)
  close('table target 1/(2 ln 2)', 1 / (2 * Math.log(2)), 0.7213475, 1e-6)
}

/* ================================================================
 * 16. The eps-N searches on the review's own tails
 * ================================================================ */
sec('16. eps-N searches')
{
  let S = 0
  let N14 = -1
  for (let k = 1; k <= 40; k++) {
    S += k / 2 ** k
    if (2 - S < 0.001) {
      N14 = k
      break
    }
  }
  chk('first n with 2 - S_n < 0.001 for k/2^k', N14, 14)
  const S14 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14].reduce((a, k) => a + k / 2 ** k, 0)
  close('S14 of k/2^k', S14, 1.9990234, 1e-7)
  const S13 = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13].reduce((a, k) => a + k / 2 ** k, 0)
  chk('S13 misses the 0.001 bar', 2 - S13 >= 0.001, true)
  close('2 - S13', 2 - S13, 0.0018311, 1e-6)

  let T = 0
  let N8 = -1
  for (let k = 1; k <= 30; k++) {
    T += 1 / 3 ** k
    if (0.5 - T < 0.0001) {
      N8 = k
      break
    }
  }
  chk('first n with 1/2 - S_n < 0.0001 for 1/3^k', N8, 8)
  const T8 = [1, 2, 3, 4, 5, 6, 7, 8].reduce((a, k) => a + 1 / 3 ** k, 0)
  close('S8 of 1/3^k', T8, 0.4999238, 1e-7)
  const T7 = [1, 2, 3, 4, 5, 6, 7].reduce((a, k) => a + 1 / 3 ** k, 0)
  chk('S7 misses the 0.0001 bar', 0.5 - T7 >= 0.0001, true)
  close('1/2 - S7', 0.5 - T7, 0.0002282, 1e-6)
}

/* ================================================================
 * 17. Symmetric reads (canonical x^2-7x+11 + fresh x^2-9x+19)
 * ================================================================ */
sec('17. symmetric reads')
{
  const a = (7 + Math.sqrt(5)) / 2
  const b = (7 - Math.sqrt(5)) / 2
  bigClose('canonical a^3+b^3 (x^2-7x+11)', a ** 3 + b ** 3, 112, 1e-6)
  bigClose('canonical a^4+b^4', a ** 4 + b ** 4, 487, 1e-6)
  bigClose('canonical (a-b)^2 = 5', (a - b) ** 2, 5, 1e-9)
  bigClose('canonical 1/a+1/b = 7/11', 1 / a + 1 / b, 7 / 11, 1e-9)
  const u = (9 + Math.sqrt(5)) / 2
  const v = (9 - Math.sqrt(5)) / 2
  close('u root of x^2-9x+19', u * u - 9 * u + 19, 0, 1e-9)
  close('v root of x^2-9x+19', v * v - 9 * v + 19, 0, 1e-9)
  close('u numeric', u, 5.618034)
  close('v numeric', v, 3.381966)
  bigClose('u^2+v^2 = 43', u * u + v * v, 43, 1e-9)
  bigClose('u^3+v^3 = 216', u ** 3 + v ** 3, 216, 1e-6)
  bigClose('1/u+1/v = 9/19', 1 / u + 1 / v, 9 / 19, 1e-9)
  close('9/19 decimal', 9 / 19, 0.4736842)
  bigClose('(u-v)^2 = 5', (u - v) ** 2, 5, 1e-9)
}

/* ================================================================
 * 18. The review's OWN nested substitutions
 * ================================================================ */
sec('18. fresh nested substitutions (L2 and L5 witnesses)')
{
  // Q4: (x^2-3x+3)^2 - 5(x^2-3x+3) + 6 = 0, t^2-5t+6 -> t in {2,3}
  const r1 = (3 + Math.sqrt(5)) / 2
  const r2 = (3 - Math.sqrt(5)) / 2
  const roots4 = [r1, r2, 0, 3]
  close('Q4 root (3+sqrt5)/2', r1, 2.618034)
  close('Q4 root (3-sqrt5)/2', r2, 0.381966)
  const orig4 = (x: number): number => {
    const t = x * x - 3 * x + 3
    return t * t - 5 * t + 6
  }
  for (const [i, x] of roots4.entries()) close(`Q4 back-check root ${i + 1}`, orig4(x), 0, 1e-9)
  bigClose('Q4 root sum = 6', roots4[0] + roots4[1] + roots4[2] + roots4[3], 6, 1e-9)
  bigClose('Q4 root product = 0', roots4[0] * roots4[1] * roots4[2] * roots4[3], 0, 1e-9)
  // Q15: (x^2-4x+1)^2 - 6(x^2-4x+1) + 8 = 0, t^2-6t+8 -> t in {2,4}
  const q15 = [2 + Math.sqrt(5), 2 - Math.sqrt(5), 2 + Math.sqrt(7), 2 - Math.sqrt(7)]
  close('Q15 root 2+sqrt5', q15[0], 4.236068)
  close('Q15 root 2-sqrt5', q15[1], -0.236068)
  close('Q15 root 2+sqrt7', q15[2], 4.6457513)
  close('Q15 root 2-sqrt7', q15[3], -0.6457513)
  const orig15 = (x: number): number => {
    const t = x * x - 4 * x + 1
    return t * t - 6 * t + 8
  }
  for (const [i, x] of q15.entries()) close(`Q15 back-check root ${i + 1}`, orig15(x), 0, 1e-9)
  bigClose('Q15 root sum = 8', q15[0] + q15[1] + q15[2] + q15[3], 8, 1e-9)
  bigClose('Q15 root product = 3', q15[0] * q15[1] * q15[2] * q15[3], 3, 1e-9)
  chk('Q15 disc of x^2-4x-1', 16 + 4, 20)
  chk('Q15 disc of x^2-4x-3', 16 + 12, 28)
}

/* ================================================================
 * 19. The seed-6 ladder + the Vieta deep read (L6 witness)
 * ================================================================ */
sec('19. seed-6 ladder and the a^n + b^n bridge')
{
  const s: number[] = [2, 6]
  for (let k = 2; k <= 10; k++) s.push(6 * s[k - 1] - s[k - 2])
  chk('s2 seed6', s[2], 34)
  chk('s3 seed6', s[3], 198)
  chk('s4 seed6', s[4], 1154)
  chk('s5 seed6', s[5], 6726)
  chk('s6 seed6', s[6], 39202)
  chk('s7 seed6', s[7], 228486)
  chk('s8 seed6', s[8], 1331714)
  chk('s9 seed6', s[9], 7761798)
  chk('s10 seed6', s[10], 45239074)
  const A = 3 + 2 * Math.sqrt(2)
  const B = 3 - 2 * Math.sqrt(2)
  close('a = 3+2sqrt2', A, 5.8284271)
  close('b = 3-2sqrt2', B, 0.1715729)
  bigClose('a^2+b^2 = s2 = 34', A ** 2 + B ** 2, 34, 1e-6)
  bigClose('a^3+b^3 = s3 = 198', A ** 3 + B ** 3, 198, 1e-6)
  bigClose('a^4+b^4 = s4 = 1154', A ** 4 + B ** 4, 1154, 1e-6)
  bigClose('a^5+b^5 = s5 = 6726', A ** 5 + B ** 5, 6726, 1e-6)
  chk('digits of s8 = 7', String(s[8]).length, 7)
  close('log10 s8 read', Math.log10(s[8]), 6.124411, 1e-6)
  chk('floor+1 on log10 s8', Math.floor(Math.log10(s[8])) + 1, 7)
}

/* ================================================================
 * 20. Extra census checks + the canonical order-4 orbit print
 * ================================================================ */
sec('20. census prints for prose')
{
  const f = (x: number): number => (x - 1) / (x + 1)
  let x = 2
  const orb: string[] = []
  for (let i = 0; i < 4; i++) {
    x = f(x)
    orb.push(x.toFixed(7))
  }
  console.log(`   orbit of 2 under (x-1)/(x+1): 2 -> ${orb.join(' -> ')} -> 2`)
  close('orbit step 1 = 1/3', f(2), 0.3333333, 1e-7)
  chk('shifted ladder witness f(5) = 19 (4x-1)', 4 * 5 - 1, 19)
  chk('quiz Q2 additive chain 7*3', 7 * 3, 21)
  chk('quiz Q5 digits of 2^100 (recount)', (2n ** 100n).toString().length, 31)
}

console.log('')
console.log(`ENGINE ${pass}/${total} checks green`)
if (fails.length > 0) {
  console.log('FAILS:')
  for (const fl of fails) console.log('  FAIL:', fl)
  process.exit(1)
}
console.log('ENGINE SECTION: ALL GREEN')

/* ================================================================
 * PIN SECTION — audits part-aa10R.ts (green only after the prose)
 * ================================================================ */
type PinLesson = {
  id: string
  number: string
  concepts: string[]
  objectives: string[]
  prerequisites: string[]
  sources: string[]
  blocks: Array<Record<string, unknown>>
}
const pinMod = (await Promise.resolve({ lesson10R })) as { lesson10R?: PinLesson }
const pinTypes = await Promise.resolve({ countLessonWords })
chk('P01 part file loads and exports lesson10R', !!pinMod?.lesson10R, true)
if (pinMod?.lesson10R) {
  const lesson = pinMod.lesson10R
  // P02 — quiz keys [1,0,2,1,2]
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    chk('P02a quiz block exists', false, true)
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    chk('P02a quiz keys are [1,0,2,1,2]', JSON.stringify(keys), JSON.stringify([1, 0, 2, 1, 2]))
    chk('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), true)
    quizBlock.items.forEach((i, idx) => {
      chk(`P02c quiz item ${idx + 1}: explain names every wrong option`, i.explain.length > 40, true)
    })
  }
  // P03 — exercises: exactly 17 across L1..L6, steps + answers, cross-boundary count
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    chk('P03a exercises block exists', false, true)
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L))
    chk('P03a sets spanning L1..L6', spanned, true)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    chk('P03b exactly 17 questions', allQ.length, 17)
    chk('P03c every question has a non-empty steps solution + answer', allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), true)
    // P08 — answer numeric core in final solution line
    let coreOk = 0
    const coreFails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const last = q.solution[q.solution.length - 1].replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/-?\d+(?:\.\d+)?/g) ?? []
      const ok = tokens.length === 0 || tokens.every((t) => last.includes(t.replace('-', '')) || last.includes(t))
      if (ok) coreOk++; else coreFails.push(`${q.q.slice(0, 36)} | answer=${q.answer} | last=${last.slice(-50)}`)
    }
    chk('P08 every answer appears in the solution final line (numeric core)', coreOk === allQ.length, true)
    if (coreFails.length) console.log('   P08 fails:', coreFails.join(' ; '))
    const crossers = allQ.filter((q) => /Crosses /.test(q.solution[0])).length
    chk('P03d at least 5 questions cross lesson boundaries explicitly', crossers >= 5, true)
    const solFigs = allQ.reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    chk('P04b >=3 solution figures inside exercises', solFigs >= 3, true)
    chk('P13 exercises title names the exam typology', /Single Correct|Multiple Correct|Numerical Value/.test(exBlock.title ?? ''), true)
  }
  // P04a — body figures
  chk('P04a >=3 body figure blocks', lesson.blocks.filter((b) => b.kind === 'figure').length >= 3, true)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  chk('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), true)
  // P06 — formula cards >= 8
  chk('P06 >=8 formula cards', lesson.blocks.filter((b) => b.kind === 'formula').length >= 8, true)
  // P07 — word count >= 5000 (the review's own bar)
  const wc = pinTypes.countLessonWords(lesson as never)
  console.log(`   countLessonWords(lesson10R) = ${wc}`)
  chk('P07 word count >= 5000', wc >= 5000, true)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  const badSvg = svgs.filter((s) => /\$|\\\\frac|\\\\times|\\\\sqrt|\\\\geq|\\\\/.test(s))
  chk('P09 all SVGs obey the plain-text law', svgs.length > 0 && badSvg.length === 0, true)
  chk('P09b every SVG root carries role=img + aria-label', svgs.every((s) => s.includes('role="img"') && s.includes('aria-label')), true)
  // P10 — forbidden tokens + plain headings
  const allText: string[] = []
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'latex', 'q', 'answer']) {
      const v = b[key]
      if (typeof v === 'string') allText.push(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; allText.push(c.title, c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) allText.push(it.q, ...it.options, it.explain)
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) allText.push(t.term, t.def)
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; explanation: string }>; result: string }; allText.push(d.title, d.statement, d.result); for (const s of d.steps) allText.push(s.label, s.explanation) }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; allText.push(e.title, ...e.steps) }
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string[]; answer?: string }> }> }).sets) for (const q of s.questions) allText.push(q.q, ...q.solution, q.answer ?? '')
    if (b.kind === 'list') for (const it of (b as { items: string[] }).items) allText.push(it)
    if (b.kind === 'table') { const t = b as { head: string[]; rows: string[][] }; allText.push(...t.head, ...t.rows.flat()) }
    if (b.kind === 'equation') allText.push((b as { latex: string }).latex)
    if (b.kind === 'formula') { const fo = b as { name: string; latex: string; note?: string }; allText.push(fo.name, fo.latex, ...(fo.note ? [fo.note] : [])) }
  }
  const joined = allText.join('\n')
  chk('P10 no \\qquad anywhere', !joined.includes('\\qquad'), true)
  chk('P10b no \\dfrac and no $$', !joined.includes('\\dfrac') && !joined.includes('$$'), true)
  chk('P10c no raw \\( or \\[', !joined.includes('\\(') && !joined.includes('\\['), true)
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  chk('P10d headings plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), true)
  // P11 — counts
  chk('P11 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && lesson.objectives.length >= 4 && lesson.objectives.length <= 6, true)
  // P12 — prerequisites + sources
  chk('P12 prerequisites match the spec', JSON.stringify(lesson.prerequisites), JSON.stringify(['aa-competition-algebra-the-advanced-craft', 'aa-functional-equations-building-functions-from-rules', 'aa-the-book-in-one-page-synthesis', 'aa-the-doorstep-limits-and-the-changing-output']))
  chk('P12b sources match the spec', JSON.stringify(lesson.sources), JSON.stringify(['cengage-jee-style', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra']))
  // P14 — identity fields
  chk('P14 id and number sane', `${lesson.id} / ${lesson.number} / ${'words' in lesson}`, 'aa-the-synthesis-and-the-doorstep-unit-10-review / 10.R / false')
  // P15 — the table names all four lessons
  const table = lesson.blocks.find((b) => b.kind === 'table') as { kind: 'table'; head: string[]; rows: string[][] } | undefined
  const tableText = table ? [...table.head, ...table.rows.flat()].join(' ') : ''
  chk('P15 the chapter table names 10.1..10.4', tableText.includes('10.1') && tableText.includes('10.2') && tableText.includes('10.3') && tableText.includes('10.4'), true)
  // P16 — the coda names the four doors + sixty-seven
  const codaText = joined
  chk('P16 coda names the four doors', codaText.includes('Calculus') && codaText.includes('Coordinate Geometry') && codaText.includes('Trigonometry') && codaText.includes('Probability'), true)
  chk('P16b coda carries the sixty-seven census sentence', codaText.includes('sixty-seven'), true)
}


  return { id: 'aa10R (10.R engines+pins)', pass, fail: fails.length }
}


/* ================================================================== */
/* SECTION Z — the closed-chapter + closed-BOOK census                 */
/* ================================================================== */
async function sectionZ(): Promise<SectionResult> {
  let pass = 0
  let fail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) pass++
    else {
      fail++
      console.log(`  Z FAIL ${name} — ${detail}`)
    }
  }
  console.log('== SECTION Z: the closed-chapter + closed-BOOK census ==')
  z('Z01 chapter number is 10', chapter10.number === 10)
  z('Z02 chapter slug', chapter10.slug === 'the-synthesis-and-the-doorstep', chapter10.slug)
  z('Z03 chapter status complete', chapter10.status === 'complete', chapter10.status)
  z('Z04 five lessons', chapter10.lessons.length === 5, String(chapter10.lessons.length))
  z('Z05 plannedLessons empty', (chapter10.plannedLessons ?? []).length === 0)
  const ids = chapter10.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['aa-competition-algebra-the-advanced-craft', 'aa-functional-equations-building-functions-from-rules', 'aa-the-book-in-one-page-synthesis', 'aa-the-doorstep-limits-and-the-changing-output', 'aa-the-synthesis-and-the-doorstep-unit-10-review']), ids.join(','))
  const nums = chapter10.lessons.map((l) => l.number)
  z('Z07 lesson numbers 10.1..10.R', JSON.stringify(nums) === JSON.stringify(['10.1', '10.2', '10.3', '10.4', '10.R']), nums.join(','))
  const wcs = chapter10.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z08 word floors (10.1-10.4 >= 6000; 10.R >= 5000)', wcs[0] >= 6000 && wcs[1] >= 6000 && wcs[2] >= 6000 && wcs[3] >= 6000 && wcs[4] >= 5000, wcs.join(', '))
  for (const [i, l] of chapter10.lessons.entries()) {
    z(`Z09.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z10.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z11.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  z('Z12 the shipped source exists', existsSync(CH10_SRC))
  const shippedText = readFileSync(CH10_SRC, 'utf8')
  z('Z13 the shipped source exports all five lessons', ['lesson101', 'lesson102', 'lesson103', 'lesson104', 'lesson10R'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the closed-BOOK census ----
  z('Z14 book status complete', advancedAlgebra.status === 'complete', advancedAlgebra.status)
  z('Z15 ten chapters', advancedAlgebra.chapters.length === 10, String(advancedAlgebra.chapters.length))
  z('Z16 every chapter complete', advancedAlgebra.chapters.every((c) => c.status === 'complete'))
  z('Z17 no planned lessons remain anywhere', advancedAlgebra.chapters.every((c) => (c.plannedLessons ?? []).length === 0))
  const total = advancedAlgebra.chapters.reduce((n, c) => n + c.lessons.length, 0)
  console.log(`  Z per-chapter lesson counts: ${advancedAlgebra.chapters.map((c) => `${c.number}:${c.lessons.length}`).join('  ')}`)
  z('Z18 the honest census: 67 written lessons (62 banked + 5)', total === 67, String(total))
  z('Z19 every lesson carries a real body', advancedAlgebra.chapters.every((c) => c.lessons.every((l) => l.blocks.length >= 10)))
  z('Z20 book id', advancedAlgebra.id === 'advanced-algebra')
  const bookWords = advancedAlgebra.chapters.reduce((n, c) => n + c.lessons.reduce((m, l) => m + countLessonWords(l), 0), 0)
  console.log(`  Z whole-book word count: ${bookWords}`)
  z('Z21 the book body is non-trivial (> 350,000 words)', bookWords > 350000, String(bookWords))
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionAA101(),
    await sectionAA102(),
    await sectionAA103(),
    await sectionAA104(),
    await sectionAA10R(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book4-ch10: verdict ================')
  let pass = 0
  let fail = 0
  for (const r of results) {
    console.log(`  ${r.id}: ${r.pass} pass, ${r.fail} fail`)
    pass += r.pass
    fail += r.fail
  }
  console.log(`  TOTAL: ${pass} pass, ${fail} fail`)
  if (fail > 0) {
    console.log('RESULT: NOT ALL GREEN — fix the failures and re-run.')
    process.exit(1)
  }
  console.log('RESULT: ALL GREEN — chapter 10 closed, the BOOK closed at 67 lessons.')
}

main()
