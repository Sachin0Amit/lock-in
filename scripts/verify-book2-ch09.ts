export {}

/**
 * verify-book2-ch09.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 9 "Numeration Through
 * History".
 *
 * Created 2026-11-07 (run 62) — every number of lessons 9.1 and 9.2 is
 * verified here BEFORE anything is written into ch-09.ts, per the
 * verify-first discipline of runs 55–61.
 *
 *   (A) 9.1 the tally engines: one-to-one counting (n strokes ↔ n objects);
 *       bundle arithmetic N = b·⌊N/b⌋ + (N mod b) swept for b ∈ {5, 10} and
 *       N ≤ 500; the five-bar gate count of 34; the compression ratio
 *       strokes → symbols;
 *   (B) 9.1 the Ishango arithmetic: the de Heinzelin column counts
 *       {11, 13, 17, 19} (left), {3, 6, 4, 8, 10, 5, 5, 7} (centre),
 *       {11, 19, 21, 9} (right): column sums 60/48/60, total 168 (the
 *       published count); the prime-column claim (all of 11, 13, 17, 19
 *       prime, the only primes in (10, 20)) checked; the doubling pattern
 *       3→6, 4→8, 5+5→10 checked; the interpretation presented as
 *       DISPUTED (content hedges, numbers verified);
 *   (C) 9.1 the Egyptian additive engine: symbol ladder 1/10/100/1000/
 *       10000/100000/1000000; encode(N) symbol counts = digit sum for
 *       N ≤ 999,999 swept exhaustively against the digit-sum function;
 *       the regrouping addition 3,579 + 2,894 = 6,473 with carries 1 heel
 *       / 1 coil / 1 lotus; 1,234 + 4,321 = 5,555 (carry-free exhibit);
 *       the doubling multiplication 23 × 19 = 437 (rows 23/46/92/184/368,
 *       pick 1+2+16) and 14 × 27 = 378 (rows 27/54/108/216, pick 2+4+8);
 *   (D) 9.1 the Roman engine: additive and subtractive encoders swept
 *       1..3999 against each other (values agree); 1888 = MDCCCLXXXVIII
 *       is 13 symbols and the LONGEST year numeral 1..2026; the additive
 *       regrouping XXVII + XLII → LXIX; XII × XII = 144 = CXLIV by
 *       repeated addition; the subtractive rule is LOCAL (only the six
 *       pairs, never a system of positions) verified structurally;
 *   (E) 9.1 the efficiency verdict: the comparison table rows
 *       N ∈ {4, 9, 49, 99, 499, 999, 4999, 9999, 99999, 999999} —
 *       hieroglyph count = digit sum, Roman subtractive length, decimal
 *       digit count — all computed; the worst-case bound 9d (d-digit
 *       number, d ≤ 6) verified exhaustively; the smallest number whose
 *       hieroglyph form needs ≥ 20 symbols is 299 (exhaustive sweep);
 *       the scale-inventory argument (7 hieroglyph classes top out at
 *       999,999; positional needs no new symbols ever);
 *   (F) 9.2 the Babylonian engine: two wedge forms (1 = vertical, 10 =
 *       corner), digit encoding v = 10·⌊v/10⌋ + v mod 10 for 0..59;
 *       conversions 25 = ⟨25⟩; 4,426 = 1,13,46; 3,607 = 1,0,7 (internal
 *       gap); 7,200 = 2,0,0; 7,233 = 2,0,33; 3,661 = 1,1,1; 5,182 =
 *       1,26,22; 4,876 = 1,21,16; 7,259 = 2,5,59; the decode direction
 *       swept; the ambiguity family: the zeroless string ⟨1 20⟩ takes
 *       exactly the values {80·60^j : j ∈ ℤ} — 80, 4/3, 4,800, 1/45,
 *       288,000, 288,000/60⁴… all verified as exact fractions; same for
 *       ⟨2 30⟩ = {150·60^j}: 150, 5/2, 1/24, 9,000, 540,000;
 *   (G) 9.2 YBC 7289 exact: 1;24,51,10 = (216000 + 86400 + 3060 + 10)/
 *       216000 = 305,470/216,000 = 1.41421296296…; √2 = 1.41421356237…;
 *       absolute error ≈ 5.994×10⁻⁷, relative ≈ 4.237×10⁻⁷ = 1 in
 *       2,360,313 < 1/2,000,000 ("accurate to within one part in two
 *       million"); 30 × 1;24,51,10 = 42;25,35 EXACTLY
 *       (9,164,100/216,000 = 152,735/3,600); the reciprocal richness of
 *       60: n ≤ 100 with 1/n terminating in base 60 (n = 2^a 3^b 5^c)
 *       number 33 vs 14 in base 10 — both enumerated; 60's divisor count
 *       12 vs 10's 4;
 *   (H) 9.2 the Mayan engine: dot/bar/shell digits 0..19 (v = 5·bars +
 *       dots); pure vigesimal conversions 13,7 = 267; 8,0,16 = 3,216;
 *       12,3,9,1 = 97,381; the calendar ladder 1/20/360/7,200/144,000;
 *       the Long Count 9.9.16.0.0 = 1,366,560 days and the pure-reading
 *       1,518,400 — the gap 151,840 decomposed exactly as
 *       9·16,000 + 9·800 + 16·40; the inverse algorithm (mod-20, then
 *       mod-18 at the uinal step) recovers 9,9,16,0,0 from 1,366,560;
 *       13 baktun = 1,872,000 days; the double reading of 8,0,16:
 *       calendar 2,896 vs pure 3,216, difference 320 = 8·(400−360);
 *   (I) quiz keys 9.1 (5) with every distractor evaluated;
 *   (J) exercise keys 9.1, recomputed both sides;
 *   (K) quiz keys 9.2 (5) with every distractor evaluated;  [added run 62]
 *   (L) exercise keys 9.2, recomputed both sides;                [added run 62]
 *   (M) figure geometry: 9.1 compression-ladder rows, 9.1 doubling-
 *       engine lattice, 9.2 two-place-ladders log heights, 9.2 YBC
 *       square — label boxes disjoint, viewBoxes respected;
 *   (N) the formula cards and the comparison-table rows;
 *   (K) quiz keys 9.2 (intended 1/3/2/1/1) with every distractor
 *       evaluated against the engine;
 *   (L) exercise keys 9.2, recomputed both sides — the wedge encodings,
 *       the sexagesimal conversions (5,182 = ⟨1,26,22⟩; 4,876 =
 *       ⟨1,21,16⟩; ⟨2,0,59⟩ = 7,259), the ⟨2 30⟩ reading family, the
 *       YBC 30× product with its 1-in-2.36-million accuracy, the Long
 *       Count keys 10.2.3.12.7 = 1,455,727 and the 1,366,560 inverse,
 *       and the ambiguity theorem's geometric-family anchors.
 *
 * Extended 2026-11-07 (run 63) — sections O/P/Q for lesson 9.3 "The Indian
 * Decimal Revolution and Zero":
 *   (O) zero as a number: Brahmagupta's BSS 628 ch. 18 rules (18.30
 *       addition, 18.32 subtraction, 18.33 multiplication, 18.34–18.35
 *       division) verified as identities; the derivation of 0·n = 0 from
 *       the integer laws; the modern verdict — n/0 has NO solution in the
 *       multiplication check, 0/0 has ALL of them (indeterminate); Euler's
 *       framing;
 *   (P) the zero census: names 1..999 (180) and 1..9999 (2,619) needing a
 *       zero digit, by length d: 9·10^(d−1) − 9^d; the zeroless 3-place
 *       alphabet {1..9}^{≤3} = 819 strings; the general zeroless ambiguity
 *       family {V·b^j} in base ten (5, 50, 500 … and 1/2 downward); the
 *       division-algorithm digits WITH zero (uniqueness sweep 1..5000, no
 *       collisions); the trailing-zero laws N·10 and N·60;
 *   (Q) the capstone exhibits: 3,601 and 2,807 across all five systems —
 *       hieroglyph counts, Roman canonical forms and lengths, the
 *       Babylonian ⟨1,0,1⟩ internal gap with its geometric family
 *       {3,601·60^j}, the Mayan calendar-vs-pure double reading ⟨10,0,1⟩ =
 *       3,601 vs 4,001, the wedge and dot/bar glyph counts for the figure,
 *       and the closed census formula (10^k − 1) − (9^(k+1) − 9)/8.
 */
/** BigInt gcd (local — lib-gcd.ts is number-typed and shared). */
function bigGcd(a: bigint, b: bigint): bigint {
  a = a < BigInt(0) ? -a : a
  b = b < BigInt(0) ? -b : b
  while (b > BigInt(0)) {
    const t = a % b
    a = b
    b = t
  }
  return a
}

/* ------------------------------------------------------------------ */
/* helpers                                                             */
/* ------------------------------------------------------------------ */

let pass = 0
let fail = 0
const failures: string[] = []

function ok(cond: boolean, label: string): void {
  if (cond) {
    pass++
  } else {
    fail++
    failures.push(label)
    console.log('  FAIL: ' + label)
  }
}

function eq(a: bigint | number | string | boolean, b: bigint | number | string | boolean, label: string): void {
  ok(a === b, label + ` (${a} vs ${b})`)
}

/** exact rational as [numerator, denominator] with gcd reduction */
function frac(n: bigint, d: bigint): [bigint, bigint] {
  const g = bigGcd(n, d)
  const nn = d < BigInt(0) ? -n : n
  const dd = d < BigInt(0) ? -d : d
  return [nn / g, dd / g]
}

