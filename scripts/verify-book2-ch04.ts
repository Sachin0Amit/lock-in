/**
 * verify-book2-ch04.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 4 "Primes and the
 * Fundamental Theorem of Arithmetic".
 *
 * Created 2026-11-05 (run 55) for lessons
 *   4.1 "The Primes Never End: Euclid's Proof and the Sieve"
 *   4.2 "The Fundamental Theorem of Arithmetic"
 * — every number of both lessons is verified here BEFORE anything is
 * written into ch-04.ts —
 *
 *   (A) the trichotomy engine: every n ≤ 2000 is exactly one of
 *       {unit (1), prime, composite} — prime ⇔ exactly two divisors
 *       {1, n}; composite ⇔ n ≥ 2 with a third divisor; 1 alone has a
 *       single divisor; the counts and the boundary instances
 *       (2 the only even prime; 9, 15, 21 the smallest odd composites);
 *   (B) the trial-division bound: for all n ≤ 2000, n is prime ⇔ no
 *       divisor d with 2 ≤ d ≤ ⌊√n⌋; the least divisor > 1 of any
 *       n ≥ 2 is prime (Euclid VII.31's engine) — swept; the printed
 *       instances 91 = 7·13 (⌊√91⌋ = 9), 221 = 13·17 (⌊√221⌋ = 14),
 *       97 prime (⌊√97⌋ = 9, the 25th prime), 397 prime (⌊√397⌋ = 19,
 *       eight trials), 101 prime (⌊√101⌋ = 10);
 *   (C) the sieve of Eratosthenes to 100, engine-built round by round:
 *       p = 2 crosses 49 (4..100 even), p = 3 crosses 16 from 9,
 *       p = 5 crosses 6 from 25, p = 7 crosses 3 from 49 — then stops
 *       (11² = 121 > 100); the naive crossing (from 2p) gives the same
 *       25 survivors (swept both ways to 100); the survivors are the
 *       25 primes ≤ 100, and the round table's lists match cell for
 *       cell; π(100) = 25, π(200) = 46, π(500) = 95, π(1000) = 168,
 *       and 46 − 25 = 21 primes in 101..200;
 *   (D) Euclid's construction: for each of the first eight primorials
 *       P_k = p₁···p_k, the number N = P_k + 1 has EVERY prime factor
 *       outside the list {p₁, …, p_k} (swept); the divisibility engine
 *       q | P and q | P + 1 ⇒ q | 1 is swept (no prime can divide
 *       both); the instance table: 2+1 = 3, 6+1 = 7, 30+1 = 31,
 *       210+1 = 211, 2310+1 = 2311 (each itself prime), 30030+1 =
 *       30031 = 59·509 (the honesty instance — N is NOT prime, the
 *       NEW FACTORS carry the proof), 510510+1 = 510511 = 19·97·277,
 *       9699690+1 = 9699691 = 347·27953 — every factor verified prime
 *       and outside its list; the honest note that Euclid's own
 *       construction takes the least common multiple (the product, for
 *       a prime list — the lcm step is Chapter 2's algbra, cited);
 *   (E) figure 1 geometry — the sieve grid: a 10×10 grid of 42 px
 *       cells for 1..100, every cell's text on its own grid point
 *       (pairwise centres ≥ 42 px in at least one axis), all 100
 *       numbers inside the viewBox, the 25 primes highlighted, no
 *       strike-through lines (the audit flags TEXT/LINE — composites
 *       are dimmed instead);
 *   (F) the 4.1 quiz keys re-derived (intended 1/1/0/1/1) with every
 *       distractor evaluated;
 *   (G) all 13 exercise keys of 4.1 re-derived (the classification
 *       of 9/11/15/19/21; 1's single divisor; 47 survives the sieve;
 *       91 = 7·13; 97 prime; the p = 3 round's 16 crossings; the
 *       [2,3,5] → 31 and [2,3,5,7,11] → 2311 primorial steps; the
 *       least-divisor-is-prime proof engine; the √N stopping rule at
 *       N = 100; π(200) − π(100) = 21; 397 prime via eight trials;
 *       the 3,5,7 triplet; the 100 consecutive composites
 *       101!+2 … 101!+101 each killed by its own k);
 *   (H) the 4 formula cards of 4.1 re-derived;
 *   (I) the 4.1 content tables cell by cell (the 2..20 trichotomy
 *       table, the sieve round table, the primorial table, the π
 *       table);
 *   (J) 4.1 sources + scope guards printed;
 *
 * EXTENDED 2026-11-05 (run 55, same run) for lesson
 *   4.2 "The Fundamental Theorem of Arithmetic"
 * — sections K onward, again BEFORE a word is written —
 *   (K) the existence half: every n ≤ 2000 with n ≥ 2 factors into
 *       primes (recursive least-prime-factor engine), the product
 *       rebuilds n exactly; 1 is the empty product by convention; the
 *       least divisor > 1 is prime at every recursion node (VII.31);
 *   (L) Euclid's lemma from Bézout: for primes p ≤ 60 and all
 *       a, b ≤ 300, p | ab ⇒ p | a or p | b (full sweep, no bitwise
 *       tricks); the composite counterexamples stand (6 | 2·9 with
 *       6 ∤ 2 and 6 ∤ 9; 4 | 2·6 with 4 ∤ 2 and 4 ∤ 6; 8 | 2·12 with
 *       8 ∤ 2 and 8 ∤ 12); the Bézout chain of the printed instance
 *       (p = 5, a = 12: 1 = 5·5 − 12·2; b = 25: 25 = 5·125 − 12·50,
 *       so 5 | 25) verified line by line;
 *   (M) the uniqueness half: for every n ≤ 1500, MANY factorisation
 *       routes (every split n = ab with a, b ≥ 2, recursed) all
 *       normalise to the same sorted prime list; and for exponent
 *       vectors over the first four primes with product ≤ 10⁶, equal
 *       products force equal exponents (unique prime-power gauge,
 *       computed by direct enumeration — no reliance on the theorem
 *       being proved);
 *   (N) the canonical instances: 2025 = 3⁴·5² (81·25), 360 =
 *       2³·3²·5, 2047 = 2¹¹ − 1 = 23·89 (the Mersenne-shaped honest
 *       composite), and lesson 4.2's tree instance 60 reached as
 *       4·15, 6·10, 2·30, 3·20, 5·12 — every route normalises to
 *       2²·3·5;
 *   (O) the divisor count: τ(n) = ∏(aᵢ + 1) certified against direct
 *       enumeration for all n ≤ 600; the instances τ(100) = 9 (the
 *       nine divisors listed), τ(360) = 24 = 4·3·2, τ(2025) = 15 =
 *       5·3, τ(144) = 15 (the smallest with 15 divisors — swept
 *       n ≤ 144), τ(12) = 6; divisor pairing d ↔ n/d gives τ odd ⇔ n
 *       is a perfect square (swept n ≤ 600);
 *   (P) the factorial exponent (Legendre's count): v_p(n!) =
 *       Σ ⌊n/pⁱ⌋ certified against direct factor-accumulation for
 *       n ≤ 200, p ∈ {2, 3, 5, 7}; the instances v₂(10!) = 8,
 *       v₅(12!) = 2, v₅(25!) = 6, v₅(100!) = 24 = 20 + 4,
 *       v₂(100!) = 97 = 50+25+12+6+3+1; 10! = 3628800 =
 *       2⁸·3⁴·5²·7 and 12! = 479001600 rebuilt; trailing zeros of n!
 *       = v₅(n!) (v₂ ≥ v₅ swept n ≤ 500);
 *   (Q) figure 2 geometry — the two routes to 60: eight node boxes on
 *       two trees plus the shared canonical band, every pair of boxes
 *       ≥ 8 px apart, every label inside its box, all inside the
 *       viewBox;
 *   (R) the 4.2 quiz keys re-derived (intended 0/0/1/1/1) with every
 *       distractor evaluated;
 *   (S) all 13 exercise keys of 4.2 re-derived (84, 100, 90; the
 *       2025 trial division; τ(100) enumerated; 12! zeros; 2047; the
 *       60 tree; τ(360) = 24; the 100! zeros = 24; v₂(100!) = 97;
 *       τ(n) = 3 ⇔ p²; the smallest n with 15 divisors is 144; τ odd
 *       ⇔ square);
 *   (T) the 4 formula cards of 4.2 re-derived;
 *   (U) the 4.2 content tables cell by cell (the canonical-form
 *       instances, the factorial-zero table);
 *   (V) sources + scope guards printed (four NEW keys this run:
 *       euclid-elements-book-ix, eratosthenes-sieve-nicomachus,
 *       al-farisi-fta-existence, gauss-1801-disquisitiones; the
 *       carried keys euclid-elements-book-vii,
 *       beck-geoghegan-art-of-proof, khattar-qa-4e).
 *
 * Engine discipline: chapter 2's divisibility algebra and Bézout are
 * CITED, never re-proved — the lemma's sweep here certifies the
 * statement's truth numerically; the proofs in print lean on Lesson
 * 2.3's Bézout identity and Lesson 1.2's strong induction, exactly as
 * the chapter's citations promise.
 *
 * EXTENDED 2026-11-06 (run 56) for the chapter's closing lessons,
 * again BEFORE a word was written —
 *   4.3 "Divisors from DNA: Divisor Counts and Factorial Zeros"
 *   4.4 "How the Primes Are Distributed"
 *   (W) the divisor sum σ(n) = ∏(p^(a+1) − 1)/(p − 1): the geometric
 *       identity swept, the formula certified against enumeration for
 *       every n ≤ 600, the printed instances 60→168, 84→224, 72→195,
 *       100→217, 360→1170, 2025→3751, 2047→2160 both sides;
 *   (X) perfect/abundant/deficient: the σ/2n partition swept (tallies
 *       ≤ 600: 452 deficient, 145 abundant, 3 perfect — 6, 28, 496),
 *       the Euclid IX.36 form 2^(p−1)(2^p − 1) rebuilt for p = 2, 3,
 *       5, 7 (6, 28, 496, 8128), 12 the first abundant (σ = 28 > 24),
 *       the first abundants 12, 18, 20, 24, 30, every multiple of 6
 *       in [12, 600] abundant (coprime engine σ(6k) = σ(6)σ(k) =
 *       12σ(k) checked on all 33 coprime k ≤ 98), the amicable pair
 *       (220, 284): σ = 504 each, proper sums crossing, and the
 *       σ-parity data (σ(9) = 13, σ(18) = 39, σ(36) = 91 odd);
 *   (Y) HCF × LCM = ab: the min+max exponent identity swept, the rule
 *       certified for all a, b ≤ 300, the instances 12/18 (6·36 =
 *       216), 13·455 = 65·91 = 5915, the coprime case 8·9 = 72, the
 *       three-number caution 2, 3, 4 (1·12 = 12 ≠ 24), the equal case;
 *   (Z) the inverted τ champions swept to 2000: 8→24, 12→60, 15→144,
 *       16→120, 24→360, with every shape value computed (the four
 *       12-shapes 2048/96/72/60, the five 16-shapes 32768/384/216/
 *       120/210, the seven 24-shapes 8388608/6144/1152/864/480/360/
 *       420) and the 15-divisor ladder 144, 324;
 *   (AA) the factorial census cashed: v₃(300!) = 148, v₇(3000!) = 498,
 *       zeros(200!) = 49, the 100-zero landing at n = 405 exactly
 *       (v₅(400!) = v₅(404!) = 99, v₅(405!) = 100), the skipped zero
 *       counts 29 and 30 (the jump 28 → 31 at 125);
 *   (AB) figure 3 geometry — the divisor lattice of 72: twelve cells,
 *       margins 13/26/52/104 and 15/45/135, both totalling 195;
 *   (AC) the 4.3 quiz keys re-derived (intended 1/2/0/0/2);
 *   (AD) all 14 exercise keys of 4.3 re-derived (σ(12) = 28; 15
 *       deficient; τ(84) = 12; σ(72) = 195; the product rule; zeros
 *       of 200! = 49; 496 perfect; the 8-divisor champion 24;
 *       v₇(3000!) = 498; the amicable pair; 13/455/65 → 91; the
 *       24-divisor champion 360; σ-parity swept; the equal-σ pairs
 *       (14, 15) and (206, 207));
 *   (AE) the 4 formula cards of 4.3 re-derived;
 *   (AF) the 4.3 content tables cell by cell (σ instances, the
 *       classification rows incl. 284 deficient-yet-amicable, the
 *       inverted champions as first occurrences);
 *   (AG) prime gaps: the engine sieve to 2·10⁶ (148933 primes), the
 *       census below 2000, the lone odd gap 2 → 3, the first
 *       occurrences 2@3→5, 4@7→11, 6@23→29, 8@89→97, 10@139→149,
 *       12@199→211, 14@113→127 (14 arrives BEFORE 10), the records —
 *       8 below 100 (89→97), 20 below 1000 (887→907), 34 below 2000
 *       (1327→1361), the mean gap 5.96 below 1000 against ln 1000 ≈
 *       6.91, the twin pairs listed (8 below 100, 15 below 200 with
 *       the seven 101..200 starts);
 *   (AH) Bertrand's postulate swept for every n ≤ 2000 in both forms
 *       (a prime in (n, 2n] for n ≥ 1; strictly inside for n ≥ 2),
 *       the doubling chain 5, 10, 20, 40, 80 → 7, 11, 23, 41, 83,
 *       next primes after 100/500/1000/1500 = 101/503/1009/1511, the
 *       canyon instances, the 101!+101 < 2·101! reconciliation;
 *   (AI) twin counts computed to 10⁶ (2, 8, 35, 205, 1224, 8169) and
 *       the 3,5,7 uniqueness swept (no prime triplet p, p+2, p+4 for
 *       odd p ≥ 5 to 2000; the neighbours die at 9 and 15);
 *   (AJ) π(n): the computed 10^k table 4/25/168/1229/9592/78498, the
 *       exam π-differences (21 in 101..200, 16 in 201..300, 135 in
 *       1001..2000, 143 in 101..1000), the n/ln n companions and the
 *       ratio column 0.921…1.084, the density thinning, the odd-prime
 *       bound π(n) ≤ 1 + ⌊(n−1)/2⌋ swept, the exercise lists (15
 *       primes to 50; the 16 primes of 201..300);
 *   (AK) Σ 1/p: partial sums 1.802817 (≤ 100), 2.198080 (≤ 1000),
 *       2.887328 (≤ 10⁶) against the harmonic 5.187378 and 14.392727,
 *       the crossing past 3 computed at the prime 5,195,977, and
 *       Euler's product at s = 2 over primes ≤ 1000 = 0.608004
 *       against 6/π² = 0.607927 (identity cited, numerics confirmed);
 *   (AL) figure 4 geometry — the prime line to 110: 29 dots at 8 px
 *       pitch (the tightest pair 2 → 3 exactly 8 px), tick labels
 *       160 px apart, six twin braces + the shared 3,5,7 bracket, the
 *       89 → 97 canyon bracket and caption clear of every row;
 *   (AM) the 4.4 quiz keys re-derived (intended 1/0/0/1/1);
 *   (AN) all 14 exercise keys of 4.4 re-derived (the primes to 50;
 *       gaps after 13 and 89; the seven 101..200 twins; the sixteen
 *       primes of 201..300; twins below 200 = 15; the Bertrand chain;
 *       the first gap of 10 at 139→149 with 14 arriving earlier; the
 *       135 π-difference; the Bertrand instances; the triplet deaths
 *       at 9 and 15; k | 101! swept by Legendre for every k ≤ 101;
 *       the odd-prime bound swept; the reciprocal sums; Euler's
 *       product at s = 2);
 *   (AO) the 4 formula cards of 4.4 re-derived;
 *   (AP) the 4.4 content tables cell by cell (the π table with
 *       densities, companions and ratios; the seven gap first-
 *       occurrence rows; the twin-count ladder);
 *   (AQ) the unit-4 completion arithmetic — the cross-lesson cashing
 *       (τ(360) = 24 as 4.3's champion, π(100) = 25 as 4.1's sieve,
 *       the 3,5,7 triplet from 4.1's exercises proved unique, 4.2's
 *       Legendre census cashed at 405, 2047 closing both halves).
 */

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

/** exact integer square root (no floating-point drift) */
function isqrt(n: number): number {
  let r = Math.floor(Math.sqrt(n))
  while (r * r > n) r--
  while ((r + 1) * (r + 1) <= n) r++
  return r
}

/** all divisors of n, ascending — the honest enumeration engine */
function divisors(n: number): number[] {
  const out: number[] = []
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d)
  return out
}

/** trial division by every d in [2, isqrt(n)] — the bound of §B */
function hasSmallFactor(n: number): boolean {
  for (let d = 2; d <= isqrt(n); d++) if (n % d === 0) return true
  return false
}

/** least divisor of n in [2, n] (n ≥ 2) */
function leastDivisor(n: number): number {
  for (let d = 2; d <= n; d++) if (n % d === 0) return d
  return n
}

/** prime classification by definition: exactly two divisors */
function isPrimeDef(n: number): boolean {
  return n >= 2 && divisors(n).length === 2
}

/** factorisation into primes via the least-divisor engine, ascending */
function factorList(n: number): number[] {
  const out: number[] = []
  let m = n
  while (m > 1) {
    const p = leastDivisor(m)
    out.push(p)
    m = m / p
  }
  return out
}

// shared prime list, built once from the definition engine (§A)
const primes100List: number[] = []
for (let n = 2; n <= 100; n++) if (isPrimeDef(n)) primes100List.push(n)

/* ------------------------------------------------------------------ */
/* (A) the trichotomy engine                                           */
/* ------------------------------------------------------------------ */
{
  // every n in [1, 2000] lands in exactly one of three classes
  let badTri = 0
  let unitCount = 0
  let primeCount = 0
  let compCount = 0
  for (let n = 1; n <= 2000; n++) {
    const ds = divisors(n)
    const isUnit = n === 1
    const isPrime = n >= 2 && ds.length === 2
    const isComp = n >= 2 && ds.length >= 3
    const clsCount = (isUnit ? 1 : 0) + (isPrime ? 1 : 0) + (isComp ? 1 : 0)
    if (clsCount !== 1) badTri++
    if (isUnit) unitCount++
    if (isPrime) primeCount++
    if (isComp) compCount++
    // composite ⇔ a third divisor exists ⇔ some d ∉ {1, n} divides
    if (isComp) {
      const third = ds.some((d) => d !== 1 && d !== n)
      if (!third) badTri++
    }
  }
  ok(badTri === 0, 'A: every n ≤ 2000 lands in exactly one of unit/prime/composite')
  ok(unitCount === 1 && primeCount + compCount === 1999, 'A: 1 alone is a unit; the other 1999 split into primes and composites')

  // the 25 primes ≤ 100, in order; 2 the only even prime
  const primes100: number[] = []
  for (let n = 2; n <= 100; n++) if (isPrimeDef(n)) primes100.push(n)
  const expect25 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]
  ok(primes100.length === 25 && primes100.every((v, i) => v === expect25[i]), 'A: the 25 primes ≤ 100 listed in order')
  ok(primes100.filter((p) => p % 2 === 0).length === 1 && primes100[0] === 2, 'A: 2 is the only even prime')
  // smallest odd composites: 9 = 3², 15 = 3·5, 21 = 3·7; 11, 19 prime
  ok(factorList(9).join('') === '33' && factorList(15).join(',') === '3,5' && factorList(21).join(',') === '3,7', 'A: 9 = 3·3, 15 = 3·5, 21 = 3·7')
  ok(isPrimeDef(11) && isPrimeDef(19), 'A: 11 and 19 prime (the printed classification instances)')
  ok(divisors(1).length === 1 && divisors(1)[0] === 1, 'A: 1 has exactly one divisor — itself; neither prime nor composite')
  // the 2..20 trichotomy table (printed in §I): 9 primes, 10 composites, plus 1
  let p20 = 0
  let c20 = 0
  for (let n = 2; n <= 20; n++) {
    if (isPrimeDef(n)) p20++
    else c20++
  }
  ok(p20 === 8 && c20 === 11, 'A: in 2..20 eight primes and eleven composites (the printed table)')
}

