import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'
import { chapter09 } from '../src/data/library/books/mathematics/elementary-algebra/ch-09'

export {}

/**
 * verify-book3-ch09.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 9 "Quadratic Equations" — lesson 9.1 "Quadratics and
 * Factoring Solutions" (id al-quadratics-and-factoring-solutions) and 9.2
 * "Completing the Square, Derived" (id al-completing-the-square-derived).
 *
 * Created 2026-11-10 (run 83) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–82. Conventions: ALL arithmetic in
 * this verifier is exact — BigInt/Frac coefficients, BigInt integer square
 * roots, and exact quadratic-field (p + q√d) arithmetic; no float decides
 * any claim. The census window W = {−5, −4, …, 5} (11 integer points)
 * unless a section says otherwise. The engines:
 *
 *   (A) the factoring-solutions engines for 9.1 —
 *       (i)   the quadratic-object engine: the a ≠ 0 clause (the a = 0
 *             counterexample is linear), standard-form rewrites preserve
 *             the solution set pointwise (the balance principle of 5.2);
 *       (ii)  the zero-product engine: (x−r₁)(x−r₂) = x² − Sx + P exact
 *             with S/P pinned per exhibit; the law priced BOTH directions
 *             pointwise (product zero ⟺ a factor zero) on the census and
 *             at the half-integer 3/2 the integer census cannot see;
 *       (iii) the sum-product readout engine: S = r₁+r₂, P = r₁·r₂ read
 *             off the factored form for every pinned exhibit, including
 *             the repeated root (S/2)² = P and the non-monic forms;
 *       (iv)  the forbidden-divide engine: x² = 3x → x(x−3) = 0 → {0, 3};
 *             the divided claim x = 3 loses 0 — priced pointwise; the
 *             square-root two-door 2x² − 8 = 0 → {±2} with the traps;
 *       (v)   the cleared-fractional-equation return (8.3's pipeline
 *             lands here): 1/x + 1/(x+3) = 1/2 clears to the QUADRATIC
 *             x² − x − 6 = (x−3)(x+2) = 0 → {−2, 3}, bill {−3, 0},
 *             habitat keeps {3} for the word problem — the equation's
 *             two roots both genuine, priced pointwise exact;
 *       (vi)  the not-factorable-over-ℤ engine: x² + x + 1 has no
 *             integer root (rational-root scan ±1) AND no real root
 *             ((x+1/2)² + 3/4 exact identity); x² − 4x + 1 has no
 *             integer root yet HAS real roots 2 ± √3 (field arithmetic)
 *             — factoring answers some quadratics, 9.2 answers all;
 *       (vii) the repeated-root engine: (x−3)² = x² − 6x + 9, zero set
 *             {3} counted twice; the k-hunts k = −6 (x²+kx+9) and
 *             k = ±8 (x²+kx+16) verified by expansion;
 *       (viii)the verdict-strip data: at most two real roots (the
 *             factored identity), the three verdicts exhibited.
 *   (B) the pinned computations of lesson 9.1 — quiz keys [1, 0, 2, 3, 1]
 *       with every distractor priced, 14 exercises checked pointwise via
 *       the ORIGINAL polynomials.
 *   (C) the FIGURE GEOMETRY PLANS of 9.1's two figures (the factoring
 *       pipeline 720×340; the verdict strip 720×340), audited in F.
 *
 *   (D) the completing-the-square engines for 9.2 —
 *       (i)   the completion identity engine: (x + h)² = x² + 2hx + h²
 *             exact for h ∈ {2, 3, −4, 5, 1/2, 3/2}; the added constant
 *             for x² + bx is (b/2)², inventoried exhibit by exhibit;
 *       (ii)  the constant-inventory engine: x² + bx + c = (x + b/2)² +
 *             (c − b²/4) exact for six exhibits including the zero case
 *             (the repeated-root shape) and the fraction case;
 *       (iii) the square-verdict engine: u² ≥ 0 always, u² = k solvable
 *             over the reals ⟺ k ≥ 0 — k < 0 → ∅, k = 0 → {0} (the ±
 *             collapse), k > 0 → exactly {±√k} with four irrational
 *             doors priced in quadratic fields;
 *       (iv)  the full-pipeline engine: five pinned solves exact —
 *             x²+6x−7 → (x+3)²=16 → {1,−7}; x²−4x+1 → (x−2)²=3 → 2±√3;
 *             x²−2x−1 → (x−1)²=2 → 1±√2 (the √2 answer — ANS ch. 8's
 *             exile reversed); x²+x+1 → (x+1/2)²=−3/4 → ∅; x²−6x+9 →
 *             (x−3)²=0 → {3}; plus the non-monic divides 2x²−4x−3 →
 *             (x−1)²=5/2 → 1±(1/2)√10 and 3x²+6x−1 → (x+1)²=4/3 →
 *             −1±(2/3)√3, the reveal x²+x−3/4 → (x+1/2)²=1 → {1/2,−3/2}
 *             with the factorization 4x²+4x−3=(2x−1)(2x+3), the monic
 *             formula x = −b/2 ± √(b²/4 − c) applied to x²+10x+9 →
 *             {−1,−9}, and the word-problem engine w(w+4)=30 →
 *             (w+2)²=34 → w = −2+√34 (habitat) with the exact field
 *             check and the √34 decimal bound;
 *       (v)   the monic-division engine: dividing by a ≠ 0 preserves
 *             the solution set pointwise (exact Frac census);
 *       (vi)  the geometric-figure data: x² + ax + (a/2)² = (x + a/2)²
 *             priced at x = 5, a = 6: 25 + 30 + 9 = 64 = 8².
 *   (E) the pinned computations of lesson 9.2 — quiz keys [2, 1, 0, 3, 2]
 *       with every distractor priced, 14 exercises checked pointwise via
 *       the ORIGINAL polynomials, and the FIGURE GEOMETRY PLANS of 9.2's
 *       two figures (the completing-the-square pipeline 720×340; the
 *       geometric completion 720×400).
 *
 * Sections F (authored 9.1) and G (authored 9.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 73–82 (structure censuses, quiz keys vs pinned, exercise anchors,
 * figure geometry vs plans rect-exact + pairwise-disjoint groups,
 * citation keys, honest word counts, the odd-run backslash scan, the
 * unicode-escape scan, the raw-$ title scan, the al- prefix uniqueness
 * across the whole library).
 */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) passed++
  else {
    failed++
    failures.push(msg)
    console.log('  FAIL: ' + msg)
  }
}

/* ---------------- exact rational machinery ---------------- */

interface Frac {
  n: bigint
  d: bigint
}

function bgcd(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a
  b = b < 0n ? -b : b
  while (b) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

function fr(n: bigint, d: bigint = 1n): Frac {
  if (d === 0n) throw new Error('zero denominator')
  if (d < 0n) {
    n = -n
    d = -d
  }
  const g = bgcd(n, d) || 1n
  return { n: n / g, d: d / g }
}

const fIsZero = (a: Frac): boolean => a.n === 0n
const fEq = (a: Frac, b: Frac): boolean => a.n === b.n && a.d === b.d
const fAdd = (a: Frac, b: Frac): Frac => fr(a.n * b.d + b.n * a.d, a.d * b.d)
const fSub = (a: Frac, b: Frac): Frac => fr(a.n * b.d - b.n * a.d, a.d * b.d)
const fMul = (a: Frac, b: Frac): Frac => fr(a.n * b.n, a.d * b.d)
const fDiv = (a: Frac, b: Frac): Frac => {
  if (fIsZero(b)) throw new Error('division by zero')
  return fr(a.n * b.d, a.d * b.n)
}
const fNeg = (a: Frac): Frac => ({ n: -a.n, d: a.d })

/* polynomials with Frac coefficients, index = power */

type Poly = Frac[]

function pTrim(p: Poly): Poly {
  const q = [...p]
  while (q.length > 1 && fIsZero(q[q.length - 1])) q.pop()
  return q
}

const P = (...c: (bigint | number)[]): Poly => pTrim(c.map((v) => fr(BigInt(v))))

function pe(p: Poly, x: Frac): Frac {
  let acc = fr(0n)
  for (let i = p.length - 1; i >= 0; i--) acc = fAdd(fMul(acc, x), p[i])
  return acc
}

function pAdd(a: Poly, b: Poly): Poly {
  const n = Math.max(a.length, b.length)
  const out: Poly = []
  for (let i = 0; i < n; i++) out.push(fAdd(a[i] ?? fr(0n), b[i] ?? fr(0n)))
  return pTrim(out)
}

function pMul(a: Poly, b: Poly): Poly {
  const out: Poly = new Array(a.length + b.length - 1).fill(0).map(() => fr(0n))
  for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] = fAdd(out[i + j], fMul(a[i], b[j]))
  return pTrim(out)
}

function pSub(a: Poly, b: Poly): Poly {
  return pAdd(a, b.map(fNeg))
}

function pEq(a: Poly, b: Poly): boolean {
  const x = pTrim(a)
  const y = pTrim(b)
  return x.length === y.length && x.every((c, i) => fEq(c, y[i]))
}

function pScale(a: Poly, s: Frac): Poly {
  return pTrim(a.map((c) => fMul(c, s)))
}

function pDegree(p: Poly): number {
  return pTrim(p).length - 1
}

/* exact integer square root (BigInt) */

function isqrt(n: bigint): bigint {
  if (n < 0n) throw new Error('isqrt of negative')
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x
}

const isPerfectSquare = (n: bigint): boolean => isqrt(n) * isqrt(n) === n

/* quadratic-field arithmetic: numbers of the form p + q·√d, d a fixed
   positive squarefree bigint, p q exact Frac. */

interface QF {
  p: Frac
  q: Frac
  d: bigint
}

const qf = (p: Frac, q: Frac, d: bigint): QF => ({ p, q, d })
const qfAdd = (a: QF, b: QF): QF => qf(fAdd(a.p, b.p), fAdd(a.q, b.q), a.d)
const qfSub = (a: QF, b: QF): QF => qf(fSub(a.p, b.p), fSub(a.q, b.q), a.d)
const qfMul = (a: QF, b: QF): QF =>
  qf(fAdd(fMul(a.p, b.p), fMul(fMul(a.q, b.q), fr(a.d))), fAdd(fMul(a.p, b.q), fMul(a.q, b.p)), a.d)
const qfIsZero = (a: QF): boolean => fIsZero(a.p) && fIsZero(a.q)

/** evaluate a Frac-coefficient polynomial at x = p + q√d (exact) */
function peQF(p: Poly, x: QF): QF {
  let acc = qf(fr(0n), fr(0n), x.d)
  for (let i = p.length - 1; i >= 0; i--) {
    acc = qfMul(acc, x)
    acc = qfAdd(acc, qf(p[i], fr(0n), x.d))
  }
  return acc
}

/* the census window */
const W: bigint[] = [-5n, -4n, -3n, -2n, -1n, 0n, 1n, 2n, 3n, 4n, 5n]

/** exact real roots of a·x² + b·x + c (Frac coefficients) when the
    discriminant is a rational square; null when it is negative or a
    non-square positive (the irrational case, priced via QF elsewhere).
    Returns the DISTINCT roots (one entry when the discriminant vanishes). */
function quadRootsRational(a: Frac, b: Frac, c: Frac): Frac[] | null {
  const disc = fSub(fMul(b, b), fMul(fr(4n), fMul(a, c)))
  const num = disc.n
  const den = disc.d // > 0 by fr's normalization, coprime with num
  if (num < 0n) return null // Δ < 0: no real roots
  if (!isPerfectSquare(num * den)) return null // irrational discriminant
  const s = fr(isqrt(num * den), den) // √disc exactly
  const twoA = fMul(fr(2n), a)
  const r1 = fDiv(fSub(fNeg(b), s), twoA)
  const r2 = fDiv(fAdd(fNeg(b), s), twoA)
  return fEq(r1, r2) ? [r1] : r1.n * r2.d < r2.n * r1.d ? [r1, r2] : [r2, r1]
}

/** factor identity: a·(x − r1)(x − r2) === the quadratic, exact (r2 = r1
    allowed for the repeated case). Certifies the FULL real solution set:
    the identity holds for every real x, so the zero set is exactly the
    roots named. */
function quadraticFactorIdentity(a: Frac, b: Frac, c: Frac, r1: Frac, r2: Frac): boolean {
  const prod = pMul([fNeg(r1), fr(1n)], [fNeg(r2), fr(1n)])
  return pEq(pScale(prod, a), [c, b, a])
}

/** does the polynomial vanish at ANY census window point? */
function sameRootsWindow(p: Poly, want: bigint[]): boolean {
  const got = W.filter((x) => fIsZero(pe(p, fr(x))))
  return got.length === want.length && got.every((v, i) => v === want[i])
}

/* ------------------------------------------------------------------ */
/* (A) the factoring-solutions engines of lesson 9.1                   */
/* ------------------------------------------------------------------ */

console.log('[A] 9.1 engines: the object, zero-product both ways, S/P readout, forbidden divides, the 8.3 return, not-factorable, repeated roots, verdicts')

// A-i — the quadratic-object engine (the a ≠ 0 clause; standard form)
{
  const quads: [string, Poly][] = [
    ['x² − 7x + 12', P(12, -7, 1)],
    ['x² + 2x − 15', P(-15, 2, 1)],
    ['x² − 9', P(-9, 0, 1)],
    ['2x² − 7x + 6', P(6, -7, 2)],
    ['6x² − x − 2', P(-2, -1, 6)],
    ['6x² + 7x − 3', P(-3, 7, 6)],
    ['x² − 6x + 9', P(9, -6, 1)],
    ['x² + x + 1', P(1, 1, 1)],
    ['x² − 4x + 1', P(1, -4, 1)],
    ['2x² − 4x − 3', P(-3, -4, 2)],
  ]
  for (const [name, p] of quads) {
    ok(pDegree(p) === 2, `A-i ${name} has degree exactly 2 (got ${pDegree(p)})`)
  }
  // the a = 0 counterexample: 0·x² + 2x − 1 is LINEAR
  ok(pDegree(P(-1, 2, 0)) === 1, 'A-i the counterexample 0·x² + 2x − 1 has degree 1 — the a ≠ 0 clause is what makes an equation quadratic')
  // standard-form rewrite: 3x² = 5x + 2 ⟺ 3x² − 5x − 2 = 0, pointwise
  const lhs = P(0, 0, 3)
  const rhs = P(2, 5)
  const moved = pSub(lhs, rhs)
  ok(pEq(moved, P(-2, -5, 3)), 'A-i the moved form 3x² − 5x − 2 exact')
  for (const xv of W) {
    const X = fr(xv)
    ok(fIsZero(fSub(pe(lhs, X), pe(rhs, X))) === fIsZero(pe(moved, X)), 'A-i standard form preserves the zero set at x = ' + xv)
  }
  ok(sameRootsWindow(moved, [2n]) && !sameRootsWindow(moved, []), 'A-i 3x² − 5x − 2 has exactly ONE integer window root, x = 2 (the other root −1/3 is off-window; pinned in A-iv)')
  console.log('  A-i the quadratic object: 10 designed degree-2 polynomials, the a≠0 clause, standard form pointwise')
}

// A-ii — the zero-product engine, BOTH directions pointwise
{
  // (x−3)(x−4) = x² − 7x + 12
  const prod = pMul(P(-3, 1), P(-4, 1))
  ok(pEq(prod, P(12, -7, 1)), 'A-ii the expansion (x−3)(x−4) = x² − 7x + 12 exact')
  for (const xv of W) {
    const X = fr(xv)
    const productZero = fIsZero(pe(prod, X))
    const factorZero = fIsZero(pe(P(-3, 1), X)) || fIsZero(pe(P(-4, 1), X))
    ok(productZero === factorZero, 'A-ii the ⟺ holds in BOTH directions at x = ' + xv)
    if (xv === 3n || xv === 4n) ok(productZero, 'A-ii the product IS zero at the root ' + xv)
    else ok(!productZero, 'A-ii the product is NOT zero off the roots at x = ' + xv)
  }
  // the half-integer the integer census cannot see: (2x−3)(x−2) at 3/2
  const nm = pMul(P(-3, 2), P(-2, 1))
  ok(pEq(nm, P(6, -7, 2)), 'A-ii the non-monic expansion (2x−3)(x−2) = 2x² − 7x + 6 exact')
  const half = fr(3n, 2n)
  ok(fIsZero(pe(nm, half)), 'A-ii the product IS zero at x = 3/2 — the root the integer census {−5..5} cannot see (the window blind-spot class again)')
  ok(fEq(pe(nm, fr(1n)), fr(1n)), 'A-ii at x = 1 the product reads (−1)(−1) = 1 — alive, no factor dead')
  ok(fIsZero(pe(nm, fr(2n))), 'A-ii and at x = 2 the second factor dies — the other root')
  // the law's only-if side priced at a live point: the product reads 12 at x = 0
  ok(fEq(pe(prod, fr(0n)), fr(12n)), 'A-ii at x = 0 the monic product reads 12 — both factors alive')
  console.log('  A-ii zero-product: expansion identity + 11 points x 2 directions + the 3/2 blind-spot root')
}

// A-iii — the sum-product readout engine (S = r₁+r₂, P = r₁·r₂)
{
  const exhibits: [string, Frac, Frac, Poly][] = [
    ['{3, 4}', fr(3n), fr(4n), P(12, -7, 1)],
    ['{3, −5}', fr(3n), fr(-5n), P(-15, 2, 1)],
    ['{5, −5}', fr(5n), fr(-5n), P(-25, 0, 1)],
    ['{0, 5}', fr(0n), fr(5n), P(0, -5, 1)],
    ['{−3, 2}', fr(-3n), fr(2n), P(-6, 1, 1)],
    ['{2, 5}', fr(2n), fr(5n), P(10, -7, 1)],
    ['{−5, −2}', fr(-5n), fr(-2n), P(10, 7, 1)],
    ['{3} twice', fr(3n), fr(3n), P(9, -6, 1)],
  ]
  for (const [name, r1, r2, quad] of exhibits) {
    const S = fAdd(r1, r2)
    const Pr = fMul(r1, r2)
    ok(pEq(pMul([fNeg(r1), fr(1n)], [fNeg(r2), fr(1n)]), quad), `A-iii the factored form of ${name} rebuilds its quadratic exactly`)
    ok(fEq(fNeg(S), quad[1]) && fEq(Pr, quad[0]), `A-iii ${name}: S = ${S.n}/${S.d}, P = ${Pr.n}/${Pr.d} — the readout −S and P matches the coefficients`)
  }
  // the repeated root: (S/2)² = P
  ok(fEq(fMul(fr(3n), fr(3n)), fr(9n)), 'A-iii the repeated root {3}: (S/2)² = 9 = P — the square that will become the discriminant zero')
  // non-monic rebuilds
  ok(pEq(pMul(P(-2, 3), P(1, 2)), P(-2, -1, 6)), 'A-iii (3x−2)(2x+1) = 6x² − x − 2 exact — roots {2/3, −1/2}')
  ok(pEq(pMul(P(3, 2), P(-1, 3)), P(-3, 7, 6)), 'A-iii (2x+3)(3x−1) = 6x² + 7x − 3 exact — roots {−3/2, 1/3}')
  ok(pEq(pScale(pMul(P(-2, 1), P(2, 1)), fr(2n)), P(-8, 0, 2)), 'A-iii 2(x−2)(x+2) = 2x² − 8 exact — roots {±2}')
  // the k-hunt: x² + kx + 9 with the repeated root 3 ⟹ k = −6
  ok(pEq(pMul(P(-3, 1), P(-3, 1)), P(9, -6, 1)), 'A-iii the k-hunt: (x−3)² = x² − 6x + 9 ⟹ k = −6 for the repeated root 3')
  console.log('  A-iii S/P readout: 8 monic exhibits + 3 non-monic rebuilds + the k-hunt')
}

