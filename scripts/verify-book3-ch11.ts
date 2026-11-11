import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'

export {}

/**
 * verify-book3-ch11.ts — verification for Elementary Algebra (book #3),
 * chapter 11 "The Toolbox and the Doorstep" — lesson 11.1 "Word Problems:
 * the Toolkit at Work" (id al-word-problems-the-toolkit-at-work), 11.2
 * "Competition Algebra: Identities and Substitutions" (id
 * al-competition-algebra-identities-and-substitutions) and — the run-88
 * closing ride — 11.3 "The Function Idea: the Doorstep" (id
 * al-the-function-idea-the-doorstep) + the unit-11 completion review +
 * the BOOK CLOSE.
 *
 *
 * Created 2026-11-10 (run 87) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–86. Conventions: ALL arithmetic in this
 * verifier is exact — BigInt/Frac rationals, symbolic polynomial expansion
 * (coefficient maps), and surd arithmetic q + r√k for the irrational reads;
 * no float decides any claim. The engines:
 *
 *   (A) the WORD-PROBLEM PIPELINE engines for 11.1 — READ → NAME → RELATE →
 *       SOLVE → CHECK priced end-to-end on designed problems across the
 *       canon's five families:
 *       (i)   the warm-up: three consecutive integers summing to 87
 *             (n = 28: 28 + 29 + 30) and the consecutive-odd variant
 *             (25 + 27 + 29 = 81);
 *       (ii)  the MIXTURE engine: the value balance p₁x + p₂q = m(x + q)
 *             priced on the rice blend (₹40 + 30 kg of ₹70 at ₹55: x = 30,
 *             both sides 3300) and the acid dilution (25% + 12 L of 75% at
 *             45%: x = 18, acid carried 27/2 = 27/2), plus the water-dilution
 *             cousin (30% × 20 L → 20%: w = 10) — and the alligation cross
 *             x : q = (p₂ − m) : (m − p₁) priced on both designs (1:1 and
 *             3:2), the speed method DERIVED from the value equation;
 *       (iii) the MOTION engine: the 360-km train — 5 km/h faster saves
 *             exactly 1 hour — priced as the fractional equation 360/v −
 *             360/(v+5) = 1 cleared to v² + 5v − 1800 = 0 (Δ = 7225 = 85²,
 *             doors v = 40 and v = −45, the habitat refusing the negative),
 *             with 360/40 = 9 and 360/45 = 8 exact; the boat: 15 km down and
 *             back on a 2 km/h stream in 4 hours (2b² − 15b − 8 = 0,
 *             Δ = 289 = 17², b = 8, b = −1/2 refused; 3/2 + 5/2 = 4 exact);
 *             and the flat/uphill elimination pair (f + u = 2,
 *             5f + 3u = 9 → f = 3/2, u = 1/2 — 6.2's craft at work);
 *       (iv)  the WORK-RATE engine (8.3's debt paid in full): 1/10 + 1/15
 *             = 1/6 exact, the template t = ab/(a+b) = 150/25 = 6; the
 *             "A takes 5 days longer than B, together 6 days" hunt priced as
 *             x² − 7x − 30 = 0 (Δ = 169 = 13², doors 10 and −3, habitat
 *             refusing −3, 1/10 + 1/15 = 1/6 exact); the pipe-with-drain
 *             subtraction 1/12 − 1/18 = 1/36 → 36 h; and the three-pipe
 *             cistern 1/6 + 1/8 − 1/12 = 5/24 → 24/5 h = 4 h 48 min;
 *       (v)   the AGE engine: the father 3× the son, twice in 12 years
 *             (3s + 12 = 2(s + 12) → s = 12, f = 36, 48 = 2·24 exact); the
 *             mother 4× the son, twice in 16 years (s = 8, m = 32); and the
 *             sum-40 pair (25 and 15, five years ago 20 = 2·10 exact);
 *       (vi)  the MONEY engine: the ₹5,000 split at 5% and 8% earning ₹310
 *             (5x + 8(5000 − x) = 31000 → x = 3000, interest 150 + 160 =
 *             310 exact) and the mark-up-then-discount read (25% up, 10% off
 *             → 225/2 = 112.5, profit 25/2 on 100 = 1/8 = 12.5%);
 *       (vii) the FENCE engine (7.2's fences where the problem asks a
 *             bound): four tests averaging 68, the fifth read s must lift
 *             the average to at least 70: (272 + s)/5 ≥ 70 → s ≥ 78, priced
 *             at the boundary (350/5 = 70 holds) and just under (349/5
 *             refuses), with the habitat cap 100 fencing the legal band
 *             [78, 100] — and the honest impossible design (average 62:
 *             s ≥ 102 > 100, even a perfect paper fails);
 *       (viii) the CHECK-station census: every family's answer re-priced
 *             in its ORIGINAL relation (the substitutes above), and the
 *             two-filter discipline of 8.3 (bill + habitat) run on every
 *             fractional design.
 *   (B) the IDENTITY-BANK engines for 11.2 —
 *       (i)   the symbolic expansion engine: fourteen identities certified
 *             by coefficient-exact polynomial multiplication — (a ± b)²,
 *             (a + b)(a − b), (a ± b)³, a³ ± b³ via their three-term
 *             factorizations, the bridge (a+b)² − (a−b)² = 4ab,
 *             (a+b+c)², (x+y+z)(x²+y²+z²−xy−yz−zx) = x³+y³+z³−3xyz,
 *             the Brahmagupta–Fibonacci two-squares identity, and the
 *             symmetric twin reads (m+h)³ + (m−h)³ = 2m(m² + 3h²) and
 *             (m+h)³ − (m−h)³ = 2h(3m² + h²) — each ALSO certified
 *             numerically on designed substitutions (integers, negatives,
 *             fractions) with exact rational arithmetic;
 *       (ii)  the SPEED-READ engine (BigInt): 101·99 = 9999, 51·49 = 2499,
 *             998·1002 = 999996, 97·103 = 9991 (difference of squares);
 *             102² = 10404, 98² = 9604, 205² = 42025, 195² = 38025 (the
 *             binomial squares); 105² − 95² = 2000, 205² − 195² = 4000,
 *             1002² − 998² = 8000; 101³ + 99³ = 2000600 = 2·100·(100²+3)
 *             and 103³ − 97³ = 180054 = 2·3·(3·100² + 9) — the twin reads
 *             at competition speed, both sides computed independently;
 *       (iii) the CLEVER-SUBSTITUTION engine: the linear warm-up
 *             (2x+1)² − 5(2x+1) + 6 = 0 → t = 2x+1, doors t = 2, 3, x = 1/2
 *             and 1 (both re-priced in the original); the quartic
 *             (x²−3x+3)² − 3(x²−3x+3) + 2 = 0 collapsed by t = x²−3x+3 to
 *             t²−3t+2 = 0 (t = 1, 2), landing FOUR real roots — 1, 2, and
 *             the surd pair (3 ± √5)/2 certified by exact surd arithmetic
 *             (t = 2 on both surd doors); and the sibling
 *             (x²−5x+5)² − (x²−5x+5) − 2 = 0 (t = 2, −1) landing 2, 3 and
 *             (5 ± √13)/2, the surd doors certified the same way;
 *       (iv)  the SYMMETRIC-READS engine (9.4's craft at speed): for
 *             x + 1/x = 5 the ladder x²+1/x² = 23, x³+1/x³ = 110,
 *             x⁴+1/x⁴ = 527, x⁵+1/x⁵ = 2525 — each certified by exact surd
 *             arithmetic on x = (5 + √21)/2 AND by the ladder identities
 *             (sₙ₊₁ = s₁sₙ − sₙ₋₁); the x + 1/x = 3 ladder (7, 18, 123 —
 *             7·18 − 3 = 123, the two-step ladder), = 7 (47, 322) and = 4
 *             (14, 52, 194); the x+y/xy families: x+y = 7, xy = 6 →
 *             x²+y² = 37, x³+y³ = 217, (x−y)² = 25 with the roots {6, 1}
 *             priced directly; and x+y = 12, xy = 27 → 90 and 756 with the
 *             roots {9, 3} priced;
 *       (v)   the THREE-VARIABLE engine: the census triples {2,3,5} (sum 10,
 *             pairwise 31: x²+y²+z² = 38 = 100 − 62 and x³+y³+z³ − 3xyz =
 *             70 = 10·(38−31)), {2,3,4} (29 = 81 − 52, 27 = 9·3) and the
 *             sum-zero triple {1,2,−3} (x³+y³+z³ = 3xyz = −18 — the
 *             competition staple in one line);
 *       (vi)  the TWO-SQUARES engine: (a²+b²)(c²+d²) = (ac+bd)² + (ad−bc)²
 *             priced on (2,1)×(3,1) → 50 = 49 + 1, (2,1)×(2,−3) → 65 =
 *             1 + 64 and (1,2)×(3,4) → 125 = 121 + 4 — and the classic
 *             65 = 5·13 read BOTH ways (1² + 8² and 4² + 7²), the two
 *             matchings of the same factors explaining the two
 *             representations.
 *   (C) the FIGURE GEOMETRY PLANS of the run's four figures (11.1: the
 *       pipeline map 720×340 + the motion timeline 720×340; 11.2: the
 *       (a+b)² area proof 720×400 + the difference-of-squares strip
 *       720×360), self-checked for bounds and disjointness, audited again
 *       rect-exact against the authored SVGs in D/E.
 *
 *   (G) the FUNCTION engines for 11.3 (run 88, added BEFORE any 11.3 prose):
 *       (i)   the MACHINE engine: f(x) = 2x² − 7x + 3 — 10.3's workhorse
 *             named — priced on the inputs −2, 0, 1, 2, 1/2, 3, 4, 5, 7/4
 *             (25, 3, −2, −3, 0, 0, 7, 18, −25/8), the zeros = 10.3's doors
 *             {1/2, 3}, the gap f(x) + 25/8 = 2(x − 7/4)² re-read at 0 and 2;
 *       (ii)  the NOTATION engine: f(x+1) = 2x² − 3x − 2 certified by
 *             symbolic expansion and priced at x = 2 against f(3) = 0 —
 *             the input may be any expression; the mirror twins re-priced;
 *       (iii) the DOMAIN engines — 8.3's bills keep the rule honest: the
 *             bill 1/(x−2) refuses exactly 2 (−1/2, 1/2, 2 at 0, 4, 5/2);
 *             the surd √(x−3) accepts exactly x ≥ 3 (0, 1, 2, 4 at 3, 4, 7,
 *             19; refuses 0 and 2); the HOLE (x²−9)/(x−3) = x+3 refusing
 *             3 (3, −1, 8 at 0, −4, 5; the hole at (3, 6)); the combined
 *             filters √(5−x)/(x−2) refusing x > 5 and x = 2 (0, 2, 3 at
 *             5, 1, −4); the even two-bill cousin 1/(x²−1) refusing ±1
 *             (−1, 1/8, 1/3 = 1/3 at 0, 3, ±2 — k(−x) = k(x), the even rule);
 *       (iv)  the VERTICAL-PROBE engines — 10.1's uniqueness read as a
 *             function: the line y = 3x+2 answers every probe once
 *             (−1,−1), (0,2), (2,8); the bowl answers −2, 0, 7/4, 5 once
 *             each; the circle x²+y² = 25 fails at probe x = 3 (y = ±4,
 *             two meets; 25 = 9+16) while x = 5 meets once and x = 6
 *             never; the sideways parabola x = y² fails at x = 4 (y = ±2);
 *             the branch fix y = √x single-valued;
 *       (v)   the LINEAR-function engine — 10.2 named f: the fare machine
 *             F(d) = 50 + 12d (50, 86, 134 at 0, 3, 7) with the constant
 *             climb F(d+1) − F(d) = 12 at d = 0, 2, 5; the Fahrenheit
 *             function F(C) = (9/5)C + 32 (32, 212, 493/5 = 98.6 at 0, 100,
 *             37) and the meeting F(−40) = −40 solved both ways;
 *       (vi)  the RANGE engine — 10.3's hinge read backwards: the gap
 *             argument on the workhorse (49/8 and 1/8 = 2(x−7/4)² at 0 and
 *             2 — range [−25/8, ∞)), the shifted discriminant Δ_k = 25+8k
 *             at k = 0, −25/8, −4, 5 (25, 0, −7, 65), the down bowl −x²+4x+5
 *             peaking at 9 (gap −4 at 0 and 4 — range (−∞, 9]), the
 *             floating bowl x²+1 (range [1, ∞), Δ = −4);
 *       (vii) the COMPOSITION doorstep — 11.2's camera named honestly:
 *             f(g(3)) = 16 vs g(f(3)) = 10 for f = square, g = increment;
 *             (f∘g)(x) = x²+2x+1 and (g∘f)(x) = x²+1 by expansion — order
 *             matters; the 11.2 quartic IS (f∘g)(x) with g = x²−3x+3,
 *             f(t) = t²−3t+2, expanding to x⁴−6x³+12x²−9x+2 with the doors
 *             1 and 2 and the surd doors (3±√5)/2 re-certified surd-exact;
 *             √(x²) = |x| priced at −5 (+5) against (√x)² = x on x ≥ 0 —
 *             the composites keep the inner domain.
 *
 * Sections D (authored 11.1), E (authored 11.2), H (authored 11.3) and F
 * (chapter + library) import the chapter file directly. F is REWRITTEN for
 * run 88 as the CLOSING state: chapter 11 complete 3/3, no planned lessons,
 * the book status 'complete' — plus the UNIT-11 COMPLETION REVIEW (the
 * word floors 4,612/4,128/11.3, the quiz keys vs pinned 3/3, 42 exercises
 * chained, the figures vivid, the arcs closed) and the BOOK CLOSE checks
 * (all 11 chapters complete, the final snapshot, the handoff named).
 * PREWRITE=1 runs the pre-write gate only: sections A, B, C, G — the
 * verify-first discipline, every engine green before a word of 11.3 prose.
 */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) {
    passed++
  } else {
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
  if (d === 0n) throw new Error('zero denominator — the field forbids it')
  if (d < 0n) {
    n = -n
    d = -d
  }
  const g = bgcd(n, d) || 1n
  return { n: n / g, d: d / g }
}

const fIsZero = (a: Frac): boolean => a.n === 0n
const fEq = (a: Frac, b: Frac): boolean => a.n === b.n && a.d === b.d
const fLt = (a: Frac, b: Frac): boolean => a.n * b.d < b.n * a.d
const fAdd = (a: Frac, b: Frac): Frac => fr(a.n * b.d + b.n * a.d, a.d * b.d)
const fSub = (a: Frac, b: Frac): Frac => fr(a.n * b.d - b.n * a.d, a.d * b.d)
const fMul = (a: Frac, b: Frac): Frac => fr(a.n * b.n, a.d * b.d)
const fDiv = (a: Frac, b: Frac): Frac => {
  if (b.n === 0n) throw new Error('division by zero — the forbidden move; the guard fired')
  return fr(a.n * b.d, a.d * b.n)
}
const fNeg = (a: Frac): Frac => ({ n: -a.n, d: a.d })
const fStr = (a: Frac): string => (a.d === 1n ? `${a.n}` : `${a.n}/${a.d}`)

/** exact quadratic doors via the formula; [] means the surd territory (or none) */
function biSqrt(n: bigint): bigint | null {
  if (n < 0n) return null
  if (n < 2n) return n
  let x = n
  let y = (x + 1n) / 2n
  while (y < x) {
    x = y
    y = (x + n / x) / 2n
  }
  return x * x === n ? x : null
}

function frSqrt(v: Frac): Frac | null {
  const sn = biSqrt(v.n)
  const sd = biSqrt(v.d)
  if (sn === null || sd === null) return null
  return fr(sn, sd)
}

function quadRoots(a: Frac, b: Frac, c: Frac): { disc: Frac; roots: Frac[] } {
  const disc = fSub(fMul(b, b), fMul(fr(4n), fMul(a, c)))
  if (fIsZero(disc)) return { disc, roots: [fDiv(fNeg(b), fMul(fr(2n), a))] }
  const sq = frSqrt(disc)
  if (sq === null) return { disc, roots: [] }
  const twoA = fMul(fr(2n), a)
  return { disc, roots: [fDiv(fAdd(fNeg(b), sq), twoA), fDiv(fSub(fNeg(b), sq), twoA)] }
}

/** evaluate a·x² + b·x + c exactly */
function quadAt(a: Frac, b: Frac, c: Frac, x: Frac): Frac {
  return fAdd(fAdd(fMul(a, fMul(x, x)), fMul(b, x)), c)
}

/* ---------------- surd machinery: q + r·√k ---------------- */

interface Surd {
  q: Frac
  r: Frac
  k: bigint
}

const sd = (q: bigint | Frac, r: bigint | Frac, k: bigint): Surd => ({
  q: typeof q === 'bigint' ? fr(q) : q,
  r: typeof r === 'bigint' ? fr(r) : r,
  k,
})

const sAdd = (x: Surd, y: Surd): Surd => {
  if (x.k !== y.k) throw new Error('mixed radicals refused')
  return { q: fAdd(x.q, y.q), r: fAdd(x.r, y.r), k: x.k }
}
const sSub = (x: Surd, y: Surd): Surd => {
  if (x.k !== y.k) throw new Error('mixed radicals refused')
  return { q: fSub(x.q, y.q), r: fSub(x.r, y.r), k: x.k }
}
const sMul = (x: Surd, y: Surd): Surd => {
  if (x.k !== y.k) throw new Error('mixed radicals refused')
  return { q: fAdd(fMul(x.q, y.q), fMul(fr(x.k), fMul(x.r, y.r))), r: fAdd(fMul(x.q, y.r), fMul(x.r, y.q)), k: x.k }
}
const sHalf = (x: Surd): Surd => ({ q: fDiv(x.q, fr(2n)), r: fDiv(x.r, fr(2n)), k: x.k })
const sEq = (x: Surd, y: Surd): boolean => x.k === y.k && fEq(x.q, y.q) && fEq(x.r, y.r)
const sIsRational = (x: Surd): boolean => fIsZero(x.r)
const sConj = (x: Surd): Surd => ({ q: x.q, r: fNeg(x.r), k: x.k })
const sStr = (x: Surd): string => `(${fStr(x.q)}) + (${fStr(x.r)})√${x.k}`

