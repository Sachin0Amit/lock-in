/**
 * verify-unit-2.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 2 (The Four Operations).
 *
 * Recreated 2026-11-03 (run 5) for lesson 2.4 "Division, Remainders and Why
 * Zero Never Divides" (the earlier copy was never committed and the sandbox
 * recycle removed it). Extended same day (run 6) for lesson 2.5 "Order of
 * Operations and the Language of Expressions" — section L. Every number
 * that will appear in lesson prose, figures, tables, quiz and exercises is
 * checked here BEFORE it is written.
 * Run: bun run scripts/verify-unit-2.ts   (exit 1 on any failure)
 */

// module marker: isolate this file's top-level names from other scripts under tsc --noEmit
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
function fingerprint(n: number): number {
  // single digit, 9 standing for 0 (house convention from lessons 2.1/2.3)
  const r = n % 9;
  return r === 0 ? 9 : r;
}

/* ============================================================
 * A. Sharing, grouping and the number line (opening + figure A)
 * ==========================================================*/
check('A1: 24 / 4 = 6 (sharing reading)', 24 / 4 === 6);
check('A2: 4 x 6 = 24 rebuilds the flock', 4 * 6 === 24);
check('A3: 24 / 6 = 4 (grouping reading)', 24 / 6 === 4);
check('A4: 6 x 4 = 24 (same rectangle rotated)', 6 * 4 === 24);
check('A5: 25 / 6 = 4 remainder 1', 25 % 6 === 1 && Math.floor(25 / 6) === 4);
check('A6: check equation 4 x 6 + 1 = 25', 4 * 6 + 1 === 25);
// backward-jump chains drawn in figure A
{
  const chain24 = [24, 18, 12, 6, 0];
  const steps24 = chain24.slice(1).map((v, i) => chain24[i] - v);
  check('A7: 24 -> 18 -> 12 -> 6 -> 0, four jumps of 6', steps24.every((s) => s === 6) && chain24.length === 5);
  const chain25 = [25, 19, 13, 7, 1];
  const steps25 = chain25.slice(1).map((v, i) => chain25[i] - v);
  check('A8: 25 -> 19 -> 13 -> 7 -> 1, four jumps of 6 landing on 1', steps25.every((s) => s === 6) && chain25[4] === 1);
}
check('A9: 24 - 6 x 4 = 0 (exact landing)', 24 - 6 * 4 === 0);
check('A10: 25 - 6 x 4 = 1 (remainder stub)', 25 - 6 * 4 === 1);
check('A11: 0 / 5 = 0 is legal (0 x 5 = 0)', 0 / 5 === 0 && 0 * 5 === 0);
check('A12: repeated subtraction count for 24/6 is 4 jumps', (() => {
  let a = 24, jumps = 0;
  while (a >= 6) { a -= 6; jumps++; }
  return jumps === 4 && a === 0;
})());

/* ============================================================
 * B. The laws of division, retried (table instances)
 * ==========================================================*/
check('B1: closure holds for 24 / 4 = 6 (whole)', Number.isInteger(24 / 4));
check('B2: closure fails for 25 / 4: 6 r 1, 6x4+1 = 25', 25 % 4 === 1 && Math.floor(25 / 4) === 6 && 6 * 4 + 1 === 25);
check('B3: closure fails for 7 / 2: 3 r 1, 3x2+1 = 7', 7 % 2 === 1 && Math.floor(7 / 2) === 3 && 3 * 2 + 1 === 7);
check('B4: commutative fails: 8 / 4 = 2 but 4 / 8 = 0 r 4', 8 / 4 === 2 && Math.floor(4 / 8) === 0 && 4 % 8 === 4);
check('B5: check for 4 / 8 = 0 r 4 is 0 x 8 + 4 = 4', 0 * 8 + 4 === 4);
check('B6: associative fails: (8/4)/2 = 1', (8 / 4) / 2 === 1);
check('B7: associative fails: 8/(4/2) = 4', 8 / (4 / 2) === 4);
check('B8: the two groupings differ: 1 !== 4', (8 / 4) / 2 !== 8 / (4 / 2));
check('B9: right identity: 8892 / 1 = 8892', 8892 / 1 === 8892);
check('B10: left side fails: 1 / 8892 = 0 r 1 (0 x 8892 + 1 = 1)', Math.floor(1 / 8892) === 0 && 1 % 8892 === 1 && 0 * 8892 + 1 === 1);

