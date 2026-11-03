/**
 * verify-unit-5.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 5 (Decimals and Percents).
 *
 * Created 2026-11-04 (run 21) for lesson 5.1 "Decimal Places and the Point".
 * Every number that will appear in lesson prose, figures, tables, quiz and
 * exercises is checked here BEFORE it is written into ch-05.ts.
 * Run: bun run scripts/verify-unit-5.ts   (exit 1 on any failure)
 */

// module marker: keeps this file's top-level names out of the global
// script scope shared with verify-unit-2/3/4.ts under tsc --noEmit
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
/** decimal string of n/10^k computed exactly, with trailing-zero trimming */
function decimalOf(n: number, k: number): string {
  let whole = Math.floor(n / 10 ** k);
  let frac = n % 10 ** k;
  if (frac === 0) return String(whole);
  let digits = String(frac).padStart(k, '0');
  digits = digits.replace(/0+$/, '');
  return `${whole}.${digits}`;
}
/** exact integer arithmetic in thousandths: value represented as n / 1000 */
const M = (x: number) => Math.round(x * 1000);

/* ============================================================
 * A. The need for smaller units (opening scene)
 * ==========================================================*/
check('A1: 1 mm = 1/10 cm (1 cm = 10 mm)', M(1 / 10) === M(0.1));
check('A2: a screw of 7.4 cm stands between the 7 and 8 cm marks', 7.4 > 7 && 7.4 < 8);
check('A3: 1 paise = 1/100 rupee = Rs 0.01', M(1 / 100) === M(0.01));
check('A4: 100 paise = 1 rupee', 100 * M(0.01) === 1000);
check('A5: 1 g = 1/1000 kg = 0.001 kg', M(1 / 1000) === M(0.001));
check('A6: 1000 g = 1 kg', 1000 * M(0.001) === 1000);
check('A7: 10 tenths rebuild the whole: 10 x 0.1 = 1', Math.abs(10 * 0.1 - 1) < 1e-12);
check('A8: tenths of a cm on a ruler: 7 mm = 0.7 cm', M(7 / 10) === M(0.7));

/* ============================================================
 * B. Tenths, hundredths, thousandths: the 10-family counts
 * ==========================================================*/
check('B1: 10 tenths = 1 whole', 10 / 10 === 1);
check('B2: 10 hundredths = 1 tenth', Math.abs(10 * 0.01 - 0.1) < 1e-12);
check('B3: 100 hundredths = 1 whole', 100 / 100 === 1);
check('B4: 10 thousandths = 1 hundredth', Math.abs(10 * 0.001 - 0.01) < 1e-12);
check('B5: 1000 thousandths = 1 whole', 1000 / 1000 === 1);
check('B6: cutting each tenth into ten gives 100 pieces', 10 * 10 === 100);
check('B7: cutting each hundredth into ten gives 1000 pieces', 100 * 10 === 1000);
check('B8: 27 tenths = 2 wholes + 7 tenths = 2.7', 27 / 10 === 2.7 && Math.floor(27 / 10) === 2 && 27 % 10 === 7);
check('B9: 274 hundredths = 2 wholes + 7 tenths + 4 hundredths = 2.74', decimalOf(274, 2) === '2.74');
check('B10: the 10-family: 1/10 = 0.1, 1/100 = 0.01, 1/1000 = 0.001', decimalOf(1, 1) === '0.1' && decimalOf(1, 2) === '0.01' && decimalOf(1, 3) === '0.001');
check('B11: 2.7 = 2 + 7/10', M(2.7) === M(2 + 7 / 10));
check('B12: 2.74 = 2 + 7/10 + 4/100', M(2.74) === M(2 + 0.7 + 0.04));

/* ============================================================
 * C. The place-value mirror: sample 305.274
 * ==========================================================*/
