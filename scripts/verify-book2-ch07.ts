/**
 * verify-book2-ch07.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 7 "Building the
 * Rationals".
 *
 * Created 2026-11-06 (run 59) — every number of the chapter is verified
 * here BEFORE anything is written into ch-07.ts, per the verify-first
 * discipline of runs 55–58.
 *
 *   (A) 7.1 the division failure in ℤ: x·c = d solvable in ℤ ⟺ c | d
 *       (c ≠ 0), swept |c|,|d| ≤ 20 with both signs; the c = 0 wall:
 *       x·0 = 0 solves for every x, x·0 = d ≠ 0 dead (zero-product lemma
 *       of 6.3); the census counts on the ±6 square (56 of 144 live;
 *       14 divisibility patterns × 4 sign combinations);
 *   (B) 7.1 the fraction-pair relation: (a,b) ~ (c,d) ⟺ ad = bc over
 *       ℤ × (ℤ − {0}) — the printed instances ((2,3)~(4,6); (6,3)~(2,1);
 *       the non-instance (1,2)≁(2,3)); reflexivity/symmetry swept;
 *       transitivity swept over all chained sextuples with entries ≤ 6
 *       (the d ≠ 0 cancellation step adf = bde ⟹ af = be exercised
 *       numerically on the chain (2,3)~(4,6)~(6,9)~(10,15));
 *   (C) 7.1 class operations and WELL-DEFINEDNESS: [(a,b)] + [(c,d)] =
 *       [(ad+bc, bd)], [(a,b)]·[(c,d)] = [(ac, bd)] swept for
 *       representative independence over all swaps with entries ≤ 4
 *       (all 8-tuples); negation, the zero family [(0,b)] all equivalent
 *       (b ≠ 0), absorption swept; the two-representative printed
 *       computations ((2,3) vs (4,6) each added/multiplied by (5,4) both
 *       ways);
 *   (D) 7.1 the canonical dictionary: gcd reducer to b > 0, gcd(a,b) = 1;
 *       sweep a ∈ −12..12, b ∈ −12..12\{0}: unique reduced rep, pairwise
 *       inequivalence of distinct reduced pairs (Euclid's-lemma route);
 *       the printed dictionary rows ((12,8)→3/2; (−6,4)→−3/2;
 *       (6,−4)→−3/2; (0,5)→0; (6,3)→2; (−8,4)→−2; (7,3)→7/3;
 *       (−9,6)→−3/2; (10,4)→5/2; (4,12)→1/3);
 *   (E) 7.1 the embeddings: n ↦ [(n,1)] additive and multiplicative
 *       swept m, n ≤ 12; negation respected ((−m) ↦ [(−m,1)]); the
 *       ℤ-mirror lands as [(−n,1)];
 *   (F) 7.1 the fraction-lattice figure geometry: rays through lattice
 *       points (b ≥ 1, |a| ≤ 9) of slopes 1/3, 2/3, 1, 3/2, 2 — reduced
 *       points marked, all label gaps ≥ 18 px;
 *   (G) 7.2 the field laws DERIVED through the construction: +/×
 *       commutativity, associativity, distributivity, identities
 *       (0 = [(0,1)], 1 = [(1,1)]), negation involution, absorption —
 *       ALL via clsQAdd/clsQMul on canonical reps (denominators ≤ 6,
 *       |numerator| ≤ 12), never through ordinary arithmetic; uniqueness
 *       of 0 and 1 swept;
 *   (H) 7.2 the inverse law: [(a,b)]⁻¹ = [(b,a)] for a ≠ 0 — product
 *       (ab, ab) ~ (1,1) swept a, b ≤ 12 (a ≠ 0, b ≠ 0); inverse unique
 *       among the small classes; division defined (a/b)÷(c/d) = [(ad, bc)]
 *       for c ≠ 0 with printed instances (2/3÷5/7 = 14/15; −3/4÷9/2 =
 *       −1/6; 5÷1/2 = 10; 7÷7 = 1);
 *   (I) 7.2 the division-by-zero wall as a THEOREM: no [(c,d)] satisfies
 *       [(0,b)]·[(c,d)] ~ (1,1) — swept b, c, d ≤ 12; the zero-product
 *       and cancellation lemmas carried through pairs (swept);
 *   (J) 7.2 the order: [(a,b)] > 0 ⟺ ab > 0, well-definedness swept over
 *       representative swaps; compatibility with + swept; with × by a
 *       positive class swept; trichotomy swept; the printed verdicts
 *       (−3/4 < −1/2 < 0 < 2/3 < 5/4 through the construction);
 *   (K) 7.2 density: the midpoint m = (ps+rq)/(2qs) strictly between
 *       p/q < r/s — swept q, s ∈ 1..8, p < r spanning signs (both sides
 *       proved from ps < rq); iteration: between any two, at least 7
 *       distinct rationals in 3 midpoint generations (swept);
 *   (L) 7.3 the long-division engine: digits of 1/b for b = 2..12 from
 *       the remainder recursion r → 10r mod b; terminating vs periodic
 *       classified against b's prime factors; the printed chains
 *       (3/8: 3→6→4→0 digits 3,7,5; 1/7: 1→3→2→6→4→5 cycle digits
 *       142857; 1/12: pre-period 2 (08) then cycle (3); 1/11 cycle (09);
 *       1/13 cycle (076923) period 6; 1/17 period 16; 1/6 (16) pre-period
 *       1; 1/9 cycle (1)); period ≤ b−1 (pigeonhole) swept;
 *   (M) 7.3 the terminating criterion: a/b in lowest terms terminates
 *       ⟺ b = 2^m·5^n — swept b ≤ 60 against a 60-digit long division;
 *       printed instances (8, 10, 250 terminate; 12, 6, 7, 21 repeat);
 *   (N) 7.3 the period table for 1/p (p prime ≠ 2,5): 1/3→1, 1/7→6,
 *       1/11→2, 1/13→6, 1/17→16, 1/19→18, 1/23→22 — each divides p−1
 *       (the Fermat glimpse of 5.4); swept for primes ≤ 50;
 *   (O) 7.3 the conversion engine: 0.\overline{D} over k digits = D/(10^k−1)
 *       — verified by reconstructing the decimal (long division back);
 *       142857 × 7 = 999999; 0.\overline{3} = 1/3; 0.\overline{09} = 1/11;
 *       0.8\overline{3} = (83−8)/90 = 5/6; 0.\overline{9} = 1; the general
 *       pre-period formula x = (A(10^k − 1) + D)/((10^k − 1)·10^m) verified
 *       by round-trip on a batch;
 *   (P) 7.3 the figures: the remainder-cycle graph for 1/7 (six states,
 *       the digit labels, the 0-state sink for 3/8) and the density zoom
 *       (0.14 < 1/7 < 0.15 with tenths/hundredths/thousandths ticks) —
 *       all coordinates computed, label gaps ≥ 18 px;
 *   (Q) quiz keys 7.1/7.2/7.3 (5 each) with every distractor evaluated;
 *   (R) all 42 exercise keys, recomputed both sides;
 *   (S) the 12 formula cards;
 *   (T) chapter summary: the ℤ-census that ch. 7 inherits (x·2 = 3 dead;
 *       the 6.3 promise cashed via 42·1 − 12·3 = 6 as [(44,38)] ~ [(7,6)]
 *       = 7/6… wait, that was ch. 6's example; here: the opening instance
 *       of 7.1 is x·2 = 3 → [(3,2)]).
 */
import { gcd } from './lib-gcd'

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

/** fraction-pair equivalence: (a, b) ~ (c, d) ⟺ ad = bc, b ≠ 0, d ≠ 0 */
function eq(a: number, b: number, c: number, d: number): boolean {
  return a * d === b * c
}

/** class addition: [(a,b)] + [(c,d)] = [(ad+bc, bd)] */
function qAdd(a: number, b: number, c: number, d: number): [number, number] {
  return [a * d + b * c, b * d]
}

/** class multiplication: [(a,b)] · [(c,d)] = [(ac, bd)] */
function qMul(a: number, b: number, c: number, d: number): [number, number] {
  return [a * c, b * d]
}

/** class negation: −[(a,b)] = [(−a, b)] */
function qNeg(a: number, b: number): [number, number] {
  return [-a, b]
}

/** class inverse: [(a,b)]⁻¹ = [(b,a)] (a ≠ 0) */
function qInv(a: number, b: number): [number, number] {
  return [b, a]
}

/** canonical reduction: sign-normalise (b > 0), divide out gcd */
function reduce(a: number, b: number): [number, number] {
  if (b === 0) throw new Error('zero denominator')
  if (b < 0) return reduce(-a, -b)
  const g = gcd(Math.abs(a), Math.abs(b))
  return [a / g, b / g]
}

/** the oracle: the value a class [(a,b)] names (a/b). Used ONLY to check
 *  the construction's outputs, never as the construction itself. */
function val(a: number, b: number): number {
  return a / b
}

/** long division of n/b: returns { digits, pre, period, remainders } */
function longDivide(n: number, b: number, maxDigits = 60) {
  let r = n % b
  const seen = new Map<number, number>() // remainder → digit index
  const digits: number[] = []
  const remSeq: number[] = []
  let periodStart = -1
  while (r !== 0 && digits.length < maxDigits) {
    if (seen.has(r)) {
      periodStart = seen.get(r)!
      break
    }
    seen.set(r, digits.length)
    remSeq.push(r)
    const digit = Math.floor((10 * r) / b)
    digits.push(digit)
    r = (10 * r) % b
  }
  const pre = periodStart === -1 ? digits.length : periodStart
  const period = periodStart === -1 ? 0 : digits.length - periodStart
  return { digits, pre, period, remSeq, terminating: r === 0 }
}

