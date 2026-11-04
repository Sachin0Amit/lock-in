/**
 * verify-unit-6.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 6 (Ratio, Rate and Proportion).
 *
 * Created 2026-11-04 (run 26) for lesson 6.1 "Ratio as a Comparison":
 * sections A–K verify every number of the ratio lesson — the difference-vs-
 * division comparison, the definition and its same-units law, simplest form
 * via the HCF machinery of ch. 3, equivalent ratios with the cross-product
 * test (ch. 4's licence), three-term (continued) ratios and the joint-HCF
 * subtlety, sharing a quantity in a given ratio with the one-part engine,
 * both figures' geometry and the quiz/exercise keys — BEFORE anything is
 * written into ch-06.ts.
 *
 * Extended 2026-11-04 (run 27) for lesson 6.2 "Rates and Unit Rates":
 * sections L–U verify every number of the rates lesson — the rate as a
 * ratio of different kinds with units riding, the unit rate as the
 * one-part engine, comparing rates by the same-way law (the bulk
 * illusion, the tie, the direction fraud), speed as the flagship rate,
 * the km/h ↔ m/s conversion law and its derivation, average speed and
 * the equal-weight fraud, the tank/typist rate-at-work instances, both
 * figures' geometry and the quiz/exercise keys — again BEFORE writing.
 *
 * Extended 2026-11-04 (run 29) for lesson 6.3 "Proportion and
 * Cross-Multiplication": sections V–AE verify every number of the
 * proportion lesson — the definition as an equality of two ratios (the
 * :: notation), extremes and means with the cross law (product of the
 * extremes = product of the means) and its two-direction derivation,
 * the test-and-fill engine in every seat, alternendo and invertendo,
 * continued proportion with the mean and third proportional, the
 * rate-line figure where every pair on the line is in proportion, the
 * word problems (tea, rice, recipe), both figures' geometry and the
 * quiz/exercise keys — again BEFORE writing.
 *
 * Extended 2026-11-04 (run 30) for lesson 6.4 "Direct and Inverse
 * Variation": sections AF–AP verify every number of the variation
 * lesson — the direct definition x/y = k (the rate line named), the
 * parking-table fraud (growing without agreeing), the direct engine
 * (bottles, truck, pole-shadow, bacteria), the inverse definition
 * xy = k (sweets, game show, spokes, periods), one journey's two
 * bindings (the 240 km line vs the constant product), the factor laws
 * proved from the constants, the recognition drill, the flip (inverse
 * problems as proportions, invertendo cashed), the work problems
 * (rewiring, machines, cattle, windows, boxes), both figures' geometry
 * and the quiz/exercise keys — again BEFORE writing.
 * Run: bun run scripts/verify-unit-6.ts   (exit 1 on any failure)
 */

// module marker: keeps this file's top-level names out of the global
// script scope shared with verify-unit-2/3/4/5.ts under tsc --noEmit
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

function hcf(a: number, b: number): number {
  let x = a, y = b;
  while (y !== 0) { const t = x % y; x = y; y = t; }
  return x;
}
function hcf3(a: number, b: number, c: number): number {
  return hcf(hcf(a, b), c);
}

/* ============================================================
 * A. Two ways to compare (opening scene)
 * ==========================================================*/
check('A1: 15 vs 5 — difference 10, but the ratio is 3 ("three times as many")', 15 - 5 === 10 && 15 / 5 === 3);
check('A2: 50 : 50 — difference 0 yet the ratio 1 : 1 says "equal"', 50 - 50 === 0 && 50 / 50 === 1);
check('A3: 10 vs 5 and 110 vs 105 — same difference 5, different ratios', 10 - 5 === 5 && 110 - 105 === 5);
check('A4: 10 : 5 = 2 : 1 but 110 : 105 = 22 : 21 — the ratio separates them', hcf(110, 105) === 5 && 110 / 5 === 22 && 105 / 5 === 21 && 10 / 5 === 2);
check('A5: difference-blind, ratio-sensitive: 2 ≠ 22/21', 2 !== 22 / 21);

/* ============================================================
 * B. The definition and the same-units law
 * ==========================================================*/
check('B1: Rs 5 : 50 paise → 500 : 50 → 10 : 1 (HCF 50)', hcf(500, 50) === 50 && 500 / 50 === 10);
check('B2: 15 kg : 210 g → 15,000 : 210 → 500 : 7 (HCF 30)', hcf(15000, 210) === 30 && 15000 / 30 === 500 && 210 / 30 === 7);
check('B3: 9 m : 27 cm → 900 : 27 → 100 : 3 (HCF 9)', hcf(900, 27) === 9);
check('B4: 30 days : 36 hours → 720 : 36 → 20 : 1 (HCF 36)', 30 * 24 === 720 && hcf(720, 36) === 36);
check('B5: 5 m : 80 cm → 500 : 80 → 25 : 4 (HCF 20)', hcf(500, 80) === 20);
check('B6: 2 kg : 400 g → 2000 : 400 → 5 : 1', hcf(2000, 400) === 400);
check('B7: girls 24, boys 16 in a class of 40 — ratio 3 : 2, fraction 3/5', 24 + 16 === 40 && hcf(24, 16) === 8 && 24 / 8 === 3 && 16 / 8 === 2 && 24 / 40 === 3 / 5);

/* ============================================================
 * C. Simplest form via the HCF machinery of ch. 3
 * ==========================================================*/
check('C1: HCF(24, 36) = 12 → 2 : 3', hcf(24, 36) === 12);
check('C2: Euclid on 91, 104: 104 = 1×91 + 13, 91 = 7×13 → HCF 13 → 7 : 8', 104 === 1 * 91 + 13 && 91 === 7 * 13 && hcf(91, 104) === 13 && 91 / 13 === 7 && 104 / 13 === 8);
check('C3: 150 : 60 → HCF 30 → 5 : 2', hcf(150, 60) === 30);
check('C4: 144 : 252 → HCF 36 → 4 : 7 (Euclid: 252=1×144+108, 144=1×108+36, 108=3×36)', 252 === 144 + 108 && 144 === 108 + 36 && 108 === 3 * 36 && hcf(144, 252) === 36 && 144 / 36 === 4 && 252 / 36 === 7);
check('C5: uniqueness — 2 : 3 is the only simplest name of 24 : 36 (HCF(2,3)=1)', hcf(2, 3) === 1);
check('C6: 0.75 : 1.25 → 75 : 125 → HCF 25 → 3 : 5', hcf(75, 125) === 25 && 75 / 25 === 3 && 125 / 25 === 5);
check('C7: 1.5 : 2.5 → 15 : 25 → 3 : 5 (HCF 5)', hcf(15, 25) === 5);
check('C8: 2/3 : 5/6 → ×6 → 4 : 5', (2 / 3) * 6 === 4 && (5 / 6) * 6 === 5);
check('C9: 3/4 : 9/16 → ×16 → 12 : 9 → 4 : 3 (HCF 3)', (3 / 4) * 16 === 12 && (9 / 16) * 16 === 9 && hcf(12, 9) === 3 && 12 / 3 === 4 && 9 / 3 === 3);

/* ============================================================
 * D. Equivalent ratios — the ch. 4 equivalence family returns
 * ==========================================================*/
check('D1: 3 : 5 = 6 : 10 (cross-products 30 = 30)', 3 * 10 === 30 && 5 * 6 === 30);
check('D2: 3 : 5 = 9 : 15 (45 = 45)', 3 * 15 === 45 && 5 * 9 === 45);
check('D3: 3 : 5 = 12 : 20 (60 = 60)', 3 * 20 === 60 && 5 * 12 === 60);
check('D4: fill the blank 3 : 5 = □ : 20 → 12', (20 / 5) * 3 === 12);
check('D5: fill the blank 3 : 5 = 18 : □ → 30', (18 / 3) * 5 === 30);
check('D6: 15 : 25 and 21 : 35 are equal — both are 3 : 5 (cross 525 = 525)', 15 * 35 === 525 && 25 * 21 === 525 && hcf(15, 25) === 5 && hcf(21, 35) === 7 && 15 / 5 === 3 && 21 / 7 === 3);
check('D7: 4 : 7 ≠ 5 : 9 (36 ≠ 35)', 4 * 9 === 36 && 7 * 5 === 35 && 4 * 9 !== 7 * 5);
check('D8: 18 : 30 → HCF 6 → 3 : 5', hcf(18, 30) === 6);

/* ============================================================
 * E. Three-term (continued) ratios
 * ==========================================================*/
check('E1: HCF(45, 60, 90) = 15 → 3 : 4 : 6', hcf3(45, 60, 90) === 15 && 45 / 15 === 3 && 60 / 15 === 4 && 90 / 15 === 6);
check('E2: HCF(6, 10, 15) = 1 — the triple is simplest while every pair reduces', hcf3(6, 10, 15) === 1 && hcf(6, 10) === 2 && hcf(10, 15) === 5 && hcf(6, 15) === 3);
check('E3: 120 : 150 : 210 → HCF 30 → 4 : 5 : 7', hcf3(120, 150, 210) === 30 && 120 / 30 === 4 && 150 / 30 === 5 && 210 / 30 === 7);
check('E4: A:B = 2:3, B:C = 6:7 → A:B:C = 4:6:7 (B wears lcm(3,6) = 6)', 3 * 2 === 6 && 2 * 2 === 4);
check('E5: the chain reads back: 4 : 6 = 2 : 3 and 6 : 7 unchanged', 4 * 3 === 12 && 6 * 2 === 12 && hcf(4, 6) === 2);

/* ============================================================
 * F. Sharing a quantity in a given ratio — the one-part engine
 * ==========================================================*/