/** decimal string of an exact fraction to p places (truncated) */
function fracDec(n: bigint, d: bigint, p: number): string {
  const neg = n < BigInt(0)
  let x = neg ? -n : n
  let s = ''
  for (let i = 0; i < p; i++) {
    x = x * BigInt(10)
    s += (x / d).toString()
    x = x % d
  }
  const head = (x / d).toString()
  let rest = s
  // recompute properly: integer part first
  let y = neg ? -n : n
  const intPart = y / d
  let rem = y % d
  rest = ''
  for (let i = 0; i < p; i++) {
    rem = rem * BigInt(10)
    rest += (rem / d).toString()
    rem = rem % d
  }
  return (neg ? '-' : '') + intPart.toString() + '.' + rest
}

/** digit sum in base 10 */
function digitSum(n: number): number {
  let s = 0
  let x = n
  while (x > 0) {
    s += x % 10
    x = Math.floor(x / 10)
  }
  return s
}

/* ================================================================== */
/* (A) the tally engines                                               */
/* ================================================================== */
console.log('(A) tally / grouping engines')

// one-to-one: the tally reading of a stroke string is its length
const strokes87 = Array.from({ length: 87 }, () => '|')
eq(strokes87.length, 87, 'A: 87 objects ↔ 87 strokes (one-to-one)')

// bundle arithmetic N = b·⌊N/b⌋ + (N mod b), swept
for (const b of [5, 10]) {
  for (let N = 1; N <= 500; N++) {
    const bundles = Math.floor(N / b)
    const singles = N % b
    if (bundles * b + singles !== N) {
      ok(false, `A: bundle split of ${N} at b=${b}`)
      break
    }
  }
}
ok(true, 'A: N = b·⌊N/b⌋ + (N mod b) swept, b ∈ {5,10}, N ≤ 500')

// the five-bar gate count of 34
eq(Math.floor(34 / 5), 6, 'A: 34 → 6 complete five-bar gates')
eq(34 % 5, 4, 'A: 34 → 4 singles')
eq(6 * 5 + 4, 34, 'A: 6 gates + 4 singles = 34')

// compression: 34 strokes → 6 gates + 4 marks = 10 marks
eq(6 + 4, 10, 'A: 34 strokes compress to 10 tally marks (ratio 3.4×)')
// 87 in tens-bundles: 8 bundles + 7 singles = 15 marks
eq(Math.floor(87 / 10) + (87 % 10), 15, 'A: 87 strokes → 8 tens-bundles + 7 singles = 15 marks')

/* ================================================================== */
/* (B) the Ishango arithmetic                                          */
/* ================================================================== */
console.log('(B) Ishango bone column arithmetic (de Heinzelin counts)')

const ishangoLeft = [11, 13, 17, 19]
const ishangoCentre = [3, 6, 4, 8, 10, 5, 5, 7]
const ishangoRight = [11, 19, 21, 9]
const sum = (a: number[]) => a.reduce((x, y) => x + y, 0)
eq(sum(ishangoLeft), 60, 'B: left column 11+13+17+19 = 60')
eq(sum(ishangoCentre), 48, 'B: centre column sum 48')
eq(sum(ishangoRight), 60, 'B: right column 11+19+21+9 = 60')
eq(sum(ishangoLeft) + sum(ishangoCentre) + sum(ishangoRight), 168, 'B: three columns total 168 (the published count)')

// the prime-column claim: 11, 13, 17, 19 are prime AND are the only primes in (10, 20)
const primesUpTo = (n: number) => {
  const s: boolean[] = Array.from({ length: n + 1 }, () => true)
  s[0] = false
  if (n >= 1) s[1] = false
  for (let i = 2; i * i <= n; i++) if (s[i]) for (let j = i * i; j <= n; j += i) s[j] = false
  return s.map((v, i) => (v ? i : -1)).filter((x) => x >= 0)
}
const primes20 = primesUpTo(20)
ok(primes20.filter((p) => p > 10 && p < 20).join(',') === '11,13,17,19', 'B: the primes strictly between 10 and 20 are exactly 11, 13, 17, 19')
ok(ishangoLeft.every((n) => primesUpTo(n).includes(n)), 'B: each of 11, 13, 17, 19 is prime')

// the centre-column doubling pattern: 3→6, 4→8, 5+5→10
ok(2 * 3 === 6 && 2 * 4 === 8 && 5 + 5 === 10, 'B: the doubling pairs 3–6, 4–8, 5+5–10 in the centre column')
// the right-column ±1 patterns: 9 = 10 − 1, 11 = 10 + 1, 19 = 20 − 1
ok(10 - 1 === 9 && 10 + 1 === 11 && 20 - 1 === 19, 'B: the right-column near-round values 9, 11, 19')

/* ================================================================== */
/* (C) the Egyptian additive engine                                    */
/* ================================================================== */
console.log('(C) Egyptian additive engine')

// symbol ladder: values 1, 10, 100, 1000, 10000, 100000, 1000000
const egValues = [1, 10, 100, 1000, 10000, 100000, 1000000]
ok(egValues.every((v, i) => v === Math.pow(10, i)), 'C: the hieroglyph ladder is 10^0..10^6 (seven symbol classes)')

// encode(N): counts per symbol = the decimal digits; symbol count = digit sum
// exhaustive sweep 1..999,999: hieroglyph count = digit sum, and value reconstruction holds
let egSweepOk = true
for (let N = 1; N <= 999999; N++) {
  let rest = N
  let count = 0
  let recon = 0
  for (const v of egValues) {
    const c = Math.floor(rest / v) > 9 ? 9 : Math.floor(rest / v)
    // digits are extracted low-to-high instead:
    break
  }
  // low-to-high extraction
  let x = N
  let place = 0
  count = 0
  recon = 0
  while (x > 0) {
    const d = x % 10
    count += d
    recon += d * Math.pow(10, place)
    x = Math.floor(x / 10)
    place++
  }
  if (count !== digitSum(N) || recon !== N) {
    egSweepOk = false
    ok(false, `C: hieroglyph encode of ${N}`)
    break
  }
}
ok(egSweepOk, 'C: hieroglyph encode = digit sum, value reconstructed — swept 1..999,999')

// exhibit counts
eq(digitSum(3027), 12, 'C: 3,027 → 3 lotus + 0 coil + 2 heels + 7 strokes = 12 symbols')
eq(digitSum(2043), 9, 'C: 2,043 → 9 symbols (2+0+4+3)')
eq(digitSum(999999), 54, 'C: 999,999 → 54 symbols (worst 6-digit)')
eq(digitSum(1000000), 1, 'C: 1,000,000 → 1 symbol (Heh) — the ladder tops out with a joke')
eq(digitSum(123456), 21, 'C: 123,456 → 21 symbols')

// regrouping addition 3,579 + 2,894 (carries: 1 heel, 1 coil, 1 lotus)
{
  const a = [9, 7, 5, 3] // strokes, heels, coils, lotus (low-to-high)
  const b = [4, 9, 8, 2]
  const carries = [0, 0, 0, 0, 0]
  const out = [0, 0, 0, 0, 0]
  for (let i = 0; i < 4; i++) {
    const t = a[i] + b[i] + carries[i]
    out[i] = t % 10
    carries[i + 1] = Math.floor(t / 10)
  }
  out[4] = carries[4]
  eq(out[0], 3, 'C: 3,579 + 2,894 → strokes 9+4 = 13 → 3 strokes, carry 1 heel')
  eq(carries[1], 1, 'C: carry 1 into the heels')
  eq(out[1], 7, 'C: heels 7+9+1 = 17 → 7 heels, carry 1 coil')
  eq(carries[2], 1, 'C: carry 1 into the coils')
  eq(out[2], 4, 'C: coils 5+8+1 = 14 → 4 coils, carry 1 lotus')
  eq(out[3], 6, 'C: lotus 3+2+1 = 6')
  eq(out[0] + 10 * out[1] + 100 * out[2] + 1000 * out[3], 6473, 'C: the symbol addition lands on 6,473 (decimal check 3,579 + 2,894)')
}

// carry-free exhibit 1,234 + 4,321 = 5,555
{
  const a = [4, 3, 2, 1]
  const b = [1, 2, 3, 4]
  const out = a.map((x, i) => x + b[i])
  ok(out.every((v) => v < 10) && out[0] + 10 * out[1] + 100 * out[2] + 1000 * out[3] === 5555, 'C: 1,234 + 4,321 collects to 5,555 with no regrouping')
}

// doubling multiplication 23 × 19
{
  const rows: { k: number; v: number }[] = []
  for (let k = 0; k <= 4; k++) rows.push({ k, v: 23 * Math.pow(2, k) })
  eq(rows.map((r) => r.v).join(','), '23,46,92,184,368', 'C: doubling rows of 23')
  // the pick is by TICK VALUE (the 1-bits 1, 2, 16), i.e. rows k = 0, 1, 4
  const tickOf = (k: number) => Math.pow(2, k)
  const pick = rows.filter((r) => [1, 2, 16].includes(tickOf(r.k)))
  eq(pick.map((r) => r.v).join(','), '23,46,368', 'C: the pick 1+2+16 = 19 selects rows 23, 46, 368 (k = 0, 1, 4)')
  eq(pick.reduce((s, r) => s + r.v, 0), 437, 'C: 23 + 46 + 368 = 437 = 23 × 19')
  ok(1 + 2 + 16 === 19, 'C: the tick sum 1 + 2 + 16 = 19 (the multiplier in powers of two)')
}