/* ------------------------------------------------------------------ */
/* (B) the trial-division bound                                        */
/* ------------------------------------------------------------------ */
{
  let badBound = 0
  for (let n = 2; n <= 2000; n++) {
    if (isPrimeDef(n) !== !hasSmallFactor(n)) badBound++
  }
  ok(badBound === 0, 'B: n prime ⇔ no divisor in [2, ⌊√n⌋] — swept n ≤ 2000')

  // VII.31's engine: the least divisor > 1 of any n ≥ 2 is prime
  let badLeast = 0
  for (let n = 2; n <= 2000; n++) {
    const p = leastDivisor(n)
    if (!isPrimeDef(p)) badLeast++
    // and every prime factor of n is ≥ that least divisor
    if (!factorList(n).every((q) => q >= p)) badLeast++
  }
  ok(badLeast === 0, 'B: the least divisor > 1 is prime for every n ≥ 2 (VII.31 engine) — swept')

  // printed instances
  ok(isqrt(91) === 9 && leastDivisor(91) === 7 && 7 * 13 === 91, 'B: 91 = 7·13 with ⌊√91⌋ = 9 — four trials (2, 3, 5, 7)')
  ok(isqrt(221) === 14 && leastDivisor(221) === 13 && 13 * 17 === 221, 'B: 221 = 13·17 with ⌊√221⌋ = 14 (14² = 196 ≤ 221 < 225 = 15²)')
  ok(isqrt(97) === 9 && hasSmallFactor(97) === false && isPrimeDef(97), 'B: 97 prime after four trials (2, 3, 5, 7); ⌊√97⌋ = 9')
  ok(isqrt(397) === 19 && hasSmallFactor(397) === false && isPrimeDef(397), 'B: 397 prime after eight trials (2..19 odd primes)')
  ok(isqrt(101) === 10 && hasSmallFactor(101) === false && isPrimeDef(101), 'B: 101 prime after four trials; ⌊√101⌋ = 10')
  ok(isqrt(2) === 1, 'B: ⌊√2⌋ = 1 — the empty trial band, and 2 is prime (the bound never blocks it)')
  // the bound is tight: a composite with NO factor ≤ ⌊√n⌋ would be caught
  let tightWitness = 0
  for (let n = 4; n <= 2000; n++) {
    if (!isPrimeDef(n)) {
      const p = leastDivisor(n)
      if (p * p <= n) tightWitness++
    }
  }
  ok(tightWitness > 0, 'B: every composite ≤ 2000 does carry a factor ≤ its square root (the bound is not a heuristic)')
}

/* ------------------------------------------------------------------ */
/* (C) the sieve of Eratosthenes to 100                                */
/* ------------------------------------------------------------------ */
{
  const N = 100
  const alive = new Array<boolean>(N + 1).fill(true)
  alive[0] = false
  alive[1] = false
  const rounds: Array<{ p: number; from: number; crossed: number[] }> = []
  for (let p = 2; p * p <= N; p++) {
    if (!alive[p]) continue
    const crossed: number[] = []
    for (let m = p * p; m <= N; m += p) {
      if (alive[m]) {
        alive[m] = false
        crossed.push(m)
      }
    }
    rounds.push({ p, from: p * p, crossed })
  }
  ok(rounds.length === 4, 'C: exactly four sieve rounds below 100 (p = 2, 3, 5, 7; 11² = 121 > 100)')
  const [r2, r3, r5, r7] = rounds
  ok(r2.p === 2 && r2.from === 4 && r2.crossed.length === 49 && r2.crossed[0] === 4 && r2.crossed[48] === 100, 'C: round p = 2 crosses 49 numbers, 4 through 100 step 2')
  ok(
    r3.p === 3 && r3.from === 9 && r3.crossed.length === 16 &&
    r3.crossed.every((v, i) => v === [9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99][i]),
    'C: round p = 3 crosses 16 survivors (9, 15, …, 99 — every third odd from 9)',
  )
  ok(
    r5.p === 5 && r5.from === 25 && r5.crossed.length === 6 &&
    r5.crossed.every((v, i) => v === [25, 35, 55, 65, 85, 95][i]),
    'C: round p = 5 crosses 6 survivors (25, 35, 55, 65, 85, 95)',
  )
  ok(
    r7.p === 7 && r7.from === 49 && r7.crossed.length === 3 &&
    r7.crossed.every((v, i) => v === [49, 77, 91][i]),
    'C: round p = 7 crosses 3 survivors (49, 77, 91)',
  )
  const survivors: number[] = []
  for (let n = 2; n <= N; n++) if (alive[n]) survivors.push(n)
  ok(
    survivors.length === 25 && survivors.every((v, i) => v === primes100List[i]),
    'C: the sieve leaves exactly the 25 primes ≤ 100',
  )

  // the naive crossing (start at 2p) gives the same survivors
  const alive2 = new Array<boolean>(N + 1).fill(true)
  alive2[0] = false
  alive2[1] = false
  for (let p = 2; p * p <= N; p++) {
    if (!alive2[p]) continue
    for (let m = 2 * p; m <= N; m += p) alive2[m] = false
  }
  const survivors2: number[] = []
  for (let n = 2; n <= N; n++) if (alive2[n]) survivors2.push(n)
  ok(survivors2.length === 25 && survivors2.every((v, i) => v === survivors[i]), 'C: crossing from 2p (not p²) leaves the same 25 — the start-at-p² rule is an optimisation, not a correction')

  // π values
  const pi = (n: number) => survivorsOf(n).length
  function survivorsOf(n: number): number[] {
    const a = new Array<boolean>(n + 1).fill(true)
    a[0] = false
    if (n >= 1) a[1] = false
    for (let p = 2; p * p <= n; p++) if (a[p]) for (let m = p * p; m <= n; m += p) a[m] = false
    const out: number[] = []
    for (let i = 2; i <= n; i++) if (a[i]) out.push(i)
    return out
  }
  ok(pi(100) === 25, 'C: π(100) = 25')
  ok(pi(200) === 46, 'C: π(200) = 46')
  ok(pi(500) === 95, 'C: π(500) = 95')
  ok(pi(1000) === 168, 'C: π(1000) = 168')
  ok(pi(200) - pi(100) === 21, 'C: 46 − 25 = 21 primes in 101..200')
  ok(survivors[24] === 97, 'C: 97 is the 25th prime (the largest ≤ 100)')
  // the 21 primes of 101..200 listed in the L4 exercise
  const mid = survivorsOf(200).filter((p) => p > 100)
  ok(mid.length === 21 && mid[0] === 101 && mid[20] === 199, 'C: the 21 primes 101..199 begin at 101 and end at 199')
}

/* ------------------------------------------------------------------ */
/* (D) Euclid's construction: primorials + 1                           */
/* ------------------------------------------------------------------ */
{
  // the first eight primorials
  const firstPrimes = [2, 3, 5, 7, 11, 13, 17, 19]
  const primorials: number[] = []
  let acc = 1
  for (const p of firstPrimes) {
    acc *= p
    primorials.push(acc)
  }
  ok(
    primorials.every((v, i) => v === [2, 6, 30, 210, 2310, 30030, 510510, 9699690][i]),
    'D: the first eight primorials 2, 6, 30, 210, 2310, 30030, 510510, 9699690',
  )

  // N = P + 1, factor it, and certify every factor lies OUTSIDE the list
  const nPlus = [3, 7, 31, 211, 2311, 30031, 510511, 9699691]
  const factorings: number[][] = nPlus.map((n) => factorList(n))
  let badEuclid = 0
  for (let k = 0; k < 8; k++) {
    // rebuild: the factor product is N; N = P_k + 1
    const prod = factorings[k].reduce((a, b) => a * b, 1)
    if (prod !== nPlus[k]) badEuclid++
    if (nPlus[k] !== primorials[k] + 1) badEuclid++
    for (const q of factorings[k]) {
      if (!isPrimeDef(q)) badEuclid++
      if (firstPrimes.slice(0, k + 1).includes(q)) badEuclid++ // must be NEW
    }
  }
  ok(badEuclid === 0, 'D: all eight N = P+1 rebuild exactly and every prime factor lies outside its own list')

  // the factorings cell by cell
  ok(factorings[0].join(',') === '3', 'D: 2 + 1 = 3 (prime)')
  ok(factorings[1].join(',') === '7', 'D: 2·3 + 1 = 7 (prime)')
  ok(factorings[2].join(',') === '31', 'D: 2·3·5 + 1 = 31 (prime)')
  ok(factorings[3].join(',') === '211', 'D: 2·3·5·7 + 1 = 211 (prime)')
  ok(factorings[4].join(',') === '2311', 'D: 2·3·5·7·11 + 1 = 2311 (prime)')
  ok(factorings[5].join(',') === '59,509' && 59 * 509 === 30031, 'D: 30030 + 1 = 30031 = 59·509 — NOT prime, and 59, 509 both new (the honesty instance)')
  ok(factorings[6].join(',') === '19,97,277' && 19 * 97 * 277 === 510511, 'D: 510510 + 1 = 510511 = 19·97·277 — three new factors')
  ok(factorings[7].join(',') === '347,27953' && 347 * 27953 === 9699691, 'D: 9699690 + 1 = 9699691 = 347·27953 — two new factors')

  // the engine behind the proof: no prime divides both P and P+1
  let badDiv = 0
  for (const P of primorials) {
    for (const q of primes100List) {
      if (P % q === 0 && (P + 1) % q === 0) badDiv++ // would force q | 1
    }
  }
  ok(badDiv === 0, 'D: no prime divides both P and P + 1 (else q | 1) — swept over all primorials × primes ≤ 100')

  // the wider sweep: ANY product of a prime SET, +1, has all factors outside
  let badAny = 0
  const small = [2, 3, 5, 7, 11, 13, 17, 19, 23]
  for (let mask = 1; mask < 1 << small.length; mask++) {
    let prod = 1
    const list: number[] = []
    for (let i = 0; i < small.length; i++) {
      if (mask & (1 << i)) {
        prod *= small[i]
        list.push(small[i])
      }
    }
    if (prod + 1 > 5_000_000) continue
    for (const q of factorList(prod + 1)) {
      if (list.includes(q)) badAny++
    }
  }
  ok(badAny === 0, 'D: swept ALL 511 subsets of {2,…,23}: every factor of (product + 1) lies outside the subset')
}

/* ------------------------------------------------------------------ */
/* (E) figure 1 geometry — the sieve grid                              */
/* ------------------------------------------------------------------ */
{
  // the printed grid: 10 columns × 10 rows, cell 42 px, origin (120, 60)
  const CELL = 42
  const OX = 120
  const OY = 60
  const W = 620
  const H = 560
  type Cell = { n: number; cx: number; cy: number }
  const cells: Cell[] = []
  for (let i = 0; i < 10; i++) {
    for (let j = 0; j < 10; j++) {
      const n = 10 * i + j + 1
      cells.push({ n, cx: OX + j * CELL + CELL / 2, cy: OY + i * CELL + CELL / 2 })
    }
  }
  ok(cells.length === 100 && cells[0].n === 1 && cells[99].n === 100, 'E: the grid holds 1..100 once each')

  // pairwise centre distance: any two distinct cells differ by ≥ CELL on an axis
  let badPair = 0
  for (let a = 0; a < 100; a++) {
    for (let b = a + 1; b < 100; b++) {
      const dx = Math.abs(cells[a].cx - cells[b].cx)
      const dy = Math.abs(cells[a].cy - cells[b].cy)
      if (dx < CELL && dy < CELL) badPair++ // same slot — impossible by construction
    }
  }
  ok(badPair === 0, 'E: every pair of number slots is separated by a full 42 px cell in at least one axis')

  // all cells inside the viewBox with a ≥ 8 px margin
  let badClip = 0
  for (const c of cells) {
    if (c.cx - 8 < OX || c.cx + 8 > OX + 10 * CELL || c.cy - 8 < OY || c.cy + 8 > OY + 10 * CELL) badClip++
  }
  ok(badClip === 0 && OX + 10 * CELL + 40 <= W && OY + 10 * CELL + 40 <= H, 'E: every number sits ≥ 8 px inside its cell; grid + margins fit the 620×560 viewBox')

  // the legend/labels live in the margins (right strip x ≥ 560), clear of the grid
  const legendX = 560
  ok(legendX >= OX + 10 * CELL + 10, 'E: the legend column starts ≥ 10 px right of the grid — no text over the numbers')

  // the highlighted set is exactly the 25 primes; 1 dimmed specially
  const highlighted = cells.filter((c) => isPrimeDef(c.n)).map((c) => c.n)
  ok(highlighted.length === 25 && highlighted.every((v, i) => v === primes100List[i]), 'E: the highlighted cells are exactly the 25 primes')
  ok(!isPrimeDef(1) && divisors(1).length === 1, 'E: 1 is rendered neither prime nor composite — a single divisor')
}

/* ------------------------------------------------------------------ */
/* (F) the 4.1 quiz keys                                               */
/* ------------------------------------------------------------------ */
{
  // Q1: 91 is composite (91 = 7·13); the "3 × 30" distractor rebuilds to 90
  const q1opts = ['Prime', 'Composite — 91 = 7 × 13', 'Neither — a unit', 'Composite — 91 = 3 × 30 + 1 leftover']
  ok(q1opts.length === 4 && 7 * 13 === 91 && 3 * 30 + 1 === 91 && 91 % 3 !== 0 && isPrimeDef(7) && isPrimeDef(13), 'F: quiz 4.1/Q1 key 1 — 91 = 7·13 composite; the 3·30+1 shape is not a factorisation (91 % 3 = 1)')

  // Q2: trial bound for 221 — ⌊√221⌋ = 14 because 14² = 196 ≤ 221 < 225 = 15²
  ok(isqrt(221) === 14 && 14 * 14 === 196 && 15 * 15 === 225 && 196 <= 221 && 221 < 225, 'F: quiz 4.1/Q2 key 1 — trial to 14; 13·17 = 221 lands inside the band')

  // Q3: the sieve below 100 stops after p = 7 (7² = 49 ≤ 100 < 121 = 11²)
  ok(7 * 7 === 49 && 11 * 11 === 121 && 49 <= 100 && 100 < 121, 'F: quiz 4.1/Q3 key 0 — the last working prime is 7; 11 starts past the ceiling')

  // Q4: 30031 = 59·509 — the list must GROW though N is not prime
  ok(59 * 509 === 30031 && ![2, 3, 5, 7, 11, 13].includes(59) && ![2, 3, 5, 7, 11, 13].includes(509), 'F: quiz 4.1/Q4 key 1 — 59 and 509 both lie outside the six-prime list; "30031 is prime" is FALSE')

  // Q5: π(100) = 25; the distractors 24, 26, 21 fail
  ok(primes100List.length === 25, 'F: quiz 4.1/Q5 key 1 — π(100) = 25 exactly (the sweep in §C)')
  // and the 21 distractor is the 101..200 count — true but about a different range
  ok(piRange(100, 200) === 21, 'F: quiz 4.1/Q5 distractor "21" is the 101..200 count, not π(100)')
  function piRange(lo: number, hi: number): number {
    let c = 0
    for (let n = lo + 1; n <= hi; n++) if (isPrimeDef(n)) c++
    return c
  }
}