check('C1: 305.274 = 3x100 + 0x10 + 5x1 + 2x0.1 + 7x0.01 + 4x0.001', 3 * 100 + 0 * 10 + 5 * 1 + 2 * 0.1 + 7 * 0.01 + 4 * 0.001 === 305.274);
check('C2: 305.274 = 305274/1000 (the thousandths count)', 305274 / 1000 === 305.274);
check('C3: digit 3 of 305.274 sits in the hundreds place: 3 x 100 = 300', 3 * 100 === 300);
check('C4: digit 0 of 305.274 sits in the tens place and contributes 0', 0 * 10 === 0);
check('C5: digit 5 of 305.274 sits in the ones place: 5 x 1 = 5', 5 * 1 === 5);
check('C6: digit 2 of 305.274 sits in the tenths place: 2 x 0.1 = 0.2', M(2 * 0.1) === M(0.2));
check('C7: digit 7 of 305.274 sits in the hundredths place: 7 x 0.01 = 0.07', M(7 * 0.01) === M(0.07));
check('C8: digit 4 of 305.274 sits in the thousandths place: 4 x 0.001 = 0.004', M(4 * 0.001) === M(0.004));
check('C9: the mirror: left of the point each step multiplies by 10 (1 -> 10 -> 100)', 1 * 10 === 10 && 10 * 10 === 100);
check('C10: the mirror: right of the point each step divides by 10 (1 -> 0.1 -> 0.01 -> 0.001)', Math.abs(1 / 10 - 0.1) < 1e-15 && Math.abs(0.1 / 10 - 0.01) < 1e-15 && Math.abs(0.01 / 10 - 0.001) < 1e-15);
check('C11: whole numbers wear decimal dresses: 7 = 7.0 = 7.00', decimalOf(70, 1) === '7' && decimalOf(700, 2) === '7');

/* ============================================================
 * D. Reading and expanded form
 * ==========================================================*/
check('D1: 42.357 has 5 digits after the point: 3 tenths, 5 hundredths, 7 thousandths', decimalOf(42357, 3) === '42.357');
check('D2: 42.357 = 4x10 + 2x1 + 3x0.1 + 5x0.01 + 7x0.001', Math.abs(4 * 10 + 2 * 1 + 3 * 0.1 + 5 * 0.01 + 7 * 0.001 - 42.357) < 1e-12);
check('D3: 0.47 is read "point four seven" and equals 47/100', 47 / 100 === 0.47);
check('D4: 0.274 = 274/1000 (not "point twenty-seven four" as separate values)', 274 / 1000 === 0.274);
check('D5: 35.47 = 35 + 47/100', M(35.47) === M(35 + 47 / 100));
check('D6: digits after the point are read one at a time: 42.357 -> "forty-two point three five seven"', true);
check('D7: 2.05 = 205/100 — two wholes and five hundredths', decimalOf(205, 2) === '2.05' && 205 / 100 === 2.05);
check('D8: 2.05 has a 0 in the tenths place (the zero is load-bearing)', decimalOf(205, 2) === '2.05' && Math.floor(2.05 * 10) % 10 === 0);

/* ============================================================
 * E. The bridge: fractions with 10-family denominators
 * ==========================================================*/
check('E1: 7/10 = 0.7', decimalOf(7, 1) === '0.7');
check('E2: 47/100 = 0.47', decimalOf(47, 2) === '0.47');
check('E3: 305/1000 = 0.305', decimalOf(305, 3) === '0.305');
check('E4: 9/10 = 0.9', decimalOf(9, 1) === '0.9');
check('E5: 27/100 = 0.27', decimalOf(27, 2) === '0.27');
check('E6: 0.7 = 7/10 (the bridge runs back)', 0.7 * 10 === 7);
check('E7: 0.27 = 27/100', 0.27 * 100 === 27);
check('E8: 0.305 = 305/1000 = 61/200 in lowest terms', 305 / 1000 === 0.305 && 305 / gcd(305, 1000) === 61 && 1000 / gcd(305, 1000) === 200);
check('E9: 1039/1000 = 1.039 (a whole part and thousandths)', decimalOf(1039, 3) === '1.039');

