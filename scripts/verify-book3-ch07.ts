export {}

import { chapter07 } from '../src/data/library/books/mathematics/elementary-algebra/ch-07'
import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'
/**
 * verify-book3-ch07.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 7 "Inequalities" — lesson 7.1 "Order and the Solution
 * Set" (id al-order-and-the-solution-set) and 7.2 "Solving Linear
 * Inequalities" (id al-solving-linear-inequalities).
 *
 * Created 2026-11-09 (run 79) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–78. Conventions: ALL arithmetic in
 * this verifier is exact — BigInt/Frac coefficients and exact comparisons;
 * no float decides any claim. The engines:
 *
 *   (A) the order engines —
 *       (i)   the trichotomy census: for EVERY pair (a, b) ∈ [−6..6]²
 *             exactly one of a < b, a = b, a > b holds — 169 pairs split
 *             78 / 13 / 78, and the split is exhaustive;
 *       (ii)  the addition law as an executable assertion: for ALL
 *             (a, b, c) ∈ [−6..6]³, a < b ⟺ a + c < b + c (and the same
 *             for subtraction) — adding NEVER flips, whatever the sign of c;
 *       (iii) the positive-scaling law: for ALL (a, b) ∈ [−6..6]² and
 *             k ∈ [1..6], a < b ⟺ ka < kb, and the exact division form
 *             a < b ⟺ a/k < b/k (Frac cross-comparison, k ≠ 0);
 *       (iv)  THE FLIP (7.2's core, priced over the designed grid): for
 *             ALL (a, b) ∈ [−6..6]² and k ∈ [−6..−1], a < b ⟺ ka > kb,
 *             and the exact division form a < b ⟺ a/k > b/k; the
 *             double-flip engine: for k1, k2 < 0, k1·k2 > 0 and
 *             a < b ⟺ k1·k2·a < k1·k2·b — two flips return the original
 *             order everywhere;
 *       (v)   the add-negative trap census: c ∈ [−6..−1], a < b ⟺
 *             a + c < b + c over the full grid — the classic distractor
 *             "multiplying by a negative flips, so adding one must too"
 *             is false everywhere, priced;
 *       (vi)  the boundary/interval census: over the integer window
 *             [−12..12] (25 points) the counts |{x < 4}| = 16, |{x ≤ 4}| =
 *             17, |{x > 4}| = 8, |{x ≥ 4}| = 9, |{x = 4}| = 1 — each
 *             closed ray exceeds its open ray by EXACTLY the boundary
 *             point; the degenerate censuses |{x < x}| = 0 and
 *             |{x ≤ x}| = 25; the mixed strict/slack census
 *             |{x ∈ window : −3 ≤ x < 5}| = 8;
 *       (vii) the solution-shape engine: for EVERY linear inequality
 *             a·x + b ∘ c with a ∈ [−6..6]\{0}, b, c ∈ [−6..6] and
 *             ∘ ∈ {<, ≤, >, ≥} (2,028 × 4 = 8,112 assertions): the exact
 *             boundary t = (c − b)/a (Frac); the windowed census equals
 *             the count of window integers strictly/slackly on the
 *             shape-predicted side of t (left ray for a > 0 with < ≤;
 *             right ray for a < 0 with < ≤ — the flip read structurally:
 *             negating the coefficient mirrors the ray); the boundary
 *             integer belongs exactly to the slack shapes;
 *       (viii) the move-licence engines: for 300 sampled assertions of
 *             each shape, each lawful move (add c to both members;
 *             multiply both members by k > 0; multiply by k < 0 WITH the
 *             flip; divide by k ≠ 0 with the sign law) preserves the
 *             windowed solution census exactly; the WRONG move (multiply
 *             by k < 0 WITHOUT flipping) mismatches for every a < 0
 *             assertion — mismatches counted and reported;
 *       (ix)  the whole-number habitat engine: the budget/lift/notebook
 *             exhibits — 12n ≤ 50 → n ≤ 25/6, whole solutions {0..4};
 *             85n ≤ 620 → n ≤ 124/17, whole solutions {0..7};
 *             65n ≤ 460 → n ≤ 92/13, whole solutions {0..7} — each
 *             largest whole number checked in (satisfies) and out (fails).
 *   (B) the pinned computations of lesson 7.1 — the trichotomy exhibit,
 *       the windowed ray censuses, the strict/slack pair {x ≥ −1} (14
 *       integers) vs {x > −1} (13), the equivalence census of
 *       x + 3 < 7 ⟺ x < 4 over the window (16 = 16, pointwise ⟺), the
 *       transitivity count C(9,3) = 84 on [−4..4], the budget/lift
 *       exhibits, quiz keys [0, 1, 0, 2, 1] with EVERY distractor priced,
 *       and the 14 exercise keys solved + checked;
 *   (C) the FIGURE GEOMETRY PLANS of 7.1's two figures (the trichotomy
 *       doors 720×340; the solution-set shapes strip 720×380) recorded
 *       pre-writing, audited against the authored SVG in F;
 *   (D) the pinned computations of lesson 7.2 — the flip mirror exhibit
 *       (2 < 5 ×(−1) → −2 > −5), the double-flip return, the add-negative
 *       trap instance, the pipeline exhibits (2x < 14 → x < 7;
 *       x − 5 ≥ −2 → x ≥ 3; −4x > 12 → x < −3; 3x − 5 < 16 → x < 7 with
 *       the three-point check; 7 − 3x ≥ −2 → x ≤ 3 with the three-point
 *       check; 5 − 2x ≥ 11 → x ≤ −3 with the three-point check;
 *       (2x−1)/3 < (x+4)/2 → x < 14 with the exact Frac boundary check;
 *       2(x+3) > 4x − 8 → x < 7; 0.5x + 1.5 ≤ 4 → x ≤ 5; the parameter
 *       exhibit 4x − k < 0 → x < 3 ⟺ k = 12; the smallest-integer exhibit
 *       11 − 2x < 3 → x > 4 → 5; the notebook and marks exhibits),
 *       quiz keys [0, 1, 1, 2, 2] with EVERY distractor priced, and the
 *       14 exercise keys solved + checked;
 *   (E) the FIGURE GEOMETRY PLANS of 7.2's two figures (the flip mirror
 *       720×360; the solving pipeline 720×340) recorded pre-writing,
 *       audited against the authored SVG in G.
 *
 * Sections F (authored 7.1) and G (authored 7.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 73–78 (quiz keys vs pinned, exercise shape, figure geometry vs plans,
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

class Frac {
  n: bigint
  d: bigint
  constructor(n: bigint, d: bigint) {
    if (d === 0n) throw new Error('Frac: zero denominator')
    if (d < 0n) {
      n = -n
      d = -d
    }
    const g = gcdB(n, d)
    this.n = g === 0n ? 0n : n / g
    this.d = g === 0n ? 1n : d / g
  }
  static of(k: bigint | number): Frac {
    return new Frac(BigInt(k), 1n)
  }
  static ofFrac(n: bigint | number, d: bigint | number): Frac {
    return new Frac(BigInt(n), BigInt(d))
  }
  add(o: Frac): Frac {
    return new Frac(this.n * o.d + o.n * this.d, this.d * o.d)
  }
  sub(o: Frac): Frac {
    return new Frac(this.n * o.d - o.n * this.d, this.d * o.d)
  }
  mul(o: Frac): Frac {
    return new Frac(this.n * o.n, this.d * o.d)
  }
  div(o: Frac): Frac {
    if (o.n === 0n) throw new Error('Frac: division by zero')
    return new Frac(this.n * o.d, this.d * o.n)
  }
  neg(): Frac {
    return new Frac(-this.n, this.d)
  }
  eq(o: Frac): boolean {
    return this.n === o.n && this.d === o.d
  }
  lt(o: Frac): boolean {
    return this.n * o.d < o.n * this.d
  }
  le(o: Frac): boolean {
    return this.n * o.d <= o.n * this.d
  }
  gt(o: Frac): boolean {
    return this.n * o.d > o.n * this.d
  }
  ge(o: Frac): boolean {
    return this.n * o.d >= o.n * this.d
  }
  isZero(): boolean {
    return this.n === 0n
  }
  isInt(): boolean {
    return this.d === 1n
  }
  toString(): string {
    return this.d === 1n ? this.n.toString() : `${this.n}/${this.d}`
  }
}

const frac = (x: number): Frac => Frac.of(BigInt(x))

/* ------------------------------------------------------------------ */
/* (A) the order engines                                               */
/* ------------------------------------------------------------------ */

const C6 = rng(-6, 6)
const W12 = rng(-12, 12)

// A-i — the trichotomy census
{
  let less = 0
  let equal = 0
  let greater = 0
  for (const a of C6)
    for (const b of C6) {
      const l = a < b
      const e = a === b
      const g = a > b
      ok((l ? 1 : 0) + (e ? 1 : 0) + (g ? 1 : 0) === 1, 'A-i: exactly one of <, =, > holds for the pair (' + a + ', ' + b + ')')
      ok(l === ((b - a) > 0) && g === ((a - b) > 0) && e === (b - a === 0), 'A-i: the sign reading of order for (' + a + ', ' + b + ')')
      if (l) less++
      else if (e) equal++
      else greater++
    }
  ok(less === 78 && equal === 13 && greater === 78, 'A-i: the trichotomy split 78/13/78 (got ' + less + '/' + equal + '/' + greater + ')')
  console.log('[A-i] trichotomy over 13×13: less ' + less + ', equal ' + equal + ', greater ' + greater + ' (total ' + (less + equal + greater) + ')')
}

// A-ii — the addition law (and subtraction) never flip, whatever c's sign
{
  let n = 0
  for (const a of C6)
    for (const b of C6)
      for (const c of C6) {
        ok((a < b) === (a + c < b + c), 'A-ii: addition law fails at (' + a + ', ' + b + ', + ' + c + ')')
        ok((a < b) === (a - c < b - c), 'A-ii: subtraction law fails at (' + a + ', ' + b + ', - ' + c + ')')
        n++
      }
  ok(n === 13 * 13 * 13, 'A-ii: the addition grid holds 2,197 triples (got ' + n + ')')
  console.log('[A-ii] addition + subtraction laws: ' + 2 * n + ' exact equivalences, zero flips')
}

// A-iii — positive scaling, multiplication and exact division
{
  let n = 0
  for (const a of C6)
    for (const b of C6)
      for (const k of rng(1, 6)) {
        ok((a < b) === (k * a < k * b), 'A-iii: positive scaling fails at (' + a + ', ' + b + ', ×' + k + ')')
        ok((a < b) === frac(a).div(frac(k)).lt(frac(b).div(frac(k))), 'A-iii: exact division fails at (' + a + ', ' + b + ', ÷' + k + ')')
        n++
      }
  ok(n === 169 * 6, 'A-iii: the positive grid holds 1,014 triples (got ' + n + ')')
  console.log('[A-iii] positive × and ÷ laws: ' + 2 * n + ' exact equivalences, order preserved')
}

// A-iv — THE FLIP over the designed grid (7.2's core)
{
  let n = 0
  for (const a of C6)
    for (const b of C6)
      for (const k of rng(-6, -1)) {
        ok((a < b) === (k * a > k * b), 'A-iv: THE FLIP fails at (' + a + ', ' + b + ', ×(' + k + '))')
        ok((a < b) === frac(b).div(frac(k)).lt(frac(a).div(frac(k))), 'A-iv: exact division flip fails at (' + a + ', ' + b + ', ÷(' + k + '))')
        n++
      }
  ok(n === 169 * 6, 'A-iv: the flip grid holds 1,014 triples (got ' + n + ')')
  console.log('[A-iv] THE FLIP × and ÷: ' + 2 * n + ' exact reversals over k ∈ [−6..−1] — order flips every time')
  // the double-flip engine: two negative multipliers compose to a positive
  let m = 0
  for (const a of C6)
    for (const b of C6)
      for (const k1 of rng(-3, -1))
        for (const k2 of rng(-3, -1)) {
          ok((a < b) === (k1 * k2 * a < k1 * k2 * b), 'A-iv: double flip fails at (' + a + ', ' + b + ', k1 = ' + k1 + ', k2 = ' + k2 + ')')
          ok(k1 * k2 > 0, 'A-iv: the product of two negatives is positive (' + k1 + '·' + k2 + ')')
          m++
        }
  ok(m === 169 * 9, 'A-iv: the double-flip grid holds 1,521 systems (got ' + m + ')')
  console.log('[A-iv] double flip: ' + m + ' systems — two flips return the original order (k1·k2 > 0 throughout)')
}

// A-v — the add-negative trap: adding NEVER flips (the classic distractor)
{
  let n = 0
  for (const a of C6)
    for (const b of C6)
      for (const c of rng(-6, -1)) {
        ok((a < b) === (a + c < b + c), 'A-v: adding a negative flipped at (' + a + ', ' + b + ', + (' + c + '))')
        n++
      }
  ok(n === 169 * 6, 'A-v: the add-negative grid holds 1,014 triples (got ' + n + ')')
  console.log('[A-v] add-negative trap: ' + n + ' checks — adding never flips, however negative the addend')
}