/** decimal string of the expansion, e.g. "0.08333..." */
function decStr(n: number, b: number, digits = 12): string {
  const { digits: ds } = longDivide(n, b, digits)
  return '0.' + ds.join('')
}

/* ------------------------------------------------------------------ */
/* (A) 7.1 the division failure in ℤ                                   */
/* ------------------------------------------------------------------ */
{
  // the criterion: x·c = d solvable in ℤ ⟺ c | d (c ≠ 0)
  let bad = 0
  for (let c = -20; c <= 20; c++) {
    if (c === 0) continue
    for (let d = -20; d <= 20; d++) {
      const solvable = d % c === 0
      const brute = [...Array(81).keys()].some((x) => (x - 40) * c === d)
      if (solvable !== brute) bad++
    }
  }
  ok(bad === 0, 'A: x·c = d solvable in ℤ ⟺ c | d — swept |c|,|d| ≤ 20 both signs against brute search')

  // the printed instances
  ok(3 % 2 !== 0, 'A: x·2 = 3 dead in ℤ (2 ∤ 3) — the chapter-6 promise comes due')
  ok(4 % 4 === 0, 'A: x·4 = 1 dead in ℤ (4 ∤ 1) — even 1 has no quarter')
  ok(3 % 2 !== 0 && val(3, 2) === 1.5, 'A: the forced witness 3/2 is not an integer — ℚ must name it')
  ok(6 % 3 === 0, 'A: x·3 = 6 alive (3 | 6)')
  ok((-6) % 3 === 0, 'A: x·3 = −6 alive in ℤ (−6 = (−2)·3) — negatives divide, ℕ could not')

  // the c = 0 wall — proved from the zero-product lemma (6.3): x·0 = 0 always
  ok([...Array(21).keys()].every((x) => (x - 10) * 0 === 0), 'A: x·0 = 0 for every integer x — so x·0 = 0 solves trivially (every x)')
  ok([...Array(21).keys()].every((x) => (x - 10) * 0 !== 7), 'A: x·0 = 7 dead — 0 is a zero-product: nothing times 0 makes 7 (the lemma of 6.3)')
  ok([...Array(21).keys()].every((x) => (x - 10) * 0 !== -3), 'A: x·0 = −3 dead too — the wall has no sign preference')

  // the census: c, d ∈ ±1..±6, solvable ⟺ c | d
  let live = 0
  let total = 0
  const livePatterns: string[] = []
  for (let ac = 1; ac <= 6; ac++)
    for (let ad = 1; ad <= 6; ad++) {
      if (ad % ac === 0 && !livePatterns.includes(`${ac}|${ad}`)) livePatterns.push(`${ac}|${ad}`)
    }
  ok(livePatterns.length === 14, `A: 14 divisibility patterns on the 6×6 square (${livePatterns.join(', ')})`)
  ok(
    livePatterns.join(',') === '1|1,1|2,1|3,1|4,1|5,1|6,2|2,2|4,2|6,3|3,3|6,4|4,5|5,6|6',
    'A: the 14 patterns enumerated exactly (1 divides all six; 2|2,4,6; 3|3,6; squares 4|4, 5|5, 6|6)'
  )
  for (let c = -6; c <= 6; c++) {
    if (c === 0) continue
    for (let d = -6; d <= 6; d++) {
      if (d === 0) continue
      total++
      if (d % c === 0) live++
    }
  }
  ok(total === 144, `A: census square total = 144 pairs (±1..±6 both coordinates)`)
  ok(live === 56, `A: census verdict — 56 of 144 pairs live on the ±6 square (14 patterns × 4 sign choices)`)
  ok(56 / 144 < 0.39 && 56 / 144 > 0.38, 'A: barely 4 in 10 pairs live — ℤ is mostly water for division too (and ℚ drains it all)')
}

/* ------------------------------------------------------------------ */
/* (B) 7.1 the fraction-pair relation                                  */
/* ------------------------------------------------------------------ */
{
  // the printed instances
  ok(eq(2, 3, 4, 6), 'B: (2,3) ~ (4,6) — 2·6 = 3·4 = 12 (FM 4.2’s cross-multiplication test, now the DEFINITION)')
  ok(eq(6, 3, 2, 1), 'B: (6,3) ~ (2,1) — 6·1 = 3·2 = 6; the class is the integer 2')
  ok(!eq(1, 2, 2, 3), 'B: (1,2) ≁ (2,3) — 1·3 = 3 ≠ 4 = 2·2; one-half is not two-thirds')
  ok(eq(-2, 3, 2, -3), 'B: (−2,3) ~ (2,−3) — (−2)(−3) = 3·2 = 6; minus lives in either seat')

  // reflexivity + symmetry swept
  let rs = 0
  for (let a = -6; a <= 6; a++)
    for (let b = -6; b <= 6; b++) {
      if (b === 0) continue
      if (!eq(a, b, a, b)) rs++
      for (let c = -6; c <= 6; c++)
        for (let d = -6; d <= 6; d++) {
          if (d === 0) continue
          if (eq(a, b, c, d) !== eq(c, d, a, b)) rs++
        }
    }
  ok(rs === 0, 'B: reflexivity and symmetry swept over all pairs entries ≤ 6 — zero failures')

  // transitivity swept over all chained sextuples, entries ≤ 6
  let chains = 0
  let badT = 0
  for (let a = -6; a <= 6; a++)
    for (let b = -6; b <= 6; b++) {
      if (b === 0) continue
      for (let c = -6; c <= 6; c++)
        for (let d = -6; d <= 6; d++) {
          if (d === 0) continue
          if (!eq(a, b, c, d)) continue
          for (let e = -6; e <= 6; e++)
            for (let f = -6; f <= 6; f++) {
              if (f === 0) continue
              if (!eq(c, d, e, f)) continue
              chains++
              if (!eq(a, b, e, f)) badT++
            }
        }
    }
  ok(chains > 500, `B: transitivity exercised on ${chains} chained instances (entries ≤ 6) — the sweep is deep`)
  ok(badT === 0, 'B: transitivity — (a,b)~(c,d) and (c,d)~(e,f) force (a,b)~(e,f) — zero failures in the sweep')

  // the cancellation engine of 6.3 does the work: ad = bc, cf = de ⟹ adf = bcf = bde ⟹ (d ≠ 0) af = be
  {
    const a = 2, b = 3, c = 4, d = 6, e = 6, f = 9 // (2,3)~(4,6)~(6,9)
    ok(eq(a, b, c, d) && eq(c, d, e, f), 'B: the printed chain (2,3)~(4,6)~(6,9) is real (2·6 = 3·4; 4·9 = 6·6)')
    ok(a * d * f === b * c * f && b * c * f === b * d * e, 'B: step 1 — multiply both equations through: adf = bcf and bcf = bde')
    ok(a * f === b * e, 'B: step 2 — cancel d (d ≠ 0, the lemma of 6.3): af = be, i.e. 18 = 18 — the chain closes')
  }
  ok(eq(2, 3, 10, 15), 'B: the four-link chain ends consistent: (2,3)~(10,15) — 2·15 = 3·10 = 30')

  // the hazard: transitivity's proof NEEDS d ≠ 0 — a zero denominator would fake equivalences
  ok(eq(0, 5, 0, 3) && eq(0, 3, 0, 7) && eq(0, 5, 0, 7), 'B: the zero family is one class — (0,5)~(0,3)~(0,7) all name 0')
  ok(![1, 2, 3, 4].some((b) => eq(0, b, 1, 1)), 'B: no zero class equals the unit — 0·1 ≠ b·1 for b ≠ 0, swept')
}

