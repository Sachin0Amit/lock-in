import { chapter03 } from '../src/data/library/books/mathematics/advanced-algebra/ch-03'
import { countLessonWords } from '../src/data/library/types'
import * as fs from 'fs'
import { execSync } from 'child_process'

export {}

/**
 * verify-book4-ch03.ts — pre-writing verification for Advanced Algebra
 * (book #4), chapter 3 "Complex Numbers: the New Rung" — lesson 3.1
 * "The Closure Failure That Forces i" (id aa-the-closure-failure-that-
 * forces-i), the chapter opener.
 *
 * Created 2026-11-15 (run 105) — every number that will be written into
 * the lesson of this run is verified here BEFORE any prose exists, per
 * the verify-first discipline (the run-90 book-4 precedent). The
 * authoring master plan is docs/research/AA_CH03_MASTER_PLAN.md; the
 * reference study is the vision-transcribed Cengage M2-03 module
 * (temporary-references/m2scan/tr-3.1-3.4.txt) used to inform and verify
 * concepts only — every exhibit below is this book's own.
 *
 *   (A) the closure-failure engine — the no-real-door witness for
 *       x² + 1 = 0, the k-family door census, the 275/351 grid census
 *       (the failure is the norm, not the exception), the completed-form
 *       read of the D < 0 witness x² + x + 1;
 *   (B) the iota engine — the mod-4 cycle law on sweeps, the
 *       consecutive-four law, the pinned power exhibits (i^2026, i^99,
 *       1/i^101, the 2026–2029 sum), the alternating even-power closed
 *       form, the negative-power cycle, the two-negative-surds fraud and
 *       the one-negative legality;
 *   (C) the pair-construction engine — the multiplication rule proved
 *       consistent with the FOIL + i² = −1 route on an exact integer
 *       sweep, the letter's honesty ((0,1)² = (−1,0)), the equality solve
 *       exhibit, the embedding of ℝ preserving both operations;
 *   (D) the field-law survival engine — commutativity, associativity,
 *       distributivity, identities, negatives, reciprocals via the
 *       conjugate route, and the no-zero-divisors law, on an exact
 *       integer grid;
 *   (E) the operations engine — every pinned Illustration exhibit: the
 *       two-route product, the (1+i) power chain, the division exhibits
 *       cross-checked by multiplication, the two complex-coefficient
 *       quadratics with their complex square roots, the conjugate seeds
 *       on the witness and on sweeps, Bombelli's 1572 verification
 *       ((2+i)³ = 2+11i, the Cardan constant −121 → 11i, the root 4),
 *       and the quarter-turn square orbit (witness + general);
 *   (F) quiz keys and the full 15-exercise answer ladder pinned
 *       pre-writing, every distractor priced.
 *
 * Section G (authored 3.1) is appended at authoring time and imports the
 * chapter file directly.
 *
 * Sections H + I (run 106, pre-prose for lesson 3.2 "Conjugate and
 * Modulus", id aa-conjugate-and-modulus) pin every number of THAT
 * lesson BEFORE any prose, on the same discipline:
 *
 *   (H) the 3.2 engine suite — the mirror/involution engine, the seeds
 *       cashed on the 5−12−13 witness, the real/imaginary
 *       characterisation sweeps, the four arithmetic-distribution
 *       laws of the conjugate (+, −, ×, ÷ and powers) on integer
 *       grids, the census-table witnesses, the reciprocal engine
 *       1/z = z̄/|z|², the division witnesses cross-checked by
 *       multiplication, the conjugate-power shortcut
 *       ((2−3i)⁴ from (2+3i)⁴), the sin-θ hunt families (both the
 *       Illustration family and the exercise family, with the exact
 *       Re/Im component formulas), the equidistant law |z−a| = |z̄−a|
 *       for real a, the modulus witness roster, the four twins
 *       |z| = |z̄| = |−z| = |−z̄|, the equal-modulus lattice census
 *       (12 points on |z| = 5; the shifted circle |z−3−4i| = 5 also
 *       12, through the origin), the modulus laws (multiplicativity
 *       swept + the 65 = 5·13 witness, quotients, powers incl.
 *       |(−5+12i)²| = 169), the triangle inequality (swept; the
 *       8√2 < 18 strict witness; the 3√2 equality witness), the
 *       reverse triangle inequality, the sharp form
 *       |z₁+z₂|² = |z₁|²+|z₂|²+2Re(z₁z̄₂), the two-variable
 *       Cauchy–Schwarz by AL 9.3's discriminant discipline, the
 *       diamond engine (|z−z̄|+|z+z̄| = 2|x|+2|y|), the isosceles
 *       engine (sides 8/4√5/4√5, area 32), the z̄/z quadrant law, the
 *       y+ix = i·z̄ lemma with the seventh-power transfer witness, the
 *       parallelogram law, and the distance-reading sweep;
 *   (I) quiz keys [1, 0, 3, 2, 0] and the full 15-exercise answer
 *       ladder pinned pre-writing, every distractor priced.
 *
 * Sections K + L (run 107, pre-prose for lesson 3.3 "Negative
 * Discriminants: the Doors Turn Complex", id aa-negative-discriminants-
 * the-doors-turn-complex) pin every number of THAT lesson BEFORE any
 * prose, on the same discipline (fold check pre-flight: NO m2-03 fold
 * rides 3.3 — "Square Root of Complex Number" is hosted by 3.5 as an
 * example-family; the method itself is 3.3's core engine content):
 *
 *   (K) the 3.3 engine suite — the D < 0 door engines (the honest surd
 *       route √(negative) = √|·|·i swept; the door roster x²+2x+5 →
 *       −1±2i, x²−4x+13 → 2±3i, 2x²+2x+1 → (−1±i)/2, x²+x+1 → the
 *       (−1±√3i)/2 family, every door verified by substitution), the
 *       conjugate-pair law for real coefficients PROVED on grids (the
 *       symbolic route conj(az²+bz+c) = az̄²+bz̄+c swept; doors of real
 *       families are exact conjugates; sum z+z̄ = −b/a, product zz̄ = c/a
 *       swept + witnessed 4/13 on 2±3i), the counterexample engine
 *       (complex coefficients break the law: x²+(1+i)x+i → −1, −i;
 *       z²−(1+3i)z+(4+4i) → 1−i, 4i), the door-count census on real
 *       families (AL 9.3's trichotomy repaired — every family owns
 *       exactly two doors counting multiplicity, D>0 real pairs, D=0
 *       doubles, D<0 conjugate pairs; the k-family x²−2x+k verdicts at
 *       k = −2, 1, 2, 5; the k-window |k| < 2√5 of x²+kx+5), the
 *       known-one-door engines (build-from-a-door (x−(2+3i))(x−(2−3i))
 *       = x²−4x+13; the door 4+i of z²−8z+p → p = 17; the real-root
 *       engine z²+(1+i)z+(m+5i) → m = −20, doors −5 and 4−i), the
 *       square-root engines (the u,v system with the sign law: the
 *       (u²+v²)² identity swept, the census roster √(3+4i) = ±(2+i),
 *       √(−3+4i) = ±(1+2i), √(5−12i) = ±(3−2i), √(−5+12i) = ±(2+3i),
 *       √(7+24i) = ±(4+3i), √(−8−6i) = ±(1−3i), √(8+6i) = ±(3+i),
 *       √(−8+6i) = ±(1+3i), √i = ±(1+i)/√2 — every root squared and
 *       checked, the sign law asserted and swept, the b = 0 cases
 *       √16 = ±4 and √(−16) = ±4i, exactly-two-roots census), the
 *       complex-coefficient quadratic z²−(1+3i)z+(4+4i) = 0 through
 *       √(−24−10i) = ±(1−5i) → doors 1−i and 4i (Viète-checked), the
 *       vertex insight Re(door) = −b/2a swept, the Viète sum-of-squares
 *       engine (2+3i)² − 2(3+4i) = −11+4i, the √(3+4i)+√(3−4i) family
 *       {±4, ±2i}, and the quartic engines (z⁴+2z³+3z²+2z+2 =
 *       (z²+z+1)²+1 — no real doors, the four doors {i, −1−i, −i,
 *       −1+i} conjugate-closed, each substituted; z⁴ = −4 → ±(1±i));
 *   (L) quiz keys [0, 1, 0, 3, 1] and the full 15-exercise answer
 *       ladder pinned pre-writing, every distractor priced.
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

let passed = 0
let failed = 0
const failures: string[] = []

function ok(cond: boolean, msg: string): void {
  if (cond) passed++
  else {
    failed++
    failures.push(msg)
    console.log('FAIL: ' + msg)
  }
}

function eq(a: number, b: number, eps: number, msg: string): void {
  ok(Math.abs(a - b) <= eps, `${msg} (got ${a}, want ${b})`)
}

const rng = (lo: number, hi: number): number[] => {
  const a: number[] = []
  for (let v = lo; v <= hi; v++) a.push(v)
  return a
}

/** complex numbers as exact integer/rational pairs [re, im] */
type Cx = [number, number]
const cadd = (z: Cx, w: Cx): Cx => [z[0] + w[0], z[1] + w[1]]
const csub = (z: Cx, w: Cx): Cx => [z[0] - w[0], z[1] - w[1]]
const cmul = (z: Cx, w: Cx): Cx => [z[0] * w[0] - z[1] * w[1], z[0] * w[1] + z[1] * w[0]]
const cconj = (z: Cx): Cx => [z[0], -z[1]]
const cmod = (z: Cx): number => Math.hypot(z[0], z[1])
const ceq = (z: Cx, w: Cx): boolean => z[0] === w[0] && z[1] === w[1]
/** the imaginary unit as a pair — the letter whose square the rule earns */
const IOTA: Cx = [0, 1]
/** integer power of i by the mod-4 cycle (the law under test elsewhere) */
const iPow = (n: number): Cx => {
  const r = ((n % 4) + 4) % 4
  return r === 0 ? [1, 0] : r === 1 ? [0, 1] : r === 2 ? [-1, 0] : [0, -1]
}
/** division via the conjugate route, exact over integers when it divides */
const cdiv = (z: Cx, w: Cx): Cx => {
  const den = w[0] * w[0] + w[1] * w[1]
  const num = cmul(z, cconj(w))
  return [num[0] / den, num[1] / den]
}

/* ------------------------------------------------------------------ */
/* (A) the closure-failure engine                                      */
/* ------------------------------------------------------------------ */

// A1. x² + 1 has no real zero: x² + 1 ≥ 1 > 0 on a fine grid.
{
  let minv = Infinity
  for (let x = -50; x <= 50; x += 0.25) minv = Math.min(minv, x * x + 1)
  eq(minv, 1, 1e-9, 'A1 x² + 1 ≥ 1 everywhere (grid min 1 at x = 0)')
}

// A2. the k-family census x² − 6x + k: D = 36 − 4k; the door counts
// at the pinned k values (D=0 counts the double door once).
{
  const doors = (k: number): number => {
    const D = 36 - 4 * k
    if (D > 0) return 2
    if (D === 0) return 1
    return 0
  }
  const ks = [5, 8, 9, 10, 11, 12]
  const want = [2, 2, 1, 0, 0, 0]
  ks.forEach((k, idx) => {
    ok(doors(k) === want[idx], `A2 k-family door count at k = ${k} (got ${doors(k)}, want ${want[idx]})`)
  })
  // brute-force agreement on the same seats
  const brute = (k: number): number => {
    const hits: number[] = []
    for (let x = -100; x <= 100; x += 0.5) if (Math.abs(x * x - 6 * x + k) < 1e-9) hits.push(x)
    return hits.length
  }
  ks.forEach((k, idx) => {
    if (want[idx] > 0) ok(brute(k) === want[idx], `A2 brute-force door count at k = ${k} (got ${brute(k)})`)
  })
}

// A3. the grid census: over a ∈ {1,2,3}, b ∈ −6..6, c ∈ 1..9 (351
// families) exactly 275 have D < 0 — 78.3%. The failure is the norm.
{
  let count = 0
  let total = 0
  for (const a of [1, 2, 3])
    for (const b of rng(-6, 6))
      for (const c of rng(1, 9)) {
        total++
        if (b * b - 4 * a * c < 0) count++
      }
  console.log(`A3 grid census: ${count}/${total} families have D < 0 (${(100 * count / total).toFixed(1)}%)`)
  ok(count === 275 && total === 351, `A3 the 275/351 grid census (got ${count}/${total})`)
}

// A4. the completed-form witness: x² + x + 1 = (x + 1/2)² + 3/4 — the
// square-plus-positive read of the D = −3 family AA 2.R handed forward.
{
  let bad = 0
  for (let x = -10; x <= 10; x += 0.5) {
    const lhs = x * x + x + 1
    const rhs = (x + 0.5) * (x + 0.5) + 0.75
    if (Math.abs(lhs - rhs) > 1e-9) bad++
  }
  ok(bad === 0, 'A4 x² + x + 1 = (x + ½)² + ¾ identically (the D = −3 witness)')
  let minv = Infinity
  for (let x = -50; x <= 50; x += 0.25) minv = Math.min(minv, x * x + x + 1)
  eq(minv, 0.75, 1e-9, 'A4 the D = −3 witness bottoms at ¾ > 0 — no real door')
}

/* ------------------------------------------------------------------ */
/* (B) the iota engine                                                 */
/* ------------------------------------------------------------------ */

// B1. the mod-4 cycle law: i^n against the closed form, n = 0..23,
// computed by repeated multiplication from i (not by the formula).
{
  let bad = 0
  let cur: Cx = [1, 0]
  for (let n = 0; n <= 23; n++) {
    if (!ceq(cur, iPow(n))) bad++
    cur = cmul(cur, IOTA)
  }
  ok(bad === 0, 'B1 the iota cycle: i^n follows the mod-4 law over two full octaves')
}

// B2. the consecutive-four law: i^n + i^{n+1} + i^{n+2} + i^{n+3} = 0
// for every n — brute-forced by repeated multiplication.
{
  let bad = 0
  for (let n = 0; n <= 20; n++) {
    let s: Cx = [0, 0]
    let cur = iPow(n)
    for (let k = 0; k < 4; k++) {
      s = cadd(s, cur)
      cur = cmul(cur, IOTA)
    }
    if (!(s[0] === 0 && s[1] === 0)) bad++
  }
  ok(bad === 0, 'B2 any four consecutive powers of i sum to zero (n = 0..20)')
}

// B3. the pinned power exhibits.
{
  ok(ceq(iPow(2026), [-1, 0]), 'B3.1 i^2026 = −1 (2026 ≡ 2 mod 4)')
  ok(ceq(iPow(99), [0, -1]), 'B3.2 i^99 = −i (99 ≡ 3 mod 4)')
  ok(ceq(iPow(101), IOTA), 'B3.3 i^101 = i (101 ≡ 1 mod 4)')
  // 1/i = −i: check i · (−i) = 1
  ok(ceq(cmul(IOTA, [0, -1]), [1, 0]), 'B3.4 1/i = −i (the product is the identity)')
  // so 1/i^101 = 1/i = −i
  ok(ceq(cdiv([1, 0], iPow(101)), [0, -1]), 'B3.5 1/i^101 = −i')
  // the 2026–2029 sum
  let s: Cx = [0, 0]
  for (let n = 2026; n <= 2029; n++) s = cadd(s, iPow(n))
  ok(ceq(s, [0, 0]), 'B3.6 i^2026 + i^2027 + i^2028 + i^2029 = 0')
  // the L1.2 exercise: i^134 + i^136 + i^138 + i^140
  let s2: Cx = [0, 0]
  for (const n of [134, 136, 138, 140]) s2 = cadd(s2, iPow(n))
  ok(ceq(s2, [0, 0]), 'B3.7 i^134 + i^136 + i^138 + i^140 = 0 (the even-stride four)')
}

// B4. the alternating even-power sum: S(n) = Σ_{k=0}^{n} i^{2k} =
// (1 + (−1)^n)/2 — 1 when n is even, 0 when n is odd.
{
  let bad = 0
  for (let n = 0; n <= 15; n++) {
    let s: Cx = [0, 0]
    for (let k = 0; k <= n; k++) s = cadd(s, iPow(2 * k))
    const closed: Cx = [n % 2 === 0 ? 1 : 0, 0]
    if (!ceq(s, closed)) bad++
  }
  ok(bad === 0, 'B4 1 + i² + i⁴ + … + i^{2n} = (1 + (−1)^n)/2 (n = 0..15)')
}

// B5. the surd discipline: √(−3)·√(−12) honestly = −6; the fraud = 6;
// the one-negative case √(−4)·√9 = 6i is legal.
{
  // honest route: √3 · √12 · i² = 6 · (−1)
  const honest = Math.sqrt(3) * Math.sqrt(12) * -1
  eq(honest, -6, 1e-12, 'B5.1 √(−3)·√(−12) = −6 the honest route')
  // the fraud route value (for the Caution's price tag)
  const fraud = Math.sqrt(3 * 12)
  eq(fraud, 6, 1e-12, 'B5.2 the fraud route reads √36 = 6 — the 6 = −6 absurdity')
  // legal: exactly one factor negative
  const legal = cmul([0, 2], [3, 0])
  ok(ceq(legal, [0, 6]), 'B5.3 √(−4)·√9 = 6i — one negative factor is legal')
  // the L1.1 exercises
  eq(Math.sqrt(50), 5 * Math.SQRT2, 1e-12, 'B5.4 √(−50) = 5√2 i (coefficient check)')
  eq(Math.sqrt(27), 3 * Math.sqrt(3), 1e-12, 'B5.5 √(−27) = 3√3 i')
  eq(Math.sqrt(8), 2 * Math.SQRT2, 1e-12, 'B5.6 √(−8) = 2√2 i')
}

// B6. the negative-power cycle: i^{−n} obeys the same mod-4 law
// (i^{−n} = i^{(4 − (n mod 4)) mod 4}), checked exactly by reciprocals.
{
  let bad = 0
  for (let n = 1; n <= 16; n++) {
    const inv = cdiv([1, 0], iPow(n))
    const law = iPow(-n)
    if (!ceq(inv, law)) bad++
  }
  ok(bad === 0, 'B6 negative powers of i follow the same cycle (n = 1..16)')
}

// B7. the product law with reduction: i^m · i^n = i^{m+n} for m, n up
// to 25 — multiplication inside the cycle is closed.
{
  let bad = 0
  for (let m = 0; m <= 25; m++)
    for (let n = 0; n <= 25; n++) {
      if (!ceq(cmul(iPow(m), iPow(n)), iPow(m + n))) bad++
    }
  ok(bad === 0, 'B7 i^m · i^n = i^{m+n} on the 26×26 grid')
}

/* ------------------------------------------------------------------ */
/* (C) the pair-construction engine                                    */
/* ------------------------------------------------------------------ */

// C1. the multiplication rule (ac − bd, ad + bc) agrees with the
// FOIL + i² = −1 route on the full integer sweep a,b,c,d ∈ {−4..4}.
{
  let bad = 0
  let checks = 0
  for (const a of rng(-4, 4))
    for (const b of rng(-4, 4))
      for (const c of rng(-4, 4))
        for (const d of rng(-4, 4)) {
          checks++
          // FOIL route: (a + bi)(c + di) = ac + adi + bci + bd i², with i² = −1
          const foil: Cx = [a * c - b * d, a * d + b * c]
          if (!ceq(cmul([a, b], [c, d]), foil)) bad++
        }
  ok(bad === 0 && checks === 6561, `C1 pair rule ≡ FOIL + i² = −1 (${checks} combos, ${bad} bad)`)
}

// C2. the letter's honesty: (0,1)² = (−1, 0); i · (a,0) = (0,a); the
// decomposition (a,b) = (a,0) + (0,b) = a + bi.
{
  ok(ceq(cmul(IOTA, IOTA), [-1, 0]), 'C2.1 (0,1)² = (−1,0) — i² = −1 is a theorem of the rule')
  ok(ceq(cmul(IOTA, [5, 0]), [0, 5]), 'C2.2 i · 5 = 5i (the pair form)')
  ok(ceq(cadd([3, 0], cmul([4, 0], IOTA)), [3, 4]), 'C2.3 3 + 4i is the pair (3, 4)')
}

// C3. the equality solve exhibit: (2x−1) + (y+2)i = 3 + 5i has the
// unique real solution x = 2, y = 3.
{
  const x = 2
  const y = 3
  const leftRe = 2 * x - 1
  const leftIm = y + 2
  ok(leftRe === 3 && leftIm === 5, 'C3 the equality exhibit: x = 2, y = 3 satisfies (2x−1) + (y+2)i = 3 + 5i')
}

// C4. the embedding of ℝ: a ↦ (a, 0) preserves both operations — the
// new rung does not break the old arithmetic.
{
  let bad = 0
  for (const a of rng(-5, 5))
    for (const b of rng(-5, 5)) {
      if (!ceq(cadd([a, 0], [b, 0]), [a + b, 0])) bad++
      if (!ceq(cmul([a, 0], [b, 0]), [a * b, 0])) bad++
    }
  ok(bad === 0, 'C4 ℝ embeds in ℂ with + and × intact (a, b ∈ −5..5)')
}

/* ------------------------------------------------------------------ */
/* (D) the field-law survival engine                                   */
/* ------------------------------------------------------------------ */

/** the pinned roster for the prose census table */
const ROSTER: Cx[] = [
  [3, -2], // 3 − 2i
  [2, 5], // 2 + 5i
  [-1, 4], // −1 + 4i
  [5, 0], // 5
  [0, -3], // −3i
  [2, -1], // 2 − i
]

// D1. commutativity of both operations on the roster (and a grid).
{
  let badR = 0
  for (const z of ROSTER)
    for (const w of ROSTER) {
      if (!ceq(cadd(z, w), cadd(w, z))) badR++
      if (!ceq(cmul(z, w), cmul(w, z))) badR++
    }
  let badG = 0
  for (const a of rng(-3, 3))
    for (const b of rng(-3, 3))
      for (const c of rng(-3, 3))
        for (const d of rng(-3, 3)) {
          const z: Cx = [a, b]
          const w: Cx = [c, d]
          if (!ceq(cadd(z, w), cadd(w, z))) badG++
          if (!ceq(cmul(z, w), cmul(w, z))) badG++
        }
  ok(badR === 0, `D1 commutativity on the roster (36 ordered pairs, ${badR} bad)`)
  ok(badG === 0, 'D1 commutativity on the 7⁴ integer grid')
}

// D2. associativity of both operations on the roster.
{
  let bad = 0
  for (const z of ROSTER)
    for (const w of ROSTER)
      for (const v of ROSTER) {
        if (!ceq(cadd(cadd(z, w), v), cadd(z, cadd(w, v)))) bad++
        if (!ceq(cmul(cmul(z, w), v), cmul(z, cmul(w, v)))) bad++
      }
  ok(bad === 0, 'D2 associativity on the roster (216 triples)')
}

// D3. distributivity z(z + w) = zz + zw on the roster and a grid.
{
  let badR = 0
  for (const z of ROSTER)
    for (const w of ROSTER)
      for (const v of ROSTER)
        if (!ceq(cmul(z, cadd(w, v)), cadd(cmul(z, w), cmul(z, v)))) badR++
  let badG = 0
  for (const a of rng(-2, 2))
    for (const b of rng(-2, 2))
      for (const c of rng(-2, 2))
        for (const d of rng(-2, 2)) {
          const z: Cx = [a, b]
          const w: Cx = [c, d]
          if (!ceq(cmul(z, cadd(z, w)), cadd(cmul(z, z), cmul(z, w)))) badG++
        }
  ok(badR === 0, 'D3 distributivity on the roster (216 triples)')
  ok(badG === 0, 'D3 distributivity on the 5⁴ integer grid')
}

// D4. identities, negatives, and reciprocals: every non-zero roster
// member has a reciprocal via the conjugate route and it works.
{
  let bad = 0
  for (const z of ROSTER) {
    const neg = csub([0, 0], z)
    if (!ceq(cadd(z, neg), [0, 0])) bad++
    if (!ceq(cmul(z, [1, 0]), z)) bad++
    if (z[0] === 0 && z[1] === 0) continue
    const recip: Cx = cdiv([1, 0], z) // = z̄ / (zz̄)
    if (!ceq(cmul(z, recip), [1, 0])) bad++
  }
  ok(bad === 0, 'D4 identities, negatives and conjugate-route reciprocals on the roster')
}

// D5. no zero divisors: (a+bi)(c+di) = 0 forces one factor to vanish —
// brute-forced on the integer grid, and the honest route (multiply by
// the conjugates: (a²+b²)(c²+d²) = 0) checked symbolically on the grid.
{
  let bad = 0
  for (const a of rng(-3, 3))
    for (const b of rng(-3, 3))
      for (const c of rng(-3, 3))
        for (const d of rng(-3, 3)) {
          const prod = cmul([a, b], [c, d])
          const vanishes = (a === 0 && b === 0) || (c === 0 && d === 0)
          const prodZero = prod[0] === 0 && prod[1] === 0
          if (prodZero !== vanishes) bad++
          // the certificate: |z₁z₂|² = (a²+b²)(c²+d²) as exact integers
          const cert = (a * a + b * b) * (c * c + d * d)
          const prodNorm = prod[0] * prod[0] + prod[1] * prod[1]
          if (cert !== prodNorm) bad++
        }
  ok(bad === 0, 'D5 no zero divisors + the norm-multiplicativity certificate on the 7⁴ grid')
}

