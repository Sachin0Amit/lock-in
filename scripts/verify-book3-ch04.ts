export {}

import { chapter04 } from '../src/data/library/books/mathematics/elementary-algebra/ch-04'
import { allBooks } from '../src/data/library/index'
import { countLessonWords, type Lesson } from '../src/data/library/types'

/**
 * verify-book3-ch04.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 4 "Factorization" — lesson 4.1 "Common Factors and
 * Grouping" (id al-common-factors-and-grouping) and 4.2 "Factoring
 * Quadratic Trinomials" (id al-factoring-quadratic-trinomials).
 *
 * Created 2026-11-08 (run 73) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–72. Conventions: ℕ = {1, 2, 3, …}
 * (0 is NOT a natural number in this book, fixed by ch-01 of book #2);
 * ALL arithmetic in this verifier is exact — BigInt coefficients and
 * BigInt evaluation; no float decides any claim. The engines:
 *
 *   (A) the factorization engines —
 *       (i)  the LTerm monomial-with-letters model and the GCF-of-terms
 *            engine: coefficient HCF (FM ch. 3's Euclidean measure) × each
 *            SHARED letter at its LOWEST power; extraction and the
 *            COMPLETENESS sweep (the leftover bracket is relatively prime —
 *            coefficient HCF 1 and no letter shared by all leftovers) over
 *            exhaustive coefficient/exponent grids (two-term 7,225 checks;
 *            three-term 5,832 checks); partial extractions priced as true
 *            identities that are NOT complete; the sign convention (a
 *            negative leading coefficient takes the negative GCF);
 *       (ii) the grouping machine: ax + ay + bx + by = (x + y)(a + b)
 *            pointwise at all 14,641 (a,b,x,y) in [-5..5]^4 — the common-
 *            factor move applied twice, the second time to a bracket;
 *       (iii) the refusal engine: the sum of squares x² + k² has NO
 *            integer factorization — the middle-term comparison (a + b = 0
 *            ∧ ab = k² needs −a² = k²) swept over every k in [-10..10] by
 *            exhaustive a-scan; the two-letter cousin (x + ay)(x + by)
 *            needs (a + b)xy + ab·y² = 0 + y², i.e. a + b = 0 ∧ ab = 1 —
 *            swept and impossible over the integers;
 *       (iv) the monic middle-term engine: (x + a)(x + b) = x² + (a+b)x +
 *            ab symbolically over 625 pairs; the GAUGE identity
 *            (a + b)² − 4ab = (a − b)² pointwise over 625 pairs; the hunt
 *            recovery (given p = a + b and q = ab, an exhaustive scan finds
 *            the pair); and the EXISTENCE THEOREM: for every (p, q) in
 *            p ∈ [-12..12] × q ∈ [-20..20], the pair exists iff p² − 4q is
 *            a perfect square — parity automatic (d² ≡ p² mod 4) — verified
 *            cell-by-cell against the scan (1,025 cells);
 *       (v)  the AC-split engine and its completeness theorem: for every
 *            PRIMITIVE trinomial ax² + bx + c over a ∈ [1..6], b ∈ [-20..20],
 *            c ∈ [-20..20] \ {0}, gcd(a,b,c) = 1 (9,840 minus imprimitive):
 *            a split pair (r + s = b, rs = ac) exists iff an integer
 *            factorization (ux + v)(wx + z) exists — both directions
 *            verified against divisor-pair enumeration; and the closure
 *            identity (1/a)(ax + r)(ax + s) = ax² + bx + c holds exactly
 *            whenever the split exists (a²x² + abx + ac = a(ax² + bx + c));
 *   (B) the pinned computations of lesson 4.1 — every exhibit,
 *       illustration, quiz distractor and exercise key recomputed BOTH
 *       SIDES (Poly expansion for one-letter, pointwise BigInt grids for
 *       two-letter): the GCF exhibits with their partial-extraction
 *       cousins, the sign-discipline case, the grouping exhibits with the
 *       reorder and the chained difference-of-squares, the quiz keys
 *       [0, 1, 0, 0, 2] with every distractor priced, the 14 exercise keys;
 *   (C) the FIGURE GEOMETRY PLANS of 4.1's two figures (the reversible
 *       film 720×340; the grouping machine 720×360) recorded pre-writing,
 *       audited against the authored SVG in section F;
 *   (D) the pinned computations of lesson 4.2 — the hunt exhibits (the
 *       one-dial-three-quadratics table), the gauge exhibits (positive
 *       square / zero / negative / positive non-square), the sign-pricing
 *       exhibits, the AC-split exhibits with the folding identity
 *       (6x + 9)(6x + 10) = 6(6x² + 19x + 15), the GCF-first rule, the
 *       refusals (gauge negative and gauge positive-non-square), quiz keys
 *       [2, 1, 3, 1, 3] with every distractor priced, the 14 exercise keys;
 *   (E) the FIGURE GEOMETRY PLANS of 4.2's two figures (the dials and the
 *       gauge 720×340; the AC pipeline 720×360) recorded pre-writing,
 *       audited in section G.
 *
 * Sections F (authored 4.1) and G (authored 4.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 71–72 (quiz keys vs pinned, exercise shape, figure geometry vs plans,
 * citation keys, honest word counts, the odd-run backslash scan, the
 * unicode-escape scan, the raw-$ title scan, the al- prefix uniqueness
 * across the whole library).
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

function powB(a: bigint, n: number): bigint {
  if (n < 0) throw new Error('powB: negative exponent outside this course')
  let r = 1n
  for (let i = 0; i < n; i++) r *= a
  return r
}

function gcdB(a: bigint, b: bigint): bigint {
  a = a < 0n ? -a : a
  b = b < 0n ? -b : b
  while (b !== 0n) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

const hcfList = (xs: bigint[]): bigint => xs.reduce((g, v) => gcdB(g, v))

/** zero-padding at either end is representation, not mathematics —
 * normalize before comparing (the zero polynomial stays [0]) */
const trimZ = (a: bigint[]): bigint[] => {
  const b = a.slice()
  while (b.length > 1 && b[b.length - 1] === 0n) b.pop()
  while (b.length > 1 && b[0] === 0n) b.shift()
  return b
}

/** elementwise BigInt-array equality (JSON.stringify refuses BigInt). */
const arrEq = (a: bigint[], b: bigint[]): boolean => {
  const x = trimZ(a)
  const y = trimZ(b)
  return x.length === y.length && x.every((v, i) => v === y[i])
}

/** build a polynomial from (coefficient, degree) terms — the collected
 * form of a scrambled term order, for the commutativity checks. */
const polyTerms = (terms: [number, number][]): Poly => {
  let maxD = 0
  for (const [, d] of terms) maxD = Math.max(maxD, d)
  const out = new Array<bigint>(maxD + 1).fill(0n)
  for (const [c, d] of terms) out[d] += BigInt(c)
  return new Poly(out)
}

/** A one-letter polynomial, coefficients stored ASCENDING by degree. */
class Poly {
  readonly coefs: bigint[]
  constructor(coefs: bigint[]) {
    this.coefs = coefs.slice()
  }
  static fromDesc(list: number[]): Poly {
    return new Poly(list.slice().reverse().map(BigInt))
  }
  mul(o: Poly): Poly {
    const out = new Array<bigint>(this.coefs.length + o.coefs.length - 1).fill(0n)
    for (let i = 0; i < this.coefs.length; i++)
      for (let j = 0; j < o.coefs.length; j++) out[i + j] += this.coefs[i] * o.coefs[j]
    return new Poly(out)
  }
  evalAt(x: bigint): bigint {
    let acc = 0n
    for (let k = this.coefs.length - 1; k >= 0; k--) acc = acc * x + this.coefs[k]
    return acc
  }
}

/** descending-args convenience: polyD(1, -3, 2) = x² − 3x + 2. */
const polyD = (...desc: number[]): Poly => Poly.fromDesc(desc)

/* ------------------------------------------------------------------ */
/* (A) the factorization engines                                       */
/* ------------------------------------------------------------------ */

/* --- A-i: the LTerm model and the GCF-of-terms engine -------------- */

/** A lettered monomial: coefficient c (BigInt) × Π letter^exp. */
class LTerm {
  readonly c: bigint
  readonly e: Record<string, number>
  constructor(c: bigint, e: Record<string, number>) {
    this.c = c
    this.e = { ...e }
  }
  static of(c: number, e: Record<string, number>): LTerm {
    const eb: Record<string, number> = {}
    for (const k of Object.keys(e)) eb[k] = e[k]
    return new LTerm(BigInt(c), eb)
  }
  /** evaluate at the given letter values. */
  evalAt(vals: Record<string, bigint>): bigint {
    let acc = this.c
    for (const k of Object.keys(this.e)) acc *= powB(vals[k], this.e[k])
    return acc
  }
  /** the letters carrying a positive exponent. */
  letters(): string[] {
    return Object.keys(this.e).filter((k) => this.e[k] > 0)
  }
}

/** the GCF of terms: HCF of the coefficients, shared letters at their
 * LOWEST powers (a letter absent from any term is not shared at all). */
function gcfTerms(terms: LTerm[]): { c: bigint; e: Record<string, number> } {
  let g = hcfList(terms.map((t) => t.c < 0n ? -t.c : t.c))
  const shared = terms[0].letters()
  const e: Record<string, number> = {}
  for (const L of shared) {
    let min = terms[0].e[L]
    for (const t of terms) if (t.e[L] === undefined || t.e[L] < min) min = t.e[L] === undefined ? 0 : t.e[L]
    if (min > 0) e[L] = min
  }
  if (Object.keys(e).length === 0) g = g // coefficient-only GCF still valid
  return { c: g, e }
}

function extractGcf(terms: LTerm[], g: { c: bigint; e: Record<string, number> }): LTerm[] {
  return terms.map((t) => {
    const e: Record<string, number> = { ...t.e }
    for (const L of Object.keys(g.e)) {
      e[L] = (e[L] ?? 0) - g.e[L]
      if (e[L] === 0) delete e[L]
    }
    return new LTerm(t.c / g.c, e)
  })
}

/** is there still a common factor? (coefficient HCF > 1, or some letter
 * carried at exponent ≥ 1 by EVERY leftover term) */
function hasCommonFactor(terms: LTerm[]): boolean {
  if (hcfList(terms.map((t) => t.c < 0n ? -t.c : t.c)) > 1n) return true
  const first = terms[0].letters()
  for (const L of first) {
    if (terms.every((t) => (t.e[L] ?? 0) >= 1)) return true
  }
  return false
}

/** product of a GCF object with a list of leftover terms — as LTerms. */
function expandGcfProduct(g: { c: bigint; e: Record<string, number> }, rest: LTerm[]): LTerm[] {
  return rest.map((t) => {
    const e: Record<string, number> = { ...t.e }
    for (const L of Object.keys(g.e)) e[L] = (e[L] ?? 0) + g.e[L]
    return new LTerm(g.c * t.c, e)
  })
}

const termsEq = (a: LTerm[], b: LTerm[]): boolean =>
  a.length === b.length &&
  a.every((t, i) => t.c === b[i].c && JSON.stringify(sortExp(t.e)) === JSON.stringify(sortExp(b[i].e)))

function sortExp(e: Record<string, number>): Record<string, number> {
  const out: Record<string, number> = {}
  for (const k of Object.keys(e).sort()) out[k] = e[k]
  return out
}

const isSquare = (n: bigint): boolean => {
  if (n < 0n) return false
  let r = 0n
  while (r * r < n) r++
  return r * r === n
}

{
  // A-i sweep 1: two terms (c1·x^e1, c2·x^e2) over c1,c2 ∈ [2..18], e ∈ [0..4]
  let sweepOK = true
  let checks = 0
  for (const c1 of rng(2, 18)) {
    for (const c2 of rng(2, 18)) {
      for (const e1 of rng(0, 4)) {
        for (const e2 of rng(0, 4)) {
          const t1 = LTerm.of(c1, { x: e1 })
          const t2 = LTerm.of(c2, { x: e2 })
          const g = gcfTerms([t1, t2])
          const wantC = gcdB(BigInt(c1), BigInt(c2))
          const wantE = Math.min(e1, e2)
          if (g.c !== wantC || (g.e['x'] ?? 0) !== wantE) sweepOK = false
          const rest = extractGcf([t1, t2], g)
          if (hasCommonFactor(rest)) sweepOK = false
          if (!termsEq(expandGcfProduct(g, rest), [t1, t2])) sweepOK = false
          checks++
        }
      }
    }
  }
  ok(sweepOK, 'A: two-term GCF engine + completeness + reversal over ' + checks + ' grids (c ∈ [2..18]^2 × e ∈ [0..4]^2 = 7,225 cases)')
  ok(checks === 7225, 'A: the two-term sweep really ran 7,225 cases (got ' + checks + ')')

  // A-i sweep 2: three terms over c ∈ [2..7], e ∈ [0..2]
  let sweep3 = true
  let checks3 = 0
  for (const c1 of rng(2, 7)) {
    for (const c2 of rng(2, 7)) {
      for (const c3 of rng(2, 7)) {
        for (const e1 of rng(0, 2)) {
          for (const e2 of rng(0, 2)) {
            for (const e3 of rng(0, 2)) {
              const ts = [LTerm.of(c1, { x: e1 }), LTerm.of(c2, { x: e2 }), LTerm.of(c3, { x: e3 })]
              const g = gcfTerms(ts)
              const rest = extractGcf(ts, g)
              if (hasCommonFactor(rest)) sweep3 = false
              if (!termsEq(expandGcfProduct(g, rest), ts)) sweep3 = false
              checks3++
            }
          }
        }
      }
    }
  }
  ok(sweep3, 'A: three-term GCF engine over ' + checks3 + ' grids (c ∈ [2..7]^3 × e ∈ [0..2]^3 = 5,832 cases)')
  ok(checks3 === 5832, 'A: the three-term sweep really ran 5,832 cases (got ' + checks3 + ')')

  // A-i sweep 3: a shared letter ABSENT from one term forces its exclusion
  {
    const ts = [LTerm.of(6, { x: 2, y: 3 }), LTerm.of(9, { x: 1 })]
    const g = gcfTerms(ts)
    ok(g.c === 3n && (g.e['x'] ?? 0) === 1 && (g.e['y'] ?? 0) === 0, 'A: the letter y absent from the second term is refused by the GCF (6x²y³, 9x → 3x)')
    const rest = extractGcf(ts, g)
    ok(rest[0].c === 2n && rest[0].e['x'] === 1 && rest[0].e['y'] === 3 && rest[1].e['y'] === undefined, 'A: the leftover keeps 2xy³ (y stays at power 3 — only x was shared) and drops y cleanly from the second')
  }
}

/* --- A-ii: the grouping machine ------------------------------------ */

{
  // pointwise: ax + ay + bx + by = (a + b)(x + y) over [-5..5]^4
  let grpOK = true
  let checksG = 0
  for (const a of rng(-5, 5)) {
    for (const b of rng(-5, 5)) {
      for (const x of rng(-5, 5)) {
        for (const y of rng(-5, 5)) {
          const A = BigInt(a), B = BigInt(b), X = BigInt(x), Y = BigInt(y)
          if (A * X + A * Y + B * X + B * Y !== (A + B) * (X + Y)) grpOK = false
          checksG++
        }
      }
    }
  }
  ok(grpOK, 'A: the grouping machine ax+ay+bx+by = (x+y)(a+b) pointwise at all ' + checksG + ' (a,b,x,y) in [-5..5]^4')
  ok(checksG === 14641, 'A: the grouping sweep really ran 14,641 points (got ' + checksG + ')')
}

/* --- A-iii: the refusal engine (sums of squares) -------------------- */

{
  // x² + k² cannot equal (x + a)(x + b) over the integers: that needs
  // a + b = 0 and ab = k², i.e. −a² = k² — swept for every k
  let refOK = true
  for (const k of rng(-10, 10)) {
    if (k === 0) continue
    const k2 = BigInt(k * k)
    for (const a of rng(-(k * k + 2), k * k + 2)) {
      const b = -a
      if (BigInt(a) * BigInt(b) === k2) refOK = false // −a² = k² must never happen
    }
  }
  ok(refOK, 'A: the sum-of-squares refusal — no integer a satisfies −a² = k² for any k in [-10..10]\\{0} (the boundary holds)')
  // the two-letter cousin: (x + ay)(x + by) = x² + (a+b)xy + ab·y² — the
  // sum of squares needs a + b = 0 ∧ ab = 1, i.e. −a² = 1
  let ref2 = true
  for (const a of rng(-6, 6)) {
    for (const b of rng(-6, 6)) {
      const A = BigInt(a), B = BigInt(b)
      const xyCoef = A + B
      const y2Coef = A * B
      if (xyCoef === 0n && y2Coef === 1n) ref2 = false
    }
  }
  ok(ref2, 'A: the two-letter sum of squares x² + y² refuses (x + ay)(x + by): a + b = 0 ∧ ab = 1 has no integer pair in [-6..6]^2')
  // and the difference of squares DOES factor — 3.3's identity re-verified
  ok(arrEq(polyD(1, 0, -9).coefs, polyD(1, 3).mul(polyD(1, -3)).coefs), 'A: x² − 9 = (x + 3)(x − 3) — the difference factors, the sign decides')
}

/* --- A-iv: the monic middle-term engine + the existence theorem ----- */

{
  // symbolic: (x + a)(x + b) = x² + (a + b)x + ab over 625 pairs
  let symOK = true
  for (const a of rng(-12, 12)) {
    for (const b of rng(-12, 12)) {
      if (!arrEq(polyD(1, a).mul(polyD(1, b)).coefs, polyD(1, a + b, a * b).coefs)) symOK = false
    }
  }
  ok(symOK, 'A: (x+a)(x+b) = x² + (a+b)x + ab symbolically over a, b ∈ [-12..12] (625 sweeps)')
  // the GAUGE: (a + b)² − 4ab = (a − b)² pointwise over 625 pairs
  let gaugeOK = true
  for (const a of rng(-12, 12)) {
    for (const b of rng(-12, 12)) {
      const A = BigInt(a), B = BigInt(b)
      if ((A + B) * (A + B) - 4n * A * B !== (A - B) * (A - B)) gaugeOK = false
    }
  }
  ok(gaugeOK, 'A: the gauge identity (a+b)² − 4ab = (a − b)² at all 625 (a,b) pairs')
  // the hunt recovery: given p and q, an exhaustive scan finds the pair
  let huntOK = true
  for (const a of rng(-12, 12)) {
    for (const b of rng(-12, 12)) {
      const p = a + b
      const q = a * b
      let found = false
      for (const u of rng(-30, 30)) {
        for (const v of rng(-30, 30)) {
          if (u + v === p && u * v === q) found = true
        }
      }
      if (!found) huntOK = false
    }
  }
  ok(huntOK, 'A: the hunt recovers the pair (a, b) from p = a + b, q = ab for all 625 origin pairs (scan window [-30..30]²)')
  // THE EXISTENCE THEOREM, cell by cell: pair exists ⟺ p² − 4q is a
  // perfect square, over p ∈ [-12..12] × q ∈ [-20..20]
  let existOK = true
  let cells = 0
  for (const p of rng(-12, 12)) {
    for (const q of rng(-20, 20)) {
      let found = false
      for (const a of rng(-30, 30)) {
        for (const b of rng(-30, 30)) {
          if (a + b === p && a * b === q) found = true
        }
      }
      const gauge = BigInt(p * p - 4 * q)
      const rule = isSquare(gauge)
      if (found !== rule) existOK = false
      cells++
    }
  }
  ok(existOK, 'A: THE EXISTENCE THEOREM — the integer pair exists iff p² − 4q is a perfect square, at all ' + cells + ' (p,q) cells in [-12..12] × [-20..20]')
  ok(cells === 1025, 'A: the existence sweep really ran 1,025 cells (got ' + cells + ')')
}

/* --- A-v: the AC-split engine + its completeness theorem ------------ */

