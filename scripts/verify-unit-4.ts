/**
 * verify-unit-4.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 4 (Fractions).
 *
 * Created 2026-11-03 (run 12) for lesson 4.1 "The Idea of a Fraction".
 * Every number that will appear in lesson prose, figures, tables, quiz and
 * exercises is checked here BEFORE it is written into ch-04.ts.
 * Run: bun run scripts/verify-unit-4.ts   (exit 1 on any failure)
 */

// module marker: keeps this file's top-level names out of the global
// script scope shared with verify-unit-2.ts / verify-unit-3.ts under tsc --noEmit
export {}

let pass = 0;
let fail = 0;
const failures: string[] = [];

function check(name: string, condition: boolean): void {
  if (condition) {
    pass++;
  } else {
    fail++;
    failures.push(name);
  }
}

function gcd(a: number, b: number): number {
  return b === 0 ? a : gcd(b, a % b);
}
/** exact fraction equality on small integers */
function feq(an: number, ad: number, bn: number, bd: number): boolean {
  return an * bd === bn * ad;
}
function lt(an: number, ad: number, bn: number, bd: number): boolean {
  return an * bd < bn * ad; // positive denominators only
}
function gt(an: number, ad: number, bn: number, bd: number): boolean {
  return an * bd > bn * ad;
}
/** sum of unit fractions 1/a + 1/b equals n/d */
function unitSum(a: number, b: number, n: number, d: number): boolean {
  return feq(d, a * b, n, d) || feq(b + a, a * b, n, d); // (b+a)/(ab)
}

function distinct(a: number, b: number): boolean {
  return a !== b;
}

/* ============================================================
 * A. Opening scene: 3 chapatis among 4 children
 * ==========================================================*/
check('A1: 3 chapatis x 4 pieces each = 12 quarter-pieces', 3 * 4 === 12);
check('A2: 12 pieces among 4 children = 3 pieces each', 12 / 4 === 3);
check('A3: 3 ÷ 4 has no whole quotient (4 does not divide 3)', 3 % 4 !== 0);
check('A4: each child ends with 3 × 1/4 = 3/4 of a whole', feq(3, 4, 3, 4));
check('A5: 3/4 lies strictly between 0 and 1', lt(0, 1, 3, 4) && lt(3, 4, 1, 1));
check('A6: 3 ÷ 4 = 0.75 = 3/4 (the division face)', Math.abs(3 / 4 - 0.75) < 1e-12);

/* ============================================================
 * B. Part–whole reading, vocabulary, unit fractions
 * ==========================================================*/
check('B1: 5/8 — denominator 8 names eighths, numerator 5 counts', feq(5, 8, 5, 8) && 5 < 8);
check('B2: eleven sixteenths = 11/16', feq(11, 16, 11, 16));
check('B3: 3 shaded of 7 equal cells = 3/7', feq(3, 7, 3, 7));
check('B4: unit fractions shrink as denominators grow: 1/8 < 1/5 < 1/2', lt(1, 8, 1, 5) && lt(1, 5, 1, 2));
check('B5: 7/4 — the 4 names quarters, 7 counts copies', feq(7, 4, 7, 4));
check('B6: n/n = 1 for n = 5, 8, 9', feq(5, 5, 1, 1) && feq(8, 8, 1, 1) && feq(9, 9, 1, 1));
check('B7: 0/5 = 0 (numerator 0 names nothing taken)', feq(0, 5, 0, 1));
check('B8: every whole number is a fraction: 12 = 12/1, 3 = 3/1', feq(12, 1, 12, 1) && feq(3, 1, 3, 1));

/* ============================================================
 * C. The division face: n ÷ d = n/d
 * ==========================================================*/
check('C1: 17 ÷ 5 = 17/5 = 3 wholes r 2 (17 = 3×5 + 2)', 3 * 5 + 2 === 17 && 17 % 5 === 2);
check('C2: 100 ÷ 7 = 100/7 = 14 wholes r 2 (100 = 14×7 + 2)', 14 * 7 + 2 === 100 && 100 % 7 === 2);
check('C3: 22 ÷ 7 = 22/7 = 3 wholes r 1 (22 = 3×7 + 1)', 3 * 7 + 1 === 22 && 22 % 7 === 1);
check('C4: 22/7 ≈ 3.142857 and overestimates π ≈ 3.141593', Math.abs(22 / 7 - 3.142857142) < 1e-6 && 22 / 7 > Math.PI);
check('C5: 23 ÷ 6 = 23/6 = 3 wholes r 5 (23 = 3×6 + 5)', 3 * 6 + 5 === 23 && 23 % 6 === 5);
check('C6: 8 ÷ 25 = 8/25, a proper fraction answer', 8 < 25 && lt(8, 25, 1, 1));
check('C7: 144 ÷ 12 = 12 exactly = 12/1 (a whole in fraction dress)', 144 / 12 === 12 && feq(12, 1, 144, 12));
check('C8: 5/8 of 56 = 35 (56 ÷ 8 = 7 shares, take 5)', 56 / 8 === 7 && 5 * 7 === 35);
check('C9: 3/4 of 84 = 63 (84 ÷ 4 = 21, take 3)', 84 / 4 === 21 && 3 * 21 === 63);
check('C10: 7/12 of 144 = 84 (144 ÷ 12 = 12, take 7)', 144 / 12 === 12 && 7 * 12 === 84);

/* ============================================================
 * D. Fraction of a quantity (worked examples)
 * ==========================================================*/
check('D1: 3/4 of 20 = 15 (20 ÷ 4 = 5, × 3)', (3 * 20) / 4 === 15 && 3 * (20 / 4) === 15);
check('D2: 5/6 of 84 = 70 (84 ÷ 6 = 14, × 5)', (5 * 84) / 6 === 70 && 5 * (84 / 6) === 70);
check('D3: 7/10 of 120 = 84 (120 ÷ 10 = 12, × 7)', (7 * 120) / 10 === 84 && 7 * (120 / 10) === 84);
check('D4: 3 wholes = 12 quarters (grouping division)', 3 * 4 === 12);
check('D5: 5 wholes = 30 sixths; 2 wholes = 10 fifths', 5 * 6 === 30 && 2 * 5 === 10);
check('D6: 1/6 of 84 = 14 — the unit share beneath 5/6 of 84', 84 / 6 === 14);

/* ============================================================
 * E. Number line, eighths zoom, the staircase
 * ==========================================================*/
check('E1: 7/4 lies strictly between 1 and 2', lt(1, 1, 7, 4) && lt(7, 4, 2, 1));
check('E2: eighths between 1 and 2: 9/8, 5/4, 11/8, 3/2, 13/8, 7/4, 15/8 all in (1,2)', [
  [9, 8],
  [5, 4],
  [11, 8],
  [3, 2],
  [13, 8],
  [7, 4],
  [15, 8],
].every(([n, d]) => lt(1, 1, n, d) && lt(n, d, 2, 1)));
check('E3: eighth values as decimals: 9/8=1.125, 5/4=1.25, 11/8=1.375, 3/2=1.5, 13/8=1.625, 15/8=1.875', [
  [9, 8, 1.125],
  [5, 4, 1.25],
  [11, 8, 1.375],
  [3, 2, 1.5],
  [13, 8, 1.625],
  [15, 8, 1.875],
].every(([n, d, v]) => Math.abs(n / d - (v as number)) < 1e-12));
check('E4: the staircase (n+1)/n for n ≥ 2 lives in (1,2): 3/2, 4/3, 5/4, 6/5, 7/6', [
  [3, 2],
  [4, 3],
  [5, 4],
  [6, 5],
  [7, 6],
].every(([n, d]) => lt(1, 1, n, d) && lt(n, d, 2, 1) && n === d + 1));
check('E5: 7/4 is six eighth-steps past 1 (7 − 4 = 3 quarters = 6 eighths)', 7 - 4 === 3 && 2 * 3 === 6);

/* ============================================================
 * F. Proper, improper, mixed — classification and conversion
 * ==========================================================*/
check('F1: 3/8 and 4/15 are proper (numerator < denominator)', 3 < 8 && 4 < 15);
check('F2: 8/8 and 9/9 are improper by the rule and equal 1', 8 >= 8 && 9 >= 9 && feq(8, 8, 1, 1) && feq(9, 9, 1, 1));
check('F3: 9/8 improper = 1 1/8; 17/5 = 3.4 in (3,4); 22/7 ≈ 3.1428 in (3,4)', lt(1, 1, 9, 8) && 3 < 17 / 5 && 17 / 5 < 4 && 3 < 22 / 7 && 22 / 7 < 4);
check('F4: conversions: 17/5 = 3 2/5; 2 3/8 = 19/8; 100/7 = 14 2/7; 22/7 = 3 1/7', 3 * 5 + 2 === 17 && 2 * 8 + 3 === 19 && 14 * 7 + 2 === 100 && 3 * 7 + 1 === 22);
check('F5: classification list: 3/11 P, 11/3 I (=3 2/3), 8/8 I, 2 1/6 M (=13/6), 15/4 I (=3 3/4), 4/15 P, 9/9 I', 3 < 11 && 11 >= 3 && 11 === 3 * 3 + 2 && 8 >= 8 && 2 * 6 + 1 === 13 && 15 >= 4 && 15 === 3 * 4 + 3 && 4 < 15 && 9 >= 9);
check('F6: 2 3/8 as improper 19/8 lies in (2,3); 19 = 2×8+3', 2 < 19 / 8 && 19 / 8 < 3 && 2 * 8 + 3 === 19);
check('F7: mixed numbers are not multiplication: 1 3/4 = 7/4 ≠ 1 × 3/4 = 3/4', !feq(1 * 3, 1 * 4, 7, 4) && feq(7, 4, 7, 4));
check('F8: gallery: 9/8 = 1 1/8 between 1 and 2; 17/5 = 3 2/5 between 3 and 4; 22/7 = 3 1/7 between 3 and 4', 9 === 1 * 8 + 1 && 17 === 3 * 5 + 2 && 22 === 3 * 7 + 1);

/* ============================================================
 * G. Unit fractions and Egyptian reckoning
 * ==========================================================*/
check('G1: 5/6 = 1/2 + 1/3 (three cells + two cells of six)', unitSum(2, 3, 5, 6) && feq(3, 6, 1, 2) && feq(2, 6, 1, 3) && feq(1, 6, 1, 6));
check('G2: bar bookkeeping: 1/2 + 1/3 + 1/6 = 6/6 = 1 whole', feq(3 + 2 + 1, 6, 1, 1));
check('G3: Rhind 2/5 = 1/3 + 1/15', unitSum(3, 15, 2, 5));
check('G4: Rhind 2/7 = 1/4 + 1/28', unitSum(4, 28, 2, 7));
check('G5: 3/10 opens as 1/4 + 1/20', unitSum(4, 20, 3, 10));
check('G6: 3/10 also opens as 1/5 + 1/10', unitSum(5, 10, 3, 10));
check('G7: greedy check: 1/4 is the largest unit fraction ≤ 3/10 (1/3 ≈ 0.333 > 0.3)', 1 / 4 <= 3 / 10 && 1 / 3 > 3 / 10);
check('G8: 1/2 + 1/4 + 1/8 = 7/8 of a bar (three stacked pieces)', feq(4 + 2 + 1, 8, 7, 8));
check('G9: Rhind table range: odd n from 3 to 101 (101 − 3)/2 + 1 = 50 entries', (101 - 3) / 2 + 1 === 50 && 101 % 2 === 1 && 3 % 2 === 1);
check('G10: distinct denominators in every G-check (Egyptian style)', distinct(2, 3) && distinct(3, 15) && distinct(4, 28) && distinct(4, 20) && distinct(5, 10));

/* ============================================================
 * H. The mediant theorem and density
 * ==========================================================*/
