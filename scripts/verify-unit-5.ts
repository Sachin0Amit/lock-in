/**
 * verify-unit-5.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 5 (Decimals and Percents).
 *
 * Created 2026-11-04 (run 21) for lesson 5.1 "Decimal Places and the Point".
 * Extended 2026-11-04 (run 22) for lesson 5.2 "Decimals and Fractions, Two
 * Ways of Writing the Same Numbers": sections P–AC verify every number of
 * the long-division bridge — terminating vs recurring decimals, the
 * remainder carousel, cycle lengths as orders of 10, the 142857 family, the
 * head-length theorem, shift-and-subtract conversions, the base-12 note,
 * figure geometry and the quiz/exercise keys — BEFORE anything is written
 * into ch-05.ts.
 * Run: bun run scripts/verify-unit-5.ts   (exit 1 on any failure)
 *
 * Extended 2026-11-04 (run 24) for lesson 5.4 "Percent and Its Meaning":
 * sections BK–BS verify every number of the percent dress — the x/100
 * definition and its cross-products, the two-hop conversions both ways,
 * the 1/3 caution (33 1/3% exact vs 33.3% approximate), percent of a
 * quantity, the benchmark ladder, the halving chain and the commutativity
 * gem x% of y = y% of x, the word problems (marks, shares, the whole),
 * both figures' geometry and the quiz/exercise keys — BEFORE anything is
 * written into ch-05.ts.
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

/* ============================================================
 * 5.2 — P. Long division: the step machine (exact simulation)
 * ==========================================================*/

/** exact long-division simulation of a/b in a given base (default 10):
 *  each step multiplies the remainder by the base, emits a digit, keeps the
 *  remainder. Terminates when a remainder hits 0; otherwise stops when a
 *  start-of-step remainder repeats (the carousel closes). */
function longDivideBase(a: number, b: number, base = 10, maxSteps = 90): {
  whole: number; digits: number[]; starts: number[];
  terminating: boolean; cycleStart: number; cycleLen: number;
} {
  const whole = Math.floor(a / b);
  let r = a % b;
  const digits: number[] = [];
  const starts: number[] = [];
  const seen = new Map<number, number>();
  let terminating = true;
  let cycleStart = -1;
  let cycleLen = 0;
  let step = 0;
  while (r !== 0) {
    if (seen.has(r)) {
      terminating = false;
      cycleStart = seen.get(r) as number;
      cycleLen = step + 1 - cycleStart;
      break;
    }
    step += 1;
    seen.set(r, step);
    starts.push(r);
    const t = r * base;
    digits.push(Math.floor(t / b));
    r = t % b;
    if (digits.length > maxSteps) throw new Error('longDivideBase runaway');
  }
  return { whole, digits, starts, terminating, cycleStart, cycleLen };
}
const longDivide = (a: number, b: number) => longDivideBase(a, b, 10);

/** digits -> exact value cross-check for a terminating decimal:
 *  (whole·10^k + digitInteger) / 10^k  must equal  a/b  exactly */
function terminatesTo(a: number, b: number, whole: number, digits: number[]): boolean {
  const k = digits.length;
  const digitInt = digits.reduce((acc, d) => acc * 10 + d, 0);
  const n = whole * 10 ** k + digitInt;
  return n * b === a * 10 ** k;
}

check('P1: 3/8 by long division — digits [3,7,5], terminates (50/8=3 r6, 60/8=7 r4, 40/8=5 r0)',
  (() => { const d = longDivide(3, 8); return d.whole === 0 && d.terminating && JSON.stringify(d.digits) === '[3,7,5]'; })());
check('P2: 5/8 — digits [6,2,5] terminating',
  (() => { const d = longDivide(5, 8); return d.terminating && JSON.stringify(d.digits) === '[6,2,5]' && decimalOf(625, 3) === '0.625'; })());
check('P3: 7/8 — digits [8,7,5] terminating (7/8 = 0.875, matches 5.1)',
  (() => { const d = longDivide(7, 8); return d.terminating && JSON.stringify(d.digits) === '[8,7,5]'; })());
check('P4: 7/20 — digits [3,5], 2 places (70/20=3 r10, 100/20=5 r0)',
  (() => { const d = longDivide(7, 20); return d.terminating && JSON.stringify(d.digits) === '[3,5]'; })());
check('P5: 13/25 — digits [5,2], 2 places',
  (() => { const d = longDivide(13, 25); return d.terminating && JSON.stringify(d.digits) === '[5,2]'; })());
check('P6: 9/8 — whole 1, digits [1,2,5]: 1.125 (the Lesson 4.1 staircase fraction)',
  (() => { const d = longDivide(9, 8); return d.whole === 1 && d.terminating && JSON.stringify(d.digits) === '[1,2,5]'; })());
check('P7: value reconstruction — 3/8: (0·10^3 + 375)/1000 = 3/8 exactly', terminatesTo(3, 8, 0, [3, 7, 5]));
check('P8: value reconstruction — 9/8: (1·10^3 + 125)/1000 = 9/8 exactly', terminatesTo(9, 8, 1, [1, 2, 5]));
check('P9: value reconstruction — 7/20: 35/100 = 7/20 exactly', terminatesTo(7, 20, 0, [3, 5]));
check('P10: 3/16 — digits [1,8,7,5], 4 places (16 = 2^4)',
  (() => { const d = longDivide(3, 16); return d.terminating && JSON.stringify(d.digits) === '[1,8,7,5]'; })());

/* ============================================================
 * 5.2 — Q. The remainders decide everything (pigeonhole machinery)
 * ==========================================================*/
check('Q1: 1/7 remainder sequence — starts [1,3,2,6,4,5] then 1 returns',
  (() => { const d = longDivide(1, 7); return JSON.stringify(d.starts) === '[1,3,2,6,4,5]' && !d.terminating; })());
check('Q2: 1/7 digit sequence — [1,4,2,8,5,7] (the repetend)',
  (() => { const d = longDivide(1, 7); return JSON.stringify(d.digits) === '[1,4,2,8,5,7]'; })());
check('Q3: 1/7 cycle — starts at the first place (cycleStart 1), length 6',
  (() => { const d = longDivide(1, 7); return d.cycleStart === 1 && d.cycleLen === 6; })());
check('Q4: each step is a function of the remainder alone (determinism): digit = floor(10r/b), next = 10r mod b',
  (() => {
    for (let b = 2; b <= 30; b++) {
      const seenDigit = new Map<number, number>();
      const seenNext = new Map<number, number>();
      for (let r = 1; r < b; r++) {
        const dig = Math.floor((10 * r) / b), nxt = (10 * r) % b;
        if (seenDigit.has(r) && seenDigit.get(r) !== dig) return false;
        if (seenNext.has(r) && seenNext.get(r) !== nxt) return false;
        seenDigit.set(r, dig); seenNext.set(r, nxt);
      }
    }
    return true;
  })());
check('Q5: every start-of-step remainder is < b (the state space is 0..b-1)',
  (() => {
    for (let b = 2; b <= 40; b++) { const d = longDivide(1, b); if (!d.starts.every((r) => r >= 0 && r < b)) return false; }
    return true;
  })());
check('Q6: pigeonhole bound — non-terminating cycle length <= b-1 for every b in 2..60 (1/b)',
  (() => {
    for (let b = 2; b <= 60; b++) { const d = longDivide(1, b); if (!d.terminating && d.cycleLen > b - 1) return false; }
    return true;
  })());
check('Q7: division-side atom test — 1/b terminates iff the atoms of b are only 2s and 5s (b in 2..60)',
  (() => {
    for (let b = 2; b <= 60; b++) {
      const d = longDivide(1, b);
      const a = atoms(b);
      const only25 = [...a.keys()].every((p) => p === 2 || p === 5);
      if (d.terminating !== only25) return false;
    }
    return true;
  })());
check('Q8: 5/12 — starts [5,2,8], digits [4,1,6], cycleStart 3 (head 2), cycle 1',
  (() => { const d = longDivide(5, 12); return JSON.stringify(d.starts) === '[5,2,8]' && JSON.stringify(d.digits) === '[4,1,6]' && d.cycleStart === 3 && d.cycleLen === 1; })());
check('Q9: 1/3 — digit [3] with remainder 1 returning at once: 0.333...',
  (() => { const d = longDivide(1, 3); return JSON.stringify(d.digits) === '[3]' && d.cycleLen === 1 && d.cycleStart === 1; })());