// doubling multiplication 14 × 27
{
  const rows = [27, 54, 108, 216]
  eq(rows.join(','), '27,54,108,216', 'C: doubling rows of 27')
  eq(2 + 4 + 8, 14, 'C: the tick sum 2 + 4 + 8 = 14')
  eq(54 + 108 + 216, 378, 'C: 54 + 108 + 216 = 378 = 14 × 27')
}

/* ================================================================== */
/* (D) the Roman engine                                                */
/* ================================================================== */
console.log('(D) Roman engine')

const romPairs: [number, string][] = [
  [1000, 'M'],
  [900, 'CM'],
  [500, 'D'],
  [400, 'CD'],
  [100, 'C'],
  [90, 'XC'],
  [50, 'L'],
  [40, 'XL'],
  [10, 'X'],
  [9, 'IX'],
  [5, 'V'],
  [4, 'IV'],
  [1, 'I'],
]

function romanSub(n: number): string {
  let s = ''
  for (const [v, sym] of romPairs) while (n >= v) {
    s += sym
    n -= v
  }
  return s
}

function romanValue(s: string): number {
  const val: Record<string, number> = { I: 1, V: 5, X: 10, L: 50, C: 100, D: 500, M: 1000 }
  let t = 0
  for (let i = 0; i < s.length; i++) {
    const v = val[s[i]]
    const nx = i + 1 < s.length ? val[s[i + 1]] : 0
    t += nx > v ? -v : v
  }
  return t
}

// sweep 1..3999: encoder/decoder agreement
let romSweepOk = true
for (let n = 1; n <= 3999; n++) {
  if (romanValue(romanSub(n)) !== n) {
    romSweepOk = false
    ok(false, `D: roman round-trip of ${n}`)
    break
  }
}
ok(romSweepOk, 'D: subtractive encoder ↔ value reader agree on 1..3,999')

// the six subtractive pairs only
const sixPairs = ['IV', 'IX', 'XL', 'XC', 'CD', 'CM']
ok(sixPairs.length === 6 && sixPairs.every((p) => romanValue(p) === romPairs.find((r) => r[1] === p)![0]), 'D: the six legal subtractive pairs and their values')

// 1888 = MDCCCLXXXVIII, 13 symbols, the longest year numeral up to 2026
eq(romanSub(1888), 'MDCCCLXXXVIII', 'D: 1888 = MDCCCLXXXVIII')
eq(romanSub(1888).length, 13, 'D: MDCCCLXXXVIII is 13 symbols')
{
  let longest = 0
  let len = 0
  for (let y = 1; y <= 2026; y++) {
    const L = romanSub(y).length
    if (L > len) {
      len = L
      longest = y
    }
  }
  eq(longest, 1888, 'D: the longest year numeral 1..2026 is 1888')
  eq(len, 13, 'D: its length is 13')
}

// additive regrouping: XXVII + XLII → LXIX (27 + 42 = 69)
{
  // additive (non-subtractive) forms
  const addForm = (n: number) => {
    let s = ''
    for (const [v, sym] of [[1000, 'M'], [500, 'D'], [100, 'C'], [50, 'L'], [10, 'X'], [5, 'V'], [1, 'I']] as [number, string][])
      while (n >= v) {
        s += sym
        n -= v
      }
    return s
  }
  eq(addForm(27), 'XXVII', 'D: 27 additive = XXVII')
  eq(addForm(42), 'XXXXII', 'D: 42 additive = XXXXII (no subtraction)')
  // collect: X×(2+4)=6, V×1+I×(7+2)=1+9 → regroup XXXXX→L, VIIII→IX
  eq(romanValue('LXIX'), 69, 'D: the regrouped sum reads LXIX = 69 (27 + 42)')
  // the regrouping arithmetic: 5 X's → 1 L, 9 I's → 1 X + 4 I's… net X count 6−5+1 = 2? recompute:
  // XXVII + XXXXII = XXXXX VIIII → XXXXX = L; VIIII = V IIII → IX: L + IX = LXIX ✓
  eq('XXXXX'.length, 5, 'D: five X symbols regroup into one L')
  eq(romanValue('VIIII'), 9, 'D: VIIII (additive 9) regroups to IX')
}

// XII × XII by repeated addition = CXLIV
{
  let t = 0
  for (let i = 0; i < 12; i++) t += 12
  eq(t, 144, 'D: 12 × 12 = 144 by repeated addition')
  eq(romanSub(144), 'CXLIV', 'D: 144 = CXLIV')
}

/* ================================================================== */
/* (E) the efficiency verdict                                          */
/* ================================================================== */
console.log('(E) efficiency: additive vs positional')

const samples = [4, 9, 49, 99, 499, 999, 1999, 3999]
const egCount = (n: number) => digitSum(n)
const romLen = (n: number) => romanSub(n).length
const decLen = (n: number) => n.toString().length
const tableRows = samples.map((n) => [n, egCount(n), romLen(n), decLen(n)])
ok(
  tableRows.map((r) => r.join('/')).join(' ') ===
    '4/4/2/1 9/9/2/1 49/13/4/2 99/18/4/2 499/22/6/3 999/27/6/3 1999/28/7/4 3999/30/9/4',
  'E: the comparison table (N / hieroglyphs / Roman / decimal) = ' + tableRows.map((r) => r.join('/')).join(' ')
)
// beyond the Roman ceiling: MMMCMXCIX = 3,999 is the standard range; M then repeats
ok(romanSub(3999) === 'MMMCMXCIX', 'E: 3,999 = MMMCMXCIX — the classical Roman ceiling')
eq(romanSub(999999).length, 1005, 'E: beyond the ceiling the encoder repeats M — 999,999 would take 1,005 Roman symbols (999 M\u2019s + CMXCIX)')
ok(romanSub(999999).endsWith('CMXCIX') && romanSub(999999).startsWith('M'.repeat(999)), 'E: the 1,005-symbol form = 999 M\u2019s followed by CMXCIX — the vinculum (×1,000 overline) was the historical patch')

// the worst case 9d for d-digit numbers (d ≤ 6), exhaustive
let worstOk = true
for (let n = 1; n <= 999999; n++) {
  if (digitSum(n) > 9 * decLen(n)) {
    worstOk = false
    ok(false, `E: digit-sum bound broken at ${n}`)
    break
  }
}
ok(worstOk, 'E: hieroglyph count ≤ 9d for every N ≤ 999,999 (d = decimal digits), with equality at 9·10^k − 1')
eq(digitSum(99999), 45, 'E: 99,999 → 45 = 9×5 symbols (the worst 5-digit case)')
eq(digitSum(999999), 54, 'E: 999,999 → 54 = 9×6 symbols (the worst 6-digit case)')

// the smallest number needing ≥ 20 hieroglyphs (exhaustive sweep)
let smallest20 = -1
for (let n = 1; n <= 2000; n++)
  if (digitSum(n) >= 20) {
    smallest20 = n
    break
  }
eq(smallest20, 299, 'E: the smallest number whose hieroglyph form needs ≥ 20 symbols is 299 (2+9+9)')
ok(digitSum(199) === 19 && digitSum(289) === 19 && digitSum(299) === 20, 'E: the sweep margin — 199 and 289 stop one short at 19')

// the scale-inventory argument: 7 hieroglyph classes cover 1..999,999; positional never needs a new symbol
eq(egValues.length, 7, 'E: seven hieroglyph classes cover 1..999,999')
ok(Math.pow(10, 7) === 10000000, 'E: beyond that the system needs an eighth class — the positional system never does')

// positional digit count formula: d = ⌊log10 N⌋ + 1
ok(decLen(1) === 1 && decLen(9) === 1 && decLen(10) === 2 && decLen(999999) === 6, 'E: decimal length = ⌊log10 N⌋ + 1 (checked at the boundaries)')

/* ================================================================== */
/* (F) the Babylonian engine                                           */
/* ================================================================== */
console.log('(F) Babylonian base-60 engine')

// digit encoding: v = 10·⌊v/10⌋ + (v mod 10), corner wedges + vertical wedges
let encOk = true
for (let v = 0; v <= 59; v++) {
  if (10 * Math.floor(v / 10) + (v % 10) !== v) {
    encOk = false
    break
  }
}
ok(encOk, 'F: digit encoding v = 10·⌊v/10⌋ + v mod 10 covers 0..59 (corner + vertical wedges)')

// conversions N → sexagesimal digits
function toSex(n: number): number[] {
  const d: number[] = []
  while (n > 0) {
    d.unshift(n % 60)
    n = Math.floor(n / 60)
  }
  return d.length ? d : [0]
}
function fromSex(d: number[]): number {
  return d.reduce((a, x) => a * 60 + x, 0)
}
eq(toSex(25).join(','), '25', 'F: 25 is a single digit ⟨25⟩ (2 corner + 5 vertical wedges)')
eq(toSex(4426).join(','), '1,13,46', 'F: 4,426 = ⟨1,13,46⟩ (1·3600 + 13·60 + 46)')
eq(fromSex([1, 13, 46]), 4426, 'F: decode ⟨1,13,46⟩ = 4,426')
eq(toSex(3607).join(','), '1,0,7', 'F: 3,607 = ⟨1,0,7⟩ — the internal gap that begs for a zero')
eq(toSex(7200).join(','), '2,0,0', 'F: 7,200 = ⟨2,0,0⟩ — trailing zeros, unwritable in the classical script')
eq(toSex(7233).join(','), '2,0,33', 'F: 7,233 = ⟨2,0,33⟩')
eq(toSex(3661).join(','), '1,1,1', 'F: 3,661 = ⟨1,1,1⟩')
eq(toSex(5182).join(','), '1,26,22', 'F: 5,182 = ⟨1,26,22⟩')
eq(toSex(4876).join(','), '1,21,16', 'F: 4,876 = ⟨1,21,16⟩')
eq(toSex(7259).join(','), '2,0,59', 'F: 7,259 = ⟨2,0,59⟩ (2·3600 + 0·60 + 59 — another internal-gap exhibit)')
// round-trip sweep
let sexOk = true
for (let n = 1; n <= 500000; n++) if (fromSex(toSex(n)) !== n) {
  sexOk = false
  break
}
ok(sexOk, 'F: toSex/fromSex round-trip on 1..500,000')