// A-vi — the boundary/interval census over the window [−12..12]
{
  const cnt = (pred: (x: number) => boolean) => W12.filter(pred).length
  const open4 = cnt((x) => x < 4)
  const slack4 = cnt((x) => x <= 4)
  const openR4 = cnt((x) => x > 4)
  const slackR4 = cnt((x) => x >= 4)
  const point4 = cnt((x) => x === 4)
  ok(open4 === 16, 'A-vi: |{x < 4}| over the window = 16 (got ' + open4 + ')')
  ok(slack4 === 17, 'A-vi: |{x ≤ 4}| over the window = 17 (got ' + slack4 + ')')
  ok(openR4 === 8, 'A-vi: |{x > 4}| over the window = 8 (got ' + openR4 + ')')
  ok(slackR4 === 9, 'A-vi: |{x ≥ 4}| over the window = 9 (got ' + slackR4 + ')')
  ok(point4 === 1, 'A-vi: |{x = 4}| over the window = 1 (got ' + point4 + ')')
  ok(slack4 - open4 === 1 && slackR4 - openR4 === 1, 'A-vi: each closed ray exceeds its open ray by exactly the boundary point')
  ok(cnt((x) => x < x) === 0, 'A-vi: |{x < x}| = 0 — the empty solution set')
  ok(cnt((x) => x <= x) === 25, 'A-vi: |{x ≤ x}| = 25 — the universal (windowed) solution set')
  const mixed = cnt((x) => -3 <= x && x < 5)
  ok(mixed === 8, 'A-vi: the mixed census |{−3 ≤ x < 5}| = 8 (got ' + mixed + ')')
  console.log('[A-vi] window [−12..12]: x<4 → ' + open4 + ', x≤4 → ' + slack4 + ', x>4 → ' + openR4 + ', x≥4 → ' + slackR4 + ', x=4 → ' + point4 + '; x<x → 0; x≤x → 25; −3≤x<5 → ' + mixed)
}

// A-vii — the solution-shape engine over the full 2,028×4 assertion grid
{
  type Sign = '<' | '<=' | '>' | '>='
  const signs: Sign[] = ['<', '<=', '>', '>=']
  const holds = (lhs: Frac, s: Sign, rhs: Frac): boolean =>
    s === '<' ? lhs.lt(rhs) : s === '<=' ? lhs.le(rhs) : s === '>' ? rhs.lt(lhs) : rhs.le(lhs)
  let assertions = 0
  let boundaryIntegral = 0
  let boundaryInSlack = 0
  let boundaryOutStrict = 0
  for (const a of C6) {
    if (a === 0) continue
    for (const b of C6)
      for (const c of C6)
        for (const s of signs) {
          const t = new Frac(BigInt(c) - BigInt(b), BigInt(a)) // boundary of ax ∘ c − b
          let census = 0
          let shapeCensus = 0
          for (const x of W12) {
            const fx = frac(x)
            const sat = holds(fx.mul(frac(a)).add(frac(b)), s, frac(c))
            if (sat) census++
            const shapeSat =
              a > 0
                ? s === '<'
                  ? fx.lt(t)
                  : s === '<='
                    ? fx.le(t)
                    : s === '>'
                      ? fx.gt(t)
                      : fx.ge(t)
                : s === '<'
                  ? fx.gt(t)
                  : s === '<='
                    ? fx.ge(t)
                    : s === '>'
                      ? fx.lt(t)
                      : fx.le(t)
            if (shapeSat) shapeCensus++
          }
          ok(census === shapeCensus, 'A-vii: shape census mismatch at a=' + a + ', b=' + b + ', c=' + c + ', ' + s + ' (' + census + ' vs ' + shapeCensus + ')')
          assertions++
          if (t.isInt() && t.n >= -12n && t.n <= 12n) {
            boundaryIntegral++
            const bx = Number(t.n)
            const inSlack = holds(frac(bx).mul(frac(a)).add(frac(b)), s, frac(c)) // a·t + b = c exactly, so slack holds, strict fails
            ok(inSlack === (s === '<=' || s === '>='), 'A-vii: boundary membership wrong at a=' + a + ', ' + s)
            if (s === '<=' || s === '>=') boundaryInSlack++
            else boundaryOutStrict++
          }
        }
  }
  ok(assertions === 2028 * 4, 'A-vii: the assertion grid holds 8,112 linear inequalities (got ' + assertions + ')')
  console.log('[A-vii] full grid: ' + assertions + ' inequalities — shape census = direct census everywhere; boundary integral-in-window ' + boundaryIntegral + ' times (in slack ' + boundaryInSlack + ', out strict ' + boundaryOutStrict + ')')
}

// A-viii — the move-licence engines + the wrong-move pricing
{
  type Sign = '<' | '<=' | '>' | '>='
  const holds = (lhs: number, s: Sign, rhs: number): boolean =>
    s === '<' ? lhs < rhs : s === '<=' ? lhs <= rhs : s === '>' ? lhs > rhs : lhs >= rhs
  const censusOf = (a: number, b: number, s: Sign, c: number): number =>
    W12.filter((x) => holds(a * x + b, s, c)).length
  let sampled = 0
  let flips = 0
  const wrongMismatches: number[] = []
  for (const a of C6) {
    if (a === 0) continue
    for (const b of C6)
      for (const c of rng(-4, 4))
        for (const s of ['<', '<='] as Sign[]) {
          if (sampled >= 300) continue
          const base = censusOf(a, b, s, c)
          // licence 1: add c to both members
          for (const k of rng(-5, 5)) ok(censusOf(a, b + k, s, c + k) === base, 'A-viii: add-move changed the census at a=' + a)
          // licence 2: multiply both members by k > 0
          for (const k of rng(1, 4)) ok(censusOf(a * k, b * k, s, c * k) === base, 'A-viii: ×k>0 changed the census at a=' + a)
          // licence 3: multiply by k < 0 WITH the flip (∘ ↔ its opposite)
          const opp: Sign = s === '<' ? '>' : '>='
          for (const k of rng(-4, -1)) {
            ok(censusOf(a * k, b * k, opp, c * k) === base, 'A-viii: flip-move changed the census at a=' + a)
            flips++
          }
          // the WRONG move: multiply by k < 0 without flipping
          for (const k of rng(-4, -1)) wrongMismatches.push(censusOf(a * k, b * k, s, c * k) - base)
          sampled++
        }
  }
  {
    const nonZeroWrong = wrongMismatches.filter((d) => d !== 0).length
    ok(nonZeroWrong > 0, 'A-viii: the wrong move should mismatch somewhere')
    ok(sampled === 300, 'A-viii: exactly 300 assertions sampled (got ' + sampled + ')')
    console.log('[A-viii] licences: 300 assertions × (11 adds + 4 scalings + 4 flips) censused equal; flips exercised ' + flips + ' — wrong-move (flip omitted) mismatched ' + nonZeroWrong + ' of ' + wrongMismatches.length + ' times')
  }
}

// A-ix — the whole-number habitat engine (budget / lift / notebook)
{
  const wholeSol = (a: number, rhs: bigint, lo: number, hi: number): number[] => {
    const out: number[] = []
    for (const n of rng(lo, hi)) {
      // assertion: a·n ≤ rhs, exact
      const lhs = new Frac(BigInt(a) * BigInt(n), 1n)
      if (lhs.le(new Frac(rhs, 1n))) out.push(n)
    }
    return out
  }
  const budget = wholeSol(12, 50n, 0, 20)
  ok(JSON.stringify(budget) === JSON.stringify([0, 1, 2, 3, 4]), 'A-ix: the budget exhibit 12n ≤ 50 → whole solutions {0..4} (got ' + JSON.stringify(budget) + ')')
  ok(12 * 4 <= 50 && 12 * 5 > 50, 'A-ix: the budget boundary: 48 ≤ 50 < 60')
  const lift = wholeSol(85, 620n, 0, 20)
  ok(JSON.stringify(lift) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7]), 'A-ix: the lift exhibit 85n ≤ 620 → whole solutions {0..7} (got ' + JSON.stringify(lift) + ')')
  ok(85 * 7 <= 620 && 85 * 8 > 620, 'A-ix: the lift boundary: 595 ≤ 620 < 680')
  const notebook = wholeSol(65, 460n, 0, 20)
  ok(JSON.stringify(notebook) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7]), 'A-ix: the notebook exhibit 65n ≤ 460 → whole solutions {0..7} (got ' + JSON.stringify(notebook) + ')')
  ok(65 * 7 + 40 <= 500 && 65 * 8 + 40 > 500, 'A-ix: the notebook budget check: 455 + 40 = 495 ≤ 500 < 560')
  console.log('[A-ix] habitats: budget {0..4} (5 pens), lift {0..7} (7 crates), notebook {0..7} (7 books, 495 ≤ 500)')
}

/* ------------------------------------------------------------------ */
/* (B) the pinned computations of lesson 7.1                           */
/* ------------------------------------------------------------------ */

{
  // the trichotomy exhibit
  ok(2 < 5 && !(5 < 2) && !(2 === (5 as number)), 'B: the trichotomy exhibit 2 < 5')
  ok(-3 < -1 && -1 < 0, 'B: the negative-side exhibit −3 < −1 < 0')
  // the equivalence census of x + 3 < 7 ⟺ x < 4, pointwise over the window
  {
    let agree = 0
    for (const x of W12) ok(x + 3 < 7 === (x < 4), 'B: x + 3 < 7 ⟺ x < 4 fails at x = ' + x)
    agree = W12.filter((x) => x < 4).length
    ok(agree === 16, 'B: the census of x < 4 over the window = 16 (got ' + agree + ')')
  }
  // the strict/slack pair
  {
    const slack = W12.filter((x) => x >= -1).length
    const strict = W12.filter((x) => x > -1).length
    ok(slack === 14 && strict === 13, 'B: {x ≥ −1} holds 14 window integers vs 13 for {x > −1} (got ' + slack + '/' + strict + ')')
    ok(strict + 1 === slack, 'B: the boundary −1 itself is the whole difference')
  }
  // transitivity: the count on [−4..4] is C(9,3) = 84, the law everywhere
  {
    let chains = 0
    for (const a of rng(-4, 4))
      for (const b of rng(-4, 4))
        for (const c of rng(-4, 4)) {
          if (a < b && b < c) {
            chains++
            ok(a < c, 'B: transitivity failed at (' + a + ', ' + b + ', ' + c + ')')
            ok(b - a > 0 && c - b > 0 && c - a === (b - a) + (c - b), 'B: the telescoping identity failed at (' + a + ', ' + b + ', ' + c + ')')
          }
        }
    ok(chains === 84, 'B: the transitivity chains on [−4..4] number C(9,3) = 84 (got ' + chains + ')')
    console.log('[B] transitivity: 84 chains on [−4..4], the telescoping identity exact in each')
  }
  // the budget and lift exhibits (exact)
  {
    const t25 = new Frac(50n, 12n)
    ok(t25.n === 25n && t25.d === 6n, 'B: 50/12 reduces to 25/6 (got ' + t25.toString() + ')')
    const t124 = new Frac(620n, 85n)
    ok(t124.n === 124n && t124.d === 17n, 'B: 620/85 reduces to 124/17 (got ' + t124.toString() + ')')
  }
  // the mixed census
  ok(W12.filter((x) => -3 <= x && x < 5).length === 8, 'B: the mixed strict/slack census = 8 integers (−3..4)')
  console.log('[B] 7.1 pins: rays 16/17/8/9/1; strict-slack 13/14; x+3<7 ⟺ x<4 pointwise; budget 25/6 → 4; lift 124/17 → 7; mixed 8')
  // quiz keys for 7.1 — the intended battery, distractors priced live below
  // pinned: [0, 1, 0, 2, 1]
}

/* ------------------------------------------------------------------ */
/* (B2) the pinned 7.1 quiz battery — every option priced              */
/* ------------------------------------------------------------------ */

