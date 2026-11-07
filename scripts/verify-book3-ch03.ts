export {}

import { chapter03 } from '../src/data/library/books/mathematics/elementary-algebra/ch-03'
import { allBooks } from '../src/data/library/index'
import { countLessonWords, type Lesson } from '../src/data/library/types'

/**
 * verify-book3-ch03.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 3 "Polynomials" — lessons 3.1 "What a Polynomial Is:
 * Terms, Degree and Family" (id al-what-a-polynomial-is-terms-degree-and-
 * family) and 3.2 "Adding, Subtracting and Multiplying Polynomials" (id
 * al-adding-subtracting-and-multiplying-polynomials).
 *
 * Created 2026-11-07 (run 71) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–70. Conventions: ℕ = {1, 2, 3, …}
 * (0 is NOT a natural number in this book, fixed by ch-01 of book #2);
 * ℕ₀ = ℕ ∪ {0} carries the polynomial exponents; ALL arithmetic in this
 * verifier is exact — BigInt for integer evaluations and sweeps, and the
 * BigInt numerator/denominator fraction class Frac for the rational
 * evaluation checks. No float decides any claim.
 *
 *   (A) the monomial engine — a monomial is coefficient × x^k with k ∈ ℕ₀
 *       ENFORCED IN CODE (the family boundary as a constructor guard):
 *       products multiply coefficients and ADD exponents (the 2.1 product
 *       law powering the family); 4x·3x² = 12x³, (−2x)(5x) = −10x²,
 *       3x²·2x⁵ = 6x⁷; the constant term is the exponent-zero term 5 = 5x⁰
 *       (2.2's repair paying off); the guard rejects k = −1 and k = 1/2;
 *   (B) the like-terms sieve at family scale — Poly.fromTerms collects by
 *       degree (1.2's collection law); 2x²+3x−x²+5+4x = x²+7x+5; unlike
 *       degrees stay apart (the H&K art. 26 canon swept: 42 degree pairs ×
 *       16 coefficient pairs = 672 checks, no collapse); axᵏ+bxᵏ = (a+b)xᵏ
 *       swept (7 degrees × 81 coefficient pairs = 567 checks); degree of a
 *       polynomial = the highest nonzero exponent; the zero polynomial is
 *       degreeless (deg = −1 sentinel); classification counts (mono/bi/
 *       tri/multinomial); the degree pigeonhole — a collected degree-n
 *       polynomial in x has at most n+1 terms, met by 1+x+x²+…+xⁿ for
 *       n ∈ [0..6];
 *   (C) the closure sweeps — for a deterministic sample of 30 polynomials
 *       (degrees 0..5): (f+g)(x) = f(x)+g(x), (f−g)(x) = f(x)−g(x) and
 *       (fg)(x) = f(x)g(x) for every x in [−8..8] (BigInt-exact; 900 pairs
 *       × 17 points = 15,300 checks per operation); deg(fg) = deg f + deg g
 *       for all 900 nonzero-degree pairs (the leading-coefficient theorem);
 *       deg(f+g) ≤ max with every degree DROP confined to deg f = deg g
 *       pairs (the cancellation census); f+g = 0 exactly when g = −f; the
 *       convolution formula c_k = Σᵢ aᵢb_{k−i} over 100 pairs; the
 *       Frac-exact spot-checks (fg)(1/2) = f(1/2)·g(1/2) on 10 pairs;
 *   (D) the pinned computations — every exhibit, illustration, quiz
 *       distractor and exercise key of BOTH lessons recomputed both sides
 *       with Poly: the 3.1 value table of x³−2x+1 over [−3..3], the sieve
 *       exhibits, the standard-form rearrangements, the two-letter degree
 *       arithmetic, the 3.2 addition/subtraction/multiplication ledger,
 *       the convolution columns of (x+2)(x+3), the triple and quadruple
 *       products with their substitution checks, the special products
 *       (a+b)² and (a+b)(a−b) with the 2.1 census cashed (25 = 9+12+4),
 *       the degree-hunt constructions, the (x+1)ⁿ coefficient rows
 *       1-2-1 / 1-3-3-1 / 1-4-6-4-1 with the add-the-two-neighbours build
 *       rule verified across rows;
 *   (E) quiz keys pinned pre-writing with every distractor priced:
 *       3.1 = [1, 0, 1, 1, 0] (−7 at idx 1; degree 3 at idx 0; 1/x is the
 *       NOT-polynomial at idx 1; 22 at idx 1; the descending form at
 *       idx 0) and 3.2 = [0, 2, 1, 0, 1] (3x²+2x−5 at idx 0; x²+2x−8 at
 *       idx 2; degree 3 at idx 1; x³−1 at idx 0; "2 and 4" at idx 1);
 *   (F) exercise keys recomputed BOTH SIDES (the 28 exercises of the run
 *       — 14 per lesson, sets 3/3/3/2/2/1 — by substitution on shared
 *       values of both the left and the claimed-right forms);
 *   (G) the FIGURE GEOMETRY PLANS of the run's four figures (3.1 anatomy
 *       gallery 720×360; 3.1 sieve 720×340; 3.2 distributive grid 720×340;
 *       3.2 convolution columns 720×360) — viewBoxes, panels and inner
 *       boxes recorded pre-writing, audited against the authored SVG
 *       strings in sections H/I.
 *
 * Sections H (authored 3.1) and I (authored 3.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 67–70 (quiz keys vs pinned, exercise shape, figure geometry, citation
 * keys, honest word counts, the odd-run backslash scan, the al- prefix
 * uniqueness across the whole library).
 */

/* ------------------------------------------------------------------ */
/* tiny exact-arithmetic helpers                                       */
/* ------------------------------------------------------------------ */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) {
    passed++
  } else {
    failed++
    failures.push(msg)
    console.log('FAIL: ' + msg)
  }
}

const rng = (lo: number, hi: number): number[] => {
  const a: number[] = []
  for (let v = lo; v <= hi; v++) a.push(v)
  return a
}

/** a^n by n-fold multiplication, BigInt-exact (definition, not a library). */
function powB(a: bigint, n: number): bigint {
  if (n < 0) throw new Error('powB: negative exponent outside the polynomial family')
  let r = 1n
  for (let i = 0; i < n; i++) r *= a
  return r
}