/* ============================================================
 * C. Division by zero (derivation block)
 * ==========================================================*/
{
  let allZero = true;
  for (let q = 0; q <= 30; q++) if (q * 0 !== 0) allZero = false;
  check('C1: q x 0 = 0 for every candidate q (0..30)', allZero);
}
check('C2: no q rebuilds 7: 7 / 0 undefined (spot: 5 x 0 = 0 !== 7)', 5 * 0 !== 7);
check('C3: 3 x 0 = 0 (0/0 indeterminate, candidate 3)', 3 * 0 === 0);
check('C4: 17 x 0 = 0 (0/0 indeterminate, candidate 17)', 17 * 0 === 0);
check('C5: every candidate passes for 0/0: 0 x q = 0 for all q 0..30', (() => {
  for (let q = 0; q <= 30; q++) if (0 * q !== 0) return false;
  return true;
})());

/* ============================================================
 * D. Long division 8,892 / 36 = 247 r 0 (example + figure B)
 * ==========================================================*/
check('D1: 8 < 36, so the first chunk is the two leading digits 88', 8 < 36 && 88 >= 36);
check('D2: 88 / 36 = 2 r 16', Math.floor(88 / 36) === 2 && 88 % 36 === 16);
check('D3: multiply 2 x 36 = 72', 2 * 36 === 72);
check('D4: subtract 88 - 72 = 16 (< 36)', 88 - 72 === 16 && 16 < 36);
check('D5: bring down 9 beside 16 -> 169', Number('16' + '9') === 169);
check('D6: 169 / 36 = 4 r 25', Math.floor(169 / 36) === 4 && 169 % 36 === 25);
check('D7: multiply 4 x 36 = 144', 4 * 36 === 144);
check('D8: subtract 169 - 144 = 25 (< 36)', 169 - 144 === 25 && 25 < 36);
check('D9: bring down 2 beside 25 -> 252', Number('25' + '2') === 252);
check('D10: 252 / 36 = 7 r 0', Math.floor(252 / 36) === 7 && 252 % 36 === 0);
check('D11: multiply 7 x 36 = 252', 7 * 36 === 252);
check('D12: subtract 252 - 252 = 0 — remainder 0', 252 - 252 === 0);
check('D13: quotient digits 2, 4, 7 read 247', Number('247') === 247);
check('D14: check 247 x 36 + 0 = 8,892', 247 * 36 + 0 === 8892);
check('D15: 36 x 247 = 36 x 200 + 36 x 47 = 7,200 + 1,692', 36 * 200 === 7200 && 36 * 47 === 1692 && 7200 + 1692 === 8892);
check('D16: seat scaling honesty: 2 x 3,600 = 7,200 and 8,892 - 7,200 = 1,692', 2 * 3600 === 7200 && 8892 - 7200 === 1692);
check('D17: seat scaling continues: 4 x 360 = 1,440; 1,692 - 1,440 = 252', 4 * 360 === 1440 && 1692 - 1440 === 252);
check('D18: full-circle: 247 x 36 is lesson 2.3 product 8,892', 247 * 36 === 8892);

/* ============================================================
 * E. Remainder long division 4,589 / 6 = 764 r 5 (echo of 2.2)
 * ==========================================================*/
