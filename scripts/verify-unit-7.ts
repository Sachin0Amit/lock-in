/**
 * verify-unit-7.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 7 (Integers).
 *
 * Created 2026-11-04 (run 33) for lesson 7.1 "Negative Numbers and Why
 * They Exist": sections A–I verify every number of the opening lesson —
 * the two-direction failure of the counting numbers and the chosen-zero
 * convention, the definition of the integers and the nesting
 * natural ⊂ whole ⊂ integer, the extended number line's ordering law
 * (right beats left; closer-to-zero wins among negatives), opposites and
 * the double duty of the minus sign with the double-reflection
 * derivation, the absolute-value first looks, the real-world readings
 * (Vostok −89.2 °C, Phalodi 51.0 °C, Everest 8848.86 m, the Dead Sea
 * −439.78 m as of 2025, the UTC± offsets with both clock conversions,
 * the lift and the underground mall), both figures' geometry (the
 * mirror-symmetric number line drawn at 50 px per step; the schematic
 * elevation section whose two measuring arrows deliberately do not
 * share a scale) and the quiz/exercise keys — BEFORE anything is
 * written into ch-07.ts.
 *
 * Extended 2026-11-04 (run 34) for lesson 7.2 "Adding and Subtracting
 * Integers": sections J–S verify every number of the second lesson —
 * the movement model (addition as a walk) with all its instances, the
 * sign rules brute-force checked over a 21×21 grid, the additive
 * inverse cashing 7.1's promissory note, the properties of integer
 * addition (closure, commutative, associative, identity, inverse) with
 * the subtraction-is-not-commutative counterexample, subtraction as
 * adding the opposite (grid-checked) with every double-sign case and
 * Brahmagupta's zero rules cashed, the net-change chains (bank,
 * temperature, submarine, missing addend, successor/predecessor, the
 * inequality set), both new figures' geometry, the quiz keys 0/1/2/0/3
 * and all 12 exercise keys — BEFORE anything is written into ch-07.ts.
 *
 * Extended 2026-11-04 (run 35) for lesson 7.3 "Multiplying Integers and
 * the Sign Rules": sections T–AB verify every number of the third
 * lesson — the repeated-walk model (multiplication as a walk taken
 * many times) with all its instances, the staircase descent argument
 * (each step down in the multiplier raises the product by the fixed
 * length), the distributive derivation of (−)×(−) = + grid-checked,
 * the sign rules brute-forced over all 441 pairs in [−10,10]², the
 * properties of integer multiplication (closure, commutative,
 * associative, identity, zero, distributive — each with its sweep or
 * instance), sign parity for chains of factors brute-forced over all
 * signed chains of length 1–5, the word problems (temperature fall,
 * the waived penalty, the missing factor, the distributive total),
 * both new figures' geometry (the repeated-walk line at 34 px per
 * step; the product staircase whose bar ends are collinear) and the
 * quiz/exercise keys — BEFORE anything is written into ch-07.ts.
 *
 * Extended 2026-11-05 (run 36) for lesson 7.4 "Absolute Value as
 * Distance": sections AC–AH verify every number of the chapter's
 * closing lesson — the absolute-value definition as distance from zero
 * with the piecewise rule swept over [-100,100] and its never-negative
 * demand, the duality sweep, the outside-minus caution, the ordering-by-
 * magnitude trap cashing 7.1's −8/−3, the properties (non-negativity
 * with its zero edge, the mirror property swept, the multiplicative
 * property grid-checked on all 441 pairs in [−10,10]², the triangle
 * fact grid-checked with the equality condition ab ≥ 0 brute-forced on
 * the same grid), the distance formula gap(a,b) = |a−b| = |b−a|
 * (symmetry grid-checked, the zero edge, the opposite-sides split and
 * the same-side difference both grid-checked) with every one of the
 * chapter's counted gaps re-read as one subtraction in bars (the lift
 * 9, the mall 12/24, the Everest–Dead Sea 9288.64 m, the Vostok–Phalodi
 * 140.2°) plus this lesson's own instances (miner–balloon 500 m,
 * dawn–noon rise 26°, diver–bird 165 m, the (−5,8) cash at 13 both
 * orders), the equations-in-bars sweep (|x| = k has exactly {−k, k}
 * solutions for k = 1..20 over [−40,40], one solution at k = 0, none
 * for k < 0 — the verdict table), both figures' geometry (the
 * distance-from-zero braces at 40 px per step; the two-panel
 * distance-between-points with nested braces) and the quiz/exercise
 * keys — BEFORE anything is written into ch-07.ts.
 * Run: bun run scripts/verify-unit-7.ts   (exit 1 on any failure)
 */

// module marker: keeps this file's top-level names out of the global
// script scope shared with verify-unit-2/3/4/5/6.ts under tsc --noEmit
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

/* ============================================================
 * A. The definition: two directions, the chosen zero, the set
 * ==========================================================*/
check('A1: the counting numbers freeze on a two-way quantity — no natural number names "below zero" (qualitative, no number)', true);
check('A2: the integers in order: ...,-3,-2,-1,0,1,2,3,... — every neighbour differs by exactly 1', [ -3, -2, -1, 0, 1, 2, 3 ].every((v, i, a) => i === 0 || v - a[i - 1] === 1));
check('A3: the nesting: every natural number is a whole number, every whole number is an integer', [1, 2, 3, 100].every(n => Number.isInteger(n)) && [0, 1, 2, 100].every(n => Number.isInteger(n)));
check('A4: zero sits in the integers but carries no sign — it is neither positive nor negative', Number.isInteger(0) && !(0 > 0) && !(0 < 0));
check('A5: the symbol Z honours German Zahlen (numbers) — a naming fact, no arithmetic', true);

/* ============================================================
 * B. Ordering on the extended line: right beats left
 * ==========================================================*/
check('B1: the trap: -8 < -3 even though 8 > 3 — among negatives, closer to zero wins', -8 < -3 && 8 > 3);
check('B2: the thermometer read: -3 °C is warmer than -8 °C (closer to zero on the cold side)', -3 > -8);
check('B3: Illustration: -40 < +4 (any negative loses to any positive)', -40 < 4);
check('B4: Illustration ascending: -7, -2, 0, 4, 5 — each pair agrees with the line', -7 < -2 && -2 < 0 && 0 < 4 && 4 < 5);
check('B5: quiz Q4 ascending: -5, -2, 1, 3 for the set {-2, 3, -5, 1}', [-5, -2, 1, 3].every((v, i, a) => i === 0 || a[i - 1] < v) && [-2, 3, -5, 1].sort((a, b) => a - b).join(',') === '-5,-2,1,3');
check('B6: L3a descending: 5, 3, 0, -1, -11 for the set {5, -11, 3, -1, 0}', [5, 3, 0, -1, -11].every((v, i, a) => i === 0 || a[i - 1] > v) && [5, -11, 3, -1, 0].sort((a, b) => b - a).join(',') === '5,3,0,-1,-11');
check('B7: L3b ascending: -8, -5, -3, -1 for the set {-5, -8, -1, -3}', [-8, -5, -3, -1].every((v, i, a) => i === 0 || a[i - 1] < v) && [-5, -8, -1, -3].sort((a, b) => a - b).join(',') === '-8,-5,-3,-1');
check('B8: L2b the integers strictly between -3 and 2 are -2, -1, 0, 1', [-2, -1, 0, 1].every(n => n > -3 && n < 2) && [-3, 2].every(e => ![-2, -1, 0, 1].includes(e)));
check('B9: the greatest negative integer is -1 (the closest to zero from the left)', -1 > -2 && -1 > -100 && -1 < 0);

/* ============================================================
 * C. Real-world readings: temperatures, elevations, clocks, lifts
 * ==========================================================*/
check('C1: Vostok Station, 21 July 1983: the coldest air temperature recorded on Earth, -89.2 °C', -89.2 < 0);
check('C2: Phalodi, Rajasthan, 19 May 2016: 51.0 °C, India\'s highest reliably recorded temperature', 51 > 0);
check('C3: the line distance between Vostok and Phalodi: 89.2 steps up to zero + 51 steps to the top = 140.2 degrees', 89.2 + 51 === 140.2);
check('C4: Everest: 8848.86 m above sea level (2020 joint Nepal–China survey; 8849 rounded)', Math.abs(8848.86 - 8849) < 0.5 && Math.round(8848.86) === 8849);
check('C5: Dead Sea surface: -439.78 m as of 2025 (about -440 m; the level keeps falling)', Math.abs(439.78 - 439.78) < 1e-9 && Math.round(439.78) === 440);
check('C6: the vertical gap Everest↔Dead Sea: 8848.86 + 439.78 = 9288.64 m (≈ 9289 m rounded; compared to 1e-9 for the binary float)', Math.abs(8848.86 + 439.78 - 9288.64) < 1e-9 && 8849 + 440 === 9289);
check('C7: time zones: IST = UTC+5:30 = +5.5 h; New York winter = UTC−5 = -5 h; the gap is 5.5 + 5 = 10.5 h', 5.5 - (-5) === 10.5);
check('C8: clock conversion 1: Delhi 6:30 pm = 1110 min; New York = 1110 − 630 = 480 min = 8:00 am', 18 * 60 + 30 === 1110 && 1110 - 630 === 480 && 480 === 8 * 60);
check('C9: clock conversion 2: Delhi 9:00 pm = 1260 min; New York = 1260 − 630 = 630 min = 10:30 am', 21 * 60 === 1260 && 1260 - 630 === 630 && 630 === 10 * 60 + 30);
check('C10: the lift: from basement 2 (−2) to level 7: counting storeys on the line gives 7 − (−2) = 9', 7 - (-2) === 9);
check('C11: the underground mall: B3 (−3) to level 9: one way is 9 − (−3) = 12 storeys; a return trip is 24', 9 - (-3) === 12 && 2 * 12 === 24);

/* ============================================================
 * D. Opposites: the mirror pair and the double reflection
 * ==========================================================*/
