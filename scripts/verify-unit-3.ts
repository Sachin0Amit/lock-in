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
 * N. Lesson 3.2 "Prime Numbers and Factorisation" — helpers
 * ==========================================================*/
function divisorsOf(n: number): number[] {
  const out: number[] = [];
  for (let d = 1; d <= n; d++) if (n % d === 0) out.push(d);
  return out;
}
function isPrime(n: number): boolean {
  if (n < 2) return false;
  for (let d = 2; d * d <= n; d++) if (n % d === 0) return false;
  return true;
}
function primesUpTo(n: number): number[] {
  const out: number[] = [];
  for (let k = 2; k <= n; k++) if (isPrime(k)) out.push(k);
  return out;
}
function primeFactors(n: number): number[] {
  // sorted multiset of prime factors (with repetition)
  const out: number[] = [];
  let m = n;
  for (let p = 2; p * p <= m; p++) while (m % p === 0) { out.push(p); m /= p; }
  if (m > 1) out.push(m);
  return out;
}

/* ============================================================
 * O. Lesson 3.2 — opening scene (mosaic tiles: 48 vs 47)
 * ==========================================================*/
check('O1: 48 has exactly ten factors = five rectangles 1x48, 2x24, 3x16, 4x12, 6x8', JSON.stringify(divisorsOf(48)) === JSON.stringify([1, 2, 3, 4, 6, 8, 12, 16, 24, 48]));
check('O2: 47 is prime — its only factor pair is 1x47 (one line, no rectangle)', isPrime(47) && divisorsOf(47).length === 2);
check('O3: 47 passes the 3.1 screens: odd, S(47) = 11, tail 7 not 0/5', 47 % 2 === 1 && S(47) === 11 && 47 % 5 !== 0);
check('O4: the walks close because 7^2 = 49 > 48 and > 47', 7 * 7 === 49 && 49 > 48 && 49 > 47);
check('O5: every smaller member of 48\'s pairs (1,2,3,4,6) is <= 6 < sqrt(48) ~ 6.93', [1, 2, 3, 4, 6].every((d) => d * d <= 48) && 6 * 6 < 48 && 7 * 7 > 48);

/* ============================================================
 * P. Lesson 3.2 — the two-factor treaty (prime / composite / 1 / 0)
 * ==========================================================*/
check('P1: factor counts 1..12: 1 has one factor; primes exactly two; composites three or more', divisorsOf(1).length === 1 && [2, 3, 5, 7, 11].every((p) => divisorsOf(p).length === 2) && [4, 6, 8, 9, 10, 12].every((c) => divisorsOf(c).length >= 3));
check('P2: primes below 30 are 2,3,5,7,11,13,17,19,23,29 (ten)', JSON.stringify(primesUpTo(29)) === JSON.stringify([2, 3, 5, 7, 11, 13, 17, 19, 23, 29]));
check('P3: 4 has three factors 1,2,4; 9 has three 1,3,9; 12 has six 1,2,3,4,6,12', JSON.stringify(divisorsOf(4)) === JSON.stringify([1, 2, 4]) && JSON.stringify(divisorsOf(9)) === JSON.stringify([1, 3, 9]) && JSON.stringify(divisorsOf(12)) === JSON.stringify([1, 2, 3, 4, 6, 12]));
check('P4: 2 is the only even prime — every even n in 4..100 is composite', isPrime(2) && Array.from({ length: 49 }, (_, i) => 2 * (i + 2)).every((n) => !isPrime(n)));
check('P5: 0 sits outside the treaty (every d divides 0, infinitely many divisors)', [2, 7, 100].every((d) => 0 % d === 0));
check('P6: 1 sits outside (exactly one factor; if padded, 1x2x3 = 6 and 1x1x2x3 = 6)', divisorsOf(1).length === 1 && 1 * 2 * 3 === 6 && 1 * 1 * 2 * 3 === 6);

/* ============================================================
 * Q. Lesson 3.2 — the sieve of Eratosthenes up to 100
 * ==========================================================*/
check('Q1: exactly 25 primes below 100 (sieve result)', primesUpTo(97).length === 25 && primesUpTo(100).length === 25);
check('Q2: the Khattar list: 2..97 in 25 entries', JSON.stringify(primesUpTo(97)) === JSON.stringify([2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47, 53, 59, 61, 67, 71, 73, 79, 83, 89, 97]));
check('Q3: sieve starts crossing at p^2: 4, 9, 25, 49; stops after 7 because 11^2 = 121 > 100', 2 * 2 === 4 && 3 * 3 === 9 && 5 * 5 === 25 && 7 * 7 === 49 && 11 * 11 === 121);
check('Q4: 97 is the largest two-digit prime; 98 = 2x49, 99 = 9x11 composite', isPrime(97) && 98 === 2 * 49 && 99 === 9 * 11 && !isPrime(98) && !isPrime(99) && primesUpTo(97).every((p) => p <= 97) && [91, 93, 95, 99].every((n) => !isPrime(n)));
check('Q5: twin-prime pairs below 50: (3,5),(5,7),(11,13),(17,19),(29,31),(41,43)', [[3, 5], [5, 7], [11, 13], [17, 19], [29, 31], [41, 43]].every(([a, b]) => isPrime(a) && isPrime(b) && b - a === 2));
check('Q6: smallest prime 2, smallest odd prime 3; 1 is not prime', isPrime(2) && isPrime(3) && !isPrime(1));

/* ============================================================
 * R. Lesson 3.2 — the square-root licence (trial division)
 * ==========================================================*/
check('R1: bound square windows: 36 < 48,47 < 49; 81 < 91 < 100; 361 < 397 < 400; 196 < 221 < 225; 100 < 113 < 121', 36 < 48 && 48 < 49 && 36 < 47 && 81 < 91 && 91 < 100 && 361 < 397 && 397 < 400 && 196 < 221 && 221 < 225 && 100 < 113 && 113 < 121);
check('R2: if both factors exceeded sqrt(n), their product would exceed n (7x7 = 49 > 48)', 7 * 7 > 48);
check('R3: the false primes: 91 = 7x13, 51 = 3x17, 87 = 3x29, 221 = 13x17', 91 === 7 * 13 && 51 === 3 * 17 && 87 === 3 * 29 && 221 === 13 * 17 && !isPrime(91) && !isPrime(51) && !isPrime(87) && !isPrime(221));
check('R4: 97 certified: primes <= 9 are 2,3,5,7; 97 = 7x13 + 6 fails the last test', primesUpTo(9).length === 4 && 7 * 13 + 6 === 97 && 97 % 7 === 6 && isPrime(97));
check('R5: 397 verdicts: odd; S = 19 not /3; tail 7; %7 = 5 (7x56 = 392); alt 7-9+3 = 1; %13 = 7 (13x30 = 390); %17 = 6 (17x23 = 391); %19 = 17 (19x20 = 380)', 397 % 2 === 1 && S(397) === 19 && 397 % 3 !== 0 && 397 % 5 !== 0 && 397 % 7 === 5 && 7 * 56 === 392 && altSum(397) === 1 && 397 % 13 === 7 && 13 * 30 === 390 && 397 % 17 === 6 && 17 * 23 === 391 && 397 % 19 === 17 && 19 * 20 === 380);
check('R6: 397 is prime', isPrime(397));
check('R7: 113 certified: S(113) = 5; 113 = 7x16 + 1; prime', S(113) === 5 && 113 === 7 * 16 + 1 && 113 % 7 === 1 && isPrime(113));
check('R8: 221 needs 13: primes <= 14 are 2,3,5,7,11,13 and 13x17 = 221 (14^2 = 196 < 221 < 225 = 15^2)', JSON.stringify(primesUpTo(14)) === JSON.stringify([2, 3, 5, 7, 11, 13]) && 13 * 17 === 221 && 14 * 14 < 221 && 15 * 15 > 221);
check('R9: testing only primes (not composites) is enough: every composite test d = pxq is covered by p', isPrime(2) && isPrime(3) && isPrime(5) && isPrime(7) && isPrime(11) && isPrime(13) && isPrime(17) && isPrime(19));

/* ============================================================
 * S. Lesson 3.2 — factorisation, uniqueness, the exam-hall return
 * ==========================================================*/
check('S1: 60 via tree A: 6x10 -> (2x3)x(2x5) = 2x2x3x5', 6 * 10 === 60 && JSON.stringify(primeFactors(60)) === JSON.stringify([2, 2, 3, 5]));
check('S2: 60 via tree B: 4x15 -> (2x2)x(3x5) = 2x2x3x5 (same multiset)', 4 * 15 === 60 && JSON.stringify([2, 2].concat([3, 5]).sort((a, b) => a - b)) === JSON.stringify([2, 2, 3, 5]) && 2 * 2 * 3 * 5 === 60);
check('S3: 60 = 2^2 x 3 x 5 (exponent regrouping)', 2 ** 2 * 3 * 5 === 60);
check('S4: the near-miss: 2x6 = 3x4 = 12, but pushed down both reach 2x2x3', 2 * 6 === 12 && 3 * 4 === 12 && JSON.stringify(primeFactors(12)) === JSON.stringify([2, 2, 3]));
check('S5: the exam-hall number returns: 4896 = 2x2448 = 2^2x1224 = 2^3x612 = 2^4x306 = 2^5x153; 153 = 3x51 = 3x3x17', 4896 / 2 === 2448 && 2448 / 2 === 1224 && 1224 / 2 === 612 && 612 / 2 === 306 && 306 / 2 === 153 && 153 === 3 * 51 && 51 === 3 * 17);
check('S6: 4896 = 2^5 x 3^2 x 17; 32 x 153 = 4896; 32 x 9 x 17 = 4896; 17 is prime', 2 ** 5 * 3 ** 2 * 17 === 4896 && 32 * 153 === 4896 && 32 * 9 * 17 === 4896 && isPrime(17));
check('S7: 2401 = 7^4 = 49^2 (Lesson 3.1 chain cross); a prime power with five divisors 1,7,49,343,2401', 7 ** 4 === 2401 && 49 * 49 === 2401 && 49 === 7 ** 2 && JSON.stringify(divisorsOf(2401)) === JSON.stringify([1, 7, 49, 343, 2401]));
check('S8: uniqueness would die under padding: 1x(2^2x3x5) = 60 and 1x1x(2^2x3x5) = 60', 1 * 60 === 60 && 1 * 1 * 60 === 60);