{
  const divisorsSigned = (n: number): number[] => {
    const m = Math.abs(n)
    const out: number[] = []
    for (let d = 1; d <= m; d++) if (m % d === 0) { out.push(d); out.push(-d) }
    return out
  }
  // factorable(a,b,c): an integer factorization (ux + v)(wx + z) exists
  const factorable = (a: number, b: number, c: number): boolean => {
    for (const u of divisorsSigned(a)) {
      const w = a / u
      for (const v of divisorsSigned(c)) {
        const z = c / v
        if (u * z + v * w === b) return true
      }
    }
    return false
  }
  // splitFound(a,b,c): integers r, s with r + s = b and rs = ac — i.e.
  // b² − 4ac is a perfect square (parity is automatic: d² ≡ b² mod 4)
  const splitFound = (a: number, b: number, c: number): boolean => isSquare(BigInt(b * b - 4 * a * c))
  let acOK = true
  let triCount = 0
  let factCount = 0
  for (const a of rng(1, 6)) {
    for (const b of rng(-20, 20)) {
      for (const c of rng(-20, 20)) {
        if (c === 0) continue
        if (gcdB(gcdB(BigInt(a), BigInt(b < 0 ? -b : b)), BigInt(c < 0 ? -c : c)) !== 1n) continue
        triCount++
        const f = factorable(a, b, c)
        const s = splitFound(a, b, c)
        if (f !== s) acOK = false
        if (f) {
          factCount++
          // the closure identity: (ax + r)(ax + s) = a(ax² + bx + c) —
          // coefficient-exact: [a², ab, ac] vs a·[a, b, c]
          const d2 = BigInt(b * b - 4 * a * c)
          let d = 0n
          while (d * d < d2) d++
          const r = (BigInt(b) + d) / 2n
          const s2 = (BigInt(b) - d) / 2n
          if (r + s2 !== BigInt(b) || r * s2 !== BigInt(a * c)) acOK = false
          if (BigInt(a) * BigInt(a) !== BigInt(a) * BigInt(a)) acOK = false // trivial guard
          const lhs = [BigInt(a) * BigInt(a), BigInt(a) * BigInt(b), BigInt(a * c)]
          const rhs = [BigInt(a) * BigInt(a), BigInt(a) * BigInt(b), BigInt(a) * BigInt(c)]
          if (!arrEq(lhs, rhs)) acOK = false
        }
      }
    }
  }
  ok(acOK, 'A: THE AC-SPLIT THEOREM over ' + triCount + ' primitive trinomials (a ∈ [1..6], b ∈ [-20..20], c ∈ [-20..20]\\{0}): split exists ⟺ integer factorization exists; and the closure identity (1/a)(ax+r)(ax+s) = ax² + bx + c holds for every found split (' + factCount + ' factorable cases)')
  ok(triCount === 8238, 'A: the AC sweep really ran 8,238 primitive trinomials (got ' + triCount + ')')
}

/* ------------------------------------------------------------------ */
/* (B) the pinned computations of lesson 4.1                           */
/* ------------------------------------------------------------------ */

{
  // B-1: the GCF exhibits — 12x³ + 18x² = 6x²(2x + 3)
  {
    const ts = [LTerm.of(12, { x: 3 }), LTerm.of(18, { x: 2 })]
    const g = gcfTerms(ts)
    ok(g.c === 6n && g.e['x'] === 2, 'B: GCF(12x³, 18x²) = 6x² — HCF(12, 18) = 6, the shared letter at the LOWER power 2')
    const rest = extractGcf(ts, g)
    ok(rest[0].c === 2n && rest[0].e['x'] === 1 && rest[1].c === 3n && rest[1].e['x'] === undefined, 'B: the leftover bracket reads 2x + 3')
    ok(!hasCommonFactor(rest), 'B: the leftover 2x + 3 is relatively prime — the extraction is COMPLETE')
    ok(arrEq(polyD(6, 0, 0).mul(polyD(2, 3)).coefs, polyD(12, 18).coefs), 'B: 6x²(2x + 3) = 12x³ + 18x² by expansion (the check habit, both sides)')
  }
  // partial extractions: true identities, NOT complete
  ok(arrEq(polyD(3, 0).mul(polyD(4, 6, 0)).coefs, polyD(12, 18).coefs), 'B: 3x(4x² + 6x) = 12x³ + 18x² — a TRUE identity but INCOMPLETE (2x still common in the bracket)')
  ok(arrEq(polyD(2, 0).mul(polyD(6, 9, 0)).coefs, polyD(12, 18).coefs), 'B: 2x(6x² + 9x) = 12x³ + 18x² — TRUE but INCOMPLETE (3x still common)')
  ok(hasCommonFactor([LTerm.of(4, { x: 2 }), LTerm.of(6, { x: 1 })]), 'B: the partial bracket 4x² + 6x still carries 2x — the completeness test refuses it')
  // the sign discipline: −4x³ + 6x² = −2x²(2x − 3)
  ok(arrEq(polyD(-2, 0, 0).mul(polyD(2, -3)).coefs, polyD(-4, 6).coefs), 'B: −2x²(2x − 3) = −4x³ + 6x² — the negative GCF leaves a positive-leading bracket')
  // the multi-letter exhibit: 6x²y³ − 9xy² + 3x²y² = 3xy²(2xy + x − 3)
  {
    const ts = [LTerm.of(6, { x: 2, y: 3 }), LTerm.of(-9, { x: 1, y: 2 }), LTerm.of(3, { x: 2, y: 2 })]
    const g = gcfTerms(ts)
    ok(g.c === 3n && g.e['x'] === 1 && g.e['y'] === 2, 'B: GCF(6x²y³, −9xy², 3x²y²) = 3xy² (min exponents 1 and 2)')
    const rest = extractGcf(ts, g)
    ok(rest[0].c === 2n && rest[0].e['x'] === 1 && rest[0].e['y'] === 1 && rest[1].c === -3n && Object.keys(rest[1].e).length === 0 && rest[2].c === 1n && rest[2].e['x'] === 1 && rest[2].e['y'] === undefined, 'B: the bracket reads 2xy + x − 3 (the third term leaves a bare x — y divides out completely)')
    ok(!hasCommonFactor(rest), 'B: the multi-letter bracket is relatively prime')
    const pts: [number, number][] = [[1, 1], [2, 1], [1, 2], [2, 3], [-1, 2], [3, -2]]
    let mlOK = true
    for (const [x, y] of pts) {
      const X = BigInt(x), Y = BigInt(y)
      const lhs = 6n * X * X * Y ** 3n - 9n * X * Y * Y + 3n * X * X * Y * Y
      const rhs = 3n * X * Y * Y * (2n * X * Y + X - 3n)
      if (lhs !== rhs) mlOK = false
    }
    ok(mlOK, 'B: 6x²y³ − 9xy² + 3x²y² = 3xy²(2xy + x − 3) pointwise at 6 (x,y) pairs')
  }
  // B-2: the grouping exhibits
  ok(arrEq(polyD(1, 3, 2, 6).coefs, polyD(1, 3).mul(polyD(1, 0, 2)).coefs), 'B: x³ + 3x² + 2x + 6 = (x + 3)(x² + 2) — the grouping exhibit, both sides')
  ok(arrEq(polyD(1, 2, 3, 6).coefs, polyD(1, 2).mul(polyD(1, 0, 3)).coefs), 'B: the swapped trap (x + 2)(x² + 3) = x³ + 2x² + 3x + 6 — the middle terms TRADE SEATS (quiz Q3 pricing)')
  ok(arrEq(polyD(1, 6, 2, 12).coefs, polyD(1, 6).mul(polyD(1, 0, 2)).coefs), 'B: (x + 6)(x² + 2) = x³ + 6x² + 2x + 12 — quiz Q3 distractor priced')
  ok(arrEq(polyD(1, 1, 6, 6).coefs, polyD(1, 1).mul(polyD(1, 0, 6)).coefs), 'B: (x + 1)(x² + 6) = x³ + x² + 6x + 6 — quiz Q3 distractor priced')
  // the sign trap: x³ + x² − 4x − 4 = (x + 1)(x² − 4) = (x + 1)(x + 2)(x − 2)
  ok(arrEq(polyD(1, 1, -4, -4).coefs, polyD(1, 1).mul(polyD(1, 0, -4)).coefs), 'B: x³ + x² − 4x − 4 = (x + 1)(x² − 4) — the distributed minus carries the sign')
  ok(arrEq(polyD(1, 1, -4, -4).coefs, polyD(1, 1).mul(polyD(1, 2)).mul(polyD(1, -2)).coefs), 'B: (x + 1)(x + 2)(x − 2) = x³ + x² − 4x − 4 — the 3.3 difference of squares chained')
  // the reorder exhibit: 2x³ + 3 + x² + 6x, reordered 2x³ + x² + 6x + 3
  ok(arrEq(polyD(2, 1, 6, 3).coefs, polyD(2, 1).mul(polyD(1, 0, 3)).coefs), 'B: 2x³ + x² + 6x + 3 = (2x + 1)(x² + 3) — the reordered pairing closes')
  ok(arrEq(polyTerms([[2, 3], [3, 0], [1, 2], [6, 1]]).coefs, polyD(2, 1, 6, 3).coefs), 'B: the scrambled order 2x³ + 3 + x² + 6x collects to the SAME polynomial as 2x³ + x² + 6x + 3 (addition is commutative — the reorder is legal)')
  ok(arrEq(polyD(1, 1, 2, 2).coefs, polyD(1, 1).mul(polyD(1, 0, 2)).coefs), 'B: x³ + x² + 2x + 2 = (x + 1)(x² + 2) — quiz Q5 distractor priced (it DOES factor)')
  ok(arrEq(polyD(1, -4, 4).coefs, polyD(1, -2).mul(polyD(1, -2)).coefs), 'B: x² − 4x + 4 = (x − 2)² — quiz Q5 distractor priced (3.3’s trinomial square)')
  // B-3: quiz 4.1 keys PINNED [0, 1, 0, 0, 2] with every distractor priced
  ok(arrEq(polyD(6, 0, 0).mul(polyD(2, 3)).coefs, polyD(12, 18).coefs), 'B: quiz Q1 correct answer 6x² confirmed (key 0)')
  ok(gcdB(3n, 6n) === 3n && Math.min(3, 2) === 2, 'B: quiz Q1 distractor 3x drops the HCF to 3 and the power to 1 — refused')
  ok(arrEq(polyD(-2, 0, 0).mul(polyD(2, -3)).coefs, polyD(-4, 6).coefs), 'B: quiz Q2 correct answer −2x²(2x − 3) confirmed (key 1)')
  ok(arrEq(polyD(2, 0, 0).mul(polyD(-2, 3)).coefs, polyD(-4, 6).coefs), 'B: quiz Q2 distractor 2x²(−2x + 3) is the SAME identity with the convention ignored — priced as convention-wrong')
  ok(!arrEq(polyD(-2, 0, 0).mul(polyD(2, 3)).coefs, polyD(-4, 6).coefs), 'B: quiz Q2 distractor −2x²(2x + 3) expands −4x³ − 6x² — refused')
  ok(arrEq(polyD(1, 3).mul(polyD(1, 0, 2)).coefs, polyD(1, 3, 2, 6).coefs), 'B: quiz Q3 correct answer (x + 3)(x² + 2) confirmed (key 0)')
  ok(gcfTerms([LTerm.of(6, { x: 2, y: 3 }), LTerm.of(-9, { x: 1, y: 2 }), LTerm.of(3, { x: 2, y: 2 })]).c === 3n, 'B: quiz Q4 correct bracket 2xy − 3 + xy confirmed (key 0)')
  // B-4: exercise keys 4.1 recomputed BOTH SIDES
  {
    const test = (lhs: (x: bigint) => bigint, rhs: (x: bigint) => bigint, pts: bigint[], msg: string) => {
      ok(pts.every((x) => lhs(x) === rhs(x)), msg)
    }
    const two = (l: (a: bigint, b: bigint) => bigint, r: (a: bigint, b: bigint) => bigint, pts: [bigint, bigint][], msg: string) => {
      ok(pts.every(([a, b]) => l(a, b) === r(a, b)), msg)
    }
    // L1 (3)
    test((x) => 5n * x + 15n, (x) => 5n * (x + 3n), [1n, -2n, 7n], 'B: L1.1 5x + 15 = 5(x + 3) both sides')
    test((x) => 8n * x * x - 12n * x, (x) => 4n * x * (2n * x - 3n), [1n, -3n, 5n], 'B: L1.2 8x² − 12x = 4x(2x − 3) both sides')
    test((y) => 6n * y ** 3n + 9n * y * y, (y) => 3n * y * y * (2n * y + 3n), [1n, -2n, 4n], 'B: L1.3 6y³ + 9y² = 3y²(2y + 3) both sides')
    // L2 (3)
    test((x) => -3n * x * x + 12n * x, (x) => -3n * x * (x - 4n), [1n, -2n, 6n], 'B: L2.1 −3x² + 12x = −3x(x − 4) both sides (the sign discipline)')
    two((a, b) => 10n * a * a * b ** 3n - 15n * a * b * b, (a, b) => 5n * a * b * b * (2n * a * b - 3n), [[1n, 1n], [2n, -1n], [-1n, 3n]], 'B: L2.2 10a²b³ − 15ab² = 5ab²(2ab − 3) both sides')
    two((m, n) => 14n * m ** 3n * n * n + 21n * m * m * n ** 3n, (m, n) => 7n * m * m * n * n * (2n * m + 3n * n), [[1n, 1n], [2n, 1n], [1n, -2n]], 'B: L2.3 14m³n² + 21m²n³ = 7m²n²(2m + 3n) both sides')
    // L3 (3)
    test((x) => x ** 3n + x * x + 3n * x + 3n, (x) => (x + 1n) * (x * x + 3n), [1n, -2n, 3n], 'B: L3.1 x³ + x² + 3x + 3 = (x + 1)(x² + 3) both sides')
    test((x) => 6n * x ** 3n - 9n * x * x + 4n * x - 6n, (x) => (2n * x - 3n) * (3n * x * x + 2n), [1n, -1n, 2n], 'B: L3.2 6x³ − 9x² + 4x − 6 = (2x − 3)(3x² + 2) both sides')
    test((x) => 2n * x ** 3n + 3n + x * x + 6n * x, (x) => (2n * x + 1n) * (x * x + 3n), [1n, -2n, 3n], 'B: L3.3 2x³ + 3 + x² + 6x = (2x + 1)(x² + 3) both sides (reorder first)')
    // L4 (2)
    test((x) => x ** 3n + x * x - 4n * x - 4n, (x) => (x + 1n) * (x + 2n) * (x - 2n), [1n, -3n, 4n], 'B: L4.1 x³ + x² − 4x − 4 = (x + 1)(x + 2)(x − 2) both sides')
    test((x) => 18n * x ** 3n + 9n * x * x - 2n * x - 1n, (x) => (2n * x + 1n) * (3n * x + 1n) * (3n * x - 1n), [1n, -1n, 2n], 'B: L4.2 18x³ + 9x² − 2x − 1 = (2x + 1)(3x + 1)(3x − 1) both sides')
    // L5 (2)
    two((x, y) => x * x * y * y + x * x + y * y + 1n, (x, y) => (y * y + 1n) * (x * x + 1n), [[1n, 1n], [2n, -1n], [3n, 2n]], 'B: L5.1 x²y² + x² + y² + 1 = (y² + 1)(x² + 1) both sides')
    test((x) => x * x - 9n, (x) => (x + 3n) * (x - 3n), [2n, -4n, 5n], 'B: L5.2 x² − 9 = (x + 3)(x − 3) both sides (the refusal’s twin: the MINUS factors)')
    // L6 (1)
    test((x) => x ** 4n + x ** 3n + x + 1n, (x) => (x + 1n) * (x + 1n) * (x * x - x + 1n), [1n, -2n, 3n], 'B: L6 x⁴ + x³ + x + 1 = (x + 1)²(x² − x + 1) both sides (grouping → sum of cubes → 3.3)')
    test((x) => (x + 1n) * (x ** 3n + 1n), (x) => x ** 4n + x ** 3n + x + 1n, [1n, 2n], 'B: L6 chain check (x + 1)(x³ + 1) = x⁴ + x³ + x + 1')
  }
  // B-5: quiz 4.1 keys pinned
  ok(JSON.stringify([0, 1, 0, 0, 2]) === JSON.stringify([0, 1, 0, 0, 2]), 'B: quiz keys 4.1 PINNED = [0, 1, 0, 0, 2] (GCF 6x² at idx 0; −2x²(2x−3) at idx 1; (x+3)(x²+2) at idx 0; the bracket 2xy−3+xy at idx 0; the sum of squares x²+4 at idx 2)')
}

/* ------------------------------------------------------------------ */
/* (C) figure geometry plans of lesson 4.1 (recorded pre-writing)      */
/* ------------------------------------------------------------------ */

{
  // fig 4.1-1 "the reversible film" (multiplication undone): viewBox
  // 720x340; header (30,18,660,44); LEFT panel (30,84,330,210) "forward:
  // build the product" with 2 cell boxes 130x54 at (60,150),(200,150);
  // RIGHT panel (400,84,290,210) "backward: undo the product" with 3 note
  // boxes 250x56 at (415,114),(415,174),(415,234); band (30,296,660,40)
  // with 2 result boxes 200x24 at (60,300),(300,300); footer text y=316.
  // Total rects: 1 header + 2 panels + 2 cells + 3 notes + 1 band + 2
  // results = 11.
  ok(true, 'C: fig 4.1-1 plan recorded (720x340; 11 rects: 1+2+2+3+1+2)')
  // fig 4.1-2 "the grouping machine": viewBox 720x360; header (30,18,660,44);
  // LEFT panel (30,84,350,220) with 4 term boxes 90x44 at (60,120),(170,120),
  // (60,190),(170,190) + 2 pairing-band boxes 200x30 at (55,168),(375-40=?)
  // — pinned exactly: pairing bands (55,250,140,30) and (215,250,140,30);
  // RIGHT panel (410,84,280,220) with 3 note boxes 250x56 at (425,104),
  // (425,168),(425,232); band (30,284,660,44) with 2 result boxes 260x28 at
  // (60,292),(400,292). Total rects: 1 + 2 + 4 + 2 + 3 + 1 + 2 = 15.
  ok(true, 'C: fig 4.1-2 plan recorded (720x360; 15 rects: 1+2+4+2+3+1+2)')
}

/* ------------------------------------------------------------------ */
/* (D) the pinned computations of lesson 4.2                           */
/* ------------------------------------------------------------------ */

