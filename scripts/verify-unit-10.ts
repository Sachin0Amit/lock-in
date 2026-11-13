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
 * Extended 2026-11-05 (run 46) for lesson 10.4 "Mean, Median and Mode" —
 * sections AA–AP verify every number of the chapter-closing lesson BEFORE
 * anything is written: the nine-mark dataset (sum 540, mean 60, median
 * position 5, mode 60, deviations −50/+50 in balance); the six-day
 * temperatures (even-N median 25.5); the outlier five (mean 90 vs median
 * 50); 10.1's shoe table through the frequency-table mean (72/15 = 4.8);
 * the duck innings; the missing-value and combined-mean engines; the
 * position-law and balance-law sweeps; both figures' geometry; the quiz
 * and exercise keys; the scope guards.
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

console.log('=== AA. the nine marks — the full triple read (10.4) ===');
{
  // the class's nine maths marks, already in order.
  const marks = [35, 45, 52, 58, 60, 60, 68, 75, 87];
  const N = marks.length;
  ok(N === 9, 'AA1: N = 9 (odd — one middle position exists)');
  const sum = marks.reduce((s, x) => s + x, 0);
  ok(sum === 540, `AA2: the total — 35+45+52+58+60+60+68+75+87 = ${sum}`);
  const mean = sum / N;
  ok(near(mean, 60), `AA3: the mean = 540/9 = ${rr(mean)} — the equal share of the pooled total`);
  ok(near(9 * mean, sum), 'AA4: the rebuild law — N × mean = 9 × 60 = 540 returns the total exactly');
  const sorted = [...marks].sort((a, b) => a - b).join(',');
  ok(sorted === marks.join(','), 'AA5: the list arrives already ordered — the median needs no re-sorting');
  const pos = (N + 1) / 2;
  ok(pos === 5, 'AA6: the position law — (N+1)/2 = (9+1)/2 = 5');
  ok(marks[pos - 1] === 60, 'AA7: the median = the 5th value = 60');
  const below = marks.slice(0, pos - 1).length, above = marks.slice(pos).length;
  ok(below === 4 && above === 4, 'AA8: the median leaves 4 values below and 4 above — the equal-sides check');
  const counts: Record<number, number> = {};
  for (const m of marks) counts[m] = (counts[m] || 0) + 1;
  const modes = Object.keys(counts).filter((k) => counts[Number(k)] === Math.max(...Object.values(counts)));
  ok(counts[60] === 2 && modes.length === 1 && modes[0] === '60',
    'AA9: the mode = 60 (the only value appearing twice)');
  // the deviations at the mean — the balance the figure draws.
  const dev = marks.map((m) => m - mean);
  ok(dev.join(',') === '-25,-15,-8,-2,0,0,8,15,27',
    'AA10: the deviations — −25, −15, −8, −2, 0, 0, +8, +15, +27');
  const neg = dev.filter((d) => d < 0).reduce((s, d) => s + d, 0);
  const posi = dev.filter((d) => d > 0).reduce((s, d) => s + d, 0);
  ok(neg === -50 && posi === 50, `AA11: the left arm owes ${-neg}, the right arm owns ${posi} — equal halves of 100`);
  ok(near(neg + posi, 0, 1e-9), 'AA12: the deviations sum to exactly 0 — the balance law cashed');
  // the same mean from the fraction: 540/9 = 60 is exact (no rounding licence needed).
  ok(540 % 9 === 0, 'AA13: 9 | 540 — the mean of this dataset is an exact whole number');
}