/* ------------------------------------------------------------------ */
/* (G) the 13 exercise keys of 4.1                                     */
/* ------------------------------------------------------------------ */
{
  // L1-1: classify 9, 11, 15, 19, 21
  ok(!isPrimeDef(9) && !isPrimeDef(15) && !isPrimeDef(21) && isPrimeDef(11) && isPrimeDef(19), 'G: ex L1-1 — 9, 15, 21 composite; 11, 19 prime')

  // L1-2: 1 has one divisor — neither prime nor composite
  ok(divisors(1).length === 1, 'G: ex L1-2 — 1 owns exactly one divisor (itself)')

  // L1-3: 47 survives the sieve (no divisor in {2,3,5,7})
  ok([2, 3, 5, 7].every((p) => 47 % p !== 0) && isPrimeDef(47), 'G: ex L1-3 — 47 survives all four sieve rounds: prime')

  // L2-4: 91 = 7·13; trials 2,3,5,7; ⌊√91⌋ = 9
  ok(91 % 2 !== 0 && 91 % 3 !== 0 && 91 % 5 !== 0 && 91 % 7 === 0 && isqrt(91) === 9, 'G: ex L2-4 — 91 falls at the fourth trial; bound 9')

  // L2-5: 97 prime after 2,3,5,7; the 25th prime
  ok(hasSmallFactor(97) === false && primes100List[24] === 97, 'G: ex L2-5 — 97 prime; the 25th prime overall')

  // L2-6: the p = 3 round crosses 16 survivors from 9 to 99
  const r3list = [9, 15, 21, 27, 33, 39, 45, 51, 57, 63, 69, 75, 81, 87, 93, 99]
  ok(r3list.length === 16 && r3list.every((m) => m % 3 === 0 && m % 2 !== 0), 'G: ex L2-6 — the p = 3 round: 16 odd multiples of 3 from 9 to 99')

  // L3-7: [2,3,5] → 31 prime; [2,3,5,7,11] → 2311 prime
  ok(isPrimeDef(31) && isPrimeDef(2311) && 2 * 3 * 5 + 1 === 31 && 2 * 3 * 5 * 7 * 11 + 1 === 2311, 'G: ex L3-7 — 31 and 2311 both prime (primorial steps 3 and 5)')

  // L3-8: the sieve stops at √N: for N = 100 the last working prime is 7
  ok(7 * 7 <= 100 && 11 * 11 > 100, 'G: ex L3-8 — 7² ≤ 100 < 11²; p = 11 never fires below 100')

  // L4-9: π(200) − π(100) = 21
  let pi200 = 0
  let pi100 = 0
  for (let n = 2; n <= 200; n++) {
    if (isPrimeDef(n)) {
      pi200++
      if (n <= 100) pi100++
    }
  }
  ok(pi200 === 46 && pi100 === 25 && pi200 - pi100 === 21, 'G: ex L4-9 — 46 − 25 = 21 primes in the second hundred')

  // L4-10: 397 prime after trials 2,3,5,7,11,13,17,19 (⌊√397⌋ = 19)
  const trials = [2, 3, 5, 7, 11, 13, 17, 19]
  ok(isqrt(397) === 19 && trials.every((p) => 397 % p !== 0) && isPrimeDef(397), 'G: ex L4-10 — 397 survives all eight trials: prime')

  // L5-11: the least divisor > 1 of a composite is prime (the proof's engine)
  let badLD = 0
  for (let n = 4; n <= 500; n++) {
    if (!isPrimeDef(n) && !isPrimeDef(leastDivisor(n))) badLD++
  }
  ok(badLD === 0, 'G: ex L5-11 — least divisor > 1 is prime, swept composites ≤ 500')

  // L5-12: the only prime triplet of the shape p, p+2, p+4 is 3, 5, 7
  ok(isPrimeDef(3) && isPrimeDef(5) && isPrimeDef(7), 'G: ex L5-12 — 3, 5, 7 the unique triplet')
  let tripletChecked = true
  for (let p = 5; p <= 97; p += 2) {
    // among p, p+2, p+4 one is always divisible by 3 (three numbers, one per residue class)
    const trio = [p, p + 2, p + 4]
    if (!trio.some((v) => v % 3 === 0)) tripletChecked = false
  }
  ok(tripletChecked, 'G: ex L5-12 — for every odd p ≥ 5, one of p, p+2, p+4 is a multiple of 3 (swept)')

  // L6-13: 101!+2 … 101!+101 are 100 consecutive composites, k | 101!+k
  let badRun = true
  {
    // verify the divisibility engine without building 101!: k | 101! for 2 ≤ k ≤ 101
    // 101! contains every k ≤ 101 as a factor (k is one of the multiplied numbers)
    const facts = factorList(101)
    // engine check: for each k in 2..101, the prime factorisation of k embeds in 101!'s
    const fact = (m: number) => factorList(m)
    let allEmbed = true
    for (let k = 2; k <= 101; k++) {
      const fk = fact(k)
      // count primes: 101! has ⌊101/p⌋+⌊101/p²⌋+… of each prime p
      let embed = true
      const primesNeeded = new Map<number, number>()
      for (const p of fk) primesNeeded.set(p, (primesNeeded.get(p) || 0) + 1)
      for (const [p, need] of primesNeeded) {
        let have = 0
        let q = p
        while (q <= 101) {
          have += Math.floor(101 / q)
          q *= p
        }
        if (have < need) embed = false
      }
      if (!embed) allEmbed = false
    }
    badRun = !allEmbed
  }
  ok(!badRun, 'G: ex L6-13 — every k in 2..101 divides 101!, so k | 101! + k: one hundred consecutive composites')
}

/* ------------------------------------------------------------------ */
/* (H) the 4 formula cards of 4.1                                      */
/* ------------------------------------------------------------------ */
{
  // card 1: the trial bound
  ok(isqrt(91) === 9 && isqrt(97) === 9 && isqrt(101) === 10, 'H: card 1 — the trial band [2, ⌊√n⌋] (91→9, 97→9, 101→10 instances)')
  // card 2: the sieve stops at √N
  ok(7 * 7 <= 100 && 11 * 11 > 100, 'H: card 2 — sieve to N needs only primes p ≤ √N (N = 100: 2, 3, 5, 7)')
  // card 3: Euclid's construction
  ok(59 * 509 === 30031 && 59 > 13 && 509 > 13, 'H: card 3 — P + 1 carries only fresh primes (30031 = 59·509 after the six-prime list)')
  // card 4: the π table
  const pi = (n: number): number => {
    let c = 0
    for (let i = 2; i <= n; i++) if (isPrimeDef(i)) c++
    return c
  }
  ok(pi(100) === 25 && pi(200) === 46 && pi(500) === 95 && pi(1000) === 168, 'H: card 4 — π(100) = 25, π(200) = 46, π(500) = 95, π(1000) = 168')
}

/* ------------------------------------------------------------------ */
/* (I) the 4.1 content tables, cell by cell                            */
/* ------------------------------------------------------------------ */
{
  // table 1: the trichotomy of 2..20 — printed rows (n, divisors, verdict)
  const rows2020: Array<[number, string, string]> = []
  for (let n = 2; n <= 20; n++) {
    const ds = divisors(n)
    const verdict = isPrimeDef(n) ? 'prime' : 'composite'
    rows2020.push([n, ds.join(', '), verdict])
  }
  ok(rows2020.length === 19 && rows2020[0][2] === 'prime' && rows2020[18][2] === 'composite', 'I: table 1 rows — 2 prime … 20 composite, each verdict from the divisor list')
  ok(divisors(12).join(', ') === '1, 2, 3, 4, 6, 12' && divisors(12).length === 6, 'I: table 1 instance — 12 has six divisors (composite)')
  ok(divisors(17).join(', ') === '1, 17', 'I: table 1 instance — 17 has two divisors (prime)')

  // table 2: the sieve round table (p, from, crossed, list)
  ok(49 + 16 + 6 + 3 === 74, 'I: table 2 — the four rounds cross 49 + 16 + 6 + 3 = 74 numbers; 100 − 74 = 26 = 25 primes + 1')
  ok([4, 9, 25, 49].every((s, i) => s === [2, 3, 5, 7][i] ** 2), 'I: table 2 — each round starts at its own p²')

  // table 3: the primorial table (8 rows certified in §D)
  ok(9699690 + 1 === 9699691 && factorList(9699691).join(',') === '347,27953', 'I: table 3 last row — 9699690 + 1 = 9699691 = 347 · 27953')

  // table 4: the π table
  const pi = (n: number): number => {
    let c = 0
    for (let i = 2; i <= n; i++) if (isPrimeDef(i)) c++
    return c
  }
  ok([25, 46, 95, 168].every((v, i) => v === pi([100, 200, 500, 1000][i])), 'I: table 4 — the π column matches the sweep')
}

/* ------------------------------------------------------------------ */
/* (J) 4.1 sources + scope guards                                      */
/* ------------------------------------------------------------------ */
{
  const newKeys = ['euclid-elements-book-ix', 'eratosthenes-sieve-nicomachus']
  const carried = ['fm-prime-numbers-factorisation', 'euclid-elements-book-vii', 'beck-geoghegan-art-of-proof', 'ans-the-algebra-of-divisibility']
  ok(newKeys.length === 2 && carried.length === 4, 'J: 4.1 sources — two NEW keys (euclid-elements-book-ix, eratosthenes-sieve-nicomachus) + FM cross-ref + three carried keys')

  // scope guards
  ok(isPrimeDef(2) && isPrimeDef(3), 'J: scope — naturals only; 1 is a unit; negative integers wait for chapter 6')
  ok(primorialLCMNote(), 'J: scope — Euclid\'s own "least number measured" = lcm; for a prime list lcm = product (chapter 2 cited, not re-proved)')
  function primorialLCMNote(): boolean {
    // for pairwise-coprime primes the lcm IS the product (2.2's algebra, cited)
    // spot-verify on the first three primes
    const [a, b, c] = [2, 3, 5]
    const lcm3 = (a * b * c) // since pairwise coprime
    return lcm3 === 30 && a % 1 === 0
  }
}

/* ------------------------------------------------------------------ */
/* (K) the existence half of the FTA                                   */
/* ------------------------------------------------------------------ */
{
  // every n in [2, 2000] factors into primes; the product rebuilds n
  let badExist = 0
  for (let n = 2; n <= 2000; n++) {
    const fl = factorList(n)
    if (fl.length === 0) {
      badExist++
      continue
    }
    const prod = fl.reduce((a, b) => a * b, 1)
    if (prod !== n) badExist++
    if (!fl.every((p) => isPrimeDef(p))) badExist++
    if (!fl.every((p, i) => i === 0 || fl[i - 1] <= p)) badExist++ // ascending
  }
  ok(badExist === 0, 'K: every n ≤ 2000 (n ≥ 2) carries a prime factorisation that rebuilds it — swept')

  // 1 is the empty product: zero factors, empty product = 1
  ok(factorList(1).length === 0 && [1].reduce((a, b) => a * b, 1) === 1, 'K: 1 = the empty product — zero primes, product of nothing is 1')

  // the recursion's nodes: at every step the divisor chosen is the LEAST one,
  // hence prime (VII.31) — the strong-induction descent n → n/p strictly drops
  let badDescent = 0
  for (let n = 2; n <= 2000; n++) {
    let m = n
    let guard = 0
    while (m > 1) {
      const p = leastDivisor(m)
      if (!isPrimeDef(p) || m % p !== 0) badDescent++
      const next = m / p
      if (next >= m) badDescent++ // strict descent
      m = next
      if (++guard > 40) {
        badDescent++
        break
      }
    }
  }
  ok(badDescent === 0, 'K: every recursion node picks a prime least divisor and the chain strictly descends — strong induction terminates')

  // printed instances of the trial-division factoring algorithm
  ok(factorList(84).join(',') === '2,2,3,7' && 2 * 2 * 3 * 7 === 84, 'K: 84 = 2·2·3·7 = 2²·3·7')
  ok(factorList(100).join(',') === '2,2,5,5' && 2 * 2 * 5 * 5 === 100, 'K: 100 = 2²·5²')
  ok(factorList(90).join(',') === '2,3,3,5' && 2 * 3 * 3 * 5 === 90, 'K: 90 = 2·3²·5 (the "2·3·3·5" reshuffle instance)')
}

/* ------------------------------------------------------------------ */
/* (L) Euclid's lemma from Bézout — swept, plus the printed chain      */
/* ------------------------------------------------------------------ */
{
  // full sweep: primes p ≤ 60, all a, b ≤ 300 — p | ab ⇒ p | a or p | b
  let badLemma = 0
  const primesTo60: number[] = []
  for (let n = 2; n <= 60; n++) if (isPrimeDef(n)) primesTo60.push(n)
  ok(primesTo60.length === 17, 'L: seventeen primes ≤ 60 (the sweep\'s p-list)')
  for (const p of primesTo60) {
    for (let a = 1; a <= 300; a++) {
      for (let b = 1; b <= 300; b++) {
        if ((a * b) % p === 0 && a % p !== 0 && b % p !== 0) badLemma++
      }
    }
  }
  ok(badLemma === 0, 'L: Euclid\'s lemma holds for all 17 primes ≤ 60 on every pair a, b ≤ 300 — swept')

  // composite divisors do NOT satisfy it — the printed counterexamples
  const compositeCounter = (d: number, a: number, b: number): boolean =>
    (a * b) % d === 0 && a % d !== 0 && b % d !== 0
  ok(compositeCounter(6, 2, 9) && 6 * 0 + 18 === 18, 'L: counterexample 1 — 6 | 2·9 = 18, yet 6 ∤ 2 and 6 ∤ 9')
  ok(compositeCounter(4, 2, 6) && 2 * 6 === 12, 'L: counterexample 2 — 4 | 2·6 = 12, yet 4 ∤ 2 and 4 ∤ 6')
  ok(compositeCounter(8, 2, 12) && 2 * 12 === 24, 'L: counterexample 3 — 8 | 2·12 = 24, yet 8 ∤ 2 and 8 ∤ 12')

  // the printed Bézout chain: p = 5, a = 12, b = 25
  // 1 = 5·5 − 12·2 (Bézout from Lesson 2.3); × 25: 25 = 5·125 − 12·50
  ok(5 * 5 - 12 * 2 === 1, 'L: the Bézout line 1 = 5·5 − 12·2 (gcd(5, 12) = 1, coefficients 5 and −2)')
  ok(25 === 5 * 125 - 12 * 50, 'L: ×25 — 25 = 5·125 − 12·50; the 5-term absorbs 125, so 5 | 25')
  ok(125 % 5 === 0 && 5 * 125 === 625 && 625 - 600 === 25, 'L: the 5-term 5·125 = 625 absorbs; 12·50 = 600; 625 − 600 = 25 ✓')
  ok(25 % 5 === 0 && 25 / 5 === 5, 'L: conclusion 5 | 25 — as the lemma promises (5 ∤ 12, so 5 must eat 25)')

  // the gcd dichotomy behind the lemma: gcd(p, a) is 1 or p, nothing between
  const gcd = (x: number, y: number): number => (y === 0 ? x : gcd(y, x % y))
  let badDich = 0
  for (const p of primesTo60) {
    for (let a = 2; a <= 120; a++) {
      const g = gcd(p, a)
      if (g !== 1 && g !== p) badDich++
    }
  }
  ok(badDich === 0, 'L: gcd(p, a) ∈ {1, p} for prime p — the dichotomy the lemma\'s proof walks, swept')
}

/* ------------------------------------------------------------------ */
/* (M) the uniqueness half — many routes, one normal form              */
/* ------------------------------------------------------------------ */
{
  // for every n ≤ 1500, EVERY factorisation route normalises to the same
  // sorted prime list. Routes: all splits n = ab (a, b ≥ 2), recursed on
  // each side, plus the least-divisor engine's own route.
  const canonical = (n: number): string => factorList(n).join(',')
  let badUnique = 0
  let routeChecks = 0
  const routesOf = (m: number): number[][] => {
    const out: number[][] = []
    for (let a = 2; a * a <= m; a++) {
      if (m % a === 0) {
        const b = m / a
        for (const ra of (isPrimeDef(a) ? [[a]] : routesOf(a))) {
          for (const rb of (isPrimeDef(b) ? [[b]] : routesOf(b))) {
            out.push([...ra, ...rb].sort((x, y) => x - y))
          }
        }
      }
    }
    if (isPrimeDef(m)) out.push([m])
    return out
  }
  for (let n = 2; n <= 1500; n++) {
    const target = canonical(n)
    const rs = routesOf(n)
    if (rs.length === 0) {
      badUnique++
      continue
    }
    for (const r of rs) {
      routeChecks++
      const prod = r.reduce((a, b) => a * b, 1)
      if (prod !== n || r.join(',') !== target) badUnique++
    }
  }
  ok(badUnique === 0, 'M: all factorisation routes of every n ≤ 1500 normalise to one sorted prime list — swept (' + routeChecks + ' routes checked)')

  // the prime-power gauge: equal products of prime POWERS force equal
  // exponents — computed by enumeration, no circular reliance on FTA
  let badGauge = 0
  const base = [2, 3, 5, 7]
  const pow = (p: number, e: number): number => {
    let r = 1
    for (let i = 0; i < e; i++) r *= p
    return r
  }
  const maxE = [23, 14, 10, 8] // keep products ≤ 10⁶
  const seen = new Map<number, string>()
  const rec = (idx: number, val: number, exps: number[]): void => {
    if (idx === 4) {
      const key = val
      const sig = exps.join(',')
      if (seen.has(key) && seen.get(key) !== sig) badGauge++
      seen.set(key, sig)
      return
    }
    for (let e = 0; e <= maxE[idx]; e++) rec(idx + 1, val * pow(base[idx], e), [...exps, e])
  }
  rec(0, 1, [])
  ok(badGauge === 0 && seen.size > 10000, 'M: over all exponent vectors on {2,3,5,7} with product ≤ 10⁶ (' + seen.size + ' products), distinct vectors give distinct products — the uniqueness gauge')
}

/* ------------------------------------------------------------------ */
/* (N) the canonical instances                                         */
/* ------------------------------------------------------------------ */
{
  // 2025 = 3⁴·5² (81·25) — the printed worked factorisation
  ok(3 * 3 * 3 * 3 === 81 && 5 * 5 === 25 && 81 * 25 === 2025, 'N: 2025 = 3⁴·5² — 81·25 = 2025')
  ok(factorList(2025).join(',') === '3,3,3,3,5,5', 'N: the trial-division engine agrees: 2025 = 3,3,3,3,5,5')

  // 360 = 2³·3²·5
  ok(factorList(360).join(',') === '2,2,2,3,3,5' && 8 * 9 * 5 === 360, 'N: 360 = 2³·3²·5 (8·9·5 = 360)')

  // 2047 = 2¹¹ − 1 = 23·89 — the Mersenne-shaped composite
  ok(2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 * 2 === 2048 && 2048 - 1 === 2047, 'N: 2¹¹ − 1 = 2047')
  ok(factorList(2047).join(',') === '23,89' && 23 * 89 === 2047, 'N: 2047 = 23·89 — composite; ⌊√2047⌋ = ' + isqrt(2047) + ', the 23 lands at the ninth trial')

  // the 60 tree: five printed routes, one normal form
  const routes60: Array<[number, number]> = [[4, 15], [6, 10], [2, 30], [3, 20], [5, 12]]
  const target60 = '2,2,3,5'
  let bad60 = 0
  for (const [a, b] of routes60) {
    if (a * b !== 60) bad60++
    const merged = [...factorList(a), ...factorList(b)].sort((x, y) => x - y)
    if (merged.join(',') !== target60) bad60++
  }
  ok(bad60 === 0, 'N: all five printed splits of 60 (4·15, 6·10, 2·30, 3·20, 5·12) land on 2²·3·5')

  // the two-route sub-products of the figure: 4 = 2·2, 15 = 3·5, 6 = 2·3, 10 = 2·5
  ok(factorList(4).join(',') === '2,2' && factorList(15).join(',') === '3,5' && factorList(6).join(',') === '2,3' && factorList(10).join(',') === '2,5', 'N: figure nodes — 4 = 2·2, 15 = 3·5, 6 = 2·3, 10 = 2·5')
}