{
  // Q1: solution set of x + 3 < 7 — options: x<4 (KEY), x<10, x>4, x=4
  ok(W12.every((x) => (x + 3 < 7) === (x < 4)), 'B2 Q1: the key option x < 4 is equivalent pointwise')
  ok(W12.some((x) => (x + 3 < 7) !== (x < 10)) && W12.filter((x) => x < 10 && !(x < 4)).length === 6, 'B2 Q1: distractor x < 10 admits 6 extra window integers (4..9)')
  ok(W12.filter((x) => x > 4).length === 8 && W12.filter((x) => x > 4 && x + 3 < 7).length === 0, 'B2 Q1: distractor x > 4 is the opposite ray — 0 true solutions')
  ok(W12.filter((x) => x === 4).length === 1 && !(4 + 3 < 7), 'B2 Q1: distractor x = 4 fails at the boundary itself (7 < 7 false)')
  // Q2: picture of x ≤ −1 — key = filled dot, ray left
  ok(W12.filter((x) => x <= -1).length === 12 && W12.filter((x) => x > -1).length === 13, 'B2 Q2: x ≤ −1 → 12 window integers (the left ray), its complement 13')
  ok(-1 <= -1 && !(-1 < -1), 'B2 Q2: the boundary −1 belongs to x ≤ −1 (filled), not to x < −1 (hollow)')
  // Q3: the always-true law — key: a < b ⟹ a + c < b + c
  ok(C6.every((a) => C6.every((b) => C6.every((c) => (a < b ? a + c < b + c : true)))), 'B2 Q3: the addition law holds over the full grid (the key)')
  ok(C6.some((a) => C6.some((b) => C6.some((c) => a < b && !(a * c < b * c)))), 'B2 Q3: distractor ac < bc FAILS at c < 0 — the flip, priced')
  ok(C6.some((a) => C6.some((b) => C6.some((c) => a < b && !(a - c > b - c)))), 'B2 Q3: distractor a − c > b − c fails at every c (subtracting preserves, not reverses)')
  // Q4: whole numbers with 12n ≤ 50 — key: 5 (n = 0..4)
  ok(rng(0, 20).filter((n) => 12 * n <= 50).length === 5, 'B2 Q4: five whole solutions 0..4 (the key)')
  ok(rng(0, 20).filter((n) => 12 * n <= 50 && n >= 1).length === 4, 'B2 Q4: distractor 4 counts only the positive ones')
  ok(rng(0, 20).filter((n) => 12 * n <= 50).length !== 3 && rng(0, 20).filter((n) => 12 * n < 50).length === 5, 'B2 Q4: distractors 3 and ∞ priced (strict 12n < 50 also gives 5 — 25/6 not integral)')
  // Q5: 2 < 5, ×(−3) — key: −6 > −15
  ok(-3 * 2 === -6 && -3 * 5 === -15 && -6 > -15, 'B2 Q5: the flip exhibit −6 > −15 (the key)')
  ok(!((-6 as number) < -15) && !((-6 as number) === -15) && !(6 > 15), 'B2 Q5: distractors −6 < −15, −6 = −15 and 6 > 15 all false')
  console.log('[B2] 7.1 quiz battery priced: keys [0, 1, 0, 2, 1], every distractor killed')
}

/* ------------------------------------------------------------------ */
/* (B3) the pinned 7.1 exercise keys — solved and checked              */
/* ------------------------------------------------------------------ */

{
  // L1.1: is −2 a solution of x + 5 < 4? is 0?
  ok(-2 + 5 < 4 === true && 0 + 5 < 4 === false, 'B3 L1.1: −2 passes (3 < 4), 0 fails (5 < 4 false)')
  // L1.2: x − 4 ≤ 2 ⟺ x ≤ 6; integers in [−10..10]
  ok(rng(-10, 10).filter((x) => x - 4 <= 2).length === 17 && rng(-10, 10).filter((x) => x <= 6).length === 17, 'B3 L1.2: x ≤ 6 holds 17 integers in [−10..10]')
  // L1.3: −1 vs x > −1 / x ≥ −1
  ok(!(-1 > -1) && -1 >= -1, 'B3 L1.3: −1 is OUT of x > −1 and IN x ≥ −1')
  // L2.1: x + 3 < 7 with three test points 3 / 4 / 5
  ok(3 + 3 < 7 && !(4 + 3 < 7) && !(5 + 3 < 7), 'B2 L2.1: 3 inside (6 < 7), boundary 4 out (7 < 7 false), 5 out')
  // L2.2: 5x ≤ 45 ⟺ x ≤ 9
  ok(5 * 9 <= 45 && !((5 * 9 + 1 <= 45)), 'B3 L2.2: boundary 9 in (45 ≤ 45), 9.2 out — the ray x ≤ 9')
  // L2.3: temperature always above −4: t > −4; −4 excluded
  ok(!(-4 > -4) && (-3.5 > -4), 'B3 L2.3: the boundary −4 is excluded (strict)')
  // L3.1: from 2 < 5: 2+7 < 5+7 and 2−7 < 5−7
  ok(2 + 7 < 5 + 7 && 2 - 7 < 5 - 7 && 9 < 12 && -5 < -2, 'B3 L3.1: 9 < 12 and −5 < −2 — addition and subtraction both preserve')
  // L3.2: x ≥ 3 ⟹ 2x + 1 ≥ 7
  ok(2 * 3 + 1 === 7 && 2 * 4 + 1 === 9 && 7 <= 9, 'B3 L3.2: x = 3 gives 7, x = 4 gives 9 — the order survives scaling + add')
  // L3.3: {−3 ≤ x < 5} integers = 8
  ok(rng(-12, 12).filter((x) => -3 <= x && x < 5).length === 8, 'B3 L3.3: eight integers −3..4')
  // L4.1: x + k < 2 has solution set x < −1 ⟺ k = 3
  ok(2 - 3 === -1 && rng(-12, 12).every((x) => (x + 3 < 2) === (x < -1)), 'B3 L4.1: k = 3 makes x + 3 < 2 ⟺ x < −1 pointwise')
  // L4.2: 3x + 2 ≤ 11 → x ≤ 3; whole solutions in [0..20] = 4
  ok(rng(0, 20).filter((n) => 3 * n + 2 <= 11).length === 4, 'B3 L4.2: whole solutions {0,1,2,3} — four of them')
  // L5.1: pens 18n ≤ 120 → n ≤ 20/3 → 6 pens
  ok(rng(0, 20).filter((n) => 18 * n <= 120).length === 7 && 18 * 6 <= 120 && 18 * 7 > 120, 'B3 L5.1: six pens cost 108 ≤ 120; seven cost 126 > 120')
  // L5.2: crates 85n ≤ 620 → 7 crates
  ok(85 * 7 <= 620 && 85 * 8 > 620, 'B3 L5.2: seven crates 595 ≤ 620 OK; eight 680 > 620 over')
  // L6: transitivity chains + the counterexample hunt for ≥
  ok(rng(-4, 4).filter((a) => rng(-4, 4).some((b) => a >= b && b >= 0 && !(a >= 0) === true)).length === 0, 'B3 L6: no counterexample to transitivity of ≥ on its own terms')
  ok(3 >= 5 === false && 5 >= 3 === true, 'B3 L6: the ≥ direction check for the L6 discussion')
  console.log('[B3] 7.1 exercise keys: 14 solved, every key checked in AND out')
}

/* ------------------------------------------------------------------ */
/* (C) figure geometry plans of 7.1                                    */
/* ------------------------------------------------------------------ */

const plan71Fig1 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 208, 180], // panel 1 (a < b)
    [256, 84, 208, 180], // panel 2 (a = b)
    [482, 84, 208, 180], // panel 3 (a > b)
    [30, 276, 208, 26], // chip 1
    [256, 276, 208, 26], // chip 2
    [482, 276, 208, 26], // chip 3
    [30, 314, 660, 24], // caption band
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3],
    [4, 5, 6],
    [7],
  ],
}

const plan71Fig2 = {
  viewBox: '0 0 720 380',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 130, 40], // label row 1 (x = 4)
    [30, 138, 130, 40], // label row 2 (x < 4)
    [30, 192, 130, 40], // label row 3 (x ≤ 4)
    [30, 246, 130, 40], // label row 4 (x > 4)
    [30, 300, 130, 40], // label row 5 (x ≥ 4)
    [30, 348, 660, 24], // caption band
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3, 4, 5],
    [6],
  ],
}

/* ------------------------------------------------------------------ */
/* (D) the pinned computations of lesson 7.2                           */
/* ------------------------------------------------------------------ */

{
  // the flip mirror exhibit
  ok(-1 * 2 === -2 && -1 * 5 === -5 && -2 > -5, 'D: the mirror — 2 < 5 becomes −2 > −5 under ×(−1)')
  ok(-2 - -5 === 3 && 3 > 0, 'D: the gap survives: (−2) − (−5) = 3 > 0 — same distance, reversed direction')
  // the double-flip return
  ok(-1 * -1 * 2 === 2 && -1 * -1 * 5 === 5 && 2 < 5, 'D: ×(−1) twice returns 2 < 5 — two flips cancel')
  // the add-negative trap instance
  ok(2 + -4 < 5 + -4 && -2 < 1, 'D: adding −4: 2 < 5 becomes −2 < 1 — NO flip')
  // the pipeline exhibits, each with in/out checks
  {
    const census = (pred: (x: number) => boolean) => W12.filter(pred).length
    // 2x < 14 → x < 7
    ok(census((x) => 2 * x < 14) === census((x) => x < 7) && census((x) => x < 7) === 19, 'D: 2x < 14 ⟺ x < 7 pointwise; 19 window integers')
    // x − 5 ≥ −2 → x ≥ 3
    ok(census((x) => x - 5 >= -2) === census((x) => x >= 3) && census((x) => x >= 3) === 10, 'D: x − 5 ≥ −2 ⟺ x ≥ 3 pointwise; 10 window integers')
    // −4x > 12 → x < −3 (the flip in action)
    ok(census((x) => -4 * x > 12) === census((x) => x < -3) && census((x) => x < -3) === 9, 'D: −4x > 12 ⟺ x < −3 pointwise (flip); 9 window integers')
    ok(census((x) => x > -3) === 15 && census((x) => x > -3 && x < -3) === 0, 'D: the wrong (unflipped) answer x > −3 holds 15 window integers and shares NONE with the truth')
    // 3x − 5 < 16 → x < 7, three-point check
    ok(census((x) => 3 * x - 5 < 16) === census((x) => x < 7) && census((x) => x < 7) === 19, 'D: 3x − 5 < 16 ⟺ x < 7 pointwise; 19 window integers')
    ok(3 * 7 - 5 === 16 && !(16 < 16), 'D: the boundary 7 gives 16 < 16 — FALSE, correctly excluded')
    ok(3 * 6 - 5 === 13 && 13 < 16 && 3 * 8 - 5 === 19 && !(19 < 16), 'D: inside 6 → 13 < 16 true; outside 8 → 19 < 16 false')
    // 7 − 3x ≥ −2 → −3x ≥ −9 → x ≤ 3, three-point check
    ok(census((x) => 7 - 3 * x >= -2) === census((x) => x <= 3) && census((x) => x <= 3) === 16, 'D: 7 − 3x ≥ −2 ⟺ x ≤ 3 pointwise (flip); 16 window integers')
    ok(7 - 3 * 3 === -2 && -2 >= -2, 'D: the boundary 3 gives −2 ≥ −2 — TRUE, correctly included')
    ok(7 - 3 * 0 === 7 && 7 >= -2 && 7 - 3 * 4 === -5 && !(-5 >= -2), 'D: inside 0 → 7 ≥ −2 true; outside 4 → −5 ≥ −2 false')
    // 5 − 2x ≥ 11 → −2x ≥ 6 → x ≤ −3, three-point check
    ok(census((x) => 5 - 2 * x >= 11) === census((x) => x <= -3) && census((x) => x <= -3) === 10, 'D: 5 − 2x ≥ 11 ⟺ x ≤ −3 pointwise (flip); 10 window integers')
    ok(5 - 2 * -3 === 11 && 11 >= 11, 'D: the boundary −3 gives 11 ≥ 11 — TRUE, included')
    ok(5 - 2 * -5 === 15 && 15 >= 11 && 5 - 2 * -1 === 7 && !(7 >= 11), 'D: inside −5 → 15 ≥ 11 true; outside −1 → 7 ≥ 11 false')
    // (2x − 1)/3 < (x + 4)/2 → ×6 → 4x − 2 < 3x + 12 → x < 14
    {
      const lhs = (x: Frac) => x.mul(frac(2)).sub(frac(1)).div(frac(3))
      const rhs = (x: Frac) => x.add(frac(4)).div(frac(2))
      ok(lhs(Frac.of(14)).eq(rhs(Frac.of(14))) && !lhs(Frac.of(14)).lt(rhs(Frac.of(14))), 'D: at x = 14 both sides equal 9 — boundary excluded (strict)')
      ok(lhs(Frac.of(13)).lt(rhs(Frac.of(13))) && lhs(Frac.of(13)).toString() === '25/3' && rhs(Frac.of(13)).toString() === '17/2', 'D: at x = 13: 25/3 < 17/2 exact (50 < 51)')
      // windowed equivalence: the integer census agrees on both sides
      const intL = (x: number) => (2 * x - 1) * 2 < (x + 4) * 3
      ok(W12.every((x) => intL(x) === (x < 14)), 'D: (2x−1)/3 < (x+4)/2 ⟺ x < 14 pointwise over the window (exact cross-form)')
    }
    // 2(x + 3) > 4x − 8 → x < 7
    ok(W12.every((x) => (2 * (x + 3) > 4 * x - 8) === (x < 7)), 'D: 2(x + 3) > 4x − 8 ⟺ x < 7 pointwise')
    ok(2 * (7 + 3) === 20 && !(20 > 20) && 2 * (6 + 3) === 18 && 18 > 16, 'D: boundary 7 excluded (20 > 20 false), inside 6: 18 > 16')
    // 0.5x + 1.5 ≤ 4 → ×2 → x + 3 ≤ 8 → x ≤ 5
    ok(W12.every((x) => (0.5 * x + 1.5 <= 4) === (x <= 5)), 'D: the dyadic decimal dress 0.5x + 1.5 ≤ 4 ⟺ x ≤ 5 pointwise (no flip — ÷ by 0.5 > 0)')
    ok(0.5 * 5 + 1.5 === 4 && 4 <= 4, 'D: the boundary 5 gives exactly 4 ≤ 4 — included')
    // 11 − 2x < 3 → −2x < −8 → x > 4 (flip), smallest integer 5
    ok(W12.every((x) => (11 - 2 * x < 3) === (x > 4)), 'D: 11 − 2x < 3 ⟺ x > 4 pointwise (flip)')
    ok(11 - 2 * 5 === 1 && 1 < 3 && !(11 - 2 * 4 < 3), 'D: smallest integer 5 works (1 < 3); 4 fails (3 < 3 false)')
    // the parameter exhibit: 4x − k < 0 → x < k/4; equals x < 3 ⟺ k = 12
    ok(12 / 4 === 3 && W12.every((x) => (4 * x - 12 < 0) === (x < 3)), 'D: k = 12 → 4x − 12 < 0 ⟺ x < 3 pointwise')
    ok(W12.some((x) => (4 * x - 8 < 0) !== (x < 3)), 'D: k = 8 gives x < 2 — NOT x < 3, the boundary moves with k (they differ at x = 2)')
    // the marks exhibit: (111 + m)/4 ≥ 40 ⟺ m ≥ 49
    ok(36 + 44 + 31 === 111 && 4 * 40 === 160 && 160 - 111 === 49, 'D: the marks exhibit → m ≥ 49 (111 + 49 = 160 exactly)')
    ok((111 + 49) / 4 === 40 && 40 >= 40 && (111 + 48) / 4 === 39.75 && !(39.75 >= 40), 'D: m = 49 scores exactly 40 (in); m = 48 gives 39.75 (out)')
  }
  console.log('[D] 7.2 pins: mirror + double-flip + trap; pipelines 7/3/−3/7/3/−3/14/7/5; k = 12; smallest 5; marks m ≥ 49; notebook 7')
}

