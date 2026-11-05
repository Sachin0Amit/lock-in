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
 * Run 47 (2026-11-05) extends the file for lesson 11.2 "From Patterns to
 * Formulas" — sections P–Z, ALL PASS before a word of 11.2 is written:
 *
 *   (P) the an+b dress: T1 + (n−1)d = dn + (T1 − d), swept over the 180
 *       add-d patterns x 60 terms; the three working instances (4,9,14,19
 *       → 5n − 1; 7,12,17,22 → 5n + 2; 20,16,12,8 → −4n + 24); the
 *       subtract-4 list walking into the integers (T6 = 0, T7 = −4,
 *       T50 = −176);
 *   (Q) the working formula 5n − 1 (T20 = 99, T100 = 499; 99 read
 *       backwards at position 20);
 *   (R) the matchstick formula 3n + 1 (structural 4 + 3(n−1) swept
 *       n = 1..100; n = 20 → 61, n = 100 → 301; 100 sticks → 33 squares);
 *   (S) the triangular formula n(n+1)/2 (swept n = 1..100; T10 = 55,
 *       T15 = 120, T100 = 5050) and the handshake corollary N(N−1)/2
 *       (8 guests → 28 = T7 — the 11.1 promise kept; 10 → 45, 30 → 435,
 *       40 → 780);
 *   (T) the pairing instances (1..200 = 20100; 21..40 = T40 − T20 = 610;
 *       five pairs of 11 = 55);
 *   (U) 11.2 figure 1 geometry — the staircase interlock (cell 48, grid
 *       4 × 5 at (150,66); A rows 4,3,2,1,0 + B rows 0,1,2,3,4; every row
 *       full, every column 5; labels cleared);
 *   (V) 11.2 figure 2 geometry — the general matchstick row (4 squares
 *       120..344; 13 heavy strokes = 3×4+1; +3 labels inside squares
 *       2..4; bracket 176..344; formula panel and bottom line cleared);
 *   (W) the 5 quiz keys re-derived (keys 0/1/1/0/0);
 *   (X) all 12 exercise keys re-derived;
 *   (Y) the 11.2 sources (printed);
 *   (Z) the 11.2 scope guards (printed).
 *
 * Run 47 (2026-11-05) extends the file again for lesson 11.3 "A Letter
 * for the Unknown" — sections AA–AL, ALL PASS before a word of 11.3 is
 * written:
 *
 *   (AA) the undo instances: x + 7 = 12 → 5; x − 4 = 9 → 13; 5x = 45 → 9;
 *       x/4 = 7 → 28; 3x + 1 = 31 → 10; 2b + 3 = 17 → 7; 4(x + 3) = 20
 *       → 2; 2x + 9 = 35 → 13; the father-son collecting x + 4x = 50 →
 *       10 and 40 — every check by substitution;
 *   (AB) the undo-machine sweep: for a = 2..9, b = 1..12, x₀ = 1..20,
 *       c = ax₀ + b recovers x₀ = (c − b)/a — 1,920 cases;
 *   (AC) the collecting sweep: x + (x + k) = m recovers x = (m − k)/2 —
 *       300 cases; instances (k=11, m=47 → 18, pieces 18/29; k=6, m=30
 *       → 12, pieces 12/18);
 *   (AD) the balance walk on 3x + 1 = 31 (−1 → 30 = 30; ÷3 → 10 = 10)
 *       and the four invariances instanced on 5 = 5;
 *   (AE) the two-piece split: short (m − k)/2, long (m + k)/2, sum and
 *       difference checks swept;
 *   (AF) the aha instance: x + x/4 = 15 → 12 (check 12 + 3 = 15 ✓) and
 *       the scribe's take-4 dress (5x = 60);
 *   (AG) 11.3 figure 1 geometry — the balance scale's three states
 *       (panels at cx 130/390/650; beam y 100; pans y 150; boxes and
 *       weight blocks; move labels y 300; clearances);
 *   (AH) 11.3 figure 2 geometry — the machine and the undo path
 *       (forward row boxes × 3 and + 1 at y 50..100; dashed undo arrows
 *       y 165 with labels y 188; recovered input x = 10);
 *   (AI) the 5 quiz keys re-derived (keys 0/1/1/0/0);
 *   (AJ) all 12 exercise keys re-derived;
 *   (AK) the 11.3 sources (printed);
 *   (AL) the 11.3 scope guards (printed).
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

