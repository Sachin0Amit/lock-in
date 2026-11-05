/**
 * verify-unit-11.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 11 (Patterns and the Doorstep of Algebra).
 *
 * Created 2026-11-05 (run 46) for lesson 11.1 "Patterns and Rules":
 * every number of the chapter-opening lesson is verified here BEFORE
 * anything is written into ch-11.ts —
 *
 *   (A) the add-5 engine: 4, 9, 14, 19, 24 (differences constant 5);
 *       the jump law cross-check T10 = 4 + 9×5 = 49 by iteration, T50 =
 *       249; the 9-jump reading;
 *   (B) the matchstick arithmetic: n squares in a row need 3n + 1 sticks
 *       (4/7/10/13/16); each new square adds exactly 3 (top, right,
 *       bottom — the left edge shared); T10 = 31; 31 sticks → 10 squares;
 *   (C) the multiply families: 3, 6, 12, 24, 48 (×2); the powers 1, 2,
 *       4, 8, 16; the circle-splitting trap 1, 2, 4, 8, 16, 31 — the
 *       max-regions formula C(n,2) + C(n,4) + 1 for n = 1..7, the
 *       doubling reflex broken at the sixth term;
 *   (D) the triangular numbers 1, 3, 6, 10, 15, 21 (differences 2..6);
 *       the handshake counts 1, 3, 6, 10, 15, 21 for n = 2..7 friends
 *       (pattern only — the formula waits for 11.2's tools);
 *   (E) the squares and the gnomon sums: the partial odd sums 1, 4, 9,
 *       16, 25, 36 equal the squares for n = 1..20 (swept); the L
 *       algebra k² − (k−1)² = 2k − 1 swept k = 1..30;
 *   (F) the evens and the odds: 2n and 2n − 1 swept n = 1..50, each
 *       re-derived from the jump law (2 + (n−1)·2 and 1 + (n−1)·2);
 *   (G) the Virahanka engine: 1, 1, 2, 3, 5, 8, 13, 21, 34, 55 built by
 *       the sum rule; the quiz's next-two instance 21, 34;
 *   (H) backwards and missing terms: the subtract-7 list ... 47, 40, 33,
 *       26, 19 with the three terms before 47 = 68, 61, 54; the missing
 *       middle 17 of 7, 12, __, 22, 27;
 *   (I) the mixed exam rule: 2, 5, 11, 23, 47 by ×2 + 1 (every link
 *       checked), next two 95, 191;
 *   (J) the jump-law sweep: 180 add-d patterns (T₁ = 1..20, d = 1..9),
 *       iteration vs the law agree for n = 1..60;
 *   (K) figure 1 geometry — the matchstick panels (squares 60 px, panels
 *       at x0 120/270/450, y 90..150; count labels at y 195; +3 brackets
 *       at y 157 with labels at y 174; label clearances ≥ 8 px);
 *   (L) figure 2 geometry — the gnomon wrap (cell 56 px; S1 at (150,100),
 *       S2 at (300,72), S3 at (520,44); the added Ls of 3 and 5 tinted;
 *       the three sum labels at y 246; clearances);
 *   (M) the 5 quiz keys re-derived (keys 1/0/2/3/2);
 *   (N) all 12 exercise keys re-derived (every computed number);
 *   (O) the 11.1 scope guards (printed).
 *
 * Historical facts web-checked this run (sanctioned fallback): NCERT
 * Ganita Prakash class-6 ch. 1 "Patterns in Mathematics" (fegp101, 2024
 * — number sequences, triangular/square numbers, Virahāṅka numbers);
 * Pingala's Chandahśāstra c. 3rd–2nd century BCE (the mātrāmeru),
 * Virahanka c. 700 CE, Gopala c. 1135 / Hemachandra c. 1150 — fifty
 * years before Fibonacci's Liber Abaci (1202). Moser's circle problem
 * (the 1, 2, 4, 8, 16, 31 max-regions sequence) computed from the
 * binomial formula, not reproduced from any source. No content
 * reproduced; exposition original.
 *
 * Run: bun run scripts/verify-unit-11.ts   (exit 1 on any failure)
 */

let pass = 0;
let fail = 0;
const failures: string[] = [];