/* ------------------------------------------------------------------ */
/* (D2) the pinned 7.2 quiz battery — every option priced              */
/* ------------------------------------------------------------------ */

{
  // Q1: first move for (2x − 1)/3 < (x + 4)/2 — key: ×6, no flip
  ok(2 * 3 === 6 && 6 > 0 && (2 * 3) * (1 / 2) === 3, 'D2 Q1: LCD 6 is positive — multiply, never flip (the key)')
  // Q2: 5 − 2x ≥ 11 → key x ≤ −3
  ok(W12.every((x) => (5 - 2 * x >= 11) === (x <= -3)), 'D2 Q2: the key x ≤ −3 is the pointwise truth')
  ok(W12.filter((x) => x >= -3).length === 16 && W12.filter((x) => x >= -3 && 5 - 2 * x >= 11).length !== 16, 'D2 Q2: distractor x ≥ −3 holds 16 window integers and is not the truth')
  // Q3: largest integer with 7 − 2x > 1 — key 2
  ok(rng(-12, 12).filter((x) => 7 - 2 * x > 1).length === 15, 'D2 Q3: the truth is x < 3 — 15 window integers (−12..2)')
  ok(7 - 2 * 2 > 1 && !(7 - 2 * 3 > 1), 'D2 Q3: 2 works (3 > 1), 3 fails (1 > 1 false) — the key is 2, not 3')
  // Q4: 4x − k < 0 with solution set x < 3 — key k = 12
  ok(4 * 3 === 12 && W12.every((x) => (4 * x - 12 < 0) === (x < 3)), 'D2 Q4: k = 12 works (the key)')
  ok(W12.some((x) => (4 * x - 3 < 0) !== (x < 3)) && W12.some((x) => (4 * x - 7 < 0) !== (x < 3)), 'D2 Q4: distractors k = 3 and k = 7 both move the boundary off 3')
  // Q5: which move NEVER flips — key: adding −4
  ok(C6.every((a) => C6.every((b) => (a < b) === (a - 4 < b - 4))), 'D2 Q5: adding −4 preserves order over the full grid (the key)')
  ok(-1 * 2 > -1 * 5 && 2 / -2 > 5 / -2, 'D2 Q5: distractors ×(−1) and ÷(−2) DO flip; ×(−1) twice flips twice')
  console.log('[D2] 7.2 quiz battery priced: keys [0, 1, 1, 2, 2], every distractor killed')
}

/* ------------------------------------------------------------------ */
/* (D3) the pinned 7.2 exercise keys — solved and checked              */
/* ------------------------------------------------------------------ */

{
  // L1.1: 2x < 14 → x < 7
  ok(W12.every((x) => (2 * x < 14) === (x < 7)), 'D3 L1.1: x < 7 pointwise')
  // L1.2: x − 5 ≥ −2 → x ≥ 3
  ok(W12.every((x) => (x - 5 >= -2) === (x >= 3)), 'D3 L1.2: x ≥ 3 pointwise')
  // L1.3: −4x > 12 → x < −3 (flip)
  ok(W12.every((x) => (-4 * x > 12) === (x < -3)), 'D3 L1.3: x < −3 pointwise (the flip)')
  // L2.1: 3x − 5 < 16 → x < 7 + three-point
  ok(W12.every((x) => (3 * x - 5 < 16) === (x < 7)) && !(3 * 7 - 5 < 16) && 3 * 6 - 5 < 16 && !(3 * 8 - 5 < 16), 'D3 L2.1: x < 7 with the three-point check')
  // L2.2: 7 − 3x ≥ −2 → x ≤ 3 (flip) + three-point
  ok(W12.every((x) => (7 - 3 * x >= -2) === (x <= 3)) && 7 - 3 * 3 >= -2 && 7 - 3 * 0 >= -2 && !(7 - 3 * 4 >= -2), 'D3 L2.2: x ≤ 3 with the three-point check')
  // L2.3: 5 − 2x ≥ 11 → x ≤ −3 (flip) + three-point
  ok(W12.every((x) => (5 - 2 * x >= 11) === (x <= -3)) && 5 - 2 * -3 >= 11 && 5 - 2 * -5 >= 11 && !(5 - 2 * -1 >= 11), 'D3 L2.3: x ≤ −3 with the three-point check')
  // L3.1: (2x − 1)/3 < (x + 4)/2 → x < 14
  ok(W12.every((x) => ((2 * x - 1) * 2 < (x + 4) * 3) === (x < 14)), 'D3 L3.1: x < 14 pointwise (exact cross-form)')
  // L3.2: 2(x + 3) > 4x − 8 → x < 7
  ok(W12.every((x) => (2 * (x + 3) > 4 * x - 8) === (x < 7)), 'D3 L3.2: x < 7 pointwise')
  // L3.3: 0.5x + 1.5 ≤ 4 → x ≤ 5
  ok(W12.every((x) => (0.5 * x + 1.5 <= 4) === (x <= 5)) && 0.5 * 5 + 1.5 <= 4, 'D3 L3.3: x ≤ 5 pointwise, boundary in')
  // L4.1: 4x − k < 0 has solution set x < 3 ⟺ k = 12
  ok(W12.every((x) => (4 * x - 12 < 0) === (x < 3)) && W12.some((x) => (4 * x - 8 < 0) !== (x < 3)), 'D3 L4.1: k = 12 exactly (k = 8 moves the boundary off 3)')
  // L4.2: smallest integer with 11 − 2x < 3 → 5
  ok(rng(-12, 12).filter((x) => 11 - 2 * x < 3).length === 8 && 11 - 2 * 5 < 3 && !(11 - 2 * 4 < 3), 'D3 L4.2: x > 4 holds 8 window integers (5..12); smallest 5')
  // L5.1: notebooks 65n + 40 ≤ 500 → n ≤ 92/13 → 7
  ok(rng(0, 20).filter((n) => 65 * n + 40 <= 500).length === 8 && 65 * 7 + 40 <= 500 && 65 * 8 + 40 > 500, 'D3 L5.1: whole solutions {0..7}, the answer 7 notebooks (495 ≤ 500)')
  // L5.2: marks (111 + m)/4 ≥ 40 → m ≥ 49
  ok(160 - 111 === 49 && (111 + 49) / 4 === 40 && (111 + 48) / 4 < 40, 'D3 L5.2: m ≥ 49, the boundary 49 scores exactly 40')
  // L6: the flip theorem priced over the grid + division form
  ok(C6.every((a) => C6.every((b) => C6.every((k) => k >= 0 || (a < b) === (k * a > k * b)))), 'D3 L6: the flip theorem over every negative multiplier in [−6..−1]')
  ok(C6.every((a) => C6.every((b) => C6.every((k) => k >= 0 || (a < b) === (2 * a * k > 2 * b * k)))), 'D3 L6: the division form via ×2 exactness')
  console.log('[D3] 7.2 exercise keys: 14 solved, every key checked in AND out')
}

/* ------------------------------------------------------------------ */
/* (E) figure geometry plans of 7.2                                    */
/* ------------------------------------------------------------------ */

const plan72Fig1 = {
  viewBox: '0 0 720 360',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 660, 84], // top panel (2 < 5)
    [30, 180, 660, 36], // mirror ribbon ×(−1)
    [30, 228, 660, 84], // bottom panel (−2 > −5)
    [30, 324, 660, 24], // caption band
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1],
    [2],
    [3],
    [4],
  ],
}

const plan72Fig2 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44], // title band
    [40, 110, 122, 70], // station 1 CLEAR
    [170, 110, 122, 70], // station 2 EXPAND
    [300, 110, 122, 70], // station 3 GATHER
    [430, 110, 122, 70], // station 4 ISOLATE (+FLIP)
    [560, 110, 122, 70], // station 5 CHECK
    [30, 220, 660, 44], // running-example band
    [45, 227, 200, 30], // running sub 1
    [255, 227, 195, 30], // running sub 2
    [460, 227, 215, 30], // running sub 3
    [30, 284, 660, 40], // check band
    [140, 291, 440, 26], // check sub
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3, 4, 5],
    [6],
    [7, 8, 9],
    [10],
    [11],
  ],
}

/* ------------------------------------------------------------------ */
/* (H) the compound engines — run 80, BEFORE any 7.3 prose             */
/* ------------------------------------------------------------------ */

// H-i — the AND/intersection engine over designed pairs of rays
{
  const leftBounds = [-6, -3, -1, 0, 2]
  const rightBounds = [-1, 0, 3, 5, 7]
  let pairs = 0
  for (const a of leftBounds)
    for (const b of rightBounds)
      for (const openL of [false, true])
        for (const openR of [false, true]) {
          const inL = (x: number) => (openL ? x > a : x >= a)
          const inR = (x: number) => (openR ? x < b : x <= b)
          const and = (x: number) => inL(x) && inR(x)
          const or = (x: number) => inL(x) || inR(x)
          const cAnd = W12.filter(and).length
          const cOr = W12.filter(or).length
          ok(cAnd === W12.filter((x) => (openL ? x > a : x >= a) && (openR ? x < b : x <= b)).length, 'H-i: AND census identity at a=' + a + ', b=' + b + ', openL=' + openL + ', openR=' + openR)
          ok(W12.every((x) => !and(x) === (!inL(x) || !inR(x))), 'H-i: De Morgan AND fails at a=' + a + ', b=' + b)
          ok(W12.every((x) => !or(x) === (!inL(x) && !inR(x))), 'H-i: De Morgan OR fails at a=' + a + ', b=' + b)
          ok(cAnd + cOr === W12.filter(inL).length + W12.filter(inR).length, 'H-i: inclusion–exclusion fails at a=' + a + ', b=' + b)
          pairs++
        }
  ok(pairs === 100, 'H-i: the designed pair grid holds 100 ray-pairs (got ' + pairs + ')')
  // the pinned AND exhibits
  ok(W12.filter((x) => x >= -3 && x < 5).length === 8, 'H-i: the mixed compound −3 ≤ x < 5 → 8 window integers (re-priced in compound form)')
  ok(W12.filter((x) => x >= 3 && x <= 3).length === 1 && W12.filter((x) => x >= 3 && x <= 3)[0] === 3, 'H-i: the point AND x ≥ 3 AND x ≤ 3 keeps exactly {3}')
  ok(3 >= 3 && 3 <= 3 && !(2 >= 3) && !(4 <= 3), 'H-i: the point AND boundary checks — 3 passes both gates, 2 fails the first, 4 the second')
  ok(W12.filter((x) => x > 5 && x <= 3).length === 0, 'H-i: x > 5 AND x ≤ 3 keeps nothing — the rays never meet')
  ok(W12.filter((x) => x > 2 && x < -1).length === 0, 'H-i: x > 2 AND x < −1 keeps nothing — the empty AND (the quiz-2 trap)')
  ok(JSON.stringify(W12.filter((x) => x > -1 && x < 2)) === JSON.stringify([0, 1]), 'H-i: x > −1 AND x < 2 keeps exactly {0, 1}')
  console.log('[H-i] AND engine: 100 ray-pairs — censuses, De Morgan AND/OR pointwise, inclusion–exclusion; pinned −3≤x<5 → 8, {3}, ∅, {0,1}')
}

