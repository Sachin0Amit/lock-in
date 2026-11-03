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
 * Report
 * ==========================================================*/
console.log(`verify-unit-4: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
} else {
  console.log('ALL CHECKS PASS — lesson 4.1 arithmetic is pre-verified.');
}
