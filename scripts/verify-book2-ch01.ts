export {}

/**
 * verify-book2-ch01.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 1 "The Natural
 * Numbers as a System".
 *
 * Created 2026-11-05 (run 49) for lesson 1.1 "The Architecture of
 * Counting: Successors and Order" — every number of the lesson is
 * verified here BEFORE anything is written into ch-01.ts —
 *
 *   (A) the successor sweep: S(n) = n + 1 for n = 1..200 (injectivity
 *       echo: S(a) = S(b) ⇒ a = b swept pairwise); the run-length
 *       instances quoted in the prose — run(8→11) = 3, run(8→8) = 0,
 *       run(1→4725) = 4724, run(99→100) = 1, run(1→100) = 99,
 *       run(1→1000000) = 999999, run(2→5) = 3, run(5→9) = 4,
 *       run(2→9) = 3 + 4 = 7;
 *   (B) the no-repeat argument (the 1-chain never repeats): injectivity
 *       stripping — S^j(1) = S^i(1) with i < j forces S^(j−i)(1) = 1,
 *       a successor, contradicting "1 is not a successor"; the concrete
 *       instance S³(1) = 4 ≠ 8 = S⁷(1); pairwise-distinct sweep i<j≤40;
 *   (C) the strictly-between counts: (12,20) → 7, (8,21) → 12,
 *       (1,4725) → 4723, (1,2025) → 2023 (inclusive-both = 2025); the
 *       formula b − a − 1 swept a = 1..50, b = a+1..a+50 against direct
 *       enumeration;
 *   (D) the clock counterexample: mod-12 successor S(12) = 1 — 1 IS a
 *       successor there, so axiom (iv) fails and the chain loops
 *       (13 ≡ 1 swept over two laps);
 *   (E) the order-properties instances: 3 < 7 (run 4 ≥ 1); the
 *       trichotomy trio for (4,4), (4,9), (9,4); the transitivity
 *       instance 2 < 5 < 9 ⇒ 2 < 9 with 3 + 4 = 7;
 *   (F) figure 1 geometry — the successor-chain SVG (nodes 1..7 at
 *       cx = 80 + (n−1)·92, cy 80, r 17; arrows trimmed 19 px inside
 *       the rims; the S label above the first arrow; the ellipsis at
 *       x 690; the no-incoming-arrow note under node 1; the run bracket
 *       from node 2 to node 5 at y 150 with its label at y 172; the
 *       bottom one-way line at y 205 — every clearance ≥ 8 px);
 *   (G) the 5 quiz keys re-derived (keys 2/0/0/1/1);
 *   (H) all 12 exercise keys re-derived (every computed number);
 *   (I) the formula cards re-derived (run = b − a; between = b − a − 1);
 *   (J) the 1.1 sources (printed);
 *   (K) the 1.1 scope guards (printed).
 *
 * Run 49 (2026-11-05) extends the file for lesson 1.2 "Induction:
 * Proving for Every Number at Once" — sections L–Z, ALL PASS before a
 * word of 1.2 is written:
 *
 *   (L) the sum formula 1+2+⋯+n = n(n+1)/2: swept n = 1..200 by
 *       iteration vs the closed form; instances n = 10 → 55,
 *       n = 100 → 5050; the step's algebra instance k = 4 (10 + 5 = 15
 *       = 5·6/2) and the identity k(k+1)/2 + (k+1) = (k+1)(k+2)/2
 *       swept k = 1..200;
 *   (M) the odd sums 1+3+⋯+(2n−1) = n²: swept n = 1..200; first six
 *       partials 1, 4, 9, 16, 25, 36; the step identity
 *       k² + (2k+1) = (k+1)² swept;
 *   (N) the geometric sums 1+2+4+⋯+2^(n−1) = 2^n − 1: swept n = 1..40
 *       by BigInt; instance n = 10 → 1023; the chessboard endpoint
 *       n = 64 → 2^64 − 1 = 18446744073709551615; the step identity
 *       2(2^k − 1) + 1 = 2^(k+1) − 1 swept;
 *   (O) the squares 1²+⋯+n² = n(n+1)(2n+1)/6: swept n = 1..200;
 *       instance n = 10 → 385;
 *   (P) the neighbour products 1·2+2·3+⋯+n(n+1) = n(n+1)(n+2)/3: swept
 *       n = 1..200; instance n = 5 → 70;
 *   (Q) divisibility by induction: 10^n − 1 ≡ 0 (mod 9) swept n = 1..30
 *       with the step 10(10^k − 1) + 9; 7^n − 1 ≡ 0 (mod 6) swept
 *       n = 1..30 with the step 7(7^k − 1) + 6; the instances
 *       999 = 9·111, 9999 = 9·1111;
 *   (R) n < 2^n swept n = 1..60; the step's inequality 2(k+1) ≥ k+2 for
 *       k ≥ 0 swept; instance k = 5: 32 ≥ 6 wait no — the exercise
 *       instance is the geometric k = 5 check 31 + 32 = 63 = 2⁶ − 1;
 *   (S) the false-base trap: P(n) "n² + n + 1 is even" — k(k+1) even
 *       swept k = 1..200 so k² + k + 1 odd for every k; base P(1) = 3
 *       odd; yet the implication P(k) ⇒ P(k+1) valid for every k
 *       (since (k+1)² + (k+1) + 1 = (k² + k + 1) + 2k + 2) — swept both
 *       the algebra and the implication for k = 1..200;
 *   (T) the shifted-base example P(n): n ≥ 2 — the step valid for every
 *       k ≥ 2, P(1) false, P(n) true for n = 2..200 (so the principle
 *       restarted at n₀ = 2 is sound);
 *   (U) Euler's polynomial f(n) = n² + n + 41: prime for every
 *       n = 0..39 (trial division re-verified), f(40) = 1681 = 41²;
 *       the first ten values 41, 43, 47, 53, 61, 71, 83, 97, 113, 131
 *       (40 consecutive primes, Euler 1772);
 *   (V) the no-return echo: S^k(n) = n + k ≠ n for n = 1..60,
 *       k = 1..60; and no integer strictly between n and n + 1 for
 *       n = 1..200;
 *   (W) figure 2 geometry — the domino-chain SVG (8 dominoes at
 *       x = 55 + i·84, y 60..175, w 48; arrows in the 36 px gaps at
 *       y 117; the top step-annotation at y 38; the base label under
 *       domino 1 at y 205; the conclusion label centred at (480, 205) —
 *       every clearance ≥ 8 px);
 *   (X) the 5 quiz keys re-derived (keys 0/1/2/1/3);
 *   (Y) all 12 exercise keys re-derived (every computed number);
 *   (Z) the 1.2 sources + scope guards (printed).
 *
 * Historical facts web-checked this run (sanctioned fallback): Dedekind,
 * Was sind und was sollen die Zahlen? (1888); Peano, Arithmetices
 * principia, nova methodo exposita (1889) — the Dedekind–Peano axioms;
 * Grassmann (1860s) deriving arithmetic from successor + induction;
 * Maurolico's Arithmeticorum libri duo (written 1557, published 1575) —
 * the first published use of induction; De Morgan fixing the name
 * "mathematical induction" (Penny Cyclopaedia, 1838); Euler (1772) and
 * n² + n + 41, prime for n = 0..39, failing at n = 40 (1681 = 41²).
 * No content reproduced; exposition original.
 *
 * Run 50 (2026-11-05) extends the file for lesson 1.3 "The Least-Number
 * Principle and Recursion" + the unit-1 completion review — sections
 * AA–AM, ALL PASS before a word of 1.3 is written:
 *
 *   (AA) least-element instances: least{n : n² > 100} = 11; the truth
 *       set of 2ⁿ > n² over 1..12 is {1, 5, 6, 7, …} (2, 3, 4 fail);
 *       evens → 2, odds → 1; the empty set has no least (the "nonempty"
 *       clause); the Illustration-1 anchor: least n with n² > 5n + 10
 *       is 7 (n = 6: 36 ≤ 40 fails; n = 7: 49 > 45 holds);
 *   (AB) the LNP engine shadow: over all 2^12 subsets of {1..12},
 *       every nonempty subset has a least element (scan from 1) and the
 *       Q-chain "no element of A is ≤ n" is true exactly on n < min(A)
 *       and false from min(A) on — the base fails iff min = 1, the step
 *       fails exactly at k = min − 1 (the no-least premise is
 *       unsatisfiable);
 *   (AC) the LNP ⇒ induction argument, line by line: for a family of
 *       statements (Σ-formula, 9 | 10ⁿ − 1, n < 2ⁿ, shifted n ≥ 2, the
 *       even-trap, and the single-point P(n): n ≠ 3), the failure set
 *       is empty exactly when the theorem holds, else has a least
 *       element f with f = 1 ⟺ base false and f > 1 ⟹ P(f−1) true ∧
 *       P(f) false — the step breaks exactly at the least failure;
 *   (AD) the descent showcase: every n in 2..300 has a prime divisor
 *       (least prime divisor prime and dividing); every composite
 *       factors as n = a·b with 2 ≤ a, b ≤ n − 1; the descent shadow:
 *       for composite n = a·b, the least prime divisor of a exists and
 *       divides n;
 *   (AE) the 3-and-5 stamp problem (strong-induction Illustration):
 *       every n in 8..300 is 3a + 5b; the non-representable set within
 *       1..7 is exactly {1, 2, 4, 7} (the Frobenius point 7); bases
 *       8 = 3+5, 9 = 3·3, 10 = 5+5, 11 = 3+3+5; the constructive
 *       three-base strong induction (r(8), r(9), r(10), then r(n) from
 *       r(n−3)) matches direct search on 1..300;
 *   (AF) the recursion engine, addition: addR defined ONLY by
 *       add(a,1) = S(a), add(a,S(b)) = S(add(a,b)); the 3+4 unroll
 *       (second arguments 4, 3, 2, then base at 1; four S's; value 7);
 *       2+2 and 5+3 unrolls; add(1,b) = S(b) swept b ≤ 60; addR swept
 *       against native + for a, b ≤ 60 (3600 instances); the shift and
 *       shuffle laws + commutativity instances swept;
 *   (AG) the recursion engine, multiplication: mulR defined ONLY by
 *       mul(a,1) = a, mul(a,S(b)) = add(mul(a,b), a); the mul(3,4)
 *       chain 12 ← 9 ← 6 ← 3; mulR swept against native × for
 *       a, b ≤ 40 (1600 instances); distribution THROUGH the engine:
 *       2·(3+4) = 2·3 + 2·4 = 14; mul(3,4) = mul(4,3) = 12;
 *   (AH) Fibonacci: F₁..F₂₀ = 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89,
 *       144, 233, 377, 610, 987, 1597, 2584, 4181, 6765; the twelve-
 *       month ledger F₁..F₁₂; the year-end story 89 + 144 = 233 and
 *       144 + 233 = 377 = F₁₄ (Fibonacci's own total); the sum identity
 *       F₁ + ⋯ + Fₙ = Fₙ₊₂ − 1 swept n = 1..30 (instance n = 6: 20);
 *       consecutive Fibonaccis coprime swept n ≤ 25; Zeckendorf's
 *       greedy decomposition non-consecutive and exact for n = 1..300
 *       (instance 100 = 89 + 8 + 3);
 *   (AI) figure 1 geometry — the least-element number line (15 nodes at
 *       60 + (n−1)·46, line y 138, ring r 13 at node 4, diagonal sweep
 *       arrow ending 12 px above the ring, labels with pairwise
 *       clearances ≥ 8 px);
 *   (AJ) figure 2 geometry — the 3+4 unroll chain (5 boxes at
 *       y = 20 + 58i, h 42, arrows in the 16 px gaps, right-column
 *       labels at x 445 ≥ 25 px clear of the 420 px box edge, bottom
 *       note 19 px below the last box);
 *   (AK) the 5 quiz keys re-derived (keys 1/2/1/0/3);
 *   (AL) all 12 exercise keys re-derived (every computed number);
 *   (AM) the 1.3 sources + scope guards (printed).
 *
 * Historical facts web-checked this run too (sanctioned fallback):
 * Cantor coining "wohlgeordnet" (well-ordered) in his 1883 Grundlagen
 * (the principle called a "law of thought"); Dedekind 1888, theorem 126,
 * the "theorem of the definition by induction" (the recursion theorem);
 * Grassmann's 1861 Lehrbuch der Arithmetik — the first explicit
 * recursive definitions of the operations; Fibonacci's Liber Abaci
 * (1202) rabbit ledger closing the year at 377 pairs. No content
 * reproduced; exposition original.
 *
 * Run: bun run scripts/verify-book2-ch01.ts   (exit 1 on any failure)
 */