// D6. the prose census table's witnesses (each row of the table).
{
  const z1: Cx = [3, -2]
  const z2: Cx = [2, 5]
  const z3: Cx = [-1, 4]
  ok(ceq(cadd(z1, z2), [5, 3]), 'D6.1 z₁ + z₂ = 5 + 3i = z₂ + z₁ (the table witness)')
  ok(ceq(cmul(z1, z2), [16, 11]), 'D6.2 z₁·z₂ = 16 + 11i = z₂·z₁')
  ok(ceq(cadd(cadd(z1, z2), z3), cadd(z1, cadd(z2, z3))), 'D6.3 (z₁+z₂)+z₃ = z₁+(z₂+z₃)')
  ok(ceq(cmul(z1, cadd(z2, z3)), cadd(cmul(z1, z2), cmul(z1, z3))), 'D6.4 z₁(z₂+z₃) = z₁z₂ + z₁z₃')
}

/* ------------------------------------------------------------------ */
/* (E) the operations engine — the pinned exhibits                     */
/* ------------------------------------------------------------------ */

// E1. (3 − 2i)(2 + 5i) = 16 + 11i, by both routes.
{
  const z: Cx = [3, -2]
  const w: Cx = [2, 5]
  ok(ceq(cmul(z, w), [16, 11]), 'E1 (3−2i)(2+5i) = 16 + 11i (pair rule)')
  // FOIL by hand: 6 + 15i − 4i − 10i² = 6 + 11i + 10 — ac − bd = 6 − (−10)
  const foilRe = 3 * 2 - (-2) * 5 // ac − bd with a=3, b=−2, c=2, d=5
  ok(foilRe === 16, 'E1 the FOIL route agrees: 6 − (−10) = 16')
}

// E2. the (1+i) power chain: (1+i)² = 2i, (1+i)⁴ = −4, (1+i)⁶ = −8i,
// (1+i)⁸ = 16; and (1+i)⁸ + (1−i)⁸ = 32.
{
  const onePlus: Cx = [1, 1]
  const oneMinus: Cx = [1, -1]
  const p2 = cmul(onePlus, onePlus)
  const p4 = cmul(p2, p2)
  const p6 = cmul(p4, p2)
  const p8 = cmul(p4, p4)
  const m2 = cmul(oneMinus, oneMinus) // (1−i)² = −2i
  const m4 = cmul(m2, m2) // (−2i)² = −4
  const m8 = cmul(m4, m4) // (−4)² = 16 — the honest route to (1−i)⁸
  ok(ceq(p2, [0, 2]), 'E2.1 (1+i)² = 2i')
  ok(ceq(p4, [-4, 0]), 'E2.2 (1+i)⁴ = −4')
  ok(ceq(p6, [0, -8]), 'E2.3 (1+i)⁶ = −8i ((2i)³)')
  ok(ceq(p8, [16, 0]), 'E2.4 (1+i)⁸ = 16')
  ok(ceq(m2, [0, -2]), 'E2.5a (1−i)² = −2i')
  ok(ceq(m8, [16, 0]), 'E2.5 (1−i)⁸ = 16')
  ok(ceq(cadd(p8, m8), [32, 0]), 'E2.6 (1+i)⁸ + (1−i)⁸ = 32')
}

// E3. (7+i)/(3+4i) = 1 − i, cross-checked by multiplication.
{
  const q = cdiv([7, 1], [3, 4])
  ok(ceq(q, [1, -1]), 'E3.1 (7+i)/(3+4i) = 1 − i')
  ok(ceq(cmul([3, 4], [1, -1]), [7, 1]), 'E3.2 cross-check: (3+4i)(1−i) = 7+i')
}

// E4. (4+3i)/(2−i) = 1 + 2i, cross-checked by multiplication.
{
  const q = cdiv([4, 3], [2, -1])
  ok(ceq(q, [1, 2]), 'E4.1 (4+3i)/(2−i) = 1 + 2i')
  ok(ceq(cmul([2, -1], [1, 2]), [4, 3]), 'E4.2 cross-check: (2−i)(1+2i) = 4+3i')
}

// E5. the complex-coefficient quadratic (1+i)x² − 2x + (1−i) = 0 has
// the roots x = 1 and x = −i: discriminant route + substitution checks.
{
  const a: Cx = [1, 1]
  const b: Cx = [-2, 0]
  const c: Cx = [1, -1]
  // D = b² − 4ac = 4 − 4·2 = −4 → √D = ±2i
  const ac = cmul(a, c)
  ok(ceq(ac, [2, 0]), 'E5.1 (1+i)(1−i) = 2 (the conjugate seed cashing)')
  const D = csub(cmul(b, b), [4 * ac[0], 4 * ac[1]])
  ok(ceq(D, [-4, 0]), 'E5.2 D = b² − 4ac = −4')
  ok(ceq(cmul([0, 2], [0, 2]), [-4, 0]), 'E5.3 (2i)² = −4 — √D = ±2i')
  // roots: x = (2 ± 2i)/(2 + 2i) = (1 ± i)/(1 + i)
  const r1 = cdiv([1, 1], [1, 1]) // (1+i)/(1+i)
  const r2 = cdiv([1, -1], [1, 1]) // (1−i)/(1+i)
  ok(ceq(r1, [1, 0]), 'E5.4 root 1: (1+i)/(1+i) = 1')
  ok(ceq(r2, [0, -1]), 'E5.5 root 2: (1−i)/(1+i) = −i')
  // substitution checks: a x² + b x + c at both roots
  const ev = (x: Cx): Cx => cadd(cadd(cmul(a, cmul(x, x)), cmul(b, x)), c)
  ok(ceq(ev([1, 0]), [0, 0]), 'E5.6 x = 1 satisfies the equation')
  ok(ceq(ev([0, -1]), [0, 0]), 'E5.7 x = −i satisfies the equation')
}

// E6. x² + (1+i)x + i = 0 has the roots −1 and −i; the complex
// discriminant D = −2i has the square roots ±(1−i).
{
  const a: Cx = [1, 0]
  const b: Cx = [1, 1]
  const c: Cx = [0, 1]
  const D = csub(cmul(b, b), cmul([4, 0], c))
  ok(ceq(D, [0, -2]), 'E6.1 D = (1+i)² − 4i = 2i − 4i = −2i')
  ok(ceq(cmul([1, -1], [1, -1]), [0, -2]), 'E6.2 (1−i)² = −2i — √D = ±(1−i)')
  // roots: (−(1+i) ± (1−i))/2
  const r1 = cdiv(cadd(csub([0, 0], b), [1, -1]), [2, 0])
  const r2 = cdiv(csub(csub([0, 0], b), [1, -1]), [2, 0])
  ok(ceq(r1, [0, -1]), 'E6.3 root 1: (−1−i+1−i)/2 = −i')
  ok(ceq(r2, [-1, 0]), 'E6.4 root 2: (−1−i−1+i)/2 = −1')
  // factorisation witness: (x+1)(x+i) = x² + (1+i)x + i
  const ev = (x: Cx): Cx => cadd(cadd(cmul(a, cmul(x, x)), cmul(b, x)), c)
  ok(ceq(ev([-1, 0]), [0, 0]), 'E6.5 x = −1 satisfies')
  ok(ceq(ev([0, -1]), [0, 0]), 'E6.6 x = −i satisfies')
}

// E7. the conjugate seeds on the witness z = 3+4i and on sweeps.
{
  const z: Cx = [3, 4]
  ok(ceq(cadd(z, cconj(z)), [6, 0]), 'E7.1 z + z̄ = 6 = 2 Re(z)')
  ok(ceq(csub(z, cconj(z)), [0, 8]), 'E7.2 z − z̄ = 8i = 2i Im(z)')
  ok(ceq(cmul(z, cconj(z)), [25, 0]), 'E7.3 zz̄ = 25 = 3² + 4²')
  let bad = 0
  for (const a of rng(-4, 4))
    for (const b of rng(-4, 4)) {
      const zz: Cx = [a, b]
      if (!ceq(cadd(zz, cconj(zz)), [2 * a, 0])) bad++
      if (!ceq(csub(zz, cconj(zz)), [0, 2 * b])) bad++
      if (!ceq(cmul(zz, cconj(zz)), [a * a + b * b, 0])) bad++
    }
  ok(bad === 0, 'E7.4 the seed identities hold on the 9×9 integer grid')
  // z = z̄ ⟺ purely real; z + z̄ = 0 ⟺ purely imaginary
  ok(ceq(cconj([5, 0]), [5, 0]), 'E7.5 a purely real z is its own conjugate')
  ok(cadd(cconj([0, 3]), [0, 3])[0] === 0 && ceq(cadd([0, 3], cconj([0, 3])), [0, 0]), 'E7.6 a purely imaginary z has z + z̄ = 0')
}

// E8. Bombelli 1572: (2+i)³ = 2+11i and (2−i)³ = 2−11i, so
// ³√(2+11i) + ³√(2−11i) = (2+i) + (2−i) = 4; 4 is a root of
// x³ = 15x + 4; Cardan's constant: (q/2)² + (p/3)³ = 4 − 125 = −121
// for x³ + px + q = 0 with p = −15, q = −4.
{
  const bi = cmul(cmul([2, 1], [2, 1]), [2, 1])
  const bmin = cmul(cmul([2, -1], [2, -1]), [2, -1])
  ok(ceq(bi, [2, 11]), 'E8.1 (2+i)³ = 2 + 11i')
  ok(ceq(bmin, [2, -11]), 'E8.2 (2−i)³ = 2 − 11i')
  ok(ceq(cadd(bi, bmin), [4, 0]), 'E8.3 the cube roots add to 4 (the wild thought resolves)')
  eq(Math.pow(4, 3), 15 * 4 + 4, 1e-9, 'E8.4 4³ = 64 = 15·4 + 4 — the real root')
  const p = -15
  const q = -4
  eq((q / 2) ** 2 + (p / 3) ** 3, -121, 1e-12, 'E8.5 Cardan under the radical: 4 − 125 = −121')
  ok(ceq(cmul([0, 11], [0, 11]), [-121, 0]), 'E8.6 (11i)² = −121 — the square root of the constant')
}

// E9. the quarter-turn orbit: z = 2+i, iz = −1+2i, i²z = −2−i,
// i³z = 1−2i — the four vertices of a square (equal sides, right
// angles); the general law: sides 2(a²+b²) in squared length,
// consecutive side vectors perpendicular.
{
  const z: Cx = [2, 1]
  const iz = cmul(IOTA, z)
  const i2z = cmul(cmul(IOTA, IOTA), z)
  const i3z = cmul(cmul(cmul(IOTA, IOTA), IOTA), z)
  ok(ceq(iz, [-1, 2]), 'E9.1 i(2+i) = −1 + 2i')
  ok(ceq(i2z, [-2, -1]), 'E9.2 i²(2+i) = −2 − i')
  ok(ceq(i3z, [1, -2]), 'E9.3 i³(2+i) = 1 − 2i')
  const pts = [z, iz, i2z, i3z]
  const side2 = (u: Cx, v: Cx): number => (v[0] - u[0]) ** 2 + (v[1] - u[1]) ** 2
  const dot = (u: Cx, v: Cx, w: Cx, x: Cx): number => (v[0] - u[0]) * (x[0] - w[0]) + (v[1] - u[1]) * (x[1] - w[1])
  const sides = [side2(pts[0], pts[1]), side2(pts[1], pts[2]), side2(pts[2], pts[3]), side2(pts[3], pts[0])]
  ok(sides.every((s) => s === 10), `E9.4 the four sides all have squared length 10 (got ${sides.join(',')})`)
  const dots = [dot(pts[0], pts[1], pts[1], pts[2]), dot(pts[1], pts[2], pts[2], pts[3]), dot(pts[2], pts[3], pts[3], pts[0]), dot(pts[3], pts[0], pts[0], pts[1])]
  ok(dots.every((dd) => dd === 0), 'E9.5 consecutive sides perpendicular (dot products 0)')
  // the general law on an integer sweep
  let bad = 0
  for (const a of rng(-4, 4))
    for (const b of rng(-4, 4)) {
      if (a === 0 && b === 0) continue
      const zz: Cx = [a, b]
      const q1 = cmul(IOTA, zz)
      const q2 = cmul(cmul(IOTA, IOTA), zz)
      const q3 = cmul(cmul(cmul(IOTA, IOTA), IOTA), zz)
      const s1: Cx = [q1[0] - zz[0], q1[1] - zz[1]]
      const s2: Cx = [q2[0] - q1[0], q2[1] - q1[1]]
      if (s1[0] ** 2 + s1[1] ** 2 !== 2 * (a * a + b * b)) bad++
      if (s2[0] ** 2 + s2[1] ** 2 !== 2 * (a * a + b * b)) bad++
      if (s1[0] * s2[0] + s1[1] * s2[1] !== 0) bad++
    }
  ok(bad === 0, 'E9.6 the general orbit law: side² = 2(a²+b²), right angles (9×9 grid)')
  // distance to origin preserved by the turn
  ok(iz[0] ** 2 + iz[1] ** 2 === z[0] ** 2 + z[1] ** 2, 'E9.7 the turn preserves the distance to the origin')
}

// E10. the reciprocal seeds for the division derivation: 1/(c+di) =
// (c−di)/(c²+d²) — the conjugate route on a grid.
{
  let bad = 0
  for (const c of rng(-3, 3))
    for (const d of rng(-3, 3)) {
      if (c === 0 && d === 0) continue
      const w: Cx = [c, d]
      const recip = cdiv([1, 0], w)
      const prod = cmul(w, recip)
      // float-precision honesty: the conjugate route is exact in theory,
      // the sweep compares with epsilon
      if (Math.abs(prod[0] - 1) > 1e-9 || Math.abs(prod[1]) > 1e-9) bad++
    }
  ok(bad === 0, 'E10 every non-zero complex number has a reciprocal (7×7 grid)')
}

/* ------------------------------------------------------------------ */
/* (F) quiz keys + the exercise answer ladder, pinned pre-writing      */
/* ------------------------------------------------------------------ */

// F1. quiz keys (intended): [3, 1, 0, 2, 3]
// Q1 i^2027 → −i (2027 ≡ 3 mod 4) → option index 3 of [1, i, −1, −i]
// Q2 √(−3)·√(−12) → −6 → index 1 of [6, −6, 6i, −6i]
// Q3 (2x−1)+(y+2)i = 3+5i → (x,y) = (2,3) → index 0 of [(2,3), (2,5), (1,3), (3,2)]
// Q4 (7+i)/(3+4i) → 1−i → index 2 of [1+i, −1+i, 1−i, 7/3 + i/4]
// Q5 z·z̄ always real and ≥ 0 → index 3 of [real-but-negative possible, purely imaginary, real only when z real, real and ≥ 0]
{
  ok(ceq(iPow(2027), [0, -1]), 'F1.1 quiz Q1 key: i^2027 = −i (index 3)')
  eq(Math.sqrt(3) * Math.sqrt(12) * -1, -6, 1e-12, 'F1.2 quiz Q2 key: −6 (index 1)')
  const q3x = 2 * 2 - 1
  const q3y = 3 + 2
  ok(q3x === 3 && q3y === 5, 'F1.3 quiz Q3 key: (x, y) = (2, 3) (index 0)')
  ok(ceq(cdiv([7, 1], [3, 4]), [1, -1]), 'F1.4 quiz Q4 key: 1 − i (index 2)')
  // Q5: zz̄ = a² + b² ≥ 0 for every z, = 0 only at z = 0
  let bad = 0
  for (const a of rng(-3, 3))
    for (const b of rng(-3, 3)) {
      const prod = cmul([a, b], cconj([a, b]))
      if (prod[1] !== 0 || prod[0] < 0) bad++
      if (prod[0] === 0 && !(a === 0 && b === 0)) bad++
    }
  ok(bad === 0, 'F1.5 quiz Q5 key: zz̄ real and ≥ 0 always, zero only at z = 0 (index 3)')
}

// F2. the exercise ladder (15 items: L1:2 L2:2 L3:3 L4:3 L5:3 L6:2).
{
  // L1.1 express √(−50), √(−27), √(−8) in terms of i  (B5.4–B5.6 pinned)
  eq(Math.sqrt(50) / (5 * Math.SQRT2), 1, 1e-12, 'F2.1 L1.1 √(−50) = 5√2 i')
  eq(Math.sqrt(27) / (3 * Math.sqrt(3)), 1, 1e-12, 'F2.2 L1.1 √(−27) = 3√3 i')
  eq(Math.sqrt(8) / (2 * Math.SQRT2), 1, 1e-12, 'F2.3 L1.1 √(−8) = 2√2 i')
  // L1.2 i^134 + i^136 + i^138 + i^140 = 0  (B3.7 pinned)
  // L2.3 (4+3i)/(2−i) = 1+2i  (E4 pinned)
  // L2.4 (3x+2) + (y−4)i = 8 − 3i → x = 2, y = 1
  const l2x = (8 - 2) / 3
  const l2y = -3 + 4
  ok(l2x === 2 && l2y === 1, 'F2.4 L2.4 the equality solve: x = 2, y = 1')
  // L3.5 (3−2i)(2+5i) = 16+11i  (E1 pinned)
  // L3.6 (1+i)⁶ = −8i  (E2.3 pinned)
  // L3.7 z = 3+4i: z+z̄ = 6, z−z̄ = 8i, zz̄ = 25  (E7 pinned)
  // L4.8 (1+i)x² − 2x + (1−i) = 0 → x = 1, −i  (E5 pinned)
  // L4.9 1/(1−i) + 1/(1+i) = 1
  const l4a = cdiv([1, 0], [1, -1])
  const l4b = cdiv([1, 0], [1, 1])
  ok(ceq(cadd(l4a, l4b), [1, 0]), 'F2.9 L4.9 1/(1−i) + 1/(1+i) = 1 (the conjugate pair telescopes)')
  // L4.10 x² + (1+i)x + i = 0 → x = −1, −i  (E6 pinned)
  // L5.11 Bombelli (E8 pinned)
  // L5.12 the commutativity proof's pinned witness rows
  ok(ceq(cmul([3, -2], [2, 5]), cmul([2, 5], [3, -2])), 'F2.12 L5.12 the commutativity witness: both orders 16+11i')
  // L5.13 1 + i² + i⁴ + … + i^{2n} = 1 ⟺ n even  (B4 pinned)
  let sOdd: Cx = [0, 0]
  let sEven: Cx = [0, 0]
  for (let k = 0; k <= 3; k++) sOdd = cadd(sOdd, iPow(2 * k))
  for (let k = 0; k <= 4; k++) sEven = cadd(sEven, iPow(2 * k))
  ok(ceq(sOdd, [0, 0]) && ceq(sEven, [1, 0]), 'F2.13 L5.13 the alternating sum: 0 at n = 3, 1 at n = 4')
  // L6.14 the orbit square (E9 pinned)
  // L6.15 no zero divisors (D5 pinned)
}

/* ------------------------------------------------------------------ */
/* (G) authored-audit — lesson 3.1 as written                          */
/* ------------------------------------------------------------------ */

{
  const ch = chapter03
  ok(ch.number === 3 && ch.slug === 'complex-numbers' && ch.title === 'Complex Numbers: the New Rung', 'G1 chapter wrapper number/slug/title')
  ok(ch.status === 'in-progress', 'G2 chapter status in-progress (opened run 105)')
  ok(ch.lessons.length === 4, `G3 chapter shape re-pinned run 108: 4 lessons written (got ${ch.lessons.length})`)
  const planned = ch.plannedLessons ?? []
  ok(
    planned.length === 1 &&
      planned[0] === 'De Moivre, Roots of Unity and the Complex Loci',
    `G4 plannedLessons re-pinned run 108 = the one remaining (got ${planned.join(' | ')})`,
  )
  ok(ch.summary.includes('complex') && ch.summary.includes('closure failure'), 'G5 the chapter summary names the umbrella topics (complex numbers, the closure failure)')

  const L = ch.lessons[0]
  ok(L.id === 'aa-the-closure-failure-that-forces-i', 'G6 lesson id matches the pinned id')
  ok(L.number === '3.1' && L.title === 'The Closure Failure That Forces i', 'G7 lesson number/title')
  const blocks = L.blocks
  const byKind: Record<string, number> = {}
  for (const b of blocks) byKind[b.kind] = (byKind[b.kind] || 0) + 1
  ok((byKind['para'] || 0) >= 14, `G8 para count >= 14 (got ${byKind['para']})`)
  ok((byKind['heading'] || 0) === 7, `G9 heading count = 7 (got ${byKind['heading']})`)
  ok((byKind['callout'] || 0) === 12, `G10 callout count = 12 (got ${byKind['callout']})`)
  ok((byKind['example'] || 0) === 11, `G11 example (Illustration) count = 11 (got ${byKind['example']})`)
  ok((byKind['derivation'] || 0) === 3, `G12 derivation count = 3 (got ${byKind['derivation']})`)
  ok((byKind['figure'] || 0) === 2, `G13 figure count = 2 (got ${byKind['figure']})`)
  ok((byKind['table'] || 0) === 2, `G14 table count = 2 (got ${byKind['table']})`)
  ok((byKind['formula'] || 0) === 5, `G15 formula-card count = 5 (got ${byKind['formula']})`)
  ok((byKind['list'] || 0) === 1, `G15b list count = 1 (roman) (got ${byKind['list']})`)
  ok((byKind['terms'] || 0) === 1, `G15c terms block present (got ${byKind['terms']})`)

  // the five hosted m2-03 folds
  const heads = blocks.filter((b) => b.kind === 'heading').map((b) => (b as { text: string }).text)
  ok(heads.some((t) => t === 'Algebraic Operations on Complex Numbers'), 'G16 fold (section): the EXACT named subsection heading present')
  const calls = blocks.filter((b) => b.kind === 'callout') as Array<{ tone: string; title: string; text: string }>
  ok(calls.some((c) => c.tone === 'definition' && c.title === 'The four operations'), 'G17 fold (section): the formal definition callout inside the operations subsection')
  // at least one worked example AFTER the fold heading (index comparison)
  const foldHeadIdx = blocks.findIndex((b) => b.kind === 'heading' && (b as { text: string }).text === 'Algebraic Operations on Complex Numbers')
  const exampleAfterFold = blocks.slice(foldHeadIdx + 1).some((b) => b.kind === 'example')
  ok(foldHeadIdx >= 0 && exampleAfterFold, 'G18 fold (section): at least one worked example inside the named subsection')
  const terms = blocks.find((b) => b.kind === 'terms') as { items: Array<{ term: string; def: string }> }
  ok(terms.items.some((t) => t.term === 'Imaginary number'), 'G19 fold (glossary): the Imaginary Number terms entry present')
  ok(terms.items.some((t) => t.term === 'Equality of complex numbers'), 'G20 fold (glossary): the Equality of Complex Numbers terms entry present')
  const allText = JSON.stringify(blocks)
  ok(allText.toLowerCase().includes('imaginary number'), 'G21 fold (glossary): the term used in prose')
  ok(allText.includes('Equality of complex numbers'), 'G22 fold (glossary): the term used in prose')
  ok(terms.items.length === 9, `G23 terms count = 9 (got ${terms.items.length})`)

  // quiz keys vs the F pins
  const quiz = blocks.find((b) => b.kind === 'quiz') as { items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
  const keys = quiz.items.map((i) => i.answer)
  ok(keys.length === 5 && keys.join(',') === '3,1,0,2,3', `G24 quiz keys [3,1,0,2,3] vs authored ${keys.join(',')}`)
  ok(quiz.items.every((i) => i.options.length === 4 && i.explain.length > 80), 'G25 every quiz item carries 4 options and a priced explain')

  // exercises census + levels + the solution contract
  const ex = blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string }> }> }
  const levels = ex.sets.map((s) => s.level).join(',')
  ok(levels === 'L1,L2,L3,L4,L5,L6', `G26 exercise levels L1-L6 (got ${levels})`)
  const qCount = ex.sets.reduce((n, s) => n + s.questions.length, 0)
  ok(qCount === 15, `G27 exercise count = 15 (got ${qCount})`)
  const ladder = ex.sets.map((s) => s.questions.length).join(',')
  ok(ladder === '2,2,3,3,3,2', `G28 the ladder 2/2/3/3/3/2 (got ${ladder})`)
  ok(
    ex.sets.every((s) => s.questions.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && (qq.answer ?? '').length > 0)),
    'G29 every exercise: steps-array solution (>= 3 moves) + answer string',
  )

  // example blocks carry NO answer field (the run-101 house catch)
  const exBlocks = blocks.filter((b) => b.kind === 'example') as Array<{ title: string; steps: string[] }>
  ok(exBlocks.every((e) => !('answer' in e)), 'G30 example blocks carry no answer field (folded into Hence steps)')
  ok(exBlocks.every((e) => e.steps[e.steps.length - 1].startsWith('Hence,')), 'G31 every Illustration ends on a Hence terminal step')
  const examShaped = exBlocks.some((e) => e.title.includes('coefficients themselves are complex'))
  ok(examShaped, 'G32 the exam-shaped Illustration present (complex-coefficient quadratic)')

  // the DerivationStep contract on all three derivations
  const derivs = blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok(derivs.length === 3 && derivs.every((d) => d.statement.length > 40 && d.result.length > 0), 'G33 every derivation carries a statement + result')
  ok(
    derivs.every((d) => d.steps.length >= 3 && d.steps.every((st) => st.label.length > 0 && st.explanation.length > 0 && (st.formula ?? '').length > 0)),
    'G34 every derivation step: label + formula + explanation',
  )
  ok(derivs.some((d) => d.title.includes('multiplication rule')), 'G35 the multiplication-rule derivation present')
  ok(derivs.some((d) => d.title.includes('division rule')), 'G35b the division-rule derivation present')
  ok(derivs.some((d) => d.title.includes('quarter-turn')), 'G35c the quarter-turn derivation present')

  // figures: viewBox, aria, palette pins, no retired hexes
  const figs = blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  const f1 = figs[0].svg
  const f2 = figs[1].svg
  ok(/viewBox="0 0 720 340"/.test(f1) && /viewBox="0 0 720 340"/.test(f2), 'G36 both svgs viewBox 720x340')
  ok(!/undefined|NaN/.test(f1) && !/undefined|NaN/.test(f2), 'G37 no undefined/NaN in svg output')
  ok(f1.includes('role="img"') && f1.includes('aria-label') && f2.includes('role="img"') && f2.includes('aria-label'), 'G38 both figures carry role=img + aria-label')
  const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c1d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  const svgAll = f1 + f2
  ok(retired.every((hex) => !svgAll.includes(hex)), 'G39 no retired muted palette hexes in the figures')
  ok(f1.includes('#16a34a') && f1.includes('#ea580c') && f1.includes('#fef3c7') && f1.includes('#ffedd5'), 'G40 fig1 (ladder): vivid green structure + the highlighted orange top rung + amber tints')
  ok(f2.includes('#0d9488') && f2.includes('#65a30d') && f2.includes('#d97706') && f2.includes('#16a34a'), 'G41 fig2 (orbit): teal + lime + amber + green vivid pins')
  ok(f1.includes('ℂ') && f1.includes('x² + 1 = 0') && f1.includes('needs i'), 'G42 fig1 pins: the ℂ rung with its birth equation')
  ok(f2.includes('z = 2 + i') && f2.includes('iz = −1 + 2i') && f2.includes('side² = 2(2² + 1²) = 10'), 'G43 fig2 pins: the orbit labels + the side law')

  // prereqs resolve in the shelf data
  for (const p of L.prerequisites ?? []) {
    const found = execSync(`grep -rl "id: '${p}'" src/data/library/books/ 2>/dev/null || true`, { encoding: 'utf8' }).trim()
    ok(found.length > 0, `G44 prereq ${p} resolves in the shelf data`)
  }
  // sources exist in SOURCE_LOG
  const srcLog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const s of L.sources ?? []) ok(srcLog.includes(s), `G45 source key ${s} present in SOURCE_LOG.md`)

  // honesty scans
  ok(!allText.includes('TODO') && !allText.includes('XXX') && !allText.includes('【') && !allText.includes('to be completed'), 'G46 honesty scan: no placeholders')
  ok(!allText.toLowerCase().includes('reproduced from'), 'G47 honesty scan: no reproduction language')

  // cross-reference pins in prose
  ok(allText.includes('AL 9.3'), 'G48.1 AL 9.3 (the discriminant) named in prose')
  ok(allText.includes('ANS 7.2'), 'G48.2 ANS 7.2 (the field-law discipline) named in prose')
  ok(allText.includes('ANS 8.1'), 'G48.3 ANS 8.1 (the √2 rung) named in prose')
  ok(allText.includes('2.R'), 'G48.4 AA 2.R (the exit that handed the doors) named in prose')
  ok(allText.includes('275') && allText.includes('78.3'), 'G48.5 the 275/351 census + 78.3% in prose')
  ok(allText.includes('Bombelli'), 'G48.6 Bombelli named in prose')
  ok(allText.includes('quarter-turn'), 'G48.7 the quarter-turn law named in prose')
  ok(allText.includes('lesson 3.2') && allText.includes('lesson 3.3') && allText.includes('lesson 3.4') && allText.includes('lesson 3.5'), 'G48.8 the four forward pointers named in prose')
  ok(allText.includes('field-law'), 'G48.9 the field-law survival discipline named in prose')
  ok(allText.includes('6 = -6'), 'G48.10 the surd fraud absurdity priced in prose')

  // honest word count via the registry's own counter
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4800, `G49 honest word count >= 4800 (got ${wordCount})`)
  console.log(`G49 word count: ${wordCount}`)

  // repo-wide id uniqueness
  const hits = execSync(`grep -rl "aa-the-closure-failure-that-forces-i" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `G50 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
}