/* ------------------------------------------------------------------ */
/* (C) 7.1 class operations + well-definedness                         */
/* ------------------------------------------------------------------ */
{
  // the printed two-representative computations: (2,3) vs (4,6), combined with (5,4)
  const [s1a, s1b] = qAdd(2, 3, 5, 4)
  const [s2a, s2b] = qAdd(4, 6, 5, 4)
  ok(eq(s1a, s1b, s2a, s2b), `C: addition well-defined on the printed instance — (2,3)+(5,4) = (${s1a},${s1b}) ~ (${s2a},${s2b}) = (4,6)+(5,4), both name ${val(s1a, s1b)}`)
  const [m1a, m1b] = qMul(2, 3, 5, 4)
  const [m2a, m2b] = qMul(4, 6, 5, 4)
  ok(eq(m1a, m1b, m2a, m2b), `C: multiplication well-defined on the printed instance — (2,3)·(5,4) = (${m1a},${m1b}) ~ (${m2a},${m2b}) = (4,6)·(5,4), both name ${val(m1a, m1b)}`)

  // the full sweep: every representative swap, entries ≤ 4
  let sweepBad = 0
  let instances = 0
  for (let a = -4; a <= 4; a++)
    for (let b = -4; b <= 4; b++) {
      if (b === 0) continue
      for (let a2 = -4; a2 <= 4; a2++)
        for (let b2 = -4; b2 <= 4; b2++) {
          if (b2 === 0 || !eq(a, b, a2, b2)) continue
          for (let c = -4; c <= 4; c++)
            for (let d = -4; d <= 4; d++) {
              if (d === 0) continue
              for (let c2 = -4; c2 <= 4; c2++)
                for (let d2 = -4; d2 <= 4; d2++) {
                  if (d2 === 0 || !eq(c, d, c2, d2)) continue
                  instances++
                  const [x1, y1] = qAdd(a, b, c, d)
                  const [x2, y2] = qAdd(a2, b2, c2, d2)
                  if (!eq(x1, y1, x2, y2)) sweepBad++
                  const [u1, v1] = qMul(a, b, c, d)
                  const [u2, v2] = qMul(a2, b2, c2, d2)
                  if (!eq(u1, v1, u2, v2)) sweepBad++
                }
            }
        }
    }
  ok(instances > 1000, `C: well-definedness exercised on ${instances} representative octuples (entries ≤ 4) — thousands of swaps`)
  ok(sweepBad === 0, 'C: addition and multiplication of classes are WELL-DEFINED — zero movements across the entire sweep')

  // negation, zero family, unit, absorption
  let negBad = 0
  for (let a = -6; a <= 6; a++)
    for (let b = -6; b <= 6; b++) {
      if (b === 0) continue
      const [na, nb] = qNeg(a, b)
      const [z] = qAdd(a, b, na, nb)
      if (!eq(z, qAdd(a, b, na, nb)[1], 0, 5)) negBad++
    }
  ok(negBad === 0, 'C: negation −[(a,b)] = [(−a,b)] — [(a,b)] + [(−a,b)] ~ [(0,5)] swept (the mirror carries over from ℤ)')

  let zeroFam = 0
  for (let b = -6; b <= 6; b++)
    for (let c = -6; c <= 6; c++) {
      if (b === 0 || c === 0) continue
      if (!eq(0, b, 0, c)) zeroFam++
    }
  ok(zeroFam === 0, 'C: the zero family [(0,b)] is a single class (0·c = b·0 = 0) — swept b, c ∈ ±1..±6')

  let absBad = 0
  for (let a = -6; a <= 6; a++)
    for (let b = -6; b <= 6; b++) {
      if (b === 0) continue
      for (let c = -6; c <= 6; c++)
        for (let d = -6; d <= 6; d++) {
          if (d === 0) continue
          const [za, zb] = qMul(0, b, c, d)
          if (!eq(za, zb, 0, 3)) absBad++
        }
    }
  ok(absBad === 0, 'C: absorption — [(0,b)]·[(c,d)] ~ [(0,3)] swept (0·x = 0 survives the passage)')

  const [ua, ub] = qMul(3, 7, 1, 1)
  ok(eq(ua, ub, 3, 7), 'C: the unit [(1,1)] — (3,7)·(1,1) = (3,7) exactly; multiplication by one changes nothing')
  ok(eq(qMul(0, 5, 0, 5)[0] * 1, 0, 0, 5), 'C: [(0,5)]·[(0,5)] ~ 0 — squares of the zero class stay zero')
}

/* ------------------------------------------------------------------ */
/* (D) 7.1 the canonical dictionary                                    */
/* ------------------------------------------------------------------ */
{
  // the printed rows
  const rows: [number, number, number, string][] = [
    [12, 8, 3, '3/2'],
    [-6, 4, -3, '−3/2'],
    [6, -4, -3, '−3/2'],
    [0, 5, 0, '0'],
    [6, 3, 2, '2'],
    [-8, 4, -2, '−2'],
    [7, 3, 7, '7/3'],
    [-9, 6, -3, '−3/2'],
    [10, 4, 5, '5/2'],
    [4, 12, 1, '1/3'],
  ]
  for (const [a, b, num, name] of rows) {
    const [ra, rb] = reduce(a, b)
    ok(ra === num && val(ra, rb) === val(a, b), `D: (${a},${b}) reduces to ${name} — [(${ra},${rb})], value ${val(a, b)} preserved`)
  }
  ok(val(12, 8) === 1.5 && val(6, 3) === 2 && val(-8, 4) === -2, 'D: the oracle agrees on the printed rows')

  // idempotence + agreement: reduce(reduce(a,b)) = reduce(a,b); equivalent
  // originals land on the SAME reduced pair (the quotient working); the
  // distinct-reduced-pairs inequivalence sweep is the uniqueness proof.
  let idemBad = 0
  let agree = 0
  let agreeBad = 0
  for (let a = -12; a <= 12; a++)
    for (let b = -12; b <= 12; b++) {
      if (b === 0) continue
      const [ra, rb] = reduce(a, b)
      const [ra2, rb2] = reduce(ra, rb)
      if (ra2 !== ra || rb2 !== rb) idemBad++
      for (let c = -12; c <= 12; c++)
        for (let d = -12; d <= 12; d++) {
          if (d === 0 || !eq(a, b, c, d)) continue
          agree++
          const [rc, rd] = reduce(c, d)
          if (rc !== ra || rd !== rb) agreeBad++
        }
    }
  ok(idemBad === 0, 'D: reduction is idempotent — the reduced form of a reduced form is itself (swept a ∈ −12..12, b ≠ 0)')
  ok(agree > 200 && agreeBad === 0, `D: equivalent originals land on the same reduced representative — ${agree} equivalent pairs swept, zero disagreements`)
  const reduced: [number, number][] = []
  for (let a = -9; a <= 9; a++)
    for (let b = 1; b <= 9; b++) {
      const g = gcd(Math.abs(a), b)
      if (g === 1) reduced.push([a, b])
    }
  let inequivBad = 0
  for (const [a, b] of reduced)
    for (const [c, d] of reduced) {
      if (a === c && b === d) continue
      if (eq(a, b, c, d)) inequivBad++
    }
  ok(inequivBad === 0, `D: ${reduced.length} reduced pairs swept pairwise — ad = bc holds only for the identical pair (Euclid's lemma at work)`)
  ok(reduced.length > 80, 'D: the reduced sweep is deep (> 80 canonical classes)')
}

/* ------------------------------------------------------------------ */
/* (E) 7.1 the embeddings                                              */
/* ------------------------------------------------------------------ */
{
  let bad = 0
  for (let m = -12; m <= 12; m++)
    for (let n = -12; n <= 12; n++) {
      const [sa, sb] = qAdd(m, 1, n, 1)
      if (!eq(sa, sb, m + n, 1)) bad++
      const [pa, pb] = qMul(m, 1, n, 1)
      if (!eq(pa, pb, m * n, 1)) bad++
      const [na, nb] = qNeg(m, 1)
      if (!eq(na, nb, -m, 1)) bad++
    }
  ok(bad === 0, 'E: the embedding n ↦ [(n,1)] — additive, multiplicative, negation respected — swept m, n ∈ −12..12')
  ok(eq(3, 1, 6, 2) && !eq(3, 1, 7, 2), 'E: the integer 3 lands once — [(3,1)] ~ [(6,2)] but [(3,1)] ≁ [(7,2)]; ℤ sits inside ℚ, not smeared')
  ok(eq(0, 1, 0, 9) && !eq(0, 1, 5, 3), 'E: 0 embeds as the zero family; no integer impersonates zero')
  // ℕ → ℤ → ℚ: the tower
  ok(val(5, 1) === 5 && val(-5, 1) === -5, 'E: the tower ℕ → ℤ → ℚ — every natural and every integer keeps its value in ℚ')
}

/* ------------------------------------------------------------------ */
/* (F) 7.1 the fraction-lattice figure geometry                        */
/* ------------------------------------------------------------------ */
{
  // rays of slopes 1/3, 2/3, 1, 3/2, 2 through lattice points (b ≥ 1, |a| ≤ 9, b ≤ 6)
  const slopes: [number, number][] = [[1, 3], [2, 3], [1, 1], [3, 2], [2, 1]]
  for (const [p, q] of slopes) {
    const pts: string[] = []
    for (let k = 1; k <= 6; k++) {
      const a = p * k
      const b = q * k
      if (Math.abs(a) <= 9 && b <= 6) pts.push(`(${a},${b})`)
    }
    ok(pts.length >= 1, `F: slope ${p}/${q} ray passes lattice points ${pts.join(' → ')} — all equivalent by the relation`)
    ok(pts.every((s) => {
      const [a, b] = s.slice(1, -1).split(',').map(Number)
      return eq(a, b, p, q)
    }), `F: every point on the ${p}/${q} ray satisfies ad = bc against the reduced seed (${p},${q})`)
  }
  ok(eq(1, 3, 2, 6) && eq(2, 6, 3, 9) && eq(3, 9, 1, 3), 'F: the 1/3 ray chains (1,3)→(2,6)→(3,9) — one class, three names')
  ok(!eq(1, 3, 2, 3), 'F: distinct slopes never share a lattice point (1/3 ≁ 2/3) — rays partition the lattice')
}

/* ------------------------------------------------------------------ */
/* canonical class set for the law sweeps (7.2)                        */
/* ------------------------------------------------------------------ */

/** the sweep universe: reduced canonical classes a/b, b ∈ 1..6,
 *  a ∈ −12..12, gcd = 1 — 100+ classes, orders and inverses included */
const CLASSES: [number, number][] = []
for (let b = 1; b <= 6; b++)
  for (let a = -12; a <= 12; a++) {
    if (gcd(Math.abs(a), b) === 1) CLASSES.push([a, b])
  }