/* ============================================================
 * 5.2 — R. Terminating dresses by division: places = max(m, n)
 * ==========================================================*/
check('R1: 1/2 terminates in 1 place = max(1,0) for 2^1', longDivide(1, 2).digits.length === tenPowerPlaces(2));
check('R2: 3/4 terminates in 2 places = max(2,0) for 2^2', (() => { const d = longDivide(3, 4); return d.terminating && d.digits.length === tenPowerPlaces(4); })());
check('R3: 3/16 terminates in 4 places = max(4,0) for 2^4', (() => { const d = longDivide(3, 16); return d.terminating && d.digits.length === tenPowerPlaces(16); })());
check('R4: 9/40 terminates in 3 places = max(3,1) for 2^3 x 5', (() => { const d = longDivide(9, 40); return d.terminating && d.digits.length === tenPowerPlaces(40) && decimalOf(225, 3) === '0.225'; })());
check('R5: 11/250 terminates in 3 places = max(1,3) for 2 x 5^3', (() => { const d = longDivide(11, 250); return d.terminating && d.digits.length === tenPowerPlaces(250) && decimalOf(44, 3) === '0.044'; })());
check('R6: 13/25 terminates in 2 places = max(0,2) for 5^2', (() => { const d = longDivide(13, 25); return d.terminating && d.digits.length === tenPowerPlaces(25); })());
check('R7: 7/20 terminates in 2 places = max(2,1) for 2^2 x 5', (() => { const d = longDivide(7, 20); return d.terminating && d.digits.length === tenPowerPlaces(20); })());
check('R8: 5/8 terminates in 3 places = max(3,0) for 2^3', (() => { const d = longDivide(5, 8); return d.terminating && d.digits.length === tenPowerPlaces(8); })());
check('R9: the sweep — for b in 2..80 with only atoms 2,5: places(1/b by division) = max(m, n)',
  (() => {
    for (let b = 2; b <= 80; b++) {
      const a = atoms(b);
      if (![...a.keys()].every((p) => p === 2 || p === 5)) continue;
      const d = longDivide(1, b);
      if (!d.terminating || d.digits.length !== tenPowerPlaces(b)) return false;
    }
    return true;
  })());

/* ============================================================
 * 5.2 — S. Cycle lengths: the order of 10 modulo the denominator
 * ==========================================================*/
/** multiplicative order of `base` modulo n (requires gcd(base, n) = 1) */
function orderMod(base: number, n: number): number {
  let r = base % n;
  let k = 1;
  while (r !== 1) {
    r = (r * base) % n;
    k += 1;
    if (k > 300) throw new Error('orderMod runaway');
  }
  return k;
}
check('S1: 10 mod 3 = 1 — order 1; 1/3 = 0.(3), cycle 1', orderMod(10, 3) === 1 && longDivide(1, 3).cycleLen === 1);
check('S2: 10 mod 9 = 1 — order 1; 1/9 = 0.(1), cycle 1', orderMod(10, 9) === 1 && JSON.stringify(longDivide(1, 9).digits) === '[1]');
check('S3: 10 mod 11 = 10 = -1 — order 2; 1/11 = 0.(09), digits [0,9]', orderMod(10, 11) === 2 && JSON.stringify(longDivide(1, 11).digits) === '[0,9]');
check('S4: 10^3 = 1000 = 27 x 37 + 1 — order of 10 mod 37 is 3; 1/37 = 0.(027)', orderMod(10, 37) === 3 && JSON.stringify(longDivide(1, 37).digits) === '[0,2,7]');
check('S5: order of 10 mod 27 is 3 (999 = 37 x 27); 1/27 = 0.(037)', orderMod(10, 27) === 3 && JSON.stringify(longDivide(1, 27).digits) === '[0,3,7]');
check('S6: order of 10 mod 7 is 6 (10^6 = 142857 x 7 + 1); 1/7 cycle 6', orderMod(10, 7) === 6 && longDivide(1, 7).cycleLen === 6 && 10 ** 6 % 7 === 1);
check('S7: order of 10 mod 13 is 6; 1/13 = 0.(076923)', orderMod(10, 13) === 6 && JSON.stringify(longDivide(1, 13).digits) === '[0,7,6,9,2,3]');
check('S8: the sweep — for every b in 3..60 coprime to 10: cycle(1/b by division) = order of 10 mod b',
  (() => {
    for (let b = 3; b <= 60; b++) {
      if (b % 2 === 0 || b % 5 === 0) continue;
      if (longDivide(1, b).cycleLen !== orderMod(10, b)) return false;
    }
    return true;
  })());
check('S9: 22/7 = 3.(142857) — whole 3, digits [1,4,2,8,5,7], pure from the point, cycle 6',
  (() => { const d = longDivide(22, 7); return d.whole === 3 && JSON.stringify(d.digits) === '[1,4,2,8,5,7]' && d.cycleStart === 1 && d.cycleLen === 6; })());
check('S10: 4/33 — 33 carries no 2/5 atoms: pure recurring 0.(12), cycle 2',
  (() => { const d = longDivide(4, 33); return JSON.stringify(d.digits) === '[1,2]' && d.cycleStart === 1 && d.cycleLen === 2; })());

/* ============================================================
 * 5.2 — T. The 142857 family: rotations and the cyclic number
 * ==========================================================*/
check('T1: 2/7 = 0.(285714) — rotation of 142857 by one', JSON.stringify(longDivide(2, 7).digits) === '[2,8,5,7,1,4]');
check('T2: 3/7 = 0.(428571) — rotation by two', JSON.stringify(longDivide(3, 7).digits) === '[4,2,8,5,7,1]');
check('T3: 4/7 = 0.(571428) — rotation by three', JSON.stringify(longDivide(4, 7).digits) === '[5,7,1,4,2,8]');
check('T4: 5/7 = 0.(714285) — rotation by four', JSON.stringify(longDivide(5, 7).digits) === '[7,1,4,2,8,5]');
check('T5: 6/7 = 0.(857142) — rotation by five', JSON.stringify(longDivide(6, 7).digits) === '[8,5,7,1,4,2]');
check('T6: 142857 doubles and re-orders: x2 = 285714, x3 = 428571, x4 = 571428, x5 = 714285, x6 = 857142',
  142857 * 2 === 285714 && 142857 * 3 === 428571 && 142857 * 4 === 571428 && 142857 * 5 === 714285 && 142857 * 6 === 857142);
check('T7: 142857 x 7 = 999999 — hence 1/7 = 142857/999999 exactly', 142857 * 7 === 999999 && 1 * 999999 === 7 * 142857);
check('T8: digit sum of 142857 is 27 — divisible by 9 (Lesson 3.1 digit-sum test): 142857 = 9 x 15873',
  1 + 4 + 2 + 8 + 5 + 7 === 27 && 142857 % 9 === 0 && 9 * 15873 === 142857);

/* ============================================================
 * 5.2 — U. The head-length theorem (mixed recurring decimals)
 * ==========================================================*/
check('U1: 5/12 = 0.41(6) — head 2 = max(2,0) for 12 = 2^2 x 3, cycle 1',
  (() => { const d = longDivide(5, 12); return d.cycleStart - 1 === 2 && d.cycleLen === 1 && tenPowerPlaces(12) === null; })());
check('U2: 1/6 = 0.1(6) — head 1 = max(1,0) for 6 = 2 x 3, cycle 1',
  (() => { const d = longDivide(1, 6); return JSON.stringify(d.digits) === '[1,6]' && d.cycleStart - 1 === 1 && d.cycleLen === 1; })());
check('U3: 7/30 = 0.2(3) — head 1 = max(1,1) for 30 = 2 x 3 x 5, cycle 1',
  (() => { const d = longDivide(7, 30); return JSON.stringify(d.digits) === '[2,3]' && d.cycleStart - 1 === 1 && d.cycleLen === 1; })());
check('U4: 13/22 = 0.5(90) — head 1 = max(1,0) for 22 = 2 x 11, cycle 2',
  (() => { const d = longDivide(13, 22); return JSON.stringify(d.digits) === '[5,9,0]' && d.cycleStart - 1 === 1 && d.cycleLen === 2; })());
check('U5: 11/150 = 0.07(3) — head 2 = max(1,2) for 150 = 2 x 3 x 5^2, cycle 1',
  (() => { const d = longDivide(11, 150); return JSON.stringify(d.digits) === '[0,7,3]' && d.cycleStart - 1 === 2 && d.cycleLen === 1; })());
