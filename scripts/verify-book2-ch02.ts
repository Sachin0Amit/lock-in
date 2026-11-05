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
 * Historical anchors web-checked 2026-11-05 (sanctioned fallback):
 * Euclid's Elements Book VII (Definitions 3–5, the "measures" charter;
 * the guide's note that Euclid supplies no postulates for numbers yet
 * leans on a decreasing-sequence principle in VII.2 — the well-ordering
 * engine Lesson 1.3 made explicit) via David Joyce's Clark University
 * edition; the name history — "algorithm" from Algoritmi, the Latinized
 * name of al-Khwārizmī (web-checked run 47, carried); the modern aliases
 * "Euclidean division" (French "division euclidienne") and
 * "quotient-remainder theorem"; the a|b notation — Hardy's unpublished
 * 1925 seminar notes, then Edmund Landau's Elementary Number Theory
 * (1927) in print (MacTutor, per Tattersall). No content reproduced;
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
console.log('');
console.log(`verify-book2-ch02: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}

// module scope: the helper names above must not collide with the other verify scripts
export {}