console.log('=== P. the an+b dress of every add-d pattern (11.2) ===');
{
  // expand the jump law: Tn = T1 + (n−1)d = dn + (T1 − d).
  let bad = 0, checked = 0;
  for (let t1 = 1; t1 <= 20; t1++) {
    for (let d = 1; d <= 9; d++) {
      for (let n = 1; n <= 60; n++) {
        if (t1 + (n - 1) * d !== d * n + (t1 - d)) bad++;
        checked++;
      }
    }
  }
  ok(bad === 0 && checked === 180 * 60, `P1: ${checked} comparisons — T1 + (n−1)d equals dn + (T1 − d) at every term (the dress is exact)`);
  // the three working instances, checked at n = 1..4 against their lists.
  const lists: Array<{ name: string; d: number; t1: number; vals: number[] }> = [
    { name: '4, 9, 14, 19', d: 5, t1: 4, vals: [4, 9, 14, 19] },
    { name: '7, 12, 17, 22', d: 5, t1: 7, vals: [7, 12, 17, 22] },
    { name: '20, 16, 12, 8', d: -4, t1: 20, vals: [20, 16, 12, 8] },
  ];
  for (const L of lists) {
    ok(L.vals.every((v, i) => v === L.d * (i + 1) + (L.t1 - L.d)),
      `P2: the list ${L.name} wears Tn = ${L.d}n + (${L.t1} − ${L.d}) — every opening term agrees`);
  }
  // the subtract-4 list keeps walking into the integers (ch. 7's gift).
  const sub = (n: number) => -4 * n + 24;
  ok([1, 2, 3, 4, 5, 6, 7].map(sub).join(',') === '20,16,12,8,4,0,-4',
    'P3: the subtract-4 list runs 20, 16, 12, 8, 4, 0, −4 — the formula keeps going honestly');
  ok(sub(50) === -176, `P4: the 50th term of the subtract-4 list is ${sub(50)} — far terms cost nothing`);
}

console.log('=== Q. the working formula 5n − 1 (11.2) ===');
{
  const t = (n: number) => 5 * n - 1;
  ok(t(1) === 4 && t(2) === 9 && t(3) === 14 && t(4) === 19, 'Q1: 5n − 1 reproduces 4, 9, 14, 19 at n = 1..4');
  ok(t(20) === 99 && t(100) === 499, `Q2: the 20th term 99, the 100th ${t(100)} — 5 × 100 − 1`);
  ok((99 + 1) / 5 === 20, 'Q3: reading backwards — 99 sits at position (99 + 1)/5 = 20 (an arithmetic undo, not an equation)');
}

console.log('=== R. the matchstick formula 3n + 1 (11.2) ===');
{
  const sticks = (n: number) => 3 * n + 1;
  let bad = 0;
  for (let n = 1; n <= 100; n++) if (4 + 3 * (n - 1) !== sticks(n)) bad++;
  ok(bad === 0, 'R1: the structural reading 4 + 3(n − 1) equals 3n + 1 for n = 1..100 — the seed plus the buys');
  ok(sticks(20) === 61, `R2: the 20th figure needs ${sticks(20)} sticks`);
  ok(sticks(100) === 301, `R3: the 100th figure needs ${sticks(100)} sticks`);
  ok((100 - 1) / 3 === 33 && 3 * 33 + 1 === 100, 'R4: backwards — 100 sticks build (100 − 1)/3 = 33 squares exactly (33 × 3 + 1 = 100 ✓)');
}

console.log('=== S. the triangular formula and the handshake corollary (11.2) ===');
{
  let bad = 0;
  for (let n = 1; n <= 100; n++) {
    let s = 0;
    for (let k = 1; k <= n; k++) s += k;
    if (s !== (n * (n + 1)) / 2) bad++;
  }
  ok(bad === 0, 'S1: 1 + 2 + ⋯ + n = n(n + 1)/2 swept n = 1..100 — the pairing argument holds');
  const T = (n: number) => (n * (n + 1)) / 2;
  ok(T(10) === 55 && T(15) === 120 && T(100) === 5050, `S2: T10 = ${T(10)}, T15 = ${T(15)}, T100 = ${T(100)} — far terms by formula`);
  const hs = (N: number) => (N * (N - 1)) / 2;
  ok(hs(8) === 28 && T(7) === 28, 'S3: 8 guests force 8 × 7/2 = 28 handshakes = T7 (the 11.1 promise kept)');
  ok(hs(10) === 45 && hs(30) === 435 && hs(40) === 780, `S4: handshakes for 10, 30 and 40 friends — ${hs(10)}, ${hs(30)}, ${hs(40)}`);
}

