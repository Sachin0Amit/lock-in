/**
 * verify-unit-3.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 3 (Factors, Multiples and Primes).
 *
 * Created 2026-11-03 (run 7) for lesson 3.1 "Divisibility and Its Tests".
 * Every number that will appear in lesson prose, figures, tables, quiz and
 * exercises is checked here BEFORE it is written into ch-03.ts.
 * Run: bun run scripts/verify-unit-3.ts   (exit 1 on any failure)
 */

// module marker: keeps this file's top-level names out of the global
// script scope shared with verify-unit-2.ts under tsc --noEmit
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

function S(n: number): number {
  // digit sum
  return String(n)
    .split('')
    .reduce((acc, d) => acc + Number(d), 0);
}
function digitSum(n: number): number {
  return S(n);
}
// alternating digit sum, starting with + at the UNITS digit (mod-11 test)
function altSum(n: number): number {
  const ds = String(n).split('').map(Number).reverse();
  let t = 0;
  for (let i = 0; i < ds.length; i++) t += i % 2 === 0 ? ds[i] : -ds[i];
  return t;
}
function divides(d: number, n: number): boolean {
  return n % d === 0;
}
function isInt(x: number): boolean {
  return Number.isInteger(x);
}

/* ============================================================
 * A. Opening scene (sweets/jars + the exam-hall number)
 * ==========================================================*/
check('A1: 2340/9 = 260 exactly (jar scene)', 2340 / 9 === 260);
check('A2: digit sum of 2340 is 9', S(2340) === 9);
check('A3: 2341 = 9x260 + 1 (r 1)', 2341 === 9 * 260 + 1 && 2341 % 9 === 1);
check('A4: digit sum of 2341 is 10', S(2341) === 10);
check('A5: 4896/12 = 408 exactly (exam-hall)', 4896 / 12 === 408);

/* ============================================================
 * B. The treaty: divisible, factor, multiple
 * ==========================================================*/
check('B1: 6 | 48 (48 = 6x8)', divides(6, 48) && 6 * 8 === 48);
check('B2: factor pairs of 48: 1x48, 2x24, 3x16, 4x12, 6x8', [1, 2, 3, 4, 6, 8, 12, 16, 24, 48].every((f) => 48 % f === 0));
check('B3: 48 has exactly 10 factors', Array.from({ length: 48 }, (_, i) => i + 1).filter((f) => 48 % f === 0).length === 10);
check('B4: multiples of 7 below 100: fourteen (7x1..7x14)', Array.from({ length: 14 }, (_, i) => 7 * (i + 1)).every((m) => m < 100) && 7 * 14 === 98 && 7 * 15 === 105);
check('B5: every d divides 0 (0 = 0xd)', [2, 9, 47].every((d) => divides(d, 0)));
check('B6: 1 divides every n (n = 1xn)', [7, 100, 12345].every((n) => divides(1, n)));
check('B7: 0 | n impossible for n != 0 (n = qx0 = 0)', !Number.isInteger(5 / 0)); // 5/0 = Infinity: no whole q solves 5 = q*0
check('B8: 4896 = 6x816 = 12x408 (both compound verdicts)', 6 * 816 === 4896 && 12 * 408 === 4896);

/* ============================================================
 * C. Tail tests (2, 5, 10, 4, 25, 8, 125)
 * ==========================================================*/
check('C1: 10 = 2x5, 100 = 4x25, 1000 = 8x125', 10 === 2 * 5 && 100 === 4 * 25 && 1000 === 8 * 125);
check('C2: 5836 = 58x100 + 36 (split)', 58 * 100 + 36 === 5836);
check('C3: 5836/4 = 1459 (last two 36 | 4)', 5836 / 4 === 1459 && divides(4, 36));
check('C4: 5836 = 25x233 + 11 (last two 36 -> r 11 mod 25)', 25 * 233 + 11 === 5836 && 36 % 25 === 11 && 5836 % 25 === 11);
check('C5: 48216 = 48x1000 + 216', 48 * 1000 + 216 === 48216);
check('C6: 216 = 8x27 -> 48216/8 = 6027', 8 * 27 === 216 && 48216 / 8 === 6027);
check('C7: 48216 = 125x385 + 91 (216 mod 125 = 91)', 125 * 385 + 91 === 48216 && 216 % 125 === 91 && 48216 % 125 === 91);
check('C8: 13675/25 = 547 (last two 75 | 25)', 13675 / 25 === 547);
check('C9: 25 has four two-digit tails: 00, 25, 50, 75', [0, 25, 50, 75].every((t) => t % 25 === 0));
check('C10: 125 has eight three-digit tails', Array.from({ length: 8 }, (_, i) => 125 * i).every((t) => t % 125 === 0) && 125 * 8 === 1000);
check('C11: remainder on /1000 IS the last three digits (2.4 corollary)', 48216 % 1000 === 216);
check('C12: parity/5/10 examples: 4, 12, 30, 18, 102 even; 13520, 7805 end 0/5; 580 ends 0', [4, 12, 30, 18, 102].every((n) => n % 2 === 0) && [13520, 7805].every((n) => n % 5 === 0) && 580 % 10 === 0);

