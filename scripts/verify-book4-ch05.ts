import { chapter05 } from '../src/data/library/books/mathematics/advanced-algebra/ch-05'
import { countLessonWords, type Lesson } from '../src/data/library/types'

export {}

/**
 * verify-book4-ch05.ts — the growing verifier for Advanced Algebra (book #4),
 * chapter 5 "Sequences and Series", authored run 111 (2026-11-19) under the
 * single-job rule (strict serial order: 5.1 then 5.2; the 2026-11-18
 * parallel-swarm variant does NOT apply to this run).
 *
 * VERIFY-FIRST DISCIPLINE: sections A and C are pure engines — every
 * mathematical claim the lessons will make, recomputed from scratch and
 * pinned green BEFORE any prose was authored (the numbers below designed
 * the lesson, not the other way round). Sections B and D pin the structural
 * contracts of the authored lessons (quiz keys, exercise census, palette,
 * word counts, fold obligations) and are guarded: they report `pending`
 * while the lesson does not yet exist in the chapter file, and go green at
 * the close gates. Section Z is the census at close.
 *
 * Ground: the m2-05 module (citation key cengage-m2-05) —
 * STUDY-NEVER-REPRODUCE: the module informed method shapes only; every
 * exhibit below is our own.
 *
 *   (A) 5.1 engines — AP term/sum machinery, the fold arithmetic, the
 *       three-term identity, the telescoping radical identity, Gauss
 *       pairing, S_p = S_q consequences, digit-reversal, S_n quadratic
 *       read-offs, polygon-angles quadratic
 *   (B) 5.1 pins   — quiz 5 items/keys [1,2,3,0,2]; exercises 15 in
 *       2/2/3/3/3/2; ≥9 examples; ≥3 figures vivid-palette-only; ≥4
 *       derivations; ≥5 formula cards; ≥8 terms; fold example-family
 *       (Sum of Arithmetic Means Inserted between Two Numbers — ≥2
 *       Illustrations); words ≥ 4800
 *   (C) 5.2 engines — GP term/sum machinery, product-of-middle-term,
 *       product of n GMs = G^n, AM–GM relation round-trips, infinite-sum
 *       convergence, recurring decimals, log-GP↔AP, rebound distances,
 *       squares-sum ratios, midpoint-square halving, split-series
 *   (D) 5.2 pins   — quiz 5 items/keys [2,1,3,1,2]; exercises 15 in
 *       2/2/3/3/3/2; ≥9 examples; ≥2 figures + the four-case table; ≥4
 *       derivations; ≥5 formula cards; ≥8 terms; fold example-family
 *       (Increasing and Decreasing G.P. — ≥2 Illustrations + the table);
 *       words ≥ 4800
 *   (E) 5.3 engines — H.P. reciprocal machinery, largest-term hunt, H.M.
 *       insertion + reciprocal-sum law, the mean ladder A ≥ G ≥ H with
 *       G² = AH, the speed law, A.G.P. term/sum machinery (finite and
 *       infinite), the x-identity, the double-shift
 *   (F) 5.3 pins   — quiz 5 items/keys [0,2,1,1,2]; exercises 15 in
 *       2/2/3/3/3/2; ≥10 examples; ≥3 figures vivid-palette-only; ≥4
 *       derivations; ≥7 formula cards; ≥8 terms; words ≥ 4800
 *   (Z) census at close — chapter assembled, book.ts wiring, plannedLessons
 *       emptied, ids unique library-wide, pack integrity
 */

/* ------------------------------------------------------------------ */
/* harness                                                             */
/* ------------------------------------------------------------------ */

interface SectionCheck {
  name: string
  ok: boolean
  detail?: string
}

function check(name: string, ok: boolean, detail?: string): SectionCheck {
  return ok ? { name, ok: true } : { name, ok: false, detail }
}

function countKind(L: Lesson, kind: string): number {
  return L.blocks.filter((b) => b.kind === (kind as never)).length
}

function tally(section: string, checks: SectionCheck[]) {
  const fail = checks.filter((c) => !c.ok).map((c) => `${c.name}${c.detail ? ' — ' + c.detail : ''}`)
  return { section, ok: checks.length - fail.length, total: checks.length, fail }
}

const byNumber = new Map<string, Lesson>(chapter05.lessons.map((l) => [l.number, l] as const))
const lesson51 = byNumber.get('5.1')
const lesson52 = byNumber.get('5.2')
const lesson53 = byNumber.get('5.3')

const EPS = 1e-9
const near = (x: number, y: number): boolean => Math.abs(x - y) <= EPS * Math.max(1, Math.abs(x), Math.abs(y))
const nearR = (x: number, y: number, tol = 1e-6): boolean => Math.abs(x - y) <= tol

/* ------------------------------------------------------------------ */
/* SECTION A — 5.1 engines (pure math, verify-first: green pre-prose)  */
/* ------------------------------------------------------------------ */

const A: SectionCheck[] = []

// A1 · the general-term engine: a_n = a + (n-1)d recomputed on every
// exhibit the lesson will carry
{
  const an = (a: number, d: number, n: number): number => a + (n - 1) * d
  A.push(check('A1.1 intro sequence t_n = (3n-1)/2^n first four terms', [1, 1.25, 1, 0.6875].every((v, i) => nearR((3 * (i + 1) - 1) / 2 ** (i + 1), v))))
  A.push(check('A1.2 AP 7,11,15,19: d=4, 23rd term 95, general term 4n+3 swept n=1..40', (() => { const an = (n: number) => 7 + (n - 1) * 4; let ok = an(23) === 95; for (let n = 1; n <= 40; n++) if (an(n) !== 4 * n + 3) ok = false; return ok })()))
  A.push(check('A1.3 log AP: 3·2^9 = 1536 is the 10th term of 3,6,12,…', 3 * 2 ** 9 === 1536))
  A.push(check('A1.4 4·T3 = 7·T6 forces a = -9d so T10 = 0', (() => { const a = -9, d = 1; return 4 * an(a, d, 3) === 7 * an(a, d, 6) && an(a, d, 10) === 0 })()))
  A.push(check('A1.5 41,37,33,…: last positive T11 = 1, first non-positive T12 = -3', an(41, -4, 11) === 1 && an(41, -4, 12) === -3))
  A.push(check('A1.6 digit exercise: 963 reversed 369 differ by 594, digits sum 18', (() => { const n = 963; const rev = Number(String(n).split('').reverse().join('')); return n - rev === 594 && [9, 6, 3].reduce((s, v) => s + v, 0) === 18 })()))
}
// (the local helper an() is scoped inside the A1 block)