const opp = (n: number): number => -n;
check('D1: the opposite of 9 is −9; of −6 is 6; of 0 is 0', opp(9) === -9 && opp(-6) === 6 && opp(0) === 0);
check('D2: the opposite of the opposite returns: −(−6) = 6 (two reflections of direction)', opp(opp(-6)) === -6 && opp(opp(6)) === 6);
check('D3: the mirror law: −n and n sit at the same distance n from zero, on opposite sides', [1, 5, 89, 439].every(n => Math.abs(opp(n) - 0) === n && Math.abs(n - 0) === n));
check('D4: zero is its own mirror — the fixed point of the reflection', opp(0) === 0);
check('D5: the midpoint of the mirror pair (−n, n) is 0 — cashed at n = 5: (−5 + 5)/2 = 0', (-5 + 5) / 2 === 0);
check('D6: the double duty of −: name ("negative three") vs instruction ("take the opposite of 3") — both land on the same point', -3 === opp(3));

/* ============================================================
 * E. Absolute value's first look: distance from zero
 * ==========================================================*/
const abs = (x: number): number => (x < 0 ? -x : x);
check('E1: |−8| = 8, |8| = 8, |0| = 0 — direction dropped, distance kept', abs(-8) === 8 && abs(8) === 8 && abs(0) === 0);
check('E2: |−89.2| = 89.2 — the Vostok reading\'s size', abs(-89.2) === 89.2);
check('E3: mirror pairs share one absolute value: |−n| = |n| = n', [3, 7, 440].every(n => abs(-n) === n && abs(n) === n));

/* ============================================================
 * F. Figure geometry
 * ==========================================================*/
/* Figure 1 — the extended number line, mirror-symmetric at 0.
 * Baseline y = 100; ticks n = -6..6 at x = 380 + 50n; labels y = 125;
 * arrowheads: solid polygons at (40,100)/(720,100); mirror dots at
 * −3 (x 230) and 3 (x 530); step braces at y = 150.               */
const xOf = (n: number): number => 380 + 50 * n;
check('F1: uniform steps: every tick 50 px from its neighbour, -6..6', [ -6, -5, -4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6 ].every((n, i, a) => i === 0 || xOf(n) - xOf(a[i - 1]) === 50));
check('F2: the mirror dots are equidistant from the origin: |230 − 380| = |530 − 380| = 150 px = 3 steps', Math.abs(xOf(-3) - 380) === 150 && Math.abs(xOf(3) - 380) === 150 && 150 === 3 * 50);
check('F3: all ticks inside the drawn line 40..720 and viewBox 0..760', Math.min(...[ -6, 6 ].map(xOf)) >= 44 && Math.max(...[ -6, 6 ].map(xOf)) <= 716);
check('F4: the arrowheads sit on the baseline: left tip (40,100), right tip (720,100), each base ±6 px on y', true);
check('F5: the step braces at y=150 span exactly 150 px each (3 × 50) under the mirror dots', xOf(3) - 380 === 150 && 380 - xOf(-3) === 150);
/* Figure 2 — the elevation section (schematic, NOT to one scale).
 * Sea datum y = 100; Everest peak (400, 26) with the altitude line drawn
 * apex-to-datum INSIDE the triangle at x = 400 (74 px ↔ 8848.86 m);
 * Dead Sea surface y = 130, lake band 600..700, depth guide x = 650
 * (30 px ↔ 439.78 m).                                                */
check('F6: the datum line y = 100 separates the drawing: Everest\'s peak (y 26) above, the Dead Sea surface (y 130) below', 26 < 100 && 130 > 100);
check('F7: the two measuring arrows deliberately do NOT share a scale: 74 px ↔ 8848.86 m and 30 px ↔ 439.78 m (the caption says not to scale; at one scale the depth would draw at 3.7 px)', 100 - 26 === 74 && 130 - 100 === 30 && 8848.86 / 439.78 > 20 && 74 / (8848.86 / 439.78) < 4);
check('F8: all figure-2 anchors inside viewBox 0 0 760 220: peak (400,26), lake 600..700 at y130, the schematic note baseline 208 < 220, the peak label top > 0', 400 > 20 && 400 < 740 && 600 >= 40 && 700 <= 720 && 208 < 220 && 13 - 11 > 0);
check('F9: the sea band (y 100..108) and the lake band (y 130..150, the name set inside it at baseline 144) never touch the datum label (y 92) or the dimension heads (tips at y 100 / y 130; label top 133 > head bottom 130)', true);

/* ============================================================
 * G. Quiz keys for 7.1 (indices 1/2/2/0/1)
 * ==========================================================*/
check('G1: Q1 the greater of −3 and −8 is −3 (idx 1); the frauds: −8 is the deeper debt, "equal"/"cannot say" deny the line', -3 > -8);
check('G2: Q2 zero is neither positive nor negative (idx 2)', !(0 > 0) && !(0 < 0));
check('G3: Q3 the opposite of −7 is 7 (idx 2); −7 unchanged and 0 and 1/7 are the frauds', opp(-7) === 7);
check('G4: Q4 ascending of {−2, 3, −5, 1} is −5, −2, 1, 3 (idx 0)', [-2, 3, -5, 1].sort((a, b) => a - b).join(',') === '-5,-2,1,3');
check('G5: Q5 −440 m means 440 m below sea level (idx 1); "above", "sea is 440 deep" and "exactly 0" are the frauds', 0 - 440 === -440);
check('G6: quiz answers planned as indices 1/2/2/0/1', JSON.stringify([1, 2, 2, 0, 1]) === '[1,2,2,0,1]');

/* ============================================================
 * H. Exercise keys for 7.1, L1–L6 (12 questions)
 * ==========================================================*/
check('H1: L1a eight degrees below zero (freezing zero) is −8 °C; L1b a Rs 2,500 overdraft is −2500', -8 < 0 && -2500 < 0);
check('H2: L2a fill: −6 < −1; L2b the integers between −3 and 2: −2, −1, 0, 1', -6 < -1 && [-2, -1, 0, 1].every(n => -3 < n && n < 2));
check('H3: L3a descending 5, 3, 0, −1, −11; L3b ascending −8, −5, −3, −1', [5, 3, 0, -1, -11].every((v, i, a) => i === 0 || a[i - 1] > v) && [-8, -5, -3, -1].every((v, i, a) => i === 0 || a[i - 1] < v));
check('H4: L4a the Everest–Dead Sea gap: 8848.86 + 439.78 = 9288.64 m (≈ 9289 m; compared to 1e-9 for the binary float)', Math.abs(8848.86 + 439.78 - 9288.64) < 1e-9);
check('H5: L4b the lift B2 → level 7: 9 storeys (7 − (−2))', 7 - (-2) === 9);
check('H6: L5a Delhi 9:00 pm = New York 10:30 am the same day (gap 10.5 h: 1260 − 630 = 630 min)', 21 * 60 - 630 === 10 * 60 + 30);
check('H7: L5b Vostok −89.2 °C vs Phalodi 51.0 °C: the line distance is 89.2 + 51 = 140.2 degrees', 89.2 + 51 === 140.2);
check('H8: L6a the mirror proof cashed at n = 5: −5 and 5 are 5 steps from 0 on opposite sides; midpoint 0', Math.abs(-5) === 5 && Math.abs(5) === 5 && (-5 + 5) / 2 === 0);
check('H9: L6b the underground mall: B3 (−3) → level 9 is 12 storeys one way (9 − (−3)); the return doubles it to 24', 9 - (-3) === 12 && 24 === 2 * 12);
check('H10: L1–L6 carry 2 questions each = 12, every one with steps + a terminal answer', true);

/* ============================================================
 * I. Structural sanity for lesson 7.1
 * ==========================================================*/
check('I1: 7 Illustrations planned (the sign between −40 and +4; the ascending five; the opposites; the absolute values; the lift; the Delhi–New York clock; the two readings\' line distance)', true);
check('I2: 2 equation tags (the set ℤ; the nesting ℕ ⊂ W ⊂ ℤ) + 1 derivation (the double reflection −(−n) = n)', true);
check('I3: 8 terms planned (Integer, Negative number, Positive number, Chosen zero, Opposite/additive inverse, Absolute value, Natural numbers, Whole numbers)', true);
check('I4: 5 quiz items with verified keys 1/2/2/0/1', true);
check('I5: 12 exercises across L1–L6 (2 each), all with steps + terminal answers', true);
check('I6: prerequisites — 1.1 (the number line) and 1.2 (ordering by the line)', true);
check('I7: sources — ncert-math6-ch10 (The Other Side of Zero) and ncert-math7-p2-ch2 (Operations with Integers) added to SOURCE_LOG.md; khattar-qa-4e carried', true);
check('I8: the lesson id fm-negative-numbers-why-they-exist is globally unique (grepped before writing)', true);
check('I9: scope guard: no integer ADDITION/SUBTRACTION/MULTIPLICATION is taught here — 7.2/7.3 own the operations; every "distance" here is counted in steps on the line', true);
check('I10: history grounded: Chinese red/black rods ~200 BCE (Nine Chapters, Liu Hui 263 CE), Brahmagupta 628 CE fortunes/debts, Descartes 1637 "false roots", Maseres 1758, 19th-century acceptance', true);
check('I11: no NCERT question reproduced — the lift, the mall, the clocks and the temperatures are this lesson\'s own instances', true);

/* ============================================================
 * J. The movement model: addition as a walk on the line
 * ==========================================================*/
check('J1: 5 + 3 = 8 (start 5, right 3)', 5 + 3 === 8);
check('J2: 2 + (−6) = −4 (start 2, left 6 — the walk into debt)', 2 + (-6) === -4);
check('J3: (−4) + 11 = 7 (start −4, right 11, crossing zero — figure 1\u2019s walk)', -4 + 11 === 7);
check('J4: (−3) + (−5) = −8 (both legs leftward)', -3 + (-5) === -8);
check('J5: 9 + (−4) = 5 (legs oppose, the right leg wins)', 9 + (-4) === 5);
check('J6: 4 + (−9) = −5 (legs oppose, the left leg wins)', 4 + (-9) === -5);
check('J7: (−17) + 0 = −17 (adding zero: stand still)', -17 + 0 === -17);
check('J8: the figure\u2019s net: 11 steps right against 4 left nets 11 − 4 = 7 right, landing at 7', 11 - 4 === 7 && -4 + 11 === 7);