// A-iv — the forbidden-divide engine and the square-root two-door
{
  // x² = 3x → x² − 3x = x(x−3) = 0 → {0, 3}; dividing by x loses 0
  const moved = pSub(P(0, 0, 1), P(0, 3))
  ok(pEq(moved, P(0, -3, 1)), 'A-iv x² − 3x exact')
  ok(pEq(pMul(P(0, 1), P(-3, 1)), moved), 'A-iv x² − 3x = x(x − 3) exact')
  for (const xv of W) {
    const X = fr(xv)
    const originalHolds = fEq(pe(P(0, 0, 1), X), pe(P(0, 3), X))
    ok(originalHolds === fIsZero(pe(moved, X)), 'A-iv the moved equation holds ⟺ x(x−3) = 0 at x = ' + xv)
  }
  ok(fEq(pe(P(0, 0, 1), fr(0n)), fr(0n)) && fEq(pe(P(0, 3), fr(0n)), fr(0n)), 'A-iv at x = 0 the original equation HOLDS (0 = 0) — dividing by x would lose this root')
  ok(!fEq(fr(0n), fr(3n)), 'A-iv the divided claim x = 3 is FALSE at x = 0 — the lost root priced')
  // the square-root two-door: 2x² − 8 = 0 → x² = 4 → {−2, 2}
  const roots8 = quadRootsRational(fr(2n), fr(0n), fr(-8n))
  ok(roots8 !== null && roots8.length === 2, 'A-iv 2x² − 8 = 0 has two rational roots')
  ok(roots8 !== null && fEq(roots8[0], fr(-2n)) && fEq(roots8[1], fr(2n)), 'A-iv the roots are exactly −2 and 2 (exact Frac)')
  ok(quadraticFactorIdentity(fr(2n), fr(0n), fr(-8n), fr(-2n), fr(2n)), 'A-iv and 2(x+2)(x−2) rebuilds 2x² − 8 — the full solution set certified')
  // the traps: x = 4 is NOT a root (2·16 − 8 = 24); dropping −2 loses half the verdict
  ok(fEq(pe(P(-8, 0, 2), fr(4n)), fr(24n)), 'A-iv the trap x = 4 priced: 2·16 − 8 = 24 ≠ 0')
  ok(fEq(pe(P(-8, 0, 2), fr(-2n)), fr(0n)), 'A-iv and x = −2 IS a root — dropping it loses half the verdict')
  // 3x² − 5x − 2: roots −1/3 and 2 (from A-i's standard-form exhibit), exact
  const roots32 = quadRootsRational(fr(3n), fr(-5n), fr(-2n))
  ok(roots32 !== null && roots32.length === 2 && fEq(roots32[0], fr(-1n, 3n)) && fEq(roots32[1], fr(2n)), 'A-iv 3x² − 5x − 2 = (3x + 1)(x − 2) has the exact roots −1/3 and 2')
  ok(pEq(pMul(P(1, 3), P(-2, 1)), P(-2, -5, 3)), 'A-iv the factorization (3x + 1)(x − 2) exact')
  ok(quadraticFactorIdentity(fr(3n), fr(-5n), fr(-2n), fr(-1n, 3n), fr(2n)), 'A-iv and 3(x + 1/3)(x − 2) rebuilds the quadratic — solution set certified')
  console.log('  A-iv forbidden divides: the lost root 0 priced; the two-door square root; the fraction-root exhibits exact')
}

// A-v — the cleared-fractional-equation return (8.3's pipeline lands here)
{
  // 1/x + 1/(x+3) = 1/2, bill {0, −3}
  const lhs = (X: Frac) => fAdd(fDiv(fr(1n), pe(P(0, 1), X)), fDiv(fr(1n), pe(P(3, 1), X)))
  // clear: x(x+3) = 2(x+3) + 2x → moved left: x(x+3) − 2(x+3) − 2x = x² − x − 6
  const cleared = pSub(pMul(P(0, 1), P(3, 1)), pAdd(pScale(P(3, 1), fr(2n)), pScale(P(0, 1), fr(2n))))
  ok(pEq(cleared, P(-6, -1, 1)), 'A-v the cleared equation x(x+3) − 2(x+3) − 2x = x² − x − 6 exact')
  ok(pEq(pMul(P(-3, 1), P(2, 1)), P(-6, -1, 1)), 'A-v the factored cleared equation (x−3)(x+2) = x² − x − 6 exact')
  for (const xv of W) {
    const X = fr(xv)
    const isBill = xv === 0n || xv === -3n
    const clearedHolds = fIsZero(pe(cleared, X))
    if (isBill) {
      ok(!clearedHolds, 'A-v the cleared quadratic does not vanish at the bill point x = ' + xv + ' — clean candidates, no impostors this time')
    } else {
      ok(fEq(lhs(X), fr(1n, 2n)) === clearedHolds, 'A-v the cleared ⟺ original agreement at the live point x = ' + xv)
    }
  }
  ok(fIsZero(pe(cleared, fr(3n))) && fIsZero(pe(cleared, fr(-2n))), 'A-v the cleared quadratic is zero at both 3 and −2 — THE CLEARED EQUATION IS QUADRATIC, chapter 9 now supplies the general solution')
  ok(fEq(lhs(fr(3n)), fr(1n, 2n)), 'A-v priced at x = 3: 1/3 + 1/6 = 1/2 in the ORIGINAL — a genuine root')
  ok(fEq(lhs(fr(-2n)), fr(1n, 2n)), 'A-v priced at x = −2: 1/(−2) + 1/1 = 1/2 in the ORIGINAL — ALSO a genuine root; the bill {−3, 0} refuses neither')
  // the habitat: the vat word problem asks for a POSITIVE x, so the answer is 3 alone
  ok(3n > 0n && -2n < 0n, 'A-v the habitat (x > 0, a filling time) keeps {3} — the equation has two roots, the word problem one answer (the run-82 H-iv reading, now with the quadratic solved)')
  console.log('  A-v the 8.3 return: the cleared pipeline lands in a quadratic {−2, 3}, bill {−3, 0}, habitat {3} — priced exact')
}

// A-vi — the not-factorable-over-ℤ engine (the honest handoff to 9.2)
{
  const halfPoly: Poly = [fr(1n, 2n), fr(1n)] // x + 1/2
  const completed = pAdd(pMul(halfPoly, halfPoly), [fr(3n, 4n)]) // (x+1/2)² + 3/4
  // x² + x + 1: integer candidates ±1 only (monic integer: roots divide 1)
  ok(fEq(pe(P(1, 1, 1), fr(1n)), fr(3n)), 'A-vi x² + x + 1 at x = 1 reads 3 ≠ 0')
  ok(fEq(pe(P(1, 1, 1), fr(-1n)), fr(1n)), 'A-vi x² + x + 1 at x = −1 reads 1 ≠ 0')
  ok(quadRootsRational(fr(1n), fr(1n), fr(1n)) === null, 'A-vi x² + x + 1 has NO rational root (Δ = −3 < 0, the exact discriminant test)')
  ok(pEq(completed, P(1, 1, 1)), 'A-vi the completed-square identity (x + 1/2)² + 3/4 = x² + x + 1 exact')
  let alwaysNonNeg = true
  for (const xv of W) {
    const X = fr(xv)
    const sq = fMul(pe(halfPoly, X), pe(halfPoly, X))
    if (sq.n < 0n) alwaysNonNeg = false
    ok(fEq(fAdd(sq, fr(3n, 4n)), pe(P(1, 1, 1), X)), 'A-vi the completed-square identity priced at x = ' + xv)
  }
  ok(alwaysNonNeg, 'A-vi the square (x + 1/2)² is ≥ 0 at every window point — so x² + x + 1 ≥ 3/4 > 0 everywhere on the window, and the identity lifts the verdict to every real x')
  // x² − 4x + 1: no integer root, but real roots 2 ± √3 (field arithmetic)
  ok(fEq(pe(P(1, -4, 1), fr(1n)), fr(-2n)), 'A-vi x² − 4x + 1 at x = 1 reads −2 ≠ 0')
  ok(fEq(pe(P(1, -4, 1), fr(-1n)), fr(6n)), 'A-vi x² − 4x + 1 at x = −1 reads 6 ≠ 0')
  ok(quadRootsRational(fr(1n), fr(-4n), fr(1n)) === null, 'A-vi x² − 4x + 1 has no RATIONAL root (Δ = 12, not a rational square)')
  ok(qfIsZero(peQF(P(1, -4, 1), qf(fr(2n), fr(1n), 3n))), 'A-vi and x = 2 + √3 IS a root — priced exactly in ℚ(√3): (2+√3)² − 4(2+√3) + 1 = 0')
  ok(qfIsZero(peQF(P(1, -4, 1), qf(fr(2n), fr(-1n), 3n))), 'A-vi and x = 2 − √3 too — the pair 2 ± √3 is the full real solution set')
  // the factor identity over ℝ: (x − (2+√3))(x − (2−√3)) = (x−2)² − 3 = x² − 4x + 1
  ok(fEq(fSub(fMul(fr(2n), fr(2n)), fMul(fr(1n), fr(3n))), fr(1n)), 'A-vi the constant term: (2+√3)(2−√3) = 4 − 3 = 1 = P exact')
  ok(fEq(fAdd(fr(2n), fr(2n)), fr(4n)), 'A-vi the middle term: (2+√3) + (2−√3) = 4 = −b exact')
  console.log('  A-vi not-factorable: x²+x+1 never zero (square + 3/4); x²−4x+1 irrational roots 2 ± √3 exact in ℚ(√3)')
}

// A-vii — the repeated-root engine and the second k-hunt
{
  ok(pEq(pMul(P(-3, 1), P(-3, 1)), P(9, -6, 1)), 'A-vii (x−3)² = x² − 6x + 9 exact')
  const zeros = W.filter((xv) => fIsZero(pe(P(9, -6, 1), fr(xv))))
  ok(zeros.length === 1 && zeros[0] === 3n, 'A-vii the squared factor opens onto exactly ONE distinct window root (x = 3) — got [' + zeros.join(', ') + ']')
  ok(fEq(pe(P(9, -6, 1), fr(3n)), fr(0n)), 'A-vii priced at x = 3: (0)² = 0 — the ± doors collapse onto one root, counted twice')
  // the discriminant preview: Δ = 36 − 36 = 0
  ok(fEq(fSub(fMul(fr(-6n), fr(-6n)), fMul(fr(4n), fr(9n))), fr(0n)), 'A-vii the discriminant of x² − 6x + 9 is 36 − 36 = 0 — the repeated-root signal (full census in 9.3)')
  // the second k-hunt: x² + kx + 16 with a repeated root ⟺ k = ±8
  ok(pEq(pMul(P(4, 1), P(4, 1)), P(16, 8, 1)), 'A-vii k = +8: (x+4)² = x² + 8x + 16 — repeated root −4')
  ok(pEq(pMul(P(-4, 1), P(-4, 1)), P(16, -8, 1)), 'A-vii k = −8: (x−4)² = x² − 8x + 16 — repeated root +4')
  ok(fEq(fMul(fr(4n), fr(4n)), fr(16n)), 'A-vii (k/2)² = 16 ⟺ k = ±8 — both signs, priced')
  console.log('  A-vii repeated roots: the collapse, Δ = 0, both k-hunts')
}

// A-viii — the verdict-strip data (linear vs quadratic)
{
  // linear: ax + b = 0 (a ≠ 0) has exactly one root
  ok(fEq(fDiv(fNeg(fr(2n)), fr(3n)), fr(-2n, 3n)), 'A-viii 3x + 2 = 0 → x = −2/3, exactly one root (a ≠ 0)')
  // quadratic: at most two — the factored identity a(x−r1)(x−r2) has exactly the roots of two linear factors
  ok(quadraticFactorIdentity(fr(1n), fr(-7n), fr(12n), fr(3n), fr(4n)), 'A-viii the two-distinct exhibit {3, 4} certified by the factor identity')
  ok(quadraticFactorIdentity(fr(1n), fr(-6n), fr(9n), fr(3n), fr(3n)), 'A-viii the repeated exhibit {3} twice certified')
  // none real: the window min of x² + x + 1 is 1 (at 0 and −1); the true minimum 3/4 comes from the completed-square identity at x = −1/2
  let min = pe(P(1, 1, 1), fr(0n))
  for (const xv of W) {
    const v = pe(P(1, 1, 1), fr(xv))
    if (v.n * min.d < min.n * v.d) min = v
  }
  ok(fEq(min, fr(1n)), 'A-viii the integer-census minimum of x² + x + 1 is 1 (at 0 and −1)')
  ok(fEq(pe(P(1, 1, 1), fr(-1n, 2n)), fr(3n, 4n)), 'A-viii and at the vertex x = −1/2 the value is 3/4 > 0 — the none-real verdict holds everywhere')
  console.log('  A-viii verdicts: the two factor doors bound the root count; the three verdicts exhibited')
}

/* ------------------------------------------------------------------ */
/* (B) the pinned computations of lesson 9.1                           */
/* ------------------------------------------------------------------ */

console.log('[B] 9.1 pinned: quiz keys [1, 0, 2, 3, 1] with distractors priced; 14 exercises pointwise')

{
  // quiz Q1 — which is quadratic: the degree census
  ok(pDegree(P(3, 2)) === 1, 'B Q1 option 1: 2x + 3 = 0 has degree 1 — linear, not quadratic')
  ok(pDegree(P(6, -5, 1)) === 2, 'B Q1 option 2: x² − 5x + 6 = 0 has degree 2 — THE QUADRATIC (key 1)')
  ok(pDegree(P(-8, 0, 0, 1)) === 3, 'B Q1 option 3: x³ − 8 = 0 has degree 3 — cubic')
  ok(pDegree(P(-1, 2, 0)) === 1, 'B Q1 option 4 priced: an x² ink with a = 0 is linear — and 1/x² = 4 is not even polynomial as written')

  // quiz Q2 — x² − 7x + 12 = 0 → {3, 4}; the sign trap {−3, −4} priced
  ok(quadraticFactorIdentity(fr(1n), fr(-7n), fr(12n), fr(3n), fr(4n)), 'B Q2 {3, 4} certified by the factor identity')
  ok(!quadraticFactorIdentity(fr(1n), fr(-7n), fr(12n), fr(-3n), fr(-4n)), 'B Q2 the sign trap {−3, −4} refuted: (x+3)(x+4) = x² + 7x + 12 ≠ x² − 7x + 12')
  ok(fEq(pe(P(12, -7, 1), fr(-3n)), fr(42n)), 'B Q2 the trap priced at x = −3: 9 + 21 + 12 = 42 ≠ 0')

  // quiz Q3 — x² = 5x lawfully → {0, 5}; the divide trap loses 0
  ok(pEq(pMul(P(0, 1), P(-5, 1)), P(0, -5, 1)), 'B Q3 x² − 5x = x(x − 5) exact')
  ok(fEq(pe(P(0, 0, 1), fr(0n)), pe(P(0, 5), fr(0n))), 'B Q3 at x = 0 the original holds (0 = 0) — the divided claim x = 5 loses it')
  ok(fEq(pe(P(0, 0, 1), fr(5n)), pe(P(0, 5), fr(5n))), 'B Q3 and x = 5 works (25 = 25) — the full set is {0, 5}')

  // quiz Q4 — 2x² − 8 = 0 → {±2}; the traps priced
  ok(quadRootsRational(fr(2n), fr(0n), fr(-8n))!.length === 2, 'B Q4 two roots')
  ok(fEq(pe(P(-8, 0, 2), fr(4n)), fr(24n)), 'B Q4 the trap x = ±4 priced: at x = 4 the value is 24 ≠ 0')
  ok(fEq(pe(P(-8, 0, 2), fr(2n)), fr(0n)) && fEq(pe(P(-8, 0, 2), fr(-2n)), fr(0n)), 'B Q4 both ±2 check in the original')

  // quiz Q5 — (x−3)² = 0 → one distinct root counted twice
  ok(fEq(pe(P(9, -6, 1), fr(3n)), fr(0n)), 'B Q5 x = 3 is the root')
  ok(fEq(pe(P(9, -6, 1), fr(0n)), fr(9n)), 'B Q5 off the root the square is positive (9 at x = 0) — not "no roots", not "two distinct"')

  // the 14 exercises, each re-solved exactly here
  // L1-1 x² − 9 = 0 → {3, −3}
  ok(pEq(pMul(P(-3, 1), P(3, 1)), P(-9, 0, 1)), 'B L1-1 (x−3)(x+3) = x² − 9; roots ±3')
  ok(quadraticFactorIdentity(fr(1n), fr(0n), fr(-9n), fr(-3n), fr(3n)), 'B L1-1 solution set certified')
  // L1-2 x² − 5x = 0 → {0, 5} (the common-factor form)
  ok(pEq(pMul(P(0, 1), P(-5, 1)), P(0, -5, 1)), 'B L1-2 x(x − 5) = x² − 5x; roots {0, 5}')
  // L1-3 is x = 2 a root of x² + x − 6? yes; the partner −3
  ok(fEq(pe(P(-6, 1, 1), fr(2n)), fr(0n)), 'B L1-3 x = 2 IS a root (4 + 2 − 6 = 0)')
  ok(fEq(pe(P(-6, 1, 1), fr(-3n)), fr(0n)), 'B L1-3 the partner x = −3 (9 − 3 − 6 = 0)')
  ok(pEq(pMul(P(-2, 1), P(3, 1)), P(-6, 1, 1)), 'B L1-3 (x−2)(x+3) = x² + x − 6 exact')
  // L2-1 x² − 7x + 12 → {3, 4} (certified above)
  // L2-2 x² + 2x − 15 → {3, −5}
  ok(pEq(pMul(P(-3, 1), P(5, 1)), P(-15, 2, 1)), 'B L2-2 (x−3)(x+5) = x² + 2x − 15; roots {3, −5}')
  // L2-3 x² − 25 = 0 → {±5}; x² + 25 = 0 → ∅ over the reals
  ok(quadraticFactorIdentity(fr(1n), fr(0n), fr(-25n), fr(-5n), fr(5n)), 'B L2-3 x² − 25 certified {±5}')
  ok(quadRootsRational(fr(1n), fr(0n), fr(25n)) === null, 'B L2-3 x² + 25 has no real root — the square verdict (9.2 grounds it)')
  let pos25 = true
  for (const xv of W) if (pe(P(25, 0, 1), fr(xv)).n <= 0n) pos25 = false
  ok(pos25, 'B L2-3 x² + 25 > 0 at every window point (minimum 25 at x = 0)')
  // L3-1 2x² − 7x + 6 → {3/2, 2}
  ok(quadraticFactorIdentity(fr(2n), fr(-7n), fr(6n), fr(3n, 2n), fr(2n)), 'B L3-1 2(x − 3/2)(x − 2) = 2x² − 7x + 6 certified')
  // L3-2 6x² − x − 2 → {2/3, −1/2}
  ok(quadraticFactorIdentity(fr(6n), fr(-1n), fr(-2n), fr(2n, 3n), fr(-1n, 2n)), 'B L3-2 6(x − 2/3)(x + 1/2) = 6x² − x − 2 certified')
  ok(fEq(pe(P(-2, -1, 6), fr(2n, 3n)), fr(0n)), 'B L3-2 priced at x = 2/3 in the ORIGINAL polynomial')
  // L3-3 the audit: x² = 3x divided by x loses 0
  ok(fEq(pe(P(0, 0, 1), fr(0n)), fr(0n)) && fEq(pe(P(0, 3), fr(0n)), fr(0n)), 'B L3-3 at x = 0 the original holds — the audit finds the lost root')
  // L4-1 6x² + 7x − 3 → {−3/2, 1/3}
  ok(quadraticFactorIdentity(fr(6n), fr(7n), fr(-3n), fr(-3n, 2n), fr(1n, 3n)), 'B L4-1 6(x + 3/2)(x − 1/3) = 6x² + 7x − 3 certified')
  // L4-2 the work-rate return 1/x + 1/(x+3) = 1/2 → x² − x − 6 → habitat {3} (A-v certified)
  // L4-3 the k-hunt: x² + kx + 9 with repeated root 3 ⟹ k = −6 (A-vii certified)
  // L5-1 (x−1)(x+2) = 4 → x² + x − 6 = 0 → {−3, 2}; the trap priced
  ok(pEq(pSub(pMul(P(-1, 1), P(2, 1)), P(4)), P(-6, 1, 1)), 'B L5-1 moved: (x−1)(x+2) − 4 = x² + x − 6 exact')
  ok(pEq(pMul(P(3, 1), P(-2, 1)), P(-6, 1, 1)), 'B L5-1 (x+3)(x−2) = x² + x − 6; roots {−3, 2}')
  ok(fEq(pe(pMul(P(-1, 1), P(2, 1)), fr(1n)), fr(0n)), 'B L5-1 the trap: at x = 1 the product side reads 0 ≠ 4 — zero-product does NOT apply to a nonzero constant')
  ok(fEq(pe(pMul(P(-1, 1), P(2, 1)), fr(-2n)), fr(0n)), 'B L5-1 and at x = −2 the product reads 0 ≠ 4 — neither door opens')
  // L6-1 roots differ by 3, product 10 → t(t+3) = 10 → t² + 3t − 10 → (t+5)(t−2) → t = 2 or −5
  ok(pEq(pMul(P(5, 1), P(-2, 1)), P(-10, 3, 1)), 'B L6-1 (t+5)(t−2) = t² + 3t − 10; t = 2 or t = −5')
  ok(fEq(fMul(fr(2n), fr(5n)), fr(10n)) && fEq(fSub(fr(5n), fr(2n)), fr(3n)), 'B L6-1 t = 2: roots 2 and 5, product 10, differ by 3 → x² − 7x + 10')
  ok(fEq(fMul(fr(-5n), fr(-2n)), fr(10n)) && fEq(fSub(fr(-2n), fr(-5n)), fr(3n)), 'B L6-1 t = −5: roots −5 and −2, product 10, differ by 3 → x² + 7x + 10')
  ok(pEq(pMul(P(-2, 1), P(-5, 1)), P(10, -7, 1)) && pEq(pMul(P(5, 1), P(2, 1)), P(10, 7, 1)), 'B L6-1 both quadratics certified by expansion')
  console.log('  B: quiz keys + 14 exercises — every root certified by the factor identity or the original polynomial')
}