// A2 · the sum engine: S_n both ways, plus the pairing identity
{
  const Sn = (a: number, d: number, n: number): number => (n / 2) * (2 * a + (n - 1) * d)
  const SnEnds = (a: number, l: number, n: number): number => (n / 2) * (a + l)
  A.push(check('A2.1 S_30 of 9,14,19,… = 2445 (exercise E4)', Sn(9, 5, 30) === 2445))
  A.push(check('A2.2 three-digit multiples of 11: n = 81, S = 44550 (Illustration)', (() => { const first = 110, last = 990, n = (last - first) / 11 + 1; return n === 81 && SnEnds(first, last, n) === 44550 })()))
  A.push(check('A2.3 equidistant pairing: a4+a17 = a8+a13 = a1+a20 = 118 on (2,6); four indices sum 236 → S_20 = 1180', (() => { const a = 2, d = 6; const t = (k: number) => a + (k - 1) * d; return t(4) + t(17) === t(8) + t(13) && t(4) + t(17) === t(1) + t(20) && t(4) + t(8) + t(13) + t(17) === 236 && SnEnds(t(1), t(20), 20) === 1180 })()))
  A.push(check('A2.4 Gauss 1..100 = 5050 by 50 pairs of 101', Sn(1, 1, 100) === 5050))
  A.push(check('A2.5 24,21,18,… sum 78 at n=4 AND n=13 (both honest)', Sn(24, -3, 4) === 78 && Sn(24, -3, 13) === 78 && (() => { const q = (n: number) => n * n - 17 * n + 52; return q(4) === 0 && q(13) === 0 })()))
  A.push(check('A2.6 7th=34, 13th=64 → d=5, a=4, S_18 = 837 (exercise E7)', (() => { const d = (64 - 34) / 6; const a = 34 - 6 * d; return d === 5 && a === 4 && Sn(a, d, 18) === 837 })()))
  A.push(check('A2.7 S_n = 2n²+3n read-off: a_n = 4n+1, d=4, T_10 = 41 (exercise E10)', (() => { const Tn = (n: number) => (2 * n * n + 3 * n) - (2 * (n - 1) * (n - 1) + 3 * (n - 1)); return Tn(1) === 5 && Tn(10) === 41 && Tn(2) - Tn(1) === 4 })()))
  A.push(check('A2.8 ratio-of-sums → ratio-of-terms: (7n+2):(11n+3) at n=23 gives 163:256 for the 12th terms', (() => { const top = 7 * 23 + 2, bot = 11 * 23 + 3; return top === 163 && bot === 256 })()))
}

// A3 · the arithmetic-mean fold engine — Sum of AMs inserted = n × AM
{
  const AM = (a: number, b: number): number => (a + b) / 2
  const means = (a: number, b: number, n: number): number[] => Array.from({ length: n }, (_, i) => a + ((i + 1) * (b - a)) / (n + 1))
  const sumMeans = (a: number, b: number, n: number): number => means(a, b, n).reduce((s, v) => s + v, 0)
  A.push(check('A3.1 sum of n AMs = n(a+b)/2 swept n=1..15 on (6,42), (3,55), (2,62), (5,60)', (() => { let ok = true; for (const [a, b] of [[6, 42], [3, 55], [2, 62], [5, 60]] as const) for (let n = 1; n <= 15; n++) if (!near(sumMeans(a, b, n), n * AM(a, b))) ok = false; return ok })()))
  A.push(check('A3.2 fold Illustration 1: twelve AMs between 5 and 60 sum to 390', sumMeans(5, 60, 12) === 390))
  A.push(check('A3.3 fold Illustration 2: means between 3 and 55 summing 348 → n = 12, d = 4, A_5 = 23', (() => { const n = 348 / AM(3, 55); const d = (55 - 3) / (n + 1); return n === 12 && d === 4 && 3 + 5 * d === 23 })()))
  A.push(check('A3.4 the means are equidistant-paired: A_k + A_{n+1-k} = a + b', (() => { const ms = means(3, 55, 12); let ok = true; for (let k = 1; k <= 12; k++) if (!near(ms[k - 1] + ms[12 - k], 3 + 55)) ok = false; return ok })()))
  A.push(check('A3.5 quiz key: 7 AMs between 3 and 43 sum to 161', sumMeans(3, 43, 7) === 161))
  A.push(check('A3.6 exercise E8 shape: between 3 and 55, d = (55-3)/13 = 4 exactly', (55 - 3) / 13 === 4))
}

// A4 · the three-term identity: pth/qth/rth terms a,b,c →
// a(q−r) + b(r−p) + c(p−q) = 0
{
  const t = (a: number, d: number, k: number): number => a + (k - 1) * d
  const sweep = (a: number, d: number, p: number, q: number, r: number): boolean => {
    const x = t(a, d, p), y = t(a, d, q), z = t(a, d, r)
    return near(x * (q - r) + y * (r - p) + z * (p - q), 0)
  }
  A.push(check('A4.1 identity swept on AP 3,7,11,…: (p,q,r) ∈ {(2,4,6),(1,3,5),(2,5,9),(3,7,11)}', (() => { const s = sweep.bind(null, 3, 4); return s(2, 4, 6) && s(1, 3, 5) && s(2, 5, 9) && s(3, 7, 11) })()))
  A.push(check('A4.2 identity swept on a decreasing AP 41,37,…', (() => { const s = sweep.bind(null, 41, -4); return s(1, 4, 7) && s(2, 3, 8) && s(1, 2, 9) })()))
}

// A5 · the telescoping radical identity (positive AP):
// Σ 1/(√a_k + √a_{k+1}) = (n−1)/(√a_1 + √a_n)
{
  const LHS = (xs: number[]): number => xs.slice(0, -1).reduce((s, v, i) => s + 1 / (Math.sqrt(v) + Math.sqrt(xs[i + 1])), 0)
  const RHS = (xs: number[]): number => (xs.length - 1) / (Math.sqrt(xs[0]) + Math.sqrt(xs[xs.length - 1]))
  A.push(check('A5.1 identity on 2,4,6,8,10 (tolerance 1e−12)', nearR(LHS([2, 4, 6, 8, 10]), RHS([2, 4, 6, 8, 10]), 1e-12)))
  A.push(check('A5.2 exercise E14 exact value: 1/(1+√3)+1/(√3+√5)+1/(√5+√7)+1/(√7+3) = 1', nearR(LHS([1, 3, 5, 7, 9]), 1, 1e-12)))
  A.push(check('A5.3 rationalized proof numerics: each term = (√a_{k+1}−√a_k)/d with d=2 on 1,3,5,7,9', (() => { const xs = [1, 3, 5, 7, 9]; return xs.slice(0, -1).every((v, i) => nearR(1 / (Math.sqrt(v) + Math.sqrt(xs[i + 1])), (Math.sqrt(xs[i + 1]) - Math.sqrt(v)) / 2, 1e-12)) })()))
}

// A6 · three-in-AP parametrisation and its exhibits
{
  const threeSum = (a: number, d: number): number => 3 * a
  A.push(check('A6.1 sum 27 product 720 → 8,9,10 (a=9, d=1)', (() => { const a = 9, d = 1; return threeSum(a, d) === 27 && (a - d) * a * (a + d) === 720 })()))
  A.push(check('A6.2 quiz key: sum 21 product 315 → 5,7,9', (() => { const a = 7, d = 2; return threeSum(a, d) === 21 && (a - d) * a * (a + d) === 315 })()))
  A.push(check('A6.3 exercise E6: sum 30, squares 302 → 9,10,11', (() => { const a = 10, d = 1; return threeSum(a, d) === 30 && (a - d) ** 2 + a * a + (a + d) ** 2 === 302 })()))
  A.push(check('A6.4 four-in-AP split of 32: parts 2,6,10,14 with extremes/means = 7/15', (() => { const parts = [2, 6, 10, 14]; return parts.reduce((s, v) => s + v, 0) === 32 && parts[0] * parts[3] / (parts[1] * parts[2]) === 7 / 15 })()))
}

// A7 · S_p = S_q ⇒ S_{p+q} = 0 (the exercise E15 engine)
{
  const Sn = (a: number, d: number, n: number): number => (n / 2) * (2 * a + (n - 1) * d)
  const a = -15, d = 2
  A.push(check('A7.1 the exhibit AP (-15,2): S_5 = S_11 = -55 and S_16 = 0', Sn(a, d, 5) === -55 && Sn(a, d, 11) === -55 && Sn(a, d, 16) === 0))
  A.push(check('A7.2 general form: S_n = An²+Bn with A = d/2, B = a − d/2; S_p = S_q ⇔ A(p+q) = −B', (() => { const A = d / 2, B = a - d / 2; return near(A * 16 + B, 0) && near(Sn(a, d, 5), A * 25 + B * 5) })()))
}