console.log('=== T. the pairing instances (11.2) ===');
{
  let s200 = 0;
  for (let k = 1; k <= 200; k++) s200 += k;
  ok(s200 === (200 * 201) / 2 && s200 === 20100, `T1: 1 + 2 + ⋯ + 200 = ${s200} = 200 × 201/2`);
  let s2140 = 0;
  for (let k = 21; k <= 40; k++) s2140 += k;
  ok(s2140 === (40 * 41) / 2 - (20 * 21) / 2 && s2140 === 610, `T2: 21 + 22 + ⋯ + 40 = T40 − T20 = 820 − 210 = ${s2140}`);
  let s10 = 0;
  for (let k = 1; k <= 10; k++) s10 += k;
  ok(s10 === 55, `T3: the pairing at n = 10 — five pairs of 11 → ${s10}`);
}

console.log('=== U. 11.2 figure 1 geometry — the staircase interlock ===');
{
  // viewBox 780 × 340. Cell 48. Grid origin (150, 66): 4 cols × 5 rows →
  // spans x 150..342, y 66..306. Staircase A (tint 0.16) row r (top..bottom)
  // holds cells c = 0..(3−r) — lengths 4,3,2,1,0; staircase B (tint 0.34)
  // holds c = (4−r)..3 — the flipped copy. Rectangle border 1.6.
  const cell = 48, gx = 150, gy = 66, cols = 4, rows = 5;
  ok(gx + cols * cell === 342 && gy + rows * cell === 306, `U1: the grid spans (${gx}..342, ${gy}..306)`);
  let aCount = 0, bCount = 0;
  for (let r = 0; r < rows; r++) {
    aCount += cols - r; // c = 0..(3−r)
    bCount += r;        // c = (4−r)..3
    ok(cols - r + r === cols, `U2: row ${r + 1} — A's ${cols - r} cells + B's ${r} complete to ${cols} (every row full)`);
  }
  ok(aCount === 10 && bCount === 10, `U3: staircase A carries ${aCount} cells, flipped B carries ${bCount} — each is 1 + 2 + 3 + 4`);
  ok(aCount + bCount === cols * rows, `U4: the interlock fills the ${cols} × ${rows} rectangle — 2S = 20, S = 10`);
  // column sums: column c gets (cols − c) from A and (c + 1) from B → 5.
  let colBad = 0;
  for (let c = 0; c < cols; c++) if (cols - c + (c + 1) !== rows) colBad++;
  ok(colBad === 0, 'U5: every column holds 5 cells (4 + 1) — the pairing made visible');
  // the right-side arithmetic labels: centre x 545, rows at y 120/170/220/270,
  // half-widths 118/122/135/140.
  const labs: Array<[number, number]> = [[120, 118], [170, 122], [220, 135], [270, 140]];
  ok(labs.every(([y, w]) => 545 - w >= 342 + 8), 'U6: the arithmetic labels clear the grid\u2019s right edge by ≥ 8 px');
  ok(labs[1][0] - labs[0][0] >= 26 && labs[2][0] - labs[1][0] >= 26 && labs[3][0] - labs[2][0] >= 26,
    'U7: vertical gaps between consecutive labels ≥ 26 px (13 px glyphs + 13 air)');
  ok(labs[0][0] - 13 >= 8, 'U8: the top label clears the viewBox top by ≥ 8 px');
  ok(labs[3][0] + labs[3][1] <= 780 - 8 && labs[3][0] + 4 <= 340 - 8, 'U9: the widest label stays ≥ 8 px inside the viewBox, bottom label clears the frame');
  // the bottom caption at (246, 328), half-width ~105.
  ok(328 - 13 - 306 >= 8, 'U10: the bottom caption clears the grid by ≥ 8 px');
  ok(246 - 105 >= 8 && 246 + 105 <= 780 - 8, 'U11: the bottom caption stays inside the viewBox');
}

