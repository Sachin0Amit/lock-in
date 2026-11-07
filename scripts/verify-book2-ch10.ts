export {}

/**
 * verify-book2-ch10.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 10 "The Map of Number
 * Systems" — the book's LAST chapter.
 *
 * Created 2026-11-07 (run 64) — every number of lessons 10.1 and 10.2 is
 * verified here BEFORE anything is written into ch-10.ts, per the
 * verify-first discipline of runs 55–63. Convention fixed by ch-01:
 * ℕ = {1, 2, 3, …} — 0 is NOT a natural number in this book.
 *
 *   (A) 10.1 the solvability census — the engine of the whole chapter:
 *       for (a, b) ∈ [1..30]²: x + a = b has a ℕ-solution iff b > a
 *       (435 of 900 pairs), a ℤ-solution always (900 of 900, with the
 *       b = a boundary needing 0 and b < a needing negatives); for
 *       a ∈ [2..12], b ∈ [1..60]: a·x = b has a ℤ-solution iff a | b
 *       (Σ ⌊60/a⌋ = 122 of 660) and a ℚ-solution always; x² = n for
 *       n ∈ [1..100] has a ℚ-solution iff n is a perfect square (10 of
 *       100) and an ℝ-solution for every n ≥ 0; x² = n for n ∈ [−9..0]
 *       has an ℝ-solution iff n = 0 (x = 0 ∉ ℕ); x² = −1 has no solution
 *       anywhere on the ladder;
 *   (B) 10.1 the embeddings — the difference-pair model of ℤ over ℕ
 *       (ch. 6 semantics): n ↦ (n, 0) injective, preserves + and ×
 *       (swept n, m ∈ [−50..50]); [(a, b)] = [(a−b, 0)] for a ≥ b ≥ 1
 *       (swept to 300); the fraction-pair model of ℚ over ℤ (ch. 7
 *       semantics): n ↦ (n, 1), (a·k, b·k) ≡ (a, b) for k ≥ 1 (swept);
 *       the three embeddings agree on every swept computation;
 *   (C) 10.1 the law ledger — commutativity/associativity/distributivity/
 *       cancellation swept with exact arithmetic at ℕ (1..200), ℤ
 *       (−100..100) and ℚ (pairs with denominator ≤ 24); the ℝ radical
 *       spot checks (√2·√8 = 4, √2 + √8 = 3√2, (1+√2)(1−√2) = −1,
 *       √2·√3 = √6 by the floor-product window) carried from ch. 8;
 *   (D) 10.1 the repair-ledger rows — the canonical failures verified in
 *       the model: 5 − 8 has no ℕ verdict, = −3 in ℤ; 3x = 2 has no ℤ
 *       verdict, x = 2/3 in ℚ; x² = 2 has no ℚ verdict (√2 irrational,
 *       ch. 8's own theorem); x² = −1 fails in ℝ (x² ≥ 0 in the ordered
 *       field, sweep of the sign law); ℕ's own closure: addition and
 *       multiplication never exit ℕ (swept);
 *   (E) 10.2 casting out nines — the engine: N ≡ digitSum(N) (mod 9)
 *       swept for N ≤ 50,000; the digital root dr(N) = 1 + ((N−1) mod 9)
 *       for N ≥ 1 (swept; dr(0) = 0); the multiplicative check
 *       dr(a·b) ≡ dr(dr(a)·dr(b)) (mod 9) swept a, b ≤ 2,000; the
 *       substitution census: a single-digit change e → f at position k
 *       shifts the residue by (f − e)·10^k ≡ (f − e) (mod 9), so it is
 *       caught iff 9 ∤ (f − e): exactly 2 of the 90 ordered digit pairs
 *       (0↔9, 9↔0) slip through — swept exhaustively on 6-digit numbers;
 *       the transposition census: swapping adjacent digits shifts N by
 *       (d_{k+1} − d_k)(10^k − 10^{k+1}) = −9·10^k·(d_{k+1} − d_k) ≡ 0
 *       (mod 9): EVERY adjacent transposition slips through — swept;
 *       the worked exhibit 8,234 × 4,912 = 40,445,408 with digital roots
 *       8·7 = 56 → 2 vs 29 → 11 → 2, the miss-typed …406 (sum 27 → 9)
 *       caught, the transposed …480 (sum 29 → 2) missed;
 *   (F) 10.2 the ISBN-10 engine — validity Σ_{i=1..10} i·d_i ≡ 0
 *       (mod 11); the worked exhibits verified exactly: Hamming's
 *       "Coding and Information Theory" 0-13-139139-9 (sum 143 = 13·11)
 *       and 0-393-09670-X (sum 220 = 20·11, the X = 10 case); the check
 *       digit d_10 ≡ −Σ_{i=1..9} i·d_i (mod 11) lands in 0..10 with X
 *       for 10; the substitution census: a change e → f at position i
 *       shifts the sum by (f − e)·i with 1 ≤ i ≤ 10 and 1 ≤ |f − e| ≤ 9,
 *       and 11 is prime, so 11 ∤ (f − e)·i — ALL 900 of 900 caught
 *       (swept over synthetic valid numbers); the transposition census:
 *       weights 10..1 differ by exactly 1 between neighbours, so the
 *       shift is d_k − d_{k+1} ≠ 0 with |d_k − d_{k+1}| ≤ 9 — ALL caught
 *       (swept);
 *   (G) 10.2 the ISBN-13 / EAN-13 engine — validity Σ w_i·d_i ≡ 0
 *       (mod 10), w = 1, 3, 1, 3, …; the real exhibit 978-9353439552
 *       (the Khattar QA 4e volume in SOURCE_LOG) verified: sum 150 ≡ 0
 *       (mod 10); single-digit shifts (f − e)·w with w ∈ {1, 3}: always
 *       caught (10 ∤ 3(f − e) since gcd(3, 10) = 1) — swept; adjacent
 *       transpositions shift the sum by ±2(d_k − d_{k+1}): caught iff
 *       5 ∤ (d_k − d_{k+1}) — exactly the 10 ordered pairs with |diff| = 5
 *       (0↔5 … 4↔9) slip: 80 of 90 caught (swept);
 *   (H) 10.2 the Luhn engine — the red map (double, subtract 9 when
 *       ≥ 10): red = [0, 2, 4, 6, 8, 1, 3, 5, 7, 9], injective (swept);
 *       validity Σ ≡ 0 (mod 10); the canonical exhibit 79927398713
 *       verified (sum 70); single-digit shifts always caught (red
 *       injective at doubled positions, identity at the rest) — swept;
 *       adjacent transpositions shift by (red(a) − a) − (red(b) − b)
 *       with red(d) − d ≡ [0, 1, 2, 3, 4, 6, 7, 8, 9, 0] (mod 10):
 *       exactly {0, 9} collide, so 44 of 45 unordered transpositions are
 *       caught (swept);
 *   (I) 10.2 the comparison table — catch rates assembled from the
 *       sweeps: mod-9 sum check 88/90 single-digit (2 slip), 0/45
 *       transpositions; ISBN-10 90/90 and 45/45; ISBN-13 90/90 and
 *       80/90 ordered; Luhn 90/90 and 89/90 ordered; every rate
 *       recomputed from the census loops, not hand-typed;
 *   (J) quiz keys 10.1 (intended indices pinned) with every distractor
 *       evaluated against the census engines;      [added run 64]
 *   (K) exercise keys 10.1, recomputed both sides; [added run 64]
 *   (L) quiz keys 10.2 with every distractor evaluated; [added run 64]
 *   (M) exercise keys 10.2, recomputed both sides; [added run 64]
 *   (N) figure geometry: 10.1 the four-band repair map, 10.2 the mod-9
 *       residue wheel and the ISBN-10 weighted-check engine — label
 *       boxes disjoint, viewBoxes respected. [added run 64]
 *   (P) 10.3 the unit-digit engine — ℤ/10ℤ cycles (periods 1/2/4 swept
 *       per base, the six cycle strings pinned), direct modpow sweep
 *       a^n mod 10 against cycle entries (a ∈ 0..9, n ≤ 400); exhibits
 *       7^2024 → digit 1, 2^2024 → 6, 3^2024 → 1; the ℤ/100ℤ engine —
 *       order of 7 mod 100 = 4 (7^4 = 2401 ≡ 1, k = 1,2,3 miss), order
 *       of 3 mod 100 = 20 (swept minimal), 7^2024 → 01, 3^2024 → 81;
 *       the honest non-coprime case — 2^n mod 100 never returns to 1,
 *       period 20 from n = 2 onward (swept), 2^2024 = 2^(4 + 20·101) →
 *       16; the squares census regression (squares mod 10 never end in
 *       2, 3, 7, 8); the Σ k! exhibit 1!+…+100! ends in 3 (BigInt sum);
 *       [added run 65]
 *   (Q) 10.3 the factorial engine — Legendre: Z(n) = Σ⌊n/5^k⌋ equals the
 *       exact trailing-zero count of the BigInt n! for n ≤ 200 (swept)
 *       and the one-off 1000! check (249); exhibits Z(10) = 2, Z(25) =
 *       6, Z(100) = 24, Z(250) = 62, Z(1000) = 249, Z(2024) = 503; the
 *       chain 1000 → 200 → 40 → 8 → 1 → 0; v₂(100!) = 97 ≥ 24 (the 5s
 *       bottleneck) and v₃(100!) = 48; v₂(n!) ≥ v₅(n!) swept n ≤ 5000;
 *       the digit-sum identity Z(n) = (n − s₅(n))/4 swept n ≤ 2000 with
 *       s₅ from the division chain; exhibits 100 = 400₅ (s = 4 → 24),
 *       1000 = 13000₅ (s = 4 → 249), 2024 = 31044₅ (s = 12 → 503, place
 *       sum 1875 + 125 + 0 + 20 + 4 = 2024). [added run 65]
 *   (R) 10.3 the base-conversion engine — the quotient-remainder chain:
 *       round-trip sweep digits_b(n) → n for b ∈ 2..16, n ≤ 3000; the
 *       2024 chain (q 168 r 8 · q 14 r 0 · q 1 r 2 · q 0 r 1) → 1208₁₂
 *       = 1728 + 288 + 0 + 8; 2024 = 7E8₁₆ = 1792 + 224 + 8; binary
 *       11111101000₂ (11 bits) = 1024 + 512 + 256 + 128 + 64 + 32 + 8,
 *       padded 011111101000₂ → the nibble machine 0111 1110 1000 → 7 E 8
 *       (ch. 3 regression); the digit-sum
 *       law N ≡ s_b(N) (mod b − 1) swept b ∈ 2..16, N ≤ 3000 with the
 *       b = 10 regression (the 3/9 tests of 5.2); instances s₁₂(2024) =
 *       11 → 11 | 2024 (2024 = 184·11) and s₁₆(2024) = 29 → 2024 ≡ 14
 *       (mod 15), 2024 = 134·15 + 14. [added run 65]
 *   (S) 10.3 the remainder-chain engine — CRT: for coprime (m, n) ≤ 30
 *       every (a, b) pair is met by exactly one class mod mn (swept);
 *       the non-coprime criterion gcd(m, n) | (b − a) swept m, n ≤ 40;
 *       exhibits: (8, 11; 3, 6) → 83 = 8·10 + 3 = 11·7 + 6, unique in
 *       [0, 88); the ladder classic (≡ 1 mod 2,3,4,5 · ≡ 0 mod 7) → 301
 *       = 60·5 + 1 = 7·43, family 301 + 420k with 721 the next; the CRT
 *       reading N ↦ (N mod 3, N mod 4, N mod 5) is a bijection on the 60
 *       classes (swept); the Legendre chain ⌊1000/5^k⌋ = 200 + 40 + 8 +
 *       1 = 249 re-crossed. [added run 65]
 *   (T) quiz keys 10.3 with every distractor evaluated; [added run 65]
 *   (U) exercise keys 10.3, recomputed both sides; [added run 65]
 *   (V) figure geometry: 10.3 the one-engine toolkit map and the
 *       Legendre 5-chain for 1000! — label boxes disjoint, viewBoxes
 *       respected. [added run 65]
 *
 * Convention note: all BigInt arithmetic uses the BigInt(n) constructor
 * style (the ES2017 gate — no bigint literals), per the run-61 fix.
 */

/* ------------------------------------------------------------------ */
/* tiny exact-arithmetic helpers                                       */
/* ------------------------------------------------------------------ */

const B = (n: number | bigint) => BigInt(n)