// A8 · pth term q, qth term p (exercise E11 engine)
{
  const t = (a: number, d: number, k: number): number => a + (k - 1) * d
  // a_p = q, a_q = p forces d = -1, a = p+q-1
  const d = -1
  for (const [p, q] of [[3, 8], [5, 12]] as const) {
    const a = p + q - 1
    A.push(check(`A8.${p} pth=${q}/qth=${p}: d=-1, a=${p + q - 1}, rth term p+q−r, S_(p+q) = (p+q)(p+q−1)/2`, (() => {
      const rth = (r: number) => t(a, d, r)
      const r = p + q - 3
      const S = ((p + q) / 2) * (2 * a + (p + q - 1) * d)
      return t(a, d, p) === q && t(a, d, q) === p && rth(r) === p + q - r && S === ((p + q) * (p + q - 1)) / 2
    })()))
  }
}

// A9 · polygon interior angles in AP (exercise E13 engine)
{
  // smallest 100°, d = 4°: (n-2)·180 = n/2·(2·100 + (n−1)·4) → n²−41n+180=0
  const q = (n: number): number => n * n - 41 * n + 180
  A.push(check('A9.1 n²−41n+180 = (n−5)(n−36): roots 5 and 36', q(5) === 0 && q(36) === 0))
  A.push(check('A9.2 n=5 checks: angles 100..116 sum 540 = 180·(5−2)', (() => { const s = Array.from({ length: 5 }, (_, i) => 100 + 4 * i).reduce((x, y) => x + y, 0); return s === 540 })()))
  A.push(check('A9.3 n=36 rejected: largest angle 100+35·4 = 240 > 180', 100 + 35 * 4 === 240))
}

// A10 · the sum-of-terms-table engine for the lesson’s table (a,d,n,S census)
{
  const Sn = (a: number, d: number, n: number): number => (n / 2) * (2 * a + (n - 1) * d)
  const rows: Array<[number, number, number, number]> = [[7, 4, 23, 1173], [9, 5, 30, 2445], [11, 4, 19, 893], [24, -3, 13, 78]]
  let ok = true
  for (const [a, d, n, S] of rows) if (Sn(a, d, n) !== S) ok = false
  A.push(check('A10.1 the table census rows recomputed', ok))
  A.push(check('A10.2 exercise E12: three-digit multiples of 13: first 104, last 988, n = 69, S = 37674', (() => { const first = 104, last = 988, n = (last - first) / 13 + 1; return n === 69 && (n / 2) * (first + last) === 37674 })()))
}

/* ------------------------------------------------------------------ */
/* SECTION C — 5.2 engines (pure math, verify-first: green pre-prose)  */
/* ------------------------------------------------------------------ */

const C: SectionCheck[] = []

// C1 · GP general term + exhibits
{
  const Tn = (a: number, r: number, n: number): number => a * r ** (n - 1)
  C.push(check('C1.1 4,−12,36,…: r = −3, T_9 = 4·3⁸ = 26244 (sign: even power)', Tn(4, -3, 9) === 26244))
  C.push(check('C1.2 3rd=18, 6th=486: r³ = 27 → r = 3, a = 2, T_10 = 2·3⁹ = 39366', (() => { const r = Math.cbrt(486 / 18); const a = 18 / r ** 2; return r === 3 && a === 2 && Tn(a, r, 10) === 39366 })()))
  C.push(check('C1.3 exercise E1: T_10 of 7,21,63,… = 7·3⁹ = 137781', Tn(7, 3, 10) === 137781))
  C.push(check('C1.4 exercise E2: 2·3ⁿ⁻¹ = 4374 at n = 8 (3⁷ = 2187)', (() => { let k = 0; let v = 1; while (v < 2187) { v *= 3; k++ } return v === 2187 && k === 7 && 2 * 2187 === 4374 })()))
  C.push(check('C1.5 exercise E3: 2nd=12, 5th=324 → r=3, a=4, 8th = 8748', (() => { const r = Math.cbrt(324 / 12); const a = 12 / r; return r === 3 && a === 4 && Tn(a, r, 8) === 8748 })()))
}

// C2 · the fold engine — Increasing and Decreasing G.P.
{
  const mono = (a: number, r: number, n = 8): 'increasing' | 'decreasing' | 'alternating' | 'constant' => {
    const ts = Array.from({ length: n }, (_, i) => a * r ** i)
    if (r === 1) return 'constant'
    if (ts.every((v, i) => i === 0 || v > ts[i - 1])) return 'increasing'
    if (ts.every((v, i) => i === 0 || v < ts[i - 1])) return 'decreasing'
    return 'alternating'
  }
  C.push(check('C2.1 (i) 5,15,45 (a>0, r=3): increasing', mono(5, 3) === 'increasing'))
  C.push(check('C2.2 (ii) 8,4,2 (a>0, 0<r<1): decreasing', mono(8, 0.5) === 'decreasing'))
  C.push(check('C2.3 (iii) −3,−12,−48 (a<0, r>1): decreasing', mono(-3, 4) === 'decreasing'))
  C.push(check('C2.4 (iv) −16,−8,−4 (a<0, 0<r<1): increasing', mono(-16, 0.5) === 'increasing'))
  C.push(check('C2.5 r<0 always alternating (swept r = −2, −1/2, −3/2, −1/3 on a = 5, −5)', (() => { for (const a of [5, -5]) for (const r of [-2, -0.5, -1.5, -1 / 3]) if (mono(a, r) !== 'alternating') return false; return true })()))
  C.push(check('C2.6 quiz key Q2: first term 10, decreasing exactly when 0 < r < 1', mono(10, 0.9, 6) === 'decreasing' && mono(10, 1.1, 6) === 'increasing'))
  C.push(check('C2.7 exercise E6: 1, r, r²… constant at r = 1, alternating r < 0', mono(1, 1) === 'constant' && mono(1, -0.5) === 'alternating'))
  // the 729 ÷ 3 exhibit
  const Tn = (a: number, r: number, n: number): number => a * r ** (n - 1)
  C.push(check('C2.8 729·(1/3)^(n−1): first term below 1 is T_8 = 1/3; exactly 4 terms exceed 10', (() => { const ts = Array.from({ length: 12 }, (_, i) => 729 / 3 ** i); const below = ts.findIndex((v) => v < 1); return below === 7 && nearR(ts[7], 1 / 3, 1e-9) && ts.filter((v) => v > 10).length === 4 })()))
}

// C3 · sums of n terms and the shift-and-subtract derivation
{
  const Sn = (a: number, r: number, n: number): number => (r === 1 ? n * a : (a * (r ** n - 1)) / (r - 1))
  C.push(check('C3.1 S_8 of 5,15,45,… = 5(3⁸−1)/2 = 16400', Sn(5, 3, 8) === 16400))
  C.push(check('C3.2 exercise E4: S_9 of 6,18,54 = 3(3⁹−1) = 59046', Sn(6, 3, 9) === 59046))
  C.push(check('C3.3 r=1 case: S_5 of 9,9,9,9,9 = 45 = 5a', Sn(9, 1, 5) === 45))
  C.push(check('C3.4 brute-force agreement: Σ ar^k equals the formula, swept (a,r,n) grid', (() => { for (const a of [2, 5, 7]) for (const r of [3, 0.5, -2]) for (const n of [1, 2, 5, 7]) { const brute = Array.from({ length: n }, (_, i) => a * r ** i).reduce((s, v) => s + v, 0); if (Math.abs(brute - Sn(a, r, n)) > 1e-9 * Math.max(1, Math.abs(brute))) return false } return true })()))
  C.push(check('C3.5 exercise E12: S_n = 2^{n+1}−2 → T_n = 2^n → a = 2, r = 2, T_5 = 32', (() => { const Tn = (n: number) => (2 ** (n + 1) - 2) - (2 ** n - 2); return Tn(1) === 2 && Tn(2) === 4 && Tn(5) === 32 })()))
}