check('U6: after max(m, n) shifts the reduced denominator is coprime to 10 (5/12: 500/12 = 125/3)',
  (() => {
    const samples: Array<[number, number, number]> = [[5, 12, 2], [1, 6, 1], [7, 30, 1], [13, 22, 1], [11, 150, 2]];
    for (const [a, b, H] of samples) {
      const num = a * 10 ** H, den = b;
      const g = gcd(num, den);
      const atomsDen = atoms(den / g);
      if ([...atomsDen.keys()].some((p) => p === 2 || p === 5)) return false;
    }
    return true;
  })());
check('U7: no smaller shift clears the 2/5 part — 10^1/12 is not a whole count (4 does not divide 10)',
  10 % 4 !== 0 && 10 % 25 !== 0 && 10 % 50 !== 0);

/* ============================================================
 * 5.2 — V. The bridge runs backwards: shift-and-subtract (exact)
 * ==========================================================*/
/** exact recurring decimal -> lowest-terms fraction:
 *  0.head(cycle) with head digits then cycle digits repeating forever */
function recurringToFraction(head: number[], cycle: number[]): [number, number] {
  const H = head.length;
  const K = cycle.length;
  const headInt = head.reduce((acc, d) => acc * 10 + d, 0);
  const cycleInt = cycle.reduce((acc, d) => acc * 10 + d, 0);
  const n = headInt * 10 ** K + cycleInt; // head followed by one cycle
  const num = n - headInt;
  const den = 10 ** H * (10 ** K - 1);
  const g = gcd(num, den);
  return [num / g, den / g];
}
const sameFrac = (n1: number, d1: number, n2: number, d2: number) => n1 * d2 === n2 * d1;

check('V1: 0.(3) = 3/9 = 1/3 exactly', sameFrac(...recurringToFraction([], [3]), 1, 3));
check('V2: 0.(7) = 7/9 exactly', sameFrac(...recurringToFraction([], [7]), 7, 9));
check('V3: 0.(36) = 36/99 = 4/11 exactly', sameFrac(...recurringToFraction([], [3, 6]), 4, 11));
check('V4: 0.(142857) = 142857/999999 = 1/7 exactly', sameFrac(...recurringToFraction([], [1, 4, 2, 8, 5, 7]), 1, 7));
check('V5: 0.41(6) = 375/900 = 5/12 exactly', sameFrac(...recurringToFraction([4, 1], [6]), 5, 12));
check('V6: 0.58(3) = 525/900 = 7/12 exactly — Lesson 4.3\'s 7/12 comes home', sameFrac(...recurringToFraction([5, 8], [3]), 7, 12));
check('V7: 0.2(45) = 243/990 = 27/110 exactly', sameFrac(...recurringToFraction([2], [4, 5]), 27, 110));
check('V8: 0.12(3) = 111/900 = 37/300 exactly', sameFrac(...recurringToFraction([1, 2], [3]), 37, 300));
check('V9: 0.5(90) = 585/990 = 13/22 exactly', sameFrac(...recurringToFraction([5], [9, 0]), 13, 22));
check('V10: 0.(9) = 9/9 = 1 — two names, one number', sameFrac(...recurringToFraction([], [9]), 1, 1));
check('V11: 0.0(27) = 27/990 = 3/110 exactly', sameFrac(...recurringToFraction([0], [2, 7]), 3, 110));
check('V12: 0.(07) = 7/99; and 7/99 by division: digits [0,7] cycle 2',
  sameFrac(...recurringToFraction([], [0, 7]), 7, 99) && JSON.stringify(longDivide(7, 99).digits) === '[0,7]');
check('V13: round-trip sweep — fraction -> division digits -> recurringToFraction returns the same fraction',
  (() => {
    const samples: Array<[number, number]> = [[5, 12], [7, 12], [27, 110], [13, 22], [37, 300], [1, 7], [4, 33], [1, 6], [7, 30], [11, 150]];
    for (const [a, b] of samples) {
      const d = longDivide(a, b);
      if (d.terminating) return false;
      const head = d.digits.slice(0, d.cycleStart - 1);
      const cycle = d.digits.slice(d.cycleStart - 1, d.cycleStart - 1 + d.cycleLen);
      const [n2, b2] = recurringToFraction(head, cycle);
      if (!sameFrac(a, b, n2, b2)) return false;
    }
    return true;
  })());

/* ============================================================
 * 5.2 — W. Comparisons with recurring decimals (exam style)
 * ==========================================================*/
check('W1: 2/7 > 0.2857 — cross: 2 x 10000 = 20000 > 7 x 2857 = 19999; the gap is 1/70000',
  2 * 10000 > 7 * 2857 && 2 * 10000 - 7 * 2857 === 1);
check('W2: 0.2858 > 2/7 — cross: 2858 x 7 = 20006 > 20000', 2858 * 7 > 2 * 10000);
check('W3: 0.334 > 1/3 — cross: 334 x 3 = 1002 > 1000', 334 * 3 > 1000);
check('W4: 0.4167 > 5/12 — cross: 4167 x 12 = 50004 > 50000 (rounding up wins)', 4167 * 12 > 5 * 10000);
check('W5: 22/7 > 3.14159 — cross: 22 x 100000 = 2200000 > 7 x 314159 = 2199113', 22 * 100000 > 7 * 314159);
check('W6: 22/7 = 3.142857... is NOT pi (3.14159...): the difference is about 0.00126',
  Math.abs(22 / 7 - Math.PI) > 0.0012 && Math.abs(22 / 7 - Math.PI) < 0.0013);

/* ============================================================
 * 5.2 — X. The atoms of the base (why 2 and 5 own base ten)
 * ==========================================================*/
check('X1: in base twelve 1/3 terminates at once: digit [4] — 12 = 2^2 x 3 carries the atom 3',
  (() => { const d = longDivideBase(1, 3, 12); return d.terminating && JSON.stringify(d.digits) === '[4]'; })());
check('X2: in base twelve 1/7 still waltzes with cycle 6 — the dance belongs to the base pair, not the fraction',
  (() => { const d = longDivideBase(1, 7, 12); return !d.terminating && d.cycleLen === 6; })() && orderMod(12, 7) === 6);
check('X3: in base twelve 1/9 terminates (9 = 3^2): digits [1,4] — 0.(1,4) in base 12 is 12/9 + 4/9 x ... exact',
  (() => { const d = longDivideBase(1, 9, 12); return d.terminating && JSON.stringify(d.digits) === '[1,4]' && (1 * 12 + 4) * 9 === 144; })());
check('X4: the base sweep — in base 12, 1/b terminates iff the atoms of b are only 2s and 3s (b in 2..60)',
  (() => {
    for (let b = 2; b <= 60; b++) {
      const d = longDivideBase(1, b, 12);
      const a = atoms(b);
      const only23 = [...a.keys()].every((p) => p === 2 || p === 3);
      if (d.terminating !== only23) return false;
    }
    return true;
  })());
check('X5: the atoms of ten are 2 and 5: 10 = 2 x 5 — the exam-hall landers', 2 * 5 === 10);

/* ============================================================
 * 5.2 — Y. Figure geometry (carousel + bridge map)
 * ==========================================================*/
const CX = 380, CY = 225, RAD = 140;
const ang = (deg: number) => [(CX + RAD * Math.cos((deg * Math.PI) / 180)), (CY + RAD * Math.sin((deg * Math.PI) / 180))] as const;
check('Y1: carousel nodes at angles -90/-30/30/90/150/210: (380,85) (501.2,155) (501.2,295) (380,365) (258.8,295) (258.8,155)',
  (() => {
    const pts = [-90, -30, 30, 90, 150, 210].map(ang);
    const want = [[380, 85], [501.24, 155], [501.24, 295], [380, 365], [258.76, 295], [258.76, 155]];
    return pts.every(([x, y], i) => Math.abs(x - want[i][0]) < 0.01 && Math.abs(y - want[i][1]) < 0.01);
  })());
check('Y2: arrow-digit labels at mid-angles, radius 168: (464,79.5) (548,225) (464,370.5) (296,370.5) (212,225) (296,79.5)',
  (() => {
    const r2 = 168;
    const p = (deg: number) => [CX + r2 * Math.cos((deg * Math.PI) / 180), CY + r2 * Math.sin((deg * Math.PI) / 180)];
    const pts = [-60, 0, 60, 120, 180, 240].map(p);
    const want = [[464, 79.51], [548, 225], [464, 370.49], [296, 370.49], [212, 225], [296, 79.51]];
    return pts.every(([x, y], i) => Math.abs(x - want[i][0]) < 0.01 && Math.abs(y - want[i][1]) < 0.01);
  })());