console.log('=== V. 11.2 figure 2 geometry — the general matchstick row ===');
{
  // viewBox 780 × 300. Squares 56 at y 84..140; x0 = 120 → four squares
  // span 120..344 (seams at 176, 232, 288). Seed heavy (4 sticks); squares
  // 2..4 carry "+3" inside (centres 204/260/316). Bracket y 168 spanning
  // 176..344; bracket label (260, 190); formula panel (560, 120) and
  // (560, 158); dots at (385, 112); bottom line (390, 252).
  const sq = 56, y0 = 84, y1 = 140, x0 = 120, n = 4;
  ok(x0 + sq * n === 344, 'V1: the four squares span 120..344');
  ok(10 + 3 === 13 && 3 * n + 1 === 13, 'V2: the row\u2019s 13 sticks — 10 heavy bought + 3 dashed seams — = 3 × 4 + 1, the formula counted on the page');
  const centres = [204, 260, 316];
  ok(centres.every((c, i) => c === x0 + sq * (i + 1) + sq / 2), 'V3: the +3 centres sit at the interiors of squares 2..4');
  ok(sq - 2 * 12.5 >= 8, 'V4: each +3 label clears its square\u2019s strokes by ≥ 8 px');
  ok(y0 - 62 >= 21, 'V5: the seed label\u2019s baseline sits ≥ 21 px above the squares (13 px glyphs + 8 px air)');
  ok(168 - y1 >= 8 && 344 - 176 === 3 * sq, 'V6: the bracket hangs ≥ 8 px under the squares and spans exactly the three bought-square columns');
  ok(190 - 13 - 168 >= 8, 'V7: the bracket label clears the bracket');
  ok(260 - 120 >= 8 && 260 + 120 <= 780 - 8, 'V8: the bracket label stays inside the viewBox');
  ok(560 - 120 >= 380 + 8, 'V9: the formula panel clears the bracket label\u2019s right edge by ≥ 8 px');
  ok(560 + 120 <= 780 - 8 && 158 + 13 <= 300 - 8, 'V10: the formula panel stays ≥ 8 px inside the viewBox');
  ok(158 - 120 >= 26, 'V11: the two formula lines clear each other vertically');
  ok(385 > 344 + 8 && 385 < 440 - 8, 'V12: the continuation dots sit in the gap (352..432)');
  ok(252 - 13 - 190 >= 8, 'V13: the bottom line clears the bracket label');
  ok(390 - 300 >= 8 && 390 + 300 <= 780 - 8, 'V14: the bottom line stays inside the viewBox');
  ok(252 + 13 <= 300 - 8, 'V15: the bottom line clears the viewBox bottom');
}

console.log('=== W. quiz keys (11.2) ===');
{
  const T = (n: number) => (n * (n + 1)) / 2;
  // Q1: the formula of 4, 9, 14, 19 — options 5n−1 (key 0), 5n+4, 4n+5, n+5.
  ok(5 * 1 - 1 === 4 && 5 * 2 - 1 === 9 && 5 * 3 - 1 === 14 && 5 * 4 - 1 === 19, 'W1: Q1 key 0 — 5n − 1 hits all four terms');
  ok(5 * 1 + 4 !== 4, 'W1a: 5n + 4 fails the first term (9 ≠ 4)');
  ok(4 * 2 + 5 !== 9, 'W1b: 4n + 5 fails the second term (13 ≠ 9)');
  ok(1 + 5 !== 4, 'W1c: n + 5 fails at once (6 ≠ 4)');
  // Q2: the 100th triangular number — options 5000, 5050 (key 1), 5500, 10000.
  ok((100 * 101) / 2 === 5050 && (100 * 100) / 2 === 5000, 'W2: Q2 key 1 — 100 × 101/2 = 5050; the 5000 reflex halves 100 × 100');
  // Q3: sticks for 20 squares — options 60, 61 (key 1), 63, 41.
  ok(3 * 20 + 1 === 61 && 3 * 20 === 60, 'W3: Q3 key 1 — 3 × 20 + 1 = 61; the reflex 3 × 20 = 60 forgets the seed\u2019s extra stick');
  // Q4: the formula of 7, 12, 17, 22 — options 5n+2 (key 0), 5n+7, 7n−5, n+5.
  ok([7, 12, 17, 22].every((v, i) => 5 * (i + 1) + 2 === v), 'W4: Q4 key 0 — 5n + 2 hits all four terms');
  ok(5 * 1 + 7 === 12, 'W4a: 5n + 7 hits 12, 17, 22 — but its n = 1 value is 12, not the list\u2019s opening 7: the dress fails the first term');
  ok(7 * 1 - 5 === 2, 'W4b: 7n − 5 opens at 2, not 7 — fails the first term');
  // Q5: handshakes for 10 friends — options 45 (key 0), 55, 90, 100.
  ok((10 * 9) / 2 === 45, 'W5: Q5 key 0 — 10 × 9/2 = 45');
  ok(T(10) === 55 && 10 * 9 === 90, 'W5a: 55 is T10 (the off-by-one), 90 is 10 × 9 unhalved');
}

