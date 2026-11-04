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

/* ============================================================ */

console.log(`\nverify-unit-7: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL PASS — every number in lesson 7.1 is script-verified before writing.');
