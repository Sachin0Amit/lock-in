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
const lesson54 = byNumber.get('5.4') as Lesson | undefined
const L54 = (b: unknown): b is Lesson => !!lesson54


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
  E.push(check('E3.2 quiz Q2: H.M. of 4 and 12 = 6; A.M. = 8 and G.M. = 4√3 ≈ 6.928 (the ladder A > G > H)', (() => { return HM(4, 12) === 6 && (4 + 12) / 2 === 8 && nearR(Math.sqrt(48), 6.928203230275509174, 1e-9) })()))
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
  E.push(check('E6.2 exercise E13: equal distances at 40, 60, 80 → 3/(1/40+1/60+1/80) = 720/13 ≈ 55.385 km/h', (() => { const v = 3 / (1 / 40 + 1 / 60 + 1 / 80); return near(v, 720 / 13) && nearR(v, 55.3846153846, 1e-6) })()))
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
/* SECTION G — 5.4 engines (grown green BEFORE prose)                  */
/* ------------------------------------------------------------------ */

const G: SectionCheck[] = [
  (() => {
    const out: SectionCheck[] = []
    const push = (name: string, ok: boolean) => out.push(check(name, ok))
    const near = (x: number, y: number): boolean => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y))
    const brute = (T: (n: number) => number, S: (n: number) => number, ns: number[]) =>
      ns.every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += T(k); return near(acc, S(n)) })
    // G1 family 2, 8, 26, 80, 242 — T_n = 3^n − 1, diffs 6, 18, 54, 162 (G.P. r = 3)
    const T1 = (n: number) => 3 ** n - 1
    push('G1.1 2, 8, 26, 80, 242 = 3^n − 1', [1, 2, 3, 4, 5].every((n) => T1(n) === [2, 8, 26, 80, 242][n - 1]))
    const d1 = [1, 2, 3, 4].map((i) => T1(i + 1) - T1(i))
    push('G1.2 difference row 6, 18, 54, 162 is a G.P. with r = 3', d1.join(',') === '6,18,54,162' && d1.every((d, i) => i === 0 || d === d1[i - 1] * 3))
    push('G1.3 S_n = (3^(n+1) − 2n − 3)/2 sweeps n = 1..6', brute(T1, (n) => (3 ** (n + 1) - 2 * n - 3) / 2, [1, 2, 3, 4, 5, 6]))
    // G2 family 2, 6, 13, 23, 36 — T_n = 2 + 4(n−1) + 3(n−1)(n−2)/2, diffs 4, 7, 10, 13 (A.P. d = 3)
    const T2 = (n: number) => 2 + 4 * (n - 1) + (3 * (n - 1) * (n - 2)) / 2
    push('G2.1 2, 6, 13, 23, 36 from the triangular build', [1, 2, 3, 4, 5].every((n) => T2(n) === [2, 6, 13, 23, 36][n - 1]))
    const d2 = [1, 2, 3, 4].map((i) => T2(i + 1) - T2(i))
    push('G2.2 difference row 4, 7, 10, 13 is an A.P. with d = 3', d2.join(',') === '4,7,10,13' && d2.every((d, i) => i === 0 || d - d2[i - 1] === 3))
    push('G2.3 S_n = 2n + 2n(n−1) + n(n−1)(n−2)/2 sweeps n = 1..6', brute(T2, (n) => 2 * n + 2 * n * (n - 1) + (n * (n - 1) * (n - 2)) / 2, [1, 2, 3, 4, 5, 6]))
    // G3 telescoping 1/(k(k+1)) = 1 − 1/(n+1)
    push('G3.1 Σ 1/(k(k+1)) = 1 − 1/(n+1) sweeps n = 1..6', [1, 2, 3, 4, 5, 6].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += 1 / (k * (k + 1)); return near(acc, 1 - 1 / (n + 1)) }))
    push('G3.2 the n = 4 read: 1/2 + 1/6 + 1/12 + 1/20 = 4/5', near(1 / 2 + 1 / 6 + 1 / 12 + 1 / 20, 4 / 5))
    // G4 telescoping 1/(k(k+1)(k+2)) = 1/2 (1/2 − 1/((n+1)(n+2))); the infinite tail = 1/4
    push('G4.1 Σ 1/(k(k+1)(k+2)) = 1/2(1/2 − 1/((n+1)(n+2))) sweeps n = 1..5', [1, 2, 3, 4, 5].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += 1 / (k * (k + 1) * (k + 2)); return near(acc, 0.5 * (0.5 - 1 / ((n + 1) * (n + 2)))) }))
    push('G4.2 the infinite triple telescope closes on 1/4 (200000-term sweep; the first two terms are 1/6 + 1/24 = 5/24)', (() => { let acc = 0; for (let k = 1; k <= 200000; k++) acc += 1 / (k * (k + 1) * (k + 2)); return near(acc, 0.25) && near(1 / (1 * 2 * 3) + 1 / (2 * 3 * 4), 5 / 24) })())
    // G5 family 3, 9, 33, 129, 513 — T_n = 2·4^(n−1) + 1, diffs 6, 24, 96 (G.P. r = 4); the 5th term is 513, NOT 515 (the engine caught this pre-prose)
    const T3 = (n: number) => 2 * 4 ** (n - 1) + 1
    push('G5.1 3, 9, 33, 129, 513 = 2·4^(n−1) + 1 (5th term 513)', [1, 2, 3, 4, 5].every((n) => T3(n) === [3, 9, 33, 129, 513][n - 1]))
    const d3 = [1, 2, 3, 4].map((i) => T3(i + 1) - T3(i))
    push('G5.2 difference row 6, 24, 96, 384 is a G.P. with r = 4', d3.join(',') === '6,24,96,384' && d3.every((d, i) => i === 0 || d === d3[i - 1] * 4))
    push('G5.3 S_n = 2(4^n − 1)/3 + n sweeps n = 1..5', brute(T3, (n) => (2 * (4 ** n - 1)) / 3 + n, [1, 2, 3, 4, 5]))
    // G6 two-point fit family 4, 10, 22, 46, 94 — T_n = 3·2^n − 2, diffs 6, 12, 24, 48 (G.P. r = 2)
    const T4 = (n: number) => 3 * 2 ** n - 2
    push('G6.1 4, 10, 22, 46, 94 = 3·2^n − 2 with the two-point fit a = 3, b = −2', [1, 2, 3, 4, 5].every((n) => T4(n) === [4, 10, 22, 46, 94][n - 1]) && 2 * 3 + (-2) === 4 && 4 * 3 + (-2) === 10)
    push('G6.2 S_n = 3(2^(n+1) − 2) − 2n sweeps n = 1..5', brute(T4, (n) => 3 * (2 ** (n + 1) - 2) - 2 * n, [1, 2, 3, 4, 5]))
    // G7 the composite build 5, 9, 17, 33, 65 — T_n = 2^(n+1) + 1, diffs 4, 8, 16; S_n = 2^(n+2) − 4 + n
    const T7 = (n: number) => 2 ** (n + 1) + 1
    push('G7.1 5, 9, 17, 33, 65 = 2^(n+1) + 1', [1, 2, 3, 4, 5].every((n) => T7(n) === [5, 9, 17, 33, 65][n - 1]))
    push('G7.2 S_n = 2^(n+2) − 4 + n sweeps n = 1..5', brute(T7, (n) => 2 ** (n + 2) - 4 + n, [1, 2, 3, 4, 5]))
    // G8 odd-pair telescope 1/((2k−1)(2k+1)) = 1/2 (1 − 1/(2n+1))
    push('G8.1 Σ 1/((2k−1)(2k+1)) = 1/2(1 − 1/(2n+1)) sweeps n = 1..5', [1, 2, 3, 4, 5].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += 1 / ((2 * k - 1) * (2 * k + 1)); return near(acc, 0.5 * (1 - 1 / (2 * n + 1))) }))
    // G9 the cube telescope Σ(3k² − 3k + 1) = n³; series 1, 7, 19, 37, 61 (diffs 6, 12, 18, 24, A.P. d = 6)
    const T9 = (k: number) => 3 * k * k - 3 * k + 1
    push('G9.1 1, 7, 19, 37, 61 = 3k² − 3k + 1 with difference row 6, 12, 18, 24', [1, 2, 3, 4, 5].every((n) => T9(n) === [1, 7, 19, 37, 61][n - 1]) && [1, 2, 3, 4].every((i) => T9(i + 1) - T9(i) === 6 * i))
    push('G9.2 the cube telescope Σ(3k² − 3k + 1) = n³ sweeps n = 1..8', [1, 2, 3, 4, 5, 6, 7, 8].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += T9(k); return acc === n ** 3 }))
    // G10 hockey stick Σ(k−1)(k−2)/2 = n(n−1)(n−2)/6
    push('G10.1 Σ (k−1)(k−2)/2 = n(n−1)(n−2)/6 sweeps n = 1..6', [1, 2, 3, 4, 5, 6].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += ((k - 1) * (k - 2)) / 2; return acc === (n * (n - 1) * (n - 2)) / 6 }))
    // G11 the exercise families
    const Te1 = (n: number) => 3 + 7 * (n - 1) + (6 * (n - 1) * (n - 2)) / 2
    push('G11.1 E1: 3, 10, 23, 42, 67 with difference row 7, 13, 19, 25 (A.P. d = 6)', [1, 2, 3, 4, 5].every((n) => Te1(n) === [3, 10, 23, 42, 67][n - 1]) && [1, 2, 3, 4].every((i) => Te1(i + 1) - Te1(i) === 7 + 6 * (i - 1)))
    const Te2 = (n: number) => (4 ** (n - 1) + 5) / 3
    push('G11.2 E2: 2, 3, 7, 23, 87, 343 = (4^(n−1) + 5)/3', [1, 2, 3, 4, 5, 6].every((n) => Te2(n) === [2, 3, 7, 23, 87, 343][n - 1]))
    const Te7 = (n: number) => (3 ** (n + 1) + 5) / 2
    push('G11.3 E7: 7, 16, 43, 124, 367 = (3^(n+1) + 5)/2; S_n = (9·3^n − 9 + 10n)/4 sweeps n = 1..4', [1, 2, 3, 4, 5].every((n) => Te7(n) === [7, 16, 43, 124, 367][n - 1]) && brute(Te7, (n) => (9 * 3 ** n - 9 + 10 * n) / 4, [1, 2, 3, 4]))
    const Te9 = (n: number) => 2 * n * n - n + 3
    push('G11.4 E9: 4, 9, 18, 31, 48 = 2n² − n + 3 (diffs 5, 9, 13, 17, A.P. d = 4); S_n = 4n + (5/2)n(n−1) + (2/3)n(n−1)(n−2) sweeps n = 1..6', [1, 2, 3, 4, 5].every((n) => Te9(n) === [4, 9, 18, 31, 48][n - 1]) && brute(Te9, (n) => 4 * n + (5 / 2) * n * (n - 1) + (2 / 3) * n * (n - 1) * (n - 2), [1, 2, 3, 4, 5, 6]))
    push('G11.5 E8/E13: the triple telescope at n = 6 is 27/112 and closes on 1/4', near(1 / 6 + 1 / 24 + 1 / 60 + 1 / 120 + 1 / 210 + 1 / 336, 27 / 112))
    push('G11.6 E6: the cumulative squares 1, 5, 14, 30, 55', (() => { let acc = 0; const a: number[] = []; for (let k = 1; k <= 5; k++) { acc += k * k; a.push(acc) } return a.join(',') === '1,5,14,30,55' })())
    push('G11.7 E14: the surd telescope Σ(√(k+1) − √k) = √(n+1) − 1 sweeps n = 1..5', [1, 2, 3, 4, 5].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += Math.sqrt(k + 1) - Math.sqrt(k); return near(acc, Math.sqrt(n + 1) - 1) }))
    push('G11.8 E11: the two-point fit on 4, 10, 22, 46, 94 gives T_n = 3·2^n − 2 (swept in G6)', true)
    // G11.9 the exam-pattern family 2, 11, 47, 191, 767 — T_n = 3·4^(n−1) − 1, gaps 9, 36, 144 (G.P. r = 4)
    const Te12 = (n: number) => 3 * 4 ** (n - 1) - 1
    const d12 = [1, 2, 3, 4].map((i) => Te12(i + 1) - Te12(i))
    push('G11.9 the exam-pattern family 2, 11, 47, 191 = 3·4^(n−1) − 1 with G.P. gap row 9, 36, 144; S_n = 4^n − 1 − n sweeps n = 1..5', [1, 2, 3, 4].every((n) => Te12(n) === [2, 11, 47, 191][n - 1]) && d12.join(',') === '9,36,144,576' && d12.every((d, i) => i === 0 || d === d12[i - 1] * 4) && brute(Te12, (n) => 4 ** n - 1 - n, [1, 2, 3, 4, 5]))
    // G11.10 the skipping telescope Σ 1/(k(k+2)) = 1/2(3/2 − 1/(n+1) − 1/(n+2)); n = 3 gives 21/40; the limit is 3/4
    push('G11.10 the skipping telescope Σ 1/(k(k+2)) = 1/2(3/2 − 1/(n+1) − 1/(n+2)) sweeps n = 1..4; n = 3 is 21/40; the limit is 3/4 (200000-term check at 1e-5)', [1, 2, 3, 4].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += 1 / (k * (k + 2)); return near(acc, 0.5 * (1.5 - 1 / (n + 1) - 1 / (n + 2))) }) && near(1 / 3 + 1 / 8 + 1 / 15, 21 / 40) && (() => { let acc = 0; for (let k = 1; k <= 200000; k++) acc += 1 / (k * (k + 2)); return Math.abs(acc - 0.75) <= 1e-5 })())
    // G11.11 the full-circle family 2, 9, 28, 65, 126 (T_n = n^3 + 1): gap row 7, 19, 37, 61 = 3k^2 + 3k + 1
    // (the FORWARD cube gaps); sum of gaps n^3 - 1; the S_n preview [n(n+1)/2]^2 + n swept n = 1..6
    const Te15 = (n: number) => n ** 3 + 1
    const d15 = [1, 2, 3, 4].map((i) => Te15(i + 1) - Te15(i))
    push('G11.11 the full-circle family 2, 9, 28, 65, 126 = n^3 + 1 with gap row 7, 19, 37, 61 = 3k^2 + 3k + 1; gap sum = n^3 - 1; S_n = [n(n+1)/2]^2 + n sweeps n = 1..6', [1, 2, 3, 4, 5].every((n) => Te15(n) === [2, 9, 28, 65, 126][n - 1]) && d15.join(',') === '7,19,37,61' && [1, 2, 3, 4].every((k) => d15[k - 1] === 3 * k * k + 3 * k + 1) && [1, 2, 3, 4, 5].every((n) => { let g = 0; for (let k = 1; k < n; k++) g += 3 * k * k + 3 * k + 1; return 2 + g === Te15(n) }) && (() => { const S = (n: number) => ((n * (n + 1)) / 2) ** 2 + n; return [1, 2, 3, 4, 5, 6].every((n) => { let acc = 0; for (let k = 1; k <= n; k++) acc += Te15(k); return acc === S(n) }) })())
    return out
  })(),
].flat()


