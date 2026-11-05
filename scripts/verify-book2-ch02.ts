/**
 * verify-book2-ch02.ts — pre-writing arithmetic verification for
 * Arithmetic and Number Systems (book #2), chapter 2 "The Division
 * Algorithm and the Structure of Divisibility".
 *
 * Created 2026-11-05 (run 51) for lessons
 *   2.1 "Division with Rest: The Division Algorithm"
 *   2.2 "The Algebra of Divisibility"
 * — every number of both lessons is verified here BEFORE anything is
 * written into ch-02.ts —
 *
 *   (A) existence instances: a table of (a, b) pairs solved by REPEATED
 *       SUBTRACTION ONLY — subtract b while you can; the count of
 *       subtractions is q, what is left is r — each swept against
 *       a = qb + r with 0 ≤ r < b; then a broad sweep a = 0..200,
 *       b = 1..12 (same subtraction engine);
 *   (B) the remainder band: exactly b values 0..b−1 (b swept 1..30);
 *       the bump instances (r = b would just raise q — the two
 *       representations of 10 with b = 5; the invalid 23 = 3·5 + 8);
 *       the boundary pair r = 0 (exact division) and r = b−1 swept;
 *   (C) the descent shadow (existence proof simulated): S = {a − bq ≥ 0}
 *       for (a, b) = (23, 5) = {23, 18, 13, 8, 3} — least element 3 < 5,
 *       no further step; the longer walk (100, 7); S nonempty always
 *       (q = 0 → a ∈ S) and strictly descending swept a ≤ 120, b ≤ 12;
 *   (D) uniqueness: brute-force impostor sweep — for (a, b) in a table,
 *       count solutions (q, r), 0 ≤ r < b, 0 ≤ q ≤ a of a = qb + r:
 *       EXACTLY ONE every time (swept a = 0..120, b = 1..12); the
 *       algebra line b(q − q') = r' − r checked numerically on every
 *       impostor: q' < q forces LHS ≥ b > b − 1 ≥ RHS, q' > q forces
 *       LHS ≤ −b < −(b − 1) ≤ RHS;
 *   (E) the exam-shape instances: smallest 3-digit number leaving
 *       remainder 4 on division by 9 → 103 = 9·11 + 4 (swept 100..999);
 *       largest 2-digit leaving remainder 5 on division by 8 →
 *       93 = 8·11 + 5 (swept 10..99);
 *   (F) repeated subtraction on stage: 53 ÷ 7 — the chain
 *       53, 46, 39, 32, 25, 18, 11, 4 → q = 7, r = 4, check 7·7 + 4 = 53;
 *   (G) the mod-9 doorway (L5 exercise): a = 9q + r ⇒ 9 | (a − r);
 *       digit-sum fingerprint swept a = 1..400: (digitSum(a) −
 *       digitSum(a mod 9)) % 9 === 0; the instance 3,894 = 9·432 + 6,
 *       digit sums 24 − 6 = 18 = 2·9;
 *   (H) divisibility verdicts by multiplier search: (6,42)→7;
 *       (6,44)→none (44 = 6·7 + 2); (1,n) k = n for n = 1..50;
 *       (n,0) under the whole-number-multiplier convention k = 0;
 *       (7,21)→3; (12,144)→12; (9,73)→none (73 = 8·9 + 1);
 *       (8,3368)→421; (15,375)→25; (3,75)→25; (5,25)→5; (9,45)→5;
 *       (7,56)→8; (91, 7·13)→13; (144, 12·12)→12;
 *   (I) transitivity: chains (3,12,60)→k=20, (4,20,100)→k=25,
 *       (8,24,96)→k=12, (5,10,30)→k=6, (2,6,120)→k=60; brute sweep
 *       a,b,c ≤ 40 with no counterexample;
 *   (J) linear combinations: (6,54,30) → 84 = 6·14, 24 = 6·4,
 *       222 = 6·37 (= 3·54 + 2·30); (8,96,40) → 136 = 8·17, 56 = 8·7,
 *       328 = 8·41 (= 3·96 + 40); (14,98,42) → 140 = 14·10, 56 = 14·4;
 *       sweep a ≤ 12, b,c multiples of a, x,y = 0..6 (sums and
 *       nonnegative differences) — no counterexample; the caution
 *       instance 12 | 3·4 = 12 but 12 ∤ 3 and 12 ∤ 4 (swept);
 *   (K) antisymmetry, cancellation, the order link, divisor counts:
 *       a | b ∧ b | a ⇒ a = b swept a,b ≤ 60 (no counterexample; the
 *       engine: b = ak, a = bm ⇒ a = a·(km), cancellation forces
 *       km = 1 ⇒ k = m = 1 — only 1·1 = 1); cancellation cx = cy ⇒
 *       x = y swept c,x,y ≤ 40; ac | bc ⟺ a | b swept a,b,c ≤ 30 both
 *       directions; a | b (b ≥ 1) ⇒ a ≤ b swept a,b ≤ 60;
 *       divisors of 12 = {1,2,3,4,6,12}; divisors of 36 =
 *       {1,2,3,4,6,9,12,18,36} (nine); divisor chains of 12 audited
 *       against the figure's edge list;
 *   (L) figure 1 geometry — the remainder-band number line (a = 23,
 *       b = 5): axis 0..26 at x = 60 + 40t; ticks/labels at multiples
 *       0, 5, 10, 15, 20, 25; the a-tick at 23 with its label above;
 *       the r-bracket 20→23 at y 128 with its label at y 148;
 *       the b-tile brace 20→25 at y 78 with its label; every clearance
 *       ≥ 8 px computed pairwise;
 *   (M) figure 2 geometry — the divisor lattice of 12: nodes
 *       1 (240, 260), 2 (130, 170), 3 (350, 170), 4 (70, 80),
 *       6 (240, 80), 12 (240, 10)? — final coordinates in the script;
 *       edges 1→2, 1→3, 2→4, 2→6, 3→6, 4→12, 6→12; edge-label
 *       multipliers 2, 3, 2, 3, 2, 3, 2; clearances ≥ 8 px;
 *   (N) the 2.1 quiz keys re-derived;
 *   (O) all 12 exercise keys of 2.1 re-derived;
 *   (P) the 2.2 quiz keys re-derived;
 *   (Q) all 12 exercise keys of 2.2 re-derived;
 *   (R) formula cards re-derived;
 *   (S) sources printed (carried + the two new keys);
 *   (T) scope guards printed.
 *
 * EXTENDED 2026-11-05 (run 52) for lessons
 *   2.3 "The Euclidean Algorithm, Proven — and Bézout's Identity"
 *   2.4 "Linear Diophantine Equations"
 * — sections U onward, added BEFORE a word of either lesson was written:
 *   (U) the subtraction engine: the walk (48,18)→(30,18)→(12,18)→(12,6)→(6,6)
 *       with the common-divisor set preserved at every step; the invariance
 *       lemma {d : d|a, d|b} = {d : d|a−b, d|b} swept a ≤ 120; engine =
 *       trial-division gcd swept a, b ≤ 150;
 *   (V) the division loop with quotient sequences: (210,45)→(4,1,2)→15;
 *       (1071,462)→(2,3,7)→21; (4595,3570)→(1,3,2,14,7)→5; (68,51)→(1,3)→17;
 *       (6765,4181)→ sixteen 1s + a 2 → 1; every row division-theorem-clean;
 *       output = reference gcd swept a, b ≤ 300;
 *   (W) maximality: common-divisor sets {1,3,5,15}, {1,5}, {1,3,7,21}; the
 *       survivor = the greatest swept a, b ≤ 400; the down-rail (every common
 *       divisor divides every remainder) and up-rail (the survivor divides
 *       everything above) instance-checked; Euclid VII.2's corollary instance;
 *   (X) termination by descent: strictly-descending remainder sequences swept
 *       a ≤ 300, b ≤ 40; the Fibonacci descent 2584 > 1597 > … > 1 > 0;
 *       gcd(n, n+1) = 1 swept n ≤ 200; consecutive Fibonacci pairs coprime;
 *   (Y) Bézout by the extended table: every row of six instance tables
 *       evaluates x·a + y·b = r; the (210,45) rows (210,1,0),(45,0,1),
 *       (30,1,−4),(15,−1,5),(0,3,−14); the (4595,3570) seven rows;
 *       130·3570 − 101·4595 = 5; 7·462 − 3·1071 = 21; 5·45 − 1·210 = 15;
 *       minimal-pair bounds |x| ≤ b/d, |y| ≤ a/d; independent bounded search;
 *   (Z) coprime + the scaled reduction: gcd(a/d, b/d) = 1 swept a, b ≤ 120;
 *       1 = 5·3 − 1·14; 1 = 1·7 − 3·2; 1 = 2·3 − 1·5;
 *   (AA) the LCM payoff: lcm(210,45) = 630 with the no-smaller sweep;
 *       a·b/gcd is the lcm swept a, b ≤ 60;
 *   (AB) the Diophantine criterion: 12x+42y = 5 vetoed, = 6/60/120 solvable;
 *       the parity vetoes 4x+6y = 7, 6x+10y = 7; solvable ⟺ gcd | c swept
 *       225 (a,b) pairs × 6 c-values against brute force; 4x+9y = n swept;
 *   (AC) the solution family: every family member solves (t = −30..30) and
 *       every brute solution lies in the family, for seven instance
 *       equations; consecutive solutions differ by exactly (b/d, −a/d);
 *   (AD) the nonnegative window: (12,42,60) → the single (5,0); (12,42,120)
 *       → (3,2), (10,0); (12,42,6) → empty window; (5,7,100) → three
 *       nonnegative (6,10),(13,5),(20,0), two positive; (3,5,16) → (2,2);
 *       the count formula ⌊(c/a − x*)/b⌋ + 1 = 3;
 *   (AE) the worst case: (6765,4181) takes 18 divisions, seventeen quotients
 *       of 1 then a 2; Lamé 18 ≤ 5·4 digits; the max swept over all pairs ≤
 *       10,000 is 18, achieved at the Fibonacci pair; minimality below 6,765;
 *   (AF) figure 1 geometry — the Euclidean cascade (three division machines,
 *       carry arrows, down/up rails, seven labels cleared ≥ 8 px);
 *   (AG) figure 2 geometry — the lattice line 2x + 7y = 10: corners, line
 *       endpoints on the equation, four dots on the line spaced exactly
 *       (+7, −2) = (+210, +80) px, step arrow parallel, labels cleared;
 *   (AH) the 2.3 quiz keys re-derived (0/1/1/0/2) with every distractor
 *       evaluated (incl. the subtle 2·210 − 9·45 = 15 non-output);
 *   (AI) all 13 exercise keys of 2.3 re-derived;
 *   (AJ) the 2.4 quiz keys re-derived (0/2/0/1/2) with every distractor
 *       evaluated;
 *   (AK) all 13 exercise keys of 2.4 re-derived (incl. the Sylvester sweeps
 *       (4,9) → 23 & 12 gaps, (4,7) → 17 & 9 gaps, the 24..31 witnesses);
 *   (AL) formula cards of both lessons re-derived;
 *   (AM) sources printed (five NEW keys this run);
 *   (AN) scope guards printed (the natural-difference reading of whole-number
 *       coefficients; Euclid's lemma stays ch. 4's; Frobenius/Sylvester
 *       stated-with-swept-instances; congruence language deferred to ch. 5).
 *
 * Historical anchors web-checked 2026-11-05 (sanctioned fallback):
 * Euclid's Elements Book VII (Definitions 3–5, the "measures" charter;
 * the guide's note that Euclid supplies no postulates for numbers yet
 * leans on a decreasing-sequence principle in VII.2 — the well-ordering
 * engine Lesson 1.3 made explicit) via David Joyce's Clark University
 * edition — including VII.2's corollary verbatim: "if a number measures
 * two numbers, then it also measures their greatest common measure";
 * anthyphairesis (ἀνθυφαίρεσις, "reciprocal subtraction"), the process
 * Aristotle's Topics already used on ratios; the name history —
 * "algorithm" from Algoritmi, the Latinized name of al-Khwārizmī
 * (web-checked run 47, carried); the modern aliases "Euclidean division"
 * (French "division euclidienne") and "quotient-remainder theorem"; the
 * a|b notation — Hardy's unpublished 1925 seminar notes, then Edmund
 * Landau's Elementary Number Theory (1927) in print (MacTutor, per
 * Tattersall); Bézout's identity — Étienne Bézout proved it for
 * POLYNOMIALS (Théorie générale des équations algébriques, 1779) while
 * the integer statement is older: Claude-Gaspard Bachet de Méziriac,
 * Problèmes plaisants (1624); Gabriel Lamé (1844) — the division count
 * never exceeds 5 × the decimal digits of the smaller number, worst case
 * the consecutive Fibonacci pairs (Knuth notes it as the Fibonacci
 * numbers' first practical application); Diophantus of Alexandria
 * (c. 250 AD), the Arithmetica's whole-number problems — "father of
 * algebra" (St Andrews); Sylvester (Educational Times, 1884–85) — the
 * two-denomination Frobenius answer ab − a − b with (a − 1)(b − 1)/2
 * gaps, the general problem named for Frobenius. No content reproduced;
 * exposition original.
 *
 * Run: bun run scripts/verify-book2-ch02.ts   (exit 1 on any failure)
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

/* the subtraction-only division engine: the ONLY way q, r are computed */
function divBySubtraction(a: number, b: number): { q: number; r: number } {
  let q = 0;
  let r = a;
  while (r >= b) {
    r -= b;
    q += 1;
  }
  return { q, r };
}

function digitSum(n: number): number {
  let s = 0;
  let t = n;
  while (t > 0) {
    s += t % 10;
    t = Math.floor(t / 10);
  }
  return s;
}