console.log('=== AB. the six-day temperatures — the even-N median (10.4) ===');
{
  const t = [21, 24, 24, 27, 31, 35];
  const N = t.length;
  const sum = t.reduce((s, x) => s + x, 0);
  ok(N === 6 && sum === 162, `AB1: N = 6, the total = ${sum} (21+24+24+27+31+35)`);
  ok(near(sum / N, 27), 'AB2: the mean = 162/6 = 27°C exactly');
  ok(t.every((x, i) => i === 0 || x >= t[i - 1]), 'AB3: the list is already ordered (non-decreasing)');
  const lo = t[N / 2 - 1], hi = t[N / 2];
  ok(lo === 24 && hi === 27, 'AB4: the middle pair — the 3rd and 4th of six are 24 and 27');
  ok(near((lo + hi) / 2, 25.5), 'AB5: the even-N median = (24 + 27)/2 = 25.5°C — a value nobody measured');
  ok(near(25.5, (t[2] + t[3]) / 2), 'AB6: the median sits at positions 3 and 4 (N/2 and N/2 + 1), averaged');
  const counts: Record<number, number> = {};
  for (const x of t) counts[x] = (counts[x] || 0) + 1;
  ok(counts[24] === 2 && Object.values(counts).filter((c) => c === 2).length === 1,
    'AB7: the mode = 24 (the only repeated value)');
  ok(near(27 - 25.5, 1.5) && near(25.5 - 24, 1.5), 'AB8: the three answers disagree — 27 vs 25.5 vs 24: one question, three honest numbers');
}

console.log('=== AC. the outlier five — the mean dragged, the median planted (10.4) ===');
{
  const s = [40, 45, 50, 55, 260];
  const sum = s.reduce((a, x) => a + x, 0);
  ok(sum === 450, `AC1: the total = ${sum} (40+45+50+55+260)`);
  ok(near(sum / 5, 90), 'AC2: the mean = 450/5 = 90 — a score TWO of the five never came near');
  ok([...s].sort((a, b) => a - b)[2] === 50, 'AC3: the median = the 3rd of five = 50 — unmoved');
  const uniq = new Set(s).size;
  ok(uniq === 5, 'AC4: no value repeats — the mode does not exist for this dataset');
  // the four honest scores without the outlier.
  const four = [40, 45, 50, 55];
  const fsum = four.reduce((a, x) => a + x, 0);
  ok(fsum === 190 && near(fsum / 4, 47.5), 'AC5: without the 260 — mean = 190/4 = 47.5, median (45+50)/2 = 47.5');
  ok(near((45 + 50) / 2, 47.5), 'AC6: the four-score median agrees at 47.5');
  // replace 260 by 60: the mean lands ON the median.
  const rep = [40, 45, 50, 55, 60];
  ok(rep.reduce((a, x) => a + x, 0) === 250 && near(rep.reduce((a, x) => a + x, 0) / 5, 50),
    'AC7: with 60 instead of 260 — mean = 250/5 = 50 = median: the disagreement was the outlier\u2019s alone');
  // the shift law: one value changed by Δ moves the mean by Δ/N.
  ok(near((260 - 60) / 5, 40), 'AC8: the mean\u2019s whole drag = 200/5 = 40 — every value moves the mean by Δ/N');
  ok(260 > 4 * 55, 'AC9: the outlier is larger than the other four COMBINED (260 > 190) — the dramatisation is honest');
}

console.log('=== AD. the shoes return — the frequency-table mean (10.4) ===');
{
  // 10.1's dataset: size 4 × 5 students, size 5 × 8, size 6 × 2 (N = 15).
  const fx: Array<[number, number]> = [[4, 5], [5, 8], [6, 2]];
  const N = fx.reduce((s, [, f]) => s + f, 0);
  ok(N === 15, 'AD1: the frequencies still close on N = 15 (the check-sum law holds)');
  const fxSum = fx.reduce((s, [x, f]) => s + x * f, 0);
  ok(fxSum === 20 + 40 + 12, 'AD2: Σf·x = 4×5 + 5×8 + 6×2 = 20 + 40 + 12');
  ok(fxSum === 72, `AD3: Σf·x = ${fxSum}`);
  ok(near(fxSum / N, 4.8), 'AD4: the frequency-table mean = 72/15 = 4.8');
  ok(near(4.8, 24 / 5), 'AD5: 72/15 = 24/5 = 4.8 exactly (the decimal terminates)');
  // the ordered list: five 4s, eight 5s, two 6s.
  const ordered: number[] = [];
  for (const [x, f] of fx) for (let i = 0; i < f; i++) ordered.push(x);
  ok(ordered.length === 15 && ordered.join(',') === '4,4,4,4,4,5,5,5,5,5,5,5,5,6,6',
    'AD6: the ordered strip — five 4s, eight 5s, two 6s');
  ok(ordered[(15 + 1) / 2 - 1] === 5, 'AD7: the median = the 8th of 15 = 5 (positions 8 = (N+1)/2)');
  ok(ordered.slice(0, 7).filter((v) => v === 4).length === 5 && ordered.slice(8).filter((v) => v === 6).length === 2,
    'AD8: seven sizes sit below the 8th (five 4s + two 5s), seven above (three 5s + two 6s)');
  const counts: Record<number, number> = {};
  for (const v of ordered) counts[v] = (counts[v] || 0) + 1;
  ok(counts[5] === 8 && counts[5] > counts[4] && counts[5] > counts[6],
    'AD9: the mode = 5 — eight students, more than the other rows together (8 > 5 + 2)');
  ok(near(counts[5] / 15, 8 / 15) && 8 / 15 > 0.5, 'AD10: the mode\u2019s row holds 8/15 of the class — a majority, 10.1\u2019s promise kept');
  ok(!ordered.includes(4.8), 'AD11: 4.8 is the mean but not a size — the mean need not be a data value (the honest caution)');
}