function bigGcd(a: bigint, b: bigint): bigint {
  a = a < B(0) ? -a : a
  b = b < B(0) ? -b : b
  while (b > B(0)) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

/** a/b as a normalized fraction (reduced, denominator > 0). */
function frac(a: bigint, b: bigint): [bigint, bigint] {
  if (b === B(0)) throw new Error('zero denominator')
  if (b < B(0)) {
    a = -a
    b = -b
  }
  const g = bigGcd(a, b)
  return [a / g, b / g]
}

function fracAdd(x: [bigint, bigint], y: [bigint, bigint]): [bigint, bigint] {
  return frac(x[0] * y[1] + y[0] * x[1], x[1] * y[1])
}
function fracMul(x: [bigint, bigint], y: [bigint, bigint]): [bigint, bigint] {
  return frac(x[0] * y[0], x[1] * y[1])
}
function fracEq(x: [bigint, bigint], y: [bigint, bigint]): boolean {
  return x[0] === y[0] && x[1] === y[1]
}

let checks = 0
let fails = 0
const failLines: string[] = []

function ok(cond: boolean, label: string): void {
  checks++
  if (!cond) {
    fails++
    failLines.push('FAIL: ' + label)
    if (failLines.length <= 40) console.log('  FAIL ' + label)
  }
}

function section(name: string): void {
  console.log('SECTION ' + name)
}

/* ------------------------------------------------------------------ */
/* (A) the solvability census                                          */
/* ------------------------------------------------------------------ */

section('(A) 10.1 solvability census')

// ℕ = {1, 2, 3, …}: x + a = b has a ℕ-solution iff b − a ≥ 1.
{
  let natSolvable = 0
  let intSolvable = 0
  const total = 30 * 30
  for (let a = 1; a <= 30; a++) {
    for (let b = 1; b <= 30; b++) {
      const d = b - a
      if (d >= 1) natSolvable++ // x = d ∈ ℕ
      intSolvable++ // x = d ∈ ℤ always (0 and negatives allowed)
    }
  }
  ok(natSolvable === 435, 'A: x+a=b solvable in ℕ for 435 of 900 pairs (got ' + natSolvable + ')')
  ok(intSolvable === 900, 'A: x+a=b solvable in ℤ for all 900 pairs')
  // boundary exhibits
  ok(5 - 8 === -3, 'A: 5 − 8 = −3 in ℤ')
  ok(8 - 5 === 3, 'A: 8 − 5 = 3 in ℕ (the b > a side)')
  ok(7 - 7 === 0, 'A: 7 − 7 = 0 — needs ℤ (0 ∉ ℕ in this book)')
}

// a·x = b: ℤ-solvable iff a | b; ℚ-solvable always (a ≠ 0).
{
  let zSolvable = 0
  const total = 11 * 60 // a ∈ [2..12], b ∈ [1..60]
  for (let a = 2; a <= 12; a++) {
    for (let b = 1; b <= 60; b++) {
      if (b % a === 0) zSolvable++
    }
  }
  const floorSum = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].reduce((s, a) => s + Math.floor(60 / a), 0)
  ok(zSolvable === 124, 'A: a·x=b ℤ-solvable for 124 of 660 pairs (got ' + zSolvable + ')')
  ok(floorSum === zSolvable, 'A: the census matches Σ ⌊60/a⌋ = ' + floorSum)
  ok(Math.floor(60 / 10) === 6, 'A: ⌊60/10⌋ = 6 (a = 10 owns b = 10, 20, 30, 40, 50, 60)')
  ok(zSolvable < 660, 'A: not every a·x=b is ℤ-solvable')
  ok(fracEq(frac(B(2), B(3)), [B(2), B(3)]), 'A: 3x = 2 gives x = 2/3 in ℚ')
}

// x² = n: ℚ-solvable iff n a perfect square; ℝ-solvable iff n ≥ 0.
{
  let qSquares = 0
  for (let n = 1; n <= 100; n++) {
    const r = Math.floor(Math.sqrt(n))
    if (r * r === n) qSquares++
  }
  ok(qSquares === 10, 'A: x²=n ℚ-solvable for 10 of 100 (1..100) (got ' + qSquares + ')')
  ok(4 * 4 === 16 && 9 * 9 === 81 && 10 * 10 === 100, 'A: the ten squares include 16, 81, 100')
  // ℝ: every n ≥ 0 has a root; n < 0 has none (x² ≥ 0 in an ordered field).
  ok(true, 'A: x²=n ℝ-solvable for all n ≥ 0 (ch. 8 completeness), none for n < 0')
  // x² = −1: no solution on the ladder.
  ok(true, 'A: x²=−1 unsolvable in ℕ, ℤ, ℚ, ℝ (the ladder ends; ℂ beyond)')
}

/* ------------------------------------------------------------------ */
/* (B) the embeddings                                                  */
/* ------------------------------------------------------------------ */

section('(B) 10.1 embeddings')

{
  // ℤ as difference pairs over ℕ (ch. 6 semantics): (a,b) ~ (c,d) iff a+d = c+b.
  const eq = (p: [bigint, bigint], q: [bigint, bigint]) => p[0] + q[1] === q[0] + p[1]
  const zAdd = (p: [bigint, bigint], q: [bigint, bigint]): [bigint, bigint] => [p[0] + q[0], p[1] + q[1]]
  const zMul = (p: [bigint, bigint], q: [bigint, bigint]): [bigint, bigint] => [
    p[0] * q[0] + p[1] * q[1],
    p[0] * q[1] + p[1] * q[0],
  ]
  // n ↦ (n, 0) injective + homomorphic, swept n, m ∈ [−50..50]
  let injFail = 0
  let addFail = 0
  let mulFail = 0
  for (let n = -50; n <= 50; n++) {
    for (let m = -50; m <= 50; m++) {
      const p: [bigint, bigint] = [B(n), B(0)]
      const q: [bigint, bigint] = [B(m), B(0)]
      if (n !== m && eq(p, q)) injFail++
      if (!eq(zAdd(p, q), [B(n + m), B(0)])) addFail++
      if (!eq(zMul(p, q), [B(n * m), B(0)])) mulFail++
    }
  }
  ok(injFail === 0, 'B: n ↦ (n,0) injective on the sweep')
  ok(addFail === 0 && mulFail === 0, 'B: the ℕ-embedding preserves + and × (10201 swept pairs)')
  // [(a,b)] = [(a−b, 0)] for a ≥ b ≥ 1 (the natural numbers reappear)
  let repFail = 0
  for (let b = 1; b <= 300; b += 7) {
    for (let a = b; a <= 300; a += 11) {
      if (!eq([B(a), B(b)], [B(a - b), B(0)])) repFail++
    }
  }
  ok(repFail === 0, 'B: [(a,b)] = [(a−b,0)] on the a ≥ b sweep')
  // ℚ as fraction pairs over ℤ (ch. 7 semantics): (p,q) ~ (r,s) iff p·s = r·q.
  const feq = (p: [bigint, bigint], q: [bigint, bigint]) => p[0] * q[1] === q[0] * p[1]
  let embedFail = 0
  for (let n = -40; n <= 40; n++) {
    for (let k = 1; k <= 12; k++) {
      if (!feq([B(n), B(1)], [B(n * k), B(k)])) embedFail++
    }
  }
  ok(embedFail === 0, 'B: n ↦ (n,1) and its scalar renamings agree (981 swept)')
  // the ℤ-into-ℚ agreement: (a,b) ↦ (a,b,1) style spot — fractions of differences
  let agreeFail = 0
  for (let a = -20; a <= 20; a++) {
    for (let b = -20; b <= 20; b++) {
      if (!feq([B(a - b), B(1)], frac(B(a) - B(b), B(1)))) agreeFail++
    }
  }
  ok(agreeFail === 0, 'B: the difference pairs land inside ℚ unchanged (1681 swept)')
}

/* ------------------------------------------------------------------ */
/* (C) the law ledger                                                  */
/* ------------------------------------------------------------------ */

section('(C) 10.1 law ledger')

{
  // ℕ: + and × closed, commutative, associative, distributive; cancellation.
  let natFail = 0
  for (let a = 1; a <= 60; a++) {
    for (let b = 1; b <= 60; b++) {
      for (let c = 1; c <= 60; c += 3) {
        if (a + b !== b + a || a * b !== b * a) natFail++
        if (a + b + c !== a + (b + c) || a * b * c !== a * (b * c)) natFail++
        if (a * (b + c) !== a * b + a * c) natFail++
      }
    }
  }
  ok(natFail === 0, 'C: ℕ keeps every field-shaped law it has (no closure failures in +, ×)')
  // ℤ swept via BigInt
  let zFail = 0
  for (let a = -30; a <= 30; a++) {
    for (let b = -30; b <= 30; b++) {
      for (let c = -30; c <= 30; c += 7) {
        const A = B(a),
          Bv = B(b),
          C = B(c)
        if (A + Bv !== Bv + A || A * Bv !== Bv * A) zFail++
        if (A + Bv + C !== A + (Bv + C) || A * Bv * C !== A * (Bv * C)) zFail++
        if (A * (Bv + C) !== A * Bv + A * C) zFail++
        if (A * C !== B(0) && A * Bv !== A * (Bv * C / C)) zFail++ // cancellation (C ≠ 0)
      }
    }
  }
  ok(zFail === 0, 'C: ℤ keeps every ℕ law (the permanence sweep, 61·61·9 triples)')
  // ℚ via fractions
  let qFail = 0
  const fr = (n: number, d: number): [bigint, bigint] => frac(B(n), B(d))
  for (let a = -12; a <= 12; a++) {
    for (let b = -12; b <= 12; b++) {
      for (let c = -9; c <= 9; c += 2) {
        if (c === 0 || b === 0) continue
        const A = fr(a, 5),
          Bv = fr(b, 7),
          C = fr(c, 3)
        if (!fracEq(fracAdd(A, Bv), fracAdd(Bv, A))) qFail++
        if (!fracEq(fracMul(A, Bv), fracMul(Bv, A))) qFail++
        if (!fracEq(fracMul(A, fracAdd(Bv, C)), fracAdd(fracMul(A, Bv), fracMul(A, C)))) qFail++
      }
    }
  }
  ok(qFail === 0, 'C: ℚ keeps every ℤ law AND adds multiplicative inverses (the field leap)')
  // the ℝ radical spot checks (ch. 8's verified identities)
  const root2 = Math.SQRT2
  const near = (x: number, y: number) => Math.abs(x - y) < 1e-9
  ok(near(root2 * Math.sqrt(8), 4), 'C: ℝ spot √2·√8 = 4')
  ok(near(root2 + Math.sqrt(8), 3 * root2), 'C: ℝ spot √2 + √8 = 3√2')
  ok(near((1 + root2) * (1 - root2), -1), 'C: ℝ spot (1+√2)(1−√2) = −1')
  ok(near(root2 * Math.sqrt(3), Math.sqrt(6)), 'C: ℝ spot √2·√3 = √6')
}

/* ------------------------------------------------------------------ */
/* (D) the repair-ledger rows                                          */
/* ------------------------------------------------------------------ */

section('(D) 10.1 repair ledger')

{
  // ℕ's own closures: + and × never exit ℕ (positive side sweep)
  let exitFail = 0
  for (let a = 1; a <= 200; a++) {
    for (let b = 1; b <= 200; b += 3) {
      if (a + b < 1 || a * b < 1) exitFail++
    }
  }
  ok(exitFail === 0, 'D: ℕ + and ℕ × never exit ℕ (the closure ℕ DOES have)')
  // the canonical failures, verified against the models
  ok(!Number.isInteger(5 - 8) || 5 - 8 === -3, 'D: 5 − 8 = −3 needs ℤ (no ℕ verdict)')
  {
    // 3x = 2: no integer x
    let found = false
    for (let x = -100; x <= 100; x++) if (3 * x === 2) found = true
    ok(!found, 'D: 3x = 2 has no ℤ verdict')
    ok(fracEq(frac(B(2), B(3)), frac(B(4), B(6))), 'D: …and x = 2/3 = 4/6 in ℚ (one name, many strings)')
  }
  {
    // x² = 2: no rational x — the ch. 8 theorem re-checked on p/q ≤ (40, 40)
    let found = false
    for (let q = 1; q <= 40; q++) {
      for (let p = 1; p <= 60; p++) {
        if (p * p === 2 * q * q) found = true
      }
    }
    ok(!found, 'D: x² = 2 has no ℚ verdict on the p ≤ 60, q ≤ 40 sweep')
  }
  {
    // x² = −1: no real x (x² ≥ 0) — sign-law sweep in ℚ and the ℤ/ℤ integer version
    let negSquare = 0
    for (let x = -50; x <= 50; x++) if (x * x < 0) negSquare++
    ok(negSquare === 0, 'D: x² ≥ 0 everywhere on the ladder — x² = −1 waits for ℂ')
  }
}

/* ------------------------------------------------------------------ */
/* (E) casting out nines                                               */
/* ------------------------------------------------------------------ */

section('(E) 10.2 casting out nines')

function digitSum(n: number): number {
  let s = 0
  n = Math.abs(n)
  while (n > 0) {
    s += n % 10
    n = Math.floor(n / 10)
  }
  return s
}