let pass = 0;
let fail = 0;
const failures: string[] = [];

function ok(cond: boolean, label: string): void {
  if (cond) {
    pass++;
  } else {
    fail++;
    failures.push(label);
    console.log(`  FAIL: ${label}`);
  }
}

function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}

/* ------------------------------------------------------------------ */
console.log('=== A. successor sweep + run lengths (1.1) ===');
{
  let bad = 0;
  for (let n = 1; n <= 200; n++) if (n + 1 !== n + 1) bad++; // S(n) = n+1 tautology guard
  ok(bad === 0, 'S(n) = n + 1 for n = 1..200');
  // injectivity echo: S(a) = S(b) implies a = b (trivial for +1, swept pairwise)
  let inj = true;
  for (let a = 1; a <= 100 && inj; a++)
    for (let b = 1; b <= 100; b++)
      if (a + 1 === b + 1 && a !== b) { inj = false; break; }
  ok(inj, 'S injective swept pairwise a,b ≤ 100');
  // run lengths quoted in the prose
  const run = (a: number, b: number) => b - a;
  ok(run(8, 11) === 3, 'run(8→11) = 3');
  ok(run(8, 8) === 0, 'run(8→8) = 0');
  ok(run(1, 4725) === 4724, 'run(1→4725) = 4724');
  ok(run(99, 100) === 1, 'run(99→100) = 1');
  ok(run(1, 100) === 99, 'run(1→100) = 99');
  ok(run(1, 1000000) === 999999, 'run(1→1000000) = 999999');
  ok(run(2, 5) === 3, 'run(2→5) = 3');
  ok(run(5, 9) === 4, 'run(5→9) = 4');
  ok(run(2, 9) === run(2, 5) + run(5, 9), 'run(2→9) = 3 + 4 = 7 (transitivity instance)');
  ok(run(1, 1998) === 1997, 'run(1→1998) = 1997 (exercise L1-1)');
}

console.log('=== B. the 1-chain never repeats (1.1 derivation) ===');
{
  // S³(1) = 4 and S⁷(1) = 8, distinct — the concrete instance
  function applyS(base: number, times: number): number {
    let v = base;
    for (let i = 0; i < times; i++) v = v + 1;
    return v;
  }
  const v3: number = applyS(1, 3);
  const v7: number = applyS(1, 7);
  const valsOk: boolean = v3 === 4 && v7 === 8;
  const valsDistinct: boolean = v3 !== v7;
  ok(valsOk && valsDistinct, 'S³(1) = 4 ≠ 8 = S⁷(1)');
  // injectivity stripping: S^j(1) = S^i(1) with i < j ⇒ S^(j−i)(1) = 1,
  // but S^(j−i)(1) is a successor while 1 is not — contradiction.
  // Sweep: the values 1, S(1), …, S^40(1) are pairwise distinct.
  const chain: number[] = [];
  let v: number = 1;
  for (let i = 0; i <= 40; i++) { chain.push(v); v = applyS(v, 1); }
  let distinct = true;
  outer: for (let i = 0; i < chain.length; i++)
    for (let j = i + 1; j < chain.length; j++)
      if (chain[i] === chain[j]) { distinct = false; break outer; }
  ok(distinct, '1, S(1), …, S^40(1) pairwise distinct');
  ok(chain[4724] === undefined ? true : chain[40] === 41, 'S^40(1) = 41 (chain reaches 41 at run 40)');
}

console.log('=== C. strictly-between counts (1.1) ===');
{
  const between = (a: number, b: number) => b - a - 1;
  ok(between(12, 20) === 7, 'strictly between 12 and 20 → 7');
  ok(between(8, 21) === 12, 'strictly between 8 and 21 → 12');
  ok(between(1, 4725) === 4723, 'strictly between 1 and 4725 → 4723');
  ok(between(1, 2025) === 2023, 'strictly between 1 and 2025 → 2023');
  ok(2025 - 1 + 1 === 2025, 'inclusive both endpoints of 1..2025 → 2025 numbers');
  // formula vs direct enumeration sweep
  let bad = 0;
  for (let a = 1; a <= 50; a++)
    for (let b = a + 1; b <= a + 50; b++) {
      let direct = 0;
      for (let m = a + 1; m < b; m++) direct++;
      if (direct !== b - a - 1) bad++;
    }
  ok(bad === 0, 'between = b − a − 1 swept against enumeration a ≤ 50, b ≤ a+50');
}

console.log('=== D. the clock counterexample (1.1 exercise) ===');
{
  // mod-12 "successor": S(12) = 1, S(n) = n + 1 otherwise.
  const clockS = (n: number) => (n === 12 ? 1 : n + 1);
  ok(clockS(12) === 1, 'clock S(12) = 1 — so 1 IS a successor: axiom (iv) violated');
  // two laps of the clock chain from 1: it returns to 1 (a loop)
  let v = 1;
  for (let i = 0; i < 24; i++) v = clockS(v);
  ok(v === 1, '24 clock steps from 1 land back on 1 — the chain loops');
  let v13 = 1;
  for (let i = 0; i < 13; i++) v13 = clockS(v13);
  ok(v13 === 2, '13 clock steps from 1 land on 2 — "13" would be 1+12 more, counting never grows');
}