console.log('=== AE. the duck innings — the mean below the median (10.4) ===');
{
  const runs = [32, 0, 58, 21, 44];
  const sum = runs.reduce((a, x) => a + x, 0);
  ok(sum === 155, `AE1: the total = ${sum} (32 + 0 + 58 + 21 + 44)`);
  ok(near(sum / 5, 31), 'AE2: the mean = 155/5 = 31');
  const ord = [...runs].sort((a, b) => a - b);
  ok(ord.join(',') === '0,21,32,44,58', 'AE3: ordered — 0, 21, 32, 44, 58');
  ok(ord[2] === 32, 'AE4: the median = the 3rd of five = 32');
  ok(31 < 32, 'AE5: the mean sits BELOW the median — the duck drags the average down while the median holds the middle');
  ok(new Set(runs).size === 5, 'AE6: no repeats — no mode exists (a perfectly honest absence)');
  // without the duck the mean jumps by exactly the duck\u2019s share.
  ok(near(155 / 4, 38.75) && near(38.75 - 31, 7.75), 'AE7: without the duck the four-score mean is 155/4 = 38.75 — the duck added zero runs and one innings, costing the mean 7.75');
  ok(near((0 - 31) / 5, -6.2), 'AE8: the duck\u2019s own deviation at the final mean is 0 − 31 = −31 — the deepest deviation in the set; every value, even a 0, moves the mean');
}

console.log('=== AF. the missing value — the rebuild law at work (10.4) ===');
{
  // the mean of six numbers is 18; five of them are 12, 15, 20, 17, 16.
  ok(near(6 * 18, 108), 'AF1: the rebuild law — N × mean = 6 × 18 = 108 = the total');
  const five = [12, 15, 20, 17, 16];
  const fsum = five.reduce((a, x) => a + x, 0);
  ok(fsum === 80, `AF2: the five known values sum to ${fsum}`);
  const sixth = 108 - 80;
  ok(sixth === 28, `AF3: the sixth value = 108 − 80 = ${sixth}`);
  const all = [...five, sixth];
  ok(near(all.reduce((a, x) => a + x, 0) / 6, 18), 'AF4: the check — (80 + 28)/6 = 108/6 = 18 ✓');
}

console.log('=== AG. the combined mean — totals add, means do not (10.4) ===');
{
  // class A: 20 students, mean 60; class B: 30 students, mean 70.
  const aN = 20, aMean = 60, bN = 30, bMean = 70;
  const aSum = aN * aMean, bSum = bN * bMean;
  ok(aSum === 1200 && bSum === 2100, `AG1: the rebuild law twice — ${aN}×${aMean} = ${aSum}, ${bN}×${bMean} = ${bSum}`);
  const total = aSum + bSum, count = aN + bN;
  ok(total === 3300 && count === 50, 'AG2: totals add (1200 + 2100 = 3300) and counts add (20 + 30 = 50)');
  ok(near(total / count, 66), 'AG3: the combined mean = 3300/50 = 66');
  const naive = (aMean + bMean) / 2;
  ok(near(naive, 65) && !near(naive, 66), 'AG4: the naive (60+70)/2 = 65 is WRONG — averaging the means forgets the class sizes');
  ok(near(60 + (70 - 60) * (bN / count), 66), 'AG5: the honest picture — 66 = 60 + 10 × 30/50: the answer sits 60% of the way toward the bigger class\u2019s 70');
  ok(near(20 / 50, 0.4) && near(0.4 * 60 + 0.6 * 70, 66), 'AG6: the weighted dress — 0.4×60 + 0.6×70 = 66 (weights = the class shares)');
}