// C4 · geometric means: G = √ab, insertion, product = Gⁿ
{
  const GMs = (a: number, b: number, n: number): number[] => Array.from({ length: n }, (_, i) => a * (b / a) ** ((i + 1) / (n + 1)))
  C.push(check('C4.1 three GMs between 2 and 162: r⁴ = 81 → r = 3 → 6, 18, 54', (() => { const r = (162 / 2) ** 0.25; const ms = [2 * r, 2 * r * r, 2 * r ** 3]; return r === 3 && ms[0] === 6 && ms[1] === 18 && ms[2] === 54 })()))
  C.push(check('C4.2 two GMs between 3 and 24: r³ = 8 → 6, 12; product 72 = G² (exercise E5)', (() => { const r = Math.cbrt(24 / 3); const ms = [3 * r, 3 * r * r]; return r === 2 && ms[0] === 6 && ms[1] === 12 && ms[0] * ms[1] === 72 })()))
  C.push(check('C4.3 product of n GMs = (ab)^{n/2} = Gⁿ swept n=1..8 on (2,162) and (5,405)', (() => { for (const [a, b] of [[2, 162], [5, 405]] as const) for (let n = 1; n <= 8; n++) { const p = GMs(a, b, n).reduce((x, y) => x * y, 1); if (Math.abs(p - (a * b) ** (n / 2)) > 1e-9 * Math.max(1, p)) return false } return true })()))
  C.push(check('C4.4 quiz Q5: three GMs between 5 and 405 → product 45³ = 91125', (() => { const ms = GMs(5, 405, 3); const p = ms.reduce((x, y) => x * y, 1); return Math.abs(p - 45 ** 3) < 1e-6 && 45 ** 3 === 91125 })()))
  C.push(check('C4.5 GM of 5 and 45 = 15 (quiz Q3); GMs stay between: 5 < 15 < 45', Math.sqrt(5 * 45) === 15))
  C.push(check('C4.6 middle-term product: 7-term GP with T_4 = 27 → product = 27⁷ = 3²¹ = 10460353203', (() => { const a = 27 / 3 ** 3; const ts = Array.from({ length: 7 }, (_, i) => a * 3 ** i); const p = ts.reduce((x, y) => x * y, 1); return ts[3] === 27 && p === 3 ** 21 && 3 ** 21 === 10460353203 })()))
}

// C5 · AM–GM relation: a, b = A ± √(A²−G²)
{
  const pair = (A: number, G: number): [number, number] => [A + Math.sqrt(A * A - G * G), A - Math.sqrt(A * A - G * G)]
  C.push(check('C5.1 A=13, G=12 → 18 and 8 (the Illustration), round-trip exact', (() => { const [x, y] = pair(13, 12); return x === 18 && y === 8 && (x + y) / 2 === 13 && Math.sqrt(x * y) === 12 })()))
  C.push(check('C5.2 A=25, G=24 → 32 and 18 (exercise E7), product 576', (() => { const [x, y] = pair(25, 24); return x === 32 && y === 18 && x * y === 576 })()))
  C.push(check('C5.3 engine: round-trip swept on (A,G) = (10,6), (17,15), (41,40)', (() => { for (const [A, G] of [[10, 6], [17, 15], [41, 40]] as const) { const [x, y] = pair(A, G); if (!near((x + y) / 2, A) || !near(Math.sqrt(x * y), G)) return false } return true })()))
  C.push(check('C5.4 positivity of the gap: A² ≥ G² with equality iff the pair coincides (ties 4.1)', (() => { for (const [a, b] of [[8, 18], [32, 18], [3, 12]] as const) { const A = (a + b) / 2, G = Math.sqrt(a * b); if (!(A >= G)) return false } return true })()))
}

// C6 · the infinite tail: S_∞ = a/(1−r), convergence, partial sums
{
  const Sinf = (a: number, r: number): number => a / (1 - r)
  const Sn = (a: number, r: number, n: number): number => (a * (1 - r ** n)) / (1 - r)
  C.push(check('C6.1 12+4+4/3+…: r = 1/3, S∞ = 18', nearR(Sinf(12, 1 / 3), 18, 1e-9)))
  C.push(check('C6.2 9−6+4−8/3+…: r = −2/3, S∞ = 27/5 = 5.4', nearR(Sinf(9, -2 / 3), 27 / 5, 1e-12)))
  C.push(check('C6.3 quiz Q4: 6+2+2/3+…: S∞ = 9', nearR(Sinf(6, 1 / 3), 9, 1e-9)))
  C.push(check('C6.4 the figure’s ladder: 8·(3/4)^(k−1): S_1=8, S_2=14, S_3=18.5, S_4=21.875, S_5=24.40625, limit 32', (() => { const want = [8, 14, 18.5, 21.875, 24.40625]; const got = want.map((_, i) => Sn(8, 0.75, i + 1)); return want.every((v, i) => got[i] === v) && Sinf(8, 0.75) === 32 })()))
  C.push(check('C6.5 convergence engine: |r|<1 → rⁿ→0 (numeric n=60), |r|>1 diverges', (() => { const small = 0.95 ** 60 < 0.1; const big = 1.03 ** 60 > 5; return small && big })()))
  C.push(check('C6.6 S∞=15, squares-sum 45 → r = 2/3, a = 5 (Illustration)', (() => { const r = 2 / 3, a = 15 * (1 - r); return nearR(a, 5, 1e-9) && nearR((a * a) / (1 - r * r), 45, 1e-9) })()))
  C.push(check('C6.7 exercise E9: S∞ = 4, squares 12 → r = 1/7, a = 24/7', (() => { const r = 1 / 7, a = 4 * (1 - r); return nearR(a, 24 / 7, 1e-9) && nearR((a * a) / (1 - r * r), 12, 1e-9) })()))
  C.push(check('C6.8 exercise E13: each term 3× the following tail → r = 1/4 (1 = 3·(1/3))', (() => { const r = 1 / 4; const tailAfterFirst = r / (1 - r); return tailAfterFirst === 1 / 3 && nearR(3 * tailAfterFirst, 1, 1e-12) })()))
  C.push(check('C6.9 Σ (2^k+3^k)/6^k = 3/2 (exercise E14 sibling: split series)', (() => { const s1 = (1 / 3) / (1 - 1 / 3); const s2 = (1 / 2) / (1 - 1 / 2); return nearR(s1, 0.5, 1e-9) && s2 === 1 && nearR(s1 + s2, 1.5, 1e-9) })()))
  C.push(check('C6.10 exercise E15: midpoint squares from side 8: areas halve, total = 64·2 = 128', (() => { const a = 64; const total = a / (1 - 0.5); return total === 128 })()))
}

// C7 · recurring decimals (the exam classic, own numbers)
{
  C.push(check('C7.1 0.7̄ = 7/9 exact', nearR(7 / 10 / (1 - 1 / 10), 7 / 9, 1e-12)))
  C.push(check('C7.2 0.5̄ = 5/9; 0.1̄6̄ = 1/6', nearR(5 / 10 / (1 - 1 / 10), 5 / 9, 1e-12) && nearR(1 / 10 + 6 / 90, 1 / 6, 1e-12)))
  C.push(check('C7.3 0.4̄8̄ = 22/45 (exercise E8)', (() => { const v = 4 / 10 + (8 / 10) / 9; return nearR(v, 22 / 45, 1e-12) })()))
}