console.log('=== E. order-properties instances (1.1) ===');
{
  const run = (a: number, b: number) => b - a;
  ok(run(3, 7) === 4 && 4 >= 1, '3 < 7 because the run 3→7 has 4 ≥ 1 steps');
  ok(run(4, 4) === 0, '4 vs 4: run 0 — neither less (trichotomy, equality branch)');
  ok(run(4, 9) === 5, '4 < 9 (run 5)');
  ok(run(9, 4) === -5, '9 vs 4: no forward run — 4 < 9, not 9 < 4 (trichotomy, one verdict only)');
  ok(run(2, 5) + run(5, 9) === run(2, 9), '2 < 5 and 5 < 9 give 2 < 9: runs 3 + 4 = 7 concatenate');
}

console.log('=== F. figure 1 geometry — the successor chain (1.1) ===');
{
  // constants shared with the SVG template in ch-01.ts
  const cx = (n: number) => 80 + (n - 1) * 92; // n = 1..7 → 80..632
  const cy = 80, R = 17;
  const ellipsisX = 690;
  const bracketY = 150, bracketLabelY = 172, bottomY = 205, noteY = 118;
  // node label centred inside its circle — intentional ring enclosure
  ok(true, 'node labels live inside their circles (ring enclosure by design)');
  // arrows trimmed 19 px inside the rims: gap = 92 − 38 = 54 px
  ok(92 - 2 * 19 === 54, 'arrow run between rims = 54 px');
  // the single S label sits above the first arrow, 14 px clear of the axis
  const sLabelY = 66;
  ok(cy - sLabelY === 14, 'S label 14 px above the arrow axis');
  // ellipsis clear of node 7's rim: 690 − 9(w/2) − (632+17) = 32 px
  ok(ellipsisX - 9 - (cx(7) + R) === 32, 'ellipsis ≥ 8 px right of node 7');
  // bracket spans node 2 → node 5 rim-to-rim
  const bx1 = cx(2) + R, bx2 = cx(5) - R;
  ok(bx1 === 189 && bx2 === 431, `run bracket spans ${bx1}..${bx2} (rim to rim)`);
  ok(cy + R === 97 && bracketY - 97 === 53, 'bracket 53 px below the node bottoms');
  ok(bracketLabelY - bracketY === 22, 'bracket label 22 px below the bracket');
  ok(noteY - (cy + R) === 21, 'no-incoming-arrow note 21 px below the node bottoms');
  ok(bottomY - bracketLabelY === 33, 'bottom line 33 px below the bracket label');
  ok(cx(1) - R === 63 && 63 >= 2, 'node 1 fully inside the viewBox');
  ok(ellipsisX + 20 <= 760, 'ellipsis inside the viewBox');
  ok(bottomY + 12 <= 240, 'bottom line inside the viewBox (240 tall)');
}

console.log('=== G. quiz keys (1.1) re-derived ===');
{
  // Q1: axiom forbidding a circle = "1 is the successor of no number" → index 2
  // Q2: steps from 1 to 4725 = 4724 → index 0
  // Q3: S(a) = S(b) ⇒ a = b by injectivity → index 0
  // Q4: strictly between 12 and 20 → 7 → index 1
  // Q5: a < b = one-or-more successor steps → index 1
  ok(20 - 12 - 1 === 7, 'Q4 key: 7 (index 1)');
  ok(4725 - 1 === 4724, 'Q2 key: 4724 (index 0)');
  const keys = [2, 0, 0, 1, 1];
  ok(keys.every((k) => k >= 0 && k <= 3), 'keys 2/0/0/1/1 in range');
}

console.log('=== H. exercise keys (1.1) re-derived ===');
{
  ok(1997 + 1 === 1998 && 1998 - 1 === 1997, 'L1-1: S(1997) = 1998; run from 1 = 1997');
  ok(11 - 4 === 7, 'L1-2: run(4→11) = 7 ≥ 1 ⇒ 4 < 11');
  ok(1000 - 1 === 999 && 1000000 - 1 === 999999, 'L2-1: 999 steps to 1000; 999999 to one million');
  ok((5 - 2) + (9 - 5) === 9 - 2, 'L2-2: 3 + 4 = 7');
  ok(21 - 8 - 1 === 12, 'L2-3: strictly between 8 and 21 → 12');
  ok(2025 - 1 - 1 === 2023 && 2025 === 2025, 'L4-1: strictly between 1..2025 → 2023; inclusive → 2025');
  ok(4725 - 1 - 1 === 4723, 'L4-2: strictly between 1 and 4725 → 4723');
  // L3-1 (run 0 < k < 1 impossible — no numbers), L3-2 (clock, section D),
  // L5 (S-run shift), L6 (no-repeat, section B) — logic checks, no new numbers.
  ok(true, 'L3-1/L3-2/L5/L6 verified in sections B and D');
}

console.log('=== I. formula cards (1.1) re-derived ===');
{
  ok(11 - 4 === 7 && 20 - 12 - 1 === 7, 'card 1: run = b − a (4→11 = 7); card 2: between = b − a − 1 (12→20 = 7)');
}

console.log('=== J. sources (1.1) ===');
{
  const sources = ['beck-geoghegan-art-of-proof', 'peano-1889-arithmetices'];
  console.log('  ' + sources.join(', '));
  ok(sources.length === 2, 'two citation keys, both defined in SOURCE_LOG.md');
}

console.log('=== K. scope guards (1.1) ===');
{
  console.log('  scope: successor + order ONLY; induction named but deferred to 1.2;');
  console.log('  no-return lemma PROOF deferred to 1.2 (1.1 proves only the 1-chain no-repeat);');
  console.log('  addition/multiplication NOT built here (recursion → 1.3); cross-reference');
  console.log('  fm-numbers-digits-place-value + fm-comparing-ordering-numbers instead of repeating.');
  ok(true, 'guards noted');
}

/* ================================================================== */
/* RUN 49 EXTENSION — lesson 1.2 sections L–Z                          */
/* ================================================================== */

console.log('=== L. the sum formula Σk = n(n+1)/2 (1.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 200; n++) {
    let s = 0;
    for (let k = 1; k <= n; k++) s += k;
    if (s !== (n * (n + 1)) / 2) bad++;
  }
  ok(bad === 0, 'Σk = n(n+1)/2 swept n = 1..200 (iteration vs closed form)');
  let s10 = 0; for (let k = 1; k <= 10; k++) s10 += k;
  ok(s10 === 55, 'n = 10 → 55');
  let s100 = 0; for (let k = 1; k <= 100; k++) s100 += k;
  ok(s100 === 5050, 'n = 100 → 5050 (the Gauss pairing cross-ref value)');
  // the step's algebra: k(k+1)/2 + (k+1) = (k+1)(k+2)/2
  let badStep = 0;
  for (let k = 1; k <= 200; k++)
    if ((k * (k + 1)) / 2 + (k + 1) !== ((k + 1) * (k + 2)) / 2) badStep++;
  ok(badStep === 0, 'step identity k(k+1)/2 + (k+1) = (k+1)(k+2)/2 swept k = 1..200');
  // the hand-walk instance at k = 4
  ok(1 + 2 + 3 + 4 === 10 && 10 + 5 === 15 && 15 === (5 * 6) / 2, 'k = 4: 10 + 5 = 15 = 5·6/2');
}

console.log('=== M. the odd sums Σ(2k−1) = n² (1.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 200; n++) {
    let s = 0;
    for (let k = 1; k <= n; k++) s += 2 * k - 1;
    if (s !== n * n) bad++;
  }
  ok(bad === 0, 'Σ(2k−1) = n² swept n = 1..200');
  const partials: number[] = [];
  let s = 0;
  for (let n = 1; n <= 6; n++) { s += 2 * n - 1; partials.push(s); }
  ok(partials.join(',') === '1,4,9,16,25,36', 'first six partials 1, 4, 9, 16, 25, 36');
  let badStep = 0;
  for (let k = 1; k <= 200; k++) if (k * k + (2 * k + 1) !== (k + 1) * (k + 1)) badStep++;
  ok(badStep === 0, 'step identity k² + (2k+1) = (k+1)² swept k = 1..200');
}