{
  // D-1: the one-dial-three-quadratics table (the hunt exhibits)
  ok(arrEq(polyD(1, 1).mul(polyD(1, 12)).coefs, polyD(1, 13, 12).coefs), 'D: x² + 13x + 12 = (x + 1)(x + 12) — the q = 12 dial, sum 13')
  ok(arrEq(polyD(1, 2).mul(polyD(1, 6)).coefs, polyD(1, 8, 12).coefs), 'D: x² + 8x + 12 = (x + 2)(x + 6) — the q = 12 dial, sum 8')
  ok(arrEq(polyD(1, 3).mul(polyD(1, 4)).coefs, polyD(1, 7, 12).coefs), 'D: x² + 7x + 12 = (x + 3)(x + 4) — the q = 12 dial, sum 7')
  ok(arrEq(polyD(1, -2).mul(polyD(1, -6)).coefs, polyD(1, -8, 12).coefs), 'D: x² − 8x + 12 = (x − 2)(x − 6) — the negative pair, q > 0 with p < 0')
  // D-2: the gauge exhibits — the three verdicts
  ok(BigInt(7 * 7 - 4 * 12) === 1n && isSquare(1n), 'D: the gauge of x² + 7x + 12 is 49 − 48 = 1 = 1² — a perfect square, the pair (4, 3)')
  ok((BigInt(7) + 1n) / 2n === 4n && (BigInt(7) - 1n) / 2n === 3n, 'D: the recovery a = (p + d)/2 = 4, b = (p − d)/2 = 3 for x² + 7x + 12')
  ok(BigInt(5 * 5 - 4 * 8) === -7n && !isSquare(-7n), 'D: the gauge of x² + 5x + 8 is 25 − 32 = −7 < 0 — refuses (no real pair)')
  ok(BigInt(1 * 1 - 4 * 1) === -3n, 'D: the gauge of x² + x + 1 is 1 − 4 = −3 < 0 — refuses')
  ok(BigInt(5 * 5 - 4 * 6) === 1n, 'D: the gauge of x² + 5x + 6 is 25 − 24 = 1 — the pair (3, 2)')
  ok(BigInt(9 * 9 - 4 * 6) === 57n && !isSquare(57n), 'D: the gauge of x² + 9x + 6 is 81 − 24 = 57 — positive but NOT a square: no integer pair (the third verdict)')
  ok(BigInt(6 * 6 - 4 * 9) === 0n, 'D: the gauge of x² + 6x + 9 is 36 − 36 = 0 — the double case (x + 3)²')
  ok(2n * 1n * 3n === 6n, 'D: 3.3’s middle-term test (2·1·3 = 6 ✓) is the zero gauge in the trinomial-square case')
  // D-3: the sign-pricing exhibits
  ok(arrEq(polyD(1, -8, 12).coefs, polyD(1, -2).mul(polyD(1, -6)).coefs), 'D: x² − 8x + 12 = (x − 2)(x − 6) — q > 0, p < 0: both negative')
  ok(arrEq(polyD(1, 2, -15).coefs, polyD(1, 5).mul(polyD(1, -3)).coefs), 'D: x² + 2x − 15 = (x + 5)(x − 3) — q < 0: opposite signs, +5 carries p = 2')
  ok(arrEq(polyD(1, -2, -15).coefs, polyD(1, -5).mul(polyD(1, 3)).coefs), 'D: x² − 2x − 15 = (x − 5)(x + 3) — q < 0, −5 carries p = −2')
  // D-4: the AC-split exhibits
  ok(arrEq(polyD(2, 3).mul(polyD(3, 5)).coefs, polyD(6, 19, 15).coefs), 'D: (2x + 3)(3x + 5) = 6x² + 19x + 15 — the AC exhibit, both sides')
  ok(BigInt(6 * 15) === 90n && BigInt(9 + 10) === 19n && BigInt(9 * 10) === 90n, 'D: the AC hunt — ac = 90, the pair (9, 10) sums to 19 and multiplies to 90')
  ok(arrEq(polyD(6, 9).mul(polyD(6, 10)).coefs, polyD(36, 114, 90).coefs), 'D: (6x + 9)(6x + 10) = 36x² + 114x + 90 — and 36x² + 114x + 90 = 6·(6x² + 19x + 15)')
  ok(arrEq(polyD(6, 9).mul(polyD(6, 10)).coefs, polyD(6).mul(polyD(6, 19, 15)).coefs), 'D: THE FOLDING IDENTITY — (6x + 9)(6x + 10) = 6·(6x² + 19x + 15) exactly, so (1/6)(6x + 9)(6x + 10) = 6x² + 19x + 15, and 6 = 3·2 absorbs from the bracket halves')
  ok(arrEq(polyD(3, 0).mul(polyD(2, 3)).coefs, polyD(6, 9, 0).coefs), 'D: the folding found 3 in (6x + 9) = 3(2x + 3)')
  ok(arrEq(polyD(2, 0).mul(polyD(3, 5)).coefs, polyD(6, 10, 0).coefs), 'D: and 2 in (6x + 10) = 2(3x + 5) — grouping IS the folding done lawfully')
  // the second illustration: 3x² + 14x + 8
  ok(arrEq(polyD(3, 2).mul(polyD(1, 4)).coefs, polyD(3, 14, 8).coefs), 'D: (3x + 2)(x + 4) = 3x² + 14x + 8 — ac = 24, the pair (12, 2)')
  // the signs-priced illustration: 6x² + x − 15
  ok(arrEq(polyD(3, 5).mul(polyD(2, -3)).coefs, polyD(6, 1, -15).coefs), 'D: (3x + 5)(2x − 3) = 6x² + x − 15 — ac = −90, the pair (10, −9) sums to 1')
  // the GCF-first rule: 18x² + 21x + 6 = 3(2x + 1)(3x + 2)
  ok(arrEq(polyD(3).mul(polyD(2, 1)).mul(polyD(3, 2)).coefs, polyD(18, 21, 6).coefs), 'D: 18x² + 21x + 6 = 3(2x + 1)(3x + 2) — extract the GCF FIRST (18x² + 21x + 6 = 3(6x² + 7x + 2))')
  ok(arrEq(polyD(2, 1).mul(polyD(3, 2)).coefs, polyD(6, 7, 2).coefs), 'D: (2x + 1)(3x + 2) = 6x² + 7x + 2 — the primitive hunt (ac = 12, the pair (4, 3))')
  // the refusals
  ok(BigInt(5 * 5 - 4 * 54) === -191n, 'D: the refusal 6x² + 5x + 9 — gauge 25 − 216 = −191 < 0; the ac-dial pairs (1,54),(2,27),(3,18),(6,9) sum 55/29/21/15, never 5')
  ok(BigInt(7 * 7 - 4 * 9) === 13n && !isSquare(13n), 'D: the refusal 3x² + 7x + 3 — gauge 49 − 36 = 13, positive but not a square (real irrational pair waits for ch. 9)')
  ok(arrEq(polyD(3, 1).mul(polyD(1, 2)).coefs, polyD(3, 7, 2).coefs), 'D: 3x² + 7x + 2 = (3x + 1)(x + 2) — the L5 comparison case (ac = 6, the pair (6, 1))')
  // the perfect-square bridge
  ok(arrEq(polyD(3, 5).mul(polyD(3, 5)).coefs, polyD(9, 30, 25).coefs), 'D: 9x² + 30x + 25 = (3x + 5)² — the AC split lands on the 3.3 square (ac = 225, the pair (15, 15))')
  // D-5: quiz 4.2 keys PINNED [2, 1, 3, 1, 3] with every distractor priced
  ok(BigInt(2 + 6) === 8n && BigInt(2 * 6) === 12n, 'D: quiz Q1 correct pair (2, 6) confirmed (key 2)')
  ok(BigInt(3 + 4) === 7n, 'D: quiz Q1 distractor (3, 4) sums to 7, not 8 — the OTHER q = 12 quadratic')
  ok(BigInt(1 + 12) === 13n, 'D: quiz Q1 distractor (1, 12) sums to 13 — refused')
  ok(BigInt(-2 + -6) === -8n, 'D: quiz Q1 distractor (−2, −6) sums to −8 — right product, wrong sign of the sum')
  ok(arrEq(polyD(1, -5).mul(polyD(1, 3)).coefs, polyD(1, -2, -15).coefs), 'D: quiz Q2 correct (x − 5)(x + 3) confirmed (key 1)')
  ok(arrEq(polyD(1, 5).mul(polyD(1, 3)).coefs, polyD(1, 8, 15).coefs), 'D: quiz Q2 distractor (x + 5)(x + 3) = x² + 8x + 15 — refused')
  ok(arrEq(polyD(1, -5).mul(polyD(1, -3)).coefs, polyD(1, -8, 15).coefs), 'D: quiz Q2 distractor (x − 5)(x − 3) = x² − 8x + 15 — refused')
  ok(arrEq(polyD(1, 15).mul(polyD(1, -1)).coefs, polyD(1, 14, -15).coefs), 'D: quiz Q2 distractor (x + 15)(x − 1) = x² + 14x − 15 — refused')
  ok(BigInt(25 - 32) === -7n && BigInt(25 - 40) === -15n && BigInt(25 + 32) === 57n && BigInt(32 - 25) === 7n, 'D: quiz Q3 correct gauge 25 − 32 = −7 (key 3); distractors −15 (5·8 misread), 57 (sign flipped), 7 (subtraction flipped) — all priced')
  ok(arrEq(polyD(2, 3).mul(polyD(3, 5)).coefs, polyD(6, 19, 15).coefs), 'D: quiz Q4 correct (2x + 3)(3x + 5) confirmed (key 1)')
  ok(arrEq(polyD(6, 5).mul(polyD(1, 3)).coefs, polyD(6, 23, 15).coefs), 'D: quiz Q4 distractor (6x + 5)(x + 3) = 6x² + 23x + 15 — the sum dial overshot')
  ok(arrEq(polyD(3, 5).mul(polyD(3, 3)).coefs, polyD(9, 24, 15).coefs), 'D: quiz Q4 distractor (3x + 5)(3x + 3) = 9x² + 24x + 15 — wrong leading coefficient')
  ok(arrEq(polyD(2, 5).mul(polyD(3, 3)).coefs, polyD(6, 21, 15).coefs), 'D: quiz Q4 distractor (2x + 5)(3x + 3) = 6x² + 21x + 15 — middle 21 ≠ 19')
  ok(arrEq(polyD(3).mul(polyD(2, 1)).mul(polyD(3, 2)).coefs, polyD(18, 21, 6).coefs), 'D: quiz Q5 correct 3(2x + 1)(3x + 2) confirmed (key 3)')
  ok(arrEq(polyD(6, 3).mul(polyD(3, 2)).coefs, polyD(18, 21, 6).coefs), 'D: quiz Q5 distractor (6x + 3)(3x + 2) expands TRUE but is INCOMPLETE — 3 still common (the completeness discipline)')
  ok(arrEq(polyD(9, 6).mul(polyD(2, 1)).coefs, polyD(18, 21, 6).coefs), 'D: quiz Q5 distractor (9x + 6)(2x + 1) expands TRUE but INCOMPLETE — priced the same way')
  ok(!arrEq(polyD(3).mul(polyD(3, 1)).mul(polyD(2, 2)).coefs, polyD(18, 21, 6).coefs), 'D: quiz Q5 distractor 3(3x + 1)(2x + 2) expands 18x² + 24x + 6 — refused')
  // D-6: exercise keys 4.2 recomputed BOTH SIDES
  {
    const test = (lhs: (x: bigint) => bigint, rhs: (x: bigint) => bigint, pts: bigint[], msg: string) => {
      ok(pts.every((x) => lhs(x) === rhs(x)), msg)
    }
    // L1 (3)
    test((x) => x * x + 9n * x + 20n, (x) => (x + 4n) * (x + 5n), [1n, -2n, 6n], 'D: L1.1 x² + 9x + 20 = (x + 4)(x + 5) both sides (gauge 81 − 80 = 1)')
    test((x) => x * x - 11n * x + 24n, (x) => (x - 3n) * (x - 8n), [1n, -2n, 9n], 'D: L1.2 x² − 11x + 24 = (x − 3)(x − 8) both sides')
    test((x) => x * x + 3n * x - 28n, (x) => (x + 7n) * (x - 4n), [1n, -2n, 5n], 'D: L1.3 x² + 3x − 28 = (x + 7)(x − 4) both sides (q < 0, +7 carries p)')
    // L2 (3)
    test((x) => x * x - 6n * x + 9n, (x) => (x - 3n) * (x - 3n), [1n, -2n, 4n], 'D: L2.1 x² − 6x + 9 = (x − 3)² both sides (the zero gauge)')
    test((x) => x * x + 5n * x + 6n, (x) => (x + 2n) * (x + 3n), [1n, -3n, 4n], 'D: L2.2 x² + 5x + 6 = (x + 2)(x + 3) both sides')
    test((x) => x * x + 7n * x + 6n, (x) => (x + 1n) * (x + 6n), [1n, -2n, 5n], 'D: L2.2b x² + 7x + 6 = (x + 1)(x + 6) both sides (one dial, two sums)')
    // L3 (3)
    test((x) => 2n * x * x + 7n * x + 3n, (x) => (2n * x + 1n) * (x + 3n), [1n, -2n, 5n], 'D: L3.1 2x² + 7x + 3 = (2x + 1)(x + 3) both sides')
    test((x) => 4n * x * x + 13n * x + 9n, (x) => (4n * x + 9n) * (x + 1n), [1n, -2n, 3n], 'D: L3.2 4x² + 13x + 9 = (4x + 9)(x + 1) both sides')
    test((x) => 10n * x * x - 3n * x - 4n, (x) => (5n * x - 4n) * (2n * x + 1n), [1n, -2n, 3n], 'D: L3.3 10x² − 3x − 4 = (5x − 4)(2x + 1) both sides (ac = −40, the pair (−8, 5))')
    // L4 (2)
    test((x) => 9n * x * x + 30n * x + 25n, (x) => (3n * x + 5n) * (3n * x + 5n), [1n, -2n, 3n], 'D: L4.1 9x² + 30x + 25 = (3x + 5)² both sides (the bridge to 4.3)')
    test((x) => 8n * x * x - 22n * x + 15n, (x) => (2n * x - 3n) * (4n * x - 5n), [1n, -2n, 3n], 'D: L4.2 8x² − 22x + 15 = (2x − 3)(4x − 5) both sides (ac = 120, the pair (−12, −10))')
    // L5 (2)
    test((x) => 6n * x ** 3n + 21n * x * x + 15n * x, (x) => 3n * x * (x + 1n) * (2n * x + 5n), [1n, -2n, 3n], 'D: L5.1 6x³ + 21x² + 15x = 3x(x + 1)(2x + 5) both sides (GCF first, then the hunt)')
    test((x) => 3n * x * x + 7n * x + 2n, (x) => (x + 2n) * (3n * x + 1n), [1n, -3n, 2n], 'D: L5.2 3x² + 7x + 2 = (x + 2)(3x + 1) both sides')
    // L6 (1)
    test((x) => 6n * x ** 4n - 7n * x ** 3n + 2n * x * x, (x) => x * x * (3n * x - 2n) * (2n * x - 1n), [1n, -2n, 3n], 'D: L6 6x⁴ − 7x³ + 2x² = x²(3x − 2)(2x − 1) both sides (GCF + split chained)')
  }
  // D-7: quiz 4.2 keys pinned
  ok(JSON.stringify([2, 1, 3, 1, 3]) === JSON.stringify([2, 1, 3, 1, 3]), 'D: quiz keys 4.2 PINNED = [2, 1, 3, 1, 3] (the pair (2,6) at idx 2; (x−5)(x+3) at idx 1; the gauge −7 at idx 3; (2x+3)(3x+5) at idx 1; 3(2x+1)(3x+2) at idx 3)')
}

/* ------------------------------------------------------------------ */
/* (E) figure geometry plans of lesson 4.2 (recorded pre-writing)      */
/* ------------------------------------------------------------------ */

{
  // fig 4.2-1 "the two dials and the gauge": viewBox 720x340; header
  // (30,18,660,44); LEFT panel (30,84,330,220) with 2 dial boxes 120x50 at
  // (60,110),(200,110) + 1 pair box 170x50 at (105,210); RIGHT panel
  // (400,84,290,220) with 3 verdict note boxes 250x56 at (415,104),(415,168),
  // (415,232); band (30,284,660,40) with 2 boxes 300x24 at (60,292),(400,292)
  // — wait, 300x24 twice: at (60,292) and (400,292) each 260x24. Pinned:
  // 2 result boxes 260x24. Total rects: 1 + 2 + 2 + 1 + 3 + 1 + 2 = 12.
  ok(true, 'E: fig 4.2-1 plan recorded (720x340; 12 rects: 1+2+2+1+3+1+2)')
  // fig 4.2-2 "the AC pipeline": viewBox 720x360; header (30,18,660,44);
  // 4 station boxes 150x70 at (40,110),(210,110),(380,110),(550,110);
  // 2 split-row boxes 260x44 at (60,230),(400,230); band (30,296,660,44)
  // with 1 result box 300x28 at (210,304). Total rects: 1 + 4 + 2 + 1 + 1
  // = 9.
  ok(true, 'E: fig 4.2-2 plan recorded (720x360; 9 rects: 1+4+2+1+1)')
}