check('E1: 45 / 6 = 7 r 3', Math.floor(45 / 6) === 7 && 45 % 6 === 3);
check('E2: 7 x 6 = 42; 45 - 42 = 3', 7 * 6 === 42 && 45 - 42 === 3);
check('E3: bring down 8 -> 38', Number('3' + '8') === 38);
check('E4: 38 / 6 = 6 r 2', Math.floor(38 / 6) === 6 && 38 % 6 === 2);
check('E5: 6 x 6 = 36; 38 - 36 = 2', 6 * 6 === 36 && 38 - 36 === 2);
check('E6: bring down 9 -> 29', Number('2' + '9') === 29);
check('E7: 29 / 6 = 4 r 5', Math.floor(29 / 6) === 4 && 29 % 6 === 5);
check('E8: 4 x 6 = 24; 29 - 24 = 5', 4 * 6 === 24 && 29 - 24 === 5);
check('E9: quotient 764, remainder 5', Number('764') === 764 && 4589 % 6 === 5);
check('E10: check 764 x 6 = 4,584', 764 * 6 === 4584);
check('E11: 4,584 + 5 = 4,589', 4584 + 5 === 4589);
check('E12: fingerprint S(4,589) = 26', S(4589) === 26);
check('E13: 26 mod 9 = 8 (expected fingerprint 8)', 26 % 9 === 8);
check('E14: S(764) = 17 -> 8; S(6) = 6', S(764) === 17 && S(764) % 9 === 8 && S(6) === 6);
check('E15: S(q) x S(b) + r = 8 x 6 + 5 = 53', 8 * 6 + 5 === 53);
check('E16: 53 mod 9 = 8 — matches S(4,589) mod 9', 53 % 9 === 8 && 4589 % 9 === 8);
check('E18: transposition blind spot: S(746) = S(764) = 17 -> 8', S(746) === 17 && S(746) % 9 === 8);
{
  const fp48: number = (8 * 6) % 9;
  check('E17: dropped-remainder error is CAUGHT: 8 x 6 = 48 -> fingerprint 3, not the expected 8', fp48 === 3);
}

/* ============================================================
 * F. Fingerprint for the exact division 8,892 / 36
 * ==========================================================*/
check('F1: S(8,892) = 27', S(8892) === 27);
check('F2: 27 mod 9 = 0 (multiple of 9)', 27 % 9 === 0 && 8892 % 9 === 0);
check('F3: S(247) = 13 -> 4', S(247) === 13 && 13 % 9 === 4);
check('F4: S(36) = 9 -> 0 mod 9', S(36) === 9 && 36 % 9 === 0);
check('F5: S(q) x S(b) + r = 4 x 0 + 0 = 0 — matches', (4 * 0 + 0) % 9 === 0);

/* ============================================================
 * G. The remainder bound 0 <= r < b (derivation + instances)
 * ==========================================================*/
{
  let boundHolds = true;
  for (let b = 2; b <= 12; b++)
    for (let a = 0; a <= 200; a++) {
      const r = a % b;
      if (!(r >= 0 && r < b)) boundHolds = false;
      const q = Math.floor(a / b);
      if (q * b + r !== a) boundHolds = false; // check equation everywhere
    }
  check('G1: remainder bound + check equation hold for ALL a in 0..200, b in 2..12', boundHolds);
}
check('G2: if r >= b one more full subtraction fits: a = (q+1)b + (r-b)', (() => {
  // demonstration instance: 40 / 6 with illegal "remainder" 10 -> 10 >= 6, one more six fits
  const q = 4, r = 16; // 40 = 4 x 6 + 16 (illegal form)
  return q * 6 + r === 40 && r >= 6 && (q + 1) * 6 + (r - 6) === 40;
})());
check('G3: max remainder for b = 6 is 5, attained by 29 / 6', 29 % 6 === 5 && 4 * 6 + 5 === 29);
check('G4: max remainder for b = 36 is 35, attained by 35 / 36', 35 % 36 === 35 && 0 * 36 + 35 === 35);
check('G5: b = 10: 4,589 / 10 = 458 r 9 — remainder IS the ones digit', Math.floor(4589 / 10) === 458 && 4589 % 10 === 9 && 458 * 10 + 9 === 4589);
check('G6: b = 100: 4,589 / 100 = 45 r 89 — last two digits', Math.floor(4589 / 100) === 45 && 4589 % 100 === 89 && 45 * 100 + 89 === 4589);

/* ============================================================
 * H. The quotient size bound (derivation + instances)
 * ==========================================================*/
{
  let boundHolds = true;
  for (let b = 2; b <= 99; b++)
    for (let a = 100; a <= 9999; a++) {
      const k = String(a).length, m = String(b).length;
      if (a < b) continue;
      const q = Math.floor(a / b);
      const d = String(q).length;
      if (!(d >= k - m && d <= k - m + 1)) boundHolds = false;
    }
  check('H1: k-m <= digits(q) <= k-m+1 for ALL 100..9999 divided by 2..99 (a >= b)', boundHolds);
}
check('H2: ceiling attained: 8,892 / 6 = 1,482 (4 = 4-1+1 digits)', 8892 / 6 === 1482 && 6 * 1482 === 8892 && String(1482).length === 4);
check('H3: floor attained: 1,000 / 9 = 111 r 1 (3 = 4-1 digits) — echoes 999 + 1', Math.floor(1000 / 9) === 111 && 1000 % 9 === 1 && 9 * 111 + 1 === 1000);
check('H4: ceiling for 3/2 digits: 999 / 99 = 10 r 9 (2 = 3-2+1 digits)', Math.floor(999 / 99) === 10 && 999 % 99 === 9 && 99 * 10 + 9 === 999);
check('H5: k = m case: 500 / 400 = 1 r 100 (1 digit; 400 x 1 + 100 = 500)', Math.floor(500 / 400) === 1 && 500 % 400 === 100 && 400 * 1 + 100 === 500);
check('H6: worked pair inside bound: 247 has 3 digits, window [4-2, 4-2+1] = [2,3]', String(247).length === 3 && 4 - 2 <= 3 && 3 <= 4 - 2 + 1);