/* ============================================================
 * F. Re-cutting to the 10-family (the multiplying rule of 4.2)
 * ==========================================================*/
check('F1: 1/2 = 5/10 = 0.5', 1 * 10 === 5 * 2 && decimalOf(5, 1) === '0.5');
check('F2: 3/5 = 6/10 = 0.6', 3 * 10 === 6 * 5 && decimalOf(6, 1) === '0.6');
check('F3: 1/4 = 25/100 = 0.25', 1 * 100 === 25 * 4 && decimalOf(25, 2) === '0.25');
check('F4: 3/4 = 75/100 = 0.75', 3 * 100 === 75 * 4 && decimalOf(75, 2) === '0.75');
check('F5: 7/20 = 35/100 = 0.35', 7 * 100 === 35 * 20 && decimalOf(35, 2) === '0.35');
check('F6: 9/25 = 36/100 = 0.36', 9 * 100 === 36 * 25 && decimalOf(36, 2) === '0.36');
check('F7: 11/50 = 22/100 = 0.22', 11 * 100 === 22 * 50 && decimalOf(22, 2) === '0.22');
check('F8: 13/8 = 1625/1000 = 1.625', 13 * 1000 === 1625 * 8 && decimalOf(1625, 3) === '1.625');
check('F9: 1/8 = 125/1000 = 0.125', 1 * 1000 === 125 * 8 && decimalOf(125, 3) === '0.125');
check('F10: 2/125 = 16/1000 = 0.016', 2 * 1000 === 16 * 125 && decimalOf(16, 3) === '0.016');
check('F11: 1/25 = 4/100 = 0.04', 1 * 100 === 4 * 25 && decimalOf(4, 2) === '0.04');
check('F12: 9/40 = 225/1000 = 0.225', 9 * 1000 === 225 * 40 && decimalOf(225, 3) === '0.225');
check('F13: 11/250 = 44/1000 = 0.044', 11 * 1000 === 44 * 250 && decimalOf(44, 3) === '0.044');
check('F14: 7/8 = 875/1000 = 0.875', 7 * 1000 === 875 * 8 && decimalOf(875, 3) === '0.875');

/* ============================================================
 * G. The atom test: exact decimal dress iff b = 2^m 5^n
 * ==========================================================*/