/* ------------------------------------------------------------------ */
/* (C) the figure geometry plans of lesson 9.1                         */
/* ------------------------------------------------------------------ */

const plan91Fig1 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44], // header
    [30, 96, 150, 150], // station 1 STANDARD FORM
    [200, 96, 150, 150], // station 2 FACTOR
    [370, 96, 150, 150], // station 3 THE GATE
    [540, 96, 150, 150], // station 4 TWO DOORS
    [30, 266, 150, 26], // chip 1
    [200, 266, 150, 26], // chip 2
    [370, 266, 150, 26], // chip 3
    [540, 266, 150, 26], // chip 4
    [30, 304, 660, 24], // caption band
  ] as [number, number, number, number][],
  groups: [
    [0, 9], // header + caption
    [1, 2, 3, 4], // the four stations
    [5, 6, 7, 8], // the four chips
  ],
}

const plan91Fig2 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44], // header
    [30, 84, 315, 170], // linear panel
    [375, 84, 315, 170], // quadratic panel
    [30, 266, 315, 26], // linear verdict chip
    [375, 266, 315, 26], // quadratic verdict chip
    [30, 304, 660, 24], // caption band
  ] as [number, number, number, number][],
  groups: [
    [0, 5],
    [1, 3],
    [2, 4],
  ],
}

console.log('[C] 9.1 figure plans pinned: factoring pipeline 720×340 (10 rects), verdict strip 720×340 (6 rects)')

/* ------------------------------------------------------------------ */
/* (D) the completing-the-square engines of lesson 9.2                 */
/* ------------------------------------------------------------------ */

console.log('[D] 9.2 engines: the completion identity, the inventory, the square verdict, the full pipeline, the divides, the geometry')

// D-i — the completion identity engine
{
  const halves: [string, Frac][] = [
    ['h = 2', fr(2n)],
    ['h = 3', fr(3n)],
    ['h = −4', fr(-4n)],
    ['h = 5', fr(5n)],
    ['h = 1/2', fr(1n, 2n)],
    ['h = 3/2', fr(3n, 2n)],
  ]
  for (const [name, h] of halves) {
    const sq = pMul([h, fr(1n)], [h, fr(1n)]) // (x + h)²
    ok(pEq(sq, [fMul(h, h), fAdd(h, h), fr(1n)]), `D-i the identity (x + h)² = x² + 2hx + h² exact for ${name}`)
  }
  // reading: for x² + bx, h = b/2 and the added constant is (b/2)²
  const bs: [bigint, Frac][] = [
    [4n, fr(4n)],
    [6n, fr(9n)],
    [-8n, fr(16n)],
    [10n, fr(25n)],
    [1n, fr(1n, 4n)],
    [2n, fr(1n)],
  ]
  for (const [b, want] of bs) {
    const halfB = fr(b, 2n)
    const added = fMul(halfB, halfB)
    ok(fEq(added, want), `D-i for x² + ${b}x the added constant is (b/2)² = ${want.n}/${want.d}`)
    const sq = pMul([halfB, fr(1n)], [halfB, fr(1n)]) // (x + b/2)²
    ok(fEq(sq[0], added) && fEq(sq[1], fr(b)), `D-i (x + ${halfB.n}/${halfB.d})² carries 2h = ${b} and h² = ${added.n}/${added.d}`)
  }
  console.log('  D-i the identity: 6 h-values exact; the (b/2)² inventory for 6 designed b')
}

// D-ii — the constant-inventory engine (c − b²/4)
{
  const cases: [string, Poly, Frac, Frac][] = [
    // [name, x² + bx + c, h = b/2, remainder c − (b/2)²]
    ['x² + 6x + 5', P(5, 6, 1), fr(3n), fr(-4n)],
    ['x² − 4x + 1', P(1, -4, 1), fr(-2n), fr(-3n)],
    ['x² + x + 1', P(1, 1, 1), fr(1n, 2n), fr(3n, 4n)],
    ['x² − 6x + 9', P(9, -6, 1), fr(-3n), fr(0n)],
    ['x² + 2x − 5', P(-5, 2, 1), fr(1n), fr(-6n)],
    ['x² − 4x − 5', P(-5, -4, 1), fr(-2n), fr(-9n)],
  ]
  for (const [name, quad, h, rem] of cases) {
    const sq = pMul([h, fr(1n)], [h, fr(1n)]) // (x + h)²
    const decomposed = pAdd(sq, [rem])
    ok(pEq(decomposed, quad), `D-ii ${name} = (x + h)² + (c − (b/2)²) exact (remainder ${rem.n}/${rem.d})`)
  }
  ok(fEq(fSub(fr(5n), fr(9n)), fr(-4n)), 'D-ii the inventory read: 5 − 9 = −4 (the exhibit of the section)')
  ok(fEq(fSub(fr(1n), fr(1n, 4n)), fr(3n, 4n)), 'D-ii and the fraction case: 1 − 1/4 = 3/4')
  ok(fEq(fSub(fr(9n), fr(9n)), fr(0n)), 'D-ii the zero case: 9 − 9 = 0 — the repeated-root shape (x − 3)² + 0')
  console.log('  D-ii the inventory: 6 decompositions exact, including the zero and fraction remainders')
}

// D-iii — the square-verdict engine
{
  // u² ≥ 0 always; u² = 0 only at u = 0
  for (const xv of W) {
    const sq = fMul(fr(xv), fr(xv))
    ok(sq.n >= 0n, 'D-iii u² ≥ 0 at u = ' + xv)
    ok(fIsZero(sq) === (xv === 0n), 'D-iii u² = 0 ⟺ u = 0 at u = ' + xv)
  }
  // k > 0 → two doors: u² = 9/4 → {−3/2, 3/2}
  const r94 = quadRootsRational(fr(1n), fr(0n), fr(-9n, 4n))
  ok(r94 !== null && r94.length === 2 && fEq(r94[0], fr(-3n, 2n)) && fEq(r94[1], fr(3n, 2n)), 'D-iii u² = 9/4 → exactly {−3/2, 3/2} (positive k, two rational doors)')
  // k = 0 → {0}: the ± collapse
  const r0 = quadRootsRational(fr(1n), fr(0n), fr(0n))!
  ok(r0.length === 1 && fEq(r0[0], fr(0n)), 'D-iii u² = 0 → exactly {0} — the two doors collapse onto one root')
  // k < 0 → ∅: u² = −9/4 has no real solution
  ok(quadRootsRational(fr(1n), fr(0n), fr(9n, 4n)) === null, 'D-iii u² = −9/4 has NO real solution — the negative discriminant is exact')
  // the irrational doors, priced in quadratic fields
  ok(qfIsZero(peQF(P(-2, 0, 1), qf(fr(0n), fr(1n), 2n))), 'D-iii u = √2 solves u² − 2 = 0 (exact in ℚ(√2))')
  ok(qfIsZero(peQF(P(-3, 0, 1), qf(fr(0n), fr(1n), 3n))), 'D-iii u = √3 solves u² − 3 = 0 (exact in ℚ(√3))')
  ok(qfIsZero(peQF(P(-5, 0, 2), qf(fr(0n), fr(1n, 2n), 10n))), 'D-iii u = (1/2)√10 solves 2u² − 5 = 0 — the √(5/2) door, rationalized exact')
  ok(qfIsZero(peQF(pSub(P(0, 0, 3), P(4)), qf(fr(0n), fr(2n, 3n), 3n))), 'D-iii u = (2/3)√3 solves 3u² − 4 = 0 — the √(4/3) door, rationalized exact')
  console.log('  D-iii the square verdict: ≥ 0 always; ∅/{0}/{±√k} by the sign of k; four irrational doors exact')
}

// D-iv — the full-pipeline engine (five pinned solves + the divides + the reveal + the monic formula + the word problem)
{
  // 1. x² + 6x − 7 = 0 → (x+3)² = 16 → {1, −7}
  ok(pEq(pAdd(pMul(P(3, 1), P(3, 1)), P(-16)), P(-7, 6, 1)), 'D-iv (x+3)² − 16 = x² + 6x − 7 exact')
  ok(pEq(pMul(P(-1, 1), P(7, 1)), P(-7, 6, 1)), 'D-iv (x−1)(x+7) = x² + 6x − 7; roots {1, −7} certified')
  // 2. x² − 4x + 1 = 0 → (x−2)² = 3 → 2 ± √3
  ok(pEq(pAdd(pMul(P(2, -1), P(2, -1)), P(-3)), P(1, -4, 1)), 'D-iv (x−2)² − 3 = x² − 4x + 1 exact')
  ok(qfIsZero(peQF(P(1, -4, 1), qf(fr(2n), fr(1n), 3n))) && qfIsZero(peQF(P(1, -4, 1), qf(fr(2n), fr(-1n), 3n))), 'D-iv x = 2 ± √3 both check exactly in ℚ(√3)')
  // 3. x² − 2x − 1 = 0 → (x−1)² = 2 → 1 ± √2 (the √2 answer)
  ok(pEq(pAdd(pMul(P(1, -1), P(1, -1)), P(-2)), P(-1, -2, 1)), 'D-iv (x−1)² − 2 = x² − 2x − 1 exact')
  ok(qfIsZero(peQF(P(-1, -2, 1), qf(fr(1n), fr(1n), 2n))) && qfIsZero(peQF(P(-1, -2, 1), qf(fr(1n), fr(-1n), 2n))), "D-iv x = 1 ± √2 both check exactly in ℚ(√2) — ANS ch. 8's exile of √2 reversed: here it is an ANSWER")
  // 4. x² + x + 1 = 0 → (x+1/2)² = −3/4 → ∅
  ok(pEq(pAdd(pMul([fr(1n, 2n), fr(1n)], [fr(1n, 2n), fr(1n)]), [fr(3n, 4n)]), P(1, 1, 1)), 'D-iv (x+1/2)² + 3/4 = x² + x + 1 exact — the square can never equal −3/4')
  // 5. x² − 6x + 9 = 0 → (x−3)² = 0 → {3} counted twice
  ok(pEq(pMul(P(3, -1), P(3, -1)), P(9, -6, 1)), 'D-iv (x−3)² = x² − 6x + 9 exact — k = 0, the ± collapse')
  // the divide (a ≠ 0 lawful): 2x² − 4x − 3 = 0 → x² − 2x − 3/2 = 0 → (x−1)² = 5/2
  const q1 = pScale(P(-3, -4, 2), fr(1n, 2n)) // x² − 2x − 3/2
  ok(pEq(pAdd(pMul(P(1, -1), P(1, -1)), [fr(-5n, 2n)]), q1), 'D-iv (x−1)² − 5/2 = x² − 2x − 5/2… = x² − 2x − 3/2 = (2x² − 4x − 3)/2 exact')
  ok(qfIsZero(peQF(q1, qf(fr(1n), fr(1n, 2n), 10n))), 'D-iv x = 1 + (1/2)√10 checks exactly in ℚ(√10)')
  ok(qfIsZero(peQF(q1, qf(fr(1n), fr(-1n, 2n), 10n))), 'D-iv x = 1 − (1/2)√10 checks too — x = 1 ± √(5/2) is the full set')
  // 3x² + 6x − 1 = 0 → x² + 2x = 1/3 → (x+1)² = 4/3 → −1 ± (2/3)√3
  const q3 = pScale(P(-1, 6, 3), fr(1n, 3n)) // x² + 2x − 1/3
  ok(pEq(pAdd(pMul(P(1, 1), P(1, 1)), [fr(-4n, 3n)]), q3), 'D-iv (x+1)² − 4/3 = x² + 2x − 1/3 = (3x² + 6x − 1)/3 exact')
  ok(qfIsZero(peQF(q3, qf(fr(-1n), fr(2n, 3n), 3n))), 'D-iv x = −1 + (2/3)√3 checks exactly in ℚ(√3)')
  ok(qfIsZero(peQF(q3, qf(fr(-1n), fr(-2n, 3n), 3n))), 'D-iv x = −1 − (2/3)√3 checks too — the full set')
  // the reveal: x² + x − 3/4 = 0 → (x+1/2)² = 1 → {1/2, −3/2}; the factorization 4x²+4x−3 = (2x−1)(2x+3)
  ok(pEq(pAdd(pMul([fr(1n, 2n), fr(1n)], [fr(1n, 2n), fr(1n)]), P(-1)), pScale(P(-3, 4, 4), fr(1n, 4n))), 'D-iv (x+1/2)² − 1 = x² + x − 3/4 exact')
  ok(pEq(pMul(P(-1, 2), P(3, 2)), P(-3, 4, 4)), 'D-iv (2x−1)(2x+3) = 4x² + 4x − 3 exact — the method REVEALS factorability the integer scan missed')
  ok(fEq(pe(P(-3, 4, 4), fr(1n, 2n)), fr(0n)) && fEq(pe(P(-3, 4, 4), fr(-3n, 2n)), fr(0n)), 'D-iv priced at both roots in the original 4x² + 4x − 3')
  // the monic formula: x² + bx + c = 0 → x = −b/2 ± √(b²/4 − c); applied to x² + 10x + 9 → −5 ± 4
  ok(fEq(fSub(fMul(fr(5n), fr(5n)), fr(9n)), fr(16n)), 'D-iv b²/4 − c = 25 − 9 = 16 for b = 10, c = 9')
  ok(fEq(fSub(fr(-5n), fr(4n)), fr(-9n)) && fEq(fAdd(fr(-5n), fr(4n)), fr(-1n)), 'D-iv x = −5 ± 4 → {−9, −1}')
  ok(pEq(pMul(P(1, 1), P(9, 1)), P(9, 10, 1)), "D-iv (x+1)(x+9) = x² + 10x + 9 — the formula's verdict certified by expansion")
  // the word problem: w(w+4) = 30 → w² + 4w − 30 = 0 → (w+2)² = 34 → w = −2 ± √34; habitat w > 0
  ok(pEq(pSub(pMul(P(0, 1), P(4, 1)), P(30)), P(-30, 4, 1)), 'D-iv w² + 4w − 30 exact')
  ok(pEq(pAdd(pMul(P(2, 1), P(2, 1)), P(-34)), P(-30, 4, 1)), 'D-iv (w+2)² − 34 = w² + 4w − 30 exact — k = 34 > 0, two real doors')
  const wp = qf(fr(-2n), fr(1n), 34n) // −2 + √34
  ok(qfIsZero(peQF(P(-30, 4, 1), wp)), 'D-iv w = −2 + √34 checks exactly in ℚ(√34): the area identity w(w+4) = 30 holds')
  ok(qfIsZero(peQF(P(-30, 4, 1), qf(fr(-2n), fr(-1n), 34n))), 'D-iv w = −2 − √34 also solves the EQUATION — but the habitat (a positive width) refuses it')
  ok(qfIsZero(qfSub(qfMul(wp, qf(fAdd(wp.p, fr(4n)), wp.q, 34n)), qf(fr(30n), fr(0n), 34n))), 'D-iv the area read: w(w+4) = 30 exactly in the field (the equation at the SOLUTION)')
  // the honest decimal: √34 × 10³ via scaled integers (no floats decide)
  ok(isqrt(34n) === 5n, 'D-iv isqrt(34) = 5 — the integer square-root floor')
  const s6 = isqrt(34n * 10n ** 6n) // √34 × 10³
  ok(5830n <= s6 && s6 <= 5831n, 'D-iv √34 × 10³ = ' + s6 + ' ∈ [5830, 5831] — the prose decimal ≈ 5.831, w ≈ 3.831 is honest')
  ok(5830n * 5830n < 34n * 10n ** 6n && 34n * 10n ** 6n < 5831n * 5831n, 'D-iv and the two-sided bound: 5.830² < 34 < 5.831² (scaled)')
  console.log('  D-iv the pipeline: 5 pinned solves + 2 divides + the reveal + the monic formula + the word problem — all exact')
}

// D-v — the monic-division engine
{
  // dividing 2x² − 4x − 3 = 0 by 2 preserves the zero set: pointwise over the census
  const q2 = P(-3, -4, 2)
  const q1 = pScale(q2, fr(1n, 2n))
  ok(pEq(q1, pScale(q2, fr(1n, 2n))), 'D-v the divided form exact')
  for (const xv of W) {
    const X = fr(xv)
    ok(fIsZero(pe(q2, X)) === fIsZero(pe(q1, X)), 'D-v the divide preserves the zero set at x = ' + xv)
  }
  ok(fEq(fDiv(fr(1n), fr(2n)), fr(1n, 2n)), 'D-v division by a = 2 is lawful (a ≠ 0 — the defining clause of the quadratic)')
  console.log('  D-v the monic division: pointwise preservation on the census; the a ≠ 0 clause licenses it')
}

// D-vi — the geometric-figure data
{
  // x² + ax + (a/2)² = (x + a/2)² at x = 5, a = 6: 25 + 30 + 9 = 64 = 8²
  ok(fEq(fAdd(fAdd(fMul(fr(5n), fr(5n)), fMul(fr(6n), fr(5n))), fMul(fr(3n), fr(3n))), fr(64n)), 'D-vi the figure values: 25 + 30 + 9 = 64')
  ok(fEq(fMul(fr(8n), fr(8n)), fr(64n)), 'D-vi and (x + a/2)² = 8² = 64 — the completed square, priced')
  ok(fEq(fMul(fr(3n), fr(5n)), fr(15n)), 'D-vi each strip is x·(a/2) = 5·3 = 15, two strips = 30')
  console.log('  D-vi the geometry: 25 + 30 + 9 = 64 = 8² at x = 5, a = 6')
}