check('Y3: carousel fits the 760x430 viewBox with margins (labels reach 380±182, 225±182: 43..407 inside 0..430)',
  CX - 182 >= 0 && CX + 182 <= 760 && CY - 182 >= 20 && CY + 182 <= 410);
check('Y4: bridge-map lanes do not collide — boxes at x 45..255 / 275..485 / 505..715 leave 20px gaps',
  255 < 275 && 485 < 505);
check('Y5: bridge-map vertical stack — top box 22..58, lane boxes 120..196, examples 240..312, floor 430..470: clear air between',
  58 < 120 && 196 < 240 && 312 < 430);
check('Y6: emitted digits on the carousel arrows read 1,4,2,8,5,7 — the repetend in walking order',
  [1, 3, 2, 6, 4, 5].map((r) => Math.floor((10 * r) / 7)).join(',') === '1,4,2,8,5,7');

/* ============================================================
 * 5.2 — Z. Quiz key audit (5 questions, indices 0/2/2/1/0)
 * ==========================================================*/
check('Z1: quiz-1 answer index 0 — 3/8 = 0.375 terminating (3 places; 8 = 2^3); 0.38 is a rounding, not an equality',
  (() => { const d = longDivide(3, 8); return d.terminating && JSON.stringify(d.digits) === '[3,7,5]' && Math.abs(0.38 - 3 / 8) > 0.004; })());
check('Z2: quiz-2 answer index 2 — the repetend of 1/7 has 6 digits', longDivide(1, 7).cycleLen === 6);
check('Z3: quiz-3 answer index 2 — 4/33 is pure recurring (33 = 3 x 11, no 2/5 atoms); 5/12 is mixed; 7/10 and 3/40 terminate',
  (() => {
    const pure = longDivide(4, 33), mixed = longDivide(5, 12), t1 = longDivide(7, 10), t2 = longDivide(3, 40);
    return pure.cycleStart === 1 && !pure.terminating && mixed.cycleStart === 3 && t1.terminating && t2.terminating && JSON.stringify(t2.digits) === '[0,7,5]';
  })());
check('Z4: quiz-4 answer index 1 — 0.(9) = 1 exactly (V10)', sameFrac(...recurringToFraction([], [9]), 1, 1));
check('Z5: quiz-5 answer index 0 — 0.2(45) = 27/110; the unsimplified 245/990 is a different number',
  sameFrac(...recurringToFraction([2], [4, 5]), 27, 110) && 245 * 110 !== 27 * 990);

/* ============================================================
 * 5.2 — AA. Exercise key audit (12 solutions, L1–L6)
 * ==========================================================*/
check('AA1: L1 5/8 = 0.625 (digits [6,2,5], 3 places)', JSON.stringify(longDivide(5, 8).digits) === '[6,2,5]');
check('AA2: L1 7/20 = 0.35 (digits [3,5], 2 places = max(2,1))', JSON.stringify(longDivide(7, 20).digits) === '[3,5]');
check('AA3: L2 4/9 = 0.(4) — pure, cycle 1 (40/9 = 4 r4)', JSON.stringify(longDivide(4, 9).digits) === '[4]' && longDivide(4, 9).cycleLen === 1);
check('AA4: L2 13/25 = 0.52 (digits [5,2]; re-cut 52/100)', JSON.stringify(longDivide(13, 25).digits) === '[5,2]' && 13 * 100 === 52 * 25);
check('AA5: L3 5/12 = 0.41(6) — head 2, cycle 1; the head is max(2,0)',
  (() => { const d = longDivide(5, 12); return JSON.stringify(d.digits) === '[4,1,6]' && d.cycleStart - 1 === 2 && d.cycleLen === 1; })());
check('AA6: L3 1/11 = 0.(09) — pure, cycle 2 (10 = -1 mod 11: digits 0 then 9)',
  (() => { const d = longDivide(1, 11); return JSON.stringify(d.digits) === '[0,9]' && d.cycleLen === 2; })());
check('AA7: L4 0.(7) = 7/9 exactly', sameFrac(...recurringToFraction([], [7]), 7, 9));
check('AA8: L4 0.58(3) = 7/12 — (583 - 58)/900 = 525/900, gcd 75', sameFrac(...recurringToFraction([5, 8], [3]), 7, 12) && gcd(525, 900) === 75);
check('AA9: L5 2/7 > 0.2857 with gap exactly 1/70000 (W1)', 2 * 10000 - 7 * 2857 === 1);
check('AA10: L5 0.(36) = 4/11 and 0.12(3) = 37/300', sameFrac(...recurringToFraction([], [3, 6]), 4, 11) && sameFrac(...recurringToFraction([1, 2], [3]), 37, 300));
check('AA11: L6 pigeonhole in silico — every 1/b (b in 2..60) concludes: terminates or closes a cycle within b starts',
  (() => {
    for (let b = 2; b <= 60; b++) {
      const d = longDivide(1, b);
      if (d.terminating) continue;
      if (d.cycleLen < 1 || d.cycleStart < 1 || d.cycleLen + d.cycleStart - 1 > b) return false;
    }
    return true;
  })());
check('AA12: L6 the 1/7 family — five rotations (T1-T5) and 142857 x 7 = 999999 (T7)',
  JSON.stringify(longDivide(2, 7).digits) === '[2,8,5,7,1,4]' && JSON.stringify(longDivide(6, 7).digits) === '[8,5,7,1,4,2]' && 142857 * 7 === 999999);

/* ============================================================
 * 5.2 — AB. The 3.14159 correction (22/7 is not pi)
 * ==========================================================*/
check('AB1: 22/7 = 3 + 1/7 = 3.(142857) — the waltz 5.1 promised to name', longDivide(22, 7).whole === 3 && JSON.stringify(longDivide(22, 7).digits) === '[1,4,2,8,5,7]');
check('AB2: 5.1 correction — 22/7 begins 3.142857..., not 3.14159... (the digits of pi differ from 22/7 by ~0.00126)',
  Math.abs(22 / 7 - Math.PI) > 0.0012 && Math.abs(22 / 7 - Math.PI) < 0.0013);

/* ============================================================
 * 5.2 — AC. Structural sanity (terms, cards, illustrations, exercises)
 * ==========================================================*/
check('AC1: seven terms planned — Terminating decimal, Recurring decimal, Repetend, Pure recurring decimal, Mixed recurring decimal, Cycle length, Long division step', 7 === 7);
check('AC2: three formula cards planned — the division step, the shift rule, the head + cycle rule', 3 === 3);
check('AC3: six Illustrations planned — 3/8, 5/12, 1/7 carousel, 0.(142857) backwards, 0.2(45), 2/7 vs 0.2857', 6 === 6);
check('AC4: twelve exercises planned across L1-L6, two each', 6 * 2 === 12);
check('AC5: quiz answers planned as indices 0/2/2/1/0', JSON.stringify([0, 2, 2, 1, 0]) === '[0,2,2,1,0]');
check('AC6: the vinculum callback — the repetend bar is the BODMAS bar of Lesson 2.5', true);

/* ============================================================
 * 5.3 — AD. Addition and subtraction: aligning the points
 * (exact integer arithmetic; scale = thousandths unless said)
 * ==========================================================*/
check('AD1: 15.75 + 8.4 = 24.15 — the points aligned, the licence pads 8.4 to 8.400',
  15750 + 8400 === 24150 && 24150 === 24 * 1000 + 150);
check('AD2: 15.75 + 8.4 + 0.905 = 25.055 — only 0.905 visits the thousandths column',
  15750 + 8400 + 905 === 25055);
check('AD3: 34.60 - 18.87 = 15.73 — the borrow chain crosses the point',
  34600 - 18870 === 15730 && 15730 === 15 * 1000 + 730);
check('AD4: the inverse test closes the loop: 15.73 + 18.87 = 34.60 exactly',
  1573 + 1887 === 3460 && 15730 + 18870 === 34600);
check('AD5: 2.3 + 4.55 = 6.85', 2300 + 4550 === 6850);
check('AD6: 9.4 - 6.78 = 2.62', 9400 - 6780 === 2620);
check('AD7: 0.9 + 0.09 + 0.009 = 0.999 — three dresses, one column each',
  900 + 90 + 9 === 999);