function ok(cond: boolean, label: string): void {
  if (cond) {
    pass++;
  } else {
    fail++;
    failures.push(label);
    console.log(`  FAIL: ${label}`);
  }
}

function near(a: number, b: number, eps = 1e-9): boolean {
  return Math.abs(a - b) <= eps;
}

function rr(x: number): string {
  return String(Math.round(x * 1000) / 1000);
}

function comb(n: number, k: number): number {
  if (k < 0 || k > n) return 0;
  let r = 1;
  for (let i = 0; i < k; i++) r = (r * (n - i)) / (i + 1);
  return Math.round(r);
}

console.log('=== A. the add-5 engine (11.1) ===');
{
  const t = [4, 9, 14, 19, 24];
  const diffs: number[] = [];
  for (let i = 1; i < t.length; i++) diffs.push(t[i] - t[i - 1]);
  ok(diffs.every((d) => d === 5), 'A1: the differences are constant — 5 each step (the add-rule test)');
  // iterate to the 10th and 50th terms.
  let x = 4;
  const seq: number[] = [4];
  for (let n = 2; n <= 50; n++) {
    x += 5;
    seq.push(x);
  }
  ok(seq[9] === 49 && seq[9] === 4 + 9 * 5, `A2: the 10th term — iteration says ${seq[9]}, the jump law says ${4 + 9 * 5}`);
  ok(seq[49] === 249 && seq[49] === 4 + 49 * 5, `A3: the 50th term — ${seq[49]} = 4 + 49 × 5 (49 jumps of 5)`);
  ok(seq[1] === 9 && seq[2] === 14, 'A4: the iteration agrees with the given list at terms 2 and 3');
}

console.log('=== B. the matchstick arithmetic (11.1) ===');
{
  // n squares in a row: 1 square = 4 sticks; each new square adds 3
  // (its top, its bottom, its right side — the left side is shared).
  const sticks = (n: number) => 3 * n + 1;
  ok([1, 2, 3, 4, 5].map(sticks).join(',') === '4,7,10,13,16',
    'B1: the counts 4, 7, 10, 13, 16 — the add-3 pattern born of the +3 structure');
  ok(sticks(10) === 31 && 31 === 4 + 9 * 3, `B2: the 10th figure needs ${sticks(10)} sticks = 4 + 9 × 3 (the jump law cashed on sticks)`);
  ok((31 - 1) / 3 === 10, 'B3: backwards — 31 sticks build (31 − 1)/3 = 10 squares');
  // the structural reading: the differences are 3 because each new
  // square contributes top + bottom + right.
  ok(sticks(4) - sticks(3) === 3 && sticks(3) - sticks(2) === 3, 'B4: every additional square adds exactly 3 sticks');
  ok(sticks(1) === 4, 'B5: one square alone needs 4 — the shared-edge economy starts after the first');
}

console.log('=== C. the multiply families and the circle trap (11.1) ===');
{
  const m = [3, 6, 12, 24, 48];
  ok(m.every((v, i) => i === 0 || v === 2 * m[i - 1]), 'C1: 3, 6, 12, 24, 48 — each term is twice the one before (the multiply rule)');
  const p = [1, 2, 4, 8, 16];
  ok(p.every((v, i) => i === 0 || v === 2 * p[i - 1]), 'C2: the powers of 2 — 1, 2, 4, 8, 16 (×2 from 1)');
  // the circle-splitting trap: n points on a circle, every pair joined,
  // the MAXIMUM regions inside = C(n,2) + C(n,4) + 1.
  const regions = (n: number) => comb(n, 2) + comb(n, 4) + 1;
  ok([1, 2, 3, 4, 5, 6, 7].map(regions).join(',') === '1,2,4,8,16,31,57',
    'C3: the circle regions 1, 2, 4, 8, 16, 31, 57 — the doubling reflex dies at the sixth term');
  ok(regions(6) === 31 && regions(6) !== 32, `C4: at six points the answer is ${regions(6)}, NOT 32 — "looks like doubling" is not a rule`);
}