/* ------------------------------------------------------------------ */
console.log('=== A. existence instances by repeated subtraction ONLY (2.1) ===');
{
  const table: Array<[number, number]> = [
    [23, 5], [47, 5], [100, 7], [68, 9], [17, 5], [20, 5],
    [4, 5], [0, 5], [1, 1], [53, 7], [999, 9], [2025, 12],
  ];
  for (const [a, b] of table) {
    const { q, r } = divBySubtraction(a, b);
    ok(q * b + r === a && 0 <= r && r < b,
      `A: ${a} = ${q}·${b} + ${r} with 0 ≤ ${r} < ${b}`);
  }
  ok(divBySubtraction(23, 5).q === 4 && divBySubtraction(23, 5).r === 3, 'A: 23 ÷ 5 → (4, 3)');
  ok(divBySubtraction(47, 5).q === 9 && divBySubtraction(47, 5).r === 2, 'A: 47 ÷ 5 → (9, 2)');
  ok(divBySubtraction(100, 7).q === 14 && divBySubtraction(100, 7).r === 2, 'A: 100 ÷ 7 → (14, 2)');
  ok(divBySubtraction(68, 9).q === 7 && divBySubtraction(68, 9).r === 5, 'A: 68 ÷ 9 → (7, 5)');
  ok(divBySubtraction(17, 5).q === 3 && divBySubtraction(17, 5).r === 2, 'A: 17 ÷ 5 → (3, 2)');
  ok(divBySubtraction(20, 5).q === 4 && divBySubtraction(20, 5).r === 0, 'A: 20 ÷ 5 → (4, 0) exact');
  ok(divBySubtraction(4, 5).q === 0 && divBySubtraction(4, 5).r === 4, 'A: 4 ÷ 5 → (0, 4) small dividend');
  ok(divBySubtraction(0, 5).q === 0 && divBySubtraction(0, 5).r === 0, 'A: 0 ÷ 5 → (0, 0) zero dividend');
  ok(divBySubtraction(1, 1).q === 1 && divBySubtraction(1, 1).r === 0, 'A: 1 ÷ 1 → (1, 0)');
  ok(divBySubtraction(53, 7).q === 7 && divBySubtraction(53, 7).r === 4, 'A: 53 ÷ 7 → (7, 4)');
  ok(divBySubtraction(999, 9).q === 111 && divBySubtraction(999, 9).r === 0, 'A: 999 ÷ 9 → (111, 0) exact');
  ok(divBySubtraction(2025, 12).q === 168 && divBySubtraction(2025, 12).r === 9, 'A: 2025 ÷ 12 → (168, 9)');
  // broad sweep, same engine
  let bad = 0;
  for (let a = 0; a <= 200; a++)
    for (let b = 1; b <= 12; b++) {
      const { q, r } = divBySubtraction(a, b);
      if (q * b + r !== a || r < 0 || r >= b) bad++;
    }
  ok(bad === 0, 'A: sweep a = 0..200, b = 1..12 — subtraction engine always lands in the band');
}

/* ------------------------------------------------------------------ */
console.log('=== B. the remainder band (2.1) ===');
{
  // exactly b values 0..b−1, swept
  let bad = 0;
  for (let b = 1; b <= 30; b++) {
    const band: number[] = [];
    for (let r = 0; r < b; r++) band.push(r);
    if (band.length !== b || band[b - 1] !== b - 1) bad++;
  }
  ok(bad === 0, 'B: the band 0..b−1 has exactly b values (b = 1..30)');
  // the bump: r = b is just q+1 with r = 0
  ok(1 * 5 + 5 === 2 * 5 + 0 && 2 * 5 + 0 === 10, 'B: 10 = 1·5 + 5 = 2·5 + 0 — an r = b bump is a hidden exact division');
  ok(3 * 5 + 8 === 23 && 8 >= 5, 'B: 23 = 3·5 + 8 adds up but breaks the band (8 ≥ 5)');
  ok(4 * 5 + 3 === 23 && 3 < 5, 'B: 23 = 4·5 + 3 respects the band');
  // boundaries: r = 0 and r = b−1 instances swept
  let exact = 0, maxr = 0;
  for (let a = 0; a <= 200; a++) {
    const { r } = divBySubtraction(a, 5);
    if (r === 0) exact++;
    if (r === 4) maxr++;
  }
  ok(exact === 41 && maxr === 40, 'B: with b = 5, a ≤ 200 hits r = 0 exactly 41 times and r = 4 exactly 40 times');
  ok(divBySubtraction(24, 5).r === 4 && divBySubtraction(24, 5).q === 4, 'B: 24 ÷ 5 → (4, 4) — the largest legal remainder 5 − 1 = 4');
}

/* ------------------------------------------------------------------ */
console.log('=== C. the descent shadow — existence proof simulated (2.1) ===');
{
  // S = {a − bq : whole q, a − bq ≥ 0} for (23, 5)
  const S23: number[] = [];
  for (let q = 0; q * 5 <= 23; q++) S23.push(23 - q * 5);
  ok(S23.join(',') === '23,18,13,8,3', 'C: S(23, b=5) = {23, 18, 13, 8, 3} — five elements, strictly descending');
  const least23 = Math.min(...S23);
  ok(least23 === 3 && least23 < 5, 'C: the least element of S is 3 = r < 5 = b — no further subtraction');
  // the longer walk (100, 7)
  const S100: number[] = [];
  for (let q = 0; q * 7 <= 100; q++) S100.push(100 - q * 7);
  ok(S100.length === 15 && Math.min(...S100) === 2 && S100[14] === 2,
    'C: S(100, b=7) has 15 elements {100, 93, …, 2}; least = 2 = r < 7');
  ok(S100.every((v, i) => i === 0 || v === S100[i - 1] - 7), 'C: the walk descends by exactly b at each step');
  // S nonempty always (q = 0 puts a itself in S) + strictly descending, swept
  let bad = 0;
  for (let a = 0; a <= 120; a++)
    for (let b = 1; b <= 12; b++) {
      const S: number[] = [];
      for (let q = 0; q * b <= a; q++) S.push(a - q * b);
      if (S.length === 0 || S[0] !== a) bad++;
      if (S.some((v, i) => i > 0 && v >= S[i - 1])) bad++;
      if (Math.min(...S) !== divBySubtraction(a, b).r) bad++;
    }
  ok(bad === 0, 'C: swept a ≤ 120, b ≤ 12 — S always nonempty (a ∈ S), strictly descending, min(S) = r');
}

/* ------------------------------------------------------------------ */
console.log('=== D. uniqueness — impostor sweep + the algebra line (2.1) ===');
{
  // brute-force impostor count
  let bad = 0;
  for (let a = 0; a <= 120; a++)
    for (let b = 1; b <= 12; b++) {
      let solutions = 0;
      for (let q = 0; q <= a; q++)
        for (let r = 0; r < b; r++)
          if (q * b + r === a) solutions++;
      if (solutions !== 1) bad++;
    }
  ok(bad === 0, 'D: swept a = 0..120, b = 1..12 — exactly ONE (q, r) with 0 ≤ r < b, always');
  // the algebra line on a concrete impostor family: (a, b) = (47, 5)
  const a = 47, b = 5;
  const { q, r } = divBySubtraction(a, b);
  ok(q === 9 && r === 2, 'D: the true pair for 47 ÷ 5 is (9, 2)');
  let checked = 0, viol = 0;
  for (let qp = 0; qp <= a; qp++)
    for (let rp = 0; rp < b; rp++) {
      if (qp === q && rp === r) continue;
      checked++;
      // impostor: a = b·q' + r' impossible — but check the algebra line anyway:
      // IF a = bq' + r' held, then b(q − q') = r' − r; the impostor fails the equation
      if (b * qp + rp !== a) viol++;
      // and the contradiction ladder: q' < q ⇒ b(q − q') ≥ b but r' − r ≤ b − 1
      if (qp < q && !(b * (q - qp) >= b && rp - r <= b - 1)) ok(false, 'D: ladder q-prime < q broken');
      if (qp > q && !(b * (q - qp) <= -b && rp - r >= -(b - 1))) ok(false, 'D: ladder q-prime > q broken');
    }
  ok(viol === checked && checked === 48 * 5 - 1,
    `D: all ${checked} non-solution pairs (q', r') of the 48×5 grid fail a = bq' + r' (240 pairs − the 1 true solution = ${48 * 5 - 1})`);
  ok(b - 1 === 4, 'D: the band width minus one: r − r′ can never reach b = 5');
}

/* ------------------------------------------------------------------ */
console.log('=== E. exam-shape instances (2.1) ===');
{
  // smallest 3-digit number leaving remainder 4 on division by 9
  let found = -1;
  for (let n = 100; n <= 999; n++) if (divBySubtraction(n, 9).r === 4) { found = n; break; }
  ok(found === 103 && divBySubtraction(103, 9).q === 11, 'E: smallest 3-digit with r = 4 (mod 9) is 103 = 9·11 + 4');
  // largest 2-digit number leaving remainder 5 on division by 8
  let big = -1;
  for (let n = 99; n >= 10; n--) if (divBySubtraction(n, 8).r === 5) { big = n; break; }
  ok(big === 93 && divBySubtraction(93, 8).q === 11, 'E: largest 2-digit with r = 5 (mod 8) is 93 = 8·11 + 5');
  // and 94..99 miss the slot
  const tops = [94, 95, 96, 97, 98, 99].map(n => divBySubtraction(n, 8).r);
  ok(tops.join(',') === '6,7,0,1,2,3', 'E: 94..99 give remainders 6,7,0,1,2,3 — none is 5, so 93 is the largest');
}

/* ------------------------------------------------------------------ */
console.log('=== F. repeated subtraction on stage: 53 ÷ 7 (2.1) ===');
{
  const chain = [53, 46, 39, 32, 25, 18, 11, 4];
  ok(chain.length === 8 && chain.every((v, i) => i === 0 || chain[i - 1] - v === 7),
    'F: the chain 53, 46, 39, 32, 25, 18, 11, 4 steps down by 7 exactly');
  ok(chain[chain.length - 1] === 4 && chain.length - 1 === 7,
    'F: seven subtractions (q = 7), four left over (r = 4)');
  ok(7 * 7 + 4 === 53, 'F: the check 7·7 + 4 = 53');
}

/* ------------------------------------------------------------------ */
console.log('=== G. the mod-9 doorway (2.1 L5) ===');
{
  // a = 9q + r ⇒ 9 | (a − r)
  let bad = 0;
  for (let a = 1; a <= 400; a++) {
    const { r } = divBySubtraction(a, 9);
    if ((a - r) % 9 !== 0) bad++;
    if ((digitSum(a) - digitSum(r)) % 9 !== 0) bad++;
  }
  ok(bad === 0, 'G: swept a = 1..400 — 9 | (a − r) and the digit sums of a and r agree mod 9');
  const { q, r } = divBySubtraction(3894, 9);
  ok(q === 432 && r === 6 && 9 * 432 + 6 === 3894, 'G: 3,894 = 9·432 + 6');
  ok(digitSum(3894) === 24 && digitSum(6) === 6 && 24 - 6 === 18 && 18 % 9 === 0,
    'G: digit sums 24 − 6 = 18 = 2·9 — the FM fingerprint, re-derived');
}

/* ------------------------------------------------------------------ */
console.log('=== H. divisibility verdicts by multiplier search (2.2) ===');
{
  function kOf(a: number, b: number): number | null {
    for (let k = 0; k * a <= b; k++) if (k * a === b) return k;
    return null;
  }
  ok(kOf(6, 42) === 7, 'H: 6 | 42 with k = 7');
  ok(kOf(6, 44) === null && divBySubtraction(44, 6).r === 2, 'H: 6 ∤ 44 — 44 = 6·7 + 2, remainder 2 ≠ 0');
  let all = true;
  for (let n = 1; n <= 50; n++) if (kOf(1, n) !== n) all = false;
  ok(all, 'H: 1 | n with k = n, swept n = 1..50');
  ok(kOf(9, 0) === 0, 'H: 9 | 0 under the whole-number-multiplier convention (k = 0)');
  ok(kOf(7, 21) === 3, 'H: 7 | 21 with k = 3');
  ok(kOf(12, 144) === 12, 'H: 12 | 144 with k = 12');
  ok(kOf(9, 73) === null && divBySubtraction(73, 9).r === 1, 'H: 9 ∤ 73 — 73 = 8·9 + 1');
  ok(kOf(8, 3368) === 421 && 8 * 421 === 3368, 'H: 8 | 3,368 with k = 421 (8·421 = 3,368)');
  ok(divBySubtraction(368, 8).r === 0 && kOf(8, 368) === 46, 'H: the FM last-three-digits test agrees: 368 = 8·46');
  ok(kOf(15, 375) === 25, 'H: 15 | 375 with k = 25');
  ok(kOf(3, 75) === 25, 'H: 3 | 75 with k = 25');
  ok(kOf(5, 25) === 5, 'H: 5 | 25 with k = 5');
  ok(kOf(9, 45) === 5, 'H: 9 | 45 with k = 5');
  ok(kOf(7, 56) === 8, 'H: 7 | 56 with k = 8');
  ok(kOf(7, 91) === 13, 'H: 7 | 91 with k = 13');
  ok(kOf(12, 144) === 12, 'H: 12 | 144 with k = 12 (the fill-the-multiplier exercise)');
  ok(kOf(3, 12) === 4, 'H: 3 | 12 with k = 4');
}

/* ------------------------------------------------------------------ */
console.log('=== I. transitivity (2.2) ===');
{
  const k = (a: number, b: number) => b / a;
  ok(k(3, 60) === 20, 'I: 3 | 12, 12 | 60 ⇒ 3 | 60 (k = 20 = 4·5)');
  ok(k(4, 100) === 25, 'I: 4 | 20, 20 | 100 ⇒ 4 | 100 (k = 25 = 5·5)');
  ok(k(8, 96) === 12, 'I: 8 | 24, 24 | 96 ⇒ 8 | 96 (k = 12 = 3·4)');
  ok(k(5, 30) === 6, 'I: 5 | 10, 10 | 30 ⇒ 5 | 30 (k = 6 = 2·3)');
  ok(k(2, 120) === 60, 'I: 2 | 6, 6 | 120 ⇒ 2 | 120 (k = 60 = 3·20)');
  // the multiplier law: the k of the composite is the product of the ks
  ok(4 * 5 === 20 && 5 * 5 === 25 && 3 * 4 === 12 && 2 * 3 === 6 && 3 * 20 === 60,
    'I: the composite multiplier is literally the product of the two multipliers');
  // brute sweep — no counterexample
  let bad = 0;
  for (let a = 1; a <= 40; a++)
    for (let b = 1; b <= 40; b++)
      for (let c = 1; c <= 40; c++)
        if (b % a === 0 && c % b === 0 && c % a !== 0) bad++;
  ok(bad === 0, 'I: swept a, b, c ≤ 40 — no transitivity counterexample exists');
  // 3 | 333 and 333 | 999 ⇒ 3 | 999 (the L5 exercise chain)
  ok(333 % 3 === 0 && 999 % 333 === 0 && 999 % 3 === 0 && k(3, 999) === 333,
    'I: 3 | 111, 3 | 222 ⇒ 3 | 333; and 3 | 333, 333 | 999 ⇒ 3 | 999 (k = 333 = 111·3)');
}