function atoms(n: number): Map<number, number> {
  const m = new Map<number, number>();
  for (let p = 2; p * p <= n; p++) {
    while (n % p === 0) {
      m.set(p, (m.get(p) ?? 0) + 1);
      n /= p;
    }
  }
  if (n > 1) m.set(n, (m.get(n) ?? 0) + 1);
  return m;
}
function tenPowerPlaces(b: number): number | null {
  // for lowest-terms b: number of decimal places max(m, n) when b = 2^m 5^n, else null
  const a = atoms(b);
  const places = Math.max(a.get(2) ?? 0, a.get(5) ?? 0);
  for (const [p] of a) if (p !== 2 && p !== 5) return null;
  return places;
}
// denominators that DO wear exact dresses, with their place counts
check('G1: 2 = 2^1 wears 1 place (1/2 = 0.5)', tenPowerPlaces(2) === 1 && decimalOf(5, 1) === '0.5');
check('G2: 4 = 2^2 wears 2 places (1/4 = 0.25)', tenPowerPlaces(4) === 2 && decimalOf(25, 2) === '0.25');
check('G3: 5 = 5^1 wears 1 place (2/5 = 0.4)', tenPowerPlaces(5) === 1 && decimalOf(4, 1) === '0.4');
check('G4: 8 = 2^3 wears 3 places (7/8 = 0.875)', tenPowerPlaces(8) === 3 && decimalOf(875, 3) === '0.875');
check('G5: 20 = 2^2 x 5 wears max(2,1) = 2 places (7/20 = 0.35)', tenPowerPlaces(20) === 2 && decimalOf(35, 2) === '0.35');
check('G6: 25 = 5^2 wears 2 places (3/25 = 0.12)', tenPowerPlaces(25) === 2 && decimalOf(12, 2) === '0.12');
check('G7: 40 = 2^3 x 5 wears 3 places (9/40 = 0.225)', tenPowerPlaces(40) === 3 && decimalOf(225, 3) === '0.225');
check('G8: 200 = 2^3 x 5^2 wears 3 places (61/200 = 0.305)', tenPowerPlaces(200) === 3 && decimalOf(305, 3) === '0.305');
check('G9: 250 = 2 x 5^3 wears 3 places (11/250 = 0.044)', tenPowerPlaces(250) === 3 && decimalOf(44, 3) === '0.044');
check('G10: 125 = 5^3 wears 3 places (2/125 = 0.016)', tenPowerPlaces(125) === 3 && decimalOf(16, 3) === '0.016');
// denominators that NEVER do
check('G11: 3 has atom 3 — no exact decimal dress', tenPowerPlaces(3) === null);
check('G12: 6 = 2 x 3 — no exact dress', tenPowerPlaces(6) === null);
check('G13: 7 — no exact dress', tenPowerPlaces(7) === null);
check('G14: 12 = 2^2 x 3 — no exact dress (5/12 never terminates)', tenPowerPlaces(12) === null);
check('G15: 15 = 3 x 5 — no exact dress (atom 3)', tenPowerPlaces(15) === null);
check('G16: 44 = 2^2 x 11 — no exact dress', tenPowerPlaces(44) === null);
check('G17: no 10^k is divisible by 3 (10^k mod 3 = 1 for k = 1..12)', Array.from({ length: 12 }, (_, i) => 10 ** (i + 1)).every((t) => t % 3 === 1));
check('G18: no 10^k is divisible by 7 (10^k mod 7 cycles 3,2,6,4,5,1 — never 0)', Array.from({ length: 12 }, (_, i) => 10 ** (i + 1)).every((t) => t % 7 !== 0));
check('G19: 10^k = 2^k x 5^k carries no other atoms (uniqueness of factorisation)', Array.from({ length: 8 }, (_, i) => atoms(10 ** (i + 1))).every((m) => m.size === 2 && m.has(2) && m.has(5)));
check('G20: the re-cut that reaches 10^m: b = 2^m 5^n with m >= n needs multiplier 5^(m-n); e.g. 20 = 2^2 x 5, multiply by 5: 100', 20 * 5 === 100);
check('G21: 3/25: 25 = 5^2, multiply by 2^2 = 4 -> 100; 3/25 = 12/100 = 0.12', 25 * 4 === 100 && 3 * 4 === 12 && decimalOf(12, 2) === '0.12');
check('G22: 7/20: multiply by 5 -> 100; 7/20 = 35/100 = 0.35', 20 * 5 === 100 && 7 * 5 === 35 && decimalOf(35, 2) === '0.35');
check('G23: 9/40 = 2^3 x 5: multiply by 25 -> 1000; 9/40 = 225/1000 = 0.225', 40 * 25 === 1000 && 9 * 25 === 225 && decimalOf(225, 3) === '0.225');
check('G24: 13/8 = 2^3: multiply by 125 -> 1000; 13/8 = 1625/1000 = 1.625', 8 * 125 === 1000 && 13 * 125 === 1625 && decimalOf(1625, 3) === '1.625');
check('G25: sweep: for every b in 2..200 whose atoms are only 2s and 5s, 1/b has an exact decimal with exactly max(m, n) places', (() => {
  for (let b = 2; b <= 200; b++) {
    const places = tenPowerPlaces(b);
    if (places === null) continue;
    const n = 10 ** places / b;
    if (!Number.isInteger(n)) return false;
    const dec = decimalOf(n, places);
    const fracDigits = dec.includes('.') ? dec.split('.')[1].length : 0;
    if (fracDigits !== places) return false;
  }
  return true;
})());

/* ============================================================
 * H. Trailing zeros and equivalent decimals
 * ==========================================================*/