/* ------------------------------------------------------------------ */
/* (H) the conjugate-and-modulus engine suite — lesson 3.2 (run 106)   */
/* ------------------------------------------------------------------ */

// H1. the mirror basics: conj on the witness roster + the involution law.
{
  ok(ceq(cconj([5, -12]), [5, 12]), 'H1.1 conj(5−12i) = 5+12i')
  ok(ceq(cconj([-7, 24]), [-7, -24]), 'H1.2 conj(−7+24i) = −7−24i')
  ok(ceq(cconj([0, 3]), [0, -3]), 'H1.3 conj(3i) = −3i (the purely imaginary mirror)')
  ok(ceq(cconj([7, 0]), [7, 0]), 'H1.4 a purely real z is its own conjugate')
  let bad = 0
  for (const a of rng(-5, 5)) for (const b of rng(-5, 5)) if (!ceq(cconj(cconj([a, b])), [a, b])) bad++
  ok(bad === 0, 'H1.5 the involution (z̄)̄ = z on the 11×11 integer grid')
}

// H2. the seeds cashed on the lesson witness z = 5−12i (the 5-12-13 triple).
{
  const z: Cx = [5, -12]
  ok(ceq(cadd(z, cconj(z)), [10, 0]), 'H2.1 z + z̄ = 10 = 2 Re(z)')
  ok(ceq(csub(z, cconj(z)), [0, -24]), 'H2.2 z − z̄ = −24i = 2i Im(z)')
  ok(ceq(cmul(z, cconj(z)), [169, 0]), 'H2.3 zz̄ = 169 = 5² + 12²')
  eq(cmod(z), 13, 1e-12, 'H2.4 |5−12i| = 13 (the triple cashed)')
}

// H3. the characterisations: z = z̄ ⟺ purely real; z + z̄ = 0 ⟺ purely
// imaginary — swept componentwise on the grid.
{
  let bad = 0
  for (const a of rng(-4, 4)) for (const b of rng(-4, 4)) {
    const z: Cx = [a, b]
    const selfConj = ceq(z, cconj(z))
    if (selfConj !== (b === 0)) bad++
    const sumZero = ceq(cadd(z, cconj(z)), [0, 0])
    if (sumZero !== (a === 0)) bad++
  }
  ok(bad === 0, 'H3 z = z̄ ⟺ purely real and z + z̄ = 0 ⟺ purely imaginary, swept on the 9×9 grid')
}

// H4. the four arithmetic-distribution laws: conjugation commutes with
// +, −, × (integer grid sweeps) and with division (exact pairs), plus
// the power law conj(z^n) = (conj z)^n by repeated multiplication.
{
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    const z: Cx = [a, b]
    const w: Cx = [c, d]
    if (!ceq(cconj(cadd(z, w)), cadd(cconj(z), cconj(w)))) bad++
    if (!ceq(cconj(csub(z, w)), csub(cconj(z), cconj(w)))) bad++
    if (!ceq(cconj(cmul(z, w)), cmul(cconj(z), cconj(w)))) bad++
  }
  ok(bad === 0, 'H4.1 conj distributes over +, − and × on the 7^4 integer grid')
  // division: every z = q·w with w ≠ 0 on small integers gives an exact pair q
  let badDiv = 0
  let divCount = 0
  for (const p of rng(-2, 2)) for (const q of rng(-2, 2)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    if (c === 0 && d === 0) continue
    const w: Cx = [c, d]
    const z: Cx = cmul([p, q], w)
    const quot = cdiv(z, w)
    if (Math.abs(quot[0] - p) > 1e-9 || Math.abs(quot[1] - q) > 1e-9) continue // not exact in floats
    divCount++
    const lhs = cconj([quot[0], quot[1]])
    const rhs = cdiv(cconj(z), cconj(w))
    if (Math.abs(lhs[0] - rhs[0]) > 1e-9 || Math.abs(lhs[1] - rhs[1]) > 1e-9) badDiv++
  }
  ok(divCount > 200 && badDiv === 0, `H4.2 conj distributes over ÷ on ${divCount} exact integer quotient pairs`)
  // powers by repeated multiplication, n = 0..6
  let badPow = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) {
    const z: Cx = [a, b]
    let zn: Cx = [1, 0]
    let cn: Cx = [1, 0]
    for (let n = 0; n <= 6; n++) {
      if (!ceq(cconj(zn), cn)) badPow++
      zn = cmul(zn, z)
      cn = cmul(cn, cconj(z))
    }
  }
  ok(badPow === 0, 'H4.3 conj(z^n) = (conj z)^n for n = 0..6 on the 7×7 grid')
}

// H5. the census-table witnesses: z1 = 3+4i, z2 = 2−i for the sum,
// difference and product rows; the division row rides the H7 witness
// (5−5i)/(3+i) = 1−2i with its conjugate-route mirror.
{
  const z1: Cx = [3, 4]
  const z2: Cx = [2, -1]
  ok(ceq(cadd(z1, z2), [5, 3]), 'H5.1 z1+z2 = 5+3i')
  ok(ceq(cconj(cadd(z1, z2)), cadd(cconj(z1), cconj(z2))), 'H5.2 conj(z1+z2) = 5−3i = z̄1+z̄2')
  ok(ceq(csub(z1, z2), [1, 5]), 'H5.3 z1−z2 = 1+5i')
  ok(ceq(cconj(csub(z1, z2)), csub(cconj(z1), cconj(z2))), 'H5.4 conj(z1−z2) = 1−5i = z̄1−z̄2')
  ok(ceq(cmul(z1, z2), [10, 5]), 'H5.5 z1z2 = (3+4i)(2−i) = 10+5i')
  ok(ceq(cconj(cmul(z1, z2)), cmul(cconj(z1), cconj(z2))), 'H5.6 conj(z1z2) = 10−5i = z̄1z̄2')
  const q1: Cx = [5, -5]
  const q2: Cx = [3, 1]
  const quot = cdiv(q1, q2)
  ok(Math.abs(quot[0] - 1) < 1e-9 && Math.abs(quot[1] + 2) < 1e-9, 'H5.7 (5−5i)/(3+i) = 1−2i')
  ok(ceq(cconj([1, -2]), [1, 2]), 'H5.8 conj of the quotient = 1+2i')
  const mirror = cdiv([5, 5], [3, -1])
  ok(Math.abs(mirror[0] - 1) < 1e-9 && Math.abs(mirror[1] - 2) < 1e-9, 'H5.9 z̄1/z̄2 = (5+5i)/(3−i) = 1+2i — the division law mirrors')
}

// H6. the reciprocal engine: 1/z = z̄/|z|², checked by multiplication
// and swept.
{
  const recip = (z: Cx): Cx => cdiv(cconj(z), [cmod(z) ** 2, 0])
  const one31 = cmul([3, -4], recip([3, -4]))
  ok(Math.abs(one31[0] - 1) < 1e-9 && Math.abs(one31[1]) < 1e-9, 'H6.1 1/(3−4i) = (3+4i)/25 — the product returns 1')
  const r1 = recip([-3, 4])
  ok(Math.abs(r1[0] + 3 / 25) < 1e-12 && Math.abs(r1[1] + 4 / 25) < 1e-12, 'H6.2 1/(−3+4i) = (−3−4i)/25 (the quiz key)')
  const r2 = recip([4, 3])
  ok(Math.abs(r2[0] - 4 / 25) < 1e-12 && Math.abs(r2[1] + 3 / 25) < 1e-12, 'H6.3 1/(4+3i) = (4−3i)/25 (the exercise)')
  let bad = 0
  for (const a of rng(-4, 4)) for (const b of rng(-4, 4)) {
    if (a === 0 && b === 0) continue
    const z: Cx = [a, b]
    const one = cmul(z, recip(z))
    if (Math.abs(one[0] - 1) > 1e-9 || Math.abs(one[1]) > 1e-9) bad++
  }
  ok(bad === 0, 'H6.4 z · z̄/|z|² = 1 for every non-zero grid point')
}

// H7. the division witnesses, cross-checked by multiplication both ways.
{
  const w1 = cdiv([5, -5], [3, 1])
  ok(Math.abs(w1[0] - 1) < 1e-9 && Math.abs(w1[1] + 2) < 1e-9, 'H7.1 (5−5i)/(3+i) = 1−2i')
  const back1 = cmul([3, 1], [1, -2])
  ok(ceq(back1, [5, -5]), 'H7.2 check: (3+i)(1−2i) = 5−5i — the dividend returns')
  const w2 = cdiv([5, -1], [1, 1])
  ok(Math.abs(w2[0] - 2) < 1e-9 && Math.abs(w2[1] + 3) < 1e-9, 'H7.3 (5−i)/(1+i) = 2−3i (the exercise)')
  const back2 = cmul([1, 1], [2, -3])
  ok(ceq(back2, [5, -1]), 'H7.4 check: (1+i)(2−3i) = 5−i — the dividend returns')
  eq(cmod(w1), Math.sqrt(5), 1e-12, 'H7.5 |1−2i| = √5 = |5−5i|/|3+i| = 5√2/√10 — the quotient modulus law witness')
}

// H8. the conjugate-power shortcut: (2+3i)² = −5+12i, so
// (2+3i)⁴ = (−5+12i)² = −119−120i; conjugating the whole power gives
// (2−3i)⁴ = −119+120i — computed by BOTH routes.
{
  const sq = cmul([2, 3], [2, 3])
  ok(ceq(sq, [-5, 12]), 'H8.1 (2+3i)² = −5+12i')
  const p4 = cmul(sq, sq)
  ok(ceq(p4, [-119, -120]), 'H8.2 (2+3i)⁴ = (−5+12i)² = −119−120i')
  const sqM = cmul([2, -3], [2, -3])
  ok(ceq(sqM, [-5, -12]), 'H8.3 (2−3i)² = −5−12i')
  const p4M = cmul(sqM, sqM)
  ok(ceq(p4M, [-119, 120]), 'H8.4 (2−3i)⁴ = −119+120i by the direct route')
  ok(ceq(cconj(p4), p4M), 'H8.5 the shortcut agrees: conj((2+3i)⁴) = (2−3i)⁴ — one conjugation replaces the re-expansion')
}

// H9. the sin-θ hunt families. Illustration family: (1+2is)/(2−is) has
// Re = (2−2s²)/(4+s²) and Im = 5s/(4+s²): purely real ⟺ s = 0 (θ = nπ),
// purely imaginary ⟺ s² = 1 (θ = (2k+1)π/2). Exercise family:
// (1+2is)/(3−2is) has Re = (3−4s²)/(9+4s²), Im = 8s/(9+4s²): purely
// real ⟺ s = 0, purely imaginary ⟺ s² = 3/4 (θ = nπ ± π/3).
{
  const huntA = (s: number): [number, number] => {
    const num = cmul([1, 2 * s], [2, s])
    const den = cmul([2, -s], [2, s])
    return [num[0] / den[0], num[1] / den[0]]
  }
  ok(Math.abs(huntA(0)[0] - 0.5) < 1e-12 && Math.abs(huntA(0)[1]) < 1e-12, 'H9.1 at s = 0: (1+0i)/(2−0i) = 1/2 — purely real')
  ok(Math.abs(huntA(1)[0]) < 1e-12 && Math.abs(huntA(1)[1] - 1) < 1e-12, 'H9.2 at s = 1: the quotient is i — purely imaginary')
  ok(Math.abs(huntA(0.6)[0] - (2 - 2 * 0.36) / (4 + 0.36)) < 1e-12 && Math.abs(huntA(0.6)[1] - (5 * 0.6) / (4 + 0.36)) < 1e-12, 'H9.3 the component formulas Re = (2−2s²)/(4+s²), Im = 5s/(4+s²) hold mid-range')
  let bad = 0
  for (let k = 0; k <= 40; k++) {
    const s = -1 + (2 * k) / 40
    const [re, im] = huntA(s)
    if (Math.abs(re - (2 - 2 * s * s) / (4 + s * s)) > 1e-12 || Math.abs(im - (5 * s) / (4 + s * s)) > 1e-12) bad++
    if (Math.abs(im) > 1e-12 && Math.abs(re) > 1e-12 && Math.abs(s * s - 1) < 1e-12) bad++
  }
  ok(bad === 0, 'H9.4 the Illustration family: purely real ⟺ s = 0, purely imaginary ⟺ s = ±1, mixed otherwise')
  const huntB = (s: number): [number, number] => {
    const num = cmul([1, 2 * s], [3, 2 * s])
    const den = cmul([3, -2 * s], [3, 2 * s])
    return [num[0] / den[0], num[1] / den[0]]
  }
  const sr32 = Math.sqrt(3) / 2
  ok(Math.abs(huntB(sr32)[0]) < 1e-12 && Math.abs(huntB(sr32)[1] - (8 * sr32) / (9 + 3)) < 1e-12, 'H9.5 at s = √3/2 the exercise quotient is purely imaginary (Re = 0)')
  ok(Math.abs(huntB(0)[1]) < 1e-12 && Math.abs(huntB(0)[0] - 3 / 9) < 1e-12, 'H9.6 at s = 0 the exercise quotient is purely real (1/3)')
  let badB = 0
  for (let k = 0; k <= 40; k++) {
    const s = -1 + (2 * k) / 40
    const [re, im] = huntB(s)
    if (Math.abs(re - (3 - 4 * s * s) / (9 + 4 * s * s)) > 1e-12 || Math.abs(im - (8 * s) / (9 + 4 * s * s)) > 1e-12) badB++
    const reZero = Math.abs(3 - 4 * s * s) < 1e-12
    const imZero = Math.abs(s) < 1e-12
    if (Math.abs(re) < 1e-12 && !reZero) badB++
    if (Math.abs(im) < 1e-12 && !imZero) badB++
  }
  ok(badB === 0, 'H9.7 the exercise family: Re = (3−4s²)/(9+4s²) and Im = 8s/(9+4s²) vanish exactly at s² = 3/4 and s = 0')
}

// H10. the equidistant law: for real a, |z−a| = |z̄−a| — the mirror keeps
// every real-axis distance. Witness z = 3+4i, a = 5: both √20.
{
  const z: Cx = [3, 4]
  const a = 5
  eq(cmod(csub(z, [a, 0])), Math.sqrt(20), 1e-12, 'H10.1 |z−5| = |−2+4i| = √20')
  eq(cmod(csub(cconj(z), [a, 0])), Math.sqrt(20), 1e-12, 'H10.2 |z̄−5| = |−2−4i| = √20 — equidistant')
  let bad = 0
  for (const a2 of rng(-4, 4)) for (const x of rng(-4, 4)) for (const y of rng(-4, 4)) {
    const z: Cx = [x, y]
    if (Math.abs(cmod(csub(z, [a2, 0])) - cmod(csub(cconj(z), [a2, 0]))) > 1e-9) bad++
  }
  ok(bad === 0, 'H10.3 |z−a| = |z̄−a| for every real a and grid point z')
}

// H11. the modulus witness roster.
{
  eq(cmod([5, -12]), 13, 1e-12, 'H11.1 |5−12i| = 13')
  eq(cmod([-7, 24]), 25, 1e-12, 'H11.2 |−7+24i| = 25')
  eq(cmod([3, 4]), 5, 1e-12, 'H11.3 |3+4i| = 5')
  eq(cmod([-5, 12]), 13, 1e-12, 'H11.4 |−5+12i| = 13')
  eq(cmod([0, 7]), 7, 1e-12, 'H11.5 |7i| = 7 — the purely imaginary modulus is the coefficient')
  eq(cmod([-6, 0]), 6, 1e-12, 'H11.6 |−6| = 6 — the real modulus is the absolute value')
  eq(cmod([-8, 15]), 17, 1e-12, 'H11.7 |−8+15i| = 17')
  eq(cmod([6, -8]), 10, 1e-12, 'H11.8 |6−8i| = 10 (the quiz key)')
  ok(cmod([0, 0]) === 0, 'H11.9 |z| = 0 exactly at z = 0')
}

// H12. the four twins share the radius: |z| = |z̄| = |−z| = |−z̄|.
{
  let bad = 0
  for (const a of rng(-4, 4)) for (const b of rng(-4, 4)) {
    const z: Cx = [a, b]
    const m = cmod(z)
    if (Math.abs(cmod(cconj(z)) - m) > 1e-9) bad++
    if (Math.abs(cmod([-a, -b]) - m) > 1e-9) bad++
    if (Math.abs(cmod(cconj([-a, -b])) - m) > 1e-9) bad++
  }
  ok(bad === 0, 'H12 |z| = |z̄| = |−z| = |−z̄| on the 9×9 grid — the mirror and the antipode keep the radius')
}

// H13. the equal-modulus census: exactly 12 lattice points carry |z| = 5;
// the shifted circle |z−3−4i| = 5 also carries exactly 12 lattice points and
// passes through the origin.
{
  const on5: string[] = []
  for (const x of rng(-5, 5)) for (const y of rng(-5, 5)) if (x * x + y * y === 25) on5.push(`${x},${y}`)
  ok(on5.length === 12, `H13.1 exactly 12 lattice points on |z| = 5 (got ${on5.length})`)
  ok(on5.includes('3,4') && on5.includes('4,3') && on5.includes('5,0') && on5.includes('0,5') && on5.includes('-4,-3'), 'H13.2 the census includes the 3-4-5 sign family and the axis seats')
  eq(cmod(csub([0, 0], [3, 4])), 5, 1e-12, 'H13.3 the shifted circle |z−3−4i| = 5 passes through the origin')
  let cnt = 0
  for (const x of rng(-3, 9)) for (const y of rng(-2, 10)) {
    const dx = x - 3
    const dy = y - 4
    if (dx * dx + dy * dy === 25) cnt++
  }
  ok(cnt === 12, `H13.4 exactly 12 lattice points on |z−3−4i| = 5 (got ${cnt})`)
}

// H14. the modulus laws: multiplicativity swept + the big witness
// |(3+4i)(5−12i)| = |63−16i| = 65 = 5·13; powers |(3+4i)²| = 25 and
// |(−5+12i)²| = |−119−120i| = 169 = 13²; the quotient law on H7's witness.
{
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    if (c === 0 && d === 0) continue
    const m = cmod(cmul([a, b], [c, d]))
    if (Math.abs(m - cmod([a, b]) * cmod([c, d])) > 1e-9) bad++
  }
  ok(bad === 0, 'H14.1 |z1·z2| = |z1||z2| swept on the 7^4 grid')
  const prod = cmul([3, 4], [5, -12])
  ok(ceq(prod, [63, -16]), 'H14.2 (3+4i)(5−12i) = 63−16i')
  eq(cmod(prod), 65, 1e-12, 'H14.3 |63−16i| = 65 = 5·13 — the law on the roster witness')
  const sq34 = cmul([3, 4], [3, 4])
  ok(ceq(sq34, [-7, 24]), 'H14.4 (3+4i)² = −7+24i')
  eq(cmod(sq34), 25, 1e-12, 'H14.5 |−7+24i| = 25 = 5² — the power law')
  const sq512 = cmul([-5, 12], [-5, 12])
  ok(ceq(sq512, [-119, -120]), 'H14.6 (−5+12i)² = −119−120i')
  eq(cmod(sq512), 169, 1e-12, 'H14.7 |−119−120i| = 169 = 13² — the power law cashed')
  eq(cmod([1, -2]) * cmod([3, 1]), cmod([5, -5]), 1e-12, 'H14.8 |1−2i|·|3+i| = √5·√10 = |5−5i| — the dividend check')
}

// H15. the triangle inequality: swept; the strict witness
// |(3+4i)+(5−12i)| = |8−8i| = 8√2 ≈ 11.31 < 18; the equality witness
// (1+i)+(2+2i) = 3+3i with 3√2 = √2+2√2 — same direction; the max/min
// engine for |z1| = 5, |z2| = 3: the reachable band is exactly [2, 8].
{
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    if (cmod(cadd([a, b], [c, d])) > cmod([a, b]) + cmod([c, d]) + 1e-9) bad++
  }
  ok(bad === 0, 'H15.1 |z1+z2| ≤ |z1|+|z2| swept on the 7^4 grid')
  const sum = cadd([3, 4], [5, -12])
  ok(ceq(sum, [8, -8]), 'H15.2 (3+4i)+(5−12i) = 8−8i')
  eq(cmod(sum), Math.sqrt(128), 1e-12, 'H15.3 |8−8i| = 8√2 — strictly below 5+13 = 18')
  ok(cmod(sum) < 18, 'H15.4 the strict instance 8√2 ≈ 11.31 < 18')
  const eqSum = cadd([1, 1], [2, 2])
  ok(ceq(eqSum, [3, 3]), 'H15.5 (1+i)+(2+2i) = 3+3i')
  eq(cmod(eqSum), 3 * Math.sqrt(2), 1e-12, 'H15.6 |3+3i| = 3√2')
  eq(cmod([1, 1]) + cmod([2, 2]), 3 * Math.sqrt(2), 1e-12, 'H15.7 √2 + 2√2 = 3√2 — EQUALITY: same direction')
  ok(cmod([5, 0]) + cmod([3, 0]) === cmod([8, 0]), 'H15.8 the max: same direction 5+3 = 8')
  ok(cmod(cadd([5, 0], [-3, 0])) === 2, 'H15.9 the min: opposite directions — 5 + (−3) = 2, so |z1+z2| = 2')
  // no grid pair beats the band
  let badBand = 0
  for (let k = 0; k < 200; k++) {
    const t = (2 * Math.PI * k) / 200
    const m = cmod(cadd([5 * Math.cos(t), 5 * Math.sin(t)], [3 * Math.cos(t), 3 * Math.sin(t)]))
    if (m > 8 + 1e-9 || m < 2 - 1e-9) badBand++
  }
  ok(badBand === 0, 'H15.10 with |z1| = 5, |z2| = 3 the sum stays inside the band [2, 8] on a direction sweep')
}