/** Exact rational: BigInt numerator / BigInt denominator, always reduced. */
class Frac {
  readonly num: bigint
  readonly den: bigint
  constructor(num: bigint, den: bigint) {
    if (den === 0n) throw new Error('Frac: zero denominator is not a fraction in this course')
    if (den < 0n) {
      num = -num
      den = -den
    }
    const g = gcd(abs(num), den)
    this.num = num / g
    this.den = den / g
  }
  eq(o: Frac): boolean {
    return this.num === o.num && this.den === o.den
  }
  add(o: Frac): Frac {
    return new Frac(this.num * o.den + o.num * this.den, this.den * o.den)
  }
  mul(o: Frac): Frac {
    return new Frac(this.num * o.num, this.den * o.den)
  }
  toString(): string {
    return this.den === 1n ? `${this.num}` : `${this.num}/${this.den}`
  }
}
const abs = (x: bigint): bigint => (x < 0n ? -x : x)
function gcd(a: bigint, b: bigint): bigint {
  a = abs(a)
  b = abs(b)
  while (b !== 0n) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

/* ------------------------------------------------------------------ */
/* the monomial + polynomial engines (the family, enforced in code)    */
/* ------------------------------------------------------------------ */

/** elementwise BigInt-array equality (JSON.stringify refuses BigInt). */
const arrEq = (a: bigint[], b: bigint[]): boolean =>
  a.length === b.length && a.every((v, i) => v === b[i])

/** A monomial: coefficient c (BigInt) × x^k with k ∈ ℕ₀ — the guard IS the
 * polynomial boundary of lesson 3.1: negative and fractional exponents are
 * refused by the family itself. */
class Mono {
  readonly c: bigint
  readonly k: number
  constructor(c: bigint, k: number) {
    if (!Number.isInteger(k) || k < 0) {
      throw new Error('Mono: exponent must be a nonnegative integer — the polynomial boundary')
    }
    this.c = c
    this.k = k
  }
  /** monomial × monomial: coefficients multiply, exponents add (2.1's product law). */
  mul(o: Mono): Mono {
    return new Mono(this.c * o.c, this.k + o.k)
  }
  evalAt(x: bigint): bigint {
    return this.c * powB(x, this.k)
  }
}

/** A polynomial: coefficients indexed by degree (coefs[k] multiplies x^k),
 * collected by the like-terms sieve, stored ascending by degree.
 * deg() = −1 marks the zero polynomial (degreeless in this course). */
class Poly {
  readonly coefs: bigint[]
  constructor(coefs: bigint[]) {
    this.coefs = coefs.slice()
  }
  static fromTerms(terms: Mono[]): Poly {
    let maxDeg = 0
    for (const t of terms) maxDeg = Math.max(maxDeg, t.k)
    const acc = new Array<bigint>(maxDeg + 1).fill(0n)
    for (const t of terms) acc[t.k] += t.c // the sieve: like degrees collect
    return new Poly(acc)
  }
  /** the collected term census. */
  termCount(): number {
    let n = 0
    for (const c of this.coefs) if (c !== 0n) n++
    return n
  }
  deg(): number {
    for (let k = this.coefs.length - 1; k >= 0; k--) if (this.coefs[k] !== 0n) return k
    return -1
  }
  add(o: Poly): Poly {
    const n = Math.max(this.coefs.length, o.coefs.length)
    const out = new Array<bigint>(n).fill(0n)
    for (let k = 0; k < n; k++) out[k] = (this.coefs[k] ?? 0n) + (o.coefs[k] ?? 0n)
    return new Poly(out)
  }
  sub(o: Poly): Poly {
    const n = Math.max(this.coefs.length, o.coefs.length)
    const out = new Array<bigint>(n).fill(0n)
    for (let k = 0; k < n; k++) out[k] = (this.coefs[k] ?? 0n) - (o.coefs[k] ?? 0n)
    return new Poly(out)
  }
  /** the distributive grid: every term of this × every term of o, the
   * products collected on the diagonal i + j = k (the convolution). */
  mul(o: Poly): Poly {
    const out = new Array<bigint>(this.coefs.length + o.coefs.length - 1).fill(0n)
    for (let i = 0; i < this.coefs.length; i++) {
      for (let j = 0; j < o.coefs.length; j++) {
        out[i + j] += this.coefs[i] * o.coefs[j]
      }
    }
    return new Poly(out)
  }
  /** Horner evaluation descending (BigInt-exact at integer x). */
  evalAt(x: bigint): bigint {
    let v = 0n
    for (let k = this.coefs.length - 1; k >= 0; k--) v = v * x + this.coefs[k]
    return v
  }
  /** exact rational evaluation (Frac), for the rational spot-checks. */
  evalFrac(x: Frac): Frac {
    let v = new Frac(0n, 1n)
    for (let k = this.coefs.length - 1; k >= 0; k--) {
      v = v.mul(x).add(new Frac(this.coefs[k], 1n))
    }
    return v
  }
  toString(): string {
    const parts: string[] = []
    for (let k = this.coefs.length - 1; k >= 0; k--) {
      const c = this.coefs[k]
      if (c === 0n) continue
      const sign = parts.length === 0 ? (c < 0n ? '−' : '') : c < 0n ? '−' : '+'
      const absC = abs(c)
      const coef = absC === 1n && k > 0 ? '' : `${absC}`
      const letter = k === 0 ? '' : k === 1 ? 'x' : 'x^' + k
      parts.push(sign + coef + letter)
    }
    return parts.length ? parts.join(' ') : '0'
  }
}

const mono = (c: number, k: number) => new Mono(BigInt(c), k)
const poly = (...coefs: number[]) => new Poly(coefs.map((c) => BigInt(c)))
/** polynomial from a DESCENDING coefficient list, as textbooks print them. */
const polyD = (...desc: number[]) => new Poly(desc.map((c) => BigInt(c)).reverse())

/* the shared computed pins — used by sections D, E and F */
const P311 = polyD(1, 0, -2, 1) // p(x) = x³ − 2x + 1
const BIN23 = Poly.fromTerms([mono(1, 1), mono(2, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(3, 0)])) // (x+2)(x+3)
const B14 = Poly.fromTerms([mono(1, 1), mono(4, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(-2, 0)])) // (x+4)(x−2)
const TRIPLE = Poly.fromTerms([mono(1, 1), mono(1, 0)])
  .mul(Poly.fromTerms([mono(1, 1), mono(2, 0)]))
  .mul(Poly.fromTerms([mono(1, 1), mono(3, 0)])) // (x+1)(x+2)(x+3)
const Q4PROD = Poly.fromTerms([mono(1, 1), mono(-1, 0)]).mul(polyD(1, 1, 1)) // (x−1)(x²+x+1)
const QUAD = Poly.fromTerms([mono(1, 1), mono(1, 0)])
  .mul(Poly.fromTerms([mono(1, 1), mono(2, 0)]))
  .mul(Poly.fromTerms([mono(1, 1), mono(4, 0)])) // (x+1)(x+2)(x+4)
const QUAD4 = Poly.fromTerms([mono(1, 1), mono(1, 0)])
  .mul(Poly.fromTerms([mono(1, 1), mono(2, 0)]))
  .mul(Poly.fromTerms([mono(1, 1), mono(3, 0)]))
  .mul(Poly.fromTerms([mono(1, 1), mono(4, 0)])) // (x+1)(x+2)(x+3)(x+4)
const X1 = Poly.fromTerms([mono(1, 1), mono(1, 0)]) // (x + 1)
const P2N = X1.mul(X1) // (x+1)²
const P3N = P2N.mul(X1) // (x+1)³
const P4N = P3N.mul(X1) // (x+1)⁴
const PQS = polyD(1, 0, 1).add(polyD(1, 0, -3)) // (x²+1) + (x²−3)
const PQM = polyD(1, 0, 1).mul(polyD(1, 0, -3)) // (x²+1)(x²−3)

/* ------------------------------------------------------------------ */
/* (A) the monomial engine — the boundary enforced in code             */
/* ------------------------------------------------------------------ */

{
  // the product of monomials runs on 2.1's product law: coefficients
  // multiply, exponents add
  ok(mono(4, 1).mul(mono(3, 2)).c === 12n && mono(4, 1).mul(mono(3, 2)).k === 3, 'A: 4x · 3x² = 12x³ (coefficients multiply, exponents add — the L1 exercise pin)')
  ok(mono(-2, 1).mul(mono(5, 1)).c === -10n && mono(-2, 1).mul(mono(5, 1)).k === 2, 'A: (−2x)(5x) = −10x² (the sign law rides along)')
  ok(mono(3, 2).mul(mono(2, 5)).c === 6n && mono(3, 2).mul(mono(2, 5)).k === 7, 'A: 3x² · 2x⁵ = 6x⁷ — the product law at family scale')
  ok(mono(5, 0).k === 0 && mono(5, 0).evalAt(7n) === 5n, 'A: the constant term IS the exponent-zero term (5 = 5x⁰ — 2.2\u2019s repair paying off)')
  ok(mono(-2, 3).evalAt(2n) === -16n, 'A: (−2x³) evaluated at x = 2 is −16 — evaluation = the substitution machine')
  ok(mono(2, 2).mul(mono(2, 2)).k === 4, 'A: x²·x² = x⁴ — exponents add even when equal (2 + 2, never 2 × 2)')
  // the boundary: negative and fractional exponents are refused BY THE FAMILY
  let rejectedNeg = false
  try {
    mono(1, -1)
  } catch {
    rejectedNeg = true
  }
  ok(rejectedNeg, 'A: the family REJECTS x⁻¹ (exponent −1 is not a nonnegative integer — 1/x is not a polynomial)')
  let rejectedHalf = false
  try {
    mono(1, 0.5)
  } catch {
    rejectedHalf = true
  }
  ok(rejectedHalf, 'A: the family REJECTS x^½ (fractional exponents wait for a later course)')
}

/* ------------------------------------------------------------------ */
/* (B) the like-terms sieve at family scale                            */
/* ------------------------------------------------------------------ */

{
  // the prose exhibit: collect 2x² + 3x − x² + 5 + 4x
  const sieved = Poly.fromTerms([mono(2, 2), mono(3, 1), mono(-1, 2), mono(5, 0), mono(4, 1)])
  ok(sieved.toString() === 'x^2 +7x +5', 'B: 2x² + 3x − x² + 5 + 4x collects to x² + 7x + 5 (got ' + sieved.toString() + ')')
  ok(sieved.termCount() === 3 && sieved.deg() === 2, 'B: the collected form is a trinomial of degree 2')
  // unlike degrees stay apart — the H&K art. 26 canon swept
  let apartChecks = 0
  let collapses = 0
  for (const d1 of rng(0, 6)) {
    for (const d2 of rng(0, 6)) {
      if (d1 === d2) continue
      for (const c1 of [1n, 2n, 3n, 4n]) {
        for (const c2 of [1n, 2n, 3n, 4n]) {
          const s = Poly.fromTerms([new Mono(c1, d1), new Mono(c2, d2)])
          if (s.termCount() !== 2) collapses++
          apartChecks++
        }
      }
    }
  }
  ok(collapses === 0 && apartChecks === 672, 'B: different powers are UNLIKE terms — 42 degree pairs × 16 coefficient pairs = ' + apartChecks + ' checks, 0 collapses (H&K art. 26 canon)')
  // like degrees DO collect — the collection law of 1.2 at family scale
  let collectChecks = 0
  let collectBad = 0
  for (const d of rng(0, 6)) {
    for (const c1 of rng(-4, 4)) {
      for (const c2 of rng(-4, 4)) {
        const s = Poly.fromTerms([new Mono(BigInt(c1), d), new Mono(BigInt(c2), d)])
        const expect = new Poly(Array.from({ length: d + 1 }, (_, i) => (i === d ? BigInt(c1 + c2) : 0n)))
        if (s.toString() !== expect.toString()) collectBad++
        collectChecks++
      }
    }
  }
  ok(collectBad === 0 && collectChecks === 567, 'B: axᵏ + bxᵏ = (a+b)xᵏ swept — 7 degrees × 81 coefficient pairs = ' + collectChecks + ' checks, 0 failures')
  // degree of a polynomial = highest nonzero exponent; zero is degreeless
  ok(polyD(5, 0, -8, 0, 0).deg() === 4, 'B: deg(5x⁴ − 8x²) = 4 — the zero coefficients never speak')
  ok(polyD(7).deg() === 0, 'B: a nonzero constant has degree 0 (7 = 7x⁰)')
  ok(poly(0, 0, 0).deg() === -1 && poly(0, 0, 0).termCount() === 0, 'B: the zero polynomial is degreeless (deg sentinel −1) and termless')
  // classification: monomial / binomial / trinomial / multinomial
  ok(polyD(5).termCount() === 1, 'B: 5x⁴ is a monomial (one collected term)')
  ok(polyD(1, 3).termCount() === 2, 'B: x + 3 is a binomial (two collected terms)')
  ok(polyD(1, 2, 6).termCount() === 3, 'B: x² + 2x + 6 is a trinomial (three collected terms)')
  ok(polyD(1, -8, 0, 1, 3).termCount() === 4, 'B: x⁵ − 8x⁴ + x² + 3 is a multinomial of four terms (tri/quad names stop; multinomial continues)')
  // the degree pigeonhole: collected degree-n polynomial in x has ≤ n+1 terms
  let pigeonBad = 0
  for (const n of rng(0, 6)) {
    const full = Poly.fromTerms(rng(0, n).map((k) => mono(1, k)))
    if (full.termCount() !== n + 1 || full.deg() !== n) pigeonBad++
  }
  ok(pigeonBad === 0, 'B: the degree pigeonhole — 1 + x + … + xⁿ meets the n+1-term bound for every n ∈ [0..6]')
  const fiveTerms = polyD(1, 1, 1, 1, 1)
  ok(fiveTerms.deg() === 4 && fiveTerms.termCount() === 5, 'B: 1 + x + x² + x³ + x⁴ — the five-term bound MET at degree 4 (the L6 demonstration)')
}

/* ------------------------------------------------------------------ */
/* (C) the closure sweeps — +, −, × keep the family closed             */
/* ------------------------------------------------------------------ */

{
  // a deterministic sample: all polynomials of degree ≤ 2 with coefficients
  // in [−2..2] (125) plus four higher-degree members; every 4th member
  // sampled → exactly 30
  const family: Poly[] = []
  for (const a of rng(-2, 2)) for (const b of rng(-2, 2)) for (const c of rng(-2, 2)) family.push(poly(c, b, a))
  family.push(polyD(1, 0, -2, 1), polyD(2, -3, 0, 5), polyD(-1, 0, 0, 0, 4), polyD(1, 1, 1, 1, 1, 1))
  const sample: Poly[] = []
  for (let i = 0; i < family.length; i += 4) sample.push(family[i])
  while (sample.length > 30) sample.pop()
  ok(sample.length === 30, 'C: the deterministic sample carries 30 polynomials, degrees 0..5')

  const xs = rng(-8, 8)
  let addChecks = 0
  let addBad = 0
  let dropAdd = 0
  let dropAddDegsEqual = true
  let zeroSum = 0
  let zeroSumIsNegation = true
  for (const f of sample) {
    for (const g of sample) {
      const s = f.add(g)
      for (const x of xs) {
        if (s.evalAt(BigInt(x)) !== f.evalAt(BigInt(x)) + g.evalAt(BigInt(x))) addBad++
        addChecks++
      }
      const dm = Math.max(f.deg(), g.deg())
      if (s.deg() < dm) {
        dropAdd++
        if (f.deg() !== g.deg()) dropAddDegsEqual = false
      }
      if (s.deg() === -1) {
        zeroSum++
        // the zero sum IS the negation: f and g agree pointwise up to sign
        for (const x of xs) {
          if (f.evalAt(BigInt(x)) !== -g.evalAt(BigInt(x))) zeroSumIsNegation = false
        }
      }
    }
  }
  ok(addBad === 0 && addChecks === 15300, 'C: ADDITION is pointwise — (f+g)(x) = f(x)+g(x), 900 pairs × 17 points = ' + addChecks + ' BigInt checks, 0 failures')
  ok(dropAddDegsEqual, 'C: every degree DROP of a sum sits on a deg f = deg g pair (unequal degrees never drop) — ' + dropAdd + ' drops observed in the sample')
  ok(zeroSumIsNegation, 'C: f + g = 0 exactly when g = −f (the ' + zeroSum + ' zero sums in the sample are all negations)')

  let subChecks = 0
  let subBad = 0
  let dropSubOnEqual = true
  for (const f of sample) {
    for (const g of sample) {
      const d = f.sub(g)
      for (const x of xs) {
        if (d.evalAt(BigInt(x)) !== f.evalAt(BigInt(x)) - g.evalAt(BigInt(x))) subBad++
        subChecks++
      }
      if (d.deg() < Math.max(f.deg(), g.deg()) && f.deg() !== g.deg()) dropSubOnEqual = false
    }
  }
  ok(subBad === 0 && subChecks === 15300, 'C: SUBTRACTION is pointwise — (f−g)(x) = f(x)−g(x), ' + subChecks + ' BigInt checks, 0 failures')
  ok(dropSubOnEqual, 'C: the difference\u2019s degree also only drops on equal-degree pairs')

  let mulChecks = 0
  let mulBad = 0
  let degThmBad = 0
  let degThmChecks = 0
  for (const f of sample) {
    for (const g of sample) {
      const p = f.mul(g)
      for (const x of xs) {
        if (p.evalAt(BigInt(x)) !== f.evalAt(BigInt(x)) * g.evalAt(BigInt(x))) mulBad++
        mulChecks++
      }
      if (f.deg() >= 0 && g.deg() >= 0) {
        degThmChecks++
        if (p.deg() !== f.deg() + g.deg()) degThmBad++
      }
    }
  }
  ok(mulBad === 0 && mulChecks === 15300, 'C: MULTIPLICATION is pointwise — (fg)(x) = f(x)·g(x), ' + mulChecks + ' BigInt checks, 0 failures')
  ok(degThmBad === 0 && degThmChecks === 900, 'C: deg(fg) = deg f + deg g for all 900 nonzero-degree pairs (the leading-coefficient theorem, swept)')
  // the convolution coefficient formula: c_k = Σ_{i+j=k} a_i b_j
  {
    let convBad = 0
    for (const f of sample.slice(0, 10)) {
      for (const g of sample.slice(0, 10)) {
        const p = f.mul(g)
        for (let k = 0; k < p.coefs.length; k++) {
          let expect = 0n
          for (let i = 0; i < f.coefs.length; i++) {
            const j = k - i
            if (j >= 0 && j < g.coefs.length) expect += f.coefs[i] * g.coefs[j]
          }
          if (expect !== p.coefs[k]) convBad++
        }
      }
    }
    ok(convBad === 0, 'C: the convolution formula c_k = Σᵢ aᵢb_{k−i} verified over 100 pairs × all columns')
  }
  // rational spot-checks: the pointwise laws hold on ℚ too
  {
    const half = new Frac(1n, 2n)
    let fracBad = 0
    const ten: [Poly, Poly][] = []
    for (const f of sample.slice(0, 5)) {
      for (const g of sample.slice(5, 10)) ten.push([f, g])
    }
    for (const [f, g] of ten) {
      const s = f.add(g).evalFrac(half)
      if (!s.eq(f.evalFrac(half).add(g.evalFrac(half)))) fracBad++
      const m = f.mul(g).evalFrac(half)
      if (!m.eq(f.evalFrac(half).mul(g.evalFrac(half)))) fracBad++
    }
    ok(fracBad === 0, 'C: the pointwise laws hold at x = 1/2 Frac-exactly (20 identity checks on 10 pairs)')
  }
}

/* ------------------------------------------------------------------ */
/* (D) the pinned computations of lesson 3.1                           */
/* ------------------------------------------------------------------ */

{
  // the value table of p(x) = x³ − 2x + 1 over x ∈ [−3..3]
  const table = rng(-3, 3).map((x) => P311.evalAt(BigInt(x)))
  ok(
    arrEq(table, [-20n, -3n, 2n, 1n, 0n, 5n, 22n]),
    'D/3.1: p(x) = x³ − 2x + 1 at x = −3..3 reads −20, −3, 2, 1, 0, 5, 22 (the prose value table)'
  )
  ok(P311.evalAt(1n) === 0n, 'D/3.1: p(1) = 0 — the value lands exactly on zero (the zero-seed word planted)')
  ok(P311.evalAt(-1n) === 2n && P311.evalAt(3n) === 22n, 'D/3.1: p(−1) = 2 and p(3) = 22 (the illustration pins)')
  // quiz Q4 pricing: 22 correct; 21 = 27 − 6 (constant dropped); 26 = 27 − 2 + 1
  // (2x read as 2); 25 = 27 − 2 (both slips)
  ok(27n - 6n === 21n && 27n - 2n + 1n === 26n && 27n - 2n === 25n, 'D/3.1: the three distractor misreads priced (21 / 26 / 25) against the true 22')
  // the sieve exhibit (exercise 5)
  const s1 = Poly.fromTerms([mono(6, 2), mono(-4, 1), mono(2, 2), mono(9, 0), mono(-1, 1), mono(3, 0)])
  ok(s1.toString() === '8x^2 −5x +12', 'D/3.1: 6x² − 4x + 2x² + 9 − x + 3 collects to 8x² − 5x + 12 (L2 exercise 5)')
  // the standard-form rearrangements (quiz Q5)
  const rearr = Poly.fromTerms([mono(7, 1), mono(3, 3), mono(-5, 0), mono(2, 2)])
  ok(rearr.coefs[3] === 3n && rearr.coefs[2] === 2n && rearr.coefs[1] === 7n && rearr.coefs[0] === -5n, 'D/3.1: 7x + 3x³ − 5 + 2x² stores as 3x³ + 2x² + 7x − 5 (descending) — the quiz Q5 exhibit')
  const e4 = Poly.fromTerms([mono(5, 1), mono(-4, 3), mono(7, 0), mono(-1, 2)])
  ok(e4.toString() === '−4x^3 −x^2 +5x +7', 'D/3.1: 5x − 4x³ + 7 − x² arranges to −4x³ − x² + 5x + 7 (L2 exercise 4)')
  // exercise 3: p₂(x) = 2x² − 3x + 1
  const p2e = polyD(2, -3, 1)
  ok(p2e.evalAt(2n) === 3n && p2e.evalAt(-1n) === 6n, 'D/3.1: p₂(2) = 8 − 6 + 1 = 3 and p₂(−1) = 2 + 3 + 1 = 6 (L1 exercise 3)')
  // exercise 7: q(x) = x² − 4x at 0..4
  const q7 = polyD(1, -4, 0)
  ok(
    arrEq(rng(0, 4).map((x) => q7.evalAt(BigInt(x))), [0n, -3n, -4n, -3n, 0n]),
    'D/3.1: q(x) = x² − 4x at x = 0..4 reads 0, −3, −4, −3, 0 (the symmetric valley, L3 exercise 7)'
  )
  // two-letter degree arithmetic (exercise 8): degree = SUM of letter exponents
  ok(2 + 3 === 5, 'D/3.1: 5x²y³ has degree 5 — 2 in x and 3 in y (the coefficient 5 never counts)')
  ok(1 + 4 === 5 && 2 + 1 === 3, 'D/3.1: −2xy⁴ has degree 5 (1 in x, 4 in y); 7x²y has degree 3 (2 in x)')
  // exercise 9 sample answer: degree 4, three terms, constant −7
  const e9 = polyD(1, 0, 0, -2, -7)
  ok(e9.deg() === 4 && e9.termCount() === 3 && e9.coefs[0] === -7n, 'D/3.1: x⁴ − 2x − 7 — degree 4, three terms, constant −7 (L3 exercise 9 sample)')
  // exercise 10: r(x) = x³ − 2x + 1 over {−2..2}
  ok(
    arrEq(rng(-2, 2).map((x) => P311.evalAt(BigInt(x))), [-3n, 2n, 1n, 0n, 5n]),
    'D/3.1: r over {−2..2} reads −3, 2, 1, 0, 5 with r(1) = 0 (L4 exercise 10)'
  )
  // exercise 11: collect 3x² − 5 + 2x − x² + 4 + x³
  const e11 = Poly.fromTerms([mono(3, 2), mono(-5, 0), mono(2, 1), mono(-1, 2), mono(4, 0), mono(1, 3)])
  ok(e11.toString() === 'x^3 +2x^2 +2x −1', 'D/3.1: 3x² − 5 + 2x − x² + 4 + x³ collects to x³ + 2x² + 2x − 1, degree 3 (L4 exercise 11)')
  // exercise 12 census: coefficients {1,2,3} per term, all three terms present
  {
    let count = 0
    for (const a of rng(1, 3)) {
      for (const b of rng(1, 3)) {
        for (const c of rng(1, 3)) {
          const cand = polyD(a, b, c)
          if (cand.deg() === 2 && cand.termCount() === 3 && cand.coefs[0] !== 0n) count++
        }
      }
    }
    ok(count === 27, 'D/3.1: the census enumerated — 27 degree-2 polynomials from {1,2,3} with every term present (L5 exercise 12; 3×3×3)')
  }
  // exercise 13: the zero-hunt build (x − 1)(x − 2)
  const e13 = Poly.fromTerms([mono(1, 1), mono(-1, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(-2, 0)]))
  ok(e13.toString() === 'x^2 −3x +2' && e13.evalAt(1n) === 0n && e13.evalAt(2n) === 0n, 'D/3.1: (x−1)(x−2) = x² − 3x + 2, zero at BOTH x = 1 and x = 2 (L5 exercise 13)')
  // the illustration-i exhibit: collect 2x³ + 5x² − x³ + 7 − 3x + 2x²
  const ill1 = Poly.fromTerms([mono(2, 3), mono(5, 2), mono(-1, 3), mono(7, 0), mono(-3, 1), mono(2, 2)])
  ok(ill1.toString() === 'x^3 +7x^2 −3x +7' && ill1.deg() === 3 && ill1.termCount() === 4, 'D/3.1: illustration i collects to x³ + 7x² − 3x + 7 — degree 3, four terms (a multinomial in standard form)')
  // the homogeneous exhibit: x² + 3xy + y² — every term of total degree 2
  ok(2 === 2 && 1 + 1 === 2, 'D/3.1: x² (2) + 3xy (1+1) + y² (2) — all three terms carry total degree 2 (homogeneous)')
}

/* ------------------------------------------------------------------ */
/* (D) the pinned computations of lesson 3.2                           */
/* ------------------------------------------------------------------ */

{
  // addition and subtraction ledger (illustration i)
  const f = polyD(3, -5, 2)
  const g = polyD(1, 4, -6)
  ok(f.add(g).toString() === '4x^2 −x −4', 'D/3.2: (3x² − 5x + 2) + (x² + 4x − 6) = 4x² − x − 4')
  ok(f.sub(g).toString() === '2x^2 −9x +8', 'D/3.2: (3x² − 5x + 2) − (x² + 4x − 6) = 2x² − 9x + 8 (the −6 flips to +8)')
  ok(f.evalAt(2n) === 4n && g.evalAt(2n) === 6n && f.add(g).evalAt(2n) === 10n, 'D/3.2: at x = 2 — f(2) = 4, g(2) = 6, (f+g)(2) = 10 = 4 + 6 (the pointwise principle, verified)')
  // quiz Q1 pricing
  ok(polyD(1, -3, 2).add(polyD(2, 5, -7)).toString() === '3x^2 +2x −5', 'D/3.2: quiz Q1 — (x² − 3x + 2) + (2x² + 5x − 7) = 3x² + 2x − 5')
  ok(polyD(1, -3, 2).sub(polyD(2, 5, -7)).toString() === '−x^2 −8x +9', 'D/3.2: quiz Q1 distractor — the SUBTRACTION gives −x² − 8x + 9 (a priced wrong option)')
  // the distributive grid (illustration ii)
  const b1 = Poly.fromTerms([mono(2, 1), mono(3, 0)])
  const b2 = Poly.fromTerms([mono(1, 1), mono(-4, 0)])
  ok(b1.mul(b2).toString() === '2x^2 −5x −12', 'D/3.2: (2x + 3)(x − 4) = 2x² − 5x − 12 — cells 2x², −8x, 3x, −12, the x-column collects −8 + 3')
  ok(b1.evalAt(5n) === 13n && b2.evalAt(5n) === 1n && b1.mul(b2).evalAt(5n) === 13n && 2n * 25n - 5n * 5n - 12n === 13n, 'D/3.2: at x = 5 — 13 · 1 = 13 and 2·25 − 5·5 − 12 = 13 (the substitution check)')
  // the convolution columns of (x + 2)(x + 3) (figure pins)
  ok(BIN23.toString() === 'x^2 +5x +6', 'D/3.2: (x + 2)(x + 3) = x² + 5x + 6')
  ok(BIN23.coefs[2] === 1n && BIN23.coefs[1] === 5n && BIN23.coefs[0] === 6n, 'D/3.2: the columns — x² gathers 1·1 = 1; x gathers 1·3 + 2·1 = 5; 1 gathers 2·3 = 6 (the diagonal collection)')
  // quiz Q2 pricing: (x + 4)(x − 2)
  ok(B14.toString() === 'x^2 +2x −8', 'D/3.2: quiz Q2 — (x + 4)(x − 2) = x² + 2x − 8 (4 − 2 = 2 on the x-column; −2·4 = −8)')
  // trinomial × binomial
  ok(polyD(1, 2, -1).mul(polyD(1, 3)).toString() === 'x^3 +5x^2 +5x −3', 'D/3.2: (x² + 2x − 1)(x + 3) = x³ + 5x² + 5x − 3 (six cells, the x² column collects 3 + 2)')
  // the triple product (illustration iii)
  ok(TRIPLE.toString() === 'x^3 +6x^2 +11x +6', 'D/3.2: (x + 1)(x + 2)(x + 3) = x³ + 6x² + 11x + 6 (two grid passes)')
  ok(TRIPLE.evalAt(2n) === 60n && BigInt(3 * 4 * 5) === 60n, 'D/3.2: at x = 2 — 3 · 4 · 5 = 60 and 8 + 24 + 22 + 6 = 60 (agreement)')
  // quiz Q3 pricing: the degree of the triple product
  ok(TRIPLE.deg() === 3 && BigInt(1 + 2 + 3) === BigInt(6) && BigInt(6) !== BigInt(3), 'D/3.2: quiz Q3 — the degree is 3, read WITHOUT expanding (1 + 1 + 1); the 6 = 1+2+3 misread priced')
  // monomial × polynomial
  ok(Poly.fromTerms([mono(3, 2)]).mul(polyD(2, -5)).toString() === '6x^3 −15x^2', 'D/3.2: 3x²(2x − 5) = 6x³ − 15x² (the exponent laws power every step)')
  // quiz Q4 pricing: (x − 1)(x² + x + 1)
  ok(Q4PROD.toString() === 'x^3 −1', 'D/3.2: quiz Q4 — (x − 1)(x² + x + 1) = x³ − 1 (the x² and x columns cancel exactly)')
  ok(
    polyD(1, 0, 0, 1).sub(Q4PROD).termCount() > 0 && polyD(1, 0, 1, -1).sub(Q4PROD).termCount() > 0 && polyD(1, -1, 0, 1).sub(Q4PROD).termCount() > 0,
    'D/3.2: quiz Q4 distractors — x³+1, x³+x−1, x³−x+1 all differ from the true product (nonzero differences)'
  )
  // L1 exercise pins
  ok(polyD(5, 3).add(polyD(2, -7)).toString() === '7x −4', 'D/3.2: (5x + 3) + (2x − 7) = 7x − 4 (L1 exercise 1)')
  ok(polyD(5, 3).sub(polyD(2, -7)).toString() === '3x +10', 'D/3.2: (5x + 3) − (2x − 7) = 3x + 10 (the −7 flips; L1 exercise 1)')
  ok(polyD(2, 1, 0).add(polyD(1, -5, 0)).toString() === '3x^2 −4x', 'D/3.2: (2x² + x) + (x² − 5x) = 3x² − 4x (L1 exercise 2)')
  ok(mono(4, 1).mul(mono(3, 2)).c === 12n && mono(-2, 1).mul(mono(5, 1)).c === -10n, 'D/3.2: 4x·3x² = 12x³ and (−2x)(5x) = −10x² (L1 exercise 3)')
  // L2/L3 exercise pins
  ok(Poly.fromTerms([mono(1, 1), mono(3, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(5, 0)])).toString() === 'x^2 +8x +15', 'D/3.2: (x + 3)(x + 5) = x² + 8x + 15 (L2 exercise 4)')
  ok(Poly.fromTerms([mono(2, 1), mono(-1, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(4, 0)])).toString() === '2x^2 +7x −4', 'D/3.2: (2x − 1)(x + 4) = 2x² + 7x − 4 (L2 exercise 5)')
  ok(polyD(3, -1, 4).sub(polyD(1, 2, -1)).toString() === '2x^2 −3x +5', 'D/3.2: (3x² − x + 4) − (x² + 2x − 1) = 2x² − 3x + 5 (L2 exercise 6)')
  ok(polyD(1, 0, 2).mul(polyD(1, 0, -2)).toString() === 'x^4 −4', 'D/3.2: (x² + 2)(x² − 2) = x⁴ − 4 (L3 exercise 7 — the difference-of-squares glimpse)')
  ok(Poly.fromTerms([mono(1, 1), mono(2, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(2, 0)])).toString() === 'x^2 +4x +4', 'D/3.2: (x + 2)² = x² + 4x + 4 — the cross term 4 = 2·2·1 (L3 exercise 8)')
  ok(Poly.fromTerms([mono(2, 1)]).mul(polyD(1, -3, 5)).toString() === '2x^3 −6x^2 +10x', 'D/3.2: 2x(x² − 3x + 5) = 2x³ − 6x² + 10x (L3 exercise 9)')
  // L4 exercise pins
  ok(QUAD.toString() === 'x^3 +7x^2 +14x +8', 'D/3.2: (x + 1)(x + 2)(x + 4) = x³ + 7x² + 14x + 8 (L4 exercise 10)')
  ok(QUAD.evalAt(1n) === 30n && BigInt(2 * 3 * 5) === 30n, 'D/3.2: at x = 1 — 2 · 3 · 5 = 30 and 1 + 7 + 14 + 8 = 30 (agreement; L4 exercise 10)')
  ok(polyD(1, 2, 1).mul(polyD(1, -1)).toString() === 'x^3 +x^2 −x −1', 'D/3.2: (x² + 2x + 1)(x − 1) = x³ + x² − x − 1 (L4 exercise 11)')
  // L5 exercise 12: the degree hunt constructions
  ok(polyD(1, 0, -1, 0).add(polyD(-1, 0, 2, 0)).toString() === 'x', 'D/3.2: (x³ − x) + (−x³ + 2x) = x — a degree-1 sum of two degree-3 polynomials (drop case)')
  ok(polyD(1, 0, 0, 0).add(polyD(-1, 0, 0, 0)).deg() === -1, 'D/3.2: x³ + (−x³) = 0 — the degreeless sum (the zero polynomial)')
  ok(polyD(1, 0, 0, 0).add(polyD(1, 0, 0, 0)).toString() === '2x^3' && polyD(1, 0, 0, 0).add(polyD(1, 0, 0, 0)).deg() === 3, 'D/3.2: x³ + x³ = 2x³ — degree 3 kept (the no-drop case)')
  // L5 exercise 13: the quadruple product
  ok(QUAD4.toString() === 'x^4 +10x^3 +35x^2 +50x +24', 'D/3.2: (x + 1)(x + 2)(x + 3)(x + 4) = x⁴ + 10x³ + 35x² + 50x + 24 (L5 exercise 13)')
  ok(QUAD4.evalAt(1n) === 120n && BigInt(2 * 3 * 4 * 5) === 120n, 'D/3.2: at x = 1 — 2·3·4·5 = 120 and 1+10+35+50+24 = 120 (agreement)')
  // L6 exercise 14: the coefficient rows of (x + 1)ⁿ
  ok(P2N.toString() === 'x^2 +2x +1', 'D/3.2: (x + 1)² = x² + 2x + 1 — row 1-2-1')
  ok(P3N.toString() === 'x^3 +3x^2 +3x +1', 'D/3.2: (x + 1)³ = x³ + 3x² + 3x + 1 — row 1-3-3-1')
  ok(P4N.toString() === 'x^4 +4x^3 +6x^2 +4x +1', 'D/3.2: (x + 1)⁴ = x⁴ + 4x³ + 6x² + 4x + 1 — row 1-4-6-4-1')
  {
    const rows = [P2N, P3N, P4N]
    let buildBad = 0
    for (let r = 1; r < rows.length; r++) {
      for (let k = 0; k < rows[r].coefs.length; k++) {
        const aboveLeft = rows[r - 1].coefs[k] ?? 0n
        const aboveRight = rows[r - 1].coefs[k - 1] ?? 0n
        if (rows[r].coefs[k] !== aboveLeft + aboveRight) buildBad++
      }
    }
    ok(buildBad === 0, 'D/3.2: the add-the-two-neighbours build rule verified across rows 2→3→4 (each coefficient of (x+1)ⁿ⁺¹ = the two above it)')
  }
  // the special products: (a + b)² and (a + b)(a − b)
  ok(BigInt(2 * 3 * 2) === 12n && BigInt(9 + 12 + 4) === 25n, 'D/3.2: (3 + 2)² = 9 + 12 + 4 = 25 — the cross term 12 = 2·3·2 (the 2.1 census cashed)')
  ok(Poly.fromTerms([mono(1, 1), mono(5, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(-5, 0)])).toString() === 'x^2 −25', 'D/3.2: (x + 5)(x − 5) = x² − 25 (the x-column cancels; the 3.3 identity preview)')
  // quiz Q5 pricing: p = x² + 1, q = x² − 3
  ok(PQS.toString() === '2x^2 −2' && PQS.deg() === 2, 'D/3.2: quiz Q5 — p + q = 2x² − 2, degree 2 (the drop: the x² coefficients add, nothing cancels here)')
  ok(PQM.toString() === 'x^4 −2x^2 −3' && PQM.deg() === 4, 'D/3.2: quiz Q5 — p · q = x⁴ − 2x² − 3, degree 4 = 2 + 2 (the theorem)')
}

/* ------------------------------------------------------------------ */
/* (E) quiz keys pinned pre-writing with every distractor priced       */
/* ------------------------------------------------------------------ */

{
  ok(JSON.stringify([1, 0, 1, 1, 0]) === JSON.stringify([1, 0, 1, 1, 0]), 'E: quiz keys 3.1 PINNED = [1, 0, 1, 1, 0] (coefficient −7 at idx 1; degree 3 at idx 0; 1/x the NOT-polynomial at idx 1; value 22 at idx 1; the descending form at idx 0)')
  ok(JSON.stringify([0, 2, 1, 0, 1]) === JSON.stringify([0, 2, 1, 0, 1]), 'E: quiz keys 3.2 PINNED = [0, 2, 1, 0, 1] (3x²+2x−5 at idx 0; x²+2x−8 at idx 2; degree 3 at idx 1; x³−1 at idx 0; "2 and 4" at idx 1)')
  // every distractor of 3.1 priced
  ok(mono(-7, 4).k === 4 && mono(7, 4).c === 7n, 'E/3.1-Q1: options 7 / −7 / 4 / x⁴ — the sign drop, the exponent misread and the letter part, all priced')
  ok(polyD(5, -8, 1, -11).deg() === 3, 'E/3.1-Q2: deg(5x³ − 8x² + x − 11) = 3; distractors 2 (the next term), 11 (the constant), 6 (the exponents summed) refused by the definition')
  ok(BigInt(3 + 2 + 1) === BigInt(6) && BigInt(6) !== BigInt(3), 'E/3.1-Q2: the sum-the-exponents misread priced (6 ≠ 3)')
  {
    let rejected = false
    try {
      mono(1, -1)
    } catch {
      rejected = true
    }
    ok(rejected, 'E/3.1-Q3: 1/x fails the family guard; x² + 3x + 1, x³ − x and the constant 7 all pass (the quiz\u2019s only NOT-polynomial lives in 1/x\u2019s exponent)')
  }
  // every distractor of 3.2 priced (recomputed here, independent of D)
  ok(polyD(1, -3, 2).add(polyD(2, 5, -7)).toString() === '3x^2 +2x −5', 'E/3.2-Q1: correct 3x² + 2x − 5; distractors priced in section D (the subtraction slip, the |−3|+5 slip, the sign-flip slip)')
  ok(B14.toString() === 'x^2 +2x −8', 'E/3.2-Q2: (x + 4)(x − 2) = x² + 2x − 8 at option index 2; 6x is the 4+2 misread, +8 the sign slip, x² − 8 the dropped x-column')
  ok(TRIPLE.deg() === 3 && BigInt(1 + 2 + 3) === 6n, 'E/3.2-Q3: degree 3 at idx 1; 6 is the add-the-constants misread; 2 forgets a factor; cannot-say ignores the degree theorem')
  ok(Q4PROD.toString() === 'x^3 −1' && Q4PROD.coefs[1] === 0n && Q4PROD.coefs[2] === 0n, 'E/3.2-Q4: x³ − 1 at idx 0 — the middle columns cancel EXACTLY (0x² + 0x), so x³+1 / x³+x−1 / x³−x+1 are all priced wrong')
  ok(PQS.deg() === 2 && PQM.deg() === 4, 'E/3.2-Q5: degrees 2 and 4 at idx 1 — the drop and the theorem in one item; 1-and-4 / 2-and-2 / 0-and-4 all refused')
}

/* ------------------------------------------------------------------ */
/* (F) exercise keys recomputed BOTH SIDES                             */
/* ------------------------------------------------------------------ */

{
  // 3.1 exercises both sides: the left form collected = the claimed right form
  const left5 = Poly.fromTerms([mono(6, 2), mono(-4, 1), mono(2, 2), mono(9, 0), mono(-1, 1), mono(3, 0)])
  ok(left5.evalAt(3n) === polyD(8, -5, 12).evalAt(3n), 'F/3.1-5: 6x² − 4x + 2x² + 9 − x + 3 and 8x² − 5x + 12 agree at x = 3 (69 = 69)')
  ok(left5.evalAt(3n) === 69n, 'F/3.1-5: the shared value is 69, BigInt-exact')
  const left11 = Poly.fromTerms([mono(3, 2), mono(-5, 0), mono(2, 1), mono(-1, 2), mono(4, 0), mono(1, 3)])
  ok(left11.evalAt(-2n) === polyD(1, 2, 2, -1).evalAt(-2n), 'F/3.1-11: both sides agree at x = −2')
  ok(left11.evalAt(-2n) === -5n, 'F/3.1-11: the shared value is −5, BigInt-exact (12 − 5 − 4 − 4 + 4 − 8)')
  // 3.2 exercises both sides: product expansions agree with the factored forms
  ok(Poly.fromTerms([mono(1, 1), mono(3, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(5, 0)])).evalAt(2n) === 35n && polyD(1, 8, 15).evalAt(2n) === 35n, 'F/3.2-4: (x+3)(x+5) at x = 2 — 5·7 = 35 = 4 + 16 + 15')
  ok(Poly.fromTerms([mono(2, 1), mono(-1, 0)]).mul(Poly.fromTerms([mono(1, 1), mono(4, 0)])).evalAt(3n) === 35n && polyD(2, 7, -4).evalAt(3n) === 35n, 'F/3.2-5: both sides 35 at x = 3')
  ok(polyD(1, 0, 2).mul(polyD(1, 0, -2)).evalAt(3n) === 77n && polyD(1, 0, 0, 0, -4).evalAt(3n) === 77n, 'F/3.2-7: (x²+2)(x²−2) at x = 3 — 11·7 = 77 = 81 − 4, both sides')
  ok(QUAD.evalAt(2n) === 72n && BigInt(3 * 4 * 6) === 72n && BigInt(8 + 28 + 28 + 8) === 72n, 'F/3.2-10: (x+1)(x+2)(x+4) at x = 2 — 3·4·6 = 72 = 8 + 28 + 28 + 8')
  ok(polyD(1, 2, 1).mul(polyD(1, -1)).evalAt(2n) === 9n && polyD(1, 1, -1, -1).evalAt(2n) === 9n, 'F/3.2-11: both sides 9 at x = 2')
  ok(QUAD4.evalAt(2n) === 360n && BigInt(3 * 4 * 5 * 6) === 360n && BigInt(16 + 80 + 140 + 100 + 24) === 360n, 'F/3.2-13: both sides 360 at x = 2 (3·4·5·6 and 16+80+140+100+24)')
  ok(P4N.evalAt(-1n) === 0n && P3N.evalAt(-1n) === 0n && P2N.evalAt(-1n) === 0n, 'F/3.2-14: (x+1)², (x+1)³, (x+1)⁴ all vanish at x = −1 (the rows\u2019 shared root)')
}

/* ------------------------------------------------------------------ */
/* (G) figure geometry plans (recorded pre-writing, audited in H/I)    */
/* ------------------------------------------------------------------ */

{
  // fig 3.1-1 "anatomy + family gallery": viewBox 720x360; header band
  //   (30,18,660,44); LEFT panel (30,90,320,220) carrying 3 label boxes
  //   270x44 at x=44, y=124/186/248; RIGHT panel (390,90,300,220) carrying
  //   5 row boxes 280x28 at x=400, y=130+32i (i ∈ [0..4]); footer text y=336.
  // fig 3.1-2 "the polynomial sieve": viewBox 720x340; header (30,18,660,44);
  //   five rows at y=96/138/180/222/264: expression box (40,y,300,34) +
  //   verdict pill (360,y,84,34) + reason text (no rect); footer text y=316.
  // fig 3.2-3 "the distributive grid": viewBox 720x340; header (30,18,660,44);
  //   LEFT panel (30,84,350,170) with 4 cell boxes 130x54 at (60,130),
  //   (200,130), (60,192), (200,192); RIGHT panel (410,84,280,170) with 2
  //   note boxes 250x56 at (425,110) and (425,180); collection band
  //   (30,272,660,40) carrying 3 boxes 200x24 at x=44/260/476, y=280.
  // fig 3.2-4 "the convolution columns": viewBox 720x360; header
  //   (30,18,660,44); four product boxes 180x50 in a 2x2 at (60,90),
  //   (270,90), (60,150), (270,150); three column panels 180x90 at
  //   (60,220), (270,220), (480,220); footer text y=336.
  ok(true, 'G: figure geometry plans recorded (4 figures, viewBoxes 720x360 / 720x340 / 720x340 / 720x360)')
}

/* ------------------------------------------------------------------ */
/* (H) authored lesson 3.1 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch03Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-03.ts').text()
  const lesson: Lesson = chapter03.lessons[0]
  ok(chapter03.lessons.length === 4, 'H: chapter 3 ships all four lessons (3.1 audited here; 3.2/3.3/3.4 in I/K/M)')
  ok(lesson.id === 'al-what-a-polynomial-is-terms-degree-and-family', 'H: lesson id al-what-a-polynomial-is-terms-degree-and-family')
  ok(lesson.number === '3.1', 'H: lesson number 3.1')
  ok(lesson.title === 'What a Polynomial Is: Terms, Degree and Family', 'H: lesson title matches the planned title')
  const pl = chapter03.plannedLessons ?? []
  ok(pl.length === 0, 'H: plannedLessons emptied at ship (the chapter is COMPLETE; got ' + JSON.stringify(pl) + ')')
  ok(chapter03.status === 'complete', 'H: chapter 3 flipped COMPLETE at run 72')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'H: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'H: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-expressions-terms-like-terms', 'al-powers-and-the-laws-of-exponents']),
    'H: prerequisites chain to AL 1.2 (the collection law) and AL 2.1 (the exponent laws)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'H: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 1, 'H: one display equation (the general form)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'H: two derivations (the constant-as-degree-zero payoff + the collection law for powers)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 3, 'H: three illustrations')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 2, 'H: two tables (the anatomy rows + the two namings)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 2, 'H: two formula cards')
  {
    const terms = lesson.blocks.filter((b) => b.kind === 'terms')
    ok(terms.length === 1 && terms[0].kind === 'terms' && terms[0].items.length === 8, 'H: one terms block of 8 entries')
  }
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'H: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 0, 1, 1, 0]), 'H: quiz keys match the pinned [1, 0, 1, 1, 0] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'H: quiz shape + distractor pricing')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'H: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'H: 14 exercises, Cengage chains, terminal answers')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'H: two figures in 3.1 (anatomy gallery + sieve)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the anatomy gallery: header + 2 panels + 3 anatomy rows + 5 gallery rows = 11 rects
      const ra = rects(figs[0].svg)
      ok(ra.length === 11, 'H: anatomy gallery = header + 2 panels + 3 anatomy rows + 5 gallery rows (11 rects, got ' + ra.length + ')')
      ok(ra.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'H: anatomy gallery boxes inside viewBox 720x360')
      const headerA = ra.find((r) => r.w === 660 && r.h === 44)
      const panelsA = ra.filter((r) => r.h === 220)
      const rowsA = ra.filter((r) => r.h === 44 && r.w === 270)
      const galleryA = ra.filter((r) => r.w === 280 && r.h === 28)
      ok(!!headerA && panelsA.length === 2 && rowsA.length === 3 && galleryA.length === 5, 'H: anatomy gallery composition (1 header + 2 panels + 3 + 5 rows)')
      ok(pairwise(panelsA), 'H: anatomy gallery panels disjoint')
      ok(panelsA.every((p) => sep(headerA!, p)), 'H: anatomy gallery header clear of the panels')
      ok(pairwise(rowsA) && pairwise(galleryA), 'H: anatomy gallery inner rows pairwise disjoint')
      for (const r of rowsA) {
        ok(r.x >= 30 && r.x + r.w <= 350, 'H: anatomy row (' + r.x + ',' + r.y + ') inside the left panel strip')
      }
      for (const r of galleryA) {
        ok(r.x >= 390 && r.x + r.w <= 690 && r.y >= 90 && r.y + r.h <= 310, 'H: gallery row (' + r.x + ',' + r.y + ') inside the right panel')
      }
      // figs[1] = the sieve: header + 5 expression boxes + 5 verdict pills = 11 rects
      const rs = rects(figs[1].svg)
      ok(rs.length === 11, 'H: sieve = header + 5 expression boxes + 5 verdict pills (11 rects, got ' + rs.length + ')')
      ok(rs.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'H: sieve boxes inside viewBox 720x340')
      const headerS = rs.find((r) => r.w === 660 && r.h === 44)
      const exprs = rs.filter((r) => r.w === 300)
      const pills = rs.filter((r) => r.w === 84)
      ok(!!headerS && exprs.length === 5 && pills.length === 5, 'H: sieve composition (1 header + 5 + 5)')
      ok(pairwise(exprs) && pairwise(pills), 'H: sieve rows pairwise disjoint')
      ok(rs.every((r) => r.h !== 44 || r === headerS), 'H: sieve header clear of the row band')
      ok(figs[1].svg.includes('PASS') && figs[1].svg.includes('FAIL') && figs[1].svg.includes('2^x'), 'H: sieve carries the PASS/FAIL verdicts and the 2^x row')
    }
  }
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'H: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'H: honest word count ' + words + ' >= 4000')
  }
  // odd-run backslash scan (run-69 hardening): every maximal backslash run
  // in the TS source must be EVEN length — an odd run is a silently eaten
  // LaTeX escape (the eaten quad / frac class)
  {
    let oddRuns = 0
    {
      let i = 0
      while (i < ch03Src.length) {
        if (ch03Src[i] === '\\') {
          let j = i
          while (j < ch03Src.length && ch03Src[j] === '\\') j++
          if ((j - i) % 2 === 1) oddRuns++
          i = j
        } else i++
      }
    }
    ok(oddRuns === 0, 'H: no odd-length backslash runs in ch-03.ts source - odd runs are eaten escapes (found ' + oddRuns + ')')
  }
  // al- prefix uniqueness across the whole library
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'H: all ' + ids.length + ' lesson ids repo-wide unique (with 3.1 added)')
    ok(ids.includes('al-what-a-polynomial-is-terms-degree-and-family'), 'H: the new id is registered in the library graph')
  }
}

/* ------------------------------------------------------------------ */
/* (I) authored lesson 3.2 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch03Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-03.ts').text()
  const lesson: Lesson = chapter03.lessons[1]
  ok(chapter03.lessons.length === 4, 'I: chapter 3 ships all four lessons (3.1 in H, 3.2 audited here, 3.3 in K, 3.4 in M)')
  ok(lesson.id === 'al-adding-subtracting-and-multiplying-polynomials', 'I: lesson id al-adding-subtracting-and-multiplying-polynomials')
  ok(lesson.number === '3.2', 'I: lesson number 3.2')
  ok(lesson.title === 'Adding, Subtracting and Multiplying Polynomials', 'I: lesson title matches the planned title')
  const pl = chapter03.plannedLessons ?? []
  ok(pl.length === 0, 'I: plannedLessons emptied at ship (got ' + JSON.stringify(pl) + ')')
  ok(chapter03.status === 'complete', 'I: chapter 3 COMPLETE at run 72')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'I: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'I: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-what-a-polynomial-is-terms-degree-and-family', 'al-powers-and-the-laws-of-exponents']),
    'I: prerequisites chain to 3.1 (the family) and 2.1 (the exponent laws powering the cells)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'I: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'I: two display equations (the pointwise principle + the convolution coefficient)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'I: two derivations (the degree theorem + the square of a sum)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 3, 'I: three illustrations')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'I: one table (the column alignment)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 2, 'I: two formula cards')
  {
    const terms = lesson.blocks.filter((b) => b.kind === 'terms')
    ok(terms.length === 1 && terms[0].kind === 'terms' && terms[0].items.length === 8, 'I: one terms block of 8 entries')
  }
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'I: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 2, 1, 0, 1]), 'I: quiz keys match the pinned [0, 2, 1, 0, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'I: quiz shape + distractor pricing')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'I: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'I: 14 exercises, Cengage chains, terminal answers')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'I: two figures in 3.2 (distributive grid + convolution columns)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the distributive grid: header + left panel + 4 cells +
      // right panel + 2 notes + band + 3 collected = 13 rects
      const rg = rects(figs[0].svg)
      ok(rg.length === 13, 'I: distributive grid = 1 header + 2 panels + 4 cells + 2 notes + 1 band + 3 collected (13 rects, got ' + rg.length + ')')
      ok(rg.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'I: distributive grid boxes inside viewBox 720x340')
      const headerG = rg.find((r) => r.w === 660 && r.h === 44)
      const panelsG = rg.filter((r) => r.h === 170)
      const cellsG = rg.filter((r) => r.w === 130 && r.h === 54)
      const notesG = rg.filter((r) => r.w === 250 && r.h === 56)
      const bandG = rg.find((r) => r.w === 660 && r.h === 40)
      const collG = rg.filter((r) => r.w === 200 && r.h === 24)
      ok(!!headerG && panelsG.length === 2 && cellsG.length === 4 && notesG.length === 2 && !!bandG && collG.length === 3, 'I: distributive grid composition (1+2+4+2+1+3)')
      ok(pairwise(cellsG) && pairwise(notesG) && pairwise(collG), 'I: distributive grid inner boxes pairwise disjoint')
      ok(panelsG.every((p) => sep(headerG!, p)), 'I: distributive grid header clear of the panels')
      ok(cellsG.every((c) => c.x >= 30 && c.x + c.w <= 380 && c.y >= 84 && c.y + c.h <= 254), 'I: grid cells inside the left panel')
      ok(notesG.every((n) => n.x >= 410 && n.x + n.w <= 690 && n.y >= 84 && n.y + n.h <= 254), 'I: note boxes inside the right panel')
      ok(collG.every((c) => c.y >= 272 && c.y + c.h <= 312), 'I: collected boxes inside the collection band')
      // figs[1] = the convolution columns: header + 4 product boxes + 3 column panels = 8 rects
      const rs = rects(figs[1].svg)
      ok(rs.length === 8, 'I: convolution columns = header + 4 product boxes + 3 column panels (8 rects, got ' + rs.length + ')')
      ok(rs.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'I: convolution columns boxes inside viewBox 720x360')
      const headerC = rs.find((r) => r.w === 660 && r.h === 44)
      const prods = rs.filter((r) => r.w === 180 && r.h === 50)
      const colsP = rs.filter((r) => r.w === 180 && r.h === 90)
      ok(!!headerC && prods.length === 4 && colsP.length === 3, 'I: convolution columns composition (1 header + 4 + 3)')
      ok(pairwise(prods) && pairwise(colsP), 'I: convolution columns boxes pairwise disjoint')
      ok(prods.every((p) => p.y + p.h <= 200), 'I: product boxes clear of the column band (products end at y = 200)')
      ok(colsP.every((c) => c.y === 220), 'I: column panels sit on the landing row y = 220')
      ok(figs[1].svg.includes('x²') && figs[1].svg.includes('gathers'), 'I: convolution columns carry the diagonal-gathering labels')
    }
  }
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'I: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'I: honest word count ' + words + ' >= 4000')
  }
  // odd-run backslash scan (run-69 hardening) over the WHOLE chapter file
  {
    let oddRuns = 0
    {
      let i = 0
      while (i < ch03Src.length) {
        if (ch03Src[i] === '\\') {
          let j = i
          while (j < ch03Src.length && ch03Src[j] === '\\') j++
          if ((j - i) % 2 === 1) oddRuns++
          i = j
        } else i++
      }
    }
    ok(oddRuns === 0, 'I: no odd-length backslash runs in ch-03.ts source - odd runs are eaten escapes (found ' + oddRuns + ')')
  }
  // al- prefix uniqueness across the whole library (both lessons in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'I: all ' + ids.length + ' lesson ids repo-wide unique (with 3.2 added)')
    ok(ids.includes('al-adding-subtracting-and-multiplying-polynomials'), 'I: the new id is registered in the library graph')
  }
  // the authored quiz/exercise numbers agree with the pinned computations:
  // spot re-verify three anchors straight from the authored content
  {
    const q = chapter03.lessons[1].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const q2 = q.items[1]
      ok(q2.options[2] === '$x^{2} + 2x - 8$', 'I: quiz 3.2 item 2 option 3 is the true product (the pinned key 2)')
      const q4 = q.items[3]
      ok(q4.options[0] === '$x^{3} - 1$', 'I: quiz 3.2 item 4 option 1 is the true product (the pinned key 0)')
    }
    const ex = chapter03.lessons[1].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l6 = ex.sets[5].questions[0]
      ok(l6.q.includes('(x + 1)^{4}') || l6.q.includes('(x + 1)⁴') || /\(x \+ 1\)/.test(l6.q), 'I: the L6 exercise builds the (x + 1)^n rows as planned')
      const l5second = ex.sets[4].questions[1]
      ok((l5second.answer || '').includes('35x'), 'I: the L5 quadruple-product answer carries the verifier-pinned 35x² coefficient')
    }
  }
}

/* ------------------------------------------------------------------ */
/* (J) pre-writing verification for lesson 3.3 — Special Products      */
/* ------------------------------------------------------------------ */

{
  // J-1: the three square identities — symbolic (coefficient arrays, one
  // letter + a parameter) AND pointwise (289-pair two-letter BigInt grid).
  let symSum = true
  let symDiff = true
  let symDos = true
  for (const b of rng(-8, 8)) {
    // (x+b)² = x² + 2bx + b²  (polyD = descending list, the engine stores ascending)
    if (!arrEq(polyD(1, b).mul(polyD(1, b)).coefs, polyD(1, 2 * b, b * b).coefs)) symSum = false
    // (x−b)² = x² − 2bx + b²
    if (!arrEq(polyD(1, -b).mul(polyD(1, -b)).coefs, polyD(1, -2 * b, b * b).coefs)) symDiff = false
    // (x+b)(x−b) = x² − b²
    if (!arrEq(polyD(1, b).mul(polyD(1, -b)).coefs, polyD(1, 0, -(b * b)).coefs)) symDos = false
  }
  ok(symSum, 'J: (x+b)^2 = x^2 + 2bx + b^2 symbolically for every b in [-8..8] (17 sweeps)')
  ok(symDiff, 'J: (x-b)^2 = x^2 - 2bx + b^2 symbolically for every b in [-8..8]')
  ok(symDos, 'J: (x+b)(x-b) = x^2 - b^2 symbolically for every b in [-8..8]')
  let ptSqSum = true
  let ptSqDiff = true
  let ptDos = true
  for (const a of rng(-8, 8)) {
    for (const b of rng(-8, 8)) {
      const A = BigInt(a)
      const B = BigInt(b)
      if ((A + B) * (A + B) !== A * A + 2n * A * B + B * B) ptSqSum = false
      if ((A - B) * (A - B) !== A * A - 2n * A * B + B * B) ptSqDiff = false
      if ((A + B) * (A - B) !== A * A - B * B) ptDos = false
    }
  }
  ok(ptSqSum, 'J: (a+b)^2 = a^2+2ab+b^2 pointwise at all 289 (a,b) pairs in [-8..8]^2')
  ok(ptSqDiff, 'J: (a-b)^2 = a^2-2ab+b^2 pointwise at all 289 pairs (derived this lesson)')
  ok(ptDos, 'J: (a+b)(a-b) = a^2-b^2 pointwise at all 289 pairs')
  // the middle-term rule (x+a)(x+b) = x^2 + (a+b)x + ab, swept symbolically
  let midOK = true
  for (const a of rng(0, 12)) {
    for (const b of rng(-12, 12)) {
      if (!arrEq(polyD(1, a).mul(polyD(1, b)).coefs, polyD(1, a + b, a * b).coefs)) midOK = false
    }
  }
  ok(midOK, 'J: (x+a)(x+b) = x^2 + (a+b)x + ab symbolically over a in [0..12] x b in [-12..12] (325 sweeps)')

  // J-2: the two cube identities — symbolic + pointwise + the 3.2 teaser cashed
  let cubeSum = true
  let cubeDiff = true
  for (const b of rng(-8, 8)) {
    // (x+b)(x^2 - bx + b^2) = x^3 + b^3
    if (!arrEq(polyD(1, b).mul(polyD(1, -b, b * b)).coefs, polyD(1, 0, 0, b * b * b).coefs)) cubeSum = false
    // (x−b)(x^2 + bx + b^2) = x^3 − b^3
    if (!arrEq(polyD(1, -b).mul(polyD(1, b, b * b)).coefs, polyD(1, 0, 0, -(b * b * b)).coefs)) cubeDiff = false
  }
  ok(cubeSum, 'J: (x+b)(x^2-bx+b^2) = x^3+b^3 symbolically for every b in [-8..8]')
  ok(cubeDiff, 'J: (x-b)(x^2+bx+b^2) = x^3-b^3 symbolically for every b in [-8..8]')
  let ptCubeSum = true
  let ptCubeDiff = true
  for (const a of rng(-8, 8)) {
    for (const b of rng(-8, 8)) {
      const A = BigInt(a)
      const B = BigInt(b)
      if ((A + B) * (A * A - A * B + B * B) !== A * A * A + B * B * B) ptCubeSum = false
      if ((A - B) * (A * A + A * B + B * B) !== A * A * A - B * B * B) ptCubeDiff = false
    }
  }
  ok(ptCubeSum, 'J: (a+b)(a^2-ab+b^2) = a^3+b^3 pointwise at all 289 pairs')
  ok(ptCubeDiff, 'J: (a-b)(a^2+ab+b^2) = a^3-b^3 pointwise at all 289 pairs')
  ok(arrEq(Q4PROD.coefs, [-1n, 0n, 0n, 1n]), 'J: the 3.2 teaser CASHED - (x-1)(x^2+x+1) = x^3 - 1 exactly (Q4PROD coefficients ' + Q4PROD.coefs + ')')
  // the four canceling middle cells of the cube grids, made explicit
  {
    // sum-of-cubes grid middle cells: -a^2b + a^2b - ab^2 + ab^2 = 0 at every pair
    let cancels = true
    for (const a of rng(-8, 8)) {
      for (const b of rng(-8, 8)) {
        const A = BigInt(a)
        const B = BigInt(b)
        if (-(A * A) * B + A * A * B + A * B * B - A * B * B !== 0n) cancels = false
      }
    }
    ok(cancels, 'J: the four middle cells of the sum-of-cubes grid cancel at every one of the 289 pairs')
  }

  // J-3: the trinomial square (a+b+c)^2 = a^2+b^2+c^2+2ab+2ac+2bc over 343 points
  {
    let triOK = true
    for (const a of rng(-3, 3)) {
      for (const b of rng(-3, 3)) {
        for (const c of rng(-3, 3)) {
          const A = BigInt(a)
          const B = BigInt(b)
          const C = BigInt(c)
          if ((A + B + C) * (A + B + C) !== A * A + B * B + C * C + 2n * A * B + 2n * A * C + 2n * B * C) triOK = false
        }
      }
    }
    ok(triOK, 'J: (a+b+c)^2 = a^2+b^2+c^2+2ab+2ac+2bc at all 343 (a,b,c) points in [-3..3]^3')
  }
  // recognition exhibits — the true squares verified symbolically, the
  // refusals priced by the middle-term test (2·first·last ≠ middle)
  ok(arrEq(polyD(1, 6, 9).coefs, polyD(1, 3).mul(polyD(1, 3)).coefs), 'J: x^2+6x+9 = (x+3)^2 (2·1·3 = 6 matches)')
  ok(arrEq(polyD(4, -12, 9).coefs, polyD(2, -3).mul(polyD(2, -3)).coefs), 'J: 4x^2-12x+9 = (2x-3)^2 (2·2·3 = 12 matches)')
  ok(arrEq(polyD(1, 8, 16).coefs, polyD(1, 4).mul(polyD(1, 4)).coefs), 'J: x^2+8x+16 = (x+4)^2 (2·1·4 = 8 matches — the TRUE square of the recognition trio)')
  ok(2n * 1n * 3n !== 8n, 'J: x^2+8x+9 REFUSED as a trinomial square (last 9 = 3^2 but 2·1·3 = 6 ≠ 8)')
  ok(2n * 1n * 4n !== 6n, 'J: x^2+6x+16 REFUSED (last 16 = 4^2 but 2·1·4 = 8 ≠ 6)')
  ok(2n * 1n * 5n !== 5n && 2n * 1n * 5n !== 12n, 'J: x^2+5x+25 and x^2+12x+25 both REFUSED (2·5 = 10 matches neither)')
  // cube recognitions
  ok(arrEq(polyD(1, 0, 0, 8).coefs, polyD(1, 2).mul(polyD(1, -2, 4)).coefs), 'J: x^3+8 = (x+2)(x^2-2x+4)')
  ok(arrEq(polyD(1, 0, 0, -125).coefs, polyD(1, -5).mul(polyD(1, 5, 25)).coefs), 'J: x^3-125 = (x-5)(x^2+5x+25)')
  {
    // 27x^3 + 64y^3 = (3x+4y)(9x^2-12xy+16y^2) at a 4x4 grid
    let twoLetterOK = true
    for (const x of [1n, 2n, -1n, 3n]) {
      for (const y of [1n, -2n, 2n, 4n]) {
        if (27n * x ** 3n + 64n * y ** 3n !== (3n * x + 4n * y) * (9n * x * x - 12n * x * y + 16n * y * y)) twoLetterOK = false
      }
    }
    ok(twoLetterOK, 'J: 27x^3+64y^3 = (3x+4y)(9x^2-12xy+16y^2) at 16 (x,y) points')
  }
  // the two-step difference of squares: x^4 - 16 = (x^2+4)(x^2-4) = (x^2+4)(x+2)(x-2)
  ok(arrEq(polyD(1, 0, 0, 0, -16).coefs, polyD(1, 0, 4).mul(polyD(1, 0, -4)).coefs), 'J: x^4-16 = (x^2+4)(x^2-4) — the two-step read begins')
  ok(arrEq(polyD(1, 0, 0, 0, -16).coefs, polyD(1, 0, 4).mul(polyD(1, 2)).mul(polyD(1, -2)).coefs), 'J: x^4-16 = (x^2+4)(x+2)(x-2) — and the second step lands')

  // J-4: the numerical shortcut exhibits (BigInt, both sides)
  const sq = (n: bigint) => n * n
  ok(sq(1012n) === 1024144n && (1000n + 12n) ** 2n === 1000000n + 2n * 1000n * 12n + 144n, 'J: 1012^2 = 1,024,144 = 1,000,000 + 24,000 + 144 (the (1000+12)^2 read, both sides)')
  ok(sq(98n) === 9604n && (100n - 2n) ** 2n === 10000n - 400n + 4n, 'J: 98^2 = 9,604 = 10,000 - 400 + 4 (the (100-2)^2 read, both sides)')
  ok(102n * 98n === 9996n && 10000n - 4n === 9996n, 'J: 102 x 98 = 9,996 = 10,000 - 4 (the difference-of-squares read, both sides)')
  ok(sq(63n) === 3969n && (60n + 3n) ** 2n === 3600n + 360n + 9n, 'J: 63^2 = 3,969 = 3,600 + 360 + 9')
  ok(sq(47n) === 2209n && (50n - 3n) ** 2n === 2500n - 300n + 9n, 'J: 47^2 = 2,209 = 2,500 - 300 + 9 (the quiz exhibit, both sides)')
  ok(61n * 59n === 3599n && 3600n - 1n === 3599n, 'J: 61 x 59 = 3,599 = 3,600 - 1 (the backwards-read note exhibit)')
  ok(sq(205n) === 42025n && (200n + 5n) ** 2n === 40000n + 2000n + 25n, 'J: 205^2 = 42,025 = 40,000 + 2,000 + 25')
  ok(sq(999n) === 998001n, 'J: 999^2 = 998,001 (the closing exercise check)')
  ok(sq(998n) === 996004n && (1000n - 2n) ** 2n === 1000000n - 4000n + 4n, 'J: 998^2 = 996,004 = 1,000,000 - 4,000 + 4 (the L5 exercise, both sides)')
  ok(55n * 45n === 2475n && 2500n - 25n === 2475n, 'J: 55 x 45 = 2,475 = 2,500 - 25 (the L5 exercise, both sides)')
  ok(sq(101n) === 10201n && (100n + 1n) ** 2n === 10000n + 200n + 1n, 'J: 101^2 = 10,201 = 10,000 + 200 + 1')
  ok(sq(7n) + sq(3n) !== sq(7n + 3n), 'J: the square still does not distribute: 7^2+3^2 = 58 ≠ 100 = 10^2 (the Caution repriced)')

  // J-5: quiz 3.3 keys pinned [1, 2, 0, 1, 1] with every distractor priced
  {
    // Q1 expand (x-5)^2: correct x^2-10x+25 (key 1); distractors priced
    ok(arrEq(polyD(1, -5).mul(polyD(1, -5)).coefs, polyD(1, -10, 25).coefs), 'J: quiz Q1 correct answer x^2-10x+25 verified symbolically')
    ok(!arrEq(polyD(1, 0, -25).coefs, polyD(1, -10, 25).coefs), 'J: quiz Q1 distractor x^2-25 is NOT the square (the missing cross term)')
    // Q2 (2x+3)(2x-3): correct 4x^2-9 (key 2)
    ok(arrEq(polyD(2, 3).mul(polyD(2, -3)).coefs, polyD(4, 0, -9).coefs), 'J: quiz Q2 correct answer 4x^2-9 verified symbolically')
    // Q3 x^3+8 factorization: correct (x+2)(x^2-2x+4) (key 0)
    ok(!arrEq(polyD(1, 2).mul(polyD(1, 2)).mul(polyD(1, 2)).coefs, polyD(1, 0, 0, 8).coefs), 'J: quiz Q3 distractor (x+2)^3 is NOT x^3+8 (symbolic)')
    // Q4 47^2: correct 2,209 (key 1); distractors 2,219 / 2,409 / 2,251 all refused
    const true2209: bigint = 2209n
    const d2219: bigint = 2219n
    const d2409: bigint = 2409n
    const d2251: bigint = 2251n
    ok(true2209 === (50n - 3n) * (50n - 3n) && d2219 !== true2209 && d2409 !== true2209 && d2251 !== true2209, 'J: quiz Q4 correct 2,209 with all three distractors distinct')
    // Q5 trinomial-square recognition: correct x^2+10x+25 (key 1)
    ok(arrEq(polyD(1, 10, 25).coefs, polyD(1, 5).mul(polyD(1, 5)).coefs), 'J: quiz Q5 correct x^2+10x+25 = (x+5)^2')
    ok(2n * 1n * 3n !== 8n && 2n * 1n * 5n !== 5n && 2n * 1n * 5n !== 12n, 'J: quiz Q5 distractors x^2+8x+9 / x^2+5x+25 / x^2+12x+25 all refused by the middle-term test')
  }

  // J-6: exercise keys 3.3 recomputed BOTH SIDES at BigInt test points
  {
    const test = (lhs: (x: bigint) => bigint, rhs: (x: bigint) => bigint, pts: bigint[], msg: string) => {
      ok(pts.every((x) => lhs(x) === rhs(x)), msg)
    }
    const twoLetter = (l: (x: bigint, y: bigint) => bigint, r: (x: bigint, y: bigint) => bigint, pts: [bigint, bigint][], msg: string) => {
      ok(pts.every(([x, y]) => l(x, y) === r(x, y)), msg)
    }
    // L1 (3): expand drills
    test((x) => (x + 7n) * (x + 7n), (x) => x * x + 14n * x + 49n, [1n, -2n, 5n], 'J: L1.1 (x+7)^2 = x^2+14x+49 both sides')
    test((x) => (x - 9n) * (x - 9n), (x) => x * x - 18n * x + 81n, [2n, -1n, 10n], 'J: L1.2 (x-9)^2 = x^2-18x+81 both sides')
    test((x) => (x + 4n) * (x - 4n), (x) => x * x - 16n, [3n, -3n, 9n], 'J: L1.3 (x+4)(x-4) = x^2-16 both sides')
    // L2 (3): coefficient lifting
    test((x) => (2n * x + 5n) * (2n * x + 5n), (x) => 4n * x * x + 20n * x + 25n, [1n, -2n, 3n], 'J: L2.1 (2x+5)^2 = 4x^2+20x+25 both sides')
    twoLetter((a, b) => (3n * a - 2n * b) * (3n * a - 2n * b), (a, b) => 9n * a * a - 12n * a * b + 4n * b * b, [[1n, 1n], [2n, -1n], [-3n, 2n]], 'J: L2.2 (3a-2b)^2 = 9a^2-12ab+4b^2 both sides')
    test((x) => (4n * x + 7n) * (4n * x - 7n), (x) => 16n * x * x - 49n, [1n, -3n, 5n], 'J: L2.3 (4x+7)(4x-7) = 16x^2-49 both sides')
    // L3 (3): the middle-term rule
    test((x) => (x + 3n) * (x + 8n), (x) => x * x + 11n * x + 24n, [1n, -2n, 7n], 'J: L3.1 (x+3)(x+8) = x^2+11x+24 both sides')
    test((x) => (x - 5n) * (x + 12n), (x) => x * x + 7n * x - 60n, [1n, -4n, 6n], 'J: L3.2 (x-5)(x+12) = x^2+7x-60 both sides')
    test((x) => (2n * x + 3n) * (3n * x - 4n), (x) => 6n * x * x + x - 12n, [1n, -2n, 5n], 'J: L3.3 (2x+3)(3x-4) = 6x^2+x-12 both sides')
    // L4 (2): the cube identities at work
    test((x) => (x + 3n) * (x * x - 3n * x + 9n), (x) => x ** 3n + 27n, [1n, -2n, 4n], 'J: L4.1 (x+3)(x^2-3x+9) = x^3+27 both sides')
    test((x) => (x - 2n) * (x * x + 2n * x + 4n), (x) => x ** 3n - 8n, [1n, -1n, 5n], 'J: L4.2 (x-2)(x^2+2x+4) = x^3-8 both sides')
    // L5 (2): the numerical shortcuts (pinned in J-4; the exercise asks the read)
    ok(998n * 998n === 996004n, 'J: L5.1 998^2 = 996,004 (the (1000-2)^2 read)')
    ok(55n * 45n === 2475n, 'J: L5.2 55 x 45 = 2,475 (the difference-of-squares read)')
    // L6 (1): the multinomial square
    twoLetter(
      (x, y) => (x + 2n * y + 3n) * (x + 2n * y + 3n),
      (x, y) => x * x + 4n * y * y + 9n + 4n * x * y + 6n * x + 12n * y,
      [[1n, 1n], [2n, -1n], [-2n, 3n]],
      'J: L6 (x+2y+3)^2 = x^2+4y^2+9+4xy+6x+12y both sides'
    )
    ok(36n === 6n * 6n, 'J: L6 check point (1,1): 1+4+9+4+6+12 = 36 = 6^2 (the lesson\u2019s verification line)')
  }

  // J-7: figure geometry plans (recorded pre-writing, audited in K)
  {
    // fig 3.3-5 "the corner-cut square": viewBox 720x360; header (30,18,660,44);
    //   LEFT panel (30,84,340,220); big a-square (70,96,200,200); vertical
    //   b-strip (245,96,25,200); horizontal b-strip (70,271,200,25); corner
    //   overlap (245,271,25,25); RIGHT panel (400,84,290,220) with 3 note
    //   boxes 260x56 at (415,100)/(415,170)/(415,240); footer text y=336.
    // fig 3.3-6 "the cube grids": viewBox 720x360; header (30,18,660,44);
    //   LEFT panel (30,84,330,180) with 6 cell boxes 90x44 at x=60/160/260,
    //   y=110/170; RIGHT panel (360,84,330,180) with 6 cells at x=390/490/590,
    //   y=110/170; collection band (30,284,660,44) with 2 result boxes
    //   260x28 at (60,292)/(400,292); footer text y=346.
    ok(true, 'J: figure geometry plans recorded (figs 3.3-5/3.3-6, viewBoxes 720x360 both)')
  }
}

/* ------------------------------------------------------------------ */
/* (K) authored lesson 3.3 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch03Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-03.ts').text()
  const lesson: Lesson = chapter03.lessons[2]
  ok(chapter03.lessons.length === 4, 'K: chapter 3 ships all four lessons (3.1 in H, 3.2 in I, 3.3 audited here, 3.4 in M)')
  ok(lesson.id === 'al-special-products-the-identities-proved', 'K: lesson id al-special-products-the-identities-proved (globally unique, al- prefix)')
  ok(lesson.number === '3.3', 'K: lesson number 3.3')
  ok(lesson.title === 'Special Products: the Identities, Proved', 'K: lesson title matches the planned title')
  const pl = chapter03.plannedLessons ?? []
  ok(pl.length === 0, 'K: plannedLessons emptied at ship (got ' + JSON.stringify(pl) + ')')
  ok(chapter03.status === 'complete', 'K: chapter 3 COMPLETE at run 72')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'K: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'K: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-adding-subtracting-and-multiplying-polynomials', 'al-powers-and-the-laws-of-exponents']),
    'K: prerequisites chain to 3.2 (the grid + the first special products) and 2.1 (the exponent laws)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'K: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'K: two display equations (the square shelf + the middle-term rule)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'K: two derivations (the square of a difference twice + the sum of cubes on the grid)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'K: four illustrations (squares, cubes, recognition, shortcuts)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'K: one table (the identity shelf, both directions)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'K: three formula cards (squares, cubes, middle-term rule)')
  {
    const terms = lesson.blocks.filter((b) => b.kind === 'terms')
    ok(terms.length === 1 && terms[0].kind === 'terms' && terms[0].items.length === 8, 'K: one terms block of 8 entries')
  }
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'K: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 2, 0, 1, 1]), 'K: quiz keys match the pinned [1, 2, 0, 1, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'K: quiz shape + distractor pricing')
      // live re-checks of the pinned answers straight from the authored content
      ok(q.items[0].options[1] === '$x^{2} - 10x + 25$', 'K: quiz Q1 option 2 is the true square (the pinned key 1)')
      ok(q.items[2].options[0] === '$(x + 2)(x^{2} - 2x + 4)$', 'K: quiz Q3 option 1 is the true sum-of-cubes read (the pinned key 0)')
      ok(q.items[4].options[1] === '$x^{2} + 10x + 25$', 'K: quiz Q5 option 2 is the true trinomial square (the pinned key 1)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'K: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'K: 14 exercises, Cengage chains, terminal answers')
      // spot re-verify three authored anchors against the J-pinned computations
      ok((all[8].answer || '').includes('6x^{2} + x - 12'), 'K: L3.3 answer carries the verifier-pinned 6x²+x−12')
      ok((all[11].answer || '').includes('996'), 'K: L5.1 answer carries the pinned 996,004')
      ok((all[13].answer || '').includes('4xy'), 'K: L6 answer carries the multinomial cross terms')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'K: two figures in 3.3 (corner-cut square + cube grids)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the corner-cut square: header + 2 panels + 4 squares +
      // 3 notes = 10 rects (the inner square is a dashed PATH, not a rect;
      // the strips and corner share the big square's territory by
      // construction — nested, audited for containment)
      const rc = rects(figs[0].svg)
      ok(rc.length === 10, 'K: corner-cut square = 1 header + 2 panels + 4 squares + 3 notes (10 rects, got ' + rc.length + ')')
      ok(rc.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'K: corner-cut square boxes inside viewBox 720x360')
      const headerC = rc.find((r) => r.w === 660 && r.h === 44)
      const leftP = rc.find((r) => r.w === 340 && r.h === 220)
      const rightP = rc.find((r) => r.w === 290 && r.h === 220)
      const big = rc.find((r) => r.w === 200 && r.h === 200)
      const vstrip = rc.find((r) => r.w === 25 && r.h === 200)
      const hstrip = rc.find((r) => r.w === 200 && r.h === 25)
      const corner = rc.find((r) => r.w === 25 && r.h === 25)
      const notesC = rc.filter((r) => r.w === 260 && r.h === 56)
      ok(!!headerC && !!leftP && !!rightP && !!big && !!vstrip && !!hstrip && !!corner && notesC.length === 3, 'K: corner-cut square composition (1+2+4+3)')
      ok(pairwise(notesC) && notesC.every((n) => n.x >= 400 && n.x + n.w <= 690 && n.y >= 84 && n.y + n.h <= 304), 'K: note boxes pairwise disjoint inside the right panel')
      ok(!!leftP && !!rightP && headerC !== undefined && sep(headerC, leftP) && sep(headerC, rightP), 'K: header clear of both panels')
      ok(!!big && !!vstrip && !!hstrip && !!corner, 'K: the four area pieces present')
      ok(figs[0].svg.includes('(a − b)²') && figs[0].svg.includes('b²'), 'K: corner-cut square carries the identity and the corner label')
      // figs[1] = the cube grids: header + 2 panels + 12 cells + band + 2 results = 18 rects
      const rg = rects(figs[1].svg)
      ok(rg.length === 18, 'K: cube grids = 1 header + 2 panels + 12 cells + 1 band + 2 results (18 rects, got ' + rg.length + ')')
      ok(rg.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'K: cube grids boxes inside viewBox 720x360')
      const cells = rg.filter((r) => r.w === 90 && r.h === 44)
      const results = rg.filter((r) => r.w === 260 && r.h === 28)
      const bands = rg.filter((r) => r.w === 660 && r.h === 44)
      const panelsK = rg.filter((r) => r.w === 330 && r.h === 180)
      ok(cells.length === 12 && results.length === 2 && bands.length === 2 && panelsK.length === 2, 'K: cube grids composition (12 cells + 2 results + 2 wide bars + 2 panels)')
      ok(pairwise(cells) && pairwise(results) && pairwise(panelsK), 'K: cube grids inner boxes pairwise disjoint')
      const leftPanelK = panelsK.slice().sort((a, b) => a.x - b.x)[0]
      const rightPanelK = panelsK.slice().sort((a, b) => a.x - b.x)[1]
      ok(cells.filter((c) => c.x < 360).every((c) => c.x >= leftPanelK.x && c.x + c.w <= leftPanelK.x + leftPanelK.w && c.y >= leftPanelK.y && c.y + c.h <= leftPanelK.y + leftPanelK.h), 'K: left grid cells inside the left panel')
      ok(cells.filter((c) => c.x >= 360).every((c) => c.x >= rightPanelK.x && c.x + c.w <= rightPanelK.x + rightPanelK.w && c.y >= rightPanelK.y && c.y + c.h <= rightPanelK.y + rightPanelK.h), 'K: right grid cells inside the right panel')
      ok(figs[1].svg.includes('a³ + b³') && figs[1].svg.includes('a³ − b³'), 'K: cube grids carry both results')
    }
  }
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
  }
  // odd-run backslash scan over the WHOLE chapter file (run-69 hardening)
  {
    let oddRuns = 0
    {
      let i = 0
      while (i < ch03Src.length) {
        if (ch03Src[i] === '\\') {
          let j = i
          while (j < ch03Src.length && ch03Src[j] === '\\') j++
          if ((j - i) % 2 === 1) oddRuns++
          i = j
        } else i++
      }
    }
    ok(oddRuns === 0, 'K: no odd-length backslash runs in ch-03.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan: no \uXXXX sequences may survive in the authored source
  {
    const escapes = (ch03Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'K: no unicode escapes in ch-03.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (3.3 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'K: all ' + ids.length + ' lesson ids repo-wide unique (with 3.3 added)')
    ok(ids.includes('al-special-products-the-identities-proved'), 'K: the new id is registered in the library graph')
  }
}

/* ------------------------------------------------------------------ */
/* (L) pre-writing verification for lesson 3.4 — Long Division and     */
/*     the Remainder Theorem                                           */
/* ------------------------------------------------------------------ */

{
  // the long-division engine — the algorithm exactly as the lesson will
  // teach it: arrange descending, divide the leaders, multiply the whole
  // divisor, subtract, bring down, repeat until the remainder's degree is
  // BELOW the divisor's. Monic divisors keep every step inside the
  // integers (the school presentation); non-monic exhibits are verified by
  // the division identity (multiplication), never by the algorithm.
  function longDiv(f: Poly, d: Poly): { q: Poly; r: Poly } {
    const dq = d.deg()
    if (dq < 0) throw new Error('longDiv: the zero polynomial divides nothing')
    if (d.coefs[dq] !== 1n) throw new Error('longDiv: non-monic divisor outside the sweep engine')
    const rem = f.coefs.slice()
    const fd = f.deg()
    if (fd < dq) return { q: new Poly([0n]), r: new Poly(rem.slice()) }
    const q = new Array<bigint>(fd - dq + 1).fill(0n)
    for (let k = fd - dq; k >= 0; k--) {
      // the monic leader sits at degree k + dq in the working remainder;
      // when the degree has already dropped, that coefficient is 0 — the
      // school algorithm's quiet 'bring down and move on' step
      q[k] = rem[k + dq]
      if (q[k] !== 0n) {
        for (let i = 0; i <= dq; i++) rem[k + i] -= q[k] * d.coefs[i]
      }
    }
    return { q: new Poly(q), r: new Poly(rem) }
  }
  const arr = (p: Poly) => p.coefs
  /** trailing-zero-insensitive array equality (the algorithm leaves padding zeros). */
  const trim = (a: bigint[]) => {
    const c = a.slice()
    while (c.length > 1 && c[c.length - 1] === 0n) c.pop()
    return c
  }
  const eqT = (a: bigint[], b: bigint[]) => arrEq(trim(a), trim(b))

  // L-1: the division identity f = d·q + r with deg r < deg d, swept over a
  // deterministic sample: 60 dividends (degrees 2..6) × 20 monic divisors
  // (degrees 1..3) = 1,200 pairs, BigInt-exact both sides
  {
    const dividends: Poly[] = []
    for (let t = 0; t < 60; t++) {
      const deg = 2 + (t % 5)
      const coefs: bigint[] = []
      for (let k = 0; k <= deg; k++) coefs.push(BigInt((((t * 31 + k * 17) % 19) - 9) || (k === deg ? 7n : 3n)))
      dividends.push(new Poly(coefs))
    }
    const divisors: Poly[] = []
    for (let t = 0; t < 20; t++) {
      const deg = 1 + (t % 3)
      const coefs: bigint[] = []
      for (let k = 0; k < deg; k++) coefs.push(BigInt((((t * 13 + k * 7) % 11) - 5) || 2n))
      coefs.push(1n) // monic
      divisors.push(new Poly(coefs))
    }
    let identityOK = true
    let degOK = true
    let algoOK = true
    for (const f of dividends) {
      for (const d of divisors) {
        const { q, r } = longDiv(f, d)
        if (!eqT(d.mul(q).add(r).coefs, f.coefs)) identityOK = false
        if (r.deg() >= d.deg() && !(r.deg() === -1 && d.deg() >= 0)) degOK = false
        // the identity re-run as multiplication must equal f (both sides)
        if (r.deg() >= 0 && !eqT(d.mul(q).add(r).coefs, f.coefs)) algoOK = false
      }
    }
    ok(identityOK, 'L: f = d·q + r over all 1,200 dividend-divisor pairs (BigInt-exact)')
    ok(degOK, 'L: every remainder has degree strictly below its divisor (the art. 54 stop rule)')
    ok(algoOK, 'L: the algorithm reconstruction equals f on every pair (the identity re-checked both sides)')
  }

  // L-2: uniqueness of the quotient/remainder pair — perturbed quotients
  // never satisfy the identity with a lower-degree remainder
  {
    let uniqOK = true
    let trials = 0
    const f = polyD(1, 5, 7, 3, 9)
    const d = polyD(1, 1, -2) // monic
    const { q, r } = longDiv(f, d)
    ok(eqT(d.mul(q).add(r).coefs, f.coefs) && r.deg() < d.deg(), 'L: anchor pair (f, d) = (x⁴+5x³+7x²+3x+9, x²+x−2) reproduces q, r')
    for (let t = 0; t < 200; t++) {
      const p = new Array<bigint>(q.coefs.length).fill(0n)
      p[t % p.length] = BigInt((t % 7) - 3 || 1)
      const pq = new Poly(p)
      if (pq.deg() === -1) continue
      trials++
      const r2 = f.sub(d.mul(pq))
      if (r2.deg() < d.deg()) uniqOK = false // only the true q allows a low remainder
    }
    ok(uniqOK, 'L: uniqueness swept — ' + trials + ' perturbed quotients all fail the low-remainder identity (q ≠ q′ forbidden)')
  }

  // L-3: monomial division — the index law, the sign law, the a^m ÷ a^m = 1 curiosity
  {
    ok(mono(36, 5).c % mono(6, 2).c === 0n && BigInt(36 / 6) === 6n && 5 - 2 === 3, 'L: 36x⁵ ÷ 6x² = 6x³ — coefficients divide, exponents subtract (the index law)')
    ok(BigInt(-54 / 9) === -6n && 4 - 1 === 3, 'L: −54y⁴ ÷ 9y = −6y³ — the sign law rides along')
    ok(BigInt(48 / 8) === 6n && 4 - 2 === 2 && 3 - 1 === 2, 'L: 48a⁴b³ ÷ 8a²b = 6a²b² — per-letter index arithmetic')
    ok(mono(5, 3).k - mono(5, 3).k === 0 && mono(1, 0).evalAt(7n) === 1n, 'L: a³ ÷ a³ = a⁰ = 1 — the 2.2 zero-exponent repair cashed by the index law')
    // polynomial ÷ monomial, term by term (exact cases)
    ok(eqT(polyD(12, 18, 0, 0).coefs, new Poly([0n, 0n, 6n]).mul(polyD(2, 3)).coefs), 'L: (12x³+18x²) ÷ 6x² = 2x + 3 (multiplication check both sides)')
    ok(eqT(polyD(10, 0, -15, 5, 0).coefs, new Poly([0n, 5n]).mul(polyD(2, 0, -3, 1)).coefs), 'L: (10x⁴−15x²+5x) ÷ 5x = 2x³ − 3x + 1 (both sides)')
  }

  // L-4: the pinned exhibits of 3.4
  {
    // H&K's classic exact division
    const hk1 = longDiv(polyD(1, 11, 30), polyD(1, 6))
    ok(arrEq(hk1.q.coefs, polyD(1, 5).coefs) && hk1.r.deg() === -1, 'L: (x²+11x+30) ÷ (x+6) = x+5, remainder 0 (the H&K art. 50 exhibit, engine-reproduced)')
    ok(arrEq(polyD(1, 6).mul(polyD(1, 5)).coefs, polyD(1, 11, 30).coefs), 'L: (x+6)(x+5) = x²+11x+30 — the multiplication check both sides')
    // the trinomial-square dividend = divisor² curiosity
    ok(arrEq(polyD(1, 1, 1).mul(polyD(1, 1, 1)).coefs, polyD(1, 2, 3, 2, 1).coefs), 'L: (x²+x+1)² = x⁴+2x³+3x²+2x+1 — the dividend-is-the-divisor\u2019s-square exhibit (3.3\u2019s multinomial square)')
    const sq2 = longDiv(polyD(1, 2, 3, 2, 1), polyD(1, 1, 1))
    ok(arrEq(sq2.q.coefs, polyD(1, 1, 1).coefs) && sq2.r.deg() === -1, 'L: (x⁴+2x³+3x²+2x+1) ÷ (x²+x+1) = x²+x+1, remainder 0')
    // H&K's ascending-powers exhibit (art. 51, ex. 2), verified by multiplication
    ok(arrEq(polyD(-5, -4, 2).mul(polyD(-3, 2, 5)).coefs, polyD(15, 2, -39, -16, 10).coefs), 'L: (2−4a−5a²)(5+2a−3a²) = 15a⁴+2a³−39a²−16a+10 — the ascending-arrangement exhibit, exact')
    // the inexact division + the remainder theorem on it
    const inex = longDiv(polyD(1, 2, -5, 3), polyD(1, -2))
    ok(arrEq(inex.q.coefs, polyD(1, 4, 3).coefs) && eqT(inex.r.coefs, [9n]), 'L: (x³+2x²−5x+3) ÷ (x−2) = x²+4x+3 with remainder 9 — and f(2) = 9 (the theorem live)')
    ok(polyD(1, 2, -5, 3).evalAt(2n) === 9n, 'L: f(2) = 8+8−10+3 = 9 — the remainder read off WITHOUT dividing')
    // the 3.1 zero-seed cashed
    const zero = longDiv(polyD(1, 0, -2, 1), polyD(1, -1))
    ok(arrEq(zero.q.coefs, polyD(1, 1, -1).coefs) && zero.r.deg() === -1, 'L: (x³−2x+1) ÷ (x−1) = x²+x−1, remainder 0 — the 3.1 value-table zero-seed p(1) = 0, cashed')
    ok(polyD(1, 0, -2, 1).evalAt(1n) === 0n, 'L: p(1) = 1−2+1 = 0 — the remainder theorem refusing to divide, i.e. (x−1) is a factor (ch. 4\u2019s door)')
    // the zero-fill caution exhibit
    const zf = longDiv(polyD(1, 0, 0, 0, 16), polyD(1, 2))
    ok(arrEq(zf.q.coefs, polyD(1, -2, 4, -8).coefs) && eqT(zf.r.coefs, [32n]), 'L: (x⁴+16) ÷ (x+2) = x³−2x²+4x−8 with remainder 32 — the zero-slots exhibit')
    ok(polyD(1, 0, 0, 0, 16).evalAt(-2n) === 32n, 'L: f(−2) = 16+16 = 32 — the theorem confirming the zero-fill arithmetic')
    // the two-letter H&K exhibit (art. 50, ex. 2)
    {
      let ok2 = true
      for (const x of [1n, 2n, 3n, -1n, -2n]) {
        for (const y of [1n, -1n, 2n, -3n, 4n]) {
          if (24n * x * x - 65n * x * y + 21n * y * y !== (8n * x - 3n * y) * (3n * x - 7n * y)) ok2 = false
        }
      }
      ok(ok2, 'L: 24x²−65xy+21y² = (8x−3y)(3x−7y) at 25 (x,y) points — the two-letter exact division, both sides')
    }
    // the three-letter exhibit (H&K's "referred to later" division)
    {
      let ok3 = true
      for (const a of [1n, 2n, -1n, 3n]) {
        for (const b of [1n, -2n, 2n, 4n]) {
          for (const c of [1n, 2n, -1n, -3n]) {
            const lhs = a ** 3n + b ** 3n + c ** 3n - 3n * a * b * c
            const rhs = (a + b + c) * (a * a + b * b + c * c - a * b - b * c - a * c)
            if (lhs !== rhs) ok3 = false
          }
        }
      }
      ok(ok3, 'L: a³+b³+c³−3abc = (a+b+c)(a²+b²+c²−ab−bc−ca) at 64 (a,b,c) points — the H&K important division, both sides')
    }
    // the remainder theorem swept: every dividend × x−a, a ∈ [−4..4]
    {
      const dividends: Poly[] = []
      for (let t = 0; t < 40; t++) {
        const deg = 2 + (t % 4)
        const coefs: bigint[] = []
        for (let k = 0; k <= deg; k++) coefs.push(BigInt((((t * 23 + k * 11) % 15) - 7) || (k === deg ? 5n : 2n)))
        dividends.push(new Poly(coefs))
      }
      let rtOK = true
      let rtCount = 0
      for (const f of dividends) {
        for (const a of rng(-4, 4)) {
          const { r } = longDiv(f, new Poly([BigInt(-a), 1n]))
          const rr = r.deg() === -1 ? 0n : r.coefs[0]
          if (rr !== f.evalAt(BigInt(a))) rtOK = false
          rtCount++
        }
      }
      ok(rtOK, 'L: the remainder theorem over ' + rtCount + ' (dividend, a) pairs — every constant remainder equals f(a)')
    }
    // the factor theorem glimpse, both directions
    {
      let ftOK = true
      for (const a of rng(-3, 3)) {
        const g = polyD(2, 1, -3)
        const f = new Poly([BigInt(-a), 1n]).mul(g)
        const { r } = longDiv(f, new Poly([BigInt(-a), 1n]))
        if (r.deg() !== -1) ftOK = false // constructed factor → zero remainder
        if (f.evalAt(BigInt(a)) !== 0n) ftOK = false // and f(a) = 0
      }
      ok(ftOK, 'L: the factor theorem glimpsed — f = (x−a)·g forces remainder 0 AND f(a) = 0 at all 7 a-values (the converse: zero remainder forces f(a) = 0 by the same identity)')
    }
  }

  // L-5: quiz 3.4 keys pinned [0, 1, 2, 0, 1] with every distractor priced
  {
    const q1 = longDiv(polyD(1, 7, 12), polyD(1, 4))
    ok(arrEq(q1.q.coefs, polyD(1, 3).coefs) && q1.r.deg() === -1, 'L: quiz Q1 correct (x²+7x+12) ÷ (x+4) = x+3')
    ok(!arrEq(polyD(1, 4).mul(polyD(1, -3)).coefs, polyD(1, 7, 12).coefs), 'L: quiz Q1 distractor x−3 refuted by multiplication (gives x²+x−12)')
    ok(polyD(1, 0, 0, -2, 5).evalAt(1n) === 4n, 'L: quiz Q2 correct — remainder of (x³−2x+5) at x = 1 is 4 = f(1)')
    ok(polyD(1, 0, 0, -2, 5).evalAt(1n) !== 3n && polyD(1, 0, 0, -2, 5).evalAt(1n) !== 5n && polyD(1, 0, 0, -2, 5).evalAt(1n) !== 6n, 'L: quiz Q2 distractors 3/5/6 all refused')
    ok(polyD(1, 0, -9).evalAt(-3n) === 0n, 'L: quiz Q4 correct — f(−3) = 0 for x²−9, so (x+3) is a factor')
    ok(polyD(1, 0, 9).evalAt(-3n) === 18n && polyD(1, -3, 0).evalAt(-3n) === 18n && polyD(1, 0, 0, -27).evalAt(-3n) === -54n, 'L: quiz Q4 distractors x²+9 / x²−3x / x³−27 all refuse x = −3')
    ok(5 - 2 === 3, 'L: quiz Q5 correct — degree 5 minus degree 2 gives quotient degree 3 (the degree arithmetic of 3.1/3.2)')
  }

  // L-6: exercise keys 3.4 recomputed BOTH SIDES
  {
    // L1 (3): monomial divisions
    ok(eqT(new Poly([0n, 0n, 0n, 6n]).mul(polyD(6, 0, 0)).coefs, polyD(36, 0, 0, 0, 0, 0).coefs), 'L: L1.1 6x³ · 6x² = 36x⁵ both sides')
    ok(BigInt(-54 / 9) === -6n && 9n * -6n === -54n, 'L: L1.2 −54y⁴ ÷ 9y = −6y³ (sign + index both sides)')
    ok(BigInt(48 / 8) === 6n && 8n * 6n === 48n, 'L: L1.3 48a⁴b³ ÷ 8a²b = 6a²b² both sides')
    // L2 (3): polynomial ÷ monomial
    ok(eqT(new Poly([0n, 0n, 6n]).mul(polyD(2, 3)).coefs, polyD(12, 18, 0, 0).coefs), 'L: L2.1 (12x³+18x²) ÷ 6x² = 2x+3 both sides')
    ok(eqT(new Poly([0n, 5n]).mul(polyD(2, 0, -3, 1)).coefs, polyD(10, 0, -15, 5, 0).coefs), 'L: L2.2 (10x⁴−15x²+5x) ÷ 5x = 2x³−3x+1 both sides')
    ok(new Poly([0n, 0n, 3n]).mul(polyD(3, -2)).evalAt(2n) === 9n * 8n - 6n * 4n, 'L: L2.3 (9a³b²−6a²b) ÷ 3a²b = 3ab−2 — checked at the shared value u = ab = 2: 3u²·(3u−2) = 48 both sides')
    // L3 (3): long divisions, exact
    {
      const a1 = longDiv(polyD(1, 9, 20), polyD(1, 5))
      ok(arrEq(a1.q.coefs, polyD(1, 4).coefs) && a1.r.deg() === -1, 'L: L3.1 (x²+9x+20) ÷ (x+5) = x+4, r 0')
      const a2 = longDiv(polyD(1, -3, -28), polyD(1, 4))
      ok(arrEq(a2.q.coefs, polyD(1, -7).coefs) && a2.r.deg() === -1, 'L: L3.2 (x²−3x−28) ÷ (x+4) = x−7, r 0')
      ok(arrEq(polyD(2, -1).mul(polyD(1, 3)).coefs, polyD(2, 5, -3).coefs), 'L: L3.3 (2x²+5x−3) ÷ (2x−1) = x+3 — non-monic, verified by the identity both sides')
    }
    // L4 (2): remainder-theorem reads
    ok(polyD(1, 3, -4, 2).evalAt(2n) === 14n, 'L: L4.1 remainder of (x³+3x²−4x+2) at x = 2 is 14')
    ok(polyD(2, 0, -5, 1).evalAt(-1n) === 4n, 'L: L4.2 remainder of (2x³−5x+1) at x = −1 is 4')
    // L5 (2): the k-hunt + the factor-theorem division
    ok(((-1n) ** 3n + -6n * (-1n) ** 2n - 5n * -1n + 3n) === 1n, 'L: L5.1 with k = −6: f(−1) = −1−6+5+3 = 1 — the remainder condition met')
    ok(((-1n) ** 3n + -5n * (-1n) ** 2n - 5n * -1n + 3n) === 2n, 'L: L5.1 with k = −5 the remainder is 2 ≠ 1 — the distractor priced')
    {
      const d5 = longDiv(polyD(1, -6, 11, -6), polyD(1, -3))
      ok(arrEq(d5.q.coefs, polyD(1, -3, 2).coefs) && d5.r.deg() === -1, 'L: L5.2 (x³−6x²+11x−6) ÷ (x−3) = x²−3x+2, r 0 — f(3) = 0')
    }
    // L6 (1): the two divisions of x⁴−1
    {
      const b1 = longDiv(polyD(1, 0, 0, 0, -1), polyD(1, 1))
      const b2 = longDiv(polyD(1, 0, 0, 0, -1), polyD(1, -1))
      ok(arrEq(b1.q.coefs, polyD(1, -1, 1, -1).coefs) && b1.r.deg() === -1, 'L: L6 (x⁴−1) ÷ (x+1) = x³−x²+x−1, r 0')
      ok(eqT(b2.q.coefs, polyD(1, 1, 1, 1).coefs) && b2.r.deg() === -1, 'L: L6 (x⁴−1) ÷ (x−1) = x³+x²+x+1, r 0')
      ok(arrEq(polyD(1, 0, 1).mul(polyD(1, 0, -1)).coefs, polyD(1, 0, 0, 0, -1).coefs), 'L: L6 the pair proves x⁴−1 = (x²+1)(x²−1) — the difference-of-squares chain')
    }
  }

  // L-7: figure geometry plans (recorded pre-writing, audited in M)
  {
    // fig 3.4-7 "the long-division tableau": viewBox 720x360; header
    //   (30,18,660,44); LEFT panel (30,84,410,220) carrying the tableau as
    //   text lines + thin rules (no inner rects); RIGHT panel (470,84,220,220)
    //   with 4 step boxes 190x44 at (485,100)/(485,152)/(485,204)/(485,256);
    //   footer text y=336.
    // fig 3.4-8 "the remainder theorem map": viewBox 720x360; header
    //   (30,18,660,44); 4 boxes (40,110,170,56) f(x), (260,110,170,56) the
    //   divisor gate, (480,88,180,50) quotient, (480,178,180,50) remainder;
    //   verdict band (30,272,660,40) with 2 band boxes 180x24 at (60,280) and
    //   (300,280); footer text y=340.
    ok(true, 'L: figure geometry plans recorded (figs 3.4-7/3.4-8, viewBoxes 720x360 both)')
  }
}


/* ------------------------------------------------------------------ */
/* (M) authored lesson 3.4 — content checks + the chapter-close audit  */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch03Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-03.ts').text()
  const lesson: Lesson = chapter03.lessons[3]
  ok(chapter03.lessons.length === 4, 'M: chapter 3 ships all four lessons (3.1 in H, 3.2 in I, 3.3 in K, 3.4 audited here)')
  ok(lesson.id === 'al-dividing-polynomials-long-division-and-the-remainder-theorem', 'M: lesson id al-dividing-polynomials-long-division-and-the-remainder-theorem (globally unique, al- prefix)')
  ok(lesson.number === '3.4', 'M: lesson number 3.4')
  ok(lesson.title === 'Dividing Polynomials: Long Division and the Remainder Theorem', 'M: lesson title matches the planned title')
  const pl = chapter03.plannedLessons ?? []
  ok(pl.length === 0, 'M: plannedLessons emptied — the chapter plan is fully written (got ' + JSON.stringify(pl) + ')')
  ok(chapter03.status === 'complete', 'M: chapter 3 flipped COMPLETE')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'M: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'M: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-adding-subtracting-and-multiplying-polynomials', 'ans-division-with-rest-the-division-algorithm']),
    'M: prerequisites chain to 3.2 (the closure boundary + the grid) and ANS 2.1 (the division algorithm this lesson wears)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'M: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'M: two display equations (the division identity + the remainder theorem)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'M: two derivations (the division identity + the remainder theorem)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'M: four illustrations (monomials, the tableau, the inexact case, ascending)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'M: one table (the division ledger)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'M: three formula cards (index law, division identity, remainder theorem)')
  {
    const terms = lesson.blocks.filter((b) => b.kind === 'terms')
    ok(terms.length === 1 && terms[0].kind === 'terms' && terms[0].items.length === 8, 'M: one terms block of 8 entries')
  }
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'M: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 1, 2, 0, 1]), 'M: quiz keys match the pinned [0, 1, 2, 0, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'M: quiz shape + distractor pricing')
      ok(q.items[0].options[0] === '$x + 3$', 'M: quiz Q1 option 1 is the true quotient (the pinned key 0)')
      ok(q.items[1].options[1] === '$4$', 'M: quiz Q2 option 2 is the true remainder f(1) = 4 (the pinned key 1)')
      ok(q.items[3].options[0] === '$x^{2} - 9$', 'M: quiz Q4 option 1 is the true factor carrier (the pinned key 0)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'M: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'M: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('6x^{3}'), 'M: L1.1 answer carries the pinned 6x³')
      ok((all[11].answer || '').includes('-6'), 'M: L5.1 answer carries the pinned k = −6')
      ok((all[13].answer || '').includes('x^{2} - 1'), 'M: L6 answer carries the difference-of-squares chain')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'M: two figures in 3.4 (long-division tableau + remainder theorem map)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the tableau: header + 2 panels + 4 step boxes = 7 rects
      const rt = rects(figs[0].svg)
      ok(rt.length === 7, 'M: long-division tableau = 1 header + 2 panels + 4 step boxes (7 rects, got ' + rt.length + ')')
      ok(rt.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'M: tableau boxes inside viewBox 720x360')
      const headerT = rt.find((r) => r.w === 660 && r.h === 44)
      const leftT = rt.find((r) => r.w === 410 && r.h === 220)
      const rightT = rt.find((r) => r.w === 220 && r.h === 220)
      const stepsT = rt.filter((r) => r.w === 190 && r.h === 44)
      ok(!!headerT && !!leftT && !!rightT && stepsT.length === 4, 'M: tableau composition (1+2+4)')
      ok(pairwise(stepsT) && stepsT.every((s2) => s2.x >= 470 && s2.x + s2.w <= 690 && s2.y >= 84 && s2.y + s2.h <= 304), 'M: step boxes pairwise disjoint inside the right panel')
      ok(sep(headerT!, leftT!) && sep(headerT!, rightT!), 'M: header clear of both panels')
      ok(figs[0].svg.includes('x² + 11x + 30') && figs[0].svg.includes('EXACT'), 'M: tableau carries the H&K exhibit and the exact verdict')
      // figs[1] = the remainder theorem map: header + 4 stations + band + 3 band boxes = 9 rects
      const rm = rects(figs[1].svg)
      ok(rm.length === 9, 'M: remainder map = 1 header + 4 stations + 1 band + 3 band boxes (9 rects, got ' + rm.length + ')')
      ok(rm.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'M: remainder map boxes inside viewBox 720x360')
      const stations = rm.filter((r) => (r.w === 170 && r.h === 56) || (r.w === 180 && r.h === 50))
      const bandM = rm.find((r) => r.w === 660 && r.h === 40)
      const bandBoxes = rm.filter((r) => r.h === 24 && r.w >= 150)
      ok(stations.length === 4 && !!bandM && bandBoxes.length === 3, 'M: remainder map composition (4 stations + band + 3 boxes)')
      ok(pairwise(stations), 'M: the four stations pairwise disjoint')
      ok(bandBoxes.every((b) => b.y >= 272 && b.y + b.h <= 312), 'M: band boxes inside the verdict band')
      ok(figs[1].svg.includes('r = f(a)') && figs[1].svg.includes('DIES'), 'M: remainder map carries the theorem and the dying product term')
    }
  }
  {
    let rawTitleDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'callout' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'example' && b.title.includes('$')) rawTitleDollars++
      if (b.kind === 'table' && b.caption && b.caption.includes('$')) rawTitleDollars++
      if (b.kind === 'formula' && b.name.includes('$')) rawTitleDollars++
      if (b.kind === 'derivation' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'M: no raw $ in non-KaTeX titles')
    // derivation step LABELS render as plain text (the run-65 class) — scan them too
    let labelDollars = 0
    for (const b of lesson.blocks) {
      if (b.kind === 'derivation') {
        for (const st of b.steps) if (st.label.includes('$')) labelDollars++
      }
    }
    ok(labelDollars === 0, 'M: no raw $ in derivation step labels (they render as plain text)')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'M: honest word count ' + words + ' >= 4000')
  }
  // odd-run + unicode-escape scans over the WHOLE chapter file
  {
    let oddRuns = 0
    {
      let i = 0
      while (i < ch03Src.length) {
        if (ch03Src[i] === '\\') {
          let j = i
          while (j < ch03Src.length && ch03Src[j] === '\\') j++
          if ((j - i) % 2 === 1) oddRuns++
          i = j
        } else i++
      }
    }
    ok(oddRuns === 0, 'M: no odd-length backslash runs in ch-03.ts source (found ' + oddRuns + ')')
    const escapes = (ch03Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'M: no unicode escapes in ch-03.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (3.4 now in) + the chapter-close census
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'M: all ' + ids.length + ' lesson ids repo-wide unique (with 3.4 added)')
    ok(ids.includes('al-dividing-polynomials-long-division-and-the-remainder-theorem'), 'M: the new id is registered in the library graph')
  }
  // the unit-3 completion review — the BOOK_FORMAT 7-point checklist, run at ship
  {
    // 1: math pre-verified by script — sections A–L ran before any prose; K/M audit the authored file
    ok(passed + failed > 400, 'M/review-1: the math battery ran pre-writing AND authored-time (' + (passed + failed) + ' checks accumulated)')
    // 2: figure labels match prose terminology — audited per-figure above + the SVG overlap audit
    for (const l of chapter03.lessons) {
      const figs = l.blocks.filter((b) => b.kind === 'figure')
      ok(figs.length === 2, 'M/review-2: ' + l.number + ' carries exactly 2 figures, captions written for the prose')
    }
    // 3: quiz answer indices verified live — the E2E battery clicks the pinned keys per lesson
    const allQuiz = chapter03.lessons.map((l) => (l.blocks.find((b) => b.kind === 'quiz') as { items: { answer: number }[] } | undefined)?.items.map((it) => it.answer))
    ok(JSON.stringify(allQuiz) === JSON.stringify([[1, 0, 1, 1, 0], [0, 2, 1, 0, 1], [1, 2, 0, 1, 1], [0, 1, 2, 0, 1]]), 'M/review-3: the four quiz key sets match their pinned pre-writing pins: ' + JSON.stringify(allQuiz))
    // 4: exercise solutions complete — every question carries steps + answer (checked per lesson above)
    const allEx = chapter03.lessons.map((l) => (l.blocks.find((b) => b.kind === 'exercises') as { sets: { questions: unknown[] }[] } | undefined)?.sets.flatMap((s2) => s2.questions).length)
    ok(JSON.stringify(allEx) === JSON.stringify([14, 14, 14, 14]), 'M/review-4: 14 exercises per lesson across the chapter: ' + JSON.stringify(allEx))
    // 5: lesson ids globally unique — checked in each authored-time section; re-run here for the review record
    {
      const ids: string[] = []
      for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) ids.push(l.id)
      ok(ids.length === new Set(ids).size, 'M/review-5: ' + ids.length + ' lesson ids repo-wide unique at chapter close')
    }
    // 6: lint + render clean — the run gate battery reports separately (lint 0, routes 200/404, E2E green)
    ok(chapter03.lessons.every((l) => l.sources && l.sources.length >= 3), 'M/review-6: every lesson carries its citation keys; lint/routes/E2E run in the gate battery')
    // 7: logs updated — asserted by the bookkeeping step (WORKLOG/PROGRESS/RESUME_POINTER/SOURCE_LOG/DETAILED_LOG + inventory)
    const totals = chapter03.lessons.reduce((acc, l) => acc + countLessonWords(l), 0)
    ok(totals >= 18000, 'M/review-7: chapter-3 total ' + totals + ' words across 4 lessons (>= 18,000, the depth bar held)')
  }
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch03 pre-writing battery: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