/* ============================================================
 * D. Digit-sum tests (9 and 3)
 * ==========================================================*/
check('D1: 10 = 9+1, 100 = 99+1, 1000 = 999+1', 10 === 9 + 1 && 100 === 99 + 1 && 1000 === 999 + 1);
check('D2: 4731 = (4x999+4)+(7x99+7)+(3x9+3)+1', 4 * 999 + 4 + 7 * 99 + 7 + 3 * 9 + 3 + 1 === 4731);
check('D3: digit sum of 4731 is 15', S(4731) === 15);
check('D4: 4731 = 9x525 + 6 (r 6 = 15 mod 9)', 9 * 525 + 6 === 4731 && 4731 % 9 === 6 && 15 % 9 === 6);
check('D5: 9 | 3 so mod 3 shares the test: 4731 % 3 = 0 (15 % 3 = 0)', 4731 % 3 === 0 && 15 % 3 === 0);
check('D6: casting out nines on 4731: (4+7)=11->2, (3+1)=4, 2+4=6', (4 + 7) % 9 === 2 && 3 + 1 === 4 && (2 + 4) % 9 === 6);
check('D7: 2340 digit sum 9 -> r 0 (jar scene again)', S(2340) % 9 === 0 && 2340 % 9 === 0);
check('D8: TRAP 921: digit sum 12 (divisible by 6) but 921 odd -> 921/6 = 153.5; 921/3 = 307', S(921) === 12 && 921 % 2 === 1 && !isInt(921 / 6) && 921 / 3 === 307);
check('D9: 12 is divisible by 6 as a digit sum but 12 % 6 = 0 (the sum, not the number, is what divides)', 12 % 6 === 0);
check('D10: 87543 digit sum 27 -> /9 = 9727; odd so not /6', S(87543) === 27 && 87543 / 9 === 9727 && 87543 % 2 === 1 && !isInt(87543 / 6));

/* ============================================================
 * E. Alternating test (11)
 * ==========================================================*/
check('E1: 10 = 11-1, 100 = 99+1 (10 = -1, 10^2 = +1 mod 11)', 10 === 11 - 1 && 100 % 11 === 1);
check('E2: 2728: 8-2+7-2 = 11 -> 2728/11 = 248', altSum(2728) === 11 && 2728 / 11 === 248);
check('E3: 1012: 2-1+0-1 = 0 -> 1012/11 = 92', altSum(1012) === 0 && 1012 / 11 === 92);
check('E4: 91083: 3-8+0-1+9 = 3 -> 91083 = 11x8280 + 3 (r = alt sum)', altSum(91083) === 3 && 11 * 8280 + 3 === 91083 && 91083 % 11 === 3);
check('E5: 43291: 1-9+2-3+4 = -5 -> r 6 (-5 + 11): 43291 = 11x3935 + 6', altSum(43291) === -5 && 11 * 3935 + 6 === 43291 && 43291 % 11 === 6);
check('E6: 4896: 6-9+8-4 = 1 -> 4896 = 11x445 + 1 (r 1 = alt sum)', altSum(4896) === 1 && 11 * 445 + 1 === 4896 && 4896 % 11 === 1);

/* ============================================================
 * F. Compound tests (6, 12, 15, 18, 24, 88) + the coprime trap
 * ==========================================================*/