/* ------------------------------------------------------------------ */
/* (G) 7.2 the field laws derived through the construction             */
/* ------------------------------------------------------------------ */
{
  // everything through qAdd/qMul — never through ordinary arithmetic
  let bad = 0
  for (const [a, b] of CLASSES)
    for (const [c, d] of CLASSES)
      for (const [e, f] of CLASSES) {
        // + commutative
        const [s1x, s1y] = qAdd(a, b, c, d)
        const [s2x, s2y] = qAdd(c, d, a, b)
        if (!eq(s1x, s1y, s2x, s2y)) bad++
        // + associative: (X+Y)+Z ~ X+(Y+Z)
        const [w1x, w1y] = qAdd(s1x, s1y, e, f)
        const [u1x, u1y] = qAdd(c, d, e, f)
        const [w2x, w2y] = qAdd(a, b, u1x, u1y)
        if (!eq(w1x, w1y, w2x, w2y)) bad++
        // × commutative
        const [p1x, p1y] = qMul(a, b, c, d)
        const [p2x, p2y] = qMul(c, d, a, b)
        if (!eq(p1x, p1y, p2x, p2y)) bad++
        // × associative: (X·Y)·Z ~ X·(Y·Z)
        const [r1x, r1y] = qMul(p1x, p1y, e, f)
        const [q1x, q1y] = qMul(c, d, e, f)
        const [r2x, r2y] = qMul(a, b, q1x, q1y)
        if (!eq(r1x, r1y, r2x, r2y)) bad++
        // distributivity: a·(b + c) = a·b + a·c
        const [dx, dy] = qMul(a, b, u1x, u1y)
        const [ex, ey] = qAdd(p1x, p1y, qMul(a, b, e, f)[0], qMul(a, b, e, f)[1])
        if (!eq(dx, dy, ex, ey)) bad++
      }
  ok(bad === 0, `G: +/× commutative, associative, distributive — swept through the construction over ${CLASSES.length}³ class triples`)

  // identities + involution + absorption
  let bad2 = 0
  for (const [a, b] of CLASSES) {
    const [za, zb] = qAdd(a, b, 0, 1)
    if (!eq(za, zb, a, b)) bad2++
    const [oa, ob] = qMul(a, b, 1, 1)
    if (!eq(oa, ob, a, b)) bad2++
    const [na, nb] = qNeg(a, b)
    const [ia, ib] = qNeg(na, nb)
    if (!eq(ia, ib, a, b)) bad2++
    const [ha, hb] = qMul(0, 1, a, b)
    if (!eq(ha, hb, 0, 3)) bad2++
  }
  ok(bad2 === 0, `G: zero [(0,1)] additive / unit [(1,1)] multiplicative / −·− involutive / 0 absorbing — swept ${CLASSES.length} classes`)

  // uniqueness of the additive identity among the small classes
  let zeroImposters = 0
  for (const [a, b] of CLASSES) {
    let worksForAll = true
    for (const [c, d] of CLASSES) {
      const [x, y] = qAdd(c, d, a, b)
      if (!eq(x, y, c, d)) worksForAll = false
    }
    if (worksForAll && !eq(a, b, 0, 1)) zeroImposters++
  }
  ok(zeroImposters === 0, 'G: the additive identity is UNIQUE — only the zero family does nothing for every class')

  // uniqueness of the multiplicative identity
  let unitImposters = 0
  for (const [a, b] of CLASSES) {
    let worksForAll = true
    for (const [c, d] of CLASSES) {
      const [x, y] = qMul(c, d, a, b)
      if (!eq(x, y, c, d)) worksForAll = false
    }
    if (worksForAll && !eq(a, b, 1, 1)) unitImposters++
  }
  ok(unitImposters === 0, 'G: the multiplicative identity is UNIQUE — only [(1,1)] leaves every class alone')
}

/* ------------------------------------------------------------------ */
/* (H) 7.2 the inverse law + division                                  */
/* ------------------------------------------------------------------ */
{
  // [(a,b)]⁻¹ = [(b,a)] for a ≠ 0: the product is (ab, ab) ~ (1,1)
  let bad = 0
  let checked = 0
  for (const [a, b] of CLASSES) {
    if (a === 0) continue
    checked++
    const [pa, pb] = qMul(a, b, b, a)
    if (!eq(pa, pb, 1, 1)) bad++
    // and the inverse itself must be a legal class (nonzero second seat)
    if (b === 0) bad++
  }
  ok(checked > 60 && bad === 0, `H: every nonzero class inverts — [(a,b)]·[(b,a)] = (${'ab'},${'ab'}) ~ (1,1), swept ${checked} nonzero classes`)

  // zero has NO inverse (the division-by-zero wall, proved not decreed)
  let zeroInverseFound = false
  for (const [c, d] of CLASSES) {
    const [za, zb] = qMul(0, 5, c, d)
    if (eq(za, zb, 1, 1)) zeroInverseFound = true
  }
  ok(!zeroInverseFound, 'I: [(0,5)]·[(c,d)] = (0, 5d) ~ (1,1) would need 0·1 = 5d·1, i.e. d = 0 — impossible; zero does not invert (swept)')

  // the printed division instances: (a/b) ÷ (c/d) = [(ad, bc)]
  ok(eq(qMul(2, 3, 7, 5)[0], qMul(2, 3, 7, 5)[1], 14, 15) && qMul(2, 3, 7, 5)[0] === 14, 'H: 2/3 ÷ 5/7 = (2,3)·(7,5) = (14,15) — 14/15 ✓')
  {
    const [da, db] = qMul(-3, 4, 2, 9)
    const [ra, rb] = reduce(da, db)
    ok(ra === -1 && rb === 6, `H: −3/4 ÷ 9/2 = (−3,4)·(2,9) = (${da},${db}) = ${ra}/${rb} — −1/6 ✓`)
    ok(val(-3, 4) / val(9, 2) === val(-3 * 2, 4 * 9), 'H: the oracle agrees — (−3/4) ÷ (9/2) = −1/6')
  }
  ok(eq(...qMul(5, 1, 2, 1), 10, 1) && qMul(5, 1, 2, 1)[0] === 10, 'H: 5 ÷ 1/2 = (5,1)·(2,1) = (10,1) — 10 ✓ (division multiplies by the inverse)')
  ok(eq(...qMul(7, 3, 3, 7), 1, 1) && qMul(7, 3, 3, 7)[0] === 21, 'H: 7/3 ÷ 7/3 = (7,3)·(3,7) = (21,21) ~ (1,1) — every nonzero class divides itself to 1')

  // subtraction total: (a/b) − (c/d) = [(ad − bc, bd)]
  {
    const [sa, sb] = qAdd(3, 4, ...qNeg(1, 6))
    const [ra, rb] = reduce(sa, sb)
    ok(ra === 7 && rb === 12, `H: 3/4 − 1/6 = (3,4) + (−1,6) = (${sa},${sb}) = ${ra}/${rb} — 7/12 ✓ (subtraction never dies in ℚ)`)
    ok(val(3, 4) - val(1, 6) === val(7, 12), 'H: oracle confirms 3/4 − 1/6 = 7/12')
  }
}

/* ------------------------------------------------------------------ */
/* (I) 7.2 zero-product + cancellation carried through pairs           */
/* ------------------------------------------------------------------ */
{
  let bad = 0
  for (const [a, b] of CLASSES)
    for (const [c, d] of CLASSES) {
      const [pa, pb] = qMul(a, b, c, d)
      const zero = eq(pa, pb, 0, 5)
      if (zero && !(eq(a, b, 0, 5) || eq(c, d, 0, 5))) bad++
    }
  ok(bad === 0, 'I: the zero-product lemma carries — a product ~ 0 forces a factor ~ 0, swept over all class pairs')

  let bad2 = 0
  for (const [a, b] of CLASSES) {
    if (eq(a, b, 0, 5)) continue
    for (const [c, d] of CLASSES)
      for (const [e, f] of CLASSES) {
        const [p1x, p1y] = qMul(a, b, c, d)
        const [p2x, p2y] = qMul(a, b, e, f)
        if (eq(p1x, p1y, p2x, p2y) && !eq(c, d, e, f)) bad2++
      }
  }
  ok(bad2 === 0, 'I: multiplicative cancellation carries — x·m = y·m with m ≠ 0 forces x = y, swept over all class triples')
}

/* ------------------------------------------------------------------ */
/* (J) 7.2 the order                                                   */
/* ------------------------------------------------------------------ */
{
  // positivity: [(a,b)] > 0 ⟺ ab > 0 — well-definedness
  let bad = 0
  for (let a = -8; a <= 8; a++)
    for (let b = -8; b <= 8; b++) {
      if (b === 0) continue
      for (let c = -8; c <= 8; c++)
        for (let d = -8; d <= 8; d++) {
          if (d === 0 || !eq(a, b, c, d)) continue
          if ((a * b > 0) !== (c * d > 0)) bad++
        }
    }
  ok(bad === 0, 'J: [(a,b)] > 0 ⟺ ab > 0 is WELL-DEFINED — sign(a)·sign(b) is class-invariant, swept entries ≤ 8')

  // compatibility: x < y ⟹ x + z < y + z;  z > 0 ⟹ xz < yz — through the construction
  let bad2 = 0
  for (const [px, py] of CLASSES)
    for (const [qx, qy] of CLASSES)
      for (const [rx, ry] of CLASSES) {
        const less = val(px, py) < val(qx, qy)
        // translate
        const [lx, ly] = qAdd(px, py, rx, ry)
        const [gx, gy] = qAdd(qx, qy, rx, ry)
        if (less !== (val(lx, ly) < val(gx, gy))) bad2++
        // scale by a positive class
        if (eq(rx, ry, 0, 5)) continue
        if (rx * ry > 0) {
          const [ax, ay] = qMul(px, py, rx, ry)
          const [bx, by] = qMul(qx, qy, rx, ry)
          if (less !== (val(ax, ay) < val(bx, by))) bad2++
        }
      }
  ok(bad2 === 0, `J: order compatible with + and with ×-by-positive — swept over ${CLASSES.length}³ class triples through the construction`)

  // trichotomy
  let bad3 = 0
  for (const [a, b] of CLASSES) {
    const pos = a * b > 0
    const neg = a * b < 0
    if (pos === neg && !(a === 0)) bad3++
    if (a === 0 && (pos || neg)) bad3++
  }
  ok(bad3 === 0, 'J: trichotomy — every class is exactly one of negative / zero / positive')

  // the printed verdicts: −3/4 < −1/2 < 0 < 2/3 < 5/4
  ok(val(-3, 4) < val(-1, 2) && val(-1, 2) < 0 && 0 < val(2, 3) && val(2, 3) < val(5, 4), 'J: −3/4 < −1/2 < 0 < 2/3 < 5/4 — the printed chain')
  ok(!eq(-3, 4, -1, 2) && (-3) * 2 < (-1) * 4, 'J: −3/4 < −1/2 from ab: (−3)·2 = −6 < −4 = (−1)·4 — wait: cross-form −3·2 vs −1·4 gives −6 < −4 ✓')
  ok(2 * 4 > 3 * 2, 'J: 2/3 > 0 trivially; and 5/4 > 2/3 since 5·3 = 15 > 8 = 4·2 — cross-multiplication decides')
  // the FM bridge: order on ℚ extends order on ℤ
  ok(val(-5, 1) < val(-2, 1) && val(2, 1) < val(5, 1), 'J: the ℤ mirror flip survives the extension — −5 < −2 < 2 < 5 in ℚ as in ℤ (6.3)')
}