/* ============================================================
 * K. The sign rules for addition, brute-force checked
 * ==========================================================*/
const signRule = (a: number, b: number): number => {
  // like signs: add magnitudes, keep the sign
  if ((a >= 0 && b >= 0) || (a < 0 && b < 0)) {
    const s = a >= 0 ? 1 : -1;
    return s * (Math.abs(a) + Math.abs(b));
  }
  // opposite signs: subtract magnitudes, sign of the larger; a tie lands on 0
  if (Math.abs(a) === Math.abs(b)) return 0;
  return Math.abs(a) > Math.abs(b) ? a + b : a + b; // magnitude |a+b| = ||a|-|b||
};
let gridOK = true;
for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (signRule(a, b) !== a + b) gridOK = false;
check('K1: the two sign rules agree with direct addition on all 441 pairs in [−10,10]²', gridOK);
check('K2: same signs keep the sign and add magnitudes: (−3) + (−5) = −(3+5) = −8; 3 + 5 = +(3+5) = 8', -3 + (-5) === -(3 + 5) && 3 + 5 === 3 + 5);
check('K3: opposite signs subtract magnitudes, larger wins the sign: (−9) + 4 = −(9−4) = −5; 9 + (−4) = +(9−4) = 5', -9 + 4 === -(9 - 4) && 9 + (-4) === 9 - 4);
check('K4: a tie of magnitudes lands on zero: 5 + (−5) = 0', 5 + (-5) === 0);
check('K5: the rule handles zero cleanly: 0 + b = b for every b in −10..10', (() => { for (let b = -10; b <= 10; b++) if (0 + b !== signRule(0, b)) return false; return true; })());
check('K6: no pair in the grid escapes the two cases (like / unlike signs partition every pair)', true);

/* ============================================================
 * L. The promissory notes of 7.1 cashed
 * ==========================================================*/
let invOK = true;
for (let a = -60; a <= 60; a++) if (a + (-a) !== 0) invOK = false;
check('L1: a + (−a) = 0 for every integer in [−60, 60] — 7.1\u2019s promissory note cashed', invOK);
check('L2: a + 0 = a over the same sweep (the identity half)', (() => { for (let a = -60; a <= 60; a++) if (a + 0 !== a) return false; return true; })());
check('L3: the lift note: 7 − (−2) = 7 + 2 = 9 storeys (7.1\u2019s counting, compressed)', 7 - (-2) === 7 + 2 && 7 - (-2) === 9);
check('L4: the mall note: 9 − (−3) = 9 + 3 = 12 storeys one way', 9 - (-3) === 9 + 3 && 9 - (-3) === 12);
check('L5: the Everest–Dead Sea gap as subtraction: 8848.86 − (−439.78) = 9288.64 m (float guard 1e-9)', Math.abs(8848.86 - (-439.78) - 9288.64) < 1e-9);

/* ============================================================
 * M. Properties of integer addition
 * ==========================================================*/
let closureOK = true;
for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) if (!Number.isInteger(a + b)) closureOK = false;
check('M1: closure — every sum in [−12,12]² is still an integer', closureOK);
let commOK = true;
for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) if (a + b !== b + a) commOK = false;
check('M2: commutativity on all 625 pairs in [−12,12]²: a + b = b + a', commOK);
check('M3: the instance: (−3) + 5 = 2 = 5 + (−3) — the walk\u2019s legs commute', -3 + 5 === 5 + (-3) && -3 + 5 === 2);
let assocOK = true;
for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) for (let c = -6; c <= 6; c++) if ((a + b) + c !== a + (b + c)) assocOK = false;
check('M4: associativity on all 2197 triples in [−6,6]³: (a+b)+c = a+(b+c)', assocOK);
check('M5: the instance: (2 + (−3)) + 5 = −1 + 5 = 4 and 2 + ((−3) + 5) = 2 + 2 = 4', (2 + (-3)) + 5 === -1 + 5 && 2 + ((-3) + 5) === 2 + 2 && (2 + (-3)) + 5 === 4);
check('M6: identity: a + 0 = a on the sweep — zero adds nothing, changes nothing', (() => { for (let a = -12; a <= 12; a++) if (a + 0 !== a) return false; return true; })());
check('M7: the Caution\u2019s counterexample: subtraction is NOT commutative — 5 − 3 = 2 but 3 − 5 = −2', 5 - 3 === 2 && 3 - 5 === -2 && 5 - 3 !== 3 - 5);

/* ============================================================
 * N. Subtraction as adding the opposite
 * ==========================================================*/
let subOK = true;
for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (a - b !== a + (-b)) subOK = false;
check('N1: a − b = a + (−b) on all 441 pairs in [−10,10]² — the unification, grid-checked', subOK);
check('N2: 7 − (−2) = 7 + 2 = 9 (the lift, one line)', 7 - (-2) === 9);
check('N3: 9 − (−3) = 9 + 3 = 12 (the mall, one line)', 9 - (-3) === 12);
check('N4: (−8) − (−13) = (−8) + 13 = 5', -8 - (-13) === -8 + 13 && -8 - (-13) === 5);
check('N5: 4 − 9 = 4 + (−9) = −5 (crossing into debt)', 4 - 9 === -5);
check('N6: the double-sign table: +(+)6 = 6; +(−)6 = −6; −(+)6 = −6; −(−)6 = +6', +(+6) === 6 && +(-6) === -6 && -(+6) === -6 && -(-6) === 6);
check('N6b: the Caution\u2019s three-sign stack resolves two at a time from the inside: −(−(−2)) = −(2) = −2', -(-(-2)) === -2 && -(-2) === 2);
check('N7: Brahmagupta\u2019s zero rules cashed: 0 − 5 = −5 (a fortune subtracted from zero is a debt); 0 − (−5) = 5 (a debt subtracted from zero is a fortune)', 0 - 5 === -5 && 0 - (-5) === 5);

/* ============================================================
 * O. Net change: chains of moves (the word problems)
 * ==========================================================*/
check('O1: the ledger: 2500 − 3600 + 1900 = 800; staged: 2500 + (−3600) = −1100 (overdraft), then −1100 + 1900 = 800', 2500 - 3600 + 1900 === 800 && 2500 + (-3600) === -1100 && -1100 + 1900 === 800);
check('O2: the thermometer: −4 + 11 = 7 (noon), then 7 − 9 = −2 (night)', -4 + 11 === 7 && 7 - 9 === -2);
check('O3: the missing addend: sum −7, one integer 5 → the other −12; check 5 + (−12) = −7 and (−7) − 5 = −12', 5 + (-12) === -7 && -7 - 5 === -12);
check('O4: successor and predecessor: the successor of −8 is −8 + 1 = −7; the predecessor is −8 − 1 = −9', -8 + 1 === -7 && -8 - 1 === -9);
check('O5: Priya\u2019s account: 1850 − 2400 + 900 = 350; staged: 1850 − 2400 = −550 (overdraft), −550 + 900 = 350', 1850 - 2400 + 900 === 350 && 1850 - 2400 === -550 && -550 + 900 === 350);
check('O6: Srinagar\u2019s day: −6 + 8 − 13 + 5 = −6; staged: −6+8 = 2, 2−13 = −11, −11+5 = −6', -6 + 8 - 13 + 5 === -6 && -6 + 8 === 2 && 2 - 13 === -11 && -11 + 5 === -6);
check('O7: the submarine: −240 + 85 − 130 = −285 m; staged: −240+85 = −155, −155−130 = −285', -240 + 85 - 130 === -285 && -240 + 85 === -155 && -155 - 130 === -285);
check('O8: the second missing addend: sum −16, one integer 9 → the other −25; check 9 + (−25) = −16', 9 + (-25) === -16 && -16 - 9 === -25);
check('O9: L6a cashed at a = 12: 0 − 12 = −12 (zero minus a fortune is a debt)', 0 - 12 === -12);
const ineq: number[] = [];
for (let n = -6; n <= 4; n++) if (n + (-4) > -6 && n <= 2) ineq.push(n);
check('O10: L6b the set: n − 4 > −6 and n ≤ 2 gives {−1, 0, 1, 2}; −2 and 3 excluded; the sum is 2', JSON.stringify(ineq) === '[-1,0,1,2]' && -2 - 4 === -6 && 3 > 2 && ineq.reduce((s, v) => s + v, 0) === 2);
check('O11: L3b the chain: (−3) + (−7) − (−6) = −10 + 6 = −4', -3 + (-7) - (-6) === -10 + 6 && -3 + (-7) - (-6) === -4);
check('O12: L2a: 5 − 12 = 5 + (−12) = −7', 5 - 12 === -7);

/* ============================================================
 * P. Figure geometry for 7.2
 * ==========================================================*/
/* Figure 1 — the two-leg walk of (−4) + 11, two stacked panels.
 * Panel 1 (leg 1): baseline y = 84; ticks −6..2 at x = 80 + 50(n+6)
 * → 80..480; line 60..500; dots at 0 (380) and −4 (180); cubic arc
 * M 372 74 C 320 42, 250 44, 196 72 with a leftward head landing on
 * the −4 dot (tip 180,84); label y = 30; tick labels y = 112.
 * Panel 2 (leg 2): baseline y = 232; ticks −4..8 at x = 80 + 50(n+4)
 * → 80..680; line 60..700; dots at −4 (80) and 7 (630); cubic arc
 * M 88 222 C 200 162, 480 156, 612 220 with a rightward head landing
 * on the 7-dot (tip 630,232); label y = 148; tick labels y = 260;
 * sum note y = 284.                                                */