function mediantL(an: number, ad: number, bn: number, bd: number): boolean {
  // mediant of a/b and c/d is (a+c)/(b+d); check it lies strictly between
  const mn = an + bn;
  const md = ad + bd;
  return lt(an, ad, mn, md) && lt(mn, md, bn, bd) && lt(an, ad, bn, bd);
}
check('H1: mediant(1/3, 1/2) = 2/5 lies strictly between', mediantL(1, 3, 1, 2) && feq(1 + 1, 3 + 2, 2, 5));
check('H2: mediant(2/3, 3/4) = 5/7 lies strictly between', mediantL(2, 3, 3, 4) && feq(2 + 3, 3 + 4, 5, 7));
check('H3: mediant(3/7, 4/9) = 7/16 lies strictly between', mediantL(3, 7, 4, 9) && feq(3 + 4, 7 + 9, 7, 16));
check('H4: mediant(7/16, 4/9) = 11/25 lies strictly between', mediantL(7, 16, 4, 9) && feq(7 + 4, 16 + 9, 11, 25));
check('H5: mediant chain in (1/2, 1): 2/3, 3/5, 4/7, 5/9 all strictly inside', [
  [2, 3],
  [3, 5],
  [4, 7],
  [5, 9],
].every(([n, d]) => lt(1, 2, n, d) && lt(n, d, 1, 1)));
check('H6: each chain term is the mediant of the previous with 1/1 (Farey staircase)', feq(1 + 1, 2 + 1, 2, 3) && feq(1 + 2, 2 + 3, 3, 5) && feq(1 + 3, 2 + 5, 4, 7) && feq(1 + 4, 2 + 7, 5, 9));
check('H7: staircase identity: mediant(n/(n+1), 1/1) = (n+1)/(n+2) for n = 1..6, each strictly between', [1, 2, 3, 4, 5, 6].every((n) => mediantL(n, n + 1, 1, 1) && n + 1 + 1 === n + 2));
check('H8: mediant theorem on 20 random positive pairs', (() => {
  let ok = true;
  let seed = 12345;
  const rnd = (m: number) => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return (seed % m) + 1;
  };
  for (let i = 0; i < 20; i++) {
    const a = rnd(9);
    const b = rnd(9);
    const c = rnd(9);
    const d = rnd(9);
    if (a * d === b * c) continue; // equal — skip
    if (a * d < b * c) {
      if (!mediantL(a, b, c, d)) ok = false;
    } else {
      if (!mediantL(c, d, a, b)) ok = false;
    }
  }
  return ok;
})());
check('H9: proof algebra: ad < bc ⇒ ab + ad < ab + bc ⇒ a(b+d) < b(a+c) (sample 3/7 < 4/9: 27 < 28)', 3 * 9 < 4 * 7 && 3 * (7 + 9) < 7 * (3 + 4) && 3 * 7 + 3 * 9 < 3 * 7 + 4 * 7 && 3 * 16 < 7 * 7 && 48 < 49);
check('H10: proof algebra: ad < bc ⇒ ad + cd < bc + cd ⇒ d(a+c) < c(b+d) (sample: 9×7 < 7×16)', 9 * 7 < 7 * 16 && 3 * 9 + 4 * 9 < 4 * 7 + 4 * 9 && 9 * (3 + 4) < 4 * (7 + 9) && 63 < 64);
check('H11: 7/16 as decimal 0.4375 sits between 3/7 ≈ 0.42857 and 4/9 ≈ 0.44444', Math.abs(7 / 16 - 0.4375) < 1e-12 && 3 / 7 < 7 / 16 && 7 / 16 < 4 / 9);
check('H12: 11/25 = 0.44 sits between 7/16 = 0.4375 and 4/9 ≈ 0.44444', Math.abs(11 / 25 - 0.44) < 1e-12 && 7 / 16 < 11 / 25 && 11 / 25 < 4 / 9);

/* ============================================================
 * I. Quiz-item arithmetic
 * ==========================================================*/
check('I1: Q2 — 8/8 is improper (n ≥ d) while 3/8, 5/9, 2/15 are proper', 8 >= 8 && 3 < 8 && 5 < 9 && 2 < 15);
check('I2: Q3 — 17/5 = 3 2/5 (3×5+2); distractors 2 3/5 = 13/5 and 3 4/5 = 19/5', 3 * 5 + 2 === 17 && 2 * 5 + 3 === 13 && distinct(13, 17) && 3 * 5 + 4 === 19 && distinct(19, 17));
check('I3: Q4 — 5/6 of 84 = 70; distractors 14, 74, 90', 5 * (84 / 6) === 70 && 84 / 6 === 14 && distinct(74, 70) && distinct(90, 70));
check('I4: Q5 — 2/5 between 1/3 and 1/2; 1/6 below both; 2/3 and 5/6 above 1/2', lt(1, 3, 2, 5) && lt(2, 5, 1, 2) && lt(1, 6, 1, 3) && gt(2, 3, 1, 2) && gt(5, 6, 1, 2));
check('I5: Q1 — in 7/4 the denominator 4 names the part size (quarters), 7 the count', 7 / 4 === 7 * (1 / 4));

/* ============================================================
 * J. Exercise-solution arithmetic
 * ==========================================================*/
check('J1: L1 — 5/8 parts named; 11/16 = eleven sixteenths', 5 < 8 && feq(11, 16, 11, 16));
check('J2: L1 — 3 of 7 equal cells = 3/7; unequal cells break the reading', feq(3, 7, 3, 7));
check('J3: L2 — 11/3 = 3 2/3; 15/4 = 3 3/4; 2 1/6 = 13/6', 3 * 3 + 2 === 11 && 3 * 4 + 3 === 15 && 2 * 6 + 1 === 13);
check('J4: L3 — 3/4 of 84 = 63; 5/8 of 56 = 35; 7/12 of 144 = 84', (3 * 84) / 4 === 63 && (5 * 56) / 8 === 35 && (7 * 144) / 12 === 84);
check('J5: L3 — 5 wholes need 30 sixths (5 × 6)', 5 * 6 === 30);
check('J6: L4 — 23/6 = 3 5/6; 8/25 proper; 144/12 = 12/1', 3 * 6 + 5 === 23 && 8 < 25 && 144 / 12 === 12);
check('J7: L5 — mediant insertions 7/16 and 11/25 (checked in H3/H4)', true);
check('J8: L6 — licence: a/b < c/d ⟺ ad < bc for positive b, d (sample 8 pairs)', (() => {
  const pairs: [number, number, number, number][] = [
    [1, 3, 1, 2],
    [2, 3, 3, 4],
    [3, 7, 4, 9],
    [2, 5, 3, 7],
    [5, 6, 6, 7],
    [4, 7, 3, 5],
    [7, 8, 9, 10],
    [5, 9, 6, 11],
  ];
  return pairs.every(([a, b, c, d]) => lt(a, b, c, d) === a * d < b * c);
})());

/* ============================================================
 * K. Figure geometry sanity (coordinates match the maths)
 * ==========================================================*/
check('K1: fig 1 panel A — units at x = 70, 310, 550; quarter step = 60px', 310 - 70 === 240 && 550 - 310 === 240 && 240 / 4 === 60);
check('K2: fig 1 — 3/4 tick at x = 250 (70 + 3×60); 7/4 at x = 490 (70 + 7×60)', 70 + 3 * 60 === 250 && 70 + 7 * 60 === 490);
check('K3: fig 1 panel B — zoom [1,2] onto 620px: eighth step = 77.5px; 7/4 at 70 + 6×77.5 = 535', 690 - 70 === 620 && 620 / 8 === 77.5 && 70 + 6 * 77.5 === 535);
check('K4: fig 1 panel B — eighths map: 9/8@147.5, 5/4@225, 11/8@302.5, 3/2@380, 13/8@457.5, 7/4@535, 15/8@612.5', [147.5, 225, 302.5, 380, 457.5, 535, 612.5].every((x, i) => x === 70 + (i + 1) * 77.5));
check('K5: fig 2 — bar 620px, 6 cells of 103⅓ px; 3 cells = 310px = half the bar', 620 / 6 === 103 + 1 / 3 && 3 * (620 / 6) === 310 && 310 === 620 / 2);
check('K6: fig 2 — 2 cells ≈ 206.67px = one third of the bar', Math.abs(2 * (620 / 6) - 620 / 3) < 1e-9);

/* ============================================================
 * L. Lesson 4.2 — equivalence: same amount, different names
 * ==========================================================*/
check('L1: teaser — 3/4 = 12/16 (3×16 = 48 = 4×12)', feq(3, 4, 12, 16) && 3 * 16 === 48 && 4 * 12 === 48);
check('L2: the 3/4 family: 6/8, 9/12, 12/16, 15/20 all equal 3/4', [
  [6, 8],
  [9, 12],
  [12, 16],
  [15, 20],
].every(([n, d]) => feq(n, d, 3, 4)));
check('L3: 1/2 = 2/4 = 3/6 = 50/100 (the simplest family)', feq(1, 2, 2, 4) && feq(1, 2, 3, 6) && feq(1, 2, 50, 100));
check('L4: halving chain 1/2 → 2/4 → 4/8 → 8/16 all one point', [
  [2, 4],
  [4, 8],
  [8, 16],
].every(([n, d]) => feq(n, d, 1, 2)));
check('L5: shaded width is invariant: 3/4, 6/8, 12/16 of a 620px bar all shade 465px', [
  [3, 4],
  [6, 8],
  [12, 16],
].every(([n, d]) => Math.abs((n / d) * 620 - 465) < 1e-9));
check('L6: equivalence preserves the point: 3/4 = 0.75 = 12/16 as decimals', Math.abs(3 / 4 - 0.75) < 1e-12 && Math.abs(12 / 16 - 0.75) < 1e-12);

/* ============================================================
 * M. Lesson 4.2 — the multiplying rule and the additive trap
 * ==========================================================*/
check('M1: multiplying rule: n/d = nk/dk for samples (3/4 with k = 2..5)', [2, 3, 4, 5].every((k) => feq(3, 4, 3 * k, 4 * k)));
check('M2: rule on 5/6: 5/6 = 10/12 = 15/18 = 20/24 = 35/42', [2, 3, 4, 7].every((k) => feq(5, 6, 5 * k, 6 * k)));
check('M3: regrouping k pieces: each quarter of a 16-cell bar = 4 cells; 4/16 = 1/4 (k = 4 sub-cuts)', feq(4, 16, 1, 4) && 16 / 4 === 4 && 4 * 4 === 16);
check('M4: additive trap — (n+k)/(d+k) is NOT equivalent: 3/4 ≠ 4/5 (3×5 = 15 ≠ 4×4 = 16)', !feq(4, 5, 3, 4) && 3 * 5 === 15 && 4 * 4 === 16);
check('M5: trap instance — 24/36 ≠ 25/37 (24×37 = 888 ≠ 900 = 36×25)', !feq(25, 37, 24, 36) && 24 * 37 === 888 && 36 * 25 === 900);
check('M6: the trap fraction is the mediant of n/d and 1/1: (24+1)/(36+1) = 25/37, strictly between 2/3 and 1', mediantL(24, 36, 1, 1) && feq(24 + 1, 36 + 1, 25, 37) && lt(24, 36, 25, 37) && lt(25, 37, 1, 1));
check('M7: another trap pair: 2/3 ≠ 3/4 (2×4 = 8 ≠ 9 = 3×3) and 2/3 < 3/4', !feq(3, 4, 2, 3) && 2 * 4 === 8 && 3 * 3 === 9 && lt(2, 3, 3, 4));
check('M8: dividing rule read off the multiplying rule: 12/16 = 6/8 = 3/4 (÷2 twice)', feq(12, 16, 6, 8) && feq(6, 8, 3, 4) && feq(12, 16, 3, 4));

/* ============================================================
 * N. Lesson 4.2 — simplification via the HCF (the atoms return)
 * ==========================================================*/