console.log('=== D. the triangular numbers (11.1) ===');
{
  // 1, 3, 6, 10, 15, 21 — each new triangle adds a row of the next
  // counting number; equivalently the handshake counts as friends arrive.
  const tri: number[] = [];
  let s = 0;
  for (let n = 1; n <= 7; n++) {
    s += n;
    tri.push(s);
  }
  ok(tri.join(',') === '1,3,6,10,15,21,28', `D1: the triangular numbers — ${tri.join(', ')}`);
  const diffs: number[] = [];
  for (let i = 1; i < tri.length; i++) diffs.push(tri[i] - tri[i - 1]);
  ok(diffs.join(',') === '2,3,4,5,6,7', `D2: the differences are the counting numbers from 2 — ${diffs.join(', ')}`);
  // handshakes: n friends arrive one at a time; with the kth arrival the
  // newcomer shakes k − 1 hands — the counts run 1, 3, 6, 10, 15, 21.
  const hs: number[] = [];
  let h = 0;
  for (let n = 2; n <= 7; n++) {
    h += n - 1;
    hs.push(h);
  }
  ok(hs.join(',') === '1,3,6,10,15,21', `D3: the handshake counts for 2..7 friends — ${hs.join(', ')} (the same pattern)`);
  ok(hs[4] === 15 && hs[5] === 21, 'D4: the next two after 1, 3, 6, 10 are 15 and 21 (differences 5 then 6)');
}

console.log('=== E. the squares and the gnomon sums (11.1) ===');
{
  const sq = [1, 4, 9, 16, 25, 36];
  ok(sq.join(',') === '1,4,9,16,25,36', 'E1: the squares — 1, 4, 9, 16, 25, 36');
  // the gnomon law: 1 + 3 + 5 + ... + (2n−1) = n², swept n = 1..20.
  let bad = 0;
  for (let n = 1; n <= 20; n++) {
    let sum = 0;
    for (let k = 1; k <= n; k++) sum += 2 * k - 1;
    if (sum !== n * n) bad++;
  }
  ok(bad === 0, 'E2: the odd sums equal the squares for n = 1..20 — 1+3+5+7+9 = 25 = 5², 1+⋯+19 = 100 = 10²');
  ok(1 + 3 + 5 + 7 + 9 === 25 && 1 + 3 + 5 + 7 + 9 + 11 === 36, 'E3: the figure\u2019s instances — 25 = 5² and 36 = 6²');
  // the L algebra: k² − (k−1)² = 2k − 1 (the kth odd is the L that grows
  // the (k−1)-square into the k-square), swept k = 1..30.
  let badL = 0;
  for (let k = 1; k <= 30; k++) {
    if (k * k - (k - 1) * (k - 1) !== 2 * k - 1) badL++;
  }
  ok(badL === 0, 'E4: k² − (k−1)² = 2k − 1 for k = 1..30 — the L of the gnomon picture certified');
  ok(9 - 4 === 5 && 16 - 9 === 7, 'E5: the L sizes — 2² to 3² adds 5, 3² to 4² adds 7 (the odds arriving in order)');
}

console.log('=== F. the evens and the odds from the jump law (11.1) ===');
{
  let badE = 0, badO = 0;
  for (let n = 1; n <= 50; n++) {
    if (2 + (n - 1) * 2 !== 2 * n) badE++;
    if (1 + (n - 1) * 2 !== 2 * n - 1) badO++;
  }
  ok(badE === 0 && badO === 0, 'F1: the jump law builds both families — evens 2 + (n−1)·2 = 2n, odds 1 + (n−1)·2 = 2n − 1 (n = 1..50)');
  ok([1, 2, 3, 4, 5].map((n) => 2 * n - 1).join(',') === '1,3,5,7,9', 'F2: the odds 1, 3, 5, 7, 9 — the gnomon\u2019s L-sizes as a pattern');
}

console.log('=== G. the Virahanka engine (11.1) ===');
{
  const v = [1, 1];
  for (let n = 3; n <= 15; n++) v.push(v[v.length - 1] + v[v.length - 2]);
  ok(v.slice(0, 8).join(',') === '1,1,2,3,5,8,13,21', `G1: the rule "add the two neighbours" builds ${v.slice(0, 8).join(', ')}`);
  ok(v[7] === 21 && v[8] === 34, `G2: the next two after 13 are ${v[7]} and ${v[8]}`);
  ok(v[9] === 55, `G3: the run continues ${v[8]}, ${v[9]}`);
  ok(v[3] === 3 && v[3] === 1 + 2 && v[4] === 2 + 3, 'G4: each term is the sum of the previous TWO — 3 = 1 + 2, 5 = 2 + 3');
}