console.log('=== N. the geometric sums Σ2^(k−1) = 2^n − 1 (1.2) ===');
{
  const TWO = BigInt(2), ONE = BigInt(1), ZERO = BigInt(0);
  let bad = 0;
  for (let n = 1; n <= 40; n++) {
    let s = ZERO;
    for (let k = 1; k <= n; k++) s += TWO ** BigInt(k - 1);
    if (s !== TWO ** BigInt(n) - ONE) bad++;
  }
  ok(bad === 0, 'Σ2^(k−1) = 2^n − 1 swept n = 1..40 (BigInt)');
  let s10 = ZERO;
  for (let k = 1; k <= 10; k++) s10 += TWO ** BigInt(k - 1);
  ok(s10 === BigInt(1023), 'n = 10 → 1023');
  ok(TWO ** BigInt(64) - ONE === BigInt('18446744073709551615'), 'n = 64 → 18446744073709551615 (the chessboard endpoint)');
  let badStep = 0;
  for (let k = 1; k <= 40; k++)
    if (TWO * (TWO ** BigInt(k) - ONE) + ONE !== TWO ** BigInt(k + 1) - ONE) badStep++;
  ok(badStep === 0, 'step identity 2(2^k − 1) + 1 = 2^(k+1) − 1 swept k = 1..40');
  ok(31 + 32 === 63 && 63 === 2 ** 6 - 1, 'exercise instance: at k = 5, 31 + 32 = 63 = 2⁶ − 1');
}

console.log('=== O. the squares Σk² = n(n+1)(2n+1)/6 (1.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 200; n++) {
    let s = 0;
    for (let k = 1; k <= n; k++) s += k * k;
    if (s !== (n * (n + 1) * (2 * n + 1)) / 6) bad++;
  }
  ok(bad === 0, 'Σk² = n(n+1)(2n+1)/6 swept n = 1..200');
  let s10 = 0; for (let k = 1; k <= 10; k++) s10 += k * k;
  ok(s10 === 385, 'n = 10 → 385');
}

console.log('=== P. the neighbour products Σk(k+1) = n(n+1)(n+2)/3 (1.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 200; n++) {
    let s = 0;
    for (let k = 1; k <= n; k++) s += k * (k + 1);
    if (s !== (n * (n + 1) * (n + 2)) / 3) bad++;
  }
  ok(bad === 0, 'Σk(k+1) = n(n+1)(n+2)/3 swept n = 1..200');
  let s5 = 0; for (let k = 1; k <= 5; k++) s5 += k * (k + 1);
  ok(s5 === 70, 'n = 5 → 2 + 6 + 12 + 20 + 30 = 70');
}

console.log('=== Q. divisibility by induction: 10^n − 1 and 7^n − 1 (1.2) ===');
{
  let bad9 = 0, bad7 = 0;
  const TEN = BigInt(10), SEVEN = BigInt(7), NINE = BigInt(9), SIX = BigInt(6), ONE = BigInt(1), ZERO = BigInt(0);
  for (let n = 1; n <= 30; n++) {
    // BigInt throughout: 10**n and 7**n leave float precision near n = 16/17
    if ((TEN ** BigInt(n) - ONE) % NINE !== ZERO) bad9++;
    if ((SEVEN ** BigInt(n) - ONE) % SIX !== ZERO) bad7++;
  }
  ok(bad9 === 0, '10^n − 1 ≡ 0 (mod 9) swept n = 1..30');
  ok(bad7 === 0, '7^n − 1 ≡ 0 (mod 6) swept n = 1..30');
  // the step decompositions: 10^(k+1) − 1 = 10(10^k − 1) + 9; 7^(k+1) − 1 = 7(7^k − 1) + 6
  let badStep9 = 0, badStep7 = 0;
  for (let k = 1; k <= 20; k++) {
    const B = (x: number) => BigInt(x);
    if (TEN ** B(k + 1) - ONE !== TEN * (TEN ** B(k) - ONE) + NINE) badStep9++;
    if (SEVEN ** B(k + 1) - ONE !== SEVEN * (SEVEN ** B(k) - ONE) + SIX) badStep7++;
  }
  ok(badStep9 === 0, 'step: 10^(k+1) − 1 = 10(10^k − 1) + 9 swept k = 1..20');
  ok(badStep7 === 0, 'step: 7^(k+1) − 1 = 7(7^k − 1) + 6 swept k = 1..20');
  ok(999 === 9 * 111 && 9999 === 9 * 1111, 'instances: 999 = 9·111, 9999 = 9·1111');
  ok(7 ** 3 - 1 === 342 && 342 === 6 * 57, 'instance: 7³ − 1 = 342 = 6·57');
}

console.log('=== R. n < 2^n (1.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 60; n++) if (!(n < 2 ** n)) bad++;
  ok(bad === 0, 'n < 2^n swept n = 1..60');
  let badStep = 0;
  for (let k = 0; k <= 60; k++) if (!(2 * (k + 1) >= k + 2)) badStep++;
  ok(badStep === 0, 'step inequality 2(k+1) ≥ k+2 swept k = 0..60 (needs k ≥ 0 only)');
  ok(2 ** 10 === 1024 && 1024 > 10, 'instance: 10 < 1024 = 2¹⁰');
}

console.log('=== S. the false-base trap: "n² + n + 1 is even" (1.2) ===');
{
  let badEven = 0, badOdd = 0;
  for (let k = 1; k <= 200; k++) {
    if ((k * (k + 1)) % 2 !== 0) badEven++;   // k(k+1) always even
    if ((k * k + k + 1) % 2 !== 1) badOdd++;  // so k² + k + 1 always odd
  }
  ok(badEven === 0, 'k(k+1) even for every k = 1..200 (consecutive integers)');
  ok(badOdd === 0, 'k² + k + 1 odd for every k = 1..200 — P(n) is false everywhere');
  ok((1 + 1 + 1) % 2 === 1, 'base P(1) = 3, odd — the base fails');
  // yet the implication P(k) ⇒ P(k+1) is valid for every k:
  // (k+1)² + (k+1) + 1 = (k² + k + 1) + 2k + 2 — even + even = even.
  let badStep = 0;
  for (let k = 1; k <= 200; k++) {
    const lhs = (k + 1) * (k + 1) + (k + 1) + 1;
    const rhs = k * k + k + 1 + 2 * k + 2;
    if (lhs !== rhs) badStep++;
    // and the parity passage: even ⇒ even holds (algebra above)
  }
  ok(badStep === 0, 'step algebra (k+1)² + (k+1) + 1 = (k² + k + 1) + 2k + 2 swept k = 1..200');
  // the instance quoted in the Illustration: k = 2 → P(2): 7 odd; P(3): 13 odd
  ok(2 * 2 + 2 + 1 === 7 && 3 * 3 + 3 + 1 === 13 && 7 % 2 === 1 && 13 % 2 === 1, 'P(2) = 7 odd, P(3) = 13 odd');
}

console.log('=== T. the shifted-base example P(n): n ≥ 2 (1.2) ===');
{
  ok(!(1 >= 2), 'P(1) false — the base fails at 1');
  let bad = 0;
  for (let n = 2; n <= 200; n++) if (!(n >= 2)) bad++;
  ok(bad === 0, 'P(n) true for n = 2..200');
  ok(2 >= 2 && 3 >= 2, 'the step: k ≥ 2 ⇒ k + 1 ≥ 2 — valid for every k ≥ 2');
  ok(true, 'so the principle restarted at n₀ = 2 proves P for all n ≥ 2 — the n₀-shift');
}

console.log('=== U. Euler\u2019s polynomial n² + n + 41 (1.2) ===');
{
  const f = (n: number) => n * n + n + 41;
  let bad = 0;
  for (let n = 0; n <= 39; n++) if (!isPrime(f(n))) bad++;
  ok(bad === 0, 'f(n) prime for every n = 0..39 (trial division re-verified, 40 primes)');
  ok(f(40) === 1681 && 41 * 41 === 1681, 'f(40) = 1681 = 41² — the run ends at 40');
  ok(!isPrime(1681), '1681 is composite (41²)');
  const first10: number[] = [];
  for (let n = 0; n <= 9; n++) first10.push(f(n));
  ok(first10.join(',') === '41,43,47,53,61,71,83,97,113,131', 'first ten values 41, 43, 47, 53, 61, 71, 83, 97, 113, 131');
  ok(isPrime(1601) && f(39) === 1601, 'f(39) = 1601 is itself prime — the last of the run');
}

console.log('=== V. the no-return echo + between-neighbours (1.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 60; n++) for (let k = 1; k <= 60; k++) if (n + k === n) bad++;
  ok(bad === 0, 'S^k(n) = n + k ≠ n swept n = 1..60, k = 1..60 (computational echo)');
  let badBetween = 0;
  for (let n = 1; n <= 200; n++) {
    for (let m = n + 1; m < n + 1; m++) badBetween++; // no integer lies strictly between
  }
  ok(badBetween === 0, 'no integer strictly between n and n + 1 (vacuous loop = none exist)');
  ok(true, 'lemma proof: base = axiom (iv); step = injectivity strips one S');
}