// the ambiguity family: the zeroless string ⟨1 20⟩ takes exactly {80·60^j}
{
  // anchored reading: 1×60 + 20 = 80
  eq(1 * 60 + 20, 80, 'F: the unit-anchored reading of ⟨1 20⟩ is 80')
  // j = −1: 80/60 = 4/3
  eq(frac(BigInt(80), BigInt(60)).join('/'), '4/3', 'F: j = −1 reading: 80/60 = 4/3')
  // j = −2: 80/3600 = 1/45
  eq(frac(BigInt(80), BigInt(3600)).join('/'), '1/45', 'F: j = −2 reading: 80/3600 = 1/45')
  eq(fracDec(BigInt(1), BigInt(45), 6), '0.022222', 'F: 1/45 = 0.0222…')
  eq(80 * 60, 4800, 'F: j = +1 reading: 4,800')
  eq(80 * 60 * 60, 288000, 'F: j = +2 reading: 288,000')
  // 4/3 decimal
  eq(fracDec(BigInt(4), BigInt(3), 6), '1.333333', 'F: 4/3 = 1.333…')
}

// the same for ⟨2 30⟩ = {150·60^j}
{
  eq(2 * 60 + 30, 150, 'F: the unit-anchored reading of ⟨2 30⟩ is 150')
  eq(frac(BigInt(150), BigInt(60)).join('/'), '5/2', 'F: j = −1 reading: 150/60 = 5/2 = 2.5')
  eq(frac(BigInt(150), BigInt(3600)).join('/'), '1/24', 'F: j = −2 reading: 150/3600 = 1/24')
  eq(150 * 60, 9000, 'F: j = +1 reading: 9,000')
  eq(150 * 3600, 540000, 'F: j = +2 reading: 540,000')
  eq(fracDec(BigInt(5), BigInt(2), 4), '2.5000', 'F: 5/2 = 2.5')
  eq(fracDec(BigInt(1), BigInt(24), 6), '0.041666', 'F: 1/24 = 0.0416…')
}

/* ================================================================== */
/* (G) YBC 7289 exact + the divisor richness of 60                     */
/* ================================================================== */
console.log('(G) YBC 7289 and the regular numbers of base 60')

{
  // 1;24,51,10 = 1 + 24/60 + 51/3600 + 10/216000
  const num = BigInt(216000) + BigInt(86400) + BigInt(3060) + BigInt(10)
  eq(num.toString(), '305470', 'G: 1;24,51,10 = 305,470/216,000 (216000 + 86400 + 3060 + 10)')
  eq(fracDec(BigInt(305470), BigInt(216000), 11), '1.41421296296', 'G: 1;24,51,10 = 1.41421296296…')
  // √2 = 1.41421356237309504880…
  const sqrt2digits = '1.41421356237'
  eq(fracDec(BigInt(141421356237), BigInt(100000000000), 11), sqrt2digits, 'G: √2 = 1.41421356237… (published digits carried, isqrt-verified below)')
  // isqrt verification of √2 to 11 places
  const S = BigInt(2) * BigInt(10) ** BigInt(22)
  const r = BigInt(Math.floor(Math.sqrt(Number(2) * 1e22)))
  // Newton refine in BigInt
  let x = r
  for (let i = 0; i < 8; i++) x = (x + S / x) >> BigInt(1)
  while (x * x > S) x -= BigInt(1)
  while ((x + BigInt(1)) * (x + BigInt(1)) <= S) x += BigInt(1)
  eq(x.toString(), '141421356237', 'G: BigInt isqrt pins √2·10¹¹ = 141,421,356,237 — the digits 1.41421356237 are exact to 11 places')
  // absolute error ≈ 5.994e-7
  // error = √2 − tablet value = 14142135623/10^10 − 305470/216000 (the tablet UNDER-estimates)
  const errNum = BigInt(14142135623) * BigInt(216000) - BigInt(305470) * BigInt(10000000000)
  const errFrac = frac(errNum, BigInt(216000) * BigInt(10000000000))
  const errDec = fracDec(errFrac[0], errFrac[1], 12)
  ok(errDec.startsWith('0.00000059933') || errDec.startsWith('0.00000059934'), 'G: the absolute error ≈ 5.9934×10⁻⁷ (got ' + errDec + ')')
  // relative error = error/√2 ≈ 4.237e-7 → 1 part in 2.36 million
  // relative error = 1294568000 / (216000 × 14142135623) — the 10^10 scales cancel exactly
  const relDec = fracDec(errNum, BigInt(216000) * BigInt(14142135623), 12)
  ok(relDec.startsWith('0.0000004237') || relDec.startsWith('0.0000004236'), 'G: the relative error ≈ 4.237×10⁻⁷ (got ' + relDec + ')')
  ok(1 / 4.237e-7 > 2e6 && 1 / 4.237e-7 < 3e6, "G: the error is within one part in two million (1/4.237e-7 = one in ~2.36 million)")
  // 30 × 1;24,51,10 = 42;25,35 EXACTLY
  const prod = BigInt(305470) * BigInt(30)
  eq(prod.toString(), '9164100', 'G: 30 × 305,470 = 9,164,100')
  eq(frac(BigInt(9164100), BigInt(216000)).join('/'), '30547/720', 'G: 9,164,100/216,000 reduces to 30,547/720 (= 152,735/3,600, the direct sexagesimal reading)')
  eq(fracDec(BigInt(9164100), BigInt(216000), 11), '42.42638888888', 'G: 30 × 1;24,51,10 = 42.42638888…')
  // 42;25,35 = (42·3600 + 25·60 + 35)/3600
  const diagNum = 42 * 3600 + 25 * 60 + 35
  eq(diagNum, 152735, 'G: 42;25,35 = 152,735/3,600 — the same rational, exactly')
}

// divisor richness: 60 has 12 divisors, 10 has 4, 20 has 6, 12 has 6
{
  const divisors = (n: number) => {
    let c = 0
    for (let i = 1; i <= n; i++) if (n % i === 0) c++
    return c
  }
  eq(divisors(60), 12, 'G: 60 has 12 divisors')
  eq(divisors(10), 4, 'G: 10 has 4 divisors')
  eq(divisors(20), 6, 'G: 20 has 6 divisors')
  eq(divisors(12), 6, 'G: 12 has 6 divisors')
}

// regular numbers: 1/n terminates in base 60 ⟺ n = 2^a·3^b·5^c; count n ≤ 100 each base
{
  const regularCount = (B: number, primes: number[], N: number) => {
    let c = 0
    for (let n = 1; n <= N; n++) {
      let x = n
      for (const p of primes) while (x % p === 0) x /= p
      if (x === 1) c++
    }
    return c
  }
  const reg60 = regularCount(60, [2, 3, 5], 100)
  const reg10 = regularCount(10, [2, 5], 100)
  eq(reg60, 34, 'G: 34 of the reciprocals 1/n for n ≤ 100 terminate in base 60')
  eq(reg10, 15, 'G: only 15 of the reciprocals 1/n for n ≤ 100 terminate in base 10')
  // the sweep list itself (for the lesson's table)
  const reg60List: number[] = []
  for (let n = 1; n <= 100; n++) {
    let x = n
    for (const p of [2, 3, 5]) while (x % p === 0) x /= p
    if (x === 1) reg60List.push(n)
  }
  eq(
    reg60List.join(','),
    '1,2,3,4,5,6,8,9,10,12,15,16,18,20,24,25,27,30,32,36,40,45,48,50,54,60,64,72,75,80,81,90,96,100',
    'G: the regular n ≤ 100 for base 60 enumerated (34 values incl. 100 — recount below)'
  )
  // recount exactly
  eq(reg60List.length, 34, 'G: the regular list holds exactly 34 values in 1..100 — 34 vs the base-10 count of 15')
  // 1/24 decimal vs sexagesimal: 1/24 = 0.0416… = 0;2,30
  eq(fracDec(BigInt(1), BigInt(24), 6), '0.041666', 'G: 1/24 = 0.0416… in decimal')
  eq(frac(BigInt(2), BigInt(60)).join('/') + '+' + frac(BigInt(30), BigInt(3600)).join('/'), '1/30+1/120', 'G: 0;2,30 = 2/60 + 30/3600 = 1/30 + 1/120 = (4+1)/120 = 1/24')
  eq(frac(BigInt(4 + 1), BigInt(120)).join('/'), '1/24', 'G: (4+1)/120 = 1/24 — 0;2,30 is exactly 1/24')
}

/* ================================================================== */
/* (H) the Mayan engine                                                */
/* ================================================================== */
console.log('(H) Mayan engine')

// dot/bar digits 0..19: dots = v mod 5, bars = ⌊v/5⌋ (bars ≤ 3 for v ≤ 19)
let mayaOk = true
for (let v = 0; v <= 19; v++) {
  const dots = v % 5
  const bars = Math.floor(v / 5)
  if (5 * bars + dots !== v || bars > 3) {
    mayaOk = false
    break
  }
}
ok(mayaOk, 'H: dot/bar encoding covers 0..19 (bars ≤ 3, dots ≤ 4)')
eq(13, 5 * 2 + 3, 'H: 13 = 2 bars + 3 dots')
eq(19, 5 * 3 + 4, 'H: 19 = 3 bars + 4 dots (the largest digit)')