check('F1: Rs 1,200 in 3 : 5 → 8 parts, one part 150, shares 450 / 750', 3 + 5 === 8 && 1200 / 8 === 150 && 3 * 150 === 450 && 5 * 150 === 750);
check('F2: the shares rebuild the whole: 450 + 750 = 1,200', 450 + 750 === 1200);
check('F3: the shares carry the ratio: 450 : 750 → HCF 150 → 3 : 5', hcf(450, 750) === 150);
check('F4: Rs 18,000 in 2 : 3 : 4 → 9 parts, one part 2,000 → 4,000 / 6,000 / 8,000', 2 + 3 + 4 === 9 && 18000 / 9 === 2000 && 2 * 2000 === 4000 && 3 * 2000 === 6000 && 4 * 2000 === 8000);
check('F5: the three-way shares sum to the whole: 18,000', 4000 + 6000 + 8000 === 18000);
check('F6: 3 : 5 with difference 120 → 2 parts = 120 → one part 60 → 180 and 300', 5 * 60 - 3 * 60 === 120 && 3 * 60 === 180 && 5 * 60 === 300);
check('F7: the difference check: 300 − 180 = 120 and 180 : 300 = 3 : 5', 300 - 180 === 120 && hcf(180, 300) === 60 && 180 / 60 === 3 && 300 / 60 === 5);
check('F8: fraction dress: A = 3/8 × 1,200 = 450; B = 5/8 × 1,200 = 750', (3 / 8) * 1200 === 450 && (5 / 8) * 1200 === 750);
check('F9: inverse: A got 450 = 3/8 of the total → total = 450 × 8/3 = 1,200', (450 * 8) / 3 === 1200);
check('F10: triangle angles in 2 : 3 : 4 → 9 parts, 180/9 = 20° → 40°, 60°, 80°', 180 / 9 === 20 && 2 * 20 === 40 && 3 * 20 === 60 && 4 * 20 === 80 && 40 + 60 + 80 === 180);
check('F11: alloy 320 g in 7 : 9 → 16 parts, one part 20 → 140 g / 180 g', 7 + 9 === 16 && 320 / 16 === 20 && 7 * 20 === 140 && 9 * 20 === 180 && 140 + 180 === 320);
check('F12: Rs 760 in 7 : 12 → 19 parts, one part 40 → 280 / 480', 7 + 12 === 19 && 760 / 19 === 40 && 7 * 40 === 280 && 12 * 40 === 480 && 280 + 480 === 760 && hcf(280, 480) === 40);

/* ============================================================
 * G. Figure 1 geometry — the sharing map (Rs 1,200 in 3 : 5)
 * bar x 60..700, y 110..170; 8 cells of 80 px; A 60..300, B 300..700
 * ==========================================================*/
check('G1: cell width 80 px uniform across the 8 parts', (700 - 60) / 8 === 80);
check('G2: A occupies 3 cells: 300 − 60 = 240 = 3 × 80', 300 - 60 === 3 * 80);
check('G3: B occupies 5 cells: 700 − 300 = 400 = 5 × 80', 700 - 300 === 5 * 80);
check('G4: the widths carry the ratio: 240 : 400 → HCF 80 → 3 : 5', hcf(240, 400) === 80 && 240 / 80 === 3 && 400 / 80 === 5);
check('G5: bracket rails sit above the bar (y 92 < 110) and labels above them (y 84)', 84 < 92 && 92 < 110);
check('G6: cell boundaries at x 60,140,220,300,380,460,540,620,700 — 9 rules', JSON.stringify([0,1,2,3,4,5,6,7,8].map(k => 60 + 80 * k)) === '[60,140,220,300,380,460,540,620,700]');

/* ============================================================
 * H. Figure 2 geometry — one ratio, many sizes (3 : 5 at ×1, ×2, ×3)
 * rows y 70/150/230; left group starts x 60, right starts x 340; pitch 24
 * ==========================================================*/
check('H1: row counts are 3+5, 6+10, 9+15 — the scaled family', JSON.stringify([[3,5],[6,10],[9,15]]) === '[[3,5],[6,10],[9,15]]');
check('H2: left group width 9 dots max: 60 + 8×24 = 252', 60 + 8 * 24 === 252);
check('H3: right group width 15 dots max: 340 + 14×24 = 676', 340 + 14 * 24 === 676);
check('H4: the widest row leaves an 88 px gap between groups (252 → 340)', 340 - 252 === 88);
check('H5: dashed divider at x 296 sits inside the gap', 252 < 296 && 296 < 340);
check('H6: right-side ratio labels start at x 696 and fit inside 760', 676 < 696 && 696 + 60 < 760);
check('H7: rows clear each other vertically (pitch 80 > 2×radius 14 + 20 label band)', 150 - 70 === 80 && 230 - 150 === 80);

/* ============================================================
 * I. Quiz keys (indices 2/1/3/2/0)
 * ==========================================================*/
check('I1: Q1 simplest form of 24 : 36 → intended option index 2 (2 : 3)', hcf(24, 36) === 12);
check('I2: Q1 distractors — 4:6 and 12:18 still reduce; 3:2 is inverted', hcf(4, 6) === 2 && hcf(12, 18) === 6 && 3 / 2 !== 2 / 3);
check('I3: Q2 5 m : 80 cm → intended index 1 (25 : 4); 1 : 16 is the no-conversion fraud', hcf(500, 80) === 20 && 5 / 80 === 1 / 16);
check('I4: Q3 3 : 5, difference 120 → larger 300 (index 3); 180 is the smaller', 5 * 60 === 300 && 3 * 60 === 180);
check('I5: Q3 distractors 200/240 come from wrong part counts of 120', 120 / 3 === 40 && 40 * 5 === 200 && 40 * 6 === 240);
check('I6: Q4 Rs 1,800 in 2:3:4 → Q = 600 (index 2); 400 = P, 800 = R', 1800 / 9 === 200 && 3 * 200 === 600 && 2 * 200 === 400 && 4 * 200 === 800);
check('I7: Q4 distractor 540 is the parts-as-ten fraud (1,800 × 3/10)', (3 / 10) * 1800 === 540);
check('I8: Q5 18 : 32 is NOT equivalent to 3 : 5 (96 ≠ 90) — index 0', 3 * 32 === 96 && 5 * 18 === 90 && 3 * 32 !== 5 * 18);
check('I9: Q5 the other three pass the cross-test', 3 * 15 === 5 * 9 && 3 * 20 === 5 * 12 && 3 * 25 === 5 * 15);
check('I10: quiz answers planned as indices 2/1/3/2/0', JSON.stringify([2, 1, 3, 2, 0]) === '[2,1,3,2,0]');

/* ============================================================
 * J. Exercise keys (12 questions, L1–L6)
 * ==========================================================*/
check('J1: L1 45 : 60 → HCF 15 → 3 : 4', hcf(45, 60) === 15);
check('J2: L1 1.8 : 2.7 → 18 : 27 → HCF 9 → 2 : 3', hcf(18, 27) === 9);
check('J3: L2 3 weeks : 18 days → 21 : 18 → 7 : 6', 3 * 7 === 21 && hcf(21, 18) === 3 && 21 / 3 === 7 && 18 / 3 === 6);
check('J4: L2 2 kg 500 g : 400 g → 2500 : 400 → 25 : 4', hcf(2500, 400) === 100 && 2500 / 100 === 25);
check('J5: L3 Rs 900 in 4 : 5 → 9 parts, 100 → 400 / 500', 900 / 9 === 100 && 4 * 100 === 400 && 5 * 100 === 500 && 400 + 500 === 900);
check('J6: L3 84 : 126 : 210 → HCF 42 → 2 : 3 : 5', hcf3(84, 126, 210) === 42 && 84 / 42 === 2 && 126 / 42 === 3 && 210 / 42 === 5);
check('J7: L4 sum 760 in 7 : 12 → 19 parts, 40 → 280 / 480', 7 + 12 === 19 && 760 / 19 === 40 && 280 + 480 === 760);
check('J8: L4 5 : 8 = 35 : 56 — cross-test 280 = 280', 35 === 5 * 7 && 8 * 7 === 56 && 5 * 56 === 280 && 8 * 35 === 280);
check('J9: L5 triangle 2 : 3 : 4 → 40°, 60°, 80° (same as F10)', 180 / 9 === 20 && 40 + 60 + 80 === 180);
check('J10: L5 alloy 320 g in 7 : 9 → 140 / 180 (same as F11)', 320 / 16 === 20 && 140 + 180 === 320);
check('J11: L6 6 : 10 : 15 is simplest (HCF 1) though every pair reduces', hcf3(6, 10, 15) === 1 && hcf(6, 10) === 2 && hcf(10, 15) === 5 && hcf(6, 15) === 3);
check('J12: L6 chain A:B = 2:3, B:C = 6:7 → A:B:C = 4:6:7 (B wears lcm(3,6) = 6)', hcf(4, 6) === 2 && 4 * 3 === 12 && 6 * 2 === 12);
check('J13: L6 total Rs 1,020 → 17 parts, one part 60 → 240 / 360 / 420', 4 + 6 + 7 === 17 && 1020 / 17 === 60 && 4 * 60 === 240 && 6 * 60 === 360 && 7 * 60 === 420);
check('J14: L6 the shares rebuild everything: sum 1,020, ratios 2:3 and 6:7', 240 + 360 + 420 === 1020 && hcf(240, 360) === 120 && 240 / 120 === 2 && hcf(360, 420) === 60 && 360 / 60 === 6 && 420 / 60 === 7);
check('J15: recognition table, total 630 — all five rows share integral parts', 630 % 2 === 0 && 630 % 3 === 0 && 630 % 5 === 0 && 630 % 7 === 0 && 630 % 9 === 0);
check('J16: table rows — 315/315, 210/420, 252/378, 270/360, 280/350 all sum to 630', 315 + 315 === 630 && 210 + 420 === 630 && 252 + 378 === 630 && 270 + 360 === 630 && 280 + 350 === 630);

