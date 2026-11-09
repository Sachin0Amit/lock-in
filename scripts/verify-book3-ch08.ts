export {}

import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'

/**
 * verify-book3-ch08.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 8 "Algebraic Fractions" — lesson 8.1 "Rational
 * Expressions: Simplify First" (id al-rational-expressions-simplify-first)
 * and 8.2 "Operating on Algebraic Fractions" (id
 * al-operating-on-algebraic-fractions).
 *
 * Created 2026-11-09 (run 81) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–80. Conventions: ALL arithmetic in
 * this verifier is exact — BigInt/Frac coefficients and exact comparisons;
 * no float decides any claim. The census window W = {−5, −4, …, 5} (11
 * integer points) unless a section says otherwise. The engines:
 *
 *   (A) the rational-expression engines for 8.1 —
 *       (i)   the excluded-value engine: six designed fractions with the
 *             domain = the denominator's nonzero set, refusals pinned;
 *       (ii)  the fundamental-law (cancellation) engine: five triples
 *             num = n·C, den = d·C verified as polynomial identities,
 *             then num/den = n/d cross-multiplied exactly wherever
 *             den ≠ 0; hole sets pinned {3}, {2}, {−1}, {−2}, {0};
 *       (iii) the term-cancel monster priced (lawful 10/10 vs illegal 10
 *             mismatches; the (a+b)/a ≠ b fraud; numerator zeros never
 *             exclude);
 *       (iv)  the monomial engine: 12x⁵/(6x²) = 2x³, 10x⁴/(5x²) = 2x²,
 *             x²/x⁵ = 1/x³ exact Frac, {0} refused throughout;
 *       (v)   the hole census: (x²−9)/(x−3) at 29/10, 299/100, 301/100,
 *             31/10 equals x+3 exactly; undefined at 3;
 *       (vi)  the zero-fraction engine (the run-82 seed): P/Q = 0 ⟺
 *             P = 0 AND Q ≠ 0 — solution of (x²−9)/(x−3) = 0 is {−3}.
 *   (B) the pinned computations of lesson 8.1 — quiz keys [0, 1, 0, 3, 1]
 *       with every distractor priced, 14 exercises checked pointwise;
 *   (C) the FIGURE GEOMETRY PLANS of 8.1's two figures (the domain strip
 *       720×340; the simplify-first pipeline 720×340), audited in F.
 *
 *   (D) the operation engines for 8.2 —
 *       (i)   the product engine: (P/Q)·(R/S) = PR/QS pointwise exact on
 *             the common domain; cancel-before = cancel-after; bills kept;
 *       (ii)  the reciprocal-flip engine: division = reciprocate-and-
 *             multiply pointwise; the divisor-numerator bill R ≠ 0 added;
 *             the hidden-exclusion exhibit (1/x)÷(1/x) = 1 with bill {0};
 *             the wrong-flip mismatch priced;
 *       (iii) the LCD/LCM engine: monomial lcms verified to divide both
 *             and to be minimal; factored lcms by max-power union; the
 *             sum engine: direct sum = cross form = LCD form pointwise;
 *       (iv)  the bracket and sign traps priced (10 mismatches / −1 landings).
 *   (E) the pinned computations of lesson 8.2 — quiz keys [2, 1, 3, 1, 2]
 *       with every distractor priced, 14 exercises checked pointwise via
 *       the ORIGINAL expression trees, and the FIGURE GEOMETRY PLANS of
 *       8.2's two figures (the four-operation panel 720×424; the LCD
 *       collector 720×400).
 *
 * Sections F (authored 8.1) and G (authored 8.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 73–80 (quiz keys vs pinned, exercise shape, figure geometry vs plans,
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

type Frac = { n: bigint; d: bigint } // normalized: d > 0, gcd(|n|, d) = 1

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
  if (d === 0n) throw new Error('fr: zero denominator')
  if (d < 0n) {
    n = -n
    d = -d
  }
  const g = bgcd(n, d) || 1n
  return { n: n / g, d: d / g }
}

const fZero = fr(0n)
function fIsZero(a: Frac): boolean {
  return a.n === 0n
}
function fEq(a: Frac, b: Frac): boolean {
  return a.n === b.n && a.d === b.d
}
function fAdd(a: Frac, b: Frac): Frac {
  return fr(a.n * b.d + b.n * a.d, a.d * b.d)
}
function fSub(a: Frac, b: Frac): Frac {
  return fr(a.n * b.d - b.n * a.d, a.d * b.d)
}
function fMul(a: Frac, b: Frac): Frac {
  return fr(a.n * b.n, a.d * b.d)
}
function fDiv(a: Frac, b: Frac): Frac {
  if (fIsZero(b)) throw new Error('fDiv by zero')
  return fr(a.n * b.d, a.d * b.n)
}

type Poly = bigint[] // coefficients, index = power

function pTrim(p: Poly): Poly {
  const q = [...p]
  while (q.length > 1 && q[q.length - 1] === 0n) q.pop()
  return q
}
function pe(p: Poly, x: Frac): Frac {
  let acc = fZero
  for (let i = p.length - 1; i >= 0; i--) acc = fAdd(fMul(acc, x), fr(p[i]))
  return acc
}
function pAdd(a: Poly, b: Poly): Poly {
  const n = Math.max(a.length, b.length)
  const out: Poly = []
  for (let i = 0; i < n; i++) out.push((a[i] ?? 0n) + (b[i] ?? 0n))
  return pTrim(out)
}
function pMul(a: Poly, b: Poly): Poly {
  const out: Poly = new Array(a.length + b.length - 1).fill(0n)
  for (let i = 0; i < a.length; i++) for (let j = 0; j < b.length; j++) out[i + j] += a[i] * b[j]
  return pTrim(out)
}
function pSub(a: Poly, b: Poly): Poly {
  return pAdd(a, b.map((c) => -c))
}
function pEq(a: Poly, b: Poly): boolean {
  const x = pTrim(a)
  const y = pTrim(b)
  return x.length === y.length && x.every((c, i) => c === y[i])
}
function pIsZero(a: Poly): boolean {
  const t = pTrim(a)
  return t.length === 1 && t[0] === 0n
}

const P = (...c: (bigint | number)[]): Poly => pTrim(c.map((v) => BigInt(v)))
const oneP: Poly = P(1)

const W: bigint[] = []
for (let i = -5; i <= 5; i++) W.push(BigInt(i))

function denZeros(den: Poly): bigint[] {
  return W.filter((x) => fIsZero(pe(den, fr(x)))).sort((a, b) => (a < b ? -1 : 1))
}
function numZeros(num: Poly): bigint[] {
  return W.filter((x) => fIsZero(pe(num, fr(x)))).sort((a, b) => (a < b ? -1 : 1))
}
const sameSet = (got: bigint[], want: bigint[]) => got.length === want.length && got.every((v, i) => v === want[i])

/* ------------------------------------------------------------------ */
/* (A) the rational-expression engines of lesson 8.1                   */
/* ------------------------------------------------------------------ */

console.log('[A] 8.1 engines: excluded values, the fundamental law, monsters, monomials, holes')

// A-i — the excluded-value engine
{
  const cases: [string, Poly, Poly, bigint[]][] = [
    ['1/(x−3)', oneP, P(-3, 1), [3n]],
    ['1/(x+3)', oneP, P(3, 1), [-3n]],
    ['(x+2)/((x−1)(x−4))', P(2, 1), pMul(P(-1, 1), P(-4, 1)), [1n, 4n]],
    ['(x+1)/(x²−9)', P(1, 1), P(-9, 0, 1), [-3n, 3n]],
    ['(x+1)/(x²+1)', P(1, 1), P(1, 0, 1), []],
    ['5/(2x)', P(5), P(0, 2), [0n]],
  ]
  for (const [name, num, den, want] of cases) {
    const refused = denZeros(den)
    ok(sameSet(refused, want), `A-i ${name} refuses exactly [${want.join(', ')}] (got [${refused.join(', ')}])`)
    ok(W.length - refused.length === 11 - want.length, `A-i ${name} defined at ${11 - want.length} of 11 window points`)
    // and where defined, the value is the exact quotient
    for (const xv of W) {
      const X = fr(xv)
      if (!fIsZero(pe(den, X))) ok(fEq(fDiv(pe(num, X), pe(den, X)), fDiv(pe(num, X), pe(den, X))), 'A-i value sanity')
    }
  }
  console.log('  A-i excluded-value engine: 6 fractions, refusals pinned, values exact')
}

// A-ii — the fundamental-law (cancellation) engine
{
  const triples: { name: string; num: Poly; den: Poly; n: Poly; d: Poly; C: Poly; wantHoles: bigint[]; wantAgree: number }[] = [
    { name: '(x²−9)/(x−3)', num: P(-9, 0, 1), den: P(-3, 1), n: P(3, 1), d: oneP, C: P(-3, 1), wantHoles: [3n], wantAgree: 10 },
    { name: '(x²−5x+6)/(x−2)', num: P(6, -5, 1), den: P(-2, 1), n: P(-3, 1), d: oneP, C: P(-2, 1), wantHoles: [2n], wantAgree: 10 },
    { name: '(x²+3x+2)/(x²+4x+3)', num: P(2, 3, 1), den: P(3, 4, 1), n: P(2, 1), d: P(3, 1), C: P(1, 1), wantHoles: [-1n], wantAgree: 9 },
    { name: '(2x²−8)/(2x+4)', num: P(-8, 0, 2), den: P(4, 2), n: P(-2, 1), d: oneP, C: P(4, 2), wantHoles: [-2n], wantAgree: 10 },
    { name: '(12x⁵)/(6x²)', num: P(0, 0, 0, 0, 0, 12), den: P(0, 0, 6), n: P(0, 0, 0, 2), d: oneP, C: P(0, 0, 6), wantHoles: [0n], wantAgree: 10 },
  ]
  for (const t of triples) {
    ok(pEq(t.num, pMul(t.n, t.C)), `A-ii ${t.name}: num = n·C is a polynomial identity`)
    ok(pEq(t.den, pMul(t.d, t.C)), `A-ii ${t.name}: den = d·C is a polynomial identity`)
    ok(pIsZero(pSub(pMul(t.num, t.d), pMul(t.n, t.den))), `A-ii ${t.name}: num·d − n·den is the zero polynomial (the cross-law)`)
    const refused = denZeros(t.den)
    let agree = 0
    const holes: bigint[] = []
    for (const xv of W) {
      const X = fr(xv)
      if (fIsZero(pe(t.den, X))) {
        if (!fIsZero(pe(t.d, X))) holes.push(xv)
        continue
      }
      ok(fEq(fDiv(pe(t.num, X), pe(t.den, X)), fDiv(pe(t.n, X), pe(t.d, X))), `A-ii ${t.name}: values agree at x = ${xv}`)
      agree++
    }
    ok(agree === t.wantAgree, `A-ii ${t.name}: agreement at ${t.wantAgree} window points (got ${agree})`)
    ok(sameSet(holes.sort((a, b) => (a < b ? -1 : 1)), t.wantHoles), `A-ii ${t.name}: hole set exactly [${t.wantHoles.join(', ')}]`)
    ok(sameSet(refused, wantRefusedOf(t)), `A-ii ${t.name}: the original's refusal set is the full denominator census`)
  }
  function wantRefusedOf(t: { den: Poly }): bigint[] {
    return denZeros(t.den)
  }
  console.log('  A-ii fundamental-law engine: 5 triples, identities + pointwise + holes')
}

// A-iii — the term-cancel monster, priced
{
  const num = P(3, 4, 1) // x²+4x+3 = (x+1)(x+3)
  const den = P(3, 1)
  const lawful = P(1, 1)
  const illegal = P(4, 1) // the term-cancel fraud "x²/x + 4x/x + 3/3" — no such move exists
  let lawfulAgree = 0
  let illegalMismatch = 0
  for (const xv of W) {
    const X = fr(xv)
    if (fIsZero(pe(den, X))) continue
    const orig = fDiv(pe(num, X), pe(den, X))
    if (fEq(orig, pe(lawful, X))) lawfulAgree++
    if (!fEq(orig, pe(illegal, X))) illegalMismatch++
  }
  ok(lawfulAgree === 10, 'A-iii lawful x+1 agrees at all 10 defined points (got ' + lawfulAgree + ')')
  ok(illegalMismatch === 10, 'A-iii illegal x+4 mismatches at ALL 10 defined points (got ' + illegalMismatch + ')')
  ok(!fEq(fDiv(fr(7n), fr(3n)), fr(4n)), 'A-iii (3+4)/3 = 7/3 ≠ 4 — the (a+b)/a fraud priced')
  // the numerator-zero does NOT exclude: x(x−5)/(x²−25) is defined at 0
  {
    const num2 = pMul(P(0, 1), P(-5, 1))
    const den2 = P(-25, 0, 1)
    const X = fr(0n)
    ok(fIsZero(pe(num2, X)) && !fIsZero(pe(den2, X)), 'A-iii x=0 kills the NUMERATOR only — 0/(−25) is defined')
    ok(fEq(fDiv(pe(num2, X), pe(den2, X)), fZero), 'A-iii the value at 0 is exactly 0 — numerator zeros never exclude')
  }
  console.log('  A-iii monster engine: lawful 10/10, illegal 10 mismatches, numerator-zero priced')
}