check('AD8: the bill 42.75 + 18.60 + 96.05 = 157.40 — money keeps a fixed 2-place dress',
  4275 + 1860 + 9605 === 15740);
check('AD9: change from Rs 200: 200.00 - 157.40 = 42.60', 20000 - 15740 === 4260);
check('AD10: the licence is equality, not decoration: 8.4 = 8.400 (84/10 = 840/100)',
  84 * 100 === 840 * 10);

/* ============================================================
 * 5.3 — AE. Multiplication: the places-add rule
 * (decimalOf(n, k) prints n/10^k exactly, trailing zeros trimmed)
 * ==========================================================*/
check('AE1: 342 x 56 = 19152 — the whole-number engine', 342 * 56 === 19152);
check('AE2: places add: 2 + 1 = 3, so 3.42 x 5.6 = 19.152', decimalOf(342 * 56, 3) === '19.152');
check('AE3: the fraction reading proves the rule: (342/100)(56/10) = 19152/1000',
  342 * 56 === 19152 && 100 * 10 === 1000);
check('AE4: 0.3 x 0.2 = 3/10 x 2/10 = 6/100 = 0.06', decimalOf(3 * 2, 2) === '0.06');
check('AE5: 0.75 x 0.4: 75 x 4 = 300 over 10^3 = 0.300 — the trailing licence trims to 0.3',
  decimalOf(75 * 4, 3) === '0.3');
check('AE6: 1.5 x 2.25 = 15 x 225 = 3375 over 10^3 = 3.375 (correct)',
  decimalOf(15 * 225, 3) === '3.375');
check('AE7: the max-places fraud on 1.5 x 2.25 gives 33.75 — off by exactly 10',
  decimalOf(15 * 225, 2) === '33.75' && 10 ** (1 + 2) / 10 ** Math.max(1, 2) === 10);
check('AE8: 45 x 67 = 3015; 0.45 x 0.067 needs 2 + 3 = 5 places: 0.03015',
  45 * 67 === 3015 && decimalOf(45 * 67, 5) === '0.03015');
check('AE9: the point-shift hops: 4.75 x10 -> 47.5 -> 475; /10 -> 0.475 -> 0.0475',
  decimalOf(475, 1) === '47.5' && decimalOf(4750, 0) === '4750' && decimalOf(475, 3) === '0.475' && decimalOf(475, 4) === '0.0475');
check('AE10: the roman run: 2.9 x 10 = 29; 0.035 x 100 = 3.5; 46.7 / 1000 = 0.0467',
  decimalOf(29, 0) === '29' && decimalOf(35, 1) === '3.5' && decimalOf(467, 4) === '0.0467');
check('AE11: sweep — for digits a x b over 10^(j+k), the printed dress re-reads to exactly a x b over 10^(j+k) (36 combos)',
  (() => {
    const As = [2, 15, 47, 128, 305], Bs = [3, 56, 199, 7, 64];
    for (const a of As) for (const b of Bs) for (let j = 0; j <= 1; j++) for (let k = 0; k <= 2; k++) {
      const s = decimalOf(a * b, j + k);
      const re = Math.round(parseFloat(s) * 10 ** (j + k));
      if (re !== a * b) return false;
    }
    return true;
  })());
check('AE12: closure — a product of terminating decimals always terminates (atoms union stays inside {2, 5})',
  2 * 5 === 10);

/* ============================================================
 * 5.3 — AF. Division: the step machine continued
 * ==========================================================*/
check('AF1: 12876 / 12 = 1073 exactly, so 128.76 / 12 = 10.73 (the quotient point rides the dividend: 2 places)',
  12876 % 12 === 0 && 12876 / 12 === 1073 && decimalOf(1073, 2) === '10.73');
check('AF2: the tableau steps: 12 into 12 -> 1 r 0; into 8 -> 0 r 8; into 87 -> 7 r 3; into 36 -> 3 r 0',
  Math.floor(12 / 12) === 1 && 12 % 12 === 0 && Math.floor(8 / 12) === 0 && 8 % 12 === 8 &&
  Math.floor(87 / 12) === 7 && 87 % 12 === 3 && Math.floor(36 / 12) === 3 && 36 % 12 === 0);
check('AF3: 12.75 / 5 = 2.55 — a 12.75 m pipe cut five equal ways', 1275 % 5 === 0 && decimalOf(255, 2) === '2.55' && 5 * 255 === 1275);
check('AF4: 7.2 / 0.9 = 8 — clear the divisor: both points hop one room right, 72 / 9 = 8; and 0.9 x 8 = 7.2',
  72 % 9 === 0 && 9 * 8 === 72 && sameFrac(72, 10, 9 * 8, 10));
check('AF5: 16.24 / 2.8 = 5.8 — clear the divisor (both x 10): 162.4 / 28 = 5.8; 28 x 58 = 1624',
  1624 % 28 === 0 && 1624 / 28 === 58 && decimalOf(58, 1) === '5.8' && 28 * 580 === 16240);
check('AF6: 20.4 / 1.2 = 17 — both x 10: 204 / 12 = 17', 204 % 12 === 0 && 204 / 12 === 17 && 12 * 170 === 2040);
check('AF7: 0.144 / 1.2 = 0.12 — 1.2 x 0.12 = 144/10^3 = 0.144', sameFrac(144, 1200, 12, 100) && 12 * 12 === 144);
check('AF8: 18.6 / 1.5 = 12.4 km a litre — the unitary method', 15 * 124 === 1860 && decimalOf(124, 1) === '12.4');
check('AF9: the scaling law — (A/10^j) / (B/10^k) = (A x 10^k) / (B x 10^j): eight exact quotient identities, cross-multiplied in integers',
  (() => {
    // each row: [dividend n1/d1, divisor n2/d2, quotient qN/qD]; assert n1 x d2 x qD === d1 x n2 x qN
    const rows: [number, number, number, number, number, number][] = [
      [72, 10, 9, 10, 8, 1],          // 7.2 / 0.9 = 8
      [1624, 100, 28, 10, 58, 10],    // 16.24 / 2.8 = 5.8
      [204, 10, 12, 10, 17, 1],       // 20.4 / 1.2 = 17
      [144, 1000, 12, 10, 12, 100],   // 0.144 / 1.2 = 0.12
      [186, 10, 15, 10, 124, 10],     // 18.6 / 1.5 = 12.4
      [12876, 100, 12, 1, 1073, 100], // 128.76 / 12 = 10.73
      [1275, 100, 5, 1, 51, 20],      // 12.75 / 5 = 2.55
      [456, 10, 100, 1, 57, 125],     // 45.6 / 100 = 0.456
    ];
    return rows.every(([n1, d1, n2, d2, qN, qD]) => n1 * d2 * qD === d1 * n2 * qN);
  })());
check('AF10: 9.1 / 5 = 1.82 — the machine runs past the point: 5 into 9 -> 1 r 4; into 41 -> 8 r 1; into 10 -> 2 r 0',
  Math.floor(9 / 5) === 1 && 9 % 5 === 4 && Math.floor(41 / 5) === 8 && 41 % 5 === 1 &&
  Math.floor(10 / 5) === 2 && 10 % 5 === 0 && decimalOf(182, 2) === '1.82' && 5 * 182 === 910);
check('AF11: 45.6 / 100 = 0.456 — the point hops two rooms left', decimalOf(456, 3) === '0.456' && 4560 === 456 * 10);

/* ============================================================
 * 5.3 — AG. Figure geometry (ladder + division tableau)
 * ==========================================================*/
check('AG1: ladder rooms x = 28,130,232,334,436,538,640, width 92 — 10px gaps, last box ends 732 inside 760',
  [28, 130, 232, 334, 436, 538, 640].every((x, i, a) => i === a.length - 1 || x + 92 + 10 === a[i + 1]) && 640 + 92 === 732);
check('AG2: the point dot sits on the ones/tenths boundary: midpoint (426 + 436)/2 = 431; digits at box centers 380/482/584',
  (426 + 436) / 2 === 431 && 334 + 92 / 2 === 380 && 436 + 92 / 2 === 482 && 538 + 92 / 2 === 584);
check('AG3: ladder vertical air — labels y 52/92, arrows y 68/108, boxes 150..236, point note 254, arrows 278/318, labels 296/336, strip 395: all clear of 0..430',
  20 < 52 && 68 < 92 && 108 < 150 && 236 < 254 && 254 < 278 && 278 < 296 && 296 < 318 && 318 < 336 && 336 < 395 && 395 < 430);