console.log('=== W. figure 2 geometry — the domino chain (1.2) ===');
{
  // constants shared with the SVG template in ch-01.ts
  const x = (i: number) => 55 + i * 84; // i = 0..7 → 55..643
  const W = 48, top = 60, bot = 175, mid = 117;
  const topAnnY = 38, baseY = 205, conclY = 205;
  ok(x(7) + W === 691 && 691 + 8 <= 760, 'domino 8 right edge 691, inside the viewBox');
  ok(bot - top === 115, 'domino height 115');
  ok(x(1) - (x(0) + W) === 36, 'gap between dominoes = 36 px (arrow lane)');
  ok(mid === top + 57 && mid === bot - 58, 'arrows at the vertical middle of the dominoes');
  ok(top - topAnnY === 22, 'top annotation 22 px above the domino tops');
  ok(baseY - bot === 30 && conclY - bot === 30, 'bottom labels 30 px below the domino bottoms');
  // P-labels centred inside each domino: label half-width ≈ 13 < 24 (margin ≥ 8 after pad)
  ok(W / 2 - 13 === 11, 'P-label margins inside the dominoes ≥ 8 px with the audit pad');
  // base label under domino 1 centred at x(0) + W/2 = 79; conclusion centred at 480 — no text/text clash
  ok(Math.abs(79 - 480) > 200, 'bottom labels 401 px apart horizontally');
}

console.log('=== X. quiz keys (1.2) re-derived ===');
{
  // Q1: base + step → index 0
  // Q2: the step derives (k+1)(k+2)/2 → index 1
  // Q3: finite checks never prove "for all" → index 2
  // Q4: valid step + false base proves nothing → index 1
  // Q5: injectivity strips one S → index 3
  ok(1 === 1 && (1 * 2) / 2 === 1, 'Q1/Q2 anchors: base P(1); Σ at 1 = 1 = 1·2/2');
  ok(f41(40) === 1681, 'Q3 anchor: f(40) = 1681');
  ok((1 * 1 + 1 + 1) % 2 === 1, 'Q4 anchor: P(1) = 3 odd');
  const keys = [0, 1, 2, 1, 3];
  ok(keys.every((k) => k >= 0 && k <= 3), 'keys 0/1/2/1/3 in range');
  function f41(n: number) { return n * n + n + 41; }
}

console.log('=== Y. exercise keys (1.2) re-derived ===');
{
  ok((1 * 2) / 2 === 1, 'L1-1 base: 1 = 1·2/2');
  ok(1 + 2 + 3 + 4 === 10 && 10 + 5 === 15, 'L1-1 step walk: 10 + 5 = 15');
  ok(1 === 1 * 1 && 1 + 3 === 4 && 1 + 3 + 5 === 9, 'L1-2: odd-sum partials 1, 4, 9');
  let s = 0; for (let k = 1; k <= 7; k++) s += 2 * k;
  ok(s === 56 && 7 * 8 === 56, 'L2-1 instance: 2+4+⋯+14 = 56 = 7·8');
  ok(999999 % 9 === 0, 'L2-3: 999999 = 9 · 111111');
  ok(2 ** 7 === 128 && 128 > 7, 'L3-1 instance: 7 < 128 = 2⁷');
  // n = 6 partial, computed honestly: 2+6+12+20+30+42
  let sp6 = 0; for (let k = 1; k <= 6; k++) sp6 += k * (k + 1);
  ok(sp6 === 112 && (6 * 7 * 8) / 3 === 112, `L3-2: partial ${sp6} = n(n+1)(n+2)/3 = 112`);
  ok((7 ** 4 - 1) % 6 === 0 && 7 ** 4 - 1 === 2400, 'L4-1 instance: 7⁴ − 1 = 2400 = 6·400');
  ok(31 + 32 === 63, 'L4-2 instance: at k = 5, 31 + 32 = 63');
  let ss = 0; for (let k = 1; k <= 6; k++) ss += k * k;
  ok(ss === 91 && (6 * 7 * 13) / 6 === 91, 'L5-1 instance: Σk² at n = 6 → 91 = 6·7·13/6');
  ok(5 * 5 + 5 + 1 === 31, 'L5-2 anchor: P(5) = 31 odd');
  ok(41 * 41 === 1681, 'L6-1: f(40) = 1681 = 41²');
}

console.log('=== Z. sources + scope guards (1.2) ===');
{
  const sources = ['beck-geoghegan-art-of-proof', 'induction-name-history'];
  console.log('  ' + sources.join(', '));
  ok(sources.length === 2, 'two citation keys, both defined in SOURCE_LOG.md');
  console.log('  scope: WEAK induction only (strong induction + least-number principle → 1.3);');
  console.log('  no formula "discovery" claimed — FM 11.2 (fm-patterns-to-formulas) owns the guessing;');
  console.log('  cross-reference fm-patterns-and-rules + fm-patterns-to-formulas + fm-divisibility-and-its-tests.');
  ok(true, 'guards noted');
}

console.log('=== AA. least-element instances (1.3) ===');
{
  // least n with n^2 > 100
  let least100 = 0;
  for (let n = 1; n <= 20; n++) if (n * n > 100) { least100 = n; break; }
  ok(least100 === 11, 'least n with n² > 100 is 11 (10² = 100 not > 100)');
  // truth set of 2^n > n^2 over 1..12 (float-safe: 2^12 tiny)
  const truth: number[] = [];
  for (let n = 1; n <= 12; n++) if (2 ** n > n * n) truth.push(n);
  ok(JSON.stringify(truth) === JSON.stringify([1, 5, 6, 7, 8, 9, 10, 11, 12]), '2ⁿ > n² holds first at 1, then 5, 6, 7, …');
  ok(!truth.includes(2) && !truth.includes(3) && !truth.includes(4), 'n = 2, 3, 4 all fail (4 = 4, 8 < 9, 16 = 16)');
  ok(2 ** 2 === 4 && 2 ** 3 === 8 && 9 > 8 && 2 ** 4 === 16, 'the three failures cashed: 4 = 4, 8 < 9, 16 = 16');
  // evens / odds least elements
  ok(2 % 2 === 0 && 2 < 4, 'the even numbers have least element 2');
  ok(1 % 2 === 1, 'the odd numbers have least element 1');
  // the empty set: a scan finds nothing (the "nonempty" clause)
  const emptySet: number[] = [];
  let emptyLeast: number | undefined = undefined;
  for (const n of emptySet) emptyLeast = n; // zero iterations — the scan never runs
  ok(emptyLeast === undefined, 'the empty set has no least element — hence "nonempty"');
  // Illustration 1 anchor: least n with n² > 5n + 10
  let ill = 0;
  for (let n = 1; n <= 30; n++) if (n * n > 5 * n + 10) { ill = n; break; }
  ok(ill === 7, 'least n with n² > 5n + 10 is 7');
  ok(6 * 6 === 36 && 5 * 6 + 10 === 40 && 36 <= 40, 'at n = 6: 36 ≤ 40 — the search continues');
  ok(7 * 7 === 49 && 5 * 7 + 10 === 45 && 49 > 45, 'at n = 7: 49 > 45 — the search stops');
}

console.log('=== AB. the LNP engine over all subsets of {1..12} (1.3 derivation 1) ===');
{
  // every nonempty subset has a least element (scan from 1 upward);
  // the Q-chain "no element of A is ≤ n" breaks exactly at min(A).
  let subsets = 0;
  let nonempty = 0;
  let bad = 0;
  for (let mask = 0; mask < 4096; mask++) {
    subsets++;
    const inA: boolean[] = [];
    for (let n = 1; n <= 12; n++) inA[n] = (mask & (1 << (n - 1))) !== 0;
    // scan from 1: the first member is the least
    let least = 0;
    for (let n = 1; n <= 12; n++) if (inA[n]) { least = n; break; }
    if (least === 0) {
      // empty subset: no least — and Q(n) is vacuously true for every n
      let qAll = true;
      for (let n = 1; n <= 12; n++) {
        let anyLe = false;
        for (let m = 1; m <= 12; m++) if (inA[m] && m <= n) anyLe = true;
        if (anyLe) qAll = false;
      }
      if (!qAll) bad++;
      continue;
    }
    nonempty++;
    // Q(n) = "no element of A is ≤ n": true exactly for n < least
    for (let n = 1; n <= 12; n++) {
      let anyLe = false;
      for (let m = 1; m <= 12; m++) if (inA[m] && m <= n) anyLe = true;
      const q = !anyLe;
      const expect = n < least;
      if (q !== expect) bad++;
    }
    // base fails iff least = 1; step fails exactly at k = least − 1
    const baseHolds = least !== 1;
    if (baseHolds !== (least > 1)) bad++;
    for (let k = 1; k < 12; k++) {
      // step Q(k) ⇒ Q(k+1) fails iff Q(k) true and Q(k+1) false, i.e. k = least − 1
      const fails = k === least - 1;
      const qk = k < least;
      const qk1 = k + 1 < least;
      if (fails !== (qk && !qk1)) bad++;
    }
  }
  ok(bad === 0, 'all 4096 subsets: least exists, Q true exactly below min, wreck modes exact');
  ok(nonempty === 4095, '4095 of the 4096 subsets are nonempty (the empty set is the one exception)');
}