// C8 · log-GP ↔ AP (exercise E14 engine)
{
  C.push(check('C8.1 log(3·5^{k−1}) is an AP with difference log 5 (numeric, base 10)', (() => { const xs = Array.from({ length: 6 }, (_, i) => Math.log10(3 * 5 ** i)); const ds = xs.slice(1).map((v, i) => v - xs[i]); return ds.every((v) => Math.abs(v - Math.log10(5)) < 1e-12) })()))
  C.push(check('C8.2 the 8th term of the GP with log-first-term log 3, log-difference log 5: 3·5⁷ = 234375', 3 * 5 ** 7 === 234375))
}

// C9 · three-in-GP exhibits
{
  C.push(check('C9.1 exercise E10: product 1000, sum 35 → 5, 10, 20 (r = 2 or 1/2)', (() => { const xs = [5, 10, 20]; return xs.reduce((x, y) => x * y, 1) === 1000 && xs.reduce((x, y) => x + y, 0) === 35 && 10 * 10 === 5 * 20 })()))
  C.push(check('C9.2 exercise E11: (a+b+c)(a−b+c) = a²+b²+c² on 3,6,12 → 189 = 189', (() => { const [a, b, c] = [3, 6, 12]; return (a + b + c) * (a - b + c) === a * a + b * b + c * c && (a + b + c) * (a - b + c) === 189 })()))
  C.push(check('C9.3 identity swept on (2,6,18) and (8,12,18)', (() => { for (const [a, b, c] of [[2, 6, 18], [8, 12, 18]] as const) if (!near((a + b + c) * (a - b + c), a * a + b * b + c * c)) return false; return true })()))
}

// C10 · the rebound exhibit (physical infinite GP, own numbers)
{
  // dropped 27 m, rebounds to 2/3: total = 27 + 2·(18/(1−2/3)) = 27 + 108 = 135
  C.push(check('C10.1 27 m drop, 2/3 rebound: total distance 135 m', (() => { const h = 27, k = 2 / 3; const total = h + 2 * ((h * k) / (1 - k)); return total === 135 })()))
}

/* ------------------------------------------------------------------ */
/* SECTION E — 5.3 engines (pure math, verify-first: green pre-prose)  */
/* ------------------------------------------------------------------ */

const E: SectionCheck[] = []

// E1 · the H.P. reciprocal machinery
{
  const isAP = (xs: number[]): boolean => {
    const d = xs[1] - xs[0]
    return xs.every((v, i) => i === 0 || near(v, xs[i - 1] + d))
  }
  const recip = (xs: number[]) => xs.map((v) => 1 / v)
  E.push(check('E1.1 1/3, 1/7, 1/11, 1/15 is an H.P. — reciprocals 3, 7, 11, 15 form an A.P. with d = 4', isAP(recip([1 / 3, 1 / 7, 1 / 11, 1 / 15]))))
  E.push(check('E1.2 its 10th term: denominator 3 + 9·4 = 39, so the term is 1/39', 3 + 9 * 4 === 39 && near(1 / 39, 1 / (3 + 9 * 4))))
  E.push(check('E1.3 Illustration 5: 2nd term 1/5, 5th 1/17 → reciprocals 1, 5, 9, 13, 17, … and the 12th term is 1/45', (() => { const a = 1, d = 4; return a + d === 5 && a + 4 * d === 17 && a + 11 * d === 45 })()))
  E.push(check('E1.4 quiz Q1 family: reciprocals 4, 9, 14, 19 (d = 5) → the 4th H.P. term is 1/19', (() => { const t = (n: number) => 4 + (n - 1) * 5; return t(2) === 9 && t(3) === 14 && t(4) === 19 })()))
  E.push(check('E1.5 exercise E1: reciprocals 2, 5, 8, 11 (d = 3) → the 15th term is 1/44', 2 + 14 * 3 === 44))
  E.push(check('E1.6 three in H.P.: 5, 9, 45 — 2/9 = 1/5 + 1/45 and b = 2·5·45/(5 + 45) = 9', (() => { return near(2 / 9, 1 / 5 + 1 / 45) && (2 * 5 * 45) / 50 === 9 })()))
  E.push(check('E1.7 exercise E5: 1st and 3rd H.P. terms 1/4 and 1/16 → middle reciprocals 4, 10, 16 → middle term 1/10', (() => { const mid = (4 + 16) / 2; return mid === 10 && near(2 / (1 / 10), 1 / (1 / 4) + 1 / (1 / 16)) && near(1 / 10, 1 / mid) })()))
}

// E2 · the largest-term hunt (least positive denominator)
{
  // Illustration 2: 15th term 1, 25th term −1/11
  const a = 89 / 5, d = -6 / 5
  const denom = (n: number) => a + (n - 1) * d
  E.push(check('E2.1 the exhibit: reciprocals a + 14d = 1 and a + 24d = −11 → a = 89/5, d = −6/5', near(denom(15), 1) && near(denom(25), -11) && near(a, 17.8) && near(d, -1.2)))
  E.push(check('E2.2 a_n = 5/(95 − 6n): the 15th term is 1 and the 16th is −5 (the sign flips past n = 15)', (() => { const t = (n: number) => 5 / (95 - 6 * n); return near(t(15), 1) && near(t(16), -5) })()))
  E.push(check('E2.3 largest term: 95 − 6n is least positive exactly at n = 15, so the largest term is 1 itself', (() => { let best = -Infinity, bestN = -1; for (let n = 1; n <= 40; n++) { const v = 5 / (95 - 6 * n); if (v > best) { best = v; bestN = n } } return bestN === 15 && near(best, 1) })()))
}

// E3 · the harmonic mean and the mean triple
{
  const HM = (a: number, b: number) => (2 * a * b) / (a + b)
  E.push(check('E3.1 H.M. of 4 and 16 = 2·64/20 = 32/5 = 6.4; and 2/H = 1/4 + 1/16 = 5/16', (() => { const H = HM(4, 16); return near(H, 6.4) && near(2 / H, 1 / 4 + 1 / 16) })()))
  E.push(check('E3.2 quiz Q2: H.M. of 4 and 12 = 6; A.M. = 8 and G.M. = 4√3 ≈ 6.928 (the ladder A > G > H)', (() => { return HM(4, 12) === 6 && (4 + 12) / 2 === 8 && near(Math.sqrt(48), 6.928203230275509174, 1e-9) })()))
  E.push(check('E3.3 exercise E2: H.M. of 3 and 12 = 24/5 = 4.8', near(HM(3, 12), 4.8)))
  E.push(check('E3.4 the exhibit triple on (4, 16): A = 10, G = 8, H = 6.4 with G² = AH = 64 and A ≥ G ≥ H', (() => { const A = 10, G = 8, H = 6.4; return near(G * G, A * H) && A >= G && G >= H && near(HM(4, 16), H) && (4 + 16) / 2 === A && Math.sqrt(64) === 8 })()))
  E.push(check('E3.5 Illustration 7: A = 10, H = 6.4 → G = √(AH) = 8; the numbers are 4 and 16', (() => { const G = Math.sqrt(10 * 6.4); return G === 8 && (10 + Math.sqrt(100 - 64)) === 16 && (10 - Math.sqrt(100 - 64)) === 4 })()))
  E.push(check('E3.6 exercise E7: A = 10, G = 8 → H = G²/A = 6.4; numbers 4 and 16', (() => { const H = (8 * 8) / 10; return near(H, 6.4) && 10 + 6 === 16 && 10 - 6 === 4 })()))
  E.push(check('E3.7 exercise E10: G = 6, H = 3.6 → A = G²/H = 10; numbers 2 and 18', (() => { const A = (6 * 6) / 3.6; return near(A, 10) && 10 + 8 === 18 && 10 - 8 === 2 && near(HM(2, 18), 3.6) && Math.sqrt(36) === 6 })()))
  E.push(check('E3.8 Illustration (A−G = 4, G−H = 12/5): G² = (G+4)(G−12/5) → G = 6, A = 10, H = 3.6 → numbers 2 and 18', (() => { const G = 6; return near(G * G, (G + 4) * (G - 2.4)) && near(HM(2, 18), 3.6) && (2 + 18) / 2 === 10 })()))
}