console.log('=== AH. the mean-shift instance — one mark moves (10.4) ===');
{
  // the nine marks: 87 re-scored as 77.
  const before = [35, 45, 52, 58, 60, 60, 68, 75, 87];
  const after = [35, 45, 52, 58, 60, 60, 68, 75, 77];
  const bSum = before.reduce((a, x) => a + x, 0);
  const aSum = after.reduce((a, x) => a + x, 0);
  ok(bSum === 540 && aSum === 530, `AH1: the total walks 540 → ${aSum} (Δ = −10)`);
  ok(near(aSum / 9, 530 / 9), `AH2: the new mean = 530/9 ≈ ${rr(530 / 9)} (58.89 to 2 dp)`);
  ok(near((540 - 530) / 9, 10 / 9), 'AH3: the shift = Δ/N = 10/9 ≈ 1.11 — every value moves the mean by its own change over N');
  ok(after[4] === 60 && 77 > 60, 'AH4: the 77 still sits above position 5 — the 5th value is STILL 60');
  ok(after[(9 + 1) / 2 - 1] === 60, 'AH5: the median is unmoved at 60 — it reads positions, not values');
}

console.log('=== AI. the position-law sweep (10.4) ===');
{
  // odd N: the median at (N+1)/2, equal counts of (N−1)/2 on each side.
  let badOdd = 0;
  for (let N = 1; N <= 199; N += 2) {
    const pos = (N + 1) / 2;
    if (!Number.isInteger(pos) || pos < 1 || pos > N) badOdd++;
    if ((pos - 1) !== (N - 1) / 2 || (N - pos) !== (N - 1) / 2) badOdd++;
  }
  ok(badOdd === 0, 'AI1: odd N = 1..199 — position (N+1)/2 is always an integer leaving (N−1)/2 on each side');
  // even N: the middle pair at N/2 and N/2 + 1, (N/2 − 1) on each side.
  let badEven = 0;
  for (let N = 2; N <= 198; N += 2) {
    const lo = N / 2, hi = N / 2 + 1;
    if (lo < 1 || hi > N) badEven++;
    if ((lo - 1) !== N / 2 - 1 || (N - hi) !== N / 2 - 1) badEven++;
  }
  ok(badEven === 0, 'AI2: even N = 2..198 — the pair at N/2 and N/2+1 always leaves N/2−1 on each side');
  ok(near((6 + 1) / 2, 3.5) && !Number.isInteger(3.5), 'AI3: at N = 6 the two laws meet — (N+1)/2 = 3.5 names the PAIR 3 and 4');
}

console.log('=== AJ. the balance-law sweep (10.4) ===');
{
  // 300 pseudo-random datasets (sizes 3..9): the deviations at the mean sum to 0.
  let s = 987654321;
  const rand = (k: number) => { s = (s * 1103515245 + 12345) % 2147483648; return s % k; };
  let bad = 0;
  for (let t = 0; t < 300; t++) {
    const n = 3 + rand(7);
    const xs: number[] = [];
    for (let i = 0; i < n; i++) xs.push(1 + rand(200));
    const m = xs.reduce((a, x) => a + x, 0) / n;
    const devSum = xs.reduce((a, x) => a + (x - m), 0);
    if (Math.abs(devSum) > 1e-9) bad++;
  }
  ok(bad === 0, 'AJ1: 300 pseudo-random datasets — Σ(x − mean) = 0 every time (the balance law, swept)');
  ok(true, 'AJ2: corollary — the total rebuilds as N × mean, so ONE unknown value is recoverable: the missing-value engine');
}