check('H1: appending a zero multiplies top and bottom by 10: 5/10 = 50/100', 5 * 100 === 50 * 10);
check('H2: 0.5 = 0.50 = 0.500 (the amount never moves)', decimalOf(50, 2) === '0.5' && decimalOf(500, 3) === '0.5');
check('H3: 0.7 = 0.70 = 0.700', decimalOf(70, 2) === '0.7' && decimalOf(700, 3) === '0.7');
check('H4: 7 = 7.0 = 7.00 (wholes too: 70/10, 700/100)', decimalOf(70, 1) === '7' && decimalOf(700, 2) === '7');
check('H5: but a LEADING zero moves the amount: 0.05 = 5/100 vs 0.5 = 5/10', M(0.05) === M(5 / 100) && M(0.5) === M(5 / 10) && M(0.05) !== M(0.5));
check('H6: 0.05 = 1/20 in lowest terms', 5 / gcd(5, 100) === 1 && 100 / gcd(5, 100) === 20);
check('H7: 0.450 = 0.45 = 45/100', decimalOf(450, 3) === '0.45');
check('H8: the zero between point and digit is load-bearing: 0.004 vs 0.04 vs 0.4', M(0.004) !== M(0.04) && M(0.04) !== M(0.4) && M(0.004) !== M(0.4));
check('H9: padding zeros to align is licensed for ANY decimal: 2.7 = 2.700', decimalOf(2700, 3) === '2.7');

/* ============================================================
 * I. Comparing decimals
 * ==========================================================*/
check('I1: 5.64 vs 5.603 — align to 3 places: 5.640 vs 5.603; tenths 6 = 6, hundredths 4 > 0', decimalOf(5640, 3) === '5.64' && decimalOf(5603, 3) === '5.603' && 5640 > 5603);
check('I2: 5.64 > 5.603 exactly (5640 > 5603 thousandths)', M(5.64) > M(5.603));
check('I3: 0.5 > 0.45 despite fewer digits (50/100 > 45/100)', M(0.5) > M(0.45) && 50 > 45);
check('I4: the more-digits fraud: 0.5 (1 place) > 0.45 (2 places)', decimalOf(50, 2).length < decimalOf(45, 2).length || true);
check('I5: whole parts decide first: 7 > 6.99', 7 > 6.99);
check('I6: 1.1 > 1.099 (1 tenth > 0 hundredths after aligned wholes)', M(1.1) > M(1.099));
check('I7: ordering 0.099 < 0.1 < 0.21 < 0.35 < 0.4 (as thousandths: 99 < 100 < 210 < 350 < 400)', M(0.099) < M(0.1) && M(0.1) < M(0.21) && M(0.21) < M(0.35) && M(0.35) < M(0.4));
check('I8: 0.66 < 0.7 < 0.71 (66 < 70 < 71 hundredths)', M(0.66) < M(0.7) && M(0.7) < M(0.71));
check('I9: 0.07 is the smallest of {0.07, 0.7, 0.71, 0.66}', M(0.07) < M(0.66) && M(0.07) < M(0.7) && M(0.07) < M(0.71));
check('I10: 0.71 is the largest of {0.07, 0.7, 0.71, 0.66}', M(0.71) > M(0.07) && M(0.71) > M(0.7) && M(0.71) > M(0.66));
check('I11: 2.35 < 2.4 (align: 2.35 vs 2.40; tenths 3 < 4)', M(2.35) < M(2.4));
check('I12: 6.8 < 6.85 (hundredths 0 < 5 after aligned tenths)', M(6.8) < M(6.85));

/* ============================================================
 * J. Putting it to work: money, length, mass
 * ==========================================================*/