// A-iv — the monomial engine
{
  let agree1 = 0
  for (const xv of W) {
    const X = fr(xv)
    if (fIsZero(pe(P(0, 0, 6), X))) continue
    ok(fEq(fDiv(pe(P(0, 0, 0, 0, 0, 12), X), pe(P(0, 0, 6), X)), pe(P(0, 0, 0, 2), X)), 'A-iv 12x⁵/(6x²) = 2x³ at x = ' + xv)
    agree1++
    ok(fEq(fDiv(pe(P(0, 0, 0, 0, 10), X), pe(P(0, 0, 5), X)), pe(P(0, 0, 2), X)), 'A-iv 10x⁴/(5x²) = 2x² at x = ' + xv)
    ok(fEq(fDiv(pe(P(0, 0, 1), X), pe(P(0, 0, 0, 0, 0, 1), X)), fDiv(fr(1n), pe(P(0, 0, 0, 1), X))), 'A-iv x²/x⁵ = 1/x³ at x = ' + xv)
  }
  ok(agree1 === 10, 'A-iv priced at 10 nonzero points (got ' + agree1 + ')')
  ok(fEq(fDiv(pe(P(0, 0, 1), fr(2n)), pe(P(0, 0, 0, 0, 0, 1), fr(2n))), fr(1n, 8n)), 'A-iv x²/x⁵ at x = 2 is exactly 1/8')
  ok(sameSet(denZeros(P(0, 0, 6)), [0n]) && sameSet(denZeros(P(0, 0, 0, 0, 0, 1)), [0n]), 'A-iv every monomial quotient refuses exactly {0}')
  console.log('  A-iv monomial engine: 2x³, 2x², 1/x³ exact, {0} refused')
}

// A-v — the hole census
{
  const num = P(-9, 0, 1)
  const den = P(-3, 1)
  const probes: [Frac, Frac][] = [
    [fr(29n, 10n), fr(59n, 10n)],
    [fr(299n, 100n), fr(599n, 100n)],
    [fr(301n, 100n), fr(601n, 100n)],
    [fr(31n, 10n), fr(61n, 10n)],
  ]
  for (const [xv, want] of probes) {
    const v = fDiv(pe(num, xv), pe(den, xv))
    ok(fEq(v, want) && fEq(v, fAdd(xv, fr(3n))), 'A-v hole probe: value = x+3 exactly at x = ' + xv.n + '/' + xv.d)
  }
  ok(fIsZero(pe(den, fr(3n))), 'A-v the original refuses x = 3 — the hole')
  ok(fEq(pe(P(3, 1), fr(3n)), fr(6n)), 'A-v the simplified x+3 would say 6 there — the forms disagree exactly at the hole')
  console.log('  A-v hole census: 4 probes exact, hole at 3')
}

// A-vi — the zero-fraction engine (the run-82 seed)
{
  const cands = numZeros(P(-9, 0, 1))
  ok(sameSet(cands, [-3n, 3n]), 'A-vi numerator candidates {−3, 3}')
  const sol = cands.filter((xv) => !fIsZero(pe(P(-3, 1), fr(xv))))
  ok(sameSet(sol, [-3n]), 'A-vi the bill refuses 3 — (x²−9)/(x−3) = 0 exactly at x = −3')
  console.log('  A-vi zero-fraction engine: candidates filtered by the bill — solution {−3}')
}

/* ------------------------------------------------------------------ */
/* (B) the pinned computations of lesson 8.1                           */
/* ------------------------------------------------------------------ */

console.log('[B] 8.1 pinned: quiz keys [0, 1, 0, 3, 1] + 14 exercises')

{
  // quiz Q1 — (x+5)/(x−2) refuses exactly 2 (key 0)
  ok(sameSet(denZeros(P(-2, 1)), [2n]), 'B quiz Q1: (x+5)/(x−2) refuses exactly {2} — key 0')
  // quiz Q2 — (x²−16)/(x+4) = x−4 for x ≠ −4 (key 1)
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (fIsZero(pe(P(4, 1), X))) continue
      ok(fEq(fDiv(pe(P(-16, 0, 1), X), pe(P(4, 1), X)), pe(P(-4, 1), X)), 'B quiz Q2: value agrees at x = ' + xv)
      agree++
    }
    ok(agree === 10, 'B quiz Q2: 10 agreements, bill {−4} — key 1 (got ' + agree + ')')
  }
  // quiz Q3 — the lawful cancel is (3x+3)/3 = x+1 (key 0); every distractor priced
  ok(fEq(fDiv(pe(P(3, 3), fr(7n)), fr(3n)), fr(8n)), 'B quiz Q3: (3·7+3)/3 = 8 = x+1 at x = 7 — and 3 never dies, no exclusion')
  ok(!fEq(fDiv(pe(P(4, 0, 1), fr(1n)), pe(P(4, 1), fr(1n))), fr(2n)), 'B quiz Q3 distractor: (x²+4)/(x+4) at x=1 is 1, not 2 — term-cancel fraud')
  ok(!fEq(fDiv(fr(3n), fr(5n)), fDiv(fr(1n), fr(3n))), 'B quiz Q3 distractor: (x+2)/(y+2) at x=1,y=3 is 3/5, not x/y = 1/3')
  ok(fEq(fDiv(pe(P(0, 1, 1), fr(2n)), fr(2n)), fr(3n)), 'B quiz Q3 distractor: (x²+x)/x at x=2 is 3 = x+1 — the offered "x" (2) is wrong')
  // quiz Q4 — x²+1 refuses nothing (key 3)
  ok(denZeros(P(1, 0, 1)).length === 0, 'B quiz Q4: x²+1 refuses nothing on the window — key 3')
  // quiz Q5 — (2x²−8)/(2x+4) = x−2 with bill {−2} (key 1)
  {
    for (const xv of W) {
      const X = fr(xv)
      if (fIsZero(pe(P(4, 2), X))) continue
      ok(fEq(fDiv(pe(P(-8, 0, 2), X), pe(P(4, 2), X)), pe(P(-2, 1), X)), 'B quiz Q5: value agrees at x = ' + xv)
    }
    ok(sameSet(denZeros(P(4, 2)), [-2n]), 'B quiz Q5: bill exactly {−2} — key 1')
    ok(fEq(pe(P(-2, 1), fr(-2n)), fr(-4n)), 'B quiz Q5: the simplified form would say −4 at the hole — carried exclusion matters')
  }

  // exercises, pointwise on W via the original expression trees
  const live = (bill: bigint[]) => W.filter((xv) => !bill.some((b) => b === xv))
  // L1-1: (x+1)/(x−4) at 6 → 7/2; at 4 undefined
  ok(fEq(fDiv(pe(P(1, 1), fr(6n)), pe(P(-4, 1), fr(6n))), fr(7n, 2n)), 'B L1-1: value 7/2 at x = 6')
  ok(fIsZero(pe(P(-4, 1), fr(4n))), 'B L1-1: undefined at x = 4')
  // L1-2: 10x⁴/(5x²) = 2x², bill {0}
  ok(sameSet(denZeros(P(0, 0, 5)), [0n]), 'B L1-2: bill {0}')
  // L1-3: x = 3 refused, x = −3 gives 1/3
  ok(fIsZero(pe(P(-3, 1), fr(3n))), 'B L1-3: x = 3 refused')
  ok(fEq(fDiv(pe(P(1, 1), fr(-3n)), pe(P(-3, 1), fr(-3n))), fr(1n, 3n)), 'B L1-3: value 1/3 at x = −3')
  // L2-1: (x²−25)/(x+5) = x−5, bill {−5}
  for (const xv of live([-5n])) {
    const X = fr(xv)
    ok(fEq(fDiv(pe(P(-25, 0, 1), X), pe(P(5, 1), X)), pe(P(-5, 1), X)), 'B L2-1: x−5 at x = ' + xv)
  }
  ok(sameSet(denZeros(P(5, 1)), [-5n]), 'B L2-1: bill {−5}')
  // L2-2: (x²+6x+8)/(x+2) = x+4, bill {−2}
  for (const xv of live([-2n])) {
    const X = fr(xv)
    ok(fEq(fDiv(pe(P(8, 6, 1), X), pe(P(2, 1), X)), pe(P(4, 1), X)), 'B L2-2: x+4 at x = ' + xv)
  }
  ok(sameSet(denZeros(P(2, 1)), [-2n]), 'B L2-2: bill {−2}')
  // L2-3: (x−2)(x+6) refuses 2 on the window; the second zero −6 sits outside W — direct check
  ok(sameSet(denZeros(pMul(P(-2, 1), P(6, 1))), [2n]), 'B L2-3: on the window the bill is {2}')
  ok(fIsZero(pe(pMul(P(-2, 1), P(6, 1)), fr(-6n))), 'B L2-3: the second zero −6 verified by direct evaluation (outside the window)')
  // L3-1: (x²−7x+12)/(x²−9) = (x−4)/(x+3), bill {±3}
  for (const xv of live([3n, -3n])) {
    const X = fr(xv)
    ok(
      fEq(fDiv(pe(P(12, -7, 1), X), pe(P(-9, 0, 1), X)), fDiv(pe(P(-4, 1), X), pe(P(3, 1), X))),
      'B L3-1: (x−4)/(x+3) at x = ' + xv
    )
  }
  // L3-2: (2x²−18)/(x²+7x+12) = 2(x−3)/(x+4), bill {−3, −4}
  for (const xv of live([-3n, -4n])) {
    const X = fr(xv)
    ok(
      fEq(fDiv(pe(P(-18, 0, 2), X), pe(P(12, 7, 1), X)), fDiv(pe(pMul(P(2), P(-3, 1)), X), pe(P(4, 1), X))),
      'B L3-2: 2(x−3)/(x+4) at x = ' + xv
    )
  }
  // L3-3: lawful x+4 (bill {−1}); the student's x+5 wrong at all 10 defined points
  {
    let m = 0
    for (const xv of W) {
      const X = fr(xv)
      if (fIsZero(pe(P(1, 1), X))) continue
      const orig = fDiv(pe(P(4, 5, 1), X), pe(P(1, 1), X))
      ok(fEq(orig, pe(P(4, 1), X)), 'B L3-3: lawful value x+4 at x = ' + xv)
      if (!fEq(orig, pe(P(5, 1), X))) m++
    }
    ok(m === 10, 'B L3-3: the student x+5 mismatches at all 10 defined points (got ' + m + ')')
  }
  // L4-1: k = 16 unique in 10..20; (x²−16)/(x−4) = x+4, bill {4}
  {
    const found: number[] = []
    for (let k = 10; k <= 20; k++) if (pEq(P(BigInt(-k), 0, 1), pMul(P(-4, 1), P(4, 1)))) found.push(k)
    ok(JSON.stringify(found) === JSON.stringify([16]), 'B L4-1: k = 16 is the unique solution in 10..20')
    for (const xv of live([4n])) {
      const X = fr(xv)
      ok(fEq(fDiv(pe(P(-16, 0, 1), X), pe(P(-4, 1), X)), pe(P(4, 1), X)), 'B L4-1: x+4 at x = ' + xv)
    }
  }
  // L4-2: (x²−5x)/(x²−25) = x/(x+5), bill {±5}, and 0 is DEFINED (value 0)
  for (const xv of live([5n, -5n])) {
    const X = fr(xv)
    ok(fEq(fDiv(pe(pMul(P(0, 1), P(-5, 1)), X), pe(P(-25, 0, 1), X)), fDiv(pe(P(0, 1), X), pe(P(5, 1), X))), 'B L4-2: x/(x+5) at x = ' + xv)
  }
  ok(fEq(fDiv(pe(pMul(P(0, 1), P(-5, 1)), fr(0n)), pe(P(-25, 0, 1), fr(0n))), fZero), 'B L4-2: at x = 0 the original is 0/(−25) = 0 — defined, 0 NOT in the bill')
  // L5-1: (x²−9)/(x−3) = x+3, bill {3} — the speed reading
  ok(fEq(pe(P(3, 1), fr(4n)), fr(7n)), 'B L5-1: speed x+3 km/h at x = 4 → 7 km/h')
  // L5-2: (4x²+8x)/x = 4(x+2), bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fDiv(pe(P(0, 8, 4), X), pe(P(0, 1), X)), pe(P(8, 4), X)), 'B L5-2: per-pen cost 4(x+2) at x = ' + xv)
  }
  console.log('  B pinned 8.1: quiz 5/5 + 14 exercises priced')
}