check('F1: 6 = 2x3 coprime; 2376 even, S=18 -> /6 = 396', divides(2, 2376) && S(2376) === 18 && 2376 / 6 === 396);
check('F2: 12 = 3x4 coprime; 2376/12 = 198', 2376 % 3 === 0 && 2376 % 4 === 0 && 2376 / 12 === 198);
check('F3: 18 = 2x9; 4788 even, S=27 -> 4788/18 = 266', divides(2, 4788) && S(4788) === 27 && 4788 / 18 === 266);
check('F4: 15 = 3x5; 4965 S=24 ends 5 -> 4965/15 = 331', S(4965) % 3 === 0 && 4965 % 5 === 0 && 4965 / 15 === 331);
check('F5: 24 = 3x8; 9888 S=42, last three 888 = 8x111 -> 9888/24 = 412', S(9888) % 3 === 0 && 888 % 8 === 0 && 9888 / 24 === 412);
check('F6: 88 = 8x11; 12144: 144/8 = 18, alt 4-4+1-2+1 = 0 -> /88 = 138', 8 * 11 === 88 && 144 % 8 === 0 && altSum(12144) === 0 && 12144 / 88 === 138);
check('F7: TRAP 18: /2 = 9, /6 = 3, but /12 = 1.5 (2 and 6 share factor 2)', 18 % 2 === 0 && 18 % 6 === 0 && !isInt(18 / 12) && 12 === 2 * 6 && 6 % 2 === 0);
check('F8: gcd(2,6) = 2 vs gcd(3,4) = 1', 6 % 2 === 0 && 4 % 3 !== 0);
check('F9: 12 = 3x4 is the correct split (12/12 test on 4896 passes via 3 and 4)', 4896 % 3 === 0 && 4896 % 4 === 0 && 4896 % 12 === 0);

/* ============================================================
 * G. The stubborn 7 (double-and-subtract)
 * ==========================================================*/
// chain step: n = 10a + b  ->  a - 2b; 2n = 21a - (a - 2b) so a-2b = -2n (mod 7)
function sevenStep(n: number): number {
  const a = Math.floor(n / 10);
  const b = n % 10;
  return a - 2 * b;
}
check('G1: 2n = 21a - (a-2b) identity for n = 10a+b (spot: n=448, a=44, b=8)', 2 * 448 === 21 * 44 - (44 - 2 * 8));
check('G2: 2401 -> 238 -> 7 (chain on 7^4 = 2401)', 7 ** 4 === 2401 && sevenStep(2401) === 238 && sevenStep(238) === 7 && divides(7, 7));
check('G3: 2401/7 = 343 = 7^3; 343/7 = 49 = 7^2; 49/7 = 7', 2401 / 7 === 343 && 343 / 7 === 49 && 49 / 7 === 7);
check('G4: 3192 -> 315 -> 21 -> 0 (quiz chain)', sevenStep(3192) === 315 && sevenStep(315) === 21 && sevenStep(21) === 0 && 3192 / 7 === 456);
check('G5: non-multiple 1000 -> 100 -> 10; 1000 = 7x142 + 6 (r 6)', sevenStep(1000) === 100 && sevenStep(100) === 10 && 7 * 142 + 6 === 1000);
check('G6: residues scale by -2 each step (1000: 6 -> 2 -> 3), never hitting 0', 1000 % 7 === 6 && 100 % 7 === 2 && 10 % 7 === 3 && (6 * -2) % 7 === -5 && (-5 + 7) % 7 === 2 && (2 * -2) % 7 === -4 && (-4 + 7) % 7 === 3 && 10 % 7 === 3);
check('G7: 4896 chain 477 -> 33 -> -3; 4896 = 7x699 + 3', sevenStep(4896) === 477 && sevenStep(477) === 33 && sevenStep(33) === -3 && 7 * 699 + 3 === 4896);
check('G8: -3 mod 7 = 4, consistent with the -2 scaling (3 -> 1 -> 5 -> 4)', (-3 + 7) % 7 === 4 && 477 % 7 === 1 && 33 % 7 === 5 && 4896 % 7 === 3);
check('G9: gcd(2,7) = 1 (7 odd) so divisibility is preserved by the step', 7 % 2 === 1);

/* ============================================================
 * H. Worked screening of 4,896 (the exam-hall number)
 * ==========================================================*/