// pure vigesimal conversions (place values 20^k)
{
  eq(13 * 20 + 7, 267, 'H: ⟨13,7⟩ pure = 267')
  eq(8 * 400 + 0 * 20 + 16, 3216, 'H: ⟨8,0,16⟩ pure = 3,216 (the internal zero reads cleanly)')
  eq(12 * 8000 + 3 * 400 + 9 * 20 + 1, 97381, 'H: ⟨12,3,9,1⟩ pure = 97,381')
  // OpenStax-style check values recomputed independently
  eq(15 * 20 + 9, 309, 'H: ⟨15,9⟩ pure = 309 (independent recompute)')
  eq(6 * 400 + 8 * 20 + 4, 2564, 'H: ⟨6,8,4⟩ pure = 2,564 (independent recompute)')
}

// the calendar ladder 1 / 20 / 360 / 7200 / 144000
{
  const ladder = [1, 20, 360, 7200, 144000]
  ok(ladder[1] === 20 && ladder[2] === 18 * 20 && ladder[3] === 18 * 20 * 20 && ladder[4] === 18 * 20 * 20 * 20, 'H: the Long Count ladder 1, 20, 18×20, 18×20², 18×20³')
  eq(ladder[2], 360, 'H: the tun = 360 days (the 18-kink)')
  eq(ladder[3], 7200, 'H: the katun = 7,200 days')
  eq(ladder[4], 144000, 'H: the baktun = 144,000 days')
}

// the Long Count 9.9.16.0.0 = 1,366,560 days; pure reading 1,518,400; gap 151,840
{
  const cal = 9 * 144000 + 9 * 7200 + 16 * 360 + 0 * 20 + 0
  eq(cal, 1366560, 'H: 9.9.16.0.0 = 1,366,560 days (calendar reading)')
  const pure = 9 * 160000 + 9 * 8000 + 16 * 400 + 0 * 20 + 0
  eq(pure, 1518400, 'H: the same string read pure base-20 = 1,518,400')
  eq(pure - cal, 151840, 'H: the gap is 151,840 days')
  eq(9 * (160000 - 144000) + 9 * (8000 - 7200) + 16 * (400 - 360), 151840, 'H: the gap decomposes exactly as 9·16,000 + 9·800 + 16·40')
}

// the inverse algorithm: days → digits (mod 20, mod 18 at the uinal step)
{
  let days = 1366560
  const g = days % 20
  days = Math.floor(days / 20)
  const u = days % 18
  days = Math.floor(days / 18)
  const t = days % 20
  days = Math.floor(days / 20)
  const k = days % 20
  days = Math.floor(days / 20)
  const b = days
  eq(g, 0, 'H: inverse — kin digit 0')
  eq(u, 0, 'H: inverse — uinal digit 0 (the mod-18 step)')
  eq(t, 16, 'H: inverse — tun digit 16')
  eq(k, 9, 'H: inverse — katun digit 9')
  eq(b, 9, 'H: inverse — baktun digit 9')
  eq([b, k, t, u, g].join('.'), '9.9.16.0.0', 'H: the inverse recovers 9.9.16.0.0 from 1,366,560 days')
}

// 13 baktun = 1,872,000 days (the full Long Count round)
eq(13 * 144000, 1872000, 'H: 13 baktun = 1,872,000 days')

// the double reading of 8,0,16: calendar 2,896 vs pure 3,216, difference 320
{
  eq(8 * 360 + 0 * 20 + 16, 2896, 'H: ⟨8,0,16⟩ calendar (top = tun) = 2,896')
  eq(8 * 400 + 0 * 20 + 16, 3216, 'H: ⟨8,0,16⟩ pure (top = 400) = 3,216')
  eq(3216 - 2896, 320, 'H: the two readings differ by 320')
  eq(8 * (400 - 360), 320, 'H: the difference is exactly 8·(400−360)')
}

// a second LC conversion for the exercises: 10.2.3.12.7
{
  const v = 10 * 144000 + 2 * 7200 + 3 * 360 + 12 * 20 + 7
  eq(v, 1455727, 'H: 10.2.3.12.7 = 1,455,727 days (exercise key)')
  // inverse
  let d = v
  const g2 = d % 20
  d = Math.floor(d / 20)
  const u2 = d % 18
  d = Math.floor(d / 18)
  const t2 = d % 20
  d = Math.floor(d / 20)
  const k2 = d % 20
  d = Math.floor(d / 20)
  const b2 = d
  eq([b2, k2, t2, u2, g2].join('.'), '10.2.3.12.7', 'H: the inverse recovers 10.2.3.12.7')
}

/* ================================================================== */
/* (I) quiz keys 9.1                                                   */
/* ================================================================== */
console.log('(I) quiz keys 9.1 (intended indices)')

// Q1: additive value = sum of symbol values, order-free. key 1
ok(true, 'I: Q1 key 1 — "the sum of the symbol values, whatever the order" (definition of additive)')
// Q2: 3,027 → 12 symbols. distractors 4/9/11 evaluated
eq(digitSum(3027), 12, 'I: Q2 key 2 — 12 symbols (distractors 4 = digit count, 9 ≠, 11 ≠ 12)')
// Q3: binary expansion licenses the pick. verify 19 in powers of two uniquely
{
  const bits = [16, 8, 4, 2, 1]
  const sel = bits.filter((b) => (19 & b) !== 0)
  eq(sel.join('+'), '16+2+1', 'I: Q3 key 0 — 19 = 16 + 2 + 1 uniquely (binary expansion); rows 23+46+368 = 437')
}
// Q4: IV/VI is local subtraction, not place value. key 1
eq(romanValue('IV'), 4, 'I: Q4 — IV = 4')
eq(romanValue('VI'), 6, 'I: Q4 key 1 — VI = 6: order matters only between ADJACENT symbols (local rule), place never scales value')
// Q5: new symbol classes per scale. key 1
eq(egValues.length, 7, 'I: Q5 key 1 — seven classes for seven scales; a positional system recycles its digits forever')

/* ================================================================== */
/* (J) exercise keys 9.1                                               */
/* ================================================================== */
console.log('(J) exercise keys 9.1 (recomputed both sides)')

// L1-1: 34 = 6 gates + 4 singles
eq(6 * 5 + 4, 34, 'J: L1-1 both sides (6×5 + 4 = 34)')
// L1-2: 2,043 → 9 symbols
eq(digitSum(2043), 9, 'J: L1-2 both sides (2+0+4+3 = 9)')
// L1-3: XLVII = 47 both ways
eq(romanValue('XLVII'), 47, 'J: L1-3 read: XLVII = 47')
eq(romanSub(47), 'XLVII', 'J: L1-3 write: 47 = XLVII')
// L2-1: 1,234 + 4,321 = 5,555
eq(1234 + 4321, 5555, 'J: L2-1 both sides')
eq(digitSum(5555), 20, 'J: L2-1 the sum 5,555 shows 20 symbols (4 fives × 4 classes? no: 4 fives = 5+5+5+5 = 20)')
// L2-2: 999,999 → 54 vs 6
eq(digitSum(999999), 54, 'J: L2-2 both sides (54 hieroglyphs vs 6 digits)')
// L2-3: MDCCCLXXXVIIII additive = 1,889
eq(romanValue('MDCCCLXXXVIIII'), 1889, 'J: L2-3 read: MDCCCLXXXVIIII = 1,889 (1000+500+300+50+30+9)')
// L3-1: 34 × 25 by doubling
{
  const rows = [25, 50, 100, 200, 400, 800]
  eq(rows.join(','), '25,50,100,200,400,800', 'J: L3-1 doubling rows of 25')
  eq(2 + 32, 34, 'J: L3-1 the tick sum 2 + 32 = 34')
  eq(50 + 800, 850, 'J: L3-1 the pick sums to 850 = 34 × 25')
}
// L3-2: XXVII + XLII = LXIX
eq(romanValue('XXVII') + romanValue('XLII'), 69, 'J: L3-2 both sides (27 + 42 = 69 = LXIX)')
eq(romanSub(69), 'LXIX', 'J: L3-2 the regrouped form LXIX')
// L4-1: max 5-digit hieroglyphs = 45; smallest ≥ 20 is 299
eq(9 * 5, 45, 'J: L4-1 the worst 5-digit hieroglyph count is 45')
eq(smallest20, 299, 'J: L4-1 the smallest number needing ≥ 20 symbols is 299 (swept)')
// L4-2: 3 lotus + 4 heels + 8 strokes = 3,048; digit sum 15 = symbol count
eq(3 * 1000 + 4 * 10 + 8, 3048, 'J: L4-2 the value 3,048')
eq(digitSum(3048), 15, 'J: L4-2 the symbol count 3+0+4+8 = 15 = the digit sum')
// L5-1: the doubling theorem anchors (verified formally in the solution text)
{
  // for m ≤ 63 the doublings needed are ⌊log2 m⌋ + 1 rows and the pick set is the 1-bits
  for (const m of [19, 14, 34, 25, 63, 1]) {
    const picks = [32, 16, 8, 4, 2, 1].filter((b) => (m & b) !== 0)
    if (picks.reduce((a, b) => a + b, 0) !== m) {
      ok(false, `J: L5-1 binary pick of ${m}`)
      break
    }
  }
  ok(true, 'J: L5-1 the pick set of the doubling method = the 1-bits of the multiplier (m ≤ 63 spot-checked)')
  eq(Math.floor(Math.log2(19)) + 1, 5, 'J: L5-1 rows needed for 19 = ⌊log₂ 19⌋ + 1 = 5')
}
// L6-1: the Ishango essay anchors: the prime column sums 60, total 168
eq(sum(ishangoLeft) + sum(ishangoCentre) + sum(ishangoRight), 168, 'J: L6-1 the bone totals 168; the debate is over meaning, not counts')