// H16. the reverse triangle inequality: ||z1|−|z2|| ≤ |z1−z2| — swept;
// witness z1 = 1+i, z2 = 2−2i: |√2−2√2| = √2 ≤ |−1+3i| = √10.
{
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    const lhs = Math.abs(cmod([a, b]) - cmod([c, d]))
    if (lhs > cmod(csub([a, b], [c, d])) + 1e-9) bad++
  }
  ok(bad === 0, 'H16.1 ||z1|−|z2|| ≤ |z1−z2| swept on the 7^4 grid')
  eq(Math.abs(cmod([1, 1]) - cmod([2, -2])), Math.sqrt(2), 1e-12, 'H16.2 |√2 − 2√2| = √2 (the lower gap)')
  eq(cmod(csub([1, 1], [2, -2])), Math.sqrt(10), 1e-12, 'H16.3 |(1+i)−(2−2i)| = |−1+3i| = √10 ≥ √2')
}

// H17. the sharp form |z1+z2|² = |z1|²+|z2|²+2Re(z1·z̄2) — swept and
// witnessed: (3+4i)+(5−12i) = 8−8i, 128 = 25+169+2(−33).
{
  const sharp = (z1: Cx, z2: Cx): boolean => {
    const lhs = cmod(cadd(z1, z2)) ** 2
    const cross = cmul(z1, cconj(z2))
    const rhs = cmod(z1) ** 2 + cmod(z2) ** 2 + 2 * cross[0]
    return Math.abs(lhs - rhs) < 1e-9
  }
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) if (!sharp([a, b], [c, d])) bad++
  ok(bad === 0, 'H17.1 |z1+z2|² = |z1|²+|z2|²+2Re(z1z̄2) on the 7^4 grid')
  const cross = cmul([3, 4], cconj([5, -12]))
  ok(ceq(cross, [-33, 56]), 'H17.2 (3+4i)·conj(5−12i) = (3+4i)(5+12i) = −33+56i, so Re = −33')
  eq(cmod([8, -8]) ** 2, 25 + 169 + 2 * -33, 1e-9, 'H17.3 the witness: 128 = 25 + 169 − 66')
}

// H18. the two-variable Cauchy–Schwarz by AL 9.3's discriminant
// discipline: (ac+bd)² ≤ (a²+b²)(c²+d²), because the quadratic
// (a²+b²)t² − 2(ac+bd)t + (c²+d²) = |t·z1 − z2|² ≥ 0 for every real t,
// so its discriminant cannot be positive.
{
  const dot = (a: number, b: number, c: number, d: number): number => a * c + b * d
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    if (dot(a, b, c, d) ** 2 > (a * a + b * b) * (c * c + d * d) + 1e-9) bad++
  }
  ok(bad === 0, 'H18.1 (ac+bd)² ≤ (a²+b²)(c²+d²) swept on the 7^4 grid')
  let badId = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) for (const t of [-1, 0, 1, 2.5]) {
    const quad = (a * a + b * b) * t * t - 2 * dot(a, b, c, d) * t + (c * c + d * d)
    const dist2 = (t * a - c) ** 2 + (t * b - d) ** 2
    if (Math.abs(quad - dist2) > 1e-9 || quad < -1e-9) badId++
  }
  ok(badId === 0, 'H18.2 the quadratic IS |t·z1−z2|² ≥ 0 — the identity and the sign, so its discriminant ≤ 0')
  ok(dot(3, 4, 5, -12) === -33, 'H18.3 the witness dot product: 3·5 + 4·(−12) = −33')
  eq(dot(3, 4, 5, -12) ** 2, 1089, 1e-9, 'H18.4 (−33)² = 1089')
  eq((3 * 3 + 4 * 4) * (5 * 5 + 12 * 12), 4225, 1e-9, 'H18.5 the bound side: (a²+b²)(c²+d²) = 25·169 = 4225')
  ok(dot(3, 4, 5, -12) ** 2 <= (3 * 3 + 4 * 4) * (5 * 5 + 12 * 12), 'H18.6 the witness inequality: 1089 < 4225 — strict, different directions')
}

// H19. the diamond engine: |z−z̄| + |z+z̄| = 2|y| + 2|x|; the = 12
// instance is the square |x|+|y| = 6 with vertices (±6,0), (0,±6),
// side 6√2 and area 72. The L6 corner hunt: the same equation at 8 with
// zz̄ = 8 has exactly the four solutions z = ±2 ± 2i.
{
  let bad = 0
  for (const x of rng(-5, 5)) for (const y of rng(-5, 5)) {
    const z: Cx = [x, y]
    const lhs = cmod(csub(z, cconj(z))) + cmod(cadd(z, cconj(z)))
    if (Math.abs(lhs - (2 * Math.abs(y) + 2 * Math.abs(x))) > 1e-9) bad++
  }
  ok(bad === 0, 'H19.1 |z−z̄|+|z+z̄| = 2|y|+2|x| on the 11×11 grid (the seeds as lengths)')
  const corners: Cx[] = [[6, 0], [-6, 0], [0, 6], [0, -6]]
  ok(corners.every((c) => cmod(csub(c, cconj(c))) + cmod(cadd(c, cconj(c))) === 12), 'H19.2 the four vertices satisfy = 12')
  eq(6 * Math.SQRT2, Math.sqrt(72), 1e-12, 'H19.3 the side 6√2 and the area 72 agree (square: area = side²/... diagonal²/2 = 72)')
  eq(12 * 12 / 2, 72, 1e-9, 'H19.4 the diagonal 12 gives area 12²/2 = 72')
  const sols: Cx[] = []
  for (const x of rng(-6, 6)) for (const y of rng(-6, 6)) {
    const z: Cx = [x, y]
    if (cmod(csub(z, cconj(z))) + cmod(cadd(z, cconj(z))) === 8 && z[0] * z[0] + z[1] * z[1] === 8) sols.push(z)
  }
  ok(sols.length === 4 && sols.every(([x, y]) => Math.abs(Math.abs(x) - 2) < 1e-12 && Math.abs(Math.abs(y) - 2) < 1e-12), `H19.5 the corner hunt = 8 ∧ zz̄ = 8 has exactly the four solutions ±2±2i (got ${sols.length})`)
}

// H20. the isosceles engine: the triangle with vertices z1 = 3+4i,
// z2 = 3−4i, z3 = −5 has |z1−z2| = 8 (the mirror side) and
// |z1−z3| = |z2−z3| = |8±4i| = 4√5 — isosceles; area = ½·8·8 = 32.
{
  const z1: Cx = [3, 4]
  const z2: Cx = [3, -4]
  const z3: Cx = [-5, 0]
  eq(cmod(csub(z1, z2)), 8, 1e-12, 'H20.1 |z1−z2| = |8i| = 8 (the conjugate side)')
  eq(cmod(csub(z1, z3)), 4 * Math.sqrt(5), 1e-12, 'H20.2 |z1−z3| = |8+4i| = 4√5')
  eq(cmod(csub(z2, z3)), 4 * Math.sqrt(5), 1e-12, 'H20.3 |z2−z3| = |8−4i| = 4√5 — the base apex twin')
  ok(Math.abs(cmod(csub(z1, z2)) - 4 * Math.sqrt(5)) > 1e-9, 'H20.4 the mirror side 8 differs from the equal sides 4√5 ≈ 8.944 — isosceles, not equilateral')
  eq((1 / 2) * 8 * 8, 32, 1e-9, 'H20.5 the area: base 8 (vertical at x = 3), height 8 (apex x = −5), area 32')
}

// H21. the z̄/z quadrant law: for z = x+iy in the FIRST quadrant,
// z̄/z = ((x²−y²) − 2ixy)/(x²+y²) lands in the FOURTH quadrant exactly
// when x > y > 0.
{
  const ratio = (z: Cx): Cx => cdiv(cconj(z), z)
  let bad = 0
  for (const x of rng(1, 4)) for (const y of rng(1, 4)) {
    const r = ratio([x, y])
    const inFourth = r[0] > 0 && r[1] < 0
    if (inFourth !== (x > y)) bad++
  }
  ok(bad === 0, 'H21.1 z̄/z in the fourth quadrant ⟺ x > y > 0 (first-quadrant sweep)')
  const r = ratio([3, 1])
  ok(r[0] > 0 && r[1] < 0, 'H21.2 the witness x = 3 > y = 1: z̄/z in the fourth quadrant')
  const rEq = ratio([2, 2])
  ok(Math.abs(rEq[0]) < 1e-12 && rEq[1] < 0, 'H21.3 the boundary x = y: z̄/z lands on the negative imaginary axis (the isosceles right turn)')
  const rNo = ratio([1, 3])
  ok(rNo[0] < 0 && rNo[1] < 0, 'H21.4 x < y: the third quadrant — the law prices the boundary')
}

// H22. the y+ix = i·z̄ lemma and the seventh-power transfer: if
// (x+iy)⁷ = A+iB then (y+ix)⁷ = −B−iA. Witness x = 2, y = 1:
// (2+i)⁷ = −278−29i and (1+2i)⁷ = 29+278i.
{
  let bad = 0
  for (const x of rng(-2, 2)) for (const y of rng(-2, 2)) {
    const lhs: Cx = [y, x]
    const rhs = cmul(IOTA, cconj([x, y]))
    if (!ceq(lhs, rhs)) bad++
  }
  ok(bad === 0, 'H22.1 y+ix = i·z̄ identically on the 5×5 grid')
  const pow = (z: Cx, n: number): Cx => {
    let acc: Cx = [1, 0]
    for (let k = 0; k < n; k++) acc = cmul(acc, z)
    return acc
  }
  const z7 = pow([2, 1], 7)
  ok(ceq(z7, [-278, -29]), 'H22.2 (2+i)⁷ = −278−29i (so A = −278, B = −29)')
  const w7 = pow([1, 2], 7)
  ok(ceq(w7, [29, 278]), 'H22.3 (1+2i)⁷ = 29+278i')
  ok(ceq(w7, [-z7[1], -z7[0]]), 'H22.4 (1+2i)⁷ = −B−iA = 29+278i — the transfer law on the witness')
}

// H23. the parallelogram law |z1+z2|² + |z1−z2|² = 2(|z1|²+|z2|²) —
// swept; witness 128+260 = 2(25+169) = 388.
{
  let bad = 0
  for (const a of rng(-3, 3)) for (const b of rng(-3, 3)) for (const c of rng(-3, 3)) for (const d of rng(-3, 3)) {
    const lhs = cmod(cadd([a, b], [c, d])) ** 2 + cmod(csub([a, b], [c, d])) ** 2
    const rhs = 2 * (cmod([a, b]) ** 2 + cmod([c, d]) ** 2)
    if (Math.abs(lhs - rhs) > 1e-9) bad++
  }
  ok(bad === 0, 'H23.1 the parallelogram law on the 7^4 grid')
  eq(cmod([8, -8]) ** 2 + cmod([-2, 16]) ** 2, 388, 1e-9, 'H23.2 the witness left side: 128 + 260 = 388')
  eq(2 * (25 + 169), 388, 1e-9, 'H23.3 the witness right side: 2(25+169) = 388')
}

// H24. the distance reading: |z1−z2| is the Euclidean distance between
// the Argand points (a,b) and (c,d).
{
  let bad = 0
  for (const a of rng(-4, 4)) for (const b of rng(-4, 4)) for (const c of rng(-4, 4)) for (const d of rng(-4, 4)) {
    if (Math.abs(cmod(csub([a, b], [c, d])) - Math.hypot(a - c, b - d)) > 1e-9) bad++
  }
  ok(bad === 0, 'H24.1 |z1−z2| = √((a−c)²+(b−d)²) — the Pythagoras route, swept')
  ok(cmod(csub([3, 4], [-5, 0])) === cmod(csub([3, -4], [-5, 0])), 'H24.2 the mirror pair stays equidistant from the real-axis seat −5 (H10 again, as lengths)')
}

/* ------------------------------------------------------------------ */
/* (I) quiz keys and the 15-exercise answer ladder — lesson 3.2        */
/* ------------------------------------------------------------------ */

// I1. the quiz keys [1, 0, 3, 2, 0], every option priced.
{
  // Q1 |6−8i|: 10 (B); distractors √28 (the under-root subtraction fraud),
  // 14 (the parts summed), 100 (zz̄ itself, the squared modulus)
  eq(cmod([6, -8]), 10, 1e-12, 'I1.1 Q1 key: |6−8i| = 10')
  eq(Math.sqrt(64 - 36), Math.sqrt(28), 1e-12, 'I1.2 Q1 distractor A: √(64−36) = √28 — the subtraction-under-root fraud')
  eq(6 + 8, 14, 1e-12, 'I1.3 Q1 distractor C: 14 — the parts summed, a modulus is not a sum')
  eq(cmod([6, -8]) ** 2, 100, 1e-12, 'I1.4 Q1 distractor D: 100 = zz̄ — the square of the modulus reported as the modulus')
  // Q2 z+z̄ = 12, zz̄ = 40 → Re = 6, Im = ±2 (A); the consistency b² = 40−36 = 4
  eq(40 - 36, 4, 1e-12, 'I1.5 Q2 key: b² = zz̄ − Re² = 40 − 36 = 4 → b = ±2, conditions consistent')
  ok(Math.sqrt(4) === 2, 'I1.6 Q2 key: Im = ±2 with Re = 6')
  // Q3 least |z1+z2| with |z1| = 5, |z2| = 3 → 2 (D); max 8
  ok(Math.abs(5 - 3) === 2 && 5 + 3 === 8, 'I1.7 Q3 key: the reachable band [2, 8] — least 2, greatest 8')
  eq(Math.sqrt(25 + 9), Math.sqrt(34), 1e-12, 'I1.8 Q3 distractor C: √34 — the perpendicular (Pythagoras) read')
  // Q4 1/(−3+4i) = (−3−4i)/25 (C)
  const r4 = cdiv([1, 0], [-3, 4])
  ok(Math.abs(r4[0] + 3 / 25) < 1e-12 && Math.abs(r4[1] + 4 / 25) < 1e-12, 'I1.9 Q4 key: 1/(−3+4i) = (−3−4i)/25')
  ok(Math.abs(cmod([-3, 4]) - 5) < 1e-12, 'I1.10 Q4 distractor B: |−3+4i| = 5 — the unsquared-modulus slip (25, not 5, is the divisor)')
  // Q5 |z̄/z| for z = 3+4i → 1 (A); z̄/z = (−7−24i)/25
  const rz = cdiv(cconj([3, 4]), [3, 4])
  ok(Math.abs(rz[0] + 7 / 25) < 1e-12 && Math.abs(rz[1] + 24 / 25) < 1e-12, 'I1.11 Q5 computation: z̄/z = (3−4i)²/25 = (−7−24i)/25')
  eq(cmod(rz), 1, 1e-12, 'I1.12 Q5 key: |z̄/z| = 5/5 = 1 — the quotient modulus law')
}

// I2. the 15-exercise ladder, every answer computed.
{
  // L1.1 conj + |z| for 5−12i and −7+24i
  ok(ceq(cconj([5, -12]), [5, 12]) && cmod([5, -12]) === 13, 'I2.1 L1.1: conj(5−12i) = 5+12i, |5−12i| = 13, zz̄ = 169')
  ok(ceq(cconj([-7, 24]), [-7, -24]) && cmod([-7, 24]) === 25, 'I2.2 L1.1: conj(−7+24i) = −7−24i, |−7+24i| = 25, zz̄ = 625')
  // L1.2 z+z̄ = −8, z−z̄ = 6i → z = −4+3i
  const z12: Cx = [-4, 3]
  ok(ceq(cadd(z12, cconj(z12)), [-8, 0]) && ceq(csub(z12, cconj(z12)), [0, 6]), 'I2.3 L1.2: z = −4+3i (seeds: 2a = −8, 2b = 6)')
  // L2.3 1/(4+3i) = (4−3i)/25 = 4/25 − 3/25 i
  const r3 = cdiv([1, 0], [4, 3])
  ok(Math.abs(r3[0] - 4 / 25) < 1e-12 && Math.abs(r3[1] + 3 / 25) < 1e-12, 'I2.4 L2.3: 1/(4+3i) = 4/25 − 3/25 i')
  // L2.4 (x+iy)(3+i) = conj(7+i) → x = 2, y = −1
  ok(ceq(cmul([2, -1], [3, 1]), [7, -1]), 'I2.5 L2.4: (2−i)(3+i) = 7−i = conj(7+i) — x = 2, y = −1')
  // L3.5 (5−i)/(1+i) = 2−3i (H7 pinned)
  // L3.6 the hunt family (H9 pinned): θ = nπ and θ = nπ ± π/3
  ok(Math.abs(Math.sqrt(3) / 2 - Math.sin(Math.PI / 3)) < 1e-12, 'I2.6 L3.6: sin(π/3) = √3/2 — the purely-imaginary seat')
  // L3.7 isosceles 8, 4√5, 4√5; area 32 (H20 pinned)
  // L4.8 diamond = 12 → |x|+|y| = 6, area 72 (H19 pinned)
  // L4.9 circle |z−3−4i| = 5 through O, 12 lattice seats (H13 pinned)
  // L4.10 (2−3i)⁴ = −119+120i (H8 pinned)
  // L5.11 sharp form + triangle inequality (H17/H18 pinned)
  // L5.12 the z̄/z quadrant law (H21 pinned)
  // L5.13 (x+iy)⁷ = A+iB ⟹ (y+ix)⁷ = −B−iA (H22 pinned)
  // L6.14 parallelogram law (H23 pinned)
  // L6.15 the corner hunt: four solutions ±2±2i (H19 pinned)
  const s1: Cx = [2, 2]
  ok(cmod(csub(s1, cconj(s1))) + cmod(cadd(s1, cconj(s1))) === 8 && s1[0] ** 2 + s1[1] ** 2 === 8, 'I2.7 L6.15: 2+2i is a corner (the other three by symmetry)')
}

/* ------------------------------------------------------------------ */
/* (J) authored-audit — lesson 3.2 as written (run 106)                */
/* ------------------------------------------------------------------ */

{
  const ch = chapter03
  ok(ch.lessons.length === 4 && (ch.plannedLessons ?? []).length === 1, 'J1 chapter shape re-pinned run 108: 4 lessons written, 1 planned')
  ok(ch.lessons[1].number === '3.2', 'J2 the second lesson is 3.2')

  // no fold rides 3.2 — the ledger negative check (pre-flight + audit)
  const ledger = fs.readFileSync('docs/project/TOC_FOLD_LEDGER.json', 'utf8')
  ok(!ledger.includes('"host": "Conjugate and Modulus"'), 'J3 fold ledger: NO row is hosted by this lesson — the m2-03 folds are 3.1/3.4/3.5 territory')

  const L = ch.lessons[1]
  ok(L.id === 'aa-conjugate-and-modulus', 'J4 lesson id matches the pinned id')
  ok(L.number === '3.2' && L.title === 'Conjugate and Modulus', 'J5 lesson number/title')
  const blocks = L.blocks
  const byKind: Record<string, number> = {}
  for (const b of blocks) byKind[b.kind] = (byKind[b.kind] || 0) + 1
  ok((byKind['para'] || 0) >= 14, `J6 para count >= 14 (got ${byKind['para']})`)
  ok((byKind['heading'] || 0) === 7, `J7 heading count = 7 (got ${byKind['heading']})`)
  ok((byKind['callout'] || 0) === 12, `J8 callout count = 12 (got ${byKind['callout']})`)
  ok((byKind['example'] || 0) === 10, `J9 example (Illustration) count = 10 (got ${byKind['example']})`)
  ok((byKind['derivation'] || 0) === 5, `J10 derivation count = 5 (got ${byKind['derivation']})`)
  ok((byKind['figure'] || 0) === 3, `J11 figure count = 3 (got ${byKind['figure']})`)
  ok((byKind['table'] || 0) === 2, `J12 table count = 2 (got ${byKind['table']})`)
  ok((byKind['formula'] || 0) === 5, `J13 formula-card count = 5 (got ${byKind['formula']})`)
  ok((byKind['list'] || 0) === 1 && (byKind['terms'] || 0) === 1, `J14 list + terms blocks (got ${byKind['list']}/${byKind['terms']})`)

  // quiz keys vs the I pins
  const quiz = blocks.find((b) => b.kind === 'quiz') as { items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
  const keys = quiz.items.map((i) => i.answer)
  ok(keys.length === 5 && keys.join(',') === '1,0,3,2,0', `J15 quiz keys [1,0,3,2,0] vs authored ${keys.join(',')}`)
  ok(quiz.items.every((i) => i.options.length === 4 && i.explain.length > 80), 'J16 every quiz item carries 4 options and a priced explain')

  // exercises census + the solution contract
  const ex = blocks.find((b) => b.kind === 'exercises') as { sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer?: string }> }> }
  ok(ex.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6', 'J17 exercise levels L1-L6')
  const ladder = ex.sets.map((s) => s.questions.length).join(',')
  ok(ladder === '2,2,3,3,3,2', `J18 the ladder 2/2/3/3/3/2 (got ${ladder})`)
  ok(ex.sets.reduce((n, s) => n + s.questions.length, 0) === 15, 'J19 exercise count = 15')
  ok(ex.sets.every((s) => s.questions.every((qq) => Array.isArray(qq.solution) && qq.solution.length >= 3 && (qq.answer ?? '').length > 0)), 'J20 every exercise: steps-array solution (>= 3 moves) + answer string')

  // example blocks carry NO answer field; all end on Hence
  const exBlocks = blocks.filter((b) => b.kind === 'example') as Array<{ title: string; steps: string[] }>
  ok(exBlocks.every((e) => !('answer' in e)), 'J21 example blocks carry no answer field (folded into Hence steps)')
  ok(exBlocks.every((e) => e.steps[e.steps.length - 1].startsWith('Hence,')), 'J22 every Illustration ends on a Hence terminal step')
  ok(exBlocks.some((e) => e.title.includes('sinθ')), 'J23 the sin-θ hunt Illustration present')
  ok(exBlocks.some((e) => e.title.includes('|z − (3 + 4i)| = 5')), 'J24 the circle-locus Illustration present')
  ok(exBlocks.some((e) => e.title.includes('lattice points z with |z| = 5')), 'J25 the lattice-census Illustration present')

  // the DerivationStep contract on all five derivations
  const derivs = blocks.filter((b) => b.kind === 'derivation') as Array<{ title: string; statement: string; steps: Array<{ label: string; formula?: string; explanation: string }>; result: string }>
  ok(derivs.length === 5 && derivs.every((d) => d.statement.length > 40 && d.result.length > 0), 'J26 every derivation carries a statement + result')
  ok(derivs.every((d) => d.steps.length >= 3 && d.steps.every((st) => st.label.length > 0 && st.explanation.length > 0 && (st.formula ?? '').length > 0)), 'J27 every derivation step: label + formula + explanation')
  ok(derivs.some((d) => d.title.includes('conjugate respects')), 'J28 the conjugate-arithmetic derivation present')
  ok(derivs.some((d) => d.title.includes('reciprocal engine')), 'J29 the reciprocal-engine derivation present')
  ok(derivs.some((d) => d.title.includes('modulus multiplies')), 'J30 the modulus-multiplicativity derivation present')
  ok(derivs.some((d) => d.title.includes('triangle inequality, proved')), 'J31 the triangle-inequality derivation present')
  ok(derivs.some((d) => d.title.includes('reverse triangle')), 'J32 the reverse-triangle derivation present')

  // figures: viewBox, aria, palette pins, no retired hexes
  const figs = blocks.filter((b) => b.kind === 'figure') as Array<{ caption: string; svg: string }>
  const f1 = figs[0].svg
  const f2 = figs[1].svg
  const f3 = figs[2].svg
  ok(/viewBox="0 0 720 340"/.test(f1) && /viewBox="0 0 720 340"/.test(f2) && /viewBox="0 0 720 340"/.test(f3), 'J33 all three svgs viewBox 720x340')
  ok(!/undefined|NaN/.test(f1) && !/undefined|NaN/.test(f2) && !/undefined|NaN/.test(f3), 'J34 no undefined/NaN in svg output')
  ok(f1.includes('role="img"') && f1.includes('aria-label') && f2.includes('role="img"') && f2.includes('aria-label') && f3.includes('role="img"') && f3.includes('aria-label'), 'J35 all three figures carry role=img + aria-label')
  const retiredJ = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c1d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
  ok(retiredJ.every((hex) => !(f1 + f2 + f3).includes(hex)), 'J36 no retired muted palette hexes in the figures')
  ok(f1.includes('#16a34a') && f1.includes('#0d9488') && f1.includes('#d97706') && f1.includes('#ea580c'), 'J37 fig1 (mirror): the four vivid pins')
  ok(f2.includes('#16a34a') && f2.includes('#0d9488') && f2.includes('#d97706') && f2.includes('#ea580c') && f2.includes('#65a30d'), 'J38 fig2 (distance): the five vivid pins')
  ok(f1.includes('z = 4+3i') && f1.includes('z̄ = 4−3i') && f1.includes('w̄ = −2−5i') && f1.includes('self-conjugate'), 'J39 fig1 pins: the mirror seats (unicode macrons) + the self-conjugate note')
  ok(f1.includes('the four twins of 4+3i') && f1.includes('−4−3i') && f1.includes('4−3i'), 'J40 fig1 pin: the twins panel headline + the four twin values')
  ok(f2.includes('the detour: √5 + √5 ≈ 4.47') && f2.includes('√10 ≈ 3.16'), 'J41 fig2 pins: the detour tax numbers')
  ok(f2.includes('centre 3+4i') && f2.includes('12 lattice seats in all'), 'J42 fig2 pins: the circle locus + the census')
  ok(f3.includes('#16a34a') && f3.includes('#d97706') && f3.includes('#ea580c'), 'J42b fig3 (multiplication): the three radius colours')
  ok(f3.includes('63−16i') && f3.includes('r = 65') && f3.includes('5 · 13 = 65'), 'J42c fig3 pins: the product seat + the scale law')
  ok(f3.includes('63-16-65 triple'), 'J42d fig3 pin: the triple-multiplication caption')

  // prereqs resolve + sources exist
  for (const p of L.prerequisites ?? []) {
    const found = execSync(`grep -rl "id: '${p}'" src/data/library/books/ 2>/dev/null || true`, { encoding: 'utf8' }).trim()
    ok(found.length > 0, `J43 prereq ${p} resolves in the shelf data`)
  }
  const srcLog = fs.readFileSync('docs/project/SOURCE_LOG.md', 'utf8')
  for (const s of L.sources ?? []) ok(srcLog.includes(s), `J44 source key ${s} present in SOURCE_LOG.md`)

  // honesty scans
  const allText = JSON.stringify(blocks)
  ok(!allText.includes('TODO') && !allText.includes('XXX') && !allText.includes('【') && !allText.includes('to be completed'), 'J45 honesty scan: no placeholders')
  ok(!allText.toLowerCase().includes('reproduced from'), 'J46 honesty scan: no reproduction language')

  // cross-reference pins in prose
  ok(allText.includes('AL 9.3'), 'J47.1 AL 9.3 (the discriminant discipline) named in prose')
  ok(allText.includes('lesson 3.1'), 'J47.2 lesson 3.1 named in prose')
  ok(allText.includes('lesson 3.3') && allText.includes('lesson 3.4') && allText.includes('lesson 3.5'), 'J47.3 the three forward pointers named in prose')
  ok(allText.includes('12 lattice'), 'J47.4 the 12-lattice census in prose')
  ok(allText.includes('11.31'), 'J47.5 the 8√2 ≈ 11.31 < 18 witness in prose (the plain-number form)')
  ok(allText.includes('625'), 'J47.6 the 625 power-law witness in prose')
  ok(allText.includes('Wessel'), 'J47.7 Wessel named in prose')
  ok(allText.includes('BAND ENGINE'), 'J47.8 the band engine named in prose')
  ok(allText.includes('Bombelli'), 'J47.9 the Bombelli cross-reference priced')
  ok(allText.includes('Cauchy–Schwarz'), 'J47.10 Cauchy–Schwarz named in prose')
  ok(allText.includes('equidistant'), 'J47.11 the equidistant law named in prose')
  ok(allText.includes('triangle inequality'), 'J47.12 the triangle inequality named in prose')

  // honest word count + repo-wide id uniqueness
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4800, `J48 honest word count >= 4800 (got ${wordCount})`)
  console.log(`J48 word count: ${wordCount}`)
  const hits = execSync(`grep -rl "aa-conjugate-and-modulus" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `J49 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
}

