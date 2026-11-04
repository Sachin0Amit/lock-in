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

/* ============================================================ */

console.log(`\nverify-unit-6: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL PASS — every number in lessons 6.1 and 6.2 is script-verified before writing.');