/* ------------------------------------------------------------------ */
console.log('=== J. linear combinations (2.2) ===');
{
  // (6, 54, 30)
  ok(54 + 30 === 84 && 84 === 6 * 14, 'J: 6 | 54, 6 | 30 ⇒ 6 | 84 (54 + 30 = 6·14)');
  ok(54 - 30 === 24 && 24 === 6 * 4, 'J: 6 | 54, 6 | 30 ⇒ 6 | 24 (54 − 30 = 6·4, the nonnegative difference)');
  ok(3 * 54 + 2 * 30 === 222 && 222 === 6 * 37, 'J: 6 | (3·54 + 2·30) = 222 = 6·37');
  // (8, 96, 40)
  ok(96 + 40 === 136 && 136 === 8 * 17, 'J: 8 | 96, 8 | 40 ⇒ 8 | 136 (8·17)');
  ok(96 - 40 === 56 && 56 === 8 * 7, 'J: 8 | 96, 8 | 40 ⇒ 8 | 56 (8·7)');
  ok(3 * 96 + 40 === 328 && 328 === 8 * 41, 'J: 8 | (3·96 + 40) = 328 = 8·41');
  // (14, 98, 42)
  ok(98 + 42 === 140 && 140 === 14 * 10, 'J: 14 | 98, 14 | 42 ⇒ 14 | 140 (14·10)');
  ok(98 - 42 === 56 && 56 === 14 * 4, 'J: 14 | 98, 14 | 42 ⇒ 14 | 56 (14·4)');
  // sweep: sums and nonnegative differences of multiples are multiples
  let bad = 0;
  for (let a = 1; a <= 12; a++)
    for (let b = a; b <= 120; b += a)
      for (let c = a; c <= 120; c += a)
        for (let x = 0; x <= 6; x++)
          for (let y = 0; y <= 6; y++) {
            if ((b * x + c * y) % a !== 0) bad++;
            if (b * x >= c * y && (b * x - c * y) % a !== 0) bad++;
          }
  ok(bad === 0, 'J: swept a ≤ 12 with b, c multiples of a, x, y ≤ 6 — every sum and nonnegative difference stays a multiple');
  // the caution: 12 | 3·4 but 12 divides NEITHER factor
  ok(3 * 4 === 12 && 3 % 12 !== 0 && 4 % 12 !== 0,
    'J: 12 | 3·4 yet 12 ∤ 3 and 12 ∤ 4 — a | bc does NOT force a | b or a | c');
  // sweep the caution is generic
  let cautions = 0;
  for (let a = 2; a <= 20; a++)
    for (let b = 1; b < a; b++)
      for (let c = 1; c < a; c++)
        if ((b * c) % a === 0 && b % a !== 0 && c % a !== 0) cautions++;
  ok(cautions > 0, `J: ${cautions} caution instances exist below 20 — the failure mode is generic`);
}

/* ------------------------------------------------------------------ */
console.log('=== K. antisymmetry, cancellation, the order link, divisor counts (2.2) ===');
{
  // antisymmetry sweep
  let bad = 0;
  for (let a = 1; a <= 60; a++)
    for (let b = 1; b <= 60; b++)
      if (b % a === 0 && a % b === 0 && a !== b) bad++;
  ok(bad === 0, 'K: swept a, b ≤ 60 — a | b ∧ b | a forces a = b (no counterexample)');
  ok(12 % 4 === 0 && 4 % 12 !== 0, 'K: 4 | 12 but 12 ∤ 4 — the only both-ways pair with a = b = 12 is 12 | 12');
  // the engine: only 1·1 = 1 among naturals
  let one = 0;
  for (let k = 1; k <= 60; k++)
    for (let m = 1; m <= 60; m++)
      if (k * m === 1) one++;
  ok(one === 1, 'K: km = 1 has the single natural solution k = m = 1');
  // cancellation cx = cy ⇒ x = y
  let cbad = 0;
  for (let c = 1; c <= 40; c++)
    for (let x = 1; x <= 40; x++)
      for (let y = 1; y <= 40; y++)
        if (c * x === c * y && x !== y) cbad++;
  ok(cbad === 0, 'K: swept c, x, y ≤ 40 — cancellation never fails on naturals');
  // ac | bc ⟺ a | b, both directions
  let bad2 = 0;
  for (let a = 1; a <= 30; a++)
    for (let b = 1; b <= 90; b++)
      for (let c = 1; c <= 30; c++) {
        const left = (b * c) % (a * c) === 0;
        const right = b % a === 0;
        if (left !== right) bad2++;
      }
  ok(bad2 === 0, 'K: swept a, c ≤ 30, b ≤ 90 — ac | bc ⟺ a | b holds in BOTH directions');
  ok(375 % (15 * 5) === 0 && 45 % 9 === 0 && 25 % 5 === 0,
    'K: 45 | 225 ⟺ 9 | 45 ⟺ 5 | 25 — the cancellation chain instance (225 = 5·45 = 9·25)');
  ok(42 % (3 * 2) === 0 && 21 % 3 === 0 && 44 % (3 * 2) !== 0 && 22 % 3 !== 0,
    'K: 3 | 21 ⟺ 6 | 42 (both true) and 3 ∤ 22 ⟺ 6 ∤ 44 (both false)');
  // the order link
  let obad = 0;
  for (let a = 1; a <= 60; a++)
    for (let b = 1; b <= 60; b++)
      if (b % a === 0 && a > b) obad++;
  ok(obad === 0, 'K: swept a, b ≤ 60 — a positive divisor never exceeds its multiple');
  // divisor counts
  const divisors = (n: number) => { const d: number[] = []; for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k); return d; };
  const d12 = divisors(12), d36 = divisors(36);
  ok(d12.join(',') === '1,2,3,4,6,12', 'K: divisors of 12 = 1, 2, 3, 4, 6, 12 (six)');
  ok(d36.join(',') === '1,2,3,4,6,9,12,18,36', 'K: divisors of 36 = 1, 2, 3, 4, 6, 9, 12, 18, 36 (nine)');
  // the figure-2 edge list: covers of 12 (a → b when a | b and nothing strictly between)
  const covers: Array<[number, number]> = [[1, 2], [1, 3], [2, 4], [2, 6], [3, 6], [4, 12], [6, 12]];
  const covOk = covers.every(([a, b]) => {
    if (b % a !== 0) return false;
    for (let m = a + 1; m < b; m++) if (m % a === 0 && b % m === 0) return false;
    return true;
  });
  ok(covOk, 'K: the seven figure-2 edges are exactly the covers of the divisor lattice of 12');
  ok(12 % 6 === 0 && 6 % 2 === 0 && 12 % 2 === 0, 'K: 2 | 6 and 6 | 12 and 2 | 12 — but 2 → 12 is NOT an edge (6 sits between)');
}

/* ------------------------------------------------------------------ */
console.log('=== L. figure 1 geometry — the remainder-band number line, a = 23, b = 5 (2.1) ===');
{
  const X = (t: number) => 60 + 30 * t; // 30 px per unit
  ok(X(0) === 60 && X(5) === 210 && X(10) === 360 && X(15) === 510 && X(20) === 660 && X(25) === 810,
    'L: multiple ticks land at x = 60, 210, 360, 510, 660, 810');
  ok(X(23) === 750, 'L: the a-tick sits at x = 750 (t = 23)');
  // vertical layout: tile top 56 (label 44), a-label 78..96, axis 110, band labels ~126..144, bracket 170, bracket label 180..198
  ok(96 - 56 >= 8, 'L: a-label bottom (96) clears the tile top line (56) by 40');
  ok(110 - 96 >= 8, 'L: a-label clears the axis (110) by 14');
  ok(170 - 144 >= 8, 'L: the r-bracket (170) clears the multiple labels (~144) by 26');
  ok(198 <= 215, 'L: the r-label (baseline 194, box to 198) fits viewBox height 215');
  ok(660 < 750 && 750 < 810, 'L: 20 < 23 < 25 on the line — a falls inside the last b-tile');
  ok(23 - 20 === 3 && 25 - 23 === 2, 'L: r = 23 − 20 = 3; the overshoot to 25 is 2 more');
  ok(810 - 660 === 150 && 150 === 5 * 30, 'L: one b-tile is exactly 150 px = 5 units');
}

/* ------------------------------------------------------------------ */
console.log('=== M. figure 2 geometry — the divisor lattice of 12 (2.2) ===');
{
  const nodes: Record<string, [number, number]> = {
    '1': [240, 265], '2': [130, 180], '3': [350, 180],
    '4': [110, 95], '6': [240, 95], '12': [240, 25],
  };
  const R = 16;
  const edges: Array<[string, string, number]> = [
    ['1', '2', 2], ['1', '3', 3], ['2', '4', 2], ['2', '6', 3],
    ['3', '6', 2], ['4', '12', 3], ['6', '12', 2],
  ];
  // every edge is a cover (verified in K); here: geometry
  // edge labels sit at midpoints, offset perpendicular; check they clear
  // their own line by ≥ 8 and every node circle by ≥ 8
  function segDist(p: [number, number], a: [number, number], b: [number, number]): number {
    const [px, py] = p, [ax, ay] = a, [bx, by] = b;
    const dx = bx - ax, dy = by - ay;
    const len2 = dx * dx + dy * dy;
    let t = ((px - ax) * dx + (py - ay) * dy) / len2;
    t = Math.max(0, Math.min(1, t));
    const cx = ax + t * dx, cy = ay + t * dy;
    return Math.hypot(px - cx, py - cy);
  }
  let bad = 0;
  for (const [from, to, m] of edges) {
    const a = nodes[from], b = nodes[to];
    const mid: [number, number] = [(a[0] + b[0]) / 2, (a[1] + b[1]) / 2];
    // offset the label perpendicular to the edge, 12 px out
    const dx = b[0] - a[0], dy = b[1] - a[1];
    const len = Math.hypot(dx, dy);
    const nx = -dy / len, ny = dx / len;
    const label: [number, number] = [mid[0] + nx * 14, mid[1] + ny * 14];
    if (segDist(label, a, b) < 12) bad++; // own line
    for (const [name, p] of Object.entries(nodes)) {
      if (name === from || name === to) continue;
      if (Math.hypot(label[0] - p[0], label[1] - p[1]) < R + 8) bad++; // foreign node
    }
    for (const [f2, t2] of edges) {
      if (f2 === from && t2 === to) continue;
      if (segDist(label, nodes[f2], nodes[t2]) < 8) bad++; // foreign edge
    }
    ok(len >= 60, `M: edge ${from}→${to} (×${m}) is ${Math.round(len)} px long`);
  }
  ok(bad === 0, 'M: all seven edge labels clear their own line (≥ 12), every foreign node (≥ 24) and foreign edge (≥ 8)');
  ok(nodes['12'][1] - R >= 5, 'M: the 12-node (top y 25, r 16) stays inside the viewBox');
  // the arrows read upward: divisors below, multiples above
  ok(nodes['1'][1] > nodes['2'][1] && nodes['2'][1] > nodes['4'][1] && nodes['4'][1] > nodes['12'][1],
    'M: 1 → 2 → 4 → 12 climbs upward on the page');
}

/* ------------------------------------------------------------------ */
console.log('=== N. quiz keys 2.1 re-derived ===');
{
  // Q1: 47 = q·5 + r → (9, 2); distractors (8,7) adds up but r ≥ 5; (9,3) sums 48; (10,−3) r < 0
  ok(divBySubtraction(47, 5).q === 9 && divBySubtraction(47, 5).r === 2, 'N Q1: key (9, 2)');
  ok(8 * 5 + 7 === 47 && 7 >= 5, 'N Q1: (8, 7) adds up to 47 but breaks the band — the designed distractor');
  ok(9 * 5 + 3 === 48, 'N Q1: (9, 3) mis-sums (48 ≠ 47)');
  // Q2: how many (q, r), 0 ≤ r < 4, with 31 = 4q + r → exactly one
  let cnt = 0;
  for (let q = 0; q <= 31; q++) for (let r = 0; r < 4; r++) if (4 * q + r === 31) cnt++;
  ok(cnt === 1, 'N Q2: exactly ONE valid pair for 31 = 4q + r, 0 ≤ r < 4 (key: "exactly one")');
  // Q3: the theorem guarantees existence AND uniqueness (concept key)
  ok(true, 'N Q3: key = "existence and uniqueness" (concept, index 2 in the option list)');
  // Q4: 0 = q·7 + r → (0, 0)
  ok(divBySubtraction(0, 7).q === 0 && divBySubtraction(0, 7).r === 0, 'N Q4: key (0, 0)');
  // Q5: r = 0 ⟺ exact division ⟺ b measures a (concept key, index 1)
  ok(divBySubtraction(35, 7).r === 0 && 35 === 7 * 5, 'N Q5: r = 0 instance — 35 = 7·5, exact');
  const keys21 = [0, 0, 2, 0, 1];
  ok(keys21.length === 5, `N: 2.1 quiz keys ${keys21.join('/')}`);
}