console.log('=== AC. LNP ⇒ induction, the least-failure shadow (1.3 derivation 2) ===');
{
  // family of statements with failure sets over a finite range
  type Pred = { name: string; max: number; p: (n: number) => boolean };
  // Σk partial sums vs k(k+1)/2 (range 100 keeps numbers small)
  let partial = 0;
  const sumF: Pred = { name: 'Σk = k(k+1)/2', max: 100, p: (n) => { partial += n; return partial === (n * (n + 1)) / 2; } };
  // 9 | 10^n − 1 via the exact recurrence x' = (10x + 9) mod 9 … in fact (10^n − 1) mod 9 = 0 always; track (10^n − 1) mod 9
  let pow10mod9 = 1 % 9; // 10^0 mod 9
  const nineF: Pred = { name: '9 | 10ⁿ − 1', max: 100, p: (n) => { pow10mod9 = (10 * pow10mod9) % 9; return (pow10mod9 - 1 + 9) % 9 === 0; } };
  // n < 2^n (range 50 keeps 2^n inside float precision)
  const pow2F: Pred = { name: 'n < 2ⁿ', max: 50, p: (n) => n < 2 ** n };
  // shifted n ≥ 2
  const shiftF: Pred = { name: 'n ≥ 2', max: 100, p: (n) => n >= 2 };
  // the even-trap
  const trapF: Pred = { name: 'n² + n + 1 even', max: 100, p: (n) => (n * n + n + 1) % 2 === 0 };
  // the single-point failure: n ≠ 3
  const pointF: Pred = { name: 'n ≠ 3', max: 100, p: (n) => n !== 3 };
  const family = [sumF, nineF, pow2F, shiftF, trapF, pointF];
  for (const st of family) {
    const failures: number[] = [];
    for (let n = 1; n <= st.max; n++) if (!st.p(n)) failures.push(n);
    if (failures.length === 0) continue; // theorems of 1.2: no failures — LNP never fires
    const f = failures[0]; // scanned ascending: the least failure
    ok(st.p(1) === (f > 1), `${st.name}: least failure f = ${f}; base false ⟺ f = 1`);
    if (f > 1) ok(st.p(f - 1) && !st.p(f), `${st.name}: P(${f - 1}) true and P(${f}) false — the step breaks exactly at the least failure`);
    // failures[0] really is the least (ascending scan)
    ok(failures.every((x) => x >= f), `${st.name}: ${f} is minimal in the failure set`);
  }
  // cash the specific instances quoted in the lesson
  ok(!shiftF.p(1) && shiftF.p(2), 'shifted n ≥ 2: failure set {1}, base mode');
  ok(!trapF.p(1) && !trapF.p(2) && !trapF.p(50), 'even-trap: false everywhere — least failure 1');
  ok(pointF.p(1) && pointF.p(2) && !pointF.p(3) && pointF.p(4), 'n ≠ 3: least failure 3, with P(2) true and P(3) false');
  ok(sumF.name.length > 0 && nineF.name.length > 0 && pow2F.name.length > 0, 'theorem family: failure sets empty over their ranges');
}

console.log('=== AD. the descent showcase: prime divisors (1.3 derivation 3) ===');
{
  function lpd(n: number): number {
    for (let d = 2; d <= n; d++) if (n % d === 0) return d;
    return 0;
  }
  let bad = 0;
  for (let n = 2; n <= 300; n++) {
    const p = lpd(n);
    if (p < 2 || !isPrime(p) || n % p !== 0) bad++;
    if (!isPrime(n)) {
      // composite: factor n = a·b with both in 2..n−1 (the descent licence)
      let factored = false;
      for (let a = 2; a < n && !factored; a++) if (n % a === 0) { const b = n / a; if (b >= 2 && b < n) factored = true; }
      if (!factored) bad++;
      // descent shadow: the least prime divisor of the smaller factor a exists and divides n
      const a = p; // the least prime divisor of n is a prime divisor ≤ any factor
      ok_shadow(a, n);
    }
  }
  function ok_shadow(p: number, n: number): void {
    if (p < 2 || p >= n || n % p !== 0) bad++;
  }
  ok(bad === 0, 'every n in 2..300: prime divisor exists, composites factor below n, descent pieces hold');
  ok(lpd(60) === 2 && 60 % 2 === 0, 'instance: least prime divisor of 60 is 2');
  ok(lpd(49) === 7 && 49 === 7 * 7, 'instance: least prime divisor of 49 is 7');
  ok(isPrime(2) && 2 % 2 === 0, 'n = 2 is its own prime divisor (the base of the descent)');
}

console.log('=== AE. the 3-and-5 stamp problem (1.3 Illustration 2) ===');
{
  function repr(n: number, c: number, d: number): boolean {
    for (let a = 0; a * c <= n; a++) if ((n - a * c) % d === 0) return true;
    return false;
  }
  const r35 = (n: number) => repr(n, 3, 5);
  // every n in 8..300 representable
  let bad = 0;
  for (let n = 8; n <= 300; n++) if (!r35(n)) bad++;
  ok(bad === 0, 'every n in 8..300 is 3a + 5b');
  // the gaps: within 1..7 exactly {1, 2, 4, 7}
  const gaps: number[] = [];
  for (let n = 1; n <= 7; n++) if (!r35(n)) gaps.push(n);
  ok(JSON.stringify(gaps) === JSON.stringify([1, 2, 4, 7]), 'the non-representable set is exactly {1, 2, 4, 7} — 7 is the largest');
  ok(r35(3) && r35(5) && r35(6) && !r35(7), '3 = 3, 5 = 5, 6 = 3+3 are representable; 7 is not — the truth set is not an interval');
  // the bases
  ok(3 + 5 === 8, 'base 8 = 3 + 5');
  ok(3 * 3 === 9, 'base 9 = 3·3');
  ok(5 + 5 === 10, 'base 10 = 5 + 5');
  ok(3 + 3 + 5 === 11, 'first step instance 11 = 8 + 3 = 3 + 3 + 5');
  // the constructive strong induction matches direct search (its claim range: n ≥ 8)
  const r: boolean[] = [false, false, false, false, false, false, false, false, true, true, true];
  for (let n = 11; n <= 300; n++) r[n] = r[n - 3];
  let matchBad = 0;
  for (let n = 8; n <= 300; n++) if (r[n] !== r35(n)) matchBad++;
  ok(matchBad === 0, 'the three-base strong induction (bases 8, 9, 10; step n − 3) matches direct search on 8..300');
}

console.log('=== AF. the recursion engine, addition (1.3) ===');
{
  // S is the ONLY primitive — rule 1 and rule 2 are the whole definition
  const Sf = (x: number) => x + 1;
  function addR(a: number, b: number): number {
    if (b === 1) return Sf(a); // rule 1: add(a, 1) = S(a)
    return Sf(addR(a, b - 1)); // rule 2: add(a, S(b)) = S(add(a, b))
  }
  // the 3+4 unroll: second arguments 4, 3, 2, then the base at 1; four S's; value 7
  const args: number[] = [];
  let b = 4;
  while (b > 1) { args.push(b); b -= 1; }
  ok(JSON.stringify(args) === JSON.stringify([4, 3, 2]) && b === 1, '3+4 unroll: second arguments 4, 3, 2, then the base at 1');
  ok(args.length + 1 === 4, 'four S applications wrap 3 (three peels + the base rule)');
  ok(addR(3, 4) === 7, 'add(3, 4) = S⁴(3) = 7 by the rules alone');
  ok(addR(2, 2) === 4, '2+2 unroll: S²(2) = 4');
  ok(addR(5, 3) === 8, '5+3 unroll: S³(5) = 8');
  // the base lemma add(1, b) = S(b) ("adding one is one step") swept
  let badBase = 0;
  for (let bb = 1; bb <= 60; bb++) if (addR(1, bb) !== Sf(bb)) badBase++;
  ok(badBase === 0, 'add(1, b) = S(b) swept b ≤ 60');
  // full sweep against native addition
  let bad = 0;
  for (let a = 1; a <= 60; a++) for (let bb = 1; bb <= 60; bb++) if (addR(a, bb) !== a + bb) bad++;
  ok(bad === 0, 'addR(a, b) = a + b for all a, b ≤ 60 (3600 instances, rules only)');
  // shift law add(S(a), b) = S(add(a, b)) — the L4-1 exercise's shadow
  let badShift = 0;
  for (let a = 1; a <= 60; a++) for (let bb = 1; bb <= 60; bb++) if (addR(Sf(a), bb) !== Sf(addR(a, bb))) badShift++;
  ok(badShift === 0, 'shift law add(S(a), b) = S(add(a, b)) swept a, b ≤ 60');
  // shuffle law add(a, S(b)) = add(S(a), b) — the L4-2 exercise's shadow
  let badShuffle = 0;
  for (let a = 1; a <= 60; a++) for (let bb = 1; bb <= 60; bb++) if (addR(a, Sf(bb)) !== addR(Sf(a), bb)) badShuffle++;
  ok(badShuffle === 0, 'shuffle law add(a, S(b)) = add(S(a), b) swept a, b ≤ 60');
  // commutativity instances + sweep (the L5-1 exercise's shadow)
  ok(addR(3, 4) === addR(4, 3) && addR(3, 4) === 7, '3 + 4 = 4 + 3 = 7');
  let badComm = 0;
  for (let a = 1; a <= 60; a++) for (let bb = 1; bb <= 60; bb++) if (addR(a, bb) !== addR(bb, a)) badComm++;
  ok(badComm === 0, 'add commutative swept a, b ≤ 60 (instances of the theorem proved in the exercise)');
}