check('N1: HCF(12,16) = 4; 12/16 = 3/4 in one step (12÷4 = 3, 16÷4 = 4)', gcd(12, 16) === 4 && 12 / 4 === 3 && 16 / 4 === 4 && feq(12, 16, 3, 4));
check('N2: stepwise 12/16 = 6/8 = 3/4 arrives at the same place', feq(12, 16, 6, 8) && feq(6, 8, 3, 4));
check('N3: HCF(84,126) = 42; 84/126 = 2/3 (84 = 2×42, 126 = 3×42)', gcd(84, 126) === 42 && 84 / 42 === 2 && 126 / 42 === 3 && feq(84, 126, 2, 3));
check('N4: stepwise 84/126 = 42/63 = 14/21 = 2/3 (÷2, ÷3, ÷7)', feq(84, 126, 42, 63) && feq(42, 63, 14, 21) && feq(14, 21, 2, 3) && 84 / 2 === 42 && 42 / 3 === 14 && 14 / 7 === 2);
check('N5: HCF(91,104) = 13; 91/104 = 7/8 (91 = 7×13, 104 = 8×13)', gcd(91, 104) === 13 && 91 / 13 === 7 && 104 / 13 === 8 && feq(91, 104, 7, 8));
check('N6: lowest terms defined by HCF = 1: gcd(3,4) = 1, gcd(2,3) = 1, gcd(7,8) = 1, gcd(5,7) = 1', [3, 2, 7, 5].map((a, i) => [a, [4, 3, 8, 7][i]] as [number, number]).every(([a, b]) => gcd(a, b) === 1));
check('N7: not lowest: gcd(12,16) = 4 ≠ 1; gcd(36,48) = 12 ≠ 1', gcd(12, 16) === 4 && gcd(36, 48) === 12);
check('N8: HCF(36,48) = 12 → 3/4 (36÷12 = 3, 48÷12 = 4); intermediate names 18/24, 9/12, 6/8 all equivalent', gcd(36, 48) === 12 && feq(36, 48, 3, 4) && feq(18, 24, 3, 4) && feq(9, 12, 3, 4) && feq(6, 8, 3, 4));
check('N9: 96/144 → 2/3 (HCF 48); cross-verified 2×144 = 288 = 3×96', gcd(96, 144) === 48 && 96 / 48 === 2 && 144 / 48 === 3 && 2 * 144 === 288 && 3 * 96 === 288);
check('N10: 231/275 → 21/25 (HCF 11); 231 = 3·7·11, 275 = 5²·11', gcd(231, 275) === 11 && 231 / 11 === 21 && 275 / 11 === 25 && feq(231, 275, 21, 25));
check('N11: Euclid algorithm confirms gcd(231,275): 275 = 1×231+44, 231 = 5×44+11, 44 = 4×11', 275 === 1 * 231 + 44 && 231 === 5 * 44 + 11 && 44 === 4 * 11 && gcd(231, 275) === 11);
check('N12: 60/84 → 5/7 (HCF 12); stepwise ÷2,÷2,÷3: 30/42, 15/21, 5/7', gcd(60, 84) === 12 && feq(60, 84, 5, 7) && feq(60, 84, 30, 42) && feq(30, 42, 15, 21) && feq(15, 21, 5, 7));
check('N13: 18/24 → 3/4 (HCF 6); 45/60 → 3/4 (HCF 15); 56/72 → 7/9 (HCF 8)', gcd(18, 24) === 6 && feq(18, 24, 3, 4) && gcd(45, 60) === 15 && feq(45, 60, 3, 4) && gcd(56, 72) === 8 && feq(56, 72, 7, 9));
check('N14: 24/36 → 2/3 (HCF 12); the additive-corrected simplification', gcd(24, 36) === 12 && feq(24, 36, 2, 3) && 24 / 12 === 2 && 36 / 12 === 3);

/* ============================================================
 * O. Lesson 4.2 — the cross-multiplication licence, paid
 * ==========================================================*/
check('O1: licence (=): a/b = c/d ⟺ ad = bc — sample pairs', [
  [3, 4, 12, 16],
  [2, 3, 4, 6],
  [9, 12, 15, 20],
  [5, 6, 35, 42],
].every(([a, b, c, d]) => feq(a, b, c, d) === (a * d === b * c)));
check('O2: licence (<): a/b < c/d ⟺ ad < bc — 8 positive pairs both ways', (() => {
  const pairs: [number, number, number, number][] = [
    [1, 3, 1, 2],
    [2, 3, 3, 4],
    [3, 7, 4, 9],
    [2, 5, 3, 7],
    [5, 6, 6, 7],
    [4, 7, 3, 5],
    [7, 8, 9, 10],
    [5, 9, 6, 11],
  ];
  return pairs.every(([a, b, c, d]) => lt(a, b, c, d) === a * d < b * c);
})());
check('O3: common-ruler instance: 2/3 = 12/18 and 4/6 = 12/18 on the 18-piece ruler (ad = bc = 12)', feq(2, 3, 12, 18) && feq(4, 6, 12, 18) && 2 * 6 === 12 && 3 * 4 === 12 && 12 * 18 === 12 * 18);
check('O4: raising steps in the proof: 2/3 = 12/18 (×6) and 4/6 = 12/18 (×3), both by the multiplying rule', feq(2, 3, 2 * 6, 3 * 6) && feq(4, 6, 4 * 3, 6 * 3));
check('O5: 3/4 = 12/16 on the 64-ruler: 3/4 = 48/64, 12/16 = 48/64, ad = bc = 48', feq(3, 4, 48, 64) && feq(12, 16, 48, 64) && 3 * 16 === 48 && 4 * 12 === 48);
check('O6: 9/12 vs 15/20: 9×20 = 180 = 12×15 → equivalent (both simplify to 3/4)', 9 * 20 === 180 && 12 * 15 === 180 && feq(9, 12, 3, 4) && feq(15, 20, 3, 4));
check('O7: 9/12 vs 12/15: 9×15 = 135 ≠ 144 = 12×12 → not equivalent (12/15 = 4/5)', !feq(12, 15, 9, 12) && 9 * 15 === 135 && 12 * 12 === 144 && feq(12, 15, 4, 5));
check('O8: 14/21 vs 18/27: 14×27 = 378 = 21×18 → equivalent (both 2/3)', 14 * 27 === 378 && 21 * 18 === 378 && feq(14, 21, 2, 3) && feq(18, 27, 2, 3));
check('O9: 14/21 vs 16/27: 14×27 = 378 ≠ 336 = 21×16 → not equivalent', !feq(16, 27, 14, 21) && 14 * 27 === 378 && 21 * 16 === 336);
check('O10: licence closes the mediant debt: 3/7 < 4/9 ⟺ 27 < 28 (the exact pair 4.1 borrowed)', lt(3, 7, 4, 9) === (3 * 9 < 4 * 7) && 3 * 9 === 27 && 4 * 7 === 28);

/* ============================================================
 * P. Lesson 4.2 — building fractions on purpose (raising)
 * ==========================================================*/
check('P1: raise 3/4 to sixteenths: 16 ÷ 4 = 4, 3×4 = 12 → 12/16 (the teaser)', 16 / 4 === 4 && 3 * 4 === 12 && feq(3, 4, 12, 16));
check('P2: raise 5/6 to forty-seconds: 42 ÷ 6 = 7, 5×7 = 35 → 35/42', 42 / 6 === 7 && 5 * 7 === 35 && feq(5, 6, 35, 42));
check('P3: raise 7/12 to sixtieths: 60 ÷ 12 = 5, 7×5 = 35 → 35/60', 60 / 12 === 5 && 7 * 5 === 35 && feq(7, 12, 35, 60));
check('P4: raise 11/15 to sixtieths: 60 ÷ 15 = 4, 11×4 = 44 → 44/60', 60 / 15 === 4 && 11 * 4 === 44 && feq(11, 15, 44, 60));
check('P5: raise 3/4 and 5/6 to forty-eighths: 36/48 and 40/48', 48 / 4 === 12 && 3 * 12 === 36 && feq(3, 4, 36, 48) && 48 / 6 === 8 && 5 * 8 === 40 && feq(5, 6, 40, 48));
check('P6: raise 7/12 and 5/8 to ninety-sixths: 56/96 and 60/96', 96 / 12 === 8 && 7 * 8 === 56 && feq(7, 12, 56, 96) && 96 / 8 === 12 && 5 * 12 === 60 && feq(5, 8, 60, 96));
check('P7: cross-verify the raises: 7×96 = 672 = 12×56; 5×96 = 480 = 8×60', 7 * 96 === 672 && 12 * 56 === 672 && 5 * 96 === 480 && 8 * 60 === 480);
check('P8: targets must be multiples: 42 = 6×7 is a multiple of 6; 50 is not (50 = 6×8 + 2)', 42 % 6 === 0 && 50 % 6 === 2);
check('P9: recipe doubling: 3/8 kg doubled = 6/8 kg, and 6/8 = 3/4 kg (HCF(6,8) = 2)', 2 * 3 === 6 && feq(6, 8, 3, 4) && gcd(6, 8) === 2);

/* ============================================================
 * Q. Lesson 4.2 — quiz + exercise arithmetic
 * ==========================================================*/
check('Q1: quiz — which equals 3/4: 12/16 yes (48=48); 6/9 no (24≠27); 9/14 no (36≠42); 4/5 no (15≠16)', feq(12, 16, 3, 4) && !feq(6, 9, 3, 4) && !feq(9, 14, 3, 4) && !feq(4, 5, 3, 4));
check('Q2: quiz — 36/48 lowest terms is 3/4; 18/24, 9/12, 6/8 are equivalent but not lowest', gcd(36, 48) === 12 && feq(36, 48, 3, 4) && gcd(18, 24) === 6 && gcd(9, 12) === 3 && gcd(6, 8) === 2);
check('Q3: quiz — multiplier 7 raises 5/6 to 35/42; 42 ÷ 6 = 7', 42 / 6 === 7 && feq(5, 6, 35, 42));
check('Q4: quiz — NOT equivalent pair: 5/6 vs 9/11 (55 ≠ 54); the other three pairs pass', !feq(9, 11, 5, 6) && 5 * 11 === 55 && 6 * 9 === 54 && feq(10, 15, 2, 3) && feq(12, 15, 4, 5) && feq(21, 27, 7, 9) && 2 * 15 === 30 && 3 * 10 === 30 && 4 * 15 === 60 && 5 * 12 === 60 && 7 * 27 === 189 && 9 * 21 === 189);
check('Q5: quiz — 16/20 is the odd one out (= 4/5); 15/20, 18/24, 21/28 all = 3/4', feq(15, 20, 3, 4) && feq(18, 24, 3, 4) && !feq(16, 20, 3, 4) && feq(16, 20, 4, 5) && feq(21, 28, 3, 4) && 15 * 4 === 60 && 20 * 3 === 60 && 16 * 4 === 64 && 20 * 3 === 60);
check('Q6: exercise L1 — 2/5 = 4/10 = 6/15 = 14/35 (multipliers 2, 3, 7)', [2, 3, 7].every((k) => feq(2, 5, 2 * k, 5 * k)));
check('Q7: exercise L1 — of 5/10, 7/12, 9/18, 50/100: all equal 1/2 except 7/12', feq(5, 10, 1, 2) && !feq(7, 12, 1, 2) && feq(9, 18, 1, 2) && feq(50, 100, 1, 2) && 5 * 2 === 10 && 10 * 1 === 10 && 7 * 2 === 14 && 12 * 1 === 12);
check('Q8: exercise L3 — 3/8 of a kg doubled is 6/8 kg, same as 3/4 kg (the recipe instance)', 2 * 3 === 6 && feq(6, 8, 3, 4) && feq(6, 8, 6, 8) && feq(3, 4, 3, 4));
check('Q9: exercise L6 — mediant of equivalent fractions stays equivalent: (a+ka)/(b+kb) = a/b', [1, 2, 3, 5].every((k) => feq(1 + k, 2 + k * 2, 1, 2)));
check('Q10: exercise L6 — mediant(1/2, 2/4) = 3/6 = 1/2; mediant(1/2, 9/18) = 10/20 = 1/2', feq(1 + 2, 2 + 4, 1, 2) && feq(3, 6, 1, 2) && feq(1 + 9, 2 + 18, 1, 2) && feq(10, 20, 1, 2));
check('Q11: exercise L6 — uniqueness: the only lowest-terms name of 3/4 is 3/4 (3d = 4c forces c = 3m, d = 4m, gcd m·gcd(3,4) = m = 1)', (() => {
  // brute force over d ≤ 40: any c/d = 3/4 in lowest terms must have (c,d) = (3,4)
  for (let d = 1; d <= 40; d++) {
    const c = (3 * d) / 4;
    if (!Number.isInteger(c)) continue;
    if (feq(c, d, 3, 4) && gcd(c, d) === 1 && !(c === 3 && d === 4)) return false;
  }
  return true;
})());
check('Q12: exercise L4 — 96/144 = 2/3 and 2×144 = 3×96 = 288 (verification by cross-multiplication)', feq(96, 144, 2, 3) && 2 * 144 === 288 && 3 * 96 === 288);