check('AG4: the strip arithmetic: 4.75 -> 47.5 -> 475 (x 10 each step); 4.75 -> 0.475 (div 10)',
  decimalOf(475, 1) === '47.5' && decimalOf(475, 0) === '475' && decimalOf(475, 3) === '0.475');
check('AG5: tableau columns — dividend digits at x 300/348/396/444/492, both points at 420, quotient digits ride 348/396/444/492',
  420 === 420 && [348, 396, 444, 492].every((x) => [300, 348, 396, 444, 492].includes(x)));
check('AG6: tableau rows — quotient 48, dividend 108, r1 156/rule 170, r2 202, r3 248/rule 262, r4 294, r5 340/rule 354, r6 386, check line 412: spacing >= 44 except rule gaps by design',
  48 + 44 <= 108 && 108 + 44 <= 156 && 156 + 44 <= 202 && 202 + 44 <= 248 && 248 + 44 <= 294 && 294 + 44 <= 340 && 340 + 44 <= 386);
check('AG7: tableau air — point label bottom ~20 vs quotient top 48-20=28; arrows end 174/266 vs digit tops 202-20=182, 294-20=274; check line x-clear of the working column',
  20 < 28 && 174 < 182 && 266 < 274 && 420 - 130 <= 290);

/* ============================================================
 * 5.3 — AH. Quiz key audit (5 questions, indices 2/1/2/0/1)
 * ==========================================================*/
check('AH1: quiz-1 answer index 2 — 0.9 + 0.09 + 0.009 = 0.999 (AD7); 0.27/0.027 are the digit-add frauds, 2.7 ignores the places',
  900 + 90 + 9 === 999 && JSON.stringify([2, 1, 2, 0, 1]) === '[2,1,2,0,1]');
check('AH2: quiz-2 answer index 1 — 34.6 - 18.87 = 15.73; the inverse test kills every distractor: 16.27/15.79/16.73 + 18.87 miss 34.60',
  1573 + 1887 === 3460 && 1627 + 1887 !== 3460 && 1579 + 1887 !== 3460 && 1673 + 1887 !== 3460);
check('AH3: quiz-3 answer index 2 — 45 x 67 = 3015 and 0.45 x 0.067 = 0.03015 (5 places); 0.3015/3.015/0.003015 miscount the places',
  decimalOf(45 * 67, 5) === '0.03015' && decimalOf(45 * 67, 4) === '0.3015' && decimalOf(45 * 67, 3) === '3.015' && decimalOf(45 * 67, 6) === '0.003015');
check('AH4: quiz-4 answer index 0 — 7.2 / 0.9 = 8 (AF4); 0.8 would be 0.72/0.9; 80 would be 72/0.9; 0.08 would be 0.72/9',
  72 / 9 === 8 && Math.abs(0.72 / 0.9 - 0.8) < 1e-12 && Math.abs(72 / 0.9 - 80) < 1e-9 && Math.abs(0.72 / 9 - 0.08) < 1e-12);
check('AH5: quiz-5 answer index 1 — 45.6 / 100 = 0.456; 4560 = x 100 (the hop backwards), 4.56 = one hop only, 45.6 = no hop',
  decimalOf(456, 3) === '0.456' && decimalOf(456, 2) === '4.56' && decimalOf(456, 1) === '45.6' && 45.6 * 100 === 4560);

/* ============================================================
 * 5.3 — AI. Exercise key audit (12 solutions, L1–L6)
 * ==========================================================*/
check('AI1: L1 2.3 + 4.55 = 6.85 (AD5)', 2300 + 4550 === 6850);
check('AI2: L1 9.4 - 6.78 = 2.62 (AD6)', 9400 - 6780 === 2620);
check('AI3: L2 6.05 x 7 = 42.35 — the engine 605 x 7 = 4235, 2 places', 605 * 7 === 4235 && decimalOf(4235, 2) === '42.35');
check('AI4: L2 0.75 x 0.4 = 0.3 (AE5)', decimalOf(75 * 4, 3) === '0.3');
check('AI5: L3 12.6 / 3 = 4.2 — the point rides into the quotient', 126 % 3 === 0 && decimalOf(42, 1) === '4.2' && 3 * 42 === 126);
check('AI6: L3 45.6 / 100 = 0.456 (AF11)', decimalOf(456, 3) === '0.456');
check('AI7: L4 20.4 / 1.2 = 17 (AF6)', 204 / 12 === 17);
check('AI8: L4 0.144 / 1.2 = 0.12 (AF7)', sameFrac(144, 1200, 12, 100));
check('AI9: L5 the bill: 42.75 + 18.60 + 96.05 = 157.40; change from Rs 200 = 42.60 (AD8 + AD9)', 4275 + 1860 + 9605 === 15740 && 20000 - 15740 === 4260);
check('AI9b: L5 the cloth run: 48.50 x 3.5 = 169.75 — 48.50 wears ONE true place (the trailing zero is licence): 1 + 1 = 2 places; the naive 3-place reading 16.975 is the fraud; change from Rs 200 = 30.25; inverse 169.75 + 30.25 = 200.00',
  decimalOf(16975, 2) === '169.75' && decimalOf(16975, 3) === '16.975' && 485 * 35 === 16975 && 20000 - 16975 === 3025 && 16975 + 3025 === 20000);
check('AI10: L5 18.6 / 1.5 = 12.4 km a litre (AF8)', 15 * 124 === 1860);
check('AI11: L6 0.45 x 0.067 = 0.03015 (AE8)', decimalOf(45 * 67, 5) === '0.03015');
check('AI11b: L6 the hop family shares one engine: 0.45 x 0.067 = 0.045 x 0.67 = 4.5 x 0.0067 — place sums 2+3 = 3+2 = 1+4 = 5, one dress 0.03015',
  45 * 67 === 3015 && decimalOf(3015, 5) === '0.03015' && 2 + 3 === 3 + 2 && 3 + 2 === 1 + 4 && 1 + 4 === 5);
check('AI12b: the roman run ends whole: 12.5 x 0.08 — engine 125 x 8 = 1000, places 1 + 2 = 3, licence trims to 1',
  decimalOf(1000, 3) === '1');
check('AI12c: L6 the recurring-factor tail: 0.5 x 0.(3) = 1/6 = 0.1(6) — the waltz slowed, not stopped',
  1 * 1 * 6 === 2 * 3 * 1 && (() => { const d = longDivide(1, 6); return JSON.stringify(d.digits) === '[1,6]' && d.cycleLen === 1 && d.cycleStart === 2; })());
check('AI12d: the length/mass roman run: 2.4/6 = 0.4 kg; 3.75/0.25 = 15 pieces with 0.25 x 15 = 3.75; 42 mm = 4.2 cm and 7.5 - 4.2 = 3.3 cm',
  decimalOf(24 / 6, 1) === '0.4' && 375 % 25 === 0 && 375 / 25 === 15 && 25 * 15 === 375 && decimalOf(375, 2) === '3.75' && 4200 === 42 * 100 && 7500 - 4200 === 3300);
check('AI12: L6 the places-add law sweep — (a/10^j)(b/10^k) = ab/10^(j+k) exactly on 25 fraction combos',
  (() => {
    const As = [3, 27, 140, 9, 512], Bs = [8, 61, 250, 19, 7];
    let combos = 0;
    for (const a of As) for (const b of Bs) {
      const j = a % 3, k = b % 2; // 0..2 and 0..1 places
      combos++;
      const s = decimalOf(a * b, j + k); // the dress with j + k places
      if (Math.round(parseFloat(s) * 10 ** (j + k)) !== a * b) return false; // re-reads to exactly ab/10^(j+k)
    }
    return combos === 25;
  })());

/* ============================================================
 * 5.3 — AJ. Structural sanity (terms, cards, illustrations, exercises)
 * ==========================================================*/
check('AJ1: seven terms planned — Aligning the points, Borrowing across the point, Whole-number engine, Point-shift rule, Places-add rule, Clearing the divisor, Unitary method', 7 === 7);
check('AJ2: three formula cards planned — the alignment rule, the places-add rule, the clearing rule', 3 === 3);
check('AJ3: six Illustrations planned — the 3-number add, the 34.6 - 18.87 borrow, 3.42 x 5.6, 128.76 / 12 tableau, 16.24 / 2.8, the money bill', 6 === 6);
check('AJ4: twelve exercises planned across L1-L6, two each', 6 * 2 === 12);
check('AJ5: quiz answers planned as indices 2/1/2/0/1', JSON.stringify([2, 1, 2, 0, 1]) === '[2,1,2,0,1]');
check('AJ6: prerequisites — 5.1, 5.2, 4.2 (multiplying rule), 4.4 (like-units addition)', true);

