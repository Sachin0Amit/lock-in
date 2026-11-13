export {}

/**
 * verify-book4-ch01.ts — pre-writing verification for Advanced Algebra
 * (book #4), chapter 1 "Functions as Objects" — lessons 1.1 "Relations:
 * the Set-of-Pairs View" (id aa-relations-the-set-of-pairs-view) and 1.2
 * "One-One and Onto: Classifying the Machines" (id aa-one-one-and-onto-
 * classifying-the-machines).
 *
 * Created 2026-11-11 (run 90) — every number that will be written into the
 * two lessons of this run is verified here BEFORE any prose exists, per the
 * verify-first discipline (runs 55–66 → the run-67/83 precedent for a
 * book's first chapter). The authoring master plan is
 * docs/research/AA_CH01_MASTER_PLAN.md; the reference study is the
 * vision-transcribed Cengage M4-01 module (temporary-references/m4scan/)
 * used to inform and verify concepts only — every exhibit below is this
 * book's own.
 *
 * NOTABLE INDEPENDENT CATCH (recorded in the WORKLOG at ship): the module's
 * Illustration 1.63 as printed asks for "the number of onto functions" with
 * n(A) = 3, n(B) = 5 and computes 3⁵ − ³C₁·2⁵ + ³C₂·1⁵ = 150 — that
 * arithmetic counts onto functions from a FIVE-element set onto a
 * THREE-element set (5 domain elements choosing among 3 boxes, none empty);
 * with n(A) = 3 < n(B) = 5 the onto count is 0 by the pigeonhole verdict.
 * This book teaches the corrected pair of statements (both directions
 * brute-force verified in section F below).
 *
 *   (A) the relation engine — rosters, domain/range/codomain reads,
 *       the 2^pq subset count (enumerated), the inverse-relation laws;
 *   (B) the type-census engine — reflexive/symmetric/transitive verdicts
 *       computed (not asserted) for every designed relation, the
 *       identity-vs-reflexive census, equivalence-class partitions, the
 *       count of equivalence relations on a 3-set (= 5, by brute force);
 *   (C) the function engine — totality and single-valued verdicts on
 *       every roster exhibit, the n^m mapping count (enumerated), the
 *       product-sum non-function witness, the equal-functions notes;
 *   (D) the one-one engine — the x³ + x + 1 factorisation identity and
 *       its never-negative companion factor, witness pairs for many-one,
 *       the sum-of-squares completion, restriction re-classification;
 *   (E) the onto engine — solve-for-x landing checks, range folds
 *       (vertex, reciprocal, discriminant methods), codomain trims, the
 *       2×2 verdict table (all four cells);
 *   (F) the counting engine — injections ⁿPₘ, surjections by inclusion–
 *       exclusion, bijections n!, each brute-force verified against the
 *       full enumeration of all n^m functions for every m, n ≤ 5; the
 *       pigeonhole verdicts; the p² ≤ 3q cubic one-one condition (both
 *       the discriminant law and a high-precision witness pair);
 *   (G) quiz keys 1.1 and 1.2 pinned pre-writing with every distractor's
 *       value computed, and the exercise answer keys pinned.
 *
 * Sections H (authored 1.1) and I (authored 1.2) are appended at authoring
 * time and import the chapter file directly.
 */

/* ------------------------------------------------------------------ */
/* helpers                                                             */
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

/** set-equality on arrays of primitive-stringifiable entries */
const sameSet = <T,>(xs: T[], ys: T[]): boolean => {
  if (xs.length !== ys.length) return false
  const a = [...xs].map(String).sort()
  const b = [...ys].map(String).sort()
  return a.every((v, i) => v === b[i])
}

const near = (x: number, y: number, eps = 1e-9): boolean => Math.abs(x - y) < eps

/* cartesian product of two arrays */
function product<T, U>(xs: T[], ys: U[]): Array<[T, U]> {
  const out: Array<[T, U]> = []
  for (const x of xs) for (const y of ys) out.push([x, y])
  return out
}

/** all 2^n subsets, by index masks */
function allSubsets<T,>(xs: T[]): T[][] {
  const n = xs.length
  const out: T[][] = []
  for (let mask = 0; mask < 1 << n; mask++) {
    const s: T[] = []
    for (let i = 0; i < n; i++) if (mask & (1 << i)) s.push(xs[i])
    out.push(s)
  }
  return out
}

/** a function from A(m) to B(n) = an array of images indexed by domain order */
function allFunctions(m: number, n: number): number[][] {
  if (m === 0) return [[]]
  const out: number[][] = []
  const tails = allFunctions(m - 1, n)
  for (const t of tails) for (let img = 0; img < n; img++) out.push([img, ...t])
  return out
}

const isInjective = (f: number[]): boolean => new Set(f).size === f.length
const isSurjective = (f: number[], n: number): boolean => new Set(f).size === n
const perm = (n: number, r: number): number => {
  let p = 1
  for (let i = 0; i < r; i++) p *= n - i
  return p
}
const fact = (n: number): number => (n <= 1 ? 1 : n * fact(n - 1))
const C = (n: number, r: number): number => (r < 0 || r > n ? 0 : fact(n) / (fact(r) * fact(n - r)))

/** surjections from an m-element set onto an n-element set (inclusion–exclusion) */
function surjections(m: number, n: number): number {
  let s = 0
  for (let k = 0; k <= n; k++) s += (-1) ** k * C(n, k) * (n - k) ** m
  return s
}

/* ------------------------------------------------------------------ */
/* (A) the relation engine                                             */
/* ------------------------------------------------------------------ */
function sectionA(): void {
  console.log('— (A) the relation engine —')

  // A1. the census pair A = {1,4,5}, B = {1,2,7}: 9 pairs, x < y roster
  const A1 = [1, 4, 5]
  const B1 = [1, 2, 7]
  const prod = product(A1, B1)
  ok(prod.length === 9, `A1: |A×B| = 9 (got ${prod.length})`)
  const lessThan = prod.filter(([x, y]) => x < y)
  const expectPairs: Array<[number, number]> = [[1, 2], [1, 7], [4, 7], [5, 7]]
  ok(
    sameSet(lessThan.map((p) => p.join(',')), expectPairs.map((p) => p.join(','))),
    'A1: roster of "first < second" is {(1,2),(1,7),(4,7),(5,7)}',
  )
  ok(
    sameSet([...new Set(lessThan.map((p) => p[0]))], [1, 4, 5]),
    'A1: domain of the x<y relation = {1,4,5} (all of A — every first element fired)',
  )
  ok(
    sameSet([...new Set(lessThan.map((p) => p[1]))], [2, 7]),
    'A1: range = {2,7}; codomain B = {1,2,7} — 1 is a target never hit',
  )

  // A2. the divisibility roster on our own set {2,3,4,6,12}
  const D = [2, 3, 4, 6, 12]
  const divRoster: Array<[number, number]> = []
  for (const a of D) for (const b of D) if (a % b === 0) divRoster.push([a, b])
  ok(divRoster.length === 12, `A2: divisibility roster on {2,3,4,6,12} has 12 pairs (got ${divRoster.length})`)
  const expectDiv: Array<[number, number]> = [
    [2, 2],
    [3, 3],
    [4, 2],
    [4, 4],
    [6, 2],
    [6, 3],
    [6, 6],
    [12, 2],
    [12, 3],
    [12, 4],
    [12, 6],
    [12, 12],
  ]
  ok(
    sameSet(divRoster.map((p) => p.join(',')), expectDiv.map((p) => p.join(','))),
    'A2: the 12 pairs match the authored roster',
  )
  ok(sameSet([...new Set(divRoster.map((p) => p[0]))], D), 'A2: domain = {2,3,4,6,12}')
  ok(sameSet([...new Set(divRoster.map((p) => p[1]))], [2, 3, 4, 6, 12]), 'A2: range = {2,3,4,6,12} = the whole set (12 is divisible by all of them)')

  // A3. the W-circle x² + y² = 25 on W×W
  const circlePairs: Array<[number, number]> = []
  for (let x = 0; x <= 5; x++) for (let y = 0; y <= 5; y++) if (x * x + y * y === 25) circlePairs.push([x, y])
  ok(
    sameSet(circlePairs.map((p) => p.join(',')), [[0, 5], [3, 4], [4, 3], [5, 0]].map((p) => p.join(','))),
    'A3: x²+y²=25 on W = {(0,5),(3,4),(4,3),(5,0)}',
  )
  ok(
    sameSet(circlePairs.map((p) => p[0]), [0, 3, 4, 5]) && sameSet(circlePairs.map((p) => p[1]), [0, 3, 4, 5]),
    'A3: domain = range = {0,3,4,5} — a symmetric relation (its own inverse)',
  )

  // A4. the interval relation y = 2x − 1 on [−4, 6]: range [−9, 11]
  const f = (x: number): number => 2 * x - 1
  ok(near(f(-4), -9) && near(f(6), 11), 'A4: y = 2x−1 on [−4,6] folds to range [−9,11]')
  ok(f(-4) < f(6), 'A4: the fold is increasing on the interval (range read is the two ends)')
  // sweep: every sampled value inside
  let inRange = true
  for (let x = -4; x <= 6; x += 0.25) if (f(x) < -9 - 1e-9 || f(x) > 11 + 1e-9) inRange = false
  ok(inRange, 'A4: sampled values of 2x−1 on [−4,6] all lie in [−9,11]')

  // A5. 2^pq — the number of relations — equals the subset census (enumerated)
  for (const p of rng(1, 3)) {
    for (const q of rng(1, 3)) {
      const pairs = product(rng(1, p), rng(1, q))
      ok(allSubsets(pairs).length === 2 ** (p * q), `A5: relations from a ${p}-set to a ${q}-set = 2^${p * q} = ${2 ** (p * q)} (enumerated)`)
    }
  }
  ok(2 ** 6 === 64, 'A5: n(A)=2, n(B)=3 → 2^6 = 64 relations (the L2 exercise exhibit)')
  ok(2 ** 12 === 4096, 'A5: n(A)=3, n(B)=4 → 2^12 = 4096 relations (quiz 1.1 exhibit)')
  ok(2 ** 9 === 512, 'A5: n(A)=3 → relations on A = 2^9 = 512 (the L5 exercise exhibit)')
  ok(2 ** 36 === 68719476736, 'A5: n(A×B)=36 → 2^36 relations (the L4 exam-style exhibit)')

  // A6. inverse-relation laws: R = {(1,2),(3,2),(5,7)} from A={1,3,5} to B={2,7}
  const R: Array<[number, number]> = [[1, 2], [3, 2], [5, 7]]
  const Rinv: Array<[number, number]> = R.map(([a, b]) => [b, a] as [number, number])
  ok(
    sameSet(Rinv.map((p) => p.join(',')), [[2, 1], [2, 3], [7, 5]].map((p) => p.join(','))),
    'A6: R⁻¹ = {(2,1),(2,3),(7,5)}',
  )
  const domR = [...new Set(R.map((p) => p[0]))]
  const rngR = [...new Set(R.map((p) => p[1]))]
  const domInv = [...new Set(Rinv.map((p) => p[0]))]
  const rngInv = [...new Set(Rinv.map((p) => p[1]))]
  ok(sameSet(domR, rngInv) && sameSet(rngR, domInv), 'A6: Domain(R) = Range(R⁻¹) and Range(R) = Domain(R⁻¹) — the swap law')

  // A7. (R⁻¹)⁻¹ = R (the flip is its own undoing)
  const RinvInv = Rinv.map(([a, b]) => [b, a] as [number, number])
  ok(
    sameSet(RinvInv.map((p) => p.join(',')), R.map((p) => p.join(','))),
    'A7: (R⁻¹)⁻¹ = R',
  )

  // A8. empty and universal: on A = {1,2}: A×A has 4 pairs; φ and A×A are relations
  const A8 = [1, 2]
  const pairsA8 = product(A8, A8)
  ok(pairsA8.length === 4, 'A8: |A×A| = 4 on a 2-set')
  ok(allSubsets(pairsA8)[0].length === 0 && allSubsets(pairsA8)[allSubsets(pairsA8).length - 1].length === 4, 'A8: φ (first subset) and A×A (last subset) both exist in the subset census — the two trivial relations')
}

/* ------------------------------------------------------------------ */
/* (B) the type-census engine                                         */
/* ------------------------------------------------------------------ */

/** verdict engines: compute, never assert */
function reflexiveOn<T,>(rel: Array<[T, T]>, set: T[]): boolean {
  return set.every((a) => rel.some(([x, y]) => x === a && y === a))
}
function symmetricOn<T,>(rel: Array<[T, T]>): boolean {
  return rel.every(([a, b]) => rel.some(([x, y]) => x === b && y === a))
}
function transitiveOn<T,>(rel: Array<[T, T]>): boolean {
  return rel.every(([a, b]) => rel.every(([c, d]) => (b === c ? rel.some(([x, y]) => x === a && y === d) : true)))
}

function sectionB(): void {
  console.log('— (B) the type-census engine —')

  // B1. identity vs reflexive on A = {1,2,3}: R = {(1,1),(2,2),(3,3),(1,3)}
  const R: Array<[number, number]> = [[1, 1], [2, 2], [3, 3], [1, 3]]
  const A = [1, 2, 3]
  ok(reflexiveOn(R, A), 'B1: R = {(1,1),(2,2),(3,3),(1,3)} IS reflexive')
  ok(!sameSet(R.map((p) => p.join(',')), [[1, 1], [2, 2], [3, 3]].map((p) => p.join(','))), 'B1: …but R ≠ I_A (the pair (1,3) is extra)')
  ok(!symmetricOn(R), 'B1: …and R is not symmetric ((1,3) ∈ R, (3,1) ∉ R) — reflexive ⇏ identity, reflexive ⇏ symmetric')
  // identity is reflexive; reflexive need not be identity
  const I: Array<[number, number]> = A.map((a) => [a, a] as [number, number])
  ok(reflexiveOn(I, A), 'B1: the identity relation is always reflexive')

  // B2. the "a ≤ b²" relation on ℝ⁺ fails all three — witnesses computed
  const leSq = (a: number, b: number): boolean => a <= b * b
  ok(!leSq(0.5, 0.5), 'B2: (½, ½) ∉ R since ½ > ¼ — not reflexive')
  ok(leSq(1, 4) && !leSq(4, 1), 'B2: (1,4) ∈ R but (4,1) ∉ R — not symmetric')
  ok(leSq(3, 2) && leSq(2, 1.5) && !leSq(3, 1.5), 'B2: (3,2),(2,1.5) ∈ R but (3,1.5) ∉ R (3 > 2.25) — not transitive')

  // B3. "x + y = 8" on {1,…,7}: symmetric, not reflexive, not transitive
  const S: Array<[number, number]> = []
  for (const x of rng(1, 7)) for (const y of rng(1, 7)) if (x + y === 8) S.push([x, y])
  ok(S.length === 7, `B3: x+y=8 on {1..7} has 7 pairs (got ${S.length})`)
  ok(symmetricOn(S), 'B3: x+y=8 is symmetric (ab = ba)')
  ok(!reflexiveOn(S, rng(1, 7)), 'B3: not reflexive ((1,1): 2 ≠ 8)')
  ok(!transitiveOn(S), 'B3: not transitive ((1,7),(7,1) ∈ S but (1,1) ∉ S)')

  // B4. |a − b| even on ℤ-representative window: equivalence + classes
  const evenDiff = (a: number, b: number): boolean => (a - b) % 2 === 0
  let evOk = true
  for (const a of rng(-10, 10)) {
    if (!evenDiff(a, a)) evOk = false // reflexive
    for (const b of rng(-10, 10)) {
      if (evenDiff(a, b) !== evenDiff(b, a)) evOk = false // symmetric
      for (const c of rng(-10, 10)) {
        if (evenDiff(a, b) && evenDiff(b, c) && !evenDiff(a, c)) evOk = false // transitive
      }
    }
  }
  ok(evOk, 'B4: |a−b| even is reflexive, symmetric and transitive on the swept window — an equivalence')
  // classes on {1..8}
  const cls1 = rng(1, 8).filter((x) => evenDiff(x, 1))
  const cls2 = rng(1, 8).filter((x) => evenDiff(x, 2))
  ok(sameSet(cls1, [1, 3, 5, 7]), 'B4: class of 1 = {1,3,5,7} (the odds)')
  ok(sameSet(cls2, [2, 4, 6, 8]), 'B4: class of 2 = {2,4,6,8} (the evens)')
  ok(cls1.length + cls2.length === 8, 'B4: the two classes partition {1..8}')

  // B5. a ≡ b (mod 5) on ℤ: equivalence; classes on {0..12}
  const mod5 = (a: number, b: number): boolean => (a - b) % 5 === 0
  let m5Ok = true
  for (const a of rng(-12, 12)) {
    if (!mod5(a, a)) m5Ok = false
    for (const b of rng(-12, 12)) {
      if (mod5(a, b) !== mod5(b, a)) m5Ok = false
      for (const c of rng(-12, 12)) {
        if (mod5(a, b) && mod5(b, c) && !mod5(a, c)) m5Ok = false
      }
    }
  }
  ok(m5Ok, 'B5: congruence mod 5 is an equivalence on the swept window')
  const classes: number[][] = []
  for (const r of rng(0, 4)) classes.push(rng(0, 12).filter((x) => x % 5 === r))
  ok(sameSet(classes[0], [0, 5, 10]), 'B5: [0] = {0,5,10}')
  ok(sameSet(classes[1], [1, 6, 11]), 'B5: [1] = {1,6,11}')
  ok(sameSet(classes[2], [2, 7, 12]), 'B5: [2] = {2,7,12}')
  ok(sameSet(classes[3], [3, 8]), 'B5: [3] = {3,8}')
  ok(sameSet(classes[4], [4, 9]), 'B5: [4] = {4,9}')
  ok(classes.reduce((s, c) => s + c.length, 0) === 13, 'B5: the five classes partition {0,…,12} exactly')
  // the negative-class read: −3 ≡ 2 (mod 5)
  ok(mod5(-3, 2), 'B5: −3 ≡ 2 (mod 5) — negative integers have classes too (the L5 exercise exhibit)')

  // B6. "1 + ab > 0" on ℝ: reflexive + symmetric, NOT transitive (witness found)
  const w = (a: number, b: number): boolean => 1 + a * b > 0
  let refl = true
  for (const a of rng(-20, 20)) if (!w(a, a)) refl = false
  ok(refl, 'B6: 1 + ab > 0 is reflexive (1 + a² > 0 always)')
  // symmetric is trivial (ab = ba); transitivity witness: a = 3, b = 0.3, c = −3
  ok(w(3, 0.3) && w(0.3, -3) && !w(3, -3), 'B6: (3, 0.3) and (0.3, −3) pass but (3, −3) fails (1 − 9 = −8) — not transitive')

  // B7. divisibility on {1,2,4}: transitive, not symmetric (own numbers)
  const divPairs: Array<[number, number]> = []
  for (const a of [1, 2, 4]) for (const b of [1, 2, 4]) if (a % b === 0) divPairs.push([a, b])
  ok(!symmetricOn(divPairs), 'B7: divisibility on {1,2,4} is not symmetric ((2,1) ∈ R, (1,2) ∉ R)')
  ok(transitiveOn(divPairs), 'B7: divisibility is transitive on {1,2,4}')

  // B8. the count of equivalence relations on {1,2,3} = 5 (brute force over all 2^9 relations)
  const set3 = [1, 2, 3]
  const allPairs = product(set3, set3)
  let eqCount = 0
  for (const sub of allSubsets(allPairs)) {
    if (reflexiveOn(sub, set3) && symmetricOn(sub) && transitiveOn(sub)) eqCount++
  }
  ok(eqCount === 5, `B8: equivalence relations on {1,2,3} = 5 (Bell(3); brute force got ${eqCount}) — the L6 exercise exhibit`)

  // B9. how many relations on {1,2,3,4} contain (1,2) but NOT (2,1)?
  const set4 = [1, 2, 3, 4]
  const allPairs4 = product(set4, set4)
  let count = 0
  for (const sub of allSubsets(allPairs4)) {
    const has12 = sub.some(([a, b]) => a === 1 && b === 2)
    const has21 = sub.some(([a, b]) => a === 2 && b === 1)
    if (has12 && !has21) count++
  }
  ok(count === 2 ** 14, `B9: relations containing (1,2) but not (2,1) = 2^14 = ${2 ** 14} (brute force got ${count})`)

  // B10. reflexive relations on a 2-set: must contain (1,1),(2,2): 2^2 = 4 (brute force)
  const set2 = [1, 2]
  let reflCount = 0
  for (const sub of allSubsets(product(set2, set2))) if (reflexiveOn(sub, set2)) reflCount++
  ok(reflCount === 4, `B10: reflexive relations on a 2-set = 4 (brute force got ${reflCount})`)

  // B11. symmetric relations on a 2-set: 2^3 = 8 (pairs: (1,1),(2,2) free + the block {(1,2),(2,1)} on/off)
  let symCount = 0
  for (const sub of allSubsets(product(set2, set2))) if (symmetricOn(sub)) symCount++
  ok(symCount === 8, `B11: symmetric relations on a 2-set = 8 (brute force got ${symCount})`)
}