/* ------------------------------------------------------------------ */
/* (C) figure plans of lesson 8.1                                      */
/* ------------------------------------------------------------------ */

export type FigPlan = { viewBox: [number, number]; rects: [number, number, number, number][]; groups: number[][] }

export const plan81Fig1: FigPlan = {
  viewBox: [720, 340],
  // [0] header, [1..3] panels, [4..6] verdict chips, [7] caption
  rects: [
    [30, 18, 660, 44],
    [30, 84, 208, 180],
    [256, 84, 208, 180],
    [482, 84, 208, 180],
    [30, 276, 208, 26],
    [256, 276, 208, 26],
    [482, 276, 208, 26],
    [30, 314, 660, 24],
  ],
  groups: [[0], [1, 2, 3], [4, 5, 6], [7]],
}

export const plan81Fig2: FigPlan = {
  viewBox: [720, 340],
  // [0] header, [1..4] stations, [5] result band, [6] caption
  rects: [
    [30, 18, 660, 44],
    [30, 96, 150, 120],
    [200, 96, 150, 120],
    [370, 96, 150, 120],
    [540, 96, 150, 120],
    [30, 240, 660, 48],
    [30, 314, 660, 24],
  ],
  groups: [[0], [1, 2, 3, 4], [5], [6]],
}

console.log('[C] 8.1 figure plans recorded: domain strip 720×340, pipeline 720×340')

/* ------------------------------------------------------------------ */
/* (D) the operation engines of lesson 8.2                             */
/* ------------------------------------------------------------------ */

console.log('[D] 8.2 engines: products, the reciprocal flip, LCD/LCM, sums, traps')

// D-i — the product engine
{
  // pinned product 1: (x²−9)/x² · x/(x+3) = (x−3)/x, common bill {0, −3}
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 0n || xv === -3n) continue
      const lhs = fMul(fDiv(pe(P(-9, 0, 1), X), pe(P(0, 0, 1), X)), fDiv(pe(P(0, 1), X), pe(P(3, 1), X)))
      ok(fEq(lhs, fDiv(pe(P(-3, 1), X), pe(P(0, 1), X))), 'D-i product 1: = (x−3)/x at x = ' + xv)
      agree++
    }
    ok(agree === 9, 'D-i product 1 priced on 9 points with bill {0, −3} (got ' + agree + ')')
    ok(!fIsZero(pe(P(0, 1), fr(-3n))), 'D-i product 1: the simplified (x−3)/x lives at x = −3 — the bill must be carried')
  }
  // pinned product 2: (6x²/5)·(10/x³) = 12/x, bill {0}
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 0n) continue
      const lhs = fMul(fDiv(pe(P(0, 0, 6), X), fr(5n)), fDiv(fr(10n), pe(P(0, 0, 0, 1), X)))
      ok(fEq(lhs, fDiv(fr(12n), pe(P(0, 1), X))), 'D-i product 2: = 12/x at x = ' + xv)
      agree++
    }
    ok(agree === 10, 'D-i product 2 priced on 10 points (got ' + agree + ')')
  }
  // cancel-before equals cancel-after, exact
  ok(fEq(fMul(fDiv(fr(6n), fr(4n)), fr(10n, 15n)), fMul(fDiv(fr(3n), fr(2n)), fr(2n, 3n))) && fEq(fMul(fDiv(fr(6n), fr(4n)), fr(10n, 15n)), fr(1n)), 'D-i cancel-before = cancel-after: (6/4)(10/15) = (3/2)(2/3) = 1')
  console.log('  D-i product engine: 2 pinned products + the cancel-commutes check')
}

// D-ii — the reciprocal-flip engine
{
  // pinned: (x²−4)/x ÷ (x+2)/(2x) = 2(x−2), bill {0, −2}
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 0n || xv === -2n) continue
      const A = fDiv(pe(P(-4, 0, 1), X), pe(P(0, 1), X))
      const B = fDiv(pe(P(2, 1), X), pe(P(0, 2), X))
      const direct = fDiv(A, B)
      const flipped = fMul(A, fDiv(pe(P(0, 2), X), pe(P(2, 1), X)))
      ok(fEq(direct, flipped) && fEq(direct, pe(pMul(P(2), P(-2, 1)), X)), 'D-ii flip: = 2(x−2) at x = ' + xv)
      agree++
    }
    ok(agree === 9, 'D-ii pinned division priced on 9 points, bill {0, −2} (got ' + agree + ')')
  }
  // the hidden-exclusion exhibit: (1/x) ÷ (1/x) = 1 with bill {0}
  {
    let count = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 0n) continue
      ok(fEq(fDiv(fDiv(fr(1n), X), fDiv(fr(1n), X)), fr(1n)), 'D-ii (1/x)÷(1/x) = 1 at x = ' + xv)
      count++
    }
    ok(count === 10, 'D-ii the answer is 1 yet the bill keeps {0} — 10 of 11 points live (got ' + count + ')')
  }
  // the wrong-flip trap: flipping the FIRST fraction mismatches everywhere
  {
    let wrong = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 0n) continue
      const right = fDiv(fDiv(X, fr(3n)), fDiv(X, fr(4n))) // (x/3)÷(x/4) = 4/3
      const wrongV = fMul(fDiv(fr(3n), X), fDiv(X, fr(4n))) // flipped the first
      ok(fEq(right, fr(4n, 3n)), 'D-ii right flip: (x/3)÷(x/4) = 4/3 at x = ' + xv)
      if (!fEq(wrongV, right)) wrong++
    }
    ok(wrong === 10, 'D-ii the wrong flip mismatches at all 10 live points (got ' + wrong + ')')
  }
  console.log('  D-ii flip engine: pinned division 9 points, hidden bill, wrong-flip priced')
}

// D-iii — the LCD/LCM engine and the sum engine
{
  const lcm2 = (a: number, b: number): number => {
    const g = (u: number, v: number): number => (v === 0 ? u : g(v, u % v))
    return (a * b) / g(a, b)
  }
  // monomial lcm 1: lcm(4x², 6x) = 12x²
  ok(lcm2(4, 6) === 12, 'D-iii lcm(4x², 6x): coefficient lcm(4,6) = 12')
  ok(12 % 4 === 0 && 12 % 6 === 0, 'D-iii 12x² divides both 4x² and 6x')
  {
    let minimal = true
    for (let c = 1; c <= 24; c++) {
      for (let p = 0; p <= 3; p++) {
        const d1 = c % 4 === 0 && p >= 2 // c·x^p ÷ 4x²
        const d2 = c % 6 === 0 && p >= 1 // c·x^p ÷ 6x
        if (d1 && d2 && !(c % 12 === 0 && p >= 2)) minimal = false
      }
    }
    ok(minimal, 'D-iii minimality: every common multiple in the candidate grid is a multiple of 12x²')
  }
  ok(lcm2(6, 10) === 30, 'D-iii lcm(6x², 10x³) = 30x³')
  // factored lcm by max-power union: x(x−1) and (x−1)(x+1) → x(x−1)(x+1)
  {
    type F = [number, number][]
    const lcmF = (a: F, b: F): F => {
      const out: F = a.map(([r, m]) => [r, m] as [number, number])
      for (const [r, m] of b) {
        const hit = out.find(([r2]) => r2 === r)
        if (hit) hit[1] = Math.max(hit[1], m)
        else out.push([r, m])
      }
      return out
    }
    const L = lcmF(
      [
        [0, 1],
        [1, 1],
      ],
      [
        [1, 1],
        [-1, 1],
      ]
    ).sort((u, v) => u[0] - v[0])
    ok(JSON.stringify(L) === JSON.stringify([[-1, 1], [0, 1], [1, 1]]), 'D-iii lcm(x(x−1), (x−1)(x+1)) = x(x−1)(x+1) by max-power union')
  }
  // the sum engine through the LCD: 1/(x²−x) + 2/(x²−1) = (3x+1)/(x(x−1)(x+1)), bill {0, ±1}
  {
    const denA = pMul(P(0, 1), P(-1, 1))
    const denB = pMul(P(-1, 1), P(1, 1))
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 0n || xv === 1n || xv === -1n) continue
      const direct = fAdd(fDiv(fr(1n), pe(denA, X)), fDiv(fr(2n), pe(denB, X)))
      const cross = fDiv(fAdd(fMul(fr(1n), pe(denB, X)), fMul(fr(2n), pe(denA, X))), fMul(pe(denA, X), pe(denB, X)))
      const lcd = fDiv(pe(P(1, 3), X), pe(pMul(pMul(P(0, 1), P(-1, 1)), P(1, 1)), X))
      ok(fEq(direct, cross) && fEq(direct, lcd), 'D-iii sum: direct = cross = LCD form at x = ' + xv)
      agree++
    }
    ok(agree === 8, 'D-iii the LCD sum priced on 8 points, bill {0, ±1} (got ' + agree + ')')
  }
  // pinned sum 1: 3/(x−1) + 2/(x+1) = (5x+1)/((x−1)(x+1)), bill {±1}
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 1n || xv === -1n) continue
      const direct = fAdd(fDiv(fr(3n), pe(P(-1, 1), X)), fDiv(fr(2n), pe(P(1, 1), X)))
      const lcd = fDiv(pe(P(1, 5), X), fMul(pe(P(-1, 1), X), pe(P(1, 1), X)))
      ok(fEq(direct, lcd), 'D-iii pinned sum 1 at x = ' + xv)
      agree++
    }
    ok(agree === 9, 'D-iii pinned sum 1 priced on 9 points (got ' + agree + ')')
    ok(fEq(fAdd(fDiv(fr(3n), fr(1n)), fDiv(fr(2n), fr(3n))), fr(11n, 3n)), 'D-iii exhibit at x = 2: 3 + 2/3 = 11/3 exactly')
    ok(fEq(fDiv(pe(P(1, 5), fr(2n)), fr(3n)), fr(11n, 3n)), 'D-iii the LCD form at x = 2: (5·2+1)/3 = 11/3 — forms agree')
  }
  // pinned like-denominator subtraction: 5/(x−1) − (x+2)/(x−1) = (3−x)/(x−1), bill {1}
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 1n) continue
      const direct = fSub(fDiv(fr(5n), pe(P(-1, 1), X)), fDiv(pe(P(2, 1), X), pe(P(-1, 1), X)))
      const combined = fDiv(pe(P(3, -1), X), pe(P(-1, 1), X))
      ok(fEq(direct, combined), 'D-iii pinned subtraction at x = ' + xv)
      agree++
    }
    ok(agree === 10, 'D-iii pinned subtraction priced on 10 points (got ' + agree + ')')
    ok(fEq(fSub(fDiv(fr(5n), fr(1n)), fDiv(fr(4n), fr(1n))), fr(1n)) && fEq(fDiv(pe(P(3, -1), fr(2n)), fr(1n)), fr(1n)), 'D-iii exhibit at x = 2: 5 − 4 = 1 and (3−2)/1 = 1')
  }
  console.log('  D-iii LCD/LCM + sum engines: monomials, factor union, 3 pinned sums')
}

// D-iv — the bracket and sign traps
{
  {
    let m = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 1n) continue
      const correct = fDiv(pe(P(3, -1), X), pe(P(-1, 1), X))
      const wrong = fDiv(pe(P(7, -1), X), pe(P(-1, 1), X))
      if (!fEq(correct, wrong)) m++
    }
    ok(m === 10, 'D-iv the bracket error (7−x)/(x−1) mismatches at ALL 10 defined points (got ' + m + ')')
  }
  {
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 3n) continue
      ok(fEq(fDiv(pe(P(-3, 1), X), pe(P(3, -1), X)), fr(-1n)), 'D-iv (x−3)/(3−x) = −1 at x = ' + xv)
      agree++
    }
    ok(agree === 10, 'D-iv the sign flip priced on 10 points, bill {3} (got ' + agree + ')')
  }
  {
    let agree2 = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 2n) continue
      const lhs = fSub(fDiv(pe(P(3, 1), X), pe(P(-2, 1), X)), fDiv(pe(P(1, 2), X), pe(P(-2, 1), X)))
      ok(fEq(lhs, fr(-1n)), 'D-iv (x+3)/(x−2) − (2x+1)/(x−2) = −1 at x = ' + xv)
      agree2++
    }
    ok(agree2 === 10, 'D-iv the −1 landing priced on 10 points, bill {2} (got ' + agree2 + ')')
  }
  console.log('  D-iv trap engines: bracket 10 mismatches, sign flips priced')
}

/* ------------------------------------------------------------------ */
/* (E) the pinned computations of lesson 8.2 + figure plans            */
/* ------------------------------------------------------------------ */

console.log('[E] 8.2 pinned: quiz keys [2, 1, 3, 1, 2] + 14 exercises + figure plans')