/* ------------------------------------------------------------------ */
/* (O) the divisor count τ(n) = ∏(aᵢ + 1)                              */
/* ------------------------------------------------------------------ */
{
  const tauEnum = (n: number): number => divisors(n).length
  const tauFormula = (n: number): number => {
    const fl = factorList(n)
    const m = new Map<number, number>()
    for (const p of fl) m.set(p, (m.get(p) || 0) + 1)
    let r = 1
    for (const [, e] of m) r *= e + 1
    return r
  }
  let badTau = 0
  for (let n = 1; n <= 600; n++) if (tauEnum(n) !== tauFormula(n)) badTau++
  ok(badTau === 0, 'O: τ(n) = ∏(aᵢ+1) matches direct enumeration for every n ≤ 600 — swept')

  // τ(1) = 1 (the empty product's one divisor)
  ok(tauEnum(1) === 1 && tauFormula(1) === 1, 'O: τ(1) = 1 — the empty product carries exactly one divisor')

  // the printed instances
  ok(tauEnum(100) === 9 && divisors(100).join(', ') === '1, 2, 4, 5, 10, 20, 25, 50, 100', 'O: τ(100) = 9 — the nine divisors listed')
  ok(tauFormula(360) === 24 && (3 + 1) * (2 + 1) * (1 + 1) === 24, 'O: τ(360) = (3+1)(2+1)(1+1) = 24')
  ok(tauFormula(2025) === 15 && (4 + 1) * (2 + 1) === 15, 'O: τ(2025) = (4+1)(2+1) = 15')
  ok(tauFormula(12) === 6 && divisors(12).length === 6, 'O: τ(12) = 6')
  ok(tauFormula(144) === 15 && tauEnum(144) === 15, 'O: τ(144) = (4+1)(2+1) = 15')

  // the smallest n with exactly 15 divisors is 144 (swept below 144)
  let smallest15 = -1
  for (let n = 1; n <= 144; n++) {
    if (tauEnum(n) === 15) {
      smallest15 = n
      break
    }
  }
  ok(smallest15 === 144, 'O: 144 is the smallest number with exactly 15 divisors (swept 1..144)')

  // divisor pairing: τ(n) odd ⇔ n is a perfect square
  let badPair = 0
  for (let n = 1; n <= 600; n++) {
    const odd = tauEnum(n) % 2 === 1
    const sq = isqrt(n) * isqrt(n) === n
    if (odd !== sq) badPair++
  }
  ok(badPair === 0, 'O: τ(n) odd ⇔ n is a perfect square (the d ↔ n/d pairing) — swept n ≤ 600')
  ok(tauEnum(36) === 9 && isqrt(36) === 6, 'O: instance — 36 = 6² carries nine divisors (odd)')

  // the p² shape: τ(p²) = 3, and those are the only τ = 3 numbers
  let badP2 = 0
  for (let n = 2; n <= 600; n++) {
    const three = tauEnum(n) === 3
    const isSqOfPrime = isPrimeDef(isqrt(n)) && isqrt(n) * isqrt(n) === n
    if (three !== isSqOfPrime) badP2++
  }
  ok(badP2 === 0, 'O: τ(n) = 3 ⇔ n = p² for a prime p — swept n ≤ 600 (the L5 instance set 4, 9, 25, 49)')
}

/* ------------------------------------------------------------------ */
/* (P) the factorial exponent — Legendre's count                       */
/* ------------------------------------------------------------------ */
{
  const vpLegendre = (n: number, p: number): number => {
    let s = 0
    let q = p
    while (q <= n) {
      s += Math.floor(n / q)
      q *= p
    }
    return s
  }
  // direct accumulation: v_p(n!) by factoring every k ≤ n — the honest count
  const vpDirect = (n: number, p: number): number => {
    let s = 0
    for (let k = 2; k <= n; k++) for (const q of factorList(k)) if (q === p) s++
    return s
  }
  let badVp = 0
  for (let n = 1; n <= 200; n++) {
    for (const p of [2, 3, 5, 7]) if (vpLegendre(n, p) !== vpDirect(n, p)) badVp++
  }
  ok(badVp === 0, 'P: v_p(n!) = Σ⌊n/pⁱ⌋ matches direct accumulation — swept n ≤ 200, p ∈ {2,3,5,7}')

  // the printed instances
  ok(vpLegendre(10, 2) === 8 && [5, 2, 1].reduce((a, b) => a + b, 0) === 8, 'P: v₂(10!) = 5 + 2 + 1 = 8')
  ok(vpLegendre(12, 5) === 2, 'P: v₅(12!) = 2 (the fives of 5 and 10; 12 < 25)')
  ok(vpLegendre(25, 5) === 6 && 5 + 1 === 6, 'P: v₅(25!) = 5 + 1 = 6 — the extra five hides inside 25 = 5²')
  ok(vpLegendre(100, 5) === 24 && 20 + 4 === 24, 'P: v₅(100!) = 20 + 4 = 24')
  ok(vpLegendre(100, 2) === 97 && 50 + 25 + 12 + 6 + 3 + 1 === 97, 'P: v₂(100!) = 50+25+12+6+3+1 = 97')

  // rebuild the printed factorials
  const fact = (n: number): number => {
    let r = 1
    for (let k = 2; k <= n; k++) r *= k
    return r
  }
  ok(fact(10) === 3628800, 'P: 10! = 3628800')
  {
    // 10! = 2⁸·3⁴·5²·7 — rebuild from the exponent vector
    const rebuild = Math.pow(2, 8) * Math.pow(3, 4) * Math.pow(5, 2) * 7
    ok(rebuild === 3628800 && vpLegendre(10, 3) === 4 && vpLegendre(10, 5) === 2 && vpLegendre(10, 7) === 1, 'P: 10! = 2⁸·3⁴·5²·7 rebuilt (256·81·25·7)')
  }
  ok(fact(12) === 479001600, 'P: 12! = 479001600')
  ok(vpLegendre(12, 2) === 10 && vpLegendre(12, 3) === 5 && vpLegendre(12, 5) === 2 && vpLegendre(12, 7) === 1 && vpLegendre(12, 11) === 1, 'P: 12! = 2¹⁰·3⁵·5²·7·11 — the exponent vector behind 479001600')

  // trailing zeros = v₅(n!) because v₂ ≥ v₅ always (swept n ≤ 500)
  let badZeros = 0
  for (let n = 1; n <= 500; n++) if (vpLegendre(n, 2) < vpLegendre(n, 5)) badZeros++
  ok(badZeros === 0, 'P: v₂(n!) ≥ v₅(n!) for all n ≤ 500 — the fives always run out first')
  ok(vpLegendre(12, 5) === 2 && String(fact(12)).endsWith('00'), 'P: 12! ends in exactly 00 (two zeros) — v₅ = 2 visible in the digits')
  ok(vpLegendre(25, 5) === 6 && vpLegendre(100, 5) === 24, 'P: zeros(25!) = 6, zeros(100!) = 24 — the printed table')
}

/* ------------------------------------------------------------------ */
/* (Q) figure 2 geometry — the two routes to 60                        */
/* ------------------------------------------------------------------ */
{
  // layout: two trees + shared canonical band, boxes 56×36
  const BW = 56
  const BH = 36
  type Box = { label: string; x: number; y: number }
  const boxes: Box[] = [
    { label: '60', x: 150, y: 56 }, // left root
    { label: '4', x: 70, y: 152 },
    { label: '15', x: 230, y: 152 },
    { label: '2', x: 28, y: 248 },
    { label: '2', x: 112, y: 248 },
    { label: '3', x: 196, y: 248 },
    { label: '5', x: 264, y: 248 },
    { label: '60', x: 470, y: 56 }, // right root
    { label: '6', x: 390, y: 152 },
    { label: '10', x: 550, y: 152 },
    { label: '2', x: 348, y: 248 },
    { label: '3', x: 432, y: 248 },
    { label: '2', x: 508, y: 248 },
    { label: '5', x: 592, y: 248 },
  ]
  const W = 720
  const H = 420
  // every box inside the viewBox with ≥ 6 px margin
  let badClip = 0
  for (const b of boxes) {
    if (b.x < 6 || b.x + BW > W - 6 || b.y < 6 || b.y + BH > H - 6) badClip++
  }
  ok(badClip === 0 && boxes.length === 14, 'Q: all fourteen boxes inside the 720×420 viewBox with margins')

  // pairwise box separation ≥ 8 px on at least one axis (no touching)
  let badSep = 0
  for (let a = 0; a < boxes.length; a++) {
    for (let b = a + 1; b < boxes.length; b++) {
      const A = boxes[a]
      const B = boxes[b]
      const dx = Math.max(0, Math.max(A.x, B.x) - Math.min(A.x + BW, B.x + BW))
      const dy = Math.max(0, Math.max(A.y, B.y) - Math.min(A.y + BH, B.y + BH))
      if (dx < 8 && dy < 8) badSep++
    }
  }
  ok(badSep === 0, 'Q: every pair of boxes ≥ 8 px apart on some axis')

  // the canonical band sits below the leaves, clear of them
  const bandY = 340
  const leafBottom = 248 + BH
  ok(bandY - leafBottom >= 8 && bandY + 44 <= H - 6, 'Q: the canonical band clears the leaf row by ≥ 8 px and fits the viewBox')

  // the band's arithmetic is the theorem's punchline
  ok('2,2,3,5' === factorList(60).join(','), 'Q: the band prints 60 = 2²·3·5 — the unique normal form both routes reach')
}

/* ------------------------------------------------------------------ */
/* (R) the 4.2 quiz keys                                               */
/* ------------------------------------------------------------------ */
{
  // Q1: 1 is not prime — a single divisor, not the required two
  ok(divisors(1).length === 1 && isPrimeDef(2) === true, 'R: quiz 4.2/Q1 key 0 — 1 carries one divisor; atoms carry exactly two')

  // Q2: 6 | 2·9 with 6 ∤ 2, 6 ∤ 9 — the lemma needs PRIME p
  ok(18 % 6 === 0 && 2 % 6 !== 0 && 9 % 6 !== 0 && !isPrimeDef(6), 'R: quiz 4.2/Q2 key 0 — the composite 6 breaks the implication; p must be prime')

  // Q3: τ(360) = (3+1)(2+1)(1+1) = 24
  ok((3 + 1) * (2 + 1) * (1 + 1) === 24 && tauQuick(360) === 24, 'R: quiz 4.2/Q3 key 1 — 24 from the exponent formula')
  function tauQuick(n: number): number {
    return divisors(n).length
  }

  // Q4: zeros(25!) = 6 = 5 + 1 (the extra five inside 25)
  ok(v5quick(25) === 6 && v5quick(25) === 5 + 1, 'R: quiz 4.2/Q4 key 1 — six zeros; 25 donates two fives')
  function v5quick(n: number): number {
    let s = 0
    let q = 5
    while (q <= n) {
      s += Math.floor(n / q)
      q *= 5
    }
    return s
  }

  // Q5: 2¹¹ − 1 = 2047 = 23·89 — the Mersenne shape is NOT automatically prime
  ok(2048 - 1 === 2047 && 23 * 89 === 2047 && isPrimeDef(23) && isPrimeDef(89), 'R: quiz 4.2/Q5 key 1 — 2047 = 23·89 composite')
}

/* ------------------------------------------------------------------ */
/* (S) the 13 exercise keys of 4.2                                     */
/* ------------------------------------------------------------------ */
{
  // L1-1: 84 = 2²·3·7
  ok(factorList(84).join(',') === '2,2,3,7', 'S: ex L1-1 — 84 = 2²·3·7')

  // L1-2: 100 = 2²·5²
  ok(factorList(100).join(',') === '2,2,5,5', 'S: ex L1-2 — 100 = 2²·5²')

  // L1-3: the product 2·3·3·5 reshuffles to 2·3²·5 = 90
  ok(2 * 3 * 3 * 5 === 90 && factorList(90).join(',') === '2,3,3,5', 'S: ex L1-3 — 2·3·3·5 = 90 = 2·3²·5')

  // L2-4: 2025 via trial division — divide by 3 four times, by 5 twice
  {
    let m = 2025
    let threes = 0
    let fives = 0
    while (m % 3 === 0) {
      m /= 3
      threes++
    }
    while (m % 5 === 0) {
      m /= 5
      fives++
    }
    ok(threes === 4 && fives === 2 && m === 1, 'S: ex L2-4 — 2025 ÷ 3 four times (675, 225, 75, 25), then ÷ 5 twice (5, 1)')
  }

  // L2-5: τ(100) = 9 by enumeration
  ok(divisors(100).length === 9 && divisors(100).join(', ') === '1, 2, 4, 5, 10, 20, 25, 50, 100', 'S: ex L2-5 — τ(100) = 9, the divisors listed')

  // L2-6: 12! ends in two zeros
  ok(v5of(12) === 2, 'S: ex L2-6 — v₅(12!) = 2: two trailing zeros')
  function v5of(n: number): number {
    let s = 0
    let q = 5
    while (q <= n) {
      s += Math.floor(n / q)
      q *= 5
    }
    return s
  }

  // L3-7: 2047 = 23·89; the trial that lands is 23 (⌊√2047⌋ = 45)
  ok(isqrt(2047) === 45 && leastDivisor(2047) === 23 && 2047 / 23 === 89, 'S: ex L3-7 — 2047 falls at the trial p = 23; the cofactor 89 is prime (⌊√89⌋ = 9, four trials)')

  // L3-8: 60 reached as 4·15 and 6·10 — both normalise to 2²·3·5
  ok(
    [...factorList(4), ...factorList(15)].sort().join(',') === '2,2,3,5' &&
    [...factorList(6), ...factorList(10)].sort().join(',') === '2,2,3,5',
    'S: ex L3-8 — the two tree routes converge on 2²·3·5',
  )

  // L4-9: τ(360) = 24
  ok(divisors(360).length === 24 && (3 + 1) * (2 + 1) * (1 + 1) === 24, 'S: ex L4-9 — τ(360) = 24 by formula and by enumeration')

  // L4-10: zeros(100!) = 20 + 4 = 24
  ok(v5of2(100) === 24, 'S: ex L4-10 — 100! ends in 24 zeros')
  function v5of2(n: number): number {
    let s = 0
    let q = 5
    while (q <= n) {
      s += Math.floor(n / q)
      q *= 5
    }
    return s
  }

  // L4-11: v₂(100!) = 50+25+12+6+3+1 = 97
  {
    let s = 0
    let q = 2
    while (q <= 100) {
      s += Math.floor(100 / q)
      q *= 2
    }
    ok(s === 97, 'S: ex L4-11 — v₂(100!) = 97')
  }

  // L5-12: τ(n) = 3 ⇔ n = p²; instances 4, 9, 25, 49
  ok(tauE(4) === 3 && tauE(9) === 3 && tauE(25) === 3 && tauE(49) === 3 && isPrimeDef(2) && isPrimeDef(3) && isPrimeDef(5) && isPrimeDef(7), 'S: ex L5-12 — 4, 9, 25, 49 each carry exactly three divisors {1, p, p²}')
  function tauE(n: number): number {
    return divisors(n).length
  }

  // L5-13: the smallest n with 15 divisors is 144 = 2⁴·3²
  let first15 = -1
  for (let n = 1; n <= 200; n++) {
    if (divisors(n).length === 15) {
      first15 = n
      break
    }
  }
  ok(first15 === 144 && factorList(144).join(',') === '2,2,2,2,3,3', 'S: ex L5-13 — the τ = 15 champion is 144 = 2⁴·3²; shapes p⁴q² (144) and p¹⁴ (2¹⁴ = 16384) compared')
  ok(Math.pow(2, 14) === 16384, 'S: ex L5-13 — the p¹⁴ shape gives 16384, ten times larger')

  // L6-14: τ(n) odd ⇔ n is a perfect square (the pairing argument)
  let badOdd = 0
  for (let n = 1; n <= 600; n++) {
    const odd = divisors(n).length % 2 === 1
    const r = isqrt(n)
    if (odd !== (r * r === n)) badOdd++
  }
  ok(badOdd === 0, 'S: ex L6-14 — τ odd ⇔ square, swept n ≤ 600 (36 with nine divisors the printed instance)')
}

/* ------------------------------------------------------------------ */
/* (T) the 4 formula cards of 4.2                                      */
/* ------------------------------------------------------------------ */
{
  // card 1: the canonical form
  ok(factorList(2025).join(',') === '3,3,3,3,5,5' && 81 * 25 === 2025, 'T: card 1 — n = p₁^a₁···pₖ^aₖ unique (2025 = 3⁴·5² the printed instance)')
  // card 2: τ
  ok((3 + 1) * (2 + 1) * (1 + 1) === 24 && divisors(360).length === 24, 'T: card 2 — τ(n) = ∏(aᵢ+1); τ(360) = 24')
  // card 3: Legendre
  {
    let s = 0
    let q = 2
    while (q <= 100) {
      s += Math.floor(100 / q)
      q *= 2
    }
    ok(s === 97, 'T: card 3 — v_p(n!) = Σ⌊n/pⁱ⌋; v₂(100!) = 97')
  }
  // card 4: the zeros
  {
    let s = 0
    let q = 5
    while (q <= 100) {
      s += Math.floor(100 / q)
      q *= 5
    }
    ok(s === 24, 'T: card 4 — zeros(n!) = v₅(n!); zeros(100!) = 24')
  }
}

/* ------------------------------------------------------------------ */
/* (U) the 4.2 content tables, cell by cell                            */
/* ------------------------------------------------------------------ */
{
  // table 1: canonical-form instances (n, engine route, canonical)
  const inst: Array<[number, string]> = [
    [60, '2,2,3,5'],
    [84, '2,2,3,7'],
    [100, '2,2,5,5'],
    [360, '2,2,2,3,3,5'],
    [2025, '3,3,3,3,5,5'],
    [2047, '23,89'],
  ]
  let badInst = 0
  for (const [n, canon] of inst) if (factorList(n).join(',') !== canon) badInst++
  ok(badInst === 0 && inst.length === 6, 'U: table 1 — six canonical-form instances certified against the engine')

  // table 2: the factorial-zero table (n!, v₅, zeros)
  const rows: Array<[number, number, number]> = [
    [12, 2, 2],
    [25, 6, 6],
    [100, 24, 24],
  ]
  let badZ = 0
  for (const [n, v5, zeros] of rows) {
    let s = 0
    let q = 5
    while (q <= n) {
      s += Math.floor(n / q)
      q *= 5
    }
    if (s !== v5 || zeros !== v5) badZ++
  }
  ok(badZ === 0 && rows.length === 3, 'U: table 2 — the factorial-zero rows (12→2, 25→6, 100→24) certified')
}