/* ============================================================
 * T. Lesson 3.2 — divisor-count formula (the master key)
 * ==========================================================*/
function countDivisors(n: number): number { return divisorsOf(n).length; }
check('T1: 48 = 2^4 x 3 -> (4+1)(1+1) = 10 divisors (Lesson 3.1 count explained)', (4 + 1) * (1 + 1) === 10 && countDivisors(48) === 10);
check('T2: 60 = 2^2 x 3 x 5 -> 3x2x2 = 12 divisors, enumerated', 3 * 2 * 2 === 12 && countDivisors(60) === 12 && JSON.stringify(divisorsOf(60)) === JSON.stringify([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]));
check('T3: 4896 = 2^5 x 3^2 x 17 -> 6x3x2 = 36 divisors, enumerated', 6 * 3 * 2 === 36 && countDivisors(4896) === 36);
check('T4: 4896 divisor list (36, from atoms 2^a 3^b 17^c)', (() => {
  const set = new Set<number>();
  for (let a = 0; a <= 5; a++) for (let b = 0; b <= 2; b++) for (let c = 0; c <= 1; c++) set.add(2 ** a * 3 ** b * 17 ** c);
  const list = Array.from(set).sort((x, y) => x - y);
  return list.length === 36 && list.every((d) => 4896 % d === 0);
})());
check('T5: 720 = 2^4 x 3^2 x 5 -> 5x3x2 = 30 divisors, enumerated', 720 === 2 ** 4 * 3 ** 2 * 5 && 5 * 3 * 2 === 30 && countDivisors(720) === 30);
check('T6: 96 = 2^5 x 3 -> 6x2 = 12 divisors, enumerated', 96 === 2 ** 5 * 3 && 6 * 2 === 12 && JSON.stringify(divisorsOf(96)) === JSON.stringify([1, 2, 3, 4, 6, 8, 12, 16, 24, 32, 48, 96]));
check('T7: 2025 = 3^4 x 5^2 -> 5x3 = 15 divisors, enumerated; 2025 = 45^2; 81x25 = 2025', 2025 === 3 ** 4 * 5 ** 2 && 5 * 3 === 15 && countDivisors(2025) === 15 && 45 * 45 === 2025 && 81 * 25 === 2025 && JSON.stringify(divisorsOf(2025)) === JSON.stringify([1, 3, 5, 9, 15, 25, 27, 45, 75, 81, 135, 225, 405, 675, 2025]));
check('T8: a prime p has exactly two divisors 1 and p (the treaty in counting form)', [2, 3, 5, 7, 11, 13, 17, 19, 23, 29, 31, 37, 41, 43, 47].every((p) => JSON.stringify(divisorsOf(p)) === JSON.stringify([1, p])));
check('T9: 2401 = 7^4 -> (4+1) = 5 divisors (prime-power row of the gallery)', 4 + 1 === 5 && countDivisors(2401) === 5);

/* ============================================================
 * U. Lesson 3.2 — exercises and quiz numbers
 * ==========================================================*/
check('U1: L1 classify 1..12: primes {2,3,5,7,11}, composites {4,6,8,9,10,12}, 1 neither', (() => {
  let ok = true;
  for (let n = 1; n <= 12; n++) {
    const c = divisorsOf(n).length;
    if (n === 1) ok = ok && c === 1;
    else if ([2, 3, 5, 7, 11].includes(n)) ok = ok && c === 2;
    else ok = ok && c >= 3;
  }
  return ok;
})());
check('U2: L2 primes between 20 and 50: 23,29,31,37,41,43,47 (seven)', JSON.stringify(primesUpTo(50).filter((p) => p > 20)) === JSON.stringify([23, 29, 31, 37, 41, 43, 47]));
check('U3: L2 the other 20..50 numbers are composite (21,22,24,25,26,27,28,30,32,33,34,35,36,38,39,40,42,44,45,46,48,49,50)', [21, 22, 24, 25, 26, 27, 28, 30, 32, 33, 34, 35, 36, 38, 39, 40, 42, 44, 45, 46, 48, 49, 50].every((n) => !isPrime(n)) && 21 === 3 * 7 && 25 === 5 * 5 && 27 === 3 ** 3 && 33 === 3 * 11 && 35 === 5 * 7 && 39 === 3 * 13 && 49 === 7 * 7);
check('U4: L3 84 = 2^2 x 3 x 7 (84 = 2x42 = 2x2x21); 126 = 2 x 3^2 x 7 (126 = 2x63 = 2x9x7)', 84 === 2 ** 2 * 3 * 7 && JSON.stringify(primeFactors(84)) === JSON.stringify([2, 2, 3, 7]) && 126 === 2 * 3 ** 2 * 7 && JSON.stringify(primeFactors(126)) === JSON.stringify([2, 3, 3, 7]));
check('U5: L3 what 84 and 126 share: 2x3x7 = 42 (the HCF seed)', 2 * 3 * 7 === 42 && 84 % 42 === 0 && 126 % 42 === 0);
check('U6: L6 divisors of 4896 spot checks: 48 = 16x3 divides 4896 (102x48); 272 = 16x17 divides (18x272); 144 = 16x9 divides (34x144)', 4896 === 102 * 48 && 4896 === 18 * 272 && 4896 === 34 * 144);
check('U7: quiz Q1: 89 prime (S = 17, 89 = 7x12 + 5); wrong options 91 = 7x13, 87 = 3x29, 51 = 3x17', isPrime(89) && S(89) === 17 && 7 * 12 + 5 === 89 && 91 === 7 * 13 && 87 === 3 * 29 && 51 === 3 * 17);
check('U8: quiz Q3: 25 primes below 100 (cross Q1)', primesUpTo(97).length === 25);
check('U9: quiz Q4: 60 = 2^2 x 3 x 5 all-prime; distractors 30, 15, 10 composite', 2 ** 2 * 3 * 5 === 60 && [30, 15, 10].every((n) => !isPrime(n)));
check('U10: quiz Q5: 48 has 10 divisors (cross T1)', countDivisors(48) === 10);
check('U11: quiz Q2 rationale: 91 has the large factor 13 > sqrt(91) ~ 9.5, paired with 7 < sqrt(91)', 91 === 7 * 13 && 7 * 7 < 91 && 91 < 10 * 10);
check('U12: sieve block: crossing 2 from 4, 3 from 9, 5 from 25, 7 from 49 — all smaller multiples already crossed', [4, 9, 25, 49].every((s) => !isPrime(s)));
check('U13: primes in 80..100 are 83, 89, 97 (three) vs ten below 30 — the sieve thins out', JSON.stringify(primesUpTo(100).filter((p) => p >= 80)) === JSON.stringify([83, 89, 97]) && primesUpTo(29).length === 10);

/* ============================================================
 * V. Lesson 3.3 "Highest Common Factor" — definitions and the
 *    atoms route (shared primes at the smaller powers)
 * ==========================================================*/
function gcd(a: number, b: number): number {
  let x = a, y = b;
  while (y > 0) { const r = x % y; x = y; y = r; }
  return x;
}
function gcd3(a: number, b: number, c: number): number {
  return gcd(gcd(a, b), c);
}
// V1: the definition — a common divisor divides both; the HCF is the
// greatest one; divisibility cross-checks for the opening scene
check('V1: 42 divides 84 and 126 (84 = 2x42, 126 = 3x42); no larger common divisor exists', 84 % 42 === 0 && 126 % 42 === 0 && gcd(84, 126) === 42 && divisorsOf(84).filter((d) => 126 % d === 0).every((d) => d <= 42) && divisorsOf(84).filter((d) => 126 % d === 0).includes(42));
// V2: listing route — factors of 48 and 60, common {1,2,3,4,6,12}, HCF 12
check('V2: factors of 48 = {1,2,3,4,6,8,12,16,24,48}; of 60 = {1,2,3,4,5,6,10,12,15,20,30,60}; common {1,2,3,4,6,12}; HCF 12', JSON.stringify(divisorsOf(48)) === JSON.stringify([1, 2, 3, 4, 6, 8, 12, 16, 24, 48]) && JSON.stringify(divisorsOf(60)) === JSON.stringify([1, 2, 3, 4, 5, 6, 10, 12, 15, 20, 30, 60]) && JSON.stringify(divisorsOf(48).filter((d) => divisorsOf(60).includes(d))) === JSON.stringify([1, 2, 3, 4, 6, 12]) && gcd(48, 60) === 12);
// V3: the atoms route — HCF(96, 720): 96 = 2^5 x 3, 720 = 2^4 x 3^2 x 5,
// shared primes at the SMALLER powers: 2^4 x 3 = 48 (Lesson 3.2's opener)
check('V3: 96 = 2^5 x 3 and 720 = 2^4 x 3^2 x 5; HCF = 2^4 x 3 = 48 = gcd(96,720)', JSON.stringify(primeFactors(96)) === JSON.stringify([2, 2, 2, 2, 2, 3]) && JSON.stringify(primeFactors(720)) === JSON.stringify([2, 2, 2, 2, 3, 3, 5]) && 2 ** 4 * 3 === 48 && gcd(96, 720) === 48);
// V4: min-exponent logic verified by exhaustive divisor enumeration
check('V4: 48 is a divisor of both 96 and 720, and every common divisor of the pair divides 48 (greatest, not just a)', divisorsOf(96).includes(48) && divisorsOf(720).includes(48) && divisorsOf(96).filter((d) => 720 % d === 0).every((d) => 48 % d === 0));
// V5: the exam-hall pair — HCF(4896, 720) = 2^4 x 3^2 = 144
check('V5: 4896 = 2^5 x 3^2 x 17 and 720 = 2^4 x 3^2 x 5; HCF = 2^4 x 3^2 = 144 = gcd(4896,720)', 2 ** 4 * 3 ** 2 === 144 && gcd(4896, 720) === 144 && 4896 % 144 === 0 && 720 % 144 === 0);
// V6: a missing prime is exponent 0 — HCF(2025, 4896): 2025 = 3^4 x 5^2,
// 4896 = 2^5 x 3^2 x 17; only 3 is shared: 3^2 = 9
check('V6: 2025 = 3^4 x 5^2, 4896 = 2^5 x 3^2 x 17; HCF = 3^2 = 9 (the 2 and 5 and 17 are min(.,0) = 0)', JSON.stringify(primeFactors(2025)) === JSON.stringify([3, 3, 3, 3, 5, 5]) && 3 ** 2 === 9 && gcd(2025, 4896) === 9 && gcd(2025, 4896) === 3 ** Math.min(4, 2));
// V7: coprime pairs — no shared atom means HCF 1
check('V7: coprime: gcd(9, 35) = 1 (3^2 vs 5x7); gcd(8, 15) = 1; gcd(16, 17) = 1 (Khattar ch.1 pair)', gcd(9, 35) === 1 && gcd(8, 15) === 1 && gcd(16, 17) === 1);
// V8: consecutive integers are always coprime — d | n and d | n+1 forces d | 1
check('V8: consecutive pairs are coprime: gcd(87,88) = gcd(1000,1001) = gcd(48,49) = 1', gcd(87, 88) === 1 && gcd(1000, 1001) === 1 && gcd(48, 49) === 1);
// V9: HCF of a number with itself is the number; 1 divides everything, HCF(1, n) = 1
check('V9: gcd(n, n) = n (take 48, 60, 4896); gcd(1, n) = 1 (take 1, 96)', [48, 60, 4896].every((n) => gcd(n, n) === n) && gcd(1, 96) === 1);