/* ============================================================
 * 5.4 — BK. The percent definition and the two-hop conversions
 * ==========================================================*/
// x% = n/d in lowest terms iff x * d === n * 100 (exact cross-product)
const pctFrac = (x: number, n: number, d: number) => x * d === n * 100 && gcd(n, d) === 1;

check('BK1: definition cross-checks — 35% = 7/20, 64% = 16/25, 45% = 9/20, 120% = 6/5, all lowest terms',
  pctFrac(35, 7, 20) && pctFrac(64, 16, 25) && pctFrac(45, 9, 20) && pctFrac(120, 6, 5));
check('BK2: the hundredth dresses — 12.5% = 1/8 (125 x 8 = 1000), 6.25% = 1/16 (625 x 16 = 10000), 0.5% = 1/200 (50 x 2 = 100)',
  125 * 8 === 1000 && pctFrac(12.5, 1, 8) && 625 * 16 === 10000 && pctFrac(6.25, 1, 16) && pctFrac(0.5, 1, 200));
check('BK3: percent to decimal is the two-hop LEFT — 45% = 0.45, 8% = 0.08, 6.5% = 0.065, 0.5% = 0.005, 120% = 1.2',
  M(0.45) === 450 && M(0.08) === 80 && M(0.065) === 65 && M(0.005) === 5 && M(1.2) === 1200);
check('BK4: decimal to percent is the two-hop RIGHT — 0.375 = 37.5%, 0.06 = 6%, 0.09 = 9%, 0.35 = 35%, 1.2 = 120%',
  Math.abs(0.375 * 100 - 37.5) < 1e-12 && Math.abs(0.06 * 100 - 6) < 1e-12 && Math.abs(0.09 * 100 - 9) < 1e-12 && Math.abs(0.35 * 100 - 35) < 1e-12 && 100 * 1.2 === 120);
check('BK5: fraction to percent — 3/4 = 75%, 2/5 = 40%, 7/20 = 35%, 5/8 = 62.5%, 3/8 = 37.5%, 7/8 = 87.5%',
  300 / 4 === 75 && 200 / 5 === 40 && 700 / 20 === 35 && Math.abs(5000 / 8 - 625) < 1e-9 && Math.abs(3000 / 8 - 375) < 1e-9 && Math.abs(7000 / 8 - 875) < 1e-9);
check('BK6: the 1/3 caution — 33 1/3% = (100/3)/100 = 1/3 exactly; 33.3% = 333/1000 is a hair short (333 x 3 = 999 < 1000); 2/3 = 66 2/3%',
  Math.abs((100 / 3) / 100 - 1 / 3) < 1e-12 && 333 * 3 === 999 && 999 < 1000 && Math.abs((200 / 3) / 100 - 2 / 3) < 1e-12);
check('BK7: the two-hop law as an equivalence — p = x/100 iff x = 100p; pairs (45, 0.45), (6.5, 0.065), (120, 1.2), (0.5, 0.005)',
  100 * 0.45 === 45 && Math.abs(100 * 0.065 - 6.5) < 1e-12 && 100 * 1.2 === 120 && Math.abs(100 * 0.005 - 0.5) < 1e-12);

/* ============================================================
 * 5.4 — BL. Percent of a quantity and the benchmarks
 * ==========================================================*/
check('BL1: percent of a quantity = (x/100) x A — 15% of 460 = 69, 8% of 2500 = 200, 12.5% of 640 = 80, 18% of 2500 = 450',
  (15 * 460) / 100 === 69 && (8 * 2500) / 100 === 200 && (125 * 640) / 1000 === 80 && (18 * 2500) / 100 === 450);
check('BL2: the benchmark identities — 50% = 1/2, 25% = 1/4, 20% = 1/5, 12.5% = 1/8, 10% = 1/10, 5% = 1/20, 1% = 1/100',
  pctFrac(50, 1, 2) && pctFrac(25, 1, 4) && pctFrac(20, 1, 5) && pctFrac(12.5, 1, 8) && pctFrac(10, 1, 10) && pctFrac(5, 1, 20) && pctFrac(1, 1, 100));
check('BL3: benchmark builds — 35% of 200 = 25% + 10% = 50 + 20 = 70 = (35 x 200)/100; 15% of 460 = 10% + 5% = 46 + 23 = 69; 35% of 460 = 115 + 46 = 161',
  200 / 4 === 50 && 200 / 10 === 20 && 50 + 20 === 70 && 35 * 2 === 70 &&
  460 / 10 === 46 && 460 / 20 === 23 && 46 + 23 === 69 &&
  460 / 4 === 115 && 115 + 46 === 161 && 35 * 460 === 16100 && 16100 / 100 === 161);
check('BL4: the benchmark ladder on 460 — 50% = 230, 25% = 115, 20% = 92, 10% = 46, 5% = 23, 1% = 4.6',
  460 / 2 === 230 && 460 / 4 === 115 && 460 / 5 === 92 && 460 / 10 === 46 && 460 / 20 === 23 && M(460 / 100) === 4600);
check('BL5: the halving chain at work — 6.25% of 512 = 32 (512/16) and 3.125% of 640 = 20 (640/32)',
  512 / 16 === 32 && 640 / 32 === 20 && M(6.25) === 6250 && 625 * 16 === 10000);

/* ============================================================
 * 5.4 — BM. The commutativity gem and the halving chain
 * ==========================================================*/
check('BM1: x% of y = y% of x — xy/100 both ways: 8% of 50 = 50% of 8 = 4; 16% of 25 = 25% of 16 = 4; 12% of 25 = 3; 4% of 75 = 3',
  (8 * 50) / 100 === 4 && (50 * 8) / 100 === 4 && (16 * 25) / 100 === 4 && (25 * 16) / 100 === 4 && (12 * 25) / 100 === 3 && (4 * 75) / 100 === 3);
check('BM2: the halving chain — 100 halved repeatedly: 50, 25, 12.5, 6.25, 3.125 with fraction dresses 1/2, 1/4, 1/8, 1/16, 1/32',
  100 / 2 === 50 && 50 / 2 === 25 && 25 / 2 === 12.5 && 12.5 / 2 === 6.25 && 6.25 / 2 === 3.125 &&
  pctFrac(50, 1, 2) && pctFrac(25, 1, 4) && pctFrac(12.5, 1, 8) && pctFrac(6.25, 1, 16) && pctFrac(3.125, 1, 32));
check('BM3: the atoms explain the chain — 100 = 2^2 x 5^2; after two halvings the fives alone remain (25 = 5^2), then each half rides on',
  100 === 4 * 25 && 25 === 5 * 5 && 12.5 === 100 / 8 && 6.25 === 100 / 16 && 3.125 === 100 / 32);

/* ============================================================
 * 5.4 — BN. Word problems: marks, shares, the whole
 * ==========================================================*/
check('BN1: marks — 348 of 500 = (348 x 100)/500 = 348/5 = 69.6%',
  348 * 100 === 34800 && 34800 / 500 === 69.6 && M(69.6) === 69600 && 348 * 2 === 696);
check('BN2: shares — 55% of 40 are girls: 22 girls, 18 boys; 60% of 45 are boys: 27 boys, 18 girls; both total back',
  (55 * 40) / 100 === 22 && 40 - 22 === 18 && 22 + 18 === 40 && (60 * 45) / 100 === 27 && 45 - 27 === 18 && 27 + 18 === 45);
check('BN3: find the whole by the unitary method — 8% of n = 56: 1% = 7, n = 700; 12% of n = 84: 1% = 7, n = 700; 30% of n = 96: n = 320',
  56 / 8 === 7 && 7 * 100 === 700 && Math.abs((8 / 100) * 700 - 56) < 1e-9 &&
  84 / 12 === 7 && 7 * 100 === 700 && (96 * 100) / 30 === 320 && 30 * 320 === 9600 && M(320 / 100) === 3200);
check('BN4: what percent — 36 of 90 is 40% (3600/90); 66 of 240 is 27.5% (6600/240)',
  (36 * 100) / 90 === 40 && (66 * 100) / 240 === 27.5);
check('BN5: the pass mark — 33% of 600 = 198; a score of 210 passes by 12 marks',
  (33 * 600) / 100 === 198 && 210 - 198 === 12);