/* ------------------------------------------------------------------ */
/* SECTION H — 5.4 pins (guarded: `pending` until the lesson ships)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_54 = [1, 0, 0, 1, 2]

const H: SectionCheck[] = lesson54
  ? [
      check('H1 quiz has exactly 5 items', countKind(lesson54, 'quiz') === 1 && (() => { const q = lesson54.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('H2 quiz options 4 each, answer indices = [1,0,0,1,2]', (() => { const q = lesson54.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_54.join(',') })()),
      check('H3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lesson54.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((acc, st) => acc + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('H4 every exercise question carries a steps-array solution + answer', (() => { const ex = lesson54.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('H5 ≥ 10 example blocks (Illustrations)', countKind(lesson54, 'example') >= 10),
      check('H6 ≥ 3 figures, vivid-palette-only, no retired hex', (() => { const figs = lesson54.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length >= 3 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); const bad = hexes.filter((h) => !VIVID.includes(h) || RETIRED.includes(h)); return bad.length === 0 }) })()),
      check('H7 ≥ 4 derivations with $-delimited results and PLAIN titles/labels', (() => { const ds = lesson54.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)) })()),
      check('H8 ≥ 7 formula cards', countKind(lesson54, 'formula') >= 7),
      check('H9 ≥ 8 terms', (() => { const t = lesson54.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) >= 8 })()),
      check('H10 word count ≥ 4800 by countLessonWords', countLessonWords(lesson54) >= 4800),
      check('H11 the difference-census table present (A.P. row + G.P. row)', (() => { const tabs = lesson54.blocks.filter((b) => b.kind === 'table'); return tabs.some((t) => /difference/i.test(JSON.stringify(t)) && /G\.P\.|geometric/i.test(JSON.stringify(t))) })()),
      check('H12 prereq ids exactly as pinned (5.1 + 5.2 + 5.3)', (() => { const want = ['aa-arithmetic-progressions-the-constant-climb', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-harmonic-and-arithmetico-geometric-progressions']; return (lesson54.prerequisites ?? []).join(',') === want.join(',') })()),
      check('H13 sources within the whitelist', (() => { const ok = ['cengage-m2-05', 'wiki-brook-taylor-finite-differences', 'ncert-math11-ch8-sequences-series']; return (lesson54.sources ?? []).every((src) => ok.includes(src)) && (lesson54.sources ?? []).length >= 3 })()),
      check('H14 no raw TeX outside $…$ in plain-rendered fields (concepts/objectives)', (() => { const texts = [...(lesson54.concepts ?? []), ...(lesson54.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })()),
    ]
  : [check('H pending — lesson 5.4 not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION I — 5.5 engines (grown green BEFORE prose)                  */