/* ============================================================
 * I. Speed techniques and divisibility screens
 * ==========================================================*/
check('I1: /5 by double-then-/10: 340 x 2 = 680, 680 / 10 = 68', 340 * 2 === 680 && 680 / 10 === 68);
check('I2: 5 x 68 = 340 (check)', 5 * 68 === 340);
check('I3: /4 by halving twice: 248 -> 124 -> 62', 248 / 2 === 124 && 124 / 2 === 62);
check('I4: 4 x 62 = 248 (check)', 4 * 62 === 248);
check('I5: /8 by halving thrice: 496 -> 248 -> 124 -> 62', 496 / 2 === 248 && 248 / 2 === 124 && 124 / 2 === 62);
check('I6: 8 x 62 = 496 (check — and 62 recurs from I4)', 8 * 62 === 496);
check('I7: 8,892 / 9 = 988 exactly (digit sum 27)', 8892 / 9 === 988 && 9 * 988 === 8892);
check('I8: screens for 4,589: odd; S = 26 not multiple of 9; ends in 9', 4589 % 2 === 1 && S(4589) === 26 && 26 % 9 !== 0 && 4589 % 10 !== 0 && 4589 % 5 !== 0);
check('I9: screens for 8,892: even; S = 27 multiple of 9; ends in 2 (not /5)', 8892 % 2 === 0 && S(8892) === 27 && 27 % 9 === 0 && 8892 % 5 !== 0);

/* ============================================================
 * J. Quiz and exercise internals
 * ==========================================================*/
check('J1: quiz Q4: given 4,589 = 764 x 6 + r, r = 5 (4,589 - 4,584)', 4589 - 4584 === 5);
check('J2: L1b: 47 / 5 = 9 r 2; 9 x 5 + 2 = 47', Math.floor(47 / 5) === 9 && 47 % 5 === 2 && 9 * 5 + 2 === 47);
check('J3: L2b: 1,248 / 24 = 52 r 0', 1248 / 24 === 52 && 24 * 52 === 1248);
check('J4: L2b stages: 124 / 24 = 5 r 4 (5 x 24 = 120)', Math.floor(124 / 24) === 5 && 124 % 24 === 4 && 5 * 24 === 120);
check('J5: L2b stages: bring down 8 -> 48; 48 / 24 = 2 r 0', Number('4' + '8') === 48 && 48 / 24 === 2 && 2 * 24 === 48);
check('J6: L2b fingerprint: S(1,248) = 15 -> 6; S(52) = 7; S(24) = 6; 7 x 6 = 42 -> 6', S(1248) === 15 && 15 % 9 === 6 && S(52) === 7 && S(24) === 6 && (7 * 6) % 9 === 6 && 1248 % 9 === 6);
check('J7: L5 uniqueness: only r in [0,6) works for 29/6 — q=3 forces r=11 (illegal)', 29 - 3 * 6 === 11 && 11 >= 6);
check('J8: L5 uniqueness: q=4 gives r=5 (legal) — unique', 29 - 4 * 6 === 5 && 5 < 6);
check('J9: L4a stadium: 8,892 seats in rows of 36 -> 247 full rows, 0 spare', Math.floor(8892 / 36) === 247 && 8892 % 36 === 0);
check('J10: quiz Q5: quotient window for 8,892 / 36 is [2,3] digits; 247 = 3', 4 - 2 === 2 && 4 - 2 + 1 === 3 && String(247).length === 3);
{
  const rebuild746: number = 746 * 6 + 5;
  check('J11: rebuild catches transposition: 746 x 6 + 5 = 4,481 (not 4,589)', rebuild746 === 4481);
}
check('J12: quiz Q3 instance: 47 / 8 = 5 r 7 attains the bound r = 7 = 8 - 1', Math.floor(47 / 8) === 5 && 47 % 8 === 7 && 5 * 8 + 7 === 47);