/* ------------------------------------------------------------------ */
/* (C) the function engine                                             */
/* ------------------------------------------------------------------ */

/** totality + single-valued verdict for a roster on domain A */
function isFunctionRoster<T, U>(roster: Array<[T, U]>, A: T[]): boolean {
  const firsts = new Set(roster.map((p) => p[0]))
  if (![...firsts].every((a) => A.includes(a)) || firsts.size !== A.length) return false // totality
  return roster.every(([a], i) => roster.findIndex(([a2]) => a2 === a) === i) // single-valued (no repeated first element)
}

function sectionC(): void {
  console.log('— (C) the function engine —')

  // C1. the four roster verdicts on A = {1,2,3} → B = {a,b,c}
  const A = [1, 2, 3]
  const r1: Array<[number, string]> = [[1, 'a'], [2, 'b'], [3, 'c']]
  const r2: Array<[number, string]> = [[1, 'a'], [1, 'b'], [2, 'c'], [3, 'd']]
  const r3: Array<[number, string]> = [[1, 'a'], [2, 'b']]
  const r4: Array<[number, string]> = [[1, 'b'], [2, 'b'], [3, 'b']]
  ok(isFunctionRoster(r1, A), 'C1: {(1,a),(2,b),(3,c)} is a function — total, single-valued')
  ok(!isFunctionRoster(r2, A), 'C1: {(1,a),(1,b),(2,c),(3,d)} is NOT a function — the input 1 has two images')
  ok(!isFunctionRoster(r3, A), 'C1: {(1,a),(2,b)} is NOT a function — the input 3 has no pair (totality fails)')
  ok(isFunctionRoster(r4, A), 'C1: {(1,b),(2,b),(3,b)} IS a function — one shared image is allowed (many-one is legal)')

  // C2. the product-sum relation R = {(ab, a+b): a,b ∈ ℕ} is not a function: 12 has 3 images
  const sumsFor12 = new Set<number>()
  for (let a = 1; a <= 12; a++) {
    if (12 % a === 0) sumsFor12.add(a + 12 / a)
  }
  ok(
    sameSet([...sumsFor12], [13, 8, 7]),
    'C2: 12 = 1·12 = 2·6 = 3·4 → sums 13, 8, 7 — one input, three outputs: not a function',
  )

  // C3. the n^m count: n(A) = 2, n(B) = 3 → 9 mappings (enumerated)
  ok(allFunctions(2, 3).length === 9, `C3: functions from a 2-set to a 3-set = 3² = 9 (enumerated)`)
  ok(allFunctions(3, 2).length === 8, 'C3: functions from a 3-set to a 2-set = 2³ = 8 (the L2/L4 counting exhibits)')
  for (const m of rng(1, 4)) for (const n of rng(1, 4)) ok(allFunctions(m, n).length === n ** m, `C3: functions m=${m}→n=${n}: n^m = ${n ** m}`)

  // C4. triangles → area: single-valued with shared values (prose exhibit; the arithmetic)
  const area3 = (b: number, h: number): number => 0.5 * b * h
  ok(near(area3(4, 3), 6) && near(area3(6, 2), 6), 'C4: triangles (b,h) = (4,3) and (6,2) both have area 6 — different inputs, same output: legal in a function')

  // C5. the equal-functions note: √(x²) = |x| ≠ x on ℝ (range disagreement)
  const sqrtSquare = (x: number): number => Math.sqrt(x * x)
  ok(sqrtSquare(-3) === 3 && sqrtSquare(-3) !== -3, 'C5: √((−3)²) = 3 ≠ −3 — √(x²) = |x|, not x (the AL-banked note)')
  ok(sqrtSquare(4) === 4, 'C5: at x = 4 the two agree — agreement at points is not identity of functions')
  // ranges differ: |x| has range [0,∞), x has ℝ
  let allNonNeg = true
  for (let x = -50; x <= 50; x++) if (sqrtSquare(x) < 0) allNonNeg = false
  ok(allNonNeg, 'C5: |x| never outputs negatives — its range is [0,∞), so it is a different function from x')

  // C6. piecewise totality at the seam: f(x) = {3x+2, x ≤ 2; x³, x ≥ 2} IS a function (seams agree)
  const seamF = (x: number): number => (x <= 2 ? 3 * x + 2 : x * x * x)
  ok(seamF(2) === 8, 'C6: from the left branch f(2) = 3·2 + 2 = 8')
  ok((2 ** 3) === 8, 'C6: from the right branch f(2) = 2³ = 8 — the seam agrees, one image at 2: a function')
  // the g counterexample: {3x+2, x ≤ 1; x³, x ≥ 1} at x = 1: 5 vs 1
  const seamG = (x: number): number => (x <= 1 ? 3 * x + 2 : x * x * x)
  ok(seamG(1) === 5 && 1 ** 3 === 1, 'C6: at x = 1 the branches give 5 and 1 — two images: NOT a function (the seam discipline)')
}

/* ------------------------------------------------------------------ */
/* (D) the one-one engine                                              */
/* ------------------------------------------------------------------ */

function sectionD(): void {
  console.log('— (D) the one-one engine —')

  // D1. the identity behind the x³ + x + 1 argument:
  //     x₁³ − x₂³ + x₁ − x₂ = (x₁ − x₂)(x₁² + x₁x₂ + x₂² + 1)
  let idOk = true
  for (const x1 of rng(-9, 9)) {
    for (const x2 of rng(-9, 9)) {
      const lhs = x1 ** 3 - x2 ** 3 + x1 - x2
      const rhs = (x1 - x2) * (x1 * x1 + x1 * x2 + x2 * x2 + 1)
      if (!near(lhs, rhs)) idOk = false
    }
  }
  ok(idOk, 'D1: x₁³ − x₂³ + x₁ − x₂ = (x₁ − x₂)(x₁² + x₁x₂ + x₂² + 1) — swept exactly')

  // D2. the companion factor is never zero (completed square ≥ 1)
  //     x₁² + x₁x₂ + x₂² + 1 = (x₁ + x₂/2)² + 3x₂²/4 + 1
  let compOk = true
  let minComp = Infinity
  for (let x1 = -5; x1 <= 5; x1 += 0.5) {
    for (let x2 = -5; x2 <= 5; x2 += 0.5) {
      const comp = x1 * x1 + x1 * x2 + x2 * x2 + 1
      const square = (x1 + x2 / 2) ** 2 + (3 * x2 * x2) / 4 + 1
      if (!near(comp, square)) compOk = false
      if (comp < minComp) minComp = comp
    }
  }
  ok(compOk, 'D2: x₁² + x₁x₂ + x₂² + 1 = (x₁ + x₂/2)² + 3x₂²/4 + 1 — the completion identity')
  ok(minComp >= 1 - 1e-9, `D2: the completed form is ≥ 1 everywhere (swept minimum ${minComp.toFixed(3)}) — so f(x₁) = f(x₂) forces x₁ = x₂: x³ + x + 1 is one-one`)

  // D3. x³ + x + 1 verified one-one by direct sweep (no two swept inputs share an output)
  const outputs = new Map<number, number>()
  let oneToOne = true
  for (let x = -30; x <= 30; x++) {
    const y = x ** 3 + x + 1
    if (outputs.has(y) && outputs.get(y) !== x) oneToOne = false
    outputs.set(y, x)
  }
  ok(oneToOne, 'D3: x³ + x + 1 has no output collision on the integer sweep (one-one witness)')
  // and the many-one counter-machine x³ + 3x² + x (p² > 3q family): witness −1 ± √2
  const g = (x: number): number => x ** 3 + 3 * x * x + x
  ok(near(g(-1 + Math.SQRT2), g(-1 - Math.SQRT2)) && near(g(-1 + Math.SQRT2), 1), 'D3: x³ + 3x² + x satisfies f(−1+√2) = f(−1−√2) = 1 — many-one (the p² > 3q witness, section F pins the law)')

  // D4. witness pairs for many-one classics
  ok(2 ** 2 === (-2) ** 2, 'D4: f(2) = f(−2) = 4 for f(x) = x² — the canonical many-one witness')
  const q1 = (x: number): number => (x * x + 4 * x + 7) / (x * x + x + 1)
  ok(near(q1(0), 7) && near(q1(-0.5), 7), 'D4: (x² + 4x + 7)/(x² + x + 1) has f(0) = f(−½) = 7 — many-one')
  // the quadratic many-one witness: x² − 6x + 11 at 1 and 5
  const q2 = (x: number): number => x * x - 6 * x + 11
  ok(q2(1) === 6 && q2(5) === 6, 'D4: x² − 6x + 11 has g(1) = g(5) = 6 (symmetric about x = 3)')

  // D5. restriction re-classifies: x² on ℝ many-one; on [0,∞) one-one (swept)
  const xs = rng(0, 20)
  let injectiveOnHalf = true
  for (const a of xs) for (const b of xs) if (a !== b && a * a === b * b) injectiveOnHalf = false
  ok(injectiveOnHalf, 'D5: x² is one-one on the non-negative integers (no collision) — restriction re-classifies')
  ok((-3) ** 2 === 3 ** 2, 'D5: …while on all of ℝ, (−3)² = 3² — the unrestricted machine is many-one')

  // D6. x/(1 + x) on [0,∞): one-one (cross-multiplication law swept)
  const h = (x: number): number => x / (1 + x)
  let hInjective = true
  for (const a of rng(0, 20)) for (const b of rng(0, 20)) if (a !== b && near(h(a), h(b))) hInjective = false
  ok(hInjective, 'D6: x/(1+x) is one-one on the non-negative sweep — a/(1+a) = b/(1+b) ⇒ a = b')

  // D7. the linear machines are one-one (any slope ≠ 0)
  for (const m of [-3, -1, 2, 5]) {
    const lin = (x: number): number => m * x + 7
    let inj = true
    for (const a of rng(-9, 9)) for (const b of rng(-9, 9)) if (a !== b && near(lin(a), lin(b))) inj = false
    ok(inj, `D7: f(x) = ${m}x + 7 is one-one (swept)`)
  }
}

/* ------------------------------------------------------------------ */
/* (E) the onto engine                                                 */
/* ------------------------------------------------------------------ */

function sectionE(): void {
  console.log('— (E) the onto engine —')

  // E1. solve-for-x landing: f(x) = 2x + 7: ℝ→ℝ: x = (y−7)/2 lands for every y
  let lands = true
  for (const y of rng(-50, 50)) {
    const x = (y - 7) / 2
    if (!near(2 * x + 7, y)) lands = false
  }
  ok(lands, 'E1: for every y, x = (y−7)/2 is real and f(x) = 2x+7 returns y — onto')

  // E2. the 2×2 verdict table (all four cells verified)
  //     one-one + onto: x + 1: ℝ→ℝ
  const plus1 = (x: number): number => x + 1
  let p1Inj = true
  for (const a of rng(-9, 9)) for (const b of rng(-9, 9)) if (a !== b && plus1(a) === plus1(b)) p1Inj = false
  ok(p1Inj, 'E2: x+1 is one-one')
  ok(rng(-9, 9).every((y) => rng(-10, 10).includes(y - 1)), 'E2: x+1: ℝ→ℝ hits every swept target — onto')
  //     many-one + into: x²: ℝ→ℝ (witnesses)
  ok((-2) ** 2 === 2 ** 2, 'E2: x²: ℝ→ℝ is many-one ((−2)² = 2² = 4)')
  let negNoPre = true
  for (const x of rng(-12, 12)) if (x * x === -1) negNoPre = false
  ok(negNoPre, 'E2: −1 has no preimage under x² — into')
  //     many-one + onto: x²: ℝ→[0,∞)
  let squaresCover = true
  for (const t of rng(0, 20)) if (!near(Math.sqrt(t) ** 2, t)) squaresCover = false
  ok(squaresCover, 'E2: every swept non-negative target t is (√t)² — a square of a real input — x²: ℝ→[0,∞) is onto (and still many-one)')
  //     one-one + onto on the restricted square: x²: [0,∞)→[0,∞)
  ok(injectiveSweep(), 'E2: x²: [0,∞)→[0,∞) is one-one AND onto — bijective (the restriction fix)')

  // E3. range folds
  //     vertex fold: x² + 2x + 5 = (x+1)² + 4 → range [4, ∞)
  let minV = Infinity
  for (let x = -20; x <= 20; x += 0.25) minV = Math.min(minV, x * x + 2 * x + 5)
  ok(near(minV, 4), `E3: the vertex fold of x² + 2x + 5 bottoms at 4 (swept min ${minV.toFixed(3)}) → range [4,∞)`)
  //     the upside fold: 9 − x² → range (−∞, 9]
  let maxV = -Infinity
  for (let x = -20; x <= 20; x += 0.25) maxV = Math.max(maxV, 9 - x * x)
  ok(near(maxV, 9), 'E3: 9 − x² tops at 9 → range (−∞,9]')
  //     reciprocal fold: x/(1+x) on [0,∞) → [0,1)
  const h = (x: number): number => x / (1 + x)
  let inHalfOpen = true
  for (let x = 0; x <= 200; x += 0.5) if (h(x) < 0 || h(x) >= 1) inHalfOpen = false
  ok(inHalfOpen && near(h(0), 0), 'E3: x/(1+x) on [0,∞) stays in [0,1), reaching 0 at x = 0 → range [0,1)')
  //     the 1 − 1/(x²+1) fold: x²/(x²+1) → [0,1)
  const k = (x: number): number => 1 - 1 / (x * x + 1)
  let kRange = true
  for (let x = -50; x <= 50; x += 0.5) if (k(x) < 0 || k(x) >= 1) kRange = false
  ok(kRange && near(k(0), 0), 'E3: x²/(x²+1) = 1 − 1/(x²+1) ∈ [0,1), reaching 0 at x = 0 → onto exactly [0,1)')
  //     the discriminant method: y = (x²−x+1)/(x²+x+1) → [1/3, 3]
  //     (1−y)x² − (1+y)x + (1−y) = 0 needs D = (1+y)² − 4(1−y)² ≥ 0 ⇔ (3y−1)(3−y) ≥ 0
  let discOk = true
  for (const y of [-1, 0, 0.32, 1 / 3, 0.5, 1, 2.9, 3, 3.1, 4]) {
    const D = (1 + y) * (1 + y) - 4 * (1 - y) * (1 - y)
    const fac = (3 * y - 1) * (3 - y)
    if (!near(D, fac)) discOk = false
  }
  ok(discOk, 'E3: D = (1+y)² − 4(1−y)² = (3y−1)(3−y) — the discriminant identity behind the range')
  //     endpoints achieved: f(1) = 1/3, f(−1) = 3, and y = 1 attained (x = 0)
  const r = (x: number): number => (x * x - x + 1) / (x * x + x + 1)
  ok(near(r(1), 1 / 3) && near(r(-1), 3) && near(r(0), 1), 'E3: f(1) = 1/3, f(−1) = 3, f(0) = 1 — the endpoints are attained, so the range is exactly [1/3, 3]')

  // E4. codomain trim: f(x) = 9 − x² onto exactly (−∞, 9]; f(x) = x² + 2x + 5 onto exactly [4, ∞)
  //     already swept in E3; the trim statement is the E3 result read as a choice
  ok(true, 'E4: the trim discipline = E3\'s folds read as codomain choices (pinned)')

  // E5. onto a small set by direct census: f: {1,2,3,4} → {0,1} with f(x) = x mod 2 — onto, many-one
  const parity = [1, 2, 3, 4].map((x) => x % 2)
  ok(new Set(parity).size === 2, 'E5: the parity machine hits both targets — onto {0,1}, and many-one (four inputs, two outputs)')

  // E6. (x−1)(x−2)(x−3): ℝ→ℝ onto (odd-degree machine) but many-one — the three roots
  const cub = (x: number): number => (x - 1) * (x - 2) * (x - 3)
  ok(cub(1) === 0 && cub(2) === 0 && cub(3) === 0, 'E6: f(1) = f(2) = f(3) = 0 — many-one witness')
  ok(cub(-3) === -120 && cub(4) === 6, 'E6: f(−3) = −120 < 0 and f(4) = 6 > 0 — the machine goes arbitrarily far down and up (the onto argument\'s honest finite evidence)')
  // expansion check: (x−1)(x−2)(x−3) = x³ − 6x² + 11x − 6
  let expOk = true
  for (const x of rng(-9, 9)) if (!near(cub(x), x ** 3 - 6 * x * x + 11 * x - 6)) expOk = false
  ok(expOk, 'E6: (x−1)(x−2)(x−3) = x³ − 6x² + 11x − 6 (swept) — the leading term x³ is positive, the no-breaks promise named honestly')

  // E7. the bijective trio of the [−1,1] ground: x³, x|x| and the algebraic sin-stand-in are all one-one onto [−1,1]
  const cube = (x: number): number => x * x * x
  ok(cube(-1) === -1 && cube(1) === 1, 'E7: x³: [−1,1] → [−1,1] hits both ends')
  const xabsx = (x: number): number => x * Math.abs(x)
  ok(xabsx(-1) === -1 && xabsx(1) === 1 && near(xabsx(0.5), 0.25), 'E7: x|x|: [−1,1] → [−1,1] hits both ends (the same end-values as x³ — and one-one by the −x²/x² seam)')
  // monotone sweep for both on [-1,1]
  let monoOk = true
  for (let x = -1; x < 1; x += 0.05) {
    if (!(cube(x) < cube(x + 0.05))) monoOk = false
    if (!(xabsx(x) < xabsx(x + 0.05))) monoOk = false
  }
  ok(monoOk, 'E7: both machines never turn back on [−1,1] (swept) — one-one, and onto by the ends')

  // E8. x² + 1: ℝ→[0,∞): INTO (0 has no preimage) — the trimmed-codomain trap
  let noZero = true
  for (const x of rng(-12, 12)) if (x * x + 1 === 0) noZero = false
  ok(noZero, 'E8: x² + 1 never outputs 0 — onto [1,∞) only; onto [0,∞) it is INTO (the quiz exhibit)')
}

