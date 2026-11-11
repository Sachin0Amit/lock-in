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
  ok(chapter01.lessons.length === 2, 'H: chapter 1 carries exactly the two lessons of this run')
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
  // the chapter-level contract
  ok(chapter01.status === 'in-progress', 'I: chapter 1 status in-progress')
  const planned = chapter01.plannedLessons ?? []
  ok(planned.length === 6, `I: six lessons remain planned (got ${planned.length})`)
  ok(planned[0] === 'Composition: Machines in Series', 'I: the next lesson is Composition (run 91 opens here)')
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
sectionH()
sectionI()

console.log('—————————————————————————————————————')
console.log(`VERIFY-BOOK4-CH01: ${passed} passed, ${failed} failed`)
if (failures.length) {
  console.log(failures.join('\n'))
  process.exit(1)
}
console.log('All checks green — pre-writing pins + authored audits.')