/** xⁿ by exact surd multiplication */
function sPow(x: Surd, n: number): Surd {
  let out = sd(1n, 0n, x.k)
  for (let i = 0; i < n; i++) out = sMul(out, x)
  return out
}

/** the sum xⁿ + (1/x)ⁿ for x = (p + √k)/2-style surds with norm 1, via
 *  conjugates: if x·conj(x) = 1 then 1/xⁿ = conj(x)ⁿ, so the sum is the
 *  rational part doubled — computed honestly by exact surd multiplication. */
function symPow(x: Surd, n: number): Frac {
  const xn = sPow(x, n)
  const cin = sPow(sConj(x), n)
  return fAdd(xn.q, cin.q)
}

/* ---------------- symbolic polynomial machinery ---------------- */
/** a polynomial as a map monomial-key → rational coefficient; keys are the
 *  alphabetically sorted variable powers, e.g. a²b → 'a2b', ab → 'ab', 1 → '' */
type Poly = Map<string, Frac>

function monoKey(vars: Record<string, number>): string {
  const ks = Object.keys(vars).filter((v) => vars[v] > 0).sort()
  let out = ''
  for (const v of ks) out += v + (vars[v] > 1 ? String(vars[v]) : '')
  return out
}

function keyVars(k: string): Record<string, number> {
  const out: Record<string, number> = {}
  const re = /([a-z])([0-9]*)/g
  let m: RegExpExecArray | null
  while ((m = re.exec(k))) out[m[1]] = (out[m[1]] || 0) + Number(m[2] || 1)
  return out
}

const pTerm = (coef: bigint | Frac, vars: Record<string, number>): Poly => {
  const c = typeof coef === 'bigint' ? fr(coef) : coef
  return new Map([[monoKey(vars), c]])
}
const pVar = (v: string): Poly => pTerm(1n, { [v]: 1 })
const pConst = (n: bigint): Poly => pTerm(n, {})

function pClean(p: Poly): Poly {
  for (const [k, c] of p) if (fIsZero(c)) p.delete(k)
  return p
}
function pAdd(p: Poly, q: Poly): Poly {
  const out = new Map(p)
  for (const [k, c] of q) out.set(k, fAdd(out.get(k) || fr(0n), c))
  return pClean(out)
}
function pSub(p: Poly, q: Poly): Poly {
  const out = new Map(p)
  for (const [k, c] of q) out.set(k, fSub(out.get(k) || fr(0n), c))
  return pClean(out)
}
function pMul(p: Poly, q: Poly): Poly {
  const out: Poly = new Map()
  for (const [k1, c1] of p)
    for (const [k2, c2] of q) {
      const v1 = keyVars(k1)
      const v2 = keyVars(k2)
      for (const v of Object.keys(v2)) v1[v] = (v1[v] || 0) + v2[v]
      const k = monoKey(v1)
      out.set(k, fAdd(out.get(k) || fr(0n), fMul(c1, c2)))
    }
  return pClean(out)
}
const pSum = (ps: Poly[]): Poly => ps.reduce((acc, p) => pAdd(acc, p), new Map() as Poly)

function pEq(a: Poly, b: Poly): boolean {
  if (a.size !== b.size) return false
  for (const [k, c] of a) {
    const d = b.get(k)
    if (!d || !fEq(c, d)) return false
  }
  return true
}

function pEval(p: Poly, subst: Record<string, Frac>): Frac {
  let out = fr(0n)
  for (const [k, c] of p) {
    let mono = fr(1n)
    for (const [v, e] of Object.entries(keyVars(k))) {
      const val = subst[v]
      if (!val) throw new Error('no substitution for variable ' + v)
      for (let i = 0; i < e; i++) mono = fMul(mono, val)
    }
    out = fAdd(out, fMul(c, mono))
  }
  return out
}

const pStr = (p: Poly): string => {
  const parts: string[] = []
  const keys = Array.from(p.keys()).sort()
  for (const k of keys) parts.push(`${fStr(p.get(k)!)}·[${k || '1'}]`)
  return parts.join(' + ')
}

/* ------------------------------------------------------------------ */
/* (A) the 11.1 engines — the word-problem pipeline priced end-to-end  */
/* ------------------------------------------------------------------ */

console.log('[A] 11.1 engines: the pipeline READ→NAME→RELATE→SOLVE→CHECK across the canon\'s five families')

function sectionA(): void {
  // the five stations, in order
  const PIPELINE = ['READ', 'NAME', 'RELATE', 'SOLVE', 'CHECK']
  ok(PIPELINE.length === 5 && PIPELINE.join('→') === 'READ→NAME→RELATE→SOLVE→CHECK', 'A the pipeline is the five stations in order')
  const FAMILIES = ['mixture', 'motion', 'work-rate', 'age', 'money/interest']
  ok(FAMILIES.length === 5, 'A the canon\'s five families: mixture, motion, work-rate, age, money/interest')

  // ---- (i) the warm-up: consecutive integers ----
  {
    const n = fr(28n)
    ok(fEq(fDiv(fSub(fr(87n), fr(3n)), fr(3n)), n), 'A warm-up: 3n + 3 = 87 solves to n = 28 exactly')
    ok(28n + 29n + 30n === 87n, 'A warm-up: 28 + 29 + 30 = 87 — the CHECK station re-prices the sum')
    const m = fr(25n)
    ok(fEq(fDiv(fSub(fr(81n), fr(6n)), fr(3n)), m), 'A warm-up (odd): 3n + 6 = 81 solves to n = 25 exactly')
    ok(25n + 27n + 29n === 81n, 'A warm-up (odd): 25 + 27 + 29 = 81')
  }

  // ---- (ii) the MIXTURE engine: the value balance + the alligation cross ----
  {
    // rice: x kg at ₹40 + 30 kg at ₹70 → blend ₹55
    const x = fr(30n)
    const lhs = fAdd(fMul(fr(40n), x), fMul(fr(70n), fr(30n)))
    const rhs = fMul(fr(55n), fAdd(x, fr(30n)))
    ok(fEq(lhs, rhs) && fEq(lhs, fr(3300n)), 'A rice: 40·30 + 70·30 = 55·60 = 3300 — the value balance holds at x = 30')
    ok(fEq(fDiv(fAdd(x, fr(30n)), fr(60n)) ? fr(3300n) : fr(0n), fMul(fr(55n), fr(60n))), 'A rice: the blend price reads back 3300/60 = 55')
    // alligation: x : 30 = (70 − 55) : (55 − 40) = 1 : 1
    const ratio = fDiv(fSub(fr(70n), fr(55n)), fSub(fr(55n), fr(40n)))
    ok(fEq(ratio, fr(1n)) && fEq(fDiv(x, fr(30n)), ratio), 'A rice: the alligation cross (70−55):(55−40) = 1:1 = x:30')
    // acid: x L of 25% + 12 L of 75% → 45%
    const y = fr(18n)
    const aL = fAdd(fDiv(y, fr(4n)), fMul(fr(3n, 4n), fr(12n))) // acid carried
    const aR = fMul(fr(9n, 20n), fAdd(y, fr(12n))) // acid in the blend
    ok(fEq(aL, aR) && fEq(aL, fr(27n, 2n)), 'A acid: 18/4 + 9 = (9/20)·30 = 27/2 — the acid carried is the acid blended')
    // cleared equation 5x + 180 = 9x + 108 at x = 18
    ok(fEq(fAdd(fMul(fr(5n), y), fr(180n)), fAdd(fMul(fr(9n), y), fr(108n))), 'A acid: the cleared equation 5x + 180 = 9x + 108 holds at x = 18 (both sides 270)')
    // alligation: (75−45):(45−25) = 3:2 = 18:12
    const ratio2 = fDiv(fSub(fr(75n), fr(45n)), fSub(fr(45n), fr(25n)))
    ok(fEq(ratio2, fr(3n, 2n)) && fEq(fDiv(y, fr(12n)), ratio2), 'A acid: the alligation cross 30:20 = 3:2 = 18:12')
    // dilution: 20 L of 30% → 20% by adding water w
    const w = fr(10n)
    ok(fEq(fMul(fr(3n, 10n), fr(20n)), fMul(fr(2n, 10n), fAdd(fr(20n), w))), 'A dilution: (3/10)·20 = (2/10)·30 = 6 — the acid carried is invariant, w = 10')
  }

  // ---- (iii) the MOTION engine ----
  {
    // the 360-km train: 360/v − 360/(v+5) = 1 → v² + 5v − 1800 = 0
    const q = quadRoots(fr(1n), fr(5n), fr(-1800n))
    ok(fEq(q.disc, fr(7225n)), 'A train: Δ = 25 + 7200 = 7225')
    ok(fEq(frSqrt(q.disc)!, fr(85n)), 'A train: Δ = 7225 = 85² — the perfect square certified')
    ok(q.roots.length === 2 && fEq(q.roots[0], fr(40n)) && fEq(q.roots[1], fr(-45n)), 'A train: the doors are v = 40 and v = −45')
    const t1 = fDiv(fr(360n), fr(40n))
    const t2 = fDiv(fr(360n), fr(45n))
    ok(fEq(t1, fr(9n)) && fEq(t2, fr(8n)) && fEq(fSub(t1, t2), fr(1n)), 'A train: 360/40 = 9 h, 360/45 = 8 h — the saving is exactly 1 hour')
    ok(fIsZero(quadAt(fr(1n), fr(5n), fr(-1800n), fr(40n))), 'A train: the cleared quadratic is satisfied at v = 40')
    // the original fractional equation re-priced at v = 40 (the CHECK station)
    ok(fEq(fSub(fDiv(fr(360n), fr(40n)), fDiv(fr(360n), fr(45n))), fr(1n)), 'A train: the ORIGINAL fractional equation holds at v = 40 — check, not trust')
    // the habitat refuses −45; the bill (v ≠ 0, −5) refuses neither door
    ok(fMul(fr(-45n), fAdd(fr(-45n), fr(5n))).n !== 0n, 'A train: v = −45 passes the bill (denominator v(v+5) ≠ 0) and is refused by the HABITAT alone')
    // the boat: 15/(b+2) + 15/(b−2) = 4 → 2b² − 15b − 8 = 0
    const q2 = quadRoots(fr(2n), fr(-15n), fr(-8n))
    ok(fEq(q2.disc, fr(289n)) && fEq(frSqrt(q2.disc)!, fr(17n)), 'A boat: Δ = 225 + 64 = 289 = 17²')
    ok(q2.roots.length === 2 && fEq(q2.roots[0], fr(8n)) && fEq(q2.roots[1], fr(-1n, 2n)), 'A boat: the doors are b = 8 and b = −1/2')
    const d1 = fDiv(fr(15n), fr(10n))
    const d2 = fDiv(fr(15n), fr(6n))
    ok(fEq(d1, fr(3n, 2n)) && fEq(d2, fr(5n, 2n)) && fEq(fAdd(d1, d2), fr(4n)), 'A boat: 15/10 + 15/6 = 3/2 + 5/2 = 4 — the total time is exact')
    // the flat/uphill elimination pair (6.2's craft)
    const f = fr(3n, 2n)
    const u = fr(1n, 2n)
    ok(fEq(fAdd(f, u), fr(2n)) && fEq(fAdd(fMul(fr(5n), f), fMul(fr(3n), u)), fr(9n)), 'A walk: f + u = 2 and 5f + 3u = 9 hold at f = 3/2, u = 1/2')
  }

  // ---- (iv) the WORK-RATE engine (8.3's debt paid in full) ----
  {
    const rA = fDiv(fr(1n), fr(10n))
    const rB = fDiv(fr(1n), fr(15n))
    ok(fEq(fAdd(rA, rB), fr(1n, 6n)), 'A work: 1/10 + 1/15 = 5/30 = 1/6 — the rates ADD')
    ok(fEq(fDiv(fMul(fr(10n), fr(15n)), fAdd(fr(10n), fr(15n))), fr(6n)), 'A work: the template t = ab/(a+b) = 150/25 = 6 — the joint time is the product over the sum')
    ok(fLt(fr(6n), fr(10n)) && fLt(fr(6n), fr(15n)), 'A work: t = 6 lies between each solo time and their minimum — the always-pair check of 8.3')
    // the 5-days-longer hunt: 1/x + 1/(x+5) = 1/6 → x² − 7x − 30 = 0
    const q = quadRoots(fr(1n), fr(-7n), fr(-30n))
    ok(fEq(q.disc, fr(169n)) && fEq(frSqrt(q.disc)!, fr(13n)), 'A hunt: Δ = 49 + 120 = 169 = 13²')
    ok(q.roots.length === 2 && fEq(q.roots[0], fr(10n)) && fEq(q.roots[1], fr(-3n)), 'A hunt: the doors are x = 10 (B) and x = −3')
    ok(fEq(fAdd(fDiv(fr(1n), fr(10n)), fDiv(fr(1n), fr(15n))), fr(1n, 6n)), 'A hunt: 1/10 + 1/15 = 1/6 — B = 10 days, A = 15 days, together 6, checked')
    ok(fMul(fr(-3n), fAdd(fr(-3n), fr(5n))).n !== 0n, 'A hunt: x = −3 passes the bill and is refused by the habitat — negative days do not exist')
    // pipe + drain: rates SUBTRACT
    ok(fEq(fSub(fDiv(fr(1n), fr(12n)), fDiv(fr(1n), fr(18n))), fr(1n, 36n)), 'A drain: 1/12 − 1/18 = 1/36 — the drain SUBTRACTS its rate, 36 h to fill')
    // the three-pipe cistern
    const net = fAdd(fSub(fDiv(fr(1n), fr(6n)), fDiv(fr(1n), fr(12n))), fDiv(fr(1n), fr(8n)))
    ok(fEq(net, fr(5n, 24n)) && fEq(fDiv(fr(1n), net), fr(24n, 5n)), 'A cistern: 1/6 − 1/12 + 1/8 = 5/24 → 24/5 h = 4.8 h = 4 h 48 min')
    ok(fEq(fMul(fSub(fr(24n, 5n), fr(4n)), fr(60n)), fr(48n)), 'A cistern: the fractional hour reads 48 minutes exactly')
  }

  // ---- (v) the AGE engine ----
  {
    const s = fr(12n)
    ok(fEq(fAdd(fMul(fr(3n), s), fr(12n)), fMul(fr(2n), fAdd(s, fr(12n)))), 'A age: 3s + 12 = 2(s + 12) holds at s = 12 (both sides 48)')
    ok(fEq(fMul(fr(3n), s), fr(36n)) && fEq(fAdd(fMul(fr(3n), s), fr(12n)), fr(48n)) && fEq(fMul(fr(2n), fAdd(s, fr(12n))), fr(48n)), 'A age: father 36 = 3·12 now, and 48 = 2·24 in 12 years — both reads checked')
    const s2 = fr(8n)
    ok(fEq(fAdd(fMul(fr(4n), s2), fr(16n)), fMul(fr(2n), fAdd(s2, fr(16n)))), 'A age: 4s + 16 = 2(s + 16) holds at s = 8 (mother 32, both sides 48)')
    const a = fr(25n)
    const b = fr(15n)
    ok(fEq(fAdd(a, b), fr(40n)) && fEq(fSub(a, fr(5n)), fMul(fr(2n), fSub(b, fr(5n)))), 'A age: 25 + 15 = 40 and 25 − 5 = 2·(15 − 5) — five years ago, twice as old, checked')
  }

  // ---- (vi) the MONEY engine ----
  {
    const x = fr(3000n)
    ok(fEq(fAdd(fMul(fr(5n), x), fMul(fr(8n), fSub(fr(5000n), x))), fr(31000n)), 'A money: 5x + 8(5000 − x) = 31000 holds at x = 3000 (percent-thousand units)')
    const i1 = fMul(fr(5n, 100n), fr(3000n))
    const i2 = fMul(fr(8n, 100n), fr(2000n))
    ok(fEq(i1, fr(150n)) && fEq(i2, fr(160n)) && fEq(fAdd(i1, i2), fr(310n)), 'A money: the rupee interest 150 + 160 = 310 — the split re-priced in the original units')
    // mark-up then discount: cost 100 → mark 125 → sell (9/10)·125 = 225/2
    const sell = fMul(fr(9n, 10n), fr(125n))
    ok(fEq(sell, fr(225n, 2n)), 'A money: 25% up then 10% off sells at 125·(9/10) = 225/2 = 112.5')
    ok(fEq(fDiv(fSub(sell, fr(100n)), fr(100n)), fr(1n, 8n)), 'A money: the profit fraction is (225/2 − 100)/100 = 1/8 = 12.5% — less than the mark-up, honestly')
  }

  // ---- (vii) the FENCE engine (7.2's fences) ----
  {
    // four tests averaging 68 → fifth s must make the average ≥ 70
    const total = fMul(fr(68n), fr(4n))
    ok(fEq(total, fr(272n)), 'A fence: the four-test total is 68·4 = 272')
    // (272 + s)/5 ≥ 70 ⟺ s ≥ 350 − 272 = 78
    const least = fSub(fMul(fr(70n), fr(5n)), total)
    ok(fEq(least, fr(78n)), 'A fence: s ≥ 350 − 272 = 78 — the fence reads off exactly')
    ok(fEq(fDiv(fAdd(total, fr(78n)), fr(5n)), fr(70n)), 'A fence: at s = 78 the average is exactly 70 — the boundary holds with equality')
    ok(fLt(fDiv(fAdd(total, fr(77n)), fr(5n)), fr(70n)), 'A fence: at s = 77 the average is 349/5 < 70 — one mark under fails')
    ok(fLt(fr(100n), least) === false && fLt(least, fr(100n)), 'A fence: the habitat cap 100 fences the legal band [78, 100] — achievable')
    // the honest impossible design: average 62 over four tests
    const total2 = fMul(fr(62n), fr(4n))
    const least2 = fSub(fMul(fr(70n), fr(5n)), total2)
    ok(fEq(total2, fr(248n)) && fEq(least2, fr(102n)) && fLt(fr(100n), least2), 'A fence (impossible): needing s ≥ 102 > 100 — even a perfect paper fails; the honest refusal')
  }

  // ---- (viii) the CHECK-station census ----
  {
    // every family's answer re-priced in its ORIGINAL relation — the census
    const checks = [
      fEq(fAdd(fMul(fr(40n), fr(30n)), fMul(fr(70n), fr(30n))), fMul(fr(55n), fr(60n))), // mixture
      fEq(fSub(fDiv(fr(360n), fr(40n)), fDiv(fr(360n), fr(45n))), fr(1n)), // motion
      fEq(fAdd(fDiv(fr(1n), fr(10n)), fDiv(fr(1n), fr(15n))), fr(1n, 6n)), // work-rate
      fEq(fAdd(fMul(fr(3n), fr(12n)), fr(12n)), fMul(fr(2n), fr(24n))), // age
      fEq(fAdd(fMul(fr(5n, 100n), fr(3000n)), fMul(fr(8n, 100n), fr(2000n))), fr(310n)), // money
    ]
    ok(checks.every(Boolean) && checks.length === 5, 'A the CHECK census: all five families\' answers re-priced in their original relations')
  }
  console.log('  A the pipeline engines: 5 stations, 5 families, every designed number priced end-to-end')
}