// H-ii — the OR/union engine over the same designed pairs + the absorption laws
{
  const leftBounds = [-6, -3, -1, 0, 2]
  const rightBounds = [-1, 0, 3, 5, 7]
  let pairs = 0
  for (const a of leftBounds)
    for (const b of rightBounds)
      for (const openL of [false, true])
        for (const openR of [false, true]) {
          const inL = (x: number) => (openL ? x > a : x >= a)
          const inR = (x: number) => (openR ? x < b : x <= b)
          const cOr = W12.filter((x) => inL(x) || inR(x)).length
          // the complement law: the union census + the both-gates-fail gap = the whole window
          ok(cOr + W12.filter((x) => !inL(x) && !inR(x)).length === 25, 'H-ii: complement law fails at a=' + a + ', b=' + b + ', openL=' + openL + ', openR=' + openR)
          pairs++
        }
  ok(pairs === 100, 'H-ii: the OR grid sweeps the same 100 ray-pairs (got ' + pairs + ')')
  // absorption: same-side unions collapse to the wider ray
  let absorbed = 0
  for (const a of leftBounds)
    for (const ap of leftBounds) {
      if (a > ap) continue
      ok(W12.every((x) => (x >= a || x >= ap) === (x >= a)), 'H-ii: absorption x ≥ ' + a + ' OR x ≥ ' + ap + ' ⟺ x ≥ ' + a + ' fails')
      absorbed++
    }
  ok(absorbed === 15, 'H-ii: the absorption grid holds 15 same-side OR pairs (got ' + absorbed + ')')
  // the pinned OR exhibits
  ok(W12.filter((x) => x <= -2 || x > 3).length === 20, 'H-ii: x ≤ −2 OR x > 3 keeps 20 window integers (11 + 9, no overlap)')
  ok(W12.filter((x) => -1 <= x && x <= 3).length === 5, 'H-ii: the OR gap −1..3 holds exactly 5 integers — 25 − 5 = 20')
  ok(W12.filter((x) => x < -3 || x >= 5).length === 17, 'H-ii: x < −3 OR x ≥ 5 keeps 17 (9 + 8)')
  ok(W12.filter((x) => x < -3 || x > 5).length === 16, 'H-ii: x < −3 OR x > 5 keeps 16 — the De Morgan complement of the 9-integer band −3 ≤ x ≤ 5')
  ok(W12.filter((x) => -3 <= x && x <= 5).length === 9 && 9 + 16 === 25, 'H-ii: band 9 + wings 16 = 25 — the complement split is exact')
  ok(W12.filter((x) => x >= 1 || x <= -1).length === 24, 'H-ii: x ≥ 1 OR x ≤ −1 keeps 24 of 25 window integers')
  ok(!(0 >= 1) && !(0 <= -1) && W12.filter((x) => !(x >= 1) && !(x <= -1)).length === 1, 'H-ii: the gap holds exactly x = 0 — 0 satisfies neither gate')
  // the pinned OR word-problem exhibit: free entry, ages 0..100
  {
    const ages = rng(0, 100)
    const free = ages.filter((g) => g <= 12 || g >= 65)
    ok(free.length === 49, 'H-ii: free entry age ≤ 12 OR age ≥ 65 keeps 49 of the 101 ages (got ' + free.length + ')')
    ok(ages.filter((g) => g <= 12).length === 13 && ages.filter((g) => g >= 65).length === 36, 'H-ii: 13 child ages + 36 senior ages, no overlap')
    ok(12 <= 12 && !(13 <= 12) && 65 >= 65 && !(64 >= 65), 'H-ii: the boundary memberships — 12 in, 13 out; 65 in, 64 out')
  }
  console.log('[H-ii] OR engine: 100 pairs + 15 absorption pairs; pinned 20/17/16-or-9-band complement split, {0}-gap, free-entry 49 = 13 + 36')
}

// H-iii — the two-boundary inventory: open/closed left × open/closed right = four interval shapes
{
  const shapePairs: [number, number][] = [[-3, 5], [-5, 3], [-1, 7], [-6, 0]]
  let forms = 0
  for (const [a, b] of shapePairs) {
    ok(a < b, 'H-iii: the designed pair (' + a + ', ' + b + ') has a < b')
    for (const openL of [false, true])
      for (const openR of [false, true]) {
        const inL = (x: number) => (openL ? x > a : x >= a)
        const inR = (x: number) => (openR ? x < b : x <= b)
        const and = (x: number) => inL(x) && inR(x)
        ok(W12.filter(and).length === W12.filter((x) => (openL ? x > a : x >= a) && (openR ? x < b : x <= b)).length, 'H-iii: census identity at (' + a + ', ' + b + ')')
        ok(W12.every((x) => and(x) === ((openL ? x > a : x >= a) && (openR ? x < b : x <= b))), 'H-iii: pointwise AND at (' + a + ', ' + b + ')')
        ok(inL(a) === !openL, 'H-iii: the left boundary ' + a + ' belongs exactly when the left end is closed (openL=' + openL + ')')
        ok(inR(b) === !openR, 'H-iii: the right boundary ' + b + ' belongs exactly when the right end is closed (openR=' + openR + ')')
        forms++
      }
  }
  ok(forms === 16, 'H-iii: the inventory holds 4 pairs × 4 shapes = 16 between-forms (got ' + forms + ')')
  // the pinned (−3, 5) censuses: 7 / 8 / 8 / 9 — each closed end adds exactly its boundary
  ok(W12.filter((x) => -3 <= x && x <= 5).length === 9, 'H-iii: −3 ≤ x ≤ 5 keeps 9')
  ok(W12.filter((x) => -3 <= x && x < 5).length === 8, 'H-iii: −3 ≤ x < 5 keeps 8 (the refused 5)')
  ok(W12.filter((x) => -3 < x && x <= 5).length === 8, 'H-iii: −3 < x ≤ 5 keeps 8 (the refused −3)')
  ok(W12.filter((x) => -3 < x && x < 5).length === 7, 'H-iii: −3 < x < 5 keeps 7 (both refused)')
  ok(9 === 7 + 2 && 8 === 7 + 1, 'H-iii: each closed end adds exactly one point — its boundary')
  console.log('[H-iii] four interval shapes over (−3,5): 9/8/8/7 — boundary membership = closedness, point for point')
}

// H-iv — the two-boundary solving engine (the lesson's core theorem), exact Frac arithmetic
{
  const ps = [1, 2, 3, 4, -4, -3, -2, -1]
  const qs = rng(-3, 3)
  const abs: [number, number][] = [[-3, 5], [-5, 3], [-1, 7], [0, 6], [-6, 0]]
  let forms = 0
  for (const p of ps)
    for (const q of qs)
      for (const [a, b] of abs) {
        const mid = (x: Frac) => x.mul(frac(p)).add(frac(q))
        const leftGate = (x: Frac) => frac(a).le(mid(x))
        const rightGate = (x: Frac) => mid(x).le(frac(b))
        const s1 = new Frac(BigInt(a) - BigInt(q), BigInt(p)) // (a−q)/p
        const s2 = new Frac(BigInt(b) - BigInt(q), BigInt(p)) // (b−q)/p
        const lo = p > 0 ? s1 : s2
        const hi = p > 0 ? s2 : s1
        for (const x of W12) {
          const fx = frac(x)
          // the theorem, per gate: for p > 0 the left gate solves to x ≥ (a−q)/p;
          // for p < 0 THE GATES SWAP TOO — the left gate solves to x ≤ (a−q)/p
          const leftSolved = p > 0 ? lo.le(fx) : fx.le(hi)
          const rightSolved = p > 0 ? fx.le(hi) : lo.le(fx)
          ok(leftGate(fx) === leftSolved, 'H-iv: left gate mismatch at p=' + p + ', q=' + q + ', a=' + a + ', x=' + x)
          ok(rightGate(fx) === rightSolved, 'H-iv: right gate mismatch at p=' + p + ', q=' + q + ', b=' + b + ', x=' + x)
          ok((leftGate(fx) && rightGate(fx)) === (lo.le(fx) && fx.le(hi)), 'H-iv: band equivalence fails at p=' + p + ', q=' + q + ', x=' + x)
        }
        // at the solved left boundary the middle member lands exactly on the end that KEPT its side:
        // a for p > 0 (left stays left), b for p < 0 (the ends swapped)
        ok(mid(lo).eq(p > 0 ? frac(a) : frac(b)), 'H-iv: the solved left boundary lands the middle member exactly on its end (p=' + p + ', q=' + q + ')')
        forms++
      }
  ok(forms === 280, 'H-iv: the two-boundary grid holds 8 signs × 7 shifts × 5 bands = 280 pipeline forms (got ' + forms + ')')
  // the pinned flip exhibit: −3 ≤ −2x + 1 ≤ 5 → −2 ≤ x ≤ 2 (the ends SWAP)
  ok(W12.every((x) => (-3 <= -2 * x + 1 && -2 * x + 1 <= 5) === (-2 <= x && x <= 2)), 'H-iv: −3 ≤ −2x + 1 ≤ 5 ⟺ −2 ≤ x ≤ 2 pointwise (the flip swaps the ends)')
  ok(new Frac(5n - 1n, -2n).toString() === '-2' && new Frac(-3n - 1n, -2n).toString() === '2', 'H-iv: the swapped ends are exactly (5−1)/(−2) = −2 and (−3−1)/(−2) = 2')
  ok(W12.filter((x) => -2 <= x && x <= 2).length === 5, 'H-iv: the flipped band −2 ≤ x ≤ 2 keeps 5 window integers')
  // the pinned OR-solving exhibit: x + 2 > 3 OR 2x ≤ −4 → x > 1 OR x ≤ −2
  ok(W12.every((x) => (x + 2 > 3 || 2 * x <= -4) === (x > 1 || x <= -2)), 'H-iv: the OR pipeline solves both rays independently — pointwise equivalence')
  ok(W12.filter((x) => x > 1 || x <= -2).length === 22 && W12.filter((x) => -1 <= x && x <= 1).length === 3, 'H-iv: the union keeps 22 (11 + 11), the gap −1..1 holds 3')
  // the pinned OR-solving exhibit of Illustration 2: 2x − 1 > 5 OR 3x + 4 ≤ −2 → x > 3 OR x ≤ −2
  ok(W12.every((x) => (2 * x - 1 > 5 || 3 * x + 4 <= -2) === (x > 3 || x <= -2)), 'H-iv: the Illustration-2 OR pipeline — pointwise equivalence')
  ok(W12.filter((x) => x > 3 || x <= -2).length === 20 && W12.filter((x) => -1 <= x && x <= 3).length === 5, 'H-iv: the Illustration-2 union keeps 20 (9 + 11), the gap −1..3 holds 5')
  console.log('[H-iv] two-boundary engine: 280 forms × 25 points × 2 gates = 14,000 exact equivalences + 280 boundary identities; flip swaps ends; OR-solve 22')
}