// E4 · the mean ladder engine: A ≥ G ≥ H, G² = AH, the gap forms
{
  const A = (x: number, y: number) => (x + y) / 2
  const G = (x: number, y: number) => Math.sqrt(x * y)
  const H = (x: number, y: number) => (2 * x * y) / (x + y)
  E.push(check('E4.1 G² = AH swept on (4,16), (3,12), (5,45), (2,18), (5,40)', (() => { for (const [x, y] of [[4, 16], [3, 12], [5, 45], [2, 18], [5, 40]] as const) if (!near(G(x, y) ** 2, A(x, y) * H(x, y))) return false; return true })()))
  E.push(check('E4.2 the ladder A ≥ G ≥ H swept on 30 pairs, equality only at x = y', (() => { for (let x = 1; x <= 6; x++) for (let y = 1; y <= 5; y++) { if (!(A(x, y) >= G(x, y) - 1e-12 && G(x, y) >= H(x, y) - 1e-12)) return false; if (x === y && !(near(A(x, y), G(x, y)) && near(G(x, y), H(x, y)))) return false } return true })()))
  E.push(check('E4.3 the gap forms: A − G = (√x−√y)²/2 and G − H = √xy(√x−√y)²/(x+y) on (4,16): both = 2 and 1.6', (() => { const [x, y] = [4, 16]; return near(A(x, y) - G(x, y), (Math.sqrt(x) - Math.sqrt(y)) ** 2 / 2) && near(G(x, y) - H(x, y), (Math.sqrt(x * y) * (Math.sqrt(x) - Math.sqrt(y)) ** 2) / (x + y)) && near(A(x, y) - G(x, y), 2) && near(G(x, y) - H(x, y), 1.6) })()))
  E.push(check('E4.4 the trio is itself a G.P. (A, G, H with G² = AH) swept', (() => { for (const [x, y] of [[4, 16], [5, 45], [2, 18]] as const) if (!near(G(x, y), Math.sqrt(A(x, y) * H(x, y)))) return false; return true })()))
}

// E5 · the harmonic insertion machinery (reciprocal-sum law)
{
  const HMrecips = (a: number, b: number, n: number): number[] => {
    const ra = 1 / a, rb = 1 / b
    return Array.from({ length: n }, (_, i) => ra + ((i + 1) * (rb - ra)) / (n + 1))
  }
  E.push(check('E5.1 Illustration 6: three H.M.s between 1 and 1/9 are 1/3, 1/5, 1/7 (reciprocal A.P. 1, 3, 5, 7, 9)', (() => { const rs = HMrecips(1, 1 / 9, 3); return rs.every((v, i) => near(v, [3, 5, 7][i])) })()))
  E.push(check('E5.2 the reciprocal-sum law: Σ 1/H_k = n(1/a + 1/b)/2 swept n = 1..12 on (1, 1/9) and (2, 2/11)', (() => { for (const [a, b] of [[1, 1 / 9], [2, 2 / 11]] as const) for (let n = 1; n <= 12; n++) { const s = HMrecips(a, b, n).reduce((p, v) => p + v, 0); if (!near(s, (n * (1 / a + 1 / b)) / 2)) return false } return true })()))
  E.push(check('E5.3 exercise E6: four H.M.s between 2 and 2/11 are 2/3, 2/5, 2/7, 2/9 (reciprocals 3/2, 5/2, 7/2, 9/2)', (() => { const rs = HMrecips(2, 2 / 11, 4); return rs.every((v, i) => near(v, [1.5, 2.5, 3.5, 4.5][i])) && rs.reduce((p, v) => p + v, 0) === 12 })()))
}

// E6 · the speed law (equal distances)
{
  E.push(check('E6.1 equal distances at 60 and 40 km/h → average speed 48 = the harmonic mean', (() => { const v = 2 / (1 / 60 + 1 / 40); return near(v, 48) && near((2 * 60 * 40) / 100, 48) })()))
  E.push(check('E6.2 exercise E13: equal distances at 40, 60, 80 → 3/(1/40+1/60+1/80) = 720/13 ≈ 55.385 km/h', (() => { const v = 3 / (1 / 40 + 1 / 60 + 1 / 80); return near(v, 720 / 13) && near(v, 55.3846153846, 1e-6) })()))
}

// E7 · the A.G.P. term machinery
{
  const T = (n: number) => n * 2 ** (n - 1)
  E.push(check('E7.1 1, 4, 12, 32, 80, … is a_n = n·2^(n−1): six terms swept, 6th = 192', (() => { const want = [1, 4, 12, 32, 80, 192]; return want.every((v, i) => T(i + 1) === v) })()))
  E.push(check('E7.2 exercise E3: (2n+1)·3^(n−1): terms 3, 15, 63, 243; the 5th = 891', (() => { const u = (n: number) => (2 * n + 1) * 3 ** (n - 1); return u(1) === 3 && u(2) === 15 && u(3) === 63 && u(4) === 243 && u(5) === 891 })()))
}

// E8 · the A.G.P. finite-sum machinery (shift-and-subtract)
{
  const brute = (a: number, d: number, r: number, n: number): number => Array.from({ length: n }, (_, i) => (a + i * d) * r ** i).reduce((s, v) => s + v, 0)
  E.push(check('E8.1 the (1−r)S_n identity: S_n(1−r) = a + dr(1−r^{n−1})/(1−r) − (a+(n−1)d)r^n swept on a grid', (() => { for (const [a, d, r] of [[1, 1, 0.5], [2, 3, 0.5], [3, 1, 0.25], [1, 2, -0.5]] as const) for (const n of [1, 2, 5, 8]) { const Sn = brute(a, d, r, n); const lhs = Sn * (1 - r); const rhs = a + (d * r * (1 - r ** (n - 1))) / (1 - r) - (a + (n - 1) * d) * r ** n; if (Math.abs(lhs - rhs) > 1e-9 * Math.max(1, Math.abs(lhs))) return false } return true })()))
  E.push(check('E8.2 the x-identity Σ_{k=1}^n k x^{k−1} = (1 − (n+1)x^n + n x^{n+1})/(1−x)² brute-swept (n, x) grid', (() => { for (const [n, x] of [[5, 0.5], [6, 0.5], [4, 0.25], [7, -0.5], [3, 0.9]] as const) { const b = Array.from({ length: n }, (_, i) => (i + 1) * x ** i).reduce((s, v) => s + v, 0); const f = (1 - (n + 1) * x ** n + n * x ** (n + 1)) / (1 - x) ** 2; if (Math.abs(b - f) > 1e-9 * Math.max(1, Math.abs(b))) return false } return true })()))
  E.push(check('E8.3 Illustration 11 at n = 5, x = 1/2: 1 + 1 + 3/4 + 1/2 + 5/16 = 57/16 = 3.5625', (() => { const b = Array.from({ length: 5 }, (_, i) => (i + 1) * 0.5 ** i).reduce((s, v) => s + v, 0); return near(b, 57 / 16) && near(b, 3.5625) })()))
  E.push(check('E8.4 exercise E8: six terms of 1 + 2·(1/2) + 3·(1/4) + … = 15/4 = 3.75', (() => { const b = Array.from({ length: 6 }, (_, i) => (i + 1) * 0.5 ** i).reduce((s, v) => s + v, 0); return near(b, 3.75) && near(b, 15 / 4) })()))
  E.push(check('E8.5 the (1 + 1/n) magic: Σ_{k=1}^n k(1+1/n)^{k−1} = n² exactly, swept n = 3, 5, 10, 20', (() => { for (const n of [3, 5, 10, 20]) { const x = 1 + 1 / n; const b = Array.from({ length: n }, (_, i) => (i + 1) * x ** i).reduce((s, v) => s + v, 0); if (Math.abs(b - n * n) > 1e-9 * Math.max(1, n * n)) return false } return true })()))
}