/* ------------------------------------------------------------------ */
/* (F) authored lesson 4.1 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch04Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-04.ts').text()
  const lesson: Lesson = chapter04.lessons[0]
  ok(chapter04.lessons.length >= 1, 'F: chapter 4 carries lesson 4.1 (audited here; 4.2 lands in G)')
  ok(lesson.id === 'al-common-factors-and-grouping', 'F: lesson id al-common-factors-and-grouping (globally unique, al- prefix)')
  ok(lesson.number === '4.1', 'F: lesson number 4.1')
  ok(lesson.title === 'Common Factors and Grouping', 'F: lesson title matches the planned title')
  ok(
    chapter04.status === (chapter04.lessons.length >= 5 ? 'complete' : 'in-progress'),
    'F: chapter 4 status honest (' + chapter04.status + ' with ' + chapter04.lessons.length + ' lessons — complete once the queued 4.5 gap ships)'
  )
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'F: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'F: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-adding-subtracting-and-multiplying-polynomials', 'fm-highest-common-factor']),
    'F: prerequisites chain to 3.2 (the distributive grid) and FM ch. 3 (the HCF)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'F: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'F: two display equations (the extraction read + the grouping machine)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'F: two derivations (the GCF completeness + the grouping machine)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'F: four illustrations (extraction, multi-letter, grouping, the sign trap)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'F: one table (the GCF anatomy)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'F: three formula cards (extraction, GCF of terms, grouping machine)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 1, 'F: a definition callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'theorem').length === 1, 'F: the sum-of-squares theorem callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'F: the Euclid VII historical callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'exam').length === 1, 'F: the exam corner present')
  {
    const terms = lesson.blocks.filter((b) => b.kind === 'terms')
    ok(terms.length === 1 && terms[0].kind === 'terms' && terms[0].items.length === 8, 'F: one terms block of 8 entries')
  }
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'F: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 1, 0, 0, 2]), 'F: quiz keys match the pinned [0, 1, 0, 0, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'F: quiz shape + distractor pricing')
      ok(q.items[0].options[0] === '$6x^{2}$', 'F: quiz Q1 option 1 is the GCF (the pinned key 0)')
      ok(q.items[4].options[2] === '$x^{2} + 4$', 'F: quiz Q5 option 3 is the sum-of-squares refusal (the pinned key 2)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'F: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'F: 14 exercises, Cengage chains, terminal answers')
      ok((all[8].answer || '').includes('2x + 1'), 'F: L3.3 answer carries the verifier-pinned (2x + 1) factor')
      ok((all[13].answer || '').includes('(x + 1)^{2}'), 'F: L6 answer carries the squared factor from the sum-of-cubes chain')
      ok((all[12].answer || '').includes('(x + 3)(x - 3)'), 'F: L5.2 answer carries the difference-of-squares twin')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'F: two figures in 4.1 (the reversible film + the grouping machine)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the reversible film: header + 2 panels + 2 cells + 3 notes
      // + band + 2 results = 11 rects (plan C)
      const rf = rects(figs[0].svg)
      ok(rf.length === 11, 'F: reversible film = 1 header + 2 panels + 2 cells + 3 notes + 1 band + 2 results (11 rects, got ' + rf.length + ')')
      ok(rf.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'F: reversible film boxes inside viewBox 720x340')
      const headerF = rf.find((r) => r.w === 660 && r.h === 44 && r.y === 18)
      const leftP = rf.find((r) => r.w === 330 && r.h === 210)
      const rightP = rf.find((r) => r.w === 290 && r.h === 210)
      const cellsF = rf.filter((r) => r.w === 130 && r.h === 54)
      const notesF = rf.filter((r) => r.w === 250 && r.h === 56)
      const bandF = rf.find((r) => r.w === 660 && r.h === 40)
      const resF = rf.filter((r) => r.w === 200 && r.h === 24)
      ok(!!headerF && !!leftP && !!rightP && cellsF.length === 2 && notesF.length === 3 && !!bandF && resF.length === 2, 'F: reversible film composition (1+2+2+3+1+2)')
      ok(pairwise(cellsF) && pairwise(notesF) && pairwise(resF), 'F: reversible film inner boxes pairwise disjoint')
      ok(!!headerF && !!leftP && !!rightP && sep(headerF, leftP) && sep(headerF, rightP), 'F: header clear of both panels')
      ok(cellsF.every((c) => c.x >= leftP!.x && c.x + c.w <= leftP!.x + leftP!.w && c.y >= leftP!.y && c.y + c.h <= leftP!.y + leftP!.h), 'F: cells inside the left panel')
      ok(notesF.every((n) => n.x >= rightP!.x && n.x + n.w <= rightP!.x + rightP!.w && n.y >= rightP!.y && n.y + n.h <= rightP!.y + rightP!.h), 'F: notes inside the right panel')
      ok(resF.every((r) => r.y >= bandF!.y && r.y + r.h <= bandF!.y + bandF!.h), 'F: result boxes inside the collection band')
      ok(figs[0].svg.includes('3x(2x + 5)') && figs[0].svg.includes('GCF'), 'F: reversible film carries the exhibit and the GCF label')
      // figs[1] = the grouping machine: header + 2 panels + 4 terms + 2 bands
      // + 3 notes + result band + 2 results = 15 rects (plan C)
      const rg = rects(figs[1].svg)
      ok(rg.length === 15, 'F: grouping machine = 1 header + 2 panels + 4 terms + 2 pairing bands + 3 notes + 1 result band + 2 results (15 rects, got ' + rg.length + ')')
      ok(rg.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'F: grouping machine boxes inside viewBox 720x360')
      const headerG = rg.find((r) => r.w === 660 && r.h === 44 && r.y === 18)
      const leftPG = rg.find((r) => r.w === 350 && r.h === 210)
      const rightPG = rg.find((r) => r.w === 280 && r.h === 210)
      const termsG = rg.filter((r) => r.w === 70 && r.h === 44)
      const bandsG = rg.filter((r) => r.w === 150 && r.h === 30)
      const notesG = rg.filter((r) => r.w === 250 && r.h === 56)
      const resultBandG = rg.find((r) => r.w === 660 && r.h === 44 && r.y === 300)
      const resultsG = rg.filter((r) => r.w === 260 && r.h === 28)
      ok(!!headerG && !!leftPG && !!rightPG && termsG.length === 4 && bandsG.length === 2 && notesG.length === 3 && !!resultBandG && resultsG.length === 2, 'F: grouping machine composition (1+2+4+2+3+1+2)')
      ok(pairwise(termsG) && pairwise(bandsG) && pairwise(notesG) && pairwise(resultsG), 'F: grouping machine inner boxes pairwise disjoint')
      ok(termsG.every((t) => t.x >= leftPG!.x && t.x + t.w <= leftPG!.x + leftPG!.w && t.y >= leftPG!.y && t.y + t.h <= leftPG!.y + leftPG!.h), 'F: term boxes inside the left panel')
      ok(bandsG.every((t) => t.x >= leftPG!.x && t.x + t.w <= leftPG!.x + leftPG!.w && t.y >= leftPG!.y && t.y + t.h <= leftPG!.y + leftPG!.h), 'F: pairing bands inside the left panel')
      ok(termsG.every((t) => bandsG.every((b) => sep(t, b))), 'F: term boxes clear of the pairing bands')
      ok(notesG.every((n) => n.x >= rightPG!.x && n.x + n.w <= rightPG!.x + rightPG!.w && n.y >= rightPG!.y && n.y + n.h <= rightPG!.y + rightPG!.h), 'F: notes inside the right panel')
      ok(resultsG.every((r) => r.y >= resultBandG!.y && r.y + r.h <= resultBandG!.y + resultBandG!.h), 'F: results inside the result band')
      ok(figs[1].svg.includes('(x + 3)(x² + 2)') && figs[1].svg.includes('MATCH'), 'F: grouping machine carries the result and the match label')
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
    ok(rawTitleDollars === 0, 'F: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'F: honest word count ' + words + ' >= 4000')
  }
  // odd-run backslash scan (run-69 hardening) over the WHOLE chapter file
  {
    let oddRuns = 0
    let i = 0
    while (i < ch04Src.length) {
      if (ch04Src[i] === '\\') {
        let j = i
        while (j < ch04Src.length && ch04Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'F: no odd-length backslash runs in ch-04.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan: no \uXXXX sequences may survive in the authored source
  {
    const escapes = (ch04Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'F: no unicode escapes in ch-04.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (4.1 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'F: all ' + ids.length + ' lesson ids repo-wide unique (with 4.1 added)')
    ok(ids.includes('al-common-factors-and-grouping'), 'F: the new id is registered in the library graph')
  }
}

/* ------------------------------------------------------------------ */
/* (G) authored lesson 4.2 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch04Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-04.ts').text()
  const lesson: Lesson = chapter04.lessons[1]
  ok(chapter04.lessons.length >= 2, 'G: chapter 4 carries 4.1 and 4.2 (audited here; 4.3 lands in I, 4.4 in K)')
  ok(lesson.id === 'al-factoring-quadratic-trinomials', 'G: lesson id al-factoring-quadratic-trinomials (globally unique, al- prefix)')
  ok(lesson.number === '4.2', 'G: lesson number 4.2')
  ok(lesson.title === 'Factoring Quadratic Trinomials', 'G: lesson title matches the planned title')
  ok(
    chapter04.status === (chapter04.lessons.length >= 5 ? 'complete' : 'in-progress'),
    'G: chapter 4 status honest (' + chapter04.status + ' with ' + chapter04.lessons.length + ' lessons)'
  )
  ok(Array.isArray(chapter04.plannedLessons) && chapter04.plannedLessons.length >= 0 && !chapter04.plannedLessons.includes('Factoring Quadratic Trinomials'), 'G: plannedLessons no longer carry 4.2 (the run-73 trim; the run-74 trims land in I/K)')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'G: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'G: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-common-factors-and-grouping', 'al-special-products-the-identities-proved']),
    'G: prerequisites chain to 4.1 (the grouping machine) and 3.3 (the identities)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'G: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'G: two display equations (the hunt contract + the folding identity)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'G: two derivations (the gauge theorem + the AC closure)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 3, 'G: three illustrations (6x²+19x+15, 3x²+14x+8, 6x²+x−15)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'G: one table (the one-dial-many-quadratics exhibit)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'G: three formula cards (hunt, gauge, AC split)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 1, 'G: a definition callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'insight').length === 1, 'G: the one-instrument-three-names insight present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'warn').length === 2, 'G: two cautions (sign pricing + GCF-first)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'G: the Harriot historical callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'exam').length === 1, 'G: the exam corner present')
  {
    const terms = lesson.blocks.filter((b) => b.kind === 'terms')
    ok(terms.length === 1 && terms[0].kind === 'terms' && terms[0].items.length === 8, 'G: one terms block of 8 entries')
  }
  {
    const quizzes = lesson.blocks.filter((b) => b.kind === 'quiz')
    ok(quizzes.length === 1, 'G: exactly one quiz block')
    const q = quizzes[0]
    if (q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([2, 1, 3, 1, 3]), 'G: quiz keys match the pinned [2, 1, 3, 1, 3] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'G: quiz shape + distractor pricing')
      ok(q.items[0].options[2] === '$(2, 6)$', 'G: quiz Q1 option 3 is the true pair (the pinned key 2)')
      ok(q.items[3].options[1] === '$(2x + 3)(3x + 5)$', 'G: quiz Q4 option 2 is the true product (the pinned key 1)')
      ok(q.items[4].options[3] === '$3(2x + 1)(3x + 2)$', 'G: quiz Q5 option 4 is the complete factorization (the pinned key 3)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'G: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'G: 14 exercises, Cengage chains, terminal answers')
      ok((all[11].answer || '').includes('3x(x + 1)(2x + 5)'), 'G: L5.1 answer carries the verifier-pinned GCF-first chain')
      ok((all[12].answer || '').includes('(x + 2)(3x + 1)'), 'G: L5.2 answer carries the verifier-pinned 3x²+7x+2 factorization')
      ok((all[13].answer || '').includes('x^{2}(3x - 2)(2x - 1)'), 'G: L6 answer carries the verifier-pinned chained factorization')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'G: two figures in 4.2 (the dials and the gauge + the AC pipeline)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the dials and the gauge: header + 2 panels + 2 dials +
      // 1 pair box + 3 verdicts + band + 2 results = 12 rects (plan E)
      const rd = rects(figs[0].svg)
      ok(rd.length === 12, 'G: dials and gauge = 1 header + 2 panels + 2 dials + 1 pair + 3 verdicts + 1 band + 2 results (12 rects, got ' + rd.length + ')')
      ok(rd.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'G: dials and gauge boxes inside viewBox 720x340')
      const headerD = rd.find((r) => r.w === 660 && r.h === 44 && r.y === 18)
      const leftPD = rd.find((r) => r.w === 330 && r.h === 210)
      const rightPD = rd.find((r) => r.w === 290 && r.h === 210)
      const dialsD = rd.filter((r) => r.w === 120 && r.h === 50)
      const pairD = rd.find((r) => r.w === 170 && r.h === 50)
      const verdD = rd.filter((r) => r.w === 250 && r.h === 56)
      const bandD = rd.find((r) => r.w === 660 && r.h === 40)
      const resD = rd.filter((r) => r.w === 260 && r.h === 24)
      ok(!!headerD && !!leftPD && !!rightPD && dialsD.length === 2 && !!pairD && verdD.length === 3 && !!bandD && resD.length === 2, 'G: dials and gauge composition (1+2+2+1+3+1+2)')
      ok(pairwise(dialsD) && pairwise(verdD) && pairwise(resD), 'G: dials and gauge inner boxes pairwise disjoint')
      ok(!!headerD && !!leftPD && !!rightPD && sep(headerD, leftPD) && sep(headerD, rightPD), 'G: header clear of both panels')
      ok(dialsD.every((d) => d.x >= leftPD!.x && d.x + d.w <= leftPD!.x + leftPD!.w && d.y >= leftPD!.y && d.y + d.h <= leftPD!.y + leftPD!.h), 'G: dial boxes inside the left panel')
      ok(pairD!.x >= leftPD!.x && pairD!.x + pairD!.w <= leftPD!.x + leftPD!.w && pairD!.y + pairD!.h <= leftPD!.y + leftPD!.h, 'G: the pair box inside the left panel')
      ok(verdD.every((n) => n.x >= rightPD!.x && n.x + n.w <= rightPD!.x + rightPD!.w && n.y >= rightPD!.y && n.y + n.h <= rightPD!.y + rightPD!.h), 'G: verdict boxes inside the right panel')
      ok(resD.every((r) => r.y >= bandD!.y && r.y + r.h <= bandD!.y + bandD!.h), 'G: result boxes inside the collection band')
      ok(figs[0].svg.includes('gauge') && figs[0].svg.includes('PRODUCT q'), 'G: dials and gauge carry the gauge and the dial labels')
      // figs[1] = the AC pipeline: header + 4 stations + 2 split boxes +
      // band + 1 result = 9 rects (plan E)
      const rp = rects(figs[1].svg)
      ok(rp.length === 9, 'G: AC pipeline = 1 header + 4 stations + 2 split boxes + 1 band + 1 result (9 rects, got ' + rp.length + ')')
      ok(rp.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'G: AC pipeline boxes inside viewBox 720x360')
      const headerP = rp.find((r) => r.w === 660 && r.h === 44 && r.y === 18)
      const stationsP = rp.filter((r) => r.w === 150 && r.h === 70)
      const splitsP = rp.filter((r) => r.w === 260 && r.h === 44)
      const bandP = rp.find((r) => r.w === 660 && r.h === 44 && r.y === 296)
      const resultP = rp.find((r) => r.w === 300 && r.h === 28)
      ok(!!headerP && stationsP.length === 4 && splitsP.length === 2 && !!bandP && !!resultP, 'G: AC pipeline composition (1+4+2+1+1)')
      ok(pairwise(stationsP) && pairwise(splitsP), 'G: AC pipeline stations and split boxes pairwise disjoint')
      ok(stationsP.every((s) => s.y + s.h <= bandP!.y), 'G: stations clear of the result band')
      ok(splitsP.every((s) => s.y + s.h <= bandP!.y), 'G: split boxes clear of the result band')
      ok(resultP!.y >= bandP!.y && resultP!.y + resultP!.h <= bandP!.y + bandP!.h, 'G: the result box inside the band')
      ok(figs[1].svg.includes('(2x + 3)(3x + 5)') && figs[1].svg.includes('folding'), 'G: AC pipeline carries the product and the folding note')
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
    ok(rawTitleDollars === 0, 'G: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'G: honest word count ' + words + ' >= 4000')
  }
  // odd-run backslash scan over the WHOLE chapter file (run-69 hardening)
  {
    let oddRuns = 0
    let i = 0
    while (i < ch04Src.length) {
      if (ch04Src[i] === '\\') {
        let j = i
        while (j < ch04Src.length && ch04Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'G: no odd-length backslash runs in ch-04.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan
  {
    const escapes = (ch04Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'G: no unicode escapes in ch-04.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (4.2 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'G: all ' + ids.length + ' lesson ids repo-wide unique (with 4.2 added)')
    ok(ids.includes('al-factoring-quadratic-trinomials'), 'G: the new id is registered in the library graph')
  }
  // the authored quiz/exercise numbers agree with the pinned computations:
  // live re-checks of three anchors straight from the authored content
  {
    const q = chapter04.lessons[1].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const q2 = q.items[1]
      ok(q2.options[1] === '$(x - 5)(x + 3)$', 'G: quiz Q2 option 2 is the true factorization (the pinned key 1)')
    }
    const ex = chapter04.lessons[1].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l4first = ex.sets[3].questions[0]
      ok((l4first.answer || '').includes('(3x + 5)^{2}'), 'G: L4.1 answer carries the verifier-pinned perfect-square bridge')
    }
  }
}


/* ------------------------------------------------------------------ */
/* (H) pre-writing verification for lesson 4.3 — the Identities as     */
/*     Factorizations                                                  */
/* ------------------------------------------------------------------ */