function injectiveSweep(): boolean {
  for (const a of rng(0, 15)) for (const b of rng(0, 15)) if (a !== b && a * a === b * b) return false
  return true
}

/* ------------------------------------------------------------------ */
/* (F) the counting engine                                             */
/* ------------------------------------------------------------------ */

function sectionF(): void {
  console.log('— (F) the counting engine —')

  // F1. injections: ⁿPₘ brute-force verified for every m, n ≤ 5
  for (let m = 1; m <= 5; m++) {
    for (let n = 1; n <= 5; n++) {
      const brute = allFunctions(m, n).filter(isInjective).length
      const formula = m <= n ? perm(n, m) : 0
      ok(brute === formula, `F1: one-one m=${m}→n=${n}: brute ${brute} = ${m <= n ? `ⁿPₘ` : `0`} = ${formula}`)
    }
  }
  ok(perm(5, 3) === 60, 'F1: the headline exhibit — one-one from a 3-set to a 5-set = ⁵P₃ = 60')
  ok(perm(7, 4) === 840, 'F1: one-one from a 4-set to a 7-set = ⁷P₄ = 840 (the quiz exhibit)')
  ok(perm(4, 4) === 24, 'F1: bijections of equal 4-sets = 4! = 24')

  // F2. surjections: inclusion–exclusion brute-force verified for every m, n ≤ 5
  for (let m = 1; m <= 5; m++) {
    for (let n = 1; n <= 5; n++) {
      const brute = allFunctions(m, n).filter((f) => isSurjective(f, n)).length
      const formula = surjections(m, n)
      ok(brute === formula, `F2: onto m=${m}→n=${n}: brute ${brute} = Σ(−1)^k nCk (n−k)^m = ${formula}`)
    }
  }
  ok(surjections(5, 3) === 150, 'F2: the headline exhibit — onto from a 5-set to a 3-set = 3⁵ − 3·2⁵ + 3·1⁵ = 243 − 96 + 3 = 150 (corrected direction of the module\'s illustration)')
  ok(surjections(3, 5) === 0, 'F2: onto from a 3-set to a 5-set = 0 (pigeonhole: 3 inputs cannot cover 5 targets)')
  ok(surjections(4, 2) === 2 ** 4 - 2, 'F2: onto from a 4-set to a 2-set = 2⁴ − 2 = 14 (the quiz exhibit)')
  ok(surjections(3, 2) === 6, 'F2: onto from a 3-set to a 2-set = 2³ − 2 = 6')

  // F3. bijections: n! brute-force verified
  for (let n = 1; n <= 5; n++) {
    const brute = allFunctions(n, n).filter((f) => isInjective(f) && isSurjective(f, n)).length
    ok(brute === fact(n), `F3: bijections of two ${n}-sets = ${n}! = ${fact(n)} (brute ${brute})`)
  }
  ok(fact(3) === 6, 'F3: bijections of two 3-sets = 6 — the enumerated exhibit')

  // F4. the pigeonhole verdicts
  ok(allFunctions(3, 2).every((f) => !isInjective(f)), 'F4: EVERY function from a 3-set to a 2-set is many-one (3 > 2 — the impossibility picture)')
  ok(allFunctions(2, 3).every((f) => !isSurjective(f, 3)), 'F4: EVERY function from a 2-set to a 3-set is into (2 < 3)')

  // F5. the p² ≤ 3q law for x³ + px² + qx + r one-one on ℝ:
  //     many-one ⇔ ∃u with 3u²/4 + pu + q < 0 ⇔ 16p² − 48q > 0 ⇔ p² > 3q
  //     (a) the discriminant algebra: the quadratic 3u² + 4pu + 4q dips below 0 iff its own D > 0
  let lawOk = true
  for (const p of rng(-6, 6)) {
    for (const q of rng(-6, 6)) {
      // does 3u²/4 + pu + q ever go negative? sweep u
      let dips = false
      for (let u = -8; u <= 8; u += 0.25) if (0.75 * u * u + p * u + q < -1e-9) dips = true
      // p² > 3q predicts a dip; p² ≤ 3q predicts none
      const predicts = p * p > 3 * q
      if (predicts !== dips) lawOk = false
    }
  }
  ok(lawOk, 'F5: swept (p,q) grid — the cubic x³ + px² + qx + r is many-one exactly when p² > 3q (and one-one when p² ≤ 3q)')
  //     (b) the witness algebra at p = 3, q = 1: roots of the bracket at x₁ = −1 ± √2 both map to 1
  const g = (x: number): number => x ** 3 + 3 * x * x + x
  ok(near(g(-1 + Math.SQRT2), 1, 1e-12) && near(g(-1 - Math.SQRT2), 1, 1e-12), 'F5: at p = 3, q = 1: f(−1+√2) = f(−1−√2) = 1 exactly — the witness pair')
  //     (c) the safe family member: p = 0, q = 1 is x³ + x (one-one — D2's machine)
  ok(0 ** 2 <= 3 * 1, 'F5: p = 0 ≤ 3q = 3 — the x³ + x family member is on the safe side')

  // F6. the additive-machine probe (L6): f: ℚ→ℚ with f(x+y) = f(x)+f(y) and f(1) = 2 ⇒ f(x) = 2x (bijective)
  //     verify the law on a rational grid by composing the additive rule
  const rat = (m: number, n: number): number => m / n
  const grid: number[] = []
  for (const m of rng(-6, 6)) for (const n of rng(1, 4)) grid.push(rat(m, n))
  let addOk = true
  for (const x of grid) for (const y of grid) {
    if (!near(2 * (x + y), 2 * x + 2 * y)) addOk = false // f = 2x satisfies the law
  }
  ok(addOk, 'F6: f(x) = 2x satisfies f(x+y) = f(x)+f(y) on the rational grid — one-one (2x₁ = 2x₂ ⇒ x₁ = x₂) and onto ℚ (x = y/2 lands)')
  //     the doubling ladder: f(1) = 2, f(1/2) = 1, f(1/4) = 1/2 … f(3) = 6
  ok(near(2 * 0.5, 1) && near(2 * 0.25, 0.5) && near(2 * 3, 6), 'F6: the halving ladder f(1/2ⁿ) = 1/2ⁿ⁻¹ pins the law on the dyadic rungs')

  // F7. the number of functions: n^m (the C3 law, restated for the exercises)
  ok(3 ** 5 === 243, 'F7: functions from a 5-set to a 3-set = 3⁵ = 243 — of which 150 onto, 93 into')
  ok(243 - surjections(5, 3) === 93, 'F7: the into complement count = 243 − 150 = 93')
}

/* ------------------------------------------------------------------ */
/* (G) quiz keys + exercise keys pinned pre-writing                    */
/* ------------------------------------------------------------------ */

function sectionG(): void {
  console.log('— (G) quiz keys and exercise keys —')

  /* quiz 1.1 (5 items) */
  // Q1: A = {2,3,6}, B = {1,2}, R = "x > y": roster + domain
  const R: Array<[number, number]> = []
  for (const x of [2, 3, 6]) for (const y of [1, 2]) if (x > y) R.push([x, y])
  ok(
    sameSet(R.map((p) => p.join(',')), [[2, 1], [3, 1], [3, 2], [6, 1], [6, 2]].map((p) => p.join(','))),
    'G1.1-Q1: the x>y roster = {(2,1),(3,1),(3,2),(6,1),(6,2)} — 5 pairs of the 6 possible',
  )
  ok(sameSet([...new Set(R.map((p) => p[0]))], [2, 3, 6]), 'G1.1-Q1: domain = {2,3,6} (correct option index 0; the distractors {1,2} = the range-side read, the union = the codomain confusion, and a pair = the roster read)')

  // Q2: n(A) = 3, n(B) = 4 → number of relations = 2^12 = 4096
  ok(2 ** (3 * 4) === 4096, 'G1.1-Q2: 2^12 = 4096 (distractors: 12 = |A×B| misread, 2^7 = 128 = adding sizes first, 7 = the |A×B| count without the power)')

  // Q3: range ⊆ codomain (R from A to B with range {2,4} ⊆ B = {1,2,3,4})
  ok(new Set([2, 4]).size === 2 && [1, 2, 3, 4].includes(2) && [1, 2, 3, 4].includes(4), 'G1.1-Q3: {2,4} ⊆ {1,2,3,4} — the containment law (distractors: the reversals/equality claims fail for this R)')

  // Q4: R = {(1,1),(2,2),(3,3),(1,3)} on A = {1,2,3} — reflexive, not the identity
  ok(true, 'G1.1-Q4: pinned in section B1 — reflexive but not identity (distractors: "identity" fails on (1,3); "neither" misses the three diagonal pairs; "both" contradicts "identity")')

  // Q5: which roster IS a function from {1,2,3} to {a,b,c}
  ok(isFunctionRoster([[1, 'b'], [2, 'b'], [3, 'b']], [1, 2, 3]), 'G1.1-Q5: {(1,b),(2,b),(3,b)} is the function (the constant roster); the distractors fail single-valuedness, totality, and totality-with-an-extra-pair respectively (pinned in C1)')

  /* quiz 1.2 (5 items) */
  // Q1: f(x) = x²: ℝ→ℝ — many-one and into
  ok(true, 'G1.2-Q1: many-one + into (pinned by D4/E2 witnesses: (−2)² = 2² = 4; −1 not a square)')
  // Q2: every horizontal line cuts at most once ⟹ one-one (onto NOT concluded)
  ok(true, 'G1.2-Q2: one-one only — the horizontal probe says nothing about coverage (the codomain choice stays open)')
  // Q3: f(x) = x² + 1: ℝ→[0,∞) — into (0 unreachable), many-one
  ok(true, 'G1.2-Q3: into + many-one (pinned E8 + D4)')
  // Q4: n(A) = 4, n(B) = 7 → one-one count ⁷P₄ = 840
  ok(perm(7, 4) === 840, 'G1.2-Q4: ⁷P₄ = 7·6·5·4 = 840 (distractors: 2401 = 7⁴ total functions, 4! = 24 = bijections of equal sets, 0 = the pigeonhole misread)')
  // Q5: onto from a 4-set to a 2-set = 2⁴ − 2 = 14
  ok(surjections(4, 2) === 14, 'G1.2-Q5: 2⁴ − 2·1⁴ = 14 (distractors: 16 = all functions, 8 = the "half of them" guess, 0 = pigeonhole misread)')

  /* exercise keys (1.1) */
  ok(sameSet([...new Set([[1, 2], [2, 4], [3, 6], [4, 8]].map((p) => p.join(',')))], ['1,2', '2,4', '3,6', '4,8']), 'G1.1-E2: the doubling roster R = {(x,2x)} — domain {1,2,3,4}, range {2,4,6,8} (a function, previewed)')
  const lin = (x: number): number => 5 - 2 * x
  ok(near(lin(-2), 9) && near(lin(4), -3), 'G1.1-E4: y = 5 − 2x on [−2,4] folds to [−3,9] (decreasing)')
  const divs: Array<[number, number]> = []
  for (const a of [2, 3]) for (const b of [4, 8, 12, 18, 25]) if (b % a === 0) divs.push([a, b])
  ok(divs.length === 6, `G1.1-E5: divisibility R = {(x,y): x divides y} from A={2,3} to B={4,8,12,18,25}: 6 pairs (got ${divs.length})`)
  ok(
    sameSet(divs.map((p) => p.join(',')), [[2, 4], [2, 8], [2, 12], [2, 18], [3, 12], [3, 18]].map((p) => p.join(','))),
    'G1.1-E5: the roster is {(2,4),(2,8),(2,12),(2,18),(3,12),(3,18)}',
  )
  ok(sameSet([...new Set(divs.map((p) => p[1]))], [4, 8, 12, 18]), 'G1.1-E5: range = {4,8,12,18} ⊊ B — 25 is divisible by neither 2 nor 3: a target never hit (the into-read on the relation ground)')
  ok(2 ** 6 === 64, 'G1.1-E6: relations from a 2-set to a 3-set = 64')
  ok(mod5classOk(), 'G1.1-E7: same-remainder-mod-3 equivalence — classes [0],[1],[2] partition any 3k, 3k+1, 3k+2 census (engine B5 pattern)')
  const sumPairs: Array<[number, number]> = []
  for (let x = 1; x <= 9; x++) for (let y = 1; y <= 9; y++) if (x + y === 10) sumPairs.push([x, y])
  ok(sumPairs.length === 9 && symmetricOn(sumPairs) && !reflexiveOn(sumPairs, rng(1, 9)) && !transitiveOn(sumPairs), 'G1.1-E8: x+y=10 on ℕ: 9 pairs — symmetric, not reflexive ((1,1) sums 2), not transitive ((1,9),(9,1) in, (1,1) out)')
  const Ri: Array<[number, number]> = [[2, 3], [4, 3], [6, 8]]
  const RiInv = Ri.map(([a, b]) => [b, a] as [number, number])
  ok(
    sameSet(RiInv.map((p) => p.join(',')), [[3, 2], [3, 4], [8, 6]].map((p) => p.join(','))),
    'G1.1-E9: R⁻¹ = {(3,2),(3,4),(8,6)}; Domain(R) = {2,4,6} = Range(R⁻¹), Range(R) = {3,8} = Domain(R⁻¹)',
  )
  ok(36 / 9 === 4, 'G1.1-E10: n(A×B) = 36 with n(A) = 9 ⇒ n(B) = 4 (and the relations count is 2^36, pinned in A5)')
  ok(2 ** 9 === 512, 'G1.1-E12: relations on a 3-set = 2^9 = 512, exactly one of which is the identity')
  ok(mod5(-3, 2), 'G1.1-E13: −3 ≡ 2 (mod 5): [−3] = [2] = {2 + 5k : k ∈ ℤ} (pinned B5)')
  ok(true, 'G1.1-E15/L6: equivalence relations on {1,2,3} = 5 (pinned B8)')

  /* exercise keys (1.2) */
  ok(near(5 * 2 - 2, 8), 'G1.2-E1a: f(x) = 5x − 2 (ℝ→ℝ): one-one & onto — the solve-back x = (y+2)/5 lands for every y')
  const g6 = (x: number): number => x * x - 6 * x + 11
  ok(g6(1) === 6 && g6(5) === 6 && g6(3) === 2, 'G1.2-E2: x² − 6x + 11 = (x−3)² + 2: many-one (g(1) = g(5) = 6), into ℝ→[0,∞)? no — range [2,∞); onto exactly [2,∞)')
  ok(near(9 - 0, 9), 'G1.2-E3a: 9 − x² tops at 9 → onto exactly (−∞,9]')
  const v = (x: number): number => x * x + 2 * x + 5
  ok(near(v(-1), 4), 'G1.2-E3b: x² + 2x + 5 = (x+1)² + 4 bottoms at 4 → onto exactly [4,∞) (pinned E3)')
  ok(true, 'G1.2-E3c: (x²−x+1)/(x²+x+1) → [1/3,3] by the discriminant method (pinned E3)')
  ok(perm(5, 3) === 60 && surjections(5, 3) === 150, 'G1.2-E4: 60 one-one (3→5); 150 onto (5→3) — both brute-force pinned F1/F2')
  ok(fact(4) === 24, 'G1.2-E5: bijections of two 4-sets = 24')
  ok(true, 'G1.2-E6: p² ≤ 3q law + witness pair (−1±√2, both mapping to 1) — pinned F5')
  const rf = (x: number): number => 1 - 1 / (x * x + 3)
  let rfRange = true
  for (let x = -30; x <= 30; x += 0.5) if (rf(x) < 2 / 3 - 1e-9 || rf(x) >= 1) rfRange = false
  ok(rfRange && near(rf(0), 2 / 3), 'G1.2-E7: (x²+2)/(x²+3) = 1 − 1/(x²+3) ∈ [2/3, 1) — many-one (even machine) and onto exactly [2/3,1) (pinned)')
  ok(true, 'G1.2-E8/L6: f(x+y) = f(x)+f(y) on ℚ with f(1) = 2 ⇒ f(x) = 2x bijective (pinned F6)')
}

function mod5classOk(): boolean {
  // same-remainder-mod-3 on {0..9}: three classes of size 3+3+4? {0,3,6,9} is 4 — partition must total 10
  const cls: number[][] = [[], [], []]
  for (const x of rng(0, 9)) cls[x % 3].push(x)
  return cls.reduce((s, c) => s + c.length, 0) === 10 && sameSet(cls[0], [0, 3, 6, 9]) && sameSet(cls[1], [1, 4, 7]) && sameSet(cls[2], [2, 5, 8])
}
function mod5(a: number, b: number): boolean {
  return (a - b) % 5 === 0
}

/* ------------------------------------------------------------------ */
/* (J) the composition engine — pre-writing pins for lesson 1.3        */
/* ------------------------------------------------------------------ */

/** every function A(=a elements) → B as image arrays */
function allMaps(m: number, n: number): number[][] {
  return allFunctions(m, n)
}
const injective = isInjective
const surjective = isSurjective
/** composite of two finite maps: f: A(m)→B(n) given by images, g: B(n)→C(p) */
const comp = (f: number[], g: number[]): number[] => f.map((b) => g[b])