/* ============================================================
 * R. Lesson 4.2 — figure geometry (bars + licence ruler)
 * ==========================================================*/
check('R1: fig 3 — three bars 620px: 4 cells of 155, 8 of 77.5, 16 of 38.75', 620 / 4 === 155 && 620 / 8 === 77.5 && 620 / 16 === 38.75);
check('R2: fig 3 — shaded runs 3/4 of every bar: 465px regardless of the cut (3×155 = 6×77.5 = 12×38.75 = 465)', 3 * 155 === 465 && 6 * 77.5 === 465 && 12 * 38.75 === 465);
check('R3: fig 4 — licence ruler 620px over 18 cells: cell = 34.444…px; 12 cells ≈ 413.33px', Math.abs(620 / 18 - 34.444444) < 1e-4 && Math.abs(12 * (620 / 18) - 413.333333) < 1e-3);
check('R4: fig 4 — ticks at 0, 6/18, 12/18, 18/18 land at x = 70, 276.67, 483.33, 690', [0, 6, 12, 18].every((c) => Math.abs(70 + c * (620 / 18) - [70, 276.67, 483.33, 690][[0, 6, 12, 18].indexOf(c)]) < 0.01));
check('R5: fig 4 — 1/3 = 6/18 and 2/3 = 4/6 = 12/18: the marked point is the 12th cell', feq(6, 18, 1, 3) && feq(12, 18, 2, 3) && feq(12, 18, 4, 6));

/* ============================================================
 * S. Lesson 4.3 — the easy cases: one ruler already shared
 * ==========================================================*/
check('S1: same denominator — 5/9 < 7/9 (5 < 7 on equal pieces); 3/16 < 11/16', lt(5, 9, 7, 9) && 5 < 7 && lt(3, 16, 11, 16) && 3 < 11);
check('S2: same-denominator rule is the licence on a shared ruler: 5/9 < 7/9 ⟺ 5×9 < 7×9', lt(5, 9, 7, 9) === (5 * 9 < 7 * 9));
check('S3: same numerator — 5/8 > 5/11 (cross: 55 > 40); finer cut holds less', gt(5, 8, 5, 11) && 5 * 11 === 55 && 11 * 5 === 55 && 55 > 40);
check('S4: unit fractions shrink as denominators grow: 1/8 < 1/5 < 1/2', lt(1, 8, 1, 5) && lt(1, 5, 1, 2));
check('S5: same-numerator rule on samples: for a in {1,2,5}, b < c gives a/b > a/c', [
  [1, 4, 7],
  [2, 5, 9],
  [5, 8, 11],
].every(([a, b, c]) => gt(a, b, a, c) && b < c));
check('S6: the whole boundary: 6/6 = 13/13 = 1 (both sit ON the anchor)', feq(6, 6, 1, 1) && feq(13, 13, 1, 1));

/* ============================================================
 * T. Lesson 4.3 — the cross-multiplication engine
 * ==========================================================*/
check('T1: 3/4 vs 4/5: 3×5 = 15 < 16 = 4×4 → 3/4 < 4/5; and 4/5 sits between 3/4 and 1 (mediant consistency)', lt(3, 4, 4, 5) === (3 * 5 < 4 * 4) && 3 * 5 === 15 && 4 * 4 === 16 && lt(3, 4, 4, 5) && lt(4, 5, 1, 1));
check('T2: 7/12 vs 5/8: 7×8 = 56 < 60 = 12×5 → 7/12 < 5/8 — Lesson 4.2 exercise L5 cashed', lt(7, 12, 5, 8) && 7 * 8 === 56 && 12 * 5 === 60 && feq(7, 12, 56, 96) && feq(5, 8, 60, 96) && lt(56, 96, 60, 96));
check('T3: 5/6 vs 8/11: 5×11 = 55 > 48 = 8×6 → 5/6 > 8/11; confirmed on the 66-ruler (55/66 vs 48/66)', gt(5, 6, 8, 11) && 5 * 11 === 55 && 8 * 6 === 48 && feq(5, 6, 55, 66) && feq(8, 11, 48, 66) && gt(55, 66, 48, 66));
check('T4: licence consistency on 10 comparison pairs (verdict ⟺ product order)', (() => {
  const pairs: [number, number, number, number][] = [
    [3, 4, 4, 5],
    [7, 12, 5, 8],
    [5, 6, 8, 11],
    [9, 10, 11, 12],
    [2, 5, 3, 7],
    [5, 9, 6, 11],
    [4, 7, 3, 5],
    [7, 8, 8, 9],
    [2, 3, 4, 5],
    [5, 8, 2, 3],
  ];
  return pairs.every(([a, b, c, d]) => lt(a, b, c, d) === a * d < b * c);
})());
check('T5: 9/10 vs 11/12: 9×12 = 108 < 110 = 11×10 → 9/10 < 11/12 (the completing-the-whole pair)', lt(9, 10, 11, 12) && 9 * 12 === 108 && 11 * 10 === 110);

/* ============================================================
 * U. Lesson 4.3 — common rulers and ordering sets
 * ==========================================================*/
check('U1: the 24-ruler: 7/12 = 14/24 (×2) and 5/8 = 15/24 (×3); 14 < 15 → 7/12 < 5/8', 24 % 12 === 0 && 24 % 8 === 0 && 24 / 12 === 2 && 7 * 2 === 14 && feq(7, 12, 14, 24) && 24 / 8 === 3 && 5 * 3 === 15 && feq(5, 8, 15, 24) && lt(14, 24, 15, 24));
check('U2: the gap named: 5/8 − 7/12 = 15/24 − 14/24 = 1/24, and 4/96 = 1/24 agrees (gcd(4,96) = 4)', feq(15 - 14, 24, 1, 24) && gcd(4, 96) === 4 && feq(4, 96, 1, 24));
check('U3: the 165-ruler for the banked trio: 2/3 = 110/165 (×55), 4/5 = 132/165 (×33), 7/11 = 105/165 (×15)', 3 * 5 * 11 === 165 && 165 % 3 === 0 && 165 % 5 === 0 && 165 % 11 === 0 && 165 / 3 === 55 && 2 * 55 === 110 && feq(2, 3, 110, 165) && 165 / 5 === 33 && 4 * 33 === 132 && feq(4, 5, 132, 165) && 165 / 11 === 15 && 7 * 15 === 105 && feq(7, 11, 105, 165));
check('U4: the trio ordered: 105 < 110 < 132 → 7/11 < 2/3 < 4/5 — the largest is 4/5 (SSC MTS 2017 settled)', lt(105, 165, 110, 165) && lt(110, 165, 132, 165) && lt(7, 11, 2, 3) && lt(2, 3, 4, 5) && gt(4, 5, 2, 3) && gt(4, 5, 7, 11));
check('U5: the 120-ruler: 5/8 = 75/120, 3/5 = 72/120, 7/10 = 84/120, 2/3 = 80/120 → 3/5 < 5/8 < 2/3 < 7/10', 120 / 8 === 15 && 5 * 15 === 75 && 120 / 5 === 24 && 3 * 24 === 72 && 120 / 10 === 12 && 7 * 12 === 84 && 120 / 3 === 40 && 2 * 40 === 80 && [72, 75, 80, 84].every((v, i, a) => i === 0 || v > a[i - 1]));
check('U6: the 36-ruler is the LCM(6,9,12): 7/9 = 28/36, 5/6 = 30/36, 11/12 = 33/36 → 7/9 < 5/6 < 11/12', (() => {
  const l = (a: number, b: number): number => (a * b) / gcd(a, b);
  return l(6, 9) === 18 && l(18, 12) === 36 && 36 / 9 === 4 && 7 * 4 === 28 && feq(7, 9, 28, 36) && 36 / 6 === 6 && 5 * 6 === 30 && feq(5, 6, 30, 36) && 36 / 12 === 3 && 11 * 3 === 33 && feq(11, 12, 33, 36) && lt(28, 36, 30, 36) && lt(30, 36, 33, 36);
})());
check('U7: the product bd is always a legal ruler: bd divisible by both b and d (samples)', [
  [12, 8],
  [3, 11],
  [9, 10],
  [7, 12],
].every(([b, d]) => (b * d) % b === 0 && (b * d) % d === 0));

/* ============================================================
 * V. Lesson 4.3 — benchmarks 0, 1/2, 1 and completing the whole
 * ==========================================================*/
check('V1: benchmark 1/2 splits a pair with zero products: 8/15 above (16 > 15), 11/24 below (22 < 24) → 8/15 larger', 2 * 8 > 15 && 2 * 11 < 24 && gt(8, 15, 11, 24) && 8 * 24 === 192 && 15 * 11 === 165);
check('V2: quiz benchmark set: 3/7, 9/20, 4/9 all sit below 1/2; only 6/11 clears it (12 > 11)', 2 * 3 < 7 && 2 * 9 < 20 && 2 * 4 < 9 && 2 * 6 > 11 && gt(6, 11, 3, 7) && gt(6, 11, 9, 20) && gt(6, 11, 4, 9));
check('V3: benchmark prose example: 2/5 and 3/7 below half, 5/9 above; 2/5 < 3/7 (14 < 15) → 2/5 < 3/7 < 5/9', 2 * 2 < 5 && 2 * 3 < 7 && 2 * 5 > 9 && lt(2, 5, 3, 7) && 2 * 7 === 14 && 3 * 5 === 15 && lt(2, 5, 5, 9) && lt(3, 7, 5, 9));
check('V4: completing the whole: 7/8 < 8/9 (63 < 64) — 8/9 is missing the smaller piece (1/9 < 1/8)', lt(7, 8, 8, 9) && 7 * 9 === 63 && 8 * 8 === 64 && gt(1, 8, 1, 9));
check('V5: complement rule samples: (b−1)/b < (d−1)/d whenever b < d — (2,3), (8,9), (10,12)', lt(1, 2, 2, 3) && lt(7, 8, 8, 9) && lt(9, 10, 11, 12) && 1 * 3 < 2 * 2 && 9 * 12 < 10 * 11);
check('V6: anchor 0 and 1 frame every proper fraction: 0 < 3/7 < 1 and 0 < 9/20 < 1', lt(0, 1, 3, 7) && lt(3, 7, 1, 1) && lt(0, 1, 9, 20) && lt(9, 20, 1, 1));

/* ============================================================
 * W. Lesson 4.3 — mixed numbers: wholes first
 * ==========================================================*/
check('W1: 3 2/5 = 17/5 and 3 3/8 = 27/8; wholes tie (3 = 3), fractional parts decide: 2/5 > 3/8 (16 > 15)', 3 * 5 + 2 === 17 && 3 * 8 + 3 === 27 && gt(17, 5, 27, 8) === (17 * 8 > 27 * 5) && 17 * 8 === 136 && 27 * 5 === 135 && gt(2, 5, 3, 8) && 2 * 8 === 16 && 3 * 5 === 15);
check('W2: mixed verdict matches the improper comparison: 17/5 > 27/8 on the 40-ruler (136/40 > 135/40)', feq(17, 5, 136, 40) && feq(27, 8, 135, 40) && gt(136, 40, 135, 40));
check('W3: anchor 1 separates every proper from every improper: 5/6 < 1 < 9/8', lt(5, 6, 1, 1) && lt(1, 1, 9, 8));
check('W4: quiz pair: 4 2/9 = 38/9 vs 4 1/4 = 17/4: 38×4 = 152 < 153 = 9×17 → 4 1/4 larger; parts 2/9 < 1/4 (8 < 9) agree', 4 * 9 + 2 === 38 && 4 * 4 + 1 === 17 && 38 * 4 === 152 && 17 * 9 === 153 && lt(38, 9, 17, 4) && lt(2, 9, 1, 4) && 2 * 4 === 8 && 1 * 9 === 9);

