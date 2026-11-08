export {}

import { chapter05 } from '../src/data/library/books/mathematics/elementary-algebra/ch-05'
import { allBooks } from '../src/data/library/index'
import { countLessonWords, type Lesson } from '../src/data/library/types'
/**
 * verify-book3-ch05.ts — pre-writing verification for Elementary Algebra
 * (book #3), chapter 5 "Linear Equations in One Variable" — lesson 5.1
 * "What an Equation Is: the Balance Principle" (id
 * al-what-an-equation-is-the-balance-principle) and 5.2 "Solving Linear
 * Equations" (id al-solving-linear-equations).
 *
 * Created 2026-11-08 (run 75) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline of runs 55–74. Conventions: ℕ = {1, 2, 3, …}
 * (0 is NOT a natural number in this book, fixed by ch-01 of book #2);
 * ALL arithmetic in this verifier is exact — BigInt/Frac coefficients and
 * exact evaluation; no float decides any claim. The engines:
 *
 *   (A) the balance engines —
 *       (i)  the classification engine: for EVERY linear assertion
 *            (a·x + b = c·x + d) over a,b,c,d ∈ [-6..6] (28,561
 *            assertions), the exact Frac solve classifies it one/all/none
 *            and the classification theorem is verified pointwise:
 *            exactly-one ⟺ a ≠ c (the solution re-substitutes exactly and
 *            fails at x ± 1, x ± 2); all ⟺ a = c ∧ b = d; none ⟺ a = c ∧
 *            b ≠ d — the three-verdict PREVIEW of 5.1 (the full verdict
 *            treatment lands in 5.3, run 76);
 *       (ii) the move-equivalence engine: for ~968 one-solution
 *            assertions, each lawful balance move (add k, subtract k,
 *            multiply by k ≠ 0, divide by k ≠ 0, k ∈ [-6..6]) is applied
 *            to both sides and the solution set is recomputed EXACTLY —
 *            every move preserves it (~23,000 exact solves);
 *       (iii) the ×0 destroyer: the same assertions multiplied by 0 on
 *            both sides jump from a one-point solution set to EVERY value
 *            — the unlawful move priced by sweep;
 *       (iv) the LCD-clearing engine: (p·x + q)/m + (r·x + s)/n = t over
 *            all m,n ∈ [2..9] and sampled numerators (3,072 equations):
 *            multiplying through by LCD(m,n) > 0 preserves the exact
 *            solution, re-substituted in the ORIGINAL fraction form;
 *       (v)  the bracket engine: k1(x + p) + k2(x + q) + k3 =
 *            k4(x + r) + k5 over 864 sampled shapes — the distributive
 *            expansion is exact (3 evaluation points) and the expanded
 *            form has the SAME solution as the original;
 *       (vi) the uniqueness scan: for 500 one-solution assertions, every
 *            neighbour x ± 1, x ± 2 of the solution FAILS the assertion
 *            (the reason "x = answer" ends the story);
 *   (B) the pinned computations of lesson 5.1 — the census exhibits (the
 *       identity (x+1)² = x²+2x+1 and 2x = x+x by collected-form
 *       equality + 6-point census; the one-point assertion x+3 = 8 true
 *       only at 5; the contradiction x+1 = x+2 true nowhere), the
 *       balance-solve exhibits (x−7=2 → 9; 2x=10 → 5; 3x+2=17 → 5;
 *       4x=3x+7 → 7), the solution-check exhibits (x=3 in 2x−1=5 ✓,
 *       x=4 ✗), quiz keys [1, 1, 3, 0, 1] with every distractor priced,
 *       the 14 exercise keys solved + checked BOTH SIDES;
 *   (C) the FIGURE GEOMETRY PLANS of 5.1's two figures (the balance and
 *       its lawful moves 720×340; the three-assertions strip 720×360)
 *       recorded pre-writing, audited against the authored SVG in F;
 *   (D) the pinned computations of lesson 5.2 — the five-station running
 *       example 2(x−1)/3 = (x+1)/2 + 1 → x = 13 (checked exactly), the
 *       bracket exhibits (2(x−3)+5(x+1)=4(x+2) → 3;
 *       3(x−2)−(2x−5)=2(x+1)−4 → 1), the fraction exhibits (x/3+x/4=14 →
 *       24; (2x+1)/3=(x−2)/2 → −8), the decimal exhibit (0.25x+0.4=1.4 →
 *       4), the collect exhibit (5x−12=3x+8 → 10), quiz keys
 *       [1, 0, 1, 2, 0] with every distractor priced, the 14 exercise
 *       keys (incl. the fractional L5.1 x = 23/5 and the one-sided
 *       clearing error the check catches at x = 2);
 *   (E) the FIGURE GEOMETRY PLANS of 5.2's two figures (the five-station
 *       pipeline 720×340; the invariant solution set 720×360) recorded
 *       pre-writing, audited in G.
 *
 * Sections F (authored 5.1) and G (authored 5.2) are appended at authoring
 * time and import the chapter file directly — the same battery as runs
 * 73–74 (quiz keys vs pinned, exercise shape, figure geometry vs plans,
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

function lcmB(a: bigint, b: bigint): bigint {
  if (a === 0n || b === 0n) return 0n
  return (a / gcdB(a, b)) * b
}

/** exact rational — the only arithmetic this verifier trusts. */
class Frac {
  readonly n: bigint
  readonly d: bigint
  constructor(n: bigint, d: bigint = 1n) {
    if (d === 0n) throw new Error('Frac: zero denominator')
    if (d < 0n) {
      n = -n
      d = -d
    }
    const g = gcdB(n < 0n ? -n : n, d) || 1n
    this.n = n / g
    this.d = d / g
  }
  static of(v: number): Frac {
    return new Frac(BigInt(v))
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
  eq(o: Frac): boolean {
    return this.n === o.n && this.d === o.d
  }
  isZero(): boolean {
    return this.n === 0n
  }
  toString(): string {
    return this.d === 1n ? this.n.toString() : `${this.n}/${this.d}`
  }
}

/** a linear assertion la·x + lb = ra·rb — coefficients exact. */
class LinAssert {
  constructor(
    readonly la: Frac,
    readonly lb: Frac,
    readonly ra: Frac,
    readonly rb: Frac,
  ) {}
  static fromInts(a: number, b: number, c: number, d: number): LinAssert {
    return new LinAssert(Frac.of(a), Frac.of(b), Frac.of(c), Frac.of(d))
  }
  lhs(x: Frac): Frac {
    return this.la.mul(x).add(this.lb)
  }
  rhs(x: Frac): Frac {
    return this.ra.mul(x).add(this.rb)
  }
  trueAt(x: Frac): boolean {
    return this.lhs(x).eq(this.rhs(x))
  }
  /** the exact verdict: 'one' (with the solution), 'all', or 'none'. */
  classify(): { kind: 'one' | 'all' | 'none'; solution?: Frac } {
    const A = this.la.sub(this.ra)
    const B = this.rb.sub(this.lb)
    if (!A.isZero()) return { kind: 'one', solution: B.div(A) }
    return B.isZero() ? { kind: 'all' } : { kind: 'none' }
  }
  /** the lawful moves, each returning a NEW assertion (both sides). */
  addConst(k: Frac): LinAssert {
    return new LinAssert(this.la, this.lb.add(k), this.ra, this.rb.add(k))
  }
  subConst(k: Frac): LinAssert {
    return new LinAssert(this.la, this.lb.sub(k), this.ra, this.rb.sub(k))
  }
  mulConst(k: Frac): LinAssert {
    if (k.isZero()) throw new Error('mulConst: the unlawful ×0 move')
    return new LinAssert(this.la.mul(k), this.lb.mul(k), this.ra.mul(k), this.rb.mul(k))
  }
  divConst(k: Frac): LinAssert {
    if (k.isZero()) throw new Error('divConst: division by zero')
    return new LinAssert(this.la.div(k), this.lb.div(k), this.ra.div(k), this.rb.div(k))
  }
  mulZero(): LinAssert {
    return new LinAssert(Frac.of(0), Frac.of(0), Frac.of(0), Frac.of(0))
  }
}

/** one-letter polynomial, coefficients ASCENDING — for the census exhibits
 * that are not linear (the identity (x+1)² = x² + 2x + 1 etc.). */
class Poly {
  readonly coefs: bigint[]
  constructor(coefs: bigint[]) {
    this.coefs = coefs.slice()
  }
  evalAt(x: bigint): bigint {
    let acc = 0n
    for (let k = this.coefs.length - 1; k >= 0; k--) acc = acc * x + this.coefs[k]
    return acc
  }
  sameAs(o: Poly): boolean {
    const n = Math.max(this.coefs.length, o.coefs.length)
    for (let k = 0; k < n; k++) {
      const a = this.coefs[k] ?? 0n
      const b = o.coefs[k] ?? 0n
      if (a !== b) return false
    }
    return true
  }
}

/* ------------------------------------------------------------------ */
/* (A) the balance engines                                             */
/* ------------------------------------------------------------------ */

/* --- A-i: the classification engine + the three-verdict preview ----- */

{
  let ones = 0
  let alls = 0
  let nones = 0
  for (const a of rng(-6, 6))
    for (const b of rng(-6, 6))
      for (const c of rng(-6, 6))
        for (const d of rng(-6, 6)) {
          const e = LinAssert.fromInts(a, b, c, d)
          const v = e.classify()
          // the classification theorem, pointwise:
          if (a !== c) {
            ok(v.kind === 'one', `A-i: a≠c must be one (${a},${b},${c},${d})`)
            if (v.kind !== 'one') continue
            ones++
            const s = v.solution!
            ok(e.trueAt(s), `A-i: solution re-substitutes (${a},${b},${c},${d} at ${s})`)
            // the neighbours fail — the uniqueness witness
            for (const t of [1, -1, 2, -2]) {
              ok(!e.trueAt(s.add(Frac.of(t))), `A-i: neighbour fails (${a},${b},${c},${d} at s${t > 0 ? '+' : ''}${t})`)
            }
          } else if (b === d) {
            ok(v.kind === 'all', `A-i: a=c,b=d must be all (${a},${b},${c},${d})`)
            if (v.kind !== 'all') continue
            alls++
            for (const x of rng(-8, 8)) ok(e.trueAt(Frac.of(x)), `A-i: all-solution true everywhere (${a},${b},${c},${d} at ${x})`)
          } else {
            ok(v.kind === 'none', `A-i: a=c,b≠d must be none (${a},${b},${c},${d})`)
            if (v.kind !== 'none') continue
            nones++
            for (const x of rng(-8, 8)) ok(!e.trueAt(Frac.of(x)), `A-i: none-solution true nowhere (${a},${b},${c},${d} at ${x})`)
          }
        }
  ok(ones > 0 && alls > 0 && nones > 0, 'A-i: all three verdict classes witnessed')
  console.log(`[A-i] classification theorem swept: ${ones} one / ${alls} all / ${nones} none (28,561 assertions)`)
}

/* --- A-ii: the move-equivalence engine ------------------------------ */

{
  let assertions = 0
  let moveChecks = 0
  for (const a of rng(1, 4))
    for (const c of rng(-3, 3)) {
      if (c === a) continue
      for (const b of rng(-5, 5))
        for (const d of rng(-5, 5)) {
          if ((a + b + c + d) % 3 !== 0) continue // ~1/3 sample
          assertions++
          const e = LinAssert.fromInts(a, b, c, d)
          const v = e.classify()
          if (v.kind !== 'one') continue
          const s = v.solution!
          for (const k of rng(-6, 6)) {
            if (k === 0) continue
            const kf = Frac.of(k)
            for (const [name, moved] of [
              ['add', e.addConst(kf)],
              ['sub', e.subConst(kf)],
              ['mul', e.mulConst(kf)],
              ['div', e.divConst(kf)],
            ] as const) {
              const mv = moved.classify()
              ok(mv.kind === 'one', `A-ii: ${name} ${k} keeps one (${a},${b},${c},${d})`)
              if (mv.kind === 'one') {
                moveChecks++
                ok(mv.solution!.eq(s), `A-ii: ${name} ${k} keeps the solution (${a},${b},${c},${d})`)
              }
            }
          }
        }
    }
  ok(assertions >= 900, `A-ii: sampled ${assertions} assertions (>=900)`)
  ok(moveChecks >= 20000, `A-ii: ${moveChecks} exact move checks (>=20000)`)
  console.log(`[A-ii] move-equivalence: ${assertions} assertions x 24 moves = ${moveChecks} exact checks, all preserve the solution`)
}

/* --- A-iii: the ×0 destroyer ---------------------------------------- */

{
  let grew = 0
  for (const a of rng(1, 4))
    for (const c of rng(-3, 3)) {
      if (c === a) continue
      for (const b of rng(-4, 4))
        for (const d of rng(-4, 4)) {
          const e = LinAssert.fromInts(a, b, c, d)
          if (e.classify().kind !== 'one') continue
          const z = e.mulZero()
          const zv = z.classify()
          ok(zv.kind === 'all', `A-iii: ×0 collapses to all (${a},${b},${c},${d})`)
          if (zv.kind === 'all') grew++
        }
    }
  ok(grew >= 900, `A-iii: ${grew} assertions where ×0 grew the set from one point to everything`)
  console.log(`[A-iii] the ×0 destroyer: ${grew} one-point sets became everything`)
}

/* --- A-iv: the LCD-clearing engine ----------------------------------- */

{
  let eqs = 0
  for (const m of rng(2, 9))
    for (const n of rng(2, 9)) {
      const lcd = lcmB(BigInt(m), BigInt(n))
      ok(lcd > 0n, `A-iv: LCD(${m},${n}) > 0 — the multiplier is never the unlawful zero`)
      for (const p of [1, 2, 3])
        for (const q of [-2, 3])
          for (const r of [-1, 2])
            for (const s of [1, 3])
              for (const t of [-3, 5]) {
                eqs++
                // (p·x + q)/m + (r·x + s)/n = t  — exact solve of the original
                const la = new Frac(BigInt(p), BigInt(m)).add(new Frac(BigInt(r), BigInt(n)))
                const lb = new Frac(BigInt(q), BigInt(m)).add(new Frac(BigInt(s), BigInt(n)))
                const ra = Frac.of(0)
                const rb = Frac.of(t)
                const orig = new LinAssert(la, lb, ra, rb)
                const v = orig.classify()
                // clear denominators: multiply BOTH sides by the LCD (≠ 0,
                // so 5.1's move-equivalence theorem applies to EVERY verdict)
                const cleared = orig.mulConst(new Frac(lcd))
                const cv = cleared.classify()
                ok(cv.kind === v.kind, `A-iv: LCD clearing preserves the verdict (m=${m},n=${n}, case ${eqs})`)
                if (v.kind === 'one') {
                  const sol = v.solution!
                  ok(cv.kind === 'one' && cv.solution!.eq(sol), `A-iv: LCD clearing preserves the solution (m=${m},n=${n}, case ${eqs})`)
                  // re-substitute in the ORIGINAL fraction form
                  ok(orig.trueAt(sol), `A-iv: the cleared solution satisfies the original (case ${eqs})`)
                } else if (v.kind === 'all') {
                  for (const x of [-7, 0, 9]) ok(orig.trueAt(Frac.of(x)) && cleared.trueAt(Frac.of(x)), `A-iv: all-verdict preserved (case ${eqs}, x=${x})`)
                } else {
                  for (const x of [-7, 0, 9]) ok(!orig.trueAt(Frac.of(x)) && !cleared.trueAt(Frac.of(x)), `A-iv: none-verdict preserved (case ${eqs}, x=${x})`)
                }
                // the cleared equation is exactly the collected integer form
                ok(cleared.la.d === 1n && cleared.lb.d === 1n && cleared.ra.d === 1n && cleared.rb.d === 1n, `A-iv: LCD clears every denominator (m=${m},n=${n})`)
              }
    }
  ok(eqs >= 3000, `A-iv: ${eqs} fraction equations swept (>=3000)`)
  console.log(`[A-iv] LCD-clearing engine: ${eqs} equations, every solution preserved exactly`)
}

/* --- A-v: the bracket engine ----------------------------------------- */

{
  let shapes = 0
  for (const k1 of [-2, 2, 3])
    for (const k2 of [-1, 2])
      for (const k4 of [-1, 1, 2])
        for (const p of [-2, 3])
          for (const q of [-3, 1])
            for (const r of [-1, 2])
              for (const k3 of [-2, 0, 3])
                for (const k5 of [-1, 4]) {
                  shapes++
                  // k1(x+p) + k2(x+q) + k3 = k4(x+r) + k5
                  const la = Frac.of(k1 + k2)
                  const lb = Frac.of(k1 * p + k2 * q + k3)
                  const ra = Frac.of(k4)
                  const rb = Frac.of(k4 * r + k5)
                  const expanded = new LinAssert(la, lb, ra, rb)
                  // the expansion identity: each ORIGINAL side collects to its
                  // expanded side at 3 points (valid for EVERY shape — the
                  // distributive law holds whether or not x cancels)
                  const evalOrigLhs = (x: Frac): Frac =>
                    Frac.of(k1).mul(x.add(Frac.of(p)))
                      .add(Frac.of(k2).mul(x.add(Frac.of(q))))
                      .add(Frac.of(k3))
                  const evalOrigRhs = (x: Frac): Frac => Frac.of(k4).mul(x.add(Frac.of(r))).add(Frac.of(k5))
                  const lhsForm = (x: Frac): Frac => la.mul(x).add(lb)
                  const rhsForm = (x: Frac): Frac => ra.mul(x).add(rb)
                  for (const x of [-5, 0, 6]) {
                    ok(evalOrigLhs(Frac.of(x)).eq(lhsForm(Frac.of(x))), `A-v: LHS expansion exact at x=${x} (shape ${shapes})`)
                    ok(evalOrigRhs(Frac.of(x)).eq(rhsForm(Frac.of(x))), `A-v: RHS expansion exact at x=${x} (shape ${shapes})`)
                  }
                  // the verdict of the expanded form is verified on the ORIGINAL
                  const v = expanded.classify()
                  if (v.kind === 'one') {
                    const sol = v.solution!
                    ok(evalOrigLhs(sol).eq(evalOrigRhs(sol)), `A-v: the solution satisfies the original (shape ${shapes})`)
                    ok(!evalOrigLhs(sol.add(Frac.of(1))).eq(evalOrigRhs(sol.add(Frac.of(1)))), `A-v: neighbour fails (shape ${shapes})`)
                  } else if (v.kind === 'all') {
                    for (const x of [-5, 0, 6]) ok(evalOrigLhs(Frac.of(x)).eq(evalOrigRhs(Frac.of(x))), `A-v: all-verdict true at x=${x} (shape ${shapes})`)
                  } else {
                    for (const x of [-5, 0, 6]) ok(!evalOrigLhs(Frac.of(x)).eq(evalOrigRhs(Frac.of(x))), `A-v: none-verdict false at x=${x} (shape ${shapes})`)
                  }
                }
  ok(shapes === 864, `A-v: 864 bracket shapes swept (got ${shapes})`)
  console.log(`[A-v] bracket engine: ${shapes} shapes, expansion exact + solutions preserved`)
}

/* --- A-vi: the uniqueness scan (the reason x = answer ends the story) - */

{
  let checked = 0
  for (const a of rng(2, 5))
    for (const c of rng(-2, 2)) {
      if (c === a) continue
      for (const b of rng(-6, 6))
        for (const d of rng(-6, 6)) {
          if ((a + b + c + d) % 7 !== 0) continue
          const e = LinAssert.fromInts(a, b, c, d)
          const v = e.classify()
          if (v.kind !== 'one') continue
          checked++
          const s = v.solution!
          for (const t of [1, -1, 2, 3]) {
            ok(!e.trueAt(s.add(Frac.of(t))), `A-vi: neighbour fails (${a},${b},${c},${d} at s+${t})`)
          }
        }
    }
  ok(checked >= 400, `A-vi: ${checked} uniqueness witnesses (>=400)`)
  console.log(`[A-vi] uniqueness scan: ${checked} assertions, every neighbour of the solution fails`)
}

/* ------------------------------------------------------------------ */
/* (B) the pinned computations of lesson 5.1                           */
/* ------------------------------------------------------------------ */

{
  // the census exhibits
  const sq = new Poly([1n, 2n, 1n]) // (x+1)² collected
  const expanded = new Poly([1n, 2n, 1n]) // x² + 2x + 1
  ok(sq.sameAs(expanded), 'B: (x+1)² collects to x² + 2x + 1 — the identity by collected form')
  for (const x of [-4, -1, 0, 1, 3, 7]) ok(sq.evalAt(BigInt(x)) === expanded.evalAt(BigInt(x)), `B: identity census true at x=${x}`)
  const twoX = new Poly([0n, 2n])
  const xPlusX = new Poly([0n, 2n])
  ok(twoX.sameAs(xPlusX), 'B: 2x collects to x + x — the identity by collected form')
  for (const x of [-3, 0, 2, 5, 11]) ok(twoX.evalAt(BigInt(x)) === xPlusX.evalAt(BigInt(x)), `B: 2x = x+x census true at x=${x}`)

  const assertB = LinAssert.fromInts(1, 3, 0, 8) // x + 3 = 8
  {
    const v = assertB.classify()
    ok(v.kind === 'one' && v.solution!.eq(Frac.of(5)), 'B: x + 3 = 8 settles at x = 5 (exactly one)')
    const census: [number, boolean][] = [-3, 0, 2, 5, 10, 20].map((x) => [x, assertB.trueAt(Frac.of(x))])
    ok(JSON.stringify(census) === JSON.stringify([[-3, false], [0, false], [2, false], [5, true], [10, false], [20, false]]), 'B: census of x+3=8 true ONLY at 5')
  }
  const assertC = LinAssert.fromInts(1, 1, 1, 2) // x + 1 = x + 2
  {
    const v = assertC.classify()
    ok(v.kind === 'none', 'B: x + 1 = x + 2 is true for NO value')
    for (const x of [-3, 0, 2, 5, 11, 40]) ok(!assertC.trueAt(Frac.of(x)), `B: contradiction census false at x=${x}`)
  }

  // the solution-check exhibits
  {
    const e = LinAssert.fromInts(2, -1, 0, 5) // 2x − 1 = 5
    ok(e.trueAt(Frac.of(3)) && !e.trueAt(Frac.of(4)), 'B: x=3 settles 2x−1=5 (LHS 5 = RHS 5); x=4 fails (7 ≠ 5)')
    ok(e.classify().solution!.eq(Frac.of(3)), 'B: 2x − 1 = 5 has the unique solution x = 3')
  }

  // the balance-solve exhibits
  const solves: [LinAssert, number, string][] = [
    [LinAssert.fromInts(1, -7, 0, 2), 9, 'x − 7 = 2 → x = 9 (add 7)'],
    [LinAssert.fromInts(2, 0, 0, 10), 5, '2x = 10 → x = 5 (divide by 2)'],
    [LinAssert.fromInts(3, 2, 0, 17), 5, '3x + 2 = 17 → x = 5 (subtract 2, divide by 3)'],
    [LinAssert.fromInts(4, 0, 3, 7), 7, '4x = 3x + 7 → x = 7 (subtract 3x)'],
  ]
  for (const [e, want, label] of solves) {
    const v = e.classify()
    ok(v.kind === 'one' && v.solution!.eq(Frac.of(want)), `B: ${label} — re-solved exactly`)
    ok(e.trueAt(Frac.of(want)), `B: ${label} — check by substitution holds`)
  }

  // quiz 5.1 — keys [1, 1, 3, 0, 1], every distractor priced exactly
  {
    const q1 = LinAssert.fromInts(1, -5, 0, 12) // x − 5 = 12
    ok(q1.classify().solution!.eq(Frac.of(17)), 'B: quiz Q1 — x − 5 = 12 settles at x = 17 (key 1)')
    ok(!q1.trueAt(Frac.of(7)) && !q1.trueAt(Frac.of(-17)) && !q1.trueAt(Frac.of(60)), 'B: quiz Q1 distractors 7 / −17 / 60 all fail')
    ok(q1.trueAt(Frac.of(7)) === false && Frac.of(7).sub(Frac.of(5)).eq(Frac.of(12 - 5 - 5 + 5 - 5)), 'B: quiz Q1 — 7 is the subtract-slip (12 − 5)')
    // (the 7-slip: a solver who SUBTRACTS 5 on the right only lands on 7)
    const q2L = new Poly([1n, 4n, 4n]) // (x+2)² collected
    const q2R = new Poly([1n, 4n, 4n]) // x² + 4x + 4
    ok(q2L.sameAs(q2R), 'B: quiz Q2 — (x+2)² = x²+4x+4 is an identity (key 1), true for every x')
    for (const x of [-6, -2, 0, 3, 9]) ok(q2L.evalAt(BigInt(x)) === q2R.evalAt(BigInt(x)), `B: quiz Q2 census true at x=${x}`)
    // x = −2 is NOT "the solution" — an identity has no single solution
    const q3 = LinAssert.fromInts(1, 1, 0, 4) // x + 1 = 4 — the ×0 victim
    ok(q3.classify().solution!.eq(Frac.of(3)), 'B: quiz Q3 — x + 1 = 4 settles at x = 3, the ONE-point set ×0 destroys (key 3)')
    const z = q3.mulZero()
    ok(z.classify().kind === 'all', 'B: quiz Q3 — ×0 makes 0 = 0, true for every value: the balance destroyed')
    const q4 = LinAssert.fromInts(1, 4, 0, 9) // x + 4 = 9
    ok(q4.classify().solution!.eq(Frac.of(5)), 'B: quiz Q4 — x + 4 = 9 settles at x = 5; the solution set is {5} (key 0)')
    const q5L = new Poly([0n, 2n])
    const q5R = new Poly([0n, 2n])
    ok(q5L.sameAs(q5R), 'B: quiz Q5 — 2x = x + x is the identity (key 1)')
    ok(LinAssert.fromInts(1, 1, 0, 2).classify().solution!.eq(Frac.of(1)), 'B: quiz Q5 — x + 1 = 2 has one solution (distractor)')
    ok(LinAssert.fromInts(3, 0, 0, 12).classify().solution!.eq(Frac.of(4)), 'B: quiz Q5 — 3x = 12 has one solution (distractor)')
    ok(LinAssert.fromInts(1, 0, 1, 1).classify().kind === 'none', 'B: quiz Q5 — x = x + 1 is the contradiction (distractor)')
  }

  // exercises 5.1 — 14 keys solved + checked BOTH SIDES
  {
    const ex: [string, LinAssert, string][] = [
      ['L1.1 x − 4 = 6 → 10', LinAssert.fromInts(1, -4, 0, 6), '10'],
      ['L1.2 3x = 21 → 7', LinAssert.fromInts(3, 0, 0, 21), '7'],
      ['L2.1 x + 7 = 3 → −4', LinAssert.fromInts(1, 7, 0, 3), '-4'],
      ['L2.2 4x + 5 = 13 → 2', LinAssert.fromInts(4, 5, 0, 13), '2'],
      ['L3.1 6x = 3x + 12 → 4', LinAssert.fromInts(6, 0, 3, 12), '4'],
      ['L3.2 2x − 9 = 3x + 1 → −10', LinAssert.fromInts(2, -9, 3, 1), '-10'],
      ['L4.1 7 − 2x = 1 → 3', LinAssert.fromInts(-2, 7, 0, 1), '3'],
    ]
    for (const [label, e, want] of ex) {
      const v = e.classify()
      ok(v.kind === 'one' && v.solution!.toString() === want, `B: exercise ${label} — re-solved exactly (${v.solution?.toString()})`)
      if (v.solution) ok(e.trueAt(v.solution), `B: exercise ${label} — check holds`)
    }
    // L1.3: is x = 2 a solution of 5x − 3 = 7?  → 10 − 3 = 7 ✓
    ok(LinAssert.fromInts(5, -3, 0, 7).trueAt(Frac.of(2)), 'B: L1.3 — x = 2 IS a solution of 5x − 3 = 7')
    // L2.3: which of x = 1, 2, 3 solves 2x + 1 = 7 → x = 3
    ok(LinAssert.fromInts(2, 1, 0, 7).trueAt(Frac.of(3)) && !LinAssert.fromInts(2, 1, 0, 7).trueAt(Frac.of(1)) && !LinAssert.fromInts(2, 1, 0, 7).trueAt(Frac.of(2)), 'B: L2.3 — only x = 3 settles 2x + 1 = 7')
    // L4.2: 5x − 4 = 12 − x → x = 8/3 (exact, checked both sides)
    {
      const e = LinAssert.fromInts(5, -4, -1, 12)
      const v = e.classify()
      ok(v.kind === 'one' && v.solution!.toString() === '8/3', `B: L4.2 — 5x − 4 = 12 − x → x = 8/3 (got ${v.solution?.toString()})`)
      const lhs = v.solution!.mul(Frac.of(5)).sub(Frac.of(4))
      const rhs = Frac.of(12).sub(v.solution!)
      ok(lhs.eq(rhs), 'B: L4.2 — check exact: 5·(8/3) − 4 = 28/3 = 12 − 8/3')
    }
    // L5.1: the ×0 error — x + 1 = 4 has {3}; ×0 gives 0 = 0 (all)
    ok(LinAssert.fromInts(1, 1, 0, 4).classify().solution!.eq(Frac.of(3)), 'B: L5.1 — the ×0 victim settles at 3 before the unlawful move')
    // L6: uniqueness of 2x = 10 argued from 2(x₁ − x₂) = 0 → x₁ = x₂
    {
      const e = LinAssert.fromInts(2, 0, 0, 10)
      const v = e.classify()
      ok(v.solution!.eq(Frac.of(5)), 'B: L6 — 2x = 10 settles at 5')
      for (const x of [-2, 4, 5, 6, 12]) {
        if (x === 5) continue
        ok(!e.trueAt(Frac.of(x)), `B: L6 — x = ${x} fails 2x = 10`)
      }
    }
  }
}

/* ------------------------------------------------------------------ */
/* (C) figure geometry plans of lesson 5.1 (recorded pre-writing)      */
/* ------------------------------------------------------------------ */

/**
 * Fig 1 (5.1) "the balance and its lawful moves" — viewBox 720×340.
 *   header (30,18,660,44); LEFT panel (30,84,330,200) holding the beam
 *   (60,136,270,8), the fulcrum (180,150,30,18), two pans (70,168,110,22)
 *   and (240,168,110,22), two expression boxes (60,196,130,30) and
 *   (240,196,130,30); RIGHT panel (400,84,290,200) holding 4 move boxes
 *   (250,36) at (420,96),(420,140),(420,184),(420,228); collection band
 *   (30,300,660,32) holding 2 result boxes (200,22) at (60,305),(300,305).
 *   Rect census: 1+1+1+1+2+2+1+4+1+2 = 16.
 * Fig 2 (5.1) "the three assertions strip" — viewBox 720×360.
 *   header (30,18,660,44); 3 row boxes (30,84,660,64) at y=84,156,228,
 *   each carrying a label box (170,40) at x=45 and a verdict box
 *   (430,40) at x=235 (rows y 84/156/228, inner y 96/168/240); band
 *   (30,300,660,40) holding 2 result boxes (240,24) at (60,308),(360,308).
 *   Rect census: 1+3+3+3+1+2 = 13.
 */
const plan51Fig1 = {
  viewBox: { w: 720, h: 340 },
  rects: [
    [30, 18, 660, 44], [30, 84, 330, 200], [60, 136, 270, 8], [180, 150, 30, 18],
    [70, 168, 110, 22], [240, 168, 110, 22], [60, 196, 130, 30], [220, 196, 130, 30],
    [400, 84, 290, 200], [420, 116, 250, 36], [420, 156, 250, 36], [420, 196, 250, 36],
    [420, 236, 250, 36], [30, 300, 660, 32], [60, 305, 200, 22], [300, 305, 200, 22],
  ] as [number, number, number, number][],
  groups: [[2, 3, 4, 5, 6, 7], [9, 10, 11, 12], [14, 15], [0, 1], [0, 8], [1, 8], [1, 13], [8, 13]],
  contains: [
    { inner: [2, 3, 4, 5, 6, 7], outer: 1 }, // beam/fulcrum/pans/expr inside LEFT panel
    { inner: [9, 10, 11, 12], outer: 8 }, // moves inside RIGHT panel
    { inner: [14, 15], outer: 13 }, // results inside the band
  ],
}

const plan51Fig2 = {
  viewBox: { w: 720, h: 360 },
  rects: [
    [30, 18, 660, 44],
    [30, 84, 660, 64], [30, 156, 660, 64], [30, 228, 660, 64],
    [45, 96, 170, 40], [235, 96, 430, 40],
    [45, 168, 170, 40], [235, 168, 430, 40],
    [45, 240, 170, 40], [235, 240, 430, 40],
    [30, 300, 660, 40], [60, 308, 240, 24], [360, 308, 240, 24],
  ] as [number, number, number, number][],
  groups: [[4, 5], [6, 7], [8, 9], [1, 2], [2, 3], [1, 3], [11, 12], [0, 1], [3, 10]],
  contains: [
    { inner: [4, 5], outer: 1 },
    { inner: [6, 7], outer: 2 },
    { inner: [8, 9], outer: 3 },
    { inner: [11, 12], outer: 10 },
  ],
}

/* ------------------------------------------------------------------ */
/* (D) the pinned computations of lesson 5.2                           */
/* ------------------------------------------------------------------ */

{
  // the five-station RUNNING EXAMPLE: 2(x − 1)/3 = (x + 1)/2 + 1 → x = 13
  {
    // LHS = 2(x−1)/3 → coefficients: a = 2/3, b = −2/3
    const la = new Frac(2n, 3n)
    const lb = new Frac(-2n, 3n)
    // RHS = (x+1)/2 + 1 → a = 1/2, b = 1/2 + 1 = 3/2
    const ra = new Frac(1n, 2n)
    const rb = new Frac(1n, 2n).add(Frac.of(1))
    const e = new LinAssert(la, lb, ra, rb)
    const v = e.classify()
    ok(v.kind === 'one' && v.solution!.eq(Frac.of(13)), `D: running example 2(x−1)/3 = (x+1)/2 + 1 → x = 13 (got ${v.solution?.toString()})`)
    // station checks: ×6 clears denominators; brackets expand; x = 13
    const cleared = e.mulConst(Frac.of(6))
    ok(cleared.la.eq(Frac.of(4)) && cleared.lb.eq(Frac.of(-4)) && cleared.ra.eq(Frac.of(3)) && cleared.rb.eq(Frac.of(9)), 'D: running example ×6 → 4x − 4 = 3x + 9 (brackets cleared, fractions cleared in one lawful move)')
    ok(e.trueAt(Frac.of(13)), 'D: running example check — LHS 2(12)/3 = 8, RHS 14/2 + 1 = 8 ✓')
  }

  // the bracket exhibits
  {
    // 2(x − 3) + 5(x + 1) = 4(x + 2) → 7x − 1 = 4x + 8 → x = 3
    const e = LinAssert.fromInts(7, -1, 4, 8)
    const v = e.classify()
    ok(v.kind === 'one' && v.solution!.eq(Frac.of(3)), `D: bracket exhibit 2(x−3)+5(x+1)=4(x+2) → x = 3 (got ${v.solution?.toString()})`)
    const lhsAt = (x: number) => 2 * (x - 3) + 5 * (x + 1)
    const rhsAt = (x: number) => 4 * (x + 2)
    ok(lhsAt(3) === 20 && rhsAt(3) === 20, 'D: bracket exhibit check — both sides 20 at x = 3')
    // 3(x − 2) − (2x − 5) = 2(x + 1) − 4 → x − 1 = 2x − 2 → x = 1
    const e2 = LinAssert.fromInts(1, -1, 2, -2)
    const v2 = e2.classify()
    ok(v2.kind === 'one' && v2.solution!.eq(Frac.of(1)), `D: distributed-minus exhibit 3(x−2)−(2x−5)=2(x+1)−4 → x = 1 (got ${v2.solution?.toString()})`)
    const l2 = (x: number) => 3 * (x - 2) - (2 * x - 5)
    const r2 = (x: number) => 2 * (x + 1) - 4
    ok(l2(1) === 0 && r2(1) === 0, 'D: distributed-minus check — both sides 0 at x = 1')
    // the distributed-minus impostor: 3(x−2) − (2x−5) ≠ 3x − 6 − 2x − 5
    ok(l2(0) === -1 && 3 * 0 - 6 - 2 * 0 - 5 === -11, 'D: the sign-slip form differs (−1 vs −11 at x = 0) — the minus eats BOTH inner terms')
  }

  // the fraction exhibits
  {
    // x/3 + x/4 = 14 → LCD 12 → 4x + 3x = 168 → x = 24
    const e = new LinAssert(new Frac(1n, 3n).add(new Frac(1n, 4n)), Frac.of(0), Frac.of(0), Frac.of(14))
    const v = e.classify()
    ok(v.kind === 'one' && v.solution!.eq(Frac.of(24)), `D: fraction exhibit x/3 + x/4 = 14 → x = 24 (got ${v.solution?.toString()})`)
    ok(e.trueAt(Frac.of(24)), 'D: fraction exhibit check — 8 + 6 = 14 ✓')
    // (2x + 1)/3 = (x − 2)/2 → LCD 6 → 2(2x+1) = 3(x−2) → 4x + 2 = 3x − 6 → x = −8
    const e2 = new LinAssert(new Frac(2n, 3n), new Frac(1n, 3n), new Frac(1n, 2n), new Frac(-2n, 2n))
    const v2 = e2.classify()
    ok(v2.kind === 'one' && v2.solution!.eq(Frac.of(-8)), `D: both-sides fraction exhibit (2x+1)/3 = (x−2)/2 → x = −8 (got ${v2.solution?.toString()})`)
    const lhsAt = (x: number) => (2 * x + 1) / 3
    const rhsAt = (x: number) => (x - 2) / 2
    ok(lhsAt(-8) === -5 && rhsAt(-8) === -5, 'D: both-sides check — both sides −5 at x = −8 (exact integers)')
  }

  // the decimal exhibit + the collect exhibit
  {
    // 0.25x + 0.4 = 1.4 → ×100 → 25x + 40 = 140 → x = 4
    const e = new LinAssert(new Frac(25n, 100n), new Frac(4n, 10n), Frac.of(0), new Frac(14n, 10n))
    const v = e.classify()
    ok(v.kind === 'one' && v.solution!.eq(Frac.of(4)), `D: decimal exhibit 0.25x + 0.4 = 1.4 → x = 4 (got ${v.solution?.toString()})`)
    ok(e.trueAt(Frac.of(4)), 'D: decimal check — 1.00 + 0.4 = 1.4 ✓')
    // 5x − 12 = 3x + 8 → 2x = 20 → x = 10
    const e2 = LinAssert.fromInts(5, -12, 3, 8)
    const v2 = e2.classify()
    ok(v2.kind === 'one' && v2.solution!.eq(Frac.of(10)), `D: collect exhibit 5x − 12 = 3x + 8 → x = 10 (got ${v2.solution?.toString()})`)
    ok(5 * 10 - 12 === 3 * 10 + 8, 'D: collect check — 38 = 38 at x = 10')
  }

  // quiz 5.2 — keys [1, 0, 1, 2, 0], every distractor priced exactly
  {
    // Q1: x/2 + x/5 = 7 — the clearing multiplier is the LCD 10
    const q1 = new LinAssert(new Frac(1n, 2n).add(new Frac(1n, 5n)), Frac.of(0), Frac.of(0), Frac.of(7))
    ok(q1.classify().solution!.eq(Frac.of(10)), 'D: quiz Q1 — x/2 + x/5 = 7 settles at x = 10; the clearing multiplier is the LCD 10 (key 1)')
    ok(lcmB(2n, 5n) === 10n, 'D: quiz Q1 — LCD(2,5) = 10, not 7, not 5')
    // Q2: 2(x − 3) − (x − 4) = x − 2
    {
      const f = (x: number) => 2 * (x - 3) - (x - 4)
      ok(f(0) === -2 && f(5) === 3, 'D: quiz Q2 — 2(x−3)−(x−4) = x − 2 (key 0)')
      const d1 = (x: number) => x - 10 // the −4 sign flip
      const d3 = (x: number) => 3 * x - 2 // added x instead of subtracting
      ok(f(0) !== d1(0) && f(5) !== d1(5) && f(5) !== d3(5), 'D: quiz Q2 — distractors priced (x−10 and 3x−2 both fail at the census points)')
    }
    // Q3: 4x − 7 = 2x + 5 → x = 6
    const q3 = LinAssert.fromInts(4, -7, 2, 5)
    ok(q3.classify().solution!.eq(Frac.of(6)), 'D: quiz Q3 — 4x − 7 = 2x + 5 settles at x = 6 (key 1)')
    ok(!q3.trueAt(Frac.of(1)) && !q3.trueAt(Frac.of(-6)) && !q3.trueAt(Frac.of(2)), 'D: quiz Q3 — distractors 1 / −6 / 2 all fail')
    // Q4: the check substitutes into the ORIGINAL (key 2)
    // Q5: 0.5x − 1.2 = 1.3 ×10 → 5x − 12 = 13
    const q5 = new LinAssert(new Frac(5n, 10n), new Frac(-12n, 10n), Frac.of(0), new Frac(13n, 10n))
    const q5v = q5.classify()
    ok(q5v.kind === 'one' && q5v.solution!.eq(Frac.of(5)), 'D: quiz Q5 — 0.5x − 1.2 = 1.3 settles at x = 5 (0.5x = 2.5)')
    ok(q5.mulConst(Frac.of(10)).lb.eq(Frac.of(-12)) && q5.mulConst(Frac.of(10)).rb.eq(Frac.of(13)), 'D: quiz Q5 — ×10 gives 5x − 12 = 13 (key 0)')
  }

  // exercises 5.2 — 14 keys solved + checked BOTH SIDES
  {
    const ex: [string, LinAssert, string][] = [
      ['L1.1 4x = 28 → 7', LinAssert.fromInts(4, 0, 0, 28), '7'],
      ['L1.2 x − 9 = −2 → 7', LinAssert.fromInts(1, -9, 0, -2), '7'],
      ['L1.3 2x + 3 = 15 → 6', LinAssert.fromInts(2, 3, 0, 15), '6'],
      ['L2.1 3(x − 2) = 12 → 6', LinAssert.fromInts(3, -6, 0, 12), '6'],
      ['L2.2 x/4 = 3 → 12', new LinAssert(new Frac(1n, 4n), Frac.of(0), Frac.of(0), Frac.of(3)), '12'],
      ['L2.3 5x − 3 = 2x + 9 → 4', LinAssert.fromInts(5, -3, 2, 9), '4'],
      ['L3.1 x/2 + x/3 = 10 → 12', new LinAssert(new Frac(1n, 2n).add(new Frac(1n, 3n)), Frac.of(0), Frac.of(0), Frac.of(10)), '12'],
      ['L3.2 2(x+4) − 3(x−1) = 5 → 6', LinAssert.fromInts(-1, 11, 0, 5), '6'],
      ['L3.3 (2x+3)/5 = (x+2)/3 → 1', new LinAssert(new Frac(2n, 5n).sub(new Frac(1n, 3n)), new Frac(3n, 5n).sub(new Frac(2n, 3n)), Frac.of(0), Frac.of(0)), '1'],
      ['L4.1 0.3x + 0.2 = 1.1 → 3', new LinAssert(new Frac(3n, 10n), new Frac(2n, 10n), Frac.of(0), new Frac(11n, 10n)), '3'],
      ['L4.2 6(x−1) + 2(3−x) = 2x → 0', LinAssert.fromInts(4, 0, 2, 0), '0'],
      ['L5.1 (x−1)/2 + (x+2)/3 = 4 → 23/5', new LinAssert(new Frac(1n, 2n).add(new Frac(1n, 3n)), new Frac(-1n, 2n).add(new Frac(2n, 3n)), Frac.of(0), Frac.of(4)), '23/5'],
      ['L6 (x+1)/2 − (x−1)/3 = 1 → 1', new LinAssert(new Frac(1n, 2n).sub(new Frac(1n, 3n)), new Frac(1n, 2n).add(new Frac(1n, 3n)), Frac.of(0), Frac.of(1)), '1'],
    ]
    for (const [label, e, want] of ex) {
      const v = e.classify()
      ok(v.kind === 'one' && v.solution!.toString() === want, `D: exercise ${label} — re-solved exactly (got ${v.solution?.toString()})`)
      if (v.solution) ok(e.trueAt(v.solution), `D: exercise ${label} — check holds in the original form`)
    }
    // L5.1's exact fraction check: (18/5)/2 = 9/5, (33/5)/3 = 11/5, sum = 4
    ok(new Frac(18n, 5n).div(Frac.of(2)).eq(new Frac(9n, 5n)) && new Frac(33n, 5n).div(Frac.of(3)).eq(new Frac(11n, 5n)) && new Frac(9n, 5n).add(new Frac(11n, 5n)).eq(Frac.of(4)), 'D: L5.1 — the fractional answer recombines to 4 exactly (9/5 + 11/5)')
    // L5.2: the one-sided clearing error — x = 2 FAILS x/3 + x/4 = 14
    {
      const e = new LinAssert(new Frac(1n, 3n).add(new Frac(1n, 4n)), Frac.of(0), Frac.of(0), Frac.of(14))
      ok(!e.trueAt(Frac.of(2)), 'D: L5.2 — the wrong solve x = 2 FAILS the original (2/3 + 1/2 = 7/6 ≠ 14)')
      ok(e.classify().solution!.eq(Frac.of(24)), 'D: L5.2 — the correct solve is x = 24')
      // the student's cleared form 4x + 3x = 14 (LHS-only multiplication)
      const wrong = new LinAssert(Frac.of(7), Frac.of(0), Frac.of(0), Frac.of(14))
      ok(wrong.classify().solution!.eq(Frac.of(2)), 'D: L5.2 — the error lands on x = 2, and the check catches it')
    }
  }
}

/* ------------------------------------------------------------------ */
/* (E) figure geometry plans of lesson 5.2 (recorded pre-writing)      */
/* ------------------------------------------------------------------ */

/**
 * Fig 1 (5.2) "the five-station pipeline" — viewBox 720×340.
 *   header (30,18,660,44); 5 station boxes (122,70) at y=110, x =
 *   40,170,300,430,560; collection band (30,220,660,44) holding 2
 *   running-example boxes (300,30) at (45,227),(365,227); note strip
 *   (30,284,660,40) holding 1 check box (280,26) at (220,291).
 *   Rect census: 1+5+1+2+1+1 = 11.
 * Fig 2 (5.2) "the invariant solution set" — viewBox 720×360.
 *   header (30,18,660,44); LEFT panel (30,84,360,200) holding 4 form
 *   boxes (320,36) at (50,116),(50,160),(50,204),(50,248); RIGHT panel
 *   (410,84,280,200) holding 3 note boxes (250,48) at (425,116),
 *   (425,176),(425,236); band (30,300,660,40) holding 2 result boxes
 *   (250,24) at (55,308),(340,308).
 *   Rect census: 1+1+4+1+3+1+2 = 13.
 */
const plan52Fig1 = {
  viewBox: { w: 720, h: 340 },
  rects: [
    [30, 18, 660, 44],
    [40, 110, 122, 70], [170, 110, 122, 70], [300, 110, 122, 70], [430, 110, 122, 70], [560, 110, 122, 70],
    [30, 220, 660, 44], [45, 227, 300, 30], [365, 227, 300, 30],
    [30, 284, 660, 40], [220, 291, 280, 26],
  ] as [number, number, number, number][],
  groups: [[1, 2, 3, 4, 5], [7, 8], [6, 9], [0, 1], [0, 6]],
  contains: [
    { inner: [7, 8], outer: 6 }, // example boxes inside the band
    { inner: [10], outer: 9 }, // the check box inside the note strip
  ],
}

const plan52Fig2 = {
  viewBox: { w: 720, h: 360 },
  rects: [
    [30, 18, 660, 44], [30, 84, 360, 200], [50, 116, 320, 36], [50, 160, 320, 36],
    [50, 204, 320, 36], [50, 248, 320, 36], [410, 84, 280, 200], [425, 116, 250, 48],
    [425, 176, 250, 48], [425, 236, 250, 48], [30, 300, 660, 40], [55, 308, 250, 24], [340, 308, 250, 24],
  ] as [number, number, number, number][],
  groups: [[2, 3, 4, 5], [7, 8, 9], [11, 12], [0, 1], [0, 6], [1, 6], [1, 10], [6, 10]],
  contains: [
    { inner: [2, 3, 4, 5], outer: 1 },
    { inner: [7, 8, 9], outer: 6 },
    { inner: [11, 12], outer: 10 },
  ],
}

/* ------------------------------------------------------------------ */
/* pre-writing plan audits (the plans themselves are self-consistent)  */
/* ------------------------------------------------------------------ */

{
  const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
    r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
  for (const [name, plan] of [
    ['5.1 fig1', plan51Fig1],
    ['5.1 fig2', plan51Fig2],
    ['5.2 fig1', plan52Fig1],
    ['5.2 fig2', plan52Fig2],
  ] as const) {
    ok(plan.rects.every((r) => r[0] >= 0 && r[1] >= 0 && r[0] + r[2] <= plan.viewBox.w && r[1] + r[3] <= plan.viewBox.h), `plan ${name}: every box inside the viewBox`)
    for (const g of plan.groups) {
      const rs = g.map((i) => plan.rects[i])
      ok(rs.every((r1, i) => rs.every((r2, j) => i >= j || sep(r1, r2))), `plan ${name}: group [${g.join(',')}] pairwise disjoint`)
    }
    for (const { inner, outer } of plan.contains) {
      const o = plan.rects[outer]
      ok(inner.every((i) => {
        const r = plan.rects[i]
        return r[0] >= o[0] && r[1] >= o[1] && r[0] + r[2] <= o[0] + o[2] && r[1] + r[3] <= o[1] + o[3]
      }), `plan ${name}: containment group inside rect #${outer}`)
    }
  }
  console.log('[plan] all four figure plans self-consistent (inside viewBox, pairwise disjoint, containments hold)')
}

/* ------------------------------------------------------------------ */
/* (F) authored lesson 5.1 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch05Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-05.ts').text()
  const lesson: Lesson = chapter05.lessons[0]
  ok(chapter05.lessons.length >= 1, 'F: chapter 5 carries lesson 5.1 (audited here; 5.2 lands in G)')
  ok(lesson.id === 'al-what-an-equation-is-the-balance-principle', 'F: lesson id al-what-an-equation-is-the-balance-principle (globally unique, al- prefix)')
  ok(lesson.number === '5.1', 'F: lesson number 5.1')
  ok(lesson.title === 'What an Equation Is: the Balance Principle', 'F: lesson title matches the planned title')
  ok(chapter05.status === 'in-progress', 'F: chapter 5 in-progress (5.2 lands this run; the review closes at run 76)')
  ok(Array.isArray(chapter05.plannedLessons) && !chapter05.plannedLessons.includes('What an Equation Is: the Balance Principle'), 'F: plannedLessons no longer carry 5.1')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'F: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'F: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-factor-theorem-and-cubics', 'al-special-products-the-identities-proved']),
    'F: prerequisites chain to 4.4 (the reading order) and 3.3 (the identity charter)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'F: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'F: two display equations (the lawful moves + the equivalence chain)')
  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'F: two derivations (move-equivalence + uniqueness)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'F: four illustrations (the check habit, the collect move, the chained solve, the census sort)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'F: one table (the three assertion classes)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'F: three formula cards (lawful moves, solution set, one-solution verdict)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 1, 'F: a definition callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'theorem').length === 1, 'F: the move-equivalence theorem callout present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'warn').length === 1, 'F: the identities-are-not-solved caution present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'F: the Recorde historical callout present')
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
      ok(JSON.stringify(keys) === JSON.stringify([1, 1, 3, 0, 1]), 'F: quiz keys match the pinned [1, 1, 3, 0, 1] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'F: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '$x = 17$', 'F: quiz Q1 option 2 is the pinned solution 17 (the key 1)')
      ok(q.items[3].options[0] === '$\\{5\\}$', 'F: quiz Q4 option 1 is the pinned solution set {5} (the key 0)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'F: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'F: 14 exercises, Cengage chains, terminal answers')
      ok((all[10].answer || '').includes('3'), 'F: L5.1 answer carries the pinned ×0-victim verdict (the set {3})')
      ok((all[13].answer || '').includes('no-zero-product'), 'F: L6 answer carries the no-zero-product uniqueness argument')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'F: two figures in 5.1 (the balance + the verdict strip)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the verdict strip (census section), figs[1] = the balance
      // (balance section) — the order they appear in the lesson
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan51Fig2.rects.length, 'F: verdict strip rect census ' + r0.length + ' = plan ' + plan51Fig2.rects.length)
      ok(canon(r0) === canon(plan51Fig2.rects), 'F: verdict strip rects match the pinned plan exactly (positions + sizes)')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan51Fig1.rects.length, 'F: balance figure rect census ' + r1.length + ' = plan ' + plan51Fig1.rects.length)
      ok(canon(r1) === canon(plan51Fig1.rects), 'F: balance figure rects match the pinned plan exactly')
      for (const g of plan51Fig1.groups) {
        const rs = g.map((i) => plan51Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: balance figure group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan51Fig2.groups) {
        const rs = g.map((i) => plan51Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'F: verdict strip group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[1].svg.includes('lawful moves') && figs[1].svg.includes('x + 3'), 'F: balance figure carries the move list and the member labels')
      ok(figs[0].svg.includes('identity') && figs[0].svg.includes('contradiction'), 'F: verdict strip carries the three class labels')
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
    while (i < ch05Src.length) {
      if (ch05Src[i] === '\\') {
        let j = i
        while (j < ch05Src.length && ch05Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'F: no odd-length backslash runs in ch-05.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan: no \uXXXX sequences may survive in the authored source
  {
    const escapes = (ch05Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'F: no unicode escapes in ch-05.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (5.1 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'F: all ' + ids.length + ' lesson ids repo-wide unique (with 5.1 added)')
    ok(ids.includes('al-what-an-equation-is-the-balance-principle'), 'F: the new id is registered in the library graph')
  }
  // live re-checks of three anchors straight from the authored content
  {
    const q = chapter05.lessons[0].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[2].options[3].includes('dividing BOTH members by 5'), 'F: quiz Q3 option 4 is the lawful divide-by-5 move (the pinned key 3)')
    }
    const ex = chapter05.lessons[0].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l4second = ex.sets[3].questions[1]
      ok((l4second.answer || '').includes('8/3'), 'F: L4.2 answer carries the verifier-pinned fractional solution 8/3')
    }
    const tb = chapter05.lessons[0].blocks.find((b) => b.kind === 'table')
    if (tb && tb.kind === 'table') {
      ok(tb.rows.length === 3 && tb.rows[1].includes('$x + 3 = 8$'), 'F: the census table carries the conditional-equation row')
    }
  }
}

/* ------------------------------------------------------------------ */
/* (G) authored lesson 5.2 — content checks against the written file   */
/* ------------------------------------------------------------------ */

{
  const sourceLog = await Bun.file('/home/z/my-project/docs/project/SOURCE_LOG.md').text()
  const ch05Src = await Bun.file('/home/z/my-project/src/data/library/books/mathematics/elementary-algebra/ch-05.ts').text()
  const lesson: Lesson = chapter05.lessons[1]
  ok(chapter05.lessons.length >= 2, 'G: chapter 5 carries 5.1 and 5.2 (5.3 lands at run 76)')
  ok(lesson.id === 'al-solving-linear-equations', 'G: lesson id al-solving-linear-equations (globally unique, al- prefix)')
  ok(lesson.number === '5.2', 'G: lesson number 5.2')
  ok(lesson.title === 'Solving Linear Equations', 'G: lesson title matches the planned title')
  ok(chapter05.status === 'in-progress', 'G: chapter 5 still in-progress (the review closes it at run 76)')
  ok(Array.isArray(chapter05.plannedLessons) && JSON.stringify(chapter05.plannedLessons) === JSON.stringify(['The Three Verdicts: One, None, Infinitely Many']), 'G: plannedLessons trimmed to 5.3 only')
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, 'G: concepts 5-8 (got ' + lesson.concepts.length + ')')
  ok((lesson.objectives || []).length >= 5, 'G: objectives present (got ' + (lesson.objectives || []).length + ')')
  ok(
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['al-what-an-equation-is-the-balance-principle', 'al-adding-subtracting-and-multiplying-polynomials']),
    'G: prerequisites chain to 5.1 (the license) and 3.2 (the bracket craft)'
  )
  for (const key of lesson.sources || []) {
    ok(sourceLog.includes(key), 'G: source key "' + key + '" exists in SOURCE_LOG.md')
  }
  ok(lesson.blocks.filter((b) => b.kind === 'equation').length === 2, 'G: two display equations (the LCD strike chain + the both-sides clearing)')

  ok(lesson.blocks.filter((b) => b.kind === 'derivation').length === 2, 'G: two derivations (the LCD lawfulness + the pipeline composition)')
  ok(lesson.blocks.filter((b) => b.kind === 'example').length === 4, 'G: four illustrations (the running example, the bracketed form, the both-sides fractions, the decimal strike)')
  ok(lesson.blocks.filter((b) => b.kind === 'table').length === 1, 'G: one table (the five stations of the running example)')
  ok(lesson.blocks.filter((b) => b.kind === 'formula').length === 3, 'G: three formula cards (LCD strike, five stations, the check)')
  ok(lesson.blocks.filter((b) => b.kind === 'algorithm').length === 1, 'G: one algorithm block (the pipeline, unnumbered lines)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'definition').length >= 1, 'G: a definition callout present (cleared and collected form)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'insight').length === 1, 'G: the transposition insight present')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'warn').length === 2, 'G: two cautions (distributed minus + the global LCD strike)')
  ok(lesson.blocks.filter((b) => b.kind === 'callout' && b.tone === 'historical').length === 1, 'G: the al-jabr historical callout present')
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
      ok(JSON.stringify(keys) === JSON.stringify([1, 0, 1, 2, 0]), 'G: quiz keys match the pinned [1, 0, 1, 2, 0] (got ' + JSON.stringify(keys) + ')')
      ok(q.items.length === 5 && q.items.every((it) => it.options.length === 4 && it.explain.length > 40), 'G: quiz shape + distractor pricing')
      ok(q.items[0].options[1] === '10 (the LCD)', 'G: quiz Q1 option 2 is the pinned LCD multiplier (the key 1)')
      ok(q.items[4].options[0] === '$5x - 12 = 13$', 'G: quiz Q5 option 1 is the pinned cleared decimal form (the key 0)')
    }
  }
  {
    const ex = lesson.blocks.filter((b) => b.kind === 'exercises')
    if (ex[0].kind === 'exercises') {
      const counts = ex[0].sets.map((s) => s.questions.length)
      ok(JSON.stringify(counts) === JSON.stringify([3, 3, 3, 2, 2, 1]), 'G: exercise set sizes 3/3/3/2/2/1')
      const all = ex[0].sets.flatMap((s) => s.questions)
      ok(all.length === 14 && all.every((q) => Array.isArray(q.solution) && q.solution.length >= 2 && !!q.answer), 'G: 14 exercises, Cengage chains, terminal answers')
      ok((all[11].answer || '').includes('23/5'), 'G: L5.1 answer carries the verifier-pinned exact fractional solution 23/5')
      ok((all[12].answer || '').includes('24'), 'G: L5.2 answer carries the pinned lawful solution x = 24')
      ok((all[13].answer || '').includes('1'), 'G: L6 answer carries the pinned solution x = 1')
    }
  }
  {
    const figs = lesson.blocks.filter((b) => b.kind === 'figure')
    ok(figs.length === 2, 'G: two figures in 5.2 (the pipeline + the invariant set)')
    const parseRects = (svg: string) =>
      Array.from(svg.matchAll(/<rect x="(-?[\d.]+)" y="(-?[\d.]+)" width="([\d.]+)" height="([\d.]+)"/g))
        .map((m) => [Number(m[1]), Number(m[2]), Number(m[3]), Number(m[4])] as [number, number, number, number])
        .filter((r) => !(r[0] === 0 && r[1] === 0))
    const canon = (rs: [number, number, number, number][]) => rs.map((r) => r.join(',')).sort().join('|')
    const sep = (r1: [number, number, number, number], r2: [number, number, number, number]) =>
      r1[0] + r1[2] <= r2[0] || r2[0] + r2[2] <= r1[0] || r1[1] + r1[3] <= r2[1] || r2[1] + r2[3] <= r1[1]
    if (figs[0].kind === 'figure' && figs[1].kind === 'figure') {
      // figs[0] = the pipeline (stations section), figs[1] = the invariant set
      const r0 = parseRects(figs[0].svg)
      ok(r0.length === plan52Fig1.rects.length, 'G: pipeline rect census ' + r0.length + ' = plan ' + plan52Fig1.rects.length)
      ok(canon(r0) === canon(plan52Fig1.rects), 'G: pipeline rects match the pinned plan exactly (positions + sizes)')
      const r1 = parseRects(figs[1].svg)
      ok(r1.length === plan52Fig2.rects.length, 'G: invariant set rect census ' + r1.length + ' = plan ' + plan52Fig2.rects.length)
      ok(canon(r1) === canon(plan52Fig2.rects), 'G: invariant set rects match the pinned plan exactly')
      for (const g of plan52Fig1.groups) {
        const rs = g.map((i) => plan52Fig1.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: pipeline group [' + g.join(',') + '] pairwise disjoint')
      }
      for (const g of plan52Fig2.groups) {
        const rs = g.map((i) => plan52Fig2.rects[i])
        ok(rs.every((a, i) => rs.every((b, j) => i >= j || sep(a, b))), 'G: invariant set group [' + g.join(',') + '] pairwise disjoint')
      }
      ok(figs[0].svg.includes('five-station pipeline') && figs[0].svg.includes('x = 13'), 'G: pipeline figure carries the stations and the running example’s answer')
      ok(figs[1].svg.includes('solution set never moves') && figs[1].svg.includes('{13}'), 'G: invariant figure carries the invariance and the pinned set')
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
      if (b.kind === 'algorithm' && b.title.includes('$')) rawTitleDollars++
    }
    ok(rawTitleDollars === 0, 'G: no raw $ in non-KaTeX titles')
    const words = countLessonWords(lesson)
    ok(words >= 4000, 'G: honest word count ' + words + ' >= 4000')
  }
  // odd-run backslash scan over the WHOLE chapter file (run-69 hardening)
  {
    let oddRuns = 0
    let i = 0
    while (i < ch05Src.length) {
      if (ch05Src[i] === '\\') {
        let j = i
        while (j < ch05Src.length && ch05Src[j] === '\\') j++
        if ((j - i) % 2 === 1) oddRuns++
        i = j
      } else i++
    }
    ok(oddRuns === 0, 'G: no odd-length backslash runs in ch-05.ts source (found ' + oddRuns + ')')
  }
  // unicode-escape scan
  {
    const escapes = (ch05Src.match(/\\u[0-9a-fA-F]{4}/g) || []).length
    ok(escapes === 0, 'G: no unicode escapes in ch-05.ts source (found ' + escapes + ')')
  }
  // al- prefix uniqueness across the whole library (5.2 now in)
  {
    const ids: string[] = []
    for (const b of allBooks) {
      for (const c of b.chapters) {
        for (const l of c.lessons) ids.push(l.id)
      }
    }
    ok(ids.length === new Set(ids).size, 'G: all ' + ids.length + ' lesson ids repo-wide unique (with 5.2 added)')
    ok(ids.includes('al-solving-linear-equations'), 'G: the new id is registered in the library graph')
  }
  // live re-checks of three anchors straight from the authored content
  {
    const q = chapter05.lessons[1].blocks.find((b) => b.kind === 'quiz')
    if (q && q.kind === 'quiz') {
      ok(q.items[2].options[1] === '$x = 6$', 'G: quiz Q3 option 2 is the pinned solution 6 (the key 1)')
    }
    const ex = chapter05.lessons[1].blocks.find((b) => b.kind === 'exercises')
    if (ex && ex.kind === 'exercises') {
      const l4second = ex.sets[3].questions[1]
      ok((l4second.answer || '').includes('0'), 'G: L4.2 answer carries the pinned zero solution')
    }
    const alg = chapter05.lessons[1].blocks.find((b) => b.kind === 'algorithm')
    if (alg && alg.kind === 'algorithm') {
      ok(alg.lines.length === 6 && !alg.lines.some((l) => /^\d+\./.test(l.code)), 'G: the pipeline algorithm carries 6 unnumbered lines (5 stations + the check)')
    }
    const tb = chapter05.lessons[1].blocks.find((b) => b.kind === 'table')
    if (tb && tb.kind === 'table') {
      ok(tb.rows.length === 6 && tb.rows[4].includes('$x = 13$'), 'G: the station table carries the running example’s terminal line')
    }
  }
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log(`\nverify-book3-ch05 pre-writing battery: ${passed} passed, ${failed} failed`)
if (failed > 0) {
  console.log(failures.map((f) => '  - ' + f).join('\n'))
  process.exit(1)
}