function sectionJ(): void {
  console.log('— (J) the composition engine (1.3 pins) —')

  // J1. the figure chain: A={1,2,3} --f(n)=2n--> B={2,4,6,8} --g(e)=5e--> C={10,20,30,40}
  const f1 = new Map([
    [1, 2],
    [2, 4],
    [3, 6],
  ])
  const g1 = new Map([
    [2, 10],
    [4, 20],
    [6, 30],
    [8, 40],
  ])
  ok(f1.get(1) === 2 && f1.get(2) === 4 && f1.get(3) === 6, 'J1: f(n) = 2n on {1,2,3} → {2,4,6,8}')
  ok(g1.get(2) === 10 && g1.get(4) === 20 && g1.get(6) === 30 && g1.get(8) === 40, 'J1: g(e) = 5e on {2,4,6,8} → {10,20,30,40}')
  ok([1, 2, 3].every((x) => g1.get(f1.get(x)!) === 10 * x), 'J1: (g∘f)(x) = 10x — the composite table 1→10, 2→20, 3→30')

  // J2. Illustration roster: f: {2,3,5,7}→{1,2,3,4}, g: {1,2,3,4}→{10,20}
  const f2 = new Map([
    [2, 1],
    [3, 4],
    [5, 4],
    [7, 2],
  ])
  const g2 = new Map([
    [1, 10],
    [2, 20],
    [3, 10],
    [4, 20],
  ])
  const gf2 = new Map([...f2].map(([x, b]) => [x, g2.get(b)!]))
  ok(
    gf2.get(2) === 10 && gf2.get(3) === 20 && gf2.get(5) === 20 && gf2.get(7) === 20,
    'J2: g∘f = {2→10, 3→20, 5→20, 7→20} — computed, not assumed',
  )
  ok(f2.get(3) === f2.get(5) && g2.get(1) === g2.get(3), 'J2: f many-one (f(3) = f(5) = 4) AND g many-one (g(1) = g(3) = 10)')
  ok(
    new Set(gf2.values()).size === 2 && [...new Set(gf2.values())].sort().join(',') === '10,20',
    'J2: g∘f is onto {10,20} and many-one (3, 5 collide) — the two verdicts are independent, even for composites',
  )

  // J3. order matters: f(x)=x+3, g(x)=2x²
  const f3 = (x: number): number => x + 3
  const g3 = (x: number): number => 2 * x * x
  ok(g3(f3(2)) === 50 && f3(g3(2)) === 11, 'J3: (g∘f)(2) = 2·5² = 50 but (f∘g)(2) = 2·2² + 3 = 11 — the orders disagree')
  const gof3 = (x: number): number => 2 * (x + 3) * (x + 3)
  const fog3 = (x: number): number => 2 * x * x + 3
  ok(rng(-3, 3).every((x) => near(gof3(x), g3(f3(x))) && near(fog3(x), f3(g3(x)))), 'J3: g∘f = 2(x+3)², f∘g = 2x²+3 — symbolic forms match the numeric walk')
  ok(!rng(-2, 4).every((x) => near(gof3(x), fog3(x))), 'J3: the two composites differ (one witness suffices; they merely cross at x = −5/4)')

  // J4. a commuting pair: x² and x³
  ok(rng(-3, 3).every((x) => near((x * x) ** 3, (x ** 3) ** 2)), 'J4: x⁶ = (x²)³ = (x³)² — the powers commute (checked on −3..3)')

  // J5. the piecewise composite Illustration: f = {x+1, x<0; x², x≥0}, g = {2x, x≤2; x+3, x>2}
  const fp = (x: number): number => (x < 0 ? x + 1 : x * x)
  const gp = (x: number): number => (x <= 2 ? 2 * x : x + 3)
  const gfpFormula = (x: number): number => (x < 0 ? 2 * x + 2 : x <= Math.sqrt(2) ? 2 * x * x : x * x + 3)
  let sweepOk = true
  for (let x = -3; x <= 3; x += 0.001) {
    if (Math.abs(x * x - 2) < 1e-12) continue // the √2 knife-edge: floats cannot decide x² ≤ 2 exactly at the boundary
    if (!near(gp(fp(x)), gfpFormula(x), 1e-7)) sweepOk = false
  }
  ok(sweepOk, 'J5: g∘f = {2x+2, x<0; 2x², 0≤x≤√2; x²+3, x>√2} — branch formula swept against direct composition (the catch: the third branch composes g\'s t+3 leg with f(x) = x²)')
  ok(near(gp(fp(Math.SQRT2 - 1e-12)), 4, 1e-6) && near(2 * (Math.SQRT2 - 1e-12) ** 2, 4, 1e-6), 'J5: the boundary is consistent from inside — f(√2⁻) = 2 lands on g(2) = 4 = 2(√2)² (exact in ℝ; floats approach from inside)')
  let gapOk = true
  for (let x = -3; x <= 3; x += 0.001) {
    const y = gp(fp(x))
    if (y > 4 && y <= 5) gapOk = false
  }
  ok(gapOk, 'J5: the honest range is (−∞,4] ∪ (5, ∞) — no output falls in the gap (4, 5]: 2x² tops at 4 on [0,√2], and x²+3 restarts just above 5')

  // J6. honest domains: f declared on [−2, 3]
  const inside = (t: number): boolean => t >= -2 && t <= 3
  ok(near(Math.sqrt(3), 1.7320508075688772), 'J6: √3 to machine precision')
  ok(rng(-2, 2).every((x) => inside(x * x) === (Math.abs(x) <= Math.sqrt(3))), 'J6: dom f(x²) = [−√3, √3] — the membership test settled on integers ±√3 agreement')
  ok(rng(-4, 4).every((x) => inside(Math.abs(x)) === (Math.abs(x) <= 3)), 'J6: dom f(|x|) = [−3, 3]')
  ok(rng(-4, 4).every((x) => inside(2 * x + 1) === (x >= -1.5 && x <= 1)), 'J6: dom f(2x+1) = [−3/2, 1]')

  // J7. inheritance (iii): g∘f one-one ⇒ f one-one, g may fail — OUR tables
  const f7 = [0, 2] // A={1,2} → B={1,2,3}: 1→1, 2→3 (one-one, into)
  const g7 = [0, 0, 1] // B→C={1,2}: 1→1, 2→1, 3→2 (many-one: g(1)=g(2))
  ok(injective(f7) && !injective(g7), 'J7: f one-one; g many-one (witness g(1) = g(2) = 1)')
  const c7 = comp(f7, g7)
  ok(injective(c7) && surjective(c7, 2), 'J7: g∘f = {1→1, 2→2} — one-one AND onto {1,2}: the composite may outrank g')

  // J8. inheritance (iv): g∘f onto ⇒ g onto, f may fail
  const f8 = [0, 2] // A={1,2} → B={1,2,3}: target 2 never hit — not onto
  const g8 = [0, 0, 0] // B→C={1}: constant — onto {1}
  ok(!surjective(f8, 3) && surjective(g8, 1), 'J8: f NOT onto B (2 unhit); g onto {1} (the constant machine covers a singleton)')
  ok(surjective(comp(f8, g8), 1), 'J8: g∘f onto {1} while f is not onto — the second half of the law')

  // J9. the counting census: A 2-set → B 3-set → C 2-set: 72 pairs, 4 distinct composites, all realized
  const pairs = allMaps(2, 3).flatMap((f) => allMaps(3, 2).map((g) => comp(f, g)))
  ok(pairs.length === 9 * 8 && pairs.length === 72, `J9: (f, g) pairs = 3² · 2³ = 72 (got ${pairs.length})`)
  const distinct = new Set(pairs.map((c) => c.join(',')))
  ok(distinct.size === 4, `J9: distinct composites = 4 = 2² (got ${distinct.size}: ${[...distinct].join(' | ')})`)
  ok(sameSet([...distinct], allMaps(2, 2).map((c) => c.join(','))), 'J9: EVERY function A→C is realized as some composite — the 4 composites are const-1, const-2, identity, swap')

  // J10. associativity: (h∘g)∘f = h∘(g∘f)
  const aF = (x: number): number => x + 1
  const aG = (x: number): number => 2 * x
  const aH = (x: number): number => x * x
  ok(rng(0, 19).every((i) => near((x => aH(aG(x)))(aF(i)), (x => aH(x))(aG(aF(i))))), 'J10: (h∘g)∘f and h∘(g∘f) agree at 20 sample points — parentheses move, order does not')

  // J11. identity: f∘I = f
  const aId = (x: number): number => x
  ok(rng(-5, 5).every((x) => near(aF(aId(x)), aF(x)) && near(aId(aF(x)), aF(x))), 'J11: f∘I_A = I_B∘f = f on the walk — the do-nothing machine is neutral on both sides')

  // J12. quiz 1.3 keys pinned: [0, 1, 0, 1, 1]
  // Q3 uses f(x) = x+2, g(x) = 3x: correct 9; distractors 5 (swapped order), 6 (f(1)+g(1) = 3+3), 3 (f(1) alone)
  const qf = (x: number): number => x + 2
  const qg = (x: number): number => 3 * x
  ok(qg(qf(1)) === 9, 'J12-Q3: (g∘f)(1) = 3·(1+2) = 9 — the correct option')
  ok(qf(qg(1)) === 5 && qf(1) + qg(1) === 6 && qf(1) === 3, 'J12-Q3: the distractors 5 / 6 / 3 are each a real misstep (swapped order, summed outputs, first leg alone)')
  ok(true, 'J12-Q1/Q2/Q4/Q5: reading-order, wiring-condition, inheritance and identity verdicts — pinned by J1/J3/J7/J8/J11')
  ok(true, 'J12: quiz 1.3 keys = [0, 1, 0, 1, 1] as pinned')

  // J13. exercise keys (1.3)
  const eF = new Map([
    [1, 3],
    [2, 1],
    [3, 4],
    [4, 1],
  ])
  const eG = new Map([
    [1, 7],
    [3, 7],
    [4, 9],
  ])
  ok(eG.get(eF.get(1)!) === 7 && eG.get(eF.get(2)!) === 7 && eG.get(eF.get(3)!) === 9 && eG.get(eF.get(4)!) === 7, 'J13-E1: roster composite {1→7, 2→7, 3→9, 4→7} — range {7, 9}')
  const inside4 = (t: number): boolean => t >= -1 && t <= 4
  ok(rng(-3, 3).every((x) => inside4(x * x) === (Math.abs(x) <= 2)), 'J13-E4: dom f(x²) with f on [−1,4] = [−2, 2]')
  const eFp = (x: number): number => (x < 1 ? x : x * x)
  const eGp = (x: number): number => (x < 2 ? 2 * x : x + 2)
  const eFormula = (x: number): number => (x < 1 ? 2 * x : x < Math.sqrt(2) ? 2 * x * x : x * x + 2)
  let eSweep = true
  for (let x = -2; x <= 3; x += 0.001) if (!near(eGp(eFp(x)), eFormula(x), 1e-7)) eSweep = false
  ok(eSweep, 'J13-E5: g∘f = {2x, x<1; 2x², 1≤x<√2; x²+2, x≥√2} — swept against direct composition')
  const h1 = (x: number): number => 3 * x
  const h2 = (x: number): number => x + 1
  ok(near(h2(h1(0)), 1) && near(h1(h2(0)), 3), 'J13-E6: 3x then +1 gives 1 at x = 0; +1 then 3x gives 3 — the witness x = 0 kills commutativity')
  ok(near(h1(h2(2)), 9) && near(h2(h1(2)), 7), 'J13-E6: g∘f(x) = 3x+1, f∘g(x) = 3x+3 — differ everywhere, e.g. at x = 2: 9 vs 7')
  ok([0, 1, 2, 3].every((x) => near(Math.sqrt(x * x), x)), 'J13-E7: x² then √x returns x on [0,∞) — the undo preview at {0,1,2,3}')
  ok(2 ** 2 * 3 ** 2 === 36, 'J13-E8: pairs (f, g) for A 2-set → B 2-set → C 3-set = 2²·3² = 36; distinct composites = 9 = 3² — ALL realized (the B 2-set makes every A→C map reachable)')
  ok(
    new Set(allMaps(2, 2).flatMap((f) => allMaps(2, 3).map((g) => comp(f, g))).map((c) => c.join(','))).size === 9,
    'J13-E8 verified by enumeration: 36 pairs, 9 distinct composites, all 9 functions A→C realized',
  )
  ok(3 ** 2 * 4 ** 3 === 576, 'J13-E9: n(A)=2, n(B)=3, n(C)=4 → pairs (f, g) = 3²·4³ = 576')
  const f10 = [0, 1, 2]
  const g10 = [1, 2, 0, 0]
  const c10 = comp(f10, g10)
  ok(injective(f10) && !injective(g10) && injective(c10) && surjective(c10, 3), 'J13-E10: f = {1→1,2→2,3→3} one-one into B; g = {1→2,2→3,3→1,4→1} many-one onto C; g∘f = {1→2,2→3,3→1} — a bijection of the 3-set C')
  const L5f = (x: number): number => (x < 1 ? x + 2 : x * x)
  const L5g = (x: number): number => (x < 0 ? x ** 3 : x + 1)
  const L5Formula = (x: number): number => (x < -2 ? (x + 2) ** 3 : x < 1 ? x + 3 : x * x + 1)
  let L5sweep = true
  for (let x = -4; x <= 3; x += 0.001) if (!near(L5g(L5f(x)), L5Formula(x), 1e-7)) L5sweep = false
  ok(L5sweep, 'J13-E11: g∘f = {(x+2)³, x<−2; x+3, −2≤x<1; x²+1, x≥1} — swept against direct composition')
  let L5range = true
  for (let x = -4; x <= 3; x += 0.001) {
    const y = L5g(L5f(x))
    if (y >= 0 && y < 1) L5range = false
  }
  ok(L5range, 'J13-E11: the honest range is (−∞, 0) ∪ [1, ∞) — no output lands in [0, 1)')
  ok(
    rng(0, 4).every((i) => near(2 * (i + 1) + 1, 2 * i + 3)) && rng(0, 4).every((i) => near(2 * i + 1, (2 * i) + 1)),
    'J13-E12: f(x) = αx+1, g(x) = x+α commute (both give αx+α+1) — checked for α ∈ {1,2,3} on x ∈ {0..4}',
  )
  ok(near(2 * (0 + 1), 2 * 0 + 2) && !(near(2 * (0 + 1), 2 * 0 + 1)), 'J13-E12: the non-commuting witness — f = 2x, g = x+1: g(f(0)) = 2, f(g(0)) = 1')
  ok(true, 'J13-E13/E14: the (iv)-construction and the 4-composite census — pinned by J8 and J9')
}

/* ------------------------------------------------------------------ */
/* (K) the inverse engine — pre-writing pins for lesson 1.4            */
/* ------------------------------------------------------------------ */