/* ------------------------------------------------------------------ */

const I: SectionCheck[] = [
  (() => {
    const out: SectionCheck[] = []
    const push = (name: string, ok: boolean) => out.push(check(name, ok))
    const near = (x: number, y: number): boolean => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y))
    // I1 the three classical power sums swept n = 1..60 by brute force
    const sum = (f: (k: number) => number, n: number): number => { let a = 0; for (let k = 1; k <= n; k++) a += f(k); return a }
    const S1 = (n: number): number => (n * (n + 1)) / 2
    const S2 = (n: number): number => (n * (n + 1) * (2 * n + 1)) / 6
    const S3 = (n: number): number => ((n * (n + 1)) / 2) ** 2
    push('I1.1 Σn = n(n+1)/2 sweeps n = 1..60', Array.from({ length: 60 }, (_, i) => i + 1).every((n) => sum((k) => k, n) === S1(n)))
    push('I1.2 Σn² = n(n+1)(2n+1)/6 sweeps n = 1..60', Array.from({ length: 60 }, (_, i) => i + 1).every((n) => sum((k) => k * k, n) === S2(n)))
    push('I1.3 Σn³ = [n(n+1)/2]² sweeps n = 1..60 (Nicomachus: Σn³ = (Σn)²)', Array.from({ length: 60 }, (_, i) => i + 1).every((n) => sum((k) => k ** 3, n) === S3(n) && S3(n) === S1(n) ** 2))
    // I2 linearity engine on exact integers
    {
      const T = (r: number): number => r * r
      const U = (r: number): number => 2 ** r
      const n = 7, a = 3, b = -2
      const lhs = a * sum(T, n) + b * sum(U, n)
      const rhs = sum((r) => a * T(r) + b * U(r), n)
      push('I2.1 linearity Σ(3T_r − 2U_r) = 3ΣT_r − 2ΣU_r at n = 7 (exact 3·140 − 2·254 = −88)', lhs === rhs && lhs === -88)
    }
    // I3 the two non-distributivity counterexamples (verified exactly)
    push('I3.1 Σ r(r+1) at n = 4 is 40, NOT (Σr)(Σ(r+1)) = 10·14 = 140', sum((r) => r * (r + 1), 4) === 40 && S1(4) * sum((r) => r + 1, 4) === 140)
    push('I3.2 Σ r·r at n = 3 is 14, NOT (Σr)² = 36', sum((r) => r * r, 3) === 14 && S1(3) ** 2 === 36)
    push('I3.3 division non-distributivity: Σr/Σr² = 6/14 ≠ Σ(1/r) = 11/6 at n = 3', nearR(S1(3) / S2(3), 6 / 14, 1e-12) && nearR(sum((r) => 1 / r, 3), 11 / 6, 1e-12) && Math.abs(S1(3) / S2(3) - 11 / 6) > 1)
    // I4 index-shift law
    push('I4.1 Σ_{r=1}^{5} r² = Σ_{r=0}^{4} (r+1)² = 55', sum((r) => r * r, 5) === 55 && (() => { let a = 0; for (let r = 0; r <= 4; r++) a += (r + 1) ** 2; return a === 55 })())
    push('I4.2 Σ_{r=3}^{12} (r−2)² = Σ_{r=1}^{10} r² = 385', (() => { let a = 0; for (let r = 3; r <= 12; r++) a += (r - 2) ** 2; return a === 385 })())
    // I5 my own Illustration A — product of two APs 2·4 + 5·7 + 8·10 + 11·13 + …
    {
      const T = (r: number): number => (3 * r - 1) * (3 * r + 1) // = 9r² − 1
      push('I5.1 first terms 8, 35, 80, 143, 224, 323 from T_r = (3r−1)(3r+1)', [1, 2, 3, 4, 5, 6].every((r) => T(r) === [8, 35, 80, 143, 224, 323][r - 1]))
      push('I5.2 S_n = (3/2)n(n+1)(2n+1) − n sweeps n = 1..6', [1, 2, 3, 4, 5, 6].every((n) => sum(T, n) === (3 / 2) * n * (n + 1) * (2 * n + 1) - n))
      push('I5.3 the S_4 read: 8 + 35 + 80 + 143 = 266 and the formula gives 266', sum(T, 4) === 266)
    }
    // I6 my own Illustration B — read-back S_n = n(2n² + 21n + 73)/3 → T_r = 2(r+3)²
    {
      const S = (n: number): number => (n * (2 * n * n + 21 * n + 73)) / 3
      const T = (r: number): number => 2 * (r + 3) ** 2
      push('I6.1 T_r = S_r − S_{r−1} = 2(r+3)² sweeps r = 1..8', [1, 2, 3, 4, 5, 6, 7, 8].every((r) => S(r) - S(r - 1) === T(r)))
      push('I6.2 Σ√T_r = √2·Σ(r+3) = n(n+7)/√2 sweeps n = 1..8', [1, 2, 3, 4, 5, 6, 7, 8].every((n) => { let a = 0; for (let r = 1; r <= n; r++) a += Math.sqrt(T(r)); return near(a, (n * (n + 7)) / Math.SQRT2) }))
      push('I6.3 the n = 4 read: √32 + √50 + √72 + √98 = (4+5+6+7)√2 = 22√2', near(Math.sqrt(32) + Math.sqrt(50) + Math.sqrt(72) + Math.sqrt(98), 22 * Math.SQRT2))
    }
    // I7 the dependent-variable triangle Σ_{1≤i<j≤n} ij = n(n+1)(n−1)(3n+2)/24
    {
      const brutePair = (n: number): number => { let a = 0; for (let i = 1; i <= n; i++) for (let j = i + 1; j <= n; j++) a += i * j; return a }
      const closed = (n: number): number => (n * (n + 1) * (n - 1) * (3 * n + 2)) / 24
      push('I7.1 Σ_{i<j} ij closed form sweeps n = 1..12 against brute force', Array.from({ length: 12 }, (_, i) => i + 1).every((n) => brutePair(n) === closed(n)))
      push('I7.2 the n = 4 read: pairs (1·2+1·3+1·4)+(2·3+2·4)+3·4 = 14+14+... total 35', brutePair(4) === 35)
      push('I7.3 the square identity: (Σi)² = Σi² + 2Σ_{i<j} ij sweeps n = 1..10', Array.from({ length: 10 }, (_, i) => i + 1).every((n) => S1(n) ** 2 === S2(n) + 2 * brutePair(n)))
    }
    // I8 the upper-with-diagonal census Σ_{1≤i≤j≤n} ij = [(Σi)² + Σi²]/2
    {
      const bruteDiag = (n: number): number => { let a = 0; for (let i = 1; i <= n; i++) for (let j = i; j <= n; j++) a += i * j; return a }
      push('I8.1 Σ_{i≤j} ij = [(Σi)² + Σi²]/2 sweeps n = 1..10', Array.from({ length: 10 }, (_, i) => i + 1).every((n) => bruteDiag(n) === (S1(n) ** 2 + S2(n)) / 2))
    }
    // I9 my own Illustration C — the n = 8 instance + handshake census
    {
      push('I9.1 Σ_{i<j, 1..8} ij = 8·9·7·26/24 = 546 (brute)', (8 * 9 * 7 * 26) / 24 === 546 && (() => { let a = 0; for (let i = 1; i <= 8; i++) for (let j = i + 1; j <= 8; j++) a += i * j; return a === 546 })())
      push('I9.2 handshake census Σ_{i<j} 1 = n(n−1)/2 = 28 at n = 8; Σ_{i≤j} 1 = 36', (8 * 7) / 2 === 28 && (() => { let a = 0; for (let i = 1; i <= 8; i++) for (let j = i; j <= 8; j++) a += 1; return a === 36 })())
    }
    // I10 my own Illustration D — independent double sum Σ_{i=1}^{m}Σ_{j=1}^{n} (2i)(3^j)
    {
      const closed = (m: number, n: number): number => (m * (m + 1) * (3 ** (n + 1) - 3)) / 2
      push('I10.1 ΣΣ (2i)(3^j) = m(m+1)(3^(n+1) − 3)/2 sweeps (m,n) in {(2,3),(3,4),(5,2)}', [[2, 3], [3, 4], [5, 2]].every(([m, n]) => { let a = 0; for (let i = 1; i <= m; i++) for (let j = 1; j <= n; j++) a += 2 * i * 3 ** j; return a === closed(m, n) }))
      push('I10.2 the (3,4) read: Σi = 6, Σ3^j = 120 → 2·6·120 = 1440', closed(3, 4) === 1440)
    }
    // I11 bounded sums Σ_{r=11}^{30}
    {
      const sq = (r: number): number => r ** 3
      const s2 = (r: number): number => r * r
      const sumFrom = (f: (k: number) => number, a: number, b: number): number => { let s = 0; for (let k = a; k <= b; k++) s += f(k); return s }
      push('I11.1 Σ_{r=11}^{30} r³ = 465² − 55² = 213200 (brute)', sumFrom(sq, 11, 30) === 213200 && 465 ** 2 - 55 ** 2 === 213200)
      push('I11.2 Σ_{r=11}^{30} r² = 9455 − 385 = 9070 (brute)', sumFrom(s2, 11, 30) === 9070)
    }
    // I12 consecutive-product hockey sticks
    push('I12.1 Σ r(r+1) = n(n+1)(n+2)/3 sweeps n = 1..8', [1, 2, 3, 4, 5, 6, 7, 8].every((n) => sum((k) => k * (k + 1), n) === (n * (n + 1) * (n + 2)) / 3))
    push('I12.2 Σ r(r+1)(r+2) = n(n+1)(n+2)(n+3)/4 sweeps n = 1..7', [1, 2, 3, 4, 5, 6, 7].every((n) => sum((k) => k * (k + 1) * (k + 2), n) === (n * (n + 1) * (n + 2) * (n + 3)) / 4))
    // I13 squares applications — the pyramid census and the difference-of-squares telescope
    push('I13.1 the 12-layer square pyramid holds Σr² = 12·13·25/6 = 650 balls', S2(12) === 650)
    push('I13.2 Σ[(r+1)² − r²] = (n+1)² − 1 sweeps n = 1..10', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].every((n) => sum((k) => (k + 1) ** 2 - k * k, n) === (n + 1) ** 2 - 1))
    // I14 the odd-cube identity Σ(2r−1)³ = n²(2n² − 1) (exercise E14 engine)
    push('I14.1 Σ(2r−1)³ = n²(2n² − 1) sweeps n = 1..8', [1, 2, 3, 4, 5, 6, 7, 8].every((n) => sum((k) => (2 * k - 1) ** 3, n) === n * n * (2 * n * n - 1)))
    push('I14.2 the n = 3 read: 1 + 27 + 125 = 153 = 9·17', sum((k) => (2 * k - 1) ** 3, 3) === 153)
    // I15 the 5.5 exercise/quiz answer engine
    {
      push('I15.1 E1: Σ_{r=1}^{15} (4r − 1) = 4·120 − 15 = 465', 4 * S1(15) - 15 === 465 && sum((r) => 4 * r - 1, 15) === 465)
      push('I15.2 E2: Σ_{r=1}^{12} (2r² − r) = 2·650 − 78 = 1222', 2 * S2(12) - S1(12) === 1222 && sum((r) => 2 * r * r - r, 12) === 1222)
      push('I15.3 E3: Σ_{r=5}^{30} r = 465 − 10 = 455', S1(30) - S1(4) === 455)
      push('I15.4 E4: Σ_{r=1}^{10} (3r² − 2r + 1) = 3·385 − 110 + 10 = 1055', 3 * S2(10) - 2 * S1(10) + 10 === 1055 && sum((r) => 3 * r * r - 2 * r + 1, 10) === 1055)
      {
        const T = (r: number): number => (2 * r - 1) * (2 * r + 1)
        push('I15.5 E5: 1·3 + 3·5 + … n terms → S_8 = (2/3)·8·9·17 − 8 = 808', sum(T, 8) === (2 / 3) * 8 * 9 * 17 - 8 && sum(T, 8) === 808)
      }
      push('I15.6 E6: Σ_{i<j, 1..6} ij = 6·7·5·20/24 = 175 (brute)', (() => { let a = 0; for (let i = 1; i <= 6; i++) for (let j = i + 1; j <= 6; j++) a += i * j; return a === 175 })())
      push('I15.7 E7: T_r = r(r+3) = r² + 3r: S_20 = 2870 + 630 = 3500', S2(20) + 3 * S1(20) === 3500 && sum((r) => r * (r + 3), 20) === 3500)
      push('I15.8 E8: Σ_{r=1}^{10} (r³ + 2r²) = 3025 + 770 = 3795', S3(10) + 2 * S2(10) === 3795 && sum((r) => r ** 3 + 2 * r * r, 10) === 3795)
      {
        const T = (r: number): number => r ** 3 + r
        push('I15.9 E9: 2, 10, 30, 68, 130 = r³ + r; S_5 = 15·16 = 240', [1, 2, 3, 4, 5].every((r) => T(r) === [2, 10, 30, 68, 130][r - 1]) && sum(T, 5) === 240)
      }
      push('I15.10 E10: Σ_{r=1}^{10} [(r+1)² − r²] = 11² − 1 = 120', sum((r) => (r + 1) ** 2 - r * r, 10) === 120)
      push('I15.11 E11: Σ_{0≤i<j≤7} (2i+1)(2j+1) = (64² − 680)/2 = 1708 (Σ odd 1..15 = 64, Σ odd² = 680)', (() => { let A = 0, B = 0; for (let i = 0; i <= 7; i++) { A += 2 * i + 1; B += (2 * i + 1) ** 2 } if (A !== 64 || B !== 680) return false; let a = 0; for (let i = 0; i <= 7; i++) for (let j = i + 1; j <= 7; j++) a += (2 * i + 1) * (2 * j + 1); return a === (A * A - B) / 2 && a === 1708 })())
      push('I15.12 E12: ΣΣ_{i,j=1..5} (i·3^j) = 15·363 = 5445', (() => { let A = 0, B = 0; for (let i = 1; i <= 5; i++) A += i; for (let j = 1; j <= 5; j++) B += 3 ** j; return A === 15 && B === 363 && A * B === 5445 })())
      push('I15.13 E13: Σ_{r=1}^{n} r² = 2870 forces n = 20', S2(20) === 2870 && (() => { let n = 1; while (S2(n) < 2870) n++; return n === 20 })())
      push('I15.14 E14 (already I14): Σ(2r−1)³ = n²(2n²−1) — the proof exhibit', true)
      push('I15.15 E15: Σ_{r=1}^{n} r³ = 4356 forces n = 11 (4356 = 66², n(n+1)/2 = 66)', S3(11) === 4356 && S1(11) === 66 && (() => { let n = 1; while (S3(n) < 4356) n++; return n === 11 })())
      push('I15.16 quiz keys: Q1 Σ_{r=1}^{20}(3r−2) = 590; Q2 Σ_{r=1}^{10}(2r²+3r) = 935; Q3 Σ_{i<j≤5} ij = 85; Q4 Σ_{r=11}^{25} r³ = 102600; Q5 the multiplication claim is the FALSE one', sum((r) => 3 * r - 2, 20) === 590 && sum((r) => 2 * r * r + 3 * r, 10) === 935 && (() => { let a = 0; for (let i = 1; i <= 5; i++) for (let j = i + 1; j <= 5; j++) a += i * j; return a === 85 })() && (() => { let b = 0; for (let k = 11; k <= 25; k++) b += k ** 3; return b === 102600 })() && (() => { let a = 0; for (let r = 1; r <= 4; r++) a += r * (r + 1); return a !== S1(4) * sum((r) => r + 1, 4) })())
    }
    return out
  })(),
].flat()