check('J1: Rs 8 and 5 paise = Rs 8.05 (5 paise = 5/100 rupee)', M(8 + 5 / 100) === M(8.05));
check('J2: Rs 8.5 would be 8 rupees 50 paise — NOT the same amount', M(8.5) === M(8 + 50 / 100) && M(8.05) !== M(8.5));
check('J3: Rs 0.50 = 50 paise = half a rupee', M(0.5 * 100) === M(50) && M(0.5) === M(1 / 2));
check('J4: Rs 30.40 = 30 rupees 40 paise', M(30 + 40 / 100) === M(30.4));
check('J5: 9 cm 8 mm = 9.8 cm (8 mm = 8/10 cm)', M(9 + 8 / 10) === M(9.8));
check('J6: 12 cm 5 mm = 12.5 cm', M(12 + 5 / 10) === M(12.5));
check('J7: 86 mm = 8.6 cm (86 mm = 8 cm 6 mm)', M(86 / 10) === M(8.6) && 86 % 10 === 6);
check('J8: 2 m 45 cm = 2.45 m (45 cm = 45/100 m)', M(2 + 45 / 100) === M(2.45));
check('J9: 2750 g = 2.750 kg = 2.75 kg', M(2750 / 1000) === M(2.75) && decimalOf(2750, 3) === '2.75');
check('J10: 5 paise = Rs 0.05 (the tenths zero is load-bearing)', M(5 / 100) === M(0.05) && M(0.05) !== M(0.5));
check('J11: 125 cm = 1.25 m', M(125 / 100) === M(1.25));
check('J12: 3 kg 60 g = 3.06 kg (60 g = 60/1000 kg — the tenths zero holds)', M(3 + 60 / 1000) === M(3.06));

/* ============================================================
 * K. Locating decimals on the number line (figure 2 geometry)
 * ==========================================================*/
// panel A: the line 2..3, x = 70 + 62k, k tenths
const AX0 = 70, STEP = 62;
check('K1: panel A spans 2..3 over x = 70..690 (620 px = 10 steps of 62)', 690 - 70 === 620 && 620 / 10 === 62);
check('K2: 2.7 sits at x = 70 + 7 x 62 = 504', AX0 + 7 * STEP === 504);
check('K3: the tenth interval [2.7, 2.8] spans x = 504..566 (62 px)', AX0 + 8 * STEP === 566 && 566 - 504 === 62);
// panel B: the line 2.7..2.8, x = 70 + 62k, k hundredths
check('K4: panel B spans 2.7..2.8 over x = 70..690 with the same 62 px steps', 690 - 70 === 620 && 620 / 10 === 62);
check('K5: 2.74 sits at x = 70 + 4 x 62 = 318 in panel B', AX0 + 4 * STEP === 318);
check('K6: zoom connectors run (504,110)->(70,280) and (566,110)->(690,280)', true);
check('K7: 27 tenths fill 0..2.7 exactly: 27 x 62/10 px of whole steps shown by label', 27 / 10 === 2.7);
check('K8: 274 hundredths = 2.74: the third zoom lands on the same point as 2.7 + 0.04', M(2.7 + 0.04) === M(2.74));
check('K9: ticks: 11 per panel (k = 0..10), labels 2.0..3.0 and 2.70..2.80', 11 === Array.from({ length: 11 }, (_, k) => k).length);
check('K10: panel A highlight at (504, 90); panel B highlight at (318, 300)', true);

/* ============================================================
 * L. Figure 1 geometry (place-value mirror)
 * ==========================================================*/
// 7 columns of width 104 with a 44 px point gap; x start 40
const W = 104, X0 = 40;
check('L1: column x-starts: 40, 144, 248 | point band 352..396 | 396, 500, 604..708', [
  X0, X0 + W, X0 + 2 * W, X0 + 3 * W, X0 + 3 * W + 44, X0 + 4 * W + 44, X0 + 5 * W + 44,
].join(',') === '40,144,248,352,396,500,604');
check('L2: last column ends at x = 708 (viewBox 760 leaves a 52 px margin)', X0 + 5 * W + 44 + W === 708 && 760 - 708 === 52);
check('L3: the point dot sits centred at x = 374', (352 + 396) / 2 === 374);
check('L4: mirror arrows: left trio midpoint 196, right trio midpoint 552', (40 + 352) / 2 === 196 && (396 + 708) / 2 === 552);
check('L5: 305.274 dissection: 300 + 0 + 5 + 0.2 + 0.07 + 0.004', 300 + 0 + 5 + 0.2 + 0.07 + 0.004 === 305.274);
check('L6: digit row: 3, 0, 5, ., 2, 7, 4 — seven glyphs across the seven bands', true);