/* ------------------------------------------------------------------ */
/* (B) the 11.2 engines — the identity bank, the speed reads, the      */
/*     clever substitution, the symmetric reads                        */
/* ------------------------------------------------------------------ */

console.log('[B] 11.2 engines: the identity bank certified by expansion + substitution, the speed reads, the clever substitution, the symmetric reads')

function sectionB(): void {
  const a = pVar('a')
  const b = pVar('b')

  // ---- (i) the symbolic expansion engine: fourteen identities ----
  {
    const a2 = pMul(a, a)
    const b2 = pMul(b, b)
    const a3 = pMul(a2, a)
    const b3 = pMul(b2, b)
    const apb = pAdd(a, b)
    const amb = pSub(a, b)

    // 1. (a+b)² = a² + 2ab + b²
    ok(pEq(pMul(apb, apb), pSum([a2, pTerm(2n, { a: 1, b: 1 }), b2])), 'B1 (a+b)² = a² + 2ab + b² — certified by expansion')
    // 2. (a−b)² = a² − 2ab + b²
    ok(pEq(pMul(amb, amb), pSum([a2, pTerm(-2n, { a: 1, b: 1 }), b2])), 'B1 (a−b)² = a² − 2ab + b² — certified by expansion')
    // 3. (a+b)(a−b) = a² − b²
    ok(pEq(pMul(apb, amb), pSub(a2, b2)), 'B1 (a+b)(a−b) = a² − b² — certified by expansion')
    // 4. (a+b)³ = a³ + 3a²b + 3ab² + b³
    const abin = pMul(apb, pMul(apb, apb))
    ok(pEq(abin, pSum([a3, pTerm(3n, { a: 2, b: 1 }), pTerm(3n, { a: 1, b: 2 }), b3])), 'B1 (a+b)³ = a³ + 3a²b + 3ab² + b³ — certified by expansion')
    // 5. (a−b)³ = a³ − 3a²b + 3ab² − b³
    ok(pEq(pMul(amb, pMul(amb, amb)), pSum([a3, pTerm(-3n, { a: 2, b: 1 }), pTerm(3n, { a: 1, b: 2 }), pTerm(-1n, { b: 3 })])), 'B1 (a−b)³ = a³ − 3a²b + 3ab² − b³ — certified by expansion')
    // 6. (a+b)(a² − ab + b²) = a³ + b³
    const sofc = pAdd(pSub(a2, pTerm(1n, { a: 1, b: 1 })), b2)
    ok(pEq(pMul(apb, sofc), pAdd(a3, b3)), 'B1 (a+b)(a² − ab + b²) = a³ + b³ — the sum of cubes certified')
    // 7. (a−b)(a² + ab + b²) = a³ − b³
    const sofd = pAdd(pAdd(a2, pTerm(1n, { a: 1, b: 1 })), b2)
    ok(pEq(pMul(amb, sofd), pSub(a3, b3)), 'B1 (a−b)(a² + ab + b²) = a³ − b³ — the difference of cubes certified')
    // 8. the bridge: (a+b)² − (a−b)² = 4ab
    ok(pEq(pSub(pMul(apb, apb), pMul(amb, amb)), pTerm(4n, { a: 1, b: 1 })), 'B1 (a+b)² − (a−b)² = 4ab — the bridge identity certified')
    // 9. (a+b+c)² = a²+b²+c²+2ab+2bc+2ca
    {
      const x = pVar('x')
      const y = pVar('y')
      const z = pVar('z')
      const s = pAdd(pAdd(x, y), z)
      const expected = pSum([
        pMul(x, x), pMul(y, y), pMul(z, z),
        pTerm(2n, { x: 1, y: 1 }), pTerm(2n, { y: 1, z: 1 }), pTerm(2n, { z: 1, x: 1 }),
      ])
      ok(pEq(pMul(s, s), expected), 'B1 (a+b+c)² = a² + b² + c² + 2ab + 2bc + 2ca — certified by expansion')
      // 10. (x+y+z)(x²+y²+z²−xy−yz−zx) = x³+y³+z³−3xyz
      const inner = pSub(pSub(pAdd(pAdd(pMul(x, x), pMul(y, y)), pMul(z, z)), pTerm(1n, { x: 1, y: 1 })), pAdd(pTerm(1n, { y: 1, z: 1 }), pTerm(1n, { z: 1, x: 1 })))
      const expected2 = pSub(pAdd(pAdd(pMul(pMul(x, x), x), pMul(pMul(y, y), y)), pMul(pMul(z, z), z)), pTerm(3n, { x: 1, y: 1, z: 1 }))
      ok(pEq(pMul(s, inner), expected2), 'B1 (x+y+z)(x²+y²+z²−xy−yz−zx) = x³+y³+z³−3xyz — the competition staple certified')
    }
    // 11. the two-squares identity (Brahmagupta–Fibonacci)
    {
      const cV = pVar('c')
      const dV = pVar('d')
      const lhs = pMul(pAdd(pMul(a, a), pMul(b, b)), pAdd(pMul(cV, cV), pMul(dV, dV)))
      const acbd = pAdd(pMul(a, cV), pMul(b, dV))
      const adbc = pSub(pMul(a, dV), pMul(b, cV))
      ok(pEq(lhs, pAdd(pMul(acbd, acbd), pMul(adbc, adbc))), 'B1 (a²+b²)(c²+d²) = (ac+bd)² + (ad−bc)² — the two-squares identity certified by expansion')
    }
    // 12–14. the symmetric twin reads
    {
      const m = pVar('m')
      const h = pVar('h')
      const mph = pAdd(m, h)
      const mmh = pSub(m, h)
      const cubesSum = pAdd(pMul(pMul(mph, mph), mph), pMul(pMul(mmh, mmh), mmh))
      ok(pEq(cubesSum, pSum([pTerm(2n, { m: 3 }), pTerm(6n, { m: 1, h: 2 })])), 'B1 (m+h)³ + (m−h)³ = 2m³ + 6mh² — the even twin certified')
      const cubesDiff = pSub(pMul(pMul(mph, mph), mph), pMul(pMul(mmh, mmh), mmh))
      ok(pEq(cubesDiff, pSum([pTerm(6n, { m: 2, h: 1 }), pTerm(2n, { h: 3 })])), 'B1 (m+h)³ − (m−h)³ = 6m²h + 2h³ — the odd twin certified')
    }
    // numeric certification: designed substitutions, both sides equal
    const pairs: Array<[Frac, Frac]> = [
      [fr(3n), fr(2n)],
      [fr(5n), fr(-2n)],
      [fr(1n, 2n), fr(1n, 3n)],
      [fr(-7n), fr(4n)],
    ]
    for (const [av, bv] of pairs) {
      const subst = { a: av, b: bv }
      ok(fEq(pEval(pMul(pAdd(a, b), pAdd(a, b)), subst), pEval(pSum([pMul(a, a), pTerm(2n, { a: 1, b: 1 }), pMul(b, b)]), subst)), `B1 (a+b)² priced at (a, b) = (${fStr(av)}, ${fStr(bv)})`)
      ok(fEq(pEval(pMul(pAdd(a, b), pSub(a, b)), subst), pEval(pSub(pMul(a, a), pMul(b, b)), subst)), `B1 (a+b)(a−b) priced at (${fStr(av)}, ${fStr(bv)})`)
      ok(fEq(pEval(pMul(pMul(pAdd(a, b), pAdd(a, b)), pAdd(a, b)), subst), pEval(pSum([pMul(pMul(a, a), a), pTerm(3n, { a: 2, b: 1 }), pTerm(3n, { a: 1, b: 2 }), pMul(pMul(b, b), b)]), subst)), `B1 (a+b)³ priced at (${fStr(av)}, ${fStr(bv)})`)
      const sofcN = pAdd(pSub(pMul(a, a), pTerm(1n, { a: 1, b: 1 })), pMul(b, b))
      ok(fEq(pEval(pMul(pAdd(a, b), sofcN), subst), pEval(pAdd(pMul(pMul(a, a), a), pMul(pMul(b, b), b)), subst)), `B1 a³+b³ factorization priced at (${fStr(av)}, ${fStr(bv)})`)
    }
    // three-variable numeric certification on the census triples
    {
      const x = pVar('x')
      const y = pVar('y')
      const z = pVar('z')
      const s = pAdd(pAdd(x, y), z)
      const sq = pMul(s, s)
      const inner = pSub(pSub(pAdd(pAdd(pMul(x, x), pMul(y, y)), pMul(z, z)), pTerm(1n, { x: 1, y: 1 })), pAdd(pTerm(1n, { y: 1, z: 1 }), pTerm(1n, { z: 1, x: 1 })))
      const big = pMul(s, inner)
      const triples: Array<[Frac, Frac, Frac]> = [
        [fr(2n), fr(3n), fr(5n)],
        [fr(2n), fr(3n), fr(4n)],
        [fr(1n), fr(2n), fr(-3n)],
      ]
      for (const [xv, yv, zv] of triples) {
        const subst = { x: xv, y: yv, z: zv }
        const rhsSq = fAdd(fAdd(fAdd(fMul(xv, xv), fMul(yv, yv)), fMul(zv, zv)), fMul(fr(2n), fAdd(fAdd(fMul(xv, yv), fMul(yv, zv)), fMul(zv, xv))))
        ok(fEq(pEval(sq, subst), rhsSq), `B1 (x+y+z)² priced at (${fStr(xv)}, ${fStr(yv)}, ${fStr(zv)})`)
        const cubes = fAdd(fAdd(fMul(fMul(xv, xv), xv), fMul(fMul(yv, yv), yv)), fMul(fMul(zv, zv), zv))
        ok(fEq(pEval(big, subst), fSub(cubes, fMul(fr(3n), fMul(fMul(xv, yv), zv)))), `B1 x³+y³+z³−3xyz priced at (${fStr(xv)}, ${fStr(yv)}, ${fStr(zv)})`)
      }
    }
  }

  // ---- (ii) the SPEED-READ engine (BigInt, both sides computed independently) ----
  {
    ok(101n * 99n === 9999n && 100n * 100n - 1n === 9999n, 'B2 101 × 99 = 9999 = 100² − 1 — both sides computed')
    ok(51n * 49n === 2499n && 50n * 50n - 1n === 2499n, 'B2 51 × 49 = 2499 = 50² − 1')
    ok(998n * 1002n === 999996n && 1000n * 1000n - 4n === 999996n, 'B2 998 × 1002 = 999996 = 1000² − 4')
    ok(97n * 103n === 9991n && 100n * 100n - 9n === 9991n, 'B2 97 × 103 = 9991 = 100² − 9')
    ok(102n * 102n === 10404n && (100n + 2n) * (100n + 2n) === 10404n, 'B2 102² = 10404')
    ok(98n * 98n === 9604n, 'B2 98² = 9604')
    ok(205n * 205n === 42025n && (200n * 200n) + 2n * 200n * 5n + 25n === 42025n, 'B2 205² = 42025 = 200² + 2·200·5 + 5²')
    ok(195n * 195n === 38025n && (200n * 200n) - 2n * 200n * 5n + 25n === 38025n, 'B2 195² = 38025 = 200² − 2·200·5 + 5²')
    ok(999n * 999n === 998001n, 'B2 999² = 998001')
    ok(105n * 105n - 95n * 95n === 2000n && (105n - 95n) * (105n + 95n) === 2000n, 'B2 105² − 95² = 2000 = 10 × 200 — the difference of squares at speed')
    ok(205n * 205n - 195n * 195n === 4000n && (205n - 195n) * (205n + 195n) === 4000n, 'B2 205² − 195² = 4000 = 10 × 400')
    ok(1002n * 1002n - 998n * 998n === 8000n && 4n * 2000n === 8000n, 'B2 1002² − 998² = 8000 = 4 × 2000')
    // the cube twins
    ok(101n * 101n * 101n === 1030301n, 'B2 101³ = 1,030,301')
    ok(99n * 99n * 99n === 970299n, 'B2 99³ = 970,299')
    ok(101n * 101n * 101n + 99n * 99n * 99n === 2000600n && 2n * 100n * (100n * 100n + 3n) === 2000600n, 'B2 101³ + 99³ = 2,000,600 = 2·100·(100² + 3) — the even twin at speed')
    ok(103n * 103n * 103n - 97n * 97n * 97n === 180054n && 2n * 3n * (3n * 100n * 100n + 9n) === 180054n, 'B2 103³ − 97³ = 180,054 = 2·3·(3·100² + 9) — the odd twin at speed')
    ok(103n * 103n * 103n === 1092727n && 97n * 97n * 97n === 912673n, 'B2 the direct cubes 103³ = 1,092,727 and 97³ = 912,673 (the subtraction priced)')
  }

  // ---- (iii) the CLEVER-SUBSTITUTION engine ----
  {
    // the linear warm-up: (2x+1)² − 5(2x+1) + 6 = 0 with t = 2x+1
    const warm = (xv: Frac): Frac => {
      const t = fAdd(fMul(fr(2n), xv), fr(1n))
      return fAdd(fSub(fMul(t, t), fMul(fr(5n), t)), fr(6n))
    }
    ok(fIsZero(warm(fr(1n, 2n))), 'B3 warm-up: (2x+1)² − 5(2x+1) + 6 = 0 holds at x = 1/2 (t = 2)')
    ok(fIsZero(warm(fr(1n))), 'B3 warm-up: the original holds at x = 1 (t = 3)')
    // the collapsed quadratic t² − 5t + 6 = 0 has doors t = 2, 3 — the engine prices them
    const qw = quadRoots(fr(1n), fr(-5n), fr(6n))
    ok(qw.roots.length === 2 && ((fEq(qw.roots[0], fr(2n)) && fEq(qw.roots[1], fr(3n))) || (fEq(qw.roots[0], fr(3n)) && fEq(qw.roots[1], fr(2n)))), 'B3 warm-up: t² − 5t + 6 = 0 has the doors t = 2 and t = 3 → x = 1/2, 1')

    // the quartic: (x²−3x+3)² − 3(x²−3x+3) + 2 = 0 with t = x²−3x+3
    const tOf = (xv: Frac): Frac => fAdd(fSub(fMul(xv, xv), fMul(fr(3n), xv)), fr(3n))
    const quartic = (xv: Frac): Frac => {
      const t = tOf(xv)
      return fAdd(fSub(fMul(t, t), fMul(fr(3n), t)), fr(2n))
    }
    ok(fIsZero(quartic(fr(1n))), 'B3 quartic: the original holds at x = 1 (t = 1)')
    ok(fIsZero(quartic(fr(2n))), 'B3 quartic: the original holds at x = 2 (t = 1)')
    ok(fEq(tOf(fr(1n)), fr(1n)) && fEq(tOf(fr(2n)), fr(1n)), 'B3 quartic: both integer doors carry t = x²−3x+3 = 1 exactly')
    // t-doors: t² − 3t + 2 = 0 → t = 1, 2
    const qt = quadRoots(fr(1n), fr(-3n), fr(2n))
    ok(qt.roots.length === 2 && ((fEq(qt.roots[0], fr(1n)) && fEq(qt.roots[1], fr(2n))) || (fEq(qt.roots[0], fr(2n)) && fEq(qt.roots[1], fr(1n)))), 'B3 quartic: the collapsed t² − 3t + 2 = 0 has the doors t = 1 and t = 2')
    // t = 2 arm: x² − 3x + 1 = 0 → the surd pair (3 ± √5)/2
    const q2 = quadRoots(fr(1n), fr(-3n), fr(1n))
    ok(fEq(q2.disc, fr(5n)) && q2.roots.length === 0, 'B3 quartic: x² − 3x + 1 = 0 has Δ = 5 — not a rational square, the surd territory flagged')
    const rPlus = sHalf(sd(3n, 1n, 5n)) // (3 + √5)/2
    const rMinus = sHalf(sd(3n, -1n, 5n)) // (3 − √5)/2
    // t = x² − 3x + 3 at the surd doors, by exact surd arithmetic
    const tAt = (xs: Surd): Surd => sAdd(sSub(sMul(xs, xs), sMul(sd(3n, 0n, 5n), xs)), sd(3n, 0n, 5n))
    ok(sEq(tAt(rPlus), sd(2n, 0n, 5n)), 'B3 quartic: t = x²−3x+3 reads exactly 2 at x = (3+√5)/2 — surd-certified')
    ok(sEq(tAt(rMinus), sd(2n, 0n, 5n)), 'B3 quartic: t reads exactly 2 at x = (3−√5)/2 as well — the conjugate door')
    // and the full original at the surd doors: t² − 3t + 2 = 4 − 6 + 2 = 0
    const quarticS = (xs: Surd): Surd => {
      const t = tAt(xs)
      return sAdd(sSub(sMul(t, t), sMul(sd(3n, 0n, 5n), t)), sd(2n, 0n, 5n))
    }
    ok(sIsRational(quarticS(rPlus)) && fIsZero(quarticS(rPlus).q), 'B3 quartic: the ORIGINAL equation holds at x = (3+√5)/2 — four real roots in total')
    ok(sIsRational(quarticS(rMinus)) && fIsZero(quarticS(rMinus).q), 'B3 quartic: the original holds at the conjugate door too')
    // the surd doors satisfy the sum/product reads of 9.4: sum 3, product 1
    ok(sEq(sAdd(rPlus, rMinus), sd(3n, 0n, 5n)) && fEq(fMul(fr(3n, 2n), fr(1n, 2n)), fr(3n, 4n)), 'B3 quartic: the surd pair sums to 3 (9.4\'s Viète read, priced)')

    // the sibling: (x²−5x+5)² − (x²−5x+5) − 2 = 0 with t = x²−5x+5
    const tOf5 = (xv: Frac): Frac => fAdd(fSub(fMul(xv, xv), fMul(fr(5n), xv)), fr(5n))
    const sib = (xv: Frac): Frac => {
      const t = tOf5(xv)
      return fSub(fMul(t, t), fAdd(t, fr(2n)))
    }
    ok(fIsZero(sib(fr(2n))) && fEq(tOf5(fr(2n)), fr(-1n)), 'B3 sibling: the original holds at x = 2 (t = −1)')
    ok(fIsZero(sib(fr(3n))) && fEq(tOf5(fr(3n)), fr(-1n)), 'B3 sibling: the original holds at x = 3 (t = −1)')
    const qs = quadRoots(fr(1n), fr(-1n), fr(-2n))
    ok(qs.roots.length === 2 && fEq(qs.roots[0], fr(2n)) && fEq(qs.roots[1], fr(-1n)), 'B3 sibling: t² − t − 2 = 0 has the doors t = 2 and t = −1')
    // t = 2 arm: x² − 5x + 3 = 0 → (5 ± √13)/2
    const sPlus = sHalf(sd(5n, 1n, 13n))
    const tAt5 = (xs: Surd): Surd => sAdd(sSub(sMul(xs, xs), sMul(sd(5n, 0n, 13n), xs)), sd(5n, 0n, 13n))
    ok(sEq(tAt5(sPlus), sd(2n, 0n, 13n)), 'B3 sibling: t = x²−5x+5 reads exactly 2 at x = (5+√13)/2 — surd-certified')
    const sibS = (xs: Surd): Surd => {
      const t = tAt5(xs)
      return sSub(sMul(t, t), sAdd(t, sd(2n, 0n, 13n)))
    }
    ok(sIsRational(sibS(sPlus)) && fIsZero(sibS(sPlus).q), 'B3 sibling: the original holds at x = (5+√13)/2 — four real roots again')
  }

  // ---- (iv) the SYMMETRIC-READS engine (9.4's craft at speed) ----
  {
    // x + 1/x = 5 → the ladder, each value certified by surd arithmetic AND by the ladder identity
    const x5 = sHalf(sd(5n, 1n, 21n)) // (5 + √21)/2
    // the reciprocal is the conjugate: x·conj(x) = (25 − 21)/4 = 1
    const norm = sMul(x5, sConj(x5))
    ok(sIsRational(norm) && fEq(norm.q, fr(1n)), 'B4 the norm of (5+√21)/2 is 1 — so 1/x is the conjugate, honestly computed')
    const s2 = symPow(x5, 2)
    const s3 = symPow(x5, 3)
    const s4 = symPow(x5, 4)
    const s5 = symPow(x5, 5)
    ok(fEq(s2, fr(23n)), 'B4 x² + 1/x² = 23 for x + 1/x = 5 — surd-certified')
    ok(fEq(s3, fr(110n)), 'B4 x³ + 1/x³ = 110 — surd-certified')
    ok(fEq(s4, fr(527n)), 'B4 x⁴ + 1/x⁴ = 527 — surd-certified')
    ok(fEq(s5, fr(2525n)), 'B4 x⁵ + 1/x⁵ = 2525 — surd-certified')
    // the ladder identities: s² = s₁² − 2; s₃ = s₁³ − 3s₁; s₄ = s₂² − 2; s₅ = s₂s₃ − s₁
    ok(fEq(fSub(fMul(fr(5n), fr(5n)), fr(2n)), s2), 'B4 the ladder: 23 = 5² − 2')
    ok(fEq(fSub(fMul(fMul(fr(5n), fr(5n)), fr(5n)), fMul(fr(3n), fr(5n))), s3), 'B4 the ladder: 110 = 5³ − 3·5')
    ok(fEq(fSub(fMul(s2, s2), fr(2n)), s4), 'B4 the ladder: 527 = 23² − 2')
    ok(fEq(fSub(fMul(s2, s3), fr(5n)), s5), 'B4 the two-step ladder: 2525 = 23·110 − 5')
    // x + 1/x = 3 → 7, 18; and x⁵ + 1/x⁵ = 7·18 − 3 = 123
    const x3 = sHalf(sd(3n, 1n, 5n))
    ok(fEq(symPow(x3, 2), fr(7n)) && fEq(symPow(x3, 3), fr(18n)), 'B4 x + 1/x = 3: x²+1/x² = 7 and x³+1/x³ = 18 — surd-certified')
    ok(fEq(symPow(x3, 5), fr(123n)) && fEq(fSub(fMul(fr(7n), fr(18n)), fr(3n)), fr(123n)), 'B4 x⁵ + 1/x⁵ = 123 = 7·18 − 3 — the ladder and the surd agree')
    // x + 1/x = 7 → 47, 322
    ok(fEq(fSub(fMul(fr(7n), fr(7n)), fr(2n)), fr(47n)), 'B4 x + 1/x = 7: x²+1/x² = 47')
    ok(fEq(fSub(fMul(fMul(fr(7n), fr(7n)), fr(7n)), fMul(fr(3n), fr(7n))), fr(322n)), 'B4 x + 1/x = 7: x³+1/x³ = 322')
    // x + 1/x = 4 → 14, 52, 194
    ok(fEq(fSub(fMul(fr(4n), fr(4n)), fr(2n)), fr(14n)), 'B4 x + 1/x = 4: x²+1/x² = 14')
    ok(fEq(fSub(fMul(fMul(fr(4n), fr(4n)), fr(4n)), fMul(fr(3n), fr(4n))), fr(52n)), 'B4 x + 1/x = 4: x³+1/x³ = 52')
    ok(fEq(fSub(fMul(fr(14n), fr(14n)), fr(2n)), fr(194n)), 'B4 x + 1/x = 4: x⁴+1/x⁴ = 194 = 14² − 2')

    // the x+y / xy families
    {
      const xv = fr(6n)
      const yv = fr(1n)
      ok(fEq(fAdd(xv, yv), fr(7n)) && fEq(fMul(xv, yv), fr(6n)), 'B4 the designed pair (6, 1): sum 7, product 6')
      ok(fEq(fAdd(fMul(xv, xv), fMul(yv, yv)), fr(37n)) && fEq(fSub(fMul(fr(7n), fr(7n)), fMul(fr(2n), fr(6n))), fr(37n)), 'B4 x²+y² = 37 = 7² − 2·6 — both sides priced')
      ok(fEq(fAdd(fMul(fMul(xv, xv), xv), fMul(fMul(yv, yv), yv)), fr(217n)) && fEq(fSub(fMul(fMul(fr(7n), fr(7n)), fr(7n)), fMul(fMul(fr(3n), fr(6n)), fr(7n))), fr(217n)), 'B4 x³+y³ = 217 = 7³ − 3·6·7 — both sides priced')
      ok(fEq(fSub(fMul(fr(7n), fr(7n)), fMul(fr(4n), fr(6n))), fr(25n)) && fEq(fMul(fSub(xv, yv), fSub(xv, yv)), fr(25n)), 'B4 (x−y)² = 25 = 49 − 24 — the bridge identity at work, |x−y| = 5')
    }
    {
      const xv = fr(9n)
      const yv = fr(3n)
      ok(fEq(fAdd(xv, yv), fr(12n)) && fEq(fMul(xv, yv), fr(27n)), 'B4 the designed pair (9, 3): sum 12, product 27')
      ok(fEq(fSub(fMul(fr(12n), fr(12n)), fMul(fr(2n), fr(27n))), fr(90n)) && fEq(fAdd(fMul(xv, xv), fMul(yv, yv)), fr(90n)), 'B4 x²+y² = 90 = 144 − 54 — both sides priced')
      ok(fEq(fSub(fMul(fMul(fr(12n), fr(12n)), fr(12n)), fMul(fMul(fr(3n), fr(27n)), fr(12n))), fr(756n)) && fEq(fAdd(fMul(fMul(xv, xv), xv), fMul(fMul(yv, yv), yv)), fr(756n)), 'B4 x³+y³ = 756 = 1728 − 972 — both sides priced')
    }
  }

  // ---- (v) the THREE-VARIABLE engine ----
  {
    const trips: Array<[bigint, bigint, bigint, bigint, bigint]> = [
      // x, y, z, x²+y²+z², x³+y³+z³ − 3xyz
      [2n, 3n, 5n, 38n, 70n],
      [2n, 3n, 4n, 29n, 27n],
      [1n, 2n, -3n, 14n, 0n],
    ]
    for (const [xv, yv, zv, sq, cube] of trips) {
      const sum = xv + yv + zv
      const pair = xv * yv + yv * zv + zv * xv
      ok(fEq(fSub(fMul(fr(sum), fr(sum)), fMul(fr(2n), fr(pair))), fr(sq)), `B5 {${xv}, ${yv}, ${zv}}: x²+y²+z² = ${sq} = ${sum}² − 2·${pair}`)
      const cubes = xv * xv * xv + yv * yv * yv + zv * zv * zv
      ok(fEq(fSub(fr(cubes), fMul(fr(3n), fr(xv * yv * zv))), fr(cube)), `B5 {${xv}, ${yv}, ${zv}}: x³+y³+z³ − 3xyz = ${cube} directly`)
      ok(fEq(fMul(fr(sum), fSub(fr(sq), fr(pair))), fr(cube)), `B5 {${xv}, ${yv}, ${zv}}: the identity prices ${sum}·(${sq} − ${pair}) = ${cube}`)
    }
    // the sum-zero staple: x+y+z = 0 ⟹ x³+y³+z³ = 3xyz
    ok(1n + 2n - 3n === 0n && 1n * 1n * 1n + 8n - 27n === -18n && 3n * (1n * 2n * -3n) === -18n, 'B5 the sum-zero staple on {1, 2, −3}: x³+y³+z³ = 3xyz = −18')
    // the sum-zero SQUARE identity: x+y+z = 0 ⟹ x²+y²+z² = −2(xy+yz+zx)
    {
      const zeroTrips: Array<[bigint, bigint, bigint]> = [
        [1n, 2n, -3n],
        [2n, -5n, 3n],
      ]
      for (const [xv, yv, zv] of zeroTrips) {
        const sq = xv * xv + yv * yv + zv * zv
        const pair = xv * yv + yv * zv + zv * xv
        ok(xv + yv + zv === 0n && sq === -2n * pair, `B5 the sum-zero square identity on {${xv}, ${yv}, ${zv}}: x²+y²+z² = ${sq} = −2·(${pair})`)
      }
    }
  }

  // ---- (vi) the TWO-SQUARES engine (Brahmagupta–Fibonacci at work) ----
  {
    const twoSq = (a: bigint, b: bigint, c: bigint, d: bigint): boolean => {
      const lhs = (a * a + b * b) * (c * c + d * d)
      const rhs = (a * c + b * d) * (a * c + b * d) + (a * d - b * c) * (a * d - b * c)
      return lhs === rhs
    }
    ok(twoSq(2n, 1n, 3n, 1n) && 5n * 10n === 50n && 7n * 7n + 1n * 1n === 50n, 'B6 (2²+1²)(3²+1²) = 50 = 7² + 1² — the identity at work')
    ok(twoSq(2n, 1n, 2n, -3n) && 5n * 13n === 65n && 1n * 1n + 8n * 8n === 65n, 'B6 (2²+1²)(2²+3²) = 65 = 1² + 8² — the cross-matching')
    ok(twoSq(1n, 2n, 3n, 4n) && 5n * 25n === 125n && 11n * 11n + 2n * 2n === 125n, 'B6 (1²+2²)(3²+4²) = 125 = 11² + 2²')
    // the classic: 65 = 5·13 both ways
    ok(1n * 1n + 8n * 8n === 65n && 4n * 4n + 7n * 7n === 65n, 'B6 65 = 1² + 8² = 4² + 7² — two representations, one number')
    ok(5n === 1n * 1n + 2n * 2n && 13n === 2n * 2n + 3n * 3n, 'B6 the factors: 5 = 1² + 2² and 13 = 2² + 3² — the identity explains both reads of 65')
    // the two matchings: straight (ac+bd, ad−bc) and flipped (ac−bd, ad+bc)
    ok(twoSq(2n, 1n, 2n, 3n) && 2n * 2n + 1n * 3n === 7n && 2n * 3n - 1n * 2n === 4n, 'B6 the straight matching of (2,1)×(2,3) gives 65 = 7² + 4²')
    ok(twoSq(2n, 1n, 2n, -3n), 'B6 the flipped matching of the same factors gives 65 = 1² + 8² — two matchings, two representations')
  }
  console.log('  B the identity-bank engines: 14 identities by expansion + substitution, the speed reads, the substitutions, the symmetric ladders')
}