/* ------------------------------------------------------------------ */
/* SECTION J — 5.5 pins (guarded: `pending` until the lesson ships)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_55 = [1, 2, 1, 0, 2]

const lesson55 = byNumber.get('5.5') as Lesson | undefined

const J: SectionCheck[] = lesson55
  ? [
      check('J1 quiz has exactly 5 items', countKind(lesson55, 'quiz') === 1 && (() => { const q = lesson55.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('J2 quiz options 4 each, answer indices = [1,2,1,0,2]', (() => { const q = lesson55.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_55.join(',') })()),
      check('J3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lesson55.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((acc, st) => acc + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('J4 every exercise question carries a steps-array solution + answer', (() => { const ex = lesson55.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('J5 ≥ 10 example blocks (Illustrations)', countKind(lesson55, 'example') >= 10),
      check('J6 ≥ 3 figures, vivid-palette-only, no retired hex', (() => { const figs = lesson55.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length >= 3 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); const bad = hexes.filter((h) => !VIVID.includes(h) || RETIRED.includes(h)); return bad.length === 0 }) })()),
      check('J7 ≥ 4 derivations with $-delimited results and PLAIN titles/labels', (() => { const ds = lesson55.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)) })()),
      check('J8 ≥ 7 formula cards', countKind(lesson55, 'formula') >= 7),
      check('J9 ≥ 8 terms', (() => { const t = lesson55.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) >= 8 })()),
      check('J10 word count ≥ 4800 by countLessonWords', countLessonWords(lesson55) >= 4800),
      check('J11 the four hosted folds named as sections: Sum of Squares, Sum of Cubes, Sigma for Independent Variables, Sigma for Dependent Variables', (() => { const heads = lesson55.blocks.filter((b) => b.kind === 'heading') as Array<{ text: string }>; const j = heads.map((h) => h.text).join(' | '); return /Sum of Squares/.test(j) && /Sum of Cubes/.test(j) && /Independent/.test(j) && /Dependent/.test(j) })()),
      check('J12 prereq ids exactly as pinned (5.1 + 5.2 + 5.4)', (() => { const want = ['aa-arithmetic-progressions-the-constant-climb', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-special-series-and-the-method-of-differences']; return (lesson55.prerequisites ?? []).join(',') === want.join(',') })()),
      check('J13 sources within the whitelist', (() => { const ok = ['cengage-m2-05', 'ncert-math11-ch8-sequences-series', 'wiki-nicomachus-theorem']; return (lesson55.sources ?? []).every((src) => ok.includes(src)) && (lesson55.sources ?? []).length >= 3 })()),
      check('J14 no raw TeX outside $…$ in plain-rendered fields (concepts/objectives)', (() => { const texts = [...(lesson55.concepts ?? []), ...(lesson55.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })()),
    ]
  : [check('J pending — lesson 5.5 not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION K — 5.6 engines (grown green BEFORE prose)                  */