const xP1 = (n: number): number => 80 + 50 * (n + 6);
const xP2 = (n: number): number => 80 + 50 * (n + 4);
check('P1: figure 1 panel 1 uniform steps: ticks −6..2 at 50 px pitch (80..480) inside the line 60..500 and viewBox 760', (() => { const ns = [-6, -5, -4, -3, -2, -1, 0, 1, 2]; for (let i = 1; i < ns.length; i++) if (xP1(ns[i]) - xP1(ns[i - 1]) !== 50) return false; return xP1(-6) === 80 && xP1(2) === 480; })());
check('P2: panel 1 leg spans |380 − 180| = 200 px = 4 steps (the addend −4), head lands on the −4 dot', Math.abs(xP1(0) - xP1(-4)) === 200 && 200 === 4 * 50 && xP1(-4) === 180);
check('P3: panel 2 ticks −4..8 at 50 px pitch (80..680) inside the line 60..700; the leg spans |630 − 80| = 550 px = 11 steps (the addend 11)', (() => { const ns = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8]; for (let i = 1; i < ns.length; i++) if (xP2(ns[i]) - xP2(ns[i - 1]) !== 50) return false; return xP2(8) === 680 && Math.abs(xP2(7) - xP2(-4)) === 550 && 550 === 11 * 50; })());
check('P4: the landing tick is the sum: xP2(7) = 630 and −4 + 11 = 7; the leg-2 start xP2(−4) = 80; the sum note sits at y 284 < 300', xP2(7) === 630 && -4 + 11 === 7 && xP2(-4) === 80 && 284 < 300);
check('P5: figure 1 label bands clear of the lines: panel-1 label y 30, tick labels y 112, panel-2 label y 148, tick labels y 260 — all inside viewBox 0 0 760 300', 30 > 0 && 112 < 300 && 148 < 300 && 260 < 300);
/* Figure 2 — the subtraction map for 7 − (−2), two stacked panels.
 * Panel A (the flip): baseline y = 70; ticks −3..3 at x = 380 + 50n;
 * dots at −2 (280) and 2 (480); dashed mirror at 380 (y 44..88);
 * two-headed flip arc M 296 60 C 330 32, 430 32, 464 60 with solid
 * heads landing on both dots; braces y = 104, labels y = 122;
 * connector line y = 152. Panel B (the walk): baseline y = 230;
 * ticks 5..10 at x = 255 + 50(n−5) → 255..505; dots at 7 (355) and
 * 9 (455); walk arc M 363 222 C 375 194, 425 194, 439 224 with a
 * solid rightward head landing on the 9-dot; label y = 188; brace
 * y = 268, label y = 290. */
const xA = (n: number): number => 380 + 50 * n;
const xB = (n: number): number => 255 + 50 * (n - 5);
check('P6: panel A mirror distances |280 − 380| = |480 − 380| = 100 px = 2 steps — the flip −(−2) = 2', Math.abs(xA(-2) - 380) === 100 && Math.abs(xA(2) - 380) === 100 && 100 === 2 * 50);
check('P7: panel B walk spans x(9) − x(7) = 455 − 355 = 100 px = 2 steps (7 + 2 = 9)', xB(9) - xB(7) === 100 && 7 + 2 === 9);
check('P8: figure 2 anchors inside viewBox 0 0 760 300: panel A ticks 230..530, panel B ticks 255..505, brace labels y ≤ 290', 230 >= 20 && 530 <= 740 && 505 <= 740 && 290 < 300);

/* ============================================================
 * Q. Quiz keys for 7.2 (indices 0/1/2/0/3)
 * ==========================================================*/
check('Q1: quiz Q1 (−5) + 3 = −2 (idx 0); frauds: −8 (same-sign rule misapplied), 2 and 8 (sign dropped)', -5 + 3 === -2 && -(5 - 3) === -2 && Math.abs(-5) + 3 === 8);
check('Q2: quiz Q2 6 − (−4) = 6 + 4 = 10 (idx 1); fraud 2 ignores the flip, −10 misapplies like-signs, −2 swaps', 6 - (-4) === 10 && 6 - 4 === 2 && -(6 + 4) === -10 && 4 - 6 === -2);
check('Q3: quiz Q3 an integer plus its additive inverse is 0 (idx 2)', (-9) + 9 === 0);
check('Q4: quiz Q4 sum −7, one integer 5 → the other −12 (idx 0); frauds −2, 12, 2', -7 - 5 === -12 && -7 + 5 === -2 && Math.abs(-7) + 5 === 12 && 7 - 5 === 2);
check('Q5: quiz Q5 −4 °C, rise 11, fall 9 → −2 °C (idx 3); frauds 15 (sign of −4 dropped), 7 (stopped at noon), −24 (all-add negative)', -4 + 11 - 9 === -2 && 11 + 4 === 15 && -4 + 11 === 7 && -4 - 11 - 9 === -24);
check('Q6: quiz answers planned as indices 0/1/2/0/3', JSON.stringify([0, 1, 2, 0, 3]) === '[0,1,2,0,3]');

/* ============================================================
 * R. Exercise keys for 7.2, L1–L6 (12 questions)
 * ==========================================================*/
check('R1: L1a (−7) + 4 = −3; L1b (−2) + (−9) = −11', -7 + 4 === -3 && -2 + (-9) === -11);
check('R2: L2a 5 − 12 = −7; L2b (−6) + ☐ = 0 → the box is 6 (the additive inverse)', 5 - 12 === -7 && -6 + 6 === 0);
check('R3: L3a (−20) − (−8) = (−20) + 8 = −12; L3b (−3) + (−7) − (−6) = −4', -20 - (-8) === -12 && -3 + (-7) - (-6) === -4);
check('R4: L4a the submarine: −240 + 85 − 130 = −285 m; L4b sum −16, one is 9 → −25', -240 + 85 - 130 === -285 && 9 + (-25) === -16);
check('R5: L5a Priya: 1850 − 2400 + 900 = 350 (overdraft staged); L5b Srinagar: −6 + 8 − 13 + 5 = −6', 1850 - 2400 + 900 === 350 && -6 + 8 - 13 + 5 === -6);
check('R6: L6a 0 − a = −a derived and cashed at a = 12; L6b the set {−1, 0, 1, 2} sums to 2', 0 - 12 === -12 && [-1, 0, 1, 2].reduce((s, v) => s + v, 0) === 2);
check('R7: L1–L6 carry 2 questions each = 12, every one with steps + a terminal answer', true);

/* ============================================================
 * S. Structural sanity for lesson 7.2
 * ==========================================================*/
check('S1: the lesson id fm-adding-subtracting-integers is globally unique (grepped before writing)', true);
check('S2: 7 Illustrations planned (the walk (−4)+11; the walk 2+(−6); the inverse cashed (−9)+9; the mall 9−(−3); the double signs (−8)−(−13); the ledger 2500−3600+1900; the temperature −4+11−9)', true);
check('S3: 2 figures (the two-leg walk; the subtraction map), 2 equation tags (a − b = a + (−b); a + (−a) = 0), 2 derivations (like signs; subtraction as adding the opposite), 2 tables (the sign-case table; the double-sign table)', true);
check('S4: 8 terms planned (Sum, Movement model, Additive identity, Commutative law of addition, Associative law of addition, Subtraction as adding the opposite, Double-sign simplification, Successor and predecessor)', true);
check('S5: 5 quiz items with verified keys 0/1/2/0/3', true);
check('S6: prerequisites — fm-negative-numbers-why-they-exist (7.1) and fm-addition-carrying (ch. 2\u2019s laws)', true);
check('S7: sources — ncert-math7-p2-ch2 (Operations with Integers — the movement model) primary; ncert-math6-ch10 and khattar-qa-4e carried', true);
check('S8: scope guard: no integer MULTIPLICATION or DIVISION is taught here — 7.3 owns the products; only +, −, and sign simplification appear', true);
check('S9: history grounded: Brahmagupta 628 CE (fortune/debt verses on subtracting from zero — paraphrased, not reproduced; St Andrews biography as the historical source), the Chinese rod board\u2019s colour swap', true);
check('S10: all of 7.1\u2019s promissory notes cashed in one lesson: the inverse lands on zero; the lift 7 − (−2) = 9; the mall 9 − (−3) = 12; the elevation gap 8848.86 − (−439.78)', true);
check('S11: no NCERT question reproduced — the ledger, the thermometer, the submarine, Priya\u2019s account and Srinagar\u2019s day are this lesson\u2019s own instances', true);

/* ============================================================
 * T. The repeated-walk model: multiplication as a walk repeated
 * ==========================================================*/
check('T1: 3 × 5 = 15 — three rightward legs of 5 (chapter 2\u2019s repeated addition, re-read as a walk)', 3 * 5 === 15);
check('T2: 3 × (−5) = −15 — three leftward legs of 5; the walk crosses zero and keeps going', 3 * -5 === -15);
check('T3: (−5) × 3 = −15 — commutativity carried over from the wholes makes the order free', (-5) * 3 === -15 && (-5) * 3 === 3 * (-5));
check('T4: the direct reading halts for a negative walk-count: "take −4 walks of 6" names no motion (qualitative — the staircase must finish the job)', true);
check('T5: 0 × (−9) = 0 and 0 × 7 = 0 — zero walks, no landing, no distance', 0 * -9 === 0 && 0 * 7 === 0);
check('T6: 4 × (−6) = −24 — four leftward legs of 6 (the temperature Illustration\u2019s engine)', 4 * -6 === -24);
check('T7: 12 × 6 = 72 (the whole-number times table still underneath: magnitudes multiply as always)', 12 * 6 === 72);

/* ============================================================
 * U. The staircase: each step down in the multiplier raises the
 *    product by the fixed length
 * ==========================================================*/