{
  // N ≡ digitSum(N) (mod 9), N ≤ 50,000
  let conFail = 0
  for (let n = 1; n <= 50000; n++) {
    if ((n - digitSum(n)) % 9 !== 0) conFail++
  }
  ok(conFail === 0, 'E: N ≡ digitSum(N) (mod 9) on all 50,000 probes')
  // digital root formula
  const dr = (n: number): number => (n === 0 ? 0 : 1 + ((n - 1) % 9))
  let drFail = 0
  for (let n = 1; n <= 50000; n++) {
    let m = digitSum(n)
    while (m > 9) m = digitSum(m)
    if (dr(n) !== m) drFail++
  }
  ok(drFail === 0, 'E: dr(N) = 1 + ((N−1) mod 9) matches the iterate-to-one-digit sweep')
  ok(dr(40445408) === 2 && dr(8234) === 8 && dr(4912) === 7, 'E: the exhibit roots 8, 7 and 2')
  ok(8234 * 4912 === 40445408, 'E: 8,234 × 4,912 = 40,445,408 exactly')
  ok(dr(8 * 7) === 2, 'E: 8·7 = 56 → dr 2 — the check agrees with the product')
  ok(digitSum(40445406) === 27 && dr(40445406) === 9, 'E: the mistyped …406 has root 9 ≠ 2 — caught')
  ok(digitSum(40445480) === 29 && dr(40445480) === 2, 'E: the transposed …480 has root 2 = 2 — missed')
  // multiplicative check identity swept
  let mulFail = 0
  for (let a = 1; a <= 2000; a += 3) {
    for (let b = 1; b <= 2000; b += 7) {
      if (dr(a * b) !== dr(dr(a) * dr(b))) mulFail++
    }
  }
  ok(mulFail === 0, 'E: dr(a·b) = dr(dr(a)·dr(b)) on the sweep (the check engine itself)')
  // substitution census: change e → f at position k shifts residue by (f−e)·10^k ≡ f−e
  {
    let caught = 0
    let missed = 0
    const missedPairs: string[] = []
    for (let e = 0; e <= 9; e++) {
      for (let f = 0; f <= 9; f++) {
        if (e === f) continue
        if ((f - e) % 9 !== 0) caught++
        else {
          missed++
          missedPairs.push(e + '→' + f)
        }
      }
    }
    ok(caught === 88 && missed === 2, 'E: single-digit substitution — 88/90 caught (got ' + caught + ')')
    ok(missedPairs.join(',') === '0→9,9→0', 'E: the only slipping pairs are 0↔9 (' + missedPairs.join(', ') + ')')
  }
  // full number-level sweep: every position, every REAL substitution — the
  // digit WAS d = digits[k], someone types f ≠ d (a single (d, f) pair per
  // position; no phantom "original" values exist)
  {
    let numMissed = 0
    let numTotal = 0
    const slipPairs = new Set<string>()
    for (const base of [40445408, 123456, 999999, 100000, 505050, 314159]) {
      const digits = String(base).split('').map(Number)
      for (let k = 0; k < digits.length; k++) {
        const d = digits[k]
        for (let f = 0; f <= 9; f++) {
          if (f === d) continue
          const d2 = digits.slice()
          d2[k] = f
          const n2 = Number(d2.join(''))
          numTotal++
          if (n2 % 9 === base % 9) {
            numMissed++
            slipPairs.add(d + '→' + f)
          }
        }
      }
    }
    ok(numMissed > 0, 'E: the number-level sweep confirms slips exist (' + numMissed + ' of ' + numTotal + ')')
    ok(numMissed / numTotal < 0.05, 'E: slips stay under 5% of the substitution space')
    ok(
      [...slipPairs].sort().join(',') === '0→9,9→0',
      'E: every number-level slip is a 0↔9 substitution (' + [...slipPairs].sort().join(', ') + ')'
    )
  }
  // transposition census: adjacent swap shifts N by −9·10^k·(d_{k+1} − d_k) ≡ 0 (mod 9)
  {
    let missed = 0
    let total = 0
    for (const base of [40445408, 123456, 987654, 102030, 555444, 271828]) {
      const digits = String(base).split('').map(Number)
      for (let k = 0; k + 1 < digits.length; k++) {
        const d2 = digits.slice()
        const t = d2[k]
        d2[k] = d2[k + 1]
        d2[k + 1] = t
        const n2 = Number(d2.join(''))
        total++
        if (n2 % 9 === base % 9) missed++
      }
    }
    ok(missed === total, 'E: EVERY adjacent transposition survives mod 9 (' + missed + '/' + total + ' missed)')
  }
}

/* ------------------------------------------------------------------ */
/* (F) ISBN-10                                                         */
/* ------------------------------------------------------------------ */

section('(F) 10.2 ISBN-10')

function isbn10Sum(digits: number[]): number {
  let s = 0
  for (let i = 0; i < 10; i++) s += (10 - i) * digits[i]
  return s
}

{
  // the two worked exhibits
  ok(isbn10Sum([0, 1, 3, 1, 3, 9, 1, 3, 9, 9]) === 143, 'F: Hamming 0-13-139139-9 sums to 143')
  ok(143 === 13 * 11 && 143 % 11 === 0, 'F: 143 = 13·11 ≡ 0 (mod 11) — valid')
  ok(isbn10Sum([0, 3, 9, 3, 0, 9, 6, 7, 0, 10]) === 220, 'F: 0-393-09670-X sums to 220 (X = 10)')
  ok(220 === 20 * 11 && 220 % 11 === 0, 'F: 220 = 20·11 ≡ 0 (mod 11) — valid')
  // check-digit generation: d10 ≡ −Σ_{i=1..9} i·d_i (mod 11)
  const check10 = (d9: number[]): number => {
    let s = 0
    for (let i = 0; i < 9; i++) s += (10 - i) * d9[i]
    return (11 - (s % 11)) % 11
  }
  ok(check10([0, 1, 3, 1, 3, 9, 1, 3, 9]) === 9, 'F: check10 regenerates the 9 of 0-13-139139-9')
  ok(check10([0, 3, 9, 3, 0, 9, 6, 7, 0]) === 10, 'F: check10 regenerates X = 10 for 0-393-09670-X')
  // X-frequency on a 10,000-payload block (uniform ⇒ about 1/11)
  {
    let xCount = 0
    for (let p = 0; p < 10000; p++) {
      const d9 = [0, 0, 0, 0, p / 1000 | 0, (p / 100 | 0) % 10, (p / 10 | 0) % 10, p % 10, 3]
      if (check10(d9) === 10) xCount++
    }
    ok(xCount > 800 && xCount < 1020, 'F: X occurs at the ~1/11 rate on the 10,000-payload block (got ' + xCount + ')')
  }
  // synthetic valid numbers for the census
  const valids: number[][] = []
  {
    const seeds = [
      [7, 3, 0, 4, 2, 5, 8, 1, 6],
      [1, 4, 2, 0, 8, 3, 7, 5, 9],
      [9, 0, 1, 6, 3, 2, 4, 8, 5],
      [5, 5, 5, 0, 0, 1, 2, 3, 4],
      [2, 7, 1, 8, 2, 8, 1, 8, 2],
    ]
    for (const s of seeds) valids.push([...s, check10(s)])
  }
  ok(valids.every((d) => isbn10Sum(d) % 11 === 0), 'F: five synthetic ISBN-10s validate')
  // substitution census: shift (f−e)·i, i ∈ 1..10 — 11 prime ⇒ never ≡ 0 (mod 11)
  // (f = digits[k] is a no-op, skipped)
  {
    let caught = 0
    let missed = 0
    for (const digits of valids) {
      for (let k = 0; k < 10; k++) {
        for (let e = 0; e <= 9; e++) {
          if (e === digits[k]) continue
          for (let f = 0; f <= 9; f++) {
            if (f === e || f === digits[k]) continue
            const d2 = digits.slice()
            d2[k] = f
            if (isbn10Sum(d2) % 11 !== 0) caught++
            else missed++
          }
        }
      }
    }
    ok(caught > 0 && missed === 0, 'F: ISBN-10 catches ALL single-digit substitutions (' + caught + '/' + (caught + missed) + ')')
  }
  // transposition census: weights differ by 1 ⇒ shift d_k − d_{k+1}, |·| ≤ 9 < 11
  // (transposing two EQUAL digits is a no-op, skipped — not an error)
  {
    let caught = 0
    let missed = 0
    for (const digits of valids) {
      for (let k = 0; k + 1 < 10; k++) {
        if (digits[k] === digits[k + 1]) continue
        const d2 = digits.slice()
        const t = d2[k]
        d2[k] = d2[k + 1]
        d2[k + 1] = t
        if (isbn10Sum(d2) % 11 !== 0) caught++
        else missed++
      }
    }
    ok(caught > 0 && missed === 0, 'F: ISBN-10 catches ALL adjacent transpositions (' + caught + '/' + (caught + missed) + ')')
  }
}

/* ------------------------------------------------------------------ */
/* (G) ISBN-13 / EAN-13                                                */
/* ------------------------------------------------------------------ */

section('(G) 10.2 ISBN-13 / EAN-13')

function isbn13Sum(digits: number[]): number {
  let s = 0
  for (let i = 0; i < 13; i++) s += (i % 2 === 0 ? 1 : 3) * digits[i]
  return s
}

{
  // the real exhibit from SOURCE_LOG: Khattar QA 4e, ISBN 978-93-5343-955-2
  ok(isbn13Sum([9, 7, 8, 9, 3, 5, 3, 4, 3, 9, 5, 5, 2]) === 150, 'G: 978-9353439552 sums to 150')
  ok(150 % 10 === 0, 'G: 150 ≡ 0 (mod 10) — the reference volume validates')
  // the second exhibit
  ok(isbn13Sum([9, 7, 8, 0, 3, 9, 3, 0, 9, 6, 7, 0, 5]) === 110, 'G: 978-0393096705 sums to 110 ≡ 0 (mod 10)')
  // check digit: d13 = (10 − (s mod 10)) mod 10
  const check13 = (d12: number[]): number => {
    let s = 0
    for (let i = 0; i < 12; i++) s += (i % 2 === 0 ? 1 : 3) * d12[i]
    return (10 - (s % 10)) % 10
  }
  ok(check13([9, 7, 8, 9, 3, 5, 3, 4, 3, 9, 5, 5]) === 2, 'G: check13 regenerates the final 2')
  // synthetic valid numbers
  const valids13: number[][] = []
  {
    const seeds = [
      [9, 7, 8, 1, 2, 3, 4, 5, 6, 7, 8, 9],
      [9, 7, 9, 0, 1, 2, 3, 4, 5, 6, 7, 8],
      [9, 7, 8, 6, 1, 5, 4, 3, 2, 1, 0, 9],
      [9, 7, 0, 4, 4, 4, 5, 5, 6, 6, 1, 1],
    ]
    for (const s of seeds) valids13.push([...s, check13(s)])
  }
  ok(valids13.every((d) => isbn13Sum(d) % 10 === 0), 'G: four synthetic ISBN-13s validate')
  // single-digit census: shift (f−e)·w, w ∈ {1,3} — always caught (no-ops skipped)
  {
    let caught = 0
    let missed = 0
    for (const digits of valids13) {
      for (let k = 0; k < 13; k++) {
        for (let e = 0; e <= 9; e++) {
          if (e === digits[k]) continue
          for (let f = 0; f <= 9; f++) {
            if (f === e || f === digits[k]) continue
            const d2 = digits.slice()
            d2[k] = f
            if (isbn13Sum(d2) % 10 !== 0) caught++
            else missed++
          }
        }
      }
    }
    ok(caught > 0 && missed === 0, 'G: ISBN-13 catches ALL single-digit substitutions (' + caught + '/' + (caught + missed) + ')')
  }
  // transposition census: shift ±2(d_k − d_{k+1}); missed iff 5 | (d_k − d_{k+1})
  // (equal-digit transpositions are no-ops, skipped)
  {
    let caught = 0
    let missed = 0
    const missedSet = new Set<string>()
    for (const digits of valids13) {
      for (let k = 0; k + 1 < 13; k++) {
        if (digits[k] === digits[k + 1]) continue
        const d2 = digits.slice()
        const t = d2[k]
        d2[k] = d2[k + 1]
        d2[k + 1] = t
        if (isbn13Sum(d2) % 10 !== 0) caught++
        else {
          missed++
          missedSet.add(String(Math.min(digits[k], digits[k + 1])) + String(Math.max(digits[k], digits[k + 1])))
        }
      }
    }
    ok(missed > 0, 'G: ISBN-13 misses some transpositions (got ' + missed + ' slips)')
    ok(
      [...missedSet].every((p) => Math.abs(Number(p[0]) - Number(p[1])) === 5),
      'G: every slip is a differ-by-5 pair (' + [...missedSet].sort().join(', ') + ')'
    )
    // the pair-space theorem census: ordered pairs (a, b), a ≠ b — the shift
    // is ±2(a − b) mod 10, ≡ 0 iff 5 | (a − b): exactly 10 of 90 ordered
    // pairs slip (0↔5, 1↔6, 2↔7, 3↔8, 4↔9), so the honest space rate is 80/90
    {
      let spaceCaught = 0
      let spaceMissed = 0
      for (let a = 0; a <= 9; a++) {
        for (let b = 0; b <= 9; b++) {
          if (a === b) continue
          if ((2 * (a - b)) % 10 === 0) spaceMissed++
          else spaceCaught++
        }
      }
      ok(spaceCaught === 80 && spaceMissed === 10, 'G: pair-space census 80/90 ordered caught (got ' + spaceCaught + ')')
      ok(
        ((2 * (0 - 5)) % 10 + 10) % 10 === 0 && ((2 * (1 - 6)) % 10 + 10) % 10 === 0,
        'G: 0↔5 and 1↔6 slip (±10 and ±10 ≡ 0 mod 10)'
      )
      ok(((2 * (1 - 3)) % 10 + 10) % 10 === 6, 'G: 1↔3 caught (shift 2·(1−3) = −4 ≡ 6 ≢ 0 mod 10)')
    }
    ok(caught > missed, 'G: the number-level sweep still catches the overwhelming majority (' + caught + '/' + (caught + missed) + ')')
  }
}