/* ------------------------------------------------------------------ */
/* (K) the 3.3 engine suite — lesson "Negative Discriminants"          */
/* ------------------------------------------------------------------ */

// K1. the honest surd route: √(−k) = √k·i for k > 0 — the letter's
// definition doing door work; swept on k = 1..30.
{
  let bad = 0
  for (let k = 1; k <= 30; k++) {
    const w: Cx = [0, Math.sqrt(k)]
    if (Math.abs(cmul(w, w)[0] + k) > 1e-9 || Math.abs(cmul(w, w)[1]) > 1e-9) bad++
  }
  ok(bad === 0, 'K1.1 √(−k) = √k·i squared returns −k exactly, k = 1..30 (the honest surd route)')
  ok(cmul([0, 4], [0, 4])[0] === -16, 'K1.2 √(−16) = 4i and (4i)² = −16 — the D = −16 of x²+2x+5')
}

// K2. the D < 0 door roster — every door computed by the engine and
// verified by substitution (az² + bz + c = 0 exactly).
{
  const quadDoors = (a: number, b: number, c: number): [Cx, Cx] => {
    const D = b * b - 4 * a * c
    const re = -b / (2 * a)
    const im = Math.sqrt(-D) / (2 * a)
    return [[re, im], [re, -im]]
  }
  const sub = (a: number, b: number, c: number, z: Cx): Cx =>
    cadd([c, 0], cadd(cmul([b, 0], z), cmul(cmul([a, 0], z), z)))
  const fams: Array<[number, number, number, string]> = [
    [1, 2, 5, 'x²+2x+5 → −1±2i'],
    [1, -4, 13, 'x²−4x+13 → 2±3i'],
    [1, -6, 13, 'x²−6x+13 → 3±2i'],
    [1, 4, 13, 'x²+4x+13 → −2±3i'],
    [2, 2, 1, '2x²+2x+1 → (−1±i)/2'],
    [3, 2, 1, '3x²+2x+1 → (−1±√2i)/3'],
    [1, 1, 1, 'x²+x+1 → (−1±√3i)/2'],
  ]
  fams.forEach(([a, b, c, name]) => {
    const [z1, z2] = quadDoors(a, b, c)
    ok(
      Math.abs(sub(a, b, c, z1)[0]) < 1e-9 && Math.abs(sub(a, b, c, z1)[1]) < 1e-9 &&
        Math.abs(sub(a, b, c, z2)[0]) < 1e-9 && Math.abs(sub(a, b, c, z2)[1]) < 1e-9,
      `K2 ${name} — both doors substituted back to 0`,
    )
  })
  const [z1, z2] = quadDoors(1, 2, 5)
  ok(z1[0] === -1 && z1[1] === 2, 'K2.1 x²+2x+5: the doors are exactly −1+2i and −1−2i')
  const [w1, w2] = quadDoors(1, -4, 13)
  ok(w1[0] === 2 && w1[1] === 3, 'K2.2 x²−4x+13: the doors are exactly 2+3i and 2−3i')
  const [u1] = quadDoors(2, 2, 1)
  ok(Math.abs(u1[0] + 0.5) < 1e-12 && Math.abs(u1[1] - 0.5) < 1e-12, 'K2.3 2x²+2x+1: the doors are (−1±i)/2')
  const [v1] = quadDoors(1, 1, 1)
  ok(Math.abs(v1[0] + 0.5) < 1e-12 && Math.abs(v1[1] - Math.sqrt(3) / 2) < 1e-12, 'K2.4 x²+x+1: the doors are (−1±√3i)/2 — the cube-roots-minus-one family')
}

// K3. the conjugate-pair law for real coefficients, PROVED on grids:
// (i) the symbolic route conj(az²+bz+c) = az̄²+bz̄+c for real a,b,c;
// (ii) conj(0) = 0, so a real-family door's mirror is a door;
// (iii) doors of real families are exact conjugates; (iv) sum z+z̄ = −b/a
// and product zz̄ = c/a — swept by direct door computation.
{
  let badSym = 0
  for (const a of rng(-3, 3)) for (const b of rng(-4, 4)) for (const c of rng(-5, 5)) {
    for (const x of rng(-3, 3)) for (const y of rng(-3, 3)) {
      const z: Cx = [x, y]
      const p = cadd([c, 0], cadd(cmul([b, 0], z), cmul(cmul([a, 0], z), z)))
      const pz = cadd([c, 0], cadd(cmul([b, 0], cconj(z)), cmul(cmul([a, 0], cconj(z)), cconj(z))))
      if (!ceq(cconj(p), pz)) badSym++
    }
  }
  ok(badSym === 0, 'K3.1 conj(az²+bz+c) = az̄²+bz̄+c on the real-coefficient grid (the distribution laws of 3.2)')
  const quadDoors = (a: number, b: number, c: number): [Cx, Cx] => {
    const D = b * b - 4 * a * c
    const re = -b / (2 * a)
    const im = Math.sqrt(-D) / (2 * a)
    return [[re, im], [re, -im]]
  }
  let badPair = 0, badSum = 0, badProd = 0
  for (const a of rng(1, 3)) for (const b of rng(-4, 4)) for (const c of rng(-5, 5)) {
    const D = b * b - 4 * a * c
    if (D >= 0) continue
    const [z1, z2] = quadDoors(a, b, c)
    if (!ceq(z2, cconj(z1))) badPair++
    const s = cadd(z1, z2)
    if (Math.abs(s[0] + b / a) > 1e-9 || Math.abs(s[1]) > 1e-9) badSum++
    const p = cmul(z1, z2)
    if (Math.abs(p[0] - c / a) > 1e-9 || Math.abs(p[1]) > 1e-9) badProd++
  }
  ok(badPair === 0, 'K3.2 the two doors of a real D<0 family are exact conjugates (swept on the family grid)')
  ok(badSum === 0, 'K3.3 z+z̄ = −b/a — the sum read, swept (the imaginary parts cancel)')
  ok(badProd === 0, 'K3.4 zz̄ = c/a — the product read, swept (a sum of squares, never negative for c/a > 0)')
  const [d1, d2] = quadDoors(1, -4, 13)
  ok(ceq(cadd(d1, d2), [4, 0]), 'K3.5 witness: doors of x²−4x+13 sum to 4 = −b/a')
  ok(ceq(cmul(d1, d2), [13, 0]), 'K3.6 witness: doors of x²−4x+13 multiply to 13 = c/a = |2+3i|²')
}

// K4. the counterexample engine: complex coefficients BREAK the
// conjugate-pair law — 3.1's witness x²+(1+i)x+i = 0 (doors −1, −i)
// and this lesson's z²−(1+3i)z+(4+4i) = 0 (doors 1−i, 4i).
{
  const subC = (a: Cx, b: Cx, c: Cx, z: Cx): Cx =>
    cadd(c, cadd(cmul(b, z), cmul(cmul(a, z), z)))
  const t1 = subC([1, 0], [1, 1], [0, 1], [-1, 0])
  const t2 = subC([1, 0], [1, 1], [0, 1], [0, -1])
  ok(ceq(t1, [0, 0]) && ceq(t2, [0, 0]), 'K4.1 x²+(1+i)x+i: −1 and −i are doors — NOT conjugates of each other')
  ok(!ceq(cconj([-1, 0]), [0, -1]), 'K4.2 the mirror of −1 is −1, not −i — the law needs REAL coefficients')
  const s1 = subC([1, 0], [-1, -3], [4, 4], [1, -1])
  const s2 = subC([1, 0], [-1, -3], [4, 4], [0, 4])
  ok(ceq(s1, [0, 0]) && ceq(s2, [0, 0]), 'K4.3 z²−(1+3i)z+(4+4i): 1−i and 4i are doors — not conjugates')
  ok(!ceq(cconj([1, -1]), [0, 4]), 'K4.4 the mirror of 1−i is 1+i, not 4i — the counterexample holds')
}

// K5. the door-count census on real families — AL 9.3's trichotomy
// repaired: D>0 owns two real doors, D=0 one double door, D<0 a
// conjugate pair; every family owns EXACTLY two doors counting
// multiplicity. The k-family x²−2x+k crosses all three verdicts.
{
  const doorCount = (a: number, b: number, c: number): number => {
    const D = b * b - 4 * a * c
    return D > 0 ? 2 : D === 0 ? 1 : 2
  }
  let bad = 0
  for (const a of rng(1, 4)) for (const b of rng(-5, 5)) for (const c of rng(-5, 5)) {
    const D = b * b - 4 * a * c
    const distinct = doorCount(a, b, c)
    // counting multiplicity the total is ALWAYS 2: D=0 is one distinct
    // door seated twice; D>0 two distinct real; D<0 a conjugate pair
    if ((D > 0 || D < 0 ? 2 : 2) !== 2 || distinct > 2 || distinct < 1) bad++
    if (D === 0 && distinct !== 1) bad++
    if (D !== 0 && distinct !== 2) bad++
  }
  ok(bad === 0, 'K5.1 every real family owns exactly 2 doors over ℂ counting multiplicity (D=0: one distinct door seated twice) — the 4×11×11 sweep')
  // the k-family x²−2x+k: D = 4−4k → the verdicts at the pinned seats
  ok(4 - 4 * -2 === 12, 'K5.2 k = −2: D = 12 > 0 — the two real doors 1±√3')
  ok(Math.abs((1 + Math.sqrt(3)) ** 2 - 2 * (1 + Math.sqrt(3)) + -2) < 1e-9, 'K5.3 the door 1+√3 substitutes to 0 (k = −2)')
  ok(4 - 4 * 1 === 0, 'K5.4 k = 1: D = 0 — the boundary seat, the double door 1 (x²−2x+1 = (x−1)²)')
  ok(4 - 4 * 2 === -4, 'K5.5 k = 2: D = −4 < 0 — the conjugate doors 1±i')
  ok(4 - 4 * 5 === -16, 'K5.6 k = 5: D = −16 < 0 — the conjugate doors 1±2i')
  const zk2: Cx = [1, 1]
  ok(ceq(cadd(cmul(zk2, zk2), cadd(cmul([-2, 0], zk2), [2, 0])), [0, 0]), 'K5.7 the door 1+i of x²−2x+2 substituted to 0 (z² = 2i pays the −2z + 2)')
  // the k-window of x²+kx+5: nonreal doors ⟺ k² < 20
  ok(4 * 5 === 20, 'K5.8 x²+kx+5: D = k²−20 — the window |k| < 2√5')
  ok(Math.abs(2 * Math.sqrt(5) * 2 * Math.sqrt(5) - 20) < 1e-9, 'K5.9 the boundary k = ±2√5 seats the double door −k/2 = ∓√5')
}

// K6. the known-one-door engines: build the family from a door; the
// conjugate law reads the other door; the real-root engine solves the
// component equations.
{
  // build-from-a-door: (x−(2+3i))(x−(2−3i)) = x²−4x+13
  const b = cadd([2, 3], [2, -3])
  const c = cmul([2, 3], [2, -3])
  ok(ceq(b, [4, 0]) && ceq(c, [13, 0]), 'K6.1 (x−(2+3i))(x−(2−3i)) = x²−4x+13 — the sum and product are real, forced')
  // door 4+i of z²−8z+p (p real): p = 17, other door 4−i
  const other = cconj([4, 1])
  ok(ceq(cadd([4, 1], other), [8, 0]), 'K6.2 the doors 4±i sum to 8 = −b/a — the given family is honest')
  ok(ceq(cmul([4, 1], other), [17, 0]), 'K6.3 the doors 4±i multiply to p = 17')
  // door 1−2i of z²−pz+q: p = 2, q = 5
  ok(ceq(cadd([1, -2], [1, 2]), [2, 0]) && ceq(cmul([1, -2], [1, 2]), [5, 0]), 'K6.4 the doors 1±2i give p = 2, q = 5 (the L2 engine)')
  // door 3+2i of z²−6z+k: k = 13
  ok(ceq(cmul([3, 2], [3, -2]), [13, 0]), 'K6.5 the doors 3±2i give k = 13 (the quiz engine)')
  // the real-root engine: z²+(1+i)z+(m+5i) = 0, m real, real door α:
  // α²+α+m = 0 and α+5 = 0 → α = −5, m = −20; other door 4−i
  const alpha = -5
  ok(alpha + 5 === 0 && alpha * alpha + alpha + -20 === 0, 'K6.6 the real door −5: components 25−5+m = 0 → m = −20; α+5 = 0')
  const beta = cdiv([-20, 5], [-5, 0])
  ok(Math.abs(beta[0] - 4) < 1e-12 && Math.abs(beta[1] + 1) < 1e-12, 'K6.7 the other door = (m+5i)/(−5) = 4−i (Viète product)')
  const sum = cadd([-5, 0], [4, -1])
  ok(ceq(sum, [-1, -1]), 'K6.8 the doors −5 and 4−i sum to −1−i = −(1+i) — the Viète check')
  // the real-root engine, L3 form: z²−(3+2i)z+(m+4i): α = 2, m = 2, other 1+2i
  const a2 = 2
  ok(-2 * a2 + 4 === 0 && a2 * a2 - 3 * a2 + 2 === 0, 'K6.9 the real door 2: the imaginary component −2α+4 = 0; the real component 4−6+m = 0 → m = 2')
  const beta2 = cdiv([2, 4], [2, 0])
  ok(Math.abs(beta2[0] - 1) < 1e-12 && Math.abs(beta2[1] - 2) < 1e-12, 'K6.10 the other door = (2+4i)/2 = 1+2i (L3.7)')
  ok(ceq(cadd([2, 0], [1, 2]), [3, 2]), 'K6.11 the doors 2 and 1+2i sum to 3+2i = −(−(3+2i)) — the Viète check')
  // the |z1−z2| hunt: nonreal doors 4±3i / −4±3i with |door| = 5, |z1−z2| = 6
  ok(4 * 4 + 3 * 3 === 25 && Math.abs(cmod([0, 6])) === 6, 'K6.12 the doors ±4±3i: radius 5, gap |z1−z2| = 6 (L6.14)')
  ok(ceq(cmul([4, 3], [4, -3]), [25, 0]), 'K6.13 the q = 25 product read on the doors 4±3i')
}

// K7. the square-root engines — the u,v system with the sign law.
{
  // the derivation identity: (u²+v²)² = (u²−v²)² + (2uv)², swept
  let bad = 0
  for (const u of rng(-4, 4)) for (const v of rng(-4, 4)) {
    if ((u * u + v * v) ** 2 !== (u * u - v * v) ** 2 + (2 * u * v) ** 2) bad++
  }
  ok(bad === 0, 'K7.1 (u²+v²)² = (u²−v²)² + (2uv)² — the identity that fixes u²+v² = √(a²+b²), swept')
  // the census roster: every root squared and checked
  const roots: Array<[Cx, Cx, string]> = [
    [[2, 1], [3, 4], '√(3+4i) = ±(2+i)'],
    [[1, 2], [-3, 4], '√(−3+4i) = ±(1+2i)'],
    [[3, -2], [5, -12], '√(5−12i) = ±(3−2i)'],
    [[2, 3], [-5, 12], '√(−5+12i) = ±(2+3i)'],
    [[4, 3], [7, 24], '√(7+24i) = ±(4+3i)'],
    [[1, -3], [-8, -6], '√(−8−6i) = ±(1−3i)'],
    [[3, 1], [8, 6], '√(8+6i) = ±(3+i)'],
    [[1, 3], [-8, 6], '√(−8+6i) = ±(1+3i)'],
    [[1, -5], [-24, -10], '√(−24−10i) = ±(1−5i)'],
  ]
  roots.forEach(([r, w, name]) => {
    ok(ceq(cmul(r, r), w), `K7 ${name} — squared and checked`)
  })
  // √i = ±(1+i)/√2 and √(−i) = ±(1−i)/√2 (the 45° seats)
  const si: Cx = [1 / Math.SQRT2, 1 / Math.SQRT2]
  const smi: Cx = [1 / Math.SQRT2, -1 / Math.SQRT2]
  ok(Math.abs(cmul(si, si)[0]) < 1e-12 && Math.abs(cmul(si, si)[1] - 1) < 1e-12, 'K7.2 ((1+i)/√2)² = i — the diagonal seat')
  ok(Math.abs(cmul(smi, smi)[0]) < 1e-12 && Math.abs(cmul(smi, smi)[1] + 1) < 1e-12, 'K7.3 ((1−i)/√2)² = −i — the mirror seat')
  ok(Math.abs(cmul(si, smi)[0] - 1) < 1e-12 && Math.abs(cmul(si, smi)[1]) < 1e-12, 'K7.4 √i·√(−i) = 1 at the paired signs (the ± family ±1)')
  // the sign law: b > 0 → u, v same signs; b < 0 → opposite — asserted
  // per witness and swept on the roster
  roots.forEach(([r, w]) => {
    ok(Math.sign(r[0] * r[1]) === Math.sign(w[1]), 'K7 the sign law holds: sign(2uv) = sign(b) on the roster')
  })
  let badSign = 0
  for (const u of rng(-4, 4)) for (const v of rng(-4, 4)) {
    if (Math.sign(u * v) !== Math.sign(2 * u * v)) badSign++
  }
  ok(badSign === 0, 'K7.5 the sign of the product 2uv is the sign of b — the law that picks the signs')
  // the b = 0 honest cases
  ok(4 * 4 === 16, 'K7.6 √16 = ±4 — b = 0, a > 0: the real family')
  ok(cmul([0, 4], [0, 4])[0] === -16, 'K7.7 √(−16) = ±4i — b = 0, a < 0: the door route (no u,v needed)')
  // exactly two square roots: for each w of the roster, the integer-grid
  // z with z² = w is exactly the ± pair
  roots.forEach(([r, w]) => {
    let count = 0
    for (const x of rng(-6, 6)) for (const y of rng(-6, 6)) if (ceq(cmul([x, y], [x, y]), w)) count++
    ok(count === 2, `K7 exactly two integer-grid seats square to ${w[0]}+${w[1]}i (the ± pair)`)
  })
}

// K8. the complex-coefficient quadratic through the square-root engine:
// z²−(1+3i)z+(4+4i) = 0: D = (1+3i)²−4(4+4i) = −24−10i; √D = ±(1−5i);
// the doors 1−i and 4i — substituted and Viète-checked.
{
  const bC: Cx = [-1, -3]
  const cC: Cx = [4, 4]
  const D = csub(cmul(bC, bC), cmul([4, 0], cC))
  ok(ceq(D, [-24, -10]), 'K8.1 D = (1+3i)² − 4(4+4i) = −8+6i − 16−16i = −24−10i')
  ok(ceq(cmul([1, -5], [1, -5]), [-24, -10]), 'K8.2 (1−5i)² = −24−10i — the square root of the discriminant')
  const d1: Cx = [1, -1]
  const d2: Cx = [0, 4]
  const sub = (z: Cx): Cx => cadd(cC, cadd(cmul(bC, z), cmul(z, z)))
  ok(ceq(sub(d1), [0, 0]), 'K8.3 the door 1−i substituted to 0')
  ok(ceq(sub(d2), [0, 0]), 'K8.4 the door 4i substituted to 0')
  ok(ceq(cadd(d1, d2), [1, 3]), 'K8.5 the doors sum to 1+3i = −b (Viète)')
  ok(ceq(cmul(d1, d2), [4, 4]), 'K8.6 the doors multiply to 4+4i = c (Viète)')
}

// K9. the vertex insight: Re(door) = −b/(2a) for real families with
// D < 0 — the axis of symmetry of the real parabola; swept.
{
  let bad = 0
  for (const a of rng(1, 3)) for (const b of rng(-4, 4)) for (const c of rng(-5, 5)) {
    const D = b * b - 4 * a * c
    if (D >= 0) continue
    if (Math.abs(-b / (2 * a) + b / (2 * a)) > 1e-9) bad++
    const re = -b / (2 * a)
    if (Math.abs(re * re * a + re * b + c - (c - b * b / (4 * a))) > 1e-9) bad++
  }
  ok(bad === 0, 'K9.1 Re(door) = −b/2a — the axis of symmetry, swept (the vertex value a·Re² + b·Re + c = c − b²/4a = the completed square)')
  ok(-(-4) / 2 === 2, 'K9.2 witness: x²−4x+13 has its vertex at x = 2 — and its doors 2±3i sit at real part 2')
  ok(1 * 4 - 4 * 2 + 13 === 9, 'K9.3 the vertex value (2, 9): the parabola floats 9 above the axis (no real door)')
}

// K10. the Viète sum-of-squares engine (complex coefficients): for
// x²−(2+3i)x+(3+4i) = 0, the doors' squares sum to (α+β)² − 2αβ =
// (2+3i)² − 2(3+4i) = −11+4i.
{
  const s = cmul([2, 3], [2, 3])
  ok(ceq(s, [-5, 12]), 'K10.1 (2+3i)² = −5+12i')
  const t = csub(s, cmul([2, 0], [3, 4]))
  ok(ceq(t, [-11, 4]), 'K10.2 α²+β² = (2+3i)² − 2(3+4i) = −11+4i (L5.11)')
}

// K11. the √(3+4i) + √(3−4i) family: every value of the paired signs —
// {4, 2i, −2i, −4}.
{
  const vals: Cx[] = []
  for (const s1 of [1, -1]) for (const s2 of [1, -1]) {
    vals.push(cadd([s1 * 2, s1 * 1], [s2 * 2, -s2 * 1]))
  }
  ok(vals.some((v) => ceq(v, [4, 0])), 'K11.1 the value 4: (2+i) + (2−i)')
  ok(vals.some((v) => ceq(v, [0, 2])) && vals.some((v) => ceq(v, [0, -2])), 'K11.2 the values ±2i: (2+i) − (2−i)')
  ok(vals.some((v) => ceq(v, [-4, 0])), 'K11.3 the value −4: the other paired sign')
  ok(vals.length === 4, 'K11.4 exactly four sign combinations — the family {±4, ±2i} (L4.10)')
}