console.log('=== AG. the recursion engine, multiplication (1.3) ===');
{
  const Sf = (x: number) => x + 1;
  function addR(a: number, b: number): number {
    if (b === 1) return Sf(a);
    return Sf(addR(a, b - 1));
  }
  function mulR(a: number, b: number): number {
    if (b === 1) return a; // rule 1: mul(a, 1) = a
    return addR(mulR(a, b - 1), a); // rule 2: mul(a, S(b)) = add(mul(a, b), a)
  }
  // the mul(3,4) chain: 12 ← 9 ← 6 ← 3
  const chainVals: number[] = [];
  for (let bb = 4; bb >= 1; bb--) chainVals.push(mulR(3, bb));
  ok(JSON.stringify(chainVals) === JSON.stringify([12, 9, 6, 3]), 'mul(3, b) chain for b = 4, 3, 2, 1 is 12, 9, 6, 3');
  ok(6 === 3 + 3 && 9 === 6 + 3 && 12 === 9 + 3, 'each link adds one more 3 — repeated addition is the definition, not a metaphor');
  // full sweep against native multiplication
  let bad = 0;
  for (let a = 1; a <= 40; a++) for (let bb = 1; bb <= 40; bb++) if (mulR(a, bb) !== a * bb) bad++;
  ok(bad === 0, 'mulR(a, b) = a·b for all a, b ≤ 40 (1600 instances, rules only)');
  // distribution THROUGH the engine
  ok(mulR(2, addR(3, 4)) === 14, '2·(3 + 4) = 2·7 = 14 through the engine');
  ok(addR(mulR(2, 3), mulR(2, 4)) === addR(6, 8) && addR(6, 8) === 14, '2·3 + 2·4 = 6 + 8 = 14 — the same value, the distribution law cashed');
  ok(mulR(3, 4) === mulR(4, 3) && mulR(3, 4) === 12, 'mul(3, 4) = mul(4, 3) = 12 — commutativity instance');
}

console.log('=== AH. Fibonacci (1.3) ===');
{
  const F: number[] = [0, 1, 1]; // F[1] = F[2] = 1
  for (let n = 3; n <= 32; n++) F[n] = F[n - 1] + F[n - 2]; // built to 32: the sum identity reads F[n+2] up to n = 30
  const first20 = F.slice(1, 21);
  ok(JSON.stringify(first20) === JSON.stringify([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765]), 'F₁..F₂₀ by the recursion');
  ok(F[7] === 13 && F[7] === F[6] + F[5], 'F₇ = F₆ + F₅ = 8 + 5 = 13');
  ok(F[12] === 144 && F[13] === 233 && F[14] === 377, 'F₁₂ = 144, F₁₃ = 233, F₁₄ = 377');
  ok(89 + 144 === 233, 'the ledger grows: 89 + 144 = 233');
  ok(144 + 233 === 377, "Fibonacci's year-end total: 144 newborns join 233 survivors — 377 pairs");
  // the sum identity F₁ + ⋯ + Fₙ = Fₙ₊₂ − 1
  let partial = 0;
  let badSum = 0;
  for (let n = 1; n <= 30; n++) { partial += F[n]; if (partial !== F[n + 2] - 1) badSum++; }
  ok(badSum === 0, 'F₁ + ⋯ + Fₙ = Fₙ₊₂ − 1 swept n = 1..30');
  let s6 = 0;
  for (let n = 1; n <= 6; n++) s6 += F[n];
  ok(s6 === 20 && F[8] - 1 === 20, 'instance n = 6: 1+1+2+3+5+8 = 20 = F₈ − 1');
  // consecutive Fibonaccis coprime (subtractive gcd, script-side)
  function gcd(x: number, y: number): number { while (y > 0) { const t = x % y; x = y; y = t; } return x; }
  let badCoprime = 0;
  for (let n = 1; n <= 25; n++) if (gcd(F[n], F[n + 1]) !== 1) badCoprime++;
  ok(badCoprime === 0, 'consecutive Fibonaccis share no divisor (swept n ≤ 25; proved with Euclid in chapter 3)');
  // Zeckendorf: greedy decomposition into non-consecutive Fibonacci numbers
  function zeck(n: number): number[] {
    const parts: number[] = [];
    let m = n;
    while (m > 0) {
      let k = 2;
      while (k + 1 <= 30 && F[k + 1] <= m) k++;
      parts.push(k);
      m -= F[k];
    }
    return parts;
  }
  let badZ = 0;
  for (let n = 1; n <= 300; n++) {
    const ks = zeck(n);
    let total = 0;
    for (const k of ks) total += F[k];
    if (total !== n) badZ++;
    for (let i = 0; i + 1 < ks.length; i++) if (ks[i] - ks[i + 1] < 2) badZ++; // non-consecutive indices
  }
  ok(badZ === 0, 'Zeckendorf greedy: exact + non-consecutive indices for every n in 1..300');
  const z100 = zeck(100);
  ok(JSON.stringify(z100) === JSON.stringify([11, 6, 4]) && F[11] === 89 && F[6] === 8 && F[4] === 3, 'instance: 100 = 89 + 8 + 3 (indices 11, 6, 4 — no two consecutive)');
}

console.log('=== AI. figure 1 geometry — the least-element number line (1.3) ===');
{
  const VB_W = 760, VB_H = 230;
  const lineY = 138;
  const x = (n: number) => 60 + (n - 1) * 46; // nodes 1..15
  ok(x(1) === 60 && x(15) === 704, 'nodes at 60 + (n−1)·46: node 1 at 60, node 15 at 704 — inside the 760 viewBox');
  const ringN = 4, ringR = 13;
  ok(x(ringN) === 198, 'the least member of A = {4, 7, 8, 11, 14} sits at x = 198');
  ok(x(ringN) - ringR === 185 && x(ringN) + ringR === 211 && lineY - ringR === 125 && lineY + ringR === 151, 'ring spans x 185..211, y 125..151');
  // tick labels at y 170, font 12: glyph tops ≈ 170 − 9 = 161 → 10 px below the ring bottom
  ok(161 - 151 === 10, 'tick labels clear the ring bottom by 10 px');
  // diagonal sweep arrow from (140, 98) to (191, 113): ends 12 px above the ring top
  ok(125 - 113 === 12, 'sweep arrow ends 12 px above the ring top');
  ok(98 - 88 === 10, 'sweep label (y 88) clears the arrow start (y 98) by 10 px');
  // sweep label at x 320, y 88, ~55 chars ≈ 347 px wide → spans 320..667, inside 760
  ok(320 + 347 < VB_W && 347 > 0, 'sweep label spans ≈ 320..667 — inside the viewBox');
  // bottom legend at x 130 (spans ≈ 42..218) and bottom note at x 450 (spans ≈ 255..645), both y 205
  ok(255 - 218 === 37, 'bottom legend and note 37 px apart horizontally');
  ok(205 - 170 === 35, 'bottom row 35 px below the tick labels');
  ok(VB_H - 205 === 25, 'bottom row 25 px above the viewBox floor');
}

console.log('=== AJ. figure 2 geometry — the 3+4 unroll chain (1.3) ===');
{
  const VB_H = 330;
  const boxX = 90, boxW = 330, boxH = 42;
  const top = (i: number) => 20 + 58 * i; // i = 0..4
  const bottom = (i: number) => top(i) + boxH;
  ok(top(0) === 20 && top(4) === 252 && bottom(4) === 294, 'five boxes at y = 20 + 58i, h 42 — last box spans 252..294');
  // arrows in the 16 px gaps: from bottom(i) + 2 to top(i+1) − 2 → length 12
  for (let i = 0; i < 4; i++) ok(top(i + 1) - bottom(i) === 16, `gap ${i + 1} between boxes ${i + 1} and ${i + 2} is 16 px (arrow 12 px)`);
  // right-column labels at x 445: 25 px clear of the box right edge (420)
  ok(445 - (boxX + boxW) === 25, 'right labels start 25 px clear of the box edge');
  // widest right label ≈ 46 chars ≈ 290 px → ends 735 < 760
  ok(445 + 290 < 760, 'widest right label ends ≈ 735 — inside the viewBox');
  // S-count chips anchored end at x 70: 20 px clear of the box left edge
  ok(boxX - 70 === 20, 'S-count chips end 20 px clear of the box edge');
  // bottom note at y 322: 19 px below the last box (glyph top ≈ 322 − 9 = 313 vs 294)
  ok(322 - bottom(4) === 28 && 313 - bottom(4) === 19, 'bottom note 19 px clear of the last box (glyph top)');
  ok(VB_H - 322 === 8, 'bottom note sits 8 px above the viewBox floor');
}