check('H1: 4896 even -> /2 = 2448', 4896 % 2 === 0 && 4896 / 2 === 2448);
check('H2: digit sum 27 -> /3 = 1632 and /9 = 544', S(4896) === 27 && 4896 / 3 === 1632 && 4896 / 9 === 544);
check('H3: last two 96 -> /4 = 1224', 4896 % 100 === 96 && 4896 / 4 === 1224);
check('H4: last three 896 = 8x112 -> /8 = 612', 4896 % 1000 === 896 && 896 / 8 === 112 && 4896 / 8 === 612);
check('H5: /6 = 816 (even + digit sum 27)', 4896 / 6 === 816);
check('H6: /12 = 408 (3 and 4 pass)', 4896 / 12 === 408);
check('H7: /11 fails, r 1 (alt sum 1)', 4896 % 11 === 1 && altSum(4896) === 1);
check('H8: /7 fails (chain -3), r 3', 4896 % 7 === 3 && sevenStep(sevenStep(sevenStep(4896))) === -3);

/* ============================================================
 * I. Remainder reading + exam find-the-digit
 * ==========================================================*/
check('I1: 8241: S=15 -> r 6; 8241 = 9x915 + 6', S(8241) === 15 && 15 % 9 === 6 && 9 * 915 + 6 === 8241 && 8241 % 9 === 6);
check('I2: 27*4 vs 3: 13+* divisible by 3 -> * in {2,5,8}', (13 + 2) % 3 === 0 && (13 + 5) % 3 === 0 && (13 + 8) % 3 === 0 && [0, 1, 3, 4, 6, 7, 9].every((d: number) => (13 + d) % 3 !== 0));
check('I3: 2724/3 = 908, 2754/3 = 918, 2784/3 = 928', 2724 / 3 === 908 && 2754 / 3 === 918 && 2784 / 3 === 928);
check('I4: 7,2*8 vs 9: 17+* = 18 -> * = 1; 7218/9 = 802', (17 + 1) % 9 === 0 && [0, 2, 3, 4, 5, 6, 7, 8, 9].every((d: number) => (17 + d) % 9 !== 0 || d === 1) && 7218 / 9 === 802);
check('I5: 5616/8 = 702 (quiz Q1: last three 616 = 8x77)', 616 / 8 === 77 && 5616 / 8 === 702);
check('I6: 8442/9 = 938 (exercise L3)', 8442 / 9 === 938 && S(8442) === 18);

/* ============================================================
 * J. Pascal's criterion spot-checks (historical callout + figure)
 * ==========================================================*/
check('J1: 1000 = 13x76 + 12 -> 10^3 = -1 (mod 13)', 13 * 76 + 12 === 1000 && 1000 % 13 === 12);
check('J2: 1234567 mod 13 via blocks 1|234|567: 1-234+567 = 334 -> 334 = 13x25 + 9', 1 - 234 + 567 === 334 && 13 * 25 + 9 === 334);
check('J3: direct check 1234567 = 13x94966 + 9', 13 * 94966 + 9 === 1234567 && 1234567 % 13 === 9);
check('J4: powers of 10 mod 7: 1, 3, 2, 6, 4, 5 (cycle of 6)', [1, 3, 2, 6, 4, 5].every((r, i) => 10 ** i % 7 === r));

/* ============================================================
 * K. L6: the a +/- kb family (7, 13, 19, 17)
 * ==========================================================*/
