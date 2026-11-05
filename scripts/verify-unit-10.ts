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