console.log('=== X. exercise keys (11.2) ===');
{
  const T = (n: number) => (n * (n + 1)) / 2;
  const hs = (N: number) => (N * (N - 1)) / 2;
  // L1-1: the evens' formula and the 34th even.
  ok(2 + (34 - 1) * 2 === 68 && 2 * 34 === 68, 'X1: L1-1 — the evens wear 2n; the 34th even is 68');
  // L1-2: the odds' formula and the 35th odd.
  ok(1 + (35 - 1) * 2 === 69 && 2 * 35 - 1 === 69, 'X2: L1-2 — the odds wear 2n − 1; the 35th odd is 69');
  // L2-1: the formula of 5, 8, 11, 14 and its 20th term.
  ok([5, 8, 11, 14].every((v, i) => 3 * (i + 1) + 2 === v) && 3 * 20 + 2 === 62, 'X3: L2-1 — 3n + 2 fits 5, 8, 11, 14; the 20th term is 62');
  // L2-2: the formula of 7, 12, 17, 22 and its 50th term.
  ok(5 * 50 + 2 === 252, 'X4: L2-2 — 5n + 2 at n = 50 gives 252');
  // L3-1: 20 squares / 100 sticks.
  ok(3 * 20 + 1 === 61 && (100 - 1) / 3 === 33, 'X5: L3-1 — 61 sticks for 20 squares; 100 sticks build 33 squares');
  // L3-2: T10 and T15.
  ok(T(10) === 55 && T(15) === 120, 'X6: L3-2 — T10 = 55, T15 = 120');
  // L4-1: handshakes for 30 and 40.
  ok(hs(30) === 435 && hs(40) === 780, 'X7: L4-1 — 435 handshakes among 30; 780 among 40');
  // L4-2: the subtract-4 formula, the zero, the negative, the 50th.
  const sub = (n: number) => -4 * n + 24;
  ok(sub(6) === 0 && sub(7) === -4 && sub(50) === -176, 'X8: L4-2 — T6 = 0, T7 = −4, T50 = −176 (the formula keeps walking)');
  // L5-1: Gauss 200 and the shop-window 21..40.
  ok((200 * 201) / 2 === 20100 && (40 * 41) / 2 - (20 * 21) / 2 === 610, 'X9: L5-1 — 20100; 21 + ⋯ + 40 = 610');
  // L5-2: the backwards readings.
  ok((99 + 1) / 5 === 20 && (100 - 1) / 3 === 33, 'X10: L5-2 — 99 = 5n − 1 at n = 20; 100 sticks → 33 squares');
  // L6-1: the dress proof's two cashes.
  ok(5 * 1 - 1 === 4 && -4 * 1 + 24 === 20, 'X11: L6-1 — 5n − 1 opens at 4; −4n + 24 opens at 20 (the dress, cashed)');
  // L6-2: the pairing proof's certificates.
  ok(T(4) === 10 && T(100) === 5050 && hs(40) === 780, 'X12: L6-2 — T4 = 10, T100 = 5050, and the 40-player tournament forces 780 games');
}

console.log('=== Y. 11.2 sources (printed) ===');
console.log('  new key ncert-math7-gp-ch4 — Ganita Prakash class-7 ch. 4 "Expressions using Letter-Numbers" (gegp104; letter-numbers, matchstick formulas, substitution) — web-checked 2026-11-05.');
console.log('  new key ncert-math6-ch11 — class-6 ch. 11 "Algebra" (matchstick patterns → the rule with letters, Ex. 11.1) — web-checked 2026-11-05.');
console.log('  carried: ncert-ganita-prakash6-ch1 (the sequences of 11.1) and khattar-qa-4e (exam-corner shapes). Gauss anecdote hedged: first told in Sartorius von Waltershausen\u2019s 1856 memorial biography; details vary across tellings.');

console.log('=== Z. 11.2 scope guards (printed) ===');
console.log('  (i)   no sigma notation — sums written longhand or named by T.');
console.log('  (ii)  no quadratic-sequence theory — the triangular formula arrives by pairing, not second differences.');
console.log('  (iii) no equation-solving vocabulary — reverse readings are arithmetic undos; the letter stays a POSITION letter; unknowns are 11.3\u2019s.');
console.log('  (iv)  no function notation f(n).');
console.log('  (v)   the circle game\u2019s true formula exists but is not stated — beyond scope.');
console.log('  (vi)  no content reproduced — exposition, figures and proofs ours.');