/* ============================================================
 * K. Structural sanity for lesson 6.1
 * ==========================================================*/
check('K1: 8 Illustrations planned (simplest ×2, units, decimals, three-term, share ×2, difference)', true);
check('K2: 4 formula cards (the ratio, simplest form, equivalent ratios, sharing)', true);
check('K3: 5 quiz items with verified keys 2/1/3/2/0', true);
check('K4: 12 exercises across L1–L6 (2 each), all with steps + terminal answers', true);
check('K5: 2 equation tags (definition; equivalent-ratio law) + 1 derivation (the share formula)', true);
check('K6: 7 terms planned (Ratio, Terms, Simplest form, Equivalent ratios, Continued ratio, Sharing, One part)', true);
check('K7: prerequisites — ch. 3 HCF, 4.2 equivalence family, 5.3 unitary method', true);
check('K8: sources — ncert-math6-ch12 (new), ncert-math7-ch8 (extended §§8.1–8.2), khattar-qa-4e', true);

/* ============================================================
 * L. The rate — a ratio of different kinds, units riding
 * ==========================================================*/
check('L1: 54 km on 3 L → 18 km per litre', 54 / 3 === 18);
check('L2: 120 kg at Rs 40/kg costs Rs 4,800 (rate × quantity)', 120 * 40 === 4800);
check('L3: 72 words per minute for 5 min → 360 words', 72 * 5 === 360);
check('L4: pulse 60 beats/min → 45 beats in 45 s', 60 * (45 / 60) === 45);
check('L5: the inverse rate is a different statement: 18 km/L ↔ 1/18 L/km', 1 / (54 / 3) === 1 / 18);
check('L6: a rate keeps its units — kinds differ, so nothing cancels (unlike 6.1)', 18 !== 1 / 18);

/* ============================================================
 * M. The unit rate — the one-part engine of 5.3/6.1 again
 * ==========================================================*/
check('M1: Rs 96 for 3 kg → Rs 32 per kg (96 ÷ 3)', 96 / 3 === 32);
check('M2: read-back: 3 kg × Rs 32/kg = Rs 96 (the rebuild check)', 3 * 32 === 96);
check('M3: 180 words in 4 min → 45 wpm', 180 / 4 === 45);
check('M4: 300 L in 6 min → 50 L/min', 300 / 6 === 50);
check('M5: inverse read: at Rs 15/pen, Rs 210 buys 210 ÷ 15 = 14 pens', 90 / 6 === 15 && 210 / 15 === 14);
check('M6: scale-to-friendly-unit: Rs 22.50 per 250 g ×4 → Rs 90 per 1000 g = Rs 90/kg', 22.5 * 4 === 90 && 250 * 4 === 1000);

/* ============================================================
 * N. Comparing rates — the same-way law (all in Rs per kg)
 * ==========================================================*/
check('N1: shop A Rs 96/3 kg = 32; shop B Rs 155/5 kg = 31 → B cheaper', 96 / 3 === 32 && 155 / 5 === 31 && 31 < 32);
check('N2: 5 kg at B costs 155; 5 kg at A costs 5 × 32 = 160 → saving Rs 5', 5 * 32 === 160 && 160 - 155 === 5);
check('N3: the bulk illusion: Rs 60/2 kg = 30; Rs 122/4 kg = 30.5 → the smaller bag wins', 60 / 2 === 30 && 122 / 4 === 30.5 && 30 < 30.5);
check('N4: the tie: Rs 87/3 kg = 29 and Rs 116/4 kg = 29 — neither', 87 / 3 === 29 && 116 / 4 === 29 && 87 / 3 === 116 / 4);
check('N5: the direction fraud: 32 Rs/kg vs 0.03125 kg/Rs are incomparable directions', 1 / 32 === 0.03125 && 32 > 0.03125);

/* ============================================================
 * O. Speed — the flagship rate
 * ==========================================================*/
check('O1: 240 km in 4 h → 60 km/h; read-back 60 × 4 = 240', 240 / 4 === 60 && 60 * 4 === 240);
check('O2: 100 m in 12.5 s → 8 m/s; read-back 8 × 12.5 = 100', 100 / 12.5 === 8 && 8 * 12.5 === 100);
check('O3: distance law: 60 km/h for 7 h → 420 km', 60 * 7 === 420);
check('O4: time law: 420 km at 60 km/h → 7 h', 420 / 60 === 7);
check('O5: uniform speed: four hourly cells of 60 km rebuild 240 km', 4 * 60 === 240);

/* ============================================================
 * P. The km/h ↔ m/s conversion law
 * ==========================================================*/
check('P1: 1 km/h = 1000 m / 3600 s = 5/18 m/s', 1000 / 3600 === 5 / 18);
check('P2: 1 m/s = 3600/1000 = 18/5 = 3.6 km/h', 3600 / 1000 === 3.6 && 18 / 5 === 3.6);
check('P3: 72 km/h = 72 × 5/18 = 20 m/s', (72 * 5) / 18 === 20);
check('P4: 12 m/s = 12 × 18/5 = 43.2 km/h', (12 * 18) / 5 === 43.2);
check('P5: 54 km/h = 54 × 5/18 = 15 m/s', (54 * 5) / 18 === 15);
check('P6: 10 m/s = 10 × 18/5 = 36 km/h', (10 * 18) / 5 === 36);
check('P7: the anchors: 20 m/s × 3.6 = 72; 5 m/s = 18 km/h', 20 * 3.6 === 72 && 5 * 3.6 === 18);
check('P8: 90 km/h = 90 × 5/18 = 25 m/s', (90 * 5) / 18 === 25);

/* ============================================================
 * Q. Average speed and the rate at work (tank, typists)
 * ==========================================================*/
check('Q1: 120 km at 60 → 2 h; 120 km at 40 → 3 h; 240 km in 5 h → 48 km/h', 120 / 60 === 2 && 120 / 40 === 3 && 240 / 5 === 48);
check('Q2: the equal-weight fraud: (60+40)/2 = 50, but 50 × 5 = 250 ≠ 240 — dead', (60 + 40) / 2 === 50 && 50 * 5 !== 240);
check('Q3: tank: 45 L/min × 8 min = 360 L; 5,400 L at 45 L/min → 120 min = 2 h', 45 * 8 === 360 && 5400 / 45 === 120);
check('Q4: typists: 540 words/12 min = 45 wpm; 700/14 = 50 wpm → B faster by 5', 540 / 12 === 45 && 700 / 14 === 50 && 50 - 45 === 5);
check('Q5: legs 150 km at 50 (3 h) + 120 km at 60 (2 h) → 270 km in 5 h → 54 km/h', 150 / 50 === 3 && 120 / 60 === 2 && (150 + 120) / (3 + 2) === 54);
check('Q6: legs 60 km/h (2 h) + 90 km/h (1 h) → 210 km in 3 h → 70; the mean 75 ≠ 70', 120 / 2 === 60 && 90 / 1 === 90 && 210 / 3 === 70 && (60 + 90) / 2 === 75 && (60 + 90) / 2 !== 70);

/* ============================================================
 * R. Figure geometry — figure 1 the double ruler (Rs 32/kg),
 * bar 0..5 kg over x 60..700 (640 px), price line 0..Rs 160
 * ==========================================================*/
check('R1: five kg-intervals of 128 px across 640 px', (700 - 60) / 5 === 128);
check('R2: kg ticks at x 60, 188, 316, 444, 572, 700', JSON.stringify([0,1,2,3,4,5].map(k => 60 + 128 * k)) === '[60,188,316,444,572,700]');
check('R3: the price line climbs in steps of Rs 32: 0..160', JSON.stringify([0,1,2,3,4,5].map(k => 32 * k)) === '[0,32,64,96,128,160]');
check('R4: every kg tick lands on its price tick (x positions identical by design)', 60 + 128 * 3 === 444 && 32 * 3 === 96);
check('R5: figure 2 journey map: bar x 60..700, 4 hourly cells of 160 px', (700 - 60) / 4 === 160);
check('R6: cell boundaries at 60, 220, 380, 540, 700', JSON.stringify([0,1,2,3,4].map(k => 60 + 160 * k)) === '[60,220,380,540,700]');
check('R7: km labels 0/60/120/180/240 sit under the same boundaries; 60 × 4 = 240', JSON.stringify([0,1,2,3,4].map(k => 60 * k)) === '[0,60,120,180,240]');

/* ============================================================
 * S. Quiz keys for 6.2 (indices 1/0/1/2/1)
 * ==========================================================*/
check('S1: Q1 Rs 96 for 3 kg → Rs 32/kg (idx 1); 30 and 33 come from 90 and 99', 96 / 3 === 32 && 90 / 3 === 30 && 99 / 3 === 33);
check('S2: Q2 cheapest unit price 30 → Rs 60 for 2 kg (idx 0); the 5-kg bag is dearest at 31', 60 / 2 === 30 && 122 / 4 === 30.5 && 155 / 5 === 31 && 30 < 30.5 && 30.5 < 31);
check('S3: Q3 180 km in 3 h → 60 km/h (idx 1); 63 added, 54 subtracted, 180 ignored time', 180 / 3 === 60 && 180 / 3 + 3 === 63 && 180 / 3 - 6 === 54);
check('S4: Q4 12 m/s → 43.2 km/h (idx 2); 4.32 is the ÷10 slip, 30 the ×2.5 slip, 60 the ×5 slip', (12 * 18) / 5 === 43.2 && 12 * 3.6 === 43.2 && 12 * 2.5 === 30 && 12 * 5 === 60);
check('S5: Q5 average 48 km/h (idx 1); 40 the slow leg, 50 the mean fraud, 60 the fast leg', 240 / 5 === 48 && (60 + 40) / 2 === 50 && 50 * 5 !== 240);
check('S6: quiz answers planned as indices 1/0/1/2/1', JSON.stringify([1, 0, 1, 2, 1]) === '[1,0,1,2,1]');