/* ============================================================
 * W. Lesson 3.3 — the Euclidean division method (ladder) and
 *    Bézout's identity (the proof debt from 3.2)
 * ==========================================================*/
// W1: the ladder for (4896, 720): 4896 = 6x720 + 576; 720 = 1x576 + 144;
// 576 = 4x144 + 0. Last nonzero remainder 144 = the HCF (V5 cross)
check('W1: ladder 4896 = 6x720 + 576; 720 = 1x576 + 144; 576 = 4x144 + 0 -> HCF 144', 4896 === 6 * 720 + 576 && 720 === 1 * 576 + 144 && 576 === 4 * 144 + 0 && gcd(4896, 720) === 144);
// W2: the swap lemma — any common divisor of (a, b) divides r = a - qb,
// and any common divisor of (b, r) divides a; so the pairs share divisors
check('W2: swap on step 1: common divisors of {4896, 720} = common divisors of {720, 576}; 576 = 4896 - 6x720', divisorsOf(4896).filter((d) => 720 % d === 0).join(',') === divisorsOf(720).filter((d) => 576 % d === 0).join(',') && 576 === 4896 - 6 * 720);
// W3: the seed repaid by ladder — gcd(126, 84): 126 = 1x84 + 42; 84 = 2x42 + 0 -> 42
check('W3: ladder 126 = 1x84 + 42; 84 = 2x42 + 0 -> HCF 42 (the 3.2 Exercise L3 seed)', 126 === 1 * 84 + 42 && 84 === 2 * 42 + 0 && gcd(126, 84) === 42);
// W4: three numbers by ladder chaining — gcd(1152, 768) = 384, then
// gcd(384, 1248): 1248 = 3x384 + 96; 384 = 4x96 + 0 -> 96 (the worked example)
check('W4: 1152 = 1x768 + 384; 768 = 2x384 + 0; 1248 = 3x384 + 96; 384 = 4x96 + 0 -> HCF(1152,768,1248) = 96', 1152 === 1 * 768 + 384 && 768 === 2 * 384 + 0 && 1248 === 3 * 384 + 96 && 384 === 4 * 96 + 0 && gcd3(1152, 768, 1248) === 96);
// W5: the worked-example atoms cross-check — 1152 = 2^7 x 3^2,
// 768 = 2^8 x 3, 1248 = 2^5 x 3 x 13 -> min powers 2^5 x 3 = 96
check('W5: atoms 2^7x3^2, 2^8x3, 2^5x3x13 -> HCF 2^5 x 3 = 96 (W4 cross); rebuild 32x3 = 96', 2 ** 7 * 3 ** 2 === 1152 && 2 ** 8 * 3 === 768 && 2 ** 5 * 3 * 13 === 1248 && 2 ** 5 * 3 === 96 && 32 * 3 === 96);
// W6: Bézout back-substitution on (4896, 720): 144 = 720 - 576 =
// 720 - (4896 - 6x720) = 7x720 - 4896 — an integer combination
check('W6: Bezout: 7x720 - 1x4896 = 144 = gcd; the back-substitution arithmetic', 7 * 720 - 4896 === 144 && 720 - (4896 - 6 * 720) === 144);
// W7: the termination guard — remainders strictly shrink (3.1's r < b),
// so the ladder must reach zero: spot-check monotone 576 > 144 > 0
check('W7: ladder remainders strictly decrease: 720 > 576 > 144 > 0 (the 3.1 bound r < b at work)', 720 > 576 && 576 > 144 && 144 > 0);
// W8: the crossroads lemma, instance — 7 divides 4 x 35 = 140, 7 does not
// divide 4, so 7 must divide 35 (Bézout's engine in action)
check('W8: 140 = 7 x 20 (7 | 4x35); 4 = 7x0 + 4 (7 ∤ 4); 35 = 7x5 (7 | 35)', 4 * 35 === 140 && 140 === 7 * 20 && 4 % 7 === 4 && 35 % 7 === 0);
// W9: Bézout instance for the lemma — gcd(7, 4) = 1 and 2x7 - 3x4 = 2? No:
// the certificate is 2x4 - 1x7 = 1 (2x4 - 1x7 = 8 - 7 = 1)
check('W9: Bezout certificate for gcd(7,4) = 1: 2x4 - 1x7 = 1; multiply by 35: 70x4 - 35x7 = 35, and 7 | 35', 2 * 4 - 1 * 7 === 1 && 70 * 4 - 35 * 7 === 35);
// W10: the ladder for a LONG pair — atoms win over ladders sometimes:
// gcd(2025, 4896) takes 8 steps vs one glance at the atoms (V6 cross)
check('W10: ladder steps for (2025, 4896): 4896 = 2x2025 + 846; 2025 = 2x846 + 333; 846 = 2x333 + 180; 333 = 1x180 + 153; 180 = 1x153 + 27; 153 = 5x27 + 18; 27 = 1x18 + 9; 18 = 2x9 + 0 -> 9', 4896 === 2 * 2025 + 846 && 2025 === 2 * 846 + 333 && 846 === 2 * 333 + 180 && 333 === 1 * 180 + 153 && 180 === 1 * 153 + 27 && 153 === 5 * 27 + 18 && 27 === 1 * 18 + 9 && 18 === 2 * 9 + 0 && gcd(2025, 4896) === 9);

/* ============================================================
 * X. Lesson 3.3 — coprime-split theorem (3.1's trap generalised)
 *    and the remainder-variant exam patterns
 * ==========================================================*/
// X1: the theorem instance — gcd(3, 4) = 1, 3 | 2376 (S = 18), 4 | 2376
// (tail 76), so 12 | 2376: 2376 = 12 x 198
check('X1: S(2376) = 18 and tail 76 divisible by 4 -> 12 | 2376; 2376 = 12 x 198', String(2376).split('').reduce((s, d) => s + Number(d), 0) === 18 && 76 % 4 === 0 && 2376 === 12 * 198 && 2376 % 12 === 0);
// X2: the counter-instance — 2 | 18 and 6 | 18 but 12 ∤ 18 (gcd(2, 6) = 2)
check('X2: 18 % 2 = 0, 18 % 6 = 0, 18 % 12 = 6 — the 2x6 split over-admits (3.1 trap)', 18 % 2 === 0 && 18 % 6 === 0 && 18 % 12 === 6 && gcd(2, 6) === 2);
// X3: the remainder-variant — greatest d dividing 689, 1124, 1706 leaving
// remainders 5, 8, 14: HCF(684, 1116, 1692) = 2^2 x 3^2 = 36
check('X3: 689-5 = 684, 1124-8 = 1116, 1706-14 = 1692; atoms 2^2x3^2x19, 2^2x3^2x31, 2^2x3^2x47 -> HCF 36; rebuilds: 689 = 19x36 + 5, 1124 = 31x36 + 8, 1706 = 47x36 + 14', 689 - 5 === 684 && 1124 - 8 === 1116 && 1706 - 14 === 1692 && JSON.stringify(primeFactors(684)) === JSON.stringify([2, 2, 3, 3, 19]) && JSON.stringify(primeFactors(1116)) === JSON.stringify([2, 2, 3, 3, 31]) && JSON.stringify(primeFactors(1692)) === JSON.stringify([2, 2, 3, 3, 47]) && 2 ** 2 * 3 ** 2 === 36 && gcd3(684, 1116, 1692) === 36 && 689 === 19 * 36 + 5 && 1124 === 31 * 36 + 8 && 1706 === 47 * 36 + 14);
// X4: 19, 31, 47 are prime and pairwise coprime (why the HCF is exactly 36)
check('X4: 19, 31, 47 all prime; gcds pairwise 1', [19, 31, 47].every((p) => isPrime(p)) && gcd(19, 31) === 1 && gcd(31, 47) === 1 && gcd(19, 47) === 1);
// X5: the same-remainder-unknown pattern — greatest d dividing 152, 277,
// 427 leaving equal remainders: HCF of pairwise differences
check('X5: differences 277-152 = 125, 427-277 = 150, 427-152 = 275; HCF = 25; instance check: 152 = 6x25 + 2, 277 = 11x25 + 2, 427 = 17x25 + 2 (equal remainder 2)', 277 - 152 === 125 && 427 - 277 === 150 && 427 - 152 === 275 && gcd3(125, 150, 275) === 25 && 152 === 6 * 25 + 2 && 277 === 11 * 25 + 2 && 427 === 17 * 25 + 2);
// X6: why differences suffice — if d divides all three with the same
// remainder r, then d divides each pairwise difference
check('X6: d | 152 and d | 277 => d | 125 (277 - 152); d | 277 and d | 427 => d | 150', 125 % 25 === 0 && 150 % 25 === 0 && 275 % 25 === 0);

/* ============================================================
 * Y. Lesson 3.3 — exercises and quiz numbers
 * ==========================================================*/