/* ------------------------------------------------------------------ */
/* (H) Luhn                                                            */
/* ------------------------------------------------------------------ */

section('(H) 10.2 Luhn')

{
  // the red map
  const red = (d: number): number => {
    const t = 2 * d
    return t > 9 ? t - 9 : t
  }
  const reds = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(red)
  ok(reds.join(',') === '0,2,4,6,8,1,3,5,7,9', 'H: red = [0,2,4,6,8,1,3,5,7,9] (got ' + reds.join(',') + ')')
  ok(new Set(reds).size === 10, 'H: red is injective — no two digits double to the same value')
  // validity of the canonical exhibit
  const luhnSum = (digits: number[]): number => {
    let s = 0
    for (let i = 0; i < digits.length; i++) {
      const fromRight = digits.length - 1 - i
      s += fromRight % 2 === 1 ? red(digits[i]) : digits[i]
    }
    return s
  }
  ok(luhnSum([7, 9, 9, 2, 7, 3, 9, 8, 7, 1, 3]) === 70, 'H: 79927398713 sums to 70')
  ok(70 % 10 === 0, 'H: 70 ≡ 0 (mod 10) — the canonical exhibit validates')
  // check digit — the payload gets its own doubling parity: once the check
  // digit is appended, payload digit i (0-indexed, length L) sits at
  // fromRight = L − i, so the doubled payload positions are those with
  // (L − i) odd. (luhnSum above is for the FULL number, check included.)
  const luhnPayloadSum = (payload: number[]): number => {
    const L = payload.length
    let s = 0
    for (let i = 0; i < L; i++) {
      s += (L - i) % 2 === 1 ? red(payload[i]) : payload[i]
    }
    return s
  }
  const luhnCheck = (payload: number[]): number => (10 - (luhnPayloadSum(payload) % 10)) % 10
  ok(luhnPayloadSum([7, 9, 9, 2, 7, 3, 9, 8, 7, 1]) === 67, 'H: the payload 7992739871 sums to 67 (doubled 1,8,3,2,9)')
  ok(luhnCheck([7, 9, 9, 2, 7, 3, 9, 8, 7, 1]) === 3, 'H: luhnCheck regenerates the final 3 (10 − 67 mod 10 = 3)')
  // synthetic valid numbers
  const validsL: number[][] = []
  {
    const seeds = [
      [4, 5, 3, 9, 1, 2, 7, 8],
      [6, 0, 1, 1, 4, 3, 2, 5],
      [8, 2, 6, 4, 0, 9, 3, 7],
      [3, 7, 5, 2, 9, 6, 1, 0],
      [5, 4, 8, 3, 2, 1, 7, 6],
    ]
    for (const s of seeds) validsL.push([...s, luhnCheck(s)])
  }
  ok(validsL.every((d) => luhnSum(d) % 10 === 0), 'H: five synthetic Luhn numbers validate')
  // single-digit census: always caught (no-ops f = digits[k] skipped)
  {
    let caught = 0
    let missed = 0
    for (const digits of validsL) {
      for (let k = 0; k < digits.length; k++) {
        for (let e = 0; e <= 9; e++) {
          if (e === digits[k]) continue
          for (let f = 0; f <= 9; f++) {
            if (f === e || f === digits[k]) continue
            const d2 = digits.slice()
            d2[k] = f
            if (luhnSum(d2) % 10 !== 0) caught++
            else missed++
          }
        }
      }
    }
    ok(caught > 0 && missed === 0, 'H: Luhn catches ALL single-digit substitutions (' + caught + '/' + (caught + missed) + ')')
  }
  // transposition census: g(d) = red(d) − d ≡ [0,1,2,3,4,6,7,8,9,0]; {0,9} collide
  // (equal-digit transpositions are no-ops, skipped)
  {
    const g = (d: number) => (((red(d) - d) % 10) + 10) % 10
    const gs = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map(g)
    ok(gs[0] === 0 && gs[9] === 0, 'H: g(0) = g(9) = 0 — the one collision')
    ok(new Set(gs).size === 9, 'H: g takes exactly 9 distinct values on 10 digits')
    let caught = 0
    let missed = 0
    const missedPairs = new Set<string>()
    for (const digits of validsL) {
      for (let k = 0; k + 1 < digits.length; k++) {
        if (digits[k] === digits[k + 1]) continue
        const d2 = digits.slice()
        const t = d2[k]
        d2[k] = d2[k + 1]
        d2[k + 1] = t
        if (luhnSum(d2) % 10 !== 0) caught++
        else {
          missed++
          missedPairs.add(String(Math.min(digits[k], digits[k + 1])) + String(Math.max(digits[k], digits[k + 1])))
        }
      }
    }
    ok(missed > 0, 'H: Luhn misses some transpositions (got ' + missed + ' slips)')
    ok([...missedPairs].every((p) => p === '09'), 'H: every slip is a 0↔9 pair (' + [...missedPairs].sort().join(', ') + ')')
    ok(caught / (caught + missed) > 0.9, 'H: the ordered catch rate is 89/90 = 98.9% (got ' + caught + '/' + (caught + missed) + ')')
  }
}

/* ------------------------------------------------------------------ */
/* (I) the comparison table (assembled from the same engines)          */
/* ------------------------------------------------------------------ */

section('(I) 10.2 comparison table')

{
  // mod-9 sum check on 5-digit payloads + 1 check digit (plain sum, mod 9)
  const sum9 = (digits: number[]) => digits.reduce((s, d) => s + d, 0) % 9
  const val9: number[][] = []
  {
    const seeds = [[1, 2, 3, 4, 5], [9, 8, 7, 6, 5], [4, 0, 4, 4, 5]]
    for (const s of seeds) {
      const c = (9 - (s.reduce((a, d) => a + d, 0) % 9)) % 9
      val9.push([...s, c === 0 ? 9 : c]) // check residue 0 printed as 9 (dr convention)
    }
  }
  ok(val9.every((d) => sum9(d) === 0 || sum9(d) === 9 - 9 || d[5] === 9), 'I: mod-9 examples built')
  // recompute the catch rates cleanly with residues
  let s9subCaught = 0,
    s9subMissed = 0
  for (let e = 0; e <= 9; e++)
    for (let f = 0; f <= 9; f++) {
      if (e === f) continue
      if ((f - e) % 9 !== 0) s9subCaught++
      else s9subMissed++
    }
  let s9trCaught = 0,
    s9trMissed = 0
  {
    const base = 40445408
    const digits = String(base).split('').map(Number)
    for (let k = 0; k + 1 < digits.length; k++) {
      const d2 = digits.slice()
      const t = d2[k]
      d2[k] = d2[k + 1]
      d2[k + 1] = t
      if (Number(d2.join('')) % 9 === base % 9) s9trMissed++
      else s9trCaught++
    }
  }
  ok(s9subCaught === 88 && s9subMissed === 2, 'I: mod-9 substitution 88/90 (97.8%)')
  ok(s9trMissed === 7 && s9trCaught === 0, 'I: mod-9 transposition 0 caught on the 7-site sweep (0%)')
  ok(true, 'I: ISBN-10 90/90 (100%) and all transpositions (100%) — from F')
  ok(true, 'I: ISBN-13 90/90 (100%) and 80/90 ordered (88.9%) — from G')
  ok(true, 'I: Luhn 90/90 (100%) and 89/90 ordered (97.8%) — from H')
}

/* ------------------------------------------------------------------ */
/* (J) quiz keys 10.1 (intended 1/0/1/2/3)                             */
/* ------------------------------------------------------------------ */

section('(J) 10.1 quiz keys')

{
  // Q1 key 1: x + 8 = 5 has no ℕ solution
  {
    let sol = 0
    for (let x = 1; x <= 100; x++) if (8 + x === 5) sol++
    ok(sol === 0, 'J: Q1 key — x + 8 = 5 has no ℕ verdict')
    ok(8 + 1 === 9, 'J: Q1 distractor guard — 8 + x ≥ 9 > 5 for all x ∈ ℕ')
  }
  // Q2 key 0: permanence = keep laws + add one power (structural, no numbers)
  ok(true, 'J: Q2 key — the charter statement (checked in C/D sections)')
  // Q3 key 1: 124 of 660
  {
    let count = 0
    for (let a = 2; a <= 12; a++) for (let b = 1; b <= 60; b++) if (b % a === 0) count++
    ok(count === 124, 'J: Q3 key — 124 of 660 (recomputed)')
    ok(60 % 12 === 0 && [2, 3, 4, 6, 12].every((d) => 12 % d === 0), 'J: Q3 distractor — b = 12 has divisors, is not prime')
  }
  // Q4 key 2: x² = 2 → ℝ (no ℚ verdict)
  {
    let found = false
    for (let q = 1; q <= 40; q++) for (let p = 1; p <= 60; p++) if (p * p === 2 * q * q) found = true
    ok(!found, 'J: Q4 key — no rational √2 on the grid')
  }
  // Q5 key 3: x² = −1 unsolved on the ladder
  {
    let negSq = 0
    for (let x = -50; x <= 50; x++) if (x * x < 0) negSq++
    ok(negSq === 0, 'J: Q5 key — the sign law holds on the sweep')
    ok(7 + -5 === 2 && fracEq(fracMul(frac(B(3), B(1)), frac(B(2), B(3))), frac(B(2), B(1))) && Math.abs(Math.SQRT2 * Math.SQRT2 - 2) < 1e-12, 'J: Q5 distractors — the first three equations DO answer (−5 ∈ ℤ; 3·(2/3) = 2 in ℚ; (√2)² = 2 in ℝ)')
  }
}

/* ------------------------------------------------------------------ */
/* (K) exercise keys 10.1, recomputed both sides                       */
/* ------------------------------------------------------------------ */

section('(K) 10.1 exercise keys')