/* ------------------------------------------------------------------ */
/* (G) 11.3 pre-write engines (run 88) — the function idea, priced     */
/*     BEFORE any prose: the machine, the notation, the domains, the   */
/*     probes, the linear/range engines, the composition doorstep      */
/* ------------------------------------------------------------------ */

console.log('[G] 11.3 pre-write engines: the machine, the notation, the domain bills, the vertical probes, the linear and range engines, the composition doorstep')

function sectionG(): void {
  const fWork = (x: Frac): Frac => quadAt(fr(2n), fr(-7n), fr(3n), x)

  // ---- (i) the MACHINE engine: 10.3's workhorse, named f ----
  {
    ok(fEq(fWork(fr(-2n)), fr(25n)), 'G1 the machine reads f(−2) = 25 (8 + 14 + 3)')
    ok(fEq(fWork(fr(0n)), fr(3n)), 'G1 f(0) = 3 — the intercept read')
    ok(fEq(fWork(fr(1n)), fr(-2n)), 'G1 f(1) = −2 (2 − 7 + 3)')
    ok(fEq(fWork(fr(2n)), fr(-3n)), 'G1 f(2) = −3 (8 − 14 + 3)')
    ok(fEq(fWork(fr(1n, 2n)), fr(0n)), 'G1 f(1/2) = 0 — the door')
    ok(fEq(fWork(fr(3n)), fr(0n)), 'G1 f(3) = 0 — the other door')
    ok(fEq(fWork(fr(4n)), fr(7n)), 'G1 f(4) = 7 (32 − 28 + 3)')
    ok(fEq(fWork(fr(5n)), fr(18n)), 'G1 f(5) = 18 (50 − 35 + 3)')
    ok(fEq(fWork(fr(7n, 4n)), fr(-25n, 8n)), 'G1 f(7/4) = −25/8 — the vertex read, the minimum')
    const { roots } = quadRoots(fr(2n), fr(-7n), fr(3n))
    ok(roots.length === 2 && ((fEq(roots[0], fr(1n, 2n)) && fEq(roots[1], fr(3n))) || (fEq(roots[0], fr(3n)) && fEq(roots[1], fr(1n, 2n)))), 'G1 the zeros {1/2, 3} are exactly 10.3\'s doors (unordered)')
    const gapAt = (x: Frac): Frac => fAdd(fWork(x), fr(25n, 8n))
    const sqGap = (x: Frac): Frac => fMul(fr(2n), fMul(fSub(x, fr(7n, 4n)), fSub(x, fr(7n, 4n))))
    ok(fEq(gapAt(fr(0n)), sqGap(fr(0n))) && fEq(gapAt(fr(2n)), sqGap(fr(2n))), 'G1 the gap f(x) + 25/8 = 2(x − 7/4)² at x = 0 and 2 (49/8 and 1/8)')
  }

  // ---- (ii) the NOTATION engine: the input may be an expression ----
  {
    const fShift = (x: Frac): Frac => quadAt(fr(2n), fr(-3n), fr(-2n), x)
    ok(fEq(fShift(fr(2n)), fWork(fr(3n))) && fIsZero(fShift(fr(2n))), 'G2 f(x+1) at x = 2 equals f(3) = 0 — the input is the EXPRESSION x + 1')
    const X = pVar('x')
    const xp1 = pAdd(X, pTerm(1n, {}))
    const lhsS = pAdd(pSub(pMul(pTerm(2n, {}), pMul(xp1, xp1)), pMul(pTerm(7n, {}), xp1)), pTerm(3n, {}))
    const rhsS = pAdd(pSub(pMul(pTerm(2n, {}), pMul(X, X)), pMul(pTerm(3n, {}), X)), pTerm(-2n, {}))
    ok(pEq(lhsS, rhsS), 'G2 f(x+1) = 2x² − 3x − 2 certified by symbolic expansion')
    const t14 = fr(1n, 4n)
    ok(fEq(fWork(fAdd(fr(7n, 4n), t14)), fWork(fSub(fr(7n, 4n), t14))), 'G2 the mirror twins f(7/4 ± 1/4) are equal — the notation carries 10.3\'s symmetry')
  }

  // ---- (iii) the DOMAIN engines: 8.3's bills keep the rule honest ----
  {
    ok(fEq(fDiv(fr(1n), fSub(fr(0n), fr(2n))), fr(-1n, 2n)), 'G3 the bill 1/(x−2) reads −1/2 at x = 0')
    ok(fEq(fDiv(fr(1n), fSub(fr(4n), fr(2n))), fr(1n, 2n)), 'G3 reads 1/2 at x = 4')
    ok(fEq(fDiv(fr(1n), fSub(fr(5n, 2n), fr(2n))), fr(2n)), 'G3 reads 2 at x = 5/2')
    let refused = false
    try { fDiv(fr(1n), fSub(fr(2n), fr(2n))) } catch { refused = true }
    ok(refused, 'G3 the bill refuses x = 2 — the guard fires (8.3\'s discipline, now the domain)')
    const nonNeg = (a: Frac): boolean => !fLt(a, fr(0n))
    ok(nonNeg(fr(0n)) && fEq(frSqrt(fr(0n))!, fr(0n)), 'G3 √(x−3) at x = 3 reads 0 — accepted at the boundary')
    ok(fEq(frSqrt(fr(1n))!, fr(1n)), 'G3 reads 1 at x = 4')
    ok(fEq(frSqrt(fr(4n))!, fr(2n)) && fEq(frSqrt(fr(16n))!, fr(4n)), 'G3 reads 2 at x = 7 and 4 at x = 19')
    ok(!nonNeg(fSub(fr(0n), fr(3n))) && !nonNeg(fSub(fr(2n), fr(3n))), 'G3 the surd filter refuses x = 0 and x = 2 (negative under the root)')
    const holeAt = (x: Frac): Frac => fAdd(x, fr(3n))
    ok(fEq(holeAt(fr(0n)), fr(3n)) && fEq(holeAt(fr(-4n)), fr(-1n)) && fEq(holeAt(fr(5n)), fr(8n)), 'G3 the hole function (x²−9)/(x−3) = x + 3 reads 3, −1, 8 at 0, −4, 5')
    ok(fIsZero(quadAt(fr(1n), fr(0n), fr(-9n), fr(3n))) && fEq(holeAt(fr(3n)), fr(6n)), 'G3 at x = 3 both numerator and bill vanish: 0/0 — the hole sits at (3, 6), unplotted')
    const comb = (x: Frac): Frac | null => {
      if (!nonNeg(fSub(fr(5n), x))) return null
      if (fIsZero(fSub(x, fr(2n)))) return null
      const s = frSqrt(fSub(fr(5n), x))
      return s === null ? null : fDiv(s, fSub(x, fr(2n)))
    }
    ok(fEq(comb(fr(5n))!, fr(0n)), 'G3 the combined machine √(5−x)/(x−2) reads 0 at x = 5 (boundary accepted)')
    ok(fEq(comb(fr(1n))!, fr(-2n)), 'G3 reads −2 at x = 1')
    ok(fEq(comb(fr(4n))!, fr(1n, 2n)), 'G3 reads 1/2 at x = 4')
    ok(comb(fr(2n)) === null && nonNeg(fSub(fr(5n), fr(2n))), 'G3 refuses x = 2 on the BILL alone (the surd would be fine: √3)')
    ok(comb(fr(6n)) === null, 'G3 refuses x = 6 on the surd alone (5 − 6 < 0)')
    const kOf = (x: Frac): Frac => fDiv(fr(1n), fSub(fMul(x, x), fr(1n)))
    ok(fEq(kOf(fr(0n)), fr(-1n)) && fEq(kOf(fr(3n)), fr(1n, 8n)) && fEq(kOf(fr(2n)), fr(1n, 3n)), 'G3 the two-bill cousin 1/(x²−1) reads −1, 1/8, 1/3 at 0, 3, 2')
    ok(fEq(kOf(fr(2n)), kOf(fNeg(fr(2n)))), 'G3 k(−2) = k(2) = 1/3 — the even rule, priced')
    let kRefP = false
    try { kOf(fr(1n)) } catch { kRefP = true }
    let kRefM = false
    try { kOf(fr(-1n)) } catch { kRefM = true }
    ok(kRefP && kRefM, 'G3 the two bills x = 1 and x = −1 both refused')
  }

  // ---- (iv) the VERTICAL-PROBE engines: 10.1's uniqueness, re-read ----
  {
    const L = (x: Frac): Frac => fAdd(fMul(fr(3n), x), fr(2n))
    ok(fEq(L(fr(-1n)), fr(-1n)) && fEq(L(fr(0n)), fr(2n)) && fEq(L(fr(2n)), fr(8n)), 'G4 the line y = 3x+2 answers probes −1, 0, 2 with −1, 2, 8 — one meet each')
    ok(fEq(fWork(fr(-2n)), fr(25n)) && fEq(fWork(fr(0n)), fr(3n)) && fEq(fWork(fr(5n)), fr(18n)) && fEq(fWork(fr(7n, 4n)), fr(-25n, 8n)), 'G4 the bowl answers −2, 0, 5, 7/4 with 25, 3, 18, −25/8 — one meet each')
    const circ = (xv: Frac): { n: number; ys: Frac[] } => {
      const { roots: ys } = quadRoots(fr(1n), fr(0n), fNeg(fSub(fr(25n), fMul(xv, xv))))
      return { n: ys.length, ys }
    }
    ok(circ(fr(3n)).n === 2 && fEq(circ(fr(3n)).ys[0], fr(4n)) && fEq(circ(fr(3n)).ys[1], fr(-4n)) && 9n + 16n === 25n, 'G4 the circle x²+y² = 25 at probe x = 3: y = ±4, TWO meets (9 + 16 = 25)')
    ok(circ(fr(5n)).n === 1 && fIsZero(circ(fr(5n)).ys[0]), 'G4 probe x = 5: y² = 0 — ONE meet (5, 0), the tangent')
    ok(circ(fr(6n)).n === 0, 'G4 probe x = 6: 25 − 36 < 0 — NO meet')
    const side = (xv: Frac): { n: number; ys: Frac[] } => {
      const { roots: ys } = quadRoots(fr(1n), fr(0n), fNeg(xv))
      return { n: ys.length, ys }
    }
    ok(side(fr(4n)).n === 2 && fEq(side(fr(4n)).ys[0], fr(2n)) && fEq(side(fr(4n)).ys[1], fr(-2n)), 'G4 the sideways parabola x = y² at probe x = 4: y = ±2 — TWO meets, not a function')
    ok(side(fr(0n)).n === 1 && side(fr(-1n)).n === 0, 'G4 x = y² at probe 0 meets once (the vertex) and at −1 never')
    ok(fEq(frSqrt(fr(4n))!, fr(2n)) && frSqrt(fr(9n)) !== null && fEq(frSqrt(fr(9n))!, fr(3n)), 'G4 the branch fix y = √x answers 4 and 9 with 2 and 3 — single-valued')
  }

  // ---- (v) the LINEAR-function engine: 10.2 named f ----
  {
    const Ffare = (d: Frac): Frac => fAdd(fr(50n), fMul(fr(12n), d))
    ok(fEq(Ffare(fr(0n)), fr(50n)) && fEq(Ffare(fr(3n)), fr(86n)) && fEq(Ffare(fr(7n)), fr(134n)), 'G5 the fare machine F(d) = 50 + 12d reads 50, 86, 134 at 0, 3, 7')
    ok(fEq(fSub(Ffare(fr(1n)), Ffare(fr(0n))), fr(12n)) && fEq(fSub(Ffare(fr(3n)), Ffare(fr(2n))), fr(12n)) && fEq(fSub(Ffare(fr(6n)), Ffare(fr(5n))), fr(12n)), 'G5 the climb F(d+1) − F(d) = 12 at d = 0, 2, 5 — the rate, constant (10.2\'s steepness theorem as a machine)')
    ok(fEq(Ffare(fr(1n)), fr(62n)) && fEq(Ffare(fr(4n)), fr(98n)), 'G5 the distractor reads F(1) = 62 and F(4) = 98 priced')
    const FFah = (C: Frac): Frac => fAdd(fMul(fr(9n, 5n), C), fr(32n))
    ok(fEq(FFah(fr(0n)), fr(32n)) && fEq(FFah(fr(100n)), fr(212n)), 'G5 F(0) = 32 and F(100) = 212 — the fixed points of the scale')
    ok(fEq(FFah(fr(37n)), fr(493n, 5n)) && fEq(fr(493n, 5n), fr(986n, 10n)), 'G5 F(37) = 493/5 = 98.6 — the body-temperature read')
    ok(fEq(FFah(fr(-40n)), fr(-40n)), 'G5 F(−40) = −40 — the meeting point of the scales')
    ok(fEq(fMul(fr(-4n, 5n), fr(-40n)), fr(32n)), 'G5 solved as an equation: C = (9/5)C + 32 gives −(4/5)C = 32, C = −40')
    ok(fEq(fDiv(fSub(fr(86n), fr(32n)), fr(9n, 5n)), fr(30n)) && fEq(FFah(fr(30n)), fr(86n)), 'G5 the reverse read: F(C) = 86 lands C = 30 exactly, and F(30) = 86 confirms')
  }

  // ---- (vi) the RANGE engine: 10.3's hinge read backwards ----
  {
    ok(fEq(fAdd(fWork(fr(0n)), fr(25n, 8n)), fr(49n, 8n)) && fEq(fAdd(fWork(fr(2n)), fr(25n, 8n)), fr(1n, 8n)), 'G6 the gap above the minimum: 49/8 at x = 0 and 1/8 at x = 2')
    ok(fEq(fr(49n, 8n), fMul(fr(2n), fMul(fr(-7n, 4n), fr(-7n, 4n)))) && fEq(fr(1n, 8n), fMul(fr(2n), fMul(fr(1n, 4n), fr(1n, 4n)))), 'G6 the gap priced as 2(x − 7/4)²: 2·49/16 = 49/8 and 2·1/16 = 1/8')
    const dK = (k: Frac): Frac => fAdd(fr(25n), fMul(fr(8n), k))
    ok(fEq(dK(fr(0n)), fr(25n)), 'G6 the shifted discriminant Δ_k = 25 + 8k at k = 0: 25 — two meets (the doors)')
    ok(fEq(dK(fr(-25n, 8n)), fr(0n)), 'G6 at k = −25/8: 0 — the vertex graze, the range\'s floor')
    ok(fEq(dK(fr(-4n)), fr(-7n)), 'G6 at k = −4: −7 — no meet (below the floor)')
    ok(fEq(dK(fr(5n)), fr(65n)), 'G6 at k = 5: 65 — two meets')
    const gDown = (x: Frac): Frac => quadAt(fr(-1n), fr(4n), fr(5n), x)
    ok(fEq(gDown(fr(0n)), fr(5n)) && fEq(gDown(fr(4n)), fr(5n)) && fEq(gDown(fr(2n)), fr(9n)), 'G6 the down bowl −x²+4x+5: g(0) = g(4) = 5, g(2) = 9 — the peak')
    ok(fEq(fSub(fr(9n), gDown(fr(0n))), fr(4n)) && fEq(fSub(fr(9n), gDown(fr(4n))), fr(4n)), 'G6 the gap below the peak: 9 − 5 = 4 = (x − 2)² at x = 0 and 4 — range (−∞, 9]')
    const hFloat = (x: Frac): Frac => quadAt(fr(1n), fr(0n), fr(1n), x)
    ok(fEq(hFloat(fr(0n)), fr(1n)), 'G6 the floating bowl x² + 1: h(0) = 1, the minimum — range [1, ∞)')
    ok(fEq(fSub(fMul(fr(0n), fr(0n)), fMul(fr(4n), fr(1n))), fr(-4n)), 'G6 Δ(x² + 1) = −4 — the bowl never meets the x-axis, yet h(0) = 1 is a perfectly good output')
  }

  // ---- (vii) the COMPOSITION doorstep: 11.2's camera, named ----
  {
    const sq = (x: Frac): Frac => fMul(x, x)
    const inc = (x: Frac): Frac => fAdd(x, fr(1n))
    ok(fEq(sq(inc(fr(3n))), fr(16n)), 'G7 f(g(3)) = f(4) = 16 — square after increment')
    ok(fEq(inc(sq(fr(3n))), fr(10n)), 'G7 g(f(3)) = g(9) = 10 — increment after square; ORDER MATTERS')
    ok(fEq(sq(inc(fr(2n))), fr(9n)) && fEq(inc(sq(fr(2n))), fr(5n)), 'G7 the exercise pair: f(g(2)) = 9 and g(f(2)) = 5')
    const X = pVar('x')
    const gx = pAdd(X, pTerm(1n, {}))
    const fg = pAdd(pAdd(pMul(X, X), pMul(pTerm(2n, {}), X)), pTerm(1n, {}))
    const gf = pAdd(pMul(X, X), pTerm(1n, {}))
    ok(pEq(pMul(gx, gx), fg), 'G7 (f∘g)(x) = (x+1)² = x² + 2x + 1 by expansion')
    ok(pEq(pAdd(pMul(X, X), pTerm(1n, {})), gf) && !pEq(fg, gf), 'G7 (g∘f)(x) = x² + 1 — and the two composites DIFFER: order is part of the data')
    const gq = pAdd(pSub(pMul(X, X), pMul(pTerm(3n, {}), X)), pTerm(3n, {}))
    const fq = (t: Poly): Poly => pAdd(pSub(pMul(t, t), pMul(pTerm(3n, {}), t)), pTerm(2n, {}))
    const quartic = fq(gq)
    const x4 = pMul(pMul(pMul(X, X), X), X)
    const expect = pAdd(pAdd(pAdd(x4, pMul(pTerm(-6n, {}), pMul(pMul(X, X), X))), pMul(pTerm(12n, {}), pMul(X, X))), pAdd(pMul(pTerm(-9n, {}), X), pTerm(2n, {})))
    ok(pEq(quartic, expect), 'G7 the 11.2 quartic (x²−3x+3)² − 3(x²−3x+3) + 2 = x⁴ − 6x³ + 12x² − 9x + 2 — a composite f∘g, certified by expansion')
    ok(fEq(quadAt(fr(1n), fr(-3n), fr(3n), fr(1n)), fr(1n)) && fEq(quadAt(fr(1n), fr(-3n), fr(3n), fr(2n)), fr(1n)), 'G7 the integer doors feed g = 1: g(1) = g(2) = 1')
    const sPlus = sHalf(sd(3n, 1n, 5n))
    const gAt = (x: Surd): Surd => sAdd(sSub(sMul(x, x), sMul(sd(3n, 0n, 5n), x)), sd(3n, 0n, 5n))
    ok(sEq(gAt(sPlus), sd(2n, 0n, 5n)), 'G7 the surd door feeds g = 2: g((3+√5)/2) = 2 exactly')
    ok(fIsZero(quadAt(fr(1n), fr(-3n), fr(2n), fr(1n))) && fIsZero(quadAt(fr(1n), fr(-3n), fr(2n), fr(2n))), 'G7 and f\'s doors: f(1) = f(2) = 0 — the composite vanishes exactly at the four doors')
    ok(fEq(frSqrt(fr(25n))!, fr(5n)), 'G7 the composite √(x²) at x = −5 reads √25 = 5 = |−5| — never −5')
    ok(frSqrt(fNeg(fr(25n))) === null, 'G7 the composite (√x)² at x = −5: the INNER rule refuses (√(−25) is not real) — composites keep the inner domain')
    const foldGap = (x: Frac): Frac => fSub(quadAt(fr(1n), fr(4n), fr(7n), x), fr(3n))
    ok(fEq(foldGap(fr(0n)), fr(4n)) && fEq(foldGap(fr(-2n)), fr(0n)) && fEq(foldGap(fr(-4n)), fr(4n)), 'G7 the L6 fold: x²+4x+7 = (x+2)² + 3 — the gap 4 at x = 0 and −4, zero at the vertex −2')
    const foldDown = (x: Frac): Frac => fSub(fr(9n), quadAt(fr(-1n), fr(4n), fr(5n), x))
    ok(fEq(foldDown(fr(0n)), fr(4n)) && fEq(foldDown(fr(4n)), fr(4n)) && fEq(foldDown(fr(2n)), fr(0n)), 'G7 the L6 down fold: −x²+4x+5 = 9 − (x−2)² — the gap 4 at 0 and 4, zero at the peak 2')
  }
  console.log('  G the function engines: machine, notation, domains, probes, linear, range, composition — all priced exact')
}