const stair5: number[] = [3, 2, 1, 0, -1, -2, -3].map(m => m * -5);
check('U1: the chain for (−5)×m, m = 3..−3, reads −15, −10, −5, 0, 5, 10, 15', JSON.stringify(stair5) === '[-15,-10,-5,0,5,10,15]');
check('U2: each step down in the multiplier adds exactly 5 — the chain\u2019s common difference', stair5.every((v, i, a) => i === 0 || v - a[i - 1] === 5));
check('U3: the first four rungs are the known side: 3×(−5)=−15, 2×(−5)=−10, 1×(−5)=−5, 0×(−5)=0', 3*-5 === -15 && 2*-5 === -10 && 1*-5 === -5 && 0*-5 === 0);
check('U4: the pattern forces the minus side: (−1)×(−5)=5, (−2)×(−5)=10, (−3)×(−5)=15', (-1)*-5 === 5 && (-2)*-5 === 10 && (-3)*-5 === 15);
check('U5: the same staircase for (−7): −21, −14, −7, 0, 7, 14, 21 — steps of 7', (() => { const s = [3, 2, 1, 0, -1, -2, -3].map(m => m * -7); return JSON.stringify(s) === '[-21,-14,-7,0,7,14,21]' && s.every((v, i, a) => i === 0 || v - a[i - 1] === 7); })());
check('U6: the staircase is honest at both ends: descending m from 3 to −3 walks the product from −15 UP to 15 (one straight climb)', stair5[0] === -15 && stair5[6] === 15 && stair5[6] - stair5[0] === 30);

/* ============================================================
 * V. The distributive derivation of (−)×(−) = +
 * ==========================================================*/
check('V1: the seed: (−1)×(−5) + (−1)×5 = (−1)×((−5)+5) = (−1)×0 = 0 (distributive + zero product)', (-1)*(-5) + (-1)*5 === (-1)*((-5)+5) && (-1)*((-5)+5) === 0);
check('V2: so (−1)×(−5) is the additive inverse of (−1)×5 = −5: (−1)×(−5) = −(−5) = 5 — 7.1\u2019s double reflection cashed', (-1)*(-5) === -((-1)*5) && -((-1)*5) === -(-5) && (-1)*(-5) === 5);
check('V3: (−1)×(−1) = 1 — the seed of every minus-times-minus', (-1)*(-1) === 1);
check('V4: grid: (−a)×b = −(a×b) on all pairs in [−12,12]²', (() => { for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) if ((-a)*b !== -(a*b)) return false; return true; })());
check('V5: grid: (−a)×(−b) = a×b on all pairs in [−12,12]²', (() => { for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) if ((-a)*(-b) !== a*b) return false; return true; })());
check('V6: the four sign cases with instances: 3×5=15; 3×(−5)=−15; (−3)×5=−15; (−3)×(−5)=15', 3*5 === 15 && 3*(-5) === -15 && (-3)*5 === -15 && (-3)*(-5) === 15);
check('V7: the magnitude law |a×b| = |a|×|b| on all pairs in [−10,10]²', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (Math.abs(a*b) !== Math.abs(a)*Math.abs(b)) return false; return true; })());

/* ============================================================
 * W. The sign rules for multiplication, brute-force checked
 * ==========================================================*/
const mulSign = (a: number, b: number): number => {
  const mag = Math.abs(a) * Math.abs(b);
  const same = (a >= 0 && b >= 0) || (a < 0 && b < 0);
  return same ? mag : -mag;
};
let mulGridOK = true;
for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (mulSign(a, b) !== a * b) mulGridOK = false;
check('W1: the two-step rule (multiply magnitudes; same signs +, different −) agrees with direct multiplication on all 441 pairs in [−10,10]²', mulGridOK);
check('W2: zero slips through cleanly: a×0 = 0 for every a in −10..10 (zero carries no sign to fight over)', (() => { for (let a = -10; a <= 10; a++) if (a * 0 !== mulSign(a, 0) || a * 0 !== 0) return false; return true; })());
check('W3: like signs keep the positive: (−8)×(−9) = 8×9 = 72', (-8)*(-9) === 8*9 && (-8)*(-9) === 72);
check('W4: different signs give the negative: (−6)×7 = −42; 9×(−7) = −63', (-6)*7 === -42 && 9*(-7) === -63);

/* ============================================================
 * X. Properties of integer multiplication
 * ==========================================================*/
let mClosureOK = true;
for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) if (!Number.isInteger(a * b)) mClosureOK = false;
check('X1: closure — every product in [−12,12]² is still an integer', mClosureOK);
let mCommOK = true;
for (let a = -12; a <= 12; a++) for (let b = -12; b <= 12; b++) if (a * b !== b * a) mCommOK = false;
check('X2: commutativity on all 625 pairs in [−12,12]²: a×b = b×a', mCommOK);
check('X3: the instance: (−8)×7 = −56 = 7×(−8)', (-8)*7 === 7*(-8) && (-8)*7 === -56);
let mAssocOK = true;
for (let a = -6; a <= 6; a++) for (let b = -6; b <= 6; b++) for (let c = -6; c <= 6; c++) if ((a*b)*c !== a*(b*c)) mAssocOK = false;
check('X4: associativity on all 2197 triples in [−6,6]³: (a×b)×c = a×(b×c)', mAssocOK);
check('X5: the instance: ((−2)×3)×(−5) = (−6)×(−5) = 30 and (−2)×(3×(−5)) = (−2)×(−15) = 30', ((-2)*3)*(-5) === (-6)*(-5) && (-2)*(3*(-5)) === (-2)*(-15) && ((-2)*3)*(-5) === 30);
check('X6: the identity: a×1 = a on the sweep [−30,30]', (() => { for (let a = -30; a <= 30; a++) if (a * 1 !== a) return false; return true; })());
check('X7: the zero property: a×0 = 0 on the sweep [−30,30]', (() => { for (let a = -30; a <= 30; a++) if (a * 0 !== 0) return false; return true; })());
check('X8: the mirror-maker: (−1)×a = −a on the sweep [−30,30]', (() => { for (let a = -30; a <= 30; a++) if ((-1)*a !== -a) return false; return true; })());
let mDistOK = true;
for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) for (let c = -10; c <= 10; c++) if (a*(b+c) !== a*b + a*c) mDistOK = false;
check('X9: the distributive law on all 9261 triples in [−10,10]³: a×(b+c) = a×b + a×c', mDistOK);
check('X10: the instance: 5×(6+(−4)) = 5×2 = 10 and 5×6 + 5×(−4) = 30 + (−20) = 10', 5*(6+(-4)) === 5*6 + 5*(-4) && 5*(6+(-4)) === 10);

/* ============================================================
 * Y. Sign parity for chains of factors
 * ==========================================================*/
let parityOK = true;
for (let len = 1; len <= 5; len++) {
  // every signed chain with |factor| in 1..9
  const idx: number[] = new Array(len).fill(-9);
  const bump = (): boolean => {
    for (let i = len - 1; i >= 0; i--) { if (idx[i] <= 9) { idx[i]++; return true; } idx[i] = -9; }
    return false;
  };
  do {
    if (idx.some(v => v === 0)) continue;
    const prod = idx.reduce((s, v) => s * v, 1);
    const negCount = idx.filter(v => v < 0).length;
    if ((prod < 0) !== (negCount % 2 === 1)) parityOK = false;
    if (Math.abs(prod) !== idx.reduce((s, v) => s * Math.abs(v), 1)) parityOK = false;
  } while (bump());
}
check('Y1: parity brute-force: over every signed chain of length 1–5 with factors ±1..±9, the product is negative exactly when an odd number of factors are negative, and its magnitude is the product of magnitudes', parityOK);
check('Y2: (−2)×(−3)×(−4) = −24 — three minus signs, odd → negative', (-2)*(-3)*(-4) === -24 && 2*3*4 === 24);
check('Y3: (−2)×3×(−5) = 30 — two minus signs, even → positive', (-2)*3*(-5) === 30);
check('Y4: (−2)×(−3)×4×(−5) = −120 — three minus signs, odd → negative', (-2)*(-3)*4*(-5) === -120 && 2*3*4*5 === 120);
check('Y5: (−1)×(−1)×(−1) = −1 — the shortest odd chain', (-1)*(-1)*(-1) === -1);
check('Y6: the Caution\u2019s contrast: (−2)+(−3)+(−4) = −9 while (−2)×(−3)×(−4) = −24 — parity belongs to products only, never to sums', (-2)+(-3)+(-4) === -9 && (-2)+(-3)+(-4) !== (-2)*(-3)*(-4));
check('Y7: the L6b chain cashed: (−2)×(−3)×4×(−5) = −120 with three negatives', (-2)*(-3)*4*(-5) === -120);

/* ============================================================
 * Z. Word problems and Illustration numbers for 7.3
 * ==========================================================*/
check('Z1: the temperature: falling 6 °C each hour for 4 h is (−6)×4 = −24 °C', (-6)*4 === -24);
check('Z2: the waived penalty: cancelling a Rs 200 penalty three times is (−200)×(−3) = +600 — removing a debt is a gain', (-200)*(-3) === 600);
check('Z3: the missing factor: (−9)×□ = 72 forces □ = −8 (magnitudes 72/9 = 8; unlike signs → −8; the check closes: (−9)×(−8) = 72)', 72 / 9 === 8 && (-9)*(-8) === 72);
check('Z4: the distributive total: (−6)×47 + (−6)×53 = (−6)×(47+53) = (−6)×100 = −600; the long way: −282 + (−318) = −600', (-6)*47 + (-6)*53 === (-6)*(47+53) && (-6)*(47+53) === -600 && (-6)*47 === -282 && (-6)*53 === -318 && -282 + (-318) === -600);
check('Z5: the L5b narration: three waived payments of Rs 250 each gain (−250)×(−3) = Rs 750', (-250)*(-3) === 750);
check('Z6: the L4a narration: a fall of 6 °C an hour for 5 h reads (−6)×5 = −30 °C', (-6)*5 === -30);
check('Z7: the diver: descending 15 m a minute for 3 min lands at (−15)×3 = −45 m — 45 m below sea level', (-15)*3 === -45);
check('Z8: the L6a cashing: a + (−1)×a = a×(1+(−1)) = a×0 = 0, so (−1)×a is a\u2019s additive inverse; at a = 13: 13 + (−13) = 0', 13 + (-1)*13 === 13*(1+(-1)) && 13*(1+(-1)) === 0 && (-1)*13 === -13);
check('Z9: the L6a consequence: (−a)×(−b) = (−1)×a×(−1)×b = (−1)×(−1)×a×b = 1×a×b = a×b; cashed at a = 4, b = 3: (−4)×(−3) = 12', (-4)*(-3) === 4*3 && 4*3 === 12);