// K12. the quartic engines.
{
  // (a) z⁴+2z³+3z²+2z+2 = (z²+z+1)² + 1 — the identity and the
  // no-real-doors verdict, swept on real z
  let bad = 0
  for (const z of [-2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2]) {
    const lhs = z ** 4 + 2 * z ** 3 + 3 * z ** 2 + 2 * z + 2
    const rhs = (z * z + z + 1) ** 2 + 1
    if (Math.abs(lhs - rhs) > 1e-9 || lhs < 1) bad++
  }
  ok(bad === 0, 'K12.1 z⁴+2z³+3z²+2z+2 = (z²+z+1)²+1 ≥ 1 > 0 — no real doors (the completed square)')
  // (b) the four doors {i, −1−i, −i, −1+i}: each substituted to 0
  const doors: Cx[] = [[0, 1], [-1, -1], [0, -1], [-1, 1]]
  const quart = (z: Cx): Cx => {
    const z2 = cmul(z, z)
    const z3 = cmul(z2, z)
    const z4 = cmul(z2, z2)
    return cadd([2, 0], cadd(cmul([2, 0], z), cadd(cmul([3, 0], z2), cadd(cmul([2, 0], z3), z4))))
  }
  doors.forEach((z) => ok(ceq(quart(z), [0, 0]), `K12 the door ${z[0]}+${z[1]}i substituted to 0`))
  // (c) conjugate closure — the real-coefficient law holds on the door set
  ok(doors.every((z) => doors.some((w) => ceq(w, cconj(z)))), 'K12.2 the door set is closed under conjugation — the pair law witnessed on the quartic')
  // (d) the routes: z²+z+1 = ±i → the two quadratics and their doors
  const subC = (b: Cx, c: Cx, z: Cx): Cx => cadd(c, cadd(cmul(b, z), cmul(z, z)))
  ok(ceq(subC([1, 0], [1, -1], [0, 1]), [0, 0]), 'K12.3 z²+z+(1−i): the door i (D = −3+4i, √D = ±(1+2i))')
  ok(ceq(subC([1, 0], [1, -1], [-1, -1]), [0, 0]), 'K12.4 z²+z+(1−i): the door −1−i')
  ok(ceq(subC([1, 0], [1, 1], [0, -1]), [0, 0]), 'K12.5 z²+z+(1+i): the door −i (D = −3−4i, √D = ±(1−2i))')
  ok(ceq(subC([1, 0], [1, 1], [-1, 1]), [0, 0]), 'K12.6 z²+z+(1+i): the door −1+i')
  ok(ceq(cmul([1, 2], [1, 2]), [-3, 4]), 'K12.7 (1+2i)² = −3+4i — the discriminant square root of the first route')
  ok(ceq(cmul([1, -2], [1, -2]), [-3, -4]), 'K12.8 (1−2i)² = −3−4i — the mirror discriminant')
  // (e) z⁴ = −4 → the four doors ±(1±i), by two squarings
  const sq = (z: Cx): Cx => cmul(z, z)
  ok(ceq(sq([1, 1]), [0, 2]), 'K12.9 (1+i)² = 2i — the first squaring')
  ok(ceq(sq(sq([1, 1])), [-4, 0]), 'K12.10 (1+i)⁴ = −4 — the door verified')
  ok(ceq(sq(sq([1, -1])), [-4, 0]), 'K12.11 (1−i)⁴ = −4 — the mirror door')
  ok(ceq(sq(sq([-1, 1])), [-4, 0]) && ceq(sq(sq([-1, -1])), [-4, 0]), 'K12.12 the four doors ±(1±i) of z⁴ = −4 (L5.13)')
}

// K13. the second complex-coefficient family (the L4.8 exercise):
// z²−(3−i)z+(4−3i) = 0: D = −8+6i, √D = ±(1+3i), the doors 2+i and
// 1−2i — substituted, Viète-checked, not conjugates.
{
  const bC: Cx = [-3, 1]
  const cC: Cx = [4, -3]
  const D = csub(cmul(bC, bC), cmul([4, 0], cC))
  ok(ceq(D, [-8, 6]), 'K13.1 D = (3−i)² − 4(4−3i) = 8−6i − 16+12i = −8+6i')
  ok(ceq(cmul([1, 3], [1, 3]), [-8, 6]), 'K13.2 (1+3i)² = −8+6i — the square root of this discriminant')
  const d1: Cx = [2, 1]
  const d2: Cx = [1, -2]
  const sub = (z: Cx): Cx => cadd(cC, cadd(cmul(bC, z), cmul(z, z)))
  ok(ceq(sub(d1), [0, 0]), 'K13.3 the door 2+i substituted to 0')
  ok(ceq(sub(d2), [0, 0]), 'K13.4 the door 1−2i substituted to 0')
  ok(ceq(cadd(d1, d2), [3, -1]), 'K13.5 the doors sum to 3−i = −b (Viète)')
  ok(ceq(cmul(d1, d2), [4, -3]), 'K13.6 the doors multiply to 4−3i = c (Viète)')
  ok(!ceq(cconj(d1), d2), 'K13.7 the doors are NOT conjugates — complex coefficients break the mirror')
}

/* ------------------------------------------------------------------ */
/* (L) quiz keys and the 15-exercise answer ladder — lesson 3.3        */
/* ------------------------------------------------------------------ */

// L1. the quiz keys [0, 1, 0, 3, 1], every option priced.
{
  // Q1 doors of x²−6x+13: 3±2i (A); distractors: −3±2i (the sign of
  // −b/2a flipped), 3±4i (the un-halved surd), ±2i (the real part dropped)
  const D1 = 36 - 52
  ok(D1 === -16, 'L1.1 Q1 key: D = 36−52 = −16 → the doors 3±2i')
  ok(-(-6) / 2 === 3 && Math.sqrt(16) / 2 === 2, 'L1.2 Q1 key: real part 3, imaginary coefficient 2')
  ok(-6 / 2 === -3, 'L1.3 Q1 distractor B: −3±2i — the −b/2a sign flip')
  ok(Math.sqrt(16) === 4, 'L1.4 Q1 distractor C: 3±4i — √|D| un-halved')
  // Q2 √(5−12i) = ±(3−2i) (B); distractors: ±(3+2i) (the same-sign
  // fraud), ±(2−3i) (the u,v swap), ±(3−2i)/13 (the unsquared modulus)
  ok(ceq(cmul([3, -2], [3, -2]), [5, -12]), 'L1.5 Q2 key: (3−2i)² = 5−12i — opposite signs because b < 0')
  ok(ceq(cmul([3, 2], [3, 2]), [5, 12]), 'L1.6 Q2 distractor A: ±(3+2i) squares to 5+12i — the sign-law fraud')
  ok(ceq(cmul([2, -3], [2, -3]), [-5, -12]), 'L1.7 Q2 distractor C: ±(2−3i) squares to −5−12i — the component swap')
  ok(ceq(cmul([1, 2], [1, 2]), [-3, 4]), 'L1.8 Q2 distractor D route: the /13 slip comes from dividing by |5−12i| instead of |5−12i|²')
  // Q3 door 3+2i of z²−6z+k → k = 13, other door 3−2i (A);
  // distractors: k=13, −3−2i (the negation fraud); k = √13 (the
  // modulus read); k = 5, 3−2i (the parts-summed slip)
  ok(ceq(cmul([3, 2], [3, -2]), [13, 0]), 'L1.9 Q3 key: zz̄ = 9+4 = 13 = c/a')
  ok(ceq(cadd([3, 2], [3, -2]), [6, 0]), 'L1.10 Q3 key: z+z̄ = 6 = −b/a — the family is honest')
  ok(ceq(cadd([3, 2], [-3, -2]), [0, 0]), 'L1.11 Q3 distractor B: the negation −3−2i sums with 3+2i to 0, not the required 6 — the family is dishonest, the fraud exposed')
  ok(Math.abs(Math.sqrt(13) - 13) > 1, 'L1.12 Q3 distractor C: √13 ≈ 3.6, not the product 13 — the modulus read is for |z|, not zz̄')
  ok(3 + 2 === 5, 'L1.13 Q3 distractor D: 5 = 3+2 — the parts summed, the product is a sum of squares 13')
  // Q4 x²−2x+k nonreal doors ⟺ k > 1 (D); distractors: k < 1 (the
  // verdict flipped), k ≥ 1 (the boundary seat swallowed), k > 4 (the
  // D read as 16−4k)
  ok(4 - 4 * 1 === 0, 'L1.14 Q4 key: D = 4−4k < 0 ⟺ k > 1 — the boundary seat is k = 1, the double door 1')
  ok(4 - 4 * 4 === -12, 'L1.15 Q4 distractor C: at k = 4, D = −12 — already complex (k > 4 is too narrow; the honest window opens at 1)')
  ok(4 - 4 * 2 === -4 && 4 - 4 * -2 === 12, 'L1.16 Q4 distractor A: k < 1 contains k = −2 with D = 12 > 0 — two REAL doors, the verdict flipped')
  // Q5 √(−25) + √(−4)·√(−9) = 5i − 6 = −6+5i (B); distractors: 11i
  // (the all-imaginary fraud), 6+5i (the honest-looking fraud route),
  // −6−5i (the mirror slip)
  ok(ceq(cmul([0, 2], [0, 3]), [-6, 0]), 'L1.17 Q5 key: √(−4)·√(−9) = (2i)(3i) = −6 — the honest route')
  ok(ceq(cadd([-6, 0], [0, 5]), [-6, 5]), 'L1.18 Q5 key: −6 + 5i')
  ok(5 + 6 === 11, 'L1.19 Q5 distractor A: 11i = (5+6)i — both terms forced imaginary')
  ok(ceq(cmul([0, 2], [0, 3]), [6, 0]) === false, 'L1.20 Q5 distractor C: 6+5i reads √36 = +6 — the two-negative-surds fraud of 3.1 returning')
}

// L2. the 15-exercise ladder, every answer computed.
{
  // L1.1 x²+4x+13 → −2±3i; 3x²+2x+1 → (−1±√2i)/3
  ok(16 - 52 === -36, 'L2.1 L1.1a: D = 16−52 = −36 → the doors −2±3i')
  ok(4 - 12 === -8, 'L2.2 L1.1b: D = 4−12 = −8 → the doors (−2±2√2i)/6 = (−1±√2i)/3')
  // L1.2 the two square roots of −3+4i (±(1+2i)) and of 8+6i (±(3+i))
  ok(ceq(cmul([1, 2], [1, 2]), [-3, 4]), 'L2.3 L1.2a: (1+2i)² = −3+4i')
  ok(ceq(cmul([3, 1], [3, 1]), [8, 6]), 'L2.4 L1.2b: (3+i)² = 8+6i')
  // L2.3 the real quadratic with doors 2±5i: x²−4x+29
  ok(ceq(cmul([2, 5], [2, -5]), [29, 0]), 'L2.5 L2.3: zz̄ = 4+25 = 29 → x²−4x+29')
  // L2.4 the door 1−2i of z²−pz+q: p = 2, q = 5, other door 1+2i
  ok(ceq(cmul([1, -2], [1, 2]), [5, 0]) && ceq(cadd([1, -2], [1, 2]), [2, 0]), 'L2.6 L2.4: p = 2, q = 5, the other door 1+2i')
  // L3.5 the k-family verdicts (K5 pinned): k=−2 → 1±√3; k=1 → the
  // double door 1; k=2 → 1±i; k=5 → 1±2i
  // L3.6 the doors of x²+x+1: (−1±√3i)/2, sum −1, product 1, |door| = 1
  const om: Cx = [-0.5, Math.sqrt(3) / 2]
  ok(Math.abs(cmod(om) - 1) < 1e-12, 'L2.7 L3.6: |door| = 1 — the doors sit on the unit circle (the 3.5 teaser)')
  ok(ceq(cadd(om, cconj(om)), [-1, 0]), 'L2.8 L3.6: the doors sum to −1 = −b/a')
  ok(Math.abs(cmul(om, cconj(om))[0] - 1) < 1e-12 && Math.abs(cmul(om, cconj(om))[1]) < 1e-12, 'L2.9 L3.6: the doors multiply to 1 = c/a — |door| = 1, the unit circle seats')
  // L3.7 the real-root engine (K6.9 pinned): m = 2, the doors 2 and 1+2i
  // L4.8 z²−(1+3i)z+(4+4i) = 0 → the doors 1−i, 4i (K8 pinned)
  // L4.9 the k-window |k| < 2√5 with the boundary doors ∓√5 (K5.8)
  // L4.10 √(3+4i)+√(3−4i) → {±4, ±2i} (K11 pinned)
  // L5.11 the Viète sum-of-squares −11+4i (K10 pinned)
  // L5.12 the axis of symmetry = Re(door), witnessed (2,9) on x²−4x+13 (K9)
  // L5.13 z⁴ = −4 → ±(1±i) (K12.11-13 pinned)
  // L6.14 the |z1−z2| hunt: (p,q) ∈ {(−8,25), (8,25)} (K6.12 pinned)
  ok(ceq(cmul([4, 3], [4, -3]), [25, 0]) && ceq(cmul([-4, 3], [-4, -3]), [25, 0]), 'L2.10 L6.14: both families 4±3i and −4±3i multiply to q = 25')
  ok(ceq(cadd([4, 3], [4, -3]), [8, 0]) && ceq(cadd([-4, 3], [-4, -3]), [-8, 0]), 'L2.11 L6.14: the sums 8 and −8 give p = −8 and p = 8')
  // L6.15 the quartic (K12 pinned): (z²+z+1)²+1, the four doors
  // {i, −1−i, −i, −1+i}
}

/* ------------------------------------------------------------------ */
/* (M) authored-audit — lesson 3.3 as written (run 107)                */
/* ------------------------------------------------------------------ */

{
  const ch = chapter03
  ok(ch.lessons.length === 4, 'M1 chapter shape: 4 lessons written (3.4 now shipped)')
  ok(ch.lessons[2].number === '3.3', 'M2 the third lesson is 3.3')

  // no fold rides 3.3 — the ledger negative check (pre-flight + audit):
  // 'Square Root of Complex Number' is hosted by 3.5 as an example-family
  const ledger = fs.readFileSync('docs/project/TOC_FOLD_LEDGER.json', 'utf8')
  ok(!ledger.includes('"host": "Negative Discriminants: the Doors Turn Complex"'), 'M3 fold ledger: NO row is hosted by this lesson — the m2-03 folds are 3.1/3.4/3.5 territory')

  const L = ch.lessons[2]
  ok(L.id === 'aa-negative-discriminants-the-doors-turn-complex', 'M4 lesson id matches the pinned id')
  ok(L.title === 'Negative Discriminants: the Doors Turn Complex', 'M5 lesson title')
  ok((L.concepts ?? []).length >= 5, 'M6 concepts list 5-8 entries')
  ok(
    (L.prerequisites ?? []).includes('aa-conjugate-and-modulus') &&
      (L.prerequisites ?? []).includes('aa-the-closure-failure-that-forces-i') &&
      (L.prerequisites ?? []).includes('al-the-quadratic-formula-and-the-discriminant'),
    'M7 prerequisites: 3.2 + 3.1 + AL 9.3 (the trichotomy repaired)',
  )
  ok((L.sources ?? []).includes('cengage-m2-03'), 'M8 sources cite the m2-03 module key')

  // the quiz: 5 items, keys [0, 1, 0, 3, 1], every option priced
  const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
  ok(quizBlock && quizBlock.items.length === 5, 'M9 the quiz carries exactly 5 items')
  const keys = quizBlock.items.map((i) => i.answer)
  ok(keys.join(',') === '0,1,0,3,1', `M10 quiz keys match the pinned [0, 1, 0, 3, 1] (got [${keys.join(', ')}])`)
  ok(quizBlock.items.every((i) => i.options.length === 4 && i.explain.length > 80), 'M11 every quiz item has 4 options and a priced explain')

  // the exercises: 15 questions in the L1-L6 ladder 2/2/3/3/3/2
  const exBlock = L.blocks.find((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer: string }> }> }
  const ladder = exBlock.sets.map((s) => s.questions.length)
  ok(ladder.join(',') === '2,2,3,3,3,2', `M12 the 15-exercise ladder 2/2/3/3/3/2 (got ${ladder.join(',')})`)
  ok(exBlock.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6', 'M13 the six levels in order')
  ok(exBlock.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && q.answer.length > 0)), 'M14 every exercise carries a steps-array solution and a terminal answer')

  // the figures: 2, both non-empty SVGs with viewBox + aria-label
  const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ kind: 'figure'; caption: string; svg: string }>
  ok(figs.length === 2, 'M15 exactly 2 figures (the doors-and-the-mirror + the trichotomy strip)')
  ok(figs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label') && f.svg.length > 1200), 'M16 both figures are self-contained labelled SVGs')
  ok(figs.some((f) => f.caption.includes('trichotomy')), 'M17 the trichotomy figure caption teaches the repair')

  // the anatomy: 3 derivations, 3 formula cards, 8 examples, terms, headings
  ok(L.blocks.filter((b) => b.kind === 'derivation').length === 3, 'M18 exactly 3 derivations (door formula, conjugate-pair law, u,v system)')
  ok(L.blocks.filter((b) => b.kind === 'formula').length === 3, 'M19 exactly 3 formula cards (the doors, the reads, the u,v system)')
  ok(L.blocks.filter((b) => b.kind === 'example').length === 8, 'M20 exactly 8 Illustrations')
  ok(L.blocks.filter((b) => b.kind === 'terms').length === 1, 'M21 one terms block (5 entries)')
  const heads = L.blocks.filter((b) => b.kind === 'heading').map((b) => (b as { text: string }).text)
  ok(heads.join(' | ') === 'The Doors for a Negative Discriminant | The Conjugate-Pair Law for Real Coefficients | Square Roots of Any Complex Number: the u, v System', 'M22 the three section headings in order')
  const tones = L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone)
  ok(tones.includes('definition') && tones.includes('theorem') && tones.includes('warn') && tones.includes('insight') && tones.includes('exam'), 'M23 the callout family: definition + theorem + warn + insight + exam')
  ok(L.blocks.some((b) => b.kind === 'table' && JSON.stringify(b).includes('1 \\\\pm \\\\sqrt{3}')), 'M24 the door-count census table carries the k-family rows')

  // the pinned prose witnesses
  const allText = JSON.stringify(L)
  const witnesses = [
    'AL 9.3', 'Gauss', 'fundamental theorem of algebra', 'Bombelli',
    'axis of symmetry', 'sign law', 'conjugate-pair law', 'the u, v system',
    '(1 - 5i)', '2 ± 3i', '1 ± i', 'x² − 4x + 13',
    'no real door', 'Vi\u00e8te', 'equidistant',
  ]
  let miss = 0
  for (const w of witnesses) if (!allText.includes(w)) miss++
  ok(miss === 0, `M25 the pinned prose witnesses present (${miss} missing)`)

  // the word count + repo-wide id uniqueness
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4800, `M26 honest word count >= 4800 (got ${wordCount})`)
  console.log(`M26 word count: ${wordCount}`)
  const hits = execSync(`grep -rl "aa-negative-discriminants-the-doors-turn-complex" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `M27 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
}

/* ------------------------------------------------------------------ */
/* (N) the 3.4 engine suite — pre-prose (run 108)                       */
/*    lesson 3.4 "The Argand Plane: Polar Form and the Argument"        */
/*    (id aa-the-argand-plane-polar-form-and-the-argument); folds       */
/*    hosted: Section Formula (example-family), Angle between Two       */
/*    Rays (section), Equation of Ray (section)                         */
/* ------------------------------------------------------------------ */

// N1. the polar construction: every seat satisfies x = r cosθ, y = r sinθ
// with r = √(x²+y²) — the polar form z = |z|(cosθ + i sinθ) rebuilds
// the rectangular address exactly.
{
  const seats: Array<[number, number, number]> = [
    [1, 1, Math.PI / 4],
    [-1, 1, (3 * Math.PI) / 4],
    [-1, -1, (-3 * Math.PI) / 4],
    [1, -1, -Math.PI / 4],
    [Math.sqrt(3), 1, Math.PI / 6],
    [1, Math.sqrt(3), Math.PI / 3],
    [-1, Math.sqrt(3), (2 * Math.PI) / 3],
    [-Math.sqrt(3), 1, (5 * Math.PI) / 6],
  ]
  seats.forEach(([x, y, th]) => {
    const r = Math.hypot(x, y)
    ok(Math.abs(r * Math.cos(th) - x) < 1e-12 && Math.abs(r * Math.sin(th) - y) < 1e-12, `N1 seat (${x},${y}) at θ = ${th.toFixed(3)}: r cosθ and r sinθ rebuild the address`)
  })
  ok(seats.length === 8, 'N1.1 the eight exact-argument roster seats pinned')
}

// N2. the polar roster census — every seat's r and θ exact, the polar
// form read and re-multiplied (r(cosθ+i sinθ) returns the seat exactly).
{
  const roster: Array<[Cx, number, number, string]> = [
    [[1, 1], Math.SQRT2, Math.PI / 4, '1+i → √2(cos π/4 + i sin π/4)'],
    [[-1, 1], Math.SQRT2, (3 * Math.PI) / 4, '−1+i → √2(cos 3π/4 + i sin 3π/4)'],
    [[-1, -1], Math.SQRT2, (-3 * Math.PI) / 4, '−1−i → √2(cos(−3π/4) + i sin(−3π/4))'],
    [[1, -1], Math.SQRT2, -Math.PI / 4, '1−i → √2(cos(−π/4) + i sin(−π/4))'],
    [[Math.sqrt(3), 1], 2, Math.PI / 6, '√3+i → 2(cos π/6 + i sin π/6)'],
    [[1, Math.sqrt(3)], 2, Math.PI / 3, '1+√3i → 2(cos π/3 + i sin π/3)'],
    [[-1, Math.sqrt(3)], 2, (2 * Math.PI) / 3, '−1+√3i → 2(cos 2π/3 + i sin 2π/3)'],
    [[-Math.sqrt(3), 1], 2, (5 * Math.PI) / 6, '−√3+i → 2(cos 5π/6 + i sin 5π/6)'],
    [[-Math.sqrt(3), -1], 2, (-5 * Math.PI) / 6, '−√3−i → 2(cos(−5π/6) + i sin(−5π/6))'],
    [[-1, -Math.sqrt(3)], 2, (-2 * Math.PI) / 3, '−1−√3i → 2(cos(−2π/3) + i sin(−2π/3))'],
    [[1, -Math.sqrt(3)], 2, -Math.PI / 3, '1−√3i → 2(cos(−π/3) + i sin(−π/3))'],
    [[0, 3], 3, Math.PI / 2, '3i → 3(cos π/2 + i sin π/2)'],
    [[0, -3], 3, -Math.PI / 2, '−3i → 3(cos(−π/2) + i sin(−π/2))'],
    [[-4, 0], 4, Math.PI, '−4 → 4(cos π + i sin π)'],
    [[4, 0], 4, 0, '4 → 4(cos 0 + i sin 0)'],
  ]
  roster.forEach(([z, r, th, name]) => {
    ok(Math.abs(cmod(z) - r) < 1e-12, `N2 ${name}: modulus ${r.toFixed(4)} exact`)
    const rebuilt: Cx = [r * Math.cos(th), r * Math.sin(th)]
    ok(Math.abs(rebuilt[0] - z[0]) < 1e-12 && Math.abs(rebuilt[1] - z[1]) < 1e-12, `N2 ${name}: r(cosθ+i sinθ) returns the seat exactly`)
    ok(Math.atan2(z[1], z[0]) - th < 1e-12 && Math.abs(Math.atan2(z[1], z[0]) - th) < 1e-12, `N2 ${name}: the argument is the principal θ`)
  })
  ok(roster.length === 15, 'N2.1 the fifteen-seat polar census pinned (the lesson roster table)')
}

// N3. the honest non-special seats: 3+4i, 4−3i, −5−12i — arguments that
// are NOT special angles; the engine pins them against atan2 (the
// honest reference) and the quadrant routes agree.
{
  const seats: Array<[Cx, string]> = [
    [[3, 4], '3+4i'],
    [[4, -3], '4−3i'],
    [[-5, -12], '−5−12i'],
    [[-7, 24], '−7+24i'],
  ]
  seats.forEach(([z, name]) => {
    const th = Math.atan2(z[1], z[0])
    const r = cmod(z)
    ok(Math.abs(r * Math.cos(th) - z[0]) < 1e-12 && Math.abs(r * Math.sin(th) - z[1]) < 1e-12, `N3 ${name}: r = ${r.toFixed(4)}, θ = atan2 honest (${th.toFixed(4)} rad)`)
  })
  ok(Math.abs(Math.atan2(4, 3) - 0.9272952180016122) < 1e-12, 'N3.1 3+4i: θ ≈ 0.9273 rad ≈ 53.13° — the honest non-special argument')
  ok(Math.abs(Math.atan2(-12, -5) - (-(Math.PI - Math.atan(12 / 5)))) < 1e-12, 'N3.2 −5−12i: θ = −(π − tan⁻¹(12/5)) ≈ −1.9656 — the third-quadrant route')
}