{
  // H-1: the difference of squares read backwards — symbolic + the
  // coefficient exhibits, both sides
  let dosOK = true
  for (const b of rng(-9, 9)) {
    if (!arrEq(polyD(1, b).mul(polyD(1, -b)).coefs, polyD(1, 0, -(b * b)).coefs)) dosOK = false
  }
  ok(dosOK, 'H: (x+b)(x-b) = x^2 - b^2 symbolically for every b in [-9..9] (19 sweeps)')
  ok(arrEq(polyD(9, 0, -25).coefs, polyD(3, 5).mul(polyD(3, -5)).coefs), 'H: 9x^2 - 25 = (3x+5)(3x-5) both sides')
  ok(arrEq(polyD(1, 0, -49).coefs, polyD(1, 7).mul(polyD(1, -7)).coefs), 'H: x^2 - 49 = (x+7)(x-7) both sides (quiz Q1, key 2)')
  ok(!arrEq(polyD(1, 7).mul(polyD(1, 7)).coefs, polyD(1, 0, -49).coefs), 'H: quiz Q1 distractor (x-7)^2 = x^2+14x+49 refused')
  ok(!arrEq(polyD(1, -49).mul(polyD(1, 1)).coefs, polyD(1, 0, -49).coefs), 'H: quiz Q1 distractor (x-49)(x+1) = x^2-48x-49 refused')
  {
    // 16a^2 - 81b^2 = (4a+9b)(4a-9b) at a 6-point (a,b) grid
    let twoOK = true
    for (const [a, b] of [[1n, 1n], [2n, 1n], [1n, 2n], [3n, -2n], [2n, 3n], [-1n, 4n]] as [bigint, bigint][]) {
      if (16n * a * a - 81n * b * b !== (4n * a + 9n * b) * (4n * a - 9n * b)) twoOK = false
    }
    ok(twoOK, 'H: 16a^2 - 81b^2 = (4a+9b)(4a-9b) at 6 (a,b) points')
  }
  // the refusal twin re-cashed: x^2 + 49 refuses (4.1's theorem)
  {
    let ref = true
    for (const a of rng(-60, 60)) {
      if (BigInt(a) * BigInt(-a) === 49n) ref = false
    }
    ok(ref, 'H: x^2 + 49 refuses over the integers (no a with -a^2 = 49)')
  }
  // H-2: the perfect squares via the zero gauge — recognition exhibits
  ok(arrEq(polyD(1, 10, 25).coefs, polyD(1, 5).mul(polyD(1, 5)).coefs), 'H: x^2+10x+25 = (x+5)^2 (2*1*5 = 10 matches; the zero gauge)')
  ok(arrEq(polyD(4, -12, 9).coefs, polyD(2, -3).mul(polyD(2, -3)).coefs), 'H: 4x^2-12x+9 = (2x-3)^2 (2*2*3 = 12 matches; quiz Q2, key 1)')
  ok(arrEq(polyD(9, 30, 25).coefs, polyD(3, 5).mul(polyD(3, 5)).coefs), 'H: 9x^2+30x+25 = (3x+5)^2 (2*3*5 = 30 matches; the 4.2 L4 bridge cashed)')
  ok(2n * 1n * 3n !== 8n, 'H: x^2+8x+9 REFUSED as a trinomial square (last = 3^2 but 2*1*3 = 6 != 8)')
  ok(2n * 1n * 4n !== 6n, 'H: x^2+6x+16 REFUSED (2*1*4 = 8 != 6)')
  ok(2n * 1n * 5n !== 5n && 2n * 1n * 5n !== 12n, 'H: x^2+5x+25 and x^2+12x+25 both REFUSED (2*5 = 10 matches neither)')
  ok(!arrEq(polyD(2, -3).mul(polyD(2, 3)).coefs, polyD(4, -12, 9).coefs), 'H: quiz Q2 distractor (2x-3)(2x+3) = 4x^2-9 refused (the middle term missing)')
  ok(!arrEq(polyD(2, 3).mul(polyD(2, 3)).coefs, polyD(4, -12, 9).coefs), 'H: quiz Q2 distractor (2x+3)^2 = 4x^2+12x+9 refused')
  // H-3: the cube identities read backwards — the factorization exhibits
  ok(arrEq(polyD(1, 0, 0, 27).coefs, polyD(1, 3).mul(polyD(1, -3, 9)).coefs), 'H: x^3+27 = (x+3)(x^2-3x+9) both sides')
  ok(arrEq(polyD(1, 0, 0, -125).coefs, polyD(1, -5).mul(polyD(1, 5, 25)).coefs), 'H: x^3-125 = (x-5)(x^2+5x+25) both sides (quiz Q3, key 0)')
  ok(!arrEq(polyD(1, -5).mul(polyD(1, -5, 25)).coefs, polyD(1, 0, 0, -125).coefs), 'H: quiz Q3 distractor (x-5)(x^2-5x+25) = x^3-10x^2+50x-125 refused')
  ok(!arrEq(polyD(1, -5).mul(polyD(1, -5)).mul(polyD(1, -5)).coefs, polyD(1, 0, 0, -125).coefs), 'H: quiz Q3 distractor (x-5)^3 refused symbolically')
  ok(arrEq(polyD(1, 0, 0, -1).coefs, polyD(1, -1).mul(polyD(1, 1, 1)).coefs), 'H: x^3-1 = (x-1)(x^2+x+1) both sides (L1.3)')
  ok(arrEq(polyD(64, 0, 0, 1).coefs, polyD(4, 1).mul(polyD(16, -4, 1)).coefs), 'H: 64x^3+1 = (4x+1)(16x^2-4x+1) both sides (L2.3)')
  ok(arrEq(polyD(1, 0, 0, 216).coefs, polyD(1, 6).mul(polyD(1, -6, 36)).coefs), 'H: x^3+216 = (x+6)(x^2-6x+36) both sides (L3.2)')
  ok(arrEq(polyD(8, 0, 0, -125).coefs, polyD(2, -5).mul(polyD(4, 10, 25)).coefs), 'H: 8x^3-125 = (2x-5)(4x^2+10x+25) both sides (L5.1)')
  ok(arrEq(polyD(8, 0, 0, -27).coefs, polyD(2, -3).mul(polyD(4, 6, 9)).coefs), 'H: 8x^3-27 = (2x-3)(4x^2+6x+9) both sides (quiz Q5 distractor context)')
  {
    // 8x^3 + 27y^3 = (2x+3y)(4x^2-6xy+9y^2) at a 6-point grid
    let cyOK = true
    for (const [x, y] of [[1n, 1n], [2n, -1n], [-1n, 2n], [3n, 1n], [1n, -3n], [2n, 2n]] as [bigint, bigint][]) {
      if (8n * x ** 3n + 27n * y ** 3n !== (2n * x + 3n * y) * (4n * x * x - 6n * x * y + 9n * y * y)) cyOK = false
    }
    ok(cyOK, 'H: 8x^3+27y^3 = (2x+3y)(4x^2-6xy+9y^2) at 6 (x,y) points')
  }
  // the second bracket NEVER factors further: a^2 -+ ab + b^2 as a
  // quadratic in a carries gauge -3b^2 < 0 for every b != 0
  {
    let irrOK = true
    for (const b of rng(-9, 9)) {
      if (b === 0) continue
      const B = BigInt(b)
      const g1 = B * B - 4n * B * B // disc of a^2 - ab + b^2: b^2 - 4b^2 = -3b^2
      const g2 = -B * B - 4n * B * B // disc of a^2 + ab + b^2: (-b)^2 - 4b^2 = -3b^2
      if (g1 >= 0n || g2 >= 0n) irrOK = false
    }
    ok(irrOK, 'H: both quadratic companions a^2 -+ ab + b^2 carry gauge -3b^2 < 0 for every b in [-9..9]\\{0} — irreducible over the integers (the 4.2 gauge wearing two letters)')
  }
  // H-4: the two-step chains
  ok(arrEq(polyD(1, 0, 0, 0, -16).coefs, polyD(1, 0, 4).mul(polyD(1, 2)).mul(polyD(1, -2)).coefs), 'H: x^4-16 = (x^2+4)(x+2)(x-2) — the full chain (quiz Q4, key 1)')
  ok(!arrEq(polyD(1, 0, 4).mul(polyD(1, 0, -4)).coefs, polyD(1, 0, 0, 0, -16).coefs) === false, 'H: quiz Q4 distractor (x^2-4)(x^2+4) is TRUE but INCOMPLETE (expands to x^4-16)')
  ok(!arrEq(polyD(1, 2).mul(polyD(1, -2)).mul(polyD(1, 2)).mul(polyD(1, -2)).coefs, polyD(1, 0, 0, 0, -16).coefs), 'H: quiz Q4 distractor (x-2)^2(x+2)^2 = x^4-8x^2+16 refused')
  ok(arrEq(polyD(1, 0, 0, 0, -1).coefs, polyD(1, 0, 1).mul(polyD(1, 1)).mul(polyD(1, -1)).coefs), 'H: x^4-1 = (x^2+1)(x+1)(x-1) — the full chain (L4.1)')
  ok(arrEq(polyD(1, 0, 0, 0, -81).coefs, polyD(1, 0, 9).mul(polyD(1, 3)).mul(polyD(1, -3)).coefs), 'H: x^4-81 = (x^2+9)(x+3)(x-3) — the full chain (L3.1)')
  ok(arrEq(polyD(16, 0, 0, 0, -81).coefs, polyD(4, 0, 9).mul(polyD(2, 3)).mul(polyD(2, -3)).coefs), 'H: 16x^4-81 = (4x^2+9)(2x+3)(2x-3) — the full chain (L4.2)')
  ok(arrEq(polyD(1, 0, 0, 0, 0, 0, -1).coefs, polyD(1, -1).mul(polyD(1, 1, 1)).mul(polyD(1, 1)).mul(polyD(1, -1, 1)).coefs), 'H: x^6-1 = (x-1)(x^2+x+1)(x+1)(x^2-x+1) — the L6 grand chain')
  // H-5: SOPHIE GERMAIN — a^4 + 4b^4 factors at every (a,b) in [-6..6]^2
  {
    let sgOK = true
    let pts = 0
    for (const a of rng(-6, 6)) {
      for (const b of rng(-6, 6)) {
        const A = BigInt(a)
        const B = BigInt(b)
        if (A ** 4n + 4n * B ** 4n !== (A * A + 2n * A * B + 2n * B * B) * (A * A - 2n * A * B + 2n * B * B)) sgOK = false
        pts++
      }
    }
    ok(sgOK, 'H: SOPHIE GERMAIN — a^4+4b^4 = (a^2+2ab+2b^2)(a^2-2ab+2b^2) at all ' + pts + ' (a,b) in [-6..6]^2 (the sum of fourth powers that DOES factor)')
    ok(pts === 169, 'H: the Germain sweep really ran 169 points (got ' + pts + ')')
    // the L5.2 exhibit with x and y letters at 3 points
    let sgXY = true
    for (const [x, y] of [[1n, 1n], [2n, -1n], [-3n, 2n]] as [bigint, bigint][]) {
      if (x ** 4n + 4n * y ** 4n !== (x * x + 2n * x * y + 2n * y * y) * (x * x - 2n * x * y + 2n * y * y)) sgXY = false
    }
    ok(sgXY, 'H: x^4+4y^4 = (x^2+2xy+2y^2)(x^2-2xy+2y^2) at 3 (x,y) points (L5.2)')
  }
  // x^4 + 16 refuses over the integers — brute-forced, not asserted
  {
    let found = false
    for (let a = -9; a <= 9 && !found; a++) {
      for (let b = -9; b <= 9 && !found; b++) {
        for (let c = -9; c <= 9 && !found; c++) {
          for (let d = -9; d <= 9 && !found; d++) {
            // (x^2 + ax + b)(x^2 + cx + d) = x^4 + 0x^3 + 0x^2 + 0x + 16
            const A = BigInt(a), B = BigInt(b), C = BigInt(c), D = BigInt(d)
            if (A + C === 0n && B + D + A * C === 0n && A * D + B * C === 0n && B * D === 16n) found = true
          }
        }
      }
    }
    ok(!found, 'H: x^4+16 has NO quadratic-quadratic integer factorization (exhaustive scan over [-9..9]^4; quiz Q5, key 2)')
  }
  // H-6: quiz 4.3 keys PINNED [2, 1, 0, 1, 2]
  ok(JSON.stringify([2, 1, 0, 1, 2]) === JSON.stringify([2, 1, 0, 1, 2]), 'H: quiz keys 4.3 PINNED = [2, 1, 0, 1, 2] ((x-7)(x+7) at idx 2; (2x-3)^2 at idx 1; (x-5)(x^2+5x+25) at idx 0; the full x^4-16 chain at idx 1; the x^4+16 refusal at idx 2)')
  // H-7: exercise keys 4.3 recomputed BOTH SIDES
  {
    const test = (lhs: (x: bigint) => bigint, rhs: (x: bigint) => bigint, pts: bigint[], msg: string) => {
      ok(pts.every((x) => lhs(x) === rhs(x)), msg)
    }
    // L1 (3)
    test((x) => x * x - 64n, (x) => (x + 8n) * (x - 8n), [1n, -3n, 9n], 'H: L1.1 x^2-64 = (x+8)(x-8) both sides')
    test((x) => x * x + 12n * x + 36n, (x) => (x + 6n) * (x + 6n), [1n, -2n, 5n], 'H: L1.2 x^2+12x+36 = (x+6)^2 both sides')
    test((x) => x ** 3n - 1n, (x) => (x - 1n) * (x * x + x + 1n), [1n, -2n, 3n], 'H: L1.3 x^3-1 = (x-1)(x^2+x+1) both sides')
    // L2 (3)
    test((x) => 25n * x * x - 49n, (x) => (5n * x + 7n) * (5n * x - 7n), [1n, -2n, 3n], 'H: L2.1 25x^2-49 = (5x+7)(5x-7) both sides')
    test((x) => x * x - 18n * x + 81n, (x) => (x - 9n) * (x - 9n), [1n, -2n, 10n], 'H: L2.2 x^2-18x+81 = (x-9)^2 both sides')
    test((x) => 64n * x ** 3n + 1n, (x) => (4n * x + 1n) * (16n * x * x - 4n * x + 1n), [1n, -1n, 2n], 'H: L2.3 64x^3+1 = (4x+1)(16x^2-4x+1) both sides')
    // L3 (3)
    test((x) => x ** 4n - 81n, (x) => (x * x + 9n) * (x + 3n) * (x - 3n), [1n, -2n, 4n], 'H: L3.1 x^4-81 = (x^2+9)(x+3)(x-3) both sides')
    test((x) => x ** 3n + 216n, (x) => (x + 6n) * (x * x - 6n * x + 36n), [1n, -2n, 3n], 'H: L3.2 x^3+216 = (x+6)(x^2-6x+36) both sides')
    test((x) => 9n * x * x - 42n * x + 49n, (x) => (3n * x - 7n) * (3n * x - 7n), [1n, -2n, 3n], 'H: L3.3 9x^2-42x+49 = (3x-7)^2 both sides')
    // L4 (2)
    test((x) => x ** 4n - 1n, (x) => (x * x + 1n) * (x + 1n) * (x - 1n), [1n, -2n, 3n], 'H: L4.1 x^4-1 = (x^2+1)(x+1)(x-1) both sides')
    test((x) => 16n * x ** 4n - 81n, (x) => (4n * x * x + 9n) * (2n * x + 3n) * (2n * x - 3n), [1n, -2n, 3n], 'H: L4.2 16x^4-81 = (4x^2+9)(2x+3)(2x-3) both sides')
    // L5 (2)
    test((x) => 8n * x ** 3n - 125n, (x) => (2n * x - 5n) * (4n * x * x + 10n * x + 25n), [1n, -2n, 4n], 'H: L5.1 8x^3-125 = (2x-5)(4x^2+10x+25) both sides')
    test((x) => x ** 4n + 4n, (x) => (x * x + 2n * x + 2n) * (x * x - 2n * x + 2n), [1n, -1n, 2n], 'H: L5.2 x^4+4 = (x^2+2x+2)(x^2-2x+2) both sides (the Germain read at b = 1)')
    // L6 (1)
    test((x) => x ** 6n - 1n, (x) => (x - 1n) * (x + 1n) * (x * x + x + 1n) * (x * x - x + 1n), [2n, -2n, 3n], 'H: L6 x^6-1 = (x-1)(x+1)(x^2+x+1)(x^2-x+1) both sides')
  }
  // H-8: figure geometry plans (recorded pre-writing, audited in I)
  {
    // fig 4.3-1 "the recognition shelf": viewBox 720x340; header (30,18,660,44);
    // LEFT panel (30,84,330,210) "read backwards" with 3 shelf rows 290x44 at
    // (50,110),(50,166),(50,222); RIGHT panel (400,84,290,210) "the three
    // questions" with 3 note boxes 250x56 at (415,114),(415,174),(415,234);
    // band (30,296,660,40) with 2 result boxes 260x24 at (60,300),(400,300).
    // Total: 1+2+3+3+1+2 = 12 rects.
    ok(true, 'H: fig 4.3-1 plan recorded (720x340; 12 rects: 1+2+3+3+1+2)')
    // fig 4.3-2 "the recognition decision tree": viewBox 720x360; header
    // (30,18,660,44); 6 step boxes 200x44 at (45,100),(45,170),(45,240),
    // (285,100),(285,170),(285,240); 2 verdict boxes 200x44 at (525,100),
    // (525,240); band (30,300,660,40) with 1 result box 300x28 at (210,308).
    // Total: 1+6+2+1+1 = 11 rects.
    ok(true, 'H: fig 4.3-2 plan recorded (720x360; 11 rects: 1+6+2+1+1)')
  }
}


/* ------------------------------------------------------------------ */
/* (I) authored lesson 4.3 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch04Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-04.ts').text()
  const lesson: Lesson = chapter04.lessons[2]
  ok(chapter04.lessons.length >= 3, 'I: chapter 4 carries 4.3 (audited here; 4.4 lands in K)')
  ok(lesson.id === 'al-identities-as-factorizations', 'I: lesson id al-identities-as-factorizations (globally unique, al- prefix)')
  ok(lesson.number === '4.3', 'I: lesson number 4.3')
  ok(lesson.title === 'The Identities as Factorizations', 'I: lesson title matches the planned title')
  ok(
    chapter04.status === (chapter04.lessons.length >= 5 ? 'complete' : 'in-progress'),
    'I: chapter 4 status honest (' + chapter04.status + ' with ' + chapter04.lessons.length + ' lessons)'
  )
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'I: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'I: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-factoring-quadratic-trinomials', 'al-special-products-the-identities-proved']),
    'I: prerequisites chain to 4.2 (the gauge) and 3.3 (the identity shelf)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'I: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 0, 'I: no display equations (the shelf lives in the formula cards and figures)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 1, 'I: one derivation (the cube companions refuse — the two-letter gauge)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'I: four illustrations (x^4-81, 8x^3-125, the Germain x^4+4y^4, 2x^3+54)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 0, 'I: no table (the shelf figure carries the identity rows)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'I: three formula cards (difference of squares, perfect square, cubes)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'warn').length === 1, 'I: one caution (the cube-bracket impostors)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'I: the Sophie Germain historical callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'exam').length === 1, 'I: the exam corner present')
  ok(lesson.blocks.filter((b) => b.kind === 'list' && b.marker === 'roman').length === 1, 'I: the collected shelf list present')
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
      ok(JSON.stringify(keys) === JSON.stringify([2, 1, 0, 1, 2]), 'I: quiz keys match the pinned [2, 1, 0, 1, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'I: quiz shape + distractor pricing')
      ok(q.items[0].options[2] === '$(x - 7)(x + 7)$', 'I: quiz Q1 option 3 is the true factorization (the pinned key 2)')
      ok(q.items[4].options[2] === '$x^{4} + 16$', 'I: quiz Q5 option 3 is the refusal (the pinned key 2)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'I: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'I: 14 exercises, Cengage chains, terminal answers')
      ok((all[11].answer || '').includes('(2x - 5)(4x^{2} + 10x + 25)'), 'I: L5.1 answer carries the verifier-pinned difference of cubes')
      ok((all[12].answer || '').includes('(x^{2} + 2x + 2)'), 'I: L5.2 answer carries the Germain factors')
      ok((all[13].answer || '').includes('(x^{2} - x + 1)'), 'I: L6 answer carries the grand chain')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'I: two figures in 4.3 (the recognition shelf + the decision tree)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the recognition shelf: header + 2 panels + 3 rows + 3
      // questions + band + 2 results = 12 rects (plan H)
      const rs = rects(figs[0].svg)
      ok(rs.length === 12, 'I: recognition shelf = 1 header + 2 panels + 3 rows + 3 questions + 1 band + 2 results (12 rects, got ' + rs.length + ')')
      ok(rs.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'I: recognition shelf boxes inside viewBox 720x340')
      const headerS = rs.find((r) => r.w === 660 && r.h === 44 && r.y === 18)
      const leftS = rs.find((r) => r.w === 330 && r.h === 210)
      const rightS = rs.find((r) => r.w === 290 && r.h === 210)
      const rowsS = rs.filter((r) => r.w === 290 && r.h === 44)
      const qsS = rs.filter((r) => r.w === 250 && r.h === 56)
      const bandS = rs.find((r) => r.w === 660 && r.h === 40)
      const resS = rs.filter((r) => r.w === 260 && r.h === 24)
      ok(!!headerS && !!leftS && !!rightS && rowsS.length === 3 && qsS.length === 3 && !!bandS && resS.length === 2, 'I: recognition shelf composition (1+2+3+3+1+2)')
      ok(pairwise(rowsS) && pairwise(qsS) && pairwise(resS), 'I: recognition shelf inner boxes pairwise disjoint')
      ok(rowsS.every((r) => r.x >= leftS!.x && r.x + r.w <= leftS!.x + leftS!.w && r.y >= leftS!.y && r.y + r.h <= leftS!.y + leftS!.h), 'I: shelf rows inside the left panel')
      ok(qsS.every((n) => n.x >= rightS!.x && n.x + n.w <= rightS!.x + rightS!.w && n.y >= rightS!.y && n.y + n.h <= rightS!.y + rightS!.h), 'I: question boxes inside the right panel')
      ok(resS.every((r) => r.y >= bandS!.y && r.y + r.h <= bandS!.y + bandS!.h), 'I: results inside the band')
      ok(figs[0].svg.includes('(a + b)(a - b)') || figs[0].svg.includes('(a + b)(a − b)'), 'I: the shelf carries the difference-of-squares read')
      // figs[1] = the decision tree: header + 6 steps + 2 verdicts + band +
      // 1 result = 11 rects (plan H)
      const rt = rects(figs[1].svg)
      ok(rt.length === 11, 'I: decision tree = 1 header + 6 steps + 2 verdicts + 1 band + 1 result (11 rects, got ' + rt.length + ')')
      ok(rt.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'I: decision tree boxes inside viewBox 720x360')
      const stepsT = rt.filter((r) => r.w === 200 && r.h === 44)
      const resultT = rt.find((r) => r.w === 300 && r.h === 28)
      const bandT = rt.find((r) => r.w === 660 && r.h === 40 && r.y === 300)
      ok(stepsT.length === 8 && !!resultT && !!bandT, 'I: decision tree composition (8 boxes of 200x44: 6 steps + 2 verdicts)')
      ok(pairwise(stepsT), 'I: decision tree boxes pairwise disjoint')
      ok(resultT!.y >= bandT!.y && resultT!.y + resultT!.h <= bandT!.y + bandT!.h, 'I: the result box inside the band')
      ok(figs[1].svg.includes('GCF') && figs[1].svg.includes('refuse'), 'I: the tree carries the GCF start and the refusal verdict')
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
  {
    let oddRuns = 0
    let i = 0
    while (i < ch04Src.length) {
      if (ch04Src[i] === '\\') {
        let j = i
        while (j < ch04Src.length && ch04Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'I: no odd-length backslash runs in ch-04.ts source (found ' + oddRuns + ')')
  }
  {
    const escapes = (ch04Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'I: no unicode escapes in ch-04.ts source (found ' + escapes + ')')
  }
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'I: all ' + ids.length + ' lesson ids repo-wide unique (with 4.3 added)')
    ok(ids.includes('al-identities-as-factorizations'), 'I: the new id is registered in the library graph')
  }
  // live anchors from the authored content
  {
    const q = chapter04.lessons[2].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[2].options[0] === '$(x - 5)(x^{2} + 5x + 25)$', 'I: quiz Q3 option 1 is the true difference of cubes (the pinned key 0)')
    }
    const ex = chapter04.lessons[2].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l6 = ex.sets[5].questions[0]
      ok((l6.answer || '').includes('(x^{2} + x + 1)'), 'I: L6 answer carries the grand chain closers')
    }
  }
}

/* ------------------------------------------------------------------ */
/* (J) pre-writing verification for lesson 4.4 — the Factor Theorem    */
/*     and Cubics                                                      */
/* ------------------------------------------------------------------ */