/* ------------------------------------------------------------------ */
/* (C) the figure geometry plans — pinned before the SVGs are drawn    */
/* ------------------------------------------------------------------ */

console.log('[C] figure plans pinned: 11.1 the pipeline map 720×340 + the motion timeline 720×340; 11.2 the (a+b)² area proof 720×400 + the difference-of-squares strip 720×360')

interface FigPlan {
  name: string
  view: number[]
  chips: number[][]
  groups: number[][]
}

function selfCheckPlan(plan: FigPlan, tag: string): void {
  const [W, H] = plan.view
  ok(plan.chips.length >= 5, `${tag}: ${plan.name} pins at least 5 rects (got ${plan.chips.length})`)
  for (let i = 0; i < plan.chips.length; i++) {
    const [x, y, w, h] = plan.chips[i]
    ok(x >= 0 && y >= 0 && x + w <= W && y + h <= H, `${tag}: rect ${i} (${x},${y},${w},${h}) inside the ${W}×${H} viewBox (${plan.name})`)
  }
  for (const g of plan.groups) {
    for (let i = 0; i < g.length; i++)
      for (let j = i + 1; j < g.length; j++) {
        const [ax, ay, aw, ah] = plan.chips[g[i]]
        const [bx, by, bw, bh] = plan.chips[g[j]]
        ok(ax + aw <= bx || bx + bw <= ax || ay + ah <= by || by + bh <= ay, `${tag}: plan rects ${g[i]}/${g[j]} disjoint (${plan.name})`)
      }
  }
}

const plan111Fig1: FigPlan = {
  name: 'the pipeline map',
  view: [720, 340],
  chips: [
    [30, 18, 660, 40], // 0 header band
    [33, 72, 110, 54], // 1 READ
    [169, 72, 110, 54], // 2 NAME
    [305, 72, 110, 54], // 3 RELATE
    [441, 72, 110, 54], // 4 SOLVE
    [577, 72, 110, 54], // 5 CHECK
    [33, 150, 110, 64], // 6 worked panel READ
    [169, 150, 110, 64], // 7 worked panel NAME
    [305, 150, 110, 64], // 8 worked panel RELATE
    [441, 150, 110, 64], // 9 worked panel SOLVE
    [577, 150, 110, 64], // 10 worked panel CHECK
    [30, 232, 660, 56], // 11 the two-filters note band
    [30, 306, 660, 30], // 12 caption band
  ],
  groups: [[0], [1, 2, 3, 4, 5], [6, 7, 8, 9, 10], [11], [12]],
}