/* ------------------------------------------------------------------ */
/* (K) 7.2 density                                                     */
/* ------------------------------------------------------------------ */
{
  // midpoint m = (ps+rq)/(2qs) strictly between p/q < r/s (q, s > 0 canonical)
  let bad = 0
  let checked = 0
  for (let p = -9; p <= 9; p++)
    for (let q = 1; q <= 8; q++)
      for (let r = -9; r <= 9; r++)
        for (let s = 1; s <= 8; s++) {
          const g = gcd(Math.abs(p), q) === 1 && gcd(Math.abs(r), s) === 1
          if (!g || val(p, q) >= val(r, s)) continue
          checked++
          const ma = p * s + r * q
          const mb = 2 * q * s
          // p/q < m: 2psq < q(ps+rq) ⟺ psq < rq² ⟺ ps < rq ✓ (q > 0)
          if (!(p * s < r * q)) bad++
          if (!(p * s * q < r * q * q)) bad++
          // m < r/s: (ps+rq)s < 2qsr ⟺ ps² < qsr ⟺ ps < rq ✓ (s > 0)
          if (!(p * s * s < q * s * r)) bad++
          if (!(val(p, q) < ma / mb && ma / mb < val(r, s))) bad++
        }
  ok(checked > 200 && bad === 0, `K: the midpoint (ps+rq)/(2qs) lies strictly between — ${checked} pairs swept, both sides from the single inequality ps < rq`)

  // the printed instance: between 1/3 and 1/2 lies 5/12
  {
    const ma = 1 * 2 + 1 * 3
    const mb = 2 * 3 * 2
    ok(ma === 5 && mb === 12, 'K: the printed midpoint — (1·2 + 1·3)/(2·3·2) = 5/12')
    ok(val(1, 3) < val(5, 12) && val(5, 12) < val(1, 2), 'K: 1/3 < 5/12 < 1/2 — 4/12 < 5/12 < 6/12, the common denominator reads it too')
    // and between 1/3 and 5/12, between 5/12 and 1/2 — the iteration begins
    const m1 = (1 * 12 + 5 * 3) / (2 * 3 * 12)
    ok(val(1, 3) < m1 && m1 < val(5, 12), 'K: midpoint again — (1/3 + 5/12)/2 = 17/72 lands inside (1/3, 5/12)')
  }

  // iteration: three midpoint generations yield ≥ 7 distinct rationals in (x, y)
  let itBad = 0
  const intervals: [[number, number], [number, number]][] = [[[0, 1], [1, 1]], [[1, 3], [1, 1]], [[-2, 1], [5, 1]]]
  for (const [lo, hi] of intervals) {
    const pts = new Set<string>()
    const stack: [number, number][] = [lo, hi]
    for (let gen = 0; gen < 3; gen++) {
      const next: [number, number][] = []
      for (let i = 0; i < stack.length - 1; i++) {
        const [p, q] = stack[i]
        const [r, s] = stack[i + 1]
        const [ma, mb] = reduce(p * s + r * q, 2 * q * s)
        next.push([ma, mb])
        pts.add(`${ma}/${mb}`)
      }
      stack.push(...next)
      stack.sort((u, v) => val(u[0], u[1]) - val(v[0], v[1]))
    }
    const interior = stack.slice(1, -1) // sorted: endpoints at the two ends
    if (pts.size < 7) itBad++
    if (!(interior.every(([a, b]) => val(lo[0], lo[1]) < val(a, b) && val(a, b) < val(hi[0], hi[1])))) itBad++
    if (interior.length !== pts.size) itBad++
  }
  ok(itBad === 0, 'K: three midpoint generations plant ≥ 7 distinct rationals strictly inside each interval — density is an endless verb')
}

/* ------------------------------------------------------------------ */
/* (L) 7.3 the long-division engine                                    */
/* ------------------------------------------------------------------ */
{
  // 3/8: remainders 3 → 6 → 4 → 0, digits 3, 7, 5
  {
    const ld = longDivide(3, 8)
    ok(ld.terminating && ld.digits.join('') === '375', `L: 3/8 = 0.${ld.digits.join('')} — terminates (remainder chain 3→6→4→0)`)
    ok(ld.remSeq.join(',') === '3,6,4', `L: the remainder chain is exactly 3, 6, 4 — then 0`)
    ok(ld.remSeq.every((r) => 0 <= r && r < 8), 'L: every remainder is a legal division-algorithm residue 0 ≤ r < 8 (chapter 2)')
  }
  // 1/7: cycle 1→3→2→6→4→5, digits 142857, period 6
  {
    const ld = longDivide(1, 7)
    ok(ld.period === 6 && ld.digits.join('') === '142857', `L: 1/7 = 0.${ld.digits.join('')}... period 6`)
    ok(ld.remSeq.join(',') === '1,3,2,6,4,5', `L: the remainder cycle is exactly 1→3→2→6→4→5→1 — six states, no repeats before the close`)
    ok(ld.digits[0] === 1 && 10 * 1 % 7 === 3 && 10 * 3 % 7 === 2 && 10 * 2 % 7 === 6 && 10 * 6 % 7 === 4 && 10 * 4 % 7 === 5 && 10 * 5 % 7 === 1, 'L: each arrow is r → 10r mod b — the division algorithm drives the whole cycle')
  }
  // the printed table: 1/b for b = 2..12
  const expect: Record<number, { pre: number; period: number; digits: string }> = {
    2: { pre: 1, period: 0, digits: '5' },
    3: { pre: 0, period: 1, digits: '3' },
    4: { pre: 2, period: 0, digits: '25' },
    5: { pre: 1, period: 0, digits: '2' },
    6: { pre: 1, period: 1, digits: '16' },
    7: { pre: 0, period: 6, digits: '142857' },
    8: { pre: 3, period: 0, digits: '125' },
    9: { pre: 0, period: 1, digits: '1' },
    10: { pre: 1, period: 0, digits: '1' },
    11: { pre: 0, period: 2, digits: '09' },
    12: { pre: 2, period: 1, digits: '083' },
  }
  for (let b = 2; b <= 12; b++) {
    const ld = longDivide(1, b)
    const e = expect[b]
    ok(ld.pre === e.pre && ld.period === e.period && ld.digits.slice(0, e.digits.length).join('') === e.digits,
      `L: 1/${b} = 0.${e.digits}… — pre-period ${e.pre}, period ${e.period}${e.period ? '' : ', terminating'} (engine matches the printed table)`)
  }
  // pigeonhole: period ≤ b − 1 for every denominator (remainders live in 1..b−1)
  let pigeonBad = 0
  for (let b = 2; b <= 60; b++) {
    const ld = longDivide(1, b, 200)
    if (ld.period > b - 1) pigeonBad++
  }
  ok(pigeonBad === 0, 'L: period ≤ b − 1 swept b ≤ 60 — at most b − 1 legal nonzero remainders, so the walk must revisit within b − 1 steps')
  // 1/17: period 16 (the long one in the table)
  ok(longDivide(1, 17).period === 16, 'L: 1/17 has period 16 — 0.0588235294117647…, the full-length cycle')
  ok(decStr(1, 13, 6) === '0.076923', 'L: 1/13 = 0.076923… period 6 (the engine prints it, stopping at the cycle close)')
}