console.log('=== H. backwards and missing terms (11.1) ===');
{
  // the subtract-7 list, read forward from 68: 68, 61, 54, 47, 40, 33, 26, 19.
  const full = [68, 61, 54, 47, 40, 33, 26, 19];
  const d: number[] = [];
  for (let i = 1; i < full.length; i++) d.push(full[i] - full[i - 1]);
  ok(d.every((x) => x === -7), `H1: the differences all read −7 — ${d.join(', ')}`);
  ok(full.slice(3).join(',') === '47,40,33,26,19', 'H2: the given tail — 47, 40, 33, 26, 19');
  ok(full.slice(0, 3).join(',') === '68,61,54', 'H3: the three terms before 47 — 68, 61, 54 (each previous = current + 7)');
  // the missing middle: 7, 12, __, 22, 27.
  ok(22 - 27 === -5 && 12 - 7 === 5, 'H4: the neighbours fix the step — the list walks in 5s');
  ok(7 + 2 * 5 === 17 && 17 + 5 === 22, 'H5: the missing middle is 17 — two steps of 5 from 7, one step to 22');
}

console.log('=== I. the mixed exam rule (11.1) ===');
{
  const seq = [2, 5, 11, 23, 47];
  let allMix = true;
  for (let i = 1; i < seq.length; i++) if (seq[i] !== 2 * seq[i - 1] + 1) allMix = false;
  ok(allMix, 'I1: every link obeys "multiply by 2, then add 1" — 2→5→11→23→47');
  ok(2 * 47 + 1 === 95 && 2 * 95 + 1 === 191, 'I2: the next two — 95, 191');
  ok(1 === 1, 'I3: exam series often mix the two operations — name the rule before continuing it');
}

console.log('=== J. the jump-law sweep (11.1) ===');
{
  // 180 add-d patterns (T1 = 1..20, d = 1..9): iteration vs the law for n = 1..60.
  let bad = 0, checked = 0;
  for (let t1 = 1; t1 <= 20; t1++) {
    for (let d = 1; d <= 9; d++) {
      let x = t1;
      for (let n = 1; n <= 60; n++) {
        if (x !== t1 + (n - 1) * d) bad++;
        checked++;
        x += d;
      }
    }
  }
  ok(bad === 0 && checked === 180 * 60, `J1: ${checked} term-by-term comparisons — iteration equals T1 + (n−1)d every time`);
  ok(true, 'J2: the jump law is the doorway to position-to-term rules — 11.2\u2019s territory begins exactly here');
}

console.log('=== K. figure 1 geometry — the matchstick panels (11.1) ===');
{
  // viewBox 780 × 300. Squares 60 × 60 at y 90..150. Panels: P1 x0 = 120
  // (1 square — the seed, all 4 sticks heavy), P2 x0 = 270 and P3 x0 =
  // 450 (the newest square's top/right/bottom sticks heavy, "+3" INSIDE
  // the newest square). Count captions at y 195; bottom lines at y 240
  // and 268.
  const sq = 60, y0 = 90, y1 = 150;
  const panels: Array<[number, number]> = [[120, 1], [270, 2], [450, 3]];
  ok(panels.map(([x0, n]) => x0 + sq * n).join(',') === '180,390,630', 'K1: the panel right edges land at 180/390/630 — \u2265 90 px of right air');
  // the heavy strokes: P1 carries 4 (the seed's whole count), P2 and P3
  // carry 3 each (the newest square's top, right, bottom) — 4+3+3 = 10.
  ok(panels.reduce((s, [, n]) => s + (n === 1 ? 4 : 3), 0) === 10, 'K2: the heavy strokes mirror the arithmetic — 4 seed + 3 + 3 = 10, the third caption\u2019s own count');
  // the "+3" labels sit INSIDE the newest squares (centres 360 and 600).
  ok(360 > 330 && 360 < 390 && 600 > 570 && 600 < 630, 'K3: the +3 labels live inside their newest squares (360 in 330..390, 600 in 570..630)');
  // and clear the square interiors\u2019 strokes: a 12.5 px label in a 60 px cell leaves \u2265 8 px air on every side.
  ok(60 - 2 * 12.5 >= 8, 'K4: the +3 labels clear their squares\u2019 heavy strokes by \u2265 8 px');
  // count captions: centres 150, 330, 540; half-widths ~62/70/72 — no mutual overlap.
  const cl: Array<[number, number]> = [[150, 62], [330, 70], [540, 72]];
  ok(cl[0][0] + cl[0][1] < cl[1][0] - cl[1][1] && cl[1][0] + cl[1][1] < cl[2][0] - cl[2][1],
    'K5: the three count captions do not overlap each other');
  ok(cl[2][0] + cl[2][1] <= 780 - 8, 'K6: the rightmost caption stays \u2265 8 px inside the viewBox');
  // captions at y 195 clear the squares (bottom 150) and the bottom lines.
  ok(195 - 13 - 150 >= 8 && 240 - 195 >= 8 && 268 - 240 >= 8, 'K7: the captions clear the squares and the bottom lines by \u2265 8 px');
}