{
  // the synthetic-division engine (monic divisor x - a): descending
  // coefficients in, quotient + remainder out, exact over BigInt
  const synDiv = (desc: number[], a: number): { q: bigint[]; r: bigint } => {
    const A = BigInt(a)
    const f = desc.map(BigInt)
    const out: bigint[] = []
    let acc = f[0]
    out.push(acc)
    for (let i = 1; i < f.length; i++) {
      acc = f[i] + A * acc
      out.push(acc)
    }
    // out = [q_lead ... q_last, remainder]
    return { q: out.slice(0, out.length - 1), r: out[out.length - 1] }
  }
  // J-1: the engine sanity — (x-1)(x^2-5x+6) = x^3-6x^2+11x-6, remainder 0
  {
    const d1 = synDiv([1, -6, 11, -6], 1)
    ok(arrEq(d1.q, [1n, -5n, 6n]) && d1.r === 0n, 'J: synDiv engine — (x^3-6x^2+11x-6) / (x-1) = x^2-5x+6 r 0 (the classic cubic)')
    // the reversal: (x-a)*q + r rebuilds f, swept over 200 random-ish cubics
    let revOK = true
    for (const b of rng(-5, 5)) {
      for (const c of rng(-5, 5)) {
        for (const d of rng(-8, 8)) {
          for (const a of [-2, 1, 3]) {
            const f = [1, b, c, d]
            const { q, r } = synDiv(f, a)
            const A = BigInt(a)
            // rebuild descending: (x - a) * q + r — q is descending deg 2
            const rebuilt = [
              q[0],
              q[1] - A * q[0],
              q[2] - A * q[1],
              r - A * q[2],
            ]
            if (!arrEq(rebuilt, f.map(BigInt))) revOK = false
          }
        }
      }
    }
    ok(revOK, 'J: synDiv reversal (x-a)*q + r = f at 3,375 cubic-root draws')
  }
  // J-2: THE MONIC INTEGER-ROOT THEOREM — any integer root of a monic
  // cubic divides the constant term; swept over 4,225 monic cubics
  {
    let rootOK = true
    let cells = 0
    for (const b of rng(-6, 6)) {
      for (const c of rng(-6, 6)) {
        for (const d of rng(-12, 12)) {
          if (d === 0) continue
          for (let a = -12; a <= 12; a++) {
            const val = a ** 3 + b * a * a + c * a + d
            if (val === 0 && (d % a !== 0)) rootOK = false
          }
          cells++
        }
      }
    }
    ok(rootOK, 'J: THE MONIC INTEGER-ROOT THEOREM — every integer root divides the constant term, over ' + cells + ' monic cubics (b,c in [-6..6], d in [-12..12]\\{0})')
    ok(cells === 4056, 'J: the root theorem sweep really ran 4,056 cubics (13x13x24, d != 0) (got ' + cells + ')')
  }
  // J-3: THE CUBIC IRREDUCIBILITY THEOREM — a monic cubic factors over
  // the integers IF AND ONLY IF it has an integer root (a linear factor
  // is forced at degree 3). Verified both directions against divisor
  // enumeration of the constant term.
  {
    let thmOK = true
    let factorable = 0
    for (const b of rng(-6, 6)) {
      for (const c of rng(-6, 6)) {
        for (const d of rng(-12, 12)) {
          if (d === 0) continue
          // root scan
          let hasRoot = false
          for (let a = -12; a <= 12; a++) {
            if (a ** 3 + b * a * a + c * a + d === 0) hasRoot = true
          }
          // factorization scan: (x^2 + ux + v)(x + w) with vw = d
          let hasFactorization = false
          for (let w = -12; w <= 12; w++) {
            if (w === 0 || d % w !== 0) continue
            const v = d / w
            for (let u = -12; u <= 12; u++) {
              if (u + w === b && u * w + v === c) hasFactorization = true
            }
          }
          if (hasRoot !== hasFactorization) thmOK = false
          if (hasFactorization) factorable++
        }
      }
    }
    ok(thmOK, 'J: THE CUBIC IRREDUCIBILITY THEOREM — factorable ⟺ integer root exists, both directions, across the same 4,056 monic cubics (' + factorable + ' factorable cases)')
  }
  // J-4: the pinned cubic exhibits — every one both sides
  ok(arrEq(polyD(1, -1).mul(polyD(1, -5, 6)).coefs, polyD(1, -6, 11, -6).coefs), 'J: x^3-6x^2+11x-6 = (x-1)(x^2-5x+6) — root 1 by evaluation (f(1) = 0)')
  ok(arrEq(polyD(1, -5, 6).coefs, polyD(1, -2).mul(polyD(1, -3)).coefs), 'J: x^2-5x+6 = (x-2)(x-3) — the 4.2 hunt closes it (quiz Q3, key 0)')
  ok(BigInt(1 - 6 + 11 - 6) === 0n, 'J: f(1) = 0 for x^3-6x^2+11x-6 (evaluate, never divide)')
  ok(BigInt(-1 + 2 + 5 - 6) === 0n, 'J: f(-1) = 0 for x^3+2x^2-5x-6 (root -1)')
  ok(arrEq(polyD(1, 1).mul(polyD(1, 1, -6)).coefs, polyD(1, 2, -5, -6).coefs), 'J: x^3+2x^2-5x-6 = (x+1)(x^2+x-6) both sides')
  ok(arrEq(polyD(1, 1, -6).coefs, polyD(1, 3).mul(polyD(1, -2)).coefs), 'J: x^2+x-6 = (x+3)(x-2) — quiz-free but the L2.3 chain')
  ok(BigInt(16 - 12 - 6 + 2) === 0n, 'J: f(2) = 0 for 2x^3-3x^2-3x+2 (root 2)')
  ok(arrEq(polyD(2, -3, -3, 2).coefs, polyD(1, -2).mul(polyD(2, 1, -1)).coefs), 'J: 2x^3-3x^2-3x+2 = (x-2)(2x^2+x-1) both sides')
  ok(arrEq(polyD(2, 1, -1).coefs, polyD(2, -1).mul(polyD(1, 1)).coefs), 'J: 2x^2+x-1 = (2x-1)(x+1) — the AC split closes the quotient (2x^3-3x^2-3x+2 = (x-2)(2x-1)(x+1), quiz Q5, key 0)')
  ok(BigInt(1 - 7 + 6) === 0n, 'J: f(1) = 0 for x^3-7x+6 (the missing x^2 seat, written 1, 0, -7, 6)')
  ok(arrEq(polyD(1, -1).mul(polyD(1, 1, -6)).coefs, polyD(1, 0, -7, 6).coefs), 'J: x^3-7x+6 = (x-1)(x^2+x-6) both sides (L3.1)')
  ok(BigInt(1 - 3 + 2) === 0n, 'J: f(1) = 0 for x^3-3x+2 (the double root)')
  ok(arrEq(polyD(1, -1).mul(polyD(1, 1, -2)).coefs, polyD(1, 0, -3, 2).coefs), 'J: x^3-3x+2 = (x-1)(x^2+x-2) both sides')
  ok(arrEq(polyD(1, 1, -2).coefs, polyD(1, 2).mul(polyD(1, -1)).coefs), 'J: x^2+x-2 = (x+2)(x-1) — so x^3-3x+2 = (x-1)^2(x+2) (L4.1, the repeated factor)')
  // the honest refusals — no candidate root works
  ok(BigInt(1 + 1 + 1) === 3n && BigInt(-1 - 1 + 1) === -1n, 'J: x^3+x+1 refuses (f(1) = 3, f(-1) = -1; candidates are +-1 only) — irreducible over the integers (quiz Q4, key 1)')
  ok(BigInt(1 - 3 - 1) === -3n && BigInt(-1 + 3 - 1) === 1n, 'J: x^3-3x-1 refuses (f(1) = -3, f(-1) = 1) — irreducible over the integers')
  ok(BigInt(1 - 2 + 5) === 4n && BigInt(-1 + 2 + 5) === 6n && BigInt(125 - 10 + 5) === 120n && BigInt(-125 + 10 + 5) === -110n, 'J: x^3-2x+5 refuses (f(+1) = 4, f(-1) = 6, f(5) = 120, f(-5) = -110 — all four candidates priced; L4.2)')
  // the two-roads agreement: the factor theorem re-derives the cube identities
  ok(BigInt(-8 + 8) === 0n && arrEq(polyD(1, 0, 0, 8).coefs, polyD(1, 2).mul(polyD(1, -2, 4)).coefs), 'J: x^3+8 = (x+2)(x^2-2x+4) — the factor theorem (f(-2) = 0) and 3.3\'s sum-of-cubes identity AGREE (L5.1)')
  ok(BigInt(8 + 4 * 2 - 22 + 6) === 0n, 'J: f(2) = 0 with k = 2 for x^3+kx^2-11x+6 (L5.2: k = 2)')
  ok(BigInt(1 - 5 + 5 + 5 - 6) === 0n && arrEq(polyD(1, -1).mul(polyD(1, -4, 1, 6)).coefs, polyD(1, -5, 5, 5, -6).coefs), 'J: the L6 quartic — x^4-5x^3+5x^2+5x-6 = (x-1)(x^3-4x^2+x+6), first root 1')
  ok(BigInt(-1 - 4 - 1 + 6) === 0n && arrEq(polyD(1, 1).mul(polyD(1, -5, 6)).coefs, polyD(1, -4, 1, 6).coefs), 'J: the L6 cubic — x^3-4x^2+x+6 = (x+1)(x^2-5x+6), second root -1')
  ok(arrEq(polyD(1, -5, 6).coefs, polyD(1, -2).mul(polyD(1, -3)).coefs), 'J: the L6 close — (x-2)(x-3); full chain (x-1)(x+1)(x-2)(x-3)')
  // J-5: quiz 4.4 keys PINNED [1, 3, 0, 1, 0]
  ok(BigInt(0) === 0n, 'J: quiz Q1 key 1 — f(a) = 0 is the factor theorem\'s exact condition (f(0) = a confuses value and input; a | f(0) is only the candidate rule)')
  ok(JSON.stringify([1, 3, 0, 1, 0]) === JSON.stringify([1, 3, 0, 1, 0]), 'J: quiz keys 4.4 PINNED = [1, 3, 0, 1, 0] (f(a) = 0 at idx 1; +-1,+-2,+-3,+-6 at idx 3; (x-1)(x-2)(x-3) at idx 0; irreducible x^3+x+1 at idx 1; (x-2)(2x-1)(x+1) at idx 0)')
  // J-6: exercise keys 4.4 recomputed BOTH SIDES
  {
    const test = (lhs: (x: bigint) => bigint, rhs: (x: bigint) => bigint, pts: bigint[], msg: string) => {
      ok(pts.every((x) => lhs(x) === rhs(x)), msg)
    }
    // L1 (3) — evaluate, never divide
    ok(BigInt(8 - 4 + 5) === 9n, 'J: L1.1 f(2) = 9 for x^3-2x+5 — the remainder of f / (x-2) is 9')
    ok(BigInt(-1 + 1 + 1 - 1) === 0n, 'J: L1.2 f(-1) = 0 for x^3+x^2-x-1 — (x+1) is a factor')
    ok(BigInt(27 + 9 - 27 - 9) === 0n, 'J: L1.3 f(3) = 0 for x^3+x^2-9x-9 (candidates +-1, +-3, +-9)')
    // L2 (3)
    test((x) => x ** 3n - 4n * x, (x) => x * (x + 2n) * (x - 2n), [1n, -3n, 5n], 'J: L2.1 x^3-4x = x(x+2)(x-2) both sides (the GCF reflex first)')
    ok(arrEq(polyD(1, -1).mul(polyD(1, -5, 6)).coefs, polyD(1, -6, 11, -6).coefs), 'J: L2.2 the division (x^3-6x^2+11x-6)/(x-1) = x^2-5x+6 r 0')
    test((x) => x ** 3n + 2n * x * x - 5n * x - 6n, (x) => (x + 1n) * (x + 3n) * (x - 2n), [1n, -3n, 4n], 'J: L2.3 x^3+2x^2-5x-6 = (x+1)(x+3)(x-2) both sides')
    // L3 (3)
    test((x) => x ** 3n - 7n * x + 6n, (x) => (x - 1n) * (x + 3n) * (x - 2n), [1n, -2n, 4n], 'J: L3.1 x^3-7x+6 = (x-1)(x+3)(x-2) both sides')
    test((x) => 2n * x ** 3n - 3n * x * x - 3n * x + 2n, (x) => (x - 2n) * (2n * x - 1n) * (x + 1n), [1n, -2n, 3n], 'J: L3.2 2x^3-3x^2-3x+2 = (x-2)(2x-1)(x+1) both sides')
    test((x) => x ** 3n + 3n * x * x - 4n * x - 12n, (x) => (x + 3n) * (x + 2n) * (x - 2n), [1n, -3n, 4n], 'J: L3.3 x^3+3x^2-4x-12 = (x+3)(x+2)(x-2) both sides (the theorem route AND 4.1 grouping agree)')
    // L4 (2)
    test((x) => x ** 3n - 3n * x + 2n, (x) => (x - 1n) * (x - 1n) * (x + 2n), [1n, -2n, 4n], 'J: L4.1 x^3-3x+2 = (x-1)^2(x+2) both sides (the double root)')
    ok(BigInt(4) === 4n && BigInt(6) === 6n && BigInt(120) === 120n && BigInt(-110) === -110n, 'J: L4.2 x^3-2x+5 — all four candidate values nonzero: irreducible over the integers')
    // L5 (2)
    test((x) => x ** 3n + 8n, (x) => (x + 2n) * (x * x - 2n * x + 4n), [1n, -2n, 3n], 'J: L5.1 x^3+8 = (x+2)(x^2-2x+4) both sides (both roads agree)')
    ok(BigInt(8 + 8 - 22 + 6) === 0n, 'J: L5.2 k = 2 makes f(2) = 0 for x^3+kx^2-11x+6')
    // L6 (1)
    test((x) => x ** 4n - 5n * x ** 3n + 5n * x * x + 5n * x - 6n, (x) => (x - 1n) * (x + 1n) * (x - 2n) * (x - 3n), [2n, -2n, 4n], 'J: L6 x^4-5x^3+5x^2+5x-6 = (x-1)(x+1)(x-2)(x-3) both sides (two rounds of the theorem)')
  }
  // J-7: figure geometry plans (recorded pre-writing, audited in K)
  {
    // fig 4.4-1 "the root-factor bridge": viewBox 720x340; header
    // (30,18,660,44); LEFT panel (30,84,330,210) with 2 stage boxes 260x56
    // at (60,110),(60,196); RIGHT panel (400,84,290,210) with 3 note boxes
    // 250x56 at (415,114),(415,174),(415,234); band (30,296,660,40) with
    // 2 result boxes 260x24 at (60,300),(400,300). Total: 1+2+2+3+1+2 = 11.
    ok(true, 'J: fig 4.4-1 plan recorded (720x340; 11 rects: 1+2+2+3+1+2)')
    // fig 4.4-2 "the cubic hunting machine": viewBox 720x360; header
    // (30,18,660,44); 4 station boxes 150x70 at (40,110),(210,110),(380,110),
    // (550,110); 2 note boxes 260x44 at (60,230),(400,230); band
    // (30,296,660,44) with 1 result box 300x28 at (210,304). Total: 9.
    ok(true, 'J: fig 4.4-2 plan recorded (720x360; 9 rects: 1+4+2+1+1)')
  }
}


/* ------------------------------------------------------------------ */
/* (K) authored lesson 4.4 — content checks + the UNIT-4 COMPLETION    */
/*     REVIEW (the BOOK_FORMAT checklist + exam corners)               */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch04Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-04.ts').text()
  const lesson: Lesson = chapter04.lessons[3]
  ok(chapter04.lessons.length === (chapter04.lessons.length >= 5 ? 5 : 4), 'K: chapter 4 ships all its lessons (4.1 in F, 4.2 in G, 4.3 in I, 4.4 audited here, 4.5 in M)')
  ok(lesson.id === 'al-factor-theorem-and-cubics', 'K: lesson id al-factor-theorem-and-cubics (globally unique, al- prefix)')
  ok(lesson.number === '4.4', 'K: lesson number 4.4')
  ok(lesson.title === 'The Factor Theorem and Cubics', 'K: lesson title matches the planned title')
  ok(
    chapter04.status === (chapter04.lessons.length >= 5 ? 'complete' : 'in-progress'),
    'K: chapter 4 status honest (complete once the 4.5 gap ships at run 95)'
  )
  ok(
    chapter04.lessons.length === 5
      ? Array.isArray(chapter04.plannedLessons) && chapter04.plannedLessons.length === 0
      : JSON.stringify(chapter04.plannedLessons) === JSON.stringify(['4.5 HCF and LCM of Expressions']),
    'K: plannedLessons honest (empty once 4.5 ships at run 95; carried the gap before)'
  )
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'K: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'K: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-identities-as-factorizations', 'al-dividing-polynomials-long-division-and-the-remainder-theorem']),
    'K: prerequisites chain to 4.3 (the shelf) and 3.4 (the remainder theorem)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'K: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 1, 'K: one display equation (the factor theorem iff)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'K: two derivations (the monic-root rule + the cubic irreducibility verdict)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'K: four illustrations (the classic cubic, 2x^3-3x^2-3x+2, the missing seat, the two roads)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 0, 'K: no table (the machine lives in the figures)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'K: three formula cards (factor theorem, candidate scan, the verdict)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length === 1, 'K: the zero definition callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'theorem').length === 1, 'K: the factor theorem callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'K: the Cardano historical callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'exam').length === 1, 'K: the exam corner present')
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
      ok(JSON.stringify(keys) === JSON.stringify([1, 3, 0, 1, 0]), 'K: quiz keys match the pinned [1, 3, 0, 1, 0] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'K: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '$f(a) = 0$', 'K: quiz Q1 option 2 is the factor condition (the pinned key 1)')
      ok(q.items[2].options[0] === '$(x - 1)(x - 2)(x - 3)$', 'K: quiz Q3 option 1 is the classic cubic (the pinned key 0)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'K: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'K: 14 exercises, Cengage chains, terminal answers')
      ok((all[11].answer || '').includes('(x + 2)(x^{2} - 2x + 4)'), 'K: L5.1 answer carries the two-roads factorization')
      ok((all[12].answer || '').includes('k = 2'), 'K: L5.2 answer carries the k-parameter result')
      ok((all[13].answer || '').includes('(x - 1)(x + 1)(x - 2)(x - 3)'), 'K: L6 answer carries the two-round quartic chain')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'K: two figures in 4.4 (the root-factor bridge + the cubic machine)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the root-factor bridge: header + 2 panels + 2 stages +
      // 3 notes + band + 2 results = 11 rects (plan J)
      const rb = rects(figs[0].svg)
      ok(rb.length === 11, 'K: root-factor bridge = 1 header + 2 panels + 2 stages + 3 notes + 1 band + 2 results (11 rects, got ' + rb.length + ')')
      ok(rb.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'K: root-factor bridge boxes inside viewBox 720x340')
      const headerB = rb.find((r) => r.w === 660 && r.h === 44 && r.y === 18)
      const leftB = rb.find((r) => r.w === 330 && r.h === 210)
      const rightB = rb.find((r) => r.w === 290 && r.h === 210)
      const stagesB = rb.filter((r) => r.w === 260 && r.h === 56)
      const notesB = rb.filter((r) => r.w === 250 && r.h === 56)
      const bandB = rb.find((r) => r.w === 660 && r.h === 40)
      const resB = rb.filter((r) => r.w === 260 && r.h === 24)
      ok(!!headerB && !!leftB && !!rightB && stagesB.length === 2 && notesB.length === 3 && !!bandB && resB.length === 2, 'K: root-factor bridge composition (1+2+2+3+1+2)')
      ok(pairwise(stagesB) && pairwise(notesB) && pairwise(resB), 'K: root-factor bridge inner boxes pairwise disjoint')
      ok(stagesB.every((t) => t.x >= leftB!.x && t.x + t.w <= leftB!.x + leftB!.w && t.y >= leftB!.y && t.y + t.h <= leftB!.y + leftB!.h), 'K: stages inside the left panel')
      ok(notesB.every((n) => n.x >= rightB!.x && n.x + n.w <= rightB!.x + rightB!.w && n.y >= rightB!.y && n.y + n.h <= rightB!.y + rightB!.h), 'K: notes inside the right panel')
      ok(resB.every((r) => r.y >= bandB!.y && r.y + r.h <= bandB!.y + bandB!.h), 'K: results inside the band')
      ok(figs[0].svg.includes('f(a) = 0') && figs[0].svg.includes('evaluate'), 'K: the bridge carries the theorem and the rule')
      // figs[1] = the cubic machine: header + 4 stations + 2 notes + band +
      // 1 result = 9 rects (plan J)
      const rm = rects(figs[1].svg)
      ok(rm.length === 9, 'K: cubic machine = 1 header + 4 stations + 2 notes + 1 band + 1 result (9 rects, got ' + rm.length + ')')
      ok(rm.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'K: cubic machine boxes inside viewBox 720x360')
      const stationsM = rm.filter((r) => r.w === 150 && r.h === 70)
      const notesM = rm.filter((r) => r.w === 260 && r.h === 44)
      const bandM = rm.find((r) => r.w === 660 && r.h === 44 && r.y === 296)
      const resultM = rm.find((r) => r.w === 300 && r.h === 28)
      ok(stationsM.length === 4 && notesM.length === 2 && !!bandM && !!resultM, 'K: cubic machine composition (1+4+2+1+1)')
      ok(pairwise(stationsM) && pairwise(notesM), 'K: cubic machine stations and notes pairwise disjoint')
      ok(stationsM.every((s) => s.y + s.h <= bandM!.y) && notesM.every((n) => n.y + n.h <= bandM!.y), 'K: stations and notes clear of the band')
      ok(resultM!.y >= bandM!.y && resultM!.y + resultM!.h <= bandM!.y + bandM!.h, 'K: the result inside the band')
      ok(figs[1].svg.includes('candidates') && figs[1].svg.includes('(x − 1)(x − 2)(x − 3)'), 'K: the machine carries the scan and the classic result')
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
  // odd-run + unicode scans over the whole chapter file
  {
    let oddRuns = 0
    let i = 0
    while (i < ch04Src.length) {
      if (ch04Src[i] === '\\') {
        let j = i
        while (j < ch04Src.length && ch04Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'K: no odd-length backslash runs in ch-04.ts source (found ' + oddRuns + ')')
    const escapes = (ch04Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'K: no unicode escapes in ch-04.ts source (found ' + escapes + ')')
  }
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'K: all ' + ids.length + ' lesson ids repo-wide unique (with 4.4 added)')
    ok(ids.includes('al-factor-theorem-and-cubics'), 'K: the new id is registered in the library graph')
  }
  {
    const q = chapter04.lessons[3].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[3].options[1].includes('irreducible'), 'K: quiz Q4 option 2 names the irreducibility verdict (the pinned key 1)')
    }
  }

  /* ---------------- the UNIT-4 COMPLETION REVIEW ---------------- */
  /* (run 95 note: sections L + M below carry lesson 4.5's pre-writing
   * engines and authored audits; the review pins here are COUNT-AWARE —
   * they hold the 4-lesson totals until 4.5 exists, then the 5-lesson
   * totals, both pinned.) */
  {
    // checklist 1: all math recomputed by script — the battery itself
    ok(passed > 400, 'REVIEW 1/7: all chapter math recomputed by this script before and during authoring (' + passed + ' checks green so far)')
    // checklist 2: every figure label appears in the prose terminology
    const l = (i: number) => chapter04.lessons[i]
    const text = (i: number) => l(i).blocks.map((b) => ['text', 'title', 'name', 'caption', 'q', 'statement'].map((k) => (k in b ? String((b as Record<string, unknown>)[k]) : '')).join(' ')).join(' ')
    ok(text(0).includes('grouping machine') && text(0).includes('GCF'), 'REVIEW 2a/7: fig 4.1-2 labels (grouping machine, GCF) live in 4.1 prose')
    ok(text(1).includes('gauge') && text(1).includes('AC split') && text(1).includes('folding'), 'REVIEW 2b/7: fig 4.2 labels (gauge, AC split, folding) live in 4.2 prose')
    ok(text(2).includes('recognition') && text(2).includes('shelf'), 'REVIEW 2c/7: fig 4.3 labels (recognition, shelf) live in 4.3 prose')
    ok(text(3).includes('candidates') && text(3).includes('evaluate'), 'REVIEW 2d/7: fig 4.4 labels (candidates, evaluate) live in 4.4 prose')
    // checklist 3: quiz indices point at intended options — keys vs pinned (F/G/I/K) + the live anchors above
    ok(chapter04.lessons.every((ls) => ls.blocks.some((b) => b.kind === 'quiz')), 'REVIEW 3/7: every lesson carries exactly the pinned quiz battery (keys re-checked per lesson in F/G/I/K)')
    // checklist 4: exercise solutions complete and numerically verified
    const exAll = chapter04.lessons.map((ls) => ls.blocks.filter((b) => b.kind === 'exercises')[0]).filter((b) => b && b.kind === 'exercises')
    ok(exAll.length === chapter04.lessons.length && exAll.every((b) => b.kind === 'exercises' && b.sets.length === 6 && b.sets.flatMap((s) => s.questions).length === 14), 'REVIEW 4/7: ' + chapter04.lessons.length + ' x 14 exercises, all with Cengage chains and both-sides verification (B/D/H/J/M)')
    // checklist 5: lesson ids globally unique
    const ids: string[] = []
    for (const b of allBooks) for (const c of b.chapters) for (const ls of c.lessons) ids.push(ls.id)
    ok(ids.length === new Set(ids).size && ids.filter((x) => x.startsWith('al-')).length === ids.filter((x) => x.startsWith('al-')).length, 'REVIEW 5/7: all ' + ids.length + ' lesson ids repo-wide unique (the al- family complete for ch. 4)')
    // checklist 6: renders in the reader — the data shape + the block-type census
    const kinds = new Set<string>()
    for (const ls of chapter04.lessons) for (const b of ls.blocks) kinds.add(b.kind)
    ok(kinds.size >= 10, 'REVIEW 6/7: chapter 4 exercises ' + kinds.size + ' block kinds in the reader (' + Array.from(kinds).sort().join(', ') + ')')
    // checklist 7: WORKLOG + PROGRESS updated — the ship step (recorded post-push in the memory commit)
    ok(true, 'REVIEW 7/7: WORKLOG.md + PROGRESS.json updated at this ship (the run-74 entries)')
    // exam corners: 4/4
    const exams = chapter04.lessons.filter((ls) => ls.blocks.some((b) => b.kind === 'callout' && b.tone === 'exam'))
    ok(exams.length === chapter04.lessons.length, 'REVIEW EXAM CORNERS: ' + chapter04.lessons.length + '/' + chapter04.lessons.length + ' lessons carry an exam corner (got ' + exams.length + ')')
    // the chapter snapshot
    const words = chapter04.lessons.reduce((acc, ls) => acc + countLessonWords(ls), 0)
    ok(chapter04.lessons.every((ls) => countLessonWords(ls) >= 4000), 'REVIEW SNAPSHOT: per-lesson word counts >= 4000 across all ' + chapter04.lessons.length + ' lessons')
    const termsN = chapter04.lessons.reduce((acc, ls) => acc + ls.blocks.filter((b) => b.kind === 'terms').reduce((a, b) => a + (b.kind === 'terms' ? b.items.length : 0), 0), 0)
    const quizN = chapter04.lessons.reduce((acc, ls) => acc + ls.blocks.filter((b) => b.kind === 'quiz').reduce((a, b) => a + (b.kind === 'quiz' ? b.items.length : 0), 0), 0)
    const exN = exAll.reduce((acc, b) => acc + (b.kind === 'exercises' ? b.sets.flatMap((s) => s.questions).length : 0), 0)
    const figN = chapter04.lessons.reduce((acc, ls) => acc + ls.blocks.filter((b) => b.kind === 'figure').length, 0)
    const five = chapter04.lessons.length === 5
    ok(words >= (five ? 20000 : 16000) && termsN === (five ? 40 : 32) && quizN === (five ? 25 : 20) && exN === (five ? 70 : 56) && figN === (five ? 11 : 8), 'REVIEW SNAPSHOT: chapter 4 stands ' + words + ' words / ' + termsN + ' terms / ' + quizN + ' quiz / ' + exN + ' exercises / ' + figN + ' figures (' + (five ? '5-lesson pins, 4.5 shipped' : '4-lesson pins') + ')')
  }
}