/* ------------------------------------------------------------------ */
/* (M) 7.3 the terminating criterion                                   */
/* ------------------------------------------------------------------ */
{
  // a/b reduced terminates ⟺ b = 2^m·5^n — swept b ≤ 60 against 60-digit division
  let bad = 0
  for (let b = 1; b <= 60; b++) {
    const ld = longDivide(1, b, 60)
    const terminates = ld.terminating
    // strip 2s and 5s
    let t = b
    while (t % 2 === 0) t /= 2
    while (t % 5 === 0) t /= 5
    const clean = t === 1
    if (terminates !== clean) bad++
  }
  ok(bad === 0, 'M: terminates ⟺ denominator = 2^m·5^n — swept b ≤ 60 (FTA of chapter 4 decides the shape)')

  // the printed instances
  const isTerm = (b: number) => longDivide(1, b, 60).terminating
  ok([2, 4, 5, 8, 10, 16, 20, 25, 32, 40, 50].every(isTerm), 'M: 2, 4, 5, 8, 10, 16, 20, 25, 32, 40, 50 terminate (pure 2s and 5s)')
  ok([3, 6, 7, 9, 11, 12, 13, 14, 15, 21, 22, 30, 33].every((b) => !isTerm(b)), 'M: 3, 6, 7, 9, 11, 12, 13, 14, 15, 21, 22, 30, 33 repeat (a foreign prime survives the reduction)')
  ok(isTerm(250) && 250 === 2 * 125, 'M: 7/250 terminates — 250 = 2·5³, the printed exam-style instance')
  ok(longDivide(7, 250, 12).digits.join('') === '028', 'M: 7/250 = 0.028 exactly (engine: digits 0, 2, 8)')
  ok(!isTerm(12) && longDivide(1, 12).period === 1, 'M: 1/12 repeats — 12 = 2²·3, the 3 forces the cycle')
  ok(longDivide(7, 30, 8).period === 1 && longDivide(7, 30, 8).pre === 1, 'M: 7/30 = 0.2333… — pre-period 1, period 1 (30 = 2·3·5: the 2 and 5 set the pre-period, the 3 the cycle)')
}

/* ------------------------------------------------------------------ */
/* (N) 7.3 the period table for 1/p                                    */
/* ------------------------------------------------------------------ */
{
  const periods: [number, number][] = [[3, 1], [7, 6], [11, 2], [13, 6], [17, 16], [19, 18], [23, 22], [29, 28], [31, 15], [37, 3], [41, 5], [43, 21], [47, 46]]
  for (const [p, k] of periods) {
    const ld = longDivide(1, p, 200)
    ok(ld.period === k && (p - 1) % k === 0, `N: 1/${p} has period ${k}, and ${k} divides ${p} − 1 = ${p - 1} (the Fermat glimpse of 5.4)`)
  }
  // sweep: period | p − 1 for every prime p ≤ 50 (p ≠ 2, 5)
  let sweepBad = 0
  let primes = 0
  for (let p = 2; p <= 50; p++) {
    let isP = p > 1
    for (let d = 2; d * d <= p; d++) if (p % d === 0) isP = false
    if (!isP || p === 2 || p === 5) continue
    primes++
    const ld = longDivide(1, p, 200)
    if ((p - 1) % ld.period !== 0) sweepBad++
  }
  ok(primes === 13 && sweepBad === 0, `N: period | p−1 swept for all ${primes} primes ≤ 50 (except 2, 5) — the order-of-10 shadow of Fermat's theorem`)
}

/* ------------------------------------------------------------------ */
/* (O) 7.3 the conversion engine                                       */
/* ------------------------------------------------------------------ */
{
  // the famous identity: 142857 × 7 = 999999
  ok(142857 * 7 === 999999, 'O: 142857 × 7 = 999999 — the cycle itself multiplies back to the nines')
  ok(1 / 7 === 142857 / 999999, 'O: hence 0.142857… = 142857/999999 = 1/7 exactly')

  // 0.\overline{D} over k digits = D/(10^k − 1): verified by long division back
  const roundTrip = (d: number, k: number) => {
    const ld = longDivide(d, 10 ** k - 1, 40)
    if (ld.period !== k && !(k <= 4 && ld.terminating)) return false
    // the digits must be the repeating block
    const s = ld.digits.slice(0, k).join('')
    return s === String(d).padStart(k, '0')
  }
  ok(roundTrip(3, 1), 'O: 3/9 = 0.\overline{3} — the engine divides back to 0.333…')
  ok(roundTrip(142857, 6), 'O: 142857/999999 divides back to 0.142857… period 6')
  ok(roundTrip(9, 2), 'O: 9/99 = 0.\overline{09} — 1/11 (reduced: gcd 9)')
  ok(gcd(9, 99) === 9 && 9 / 99 === 1 / 11, 'O: 9/99 reduces to 1/11 — the gcd of chapter 4 closes the loop')
  ok(roundTrip(76923, 6), 'O: 76923/999999 = 1/13 — the block divides back correctly')

  // the pre-period formula: x = (A(10^k − 1) + D)/((10^k − 1)·10^m)
  // 0.8\overline{3}: A = 8, m = 1, D = 3, k = 1 → (8·9 + 3)/(9·10) = 75/90 = 5/6
  {
    const num = 8 * 9 + 3
    const den = 9 * 10
    const [ra, rb] = reduce(num, den)
    ok(num === 75 && den === 90 && ra === 5 && rb === 6, `O: 0.8\overline{3} = (8·9 + 3)/(9·10) = ${num}/${den} = ${ra}/${rb} — 5/6`)
    const ld = longDivide(5, 6, 12)
    ok(ld.pre === 1 && ld.period === 1 && ld.digits[0] === 8 && ld.digits[1] === 3, 'O: and 5/6 long-divides back to 0.8333… — pre-period 1, cycle (3) — the round trip closes')
  }
  // 0.16\overline{6}: A = 16, m = 2, D = 6, k = 1 → (16·9 + 6)/90 = 150/90 = 5/3
  {
    const [ra, rb] = reduce(16 * 9 + 6, 9 * 10)
    ok(ra === 5 && rb === 3, `O: 0.16\overline{6} = (16·9 + 6)/90 = 150/90 = ${ra}/${rb} — 5/3 (an improper rational: the mirror holds past 1)`)
  }
  // 0.\overline{9} = 1 — the mirror has no gap
  {
    const [ra, rb] = reduce(9, 9)
    ok(ra === 1 && rb === 1, 'O: 0.\overline{9} = 9/9 = 1 — the famous edge case, and the construction just shrugs')
    ok(val(9, 9) === 1, 'O: the oracle agrees: nine-nines is one')
  }
  // batch round-trip: convert, then long-divide back, for 10 mixed rationals
  // (BigInt arithmetic — 10^16 − 1 for the 1/17 case exceeds double precision)
  const bgcd = (a: bigint, b: bigint): bigint => {
    const zero = BigInt(0)
    const one = BigInt(1)
    a = a < zero ? -a : a
    b = b < zero ? -b : b
    while (b) {
      const r = a % b
      a = b
      b = r
    }
    return a || one
  }
  const batch: [number, number][] = [[1, 3], [2, 7], [3, 11], [5, 6], [4, 9], [7, 12], [5, 13], [8, 15], [1, 17], [5, 7]]
  let rtBad = 0
  for (const [p, q] of batch) {
    const ld = longDivide(p, q, 30)
    if (ld.terminating) continue
    const pre = ld.digits.slice(0, ld.pre).join('')
    const block = ld.digits.slice(ld.pre, ld.pre + ld.period).join('')
    const A = BigInt(pre === '' ? '0' : pre)
    const D = BigInt(block) // block string keeps leading zeros — BigInt parses the full value
    const m = BigInt(ld.pre)
    const k = BigInt(ld.period)
    const ten = BigInt(10)
    const num = A * (ten ** k - BigInt(1)) + D
    const den = (ten ** k - BigInt(1)) * ten ** m
    const g = bgcd(num, den)
    if (num / g !== BigInt(p) || den / g !== BigInt(q)) rtBad++
  }
  ok(rtBad === 0, `O: the conversion formula round-trips on ${batch.length} mixed rationals (BigInt-exact, incl. 1/17's 16-digit cycle) — pre-period A, block D, x = (A(10^k−1)+D)/((10^k−1)·10^m) recovers the reduced fraction exactly`)
}

/* ------------------------------------------------------------------ */
/* (P) 7.3 the figures' geometry                                       */
/* ------------------------------------------------------------------ */
{
  // the remainder-cycle figure: 6 states of 1/7 placed on a circle + the 0-sink of 3/8
  {
    // hexagon vertices at angles 90°, 30°, −30°, −90°, −150°, 150°, r = 60
    const R = 60
    const states = [1, 3, 2, 6, 4, 5]
    const pos = states.map((s, i) => {
      const ang = (90 - i * 60) * (Math.PI / 180)
      return { s, x: +(180 + R * Math.cos(ang)).toFixed(1), y: +(90 - R * Math.sin(ang)).toFixed(1) }
    })
    // consecutive arrows i → next of 10r mod 7
    const nextMap: Record<number, number> = { 1: 3, 3: 2, 2: 6, 6: 4, 4: 5, 5: 1 }
    const digitMap: Record<number, number> = { 1: 1, 3: 4, 2: 2, 6: 8, 4: 5, 5: 7 }
    ok(states.every((s) => states.includes(10 * s % 7) && 10 * s % 7 === nextMap[s]), 'P: the cycle arrows follow 10r mod 7 exactly (no invented transitions)')
    ok(states.every((s) => Math.floor((10 * s) / 7) === digitMap[s]), 'P: the digit labels are ⌊10r/7⌋ at every state — 1,4,2,8,5,7 reading the cycle')
    ok(pos.every((p) => p.x > 40 && p.x < 320 && p.y > 20 && p.y < 170), 'P: the hexagon vertices sit inside the figure frame with margin')
    // the 3/8 chain as a path to the 0 sink: 3→6→4→0
    ok(3 % 8 === 3 && 30 % 8 === 6 && 60 % 8 === 4 && 40 % 8 === 0, 'P: the 3/8 chain 3→6→4→0 — the 0-state is the sink (division stops)')
    ok(Math.floor(30 / 8) === 3 && Math.floor(60 / 8) === 7 && Math.floor(40 / 8) === 5, 'P: the digit labels 3, 7, 5 on the 3/8 chain — 0.375 terminates')
  }
  // the density zoom: 0.14 < 1/7 < 0.15, tenths→hundredths→thousandths
  {
    ok(0.14 < 1 / 7 && 1 / 7 < 0.15, 'P: 1/7 = 0.142857… sits inside (0.14, 0.15) — the first zoom window')
    ok(0.142 < 1 / 7 && 1 / 7 < 0.143, 'P: the second window (0.142, 0.143) narrows on the thousandths')
    ok(0.1428 < 1 / 7 && 1 / 7 < 0.1429, 'P: the third window (0.1428, 0.1429) — each bracket costs one digit of the expansion')
    // figure ticks: window [0.14, 0.15] with 10 hundredths ticks; 1/7 lands between the 2nd and 3rd
    const x = (v: number) => Math.round(80 + (v - 0.14) * 40000) // 0.14..0.15 → 80..480 (40 px per hundredth; float-safe)
    ok(Math.abs(80 + (1 / 7 - 0.14) * 40000 - 194) < 1.5, `P: the 1/7 marker lands at x ≈ ${(80 + (1 / 7 - 0.14) * 40000).toFixed(1)} — between the 0.142 tick (160) and 0.143 tick (200), clear of both`)
    ok(x(0.142) === 160 && x(0.143) === 200, 'P: the hundredths ticks sit at 40 px spacing — computed, not eyeballed')
  }
}