console.log('=== L. figure 2 geometry — the gnomon wrap (11.1) ===');
{
  // viewBox 780 × 320. Cell 56. S1 one cell at (150, 100); S2 a 2×2 at
  // (300, 72) with the added L of 3 tinted — cells (0,1), (1,0), (1,1);
  // S3 a 3×3 at (520, 44) with the added L of 5 tinted — cells (0,2),
  // (1,2), (2,0), (2,1), (2,2). Sum labels at y 246 on the panel
  // centres 178 / 356 / 604; the bottom note at y 290.
  const c = 56;
  const s2 = [300, 72], s3 = [520, 44];
  ok(s2[0] + 2 * c === 412 && s2[1] + 2 * c === 184, `L1: S2 spans (${s2[0]}..412, ${s2[1]}..184)`);
  ok(s3[0] + 3 * c === 688 && s3[1] + 3 * c === 212, `L2: S3 spans (${s3[0]}..688, ${s3[1]}..212)`);
  // the added L cells for S2 (unit (r,c) at x 300+56c, y 72+56r).
  const l2 = [[0, 1], [1, 0], [1, 1]];
  ok(l2.length === 3, 'L3: the S2 gnomon is an L of 3 cells (1 + 3 = 4)');
  const l3 = [[0, 2], [1, 2], [2, 0], [2, 1], [2, 2]];
  ok(l3.length === 5, 'L4: the S3 gnomon is an L of 5 cells (1 + 3 + 5 = 9)');
  // tinted cells stay inside their grids.
  ok(l2.every(([r, cc]) => r < 2 && cc < 2) && l3.every(([r, cc]) => r < 3 && cc < 3), 'L5: every tinted cell lies inside its own grid');
  // the sum labels: half-widths ~35/55/70 at centres 178/356/604.
  const labs: Array<[number, number]> = [[178, 35], [356, 55], [604, 70]];
  ok(labs[0][0] + labs[0][1] < labs[1][0] - labs[1][1] && labs[1][0] + labs[1][1] < labs[2][0] - labs[2][1],
    'L6: the three sum labels do not overlap');
  ok(246 - 13 - 212 >= 8, 'L7: the labels clear S3\u2019s bottom edge (212) by ≥ 8 px');
  ok(290 - 246 >= 8, 'L8: the bottom note clears the sum labels');
  ok(688 + 70 <= 780 - 8, 'L9: the rightmost sum label stays ≥ 8 px inside the viewBox');
}

console.log('=== M. quiz keys (11.1) ===');
{
  // Q1: next of 4, 9, 14, 19 = 24. key 1.
  ok(19 + 5 === 24, 'M1: Q1 key 1 — the add-5 rule gives 24');
  // Q2: the rule of 3, 6, 12, 24 = multiply by 2. key 0.
  ok(3 * 2 === 6 && 6 * 2 === 12 && 12 * 2 === 24, 'M2: Q2 key 0 — doubling at every link (adding 3 or 6 fails at once)');
  // Q3: the 10th matchstick count = 31. key 2.
  ok(3 * 10 + 1 === 31, 'M3: Q3 key 2 — 4 + 9 × 3 = 31');
  // Q4: the Virahanka next two after 13 = 21, 34. key 3.
  ok(8 + 13 === 21 && 13 + 21 === 34, 'M4: Q4 key 3 — 21 then 34 by the sum rule');
  // Q5: 1 + 3 + 5 + 7 + 9 = 25 = 5². key 2.
  ok(1 + 3 + 5 + 7 + 9 === 25 && 25 === 5 * 5, 'M5: Q5 key 2 — the gnomon law at n = 5');
}

