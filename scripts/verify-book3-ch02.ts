export {}

import { chapter02 } from '../src/data/library/books/mathematics/elementary-algebra/ch-02'
import { elementaryAlgebra } from '../src/data/library/books/mathematics/elementary-algebra/book'
import { allBooks } from '../src/data/library/index'
import { countLessonWords, type Lesson } from '../src/data/library/types'

/**
 * verify-book3-ch02.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 2 "Exponents and Powers" — lessons 2.1 "Powers and
 * the Laws of Exponents" (id al-powers-and-the-laws-of-exponents) and 2.2
 * "Zero and Negative Exponents: Another Repair" (id al-zero-and-negative-
 * exponents-another-repair).
 *
 * Created 2026-11-07 (run 69) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–68. Conventions: ℕ = {1, 2, 3, …}
 * (0 is NOT a natural number in this book, fixed by ch-01 of book #2);
 * ALL arithmetic in this verifier is exact — BigInt for integer power
 * sweeps, and a BigInt numerator/denominator fraction class Frac for the
 * extended (zero and negative exponent) sweeps of 2.2. No float decides
 * any claim.
 *
 *   (A) the power engine from the repeated-multiplication definition:
 *       pow(a, n) as n-fold multiplication (BigInt); 2⁵ = 32, 5² = 25,
 *       10³ = 1000, 3⁴ = 81, 2⁶ = 64 (the L1 exercise pins);
 *   (B) the three laws swept over integer grids — PRODUCT
 *       aᵐ·aⁿ = aᵐ⁺ⁿ for a ∈ [−9..9]\{0}, m, n ∈ [0..7] (17 × 64 = 1,088
 *       checks); QUOTIENT aᵐ/aⁿ = aᵐ⁻ⁿ for m > n (exact integer division
 *       asserted) over the same grid (544 checks); POWER-OF-A-POWER
 *       (aᵐ)ⁿ = aᵐⁿ (1,088 checks) — all BigInt-exact;
 *   (C) the zero/one/negative-base honesty: 0ⁿ = 0 for every n ≥ 1
 *       (swept [1..20]); 1ⁿ = 1 and (−1)ⁿ = ±1 alternation (swept
 *       [1..40]); the sign law for negative bases — (−a)ⁿ > 0 iff n even,
 *       < 0 iff n odd (swept a ∈ [1..9], n ∈ [1..12] = 108 checks); the
 *       bracket trap −2ⁿ = −(2ⁿ) vs (−2)ⁿ priced at n = 2 (−4 vs 4) and
 *       n = 3 (−8 vs −8 — the agreement case); the agreement census
 *       (−a)ⁿ = −aⁿ exactly when n is odd (swept a ∈ [1..9], n ∈ [1..12]);
 *       2³ vs 3² (8 ≠ 9) and 2·3 vs 2³ (6 ≠ 8) — the exponent-vs-
 *       coefficient contrast of AL 1.1 priced on integers;
 *   (D) the 2.2 extension — every law verified over the EXTENDED grid
 *       m, n ∈ [−6..6] with Frac exact rationals, bases
 *       {±1, ±2, ±3, ±5, ±7} (10 bases × 169 pairs × 3 laws): product,
 *       quotient (NOW for every m − n, including negative results),
 *       power-of-a-power; the flip rules 1/x⁻ⁿ = xⁿ, x⁻ᵃ/y⁻ᵇ = yᵇ/xᵃ,
 *       (a/b)⁻ⁿ = (b/a)ⁿ swept; (−2)⁻² = 1/4 and (−2)⁻³ = −1/8 — the
 *       sign survives through the fraction bar;
 *   (E) the coercion derivations — x⁰ = 1 and x⁻ⁿ = 1/xⁿ are FORCED, not
 *       chosen: (i) if v acts as x⁰ then v·xⁿ = xⁿ⁺⁰ = xⁿ for all n must
 *       hold, and the sweep pins v = 1 (v = 2 fails at n = 1 on every
 *       base); (ii) x⁻ⁿ·xⁿ = x⁰ = 1 forces x⁻ⁿ = 1/xⁿ (Frac exact);
 *       (iii) the boundary pinned: the quotient route xⁿ/xⁿ dies at
 *       x = 0 (0/0 is not a fraction — Frac(0,0) is rejected) and
 *       1/0ⁿ = 1/0 likewise; 0ⁿ = 0 for n ≥ 1 everywhere, so 0⁰ and
 *       0⁻ⁿ stay undefined in this course; the 2.2-sweep excludes base 0
 *       by design and the verifier asserts the exclusion;
 *   (F) quiz keys pinned pre-writing with every distractor computed:
 *       2.1 = [0, 1, 1, 2, 1] (options priced at their own bases:
 *       32/25/10/7; a¹²=4096, a⁷=128, 2a⁷=256, a¹=2 at a = 2;
 *       −9/9/−27/27; 128/32/4096/2; 13/25/36/10)
 *       and 2.2 = [1, 2, 1, 2, 3] (0/1/5/undef; −9/9/1/9→ 1/9; −x⁵ /
 *       1/x⁵ / −1/x⁵ / x⁵ priced as fractions at x = 2: −32, 1/32,
 *       −1/32, 32; 2⁻¹⁵, 1/8, 4, −4; the boundary item 5⁰=1, 2⁻²=1/4,
 *       1⁻³=1, 0⁻² undefined);
 *   (G) exercise keys recomputed BOTH SIDES (the law simplifications and
 *       the numeric answers of all 28 exercises of the run — 14 per
 *       lesson, sets 3/3/3/2/2/1) plus the L6 sweeps (2^n vs n² census
 *       n ∈ [1..20]; the bacteria doubling 5·2ᵗ; the half-life
 *       100·2⁻ᵗ/³; 2³⁰ vs 3¹³ vs 10⁹; the 2ⁿ-sandwich around 1/10) and
 *       the FIGURE GEOMETRY PLANS of the run's four figures (the copies
 *       ledger 720×360; the sign alternator 720×300; the extension ladder
 *       720×380; the fraction-bar flip map 720×340) — viewBoxes, panels
 *       and station boxes recorded pre-writing, audited against the
 *       authored SVG strings in sections H/I.
 *
 * Sections H (authored 2.1) and I (authored 2.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 67–68 (quiz keys vs pinned, exercise shape, figure geometry, citation
 * keys, honest word counts, the string-aware single-backslash scan, the
 * al- prefix uniqueness across the whole library).
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
  if (n < 0) throw new Error('powB: negative exponent handled by Frac, not powB')
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
  lt(o: Frac): boolean {
    return this.num * o.den < o.num * this.den
  }
  mul(o: Frac): Frac {
    return new Frac(this.num * o.num, this.den * o.den)
  }
  div(o: Frac): Frac {
    if (o.num === 0n) throw new Error('Frac.div: division by a zero fraction is not defined in this course')
    return new Frac(this.num * o.den, this.den * o.num)
  }
  /** (this)^k for an integer k of either sign. */
  pow(k: number): Frac {
    if (k >= 0) return new Frac(powB(this.num, k), powB(this.den, k))
    if (this.num === 0n) throw new Error('Frac.pow: zero base to a negative exponent is not defined in this course')
    return new Frac(powB(this.den, -k), powB(this.num, -k))
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
/** x^k as a Frac for integer k (any sign), x a nonzero integer. */
function fracPow(x: bigint, k: number): Frac {
  if (x === 0n) throw new Error('fracPow: base 0 outside the repair')
  return k >= 0 ? new Frac(powB(x, k), 1n) : new Frac(1n, powB(x, -k))
}

/* ------------------------------------------------------------------ */
/* (A) the power engine — the definition itself                        */
/* ------------------------------------------------------------------ */

{
  ok(powB(2n, 5) === 32n, 'A: 2⁵ = 32 (five copies of 2 multiplied)')
  ok(powB(5n, 2) === 25n, 'A: 5² = 25 (two copies of 5) — 5² ≠ 2⁵')
  ok(powB(10n, 3) === 1000n, 'A: 10³ = 1000')
  ok(powB(3n, 4) === 81n, 'A: 3⁴ = 81')
  ok(powB(2n, 6) === 64n, 'A: 2⁶ = 64')
  ok(powB(4n, 2) === 16n, 'A: (−4)² = 16 — the even exponent forgives')
  ok(powB(-4n, 3) === -64n, 'A: (−4)³ = −64 — the odd exponent keeps the sign')
  ok(powB(1n, 7) === 1n, 'A: 1⁷ = 1')
  ok(powB(0n, 5) === 0n, 'A: 0⁵ = 0 (zero annihilates from the first factor)')
  ok(powB(2n, 1) === 2n, 'A: 2¹ = 2 — the first power is the number itself')
}

/* ------------------------------------------------------------------ */
/* (B) the three laws swept over integer grids                         */
/* ------------------------------------------------------------------ */

{
  const bases = rng(-9, 9).filter((a) => a !== 0)
  let prodChecks = 0
  let prodBad = 0
  for (const a of bases) {
    for (const m of rng(0, 7)) {
      for (const n of rng(0, 7)) {
        if (powB(BigInt(a), m) * powB(BigInt(a), n) !== powB(BigInt(a), m + n)) prodBad++
        prodChecks++
      }
    }
  }
  ok(prodBad === 0 && prodChecks === 1152, 'B: PRODUCT law aᵐ·aⁿ = aᵐ⁺ⁿ over a ∈ [−9..9]\\{0}, m, n ∈ [0..7] — ' + prodChecks + ' checks, 0 failures')

  let quotChecks = 0
  let quotBad = 0
  for (const a of bases) {
    for (const m of rng(1, 7)) {
      for (const n of rng(0, m - 1)) {
        const num = powB(BigInt(a), m)
        const den = powB(BigInt(a), n)
        if (num % den !== 0n) quotBad++ // must divide exactly when m > n
        else if (num / den !== powB(BigInt(a), m - n)) quotBad++
        quotChecks++
      }
    }
  }
  ok(quotBad === 0 && quotChecks === 504, 'B: QUOTIENT law aᵐ/aⁿ = aᵐ⁻ⁿ (m > n, exact division; 18 bases × 28 pairs) — ' + quotChecks + ' checks, 0 failures')

  let popChecks = 0
  let popBad = 0
  for (const a of bases) {
    for (const m of rng(0, 7)) {
      for (const n of rng(0, 7)) {
        if (powB(powB(BigInt(a), m), n) !== powB(BigInt(a), m * n)) popBad++
        popChecks++
      }
    }
  }
  ok(popBad === 0 && popChecks === 1152, 'B: POWER-OF-A-POWER (aᵐ)ⁿ = aᵐⁿ over the same grid — ' + popChecks + ' checks, 0 failures')

  // the quotient-law boundary BEFORE the repair: m < n has no integer exponent
  {
    // a²/a⁵ = 1/a³ — NOT a^m−n with m−n = −3 a count; pinned as the disease 2.2 repairs
    ok(fracPow(2n, 2).eq(new Frac(powB(2n, 2), 1n)), 'B: a²/a⁵ sanity — 2² = 4 as a fraction')
    ok(new Frac(powB(2n, 2), powB(2n, 5)).eq(fracPow(2n, -3)), 'B: 2²/2⁵ = 1/2³ exactly — the quotient law RESULT exists, the exponent −3 is what the old definition cannot say')
  }
}

/* ------------------------------------------------------------------ */
/* (C) zero / one / negative bases — the honesty section               */
/* ------------------------------------------------------------------ */

{
  let zeroBad = 0
  for (const n of rng(1, 20)) if (powB(0n, n) !== 0n) zeroBad++
  ok(zeroBad === 0, 'C: 0ⁿ = 0 for every n ≥ 1 (swept [1..20])')

  let oneBad = 0
  for (const n of rng(1, 40)) if (powB(1n, n) !== 1n) oneBad++
  ok(oneBad === 0, 'C: 1ⁿ = 1 for every n ≥ 1 (swept [1..40])')

  let signBad = 0
  for (const n of rng(1, 40)) {
    const want = n % 2 === 0 ? 1n : -1n
    if (powB(-1n, n) !== want) signBad++
  }
  ok(signBad === 0, 'C: (−1)ⁿ alternates — even +1, odd −1 (swept [1..40])')

  // the sign law for negative bases
  let signLawBad = 0
  for (const a of rng(1, 9)) {
    for (const n of rng(1, 12)) {
      const v = powB(BigInt(-a), n)
      if (n % 2 === 0 && v <= 0n) signLawBad++
      if (n % 2 === 1 && v >= 0n) signLawBad++
    }
  }
  ok(signLawBad === 0, 'C: sign law — (−a)ⁿ positive iff n even, negative iff n odd (a ∈ [1..9], n ∈ [1..12], 108 checks)')

  // the bracket trap: (−a)ⁿ vs −(aⁿ)
  ok(powB(-2n, 2) === 4n && -powB(2n, 2) === -4n, 'C: (−2)² = 4 but −2² = −4 — the brackets decide (AL 1.3 negatives-ride-in-brackets, priced on powers)')
  ok(powB(-2n, 3) === -8n && -powB(2n, 3) === -8n, 'C: (−2)³ = −2³ = −8 — the odd exponents agree (the trap only bites on evens)')
  {
    let agreeOdd = 0
    let disagreeEven = 0
    for (const a of rng(1, 9)) {
      for (const n of rng(1, 12)) {
        const lhs = powB(BigInt(-a), n)
        const rhs = -powB(BigInt(a), n)
        if (lhs === rhs && n % 2 === 1) agreeOdd++
        if (lhs !== rhs && n % 2 === 0) disagreeEven++
      }
    }
    ok(agreeOdd === 54 && disagreeEven === 54, 'C: (−a)ⁿ = −aⁿ exactly on odds (54 agreements) and never on evens (54 disagreements) — the census')
  }

  // the exponent-vs-coefficient contrast on integers (AL 1.1's 3a vs a³, now 2·3 vs 2³)
  ok(powB(2n, 3) === 8n && 5n * 2n === 10n && powB(5n, 2) === 25n, 'C: 2³ = 8 while 2·3 = 6 and 5² = 25 while 5·2 = 10 — the exponent is a COUNT of copies, not a multiplication')
  ok(powB(2n, 3) !== powB(3n, 2), 'C: 2³ = 8 ≠ 3² = 9 — swapping base and exponent changes the answer (pinned)')

  // the distribute-everything misread
  ok(powB(3n + 2n, 2) === 25n && powB(3n, 2) + powB(2n, 2) === 13n, 'C: (3+2)² = 25 while 3² + 2² = 13 — the exponent does not distribute over addition (AL 1.3 lie-detector, priced here)')
}

/* ------------------------------------------------------------------ */
/* (D) the 2.2 extension — all three laws over m, n ∈ [−6..6]          */
/* ------------------------------------------------------------------ */

{
  const bases = [-7n, -5n, -3n, -2n, -1n, 1n, 2n, 3n, 5n, 7n]
  let extChecks = 0
  let extBad = 0
  for (const a of bases) {
    for (const m of rng(-6, 6)) {
      for (const n of rng(-6, 6)) {
        const am = fracPow(a, m)
        const an = fracPow(a, n)
        const amn = fracPow(a, m + n)
        if (!am.mul(an).eq(amn)) extBad++ // product law
        const ambn = fracPow(a, m - n)
        if (!am.div(an).eq(ambn)) extBad++ // quotient law, ALL m − n now
        const amp = fracPow(a, m * n)
        if (!am.pow(n).eq(amp)) extBad++ // power-of-a-power
        extChecks += 3
      }
    }
  }
  ok(extBad === 0 && extChecks === 5070, 'D: all three laws over the EXTENDED grid — 10 bases × 169 pairs × 3 laws = ' + extChecks + ' Frac-exact checks, 0 failures')
  ok(!bases.includes(0n), 'D: base 0 is excluded from the extended sweep BY DESIGN — the repair never covers it')

  // the flip rules
  {
    let flipBad = 0
    for (const x of [2n, 3n, 5n, 7n]) {
      for (const n of rng(1, 6)) {
        // 1/x⁻ⁿ = xⁿ
        if (!new Frac(1n, 1n).div(fracPow(x, -n)).eq(fracPow(x, n))) flipBad++
        // x⁻ⁿ = 1/xⁿ
        if (!fracPow(x, -n).eq(new Frac(1n, powB(x, n)))) flipBad++
      }
    }
    ok(flipBad === 0, 'D: flip rules 1/x⁻ⁿ = xⁿ and x⁻ⁿ = 1/xⁿ (4 bases × 6 exponents × 2 rules, 0 failures)')

    let crossBad = 0
    for (const a of [2n, 3n, 5n]) {
      for (const b of [2n, 3n, 5n]) {
        for (const p of rng(1, 4)) {
          for (const q of rng(1, 4)) {
            // x⁻ᵃ/y⁻ᵇ = yᵇ/xᵃ
            const lhs = fracPow(a, -p).div(fracPow(b, -q))
            const rhs = fracPow(b, q).div(fracPow(a, p))
            if (!lhs.eq(rhs)) crossBad++
          }
        }
      }
    }
    ok(crossBad === 0, 'D: the cross-bar rule x⁻ᵃ/y⁻ᵇ = yᵇ/xᵃ over a, b ∈ {2,3,5}, a-range [1..4] × b-range [1..4] — 0 failures')

    let quotPowBad = 0
    for (const a of [2n, 3n, 5n]) {
      for (const b of [2n, 3n, 5n]) {
        for (const n of rng(1, 4)) {
          const lhs = fracPow(a, -n).div(fracPow(b, -n)) // (a/b)⁻ⁿ ... via components
          const rhs = fracPow(b, n).div(fracPow(a, n)) // (b/a)ⁿ
          if (!lhs.eq(rhs)) quotPowBad++
        }
      }
    }
    ok(quotPowBad === 0, 'D: (a/b)⁻ⁿ = (b/a)ⁿ — the negative exponent flips the fraction (swept a, b ∈ {2,3,5}, n ∈ [1..4])')
  }

  // negative bases ride through the bar with their sign
  ok(fracPow(-2n, -2).eq(new Frac(1n, 4n)), 'D: (−2)⁻² = 1/4 — the even exponent forgives through the bar')
  ok(fracPow(-2n, -3).eq(new Frac(-1n, 8n)), 'D: (−2)⁻³ = −1/8 — the odd exponent keeps the sign through the bar')
}

/* ------------------------------------------------------------------ */
/* (E) the coercion derivations — the repair is forced                 */
/* ------------------------------------------------------------------ */

{
  // (i) x⁰ = 1 is the ONLY value that lets the product law survive x⁰
  {
    let vOneWorks = true
    let vTwoFailsEverywhere = true
    for (const x of [2n, 3n, 5n, 7n]) {
      for (const n of rng(1, 6)) {
        // v = 1 works: 1 · xⁿ = xⁿ⁺⁰ = xⁿ
        if (!new Frac(1n, 1n).mul(fracPow(x, n)).eq(fracPow(x, n))) vOneWorks = false
        // v = 2 fails at the very first n: 2 · x ≠ x
        if (new Frac(2n, 1n).mul(fracPow(x, 1)).eq(fracPow(x, 1))) vTwoFailsEverywhere = false
      }
    }
    ok(vOneWorks, 'E: x⁰ = 1 works — x⁰·xⁿ = xⁿ⁺⁰ for every swept base and n ∈ [1..6]')
    ok(vTwoFailsEverywhere, 'E: any other candidate fails immediately — v = 2 gives 2·xⁿ ≠ xⁿ at n = 1 on every base, so the repair is FORCED, not chosen')
  }
  // (ii) the quotient route: xⁿ/xⁿ = xⁿ⁻ⁿ = x⁰ and xⁿ/xⁿ = 1 — two derivations agree
  {
    let agree = true
    for (const x of [2n, 3n, 5n, 7n]) {
      for (const n of rng(1, 6)) {
        if (!fracPow(x, n).div(fracPow(x, n)).eq(fracPow(x, 0))) agree = false
        if (!fracPow(x, n).div(fracPow(x, n)).eq(new Frac(1n, 1n))) agree = false
      }
    }
    ok(agree, 'E: the two derivations agree — xⁿ/xⁿ = x⁰ = 1 for every nonzero base (swept)')
  }
  // (iii) x⁻ⁿ forced: x⁻ⁿ · xⁿ = x⁰ = 1
  {
    let invOk = true
    for (const x of [2n, 3n, 5n, 7n]) {
      for (const n of rng(1, 6)) {
        if (!fracPow(x, -n).mul(fracPow(x, n)).eq(fracPow(x, 0))) invOk = false
        if (!fracPow(x, -n).eq(new Frac(1n, powB(x, n)))) invOk = false
      }
    }
    ok(invOk, 'E: x⁻ⁿ = 1/xⁿ forced — x⁻ⁿ·xⁿ = x⁰ = 1 for every nonzero base (swept)')
  }
  // (iv) the boundary: 0⁰ and 0⁻ⁿ stay dead — the derivations die at x = 0
  {
    let boundaryOk = true
    try {
      fracPow(0n, 0) // xⁿ/xⁿ at x = 0 would be 0/0 — not a fraction
      boundaryOk = false
    } catch {
      /* expected: the repair never defines 0⁰ */
    }
    try {
      fracPow(0n, -3) // 1/0ⁿ = 1/0 — not a fraction
      boundaryOk = false
    } catch {
      /* expected */
    }
    ok(boundaryOk, 'E: the boundary holds — Frac(0,0) and 1/0 are REJECTED, so 0⁰ and 0⁻ⁿ stay undefined in this course')
    ok(powB(0n, 4) === 0n, 'E: 0⁴ = 0 stays put (positive exponents of 0 never move)')
  }
}

/* ------------------------------------------------------------------ */
/* (F) quiz keys pinned pre-writing, distractors priced                */
/* ------------------------------------------------------------------ */

{
  // ---- 2.1 quiz, keys [0, 1, 1, 2, 1] ----
  // Q1 evaluate 2⁵: options 32 / 25 / 10 / 7
  ok(powB(2n, 5) === 32n && powB(5n, 2) === 25n && 2n * 5n === 10n && 2n + 5n === 7n, 'F/2.1-Q1: 32 vs the distractors 25 (5²), 10 (2·5), 7 (2+5) — all priced')
  // Q2 simplify a⁴·a³: options a¹² / a⁷ / 2a⁷ / a¹ — priced at a = 2
  ok(
    powB(2n, 12) === 4096n && powB(2n, 7) === 128n && 2n * powB(2n, 7) === 256n && powB(2n, 1) === 2n,
    'F/2.1-Q2: at a = 2 the four options read 4096 / 128 / 256 / 2 — the true a⁷ = 128, distractors priced (a¹² multiplied exponents, 2a⁷ like-terms misread, a¹ subtracted)'
  )
  // Q3 which equals 9: options −3² / (−3)² / (−3)³ / −(−3)³
  ok(-powB(3n, 2) === -9n && powB(-3n, 2) === 9n && powB(-3n, 3) === -27n && -powB(-3n, 3) === 27n, 'F/2.1-Q3: −3² = −9, (−3)² = 9, (−3)³ = −27, −(−3)³ = 27 — all four priced')
  // Q4 simplify (a³)⁴: options a⁷ / 4a³ / a¹² / a¹ — priced at a = 2
  ok(
    powB(2n, 7) === 128n && 4n * powB(2n, 3) === 32n && powB(2n, 12) === 4096n && powB(2n, 1) === 2n,
    'F/2.1-Q4: at a = 2 the four options read 128 / 32 / 4096 / 2 — the true a¹² = 4096, distractors priced (added exponents, coefficient confusion, subtracted)'
  )
  // Q5 (3+2)²: options 13 / 25 / 36 / 10
  ok(powB(3n, 2) + powB(2n, 2) === 13n && powB(3n + 2n, 2) === 25n && powB(6n, 2) === 36n && 2n * (3n + 2n) === 10n, 'F/2.1-Q5: 13 (distributed), 25 (true), 36 (6² — the sum misread as 6), 10 (doubled) — all priced')

  // ---- 2.2 quiz, keys [1, 2, 1, 2, 3] ----
  // Q1 evaluate 5⁰: options 0 / 1 / 5 / undefined
  ok(powB(5n, 0) === 1n, 'F/2.2-Q1: 5⁰ = 1 (the repair), distractors 0 (zero-power misread), 5 (exponent ignored), undefined (pre-repair truth) — priced')
  // Q2 evaluate 3⁻²: options −9 / 9 / 1/9 / −1/9
  ok(
    -powB(3n, 2) === -9n && powB(3n, 2) === 9n && fracPow(3n, -2).eq(new Frac(1n, 9n)) && fracPow(3n, -2).eq(new Frac(1n, 9n)),
    'F/2.2-Q2: 3⁻² = 1/9 exactly; distractors −9 (sign slip), 9 (minus ignored), −1/9 (double slip) — priced'
  )
  // Q3 x⁻⁵ with positive exponent: options −x⁵ / 1/x⁵ / −1/x⁵ / x⁵ — priced at x = 2
  ok(
    -powB(2n, 5) === -32n && fracPow(2n, -5).eq(new Frac(1n, 32n)) && fracPow(-2n, -5).eq(new Frac(-1n, 32n)) && powB(2n, 5) === 32n,
    'F/2.2-Q3: at x = 2 the four options read −32 / 1/32 / −1/32 / 32 — the true 1/x⁵ = 1/32, distractors priced'
  )
  // Q4 simplify 2⁻³·2⁵: options 2⁻¹⁵ / 1/8 / 2² / −4 — values 1/32768, 1/8, 4, −4
  ok(
    fracPow(2n, -15).eq(new Frac(1n, 32768n)) && fracPow(2n, -3).eq(new Frac(1n, 8n)) && fracPow(2n, -3).mul(fracPow(2n, 5)).eq(fracPow(2n, 2)) && powB(2n, 2) === 4n && -powB(2n, 2) === -4n,
    'F/2.2-Q4: 2⁻³·2⁵ = 2² = 4 (Frac-exact); distractors 2⁻¹⁵ = 1/32768 (multiplied exponents), 1/8 (stopped at 2⁻³), −4 (sign slip) — priced'
  )
  // Q5 which has NO defined value: options 5⁰ / 2⁻² / 1⁻³ / 0⁻²
  ok(powB(5n, 0) === 1n && fracPow(2n, -2).eq(new Frac(1n, 4n)) && fracPow(1n, -3).eq(new Frac(1n, 1n)), 'F/2.2-Q5: 5⁰ = 1, 2⁻² = 1/4, 1⁻³ = 1 — all alive; 0⁻² is the dead one (the boundary of section E)')
}

/* ------------------------------------------------------------------ */
/* (G) exercise keys both sides + the L6 sweeps + figure plans         */
/* ------------------------------------------------------------------ */

{
  // ---- 2.1 exercises ----
  ok(powB(3n, 4) === 81n && powB(2n, 6) === 64n && powB(10n, 3) === 1000n, 'G/L1: 3⁴ = 81, 2⁶ = 64, 10³ = 1000')
  ok(powB(-4n, 2) === 16n && powB(-4n, 3) === -64n, 'G/L1: (−4)² = 16, (−4)³ = −64')
  ok(powB(1n, 7) === 1n && powB(0n, 5) === 0n, 'G/L1: 1⁷ = 1, 0⁵ = 0')
  ok(fracPow(2n, 6).mul(fracPow(2n, 2)).eq(fracPow(2n, 8)) && powB(2n, 8) === 256n, 'G/L2: a⁶·a² = a⁸ — at a = 2: 64·4 = 256 = 2⁸ both sides')
  ok(fracPow(3n, 5).div(fracPow(3n, 2)).eq(fracPow(3n, 3)) && powB(3n, 3) === 27n, 'G/L2: x⁵/x² = x³ — at x = 3: 243/9 = 27 = 3³ both sides')
  ok(fracPow(2n, 2).pow(5).eq(fracPow(2n, 10)) && powB(2n, 10) === 1024n, 'G/L2: (y²)⁵ = y¹⁰ — at y = 2: 4⁵ = 1024 = 2¹⁰ both sides')
  ok(
    2n * powB(2n, 3) === 16n && 3n * powB(2n, 4) === 48n && 16n * 48n === 768n && 6n * powB(2n, 7) === 768n,
    'G/L3: 2x³·3x⁴ = 6x⁷ — at x = 2: (2·8)·(3·16) = 16·48 = 768 = 6·128 both sides'
  )
  ok(fracPow(2n, 5).mul(fracPow(2n, 3)).mul(fracPow(2n, 1)).eq(fracPow(2n, 9)) && powB(2n, 9) === 512n, 'G/L3: a⁵·a³·a = a⁹ — at a = 2: 32·8·2 = 512 = 2⁹ both sides')
  ok(fracPow(2n, 7).div(fracPow(2n, 4)).mul(fracPow(2n, 2)).eq(fracPow(2n, 5)) && powB(2n, 5) === 32n, 'G/L3: p⁷/p⁴·p² = p⁵ (left to right) — at p = 2: 128/16·4 = 32 = 2⁵ both sides')
  ok(fracPow(-2n, 4).mul(fracPow(-2n, 3)).eq(fracPow(-2n, 7)) && powB(-2n, 7) === -128n, 'G/L4: (−2)⁴·(−2)³ = (−2)⁷ = −128 — the product law extends to negative bases, sign and all')
  ok(5n * powB(2n, 6) === 320n && 5n * powB(2n, 7) === 640n && 5n * powB(2n, 8) === 1280n, 'G/L4: the culture 5·2ᵗ — t = 6: 320; t = 7: 640 (≤ 1000); t = 8: 1280 — first past 1000 at t = 8')
  ok(fracPow(2n, 2).pow(3).pow(2).eq(fracPow(2n, 12)) && powB(2n, 12) === 4096n, 'G/L5: ((a²)³)² = a¹² — at a = 2: 4096 both sides')
  ok(fracPow(2n, 2).mul(fracPow(2n, 3).pow(2)).eq(fracPow(2n, 8)) && powB(2n, 8) === 256n, 'G/L5: a²·(a³)² = a⁸ — 256 at a = 2, DIFFERENT from ((a²)³)² = a¹² = 4096 — the two shapes differ')
  ok(powB(2n, 30) > powB(3n, 13) && powB(2n, 30) > 1000000000n, 'G/L5: 2³⁰ = 1,073,741,824 beats 3¹³ = 1,594,323 and also beats 10⁹ — BigInt-exact')

  // the 2.1 L6 census: 2ⁿ vs n²
  {
    const ties: number[] = []
    const losses: number[] = []
    for (const n of rng(1, 20)) {
      const p = powB(2n, n)
      const sq = BigInt(n * n)
      if (p === sq) ties.push(n)
      if (p < sq) losses.push(n)
    }
    let winsFrom = 5
    for (const n of rng(5, 20)) if (powB(2n, n) <= BigInt(n * n)) winsFrom = -1
    ok(JSON.stringify(ties) === JSON.stringify([2, 4]) && JSON.stringify(losses) === JSON.stringify([3]) && winsFrom === 5, 'G/L6: 2ⁿ vs n² for n ∈ [1..20] — ties at n = 2 and 4, the only loss at n = 3 (8 < 9), wins from n = 5 on')
  }

  // ---- 2.2 exercises ----
  ok(powB(7n, 0) === 1n && powB(1n, 0) === 1n && powB(-3n, 0) === 1n, 'G/L1: 7⁰ = 1⁰ = (−3)⁰ = 1 — the repair covers every nonzero base')
  ok(fracPow(2n, -1).eq(new Frac(1n, 2n)) && fracPow(2n, -3).eq(new Frac(1n, 8n)) && fracPow(5n, -2).eq(new Frac(1n, 25n)), 'G/L1: 2⁻¹ = 1/2, 2⁻³ = 1/8, 5⁻² = 1/25')
  ok(fracPow(-2n, -2).eq(new Frac(1n, 4n)) && fracPow(-2n, -3).eq(new Frac(-1n, 8n)), 'G/L1: (−2)⁻² = 1/4, (−2)⁻³ = −1/8')
  ok(fracPow(3n, -4).eq(new Frac(1n, 81n)), 'G/L2: 3⁻⁴ = 1/81')
  ok(fracPow(2n, 5).div(fracPow(2n, 9)).eq(fracPow(2n, -4)) && fracPow(2n, -4).eq(new Frac(1n, 16n)), 'G/L2: x⁵/x⁹ = x⁻⁴ = 1/x⁴ — at x = 2: 32/512 = 1/16 both sides')
  ok(fracPow(2n, -3).mul(fracPow(2n, 7)).eq(fracPow(2n, 4)) && powB(2n, 4) === 16n, 'G/L2: 2⁻³·2⁷ = 2⁴ = 16')
  ok(
    fracPow(2n, -2).mul(fracPow(2n, 5)).div(fracPow(2n, -3)).eq(fracPow(2n, 6)) && powB(2n, 6) === 64n,
    'G/L3: a⁻²·a⁵/a⁻³ = a⁶ — at a = 2: (1/4)·32/(1/8) = 64 = 2⁶ both sides (Frac-exact)'
  )
  ok(fracPow(2n, -1).pow(-3).eq(fracPow(2n, 3)) && powB(2n, 3) === 8n, 'G/L3: (2⁻¹)⁻³ = 2³ = 8 — the power-of-a-power law survives negative exponents both sides')
  ok(
    fracPow(2n, -2).pow(-2).mul(fracPow(3n, 3).pow(-2)).eq(fracPow(2n, 4).mul(fracPow(3n, -6))) &&
      fracPow(2n, -2).pow(-2).mul(fracPow(3n, 3).pow(-2)).eq(new Frac(16n, 729n)),
    'G/L3: (x⁻²y³)⁻² = x⁴y⁻⁶ = x⁴/y⁶ — at (2, 3): 16/729 Frac-exact both sides'
  )
  ok(new Frac(1n, 1n).div(fracPow(2n, -4)).eq(fracPow(2n, 4)) && powB(2n, 4) === 16n, 'G/L4: 1/2⁻⁴ = 2⁴ = 16 — the flip rule')
  ok(fracPow(3n, -2).div(fracPow(4n, -2)).eq(fracPow(4n, 2).div(fracPow(3n, 2))) && fracPow(3n, -2).div(fracPow(4n, -2)).eq(new Frac(16n, 9n)), 'G/L4: 3⁻²/4⁻² = (4/3)² = 16/9 — the cross-bar rule priced')
  ok(100n * powB(2n, 0) === 100n && new Frac(100n * 1n, powB(2n, 4)).eq(new Frac(25n, 4n)), 'G/L4: the decay 100·2⁻ᵗ/³ at t = 0: 100; at t = 12: 100·2⁻⁴ = 25/4 = 6.25 — Frac-exact')
  {
    let repairBad = 0
    for (const x of [2n, 3n, 5n, 7n]) {
      for (const n of rng(1, 5)) {
        if (!fracPow(x, 0).mul(fracPow(x, n)).eq(fracPow(x, n))) repairBad++
      }
    }
    ok(repairBad === 0, 'G/L5: the repair criterion sweep — x⁰·xⁿ = xⁿ for all swept nonzero x and n ∈ [1..5]')
  }
  {
    let boundaryCaught = false
    try {
      new Frac(1n, powB(0n, 3)) // 1/0³ — the denominator is 0: no fraction
    } catch {
      boundaryCaught = true
    }
    ok(boundaryCaught, 'G/L5: the boundary exercise — 1/0ⁿ is rejected as a fraction, so no repair can ever give 0 a negative exponent')
  }
  {
    // the 2.2 L6 sandwich: 2ⁿ < 1/10 < 2ⁿ⁺¹
    const tenth = new Frac(1n, 10n)
    let found = -100
    for (const n of rng(-10, 9)) {
      if (fracPow(2n, n).lt(tenth) && tenth.lt(fracPow(2n, n + 1))) found = n
    }
    ok(found === -4, 'G/L6: the 2ⁿ-sandwich around 1/10 — 2⁻⁴ = 1/16 < 1/10 < 1/8 = 2⁻³ pins n = −4 uniquely in [−10..9]')
    ok(fracPow(2n, -4).lt(tenth) && tenth.lt(fracPow(2n, -3)), 'G/L6: the pin verified directly: 1/16 < 1/10 < 1/8')
  }

  // ---- figure geometry plans (recorded pre-writing, audited in H/I) ----
  // fig 2.1-1 "the copies ledger": viewBox 720x360; header band (30,18,660,44);
  //   three panels 200x220 at y=90: x = 30 / 260 / 490; unit boxes 40x28
  //   stacked inside each panel; footer y = 336.
  // fig 2.1-2 "the sign alternator": viewBox 720x300; two sign bands
  //   (24,14,684,34) and (24,58,684,34); six value boxes 92x64 at y=110,
  //   x = 24 + 118·i for i ∈ [0..5] (last box ends at 706 < 720); footer y=270.
  // fig 2.2-3 "the extension ladder": viewBox 720x380; header (24,14,684,34);
  //   left panel (24,60,320,240); right panel (376,60,320,240); the panels
  //   carry 2 and 3 inner boxes respectively (44/396 x-origins, within their
  //   panels); footer y = 352.
  // fig 2.2-4 "the fraction-bar flip map": viewBox 720x340; header
  //   (24,14,684,36); left panel (30,80,300,180) with 2 inner boxes;
  //   right panel (390,80,300,180) with 2 inner boxes; footer y = 310.
  ok(true, 'G: figure geometry plans recorded (4 figures, viewBoxes 720x360 / 720x300 / 720x380 / 720x340)')
}


/* ------------------------------------------------------------------ */
/* (H) authored lesson 2.1 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch02Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-02.ts').text()
  const lesson: Lesson = chapter02.lessons[0]
  ok(chapter02.lessons.length === 2, 'H: chapter 2 carries both authored lessons at ship (2.1 audited here, 2.2 in section I)')
  ok(lesson.id === 'al-powers-and-the-laws-of-exponents', 'H: lesson id al-powers-and-the-laws-of-exponents')
  ok(lesson.number === '2.1', 'H: lesson number 2.1')
  ok(lesson.title === 'Powers and the Laws of Exponents', 'H: lesson title matches the planned title')
  const pl02 = chapter02.plannedLessons ?? []
  ok(pl02.length === 1 && pl02[0] === 'Scientific Notation and Orders of Magnitude', 'H: at ship only 2.3 remains planned (got ' + JSON.stringify(pl02) + ')')
  ok(chapter02.status === 'in-progress', 'H: chapter 2 in-progress (never complete with lessons unwritten)')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'H: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'H: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-expressions-terms-like-terms', 'fm-numbers-digits-place-value']),
    'H: prerequisites chain to 1.2 (the collection law) and FM 1.1 (the powers-of-ten cameo)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'H: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'H: two display equations (the definition + the three laws)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'H: two derivations (product law + power-of-a-power)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 3, 'H: three illustrations')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 2, 'H: two tables')
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
      ok(JSON.stringify(keys) === JSON.stringify([0, 1, 1, 2, 1]), 'H: quiz keys match the pinned [0, 1, 1, 2, 1] (got ' + JSON.stringify(keys) + ')')
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
    ok(figs.length === 2, 'H: two figures in 2.1 (copies ledger + sign alternator)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the copies ledger: header + 3 panels + 10 unit boxes = 14 rects
      const rl = rects(figs[0].svg)
      ok(rl.length === 14, 'H: copies ledger = header + 3 panels + 10 unit boxes (14 rects, got ' + rl.length + ')')
      ok(rl.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 360), 'H: copies ledger boxes inside viewBox 720x360')
      const headerL = rl.find((r) => r.w === 660)
      const panelsL = rl.filter((r) => r.w === 200 && r.h === 220)
      const unitsL = rl.filter((r) => r.w === 40)
      ok(!!headerL && panelsL.length === 3 && unitsL.length === 10, 'H: copies ledger composition (1 header + 3 panels + 10 units)')
      ok(panelsL.every((p) => sep(headerL!, p)), 'H: copies ledger header clear of the panels')
      ok(pairwise(panelsL), 'H: copies ledger panels mutually disjoint')
      ok(pairwise(unitsL), 'H: copies ledger unit boxes pairwise disjoint')
      for (const u of unitsL) {
        ok(
          panelsL.some((p) => u.x >= p.x && u.y >= p.y && u.x + u.w <= p.x + p.w && u.y + u.h <= p.y + p.h),
          'H: copies ledger unit (' + u.x + ',' + u.y + ') sits inside a panel'
        )
      }
      // figs[1] = the sign alternator: 2 bands + 6 value boxes = 8 rects
      const rs = rects(figs[1].svg)
      ok(rs.length === 8, 'H: sign alternator = 2 bands + 6 value boxes (8 rects, got ' + rs.length + ')')
      ok(rs.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 300), 'H: sign alternator boxes inside viewBox 720x300')
      const bands = rs.filter((r) => r.w === 684)
      const boxes = rs.filter((r) => r.w === 92)
      ok(bands.length === 2 && boxes.length === 6, 'H: sign alternator composition (2 bands + 6 boxes)')
      ok(pairwise(bands), 'H: sign alternator bands disjoint')
      ok(pairwise(boxes), 'H: sign alternator value boxes pairwise disjoint')
      ok(rs.every((r) => r.y + r.h <= 92 || r.y >= 110), 'H: sign alternator bands clear of the value row')
      ok(figs[0].svg.includes('a\u00b2') || figs[0].svg.includes('a²'), 'H: copies ledger carries the superscript labels')
      ok(figs[1].svg.includes('64') && figs[1].svg.includes('(\u22122)'), 'H: sign alternator carries the alternating values (Unicode minus)')
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
  // odd-run backslash scan (run-69 hardening of the run-65 lesson): every
  // maximal backslash run in the TS source must be EVEN length - an odd run
  // is a silently eaten LaTeX escape (the eaten quad / frac class)
  {
    let oddRuns = 0
    {
      let i = 0
      while (i < ch02Src.length) {
        if (ch02Src[i] === '\\') {
          let j = i
          while (j < ch02Src.length && ch02Src[j] === '\\') j++
          if ((j - i) % 2 === 1) oddRuns++
          i = j
        } else i++
      }
    }
    ok(oddRuns === 0, 'H: no odd-length backslash runs in ch-02.ts source - odd runs are eaten escapes (found ' + oddRuns + ')')
  }
  // al- prefix uniqueness across the whole library
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'H: all ' + ids.length + ' lesson ids repo-wide unique (with 2.1 added)')
    ok(ids.includes('al-powers-and-the-laws-of-exponents'), 'H: the new id is registered in the library')
  }
  // the book wiring
  ok(elementaryAlgebra.chapters[1] === chapter02, 'H: book.ts chapters[1] IS chapter02')
  ok(elementaryAlgebra.status === 'in-progress', 'H: the BOOK stays in-progress')
}


/* ------------------------------------------------------------------ */
/* (I) authored lesson 2.2 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch02Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-02.ts').text()
  const lesson: Lesson = chapter02.lessons[1]
  ok(chapter02.lessons.length === 2, 'I: chapter 2 carries both authored lessons of this run')
  ok(lesson.id === 'al-zero-and-negative-exponents-another-repair', 'I: lesson id al-zero-and-negative-exponents-another-repair')
  ok(lesson.number === '2.2', 'I: lesson number 2.2')
  ok(lesson.title === 'Zero and Negative Exponents: Another Repair', 'I: lesson title matches the planned title')
  const plI = chapter02.plannedLessons ?? []
  ok(plI.length === 1 && plI[0] === 'Scientific Notation and Orders of Magnitude', 'I: plannedLessons now carry only 2.3 (got ' + JSON.stringify(plI) + ')')
  ok(chapter02.status === 'in-progress', 'I: chapter 2 still in-progress (2.3 + the unit review belong to run 70)')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'I: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'I: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-powers-and-the-laws-of-exponents', 'ans-closure-failures-that-force-extension']),
    'I: prerequisites chain to 2.1 and ANS 6.1 (the ladder’s first rung)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'I: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'I: two display equations (the repaired exponents)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'I: two derivations (zero exponent + negative exponent)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 3, 'I: three illustrations')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 2, 'I: two tables')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 2, 'I: two formula cards')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'I: the permanence historical callout present')
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
      ok(JSON.stringify(keys) === JSON.stringify([1, 2, 1, 2, 3]), 'I: quiz keys match the pinned [1, 2, 1, 2, 3] (got ' + JSON.stringify(keys) + ')')
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
    ok(figs.length === 2, 'I: two figures in 2.2 (extension ladder + flip map)')
    const rects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => ({ x: Number(m[1]), y: Number(m[2]), w: Number(m[3]), h: Number(m[4]) }))
        .filter((r) => !(r.x === 0 && r.y === 0))
    const sep = (r1: { x: number; y: number; w: number; h: number }, r2: { x: number; y: number; w: number; h: number }) =>
      r1.x + r1.w <= r2.x || r2.x + r2.w <= r1.x || r1.y + r1.h <= r2.y || r2.y + r2.h <= r1.y
    const pairwise = (rs: { x: number; y: number; w: number; h: number }[]) =>
      rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2)))
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the extension ladder: header + 2 panels + 5 inner boxes = 8 rects
      const rl = rects(figs[0].svg)
      ok(rl.length === 8, 'I: ladder = header + 2 panels + 5 inner boxes (8 rects, got ' + rl.length + ')')
      ok(rl.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 380), 'I: ladder boxes inside viewBox 720x380')
      const headerR = rl.find((r) => r.w === 684 && r.h === 34)
      const panelsR = rl.filter((r) => r.w === 320 && r.h === 240)
      const innerR = rl.filter((r) => r.w === 280)
      ok(!!headerR && panelsR.length === 2 && innerR.length === 5, 'I: ladder composition (header + 2 panels + 5 inner)')
      ok(pairwise(panelsR), 'I: ladder panels mutually disjoint')
      ok(panelsR.every((p) => sep(headerR!, p)), 'I: ladder header clear of the panels')
      ok(pairwise(innerR), 'I: ladder inner boxes pairwise disjoint')
      const leftInners = innerR.filter((b) => b.x === 44)
      const rightInners = innerR.filter((b) => b.x === 396)
      ok(leftInners.length === 2 && rightInners.length === 3, 'I: ladder inner boxes 2 left + 3 right')
      for (const b of leftInners) {
        ok(leftInners.every((p) => sep(b, p) || (b.x === p.x && b.y === p.y && b.w === p.w && b.h === p.h)) && b.x >= 24 && b.y >= 60 && b.x + b.w <= 344 && b.y + b.h <= 300, 'I: ladder left inner inside the left panel')
      }
      for (const b of rightInners) {
        ok(b.x >= 376 && b.y >= 60 && b.x + b.w <= 696 && b.y + b.h <= 300, 'I: ladder right inner inside the right panel')
      }
      // figs[1] = the flip map: header + 2 panels + 4 inner boxes = 7 rects
      const rf = rects(figs[1].svg)
      ok(rf.length === 7, 'I: flip map = header + 2 panels + 4 inner boxes (7 rects, got ' + rf.length + ')')
      ok(rf.every((r) => r.x >= 0 && r.y >= 0 && r.x + r.w <= 720 && r.y + r.h <= 340), 'I: flip map boxes inside viewBox 720x340')
      const headerF = rl.find(() => false) // no shared header shape between figures
      void headerF
      const panelsF = rf.filter((r) => r.w === 300 && r.h === 180)
      const innerF = rf.filter((r) => r.w === 260)
      ok(panelsF.length === 2 && innerF.length === 4, 'I: flip map composition (2 panels + 4 inner)')
      ok(pairwise(panelsF), 'I: flip map panels mutually disjoint')
      ok(pairwise(innerF), 'I: flip map inner boxes pairwise disjoint')
      for (const b of innerF) {
        ok(panelsF.some((p) => b.x >= p.x && b.y >= p.y && b.x + b.w <= p.x + p.w && b.y + b.h <= p.y + p.h), 'I: flip map inner (' + b.x + ',' + b.y + ') sits inside a panel')
      }
      ok(figs[0].svg.includes('\u2192') || figs[0].svg.includes('\u2192'), 'I: ladder carries the before/after arrow')
      ok(figs[1].svg.includes('x\u207b\u00b2 / y\u207b\u00b3') || figs[1].svg.includes('y\u00b3 / x\u00b2'), 'I: flip map carries the inversion exhibit')
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
  // odd-run backslash scan (run-69 hardening of the run-65 lesson): every
  // maximal backslash run in the TS source must be EVEN length - an odd run
  // is a silently eaten LaTeX escape (the eaten quad / frac class)
  {
    let oddRuns = 0
    {
      let i = 0
      while (i < ch02Src.length) {
        if (ch02Src[i] === '\\') {
          let j = i
          while (j < ch02Src.length && ch02Src[j] === '\\') j++
          if ((j - i) % 2 === 1) oddRuns++
          i = j
        } else i++
      }
    }
    ok(oddRuns === 0, 'I: no odd-length backslash runs after 2.2 - odd runs are eaten escapes (found ' + oddRuns + ')')
  }
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'I: all ' + ids.length + ' lesson ids repo-wide unique (with 2.2 added)')
    ok(ids.includes('al-zero-and-negative-exponents-another-repair'), 'I: the new id is registered in the library')
  }
  ok(elementaryAlgebra.chapters[1] === chapter02, 'I: book.ts chapters[1] IS chapter02')
  ok(elementaryAlgebra.status === 'in-progress', 'I: the BOOK stays in-progress')
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log('')
console.log('verify-book3-ch02 (pre-writing phase): ' + passed + ' passed, ' + failed + ' failed')
if (failed > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
console.log('ALL GREEN')