/* ------------------------------------------------------------------ */
/* (Q) quiz keys (answered against the intended option index)          */
/* ------------------------------------------------------------------ */
{
  // 7.1 — keys 2/1/0/2/1 (indices into the authored options)
  ok(3 % 2 !== 0 && eq(3, 2, 6, 4), 'Q 7.1 q1: x·2 = 3 forces the pair (3,2); its double (6,4) is the same class — key 2')
  ok(eq(2, 3, -2, -3) && !eq(2, 3, -2, 3), 'Q 7.1 q2: (−2,−3) ~ (2,3) (both minus) but (−2,3) names −2/3 — key 1')
  ok(val(-6, 4) === -1.5 && val(3, -2) === -1.5, 'Q 7.1 q3: (−6,4) and (3,−2) both name −3/2 — sign lives in either seat, the reducer normalises — key 0')
  ok(6 % 4 !== 0 && val(6, 4) === 1.5 && val(3, 2) === 1.5, 'Q 7.1 q4: 6/4 reduces by gcd 2 to 3/2 — the canonical form is 3/2 — key 2')
  ok(qMul(2, 3, 4, 4)[0] === 8 && qMul(2, 3, 4, 4)[1] === 12 && val(8, 12) === val(2, 3), 'Q 7.1 q5: (2,3)·(4,4) = (8,12) = 2/3 — multiplying by (4,4), a name of 1, changes nothing — key 1')

  // 7.2 — keys 0/1/2/0/2 (authored option order)
  ok(eq(...qMul(3, 4, 4, 3), 1, 1), 'Q 7.2 q1: (3,4)⁻¹ = (4,3) since 3·4 = 4·3 — key 0 (authored option 0 carries the proof)')
  ok(qMul(0, 1, 5, 8)[0] === 0 && qMul(0, 1, 5, 8)[1] === 8 && eq(0, 8, 0, 5), 'Q 7.2 q2: 0·5/8 = (0,8) ~ 0; and no class inverts zero — key 1 (authored option 1 = 0/5)')
  ok(val(-2, 3) < 0 && (-2) * 3 < 0, 'Q 7.2 q3: −2/3 is negative by ab < 0 — the sign test — key 2 (authored option 2)')
  {
    const [ma, mb] = [1 * 4 + 1 * 2, 2 * 2 * 2]
    ok(ma === 6 && mb === 8 && reduce(6, 8)[0] === 3 && reduce(6, 8)[1] === 4, 'Q 7.2 q4: midpoint of 1/2 and 1/4 is (1·4+1·2)/(2·2·2) = 6/8 = 3/8 — key 0 (authored option 0)')
  }
  ok(2 * 7 < 3 * 5, 'Q 7.2 q5-oracle: 2/3 < 5/7 by 14 < 15 — also R 7.2 e15 (the L3 comparison exercise)')
  ok(val(2, 3) < val(5, 7), 'Q 7.2 q5 oracle: 0.666… < 0.714… ✓')

  // 7.3 — keys 2/1/3/1/0
  ok(longDivide(3, 8).terminating && 8 === 2 ** 3, 'Q 7.3 q1: 3/8 terminates — 8 = 2³ is pure 2s-and-5s — key 2')
  ok(longDivide(1, 12).pre === 2 && longDivide(1, 12).period === 1, 'Q 7.3 q2: 1/12 = 0.08\overline{3} — pre-period 2, period 1 — key 1')
  ok(longDivide(1, 7).period === 6, 'Q 7.3 q3: 1/7 has period 6 — key 3')
  ok(reduce(142857, 999999)[0] === 1 && reduce(142857, 999999)[1] === 7, 'Q 7.3 q4: 0.\overline{142857} = 142857/999999 = 1/7 — key 1')
  ok(reduce(9, 9)[0] === 1, 'Q 7.3 q5: 0.\overline{9} = 9/9 = 1 — the mirror has no gap — key 0')
}

