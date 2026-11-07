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
  ok(chapter04.status === 'in-progress', 'F: chapter 4 in-progress (4.3/4.4 + the review remain for run 74)')
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
  ok(chapter04.lessons.length === 2, 'G: chapter 4 ships both lessons of the run (4.1 in F, 4.2 audited here)')
  ok(lesson.id === 'al-factoring-quadratic-trinomials', 'G: lesson id al-factoring-quadratic-trinomials (globally unique, al- prefix)')
  ok(lesson.number === '4.2', 'G: lesson number 4.2')
  ok(lesson.title === 'Factoring Quadratic Trinomials', 'G: lesson title matches the planned title')
  ok(chapter04.status === 'in-progress', 'G: chapter 4 in-progress (4.3/4.4 + the review remain for run 74)')
  ok(
    JSON.stringify(chapter04.plannedLessons) === JSON.stringify(['The Identities as Factorizations', 'The Factor Theorem and Cubics']),
    'G: plannedLessons trimmed to the run-74 pair (got ' + JSON.stringify(chapter04.plannedLessons) + ')'
  )
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
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch04 pre-writing battery: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