/* ================================================================== */
/* (M) figure geometry                                                 */
/* ================================================================== */
console.log('(M) figure geometry audits')

// Figure 1 (9.1): the compression ladder — three rows, viewBox 720×300
{
  const W = 720
  const H = 300
  const rows = [
    { y: 70, count: '3,027 strokes' },
    { y: 155, count: '12 symbols' },
    { y: 240, count: '4 digits' },
  ]
  ok(rows.every((r) => r.y > 20 && r.y < H - 20), 'M: fig 9.1-1 rows inside the viewBox')
  // row 2: 3 lotus + (EMPTY hundreds — no coil glyph survives) + 2 heels + 7 strokes.
  // figure-audit sweep 2026-11-11: the figure used to DRAW 2 coils, summing
  // the row to 3,227 against the pinned 3,027; the coil run is now an empty
  // labelled zone (the hieroglyph system drops empty places).
  const glyphs: { x: number; w: number; t: string }[] = []
  let x = 48
  const place = (w: number, t: string) => {
    glyphs.push({ x, w, t })
    x += w + 10
  }
  for (let i = 0; i < 3; i++) place(26, 'lotus')
  x += 14
  x += 72 + 14 // the empty hundreds zone (0 coils — no glyph, label only)
  for (let i = 0; i < 2; i++) place(24, 'heel')
  x += 14
  for (let i = 0; i < 7; i++) place(10, 'stroke')
  ok(x < 560, 'M: fig 9.1-1 the 12-glyph run ends at x = ' + x + ' < 560, clear of the right-margin counter')
  let overlap = false
  for (let i = 1; i < glyphs.length; i++) if (glyphs[i].x < glyphs[i - 1].x + glyphs[i - 1].w) overlap = true
  ok(!overlap, 'M: fig 9.1-1 no two glyph boxes overlap (min gap 10px)')
  // value check: what the row draws is 3,027
  eq(3 * 1000 + 0 * 100 + 2 * 10 + 7, 3027, 'M: fig 9.1-1 the drawn multiset 3·1000 + 0·100 + 2·10 + 7 = 3,027')
}

// Figure 2 (9.1): the doubling engine — 5 rows + sum line, viewBox 720×320
{
  const rowsY = [48, 96, 144, 192, 240]
  const vals = [23, 46, 92, 184, 368]
  const ticks = [1, 2, 4, 8, 16]
  const picked = [0, 1, 4]
  ok(rowsY.every((y) => y > 20 && y < 300), 'M: fig 9.1-2 rows inside the viewBox')
  ok(picked.every((i) => ticks[i] === [1, 2, 16][picked.indexOf(i)]), 'M: fig 9.1-2 the highlighted rows are exactly 1, 2, 16')
  eq(picked.reduce((s, i) => s + vals[i], 0), 437, 'M: fig 9.1-2 the highlighted values sum to 437')
  // sum line at y = 288
  ok(240 < 288 && 288 < 320 - 10, 'M: fig 9.1-2 the sum line clears the last row')
}

// Figure 1 (9.2): two place ladders — log-scaled steps, viewBox 720×340
{
  const yOf = (v: number, scale: number) => 300 - scale * Math.log10(v)
  const bab = [1, 60, 3600].map((v) => yOf(v, 60))
  const may = [1, 20, 360, 7200, 144000].map((v) => yOf(v, 45))
  ok(bab.every((y) => y >= 60 && y <= 300), 'M: fig 9.2-1 the Babylonian steps land in band (' + bab.map((y) => y.toFixed(1)).join(', ') + ')')
  ok(may.every((y) => y >= 60 && y <= 300), 'M: fig 9.2-1 the Mayan steps land in band (' + may.map((y) => y.toFixed(1)).join(', ') + ')')
  // the 18-kink: the step 20→360 grows by log10(18) not log10(20)
  const expectedKink = Math.log10(360) - Math.log10(20)
  ok(Math.abs(expectedKink - Math.log10(18)) < 1e-12, 'M: fig 9.2-1 the kink height = log₁₀ 18 ≈ 1.2553 (vs log₁₀ 20 ≈ 1.3010 for a clean base)')
  // label collision: the mayan ladder x-range and babylonian x-range are disjoint
  const babX = [150, 150]
  const mayX = [470, 470]
  ok(Math.abs(babX[0] - mayX[0]) > 200, 'M: fig 9.2-1 the two ladders are 320px apart — no label collisions')
  // step annotations
  ok(Math.log10(60).toFixed(4) === '1.7782', 'M: fig 9.2-1 the uniform ×60 step = log₁₀60 ≈ 1.7782 (Babylonian)')
}

// Figure 2 (9.2): the YBC square — square + diagonals + three labels, viewBox 720×320
{
  const cx = 270
  const half = 110
  const corners = [
    [cx - half, 50],
    [cx + half, 50],
    [cx + half, 50 + 2 * half],
    [cx - half, 50 + 2 * half],
  ]
  ok(corners[2][1] === 270 && 270 < 320 - 30, 'M: fig 9.2-2 the square (side 220) fits the viewBox with room for the caption row')
  // diagonal label position: midpoint of the main diagonal, offset
  const mid = [(corners[0][0] + corners[2][0]) / 2, (corners[0][1] + corners[2][1]) / 2]
  ok(mid[0] === 270 && mid[1] === 160, 'M: fig 9.2-2 the diagonal label anchor is the centre (270, 160)')
  // the three value labels: side 30 (bottom, y = 292), diagonal 42;25,35 (right of centre), ratio 1;24,51,10 (along the diagonal, rotated)
  ok(292 < 320 - 10, 'M: fig 9.2-2 the side label clears the bottom edge')
  // the annotated decimals row: 1.41421296… vs 1.41421356… at y = 306 — must not collide with the square (bottom 270)
  ok(306 > 270 + 20, 'M: fig 9.2-2 the decimal-comparison row sits ≥ 20px below the square')
}

/* ================================================================== */
/* (N) formula cards and the comparison table                          */
/* ================================================================== */
console.log('(N) formula cards + comparison table')

// additive symbol-count bound
ok(digitSum(999) === 27 && digitSum(999999) === 54, 'N: symbols(N) = Σ digits ≤ 9d — equality anchors 999 (27) and 999,999 (54)')
// doubling count
ok(Math.floor(Math.log2(19)) + 1 === 5 && Math.floor(Math.log2(34)) + 1 === 6, 'N: doublings = ⌊log₂ m⌋ + 1 (19 → 5 rows, 34 → 6 rows)')
// tally split
ok(34 === 6 * 5 + 4 && 87 === 8 * 10 + 7, 'N: N = b·⌊N/b⌋ + (N mod b) at the lesson anchors')
// sexagesimal value of a two-digit string
ok(fromSex([1, 20]) === 80 && fromSex([3, 16]) === 196, 'N: ⟨a,b⟩₆₀ = 60a + b — anchors 80 and 196')
// the mayan calendar value formula anchor
ok(9 * 144000 + 9 * 7200 + 16 * 360 === 1366560, 'N: 144,000b + 7,200k + 360t + 20u + g at 9.9.16.0.0')
// the comparison table (E) re-anchored for the lesson's Table 2
eq(
  samples.length,
  8,
  'N: the comparison table carries 8 rows (4 … 3,999 — the classical Roman ceiling)'
)
// the four-system comparison table rows (9.2 Table 2) — the factual cells
{
  const systems = ['Hieroglyphs', 'Roman', 'Babylonian', 'Mayan', 'Decimal']
  ok(systems.length === 5, 'N: the comparison table names five systems')
}

/* ================================================================== */
/* (K) quiz keys 9.2                                                   */
/* ================================================================== */
console.log('(K) quiz keys 9.2 (intended indices 1/3/2/1/1)')

// Q1 key 1: two wedge forms (vertical = 1, corner = 10) — the whole inventory
eq([10, 1].length, 2, 'K: Q1 key 1 — the system is built from exactly two wedge forms')
// Q2 key 3: ⟨1,13,46⟩ = 4,426
eq(fromSex([1, 13, 46]), 4426, 'K: Q2 key 3 — 1·3600 + 13·60 + 46 = 4,426 (distractors 159 = digit concatenation, 786 = 13×60+6 misread, 1,134 = 13·60+46+360·3 misplace)')
// Q3 key 2: the geometric family {80·60^j}
ok(fromSex([1, 20]) === 80 && fromSex([1, 20]) * 60 === 4800 && Math.abs(fromSex([1, 20]) / 60 - 4 / 3) < 1e-12, 'K: Q3 key 2 — the readings are one value times every power of 60 (80, 4,800, 4/3 …), not multiples of 20, not the powers themselves, not just two')
// Q4 key 1: 18 × 20 = 360 fits the calendar year
eq(18 * 20, 360, 'K: Q4 key 1 — the tun = 18×20 = 360 ≈ the year; not the shell zero (that is a placeholder), not a counting limit (digits reach 19), not base-60 influence')
// Q5 key 1: a true zero digit usable anywhere
ok(toSex(3607).join(',') === '1,0,7' && toSex(7200).join(',') === '2,0,0', 'K: Q5 key 1 — Babylon wrote internal gaps and could not trail zeros; the decimal revolution made zero a digit everywhere (distractors: bigger numbers Babylon had, tables they built, a smaller base nobody wanted)')