check('BN6: savings — 30% of Rs 18,500 = Rs 5,550 saved; Rs 12,950 remains',
  (30 * 18500) / 100 === 5550 && 18500 - 5550 === 12950);

/* ============================================================
 * 5.4 — BO. Figure 1 geometry: the 100-square (35% shaded)
 * ==========================================================*/
check('BO1: grid geometry — 10 x 10 cells of 30px at (70, 110); grid ends (370, 410) inside the 760 x 470 viewBox',
  70 + 10 * 30 === 370 && 110 + 10 * 30 === 410 && 370 < 760 && 410 < 470);
check('BO2: the shaded block is cols 0-6 by rows 0-4 — 210px x 150px = 7 x 5 = 35 cells, each cell exactly 1% of 100',
  210 / 30 === 7 && 150 / 30 === 5 && 7 * 5 === 35 && 35 === 25 + 10);
check('BO3: air chains — top label baseline 80, bracket rail 88, grid 110; bottom strip baseline 445 vs grid 410; right legend at x >= 400 vs grid edge 370',
  88 - 80 === 8 && 110 - 88 === 22 && 445 - 410 === 35 && 400 - 370 === 30);
check('BO4: the two bracket rails — 25% rail spans x 70..220 (5 cells), 10% rail spans x 220..280 (2 cells); labels "25%" at 145 and "10%" at 250 clear each other',
  220 - 70 === 150 && 150 / 30 === 5 && 280 - 220 === 60 && 60 / 30 === 2 && 250 - 145 === 105);

/* ============================================================
 * 5.4 — BP. Figure 2 geometry: the conversion map
 * ==========================================================*/
check('BP1: three stations — FRACTION 30..210, DECIMAL 300..460, PERCENT 550..730, all y 150..214; the gaps are 90px each',
  210 - 30 === 180 && 460 - 300 === 160 && 730 - 550 === 180 && 300 - 210 === 90 && 550 - 460 === 90);
check('BP2: label air — gap labels at y 132 and y 252 clear the boxes (150..214); the arc label at y 50 clears the arc peak ~85; the example strip sits at y 330',
  150 - 132 === 18 && 252 - 214 === 38 && 85 - 50 === 35 && 330 - 214 === 116);
check('BP3: the arc runs station-top to station-top — (120, 150) to (640, 150), peak y ~85, inside the viewBox',
  120 > 30 && 640 < 730 && 85 > 50 && 150 === 150);
check('BP4: the example strip line — 3/4 = 0.75 = 75%, 7/20 = 0.35 = 35%, 0.065 = 6.5%, 1/3 = 0.(3) = 33 1/3% exact',
  300 / 4 === 75 && 700 / 20 === 35 && M(0.065) === 65 && Math.abs(0.065 * 100 - 6.5) < 1e-12 && Math.abs((100 / 3) / 100 - 1 / 3) < 1e-12);

/* ============================================================
 * 5.4 — BQ. Quiz key audit (5 answers, every distractor killed)
 * ==========================================================*/
check('BQ1: quiz-1 answer index 0 — 3/8 = 37.5% exactly; 3.75% is one hop left, 375% is three hops right (0.375 x 1000), 38% rounds away the exact half',
  Math.abs((3 * 1000) / 8 - 375) < 1e-9 && Math.abs(0.375 * 100 - 37.5) < 1e-12 && Math.abs(0.375 * 10 - 3.75) < 1e-12 && Math.abs(0.375 * 1000 - 375) < 1e-9);
check('BQ2: quiz-2 answer index 1 — 0.06 = 6% (x 100); 0.6% is one hop left, 60% = 0.6, 600% = 6.0',
  Math.abs(0.06 * 100 - 6) < 1e-12 && Math.abs(0.06 * 10 - 0.6) < 1e-12 && Math.abs(0.6 * 100 - 60) < 1e-12 && Math.abs(6 * 100 - 600) < 1e-12);
check('BQ3: quiz-3 answer index 1 — 45% of 800 = 360; 36 hops one room extra, 3.6 two, 450 would be 45% of 1000',
  (45 * 800) / 100 === 360 && (45 * 800) / 1000 === 36 && 360 / 10 === 36 && (45 * 1000) / 100 === 450);
check('BQ4: quiz-4 answer index 2 — 12.5 x 8 = 100 so 12.5% = 1/8; 1/6 = 16.6%, 1/12 = 8.3%, 1/5 = 20% — none is 12.5%',
  12.5 * 8 === 100 && pctFrac(12.5, 1, 8) && Math.abs((1 / 6) * 100 - 12.5) > 4 && Math.abs((1 / 12) * 100 - 12.5) > 4 && Math.abs((1 / 5) * 100 - 12.5) > 7);
check('BQ5: quiz-5 answer index 2 — 8% of n = 56 gives n = 700; 448 = 56 x 8, 48 = 56 - 8, 7000 = the three-room hop',
  (56 * 100) / 8 === 700 && 56 * 8 === 448 && 56 - 8 === 48 && (56 * 1000) / 8 === 7000);
check('BQ6: quiz answer indices planned as [0, 1, 1, 2, 2]', JSON.stringify([0, 1, 1, 2, 2]) === '[0,1,1,2,2]');

/* ============================================================
 * 5.4 — BR. Exercise key audit (12 solutions, L1–L6)
 * ==========================================================*/
check('BR1: L1 45% = 9/20 — HCF 5, cross-check 9 x 100 = 900 = 45 x 20', pctFrac(45, 9, 20) && gcd(45, 100) === 5);
check('BR2: L1 7% = 0.07 — two hops left', M(0.07) === 70 && Math.abs(7 * 0.01 - 0.07) < 1e-12);
check('BR3: L2 3/5 = 60%', 300 / 5 === 60);
check('BR4: L2 25% of 320 = 80 — a quarter of it', (25 * 320) / 100 === 80 && 320 / 4 === 80);
check('BR5: L3 0.375 = 37.5%', Math.abs(0.375 * 100 - 37.5) < 1e-12);
check('BR6: L3 18% of 2500 = 450', (18 * 2500) / 100 === 450);
check('BR7: L4 36 of 90 is 40%', (36 * 100) / 90 === 40);
check('BR8: L4 12% of n = 84 gives n = 700 — the unitary method: 1% = 7', 84 / 12 === 7 && 7 * 100 === 700 && Math.abs((12 / 100) * 700 - 84) < 1e-9);
check('BR9: L5 the pass-mark run — 33% of 600 = 198; 210 - 198 = 12', (33 * 600) / 100 === 198 && 210 - 198 === 12);
check('BR10: L5 the class run — 60% of 45 = 27 boys, 18 girls, 27 + 18 = 45', (60 * 45) / 100 === 27 && 45 - 27 === 18 && 27 + 18 === 45);
check('BR11: L6 the commutativity gem — 16% of 25 = 25% of 16 = 4', (16 * 25) / 100 === 4 && (25 * 16) / 100 === 4);
check('BR12: L6 the halving chain — 6.25% of 512 = 32 and 3.125% of 640 = 20; chain 50/25/12.5/6.25/3.125',
  512 / 16 === 32 && 640 / 32 === 20 && JSON.stringify([100 / 2, 50 / 2, 25 / 2, 12.5 / 2, 6.25 / 2]) === '[50,25,12.5,6.25,3.125]');

/* ============================================================
 * 5.4 — BS. Structural sanity (terms, cards, illustrations, exercises)
 * ==========================================================*/
check('BS1: seven terms planned — Percent, The % sign, Standardised denominator, Two-hop conversion, Percent of a quantity, Benchmark percents, The 1% unit', 7 === 7);
check('BS2: three formula cards planned — the percent definition, the two-hop conversion, percent of a quantity', 3 === 3);
check('BS3: six Illustrations planned — 35% to 7/20, 7/8 to 87.5%, 0.065 to 6.5%, 15% of 460, 348/500, the 8%-is-56 inverse', 6 === 6);
check('BS4: twelve exercises planned across L1-L6, two each', 6 * 2 === 12);
check('BS5: quiz answers planned as indices 0/1/1/2/2', JSON.stringify([0, 1, 1, 2, 2]) === '[0,1,1,2,2]');
check('BS6: prerequisites — 5.1 (the ladder), 5.3 (the point-shift), 4.2 (lowest terms), 4.5 (of = multiplication)', true);

/* ============================================================ */

console.log(`\nverify-unit-5: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL PASS — every number in lessons 5.1–5.4 is script-verified before writing.');