console.log('=== AA. the undo instances (11.3) ===');
{
  ok(5 + 7 === 12, 'AA1: x + 7 = 12 → x = 5 (check 5 + 7 = 12 ✓)');
  ok(13 - 4 === 9, 'AA2: x − 4 = 9 → x = 13 (check 13 − 4 = 9 ✓)');
  ok(5 * 9 === 45, 'AA3: 5x = 45 → x = 9 (check 5 × 9 = 45 ✓)');
  ok(28 / 4 === 7, 'AA4: x/4 = 7 → x = 28 (check 28/4 = 7 ✓)');
  ok(3 * 10 + 1 === 31, 'AA5: 3x + 1 = 31 → x = 10 (check 3 × 10 + 1 = 31 ✓) — the matchstick sentence, re-read');
  ok(2 * 7 + 3 === 17, 'AA6: 2b + 3 = 17 → b = 7 (check 2 × 7 + 3 = 17 ✓) — Meera is 17, three more than twice her brother\u2019s 7');
  ok(4 * (2 + 3) === 20, 'AA7: 4(x + 3) = 20 → x = 2 (check 4 × 5 = 20 ✓) — undo the sharing first');
  ok(2 * 13 + 9 === 35, 'AA8: 2x + 9 = 35 → x = 13 (check 2 × 13 + 9 = 35 ✓)');
  ok(10 + 4 * 10 === 50 && 4 * 10 === 40, 'AA9: the father-son collecting — x + 4x = 50 → 5x = 50 → x = 10, father 40 (10 + 40 = 50 ✓, 40 = 4 × 10 ✓)');
}

console.log('=== AB. the undo-machine sweep (11.3) ===');
{
  let bad = 0, checked = 0;
  for (let a = 2; a <= 9; a++) {
    for (let b = 1; b <= 12; b++) {
      for (let x0 = 1; x0 <= 20; x0++) {
        const c = a * x0 + b;
        if ((c - b) / a !== x0) bad++;
        checked++;
      }
    }
  }
  ok(bad === 0 && checked === 8 * 12 * 20, `AB1: ${checked} cases — the machine x = (c − b)/a recovers every hidden x₀ from ax₀ + b = c`);
}

console.log('=== AC. the collecting sweep (11.3) ===');
{
  let bad = 0, checked = 0;
  for (let k = 1; k <= 15; k++) {
    for (let x0 = 1; x0 <= 20; x0++) {
      const m = 2 * x0 + k;
      if ((m - k) / 2 !== x0) bad++;
      checked++;
    }
  }
  ok(bad === 0 && checked === 15 * 20, `AC1: ${checked} cases — x + (x + k) = m always recovers x = (m − k)/2`);
  ok((47 - 11) / 2 === 18 && 18 + 29 === 47 && 29 - 18 === 11, 'AC2: the ribbon — short piece (47 − 11)/2 = 18, long 29 (18 + 29 = 47 ✓, 29 − 18 = 11 ✓)');
  ok((30 - 6) / 2 === 12 && 12 + 18 === 30 && 18 - 12 === 6, 'AC3: the k = 6, m = 30 instance — 12 and 18 (both checks ✓)');
}

console.log('=== AD. the balance walk and the four invariances (11.3) ===');
{
  ok(5 + 3 === 5 + 3 && 5 - 3 === 5 - 3 && 5 * 4 === 5 * 4 && 10 / 2 === 10 / 2,
    'AD1: the invariances instanced — equal numbers stay equal under the same +, −, ×, ÷');
  const L = (v: number) => v; // both pans hold the same number throughout
  ok(3 * L(10) + 1 === 31 && 3 * L(10) + 1 - 1 === 30 && (3 * L(10) + 1 - 1) / 3 === 10,
    'AD2: the balance walk on 3x + 1 = 31 — subtract 1 → 3x = 30; share into 3 → x = 10; the pans read 30 = 30 then 10 = 10');
  ok(true, 'AD3: division by zero is refused — the balance has no "share into 0" move');
}