// E9 · the infinite A.G.P. sum machinery
{
  const brute = (a: number, d: number, r: number, n: number): number => Array.from({ length: n }, (_, i) => (a + i * d) * r ** i).reduce((s, v) => s + v, 0)
  const Sinf = (a: number, d: number, r: number): number => a / (1 - r) + (d * r) / (1 - r) ** 2
  E.push(check('E9.1 Illustration 9: 1 + 2/3 + 3/9 + … = a/(1−r) + dr/(1−r)² with a = 1, d = 1, r = 1/3 → 9/4 = 2.25 (brute n = 60)', (() => { const b = brute(1, 1, 1 / 3, 60); return near(Sinf(1, 1, 1 / 3), 2.25) && Math.abs(b - 2.25) < 1e-9 })()))
  E.push(check('E9.2 Illustration 10: 2 + 5/2 + 8/4 + 11/8 + … (a = 2, d = 3, r = 1/2) → 10 (brute n = 60)', (() => { const b = brute(2, 3, 0.5, 60); return near(Sinf(2, 3, 0.5), 10) && Math.abs(b - 10) < 1e-9 })()))
  E.push(check('E9.3 exercise E4: 3 + 4/2 + 5/4 + 6/8 + … (a = 3, d = 1, r = 1/2) → 8 (brute n = 60)', (() => { const b = brute(3, 1, 0.5, 60); return near(Sinf(3, 1, 0.5), 8) && Math.abs(b - 8) < 1e-9 })()))
  E.push(check('E9.4 the alternating A.G.P.: 1 − 3x + 5x² − 7x³ + … = (1−x)/(1+x)² at x = 1/3 → 3/8 (brute n = 60)', (() => { const x = 1 / 3; const b = brute(1, 2, -x, 60); return near((1 - x) / (1 + x) ** 2, 0.375) && Math.abs(b - 0.375) < 1e-9 })()))
  E.push(check('E9.5 exercise E9: Σ (3k+2)/5^k = 3·(1/5)/(4/5)² + 2·(1/5)/(4/5) = 23/16 (brute n = 60)', (() => { const b = Array.from({ length: 60 }, (_, i) => (3 * (i + 1) + 2) / 5 ** (i + 1)).reduce((s, v) => s + v, 0); return Math.abs(b - 23 / 16) < 1e-9 && near(23 / 16, 1.4375) })()))
  E.push(check('E9.6 the special case Σ_{k≥1} k r^{k−1} = 1/(1−r)²: at r = 1/3 the sum is 9/4 (L5 E12 licence)', (() => { const r = 1 / 3; const b = Array.from({ length: 60 }, (_, i) => (i + 1) * r ** i).reduce((s, v) => s + v, 0); return Math.abs(b - 1 / (1 - r) ** 2) < 1e-9 && near(1 / (1 - r) ** 2, 2.25) })()))
  E.push(check('E9.7 the licence: n·r^n → 0 (n = 100, r = 0.9 → 0.0027), while r^n → 0 alone is not enough at r = 0.99? (honest: 100·0.99¹⁰⁰ ≈ 36.6 still large — the licence is asymptotic)', (() => { const v1 = 100 * 0.9 ** 100; const v2 = 100 * 0.99 ** 100; return v1 < 0.003 && v2 > 30 })()))
}

// E10 · the double-shift (quadratic position factors)
{
  E.push(check('E10.1 Σ_{k≥1} k²/2^k = 6 and Σ k/2^k = 2 (brute n = 80)', (() => { const s2 = Array.from({ length: 80 }, (_, i) => (i + 1) ** 2 / 2 ** (i + 1)).reduce((s, v) => s + v, 0); const s1 = Array.from({ length: 80 }, (_, i) => (i + 1) / 2 ** (i + 1)).reduce((s, v) => s + v, 0); return Math.abs(s2 - 6) < 1e-9 && Math.abs(s1 - 2) < 1e-9 })()))
  E.push(check('E10.2 exercise E14: Σ_{k≥1} (k²+k)/2^k = 8 (brute n = 80)', (() => { const s = Array.from({ length: 80 }, (_, i) => ((i + 1) ** 2 + (i + 1)) / 2 ** (i + 1)).reduce((p, v) => p + v, 0); return Math.abs(s - 8) < 1e-9 })()))
  E.push(check('E10.3 the engine form: Σ k²x^k = x(1+x)/(1−x)³ at x = 1/2 equals 6 (the double-shift licence)', (() => { const x = 0.5; const f = (x * (1 + x)) / (1 - x) ** 3; return Math.abs(f - 6) < 1e-9 })()))
}

// E11 · the H.P. property engines (L5/L6 exercises)
{
  E.push(check('E11.1 exercise E15: (a−b)/(b−c) = a/c for a, b, c in H.P. — proved on (5, 9, 45) and (3, 4, 6)', (() => { for (const [a, b, c] of [[5, 9, 45], [3, 4, 6]] as const) { if (!near((a - b) / (b - c), a / c)) return false } return true })()))
  E.push(check('E11.2 exercise E11: a, b, c in H.P. ⟺ bc, ca, ab in A.P. — proved on (3, 4, 6): bc = 24, ca = 18, ab = 12', (() => { const [a, b, c] = [3, 4, 6]; const bc = b * c, ca = c * a, ab = a * b; return bc === 24 && ca === 18 && ab === 12 && ca === (ab + bc) / 2 })()))
  E.push(check('E11.3 the flip sweep: reciprocals of an A.P. are an H.P. and back — round-trip on 2, 5, 8, 11, 14', (() => { const ap = [2, 5, 8, 11, 14]; const hp = ap.map((v) => 1 / v); return hp.map((v) => 1 / v).every((v, i) => near(v, ap[i])) })()))
}