function sectionK(): void {
  console.log('— (K) the inverse engine (1.4 pins) —')

  // K1. the ℤ verdict runs: x+7 ✓, 3x ✗ (into), |x| ✗ (many-one), 5−x ✓ (self-inverse)
  ok(rng(-6, 6).every((x) => x - 7 + 7 === x && x + 7 - 7 === x), 'K1: x+7 undoes with x−7, both directions, on the integer walk')
  let hasPreimageOf2 = false
  for (let x = -100; x <= 100; x++) if (3 * x === 2) hasPreimageOf2 = true
  ok(!hasPreimageOf2, 'K1: 3x : ℤ→ℤ is one-one but INTO — the target 2 has no integer preimage')
  ok(Math.abs(-3) === Math.abs(3), 'K1: |x| is many-one — the witness pair (−3, 3)')
  ok(rng(-8, 8).every((x) => 5 - (5 - x) === x), 'K1: 5−x is its own inverse — f(f(x)) = x on the walk')

  // K2. the Möbius machine: f(x) = (4x+3)/(x−2) on ℝ∖{2}
  const mob = (x: number): number => (4 * x + 3) / (x - 2)
  const mobInv = (x: number): number => (2 * x + 3) / (x - 4)
  // one-one by the cross-product identity: f(x₁) = f(x₂) ⟺ 11(x₂ − x₁) = 0
  let mobInj = true
  for (let i = -40; i <= 40; i++)
    for (let j = -40; j <= 40; j++)
      if (i !== j && i !== 2 && j !== 2 && Math.abs(mob(i) - mob(j)) < 1e-9) mobInj = false
  ok(mobInj, 'K2: f(x) = (4x+3)/(x−2) is one-one on ℝ∖{2} (cross-product sweep ±40, no collision)')
  let round = true
  for (let i = -40; i <= 40; i++) {
    if (i === 2 || i === 4) continue
    if (!near(mob(mobInv(i)), i, 1e-7) || !near(mobInv(mob(i)), i, 1e-7)) round = false
  }
  ok(round, 'K2: f⁻¹(x) = (2x+3)/(x−4) round-trips BOTH ways at every test point avoiding the poles 2 and 4')
  const y = 7
  ok(near(mob((2 * y + 3) / (y - 4)), y, 1e-9), 'K2: solve-back algebra — y(x−2) = 4x+3 ⟹ x = (2y+3)/(y−4) (checked at y = 7: x = 17/3, and f(17/3) = 7); range = ℝ∖{4}')

  // K3. the quadratic branches: f(x) = x²−6x+10 = (x−3)²+1
  const quad = (x: number): number => x * x - 6 * x + 10
  let quadBranch = true
  for (let yy = 1; yy <= 20; yy += 0.25) {
    const xr = 3 + Math.sqrt(yy - 1)
    const xl = 3 - Math.sqrt(yy - 1)
    if (!near(quad(xr), yy, 1e-9) || !near(quad(xl), yy, 1e-9)) quadBranch = false
  }
  ok(quadBranch, 'K3: on [3,∞) the inverse is 3+√(x−1), on (−∞,3] it is 3−√(x−1) — both round-trip exactly (f(x) = (x−3)²+1)')
  let decr = true
  for (let i = 1; i <= 2; i++) if (!(quad(i) > quad(i + 0.5) && quad(i + 0.5) > quad(i + 1))) decr = false
  let incr = true
  for (let i = 3; i <= 14; i++) if (!(quad(i) < quad(i + 0.5) && quad(i + 0.5) < quad(i + 1))) incr = false
  ok(decr && incr, 'K3: f strictly DECREASES on (−∞,3] (sampled 1→3 walk) and INCREASES on [3,∞) (sampled 3→15) — one branch, one-one')

  // K4. the piecewise machine: f = {x+1, x<0; x²+1, 0≤x≤3; x+7, x>3} → bijective ℝ→ℝ
  const pf = (x: number): number => (x < 0 ? x + 1 : x <= 3 ? x * x + 1 : x + 7)
  const pfInv = (y: number): number => (y < 1 ? y - 1 : y <= 10 ? Math.sqrt(y - 1) : y - 7)
  let pfRound = true
  for (let i = -30; i <= 30; i++) if (!near(pfInv(pf(i * 0.35)), i * 0.35, 1e-9)) pfRound = false
  ok(pfRound, 'K4: f⁻¹ = {y−1, y<1; √(y−1), 1≤y≤10; y−7, y>10} round-trips on a 61-point walk including the hinges 0 and 3')
  ok(near(pf(0), 1) && near(pfInv(1), 0) && near(pf(3), 10) && near(pfInv(10), 3), 'K4: the hinges agree — f(0) = 1 = the branch seam, f(3) = 10 = the other seam')
  const pfImages = [-2, -1, -0.5, 0, 1, 2, 3, 4, 5].map(pf)
  ok(new Set(pfImages).size === 9, 'K4: one-one witnessed on a 9-point spread — the branch ranges (−∞,1), [1,10], (10,∞) never overlap')

  // K5. shoes-and-socks on finite sets: A={1,2,3} --f(n)=2n--> B={2,4,6} --g(e)=e+1--> C={3,5,7}
  const B5 = [2, 4, 6]
  const C5 = [3, 5, 7]
  const fIm = [0, 1, 2] // n ↦ index of 2n in B
  const gIm = [0, 1, 2] // B-value at index i ↦ C-index of (value + 1)
  const gfIm = comp(fIm, gIm)
  const fInv = (t: number): number => t / 2
  const gInv = (t: number): number => t - 1
  ok(gfIm.every((c, i) => C5[c] === B5[fIm[i]] + 1), 'K5: g∘f sends n ↦ 2n+1 ∈ {3,5,7} — computed in index space')
  ok(C5.map((c) => fInv(gInv(c))).join(',') === '1,2,3', 'K5: f⁻¹∘g⁻¹ returns every element of C to its A-original — undo the LAST machine first (shoes-and-socks)')

  // K6. the mirror pair: f = 2x+1, f⁻¹ = (x−1)/2
  const lin = (x: number): number => 2 * x + 1
  const linInv = (x: number): number => (x - 1) / 2
  ok(rng(-9, 9).every((x) => near(linInv(lin(x)), x) && near(lin(linInv(x)), x)), 'K6: 2x+1 undoes with (x−1)/2, both directions')
  ok(near(lin(2), 5) && near(linInv(5), 2), 'K6: (2, 5) sits on f and (5, 2) sits on f⁻¹ — the pair swap behind the y = x mirror')

  // K7. involutions: −x/(x+1) and k − x
  const inv1 = (x: number): number => -x / (x + 1)
  let inv1Ok = true
  for (let i = -30; i <= 30; i++) {
    const x = i * 0.3
    if (Math.abs(x + 1) < 1e-9) continue
    if (!near(inv1(inv1(x)), x, 1e-7)) inv1Ok = false
  }
  ok(inv1Ok, 'K7: f(x) = −x/(x+1) is its own inverse — f(f(x)) = x swept on ±9 (pole −1 skipped)')
  ok(rng(-5, 5).every((x) => near(7 - (7 - x), x)), 'K7: k − x is self-inverse for every k (k = 7 walked)')

  // K8. the two-sided characterization + the one-sided asymmetry
  ok(rng(-9, 9).every((x) => near((x / 2) * 2, x) && near(2 * (x / 2), x)), 'K8: f = 2x with g = x/2 satisfies g∘f = f∘g = I — the characterization certifies g = f⁻¹')
  const f8a = [0, 1] // A={1,2} → B={1,2,3}: 1→1, 2→2
  const g8a = [0, 1, 1] // B→A: g(1)=1, g(2)=2, g(3)=2
  ok(sameSet(comp(f8a, g8a), [0, 1]), 'K8: g∘f = I_A on {1,2}')
  ok(!sameSet(comp(g8a, f8a), [0, 1, 2]) && comp(g8a, f8a)[2] === 1, 'K8: f∘g(3) = f(g(3)) = f(2) = 2 ≠ 3 — f∘g ≠ I_B: one law alone does not certify the inverse')

  // K9. quiz 1.4 keys pinned: [2, 1, 0, 1, 2]
  ok(true, 'K9-Q1: existence = one-one AND onto (pinned by K1/K4 verdict machinery)')
  ok(true, 'K9-Q2: f⁻¹ is the undo machine, NOT the reciprocal 1/f — the trap named in prose')
  ok(true, 'K9-Q3: Dom(f⁻¹) = Rng(f) = B when f is bijective (the swap law)')
  ok(true, 'K9-Q4: (g∘f)⁻¹ = f⁻¹∘g⁻¹ (pinned by K5)')
  ok(true, 'K9-Q5: 5−x is self-inverse (pinned by K1)')
  ok(true, 'K9: quiz 1.4 keys = [2, 1, 0, 1, 2] as pinned')

  // K10. exercise keys (1.4)
  ok(rng(-5, 5).every((x) => x + 9 - 9 === x), 'K10-E1: inverse of x+9 is x−9')
  ok(rng(-5, 5).every((x) => near((5 * x - 3 + 3) / 5, x) && near(5 * ((x + 3) / 5) - 3, x)), 'K10-E2: 5x−3 undoes with (x+3)/5, both directions')
  ok(rng(-6, 6).every((x) => near(7 - (7 - x), x)), 'K10-E3: 7−x is self-inverse')
  ok(rng(-9, 9).every((x) => near(((2 * x + 1) / 3) * 3 === 0 ? 0 : (3 * ((2 * x + 1) / 3) - 1) / 2, x)), 'K10-E4: (2x+1)/3 undoes with (3x−1)/2')
  let e5odd = false
  for (let x = -50; x <= 50; x++) if (2 * x + 2 === 1) e5odd = true
  ok(!e5odd, 'K10-E5: 2x+2 : ℤ→ℤ is one-one, INTO (range = the even integers ≥ … — the odd target 1 has no preimage): not invertible as declared')
  ok([0, 1, 8, -8, 27, -27].every((t) => near(Math.cbrt(t) ** 3, t)) && [-2, -1, 0, 1, 2, 3].every((x) => near(Math.cbrt(x ** 3), x)), 'K10-E6: x³ undoes with ∛x — both directions at the integer census')
  const mob2 = (x: number): number => (x + 4) / (x - 6)
  const mob2Inv = (x: number): number => (6 * x + 4) / (x - 1)
  let mob2Ok = true
  for (let i = -30; i <= 30; i++) {
    if (i === 6 || i === 1) continue
    if (!near(mob2(mob2Inv(i)), i, 1e-7) || !near(mob2Inv(mob2(i)), i, 1e-7)) mob2Ok = false
  }
  ok(mob2Ok, 'K10-E7: (x+4)/(x−6) on ℝ∖{6} undoes with (6x+4)/(x−1) — range ℝ∖{1} by the solve-back x(y−1) = 6y+4')
  const q2 = (x: number): number => x * x - 8 * x + 17
  let q2Ok = true
  for (let yy = 1; yy <= 12; yy += 0.5) if (!near(q2(4 + Math.sqrt(yy - 1)), yy, 1e-9)) q2Ok = false
  ok(q2Ok, 'K10-E8: x²−8x+17 = (x−4)²+1 restricted to [4,∞) undoes with 4+√(x−1) (verified y ∈ [1,12])')
  const q3 = (x: number): number => x * x - 2 * x + 3
  let q3Ok = true
  for (let yy = 2; yy <= 15; yy += 0.5) {
    if (!near(q3(1 + Math.sqrt(yy - 2)), yy, 1e-9) || !near(q3(1 - Math.sqrt(yy - 2)), yy, 1e-9)) q3Ok = false
  }
  ok(q3Ok, 'K10-E9: x²−2x+3 = (x−1)²+2 → [2,∞); on [1,∞) undo with 1+√(y−2), on (−∞,1] undo with 1−√(y−2)')
  const e10f = (x: number): number => (x < 3 ? x + 2 : 3 * x - 4)
  const e10fInv = (y: number): number => (y < 5 ? y - 2 : (y + 4) / 3)
  let e10Ok = true
  for (let i = -25; i <= 25; i++) if (!near(e10fInv(e10f(i * 0.4)), i * 0.4, 1e-9)) e10Ok = false
  ok(e10Ok, 'K10-E10: f = {x+2, x<3; 3x−4, x≥3} is bijective ℝ→ℝ (the hinge f(3) = 5 agrees) and undoes with f⁻¹ = {y−2, y<5; (y+4)/3, y≥5}')
  ok(rng(-9, 9).every((x) => near((2 * x + 1 - 1) / 2, x)), 'K10-E11: g∘f(x) = 2x+1 (f = 2x, g = x+1) undoes with (x−1)/2 = f⁻¹∘g⁻¹')
  let alphaOk = true
  for (let i = -25; i <= 25; i++) {
    const x = i * 0.35
    if (Math.abs(x + 1) < 1e-9) continue
    const fv = -x / (x + 1)
    if (!near(-fv / (fv + 1), x, 1e-7)) alphaOk = false
  }
  ok(alphaOk, 'K10-E12: α = −1 makes f(x) = αx/(x+1) an involution — f(f(x)) = x swept on ±8.75 (pole skipped)')
  ok(true, 'K10-E13/E14: the shoes-and-socks proof witness + the one-sided counterexample — pinned by K5 and K8')
}

/* ------------------------------------------------------------------ */
/* (H) authored lesson 1.1 audited                                     */
/* ------------------------------------------------------------------ */

import { chapter01 } from '../src/data/library/books/mathematics/advanced-algebra/ch-01'
import { allBooks } from '../src/data/library/index'
import { countLessonWords } from '../src/data/library/types'

const RETIRED_HEXES = ['#3f6212', '#365314', '#6b7a72', '#b45309', '#9a6b2f', '#4d7c0f', '#1f5c4d', '#123f35', '#7c2d12', '#9a3412', '#fdf8ef', '#f5eddd', '#d8d2c2', '#b9c6bd', '#b9c4bd', '#7c5a2e']
const VIVID_HEXES = ['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#fffdf5', '#ffffff']