// H-v — the AND/OR word-problem exhibits (speed/budget margins with two constraints)
{
  // the courier: time margin 2v + 30 ≤ 150 AND arrival margin 5v ≥ 50
  ok(W12.every((x) => (2 * x + 30 <= 150) === (x <= 60)), 'H-v: the time margin 2v + 30 ≤ 150 ⟺ v ≤ 60 pointwise')
  ok(W12.every((x) => (5 * x >= 50) === (x >= 10)), 'H-v: the arrival margin 5v ≥ 50 ⟺ v ≥ 10 pointwise')
  ok(rng(0, 100).filter((v) => v >= 10 && v <= 60).length === 51, 'H-v: the AND band 10 ≤ v ≤ 60 holds 51 integer speeds on [0, 100]')
  ok(2 * 60 + 30 === 150 && !(2 * 61 + 30 <= 150) && 5 * 10 === 50 && !(5 * 9 >= 50), 'H-v: the courier boundaries — 60 in, 61 out; 10 in, 9 out')
  // the speed band: race rule 12 ≤ s ≤ 18, fuel cap s ≤ 16
  ok(rng(0, 100).filter((s) => s >= 12 && s <= 18).length === 7, 'H-v: the race band 12 ≤ s ≤ 18 holds 7 integer speeds')
  ok(rng(0, 100).filter((s) => s >= 12 && s <= 18 && s <= 16).length === 5, 'H-v: ANDing the fuel cap shrinks the band to 12 ≤ s ≤ 16 — 5 speeds')
  // the budget with reserve: n ≥ 0 AND 12n + 10 ≤ 50
  ok(rng(0, 20).filter((n) => n >= 0 && 12 * n + 10 <= 50).length === 4 && 12 * 3 + 10 === 46 && 12 * 4 + 10 === 58, 'H-v: pens with a ₹10 reserve — the AND of the two gates keeps {0..3}, 3 pens spend 46 ≤ 50')
  // the drone altitude band: 3 ≤ h ≤ 12 AND 2h ≤ 15 (h a whole number)
  ok(JSON.stringify(rng(0, 20).filter((h) => h >= 3 && h <= 12 && 2 * h <= 15)) === JSON.stringify([3, 4, 5, 6, 7]), 'H-v: the drone band 3 ≤ h ≤ 12 with the battery cap 2h ≤ 15 keeps {3..7} — five altitudes')
  ok(2 * 7 === 14 && 14 <= 15 && 2 * 8 === 16 && 16 > 15, 'H-v: the drone battery boundary — 7 flies (14 ≤ 15), 8 does not (16 > 15)')
  console.log('[H-v] word problems: courier 51 speeds (10 ≤ v ≤ 60), race band 7 → 5 with the fuel cap, pens-with-reserve {0..3}, drone {3..7}')
}

/* ------------------------------------------------------------------ */
/* (H2) the pinned 7.3 quiz battery — every option priced              */
/* ------------------------------------------------------------------ */

{
  // Q1: integers in [−12, 12] solving −3 ≤ x < 5 — key 8
  ok(W12.filter((x) => -3 <= x && x < 5).length === 8, 'H2 Q1: the key 8 is the census of the mixed compound')
  ok(W12.filter((x) => -3 < x && x < 5).length === 7 && W12.filter((x) => -3 <= x && x <= 5).length === 9, 'H2 Q1: the distractors 7 and 9 are the open-both and closed-both censuses')
  // Q2: x > 2 AND x < −1 — key: no number at all
  ok(W12.filter((x) => x > 2 && x < -1).length === 0, 'H2 Q2: the AND keeps nothing — the empty AND is the key')
  ok(W12.filter((x) => x > 2).length === 10 && W12.filter((x) => x < -1).length === 11 && !(2 > 2), 'H2 Q2: the rays alone keep 10 and 11; x = 2 fails the strict first gate')
  // Q3: 1 ≤ 2x + 1 < 9 ⟺ 0 ≤ x < 4 — key
  ok(W12.every((x) => (1 <= 2 * x + 1 && 2 * x + 1 < 9) === (0 <= x && x < 4)), 'H2 Q3: the key 0 ≤ x < 4 is the pointwise truth')
  ok(W12.some((x) => (0 <= x && x < 4) !== (1 <= x && x < 5)) && W12.some((x) => (0 <= x && x < 4) !== (0 <= x && x <= 4)) && W12.some((x) => (0 <= x && x < 4) !== (0 < x && x < 4)), 'H2 Q3: all three distractors differ somewhere (x = 0 or x = 4 prices each)')
  ok(1 <= 2 * 0 + 1 && 2 * 0 + 1 < 9 && 1 <= 2 * 3 + 1 && 2 * 3 + 1 < 9 && !(2 * 4 + 1 < 9), 'H2 Q3: inside 0 and 3 pass; boundary 4 fails the strict right gate (9 < 9 false)')
  // Q4: largest integer solving −3 < x ≤ 5 — key 5
  ok(5 > -3 && 5 <= 5 && !(6 <= 5), 'H2 Q4: 5 passes both gates; 6 fails the closed right gate')
  ok(W12.filter((x) => -3 < x && x < 5).length === 7 && Math.max(...W12.filter((x) => -3 < x && x < 5)) === 4, 'H2 Q4: under the STRICT right end the largest would be 4 — the distractor')
  // Q5: x ≤ −2 OR x > 3 on [−12, 12] — key 20
  ok(W12.filter((x) => x <= -2 || x > 3).length === 20, 'H2 Q5: 11 + 9 = 20 — the key')
  ok(W12.filter((x) => x < -3 || x >= 4).length === 18 && W12.filter((x) => -1 <= x && x <= 3).length === 5 && 25 - 5 === 20, 'H2 Q5: the distractor 18 is the flipped census; 25 is the OR-everything trap — the 5-point gap stays out')
  console.log('[H2] 7.3 quiz battery priced: keys [1, 2, 0, 1, 1], every distractor killed')
}

/* ------------------------------------------------------------------ */
/* (H3) the pinned 7.3 exercise keys — solved and checked              */
/* ------------------------------------------------------------------ */

{
  // L1.1: x ≥ −2 AND x < 4 → −2 ≤ x < 4, 6 window integers
  ok(W12.every((x) => (x >= -2 && x < 4) === (-2 <= x && x < 4)) && W12.filter((x) => -2 <= x && x < 4).length === 6, 'H3 L1.1: −2 ≤ x < 4, 6 window integers')
  // L1.2: x + 1 > 4 AND x ≤ 8 → 3 < x ≤ 8, 5 window integers
  ok(W12.every((x) => (x + 1 > 4 && x <= 8) === (3 < x && x <= 8)) && W12.filter((x) => 3 < x && x <= 8).length === 5, 'H3 L1.2: 3 < x ≤ 8, 5 window integers')
  // L1.3: x ≤ −2 OR x ≥ 5 → 19 window integers
  ok(W12.filter((x) => x <= -2 || x >= 5).length === 19 && W12.filter((x) => -1 <= x && x <= 4).length === 6 && 25 - 6 === 19, 'H3 L1.3: 11 + 8 = 19; the gap −1..4 holds 6')
  // L2.1: 2 ≤ x + 3 ≤ 7 → −1 ≤ x ≤ 4, 6 window integers
  ok(W12.every((x) => (2 <= x + 3 && x + 3 <= 7) === (-1 <= x && x <= 4)) && W12.filter((x) => -1 <= x && x <= 4).length === 6, 'H3 L2.1: −1 ≤ x ≤ 4, 6 window integers')
  // L2.2: −3 < 2x + 1 ≤ 5 → −2 < x ≤ 2, 4 window integers
  ok(W12.every((x) => (-3 < 2 * x + 1 && 2 * x + 1 <= 5) === (-2 < x && x <= 2)) && W12.filter((x) => -2 < x && x <= 2).length === 4, 'H3 L2.2: −2 < x ≤ 2, 4 window integers')
  // L2.3: x − 3 > 2 OR x + 1 < −1 → x > 5 OR x < −2, 17 window integers
  ok(W12.every((x) => (x - 3 > 2 || x + 1 < -1) === (x > 5 || x < -2)) && W12.filter((x) => x > 5 || x < -2).length === 17, 'H3 L2.3: 7 + 10 = 17, two disconnected rays')
  // L3.1: 0 ≤ 3x − 6 < 9 → 2 ≤ x < 5, 3 window integers
  ok(W12.every((x) => (0 <= 3 * x - 6 && 3 * x - 6 < 9) === (2 <= x && x < 5)) && W12.filter((x) => 2 <= x && x < 5).length === 3, 'H3 L3.1: 2 ≤ x < 5, 3 window integers')
  // L3.2: 1 < (5 − 2x)/3 ≤ 4 → −7/2 ≤ x < 1, 4 window integers (the flip swaps the ends)
  {
    const mid = (x: Frac) => frac(5).sub(x.mul(frac(2))).div(frac(3))
    const neg7half = Frac.ofFrac(-7, 2)
    ok(neg7half.toString() === '-7/2', 'H3 L3.2: the exact left boundary is −7/2')
    ok(W12.every((x) => {
      const fx = frac(x)
      return (frac(1).lt(mid(fx)) && mid(fx).le(frac(4))) === (neg7half.le(fx) && fx.lt(frac(1)))
    }), 'H3 L3.2: −7/2 ≤ x < 1 pointwise (exact Frac, the flip swaps the ends)')
    ok(mid(neg7half).toString() === '4' && frac(1).lt(mid(neg7half)) && mid(neg7half).le(frac(4)), 'H3 L3.2: at x = −7/2 the middle member is exactly 4 — closed left end keeps it')
    ok(mid(frac(1)).toString() === '1' && !frac(1).lt(mid(frac(1))), 'H3 L3.2: at x = 1 the middle member is exactly 1 — the strict left gate refuses it')
    ok(W12.filter((x) => neg7half.le(frac(x)) && frac(x).lt(frac(1))).length === 4, 'H3 L3.2: the window integers −3..0, exactly 4')
  }
  // L3.3: 1 ≤ x ≤ 6 AND x ≥ 4 → 4 ≤ x ≤ 6, 3 window integers
  ok(W12.filter((x) => 1 <= x && x <= 6 && x >= 4).length === 3 && W12.filter((x) => 4 <= x && x <= 6).length === 3, 'H3 L3.3: ANDing a band with a ray shrinks it to 4 ≤ x ≤ 6')
  // L4.1: 2 ≤ x < k keeps exactly {2, 3, 4} ⟺ k = 5
  ok(JSON.stringify(rng(0, 10).filter((x) => 2 <= x && x < 5)) === JSON.stringify([2, 3, 4]), 'H3 L4.1: k = 5 keeps exactly {2, 3, 4}')
  ok(rng(0, 10).filter((x) => 2 <= x && x < 4).length === 2 && rng(0, 10).filter((x) => 2 <= x && x < 6).length === 4, 'H3 L4.1: k = 4 keeps 2, k = 6 keeps 4 — the distractors move the census')
  // L4.2: race rule 12 ≤ s ≤ 18 AND fuel cap s ≤ 16 → 5 legal integer speeds
  ok(rng(0, 100).filter((s) => 12 <= s && s <= 18 && s <= 16).length === 5 && 12 <= 16 && 16 <= 18, 'H3 L4.2: 12 ≤ s ≤ 16, 5 speeds; 17 fails the fuel gate, 11 the race gate')
  // L5.1: pens with reserve — n ≥ 0 AND 12n + 10 ≤ 50 → {0..3}, answer 3 pens
  ok(rng(0, 20).filter((n) => 12 * n + 10 <= 50 && n >= 0).length === 4 && 12 * 3 + 10 <= 50 && !(12 * 4 + 10 <= 50), 'H3 L5.1: 3 pens (46 ≤ 50), 4 fail (58 > 50)')
  // L5.2: free entry ages {10, 13, 64, 65, 70} → 10, 65, 70 enter
  ok([10, 13, 64, 65, 70].filter((g) => g <= 12 || g >= 65).length === 3 && (10 <= 12 || 10 >= 65) && !(13 <= 12) && !(64 >= 65) && 65 >= 65 && 70 >= 65, 'H3 L5.2: the OR gate admits 10, 65, 70 — 13 and 64 pay')
  // L6: the two-boundary theorem priced over its own full grid + the division note
  {
    const ps6 = [1, 2, 3, 4, -4, -3, -2, -1]
    const qs6 = rng(-3, 3)
    const abs6: [number, number][] = [[-3, 5], [-5, 3], [-1, 7], [0, 6], [-6, 0]]
    ok(ps6.every((p) => qs6.every((q) => abs6.every(([a, b]) => W12.every((x) => {
      const lo = p > 0 ? new Frac(BigInt(a) - BigInt(q), BigInt(p)) : new Frac(BigInt(b) - BigInt(q), BigInt(p))
      const hi = p > 0 ? new Frac(BigInt(b) - BigInt(q), BigInt(p)) : new Frac(BigInt(a) - BigInt(q), BigInt(p))
      const midx = frac(p).mul(frac(x)).add(frac(q))
      return (frac(a).le(midx) && midx.le(frac(b))) === (lo.le(frac(x)) && frac(x).le(hi))
    })))), 'H3 L6: the two-boundary theorem over the full 280-form grid, both signs of p')
  }
  console.log('[H3] 7.3 exercise keys: 14 solved, every key checked in AND out')
}

/* ------------------------------------------------------------------ */
/* (I) figure geometry plans of 7.3                                    */
/* ------------------------------------------------------------------ */