/* ============================================================
 * T. Exercise keys for 6.2 (12 questions, L1–L6)
 * ==========================================================*/
check('T1: L1a Rs 240 for 8 m of ribbon → Rs 30 per metre', 240 / 8 === 30);
check('T2: L1b 250 words in 10 min → 25 wpm', 250 / 10 === 25);
check('T3: L2a Rs 42 for 12 pencils → Rs 3.50 per pencil', 42 / 12 === 3.5);
check('T4: L2b Rs 90 for 6 pens → Rs 15/pen; Rs 210 buys 14 pens', 90 / 6 === 15 && 210 / 15 === 14);
check('T5: L3a 240 km in 4 h → 60 km/h; at that speed 7 h → 420 km', 240 / 4 === 60 && 60 * 7 === 420);
check('T6: L3b Rs 87/3 kg = 29 and Rs 116/4 kg = 29 — a tie, neither is better', 87 / 3 === 29 && 116 / 4 === 29);
check('T7: L4a 54 km/h = 15 m/s', (54 * 5) / 18 === 15);
check('T8: L4b 10 m/s = 36 km/h', (10 * 18) / 5 === 36);
check('T9: L5a 6,300 L at 45 L/min → 140 min = 2 h 20 min', 6300 / 45 === 140 && 140 === 2 * 60 + 20);
check('T10: L5b 150 km at 50 + 120 km at 60 → 270 km in 5 h → 54 km/h', 150 / 50 + 120 / 60 === 5 && (150 + 120) / 5 === 54);
check('T11: L6a typists 45 vs 50 wpm → B faster by 5 wpm', 540 / 12 === 45 && 700 / 14 === 50 && 50 - 45 === 5);
check('T12: L6b legs 60 + 90 → 210 km in 3 h → 70 km/h; the equal-weight 75 is the fraud', (120 + 90) / (2 + 1) === 70 && (60 + 90) / 2 === 75 && (60 + 90) / 2 !== 70);
check('T13: L3a read-backs: 60 × 4 = 240 and 60 × 7 = 420', 60 * 4 === 240 && 60 * 7 === 420);
check('T14: L5a the check: 45 L/min × 140 min = 6,300 L', 45 * 140 === 6300);
check('T15: recognition table — 232/8 = 29 ties 87/3 = 29; ladder 29/29/30/30.5/31', 232 / 8 === 29 && 87 / 3 === 29 && 60 / 2 === 30 && 122 / 4 === 30.5 && 155 / 5 === 31 && 29 === 29 && 29 < 30 && 30 < 30.5 && 30.5 < 31);

/* ============================================================
 * U. Structural sanity for lesson 6.2
 * ==========================================================*/
check('U1: 10 Illustrations planned (unit price, scale-to-friendly-unit, shops, bulk illusion, 240 km, 100 m sprint, 72 km/h, 12 m/s, tank, average speed) — the pens inverse read lives in prose', true);
check('U2: 4 formula cards (unit rate, the speed family, the conversion law, average speed)', true);
check('U3: 2 equation tags (the rate; the speed definition) + 1 derivation (the 5/18 law)', true);
check('U4: 7 terms planned (Rate, Unit rate, Unit price, Speed, Uniform speed, Average speed, Conversion factor)', true);
check('U5: 5 quiz items with verified keys 1/0/1/2/1', true);
check('U6: 12 exercises across L1–L6 (2 each), all with steps + terminal answers', true);
check('U7: prerequisites — 6.1 ratio (the same-kind boundary Note), 5.3 operating on decimals (the unitary method)', true);
check('U8: sources — ncert-math6-ch12 (extended to Ex. 12.3, the unitary method), ncert-sci7-motion (new), khattar-qa-4e', true);

/* ============================================================
 * V. The definition — an equality of two ratios (the :: statement)
 * ==========================================================*/
check('V1: the 6.2 debt: 96 : 3 = 32 : 1 and 160 : 5 = 32 : 1 — one rate twice', 96 / 3 === 32 && 160 / 5 === 32 && 96 * 5 === 480 && 3 * 160 === 480);
check('V2: 256 : 8 = 32 : 1 — the third pair on the same line', 256 / 8 === 32);
check('V3: 24 : 36 = 6 : 9 — both 2 : 3; cross 24 × 9 = 216 = 36 × 6', hcf(24, 36) === 12 && hcf(6, 9) === 3 && 24 * 9 === 216 && 36 * 6 === 216);
check('V4: 4 : 7 vs 5 : 9 fails (36 ≠ 35) — the 6.1 stranger returns', 4 * 9 === 36 && 7 * 5 === 35 && 4 * 9 !== 7 * 5);
check('V5: 3 : 5 :: 6 : 10 is TRUE (30 = 30); 5 : 3 :: 6 : 10 is FALSE (50 ≠ 18) — order matters', 3 * 10 === 30 && 5 * 6 === 30 && 5 * 10 === 50 && 3 * 6 === 18 && 5 * 10 !== 3 * 6);
check('V6: 3 : 5 :: 10 : 6 FALSE (18 ≠ 50) and 2 : 3 :: 9 : 6 FALSE (12 ≠ 27) — quiz distractors', 3 * 6 === 18 && 5 * 10 === 50 && 3 * 6 !== 5 * 10 && 2 * 6 === 12 && 3 * 9 === 27 && 2 * 6 !== 3 * 9);

/* ============================================================
 * W. Extremes and means — the cross law (product of extremes = product of means)
 * ==========================================================*/
check('W1: table 8 : 12 = 10 : 15 — extremes 8 × 15 = 120, means 12 × 10 = 120', 8 * 15 === 120 && 12 * 10 === 120 && hcf(8, 12) === 4 && 8 / 4 === 2 && 12 / 4 === 3 && hcf(10, 15) === 5);
check('W2: table 21 : 14 = 33 : 22 — extremes 21 × 22 = 462, means 14 × 33 = 462', 21 * 22 === 462 && 14 * 33 === 462 && hcf(21, 14) === 7 && hcf(33, 22) === 11 && 21 / 7 === 3 && 33 / 11 === 3);
check('W3: table 9 : 4 = 27 : 12 — extremes 9 × 12 = 108, means 4 × 27 = 108', 9 * 12 === 108 && 4 * 27 === 108 && 27 / 9 === 3 && 12 / 4 === 3);
check('W4: the failing row 6 : 10 vs 9 : 16 — 96 ≠ 90, not in proportion', 6 * 16 === 96 && 10 * 9 === 90 && 6 * 16 !== 10 * 9);
check('W5: derivation, forward: (a/b) × bd = ad and (c/d) × bd = bc — multiply both sides by bd', (3 / 5) * 30 === 18 && (6 / 10) * 30 === 18);
check('W6: derivation, backward: ad = bc, ÷ bd on both sides gives a/b = c/d — the iff closes (30/50 = 3/5 = 6/10)', 3 * 10 === 5 * 6 && (3 * 10) / (5 * 10) === 3 / 5 && (5 * 6) / (5 * 10) === 6 / 10);
check('W7: alternendo: 3 : 5 :: 6 : 10 ⟹ 3 : 6 :: 5 : 10 (same products 30 = 30)', 3 * 10 === 30 && 6 * 5 === 30 && 3 / 6 === 0.5 && 5 / 10 === 0.5);
check('W8: invertendo: 3 : 5 :: 6 : 10 ⟹ 5 : 3 :: 10 : 6 (products 30 = 30)', 5 * 6 === 30 && 3 * 10 === 30);
check('W9: alternendo is the cross products unchanged: a : c :: b : d ⟺ ad = bc — the same two numbers', 3 * 10 === 30 && 5 * 6 === 30);
check('W10: order-flip instance: 8 : 12 :: 15 : 10 fails — 80 ≠ 180', 8 * 10 === 80 && 12 * 15 === 180 && 8 * 10 !== 12 * 15);

/* ============================================================
 * X. The test-and-fill engine (every seat)
 * ==========================================================*/
check('X1: test 45 : 63 vs 35 : 49 — 45 × 49 = 2205 = 63 × 35, in proportion', 45 * 49 === 2205 && 63 * 35 === 2205 && hcf(45, 63) === 9 && 45 / 9 === 5 && 63 / 9 === 7 && hcf(35, 49) === 7 && 35 / 7 === 5 && 49 / 7 === 7);
check('X2: test 30 : 42 vs 24 : 35 — 1050 ≠ 1008, not in proportion', 30 * 35 === 1050 && 42 * 24 === 1008 && 30 * 35 !== 42 * 24);
check('X3: fill 8 : 12 = 10 : □ → □ = 12 × 10 / 8 = 15; check 8:12 = 2:3 = 10:15', (12 * 10) / 8 === 15 && hcf(8, 12) === 4 && hcf(10, 15) === 5 && 8 / 4 === 10 / 5 && 12 / 4 === 15 / 5);
check('X4: fill first seat: □ : 24 = 30 : 45 → □ = 24 × 30 / 45 = 16; check 16:24 = 2:3 = 30:45', (24 * 30) / 45 === 16 && hcf(16, 24) === 8 && 16 / 8 === 2 && 24 / 8 === 3 && hcf(30, 45) === 15 && 30 / 15 === 2 && 45 / 15 === 3);
check('X5: Illustration 6, 9, 12 → fourth = 9 × 12 / 6 = 18; check 6:9 = 2:3 = 12:18', (9 * 12) / 6 === 18 && hcf(6, 9) === 3 && hcf(12, 18) === 6 && 6 / 3 === 12 / 6 && 9 / 3 === 18 / 6);
check('X6: prose off-line test: 4 kg for Rs 120 → unit rate 30 ≠ 32 — not on the shop\'s line', 120 / 4 === 30 && 120 / 4 !== 32);
check('X7: the fourth proportional IS the unit-rate engine: 480 × 8/5 = 768 = 96 × 8', (480 * 8) / 5 === 768 && 480 / 5 === 96 && 96 * 8 === 768);