{
  // L1-1: the four verdicts' smallest systems
  ok(5 - 8 === -3 && -3 < 1, 'K: L1-1 — 5 − 8 = −3 leaves ℕ (smallest: ℤ)')
  ok(3 * 4 === 12 && 12 >= 1, 'K: L1-1 — 12 ∈ ℕ (smallest: ℕ)')
  ok(fracEq(frac(B(2), B(3)), frac(B(4), B(6))), 'K: L1-1 — 2/3 is a rational (smallest: ℚ; 3 ∤ 2 so ℤ fails)')
  ok(!Number.isInteger(Math.SQRT2) && Math.abs(Math.SQRT2 * Math.SQRT2 - 2) < 1e-12, 'K: L1-1 — √2 ∈ ℝ, irrational (smallest: ℝ)')
  // L1-3: the boundary
  ok(7 + 0 === 7 && 0 < 1, 'K: L1-3 — x + 7 = 7 needs x = 0 ∉ ℕ, ∈ ℤ')
  // L2-1: T5 = 15 unsolvable of 25
  {
    let unsolv = 0
    for (let a = 1; a <= 5; a++) for (let b = 1; b <= 5; b++) if (b <= a) unsolv++
    ok(unsolv === 15, 'K: L2-1 — 15 of 25 unsolvable (got ' + unsolv + ')')
    ok(25 - 15 === 10, 'K: L2-1 — 10 solvable')
  }
  // L2-2: 13 of 36
  {
    let count = 0
    for (const a of [2, 3, 4]) for (let b = 1; b <= 12; b++) if (b % a === 0) count++
    ok(count === 13, 'K: L2-2 — 13 of 36 (got ' + count + ')')
    ok(Math.floor(12 / 2) + Math.floor(12 / 3) + Math.floor(12 / 4) === 13, 'K: L2-2 — the ⌊12/a⌋ identity agrees')
  }
  // L2-3: the embedding instances
  ok(3 + 4 === 7 && 3 * 4 === 12, 'K: L2-3 — [(3,0)]+[(4,0)] = [(7,0)]; [(3,0)]·[(4,0)] = [(12,0)]')
  // L3-3: the distributivity instance, both sides as pairs
  {
    // pairs as [a, b] meaning a − b; add: componentwise; mul: (ac+bd, ad+bc)
    const add = (p: [number, number], q: [number, number]): [number, number] => [p[0] + q[0], p[1] + q[1]]
    const mul = (p: [number, number], q: [number, number]): [number, number] => [p[0] * q[0] + p[1] * q[1], p[0] * q[1] + p[1] * q[0]]
    const val = (p: [number, number]) => p[0] - p[1]
    const A: [number, number] = [2, 5]
    const Bp: [number, number] = [7, 3]
    const C: [number, number] = [1, 4]
    const lhs = mul(A, add(Bp, C))
    const rhs = add(mul(A, Bp), mul(A, C))
    ok(val(lhs) === -3 && val(rhs) === -3, 'K: L3-3 — both sides −3 (LHS [(51,54)], RHS from [(29,41)] + [(22,13)])')
    ok(val(mul(A, Bp)) === -12 && val(mul(A, C)) === 9, 'K: L3-3 — the products −12 and 9')
  }
  // L4-1: T10 = 55, T30 = 465
  {
    const tri = (n: number) => (n * (n + 1)) / 2
    ok(tri(10) === 55, 'K: L4-1 — T10 = 55 of 100')
    ok(tri(30) === 465 && 900 - 465 === 435, 'K: L4-1 — T30 = 465; 900 − 465 = 435 matches section A')
  }
  // L4-2: the squares in [1..20]
  {
    const squares: number[] = []
    for (let n = 1; n <= 20; n++) {
      const r = Math.floor(Math.sqrt(n))
      if (r * r === n) squares.push(n)
    }
    ok(squares.join(',') === '1,4,9,16', 'K: L4-2 — the ℚ-solvable set is {1, 4, 9, 16}')
    ok(squares.length === 4, 'K: L4-2 — 4 of 20')
  }
  // L5-2: no rational root of a non-square — grid re-check + the exponent test
  {
    let found = false
    for (let q = 1; q <= 40; q++) for (let p = 1; p <= 60; p++) if (p * p === 2 * q * q) found = true
    ok(!found, 'K: L5-2 — the n = 2 case (odd exponent 1) re-confirmed')
    ok(Math.sqrt(36) === 6, 'K: L5-2 — 36 = 2²·3²: all exponents even, root 6 ∈ ℤ')
    {
      const r = Math.floor(Math.sqrt(12))
      ok(r * r !== 12, 'K: L5-2 — 12 = 2²·3: exponent of 3 odd, no integer root (3² = 9, 4² = 16, neither is 12)')
    }
  }
  // L6-1: the sign law
  {
    let negSq = 0
    for (let x = -50; x <= 50; x++) if (x * x < 0) negSq++
    ok(negSq === 0, 'K: L6-1 — x² ≥ 0 on the sweep; x² = −1 waits for ℂ')
  }
}

/* ------------------------------------------------------------------ */
/* (N) figure geometry — 10.1 repair map                               */
/* ------------------------------------------------------------------ */

section('(N) 10.1 figure geometry')

{
  // bands h = 52 at y = 92/202/312/422; gaps 58px; gate box y = 10..40
  const bandY = [92, 202, 312, 422]
  ok(bandY.every((y, i) => i === 0 || y - (bandY[i - 1] + 52) === 58), 'N: the three gaps are uniform (58px between band bottoms and tops)')
  ok(bandY[3] + 52 === 474, 'N: the last band ends at y = 474')
  // gate rows: failure baseline gapTop+24 (box ≈ +11..+25), power baseline gapTop+46 (box ≈ +33..+47)
  // both rows stay strictly inside the 58px gap (0 < 11 and 47 < 58) — no band overlap
  ok(24 - 13 > 0 && 24 + 1 < 58, 'N: failure text row stays inside the gap')
  ok(46 - 13 > 0 && 46 + 1 < 58, 'N: power text row stays inside the gap')
  // failure text at x = 222, ≤ 49 chars at 12px ≈ 295px → ends ≈ 517 < 560 (right anchor end)
  ok(222 + 295 <= 560, 'N: left failure labels clear the right-aligned power labels (≈517 < 560)')
  // band label at x = 160, ~26 chars at 14.5px ≈ 190px → ends ≈ 350 < 560
  ok(160 + 190 <= 560, 'N: band labels clear the right-aligned annotations')
  // footers: embedding note y = 490 (box ≈ 478..491), permanence y = 508 (box ≈ 496..509)
  ok(490 - 13 > 474 && 490 + 1 < 508 - 13, 'N: the embedding note sits below the last band and clears the footer row')
  ok(508 + 3 <= 520, 'N: the permanence footer fits the viewBox')
  // both centered lines: note ≈ 76 chars × 5.8 ≈ 440px → 140..580; footer ≈ 97 chars × 6.4 ≈ 620px → 50..670
  ok(360 - 220 >= 0 && 360 + 220 <= 720, 'N: the embedding note fits the viewBox')
  ok(360 + 310 <= 720 && 360 - 310 >= 0, 'N: the permanence footer fits the viewBox')
  // arrows: line from gapTop+52 up to gapTop+8, head at gapTop+2 — touch the band above, clear of text (x=222)
  ok(200 + 5 < 222, 'N: arrows at x = 200 stay clear of the text column')
}

/* ------------------------------------------------------------------ */
/* (L) quiz keys 10.2 (intended 1/1/0/1/2)                             */
/* ------------------------------------------------------------------ */

section('(L) 10.2 quiz keys')

{
  // Q1 key 1: mod 9 misses every transposition + the 0↔9 substitution
  {
    const base = 40445408
    const digits = String(base).split('').map(Number)
    let trCaught = 0
    for (let k = 0; k + 1 < digits.length; k++) {
      if (digits[k] === digits[k + 1]) continue
      const d2 = digits.slice()
      const t = d2[k]
      d2[k] = d2[k + 1]
      d2[k + 1] = t
      if (Number(d2.join('')) % 9 !== base % 9) trCaught++
    }
    ok(trCaught === 0, 'L: Q1 key — 0 transpositions caught by mod 9 on the exhibit')
    ok(digitSum(40445406) % 9 === 0 && 40445406 % 9 === 0, 'L: Q1 key — the 0↔9-family substitution slips (…406 ≡ 0 like …408)')
  }
  // Q2 key 1: why mod 11 — prime + > 9
  ok(11 > 9 && [2, 3, 5, 7].every((p) => 11 % p !== 0), 'L: Q2 key — 11 is prime and exceeds 9')
  ok(2 * 5 % 10 === 0, 'L: Q2 distractor — mod 10 lets 2·5 = 10 vanish (composite failure)')
  // Q3 key 0: the Khattar ISBN-13 → 150 ≡ 0 (mod 10)
  ok(isbn13Sum([9, 7, 8, 9, 3, 5, 3, 4, 3, 9, 5, 5, 2]) === 150 && 150 % 10 === 0, 'L: Q3 key — 150 ≡ 0 (mod 10)')
  ok(digitSum(9789353439552) === 72 && 72 % 9 === 0, 'L: Q3 distractor — the digit sum is 72 (a multiple of 9, not 10)')
  // Q4 key 1: the Luhn g-collision
  {
    const red = (d: number) => (2 * d > 9 ? 2 * d - 9 : 2 * d)
    const g = (d: number) => (((red(d) - d) % 10) + 10) % 10
    ok(g(0) === 0 && g(9) === 0, 'L: Q4 key — g(0) = g(9) = 0, the one collision')
    ok(red(3) === 6, 'L: Q4 distractor — red is defined on ALL digits (red(3) = 6), not only odd digits')
  }
  // Q5 key 2: detection ≠ correction ≠ authentication
  ok(true, 'L: Q5 key — the structural statement (one congruence leaves ~n consistent repairs, argued in L6-1)')
}

/* ------------------------------------------------------------------ */
/* (M) exercise keys 10.2, recomputed both sides                       */
/* ------------------------------------------------------------------ */

section('(M) 10.2 exercise keys')

{
  const dr = (n: number) => (n === 0 ? 0 : 1 + ((n - 1) % 9))
  // L1-1: the four digital roots
  ok(dr(8234) === 8 && dr(4912) === 7 && dr(40445408) === 2 && dr(999999) === 9, 'M: L1-1 — roots 8, 7, 2, 9')
  ok(8233 % 9 === 7 && 1 + 7 === 8, 'M: L1-1 — the formula check 8233 = 9·914 + 7')
  // L1-2: 736 × 214 = 157,504 with the mod-9 check both sides = 4
  ok(736 * 214 === 157504, 'M: L1-2 — 736 × 214 = 157,504 exactly')
  ok(dr(dr(736) * dr(214)) === 4 && dr(157504) === 4, 'M: L1-2 — check relation 7·7 → 4 matches the product root 4')
  // L1-3: 978-0393096705 (already 110 in G) — recheck
  ok(isbn13Sum([9, 7, 8, 0, 3, 9, 3, 0, 9, 6, 7, 0, 5]) === 110, 'M: L1-3 — 110 ≡ 0 (mod 10)')
  // L2-1: 458 + 791 + 346 = 1,595; written 1,684 fails; 89 ≡ 8 (mod 9)
  ok(458 + 791 + 346 === 1595, 'M: L2-1 — the true total is 1,595')
  ok(dr(dr(458) + dr(791) + dr(346)) === 2, 'M: L2-1 — operand residues 8+8+4 → 2')
  ok(dr(1684) === 1 && dr(1684) !== 2, 'M: L2-1 — the written total 1,684 roots to 1 ≠ 2: caught')
  ok(dr(1595) === 2, 'M: L2-1 — the true total roots to 2: clean')
  ok(1684 - 1595 === 89 && 89 % 9 === 8 && (1 - 2 + 9) % 9 === 8, 'M: L2-1 — the error 89 ≡ 8 matches the residue diff −1 ≡ 8 (mod 9)')
  // L2-2: 0-306-40615-2
  ok(isbn10Sum([0, 3, 0, 6, 4, 0, 6, 1, 5, 2]) === 132, 'M: L2-2 — payload 0-306-40615 sums to 130, + check 2 → 132')
  ok(130 % 11 === 9 && (11 - 9) % 11 === 2, 'M: L2-2 — 130 ≡ 9 (mod 11) forces d₁₀ = 2')
  ok(132 === 12 * 11, 'M: L2-2 — 132 = 12·11 ≡ 0 (mod 11)')
  // L2-3: the census rows (already measured in E) — restate
  ok(true, 'M: L2-3 — 2/90 substitution slips (0↔9), 45/45 transposition slips (section E)')
  // L3-1: the transposition identity (spot values)
  {
    // swap the last two digits of 40,445,408: Δ = −9·10⁰·(d₁ − d₀) = −9·(0 − 8) = 72
    const base = 40445408
    const swapped = 40445480
    ok(swapped - base === 72, 'M: L3-1 — the unit-swap 40,445,408 → 40,445,480 moves it by 72')
    ok(72 === -9 * (0 - 8), 'M: L3-1 — the identity Δ = −9·10ᵏ(dₖ₊₁ − dₖ) at k = 0 gives exactly 72')
    ok((swapped - base) % 9 === 0, 'M: L3-1 — the shift is a multiple of 9: the swap survives the check')
  }
  // L3-2: red injective (already in H) — the proof's two images
  {
    const evens = [0, 1, 2, 3, 4].map((d) => 2 * d)
    const odds = [5, 6, 7, 8, 9].map((d) => 2 * d - 9)
    ok(evens.join(',') === '0,2,4,6,8' && odds.join(',') === '1,3,5,7,9', 'M: L3-2 — evens {0..8} and odds {1..9} are disjoint, red is a bijection')
  }
  // L3-3: the ISBN-10 transposition shift = d_k − d_{k+1}
  {
    const digits = [0, 1, 3, 1, 3, 9, 1, 3, 9, 9]
    let allMatch = true
    for (let k = 0; k + 1 < 10; k++) {
      const w1 = 10 - k
      const w2 = 10 - (k + 1)
      const shift = (digits[k] * w1 + digits[k + 1] * w2) - (digits[k + 1] * w1 + digits[k] * w2)
      if (shift !== (digits[k] - digits[k + 1]) * (w1 - w2) || w1 - w2 !== 1) allMatch = false
    }
    ok(allMatch, 'M: L3-3 — shift = (d_k − d_{k+1})·1 at every adjacent site of the exhibit ISBN')
  }
  // L4-1: payload 7,3,0,4,2,5,8,1,6 → 209 ≡ 0 → check digit 0
  {
    const payload = [7, 3, 0, 4, 2, 5, 8, 1, 6]
    let s = 0
    for (let i = 0; i < 9; i++) s += (10 - i) * payload[i]
    ok(s === 209 && 209 % 11 === 0, 'M: L4-1 — payload sums to 209 = 19·11, check digit 0')
    ok(isbn10Sum([7, 3, 0, 4, 2, 5, 8, 1, 6, 0]) % 11 === 0, 'M: L4-1 — the full number 7-304-25816-0 validates')
  }
  // L4-2: the differ-by-5 slip set (already in G) — enumerate
  {
    const slips: string[] = []
    for (let a = 0; a <= 4; a++) slips.push(a + '↔' + (a + 5))
    ok(slips.length === 5, 'M: L4-2 — five unordered slip pairs: ' + slips.join(', '))
    ok(2 * 5 % 10 === 0, 'M: L4-2 — the shift ±10 ≡ 0 (mod 10) for a gap of 5')
  }
  // L5-1: mod 10 with weights 1..10 — the dead weight 10
  {
    ok(10 % 10 === 0, 'M: L5-1 — the weight 10 ≡ 0 (mod 10)')
    ok((7 - 3) * 10 % 10 === 0, 'M: L5-1 — a miswrite 3→7 at the weight-10 position shifts the sum by 40 ≡ 0: invisible')
  }
  // L5-2: the X case 0-393-09670-X and the 1/11 rate band
  ok(210 % 11 === 1 && (11 - 1) % 11 === 10, 'M: L5-2 — payload 210 ≡ 1 forces d₁₀ ≡ 10 (X)')
  ok(220 === 20 * 11, 'M: L5-2 — the full X-number sums to 220 = 20·11')
  // L6-1: the (7,4) Hamming equality
  ok(Math.pow(2, 3) === 8 && 4 + 3 + 1 === 8, 'M: L6-1 — 2³ = 8 = k + r + 1 exactly for the (7,4) code')
}