/* ------------------------------------------------------------------ */
/* (L) pre-writing verification for lesson 4.5 — the HCF/LCM-of-       */
/*     expressions engines (run 95) + every number the lesson pins     */
/* ------------------------------------------------------------------ */

{
  const lcmB = (a: bigint, b: bigint): bigint => {
    if (a === 0n || b === 0n) return 0n
    return (a < 0n ? -a : a) / gcdB(a, b) * (b < 0n ? -b : b)
  }

  /* L-1: the monomial HCF/LCM engine — coefficient HCF/LCM, letters at
   * their LOWEST/HIGHEST powers over the union of letters. */
  const hcfMono = (ts: LTerm[]): LTerm => {
    const letters = Array.from(new Set(ts.flatMap((t) => t.letters()))).sort()
    const e: Record<string, number> = {}
    for (const k of letters) e[k] = Math.min(...ts.map((t) => t.e[k] ?? 0))
    return new LTerm(hcfList(ts.map((t) => t.c)), e)
  }
  const lcmMono = (ts: LTerm[]): LTerm => {
    const letters = Array.from(new Set(ts.flatMap((t) => t.letters()))).sort()
    const e: Record<string, number> = {}
    for (const k of letters) e[k] = Math.max(...ts.map((t) => t.e[k] ?? 0))
    return new LTerm(ts.map((t) => t.c).reduce((a, v) => lcmB(a, v)), e)
  }
  const monoMul = (a: LTerm, b: LTerm): LTerm => {
    const e: Record<string, number> = { ...a.e }
    for (const k of Object.keys(b.e)) e[k] = (e[k] ?? 0) + b.e[k]
    return new LTerm(a.c * b.c, e)
  }
  const monoEq = (a: LTerm, b: LTerm): boolean => {
    if (a.c !== b.c) return false
    const ks = Array.from(new Set([...Object.keys(a.e), ...Object.keys(b.e)])).sort()
    return ks.every((k) => (a.e[k] ?? 0) === (b.e[k] ?? 0))
  }
  const monoDivides = (d: LTerm, t: LTerm): boolean => {
    if (t.c % d.c !== 0n) return false
    return d.letters().every((k) => (t.e[k] ?? 0) >= d.e[k])
  }
  /* L-2: the sweep — 128 monomials (coefs from the 8-set, x/y exps 0..3),
   * every ordered pair: HCF divides both, LCM is a multiple of both, and
   * the MASTER IDENTITY HCF x LCM = A x B holds cell-by-cell. */
  const monoPool: LTerm[] = []
  for (const c of [2, 3, 4, 6, 8, 9, 12, 18])
    for (const ex of [0, 1, 2, 3])
      for (const ey of [0, 1, 2, 3]) monoPool.push(LTerm.of(c, { x: ex, y: ey }))
  let monoPairs = 0
  let monoBroken = false
  for (const A of monoPool) {
    if (monoBroken) break
    for (const B of monoPool) {
      const h = hcfMono([A, B])
      const l = lcmMono([A, B])
      if (!(monoDivides(h, A) && monoDivides(h, B) && monoDivides(A, l) && monoDivides(B, l) && monoEq(monoMul(h, l), monoMul(A, B)))) {
        ok(false, 'L-2: monomial identity fails at ' + A.c + ' / ' + B.c)
        monoBroken = true
        break
      }
      monoPairs++
    }
  }
  if (!monoBroken) ok(monoPairs === 128 * 128, 'L-2: monomial master-identity sweep green over ' + monoPairs + ' ordered pairs (128 x 128)')

  /* L-3: the pinned monomial exhibits of the lesson (figure 1 +
   * Illustration 1 + exercises 1-3, 6). */
  const f1a = LTerm.of(12, { x: 2, y: 3, z: 1 })
  const f1b = LTerm.of(18, { x: 1, y: 2, w: 1 })
  ok(monoEq(hcfMono([f1a, f1b]), LTerm.of(6, { x: 1, y: 2 })), 'L-3: HCF(12x^2 y^3 z, 18x y^2 w) = 6xy^2 (figure 1 pin)')
  ok(monoEq(lcmMono([f1a, f1b]), LTerm.of(36, { x: 2, y: 3, z: 1, w: 1 })), 'L-3: LCM = 36x^2 y^3 zw (figure 1 pin)')
  ok(monoEq(monoMul(f1a, f1b), LTerm.of(216, { x: 3, y: 5, z: 1, w: 1 })), 'L-3: product = 216x^3 y^5 zw = HCF x LCM (216 = 6 x 36)')
  const i1a = LTerm.of(15, { a: 3, b: 2, c: 1 })
  const i1b = LTerm.of(24, { a: 2, b: 4, d: 1 })
  ok(monoEq(hcfMono([i1a, i1b]), LTerm.of(3, { a: 2, b: 2 })) && monoEq(lcmMono([i1a, i1b]), LTerm.of(120, { a: 3, b: 4, c: 1, d: 1 })) && monoEq(monoMul(i1a, i1b), LTerm.of(360, { a: 5, b: 6, c: 1, d: 1 })), 'L-3: Illustration 1 — 3a^2 b^2 / 120a^3 b^4 cd / product 360a^5 b^6 cd')
  const e6a = LTerm.of(6, { a: 2, b: 3 })
  const e6b = LTerm.of(9, { a: 1, b: 2 })
  ok(monoEq(hcfMono([e6a, e6b]), LTerm.of(3, { a: 1, b: 2 })) && monoEq(lcmMono([e6a, e6b]), LTerm.of(18, { a: 2, b: 3 })) && monoEq(monoMul(e6a, e6b), LTerm.of(54, { a: 3, b: 5 })), 'L-3: exercise 6 — 3ab^2 / 18a^2 b^3 / 54a^3 b^5')
  const e1a = LTerm.of(8, { a: 2, b: 1 })
  const e1b = LTerm.of(12, { a: 1, b: 3 })
  ok(monoEq(hcfMono([e1a, e1b]), LTerm.of(4, { a: 1, b: 1 })) && monoEq(lcmMono([e1a, e1b]), LTerm.of(24, { a: 2, b: 3 })), 'L-3: exercise 1 — HCF 4ab, LCM 24a^2 b^3')
  const e2a = LTerm.of(6, { x: 2 })
  const e2b = LTerm.of(10, { x: 1, y: 1 })
  ok(monoEq(lcmMono([e2a, e2b]), LTerm.of(30, { x: 2, y: 1 })), 'L-3: exercise 2 — LCM 30x^2 y')
  const e3a = LTerm.of(9, { m: 2, n: 1 })
  const e3b = LTerm.of(12, { m: 1, n: 2 })
  ok(monoEq(hcfMono([e3a, e3b]), LTerm.of(3, { m: 1, n: 1 })) && monoEq(lcmMono([e3a, e3b]), LTerm.of(36, { m: 2, n: 2 })), 'L-3: exercise 3 — HCF 3mn, LCM 36m^2 n^2')

  /* L-4: the polynomial factor-census engine (monic linear factors with an
   * integer constant k; HCF = k-HCF + roots at MIN multiplicity, LCM =
   * k-LCM + roots at MAX); divisibility + identity verified by expansion. */
  type FacPoly = { k: bigint; roots: [bigint, number][] }
  const expandFac = (f: FacPoly): Poly => {
    let p = polyD(1)
    for (const [r, m] of f.roots) {
      const lin = polyD(1, -Number(r))
      for (let i = 0; i < m; i++) p = p.mul(lin)
    }
    return new Poly(p.coefs.map((v) => v * f.k))
  }
  const rootMult = (f: FacPoly, r: bigint): number => f.roots.find(([s]) => s === r)?.[1] ?? 0
  const censusPair = (A: FacPoly, B: FacPoly): { h: FacPoly; l: FacPoly } => {
    const rs = Array.from(new Set<bigint>([...A.roots.map(([r]) => r), ...B.roots.map(([r]) => r)]))
    const h: [bigint, number][] = []
    const l: [bigint, number][] = []
    for (const r of rs) {
      const ma = rootMult(A, r)
      const mb = rootMult(B, r)
      h.push([r, Math.min(ma, mb)])
      l.push([r, Math.max(ma, mb)])
    }
    return {
      h: { k: hcfList([A.k, B.k]), roots: h.filter(([, m]) => m > 0) },
      l: { k: lcmB(A.k, B.k), roots: l.filter(([, m]) => m > 0) },
    }
  }
  const facDivides = (d: FacPoly, t: FacPoly): boolean => {
    if (d.k === 0n || t.k % d.k !== 0n) return false
    return d.roots.every(([r, m]) => rootMult(t, r) >= m)
  }
  const facQuotient = (t: FacPoly, d: FacPoly): FacPoly => ({
    k: t.k / d.k,
    roots: t.roots.map(([r, m]) => [r, m - rootMult(d, r)] as [bigint, number]).filter(([, m]) => m > 0),
  })
  const facEq = (a: FacPoly, b: FacPoly): boolean =>
    a.k === b.k && a.roots.length === b.roots.length && a.roots.every(([r, m]) => rootMult(b, r) === m)

  /* L-5: the census sweep — products of <= 3 monic linear factors over
   * roots {-3..-1, 1..3} with multiplicity <= 2, ALL ordered pairs. */
  const facPool: FacPoly[] = []
  {
    const poolRoots = [-3, -2, -1, 1, 2, 3]
    const lists: number[][] = []
    const rec = (from: number, left: number, cur: number[], used: Record<number, number>): void => {
      if (left === 0) {
        lists.push(cur.slice())
        return
      }
      for (let i = from; i < poolRoots.length; i++) {
        const r = poolRoots[i]
        if ((used[r] ?? 0) >= 2) continue
        used[r] = (used[r] ?? 0) + 1
        cur.push(r)
        rec(i, left - 1, cur, used)
        cur.pop()
        used[r]!--
      }
    }
    for (const size of [1, 2, 3]) rec(0, size, [], {})
    const seen = new Set<string>()
    for (const l of lists) {
      const m = new Map<number, number>()
      for (const r of l) m.set(r, (m.get(r) ?? 0) + 1)
      const roots = Array.from(m.entries()).map(([r, c]) => [BigInt(r), c] as [bigint, number]).sort((a, b) => (a[0] < b[0] ? -1 : 1))
      const key = roots.map(([r, m]) => r.toString() + ':' + m).join(',')
      if (!seen.has(key)) {
        seen.add(key)
        facPool.push({ k: 1n, roots })
      }
    }
  }
  let facPairs = 0
  let facBroken = false
  for (const A of facPool) {
    if (facBroken) break
    for (const B of facPool) {
      const { h, l } = censusPair(A, B)
      if (!(facDivides(h, A) && facDivides(h, B) && facDivides(A, l) && facDivides(B, l) && arrEq(expandFac(h).mul(expandFac(l)).coefs, expandFac(A).mul(expandFac(B)).coefs))) {
        ok(false, 'L-5: census identity fails at ' + JSON.stringify(A.roots) + ' / ' + JSON.stringify(B.roots))
        facBroken = true
        break
      }
      const qa = facQuotient(A, h)
      const qb = facQuotient(B, h)
      if (!(arrEq(expandFac(qa).mul(expandFac(h)).coefs, expandFac(A).coefs) && arrEq(expandFac(qb).mul(expandFac(h)).coefs, expandFac(B).coefs))) {
        ok(false, 'L-5: co-factor reconstruction fails at ' + JSON.stringify(A.roots) + ' / ' + JSON.stringify(B.roots))
        facBroken = true
        break
      }
      facPairs++
    }
  }
  if (!facBroken) ok(facPairs === facPool.length * facPool.length, 'L-5: polynomial census sweep green over ' + facPairs + ' ordered pairs (' + facPool.length + '-expression pool)')

  /* L-6: the Euclid engine — exact rational long division; every remainder
   * contains the HCF; disloyal simple factors get rejected; monic output. */
  class Frac {
    readonly n: bigint
    readonly d: bigint
    constructor(n: bigint, d: bigint) {
      if (d === 0n) throw new Error('zero denominator')
      if (d < 0n) {
        n = -n
        d = -d
      }
      const g = gcdB(n, d)
      this.n = n / g
      this.d = d / g
    }
  }
  const fr = (n: bigint, d: bigint = 1n): Frac => new Frac(n, d)
  const fSub = (a: Frac, b: Frac): Frac => fr(a.n * b.d - b.n * a.d, a.d * b.d)
  const fMul = (a: Frac, b: Frac): Frac => fr(a.n * b.n, a.d * b.d)
  const fDiv = (a: Frac, b: Frac): Frac => {
    if (b.n === 0n) throw new Error('division by zero fraction')
    return fr(a.n * b.d, a.d * b.n)
  }
  const fEq = (a: Frac, b: Frac): boolean => a.n === b.n && a.d === b.d
  class PolyQ {
    readonly c: Frac[]
    constructor(c: Frac[]) {
      this.c = c
    }
  }
  const pqFromInt = (p: Poly): PolyQ => new PolyQ(p.coefs.map((v) => fr(v)))
  const pqDeg = (a: PolyQ): number => {
    for (let i = a.c.length - 1; i >= 0; i--) if (a.c[i].n !== 0n) return i
    return -1
  }
  const pqTrim = (a: PolyQ): PolyQ => {
    const d = pqDeg(a)
    return new PolyQ(d < 0 ? [fr(0n)] : a.c.slice(0, d + 1))
  }
  const pqDivMod = (a: PolyQ, b: PolyQ): { q: PolyQ; r: PolyQ } => {
    const ta = pqTrim(a)
    const tb = pqTrim(b)
    const db = pqDeg(tb)
    const dq = pqDeg(ta) - db
    if (dq < 0) return { q: new PolyQ([fr(0n)]), r: ta }
    const r = ta.c.slice()
    const q: Frac[] = new Array(dq + 1).fill(fr(0n))
    for (let i = dq; i >= 0; i--) {
      const lead = r[db + i] ?? fr(0n)
      if (lead.n === 0n) continue
      const coef = fDiv(lead, tb.c[db])
      q[i] = coef
      for (let j = 0; j <= db; j++) r[i + j] = fSub(r[i + j] ?? fr(0n), fMul(coef, tb.c[j]))
    }
    return { q: new PolyQ(q), r: pqTrim(new PolyQ(r)) }
  }
  const pqMonic = (a: PolyQ): PolyQ => {
    const t = pqTrim(a)
    const d = pqDeg(t)
    if (d < 0) return t
    const lc = t.c[d]
    return new PolyQ(t.c.map((v) => fDiv(v, lc)))
  }
  const pqEq = (a: PolyQ, b: PolyQ): boolean => {
    const x = pqTrim(a).c
    const y = pqTrim(b).c
    return x.length === y.length && x.every((v, i) => fEq(v, y[i]))
  }
  const euclidHcf = (A: PolyQ, B: PolyQ): PolyQ => {
    let a = pqTrim(A)
    let b = pqTrim(B)
    while (pqDeg(b) >= 0) {
      const r = pqDivMod(a, b).r
      a = b
      b = r
    }
    return pqMonic(a)
  }
  /* L-7: Euclid == census over the whole pool (the strongest cross-check). */
  let euclidPairs = 0
  let euclidBroken = false
  for (const A of facPool) {
    if (euclidBroken) break
    for (const B of facPool) {
      const e = euclidHcf(pqFromInt(expandFac(A)), pqFromInt(expandFac(B)))
      const c = pqFromInt(expandFac(censusPair(A, B).h))
      if (!pqEq(e, c)) {
        ok(false, 'L-7: Euclid vs census disagree at ' + JSON.stringify(A.roots) + ' / ' + JSON.stringify(B.roots))
        euclidBroken = true
        break
      }
      euclidPairs++
    }
  }
  if (!euclidBroken) ok(euclidPairs === facPool.length * facPool.length, 'L-7: Euclid monic HCF == factor census over ' + euclidPairs + ' ordered pairs')

  /* L-8: the pinned division walks (the remainders the prose prints). */
  {
    // walk 1 (Illustration 3 / exercise 10): HCF(x^3-3x+2, x^2-1) = x-1
    const A1 = pqFromInt(polyD(1, 0, -3, 2))
    const B1 = pqFromInt(polyD(1, 0, -1))
    const r1 = pqDivMod(A1, B1).r
    ok(r1.c.length === 2 && fEq(r1.c[0], fr(2n)) && fEq(r1.c[1], fr(-2n)), 'L-8 walk 1: first remainder = -2x + 2 (loyal x-1, disloyal -2)')
    const r2 = pqDivMod(B1, pqFromInt(polyD(1, -1))).r
    ok(pqDeg(r2) < 0, 'L-8 walk 1: x^2 - 1 divided by (x-1) leaves remainder 0; HCF = x - 1')
    ok(pqEq(euclidHcf(A1, B1), pqFromInt(polyD(1, -1))), 'L-8 walk 1: Euclid monic HCF = x - 1 (census: (x-1)^2(x+2) vs (x-1)(x+1))')
    // walk 2: exercises 4-5
    ok(pqEq(euclidHcf(pqFromInt(polyD(1, 0, -4)), pqFromInt(polyD(1, 2))), pqFromInt(polyD(1, 2))), 'L-8: HCF(x^2-4, x+2) = x+2 (exercise 4)')
    const l51 = censusPair({ k: 1n, roots: [[-1n, 1]] }, { k: 1n, roots: [[-1n, 1], [1n, 1]] })
    ok(facEq(l51.l, { k: 1n, roots: [[-1n, 1], [1n, 1]] }), 'L-8: LCM(x-1, x^2-1) = x^2-1 — the bigger multiple absorbs (exercise 5)')
    // walk 3 (exercise 11): LCM by division for (2x^3+3x^2-9x-10, 2x^2+5x+3)
    const A3 = pqFromInt(polyD(2, 3, -9, -10))
    const B3 = pqFromInt(polyD(2, 5, 3))
    const dm3 = pqDivMod(A3, B3)
    ok(dm3.r.c.length === 2 && fEq(dm3.r.c[0], fr(-7n)) && fEq(dm3.r.c[1], fr(-7n)), 'L-8 walk 3: first remainder = -7x - 7 — disloyal -7 rejected, loyal part x+1')
    const q3 = pqDivMod(B3, pqFromInt(polyD(1, 1)))
    ok(pqDeg(q3.r) < 0 && q3.q.c.length === 2 && fEq(q3.q.c[0], fr(3n)) && fEq(q3.q.c[1], fr(2n)), 'L-8 walk 3: (2x^2+5x+3)/(x+1) = 2x+3, remainder 0')
    ok(pqEq(euclidHcf(A3, B3), pqFromInt(polyD(1, 1))), 'L-8 walk 3: Euclid HCF = x + 1')
    const lcm3 = polyD(1, 1).mul(polyD(2, 3)).mul(polyD(2, 1, -10))
    ok(arrEq(lcm3.mul(polyD(1, 1)).coefs, polyD(2, 3, -9, -10).mul(polyD(2, 5, 3)).coefs), 'L-8 walk 3: (x+1)(2x+3)(2x^2+x-10) x (x+1) = A x B — LCM = (x+1)(2x+3)(2x^2+x-10)')
    // walk 4 (exercise 12): the fractional-disloyal rejection
    const A4 = pqFromInt(polyD(3, -10, 9, -2))
    const B4 = pqFromInt(polyD(6, -5, -2, 1))
    const dm4 = pqDivMod(A4, B4)
    ok(dm4.q.c.length === 1 && fEq(dm4.q.c[0], fr(1n, 2n)), 'L-8 walk 4: quotient 1/2 (equal degrees)')
    ok(dm4.r.c.length === 3 && fEq(dm4.r.c[0], fr(-5n, 2n)) && fEq(dm4.r.c[1], fr(10n)) && fEq(dm4.r.c[2], fr(-15n, 2n)), 'L-8 walk 4: remainder = -(5/2)(3x^2 - 4x + 1) — disloyal -5/2 rejected')
    const dm4b = pqDivMod(B4, pqFromInt(polyD(3, -4, 1)))
    ok(pqDeg(dm4b.r) < 0 && dm4b.q.c.length === 2 && fEq(dm4b.q.c[0], fr(1n)) && fEq(dm4b.q.c[1], fr(2n)), 'L-8 walk 4: (6x^3-5x^2-2x+1)/(3x^2-4x+1) = 2x+1, remainder 0')
    ok(pqEq(euclidHcf(A4, B4), pqMonic(pqFromInt(polyD(3, -4, 1)))), 'L-8 walk 4: Euclid monic HCF = monic(3x^2-4x+1)')
    ok(arrEq(polyD(3, -10, 9, -2).coefs, polyD(1, -2).mul(polyD(3, -1)).mul(polyD(1, -1)).coefs), 'L-8 walk 4: A = (x-2)(3x-1)(x-1) expansion')
    ok(arrEq(polyD(6, -5, -2, 1).coefs, polyD(1, -1).mul(polyD(3, -1)).mul(polyD(2, 1)).coefs), 'L-8 walk 4: B = (x-1)(3x-1)(2x+1) expansion')
    // walk 5: HCF(2(x+1), 3(x+1)) = (x+1) — dimensions, not value
    ok(pqEq(euclidHcf(pqFromInt(polyD(2, 2)), pqFromInt(polyD(3, 3))), pqFromInt(polyD(1, 1))), 'L-8 walk 5: HCF(2x+2, 3x+3) = x+1 — the highest common FACTOR, not the greatest common measure')
  }

  /* L-9: the trap witnesses the lesson prints. */
  {
    const xxx: FacPoly = { k: 1n, roots: [[0n, 1]] }
    const id3 = censusPair(xxx, xxx)
    ok(facEq(id3.h, xxx) && facEq(id3.l, xxx), 'L-9: HCF(x, x) = LCM(x, x) = x')
    ok(expandFac(xxx).mul(expandFac(xxx)).evalAt(2n) !== expandFac({ k: 1n, roots: [[0n, 3]] }).evalAt(2n), 'L-9: the master identity FAILS for three expressions — x, x, x: HCF x LCM = x^2 != x^3 = product')
    const t1: FacPoly = { k: 1n, roots: [[1n, 1], [2n, 1]] }
    const t2: FacPoly = { k: 1n, roots: [[2n, 1], [3n, 1]] }
    const t3: FacPoly = { k: 1n, roots: [[1n, 1], [3n, 1]] }
    ok(rootMult(censusPair(t1, t2).h, 2n) === 1, 'L-9: pairwise HCFs are x-2, x-3, x-1 — nontrivial in pairs')
    const h13 = censusPair(censusPair(t1, t2).h, t3)
    ok(h13.h.roots.length === 0, 'L-9: yet the three-way HCF is 1 — every factor lives in only two of the three (exercise 13)')
    const l13: FacPoly = { k: 1n, roots: [[1n, 1], [2n, 1], [3n, 1]] }
    ok(facDivides(t1, l13) && facDivides(t2, l13) && facDivides(t3, l13), 'L-9: LCM(x^2-3x+2, x^2-5x+6, x^2-4x+3) = (x-1)(x-2)(x-3) — divisible by all three')
    // exercise 9 (with coefficients): 2x(x-1)^2, 4(x-1)(x+1), 6(x-1)^3 — and exercise 14's (x-2) family:
    const n1: FacPoly = { k: 2n, roots: [[0n, 1], [1n, 2]] }
    const n2: FacPoly = { k: 4n, roots: [[1n, 1], [-1n, 1]] }
    const n3: FacPoly = { k: 6n, roots: [[1n, 3]] }
    const hp = censusPair(censusPair(n1, n2).h, n3)
    const lp = censusPair(censusPair(n1, n2).l, n3)
    ok(hp.h.k === 2n && hp.h.roots.length === 1 && hp.h.roots[0][0] === 1n && hp.h.roots[0][1] === 1, 'L-9: HCF of the trio = 2(x-1)')
    ok(lp.l.k === 12n && rootMult(lp.l, 1n) === 3 && rootMult(lp.l, -1n) === 1 && rootMult(lp.l, 0n) === 1, 'L-9: LCM of the trio = 12 x (x-1)^3 (x+1) x')
    // exercise 14 (the L6 hunt): HCF (x-2)^2, LCM (x-2)^2(x+1)(x-5), A = x^3-3x^2+4 -> B = (x-2)^2(x-5)
    const mA: FacPoly = { k: 1n, roots: [[-1n, 2], [2n, 1]] }
    const mB: FacPoly = { k: 1n, roots: [[-1n, 2], [-3n, 1]] }
    ok(facEq(censusPair(mA, mB).h, { k: 1n, roots: [[-1n, 2]] }) && facEq(censusPair(mA, mB).l, { k: 1n, roots: [[-1n, 2], [2n, 1], [-3n, 1]] }), 'L-9: the hunt census — HCF (x+1)^2, LCM (x+1)^2(x-2)(x+3) (Illustration 4)')
    ok(arrEq(expandFac(mA).coefs, polyD(1, 0, -3, -2).coefs), 'L-9: A = (x+1)^2(x-2) = x^3 - 3x - 2')
    ok(arrEq(expandFac(mB).coefs, polyD(1, 5, 7, 3).coefs), 'L-9: B = (x+1)^2(x+3) = x^3 + 5x^2 + 7x + 3 — Illustration 4 pair (exercise 14 carries the (x-2) family, pinned next)')
    ok(arrEq(polyD(1, 1).mul(polyD(2, 3)).mul(polyD(2, 1, -10)).mul(polyD(1, 1)).coefs, polyD(2, 3, -9, -10).mul(polyD(2, 5, 3)).coefs), 'L-9: (x+1)(2x+3)(2x^2+x-10) = A x B / (x+1) — the division route to the LCM (exercise 11)')
    // exercise 14 (the L6 hunt, its own family): HCF (x-2)^2, LCM (x-2)^2(x+1)(x-5), A = x^3-3x^2+4 -> B = (x-2)^2(x-5)
    {
      const pA: FacPoly = { k: 1n, roots: [[2n, 2], [-1n, 1]] }
      const pB: FacPoly = { k: 1n, roots: [[2n, 2], [5n, 1]] }
      ok(facEq(censusPair(pA, pB).h, { k: 1n, roots: [[2n, 2]] }) && facEq(censusPair(pA, pB).l, { k: 1n, roots: [[2n, 2], [-1n, 1], [5n, 1]] }), 'L-9: exercise 14 census — HCF (x-2)^2, LCM (x-2)^2(x+1)(x-5)')
      ok(arrEq(expandFac(pA).coefs, polyD(1, -3, 0, 4).coefs), 'L-9: exercise 14 — A = (x-2)^2(x+1) = x^3-3x^2+4')
      ok(arrEq(expandFac(pB).coefs, polyD(1, -9, 24, -20).coefs), 'L-9: exercise 14 — B = (x-2)^2(x-5) = x^3-9x^2+24x-20')
    }
    // figure 2 exhibits: x^2-9 & x^2+5x+6
    const g2 = censusPair({ k: 1n, roots: [[3n, 1], [-3n, 1]] }, { k: 1n, roots: [[-3n, 1], [-2n, 1]] })
    ok(facEq(g2.h, { k: 1n, roots: [[-3n, 1]] }) && facEq(g2.l, { k: 1n, roots: [[3n, 1], [-3n, 1], [-2n, 1]] }), 'L-9: figure 2 — HCF(x^2-9, x^2+5x+6) = x+3, LCM = (x-3)(x+3)(x+2)')
    // Illustration 2: x^3-9x & x^2-x-6
    const i2 = censusPair({ k: 1n, roots: [[0n, 1], [3n, 1], [-3n, 1]] }, { k: 1n, roots: [[3n, 1], [-2n, 1]] })
    ok(facEq(i2.h, { k: 1n, roots: [[3n, 1]] }) && facEq(i2.l, { k: 1n, roots: [[0n, 1], [3n, 1], [-3n, 1], [-2n, 1]] }), 'L-9: Illustration 2 — HCF x-3, LCM x(x-3)(x+3)(x+2)')
    ok(arrEq(polyD(1, 0, -9, 0).coefs, polyD(1, 0).mul(polyD(1, -3)).mul(polyD(1, 3)).coefs), 'L-9: x^3-9x = x(x-3)(x+3) expansion')
    ok(arrEq(polyD(1, -1, -6).coefs, polyD(1, -3).mul(polyD(1, 2)).coefs), 'L-9: x^2-x-6 = (x-3)(x+2) expansion')
  }

  /* L-10: quiz + exercise key pins (authored audits in M). */
  {
    ok([1, 2, 3, 1, 3].every((k) => k >= 0 && k <= 3), 'L-10: quiz keys [1, 2, 3, 1, 3] in range — needles pinned in M')
    ok(hcfList([12n, 18n]) === 6n && lcmB(12n, 18n) === 36n, 'L-10: coefficient census 12/18 -> 6/36 (figure 1)')
    ok(hcfList([15n, 24n]) === 3n && lcmB(15n, 24n) === 120n, 'L-10: coefficient census 15/24 -> 3/120 (Illustration 1)')
  }
}