// Y1: L1 factors of 36 and 54: common {1,2,3,6,9,18}, HCF 18
check('Y1: factors of 36 = {1,2,3,4,6,9,12,18,36}; of 54 = {1,2,3,6,9,18,27,54}; common {1,2,3,6,9,18}; HCF 18', JSON.stringify(divisorsOf(36)) === JSON.stringify([1, 2, 3, 4, 6, 9, 12, 18, 36]) && JSON.stringify(divisorsOf(54)) === JSON.stringify([1, 2, 3, 6, 9, 18, 27, 54]) && JSON.stringify(divisorsOf(36).filter((d) => divisorsOf(54).includes(d))) === JSON.stringify([1, 2, 3, 6, 9, 18]) && gcd(36, 54) === 18);
// Y2: L1 every common factor of 48 and 60 (V2 pair) divides the HCF 12
check('Y2: common factors of 48 and 60 are exactly the divisors of 12: {1,2,3,4,6,12}', JSON.stringify(divisorsOf(48).filter((d) => divisorsOf(60).includes(d))) === JSON.stringify(divisorsOf(12)));
// Y3: L2 atoms route — HCF(36, 84) = 2^2 x 3 = 12; HCF(34, 102) = 34
// (102 = 3 x 34 — the larger IS the HCF); HCF(27, 63) = 9
check('Y3: 36 = 2^2x3^2, 84 = 2^2x3x7 -> HCF 12; 34 = 2x17, 102 = 2x3x17 -> HCF 34; 27 = 3^3, 63 = 3^2x7 -> HCF 9', JSON.stringify(primeFactors(36)) === JSON.stringify([2, 2, 3, 3]) && JSON.stringify(primeFactors(84)) === JSON.stringify([2, 2, 3, 7]) && gcd(36, 84) === 12 && JSON.stringify(primeFactors(34)) === JSON.stringify([2, 17]) && JSON.stringify(primeFactors(102)) === JSON.stringify([2, 3, 17]) && gcd(34, 102) === 34 && JSON.stringify(primeFactors(27)) === JSON.stringify([3, 3, 3]) && JSON.stringify(primeFactors(63)) === JSON.stringify([3, 3, 7]) && gcd(27, 63) === 9);
// Y4: L2 the three-number atoms case — HCF(70, 105, 175) = 5 x 7 = 35
check('Y4: 70 = 2x5x7, 105 = 3x5x7, 175 = 5^2x7 -> HCF 5x7 = 35', JSON.stringify(primeFactors(70)) === JSON.stringify([2, 5, 7]) && JSON.stringify(primeFactors(105)) === JSON.stringify([3, 5, 7]) && JSON.stringify(primeFactors(175)) === JSON.stringify([5, 5, 7]) && gcd3(70, 105, 175) === 35 && 5 * 7 === 35);
// Y5: L3 the seed repaid — gcd(84, 126) by ladder = 42 = 2 x 3 x 7 (W3,
// U5 cross): 4896-hall style verification that 42 = HCF from atoms too
check('Y5: atoms of 84 = {2,2,3,7} and 126 = {2,3,3,7}: shared 2,3,7 at smaller powers 2^1x3^1x7^1 = 42 (U4/U5/W3 cross)', 2 * 3 * 7 === 42 && gcd(84, 126) === 42 && Math.min(2, 1) === 1 && Math.min(1, 2) === 1);
// Y6: L4 coprime-split needs BOTH parts — n = 1,053,060: S = 15 (9 ∤, since
// 15 is not a multiple of 9) and n = 7 x 150437 + 1 (7 ∤) -> 63 ∤
check('Y6: S(1053060) = 15 so 9 does NOT divide it (1053060 = 9x117006 + 6); 1053060 = 7x150437 + 1 so 7 does NOT divide it; hence 63 does not divide it either', String(1053060).split('').reduce((s, d) => s + Number(d), 0) === 15 && 1053060 % 9 === 6 && 1053060 % 7 === 1 && 9 * 117006 === 1053054 && 7 * 150437 === 1053059);
// Y6b: corrected pick — n = 44,100: 7 | 44100 (6300 x 7), 9 | 44100 (S = 9),
// gcd(7, 9) = 1 -> 63 | 44100: 44100 = 63 x 700
check('Y6b: 44100 = 63x700; S(44100) = 9 -> 9 |; 44100 = 7x6300 -> 7 |; gcd(7,9) = 1', 44100 === 63 * 700 && String(44100).split('').reduce((s, d) => s + Number(d), 0) === 9 && 44100 === 7 * 6300 && gcd(7, 9) === 1 && 44100 % 63 === 0);
// Y7: L5 the remainder-variant problem (X3 numbers): 36 with quotients
// 19, 31, 47 and remainders 5, 8, 14
check('Y7: quiz/verify remainder variant: 689 = 36x19 + 5; 1124 = 36x31 + 8; 1706 = 36x47 + 14', 689 === 36 * 19 + 5 && 1124 === 36 * 31 + 8 && 1706 === 36 * 47 + 14);
// Y8: L6 the composer's problem — numbers with HCF 12 summing to 156:
// 12(a + b) = 156, a + b = 13; all six reduced pairs coprime because
// gcd(a, 13 - a) divides 13, and 0 < a < 13 rules out 13
check('Y8: six pairs (12,144),(24,132),(36,120),(48,108),(60,96),(72,84); each sums 156 and has HCF 12; reduced pairs (1,12),(2,11),(3,10),(4,9),(5,8),(6,7) all coprime', [[12, 144], [24, 132], [36, 120], [48, 108], [60, 96], [72, 84]].every(([a, b]) => a + b === 156 && gcd(a, b) === 12) && [[1, 12], [2, 11], [3, 10], [4, 9], [5, 8], [6, 7]].every(([a, b]) => a + b === 13 && gcd(a, b) === 1) && 12 * 13 === 156);
// Y9: L6 exhaustive check — no seventh pair exists (quotients 0 < a < b, a + b = 13)
check('Y9: exactly six coprime splits of 13: a in 1..6, b = 13 - a; a = 7..12 mirror the six', (() => {
  const pairs: number[][] = [];
  for (let a = 1; a < 13; a++) { const b = 13 - a; if (a < b && gcd(a, b) === 1) pairs.push([a, b]); }
  return pairs.length === 6 && JSON.stringify(pairs.map(([a, b]) => [12 * a, 12 * b])) === JSON.stringify([[12, 144], [24, 132], [36, 120], [48, 108], [60, 96], [72, 84]]);
})());
// Y10: quiz Q — ladder reading: the HCF is the LAST NONZERO remainder
check('Y10: quiz cross: last nonzero remainder of (4896, 720) ladder is 144 (W1); of (126, 84) ladder is 42 (W3)', gcd(4896, 720) === 144 && gcd(126, 84) === 42);
// Y11: quiz Q — which pair is coprime: (9, 35) yes; (14, 21) no (7); (15, 25) no (5); (12, 18) no (6)
check('Y11: quiz coprime pick: gcd(9,35) = 1; gcd(14,21) = 7; gcd(15,25) = 5; gcd(12,18) = 6', gcd(9, 35) === 1 && gcd(14, 21) === 7 && gcd(15, 25) === 5 && gcd(12, 18) === 6);
// Y12: quiz Q — HCF(91, 112, 49) = 7 (91 = 7x13, 112 = 2^4x7, 49 = 7^2)
check('Y12: HCF(91,112,49) = 7; atoms 7x13, 2^4x7, 7^2 -> shared 7 at power 1', gcd3(91, 112, 49) === 7 && 91 === 7 * 13 && 112 === 2 ** 4 * 7 && 49 === 7 ** 2);
// Y13: quiz Q — the Bézout combination for (4896, 720) is -1 x 4896 + 7 x 720
check('Y13: -1x4896 + 7x720 = 144 (W6 cross); the wrong signs fail: +1x4896 - 7x720 = -144 ≠ 144', -4896 + 7 * 720 === 144 && 4896 - 7 * 720 === -144);
// Y14: quiz Q — Venn preview: LCM(96, 720) = 2 x 48 x 15 = 1440 and
// HCF x LCM = 96 x 720 (the product rule, Lesson 3.5 preview)
check('Y14: Venn: 96-only 2, shared 48, 720-only 15 -> LCM 2x48x15 = 1440; 48x1440 = 96x720 = 69120', 2 * 48 * 15 === 1440 && 48 * 1440 === 96 * 720 && 96 * 720 === 69120);

/* ============================================================
 * SECTION Z — Lesson 3.4 "Lowest Common Multiple"
 * Every number below is verified BEFORE it is written into ch-03.ts.
 * ==========================================================*/
function lcm2(a: number, b: number): number {
  return (a * b) / gcd(a, b);
}
function lcm3(a: number, b: number, c: number): number {
  return lcm2(lcm2(a, b), c);
}