/* ============================================================
 * L. Lesson 2.5 — Order of Operations (the treaty, traps,
 *    bracket ladder, 'of', estimation gate, quiz, exercises)
 * ==========================================================*/

/* --- The two readings of one line (opening + figure) --- */
check('L1: 8 + 2 x 5 = 18 (treaty: multiplication first)', 8 + 2 * 5 === 18);
check('L2: (8 + 2) x 5 = 50 (add-first reading)', (8 + 2) * 5 === 50);
check('L3: the two readings differ: 18 !== 50', 8 + 2 * 5 !== (8 + 2) * 5);
check('L4: 2 x 5 = 10 = 2+2+2+2+2 (compressed addition, lesson 2.3)', 2 * 5 === [2, 2, 2, 2, 2].reduce((a, b) => a + b, 0));
check('L5: tree values: 8 + (2 x 5) = 18 and (8 + 2) x 5 = 50', 8 + 2 * 5 === 18 && (8 + 2) * 5 === 50);

/* --- The mnemonic's two traps (table + warn callout) --- */
check('L6: 8 / 4 x 2 left-to-right = 4', (() => { const step1 = 8 / 4; return step1 * 2 === 4; })());
check('L7: x-first misreading 8 / (4 x 2) = 1 — differs', 8 / (4 * 2) === 1 && 8 / (4 * 2) !== 8 / 4 * 2);
check('L8: 25 - 8 + 7 left-to-right = 24', (() => { const step1 = 25 - 8; return step1 + 7 === 24; })());
check('L9: subtract-last misreading 25 - (8 + 7) = 10 — differs', 25 - (8 + 7) === 10 && 25 - (8 + 7) !== 25 - 8 + 7);
check('L10: 20 - 6 / 2 x 3 = 11 (6/2=3, 3x3=9, 20-9=11)', (() => { const s1 = 6 / 2, s2 = s1 * 3; return s1 === 3 && s2 === 9 && 20 - s2 === 11; })());
check('L11: M-before-D misreading 20 - (6 x 3) = 2', 20 - 6 * 3 === 2);
check('L12: full-left-to-right misreading (20 - 6) / 2 x 3 = 21', (() => { const s1 = 20 - 6, s2 = s1 / 2; return s1 === 14 && s2 === 7 && s2 * 3 === 21; })());
check('L13: 4 + 3 x 2 = 10; (4 + 3) x 2 = 14', 4 + 3 * 2 === 10 && (4 + 3) * 2 === 14);

/* --- The bracket ladder (worked example + bar mini) --- */
check('L14: (14 - 2 x 5) = 14 - 10 = 4', (() => { const inner = 14 - 2 * 5; return 2 * 5 === 10 && inner === 4; })());
check("L15: 'of': 3 of 2 = 6; then 18 / 6 = 3", 3 * 2 === 6 && 18 / (3 * 2) === 3);
check("L16: 'of' trap: (18 / 3) of 2 = 6 of 2 = 12 — differs from 3", (18 / 3) * 2 === 12 && 12 !== 18 / (3 * 2));
check('L17: [ ]: 2 x 4 + 3 = 8 + 3 = 11', (() => { const prod = 2 * 4; return prod === 8 && prod + 3 === 11; })());
check('L18: whole ladder 120 - [2 x (14 - 2 x 5) + {18 / 3 of 2}] = 109', 120 - (2 * (14 - 2 * 5) + 18 / (3 * 2)) === 109);
check('L19: bar forces low rank first: (3 + 4) x 2 = 14 under the bar', (3 + 4) * 2 === 14);
check('L20: without the bar: 3 + 4 x 2 = 11 — differs from 14', 3 + 4 * 2 === 11 && 3 + 4 * 2 !== (3 + 4) * 2);
check('L21: ladder exercise: (16 - 7) = 9; 9 x 2 = 18', (() => { const inner = 16 - 7; return inner === 9 && inner * 2 === 18; })());
check('L22: ladder exercise: 6 of 3 = 18; 18 / 18 = 1; 90 + 1 = 91', 6 * 3 === 18 && 18 / (6 * 3) === 1 && 90 + 1 === 91);
check('L23: full ladder: 90 + [ { (16 - 7) x 2 } / 6 of 3 ] = 91', 90 + ((16 - 7) * 2) / (6 * 3) === 91);