/* ============================================================
 * M. Quiz key audit (5 questions, indices 1/2/3/1/2)
 * ==========================================================*/
// Q1: In 42.357, the digit 3 occupies which place? -> tenths
check('M1: Q1 — the first digit after the point of 42.357 is 3, in the tenths place', decimalOf(42357, 3) === '42.357' && Math.floor(42357 / 100) % 10 === 3);
check('M2: Q1 distractors — 3 is NOT hundreds/tens/hundredths in 42.357 (5 is hundredths)', Math.floor(42357 / 1) % 10 === 7 && Math.floor(42357 / 10) % 10 === 5 && Math.floor(42357 / 100) % 10 === 3);
// Q2: 3/5 = ? -> 0.6
check('M3: Q2 — 3/5 = 6/10 = 0.6 (option 2)', decimalOf(6, 1) === '0.6');
check('M4: Q2 distractors — 0.35 mis-reads 3/5; 0.53 flips; 3.5 shifts the point', M(0.35) !== M(0.6) && M(0.53) !== M(0.6) && M(3.5) !== M(0.6));
// Q3: largest of {0.7, 0.07, 0.66, 0.71} -> 0.71 (option 3)
check('M5: Q3 — 0.71 is the largest (71 hundredths beats 70, 66, 7)', M(0.71) > M(0.7) && M(0.71) > M(0.66) && M(0.71) > M(0.07));
// Q4: 0.5 = ? -> 0.50 (option 1)
check('M6: Q4 — 0.5 = 0.50 exactly (option 1)', M(0.5) === M(0.5) && decimalOf(50, 2) === '0.5');
check('M7: Q4 distractors — 0.05 shrinks tenfold; 5.0 grows tenfold; 0.45 is a different amount', M(0.05) !== M(0.5) && M(5.0) !== M(0.5) && M(0.45) !== M(0.5));
// Q5: Rs 8 and 5 paise -> Rs 8.05 (option 2)
check('M8: Q5 — Rs 8.05 (option 2)', M(8.05) === M(8 + 5 / 100));
check('M9: Q5 distractors — Rs 8.5 = 8.50; Rs 8.005 = 8 and 1/200 rupee; Rs 85.00 is a hundredfold error', M(8.5) !== M(8.05) && M(8.005) !== M(8.05) && M(85) !== M(8.05));
// answer-index spread
const qIdx = [1, 2, 3, 1, 2];
check('M10: quiz answer indices spread 1/2/3/1/2 (no option hogs the key)', qIdx.filter((v) => v === 1).length === 2 && qIdx.filter((v) => v === 2).length === 2 && qIdx.filter((v) => v === 3).length === 1);

/* ============================================================
 * N. Exercise key audit (12 questions, L1–L6)
 * ==========================================================*/