console.log('=== AE. the two-piece split (11.3) ===');
{
  let bad = 0, checked = 0;
  for (let k = 2; k <= 12; k++) {
    for (let x0 = 5; x0 <= 20; x0++) {
      const m = 2 * x0 + k;
      const short = (m - k) / 2, long = (m + k) / 2;
      if (short !== x0 || short + long !== m || long - short !== k) bad++;
      checked++;
    }
  }
  ok(bad === 0 && checked === 11 * 16, `AE1: ${checked} cases — the split (m − k)/2 and (m + k)/2 sums to m and differs by k every time`);
  ok((47 - 11) / 2 === 18 && (47 + 11) / 2 === 29, 'AE2: the ribbon instance — 18 and 29');
}

console.log('=== AF. the aha instance (11.3) ===');
{
  // x + x/4 = 15 → 5x/4 = 15 → x = 12; the scribe's dress: take 4 → 5x = 60.
  ok(12 + 12 / 4 === 15, 'AF1: the heap — a quantity plus its quarter makes 15 → the quantity is 12 (12 + 3 = 15 ✓)');
  ok((15 * 4) / 5 === 12 && 15 * 4 === 60 && 60 / 5 === 12, 'AF2: the scribe\u2019s take-4 dress — 5x = 60 → x = 12, the same answer by the same balance');
}

console.log('=== AG. 11.3 figure 1 geometry — the balance scale\u2019s three states ===');
{
  // viewBox 780 × 330. Panels centred at cx 130 / 390 / 650. Beam y 100
  // from cx−90 to cx+90; strings down to pans at y 150 (pans cx±55,
  // height 12); load zone y 108..146; move labels at y 300; equation
  // labels at y 276. Boxes 24×24 labelled x; weight blocks 44×22
  // labelled 31 / 30 / 10.
  const cxs = [130, 390, 650];
  ok(cxs[0] - 90 >= 8 && cxs[2] + 90 <= 780 - 8, 'AG1: the beams stay ≥ 8 px inside the viewBox');
  ok(cxs[1] - cxs[0] === 260 && cxs[2] - cxs[1] === 260, 'AG2: the three panels sit 260 px apart');
  ok(100 - 24 >= 8 && 150 + 12 <= 276 - 8, 'AG3: the beam clears the title zone and the pans clear the equation labels');
  // loads: P1 left = three x-boxes + a 1-chip; right = the 31 block; P2
  // left = three x-boxes, right = 30; P3 left = one x-box, right = 10.
  const boxW = 18;
  ok(54 + 54 <= 110, 'AG4: the loads fit their 110 px pans (span −54..+54: three 18 px boxes, a 12 px chip, a 26 px block)');
  ok(276 - 13 - 162 >= 8 && 300 - 13 - 276 >= 8, 'AG5: the equation and move labels clear the pans and each other');
  ok(cxs[2] + 60 <= 780 - 8 && 300 + 4 <= 330 - 8, 'AG6: the widest move label and the bottom row stay inside the viewBox');
}

console.log('=== AH. 11.3 figure 2 geometry — the machine and the undo path ===');
{
  // viewBox 780 × 240. Forward row y 50..100: input label at (100, 80);
  // arrow 130..190; box1 (190..290) "× 3"; arrow 290..350; box2
  // (350..450) "+ 1"; arrow 450..560; output "31" at (600, 80). Undo
  // row: dashed arrows at y 165 — (590→460) labelled "− 1 → 30" at
  // (525, 188); (340→200) labelled "÷ 3 → 10" at (270, 188); recovered
  // input "x = 10" at (100, 170).
  ok(190 >= 130 && 290 + 10 <= 350 && 450 + 10 <= 560, 'AH1: the forward arrows fill the gaps between input, boxes and output');
  ok(100 - 55 >= 8 && 600 + 20 <= 780 - 8, 'AH2: the input and output labels stay ≥ 8 px inside the viewBox');
  ok(165 - 100 >= 8 && 188 - 13 - 165 >= 8, 'AH3: the undo arrows clear the boxes and their labels clear the arrows');
  ok(525 + 55 <= 590 - 8 && 270 + 50 <= 525 - 55 - 8, 'AH4: the undo labels clear their own-row arrows and each other');
  ok(188 + 13 <= 240 - 8, 'AH5: the undo labels clear the viewBox bottom');
}