// Z1: the definition pair — multiples of 12 and 18 up to 120; common
// multiples are 36, 72, 108; the least is 36 = 3 x 12 = 2 x 18
{
  const m12 = [12, 24, 36, 48, 60, 72, 84, 96, 108, 120];
  const m18 = [18, 36, 54, 72, 90, 108];
  const common = m12.filter((m) => m18.includes(m));
  check('Z1: common multiples of 12 and 18 up to 120 are exactly 36, 72, 108; 36 = 3x12 = 2x18', JSON.stringify(common) === JSON.stringify([36, 72, 108]) && 36 === 3 * 12 && 36 === 2 * 18);
}
// Z2: the counting structure — every common multiple of 12 and 18 up to 500
// is a multiple of 36, and there are floor(500/36) = 13 of them
check('Z2: common multiples of 12 and 18 up to 500 are exactly the 13 multiples of 36 (36x1..468)', (() => {
  const commons: number[] = [];
  for (let n = 1; n <= 500; n++) if (n % 12 === 0 && n % 18 === 0) commons.push(n);
  const mults36: number[] = [];
  for (let k = 1; k * 36 <= 500; k++) mults36.push(k * 36);
  return JSON.stringify(commons) === JSON.stringify(mults36) && commons.length === 13 && mults36[12] === 468;
})());
// Z3: the listing route pair — 16 and 24: common multiples up to 100 are
// 48, 96; the least is 48 = 2 x 24 = 3 x 16
check('Z3: multiples of 16 up to 100: 16,32,48,64,80,96; of 24: 24,48,72,96; common = 48, 96; LCM 48 = 2x24 = 3x16', [16, 32, 48, 64, 80, 96].every((m, i) => m === 16 * (i + 1)) && [24, 48, 72, 96].every((m, i) => m === 24 * (i + 1)) && 16 % 48 === 16 && 48 === lcm2(16, 24) && 48 === 2 * 24 && 48 === 3 * 16 && 48 % 16 === 0 && 48 % 24 === 0);
// Z4: every common multiple of 16 and 24 up to 400 is a multiple of 48
check('Z4: common multiples of 16 and 24 up to 400 = the 8 multiples of 48 (48x1..384)', (() => {
  const commons: number[] = [];
  for (let n = 1; n <= 400; n++) if (n % 16 === 0 && n % 24 === 0) commons.push(n);
  const mults48: number[] = [];
  for (let k = 1; k * 48 <= 400; k++) mults48.push(k * 48);
  return JSON.stringify(commons) === JSON.stringify(mults48) && commons.length === 8 && mults48[7] === 384;
})());
// Z5: the atoms route on 3.3's Venn pair — 96 = 2^5 x 3, 720 = 2^4 x 3^2 x 5,
// LCM = 2^5 x 3^2 x 5 = 1440 = 2 x 48 x 15 (the Venn union territory)
check('Z5: 96 = 2^5x3 (160? no: 32x3), 720 = 2^4x3^2x5 (16x9x5), LCM = 2^5x3^2x5 = 32x9x5 = 1440 = 2x48x15; 1440/96 = 15, 1440/720 = 2', 32 * 3 === 96 && 16 * 9 * 5 === 720 && 32 * 9 * 5 === 1440 && 2 * 48 * 15 === 1440 && 1440 % 96 === 0 && 1440 % 720 === 0 && 1440 / 96 === 15 && 1440 / 720 === 2 && lcm2(96, 720) === 1440);
// Z6: the smaller-power slip — taking the SMALLER powers gives 2^4 x 3 = 48,
// which is the HCF, not the LCM; 48 divides neither 96 nor... (48 | 96 but
// 48 does not divide 720; and 48 < 96 so it cannot be a multiple of 96)
check('Z6: smaller-power slip 2^4x3 = 48 is the HCF(96, 720); 48 divides 96 but not 720 (720 = 15x48 - 0? no: 720/48 = 15 exactly — the slip fails because 48 < 96 cannot be a multiple of 96)', gcd(96, 720) === 48 && 2 ** 4 * 3 === 48 && 48 * 2 === 96 && 720 % 48 === 0 && 96 % 48 === 0 && 48 < 96 && 96 % 48 === 0 && 720 % 96 !== 0);
// Z7: the product-rule cross (banked for 3.5) — 48 x 1440 = 69120 = 96 x 720
check('Z7: 48x1440 = 69120 = 96x720 (product rule whisper, Lesson 3.5 owns the theorem)', 48 * 1440 === 69120 && 96 * 720 === 69120 && gcd(96, 720) * lcm2(96, 720) === 96 * 720);
// Z8: the missing prime is exponent 0 — LCM(48, 60) = 2^4 x 3 x 5 = 240
// (the 5 lives only in 60, so the LCM carries it at power 1)
check('Z8: 48 = 2^4x3, 60 = 2^2x3x5 -> LCM = 2^4x3x5 = 240; 240/48 = 5, 240/60 = 4; listing: multiples of 48 up to 240 are 48,96,144,192,240 and of 60 are 60,120,180,240 — first common 240', 16 * 3 * 5 === 240 && 240 / 48 === 5 && 240 / 60 === 4 && [48, 96, 144, 192, 240].every((m, i) => m === 48 * (i + 1)) && [60, 120, 180, 240].every((m, i) => m === 60 * (i + 1)) && lcm2(48, 60) === 240);
// Z9: the divisibility extreme — when a | b, LCM(a, b) = b: 48 | 720
// (720 = 15 x 48) so LCM(48, 720) = 720, NOT 1440 (that pair was 96 and 720)
check('Z9: 720 = 15x48 so 48 | 720 and LCM(48, 720) = 720; contrast 96 does NOT divide 720 (720/96 = 7.5) so LCM(96, 720) = 1440', 48 * 15 === 720 && 720 % 48 === 0 && lcm2(48, 720) === 720 && 720 % 96 !== 0 && 96 * 7.5 === 720 && lcm2(96, 720) === 1440);
// Z10: the coprime extreme — 3.3's coprime pairs return: LCM = product
check('Z10: gcd(9,35)=1 -> LCM 315 = 9x35; gcd(8,15)=1 -> LCM 120 = 8x15; gcd(16,17)=1 -> LCM 272 = 16x17', lcm2(9, 35) === 315 && 9 * 35 === 315 && lcm2(8, 15) === 120 && 8 * 15 === 120 && lcm2(16, 17) === 272 && 16 * 17 === 272);
// Z11: the identity edges — LCM(n, n) = n and LCM(1, n) = n
check('Z11: LCM(12, 12) = 12; LCM(1, 720) = 720; and LCM(a, b) >= max(a, b) for the text pairs', lcm2(12, 12) === 12 && lcm2(1, 720) === 720 && lcm2(12, 18) >= 18 && lcm2(96, 720) >= 720 && lcm2(16, 24) >= 24);
// Z12: the ladder route (Khattar Method II) — 12, 15, 20, 54:
// rows 2 -> 6,15,10,27; 2 -> 3,15,5,27; 3 -> 1,5,5,9; 5 -> 1,1,1,9;
// LCM = 2 x 2 x 3 x 5 x 9 = 540
check('Z12: ladder rows for 12,15,20,54: 2|-> 6,15,10,27; 2|-> 3,15,5,27; 3|-> 1,5,5,9 (5 carried); 5|-> 1,1,1,9 (9 carried); product 2x2x3x5x9 = 540', 12 % 2 === 0 && 20 % 2 === 0 && 54 % 2 === 0 && 15 % 2 !== 0 && [12, 20, 54].every((n) => n % 2 === 0) && [6, 15, 10, 27].filter((n) => n % 3 === 0).join(',') === '6,15,27' && [3, 15, 27].every((n) => n % 3 === 0) && [1, 5, 5, 9].filter((n) => n % 5 === 0).join(',') === '5,5' && 2 * 2 * 3 * 5 * 9 === 540);
// Z13: ladder cross-check by atoms — 12 = 2^2x3, 15 = 3x5, 20 = 2^2x5,
// 54 = 2x3^3 -> LCM = 2^2 x 3^3 x 5 = 540
check('Z13: atoms LCM(12,15,20,54) = 2^2 x 3^3 x 5 = 4x27x5 = 540; 540/12 = 45, 540/15 = 36, 540/20 = 27, 540/54 = 10', 4 * 27 * 5 === 540 && 540 % 12 === 0 && 540 % 15 === 0 && 540 % 20 === 0 && 540 % 54 === 0 && 540 / 12 === 45 && 540 / 15 === 36 && 540 / 20 === 27 && 540 / 54 === 10);
// Z14: the cords flip — LCM(1152, 768, 1248): 1152 = 2^7 x 3^2,
// 768 = 2^8 x 3, 1248 = 2^5 x 3 x 13 -> LCM = 2^8 x 3^2 x 13 = 29952
check('Z14: 1152 = 128x9, 768 = 256x3, 1248 = 32x39 = 2^5x3x13; LCM = 2^8x3^2x13 = 256x9x13 = 29952; 29952/1152 = 26, /768 = 39, /1248 = 24; 29952 cm = 299.52 m', 128 * 9 === 1152 && 256 * 3 === 768 && 32 * 39 === 1248 && 1248 % 13 === 0 && 1248 / 13 === 96 && 256 * 9 * 13 === 29952 && 29952 % 1152 === 0 && 29952 % 768 === 0 && 29952 % 1248 === 0 && 29952 / 1152 === 26 && 29952 / 768 === 39 && 29952 / 1248 === 24 && 29952 / 100 === 299.52);
// Z15: exam pattern 1 — least number exactly divisible by 36, 45, 63, 80:
// LCM = 2^4 x 3^2 x 5 x 7 = 5040
check('Z15: 36 = 2^2x3^2, 45 = 3^2x5, 63 = 3^2x7, 80 = 2^4x5 -> LCM 2^4x3^2x5x7 = 16x9x35 = 5040; quotients 140, 112, 80, 63', 16 * 9 * 5 * 7 === 5040 && 5040 % 36 === 0 && 5040 % 45 === 0 && 5040 % 63 === 0 && 5040 % 80 === 0 && 5040 / 36 === 140 && 5040 / 45 === 112 && 5040 / 63 === 80 && 5040 / 80 === 63);
// Z16: exam pattern 2 — least number divided by 12, 16, 18 leaving
// remainder 5 in each case: LCM(12,16,18) = 2^4 x 3^2 = 144, N = 144 + 5 = 149
check('Z16: LCM(12,16,18) = 2^4x3^2 = 144; 149 = 12x12+5 = 16x9+5 = 18x8+5; k=0 gives 5 = 0x12+5 (quotient 0 — not a serious division)', lcm3(12, 16, 18) === 144 && 2 ** 4 * 3 ** 2 === 144 && 144 + 5 === 149 && 149 === 12 * 12 + 5 && 149 === 16 * 9 + 5 && 149 === 18 * 8 + 5 && 5 === 0 * 12 + 5 && 5 === 0 * 16 + 5 && 5 === 0 * 18 + 5);
// Z17: the deficiency twin — least number divided by 9, 10, 15 leaving
// remainders 4, 5, 10: deficiencies 9-4 = 10-5 = 15-10 = 5; LCM(9,10,15) = 90
// (2 x 3^2 x 5); N = 90 - 5 = 85
check('Z17: 9-4 = 10-5 = 15-10 = 5; LCM(9,10,15) = 2x3^2x5 = 90; 85 = 9x9+4 = 10x8+5 = 15x5+10; N + 5 = 90 = LCM', 9 - 4 === 5 && 10 - 5 === 5 && 15 - 10 === 5 && lcm3(9, 10, 15) === 90 && 2 * 9 * 5 === 90 && 90 - 5 === 85 && 85 === 9 * 9 + 4 && 85 === 10 * 8 + 5 && 85 === 15 * 5 + 10 && 85 + 5 === 90);
// Z18: the deficiency twin, three-number instance (exercise L5) — remainders
// 3, 6, 11 for 12, 15, 20: deficiencies all 9; LCM(12,15,20) = 60; N = 51
check('Z18: 12-3 = 15-6 = 20-11 = 9; LCM(12,15,20) = 2^2x3x5 = 60; 60 - 9 = 51 = 12x4+3 = 15x3+6 = 20x2+11', 12 - 3 === 9 && 15 - 6 === 9 && 20 - 11 === 9 && lcm3(12, 15, 20) === 60 && 4 * 3 * 5 === 60 && 60 - 9 === 51 && 51 === 12 * 4 + 3 && 51 === 15 * 3 + 6 && 51 === 20 * 2 + 11);
// Z19: counting multiples — up to 300 divisible by 5 and 7: LCM 35,
// floor(300/35) = 8 (the eighth is 280)
check('Z19: LCM(5,7) = 35; floor(300/35) = 8; 8x35 = 280, 9x35 = 315 > 300', lcm2(5, 7) === 35 && Math.floor(300 / 35) === 8 && 8 * 35 === 280 && 9 * 35 === 315);
// Z20: counting multiples, the between-bounds version — numbers between
// 100 and 500 divisible by 42: floor(500/42) = 11, floor(100/42) = 2 -> 9
check('Z20: LCM(6,7) = 42; floor(500/42) = 11 (462), floor(100/42) = 2 (84); 11 - 2 = 9', lcm2(6, 7) === 42 && Math.floor(500 / 42) === 11 && 11 * 42 === 462 && Math.floor(100 / 42) === 2 && 2 * 42 === 84 && 11 - 2 === 9);
// Z21: the bells — five bells toll at intervals 2, 4, 6, 8, 10 minutes,
// starting together: together every LCM = 2^3 x 3 x 5 = 120 min = 2 h;
// in one day (1440 min) they coincide 1440/120 = 12 times after the start
check('Z21: LCM(2,4,6,8,10) = 2^3x3x5 = 120; 1440/120 = 12 coincidences after the start (13 with it)', lcm2(lcm2(lcm2(2, 4), lcm2(6, 8)), 10) === 120 && 8 * 3 * 5 === 120 && 24 * 60 === 1440 && 1440 / 120 === 12 && 120 === 2 * 60);
// Z22: the bus figure — ticks for 12-min and 18-min lanes to 108 minutes;
// shared departure minutes are 0, 36, 72, 108
check('Z22: figure lanes: multiples of 12 up to 108 (10 ticks) and of 18 up to 108 (7 ticks); shared = 0, 36, 72, 108; scale 600/108 px per minute puts them at x = 40, 240, 440, 640', (() => {
  const laneA: number[] = []; for (let m = 0; m <= 108; m += 12) laneA.push(m);
  const laneB: number[] = []; for (let m = 0; m <= 108; m += 18) laneB.push(m);
  const shared = laneA.filter((m) => laneB.includes(m));
  const x = (m: number) => 40 + (m * 600) / 108;
  return laneA.length === 10 && laneB.length === 7 && JSON.stringify(shared) === JSON.stringify([0, 36, 72, 108]) && [0, 36, 72, 108].every((m) => Math.abs(x(m) - [40, 240, 440, 640][[0, 36, 72, 108].indexOf(m)]) < 1e-9);
})());
// Z23: the smallest 4-digit number divisible by 18, 24, 32 (exercise L4):
// LCM = 2^5 x 3^2 = 288; 1000 = 3x288 + 136 -> k = 4 -> 1152
check('Z23: LCM(18,24,32) = 2^5x3^2 = 288; 1000/288 = 3.47 so k = 4; 4x288 = 1152 = 18x64 = 24x48 = 32x36', lcm3(18, 24, 32) === 288 && 32 * 9 === 288 && 288 * 3 === 864 && 1000 - 864 === 136 && 288 * 4 === 1152 && 1152 % 18 === 0 && 1152 % 24 === 0 && 1152 % 32 === 0 && 1152 / 18 === 64 && 1152 / 24 === 48 && 1152 / 32 === 36);
// Z24: the L6 completeness problem — pairs (a, b), a < b, with
// LCM(a, b) = 18: both divide 18, and the seven pairs are
// (1,18), (2,9), (2,18), (3,18), (6,9), (6,18), (9,18)
check('Z24: exactly seven pairs a < b with lcm 18, found by exhaustive search over the divisors of 18', (() => {
  const pairs: number[][] = [];
  for (let a = 1; a <= 18; a++) for (let b = a + 1; b <= 18; b++) if (lcm2(a, b) === 18) pairs.push([a, b]);
  const want = [[1, 18], [2, 9], [2, 18], [3, 18], [6, 9], [6, 18], [9, 18]];
  return pairs.length === 7 && JSON.stringify(pairs) === JSON.stringify(want) && want.every(([a, b]) => 18 % a === 0 && 18 % b === 0);
})());
// Z25: exercise L2 — LCM(18, 24) = 2^3 x 3^2 = 72
check('Z25: 18 = 2x3^2, 24 = 2^3x3 -> LCM 2^3x3^2 = 72; 72/18 = 4, 72/24 = 3', 8 * 9 === 72 && lcm2(18, 24) === 72 && 72 / 18 === 4 && 72 / 24 === 3);
// Z26: exercise L3 ladders — 8, 12, 15, 20 -> 120; 16, 28, 40 -> 560
check('Z26: LCM(8,12,15,20) = 2^3x3x5 = 120 (120/8=15, /12=10, /15=8, /20=6); LCM(16,28,40) = 2^4x5x7 = 560 (560/16=35, /28=20, /40=14)', (() => {
  const l1 = lcm2(lcm2(8, 12), lcm2(15, 20));
  const l2 = lcm2(lcm2(16, 28), 40);
  return l1 === 120 && 8 * 3 * 5 === 120 && [15, 10, 8, 6].every((q, i) => 120 % [8, 12, 15, 20][i] === 0 && 120 / [8, 12, 15, 20][i] === q) && l2 === 560 && 16 * 5 * 7 === 560 && [35, 20, 14].every((q, i) => 560 / [16, 28, 40][i] === q);
})());
// Z27: exercise L4 — least number exactly divisible by 10, 14, 15: 210
check('Z27: LCM(10,14,15) = 2x3x5x7 = 210; 210/10 = 21, /14 = 15, /15 = 14', 2 * 3 * 5 * 7 === 210 && lcm2(lcm2(10, 14), 15) === 210 && 210 / 10 === 21 && 210 / 14 === 15 && 210 / 15 === 14);
// Z28: exercise L4 — least number divided by 16, 24, 30 leaving remainder 7:
// LCM(16,24,30) = 2^4 x 3 x 5 = 240; N = 240 + 7 = 247
check('Z28: LCM(16,24,30) = 2^4x3x5 = 240; 247 = 16x15+7 = 24x10+7 = 30x8+7', lcm3(16, 24, 30) === 240 && 16 * 3 * 5 === 240 && 240 + 7 === 247 && 247 === 16 * 15 + 7 && 247 === 24 * 10 + 7 && 247 === 30 * 8 + 7);
// Z29: exercise L5 — numbers up to 1000 divisible by both 6 and 8:
// LCM 24, floor(1000/24) = 41 (the 41st is 984)
check('Z29: LCM(6,8) = 24; floor(1000/24) = 41; 41x24 = 984, 42x24 = 1008 > 1000', lcm2(6, 8) === 24 && Math.floor(1000 / 24) === 41 && 41 * 24 === 984 && 42 * 24 === 1008);
// Z30: quiz Q1/Q2 crosses — LCM(12, 18) = 36 with distractor 216 = product;
// LCM(96, 720) = 1440 with distractors 48 (HCF), 144, 69120 (product)
check('Z30: quiz crosses: 36 = lcm(12,18) and 216 = 12x18 (product distractor); 1440 = lcm(96,720); 48 = gcd; 144 = 2^4x3^2; 69120 = product', lcm2(12, 18) === 36 && 12 * 18 === 216 && gcd(12, 18) === 6 && lcm2(96, 720) === 1440 && gcd(96, 720) === 48 && 2 ** 4 * 3 ** 2 === 144 && 96 * 720 === 69120);
// Z31: quiz Q3 — which product is the LCM of 12, 15, 20, 54:
// 2x2x3x5x9 = 540; wrong: 2x3x5 = 30 (divisors), 2x2x3x5 = 60 (forgot 9),
// 12x15x20x54 = 194400 (raw product)
check('Z31: 2x2x3x5x9 = 540 = LCM; 2x3x5 = 30 divides all four but is not a multiple of 54; 2x2x3x5 = 60 not a multiple of 54 (60/54 not whole); 12x15x20x54 = 194400', 2 * 2 * 3 * 5 * 9 === 540 && 2 * 3 * 5 === 30 && 30 % 54 !== 0 && 54 % 30 !== 0 && 2 * 2 * 3 * 5 === 60 && 60 % 54 !== 0 && 12 * 15 * 20 * 54 === 194400);
// Z32: quiz Q4 — least number divided by 12, 16, 18 leaving remainder 5:
// 149; distractors: 144 (forgot the remainder), 139 (subtracted), 5 (k = 0)
check('Z32: 149 correct; 144 = LCM without remainder; 139 = 144 - 5 (wrong sign); 5 leaves 5,5,5 with quotient 0', 144 + 5 === 149 && 144 - 5 === 139 && 5 % 12 === 5 && 5 < 12);
// Z33: quiz Q5 — numbers up to 100 divisible by both 4 and 6:
// LCM 12, floor(100/12) = 8 (the 8th is 96); distractors 25 (by 4), 16 (by 6)
check('Z33: LCM(4,6) = 12; floor(100/12) = 8; 8x12 = 96; floor(100/4) = 25; floor(100/6) = 16', lcm2(4, 6) === 12 && Math.floor(100 / 12) === 8 && 8 * 12 === 96 && Math.floor(100 / 4) === 25 && Math.floor(100 / 6) === 16);
// Z34: the Metonic cycle (historical callout) — 19 tropical years of
// 365.2422 days and 235 synodic months of 29.5306 days agree within ~2 hours
check('Z34: 19x365.2422 = 6939.60; 235x29.5306 = 6939.69; difference 0.09 day = 2.1 h', Math.abs(19 * 365.2422 - 6939.6) < 0.01 && Math.abs(235 * 29.5306 - 6939.69) < 0.01 && Math.abs(235 * 29.5306 - 19 * 365.2422) < 0.1 && Math.abs(235 * 29.5306 - 19 * 365.2422) * 24 < 2.2);
// Z35: structural sanity — LCM divides every common multiple (12, 18 case
// re-derived by brute force up to 1000) and LCM(a,b) x gcd(a,b) = ab holds
// for every pair up to 40 (the full product rule, checked broadly here,
// proved in 3.5)
check('Z35: brute force to 1000: common multiples of 12,18 = multiples of 36; product rule holds for all 1 <= a < b <= 40', (() => {
  const commons: number[] = [];
  for (let n = 1; n <= 1000; n++) if (n % 12 === 0 && n % 18 === 0) commons.push(n);
  for (let k = 1; k * 36 <= 1000; k++) if (commons[k - 1] !== k * 36) return false;
  for (let a = 1; a <= 40; a++) for (let b = a; b <= 40; b++) if (lcm2(a, b) * gcd(a, b) !== a * b) return false;
  return commons.length === Math.floor(1000 / 36);
})());