// 13: 4n = 40a + 4b = 39a + (a + 4b), gcd(4,13)=1 -> test a + 4b
function thirteenStep(n: number): number {
  return Math.floor(n / 10) + 4 * (n % 10);
}
// 19: 2n = 19a + (a + 2b), gcd(2,19)=1 -> test a + 2b
function nineteenStep(n: number): number {
  return Math.floor(n / 10) + 2 * (n % 10);
}
// 17: 5n = 50a + 5b = 51a - (a - 5b), gcd(5,17)=1 -> test a - 5b
function seventeenStep(n: number): number {
  return Math.floor(n / 10) - 5 * (n % 10);
}
check('K1: 13 test: 507 = 13x39; 50 + 28 = 78 = 13x6', 507 === 13 * 39 && thirteenStep(507) === 78 && 78 === 13 * 6);
check('K2: 13 chain: 78 -> 39 -> 39 (fixed point); 39 = 13x3', thirteenStep(78) === 39 && thirteenStep(39) === 39 && 39 === 13 * 3);
check('K3: 13 fixed points 13, 26, 39 map to themselves', thirteenStep(13) === 13 && thirteenStep(26) === 26 && thirteenStep(39) === 39);
check('K4: 19 test: 1919 = 19x101; 191 + 18 = 209 = 19x11', 1919 === 19 * 101 && nineteenStep(1919) === 209 && 209 === 19 * 11);
check('K5: 19 chain: 209 -> 38 -> 19; 38 = 19x2', nineteenStep(209) === 38 && nineteenStep(38) === 19 && 38 === 19 * 2);
check('K6: 17 test: 867 = 17x51 = 3x17^2; 86 - 35 = 51 = 17x3', 867 === 17 * 51 && 867 === 3 * 17 * 17 && seventeenStep(867) === 51);
check('K7: 17 chain: 51 -> 0 (51 = 17x3)', seventeenStep(51) === 0);
check('K8: L6 chain for 2795 = 13x215: 299 -> 65 -> 26 (fixed)', 2795 === 13 * 215 && thirteenStep(2795) === 299 && thirteenStep(299) === 65 && thirteenStep(65) === 26 && thirteenStep(26) === 26);
check('K9: gcds: gcd(2,7)=gcd(4,13)=gcd(2,19)=gcd(5,17)=1', 7 % 2 === 1 && 13 % 4 === 1 && 19 % 2 === 1 && 17 % 5 === 2);
check('K10: 13 block test: 1000 ≡ -1 (mod 13) gives alternate-3-blocks rule (J1 cross)', 1000 % 13 === 12);

/* ============================================================
 * L. Exercises (all solutions)
 * ==========================================================*/
check('L1: multiples of 13: 13, 26, 39, 52, 65; 91 = 13x7', [13, 26, 39, 52, 65].every((m, i) => m === 13 * (i + 1)) && 91 === 13 * 7);
check('L2: 2730: yes {2,3,5,6,10}, no {4,9}; /6 = 455, /3 = 910, /10 = 273', divides(2, 2730) && divides(3, 2730) && divides(5, 2730) && divides(6, 2730) && divides(10, 2730) && !divides(4, 2730) && !divides(9, 2730) && 2730 / 6 === 455 && 2730 / 3 === 910 && 2730 / 10 === 273);
check('L3: 84*2 vs 9: 14 + * = 18 -> * = 4; 8442 = 9x938', S(8442) === 18 && 8442 === 9 * 938 && [0, 1, 2, 3, 5, 6, 7, 8, 9].every((d) => (14 + d) % 9 !== 0 || d === 4));
check('L4: 91083: alt 3 -> not /11, r 3; S=21 -> /3 = 30361, not /9', 91083 % 11 === 3 && altSum(91083) === 3 && S(91083) === 21 && 91083 / 3 === 30361 && 91083 % 9 === 3);
check('L5: 43291 mod 9 = 1 (S=19), mod 11 = 6 (alt -5)', 43291 % 9 === 1 && S(43291) === 19 && 19 % 9 === 1 && 43291 % 11 === 6 && altSum(43291) === -5);
check('L6: 2795 = 13x215 chain (K8 cross); 1919 = 19x101 chain (K4-K5 cross)', 2795 === 13 * 215 && 1919 === 19 * 101);

/* ============================================================
 * M. Table rows (the master test table)
 * ==========================================================*/
check('M1: table examples: 4518/6 = 753; 41784/8 = 5223; 19044/9 = 2116; 38797-style 11 example replaced by 2728/11 = 248', 4518 / 6 === 753 && 41784 / 8 === 5223 && 19044 / 9 === 2116 && 2728 / 11 === 248);
check('M2: 2616/4 = 654 (last two 16 | 4)', 2616 / 4 === 654 && 16 % 4 === 0);
check('M3: 3792 digit sum 21 -> /3 = 1264', S(3792) === 21 && 3792 / 3 === 1264);

/* ============================================================
 * Report
 * ==========================================================*/
console.log(`\nverify-unit-3: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL CHECKS PASS — safe to write lesson 3.1');