/* ============================================================
 * Y. Continued proportion — mean and third proportional
 * ==========================================================*/
check('Y1: mean proportional 4 & 25: b² = 100 → b = 10; 4 : 10 = 2 : 5 = 10 : 25', 10 * 10 === 4 * 25 && 4 * 5 === 2 * 10 && 10 * 5 === 2 * 25);
check('Y2: mean proportional 8 & 50: b² = 400 → b = 20; 8 : 20 = 2 : 5 = 20 : 50', 20 * 20 === 8 * 50 && 8 * 5 === 2 * 20 && 20 * 5 === 2 * 50);
check('Y3: quiz mean proportional 5 & 45: b² = 225 → b = 15; 5 : 15 = 1 : 3 = 15 : 45', 15 * 15 === 5 * 45 && 5 * 3 === 15 && 15 * 3 === 45);
check('Y4: exercise mean proportional 7 & 63: b² = 441 → b = 21; 7 : 21 = 1 : 3 = 21 : 63', 21 * 21 === 7 * 63 && 7 * 3 === 21 && 21 * 3 === 63);
check('Y5: exercise mean given 20, one number 16 → other = 400/16 = 25; 16 : 20 = 4 : 5 = 20 : 25', (20 * 20) / 16 === 25 && 16 * 5 === 4 * 20 && 20 * 5 === 4 * 25);
check('Y6: third proportional to 4 and 6: x = 36/4 = 9; 4 : 6 = 2 : 3 = 6 : 9', (6 * 6) / 4 === 9 && hcf(4, 6) === 2 && hcf(6, 9) === 3 && 4 / 2 === 6 / 3 && 6 / 2 === 9 / 3);
check('Y7: exercise third proportional to 8 and 12: x = 144/8 = 18; 8 : 12 = 2 : 3 = 12 : 18', (12 * 12) / 8 === 18 && hcf(8, 12) === 4 && hcf(12, 18) === 6 && 8 / 4 === 12 / 6 && 12 / 4 === 18 / 6);
check('Y8: the mean sits in BOTH mean seats: a : b :: b : c — the middle term repeated', 8 * 5 === 2 * 20 && 20 * 5 === 2 * 50);
check('Y9: the arithmetic-mean fraud on 5 & 45: (5+45)/2 = 25 ≠ 15; and 45/5 = 9 ≠ 15', (5 + 45) / 2 === 25 && (5 + 45) / 2 !== 15 && 45 / 5 === 9 && 45 / 5 !== 15);

/* ============================================================
 * Z. Proportion at work — tea, rice, recipe
 * ==========================================================*/
check('Z1: tea 5 kg → Rs 480; 8 kg at the same rate → 480 × 8/5 = 768', (480 * 8) / 5 === 768 && 480 / 5 === 96 && 96 * 8 === 768);
check('Z2: the proportion form 8 : 5 = 768 : 480 — cross 8 × 480 = 3840 = 5 × 768', 8 * 480 === 3840 && 5 * 768 === 3840);
check('Z3: rice 6 kg → Rs 210; 15 kg → 210 × 15/6 = 525; unit check 35 × 15 = 525', (210 * 15) / 6 === 525 && 210 / 6 === 35 && 35 * 15 === 525);
check('Z4: recipe 6 people → 9 cups; 14 people → 9 × 14/6 = 21; per-person 1.5 × 14 = 21', (9 * 14) / 6 === 21 && 9 / 6 === 1.5 && 1.5 * 14 === 21);
check('Z5: 12 : 16 = 21 : 28 — the L3a instance: 12 × 28 = 336 = 16 × 21', 12 * 28 === 336 && 16 * 21 === 336 && hcf(12, 16) === 4 && hcf(21, 28) === 7 && 12 / 4 === 21 / 7 && 16 / 4 === 28 / 7);
check('Z6: 10 : 25 = 22 : 55 — the L3b instance: 10 × 55 = 550 = 25 × 22', 10 * 55 === 550 && 25 * 22 === 550 && hcf(10, 25) === 5 && hcf(22, 55) === 11 && 10 / 5 === 22 / 11 && 25 / 5 === 55 / 11);
check('Z7: 6 : 8 vs 21 : 28 — 6 × 28 = 168 = 8 × 21, in proportion (L1a)', 6 * 28 === 168 && 8 * 21 === 168 && 6 / 2 === 3 && 8 / 2 === 4 && 21 / 7 === 3 && 28 / 7 === 4);
check('Z8: 5 : 7 vs 35 : 48 — 240 ≠ 245, not in proportion (L1b)', 5 * 48 === 240 && 7 * 35 === 245 && 5 * 48 !== 7 * 35);
check('Z9: 9 : 15 :: 24 : 40 — extremes 360, means 360 (L2b)', 9 * 40 === 360 && 15 * 24 === 360 && hcf(9, 15) === 3 && hcf(24, 40) === 8 && 9 / 3 === 24 / 8 && 15 / 3 === 40 / 8);
check('Z10: fill 8 : 12 = 14 : □ → 21 (L2a); check 14 : 21 = 2 : 3', (12 * 14) / 8 === 21 && hcf(14, 21) === 7 && 14 / 7 === 2 && 21 / 7 === 3);

/* ============================================================
 * AA. Figure 1 geometry — one statement, four seats
 * viewBox 0 0 760 320; boxes y 120..180 (h 60), width 116, pitch 160
 * a 60..176, b 220..336, c 380..496, d 540..656; colons 198/358/516
 * ==========================================================*/
check('AA1: four boxes of width 116 at pitch 160: 60..176, 220..336, 380..496, 540..656', JSON.stringify([0, 1, 2, 3].map(k => 60 + 160 * k)) === '[60,220,380,540]' && 60 + 116 === 176 && 220 + 116 === 336 && 380 + 116 === 496 && 540 + 116 === 656);
check('AA2: box gaps are 44 px: 176→220, 336→380, 496→540 — colons centered 198/358/518', 220 - 176 === 44 && 380 - 336 === 44 && 540 - 496 === 44 && (176 + 220) / 2 === 198 && (336 + 380) / 2 === 358 && (496 + 540) / 2 === 518);
check('AA3: extremes arc spans x 118..598 above the boxes: endpoints y 106, peak ≈ 81', (118 + 598) / 2 === 358 && 106 < 120 && 81 < 106);
check('AA4: extremes label at y 44 clears the arc peak 81 (44 + 8 < 81)', 44 + 8 < 81);
check('AA5: means arc endpoints y 192 at x 278/438, dip 228; seat labels baseline y 214 (top ≈ 202) — 10 px clear', 278 === (220 + 336) / 2 && 438 === (380 + 496) / 2 && 228 > 192 && 202 - 192 === 10);
check('AA6: means label at y 254 clears the dip 228 and the bottom strip at y 300', 254 > 228 + 8 && 254 + 10 < 300 - 8);
check('AA7: seat labels centered under box centers 118/278/438/598', (60 + 176) / 2 === 118 && (220 + 336) / 2 === 278 && (380 + 496) / 2 === 438 && (540 + 656) / 2 === 598);
check('AA8: bottom strip at y 300 fits inside viewBox 320 with 20 px margin', 300 + 8 < 320);

/* ============================================================
 * AB. Figure 2 geometry — the line of agreement (Rs 32/kg)
 * viewBox 0 0 760 390; kg ruler y 84, price ruler y 276
 * kg ticks 0..8 at x 60 + 80k; price 32 × kg — same x positions
 * ==========================================================*/
check('AB1: eight kg-intervals of 80 px across 640 px', (700 - 60) / 8 === 80);
check('AB2: kg ticks at x 60,140,220,300,380,460,540,620,700', JSON.stringify([0,1,2,3,4,5,6,7,8].map(k => 60 + 80 * k)) === '[60,140,220,300,380,460,540,620,700]');
check('AB3: the price at every tick: 0..256 in steps of 32 — 9 labels on the price ruler', JSON.stringify([0,1,2,3,4,5,6,7,8].map(k => 32 * k)) === '[0,32,64,96,128,160,192,224,256]');
check('AB4: pair (3, 96) at x 300 and pair (5, 160) at x 460; pair (8, 256) at x 700', 60 + 80 * 3 === 300 && 32 * 3 === 96 && 60 + 80 * 5 === 460 && 32 * 5 === 160 && 60 + 80 * 8 === 700 && 32 * 8 === 256);
check('AB5: bracket 1 spans x 300..460 (3 kg → 5 kg) at y 336, label at y 360', 460 - 300 === 160 && 336 > 276 && 360 > 336);
check('AB6: bracket 2 spans x 460..700 (5 kg → 8 kg) at y 336; 5 × 256 = 1280 = 8 × 160', 700 - 460 === 240 && 5 * 256 === 1280 && 8 * 160 === 1280);
check('AB7: bracket labels clear each other: label 1 centered 380 (x ~300..460), label 2 centered 580 (x ~500..660)', (300 + 460) / 2 === 380 && (460 + 700) / 2 === 580);
check('AB8: takeaway strip at y 30 sits above the kg labels (y 64) and the rules start at y 84', 30 + 8 < 64 && 64 < 84);
check('AB9: the off-line claim 120 at 4 kg maps to x 360; the true tick 128 maps to 380 — 20 px apart', 60 + (120 / 32) * 80 === 360 && 60 + (128 / 32) * 80 === 380);