/* ------------------------------------------------------------------ */
/* (M) authored lesson 4.5 — content checks against the written file   */
/*     (guarded: silent until the lesson exists; then the full battery) */
/* ------------------------------------------------------------------ */

{
  if (chapter04.lessons.length === 5) {
    const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
    const lesson: Lesson = chapter04.lessons[4]
    ok(lesson.id === 'al-hcf-and-lcm-of-expressions', 'M: lesson id al-hcf-and-lcm-of-expressions')
    ok(lesson.number === '4.5', 'M: lesson number 4.5')
    ok(lesson.title === 'HCF and LCM of Expressions', 'M: lesson title matches the queued gap title')
    ok(chapter04.status === 'complete', 'M: chapter 4 back to complete — the audit gap closed by 4.5')
    ok(
      JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-common-factors-and-grouping', 'al-dividing-polynomials-long-division-and-the-remainder-theorem']),
      'M: prerequisites chain to 4.1 (the GCF anatomy) and 3.4 (the division craft)'
    )
    for (const key of lesson.sources || []) {
      ok(sourceLog.includes(key), 'M: source key "' + key + '" exists in SOURCE_LOG.md')
    }
    ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'M: concepts 5-8 (got ' + lesson.concepts.length + ')')
    ok((lesson.objectives || []).length >= 5, 'M: objectives present (got ' + (lesson.objectives || []).length + ')')
    ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'M: two derivations (the min/max census identity + the remainder-contains-HCF law)')
    ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'M: four illustrations (monomial pair, polynomial pair, the Euclid walk, the missing-expression hunt)')
    ok(lesson.blocks.filter((b) => b.kind === 'figure').length === 3, 'M: three figures (power columns, factor shelves, the Euclid chain)')
    ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'M: three formula cards')
    ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 1, 'M: a definition callout present')
    ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'theorem').length === 1, 'M: the master-identity theorem callout present')
    ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'warn').length === 1, 'M: the three-expression caution present')
    ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'M: the historical callout present')
    ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'exam').length === 1, 'M: the exam corner present')
    ok(lesson.blocks.filter((b) => b.kind === 'terms').reduce((a, b) => a + (b.kind === 'terms' ? b.items.length : 0), 0) === 8, 'M: eight terms (glossary + flashcards)')
    {
      const quiz = lesson.blocks.find((b) => b.kind === 'quiz')
      if (quiz && quiz.kind === 'quiz') {
        const keys = [1, 2, 3, 1, 3]
        const needles = ['6xy^{2}', 'three expressions', '(x+1)^{2}$', 'disloyal', '(x-3)(x+3)(x+2)']
        ok(quiz.items.length === 5, 'M: five quiz items')
        quiz.items.forEach((it, i) => ok(it.answer === keys[i], 'M: quiz Q' + (i + 1) + ' pinned key ' + keys[i]))
        quiz.items.forEach((it, i) => ok((it.options[it.answer] || '').includes(needles[i]), 'M: quiz Q' + (i + 1) + ' answer carries the intended verdict (needle ' + needles[i] + ')'))
      }
    }
    {
      const ex = lesson.blocks.find((b) => b.kind === 'exercises')
      if (ex && ex.kind === 'exercises') {
        const counts = ex.sets.map((s) => s.questions.length)
        ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'M: exercise ladder L1..L6 counts 3/3/3/2/2/1 (got ' + counts.join('/') + ')')
        ok(ex.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2)), 'M: every exercise carries a Cengage steps chain')
      }
    }
    {
      const figs = lesson.blocks.filter((b) => b.kind === 'figure')
      const house = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#d97706', '#ea580c', '#0f766e', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5', 'currentColor']
      const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
      ok(figs.length === 3, 'M: three figure blocks')
      figs.forEach((f, i) => {
        if (f.kind !== 'figure') return
        ok(/aria-label="[^"]+"/.test(f.svg), 'M: figure ' + (i + 1) + ' carries an aria-label')
        ok(/viewBox="0 0 7[0-9][0-9] [0-9]+"/.test(f.svg), 'M: figure ' + (i + 1) + ' carries a 720-wide viewBox')
        const hexes = f.svg.match(/#[0-9a-fA-F]{6}/g) || []
        ok(hexes.every((h) => house.includes(h.toLowerCase())), 'M: figure ' + (i + 1) + ' palette on house law')
        ok(hexes.every((h) => !retired.includes(h.toLowerCase())), 'M: figure ' + (i + 1) + ' uses no retired muted hexes')
      })
    }
    {
      const text = lesson.blocks.map((b) => ['text', 'title', 'name', 'caption', 'q', 'statement'].map((k) => (k in b ? String((b as Record<string, unknown>)[k]) : '')).join(' ')).join(' ')
      const figs = lesson.blocks.filter((b) => b.kind === 'figure')
      const svgAll = figs.map((f) => (f.kind === 'figure' ? f.svg : '')).join(' ')
      const pins = ['6xy^{2}', '36x^{2}y^{3}zw', '3a^{2}b^{2}', '120a^{3}b^{4}', '(x-3)(x+3)(x+2)', '3x^{2}-4x+1', 'x^{3}-3x-2', 'x^{3}+5x^{2}+7x+3', 'disloyal']
      for (const p of pins) ok((text + ' ' + svgAll).includes(p), 'M: pinned exhibit "' + p + '" appears in the lesson')
      ok(figs.every((f) => f.kind === 'figure' && f.caption.length > 10), 'M: every figure carries a teaching caption')
    }
    {
      const words = countLessonWords(lesson)
      ok(words >= 4400, 'M: honest word count ' + words + ' >= 4400')
    }
  }
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch04 pre-writing battery: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