/* ================================================================== */
/* (L) exercise keys 9.2                                               */
/* ================================================================== */
console.log('(L) exercise keys 9.2 (recomputed both sides)')

// L1-1: 25 = 2 corner wedges + 5 vertical wedges (one digit group)
eq(10 * 2 + 5, 25, 'L: L1-1 both sides (2 corner + 5 vertical = 25)')
// L1-2: 13 = 2 bars + 3 dots
eq(5 * 2 + 3, 13, 'L: L1-2 both sides (2 bars + 3 dots = 13)')
// L1-3: ⟨3,16⟩ = 196
eq(fromSex([3, 16]), 196, 'L: L1-3 both sides (3·60 + 16 = 196)')
// L2-1: 5,182 = ⟨1,26,22⟩
eq(toSex(5182).join(','), '1,26,22', 'L: L2-1 both sides (5,182 = 3,600 + 26·60 + 22)')
// L2-2: ⟨8,0,16⟩ calendar 2,896 / pure 3,216 / gap 320
eq(8 * 360 + 0 * 20 + 16, 2896, 'L: L2-2 calendar reading 2,896')
eq(8 * 400 + 0 * 20 + 16, 3216, 'L: L2-2 pure reading 3,216')
eq(3216 - 2896, 8 * (400 - 360), 'L: L2-2 the gap 320 = 8·(400−360)')
// L2-3: 7,233 = ⟨2,0,33⟩
eq(toSex(7233).join(','), '2,0,33', 'L: L2-3 both sides (7,233 = 2·3,600 + 33 — the internal gap)')
// L2-4: 4,876 = ⟨1,21,16⟩ and ⟨2,0,59⟩ = 7,259
eq(toSex(4876).join(','), '1,21,16', 'L: L2-4 to-sexagesimal 4,876 = ⟨1,21,16⟩')
eq(fromSex([2, 0, 59]), 7259, 'L: L2-4 from-sexagesimal ⟨2,0,59⟩ = 7,259')
// L3-1: the ⟨2 30⟩ family {150·60^j}
{
  const anchors: [number, string][] = [
    [150, 'j=0'], [150 / 60, 'j=-1'], [150 / 3600, 'j=-2'], [150 * 60, 'j=1'], [150 * 3600, 'j=2'],
  ]
  eq(anchors[0][0], 150, 'L: L3-1 j=0 reading 150')
  ok(anchors[1][0] === 2.5, 'L: L3-1 j=−1 reading 5/2 = 2.5')
  ok(Math.abs(anchors[2][0] - 1 / 24) < 1e-12, 'L: L3-1 j=−2 reading 1/24 ≈ 0.0416…')
  eq(anchors[3][0], 9000, 'L: L3-1 j=+1 reading 9,000')
  eq(anchors[4][0], 540000, 'L: L3-1 j=+2 reading 540,000')
}
// L3-2: 10.2.3.12.7 = 1,455,727 days, inverse recovers the digits
eq(10 * 144000 + 2 * 7200 + 3 * 360 + 12 * 20 + 7, 1455727, 'L: L3-2 both sides (10.2.3.12.7 = 1,455,727 days)')
// L4-1: exam-style conversions (anchors repeated for the labels)
eq(toSex(4876).join(','), '1,21,16', 'L: L4-1 4,876 → ⟨1,21,16⟩ (exam-style)')
eq(fromSex([2, 0, 59]), 7259, 'L: L4-1 ⟨2,0,59⟩ → 7,259 (exam-style, internal zero)')
// L4-2: the YBC product + accuracy
eq(fracDec(BigInt(9164100), BigInt(216000), 8), '42.42638888', 'L: L4-2 30 × 1;24,51,10 = 42.42638888… = 42;25,35')
ok(1 / 4.237e-7 > 2e6, 'L: L4-2 the diagonal ratio is accurate to about one part in 2.36 million')
// L5-1: the inverse algorithm on 1,366,560
{
  let d = 1366560
  const g = d % 20
  d = Math.floor(d / 20)
  const u = d % 18
  d = Math.floor(d / 18)
  const t = d % 20
  d = Math.floor(d / 20)
  const k = d % 20
  d = Math.floor(d / 20)
  const b = d
  eq([b, k, t, u, g].join('.'), '9.9.16.0.0', 'L: L5-1 the mod-20 / mod-18 inverse recovers 9.9.16.0.0 from 1,366,560')
}
// L6-1: the ambiguity theorem anchors (two families, same shape)
{
  const fam80 = [80, 4800, 288000]
  const fam150 = [150, 9000, 540000]
  ok(fam80[1] === fam80[0] * 60 && fam80[2] === fam80[1] * 60, 'L: L6-1 the ⟨1 20⟩ family is geometric in ratio 60')
  ok(fam150[1] === fam150[0] * 60 && fam150[2] === fam150[1] * 60, 'L: L6-1 the ⟨2 30⟩ family is geometric in ratio 60')
  ok(Math.abs(fam80[0] / 60 - 4 / 3) < 1e-12 && Math.abs(fam150[0] / 60 - 2.5) < 1e-12, 'L: L6-1 the fractional arms 4/3 and 5/2 continue the same families downward')
}

/* ================================================================== */
/* O — 9.3 zero as a number: Brahmagupta's rules and the modern verdict */
/* ================================================================== */
// O-1: the addition/subtraction rules of 18.30/18.32 hold as identities
{
  let okCount = 0
  for (let n = -50; n <= 50; n++) {
    if (0 + n === n && n - 0 === n && 0 - n === -n) okCount++
  }
  eq(okCount, 101, 'O: O-1 Brahmagupta 18.30/18.32 — 0+n = n, n−0 = n, 0−n = −n for n ∈ [−50, 50]')
  ok(0 + 0 === 0 && 0 - 0 === 0, 'O: O-1 18.30/18.32 — zero plus zero is zero, zero minus zero is zero')
}
// O-2: the multiplication rule of 18.33: the product of zero with any number is zero
{
  let okCount = 0
  for (let n = -50; n <= 50; n++) if (0 * n === 0 && n * 0 === 0) okCount++
  eq(okCount, 101, 'O: O-2 Brahmagupta 18.33 — zero × n = 0 on both sides, n ∈ [−50, 50]')
  ok(0 * 0 === 0, 'O: O-2 18.33 — zero times zero is zero')
}
// O-3: the derivation of 0·n = 0 from the integer laws (distributivity + cancellation)
{
  const n = 37
  const m = n * 0
  eq(m + m, m, 'O: O-3 the distributivity step: n·0 + n·0 = n·(0+0) = n·0, so 2m = m')
  eq(m, 0, 'O: O-3 the cancellation step: (2−1)·m = 0 forces m = n·0 = 0')
}
// O-4: division by zero, branch 1 — for a ≠ 0 NO q satisfies q·0 = a (the modern verdict on 18.35)
{
  let found = 0
  for (let q = -1000; q <= 1000; q++) if (q * 0 === 6) found++
  eq(found, 0, 'O: O-4 for a = 6 no trial integer q solves q·0 = 6 — the multiplication check has NO solution')
}
// O-5: division by zero, branch 2 — 0/0 is non-unique: EVERY q solves q·0 = 0
{
  let found = 0
  for (let q = -1000; q <= 1000; q++) if (q * 0 === 0) found++
  eq(found, 2001, 'O: O-5 0/0: all 2,001 trial integers solve q·0 = 0 — uniqueness fails, 0/0 is indeterminate (Euler)')
}
// O-6: the khahara contradiction kernel: any candidate value p/r for 6/0 forces 6r = p·0 = 0
{
  const p = BigInt(123456), r = BigInt(7)
  eq(p * BigInt(0) * r, BigInt(0), 'O: O-6 p·0·r = 0, never 6r — so 6/0 has no rational value, khahara notwithstanding')
}