/* ============================================================
 * AC. Quiz keys for 6.3 (indices 0/1/2/3/2)
 * ==========================================================*/
check('AC1: Q1 in proportion → 3 : 5 :: 6 : 10 (idx 0); the three distractors all fail', 3 * 10 === 30 && 5 * 6 === 30 && 5 * 10 !== 3 * 6 && 3 * 6 !== 5 * 10 && 2 * 6 !== 3 * 9);
check('AC2: Q2 the means of 7 : 12 :: 21 : 36 are 12 and 21 (idx 1); extremes 7 × 36 = 252 = 12 × 21', 7 * 36 === 252 && 12 * 21 === 252);
check('AC3: Q3 9 : 12 = 15 : □ → 20 (idx 2); 18 adds 3, 24 doubles 12', (12 * 15) / 9 === 20 && hcf(9, 12) === 3 && hcf(15, 20) === 5 && 9 / 3 === 15 / 5 && 12 / 3 === 20 / 5);
check('AC4: Q4 mean proportional of 5 & 45 → 15 (idx 3); 25 is the arithmetic fraud, 225 the unrooted product, 9 the ratio', 15 * 15 === 225 && (5 + 45) / 2 === 25 && 45 / 5 === 9);
check('AC5: Q5 second/third/fourth 18, 24, 36 → first = 12 (idx 2); 36 × option = 432 only for 12', (18 * 24) / 36 === 12 && 36 * 12 === 432 && 36 * 10 !== 432 && 36 * 14 !== 432 && 36 * 16 !== 432);
check('AC6: quiz answers planned as indices 0/1/2/3/2', JSON.stringify([0, 1, 2, 3, 2]) === '[0,1,2,3,2]');

/* ============================================================
 * AD. Exercise keys for 6.3 (12 questions, L1–L6)
 * ==========================================================*/
check('AD1: L1a 6 : 8 and 21 : 28 in proportion — 168 = 168', 6 * 28 === 168 && 8 * 21 === 168);
check('AD2: L1b 5 : 7 and 35 : 48 NOT — 240 ≠ 245', 5 * 48 === 240 && 7 * 35 === 245 && 5 * 48 !== 7 * 35);
check('AD3: L2a 8 : 12 = 14 : 21 — both 2 : 3', (12 * 14) / 8 === 21 && 14 * 3 === 2 * 21);
check('AD4: L2b 9 : 15 :: 24 : 40 — extremes 9 × 40 = 360 = 15 × 24', 9 * 40 === 360 && 15 * 24 === 360);
check('AD5: L3a 12, 16, 21 → fourth 28; check 12:16 = 3:4 = 21:28', (16 * 21) / 12 === 28 && 12 * 28 === 336 && 12 * 7 === 3 * 28 && 16 * 7 === 4 * 28);
check('AD6: L3b 10, 25, 55 → third 22; check 10:25 = 2:5 = 22:55', (10 * 55) / 25 === 22 && 25 * 22 === 550 && 10 * 11 === 2 * 55 && 25 * 11 === 5 * 55);
check('AD7: L4a mean proportional 7 & 63 → 21; check 21² = 441 = 7 × 63', 21 * 21 === 7 * 63 && 7 * 3 === 21 && 21 * 3 === 63);
check('AD8: L4b 15 : 6 = □ : 210 → 525; unit-rate check 35 × 15 = 525', (210 * 15) / 6 === 525 && 210 / 6 === 35 && 35 * 15 === 525);
check('AD9: L5a third proportional to 12 and 18 → 27; check 12:18 = 2:3 = 18:27', (18 * 18) / 12 === 27 && 12 * 27 === 324 && 18 * 18 === 324);
check('AD10: L5b recipe 14 : 6 = □ : 9 → 21; per-person 1.5 × 14 = 21', (9 * 14) / 6 === 21 && 9 * 14 === 126 && 126 / 6 === 21);
check('AD11: L6a mean 20, one number 16 → other 25; check 16 : 20 = 4 : 5 = 20 : 25', (20 * 20) / 16 === 25 && 16 * 25 === 400 && 20 * 20 === 400);
check('AD12: L6b alternendo verified on 3 : 5 :: 6 : 10 → 3 : 6 :: 5 : 10 (30 = 30)', 3 * 10 === 30 && 6 * 5 === 30 && 3 / 6 === 0.5 && 5 / 10 === 0.5);
check('AD13: L4b the proportion form: 15 × 210 = 3150 = 6 × 525', 15 * 210 === 3150 && 6 * 525 === 3150);
check('AD14: L5b the proportion form: 14 × 9 = 126 = 6 × 21', 14 * 9 === 126 && 6 * 21 === 126);

/* ============================================================
 * AE. Structural sanity for lesson 6.3
 * ==========================================================*/
check('AE1: 9 Illustrations planned (two one-rate statements, test pass, test fail, fill fourth, fill fourth-from-6-9-12, fill first, mean 8 & 50, third proportional, tea)', true);
check('AE2: 3 formula cards (the cross law, the mean proportional, the third proportional) — the fourth proportional lives as equation tag 2', true);
check('AE3: 2 equation tags (the definition; the missing-term engine) + 1 derivation (the cross law, both directions)', true);
check('AE4: 7 terms planned (Proportion, Extremes, Means, Fourth proportional, Continued proportion, Mean proportional, Third proportional)', true);
check('AE5: 5 quiz items with verified keys 0/1/2/3/2', true);
check('AE6: 12 exercises across L1–L6 (2 each), all with steps + terminal answers', true);
check('AE7: prerequisites — 6.1 ratio (the cross-test), 4.3 comparing fractions (the licence paid), 6.2 rates (the closing promise)', true);
check('AE8: sources — ncert-math6-ch12 (extended to §12.2 + Ex. 12.2), ncert-math7-ch8, khattar-qa-4e', true);
check('AE9: properties list carries alternendo and invertendo with verified instances', true);

/* ============================================================
 * AF. Lesson 6.4 opening — the rate line named (direct variation)
 * ==========================================================*/
check('AF1: the shop line 96/3 = 160/5 = 256/8 = 32 — one constant k on the line', 96 / 3 === 32 && 160 / 5 === 32 && 256 / 8 === 32);
check('AF2: every pair on the line agrees (1,32),(3,96),(5,160),(8,256) — x/y = 32 each', 32 / 1 === 32 && 96 / 3 === 32 && 160 / 5 === 32 && 256 / 8 === 32);
check('AF3: the off-line point 120/4 = 30 ≠ 32 — 4 kg for Rs 120 is NOT on the line', 120 / 4 === 30 && 120 / 4 !== 32);
check('AF4: pairs on the line are in proportion (cross law): 3×160 = 480 = 96×5', 3 * 160 === 480 && 96 * 5 === 480);
check('AF5: two off-line pairs fail the cross law: 4×96 = 384 ≠ 120×3 = 360', 4 * 96 === 384 && 120 * 3 === 360 && 4 * 96 !== 120 * 3);

/* ============================================================
 * AG. The parking fraud — growing without agreeing
 * ==========================================================*/
check('AG1: parking 4 h Rs 60 → 15 per hour', 60 / 4 === 15);
check('AG2: parking 8 h Rs 100 → 12.5 per hour ≠ 15', 100 / 8 === 12.5 && 100 / 8 !== 60 / 4);
check('AG3: parking 12 h Rs 140 → 35/3 ≈ 11.67 — a third value', (140 * 3) / 12 === 35 && 35 / 3 !== 12.5 && 35 / 3 !== 15);
check('AG4: parking 24 h Rs 180 → 7.5 per hour — a fourth value', 180 / 24 === 7.5);
check('AG5: four different ratios → charges NOT in direct variation with time', 60 / 4 !== 100 / 8 && 100 / 8 !== 140 / 12 && 140 / 12 !== 180 / 24);
check('AG6: the contrast — the rice line holds one ratio: 65/1 = 130/2 = 325/5', 65 / 1 === 65 && 130 / 2 === 65 && 325 / 5 === 65);
check('AG7: the per-hour values fall (15 → 12.5 → 11.67 → 7.5): the deal improves with time', 15 > 12.5 && 12.5 > 35 / 3 && 35 / 3 > 7.5);

/* ============================================================
 * AH. The direct engine at work (Illustrations 3–6)
 * ==========================================================*/