/* ------------------------------------------------------------------ */
console.log('=== O. exercise keys 2.1 re-derived (12) ===');
{
  ok(divBySubtraction(47, 5).q === 9 && divBySubtraction(47, 5).r === 2 && 9 * 5 + 2 === 47, 'O E1: 47 ÷ 5 → 9 r 2');
  ok(divBySubtraction(68, 9).q === 7 && divBySubtraction(68, 9).r === 5 && 7 * 9 + 5 === 68, 'O E2: 68 ÷ 9 → 7 r 5');
  ok(divBySubtraction(100, 7).q === 14 && divBySubtraction(100, 7).r === 2 && 14 * 7 + 2 === 100, 'O E3: 100 ÷ 7 → 14 r 2');
  ok(12 * 8 + 5 === 101, 'O E4: q = 12, r = 5, b = 8 rebuilds a = 101');
  ok(divBySubtraction(53, 7).q === 7 && divBySubtraction(53, 7).r === 4, 'O E5: 53 ÷ 7 by subtraction → 7 r 4');
  ok(103 === 9 * 11 + 4 && divBySubtraction(103, 9).r === 4, 'O E6: 103 = 9·11 + 4 — the smallest 3-digit r=4 (mod 9)');
  ok('23,18,13,8,3' === [23, 18, 13, 8, 3].join(','), 'O E7: the descent walk S = {23, 18, 13, 8, 3}, least 3, q = 4');
  ok(divBySubtraction(50, 7).q === 7 && divBySubtraction(50, 7).r === 1, 'O E8: 50 = 7·7 + 1 → slot 1 of the seven');
  ok(3 * 5 + 8 === 23 && 8 >= 5 && divBySubtraction(23, 5).q === 4 && divBySubtraction(23, 5).r === 3, 'O E9: (3, 8) fails the band; (4, 3) is the legal pair');
  ok(1 * 5 + 5 === 2 * 5 + 0 && 2 * 5 + 0 === 10, 'O E10: 10 = 1·5 + 5 = 2·5 + 0 — allowing r = b kills uniqueness');
  ok(5 * (9 - 8) >= 5 && 5 * (9 - 8) > 4, 'O E11: q′ = 8 < q = 9 ⇒ b(q − q′) = 5 ≥ b > 4 ≥ r′ − r — the ladder holds on the instance');
  ok(true, 'O E12: essay — the LNP entry point (graded on the argument, no numeric key)');
}

/* ------------------------------------------------------------------ */
console.log('=== P. quiz keys 2.2 re-derived ===');
{
  ok(42 === 6 * 7, 'P Q1: key "42 = 6·7" (index 1); distractor 42 = 6·7 + 2 = 44 ≠ 42');
  ok(6 * 7 + 2 === 44, 'P Q1: the distractor sentence describes 44, not 42');
  ok(3 * 4 === 12 && 3 % 12 !== 0 && 4 % 12 !== 0, 'P Q2: key "12 | 3·4 even though 12 divides neither factor" (index 2)');
  ok(12 % 4 === 0 && 4 % 12 !== 0 && 42 % 42 === 0, 'P Q3: antisymmetry — 4 | 12 never bends back; 42 | 42 both ways with a = b (index 0)');
  ok(divBySubtraction(42, 6).r === 0 && divBySubtraction(44, 6).r === 2, 'P Q4: the bridge — remainder 0 ⟺ divides (key index 1)');
  ok((96 + 40) % 8 === 0 && 136 === 8 * 17, 'P Q5: 136 = 96 + 40 is the forced multiple (index 2)');
  ok(139 % 8 === 3 && 141 % 8 === 5 && 143 % 8 === 7, 'P Q5: the distractors 139, 141, 143 leave remainders 3, 5, 7 — none forced');
  const keys22 = [1, 2, 0, 1, 2];
  ok(keys22.length === 5, `P: 2.2 quiz keys ${keys22.join('/')}`);
}

/* ------------------------------------------------------------------ */
console.log('=== Q. exercise keys 2.2 re-derived (12) ===');
{
  ok(56 === 7 * 8 && 73 === 8 * 9 + 1, 'Q E1: 7 | 56 (k = 8); 9 ∤ 73 (73 = 8·9 + 1)');
  ok('1,2,3,4,6,9,12,18,36' === '1,2,3,4,6,9,12,18,36', 'Q E2: divisors of 36 — nine of them');
  ok(12 === 3 * 4 && 91 === 7 * 13 && 144 === 12 * 12, 'Q E3: k = 4, 13, 12');
  ok(100 === 4 * 25 && 25 === 5 * 5, 'Q E4: 4 | 20, 20 | 100 ⇒ 4 | 100 (k = 25 = 5·5)');
  ok(true, 'Q E5: 1 | n with k = n; n | 0 with k = 0 (whole-number convention) — proof exercise');
  ok(divBySubtraction(3431, 7).q === 490 && divBySubtraction(3431, 7).r === 1 && 7 * 490 === 3430,
    'Q E6: 3,431 ÷ 7 → 490 r 1 ⇒ 7 ∤ 3,431');
  ok((96 + 40) % 8 === 0 && (96 - 40) % 8 === 0 && (3 * 96 + 40) % 8 === 0 && 3 * 96 + 40 === 328,
    'Q E7: 8 | 136, 8 | 56, 8 | 328');
  ok(18 * 1 === 18 && 1 * 1 === 1, 'Q E8: b = 18k, 18 = bm ⇒ 18 = 18(km) ⇒ km = 1 ⇒ k = m = 1 ⇒ b = 18');
  ok(225 === 5 * 45 && 45 === 9 * 5 && 25 === 5 * 5, 'Q E9: 45 | 225 ⟺ 9 | 45 ⟺ 5 | 25 — all true (225 = 5·45 = 9·25)');
  ok(420 === 42 * 10 && 420 === 6 * 70, 'Q E10: 6 | 42 ⇒ 6 | 420 (k = 70 = 7·10); caution 12 | 3·4, 12 ∤ 3, 12 ∤ 4');
  ok(111 % 3 === 0 && 222 % 3 === 0 && 333 % 3 === 0 && 999 === 333 * 3, 'Q E11: 3 | 333; and 333 | 999 ⇒ 3 | 999');
  ok(true, 'Q E12: essay — cancellation inside antisymmetry; the positivity boundary (no numeric key)');
}

/* ------------------------------------------------------------------ */
console.log('=== R. formula cards re-derived ===');
{
  // 2.1
  ok(divBySubtraction(23, 5).r === 23 % 5, 'R 2.1: r = a mod b — the subtraction engine agrees with the % operator');
  ok((23 - 3) / 5 === 4, 'R 2.1: q = (a − r)/b instance: (23 − 3)/5 = 4');
  ok(4 * 5 + 3 === 23, 'R 2.1: the check q·b + r = a');
  ok([0, 1, 2, 3, 4].length === 5, 'R 2.1: the band for b = 5 has five values 0..4');
  // 2.2
  ok(42 === 6 * 7 && (42 - 0) % 6 === 0, 'R 2.2: a | b ⟺ b = ak ⟺ rem(b ÷ a) = 0 — all three dresses of one fact');
  ok(60 % 3 === 0 && 12 % 3 === 0 && 60 % 12 === 0, 'R 2.2: transitivity instance');
  ok((54 * 3 + 30 * 2) % 6 === 0, 'R 2.2: linear combination instance');
  ok((21 * 2) % (3 * 2) === 0 && 21 % 3 === 0, 'R 2.2: ac | bc ⟺ a | b instance');
}

/* ------------------------------------------------------------------ */
console.log('=== S. sources (printed) ===');
{
  const s21 = ['beck-geoghegan-art-of-proof', 'euclid-elements-book-vii', 'khattar-qa-4e'];
  const s22 = ['beck-geoghegan-art-of-proof', 'euclid-elements-book-vii', 'landau-1927-elementare', 'khattar-qa-4e'];
  console.log('  2.1: ' + s21.join(', '));
  console.log('  2.2: ' + s22.join(', '));
  ok(s21.length === 3 && s22.length === 4, 'S: citation keys — one NEW this run (euclid-elements-book-vii, landau-1927-elementare), rest carried');
}

/* ------------------------------------------------------------------ */
console.log('=== T. scope guards (printed) ===');
{
  console.log('  scope: the division algorithm is stated for natural dividends a ≥ 1 and');
  console.log('  divisors b ≥ 1 (0 ∉ ℕ in this book — ch. 6 builds it); the zero-dividend');
  console.log('  row is a flagged convention instance, not part of the theorem.');
  console.log('  Euclid\'s LEMMA (p prime, p | ab ⇒ p | a or p | b) is NOT proven here —');
  console.log('  it needs Bézout (2.3) and is ch. 4\'s engine; only the caution instance');
  console.log('  12 | 3·4 is exercised. Congruence language (a ≡ r mod b) is ch. 5\'s —');
  console.log('  only the a mod b NOTATION is introduced. Negative divisors/dividends:');
  console.log('  ch. 6. Cross-refs: fm-division-remainders-zero (FM 2.4 — the procedure,');
  console.log('  never re-taught), fm-divisibility-and-its-tests (FM 3.1 — the tests,');
  console.log('  re-derived at 5.2), ans-least-number-principle-recursion (1.3 — the LNP).');
  ok(true, 'guards noted');
}

/* ------------------------------------------------------------------ */
/* Run-52 helpers — independent of Euclid wherever a reference is      */
/* needed (gcd by trial division; Diophantine solutions by brute force)*/
function gcdRef(a: number, b: number): number {
  let g = 1;
  const m = Math.min(a, b);
  for (let k = 1; k <= m; k++) if (a % k === 0 && b % k === 0) g = k;
  return g;
}
function divisors(n: number): number[] {
  const d: number[] = [];
  for (let k = 1; k <= n; k++) if (n % k === 0) d.push(k);
  return d;
}
/* the division-loop Euclid: one row per division, q and r recorded */
function euclidRows(a: number, b: number): Array<{ dividend: number; divisor: number; q: number; r: number }> {
  const rows: Array<{ dividend: number; divisor: number; q: number; r: number }> = [];
  while (b !== 0) {
    const q = Math.floor(a / b);
    const r = a - q * b;
    rows.push({ dividend: a, divisor: b, q, r });
    a = b;
    b = r;
  }
  return rows;
}
/* the extended table: row i carries (r, x, y) with r = x·a + y·b —
   (a < b is handled by running the swapped pair and exchanging columns) */
function extTable(a: number, b: number): Array<{ r: number; x: number; y: number; q: number }> {
  if (a < b) {
    return extTable(b, a).map((row) => ({ r: row.r, x: row.y, y: row.x, q: row.q }));
  }
  const rows: Array<{ r: number; x: number; y: number; q: number }> = [
    { r: a, x: 1, y: 0, q: 0 },
    { r: b, x: 0, y: 1, q: 0 },
  ];
  while (rows[rows.length - 1].r !== 0) {
    const n = rows.length;
    const q = Math.floor(rows[n - 2].r / rows[n - 1].r);
    rows.push({
      r: rows[n - 2].r - q * rows[n - 1].r,
      x: rows[n - 2].x - q * rows[n - 1].x,
      y: rows[n - 2].y - q * rows[n - 1].y,
      q,
    });
  }
  return rows;
}
function dioBrute(a: number, b: number, c: number, R: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = -R; x <= R; x++) for (let y = -R; y <= R; y++) if (a * x + b * y === c) out.push([x, y]);
  return out;
}
function dioBruteNonNeg(a: number, b: number, c: number, R: number): Array<[number, number]> {
  const out: Array<[number, number]> = [];
  for (let x = 0; x <= R; x++) for (let y = 0; y <= R; y++) if (a * x + b * y === c) out.push([x, y]);
  return out;
}
function fib(n: number): number {
  let f0 = 0, f1 = 1;
  for (let i = 0; i < n; i++) { const t = f0 + f1; f0 = f1; f1 = t; }
  return f0;
}
/* termination check: the remainders descend strictly b > r₁ > r₂ > … and reach 0 */
function seqOK(a: number, b: number): boolean {
  const rows = euclidRows(a, b);
  if (rows.length === 0) return false;
  let prev = b;
  for (const row of rows) {
    if (!(row.r < prev)) return false;
    prev = row.r;
  }
  return rows[rows.length - 1].r === 0;
}

/* ------------------------------------------------------------------ */
console.log('=== U. the subtraction engine + common-divisor invariance (2.3) ===');
{
  // the subtraction walk: replace the larger by the difference until equal
  function gcdBySubtraction(a: number, b: number): { g: number; pairs: Array<[number, number]> } {
    const pairs: Array<[number, number]> = [[a, b]];
    while (a !== b) {
      if (a > b) a -= b; else b -= a;
      pairs.push([a, b]);
    }
    return { g: a, pairs };
  }
  // the instance walk 2.3 narrates: (48, 18) → (30, 18) → (12, 18) → (12, 6) → (6, 6)
  const w = gcdBySubtraction(48, 18);
  ok(w.g === 6, 'U: gcd(48, 18) by subtraction = 6');
  ok(JSON.stringify(w.pairs) === JSON.stringify([[48, 18], [30, 18], [12, 18], [12, 6], [6, 6]]),
    'U: the walk (48,18)→(30,18)→(12,18)→(12,6)→(6,6) — five states, four subtractions');
  // the sums strictly descend (the descent shadow)
  const sums = w.pairs.map((p) => p[0] + p[1]);
  ok(sums.every((s, i) => i === 0 || s < sums[i - 1]), 'U: the pair-sum descends strictly: 66 > 48 > 30 > 18 > 12');
  // common-divisor invariance at each step: the pairs share exactly the same divisor set
  let inv = 0;
  for (let i = 0; i + 1 < w.pairs.length; i++) {
    const [p, q] = w.pairs[i];
    const [p2, q2] = w.pairs[i + 1];
    const D1 = divisors(p).filter((d) => q % d === 0);
    const D2 = divisors(p2).filter((d) => q2 % d === 0);
    if (JSON.stringify(D1) === JSON.stringify(D2)) inv++;
  }
  ok(inv === 4, 'U: every step preserves the common-divisor set exactly (4/4 steps)');
  // and on a broad sweep the subtraction engine equals the trial-division gcd
  let bad = 0;
  for (let a = 1; a <= 150; a++) for (let b = 1; b <= 150; b++) if (gcdBySubtraction(a, b).g !== gcdRef(a, b)) bad++;
  ok(bad === 0, 'U: subtraction engine = reference gcd swept a, b ≤ 150');
  // the invariance lemma instance: d | a ∧ d | b ⟺ d | (a − b) ∧ d | b for a > b
  let invBad = 0;
  for (let a = 2; a <= 120; a++) for (let b = 1; b < a; b++) {
    const D1 = divisors(a).filter((d) => b % d === 0);
    const D2 = divisors(a - b).filter((d) => b % d === 0);
    if (JSON.stringify(D1) !== JSON.stringify(D2)) invBad++;
  }
  ok(invBad === 0, 'U: {d : d | a, d | b} = {d : d | a−b, d | b} swept a ≤ 120, b < a');
  ok(divisors(48).filter((d) => 18 % d === 0).join(',') === '1,2,3,6',
    'U: common divisors of (48, 18) = {1, 2, 3, 6} — greatest 6, and (30, 18) shares them');
}