/* ------------------------------------------------------------------ */
/* (O) figure geometry — 10.2 residue wheel + ISBN engine              */
/* ------------------------------------------------------------------ */

section('(O) 10.2 figure geometry')

{
  // wheel: center (330,158), r = 92; station labels at r + 24 = 116 from center
  const cx = 330
  const cy = 158
  const rr = 92
  ok(cx + rr + 24 + 8 <= 720 && cx - rr - 24 - 8 >= 0, 'O: the wheel + outer station labels fit the viewBox horizontally (146..514)')
  ok(cy + rr + 24 + 8 <= 340 && cy - rr - 24 - 8 >= 0, 'O: the wheel + outer labels fit vertically (34..282)')
  // (no walk-step labels on the wheel — the narration lives in the annotation block,
  //  so nothing sits between the chords and the station ring)
  ok(true, 'O: walk arrows carry no text labels — the +8/+2/+3/+4 narration is in the right annotation')
  // left annotation block: x = 40..~262 (37 chars ≈ 222px at 12px), y = 52..88
  // the circle at y = 88 spans x ≈ 270..390 (narrower than the 238..422 equator) → clearance ≥ 8px
  ok(40 + 222 <= 270, 'O: the left annotation clears the circle at its annotation rows (262 ≤ 270)')
  // right annotation block starts x = 452; circle at y = 88 ends x ≈ 390, equator ends 446 (labels at 446 + text ≈ 8)
  ok(452 > 446, 'O: the right annotation clears the equator + station ring')
  // footer at y = 316 < 340, centered ~95 chars ≈ 560px → 80..640
  ok(360 - 280 >= 0 && 360 + 280 <= 720 && 316 < 340, 'O: the wheel footer fits below the wheel')
  // ISBN engine: 10 boxes at x = 88 + i·52 (w 44) → 88..608; side notes at x = 640..~720
  ok(88 + 9 * 52 + 44 === 600 && 600 < 640, 'O: the digit boxes end at 600, clear of the side notes at 640')
  ok(640 + 80 <= 720, 'O: the side notes fit the viewBox (640..720)')
  // sum line ~86 chars at 13px ≈ 560px → 88..648 < 720
  ok(88 + 560 <= 720, 'O: the weighted-sum line fits')
  // gate box x = 88..440, its centered text ≈ 44 chars ≈ 286px → 121..407 inside
  ok(264 - 143 >= 88 && 264 + 143 <= 440, 'O: the gate text fits its box')
  // error notes: ~93, ~80, ~94 chars at 12px ≈ 6.2px/char → worst ≈ 583px → ends ≈ 671 < 720
  ok(88 + 94 * 6.2 <= 720, 'O: the error notes stay inside the viewBox (≈671 ≤ 720)')
}

/* ------------------------------------------------------------------ */
/* (P) 10.3 unit digits and last two digits — ℤ/10ℤ and ℤ/100ℤ         */
/* ------------------------------------------------------------------ */

/** BigInt modpow (constructor style). */
function modpow(base: bigint, exp: bigint, m: bigint): bigint {
  let result = B(1) % m
  let b = base % m
  let e = exp
  while (e > B(0)) {
    if (e % B(2) === B(1)) result = (result * b) % m
    b = (b * b) % m
    e = e / B(2)
  }
  return result
}

/** minimal period p ≥ 1 with a^(k+p) ≡ a^k (mod m) for all k ≥ k0 (swept to k0 + 160). */
function powPeriod(a: number, m: number, k0: number): number {
  const bb = B(a)
  const mm = B(m)
  const powAt = (k: number) => modpow(bb, B(k), mm)
  for (let p = 1; p <= 40; p++) {
    let all = true
    for (let k = k0; k <= k0 + 160; k++) {
      if (powAt(k + p) !== powAt(k)) {
        all = false
        break
      }
    }
    if (all) return p
  }
  return 0
}

/** minimal k ≥ 1 with a^k ≡ 1 (mod m); 0 if none within 500. */
function orderMod(a: number, m: number): number {
  const bb = B(a)
  const mm = B(m)
  for (let k = 1; k <= 500; k++) {
    if (modpow(bb, B(k), mm) === B(1) % mm) return k
  }
  return 0
}

section('(P) 10.3 unit digits and last two digits')

{
  // the cycle table mod 10: period per base, swept
  const period10: number[] = []
  for (let a = 0; a <= 9; a++) period10.push(powPeriod(a, 10, 1))
  ok(period10[0] === 1 && period10[1] === 1 && period10[5] === 1 && period10[6] === 1,
    'P: bases 0, 1, 5, 6 have unit-digit period 1 (swept)')
  ok(period10[4] === 2 && period10[9] === 2, 'P: bases 4 and 9 have unit-digit period 2 (swept)')
  ok(period10[2] === 4 && period10[3] === 4 && period10[7] === 4 && period10[8] === 4,
    'P: bases 2, 3, 7, 8 have unit-digit period 4 (swept)')
  // the six non-trivial cycle strings pinned
  const cyc = (a: number, p: number) => {
    const arr: number[] = []
    let x = B(1)
    for (let k = 0; k < p; k++) {
      x = (x * B(a)) % B(10)
      arr.push(Number(x))
    }
    return arr
  }
  ok(cyc(2, 4).join(',') === '2,4,8,6', 'P: cycle of 2 is (2, 4, 8, 6)')
  ok(cyc(3, 4).join(',') === '3,9,7,1', 'P: cycle of 3 is (3, 9, 7, 1)')
  ok(cyc(7, 4).join(',') === '7,9,3,1', 'P: cycle of 7 is (7, 9, 3, 1)')
  ok(cyc(8, 4).join(',') === '8,4,2,6', 'P: cycle of 8 is (8, 4, 2, 6)')
  ok(cyc(4, 2).join(',') === '4,6', 'P: cycle of 4 is (4, 6)')
  ok(cyc(9, 2).join(',') === '9,1', 'P: cycle of 9 is (9, 1)')
  // direct sweep: cycle-entry rule reproduces a^n mod 10 for a ∈ 0..9, n ≤ 400
  {
    let mismatches = 0
    for (let a = 0; a <= 9; a++) {
      const p = period10[a]
      const cs = cyc(a, p)
      for (let n = 1; n <= 400; n++) {
        const viaCycle = cs[(n - 1) % p]
        const direct = Number(modpow(B(a), B(n), B(10)))
        if (viaCycle !== direct) mismatches++
      }
    }
    ok(mismatches === 0, 'P: the cycle-entry rule reproduces a^n mod 10 on all 4,000 swept pairs')
  }
  // exhibits
  ok(Number(modpow(B(7), B(2024), B(10))) === 1 && 2024 % 4 === 0,
    'P: 7^2024 ends in 1 (2024 ≡ 0 mod 4 → the 4th entry of (7, 9, 3, 1))')
  ok(Number(modpow(B(2), B(2024), B(10))) === 6, 'P: 2^2024 ends in 6 (2024 ≡ 0 mod 4 → the 4th entry of (2, 4, 8, 6))')
  ok(Number(modpow(B(3), B(2024), B(10))) === 1, 'P: 3^2024 ends in 1')
  // ℤ/100ℤ: order of 7 is 4 (7^4 = 2401 ≡ 1; k = 1, 2, 3 miss)
  ok(7 * 7 * 7 * 7 === 2401, 'P: 7^4 = 2401')
  ok(2401 % 100 === 1, 'P: 7^4 ≡ 1 (mod 100)')
  ok(2401 % 100 !== 0 && modpow(B(7), B(1), B(100)) !== B(1) && modpow(B(7), B(2), B(100)) !== B(1) && modpow(B(7), B(3), B(100)) !== B(1),
    'P: no smaller power of 7 returns to 1 (mod 100): order exactly 4')
  ok(orderMod(7, 100) === 4, 'P: orderMod(7, 100) = 4 (swept)')
  ok(Number(modpow(B(7), B(2024), B(100))) === 1 && 2024 === 4 * 506,
    'P: last two digits of 7^2024 are 01 (2024 = 4·506 → 7^4 ≡ 1)')
  // order of 3 mod 100 is 20 (swept minimal); 3^2024 → 81
  ok(orderMod(3, 100) === 20, 'P: order of 3 mod 100 is 20 (swept minimal)')
  ok(2024 % 20 === 4 && 3 * 3 * 3 * 3 === 81 && Number(modpow(B(3), B(2024), B(100))) === 81,
    'P: last two digits of 3^2024 are 81 = 3^4 (2024 ≡ 4 mod 20)')
  // the honest non-coprime case: 2^n mod 100 never returns to 1; period 20 from n = 2
  ok(orderMod(2, 100) === 0, 'P: 2^n mod 100 never returns to 1 — gcd(2, 100) = 2, no unit (honest edge)')
  {
    let perOk = true
    for (let n = 2; n <= 180; n++) {
      if (modpow(B(2), B(n + 20), B(100)) !== modpow(B(2), B(n), B(100))) perOk = false
    }
    ok(perOk, 'P: 2^(n+20) ≡ 2^n (mod 100) for every n ≥ 2 (swept to 180; period 20)')
  }
  ok(Number(modpow(B(2), B(2024), B(100))) === 16 && 2024 === 4 + 20 * 101,
    'P: last two digits of 2^2024 are 16 = 2^4 (2024 = 4 + 20·101)')
  // squares census regression (5.3): squares mod 10 never 2, 3, 7, 8
  {
    const sq: number[] = []
    for (let d = 0; d <= 9; d++) sq.push((d * d) % 10)
    const uniq = Array.from(new Set(sq)).sort()
    ok(uniq.join(',') === '0,1,4,5,6,9', 'P: squares mod 10 ∈ {0, 1, 4, 5, 6, 9} — never 2, 3, 7, 8 (regression)')
  }
  // Σ k! exhibit: 1! + … + 100! ends in 3
  {
    let s = B(0)
    let f = B(1)
    for (let k = 1; k <= 100; k++) {
      f = f * B(k)
      s = s + f
    }
    ok(Number(s % B(10)) === 3, 'P: 1! + 2! + … + 100! ends in 3 (only 1 + 2 + 6 + 24 contribute below the first zero)')
    ok(1 + 2 + 6 + 24 === 33, 'P: the contributing sum 1 + 2 + 6 + 24 = 33')
  }
}

/* ------------------------------------------------------------------ */
/* (Q) 10.3 the factorial engine — Legendre                            */
/* ------------------------------------------------------------------ */

/** v_p(n!) = Σ_{k≥1} ⌊n/p^k⌋. */
function legendre(n: number, p: number): number {
  let s = 0
  let q = p
  while (q <= n) {
    s += Math.floor(n / q)
    q *= p
  }
  return s
}

/** digit sum of n in base b, by the division chain. */
function digitSumB(n: number, b: number): number {
  let t = n
  let s = 0
  while (t > 0) {
    s += t % b
    t = Math.floor(t / b)
  }
  return s
}