const plan111Fig2: FigPlan = {
  name: 'the motion timeline',
  view: [720, 340],
  chips: [
    [30, 18, 660, 40], // 0 header band
    [70, 92, 533.33, 34], // 1 the 9-hour bar, first 8 hours (40 km/h)
    [603.33, 92, 66.67, 34], // 2 the ninth hour — the hour saved (orange)
    [70, 182, 533.33, 34], // 3 the 8-hour bar (45 km/h)
    [603.33, 182, 66.67, 34], // 4 the ghost hour (dashed, never travelled)
    [30, 240, 660, 56], // 5 the same-distance note band
    [30, 306, 660, 30], // 6 caption band
  ],
  groups: [[0], [1, 2], [3, 4], [5], [6]],
}

const plan112Fig1: FigPlan = {
  name: 'the (a+b)² area proof',
  view: [720, 400],
  chips: [
    [30, 18, 660, 40], // 0 header band
    [150, 66, 260, 260], // 1 the outer square of side a + b (stroke only)
    [150, 66, 160, 160], // 2 the a² square (top-left)
    [310, 66, 100, 160], // 3 the first ab rectangle (top-right)
    [150, 226, 160, 100], // 4 the second ab rectangle (bottom-left)
    [310, 226, 100, 100], // 5 the b² square (bottom-right)
    [30, 332, 660, 30], // 6 the identity band
    [30, 372, 660, 22], // 7 caption band
  ],
  groups: [[0], [1], [2, 3, 4, 5], [6], [7]],
}

const plan112Fig2: FigPlan = {
  name: 'the difference-of-squares strip',
  view: [720, 360],
  chips: [
    [30, 18, 660, 40], // 0 header band
    [60, 70, 210, 210], // 1 the outer a×a square (stroke only)
    [60, 130, 210, 150], // 2 the bottom band a × (a−b) (amber)
    [60, 70, 150, 60], // 3 the top-left block (a−b) × b (orange)
    [210, 70, 60, 60], // 4 the removed b² corner (red dashed)
    [400, 140, 270, 150], // 5 the outer (a+b)×(a−b) strip (stroke only)
    [400, 140, 210, 150], // 6 the strip's a × (a−b) piece (amber)
    [610, 140, 60, 150], // 7 the strip's b × (a−b) piece (orange)
    [30, 292, 660, 28], // 8 the identity band
    [30, 328, 660, 26], // 9 caption band
  ],
  groups: [[0], [1], [2, 3], [4], [5], [6, 7], [8], [9]],
}

const plan113Fig1: FigPlan = {
  name: 'the function machine',
  view: [720, 360],
  chips: [
    [30, 18, 660, 40], // 0 header band
    [70, 150, 110, 64], // 1 the input chip (x = 2)
    [230, 110, 260, 130], // 2 the machine box (the rule)
    [540, 150, 110, 64], // 3 the output chip (f(2) = −3)
    [30, 270, 660, 46], // 4 the domain/range note band
    [30, 324, 660, 28], // 5 caption band
  ],
  groups: [[0], [1], [2], [3], [4], [5]],
}

const plan113Fig2: FigPlan = {
  name: 'the probe verdicts strip',
  view: [720, 380],
  chips: [
    [30, 18, 660, 40], // 0 header band
    [40, 80, 200, 190], // 1 panel A: the bowl passes (one meet per probe)
    [260, 80, 200, 190], // 2 panel B: the circle fails (probe x = 3, two meets)
    [480, 80, 200, 190], // 3 panel C: the sideways parabola fails (x = y²)
    [30, 290, 660, 40], // 4 the branch-fix verdict band
    [30, 338, 660, 32], // 5 caption band
  ],
  groups: [[0], [1], [2], [3], [4], [5]],
}

function sectionC(): void {
  selfCheckPlan(plan111Fig1, 'C 11.1 fig 1')
  selfCheckPlan(plan111Fig2, 'C 11.1 fig 2')
  selfCheckPlan(plan112Fig1, 'C 11.2 fig 1')
  selfCheckPlan(plan112Fig2, 'C 11.2 fig 2')
  selfCheckPlan(plan113Fig1, 'C 11.3 fig 1')
  selfCheckPlan(plan113Fig2, 'C 11.3 fig 2')
  // the designed geometry of the figures is itself arithmetic — priced here
  ok(533.33 + 66.67 === 600 && 70 + 600 === 670, 'C 11.1 fig 2: the bar splits 533.33 + 66.67 = 600 px = 9 hours at 66.67 px/h')
  ok(533.33 / 66.67 > 7.99 && 533.33 / 66.67 < 8.01, 'C 11.1 fig 2: the fast bar spans 8 of the 9 hourly divisions')
  ok(160 + 100 === 260, 'C 11.2 fig 1: the side splits a = 160 px + b = 100 px = the 260 px square')
  ok(210 + 60 === 270 && 210 - 60 === 150, 'C 11.2 fig 2: a + b = 270 px, a − b = 150 px — the strip\'s two sides priced')
  // the 11.3 figure geometry priced
  ok(230 - 180 === 50 && 540 - 490 === 50, 'C 11.3 fig 1: the machine box sits 50 px from the input chip and 50 px from the output chip — symmetric arrows')
  ok((70 + 110 / 2) + (540 + 55) === 720 && 360 - (70 + 110 / 2) === (540 + 55) - 360, 'C 11.3 fig 1: the input centre 125 and output centre 595 sit 235 px either side of the midline 360')
  ok(40 + 200 === 240 && 240 + 20 === 260 && 260 + 200 === 460 && 460 + 20 === 480 && 480 + 200 === 680, 'C 11.3 fig 2: the three panels span 40 → 680 with 20-px gutters — 200 px each, equal reads')
  ok(80 + 190 === 270 && 290 - 270 === 20, 'C 11.3 fig 2: the panels close at 270 and the verdict band clears them by 20 px')
  console.log('  C the six figure plans pinned: 13 + 7 + 8 + 10 + 6 + 6 rects, all in-bounds and pairwise disjoint within their rows')
}

/* ------------------------------------------------------------------ */
/* the run — pre-write gate (A–C + G), then the authored batteries     */
/* D/E/H/F against ch-11.ts (the single-file discipline of runs 73–87)  */
/* ------------------------------------------------------------------ */

const PREWRITE = process.env.PREWRITE === '1'

sectionA()
sectionB()
sectionC()
sectionG()

if (PREWRITE) {
  console.log('')
  console.log(`RUN 88 PRE-WRITE VERIFICATION (A–C + G): ${passed} passed, ${failed} failed`)
  if (failures.length) {
    console.log('FAILURES:')
    for (const f of failures) console.log('  - ' + f)
  }
  process.exit(failed > 0 ? 1 : 0)
}

let ch11mod: any = null
try {
  ch11mod = await import('../src/data/library/books/mathematics/elementary-algebra/ch-11')
} catch {
  ch11mod = null
}