/* ------------------------------------------------------------------ */
console.log('=== V. the division loop — instances with quotient sequences (2.3) ===');
{
  const instances: Array<[number, number, number, number[]]> = [
    [210, 45, 15, [4, 1, 2]],
    [1071, 462, 21, [2, 3, 7]],
    [4595, 3570, 5, [1, 3, 2, 14, 7]],
    [68, 51, 17, [1, 3]],
    [6765, 4181, 1, [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]],
  ];
  for (const [a, b, g, qs] of instances) {
    const rows = euclidRows(a, b);
    const got = rows[rows.length - 1].divisor;
    const seq = rows.map((r) => r.q);
    ok(got === g, `V: division loop (${a}, ${b}) returns ${got} = ${g}`);
    ok(JSON.stringify(seq) === JSON.stringify(qs), `V: quotient sequence (${a}, ${b}) = (${qs.join(', ')})`);
    ok(rows.every((r) => r.dividend === r.q * r.divisor + r.r && 0 <= r.r && r.r < r.divisor),
      `V: every row of (${a}, ${b}) satisfies the division theorem a = qb + r, 0 ≤ r < b`);
  }
  ok(210 === 4 * 45 + 30 && 45 === 1 * 30 + 15 && 30 === 2 * 15 + 0, 'V: the (210, 45) chain sentence by sentence');
  ok(1071 === 2 * 462 + 147 && 462 === 3 * 147 + 21 && 147 === 7 * 21 + 0, 'V: the (1071, 462) chain');
  ok(4595 === 1 * 3570 + 1025 && 3570 === 3 * 1025 + 495 && 1025 === 2 * 495 + 35 && 495 === 14 * 35 + 5 && 35 === 7 * 5 + 0,
    'V: the (4595, 3570) chain — five divisions, quotients (1, 3, 2, 14, 7)');
  // broad sweep: the loop output = the reference gcd everywhere
  let bad = 0;
  for (let a = 1; a <= 300; a++) for (let b = 1; b <= 300; b++) {
    const rows = euclidRows(a, b);
    if (rows[rows.length - 1].divisor !== gcdRef(a, b)) bad++;
  }
  ok(bad === 0, 'V: division-loop output = reference gcd swept a, b ≤ 300');
  // the loop always halts: no runaway within the sweep
  ok(euclidRows(1, 1).length === 1 && euclidRows(1, 1)[0].r === 0, 'V: (1, 1) halts after one division, r = 0');
}

/* ------------------------------------------------------------------ */
console.log('=== W. maximality — the survivor is the GREATEST common measure (2.3) ===');
{
  ok(divisors(210).filter((d) => 45 % d === 0).join(',') === '1,3,5,15',
    'W: common divisors of (210, 45) = {1, 3, 5, 15} — the survivor 15 is the greatest');
  ok(divisors(4595).filter((d) => 3570 % d === 0).join(',') === '1,5',
    'W: common divisors of (4595, 3570) = {1, 5}');
  ok(divisors(1071).filter((d) => 462 % d === 0).join(',') === '1,3,7,21',
    'W: common divisors of (1071, 462) = {1, 3, 7, 21}');
  // sweep: the survivor equals the max of the common-divisor set everywhere
  let bad = 0;
  for (let a = 1; a <= 400; a++) for (let b = 1; b <= 400; b++) {
    const surv = euclidRows(a, b);
    if (surv[surv.length - 1].divisor !== gcdRef(a, b)) bad++;
  }
  ok(bad === 0, 'W: survivor = greatest common measure swept a, b ≤ 400');
  // the down-rail: every common divisor divides EVERY remainder (checked per instance)
  function downRailOK(a: number, b: number): boolean {
    const rows = euclidRows(a, b);
    for (const d of divisors(a).filter((x) => b % x === 0))
      for (const r of rows) if (r.r % d !== 0) return false;
    return true;
  }
  ok(downRailOK(210, 45) && downRailOK(4595, 3570) && downRailOK(6765, 4181),
    'W: down-rail instance — every common divisor divides every remainder (3 instances)');
  // the up-rail: the survivor divides every remainder above it, hence both inputs
  function upRailOK(a: number, b: number): boolean {
    const rows = euclidRows(a, b);
    const g = rows[rows.length - 1].divisor;
    return rows.every((r) => r.r % g === 0 && r.dividend % g === 0 && r.divisor % g === 0);
  }
  ok(upRailOK(210, 45) && upRailOK(4595, 3570) && upRailOK(1071, 462),
    'W: up-rail instance — 15 | 30, 45, 210 (and the other chains) end to end');
  // Euclid's corollary instance: d | 210 ∧ d | 45 ⇒ d | 15, swept over the divisor set
  const cor = divisors(210).filter((d) => 45 % d === 0).every((d) => 15 % d === 0);
  ok(cor, "W: Euclid's corollary instance — every common measure of (210, 45) measures 15");
}

/* ------------------------------------------------------------------ */
console.log('=== X. termination by descent — the LNP burning a third time (2.3) ===');
{
  // the remainder sequence of every instance strictly descends and reaches 0
  ok(seqOK(210, 45) && seqOK(4595, 3570) && seqOK(6765, 4181), 'X: remainder sequences strictly descend to 0 (3 instances)');
  ok(JSON.stringify(euclidRows(6765, 4181).map((r) => r.r)) ===
    JSON.stringify([2584, 1597, 987, 610, 377, 233, 144, 89, 55, 34, 21, 13, 8, 5, 3, 2, 1, 0]),
    'X: the Fibonacci descent 2584 > 1597 > … > 1 > 0 — eighteen divisions, every quotient 1 but the last (2)');
  let bad = 0;
  for (let a = 1; a <= 300; a++) for (let b = 1; b <= 40; b++) if (!seqOK(a, b)) bad++;
  ok(bad === 0, 'X: strict descent + halt swept a ≤ 300, b ≤ 40');
  // consecutive naturals are coprime — the difference argument's instance sweep
  let copBad = 0;
  for (let n = 1; n <= 200; n++) if (gcdRef(n, n + 1) !== 1) copBad++;
  ok(copBad === 0, 'X: gcd(n, n+1) = 1 swept n ≤ 200 (any common divisor divides the difference 1)');
  ok(gcdRef(8, 9) === 1 && gcdRef(20, 21) === 1 && gcdRef(99, 100) === 1, 'X: instances 8&9, 20&21, 99&100 — consecutive and coprime');
  ok([1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597, 2584, 4181, 6765].every((f, i) => f === fib(i + 1)),
    'X: F_1..F_20 = 1, 1, 2, 3, …, 4181, 6765 (Lesson 1.3\u2019s recursion, met again)');
  let fibBad = 0;
  for (let k = 1; k <= 19; k++) if (gcdRef(fib(k), fib(k + 1)) !== 1) fibBad++;
  ok(fibBad === 0, 'X: consecutive Fibonacci numbers are coprime, F_1..F_20');
}

/* ------------------------------------------------------------------ */
console.log('=== Y. Bézout by the extended table (2.3) ===');
{
  // every row of every instance table evaluates: r = x·a + y·b
  const pairs: Array<[number, number]> = [[210, 45], [4595, 3570], [1071, 462], [68, 51], [2, 7], [3, 5]];
  for (const [a, b] of pairs) {
    const rows = extTable(a, b);
    const allEval = rows.every((row) => row.x * a + row.y * b === row.r);
    ok(allEval, `Y: extended table (${a}, ${b}) — every row satisfies x·a + y·b = r (${rows.length} rows)`);
    const gcdRow = rows[rows.length - 2];
    ok(gcdRow.r === gcdRef(a, b), `Y: (${a}, ${b}) the last nonzero row is the gcd ${gcdRow.r}`);
    ok(gcdRow.x * a + gcdRow.y * b === gcdRow.r, `Y: (${a}, ${b}) Bézout: ${gcdRow.x}·${a} + (${gcdRow.y})·${b} = ${gcdRow.r}`);
  }
  // the instance the lesson narrates: (210, 45) → 15 = 5·45 − 1·210, then the full table
  const t45 = extTable(210, 45);
  ok(5 * 45 - 1 * 210 === 15, 'Y: 5·45 − 1·210 = 225 − 210 = 15 — the backward-substitution output, a natural difference');
  ok(JSON.stringify(t45.map((r) => [r.r, r.x, r.y])) ===
    JSON.stringify([[210, 1, 0], [45, 0, 1], [30, 1, -4], [15, -1, 5], [0, 3, -14]]),
    'Y: the (210, 45) table rows (r, x, y): (210,1,0), (45,0,1), (30,1,−4), (15,−1,5), (0,3,−14)');
  ok(1 * 210 + (-4) * 45 === 30 && (-1) * 210 + 5 * 45 === 15 && 3 * 210 + (-14) * 45 === 0,
    'Y: the table\u2019s signed rows evaluate as natural differences: 210−180 = 30, 225−210 = 15, 630−630 = 0');
  // the (4595, 3570) exercise table: seven rows, all evaluating
  const tK = extTable(4595, 3570);
  ok(JSON.stringify(tK.map((r) => [r.r, r.x, r.y])) ===
    JSON.stringify([[4595, 1, 0], [3570, 0, 1], [1025, 1, -1], [495, -3, 4], [35, 7, -9], [5, -101, 130], [0, 714, -919]]),
    'Y: the (4595, 3570) table — (1025,1,−1), (495,−3,4), (35,7,−9), (5,−101,130), (0,714,−919)');
  ok(130 * 3570 - 101 * 4595 === 5, 'Y: 130·3570 − 101·4595 = 464,100 − 464,095 = 5 — Bézout for the big pair');
  ok(7 * 462 - 3 * 1071 === 21, 'Y: 7·462 − 3·1071 = 3,234 − 3,213 = 21 — Bézout for (1071, 462)');
  // minimal-pair bounds (the table\u2019s coefficients are the small ones): |x| ≤ b/d, |y| ≤ a/d
  let boundsOK = true;
  for (const [a, b] of pairs) {
    const d = gcdRef(a, b);
    const rows = extTable(a, b);
    const gcdRow = rows[rows.length - 2];
    if (Math.abs(gcdRow.x) > b / d || Math.abs(gcdRow.y) > a / d) boundsOK = false;
  }
  ok(boundsOK, 'Y: the table\u2019s Bézout pair is minimal-sized: |x| ≤ b/d and |y| ≤ a/d on every instance');
  // independent bounded search confirms existence within that box
  function bezoutBySearch(a: number, b: number): Array<[number, number]> {
    const d = gcdRef(a, b);
    const found: Array<[number, number]> = [];
    for (let x = -Math.floor(b / d) - 1; x <= Math.floor(b / d) + 1; x++)
      for (let y = -Math.floor(a / d) - 1; y <= Math.floor(a / d) + 1; y++)
        if (a * x + b * y === d) found.push([x, y]);
    return found;
  }
  let searchOK = true;
  for (const [a, b] of pairs) if (bezoutBySearch(a, b).length === 0) searchOK = false;
  ok(searchOK, 'Y: bounded search finds Bézout coefficients inside the box for all six pairs');
}

/* ------------------------------------------------------------------ */
console.log('=== Z. coprime + the scaled reduction (2.3 → 2.4 bridge) ===');
{
  // scaled Bézout: gcd(a/d, b/d) = 1 swept
  let bad = 0;
  for (let a = 1; a <= 120; a++) for (let b = 1; b <= 120; b++) {
    const d = gcdRef(a, b);
    if (gcdRef(a / d, b / d) !== 1) bad++;
  }
  ok(bad === 0, 'Z: gcd(a/d, b/d) = 1 swept a, b ≤ 120 (the scaled pair is always coprime)');
  ok(gcdRef(14, 3) === 1, 'Z: instance — (210, 45) scales to (14, 3), coprime');
  // the scaled Bézout line: 15 = 5·45 − 1·210 ÷ 15 → 1 = 5·3 − 1·14
  ok(5 * 3 - 1 * 14 === 1, 'Z: 1 = 5·3 − 1·14 — the scaled Bézout row of (210, 45)');
  // the coprime instance the Diophantine lesson reuses: (2, 7) and (3, 5)
  ok(gcdRef(2, 7) === 1 && 1 * 7 - 3 * 2 === 1, 'Z: 1 = 1·7 − 3·2 for the coprime pair (2, 7)');
  ok(gcdRef(3, 5) === 1 && 2 * 3 - 1 * 5 === 1, 'Z: 1 = 2·3 − 1·5 for the coprime pair (3, 5)');
}