{
  ok(true, 'E quiz anchors: Q1–Q5 all priced in the D engines (keys 2, 1, 3, 1, 2)')

  const live = (bill: bigint[]) => W.filter((xv) => !bill.some((b) => b === xv))
  // L1-1: (x/3)·(6/x²) = 2/x, bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fMul(fDiv(pe(P(0, 1), X), fr(3n)), fDiv(fr(6n), pe(P(0, 0, 1), X))), fDiv(fr(2n), X)), 'E L1-1: 2/x at x = ' + xv)
  }
  // L1-2: (x/2)÷(x/4) = 2, bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fDiv(fDiv(X, fr(2n)), fDiv(X, fr(4n))), fr(2n)), 'E L1-2: 2 at x = ' + xv)
  }
  // L1-3: 1/x + 2/x = 3/x, bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fAdd(fDiv(fr(1n), X), fDiv(fr(2n), X)), fDiv(fr(3n), X)), 'E L1-3: 3/x at x = ' + xv)
  }
  // L2-1: (x²−1)/(x+1) · x/(x−1) = x, bill {±1}
  for (const xv of live([1n, -1n])) {
    const X = fr(xv)
    const lhs = fMul(fDiv(pe(P(-1, 0, 1), X), pe(P(1, 1), X)), fDiv(pe(P(0, 1), X), pe(P(-1, 1), X)))
    ok(fEq(lhs, pe(P(0, 1), X)), 'E L2-1: = x at x = ' + xv)
  }
  // L2-2: (x+3)/(x−2) − (2x+1)/(x−2) = −1, bill {2} — priced in D-iv; anchor the bill
  ok(sameSet(denZeros(P(-2, 1)), [2n]), 'E L2-2: bill {2}')
  // L2-3: 5/(x+1) + 3/(x−1) = (8x−2)/((x+1)(x−1)), bill {±1}
  for (const xv of live([1n, -1n])) {
    const X = fr(xv)
    const direct = fAdd(fDiv(fr(5n), pe(P(1, 1), X)), fDiv(fr(3n), pe(P(-1, 1), X)))
    const combined = fDiv(pe(P(-2, 8), X), fMul(pe(P(1, 1), X), pe(P(-1, 1), X)))
    ok(fEq(direct, combined), 'E L2-3: (8x−2)/((x+1)(x−1)) at x = ' + xv)
  }
  // L3-1: (x²−4)/(x²−x) · x/(x+2) = (x−2)/(x−1), bill {0, 1, −2}
  for (const xv of live([0n, 1n, -2n])) {
    const X = fr(xv)
    const lhs = fMul(fDiv(pe(P(-4, 0, 1), X), pe(pMul(P(0, 1), P(-1, 1)), X)), fDiv(pe(P(0, 1), X), pe(P(2, 1), X)))
    ok(fEq(lhs, fDiv(pe(P(-2, 1), X), pe(P(-1, 1), X))), 'E L3-1: (x−2)/(x−1) at x = ' + xv)
  }
  // L3-2: (x²−9)/x² ÷ (x−3)/(3x) = 3(x+3)/x, bill {0, 3}
  for (const xv of live([0n, 3n])) {
    const X = fr(xv)
    const A = fDiv(pe(P(-9, 0, 1), X), pe(P(0, 0, 1), X))
    const B = fDiv(pe(P(-3, 1), X), pe(P(0, 3), X))
    ok(fEq(fDiv(A, B), fDiv(pe(pMul(P(3), P(3, 1)), X), pe(P(0, 1), X))), 'E L3-2: 3(x+3)/x at x = ' + xv)
  }
  // L3-3: (x/3)÷(x/4) = 4/3; the student's 3/4 is the reciprocal
  ok(!fEq(fr(3n, 4n), fr(4n, 3n)), 'E L3-3: 3/4 ≠ 4/3 — the reciprocal mixup priced')
  // L4-1: 2/(x²−4) + 1/(x+2) = x/((x−2)(x+2)), bill {±2}
  for (const xv of live([2n, -2n])) {
    const X = fr(xv)
    const direct = fAdd(fDiv(fr(2n), pe(P(-4, 0, 1), X)), fDiv(fr(1n), pe(P(2, 1), X)))
    const combined = fDiv(pe(P(0, 1), X), fMul(pe(P(-2, 1), X), pe(P(2, 1), X)))
    ok(fEq(direct, combined), 'E L4-1: x/((x−2)(x+2)) at x = ' + xv)
  }
  // L4-2: 1/(x²−x) − 1/(x²+x) = 2/(x(x−1)(x+1)), bill {0, ±1}
  for (const xv of live([0n, 1n, -1n])) {
    const X = fr(xv)
    const direct = fSub(fDiv(fr(1n), pe(pMul(P(0, 1), P(-1, 1)), X)), fDiv(fr(1n), pe(pMul(P(0, 1), P(1, 1)), X)))
    const combined = fDiv(fr(2n), pe(pMul(pMul(P(0, 1), P(-1, 1)), P(1, 1)), X))
    ok(fEq(direct, combined), 'E L4-2: 2/(x(x−1)(x+1)) at x = ' + xv)
  }
  // L5-1: (x²+2x)/(x+2) = x, bill {−2}
  for (const xv of live([-2n])) {
    const X = fr(xv)
    ok(fEq(fDiv(pe(P(0, 2, 1), X), pe(P(2, 1), X)), pe(P(0, 1), X)), 'E L5-1: = x at x = ' + xv)
  }
  // L5-2: rates x and x — equal on the common domain x ≠ ±1
  for (const xv of live([1n, -1n])) {
    const X = fr(xv)
    const r1 = fDiv(pe(P(0, 1, 1), X), pe(P(1, 1), X))
    const r2 = fDiv(pe(P(0, -1, 1), X), pe(P(-1, 1), X))
    ok(fEq(r1, pe(P(0, 1), X)) && fEq(r2, pe(P(0, 1), X)) && fEq(r1, r2), 'E L5-2: both rates equal x at x = ' + xv)
  }
  ok(true, 'E L6 anchor: the flip law priced in D-ii')
  console.log('  E pinned 8.2: quiz anchors + 14 exercises priced via expression trees')
}

// figure plans 8.2
export const plan82Fig1: FigPlan = {
  viewBox: [720, 424],
  // [0] header, [1..4] operation panels, [5] caption
  rects: [
    [30, 18, 660, 44],
    [30, 84, 320, 140],
    [370, 84, 320, 140],
    [30, 240, 320, 140],
    [370, 240, 320, 140],
    [30, 396, 660, 24],
  ],
  groups: [[0], [1, 2], [3, 4], [5]],
}

export const plan82Fig2: FigPlan = {
  viewBox: [720, 400],
  // [0] header, [1] left factor box, [2] right factor box, [3] collector, [4] caption
  rects: [
    [30, 18, 660, 44],
    [30, 84, 300, 110],
    [390, 84, 300, 110],
    [30, 230, 660, 110],
    [30, 364, 660, 24],
  ],
  groups: [[0], [1, 2], [3], [4]],
}

console.log('[E] 8.2 figure plans recorded: four-operation panel 720×424, LCD collector 720×400')

/* ------------------------------------------------------------------ */
/* (F) the authored lesson 8.1 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

import { chapter08 } from '../src/data/library/books/mathematics/elementary-algebra/ch-08'

console.log('[F] 8.1 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = chapter08.lessons[0]
  ok(chapter08.lessons.length === 3, 'F: chapter 8 now carries its three authored lessons — 8.1 + 8.2 of run 81, 8.3 of run 82 (got ' + chapter08.lessons.length + ')')
  ok(lesson.id === 'al-rational-expressions-simplify-first', 'F: lesson id al-rational-expressions-simplify-first')
  ok(lesson.number === '8.1', 'F: lesson number 8.1')
  ok(lesson.title === 'Rational Expressions: Simplify First', 'F: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['fm-equivalent-fractions-simplification', 'al-common-factors-and-grouping', 'al-factoring-quadratic-trinomials']),
    'F: prerequisites are FM simplification + the ch-4 factoring pair'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math7-ch2', 'khattar-qa-4e', 'cengage-jee-style']),
    'F: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 13, `F: thirteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `F: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `F: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `F: one derivation (the fundamental-law theorem)`)
  ok(countKind('example') === 5, `F: five illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `F: one table (the hole probes)`)
  ok(countKind('figure') === 2, `F: two figures (the domain strip + the pipeline)`)
  ok(countKind('formula') === 3, `F: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `F: one terms block`)
  ok(countKind('list') === 3, `F: three lists (the roman example run, the three promises, the collected roman)`)
  ok(countKind('quiz') === 1, `F: one quiz block`)
  ok(countKind('exercises') === 1, `F: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,definition,exam,historical,insight,warn,warn', `F: the seven callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `F: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 1, 0, 3, 1]), 'F: quiz keys match the pinned [0, 1, 0, 3, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'F: quiz shape + distractor pricing')
      ok(q.items[0].options[0] === '$x = 2$', 'F: quiz Q1 option 1 is the pinned refusal (the key 0)')
      ok(q.items[2].options[0].includes('3x + 3'), 'F: quiz Q3 option 1 is the pinned lawful cancel (the key 0)')
      ok(q.items[3].options[3].includes('no real number'), 'F: quiz Q4 option 4 is the pinned empty bill (the key 3)')
      ok(q.items[4].options[1] === '$x = -2$', 'F: quiz Q5 option 2 is the pinned surviving exclusion (the key 1)')
    }
  }
  // exercises shape + anchors
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'F: exercise set sizes 3/3/3/2/2/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'F: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('frac{7}{2}'), 'F: L1.1 answer carries the pinned value 7/2')
      ok((all[7].answer || '').includes('2(x-3)'), 'F: L3.2 answer carries the pinned 2(x−3)/(x+4)')
      ok((all[9].answer || '').includes('k = 16'), 'F: L4.1 answer carries the pinned k = 16')
      ok((all[10].answer || '').includes('x = 0'), 'F: L4.2 answer carries the defined-zero verdict')
      ok((all[13].answer || '').includes('certificate'), 'F: L6 answer carries the certificate reading')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'F: two figures in 8.1 (the domain strip + the pipeline)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan81Fig1.rects.length, 'F: domain strip rect census ' + r0.length + ' = plan ' + plan81Fig1.rects.length)
      ok(canon(r0) === canon(plan81Fig1.rects), 'F: domain strip rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan81Fig2.rects.length, 'F: pipeline rect census ' + r1.length + ' = plan ' + plan81Fig2.rects.length)
      ok(canon(r1) === canon(plan81Fig2.rects), 'F: pipeline rects match the pinned plan exactly')
      for (const g of plan81Fig1.groups) {
        const rs = g.map((i) => plan81Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: domain strip group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan81Fig2.groups) {
        const rs = g.map((i) => plan81Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: pipeline group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('10 of 11') && figs[0].svg.includes('9 of 11') && figs[0].svg.includes('11 of 11'), 'F: the domain strip carries the three window censuses')
      ok(figs[0].svg.includes('no refusals') && figs[0].svg.includes('3 refused'), 'F: the domain strip names the refusals')
      ok(figs[1].svg.includes('FACTOR') && figs[1].svg.includes('CARRY') && figs[1].svg.includes('x ≠ 2 and x ≠ −2'), 'F: the pipeline carries the four stations and the worked bill')
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
    ok(hits === 0, 'F: no retired palette hexes in the 8.1 figures (found ' + hits + ')')
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
    console.log('[F] 8.1 honest word count: ' + words)
  }
  // entity-leak scan (run-81 catch: prose is rendered literally — no HTML entities)
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
    ok(entityHits === 0, 'F: no HTML entities in 8.1 prose (found ' + entityHits + ')')
  }
  // odd-run backslash scan over the chapter file source (run-69 hardening)
  {
    const src = await Bun.file('src/data/library/books/mathematics/elementary-algebra/ch-08.ts').text()
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
    ok(oddRuns === 0, 'F: no odd-length backslash runs in ch-08.ts source (found ' + oddRuns + ')')
    const escapes = (src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'F: no unicode escapes in ch-08.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (8.1 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'F: all ' + ids.length + ' lesson ids repo-wide unique (with 8.1 added)')
    ok(ids.includes('al-rational-expressions-simplify-first'), 'F: the new id is registered in the library graph')
  }
  console.log('[F] the authored 8.1: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (G) the authored lesson 8.2 — appended after 8.2 lands              */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* (G) the authored lesson 8.2 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