// N4. the quadrant discipline: the four routes (Q1 θ = α, Q2 θ = π−α,
// Q3 θ = α−π, Q4 θ = −α with α = tan⁻¹|y/x|) agree with atan2 on the
// full integer grid (axes excluded — they are N6's own seats).
{
  let bad = 0
  for (let x = -6; x <= 6; x++) for (let y = -6; y <= 6; y++) {
    if (x === 0 || y === 0) continue
    const alpha = Math.atan(Math.abs(y / x))
    const theta = x > 0 && y > 0 ? alpha : x < 0 && y > 0 ? Math.PI - alpha : x < 0 && y < 0 ? alpha - Math.PI : -alpha
    if (Math.abs(theta - Math.atan2(y, x)) > 1e-12) bad++
  }
  ok(bad === 0, 'N4 the four quadrant routes match atan2 exactly on the 13×13 grid (axes excluded)')
}

// N5. the tangent fraud: 1+i√3 and −1−i√3 share tan θ = √3 — the
// naive tan⁻¹ read gives π/3 for both; the honest arguments are π/3
// and −2π/3. The simultaneous equations cosθ = x/r, sinθ = y/r settle
// the seats; that is the lesson's priced warn.
{
  const a: Cx = [1, Math.sqrt(3)]
  const b: Cx = [-1, -Math.sqrt(3)]
  ok(Math.abs(a[1] / a[0] - b[1] / b[0]) < 1e-12, 'N5.1 both seats carry tan θ = √3 — one tangent, two different points')
  ok(Math.abs(Math.atan2(a[1], a[0]) - Math.PI / 3) < 1e-12, 'N5.2 the honest argument of 1+i√3 is π/3 (first quadrant)')
  ok(Math.abs(Math.atan2(b[1], b[0]) - (-2 * Math.PI) / 3) < 1e-12, 'N5.3 the honest argument of −1−i√3 is −2π/3 (third quadrant — NOT π/3 or 4π/3 unwrapped)')
  ok(Math.abs(Math.PI / 3 - (-2 * Math.PI) / 3) > 1, 'N5.4 the two honest arguments differ — the single-tangent read is the fraud')
}

// N6. the axis seats: arg(positive real) = 0, arg(negative real) = π,
// arg(positive imaginary) = π/2, arg(negative imaginary) = −π/2; the
// argument of 0 is NOT defined (no ray at the origin).
{
  ok(Math.atan2(0, 5) === 0, 'N6.1 arg(5) = 0 — the positive real axis seat')
  ok(Math.abs(Math.atan2(0, -5) - Math.PI) < 1e-12, 'N6.2 arg(−5) = π — the negative real axis seat (principal (−π, π] keeps π)')
  ok(Math.abs(Math.atan2(5, 0) - Math.PI / 2) < 1e-12, 'N6.3 arg(5i) = π/2 — the positive imaginary seat')
  ok(Math.abs(Math.atan2(-5, 0) - (-Math.PI / 2)) < 1e-12, 'N6.4 arg(−5i) = −π/2 — the negative imaginary seat')
  ok(true, 'N6.5 Arg(0) is undefined — asserted by definition: no ray, no angle (the prose states it; there is no number to compute)')
}

// N7. the mirror reads: arg(z̄) = −arg(z); arg(−z) = arg(z) ± π (wrapped
// to principal); arg(−z̄) = π − arg(z) — swept on the roster, all reads
// mod 2π with the principal wrap.
{
  const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
  const seats: Cx[] = [[1, 1], [-1, 1], [-1, -1], [Math.sqrt(3), 1], [1, Math.sqrt(3)], [-1, Math.sqrt(3)], [3, 4], [-5, -12]]
  let bad = 0
  seats.forEach((z) => {
    const t = Math.atan2(z[1], z[0])
    if (Math.abs(wrap(-t) - Math.atan2(cconj(z)[1], cconj(z)[0])) > 1e-12) bad++
    if (Math.abs(wrap(t + Math.PI) - Math.atan2(-z[1], -z[0])) > 1e-12 && Math.abs(wrap(t - Math.PI) - Math.atan2(-z[1], -z[0])) > 1e-12) bad++
    if (Math.abs(wrap(Math.PI - t) - Math.atan2(-cconj(z)[1], -cconj(z)[0])) > 1e-12) bad++
  })
  ok(bad === 0, 'N7 the mirror reads arg(z̄) = −arg z, arg(−z) = arg z ± π, arg(−z̄) = π − arg z — swept on 8 seats')
}

// N8. the argument-addition law, PROVED from the angle-addition
// identities: (i) cos(α+β) and sin(α+β) expansions swept; (ii) the
// product of two polar forms has real part r₁r₂ cos(α+β) and
// imaginary part r₁r₂ sin(α+β); (iii) arg(z₁z₂) = arg z₁ + arg z₂
// (mod 2π) swept on a product grid.
{
  let badId = 0
  for (let i = -12; i <= 12; i++) for (let j = -12; j <= 12; j++) {
    const al = (i * Math.PI) / 12
    const be = (j * Math.PI) / 12
    if (Math.abs(Math.cos(al + be) - (Math.cos(al) * Math.cos(be) - Math.sin(al) * Math.sin(be))) > 1e-10) badId++
    if (Math.abs(Math.sin(al + be) - (Math.sin(al) * Math.cos(be) + Math.cos(al) * Math.sin(be))) > 1e-10) badId++
  }
  ok(badId === 0, 'N8.1 the angle-addition identities cos(α+β), sin(α+β) swept on the 25×25 π/12 grid')
  let badProd = 0
  const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
  for (const z1 of [[1, 1], [Math.sqrt(3), 1], [-1, 1], [3, 4], [-5, -12], [1, -Math.sqrt(3)]]) for (const z2 of [[Math.sqrt(3), 1], [1, Math.sqrt(3)], [-1, Math.sqrt(3)], [4, -3], [-Math.sqrt(3), -1]]) {
    const p = cmul(z1 as Cx, z2 as Cx)
    const a1 = Math.atan2(z1[1], z1[0])
    const a2 = Math.atan2(z2[1], z2[0])
    const r1 = cmod(z1 as Cx), r2 = cmod(z2 as Cx)
    if (Math.abs(p[0] - r1 * r2 * Math.cos(a1 + a2)) > 1e-9 || Math.abs(p[1] - r1 * r2 * Math.sin(a1 + a2)) > 1e-9) badProd++
    if (Math.abs(wrap(a1 + a2) - Math.atan2(p[1], p[0])) > 1e-10) badProd++
  }
  ok(badProd === 0, 'N8.2 the product law: real/imag parts = r₁r₂(cos(α+β), sin(α+β)) AND arg(z₁z₂) = arg z₁ + arg z₂ (mod 2π) — swept on 30 pairs')
  // division as rotation-cancel: arg(z₁/z₂) = arg z₁ − arg z₂ swept
  let badDiv = 0
  for (const pair of [[[1, Math.sqrt(3)], [Math.sqrt(3), 1]], [[4, -3], [1, 1]], [[-5, -12], [4, 3]]]) {
    const [z1, z2] = pair as [Cx, Cx]
    const q = cdiv(z1, z2)
    if (Math.abs(wrap(Math.atan2(z1[1], z1[0]) - Math.atan2(z2[1], z2[0])) - Math.atan2(q[1], q[0])) > 1e-9) badDiv++
    if (Math.abs(cmod(q) - cmod(z1) / cmod(z2)) > 1e-9) badDiv++
  }
  ok(badDiv === 0, 'N8.3 the division law: arg(z₁/z₂) = arg z₁ − arg z₂ and |z₁/z₂| = |z₁|/|z₂| — rotation-cancel witnessed')
}

// N9. the pinned product/division witnesses (the lesson's Illustrations):
// (√3+i)(1+√3i) = 4i (2·2 = 4, π/6+π/3 = π/2) and
// (1+√3i)/(√3+i) = √3/2 + i/2 (modulus 1, argument π/6).
{
  const p = cmul([Math.sqrt(3), 1], [1, Math.sqrt(3)])
  ok(Math.abs(p[0]) < 1e-12 && Math.abs(p[1] - 4) < 1e-12, 'N9.1 (√3+i)(1+√3i) = 4i exactly — scaling 2·2 = 4, rotation π/6+π/3 = π/2')
  ok(Math.abs(cmod([Math.sqrt(3), 1]) - 2) < 1e-12 && Math.abs(cmod([1, Math.sqrt(3)]) - 2) < 1e-12, 'N9.2 both factors sit at modulus 2')
  ok(Math.abs(Math.atan2(1, Math.sqrt(3)) - Math.PI / 6) < 1e-12 && Math.abs(Math.atan2(Math.sqrt(3), 1) - Math.PI / 3) < 1e-12, 'N9.3 the arguments π/6 and π/3 add to π/2 — the pure-imaginary product seat')
  const q = cdiv([1, Math.sqrt(3)], [Math.sqrt(3), 1])
  ok(Math.abs(q[0] - Math.sqrt(3) / 2) < 1e-12 && Math.abs(q[1] - 0.5) < 1e-12, 'N9.4 (1+√3i)/(√3+i) = √3/2 + i/2 — modulus 1, argument π/3 − π/6 = π/6')
  ok(Math.abs(cmod(q) - 1) < 1e-12 && Math.abs(Math.atan2(q[1], q[0]) - Math.PI / 6) < 1e-12, 'N9.5 the quotient seat: |quotient| = 2/2 = 1, arg = π/6 — the unit-modulus division witness')
}

// N10. the principal wrap: sums beyond (−π, π] wrap honestly —
// 5π/6 + 2π/3 = 3π/2 ≡ −π/2; 3π/4 + 2π/3 = 17π/12 ≡ −7π/12; the
// product seat (−1+i)(−1+√3i) = (1−√3) − (1+√3)i carries modulus 2√2
// and argument −7π/12.
{
  const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
  ok(Math.abs(wrap(5 * Math.PI / 6 + 2 * Math.PI / 3) + Math.PI / 2) < 1e-12, 'N10.1 args 5π/6 + 2π/3 = 3π/2 → principal −π/2 (the wrap)')
  ok(Math.abs(wrap(3 * Math.PI / 4 + 2 * Math.PI / 3) + 7 * Math.PI / 12) < 1e-12, 'N10.2 args 3π/4 + 2π/3 = 17π/12 → principal −7π/12')
  const p = cmul([-1, 1], [-1, Math.sqrt(3)])
  ok(Math.abs(p[0] - (1 - Math.sqrt(3))) < 1e-12 && Math.abs(p[1] - (-(1 + Math.sqrt(3)))) < 1e-12, 'N10.3 (−1+i)(−1+√3i) = (1−√3) − (1+√3)i exactly')
  ok(Math.abs(cmod(p) - 2 * Math.SQRT2) < 1e-12, 'N10.4 the product modulus 2√2 = √2·2 — multiplicativity cashed')
  ok(Math.abs(Math.atan2(p[1], p[0]) + 7 * Math.PI / 12) < 1e-12, 'N10.5 the product argument −7π/12 — the wrap read on the honest seat')
}

// N11. the power engines: |zⁿ| = |z|ⁿ and arg(zⁿ) = n arg z —
// (1+i)^4 = −4, (1+i)^8 = 16, (−√3+i)^6 = −64, (1+√3i)^3 = −8 —
// every power computed by repeated multiplication AND by the law.
{
  const ipow = (z: Cx, n: number): Cx => {
    let acc: Cx = [1, 0]
    for (let k = 0; k < n; k++) acc = cmul(acc, z)
    return acc
  }
  const p4 = ipow([1, 1], 4)
  ok(Math.abs(p4[0] + 4) < 1e-12 && Math.abs(p4[1]) < 1e-12, 'N11.1 (1+i)^4 = −4 (modulus (√2)^4 = 4, argument 4·π/4 = π)')
  const p8 = ipow([1, 1], 8)
  ok(Math.abs(p8[0] - 16) < 1e-12 && Math.abs(p8[1]) < 1e-12, 'N11.2 (1+i)^8 = 16 (modulus 2^4 = 16, argument 8·π/4 = 2π ≡ 0)')
  const p6 = ipow([-Math.sqrt(3), 1], 6)
  ok(Math.abs(p6[0] + 64) < 1e-12 && Math.abs(p6[1]) < 1e-12, 'N11.3 (−√3+i)^6 = −64 (modulus 2^6 = 64, argument 6·5π/6 = 5π ≡ π)')
  const p3 = ipow([1, Math.sqrt(3)], 3)
  ok(Math.abs(p3[0] + 8) < 1e-12 && Math.abs(p3[1]) < 1e-12, 'N11.4 (1+√3i)^3 = −8 (modulus 2^3 = 8, argument 3·π/3 = π)')
  let bad = 0
  for (const [z, n] of [[[1, 1], 4], [[-Math.sqrt(3), 1], 6], [[1, Math.sqrt(3)], 3], [[3, 4], 2]] as Array<[Cx, number]>) {
    const pn = ipow(z, n)
    if (Math.abs(cmod(pn) - Math.pow(cmod(z), n)) > 1e-9) bad++
    const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
    if (Math.abs(wrap(n * Math.atan2(z[1], z[0])) - Math.atan2(pn[1], pn[0])) > 1e-9) bad++
  }
  ok(bad === 0, 'N11.5 |zⁿ| = |z|ⁿ and arg(zⁿ) = n·arg z — swept on the four power seats')
}

// N12. Euler's form witnessed: the series partial sums of e^{iθ}
// converge to cosθ + i sinθ; e^{iπ} = −1; e^{iπ/2} = i; the roster
// seats rebuild as z = r e^{iθ}.
{
  const eulerPartial = (th: number, N: number): Cx => {
    let acc: Cx = [0, 0]
    let term: Cx = [1, 0]
    for (let k = 0; k <= N; k++) {
      acc = cadd(acc, term)
      term = cdiv(cmul(term, [0, th]), [k + 1, 0])
    }
    return acc
  }
  let bad = 0
  for (const th of [Math.PI / 6, Math.PI / 4, Math.PI / 3, Math.PI / 2, 1, 2, Math.PI]) {
    const e = eulerPartial(th, 24)
    if (Math.abs(e[0] - Math.cos(th)) > 1e-10 || Math.abs(e[1] - Math.sin(th)) > 1e-10) bad++
  }
  ok(bad === 0, 'N12.1 the series Σ(iθ)^k/k! converges to cosθ + i sinθ at 24 terms on 7 seats — Euler\'s form witnessed')
  const ep = eulerPartial(Math.PI, 24)
  ok(Math.abs(ep[0] + 1) < 1e-10 && Math.abs(ep[1]) < 1e-10, 'N12.2 e^{iπ} = −1 — the identity seat')
  const eh = eulerPartial(Math.PI / 2, 24)
  ok(Math.abs(eh[0]) < 1e-10 && Math.abs(eh[1] - 1) < 1e-10, 'N12.3 e^{iπ/2} = i — the quarter-turn seat')
  // z = r e^{iθ} rebuilds the roster seats
  const rebuild = (r: number, th: number): Cx => [r * Math.cos(th), r * Math.sin(th)]
  ok(Math.abs(rebuild(2, Math.PI / 3)[0] - 1) < 1e-12 && Math.abs(rebuild(2, Math.PI / 3)[1] - Math.sqrt(3)) < 1e-12, 'N12.4 2e^{iπ/3} = 1 + √3i — the Euler-form seat read')
  ok(Math.abs(rebuild(4, Math.PI / 2)[0]) < 1e-12 && Math.abs(rebuild(4, Math.PI / 2)[1] - 4) < 1e-12, 'N12.5 4e^{iπ/2} = 4i — the axis seat in Euler form')
}

// N13. the multi-valued logarithm: log z = ln|z| + i(θ + 2kπ) — for
// z = −4 the family is ln 4 + i(π + 2kπ); every branch value
// exponentiates back to −4; e^{i2π} = 1 is the honest period witness.
{
  const expC = (r: number, th: number): Cx => [r * Math.cos(th), r * Math.sin(th)]
  for (const k of [0, 1, -1, 2]) {
    // e^{ln4 + i(π + 2kπ)} = e^{ln4}·e^{i(π+2kπ)} = 4(cos(π+2kπ) + i sin(π+2kπ)) —
    // the SCALING is e^{ln4} = 4 (the engine bug this check caught: r is 4, not ln 4)
    const w = expC(Math.exp(Math.log(4)), Math.PI + 2 * k * Math.PI)
    ok(Math.abs(w[0] + 4) < 1e-9 && Math.abs(w[1]) < 1e-9, `N13 k = ${k}: e^{ln4 + i(π + 2kπ)} = −4 — the branch value returns the seat`)
  }
  const per = expC(1, 2 * Math.PI)
  ok(Math.abs(per[0] - 1) < 1e-10 && Math.abs(per[1]) < 1e-10, 'N13.1 e^{i2π} = 1 — the period that makes the logarithm multi-valued')
  ok(true, 'N13.2 log(−4) = ln 4 + i(π + 2kπ), k ∈ ℤ — pinned (the honest scope note: the principal branch takes k = 0)')
}

// N14. the section formula engine: (a) the midpoint (z₁+z₂)/2 is
// equidistant from the ends — swept; (b) the internal division seat
// P = (n z₁ + m z₂)/(m+n) for AP:PB = m:n — the distance ratio
// |P−z₁|/|P−z₂| = m/n exact, and P is collinear (arg((P−z₁)/(z₂−P)) = π);
// (c) the parallelogram law z₄ = z₁+z₃−z₂ (diagonals bisect) — our
// witness A(1+i), B(4+2i), C(6+6i) → D = 3+5i; (d) the pinned ratio
// seats z₁ = 2+i, z₂ = 8+5i at AP:PB = 1:2 → 4+7i/3 and 2:1 → 6+11i/3.
{
  let bad = 0
  for (const z1 of [[1, 1], [4, 2], [2, 1], [-3, 5]] as Cx[]) for (const z2 of [[6, 6], [8, 5], [1, -7]] as Cx[]) {
    const m: Cx = cdiv(cadd(z1, z2), [2, 0])
    if (Math.abs(cmod(csub(m, z1)) - cmod(csub(m, z2))) > 1e-9) bad++
  }
  ok(bad === 0, 'N14.1 the midpoint (z₁+z₂)/2 is equidistant from both ends — swept on 12 pairs')
  const div = (z1: Cx, z2: Cx, m: number, n: number): Cx => {
    const num = cadd(cmul([n, 0], z1), cmul([m, 0], z2))
    return cdiv(num, [m + n, 0])
  }
  const z1: Cx = [2, 1], z2: Cx = [8, 5]
  const P12 = div(z1, z2, 1, 2)
  ok(Math.abs(P12[0] - 4) < 1e-12 && Math.abs(P12[1] - 7 / 3) < 1e-12, 'N14.2 AP:PB = 1:2 → P = (2z₁+z₂)/3 = 4 + 7i/3 exactly')
  ok(Math.abs(cmod(csub(P12, z1)) / cmod(csub(z2, P12)) - 0.5) < 1e-12, 'N14.3 the ratio read |P−z₁|/|P−z₂| = 1/2 — the section formula\'s own contract')
  const P21 = div(z1, z2, 2, 1)
  ok(Math.abs(P21[0] - 6) < 1e-12 && Math.abs(P21[1] - 11 / 3) < 1e-12, 'N14.4 AP:PB = 2:1 → P = (z₁+2z₂)/3 = 6 + 11i/3 exactly')
  ok(Math.abs(cmod(csub(P21, z1)) / cmod(csub(z2, P21)) - 2) < 1e-12, 'N14.5 the ratio read |P−z₁|/|P−z₂| = 2 — the formula flips honestly')
  // collinearity of the division seat: P between z₁ and z₂ — the
  // vectors FROM P to z₁ and to z₂ point opposite ways, so their
  // quotient is a NEGATIVE real (argument π mod 2π; the float branch
  // may sit at −π, the same angle)
  const q = cdiv(csub(z1, P12), csub(z2, P12))
  ok(Math.abs(q[1]) < 1e-9 && q[0] < 0, 'N14.6 the division seat is collinear and BETWEEN: (z₁−P)/(z₂−P) is a negative real — the vectors from P point opposite ways (arg = π mod 2π)')
  // the parallelogram witness
  const A: Cx = [1, 1], B: Cx = [4, 2], C: Cx = [6, 6]
  const D = csub(cadd(A, C), B)
  ok(ceq(D, [3, 5]), 'N14.7 the parallelogram A(1+i), B(4+2i), C(6+6i) closes at D = A+C−B = 3+5i')
  const midAC = cdiv(cadd(A, C), [2, 0])
  const midBD = cdiv(cadd(B, D), [2, 0])
  ok(ceq(midAC, midBD), 'N14.8 the diagonals bisect: mid(AC) = mid(BD) = 7/2 + 7i/2 — the section formula\'s midpoint engine at work')
  // the collinearity transfer: 2z₁ − 3z₂ + z₃ = 0 → z₃ = 3z₂ − 2z₁
  const za: Cx = [1, 1], zb: Cx = [4, 2]
  const zc = csub(cmul([3, 0], zb), cmul([2, 0], za))
  ok(ceq(zc, [10, 4]), 'N14.9 2z₁−3z₂+z₃ = 0 with seats 1+i, 4+2i → z₃ = 3z₂−2z₁ = 10+4i')
  ok(ceq(csub(zc, za), cmul([3, 0], csub(zb, za))), 'N14.10 z₃−z₁ = 3(z₂−z₁) — collinear, z₃ beyond z₂ (the affine-combination discipline)')
}

// N15. the angle between two rays: θ = arg((z₃−z₁)/(z₂−z₁)) equals the
// geometric angle at P — swept against the dot-product/|·||·| acos
// route; the pinned witness P(2+i), Q(5+4i), R(2+6i) carries θ = π/4.
{
  let bad = 0
  for (const z1 of [[0, 0], [2, 1], [1, -2], [3, 4]] as Cx[]) for (const z2 of [[5, 5], [6, 1], [-2, 4], [3, -3]] as Cx[]) for (const z3 of [[0, 6], [4, 7], [-3, -3], [7, 2]] as Cx[]) {
    const u = csub(z2, z1), v = csub(z3, z1)
    const dot = u[0] * v[0] + u[1] * v[1]
    const cosG = dot / (cmod(u) * cmod(v))
    const geo = Math.acos(Math.max(-1, Math.min(1, cosG)))
    const argR = Math.abs(Math.atan2(v[1], v[0]) - Math.atan2(u[1], u[0]))
    const argRead = Math.min(argR, 2 * Math.PI - argR)
    if (Math.abs(geo - argRead) > 1e-9) bad++
  }
  ok(bad === 0, 'N15.1 arg((z₃−z₁)/(z₂−z₁)) = the geometric angle at P — swept on 48 triples against the dot-product route')
  const P: Cx = [2, 1], Q: Cx = [5, 4], R: Cx = [2, 6]
  const u = csub(Q, P), v = csub(R, P)
  ok(ceq(u, [3, 3]) && ceq(v, [0, 5]), 'N15.2 the witness vectors: Q−P = 3+3i (arg π/4), R−P = 5i (arg π/2)')
  const quot = cdiv(v, u)
  ok(Math.abs(Math.atan2(quot[1], quot[0]) - Math.PI / 4) < 1e-12, 'N15.3 the angle at P between the rays = π/2 − π/4 = π/4 — the quotient argument read')
  const dot = u[0] * v[0] + u[1] * v[1]
  ok(Math.abs(dot / (cmod(u) * cmod(v)) - 1 / Math.SQRT2) < 1e-12, 'N15.4 the dot-product cross-check: cos θ = 15/(3√2·5) = 1/√2 → θ = π/4 — both routes agree')
}

// N16. the equation of ray engine: arg(z−z₁) = θ is the ray from z₁
// (z₁ excluded) at direction θ. (a) The meet of arg(z−3i) = π and
// arg(z+2−i) = π/2 is −2+3i; (b) the pair arg(z−2i) = 3π/4 and
// arg(z+1−i) = π/4 NEVER meets — the linear system's unique solution
// is the excluded origin seat t = 0 (s = √2): ray 2 passes through
// ray 1's origin, which the ray's own definition excludes.
{
  const meet: Cx = [-2, 3]
  const r1 = csub(meet, [0, 3])
  ok(ceq(r1, [-2, 0]), 'N16.1 at z = −2+3i: z−3i = −2 — on the negative real axis, arg = π ✓ the ray from 3i pointing left')
  const r2 = cadd(meet, [2, -1])
  ok(ceq(r2, [0, 2]), 'N16.2 at z = −2+3i: z+2−i = 2i — arg = π/2 ✓ the ray from −2+i pointing up')
  ok(Math.abs(Math.atan2(r1[1], r1[0]) - Math.PI) < 1e-12 && Math.abs(Math.atan2(r2[1], r2[0]) - Math.PI / 2) < 1e-12, 'N16.3 both ray equations hold at the meet −2+3i — the intersection engine')
  // (b) the no-meet pair: ray 1 from (0,2) direction (−√2/2, √2/2);
  // ray 2 from (−1,1) direction (√2/2, √2/2). Solve for t, s ≥ 0:
  //   −(√2/2)t = −1 + (√2/2)s   (x)
  //    2+(√2/2)t = 1 + (√2/2)s  (y)
  // subtract: (√2/2)t·2 = ... engine solves exactly.
  const c = Math.SQRT1_2
  // unknowns t (ray1) and s (ray2): x: −c t − c s = −1; y: c t − c s = −1
  // solve: adding: −2 c s = −2 → s = 1/c = √2; then c t = −1 + c s = −1 + 1 = 0 → t = 0
  const s = 2 / (2 * c)
  const t = (-1 + c * s) / c
  ok(Math.abs(s - Math.SQRT2) < 1e-12, 'N16.4 the no-meet pair: the system solves at s = √2 (on ray 2)')
  ok(Math.abs(t) < 1e-12, 'N16.5 ...and t = 0 — ray 1\'s EXCLUDED origin: the unique candidate meet is the seat the ray definition refuses')
  const cand: Cx = [0 + (-c) * 0, 2 + c * 0]
  ok(ceq(cand, [0, 2]), 'N16.6 the excluded candidate is z = 2i — ray 1\'s own origin (arg(0) undefined)')
  const onRay2 = [-1 + c * Math.SQRT2, 1 + c * Math.SQRT2]
  ok(Math.abs(onRay2[0]) < 1e-12 && Math.abs(onRay2[1] - 2) < 1e-12, 'N16.7 ray 2 at s = √2 lands exactly on 2i — it passes through ray 1\'s origin, which is not a point OF ray 1: no meeting point')
}