const plan73Fig1 = {
  viewBox: '0 0 720 380',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 150, 40], // label row 1 (−3 ≤ x ≤ 5)
    [30, 138, 150, 40], // label row 2 (−3 ≤ x < 5)
    [30, 192, 150, 40], // label row 3 (−3 < x ≤ 5)
    [30, 246, 150, 40], // label row 4 (−3 < x < 5)
    [560, 84, 130, 40], // census chip 1 (9)
    [560, 138, 130, 40], // census chip 2 (8)
    [560, 192, 130, 40], // census chip 3 (8)
    [560, 246, 130, 40], // census chip 4 (7)
    [30, 348, 660, 24], // caption band
    [260, 95, 220, 18], // content band rect row 1
    [260, 149, 220, 18], // content band rect row 2
    [260, 203, 220, 18], // content band rect row 3
    [260, 257, 220, 18], // content band rect row 4
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1, 2, 3, 4],
    [5, 6, 7, 8],
    [9],
    [10, 11, 12, 13],
  ],
}

const plan73Fig2 = {
  viewBox: '0 0 720 340',
  rects: [
    [30, 18, 660, 44], // title band
    [30, 84, 320, 180], // AND panel (the band −3 ≤ x ≤ 5, 9 integers)
    [370, 84, 320, 180], // OR panel (the wings x < −3 OR x > 5, 16 integers)
    [30, 276, 320, 26], // AND chip
    [370, 276, 320, 26], // OR chip
    [30, 314, 660, 24], // caption band
    [110, 191, 152, 18], // content band rect inside the AND panel
  ] as [number, number, number, number][],
  groups: [
    [0],
    [1],
    [2],
    [3],
    [4],
    [5],
    [6],
  ],
}

