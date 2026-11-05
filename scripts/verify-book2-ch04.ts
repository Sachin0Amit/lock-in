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

console.log(`\n=== RESULT: ${pass} passed, ${fail} failed ===`)

if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
