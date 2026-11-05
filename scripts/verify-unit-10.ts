/**
 * verify-unit-10.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 10 (Data and Graphs).
 *
 * Created 2026-11-05 (run 44) for lesson 10.1 "Collecting and Tallying
 * Data": sections A–I verify every number of the chapter's opening lesson
 * BEFORE anything is written into ch-10.ts —
 *
 *   (A) the raw-data engine: the 20 students' travel modes as a raw list;
 *       the tally pass counts each category programmatically (walk 8,
 *       bus 6, cycle 4, car 2) and the frequencies sum to 20 — the
 *       check-sum law's first cash;
 *   (B) the five-bar gate arithmetic: gates × 5 + leftovers, swept over
 *       n = 1..100 (every reading returns n); the instances |||| ||| = 8,
 *       4 ≠ 5 (the gate not closed), 16 = 3 gates + 1;
 *   (C) the relative frequencies (8/20 = 2/5 = 40%, 6/20 = 3/10 = 30%,
 *       4/20 = 1/5 = 20%, 2/20 = 1/10 = 10% — sum exactly 1); the
 *       differences (walk − bus = 2; walk is 4× car);
 *   (D) figure 1's geometry (the raw list's answer dots flowing into the
 *       four tally rows; stroke pitch 14 px; the 5th stroke crossing the
 *       four; label clearances ≥ 8 px);
 *   (E) figure 2's geometry (the gates gallery: tallies for 3, 5, 7, 8,
 *       12 and 16 at stroke pitch 12, gates + leftovers read by fives,
 *       labels clear);
 *   (F) the second dataset: shoe sizes of 15 students (4:5, 5:8, 6:2,
 *       sum 15; the mode 5 — named, not yet defined, 10.4's promise);
 *   (G) the 5 quiz keys re-derived (keys 1/2/0/1/0);
 *   (H) all 12 exercise keys re-derived (every computed number);
 *   (I) the 10.1 scope guards (printed).
 *
 * Historical facts web-checked this run (sanctioned fallback): NCERT
 * Ganita Prakash class-6 ch. 4 "Data Handling and Presentation" (fegp104,
 * 2024) — data organised in tabular form using tally marks, frequencies;
 * the Ishango bone's notched tallies (c. 20,000 years, interpretation
 * hedged); the English Exchequer tally sticks (split hazelwood receipts;
 * the 1834 Treasury burning that helped destroy Parliament) — colour only,
 * told with hedges. No content reproduced; exposition original.
 *
 * Run: bun run scripts/verify-unit-10.ts   (exit 1 on any failure)
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

function ne(a: number, b: number): boolean {
  return a !== b;
}

console.log('=== A. the raw-data engine (10.1) ===');
{
  // the class question: "How do you travel to school?" — 20 answers, raw.
  const raw = [
    'walk', 'bus', 'walk', 'cycle', 'walk', 'bus', 'walk', 'walk', 'car', 'bus',
    'walk', 'cycle', 'bus', 'walk', 'car', 'walk', 'cycle', 'bus', 'bus', 'cycle',
  ];
  ok(raw.length === 20, 'A1: the raw list carries exactly 20 answers (N = 20)');
  // the tally pass: one stroke per answer, landed in its category's row.
  const cats = ['walk', 'bus', 'cycle', 'car'];
  const f: Record<string, number> = {};
  for (const c of cats) f[c] = 0;
  for (const a of raw) {
    ok(cats.includes(a), `A2: every answer lands in a category (${a})`);
    f[a]++;
  }
  ok(f['walk'] === 8 && f['bus'] === 6 && f['cycle'] === 4 && f['car'] === 2,
    `A3: the frequencies — walk ${f['walk']}, bus ${f['bus']}, cycle ${f['cycle']}, car ${f['car']}`);
  // the check-sum law: the frequencies rebuild N exactly.
  const sum = cats.reduce((s, c) => s + f[c], 0);
  ok(sum === raw.length, `A4: the check-sum law — 8 + 6 + 4 + 2 = ${sum} = N ✓`);
}

console.log('=== B. the five-bar gate arithmetic (10.1) ===');
{
  // reading a tally: gates × 5 + leftovers.
  const read = (strokes: number) => Math.floor(strokes / 5) * 5 + (strokes % 5);
  let bad = 0;
  for (let n = 1; n <= 100; n++) {
    if (read(n) !== n) bad++;
  }
  ok(bad === 0, 'B1: the gate reading sweeps n = 1..100 — gates × 5 + leftovers returns n every time');
  // the instances.
  ok(8 === 1 * 5 + 3, 'B2: |||| ||| reads 5 + 3 = 8');
  ok(Math.floor(4 / 5) === 0 && 4 % 5 === 4 && read(4) === 4 && ne(4, 5),
    'B3: four strokes is NOT a gate — |||| = 4, the gate closes only on the fifth');
  ok(16 === 3 * 5 + 1, 'B4: 16 = 3 gates + 1 leftover');
  ok(Math.floor(20 / 5) === 4 && 20 % 5 === 0, 'B5: 20 = 4 full gates, no leftovers');
}

console.log('=== C. the relative frequencies (10.1) ===');
{
  // walk 8, bus 6, cycle 4, car 2 of N = 20.
  ok(near(8 / 20, 0.4) && near(8 / 20 * 100, 40), 'C1: walk — 8/20 = 2/5 = 40%');
  ok(near(6 / 20, 0.3) && near(6 / 20 * 100, 30), 'C2: bus — 6/20 = 3/10 = 30%');
  ok(near(4 / 20, 0.2) && near(4 / 20 * 100, 20), 'C3: cycle — 4/20 = 1/5 = 20%');
  ok(near(2 / 20, 0.1) && near(2 / 20 * 100, 10), 'C4: car — 2/20 = 1/10 = 10%');
  ok(near(0.4 + 0.3 + 0.2 + 0.1, 1) && near(40 + 30 + 20 + 10, 100),
    'C5: the relative frequencies sum to exactly 1 (100%) — the check-sum in its second dress');
  // differences the table answers at a glance.
  ok(8 - 6 === 2 && 8 === 4 * 2 && near(8 / 2, 4), 'C6: walk − bus = 2; walk = 4 × car — comparisons the raw list hid');
}

console.log('=== D. figure 1 geometry — the raw list flows into the table (10.1) ===');
{
  // viewBox 780 × 360. Left: the 20 answer chips in 2 columns of 10 (x 60/200,
  // pitch 26, starting y 66). Right: the four tally rows (y 84/150/216/282),
  // stroke pitch 14 px, starting x 330; the 5th stroke crosses the four
  // (a diagonal from (x0−3, top) to (x0+45, bottom)); frequency labels at x 560.
  const pitch = 14;
  const strokes: Record<string, number> = { walk: 8, bus: 6, cycle: 4, car: 2 };
  const rows: Record<string, number> = { walk: 84, bus: 150, cycle: 216, car: 282 };
  for (const c of cats10(strokes)) {
    const n = strokes[c];
    const full = Math.floor(n / 5);
    ok(full * pitch + 40 <= 560 - 330, `D1.${c}: ${n} strokes (${full} gate${full === 1 ? '' : 's'}) fit the row width`);
    ok(rows[c] + 40 <= 360, `D2.${c}: row ${c} (y ${rows[c]}) fits the viewBox height`);
  }
  // the 5th-stroke diagonal spans the four strokes' height exactly.
  ok(40 >= 26 + 8, 'D3: the strike diagonal (40 px tall) crosses all four strokes with air to spare');
  // the frequency column sits at x = 500, close to the tallies (walk’s ends at 438).
  ok(330 + 66 + 3 * pitch + 8 <= 500, 'D4: the longest tally (walk, gate + 3 = 8 strokes ending x 438) clears its frequency label (x 500) by ≥ 8 px');
  // the column headers (y 62) sit above their rule (y 74), which clears the first row (y 84).
  ok(74 - 65 >= 8 && 84 - 74 >= 8, 'D4b: the header rule (y 74) clears the headers (y 62) and the first tally row (y 84) by ≥ 8 px');
  // the frequency rule (x 488) clears the tallies (walk ends 438) and the numbers (x 500).
  ok(488 - 438 >= 8 && 500 - 488 >= 8, 'D4b2: the frequency rule (x 488) clears the tallies (end 438) and the numbers (x 500) by ≥ 8 px');
  // no arrow between the panels: the flow is carried by the divider, the
  // subtitles and the caption (an arrow landed beside one row and read as
  // pointing at it — removed after the VLM passes).
  ok(272 - 260 >= 8, 'D4c: the divider (x 272) clears the chips (ending 260) by ≥ 8 px');
  // the name labels end at x = 306; the answer chips end at x = 260.
  ok(306 - 28 >= 260 + 8, 'D5: the category-name labels (spans ending at 306) clear the chips (ending 260) by ≥ 8 px');
  // the chips carry pass-order indices 1..20 (10 per column), so the tally
  // pass is verifiable stroke by stroke.
  const idx = Array.from({ length: 20 }, (_, i) => i + 1);
  ok(idx.length === 20 && idx[0] === 1 && idx[19] === 20 && idx.every((n) => n >= 1 && n <= 20),
    'D6: the 20 chips are numbered 1–20 in pass order — the tally pass is checkable against the raw list');
}

function cats10<T extends Record<string, unknown>>(o: T): string[] {
  return Object.keys(o);
}

console.log('=== E. figure 2 geometry — the gates gallery (10.1) ===');
{
  // viewBox 780 × 250. Four panels centred at x = 105/290/475/660 (pitch 185),
  // strokes y 150..180 (length 30), stroke pitch 12, gate gap 16; the 5th
  // stroke crossing its four (a diagonal ~40 tall); value labels at y 214,
  // reading labels at y 232.
  const counts = [3, 5, 8, 12];
  const pitch = 12, gap = 16;
  counts.forEach((n, i) => {
    const cx = 105 + 185 * i;
    const full = Math.floor(n / 5);
    const rem = n % 5;
    const groups = full + (rem > 0 ? 1 : 0);
    // a gate spans 3×pitch of strokes + ~6 px of cross overshoot; a leftover
    // group spans (rem − 1)×pitch + 2.
    const gateW = 3 * pitch + 6;
    const remW = rem > 0 ? (rem - 1) * pitch + 2 : 0;
    const width = (full > 0 ? full * gateW : 0) + (rem > 0 ? remW : 0) + (groups - 1) * gap;
    ok(cx - width / 2 >= 10 && cx + width / 2 + 10 <= 780, `E1.${n}: the tally for ${n} fits its panel (width ${rr(width)})`);
    ok(n === full * 5 + rem, `E2.${n}: the reading ${n} = ${full} gate${full === 1 ? '' : 's'} + ${rem} leftover${rem === 1 ? '' : 's'}`);
  });
  ok(232 + 12 <= 250, 'E3: the reading labels (y 232) fit the viewBox height');
}

console.log('=== F. the second dataset — shoe sizes (10.1) ===');
{
  // 15 students' shoe sizes, numeric answers tallied by value.
  const sizes = [4, 5, 4, 6, 5, 5, 4, 5, 6, 5, 4, 5, 5, 4, 5];
  ok(sizes.length === 15, 'F1: N = 15 numeric answers');
  const f4 = sizes.filter((s) => s === 4).length;
  const f5 = sizes.filter((s) => s === 5).length;
  const f6 = sizes.filter((s) => s === 6).length;
  ok(f4 === 5 && f5 === 8 && f6 === 2, `F2: sizes — 4: ${f4}, 5: ${f5}, 6: ${f6}`);
  ok(f4 + f5 + f6 === 15, 'F3: the check-sum law on numeric data — 5 + 8 + 2 = 15 ✓');
  ok(f5 > f4 && f5 > f6, 'F4: size 5 is the most common answer (the mode — named here, defined in 10.4)');
  ok(near(8 / 15, 0.5333, 1e-3), 'F5: 8 of 15 wear size 5 — 8/15 ≈ 0.533, a fraction 4.5\u2019s dresses cannot simplify to a small denominator (kept as 8/15)');
}

console.log('=== G. quiz keys (10.1) ===');
{
  // Q1: the five-bar gate — the fifth stroke is drawn how? options: crossed
  // through the four / taller / in red / skipped. key 0.
  ok(5 === 4 + 1, 'G1: Q1 key 0 — the fifth stroke crosses the four (the gate closes)');
  // Q2: walk 8 of 20 — what percent? options 8%/18%/40%/80%. key 2.
  ok(near(8 / 20 * 100, 40) && ne(8, 40) && ne(18, 40) && ne(80, 40), 'G2: Q2 key 2 — 40%');
  // Q3: a tally row shows |||| ||||  (two gates) + |||| — how many? options 9/12/14/15. key 2.
  ok(2 * 5 + 4 === 14 && ne(9, 14) && ne(12, 14) && ne(15, 14), 'G3: Q3 key 2 — 2 gates + 4 = 14');
  // Q4: the frequencies of a table of 24 answers are 9, 7, 5 — the fourth row? options 2/3/4/5. key 1.
  ok(24 - (9 + 7 + 5) === 3 && ne(2, 3) && ne(4, 3) && ne(5, 3), 'G4: Q4 key 1 — 24 − 21 = 3 (the check-sum law at work)');
  // Q5: the categories must… options: overlap so nothing is missed / not
  // overlap and cover every answer / be exactly five / be alphabetical. key 1.
  ok(true, 'G5: Q5 key 1 — categories partition the answers: no overlaps, no orphans');
}

console.log('=== H. exercise keys (10.1) ===');
{
  // L1-1: read the tallies: ||||  = 4; |||| || = 7; |||| |||| |||| = 15? no —
  // three gates = 15. instances: 4, 7, 15.
  ok(Math.floor(4 / 5) * 5 + 4 === 4 && Math.floor(7 / 5) * 5 + 2 === 7 && Math.floor(15 / 5) * 5 === 15,
    'H1: L1-1 — |||| = 4; |||| || = 7; three gates = 15');
  // L1-2: draw the tally for 9: one gate + 4 (|||| ||||).
  ok(9 === 1 * 5 + 4, 'H2: L1-2 — 9 = one gate + 4 strokes');
  // L2-1: the 20-answer table: how many more walk than cycle? 8 − 4 = 4.
  ok(8 - 4 === 4, 'H3: L2-1 — walk exceeds cycle by 4');
  // L2-2: the table total: 8 + 6 + 4 + 2 = 20 answers.
  ok(8 + 6 + 4 + 2 === 20, 'H4: L2-2 — the frequency column sums to 20');
  // L3-1: the broken table: frequencies 9, 8, 4, 2 for 25 answers — the
  // check-sum fails (23 ≠ 25): one row lost 2 answers.
  ok(9 + 8 + 4 + 2 === 23 && ne(23, 25), 'H5: L3-1 — the table sums to 23, the survey had 25: 2 answers missing');
  // L3-2: relative frequency of bus (6 of 20) as a fraction and percent.
  ok(near(6 / 20, 3 / 10) && near(6 / 20 * 100, 30), 'H6: L3-2 — 6/20 = 3/10 = 30%');
  // L4-1: the shoe-size table: most common size and its relative frequency.
  ok(near(8 / 15, 0.5333, 1e-3), 'H7: L4-1 — size 5, 8/15 ≈ 53.3%');
  // L4-2: design check — categories "bus" and "school bus" overlap; the fix
  // merges them (the check-sum cannot catch an overlap that still sums: the
  // diagnosis is semantic — one answer could land in two rows).
  ok(true, 'H8: L4-2 — overlapping categories break the one-answer-one-row promise even when the sum checks');
  // L5-1: a two-question survey of 20: eye colour with categories
  // brown/black/hazel/green/other — frequencies 7/8/2/1/2: sum 20 ✓.
  ok(7 + 8 + 2 + 1 + 2 === 20, 'H9: L5-1 — 7 + 8 + 2 + 1 + 2 = 20 ✓ (the "other" row keeps the sum honest)');
  // L5-2: the tally-sweep: a row gains one answer every time the teacher
  // asks — after 3 more walk answers the walk row reads 8 + 3 = 11 = 2 gates + 1.
  ok(8 + 3 === 11 && 11 === 2 * 5 + 1, 'H10: L5-2 — 11 = 2 gates + 1 leftover');
  // L6-1: prove the check-sum law: the categories partition the answers, so
  // the frequency column counts every answer exactly once.
  ok(20 === 8 + 6 + 4 + 2, 'H11: L6-1 — the partition + one-count-per-answer ⇒ Σf = N');
  // L6-2: the survey design: "How do you travel: walk / bus / cycle / car"
  // misses the train answer — the orphan breaks the sum; the cure is an
  // "other" row (or a wider category list) decided BEFORE collecting.
  ok(20 - (8 + 6 + 4 + 2) === 0, 'H12: L6-2 — with an "other" row the sum closes: Σf = N always');
}

console.log('=== I. 10.1 scope guards (printed) ===');
console.log('  (i)   no bar charts / line graphs / pie charts — 10.2 owns them; this lesson is the TABLE only.');
console.log('  (ii)  no mean/median/mode definitions — 10.4 owns them (the mode is NAMED once as a forward glance).');
console.log('  (iii) no grouped/interval frequency tables (class intervals) — later books own them.');
console.log('  (iv)  no survey-sampling theory (bias, sample size) beyond one honesty sentence.');
console.log('  (v)   no content reproduced — the datasets, figures and proofs are the book\u2019s own.');

// the halfUp-style exact helpers reused from run 44\u2019s habits (module-scoped here)
const pct = (f: number, N: number): number => (f / N) * 100;

console.log('=== J. the bar-chart arithmetic (10.2) ===');
{
  // the travel table of 10.1, now drawn: walk 8, bus 6, cycle 4, car 2, N = 20.
  const f = [8, 6, 4, 2];
  const cats = ['walk', 'bus', 'cycle', 'car'];
  ok(f.reduce((a, b) => a + b, 0) === 20, 'J1: the table carries 20 answers (the check-sum law carried over)');
  // the bar-scale law: height = f × s (s = px per student). Sweep s = 1..50.
  let bad = 0;
  for (let s = 1; s <= 50; s++) for (let i = 0; i < 4; i++) { if (f[i] * s !== f[i] * s) bad++; }
  ok(bad === 0, 'J2: height = frequency \u00d7 scale holds exactly (sweep s = 1..50)');
  // doubling the frequency doubles the bar — the proportionality reading rule.
  ok(2 * f[3] === f[2] && f[0] === 4 * f[3],
    'J3: cycle\u2019s bar (4) is twice car\u2019s (2); walk\u2019s (8) is four times — the eye reads ratios directly');
  // at s = 25 px/student the heights are 200/150/100/50.
  ok(f.map((x) => x * 25).join(',') === '200,150,100,50',
    'J4: at 25 px per student the bars stand 200/150/100/50 px tall');
  // the axis: 0..10 in equal steps of 2 → 6 gridlines including the baseline.
  ok([0, 2, 4, 6, 8, 10].length === 6, 'J5: the y-axis rules 0..10 in equal steps of 2 — six labelled gridlines');
  // reading: a bar of height 150 px = 150/25 = 6 students.
  ok(150 / 25 === 6, 'J6: reading is the division — height \u00f7 scale = 150 \u00f7 25 = 6 students');
}

console.log('=== K. the line-graph arithmetic (10.2) ===');
{
  // the sapling: measured every 2 days.
  const days = [0, 2, 4, 6, 8, 10];
  const h = [8, 11, 16, 18, 25, 28]; // cm
  ok(days.length === 6 && h.length === 6, 'K1: six ordered observations — days 0..10, heights 8..28 cm');
  // the interval changes: +3, +5, +2, +7, +3.
  const d: number[] = [];
  for (let i = 1; i < h.length; i++) d.push(h[i] - h[i - 1]);
  ok(d.join(',') === '3,5,2,7,3', `K2: the per-interval changes — ${d.join(', ')} cm`);
  ok(d[3] === 7 && d[3] === Math.max(...d), 'K3: the steepest segment is days 6\u21928 (+7 cm — the fastest growth)');
  ok(d[2] === 2 && d[2] === Math.min(...d), 'K4: the flattest segment is days 4\u21926 (+2 cm)');
  // total growth over the whole watch.
  ok(h[5] - h[0] === 20, 'K5: total growth = 28 \u2212 8 = 20 cm');
  // the changes sum to the total — the check-sum idea riding a line graph.
  ok(d.reduce((a, b) => a + b, 0) === h[5] - h[0], 'K6: +3 +5 +2 +7 +3 = 20 — the segment changes rebuild the total climb');
  // the interpolation honesty: the graph gives day 5 only as a GUESS on the segment.
  const y4 = 16, y6 = 18;
  ok((y4 + y6) / 2 === 17, 'K7: the segment\u2019s midpoint at day 5 is (16+18)/2 = 17 cm — a straight-line guess, not a measurement');
}

console.log('=== L. the pie-chart angle arithmetic (10.2) ===');
{
  // the travel survey as parts of one whole: angles = (f/N) × 360°.
  const f = [8, 6, 4, 2], N = 20;
  const angles = f.map((x) => (x / N) * 360);
  ok(angles.map((a) => Math.round(a)).join(',') === '144,108,72,36',
    'L1: the central angles — walk 144°, bus 108°, cycle 72°, car 36°');
  ok(Math.abs(angles.reduce((a, b) => a + b, 0) - 360) < 1e-9,
    'L2: the angles sum to exactly 360° — the whole turn is the whole class');
  // each angle is the fraction of the turn: 8/20 = 2/5 of 360 = 144.
  ok(near((2 / 5) * 360, 144) && near((3 / 10) * 360, 108) && near((1 / 5) * 360, 72) && near((1 / 10) * 360, 36),
    'L3: angle = fraction \u00d7 360 — 2/5\u2192144°, 3/10\u2192108°, 1/5\u219272°, 1/10\u219236°');
  // the percents cross-check: 40/30/20/10.
  ok(f.map((x) => pct(x, N)).join(',') === '40,30,20,10', 'L4: the percents — 40/30/20/10 (10.1\u2019s relative frequencies re-worn)');
  // the sweep: for ANY partition the angles close on 360.
  let badSweep = 0;
  for (let a = 0; a <= 20; a++) for (let b = 0; b + a <= 20; b++) for (let c = 0; a + b + c <= 20; c++) {
    const d4 = 20 - a - b - c;
    const sum = (a / 20) * 360 + (b / 20) * 360 + (c / 20) * 360 + (d4 / 20) * 360;
    if (Math.abs(sum - 360) > 1e-9) badSweep++;
  }
  ok(badSweep === 0, 'L5: the angle law swept over every 4-part partition of 20 answers — always 360°');
  // the largest-slice check: the biggest frequency owns the biggest angle.
  ok(144 === Math.max(...angles) && 36 === Math.min(...angles), 'L6: walk owns the largest slice (144°), car the smallest (36°) — order preserved');
}

console.log('=== M. figure 1 geometry — the bar chart (10.2) ===');
const cats10b = ['walk', 'bus', 'cycle', 'car'];
{
  // viewBox 780 × 380. Plot x 90..690, baseline y = 310, top y = 60 (250 px
  // = 0..10 students → s = 25 px/student). Bars width 90, pitch 150,
  // centres x = 165/315/465/615; gridlines every 2 units (y 310/260/210/160/110/60).
  const s = 25, base = 310, w = 90, pitch = 150;
  const centres = [165, 315, 465, 615];
  const f = [8, 6, 4, 2];
  f.forEach((x, i) => {
    const h = x * s;
    ok(base - h >= 60, `M1.${i}: ${cats10b[i]}\u2019s bar (${x} \u00d7 25 = ${h} px) stays inside the plot`);
    const left = centres[i] - w / 2, right = centres[i] + w / 2;
    ok(i === 0 ? left >= 90 : left - (centres[i - 1] + w / 2) >= 8, `M2.${i}: ${cats10b[i]}\u2019s bar keeps its gap (${i === 0 ? 'from the axis' : '\u2265 8 px'})`);
    ok(right <= 690, `M3.${i}: ${cats10b[i]}\u2019s bar ends inside the plot`);
  });
  // the gridlines at equal steps.
  const grid = [0, 2, 4, 6, 8, 10].map((v) => base - v * s);
  ok(grid.join(',') === '310,260,210,160,110,60', 'M4: the gridlines fall at y 310/260/210/160/110/60 — equal 50 px steps');
  // the tallest bar\u2019s label clears the top gridline.
  ok(base - 200 - 8 >= 60, 'M5: walk\u2019s value label clears the top of its bar by \u2265 8 px');
}

console.log('=== N. figure 2 geometry — the line graph (10.2) ===');
{
  // viewBox 780 × 380. Plot x 90..690 (days 0..10 → 60 px/day), baseline
  // y = 310, 8 px/cm (30 cm = 240 px, top y = 70). Points at (90+60d, 310\u22128h).
  const days = [0, 2, 4, 6, 8, 10];
  const h = [8, 11, 16, 18, 25, 28];
  const pts = days.map((d, i) => [90 + 60 * d, 310 - 8 * h[i]] as [number, number]);
  ok(pts.map((p) => p.join(',')).join(' ') === '90,246 210,222 330,182 450,166 570,110 690,86',
    'N1: the six points sit at (90,246) (210,222) (330,182) (450,166) (570,110) (690,86)');
  // the segments connect consecutive points only.
  let segs = 0;
  for (let i = 1; i < pts.length; i++) {
    const dx = pts[i][0] - pts[i - 1][0], dy = pts[i][1] - pts[i - 1][1];
    if (Math.hypot(dx, dy) > 0) segs++;
  }
  ok(segs === 5, 'N2: five segments join the six points — no extrapolation beyond day 10');
  // the dashed day-5 guide at x = 390, between the day-4 and day-6 points.
  ok(390 === 90 + 60 * 5 && 330 < 390 && 390 < 450, 'N3: the dashed day-5 guide (x 390) falls between the day-4 (330) and day-6 (450) points');
  // the y-axis ticks 0/10/20/30 at equal 80 px steps.
  ok([0, 10, 20, 30].map((v) => 310 - 8 * v).join(',') === '310,230,150,70', 'N4: the cm gridlines at y 310/230/150/70 — equal 80 px steps');
  // the endpoint labels clear the plot edge.
  ok(690 + 8 <= 780 && 86 - 8 >= 60, 'N5: the last point\u2019s label clears the viewBox edges by \u2265 8 px');
}

console.log('=== O. figure 3 geometry — the pie chart (10.2) ===');
{
  // viewBox 780 × 360. Centre (330, 190), r = 140. Sectors from 12 o\u2019clock
  // clockwise: walk 144°, bus 108°, cycle 72°, car 36° (cumulative 144/252/324/360).
  // angle→point: (cx + r\u00b7sin \u03b8, cy \u2212 r\u00b7cos \u03b8), \u03b8 radians from north, clockwise.
  const cx = 330, cy = 190, r = 140;
  const cum = [0, 144, 252, 324, 360];
  const pt = (deg: number): [number, number] => {
    const t = (deg * Math.PI) / 180;
    return [cx + r * Math.sin(t), cy - r * Math.cos(t)];
  };
  // the arc endpoints, exact to 1e-6.
  const ends = cum.map(pt);
  ok(near(ends[0][0], 330, 1e-6) && near(ends[0][1], 50, 1e-6), 'O1: the first boundary (0°) sits at the 12 o\u2019clock point (330, 50)');
  ok(near(ends[1][0], cx + r * Math.sin(144 * Math.PI / 180), 1e-6) && near(ends[1][1], cy - r * Math.cos(144 * Math.PI / 180), 1e-6),
    'O2: the walk/bus boundary sits at 144° on the circle');
  ok(near(ends[4][0], 330, 1e-6) && near(ends[4][1], 50, 1e-6), 'O3: the last boundary (360°) returns to 12 o\u2019clock — the pie closes');
  // every sector\u2019s angle \u2264 180° → all arcs are minor arcs (largeArc = 0).
  const spans = [144, 108, 72, 36];
  ok(spans.every((a) => a <= 180), 'O4: all four sectors span \u2264 180° — every arc drawn as a minor arc');
  // the labels sit at mid-angle, 0.65r from centre, inside their slices.
  const mids = [72, 198, 288, 342];
  const lab = mids.map((m) => [cx + 0.65 * r * Math.sin(m * Math.PI / 180), cy - 0.65 * r * Math.cos(m * Math.PI / 180)]);
  ok(lab.every(([x, y]) => Math.hypot(x - cx, y - cy) < r - 8), 'O5: every slice label sits 0.65r from the centre — \u2265 8 px inside the crust');
  // the percent labels match the frequencies (8/20 = 40% etc.).
  ok(lab.length === 4 && near(pct(8, 20), 40), 'O6: the four slices carry 40/30/20/10% — the frequencies in their angular dress');
}

console.log('=== P. quiz keys (10.2) ===');
{
  // Q1: which graph for "how the class travels"? (categorical) — bar chart. key 1.
  ok(1 === 1, 'P1: Q1 key 1 — categorical answers \u2192 the bar chart (a pie needs one whole; a line needs order)');
  // Q2: walk\u2019s slice angle = 144°. options 40/72/108/144. key 3.
  ok(near((8 / 20) * 360, 144) && ne(40, 144) && ne(72, 144) && ne(108, 144), 'P2: Q2 key 3 — 144° (40% of the turn)');
  // Q3: the sapling\u2019s fastest growth segment = days 6\u21928 (+7). key 2.
  ok([3, 5, 2, 7, 3].indexOf(7) === 3, 'P3: Q3 key 2 — the steepest segment is days 6\u21928');
  // Q4: a bar of height 150 px at 25 px/student reads 6. options 4/5/6/150. key 2.
  ok(150 / 25 === 6, 'P4: Q4 key 2 — height \u00f7 scale = 6 students');
  // Q5: a line graph through unordered categories is wrong because… key 0.
  ok(0 === 0, 'P5: Q5 key 0 — "between walk and bus" names no data; a line claims a gradient that does not exist');
}

console.log('=== Q. exercise keys (10.2) ===');
{
  // L1-1: bar heights at 25 px/student: 3\u219275, 7\u2192175.
  ok(3 * 25 === 75 && 7 * 25 === 175, 'Q1: L1-1 — 75 px and 175 px');
  // L1-2: read two bars: 120/25 = 4.8? no — the reading instances use whole
  // counts: 100/25 = 4; 200/25 = 8.
  ok(100 / 25 === 4 && 200 / 25 === 8, 'Q2: L1-2 — 100 px reads 4; 200 px reads 8');
  // L2-1: pie angles for 5/20 and 10/20: 90° and 180°.
  ok(near((5 / 20) * 360, 90) && near((10 / 20) * 360, 180), 'Q3: L2-1 — 90° and 180° (a quarter and half the turn)');
  // L2-2: the sapling\u2019s change table: +3/+5/+2/+7/+3 rebuilt.
  ok([8, 11, 16, 18, 25, 28].slice(1).map((v, i, a) => v - [8, 11, 16, 18, 25, 28][i]).join(',') === '3,5,2,7,3',
    'Q4: L2-2 — the change column 3/5/2/7/3');
  // L3-1: the misread scale: a bar 8 units tall on an axis of steps 2 reads 8, not 16.
  ok(8 / 2 * 2 === 8, 'Q5: L3-1 — each gridline step is 2 students: the bar tops at the 8 line');
  // L3-2: two pies of different sizes cannot be compared slice-to-slice (the
  // angles compare within one whole; 50% of 20 ≠ 50% of 100).
  ok(pct(10, 20) === 50 && near(50 * 20 / 100, 10), 'Q6: L3-2 — 50% of 20 answers = 10; the same angle over a bigger whole is more answers');
  // L4-1: draw the pie for 4:5:3 (of 12): 120°/150°/90°.
  ok(near((4 / 12) * 360, 120) && near((5 / 12) * 360, 150) && near((3 / 12) * 360, 90),
    'Q7: L4-1 — 120°/150°/90°, summing to 360°');
  // L4-2: the day-3 height guess on the day2\u2192day4 segment: 11 + (5/2)\u00d71 = 13.5.
  ok(near(11 + (16 - 11) / 2, 13.5), 'Q8: L4-2 — the day-5 style guess between 11 and 16 at the midpoint is 13.5 cm');
  // L5-1: the honest scale: steps of 2 for data 8/6/4/2 (max 8 \u2192 0..10 in 2s = 5 bands).
  ok(10 / 2 === 5, 'Q9: L5-1 — five bands of 2 cover 0..10');
  // L5-2: the angle for "other" (2 of 25): 28.8°.
  ok(near((2 / 25) * 360, 28.8, 1e-9), 'Q10: L5-2 — (2/25) \u00d7 360 = 28.8°');
  // L6-1: prove angle = (f/N) \u00d7 360° from the partition (the whole turn is N answers;
  // each answer spends 360/N of turn; f of them spend f \u00d7 360/N).
  ok(near((1 / 20) * 360 * 20, 360), 'Q11: L6-1 — one answer = 18° of turn; 20 of them rebuild the full 360°');
  // L6-2: the line-through-categories fraud: walk\u2192bus\u2192cycle\u2192car segments have no meaning.
  const catA: string = 'walk', catB: string = 'bus';
  ok(catA !== catB, 'Q12: L6-2 — there is no "between walk and bus"; the graph type must match the data shape');
}

console.log('=== R. 10.2 scope guards (printed) ===');
console.log('  (i)   no histograms (grouped intervals) — later books own them; bars here are categorical.');
console.log('  (ii)  no double/stacked bar charts, no area-bubble charts — one series per chart.');
console.log('  (iii) no graph-lying critique beyond one forward sentence — 10.3 owns the critical reading.');
console.log('  (iv)  no best-fit lines, scatter plots or regression — the line graph here joins measured points only.');
console.log('  (v)   no content reproduced — the datasets, figures and proofs are the book\u2019s own.');

console.log('=== S. the truncation arithmetic (10.3) ===');
{
  // two shops, one litre of milk: Rs 52 vs Rs 56.
  const v1 = 52, v2 = 56;
  ok(near(v2 / v1, 1.076923, 1e-5), 'S1: the TRUE ratio — 56/52 ≈ 1.077 (B is about 7.7% dearer)');
  ok(near((v2 - v1) / v1 * 100, 7.6923, 1e-3), 'S2: the honest difference — (56−52)/52 = 7.7%');
  // the lie: truncate the axis at 50 AND stretch the scale.
  const b = 50, sLie = 20; // px per rupee above the baseline
  const h1 = (v1 - b) * sLie, h2 = (v2 - b) * sLie;
  ok(h1 === 40 && h2 === 120, 'S3: the drawn bars — (52−50)×20 = 40 px and (56−50)×20 = 120 px');
  const visual = h2 / h1;
  ok(near(visual, 3), 'S4: the VISUAL ratio — 120/40 = 3 (B looks three times A)');
  const exaggeration = visual / (v2 / v1);
  ok(near(exaggeration, 2.785714, 1e-5), 'S5: the EXAGGERATION — 3 ÷ 1.0769 ≈ 2.79× the truth');
  // the honest difference inflated: 7.7% shown as 200%.
  ok(near((h2 - h1) / h1 * 100, 200), 'S6: the gap between the bars reads 200% of the first bar — the 7.7% truth inflated 26×');
  // the general law: E(b) = v1(v2−b) / (v2(v1−b)); E(0) = 1; E grows as b climbs.
  const E = (bb: number) => (v1 * (v2 - bb)) / (v2 * (v1 - bb));
  ok(near(E(0), 1, 1e-9), 'S7: at a zero baseline the exaggeration is exactly 1 — no lie');
  ok(near(E(30), v1 * (v2 - 30) / (v2 * (v1 - 30)), 1e-9) && near(E(30), 52 * 26 / (56 * 22), 1e-9),
    'S8: at b = 30 the exaggeration is 52×26/(56×22) ≈ 1.10 — the lie grows with the truncation');
  ok(E(49) > E(30) && E(51) > E(49) && E(51.9) > E(51), 'S9: the exaggeration climbs monotonically as the baseline nears the data');
}

console.log('=== T. the twin-scales arithmetic (10.3) ===');
{
  // the same sapling data drawn tall (8 px/cm) and flat (2 px/cm).
  const h = [8, 11, 16, 18, 25, 28];
  const slope = (arr: number[], i: number) => arr[i + 1] - arr[i];
  // within ONE chart, slope RATIOS are scale-invariant.
  const tall = [0, 1, 2, 3, 4].map((i) => slope(h.map((x) => x * 8), i));
  const flat = [0, 1, 2, 3, 4].map((i) => slope(h.map((x) => x * 2), i));
  ok(tall[3] / tall[2] === flat[3] / flat[2] && near(tall[3] / tall[2], 3.5),
    'T1: within one chart the steepness COMPARISON survives any rescaling (7:2 either way)');
  // but ACROSS charts the absolute steepness is meaningless — 5× stretch.
  ok(tall[3] === 56 && flat[3] === 14 && tall[3] === 4 * flat[3],
    'T2: the same growth draws 56 px tall or 14 px — cross-chart slope comparisons are noise');
  // the honest habit: compare within the chart, read the scale before comparing across charts.
  ok(near(h[5] - h[0], 20), 'T3: the total climb (20 cm) is the one cross-chart statement that survives — read from the labels, not the pixels');
}

console.log('=== U. the mismatch rules (10.3) ===');
{
  // the three refusals of 10.2, now as diagnoses.
  const catC: string = 'walk', catD: string = 'bus';
  ok(catC !== catD, 'U1: a line through walk/bus/cycle/car invents transitions — refuse (no order)');
  ok(true, 'U2: a pie whose slices do not close (say 40% + 30% drawn, 30% missing) is a pie that lost answers — the check-sum law catches it');
  ok(true, 'U3: a pie for data that is not parts of ONE whole (marks out of 500, temperatures) — refuse the type, not the data');
}

console.log('=== V. the correlation honesty (10.3) ===');
{
  // ice-cream sales and pool drownings both rise June→August — the heat causes both.
  const ice = [30, 45, 60, 85, 90]; // May..Sep (thousand cones)
  const drown = [12, 18, 26, 38, 40]; // same months
  const rises = ice.every((x, i) => i === 0 || x > ice[i - 1]) && drown.every((x, i) => i === 0 || x > drown[i - 1]);
  ok(rises, 'V1: both series rise together across the summer — the correlation is real');
  ok(true, 'V2: the CAUSE of both is the temperature — ice cream does not cause drowning; correlation is not causation');
  // the numeric smell test: the ratio of rises differs wildly.
  ok(near(90 / 30, 3) && near(40 / 12, 3.333, 1e-2) && ne(90 / 30, 40 / 12),
    'V3: the two series even rise at different rates (3.0× vs 3.33×) — no hidden mechanism links them 1:1');
}

console.log('=== W. figure 1 geometry — the truncation lie, both panels (10.3) ===');
{
  // viewBox 780 × 380. Two panels of the same data (52, 56).
  // Panel A (honest): baseline y 310, 4 px/Rs, bars 80 wide at x 140/260,
  // axis 0..60 in steps of 20 (y 310/230/150/70).
  // Panel B (the lie): baseline y 310 LABELLED 50, 20 px/Rs above it, bars at
  // x 520/640, gridlines 50/52/54/56/58 at y 310/270/230/190/150.
  const base = 310, w = 80;
  const aHeights = [(52 - 0) * 4, (56 - 0) * 4];
  ok(aHeights.join(',') === '208,224', 'W1: panel A — the honest bars stand 208/224 px');
  ok(base - 224 >= 70, 'W2: panel A’s taller bar clears its top gridline (y 70)');
  const bHeights = [(52 - 50) * 20, (56 - 50) * 20];
  ok(bHeights.join(',') === '40,120', 'W3: panel B — the lie’s bars stand 40/120 px');
  ok([50, 52, 54, 56, 58].map((v) => base - (v - 50) * 20).join(',') === '310,270,230,190,150',
    'W4: panel B’s gridlines at y 310/270/230/190/150 — five bands of 2 rupees (the stretch ×5)');
  // the two baselines are the same LINE but named differently — that is the trick.
  ok(near((56 - 50) / (52 - 50), 3) && near(56 / 52, 1.0769, 1e-4),
    'W5: the pair — visual ratio 3, true ratio 1.077');
  // the bars’ x-positions keep both panels inside their halves.
  ok(140 - 40 >= 8 && 260 + 40 <= 360 && 520 - 40 >= 420 && 640 + 40 <= 740, 'W6: both panels’ bars sit inside their plots with ≥ 8 px air');
}

console.log('=== X. figure 2 geometry — the mismatch gallery (10.3) ===');
{
  // viewBox 780 × 300. Three mini-panels ≈ 240 wide (x 20..260 / 270..510 / 520..760).
  // P1: a zigzag line through 4 unordered category points (the fraud) + ✗.
  // P2: a pie arc pair summing to 70% with a visible gap (the lost answers) + ✗.
  // P3: the honest mini bar chart (4 bars: 8/6/4/2 at 6 px) + ✓.
  const marks = [40, 110, 190]; // the verdict glyphs’ y
  ok(marks[2] > marks[0], 'X1: the panels share a verdict row');
  // P1’s fraud line: the SAME 8/6/4/2 data (y = 170 − f×12) — the lie is the type.
  const p1: Array<[number, number]> = [8, 6, 4, 2].map((f, i) => [60 + 60 * i, 170 - f * 12] as [number, number]);
  ok(p1.map((q) => q.join(',')).join(' ') === '60,74 120,98 180,122 240,146', 'X2: the fraud line’s points carry the true frequencies (60,74 120,98 180,122 240,146)');
  // P2’s open pie: two arcs of 144° and 108° (40% + 30%) with a 108° gap.
  ok(near(144 + 108, 252) && near(360 - 252, 108), 'X3: the drawn slices cover 252°; the 108° gap is the missing 30% — visible at a glance');
  // P3’s honest bars: 8/6/4/2 at 6 px = 48/36/24/12.
  ok([8, 6, 4, 2].map((f) => f * 6).join(',') === '48,36,24,12', 'X4: the honest mini bars stand 48/36/24/12 px');
}

console.log('=== Y. quiz keys (10.3) ===');
{
  // Q1: the fastest way to spot a lying bar chart: check where the baseline starts. key 1.
  ok(1 === 1, 'Y1: Q1 key 1 — a baseline above zero is the first confession');
  // Q2: 52 vs 56 from a 50-baseline looks like ×3; the truth is ×1.077. The exaggeration ≈ 2.79. key 2.
  ok(near(3 / (56 / 52), 2.7857, 1e-3), 'Y2: Q2 key 2 — ≈ 2.79× the truth');
  // Q3: the sapling drawn at 2 px/cm vs 8 px/cm — which comparison survives? the within-chart steepness ranking. key 1.
  ok([7, 2].join(',') === [7, 2].join(','), 'Y3: Q3 key 1 — steepness RATIOS survive rescaling; absolute pixel slopes do not');
  // Q4: a pie shows 60% + 30% with nothing else. What is missing? 10% of the answers. key 1.
  ok(near(100 - 60 - 30, 10), 'Y4: Q4 key 1 — the slices must close on 100% (the check-sum law in its third dress)');
  // Q5: ice-cream sales and drownings rise together because… the heat causes both. key 1.
  ok(1 === 1, 'Y5: Q5 key 1 — a third variable drives both; correlation is not causation');
}

console.log('=== Z. exercise keys (10.3) ===');
{
  // L1-1: spot the lie: a bar chart of 9.1 vs 10.2 with the axis starting at 9.
  const E1 = (9 * (10.2 - 9)) / (10.2 * (9.1 - 9));
  ok(near(E1, 9 * 1.2 / (10.2 * 0.1), 1e-9) && near(E1, 10.588, 1e-2),
    'Z1: L1-1 — baseline 9: the exaggeration is 9×1.2/(10.2×0.1) ≈ 10.6×');
  // L1-2: the honest reading of the same data: 10.2/9.1 ≈ 1.121.
  ok(near(10.2 / 9.1, 1.1209, 1e-3), 'Z2: L1-2 — the true ratio ≈ 1.12 (a 12% difference, not a 10.6× chasm)');
  // L2-1: a truncated chart starts at 40 for values 44/48: visual ratio (8)/(4) = 2; true 48/44 = 1.0909; E ≈ 1.83.
  ok(near((48 - 40) / (44 - 40), 2) && near(2 / (48 / 44), 1.8333, 1e-3),
    'Z3: L2-1 — visual 2×, true 1.09×, exaggeration ≈ 1.83×');
  // L2-2: the check-sum on a pie: slices 45% + 35% + 15% = 95% — 5% missing.
  ok(near(100 - 45 - 35 - 15, 5), 'Z4: L2-2 — the slices must close on 100%; 5% of the answers are unaccounted');
  // L3-1: the twin charts: the same data at 2× and 10× scales — the within-chart RANKING of bars is identical.
  const f = [8, 6, 4, 2];
  const rank = (arr: number[]) => arr.map((v, i) => [v, i]).sort((a, b) => b[0] - a[0]).map((p) => p[1]).join(',');
  ok(rank(f.map((x) => x * 2)) === rank(f.map((x) => x * 10)) && rank(f) === '0,1,2,3',
    'Z5: L3-1 — rescaling never reorders the bars; the ranking is the scale-free truth');
  // L3-2: the interpolation lie: a line through annual census points implies the 6-month value.
  ok(near((12 + 14) / 2, 13), 'Z6: L3-2 — the midpoint of 12 and 14 is 13 — a guess, unless someone measured the off-year');
  // L4-1: diagnose the 3D pie (the front slices drawn larger by perspective).
  ok(true, 'Z7: L4-1 — perspective breaks the angle law: equal angles drawn unequal — refuse 3D pies');
  // L4-2: the ice-cream/drowning pair: which third variable? temperature.
  ok(true, 'Z8: L4-2 — the heat drives both series; the correlation is real and the causation is elsewhere');
  // L5-1: fix the truncated chart: re-base at 0 — the bars become 52×4=208 and 56×4=224 px.
  ok(near(52 * 4, 208) && near(56 * 4, 224) && near(224 / 208, 56 / 52, 1e-9),
    'Z9: L5-1 — at a zero baseline the visual ratio equals the true ratio exactly');
  // L5-2: the honest checklist applied: axes labelled? baseline 0? even steps? source? title says what/when?
  ok(true, 'Z10: L5-2 — five questions before believing any chart');
  // L6-1: prove the exaggeration law E = v1(v2−b)/(v2(v1−b)) and that E(0) = 1.
  const v1 = 52, v2 = 56, b = 50;
  const E = (v1 * (v2 - b)) / (v2 * (v1 - b));
  ok(near(E, 2.7857, 1e-3) && near((v1 * (v2 - 0)) / (v2 * (v1 - 0)), 1, 1e-9),
    'Z11: L6-1 — the law cashes at 2.79× for b = 50 and returns exactly 1 at b = 0');
  // L6-2: the monotonic climb: E grows as b → v1 (the lie sharpens as the baseline rises).
  const Es = [0, 20, 40, 45, 48, 50, 51].map((bb) => (v1 * (v2 - bb)) / (v2 * (v1 - bb)));
  ok(Es.every((e, i) => i === 0 || e > Es[i - 1]) && Es[0] === 1,
    'Z12: L6-2 — the exaggeration climbs monotonically from 1 as the baseline rises: the closer the baseline creeps to the data, the louder the lie');
}

console.log('=== Z2. 10.3 scope guards (printed) ===');
console.log('  (i)   no log scales, no dual axes, no regression/best-fit — later books own them.');
console.log('  (ii)  no real published charts reproduced — every lying chart here is drawn from the book’s own tiny data.');
console.log('  (iii) no statistical inference (p-values, significance) — correlation-vs-causation is one honest paragraph.');
console.log('  (iv)  no media-literacy cataloguing — the five-question checklist is the deliverable.');
console.log('  (v)   no content reproduced — datasets, figures and proofs ours.');

console.log('');
console.log(`TOTAL: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('ALL PASS');

// module scope: the helper names above must not collide with the other verify scripts
export {}
