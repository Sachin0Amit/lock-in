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
  ok(ch.lessons.length === 1, `G3 chapter shape: 1 lesson written (got ${ch.lessons.length})`)
  const planned = ch.plannedLessons ?? []
  ok(
    planned.length === 4 &&
      planned[0] === 'Conjugate and Modulus' &&
      planned[1] === 'Negative Discriminants: the Doors Turn Complex' &&
      planned[2] === 'The Argand Plane: Polar Form and the Argument' &&
      planned[3] === 'De Moivre, Roots of Unity and the Complex Loci',
    `G4 plannedLessons = the four remaining (got ${planned.join(' | ')})`,
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

console.log(`\nverify-book4-ch03 sections A-G: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log('FAILURES:')
  failures.forEach((f) => console.log('  - ' + f))
  process.exit(1)
}