check('AH1: machine k = 840/6 = 140 bottles per hour', 840 / 6 === 140);
check('AH2: machine 5 h → 5 × 140 = 700 bottles', 5 * 140 === 700);
check('AH3: machine in proportion form: 840/6 = x/5 → x = 700; cross 840×5 = 4200 = 6×700', (840 * 5) / 6 === 700 && 840 * 5 === 6 * 700);
check('AH4: truck 14 km in 25 min — k = 14/25 km per minute; 5 h = 300 min', 5 * 60 === 300);
check('AH5: truck 300 × 14/25 = 168 km', (300 * 14) / 25 === 168);
check('AH6: truck speed in km/h: 14/25 × 60 = 33.6 km/h; 33.6 × (25/60) = 14 km round-trips', (14 * 60) / 25 === 33.6 && (33.6 * 25) / 60 === 14);
check('AH7: truck in proportion form: 14/25 = x/300 → x = 168; cross 14×300 = 4200 = 25×168', (14 * 300) / 25 === 168 && 14 * 300 === 25 * 168);
check('AH8: pole k = 560/320 = 7/4 = 1.75 (m of pole per m of shadow)', 560 / 320 === 1.75 && 7 / 4 === 1.75);
check('AH9: pole 10 m 50 cm = 1050 cm → shadow 1050/1.75 = 600 cm = 6 m', 1050 / 1.75 === 600);
check('AH10: shadow 5 m = 500 cm → pole 1.75 × 500 = 875 cm = 8 m 75 cm', 1.75 * 500 === 875);
check('AH11: pole proportion form: 560/320 = 1050/x → x = 600; cross 560×600 = 336000 = 320×1050', (320 * 1050) / 560 === 600 && 560 * 600 === 320 * 1050);
check('AH12: bacteria actual length 5/50000 = 0.0001 cm = 1/10000 cm (a thousandth of a millimetre)', 5 / 50000 === 0.0001 && 0.0001 * 10 === 0.001);
check('AH13: bacteria at 20000× → 20000 × 0.0001 = 2 cm', 20000 * 0.0001 === 2);
check('AH14: bacteria factor method: m = 20000/50000 = 2/5 → 5 × 2/5 = 2 cm', 20000 / 50000 === 0.4 && 5 * 0.4 === 2);

/* ============================================================
 * AI. Inverse variation — the fixed total (Illustration 7 + canon)
 * ==========================================================*/
check('AI1: sweets 24 children × 5 each = 120 — the total is the fixed thing', 24 * 5 === 120);
check('AI2: 20 children → 120/20 = 6 each; product still 120', 120 / 20 === 6 && 20 * 6 === 120);
check('AI3: game show k = Rs 1,00,000: 4 winners → 25,000 each', 100000 / 4 === 25000 && 4 * 25000 === 100000);
check('AI4: 5 winners → 20,000; 8 → 12,500; 10 → 10,000; 20 → 5,000', 100000 / 5 === 20000 && 100000 / 8 === 12500 && 100000 / 10 === 10000 && 100000 / 20 === 5000);
check('AI5: every winner-count × prize rebuilds 1,00,000 (the constant product)', [4, 5, 8, 10, 20].every(w => w * (100000 / w) === 100000));
check('AI6: spokes 360° total: 4 → 90, 8 → 45, 10 → 36, 12 → 30, 15 → 24', [4, 8, 10, 12, 15].every(n => n * (360 / n) === 360) && 360 / 4 === 90 && 360 / 8 === 45 && 360 / 10 === 36 && 360 / 12 === 30 && 360 / 15 === 24);
check('AI7: angle 40° → 360/40 = 9 spokes', 360 / 40 === 9);
check('AI8: periods 8 × 45 = 360 min; 9 periods → 40 min each', 8 * 45 === 360 && 360 / 9 === 40 && 9 * 40 === 360);
check('AI9: the 240 km journey: 40×6 = 60×4 = 80×3 = 120×2 = 240', 40 * 6 === 240 && 60 * 4 === 240 && 80 * 3 === 240 && 120 * 2 === 240);
check('AI10: inverse IS direct variation with the reciprocal: x ∝ 1/y means x/(1/y) = xy = k', true);

/* ============================================================
 * AJ. Figure 1 geometry — one journey, two bindings
 * viewBox 0 0 760 400; panel split at x 380
 * LEFT (direct): origin (60,320); t-axis 70 px per hour, t = 0..4
 *   line d = 60t to (340, 80); dots (130,260) and (270,140)
 * RIGHT (inverse): origin (420,320); t-axis 40 px per hour, t = 0..7
 *   s-scale 3 px per (km/h); curve xy = 240 dots (540,80),(580,140),(660,200)
 * ==========================================================*/
check('AJ1: left axis t = 0..4 at 70 px → ticks x 60,130,200,270,340', JSON.stringify([0,1,2,3,4].map(t => 60 + 70 * t)) === '[60,130,200,270,340]');
check('AJ2: left line d = 60t: points (60,320),(130,260),(200,200),(270,140),(340,80)', JSON.stringify([0,1,2,3,4].map(t => 320 - 60 * t)) === '[320,260,200,140,80]');
check('AJ3: left dots labelled 1 h/60 km at (130,260) and 3 h/180 km at (270,140)', 60 + 70 === 130 && 320 - 60 === 260 && 60 + 3 * 70 === 270 && 320 - 180 === 140);
check('AJ4: panel divider x 380 clears the left plot (ends 340) and the right origin (420)', 340 < 380 && 380 < 420);
check('AJ5: right axis t = 0..7 at 40 px → ticks x 420..700 step 40', JSON.stringify([0,2,4,6,7].map(t => 420 + 40 * t)) === '[420,500,580,660,700]');
check('AJ6: right s-scale 3 px per km/h: s = 90 → y = 320 − 270 = 50 (inside viewBox 400)', 320 - 3 * 90 === 50 && 50 > 0);
check('AJ7: curve dots (3 h, 80) → (540,80); (4,60) → (580,140); (6,40) → (660,200)', 420 + 120 === 540 && 320 - 240 === 80 && 420 + 160 === 580 && 320 - 180 === 140 && 420 + 240 === 660 && 320 - 120 === 200);
check('AJ8: every curve dot sits on xy = 240 in data units: 3×80 = 4×60 = 6×40 = 240', 3 * 80 === 240 && 4 * 60 === 240 && 6 * 40 === 240);
check('AJ9: drop-lines from (540,80): vertical to (540,320), horizontal to (420,80) — axis meets exact', 540 === 420 + 40 * 3 && 80 === 320 - 3 * 80);
check('AJ10: dot labels ride 12 px above their dots at y 128/188 — rows 60 px apart, never a shared y; the 3 × 80 label lives in the guides\' pocket instead (AJ14)', 140 - 12 === 128 && 200 - 12 === 188 && 188 - 128 === 60);
check('AJ11: hyperbola polyline samples on xy = 240: t = 8/3→(526.7,50), 3→(540,80), 4→(580,140), 5→(620,176), 6→(660,200), 7→(700,217.1)', JSON.stringify([8 / 3, 3, 4, 5, 6, 7].map(t => Math.round((420 + 40 * t) * 10) / 10)) === '[526.7,540,580,620,660,700]' && JSON.stringify([8 / 3, 3, 4, 5, 6, 7].map(t => Math.round((320 - 3 * (240 / t)) * 10) / 10)) === '[50,80,140,176,200,217.1]');
check('AJ12: bottom strip y 370 clears the tick labels at y 338', 370 > 338 + 8 && 370 < 400);
check('AJ13: panel titles ride at y 40 — bottoms (44) clear the dot labels\' tops (56) by 12 px; the km/h tag (y 66) clears the 90 tick (54) by 12 px', 56 - 44 >= 12 && 66 - 54 >= 8);
check('AJ14: the 3 × 80 label sits in the right panel\'s empty upper-left pocket at (480,108) — clear of the guides (horizontal y 80, vertical x 540), the curve (x ≥ 526.7), and the km/h tag (bottom 66): 96 > 80, 504 < 526.7, 96 > 66', 108 - 12 > 80 && 480 + 24 < 526.7 && 108 - 12 > 66);

/* ============================================================
 * AK. The factor method — both laws proved from the constants
 * ==========================================================*/
check('AK1: direct law: x = ky → x₂ = m·x₁ forces y₂ = m·y₁ (the line cannot bend)', true);
check('AK2: van instance: 60 km/h, 2 h → 120 km; time doubles to 4 h → 240 km (doubled)', 60 * 2 === 120 && 60 * 4 === 240 && 240 === 2 * 120);
check('AK3: inverse law: y = k/x → x₂ = m·x₁ forces y₂ = y₁/m (the total cannot move)', true);
check('AK4: journey instance: 40 km/h → 6 h; speed doubles to 80 → 3 h (halved)', 240 / 40 === 6 && 240 / 80 === 3 && 6 / 2 === 3);
check('AK5: non-whole m: speed 60 → 90 (m = 3/2): time 240/90 = 8/3 h = 2 h 40 min; factor form 4 × 2/3 = 8/3', 240 / 90 === 8 / 3 && 4 * (2 / 3) === 8 / 3 && 8 / 3 === 2 + 40 / 60);
check('AK6: the m-fraud guard: the factor law needs the SAME constant — mixing two rates is not variation', 60 * 2 !== 90 * 2);
check('AK7: bacteria by factor: m = 2/5, 5 → 2 cm (the law working on a shrinking factor)', 5 * (20000 / 50000) === 2);

/* ============================================================
 * AL. The recognition drill + the flip + the work problems
 * ==========================================================*/