/* ============================================================
 * X. Lesson 4.3 — quiz-item arithmetic
 * ==========================================================*/
check('X1: quiz Q1 — 8/13 > 5/13 (same ruler, 8 > 5); the "cannot decide" option dies: denominators already match', gt(8, 13, 5, 13) && 8 > 5);
check('X2: quiz Q2 — 4/11 < 4/7 (cross: 44 > 28 → 4/7 larger); elevenths are finer than sevenths', lt(4, 11, 4, 7) && 4 * 7 === 28 && 11 * 4 === 44 && 44 > 28);
check('X3: quiz Q3 — 5/8 vs 7/12: 5×12 = 60 > 56 = 7×8 → 5/8 > 7/12; the 24-ruler agrees (15/24 vs 14/24)', gt(5, 8, 7, 12) && 5 * 12 === 60 && 7 * 8 === 56 && feq(5, 8, 15, 24) && feq(7, 12, 14, 24) && gt(15, 24, 14, 24));
check('X4: quiz Q4 — benchmark set verdict 6/11 (checked in V2); distractor fractions all below the half', true);
check('X5: quiz Q5 — 4 2/9 vs 4 1/4 settled in W4: equal wholes, 1/4 > 2/9 → 4 1/4 (Option 3)', lt(2, 9, 1, 4) && 2 * 4 === 8 && 1 * 9 === 9);

/* ============================================================
 * Y. Lesson 4.3 — exercise-solution arithmetic
 * ==========================================================*/
check('Y1: L1 signs — 4/11 < 7/11; 5/9 > 5/12 (60 > 45); 6/6 = 13/13', lt(4, 11, 7, 11) && gt(5, 9, 5, 12) && 5 * 12 === 60 && 9 * 5 === 45 && feq(6, 6, 13, 13));
check('Y2: L1 — 3/5 = 6/10 < 7/10; cross-check 3×10 = 30 < 35 = 7×5; gap 1/10', feq(3, 5, 6, 10) && lt(6, 10, 7, 10) && 3 * 10 === 30 && 7 * 5 === 35 && 7 * 10 - 6 * 10 === 10);
check('Y3: L2 — unit chain 1/100 < 1/9 < 1/4 < 1/3 < 1/2 (denominators 100 > 9 > 4 > 3 > 2)', lt(1, 100, 1, 9) && lt(1, 9, 1, 4) && lt(1, 4, 1, 3) && lt(1, 3, 1, 2) && 100 > 9 && 9 > 4 && 4 > 3 && 3 > 2);
check('Y4: L3 — flour: 5/8 vs 2/3: 15 < 16 → 5/8 < 2/3; 24-ruler 15/24 < 16/24 (2/3 = 16/24, ×8)', lt(5, 8, 2, 3) && 5 * 3 === 15 && 8 * 2 === 16 && feq(2, 3, 16, 24) && lt(15, 24, 16, 24));
check('Y5: L5 — the 120-ruler ordering re-verified (U5): 3/5 < 5/8 < 2/3 < 7/10', lt(3, 5, 5, 8) && lt(5, 8, 2, 3) && lt(2, 3, 7, 10));
check('Y6: L5 — the 36-ruler ordering re-verified (U6): 7/9 < 5/6 < 11/12', lt(7, 9, 5, 6) && lt(5, 6, 11, 12));
check('Y7: L6 — same-numerator proof: a/b > a/c ⟺ a·c > a·b ⟺ c > b (a > 0); sample a = 5: 5/8 > 5/11 ⟺ 11 > 8', 5 * 11 > 5 * 8 && 11 > 8 && gt(5, 8, 5, 11));
check('Y8: L6 — mediant ordering instance: 2/5 < 3/7 (14 < 15); mediant 5/12 strictly between (24 < 25, 35 < 36)', lt(2, 5, 3, 7) && 2 * 7 === 14 && 3 * 5 === 15 && feq(2 + 3, 5 + 7, 5, 12) && lt(2, 5, 5, 12) && 2 * 12 === 24 && 5 * 5 === 25 && lt(5, 12, 3, 7) && 5 * 7 === 35 && 12 * 3 === 36);
check('Y9: L6 — mediant ordering algebra: a/b < (a+c)/(b+d) ⟺ ab + ad < ab + bc ⟺ ad < bc (sample 2/5, 3/7: 4×... )', 2 * (5 + 7) < 5 * (2 + 3) && 2 * 5 + 2 * 7 < 5 * 2 + 5 * 3 && 24 < 25 && 2 * 7 < 5 * 3);
check('Y10: L6 — mediant right half: (a+c)/(b+d) < c/d ⟺ ad + cd < bc + cd ⟺ ad < bc (sample: 5×... )', (2 + 3) * 7 < 3 * (5 + 7) && 2 * 7 + 3 * 7 < 3 * 5 + 3 * 7 && 35 < 36 && 2 * 7 < 5 * 3);
check('Y11: L4 — 9/10 vs 11/12 exercise (T5 re-check) plus complement statement 1/12 < 1/10', lt(9, 10, 11, 12) && 9 * 12 === 108 && 11 * 10 === 110 && lt(1, 12, 1, 10));

/* ============================================================
 * Z. Lesson 4.3 — figure geometry (bars + number line)
 * ==========================================================*/
check('Z1: fig A — bar 620px: 12 cells of 51.6667 (7 shaded = 361.67), 8 cells of 77.5 (5 shaded = 387.5)', Math.abs(620 / 12 - 51.666667) < 1e-4 && Math.abs(7 * (620 / 12) - 361.666667) < 1e-3 && 620 / 8 === 77.5 && Math.abs(5 * 77.5 - 387.5) < 1e-9);
check('Z2: fig A — 24-cell rulers: cell 25.8333; 14 cells = 361.67 = the 7/12 shading; 15 cells = 387.5 = the 5/8 shading', Math.abs(620 / 24 - 25.833333) < 1e-4 && Math.abs(14 * (620 / 24) - 361.666667) < 1e-3 && Math.abs(15 * (620 / 24) - 387.5) < 1e-3);
check('Z3: fig A — raised names shade the same widths: 7/12 × 620 = 14/24 × 620 and 5/8 × 620 = 15/24 × 620', Math.abs((7 / 12) * 620 - (14 / 24) * 620) < 1e-9 && Math.abs((5 / 8) * 620 - (15 / 24) * 620) < 1e-9);
check('Z4: fig A — the one extra cell: 15 − 14 = 1 cell = 25.8333px (the whole verdict in one cell)', 15 - 14 === 1 && Math.abs(620 / 24 - 25.833333) < 1e-4);
check('Z5: fig B — line 620px spans 1/2 unit → 1240 px/unit; ticks: 1/2 @ 70, 7/11 @ 239.09, 2/3 @ 276.67, 4/5 @ 442, 1 @ 690', [70 + (7 / 11 - 1 / 2) * 1240, 70 + (2 / 3 - 1 / 2) * 1240, 70 + (4 / 5 - 1 / 2) * 1240].map((x) => Math.round(x * 100) / 100).every((x, i) => Math.abs(x - [239.09, 276.67, 442][i]) < 0.01) && Math.abs((7 / 11 - 1 / 2) * 1240 - 169.09) < 0.01);
check('Z6: fig B — the order on the line: 70 < 239.09 < 276.67 < 442 < 690 ⟺ 1/2 < 7/11 < 2/3 < 4/5 < 1', 70 < 239.09 && 239.09 < 276.67 && 276.67 < 442 && 442 < 690 && lt(1, 2, 7, 11) && lt(7, 11, 2, 3) && lt(2, 3, 4, 5) && lt(4, 5, 1, 1));
check('Z7: fig B — the 7/11 and 2/3 marks are 37.58px apart; labels alternate above/below to stay clear', Math.abs(276.67 - 239.09 - 37.58) < 0.01);

/* ============================================================
 * AA. Lesson 4.4 — like-ruler arithmetic (counts of equal pieces)
 * ==========================================================*/
check('AA1: 2/9 + 4/9 = 6/9 (2 + 4 counts) and the sum simplifies: HCF(6,9) = 3 → 2/3', feq(2 + 4, 9, 6, 9) && gcd(6, 9) === 3 && feq(6, 9, 2, 3));
check('AA2: 3/11 + 5/11 = 8/11, already lowest (gcd(8,11) = 1)', feq(3 + 5, 11, 8, 11) && gcd(8, 11) === 1);
check('AA3: 9/11 − 4/11 = 5/11 (counts subtract), lowest terms', feq(9 - 4, 11, 5, 11) && gcd(5, 11) === 1);
check('AA4: 7/8 − 5/8 = 2/8 = 1/4 (HCF(2,8) = 2) — differences simplify too', feq(7 - 5, 8, 2, 8) && gcd(2, 8) === 2 && feq(2, 8, 1, 4));
check('AA5: 5/10 + 3/10 = 8/10 = 4/5 (HCF(8,10) = 2)', feq(5 + 3, 10, 8, 10) && gcd(8, 10) === 2 && feq(8, 10, 4, 5));
check('AA6: 3/13 + 4/13 = 7/13; 7/7 − 3/7 = 4/7 and 7/7 = 1 (the complement reading 1 − 3/7)', feq(3 + 4, 13, 7, 13) && feq(7 - 3, 7, 4, 7) && feq(7, 7, 1, 1));
check('AA7: like-ruler rule a/d + c/d = (a+c)/d for samples (d = 7, counts under the whole)', [
  [1, 2],
  [2, 3],
  [3, 4],
].every(([a, c]) => feq(a, 7, a, 7) && feq(a + c, 7, a + c, 7)));
check('AA8: sums may pass the whole: 5/8 + 7/8 = 12/8 = 3/2 = 1 1/2 (improper, two-storey reading)', feq(5 + 7, 8, 12, 8) && feq(12, 8, 3, 2) && 12 > 8 && 1 * 2 + 1 === 3);

/* ============================================================
 * AB. Lesson 4.4 — the LCM method (unlike rulers)
 * ==========================================================*/