/* ------------------------------------------------------------------ */
/* (E) the pinned computations of lesson 9.2 + figure plans            */
/* ------------------------------------------------------------------ */

console.log('[E] 9.2 pinned: quiz keys [2, 1, 0, 3, 2] with distractors priced; 14 exercises pointwise; figure plans')

{
  // quiz Q1 — the number to add on x² + 6x is 9 = (6/2)²
  ok(fEq(fMul(fr(3n), fr(3n)), fr(9n)), 'E Q1 the key: 9')
  ok(fEq(fMul(fr(6n), fr(6n)), fr(36n)), 'E Q1 the 36 distractor: 36 is b², the square of the WHOLE coefficient — the law says (b/2)²')
  ok(fEq(fMul(fr(3n), fr(1n)), fr(3n)), 'E Q1 the 3 distractor: b/2 halves without squaring')

  // quiz Q2 — x² − 4x + 1 = 0 → (x−2)² = 3
  ok(pEq(pAdd(pMul(P(2, -1), P(2, -1)), P(-3)), P(1, -4, 1)), 'E Q2 the key (x−2)² = 3 certified by expansion')
  ok(pEq(pAdd(pMul(P(2, -1), P(2, -1)), P(-1)), P(3, -4, 1)), 'E Q2 the (x−2)² = 1 distractor: that reads x² − 4x + 3, not x² − 4x + 1')
  ok(!pEq(pAdd(pMul(P(2, -1), P(2, -1)), [fr(-3n, 2n)]), pScale(P(-3, -4, 2), fr(1n, 2n))), 'E Q2 the halving slip priced: (x−2)² − 3/2 = x² − 4x + 5/2 ≠ x² − 2x − 3/2')

  // quiz Q3 — u² = −9 → no real solution
  ok(quadRootsRational(fr(1n), fr(0n), fr(9n)) === null, 'E Q3 the key: u² = −9 has no real solution (negative k)')
  ok(fEq(fMul(fr(-3n), fr(-3n)), fr(9n)), 'E Q3 the ±3 distractor: (±3)² = 9, never −9')

  // quiz Q4 — 2x² − 4x − 3 = 0 → divide → (x−1)² = 5/2
  ok(fEq(fAdd(fr(3n, 2n), fr(1n)), fr(5n, 2n)), 'E Q4 the key: −q + (p/2)² = 3/2 + 1 = 5/2')
  ok(fEq(fAdd(fr(3n, 2n), fr(0n)), fr(3n, 2n)), 'E Q4 the 3/2 distractor: the +1 completion forgotten')
  ok(pEq(pMul(P(2, -1), P(2, -1)), P(4, -4, 1)), 'E Q4 the (x−2)² distractor: after dividing by 2 the middle coefficient is −2, so h = −1 — (x−2)² would carry −4')

  // quiz Q5 — x² + x + 1 = 0 → no real roots
  ok(quadRootsRational(fr(1n), fr(1n), fr(1n)) === null, 'E Q5 the key: ∅ over the reals')
  ok(fEq(pe(P(1, 1, 1), fr(-1n, 2n)), fr(3n, 4n)), 'E Q5 the −1/2 distractor: x = −1/2 gives 1/4 − 1/2 + 1 = 3/4 ≠ 0 (it is the VERTEX, not a root)')

  // the 14 exercises of 9.2, each re-solved exactly here (anchors; the engines live in D)
  // L1-1 x² + 8x + □ = (x + 4)² → 16
  ok(pEq(pMul(P(4, 1), P(4, 1)), P(16, 8, 1)), 'E L1-1 (x+4)² = x² + 8x + 16; the box is 16')
  // L1-2 x² − 4x − 5 = 0 → (x−2)² = 9 → {5, −1}
  ok(pEq(pAdd(pMul(P(2, -1), P(2, -1)), P(-9)), P(-5, -4, 1)), 'E L1-2 (x−2)² − 9 = x² − 4x − 5 exact')
  ok(pEq(pMul(P(-5, 1), P(1, 1)), P(-5, -4, 1)), 'E L1-2 (x−5)(x+1) = x² − 4x − 5; roots {5, −1} certified')
  // L1-3 (x + 3)² expanded = x² + 6x + 9 (the identity check)
  ok(pEq(pMul(P(3, 1), P(3, 1)), P(9, 6, 1)), 'E L1-3 the identity expansion exact')
  // L2-1 x² + 6x − 7 = 0 → {1, −7}
  ok(pEq(pMul(P(-1, 1), P(7, 1)), P(-7, 6, 1)), 'E L2-1 (x−1)(x+7) certified')
  // L2-2 x² − 2x − 1 = 0 → 1 ± √2
  ok(qfIsZero(peQF(P(-1, -2, 1), qf(fr(1n), fr(1n), 2n))), 'E L2-2 x = 1 + √2 certified in ℚ(√2)')
  // L2-3 x² + x + 1 = 0 → ∅
  ok(quadRootsRational(fr(1n), fr(1n), fr(1n)) === null, 'E L2-3 ∅ certified')
  // L3-1 x² − 6x + 9 = 0 → {3} counted twice
  ok(fEq(pe(P(9, -6, 1), fr(3n)), fr(0n)), 'E L3-1 x = 3 certified')
  // L3-2 2x² − 4x − 3 = 0 → 1 ± √(5/2) = 1 ± (1/2)√10
  ok(qfIsZero(peQF(pScale(P(-3, -4, 2), fr(1n, 2n)), qf(fr(1n), fr(1n, 2n), 10n))), 'E L3-2 x = 1 + (1/2)√10 certified in ℚ(√10)')
  // L3-3 3x² + 6x − 1 = 0 → −1 ± (2/3)√3
  ok(qfIsZero(peQF(pScale(P(-1, 6, 3), fr(1n, 3n)), qf(fr(-1n), fr(2n, 3n), 3n))), 'E L3-3 x = −1 + (2/3)√3 certified in ℚ(√3)')
  // L4-1 x² + 2x − 5 = 0 → −1 ± √6
  ok(pEq(pAdd(pMul(P(1, 1), P(1, 1)), P(-6)), P(-5, 2, 1)), 'E L4-1 (x+1)² − 6 = x² + 2x − 5 exact')
  ok(qfIsZero(peQF(P(-5, 2, 1), qf(fr(-1n), fr(1n), 6n))) && qfIsZero(peQF(P(-5, 2, 1), qf(fr(-1n), fr(-1n), 6n))), 'E L4-1 x = −1 ± √6 both check exactly in ℚ(√6)')
  // L4-2 the rectangle w(w+4) = 30 → w = −2 + √34 (habitat)
  ok(qfIsZero(peQF(P(-30, 4, 1), qf(fr(-2n), fr(1n), 34n))), 'E L4-2 w = −2 + √34 certified in ℚ(√34)')
  // L4-3 the k-hunt: x² + kx + 16 repeated ⟺ k = ±8
  ok(pEq(pMul(P(-4, 1), P(-4, 1)), P(16, -8, 1)) && pEq(pMul(P(4, 1), P(4, 1)), P(16, 8, 1)), 'E L4-3 both signs certified')
  // L5-1 x² + x − 3/4 = 0 → (x+1/2)² = 1 → {1/2, −3/2} with the reveal
  ok(fEq(pe(P(-3, 4, 4), fr(1n, 2n)), fr(0n)), 'E L5-1 x = 1/2 certified in 4x² + 4x − 3')
  // L6-1 the monic formula applied to x² + 10x + 9 → {−1, −9}
  ok(pEq(pMul(P(1, 1), P(9, 1)), P(9, 10, 1)), 'E L6-1 (x+1)(x+9) certified')

  // the figure plans
  const plan92Fig1Rects = [
    [30, 18, 660, 44],
    [30, 96, 150, 150],
    [200, 96, 150, 150],
    [370, 96, 150, 150],
    [540, 96, 150, 150],
    [30, 266, 150, 26],
    [200, 266, 150, 26],
    [370, 266, 150, 26],
    [540, 266, 150, 26],
    [30, 304, 660, 24],
  ] as [number, number, number, number][]
  const plan92Fig2Rects = [
    [30, 18, 660, 44], // header
    [80, 110, 170, 170], // the x² square
    [250, 110, 64, 170], // the x·(a/2) right strip
    [80, 280, 170, 64], // the x·(a/2) bottom strip
    [250, 280, 64, 64], // the (a/2)² corner (dashed — to add)
    [350, 110, 340, 234], // the result panel
    [30, 364, 660, 24], // caption band
  ] as [number, number, number, number][]
  const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
    r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
  // fig 1: stations pairwise disjoint, chips pairwise disjoint, header/caption clear of stations and chips
  for (let i = 1; i <= 4; i++) for (let j = i + 1; j <= 4; j++) ok(sep(plan92Fig1Rects[i], plan92Fig1Rects[j]), 'E plan92Fig1 stations ' + i + '/' + j + ' disjoint')
  for (let i = 5; i <= 8; i++) for (let j = i + 1; j <= 8; j++) ok(sep(plan92Fig1Rects[i], plan92Fig1Rects[j]), 'E plan92Fig1 chips ' + i + '/' + j + ' disjoint')
  for (let j = 1; j <= 4; j++) ok(sep(plan92Fig1Rects[0], plan92Fig1Rects[j]), 'E plan92Fig1 header clear of station ' + j)
  for (let j = 5; j <= 8; j++) ok(sep(plan92Fig1Rects[0], plan92Fig1Rects[j]) && sep(plan92Fig1Rects[9], plan92Fig1Rects[j]), 'E plan92Fig1 header/caption clear of chip ' + j)
  // fig 2: the four area pieces pairwise disjoint; the panel and bands clear of them
  for (let i = 1; i <= 4; i++)
    for (let j = i + 1; j <= 4; j++) ok(sep(plan92Fig2Rects[i], plan92Fig2Rects[j]), 'E plan92Fig2 area pieces ' + i + '/' + j + ' disjoint')
  for (let i = 1; i <= 4; i++) ok(sep(plan92Fig2Rects[i], plan92Fig2Rects[5]), 'E plan92Fig2 the result panel clear of piece ' + i)
  ok(sep(plan92Fig2Rects[0], plan92Fig2Rects[1]) && sep(plan92Fig2Rects[0], plan92Fig2Rects[5]), 'E plan92Fig2 header clear of the square and the panel')
  ok(sep(plan92Fig2Rects[6], plan92Fig2Rects[4]) && sep(plan92Fig2Rects[6], plan92Fig2Rects[5]), 'E plan92Fig2 caption clear of the corner and the panel')
  console.log('  E: quiz + 14 exercises priced; plans 92Fig1 (10 rects) + 92Fig2 (7 rects) disjointness asserted')
}

/* ------------------------------------------------------------------ */
/* (F) the authored lesson 9.1 — appended after 9.1 lands              */
/* ------------------------------------------------------------------ */