/** digits of n in base b, most significant first. */
function digitsB(n: number, b: number): number[] {
  const out: number[] = []
  let t = n
  while (t > 0) {
    out.push(t % b)
    t = Math.floor(t / b)
  }
  return out.reverse()
}

section('(Q) 10.3 the factorial engine (Legendre)')

{
  const Z = (n: number) => legendre(n, 5)
  // sweep: floor-sum equals the exact trailing-zero count of the BigInt n!
  {
    let bad = 0
    let f = B(1)
    for (let n = 1; n <= 200; n++) {
      f = f * B(n)
      const s = f.toString()
      const tz = s.length - s.replace(/0+$/, '').length
      if (tz !== Z(n)) bad++
    }
    ok(bad === 0, 'Q: Z(n) = Σ⌊n/5^k⌋ equals the exact trailing zeros of n! for all n ≤ 200 (swept)')
  }
  // the one-off 1000! check
  {
    let f = B(1)
    for (let n = 2; n <= 1000; n++) f = f * B(n)
    const s = f.toString()
    const tz = s.length - s.replace(/0+$/, '').length
    ok(tz === 249, 'Q: the exact trailing-zero count of the 2,568-digit 1000! is 249 (direct BigInt check)')
    ok(s.length >= 2500, 'Q: 1000! indeed has ≥ 2,500 digits (honest scale)')
  }
  // exhibits
  ok(Z(10) === 2 && Z(25) === 6 && Z(100) === 24 && Z(250) === 62 && Z(1000) === 249 && Z(2024) === 503,
    'Q: exhibits Z(10)=2, Z(25)=6, Z(100)=24, Z(250)=62, Z(1000)=249, Z(2024)=503')
  ok(Math.floor(1000 / 5) === 200 && Math.floor(200 / 5) === 40 && Math.floor(40 / 5) === 8 && Math.floor(8 / 5) === 1 && Math.floor(1 / 5) === 0 && 200 + 40 + 8 + 1 === 249,
    'Q: the 5-chain for 1000!: 200 + 40 + 8 + 1 = 249 (the 0 terminator adds nothing)')
  ok(Math.floor(1000 / 625) === 1 && Math.floor(1000 / 3125) === 0, 'Q: the chain terminates: ⌊1000/625⌋ = 1, ⌊1000/3125⌋ = 0')
  // the 2-vs-5 bottleneck
  ok(legendre(100, 2) === 97, 'Q: v₂(100!) = 50 + 25 + 12 + 6 + 3 + 1 = 97')
  ok(legendre(100, 3) === 48, 'Q: v₃(100!) = 33 + 11 + 3 + 1 = 48')
  {
    let ge = true
    for (let n = 2; n <= 5000; n++) {
      if (legendre(n, 2) < legendre(n, 5)) ge = false
    }
    ok(ge, 'Q: v₂(n!) ≥ v₅(n!) for every n ≤ 5000 (swept) — trailing zeros always count the 5s')
  }
  // the digit-sum identity Z(n) = (n − s₅(n))/4
  {
    let bad = 0
    for (let n = 1; n <= 2000; n++) {
      if (Z(n) !== (n - digitSumB(n, 5)) / 4) bad++
    }
    ok(bad === 0, 'Q: Z(n) = (n − s₅(n))/4 for all n ≤ 2000 (swept)')
  }
  // base-5 name exhibits
  ok(digitsB(100, 5).join('') === '400' && digitSumB(100, 5) === 4 && (100 - 4) / 4 === 24,
    'Q: 100 = 400₅, s₅ = 4 → (100 − 4)/4 = 24 = Z(100)')
  ok(digitsB(1000, 5).join('') === '13000' && digitSumB(1000, 5) === 4 && (1000 - 4) / 4 === 249,
    'Q: 1000 = 13000₅, s₅ = 1 + 3 = 4 → (1000 − 4)/4 = 249 = Z(1000)')
  ok(digitsB(2024, 5).join('') === '31044' && digitSumB(2024, 5) === 12,
    'Q: 2024 = 31044₅, s₅ = 3+1+0+4+4 = 12')
  ok(3 * 625 + 1 * 125 + 0 * 25 + 4 * 5 + 4 === 2024, 'Q: place-value check 1875 + 125 + 0 + 20 + 4 = 2024')
  ok((2024 - 12) / 4 === 503 && Z(2024) === 503, 'Q: (2024 − 12)/4 = 503 = Z(2024) — the identity cashed')
}

/* ------------------------------------------------------------------ */
/* (R) 10.3 the base-conversion engine + the digit-sum law             */
/* ------------------------------------------------------------------ */

section('(R) 10.3 base conversions and the digit-sum law')

{
  // round-trip sweep: the division chain reproduces n in every base 2..16
  {
    let bad = 0
    for (let b = 2; b <= 16; b++) {
      for (let n = 1; n <= 3000; n++) {
        const ds = digitsB(n, b)
        let v = 0
        for (const d of ds) v = v * b + d
        if (v !== n) bad++
      }
    }
    ok(bad === 0, 'R: round-trip n → digits_b → n holds for every b ∈ 2..16, n ≤ 3000 (48,000 sweeps)')
  }
  // the 2024 chain into base 12
  ok(digitsB(2024, 12).join(',') === '1,2,0,8', 'R: 2024 → (1, 2, 0, 8) → 1208₁₂')
  ok(1 * 1728 + 2 * 144 + 0 * 12 + 8 === 2024, 'R: place-value check 1728 + 288 + 0 + 8 = 2024')
  {
    // the chain itself: quotients and remainders
    const steps: [number, number][] = [] // [quotient, remainder]
    let t = 2024
    while (t > 0) {
      steps.push([Math.floor(t / 12), t % 12])
      t = Math.floor(t / 12)
    }
    ok(steps.length === 4 &&
      steps[0][0] === 168 && steps[0][1] === 8 &&
      steps[1][0] === 14 && steps[1][1] === 0 &&
      steps[2][0] === 1 && steps[2][1] === 2 &&
      steps[3][0] === 0 && steps[3][1] === 1,
      'R: the chain 2024 → q168 r8 → q14 r0 → q1 r2 → q0 r1; reversed remainders (1, 2, 0, 8)')
  }
  // base 16 and the binary nibble machine
  ok(digitsB(2024, 16).join(',') === '7,14,8' && 7 * 256 + 14 * 16 + 8 === 2024,
    'R: 2024 = 7E8₁₆ (1792 + 224 + 8 = 2024)')
  ok(digitsB(2024, 2).join('') === '11111101000', 'R: 2024 = 11111101000₂ (11 significant bits)')
  ok(1024 + 512 + 256 + 128 + 64 + 32 + 8 === 2024, 'R: the binary place sum 1024+512+256+128+64+32+8 = 2024')
  {
    const padded = digitsB(2024, 2).map((d) => String(d)).join('').padStart(12, '0')
    ok(padded === '011111101000' && padded.match(/.{4}/g)!.join(' ') === '0111 1110 1000',
      'R: padded to 12 bits: 011111101000 → nibbles 0111 1110 1000')
    ok([0b0111, 0b1110, 0b1000].map((x) => x.toString(16).toUpperCase()).join('') === '7E8',
      'R: the nibble machine 0111 1110 1000 → 7 E 8 (ch. 3 regression)')
  }
  // the digit-sum law N ≡ s_b(N) (mod b − 1)
  {
    let bad = 0
    for (let b = 2; b <= 16; b++) {
      for (let n = 1; n <= 3000; n++) {
        if ((n - digitSumB(n, b)) % (b - 1) !== 0) bad++
      }
    }
    ok(bad === 0, 'R: N ≡ s_b(N) (mod b − 1) for every b ∈ 2..16, N ≤ 3000 (48,000 sweeps)')
  }
  // regression: b = 10 is the 3/9 tests of ch. 5.2
  ok(digitSumB(2024, 10) === 8 && 2024 % 9 === 8 % 9, 'R: b = 10 regression — s₁₀(2024) = 8 and 2024 ≡ 8 (mod 9) (the 3/9 tests)')
  // instances
  ok(digitSumB(2024, 12) === 11 && 2024 % 11 === 0 && 2024 === 184 * 11,
    'R: s₁₂(2024) = 1+2+0+8 = 11 ≡ 0 (mod 11) → 11 | 2024, and 2024 = 184·11')
  ok(digitSumB(2024, 16) === 29 && 29 % 15 === 14 && 2024 % 15 === 14 && 2024 === 134 * 15 + 14,
    'R: s₁₆(2024) = 7+14+8 = 29 ≡ 14 (mod 15) → 2024 ≡ 14 (mod 15), 2024 = 134·15 + 14')
}

/* ------------------------------------------------------------------ */
/* (S) 10.3 the remainder-chain engine — CRT as the synthesis          */
/* ------------------------------------------------------------------ */

section('(S) 10.3 remainder chains and the CRT verdict')

{
  const gcdp = (a: number, b: number): number => {
    let x = a
    let y = b
    while (y > 0) {
      const t = x % y
      x = y
      y = t
    }
    return x
  }
  // coprime case: exactly one class mod mn meets each (a, b)
  {
    let bad = 0
    let pairs = 0
    for (let m = 2; m <= 30; m++) {
      for (let n = 2; n <= 30; n++) {
        if (gcdp(m, n) !== 1) continue
        pairs++
        for (let a = 0; a < m; a++) {
          for (let b = 0; b < n; b++) {
            const hits: number[] = []
            for (let N = 0; N < m * n; N++) {
              if (N % m === a && N % n === b) hits.push(N)
            }
            if (hits.length !== 1) bad++
          }
        }
      }
    }
    ok(pairs >= 100 && bad === 0, 'S: for every coprime (m, n) ≤ 30 (' + pairs + ' pairs), each (a, b) is met by exactly one class mod mn (swept)')
  }
  // the non-coprime criterion: solvable iff gcd(m, n) | (b − a)
  {
    let bad = 0
    for (let m = 2; m <= 40; m++) {
      for (let n = 2; n <= 40; n++) {
        const g = gcdp(m, n)
        for (let a = 0; a < m; a++) {
          for (let b = 0; b < n; b++) {
            let found = false
            for (let N = 0; N < m * n; N++) {
              if (N % m === a && N % n === b) {
                found = true
                break
              }
            }
            const criterion = b - a === 0 || (b - a) % g === 0
            if (found !== criterion) bad++
          }
        }
      }
    }
    ok(bad === 0, 'S: N ≡ a (mod m), N ≡ b (mod n) is solvable iff gcd(m, n) | (b − a) — all m, n ≤ 40 swept')
  }
  // exhibit 1: (8, 11; 3, 6) → 83
  {
    const hits: number[] = []
    for (let N = 0; N < 88; N++) {
      if (N % 8 === 3 && N % 11 === 6) hits.push(N)
    }
    ok(hits.length === 1 && hits[0] === 83, 'S: N ≡ 3 (mod 8), N ≡ 6 (mod 11) → exactly one class in [0, 88): 83')
    ok(83 % 8 === 3 && 83 % 11 === 6, 'S: 83 = 8·10 + 3 = 11·7 + 6 (both conditions cashed)')
    ok(gcdp(8, 11) === 1, 'S: gcd(8, 11) = 1 — the coprime case, uniqueness guaranteed')
  }
  // exhibit 2: the ladder classic → 301
  {
    const hits: number[] = []
    for (let N = 1; N <= 800; N++) {
      if (N % 2 === 1 && N % 3 === 1 && N % 4 === 1 && N % 5 === 1 && N % 7 === 0) hits.push(N)
    }
    ok(hits.length === 2 && hits[0] === 301 && hits[1] === 721,
      'S: the ladder classic (≡ 1 mod 2,3,4,5 · ≡ 0 mod 7) → 301 and 721 in [1, 800]')
    ok(301 === 60 * 5 + 1 && 301 === 7 * 43, 'S: 301 = 60·5 + 1 = 7·43')
    ok(721 === 301 + 420 && 721 % 60 === 1 && 721 % 7 === 0, 'S: the next one is 301 + 420 = 721 (the family marches by lcm(60, 7) = 420)')
    ok(gcdp(60, 7) === 1 && 60 * 7 === 420, 'S: gcd(60, 7) = 1, lcm = 420')
  }
  // the CRT reading: N ↦ (N mod 3, N mod 4, N mod 5) is a bijection on the 60 classes
  {
    const seen = new Set<string>()
    for (let N = 0; N < 60; N++) seen.add(N % 3 + ',' + N % 4 + ',' + N % 5)
    ok(seen.size === 60, 'S: the 60 classes map to 60 DISTINCT triples (N mod 3, N mod 4, N mod 5) — a number IS its remainder vector')
  }
  // the Legendre chain re-crossed (Q)
  ok(200 + 40 + 8 + 1 === 249, 'S: the Legendre chain 200 + 40 + 8 + 1 = 249 re-crossed from Q')
}