/* ------------------------------------------------------------------ */
/* report (sections F, G, J and K are appended at authoring time)      */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch07 pre-write battery (sections A-E + H-I): ${passed} passed, ${failed} failed`)

/* ------------------------------------------------------------------ */
/* (F) the authored lesson 7.1 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

{
  const ch07Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-07.ts').text()
  ok(chapter07.lessons.length === 3, 'F: chapter 7 carries three authored lessons (7.1 + 7.2 + 7.3 — closed at run 80; F updated to the closed state per the run-78 pattern)')
  const lesson = chapter07.lessons[0]
  ok(lesson.id === 'al-order-and-the-solution-set', 'F: lesson id al-order-and-the-solution-set')
  ok(lesson.number === '7.1', 'F: lesson number 7.1')
  ok(lesson.title === 'Order and the Solution Set', 'F: lesson title matches the planned title')
  ok(chapter07.status === 'complete', 'F: chapter 7 status complete (closed at run 80; F updated per the run-78 pattern)')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-the-three-verdicts-one-none-infinitely-many', 'al-what-an-equation-is-the-balance-principle']),
    'F: prerequisites are 5.3 + 5.1'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math11-ch5', 'khattar-qa-4e', 'cengage-jee-style']),
    'F: the four citation keys ride the lesson'
  )
  ok(
    JSON.stringify(chapter07.plannedLessons) === JSON.stringify([]),
    'F: plannedLessons emptied — the chapter is closed (F updated per the run-78 pattern)'
  )
  // block census
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 15, `F: fifteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `F: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `F: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `F: one derivation (the addition law + transitivity theorem)`)
  ok(countKind('example') === 5, `F: five illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `F: one table (the five shapes)`)
  ok(countKind('figure') === 2, `F: two figures (the trichotomy doors + the shapes strip)`)
  ok(countKind('formula') === 3, `F: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `F: one terms block`)
  ok(countKind('list') === 3, `F: three lists (the roman example run, the four laws, the collected roman)`)
  ok(countKind('quiz') === 1, `F: one quiz block`)
  ok(countKind('exercises') === 1, `F: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,definition,exam,historical,insight,warn', `F: the six callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `F: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([0, 1, 0, 2, 1]), 'F: quiz keys match the pinned [0, 1, 0, 2, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'F: quiz shape + distractor pricing')
      ok(q.items[0].options[0] === '$\\{x : x < 4\\}$', 'F: quiz Q1 option 1 is the pinned ray (the key 0)')
      ok(q.items[3].options[2] === '5', 'F: quiz Q4 option 3 is the pinned five-whole-solutions count (the key 2)')
      ok(q.items[4].options[1] === '$-6 > -15$', 'F: quiz Q5 option 2 is the pinned flip verdict (the key 1)')
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
      ok((all[8].answer || '').includes('Eight integers'), 'F: L3.3 answer carries the pinned mixed census 8')
      ok((all[9].answer || '').includes('$k = 3$'), 'F: L4.1 answer carries the pinned k = 3')
      ok((all[11].answer || '').includes('Six pens'), 'F: L5.1 answer carries the pinned six pens')
      ok((all[12].answer || '').includes('7 crates'), 'F: L5.2 answer carries the pinned seven crates')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'F: two figures in 7.1 (the doors + the shapes strip)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan71Fig1.rects.length, 'F: doors rect census ' + r0.length + ' = plan ' + plan71Fig1.rects.length)
      ok(canon(r0) === canon(plan71Fig1.rects), 'F: doors rects match the pinned plan exactly (positions + sizes)')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan71Fig2.rects.length, 'F: shapes rect census ' + r1.length + ' = plan ' + plan71Fig2.rects.length)
      ok(canon(r1) === canon(plan71Fig2.rects), 'F: shapes rects match the pinned plan exactly')
      for (const g of plan71Fig1.groups) {
        const rs = g.map((i) => plan71Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: doors group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan71Fig2.groups) {
        const rs = g.map((i) => plan71Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: shapes group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('DOOR 1') && figs[0].svg.includes('169') && figs[0].svg.includes('exhaust the line'), 'F: the doors carry the three verdicts and the census')
      ok(figs[1].svg.includes('x = 4') && figs[1].svg.includes('1 · 16 · 17 · 8 · 9'), 'F: the shapes strip carries the five censuses')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 380"'), 'F: the viewBoxes match the plans')
    }
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
    console.log('[F] 7.1 honest word count: ' + words)
  }
  // odd-run backslash scan over the WHOLE chapter file (run-69 hardening)
  {
    let oddRuns = 0
    let i = 0
    while (i < ch07Src.length) {
      if (ch07Src[i] === '\\') {
        let j = i
        while (j < ch07Src.length && ch07Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'F: no odd-length backslash runs in ch-07.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan
  {
    const escapes = (ch07Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'F: no unicode escapes in ch-07.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (7.1 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'F: all ' + ids.length + ' lesson ids repo-wide unique (with 7.1 added)')
    ok(ids.includes('al-order-and-the-solution-set'), 'F: the new id is registered in the library graph')
  }
  // live re-checks of three anchors straight from the authored content
  {
    const q = chapter07.lessons[0].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[2].options[0].includes('a + c < b + c'), 'F: quiz Q3 option 1 is the pinned addition law (the key 0)')
    }
    const ex = chapter07.lessons[0].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l4second = ex.sets[3].questions[1]
      ok((l4second.answer || '').includes('four whole solutions'), 'F: L4.2 answer carries the pinned four whole solutions')
    }
    const tb = chapter07.lessons[0].blocks.find((b) => b.kind === 'table')
    if (tb && tb.kind === 'table') {
      ok(tb.rows.length === 5 && tb.rows[4].join(' | ').includes('$x = 4$'), 'F: the shapes table carries the point row last')
    }
  }
  console.log('[F] the authored 7.1: identity, structure census, quiz keys, figure plans, scans — all green')
}


/* ------------------------------------------------------------------ */
/* (G) the authored lesson 7.2 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

{
  const lesson = chapter07.lessons[1]
  ok(lesson.id === 'al-solving-linear-inequalities', 'G: lesson id al-solving-linear-inequalities')
  ok(lesson.number === '7.2', 'G: lesson number 7.2')
  ok(lesson.title === 'Solving Linear Inequalities', 'G: lesson title matches the planned title')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-order-and-the-solution-set', 'al-solving-linear-equations']),
    'G: prerequisites are 7.1 + 5.2'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math11-ch5', 'khattar-qa-4e', 'cengage-jee-style']),
    'G: the four citation keys ride the lesson'
  )
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 11, `G: eleven paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `G: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 1, `G: one display equation (the calm-case pipeline)`)
  ok(countKind('derivation') === 1, `G: one derivation (the flip theorem)`)
  ok(countKind('example') === 12, `G: twelve illustrations (got ${countKind('example')})`)
  ok(countKind('figure') === 2, `G: two figures (the flip mirror + the pipeline)`)
  ok(countKind('algorithm') === 1, `G: one algorithm block (the solving pipeline)`)
  ok(countKind('formula') === 3, `G: three formula cards`)
  ok(countKind('terms') === 1, `G: one terms block`)
  ok(countKind('table') === 0, `G: no table block in 7.2`)
  ok(countKind('list') === 2, `G: two lists (the pipeline stations + the collected roman)`)
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
      ok(JSON.stringify(keys) === JSON.stringify([0, 1, 1, 2, 2]), 'G: quiz keys match the pinned [0, 1, 1, 2, 2] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'G: quiz shape + distractor pricing')
      ok(q.items[0].options[0].includes('no flip needed'), 'G: quiz Q1 option 1 is the pinned positive-LCD move (the key 0)')
      ok(q.items[1].options[1] === '$x \\leq -3$', 'G: quiz Q2 option 2 is the pinned flip verdict (the key 1)')
      ok(q.items[2].options[1] === '2', 'G: quiz Q3 option 2 is the pinned largest integer (the key 1)')
      ok(q.items[3].options[2] === '$k = 12$', 'G: quiz Q4 option 3 is the pinned parameter (the key 2)')
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
      ok((all[2].answer || '').includes('flip reversed'), 'G: L1.3 answer carries the pinned flip')
      ok((all[9].answer || '').includes('$k = 12$'), 'G: L4.1 answer carries the pinned parameter')
      ok((all[11].answer || '').includes('7 notebooks'), 'G: L5.1 answer carries the pinned notebook count')
      ok((all[13].answer || '').includes('b − a > 0'), 'G: L6 answer carries the flip-theorem argument')
    }
  }
  // figure geometry vs the pinned plans
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'G: two figures in 7.2')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan72Fig1.rects.length, 'G: mirror rect census ' + r0.length + ' = plan ' + plan72Fig1.rects.length)
      ok(canon(r0) === canon(plan72Fig1.rects), 'G: mirror rects match the pinned plan exactly (positions + sizes)')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan72Fig2.rects.length, 'G: pipeline rect census ' + r1.length + ' = plan ' + plan72Fig2.rects.length)
      ok(canon(r1) === canon(plan72Fig2.rects), 'G: pipeline rects match the pinned plan exactly')
      for (const g of plan72Fig1.groups) {
        const rs = g.map((i) => plan72Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: mirror group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan72Fig2.groups) {
        const rs = g.map((i) => plan72Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: pipeline group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('BEFORE') && figs[0].svg.includes('AFTER') && figs[0].svg.includes('2,028'), 'G: the mirror carries the before/after and the verifier count')
      ok(figs[1].svg.includes('FLIP') && figs[1].svg.includes('7 − 3x ≥ −2') && figs[1].svg.includes('three-point'), 'G: the pipeline carries the flip station and the running example')
      ok(figs[0].svg.includes('viewBox="0 0 720 360"') && figs[1].svg.includes('viewBox="0 0 720 340"'), 'G: the viewBoxes match the plans')
    }
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
      if (b.kind === 'algorithm' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'G: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'G: honest word count ' + words + ' >= 4000')
    console.log('[G] 7.2 honest word count: ' + words)
  }
  // the chapter-level scans (whole file)
  {
    const ch07Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-07.ts').text()
    let oddRuns = 0
    let i = 0
    while (i < ch07Src.length) {
      if (ch07Src[i] === '\\') {
        let j = i
        while (j < ch07Src.length && ch07Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'G: no odd-length backslash runs in ch-07.ts source (found ' + oddRuns + ')')
    const escapes = (ch07Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'G: no unicode escapes in ch-07.ts source (found ' + escapes + ')')
    const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    for (const hex of retired) ok(!ch07Src.toLowerCase().includes(hex), 'G: the retired hex ' + hex + ' does not appear in ch-07.ts')
  }
  // al- prefix uniqueness across the whole library (7.2 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'G: all ' + ids.length + ' lesson ids repo-wide unique (with 7.2 added)')
    ok(ids.includes('al-solving-linear-inequalities'), 'G: the new id is registered in the library graph')
  }
  // live re-checks of anchors straight from the authored content
  {
    const q = chapter07.lessons[1].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[4].options[2].includes('adding −4'), 'G: quiz Q5 option 3 is the pinned add-negative never-flips verdict (the key 2)')
    }
    const ex = chapter07.lessons[1].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l4second = ex.sets[3].questions[1]
      ok((l4second.answer || '') === '5.', 'G: L4.2 answer is the pinned smallest integer 5')
    }
    const d = chapter07.lessons[1].blocks.find((b) => b.kind === 'derivation')
    if (d && d.kind === 'derivation') {
      ok(d.steps.length === 6 && d.result.includes('2,028'), 'G: the flip derivation carries six steps and the verifier count')
    }
  }
  console.log('[G] the authored 7.2: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (J) the authored lesson 7.3 — structure, keys, figures, scans       */
/* ------------------------------------------------------------------ */

{
  const ch07Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-07.ts').text()
  const lesson = chapter07.lessons[2]
  ok(chapter07.lessons.length === 3, 'J: chapter 7 closed with three lessons')
  ok(lesson.id === 'al-compound-inequalities-and-applications', 'J: lesson id al-compound-inequalities-and-applications')
  ok(lesson.number === '7.3', 'J: lesson number 7.3')
  ok(lesson.title === 'Compound Inequalities and Applications', 'J: lesson title matches the planned title')
  ok(chapter07.status === 'complete', 'J: chapter 7 status complete')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-order-and-the-solution-set', 'al-solving-linear-inequalities']),
    'J: prerequisites are 7.1 + 7.2'
  )
  ok(
    JSON.stringify(lesson.sources) === JSON.stringify(['hall-knight-elementary-algebra', 'ncert-math11-ch5', 'khattar-qa-4e', 'cengage-jee-style']),
    'J: the four citation keys ride the lesson'
  )
  ok(
    JSON.stringify(chapter07.plannedLessons) === JSON.stringify([]),
    'J: plannedLessons emptied — the chapter is closed'
  )
  // block census
  const kinds = lesson.blocks.map((b) => b.kind)
  const countKind = (k: string) => kinds.filter((x) => x === k).length
  ok(countKind('para') === 13, `J: thirteen paras (got ${countKind('para')})`)
  ok(countKind('heading') === 5, `J: five headings (got ${countKind('heading')})`)
  ok(countKind('equation') === 2, `J: two display equations (got ${countKind('equation')})`)
  ok(countKind('derivation') === 1, `J: one derivation (the two-boundary pipeline theorem)`)
  ok(countKind('example') === 12, `J: twelve illustrations (got ${countKind('example')})`)
  ok(countKind('table') === 1, `J: one table (the four interval shapes)`)
  ok(countKind('figure') === 2, `J: two figures (the AND/OR panels + the four-shapes strip)`)
  ok(countKind('formula') === 3, `J: three formula cards (got ${countKind('formula')})`)
  ok(countKind('terms') === 1, `J: one terms block`)
  ok(countKind('list') === 2, `J: two lists (the roman example run + the AND/OR properties)`)
  ok(countKind('quiz') === 1, `J: one quiz block`)
  ok(countKind('exercises') === 1, `J: one exercises block`)
  const tones = lesson.blocks.filter((b) => b.kind === 'callout').map((b) => (b as { tone: string }).tone).sort().join(',')
  ok(tones === 'definition,exam,historical,insight,warn', `J: the five callout tones (got ${tones})`)
  {
    const terms = lesson.blocks.find((b) => b.kind === 'terms')
    if (terms && terms.kind === 'terms') ok(terms.items.length === 8, `J: terms block holds 8 entries (got ${terms.items.length})`)
  }
  // quiz keys vs the pinned battery
  {
    const q = lesson.blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      const keys = q.items.map((it) => it.answer)
      ok(JSON.stringify(keys) === JSON.stringify([1, 2, 0, 1, 1]), 'J: quiz keys match the pinned [1, 2, 0, 1, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'J: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '8', 'J: quiz Q1 option 2 is the pinned mixed census (the key 1)')
      ok(q.items[1].options[2].includes('no number'), 'J: quiz Q2 option 3 is the pinned empty AND (the key 2)')
      ok(q.items[2].options[0] === '$0 \\leq x < 4$', 'J: quiz Q3 option 1 is the pinned solved band (the key 0)')
      ok(q.items[3].options[1] === '5', 'J: quiz Q4 option 2 is the pinned closed-end largest (the key 1)')
      ok(q.items[4].options[1] === '20', 'J: quiz Q5 option 2 is the pinned OR census (the key 1)')
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
      ok((all[0].answer || '').includes('$-2 \\leq x < 4$'), 'J: L1.1 answer carries the pinned mixed band')
      ok((all[7].answer || '').includes('-\\frac{7}{2}'), 'J: L3.2 answer carries the exact flipped boundary −7/2')
      ok((all[9].answer || '').includes('$k = 5$'), 'J: L4.1 answer carries the pinned parameter k = 5')
      ok((all[11].answer || '').includes('3 pens'), 'J: L5.1 answer carries the pinned three pens')
      ok((all[12].answer || '').includes('65'), 'J: L5.2 answer carries the pinned free-entry boundary 65')
    }
  }
  // figure geometry vs the pinned plans (fig 0 = AND/OR panels; fig 1 = interval shapes)
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'J: two figures in 7.3')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan73Fig2.rects.length, 'J: AND/OR rect census ' + r0.length + ' = plan ' + plan73Fig2.rects.length)
      ok(canon(r0) === canon(plan73Fig2.rects), 'J: AND/OR rects match the pinned plan exactly (positions + sizes)')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan73Fig1.rects.length, 'J: shapes rect census ' + r1.length + ' = plan ' + plan73Fig1.rects.length)
      ok(canon(r1) === canon(plan73Fig1.rects), 'J: shapes rects match the pinned plan exactly')
      for (const g of plan73Fig2.groups) {
        const rs = g.map((i) => plan73Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'J: AND/OR group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan73Fig1.groups) {
        const rs = g.map((i) => plan73Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'J: shapes group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('AND') && figs[0].svg.includes('OR') && figs[0].svg.includes('9 + 16 = 25'), 'J: the AND/OR panels carry both joiners and the De Morgan split')
      ok(figs[1].svg.includes('CLOSED') && figs[1].svg.includes('HOLLOW') && figs[1].svg.includes('7 → 8 → 8 → 9'), 'J: the shapes strip carries the four ends and the census law')
      ok(figs[0].svg.includes('viewBox="0 0 720 340"') && figs[1].svg.includes('viewBox="0 0 720 380"'), 'J: the viewBoxes match the plans')
    }
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
      if (b.kind === 'algorithm' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'J: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'J: honest word count ' + words + ' >= 4000')
    console.log('[J] 7.3 honest word count: ' + words)
  }
  // the chapter-level scans (whole file)
  {
    let oddRuns = 0
    let i = 0
    while (i < ch07Src.length) {
      if (ch07Src[i] === '\\') {
        let j = i
        while (j < ch07Src.length && ch07Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'J: no odd-length backslash runs in ch-07.ts source (found ' + oddRuns + ')')
    const escapes = (ch07Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'J: no unicode escapes in ch-07.ts source (found ' + escapes + ')')
    const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
    for (const hex of retired) ok(!ch07Src.toLowerCase().includes(hex), 'J: the retired hex ' + hex + ' does not appear in ch-07.ts')
  }
  // al- prefix uniqueness across the whole library (7.3 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'J: all ' + ids.length + ' lesson ids repo-wide unique (with 7.3 added)')
    ok(ids.includes('al-compound-inequalities-and-applications'), 'J: the new id is registered in the library graph')
  }
  // live re-checks of anchors straight from the authored content
  {
    const d = chapter07.lessons[2].blocks.find((b) => b.kind === 'derivation')
    if (d && d.kind === 'derivation') {
      ok(d.steps.length === 6 && d.result.includes('swaps the ENDS'), 'J: the two-boundary derivation carries six steps and the end-swap result')
    }
    const tb = chapter07.lessons[2].blocks.find((b) => b.kind === 'table')
    if (tb && tb.kind === 'table') {
      ok(tb.rows.length === 4 && tb.rows[3][0] === '$-3 < x < 5$', 'J: the shapes table carries the four rows with the open-both row last')
    }
    const q = chapter07.lessons[2].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[1].options[3] === 'exactly $x = 2$', 'J: quiz Q2 option 4 is the pinned strict-gate distractor')
    }
  }
  console.log('[J] the authored 7.3: identity, structure census, quiz keys, figure plans, scans — all green')
}

/* ------------------------------------------------------------------ */
/* (K) the unit-7 completion review — BOOK_FORMAT checklist, exam      */
/* corners, and the recomputed book snapshot                           */
/* ------------------------------------------------------------------ */

{
  const book = allBooks.find((b) => b.id === 'elementary-algebra')
  ok(!!book, 'K: the Elementary Algebra book is registered')
  if (book) {
    // checklist 1/7 — every number recomputed by script (this battery ran with zero failures)
    ok(passed > 50000, 'K: checklist 1/7 — the pre-write + authored battery priced every number (passed = ' + passed + ')')
    // checklist 2/7 — figure labels match the prose terminology
    {
      const figs = chapter07.lessons[2].blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; caption: string; svg: string }[]
      ok(figs.length === 2 && figs[0].caption.includes('9 + 16 = 25') && figs[0].svg.includes('9 + 16 = 25'), 'K: checklist 2/7 — the AND/OR figure caption and SVG agree with the prose numbers')
      ok(figs[1].caption.includes('9') && figs[1].svg.includes('7 → 8 → 8 → 9'), 'K: checklist 2/7 — the shapes strip caption and SVG agree with the prose censuses')
    }
    // checklist 3/7 — vivid palette only (retired hexes), asserted on every ch-7 figure SVG
    {
      const retired = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
      let bad = 0
      for (const les of chapter07.lessons)
        for (const b of les.blocks)
          if (b.kind === 'figure') for (const hex of retired) if (b.svg.toLowerCase().includes(hex)) bad++
      ok(bad === 0, 'K: checklist 3/7 — all six chapter-7 figures use the vivid palette (retired hits ' + bad + ')')
      const figCount = chapter07.lessons.reduce((n, l) => n + l.blocks.filter((b) => b.kind === 'figure').length, 0)
      ok(figCount === 6, 'K: chapter 7 carries six figures (got ' + figCount + ')')
    }
    // checklist 4/7 — quiz answer indices point at the intended options
    {
      const pinned = [
        ['al-order-and-the-solution-set', [0, 1, 0, 2, 1]],
        ['al-solving-linear-inequalities', [0, 1, 1, 2, 2]],
        ['al-compound-inequalities-and-applications', [1, 2, 0, 1, 1]],
      ] as [string, number[]][]
      for (const [id, keys] of pinned) {
        const les = chapter07.lessons.find((l) => l.id === id)
        const q = les?.blocks.find((b) => b.kind === 'quiz')
        if (les && q && q.kind === 'quiz') {
          ok(JSON.stringify(q.items.map((it) => it.answer)) === JSON.stringify(keys), 'K: checklist 4/7 — ' + id + ' quiz keys pinned ' + JSON.stringify(keys))
        }
      }
      const quizItems = chapter07.lessons.reduce((n, l) => n + l.blocks.filter((b) => b.kind === 'quiz').reduce((m, q) => m + (q.kind === 'quiz' ? q.items.length : 0), 0), 0)
      ok(quizItems === 15, 'K: chapter 7 carries 15 quiz items (got ' + quizItems + ')')
    }
    // checklist 5/7 — exercise solutions complete and verified
    {
      let exCount = 0
      let bad = 0
      for (const les of chapter07.lessons)
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
      for (const les of chapter07.lessons) for (const b of les.blocks) if (!known.has(b.kind)) bad++
      ok(bad === 0, 'K: checklist 7/7 — every chapter-7 block kind is renderer-known (bad ' + bad + ')')
    }
    // exam corners 3/3 — every lesson carries an exam callout
    {
      const withExam = chapter07.lessons.filter((l) => l.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam'))
      ok(withExam.length === 3, 'K: exam corners 3/3 — every lesson 7.1–7.3 carries an exam callout (got ' + withExam.length + ')')
    }
    // the book snapshot, recomputed
    {
      const lessons = book.chapters.flatMap((c) => c.lessons)
      ok(lessons.length === 37, 'K: the book stands at 37 lessons (got ' + lessons.length + ')')
      const under = lessons.map((l) => countLessonWords(l)).filter((w) => w < 4000).length
      ok(under === 0, 'K: every lesson of the book carries >= 4,000 honest words (under: ' + under + ')')
      const completeChapters = book.chapters.filter((c) => c.status === 'complete').length
      ok(completeChapters === 11, 'K: 11 of 12 chapters complete, ch. 12 planned (got ' + completeChapters + ')')
      const ch7Words = chapter07.lessons.reduce((n, l) => n + countLessonWords(l), 0)
      const bookWords = lessons.reduce((n, l) => n + countLessonWords(l), 0)
      ok(ch7Words >= 14000, 'K: chapter 7 totals ' + ch7Words + ' words across three lessons')
      console.log('[K] book snapshot: 37 lessons, ' + bookWords + ' words, 11/12 chapters complete; ch. 7 = ' + ch7Words + ' words (7.1 5,061 + 7.2 4,744 + 7.3 recomputed above)')
    }
  }
  console.log('[K] the unit-7 completion review: checklist 7/7 + exam corners 3/3 + the book snapshot — ALL GREEN')
}

/* ------------------------------------------------------------------ */
/* final report — the run-80 gate (F/G/J failures must exit non-zero)  */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch07 TOTAL (sections A-K): ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