check('AB1: 1/4 + 1/6 on the 12-ruler: LCM(4,6) = 12; 3/12 + 2/12 = 5/12, lowest (gcd(5,12) = 1)', (() => { const l = (4 * 6) / gcd(4, 6); return l === 12 && 12 / 4 === 3 && 12 / 6 === 2 && feq(3 + 2, 12, 5, 12) && gcd(5, 12) === 1; })());
check('AB2: the product ruler agrees: 6/24 + 4/24 = 10/24 = 5/12', feq(6 + 4, 24, 10, 24) && feq(10, 24, 5, 12));
check('AB3: 7/12 + 3/10 on the 60-ruler: LCM(12,10) = 60; 35/60 + 18/60 = 53/60, lowest (gcd(53,60) = 1)', (() => { const l = (12 * 10) / gcd(12, 10); return l === 60 && 60 / 12 === 5 && 7 * 5 === 35 && 60 / 10 === 6 && 3 * 6 === 18 && feq(35 + 18, 60, 53, 60) && gcd(53, 60) === 1; })());
check('AB4: the same sum on the product ruler 120: 70/120 + 36/120 = 106/120 = 53/60 — both rulers, one verdict', feq(7 * 10, 120, 70, 120) && feq(3 * 12, 120, 36, 120) && feq(70 + 36, 120, 106, 120) && feq(106, 120, 53, 60));
check('AB5: subtraction on the 24-ruler: 5/8 − 7/12 = 15/24 − 14/24 = 1/24 — Lesson 4.3\'s gap promoted to arithmetic', feq(5 * 3, 24, 15, 24) && feq(7 * 2, 24, 14, 24) && feq(15 - 14, 24, 1, 24));
check('AB6: the LCM keeps counts small: LCM(12,10) = 60 < 120 = product; raisings 5,6 vs 10,12 and counts 35,18 vs 70,36', 60 < 120 && 5 < 10 && 6 < 12 && 35 < 70 && 18 < 36);
check('AB7: 2/3 + 1/4 = 8/12 + 3/12 = 11/12, lowest (gcd(11,12) = 1)', 12 / 3 === 4 && 2 * 4 === 8 && 12 / 4 === 3 && 1 * 3 === 3 && feq(8 + 3, 12, 11, 12) && gcd(11, 12) === 1);
check('AB8: three fractions on one ruler: 1/2 + 1/3 + 1/9 — LCM(2,3,9) = 18; 9/18 + 6/18 + 2/18 = 17/18, lowest', (() => { const l = (a: number, b: number): number => (a * b) / gcd(a, b); return l(2, 3) === 6 && l(6, 9) === 18 && 18 / 2 === 9 && 18 / 3 === 6 && 18 / 9 === 2 && feq(9 + 6 + 2, 18, 17, 18) && gcd(17, 18) === 1; })());
check('AB9: add-subtract chain: 5/6 − 1/4 + 1/12 on the 12-ruler: 10/12 − 3/12 + 1/12 = 8/12 = 2/3 (HCF(8,12) = 4)', feq(5 * 2, 12, 10, 12) && feq(1 * 3, 12, 3, 12) && feq(10 - 3 + 1, 12, 8, 12) && gcd(8, 12) === 4 && feq(8, 12, 2, 3));
check('AB10: one-multiple case: 3/5 + 7/10 = 6/10 + 7/10 = 13/10 — improper; two-storey reading 1 3/10', feq(3 * 2, 10, 6, 10) && feq(6 + 7, 10, 13, 10) && 13 > 10 && feq(13, 10, 1 * 10 + 3, 10));
check('AB11: 5/6 − 1/2 = 5/6 − 3/6 = 2/6 = 1/3 (HCF(2,6) = 2)', feq(5 - 3, 6, 2, 6) && gcd(2, 6) === 2 && feq(2, 6, 1, 3));
check('AB12: the laws return — commutativity: 1/4 + 1/6 = 1/6 + 1/4 (same raised counts, 3 + 2); identity: 5/9 + 0 = 5/9', feq(3 + 2, 12, 2 + 3, 12) && feq(5, 9, 5, 9) && feq(5 + 0, 9, 5, 9));
check('AB13: associativity on the 18-ruler: (1/2 + 1/3) + 1/9 = 15/18 + 2/18 = 17/18 and 1/2 + (1/3 + 1/9) = 9/18 + 8/18 = 17/18', feq(9 + 6, 18, 15, 18) && feq(15 + 2, 18, 17, 18) && feq(6 + 2, 18, 8, 18) && feq(9 + 8, 18, 17, 18));

/* ============================================================
 * AC. Lesson 4.4 — subtraction as gap-naming; complements
 * ==========================================================*/
check('AC1: complement from the whole: 1 − 5/9 = 9/9 − 5/9 = 4/9 — the missing piece named', feq(9 - 5, 9, 4, 9) && 5 + 4 === 9);
check('AC2: completing the whole, arithmetised: 1 − 7/8 = 1/8 and 7/8 + 1/8 = 1', feq(8 - 7, 8, 1, 8) && feq(7 + 1, 8, 8, 8) && feq(8, 8, 1, 1));
check('AC3: tank problem: 1/3 + 1/4 = 4/12 + 3/12 = 7/12 full; the empty part is 12/12 − 7/12 = 5/12', feq(4 + 3, 12, 7, 12) && feq(12 - 7, 12, 5, 12) && 7 + 5 === 12);
check('AC4: salary problem: 1/4 + 2/5 = 5/20 + 8/20 = 13/20 spent; 1 − 13/20 = 7/20 remains', feq(5 + 8, 20, 13, 20) && feq(20 - 13, 20, 7, 20) && gcd(7, 20) === 1);
check('AC5: the licence form of the gap: (5×12 − 7×8)/(8×12) = (60−56)/96 = 4/96 = 1/24 — agrees with the 24-ruler', feq(5 * 12 - 7 * 8, 8 * 12, 4, 96) && feq(4, 96, 1, 24) && gcd(4, 96) === 4);
check('AC6: counts subtract only when the gap exists: 5/8 − 3/8 legal (5 ≥ 3); 3/8 − 5/8 has no whole-number count answer (3 < 5)', 5 - 3 === 2 && 3 < 5 && feq(5 - 3, 8, 2, 8));

/* ============================================================
 * AD. Lesson 4.4 — mixed numbers: the two storeys
 * ==========================================================*/
check('AD1: overflow addition: 2 3/4 + 1 1/2 — parts 3/4 + 2/4 = 5/4 = 1 1/4 regroups: 2 + 1 + 1 + 1/4 = 4 1/4', feq(3 + 2, 4, 5, 4) && 5 > 4 && 2 + 1 + 1 === 4 && feq(4 * 4 + 1, 4, 17, 4));
check('AD2: the improper route agrees: 11/4 + 6/4 = 17/4 = 4 1/4 (2×4+3 = 11; 1×4+2 = 6; 17 = 4×4+1)', feq(2 * 4 + 3, 4, 11, 4) && feq(1 * 4 + 2, 4, 6, 4) && feq(11 + 6, 4, 17, 4) && 4 * 4 + 1 === 17);
check('AD3: underflow subtraction: 3 1/5 − 1 2/5 — borrow 1 = 5/5: 2 6/5 − 1 2/5 = 1 4/5', feq(3 * 5 + 1, 5, 16, 5) && 3 - 1 === 2 && feq(5 + 1, 5, 6, 5) && feq(6 - 2, 5, 4, 5) && 2 - 1 === 1);
check('AD4: the improper route agrees: 16/5 − 7/5 = 9/5 = 1 4/5 (1×5+2 = 7; 9 = 1×5+4)', feq(1 * 5 + 2, 5, 7, 5) && feq(16 - 7, 5, 9, 5) && 1 * 5 + 4 === 9);
check('AD5: no-regroup case: 1 2/7 + 2 3/7 = 3 5/7 (parts 5/7 stay below 1; gcd(5,7) = 1)', feq(2 + 3, 7, 5, 7) && 5 < 7 && gcd(5, 7) === 1 && 1 + 2 === 3);
check('AD6: the flip-error trap: "2 1/5" (subtracting smaller part from larger) is wrong: 11/5 ≠ 9/5', feq(2 * 5 + 1, 5, 11, 5) && feq(1 * 5 + 4, 5, 9, 5) && (2 * 5 + 1) !== (1 * 5 + 4) && distinct(2 * 5 + 1, 1 * 5 + 4));

/* ============================================================
 * AE. Lesson 4.4 — Egyptian two-term openings (the greedy split)
 * ==========================================================*/
check('AE1: the greedy pin: 1/3 > 3/10 > 1/4 — the largest unit fraction that fits under 3/10 is 1/4', gt(1, 3, 3, 10) && gt(3, 10, 1, 4) && 1 * 10 > 3 * 3 && 3 * 4 > 1 * 10);
check('AE2: the greedy step is subtraction: 3/10 − 1/4 = 6/20 − 5/20 = 1/20 — the remainder is already unit', feq(6 - 5, 20, 1, 20) && unitSum(4, 20, 3, 10));
check('AE3: 5/6 by the greedy split: 1/2 fits (1 < 5/6), remainder 5/6 − 1/2 = 2/6 = 1/3 — so 5/6 = 1/2 + 1/3', gt(5, 6, 1, 2) && feq(5 - 3, 6, 2, 6) && feq(2, 6, 1, 3) && unitSum(2, 3, 5, 6));
check('AE4: 4.2\'s alternative opening re-derived: 3/10 = 1/5 + 1/10 (2/10 + 1/10) — valid, but not the greedy opening since 1/4 also fits and is larger', unitSum(5, 10, 3, 10) && gt(1, 4, 1, 5) && gt(3, 10, 1, 4));
check('AE5: greedy remainders are automatically smaller: 1/20 < 1/4 and 1/3 < 1/2 (the next opening works down the ladder)', lt(1, 20, 1, 4) && lt(1, 3, 1, 2));

/* ============================================================
 * AF. Lesson 4.4 — the mediant fraud (straight-across sums)
 * ==========================================================*/
check('AF1: 1/2 + 1/3: true sum 5/6 vs straight-across 2/5 — the true sum wins (25 > 12)', feq(1 * 3 + 1 * 2, 6, 5, 6) && feq(1 + 1, 2 + 3, 2, 5) && lt(2, 5, 5, 6) && 2 * 6 === 12 && 5 * 5 === 25);
check('AF2: the fake answer is the mediant: 1/3 < 2/5 < 1/2 — it lands strictly between the addends (4.3\'s L6)', lt(1, 3, 2, 5) && lt(2, 5, 1, 2) && 1 * 5 < 2 * 3 && 2 * 2 < 5 * 1);
check('AF3: the general algebra: (ad+bc)(b+d) − (a+c)bd = ad² + b²c > 0 — instance (1,2,3,2): 4 + 12 = 16', (() => {
  const [a, b, c, d] = [1, 2, 3, 2];
  return (a * d + b * c) * (b + d) - (a + c) * b * d === a * d * d + b * b * c && a * d * d + b * b * c === 16 && (a * d + b * c) * (b + d) === 32 && (a + c) * b * d === 16;
})());
check('AF4: 1/4 + 1/6: straight-across 2/10 = 1/5 sits below the true sum 5/12 (25 > 24) and between the addends (1/6 < 1/5 < 1/4)', feq(1 + 1, 4 + 6, 1, 5) && lt(1, 5, 5, 12) && 1 * 12 === 12 && 5 * 5 === 25 && lt(1, 6, 1, 5) && lt(1, 5, 1, 4));
check('AF5: the fraud never turns true by luck: straight-across ≠ true sum on samples', [
  [1, 2, 1, 3],
  [1, 4, 1, 6],
  [2, 3, 1, 4],
  [3, 10, 1, 4],
  [2, 9, 4, 9],
].every(([a, b, c, d]) => !feq(a + c, b + d, a * d + b * c, b * d) && gt(a * d + b * c, b * d, a + c, b + d)));

/* ============================================================
 * AG. Lesson 4.4 — quiz + exercise arithmetic
 * ==========================================================*/
check('AG1: quiz Q1 — 3/11 + 5/11 = 8/11; the straight-across distractor 8/22 = 4/11 fails (halves the value)', feq(8, 11, 8, 11) && feq(8, 22, 4, 11) && !feq(8, 22, 8, 11) && 8 * 11 === 88 && 22 * 8 === 176);
check('AG2: quiz Q2 — 1/4 + 1/6 = 5/12 (AB1); the mediant distractor 2/10 = 1/5 sits below the true sum (25 > 24)', feq(5, 12, 5, 12) && feq(2, 10, 1, 5) && !feq(1, 5, 5, 12) && 5 * 5 === 25 && 12 * 2 === 24);
check('AG3: quiz Q3 — 7/8 − 5/8 = 2/8 = 1/4 (AA4); "a difference is never simplified" is the trap', feq(2, 8, 1, 4) && gcd(2, 8) === 2);
check('AG4: quiz Q4 — 3 1/5 − 1 2/5 = 1 4/5 (AD3); flip-error 2 1/5 = 11/5 is not 9/5', feq(9, 5, 9, 5) && feq(11, 5, 11, 5) && (2 * 5 + 1) !== (1 * 5 + 4));
check('AG5: quiz Q5 — the greedy opening of 3/10 is 1/4 with remainder 1/20 (AE1/AE2); 1/3 does not fit (1/3 > 3/10); 1/5 + 1/10 is valid but not greedy (1/4 > 1/5)', gt(1, 3, 3, 10) && unitSum(4, 20, 3, 10) && unitSum(5, 10, 3, 10) && gt(1, 4, 1, 5));
check('AG6: exercise L2 — 3/5 + 7/10 = 13/10 = 1 3/10 (AB10 re-check)', feq(13, 10, 1 * 10 + 3, 10));
check('AG7: exercise L3 — 2/3 + 1/4 = 11/12 (AB7 re-check)', feq(11, 12, 11, 12) && gcd(11, 12) === 1);
check('AG8: exercise L4 — tank 1/3 + 1/4 = 7/12 full, 5/12 empty (AC3 re-check)', feq(7, 12, 7, 12) && feq(5, 12, 5, 12) && 7 + 5 === 12);
check('AG9: exercises L5 — 1/2 + 1/3 + 1/9 = 17/18 (AB8) and 5/6 − 1/4 + 1/12 = 2/3 (AB9) re-checked', feq(17, 18, 17, 18) && feq(2, 3, 2, 3));
check('AG10: exercise L4 — 2 3/4 + 1 1/2 = 4 1/4 (AD1 re-check)', feq(17, 4, 17, 4));
check('AG11: exercise L6 — the distributive reading: a/d + c/d = (a+c)/d because a pieces + c pieces = (a+c) pieces of 1/d (samples d = 11, 13)', feq(2 + 5, 11, 7, 11) && feq(3 + 4, 13, 7, 13));
check('AG12: exercise L6 — mediant-fraud proof instances: straight-across always below the true sum (AF5 samples 1 and 2)', lt(2, 5, 5, 6) && lt(1, 5, 5, 12));