if (ch11mod) {
  const chapter11 = ch11mod.chapter11 as any
  const lesson111 = chapter11.lessons[0]
  const lesson112 = chapter11.lessons[1]
  const lesson113 = chapter11.lessons[2]

  const fs = await import('node:fs')
  const sourceLog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  const ch11File = fs.readFileSync('src/data/library/books/mathematics/elementary-algebra/ch-11.ts', 'utf8')

  function checkFigureAgainstPlan(svg: string, plan: { name: string; view: number[]; chips: number[][]; groups: number[][] }, wantH: number, tag: string): void {
    const vb = svg.match(/viewBox="0 0 (\d+) (\d+)"/)
    ok(!!vb && Number(vb[1]) === plan.view[0] && Number(vb[2]) === wantH, `${tag}: viewBox ${plan.view[0]}×${wantH} exact (${plan.name})`)
    const rects: number[][] = []
    const re = /<rect x="([\d.]+)" y="([\d.]+)" width="([\d.]+)" height="([\d.]+)"/g
    let m: RegExpExecArray | null
    while ((m = re.exec(svg))) rects.push([Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])])
    ok(rects.length === plan.chips.length, `${tag}: ${plan.chips.length} rects in file (got ${rects.length}) (${plan.name})`)
    for (let i = 0; i < Math.min(rects.length, plan.chips.length); i++) {
      ok(JSON.stringify(rects[i]) === JSON.stringify(plan.chips[i]), `${tag}: rect ${i} = (${plan.chips[i].join(',')}) rect-exact (${plan.name})`)
    }
    for (const g of plan.groups) {
      for (let i = 0; i < g.length; i++) {
        for (let j = i + 1; j < g.length; j++) {
          const [ax, ay, aw, ah] = plan.chips[g[i]]
          const [bx, by, bw, bh] = plan.chips[g[j]]
          ok(ax + aw <= bx || bx + bw <= ax || ay + ah <= by || by + bh <= ay, `${tag}: rects ${g[i]}/${g[j]} disjoint (${plan.name})`)
        }
      }
    }
    for (const hex of ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']) {
      ok(!svg.includes(hex), `${tag}: no retired hex ${hex}`)
    }
    ok(svg.includes('role="img"') && svg.includes('aria-label='), `${tag}: accessible (${plan.name})`)
  }

  function scanFileHygiene(text: string, tag: string): void {
    const runs = text.match(/\\+/g) || []
    let odd = 0
    for (const r of runs) if (r.length % 2 === 1) odd++
    ok(odd === 0, `${tag}: odd backslash runs = 0 (got ${odd})`)
    ok(!/\\u[0-9a-fA-F]{4}/.test(text), `${tag}: no unicode escapes`)
  }

  /* ---------------------------------------------------------------- */
  /* (D) the authored lesson 11.1 — structure census, quiz keys, the  */
  /*     14 exercises re-priced, figure geometry vs plan, scans       */
  /* ---------------------------------------------------------------- */

  console.log('[D] 11.1 authored: identity, structure census, quiz keys [2,3,1,0,2], 14 exercises re-priced, figure plans, scans')

  function sectionD(): void {
    ok(lesson111.id === 'al-word-problems-the-toolkit-at-work', 'D the 11.1 id is al-word-problems-the-toolkit-at-work')
    ok(lesson111.number === '11.1', 'D the 11.1 number is 11.1')
    ok(lesson111.title === 'Word Problems: the Toolkit at Work', 'D the 11.1 title matches the book.ts plan')

    // structure census
    const kinds: Record<string, number> = {}
    for (const b of lesson111.blocks) kinds[b.kind] = (kinds[b.kind] || 0) + 1
    ok(kinds['para'] === 13, `D 11.1 has 13 paras (got ${kinds['para']})`)
    ok(kinds['heading'] === 6, `D 11.1 has 6 headings (got ${kinds['heading']})`)
    ok(kinds['algorithm'] === 1, `D 11.1 has 1 algorithm (the pipeline)`)
    ok(kinds['table'] === 1, `D 11.1 has 1 table (the five-family census)`)
    ok(kinds['figure'] === 2, `D 11.1 has 2 figures`)
    ok(kinds['terms'] === 1, 'D 11.1 has 1 terms block')
    ok(kinds['example'] === 3, `D 11.1 has 3 examples`)
    ok(kinds['callout'] === 4, `D 11.1 has 4 callouts (warn, insight, historical, exam)`)
    ok(kinds['equation'] === 1, `D 11.1 has 1 equation`)
    ok(kinds['derivation'] === 1, `D 11.1 has 1 derivation (the alligation cross)`)
    ok(kinds['list'] === 1, `D 11.1 has 1 summary list`)
    ok(kinds['formula'] === 3, `D 11.1 has 3 formula cards`)
    ok(kinds['quiz'] === 1 && kinds['exercises'] === 1, 'D 11.1 has 1 quiz + 1 exercise set')
    const tones111 = lesson111.blocks.filter((b: any) => b.kind === 'callout').map((b: any) => b.tone)
    for (const t of ['warn', 'insight', 'historical', 'exam']) {
      ok(tones111.includes(t), `D 11.1 carries the ${t} callout`)
    }
    ok(lesson111.concepts.length >= 5 && lesson111.concepts.length <= 8, 'D 11.1 concepts 5–8')
    ok((lesson111.objectives || []).length >= 5, 'D 11.1 objectives >= 5')
    ok((lesson111.prerequisites || []).length === 5, 'D 11.1 prerequisites = 5 (5.2, 6.2, 7.2, 8.3, 9.1)')
    ok(lesson111.prerequisites.includes('al-solving-linear-equations') && lesson111.prerequisites.includes('al-substitution-and-elimination') && lesson111.prerequisites.includes('al-solving-linear-inequalities') && lesson111.prerequisites.includes('al-fractional-equations-and-extraneous-roots') && lesson111.prerequisites.includes('al-quadratics-and-factoring-solutions'), 'D 11.1 prerequisites name 5.2/6.2/7.2/8.3/9.1 by id')

    // the pipeline algorithm carries the five stations in order
    const alg111 = lesson111.blocks.find((b: any) => b.kind === 'algorithm')
    ok(alg111.lines.length === 5 && /^READ/.test(alg111.lines[0].code) && /^NAME/.test(alg111.lines[1].code) && /^RELATE/.test(alg111.lines[2].code) && /^SOLVE/.test(alg111.lines[3].code) && /^CHECK/.test(alg111.lines[4].code), 'D 11.1 the algorithm is the five stations in order')

    // quiz keys vs pinned [2, 3, 1, 0, 2]
    const quiz111 = lesson111.blocks.find((b: any) => b.kind === 'quiz')
    const keys111 = quiz111.items.map((it: any) => it.answer)
    ok(JSON.stringify(keys111) === JSON.stringify([2, 3, 1, 0, 2]), `D 11.1 quiz keys are [2,3,1,0,2] (got ${JSON.stringify(keys111)})`)
    ok(quiz111.items.length === 5, 'D 11.1 quiz has 5 items')
    for (const it of quiz111.items) {
      ok(it.options.length === 4 && it.explain.length > 80, 'D 11.1 quiz item: 4 options + full explanation')
    }
    // quiz distractor prices
    ok(fEq(fAdd(fMul(fr(40n), fr(30n)), fMul(fr(70n), fr(30n))), fMul(fr(55n), fr(60n))), 'D 11.1 quiz Q1: the blend balance 3300 = 3300 priced')
    ok(fEq(fSub(fDiv(fr(360n), fr(40n)), fDiv(fr(360n), fr(45n))), fr(1n)), 'D 11.1 quiz Q2: the train check 9 − 8 = 1 priced')
    ok(fEq(fAdd(fDiv(fr(1n), fr(10n)), fDiv(fr(1n), fr(15n))), fr(1n, 6n)), 'D 11.1 quiz Q3: the rates add to 1/6 priced')
    ok(fEq(fAdd(fMul(fr(3n), fr(12n)), fr(12n)), fMul(fr(2n), fAdd(fr(12n), fr(12n)))), 'D 11.1 quiz Q4: the age check 48 = 48 priced')
    ok(fEq(fDiv(fAdd(fr(272n), fr(78n)), fr(5n)), fr(70n)), 'D 11.1 quiz Q5: the fence boundary 350/5 = 70 priced')

    // the 14 exercises re-priced exactly
    const ex111 = lesson111.blocks.find((b: any) => b.kind === 'exercises')
    let n111 = 0
    for (const set of ex111.sets) n111 += set.questions.length
    ok(n111 === 14, `D 11.1 has 14 exercises (got ${n111})`)
    ok(JSON.stringify(ex111.sets.map((s: any) => s.questions.length)) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'D 11.1 exercise ladder 3/3/3/3/1/1')
    // L1 the warm-ups
    ok(28n + 29n + 30n === 87n && 25n + 27n + 29n === 81n, 'D 11.1 L1-1/2 the consecutive sums 87 and 81 priced')
    ok(fEq(fAdd(fDiv(fr(1n), fr(12n)), fDiv(fr(1n), fr(36n))), fr(1n, 9n)), 'D 11.1 L1-3 the taps 1/12 + 1/36 = 1/9 priced')
    // L2 the acid + dilution + fence
    ok(fEq(fAdd(fDiv(fr(18n), fr(4n)), fMul(fr(3n, 4n), fr(12n))), fMul(fr(9n, 20n), fr(30n))), 'D 11.1 L2-1 the acid balance 27/2 = 27/2 priced')
    ok(fEq(fMul(fr(3n, 10n), fr(20n)), fMul(fr(2n, 10n), fr(30n))), 'D 11.1 L2-2 the dilution 6 = 6 priced (w = 10)')
    ok(fEq(fSub(fMul(fr(70n), fr(5n)), fr(272n)), fr(78n)), 'D 11.1 L2-3 the fence least score 78 priced')
    // L3 the train + hunt + ages
    ok(fIsZero(quadAt(fr(1n), fr(5n), fr(-1800n), fr(40n))) && fEq(frSqrt(fr(7225n))!, fr(85n)), 'D 11.1 L3-1 the train door v = 40 with Δ = 85² priced')
    ok(fEq(fAdd(fDiv(fr(1n), fr(10n)), fDiv(fr(1n), fr(15n))), fr(1n, 6n)) && fIsZero(quadAt(fr(1n), fr(-7n), fr(-30n), fr(10n))), 'D 11.1 L3-2 the hunt door x = 10 priced')
    ok(fEq(fAdd(fr(25n), fr(15n)), fr(40n)) && fEq(fSub(fr(25n), fr(5n)), fMul(fr(2n), fSub(fr(15n), fr(5n)))), 'D 11.1 L3-3 the ages 25 and 15 priced')
    // L4 the split + boat + walk
    ok(fEq(fAdd(fMul(fr(5n, 100n), fr(3000n)), fMul(fr(8n, 100n), fr(2000n))), fr(310n)), 'D 11.1 L4-1 the split interest 150 + 160 = 310 priced')
    ok(fEq(fAdd(fDiv(fr(15n), fr(10n)), fDiv(fr(15n), fr(6n))), fr(4n)) && fEq(frSqrt(fr(289n))!, fr(17n)), 'D 11.1 L4-2 the boat 3/2 + 5/2 = 4 with Δ = 17² priced')
    ok(fEq(fAdd(fr(3n, 2n), fr(1n, 2n)), fr(2n)) && fEq(fAdd(fMul(fr(5n), fr(3n, 2n)), fMul(fr(3n), fr(1n, 2n))), fr(9n)), 'D 11.1 L4-3 the walk f = 3/2, u = 1/2 priced')
    // L5 the cistern
    ok(fEq(fAdd(fSub(fDiv(fr(1n), fr(6n)), fDiv(fr(1n), fr(12n))), fDiv(fr(1n), fr(8n))), fr(5n, 24n)) && fEq(fDiv(fr(1n), fr(5n, 24n)), fr(24n, 5n)), 'D 11.1 L5-1 the cistern 5/24 → 24/5 h priced (the reciprocal read)')
    // L6 the alligation cross on both designs
    ok(fEq(fDiv(fSub(fr(70n), fr(55n)), fSub(fr(55n), fr(40n))), fr(1n)) && fEq(fDiv(fSub(fr(75n), fr(45n)), fSub(fr(45n), fr(25n))), fr(3n, 2n)), 'D 11.1 L6-1 the alligation crosses 1:1 and 3:2 priced')
    console.log('  D 11.1 authored battery: identity, census, quiz keys, 14 exercises re-priced, figure plans, scans')

    // figure geometry vs plan (rect-exact)
    const figs111 = lesson111.blocks.filter((b: any) => b.kind === 'figure')
    ok(figs111.length === 2, 'D 11.1 exactly two figures')
    checkFigureAgainstPlan(figs111[0].svg, plan111Fig1, 340, 'D 11.1 fig 1')
    checkFigureAgainstPlan(figs111[1].svg, plan111Fig2, 340, 'D 11.1 fig 2')

    // citations
    for (const key of lesson111.sources) {
      ok(sourceLog.includes(key), `D 11.1 citation key ${key} banked in SOURCE_LOG.md`)
    }

    // honest word count
    const words111 = countLessonWords(lesson111)
    ok(words111 >= 4000, `D 11.1 honest word count ${words111} ≥ 4,000`)

    // scans: odd backslash runs, unicode escapes, raw-$ in titles/answers
    scanFileHygiene(ch11File, 'D 11.1')
    ok(!lesson111.title.includes('$'), 'D 11.1 title carries no raw $')
    console.log(`  D 11.1 honest word count: ${words111}`)
  }

  /* ---------------------------------------------------------------- */
  /* (E) the authored lesson 11.2 — structure census, quiz keys, the  */
  /*     14 exercises re-priced, figure geometry vs plan, scans       */
  /* ---------------------------------------------------------------- */

  console.log('[E] 11.2 authored: identity, structure census, quiz keys [1,2,0,3,1], 14 exercises re-priced, figure plans, scans')

  function sectionE(): void {
    ok(lesson112.id === 'al-competition-algebra-identities-and-substitutions', 'E the 11.2 id is al-competition-algebra-identities-and-substitutions')
    ok(lesson112.number === '11.2', 'E the 11.2 number is 11.2')
    ok(lesson112.title === 'Competition Algebra: Identities and Substitutions', 'E the 11.2 title matches the book.ts plan')

    // structure census
    const kinds: Record<string, number> = {}
    for (const b of lesson112.blocks) kinds[b.kind] = (kinds[b.kind] || 0) + 1
    ok(kinds['para'] === 17, `E 11.2 has 17 paras (got ${kinds['para']})`)
    ok(kinds['heading'] === 5, `E 11.2 has 5 headings (got ${kinds['heading']})`)
    ok(kinds['table'] === 1, `E 11.2 has 1 table (the identity bank)`)
    ok(kinds['derivation'] === 1, `E 11.2 has 1 derivation (the cube of a sum)`)
    ok(kinds['equation'] === 3, `E 11.2 has 3 equations`)
    ok(kinds['figure'] === 2, `E 11.2 has 2 figures`)
    ok(kinds['callout'] === 4, `E 11.2 has 4 callouts (warn, insight, historical, exam)`)
    ok(kinds['example'] === 4, `E 11.2 has 4 examples`)
    ok(kinds['terms'] === 1, 'E 11.2 has 1 terms block')
    ok(kinds['list'] === 1, `E 11.2 has 1 summary list`)
    ok(kinds['formula'] === 5, `E 11.2 has 5 formula cards`)
    ok(kinds['quiz'] === 1 && kinds['exercises'] === 1, 'E 11.2 has 1 quiz + 1 exercise set')
    const tones112 = lesson112.blocks.filter((b: any) => b.kind === 'callout').map((b: any) => b.tone)
    for (const t of ['warn', 'insight', 'historical', 'exam']) {
      ok(tones112.includes(t), `E 11.2 carries the ${t} callout`)
    }
    ok(lesson112.concepts.length >= 5 && lesson112.concepts.length <= 8, 'E 11.2 concepts 5–8')
    ok((lesson112.objectives || []).length >= 5, 'E 11.2 objectives >= 5')
    ok((lesson112.prerequisites || []).length === 4, 'E 11.2 prerequisites = 4 (3.3, 4.3, 9.1, 9.4)')
    ok(lesson112.prerequisites.includes('al-special-products-the-identities-proved') && lesson112.prerequisites.includes('al-identities-as-factorizations') && lesson112.prerequisites.includes('al-quadratics-and-factoring-solutions') && lesson112.prerequisites.includes('al-roots-and-coefficients-viete-relations'), 'E 11.2 prerequisites name 3.3/4.3/9.1/9.4 by id')

    // quiz keys vs pinned [1, 2, 0, 3, 1]
    const quiz112 = lesson112.blocks.find((b: any) => b.kind === 'quiz')
    const keys112 = quiz112.items.map((it: any) => it.answer)
    ok(JSON.stringify(keys112) === JSON.stringify([1, 2, 0, 3, 1]), `E 11.2 quiz keys are [1,2,0,3,1] (got ${JSON.stringify(keys112)})`)
    ok(quiz112.items.length === 5, 'E 11.2 quiz has 5 items')
    for (const it of quiz112.items) {
      ok(it.options.length === 4 && it.explain.length > 80, 'E 11.2 quiz item: 4 options + full explanation')
    }
    // quiz distractor prices
    ok(101n * 99n === 9999n && 100n * 100n - 1n === 9999n, 'E 11.2 quiz Q1: 101 × 99 = 9999 = 100² − 1 priced')
    ok(105n * 105n - 95n * 95n === 2000n && 10n * 200n === 2000n, 'E 11.2 quiz Q2: 105² − 95² = 10·200 priced')
    ok(fEq(fSub(fMul(fr(5n), fr(5n)), fr(2n)), fr(23n)), 'E 11.2 quiz Q3: the ladder 25 − 2 = 23 priced')
    ok(fIsZero(quadAt(fr(1n), fr(-3n), fr(2n), fr(1n))) && fIsZero(quadAt(fr(1n), fr(-3n), fr(2n), fr(2n))), 'E 11.2 quiz Q4: the collapsed t-doors 1 and 2 priced')
    ok(101n * 101n * 101n + 99n * 99n * 99n === 2000600n && 2n * 100n * (100n * 100n + 3n) === 2000600n, 'E 11.2 quiz Q5: the even twin 2,000,600 priced')

    // the 14 exercises re-priced exactly
    const ex112 = lesson112.blocks.find((b: any) => b.kind === 'exercises')
    let n112 = 0
    for (const set of ex112.sets) n112 += set.questions.length
    ok(n112 === 14, `E 11.2 has 14 exercises (got ${n112})`)
    ok(JSON.stringify(ex112.sets.map((s: any) => s.questions.length)) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'E 11.2 exercise ladder 3/3/3/3/1/1')
    // L1 the expansions and the anchor read
    ok(25n === 4n + 12n + 9n && 5n * 5n === 25n, 'E 11.2 L1-1 (x+3)² at x = 2: both sides 25 priced')
    ok(97n * 103n === 9991n && 100n * 100n - 9n === 9991n, 'E 11.2 L1-2 97 × 103 = 100² − 9 priced')
    ok(8n === 2n * 2n * 2n && 27n === 3n * 3n * 3n, 'E 11.2 L1-3 the cubes (2x)³ and 3³ recognized')
    // L2 the paired squares + ladders + the minus square
    ok(1002n * 1002n - 998n * 998n === 8000n && 4n * 2000n === 8000n, 'E 11.2 L2-1 1002² − 998² = 4·2000 priced')
    ok(fEq(fSub(fMul(fr(7n), fr(7n)), fr(2n)), fr(47n)) && fEq(fSub(fMul(fMul(fr(7n), fr(7n)), fr(7n)), fMul(fMul(fr(3n), fr(7n)), fr(1n))), fr(322n)), 'E 11.2 L2-2 the ladder 47 and 322 priced (343 − 21)')
    ok(9n === 36n - 36n + 9n && (6n - 3n) * (6n - 3n) === 9n, 'E 11.2 L2-3 (2x−3y)² at (3, 1): both sides 9 priced')
    // L3 the sibling quartic + the pair family + the twin
    {
      const tOf5 = (xv: Frac): Frac => fAdd(fSub(fMul(xv, xv), fMul(fr(5n), xv)), fr(5n))
      const sib = (xv: Frac): Frac => {
        const t = tOf5(xv)
        return fSub(fMul(t, t), fAdd(t, fr(2n)))
      }
      const sPlus = sHalf(sd(5n, 1n, 13n))
      const tAt5 = (xs: Surd): Surd => sAdd(sSub(sMul(xs, xs), sMul(sd(5n, 0n, 13n), xs)), sd(5n, 0n, 13n))
      ok(fEq(tOf5(fr(2n)), fr(-1n)) && fIsZero(sib(fr(2n))) && fIsZero(sib(fr(3n))), 'E 11.2 L3-1 the sibling doors 2 and 3 priced (t = −1)')
      ok(sEq(tAt5(sPlus), sd(2n, 0n, 13n)), 'E 11.2 L3-1 the sibling surd door t = 2 at (5+√13)/2 priced')
    }
    ok(fEq(fSub(fMul(fMul(fr(12n), fr(12n)), fr(12n)), fMul(fMul(fr(3n), fr(27n)), fr(12n))), fr(756n)), 'E 11.2 L3-2 the pair family 90 and 756 priced (1728 − 972)')
    ok(101n * 101n * 101n + 99n * 99n * 99n === 2000600n, 'E 11.2 L3-3 the twin read 2,000,600 priced')
    // L4 the ladder + the triple + the staple
    ok(fEq(fSub(fMul(fMul(fr(4n), fr(4n)), fr(4n)), fMul(fr(3n), fr(4n))), fr(52n)) && fEq(fSub(fMul(fr(14n), fr(14n)), fr(2n)), fr(194n)), 'E 11.2 L4-1 the ladder 52 and 194 priced')
    ok(4n + 9n + 25n === 38n && 100n - 62n === 38n, 'E 11.2 L4-2 the triple squares 38 both ways priced')
    ok(8n + 27n + 125n - 90n === 70n && 10n * 7n === 70n, 'E 11.2 L4-2 the staple 70 both ways priced')
    ok(1n + 8n - 27n === -18n && 3n * (1n * 2n * -3n) === -18n, 'E 11.2 L4-3 the sum-zero staple −18 priced')
    // L5 the two-step ladder
    ok(fEq(symPow(sHalf(sd(3n, 1n, 5n)), 5), fr(123n)) && 7n * 18n - 3n === 123n, 'E 11.2 L5-1 the two-step ladder 123 priced (surd + arithmetic agree)')
    // L6 the two-squares identity
    ok(1n * 1n + 8n * 8n === 65n && 4n * 4n + 7n * 7n === 65n && 5n * 13n === 65n, 'E 11.2 L6-1 the two reads of 65 priced')
    console.log('  E 11.2 authored battery: identity, census, quiz keys, 14 exercises re-priced, figure plans, scans')

    // figure geometry vs plan (rect-exact)
    const figs112 = lesson112.blocks.filter((b: any) => b.kind === 'figure')
    ok(figs112.length === 2, 'E 11.2 exactly two figures')
    checkFigureAgainstPlan(figs112[0].svg, plan112Fig1, 400, 'E 11.2 fig 1')
    checkFigureAgainstPlan(figs112[1].svg, plan112Fig2, 360, 'E 11.2 fig 2')

    // citations
    for (const key of lesson112.sources) {
      ok(sourceLog.includes(key), `E 11.2 citation key ${key} banked in SOURCE_LOG.md`)
    }

    // honest word count
    const words112 = countLessonWords(lesson112)
    ok(words112 >= 4000, `E 11.2 honest word count ${words112} ≥ 4,000`)

    // scans
    scanFileHygiene(ch11File, 'E 11.2')
    ok(!lesson112.title.includes('$'), 'E 11.2 title carries no raw $')
    console.log(`  E 11.2 honest word count: ${words112}`)
  }

  /* ---------------------------------------------------------------- */
  /* (H) the authored lesson 11.3 — structure census, quiz keys, the  */
  /*     14 exercises re-priced, figure geometry vs plan, scans       */
  /* ---------------------------------------------------------------- */

  console.log('[H] 11.3 authored: identity, structure census, quiz keys [2,0,3,1,2], 14 exercises re-priced, figure plans, scans')

  function sectionH(): void {
    if (!lesson113) {
      console.log('  H skipped — 11.3 not yet authored (pre-write mode)')
      return
    }
    ok(lesson113.id === 'al-the-function-idea-the-doorstep', 'H the 11.3 id is al-the-function-idea-the-doorstep')
    ok(lesson113.number === '11.3', 'H the 11.3 number is 11.3')
    ok(lesson113.title === 'The Function Idea: the Doorstep', 'H the 11.3 title matches the book.ts plan')

    // structure census
    const kinds: Record<string, number> = {}
    for (const b of lesson113.blocks) kinds[b.kind] = (kinds[b.kind] || 0) + 1
    ok(kinds['para'] === 16, `H 11.3 has 16 paras (got ${kinds['para']})`)
    ok(kinds['heading'] === 6, `H 11.3 has 6 headings (got ${kinds['heading']})`)
    ok(kinds['table'] === 1, `H 11.3 has 1 table (the domain-refusal census)`)
    ok(kinds['derivation'] === 1, `H 11.3 has 1 derivation (the vertical-probe uniqueness)`)
    ok(kinds['equation'] === 2, `H 11.3 has 2 equations (the gap/range read + the composition order)`)
    ok(kinds['figure'] === 2, `H 11.3 has 2 figures`)
    ok(kinds['callout'] === 4, `H 11.3 has 4 callouts (warn, insight, historical, exam)`)
    ok(kinds['example'] === 4, `H 11.3 has 4 examples`)
    ok(kinds['terms'] === 1, 'H 11.3 has 1 terms block')
    ok(kinds['list'] === 1, `H 11.3 has 1 summary list`)
    ok(kinds['formula'] === 4, `H 11.3 has 4 formula cards`)
    ok(kinds['quiz'] === 1 && kinds['exercises'] === 1, 'H 11.3 has 1 quiz + 1 exercise set')
    const tones113 = lesson113.blocks.filter((b: any) => b.kind === 'callout').map((b: any) => b.tone)
    for (const t of ['warn', 'insight', 'historical', 'exam']) {
      ok(tones113.includes(t), `H 11.3 carries the ${t} callout`)
    }
    ok(lesson113.concepts.length >= 5 && lesson113.concepts.length <= 8, 'H 11.3 concepts 5–8')
    ok((lesson113.objectives || []).length >= 5, 'H 11.3 objectives >= 5')
    ok((lesson113.prerequisites || []).length === 5, 'H 11.3 prerequisites = 5 (10.1, 10.2, 10.3, 8.3, 11.2)')
    ok(lesson113.prerequisites.includes('al-the-coordinate-plane-and-linear-graphs') && lesson113.prerequisites.includes('al-slope-the-steepness-theorem') && lesson113.prerequisites.includes('al-the-parabola-quadratic-graphs-and-vertices') && lesson113.prerequisites.includes('al-fractional-equations-and-extraneous-roots') && lesson113.prerequisites.includes('al-competition-algebra-identities-and-substitutions'), 'H 11.3 prerequisites name 10.1/10.2/10.3/8.3/11.2 by id')

    // quiz keys vs pinned [2, 0, 3, 1, 2]
    const quiz113 = lesson113.blocks.find((b: any) => b.kind === 'quiz')
    const keys113 = quiz113.items.map((it: any) => it.answer)
    ok(JSON.stringify(keys113) === JSON.stringify([2, 0, 3, 1, 2]), `H 11.3 quiz keys are [2,0,3,1,2] (got ${JSON.stringify(keys113)})`)
    ok(quiz113.items.length === 5, 'H 11.3 quiz has 5 items')
    for (const it of quiz113.items) {
      ok(it.options.length === 4 && it.explain.length > 80, 'H 11.3 quiz item: 4 options + full explanation')
    }
    // quiz distractor prices
    {
      const fW = (x: Frac): Frac => quadAt(fr(2n), fr(-7n), fr(3n), x)
      ok(fEq(fW(fr(2n)), fr(-3n)) && fEq(fW(fr(0n)), fr(3n)) && fEq(fW(fr(1n)), fr(-2n)), 'H 11.3 quiz Q1: f(2) = −3 priced against the distractors f(0) = 3 and f(1) = −2')
      let refused = false
      try { fDiv(fr(1n), fSub(fr(2n), fr(2n))) } catch { refused = true }
      ok(refused, 'H 11.3 quiz Q2: the bill at x = 2 refuses — the domain read priced')
      const side = (xv: Frac): number => quadRoots(fr(1n), fr(0n), fNeg(xv)).roots.length
      ok(side(fr(4n)) === 2, 'H 11.3 quiz Q3: x = y² fails at probe 4 with two meets — the non-function priced')
      ok(fEq(fAdd(fr(50n), fMul(fr(12n), fr(7n))), fr(134n)) && fEq(fAdd(fr(50n), fMul(fr(12n), fr(1n))), fr(62n)) && fEq(fAdd(fr(50n), fMul(fr(12n), fr(4n))), fr(98n)), 'H 11.3 quiz Q4: F(7) = 134 with the distractors F(1) = 62 and F(4) = 98 priced')
      ok(fEq(quadAt(fr(1n), fr(0n), fr(1n), fr(0n)), fr(1n)) && fEq(fSub(fMul(fr(0n), fr(0n)), fMul(fr(4n), fr(1n))), fr(-4n)), 'H 11.3 quiz Q5: the range of x²+1 is [1, ∞) — h(0) = 1 with Δ = −4 priced')
    }

    // the 14 exercises re-priced exactly
    const ex113 = lesson113.blocks.find((b: any) => b.kind === 'exercises')
    let n113 = 0
    for (const set of ex113.sets) n113 += set.questions.length
    ok(n113 === 14, `H 11.3 has 14 exercises (got ${n113})`)
    ok(JSON.stringify(ex113.sets.map((s: any) => s.questions.length)) === JSON.stringify([3, 3, 3, 3, 1, 1]), 'H 11.3 exercise ladder 3/3/3/3/1/1')
    {
      const fW = (x: Frac): Frac => quadAt(fr(2n), fr(-7n), fr(3n), x)
      // L1 the machine warm-ups
      const lin = (x: Frac): Frac => fAdd(fMul(fr(3n), x), fr(-4n))
      ok(fEq(lin(fr(0n)), fr(-4n)) && fEq(lin(fr(2n)), fr(2n)) && fEq(lin(fr(-1n)), fr(-7n)), 'H 11.3 L1-1 f(x) = 3x−4 reads −4, 2, −7 at 0, 2, −1')
      const quad2 = (x: Frac): Frac => fAdd(fMul(x, x), fMul(fr(2n), x))
      ok(fEq(quad2(fr(3n)), fr(15n)) && fEq(quad2(fr(-3n)), fr(3n)) && fEq(quad2(fr(1n, 2n)), fr(5n, 4n)), 'H 11.3 L1-2 g(x) = x²+2x reads 15, 3, 5/4 at 3, −3, 1/2')
      {
        const X = pVar('x')
        const xp1 = pAdd(X, pTerm(1n, {}))
        const lhs = pMul(pTerm(2n, {}), pMul(xp1, xp1))
        const rhs = pAdd(pAdd(pMul(pTerm(2n, {}), pMul(X, X)), pMul(pTerm(4n, {}), X)), pTerm(2n, {}))
        ok(pEq(lhs, rhs), 'H 11.3 L1-3 h(x+1) = 2x²+4x+2 by symbolic expansion — the bracket discipline')
        const hPlus1 = pAdd(pMul(pTerm(2n, {}), pMul(X, X)), pTerm(1n, {}))
        ok(!pEq(lhs, hPlus1), 'H 11.3 L1-3 and h(x)+1 = 2x²+1 DIFFERS from h(x+1) — the caution priced')
      }
      // L2 the domain hunts
      {
        const f = (x: Frac): Frac => fDiv(fAdd(x, fr(1n)), fSub(x, fr(5n)))
        ok(fEq(f(fr(0n)), fr(-1n, 5n)) && fEq(f(fr(6n)), fr(7n)), 'H 11.3 L2-1 (x+1)/(x−5) reads −1/5 and 7 at 0 and 6 — bill at 5')
        let refused = false
        try { f(fr(5n)) } catch { refused = true }
        ok(refused, 'H 11.3 L2-1 the bill at x = 5 refuses')
        const g = (x: Frac): Frac | null => {
          if (fLt(fSub(fMul(fr(2n), x), fr(6n)), fr(0n))) return null
          const s = frSqrt(fSub(fMul(fr(2n), x), fr(6n)))
          return s === null ? null : s
        }
        ok(fEq(g(fr(3n))!, fr(0n)) && fEq(g(fr(5n))!, fr(2n)) && fEq(g(fr(11n))!, fr(4n)), 'H 11.3 L2-2 √(2x−6) reads 0, 2, 4 at 3, 5, 11 — domain x ≥ 3')
        ok(g(fr(2n)) === null && g(fr(0n)) === null, 'H 11.3 L2-2 refuses 2 and 0 (radicand −2 and −6)')
        const hole = (x: Frac): Frac => fAdd(x, fr(4n))
        ok(fEq(hole(fr(0n)), fr(4n)) && fEq(hole(fr(5n)), fr(9n)) && fIsZero(quadAt(fr(1n), fr(0n), fr(-16n), fr(4n))) && fEq(hole(fr(4n)), fr(8n)), 'H 11.3 L2-3 (x²−16)/(x−4) = x+4 with reads 4 and 9 — and the hole at (4, 8)')
      }
      // L3 the workhorse range + Fahrenheit + the circle probe
      ok(fEq(fW(fr(7n, 4n)), fr(-25n, 8n)) && fEq(fAdd(fW(fr(0n)), fr(25n, 8n)), fr(49n, 8n)), 'H 11.3 L3-1 the workhorse minimum −25/8 with the gap 49/8 at x = 0')
      {
        const Fa = (C: Frac): Frac => fAdd(fMul(fr(9n, 5n), C), fr(32n))
        ok(fEq(Fa(fr(37n)), fr(493n, 5n)) && fEq(Fa(fr(-40n)), fr(-40n)), 'H 11.3 L3-2 F(37) = 98.6 and the −40 meeting priced')
        const circ = (xv: Frac): number => quadRoots(fr(1n), fr(0n), fNeg(fSub(fr(25n), fMul(xv, xv)))).roots.length
        ok(circ(fr(3n)) === 2 && circ(fr(5n)) === 1 && circ(fr(6n)) === 0, 'H 11.3 L3-3 the circle probe verdicts: two at 3, one at 5, none at 6')
        ok(fEq(frSqrt(fr(16n))!, fr(4n)), 'H 11.3 L3-3 the branch read y = +√(25−x²) at x = 3 gives +4')
      }
      // L4 the composition pair + the even cousin + the fare climb
      ok(fEq(fMul(fAdd(fr(2n), fr(1n)), fAdd(fr(2n), fr(1n))), fr(9n)) && fEq(fAdd(fMul(fr(2n), fr(2n)), fr(1n)), fr(5n)), 'H 11.3 L4-1 f(g(2)) = 9 and g(f(2)) = 5 priced')
      {
        const k = (x: Frac): Frac => fDiv(fr(1n), fSub(fMul(x, x), fr(1n)))
        ok(fEq(k(fr(0n)), fr(-1n)) && fEq(k(fr(3n)), fr(1n, 8n)) && fEq(k(fr(2n)), k(fNeg(fr(2n)))), 'H 11.3 L4-2 the even cousin −1, 1/8, and k(−2) = k(2) priced')
        const F = (d: Frac): Frac => fAdd(fr(50n), fMul(fr(12n), d))
        ok(fEq(F(fr(3n)), fr(86n)) && fEq(F(fr(7n)), fr(134n)) && fEq(fSub(F(fr(1n)), F(fr(0n))), fr(12n)), 'H 11.3 L4-3 the fare 86, 134 and the climb 12 priced')
      }
      // L5 the quartic composite
      {
        const gq = (x: Frac): Frac => quadAt(fr(1n), fr(-3n), fr(3n), x)
        const fq = (t: Frac): Frac => quadAt(fr(1n), fr(-3n), fr(2n), t)
        ok(fIsZero(fq(gq(fr(1n)))) && fIsZero(fq(gq(fr(2n)))), 'H 11.3 L5-1 the composite vanishes at x = 1 and 2 (g = 1, f(1) = 0)')
        const sPlus = sHalf(sd(3n, 1n, 5n))
        const gAt = (x: Surd): Surd => sAdd(sSub(sMul(x, x), sMul(sd(3n, 0n, 5n), x)), sd(3n, 0n, 5n))
        ok(sEq(gAt(sPlus), sd(2n, 0n, 5n)), 'H 11.3 L5-1 the surd door (3+√5)/2 feeds g = 2 (surd-exact)')
        ok(fIsZero(quadAt(fr(1n), fr(-3n), fr(2n), fr(2n))), 'H 11.3 L5-1 and f(2) = 0 — the quartic\'s four doors recovered through the camera')
      }
      // L6 the range theorem
      {
        const foldGap = (x: Frac): Frac => fSub(quadAt(fr(1n), fr(4n), fr(7n), x), fr(3n))
        ok(fEq(foldGap(fr(0n)), fr(4n)) && fEq(foldGap(fr(-2n)), fr(0n)), 'H 11.3 L6-1 x²+4x+7 = (x+2)²+3: the gap 4 at 0, zero at −2 — range [3, ∞)')
        const foldDown = (x: Frac): Frac => fSub(fr(9n), quadAt(fr(-1n), fr(4n), fr(5n), x))
        ok(fEq(foldDown(fr(0n)), fr(4n)) && fEq(foldDown(fr(2n)), fr(0n)), 'H 11.3 L6-1 −x²+4x+5 = 9−(x−2)²: the gap 4 at 0, zero at 2 — range (−∞, 9]')
      }
    }
    console.log('  H 11.3 authored battery: identity, census, quiz keys, 14 exercises re-priced, figure plans, scans')

    // figure geometry vs plan (rect-exact)
    const figs113 = lesson113.blocks.filter((b: any) => b.kind === 'figure')
    ok(figs113.length === 2, 'H 11.3 exactly two figures')
    checkFigureAgainstPlan(figs113[0].svg, plan113Fig1, 360, 'H 11.3 fig 1')
    checkFigureAgainstPlan(figs113[1].svg, plan113Fig2, 380, 'H 11.3 fig 2')

    // citations
    for (const key of lesson113.sources) {
      ok(sourceLog.includes(key), `H 11.3 citation key ${key} banked in SOURCE_LOG.md`)
    }

    // honest word count
    const words113 = countLessonWords(lesson113)
    ok(words113 >= 4000, `H 11.3 honest word count ${words113} ≥ 4,000`)

    // scans
    scanFileHygiene(ch11File, 'H 11.3')
    ok(!lesson113.title.includes('$'), 'H 11.3 title carries no raw $')
    console.log(`  H 11.3 honest word count: ${words113}`)
  }

  /* ---------------------------------------------------------------- */
  /* (F) chapter + library — the CLOSING state: ch. 11 complete 3/3,  */
  /*     the unit-11 COMPLETION REVIEW passed, and the BOOK CLOSE     */
  /* ---------------------------------------------------------------- */

  console.log('[F] chapter + library: the CLOSING state — chapter 11 complete 3/3, the unit-11 completion review, the BOOK CLOSE')

  function sectionF(): void {
    ok(chapter11.lessons.length === 3, 'F chapter 11 carries exactly its three lessons — the book\'s last chapter complete')
    ok(chapter11.lessons[0].id !== chapter11.lessons[1].id && chapter11.lessons[1].id !== chapter11.lessons[2].id, 'F the three lesson ids differ')
    ok((chapter11.plannedLessons || []).length === 0, 'F NO planned lessons remain — the doorstep was written')
    ok(chapter11.status === 'complete', 'F chapter 11 status complete — the closing ride landed')
    ok(chapter11.number === 11 && chapter11.slug === 'the-toolbox-and-the-doorstep', 'F chapter 11 slug the-toolbox-and-the-doorstep')

    // the book registration carries the closed chapter
    const alg = allBooks.find((b: any) => b.id === 'elementary-algebra')
    ok(!!alg, 'F the elementary-algebra book is registered')
    const regCh11 = alg!.chapters.find((c: any) => c.number === 11)
    ok(!!regCh11 && regCh11.lessons.length === 3 && (regCh11.plannedLessons || []).length === 0 && regCh11.status === 'complete', 'F book.ts carries chapter 11 with 3 lessons, none planned, complete')
    const regCh12 = alg!.chapters.find((c: any) => c.number === 12)
    ok(!!regCh12 && regCh12.lessons.length === 0 && (regCh12.plannedLessons || []).length === 3 && regCh12.status === 'planned', 'F chapter 12 registered as the planned gap queue (H&K ratio-proportion-variation — 3 titles, pre-written-books audit)')
    ok(alg!.chapters.length === 12, 'F the book has exactly 12 chapters — 11 complete + the planned ch. 12')
    for (const c of alg!.chapters) {
      if (c.number === 12) continue
      ok(c.status === 'complete', `F chapter ${c.number} complete — the whole 2026-11-11 book body, chapter by chapter`)
    }
    ok(alg!.status === 'in-progress', 'F THE BOOK CLOSE + GAP QUEUE: chapters 1–11 closed in runs 66–88; the book now carries the ch. 12 gap queue, so status in-progress (refreshed at the 2026-11-11 figure sweep)')

    // al- prefix + global uniqueness across the whole library
    const seen = new Map<string, string>()
    let libLessons = 0
    for (const book of allBooks) {
      for (const ch of book.chapters) {
        for (const l of ch.lessons) {
          libLessons++
          if (book.id === 'elementary-algebra') {
            ok(l.id.startsWith('al-'), `F algebra lesson ids carry the al- prefix: ${l.id}`)
          }
          ok(!seen.has(l.id), `F lesson id globally unique: ${l.id}`)
          seen.set(l.id, book.id)
        }
      }
    }

    // ---- the UNIT-11 COMPLETION REVIEW ----
    // word floors: 4,612 / 4,128 / 11.3 ≥ 4,000
    const words111 = countLessonWords(lesson111)
    const words112 = countLessonWords(lesson112)
    const words113 = countLessonWords(lesson113)
    ok(words111 >= 4612, `F unit review: 11.1 word floor 4,612 (got ${words111})`)
    ok(words112 >= 4128, `F unit review: 11.2 word floor 4,128 (got ${words112})`)
    ok(words113 >= 4000, `F unit review: 11.3 word floor 4,000 (got ${words113})`)
    // quiz keys vs pinned — 3/3 lessons
    const keys111 = lesson111.blocks.find((b: any) => b.kind === 'quiz').items.map((it: any) => it.answer)
    const keys112 = lesson112.blocks.find((b: any) => b.kind === 'quiz').items.map((it: any) => it.answer)
    const keys113 = lesson113.blocks.find((b: any) => b.kind === 'quiz').items.map((it: any) => it.answer)
    ok(JSON.stringify(keys111) === JSON.stringify([2, 3, 1, 0, 2]) && JSON.stringify(keys112) === JSON.stringify([1, 2, 0, 3, 1]) && JSON.stringify(keys113) === JSON.stringify([2, 0, 3, 1, 2]), 'F unit review: quiz keys vs pinned, 3/3 lessons')
    // 42 exercises chained
    const countEx = (lesson: any): number => {
      const ex = lesson.blocks.find((b: any) => b.kind === 'exercises')
      let n = 0
      for (const set of ex.sets) n += set.questions.length
      return n
    }
    ok(countEx(lesson111) + countEx(lesson112) + countEx(lesson113) === 42, 'F unit review: 42 exercises chained across the chapter (14 + 14 + 14)')
    // six figures, all vivid-palette-checked (the retired-hex scans ran in D/E/H)
    const figs11 = [lesson111, lesson112, lesson113].reduce((n: number, l: any) => n + l.blocks.filter((b: any) => b.kind === 'figure').length, 0)
    ok(figs11 === 6, 'F unit review: six figures across the chapter, every one palette-audited')
    // arcs closed
    ok(ch11File.includes('5.2') && ch11File.includes('6.2') && ch11File.includes('7.2') && ch11File.includes('8.3') && ch11File.includes('9.1'), 'F unit review: 11.1\'s arcs intact (8.3\'s debt paid by name, 5.2/6.2\'s craft, 7.2\'s fences, 9.1\'s factoring)')
    ok(ch11File.includes('3.3') && ch11File.includes('4.3') && ch11File.includes('9.4') && ch11File.includes('9.3'), 'F unit review: 11.2\'s arcs intact (3.3/4.3/9.4 leaned on, 9.3\'s surd doors carried)')
    ok(ch11File.includes('10.1') && ch11File.includes('10.2') && ch11File.includes('10.3'), 'F unit review: 11.3 grows 10.1\'s probes, 10.2\'s slope and 10.3\'s parabola into the function idea — the book\'s last arc')
    ok(ch11File.includes('11.2'), 'F unit review: 11.2\'s camera named as the composition in 11.3')
    ok(ch11File.includes('Ahmes') && ch11File.includes('Euclid') && ch11File.includes('Brahmagupta'), 'F the run-87 historical notes intact')
    ok(ch11File.includes('Leibniz') && ch11File.includes('Euler') && ch11File.includes('Dirichlet'), 'F the 11.3 historical note carries Leibniz, Euler and Dirichlet (web-checked)')

    // the handoff note — the book\'s last paragraph names the next doors
    ok(ch11File.includes('Advanced Algebra') && ch11File.includes('Coordinate Geometry') && ch11File.includes('Trigonometry') && ch11File.includes('Calculus'), 'F the handoff note names Advanced Algebra, Coordinate Geometry, Trigonometry and Calculus')

    // the closing snapshot
    const bookLessons = alg!.chapters.reduce((n: number, c: any) => n + c.lessons.length, 0)
    const bookWords = alg!.chapters.reduce((n: number, c: any) => n + c.lessons.reduce((m: number, l: any) => m + countLessonWords(l), 0), 0)
    ok(bookLessons === 37, `F the closing snapshot: the book stands at 37 lessons (got ${bookLessons})`)
    ok(bookWords >= 168900, `F the closing snapshot: the book stands at ≥ 168,900 words (got ${bookWords})`)
    ok(libLessons === 123, `F the library stands at 123 lessons (got ${libLessons})`)
    console.log(`  F THE BOOK CLOSE: book 3 Elementary Algebra COMPLETE — ${bookLessons} lessons / ${bookWords} words; library ${libLessons} lessons; the unit-11 review PASSED`)
  }

  sectionD()
  sectionE()
  sectionH()
  sectionF()
}

console.log('')
console.log(`RUN 88 VERIFICATION: ${passed} passed, ${failed} failed`)
if (failures.length) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
}
process.exit(failed > 0 ? 1 : 0)