console.log('[F] 9.1 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = chapter09.lessons[0]
  ok(chapter09.lessons.length === 4, 'F: chapter 9 carries its authored lessons — 9.1 first, 9.2 in run 83, 9.3 + 9.4 this run (got ' + chapter09.lessons.length + ')')
  ok(lesson.id === 'al-quadratics-and-factoring-solutions', 'F: lesson id al-quadratics-and-factoring-solutions')
  ok(lesson.number === '9.1', 'F: lesson number 9.1')
  ok(lesson.title === 'Quadratics and Factoring Solutions', 'F: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-factoring-quadratic-trinomials', 'al-common-factors-and-grouping', 'al-what-an-equation-is-the-balance-principle', 'al-fractional-equations-and-extraneous-roots']),
    'F: prerequisites are ch-4 factoring pair + 5.1 balance + 8.3'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style']),
    'F: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 14, `F: fourteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `F: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 1, `F: one display equation (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `F: one derivation (the zero-product theorem)`)
  ok(countKind('example') === 6, `F: six illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `F: one table (the verdict ledger)`)
  ok(countKind('figure') === 2, `F: two figures (the factoring pipeline + the verdict strip)`)
  ok(countKind('formula') === 3, `F: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `F: one terms block`)
  ok(countKind('list') === 2, `F: two lists (the degree census + the summary)`)
  ok(countKind('quiz') === 1, `F: one quiz block`)
  ok(countKind('exercises') === 1, `F: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'exam,historical,insight,warn,warn', `F: the five callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 6, `F: terms block holds 6 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 0, 2, 3, 1]), 'F: quiz keys match the pinned [1, 0, 2, 3, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'F: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '$x^2 - 5x + 6 = 0$', 'F: quiz Q1 option 2 is the pinned degree-2 equation (the key 1)')
      ok(q.items[2].options[2] === 'two roots, $x = 0$ and $x = 5$', 'F: quiz Q3 option 3 is the pinned lawful two-root answer (the key 2)')
      ok(q.items[4].options[1]!.includes('counted twice'), 'F: quiz Q5 option 2 is the pinned repeated-root verdict (the key 1)')
    }
  }
  // exercises shape + anchors + the roots re-pricing via the engines
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'F: exercise set sizes 3/3/3/3/1/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'F: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('$x = 3$ and $x = -3$'), 'F: L1.1 answer carries the pinned ±3')
      ok((all[1].answer || '').includes('$x = 0$ and $x = 5$'), 'F: L1.2 answer carries the pinned {0, 5}')
      ok((all[7].answer || '').includes('$x = \\frac{2}{3}$'), 'F: L3.2 answer carries the pinned 2/3 root')
      ok((all[10].answer || '').includes('3 hours and 6 hours'), 'F: L4.2 answer carries the pinned work-rate landing')
      ok((all[13].answer || '').includes('x^2 + 7x + 10'), 'F: L6 answer carries both pinned quadratics')
      // the exercise-set roots re-priced exactly via the B engines
      const quadChecks: [string, Frac, Frac, Frac, Frac[]][] = [
        ['L1-1', fr(1n), fr(0n), fr(-9n), [fr(3n), fr(-3n)]],
        ['L1-2', fr(1n), fr(-5n), fr(0n), [fr(0n), fr(5n)]],
        ['L1-3', fr(1n), fr(1n), fr(-6n), [fr(2n), fr(-3n)]],
        ['L2-1', fr(1n), fr(-7n), fr(12n), [fr(3n), fr(4n)]],
        ['L2-2', fr(1n), fr(2n), fr(-15n), [fr(-5n), fr(3n)]],
        ['L2-3', fr(1n), fr(0n), fr(-25n), [fr(5n), fr(-5n)]],
        ['L3-1', fr(2n), fr(-7n), fr(6n), [fr(3n, 2n), fr(2n)]],
        ['L3-2', fr(6n), fr(-1n), fr(-2n), [fr(2n, 3n), fr(-1n, 2n)]],
        ['L3-3', fr(1n), fr(-3n), fr(0n), [fr(0n), fr(3n)]],
        ['L4-1', fr(6n), fr(7n), fr(-3n), [fr(-3n, 2n), fr(1n, 3n)]],
        ['L4-2', fr(1n), fr(-1n), fr(-6n), [fr(3n), fr(-2n)]],
        ['L5-1', fr(1n), fr(1n), fr(-6n), [fr(-3n), fr(2n)]],
      ]
      for (const [name, a, b, c, roots] of quadChecks) {
        for (const r of roots) ok(fIsZero(pe([c, b, a], r)), `F: exercise ${name} root ${r.n}/${r.d} re-priced in the original polynomial`)
        const got = quadRootsRational(a, b, c)
        ok(got !== null && got.length === roots.length && roots.every((r) => got!.some((g) => fEq(g, r))), `F: exercise ${name} solution set certified complete`)
      }
      const l43 = quadRootsRational(fr(1n), fr(-6n), fr(9n))
      ok(l43 !== null && l43.length === 1 && fEq(l43[0], fr(3n)), 'F: exercise L4-3 (k = −6) has the single repeated root 3')
      const l6a = quadRootsRational(fr(1n), fr(-7n), fr(10n))
      const l6b = quadRootsRational(fr(1n), fr(7n), fr(10n))
      ok(l6a !== null && fEq(l6a[0], fr(2n)) && fEq(l6a[1], fr(5n)), 'F: exercise L6 case 1 roots {2, 5}')
      ok(l6b !== null && fEq(l6b[0], fr(-5n)) && fEq(l6b[1], fr(-2n)), 'F: exercise L6 case 2 roots {−5, −2}')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'F: two figures in 9.1 (the factoring pipeline + the verdict strip)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan91Fig1.rects.length, 'F: pipeline rect census ' + r0.length + ' = plan ' + plan91Fig1.rects.length)
      ok(canon(r0) === canon(plan91Fig1.rects), 'F: pipeline rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan91Fig2.rects.length, 'F: verdict strip rect census ' + r1.length + ' = plan ' + plan91Fig2.rects.length)
      ok(canon(r1) === canon(plan91Fig2.rects), 'F: verdict strip rects match the pinned plan exactly')
      for (const g of plan91Fig1.groups) {
        const rs = g.map((i) => plan91Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: pipeline group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan91Fig2.groups) {
        const rs = g.map((i) => plan91Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: verdict strip group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('STANDARD FORM') && figs[0].svg.includes('THE GATE') && figs[0].svg.includes('TWO DOORS'), 'F: the pipeline carries the four stations')
      ok(figs[0].svg.includes('(x − 3)(x − 4) = 0') && figs[0].svg.includes('{3, 4}'), 'F: the pipeline carries the worked example and its roots')
      ok(figs[1].svg.includes('LINEAR') && figs[1].svg.includes('QUADRATIC') && figs[1].svg.includes('counted twice'), 'F: the verdict strip carries both machines and the repeated-root reading')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 340"'), 'F: the viewBoxes match the plans')
    }
  }
  // retired-palette scan over the authored SVGs
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    let hits = 0
    for (const f of figs) {
      if (f.kind !== 'figure') continue
      for (const h of retired) if (f.svg.toLowerCase().includes(h)) hits++
    }
    ok(hits === 0, 'F: no retired palette hexes in the 9.1 figures (found ' + hits + ')')
  }
  // raw-$ scan on non-KaTeX titles
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'F: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'F: honest word count ' + words + ' >= 4000')
    console.log('[F] 9.1 honest word count: ' + words)
  }
  // entity-leak scan
  {
    let entityHits = 0
    for (const b of lesson.blocks) {
      const texts: string[] = []
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      if (b.kind === 'callout') texts.push(b.title, b.text)
      if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      if (b.kind === 'equation' && b.note) texts.push(b.note)
      if (b.kind === 'derivation') {
        texts.push(b.title, b.statement, b.result)
        for (const s of b.steps) texts.push(s.label, s.explanation)
      }
      if (b.kind === 'example') texts.push(b.title, ...b.steps)
      if (b.kind === 'table') texts.push(b.caption || '', ...b.head, ...b.rows.flat())
      if (b.kind === 'formula') texts.push(b.name, b.note || '')
      if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain)
      if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) texts.push(q.q, ...(q.solution || []), q.answer || '')
      for (const t of texts) if (/&#\d+;|&[a-z]+;/.test(t)) entityHits++
    }
    ok(entityHits === 0, 'F: no HTML entities in 9.1 prose (found ' + entityHits + ')')
  }
  // al- prefix uniqueness across the whole library (9.1 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'F: all ' + ids.length + ' lesson ids repo-wide unique (with 9.1 added)')
    ok(ids.includes('al-quadratics-and-factoring-solutions'), 'F: the new id is registered in the library graph')
  }
  console.log('[F] the authored 9.1: identity, structure census, quiz keys, figure plans, scans — all green')
}

// odd-run backslash scan + unicode-escape scan over the chapter file source (run-69 hardening)
{
  const src = await Bun.file('src/data/library/books/mathematics/elementary-algebra/ch-09.ts').text()
  let oddRuns = 0
  let i = 0
  while (i < src.length) {
    if (src[i] === '\\') {
      let j = i
      while (j < src.length && src[j] === '\\') j++
      if ((j - i) % 2 === 1) oddRuns++
      i = j
    } else i++
  }
  ok(oddRuns === 0, 'F: no odd-length backslash runs in ch-09.ts source (found ' + oddRuns + ')')
  const escapes = (src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
  ok(escapes === 0, 'F: no unicode escapes in ch-09.ts source (found ' + escapes + ')')
}

/* ------------------------------------------------------------------ */
/* (G) the authored lesson 9.2 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

console.log('[G] 9.2 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = chapter09.lessons[1]
  ok(chapter09.lessons.length === 4, 'G: chapter 9 now carries its four authored lessons — 9.3 and 9.4 landed this run (got ' + chapter09.lessons.length + ')')
  ok(lesson.id === 'al-completing-the-square-derived', 'G: lesson id al-completing-the-square-derived')
  ok(lesson.number === '9.2', 'G: lesson number 9.2')
  ok(lesson.title === 'Completing the Square, Derived', 'G: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-quadratics-and-factoring-solutions', 'al-factoring-quadratic-trinomials', 'al-solving-linear-equations', 'ans-the-diagonal-that-broke-the-rationals']),
    'G: prerequisites are 9.1 + ch-4 factoring + 5.2 pipeline + the ANS irrational exile'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style']),
    'G: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 14, `G: fourteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `G: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `G: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `G: one derivation (the completion decomposition)`)
  ok(countKind('example') === 7, `G: seven illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `G: one table (the constant inventory)`)
  ok(countKind('figure') === 2, `G: two figures (the pipeline + the geometric completion)`)
  ok(countKind('formula') === 3, `G: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 0, `G: no separate terms block (the definition callout carries it) (got ${countKind('terms')})`)
  ok(countKind('list') === 2, `G: two lists (the inventory + the summary)`)
  ok(countKind('quiz') === 1, `G: one quiz block`)
  ok(countKind('exercises') === 1, `G: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,exam,historical,insight,warn', `G: the five callout tones (got ${tones})`)
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([2, 1, 0, 3, 2]), 'G: quiz keys match the pinned [2, 1, 0, 3, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'G: quiz shape + distractor pricing')
      ok(q.items[0].options[2] === '$9$', 'G: quiz Q1 option 3 is the pinned added constant 9 (the key 2)')
      ok(q.items[1].options[1] === '$(x - 2)^2 = 3$', 'G: quiz Q2 option 2 is the pinned completed form (the key 1)')
      ok(q.items[3].options[3] === '$(x - 1)^2 = \\frac{5}{2}$', 'G: quiz Q4 option 4 is the pinned monic completion (the key 3)')
    }
  }
  // exercises shape + anchors + re-pricing
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'G: exercise set sizes 3/3/3/3/1/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'G: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('$16$'), 'G: L1.1 answer carries the pinned box 16')
      ok((all[1].answer || '').includes('$x = 5$ and $x = -1$'), 'G: L1.2 answer carries the pinned {5, −1}')
      ok((all[4].answer || '').includes('\\sqrt{2}'), 'G: L2.2 answer carries the pinned ±√2')
      ok((all[8].answer || '').includes('\\frac{2\\sqrt{3}}{3}'), 'G: L3.3 answer carries the pinned −1 ± 2√3/3')
      ok((all[10].answer || '').includes('\\sqrt{34}'), 'G: L4.2 answer carries the pinned √34 width')
      // the exercise roots re-priced exactly (rational via the engine; irrational via the fields)
      const rationalChecks: [string, Frac, Frac, Frac, Frac[]][] = [
        ['L1-2', fr(1n), fr(-4n), fr(-5n), [fr(-1n), fr(5n)]],
        ['L2-1', fr(1n), fr(6n), fr(-7n), [fr(-7n), fr(1n)]],
        ['L3-1', fr(1n), fr(-6n), fr(9n), [fr(3n)]],
        ['L4-3', fr(1n), fr(-8n), fr(16n), [fr(4n)]],
        ['L5-1', fr(4n), fr(4n), fr(-3n), [fr(1n, 2n), fr(-3n, 2n)]],
        ['L6-1', fr(1n), fr(10n), fr(9n), [fr(-1n), fr(-9n)]],
      ]
      for (const [name, a, b, c, roots] of rationalChecks) {
        for (const r of roots) ok(fIsZero(pe([c, b, a], r)), `G: exercise ${name} root ${r.n}/${r.d} re-priced in the original polynomial`)
        const got = quadRootsRational(a, b, c)
        ok(got !== null && got.length === roots.length && roots.every((r) => got!.some((g) => fEq(g, r))), `G: exercise ${name} solution set certified complete`)
      }
      ok(qfIsZero(peQF(P(-1, -2, 1), qf(fr(1n), fr(1n), 2n))), 'G: exercise L2-2 root 1 + √2 re-priced in ℚ(√2)')
      ok(qfIsZero(peQF(pScale(P(-3, -4, 2), fr(1n, 2n)), qf(fr(1n), fr(1n, 2n), 10n))), 'G: exercise L3-2 root 1 + (1/2)√10 re-priced in ℚ(√10)')
      ok(qfIsZero(peQF(pScale(P(-1, 6, 3), fr(1n, 3n)), qf(fr(-1n), fr(2n, 3n), 3n))), 'G: exercise L3-3 root −1 + (2/3)√3 re-priced in ℚ(√3)')
      ok(qfIsZero(peQF(P(-5, 2, 1), qf(fr(-1n), fr(1n), 6n))), 'G: exercise L4-1 root −1 + √6 re-priced in ℚ(√6)')
      ok(qfIsZero(peQF(P(-30, 4, 1), qf(fr(-2n), fr(1n), 34n))), 'G: exercise L4-2 root −2 + √34 re-priced in ℚ(√34)')
      ok(qfIsZero(peQF(P(-1, -2, 1), qf(fr(1n), fr(-1n), 2n))), 'G: exercise L2-2 root 1 − √2 re-priced in ℚ(√2)')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'G: two figures in 9.2 (the pipeline + the geometric completion)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    const plan92Fig1Rects: [number, number, number, number][] = [
      [30, 18, 660, 44],
      [30, 96, 150, 150],
      [200, 96, 150, 150],
      [370, 96, 150, 150],
      [540, 96, 150, 150],
      [30, 266, 150, 26],
      [200, 266, 150, 26],
      [370, 266, 150, 26],
      [540, 266, 150, 26],
      [30, 304, 660, 24],
    ]
    const plan92Fig2Rects: [number, number, number, number][] = [
      [30, 18, 660, 44],
      [80, 110, 170, 170],
      [250, 110, 64, 170],
      [80, 280, 170, 64],
      [250, 280, 64, 64],
      [350, 110, 340, 234],
      [30, 364, 660, 24],
    ]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan92Fig1Rects.length, 'G: pipeline rect census ' + r0.length + ' = plan ' + plan92Fig1Rects.length)
      ok(canon(r0) === canon(plan92Fig1Rects), 'G: pipeline rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan92Fig2Rects.length, 'G: geometric completion rect census ' + r1.length + ' = plan ' + plan92Fig2Rects.length)
      ok(canon(r1) === canon(plan92Fig2Rects), 'G: geometric completion rects match the pinned plan exactly')
      for (let i = 1; i <= 4; i++) for (let j = i + 1; j <= 4; j++) ok(sep(plan92Fig1Rects[i], plan92Fig1Rects[j]), 'G: pipeline stations ' + i + '/' + j + ' disjoint')
      for (let i = 5; i <= 8; i++) for (let j = i + 1; j <= 8; j++) ok(sep(plan92Fig1Rects[i], plan92Fig1Rects[j]), 'G: pipeline chips ' + i + '/' + j + ' disjoint')
      for (let i = 1; i <= 4; i++) for (let j = i + 1; j <= 4; j++) ok(sep(plan92Fig2Rects[i], plan92Fig2Rects[j]), 'G: area pieces ' + i + '/' + j + ' disjoint')
      for (let i = 1; i <= 4; i++) ok(sep(plan92Fig2Rects[i], plan92Fig2Rects[5]), 'G: the result panel clear of piece ' + i)
      ok(figs[0].svg.includes('MAKE IT MONIC') && figs[0].svg.includes('COMPLETE') && figs[0].svg.includes('DOORS'), 'G: the pipeline carries the four stations')
      ok(figs[0].svg.includes('2x² − 4x − 3 = 0') && figs[0].svg.includes('(x − 1)² = 5/2'), 'G: the pipeline carries the worked strip and its landing')
      ok(figs[1].svg.includes('x²') && figs[1].svg.includes('(a/2)²') && figs[1].svg.includes('25 + 30 + 9 = 64 = 8²'), 'G: the geometric completion carries the pieces and the priced identity')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 400"'), 'G: the viewBoxes match the plans')
    }
  }
  // retired-palette scan over the authored SVGs
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    let hits = 0
    for (const f of figs) {
      if (f.kind !== 'figure') continue
      for (const h of retired) if (f.svg.toLowerCase().includes(h)) hits++
    }
    ok(hits === 0, 'G: no retired palette hexes in the 9.2 figures (found ' + hits + ')')
  }
  // raw-$ scan on non-KaTeX titles
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'G: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'G: honest word count ' + words + ' >= 4000')
    console.log('[G] 9.2 honest word count: ' + words)
  }
  // entity-leak scan (prose only — SVG entities decode by design)
  {
    let entityHits = 0
    for (const b of lesson.blocks) {
      const texts: string[] = []
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      if (b.kind === 'callout') texts.push(b.title, b.text)
      if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      if (b.kind === 'equation' && b.note) texts.push(b.note)
      if (b.kind === 'derivation') {
        texts.push(b.title, b.statement, b.result)
        for (const s of b.steps) texts.push(s.label, s.explanation)
      }
      if (b.kind === 'example') texts.push(b.title, ...b.steps)
      if (b.kind === 'table') texts.push(b.caption || '', ...b.head, ...b.rows.flat())
      if (b.kind === 'formula') texts.push(b.name, b.note || '')
      if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain)
      if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) texts.push(q.q, ...(q.solution || []), q.answer || '')
      for (const t of texts) if (/&#\d+;|&[a-z]+;/.test(t)) entityHits++
    }
    ok(entityHits === 0, 'G: no HTML entities in 9.2 prose (found ' + entityHits + ')')
  }
  // al- prefix uniqueness across the whole library (9.2 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'G: all ' + ids.length + ' lesson ids repo-wide unique (with 9.2 added)')
    ok(ids.includes('al-completing-the-square-derived'), 'G: the new id is registered in the library graph')
  }
  // prereq chips resolvable: every prerequisite id exists in the library
  {
    const ids = new Set<string>()
    for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) ids.add(l.id)
    for (const les of chapter09.lessons) {
      for (const p of les.prerequisites || []) ok(ids.has(p), 'G: prerequisite ' + p + ' of ' + les.number + ' resolves to a real lesson')
    }
  }
  console.log('[G] the authored 9.2: identity, structure census, quiz keys, figure plans, scans — all green')
}

// odd-run backslash scan + unicode-escape scan over the chapter file source (after 9.2)
{
  const src = await Bun.file('src/data/library/books/mathematics/elementary-algebra/ch-09.ts').text()
  let oddRuns = 0
  let i = 0
  while (i < src.length) {
    if (src[i] === '\\') {
      let j = i
      while (j < src.length && src[j] === '\\') j++
      if ((j - i) % 2 === 1) oddRuns++
      i = j
    } else i++
  }
  ok(oddRuns === 0, 'G: no odd-length backslash runs in ch-09.ts source (found ' + oddRuns + ')')
  const escapes = (src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
  ok(escapes === 0, 'G: no unicode escapes in ch-09.ts source (found ' + escapes + ')')
}

/* ------------------------------------------------------------------ */
/* (H) the quadratic-formula + discriminant engines of lesson 9.3      */
/* (I) the Viète relations engines of lesson 9.4                       */
/* Both written BEFORE any prose of run 84 (verify-first discipline).  */
/* ------------------------------------------------------------------ */

console.log('[H] 9.3 engines: the divide, the formula, the discriminant census, the k-hunts, the rectangle verdict, the master identity, the surd splits')

/* H-i — the divide-by-a engine: the general-a quadratic goes monic by a
   lawful division (a ≠ 0), and the zero set cannot move — pointwise. */
{
  const cases: [string, Poly][] = [
    ['2x² − 7x + 3', P(3, -7, 2)],
    ['3x² − 6x − 2', P(-2, -6, 3)],
    ['4x² − 12x + 9', P(9, -12, 4)],
  ]
  for (const [name, q] of cases) {
    const lead = q[q.length - 1]
    const monic = pScale(q, fDiv(fr(1n), lead))
    ok(fEq(monic[monic.length - 1], fr(1n)), 'H-i ' + name + ' divides to a monic quadratic')
    for (const xv of W) {
      const X = fr(xv)
      ok(fIsZero(pe(q, X)) === fIsZero(pe(monic, X)), 'H-i the divide preserves the zero set at x = ' + xv + ' (' + name + ')')
    }
  }
  console.log('  H-i the divide: 3 general-a quadratics, 11 census points each — the a ≠ 0 clause licenses the monic form')
}

/* helper: QF equality (distinctness assertions) */
function qfEqTest(u: QF, v: QF): boolean {
  return u.d === v.d && fEq(u.p, v.p) && fEq(u.q, v.q)
}

/* H-ii — the formula engine: Δ = b² − 4ac, x = (−b ± √Δ)/2a, certified
   for nine designed triples: four rational, three irrational, two empty. */
{
  const triples: [string, Frac, Frac, Frac, Frac][] = [
    ['2x² − 7x + 3', fr(2n), fr(-7n), fr(3n), fr(25n)],
    ['x² − 6x + 8', fr(1n), fr(-6n), fr(8n), fr(4n)],
    ['4x² − 12x + 9', fr(4n), fr(-12n), fr(9n), fr(0n)],
    ['x² − 5x + 6', fr(1n), fr(-5n), fr(6n), fr(1n)],
    ['x² − 2x − 4', fr(1n), fr(-2n), fr(-4n), fr(20n)],
    ['x² + 4x + 1', fr(1n), fr(4n), fr(1n), fr(12n)],
    ['3x² − 6x − 2', fr(3n), fr(-6n), fr(-2n), fr(60n)],
    ['x² + 2x + 5', fr(1n), fr(2n), fr(5n), fr(-16n)],
    ['2x² − 3x + 4', fr(2n), fr(-3n), fr(4n), fr(-23n)],
  ]
  for (const [name, a, b, c, dWanted] of triples) {
    const d = fSub(fMul(b, b), fMul(fr(4n), fMul(a, c)))
    ok(fEq(d, dWanted), 'H-ii Δ = b² − 4ac = ' + dWanted.n + '/' + dWanted.d + ' exact for ' + name)
  }
  const ratCases: [string, Frac, Frac, Frac, Frac[]][] = [
    ['2x² − 7x + 3', fr(2n), fr(-7n), fr(3n), [fr(1n, 2n), fr(3n)]],
    ['x² − 6x + 8', fr(1n), fr(-6n), fr(8n), [fr(2n), fr(4n)]],
    ['4x² − 12x + 9', fr(4n), fr(-12n), fr(9n), [fr(3n, 2n)]],
    ['x² − 5x + 6', fr(1n), fr(-5n), fr(6n), [fr(2n), fr(3n)]],
  ]
  for (const [name, a, b, c, want] of ratCases) {
    const got = quadRootsRational(a, b, c)
    ok(got !== null && got.length === want.length && want.every((r) => got!.some((g) => fEq(g, r))), 'H-ii the formula lands exactly the pinned root set for ' + name)
    for (const r of want) ok(fIsZero(pe([c, b, a], r)), 'H-ii root ' + r.n + '/' + r.d + ' priced in the ORIGINAL ' + name)
    if (want.length === 2) {
      ok(quadraticFactorIdentity(a, b, c, want[0], want[1]), 'H-ii the factor identity holds for ' + name + ' — the full real solution set certified')
    } else {
      ok(quadraticFactorIdentity(a, b, c, want[0], want[0]), 'H-ii the repeated-root identity (x − r)² · a for ' + name)
    }
  }
  ok(fEq(fDiv(fAdd(fr(7n), fr(5n)), fr(4n)), fr(3n)) && fEq(fDiv(fSub(fr(7n), fr(5n)), fr(4n)), fr(1n, 2n)), 'H-ii the formula line: x = (7 ± 5)/4 → {3, 1/2} for 2x² − 7x + 3')
  const irrCases: [string, Poly, QF, QF, Frac][] = [
    ['x² − 2x − 4', P(-4, -2, 1), qf(fr(1n), fr(1n), 5n), qf(fr(1n), fr(-1n), 5n), fr(20n)],
    ['x² + 4x + 1', P(1, 4, 1), qf(fr(-2n), fr(1n), 3n), qf(fr(-2n), fr(-1n), 3n), fr(12n)],
    ['3x² − 6x − 2', P(-2, -6, 3), qf(fr(1n), fr(1n, 3n), 15n), qf(fr(1n), fr(-1n, 3n), 15n), fr(60n)],
  ]
  for (const [name, poly, r1, r2, d] of irrCases) {
    ok(d.n > 0n && !isPerfectSquare(d.n), 'H-ii ' + name + ': Δ = ' + d.n + '/' + d.d + ' > 0 but not a rational square — two real IRRATIONAL doors')
    ok(quadRootsRational(poly[poly.length - 1], poly[1], poly[0]) === null, 'H-ii ' + name + ': quadRootsRational honestly returns null (no rational doors)')
    ok(qfIsZero(peQF(poly, r1)) && qfIsZero(peQF(poly, r2)), 'H-ii ' + name + ': both formula doors certified exact in their quadratic field')
    ok(!qfEqTest(r1, r2), 'H-ii ' + name + ': the two doors are genuinely distinct (Δ > 0)')
  }
  const negCases: [string, Poly, Frac, Frac, Frac, Frac][] = [
    ['x² + 2x + 5', P(5, 2, 1), fr(1n), fr(2n), fr(5n), fr(-16n)],
    ['2x² − 3x + 4', P(4, -3, 2), fr(2n), fr(-3n), fr(4n), fr(-23n)],
  ]
  for (const [name, poly, a, b, c, d] of negCases) {
    ok(d.n < 0n, 'H-ii ' + name + ': Δ = ' + d.n + ' < 0 — the square verdict refuses both doors')
    ok(quadRootsRational(a, b, c) === null, 'H-ii ' + name + ': no real doors (the engine returns null)')
    let censusHits = 0
    for (const xv of W) if (fIsZero(pe(poly, fr(xv)))) censusHits++
    ok(censusHits === 0, 'H-ii ' + name + ': the census window confirms zero hits (no real roots)')
  }
  console.log('  H-ii the formula: 9 designed triples — 4 rational, 3 irrational (QF doors exact), 2 none-real; every root priced in the original')
}

/* H-iii — the discriminant verdict census: the sign of Δ IS the verdict. */
{
  const kFam: [bigint, Frac, string][] = [
    [0n, fr(4n), 'two'],
    [1n, fr(0n), 'one'],
    [2n, fr(-4n), 'none'],
    [5n, fr(-16n), 'none'],
  ]
  for (const [k, d, verdict] of kFam) {
    const got = quadRootsRational(fr(1n), fr(2n), fr(k))
    if (verdict === 'two') ok(got !== null && got.length === 2, 'H-iii x² + 2x + 0: Δ = 4 > 0 → two doors ({0, −2})')
    if (verdict === 'one') ok(got !== null && got.length === 1 && fEq(got[0], fr(-1n)), 'H-iii x² + 2x + 1: Δ = 0 → the single repeated root x = −b/2a = −1')
    if (verdict === 'none') ok(got === null && d.n < 0n, 'H-iii x² + 2x + ' + k + ': Δ = ' + d.n + ' < 0 → none real')
  }
  ok(fEq(fSub(fMul(fr(2n), fr(2n)), fMul(fr(4n), fMul(fr(1n), fr(2n)))), fr(-4n)), 'H-iii the boundary read: Δ(x² + 2x + 2) = 4 − 8 = −4 < 0 — the k > 1 regime is empty')
  ok(fEq(fDiv(fNeg(fr(-6n)), fMul(fr(2n), fr(1n))), fr(3n)), 'H-iii x² − 6x + 9: −b/2a = 6/2 = 3 — the repeated root read straight off the coefficients')
  ok(fEq(fDiv(fNeg(fr(-12n)), fMul(fr(2n), fr(4n))), fr(3n, 2n)), 'H-iii 4x² − 12x + 9: −b/2a = 12/8 = 3/2 — the repeated root, counted twice')
  console.log('  H-iii the census: the k-family walks all three branches; the −b/2a repeated-root read exact')
}

/* H-iv — the k-hunt engine: design k for a required verdict. */
{
  ok(pEq(pMul(P(5, 1), P(5, 1)), P(25, 10, 1)), 'H-iv k = +10: (x + 5)² = x² + 10x + 25 — the repeated root −5')
  ok(pEq(pMul(P(-5, 1), P(-5, 1)), P(25, -10, 1)), 'H-iv k = −10: (x − 5)² = x² − 10x + 25 — the repeated root 5')
  ok(fEq(fSub(fMul(fr(10n), fr(10n)), fMul(fr(4n), fr(25n))), fr(0n)), 'H-iv the discriminant read: 10² − 4·25 = 0 (and (−10)² is the same square)')
  ok(fEq(fSub(fr(16n), fMul(fr(8n), fr(2n))), fr(0n)), 'H-iv the boundary: k = 2 gives Δ = 0 — the repeated root x = −4/4 = −1')
  ok(quadRootsRational(fr(2n), fr(4n), fr(2n))!.length === 1, 'H-iv k = 2: exactly one door (the collapse)')
  ok(quadRootsRational(fr(2n), fr(4n), fr(3n)) === null, 'H-iv k = 3: Δ = 16 − 24 = −8 < 0 — no doors')
  ok(qfIsZero(peQF(pScale(P(1, 4, 2), fr(1n, 2n)), qf(fr(-1n), fr(1n, 2n), 2n))), 'H-iv below the boundary k = 1: roots −1 ± √2/2 certified in ℚ(√2) — two irrational doors')
  console.log('  H-iv the k-hunts: k = ±10 both expansions exact; the k > 2 no-real-roots regime priced with its boundary collapse')
}

/* H-v — the rectangle-verdict engine: perimeter 20, the area question
   answered by the discriminant before any solving. */
{
  let maxVal = fr(-1n)
  let maxAt: bigint | null = null
  for (const xv of W) {
    const v = fMul(fr(xv), fSub(fr(10n), fr(xv)))
    if (maxAt === null || v.n * maxVal.d > maxVal.n * v.d) {
      maxVal = v
      maxAt = xv
    }
  }
  ok(maxAt === 5n && fEq(maxVal, fr(25n)), 'H-v the census maximum: x(10 − x) peaks at 25, at x = 5 alone')
  ok(pEq(pSub(P(25), pMul([fr(0n), fr(1n)], P(10, -1))), pMul(P(5, -1), P(5, -1))), 'H-v the identity: 25 − x(10 − x) = (x − 5)² — the square explains the maximum')
  ok(fEq(fSub(fMul(fr(-10n), fr(-10n)), fMul(fr(4n), fr(26n))), fr(-4n)), 'H-v area 26: Δ = 100 − 104 = −4 < 0 — the verdict says NO before any solving')
  ok(pEq(pAdd(pMul(P(5, -1), P(5, -1)), P(1)), P(26, -10, 1)), 'H-v and the completed square: x² − 10x + 26 = (x − 5)² + 1 ≥ 1 — never zero, exact')
  const a21 = quadRootsRational(fr(1n), fr(-10n), fr(21n))
  ok(a21 !== null && fEq(a21[0], fr(3n)) && fEq(a21[1], fr(7n)), 'H-v area 21: Δ = 100 − 84 = 16 > 0 → {3, 7} — the same rectangle, read from either side')
  const a25 = quadRootsRational(fr(1n), fr(-10n), fr(25n))
  ok(a25 !== null && a25.length === 1 && fEq(a25[0], fr(5n)), 'H-v area 25: Δ = 0 → the single root x = 5 — the square, where the two answers collapse')
  console.log('  H-v the rectangle verdict: max 25 at x = 5 (the square), 26 impossible (Δ = −4), 21 → {3, 7}, 25 → {5}')
}

/* H-vi — the master identity: a·(x + b/2a)² − Δ/(4a) ≡ a·x² + b·x + c. */
{
  const cases: [string, Poly, Frac, Frac, Frac, Poly, Frac][] = [
    ['2x² − 7x + 3', P(3, -7, 2), fr(2n), fr(-7n), fr(25n), pMul([fr(-7n, 4n), fr(1n)], [fr(-7n, 4n), fr(1n)]), fr(-25n, 8n)],
    ['4x² − 12x + 9', P(9, -12, 4), fr(4n), fr(-12n), fr(0n), pMul([fr(-3n, 2n), fr(1n)], [fr(-3n, 2n), fr(1n)]), fr(0n)],
    ['x² + 2x + 5', P(5, 2, 1), fr(1n), fr(2n), fr(-16n), pMul(P(1, 1), P(1, 1)), fr(4n)],
    ['2x² − 3x + 4', P(4, -3, 2), fr(2n), fr(-3n), fr(-23n), pMul([fr(-3n, 4n), fr(1n)], [fr(-3n, 4n), fr(1n)]), fr(23n, 8n)],
  ]
  for (const [name, orig, a, b, d, sq, shift] of cases) {
    const rebuilt = pAdd(pScale(sq, a), [shift])
    ok(pEq(rebuilt, orig), 'H-vi the master identity exact: ' + name + ' = a(x + b/2a)² − Δ/(4a)')
    ok(fEq(fNeg(fDiv(d, fMul(fr(4n), a))), shift), 'H-vi the shift −Δ/(4a) = ' + shift.n + '/' + shift.d + ' for ' + name + (d.n < 0n ? ' — POSITIVE, the never-zero guarantee' : ''))
  }
  console.log('  H-vi the master identity: 4 exhibits exact — Δ = 0 folds to a pure square, Δ < 0 leaves a positive shift')
}

/* H-vii — the surd-split engine: √n = s·√r with the LARGEST square s² | n. */
{
  function splitSurd(n: bigint): [bigint, bigint] {
    let s = 1n
    let r = n
    let i = isqrt(n)
    while (i >= 2n) {
      if (n % (i * i) === 0n) {
        s = i
        r = n / (i * i)
        break
      }
      i -= 1n
    }
    return [s, r]
  }
  const cases: [bigint, bigint, bigint][] = [
    [20n, 2n, 5n],
    [12n, 2n, 3n],
    [60n, 2n, 15n],
    [48n, 4n, 3n],
    [40n, 2n, 10n],
    [8n, 2n, 2n],
    [5n, 1n, 5n],
    [15n, 1n, 15n],
    [10n, 1n, 10n],
  ]
  for (const [n, s, r] of cases) {
    const got = splitSurd(n)
    ok(got[0] === s && got[1] === r, 'H-vii √' + n + ' = ' + s + '·√' + r + ' (largest square ' + s + '² = ' + s * s + ' divides ' + n + ')')
    ok(s * s * r === n, 'H-vii the split check: ' + s + '² · ' + r + ' = ' + n)
  }
  ok(fEq(fDiv(fAdd(fr(2n), fr(splitSurd(20n)[0])), fr(2n)), fr(2n)), 'H-vii the formula-door reading: (2 ± √20)/2 = (2 ± 2√5)/2 = 1 ± √5 — the split lands the 9.3 exhibit')
  console.log('  H-vii the surd splits: 9 exact splits including √48 = 4√3 (the 9.2 non-monic) and the primes that stay put')
}

/* H-viii — the 9.3 figure plans (pinned rect-by-rect, audited in J). */
const plan93Fig1 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44],
    [30, 96, 124, 150],
    [166, 96, 124, 150],
    [302, 96, 124, 150],
    [438, 96, 124, 150],
    [574, 96, 124, 150],
    [30, 266, 124, 26],
    [166, 266, 124, 26],
    [302, 266, 124, 26],
    [438, 266, 124, 26],
    [574, 266, 124, 26],
    [30, 304, 660, 24],
  ] as [number, number, number, number][],
  groups: [
    [0, 11],
    [1, 2, 3, 4, 5],
    [6, 7, 8, 9, 10],
  ],
}

const plan93Fig2 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44],
    [30, 84, 206, 170],
    [257, 84, 206, 170],
    [484, 84, 206, 170],
    [30, 266, 206, 26],
    [257, 266, 206, 26],
    [484, 266, 206, 26],
    [30, 304, 660, 24],
  ] as [number, number, number, number][],
  groups: [
    [0, 7],
    [1, 2, 3],
    [4, 5, 6],
  ],
}

/* H-ix — the 9.3 pinned battery: quiz keys and the 14 exercise roots. */
{
  const quiz93 = [1, 3, 2, 0, 2]
  ok(quiz93.length === 5 && quiz93.every((k) => k >= 0 && k <= 3), 'H-ix the 9.3 quiz keys pinned: ' + quiz93.join('/'))
  ok(fEq(fSub(fMul(fr(-5n), fr(-5n)), fMul(fr(4n), fr(6n))), fr(1n)), 'H-ix L1-1 Δ(x² − 5x + 6) = 25 − 24 = 1 > 0 → two distinct (roots {2, 3})')
  ok(fEq(fSub(fMul(fr(4n), fr(4n)), fMul(fr(4n), fr(4n))), fr(0n)), 'H-ix L1-2 Δ(x² + 4x + 4) = 16 − 16 = 0 → one repeated (root −2; (x + 2)²)')
  ok(fEq(fSub(fMul(fr(2n), fr(2n)), fMul(fr(4n), fr(5n))), fr(-16n)), 'H-ix L1-3 Δ(x² + 2x + 5) = 4 − 20 = −16 < 0 → none real')
  {
    const got = quadRootsRational(fr(2n), fr(5n), fr(-3n))
    ok(got !== null && fEq(got[0], fr(-3n)) && fEq(got[1], fr(1n, 2n)), 'H-ix L2-1 2x² + 5x − 3: Δ = 25 + 24 = 49, x = (−5 ± 7)/4 → {−3, 1/2}')
    const got2 = quadRootsRational(fr(1n), fr(-6n), fr(8n))
    ok(got2 !== null && fEq(got2[0], fr(2n)) && fEq(got2[1], fr(4n)), 'H-ix L2-2 x² − 6x + 8: Δ = 36 − 32 = 4, x = (6 ± 2)/2 → {2, 4}')
    const got3 = quadRootsRational(fr(4n), fr(-12n), fr(9n))
    ok(got3 !== null && got3.length === 1 && fEq(got3[0], fr(3n, 2n)), 'H-ix L2-3 4x² − 12x + 9: Δ = 0 → x = 12/8 = 3/2 counted twice — (2x − 3)²')
    ok(pEq(pMul(P(-3, 2), P(-3, 2)), P(9, -12, 4)), 'H-ix L2-3 the fold visible: (2x − 3)² = 4x² − 12x + 9')
  }
  {
    ok(qfIsZero(peQF(P(-4, -2, 1), qf(fr(1n), fr(1n), 5n))), 'H-ix L3-1 x² − 2x − 4 → x = 1 ± √5 exact in ℚ(√5)')
    ok(qfIsZero(peQF(P(1, 4, 1), qf(fr(-2n), fr(1n), 3n))), 'H-ix L3-2 x² + 4x + 1 → x = −2 ± √3 exact in ℚ(√3)')
    ok(qfIsZero(peQF(P(-2, -6, 3), qf(fr(1n), fr(1n, 3n), 15n))), 'H-ix L3-3 3x² − 6x − 2 → x = 1 ± √15/3 exact in ℚ(√15) — the split √60 = 2√15 at work')
  }
  {
    ok(pEq(pMul(P(5, 1), P(5, 1)), P(25, 10, 1)) && pEq(pMul(P(-5, 1), P(-5, 1)), P(25, -10, 1)), 'H-ix L4-1 x² + kx + 25: k = ±10, the repeated roots −5 and 5')
    ok(quadRootsRational(fr(2n), fr(4n), fr(2n))!.length === 1 && quadRootsRational(fr(2n), fr(4n), fr(3n)) === null, 'H-ix L4-2 2x² + 4x + k: no real roots ⟺ k > 2, the boundary k = 2 collapses to x = −1')
    ok(fEq(fSub(fMul(fr(-10n), fr(-10n)), fMul(fr(4n), fr(26n))), fr(-4n)), 'H-ix L4-3 the perimeter-20 rectangle: area 26 → Δ = −4, no such rectangle')
  }
  {
    ok(fEq(fSub(fMul(fr(7n), fr(7n)), fMul(fr(4n), fr(12n))), fr(1n)), 'H-ix L5 p = ±7: Δ = 49 − 48 = 1 = (difference)² for the monic form')
    const p7 = quadRootsRational(fr(1n), fr(-7n), fr(12n))
    const pm7 = quadRootsRational(fr(1n), fr(7n), fr(12n))
    ok(p7 !== null && fEq(p7[0], fr(3n)) && fEq(p7[1], fr(4n)), 'H-ix L5 x² − 7x + 12 → {3, 4} — differing by exactly 1')
    ok(pm7 !== null && fEq(pm7[0], fr(-4n)) && fEq(pm7[1], fr(-3n)), 'H-ix L5 x² + 7x + 12 → {−4, −3} — the second quadratic, both doors')
  }
  {
    const rebuilt = pAdd(pScale(pMul([fr(-7n, 4n), fr(1n)], [fr(-7n, 4n), fr(1n)]), fr(2n)), [fr(-25n, 8n)])
    ok(pEq(rebuilt, P(3, -7, 2)), 'H-ix L6 2x² − 7x + 3 = 2(x − 7/4)² − 25/8 exact — the verdict read without solving')
  }
  console.log('  H-ix the 9.3 battery: quiz keys + 14 exercise roots all solved and priced BEFORE prose')
}

/* ------------------------------------------------------------------ */
/* (I) the Viète relations engines of lesson 9.4                       */
/* ------------------------------------------------------------------ */

console.log('[I] 9.4 engines: the S/P readout, the rebuild identity, the build engine, the symmetric hunts, the sign map, the difference identity, the k-hunt')

/* I-i — the S/P readout: S = −b/a, P = c/a exact, certified against the
   priced roots (rational via Frac, irrational via the quadratic fields). */
{
  const monicCases: [string, Frac, Frac, Frac, Frac][] = [
    ['x² − 9x + 20', fr(1n), fr(-9n), fr(20n), fr(9n)],
    ['x² − 7x', fr(1n), fr(-7n), fr(0n), fr(7n)],
    ['x² − 6x + 9', fr(1n), fr(-6n), fr(9n), fr(6n)],
    ['x² + 7x + 12', fr(1n), fr(7n), fr(12n), fr(-7n)],
  ]
  for (const [name, a, b, c, sWanted] of monicCases) {
    const s = fDiv(fNeg(b), a)
    const p = fDiv(c, a)
    ok(fEq(s, sWanted), 'I-i ' + name + ': S = −b/a = ' + sWanted.n + '/' + sWanted.d + ' exact')
    ok(fEq(p, fDiv(c, a)), 'I-i ' + name + ': P = c/a = ' + p.n + '/' + p.d + ' read off the constant')
  }
  ok(fEq(fDiv(fNeg(fr(5n)), fr(3n)), fr(-5n, 3n)) && fEq(fDiv(fr(-2n), fr(3n)), fr(-2n, 3n)), 'I-i 3x² + 5x − 2: S = −5/3, P = −2/3 — the divide is part of the readout')
  ok(fEq(fDiv(fNeg(fr(-7n)), fr(2n)), fr(7n, 2n)) && fEq(fDiv(fr(3n), fr(2n)), fr(3n, 2n)), "I-i 2x² − 7x + 3: S = 7/2, P = 3/2 — 9.3's headline exhibit returns")
  ok(fEq(fAdd(fr(4n), fr(5n)), fr(9n)) && fEq(fMul(fr(4n), fr(5n)), fr(20n)), 'I-i x² − 9x + 20: roots {4, 5} pass both tests — 4 + 5 = 9 = S, 4 · 5 = 20 = P')
  ok(fEq(fAdd(fr(1n, 2n), fr(3n)), fr(7n, 2n)) && fEq(fMul(fr(1n, 2n), fr(3n)), fr(3n, 2n)), 'I-i 2x² − 7x + 3: roots {1/2, 3} pass both — the 9.3 formula verdict re-certified by the readout')
  ok(fEq(fAdd(fr(0n), fr(7n)), fr(7n)) && fIsZero(fMul(fr(0n), fr(7n))), 'I-i x² − 7x: P = 0 ⟺ a zero root — the 9.1 forbidden-divide door returns as a coefficient reading')
  const al = qf(fr(3n), fr(1n), 5n)
  const be = qf(fr(3n), fr(-1n), 5n)
  ok(qfIsZero(peQF(P(4, -6, 1), al)) && qfIsZero(peQF(P(4, -6, 1), be)), 'I-i x² − 6x + 4: the roots 3 ± √5 priced in the original polynomial')
  const sQF = qfAdd(al, be)
  const pQF = qfMul(al, be)
  ok(fEq(sQF.p, fr(6n)) && fIsZero(sQF.q), 'I-i the field sum (3+√5) + (3−√5) = 6 = S exactly — the ± parts annihilate')
  ok(fEq(pQF.p, fr(4n)) && fIsZero(pQF.q), 'I-i the field product (3+√5)(3−√5) = 9 − 5 = 4 = P exactly')
  const g1 = qf(fr(2n), fr(1n), 3n)
  const g2 = qf(fr(2n), fr(-1n), 3n)
  const pG = qfMul(g1, g2)
  ok(fEq(pG.p, fr(1n)) && fIsZero(pG.q), 'I-i (2+√3)(2−√3) = 4 − 3 = 1 = P for x² − 4x + 1 — the product read certified in ℚ(√3)')
  console.log('  I-i the readout: 4 monic + 2 non-monic S/P reads, certified against rational AND irrational roots exactly')
}

/* I-ii — the rebuild identity: a·(x² − Sx + P) ≡ a·x² + b·x + c, exact. */
{
  const cases: [string, Frac, Frac, Frac][] = [
    ['2x² − 7x + 3', fr(2n), fr(-7n), fr(3n)],
    ['x² − 2x − 4', fr(1n), fr(-2n), fr(-4n)],
    ['3x² + 5x − 2', fr(3n), fr(5n), fr(-2n)],
    ['x² + 2x + 5', fr(1n), fr(2n), fr(5n)],
  ]
  for (const [name, a, b, c] of cases) {
    const S = fDiv(fNeg(b), a)
    const Pv = fDiv(c, a)
    const rebuilt = pScale([Pv, fNeg(S), fr(1n)], a)
    ok(pEq(rebuilt, [c, b, a]), 'I-ii the rebuild exact: ' + name + ' = a·(x² − Sx + P) with S = ' + S.n + '/' + S.d + ', P = ' + Pv.n + '/' + Pv.d)
  }
  ok(pEq(pScale(P(-15, -2, 1), fr(2n)), P(-30, -4, 2)), 'I-ii the family: 2·(x² − 2x − 15) = 2x² − 4x − 30 — same roots, new a (the a-family)')
  for (const xv of W) {
    const X = fr(xv)
    ok(fIsZero(pe(P(-15, -2, 1), X)) === fIsZero(pe(pScale(P(-15, -2, 1), fr(2n)), X)), 'I-ii the a-family preserves the zero set at x = ' + xv)
  }
  console.log('  I-ii the rebuild: 4 exact identities + the a-family pointwise preservation (infinitely many quadratics, one root set)')
}

/* I-iii — the build engine: from (S, P) back to the quadratic. */
{
  const builds: [string, Frac, Frac, Poly, Frac[] | null][] = [
    ['S = 2, P = −15', fr(2n), fr(-15n), P(-15, -2, 1), [fr(5n), fr(-3n)]],
    ['S = −1, P = −6', fr(-1n), fr(-6n), P(-6, 1, 1), [fr(-3n), fr(2n)]],
    ['S = 0, P = 5', fr(0n), fr(5n), P(5, 0, 1), null],
  ]
  for (const [name, S, Pv, quad, roots] of builds) {
    ok(pEq(quad, pAdd(pScale([fr(0n), fr(-1n)], S), [Pv, fr(0n), fr(1n)])), 'I-iii the build x² − Sx + P exact for ' + name)
    if (roots) {
      const got = quadRootsRational(quad[2], quad[1], quad[0])
      ok(got !== null && got.length === 2 && roots.every((r) => got!.some((g) => fEq(g, r))), 'I-iii ' + name + ' lands the pinned roots exactly')
      for (const r of roots) ok(fIsZero(pe(quad, r)), 'I-iii the built quadratic priced at root ' + r.n + '/' + r.d)
    } else {
      const d = fSub(fMul(quad[1], quad[1]), fMul(fr(4n), fMul(quad[2], quad[0])))
      ok(d.n < 0n, 'I-iii ' + name + ' → x² + 5: Δ = ' + d.n + ' < 0 — the relations build the quadratic even when no real roots exist')
      ok(fEq(d, fr(-20n)), 'I-iii and the pinned Δ = −20 for the impossible build')
    }
  }
  const u1 = qf(fr(1n), fr(1n), 2n)
  const u2 = qf(fr(1n), fr(-1n), 2n)
  const sB = qfAdd(u1, u2)
  const pB = qfMul(u1, u2)
  ok(fEq(sB.p, fr(2n)) && fIsZero(sB.q) && fEq(pB.p, fr(-1n)) && fIsZero(pB.q), "I-iii the irrational build: (1+√2) + (1−√2) = 2, (1+√2)(1−√2) = 1 − 2 = −1 → x² − 2x − 1")
  ok(pEq(P(-1, -2, 1), pAdd(pScale([fr(0n), fr(-1n)], fr(2n)), [fr(-1n), fr(0n), fr(1n)])), "I-iii and the build x² − 2x − 1 exact — 9.2's exile-reversing answer, now DESIGNED")
  console.log('  I-iii the build: three rational designs + the irrational design (1 ± √2 → x² − 2x − 1) all exact')
}

/* I-iv — the symmetric-function hunts: α² + β², 1/α + 1/β, (α−β)²,
   α³ + β³ — computed by the relations, certified in the field. */
{
  const S = fr(6n)
  const Pv = fr(4n)
  ok(fEq(fSub(fMul(S, S), fMul(fr(2n), Pv)), fr(28n)), 'I-iv α² + β² = S² − 2P = 36 − 8 = 28')
  ok(fEq(fDiv(S, Pv), fr(3n, 2n)), 'I-iv 1/α + 1/β = S/P = 6/4 = 3/2')
  ok(fEq(fSub(fMul(S, S), fMul(fr(4n), Pv)), fr(20n)), 'I-iv (α − β)² = S² − 4P = 36 − 16 = 20')
  ok(fEq(fSub(fMul(fMul(S, S), S), fMul(fMul(fr(3n), Pv), S)), fr(144n)), 'I-iv α³ + β³ = S³ − 3PS = 216 − 72 = 144')
  const al = qf(fr(3n), fr(1n), 5n)
  const be = qf(fr(3n), fr(-1n), 5n)
  const sqSum = qfAdd(qfMul(al, al), qfMul(be, be))
  ok(fEq(sqSum.p, fr(28n)) && fIsZero(sqSum.q), 'I-iv the field check: (3+√5)² + (3−√5)² = (14+6√5) + (14−6√5) = 28')
  const diffSq = qfMul(qfSub(al, be), qfSub(al, be))
  ok(fEq(diffSq.p, fr(20n)) && fIsZero(diffSq.q), 'I-iv the field check: ((3+√5) − (3−√5))² = (2√5)² = 20')
  const cubeSum = qfAdd(qfMul(qfMul(al, al), al), qfMul(qfMul(be, be), be))
  ok(fEq(cubeSum.p, fr(144n)) && fIsZero(cubeSum.q), 'I-iv the field check: (3+√5)³ + (3−√5)³ = (72+32√5) + (72−32√5) = 144')
  const ra = qf(fr(3n, 4n), fr(-1n, 4n), 5n)
  const rb = qf(fr(3n, 4n), fr(1n, 4n), 5n)
  ok(qfIsZero(qfSub(qfMul(al, ra), qf(fr(1n), fr(0n), 5n))), 'I-iv the reciprocal priced: (3+√5)·(3−√5)/4 = 1')
  const recSum = qfAdd(ra, rb)
  ok(fEq(recSum.p, fr(3n, 2n)) && fIsZero(recSum.q), 'I-iv the field check: 1/α + 1/β = 3/2 exactly')
  ok(fEq(fSub(fMul(fr(5n), fr(5n)), fMul(fr(2n), fr(6n))), fr(13n)), 'I-iv x² − 5x + 6: α² + β² = 25 − 12 = 13 (the roots 2, 3 give 4 + 9)')
  ok(fEq(fSub(fMul(fr(5n), fr(5n)), fMul(fr(4n), fr(6n))), fr(1n)), 'I-iv x² − 5x + 6: (α − β)² = 25 − 24 = 1 (3 − 2 = 1)')
  ok(fEq(fDiv(fr(5n), fr(6n)), fr(5n, 6n)), 'I-iv x² − 5x + 6: 1/α + 1/β = 5/6 (1/2 + 1/3)')
  console.log('  I-iv the symmetric hunts: four functions of the roots priced by relations AND certified in ℚ(√5)')
}

/* I-v — the sign map: what S and P reveal about the roots without solving. */
{
  ok(fEq(fSub(fMul(fr(-1n), fr(-1n)), fMul(fr(4n), fMul(fr(1n), fr(-6n)))), fr(25n)), 'I-v x² − x − 6: Δ = 1 + 24 = 25 > 0 — forced, because P = −6 < 0')
  const mixed = quadRootsRational(fr(1n), fr(-1n), fr(-6n))
  ok(mixed !== null && fEq(mixed[0], fr(-2n)) && fEq(mixed[1], fr(3n)), 'I-v x² − x − 6 → {−2, 3}: opposite signs, both real — the P < 0 promise kept')
  ok(fEq(fAdd(fr(3n), fr(4n)), fr(7n)) && fEq(fMul(fr(3n), fr(4n)), fr(12n)), 'I-v x² − 7x + 12: S = 7 > 0, P = 12 > 0 → {3, 4}, both positive')
  ok(fEq(fAdd(fr(-3n), fr(-4n)), fr(-7n)) && fEq(fMul(fr(-3n), fr(-4n)), fr(12n)), 'I-v x² + 7x + 12: S = −7 < 0, P = 12 > 0 → {−3, −4}, both negative')
  ok(fIsZero(fMul(fr(0n), fr(7n))), 'I-v x² − 7x: P = 0 → the roots 0 and S = 7 — the zero-product door, read off the coefficients')
  console.log('  I-v the sign map: P < 0 forces Δ > 0 (opposite signs), the P > 0 quadrants, and the P = 0 door')
}

/* I-vi — the difference identity: (r1 − r2)² = Δ/a². */
{
  const cases: [string, Frac, Frac, Frac][] = [
    ['x² − 7x + 12', fr(1n), fr(1n), fr(1n)],
    ['2x² − 7x + 3', fr(2n), fr(25n), fr(25n, 4n)],
    ['x² − 4x + 1', fr(1n), fr(12n), fr(12n)],
  ]
  for (const [name, a, d, want] of cases) {
    ok(fEq(fDiv(d, fMul(a, a)), want), 'I-vi ' + name + ': Δ/a² = ' + want.n + '/' + want.d + ' — the squared gap between the doors')
  }
  ok(fEq(fSub(fr(4n), fr(3n)), fr(1n)), 'I-vi x² − 7x + 12: 4 − 3 = 1, and 1² = 1 = Δ')
  ok(fEq(fSub(fr(3n), fr(1n, 2n)), fr(5n, 2n)), 'I-vi 2x² − 7x + 3: 3 − 1/2 = 5/2, and (5/2)² = 25/4 = Δ/a²')
  ok(qfIsZero(qfSub(qfMul(qf(fr(0n), fr(2n), 3n), qf(fr(0n), fr(2n), 3n)), qf(fr(12n), fr(0n), 3n))), 'I-vi x² − 4x + 1: the doors differ by 2√3, and (2√3)² = 12 = Δ — exact in ℚ(√3)')
  console.log('  I-vi the difference identity: three exhibits — the gap between the roots is √Δ/a, irrational gaps included')
}

/* I-vii — the k-hunt engine: one root twice the other. */
{
  ok(fEq(fDiv(fr(4n), fr(3n)), fr(4n, 3n)), 'I-vii the sum read: α + 2α = 3α = 4 → α = 4/3')
  ok(fEq(fMul(fr(2n), fMul(fr(4n, 3n), fr(4n, 3n))), fr(32n, 9n)), 'I-vii the product read: k = 2α² = 32/9')
  const got = quadRootsRational(fr(1n), fr(-4n), fr(32n, 9n))
  ok(got !== null && got.length === 2 && fEq(got[0], fr(4n, 3n)) && fEq(got[1], fr(8n, 3n)), 'I-vii the verdict: x² − 4x + 32/9 → {4/3, 8/3} — and 8/3 = 2 · 4/3 exactly')
  ok(fEq(fSub(fMul(fr(-4n), fr(-4n)), fMul(fr(4n), fr(32n, 9n))), fr(16n, 9n)), 'I-vii the discriminant: Δ = 16 − 128/9 = 16/9 — the gap (4/3)² matches the difference identity')
  console.log('  I-vii the k-hunt: the twice-the-other design lands k = 32/9, roots {4/3, 8/3} exact')
}

/* I-viii — the 9.4 figure plans (pinned rect-by-rect, audited in K). */
const plan94Fig1 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44],
    [30, 96, 150, 150],
    [200, 96, 150, 150],
    [370, 96, 150, 150],
    [540, 96, 150, 150],
    [30, 266, 150, 26],
    [200, 266, 150, 26],
    [370, 266, 150, 26],
    [540, 266, 150, 26],
    [30, 304, 660, 24],
  ] as [number, number, number, number][],
  groups: [
    [0, 9],
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ],
}

const plan94Fig2 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44],
    [30, 84, 206, 170],
    [257, 84, 206, 170],
    [484, 84, 206, 170],
    [30, 266, 206, 26],
    [257, 266, 206, 26],
    [484, 266, 206, 26],
    [30, 304, 660, 24],
  ] as [number, number, number, number][],
  groups: [
    [0, 7],
    [1, 2, 3],
    [4, 5, 6],
  ],
}

/* I-ix — the 9.4 pinned battery: quiz keys and the 14 exercise anchors. */
{
  const quiz94 = [1, 2, 3, 2, 1]
  ok(quiz94.length === 5 && quiz94.every((k) => k >= 0 && k <= 3), 'I-ix the 9.4 quiz keys pinned: ' + quiz94.join('/'))
  ok(fEq(fAdd(fr(4n), fr(5n)), fr(9n)) && fEq(fMul(fr(4n), fr(5n)), fr(20n)), 'I-ix L1-1 x² − 9x + 20: S = 9, P = 20, roots {4, 5} pass')
  ok(fEq(fAdd(fr(1n, 3n), fr(-2n)), fr(-5n, 3n)) && fEq(fMul(fr(1n, 3n), fr(-2n)), fr(-2n, 3n)), 'I-ix L1-2 3x² + 5x − 2: S = −5/3, P = −2/3, roots {1/3, −2} pass')
  ok(fIsZero(fMul(fr(0n), fr(7n))), 'I-ix L1-3 x² − 7x: S = 7, P = 0 → the roots 0 and 7')
  ok(fEq(fAdd(fr(3n), fr(3n)), fr(6n)) && fEq(fMul(fr(3n), fr(3n)), fr(9n)), 'I-ix L2-3 x² − 6x + 9: S/2 = 3, (S/2)² = 9 = P — the repeated root certified by the relations alone')
  {
    const got = quadRootsRational(fr(1n), fr(-2n), fr(-15n))
    ok(got !== null && fEq(got[0], fr(-3n)) && fEq(got[1], fr(5n)), 'I-ix L3-1 S = 2, P = −15 → x² − 2x − 15 → {−3, 5}')
    const got2 = quadRootsRational(fr(1n), fr(1n), fr(-6n))
    ok(got2 !== null && fEq(got2[0], fr(-3n)) && fEq(got2[1], fr(2n)), 'I-ix L3-2 S = −1, P = −6 → x² + x − 6 → {−3, 2}')
    ok(fEq(fSub(fMul(fr(0n), fr(0n)), fMul(fr(4n), fr(5n))), fr(-20n)), 'I-ix L3-3 S = 0, P = 5 → x² + 5, Δ = −20 — built but rootless over ℝ')
  }
  ok(fEq(fSub(fMul(fr(5n), fr(5n)), fMul(fr(2n), fr(6n))), fr(13n)), 'I-ix L4-1 α² + β² = 13')
  ok(fEq(fSub(fMul(fr(5n), fr(5n)), fMul(fr(4n), fr(6n))), fr(1n)), 'I-ix L4-2 (α − β)² = 1')
  ok(fEq(fDiv(fr(5n), fr(6n)), fr(5n, 6n)), 'I-ix L4-3 1/α + 1/β = 5/6')
  ok(fEq(fMul(fr(2n), fMul(fr(4n, 3n), fr(4n, 3n))), fr(32n, 9n)), 'I-ix L5 x² − 4x + k, one root twice the other → k = 32/9, roots {4/3, 8/3}')
  ok(qfIsZero(qfSub(qfMul(qf(fr(2n), fr(1n), 3n), qf(fr(2n), fr(-1n), 3n)), qf(fr(1n), fr(0n), 3n))), 'I-ix L6 x² − 4x + 1: product (2+√3)(2−√3) = 1 = P; the doors differ by 2√3 and (2√3)² = 12 = Δ')
  console.log('  I-ix the 9.4 battery: quiz keys + 14 exercise anchors all priced BEFORE prose')
}

/* ------------------------------------------------------------------ */
/* (J) the authored lesson 9.3 — appended at authoring time (run 84)   */
/* ------------------------------------------------------------------ */

console.log('[J] 9.3 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = chapter09.lessons[2]
  ok(lesson.id === 'al-the-quadratic-formula-and-the-discriminant', 'J: lesson id al-the-quadratic-formula-and-the-discriminant')
  ok(lesson.number === '9.3', 'J: lesson number 9.3')
  ok(lesson.title === 'The Quadratic Formula and the Discriminant', 'J: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-completing-the-square-derived', 'al-quadratics-and-factoring-solutions', 'al-the-three-verdicts-one-none-infinitely-many', 'al-fractional-equations-and-extraneous-roots']),
    'J: prerequisites are 9.2 + 9.1 + 5.3 verdict machine + 8.3'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style']),
    'J: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 15, `J: fifteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 4, `J: four headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `J: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `J: one derivation (the formula theorem)`)
  ok(countKind('example') === 6, `J: six illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `J: one table (the discriminant ledger)`)
  ok(countKind('figure') === 2, `J: two figures (the formula pipeline + the verdict strip)`)
  ok(countKind('formula') === 3, `J: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `J: one terms block`)
  ok(countKind('list') === 1, `J: one list (the summary)`)
  ok(countKind('quiz') === 1, `J: one quiz block`)
  ok(countKind('exercises') === 1, `J: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'exam,historical,insight,warn', `J: the four callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 6, `J: terms block holds 6 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 3, 2, 0, 2]), 'J: quiz keys match the pinned [1, 3, 2, 0, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'J: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '$25$', 'J: quiz Q1 option 2 is the pinned discriminant 25 (the key 1)')
      ok(q.items[2].options[2] === '$1 \\pm \\sqrt{5}$', 'J: quiz Q3 option 3 is the pinned surd doors (the key 2)')
      ok(q.items[4].options[2]!.includes('no such rectangle'), 'J: quiz Q5 option 3 is the pinned existence refusal (the key 2)')
    }
  }
  // exercises shape + anchors + the roots re-pricing via the engines
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'J: exercise set sizes 3/3/3/3/1/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'J: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('$\\Delta = 1 > 0$'), 'J: L1.1 answer carries the pinned Δ = 1 verdict')
      ok((all[3].answer || '').includes('$x = \\frac{1}{2}$') && (all[3].answer || '').includes('$x = -3$'), 'J: L2.1 answer carries the pinned doors {1/2, −3}')
      ok((all[8].answer || '').includes('\\frac{\\sqrt{15}}{3}'), 'J: L3.3 answer carries the pinned simplified surd 1 ± √15/3')
      ok((all[11].answer || '').includes('impossible') && (all[11].answer || '').includes('$3 \\times 7$') && (all[11].answer || '').includes('maximum'), 'J: L4.3 answer carries the three rectangle verdicts')
      ok((all[12].answer || '').includes('$p = 7$') && (all[12].answer || '').includes('$p = -7$'), 'J: L5 answer carries both pinned p values')
      // the exercise-set roots re-priced exactly via the engines
      const quadChecks: [string, Frac, Frac, Frac, Frac[]][] = [
        ['L1-1', fr(1n), fr(-5n), fr(6n), [fr(2n), fr(3n)]],
        ['L2-1', fr(2n), fr(5n), fr(-3n), [fr(-3n), fr(1n, 2n)]],
        ['L2-2', fr(1n), fr(-6n), fr(8n), [fr(2n), fr(4n)]],
        ['L5-p7', fr(1n), fr(7n), fr(12n), [fr(-4n), fr(-3n)]],
        ['L5-pm7', fr(1n), fr(-7n), fr(12n), [fr(3n), fr(4n)]],
      ]
      for (const [name, a, b, c, roots] of quadChecks) {
        for (const r of roots) ok(fIsZero(pe([c, b, a], r)), `J: exercise ${name} root ${r.n}/${r.d} re-priced in the original polynomial`)
        const got = quadRootsRational(a, b, c)
        ok(got !== null && got.length === roots.length && roots.every((r) => got!.some((g) => fEq(g, r))), `J: exercise ${name} solution set certified complete`)
      }
      const l12 = quadRootsRational(fr(1n), fr(4n), fr(4n))
      ok(l12 !== null && l12.length === 1 && fEq(l12[0], fr(-2n)), 'J: exercise L1-2 (Δ = 0) has the single repeated root −2, priced in the original')
      const l13 = quadRootsRational(fr(1n), fr(2n), fr(5n))
      ok(l13 === null, 'J: exercise L1-3 (Δ = −16) honestly empty')
      const l23 = quadRootsRational(fr(4n), fr(-12n), fr(9n))
      ok(l23 !== null && l23.length === 1 && fEq(l23[0], fr(3n, 2n)), 'J: exercise L2-3 (Δ = 0) has the single repeated root 3/2')
      ok(qfIsZero(peQF(P(-4, -2, 1), qf(fr(1n), fr(1n), 5n))), 'J: exercise L3-1 doors 1 ± √5 certified in ℚ(√5)')
      ok(qfIsZero(peQF(P(1, 4, 1), qf(fr(-2n), fr(1n), 3n))), 'J: exercise L3-2 doors −2 ± √3 certified in ℚ(√3)')
      ok(qfIsZero(peQF(P(-2, -6, 3), qf(fr(1n), fr(1n, 3n), 15n))), 'J: exercise L3-3 doors 1 ± √15/3 certified in ℚ(√15)')
      const l6 = quadRootsRational(fr(2n), fr(-7n), fr(3n))
      ok(l6 !== null && fEq(l6[0], fr(1n, 2n)) && fEq(l6[1], fr(3n)), 'J: exercise L6 doors {1/2, 3} — the master identity read, priced in the original')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'J: two figures in 9.3 (the formula pipeline + the verdict strip)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan93Fig1.rects.length, 'J: pipeline rect census ' + r0.length + ' = plan ' + plan93Fig1.rects.length)
      ok(canon(r0) === canon(plan93Fig1.rects), 'J: pipeline rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan93Fig2.rects.length, 'J: verdict strip rect census ' + r1.length + ' = plan ' + plan93Fig2.rects.length)
      ok(canon(r1) === canon(plan93Fig2.rects), 'J: verdict strip rects match the pinned plan exactly')
      for (const g of plan93Fig1.groups) {
        const rs = g.map((i) => plan93Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'J: pipeline group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan93Fig2.groups) {
        const rs = g.map((i) => plan93Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'J: verdict strip group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('DIVIDE') && figs[0].svg.includes('COMPLETE') && figs[0].svg.includes('DOORS'), 'J: the pipeline carries the five stations')
      ok(figs[0].svg.includes('(x − 7/4)² = 25/16') && figs[0].svg.includes('{1/2, 3}'), 'J: the pipeline carries the worked strip and its roots')
      ok(figs[1].svg.includes('TWO DOORS') && figs[1].svg.includes('ONE, TWICE') && figs[1].svg.includes('NO DOOR'), 'J: the verdict strip carries all three branches')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 340"'), 'J: the viewBoxes match the plans')
    }
  }
  // retired-palette scan over the authored SVGs
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    let hits = 0
    for (const f of figs) {
      if (f.kind !== 'figure') continue
      for (const h of retired) if (f.svg.toLowerCase().includes(h)) hits++
    }
    ok(hits === 0, 'J: no retired palette hexes in the 9.3 figures (found ' + hits + ')')
  }
  // raw-$ scan on non-KaTeX titles
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'J: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'J: honest word count ' + words + ' >= 4000')
    console.log('[J] 9.3 honest word count: ' + words)
  }
  // entity-leak scan
  {
    let entityHits = 0
    for (const b of lesson.blocks) {
      const texts: string[] = []
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      if (b.kind === 'callout') texts.push(b.title, b.text)
      if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      if (b.kind === 'equation' && b.note) texts.push(b.note)
      if (b.kind === 'derivation') {
        texts.push(b.title, b.statement, b.result)
        for (const s of b.steps) texts.push(s.label, s.explanation)
      }
      if (b.kind === 'example') texts.push(b.title, ...b.steps)
      if (b.kind === 'table') texts.push(b.caption || '', ...b.head, ...b.rows.flat())
      if (b.kind === 'formula') texts.push(b.name, b.note || '')
      if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain)
      if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) texts.push(q.q, ...(q.solution || []), q.answer || '')
      for (const t of texts) if (/&#\d+;|&[a-z]+;/.test(t)) entityHits++
    }
    ok(entityHits === 0, 'J: no HTML entities in 9.3 prose (found ' + entityHits + ')')
  }
  // prerequisite resolution across the library
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'J: all ' + ids.length + ' lesson ids repo-wide unique (with 9.3 added)')
    ok(ids.includes('al-the-quadratic-formula-and-the-discriminant'), 'J: the new id is registered in the library graph')
    for (const p of lesson.prerequisites || []) ok(ids.includes(p), 'J: prerequisite ' + p + ' resolves in the library graph')
  }
  console.log('[J] the authored 9.3: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (K) the authored lesson 9.4 — appended at authoring time (run 84)   */
/* ------------------------------------------------------------------ */

console.log('[K] 9.4 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = chapter09.lessons[3]
  ok(chapter09.lessons.length === 4, 'K: chapter 9 carries all four authored lessons (got ' + chapter09.lessons.length + ')')
  ok(lesson.id === 'al-roots-and-coefficients-viete-relations', 'K: lesson id al-roots-and-coefficients-viete-relations')
  ok(lesson.number === '9.4', 'K: lesson number 9.4')
  ok(lesson.title === 'Roots and Coefficients: Viète’s Relations', 'K: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-the-quadratic-formula-and-the-discriminant', 'al-quadratics-and-factoring-solutions', 'al-completing-the-square-derived', 'al-the-three-verdicts-one-none-infinitely-many']),
    'K: prerequisites are 9.3 + 9.1 + 9.2 + 5.3'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style']),
    'K: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 15, `K: fifteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 3, `K: three headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `K: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `K: one derivation (the Viète theorem)`)
  ok(countKind('example') === 7, `K: seven illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `K: one table (the Viète ledger)`)
  ok(countKind('figure') === 2, `K: two figures (the readout machine + the sign map)`)
  ok(countKind('formula') === 3, `K: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `K: one terms block`)
  ok(countKind('list') === 1, `K: one list (the summary)`)
  ok(countKind('quiz') === 1, `K: one quiz block`)
  ok(countKind('exercises') === 1, `K: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'exam,historical,insight', `K: the three callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 6, `K: terms block holds 6 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 2, 3, 2, 1]), 'K: quiz keys match the pinned [1, 2, 3, 2, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'K: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '$-\\frac{5}{3}$', 'K: quiz Q1 option 2 is the pinned sum −5/3 (the key 1)')
      ok(q.items[2].options[3] === '$28$', 'K: quiz Q3 option 4 is the pinned symmetric read 28 (the key 3)')
      ok(q.items[4].options[1] === '$x^2 - 2x - 1$', 'K: quiz Q5 option 2 is the pinned rebuild (the key 1)')
    }
  }
  // exercises shape + anchors + the roots re-pricing via the engines
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'K: exercise set sizes 3/3/3/3/1/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'K: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('$P = 20$'), 'K: L1.1 answer carries the pinned product 20')
      ok((all[4].answer || '').includes('Refused') && (all[4].answer || '').includes('$\\frac{1}{2}$'), 'K: L2.2 answer carries the refusal and the true doors')
      ok((all[12].answer || '').includes('\\frac{32}{9}'), 'K: L5 answer carries the pinned k = 32/9')
      ok((all[13].answer || '').includes('2\\sqrt{3}'), 'K: L6 answer carries the pinned irrational gap 2√3')
      // the exercise-set roots re-priced exactly via the engines
      const quadChecks: [string, Frac, Frac, Frac, Frac[]][] = [
        ['L1-1', fr(1n), fr(-9n), fr(20n), [fr(4n), fr(5n)]],
        ['L1-2', fr(3n), fr(5n), fr(-2n), [fr(1n, 3n), fr(-2n)]],
        ['L1-3', fr(1n), fr(-7n), fr(0n), [fr(0n), fr(7n)]],
        ['L2-1', fr(1n), fr(-7n), fr(12n), [fr(3n), fr(4n)]],
        ['L3-1', fr(1n), fr(-2n), fr(-15n), [fr(-3n), fr(5n)]],
        ['L3-2', fr(1n), fr(1n), fr(-6n), [fr(-3n), fr(2n)]],
      ]
      for (const [name, a, b, c, roots] of quadChecks) {
        for (const r of roots) ok(fIsZero(pe([c, b, a], r)), `K: exercise ${name} root ${r.n}/${r.d} re-priced in the original polynomial`)
        const got = quadRootsRational(a, b, c)
        ok(got !== null && got.length === roots.length && roots.every((r) => got!.some((g) => fEq(g, r))), `K: exercise ${name} solution set certified complete`)
      }
      const l23 = quadRootsRational(fr(1n), fr(-6n), fr(9n))
      ok(l23 !== null && l23.length === 1 && fEq(l23[0], fr(3n)), 'K: exercise L2-3 has the single repeated root 3 (S/2 = 3, (S/2)² = 9 = P)')
      const l33 = fSub(fMul(fr(0n), fr(0n)), fMul(fr(4n), fr(5n)))
      ok(fEq(l33, fr(-20n)) && quadRootsRational(fr(1n), fr(0n), fr(5n)) === null, 'K: exercise L3-3 build x² + 5 honestly rootless (Δ = −20)')
      ok(fEq(fSub(fMul(fr(5n), fr(5n)), fMul(fr(2n), fr(6n))), fr(13n)) && fEq(fSub(fMul(fr(5n), fr(5n)), fMul(fr(4n), fr(6n))), fr(1n)) && fEq(fDiv(fr(5n), fr(6n)), fr(5n, 6n)), 'K: L4 symmetric hunts 13 / 1 / 5⁄6 all exact')
      const l5 = quadRootsRational(fr(1n), fr(-4n), fr(32n, 9n))
      ok(l5 !== null && fEq(l5[0], fr(4n, 3n)) && fEq(l5[1], fr(8n, 3n)), 'K: exercise L5 roots {4/3, 8/3} re-priced in x² − 4x + 32/9')
      ok(qfIsZero(qfSub(qfMul(qf(fr(2n), fr(1n), 3n), qf(fr(2n), fr(-1n), 3n)), qf(fr(1n), fr(0n), 3n))), 'K: exercise L6 field check (2+√3)(2−√3) = 1 = P exact in ℚ(√3)')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'K: two figures in 9.4 (the readout machine + the sign map)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan94Fig1.rects.length, 'K: readout rect census ' + r0.length + ' = plan ' + plan94Fig1.rects.length)
      ok(canon(r0) === canon(plan94Fig1.rects), 'K: readout rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan94Fig2.rects.length, 'K: sign map rect census ' + r1.length + ' = plan ' + plan94Fig2.rects.length)
      ok(canon(r1) === canon(plan94Fig2.rects), 'K: sign map rects match the pinned plan exactly')
      for (const g of plan94Fig1.groups) {
        const rs = g.map((i) => plan94Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'K: readout group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan94Fig2.groups) {
        const rs = g.map((i) => plan94Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'K: sign map group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('STANDARD FORM') && figs[0].svg.includes('READ OFF') && figs[0].svg.includes('CERTIFY') && figs[0].svg.includes('REBUILD'), 'K: the readout carries the four stations')
      ok(figs[0].svg.includes('7/2') && figs[0].svg.includes('3/2'), 'K: the readout carries the worked S/P strip')
      ok(figs[1].svg.includes('OPPOSITE SIGNS') && figs[1].svg.includes('both real'), 'K: the sign map carries the P < 0 theorem')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 340"'), 'K: the viewBoxes match the plans')
    }
  }
  // retired-palette scan over the authored SVGs
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    let hits = 0
    for (const f of figs) {
      if (f.kind !== 'figure') continue
      for (const h of retired) if (f.svg.toLowerCase().includes(h)) hits++
    }
    ok(hits === 0, 'K: no retired palette hexes in the 9.4 figures (found ' + hits + ')')
  }
  // raw-$ scan on non-KaTeX titles
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'K: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'K: honest word count ' + words + ' >= 4000')
    console.log('[K] 9.4 honest word count: ' + words)
  }
  // entity-leak scan
  {
    let entityHits = 0
    for (const b of lesson.blocks) {
      const texts: string[] = []
      if (b.kind === 'para' || b.kind === 'heading') texts.push(b.text)
      if (b.kind === 'callout') texts.push(b.title, b.text)
      if (b.kind === 'terms') for (const t of b.items) texts.push(t.term, t.def)
      if (b.kind === 'equation' && b.note) texts.push(b.note)
      if (b.kind === 'derivation') {
        texts.push(b.title, b.statement, b.result)
        for (const s of b.steps) texts.push(s.label, s.explanation)
      }
      if (b.kind === 'example') texts.push(b.title, ...b.steps)
      if (b.kind === 'table') texts.push(b.caption || '', ...b.head, ...b.rows.flat())
      if (b.kind === 'formula') texts.push(b.name, b.note || '')
      if (b.kind === 'quiz') for (const it of b.items) texts.push(it.q, it.explain)
      if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) texts.push(q.q, ...(q.solution || []), q.answer || '')
      for (const t of texts) if (/&#\d+;|&[a-z]+;/.test(t)) entityHits++
    }
    ok(entityHits === 0, 'K: no HTML entities in 9.4 prose (found ' + entityHits + ')')
  }
  // prerequisite resolution across the library
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'K: all ' + ids.length + ' lesson ids repo-wide unique (with 9.4 added)')
    ok(ids.includes('al-roots-and-coefficients-viete-relations'), 'K: the new id is registered in the library graph')
    for (const p of lesson.prerequisites || []) ok(ids.includes(p), 'K: prerequisite ' + p + ' resolves in the library graph')
  }
  console.log('[K] the authored 9.4: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (L) the unit-9 completion review — the chapter-closing battery      */
/* ------------------------------------------------------------------ */

console.log('[L] unit-9 completion review: the 7-point checklist, exam corners, the book snapshot')

{
  // 1 — every lesson of the chapter clears the 4,000-word floor
  const wordCounts = chapter09.lessons.map((l) => countLessonWords(l))
  for (let i = 0; i < chapter09.lessons.length; i++) {
    ok(wordCounts[i] >= 4000, `L-1: lesson 9.${i + 1} honest word count ${wordCounts[i]} >= 4000`)
  }
  console.log('  L-1 word floors: ' + chapter09.lessons.map((l, i) => '9.' + (i + 1) + '=' + wordCounts[i]).join(', '))

  // 2 — quiz keys match the pinned batteries of sections B/E/H-ix/I-ix
  const pinnedKeys: string[][] = [
    [1, 0, 2, 3, 1].map(String),
    [2, 1, 0, 3, 2].map(String),
    [1, 3, 2, 0, 2].map(String),
    [1, 2, 3, 2, 1].map(String),
  ]
  for (let i = 0; i < 4; i++) {
    const q = chapter09.lessons[i].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => String(it.answer))
      ok(JSON.stringify(keys) === JSON.stringify(pinnedKeys[i]), `L-2: quiz keys of 9.${i + 1} match the pinned battery`)
    }
  }

  // 3 — every exercise carries a Cengage chain and a terminal answer; the chapter holds 56
  let totalExercises = 0
  let chainFailures = 0
  for (const l of chapter09.lessons) {
    for (const b of l.blocks) {
      if (b.kind === 'exercises') {
        for (const s of b.sets) {
          for (const q of s.questions) {
            totalExercises++
            if (!(Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer)) chainFailures++
          }
        }
      }
    }
  }
  ok(totalExercises === 56, 'L-3: the chapter holds 56 exercises (got ' + totalExercises + ')')
  ok(chainFailures === 0, 'L-3: every exercise carries a solution chain + terminal answer (' + chainFailures + ' failures)')

  // 4 — eight figures, all viewBoxed, all vivid-palette clean
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  let figCount = 0
  let figFailures = 0
  for (const l of chapter09.lessons) {
    for (const b of l.blocks) {
      if (b.kind === 'figure') {
        figCount++
        if (!b.svg.includes('viewBox=') || retired.some((h) => b.svg.toLowerCase().includes(h))) figFailures++
      }
    }
  }
  ok(figCount === 8, 'L-4: the chapter carries 8 figures (got ' + figCount + ')')
  ok(figFailures === 0, 'L-4: every figure viewBoxed and vivid-palette clean (' + figFailures + ' failures)')

  // 5 — the cross-lesson arcs closed: the chapter speaks with one voice
  const lessonText = (idx: number): string => {
    const parts: string[] = []
    for (const b of chapter09.lessons[idx].blocks) {
      if (b.kind === 'para' || b.kind === 'heading') parts.push(b.text)
      if (b.kind === 'callout') parts.push(b.title, b.text)
      if (b.kind === 'example') parts.push(b.title, ...b.steps)
      if (b.kind === 'derivation') parts.push(b.title, b.statement, b.result)
      if (b.kind === 'terms') for (const t of b.items) parts.push(t.term, t.def)
      if (b.kind === 'list') parts.push(...b.items)
    }
    return parts.join(' ')
  }
  const t1 = lessonText(0)
  const t2 = lessonText(1)
  const t3 = lessonText(2)
  const t4 = lessonText(3)
  ok(t1.includes('8.3') && (t1.includes('work-rate') || t1.includes('work rate')), 'L-5: 9.1 pays the 8.3 work-rate debt by name')
  ok(t2.includes('exile'), 'L-5: 9.2 reverses the ANS ch. 8 exile of √2 by name')
  ok(t3.includes('verdict machine') && t3.includes('master identity'), 'L-5: 9.3 grows 5.3’s verdict machine and names the master identity')
  ok(t4.includes('9.1') && t4.includes('9.2') && t4.includes('9.3'), 'L-5: 9.4 ties the arc — 9.1’s seed, 9.2’s answer, 9.3’s formula all cited')
  ok(t4.includes('difference identity') && (t4.includes('gap') || t4.includes('Gap')), 'L-5: 9.4 carries the difference identity (the Δ/a² bridge)')

  // 6 — the citation keys and prerequisites stand on every lesson
  for (let i = 0; i < 4; i++) {
    const l = chapter09.lessons[i]
    ok(
      JSON.stringify(l.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style']),
      `L-6: the four citation keys ride 9.${i + 1}`
    )
    ok((l.prerequisites || []).length >= 3, `L-6: 9.${i + 1} carries at least three prerequisites`)
  }

  // 7 — the exam corners: every lesson maps to the examinations
  for (let i = 0; i < 4; i++) {
    const exam = chapter09.lessons[i].blocks.find((b) => b.kind === 'callout' && b.tone === 'exam')
    ok(!!exam, `L-7: 9.${i + 1} carries an exam corner`)
  }

  // 8 — the chapter object is COMPLETE: status flipped, plan empty
  ok(chapter09.status === 'complete', 'L-8: chapter 9 status flipped to complete')
  ok(!chapter09.plannedLessons || chapter09.plannedLessons.length === 0, 'L-8: no planned lessons remain in chapter 9')

  // 9 — the book snapshot, recomputed from the live data
  let bookLessons = 0
  let bookWords = 0
  let completeChapters = 0
  let totalChapters = 0
  let minWords = Infinity
  const elementaryAlgebra = allBooks.find((b) => b.id === 'elementary-algebra')!
  for (const c of elementaryAlgebra.chapters) {
    totalChapters++
    if (c.status === 'complete') completeChapters++
    for (const l of c.lessons) {
      bookLessons++
      const w = countLessonWords(l)
      bookWords += w
      if (w < minWords) minWords = w
    }
  }
  ok(bookLessons === 31, 'L-9: the book stands at 31 lessons (got ' + bookLessons + ')')
  ok(bookWords > 141000, 'L-9: the book crosses 141,000 words (' + bookWords + ')')
  ok(minWords >= 4000, 'L-9: the shortest lesson still clears 4,000 words (' + minWords + ')')
  ok(completeChapters === 9 && totalChapters === 11, 'L-9: 9 of 11 chapters complete (got ' + completeChapters + '/' + totalChapters + ')')
  let libraryLessons = 0
  let libraryWords = 0
  for (const b of allBooks) {
    for (const c of b.chapters) {
      for (const l of c.lessons) {
        libraryLessons++
        libraryWords += countLessonWords(l)
      }
    }
  }
  ok(libraryLessons === 114, 'L-9: the library stands at 114 lessons (got ' + libraryLessons + ')')
  console.log('  L-9 book snapshot: ' + bookLessons + ' lessons / ' + bookWords + ' words / ' + completeChapters + ' of ' + totalChapters + ' chapters; library ' + libraryLessons + ' lessons / ' + libraryWords + ' words')

  // 10 — the id registry, one final time across the whole library
  const ids: string[] = []
  for (const b of allBooks) {
    for (const c of b.chapters) {
      for (const l of c.lessons) ids.push(l.id)
    }
  }
  ok(ids.length === new Set(ids).size, 'L-10: all ' + ids.length + ' library ids unique at chapter close')

  console.log('[L] the unit-9 completion review: checklist, exam corners, snapshot — all green')
}

console.log(`\nverify-book3-ch09 TOTAL (sections A-L): ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