check('AL1: workers×days fixed: rewiring 3×4 = 12 = 4×3 person-days', 3 * 4 === 12 && 4 * 3 === 12);
check('AL2: rewiring by the flip: 3 : 4 = d : 4 → d = 3 (cross 3×4 = 12 = 4×d)', (3 * 4) / 4 === 3);
check('AL3: machines 42 × 63 = 2646 person-days? — machine-days; 2646/54 = 49 machines', 42 * 63 === 2646 && 2646 / 54 === 49 && 49 * 54 === 2646);
check('AL4: cattle 20 × 6 = 120 animal-days; 30 animals → 120/30 = 4 days', 20 * 6 === 120 && 120 / 30 === 4 && 30 * 4 === 120);
check('AL5: windows 2 × 3 = 6 person-days; 1 person → 6 days; 6 persons → 1 day', 2 * 3 === 6 && 6 / 1 === 6 && 6 / 6 === 1);
check('AL6: boxes 12 × 25 = 300 bottles; 20 per box → 300/20 = 15 boxes', 12 * 25 === 300 && 300 / 20 === 15 && 20 * 15 === 300);
check('AL7: the trap — time & distance AT UNIFORM SPEED is DIRECT (k = the speed): 120/2 = 180/3 = 60', 120 / 2 === 60 && 180 / 3 === 60);
check('AL8: the trap contrast — speed & time on a FIXED journey is inverse (k = 240)', 60 * 4 === 240 && 80 * 3 === 240);
check('AL9: population × land-per-person = total land (inverse): 1000 × 12 = 500 × 24', 1000 * 12 === 12000 && 500 * 24 === 12000 && 1000 * 12 === 500 * 24);
check('AL10: area & crop direct: 3 ha → 12 t, 5 ha → 20 t (k = 4 t/ha)', 12 / 3 === 4 && 20 / 5 === 4 && 12 / 3 === 20 / 5);
check('AL11: the flip derivation: w₁d₁ = w₂d₂ ⟺ w₁/w₂ = d₂/d₁ — divide both sides by w₂d₁ (rewiring: 12/16 = 3/4)', (3 * 4) / (4 * 4) === 3 / 4 && 12 / 16 === 3 / 4);
check('AL12: the naive direct fill fails the sniff test: the direct layout 3 : 4 :: 4 : d gives d = 16/3 (more workers, MORE days — absurd)', (4 * 4) / 3 === 16 / 3 && 16 / 3 > 4);
check('AL13: the flip layout 3 : 4 :: d : 4 gives d = 3 (more workers, fewer days — sane)', (3 * 4) / 4 === 3 && 3 < 4);

/* ============================================================
 * AM. Figure 2 geometry — the flip (which seat turns over)
 * viewBox 0 0 760 320; two rows of four boxes, pitch 160
 * row 1 y 60..116 (the direct invite); row 2 y 190..246 (the flip)
 * ==========================================================*/
check('AM1: four boxes of width 116 at pitch 160 per row: x 60..176, 220..336, 380..496, 540..656 (both rows)', JSON.stringify([0,1,2,3].map(k => 60 + 160 * k)) === '[60,220,380,540]' && 60 + 116 === 176 && 540 + 116 === 656);
check('AM2: row 1 box centers x 118/278/438/598; gap colons centered x 198/358/518 at row-mid y 88', (60 + 176) / 2 === 118 && (176 + 220) / 2 === 198 && (336 + 380) / 2 === 358 && (496 + 540) / 2 === 518 && (60 + 116) / 2 === 88);
check('AM3: row 2 boxes y 190..246, same x lanes — 74 px of clear band between rows (116..190)', 190 - 116 === 74);
check('AM4: the two flip legs cross in the clear band — the 4 leg (470,122)→(566,178) and the d leg (566,122)→(470,178) meet at (518,150); tips (y 181) clear row 2 (190) by 9 px', 470 + 96 * 0.5 === 518 && 122 + 56 * 0.5 === 150 && 181 + 9 === 190 && 122 >= 116 + 4);
check('AM5: the flip label in the band\'s left clear region — center (240,156), top 144, bottom 160: inside 116..190, right edge 366 < the legs (466)', 156 - 12 >= 116 && 156 + 4 <= 190 && 240 + 126 === 366 && 366 < 466);
check('AM6: bottom strip y 288 clears row 2 (246) and fits viewBox 320', 288 > 246 + 8 && 288 + 8 < 320);
check('AM7: row 1 content 3 : 4 :: 4 : □ — the direct invite, d = 16/3 absurd; row 2 content 3 : 4 :: □ : 4 — the flip, d = 3', (4 * 4) / 3 === 16 / 3 && (3 * 4) / 4 === 3);
check('AM8: cross-law strip text: 3 × 4 = 12 = 4 × 3 — the product that never moves', 3 * 4 === 12 && 4 * 3 === 12);

/* ============================================================
 * AN. Quiz keys for 6.4 (indices 2/1/1/2/1)
 * ==========================================================*/
check('AN1: Q1 pole height & shadow varies directly (idx 2); the other three are inverse', 560 / 320 === 1.75 && 60 * 4 === 240 && 3 * 4 === 12 && 4 * 25000 === 100000);
check('AN2: Q2 840 in 6 h → 5 h = 700 (idx 1); 640/720/750 all fail the k = 140 line', 840 / 6 === 140 && 5 * 140 === 700 && 5 * 128 !== 700 && 5 * 144 !== 700 && 5 * 150 !== 700);
check('AN3: Q3 xy = 240, x = 60 → y = 4 (idx 1); 40 is the multiply fraud, 1/4 the divide fraud, 240 the product itself', 240 / 60 === 4 && 60 * 4 === 240 && 240 * 60 !== 4 && 60 / 4 !== 4);
check('AN4: Q4 parking table NOT direct — the ratios differ (idx 2); 15 ≠ 12.5 ≠ 35/3 ≠ 7.5', 60 / 4 === 15 && 100 / 8 === 12.5 && 140 / 12 !== 15 && 180 / 24 === 7.5);
check('AN5: Q5 speed doubles → time halves (idx 1); 40→80 on 240 km: 6 h → 3 h', 240 / 40 === 6 && 240 / 80 === 3 && 3 === 6 / 2);
check('AN6: quiz answers planned as indices 2/1/1/2/1', JSON.stringify([2, 1, 1, 2, 1]) === '[2,1,1,2,1]');

/* ============================================================
 * AO. Exercise keys for 6.4 (12 questions, L1–L6)
 * ==========================================================*/
check('AO1: L1a rice 5 kg Rs 325 → k = 65; 8 kg → Rs 520', 325 / 5 === 65 && 65 * 8 === 520);
check('AO2: L1b pens 6 for Rs 90 → k = 15; 10 pens → Rs 150', 90 / 6 === 15 && 15 * 10 === 150);
check('AO3: L2a fixed 360 km: 90 km/h → 4 h; 120 km/h → 3 h (product 360 both ways)', 90 * 4 === 360 && 360 / 120 === 3 && 120 * 3 === 360);
check('AO4: L2b 8 workers 15 days = 120 worker-days; 12 workers → 10 days', 8 * 15 === 120 && 120 / 12 === 10 && 12 * 10 === 120);
check('AO5: L3a paint 75 mL per part; 1800 mL base → 24 parts red; 24 × 75 = 1800', 1800 / 75 === 24 && 24 * 75 === 1800);
check('AO6: L3b 12 × 25 = 300 bottles; boxes of 20 → 15 boxes', 12 * 25 === 300 && 300 / 20 === 15);
check('AO7: L4a cattle 20 × 6 = 120; 30 animals → 4 days', 20 * 6 === 120 && 120 / 30 === 4);
check('AO8: L4b periods 8 × 45 = 360 min; 9 → 40 min', 8 * 45 === 360 && 360 / 9 === 40);
check('AO9: L5a bacteria 5/50000 = 0.0001 cm; ×20000 → 2 cm (both factor and engine agree)', 20000 * (5 / 50000) === 2 && 5 * (20000 / 50000) === 2);
check('AO10: L5b machines 42 × 63 = 2646; 54 days → 49 machines', 42 * 63 === 2646 && 2646 / 54 === 49);
check('AO11: L6a van 240 km: 80 km/h → 3 h (product); factor 4 × 60/80 = 3 h', 240 / 80 === 3 && 4 * (60 / 80) === 3);
check('AO12: L6b the flip: 3 : 4 = d : 4 → d = 3 days; cross 3×4 = 12 = 4×3', (3 * 4) / 4 === 3 && 3 * 4 === 4 * 3);
check('AO13: L2a proportion form: 90/120 = 3/4 → 4 × 3/4 = 3 h (the factor inside the proportion)', (90 / 120) * 4 === 3);
check('AO14: L4b inverse IS direct with the reciprocal: 9 periods → 360/9 min each', 360 / 9 === 40);

/* ============================================================
 * AP. Structural sanity for lesson 6.4
 * ==========================================================*/
check('AP1: 9 Illustrations planned (shop line, parking fraud, bottles, truck, pole-shadow, bacteria, game show, rewiring, machines)', true);
check('AP2: 3 formula cards (the direct engine, the inverse engine, the factor laws)', true);
check('AP3: 2 equation tags (the direct definition; the inverse definition) + 2 derivations (the factor laws; the flip)', true);
check('AP4: 7 terms planned (Direct variation, Constant of variation, Inverse variation, Constant product, Factor method, Person-days, Hyperbola)', true);
check('AP5: 5 quiz items with verified keys 2/1/1/2/1', true);
check('AP6: 12 exercises across L1–L6 (2 each), all with steps + terminal answers', true);
check('AP7: prerequisites — 6.2 rates (the unit rate = k), 6.3 proportion (the cross law + invertendo), 6.1 ratio (the comparison habit)', true);
check('AP8: sources — ncert-math8-ch13 (new: §§13.1–13.2 + Ex. 13.1/13.2), ncert-math6-ch12, ncert-math7-ch8, khattar-qa-4e', true);
check('AP9: the recognition table carries 7 situations with verified constants (rewiring 12, speed 60, journey 240, yield 4 t/ha, land 12000, shadow 1.75, spokes 360)', 3 * 4 === 12 && 120 / 2 === 60 && 60 * 4 === 240 && 12 / 3 === 4 && 1000 * 12 === 12000 && 560 / 320 === 1.75 && 4 * 90 === 360);
check('AP10: closing hands the map-scale line to 6.5 and names the hyperbola xy = k', true);

/* ============================================================ */

console.log(`\nverify-unit-6: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL PASS — every number in lessons 6.1, 6.2, 6.3 and 6.4 is script-verified before writing.');