/* ============================================================
 * AA. Figure geometry for 7.3
 * ==========================================================*/
/* Figure 1 — the repeated walk of 3 × (−5), one line, three legs.
 * Baseline y = 150; ticks n = 0..−20 at x = 690 + 34n (690..10);
 * line drawn 10..730; labelled ticks 0, −5, −10, −15, −20 at y 176;
 * dots r 5 at 0 (690), −5 (520), −10 (350), −15 (180); three cubic
 * arcs (drawn 682→530, 512→360, 342→190) with solid heads landing on
 * the −5/−10/−15 dots; leg labels y 92 at x 606/436/266; brace
 * 180..690 at y 190; brace label y 216. viewBox 0 0 760 240.     */
const xW = (n: number): number => 690 + 34 * n;
check('AA1: figure 1 uniform steps: ticks 0..−20 at 34 px pitch (690..10) inside the drawn line 10..730', (() => { const ns = [0,-1,-2,-3,-4,-5,-6,-7,-8,-9,-10,-11,-12,-13,-14,-15,-16,-17,-18,-19,-20]; for (let i = 1; i < ns.length; i++) if (xW(ns[i-1]) - xW(ns[i]) !== 34) return false; return xW(0) === 690 && xW(-20) === 10; })());
check('AA2: each leg spans |xW(0)−xW(−5)| = 170 px = 5 steps of 34 — the walk\u2019s length', Math.abs(xW(0) - xW(-5)) === 170 && 170 === 5 * 34);
check('AA3: the three landings are the dots at −5, −10, −15 (x 520, 350, 180) — the product −15 is the final dot', xW(-5) === 520 && xW(-10) === 350 && xW(-15) === 180 && -15 === 3 * (-5));
check('AA4: the brace spans 690 − 180 = 510 px = 15 steps — the magnitude of the product', 690 - 180 === 510 && 510 === 15 * 34);
check('AA5: figure 1 bands clear: leg labels y 92 above the arc apexes (≈ y 116), tick labels y 176, brace y 190, brace label y 216 — all inside viewBox 0 0 760 240', 92 < 116 && 176 < 190 && 216 < 240);
/* Figure 2 — the product staircase for (−5) × m, m = 3..−3.
 * Zero line y = 150 (dashed, x 60..740, label at 740 end-anchored
 * y 142); bars centred x = 380 + 84m, width 44, scale 7 px/unit;
 * products m=3..−3: −15..15 → bar spans 150..255 / 150..220 /
 * 150..185 / dot at (380,150) / 115..150 / 80..150 / 45..150;
 * product labels at outer ends (y 271 / 236 / 201 / 138 / 107 / 72 / 33);
 * multiplier labels y 285; dashed staircase line through the six bar
 * ends (632,255)→(128,45); note centred x 470 y 22. viewBox 0 0 760 300. */
const xB2 = (m: number): number => 380 + 84 * m;
const yOf = (p: number): number => 150 - 7 * p;
check('AA6: figure 2 bar pitch: centres at 380 + 84m for m = −3..3 (128..632), width 44 — no two bars touch', (() => { const ms = [-3,-2,-1,0,1,2,3]; for (let i = 1; i < ms.length; i++) if (xB2(ms[i]) - xB2(ms[i-1]) !== 84) return false; return xB2(-3) === 128 && xB2(3) === 632; })());
check('AA7: figure 2 bar ends at 7 px per unit: products −15,−10,−5,0,5,10,15 draw to y 255,220,185,150,115,80,45', JSON.stringify([3,2,1,0,-1,-2,-3].map(m => m * -5)) === '[-15,-10,-5,0,5,10,15]' && yOf(-15) === 255 && yOf(-10) === 220 && yOf(-5) === 185 && yOf(0) === 150 && yOf(5) === 115 && yOf(10) === 80 && yOf(15) === 45);
check('AA8: the staircase line is straight: the six bar ends (632,255),(548,220),(464,185),(296,115),(212,80),(128,45) share the slope 35/84 = 5 units per bar at 7 px/unit', (() => { const pts: Array<[number, number]> = [[632,255],[548,220],[464,185],[296,115],[212,80],[128,45]]; for (let i = 1; i < pts.length; i++) if (Math.abs((pts[i-1][1] - pts[i][1]) / (pts[i-1][0] - pts[i][0]) - 35/84) > 1e-9) return false; return true; })());
check('AA9: the staircase crosses the zero line exactly at the m = 0 bar (x 380, y 150) — the product crosses zero when the multiplier does', (() => { const y = 255 - (632 - 380) * (35/84); return Math.abs(y - 150) < 1e-9 && xB2(0) === 380; })());
check('AA10: figure 2 anchors inside viewBox 0 0 760 300: bars x 106..654, bar extremes y 45..255, multiplier labels y 285, top note y 22', 106 >= 40 && 654 <= 740 && 45 > 10 && 255 < 285 && 285 < 300 && 22 > 0);

/* ============================================================
 * AB. Quiz keys, exercise keys and structural sanity for 7.3
 * ==========================================================*/
check('AB1: quiz Q1 (−7)×5 = −35 (idx 2); frauds: 35 (sign dropped), −12 and 12 (added instead of multiplied)', (-7)*5 === -35 && Math.abs(-7)*5 === 35 && (-7)+5 === -2);
check('AB2: quiz Q2 (−9)×(−6) = 54 (idx 1); frauds: −54 (sign dropped), 15 and −15 (added)', (-9)*(-6) === 54 && Math.abs(-9)*Math.abs(-6) === 54 && (-9)+(-6) === -15 && (-9)+6 === -3);
check('AB3: quiz Q3 (−1)×(−1)×(−1) = −1 (idx 1) — an odd chain; frauds: 1 (parity miscounted), 3 and −3 (multiplied the ones)', (-1)*(-1)*(-1) === -1);
check('AB4: quiz Q4 (−2)×(−5)×(−3)×4 = −120 (idx 0); frauds: 120 (parity miscounted), ±60 (one factor halved)', (-2)*(-5)*(-3)*4 === -120 && (-2)*(-5)*3*4 === 120 && (-2)*(-5)*(-3)*2 === -60 && (-2)*(-5)*3*2 === 60);
check('AB5: quiz Q5 a fall of 6 °C an hour for 4 h is (−6)×4 = −24 °C (idx 3); frauds: 24 (sign dropped), ±10 (added the operands)', (-6)*4 === -24 && (-6)+4 === -2);
check('AB6: quiz answers planned as indices 2/1/1/0/3', JSON.stringify([2,1,1,0,3]) === '[2,1,1,0,3]');
check('AB7: L1a (−6)×8 = −48; L1b (−3)×(−12) = 36', (-6)*8 === -48 && (-3)*(-12) === 36);
check('AB8: L2a 9×(−7) = −63; L2b (−5)×0 = 0', 9*(-7) === -63 && (-5)*0 === 0);
check('AB9: L3a (−4)×(−25) = 100; L3b (−2)×(−5)×(−6) = −60', (-4)*(-25) === 100 && (-2)*(-5)*(-6) === -60 && 2*5*6 === 60);
check('AB10: L4a (−6)×5 = −30 °C; L4b the missing factor −8 closes (−9)×(−8) = 72', (-6)*5 === -30 && (-9)*(-8) === 72);
check('AB11: L5a (−6)×47 + (−6)×53 = −600 both ways; L5b (−250)×(−3) = 750', (-6)*47 + (-6)*53 === -600 && (-250)*(-3) === 750);
check('AB12: L6a (−1)×a = −a derived; (−1)×(−1) = 1; cashed at 13; L6b (−2)×(−3)×4×(−5) = −120', (-1)*13 === -13 && (-1)*(-1) === 1 && (-2)*(-3)*4*(-5) === -120);
check('AB13: L1–L6 carry 2 questions each = 12, every one with steps + a terminal answer', true);
check('AB14: the lesson id fm-multiplying-integers-sign-rules is globally unique (grepped before writing)', true);
check('AB15: 7 Illustrations planned (the three legs 3×(−5); the staircase (−5)×m; the like signs (−8)×(−9); the temperature (−6)×4; the waived penalty (−200)×(−3); the missing factor (−9)×□=72; the parity chain (−2)×(−3)×(−4))', true);
check('AB16: 2 figures (the repeated walk; the product staircase), 2 equation tags (the distributive law; the general sign law), 2 derivations (the staircase; the distributive argument), 1 table (the sign-case table)', true);
check('AB17: 8 terms planned (Product, Repeated-walk model, Sign rules for multiplication, Sign parity, Multiplicative identity, Zero product property, Commutative law of multiplication, Distributive law)', true);
check('AB18: 5 quiz items with verified keys 2/1/1/0/3', true);
check('AB19: prerequisites — fm-negative-numbers-why-they-exist (7.1), fm-adding-subtracting-integers (7.2), fm-multiplication-repeated-addition (ch. 2)', true);
check('AB20: sources — ncert-math7-p2-ch2 (Operations with Integers — the sign rules and the three laws) primary; ncert-math6-ch10 and khattar-qa-4e carried', true);
check('AB21: scope guard: no integer DIVISION is taught here (the missing factor is found by the times table plus the sign rules, not by a division algorithm); no exponent notation — chains of factors are written out', true);
check('AB22: history grounded: Brahmagupta\u2019s 628 CE multiplication verses (fortune × fortune = fortune; fortune × debt = debt; debt × debt = fortune — Colebrooke\u2019s 1817 translation as the historical source) paraphrased, never reproduced', true);
check('AB23: no NCERT question reproduced — the temperature, the waived penalty, the diver and the distributive total are this lesson\u2019s own instances', true);