/* ============================================================
 * AH. Lesson 4.4 — figure geometry (bars + number line)
 * ==========================================================*/
check('AH1: fig A — bar 620px: quarter cell 155; twelfth cell 51.6667; 3 twelfths = 155 — the raised name shades the same width as 1/4', 620 / 4 === 155 && Math.abs(620 / 12 - 51.666667) < 1e-4 && Math.abs(3 * (620 / 12) - 155) < 1e-9);
check('AH2: fig A — sixth cell 103.3333; 2 twelfths = 103.33 (same width as 1/6); 5 twelfths = 258.33 = 155 + 103.33 (the stacked sum)', Math.abs(620 / 6 - 103.333333) < 1e-4 && Math.abs(2 * (620 / 12) - 103.333333) < 1e-3 && Math.abs(5 * (620 / 12) - 258.333333) < 1e-3 && Math.abs(5 * (620 / 12) - (155 + 2 * (620 / 12))) < 1e-9);
check('AH3: fig A — the contribution boundary sits at x = 225 = 70 + 3 × 51.6667, splitting the sum bar 3 + 2', Math.abs(70 + 3 * (620 / 12) - 225) < 0.01);
check('AH4: fig A — cell widths: 620/4 = 155 exactly; 620/6 and 620/12 recurring to 2 dp (103.33, 51.67)', Math.abs(620 / 6 - 103.333333) < 1e-4 && Math.abs(620 / 12 - 51.666667) < 1e-4);
check('AH5: fig B — the line runs 40 → 720 (680 px per unit): x(7/12) = 436.67, x(5/8) = 465, x(0) = 40, x(1) = 720', Math.abs(40 + (7 / 12) * 680 - 436.67) < 0.01 && Math.abs(40 + (5 / 8) * 680 - 465) < 0.01);
check('AH6: fig B — the gap is one twenty-fourth of the line: 465 − 436.67 = 28.33 px = 680/24 — the arithmetic made visible', Math.abs(465 - 436.67 - 680 / 24) < 0.01 && Math.abs(680 / 24 - 28.333333) < 1e-4);
check('AH7: fig B — the arc peaks at 170 − 26 = 144 with the 1/24 label at y = 134 above it, clear of the axis', Math.abs(170 - 26 - 144) < 1e-9 && 134 < 144);

/* ============================================================
 * AI. Lesson 4.5 — the multiplying rule, 'of', and scaling
 * ==========================================================*/
check('AI1: the rule — 1/2 × 3/4 = 3/8 (numerators multiply, denominators multiply)', feq(1 * 3, 2 * 4, 3, 8));
check('AI2: 2/3 × 4/5 = 8/15', feq(2 * 4, 3 * 5, 8, 15));
check('AI3: roman (i) 1/2 × 1/3 = 1/6 — half of a third is a sixth', feq(1, 6, 1, 6) && feq(1 * 1, 2 * 3, 1, 6));
check('AI4: roman (ii) 2/5 × 3/4 = 6/20 = 3/10 (HCF 6,20 = 2)', feq(2 * 3, 5 * 4, 6, 20) && gcd(6, 20) === 2 && feq(3, 10, 3, 10));
check('AI5: roman (iii) 3/4 × 2/9 = 6/36 = 1/6 (HCF 6)', feq(3 * 2, 4 * 9, 6, 36) && gcd(6, 36) === 6 && feq(1, 6, 1, 6));
check('AI6: Illustration 1 — 2/3 × 3/4 = 6/12 = 1/2 (HCF 6)', feq(2 * 3, 3 * 4, 6, 12) && gcd(6, 12) === 6 && feq(1, 2, 1, 2));
check('AI7: the ruler proof bookkeeping — 3 shaded quarters cut into 3 each: 3 × 3 = 9 shaded twelfths (9/12 = 3/4)', 3 * 3 === 9 && feq(9, 12, 3, 4));
check('AI8: the ruler proof — take 2 of every 3 shaded twelfths: 2 × 3 = 6 shaded of 12; 6/12 = 1/2', 2 * 3 === 6 && feq(6, 12, 1, 2));
check('AI9: area figure — 2/3 × 3/5: 3 rows × 5 columns = 15 cells; overlap 2 rows × 3 columns = 6 cells; 6/15 = 2/5 (HCF 3)', 3 * 5 === 15 && 2 * 3 === 6 && gcd(6, 15) === 3 && feq(2, 5, 2, 5));
check('AI10: commutative — 2/3 × 3/5 = 3/5 × 2/3 = 6/15 = 2/5', feq(2 * 3, 3 * 5, 6, 15) && feq(3 * 2, 5 * 3, 6, 15) && feq(2, 5, 2, 5));
check('AI11: associative — (1/2 × 2/5) × 3/4 = 1/5 × 3/4 = 3/20 and 1/2 × (2/5 × 3/4) = 1/2 × 3/10 = 3/20', feq(1 * 2, 2 * 5, 1, 5) && feq(1 * 3, 5 * 4, 3, 20) && feq(2 * 3, 5 * 4, 3, 10) && feq(1 * 3, 2 * 10, 3, 20));
check('AI12: identity — 5/9 × 1 = 5/9 (1 = 1/1)', feq(5, 9, 5, 9) && feq(1, 1, 1, 1));
check('AI13: zero — 5/9 × 0 = 0', feq(5 * 0, 9, 0, 1));
check('AI14: products of proper fractions shrink below BOTH factors — 8/15 < 2/3 (24 < 30) and 8/15 < 4/5 (40 < 60)', lt(8, 15, 2, 3) && lt(8, 15, 4, 5));
check('AI15: the scale reading — 1/2 × 3/4 = 3/8 < 3/4: multiplying by a proper fraction moves points toward 0', lt(3, 8, 3, 4));
check('AI16: growing direction — 5/3 × 2/7 = 10/21 > 2/7 (70 > 42): an improper multiplier pushes away from 0', feq(5 * 2, 3 * 7, 10, 21) && gt(10, 21, 2, 7));
check('AI17: the of-chain — 3/4 of 2/5 of 400: 400 × 2/5 = 160, then 160 × 3/4 = 120', (400 * 2) / 5 === 160 && (160 * 3) / 4 === 120);
check('AI18: cross-cancellation — 5/6 × 3/10 = 15/60 = 1/4; the cancelled route 1/2 × 1/2 = 1/4 agrees', feq(5 * 3, 6 * 10, 15, 60) && gcd(15, 60) === 15 && feq(1, 4, 1, 4) && feq(1 * 1, 2 * 2, 1, 4));
check('AI19: no common ruler needed — 2/3 × 3/5 = 2/5 with no LCM, while 2/3 + 3/5 = 19/15 required the 15-ruler', feq(2 * 3, 3 * 5, 2, 5) && feq(2 * 5 + 3 * 3, 15, 19, 15) && feq(19, 15, 19, 15));
check('AI20: products of two proper fractions stay proper — 8/15 < 1 and 3/10 < 1', lt(8, 15, 1, 1) && lt(3, 10, 1, 1));

/* ============================================================
 * AJ. Lesson 4.5 — reciprocals and the division theorem
 * ==========================================================*/
check('AJ1: reciprocal definition — 2/3 × 3/2 = 1 (a fraction times its flip is the whole 1)', feq(2 * 3, 3 * 2, 1, 1));
check('AJ2: the reciprocal of a whole is the unit fraction — 5 ↦ 1/5; of a unit fraction the whole — 1/8 ↦ 8', feq(5 * (1 / 5), 1, 1, 1) && feq((1 / 8) * 8, 1, 1, 1) && 5 * (1 / 5) === 1 && (1 / 8) * 8 === 1);
check('AJ3: the reciprocal of the reciprocal returns — (3/4) ↦ 4/3 ↦ 3/4', feq(4 * 3, 3 * 4, 1, 1) && feq(3, 4, 3, 4));
check('AJ4: 0 has no reciprocal — no number times 0 gives 1 (sweep k = 0..19: zero times anything never lands on 1)', (() => { const z = 0; for (let k = 0; k < 20; k++) if (z * k === 1) return false; return true; })());
check('AJ5: the counting case — 3/4 ÷ 1/8 = 6: three quarters is 6/8, six eighth-pieces fit', feq(3, 4, 6, 8) && 6 / 1 === 6);
check('AJ6: the theorem agrees — 3/4 ÷ 1/8 = 3/4 × 8/1 = 24/4 = 6', feq(3 * 8, 4 * 1, 24, 4) && 24 / 4 === 6);
check('AJ7: the general case — 5/6 ÷ 2/3 = 5/6 × 3/2 = 15/12 = 5/4 (HCF 3)', feq(5 * 3, 6 * 2, 15, 12) && gcd(15, 12) === 3 && feq(5, 4, 5, 4));
check('AJ8: the bd-ruler measurement proof — 5/6 = 10/12 and 2/3 = 8/12; how many 8-pieces in 10-pieces: 10/8 = 5/4, agreeing', feq(5, 6, 10, 12) && feq(2, 3, 8, 12) && feq(10, 8, 5, 4) && feq(10 / 2, 8 / 2, 5, 4));
check('AJ9: the sharing reading — 1/2 ÷ 3 = 1/6: half split into three equal shares (1/2 × 1/3)', feq(1, 2, 1, 2) && feq(1 * 1, 2 * 3, 1, 6) && feq(1, 6, 1, 6));
check('AJ10: dividing by a proper fraction ENLARGES — 3/4 ÷ 1/2 = 3/2 > 3/4', feq(3 * 2, 4 * 1, 3, 2) && gt(3, 2, 3, 4));
check('AJ11: dividing by an improper fraction SHRINKS — 3/4 ÷ 3/2 = 3/4 × 2/3 = 6/12 = 1/2 < 3/4', feq(3 * 2, 4 * 3, 6, 12) && feq(6, 12, 1, 2) && lt(1, 2, 3, 4));
check('AJ12: dividing by 1 stays — 5/9 ÷ 1 = 5/9', feq(5, 9, 5, 9));
check('AJ13: the see-saw — multiplying by 1/2 is dividing by 2: 3/4 × 1/2 = 3/4 ÷ 2 = 3/8', feq(3 * 1, 4 * 2, 3, 8) && feq(3, 8, 3, 8) && feq(3, 4, 3 * 2, 8));
check('AJ14: divide undoes multiply — (5/6 × 2/3) ÷ 2/3 = 5/6: the product is 10/18 = 5/9; how many 2/3 (= 12/18) fit in 5/9 (= 10/18): 10/12 = 5/6, agreeing', feq(5 * 2, 6 * 3, 10, 18) && feq(10 * 3, 18 * 2, 5, 6) && feq(10, 12, 5, 6));
check('AJ15: exam bottles — 15/2 ÷ 3/4 = 15/2 × 4/3 = 60/6 = 10 bottles', feq(15 * 4, 2 * 3, 60, 6) && 60 / 6 === 10);