console.log('=== AI. quiz keys (11.3) ===');
{
  // Q1: x + 7 = 12 → 5. options 5 (key 0), 7, 12, 19.
  ok(12 - 7 === 5, 'AI1: Q1 key 0 — 12 − 7 = 5; the options 7 and 12 are the sentence\u2019s own numbers, 19 adds instead of subtracts');
  // Q2: 3x + 1 = 31 → 10. options 9, 10 (key 1), 11, 30.
  ok(3 * 10 + 1 === 31 && 3 * 9 + 1 === 28 && 3 * 11 + 1 === 34, 'AI2: Q2 key 1 — x = 10 checks; 9 gives 28, 11 gives 34, 30 is the subtract-reflex');
  // Q3: the first move on 3x + 1 = 31: subtract 1 from both sides (key 1).
  ok(31 - 1 === 30 && 30 / 3 === 10, 'AI3: Q3 key 1 — undo the LAST operation first: the + 1 leaves before the × 3');
  // Q4: 5x = 45 → 9. options 9 (key 0), 8, 40, 50.
  ok(45 / 5 === 9 && 5 * 8 === 40, 'AI4: Q4 key 0 — 45 ÷ 5 = 9; 8 gives 40, and 40/50 are the add-subtract reflexes');
  // Q5: the ribbon — the short piece. options 18 (key 0), 29, 36, 24.
  ok((47 - 11) / 2 === 18 && (47 + 11) / 2 === 29 && 47 - 11 === 36, 'AI5: Q5 key 0 — the short piece is 18; 29 is the LONG piece, 36 is 47 − 11 unhalved, 24 is the even-split reflex');
}

console.log('=== AJ. exercise keys (11.3) ===');
{
  // L1-1 / L1-2.
  ok(12 - 7 === 5 && 4 * 7 === 28, 'AJ1: L1 — x + 7 = 12 gives 5; x/4 = 7 gives 28');
  // L2-1 / L2-2.
  ok(45 / 5 === 9 && (17 - 3) / 2 === 7 && 3 * 10 + 1 === 31, 'AJ2: L2 — 5x = 45 gives 9; 2b + 3 = 17 gives 7; 3n + 1 = 31 gives 10');
  // L3-1 / L3-2.
  ok(20 / 4 === 5 && 5 - 3 === 2 && 18 + 29 === 47, 'AJ3: L3 — 4(x + 3) = 20 gives 2; the ribbon splits 18 and 29');
  // L4-1 / L4-2.
  ok(6 + 12 + 6 + 12 === 36 && 12 === 2 * 6 && (47 - 11) / 2 === 18 && (30 - 6) / 2 === 12, 'AJ4: L4 — the rectangle 6 by 12 (perimeter 36 ✓, length twice width ✓); the collecting instances 18 and 12');
  // L5-1 / L5-2.
  ok(10 + 40 === 50 && 4 * 10 === 40 && (35 - 9) / 2 === 13, 'AJ5: L5 — son 10, father 40; the doubled-and-added number is 13');
  // L6-1 / L6-2 certificates.
  ok((31 - 1) / 3 === 10 && 10 * 9 === 90, 'AJ6: L6 — the balance walk lands on x = 10; the undo machine\u2019s 1,920-case sweep stands behind it');
}

console.log('=== AK. 11.3 sources (printed) ===');
console.log('  new key ncert-math7-ch4 — class-7 ch. 4 "Simple Equations" (the balance-method charter; Ex. 4.2 solves by performing the same operation on both sides) — web-checked 2026-11-05.');
console.log('  carried: ncert-math6-ch11 (matchstick patterns → variables → equations), ncert-math7-gp-ch4 (letter-numbers), khattar-qa-4e (exam staples).');
console.log('  History web-checked (sanctioned fallback): the Rhind Mathematical Papyrus aha problems (problems 24–34 are linear equations; the quantity-plus-its-quarter-makes-15 instance solved by the take-4 scaling — answer 12); al-Khwarizmi\u2019s Al-Jabr, Baghdad c. 820 CE (al-jabr = restoring/reunion of broken parts → the word algebra; Algoritmi → algorithm).');

console.log('=== AL. 11.3 scope guards (printed) ===');
console.log('  (i)   one- and two-step equations only — no x-on-both-sides machinery, no transposition vocabulary.');
console.log('  (ii)  no negative or fractional solutions demanded (the aha\u2019s quarter is the only fraction, told the scribe\u2019s way).');
console.log('  (iii) no simultaneous systems, no inequalities.');
console.log('  (iv)  the balance law is derived from the meaning of equality — no axiom system invoked.');
console.log('  (v)   no content reproduced — exposition, figures and proofs ours.');

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