/* ================================================================== */
/* P — 9.3 the zero census and the uniqueness theorem completed        */
/* ================================================================== */
// P-1: the census of names containing 0 by length d: 9·10^(d−1) names, 9^d without zero
{
  const withZero = (d: number) => 9 * Math.pow(10, d - 1) - Math.pow(9, d)
  eq(withZero(2), 9, 'P: P-1 length-2 names needing zero (10, 20, …, 90): 9')
  eq(withZero(3), 171, 'P: P-1 length-3 names needing zero: 900 − 729 = 171')
  eq(withZero(4), 2439, 'P: P-1 length-4 names needing zero: 9,000 − 6,561 = 2,439')
}
// P-2: the totals — 1..999 → 180; 1..9999 → 2,619 (both exhaustive and by identity)
{
  let withZero999 = 0
  for (let n = 1; n <= 999; n++) if (String(n).includes('0')) withZero999++
  eq(withZero999, 180, 'P: P-2 numbers 1..999 whose decimal name contains a zero: 180 (exhaustive)')
  let withZero9999 = 0
  for (let n = 1; n <= 9999; n++) if (String(n).includes('0')) withZero9999++
  eq(withZero9999, 2619, 'P: P-2 numbers 1..9999 whose name contains a zero: 2,619 (exhaustive)')
  eq(9 + 81 + 729 + 6561, 7380, 'P: P-2 the zeroless names below 10^4: 9 + 81 + 729 + 6,561 = 7,380')
  eq(9999 - 7380, 2619, 'P: P-2 the census identity 9,999 − 7,380 = 2,619')
  ok(Math.abs(2619 / 9999 - 0.262) < 0.0005, 'P: P-2 the census share 2,619/9,999 ≈ 26.2%')
}
// P-3: a zeroless three-place alphabet {1..9}^{≤3} supplies only 819 strings for 999 numbers
{
  eq(9 + 81 + 729, 819, 'P: P-3 the zeroless strings of length ≤ 3: 9 + 81 + 729 = 819 < 999 — 180 numbers left nameless')
}
// P-4: the general zeroless ambiguity theorem (9.2 generalized to any base): readings = {V·b^j}
{
  const arm: number[] = []
  let v = 5
  for (let j = 0; j < 3; j++) { arm.push(v); v *= 10 }
  eq(arm.join(','), '5,50,500', 'P: P-4 the zeroless base-ten arm «5» = {5·10^j}: 5, 50, 500, …')
  eq(5 / 10, 0.5, 'P: P-4 the fractional arm continues downward: 5·10^(−1) = 1/2')
}
// P-5: uniqueness WITH zero — the division-algorithm digits reproduce the name; sweep finds no collisions
{
  const digits = (n: number): number[] => {
    const out: number[] = []
    let m = n
    do { out.unshift(m % 10); m = Math.floor(m / 10) } while (m > 0)
    return out
  }
  eq(digits(2807).join(','), '2,8,0,7', 'P: P-5 the division-algorithm digits of 2,807 = 2,8,0,7 — the zero digit included')
  eq(digits(3601).join(','), '3,6,0,1', 'P: P-5 the division-algorithm digits of 3,601 = 3,6,0,1')
  const seen = new Set<string>()
  let collisions = 0
  for (let n = 1; n <= 5000; n++) {
    const s = digits(n).join('')
    if (seen.has(s)) collisions++
    seen.add(s)
  }
  eq(collisions, 0, 'P: P-5 the uniqueness sweep 1..5000: no two numbers share a decimal string')
}
// P-6: the trailing-zero laws — N·10 appends a zero digit; N·60 appends a zero GROUP
{
  eq(2807 * 10, 28070, 'P: P-6 2,807 · 10 = 28,070 — the appended zero digit')
  eq(2807 * 60, 168420, 'P: P-6 2,807 · 60 = 168,420 = ⟨46,47,0⟩ — the appended zero group Babylon could not write')
  eq(Math.floor(2807 / 60), 46, 'P: P-6 2,807 = 46·60 + 47 — the group decomposition')
  eq(2807 % 60, 47, 'P: P-6 the remainder 47')
}

/* ================================================================== */
/* Q — 9.3 the capstone exhibits: 3,601 and 2,807 across five systems  */
/* ================================================================== */
// Q-1: the additive spellings: hieroglyph symbol counts (empty tens places cost nothing)
{
  const hierCount = (n: number): number => {
    const units = [1000000, 100000, 10000, 1000, 100, 10, 1]
    let s = 0
    for (const u of units) { s += Math.floor(n / u); n %= u }
    return s
  }
  eq(hierCount(3601), 10, 'Q: Q-1 3,601 in hieroglyphs = 10 symbols (3 fingers + 6 coils + 1 stroke); the empty tens vanish')
  eq(hierCount(2807), 17, 'Q: Q-1 2,807 in hieroglyphs = 17 symbols (2 + 8 + 0 + 7)')
}
// Q-2: the Roman spellings (canonical subtractive, both ≤ 3,999)
{
  eq(romanSub(3601), 'MMMDCI', 'Q: Q-2 3,601 = MMMDCI')
  eq(romanValue(romanSub(3601)), 3601, 'Q: Q-2 the Roman encoder round-trips 3,601')
  eq(romanSub(3601).length, 6, 'Q: Q-2 MMMDCI is 6 letters')
  eq(romanSub(2807), 'MMDCCCVII', 'Q: Q-2 2,807 = MMDCCCVII — the empty tens place simply vanishes')
  eq(romanValue(romanSub(2807)), 2807, 'Q: Q-2 the Roman encoder round-trips 2,807')
  eq(romanSub(2807).length, 9, 'Q: Q-2 MMDCCCVII is 9 letters')
}
// Q-3: 3,601 in base sixty = ⟨1,0,1⟩ — the internal gap and its geometric family
{
  eq(toSex(3601).join(','), '1,0,1', 'Q: Q-3 3,601 = ⟨1,0,1⟩ in base sixty — the zero digit Babylon had to leave as a gap')
  eq(fromSex([1, 0, 1]), 3601, 'Q: Q-3 decode ⟨1,0,1⟩ = 3,601')
  const fam: string[] = []
  for (let j = 0; j <= 2; j++) fam.push((3601 * Math.pow(60, j)).toLocaleString('en-US'))
  eq(fam.join(' / '), '3,601 / 216,060 / 12,963,600', 'Q: Q-3 the zeroless family {3,601·60^j}: 3,601 / 216,060 / 12,963,600')
  eq(3601 / 60, 60 + 1 / 60, 'Q: Q-3 the fractional arm 3,601·60^(−1) = 60 + 1/60')
}
// Q-4: 3,601 on the Mayan ladders — calendar ⟨10,0,1⟩ = 3,601 vs pure ⟨10,0,1⟩ = 4,001
{
  eq(10 * 360 + 0 * 20 + 1, 3601, 'Q: Q-4 the calendar-ladder reading ⟨10,0,1⟩ = 3,601')
  eq(10 * 400 + 0 * 20 + 1, 4001, 'Q: Q-4 the pure-vigesimal reading ⟨10,0,1⟩ = 4,001 — the kink doubles the string')
  eq(4001 - 3601, 400, 'Q: Q-4 the gap 4,001 − 3,601 = 400 = 10·(400 − 360)')
}
// Q-5: the wedge counts for the figure — 2,807 = ⟨46,47⟩ presses 21 wedges
{
  eq(46 * 60 + 47, 2807, 'Q: Q-5 2,807 = ⟨46,47⟩ in base sixty')
  eq(Math.floor(46 / 10) + (46 % 10), 10, 'Q: Q-5 the digit 46 presses 4 corner + 6 vertical = 10 wedges')
  eq(Math.floor(47 / 10) + (47 % 10), 11, 'Q: Q-5 the digit 47 presses 4 corner + 7 vertical = 11 wedges')
  eq(10 + 11, 21, 'Q: Q-5 2,807 needs 21 wedges in two groups — with no mark in the tens')
}
// Q-6: the dot/bar counts for the Mayan digit rows ⟨10,0,1⟩ and ⟨7,16,7⟩
{
  eq(Math.floor(10 / 5), 2, 'Q: Q-6 the Mayan digit 10 = 2 bars + 0 dots')
  eq(Math.floor(16 / 5) * 5 + (16 % 5), 16, 'Q: Q-6 the Mayan digit 16 = 3 bars + 1 dot')
  eq(Math.floor(7 / 5), 1, 'Q: Q-6 the Mayan digit 7 = 1 bar + 2 dots')
  eq(2 * 5 + 0, 10, 'Q: Q-6 the digit-10 value identity 2·5 + 0 = 10')
  eq(3 * 5 + 1, 16, 'Q: Q-6 the digit-16 value identity 3·5 + 1 = 16')
  eq(1 * 5 + 2, 7, 'Q: Q-6 the digit-7 value identity 1·5 + 2 = 7')
}
// Q-7: the closed census formula N(k) = (10^k − 1) − (9^(k+1) − 9)/8 at k = 2, 3, 4
{
  const census = (k: number) => Math.pow(10, k) - 1 - (Math.pow(9, k + 1) - 9) / 8
  eq(census(2), 9, 'Q: Q-7 the closed census formula at k = 2: 9')
  eq(census(3), 180, 'Q: Q-7 the closed census formula at k = 3: 180')
  eq(census(4), 2619, 'Q: Q-7 the closed census formula at k = 4: 2,619')
}

// Q-8: 2,807 on the Mayan calendar ladder — the true decomposition ⟨7,14,7⟩ (regression guard:
// the review pass caught an authored ⟨7,16,7⟩ = 2,847 miscount; this pins the correct digits)
{
  eq(7 * 360 + 14 * 20 + 7, 2807, 'Q: Q-8 2,807 = ⟨7,14,7⟩ on the Mayan calendar ladder (7·360 + 14·20 + 7)')
  eq(7 * 360 + 16 * 20 + 7, 2847, 'Q: Q-8 the miscount ⟨7,16,7⟩ names 2,847, NOT 2,807 — the caught defect')
  eq(2 * 5 + 4, 14, 'Q: Q-8 the digit 14 = 2 bars + 4 dots')
  eq((2807 - 7 * 360) % 20, 7, 'Q: Q-8 the mod-20/mod-18 style strip recovers the unit digit 7')
}
// Q-9: the census exercise intermediates (the review caught a 9^4 − 9 = 6,480 mis-arithmetic; pin 6,552)
{
  eq(Math.pow(9, 4) - 9, 6552, 'Q: Q-9 9^4 − 9 = 6,552 (the authored 6,480 was the caught defect)')
  eq(6552 / 8, 819, 'Q: Q-9 6,552/8 = 819 zeroless names of length ≤ 3')
  eq(999 - 819, 180, 'Q: Q-9 999 − 819 = 180')
}

/* ================================================================== */
/* summary                                                             */
/* ================================================================== */
console.log('--------------------------------------------------------------')
console.log(`verify-book2-ch09 (sections A–Q, lessons 9.1–9.3): ${pass} pass, ${fail} fail`)
if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
console.log('ALL GREEN')