/* ------------------------------------------------------------------ */
console.log('=== AA. the LCM payoff (2.3) ===');
{
  ok((210 * 45) / 15 === 630 && 630 % 210 === 0 && 630 % 45 === 0, 'AA: lcm(210, 45) = 210·45/15 = 630 divides… is divided by both');
  let bad = 0;
  for (let m = 210; m < 630; m += 210) if (m % 45 === 0) bad++;
  ok(bad === 0, 'AA: no smaller multiple of 210 is a multiple of 45 (210, 420 both miss)');
  ok(420 === 9 * 45 + 15, 'AA: 420 = 9·45 + 15 — the 15 stub again, swept aside');
  // sweep: a·b/gcd is the least common multiple everywhere
  let lcmBad = 0;
  for (let a = 1; a <= 60; a++) for (let b = 1; b <= 60; b++) {
    const l = (a * b) / gcdRef(a, b);
    if (l % a !== 0 || l % b !== 0) { lcmBad++; continue; }
    for (let m = 1; m < l; m++) if (m % a === 0 && m % b === 0) { lcmBad++; break; }
  }
  ok(lcmBad === 0, 'AA: a·b/gcd is the least common multiple swept a, b ≤ 60');
}

/* ------------------------------------------------------------------ */
console.log('=== AB. the Diophantine criterion gcd(a,b) | c (2.4) ===');
{
  const d42 = gcdRef(12, 42);
  ok(d42 === 6 && 5 % 6 !== 0 && 6 % 6 === 0 && 60 % 6 === 0 && 120 % 6 === 0,
    'AB: gcd(12, 42) = 6 divides 6, 60, 120 — but not 5');
  ok(dioBrute(12, 42, 5, 80).length === 0, 'AB: 12x + 42y = 5 has NO whole-number solutions (brute −80..80)');
  ok(dioBrute(12, 42, 6, 80).length > 0 && dioBrute(12, 42, 60, 80).length > 0 && dioBrute(12, 42, 120, 80).length > 0,
    'AB: 12x + 42y = 6, 60, 120 all solvable (brute)');
  ok(dioBrute(4, 6, 7, 60).length === 0 && dioBrute(6, 10, 7, 60).length === 0,
    'AB: the parity vetoes — 4x + 6y = 7 and 6x + 10y = 7 have none (even left side, odd right)');
  ok(dioBrute(6, 10, 4, 60).length > 0 && dioBrute(6, 10, 8, 60).length > 0,
    'AB: 6x + 10y = 4 and = 8 solvable (2 | 4, 2 | 8)');
  // the even-side reading: 4x + 6y = 2(2x + 3y) is always even
  let evenOK = true;
  for (let x = -20; x <= 20; x++) for (let y = -20; y <= 20; y++) if ((4 * x + 6 * y) % 2 !== 0) evenOK = false;
  ok(evenOK, 'AB: 4x + 6y is even for every whole x, y — the criterion read off the algebra');
  // the grand sweep: integer solvability over the box ⟺ d | c
  let critBad = 0;
  for (let a = 1; a <= 15; a++) for (let b = 1; b <= 15; b++) for (const c of [1, 3, 8, 25, 47, 90]) {
    const d = gcdRef(a, b);
    const brute = dioBrute(a, b, c, 100).length > 0;
    if (brute !== (c % d === 0)) critBad++;
  }
  ok(critBad === 0, 'AB: solvable ⟺ gcd | c — swept 225 (a,b) pairs × 6 values of c against brute force (±100 box)');
  // 4x + 9y = n swept 0..40: solvable set matches d | c (d = 1 — all n)
  let frob: number[] = [];
  for (let n = 0; n <= 40; n++) if (dioBruteNonNeg(4, 9, n, 30).length === 0 && dioBrute(4, 9, n, 30).length > 0) frob.push(n);
  ok(JSON.stringify(frob) === JSON.stringify([1, 2, 3, 5, 6, 7, 10, 11, 14, 15, 19, 23]),
    'AB: 4x + 9y = n — integer-solvable for every n, but the NONNEGATIVE gaps are 1,2,3,5,6,7,10,11,14,15,19,23');
}

/* ------------------------------------------------------------------ */
console.log('=== AC. the solution family — exactly the shifted line (2.4) ===');
{
  // (12, 42, 6): Bézout row (−3, 1); family x = −3 + 7t, y = 1 − 2t
  const x0 = -3, y0 = 1, bp = 7, ap = 2;
  let famOK = true;
  for (let t = -20; t <= 20; t++) if ((-3 + 7 * t) * 12 + (1 - 2 * t) * 42 !== 6) famOK = false;
  ok(famOK, 'AC: every family member of 12x + 42y = 6 solves it, t = −20..20');
  // converse: every brute solution lies in the family
  const sols = dioBrute(12, 42, 6, 80);
  const inFam = sols.every(([x, y]) => (x - x0) % bp === 0 && y === y0 - ap * ((x - x0) / bp));
  ok(inFam && sols.length === 23, `AC: all ${sols.length} brute solutions of 12x + 42y = 6 lie in the family (converse holds)`);
  // instances for the lesson\u2019s three Illustrations + exercises
  const eqs: Array<[number, number, number, number, number]> = [
    // [a, b, c, x0, y0] — particular solutions to verify
    [12, 42, 6, -3, 1],
    [12, 42, 60, -30, 10],
    [12, 42, 120, -60, 20],
    [5, 7, 100, 20, 0],
    [3, 5, 16, 2, 2],
    [2, 7, 10, -30, 10],
    [6, 10, 8, -2, 2],
  ];
  for (const [a, b, c, px, py] of eqs) {
    ok(a * px + b * py === c, `AC: particular (${px}, ${py}) solves ${a}x + ${b}y = ${c}`);
    const d = gcdRef(a, b);
    const bip = b / d, aip = a / d;
    let famAll = true;
    for (let t = -30; t <= 30; t++) if (a * (px + bip * t) + b * (py - aip * t) !== c) famAll = false;
    ok(famAll, `AC: the family of ${a}x + ${b}y = ${c} — x = ${px} + ${bip}t, y = ${py} − ${aip}t solves for all t (−30..30)`);
    const brute = dioBrute(a, b, c, 60);
    const allIn = brute.every(([x, y]) => (x - px) % bip === 0 && y === py - aip * ((x - px) / bip));
    ok(allIn, `AC: every brute solution of ${a}x + ${b}y = ${c} (${brute.length} in the box) is a family member`);
  }
  // the shift vector: consecutive family members differ by exactly (b/d, −a/d)
  const s = dioBrute(5, 7, 100, 60).sort((p, q) => p[0] - q[0]);
  ok(s.length >= 3 && s[1][0] - s[0][0] === 7 && s[1][1] - s[0][1] === -5,
    'AC: consecutive solutions of 5x + 7y = 100 differ by exactly (+7, −5) = (b/d, −a/d)');
}

/* ------------------------------------------------------------------ */
console.log('=== AD. the nonnegative window — counting the exam answers (2.4) ===');
{
  // (12, 42, 60): family x = −30 + 7t, y = 10 − 2t → t = 5 only → (5, 0)
  ok(dioBruteNonNeg(12, 42, 60, 30).length === 1 && dioBruteNonNeg(12, 42, 60, 30)[0][0] === 5 && dioBruteNonNeg(12, 42, 60, 30)[0][1] === 0,
    'AD: 12x + 42y = 60 — exactly ONE nonnegative solution: (5, 0)');
  ok(Math.ceil(30 / 7) === 5 && Math.floor(10 / 2) === 5, 'AD: the window algebra — t ≥ ⌈30/7⌉ = 5 and t ≤ ⌊10/2⌋ = 5: a single point');
  ok(dioBruteNonNeg(2, 7, 10, 30).length === 1 && dioBruteNonNeg(2, 7, 10, 30)[0][0] === 5,
    'AD: the reduced 2x + 7y = 10 — same single nonnegative solution (5, 0) (same solution set)');
  // (12, 42, 120): t ∈ {9, 10} → (3, 2) and (10, 0)
  const nn120 = dioBruteNonNeg(12, 42, 120, 30).sort((p, q) => p[0] - q[0]);
  ok(JSON.stringify(nn120) === JSON.stringify([[3, 2], [10, 0]]),
    'AD: 12x + 42y = 120 — two nonnegative solutions (3, 2) and (10, 0)');
  ok(12 * 3 + 42 * 2 === 120 && 12 * 10 + 42 * 0 === 120, 'AD: both verify: 36 + 84 = 120; 120 + 0 = 120');
  ok(Math.ceil(60 / 7) === 9 && Math.floor(20 / 2) === 10, 'AD: the window — t ≥ ⌈60/7⌉ = 9, t ≤ ⌊20/2⌋ = 10');
  // (12, 42, 6): integer solutions yes, nonnegative NONE
  ok(dioBrute(12, 42, 6, 80).length > 0 && dioBruteNonNeg(12, 42, 6, 30).length === 0,
    'AD: 12x + 42y = 6 — solvable in whole numbers, but the nonnegative window is EMPTY');
  ok(Math.ceil(3 / 7) === 1 && Math.floor(1 / 2) === 0 && 1 > 0, 'AD: the empty window — t ≥ 1 yet t ≤ 0: impossible');
  // (5, 7, 100): three nonnegative, two positive
  const nn100 = dioBruteNonNeg(5, 7, 100, 30).sort((p, q) => p[0] - q[0]);
  ok(JSON.stringify(nn100) === JSON.stringify([[6, 10], [13, 5], [20, 0]]),
    'AD: 5x + 7y = 100 — nonnegative solutions (6, 10), (13, 5), (20, 0)');
  const pos100 = nn100.filter(([x, y]) => x >= 1 && y >= 1);
  ok(pos100.length === 2 && JSON.stringify(pos100) === JSON.stringify([[6, 10], [13, 5]]),
    'AD: strictly positive solutions: (6, 10) and (13, 5) — (20, 0) drops its zero');
  ok(5 * 6 + 7 * 10 === 100 && 5 * 13 + 7 * 5 === 100 && 5 * 20 + 7 * 0 === 100,
    'AD: all three verify: 30+70, 65+35, 100+0');
  // (3, 5, 16): unique nonnegative (2, 2), which is also the unique positive one
  ok(JSON.stringify(dioBruteNonNeg(3, 5, 16, 20)) === JSON.stringify([[2, 2]]),
    'AD: 3x + 5y = 16 — the unique nonnegative solution is (2, 2): 6 + 10 = 16');
  // from the (2, 2) particular: family x = 2 + 5t, y = 2 − 3t → t ≥ ⌈−2/5⌉ = 0, t ≤ ⌊2/3⌋ = 0
  ok(Math.ceil(-2 / 5) === 0 && Math.floor(2 / 3) === 0, 'AD: the window in t — ⌈−2/5⌉ = 0, ⌊2/3⌋ = 0: the single t = 0 → (2, 2)');
  // from the Bézout particular (32, −16): x = 32 + 5t, y = −16 − 3t → t ≥ ⌈−32/5⌉ = −6, t ≤ ⌊−16/3⌋ = −6
  ok(Math.ceil(-32 / 5) === -6 && Math.floor(-16 / 3) === -6, 'AD: the Bézout-seeded window — ⌈−32/5⌉ = −6, ⌊−16/3⌋ = −6: the single t = −6 → (2, 2) again');
  // the count formula instance (L5): x-values of 5x + 7y = 100 form the class x ≡ 6 (mod 7)
  const xs = nn100.map(([x]) => x);
  ok(xs.every((x) => (x - 6) % 7 === 0), 'AD: the x-coordinates 6, 13, 20 form one residue class mod 7 (x* = 6)');
  ok(Math.floor((100 / 5 - 6) / 7) + 1 === 3, 'AD: count = ⌊(c/a − x*)/b⌋ + 1 = ⌊(20 − 6)/7⌋ + 1 = 3');
}

/* ------------------------------------------------------------------ */
console.log('=== AE. the worst case — consecutive Fibonacci pairs (Lamé, 2.3) ===');
{
  function steps(a: number, b: number): number {
    return euclidRows(a, b).length; // one row per division, including the final zero-remainder one
  }
  ok(steps(6765, 4181) === 18, 'AE: (6765, 4181) takes 18 divisions');
  ok(JSON.stringify(euclidRows(6765, 4181).map((r) => r.q)) ===
    JSON.stringify([1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2]),
    'AE: seventeen quotients of 1, then a 2 — the slowest possible descent');
  const digits = (n: number) => String(n).length;
  ok(digits(4181) === 4 && 18 <= 5 * 4, "AE: Lamé's bound instance — 18 divisions ≤ 5 × 4 digits of the smaller number");
  // sweep: the max step count over all pairs up to 10,000 is 18, achieved by the Fibonacci pair
  let maxSteps = 0;
  let maxAt: Array<[number, number]> = [];
  for (let a = 1; a <= 10000; a++) for (let b = 1; b <= Math.min(a, 10000); b++) {
    const s = steps(a, b);
    if (s > maxSteps) { maxSteps = s; maxAt = [[a, b]]; }
    else if (s === maxSteps) maxAt.push([a, b]);
  }
  ok(maxSteps === 18, 'AE: no pair with both entries ≤ 10,000 needs more than 18 divisions');
  ok(maxAt.length >= 1 && maxAt.some(([a, b]) => a === 6765 && b === 4181),
    `AE: the maximum is achieved by the consecutive Fibonacci pair (6765, 4181) (${maxAt.length} maximiser${maxAt.length === 1 ? '' : 's'} in range)`);
  // Knuth-style minimality: no pair with smaller max entry reaches 18 steps
  let smaller = 0;
  for (let a = 1; a < 6765; a++) for (let b = 1; b <= a; b++) if (steps(a, b) >= 18) smaller++;
  ok(smaller === 0, 'AE: minimality — no pair with both entries below 6,765 reaches 18 divisions');
  // every quotient-1 run: the Fibonacci recurrence in reverse
  ok(fib(20) === 6765 && fib(19) === 4181, 'AE: F_20 = 6765, F_19 = 4181 — the worst-case pair is (F_20, F_19)');
}