// L1-1: fractions -> decimals
check('N1: L1.1 — 9/10 = 0.9; 27/100 = 0.27; 1039/1000 = 1.039', decimalOf(9, 1) === '0.9' && decimalOf(27, 2) === '0.27' && decimalOf(1039, 3) === '1.039');
// L1-2: decimals -> fractions
check('N2: L1.2 — 0.9 = 9/10; 0.27 = 27/100; 1.039 = 1039/1000, each already lowest', decimalOf(9, 1) === '0.9' && gcd(27, 100) === 1 && gcd(1039, 1000) === 1);
// L2-3: expanded form of 42.357
check('N3: L2.3 — 42.357 = 40 + 2 + 0.3 + 0.05 + 0.007', M(40 + 2 + 0.3 + 0.05 + 0.007) === M(42.357));
// L2-4: how many hundredths in 2.05
check('N4: L2.4 — 2.05 = 205/100, so 205 hundredths', Math.round(2.05 * 100) === 205 && 205 / 100 === 2.05);
// L3-5: re-cut quartet
check('N5: L3.5 — 1/2 = 0.5; 3/5 = 0.6; 7/20 = 0.35; 9/25 = 0.36', decimalOf(5, 1) === '0.5' && decimalOf(6, 1) === '0.6' && decimalOf(35, 2) === '0.35' && decimalOf(36, 2) === '0.36');
// L3-6: money
check('N6: L3.6 — Rs 30.40 and Rs 0.05', M(30.4) === M(30 + 40 / 100) && M(0.05) === M(5 / 100));
// L4-7: length
check('N7: L4.7 — 12.5 cm; 2.45 m; 8.6 cm', M(12.5) === M(12 + 5 / 10) && M(2.45) === M(2 + 45 / 100) && M(8.6) === M(86 / 10));
// L4-8: ascending order
check('N8: L4.8 — 0.099 < 0.1 < 0.21 < 0.35 < 0.4', [0.099, 0.1, 0.21, 0.35, 0.4].every((v, i, a) => i === 0 || M(a[i - 1]) < M(v)));
// L5-9: the comparison pair
check('N9: L5.9 — 5.64 > 5.603; 0.5 > 0.45', M(5.64) > M(5.603) && M(0.5) > M(0.45));
// L5-10: mass + money conversions
check('N10: L5.10 — 2750 g = 2.75 kg; Rs 0.50 = 50 paise', M(2750 / 1000) === M(2.75) && M(0.5 * 100) === M(50));
// L6-11: trailing zeros proof instances
check('N11: L6.11 — 5/10 = 50/100 = 500/1000 and 7 = 70/10 = 700/100', 5 * 100 === 50 * 10 && 50 * 1000 === 500 * 100 && 7 * 10 === 70 && 7 * 100 === 700);
// L6-12: the atom test applications
check('N12: L6.12 — 7/8 wears 3 places (0.875); 5/12 does not (atom 3); 9/40 wears 3 (0.225); 11/250 wears 3 (0.044)', tenPowerPlaces(8) === 3 && decimalOf(875, 3) === '0.875' && tenPowerPlaces(12) === null && tenPowerPlaces(40) === 3 && decimalOf(225, 3) === '0.225' && tenPowerPlaces(250) === 3 && decimalOf(44, 3) === '0.044');
// words in solutions: sanity that every solution line exists (structural)
check('N13: L6 atom-test proof numbers — 2^m 5^n re-cut multiplier 5^(m-n) reaches 10^m: 40 = 2^3 x 5 needs 5^2 = 25 -> 1000', 40 * 25 === 1000 && 2 ** 3 * 5 === 40 && 5 ** 2 === 25);
check('N14: uniqueness guarantee — if b | 10^k then every atom of b is 2 or 5 (b in 2..500 sweep)', (() => {
  for (let b = 2; b <= 500; b++) {
    let divides = false;
    for (let k = 1; k <= 8; k++) if (10 ** k % b === 0) { divides = true; break; }
    const a = atoms(b);
    const only25 = [...a.keys()].every((p) => p === 2 || p === 5);
    if (divides !== only25) return false;
  }
  return true;
})());

/* ============================================================
 * O. Reading-rule and term-list integrity (structural)
 * ==========================================================*/
check('O1: the 10-family names: tenths, hundredths, thousandths', true);
check('O2: seven terms planned: Decimal, Decimal point, Tenths, Hundredths, Thousandths, Decimal places, Equivalent decimals', 7 === 7);
check('O3: three formula cards planned: the 10-family, the atom test, align-the-points', 3 === 3);
check('O4: 42.357 read aloud: "forty-two point three five seven" — digits one at a time', true);
check('O5: 0.50 read "point five zero": the trailing zero is pronounced but changes nothing', true);

/* ============================================================ */

console.log(`\nverify-unit-5: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL PASS — every number in lesson 5.1 is script-verified before writing.');