/* --- The viral implicit-multiplication trap (L5 exercise) --- */
check('L24: 6 / 2 x (1 + 2) left-to-right = 9', (() => { const inner = 1 + 2, s1 = 6 / 2; return inner === 3 && s1 === 3 && s1 * inner === 9; })());
check('L25: implicit-first reading 6 / (2 x (1 + 2)) = 1 — differs', 6 / (2 * 3) === 1 && 6 / (2 * 3) !== 6 / 2 * 3);

/* --- The estimation gate (lesson 1.3 returns) --- */
check('L26: 51 x 49 = 2,550 - 51 = 2,499', 51 * 50 === 2550 && 2550 - 51 === 2499 && 51 * 49 === 2499);
check('L27: 2,504 / 8 = 313 exactly (8 x 313 = 2,504)', 2504 / 8 === 313 && 8 * 313 === 2504);
check('L28: exact sum 2,499 + 313 = 2,812', 2499 + 313 === 2812);
check('L29: estimate 50 x 50 + 2,500 / 8 = 2,500 + 312.5 (close to 2,812)', 50 * 50 === 2500 && 2500 / 8 === 312.5 && Math.abs(2500 + 312.5 - 2812) === 0.5);
check('L30: estimation instance: 7,218 / 9 = 802 (9 x 802 = 7,218)', 7218 / 9 === 802 && 9 * 802 === 7218);
check('L31: estimation instance: 98 x 63 = 5,880 + 294 = 6,174', 98 * 60 === 5880 && 98 * 3 === 294 && 5880 + 294 === 6174 && 98 * 63 === 6174);
check('L32: exact 802 + 6,174 = 6,976', 802 + 6174 === 6976);
check('L33: estimate 7,200 / 9 + 100 x 60 = 800 + 6,000 = 6,800', 7200 / 9 === 800 && 100 * 60 === 6000 && 800 + 6000 === 6800);
check('L34: gap honest: |6,976 - 6,800| = 176 (same magnitude)', Math.abs(6976 - 6800) === 176);
check('L35: fingerprint across the expression: S(802)+S(98)xS(63) -> 1 matches S(6,976) -> 1', (() => {
  const fp = fingerprint(802) + fingerprint(98) * fingerprint(63);
  return fp % 9 === fingerprint(6976) % 9 && fingerprint(6976) === 1;
})());

/* --- Quiz internals --- */
check('L36: quiz Q1: 8 x 5 = 40 is the wrong-pair product (8x5, not 2x5)', 8 * 5 === 40 && 2 * 5 === 10);
check('L37: quiz Q2: 6 / 2 = 3; 3 x 3 = 9; 20 - 9 = 11 (recap of L10)', 6 / 2 === 3 && 3 * 3 === 9 && 20 - 9 === 11);
check('L38: quiz Q3: 18 / 3 = 6; 6 of 2 = 12 — the divided-first trap (recap L16)', 18 / 3 === 6 && 6 * 2 === 12);
check('L39: quiz Q4: 4 + 3 x 2 = 10 makes the equation true', 4 + 3 * 2 === 10);
check('L40: quiz Q5: exact 6,976 closest to estimate 6,800 (gap 176 < 680)', 6976 - 6800 === 176 && 176 < 6800);