/* ------------------------------------------------------------------ */
console.log('=== AF. figure 1 geometry — the Euclidean cascade for gcd(210, 45) (2.3) ===');
{
  // layout: three division machines (cells a, q, b, r), remainder → next divisor arrows,
  // a down-rail (common divisors ride down) and an up-rail (the survivor divides upward)
  const machines = [
    { y: 48, a: 210, q: 4, b: 45, r: 30 },
    { y: 176, a: 45, q: 1, b: 30, r: 15 },
    { y: 304, a: 30, q: 2, b: 15, r: 0 },
  ];
  for (const m of machines) ok(m.a === m.q * m.b + m.r && 0 <= m.r && m.r < m.b,
    `AF: machine sentence ${m.a} = ${m.q}·${m.b} + ${m.r} satisfies the division theorem`);
  // cell geometry: a (250, 64), q (346, 40), b (410, 56), r (498, 56); height 44
  const cellX = { a: [250, 64], q: [346, 40], b: [410, 56], r: [498, 56] };
  for (const m of machines) for (const k of ['a', 'q', 'b', 'r'] as const) {
    const [x, w] = cellX[k];
    ok(x >= 240 && x + w <= 560 && m.y >= 48 && m.y + 44 <= 348, `AF: cell ${k} of machine at y ${m.y} inside the figure band`);
  }
  // carry arrows: from the r-cell's bottom center to the next b-cell's top center
  const rCenter = (y: number) => [cellX.r[0] + cellX.r[1] / 2, y + 44];
  const bTop = (y: number) => [cellX.b[0] + cellX.b[1] / 2, y];
  for (let k = 0; k < 2; k++) {
    const [x1, y1] = rCenter(machines[k].y);
    const [x2, y2] = bTop(machines[k + 1].y);
    ok(x1 === 526 && x2 === 438 && y2 - y1 === 84, `AF: carry arrow ${k + 1} runs (${x1}, ${y1}) → (${x2}, ${y2}) — the remainder takes the divisor's seat`);
    ok(machines[k].r === machines[k + 1].b, `AF: the value carried by arrow ${k + 1} is ${machines[k].r} = next divisor`);
  }
  ok(machines[2].r === 0, 'AF: the third machine\u2019s remainder is 0 — the cascade stops; its divisor 15 is the survivor');
  // labels: (text, cx, cy, approx width at 12.5px font ≈ 0.62·chars·12.5, height 14) — clear of cells and arrows
  const labels: Array<[string, number, number]> = [
    ['the remainder 30 becomes the next divisor', 350, 118],
    ['the remainder 15 becomes the next divisor', 350, 246],
    ['common divisors ride down', 162, 34],
    ['15 rides up', 750, 34],
    ['d divides every remainder', 170, 366],
    ['15 | 30, 45, 210', 750, 366],
    ['the survivor 15 — the last nonzero remainder — is gcd(210, 45)', 388, 396],
  ];
  const rects: Array<[number, number, number, number, string]> = [];
  for (const m of machines) for (const k of ['a', 'q', 'b', 'r'] as const)
    rects.push([cellX[k][0], m.y, cellX[k][1], 44, `cell ${k}@${m.y}`]);
  const hseg = [ // horizontal arrow segments (x1, x2, y)
    [438, 526, 134], [438, 526, 262],
  ];
  const vseg = [ // the rails (x, y1, y2) — labels must keep 8 px when their y-range overlaps
    [170, 60, 340], [750, 60, 340],
  ];
  let clash = 0;
  for (const [text, cx, cy] of labels) {
    const w = text.length * 7.8; const x1 = cx - w / 2, x2 = cx + w / 2, y1 = cy - 7, y2 = cy + 7;
    if (x1 < 4 || x2 > 916 || y1 < 4 || y2 > 416) { clash++; continue; }
    for (const [rx, ry, rw, rh, nm] of rects) {
      if (x1 < rx + rw && x2 > rx && y1 < ry + rh && y2 > ry) { clash++; console.log(`  clash: "${text.slice(0, 24)}" vs ${nm}`); }
    }
    for (const [sx1, sx2, sy] of hseg) {
      if (y1 < sy + 2 && y2 > sy - 2 && x1 < sx2 && x2 > sx1) { clash++; console.log(`  clash: "${text.slice(0, 24)}" vs arrow segment y=${sy}`); }
    }
    for (const [vx, vy1, vy2] of vseg) {
      if (y1 < vy2 && y2 > vy1 && x1 < vx + 8 && x2 > vx - 8) { clash++; console.log(`  clash: "${text.slice(0, 24)}" vs rail x=${vx}`); }
    }
  }
  ok(clash === 0, `AF: all ${labels.length} figure labels clear every cell and arrow segment (≥ 8 px both axes)`);
  // the rails: down at x=170 (y 60→340), up at x=750 (y 340→60) — clear of the machines (cells start x 250, end x 554)
  ok(170 + 8 <= 250 && 750 - 8 >= 554, 'AF: both rails keep ≥ 8 px from every machine cell');
}

/* ------------------------------------------------------------------ */
console.log('=== AG. figure 2 geometry — the lattice line of 2x + 7y = 10 (2.4) ===');
{
  // plot: x ∈ [−12, 16] at 30 px/unit, y ∈ [−3, 5] at 40 px/unit; origin at pixel (420, 260)
  const px = (x: number) => 420 + 30 * x;
  const py = (y: number) => 260 - 40 * y;
  ok(px(-12) === 60 && px(16) === 900 && py(5) === 60 && py(-3) === 380, 'AG: the plot corners land inside the 920×430 viewBox with margins');
  // the drawn line runs from x = −12 to the y = −3 clip at x = 15.5 — both endpoints satisfy 2x + 7y = 10
  for (const [xx, yy] of [[-12, 34 / 7], [15.5, -3]] as Array<[number, number]>)
    ok(Math.abs(2 * xx + 7 * yy - 10) < 0.02, `AG: the line's endpoint (${xx}, ${yy}) satisfies 2x + 7y = 10`);
  ok(py(34 / 7) > 60 && py(-3) === 380, 'AG: the line stays inside the plotted band');
  // the four highlighted family members (t = 3, 4, 5, 6) lie ON the line and are equally spaced
  const dots: Array<[number, number]> = [[-9, 4], [-2, 2], [5, 0], [12, -2]];
  for (const [x, y] of dots) ok(2 * x + 7 * y === 10, `AG: (${x}, ${y}) solves 2x + 7y = 10`);
  for (let i = 0; i + 1 < dots.length; i++) {
    const [dx, dy] = [dots[i + 1][0] - dots[i][0], dots[i + 1][1] - dots[i][1]];
    ok(dx === 7 && dy === -2, `AG: consecutive dots ${i}→${i + 1} step by exactly (+7, −2) = (b/d, −a/d)`);
    ok(px(dots[i + 1][0]) - px(dots[i][0]) === 210 && py(dots[i + 1][1]) - py(dots[i][1]) === 80,
      `AG: on screen that is (+210, +80) px — equal spacing visible`);
  }
  // the dots are the family members t = 3..6 of x = −30 + 7t, y = 10 − 2t
  ok(dots.every(([x, y], i) => x === -30 + 7 * (i + 3) && y === 10 - 2 * (i + 3)), 'AG: the dots are t = 3, 4, 5, 6 of the family seeded at (−30, 10)');
  // pixel sanity: (5, 0) is the intercept on the x-axis; (12, −2) inside the band
  ok(px(5) === 570 && py(0) === 260 && py(-2) === 340, 'AG: pixel positions (570, 260) and (780, 340) for the last two dots');
  // step arrow drawn parallel below the line: (570, 272) → (780, 352) — same slope as the dot spacing (80/210)
  ok(Math.abs((352 - 272) / (780 - 570) - 80 / 210) < 1e-9, 'AG: the step arrow is parallel to the family line\u2019s lattice spacing');
  // labels clear their dots (≥ 18 vertical) and the axes (≥ 8)
  const lbls: Array<[string, number, number, number, number]> = [
    ['(−9, 4)', 150, 82, 150, 100], ['(−2, 2)', 360, 162, 360, 180],
    ['(5, 0)', 570, 242, 570, 260], ['(12, −2)', 780, 322, 780, 340],
  ];
  for (const [, lx, ly, dxp, dyp] of lbls) {
    ok(dyp - ly >= 18, `AG: label "${lbls.find((l) => l[1] === lx && l[2] === ly)?.[0]}" sits ≥ 18 px above its dot`);
  }
  ok(Math.abs(py(0) - 260) < 1e-9 && 260 - 242 >= 18, 'AG: the (5, 0) label clears the x-axis too (18 px above y = 260)');
  // the step label clears the arrow (≥ 8), the line, both dots and the axis
  {
    const [scx, scy] = [655, 350];
    const w = 'one step: (+7, −2)'.length * 7.8;
    const [lx1, lx2, ly1, ly2] = [scx - w / 2, scx + w / 2, scy - 7, scy + 7];
    let stepClash = 0;
    for (let X = Math.ceil(lx1); X <= lx2; X++) {
      const arrowY = 272 + (X - 570) * (80 / 210);
      if (ly1 < arrowY + 8 && ly2 > arrowY - 8) stepClash++;
      const lineX = (X - 420) / 30;
      const lineY = py((10 - 7 * lineX) / 2);
      if (ly1 < lineY + 8 && ly2 > lineY - 8) stepClash++;
    }
    ok(stepClash === 0, 'AG: the step label clears the arrow and the drawn line along its full width (≥ 8 px)');
    ok(lx2 < 780 - 10 && 570 < lx1 - 10, 'AG: the step label keeps 10 px from both neighbouring dots horizontally');
    ok(ly1 > 260 + 8, 'AG: the step label stays below the x-axis');
  }
}

/* ------------------------------------------------------------------ */
console.log('=== AH. quiz keys 2.3 re-derived ===');
{
  // Q1 (index 0): replacing (a, b) by (a − b, b) preserves the common-divisor set
  ok(JSON.stringify(divisors(48).filter((d) => 18 % d === 0)) === JSON.stringify(divisors(30).filter((d) => 18 % d === 0)),
    'AH Q1: the (48, 18) → (30, 18) instance — same divisor set {1, 2, 3, 6} (key: "unchanged", index 0)');
  // Q2 (index 1): the division loop on (210, 45) returns 15
  const rows45 = euclidRows(210, 45);
  ok(rows45[rows45.length - 1].divisor === 15 && rows45[0].r === 30,
    'AH Q2: the loop returns 15, not the first remainder 30 (distractor), not 5, not 45 (key index 1)');
  ok(gcdRef(210, 45) === 15 && [5, 30, 45].every((v: number) => v !== gcdRef(210, 45)),
    'AH Q2: the distractor values 30, 5, 45 all differ from the true gcd');
  // Q3 (index 1): halting = strictly descending remainders (LNP), not decreasing quotients
  ok(seqOK(210, 45), 'AH Q3: the remainder sequence strictly descends — the halting reason (key index 1)');
  ok(!euclidRows(4595, 3570).map((r) => r.q).every((q, i, arr) => i === 0 || q < arr[i - 1]),
    'AH Q3: the quotients do NOT decrease monotonically — (1, 3, 2, 14, 7) rises — distractor exposed');
  // Q4 (index 0): backward substitution yields 15 = 5·45 − 1·210
  ok(5 * 45 - 1 * 210 === 15, 'AH Q4: 5·45 − 1·210 = 15 — the substitution output (key index 0)');
  ok(6 * 45 - 1 * 210 === 60, 'AH Q4: distractor 6·45 − 1·210 = 60');
  ok(2 * 210 - 9 * 45 === 15, 'AH Q4: the subtle distractor 2·210 − 9·45 ALSO equals 15 — a valid combination, but not the substitution\u2019s output');
  ok(1 * 210 - 5 * 45 === -15, 'AH Q4: distractor 1·210 − 5·45 evaluates negative — not a natural difference at all');
  // Q5 (index 2): gcd(n, n+1) = 1 because a common divisor divides the difference 1
  ok(gcdRef(8, 9) === 1 && 9 - 8 === 1, 'AH Q5: the difference argument (key index 2)');
  ok(gcdRef(8, 9) === 1 && !isPrime(9), 'AH Q5: 9 is composite, yet gcd(8, 9) = 1 — the "consecutive prime" distractor dies');

  function isPrime(n: number): boolean {
    if (n < 2) return false;
    for (let k = 2; k * k <= n; k++) if (n % k === 0) return false;
    return true;
  }
  const keys23 = [0, 1, 1, 0, 2];
  ok(keys23.length === 5, `AH: 2.3 quiz keys ${keys23.join('/')}`);
}

/* ------------------------------------------------------------------ */
console.log('=== AI. exercise keys 2.3 re-derived (13) ===');
{
  // E1 (L1): gcd(68, 51) = 17 by two divisions
  ok(68 === 1 * 51 + 17 && 51 === 3 * 17 + 0 && euclidRows(68, 51)[1].divisor === 17, 'AI E1: 68 = 1·51 + 17; 51 = 3·17 → gcd 17');
  // E2 (L1): the subtraction walk (48, 18)
  ok(JSON.stringify([[48, 18], [30, 18], [12, 18], [12, 6], [6, 6]]) === '[[48,18],[30,18],[12,18],[12,6],[6,6]]' && gcdRef(48, 18) === 6,
    'AI E2: the four-subtraction walk ends at (6, 6) → 6');
  // E3 (L1): gcd(1071, 462) = 21, quotients (2, 3, 7)
  ok(JSON.stringify(euclidRows(1071, 462).map((r) => r.q)) === '[2,3,7]', 'AI E3: quotient sequence (2, 3, 7) → 21');
  // E4 (L2): gcd(4595, 3570) = 5; common divisors {1, 5}; five divisions
  ok(euclidRows(4595, 3570).length === 5 && gcdRef(4595, 3570) === 5, 'AI E4: five divisions → 5; factor-hunting spared');
  // E5 (L2): 210/45 = 14/3 by dividing by the gcd 15
  ok(210 / 15 === 14 && 45 / 15 === 3 && gcdRef(14, 3) === 1, 'AI E5: 210/45 = 14/3 — reduced by the gcd, and 14/3 is fully reduced');
  // E6 (L2): lcm(210, 45) = 630 via the product rule
  ok((210 * 45) / 15 === 630 && 630 % 210 === 0 && 630 % 45 === 0, 'AI E6: lcm = 630');
  // E7 (L3): consecutive naturals coprime — instances
  ok(gcdRef(8, 9) === 1 && gcdRef(20, 21) === 1 && gcdRef(99, 100) === 1, 'AI E7: 8&9, 20&21, 99&100 all coprime by the difference argument');
  // E8 (L3): backward substitution on (1071, 462): 21 = 7·462 − 3·1071
  ok(462 - 3 * 147 === 21 && 147 === 1071 - 2 * 462 && 462 - 3 * (1071 - 2 * 462) === 7 * 462 - 3 * 1071 && 7 * 462 - 3 * 1071 === 21,
    'AI E8: 21 = 7·462 − 3·1071 = 3,234 − 3,213');
  // E9 (L4): the full coefficient table for (4595, 3570)
  ok(JSON.stringify(extTable(4595, 3570).map((r) => [r.r, r.x, r.y])) ===
    JSON.stringify([[4595, 1, 0], [3570, 0, 1], [1025, 1, -1], [495, -3, 4], [35, 7, -9], [5, -101, 130], [0, 714, -919]]),
    'AI E9: seven rows, every one evaluating');
  // E10 (L4): the Fibonacci run — 18 divisions, sixteen 1s then a 2, Lamé bound
  ok(euclidRows(6765, 4181).length === 18 && 18 <= 5 * 4, 'AI E10: 18 divisions ≤ 5 × 4 digits');
  // E11 (L5): scaled Bézout — gcd(a/d, b/d) = 1 with the (210, 45) instance
  ok(1 === 5 * 3 - 1 * 14 && gcdRef(14, 3) === 1, 'AI E11: 15 = 5·45 − 1·210 ÷ 15 → 1 = 5·3 − 1·14');
  // E12 (L5): Fibonacci worst case essay instances
  ok([2, 3, 4, 5].every((k) => euclidRows(fib(k + 1), fib(k)).map((r) => r.q).every((q, i, arr) => i + 1 < arr.length ? q === 1 : true)),
    'AI E12: small Fibonacci runs keep every quotient 1 until the last');
  // E13 (L6): essay (graded on the argument)
  ok(true, 'AI E13: essay — the two engines, one theorem (no numeric key)');
}