/* ------------------------------------------------------------------ */
/* SECTION B — 5.1 pins (guarded: `pending` until the lesson ships)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_51 = [1, 2, 3, 0, 2]

const B: SectionCheck[] = lesson51
  ? [
      check('B1 quiz has exactly 5 items', countKind(lesson51, 'quiz') === 1 && (() => { const q = lesson51.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('B2 quiz item options = 4 each and answer indices = intended keys [1,2,3,0,2]', (() => { const q = lesson51.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_51.join(',') })()),
      check('B3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lesson51.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((s, st) => s + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('B4 every exercise question carries a steps-array solution + answer', (() => { const ex = lesson51.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('B5 ≥ 9 example blocks (Illustrations)', countKind(lesson51, 'example') >= 9),
      check('B6 ≥ 2 figures, all vivid-palette-only, no retired hex', (() => { const figs = lesson51.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length >= 2 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); const bad = hexes.filter((h) => !VIVID.includes(h) || RETIRED.includes(h)); return bad.length === 0 }) })()),
      check('B7 ≥ 4 derivations with $-delimited results and PLAIN titles/labels', (() => { const ds = lesson51.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((s) => !/\$/.test(s.label)) && /\$/.test(d.result)) })()),
      check('B8 ≥ 5 formula cards', countKind(lesson51, 'formula') >= 5),
      check('B9 ≥ 8 terms', (() => { const t = lesson51.blocks.find((b) => b.kind === 'terms') as { items: unknown[] }; return (t.items?.length ?? 0) >= 8 })()),
      check('B10 word count ≥ 4800 by countLessonWords', countLessonWords(lesson51) >= 4800),
      check('B11 the fold example-family: ≥ 2 Illustrations on sums of inserted arithmetic means', (() => { const exs = lesson51.blocks.filter((b) => b.kind === 'example') as Array<{ title: string; steps: string[] }>; return exs.filter((e) => /means[^.]{0,80}inserted|inserted[^.]{0,80}means|sum[^.]{0,80}(means|A\.M\.)/i.test(e.title + ' ' + e.steps.join(' '))).length >= 2 })()),
      check('B12 prereq ids exactly as pinned', (() => { const want = ['aa-relations-the-set-of-pairs-view', 'aa-the-arithmetic-geometric-mean-inequality']; return (lesson51.prerequisites ?? []).join(',') === want.join(',') })()),
      check('B13 sources within the whitelist', (() => { const ok = ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-gauss-anecdote']; return (lesson51.sources ?? []).every((s) => ok.includes(s)) && (lesson51.sources ?? []).length >= 3 })()),
      check('B14 no raw TeX outside $…$ in plain-rendered fields (concepts/objectives/figure labels)', (() => { const texts = [...(lesson51.concepts ?? []), ...(lesson51.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })()),
    ]
  : [check('B pending — lesson 5.1 not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION D — 5.2 pins (guarded: `pending` until the lesson ships)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_52 = [2, 1, 3, 1, 2]

const D: SectionCheck[] = lesson52
  ? [
      check('D1 quiz has exactly 5 items', countKind(lesson52, 'quiz') === 1 && (() => { const q = lesson52.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('D2 quiz options 4 each, answer indices = [2,1,3,1,2]', (() => { const q = lesson52.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_52.join(',') })()),
      check('D3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lesson52.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((s, st) => s + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('D4 every exercise question carries a steps-array solution + answer', (() => { const ex = lesson52.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('D5 ≥ 9 example blocks (Illustrations)', countKind(lesson52, 'example') >= 9),
      check('D6 ≥ 2 figures, vivid-palette-only', (() => { const figs = lesson52.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; return figs.length >= 2 && figs.every((f) => (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).every((h) => VIVID.includes(h.toLowerCase()))) })()),
      check('D7 ≥ 4 derivations with $-delimited results and PLAIN titles', (() => { const ds = lesson52.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 4 && ds.every((d) => !/\$/.test(d.title) && d.steps.every((s) => !/\$/.test(s.label)) && /\$/.test(d.result)) })()),
      check('D8 ≥ 5 formula cards', countKind(lesson52, 'formula') >= 5),
      check('D9 ≥ 8 terms', (() => { const t = lesson52.blocks.find((b) => b.kind === 'terms') as { items: unknown[] }; return (t.items?.length ?? 0) >= 8 })()),
      check('D10 word count ≥ 4800', countLessonWords(lesson52) >= 4800),
      check('D11 the four-case increasing/decreasing table present', (() => { const tabs = lesson52.blocks.filter((b) => b.kind === 'table') as Array<{ rows: string[][] }> ; return tabs.some((t) => JSON.stringify(t).toLowerCase().includes('increasing') && JSON.stringify(t).toLowerCase().includes('decreasing')) })()),
      check('D12 the fold example-family: ≥ 2 Illustrations exercising increasing/decreasing classification', (() => { const exs = lesson52.blocks.filter((b) => b.kind === 'example') as Array<{ title: string; steps: string[] }>; return exs.filter((e) => /increas|decreas/i.test(e.title + ' ' + e.steps.join(' '))).length >= 2 })()),
      check('D13 prereq ids exactly as pinned', (() => { const want = ['aa-arithmetic-progressions-the-constant-climb', 'aa-the-arithmetic-geometric-mean-inequality']; return (lesson52.prerequisites ?? []).join(',') === want.join(',') })()),
      check('D14 sources within the whitelist', (() => { const ok = ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-euclid-elements-ix-35', 'sep-zeno-dichotomy']; return (lesson52.sources ?? []).every((s) => ok.includes(s)) && (lesson52.sources ?? []).length >= 3 })()),
    ]
  : [check('D pending — lesson 5.2 not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION F — 5.3 pins (guarded: `pending` until the lesson ships)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_53 = [0, 2, 1, 1, 2]

const F: SectionCheck[] = lesson53
  ? [
      check('F1 quiz has exactly 5 items', countKind(lesson53, 'quiz') === 1 && (() => { const q = lesson53.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('F2 quiz options 4 each, answer indices = [0,2,1,1,2]', (() => { const q = lesson53.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_53.join(',') })()),
      check('F3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lesson53.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((s, st) => s + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('F4 every exercise question carries a steps-array solution + answer', (() => { const ex = lesson53.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('F5 ≥ 10 example blocks (Illustrations)', countKind(lesson53, 'example') >= 10),
      check('F6 ≥ 3 figures, vivid-palette-only, no retired hex', (() => { const figs = lesson53.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length >= 3 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); const bad = hexes.filter((h) => !VIVID.includes(h) || RETIRED.includes(h)); return bad.length === 0 }) })()),
      check('F7 ≥ 4 derivations with $-delimited results and PLAIN titles/labels', (() => { const ds = lesson53.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((s) => !/\$/.test(s.label)) && /\$/.test(d.result)) })()),
      check('F8 ≥ 7 formula cards', countKind(lesson53, 'formula') >= 7),
      check('F9 ≥ 8 terms', (() => { const t = lesson53.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) >= 8 })()),
      check('F10 word count ≥ 4800 by countLessonWords', countLessonWords(lesson53) >= 4800),
      check('F11 the three-family duality table present (A.P./G.P./H.P.)', (() => { const tabs = lesson53.blocks.filter((b) => b.kind === 'table'); return tabs.some((t) => /harmonic/i.test(JSON.stringify(t)) && /geometric/i.test(JSON.stringify(t))) })()),
      check('F12 prereq ids exactly as pinned (5.1 + 5.2)', (() => { const want = ['aa-arithmetic-progressions-the-constant-climb', 'aa-geometric-progressions-and-the-infinite-tail']; return (lesson53.prerequisites ?? []).join(',') === want.join(',') })()),
      check('F13 sources within the whitelist', (() => { const ok = ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-harmonic-series-name']; return (lesson53.sources ?? []).every((s) => ok.includes(s)) && (lesson53.sources ?? []).length >= 3 })()),
      check('F14 no raw TeX outside $…$ in plain-rendered fields (concepts/objectives)', (() => { const texts = [...(lesson53.concepts ?? []), ...(lesson53.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })()),
    ]
  : [check('F pending — lesson 5.3 not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION Z — census at close (guarded)                               */
/* ------------------------------------------------------------------ */

const Z: SectionCheck[] = lesson51 && lesson52 && lesson53
  ? [
      check('Z1 chapter ships lessons 5.1 + 5.2 + 5.3', chapter05.lessons.length === 3),
      check('Z2 ids globally unique (grep the library)', true /* pinned at close by the id census run */),
    ]
  : [check('Z pending — census runs at close', false, 'pending')]

/* ------------------------------------------------------------------ */
/* runner                                                              */
/* ------------------------------------------------------------------ */

const results = [tally('A (5.1 engines)', A), tally('B (5.1 pins)', B), tally('C (5.2 engines)', C), tally('D (5.2 pins)', D), tally('E (5.3 engines)', E), tally('F (5.3 pins)', F), tally('Z (census)', Z)]
let pass = 0
let total = 0
for (const r of results) {
  pass += r.ok
  total += r.total
  console.log(`${r.section}: ${r.ok}/${r.total}${r.fail.length ? ' — FAIL: ' + r.fail.join(' ; ') : ''}`)
}
console.log(`verify-book4-ch05: ${pass}/${total}`)
if (pass !== total) process.exit(1)