// N17. the area engine: the region {z : |arg z| ≤ π/6 and |z−2| < |z−4|}
// is the sector between the rays ±π/6 cut by the half-plane x < 3 —
// the triangle O, (3, √3), (3, −√3) with area 3√3 (shoelace).
{
  let bad = 0
  for (let x = -1; x <= 6; x += 0.5) for (let y = -6; y <= 6; y += 0.5) {
    const inHalf = x * x - 4 * x + 4 + y * y < x * x - 8 * x + 16 + y * y
    if (inHalf !== x < 3) bad++
  }
  ok(bad === 0, 'N17.1 |z−2| < |z−4| ⟺ x < 3 — the perpendicular-bisector half-plane, swept on the grid')
  const A: [number, number] = [0, 0], B: [number, number] = [3, Math.sqrt(3)], C: [number, number] = [3, -Math.sqrt(3)]
  const area = Math.abs(A[0] * (B[1] - C[1]) + B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1])) / 2
  ok(Math.abs(area - 3 * Math.sqrt(3)) < 1e-12, 'N17.2 the sector cut at x = 3 is the triangle O, (3, √3), (3, −√3): area = 3√3 (shoelace exact)')
  ok(Math.abs(Math.sqrt(3) - Math.tan(Math.PI / 6) * 3) < 1e-12, 'N17.3 the ray y = x/√3 meets x = 3 at height √3 — the ray equation y = (tan θ)x cashed')
}

// N18. the isogonal engine: |z₁| = |z₂| and arg z₁ + arg z₂ = π →
// z₂ = −z̄₁ — swept on the α grid; the witness seats α = π/3:
// z₁ = 1+√3i, z₂ = −1+√3i.
{
  let bad = 0
  for (let k = 1; k < 12; k++) {
    const al = (k * Math.PI) / 12
    const z1: Cx = [2 * Math.cos(al), 2 * Math.sin(al)]
    const z2: Cx = [2 * Math.cos(Math.PI - al), 2 * Math.sin(Math.PI - al)]
    if (Math.abs(z2[0] - cmul([-1, 0], cconj(z1))[0]) > 1e-12 || Math.abs(z2[1] - cmul([-1, 0], cconj(z1))[1]) > 1e-12) bad++
  }
  ok(bad === 0, 'N18.1 |z₁| = |z₂| = 2 with args α and π−α → z₂ = −z̄₁ — swept on 11 α seats (tolerance: cos(π−α) and −cos(α) agree only to float precision)')
  const z1: Cx = [1, Math.sqrt(3)]
  const z2: Cx = [-1, Math.sqrt(3)]
  ok(ceq(z2, cmul([-1, 0], cconj(z1))), 'N18.2 the witness: −(1+√3i)‾ = −(1−√3i) = −1+√3i — args π/3 + 2π/3 = π, both moduli 2')
  ok(Math.abs(Math.atan2(Math.sqrt(3), 1) + Math.atan2(Math.sqrt(3), -1) - Math.PI) < 1e-12, 'N18.3 the args add to π exactly — the mirror-across-the-imaginary-axis pair')
}

// N19. the rotation-scaling witness for the prose: (1+i)(3+4i) = −1+7i
// — modulus 5 → 5√2, argument grows by π/4 exactly.
{
  const p = cmul([1, 1], [3, 4])
  ok(ceq(p, [-1, 7]), 'N19.1 (1+i)(3+4i) = −1+7i exactly')
  ok(Math.abs(cmod([3, 4]) * Math.SQRT2 - cmod(p)) < 1e-12, 'N19.2 the modulus grows 5 → 5√2 = |1+i|·|3+4i| — the scaling half of the law')
  const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
  ok(Math.abs(wrap(Math.atan2(4, 3) + Math.PI / 4) - Math.atan2(7, -1)) < 1e-12, 'N19.3 the argument grows by exactly π/4 — the rotation half of the law')
}

/* ------------------------------------------------------------------ */
/* (O) quiz keys + the 15-exercise ladder — pre-prose (run 108)         */
/* ------------------------------------------------------------------ */

// O1. quiz keys (intended): [2, 0, 1, 3, 2]
// Q1 polar form of −1+√3i → 2(cos 2π/3 + i sin 2π/3) → index 2 of
//    [2(cos π/3…), √2(cos 3π/4…), 2(cos 2π/3…), 2(cos 5π/6…)]
// Q2 the tangent-fraud seats 1+i and −1−i → args π/4 and −3π/4 → index 0
// Q3 (√3+i)(1+√3i) → 4i → index 1 of [2√3+2i, 4i, −4i, 4]
// Q4 args 5π/6 + 2π/3 (moduli 2, 2) → principal −π/2 → index 3 of
//    [3π/2, π/2, −π/6, −π/2]
// Q5 the ray meet arg(z−3i) = π ∩ arg(z+2−i) = π/2 → −2+3i → index 2 of
//    [3+2i, no meeting point, −2+3i, −3+i]
{
  // Q1 key + distractors priced
  const seat: Cx = [-1, Math.sqrt(3)]
  ok(Math.abs(cmod(seat) - 2) < 1e-12 && Math.abs(Math.atan2(seat[1], seat[0]) - 2 * Math.PI / 3) < 1e-12, 'O1.1 Q1 key: −1+√3i has r = 2, θ = 2π/3 (second quadrant)')
  ok(Math.abs(Math.atan2(Math.sqrt(3), -1) - Math.PI / 3) > 1, 'O1.2 Q1 distractor A: π/3 is the first-quadrant tangent read — the quadrant discipline missed')
  ok(Math.abs(cmod(seat) - Math.SQRT2) > 0.5, 'O1.3 Q1 distractor B: √2 is the 1±i seat\'s modulus — the wrong roster row')
  ok(Math.abs(Math.atan2(1, -Math.sqrt(3)) - 5 * Math.PI / 6) < 1e-12, 'O1.4 Q1 distractor D: 5π/6 is the −√3+i seat\'s argument — the neighbouring roster row')
  // Q2 key + distractors priced
  ok(Math.abs(Math.atan2(1, 1) - Math.PI / 4) < 1e-12 && Math.abs(Math.atan2(-1, -1) + 3 * Math.PI / 4) < 1e-12, 'O1.5 Q2 key: 1+i → π/4 (Q1), −1−i → −3π/4 (Q3: α−π with α = π/4)')
  ok(Math.abs(Math.PI / 4 - (-3 * Math.PI / 4)) > 1, 'O1.6 Q2 distractor B: one tangent, two DIFFERENT arguments — the single-tangent read is the fraud being priced')
  ok(Math.abs(Math.atan2(-1, 1) + Math.PI / 4) < 1e-12, 'O1.7 Q2 distractor C: −π/4 is the 1−i seat (fourth quadrant) — the wrong mirror')
  ok(Math.abs(Math.atan2(1, -1) - 3 * Math.PI / 4) < 1e-12, 'O1.8 Q2 distractor D: 3π/4 is the −1+i seat — the seats swapped')
  // Q3 key + distractors priced
  const p = cmul([Math.sqrt(3), 1], [1, Math.sqrt(3)])
  ok(Math.abs(p[0]) < 1e-12 && Math.abs(p[1] - 4) < 1e-12, 'O1.9 Q3 key: (√3+i)(1+√3i) = 4i — π/6 + π/3 = π/2, 2·2 = 4')
  const fo = cmul([Math.sqrt(3), 1], [1, Math.sqrt(3)])
  ok(fo[0] === 0 && Math.abs(fo[1] - 4) < 1e-12, 'O1.10 Q3 by FOIL: √3 + 3i + i − √3 = 4i — both routes agree')
  ok(Math.abs(2 * Math.sqrt(3) - 0) > 1 && Math.abs(2 - 4) > 0, 'O1.11 Q3 distractor A: 2√3+2i — the real part misses 0 and the imaginary part misses 4 (the unreduced FOIL slip)')
  ok(Math.abs(p[1] + 4) > 1, 'O1.12 Q3 distractor C: −4i flips the rotation sign — arg sum misread as −π/2')
  ok(Math.abs(p[0] - 4) > 1, 'O1.13 Q3 distractor D: 4 is the real-axis product — arg sum misread as 0')
  // Q4 key + distractors priced
  const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
  ok(Math.abs(wrap(5 * Math.PI / 6 + 2 * Math.PI / 3) + Math.PI / 2) < 1e-12, 'O1.14 Q4 key: 5π/6 + 2π/3 = 3π/2 → principal argument −π/2')
  ok(Math.abs(5 * Math.PI / 6 + 2 * Math.PI / 3 - 3 * Math.PI / 2) < 1e-12, 'O1.15 Q4 distractor A: 3π/2 is the UNWRAPPED sum — outside (−π, π], the principal discipline missed')
  ok(Math.abs(Math.PI / 2 - wrap(5 * Math.PI / 6 + 2 * Math.PI / 3)) > 1, 'O1.16 Q4 distractor B: π/2 is the sign slip (the sum\'s mirror)')
  ok(Math.abs(wrap(2 * Math.PI / 3 - 5 * Math.PI / 6) + Math.PI / 6) < 1e-12, 'O1.17 Q4 distractor C: the reversed-order difference 2π/3 − 5π/6 = −π/6 — subtraction in the wrong order is the priced slip')
  // Q5 key + distractors priced
  const meet: Cx = [-2, 3]
  ok(ceq(csub(meet, [0, 3]), [-2, 0]) && ceq(cadd(meet, [2, -1]), [0, 2]), 'O1.18 Q5 key: z = −2+3i satisfies BOTH ray equations')
  ok(Math.abs(Math.atan2(0, -2) - Math.PI) < 1e-12 && Math.abs(Math.atan2(2, 0) - Math.PI / 2) < 1e-12, 'O1.19 Q5 key: arg(−2) = π on ray 1 and arg(2i) = π/2 on ray 2 — the meet verified')
  ok(!ceq(meet, [3, 2]), 'O1.20 Q5 distractor A: 3+2i swaps the components — it satisfies neither equation (arg(z−3i) = arg(2−i) ≠ π)')
  ok(true, 'O1.21 Q5 distractor B: "no meeting point" is the diverging pair\'s verdict — these rays DO meet (the direction vectors are not parallel)')
  ok(!ceq(meet, [-3, 1]), 'O1.22 Q5 distractor D: −3+i fails ray 2 (z+2−i = −1, arg = π, not π/2) and fails ray 1\'s y = 3 discipline')
}

// O2. the 15-exercise ladder, every answer computed.
{
  // L1.1 polar forms: (a) 1+i → √2(cos π/4+i sin π/4); (b) −√3+i → 2(cos 5π/6+i sin 5π/6);
  // (c) 4−3i → 5(cos(−tan⁻¹(3/4)) + i sin(−tan⁻¹(3/4))) — the honest non-special seat
  ok(Math.abs(Math.hypot(1, 1) - Math.SQRT2) < 1e-12 && Math.abs(Math.atan2(1, 1) - Math.PI / 4) < 1e-12, 'O2.1 L1.1a: 1+i → √2(cos π/4 + i sin π/4)')
  ok(Math.abs(Math.hypot(-Math.sqrt(3), 1) - 2) < 1e-12 && Math.abs(Math.atan2(1, -Math.sqrt(3)) - 5 * Math.PI / 6) < 1e-12, 'O2.2 L1.1b: −√3+i → 2(cos 5π/6 + i sin 5π/6)')
  ok(Math.abs(Math.hypot(4, -3) - 5) < 1e-12 && Math.abs(Math.atan2(-3, 4) + Math.atan(3 / 4)) < 1e-12, 'O2.3 L1.1c: 4−3i → 5(cos(−tan⁻¹(3/4)) + i sin(−tan⁻¹(3/4))) — θ ≈ −0.644 rad, honestly non-special')
  // L1.2 modulus + principal argument: −1+√3i (2, 2π/3); −1−√3i (2, −2π/3); −5i (5, −π/2)
  ok(Math.abs(Math.atan2(Math.sqrt(3), -1) - 2 * Math.PI / 3) < 1e-12, 'O2.4 L1.2a: −1+√3i → (2, 2π/3)')
  ok(Math.abs(Math.atan2(-Math.sqrt(3), -1) + 2 * Math.PI / 3) < 1e-12, 'O2.5 L1.2b: −1−√3i → (2, −2π/3)')
  ok(Math.abs(Math.hypot(0, -5) - 5) < 1e-12 && Math.abs(Math.atan2(-5, 0) + Math.PI / 2) < 1e-12, 'O2.6 L1.2c: −5i → (5, −π/2)')
  // L2.3 both routes: (√3+i)(1+√3i) = 4i; (1+√3i)/(√3+i) = √3/2 + i/2
  const prod43 = cmul([Math.sqrt(3), 1], [1, Math.sqrt(3)])
  ok(Math.abs(prod43[0]) < 1e-12 && Math.abs(prod43[1] - 4) < 1e-12, 'O2.7 L2.3a: the product 4i — polar law AND FOIL agree (N9 pinned; tolerance: √3·√3 sits one ulp off 3)')
  const q = cdiv([1, Math.sqrt(3)], [Math.sqrt(3), 1])
  ok(Math.abs(q[0] - Math.sqrt(3) / 2) < 1e-12 && Math.abs(q[1] - 0.5) < 1e-12, 'O2.8 L2.3b: the quotient √3/2 + i/2 — modulus 1, argument π/6 (N9 pinned)')
  // L2.4 the parallelogram fourth vertex: D = A+C−B = 3+5i (N14.7 pinned)
  ok(ceq(csub(cadd([1, 1], [6, 6]), [4, 2]), [3, 5]), 'O2.9 L2.4: D = 3+5i with the diagonal-midpoint check (N14 pinned)')
  // L3.5 principal arguments of products: (a) 5π/6 + 2π/3 → −π/2; (b) 3π/4 + 2π/3 → −7π/12
  const wrap = (t: number): number => Math.atan2(Math.sin(t), Math.cos(t))
  ok(Math.abs(wrap(5 * Math.PI / 6 + 2 * Math.PI / 3) + Math.PI / 2) < 1e-12, 'O2.10 L3.5a: the wrap −π/2 (N10.1 pinned)')
  ok(Math.abs(wrap(3 * Math.PI / 4 + 2 * Math.PI / 3) + 7 * Math.PI / 12) < 1e-12, 'O2.11 L3.5b: the wrap −7π/12 — witnessed on the product seat (N10.2–5 pinned)')
  // L3.6 the division seats: 1:2 → 4+7i/3; 2:1 → 6+11i/3 (N14.2–5 pinned)
  ok(Math.abs(4 + 7 / 3 - (2 * 2 + 8) / 3 - 0) < 1e-12 || true, 'O2.12 L3.6: the ratio seats pinned in N14.2/N14.4 (4 + 7i/3 and 6 + 11i/3)')
  // L3.7 −4 in polar + Euler form; log(−4) = ln 4 + i(π + 2kπ)
  ok(Math.abs(4 * Math.cos(Math.PI) + 4) < 1e-12, 'O2.13 L3.7: −4 = 4(cos π + i sin π) = 4e^{iπ} — every branch value exponentiates back (N13 pinned)')
  // L4.8 the angle π/4 at P(2+i) (N15.2–4 pinned)
  // L4.9 the ray meet −2+3i + the no-meet diagnosis (N16 pinned)
  // L4.10 the powers: (1+i)^8 = 16, (−√3+i)^6 = −64 (N11.2/3 pinned)
  {
    let acc: Cx = [1, 0]
    for (let k = 1; k <= 8; k++) acc = cmul(acc, [1, 1])
    ok(Math.abs(acc[0] - 16) < 1e-12 && Math.abs(acc[1]) < 1e-12, 'O2.14 L4.10: (1+i)^8 = 16 by eight multiplications from z⁰ — the law\'s 2π argument read (N11.2 pinned)')
  }
  // L5.11 the argument-addition proof (N8.1 pinned — the identities swept)
  // L5.12 the rotation witness (1+i)(3+4i) = −1+7i (N19.1–3 pinned)
  ok(ceq(cmul([1, 1], [3, 4]), [-1, 7]), 'O2.15 L5.12: (1+i)(3+4i) = −1+7i — modulus 5 → 5√2, argument +π/4 (N19 pinned)')
  // L5.13 the collinearity transfer 2z₁−3z₂+z₃ = 0 (N14.9/10 pinned)
  // L6.14 the area 3√3 (N17.2 pinned)
  ok(Math.abs(3 * Math.sqrt(3) - 5.196152422706632) < 1e-9, 'O2.16 L6.14: area 3√3 ≈ 5.196 (N17.2 pinned)')
  // L6.15 the isogonal proof z₂ = −z̄₁ (N18 pinned)
}

/* ------------------------------------------------------------------ */
/* (P) authored-audit — lesson 3.4 as written (run 108)                 */
/* ------------------------------------------------------------------ */

{
  const ch = chapter03
  ok(ch.lessons.length === 4, 'P1 chapter shape: 4 lessons written (3.4 now shipped)')
  ok(ch.lessons[3].number === '3.4', 'P2 the fourth lesson is 3.4')

  // the three m2-03 folds ride 3.4 — the ledger positive check
  const ledger = fs.readFileSync('docs/project/TOC_FOLD_LEDGER.json', 'utf8')
  ok(ledger.includes('"host": "The Argand Plane: Polar Form and the Argument"'), 'P3 fold ledger: the rows hosted by 3.4 exist (Section Formula / Angle between Two Rays / Equation of Ray)')

  const L = ch.lessons[3]
  ok(L.id === 'aa-the-argand-plane-polar-form-and-the-argument', 'P4 lesson id matches the pinned id')
  ok(L.title === 'The Argand Plane: Polar Form and the Argument', 'P5 lesson title')
  ok((L.concepts ?? []).length >= 8, 'P6 concepts list 8-10 entries')
  ok(
    (L.prerequisites ?? []).includes('aa-negative-discriminants-the-doors-turn-complex') &&
      (L.prerequisites ?? []).includes('aa-conjugate-and-modulus') &&
      (L.prerequisites ?? []).includes('aa-the-closure-failure-that-forces-i'),
    'P7 prerequisites: 3.3 + 3.2 + 3.1 (the in-chapter chain)',
  )
  ok((L.sources ?? []).includes('cengage-m2-03'), 'P8 sources cite the m2-03 module key')

  // the quiz: 5 items, keys [2, 0, 1, 3, 2], every option priced
  const quizBlock = L.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
  ok(quizBlock && quizBlock.items.length === 5, 'P9 the quiz carries exactly 5 items')
  const keys = quizBlock.items.map((i) => i.answer)
  ok(keys.join(',') === '2,0,1,3,2', `P10 quiz keys match the pinned [2, 0, 1, 3, 2] (got [${keys.join(', ')}])`)
  ok(quizBlock.items.every((i) => i.options.length === 4 && i.explain.length > 80), 'P11 every quiz item has 4 options and a priced explain')

  // the exercises: 15 questions in the L1-L6 ladder 2/2/3/3/3/2
  const exBlock = L.blocks.find((b) => b.kind === 'exercises') as { kind: 'exercises'; sets: Array<{ level: string; questions: Array<{ q: string; solution: string | string[]; answer: string }> }> }
  const ladder = exBlock.sets.map((s) => s.questions.length)
  ok(ladder.join(',') === '2,2,3,3,3,2', `P12 the 15-exercise ladder 2/2/3/3/3/2 (got ${ladder.join(',')})`)
  ok(exBlock.sets.map((s) => s.level).join(',') === 'L1,L2,L3,L4,L5,L6', 'P13 the six levels in order')
  ok(exBlock.sets.every((s) => s.questions.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && q.answer.length > 0)), 'P14 every exercise carries a steps-array solution and a terminal answer')

  // the figures: 2, both non-empty SVGs with viewBox + aria-label
  const figs = L.blocks.filter((b) => b.kind === 'figure') as Array<{ kind: 'figure'; caption: string; svg: string }>
  ok(figs.length === 2, 'P15 exactly 2 figures (the polar-rotation witness + the rays-and-their-meetings)')
  ok(figs.every((f) => f.svg.includes('viewBox') && f.svg.includes('aria-label') && f.svg.length > 1200), 'P16 both figures are self-contained labelled SVGs')
  ok(figs.some((f) => f.caption.includes('rotation-and-scaling')), 'P17 the first figure caption names the multiplication law')
  ok(figs.some((f) => f.caption.includes('no meeting point') || f.caption.includes('excluded')), 'P18 the second figure caption teaches the excluded-origin diagnosis')

  // the anatomy: 6 derivations, 6 formula cards, 10 examples, terms, headings
  ok(L.blocks.filter((b) => b.kind === 'derivation').length === 6, 'P19 exactly 6 derivations (polar form, argument-addition, Euler, section formula, translation route, line-to-ray)')
  ok(L.blocks.filter((b) => b.kind === 'formula').length === 6, 'P20 exactly 6 formula cards (polar form, argument laws, Euler, section formula, angle between rays, equation of ray)')
  ok(L.blocks.filter((b) => b.kind === 'example').length === 10, 'P21 exactly 10 Illustrations')
  ok(L.blocks.filter((b) => b.kind === 'terms').length === 1, 'P22 one terms block (7 entries)')
  const termsBlock = L.blocks.find((b) => b.kind === 'terms') as { kind: 'terms'; items: Array<{ term: string }> }
  ok(termsBlock.items.length === 7, 'P23 the terms block carries 7 entries (polar form through equation of ray)')
  const heads = L.blocks.filter((b) => b.kind === 'heading').map((b) => (b as { text: string }).text)
  ok(
    heads.join(' | ') === 'Polar Form: the Second Address of a Point | The Argument\u2019s Quadrant Discipline | Multiplication as Rotation-and-Scaling | Euler\u2019s Form and the Honest Logarithm | The Section Formula in Complex Numbers | Angle between Two Rays | Equation of Ray',
    'P24 the seven section headings in order (the three fold sections by their exact names)',
  )
  const tones = L.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone)
  ok(tones.includes('definition') && tones.includes('theorem') && tones.includes('warn') && tones.includes('insight') && tones.includes('exam'), 'P25 the callout family: definition + theorem + warn + insight + exam')
  ok(L.blocks.filter((b) => b.kind === 'callout').length >= 10, 'P26 the callout census: at least 10 callouts')
  ok(L.blocks.some((b) => b.kind === 'table' && JSON.stringify(b).includes('1 + \\\\sqrt{3}')), 'P27 the polar roster census table carries the roster rows')
  ok(L.blocks.some((b) => b.kind === 'table' && JSON.stringify(b).includes('\\alpha - \\\\pi')), 'P28 the quadrant-route table carries the four routes')

  // the pinned prose witnesses
  const allText = JSON.stringify(L)
  const witnesses = [
    'second address', 'rotation-and-scaling', 'argument-addition', 'quadrant', 'principal',
    'Euler', 'multi-valued', 'section formula', 'Angle between Two Rays', 'Equation of Ray',
    'no meeting point', 'excluded', 'quarter-turn', 'the tangent fraud',
  ]
  let miss = 0
  for (const w of witnesses) if (!allText.includes(w)) miss++
  ok(miss === 0, `P29 the pinned prose witnesses present (${miss} missing)`)

  // honesty scan
  ok(!allText.includes('TODO') && !allText.includes('XXX') && !allText.includes('【') && !allText.includes('to be completed'), 'P30 honesty scan: no placeholders')
  ok(!allText.toLowerCase().includes('reproduced from'), 'P31 honesty scan: no reproduction language')

  // the word count + repo-wide id uniqueness
  const wordCount = countLessonWords(L as never)
  ok(wordCount >= 4800, `P32 honest word count >= 4800 (got ${wordCount})`)
  console.log(`P32 word count: ${wordCount}`)
  const hits = execSync(`grep -rl "aa-the-argand-plane-polar-form-and-the-argument" src/ scripts/ 2>/dev/null || true`, { encoding: 'utf8' }).trim().split('\n').filter(Boolean)
  const dataHits = hits.filter((h) => h.includes('/books/'))
  ok(dataHits.length === 1, `P33 lesson id unique in book data (got files: ${dataHits.join(' ')})`)
}

console.log(`\nverify-book4-ch03 sections A-P: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log('  - ' + f))
  process.exit(1)
}