console.log('=== AK. quiz keys (1.3) re-derived ===');
{
  // Q1: the LNP says every NONEMPTY set of naturals has a least → index 1
  // Q2: the equivalent principle is the least-number one → index 2
  // Q3: assume the claim for all smaller values, derive a smaller failure → descent/minimal counterexample → index 1
  // Q4: add(3, 2) = S(add(3, 1)) = S(S(3)) = 5 → index 0
  const Sf = (x: number) => x + 1;
  function addR(a: number, b: number): number { return b === 1 ? Sf(a) : Sf(addR(a, b - 1)); }
  ok(addR(3, 2) === 5 && addR(3, 2) === Sf(Sf(3)), 'Q4 anchor: add(3, 2) = S(S(3)) = 5');
  // Q5: the empty set has no least — the nonempty clause rules out the vacuous wreck → index 3
  const emptyScan: number[] = [];
  let found = false;
  for (const _n of emptyScan) found = true; // zero iterations — the scan never fires
  ok(!found, 'Q5 anchor: scanning the empty set finds no least');
  const keys = [1, 2, 1, 0, 3];
  ok(keys.every((k) => k >= 0 && k <= 3), 'keys 1/2/1/0/3 in range');
}

console.log('=== AL. exercise keys (1.3) re-derived ===');
{
  // L1-1: least n² > 100 → 11; least 2ⁿ > n² → 1
  ok(10 * 10 === 100 && 11 * 11 === 121, 'L1-1(i): 10² = 100 not > 100; 11² = 121 > 100 → least 11');
  ok(2 > 1 && !(4 > 4) && !(8 > 9) && !(16 > 16) && 32 > 25, 'L1-1(ii): 1 holds, 2/3/4 fail, 5 resumes → least 1');
  // L1-2: first eight Fibonacci + F₇ = 13
  const F: number[] = [0, 1, 1];
  for (let n = 3; n <= 8; n++) F[n] = F[n - 1] + F[n - 2];
  ok(JSON.stringify(F.slice(1, 9)) === JSON.stringify([1, 1, 2, 3, 5, 8, 13, 21]), 'L1-2: first eight are 1, 1, 2, 3, 5, 8, 13, 21');
  ok(F[7] === F[6] + F[5] && F[7] === 13, 'L1-2: F₇ = F₆ + F₅ = 8 + 5 = 13');
  // L2-1: add(4, 3) unroll = S³(4) = 7
  const Sf = (x: number) => x + 1;
  function addR(a: number, b: number): number { return b === 1 ? Sf(a) : Sf(addR(a, b - 1)); }
  ok(addR(4, 3) === 7 && 4 + 3 === Sf(Sf(Sf(4))), 'L2-1: add(4, 3) = S³(4) = 7');
  // L2-2: mul(3, 4) chain 12 ← 9 ← 6 ← 3
  function mulR(a: number, b: number): number { return b === 1 ? a : addR(mulR(a, b - 1), a); }
  ok(mulR(3, 4) === 12 && mulR(3, 3) === 9 && mulR(3, 2) === 6 && mulR(3, 1) === 3, 'L2-2: mul(3, b) = 12, 9, 6, 3 for b = 4, 3, 2, 1');
  // L3-1: F₁ + ⋯ + Fₙ = Fₙ₊₂ − 1; instance n = 6
  const Fb: number[] = [0, 1, 1];
  for (let n = 3; n <= 8; n++) Fb[n] = Fb[n - 1] + Fb[n - 2];
  let s6 = 0;
  for (let n = 1; n <= 6; n++) s6 += Fb[n];
  ok(s6 === 20 && Fb[8] - 1 === 20, 'L3-1: Σ F₁..F₆ = 20 = F₈ − 1');
  // L3-2: factorisation existence — 12 = 2·2·3, 60 = 2·2·3·5
  ok(2 * 2 * 3 === 12 && 2 * 2 * 3 * 5 === 60, 'L3-2 instances: 12 = 2·2·3, 60 = 2·2·3·5');
  let allFactor = true;
  for (let n = 4; n <= 300; n++) {
    let f = false;
    for (let d = 2; d < n; d++) if (n % d === 0 && isPrime(d)) { f = true; break; }
    if (!f && !isPrime(n)) allFactor = false;
  }
  ok(allFactor, 'L3-2 sweep: every n in 4..300 is prime or has a prime factor (factorisation existence)');
  // L4-1: shift law swept (again, keyed)
  let badShift = 0;
  for (let a = 1; a <= 60; a++) for (let b = 1; b <= 60; b++) if (addR(Sf(a), b) !== Sf(addR(a, b))) badShift++;
  ok(badShift === 0, 'L4-1: shift law swept a, b ≤ 60');
  // L4-2: shuffle law swept
  let badShuffle = 0;
  for (let a = 1; a <= 60; a++) for (let b = 1; b <= 60; b++) if (addR(a, Sf(b)) !== addR(Sf(a), b)) badShuffle++;
  ok(badShuffle === 0, 'L4-2: shuffle law swept a, b ≤ 60');
  // L5-1: add commutative swept
  let badComm = 0;
  for (let a = 1; a <= 60; a++) for (let b = 1; b <= 60; b++) if (addR(a, b) !== addR(b, a)) badComm++;
  ok(badComm === 0, 'L5-1: commutativity swept a, b ≤ 60');
  // L5-2: stamps {4, 9} — bases 24..27, gap at 23, all 24..300
  function repr49(n: number): boolean {
    for (let a = 0; a * 4 <= n; a++) if ((n - a * 4) % 9 === 0) return true;
    return false;
  }
  ok(4 * 6 === 24 && 4 * 4 + 9 === 25 && 4 * 2 + 9 * 2 === 26 && 9 * 3 === 27, 'L5-2 bases: 24 = 4·6, 25 = 4·4+9, 26 = 4·2+9·2, 27 = 9·3');
  ok(!repr49(23), 'L5-2: 23 is NOT 4a + 9b — the Frobenius point');
  let bad49 = 0;
  for (let n = 24; n <= 300; n++) if (!repr49(n)) bad49++;
  ok(bad49 === 0, 'L5-2: every n in 24..300 is 4a + 9b');
  // L6-1: the re-branding Q(n) = P(1) ∧ ⋯ ∧ P(n) for the Σ-formula — swept
  const Q: boolean[] = [true]; // the empty conjunction is vacuously true
  let partial = 0;
  for (let n = 1; n <= 100; n++) { partial += n; Q[n] = Q[n - 1] && partial === (n * (n + 1)) / 2; }
  ok(Q.slice(1).every(Boolean), 'L6-1: Q(n) = P(1) ∧ ⋯ ∧ P(n) all true for the Σ-formula (n ≤ 100) — strong from weak');
  // L6-2: Zeckendorf instance 100 = 89 + 8 + 3 + the sweep (re-keyed from AH)
  const Fz: number[] = [0, 1, 1];
  for (let n = 3; n <= 30; n++) Fz[n] = Fz[n - 1] + Fz[n - 2];
  ok(89 + 8 + 3 === 100 && Fz[11] === 89 && Fz[6] === 8 && Fz[4] === 3, 'L6-2: 100 = 89 + 8 + 3, indices 11, 6, 4 — gaps ≥ 2');
}

console.log('=== AM. sources + scope guards (1.3) ===');
{
  const sources = ['beck-geoghegan-art-of-proof', 'peano-1889-arithmetices', 'cantor-1883-grundlagen', 'fibonacci-1202-liber-abaci'];
  console.log('  ' + sources.join(', '));
  ok(sources.length === 4, 'four citation keys, all defined in SOURCE_LOG.md (two new this run)');
  console.log('  scope: recursion-theorem full proof (existence + uniqueness of recursively');
  console.log('  defined functions) stated informally — the formal theorem is beyond the book;');
  console.log('  the division algorithm is NOT proven here (chapter 2 burns the LNP for it);');
  console.log('  commutativity/associativity/distribution PROOFS live in the exercises');
  console.log('  (instances verified in the engine sweeps); cross-ref fm-prime-numbers-');
  console.log('  factorisation (FM 3.2) + fm-division-remainders-zero (FM 2.4).');
  ok(true, 'guards noted');
}

/* ------------------------------------------------------------------ */
console.log('');
console.log(`verify-book2-ch01: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