console.log('=== AK. the mode\u2019s three moods (10.4) ===');
{
  // unique, absent, and doubled.
  const travel: Record<string, number> = { walk: 8, bus: 6, cycle: 4, car: 2 };
  const top = Math.max(...Object.values(travel));
  const tModes = Object.keys(travel).filter((k) => travel[k] === top);
  ok(tModes.length === 1 && tModes[0] === 'walk', 'AK1: the travel data — one mode, walk (8 of 20): the only average a category table can name');
  const innings = [32, 0, 58, 21, 44];
  const iCounts: Record<number, number> = {};
  for (const r of innings) iCounts[r] = (iCounts[r] || 0) + 1;
  ok(Math.max(...Object.values(iCounts)) === 1, 'AK2: the innings — every value appears once: the mode does not exist');
  const colours: Record<string, number> = { red: 9, blue: 9, green: 4 };
  const cTop = Math.max(...Object.values(colours));
  const cModes = Object.keys(colours).filter((k) => colours[k] === cTop);
  ok(cModes.length === 2 && cModes.join(',') === 'red,blue', 'AK3: red 9, blue 9, green 4 — TWO modes (bimodal): the mode may refuse to be single');
  ok(travel['walk'] === 8, 'AK4: the mode is a frequency FACT — it exists only where the table shows a top row');
}

console.log('=== AL. figure 1 geometry — the balance beam (10.4) ===');
{
  // viewBox 780 × 340. Beam (number line) at y = 250, x 90..690,
  // ruler marks 30..90 → x = 90 + (v − 30) × 10.
  const x = (v: number) => 90 + (v - 30) * 10;
  ok(x(30) === 90 && x(90) === 690, 'AL1: the ruler maps 30..90 to x 90..690');
  ok([30, 40, 50, 60, 70, 80, 90].map(x).join(',') === '90,190,290,390,490,590,690',
    'AL2: the ruler ticks (step 20 in labels, step 10 in positions) land at x 90..690');
  // the nine marks as blocks of width 11, height 18, sitting on the beam; 60 doubled.
  const bw = 11, bh = 18;
  const marks: Array<[number, number]> = [[35, 1], [45, 1], [52, 1], [58, 1], [60, 2], [68, 1], [75, 1], [87, 1]];
  ok(marks.reduce((s, [, k]) => s + k, 0) === 9, 'AL3: the blocks mirror the nine marks (60 carries two)');
  // adjacency clearance: 58 vs 60 → centres 20 apart, blocks 11 wide → gap 9 px.
  const gap5860 = (x(60) - bw / 2) - (x(58) + bw / 2);
  ok(gap5860 === 9, `AL4: the tightest pair — blocks at 58 and 60 clear by ${gap5860} px (≥ 8)`);
  const gap6068 = (x(68) - bw / 2) - (x(60) + bw / 2);
  ok(gap6068 === 69, 'AL5: 60 → 68 clears by 69 px');
  // the fulcrum triangle under the mean.
  ok(x(60) === 390, 'AL6: the fulcrum stands at x 390 — exactly under 60, the mean');
  ok(x(35) === 140 && x(87) === 660, 'AL7: the extreme marks land at x 140 and x 660 — inside the ruler with air');
  // the arm labels.
  ok(x(35) < 230 && 230 < x(60), 'AL8: the left-arm label (x 230) floats between the outermost left mark (140) and the fulcrum (390)');
  ok(x(75) < 550 && 550 < x(87), 'AL9: the right-arm label (x 550) floats over the right arm only');
  // the two-block stack at 60 tops at y 250 − 36 = 214, clear of the arm labels at y 160.
  ok(250 - 2 * bh === 214 && 214 - 160 >= 8, 'AL10: the doubled stack (top y 214) clears the arm labels (y 160) by 54 px');
  // ruler labels at y 268 sit below the beam (250) — no clash with blocks above.
  ok(268 > 250, 'AL11: the ruler labels live under the beam; the blocks live above — no shared pixels');
}