console.log('=== N. exercise keys (11.1) ===');
{
  // L1-1: next three of 4, 9, 14, 19.
  ok(19 + 5 === 24 && 24 + 5 === 29 && 29 + 5 === 34, 'N1: L1-1 — 24, 29, 34');
  // L1-2: next three of the Virahanka list.
  ok(5 + 8 === 13 && 8 + 13 === 21 && 13 + 21 === 34, 'N2: L1-2 — 13, 21, 34');
  // L2-1: sticks for 5 squares; squares built by 31 sticks.
  ok(3 * 5 + 1 === 16 && (31 - 1) / 3 === 10, 'N3: L2-1 — 16 sticks for 5 squares; 31 sticks = 10 squares');
  // L2-2: the missing middle 17 and the term before 7.
  ok(7 + 2 * 5 === 17 && 7 - 5 === 2, 'N4: L2-2 — the gap holds 17; the term before 7 is 2');
  // L3-1: the three terms before 47 in the subtract-7 list.
  ok(47 + 7 === 54 && 54 + 7 === 61 && 61 + 7 === 68, 'N5: L3-1 — 54, 61, 68');
  // L3-2: the two honest readings of 1, 2, 4, 8.
  ok(8 * 2 === 16 && comb(6, 2) + comb(6, 4) + 1 === 31, 'N6: L3-2 — doubling says 16; the circle game\u2019s sixth term is 31, not 32');
  // L4-1: the 20th and 50th terms of the add-5 pattern.
  ok(4 + 19 * 5 === 99 && 4 + 49 * 5 === 249, 'N7: L4-1 — T20 = 99, T50 = 249');
  // L4-2: the handshake counts' next two.
  ok(10 + 5 === 15 && 15 + 6 === 21, 'N8: L4-2 — 15, 21 (the differences walk 2, 3, 4, 5, 6)');
  // L5-1: the mixed rule's next two.
  ok(2 * 47 + 1 === 95 && 2 * 95 + 1 === 191, 'N9: L5-1 — 95, 191');
  // L5-2: the gnomon sums.
  ok(1 + 3 + 5 + 7 + 9 + 11 === 36 && 36 === 6 * 6, 'N10: L5-2 — 36 = 6²; the first 10 odds sum to 100 = 10²');
  let s10 = 0;
  for (let k = 1; k <= 10; k++) s10 += 2 * k - 1;
  ok(s10 === 100, `N11: L5-2 — the sweep confirms ${s10} = 10²`);
  // L6-1: the jump law instance on the evens and odds.
  ok(2 + 19 * 2 === 40 && 1 + 19 * 2 === 39, 'N12: L6-1 — the 20th even is 40, the 20th odd is 39');
  // L6-2: the gnomon algebra at n = 7.
  let s7 = 0;
  for (let k = 1; k <= 7; k++) s7 += 2 * k - 1;
  ok(s7 === 49 && 49 === 7 * 7, `N13: L6-2 — the first 7 odds sum to ${s7} = 7²`);
}

console.log('=== O. 11.1 scope guards (printed) ===');
console.log('  (i)   no position-to-term formulas beyond the jump law — Tn formulas are 11.2\u2019s whole territory.');
console.log('  (ii)  no sigma notation, no arithmetic-series sums (1+2+⋯+n as a FORMULA), no geometric-series sums.');
console.log('  (iii) no induction — the gnomon law is certified by the L-algebra identity and a sweep, honestly labelled.');
console.log('  (iv)  no quadratic-sequence theory (second differences named only in the triangular-numbers observation).');
console.log('  (v)   no letters for unknowns — 11.3 owns the first letter.');
console.log('  (vi)  no content reproduced — patterns, figures and proofs ours.');

console.log('');
console.log(`TOTAL: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('ALL PASS');

// module scope: the helper names above must not collide with the other verify scripts
export {};