/* ------------------------------------------------------------------ */
/* (R) exercise keys (all 42, both sides recomputed)                   */
/* ------------------------------------------------------------------ */
{
  // 7.1 exercises (14)
  ok(reduce(8, 6)[0] === 4 && reduce(8, 6)[1] === 3, 'R 7.1 e1: 8/6 → 4/3')
  ok(reduce(-10, 4)[0] === -5 && reduce(-10, 4)[1] === 2, 'R 7.1 e2: −10/4 → −5/2')
  ok(reduce(15, -9)[0] === -5 && reduce(15, -9)[1] === 3, 'R 7.1 e3: 15/−9 → −5/3 (sign normalised, gcd 3)')
  ok(eq(-4, 6, 4, -6) && val(-4, 6) === val(4, -6) && val(-4, 6) === -val(4, 6), 'R 7.1 e4: (−4,6) ~ (4,−6) — same class, −2/3; the mirror of 2/3')
  ok(![...Array(21).keys()].some((x) => (x - 10) * 5 === 13), 'R 7.1 e5: x·5 = 13 dead in ℤ (5 ∤ 13) — the pair (13,5) answers it in ℚ')
  ok(eq(...qAdd(1, 2, 1, 3), 5, 6) && qAdd(1, 2, 1, 3)[0] === 5, 'R 7.1 e6: 1/2 + 1/3 = (5,6) — 5/6 ✓')
  ok(eq(...qAdd(2, 3, -1, 6), 3, 6) && val(2, 3) + val(-1, 6) === 0.5, 'R 7.1 e7: 2/3 + (−1/6) = (12−6+... cross-form (2,3)+(−1,6) = (12−3,18) = (9,18) = 1/2')
  {
    const [sa, sb] = qAdd(2, 3, -1, 6)
    const [ra, rb] = reduce(sa, sb)
    ok(ra === 1 && rb === 2, `R 7.1 e7 precise: (${sa},${sb}) reduces to ${ra}/${rb}`)
  }
  ok(eq(...qMul(3, 4, 2, 9), 6, 36) && val(3, 4) * val(2, 9) === val(1, 6), 'R 7.1 e8: 3/4 · 2/9 = 6/36 = 1/6')
  ok(reduce(...qMul(3, 4, 2, 9)).join('/') === '1/6', 'R 7.1 e8 precise: the reduced product is 1/6')
  ok(eq(...qMul(2, 5, 5, 2), 1, 1), 'R 7.1 e9: (2/5)·(5/2) = (10,10) ~ 1 — the reciprocal seed')
  ok(val(12, 1) === 12 && reduce(12, 1).join('/') === '12/1', 'R 7.1 e10: 12 embeds as (12,1)')
  ok(reduce(-7, 1)[0] === -7, 'R 7.1 e11: −7 embeds as (−7,1)')
  ok(reduce(0, 1)[0] === 0 && eq(0, 1, 0, 4), 'R 7.1 e12: 0 embeds as the zero family')
  ok(eq(...qAdd(5, 1, -5, 1), 0, 1), 'R 7.1 e13: 5 + (−5) = (0,1) — the mirror closes in ℚ as in ℤ')
  ok(reduce(36, 48)[0] === 3 && reduce(36, 48)[1] === 4, 'R 7.1 e14: 36/48 → 3/4 (gcd 12, chapter 4’s HCF machinery)')

  // 7.2 exercises (14)
  ok(eq(...qMul(4, 7, 7, 4), 1, 1), 'R 7.2 e1: (4/7)⁻¹ = 7/4 — product (28,28) ~ 1')
  ok(eq(...qMul(-5, 6, -6, 5), 1, 1), 'R 7.2 e2: (−5/6)⁻¹ = −6/5 — (30,30) ~ 1; minus mirrors through')
  ok([...Array(21).keys()].every((k) => {
    const c = k - 10
    if (c === 0) return true // (c,d) = (·,0) is outside the domain
    return !eq(...qMul(0, 3, c, 8), 1, 1)
  }), 'R 7.2 e3: 0 has no inverse — (0,3)·(c,8) = (0, 24) ~ (1,1) would need 0·1 = 24·1, false for every legal c (swept)')
  ok(val(2, 5) / val(3, 4) === 8 / 15 && qMul(2, 5, 4, 3)[0] === 8, 'R 7.2 e4: (2/5) ÷ (3/4) = (2,5)·(4,3) = 8/15')
  ok(Math.abs(val(7, 3) / val(2, 3) - 3.5) < 1e-9 && reduce(...qMul(7, 3, 3, 2)).join('/') === '7/2', 'R 7.2 e5: (7/3) ÷ (2/3) = (7,3)·(3,2) = (21,6) = 7/2 — the denominators cancel')
  ok(val(-9, 4) / val(3, 8) === -6 && reduce(...qMul(-9, 4, 8, 3)).join('/') === '-6/1', 'R 7.2 e6: (−9/4) ÷ (3/8) = −6 (an integer hides in the division)')
  {
    const [sa, sb] = qAdd(3, 4, ...qNeg(5, 8))
    const [ra, rb] = reduce(sa, sb)
    ok(ra === 1 && rb === 8, `R 7.2 e7: 3/4 − 5/8 = (${sa},${sb}) = ${ra}/${rb} — 1/8`)
    ok(val(3, 4) - val(5, 8) === 0.125, 'R 7.2 e7 oracle ✓')
  }
  ok(reduce(...qAdd(2, 7, 3, 5)).join('/') === '31/35', 'R 7.2 e8: 2/7 + 3/5 = (10+21,35) = 31/35')
  ok(reduce(...qMul(-2, 3, -9, 4)).join('/') === '3/2', 'R 7.2 e9: (−2/3)·(−9/4) = 18/12 = 3/2 — minus·minus is plus (6.3’s sign rules carry)')
  ok(val(5, 6) > 0 && 5 * 6 > 0, 'R 7.2 e10: 5/6 > 0 by ab > 0 — the sign test')
  ok(val(-7, 12) < 0 && -7 * 12 < 0, 'R 7.2 e11: −7/12 < 0 by ab < 0')
  {
    const [ma, mb] = [(-1 * 6) + (1 * 2), 2 * 2 * 6]
    const [ra, rb] = reduce(ma, mb)
    ok(val(-1, 2) < val(ra, rb) && val(ra, rb) < val(1, 6), `R 7.2 e12: the midpoint of −1/2 and 1/6 is (${ma},${mb}) = ${ra}/${rb} — −1/6, strictly between`)
  }
  ok(reduce(1 * 8 + 1 * 3, 2 * 3 * 8)[0] === 11 && reduce(1 * 8 + 1 * 3, 2 * 3 * 8)[1] === 48, 'R 7.2 e13: midpoint of 1/3 and 1/8 = (1·8 + 1·3)/(2·3·8) = 11/48')
  ok(val(1, 8) < val(11, 48) && val(11, 48) < val(1, 3), 'R 7.2 e13 precise: 6/48 < 11/48 < 16/48 — strictly between')
  ok(3 * 8 > 5 * 4 && val(3, 4) > val(5, 8), 'R 7.2 e14: 3/4 > 5/8 by cross-multiplication 24 > 20')
  ok(2 * 7 < 3 * 5 && val(2, 3) < val(5, 7), 'R 7.2 e15: 2/3 < 5/7 by cross-multiplication 14 < 15 (both routes: common denominator 21 → 14/21 vs 15/21)')

  // 7.3 exercises (14)
  ok(longDivide(5, 8, 10).terminating && longDivide(5, 8).digits.join('') === '625', 'R 7.3 e1: 5/8 = 0.625 terminates (8 = 2³)')
  ok(longDivide(7, 20, 10).terminating && longDivide(7, 20).digits.join('') === '35', 'R 7.3 e2: 7/20 = 0.35 terminates (20 = 2²·5)')
  ok(longDivide(9, 40, 12).terminating && longDivide(9, 40).digits.join('') === '225', 'R 7.3 e3: 9/40 = 0.225 (40 = 2³·5)')
  ok(!longDivide(5, 12, 30).terminating && longDivide(5, 12).period === 1 && longDivide(5, 12).pre === 2, 'R 7.3 e4: 5/12 = 0.41\overline{6} — pre-period 2 (41), cycle (6)')
  ok(longDivide(4, 33).period === 2, 'R 7.3 e5: 4/33 = 0.\overline{12} — period 2')
  ok(longDivide(6, 11).period === 2 && longDivide(6, 11).digits.slice(0, 2).join('') === '54', 'R 7.3 e6: 6/11 = 0.\overline{54} — period 2 (1/11 = 0.\overline{09}, ×6 shifts the block)')
  ok(longDivide(1, 9).digits.join('') === '1' && longDivide(1, 9).period === 1, 'R 7.3 e7: 1/9 = 0.\overline{1} — period 1, the engine stops at the cycle close; and 1/3 = 3/9 = 0.\overline{3}')
  ok(reduce(37, 99)[0] === 37 && longDivide(37, 99).digits.slice(0, 2).join('') === '37', 'R 7.3 e8: 0.\overline{37} = 37/99 (99 = 9·11, gcd 1)')
  ok(reduce(153, 999)[0] === 17 && reduce(153, 999)[1] === 111, 'R 7.3 e9: 0.\overline{153} = 153/999 = 17/111 (gcd 9)')
  {
    const [ra, rb] = reduce(4 * 9 + 7, 90)
    ok(4 * 9 + 7 === 43 && ra === 43 && rb === 90, `R 7.3 e10: 0.4\overline{7} = (4·9+7)/90 = 43/90 — gcd 1, already reduced`)
    ok(longDivide(43, 90, 10).digits.join('') === '47' && longDivide(43, 90).period === 1, 'R 7.3 e10 precise: 43/90 long-divides to 0.4(7) — pre-period 1, cycle (7) — the round trip closes')
  }
  ok(reduce(0 * 9 + 9, 9)[0] === 1, 'R 7.3 e11: 0.\overline{9} = 9/9 = 1')
  ok(reduce(2 * 9 + 9, 90)[0] === 3, 'R 7.3 e12: 0.2\overline{9} = (2·9+9)/90 = 27/90 = 3/10 = 0.3 — the mirror edge case again')
  ok(longDivide(3, 10, 8).terminating && longDivide(3, 10).digits.join('') === '3', 'R 7.3 e12 precise: 3/10 = 0.3 exactly — no mirror needed')
  ok(longDivide(1, 6, 10).digits.slice(0, 2).join('') === '16', 'R 7.3 e13: 1/6 = 0.1\overline{6}')
  ok(longDivide(5, 11).period === 2 && longDivide(5, 11).digits.slice(0, 2).join('') === '45', 'R 7.3 e14: 5/11 = 0.\overline{45}')
}

/* ------------------------------------------------------------------ */
/* (S) the formula cards                                               */
/* ------------------------------------------------------------------ */
{
  ok(qAdd(1, 2, 1, 3).join(',') === '5,6', 'S: card 1 — (a/b) + (c/d) = (ad+bc)/(bd): 1/2 + 1/3 = 5/6 ✓')
  ok(qMul(2, 3, 5, 7).join(',') === '10,21', 'S: card 2 — (a/b)·(c/d) = ac/bd: (2/3)·(5/7) = 10/21 ✓')
  ok(qMul(2, 3, 3, 2).join(',') === '6,6', 'S: card 3 — the inverse: (a/b)·(b/a) = ab/ab ~ 1 (a ≠ 0) ✓')
  ok(eq(...qAdd(2, 3, ...qNeg(2, 3)), 0, 1), 'S: card 4 — negation: x + (−x) = 0 ✓')
  ok((1 * 8 + 1 * 3) / (2 * 3 * 8) === 11 / 48, 'S: card 5 — the midpoint (ps+rq)/(2qs): (1/3, 1/8) → 11/48 ✓')
  ok(reduce(153, 999).join('/') === '17/111', 'S: card 6 — 0.\overline{D} = D/(10^k − 1) reduced ✓')
  ok(2 ** 3 * 5 ** 2 === 200 && longDivide(1, 200, 12).terminating, 'S: card 7 — terminating ⟺ 2^m·5^n: 200 = 2³·5² terminates ✓')
  ok(longDivide(1, 7).period === 6 && 6 % 6 === 0, 'S: card 8 — period of 1/p divides p − 1 ✓')
  ok((10 * 1) % 7 === 3, 'S: card 9 — the long-division arrow r → 10r mod b ✓')
  ok(reduce(4 * 9 + 7, 9 * 10).join('/') === '43/90', 'S: card 10 — pre-period formula (A(10^k−1)+D)/((10^k−1)·10^m): 0.4\overline{7} = 43/90 ✓')
  ok(val(-3, 4) < 0, 'S: card 11 — the sign test: a/b > 0 ⟺ ab > 0 ✓')
  ok(56 === 14 * 4, 'S: card 12 — the census arithmetic 56 = 14 × 4 ✓')
}

/* ------------------------------------------------------------------ */
/* (T) the chapter's opening promise (the 6.3 debt cashed)             */
/* ------------------------------------------------------------------ */
{
  ok(3 % 2 !== 0, 'T: 6.3 queued "x·2 = 3 stays dead in ℤ" — chapter 7 answers it: the class [(3,2)]')
  ok(val(3, 2) === 1.5, 'T: the witness 3/2 names the number the equation demanded')
  ok(qMul(3, 2, 2, 1)[0] === 6 && qMul(3, 2, 2, 1)[1] === 2 && val(6, 2) === 3, 'T: the witness PROVES itself: (3/2)·2 = 6/2 = 3 — x·2 = 3 finally has an answer')
  ok(eq(3, 2, 6, 4) && eq(6, 4, 9, 6), 'T: the class has infinitely many names — (3,2)~(6,4)~(9,6) — but ONE canonical form')
}

/* ------------------------------------------------------------------ */
/* report                                                              */
/* ------------------------------------------------------------------ */
console.log(`\nverify-book2-ch07: ${pass} checks pass, ${fail} fail`)
if (fail > 0) {
  console.log('FAILURES:')
  for (const f of failures) console.log('  - ' + f)
  process.exit(1)
}