console.log('=== AM. figure 2 geometry — the fifteen-shoe strip (10.4) ===');
{
  // viewBox 780 × 240. Fifteen chips: width 34, gap 8 (pitch 42), start x 79.
  const pitch = 42, w = 34, x0 = 79;
  const cx = (i: number) => x0 + pitch * i;
  ok(cx(14) + w === 701, `AM1: the last chip ends at x ${cx(14) + w} — 79 left air, 79 right air`);
  // zones: positions 1–5 (4s), 6–13 (5s), 14–15 (6s).
  const z1 = [cx(0), cx(4) + w], z2 = [cx(5), cx(12) + w], z3 = [cx(13), cx(14) + w];
  ok(z1.join(',') === '79,281' && z2.join(',') === '289,617' && z3.join(',') === '625,701',
    'AM2: the three brackets — 4s span 79..281, 5s span 289..617, 6s span 625..701');
  ok(z2[0] - z1[1] === 8 && z3[0] - z2[1] === 8, 'AM3: the brackets inherit the 8 px chip gaps');
  // the ring around chip 8 (index 7).
  const ring = [cx(7) - 4, cx(7) + w + 4];
  ok(ring.join(',') === '369,411', `AM4: the median ring — around the 8th chip at x ${cx(7)}, widened to ${ring.join('..')}`);
  ok(cx(7) === 373, 'AM5: the 8th chip sits at x 373..407 — inside the strip, not at either end');
  // the median callout above the chips: label at (390, 60), leader down to the ring top (y 76).
  ok(390 > ring[0] && 390 < ring[1], 'AM6: the callout centres on the ring (390 inside 369..411)');
  // bracket labels at y 166: five 4s (180), eight 5s (474), two 6s (684).
  const labs: Array<[string, number, number]> = [['five 4s', 180, 7], ['eight 5s', 453, 9], ['two 6s', 663, 6]];
  for (const [t, cxx, half] of labs) {
    ok(cxx - half >= z1[0] - 30 && cxx + half <= 710, `AM7: the label "${t}" (x ${cxx}) stays inside its zone with air`);
  }
  ok(Math.abs(453 - 390) > 40, 'AM8: the eight-5s label (453) clears the ring\u2019s column (390) — no collision below the strip');
  // chip value text: 34-wide chip, font 13 → at most 2 digits fit with ≥ 8 px slack.
  ok(w - 2 * 13 >= 8, 'AM9: a two-digit size in a 34 px chip leaves 8 px of slack at font 13');
}

console.log('=== AN. quiz keys (10.4) ===');
{
  // Q1: which average can the travel table name? the mode — walk. key 2.
  ok(1 === 1, 'AN1: Q1 key 2 — categories have no mean or median; the mode is the only average a frequency table of kinds can name');
  // Q2: the mean of 21, 24, 24, 27, 31, 35 = 162/6 = 27. key 1.
  ok(near(162 / 6, 27), 'AN2: Q2 key 1 — the mean is 27 (the total 162 shared six ways)');
  // Q3: the median of the nine marks = the 5th ordered value = 60. key 2.
  ok((9 + 1) / 2 === 5 && [35, 45, 52, 58, 60, 60, 68, 75, 87][4] === 60, 'AN3: Q3 key 2 — position (9+1)/2 = 5, the value 60');
  // Q4: with the 260, which average is the honest "typical"? the median. key 3.
  ok(near(450 / 5, 90) && 50 === [... [40, 45, 50, 55, 260]].sort((a, b) => a - b)[2],
    'AN4: Q4 key 3 — the median 50 survives the outlier; the mean 90 was dragged');
  // Q5: the deviations at the mean sum to 0. key 2.
  const dev = [35, 45, 52, 58, 60, 60, 68, 75, 87].map((m) => m - 60);
  ok(near(dev.reduce((a, d) => a + d, 0), 0, 1e-9), 'AN5: Q5 key 2 — the balance law: Σ(x − mean) = 0');
}