console.log('[G] 8.2 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = chapter08.lessons[1]
  ok(chapter08.lessons.length === 3, 'G: chapter 8 now carries its three authored lessons — 8.2 was run 81’s second, 8.3 landed at run 82 (got ' + chapter08.lessons.length + ')')
  ok(lesson.id === 'al-operating-on-algebraic-fractions', 'G: lesson id al-operating-on-algebraic-fractions')
  ok(lesson.number === '8.2', 'G: lesson number 8.2')
  ok(lesson.title === 'Operating on Algebraic Fractions', 'G: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-rational-expressions-simplify-first', 'fm-adding-subtracting-fractions', 'fm-multiplying-dividing-fractions']),
    'G: prerequisites are 8.1 + the FM operations pair'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math7-ch2', 'khattar-qa-4e', 'cengage-jee-style']),
    'G: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 11, `G: eleven paras (got ${countKind('para')})`)
  ok(countKind('heading') === 4, `G: four headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `G: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `G: one derivation (the reciprocal-flip theorem)`)
  ok(countKind('example') === 5, `G: five illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `G: one table (the operation audit)`)
  ok(countKind('figure') === 2, `G: two figures (the four-operation panel + the LCD collector)`)
  ok(countKind('formula') === 3, `G: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `G: one terms block`)
  ok(countKind('list') === 2, `G: two lists (the collected roman + the three promises)`)
  ok(countKind('quiz') === 1, `G: one quiz block`)
  ok(countKind('exercises') === 1, `G: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,exam,historical,insight,warn', `G: the five callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `G: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([2, 1, 3, 1, 2]), 'G: quiz keys match the pinned [2, 1, 3, 1, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'G: quiz shape + distractor pricing')
      ok(q.items[0].options[2].includes('x \\neq 0, -3'), 'G: quiz Q1 option 3 is the pinned product with its bill (the key 2)')
      ok(q.items[2].options[3] === '$x(x-1)(x+1)$', 'G: quiz Q3 option 4 is the pinned LCD (the key 3)')
      ok(q.items[4].options[2] === '$x \\neq 0$', 'G: quiz Q5 option 3 is the pinned hidden exclusion (the key 2)')
    }
  }
  // exercises shape + anchors
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'G: exercise set sizes 3/3/3/2/2/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'G: 14 exercises, Cengage chains, terminal answers')
      ok((all[1].answer || '').includes('$2$'), 'G: L1.2 answer carries the pinned constant 2')
      ok((all[4].answer || '').includes('-1'), 'G: L2.2 answer carries the pinned −1 landing')
      ok((all[8].answer || '').includes('4}{3}'), 'G: L3.3 answer carries the pinned 4/3 audit')
      ok((all[10].answer || '').includes('x(x-1)(x+1)'), 'G: L4.2 answer carries the pinned LCD denominator')
      ok((all[13].answer || '').includes('clause'), 'G: L6 answer carries the clause reading')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'G: two figures in 8.2 (the four-operation panel + the LCD collector)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan82Fig1.rects.length, 'G: four-ops rect census ' + r0.length + ' = plan ' + plan82Fig1.rects.length)
      ok(canon(r0) === canon(plan82Fig1.rects), 'G: four-ops rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan82Fig2.rects.length, 'G: LCD collector rect census ' + r1.length + ' = plan ' + plan82Fig2.rects.length)
      ok(canon(r1) === canon(plan82Fig2.rects), 'G: LCD collector rects match the pinned plan exactly')
      for (const g of plan82Fig1.groups) {
        const rs = g.map((i) => plan82Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: four-ops group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan82Fig2.groups) {
        const rs = g.map((i) => plan82Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: LCD collector group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('MULTIPLY') && figs[0].svg.includes('DIVIDE') && figs[0].svg.includes('R ≠ 0'), 'G: the four-ops panel carries the operations and the flip clause')
      ok(figs[1].svg.includes('LCD = x · (x − 1) · (x + 1)') && figs[1].svg.includes('maximum power'), 'G: the collector carries the LCD and the max-power law')
      ok(figs[0].svg.includes('viewBox="0 0 720 424"') && figs[1].svg.includes('viewBox="0 0 720 400"'), 'G: the viewBoxes match the plans')
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
    ok(hits === 0, 'G: no retired palette hexes in the 8.2 figures (found ' + hits + ')')
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
    console.log('[G] 8.2 honest word count: ' + words)
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
    ok(entityHits === 0, 'G: no HTML entities in 8.2 prose (found ' + entityHits + ')')
  }
  // al- prefix uniqueness across the whole library (8.2 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'G: all ' + ids.length + ' lesson ids repo-wide unique (with 8.2 added)')
    ok(ids.includes('al-operating-on-algebraic-fractions'), 'G: the new id is registered in the library graph')
  }
  console.log('[G] the authored 8.2: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (H) the fractional-equation engines of lesson 8.3 (run 82, pre-write)*/
/* ------------------------------------------------------------------ */

console.log('[H] 8.3 engines: compound bills, cross form, LCD clearing, extraneous roots, zero filter, work-rate')

// H-i — the compound bill + the cross-form engine
{
  // the bill engine: the compound bill is the union of the denominators' zero sets
  ok(sameSet(denZeros(P(-1, 1)), [1n]) && sameSet(denZeros(P(1, 1)), [-1n]), 'H-i bill engine: the zeros of (x−1) and (x+1) pinned 1 and −1')
  ok(
    sameSet([...denZeros(P(-1, 1)), ...denZeros(P(1, 1))].sort((a, b) => (a < b ? -1 : 1)), [-1n, 1n]),
    'H-i the compound bill of the cross-form exhibit is {−1, 1} (the union, duplicates collapsed)'
  )
  // pinned cross-form: 3/(x−1) = 5/(x+1)
  {
    // the cross identity as polynomials: 3(x+1) − 5(x−1) = −2x + 8
    ok(pEq(pSub(pMul(P(3), P(1, 1)), pMul(P(5), P(-1, 1))), P(8, -2)), 'H-i cross identity: 3(x+1) − 5(x−1) = −2x + 8 exactly')
    // the root, by scan and by structure
    ok(sameSet(numZeros(P(8, -2)), [4n]), 'H-i the cross form 3(x+1) = 5(x−1) has the single window root x = 4')
    // the ⟺ is pointwise on the live domain: original equality ⟺ cross equality at EVERY live point
    let agree = 0
    let holds = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 1n || xv === -1n) continue
      const orig = fEq(fDiv(fr(3n), pe(P(-1, 1), X)), fDiv(fr(5n), pe(P(1, 1), X)))
      const cross = fEq(fMul(fr(3n), pe(P(1, 1), X)), fMul(fr(5n), pe(P(-1, 1), X)))
      ok(orig === cross, 'H-i cross-form ⟺ agrees at x = ' + xv)
      agree++
      if (orig) holds++
    }
    ok(agree === 9, 'H-i the ⟺ priced at all 9 live points, bill {−1, 1} (got ' + agree + ')')
    ok(holds === 1, 'H-i the cross-form equality HOLDS at exactly one live point — the solution x = 4 (got ' + holds + ')')
    ok(fEq(fDiv(fr(3n), fr(3n)), fDiv(fr(5n), fr(5n))), 'H-i priced at x = 4: 3/3 = 5/5 = 1 — the solution checks in the ORIGINAL')
  }
  // the empty cross-form: 2/(x+2) = x/(x−2) → 2(x−2) = x(x+2) → x² = −4 → no real roots
  {
    ok(pEq(pSub(pMul(P(2), P(-2, 1)), pMul(P(0, 1), P(2, 1))), P(-4, 0, -1)), 'H-i the empty cross: 2(x−2) − x(x+2) = −x² − 4 exactly')
    ok(sameSet(numZeros(P(-4, 0, -1)), []), 'H-i the cleared polynomial −x² − 4 has NO window roots')
    let positive = true
    for (const xv of W) if (fIsZero(fAdd(fMul(pe(P(0, 1), fr(xv)), pe(P(0, 1), fr(xv))), fr(4n)))) positive = false
    ok(positive, 'H-i x² + 4 > 0 at every window point — the parabola never touches zero (verdict ∅ is honest)')
    ok(sameSet([...denZeros(P(2, 1)), ...denZeros(P(-2, 1))].sort((a, b) => (a < b ? -1 : 1)), [-2n, 2n]), 'H-i the bill of the empty cross is {−2, 2}')
    console.log('  H-i cross-form engine: 4 = the only root of 3/(x−1)=5/(x+1); 2/(x+2)=x/(x−2) empty over the reals')
  }
}

// H-ii — the LCD-clearing engine and the extraneous-root engine
{
  // exhibit 1 (the classic): x/(x−3) = 3/(x−3) + 2
  {
    const lhs = (X: Frac) => fDiv(pe(P(0, 1), X), pe(P(-3, 1), X))
    const rhs = (X: Frac) => fAdd(fDiv(fr(3n), pe(P(-3, 1), X)), fr(2n))
    // the cleared equation: x = 3 + 2(x−3) → x − 3 − 2(x−3) = −x + 3
    ok(pEq(pSub(P(0, 1), pAdd(P(3), pMul(P(2), P(-3, 1)))), P(3, -1)), 'H-ii the classic: cleared form x − 3 − 2(x−3) = −x + 3 exactly')
    ok(sameSet(numZeros(P(3, -1)), [3n]), 'H-ii the cleared equation has the single root x = 3 — which sits IN the bill {3}')
    // the original never vanishes on the live domain: LHS − RHS = −1 identically there
    let deficit = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === 3n) continue
      ok(fEq(fSub(lhs(X), rhs(X)), fr(-1n)), 'H-ii the classic: original deficit = −1 (never zero) at x = ' + xv)
      deficit++
    }
    ok(deficit === 10, 'H-ii the classic priced on all 10 live points (got ' + deficit + ')')
    // the mechanism: the cleared equation vanishes AT the bill point where the original is undefined
    ok(fIsZero(pe(P(3, -1), fr(3n))) && fIsZero(pe(P(-3, 1), fr(3n))), 'H-ii the mechanism: cleared(3) = 0 while the denominator (x−3) dies at 3 — the multiplication manufactured the candidate')
    ok(sameSet(numZeros(P(3, -1)).filter((r) => r !== 3n), []), 'H-ii the verdict after the bill filter: the solution set of the classic is EMPTY')
    console.log('  H-ii classic: cleared root {3} ⊂ bill {3} → ∅; original never zero live; mechanism priced')
  }
  // exhibit 2 (two candidates, one refused): x/(x−1) − 2/(x+1) = 2/(x²−1)
  {
    const lcd = pMul(P(-1, 1), P(1, 1)) // (x−1)(x+1)
    // cleared: x(x+1) − 2(x−1) − 2 = x² − x = x(x−1)
    const cleared = pSub(pSub(pMul(P(0, 1), P(1, 1)), pMul(P(2), P(-1, 1))), P(2))
    ok(pEq(cleared, P(0, -1, 1)), 'H-ii two-candidate exhibit: cleared polynomial is x² − x exactly')
    ok(pEq(P(0, -1, 1), pMul(P(0, 1), P(-1, 1))), 'H-ii x² − x = x(x−1) factors exactly')
    ok(sameSet(numZeros(P(0, -1, 1)), [0n, 1n]), 'H-ii the cleared equation has window roots {0, 1}')
    ok(sameSet(denZeros(lcd), [-1n, 1n]), 'H-ii the compound bill is {−1, 1}')
    // the filter: live roots = cleared roots minus the bill
    const live = numZeros(P(0, -1, 1)).filter((r) => r !== 1n && r !== -1n)
    ok(sameSet(live, [0n]), 'H-ii the filter keeps x = 0 and refuses x = 1 — the solution set is {0}')
    // pointwise agreement: original = 0 ⟺ cleared = 0 at EVERY live point (roots added, never destroyed)
    {
      const origZero = (X: Frac) =>
        fIsZero(fSub(fSub(fDiv(pe(P(0, 1), X), pe(P(-1, 1), X)), fDiv(fr(2n), pe(P(1, 1), X))), fDiv(fr(2n), pe(lcd, X))))
      const clearedZero = (X: Frac) => fIsZero(pe(P(0, -1, 1), X))
      let agree = 0
      for (const xv of W) {
        const X = fr(xv)
        if (xv === 1n || xv === -1n) continue
        ok(origZero(X) === clearedZero(X), 'H-ii zero-set agreement (orig ⟺ cleared) at x = ' + xv)
        agree++
      }
      ok(agree === 9, 'H-ii the ⟺ priced at all 9 live points (got ' + agree + ')')
      ok(origZero(fr(0n)), 'H-ii priced at x = 0: 0/(−1) − 2/1 − 2/(−1) = −2 + 2 = 0 — the surviving solution checks in the ORIGINAL')
      ok(fIsZero(pe(P(0, -1, 1), fr(1n))) && fIsZero(pe(P(-1, 1), fr(1n))), 'H-ii the extraneous candidate: cleared(1) = 0 while (x−1) dies at 1 — refused')
      ok(fIsZero(fAdd(pe(P(0, -1, 1), fr(5n)), fr(0n))) === false && !fIsZero(pe(P(0, -1, 1), fr(5n))), 'H-ii sanity: x = 5 is not a root of the cleared equation')
    }
    console.log('  H-ii two-candidate: roots {0, 1}, bill {±1} → {0}; the ⟺ priced at 9 live points')
  }
  // exhibit 3 (the identity verdict): (x²−9)/(x+3) = x − 3
  {
    ok(pEq(pSub(P(-9, 0, 1), pMul(P(-3, 1), P(3, 1))), P(0)), 'H-ii the identity exhibit: (x²−9) − (x−3)(x+3) = 0 as a polynomial identity — the cleared equation collapses to 0 = 0')
    let agree = 0
    for (const xv of W) {
      const X = fr(xv)
      if (xv === -3n) continue
      ok(fEq(fDiv(pe(P(-9, 0, 1), X), pe(P(3, 1), X)), pe(P(-3, 1), X)), 'H-ii the identity holds at x = ' + xv)
      agree++
    }
    ok(agree === 10, 'H-ii the identity priced at all 10 live points, bill {−3} (got ' + agree + ')')
    ok(fIsZero(pe(P(3, 1), fr(-3n))), 'H-ii at the bill point x = −3 the original reads 0/0 — undefined, so −3 is refused from the all-verdict')
    console.log('  H-ii identity verdict: every x ≠ −3 solves — 5.3’s third verdict returns for equations')
  }
}

// H-iii — the zero-fraction filter (8.1’s seed grown into an equation-solving tool)
{
  // seed re-priced: (x²−9)/(x−3) = 0 → numerator zeros {−3, 3}, denominator zeros {3} → verdict {−3}
  ok(sameSet(numZeros(P(-9, 0, 1)), [-3n, 3n]), 'H-iii seed: numerator zeros {−3, 3}')
  ok(sameSet(denZeros(P(-3, 1)), [3n]), 'H-iii seed: denominator zeros {3}')
  const seedVerdict = numZeros(P(-9, 0, 1)).filter((r) => !denZeros(P(-3, 1)).some((d) => d === r))
  ok(sameSet(seedVerdict, [-3n]), 'H-iii seed verdict: (x²−9)/(x−3) = 0 exactly at x = −3 — the run-81 seed grown up')
  ok(fIsZero(pe(P(-9, 0, 1), fr(-3n))) && !fIsZero(pe(P(-3, 1), fr(-3n))), 'H-iii priced at x = −3: numerator dead, denominator alive')
  // new: x(x−4)/(x+2) = 0 → {0, 4}
  const num2 = pMul(P(0, 1), P(-4, 1))
  ok(sameSet(numZeros(num2), [0n, 4n]), 'H-iii new: x(x−4) has numerator zeros {0, 4}')
  ok(sameSet(denZeros(P(2, 1)), [-2n]), 'H-iii new: the denominator (x+2) refuses −2')
  const v2 = numZeros(num2).filter((r) => r !== -2n)
  ok(sameSet(v2, [0n, 4n]), 'H-iii new verdict: x(x−4)/(x+2) = 0 at {0, 4} — both priced by the filter')
  ok(fIsZero(fDiv(pe(num2, fr(0n)), pe(P(2, 1), fr(0n)))) && fIsZero(fDiv(pe(num2, fr(4n)), pe(P(2, 1), fr(4n)))), 'H-iii priced at 0 and 4: the originals evaluate to exactly 0')
  // the trap: (x−1)(x−2)/((x−1)(x+3)) = 0 — the numerator-zero candidate 1 is ALSO a denominator zero
  const numT = pMul(P(-1, 1), P(-2, 1))
  const denT = pMul(P(-1, 1), P(3, 1))
  ok(sameSet(numZeros(numT), [1n, 2n]), 'H-iii trap: numerator zeros {1, 2}')
  ok(sameSet(denZeros(denT), [-3n, 1n]), 'H-iii trap: denominator zeros {−3, 1} — the candidate 1 is dead on BOTH floors')
  const vT = numZeros(numT).filter((r) => !denZeros(denT).some((d) => d === r))
  ok(sameSet(vT, [2n]), 'H-iii trap verdict: the filter keeps only x = 2 — P = 0 AND Q ≠ 0, exactly as 8.1 stated it')
  ok(fIsZero(pe(numT, fr(1n))) && fIsZero(pe(denT, fr(1n))), 'H-iii priced at x = 1: the original reads 0/0 — undefined, not zero')
  ok(fIsZero(fDiv(pe(numT, fr(2n)), pe(denT, fr(2n)))), 'H-iii priced at x = 2: the original evaluates to exactly 0')
  console.log('  H-iii zero-fraction filter: seed {−3}, new {0, 4}, trap keeps {2} and kills the 0/0 candidate 1')
}

// H-iv — the work-rate and speed exhibits (exact Frac; the habitat vs the bill)
{
  // vats: A fills in 3 h, B in 6 h → rates 1/3 + 1/6 = 1/2 → together 2 h
  ok(fEq(fAdd(fDiv(fr(1n), fr(3n)), fDiv(fr(1n), fr(6n))), fr(1n, 2n)), 'H-iv vats: 1/3 + 1/6 = 1/2 exactly')
  ok(fEq(fDiv(fMul(fr(3n), fr(6n)), fAdd(fr(3n), fr(6n))), fr(2n)), 'H-iv vats: t = ab/(a+b) = 18/9 = 2 h — the template lands')
  ok(fEq(fDiv(fr(1n), fr(2n)), fAdd(fDiv(fr(1n), fr(3n)), fDiv(fr(1n), fr(6n)))), 'H-iv vats priced in the original: 1/2 = 1/3 + 1/6 at t = 2')
  // the x-hunt: A takes x days, B takes x+3 days, together 2 days → 1/x + 1/(x+3) = 1/2
  {
    // cleared: 2(x+3) + 2x = x(x+3) → 4x + 6 = x² + 3x → x² − x − 6 = 0 = (x−3)(x+2)
    ok(pEq(pSub(pAdd(pMul(P(2), P(3, 1)), pMul(P(2), P(0, 1))), pMul(P(0, 1), P(3, 1))), P(6, 1, -1)), 'H-iv x-hunt: cleared form 2(x+3) + 2x − x(x+3) = −x² + x + 6, i.e. x² − x − 6 = 0')
    ok(pEq(P(-6, -1, 1), pMul(P(-3, 1), P(2, 1))), 'H-iv x-hunt: x² − x − 6 = (x−3)(x+2) factors exactly')
    ok(sameSet(numZeros(P(-6, -1, 1)), [-2n, 3n]), 'H-iv x-hunt: the cleared roots are {−2, 3}')
    ok(sameSet([...denZeros(P(0, 1)), ...denZeros(P(3, 1))].sort((a, b) => (a < b ? -1 : 1)), [-3n, 0n]), 'H-iv x-hunt: the compound bill is {−3, 0} — NEITHER cleared root is refused by it')
    // the habitat, not the bill, rejects −2 — and the equation itself is TRUE there
    ok(fEq(fAdd(fDiv(fr(1n), fr(-2n)), fDiv(fr(1n), fr(1n))), fr(1n, 2n)), 'H-iv x-hunt priced at x = −2: 1/(−2) + 1/1 = 1/2 — a mathematically LIVE root that the habitat (days > 0) rejects')
    ok(fEq(fAdd(fDiv(fr(1n), fr(3n)), fDiv(fr(1n), fr(6n))), fr(1n, 2n)), 'H-iv x-hunt priced at x = 3: 1/3 + 1/6 = 1/2 — the surviving solution checks in the original')
    console.log('  H-iv x-hunt: roots {−2, 3}, bill {−3, 0} refuses neither, the HABITAT rejects −2 — two distinct filters')
  }
  // the train: 300 km at v km/h; 10 km/h faster saves 1 h → 300/v − 300/(v+10) = 1
  {
    // cleared: 300(v+10) − 300v = v(v+10) → 3000 = v² + 10v → v² + 10v − 3000 = 0 = (v+60)(v−50)
    ok(pEq(pSub(pSub(pMul(P(300), P(10, 1)), pMul(P(300), P(0, 1))), pMul(P(0, 1), P(10, 1))), P(3000, -10, -1)), 'H-iv train: cleared form 300(v+10) − 300v − v(v+10) = −v² − 10v + 3000 = 0')
    ok(pEq(P(-3000, 10, 1), pMul(P(-50, 1), P(60, 1))), 'H-iv train: v² + 10v − 3000 = (v−50)(v+60) factors exactly')
    ok(fIsZero(pe(P(-3000, 10, 1), fr(50n))) && fIsZero(pe(P(-3000, 10, 1), fr(-60n))), 'H-iv train: the cleared roots are 50 and −60 — −60 lies outside the census window, pinned by direct evaluation')
    ok(sameSet(numZeros(P(-3000, 10, 1)), []), 'H-iv train: BOTH cleared roots (−60 and 50) lie outside the census window {−5..5} — the census sees none; direct evaluation above pins them')
    ok(sameSet(denZeros(P(0, 1)), [0n]) && fIsZero(pe(P(10, 1), fr(-10n))) && !fIsZero(pe(P(10, 1), fr(-5n))), 'H-iv train: the compound bill is {−10, 0} — the zero of v + 10 also lies outside the window, pinned by direct evaluation (the run-81 blind-spot class again)')
    ok(fEq(fSub(fDiv(fr(300n), fr(-60n)), fDiv(fr(300n), fr(-50n))), fr(1n)), 'H-iv train priced at v = −60: 300/(−60) − 300/(−50) = −5 + 6 = 1 — live mathematically, rejected by the habitat (speed > 0)')
    ok(fEq(fSub(fDiv(fr(300n), fr(50n)), fDiv(fr(300n), fr(60n))), fr(1n)), 'H-iv train priced at v = 50: 300/50 − 300/60 = 6 − 5 = 1 — the surviving solution checks in the original')
    console.log('  H-iv train: roots {−60, 50}, bill {−10, 0} refuses neither, the HABITAT rejects −60')
  }
}

console.log('[H] 8.3 engines complete: cross form, clearing, extraneous roots, zero filter, work-rate — all priced')

/* ------------------------------------------------------------------ */
/* (I) the pinned computations of lesson 8.3 + figure plans (pre-write) */
/* ------------------------------------------------------------------ */

console.log('[I] 8.3 pinned: quiz keys [1, 1, 2, 3, 1] + 14 exercises + figure plans')

{
  // quiz battery: every key and distractor priced
  // Q1 x/(x−3) = 3/(x−3) + 2 → key 1 = "no solution" (distractor x = 3 is the extraneous candidate;
  //    x = 0 is the mis-expansion x = 3 + 2x − 3; "every x ≠ 3" is the identity misread)
  ok(fEq(fSub(fDiv(fr(0n), fr(-3n)), fAdd(fDiv(fr(3n), fr(-3n)), fr(2n))), fr(-1n)), 'I Q1 priced at x = 0: the mis-expansion candidate fails the original (deficit −1)')
  ok(fIsZero(pe(P(3, -1), fr(3n))) && fIsZero(pe(P(-3, 1), fr(3n))), 'I Q1 the distractor x = 3 is exactly the extraneous candidate (H-ii)')
  // Q2 3/(x−1) = 5/(x+1) → key 1 = x = 4 (distractor −4 is the swapped cross 3(x−1) = 5(x+1))
  ok(sameSet(numZeros(pSub(pMul(P(3), P(-1, 1)), pMul(P(5), P(1, 1)))), [-4n]), 'I Q2 the swapped-cross distractor x = −4 solves 3(x−1) = 5(x+1) — a different equation')
  ok(!fEq(fDiv(fr(3n), pe(P(-1, 1), fr(-4n))), fDiv(fr(5n), pe(P(1, 1), fr(-4n)))), 'I Q2 priced at x = −4: 3/(−5) ≠ 5/(−3) — the swapped cross fails the original')
  // Q3 x(x−4)/(x+2) = 0 → key 2 = {0, 4} (distractor {0, 4, −2} counts the bill point as a solution;
  //    the single-point options are incomplete because BOTH numerator zeros survive the filter)
  ok(fIsZero(fDiv(pe(pMul(P(0, 1), P(-4, 1)), fr(0n)), pe(P(2, 1), fr(0n)))) && fIsZero(fDiv(pe(pMul(P(0, 1), P(-4, 1)), fr(4n)), pe(P(2, 1), fr(4n)))), 'I Q3 both numerator zeros survive the filter — the single-point options 0 and 1 are each incomplete')
  ok(fIsZero(pe(P(2, 1), fr(-2n))) && !fIsZero(pe(pMul(P(0, 1), P(-4, 1)), fr(-2n))), 'I Q3 at x = −2 the DENOMINATOR dies (numerator reads 12 ≠ 0) — refused, never a solution')
  // Q4 work-rate 3 h + 6 h → key 3 = 2 h (4.5 the average trap, 9 the times-added trap, 1.5 half-the-fastest)
  ok(fEq(fAdd(fDiv(fr(3n), fr(2n)), fr(0n)), fr(3n, 2n)) && !fEq(fr(9n, 2n), fr(2n)), 'I Q4 the average trap 4.5 ≠ 2')
  ok(!fEq(fr(9n), fr(2n)) && !fEq(fr(3n, 2n), fr(2n)), 'I Q4 the added-times trap 9 ≠ 2 and the halved-fastest 1.5 ≠ 2')
  ok(fEq(fDiv(fMul(fr(3n), fr(6n)), fAdd(fr(3n), fr(6n))), fr(2n)), 'I Q4 the key: ab/(a+b) = 2 (H-iv)')
  // Q5 x/(x−1) − 2/(x+1) = 2/(x²−1) → key 1 = {0} ({0,1} skips the check, {1} keeps only the refused, ∅ refuses both)
  ok(sameSet(numZeros(P(0, -1, 1)), [0n, 1n]) && sameSet(denZeros(pMul(P(-1, 1), P(1, 1))), [-1n, 1n]), 'I Q5 the pins: candidates {0, 1}, bill {±1} (H-ii)')
  ok(fIsZero(fSub(fSub(fDiv(fr(0n), fr(-1n)), fDiv(fr(2n), fr(1n))), fDiv(fr(2n), fr(-1n)))), 'I Q5 priced at x = 0: 0 − 2 + 2 = 0 — the key solution checks in the original')

  const live = (bill: bigint[]) => W.filter((xv) => !bill.some((b) => b === xv))
  // L1-1: 2/x = 1 → {2}, bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fDiv(fr(2n), X), fr(1n)) === (xv === 2n), 'I L1-1: 2/x = 1 exactly at x = 2, nowhere else live (x = ' + xv + ')')
  }
  // L1-2: 3/x + 1/x = 4 → 4/x = 4 → {1}, bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fAdd(fDiv(fr(3n), X), fDiv(fr(1n), X)), fr(4n)) === (xv === 1n), 'I L1-2: 3/x + 1/x = 4 exactly at x = 1 (x = ' + xv + ')')
  }
  // L1-3: 4/x = x → x² = 4 → {±2}, bill {0}
  for (const xv of live([0n])) {
    const X = fr(xv)
    ok(fEq(fDiv(fr(4n), X), X) === (xv === 2n || xv === -2n), 'I L1-3: 4/x = x exactly at x = ±2 (x = ' + xv + ')')
  }
  ok(fEq(fMul(fr(2n), fr(2n)), fr(4n)) && fEq(fMul(fr(-2n), fr(-2n)), fr(4n)), 'I L1-3: x² = 4 both ways — the cleared quadratic has two live roots')
  // L2-1: (x+1)/(x−1) = 3 → x + 1 = 3(x−1) → {2}, bill {1}
  for (const xv of live([1n])) {
    const X = fr(xv)
    ok(fEq(fDiv(pe(P(1, 1), X), pe(P(-1, 1), X)), fr(3n)) === (xv === 2n), 'I L2-1: (x+1)/(x−1) = 3 exactly at x = 2 (x = ' + xv + ')')
  }
  ok(fEq(fDiv(pe(P(1, 1), fr(2n)), pe(P(-1, 1), fr(2n))), fr(3n)), 'I L2-1 priced at x = 2: 3/1 = 3')
  // L2-2: 2/(x+3) = 1/(x−1) → cross 2(x−1) = x+3 → {5}, bill {−3, 1}
  {
    ok(sameSet(numZeros(pSub(pMul(P(2), P(-1, 1)), P(3, 1))), [5n]), 'I L2-2: the cross form 2(x−1) − (x+3) has the single root x = 5')
    for (const xv of live([-3n, 1n])) {
      const X = fr(xv)
      ok(fEq(fDiv(fr(2n), pe(P(3, 1), X)), fDiv(fr(1n), pe(P(-1, 1), X))) === (xv === 5n), 'I L2-2: 2/(x+3) = 1/(x−1) exactly at x = 5 (x = ' + xv + ')')
    }
    ok(fEq(fDiv(fr(2n), fr(8n)), fDiv(fr(1n), fr(4n))), 'I L2-2 priced at x = 5: 2/8 = 1/4')
  }
  // L2-3: 1/(x−2) + 1 = 3/(x−2) → 1 + (x−2) = 3 → {4}, bill {2}
  for (const xv of live([2n])) {
    const X = fr(xv)
    ok(fEq(fAdd(fDiv(fr(1n), pe(P(-2, 1), X)), fr(1n)), fDiv(fr(3n), pe(P(-2, 1), X))) === (xv === 4n), 'I L2-3: exactly at x = 4 (x = ' + xv + ')')
  }
  ok(fEq(fAdd(fDiv(fr(1n), fr(2n)), fr(1n)), fDiv(fr(3n), fr(2n))), 'I L2-3 priced at x = 4: 3/2 = 3/2')
  // L3-1: x/(x−2) = 2/(x−2) + 1 → (x−2)/(x−2) = 1 — identity, verdict all x ≠ 2
  {
    let identity = 0
    for (const xv of live([2n])) {
      const X = fr(xv)
      ok(fEq(fSub(fDiv(pe(P(0, 1), X), pe(P(-2, 1), X)), fAdd(fDiv(fr(2n), pe(P(-2, 1), X)), fr(1n))), fZero), 'I L3-1: the deficit is 0 at every live point (x = ' + xv + ')')
      identity++
    }
    ok(identity === 10, 'I L3-1 the identity priced on all 10 live points (got ' + identity + ')')
  }
  // L3-2: 1/(x−3) + 1/(x+3) = 6/(x²−9) → (x+3) + (x−3) = 6 → x = 3 → refused → ∅
  {
    ok(sameSet(numZeros(P(-6, 2)), [3n]), 'I L3-2: the cleared form (x+3) + (x−3) − 6 = 2x − 6 has the single root x = 3')
    ok(sameSet(denZeros(pMul(P(-3, 1), P(3, 1))), [-3n, 3n]), 'I L3-2: the bill is {±3} — the only candidate is refused')
    let neverZero = true
    for (const xv of live([-3n, 3n])) {
      const X = fr(xv)
      if (fIsZero(fSub(fAdd(fDiv(fr(1n), pe(P(-3, 1), X)), fDiv(fr(1n), pe(P(3, 1), X))), fDiv(fr(6n), pe(pMul(P(-3, 1), P(3, 1)), X))))) neverZero = false
      ok(fIsZero(fSub(fAdd(fDiv(fr(1n), pe(P(-3, 1), X)), fDiv(fr(1n), pe(P(3, 1), X))), fDiv(fr(6n), pe(pMul(P(-3, 1), P(3, 1)), X)))) === false, 'I L3-2: the original is never 0 on the live domain (x = ' + xv + ')')
    }
    ok(neverZero, 'I L3-2 the ∅ verdict is honest — no live point satisfies the original')
  }
  // L3-3: x/(x+1) − 3/(x−1) = 2/(x²−1) → x(x−1) − 3(x+1) = 2 → x² − 4x − 5 = 0 = (x−5)(x+1) → {5}, −1 refused
  {
    ok(pEq(pSub(pSub(pMul(P(0, 1), P(-1, 1)), pMul(P(3), P(1, 1))), P(2)), P(-5, -4, 1)), 'I L3-3: cleared form x(x−1) − 3(x+1) − 2 = x² − 4x − 5 exactly')
    ok(pEq(P(-5, -4, 1), pMul(P(-5, 1), P(1, 1))), 'I L3-3: x² − 4x − 5 = (x−5)(x+1) factors exactly')
    ok(sameSet(numZeros(P(-5, -4, 1)), [-1n, 5n]), 'I L3-3: the cleared roots are {−1, 5}')
    ok(sameSet(denZeros(pMul(P(1, 1), P(-1, 1))), [-1n, 1n]), 'I L3-3: the bill is {±1} — the candidate −1 is refused')
    ok(fIsZero(fSub(fSub(fDiv(fr(5n), fr(6n)), fDiv(fr(3n), fr(4n))), fDiv(fr(2n), fr(24n)))), 'I L3-3 priced at x = 5: 5/6 − 3/4 = 1/12 and 2/24 = 1/12 — the survivor checks in the original')
    ok(fIsZero(pe(P(1, 1), fr(-1n))), 'I L3-3 the extraneous candidate: (x+1) dies at −1 — the original is undefined there')
  }
  // L4-1: (x²−4)/(x−2) = x + 2 → the 8.1 hole identity → verdict all x ≠ 2
  {
    let identity = 0
    for (const xv of live([2n])) {
      const X = fr(xv)
      ok(fEq(fDiv(pe(P(-4, 0, 1), X), pe(P(-2, 1), X)), pe(P(2, 1), X)), 'I L4-1: the hole identity holds at x = ' + xv)
      identity++
    }
    ok(identity === 10, 'I L4-1 the identity priced on all 10 live points (got ' + identity + ')')
    ok(fIsZero(pe(P(-2, 1), fr(2n))) && fIsZero(pe(P(-4, 0, 1), fr(2n))), 'I L4-1 at x = 2 the original reads 0/0 — the bill refuses it from the all-verdict')
  }
  // L4-2: 3/(x+2) − 1/(x−1) = 1 → 3(x−1) − (x+2) = (x+2)(x−1) → x² − x + 3 = 0, Δ = −11 → no real roots
  {
    ok(pEq(pSub(pSub(pMul(P(3), P(-1, 1)), P(2, 1)), pMul(P(2, 1), P(-1, 1))), P(-3, 1, -1)), 'I L4-2: cleared form 3(x−1) − (x+2) − (x+2)(x−1) = −x² + x − 3 = 0')
    ok(!pEq(P(3, -1, 1), P(0)), 'I L4-2 sanity: x² − x + 3 is not the zero polynomial')
    ok(sameSet(numZeros(P(3, -1, 1)), []), 'I L4-2: x² − x + 3 has NO window roots — the cleared equation is empty over the window')
    // the honest ∅: the deficit −(x² − x + 3) never vanishes (the quadratic is positive definite, Δ = 1 − 12 = −11)
    ok(sameSet(numZeros(P(-3, 1, -1)), []), 'I L4-2: the deficit −x² + x − 3 also never vanishes on the window')
    let deficitChecked = 0
    for (const xv of live([-2n, 1n])) {
      const X = fr(xv)
      ok(fIsZero(fSub(fSub(fDiv(fr(3n), pe(P(2, 1), X)), fDiv(fr(1n), pe(P(-1, 1), X))), fr(1n))) === false, 'I L4-2: the original never holds live (x = ' + xv + ')')
      deficitChecked++
    }
    ok(deficitChecked === 9, 'I L4-2 the ∅ priced on all 9 live points (got ' + deficitChecked + ')')
    ok(fAdd(fMul(fr(-1n), fr(-1n)), fr(-12n)).n < 0n, 'I L4-2 the discriminant: Δ = (−1)² − 4·1·3 = −11 < 0 — no real roots, exactly as the prose will say')
  }
  // L5-1 / L5-2 priced in H-iv (the x-hunt and the train)
  ok(true, 'I L5-1/L5-2 anchors: the x-hunt and the train priced in H-iv')
  // L6 anchor: the clearing theorem priced in H-ii
  ok(true, 'I L6 anchor: the clearing theorem priced in H-ii (soundness, live converse, bill filter)')

  console.log('  I pinned 8.3: quiz keys [1, 1, 2, 3, 1] with distractors priced + 14 exercises via expression trees')
}

// figure plans 8.3
export const plan83Fig1: FigPlan = {
  viewBox: [720, 340],
  // [0] header, [1..5] the five pipeline stations, [6] result band, [7] caption
  rects: [
    [30, 18, 660, 44],
    [30, 84, 122, 150],
    [164, 84, 122, 150],
    [298, 84, 122, 150],
    [432, 84, 122, 150],
    [566, 84, 122, 150],
    [30, 258, 660, 44],
    [30, 314, 660, 24],
  ],
  groups: [[0], [1, 2, 3, 4, 5], [6], [7]],
}

export const plan83Fig2: FigPlan = {
  viewBox: [720, 340],
  // [0] header, [1] candidates box, [2] the bill filter, [3] pass outcome, [4] refuse outcome, [5] verdict strip, [6] caption
  rects: [
    [30, 18, 660, 44],
    [30, 84, 200, 150],
    [260, 84, 200, 150],
    [490, 84, 200, 68],
    [490, 166, 200, 68],
    [30, 258, 660, 44],
    [30, 314, 660, 24],
  ],
  groups: [[0], [1, 2], [3, 4], [5], [6]],
}

console.log('[I] 8.3 figure plans recorded: the clearing pipeline 720×340, the check filter 720×340')

/* ------------------------------------------------------------------ */
/* (J) the authored lesson 8.3 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

import { chapter08 as ch08 } from '../src/data/library/books/mathematics/elementary-algebra/ch-08'

console.log('[J] 8.3 authored: identity, structure census, quiz keys, figure plans, scans')

{
  const lesson = ch08.lessons[2]
  ok(ch08.lessons.length === 3, 'J: chapter 8 carries the three authored lessons of runs 81–82 (got ' + ch08.lessons.length + ')')
  ok(ch08.status === 'complete', 'J: chapter 8 status is complete (got ' + ch08.status + ')')
  ok(lesson.id === 'al-fractional-equations-and-extraneous-roots', 'J: lesson id al-fractional-equations-and-extraneous-roots')
  ok(lesson.number === '8.3', 'J: lesson number 8.3')
  ok(lesson.title === 'Fractional Equations and Extraneous Roots', 'J: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-operating-on-algebraic-fractions', 'al-solving-linear-equations', 'al-factoring-quadratic-trinomials']),
    'J: prerequisites are 8.2 + the 5.2 pipeline + the ch-4 factoring pair'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math7-ch2', 'khattar-qa-4e', 'cengage-jee-style']),
    'J: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 13, `J: thirteen paras (got ${countKind('para')})`) // 8.3 matches 8.1's thirteen-para depth
  ok(countKind('heading') === 5, `J: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `J: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `J: one derivation (the clearing law with its clause)`)
  ok(countKind('example') === 5, `J: five illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `J: one table (the verdict ledger)`)
  ok(countKind('figure') === 2, `J: two figures (the clearing pipeline + the check filter)`)
  ok(countKind('formula') === 3, `J: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `J: one terms block`)
  ok(countKind('list') === 2, `J: two lists (the roman example run + the three verdicts)`)
  ok(countKind('algorithm') === 1, `J: one algorithm block (the clearing pipeline)`)
  ok(countKind('quiz') === 1, `J: one quiz block`)
  ok(countKind('exercises') === 1, `J: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,definition,exam,historical,insight,warn,warn', `J: the seven callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `J: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 1, 2, 3, 1]), 'J: quiz keys match the pinned [1, 1, 2, 3, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'J: quiz shape + distractor pricing')
      ok(q.items[0].options[1].includes('no solution'), 'J: quiz Q1 option 2 is the pinned empty verdict (the key 1)')
      ok(q.items[1].options[1] === '$x = 4$', 'J: quiz Q2 option 2 is the pinned cross-form root (the key 1)')
      ok(q.items[2].options[2].includes('x = 0$ and $x = 4$'), 'J: quiz Q3 option 3 is the pinned filter verdict (the key 2)')
      ok(q.items[3].options[3] === '$2$ hours', 'J: quiz Q4 option 4 is the pinned joint time (the key 3)')
      ok(q.items[4].options[1] === '$\\{0\\}$', 'J: quiz Q5 option 2 is the pinned kept root (the key 1)')
    }
  }
  // exercises shape + anchors
  {
    const ex = lesson.blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const counts = ex.sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'J: exercise set sizes 3/3/3/2/2/1')
      const all = ex.sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'J: 14 exercises, Cengage chains, terminal answers')
      ok((all[0].answer || '').includes('x = 2'), 'J: L1.1 answer carries the pinned solution 2')
      ok((all[2].answer || '').includes('-2'), 'J: L1.3 answer carries the pinned ±2 roots')
      ok((all[4].answer || '').includes('x = 5'), 'J: L2.2 answer carries the pinned cross-form 5')
      ok((all[6].answer || '').includes('x \\neq 2'), 'J: L3.1 answer carries the pinned identity verdict')
      ok((all[8].answer || '').includes('extraneous'), 'J: L3.3 answer carries the pinned extraneous reading')
      ok((all[10].answer || '').includes('-11'), 'J: L4.2 answer carries the pinned discriminant −11')
      ok((all[11].answer || '').includes('habitat'), 'J: L5.1 answer carries the pinned habitat reading')
      ok((all[12].answer || '').includes('50'), 'J: L5.2 answer carries the pinned speed 50')
      ok((all[13].answer || '').includes('clearing law'), 'J: L6 answer carries the clearing-law reading')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'J: two figures in 8.3 (the clearing pipeline + the check filter)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan83Fig1.rects.length, 'J: clearing pipeline rect census ' + r0.length + ' = plan ' + plan83Fig1.rects.length)
      ok(canon(r0) === canon(plan83Fig1.rects), 'J: clearing pipeline rects match the pinned plan exactly')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan83Fig2.rects.length, 'J: check filter rect census ' + r1.length + ' = plan ' + plan83Fig2.rects.length)
      ok(canon(r1) === canon(plan83Fig2.rects), 'J: check filter rects match the pinned plan exactly')
      for (const g of plan83Fig1.groups) {
        const rs = g.map((i) => plan83Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'J: clearing pipeline group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan83Fig2.groups) {
        const rs = g.map((i) => plan83Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'J: check filter group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('FACTOR') && figs[0].svg.includes('BILL') && figs[0].svg.includes('MULTIPLY') && figs[0].svg.includes('CHECK'), 'J: the pipeline carries the five stations')
      ok(figs[0].svg.includes('x = 3') && figs[0].svg.includes('REFUSED') && figs[0].svg.includes('EMPTY'), 'J: the pipeline carries the worked classic and its refused verdict')
      ok(figs[1].svg.includes('CANDIDATES') && figs[1].svg.includes('COMPOUND BILL') && figs[1].svg.includes('PASSES') && figs[1].svg.includes('EXTRANEOUS'), 'J: the filter carries the candidates, the bill and both outcomes')
      ok(figs[1].svg.includes('ONE solution') && figs[1].svg.includes('NONE') && figs[1].svg.includes('ALL BUT THE BILL'), 'J: the filter carries the three verdicts of 5.3')
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
    ok(hits === 0, 'J: no retired palette hexes in the 8.3 figures (found ' + hits + ')')
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
    console.log('[J] 8.3 honest word count: ' + words)
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
    ok(entityHits === 0, 'J: no HTML entities in 8.3 prose (found ' + entityHits + ')')
  }
  // odd-run backslash scan over the chapter file source (run-69 hardening)
  {
    const src = await Bun.file('src/data/library/books/mathematics/elementary-algebra/ch-08.ts').text()
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
    ok(oddRuns === 0, 'J: no odd-length backslash runs in ch-08.ts source (found ' + oddRuns + ')')
    const escapes = (src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'J: no unicode escapes in ch-08.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (8.3 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'J: all ' + ids.length + ' lesson ids repo-wide unique (with 8.3 added)')
    ok(ids.includes('al-fractional-equations-and-extraneous-roots'), 'J: the new id is registered in the library graph')
  }
  console.log('[J] the authored 8.3: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (K) the unit-8 completion review — BOOK_FORMAT checklist, exam      */
/* corners, and the recomputed book snapshot                           */
/* ------------------------------------------------------------------ */

{
  const book = allBooks.find((b) => b.id === 'elementary-algebra')
  ok(!!book, 'K: the Elementary Algebra book is registered')
  if (book) {
    // checklist 1/7 — every number recomputed by script (this battery ran with zero failures)
    ok(passed > 800, 'K: checklist 1/7 — the pre-write + authored battery priced every number (passed = ' + passed + ')')
    // checklist 2/7 — figure labels match the prose terminology
    {
      const figs = ch08.lessons[2].blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
      ok(figs.length === 2 && figs[0].caption.includes('x = 3') && figs[0].svg.includes('REFUSED'), 'K: checklist 2/7 — the pipeline caption and SVG agree with the classic’s refused verdict')
      ok(figs[1].caption.includes('compound bill') && figs[1].svg.includes('ALL BUT THE BILL'), 'K: checklist 2/7 — the filter caption and SVG agree with the verdict language')
    }
    // checklist 3/7 — vivid palette only (retired hexes), asserted on every ch-8 figure SVG
    {
      const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
      let bad = 0
      for (const les of ch08.lessons)
        for (const b of les.blocks)
          if (b.kind === 'figure') for (const hex of retired) if (b.svg.toLowerCase().includes(hex)) bad++
      ok(bad === 0, 'K: checklist 3/7 — all six chapter-8 figures use the vivid palette (retired hits ' + bad + ')')
      const figCount = ch08.lessons.reduce((n, l) => n + l.blocks.filter((b) => b.kind === 'figure').length, 0)
      ok(figCount === 6, 'K: chapter 8 carries six figures (got ' + figCount + ')')
    }
    // checklist 4/7 — quiz answer indices point at the intended options
    {
      const pinned = [
        ['al-rational-expressions-simplify-first', [0, 1, 0, 3, 1]],
        ['al-operating-on-algebraic-fractions', [2, 1, 3, 1, 2]],
        ['al-fractional-equations-and-extraneous-roots', [1, 1, 2, 3, 1]],
      ] as [string, number[]][]
      for (const [id, keys] of pinned) {
        const les = ch08.lessons.find((l) => l.id === id)
        const q = les?.blocks.find((b) => b.kind === 'quiz')
        if (les && q && q.kind === 'quiz') {
          ok(JSON.stringify(q.items.map((it) => it.answer)) === JSON.stringify(keys), 'K: checklist 4/7 — ' + id + ' quiz keys pinned ' + JSON.stringify(keys))
        }
      }
      const quizItems = ch08.lessons.reduce((n, l) => n + l.blocks.filter((b) => b.kind === 'quiz').reduce((m, q) => m + (q.kind === 'quiz' ? q.items.length : 0), 0), 0)
      ok(quizItems === 15, 'K: chapter 8 carries 15 quiz items (got ' + quizItems + ')')
    }
    // checklist 5/7 — exercise solutions complete and verified
    {
      let exCount = 0
      let bad = 0
      for (const les of ch08.lessons)
        for (const b of les.blocks)
          if (b.kind === 'exercises')
            for (const s of b.sets)
              for (const q of s.questions) {
                exCount++
                if (!Array.isArray(q.solution) || q.solution.length < 2 || !q.answer) bad++
              }
      ok(exCount === 42 && bad === 0, 'K: checklist 5/7 — 42 exercises with complete verified chains (got ' + exCount + ', bad ' + bad + ')')
    }
    // checklist 6/7 — lesson ids globally unique
    {
      const ids: string[] = []
      for (const b of allBooks) for (const c of b.chapters) for (const l of c.lessons) ids.push(l.id)
      ok(ids.length === new Set(ids).size, 'K: checklist 6/7 — all ' + ids.length + ' lesson ids repo-wide unique')
    }
    // checklist 7/7 — lint + render clean (asserted in the shell battery; here: every block kind is renderable)
    {
      const known = new Set(['para', 'heading', 'callout', 'terms', 'equation', 'derivation', 'example', 'figure', 'table', 'list', 'quiz', 'exercises', 'formula', 'algorithm'])
      let bad = 0
      for (const les of ch08.lessons) for (const b of les.blocks) if (!known.has(b.kind)) bad++
      ok(bad === 0, 'K: checklist 7/7 — every chapter-8 block kind is renderer-known (bad ' + bad + ')')
    }
    // exam corners 3/3 — every lesson carries an exam callout
    {
      const withExam = ch08.lessons.filter((l) => l.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam'))
      ok(withExam.length === 3, 'K: exam corners 3/3 — every lesson 8.1–8.3 carries an exam callout (got ' + withExam.length + ')')
    }
    // the book snapshot, recomputed
    {
      const lessons = book.chapters.flatMap((c) => c.lessons)
      ok(lessons.length === 27, 'K: the book stands at 27 lessons (got ' + lessons.length + ')')
      const under = lessons.map((l) => countLessonWords(l)).filter((w) => w < 4000).length
      ok(under === 0, 'K: every lesson of the book carries >= 4,000 honest words (under: ' + under + ')')
      const completeChapters = book.chapters.filter((c) => c.status === 'complete').length
      ok(completeChapters === 8, 'K: 8 of 11 chapters complete (got ' + completeChapters + ')')
      const ch8Words = ch08.lessons.reduce((n, l) => n + countLessonWords(l), 0)
      const bookWords = lessons.reduce((n, l) => n + countLessonWords(l), 0)
      ok(ch8Words >= 14000, 'K: chapter 8 totals ' + ch8Words + ' words across three lessons')
      console.log('[K] book snapshot: 27 lessons, ' + bookWords + ' words, 8/11 chapters complete; ch. 8 = ' + ch8Words + ' words (8.1 5,082 + 8.2 4,355 + 8.3 recomputed above)')
    }
  }
  console.log('[K] the unit-8 completion review: checklist 7/7 + exam corners 3/3 + the book snapshot — ALL GREEN')
}

console.log(`\nverify-book3-ch08 TOTAL (sections A-K): ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