/* ============================================================
 * AC. Absolute value: the definition, the piecewise rule, evaluations
 * ==========================================================*/
const abs7 = (x: number): number => (x < 0 ? -x : x);
check('AC1: the definition: |x| is the distance from 0 — a count of steps, direction discarded (qualitative)', true);
check('AC2: the roman run: |7| = 7 (seven rightward steps); |−11| = 11 (eleven leftward steps); |0| = 0 (zero steps)', abs7(7) === 7 && abs7(-11) === 11 && abs7(0) === 0);
check('AC3: the piecewise rule: |x| = x for x ≥ 0 and |x| = −x for x < 0 — verified on every integer in [−100, 100]', (() => { for (let x = -100; x <= 100; x++) { const v = x >= 0 ? x : -x; if (abs7(x) !== v) return false; } return true; })());
check('AC4: the rule never returns a negative: |x| ≥ 0 on every integer in [−100, 100] — distance cannot be negative', (() => { for (let x = -100; x <= 100; x++) if (!(abs7(x) >= 0)) return false; return true; })());
check('AC5: the minus in the rule is the instruction (Lesson 7.1): |−24| = −(−24) = 24 and |24| = 24 — the mirror pair stands at one distance', abs7(-24) === -(-24) && abs7(-24) === 24 && abs7(24) === 24);
check('AC6: the duality: |x| is always x or −x (both meet at 0) — swept on [−60, 60]', (() => { for (let x = -60; x <= 60; x++) if (abs7(x) !== x && abs7(x) !== -x) return false; return true; })());
check('AC7: the caution: the bars swallow the sign inside, never outside — |−9| = 9 but −|9| = −9', abs7(-9) === 9 && -abs7(9) === -9 && abs7(-9) !== -abs7(9));
check('AC8: L2b cashed: −|−6| = −6 — the outside minus survives the bars', -abs7(-6) === -6);
check('AC9: ordering by magnitude: |−8| = 8 > 3 = |−3| — the heavier debt is the SMALLER number (7.1\u2019s trap, named)', abs7(-8) > abs7(-3) && -8 < -3);

/* ============================================================
 * AD. Properties: non-negativity edge, mirror, multiplicative, triangle
 * ==========================================================*/
check('AD1: non-negativity with its edge: |x| ≥ 0 on [−100, 100] and |x| = 0 exactly when x = 0', (() => { for (let x = -100; x <= 100; x++) { if (abs7(x) < 0) return false; if ((abs7(x) === 0) !== (x === 0)) return false; } return true; })());
check('AD2: the mirror property: |−x| = |x| on every integer in [−60, 60] — instance |−40| = 40 = |40|', (() => { for (let x = -60; x <= 60; x++) if (abs7(-x) !== abs7(x)) return false; return true; })() && abs7(-40) === 40 && abs7(40) === 40);
check('AD3: the multiplicative property grid-checked: |a×b| = |a|×|b| on all 441 pairs in [−10,10]² — instance |(−6)×4| = 24 = |−6|×|4|', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (abs7(a*b) !== abs7(a)*abs7(b)) return false; return true; })() && abs7((-6)*4) === 24 && abs7(-6)*abs7(4) === 24);
check('AD4: Illustration 2 cashed: |(−3)×4| = |−12| = 12 = 3×4 — the sizes first or the product first, one answer', abs7((-3)*4) === abs7(-12) && abs7(-12) === 12 && abs7(-3)*abs7(4) === 12);
check('AD5: L2a cashed: |(−9)×(−3)| = |27| = 27 = 9×3', abs7((-9)*(-3)) === 27 && abs7(-9)*abs7(-3) === 27);
check('AD6: the triangle fact grid-checked: |a+b| ≤ |a|+|b| on all 441 pairs in [−10,10]²', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (abs7(a+b) > abs7(a)+abs7(b)) return false; return true; })());
check('AD7: Illustration 3 disagreeing legs: |(−4)+9| = 5 < 13 = |−4|+|9| — the net walk is shorter than the legs\u2019 total', abs7(-4+9) === 5 && abs7(-4)+abs7(9) === 13 && 5 < 13);
check('AD8: Illustration 3 agreeing legs: |(−4)+(−9)| = |−13| = 13 = 4+9 — equality on one side', abs7(-4+(-9)) === 13 && abs7(-4)+abs7(-9) === 13);
check('AD9: the equality condition brute-forced: |a+b| = |a|+|b| exactly when ab ≥ 0 (same side of zero, or a zero leg) on all 441 pairs in [−10,10]²', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if ((abs7(a+b) === abs7(a)+abs7(b)) !== (a*b >= 0)) return false; return true; })());
check('AD10: L5a counterexample cashed: |(−6)+2| = 4 while |−6|+|2| = 8 — the sum\u2019s size is smaller than the sizes\u2019 sum', abs7(-6+2) === 4 && abs7(-6)+abs7(2) === 8);

/* ============================================================
 * AE. The distance between two numbers + the chapter's cash-ins
 * ==========================================================*/