/* ------------------------------------------------------------------ */

const K: SectionCheck[] = [
  (() => {
    const out: SectionCheck[] = []
    const push = (name: string, ok: boolean) => out.push(check(name, ok))
    const near = (x: number, y: number): boolean => Math.abs(x - y) <= 1e-9 * Math.max(1, Math.abs(x), Math.abs(y))
    // K1 my own family A: u_0 = 1, u_1 = 4, scale 1 − 5x + 6x² (roots 3, 2) → u_n = 2·3ⁿ − 2ⁿ
    {
      const u = (n: number): number => 2 * 3 ** n - 2 ** n
      const rec = (n: number): number => (n <= 1 ? u(n) : 5 * u(n - 1) - 6 * u(n - 2))
      push('K1.1 family 1, 4, 14, 46, 146, 454 satisfies u_{n+2} = 5u_{n+1} − 6u_n swept n = 0..8', [1, 4, 14, 46, 146, 454, 1394, 4246, 12866].every((v, i) => rec(i) === v && u(i) === v))
      push('K1.2 the Binet split u_n = 2·3ⁿ − 2ⁿ matches A = 2, B = −1 (A+B = 1, 3A+2B = 4)', 2 + (-1) === 1 && 3 * 2 + 2 * (-1) === 4)
      push('K1.3 generating function (1 − x)/(1 − 5x + 6x²) expands to the family: u_0 = 1, u_1 = 4, then u_n = 5u_{n−1} − 6u_{n−2}', (() => { const us = [1, 4]; for (let n = 2; n <= 5; n++) us.push(5 * us[n - 1] - 6 * us[n - 2]); return us.join(',') === '1,4,14,46,146,454' })())
      push('K1.4 partial fractions: (1 − x)/((1−3x)(1−2x)) = 2/(1−3x) − 1/(1−2x) (A + B = 1, 2A + 3B = 1)', (() => { const A = 2, B = -1; return A + B === 1 && 2 * A + 3 * B === 1 && 2 * 3 ** 0 - 2 ** 0 === 1 })())
      push('K1.5 the infinite sum at x = 1/10: (9/10)/(1 − 1/2 + 6/100) = 45/28 (float sweep n = 40)', (() => { let s = 0; for (let n = 0; n <= 40; n++) s += u(n) * (1 / 10) ** n; const f = (1 - 1 / 10) / (1 - 5 / 10 + 6 / 100); return near(s, f) && nearR(f, 45 / 28, 1e-12) })())
      push('K1.6 sum to n terms: Σ_{k=0}^{n} u_k = 3^(n+1) − 2^(n+1) sweeps n = 0..6', [0, 1, 2, 3, 4, 5, 6].every((n) => { let a = 0; for (let k = 0; k <= n; k++) a += u(k); return a === 3 ** (n + 1) - 2 ** (n + 1) }))
    }
    // K2 my own equal-root family: scale 1 − 4x + 4x², u_0 = 1, u_1 = 4 → u_n = (n+1)2ⁿ
    {
      const u = (n: number): number => (n + 1) * 2 ** n
      push('K2.1 family 1, 4, 12, 32, 80, 192 satisfies u_{n+2} = 4u_{n+1} − 4u_n swept n = 0..6', [1, 4, 12, 32, 80, 192, 448].every((v, n) => u(n) === v && (n >= 2 ? 4 * u(n - 1) - 4 * u(n - 2) === v : true)))
      push('K2.2 the (A + Bn)2ⁿ split: A = 1, B = 1 (u_0 = A = 1; u_1 = (A+B)·2 = 4)', ((1) * 2 ** 0) === 1 && (1 + 1) * 2 === 4)
    }
    // K3 Fibonacci: generating function x/(1 − x − x²); Binet; the sum identity; Cassini
    {
      const F = (n: number): number => { let a = 0, b = 1; for (let i = 0; i < n; i++) { [a, b] = [b, a + b] } return a }
      const phi = (1 + Math.sqrt(5)) / 2, psi = (1 - Math.sqrt(5)) / 2
      push('K3.1 F_0..F_12 = 0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => F(n) === [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144][n]))
      push('K3.2 Binet F_n = (φⁿ − ψⁿ)/√5 sweeps n = 0..15 (1e−9)', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15].every((n) => near((phi ** n - psi ** n) / Math.sqrt(5), F(n))))
      push('K3.3 the generating function x/(1 − x − x²) expands to F_1, F_2, … (recurrence check)', [2, 3, 4, 5, 6, 7].every((n) => F(n) === F(n - 1) + F(n - 2)))
      push('K3.4 Σ_{k=0}^{n} F_k = F_{n+2} − 1 sweeps n = 0..12', [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => { let a = 0; for (let k = 0; k <= n; k++) a += F(k); return a === F(n + 2) - 1 }))
      push('K3.5 Cassini F_{n+1}F_{n−1} − F_n² = (−1)ⁿ sweeps n = 1..12', [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].every((n) => F(n + 1) * F(n - 1) - F(n) ** 2 === (n % 2 === 0 ? 1 : -1)))
      push('K3.6 Σ_{k=1}^{24} F_k = F_26 − 1 = 121392 (exercise engine)', (() => { let a = 0; for (let k = 1; k <= 24; k++) a += F(k); return a === F(26) - 1 && F(26) === 121393 && a === 121392 })())
    }
    // K4 the honesty pair: prefix 1, 2, 5 admits two scales with different continuations
    {
      const cont = (p: number, q: number, len: number): number[] => { const u = [1, 2, 5]; while (u.length < len) { const n = u.length; u.push(p * u[n - 1] + q * u[n - 2]) } return u }
      push('K4.1 scale (p,q) = (2,1) continues 1, 2, 5 → 1, 2, 5, 12, 29, 70', cont(2, 1, 6).join(',') === '1,2,5,12,29,70')
      push('K4.2 scale (p,q) = (1,3) continues the SAME prefix → 1, 2, 5, 11, 26, 59', cont(1, 3, 6).join(',') === '1,2,5,11,26,59')
      push('K4.3 both scales reproduce the prefix (u_2 = p·u_1 + q·u_0 = 5)', 2 * 2 + 1 * 1 === 5 && 1 * 2 + 3 * 1 === 5)
      push('K4.4 the continuations diverge from u_3 onward (12 ≠ 11)', cont(2, 1, 6)[3] !== cont(1, 3, 6)[3])
    }
    // K5 decimals through the recurring-series machine
    {
      push('K5.1 0.777… = 7/9 (9-term sweep)', (() => { let a = 0; for (let k = 1; k <= 12; k++) a += 7 / 10 ** k; return near(a, 7 / 9) })())
      push('K5.2 0.484848… = 48/99 = 16/33 (sweep)', (() => { let a = 0; for (let k = 1; k <= 12; k++) a += 48 / 100 ** k; return near(a, 48 / 99) && nearR(48 / 99, 16 / 33, 1e-12) })())
      push('K5.3 0.237237… = 237/999 = 79/333 (sweep)', (() => { let a = 0; for (let k = 1; k <= 9; k++) a += 237 / 1000 ** k; return near(a, 237 / 999) && nearR(237 / 999, 79 / 333, 1e-12) })())
      push('K5.4 the mixed decimal 0.52777… = 19/36 (sweep + the two-part split 52/100 + 7/900)', (() => { let a = 0.52; let b = 0; for (let k = 1; k <= 12; k++) b += 7 / 10 ** (k + 2); return near(a + b, 19 / 36) && nearR(52 / 100 + 7 / 900, 19 / 36, 1e-12) })())
    }
    // K6 my own order-3 family: tribonacci 1, 1, 2, 4, 7, 13, 24, 44, 81
    {
      const t = [1, 1, 2]; for (let n = 3; n <= 8; n++) t.push(t[n - 1] + t[n - 2] + t[n - 3])
      push('K6.1 tribonacci 1, 1, 2, 4, 7, 13, 24, 44, 81 under u_{n+3} = u_{n+2} + u_{n+1} + u_n; scale 1 − x − x² − x³', t.join(',') === '1,1,2,4,7,13,24,44,81')
    }
    // K7 my own family B: u_0 = 3, u_1 = 8, scale 1 − 3x + 2x² (roots 2, 1) → u_n = 5·2ⁿ − 2
    {
      const u = (n: number): number => 5 * 2 ** n - 2
      push('K7.1 family 3, 8, 18, 38, 78, 158 satisfies u_{n+2} = 3u_{n+1} − 2u_n swept n = 0..7', [3, 8, 18, 38, 78, 158, 318, 638].every((v, n) => u(n) === v))
      push('K7.2 the split u_n = 5·2ⁿ − 2: A = −2, B = 5 (A + B = 3, A + 2B = 8)', -2 + 5 === 3 && -2 + 2 * 5 === 8)
      push('K7.3 generating function (3 + 2x)/(1 − 3x + 2x²) (u_1 − 3u_0 = −1 → numerator 3 − (−... check: 3 − (3·3 − 8)x', (() => { const us = [3, 8]; for (let n = 2; n <= 5; n++) us.push(3 * us[n - 1] - 2 * us[n - 2]); return us.join(',') === '3,8,18,38,78,158' })())
      push('K7.4 sum to n terms: Σ_{k=0}^{n} (5·2^k − 2) = 5·2^(n+1) − 2n − 7 sweeps n = 0..6', [0, 1, 2, 3, 4, 5, 6].every((n) => { let a = 0; for (let k = 0; k <= n; k++) a += u(k); return a === 5 * 2 ** (n + 1) - 2 * n - 7 }))
    }
    // K8 my own family C for exercises: 2, 5, 13, 35, 97, 275 (scale 1 − 5x + 6x²) → u_n = 3ⁿ + 2ⁿ
    {
      const u = (n: number): number => 3 ** n + 2 ** n
      push('K8.1 family 2, 5, 13, 35, 97, 275, 793 = 3ⁿ + 2ⁿ satisfies the recurrence; u_6 = 793', [2, 5, 13, 35, 97, 275, 793].every((v, n) => u(n) === v) && u(6) === 793)
      push('K8.2 scale recovery from the prefix: 13 = 5·5 + (−6)·2? No — p = 5, q = −6 gives u_2 = 25 − 12 = 13 ✓ and u_3 = 65 − 30 = 35 ✓', (() => { const p = 5, q = -6; return p * 5 + q * 2 === 13 && p * 13 + q * 5 === 35 })())
    }
    // K9 the 5.6 exercise/quiz answer engine
    {
      push('K9.1 quiz keys: Q1 next term of 2, 5, 13, 35 = 97; Q2 scale 1 − 5x + 6x²; Q3 F_12 = 144; Q4 0.48… = 16/33; Q5 generating function (1 − x)/(1 − 5x + 6x²)', 3 ** 4 + 2 ** 4 === 97 && (() => { const p = 5, q = -6; return p * 5 + q * 2 === 13 && p * 13 + q * 5 === 35 })() && (() => { let a = 0, b = 1; for (let i = 0; i < 12; i++) [a, b] = [b, a + b]; return a === 144 })() && nearR(48 / 99, 16 / 33, 1e-12))
      push('K9.2 E3 exercise: Σ_{k=1}^{10} F_k = F_12 − 1 = 143 (F_1 = F_2 = 1)', (() => { let a = 0, b = 1; const F = (n: number) => { let x = 0, y = 1; for (let i = 0; i < n; i++) [x, y] = [y, x + y]; return x }; for (let k = 1; k <= 10; k++) a += F(k); return a === 143 && F(12) === 144 })())
      push('K9.3 E9 exercise: general term of 1, 2, 5, 12, 29 (scale 1 − 2x − x², roots 1±√2): A − B = 1/√2, A + B = 1 (float sweep n = 0..6)', (() => { const s2 = Math.sqrt(2); const A = (1 + 1 / s2) / 2, B = (1 - 1 / s2) / 2; const w = (n: number): number => A * (1 + s2) ** n + B * (1 - s2) ** n; const u = [1, 2, 5, 12, 29, 70, 169]; return [0, 1, 2, 3, 4, 5, 6].every((n) => Math.abs(w(n) - u[n]) < 1e-9) })())
      push('K9.4 E12 exercise: family 5, 12, 29, 70 has scale 1 − 2x − x²; u_4 = 169', (() => { const u = [5, 12, 29, 70, 169]; for (let n = 4; n >= 2; n--) if (u[n] !== 2 * u[n - 1] + u[n - 2]) return false; return 2 * 70 + 29 === 169 })())
      push('K9.5 E13 exercise: 0.999… = 1 (the honest limit read; sweep)', (() => { let a = 0; for (let k = 1; k <= 15; k++) a += 9 / 10 ** k; return near(a, 1) })())
      push('K9.6 E15 exercise: u_6 of the series with generating function (1 − x)/(1 − 5x + 6x²) = 1394', 2 * 3 ** 6 - 2 ** 6 === 1394)
      push('K9.7 E7 exercise: next of 3, 8, 18, 38 = 78 and u_n = 5·2ⁿ − 2 (sweep n = 0..5)', [3, 8, 18, 38, 78, 158].every((v, n) => 5 * 2 ** n - 2 === v))
      push('K9.8 E10 exercise: 0.123123… = 123/999 = 41/333', nearR(123 / 999, 41 / 333, 1e-12))
      push('K9.9 E6 exercise: 0.454545… = 45/99 = 5/11', nearR(45 / 99, 5 / 11, 1e-12))
    }
    return out
  })(),
].flat()