/* ============================================================
 * SECTION AA — Lesson 3.5 "HCF, LCM and How They Relate"
 * The product rule, coprime splits, pair reconstruction,
 * feasibility, the rectangle identity, and the united table.
 * ==========================================================*/
// AA1: the two banked whispers — 48 x 1440 = 96 x 720 and 6 x 36 = 12 x 18
check('AA1: 48x1440 = 69120 = 96x720 (3.3/3.4 banked cross)', 48 * 1440 === 69120 && 96 * 720 === 69120);
check('AA2: 6x36 = 216 = 12x18 (3.4 exam-callout cross)', 6 * 36 === 216 && 12 * 18 === 216);
check('AA3: gcd(96,720) = 48, lcm(96,720) = 1440; gcd(12,18) = 6, lcm(12,18) = 36', gcd(96, 720) === 48 && lcm2(96, 720) === 1440 && gcd(12, 18) === 6 && lcm2(12, 18) === 36);
// AA4: the atoms identity, prime by prime, for 96 = 2^5 x 3 and 720 = 2^4 x 3^2 x 5:
// min+max = alpha+beta for every prime; the product carries 2^9 x 3^3 x 5 = 69120
check('AA4: per-prime min+max = alpha+beta (2: 4+5=9; 3: 1+2=3; 5: 0+1=1) and 2^9x3^3x5 = 69120', 4 + 5 === 9 && 1 + 2 === 3 && 0 + 1 === 1 && 2 ** 9 * 3 ** 3 * 5 === 69120);
// AA5: the Venn double-count algebra — O = overlap = 48, A = 2, B = 15:
// a = O*A, b = O*B, gcd = O, lcm = O*A*B, and O^2*A*B = O*(O*A*B) = a*b
check('AA5: 96 = 48x2, 720 = 48x15, lcm = 48x2x15 = 1440; 48^2 x 2 x 15 = 69120 = 48 x 1440', 48 * 2 === 96 && 48 * 15 === 720 && 48 * 2 * 15 === 1440 && 48 * 48 * 2 * 15 === 69120 && 48 * 1440 === 69120);
// AA6: the coprime leftovers — a/h and b/h share nothing, and lcm/h = their product
check('AA6: 96/48 = 2, 720/48 = 15, gcd(2,15) = 1, lcm/48 = 30 = 2x15, 48x30 = 1440', 96 / 48 === 2 && 720 / 48 === 15 && gcd(2, 15) === 1 && 1440 / 48 === 30 && 2 * 15 === 30 && 48 * 30 === 1440);
check('AA7: buses: 12/6 = 2, 18/6 = 3, gcd(2,3) = 1, lcm/6 = 6 = 2x3', 12 / 6 === 2 && 18 / 6 === 3 && gcd(2, 3) === 1 && 36 / 6 === 6 && 2 * 3 === 6);
// AA8: brute-force product rule, every pair 1 <= a <= b <= 60 (broadened from Z35's 40)
check('AA8: gcd(a,b) x lcm(a,b) = a x b for every 1 <= a <= b <= 60', (() => {
  for (let a = 1; a <= 60; a++) for (let b = a; b <= 60; b++) if (gcd(a, b) * lcm2(a, b) !== a * b) return false;
  return true;
})());
// AA9: the Illustration-14 genre (Khattar ch. 2): HCF 63, LCM 1260, one member 315
// -> other = 63 x 1260 / 315 = 252; atoms 315 = 3^2 x 5 x 7, 252 = 2^2 x 3^2 x 7
check('AA9: 63x1260 = 79380; 79380/315 = 252; gcd(315,252) = 63; lcm(315,252) = 1260', 63 * 1260 === 79380 && 79380 / 315 === 252 && gcd(315, 252) === 63 && lcm2(315, 252) === 1260);
check('AA10: atoms: 315 = 3^2x5x7 (315 = 9x35), 252 = 2^2x3^2x7 (252 = 4x63); shared 3^2x7 = 63', 9 * 35 === 315 && 4 * 9 * 7 === 252 && 9 * 7 === 63 && 2 ** 2 * 3 ** 2 * 5 * 7 === 1260);
check('AA11: guards: 63 | 315 (x5), 63 | 252 (x4), 63 | 1260 (x20)', 315 / 63 === 5 && 252 / 63 === 4 && 1260 / 63 === 20);
// AA12: rebuild the whole pair, HCF 6 & LCM 36: m x n = 6, coprime splits (1,6),(2,3)
// -> pairs (6,36) and (12,18); brute-force confirms exactly two with a < b
check('AA12: pairs with gcd 6 lcm 36: exactly (6,36),(12,18) by exhaustive search 1..36', (() => {
  const pairs: number[][] = [];
  for (let a = 1; a <= 36; a++) for (let b = a + 1; b <= 36; b++) if (gcd(a, b) === 6 && lcm2(a, b) === 36) pairs.push([a, b]);
  return JSON.stringify(pairs) === JSON.stringify([[6, 36], [12, 18]]);
})());
// AA13: HCF 12 & LCM 720: m x n = 60; coprime splits (1,60),(3,20),(4,15),(5,12) —
// non-coprime splits (2,30) and (6,10) produce wrong HCFs (24)
check('AA13: coprime splits of 60: (1,60),(3,20),(4,15),(5,12); (2,30) and (6,10) share a factor', (() => {
  const splits: number[][] = [];
  for (let m = 1; m * m <= 60; m++) if (60 % m === 0 && gcd(m, 60 / m) === 1) splits.push([m, 60 / m]);
  return JSON.stringify(splits) === JSON.stringify([[1, 60], [3, 20], [4, 15], [5, 12]]) && gcd(2, 30) === 2 && gcd(6, 10) === 2;
})());
check('AA14: the four pairs (12,720),(36,240),(48,180),(60,144): gcd 12, lcm 720 each; brute-force finds exactly these', (() => {
  const pairs: number[][] = [];
  for (let a = 1; a <= 720; a++) for (let b = a + 1; b <= 720; b++) if (gcd(a, b) === 12 && lcm2(a, b) === 720) pairs.push([a, b]);
  const ok = [[12, 720], [36, 240], [48, 180], [60, 144]].every(([a, b]) => gcd(a, b) === 12 && lcm2(a, b) === 720);
  return JSON.stringify(pairs) === JSON.stringify([[12, 720], [36, 240], [48, 180], [60, 144]]) && ok;
})());
check('AA15: the wrong splits: (24,360) has gcd 24 not 12; (72,120) has gcd 24 not 12; both lcm 360, not 720', (() => {
  const g1 = gcd(24, 360), g2 = gcd(72, 120), l1 = lcm2(24, 360), l2 = lcm2(72, 120);
  // g1 = g2 = 24 and l1 = l2 = 360 — and 24 != 12, 360 != 720, so both demands are broken
  return g1 === 24 && g2 === 24 && l1 === 360 && l2 === 360 && 24 * 360 === 8640 && 72 * 120 === 8640;
})());
// AA16: feasibility, the NCERT canon: 24 does not divide 200 (200 = 8x24 + 8);
// 18 does not divide 380 (380 = 21x18 + 2); 25 divides 300 and (25,300) certifies it
check('AA16: 24 | 200 fails (r 8); 18 | 380 fails (r 2); 25 | 300 holds; gcd(25,300) = 25, lcm = 300', 200 % 24 === 8 && 200 === 8 * 24 + 8 && 380 % 18 === 2 && 380 === 21 * 18 + 2 && 300 % 25 === 0 && gcd(25, 300) === 25 && lcm2(25, 300) === 300);
// AA17: necessity AND sufficiency by brute force: h | l iff some pair realises it,
// and the pair (h, l) itself always works when h | l
check('AA17: for all h <= 60, l <= 600: some pair has gcd h lcm l exactly when h | l, and (h,l) itself is such a pair', (() => {
  for (let h = 1; h <= 60; h++) {
    for (let l = 1; l <= 600; l++) {
      const realised = (() => {
        for (let a = 1; a <= l; a++) if (l % a === 0 && gcd(a, l) === h && lcm2(a, l) === l) return true;
        return false;
      })();
      if (realised !== (l % h === 0)) return false;
      if (l % h === 0 && (gcd(h, l) !== h || lcm2(h, l) !== l)) return false;
    }
  }
  return true;
})());
// AA18: the HCF divides the LCM for every pair up to 60 (the necessity theorem, brute-forced)
check('AA18: gcd(a,b) | lcm(a,b) for every 1 <= a <= b <= 60', (() => {
  for (let a = 1; a <= 60; a++) for (let b = a; b <= 60; b++) if (lcm2(a, b) % gcd(a, b) !== 0) return false;
  return true;
})());
// AA19: the product rule has exactly two seats — the triple 12, 18, 24 breaks it,
// while every pair inside the triple still satisfies it
check('AA19: gcd(12,18,24) = 6, lcm = 72, 6x72 = 432 != 5184 = 12x18x24; pairs: 6x36 = 216, 6x72 = 432 = 18x24, 12x24 = 288', gcd3(12, 18, 24) === 6 && lcm3(12, 18, 24) === 72 && 6 * 72 === 432 && 12 * 18 * 24 === 5184 && gcd(18, 24) === 6 && lcm2(18, 24) === 72 && 6 * 72 === 432 && 18 * 24 === 432 && gcd(12, 24) === 12 && lcm2(12, 24) === 24 && 12 * 24 === 288);
// AA20: the rectangle identity, 6 x 4: gcd 2, lcm 12, 2 x 12 = 24 = 6 x 4;
// six 2x2 squares tile it (3 x 2); six 6x4 rectangles tile a 12x12 square (2 x 3); 12x12 = 144 = 6 x 24
check('AA20: 6x4: gcd 2, lcm 12, 2x12 = 24; (6/2)x(4/2) = 6 tiles; (12/6)x(12/4) = 6 tiles; 144 = 6x24', gcd(6, 4) === 2 && lcm2(6, 4) === 12 && 2 * 12 === 24 && (6 / 2) * (4 / 2) === 6 && (12 / 6) * (12 / 4) === 6 && 12 * 12 === 144 && 6 * 24 === 144 && 6 * 4 === 24);
// AA21: the rectangle identity, 8 x 12 (exercise): gcd 4, lcm 24, 4 x 24 = 96 = 8 x 12;
// (8/4)x(12/4) = 2 x 3 = 6 gcd-squares; (24/8)x(24/12) = 3 x 2 = 6 rectangles; 24^2 = 576 = 6 x 96
check('AA21: 8x12: gcd 4, lcm 24, 4x24 = 96; 2x3 = 6 tiles; 3x2 = 6 rectangles; 576 = 6x96', gcd(8, 12) === 4 && lcm2(8, 12) === 24 && 4 * 24 === 96 && (8 / 4) * (12 / 4) === 6 && (24 / 8) * (24 / 12) === 6 && 24 * 24 === 576 && 6 * 96 === 576);
// AA22: united-table instances re-verified (3.3 rows): HCF(144,240,612) = 12
// (148/246/623 leaving 4/6/11); HCF(125,150,275) = 25 (152/277/427, unknown remainders)
check('AA22: gcd3(144,240,612) = 12; gcd3(125,150,275) = 25', gcd3(144, 240, 612) === 12 && 2 ** 2 * 3 === 12 && gcd3(125, 150, 275) === 25 && 5 ** 2 === 25);
// AA23: united-table instances re-verified (3.4 rows): LCM(36,45,63,80) = 5040;
// 149 = LCM(12,16,18) + 5 = 144 + 5; 85 = LCM(9,10,15) - 5 = 90 - 5
check('AA23: lcm3(36,45,63) x 80: lcm(36,45,63,80) = 5040; 144+5 = 149; 90-5 = 85', (() => {
  const l1 = lcm2(lcm2(36, 45), lcm2(63, 80));
  return l1 === 5040 && lcm3(12, 16, 18) === 144 && 144 + 5 === 149 && lcm3(9, 10, 15) === 90 && 90 - 5 === 85;
})());
// AA24: exam genre — missing member: HCF 12, LCM 720, one member 48 -> 180;
// product genre — HCF 16, product 6400 -> LCM 400, and the pair is forced: (16,400)
check('AA24: 12x720/48 = 180, gcd(48,180) = 12, lcm(48,180) = 720; 6400/16 = 400; m x n = 25 forces (16,400)', (12 * 720) / 48 === 180 && gcd(48, 180) === 12 && lcm2(48, 180) === 720 && 6400 / 16 === 400 && 400 / 16 === 25 && gcd(16, 400) === 16 && lcm2(16, 400) === 400 && gcd(5, 5) !== 1 && 25 === 5 * 5);
// AA25: exercise L2 — HCF 12, product 4032 -> LCM 336; m x n = 28: (1,28) -> (12,336), (4,7) -> (48,84)
check('AA25: 4032/12 = 336; 336/12 = 28; coprime splits of 28: (1,28),(4,7); gcd(48,84) = 12, lcm(48,84) = 336; gcd(12,336) = 12', 4032 / 12 === 336 && 336 / 12 === 28 && gcd(1, 28) === 1 && gcd(4, 7) === 1 && gcd(2, 14) === 2 && gcd(48, 84) === 12 && lcm2(48, 84) === 336 && gcd(12, 336) === 12 && lcm2(12, 336) === 336);
// AA26: exercise L1 — HCF 5, LCM 60, one member 15 -> other 20; and the
// verification genre on 45 & 60: gcd 15, lcm 180, 15x180 = 2700 = 45x60
check('AA26: 5x60/15 = 20; gcd(15,20) = 5, lcm(15,20) = 60; gcd(45,60) = 15, lcm(45,60) = 180, 15x180 = 2700 = 45x60', (5 * 60) / 15 === 20 && gcd(15, 20) === 5 && lcm2(15, 20) === 60 && gcd(45, 60) === 15 && lcm2(45, 60) === 180 && 15 * 180 === 2700 && 45 * 60 === 2700);
// AA27: exercise L3 — HCF 6 & LCM 36 rebuilt (2 pairs); HCF 10 & LCM 90:
// m x n = 9 = 3^2, coprime splits (1,9) only -> the pair is forced: (10,90)
check('AA27: 90/10 = 9; coprime splits of 9: (1,9) only ((3,3) shares 3); gcd(10,90) = 10, lcm(10,90) = 90', 90 / 10 === 9 && gcd(1, 9) === 1 && gcd(3, 3) === 3 && gcd(10, 90) === 10 && lcm2(10, 90) === 90);
// AA28: exercise L5 feasibility trio — (9,45): 9 | 45 ok; (9,50): 9 does not divide 50 (r 5);
// (9,72): 9 | 72 (x8) ok
check('AA28: 45 % 9 = 0 and (9,45) works; 50 % 9 = 5; 72 % 9 = 0 and (9,72) works; gcd(9,45) = 9, gcd(9,72) = 9', 45 % 9 === 0 && gcd(9, 45) === 9 && lcm2(9, 45) === 45 && 50 % 9 === 5 && 72 % 9 === 0 && 72 === 8 * 9 && gcd(9, 72) === 9 && lcm2(9, 72) === 72);
// AA29: the L6 fingerprint collector — HCF 14, LCM 1260: m x n = 90 = 2 x 3^2 x 5;
// three prime-power blocks -> 2^3 = 8 ordered, 4 unordered coprime splits:
// (1,90),(2,45),(5,18),(9,10) -> pairs (14,1260),(28,630),(70,252),(126,140)
check('AA29: 1260/14 = 90 = 2x9x5; coprime splits of 90: (1,90),(2,45),(5,18),(9,10) exactly; 2^3 = 8 ordered, 4 unordered', (() => {
  const splits: number[][] = [];
  for (let m = 1; m * m <= 90; m++) if (90 % m === 0 && gcd(m, 90 / m) === 1) splits.push([m, 90 / m]);
  return 1260 / 14 === 90 && 2 * 9 * 5 === 90 && JSON.stringify(splits) === JSON.stringify([[1, 90], [2, 45], [5, 18], [9, 10]]) && 2 ** 3 === 8;
})());
check('AA30: the four rebuilt pairs all carry gcd 14, lcm 1260; brute-force finds exactly these', (() => {
  const pairs: number[][] = [];
  for (let a = 1; a <= 1260; a++) for (let b = a + 1; b <= 1260; b++) if (gcd(a, b) === 14 && lcm2(a, b) === 1260) pairs.push([a, b]);
  const ok = [[14, 1260], [28, 630], [70, 252], [126, 140]].every(([a, b]) => gcd(a, b) === 14 && lcm2(a, b) === 1260);
  return JSON.stringify(pairs) === JSON.stringify([[14, 1260], [28, 630], [70, 252], [126, 140]]) && ok;
})());
// AA31: quiz crosses — Q1: 6x36/12 = 18 (distractors 3, 72, 24); Q2: 6400/16 = 400
// (distractors 6384, 25, 160); Q3: 380 % 18 = 2 (infeasible); Q4: four pairs for
// (12, 720); Q5: 6 x 72 = 432 vs 12 x 18 x 24 = 5184
check('AA31: quiz crosses: 6x36/12 = 18; 6400/16 = 400; 380 % 18 = 2; four (12,720) pairs; 432 != 5184', (6 * 36) / 12 === 18 && 6400 / 16 === 400 && 380 % 18 === 2 && 6 * 72 === 432 && 12 * 18 * 24 === 5184);
// AA32: structure theorem echoes for the chapter close — every number that
// gcd 6 and lcm 36 pairs divide 36, and the chapter-arc counts hold
check('AA32: both members of every rebuilt pair divide their lcm: 6,36 | 36 and 12,18 | 36', 36 % 6 === 0 && 36 % 36 === 0 && 36 % 12 === 0 && 36 % 18 === 0);

// AA33: the warn-callout guard instance (HCF 40 cannot own member 315) and
// quiz-distractor cross-checks; the L6 pairs are all 14 x (1, 90, 45, 18, 10)
check('AA33: 315 % 40 = 35 (guard fails); 12x72 = 864 != 216, gcd(12,72) = 12; 12x24 = 288, gcd(12,24) = 12; 16x160 = 2560 != 6400; 14x1 = 14, 14x90 = 1260, 14x45 = 630, 14x18 = 252, 14x10 = 140', (() => {
  const p1 = 12 * 72, p2 = 12 * 24, p3 = 16 * 160;
  return 315 % 40 === 35 && p1 !== 216 && gcd(12, 72) === 12 && p2 !== 216 && gcd(12, 24) === 12 && p3 !== 6400 && 14 * 1 === 14 && 14 * 90 === 1260 && 14 * 45 === 630 && 14 * 18 === 252 && 14 * 10 === 140;
})());

/* ============================================================
 * Report
 * ==========================================================*/
console.log(`\nverify-unit-3: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL CHECKS PASS — safe to write lessons 3.1 + 3.2 + 3.3 + 3.4 + 3.5');