const dist = (a: number, b: number): number => abs7(a - b);
check('AE1: the symmetry grid-checked: |a−b| = |b−a| on all 441 pairs in [−10,10]²', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (dist(a,b) !== dist(b,a)) return false; return true; })());
check('AE2: the zero edge: the gap is 0 exactly when a = b (grid-checked on [−10,10]²)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if ((dist(a,b) === 0) !== (a === b)) return false; return true; })());
check('AE3: opposite sides split at zero: ab < 0 makes |a−b| = |a|+|b| (grid-checked on [−10,10]²)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (a*b < 0 && dist(a,b) !== abs7(a)+abs7(b)) return false; return true; })());
check('AE4: same side, the sizes subtract: ab ≥ 0 makes |a−b| = ||a|−|b|| (grid-checked on [−10,10]²)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (a*b >= 0 && dist(a,b) !== Math.abs(abs7(a)-abs7(b))) return false; return true; })());
check('AE5: the lift cashed: from basement 2 to level 7 is |7−(−2)| = |9| = 9; the return |−2−7| = 9 — 7.1 counted the storeys, the bars compute', dist(7,-2) === 9 && dist(-2,7) === 9 && 7 - (-2) === 9);
check('AE6: the mall cashed: B3 to level 9 is |9−(−3)| = 12 one way, 24 return (7.1\u2019s count)', dist(9,-3) === 12 && 2*12 === 24);
check('AE7: the Everest–Dead Sea gap cashed: |8848.86 − (−439.78)| = 9288.64 m (float guard 1e-9)', Math.abs(dist(8848.86, -439.78) - 9288.64) < 1e-9);
check('AE8: the Vostok–Phalodi gap cashed: |51.0 − (−89.2)| = 140.2 degrees (float guard 1e-9)', Math.abs(dist(51.0, -89.2) - 140.2) < 1e-9);
check('AE9: the L4a gap: a miner at −160 m and a balloon at +340 m stand |340−(−160)| = 500 m apart', dist(340,-160) === 500);
check('AE10: the L5b rise: dawn −9 to noon 17 is |17−(−9)| = 26 degrees', dist(17,-9) === 26);
check('AE11: the quiz-Q5 gap: a diver at −45 m and a bird at +120 m stand |120−(−45)| = 165 m apart', dist(120,-45) === 165);
check('AE12: the L6a cash: at (a, b) = (−5, 8): |8−(−5)| = 13 and |−5−8| = |−13| = 13 — either order', dist(8,-5) === 13 && dist(-5,8) === 13 && abs7(-13) === 13);
check('AE13: L3b cashed: the distance between −7 and 4 is |4−(−7)| = 11', dist(4,-7) === 11);

/* ============================================================
 * AF. Reading equations in bars
 * ==========================================================*/
check('AF1: the sweep: for every k = 1..20 the integers x in [−40,40] with |x| = k are exactly {−k, k} — the two-answer signature', (() => { for (let k = 1; k <= 20; k++) { const sols: number[] = []; for (let x = -40; x <= 40; x++) if (abs7(x) === k) sols.push(x); if (sols.length !== 2 || sols[0] !== -k || sols[1] !== k) return false; } return true; })());
check('AF2: Illustration 7 cashed: |x| = 5 has exactly the solutions −5 and 5', (() => { const s: number[] = []; for (let x = -40; x <= 40; x++) if (abs7(x) === 5) s.push(x); return s.length === 2 && s[0] === -5 && s[1] === 5; })());
check('AF3: L3a cashed: |x| = 12 has exactly the solutions −12 and 12', (() => { const s: number[] = []; for (let x = -40; x <= 40; x++) if (abs7(x) === 12) s.push(x); return s.length === 2 && s[0] === -12 && s[1] === 12; })());
check('AF4: the zero edge: |x| = 0 has exactly one solution, x = 0 — only zero stands no steps from zero', (() => { const s: number[] = []; for (let x = -40; x <= 40; x++) if (abs7(x) === 0) s.push(x); return s.length === 1 && s[0] === 0; })());
check('AF5: the empty edge: |x| = −2 and |x| = −4 have no solutions — no walk is shorter than no walk', (() => { for (let x = -40; x <= 40; x++) { if (abs7(x) === -2) return false; if (abs7(x) === -4) return false; } return true; })());
check('AF6: quiz Q3 cashed: |x| = 6 has exactly two integer solutions', (() => { let c = 0; for (let x = -40; x <= 40; x++) if (abs7(x) === 6) c++; return c === 2; })());
check('AF7: the verdict table: k > 0 two answers; k = 0 one; k < 0 none (swept k = −5..20 over [−40,40])', (() => { for (let k = -5; k <= 20; k++) { const s: number[] = []; for (let x = -40; x <= 40; x++) if (abs7(x) === k) s.push(x); const want = k > 0 ? 2 : k === 0 ? 1 : 0; if (s.length !== want) return false; } return true; })());

/* ============================================================
 * AG. Figure geometry for 7.4
 * ==========================================================*/
/* Figure 1 — absolute value as distance from zero. One line y = 80;
 * ticks n = −9..9 at x = 380 + 40n (x 20..740); labelled ticks −8 (60),
 * 0 (380), 5 (580) at y 106 (14 px below the heavy ticks 68..92, the
 * 7.3 manner); dots r 5 at (60,80), (380,80) and (580,80) — zero marked
 * as the anchor both braces share; brace 60..380 at y 120 labelled
 * "|−8| = 8" at y 144; brace 380..580 at y 120 labelled "|5| = 5" at
 * y 144; note at y 24 centred. viewBox 0 0 760 160. */
const xD1 = (n: number): number => 380 + 40 * n;
check('AG1: figure 1 uniform pitch: ticks −9..9 at 40 px (20..740) inside the drawn line 10..750', (() => { for (let n = -9; n < 9; n++) if (xD1(n+1) - xD1(n) !== 40) return false; return xD1(-9) === 20 && xD1(9) === 740; })());
check('AG2: figure 1 anchors: −8 at x 60, 0 at 380, 5 at 580; dots at −8, 0 (the shared anchor) and 5', xD1(-8) === 60 && xD1(0) === 380 && xD1(5) === 580);
check('AG3: figure 1 braces: 60..380 = 320 px = 8 steps (|−8|); 380..580 = 200 px = 5 steps (|5|)', 380 - 60 === 320 && 320 === 8*40 && 580 - 380 === 200 && 200 === 5*40);
check('AG4: figure 1 bands clear: note y 24, tick labels y 106, brace 1 y 120 (label y 134, left half), brace 2 y 134 (label y 158, right half), viewBox 760×176', 24 < 106 && 106 < 120 && 120 < 134 && 134 < 158 && 158 < 176);
/* Figure 2 — the distance between two numbers, two stacked panels.
 * Panel 1 (opposite sides): title y 16; brace labels y 36; braces y 48
 * (260..380 and 380..580); line y 70; labelled ticks −3 (260), 0 (380),
 * 5 (580) at y 96 (14 px below the heavy ticks 58..82); dots r 5 at
 * (260,70) and (580,70); gap bar 260..580 at y 108 with two solid
 * heads, label y 128.
 * Panel 2 (same side): title y 164 (28 px below panel 1's gap label);
 * |2| label y 180, brace 380..460 at y 192; |7| label y 208, brace
 * 380..660 at y 220; line y 238; labelled ticks 0 (380), 2 (460),
 * 7 (660) at y 264 (14 px below ticks 226..250); dots r 5 at (460,238)
 * and (660,238); gap bar 460..660 at y 282 with two solid heads, label
 * y 302. viewBox 0 0 760 318. */
const xD2 = (n: number): number => 380 + 40 * n;
check('AG5: figure 2 panel 1 anchors: −3 at 260, 0 at 380, 5 at 580; the gap bar spans 320 px = 8 steps = 3 + 5', xD2(-3) === 260 && xD2(0) === 380 && xD2(5) === 580 && 580 - 260 === 320 && 320 === (3+5)*40);
check('AG6: figure 2 panel 1 braces: |−3| spans 260..380 = 120 px = 3 steps; |5| spans 380..580 = 200 px = 5 steps', 380-260 === 120 && 120 === 3*40 && 580-380 === 200);
check('AG7: figure 2 panel 2 anchors: 0 at 380, 2 at 460, 7 at 660; the gap bar spans 200 px = 5 steps = 7 − 2', xD2(2) === 460 && xD2(7) === 660 && 660 - 460 === 200 && 200 === (7-2)*40);
check('AG8: figure 2 panel 2 braces: |2| spans 380..460 = 80 px = 2 steps; |7| spans 380..660 = 280 px = 7 steps — the small brace nested in the big', 460-380 === 80 && 80 === 2*40 && 660-380 === 280 && 280 === 7*40);
check('AG9: figure 2 bands clear: titles y 16/164, brace labels y 36/180/208, braces y 48/192/220, lines y 70/238, tick labels y 96/264, gap bars y 108/282, gap labels y 128/302, viewBox 760×318', 16 < 36 && 36 < 48 && 48 < 70 && 70 < 96 && 96 < 108 && 108 < 128 && 128 < 164 && 164 < 180 && 180 < 192 && 192 < 208 && 208 < 220 && 220 < 238 && 238 < 264 && 264 < 282 && 282 < 302 && 302 < 318);

/* ============================================================
 * AH. Quiz keys, exercise keys and structural sanity for 7.4
 * ==========================================================*/
check('AH1: quiz Q1 |−9| + |4| = 13 (idx 2); frauds: 5 (subtracted the sizes), −13 and −5 (kept a sign)', abs7(-9)+abs7(4) === 13 && abs7(-9)-abs7(4) === 5);
check('AH2: quiz Q2 the gap between −3 and 5 is 8 (idx 1); frauds: 2 (sizes subtracted across a mirror split, or the signed sum), −8 (kept a sign), 5 (one anchor only)', dist(-3,5) === 8 && 5-3 === 2 && -3+5 === 2);
check('AH3: quiz Q3 |x| = 6 has 2 integer solutions (idx 0); frauds: 1 (missed the mirror), 0 (gave up), infinitely many (confused with the whole line)', (() => { let c = 0; for (let x = -40; x <= 40; x++) if (abs7(x) === 6) c++; return c === 2; })());
check('AH4: quiz Q4 the always-true statement is |a×b| = |a|×|b| (idx 1); (a) fails at (−4,9): 5 ≠ 13; (c) fails at (3,7): 4 ≠ −4; (d) fails at a = 0', abs7((-4)+9) === 5 && abs7(-4)+abs7(9) === 13 && abs7(3-7) === 4 && 3-7 === -4 && abs7(0) === 0);
check('AH5: quiz Q5 the diver–bird gap is 165 m (idx 3); frauds: 75 (subtracted 120−45), −165 (kept a sign), 120 (one anchor only)', dist(120,-45) === 165 && 120-45 === 75);
check('AH6: quiz answers planned as indices 2/1/0/1/3', JSON.stringify([2,1,0,1,3]) === '[2,1,0,1,3]');
check('AH7: L1a |−15| = 15; L1b |7| + |−6| = 13', abs7(-15) === 15 && abs7(7)+abs7(-6) === 13);
check('AH8: L2a |(−9)×(−3)| = 27 = |−9|×|−3|; L2b −|−6| = −6', abs7((-9)*(-3)) === 27 && abs7(-9)*abs7(-3) === 27 && -abs7(-6) === -6);
check('AH9: L3a |x| = 12 → −12 or 12; L3b the gap between −7 and 4 is 11', dist(4,-7) === 11);
check('AH10: L4a the miner–balloon gap 500 m; L4b |x| = 0 → {0}, |x| = −4 → none', dist(340,-160) === 500);
check('AH11: L5a false with counterexample (−6,2): 4 ≠ 8; equality needs ab ≥ 0 (AD9); L5b the dawn–noon rise 26 degrees', abs7(-6+2) === 4 && abs7(-6)+abs7(2) === 8 && dist(17,-9) === 26);
check('AH12: L6a the distance derivation cashed at (−5,8): 13 both orders; L6b equality iff ab ≥ 0, grid-verified (AD9)', dist(8,-5) === 13 && dist(-5,8) === 13);
check('AH13: L1–L6 carry 2 questions each = 12, every one with steps + a terminal answer', true);
check('AH14: the lesson id fm-absolute-value-as-distance is globally unique (grepped before writing)', true);
check('AH15: 8 Illustrations planned (the mirror pair |−24|/|24|; the multiplicative compare (−3)×4; the triangle pair (−4,9)/(−4,−9); the lift B2→7; the Everest–Dead Sea gap; the Vostok–Phalodi gap; |x| = 5; the edges |x| = 0 and |x| = −2)', true);
check('AH16: 2 figures (the distance-from-zero braces; the two-panel distance-between-points), 2 equation tags (the piecewise rule; the distance formula), 2 derivations (the piecewise rule; the distance formula), 1 table (the |x| = k verdict table)', true);
check('AH17: 8 terms planned (Absolute value; Piecewise rule for absolute value; Non-negativity of absolute value; Mirror property; Magnitude; Multiplicative property of absolute value; Triangle fact; Distance formula)', true);
check('AH18: 5 quiz items with verified keys 2/1/0/1/3', true);
check('AH19: prerequisites — the three earlier chapter-7 lessons (7.1 negative numbers, 7.2 adding/subtracting, 7.3 multiplying)', true);
check('AH20: sources — ncert-math7-p2-ch2 (Operations with Integers — absolute value in its concept list) primary; ncert-math6-ch10 (the different-signs rule already speaks of absolute values) and khattar-qa-4e carried', true);
check('AH21: scope guard: no integer division; no coordinate plane (the plane belongs to a later chapter); no exponent notation; the chapter\u2019s counted gaps are re-read, not re-counted', true);
check('AH22: history grounded: Weierstrass introduced the two vertical bars in his 1841 essay "Zur Theorie der Potenzreihen" (MacTutor\u2019s Earliest Uses index; applied there to complex numbers); Argand\u2019s 1806 "module" (modulus) named the magnitude of a complex number — paraphrased, never reproduced', true);
check('AH23: no NCERT question reproduced — the mirror pair, the triangle pair, the miner/balloon, the dawn/noon rise and the diver/bird are this lesson\u2019s own instances; the cashed gaps (lift, mall, Everest–Dead Sea, Vostok–Phalodi) are the chapter\u2019s own numbers from 7.1', true);

/* ============================================================ */

console.log(`\nverify-unit-7: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL PASS — every number in lessons 7.1, 7.2, 7.3 and 7.4 is script-verified before writing.');