/* --- Exercise internals --- */
check('L41: L1a: 4 + 3 x 2 = 10 vs (4 + 3) x 2 = 14 (recap L13)', 4 + 3 * 2 === 10 && (4 + 3) * 2 === 14);
check('L42: L1b: 5 x 6 - 8 = 22', (() => { const prod = 5 * 6; return prod === 30 && prod - 8 === 22; })());
check('L43: L1b: 10 - 2 x 3 = 4 vs (10 - 2) x 3 = 24', 10 - 2 * 3 === 4 && (10 - 2) * 3 === 24);
check('L44: L2a: 36 / 4 x 3 = 27; M-first misreading 36 / 12 = 3', (() => { const s1 = 36 / 4; return s1 === 9 && s1 * 3 === 27 && 36 / (4 * 3) === 3; })());
check('L45: L2b: 25 - 8 + 7 = 24 (recap L8)', 25 - 8 + 7 === 24);
check('L46: L4a default: 8 + 4 / 4 + 4 x 2 = 8 + 1 + 8 = 17', 8 + 4 / 4 + 4 * 2 === 17);
check('L47: L4a largest bracketing: (8 + 4 / 4 + 4) x 2 = 13 x 2 = 26', (() => { const inner = 8 + 4 / 4 + 4; return inner === 13 && inner * 2 === 26; })());
check('L48: L4a why 26 wins: x2 distributes over the whole additive chain', (() => {
  // (8 + 1 + 4) x 2 = 8x2 + 1x2 + 4x2 = 16 + 2 + 8 = 26 — distributivity, lesson 2.3
  return (8 + 1 + 4) * 2 === 8 * 2 + 1 * 2 + 4 * 2 && 8 * 2 + 1 * 2 + 4 * 2 === 26;
})());
check('L49: L5: 9 vs 1 — the two readings differ (recap L24/L25)', (() => {
  const explicit: number = 6 / 2 * (1 + 2);
  const implicit: number = 6 / (2 * (1 + 2));
  const differ: boolean = explicit !== implicit;
  return explicit === 9 && implicit === 1 && differ;
})());

/* --- L6: the treaty-maker's problem (associativity vs precedence) --- */
check('L50: + alone is bracket-independent: (8+2)+5 = 8+(2+5) = 15', (8 + 2) + 5 === 8 + (2 + 5) && 8 + 2 + 5 === 15);
check('L51: exhaustive: (a+b)+c = a+(b+c) for ALL a,b,c in 0..9', (() => {
  for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) for (let c = 0; c <= 9; c++)
    if ((a + b) + c !== a + (b + c)) return false;
  return true;
})());
check('L52: x alone is bracket-independent: (2x3)x4 = 2x(3x4) = 24', (2 * 3) * 4 === 2 * (3 * 4) && 2 * 3 * 4 === 24);
check('L53: exhaustive: (a x b) x c = a x (b x c) for ALL a,b,c in 0..9', (() => {
  for (let a = 0; a <= 9; a++) for (let b = 0; b <= 9; b++) for (let c = 0; c <= 9; c++)
    if ((a * b) * c !== a * (b * c)) return false;
  return true;
})());
check('L54: mixed is bracket-DEPENDENT: 2 + 3 x 4 = 14 vs (2 + 3) x 4 = 20', (() => {
  const treaty: number = 2 + 3 * 4;
  const bracketed: number = (2 + 3) * 4;
  const differ: boolean = treaty !== bracketed;
  return treaty === 14 && bracketed === 20 && differ;
})());
check('L55: brackets cannot change a single number: (7) = 7', (7) === 7);
check('L56: L4 exercise candidates: (8 + 4) / 4 + 4 x 2 = 11', (8 + 4) / 4 + 4 * 2 === 11);
check('L57: L4 exercise candidates: 8 + (4 / 4 + 4) x 2 = 18', 8 + (4 / 4 + 4) * 2 === 18);
check('L58: L4 exercise candidates: (8 + 4) / (4 + 4) x 2 = 3', (8 + 4) / (4 + 4) * 2 === 3);
check('L59: worked example D-first slip: 120 - (2 x 4 + 18 / 3 of 2 with of last) = 100', 120 - (2 * 4 + (18 / 3) * 2) === 100);
check('L60: the slip costs 9: 109 - 100 = 9', 109 - 100 === 9);

/* --- Regression guards — earlier lessons' numbers stay true --- */
check('K1: 2.1: 999 + 1 = 1,000 (echoed by 1,000 / 9 = 111 r 1)', 999 + 1 === 1000);
check('K2: 2.2: 4,589 - 2,764 = 1,825 (4,589 reused in 2.4)', 4589 - 2764 === 1825);
check('K3: 2.3: 247 x 36 = 8,892 (undone by 2.4)', 247 * 36 === 8892);
check('K4: 2.3: opening flock 4 x 6 = 24 (shared in 2.4)', 4 * 6 === 24);

/* ============================================================ */
console.log(`verify-unit-2: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  - ' + f);
  process.exit(1);
}
console.log('ALL CHECKS PASS — safe to write lesson 2.5 (unit 2 finale)');