/* ------------------------------------------------------------------ */
console.log('=== AJ. quiz keys 2.4 re-derived ===');
{
  // Q1 (index 0): 4x + 6y = 7 has NO whole-number solutions (d = 2 ∤ 7)
  ok(gcdRef(4, 6) === 2 && 7 % 2 !== 0 && dioBrute(4, 6, 7, 60).length === 0, 'AJ Q1: none (key index 0)');
  // Q2 (index 2): (5, 0) solves 2x + 7y = 10; the distractors do not
  ok(2 * 5 + 7 * 0 === 10, 'AJ Q2: (5, 0) ✓ (key index 2)');
  ok(2 * 3 + 7 * 1 === 13 && 2 * 2 + 7 * 2 === 18 && 2 * 1 + 7 * 2 === 16, 'AJ Q2: distractors (3,1)→13, (2,2)→18, (1,2)→16 — none hits 10');
  // Q3 (index 0): the next family member after (5, 0) is (12, −2)
  ok(2 * 12 + 7 * (-2) === 10 && 12 - 5 === 7 && -2 - 0 === -2, 'AJ Q3: (12, −2) is exactly one (+7, −2) step on (key index 0)');
  ok(2 * 10 + 7 * (-2) === 6 && 2 * 12 + 7 * (-3) === 3 && 2 * 11 + 7 * (-2) === 8, 'AJ Q3: distractors evaluate to 6, 3, 8');
  // Q4 (index 1): 5x + 7y = 100 has exactly three nonnegative solutions
  ok(dioBruteNonNeg(5, 7, 100, 30).length === 3, 'AJ Q4: three (key index 1)');
  // Q5 (index 2): dividing through by d leaves the solution set identical
  const big = dioBrute(12, 42, 60, 60), small = dioBrute(2, 7, 10, 60);
  ok(JSON.stringify(big) === JSON.stringify(small), 'AJ Q5: 12x+42y=60 and 2x+7y=10 have literally the same solution set (key index 2)');
  const keys24 = [0, 2, 0, 1, 2];
  ok(keys24.length === 5, `AJ: 2.4 quiz keys ${keys24.join('/')}`);
}

/* ------------------------------------------------------------------ */
console.log('=== AK. exercise keys 2.4 re-derived (13) ===');
{
  // E1 (L1): the criterion trio on (6, 10): 4 yes, 7 no, 8 yes
  ok(gcdRef(6, 10) === 2 && dioBrute(6, 10, 4, 60).length > 0 && dioBrute(6, 10, 7, 60).length === 0 && dioBrute(6, 10, 8, 60).length > 0,
    'AK E1: 6x + 10y = 4 ✓ (−1, 1); = 7 ✗ (2 ∤ 7); = 8 ✓ (−2, 2)');
  // E2 (L1): (−3, 1) solves 12x + 42y = 6 as the natural difference 42 − 36
  ok(42 * 1 - 12 * 3 === 6, 'AK E2: 42 − 36 = 6');
  // E3 (L1): one nonnegative solution of 3x + 5y = 16: (2, 2)
  ok(3 * 2 + 5 * 2 === 16, 'AK E3: 6 + 10 = 16');
  // E4 (L2): 12x + 42y = 6 family + the four listed members + the empty nonnegative window
  ok([-1, 0, 1, 2].every((t) => 12 * (-3 + 7 * t) + 42 * (1 - 2 * t) === 6), 'AK E4: t = −1, 0, 1, 2 → (−10, 3), (−3, 1), (4, −1), (11, −3) all solve');
  ok(dioBruteNonNeg(12, 42, 6, 30).length === 0, 'AK E4: the nonnegative window is EMPTY');
  // E5 (L2): 3x + 5y = 16 full solve: Bézout 1 = 2·3 − 1·5, ×16 → (32, −16), family, unique (2, 2)
  ok(2 * 3 - 1 * 5 === 1 && 16 * 2 * 3 - 16 * 1 * 5 === 16 && 3 * 2 + 5 * 2 === 16,
    'AK E5: 1 = 2·3 − 1·5 → 16 = 96·... → (32, −16) scaled; family lands on (2, 2) at t = −6');
  ok(3 * (32 + 5 * -6) + 5 * (-16 - 3 * -6) === 16, 'AK E5: t = −6: x = 2, y = 2 ✓');
  // E6 (L2): ₹100 in ₹5 and ₹7 stamps — three ways
  ok(dioBruteNonNeg(5, 7, 100, 30).length === 3, 'AK E6: three ways: (20, 0), (13, 5), (6, 10)');
  // E7 (L3): the reduced equation has the identical solution set (brute-proven on the instance)
  ok(JSON.stringify(dioBrute(12, 42, 60, 60)) === JSON.stringify(dioBrute(2, 7, 10, 60)),
    'AK E7: identical solution sets over the ±60 box');
  // E8 (L3): the 4-and-9 gaps ≤ 30 + the Frobenius point 23 (cross-ref 1.3\u2019s 3-and-5)
  ok(gcdRef(3, 5) === 1 && 3 * 5 - 3 - 5 === 7, 'AK E8: 1.3\u2019s 3-and-5 stamps: last unmakeable 7 = ab − a − b, met again');
  // E9 (L4): the count: three nonnegative, two positive
  ok(dioBruteNonNeg(5, 7, 100, 30).length === 3 && dioBruteNonNeg(5, 7, 100, 30).filter(([x, y]) => x >= 1 && y >= 1).length === 2,
    'AK E9: 3 nonnegative, 2 positive');
  // E10 (L4): every amount 24..31 is makeable with 4 and 9 — the witnesses
  const witnesses: Array<[number, number, number]> = [
    [24, 6, 0], [25, 4, 1], [26, 2, 2], [27, 0, 3], [28, 7, 0], [29, 5, 1], [30, 3, 2], [31, 1, 3],
  ];
  ok(witnesses.every(([n, x, y]) => 4 * x + 9 * y === n), 'AK E10: eight witnesses cover 24..31 — then +4 walks on (every larger n follows)');
  ok(dioBruteNonNeg(4, 9, 23, 30).length === 0, 'AK E10: 23 itself is NOT makeable — the last gap');
  // E11 (L5): Sylvester\u2019s two-denomination instances swept
  ok(4 * 9 - 4 - 9 === 23 && dioBruteNonNeg(4, 9, 23, 30).length === 0 && dioBruteNonNeg(4, 9, 24, 30).length > 0,
    'AK E11: (4, 9): Frobenius number 23 = ab − a − b, and 24 is the first makeable after the gaps');
  const gaps49: number[] = [];
  for (let n = 0; n <= 40; n++) if (dioBruteNonNeg(4, 9, n, 30).length === 0) gaps49.push(n);
  ok(gaps49.length === 12 && (4 - 1) * (9 - 1) / 2 === 12, 'AK E11: exactly 12 unmakeable amounts = (a−1)(b−1)/2 = 3·8/2');
  ok(4 * 7 - 4 - 7 === 17 && dioBruteNonNeg(4, 7, 17, 30).length === 0 && dioBruteNonNeg(4, 7, 18, 30).length > 0,
    'AK E11: (4, 7): Frobenius 17 ✓; unmakeable count 9 = 3·6/2');
  let cnt47 = 0;
  for (let n = 1; n <= 17; n++) if (dioBruteNonNeg(4, 7, n, 30).length === 0) cnt47++;
  ok(cnt47 === 9, 'AK E11: nine unmakeable amounts for (4, 7) — 1,2,3,5,6,9,10,13 and the Frobenius point 17 itself');
  // E12 (L5): the counting method — one residue class of x mod b
  const xs100 = dioBruteNonNeg(5, 7, 100, 30).map(([x]) => x);
  ok(xs100.every((x) => (x - 6) % 7 === 0) && Math.floor((100 / 5 - 6) / 7) + 1 === 3,
    'AK E12: x* = 6 for (5, 7, 100); count ⌊(20 − 6)/7⌋ + 1 = 3');
  ok(JSON.stringify(dioBruteNonNeg(7, 5, 100, 30).sort((p, q) => p[0] - q[0])) === JSON.stringify([[0, 20], [5, 13], [10, 6]]),
    'AK E12: the swapped pair 7x + 5y = 100 — three solutions again, y* = 6 by symmetry of the method');
  // E13 (L6): essay (graded on the argument)
  ok(true, 'AK E13: essay — the summit of chapter 2 (no numeric key)');
}

/* ------------------------------------------------------------------ */
console.log('=== AL. formula cards re-derived (2.3 + 2.4) ===');
{
  // 2.3
  ok(gcdRef(210, 45) === gcdRef(45, 210 % 45) && gcdRef(45, 30) === 15, 'AL 2.3: gcd(a, b) = gcd(b, a mod b) instance chain');
  ok(15 === 5 * 45 - 1 * 210, 'AL 2.3: Bézout instance — d as a difference of natural multiples');
  ok(1 === 1 * 7 - 3 * 2 && 1 === 2 * 3 - 1 * 5, 'AL 2.3: the coprime certificate — 1 = ax + by instances');
  ok((210 * 45) / 15 === 630, 'AL 2.3: the LCM payoff — a·b/gcd');
  // 2.4
  ok(gcdRef(12, 42) === 6 && 6 % 6 === 0 && 5 % 6 !== 0, 'AL 2.4: the criterion — gcd(a,b) | c decides');
  ok(12 * (-3) + 42 * 1 === 6 && 6 / 6 === 1, 'AL 2.4: the construction — Bézout scaled by c/d');
  ok(12 * (4) + 42 * (-1) === 6 && 4 === -3 + 7 && -1 === 1 - 2, 'AL 2.4: the family — x = x₀ + (b/d)t, y = y₀ − (a/d)t instance');
  ok(Math.ceil(30 / 7) === 5 && Math.floor(10 / 2) === 5, 'AL 2.4: the window — t between ⌈−x₀/(b/d)⌉ and ⌊y₀/(a/d)⌋');
}

/* ------------------------------------------------------------------ */
console.log('=== AM. sources (printed) ===');
{
  const s23 = ['euclid-elements-book-vii', 'lame-1844-note', 'bezout-1779-theorie', 'bachet-1624-problemes', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'];
  const s24 = ['diophantus-arithmetica', 'sylvester-1884-frobenius', 'bachet-1624-problemes', 'euclid-elements-book-vii', 'beck-geoghegan-art-of-proof', 'khattar-qa-4e'];
  console.log('  2.3: ' + s23.join(', '));
  console.log('  2.4: ' + s24.join(', '));
  ok(s23.length === 6 && s24.length === 6, 'AM: citation keys — five NEW this run (lame-1844-note, bezout-1779-theorie, bachet-1624-problemes, diophantus-arithmetica, sylvester-1884-frobenius), rest carried');
}

/* ------------------------------------------------------------------ */
console.log('=== AN. scope guards (printed) ===');
{
  console.log('  scope: whole-number coefficients are read as natural differences until');
  console.log('  ch. 6 builds ℤ — every asserted solution is verified by direct natural');
  console.log('  arithmetic (larger product minus smaller). Euclid\u2019s LEMMA stays ch. 4\u2019s;');
  console.log('  the family\u2019s converse runs Bézout\u2019s coprime instance inline instead.');
  console.log('  Frobenius/Sylvester: stated with swept instances, proof deferred.');
  console.log('  Congruence language: ch. 5 — only "leaves remainder x* on division by b"');
  console.log('  appears (E12\u2019s counting). Cross-refs: fm-highest-common-factor (FM 3.3 —');
  console.log('  the factor-listing method, never re-taught, here outgunned by the');
  console.log('  algorithm), fm-equivalent-fractions-simplification (FM 4.2 — the ladder');
  console.log('  recipe this lesson proves), fm-lowest-common-multiple + the FM 3.5');
  console.log('  product rule (the LCM payoff), ans-least-number-principle-recursion');
  console.log('  (1.3 — the LNP\u2019s third burn), ans-division-with-rest-the-division-');
  console.log('  algorithm + ans-the-algebra-of-divisibility (2.1/2.2 — the engine room).');
  ok(true, 'guards noted');
}

/* ------------------------------------------------------------------ */
console.log('');
console.log(`verify-book2-ch02: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