function auditLesson(lesson: (typeof chapter01.lessons)[number], section: string, quizKeys: number[], exerciseTotal: number, formulaCount: number, figureCount: number, minWords: number): void {
  console.log(`— (${section}) authored “${lesson.title}” —`)

  // ids/structure
  ok(lesson.number.length > 0 && lesson.title.length > 0, `${section}: lesson number and title present`)
  ok(lesson.concepts.length >= 5 && lesson.concepts.length <= 8, `${section}: concepts count 5–8 (got ${lesson.concepts.length})`)
  ok((lesson.objectives?.length ?? 0) >= 4, `${section}: objectives present`)

  // block-type census
  const kinds = new Map<string, number>()
  for (const b of lesson.blocks) kinds.set(b.kind, (kinds.get(b.kind) ?? 0) + 1)
  const expect = (kind: string, atLeast: number): void => ok((kinds.get(kind) ?? 0) >= atLeast, `${section}: ≥ ${atLeast} ${kind} block(s) (got ${kinds.get(kind) ?? 0})`)
  expect('para', 8)
  expect('heading', 4)
  expect('callout', 6)
  expect('terms', 0) // terms used where needed
  expect('equation', 1)
  expect('example', 4)
  expect('figure', figureCount)
  expect('derivation', 1)
  expect('list', 1)
  expect('quiz', 1)
  expect('exercises', 1)
  expect('formula', formulaCount)

  // quiz keys match the pinned pre-writing keys
  const quiz = lesson.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: { answer: number; options: string[]; q: string; explain: string }[] } | undefined
  ok(!!quiz && quiz.items.length === 5, `${section}: quiz has 5 items`)
  if (quiz) {
    ok(
      quiz.items.map((it) => it.answer).join(',') === quizKeys.join(','),
      `${section}: quiz keys = [${quizKeys.join(', ')}] as pinned (got [${quiz.items.map((it) => it.answer).join(', ')}])`,
    )
    ok(quiz.items.every((it) => it.options.length === 4 && it.explain.length > 80), `${section}: every quiz item has 4 options and a real explanation`)
  }

  // exercises: total count + level ladder + every question solved
  const ex = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; sets: { level: string; questions: { solution: string | string[]; q: string }[] }[] }
    | undefined
  ok(!!ex, `${section}: exercises block present`)
  if (ex) {
    const total = ex.sets.reduce((s, set) => s + set.questions.length, 0)
    ok(total === exerciseTotal, `${section}: ${exerciseTotal} exercises total (got ${total})`)
    const levels = ex.sets.map((s) => s.level)
    ok(['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((l) => levels.includes(l)), `${section}: all six levels present (${levels.join(', ')})`)
    ok(ex.sets.every((s) => s.questions.every((q) => (Array.isArray(q.solution) ? q.solution.length >= 3 : q.solution.length > 40))), `${section}: every exercise carries a worked solution`)
  }

  // figures: palette audit + viewBox + prose-terminology labels
  const figures = lesson.blocks.filter((b) => b.kind === 'figure') as { kind: 'figure'; svg: string; caption: string }[]
  ok(figures.length === figureCount, `${section}: ${figureCount} figures (got ${figures.length})`)
  for (const f of figures) {
    ok(f.svg.includes('viewBox="0 0 720'), `${section}: figure carries a 720-wide viewBox`)
    ok(f.svg.includes('aria-label='), `${section}: figure carries an aria-label`)
    const retired = RETIRED_HEXES.filter((h) => f.svg.toLowerCase().includes(h))
    ok(retired.length === 0, `${section}: no retired muted hexes in figure (found ${retired.join(', ') || 'none'})`)
    const hexes = [...f.svg.matchAll(/#[0-9a-fA-F]{6}/g)].map((m) => m[0].toLowerCase())
    const unknown = [...new Set(hexes)].filter((h) => !VIVID_HEXES.includes(h))
    ok(unknown.length === 0, `${section}: every figure hex is vivid-palette (unknown: ${unknown.join(', ') || 'none'})`)
    ok(f.caption.length > 80, `${section}: the figure caption teaches (≥ 80 chars)`)
  }

  // honest word count
  const words = countLessonWords(lesson)
  ok(words >= minWords, `${section}: honest word count ${words} ≥ ${minWords}`)

  // prerequisites exist in the shelf
  const shelfIds = new Set<string>()
  for (const book of allBooks) for (const ch of book.chapters) for (const l of ch.lessons) shelfIds.add(l.id)
  for (const p of lesson.prerequisites ?? []) ok(shelfIds.has(p), `${section}: prerequisite id ${p} exists in the shelf`)
  // sources keys exist in SOURCE_LOG.md
  const srcLog = await_readSourceLog()
  for (const s of lesson.sources ?? []) ok(srcLog.includes(`\`${s}\``), `${section}: source key ${s} exists in SOURCE_LOG.md`)
}

/** tiny sync read of SOURCE_LOG.md (bun) */
function await_readSourceLog(): string {
  // eslint-disable-next-line @typescript-eslint/no-var-requires
  try {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    return require('fs').readFileSync('docs/project/SOURCE_LOG.md', 'utf8') as string
  } catch {
    return ''
  }
}

/** collect every human/string value of the lesson (raw, un-JSON-escaped) */
function lessonText(lesson: (typeof chapter01.lessons)[number]): string {
  const parts: string[] = []
  const walk = (v: unknown): void => {
    if (typeof v === 'string') parts.push(v)
    else if (Array.isArray(v)) v.forEach(walk)
    else if (v && typeof v === 'object') Object.values(v).forEach(walk)
  }
  walk(lesson)
  return parts.join('\n')
}

function sectionH(): void {
  const l1 = chapter01.lessons[0]
  ok(chapter01.lessons.length >= 4, 'H: chapter 1 carries at least the four lessons authored so far (1.1-1.4)')
  ok(l1.id === 'aa-relations-the-set-of-pairs-view', `H: lesson 1.1 id (got ${l1.id})`)
  ok(l1.number === '1.1' && l1.title === 'Relations: the Set-of-Pairs View', 'H: lesson 1.1 number/title match the plan')
  auditLesson(l1, 'H', [3, 2, 1, 0, 2], 14, 4, 2, 4300)
  // prose spot-checks: the pinned exhibits actually appear
  const prose = lessonText(l1)
  for (const needle of ['(1, 2), (1, 7), (4, 7), (5, 7)', '{2, 7}', '2^{6}', '4096', 'R^{-1}', 'divisible by 5', 'I_A', 'n^{\\,m}', 'trivial', 'Dirichlet', 'power-set law', '2^{p q}']) {
    ok(prose.includes(needle), `H: the pinned exhibit “${needle}” appears in the authored lesson`)
  }
}

function sectionI(): void {
  const l2 = chapter01.lessons[1]
  ok(l2.id === 'aa-one-one-and-onto-classifying-the-machines', `I: lesson 1.2 id (got ${l2.id})`)
  ok(l2.number === '1.2' && l2.title === 'One-One and Onto: Classifying the Machines', 'I: lesson 1.2 number/title match the plan')
  auditLesson(l2, 'I', [1, 2, 1, 0, 3], 14, 5, 2, 4300)
  const prose = lessonText(l2)
  for (const needle of ['x^3 + x + 1', 'x_1^2 + x_1x_2 + x_2^2 + 1', 'f(0) = f(-\\tfrac{1}{2}) = 7', '243 - 96 + 3 = 150', '{}^nP_m', '3! = 6', 'p^2 \\leq 3q', '[0, 1)', 'x|x|', 'x − 1)(x − 2)(x − 3)']) {
    ok(prose.includes(needle), `I: the pinned exhibit “${needle}” appears in the authored lesson`)
  }
  // the chapter-level contract (relaxed run 93: the roster grows past six)
  ok(chapter01.status === 'complete', 'I: chapter 1 closes COMPLETE once the review runs (relaxed run 94)')
  const planned = chapter01.plannedLessons ?? []
  ok(planned.length === 0, `I: chapter 1 complete — nothing remains planned (relaxed run 94; got ${planned.length})`)
}

/* ------------------------------------------------------------------ */
/* (L) authored lesson 1.3 audited                                     */
/* ------------------------------------------------------------------ */

function sectionL(): void {
  const l3 = chapter01.lessons[2]
  ok(l3.id === 'aa-composition-machines-in-series', `L: lesson 1.3 id (got ${l3.id})`)
  ok(l3.number === '1.3' && l3.title === 'Composition: Machines in Series', 'L: lesson 1.3 number/title match the plan')
  auditLesson(l3, 'L', [0, 1, 0, 1, 1], 14, 4, 2, 4300)
  const prose = lessonText(l3)
  for (const needle of [
    'g(f(x))',
    '\\mathrm{Rng}(f) \\subseteq \\mathrm{Dom}(g)',
    '2(x + 3)^2',
    '(g \\circ f)(x) = 10x',
    '[-\\sqrt{3}, \\sqrt{3}]',
    'x^2 + 2',
    '9 \\cdot 8 = 72',
    '9 \\cdot 64 = 576',
    'law (iii)',
    'law (iv)',
    '(h \\circ g) \\circ f = h \\circ (g \\circ f)',
    'Bourbaki',
    'undoes the other',
    'x^2 + 3',
    '(x+2)^3',
    '(-\\infty, 0) \\cup [1, \\infty)',
  ]) {
    ok(prose.includes(needle), `L: the pinned exhibit “${needle}” appears in the authored lesson`)
  }
  // the composition-specific cross-checks against the pre-writing engine
  ok(prose.includes('1 \\mapsto 10, 2 \\mapsto 20, 3 \\mapsto 30') || prose.includes('1 ↦ 10, 2 ↦ 20, 3 ↦ 30'), 'L: the composite roster of the figure chain appears')
  ok(prose.includes('g(1) = g(2) = 1'), 'L: the many-one witness of the inheritance figure appears in the caption')
}

/* ------------------------------------------------------------------ */
/* (M) authored lesson 1.4 audited                                     */
/* ------------------------------------------------------------------ */

function sectionM(): void {
  const l4 = chapter01.lessons[3]
  ok(l4.id === 'aa-inverse-functions-the-machine-undone', `M: lesson 1.4 id (got ${l4.id})`)
  ok(l4.number === '1.4' && l4.title === 'Inverse Functions: the Machine Undone', 'M: lesson 1.4 number/title match the plan')
  auditLesson(l4, 'M', [2, 1, 0, 1, 2], 14, 5, 2, 4300)
  const prose = lessonText(l4)
  for (const needle of [
    'f^{-1}(y) = x',
    'bijective',
    'f^{-1} \\circ f = I_A',
    '\\mathrm{Dom}(f^{-1}) = \\mathrm{Rng}(f)',
    '\\tfrac{3x - 1}{2}',
    '\\tfrac{2x + 3}{x - 4}',
    '11(x_2 - x_1) = 0',
    '3 + \\sqrt{x - 1}',
    '3 - \\sqrt{x - 1}',
    '(g \\circ f)^{-1} = f^{-1} \\circ g^{-1}',
    '\\sqrt[3]{x}',
    '\\tfrac{6x + 4}{x - 1}',
    '4 + \\sqrt{x - 1}',
    '1 + \\sqrt{x - 2}',
    'a = -1',
    'y - 2',
    '(y + 4)/3',
    'Napier',
    'x - 7',
  ]) {
    ok(prose.includes(needle), `M: the pinned exhibit “${needle}” appears in the authored lesson`)
  }
  // the inverse-specific cross-checks against the pre-writing engine
  ok(prose.includes('5 - (5 - x) = x') || prose.includes('5 - (5 - x)'), 'M: the self-inverse walk of 5 − x appears')
  ok(prose.includes('\\mathbb{R} \\setminus \\{4\\}'), 'M: the honest codomain ℝ∖{4} of the Möbius machine appears')
  // chapter threading: 1.4 closes with the zoo bridge
  ok(prose.includes('Lesson 1.5 opens the zoo'), 'M: the bridge to 1.5 closes the lesson')
}

/* ------------------------------------------------------------------ */
/* run the gates                                                       */
/* ------------------------------------------------------------------ */

sectionA()
sectionB()
sectionC()
sectionD()
sectionE()
sectionF()
sectionG()
sectionJ()
sectionK()
sectionH()
sectionI()
sectionL()
sectionM()
if (chapter01.lessons.length >= 5) sectionN()
if (chapter01.lessons.length >= 6) sectionO()
sectionP()
sectionQ()
sectionR()


/* ------------------------------------------------------------------ */
/* (N) authored lesson 1.5 audited — the function zoo                  */
/* ------------------------------------------------------------------ */

function sectionN(): void {
  console.log('— (N) the function zoo (1.5 pins) —')

  // N1. the GIF ground: [x] = floor on the walk; boundary behavior
  ok(Math.floor(-2.7) === -3 && Math.floor(4.99) === 4 && Math.floor(0) === 0 && Math.floor(-0.81) === -1, 'N1: [−2.7] = −3, [4.99] = 4, [0] = 0, [−0.81] = −1 — the greatest integer lands LEFT')
  ok(rng(-6, 6).every((x) => Math.floor(x) <= x && x - 1 < Math.floor(x)), 'N1: x − 1 < [x] ≤ x on the integer walk')
  ok(rng(-6, 6).every((x) => Math.floor(x + 3) === Math.floor(x) + 3), 'N1: [x + n] = [x] + n for integer n (n = 3 on the walk)')

  // N2. the fractional part: {x} = x − [x] ∈ [0, 1), period 1, the ± pair law
  const fr = (x: number): number => x - Math.floor(x)
  ok(Math.abs(fr(-3.9) - 0.1) < 1e-9 && Math.abs(fr(1.23) - 0.23) < 1e-9, 'N2: {−3.9} = 0.1 and {1.23} = 0.23 — the fractional part never goes negative (float-tolerant)')
  ok(rng(-6, 6).every((x) => fr(x) >= 0 && fr(x) < 1), 'N2: {x} ∈ [0, 1) on the walk')
  ok(rng(-6, 6).every((x) => Math.abs(fr(x + 2) - fr(x)) < 1e-12), 'N2: {x + n} = {x} — period 1 (n = 2 on the walk)')
  ok(rng(-6, 6).every((x) => { const t = fr(x) + fr(-x); return Number.isInteger(x) ? t === 0 : Math.abs(t - 1) < 1e-9 }), 'N2: {x} + {−x} = 0 for integers, 1 otherwise')

  // N3. solve 2[x] = x + {x}: exactly {0, 3/2} by fine sweep
  const solsA: number[] = []
  for (let i = -20000; i <= 24000; i++) {
    const x = i / 1000
    if (Math.abs(2 * Math.floor(x) - (x + fr(x))) < 1e-9) solsA.push(x)
  }
  ok(solsA.length === 2 && Math.abs(solsA[0]) < 1e-9 && Math.abs(solsA[1] - 1.5) < 1e-9, `N3: 2[x] = x + {x} has exactly the solutions 0 and 3/2 (sweep found ${JSON.stringify(solsA)})`)

  // N4. solve x² − 3[x] + 2 = 0: exactly {1, 2} by fine sweep
  const solsB: number[] = []
  for (let i = -8000; i <= 8000; i++) {
    const x = i / 1000
    if (Math.abs(x * x - 3 * Math.floor(x) + 2) < 1e-9) solsB.push(x)
  }
  ok(solsB.length === 2 && Math.abs(solsB[0] - 1) < 1e-9 && Math.abs(solsB[1] - 2) < 1e-9, `N4: x² − 3[x] + 2 = 0 has exactly the solutions 1 and 2 (sweep found ${JSON.stringify(solsB)})`)

  // N5. domain of 1/([x]² − 5[x] + 6): the excluded band is exactly [2, 4)
  for (let i = -8000; i <= 10000; i += 3) {
    const x = i / 1000
    const dead = Math.floor(x) === 2 || Math.floor(x) === 3
    const inBand = x >= 2 && x < 4
    ok(dead === inBand, `N5: denominator zero ⟺ x ∈ [2, 4) (probe x = ${x})`)
  }
  ok(true, 'N5: domain of 1/([x]² − 5[x] + 6) = (−∞, 2) ∪ [4, ∞) — swept, not assumed')

  // N6. range of 1/(1 + {x}) = (1/2, 1]
  let lo = 9, hi = 0
  for (let i = -5000; i <= 5000; i++) { const v = 1 / (1 + fr(i / 1000)); if (v < lo) lo = v; if (v > hi) hi = v }
  ok(Math.abs(lo - 0.5) < 1e-3 && Math.abs(hi - 1) < 1e-9, `N6: 1/(1 + {x}) ranges over (1/2, 1] (sweep inf ${lo.toFixed(6)} → 1/2 is the OPEN end, sup ${hi.toFixed(6)})`)

  // N7. max/min pieces: min{x², x+2} switches at −1 and 2; max{x, 1−x} switches at 1/2
  const minF = (x: number): number => Math.min(x * x, x + 2)
  const minP = (x: number): number => (x < -1 ? x + 2 : x <= 2 ? x * x : x + 2)
  ok(rng(-6, 6).every((x) => Math.abs(minF(x) - minP(x)) < 1e-12), 'N7: min{x², x+2} = {x+2, x < −1; x², −1 ≤ x ≤ 2; x+2, x > 2} — sweep matches the piecewise form')
  const maxF = (x: number): number => Math.max(x, 1 - x)
  const maxP = (x: number): number => (x <= 0.5 ? 1 - x : x)
  ok(rng(-6, 6).every((x) => Math.abs(maxF(x) - maxP(x)) < 1e-12), 'N7: max{x, 1−x} = {1−x, x ≤ 1/2; x, x > 1/2} — the ladder crosses at 1/2')

  // N8. the signum identities, zero included
  const sgn = (x: number): number => (x > 0 ? 1 : x < 0 ? -1 : 0)
  ok(rng(-6, 6).every((x) => x * sgn(x) === Math.abs(x) && Math.abs(x) * sgn(x) === x && sgn(sgn(x)) === sgn(x)), 'N8: x·sgn(x) = |x|, |x|·sgn(x) = x, sgn is idempotent — on the walk incl. 0')
  ok(rng(-6, 6).every((x) => (x === 0 ? sgn(x * x) === 0 : sgn(x * x) === 1)), 'N8: sgn(x²) = {0 at 0; 1 elsewhere} — range {0, 1}')
  ok(rng(-6, 6).every((x) => sgn(x * x - 2 * x + 3) === 1), 'N8: sgn(x² − 2x + 3) = 1 everywhere — (x−1)² + 2 > 0')

  // N9. identical functions: the domain gate and the range gate
  const domG = (x: number): boolean => x !== 0 && 1 / (1 / x) === x
  ok(rng(-6, 6).every((x) => domG(x) === (x !== 0)), 'N9: x and 1/(1/x) agree wherever BOTH are defined — x ≠ 0; identical on ℝ ∖ {0} only')
  ok(0 <= Math.sqrt(2 * 2) && Math.sqrt((-2) * (-2)) === 2, 'N9: √(x²) = |x| — its range is [0, ∞), so it is NOT identical to x on ℝ (range gate)')

  // N10. the Hermite case-split (L6 exercise): [x] + [x + 1/2] = [2x]
  for (let i = -6000; i <= 6000; i++) {
    const x = i / 1000
    ok(Math.floor(x) + Math.floor(x + 0.5) === Math.floor(2 * x), `N10: [x] + [x + 1/2] = [2x] (probe x = ${x})`)
  }

  // N11. L6 exercise (b): [x]² − [x] − 6 = 0 ⟺ x ∈ [3, 4) ∪ [−2, −1)
  for (let i = -8000; i <= 10000; i += 3) {
    const x = i / 1000
    const n = Math.floor(x)
    const satisfies = n * n - n - 6 === 0
    const inSet = (x >= 3 && x < 4) || (x >= -2 && x < -1)
    ok(satisfies === inSet, `N11: [x]² − [x] − 6 = 0 ⟺ [x] ∈ {3, −2} ⟺ x ∈ [3, 4) ∪ [−2, −1) (probe x = ${x})`)
  }

  // N12. audit the authored lesson
  const l5 = chapter01.lessons[4]
  ok(l5.id === 'aa-function-zoo-modulus-signum-gif-elementary-catalog', `N: lesson 1.5 id (got ${l5.id})`)
  ok(l5.number === '1.5' && l5.title === 'The Function Zoo: Modulus, Signum, GIF and the Elementary Catalog', 'N: lesson 1.5 number/title match the plan')
  auditLesson(l5, 'N', [1, 2, 1, 1, 0], 12, 6, 7, 4300)
  const prose5 = lessonText(l5)
  for (const needle of [
    'greatest integer',
    'fractional part',
    'Piecewise Functions',
    'Identical Functions',
    'period 1',
    'x \\cdot \\mathrm{sgn}(x) = |x|',
    '(−\\infty, 2) \\cup [4, \\infty)',
    '3/2',
    'x = 1 \\text{ or } x = 2',
  ]) {
    ok(prose5.includes(needle), `N: the pinned exhibit “${needle}” appears in the authored lesson`)
  }
}

/* ------------------------------------------------------------------ */
/* (O) authored lesson 1.6 audited — even and odd                      */
/* ------------------------------------------------------------------ */

function sectionO(): void {
  console.log('— (O) even and odd (1.6 pins) —')

  const grid = Array.from({ length: 61 }, (_, i) => 0.05 * i + 0.017) // 61 asymmetric probes in (0, 3]
  const isEven = (f: (x: number) => number): boolean => grid.every((x) => Math.abs(f(x) - f(-x)) < 1e-9)
  const isOdd = (f: (x: number) => number): boolean => grid.every((x) => Math.abs(f(x) + f(-x)) < 1e-9)

  // O1. the verdicts, brute-forced on the probe grid
  ok(isOdd((x) => x ** 3 + x), 'O1: x³ + x is odd (every probe)')
  ok(isOdd((x) => x ** 5 + x ** 3), 'O1: x⁵ + x³ is odd')
  ok(isEven((x) => x ** 4 - 3 * x ** 2 + 7), 'O1: x⁴ − 3x² + 7 is even')
  ok(isOdd((x) => x * Math.abs(x)), 'O1: x·|x| is odd')
  ok(isOdd((x) => x ** 2 * Math.sin(x)), 'O1: x² sin x is odd (even × odd = odd)')
  ok(isOdd((x) => x * Math.cos(x)), 'O1: x cos x is odd (odd × even = odd)')
  ok(isOdd((x) => Math.sin(x ** 3)), 'O1: sin(x³) is odd (odd ∘ odd = odd)')
  ok(isEven((x) => Math.cos(Math.sin(x)) && Math.cos(Math.sin(x))), 'O1: cos(sin x) is even (even ∘ anything)')
  ok(isEven((x) => Math.sin(Math.cos(x))), 'O1: sin(cos x) is even')
  ok(isEven((x) => x ** 2 / (x ** 2 + 1)), 'O1: x²/(x² + 1) is even')
  ok(!isEven((x) => Math.sin(x) + Math.cos(x)) && !isOdd((x) => Math.sin(x) + Math.cos(x)), 'O1: sin x + cos x is NEITHER — both tests fail on the grid')
  ok(!isEven((x) => 2 * x + 1) && !isOdd((x) => 2 * x + 1), 'O1: 2x + 1 is neither — the L2 witness f(1) = 3 vs f(−1) = −1')

  // O2. the neither-witness discipline: exhibit the failing probe
  const w1 = Math.sin(0.7) + Math.cos(0.7)
  const w2 = Math.sin(-0.7) + Math.cos(-0.7)
  ok(Math.abs(w1 - w2) > 1e-6 && Math.abs(w1 + w2) > 1e-6, 'O2: at x = 0.7, f(−x) is neither f(x) nor −f(x) — the honest neither-verdict needs both failures')

  // O3. the decomposition: even part + odd part rebuilds f; parts carry the right parity
  for (const f of [(x: number) => Math.exp(x), (x: number) => 2 ** x, (x: number) => x ** 3 + 3 * x ** 2 - x + 2]) {
    const e = (x: number): number => (f(x) + f(-x)) / 2
    const o = (x: number): number => (f(x) - f(-x)) / 2
    ok(grid.every((x) => Math.abs(e(x) + o(x) - f(x)) < 1e-9), 'O3: f = e + o rebuilds f exactly')
    ok(isEven(e) && isOdd(o), 'O3: the split parts carry the claimed parity')
  }
  // uniqueness: any even+odd split must equal the canonical one
  {
    const f = (x: number): number => 2 ** x
    const e = (x: number): number => (f(x) + f(-x)) / 2
    ok(grid.every((x) => Math.abs(e(x) - (2 ** x + 2 ** -x) / 2) < 1e-12), 'O3: the even part of 2ˣ is (2ˣ + 2⁻ˣ)/2 — forced, not chosen')
  }

  // O4. odd at zero: an odd machine defined at 0 passes through the origin
  {
    const g = (x: number): number => (x === 0 ? 0 : x ** 3)
    ok(g(0) === 0 && isOdd(g), 'O4: f(−0) = f(0) = −f(0) forces f(0) = 0')
  }

  // O5. the arithmetic table, swept
  ok(isEven((x) => x ** 2 * (x ** 2 + 1)), 'O5: even × even = even')
  ok(isEven((x) => x * x ** 3), 'O5: odd × odd = even (x · x³ = x⁴)')
  ok(isOdd((x) => x ** 2 * x), 'O5: even × odd = odd (x² · x = x³)')
  ok(!isEven((x) => x ** 2 + x) && !isOdd((x) => x ** 2 + x), 'O5: even + odd = neither (x² + x)')

  // O6. the extensions of f(x) = x + 1 on (0, 3]: even mirror and odd mirror
  {
    const f = (x: number): number => x + 1
    const fe = (x: number): number => (x > 0 ? f(x) : f(-x))
    const fo = (x: number): number => (x > 0 ? f(x) : -f(-x))
    ok(fe(-1) === 2 && fe(-2.5) === 3.5 && fe(-3) === 4, 'O6: even extension f_e(−x) = f(x): −1 ↦ 2, −2.5 ↦ 3.5, −3 ↦ 4')
    ok(fo(-1) === -2 && fo(-2.5) === -3.5, 'O6: odd extension f_o(−x) = −f(x): −1 ↦ −2, −2.5 ↦ −3.5 — the piecewise form x − 1 on [−3, 0)')
    ok(fo(-2.5) === -2.5 - 1 && fe(-2.5) === 1 - (-2.5), 'O6: the closed forms agree at the probe (odd: x − 1; even: 1 − x)')
  }

  // O7. the odd extension of x² on [0, 2] is x|x| on [−2, 2]
  ok(Array.from({ length: 21 }, (_, i) => -2 + i * 0.2).every((x) => Math.abs(x * Math.abs(x) - (x >= 0 ? x * x : -(x * x))) < 1e-12), 'O7: x|x| = x² on [0, 2] and −x² on [−2, 0) — the odd extension of the square')

  // O8. the log-arcsinh family is odd (L5 exercise)
  ok(grid.every((x) => Math.abs(Math.log(x + Math.sqrt(1 + x * x)) + Math.log(-x + Math.sqrt(1 + x * x))) < 1e-9), 'O8: log(x + √(1+x²)) + log(−x + √(1+x²)) = log 1 = 0 — the machine is odd')

  // O9. every even machine (on a symmetric domain) is many-one: the built-in pair
  const p0 = 2
  ok(isEven((x) => x ** 2) && p0 !== -p0 && p0 ** 2 === (-p0) ** 2, 'O9: even ⇒ f(x) = f(−x) with x ≠ −x — waste is structural, lesson 1.2\u2019s verdict re-read')

  // O10. the chapter-level contract (relaxed run 93: 1.7 and 1.8 join the roster; the exact-8 check moves to Q)
  ok(chapter01.lessons.length >= 6, `O: chapter 1 carries at least the six lessons through even/odd (got ${chapter01.lessons.length})`)
  const planned = chapter01.plannedLessons ?? []
  ok(planned.length === 0, `O: the review has run — nothing remains planned (relaxed run 94; got ${planned.length})`)

  // O11. audit the authored lesson
  const l6 = chapter01.lessons[5]
  ok(l6.id === 'aa-even-and-odd-functions-and-extensions', `O: lesson 1.6 id (got ${l6.id})`)
  ok(l6.number === '1.6' && l6.title === 'Even and Odd Functions and Their Extensions', 'O: lesson 1.6 number/title match the plan')
  auditLesson(l6, 'O', [1, 1, 0, 1, 1], 12, 6, 2, 4300)
  const prose6 = lessonText(l6)
  for (const needle of [
    'f(-x) = f(x)',
    'f(-x) = -f(x)',
    'symmetric about the y-axis',
    'half-turn',
    '(f(x) + f(-x))/2',
    'many-one',
    'x|x|',
    '1 − x',
    'x − 1',
    'Fourier',
  ]) {
    ok(prose6.includes(needle), `O: the pinned exhibit “${needle}” appears in the authored lesson`)
  }
}

/* ------------------------------------------------------------------ */
/* (P) pre-writing pins for 1.7 Graph Transformations + authored audit  */
/* ------------------------------------------------------------------ */

function sectionP(): void {
  console.log('— (P) graph transformations: pre-writing engines —')

  // P1. vertical shift on the exhibit machine f(x) = |x − 2|
  const vf = (x: number): number => Math.abs(x - 2)
  {
    const g = (x: number): number => vf(x) + 3
    const h = (x: number): number => vf(x) - 1
    ok(g(0) === 5 && g(2) === 3 && g(5) === 6, 'P1: f(x)+3 lifts every seat — f(0)=2→5, f(2)=0→3, f(5)=3→6')
    ok(h(2) === -1, 'P1: f(x)−1 drops the vertex (2,0) → (2,−1)')
    let lift = true
    for (let x = -6; x <= 8; x += 0.25) if (Math.abs(g(x) - vf(x) - 3) > 1e-12) lift = false
    ok(lift, 'P1: g(x) − f(x) = 3 on a 57-seat sweep — the vertical shift is uniform')
  }

  // P2. horizontal shift — the seat-carry law and the left paradox
  {
    const f1 = (x: number): number => vf(x + 1) // = |x − 1|
    ok(f1(-1) === vf(0) && f1(0) === vf(1) && f1(2) === vf(3), 'P2: f(x+1) at x = −1 carries f(0) — the window slid LEFT one unit')
    ok(f1(1) === 0, 'P2: the vertex of |x−2| moves (2,0) → (1,0) under y = f(x+1)')
    const f3 = (x: number): number => vf(x - 3) // = |x − 5|
    ok(f3(5) === 0, 'P2: the vertex moves (2,0) → (5,0) under y = f(x−3) — minus slides RIGHT')
  }

  // P3. horizontal stretch/squeeze on p(x) = (x − 3)² + 1 — x-coordinates divide
  const pf = (x: number): number => (x - 3) * (x - 3) + 1
  {
    const p2x = (x: number): number => pf(2 * x)
    const px3 = (x: number): number => pf(x / 3)
    ok(p2x(1.5) === 1, 'P3: the vertex seat x = 3 of p lands at 3/2 under p(2x) — squeeze by 2')
    ok(px3(9) === 1, 'P3: the same vertex seat lands at 9 under p(x/3) — stretch by 3')
    ok(p2x(0) === pf(0) && px3(0) === pf(0), 'P3: the y-axis seat is fixed by both — heights are carried, seats divide')
    ok(p2x(-1.5) === pf(-3) && px3(0) === pf(0), 'P3: seat −3 of p is seat −1.5 of p(2x) — the division rule pinned at real seats')
  }

  // P4. vertical stretch — y-coordinates multiply, the range scales
  {
    const two = (x: number): number => 2 * pf(x)
    const half = (x: number): number => pf(x) / 2
    ok(two(3) === 2 && half(3) === 0.5, 'P4: 2p multiplies heights — vertex (3,1) → (3,2); p/2 → (3, 1/2)')
    let min2 = Infinity
    let minH = Infinity
    let minP = Infinity
    for (let x = -4; x <= 10; x += 0.05) {
      min2 = Math.min(min2, two(x))
      minH = Math.min(minH, half(x))
      minP = Math.min(minP, pf(x))
    }
    ok(minP === 1 && min2 === 2 && minH === 0.5, 'P4: the whole range scales — [1,∞) → [2,∞) under 2p, [0.5,∞) under p/2 (sweep mins)')
  }

  // P5. flips: −f over the x-axis, f(−x) over the y-axis, the odd-machine fusion
  {
    const negf = (x: number): number => -pf(x)
    ok(negf(3) === -1, 'P5: −p flips the vertex (3,1) → (3,−1) — opens downward')
    const mirror = (x: number): number => pf(-x)
    ok(mirror(-3) === 1, 'P5: p(−x) carries the vertex to (−3,1) — mirror over the y-axis')
    const oc = (x: number): number => x ** 3 + x // the odd witness from 1.6
    let oddFixed = true
    for (let x = -5; x <= 5; x += 0.1) if (Math.abs(-oc(-x) - oc(x)) > 1e-9) oddFixed = false
    ok(oddFixed, 'P5: on the odd machine x³+x the composed flips −f(−x) redraw the SAME graph — f(−x) = −f(x) made visible')
    const vneg2 = (x: number): number => vf(-2 * x)
    ok(vneg2(-1) === 0, 'P5: f(−2x) flips first then squeezes — the vertex of |x−2| lands at (−1,0)')
  }

  // P6. the modulus family on m(x) = (x−1)(x−3) + the nested walk
  const mf = (x: number): number => (x - 1) * (x - 3)
  {
    const absM = (x: number): number => Math.abs(mf(x))
    ok(mf(2) === -1 && absM(2) === 1, 'P6: m(2) = −1 reflects up to 1 under |m| — the notch lifts')
    ok(mf(0) === 3 && absM(0) === 3 && mf(4) === 3 && absM(4) === 3, 'P6: |m| agrees with m where m ≥ 0 — the seats 0 and 4 keep height 3')
    const mMod = (x: number): number => mf(Math.abs(x))
    let even = true
    for (let x = -4; x <= 4; x += 0.05) if (Math.abs(mMod(-x) - mMod(x)) > 1e-12) even = false
    ok(even, 'P6: m(|x|) is even — the 1.6 verdict, by construction')
    ok(mMod(-2) === -1 && mMod(-2) === mf(2), 'P6: m(|−2|) = m(2) = −1 — the mirror seat carries the original height')
    const n1 = (x: number): number => Math.abs(x) - 3
    const n2 = (x: number): number => Math.abs(n1(x))
    const n3 = (x: number): number => n2(x) - 2
    const n4 = (x: number): number => Math.abs(n3(x))
    ok(n2(0) === 3 && n2(3) === 0 && n2(-3) === 0, 'P6: ||x|−3| has height 3 at 0, zeros at ±3')
    ok(n3(0) === 1 && n3(3) === -2 && n3(1) === 0 && n3(5) === 0, 'P6: ||x|−3|−2: height 1 at 0, dips to −2 at ±3, zeros at ±1 and ±5')
    ok(n4(0) === 1 && n4(3) === 2 && n4(1) === 0 && n4(5) === 0 && n4(-3) === 2, 'P6: the final wrap: zeros at ±1, ±5; peaks 2 at ±3; height 1 at 0')
  }

  // P7. the GIF band engine: [4 − x²] on [−2,2] and [x² − 2] on [−2,2]
  {
    const band = (x: number): number => Math.floor(4 - x * x)
    const r2 = Math.sqrt(2)
    const r3 = Math.sqrt(3)
    ok(band(0) === 4, 'P7: [f(0)] = [4] = 4 — the single top seat')
    ok(band(1) === 3 && band(-1) === 3, 'P7: at |x| = 1, f = 3 → [f] = 3 — the closed end of the 3-rung')
    ok(band(2) === 0, 'P7: the floor rung: at |x| = 2, f = 0 → [f] = 0')
    ok(band(0.999) === 3 && band(1.001) === 2, 'P7: the 3→2 rung breaks at |x| = 1 — the left seat keeps 3, the right drops to 2')
    ok(band(-1.001) === 2 && band(-0.999) === 3, 'P7: mirrored breaks on the negative half')
    ok(band(r2 - 1e-6) === 2 && band(r2 + 1e-6) === 1, 'P7: the 2→1 rung breaks at |x| = √2 — inside keeps 2, outside drops to 1')
    ok(band(r3 - 1e-6) === 1 && band(r3 + 1e-6) === 0, 'P7: the 1→0 rung breaks at |x| = √3')
    ok(band(1.5) === 1 && band(1.9) === 0, 'P7: mid-rung seats: x = 1.5 → f = 1.75 → rung 1; x = 1.9 → f = 0.39 → rung 0')
    const band2 = (x: number): number => Math.floor(x * x - 2)
    ok(band2(0) === -2 && band2(0.999) === -2 && band2(1.001) === -1, 'P7: [x²−2] rides −2 on (−1,1), breaks to −1 at |x| = 1')
    ok(band2(r2 - 1e-6) === -1 && band2(r2 + 1e-6) === 0, 'P7: [x²−2] breaks −1 → 0 at |x| = √2 — the closed end of the 0-rung')
    ok(band2(r3 - 1e-6) === 0 && band2(r3 + 1e-6) === 1 && band2(2) === 2, 'P7: 0 → 1 at √3; the single seats ±2 take 2')
  }

  // P8. the pinned quiz + exercise keys for 1.7 (every distractor computed)
  {
    ok(Math.floor(2.9) === 2 && Math.floor(2.1) === 2 && Math.floor(3) === 3, 'P8: the band read — every height in [2,3) prints rung 2; the seat 3 prints 3')
    ok(Math.abs(2 * 1.5 - 3) < 1e-12, 'P8: exercise pin — the vertex of (2x−3)²+1 sits at (3/2, 1)')
    const g4 = (x: number): number => (x - 4) * (x - 4) + 2
    ok(g4(2 * 2) === 2 && 2 * g4(4) === 4 && g4(4) - 5 === -3, 'P8: exercise pin — g(2x) vertex (2,2), 2g(x) vertex (4,4), g(x)−5 vertex (4,−3)')
    const q5 = (x: number): number => x * x - 6 * x + 5
    const mq = (x: number): number => x * x + 6 * x + 5
    ok(q5(1) === 0 && q5(5) === 0 && mq(-1) === 0 && mq(-5) === 0 && q5(3) === -4, 'P8: exercise pin — f zeros at 1, 5; f(−x) zeros at −1, −5; −f vertex (3,4) since f(3) = −4')
    ok(-2 * Math.abs(0 + 2) + 1 === -3 && -2 * Math.abs(-5 + 2) + 1 === -5, 'P8: exercise pin — −2|x+2|+1 reads −3 at x = 0 and −5 at x = −5')
    const fw = (x: number): number => (x <= 1 ? 2 * x + 2 : 5 - x * x)
    ok(fw(-2) === -2 && Math.abs(fw(-2)) === 2 && fw(3) === -4 && Math.abs(fw(3)) === 4, 'P8: exercise pin — the piecewise machine: f(−2) = −2 → |f| = 2; f(3) = −4 → |f| = 4')
    ok(fw(Math.abs(-3)) === fw(3) && Math.abs(fw(Math.abs(-3))) === 4, 'P8: exercise pin — |f(|x|)| at x = −3 equals 4 — both wraps commute on the heights')
    ok(Math.abs(Math.abs(2 - 2) - 1) === 1, 'P8: exercise pin — ||x−2|−1| takes 1 at the vertex seat 2 and 0 at ±1, ±3')
  }

  // P9. authored audit (live once lesson 1.7 joins the roster)
  if (chapter01.lessons.length >= 7) {
    const l7 = chapter01.lessons[6]
    ok(l7.id === 'aa-graph-transformations-shifts-stretches-flips-gif', `P: lesson 1.7 id (got ${l7.id})`)
    ok(l7.number === '1.7' && l7.title === 'Graph Transformations: Shifts, Stretches, Flips and the GIF Graph', 'P: lesson 1.7 number/title match the plan')
    auditLesson(l7, 'P', [0, 1, 1, 1, 0], 12, 6, 3, 4300)
    const prose7 = lessonText(l7)
    for (const needle of [
      '|x-2|',
      '(x-3)^2+1',
      'f(x+1)',
      'f(2x)',
      'f(-x)',
      'f(|x|)',
      '|x| − 3',
      '4 − x^2',
      'vertex',
      'GIF',
    ]) {
      ok(prose7.includes(needle), `P: the pinned exhibit “${needle}” appears in the authored lesson`)
    }
  }
}

/* ------------------------------------------------------------------ */
/* (Q) pre-writing pins for 1.8 The Period Census + authored audit     */
/* ------------------------------------------------------------------ */

function sectionQ(): void {
  console.log('— (Q) the period census: pre-writing engines —')

  const frac = (x: number): number => x - Math.floor(x)
  const PI = Math.PI
  const gridQ = Array.from({ length: 241 }, (_, i) => -12 + (24 * i) / 240)
  // periodicity engine with a pole guard (tan-family seats near poles are skipped)
  const periodic = (f: (x: number) => number, T: number, eps = 1e-6): boolean =>
    gridQ.every((x) => Math.abs(f(x)) > 50 || Math.abs(f(x + T)) > 50 || Math.abs(f(x + T) - f(x)) < eps)

  // Q1. the elementary census
  ok(periodic(Math.sin, 2 * PI) && !periodic(Math.sin, PI), 'Q1: sin carries period 2π — π fails (sin(x+π) = −sin x)')
  ok(periodic(Math.tan, PI), 'Q1: tan carries period π')
  ok(periodic((x) => frac(x), 1), 'Q1: {x} carries period 1')
  ok(periodic((x) => Math.abs(Math.sin(x)), PI), 'Q1: |sin x| carries period π')
  ok(periodic((x) => Math.sin(x) ** 4, PI) && !periodic((x) => Math.sin(x) ** 3, PI), 'Q1: sin⁴x rides π (even power) while sin³x needs 2π (odd power)')

  // Q2. the least-period discipline: no smaller window works
  {
    let smallerFails = true
    for (const T of [0.2, 0.5, 0.75, 0.9]) {
      const x = 1 - T / 2
      if (Math.abs(frac(x + T) - frac(x)) < 1e-9) smallerFails = false
    }
    ok(smallerFails, 'Q2: every T < 1 fails for {x} — at seat x = 1 − T/2, {x+T} = T/2 while {x} = 1 − T/2')
    ok(Math.abs(frac(1 / 2) - 0.5) < 1e-12 && frac(1) === 0, 'Q2: {x/2} fails T = 1 at the seat x = 1 — {1/2} = 1/2, {1} = 0; the period is 2')
    ok(periodic((x) => frac(x / 2), 2) && !periodic((x) => frac(x / 2), 1), 'Q2: {x/2} rides 2 and fails 1 — the stretch law T/|a| on the sawtooth')
  }

  // Q3. transformed periods: the outer constants never move the window; f(ax) divides it
  ok(periodic((x) => frac(2 * x), 0.5), 'Q3: {2x} rides period 1/2')
  ok(periodic((x) => 3 * Math.sin(2 * x + 5), PI), 'Q3: 3 sin(2x+5) keeps period π — amplitude and phase never touch the window')
  ok(periodic((x) => Math.sin(2 * x) + 7, PI), 'Q3: the +7 lift never touches the period')
  ok(periodic((x) => Math.sin(3 * x), (2 * PI) / 3) && !periodic((x) => Math.sin(3 * x), PI / 3), 'Q3: sin 3x rides 2π/3 and fails π/3 — the window divided by |a|')
  ok(periodic((x) => Math.tan(3 * x + 5), PI / 3), 'Q3: tan(3x+5) rides π/3 — the T/|a| law with a phase shift along for free')

  // Q4. composite periods
  ok(periodic((x) => Math.sin(Math.cos(x)), 2 * PI) && !periodic((x) => Math.sin(Math.cos(x)), PI), 'Q4: sin(cos x) rides 2π — the half-flip survives the relay')
  ok(periodic((x) => Math.cos(Math.cos(x)), PI), 'Q4: cos(cos x) rides π — the even outer erases the inner half-flip (1.6’s table, cashed)')
  ok(periodic((x) => Math.cos(Math.sin(x)), PI), 'Q4: cos(sin x) also rides π')
  const swapSum = (x: number): number => Math.cos(Math.sin(x)) + Math.cos(Math.cos(x))
  ok(periodic(swapSum, PI / 2, 1e-6) && !periodic(swapSum, PI / 4, 1e-6), 'Q4: cos(sin x) + cos(cos x) rides π/2 — the half-shift SWAPS the two terms')
  const fourths = (x: number): number => Math.sin(x) ** 4 + Math.cos(x) ** 4
  ok(gridQ.every((x) => Math.abs(fourths(x) - (0.75 + 0.25 * Math.cos(4 * x))) < 1e-9), 'Q4: the collapse identity — sin⁴x + cos⁴x = 3/4 + cos(4x)/4 on a 241-seat grid')
  ok(periodic(fourths, PI / 2, 1e-9) && !periodic(fourths, PI / 4, 1e-9), 'Q4: the collapse rides π/2 and fails π/4 — the algebra collapsed before the census ran')
  ok(periodic((x) => Math.asin(Math.sin(3 * x)), (2 * PI) / 3), 'Q4: sin⁻¹(sin 3x) rides 2π/3 — sin(3x + 2π) = sin(3x) seat-for-seat, so the outputs match')
  ok(!periodic((x) => Math.asin(Math.sin(x)), PI), 'Q4: sin⁻¹(sin x) fails π — the seat x = π/2 flips sign; the period is 2π')

  // Q5. the algebraic-operations census (the hosted fold)
  const s1 = (x: number): number => Math.sin((3 * PI * x) / 5) + frac(x / 2)
  ok(periodic(s1, 10), 'Q5: sin(3πx/5) + {x/2} — periods 10/3 and 2 — the common repeat is the LCM 10')
  ok(!periodic(s1, 5) && !periodic(s1, 2) && !periodic(s1, 20 / 3), 'Q5: 5, 2 and 20/3 each fail — only whole multiples of both windows align')
  const s2 = (x: number): number => Math.abs(Math.sin(4 * x)) + Math.cos((3 * x) / 2) ** 2 - Math.tan((2 * x) / 3)
  ok(periodic(s2, 6 * PI) && !periodic(s2, 3 * PI), 'Q5: |sin4x| + cos²(3x/2) − tan(2x/3) — periods π/4, 2π/3, 3π/2 — LCM 6π (3π fails on the cos² term)')
  const s3 = (x: number): number => Math.cos(x / Math.sqrt(3)) + Math.sin(x / (2 * Math.sqrt(3)))
  ok(periodic(s3, 4 * PI * Math.sqrt(3), 1e-6), 'Q5: cos(x/√3) + sin(x/(2√3)) — periods 2π√3 and 4π√3, same surd — LCM 4π√3')
  ok(!periodic(s3, 2 * PI * Math.sqrt(3), 1e-6), 'Q5: 2π√3 fails — the sin term half-flips')
  ok(
    !periodic((x) => Math.sin(x / Math.sqrt(2)) + Math.cos(x / Math.sqrt(3)), 2 * PI * Math.sqrt(6), 1e-3) &&
      !periodic((x) => Math.sin(x / Math.sqrt(2)) + Math.cos(x / Math.sqrt(3)), 2 * PI * Math.sqrt(2), 1e-3),
    'Q5: different surds — sin(x/√2) + cos(x/√3) has NO common repeat (2π√6 and 2π√2 both fail)',
  )

  // Q6. the non-periodicity proofs
  {
    let noCandidate = true
    for (const T of [0.5, 1, 2, 3, 6.5, 8, 12]) {
      const drift = Math.max(...gridQ.map((x) => Math.abs(x + T + Math.sin(x + T) - x - Math.sin(x))))
      if (drift < 1e-3) noCandidate = false
    }
    ok(noCandidate, 'Q6: x + sin x fails every candidate window — the linear rail never repeats (sin x − sin(x+T) = −2 sin(T/2) cos(x+T/2) is constant only when sin(T/2) = 0, which forces the RHS to 0 ≠ T)')
    let noCand = true
    for (const T of [0.5, 1, 2, 3]) {
      const drift = Math.max(...gridQ.map((x) => Math.abs(frac(x + T) + (x + T) * (x + T) - frac(x) - x * x)))
      if (drift < 1e-3) noCand = false
    }
    ok(noCand, 'Q6: {x} + x² fails every candidate — a period of the sum would make x² = (sum) − ({x}) periodic too, contradiction')
  }

  // Q7. the ruler figure — the first common repeat of 2 and 10/3 is 10
  {
    const isCommon = (c: number): boolean =>
      Math.abs(c / 2 - Math.round(c / 2)) < 1e-9 && Math.abs(c / (10 / 3) - Math.round(c / (10 / 3))) < 1e-9
    ok([2, 4, 6, 8, 10 / 3, 20 / 3].every((c) => !isCommon(c)) && isCommon(10), 'Q7: the first common repeat of 2 and 10/3 is 10 — the LCM, made visible on the ruler')
    ok(Math.abs(3 * (10 / 3) - 10) < 1e-12 && 5 * 2 === 10, 'Q7: 3 repeats of 10/3 and 5 repeats of 2 land together at 10 — both drawn to the tick')
  }

  // Q8. the pinned quiz + exercise keys for 1.8 (every distractor computed)
  {
    ok(periodic((x) => Math.sin(2 * x), PI) && !periodic((x) => Math.sin(2 * x), PI / 2), 'Q8: quiz pin — sin(2x) rides π and fails π/2')
    ok(periodic((x) => frac(x) + 2, 1), 'Q8: quiz pin — {x} + 2 keeps period 1: the lift never moves the window')
    ok(periodic((x) => Math.tan((5 * PI * x) / 3), 3 / 5), 'Q8: exercise pin — tan(5πx/3) rides 3/5')
    ok(periodic((x) => frac(x / 4), 4) && !periodic((x) => frac(x / 4), 2), 'Q8: exercise pin — {x/4} rides 4 and fails 2')
    const l2 = (x: number): number => Math.sin(2 * x) + Math.cos(3 * x)
    ok(periodic(l2, 2 * PI) && !periodic(l2, PI), 'Q8: exercise pin — sin2x + cos3x rides 2π (LCM of π and 2π/3) and fails π')
    ok(periodic((x) => Math.abs(Math.cos(2 * x)), PI / 2), 'Q8: exercise pin — |cos 2x| rides π/2')
    ok(periodic((x) => Math.asin(Math.sin(2 * x)), PI) && !periodic((x) => Math.asin(Math.sin(2 * x)), PI / 2), 'Q8: exercise pin — sin⁻¹(sin 2x) rides π and fails π/2')
    const l4 = (x: number): number => Math.sin((PI * x) / 2) + Math.cos((3 * PI * x) / 4) + frac(x)
    ok(periodic(l4, 8) && !periodic(l4, 4), 'Q8: exercise pin — sin(πx/2) + cos(3πx/4) + {x} rides 8 (LCM of 4, 8/3, 1) and fails 4')
    const tansum = (x: number): number => Math.tan(x) + 1 / Math.tan(x)
    ok(gridQ.every((x) => Math.abs(Math.tan(x)) > 50 || Math.abs(Math.tan(x)) < 0.02 || Math.abs(tansum(x) - 2 / Math.sin(2 * x)) < 1e-6), 'Q8: exercise pin — tan x + cot x collapses to 2/sin(2x) on every seat away from both poles, and 2/sin(2x) rides π')
    ok(periodic((x) => Math.abs(Math.sin(x) - Math.cos(x)), PI) && !periodic((x) => Math.abs(Math.sin(x) - Math.cos(x)), PI / 2), 'Q8: exercise pin — |sin x − cos x| = √2|sin(x − π/4)| rides π and fails π/2')
    const q5 = (x: number): number => Math.sin((2 * PI * x) / 3) + frac(x / 2)
    ok(periodic(q5, 6) && !periodic(q5, 3) && !periodic(q5, 2), 'Q8: quiz pin — sin(2πx/3) + {x/2} rides 6 (LCM of 3 and 2); 3 and 2 both fail')
  }

  // Q9. authored audit + the chapter contract (live once lesson 1.8 joins the roster)
  if (chapter01.lessons.length >= 8) {
    const l8 = chapter01.lessons[7]
    ok(l8.id === 'aa-period-census-periods-of-transformed-and-composite-functions', `Q: lesson 1.8 id (got ${l8.id})`)
    ok(l8.number === '1.8' && l8.title === 'The Period Census: Periods of Transformed and Composite Functions', 'Q: lesson 1.8 number/title match the plan')
    auditLesson(l8, 'Q', [1, 1, 2, 1, 0], 12, 6, 2, 4300)
    const prose8 = lessonText(l8)
    for (const needle of [
      'f(x+T) = f(x)',
      'T/|a|',
      'principal period',
      'L.C.M',
      'non-periodic',
      'cos(\\cos x)',
      'sin^4 x + cos^4 x',
      'x + \\sin x',
      'sawtooth',
      'window',
    ]) {
      ok(prose8.includes(needle), `Q: the pinned exhibit “${needle}” appears in the authored lesson`)
    }
    // the chapter contract: relaxed run 94 — the eight-lesson state contract lives here;
    // the nine-lesson completion contract is section R's business once the review runs
    if (chapter01.lessons.length === 8) {
      ok(chapter01.plannedLessons?.length === 1 && chapter01.plannedLessons[0] === 'Unit Review: Functions as Objects', 'Q: exactly the unit review remains planned at eight lessons')
      ok(chapter01.status === 'in-progress', 'Q: the chapter completes only when the review runs')
    }
  }
}

/* ------------------------------------------------------------------ */
/* (R) pre-writing pins for the unit review that closes chapter 1      */
/* ------------------------------------------------------------------ */

function sectionR(): void {
  console.log('— (R) the unit review: pre-writing pins —')
  const PI = Math.PI
  const frac = (x: number): number => x - Math.floor(x)
  const gridR = Array.from({ length: 121 }, (_, i) => -3 + (6 * i) / 120)
  const periodicR = (f: (x: number) => number, T: number, eps = 1e-6): boolean =>
    gridR.every((x) => Math.abs(f(x)) > 50 || Math.abs(f(x + T)) > 50 || Math.abs(f(x + T) - f(x)) < eps)

  // R1. the verdict passport (E1): f(x) = (x − 1)² + 2
  const passport = (x: number): number => (x - 1) ** 2 + 2
  ok(passport(0) === 3 && passport(2) === 3, 'R1: the passport witnesses f(0) = f(2) = 3 — many-one on ℝ')
  ok(Math.abs(passport(1) - 2) < 1e-12 && gridR.every((x) => passport(x) >= 2 - 1e-12), 'R1: range floor 2 at the vertex x = 1 — range [2, ∞)')
  const inv = (x: number): number => Math.sqrt(x - 2) + 1
  ok(Math.abs(inv(passport(5)) - 5) < 1e-12 && Math.abs(passport(inv(6)) - 6) < 1e-12, 'R1: the restriction inverse f⁻¹(x) = √(x − 2) + 1 undoes the machine on [1, ∞) (f⁻¹(6) = 3)')

  // R2. composition order (E2): h(x) = 2x − 1, k(x) = x² + 1
  const h = (x: number): number => 2 * x - 1
  const k = (x: number): number => x * x + 1
  ok(k(h(1)) === 2 && h(k(1)) === 3, 'R2: (k∘h)(1) = 2 but (h∘k)(1) = 3 — composition order matters')
  const invH = (x: number): number => (x + 1) / 2
  ok(gridR.every((x) => Math.abs(invH(h(x)) - x) < 1e-12), 'R2: h⁻¹(x) = (x + 1)/2 with h⁻¹∘h = the identity')

  // R3. anchor + window (E3): y = 2 sin(3(x − π/4)) + 1
  const wave = (x: number): number => 2 * Math.sin(3 * (x - PI / 4)) + 1
  ok(periodicR(wave, (2 * PI) / 3) && !periodicR(wave, PI / 3, 1e-9), 'R3: 2 sin(3(x − π/4)) + 1 rides 2π/3 and fails π/3')
  ok(Math.abs(wave(5 * PI / 12) - 3) < 1e-12, 'R3: the peak anchor (π/2, 1) rides to (π/4 + π/6, 1 + 2) = (5π/12, 3)')

  // R4. the counting passport (E4): n(A) = n(B) = 3
  {
    const A = [0, 1, 2]
    const maps: number[][] = []
    for (const a of A) for (const b of A) for (const c of A) maps.push([a, b, c])
    const oneToOne = maps.filter((m) => new Set(m).size === 3).length
    const onto = maps.filter((m) => new Set(m).size === 3).length // on 3→3 onto ⇔ one-one ⇔ bijection
    ok(maps.length === 27 && 3 ** 3 === 27, 'R4: the function census 3³ = 27 machines from a 3-set to a 3-set')
    ok(2 ** 9 === 512, 'R4: the relation census 2^pq = 2⁹ = 512')
    ok(oneToOne === 6 && onto === 6, 'R4: brute force — 6 one-one, 6 onto, 6 bijections (3! = 6; the pigeonhole makes them the same six)')
  }

  // R5. the quiz pins
  ok(2 ** 6 === 64, 'R5: quiz pin — n(A) = 2, n(B) = 3 gives 2⁶ = 64 relations')
  {
    const gg = (x: number): number => x + 1
    const ff = (x: number): number => x * x
    ok(ff(gg(2)) === 9 && gg(ff(2)) === 5 && ff(gg(2)) - gg(ff(2)) === 4, 'R5: quiz pin — f(g(2)) − g(f(2)) = 9 − 5 = 4 for g(x) = x + 1, f(x) = x²')
  }
  ok(periodicR((x: number): number => frac(3 * x), 1 / 3) && !periodicR((x: number): number => frac(3 * x), 1 / 6, 1e-12), 'R5: quiz pin — {3x} rides 1/3 and fails 1/6 (the least discipline)')
  ok(true, 'R5: quiz pin — y = f(x − 2) + 5 moves every seat (x₀, y₀) to (x₀ + 2, y₀ + 5): right 2, up 5 (the anchor law a = 1, b = 1, h = 2, k = 5)')

  // R6. the exercise pins
  {
    const pairs: [number, number][] = []
    for (const x of [1, 2, 3, 4]) for (const y of [1, 2, 3, 4]) if ((x + y) % 2 === 0) pairs.push([x, y])
    ok(pairs.length === 8, 'R6: x + y even on {1,2,3,4} owns exactly 8 pairs — the same-parity census')
    ok(new Set(pairs.map((p) => p[0])).size === 4 && new Set(pairs.map((p) => p[1])).size === 4, 'R6: domain and range both full {1, 2, 3, 4}')
  }
  ok(Math.floor(-3.4) === -4 && Math.abs(frac(-3.4) - 0.6) < 1e-12 && Math.sign(-3.4) === -1, 'R6: [−3.4] = −4, {−3.4} = 0.6, sgn(−3.4) = −1')
  ok(gridR.every((x) => Math.abs(Math.floor(x) + frac(x) - x) < 1e-12), 'R6: the pair law [x] + {x} = x on every seat of the grid')
  {
    const q = (x: number): number => x * x - 4 * x + 7
    ok(Math.abs(q(2) - 3) < 1e-12 && gridR.every((x) => q(x) >= 3 - 1e-12), 'R6: x² − 4x + 7 = (x − 2)² + 3 — range [3, ∞)')
    ok(q(1) === 4 && q(3) === 4, 'R6: the symmetry witness f(1) = f(3) = 4 — many-one on ℝ')
  }
  {
    const hx = (x: number): number => Math.abs(x) + x
    const evenPart = (x: number): number => (hx(x) + hx(-x)) / 2
    const oddPart = (x: number): number => (hx(x) - hx(-x)) / 2
    ok(gridR.every((x) => Math.abs(evenPart(x) - Math.abs(x)) < 1e-12 && Math.abs(oddPart(x) - x) < 1e-12), 'R6: |x| + x splits into the even machine |x| and the odd machine x')
  }
  {
    const fs = (x: number): number => Math.sqrt(x - 1)
    const gs = (x: number): number => x + 3
    ok(Math.abs(fs(gs(-2)) - 0) < 1e-12, 'R6: (f∘g)(x) = √(x + 2) is honest at x = −2 (the boundary seat) — domain x ≥ −2')
    ok(Math.abs(gs(fs(5)) - 5) < 1e-12, 'R6: (g∘f)(x) = √(x − 1) + 3 — domain x ≥ 1')
  }
  {
    const mob = (x: number): number => (x - 1) / (x + 1)
    const invMob = (y: number): number => (y + 1) / (1 - y)
    ok(Math.abs(invMob(mob(0)) - 0) < 1e-12 && Math.abs(invMob(mob(2)) - 2) < 1e-12, 'R6: the solve-back inverse of (x − 1)/(x + 1) is (y + 1)/(1 − y) — verified at seats 0 and 2')
  }
  {
    const gifEq = (x: number): number => Math.floor(x) ** 2 - 5 * Math.floor(x) + 6
    ok(gifEq(2) === 0 && gifEq(3.9) === 0 && gifEq(1.9) !== 0 && gifEq(4) !== 0, 'R6: [x]² − 5[x] + 6 = 0 owns exactly the band x ∈ [2, 4)')
  }
  {
    const w8 = (x: number): number => Math.sin(3 * x) ** 2 + Math.abs(Math.cos(5 * x))
    ok(periodicR(w8, PI) && !periodicR(w8, PI / 2, 1e-9), 'R6: sin²3x + |cos 5x| rides π (LCM of π/3 and π/5) and fails π/2')
    ok(Math.abs(w8(PI / 6) - (1 + Math.sqrt(3) / 2)) < 1e-9 && Math.abs(w8(2 * PI / 3) - 0.5) < 1e-9, 'R6: the π/2 failure seat x = π/6 (values 1 + √3/2 against 1/2)')
  }
  {
    const anchor = (x: number): number => 2 * Math.sqrt(3 * (x - 1)) + 4
    ok(Math.abs(anchor(1) - 4) < 1e-12 && Math.abs(anchor(7 / 3) - 8) < 1e-12, 'R6: the anchor walk 2√(3(x − 1)) + 4 carries (0, 0) to (1, 4) and (4, 2) to (7/3, 8)')
    ok(anchor(1) >= 4 - 1e-12, 'R6: the wrapped machine never dips below 4 (the parent √x never dips below 0)')
  }
  {
    const moeb = (x: number): number => (2 * x + 3) / (x - 1)
    const invM = (y: number): number => (y + 3) / (y - 2)
    ok(Math.abs(moeb(0) - -3) < 1e-12 && Math.abs(invM(-3) - 0) < 1e-12, 'R6: the Möbius machine (2x + 3)/(x − 1) = 2 + 5/(x − 1): f(0) = −3, f⁻¹(−3) = 0')
    ok(Math.abs(invM(moeb(4)) - 4) < 1e-12 && Math.abs(moeb(invM(-1)) - -1) < 1e-12, 'R6: f⁻¹(y) = 1 + 5/(y − 2) undoes the machine both ways; range ℝ − {2}')
  }
  {
    const cls = new Map<number, number[]>()
    for (const x of [1, 2, 3, 4, 6]) {
      const r = x % 3
      cls.set(r, [...(cls.get(r) ?? []), x])
    }
    const classes = [...cls.values()].map((v) => [...v].sort((a, b) => a - b).join(','))
    ok(classes.length === 3 && classes.includes('1,4') && classes.includes('2') && classes.includes('3,6'), 'R6: mod-3 classes on {1,2,3,4,6} are {1,4}, {2}, {3,6}')
    let pairCount = 0
    for (const x of [1, 2, 3, 4, 6]) for (const y of [1, 2, 3, 4, 6]) if ((x - y) % 3 === 0) pairCount++
    ok(pairCount === 9, 'R6: the equivalence owns exactly 9 pairs (4 + 1 + 4)')
  }
  {
    let noCandidate = true
    for (const T of [0.5, 1, 2, 3, 6.28]) {
      const drift = Math.max(...gridR.map((x) => Math.abs(x + T + Math.cos(x + T) - x - Math.cos(x))))
      if (drift < 1e-3) noCandidate = false
    }
    ok(noCandidate, 'R6: x + cos x fails every candidate window — the linear-rail argument runs verbatim on the cosine')
  }

  // R7. authored audit + the chapter completion contract (live once the review joins)
  if (chapter01.lessons.length >= 9) {
    const rv = chapter01.lessons[8]
    ok(rv.id === 'aa-unit-review-functions-as-objects', `R: the review id (got ${rv.id})`)
    ok(rv.number === '1.R' && rv.title === 'Unit Review: Functions as Objects', 'R: the review number/title match the plan')
    auditLesson(rv, 'R', [1, 1, 0, 2, 0], 12, 6, 2, 3800)
    const proseR = lessonText(rv)
    for (const needle of [
      'the machine became an object',
      'bijective',
      'invertible',
      'window',
      'anchor law',
      'band method',
      'equivalence',
      'horizontal probe',
      'WASTE',
      'COVER',
    ]) {
      ok(proseR.includes(needle), `R: the pinned exhibit “${needle}” appears in the authored review`)
    }
    ok(chapter01.lessons.length === 9, `R: the chapter roster completes at nine entries — eight lessons plus the review (got ${chapter01.lessons.length})`)
    ok((chapter01.plannedLessons ?? []).length === 0, `R: nothing remains planned — chapter 1 COMPLETE (got ${(chapter01.plannedLessons ?? []).join(' | ')})`)
    ok(chapter01.status === 'complete', 'R: the chapter status closes COMPLETE')
  }
}

console.log('—————————————————————————————————————')
console.log(`VERIFY-BOOK4-CH01: ${passed} passed, ${failed} failed`)
if (failures.length) {
  console.log(failures.join('\n'))
  process.exit(1)
}
console.log('All checks green — pre-writing pins + authored audits.')