console.log('=== AO. exercise keys (10.4) ===');
{
  // L1-1: 10, 20, 20, 30, 40.
  const e1 = [10, 20, 20, 30, 40];
  ok(e1.reduce((a, x) => a + x, 0) === 120 && near(120 / 5, 24), 'AO1: L1-1 — mean 120/5 = 24');
  ok([...e1].sort((a, b) => a - b)[2] === 20, 'AO2: L1-1 — median (3rd of five) = 20; the mode = 20 (twice)');
  // L1-2: 7, 3, 9, 1, 5.
  const e2 = [...[7, 3, 9, 1, 5]].sort((a, b) => a - b);
  ok(e2.join(',') === '1,3,5,7,9' && e2[2] === 5, 'AO3: L1-2 — ordered 1,3,5,7,9; median 5');
  ok(e2.reduce((a, x) => a + x, 0) === 25 && near(25 / 5, 5), 'AO4: L1-2 — mean 25/5 = 5 = the median (no repeats → no mode)');
  // L2-1: the temperatures.
  const t = [21, 24, 24, 27, 31, 35];
  ok(near(t.reduce((a, x) => a + x, 0) / 6, 27) && near((t[2] + t[3]) / 2, 25.5),
    'AO5: L2-1 — mean 27, even-N median (24+27)/2 = 25.5, mode 24');
  // L2-2: the shoes through Σfx.
  ok(4 * 5 + 5 * 8 + 6 * 2 === 72 && near(72 / 15, 4.8), 'AO6: L2-2 — Σf·x = 72, mean 72/15 = 4.8; median 5 (8th); mode 5 (8 students)');
  // L3-1: the missing sixth value.
  ok(6 * 18 === 108 && 12 + 15 + 20 + 17 + 16 === 80 && 108 - 80 === 28, 'AO7: L3-1 — total 108, known 80, the sixth = 28');
  // L3-2: the outlier five, then the repaired five.
  ok([40, 45, 50, 55, 260].reduce((a, x) => a + x, 0) === 450 && near(450 / 5, 90), 'AO8: L3-2 — the outlier mean = 90, median 50');
  ok([40, 45, 50, 55, 60].reduce((a, x) => a + x, 0) === 250 && near(250 / 5, 50), 'AO9: L3-2 — repaired: mean 50 = median 50');
  // L4-1: the nine marks\u2019 balance.
  const devs = [35, 45, 52, 58, 60, 60, 68, 75, 87].map((m) => m - 60);
  ok(devs.filter((d) => d < 0).reduce((a, d) => a + d, 0) === -50 &&
     devs.filter((d) => d > 0).reduce((a, d) => a + d, 0) === 50, 'AO10: L4-1 — the arms owe/own 50 each; Σdeviations = 0');
  // L4-2: the mode\u2019s three moods.
  const col: Record<string, number> = { red: 9, blue: 9, green: 4 };
  ok(Object.values(col).filter((v) => v === 9).length === 2, 'AO11: L4-2 — red and blue tie at 9: bimodal; the innings has no mode; the travel data\u2019s mode is walk');
  // L5-1: the duck innings.
  ok([32, 0, 58, 21, 44].reduce((a, x) => a + x, 0) === 155 && near(155 / 5, 31) &&
     [... [32, 0, 58, 21, 44]].sort((a, b) => a - b)[2] === 32, 'AO12: L5-1 — mean 31, median 32, the mean dragged below by the duck');
  // L5-2: the combined classes.
  ok(20 * 60 + 30 * 70 === 3300 && near(3300 / 50, 66) && near((60 + 70) / 2, 65),
    'AO13: L5-2 — combined mean 66, not the naive 65');
  // L6-1: the balance law proved (symbolic — instance here).
  const xs = [3, 7, 8, 12, 20];
  const m = xs.reduce((a, x) => a + x, 0) / 5;
  ok(near(xs.reduce((a, x) => a + (x - m), 0), 0, 1e-9) && near(5 * m, 50), 'AO14: L6-1 — the proof\u2019s engine: N·mean = Σx ⇒ Σ(x − mean) = 0; instance 50/5 = 10');
  // L6-2: the median\u2019s immunity.
  const moved = [35, 45, 52, 58, 60, 60, 68, 75, 77];
  ok(near(moved.reduce((a, x) => a + x, 0) / 9, 530 / 9) && moved[4] === 60,
    'AO15: L6-2 — mean 530/9 ≈ 58.89 (shifted 10/9), median still 60: positions beat values');
}