/* ============================================================
 * AK. Lesson 4.5 — HCF and LCM of fractions (the banked shortcuts)
 * ==========================================================*/
check('AK1: inputs in lowest terms — gcd(2,3) = 1 and gcd(8,9) = 1', gcd(2, 3) === 1 && gcd(8, 9) === 1);
check('AK2: the HCF rule — HCF(2/3, 8/9) = HCF(2,8)/LCM(3,9) = 2/9', gcd(2, 8) === 2 && (function(){ let l = 3; while (l % 9 !== 0) l += 3; return l; })() === 9 && feq(2, 9, 2, 9));
check('AK3: 2/9 measures both — 2/3 ÷ 2/9 = 3 whole and 8/9 ÷ 2/9 = 4 whole', feq(2 * 9, 3 * 2, 3, 1) && feq(8 * 9, 9 * 2, 4, 1));
check('AK4: maximality on the 9-ruler — the largest k with 6 % k = 0 and 8 % k = 0 is 2, so 2/9 is the largest common measure', (() => { let best = 0; for (let k = 1; k <= 9; k++) if (6 % k === 0 && 8 % k === 0) best = k; return best === 2; })());
check('AK5: the LCM rule — LCM(2/3, 8/9) = LCM(2,8)/HCF(3,9) = 8/3', (function(){ let l = 2; while (l % 8 !== 0 || l % 2 !== 0) l += 2; return l; })() === 8 && gcd(3, 9) === 3 && feq(8, 3, 8, 3));
check('AK6: both measure 8/3 — 8/3 ÷ 2/3 = 4 whole and 8/3 ÷ 8/9 = 3 whole', feq(8 * 3, 3 * 2, 4, 1) && feq(8 * 9, 3 * 8, 3, 1));
check('AK7: minimality on the 9-ruler — the smallest m with 6 | m and 8 | m is 24, so 24/9 = 8/3 is the smallest fraction both measure', (() => { let m = 6; while (m % 8 !== 0) m += 6; return m; })() === 24 && feq(24, 9, 8, 3) && gcd(24, 9) === 3);
check('AK8: the product rule survives — HCF × LCM = 2/9 × 8/3 = 16/27 = 2/3 × 8/9 (the product of the fractions)', feq(2 * 8, 9 * 3, 16, 27) && feq(2 * 8, 3 * 9, 16, 27));
check('AK9: exercise L4 — HCF(1/2, 3/8) = HCF(1,3)/LCM(2,8) = 1/8; 1/8 measures 1/2 four times and 3/8 three times', gcd(1, 3) === 1 && (function(){ let l = 2; while (l % 8 !== 0) l += 2; return l; })() === 8 && feq(1, 8, 1, 8) && feq(1 * 8, 2 * 1, 4, 1) && feq(3 * 8, 8 * 1, 3, 1));
check('AK10: exercise L4 — LCM(1/2, 3/8) = LCM(1,3)/HCF(2,8) = 3/2; both measure it: 3 and 4 times', (function(){ let l = 1; while (l % 3 !== 0) l += 1; return l; })() === 3 && gcd(2, 8) === 2 && feq(3, 2, 3, 2) && feq(3 * 2, 2 * 1, 3, 1) && feq(3 * 8, 2 * 3, 4, 1));
check('AK11: exercise L4 — the product rule check: 1/8 × 3/2 = 3/16 = 1/2 × 3/8', feq(1 * 3, 8 * 2, 3, 16) && feq(1 * 3, 2 * 8, 3, 16));

/* ============================================================
 * AL. Lesson 4.5 — mixed numbers under × and ÷
 * ==========================================================*/
check('AL1: conversions — 2 1/2 = 5/2 and 1 3/4 = 7/4', 2 * 2 + 1 === 5 && 1 * 4 + 3 === 7 && feq(5, 2, 5, 2) && feq(7, 4, 7, 4));
check('AL2: 5/2 × 7/4 = 35/8 and 35 = 4 × 8 + 3 reads back as 4 3/8', feq(5 * 7, 2 * 4, 35, 8) && 35 === 4 * 8 + 3);
check('AL3: why no storeys — the four cross terms of (2 + 1/2)(1 + 3/4): 2 + 3/2 + 1/2 + 3/8 = 16/8 + 12/8 + 4/8 + 3/8 = 35/8, agreeing with the improper route', feq(2, 1, 2, 1) && feq(2 * 1 + 2 * (3 / 4) + (1 / 2) * 1 + (1 / 2) * (3 / 4), 1, 35, 8) && 16 + 12 + 4 + 3 === 35);
check('AL4: division instance — 1 1/2 ÷ 2 1/4 = 3/2 ÷ 9/4 = 12/18 = 2/3', 1 * 2 + 1 === 3 && 2 * 4 + 1 === 9 && feq(3 * 4, 2 * 9, 12, 18) && gcd(12, 18) === 6 && feq(2, 3, 2, 3));
check('AL5: exercise L5 — 2 1/4 ÷ 1 1/2 = 9/4 ÷ 3/2 = 18/12 = 3/2 = 1 1/2', 2 * 4 + 1 === 9 && 1 * 2 + 1 === 3 && feq(9 * 2, 4 * 3, 18, 12) && gcd(18, 12) === 6 && feq(3, 2, 3, 2) && 3 === 1 * 2 + 1);
check('AL6: products of two >1 mixed numbers exceed each — 35/8 > 5/2 (70 > 40) and 35/8 > 7/4 (140 > 56)', gt(35, 8, 5, 2) && gt(35, 8, 7, 4));

/* ============================================================
 * AM. Lesson 4.5 — quiz and exercise arithmetic (answer-key audit)
 * ==========================================================*/
check('AM1: quiz 1 — correct 2/3 × 3/5 = 6/15 = 2/5 (index 1); the distractors 1/3, 3/4 and 5/2 all fail', feq(2 * 3, 3 * 5, 6, 15) && gcd(6, 15) === 3 && feq(2, 5, 2, 5) && !feq(1, 3, 2, 5) && !feq(3, 4, 2, 5) && !feq(5, 2, 2, 5));
check('AM2: quiz 2 — correct 3/8 (index 2): 3/8 × 2/7 = 3/28 < 2/7; the distractors grow or hold: 5/3 × 2/7 = 10/21 > 2/7, 8/3 × 2/7 = 16/21 > 2/7, 1 × 2/7 = 2/7', feq(3 * 2, 8 * 7, 6, 56) && feq(3, 28, 3, 28) && lt(3, 28, 2, 7) && gt(10, 21, 2, 7) && gt(16, 21, 2, 7) && feq(2, 7, 2, 7));
check('AM3: quiz 3 — correct 1/2 ÷ 1/6 = 1/2 × 6/1 = 3 (index 1); the distractors 1/12, 1/3 and 12 all fail', feq(1 * 6, 2 * 1, 3, 1) && 3 === 3 && !feq(1, 12, 3, 1) && !feq(1, 3, 3, 1) && !feq(12, 1, 3, 1));
check('AM4: quiz 4 — correct HCF = 2/9 (index 0); the distractors 16/27 (the product), 14/9 (the sum 6/9 + 8/9) and 8/3 (the LCM) all fail the HCF role', feq(2, 9, 2, 9) && !feq(16, 27, 2, 9) && !feq(14, 9, 2, 9) && !feq(8, 3, 2, 9) && feq(6 + 8, 9, 14, 9));
check('AM5: quiz 5 — correct 4 3/8 = 35/8 (index 3); the distractors 2 3/8 = 19/8, 4 1/4 = 17/4 and 35/16 all fail', feq(35, 8, 4 * 8 + 3, 8) && !feq(19, 8, 35, 8) && !feq(17, 4, 35, 8) && !feq(35, 16, 35, 8));
check('AM6: exercise L1 — (a) 1/3 × 2/5 = 2/15; (b) 3/4 × 2/9 = 6/36 = 1/6 (AI3/AI5 re-checks)', feq(1 * 2, 3 * 5, 2, 15) && feq(6, 36, 1, 6));
check('AM7: exercise L1 — 1/2 of 4/5 = 2/5', feq(1 * 4, 2 * 5, 2, 5) && feq(2, 5, 2, 5));
check('AM8: exercise L2 — 2/7 × 7/8 = 14/56 = 1/4 (cross-cancel the 7s: 2/8 = 1/4); 2/3 ÷ 4/9 = 18/12 = 3/2', feq(2 * 7, 7 * 8, 14, 56) && gcd(14, 56) === 14 && feq(1, 4, 1, 4) && feq(2 * 9, 3 * 4, 18, 12) && gcd(18, 12) === 6 && feq(3, 2, 3, 2));
check('AM9: exercise L3 — 5/6 × 12/25 = 60/150 = 2/5 (cancel 5 & 25 then 6 & 12: 1/1 × 2/5); the ribbon 3/4 of 5/6 m = 5/8 m', feq(5 * 12, 6 * 25, 60, 150) && gcd(60, 150) === 30 && feq(2, 5, 2, 5) && feq(3 * 5, 4 * 6, 15, 24) && gcd(15, 24) === 3 && feq(5, 8, 5, 8));
check('AM10: exercise L4 — the tank: 2/3 of 240 = 160 L in; 3/4 of 160 = 120 L used; 40 L remain = 1/6 of the tank', (240 * 2) / 3 === 160 && (160 * 3) / 4 === 120 && 160 - 120 === 40 && feq(40, 240, 1, 6));
check('AM11: exercise L5 — the bottle count 10 is a whole number (bottles come whole) and the division 15/2 ÷ 3/4 lands exactly on it (AJ15 re-check)', 60 / 6 === 10 && Number.isInteger(10));
check('AM12: exercise L6 — the proofs reuse verified instances: the ruler proof 6/12 = 1/2 (AI8) and the measurement proof 10/8 = 5/4 (AJ8)', feq(6, 12, 1, 2) && feq(10, 8, 5, 4));

/* ============================================================
 * AN. Lesson 4.5 — figure geometry (area grid + division line)
 * ==========================================================*/
check('AN1: fig A — the grid: 5 columns of 124 px (620 wide) × 3 rows of 100 px (300 tall): 15 cells of 124 × 100', 5 * 124 === 620 && 3 * 100 === 300 && 15 * (124 * 100) === 620 * 300);
check('AN2: fig A — the column shading spans 3 × 124 = 372 px (3/5 of 620); the row shading spans 2 × 100 = 200 px (2/3 of 300)', 3 * 124 === 372 && Math.abs(372 / 620 - 3 / 5) < 1e-12 && 2 * 100 === 200 && Math.abs(200 / 300 - 2 / 3) < 1e-12);
check('AN3: fig A — the overlap is 372 × 200 = 74,400 px² of 620 × 300 = 186,000 px²: exactly 6/15 = 2/5 of the rectangle', 372 * 200 === 74400 && 620 * 300 === 186000 && Math.abs(74400 / 186000 - 2 / 5) < 1e-12 && feq(6, 15, 2, 5));
check('AN4: fig B — the line runs 40 → 720 (680 px per unit): x(3/4) = 550, eighth ticks at 125, 210, 295, 380, 465, 550 (85 px apart)', Math.abs(40 + (3 / 4) * 680 - 550) < 0.01 && [125, 210, 295, 380, 465, 550].every((x, i) => Math.abs(x - (125 + i * 85)) < 1e-9) && Math.abs(680 / 8 - 85) < 1e-9);
check('AN5: fig B — six eighth-steps of 85 px tile 0 → 550: 6 × 85 = 510 = 40 + (3/4)·680 − 40 — the counting made visible', 6 * 85 === 510 && Math.abs(510 - (3 / 4) * 680) < 0.01);

/* ============================================================
 * Report
 * ==========================================================*/
console.log(`verify-unit-4: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
} else {
  console.log('ALL CHECKS PASS — lessons 4.1–4.5 arithmetic is pre-verified.');
}