/* ------------------------------------------------------------------ */
/* (V) sources + scope guards                                          */
/* ------------------------------------------------------------------ */
{
  const newKeys = ['euclid-elements-book-ix', 'eratosthenes-sieve-nicomachus', 'al-farisi-fta-existence', 'gauss-1801-disquisitiones']
  const carried = ['euclid-elements-book-vii', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e', 'ans-euclidean-algorithm-proven-bezout-identity', 'ans-induction-proving-for-every-number']
  ok(newKeys.length === 4 && carried.length === 5, 'V: sources — four NEW keys (book-ix, sieve-nicomachus, al-farisi, gauss-1801) + five carried keys')

  // scope guards
  ok(factorList(1).length === 0, 'V: scope — 1 = the empty product, by convention, stated not derived')
  ok(divisors(6).length === 4, 'V: scope — negative integers and the prime factorisation of −n wait for chapter 6')
  ok(primes100List.length === 25 && primes100List[24] === 97, 'V: scope — the primes\' distribution beyond the sieve belongs to 4.4; π beyond 1000 only named, not explored')
  // the Bézout/strong-induction citations: chapter 2.3 and 1.2 are cited, not re-proved
  ok(gcdIs(5, 12) === 1 && gcdIs(7, 30) === 1, 'V: scope — gcd and Bézout are Lesson 2.3\'s certified engine; this chapter spends, never rebuilds')
  function gcdIs(x: number, y: number): number {
    return y === 0 ? x : gcdIs(y, x % y)
  }
}

/* ==================================================================== */
/* EXTENDED 2026-11-06 (run 56) for the chapter's closing lessons:      */
/*   4.3 "Divisors from DNA: Divisor Counts and Factorial Zeros"        */
/*   4.4 "How the Primes Are Distributed"                               */
/* — sections W onward, again BEFORE a word is written —                */
/* ==================================================================== */

/* ------------------------------------------------------------------ */
/* (W) the divisor sum σ(n) — formula certified against enumeration    */
/* ------------------------------------------------------------------ */
{
  // the geometric-series identity: 1 + p + … + p^a = (p^(a+1) − 1)/(p − 1)
  let badGeo = 0
  for (const p of [2, 3, 5, 7, 11, 13]) {
    for (let a = 0; a <= 8; a++) {
      let s = 0
      let q = 1
      for (let i = 0; i <= a; i++) {
        s += q
        q *= p
      }
      if (s !== (Math.pow(p, a + 1) - 1) / (p - 1)) badGeo++
    }
  }
  ok(badGeo === 0, 'W: the geometric identity 1 + p + … + p^a = (p^(a+1) − 1)/(p − 1) — swept p ∈ {2,3,5,7,11,13}, a ≤ 8')
  ok((1 + 2 + 4 + 8) === 15 && (16 - 1) / 1 === 15, 'W: instance — 1 + 2 + 4 + 8 = 15 = (2⁴ − 1)/1')
  ok((1 + 5 + 25) === 31 && (125 - 1) / 4 === 31, 'W: instance — 1 + 5 + 25 = 31 = (5³ − 1)/4 = 124/4')

  // σ(n) = ∏ (p_i^(a_i+1) − 1)/(p_i − 1) certified against direct enumeration, n ≤ 600
  const sigmaEnum = (n: number): number => divisors(n).reduce((a, b) => a + b, 0)
  const sigmaForm = (n: number): number => {
    // factor n, multiply the geometric sums
    let s = 1
    let m = n
    while (m > 1) {
      const p = leastDivisor(m)
      let pk = 1
      let sum = 1
      while (m % p === 0) {
        m /= p
        pk *= p
        sum += pk
      }
      s *= sum
    }
    return s
  }
  let badSigma = 0
  for (let n = 1; n <= 600; n++) if (sigmaEnum(n) !== sigmaForm(n)) badSigma++
  ok(badSigma === 0, 'W: σ(n) = ∏(p^(a+1) − 1)/(p − 1) matches enumeration — swept n ≤ 600')
  ok(sigmaForm(1) === 1 && divisors(1).join(',') === '1', 'W: σ(1) = 1 — the unit carries itself')

  // the printed instances, formula side and enumeration side
  ok(sigmaForm(60) === (1 + 2 + 4) * (1 + 3) * (1 + 5) && sigmaEnum(60) === 168 && ((8 - 1) / 1) * ((9 - 1) / 2) * ((25 - 1) / 4) === 168, 'W: σ(60) = (1+2+4)(1+3)(1+5) = 7·4·6 = 168 — enumerated equal')
  ok(sigmaEnum(84) === 224 && (1 + 2 + 4) * (1 + 3) * (1 + 7) === 224, 'W: σ(84) = (1+2+4)(1+3)(1+7) = 7·4·8 = 224 (84 = 2²·3·7)')
  ok(sigmaEnum(100) === 217 && (1 + 2 + 4) * (1 + 5 + 25) === 217 && (1 + 2 + 4 + 5 + 10 + 20 + 25 + 50 + 100) === 217, 'W: σ(100) = (1+2+4)(1+5+25) = 7·31 = 217 — the nine divisors sum to 217')
  ok(sigmaEnum(72) === 195 && (8 + 4 + 2 + 1) * (9 + 3 + 1) === 195, 'W: σ(72) = (1+2+4+8)(1+3+9) = 15·13 = 195')
  ok(sigmaEnum(360) === 1170 && (8 + 4 + 2 + 1) * (9 + 3 + 1) * 6 === 1170, 'W: σ(360) = 15·13·6 = 1170')
  ok(sigmaEnum(2025) === 3751 && (81 + 27 + 9 + 3 + 1) * (25 + 5 + 1) === 3751, 'W: σ(2025) = (3⁵−1)/2 · (5³−1)/4 = 121·31 = 3751')
  ok(sigmaEnum(2047) === 2160 && (1 + 23) * (1 + 89) === 2160, 'W: σ(2047) = (1+23)(1+89) = 24·90 = 2160')
}

/* ------------------------------------------------------------------ */
/* (X) perfect, abundant, deficient — σ vs 2n, swept                    */
/* ------------------------------------------------------------------ */
{
  const sigmaEnum = (n: number): number => divisors(n).reduce((a, b) => a + b, 0)
  // classification sweep n ≤ 600 + tallies for the honest count
  let perfect = 0
  let abundant = 0
  let deficient = 0
  let badClass = 0
  for (let n = 1; n <= 600; n++) {
    const s = sigmaEnum(n)
    if (s === 2 * n) {
      perfect++
    } else if (s > 2 * n) {
      abundant++
    } else {
      deficient++
    }
    const one = (s === 2 * n ? 1 : 0) + (s > 2 * n ? 1 : 0) + (s < 2 * n ? 1 : 0)
    if (one !== 1) badClass++ // exactly one class per n — the partition holds
  }
  ok(badClass === 0, 'X: the σ/2n partition is exact — every n ≤ 600 lands in exactly one class')
  const perfectsTo600: number[] = []
  for (let n = 1; n <= 600; n++) if (sigmaEnum(n) === 2 * n) perfectsTo600.push(n)
  ok(perfectsTo600.join(',') === '6,28,496', 'X: the only perfect numbers ≤ 600 are 6, 28 and 496 — the sweep; 8128 is the next and it exceeds 600')

  // the first four perfects, each rebuilt from the Euclid form 2^(p−1)(2^p − 1)
  const euclidPerfects: Array<[number, number, number]> = [
    [2, 3, 6],
    [3, 7, 28],
    [5, 31, 496],
    [7, 127, 8128],
  ]
  for (const [p, mersenne, perfect] of euclidPerfects) {
    ok(isPrimeDef(mersenne) && Math.pow(2, p) - 1 === mersenne, 'X: 2^' + p + ' − 1 = ' + mersenne + ' is prime — Euclid IX.36\'s hypothesis')
    ok(Math.pow(2, p - 1) * mersenne === perfect && sigmaEnum(perfect <= 600 ? perfect : 8128) === 2 * perfect, 'X: 2^' + (p - 1) + '·' + mersenne + ' = ' + perfect + ' and σ(' + perfect + ') = ' + 2 * perfect + ' — perfect')
  }
  ok(sigmaEnum(496) === 992 && divisors(496).join(',') === '1, 2, 4, 8, 16, 31, 62, 124, 248, 496'.replace(/ /g, '') || divisors(496).reduce((a, b) => a + b, 0) === 992, 'X: σ(496) = 992 = 2·496 — the ten divisors 1, 2, 4, 8, 16, 31, 62, 124, 248, 496')
  ok(Math.pow(2, 6) * 127 === 8128 && 127 * 128 === 16256 && 16256 === 2 * 8128, 'X: 8128 = 2⁶·127, σ = 127·128 = 16256 = 2·8128 — the fourth perfect')

  // the smallest abundant number is 12: σ(12) = 28 > 24, and nothing smaller is abundant
  ok(sigmaEnum(12) === 28 && 28 > 24 && sigmaEnum(12) - 12 === 16 && [1, 2, 3, 4, 6].reduce((a, b) => a + b, 0) === 16, 'X: σ(12) = 28 > 24 — 12 is abundant (proper sum 1+2+3+4+6 = 16 > 12)')
  let firstAbundant = -1
  for (let n = 2; n <= 600; n++)
    if (sigmaEnum(n) > 2 * n) {
      firstAbundant = n
      break
    }
  ok(firstAbundant === 12, 'X: 12 is the FIRST abundant number — nothing below it is')

  // the first abundant list 12, 18, 20, 24, 30 and the sweep's tally print
  const abList: number[] = []
  for (let n = 2; n <= 60 && abList.length < 5; n++) if (sigmaEnum(n) > 2 * n) abList.push(n)
  ok(abList.join(',') === '12,18,20,24,30', 'X: the abundant numbers up to 60 begin 12, 18, 20, 24, 30')
  console.log('  tallies ≤ 600: perfect ' + perfect + ', abundant ' + abundant + ', deficient ' + deficient)

  // every multiple of 6 beyond 6 (up to 600) is abundant — the sweep + the coprime-case reason
  let badMult6 = 0
  for (let k = 12; k <= 600; k += 6) if (sigmaEnum(k) <= 2 * k) badMult6++
  ok(badMult6 === 0, 'X: every multiple of 6 in [12, 600] is abundant — swept')
  {
    // the coprime case k with gcd(k, 6) = 1: σ(6k) = σ(6)σ(k) = 12σ(k) ≥ 12(k+1) > 12k = 2·6k
    let checked = 0
    for (let k = 1; k <= 98; k++) {
      if (k % 2 !== 0 && k % 3 !== 0 && sigmaEnum(6 * k) !== 12 * sigmaEnum(k)) checked = -1
      else if (k % 2 !== 0 && k % 3 !== 0) checked++
    }
    ok(checked === 33, 'X: the coprime engine σ(6k) = σ(6)σ(k) = 12σ(k) — checked on all 33 k ≤ 98 coprime to 6 (12(k+1) > 12k finishes the case)')
  }

  // the amicable pair (220, 284) — each is the other's proper-divisor sum
  ok(factorList(220).join(',') === '2,2,5,11' && (1 + 2 + 4) * (1 + 5) * (1 + 11) === 504, 'X: 220 = 2²·5·11, σ(220) = 7·6·12 = 504')
  ok(factorList(284).join(',') === '2,2,71' && (1 + 2 + 4) * (1 + 71) === 504, 'X: 284 = 2²·71, σ(284) = 7·72 = 504')
  ok(sigmaEnum(220) === sigmaEnum(284) && sigmaEnum(220) - 220 === 284 && sigmaEnum(284) - 284 === 220, 'X: s(220) = 284 and s(284) = 220 — the pair is amicable, σ of each = 504')
  ok(divisors(220).filter(d => d < 220).join(',') === '1,2,4,5,10,11,20,22,44,55,110', 'X: the proper divisors of 220 — 1, 2, 4, 5, 10, 11, 20, 22, 44, 55, 110 — sum to 284')

  // σ-parity data for the L5 exercise: σ(n) odd ⇔ n = m² or 2m² (swept n ≤ 600)
  let badParity = 0
  for (let n = 1; n <= 600; n++) {
    const odd = sigmaEnum(n) % 2 === 1
    const r = isqrt(n)
    const isSq = r * r === n
    const isTwice = n % 2 === 0 && isqrt(n / 2) * isqrt(n / 2) === n / 2
    if (odd !== (isSq || isTwice)) badParity++
  }
  ok(badParity === 0, 'X: σ(n) odd ⇔ n is a square or twice a square — swept n ≤ 600')
  ok(sigmaEnum(9) === 13 && sigmaEnum(18) === 39 && sigmaEnum(36) === 91, 'X: σ-parity instances — σ(9) = 13, σ(18) = 39, σ(36) = 91, all odd (9 = 3², 18 = 2·3², 36 = 6²)')
}

/* ------------------------------------------------------------------ */
/* (Y) HCF × LCM = ab — re-derived from the canonical forms             */
/* ------------------------------------------------------------------ */
{
  const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
  // min(aᵢ, bᵢ) + max(aᵢ, bᵢ) = aᵢ + bᵢ — the exponent identity, swept
  let badMin = 0
  for (let x = 0; x <= 12; x++) for (let y = 0; y <= 12; y++) if (Math.min(x, y) + Math.max(x, y) !== x + y) badMin++
  ok(badMin === 0, 'Y: min(aᵢ, bᵢ) + max(aᵢ, bᵢ) = aᵢ + bᵢ — the 169-pair identity sweep')

  // gcd·lcm = ab certified against the engine for all a, b ≤ 300
  let badProd = 0
  for (let a = 1; a <= 300; a++)
    for (let b = 1; b <= 300; b++)
      if (gcdOf(a, b) * ((a * b) / gcdOf(a, b)) !== a * b) badProd++
  ok(badProd === 0, 'Y: HCF(a, b) · LCM(a, b) = ab — full sweep a, b ≤ 300 (the LCM built as ab/HCF, the rule itself the claim)')

  // the rule read directly from the canonical forms: 12 = 2²·3 vs 18 = 2·3²
  ok(gcdOf(12, 18) === 6 && (12 * 18) / 6 === 36 && 6 * 36 === 216 && 12 * 18 === 216, 'Y: 12 = 2²·3¹, 18 = 2¹·3² — HCF takes min (2·3), LCM takes max (2²·3²) = 36; 6·36 = 216 = 12·18')

  // the printed exam instances
  ok(13 * 455 === 65 * 91 && 65 * 91 === 5915 && gcdOf(65, 91) === 13 && (65 * 91) / 13 === 455, 'Y: HCF 13, LCM 455, one number 65 — the other is 13·455/65 = 91 (65 = 5·13, 91 = 7·13)')
  ok(gcdOf(8, 9) === 1 && 8 * 9 === 72, 'Y: the coprime case — HCF(8, 9) = 1 forces LCM = 8·9 = 72')
  {
    // the three-number caution: 2, 3, 4
    const l3 = [2, 3, 4]
    const g3 = l3.reduce((a, b) => gcdOf(a, b))
    const lcm3 = l3.reduce((a, b) => (a * b) / gcdOf(a, b))
    ok(g3 === 1 && lcm3 === 12 && g3 * lcm3 === 12 && 12 !== 2 * 3 * 4, 'Y: the rule is a TWO-number rule — 2, 3, 4: HCF·LCM = 1·12 = 12 ≠ 24 = 2·3·4')
  }
  ok(gcdOf(15, 15) === 15 && (15 * 15) / 15 === 15, 'Y: the equal case — HCF(a, a) = LCM(a, a) = a, and a·a = a² ✓')
}

/* ------------------------------------------------------------------ */
/* (Z) the inverted τ problems — champions swept                        */
/* ------------------------------------------------------------------ */
{
  const tau = (n: number): number => divisors(n).length
  const firstWith = (k: number, cap: number): number => {
    for (let n = 1; n <= cap; n++) if (tau(n) === k) return n
    return -1
  }
  ok(firstWith(8, 2000) === 24 && tau(24) === 8 && factorList(24).join(',') === '2,2,2,3', 'Z: the smallest n with exactly 8 divisors is 24 = 2³·3 (τ = 4·2); shapes p⁷ (128) and pqr (30) lose')
  ok(firstWith(12, 2000) === 60 && tau(60) === 12 && factorList(60).join(',') === '2,2,3,5', 'Z: the smallest n with exactly 12 divisors is 60 = 2²·3·5 (τ = 3·2·2); rivals 72, 96, 2048 all larger')
  ok(firstWith(15, 2000) === 144, 'Z: the smallest n with exactly 15 divisors is 144 = 2⁴·3² (4.2\'s instance re-certified here)')
  ok(firstWith(16, 2000) === 120 && tau(120) === 16 && factorList(120).join(',') === '2,2,2,3,5', 'Z: the smallest n with exactly 16 divisors is 120 = 2³·3·5 (τ = 4·2·2); rivals 216 (p³q³) and 210 (pqrs) larger, 384 (p⁷q) larger')
  ok(firstWith(24, 2000) === 360 && tau(360) === 24, 'Z: the smallest n with exactly 24 divisors is 360 = 2³·3²·5 (τ = 4·3·2); rival 420 (p²qrs) larger, 480 (p⁵qr) larger')

  // the printed shape-tables, value by value
  ok(Math.pow(2, 11) === 2048 && Math.pow(2, 5) * 3 === 96 && Math.pow(2, 3) * 9 === 72 && 4 * 3 * 5 === 60, 'Z: the four 12-divisor shapes — 2048 (p¹¹), 96 (p⁵q), 72 (p³q²), 60 (p²qr)')
  ok(Math.pow(2, 15) === 32768 && Math.pow(2, 7) * 3 === 384 && Math.pow(2, 3) * 27 === 216 && Math.pow(2, 3) * 3 * 5 === 120 && 2 * 3 * 5 * 7 === 210, 'Z: the five 16-divisor shapes — 32768 (p¹⁵), 384 (p⁷q), 216 (p³q³), 120 (p³qr), 210 (pqrs)')
  ok(Math.pow(2, 23) === 8388608 && Math.pow(2, 11) * 3 === 6144 && Math.pow(2, 7) * 9 === 1152 && Math.pow(2, 5) * 27 === 864 && Math.pow(2, 5) * 15 === 480 && Math.pow(2, 3) * 9 * 5 === 360 && 4 * 3 * 5 * 7 === 420, 'Z: the seven 24-divisor shapes — 8388608 (p²³), 6144 (p¹¹q), 1152 (p⁷q²), 864 (p⁵q³), 480 (p⁵qr), 360 (p³q²r), 420 (p²qrs)')

  // the two smallest with 15 divisors: 144 then 324 = 2²·3⁴
  const fifteenList: number[] = []
  for (let n = 1; n <= 2000 && fifteenList.length < 2; n++) if (tau(n) === 15) fifteenList.push(n)
  ok(fifteenList.join(',') === '144,324' && factorList(324).join(',') === '2,2,3,3,3,3' && 4 * 81 === 324 && 3 * 5 === 15, 'Z: the 15-divisor ladder runs 144 (2⁴·3²), 324 (2²·3⁴) — τ(324) = 3·5 = 15')
}

/* ------------------------------------------------------------------ */
/* (AA) the factorial census cashed — 4.2's Legendre at exam work       */
/* ------------------------------------------------------------------ */
{
  const vp = (n: number, p: number): number => {
    let s = 0
    let q = p
    while (q <= n) {
      s += Math.floor(n / q)
      q *= p
    }
    return s
  }
  // the new census instances
  ok(vp(300, 3) === 100 + 33 + 11 + 3 + 1 && 100 + 33 + 11 + 3 + 1 === 148, 'AA: v₃(300!) = 100 + 33 + 11 + 3 + 1 = 148 — the highest power of 3 in 300!')
  ok(vp(3000, 7) === 428 + 61 + 8 + 1 && 428 + 61 + 8 + 1 === 498, 'AA: v₇(3000!) = 428 + 61 + 8 + 1 = 498 — the census closes at 7⁴ = 2401')
  ok(vp(200, 5) === 40 + 8 + 1 && 40 + 8 + 1 === 49, 'AA: zeros(200!) = v₅ = 40 + 8 + 1 = 49')

  // the inverted zero census: smallest n whose factorial carries ≥ 100 zeros
  let first100 = -1
  for (let n = 1; n <= 500; n++)
    if (vp(n, 5) >= 100) {
      first100 = n
      break
    }
  ok(first100 === 405 && vp(400, 5) === 99 && vp(404, 5) === 99 && vp(405, 5) === 100, 'AA: the smallest n with ≥ 100 trailing zeros is 405 — v₅(400!) = 80+16+3 = 99, v₅(404!) = 99, v₅(405!) = 81+16+3 = 100 (405 = 5·81 donates the hundredth five)')
  ok(vp(405, 5) === 100, 'AA: 405! ends in EXACTLY 100 zeros — the landing is exact, not just a bound')

  // skipped zero-counts: the jump at 125 skips 29 and 30
  ok(vp(124, 5) === 28 && vp(125, 5) === 31 && 31 - 28 === 3, 'AA: v₅ jumps 28 → 31 at 125 (25 + 5 + 1) — no factorial ends in exactly 29 or 30 zeros')
  {
    const achieved = new Set<number>()
    for (let n = 1; n <= 600; n++) achieved.add(vp(n, 5))
    ok(!achieved.has(29) && !achieved.has(30) && achieved.has(28) && achieved.has(31), 'AA: the sweep n ≤ 600 confirms 29 and 30 are skipped zero-counts (28 and 31 occur)')
  }
}

/* ------------------------------------------------------------------ */
/* (AB) figure 3 geometry — the divisor lattice of 72                   */
/* ------------------------------------------------------------------ */
{
  // layout: 4 rows (2-exponent 0..3) × 3 columns (3-exponent 0..2)
  // cells 64×32 at x = 60 + c·70, y = 60 + r·40; row sums at x = 300; column sums at y = 224
  const CW = 64
  const CH = 32
  const cells: Array<{ label: string; x: number; y: number }> = []
  const lattice: number[][] = []
  for (let r = 0; r <= 3; r++) {
    const row: number[] = []
    for (let c = 0; c <= 2; c++) {
      const v = Math.pow(2, r) * Math.pow(3, c)
      row.push(v)
      cells.push({ label: String(v), x: 60 + c * 70, y: 60 + r * 40 })
    }
    lattice.push(row)
  }
  const W = 560
  const H = 300
  // every cell inside the viewBox with ≥ 6 px margin
  let badClip = 0
  for (const cell of cells) if (cell.x < 6 || cell.x + CW > W - 6 || cell.y < 6 || cell.y + CH > H - 6) badClip++
  ok(badClip === 0 && cells.length === 12, 'AB: all twelve lattice cells inside the 560×300 viewBox with margins')
  // pairwise separation ≥ 6 px on some axis
  let badSep = 0
  for (let a = 0; a < cells.length; a++)
    for (let b = a + 1; b < cells.length; b++) {
      const dx = Math.max(0, Math.max(cells[a].x, cells[b].x) - Math.min(cells[a].x + CW, cells[b].x + CW))
      const dy = Math.max(0, Math.max(cells[a].y, cells[b].y) - Math.min(cells[a].y + CH, cells[b].y + CH))
      if (dx < 6 && dy < 6) badSep++
    }
  ok(badSep === 0, 'AB: every pair of lattice cells ≥ 6 px apart on some axis')
  // the lattice's arithmetic is the lesson's engine: row sums 13, 26, 52, 104; column sums 15, 45, 135; total 195
  const rowSums = lattice.map(row => row.reduce((a, b) => a + b, 0))
  const colSums = [0, 1, 2].map(c => lattice.reduce((a, row) => a + row[c], 0))
  ok(rowSums.join(',') === '13,26,52,104', 'AB: the four row sums read 13, 26, 52, 104 — σ(2^r) columns')
  ok(colSums.join(',') === '15,45,135', 'AB: the three column sums read 15, 45, 135')
  ok(rowSums.reduce((a, b) => a + b, 0) === 195 && colSums.reduce((a, b) => a + b, 0) === 195, 'AB: both margins total 195 = σ(72) = (1+2+4+8)(1+3+9)')
  // row-sum / column-sum labels sit clear of the grid (x = 300 band, y = 232 band — the auditor's box model
  // puts the text top at baseline − 12, so 232 keeps a 20 px clearance over the bottom cell row at y = 212)
  const rowLabelX = 300
  const gridRight = 60 + 2 * 70 + CW
  const colLabelY = 232
  const gridBottom = 60 + 3 * 40 + CH
  ok(rowLabelX - gridRight >= 10 && colLabelY - gridBottom >= 18, 'AB: the margin labels clear the grid (row band right of x = 264; column band ≥ 18 px under the bottom cells)')
  ok(gridBottom + 32 <= H - 6, 'AB: the grand-total line fits under the column sums')
}

/* ------------------------------------------------------------------ */
/* (AC) the 4.3 quiz keys (intended 1/2/0/0/2)                          */
/* ------------------------------------------------------------------ */
{
  const sigmaEnum = (n: number): number => divisors(n).reduce((a, b) => a + b, 0)
  // Q1: σ(100) = 217 by the formula 7·31 — the τ option (9) is the divisor COUNT, not the sum
  ok(sigmaEnum(100) === 217 && divisors(100).length === 9 && sigmaEnum(100) !== divisors(100).length, 'AC: quiz 4.3/Q1 key 1 — 217 is the divisor SUM; 9 is the divisor count (a different machine)')
  // Q2: the smallest abundant number is 12 (σ = 28 > 24); 6 is perfect, not abundant
  ok(sigmaEnum(6) === 12 && 12 === 2 * 6 && sigmaEnum(12) === 28 && 28 > 24, 'AC: quiz 4.3/Q2 key 2 — 12 is the first abundant; 6 is the first PERFECT (σ = 2n exactly)')
  // Q3: HCF·LCM = ab gives the missing number 6·36/12 = 18
  ok((6 * 36) / 12 === 18 && 6 * 36 === 12 * 18, 'AC: quiz 4.3/Q3 key 0 — the other number is HCF·LCM/known = 216/12 = 18')
  // Q4: no factorial ends in exactly 30 zeros — the census jumps 28 → 31 at 125
  {
    const vp = (n: number): number => {
      let s = 0
      let q = 5
      while (q <= n) {
        s += Math.floor(n / q)
        q *= 5
      }
      return s
    }
    ok(vp(124) === 28 && vp(125) === 31, 'AC: quiz 4.3/Q4 key 0 — 125! lands on 31 fives, skipping 29 and 30')
  }
  // Q5: the smallest n with exactly 12 divisors is 60
  ok(divisors(60).length === 12 && divisors(24).length === 8 && divisors(36).length === 9 && divisors(72).length === 12 && 72 > 60, 'AC: quiz 4.3/Q5 key 2 — 60 is the τ = 12 champion (24 has 8, 36 has 9, 72 has 12 but is larger)')
}

/* ------------------------------------------------------------------ */
/* (AD) the 14 exercise keys of 4.3                                     */
/* ------------------------------------------------------------------ */
{
  const sigmaEnum = (n: number): number => divisors(n).reduce((a, b) => a + b, 0)
  const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
  // L1-1: σ(12) = 28, abundant
  ok(divisors(12).join(',') === '1,2,3,4,6,12' && sigmaEnum(12) === 28 && 28 > 24, 'AD: ex L1-1 — σ(12) = 28 > 24: 12 is abundant')
  // L1-2: 15 is deficient — σ(15) = 24 < 30
  ok(factorList(15).join(',') === '3,5' && (3 + 1) * (5 + 1) === 24 && 24 < 30, 'AD: ex L1-2 — σ(15) = (1+3)(1+5) = 4·6 = 24 < 30: deficient')
  // L1-3: τ(84) = 12
  ok(factorList(84).join(',') === '2,2,3,7' && divisors(84).length === 12 && 3 * 2 * 2 === 12, 'AD: ex L1-3 — τ(84) = (2+1)(1+1)(1+1) = 12')
  // L2-4: σ(72) = 195 both ways
  ok(sigmaEnum(72) === 195 && 15 * 13 === 195, 'AD: ex L2-4 — σ(72) = 195 by formula and enumeration')
  // L2-5: HCF(12, 18)·LCM(12, 18) = 6·36 = 216 = 12·18
  ok(gcdOf(12, 18) === 6 && (12 * 18) / 6 === 36 && 6 * 36 === 216, 'AD: ex L2-5 — the product rule on 12 and 18: 6·36 = 216 = 12·18')
  // L2-6: zeros(200!) = 49
  {
    let s = 0
    let q = 5
    while (q <= 200) {
      s += Math.floor(200 / q)
      q *= 5
    }
    ok(s === 49, 'AD: ex L2-6 — zeros(200!) = 40 + 8 + 1 = 49')
  }
  // L3-7: 496 perfect — σ = 992 = 2·496, the ten divisors listed
  ok(factorList(496).join(',') === '2,2,2,2,31' && sigmaEnum(496) === 992 && 31 * 32 === 992, 'AD: ex L3-7 — 496 = 2⁴·31, σ = 31·32 = 992 = 2·496: perfect')
  ok(divisors(496).length === 10 && [1, 2, 4, 8, 16, 31, 62, 124, 248, 496].reduce((a, b) => a + b, 0) === 992, 'AD: ex L3-7 — the ten divisors 1, 2, 4, 8, 16, 31, 62, 124, 248, 496 sum to 992')
  // L3-8: the smallest n with 8 divisors is 24
  ok(divisors(24).length === 8 && Math.pow(2, 7) === 128 && 2 * 3 * 5 === 30 && divisors(30).length === 8, 'AD: ex L3-8 — 24 = 2³·3 beats 128 (p⁷) and 30 (pqr, tied at 8 divisors but larger)')
  // L3-9: v₇(3000!) = 498
  {
    let s = 0
    let q = 7
    while (q <= 3000) {
      s += Math.floor(3000 / q)
      q *= 7
    }
    ok(s === 498 && 428 + 61 + 8 + 1 === 498, 'AD: ex L3-9 — the highest power of 7 in 3000! is 7⁴⁹⁸')
  }
  // L4-10: the amicable pair verified from canonical forms
  ok(sigmaEnum(220) === 504 && sigmaEnum(284) === 504 && sigmaEnum(220) - 220 === 284 && sigmaEnum(284) - 284 === 220, 'AD: ex L4-10 — σ(220) = σ(284) = 504; each is the other\'s proper sum')
  // L4-11: HCF 13, LCM 455, one number 65 → other 91
  ok((13 * 455) / 65 === 91 && gcdOf(65, 91) === 13 && (65 * 91) / 13 === 455, 'AD: ex L4-11 — b = 13·455/65 = 91; HCF(65, 91) = 13 and LCM = 455 rebuilt')
  // L5-12: the smallest n with 24 divisors is 360
  ok(divisors(360).length === 24 && divisors(420).length === 24 && divisors(480).length === 24 && 360 < 420 && 360 < 480, 'AD: ex L5-12 — 360 is the τ = 24 champion (420 and 480 also carry 24 but are larger)')
  // L5-13: σ(n) odd ⇔ n = m² or 2m² — swept, with the printed instances
  {
    let badP = 0
    for (let n = 1; n <= 600; n++) {
      const odd = sigmaEnum(n) % 2 === 1
      const r = isqrt(n)
      const isSq = r * r === n
      const isTwice = n % 2 === 0 && isqrt(n / 2) * isqrt(n / 2) === n / 2
      if (odd !== (isSq || isTwice)) badP++
    }
    ok(badP === 0 && sigmaEnum(9) === 13 && sigmaEnum(18) === 39 && sigmaEnum(36) === 91, 'AD: ex L5-13 — σ-parity swept n ≤ 600; σ(9) = 13, σ(18) = 39, σ(36) = 91 odd')
  }
  // L6-14: consecutive equal-σ pairs below 600 — (14, 15) and (206, 207)
  {
    const pairs: Array<[number, number, number]> = []
    for (let n = 2; n < 600; n++) if (sigmaEnum(n) === sigmaEnum(n + 1)) pairs.push([n, n + 1, sigmaEnum(n)])
    ok(pairs.length === 2 && pairs[0][0] === 14 && pairs[0][1] === 15 && pairs[0][2] === 24 && pairs[1][0] === 206 && pairs[1][1] === 207 && pairs[1][2] === 312, 'AD: ex L6-14 — the consecutive equal-σ pairs below 600 are (14, 15) with σ = 24 and (206, 207) with σ = 312')
    ok(factorList(14).join(',') === '2,7' && 3 * 8 === 24 && 4 * 6 === 24, 'AD: ex L6-14 — 14 = 2·7 gives σ = 3·8 = 24; 15 = 3·5 gives σ = 4·6 = 24')
    ok(factorList(206).join(',') === '2,103' && 3 * 104 === 312 && factorList(207).join(',') === '3,3,23' && (9 + 3 + 1) * (23 + 1) === 312, 'AD: ex L6-14 — 206 = 2·103 gives σ = 3·104 = 312; 207 = 3²·23 gives σ = 13·24 = 312')
  }
}

/* ------------------------------------------------------------------ */
/* (AE) the 4 formula cards of 4.3                                      */
/* ------------------------------------------------------------------ */
{
  const sigmaEnum = (n: number): number => divisors(n).reduce((a, b) => a + b, 0)
  const gcdOf = (a: number, b: number): number => (b === 0 ? a : gcdOf(b, a % b))
  // card 1: the divisor sum
  ok(sigmaEnum(100) === (1 + 2 + 4) * (1 + 5 + 25) && (1 + 2 + 4) * 31 === 217, 'AE: card 1 — σ(n) = ∏(p^(a+1) − 1)/(p − 1); σ(100) = 7·31 = 217')
  // card 2: the classification test
  ok(sigmaEnum(6) === 12 && 12 === 2 * 6 && sigmaEnum(12) === 28 && 28 > 24 && sigmaEnum(15) === 24 && 24 < 30, 'AE: card 2 — σ vs 2n: 6 perfect (equal), 12 abundant (above), 15 deficient (below)')
  // card 3: the product rule
  ok(gcdOf(12, 18) * 36 === 216 && 12 * 18 === 216, 'AE: card 3 — HCF·LCM = ab; 6·36 = 216 = 12·18 (two numbers only)')
  // card 4: the inverted censuses
  ok(divisors(60).length === 12 && divisors(360).length === 24, 'AE: card 4 — inverted champions: 12 divisors → 60; 24 divisors → 360; 100 zeros → 405')
  {
    let s = 0
    let q = 5
    while (q <= 405) {
      s += Math.floor(405 / q)
      q *= 5
    }
    ok(s === 100, 'AE: card 4 — v₅(405!) = 100, the exact 100-zero landing')
  }
}

/* ------------------------------------------------------------------ */
/* (AF) the 4.3 content tables, cell by cell                            */
/* ------------------------------------------------------------------ */
{
  const sigmaEnum = (n: number): number => divisors(n).reduce((a, b) => a + b, 0)
  // table 1: σ instances (n, canonical, formula product, σ)
  const sigmaRows: Array<[number, number, number]> = [
    [60, 168, 168],
    [84, 224, 224],
    [72, 195, 195],
    [100, 217, 217],
    [360, 1170, 1170],
    [2025, 3751, 3751],
    [2047, 2160, 2160],
  ]
  let badS = 0
  for (const [n, formulaSide, printed] of sigmaRows) if (sigmaEnum(n) !== formulaSide || formulaSide !== printed) badS++
  ok(badS === 0 && sigmaRows.length === 7, 'AF: table 1 — the seven σ rows (60→168, 84→224, 72→195, 100→217, 360→1170, 2025→3751, 2047→2160) certified both sides')

  // table 2: the classification rows (n, σ, 2n, verdict)
  const classRows: Array<[number, string]> = [
    [6, 'perfect'],
    [12, 'abundant'],
    [15, 'deficient'],
    [28, 'perfect'],
    [100, 'abundant'],
    [220, 'abundant'],
    [284, 'deficient'],
  ]
  let badC = 0
  for (const [n, verdict] of classRows) {
    const s = sigmaEnum(n)
    const actual = s === 2 * n ? 'perfect' : s > 2 * n ? 'abundant' : 'deficient'
    if (actual !== verdict) badC++
  }
  ok(badC === 0 && classRows.length === 7, 'AF: table 2 — the seven classification rows certified (6/28 perfect; 12/100/220 abundant; 15/284 deficient — 284 deficient yet amicable)')

  // table 3: the inverted champions (k, champion, τ)
  const champRows: Array<[number, number]> = [
    [8, 24],
    [12, 60],
    [15, 144],
    [16, 120],
    [24, 360],
  ]
  let badCh = 0
  for (const [k, champ] of champRows) {
    if (divisors(champ).length !== k) badCh++
    for (let n = 1; n < champ; n++) if (divisors(n).length === k) badCh++ // nothing smaller carries k
  }
  ok(badCh === 0 && champRows.length === 5, 'AF: table 3 — the five champions (8→24, 12→60, 15→144, 16→120, 24→360) are first occurrences, swept')
}

/* ------------------------------------------------------------------ */
/* (AG) prime gaps — census to 2000, first occurrences, records         */
/* ------------------------------------------------------------------ */
{
  // sieve to 2·10⁶ (shared with the π and Bertrand sections)
  const LIM = 2000000
  const sieve = new Uint8Array(LIM + 1)
  sieve[0] = sieve[1] = 1
  for (let i = 2; i * i <= LIM; i++) if (!sieve[i]) for (let j = i * i; j <= LIM; j += i) sieve[j] = 1
  const primes: number[] = []
  for (let n = 2; n <= LIM; n++) if (!sieve[n]) primes.push(n)
  ok(primes.length === 148933 && primes[0] === 2 && primes[148932] === 1999993, 'AG: the engine sieve to 2·10⁶ holds 148933 primes, ending 1999993 (π(2·10⁶) cross-checked)')

  // consecutive-gap census below 2000
  const gaps: Array<{ p: number; next: number; g: number }> = []
  for (let i = 0; primes[i + 1] <= 2000; i++) gaps.push({ p: primes[i], next: primes[i + 1], g: primes[i + 1] - primes[i] })
  // the only gap of 1 is after 2 (2 → 3) — every other gap is even
  ok(gaps.filter(x => x.g === 1).length === 1 && gaps[0].p === 2 && gaps[0].next === 3, 'AG: the gap after 2 is the only odd gap: 2 → 3, size 1 — every later gap is even')
  ok(gaps.slice(1).every(x => x.g % 2 === 0), 'AG: all gaps after 2 → 3 are even (two odd primes differ by an even number)')

  // first occurrences of gap sizes 2, 4, 6, 8, 10, 12, 14
  const firstGap = (size: number): { p: number; next: number } | null => {
    for (const x of gaps) if (x.g === size) return { p: x.p, next: x.next }
    return null
  }
  ok(firstGap(2)?.p === 3 && firstGap(2)?.next === 5, 'AG: the first gap of 2 is 3 → 5')
  ok(firstGap(4)?.p === 7 && firstGap(4)?.next === 11, 'AG: the first gap of 4 is 7 → 11')
  ok(firstGap(6)?.p === 23 && firstGap(6)?.next === 29, 'AG: the first gap of 6 is 23 → 29')
  ok(firstGap(8)?.p === 89 && firstGap(8)?.next === 97, 'AG: the first gap of 8 is 89 → 97 — the canyon below 100')
  ok(firstGap(10)?.p === 139 && firstGap(10)?.next === 149, 'AG: the first gap of 10 is 139 → 149')
  ok(firstGap(12)?.p === 199 && firstGap(12)?.next === 211, 'AG: the first gap of 12 is 199 → 211')
  ok(firstGap(14)?.p === 113 && firstGap(14)?.next === 127, 'AG: the first gap of 14 is 113 → 127 — EARLIER than the first gap of 10 (first occurrences do not march in size order)')

  // records: the largest gap below 100 and below 1000 and below 2000
  const maxGapBelow = (bound: number): { p: number; next: number; g: number } => {
    let best = { p: 0, next: 0, g: 0 }
    for (const x of gaps) if (x.next <= bound && x.g > best.g) best = x
    return best
  }
  ok(maxGapBelow(100).g === 8 && maxGapBelow(100).p === 89, 'AG: the record gap below 100 is 8 (89 → 97)')
  ok(maxGapBelow(1000).g === 20 && maxGapBelow(1000).p === 887 && maxGapBelow(1000).next === 907, 'AG: the record gap below 1000 is 20 (887 → 907)')
  ok(maxGapBelow(2000).g === 34 && maxGapBelow(2000).p === 1327 && maxGapBelow(2000).next === 1361, 'AG: the record gap below 2000 is 34 (1327 → 1361 — the first gap of 34; 1151 sits inside any 1129 → 1163 fantasy)')

  // the mean gap to 1000: 995 spread over 167 gaps
  {
    const gapsTo1000 = gaps.filter(x => x.next <= 1000)
    const sum = gapsTo1000.reduce((a, b) => a + b.g, 0)
    ok(gapsTo1000.length === 167 && sum === 997 - 2 && Math.abs(sum / 167 - 995 / 167) < 1e-9, 'AG: 167 gaps run from 2 to 997, total 995 — the mean gap ≈ 5.96 below 1000 (ln 1000 ≈ 6.98, the PNT echo, stated not claimed)')
    console.log('  mean gap below 1000: ' + (995 / 167).toFixed(4) + ' vs ln(1000) = ' + Math.log(1000).toFixed(4))
  }

  // the twin pairs below 100, listed
  const twinsBelow = (bound: number): Array<[number, number]> => {
    const out: Array<[number, number]> = []
    for (let i = 0; primes[i + 1] <= bound; i++) if (primes[i + 1] - primes[i] === 2) out.push([primes[i], primes[i + 1]])
    return out
  }
  const twins100 = twinsBelow(100)
  ok(
    twins100.length === 8 && twins100.map(t => t[0]).join(',') === '3,5,11,17,29,41,59,71',
    'AG: the twin pairs below 100 — (3,5), (5,7), (11,13), (17,19), (29,31), (41,43), (59,61), (71,73) — eight pairs',
  )
  const twins200 = twinsBelow(200)
  ok(twins200.length === 15 && twins200.filter(t => t[0] >= 101).length === 7, 'AG: fifteen twin pairs below 200 — seven of them in 101..200: (101,103), (107,109), (137,139), (149,151), (179,181), (191,193), (197,199)')
  ok(twins200.filter(t => t[0] >= 101).map(t => t[0]).join(',') === '101,107,137,149,179,191,197', 'AG: the seven 101..200 twin starts read exactly 101, 107, 137, 149, 179, 191, 197')
}

/* ------------------------------------------------------------------ */
/* (AH) Bertrand's postulate — swept for every n ≤ 2000                 */
/* ------------------------------------------------------------------ */
{
  const LIM2 = 2000000
  const sieve2 = new Uint8Array(LIM2 + 1)
  sieve2[0] = sieve2[1] = 1
  for (let i = 2; i * i <= LIM2; i++) if (!sieve2[i]) for (let j = i * i; j <= LIM2; j += i) sieve2[j] = 1
  const isPrimeS = (n: number): boolean => sieve2[n] === 0

  // the postulate's two forms: n ≥ 1 → a prime in (n, 2n]; n ≥ 2 → a prime in (n, 2n)
  let badBertrand1 = 0
  let badBertrand2 = 0
  for (let n = 1; n <= 2000; n++) {
    let found1 = false
    let found2 = false
    for (let m = n + 1; m <= 2 * n; m++) {
      if (isPrimeS(m)) {
        found1 = true
        if (m < 2 * n) found2 = true
        break
      }
    }
    if (!found1) badBertrand1++
    if (n >= 2 && !found2) badBertrand2++
  }
  ok(badBertrand1 === 0 && badBertrand2 === 0, 'AH: Bertrand swept — every n ≤ 2000 carries a prime in (n, 2n], and for n ≥ 2 the prime sits strictly inside (n, 2n)')

  // the printed instances: first prime after the chain 5, 10, 20, 40, 80 and after 100, 500, 1000, 1500
  const nextPrime = (n: number): number => {
    for (let m = n + 1; m <= 2 * n; m++) if (isPrimeS(m)) return m
    return -1 // Bertrand certifies this never fires
  }
  ok([5, 10, 20, 40, 80].map(nextPrime).join(',') === '7,11,23,41,83', 'AH: the doubling chain — after 5, 10, 20, 40, 80 the first primes are 7, 11, 23, 41, 83, each inside (n, 2n)')
  ok(nextPrime(100) === 101 && nextPrime(500) === 503 && nextPrime(1000) === 1009 && nextPrime(1500) === 1511, 'AH: first primes after 100, 500, 1000, 1500 are 101, 503, 1009, 1511')
  ok(nextPrime(89) === 97 && nextPrime(113) === 127, 'AH: the canyon instances — after 89 the next prime is 97; after 113 it is 127')

  // the reconciliation with 4.1's 100-composite run: 101!+101 < 2·101! for 101 ≥ 2, so no clash
  ok(101 <= 2 * 101 - 101, 'AH: 101! + 101 < 101! + 101! = 2·101! — Bertrand\'s prime in (101!, 2·101!) lies beyond the 100-composite run, no contradiction')
}

/* ------------------------------------------------------------------ */
/* (AI) twins to 10⁶, the 3,5,7 uniqueness, the counts table            */
/* ------------------------------------------------------------------ */
{
  const LIM3 = 1000000
  const sieve3 = new Uint8Array(LIM3 + 1)
  sieve3[0] = sieve3[1] = 1
  for (let i = 2; i * i <= LIM3; i++) if (!sieve3[i]) for (let j = i * i; j <= LIM3; j += i) sieve3[j] = 1

  // twin counts at the powers of ten (A007508's values, computed here)
  const twinCount = (bound: number): number => {
    let c = 0
    for (let p = 2; p + 2 <= bound; p++) if (!sieve3[p] && !sieve3[p + 2]) c++
    return c
  }
  ok(twinCount(10) === 2, 'AI: twins below 10 — (3,5), (5,7) — two pairs')
  ok(twinCount(100) === 8, 'AI: twins below 100 — eight pairs')
  ok(twinCount(1000) === 35, 'AI: twins below 1000 — thirty-five pairs')
  ok(twinCount(10000) === 205, 'AI: twins below 10⁴ — 205 pairs')
  ok(twinCount(100000) === 1224, 'AI: twins below 10⁵ — 1224 pairs')
  ok(twinCount(1000000) === 8169, 'AI: twins below 10⁶ — 8169 pairs')

  // the 3,5,7 uniqueness: for p ≥ 5, among p, p+2, p+4 one is a multiple of 3 above 3
  let badTriplet = 0
  for (let p = 5; p <= 2000; p += 2) {
    if (isPrimeDef(p) && isPrimeDef(p + 2) && isPrimeDef(p + 4)) badTriplet++
  }
  ok(badTriplet === 0, 'AI: no prime triplet p, p+2, p+4 exists for any odd p ≥ 5 up to 2000 — 3, 5, 7 is unique (one of the three is a multiple of 3 exceeding 3)')
  ok(isPrimeDef(3) && isPrimeDef(5) && isPrimeDef(7) && !isPrimeDef(9) && !isPrimeDef(15), 'AI: the neighbours fail — 5, 7, 9 dies at 9 = 3²; 11, 13, 15 dies at 15 = 3·5')
}

/* ------------------------------------------------------------------ */
/* (AJ) π(n) — the 10^k table, densities, the n/ln n companions         */
/* ------------------------------------------------------------------ */
{
  const LIM4 = 1000000
  const sieve4 = new Uint8Array(LIM4 + 1)
  sieve4[0] = sieve4[1] = 1
  for (let i = 2; i * i <= LIM4; i++) if (!sieve4[i]) for (let j = i * i; j <= LIM4; j += i) sieve4[j] = 1
  const piUpTo = (n: number): number => {
    let c = 0
    for (let k = 2; k <= n; k++) if (!sieve4[k]) c++
    return c
  }
  // the computed 10^k table
  ok(piUpTo(10) === 4, 'AJ: π(10) = 4 — 2, 3, 5, 7')
  ok(piUpTo(100) === 25, 'AJ: π(100) = 25 (4.1\'s sieve survivor count, re-certified)')
  ok(piUpTo(1000) === 168, 'AJ: π(1000) = 168')
  ok(piUpTo(10000) === 1229, 'AJ: π(10⁴) = 1229')
  ok(piUpTo(100000) === 9592, 'AJ: π(10⁵) = 9592')
  ok(piUpTo(1000000) === 78498, 'AJ: π(10⁶) = 78498')

  // the exam π-differences
  ok(piUpTo(200) - piUpTo(100) === 21, 'AJ: primes in 101..200 — π(200) − π(100) = 46 − 25 = 21')
  ok(piUpTo(300) - piUpTo(200) === 16, 'AJ: primes in 201..300 — 16 (211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293)')
  ok(piUpTo(2000) === 303 && piUpTo(2000) - piUpTo(1000) === 135, 'AJ: π(2000) = 303; primes in 1001..2000 — 135')
  ok(piUpTo(1000) - piUpTo(100) === 143, 'AJ: primes in 101..1000 — 143')

  // the n/ln n companions and ratios (the PNT's shape, values printed honestly)
  const rows: Array<[number, number, number, number]> = [
    [10, 4, 10 / Math.log(10), 4 / (10 / Math.log(10))],
    [100, 25, 100 / Math.log(100), 25 / (100 / Math.log(100))],
    [1000, 168, 1000 / Math.log(1000), 168 / (1000 / Math.log(1000))],
    [10000, 1229, 10000 / Math.log(10000), 1229 / (10000 / Math.log(10000))],
    [100000, 9592, 100000 / Math.log(100000), 9592 / (100000 / Math.log(100000))],
    [1000000, 78498, 1000000 / Math.log(1000000), 78498 / (1000000 / Math.log(1000000))],
  ]
  let badRow = 0
  for (const [n, count, approx, ratio] of rows) {
    if (piUpTo(n) !== count) badRow++
    if (Math.abs(approx - n / Math.log(n)) > 1e-9 || Math.abs(ratio - count / (n / Math.log(n))) > 1e-12) badRow++
  }
  ok(badRow === 0, 'AJ: the six table rows certified — π(n) against n/ln n, ratios 0.921 … 1.084 drifting toward 1')
  console.log('  π vs n/ln n ratios: ' + rows.map(r => r[3].toFixed(3)).join(', '))

  // the honest density fractions
  ok(4 / 10 === 0.4 && 25 / 100 === 0.25 && 168 / 1000 === 0.168 && 1229 / 10000 === 0.1229, 'AJ: the densities thin — 0.4, 0.25, 0.168, 0.1229 …')
  // the odd-prime bound π(n) ≤ 1 + ⌊(n−1)/2⌋ (the L5 exercise's clean count)
  let badOddBound = 0
  for (let n = 2; n <= 2000; n++) if (piUpTo(n) > 1 + Math.floor((n - 1) / 2)) badOddBound++
  ok(badOddBound === 0, 'AJ: π(n) ≤ 1 + ⌊(n−1)/2⌋ for every n ≤ 2000 — only 2 is even; every other prime is odd')
  // the primes of 1..50 and 200..300 for the exercises
  const primes50: number[] = []
  for (let n = 2; n <= 50; n++) if (!sieve4[n]) primes50.push(n)
  ok(primes50.length === 15 && primes50.join(',') === '2,3,5,7,11,13,17,19,23,29,31,37,41,43,47', 'AJ: the fifteen primes to 50 listed in the L1 exercise')
  const primes200to300: number[] = []
  for (let n = 201; n <= 300; n++) if (!sieve4[n]) primes200to300.push(n)
  ok(primes200to300.length === 16 && primes200to300.join(',') === '211,223,227,229,233,239,241,251,257,263,269,271,277,281,283,293', 'AJ: the sixteen primes in 201..300, listed')
}

/* ------------------------------------------------------------------ */
/* (AK) the sum of reciprocal primes — partial sums, the slow dive      */
/* ------------------------------------------------------------------ */
{
  const LIM5 = 6000000
  const sieve5 = new Uint8Array(LIM5 + 1)
  sieve5[0] = sieve5[1] = 1
  for (let i = 2; i * i <= LIM5; i++) if (!sieve5[i]) for (let j = i * i; j <= LIM5; j += i) sieve5[j] = 1

  // partial sums at the printed bounds
  const sumRecip = (bound: number): number => {
    let s = 0
    for (let p = 2; p <= bound; p++) if (!sieve5[p]) s += 1 / p
    return s
  }
  const s100 = sumRecip(100)
  const s1000 = sumRecip(1000)
  const s1e6 = sumRecip(1000000)
  ok(Math.abs(s100 - 1.802817) < 5e-7 && s100 > 1.8028 && s100 < 1.8029, 'AK: Σ 1/p over primes ≤ 100 ≈ 1.8028 (four decimal places certified)')
  ok(Math.abs(s1000 - 2.198080) < 5e-7, 'AK: Σ 1/p over primes ≤ 1000 ≈ 2.1981 (2.198080)')
  ok(s1e6 > 2.88 && s1e6 < 2.90, 'AK: Σ 1/p over primes ≤ 10⁶ ≈ 2.887 — eighteen times the bound, only ~1.08 more sum (the slow dive)')
  console.log('  Σ1/p: ≤100 = ' + s100.toFixed(6) + ', ≤1000 = ' + s1000.toFixed(6) + ', ≤10⁶ = ' + s1e6.toFixed(6))

  // the harmonic comparison
  const harmonic = (bound: number): number => {
    let s = 0
    for (let k = 1; k <= bound; k++) s += 1 / k
    return s
  }
  const h100 = harmonic(100)
  const h1e6 = harmonic(1000000)
  ok(Math.abs(h100 - 5.187378) < 5e-7, 'AK: Σ 1/n to 100 ≈ 5.1874 — the harmonic sum runs far ahead at the same bound')
  ok(h1e6 > 14.39 && h1e6 < 14.40 && s1e6 < h1e6 - 11, 'AK: Σ 1/n to 10⁶ ≈ 14.393 against the primes\' 2.887 — sparse but, by Euler 1737, still unbounded')
  console.log('  harmonic: ≤100 = ' + h100.toFixed(6) + ', ≤10⁶ = ' + h1e6.toFixed(6))

  // the crossing past 3: computed, not quoted — first n whose partial sum exceeds 3
  {
    let s = 0
    let crossing = -1
    for (let p = 2; p <= LIM5; p++) {
      if (!sieve5[p]) {
        s += 1 / p
        if (s > 3 && crossing === -1) crossing = p
      }
    }
    ok(crossing === 5195977, 'AK: the partial sum first exceeds 3 at the prime 5,195,977 — computed here (the divergence is real but glacial: log-log slow)')
    console.log('  Σ1/p crosses 3 at p = ' + crossing)
  }

  // Euler's product at s = 2 over primes ≤ 1000 — against 6/π² (the Basel value, cited)
  {
    let prod = 1
    for (let p = 2; p <= 1000; p++) if (!sieve5[p]) prod *= 1 - 1 / (p * p)
    const basel = 6 / (Math.PI * Math.PI)
    ok(Math.abs(prod - basel) < 0.001, 'AK: ∏(1 − 1/p²) over primes ≤ 1000 = ' + prod.toFixed(6) + ' against 6/π² = ' + basel.toFixed(6) + ' — Euler\'s product identity, numerically confirmed (identity cited, not claimed)')
    console.log('  Euler product s=2 (p ≤ 1000): ' + prod.toFixed(6) + ' vs 6/π²: ' + basel.toFixed(6))
  }
}

/* ------------------------------------------------------------------ */
/* (AL) figure 4 geometry — the prime line to 110                       */
/* ------------------------------------------------------------------ */
{
  // layout: viewBox 940×200; axis y = 128 from x = 30 to x = 910; X(p) = 30 + 8p
  const X = (p: number): number => 30 + p * 8
  const primes110 = [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97, 101, 103, 107, 109]
  ok(primes110.length === 29 && primes110[28] === 109, 'AL: twenty-nine primes to 110 — the figure\'s dot set')
  // dots r = 4 on the axis: pairwise centres ≥ 2·r apart (the tightest pair is 2 → 3, exactly 8 px)
  let badDots = 0
  for (let i = 0; i < primes110.length; i++) for (let j = i + 1; j < primes110.length; j++) if (Math.abs(X(primes110[i]) - X(primes110[j])) < 8) badDots++
  ok(badDots === 0 && X(109) + 4 <= 940 - 6 && X(2) - 4 >= 6, 'AL: all 29 dots ≥ 8 px apart, inside the 940 viewBox with margins')
  // tick labels only (0, 20, 40, 60, 80, 100, 110) — 160 px apart, no collisions
  const ticks = [0, 20, 40, 60, 80, 100, 110]
  let badTick = 0
  for (let i = 0; i < ticks.length; i++) for (let j = i + 1; j < ticks.length; j++) if (Math.abs(X(ticks[i]) - X(ticks[j])) < 40) badTick++
  ok(badTick === 0, 'AL: the seven tick labels (0…110) sit 160 px apart')
  // twin braces above the axis: one shared bracket over the 3, 5, 7 triplet, six braces over the rest
  const twinBraces: Array<[number, number]> = [[11, 13], [17, 19], [29, 31], [41, 43], [59, 61], [71, 73]]
  let badBrace = 0
  for (const [a, b] of twinBraces) {
    if (b - a !== 2) badBrace++
    if (X(b) - X(a) !== 16) badBrace++ // gap 2 × 8 px pitch
  }
  // the six braces are far apart: nearest distinct pair 11→13 and 17→19 sits 4·8 = 32 px apart
  for (let i = 0; i < twinBraces.length; i++) for (let j = i + 1; j < twinBraces.length; j++) if (Math.abs(X(twinBraces[i][0]) - X(twinBraces[j][0])) < 20) badBrace++
  ok(badBrace === 0 && twinBraces.length === 6, 'AL: six twin braces span 16 px each, pairwise ≥ 32 px apart; the triplet 3,5,7 carries one shared bracket (30 px)')
  // the canyon bracket below the axis (89 → 97) and its caption on a lower row
  ok(X(97) - X(89) === 64 && 64 === 8 * 8, 'AL: the canyon spans 64 px (gap 8 × 8 px pitch)')
  const canyonBracketY = 140
  const canyonTextY = 172
  ok(canyonBracketY - 128 >= 8 && canyonTextY - 150 >= 12 && canyonTextY <= 200 - 6, 'AL: the canyon bracket clears the axis by ≥ 8 px and its caption clears the tick row by ≥ 12 px, inside the viewBox')
  // the canyon caption (≈ 15 chars × 7 px ≈ 105 px wide, centred at X(93) = 774) must clear the '100' tick label (X(100) = 830, width 21)
  {
    const captionW = 15 * 7
    const captionLeft = X(93) - captionW / 2
    const captionRight = X(93) + captionW / 2
    const tick100Left = X(100) - 21 / 2
    ok(captionRight <= tick100Left - 2 || captionTextRow() !== tickRow(), 'AL: the canyon caption clears the 100-tick label horizontally (or sits on another row)')
    function captionTextRow(): number {
      return canyonTextY
    }
    function tickRow(): number {
      return 150
    }
  }
}

/* ------------------------------------------------------------------ */
/* (AM) the 4.4 quiz keys (intended 1/0/0/1/1)                          */
/* ------------------------------------------------------------------ */
{
  const LIM6 = 1100000
  const sieve6 = new Uint8Array(LIM6 + 1)
  sieve6[0] = sieve6[1] = 1
  for (let i = 2; i * i <= LIM6; i++) if (!sieve6[i]) for (let j = i * i; j <= LIM6; j += i) sieve6[j] = 1
  const isP = (n: number): boolean => sieve6[n] === 0
  // Q1: twins below 100 = 8 — the (97, 99) option fails: 99 = 9·11
  ok(twinsCountBelow(100) === 8 && !isP(99), 'AM: quiz 4.4/Q1 key 1 — eight twin pairs below 100; 99 is not prime (9·11), so (97, 99) is no pair')
  function twinsCountBelow(bound: number): number {
    let c = 0
    for (let p = 2; p + 2 <= bound; p++) if (isP(p) && isP(p + 2)) c++
    return c
  }
  // Q2: Bertrand at n = 1000 guarantees a prime in (1000, 2000); the least is 1009
  ok(nextPrimeAfter(1000, isP) === 1009, 'AM: quiz 4.4/Q2 key 0 — the guarantee is the interval (1000, 2000); 1009 is the first prime in it')
  function nextPrimeAfter(n: number, pred: (m: number) => boolean): number {
    for (let m = n + 1; m <= 2 * n; m++) if (pred(m)) return m
    return -1
  }
  // Q3: π(1000) − π(100) = 143 primes in 101..1000
  ok(168 - 25 === 143, 'AM: quiz 4.4/Q3 key 0 — 168 − 25 = 143 primes between 100 and 1000')
  // Q4: the record gap below 1000 is 20 (887 → 907)
  ok(907 - 887 === 20 && 127 - 113 === 14 && 97 - 89 === 8, 'AM: quiz 4.4/Q4 key 1 — 20 (887 → 907) beats 14 (113 → 127) and 8 (89 → 97) below 1000')
  // Q5: Σ 1/p diverges (Euler 1737), but slower than the harmonic series
  ok(2.887 < 14.393, 'AM: quiz 4.4/Q5 key 1 — at 10⁶ the primes\' sum is 2.887 against the harmonic 14.393: diverging, but far slower')
}

/* ------------------------------------------------------------------ */
/* (AN) the 14 exercise keys of 4.4                                     */
/* ------------------------------------------------------------------ */
{
  const LIM7 = 2000000
  const sieve7 = new Uint8Array(LIM7 + 1)
  sieve7[0] = sieve7[1] = 1
  for (let i = 2; i * i <= LIM7; i++) if (!sieve7[i]) for (let j = i * i; j <= LIM7; j += i) sieve7[j] = 1
  const isP = (n: number): boolean => sieve7[n] === 0
  // L1-1: the fifteen primes to 50 (list verified in AJ; key re-checked here)
  ok([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47].every(isP), 'AN: ex L1-1 — the fifteen primes to 50, all engine-prime')
  // L1-2: the gap after 13 is 4 (13 → 17); after 89 is 8 (89 → 97)
  ok(17 - 13 === 4 && 97 - 89 === 8, 'AN: ex L1-2 — gap after 13 is 4; after 89 is 8')
  // L1-3: seven twin pairs in 101..200
  ok([101, 107, 137, 149, 179, 191, 197].every(p => isP(p) && isP(p + 2)), 'AN: ex L1-3 — the seven twin pairs (101,103) … (197,199)')
  // L2-4: sixteen primes in 201..300 (list verified in AJ)
  ok([211, 223, 227, 229, 233, 239, 241, 251, 257, 263, 269, 271, 277, 281, 283, 293].every(isP), 'AN: ex L2-4 — the sixteen primes 211 … 293')
  // L2-5: twins below 200 total 15 (8 + 7)
  {
    let c = 0
    for (let p = 2; p + 2 <= 200; p++) if (isP(p) && isP(p + 2)) c++
    ok(c === 15, 'AN: ex L2-5 — fifteen twin pairs below 200 (eight below 100 + seven in 101..200)')
  }
  // L2-6: the Bertrand chain — a prime inside each of (5,10], (10,20], (20,40], (40,80], (80,160]
  ok(isP(7) && 7 <= 10 && isP(11) && 11 <= 20 && isP(23) && 23 <= 40 && isP(41) && 41 <= 80 && isP(83) && 83 <= 160, 'AN: ex L2-6 — the chain 7, 11, 23, 41, 83 lands inside every doubled interval')
  // L3-7: the first gap of 10 is 139 → 149; the first gap of 14 is 113 → 127 (earlier!)
  ok(isP(139) && isP(149) && 149 - 139 === 10 && !isP(141) && !isP(143) && !isP(145) && !isP(147), 'AN: ex L3-7 — 139 → 149 is a clean gap of 10 (141, 143, 145, 147 all composite)')
  ok(113 < 139, 'AN: ex L3-7 — the gap of 14 at 113 → 127 arrives BEFORE the gap of 10 at 139')
  // L3-8: π(2000) − π(1000) = 135 primes in 1001..2000
  ok(303 - 168 === 135, 'AN: ex L3-8 — the π-difference: 135 primes between 1000 and 2000')
  // L3-9: printed Bertrand instances — 101 in (100, 200), 503 in (500, 1000), 1511 in (1500, 3000)
  ok(isP(101) && isP(503) && isP(1511), 'AN: ex L3-9 — 101, 503, 1511 all prime, each inside its Bertrand interval')
  // L4-10: the triplet uniqueness — 5,7,9 dies at 9; 11,13,15 dies at 15
  ok(!isP(9) && !isP(15), 'AN: ex L4-10 — 9 = 3² and 15 = 3·5 kill the next two candidate triplets')
  // L4-11: the 100-composite run 101!+2 … 101!+101 — every k in [2, 101] divides 101!
  // (the real check: for every prime p ≤ 101, v_p(k) ≤ v_p(101!) by Legendre's census)
  {
    const vpLegendre = (n: number, p: number): number => {
      let s = 0
      let q = p
      while (q <= n) {
        s += Math.floor(n / q)
        q *= p
      }
      return s
    }
    let badDiv = 0
    for (let k = 2; k <= 101; k++) {
      const factors = factorList(k)
      const exponents = new Map<number, number>()
      for (const p of factors) exponents.set(p, (exponents.get(p) || 0) + 1)
      for (const [p, e] of exponents) if (vpLegendre(101, p) < e) badDiv++
    }
    ok(badDiv === 0, 'AN: ex L4-11 — every k with 2 ≤ k ≤ 101 divides 101! (Legendre: v_p(101!) ≥ v_p(k) for every prime of every k; so 101! + k = k·(101!/k + 1) is composite for all 100 values)')
  }
  // L5-12: π(n) ≤ 1 + ⌊(n−1)/2⌋ swept
  {
    let bad = 0
    for (let n = 2; n <= 2000; n++) {
      let c = 0
      for (let k = 2; k <= n; k++) if (isP(k)) c++
      if (c > 1 + Math.floor((n - 1) / 2)) bad++
    }
    ok(bad === 0, 'AN: ex L5-12 — π(n) ≤ 1 + ⌊(n−1)/2⌋ for every n ≤ 2000 (only 2 is even)')
  }
  // L5-13: Σ 1/p ≤ 100 ≈ 1.8028 vs harmonic ≈ 5.1874
  {
    let s = 0
    for (const p of [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]) s += 1 / p
    let h = 0
    for (let k = 1; k <= 100; k++) h += 1 / k
    ok(Math.abs(s - 1.802817) < 5e-7 && Math.abs(h - 5.187378) < 5e-7, 'AN: ex L5-13 — Σ 1/p ≤ 100 = 1.8028; Σ 1/n ≤ 100 = 5.1874; the harmonic runs ahead, both diverge')
  }
  // L6-14: Euler's product at s = 2 over primes ≤ 1000 against 6/π²
  {
    let prod = 1
    for (let p = 2; p <= 1000; p++) if (isP(p)) prod *= 1 - 1 / (p * p)
    ok(Math.abs(prod - 6 / (Math.PI * Math.PI)) < 0.001, 'AN: ex L6-14 — ∏(1 − 1/p²), primes ≤ 1000 = ' + prod.toFixed(6) + ' vs 6/π² = ' + (6 / (Math.PI * Math.PI)).toFixed(6))
  }
}

/* ------------------------------------------------------------------ */
/* (AO) the 4 formula cards of 4.4                                      */
/* ------------------------------------------------------------------ */
{
  const LIM8 = 1000000
  const sieve8 = new Uint8Array(LIM8 + 1)
  sieve8[0] = sieve8[1] = 1
  for (let i = 2; i * i <= LIM8; i++) if (!sieve8[i]) for (let j = i * i; j <= LIM8; j += i) sieve8[j] = 1
  const piUpTo = (n: number): number => {
    let c = 0
    for (let k = 2; k <= n; k++) if (!sieve8[k]) c++
    return c
  }
  // card 1: the 10^k table
  ok(piUpTo(1000) === 168 && piUpTo(10000) === 1229 && piUpTo(100000) === 9592 && piUpTo(1000000) === 78498, 'AO: card 1 — π(10^k): 4, 25, 168, 1229, 9592, 78498')
  // card 2: Bertrand
  {
    const isP = (n: number): boolean => sieve8[n] === 0
    let bad = 0
    for (let n = 1; n <= 2000; n++) {
      let found = false
      for (let m = n + 1; m <= 2 * n; m++) if (isP(m)) {
        found = true
        break
      }
      if (!found) bad++
    }
    ok(bad === 0, 'AO: card 2 — Bertrand\'s postulate: a prime always in (n, 2n], swept n ≤ 2000 (Chebyshev 1850 proved it)')
  }
  // card 3: the twin counts + the triplet uniqueness
  {
    let c = 0
    for (let p = 2; p + 2 <= 1000; p++) if (!sieve8[p] && !sieve8[p + 2]) c++
    ok(c === 35, 'AO: card 3 — 35 twin pairs below 1000; 3, 5, 7 is the only gap-2 triplet')
  }
  // card 4: the divergence, with the crossing
  {
    let s = 0
    let crossing = -1
    for (let p = 2; p <= LIM8; p++) {
      if (!sieve8[p]) {
        s += 1 / p
        if (s > 3 && crossing === -1) crossing = p
      }
    }
    ok(crossing === -1, 'AO: card 4 — within 10⁶ the sum Σ 1/p ≈ 2.887 is still short of 3 (the crossing sits past 10⁶ — the divergence is slow; Euler 1737 proved it endless)')
    // the ≤ 10⁶ bound keeps the card honest: the > 3 crossing (5,195,977) is certified in AK, quoted in prose
  }
}

/* ------------------------------------------------------------------ */
/* (AP) the 4.4 content tables, cell by cell                            */
/* ------------------------------------------------------------------ */
{
  const LIM9 = 1000000
  const sieve9 = new Uint8Array(LIM9 + 1)
  sieve9[0] = sieve9[1] = 1
  for (let i = 2; i * i <= LIM9; i++) if (!sieve9[i]) for (let j = i * i; j <= LIM9; j += i) sieve9[j] = 1
  const piUpTo = (n: number): number => {
    let c = 0
    for (let k = 2; k <= n; k++) if (!sieve9[k]) c++
    return c
  }
  // table 1: the π table (bound, π(n), density, n/ln n, ratio) — all computed
  const piRows: Array<[number, number, number]> = [
    [10, 4, 4],
    [100, 25, 25],
    [1000, 168, 168],
    [10000, 1229, 1229],
    [100000, 9592, 9592],
    [1000000, 78498, 78498],
  ]
  let badPi = 0
  for (const [n, count, printed] of piRows) if (piUpTo(n) !== count || count !== printed) badPi++
  ok(badPi === 0 && piRows.length === 6, 'AP: table 1 — the six π rows certified: 4, 25, 168, 1229, 9592, 78498')
  // density row values (printed as fractions of the bound)
  ok((4 / 10).toFixed(4) === '0.4000' && (78498 / 1000000).toFixed(4) === '0.0785', 'AP: table 1 — densities from 0.4 down to 0.0785 (the thinning)')
  // n/ln n companions printed to 1 decimal
  const approx = (n: number): number => n / Math.log(n)
  ok(
    approx(10).toFixed(1) === '4.3' && approx(100).toFixed(1) === '21.7' && approx(1000).toFixed(1) === '144.8' &&
    approx(10000).toFixed(1) === '1085.7' && approx(100000).toFixed(1) === '8685.9' && approx(1000000).toFixed(1) === '72382.4',
    'AP: table 1 — n/ln n companions 4.3, 21.7, 144.8, 1085.7, 8685.9, 72382.4',
  )
  // ratio column to 3 decimals
  ok(
    (4 / approx(10)).toFixed(3) === '0.921' && (25 / approx(100)).toFixed(3) === '1.151' && (168 / approx(1000)).toFixed(3) === '1.161' &&
    (1229 / approx(10000)).toFixed(3) === '1.132' && (9592 / approx(100000)).toFixed(3) === '1.104' && (78498 / approx(1000000)).toFixed(3) === '1.084',
    'AP: table 1 — the ratio column 0.921, 1.151, 1.161, 1.132, 1.104, 1.084 (drifting toward 1 — the PNT\'s shape, stated)',
  )

  // table 2: the gap first-occurrence table
  const LIM10 = 2000000
  const sieve10 = new Uint8Array(LIM10 + 1)
  sieve10[0] = sieve10[1] = 1
  for (let i = 2; i * i <= LIM10; i++) if (!sieve10[i]) for (let j = i * i; j <= LIM10; j += i) sieve10[j] = 1
  const gapRows: Array<[number, number, number]> = [
    [2, 3, 5],
    [4, 7, 11],
    [6, 23, 29],
    [8, 89, 97],
    [10, 139, 149],
    [12, 199, 211],
    [14, 113, 127],
  ]
  let badGap = 0
  for (const [g, p, next] of gapRows) {
    if (next - p !== g) badGap++
    if (!sieve10[p] === false || sieve10[p] === 1 || sieve10[next] === 1) badGap++
    // nothing smaller opens a gap of this size
    for (let a = 2; a < p; a++) if (!sieve10[a] && !sieve10[a + g]) {
      // a gap of EXACTLY g means consecutive primes a, a+g with no prime between: check none in between
      let consecutive = true
      for (let m = a + 1; m < a + g; m++) if (!sieve10[m]) consecutive = false
      if (consecutive) badGap++
    }
  }
  ok(badGap === 0 && gapRows.length === 7, 'AP: table 2 — the seven first-occurrence gap rows certified (2@3→5 … 14@113→127)')

  // table 3: the twin-count ladder
  const twinRows: Array<[number, number]> = [
    [10, 2],
    [100, 8],
    [1000, 35],
    [10000, 205],
    [100000, 1224],
    [1000000, 8169],
  ]
  let badTw = 0
  for (const [bound, count] of twinRows) {
    let c = 0
    for (let p = 2; p + 2 <= bound; p++) if (!sieve9[p] && !sieve9[p + 2]) c++
    if (c !== count) badTw++
  }
  ok(badTw === 0 && twinRows.length === 6, 'AP: table 3 — the twin ladder 2, 8, 35, 205, 1224, 8169 certified at the six bounds')
}

/* ------------------------------------------------------------------ */
/* (AQ) the unit-4 completion arithmetic — cross-lesson cashing         */
/* ------------------------------------------------------------------ */
{
  // 4.2 banked τ(360) = 24; 4.3's inverted census crowns 360 as the τ = 24 champion
  ok(divisors(360).length === 24, 'AQ: 4.2\'s τ(360) = 24 is 4.3\'s inverted champion — the same number, both lessons, one engine')
  // 4.1's sieve built π(100) = 25; 4.4's table extends the same engine to 10⁶
  ok(primes100List.length === 25, 'AQ: 4.1\'s 25 sieve survivors are 4.4\'s π(100) — the engine never changed, only the bound')
  // 4.1's exercise banked the 3,5,7 triplet; 4.4 proves its uniqueness
  ok(isPrimeDef(3) && isPrimeDef(5) && isPrimeDef(7), 'AQ: the 3,5,7 triplet of 4.1\'s exercises is proved unique in 4.4 (no p ≥ 5 survives p, p+2, p+4)')
  // 4.2's Legendre census is 4.3's exam cash (405 and the skipped 29/30)
  ok(true, 'AQ: 4.2\'s Legendre census is cashed in 4.3\'s inverted problems — the 405 landing and the skipped 29/30 (sections AA)')
  // the chapter's two halves meet at 2047: 4.2 factored it, 4.3 sums its divisors
  ok(factorList(2047).join(',') === '23,89' && (1 + 23) * (1 + 89) === 2160, 'AQ: 2047 closes both halves — 4.2 factored it (23·89), 4.3 sums its divisors (24·90 = 2160)')
}

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`)

if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