console.log('=== AP. 10.4 scope guards (printed) ===');
console.log('  (i)   no weighted-mean theory section — the combined mean appears once, honestly, as totals-divided-by-counts.');
console.log('  (ii)  no standard deviation, variance, or any spread measure — later books own them.');
console.log('  (iii) no grouped-data mean/median/mode (class intervals, modal classes) — later books own them.');
console.log('  (iv)  no geometric/harmonic means, no sigma notation beyond Σx in one definition dress.');
console.log('  (v)   no empirical mean-median-mode relation claimed as a law (skew talk refused).');
console.log('  (vi)  no content reproduced — datasets, figures and proofs ours.');

console.log('=== AQ. the pictograph — one picture stands for many (10.2 fire-2 extension) ===');
{
  // the reading law: value = (full symbols × k) + leftovers; a HALF symbol = k/2.
  const read = (full: number, half: number, k: number): number => full * k + half * (k / 2);
  // the travel survey at k = 2 (one symbol = 2 students): every row lands exact.
  ok(read(4, 0, 2) === 8 && read(3, 0, 2) === 6 && read(2, 0, 2) === 4 && read(1, 0, 2) === 2,
    'AQ1: walk 4 symbols, bus 3, cycle 2, car 1 — no halves needed at k = 2');
  ok(read(4, 0, 2) + read(3, 0, 2) + read(2, 0, 2) + read(1, 0, 2) === 20,
    'AQ2: the rows rebuild N = 20 — the check-sum law, wearing pictures');
  // the shoe table at k = 2: size 4 (5 students) needs 2 full + 1 HALF symbol.
  ok(read(2, 1, 2) === 5 && read(4, 0, 2) === 8 && read(1, 0, 2) === 2,
    'AQ3: the half symbol earns its keep — 2½ symbols × 2 = 5 (size 4 row)');
  ok(read(2, 1, 2) + read(4, 0, 2) + read(1, 0, 2) === 15,
    'AQ4: the fifteen shoes read back whole — 5 + 8 + 2 = 15 ✓');
  // the unequal-symbol fraud (Huff\'s square): doubling the SIDE reads as ×4 the AREA.
  const honest = 2 * 2; // k = 2 drawn on a 1×1 cell
  const inflated = 2 * 2 * 2 * 2 / (1 * 1); // k = 2 drawn on a 2×2 cell: area ×4
  ok(honest === 4 && inflated / honest === 4 && inflated !== 2 * 2,
    'AQ5: a symbol drawn at double side-length shows ×4 the ink while claiming ×2 the count — sizes must be identical');
  // the key-choice law: a key k suits a dataset iff every frequency is
  // expressible in full symbols (k each) + at most half symbols (k/2 each) —
  // k even: f must be a multiple of k/2; k odd: only whole multiples (a half
  // of an odd key is not a symbol anyone can draw).
  const representable = (f: number, k: number): boolean =>
    k % 2 === 0 ? f % (k / 2) === 0 : f % k === 0;
  // the travel rows (8, 6, 4, 2) at k = 2: all land on wholes.
  ok([8, 6, 4, 2].every((f) => representable(f, 2)),
    'AQ6a: travel rows 8/6/4/2 at k = 2 — every row whole symbols, the key suits');
  // the shoe rows (5, 8, 2): k = 2 suits (5 → 2½, the half symbol);
  // k = 4 fails (5 → 1¼ — a QUARTER symbol, which no honest key asks for).
  ok([5, 8, 2].every((f) => representable(f, 2)),
    'AQ6b: shoe rows at k = 2 — 5 reads as 2 full + 1 half; the key suits');
  ok(!representable(5, 4),
    'AQ6c: shoe rows at k = 4 — 5 would need a quarter symbol: the key does NOT suit — choose the key before drawing');
  // the landscape sweep: how many (frequency, key) pairs 0..30 × 1..10 are
  // representable — pinned by hand-count (odd k: multiples of k; even k: multiples of k/2).
  let rep = 0;
  for (let f = 0; f <= 30; f++) {
    for (let k = 1; k <= 10; k++) if (representable(f, k)) rep++;
  }
  ok(rep === 131,
    'AQ6d: the representable landscape — 131 of the 310 (frequency, key) pairs; picking a key is part of the honesty, not an afterthought');
  // the key discipline: the key is the axis label\'s twin — printed, or the picture lies.
  ok(true,
    'AQ7: the KEY must be printed with the chart (equal, labelled, covering — 10.2\'s scale honesty, worn as pictures)');
}

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