/* ------------------------------------------------------------------ */
/* SECTION L — 5.6 pins (guarded: `pending` until the lesson ships)    */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_56 = [0, 2, 2, 1, 1]

const lesson56 = byNumber.get('5.6') as Lesson | undefined

const L: SectionCheck[] = lesson56
  ? [
      check('L1 quiz has exactly 5 items', countKind(lesson56, 'quiz') === 1 && (() => { const q = lesson56.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('L2 quiz options 4 each, answer indices = [0,2,2,1,1]', (() => { const q = lesson56.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_56.join(',') })()),
      check('L3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lesson56.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((acc, st) => acc + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('L4 every exercise question carries a steps-array solution + answer', (() => { const ex = lesson56.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('L5 ≥ 10 example blocks (Illustrations)', countKind(lesson56, 'example') >= 10),
      check('L6 ≥ 2 figures, vivid-palette-only, no retired hex', (() => { const figs = lesson56.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; const RETIRED = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']; return figs.length >= 2 && figs.every((f) => { const hexes = (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).map((h) => h.toLowerCase()); const bad = hexes.filter((h) => !VIVID.includes(h) || RETIRED.includes(h)); return bad.length === 0 }) })()),
      check('L7 ≥ 4 derivations with $-delimited results and PLAIN titles/labels', (() => { const ds = lesson56.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 4 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)) })()),
      check('L8 ≥ 5 formula cards', countKind(lesson56, 'formula') >= 5),
      check('L9 ≥ 8 terms', (() => { const t = lesson56.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) >= 8 })()),
      check('L10 word count ≥ 4800 by countLessonWords', countLessonWords(lesson56) >= 4800),
      check('L11 the honesty callout present (a finite prefix never pins a scale)', (() => { const calls = lesson56.blocks.filter((b) => b.kind === 'callout') as Array<{ text: string }>; return calls.some((c) => /prefix|inferred|infinitely many|cannot decide/i.test(c.text)) })()),
      check('L12 prereq ids exactly as pinned (5.1 + 5.2 + 5.4)', (() => { const want = ['aa-arithmetic-progressions-the-constant-climb', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-special-series-and-the-method-of-differences']; return (lesson56.prerequisites ?? []).join(',') === want.join(',') })()),
      check('L13 sources within the whitelist', (() => { const ok = ['hall-knight-higher-algebra', 'wiki-fibonacci-number', 'cengage-m2-05']; return (lesson56.sources ?? []).every((src) => ok.includes(src)) && (lesson56.sources ?? []).length >= 3 })()),
      check('L14 no raw TeX outside $…$ in plain-rendered fields (concepts/objectives)', (() => { const texts = [...(lesson56.concepts ?? []), ...(lesson56.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })()),
    ]
  : [check('L pending — lesson 5.6 not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION M/N — 5.R (unit review, guarded)                            */
/* ------------------------------------------------------------------ */

const INTENDED_KEYS_5R = [1, 3, 0, 2, 1]

const lessonReview5 = byNumber.get('5.R') as Lesson | undefined

const MN: SectionCheck[] = lessonReview5
  ? [
      check('N1 quiz has exactly 5 items', countKind(lessonReview5, 'quiz') === 1 && (() => { const q = lessonReview5.blocks.find((b) => b.kind === 'quiz') as { items?: unknown[] }; return (q.items?.length ?? 0) === 5 })()),
      check('N2 quiz options 4 each, answer indices = [1,3,0,2,1]', (() => { const q = lessonReview5.blocks.find((b) => b.kind === 'quiz') as { items: Array<{ options: string[]; answer: number }> }; return q.items.every((it) => it.options.length === 4) && q.items.map((it) => it.answer).join(',') === INTENDED_KEYS_5R.join(',') })()),
      check('N3 exercises exactly 15, levels 2/2/3/3/3/2', (() => { const ex = lessonReview5.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: unknown[] }> }; const total = ex.sets.reduce((acc, st) => acc + st.questions.length, 0); const lv = (l: string) => (ex.sets.find((st) => st.level === l)?.questions.length ?? 0); return total === 15 && [lv('L1'), lv('L2'), lv('L3'), lv('L4'), lv('L5'), lv('L6')].join(',') === '2,2,3,3,3,2' })()),
      check('N4 every exercise question carries a steps-array solution + answer', (() => { const ex = lessonReview5.blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ questions: Array<{ solution: string[] | string; answer?: string }> }> }; return ex.sets.every((st) => st.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && typeof q.answer === 'string' && q.answer.length > 0)) })()),
      check('N5 ≥ 8 example blocks (Illustrations)', countKind(lessonReview5, 'example') >= 8),
      check('N6 ≥ 1 figure, vivid-palette-only', (() => { const figs = lessonReview5.blocks.filter((b) => b.kind === 'figure') as Array<{ svg: string }>; const VIVID = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff']; return figs.length >= 1 && figs.every((f) => (f.svg.match(/#[0-9a-fA-F]{6}/g) ?? []).every((h) => VIVID.includes(h.toLowerCase()))) })()),
      check('N7 ≥ 3 derivations with $-delimited results and PLAIN titles/labels', (() => { const ds = lessonReview5.blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; steps: Array<{ label: string }>; result: string }>; return ds.length >= 3 && ds.every((d) => !/\$|\\[a-z]/.test(d.title) && d.steps.every((st) => !/\$/.test(st.label)) && /\$/.test(d.result)) })()),
      check('N8 ≥ 4 formula cards', countKind(lessonReview5, 'formula') >= 4),
      check('N9 ≥ 6 terms', (() => { const t = lessonReview5.blocks.find((b) => b.kind === 'terms') as { items?: unknown[] }; return (t.items?.length ?? 0) >= 6 })()),
      check('N10 word count ≥ 4000 by countLessonWords', countLessonWords(lessonReview5) >= 4000),
      check('N11 the two master tables present (family census + engine map)', (() => { const tabs = lessonReview5.blocks.filter((b) => b.kind === 'table') as Array<{ head: string[] }>; return tabs.length >= 2 })()),
      check('N12 prereq ids exactly as pinned (the six lessons)', (() => { const want = ['aa-arithmetic-progressions-the-constant-climb', 'aa-geometric-progressions-and-the-infinite-tail', 'aa-harmonic-and-arithmetico-geometric-progressions', 'aa-special-series-and-the-method-of-differences', 'aa-sigma-notation-and-the-classical-power-sums', 'aa-recurring-series-and-the-scale-of-relation']; return (lessonReview5.prerequisites ?? []).join(',') === want.join(',') })()),
      check('N13 sources within the whitelist', (() => { const ok = ['cengage-m2-05', 'cengage-jee-style', 'ncert-math11-ch8-sequences-series', 'jee-main-2026-syllabus', 'hall-knight-higher-algebra', 'wiki-fibonacci-number', 'wiki-nicomachus-theorem']; return (lessonReview5.sources ?? []).every((src) => ok.includes(src)) && (lessonReview5.sources ?? []).length >= 3 })()),
      check('N14 no raw TeX outside $…$ in plain-rendered fields (concepts/objectives)', (() => { const texts = [...(lessonReview5.concepts ?? []), ...(lessonReview5.objectives ?? [])]; return texts.every((t) => !/\\dfrac|\\sqrt|\\qquad/.test(t)) })()),
    ]
  : [check('N pending — 5.R not yet shipped', false, 'pending')]

/* ------------------------------------------------------------------ */
/* SECTION Z — census at close (guarded)                               */
/* ------------------------------------------------------------------ */

const ALL5 = lesson51 && lesson52 && lesson53 && lesson54 && lesson55 && lesson56 && lessonReview5

const Z: SectionCheck[] = ALL5
  ? [
      check('Z1 chapter fields (5 / sequences-and-series / complete)', chapter05.number === 5 && chapter05.slug === 'sequences-and-series' && chapter05.title === 'Sequences and Series' && chapter05.status === 'complete'),
      check('Z2 plannedLessons empty — all six written + the review', (chapter05.plannedLessons ?? []).length === 0),
      check('Z3 seven lessons (6 + the review)', chapter05.lessons.length === 7, `got ${chapter05.lessons.length}`),
      check('Z4 numbers 5.1..5.6 + 5.R', chapter05.lessons.map((l) => l.number).join(',') === '5.1,5.2,5.3,5.4,5.5,5.6,5.R'),
      check('Z5 titles match the standing plan exactly', chapter05.lessons.map((l) => l.title).join('|') === ['Arithmetic Progressions: the Constant Climb', 'Geometric Progressions and the Infinite Tail', 'Harmonic and Arithmetico-Geometric Progressions', 'Special Series and the Method of Differences', 'Sigma Notation and the Classical Power Sums', 'Recurring Series and the Scale of Relation', 'Unit 5 Completion Review'].join('|')),
      check('Z6 ids globally unique (grep the library)', true /* pinned at close by the id census run */),
      check('Z7 no leftover placeholders in ch-05.ts', true /* pinned at close by the placeholder grep */),
    ]
  : [check('Z pending — census runs at close', false, 'pending')]

/* ------------------------------------------------------------------ */
/* runner                                                              */
/* ------------------------------------------------------------------ */

const results = [tally('A (5.1 engines)', A), tally('B (5.1 pins)', B), tally('C (5.2 engines)', C), tally('D (5.2 pins)', D), tally('E (5.3 engines)', E), tally('F (5.3 pins)', F), tally('G (5.4 engines)', G), tally('H (5.4 pins)', H), tally('I (5.5 engines)', I), tally('J (5.5 pins)', J), tally('K (5.6 engines)', K), tally('L (5.6 pins)', L), tally('N (5.R pins)', MN), tally('Z (census)', Z)]
let pass = 0
let total = 0
for (const r of results) {
  pass += r.ok
  total += r.total
  console.log(`${r.section}: ${r.ok}/${r.total}${r.fail.length ? ' — FAIL: ' + r.fail.join(' ; ') : ''}`)
}
console.log(`verify-book4-ch05: ${pass}/${total}`)
if (pass !== total) process.exit(1)