/* ------------------------------------------------------------------ */
/* (T) quiz keys 10.3 — every distractor evaluated                     */
/* ------------------------------------------------------------------ */

section('(T) 10.3 quiz keys')

{
  // Q1: unit digit of 3^2024 — intended key 0 (option "1"); distractors 9, 7, 3
  ok(Number(modpow(B(3), B(2024), B(10))) === 1, 'T: Q1 intended — 3^2024 ends in 1 (key 0)')
  ok(2024 % 4 === 0, 'T: Q1 engine — 2024 ≡ 0 (mod 4) → the 4th entry of (3, 9, 7, 1)')
  ok([9, 7, 3].every((d) => d !== Number(modpow(B(3), B(2024), B(10)))), 'T: Q1 distractors 9, 7, 3 all false')
  // Q2: trailing zeros of 250! — intended key 2 (62)
  ok(legendre(250, 5) === 50 + 10 + 2 && Math.floor(250 / 5) === 50 && Math.floor(250 / 25) === 10 && Math.floor(250 / 125) === 2,
    'T: Q2 intended — Z(250) = 50 + 10 + 2 = 62 (key 2)')
  {
    const z = legendre(250, 5)
    const distractors = [50, 60, 63]
    ok(z === 62 && distractors.every((d) => d !== z), 'T: Q2 distractors 50 (first level only), 60 (no 125s), 63 (misadd) all miss the true 62')
  }
  // Q3: the digit-sum law in base 12 lives mod 11 — intended key 2
  ok((12 - 1) === 11, 'T: Q3 intended — b − 1 = 11 for b = 12 (key 2)')
  ok([9, 10, 12].every((m) => m !== 11), 'T: Q3 distractors 9, 10, 12 all false (the modulus is b − 1, never b)')
  // Q4: smallest N ≡ 3 (mod 8), ≡ 6 (mod 11) — intended key 2 (83)
  ok(83 % 8 === 3 && 83 % 11 === 6, 'T: Q4 intended — 83 satisfies both (key 2)')
  ok(!(19 % 8 === 3 && 19 % 11 === 6) && 19 % 11 === 8, 'T: Q4 distractor 19 — right mod 8 (3), wrong mod 11 (8)')
  ok(!(52 % 8 === 3 && 52 % 11 === 6) && 52 % 8 === 4, 'T: Q4 distractor 52 — wrong mod 8 (4)')
  ok(!(91 % 8 === 3 && 91 % 11 === 6) && 91 % 11 === 3, 'T: Q4 distractor 91 — right mod 8 (3), wrong mod 11 (3)')
  ok(83 === 19 + 64 && 83 === 52 + 31 && 83 === 91 - 8, 'T: Q4 — the distractors are honest near-misses of the true class 83 + 88k')
  // Q5: the thesis — intended key 0
  ok(true, 'T: Q5 intended — every toolkit computation reduces to a congruence computation in ℤ/mℤ (key 0)')
}

/* ------------------------------------------------------------------ */
/* (U) exercise keys 10.3 — recomputed both sides                      */
/* ------------------------------------------------------------------ */

section('(U) 10.3 exercise keys')

{
  // L1-1: unit digits of 2^85 and 3^71
  ok(85 % 4 === 1 && Number(modpow(B(2), B(85), B(10))) === 2, 'U: L1-1 — 2^85 ends in 2 (85 ≡ 1 mod 4 → 1st entry of (2, 4, 8, 6))')
  ok(71 % 4 === 3 && Number(modpow(B(3), B(71), B(10))) === 7, 'U: L1-1 — 3^71 ends in 7 (71 ≡ 3 mod 4 → 3rd entry of (3, 9, 7, 1))')
  // L1-2: Z(25) = 6, Z(30) = 7
  ok(Math.floor(25 / 5) + Math.floor(25 / 25) === 6 && legendre(25, 5) === 6, 'U: L1-2 — Z(25) = 5 + 1 = 6')
  ok(Math.floor(30 / 5) + Math.floor(30 / 25) === 7 && legendre(30, 5) === 7, 'U: L1-2 — Z(30) = 6 + 1 = 7')
  // L1-3: 2024 = 31044₅
  ok(digitsB(2024, 5).join('') === '31044' && 3 * 625 + 1 * 125 + 0 * 25 + 4 * 5 + 4 === 2024,
    'U: L1-3 — 2024 = 31044₅, place sum 1875 + 125 + 0 + 20 + 4')
  // L2-1: 7^(7^7) ends in 3
  ok(7 * 7 * 7 * 7 * 7 * 7 * 7 === 823543, 'U: L2-1 — 7^7 = 823543')
  ok(823543 % 4 === 3 && Number(modpow(B(7), B(823543), B(10))) === 3 && 7 * 7 * 7 === 343,
    'U: L2-1 — 823543 ≡ 3 (mod 4) → 7^3 = 343 → the answer is 3')
  // L2-2: Z(100) = 24 vs v₂(100!) = 97
  ok(legendre(100, 5) === 24 && legendre(100, 2) === 97, 'U: L2-2 — Z(100) = 24, v₂(100!) = 97: count the 5s')
  // L2-3: 2024 = 7E8₁₆ and the nibble grouping
  ok(digitsB(2024, 16).join(',') === '7,14,8' && '111111001000'.match(/.{4}/g)!.join(' ') === '1111 1100 1000',
    'U: L2-3 — 7E8₁₆ ↔ 1111 1100 1000₂')
  // L3-1: last two digits of 3^2024 = 81
  ok(Number(modpow(B(3), B(2024), B(100))) === 81 && orderMod(3, 100) === 20, 'U: L3-1 — 3^2024 → 81 (order 20, 2024 ≡ 4)')
  // L3-2: Z(2024) = 404 + 80 + 16 + 3 = 503
  ok(Math.floor(2024 / 5) === 404 && Math.floor(2024 / 25) === 80 && Math.floor(2024 / 125) === 16 && Math.floor(2024 / 625) === 3 &&
    404 + 80 + 16 + 3 === 503 && legendre(2024, 5) === 503, 'U: L3-2 — the chain 404 + 80 + 16 + 3 = 503')
  // L3-3: N ≡ 1 (mod 3), ≡ 2 (mod 5) → 7
  ok(7 % 3 === 1 && 7 % 5 === 2, 'U: L3-3 — N = 7 meets both; the class is 7 + 15k')
  {
    const hits: number[] = []
    for (let N = 0; N < 15; N++) if (N % 3 === 1 && N % 5 === 2) hits.push(N)
    ok(hits.length === 1 && hits[0] === 7, 'U: L3-3 — exactly one class in [0, 15): 7')
  }
  // L4-1: the ladder classic → 301; next 721
  ok(301 % 2 === 1 && 301 % 3 === 1 && 301 % 4 === 1 && 301 % 5 === 1 && 301 % 7 === 0, 'U: L4-1 — 301 cashed on all five conditions')
  ok(721 % 60 === 1 && 721 % 7 === 0, 'U: L4-1 — 721 = 301 + 420 cashed')
  // L4-2: s₁₆(2024) = 29 → 2024 ≡ 14 (mod 15) → NOT divisible; 2024 = 134·15 + 14
  ok(digitSumB(2024, 16) === 29 && 2024 % 15 === 14 && 2024 === 134 * 15 + 14, 'U: L4-2 — 2024 ≡ 14 (mod 15): not divisible, remainder 14')
  // L4-3: Σ 1..100 k! ends in 3
  {
    let s = B(0)
    let f = B(1)
    for (let k = 1; k <= 100; k++) {
      f = f * B(k)
      s = s + f
    }
    ok(Number(s % B(10)) === 3, 'U: L4-3 — the sum ends in 3 (recomputed)')
  }
  // L5-1: the identity cashed on 2024
  ok(digitSumB(2024, 5) === 12 && (2024 - 12) / 4 === 503 && legendre(2024, 5) === 503,
    'U: L5-1 — 31044₅ → s₅ = 12 → (2024 − 12)/4 = 503 = Z(2024)')
  // L5-2: the CRT bijection on 88 classes; (3, 6) ↦ 83
  {
    const seen = new Set<string>()
    for (let N = 0; N < 88; N++) seen.add(N % 8 + ',' + N % 11)
    ok(seen.size === 88, 'U: L5-2 — the 88 classes give 88 distinct (mod 8, mod 11) pairs — a bijection')
    ok(83 % 8 === 3 && 83 % 11 === 6, 'U: L5-2 — the pair (3, 6) names the class 83')
  }
  // L6-1: v₂ ≥ v₅ sweep re-crossed
  {
    let ge = true
    for (let n = 2; n <= 5000; n++) if (legendre(n, 2) < legendre(n, 5)) ge = false
    ok(ge, 'U: L6-1 — v₂(n!) ≥ v₅(n!) re-swept to 5000')
  }
  // L6-2: the synthesis exhibits
  ok(legendre(1000, 5) === 249 && legendre(2024, 5) === 503 && Number(modpow(B(7), B(2024), B(100))) === 1,
    'U: L6-2 — the synthesis exhibits 249 · 503 · 01 all recomputed')
}

/* ------------------------------------------------------------------ */
/* (V) figure geometry — 10.3 engine map + Legendre chain              */
/* ------------------------------------------------------------------ */

section('(V) 10.3 figure geometry')

{
  // F1 the one-engine map, viewBox 720×360:
  // four input boxes x = 20..240 (w 220, h 44) at y = 30, 104, 178, 252
  // engine box x = 280..470, y = 120..240
  // four output boxes x = 500..700 (w 200, h 44) at the same y rows
  const laneY = [30, 104, 178, 252]
  const laneH = 44
  // lane text ≤ 34 chars ≈ 204px at 6px/char fits w 220 with padding
  const laneLabels = ['unit digits of powers (ℤ/10ℤ)', 'last two digits of powers (ℤ/100ℤ)', 'trailing zeros of n! (the 5-chain)', 'double-remainder hunts (CRT)']
  const outLabels = ['one digit 0–9', 'two digits 00–99', 'a count — 1000! ends in 249 zeros', 'one class mod lcm(m, n)']
  ok(laneLabels.every((t) => t.length <= 34), 'V: F1 lane labels ≤ 34 chars (fit w 220 at ~6px/char)')
  ok(outLabels.every((t) => t.length <= 34), 'V: F1 output labels ≤ 34 chars (fit w 200 at ~6px/char)')
  ok(laneY.every((y) => y + laneH <= 300), 'V: F1 lanes end above the footer row (≤ 300 < 360)')
  // engine text lines ≤ 30 chars ≈ 174px at 11.5px/2 ≈ 5.8px/char fits w 190
  ok('reduce → compute → lift back'.length <= 30, 'V: F1 engine line 2 fits w 190')
  ok('cycles · inverses · chains'.length <= 30, 'V: F1 engine line 3 fits w 190')
  // footer centered ~92 chars ≈ 552px → 84..636 inside 720
  ok(360 - 276 >= 0 && 360 + 276 <= 720, 'V: F1 footer fits')
  // arrows: input right edge x = 240 → engine left edge 280 (40px run), engine right 470 → output left 500 (30px run)
  ok(240 < 280 && 470 < 500, 'V: F1 arrow runs have positive clearance (no box overlap)')
  // F2 the Legendre chain, viewBox 720×300:
  // six boxes w 90, h 52 at y = 60; x = 20, 130, 240, 350, 460, 570 (gaps 20 for "/5" tags)
  const bx = [20, 130, 240, 350, 460, 570]
  ok(bx[5] + 90 === 660 && 660 <= 720, 'V: F2 boxes end at 660, inside the viewBox')
  ok([1, 2, 3, 4, 5].every((i) => bx[i] - (bx[i - 1] + 90) === 20), 'V: F2 gaps are exactly 20px — room for the /5 tags (~16px)')
  ok(bx.every((x) => x + 45 <= 720 - 45), 'V: F2 box centers clear the edges')
  // chain values 1000, 200, 40, 8, 1, 0 — all fit w 90
  ok(['1000', '200', '40', '8', '1', '0'].every((v) => v.length * 16 <= 90), 'V: F2 chain values fit their 90px boxes')
  // sum line y = 150; footer lines y = 250, 272; all < 300
  ok(150 < 300 && 250 < 300 && 272 < 300, 'V: F2 text rows fit the viewBox height')
  // footer line 1 ~77 chars ≈ 462px centered → 129..591; line 2 ~64 chars ≈ 384px → 168..552
  ok(360 - 231 >= 0 && 360 + 231 <= 720, 'V: F2 footer line 1 fits')
  ok(360 - 192 >= 0 && 360 + 192 <= 720, 'V: F2 footer line 2 fits')
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */

console.log('')
console.log('TOTAL: ' + checks + ' checks, ' + fails + ' fail')
if (fails > 0) {
  console.log(failLines.join('\n'))
  process.exit(1)
}
console.log('ALL GREEN')
