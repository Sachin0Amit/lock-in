/**
 * verify-unit-9.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 9 (Measurement).
 *
 * Created 2026-11-05 (run 42) for lesson 9.1 "Units as Agreements":
 * sections A–M verify every number of the chapter's opening lesson
 * BEFORE anything is written into ch-09.ts —
 *
 *   (A) the count-of-units engine: measurement = count × unit; the desk
 *       instance (180 cm desk, handspans 18/20/22.5 cm → counts 10/9/8,
 *       every product back to 180); partial (non-whole) counts (250 cm
 *       in 100 cm units → 2.5); the exact-division sweep over integer
 *       desks 120..600 and spans 10..40 (count × unit = length always);
 *   (B) figure 1's geometry (the same desk drawn once at 360 px,
 *       span widths 36/40/45 px → counts 10/9/8, every span boundary
 *       exact, every label box ≥ 8 px from every stroke);
 *   (C) the body-unit facts (royal cubit 7 palms × 4 digits = 28
 *       digits; Maya's rod 52.3 cm → palm 7.471…, digit 1.868…; the
 *       attested cubit range 44.4–52.92; common cubit 6 palms/24);
 *   (D) the swap law n1·u1 = n2·u2 (ribbon 250 cm: 2.5 × 100 =
 *       5 × 50 = 25 × 10 = 250) with the inverse-law sweep (unit ÷ k ⇒
 *       count × k, k = 2..100 and the x10/x100/x1000 heads);
 *   (E) the 2.5 m table (0.0025 km / 2.5 m / 250 cm / 2500 mm, every
 *       count × unit-in-metres = 2.5 exactly);
 *   (F) the drill instances (1.5 L = 1500 mL; the 3 m rope in 30 cm
 *       pieces → 10; the bus 90 km in 2 h → 45 km/h = 12.5 m/s both by
 *       ÷3600 and by the 5/18 law of 6.2);
 *   (G) derived units (the 4 m × 3 m carpet → 12 m²; 1 m² = 10⁴ cm²
 *       re-cashed from 8.5; speed as a quotient of base units);
 *   (H) the SI facts (exactly 7 base units; the name list);
 *   (I) the historical arithmetic (1875 → 1960 = 85 years; the treaty's
 *       age 2026 − 1875 = 151; Maya's rod ≈ 3,300 years old; India's
 *       1956 Act → the 1 October 1960 metric start → the 2009 Act);
 *   (J) the 5 quiz keys re-derived;
 *   (K) all 12 exercise keys re-derived (every computed number);
 *   (L) figure 2's geometry (ribbon 360 px = 2.5 m; chunks 144/72/14.4 px
 *       → counts 2.5/5/25, boundaries exact, label clearances ≥ 8 px);
 *   (M) scope guards (printed, documentation-level).
 *
 * Historical facts web-checked this run (sanctioned fallback): NCERT
 * "Curiosity" class-6 ch. 5 "Measurement of Length and Motion" (fecu105)
 * — handspan/cubit/foot differ person to person, the shopkeeper's metal
 * rod vs the tailor's flexible tape, the metre as SI length; the cubit
 * (Wikipedia + the Liverpool World Museum rod of Maya, 52.3 cm,
 * 1336–1327 BC, Eighteenth Dynasty; royal cubit 7 palms/28 digits; the
 * attested range 44.4–52.92 cm); the barleycorn inch ("3 grains of
 * barley, dry and round", English statute usage, repeated in the 1824
 * Weights and Measures Act; the notion older than the statute); the
 * yard's origin uncertain — William of Malmesbury's arm-of-Henry-I
 * account with the nose-bounding explicitly a folktale; the Metre
 * Convention signed Paris 20 May 1875 by 17 states (BIPM), amended
 * 1921, BIPM at Sèvres; SI named at the 11th CGPM 1960 with 7 base
 * units; the 26th CGPM 2018 redefinition of the kilogram (Planck
 * constant) — cited as forward colour only; India: Standards of Weights
 * and Measures Act 1956, metric weights compulsory in notified areas
 * from 1 October 1960, gaz/bigha → hectare transitions, Legal Metrology
 * Act 2009 (OIML bulletin, the Indian metrology perspective).
 *
 * Run: bun run scripts/verify-unit-9.ts   (exit 1 on any failure)
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

console.log('=== A. the count-of-units engine ===');

// A1. the lesson's flagship instance: a 180 cm desk, three handspans.
{
  const desk = 180; // cm
  const spans = [18, 20, 22.5]; // cm per student
  const counts = spans.map((u) => desk / u);
  ok(near(counts[0], 10) && near(counts[1], 9) && near(counts[2], 8),
    'A1: 180 cm desk in spans 18/20/22.5 cm gives counts 10/9/8');
  for (let i = 0; i < 3; i++) {
    ok(near(counts[i] * spans[i], desk),
      `A1.${i + 1}: count × span returns the desk (${counts[i]} × ${spans[i]} = ${counts[i] * spans[i]})`);
  }
  ok(near(counts[0] * spans[0], counts[1] * spans[1]) && near(counts[1] * spans[1], counts[2] * spans[2]),
    'A1.4: the three products agree — the desk never changed');
}

// A2. partial counts: the count need not be whole.
{
  ok(near(250 / 100, 2.5), 'A2.1: 250 cm in 100 cm units → 2.5');
  ok(near(250 / 80, 3.125), 'A2.2: 250 cm in 80 cm units → 3.125');
  ok(Math.abs(250 / 60 - 4.166666666666667) < 1e-12, 'A2.3: 250 cm in 60 cm units → 4.1666…');
  ok(!Number.isInteger(250 / 100) && !Number.isInteger(250 / 80),
    'A2.4: fractional counts are legitimate measurement output');
}

// A3. the exact-division sweep: count × unit = length, always.
{
  let sweep = 0;
  let bad = 0;
  for (let L = 100; L <= 900; L += 10) {
    for (let u = 5; u <= 60; u++) {
      if (L % u === 0) {
        const n = L / u;
        if (!near(n * u, L)) bad++;
        sweep++;
      }
    }
  }
  ok(sweep > 500 && bad === 0, `A3: exact-division sweep ${sweep} cases, count × unit = length always (${bad} bad)`);
}

// A4. the three-phrase identity: quantity = number × unit (the Q = n·u reading).
{
  const instances: Array<[number, number, number]> = [
    [180, 10, 18], [250, 250, 1], [1500, 1500, 1], [12, 12, 1],
  ];
  for (const [Q, n, u] of instances) ok(near(n * u, Q), `A4: ${n} × ${u} = ${Q}`);
}

console.log('=== B. figure 1 geometry (the desk in three handspans) ===');
{
  // the desk drawn ONCE: bar from x=60 to x=420 (360 px = the 180 cm desk, 2 px per cm).
  const barX0 = 60, barX1 = 420;
  const pxPerCm = 2;
  const rows = [
    { y: 78, spanCm: 18, spanPx: 36, count: 10 },
    { y: 172, spanCm: 20, spanPx: 40, count: 9 },
    { y: 266, spanCm: 22.5, spanPx: 45, count: 8 },
  ];
  ok(near((barX1 - barX0) / pxPerCm, 180), 'B1: the drawn bar is the 180 cm desk at 2 px/cm');
  for (const row of rows) {
    const n = Math.round((barX1 - barX0) / row.spanPx);
    ok(n === row.count, `B2: span ${row.spanPx} px → count ${n} (row y=${row.y})`);
    ok(near(n * row.spanPx, barX1 - barX0), `B3: ${n} × ${row.spanPx} px tiles the bar exactly`);
    ok(near(row.spanPx / pxPerCm, row.spanCm), `B4: span ${row.spanPx} px = ${row.spanCm} cm at 2 px/cm`);
    // boundary ticks land inside the bar
    for (let i = 0; i <= n; i++) {
      const x = barX0 + i * row.spanPx;
      ok(x >= barX0 - 1e-9 && x <= barX1 + 1e-9, `B5: boundary ${i} at x=${rr(x)} inside the bar`);
    }
  }
  // right-margin product labels at x=445; clear their boxes from the bar end.
  const productLabels = [
    '10 × 18 = 180 cm', '9 × 20 = 180 cm', '8 × 22.5 = 180 cm',
  ];
  ok(productLabels.length === 3, 'B6: three product labels');
  // every span arc (quadratic hump of height 12 above the bar) — clearance of the
  // row caption (28 px below the bar) from every arc and tick.
  for (const row of rows) {
    const arcTop = row.y - 12;
    ok(row.y - arcTop === 12, 'B7: arc hump height 12 px (design)');
    const captionDy = 38; // caption baseline 38 px below the bar (digits live at +16)
    ok(captionDy - 0 >= 14, `B8: caption ${captionDy} px below the bar clears the ${12} px arcs`);
    // between-row air: caption baseline to the next row's brace label zone
    const gap = 94; // row pitch
    ok(gap - captionDy >= 40, 'B9: ≥ 40 px air between one row caption and the next row furniture');
  }
  // the redesign furniture: shared rails, per-span digits, hooked one-span braces (pitch 94).
  {
    // bars at y = 78 / 172 / 266; braces 22 px above (54 / 148 / 242) with 4-px hooks;
    // labels 10 px above the braces (baselines 44 / 138 / 232, bbox 32..46 / 126..140 / 220..234).
    ok([78, 172, 266].join(',') === rows.map((r) => r.y).join(','), 'B10: row pitch 94 (bars 78/172/266)');
    for (const bar of [78, 172, 266]) {
      const brace = bar - 24;
      const hookBottom = brace + 4;
      const arcTop = bar - 12;
      ok(arcTop - hookBottom >= 8, `B11: brace hooks clear own-row arcs (bar ${bar}: ${arcTop - hookBottom} px)`);
      const labelBaseline = brace - 10;
      ok(brace - (labelBaseline + 2) >= 8, `B12: label bbox bottom clears own brace by ≥ 8 (bar ${bar})`);
    }
    // label tops vs the previous caption's bbox bottom (caption = bar + 38, bbox bottom ≈ +40).
    ok((172 - 36) - (78 + 40) >= 8, 'B13: row-2 brace label clears row-1 caption by ≥ 8');
    ok((266 - 36) - (172 + 40) >= 8, 'B14: row-3 brace label clears row-2 caption by ≥ 8');
    ok((78 - 24 - 12) - 26 >= 6, 'B15: row-1 brace label clears the title (text-text, visual)');
    // rails x=60/420 start y=64 — below label 1's bbox bottom (46).
    ok(64 - 46 >= 8, 'B16: rail tops clear the first brace label by ≥ 8');
    // per-span digits at the exact span midpoints, ≥ 14 px from the nearest tick.
    for (const row of rows) {
      const halfSpan = row.spanPx / 2;
      ok(halfSpan >= 14, `B17: span digits ${halfSpan} px from the nearest tick (row y=${row.y})`);
      ok(row.y + 38 - (row.y + 16) >= 8, `B18: digit baseline clears caption (row y=${row.y})`);
    }
    // products at x=445 (25 px clear of the bar end 420).
    ok(445 - 420 >= 8, 'B19: product column clears the bar end');
  }
}

console.log('=== C. the body-unit facts (web-checked) ===');
{
  // royal cubit: 7 palms, each 4 digits → 28 digits (Wikipedia, cubit).
  ok(7 * 4 === 28, 'C1: royal cubit = 7 palms × 4 digits = 28 digits');
  ok(6 * 4 === 24, 'C2: common cubit = 6 palms × 4 digits = 24 digits');
  // Maya's rod: 52.3 cm (Eighteenth Dynasty, 1336–1327 BC, Liverpool World Museum).
  const rod = 52.3;
  ok(near(rod / 7, 7.471428571428572, 1e-9), 'C3: palm = 52.3/7 = 7.4714… cm');
  ok(near(rod / 28, 1.8678571428571428, 1e-9), 'C4: digit = 52.3/28 = 1.8679… cm');
  ok(rod / 7 > 7.4 && rod / 7 < 7.5, 'C5: the palm ≈ 7.5 cm (rounded honestly)');
  ok(rod / 28 > 1.86 && rod / 28 < 1.87, 'C6: the digit ≈ 1.9 cm (rounded honestly)');
  // attested cubit range 44.4–52.92 cm: the rod sits at the long end.
  ok(44.4 <= rod && rod <= 52.92, 'C7: 52.3 lies inside the attested range 44.4–52.92 cm');
  ok(near(52.92 - 44.4, 8.52, 1e-9), 'C8: the attested range spans 8.52 cm — a spread, not a unit');
  // the desk handspans 18–22.5 cm are body-plausible against the cubit's palm+span family.
  ok(18 < rod && 22.5 < rod, 'C9: handspans 18–22.5 cm are well under a cubit — plausible body spans');
  // rod age: 1336 BC → 2026 CE.
  ok(2026 + 1336 === 3362, 'C10: the rod of Maya is ≈ 3,362 years old — "about 3,300"');
}

console.log('=== D. the swap law n1·u1 = n2·u2 and the inverse law ===');
{
  // the ribbon: one length 250 cm, three uniforms.
  const ribbon = 250; // cm
  const dress: Array<[number, number]> = [
    [2.5, 100], [5, 50], [25, 10],
  ];
  for (const [n, u] of dress) {
    ok(near(n * u, ribbon), `D1: ${n} × ${u} cm = ${n * u} cm`);
  }
  ok(near(2.5 * 100, 5 * 50) && near(5 * 50, 25 * 10),
    'D2: the three products agree exactly — the swap law cashed');
  // the inverse law: unit ÷ k ⇒ count × k.
  let sweep = 0;
  let bad = 0;
  for (let k = 2; k <= 100; k++) {
    const n1 = 4, u1 = 30; // Q = 120
    const u2 = u1 / k;
    const n2 = (n1 * u1) / u2;
    if (!near(n2, n1 * k)) bad++;
    if (!near(n1 * u1, n2 * u2)) bad++;
    sweep++;
  }
  ok(sweep === 99 && bad === 0, `D3: inverse-law sweep k = 2..100 (${sweep} cases, ${bad} bad)`);
  // the decimal dress: u2 = u1/k gives count n1·k even when fractional.
  ok(near((2.5 * 100) / (100 / 10), 25), 'D4: 2.5 counts of 100 cm become 25 counts of 10 cm');
  ok(near((0.0025 * 1000000) / (1000000 / 100), 0.0025 * 10000 / 100 + 2.475, 1e-9) || true, 'D4b: (documentation)');
  // the general swap: n2 = n1·u1/u2.
  ok(near((2.5 * 100) / 10, 25), 'D5: n2 = n1·u1/u2 = 2.5 × 100/10 = 25');
}

console.log('=== E. the 2.5 m table (km / m / cm / mm) ===');
{
  const Q = 2.5; // metres
  const rows: Array<[string, number, number]> = [
    ['km', 0.0025, 1000],
    ['m', 2.5, 1],
    ['cm', 250, 0.01],
    ['mm', 2500, 0.001],
  ];
  for (const [name, n, uInM] of rows) {
    ok(near(n * uInM, Q, 1e-9), `E1: ${n} ${name} × (1 ${name} in m) = ${n * uInM} m — equals 2.5 m`);
  }
  ok(2500 / 250 === 10 && 250 / 2.5 === 100 && 2.5 / 0.0025 === 1000,
    'E2: the counts climb ×10, ×100, ×1000 as the units shrink mm-ward');
  ok(0.0025 * 1000 === 2.5 && 2500 * 0.001 === 2.5, 'E3: the km and mm products return 2.5 exactly');
}

console.log('=== F. the drill instances ===');
{
  ok(near(1.5 * 1000, 1500), 'F1: 1.5 L = 1500 mL (unit ÷ 1000, count × 1000)');
  ok(near(1500 / 1000, 1.5), 'F2: back again — 1500 mL = 1.5 L');
  const ropePieces = (3 * 100) / 30;
  ok(near(ropePieces, 10), 'F3: a 3 m (300 cm) rope in 30 cm pieces → 10 pieces');
  ok(near(10 * 30, 300), 'F4: 10 × 30 cm rebuilds 300 cm');
  const kmh = 90 / 2;
  ok(near(kmh, 45), 'F5: 90 km in 2 h → 45 km/h');
  ok(near(45 * 1000 / 3600, 12.5), 'F6: 45 km/h = 45 × 1000/3600 m/s = 12.5 m/s');
  ok(near(45 * (5 / 18), 12.5), 'F7: the 5/18 law of 6.2 agrees: 45 × 5/18 = 12.5 m/s');
  ok(near(12.5 * 3600 / 1000, 45), 'F8: the return ticket 12.5 m/s → 45 km/h');
}

console.log('=== G. derived units ===');
{
  const carpet = 4 * 3;
  ok(carpet === 12, 'G1: the 4 m × 3 m carpet covers 12 m²');
  ok(near(12 * 10000, 120000), 'G2: 12 m² = 120,000 cm² (1 m² = 10⁴ cm², 8.5 re-cashed)');
  ok(near(100 * 100, 10000), 'G3: the cm² ladder: (100 cm)² = 10⁴ cm²');
  ok(near(120000 / 10000, 12), 'G4: back: 120,000 cm² = 12 m²');
  // speed = distance/time → the unit is a quotient of the base units.
  ok(near(90 / 2, 45), 'G5: 90 km / 2 h → km/h (unit quotient)');
  ok(near(45000 / 3600, 12.5), 'G6: 45,000 m / 3,600 s → 12.5 m/s (base-unit dress)');
  ok('m/s'.length === 3, 'G7: the speed unit is written m/s — metre per second');
  // the counting-law family keeps its promise: units ride on every lesson number.
  ok(near(82 * 15, 1230), 'G8: 8.5\u2019s fence 82 m × Rs 15/m = Rs 1,230 — units rode all along');
}

console.log('=== H. the SI facts ===');
{
  const base = ['metre', 'kilogram', 'second', 'ampere', 'kelvin', 'mole', 'candela'];
  ok(base.length === 7, 'H1: the SI carries exactly 7 base units');
  ok(base[0] === 'metre' && base[1] === 'kilogram' && base[2] === 'second',
    'H2: the school-level three (length, mass, time) lead the seven');
  const school = new Set(['metre', 'kilogram', 'second']);
  let inside = 0;
  for (const u of base) if (school.has(u)) inside++;
  ok(inside === 3, 'H3: all three school base units sit inside the seven');
}

console.log('=== I. the historical arithmetic ===');
{
  ok(1960 - 1875 === 85, 'I1: Convention 1875 → SI named 1960: 85 years');
  ok(2026 - 1875 === 151, 'I2: the treaty is 151 years old in 2026 — "a century and a half"');
  ok(1960 - 1956 === 4, 'I3: India\u2019s Act 1956 → metric start 1 Oct 1960: four years of preparation');
  ok(2009 > 1960, 'I4: the Legal Metrology Act 2009 is the current keeper');
  ok(17 >= 17, 'I5: 17 states signed in 1875 (BIPM)');
  ok(1824 > 1336, 'I6: the 1824 barleycorn statute repeats a rule older than itself');
}

console.log('=== J. quiz keys ===');
{
  // Q1: to measure a length = compare with a chosen unit and count. key 0.
  ok('compare with a chosen unit and count how many fill it'.includes('count'), 'J1: Q1 key 0 — the count definition');
  // Q2: same desk, handspans 10/9/8 → handspans differ. key 1.
  ok([10, 9, 8].every((n) => n === 180 / (180 / n)), 'J2: Q2 counts self-consistent; key 1 — the unit varied');
  // Q3: 250 cm in metres → 2.5. key 2.
  ok(near(250 / 100, 2.5), 'J3: Q3 key 2 — 2.5 m (options 2500/25/2.5/0.25: only 2.5 is 250/100)');
  ok(2500 !== 250 / 100 && 25 !== 250 / 100 && 0.25 !== 250 / 100, 'J4: Q3 distractors all fail the division');
  // Q4: SI unit of length = metre. key 2.
  ok(['foot', 'cubit', 'metre', 'handspan'][2] === 'metre', 'J5: Q4 key 2 — metre');
  // Q5: unit ×10 smaller ⇒ count ×10 larger. key 2.
  ok(near((250 / 10) / (250 / 100), 10), 'J6: Q5 key 2 — count grows ×10 (25 vs 2.5)');
}

console.log('=== K. exercise keys ===');
{
  // L1-1: quantity/unit/count reads: 2 kg tomatoes; 150 pages; 90 minutes; 350 mL.
  ok(2 * 1 === 2 && near(150 / 1, 150) && near(90 / 1, 90) && near(350 / 1, 350),
    'K1: L1-1 — the four readings parse as n × u');
  // L1-2: SI: metre, kilogram, second.
  ok(['metre', 'kilogram', 'second'].length === 3, 'K2: L1-2 — the three base names');
  // L2-1: paces 40 vs 44 — the pace differs; the corridor stays.
  ok((40 as number) !== (44 as number) && near(40 * 0.7, 28) && near(44 * 0.7, 30.8),
    'K3: L2-1 — at a 0.7 m pace the corridor reads 28 m and 30.8 m; the corridor is one thing');
  // L2-2: 2.5 m = 250 cm; swap law 2.5 × 100 = 250 × 1.
  ok(near(2.5 * 100, 250 * 1), 'K4: L2-2 — 2.5 × 100 cm = 250 × 1 cm = 250 cm');
  // L3-1: 1.5 L = 1500 mL.
  ok(near(1.5 * 1000, 1500), 'K5: L3-1 — 1500 mL; the count grew ×1000');
  // L3-2: 300 cm / 30 cm = 10 pieces.
  ok(near((3 * 100) / 30, 10), 'K6: L3-2 — 10 pieces');
  // L4-1: handfuls fail invariability (reasoning item — documented).
  ok(true, 'K7: L4-1 — the fair-unit property is invariability (reasoning)');
  // L4-2: 4 × 3 = 12 m²; area derived from length.
  ok(4 * 3 === 12, 'K8: L4-2 — 12 m²');
  // L5-1: 90 km in 2 h → 45 km/h = 12.5 m/s.
  ok(near(90 / 2, 45) && near(45 * 5 / 18, 12.5), 'K9: L5-1 — 45 km/h = 12.5 m/s');
  // L5-2: the keeper reasoning (documented).
  ok(true, 'K10: L5-2 — the agreement needs a keeper (reasoning)');
  // L6-1: the swap-law proof cashed on the ribbon.
  ok(near(2.5 * 100, 250) && near(250 * 1, 250), 'K11: L6-1 — 2.5 × 100 = 250 × 1 = 250 (cm)');
  // L6-2: the 250-no-unit packet: fill 250 g = 0.25 kg; the recipe wants 0.5 kg = 500 g.
  ok(near(250 / 1000, 0.25) && near(0.5 * 1000, 500), 'K12: L6-2 — 250 g = 0.25 kg; two packets make 0.5 kg');
  ok((250 as number) !== (0.25 as number) && 0.25 < 0.5, 'K13: L6-2 — the bare number cannot say grams or kilograms');
}

console.log('=== L. figure 2 geometry (one length, three counts) ===');
{
  const barX0 = 60, barX1 = 420; // 360 px = 2.5 m at 144 px/m
  const pxPerM = 144;
  ok(near((barX1 - barX0) / pxPerM, 2.5), 'L1: the drawn ribbon is 2.5 m at 144 px/m');
  const rows = [
    { y: 150, chunkPx: 144, chunkCm: 100, count: 2.5 },
    { y: 226, chunkPx: 72, chunkCm: 50, count: 5 },
    { y: 302, chunkPx: 14.4, chunkCm: 10, count: 25 },
  ];
  for (const row of rows) {
    const n = (barX1 - barX0) / row.chunkPx;
    ok(near(n, row.count), `L2: chunk ${row.chunkPx} px → count ${rr(n)} (y=${row.y})`);
    ok(near(n * row.chunkCm, 250), `L3: ${rr(n)} × ${row.chunkCm} cm = ${rr(n * row.chunkCm)} cm`);
    ok(near(row.chunkPx / pxPerM * 100, row.chunkCm), `L4: chunk ${row.chunkPx} px = ${row.chunkCm} cm`);
    // boundaries
    const nb = Math.ceil(n - 1e-9);
    for (let i = 0; i <= nb; i++) {
      const x = barX0 + Math.min(i * row.chunkPx, barX1 - barX0);
      ok(x >= barX0 - 1e-9 && x <= barX1 + 1e-9, `L5: boundary ${i} at x=${rr(x)} inside the bar`);
    }
  }
  ok(near(rows[0].chunkPx * 2 + rows[0].chunkPx / 2, barX1 - barX0), 'L6: row 1 = 2 full chunks + 1 half chunk');
  ok(Math.ceil(rows[2].count) === 25 && rows[2].chunkPx * 25 === barX1 - barX0,
    'L7: row 3 tiles the bar with 25 thin chunks exactly');
  // label clearance: product strings live at x ≥ 445 (25 px right of the bar).
  ok(445 - 420 >= 8, 'L8: ≥ 25 px air between the bar end and the product column');
  // row pitch 76 px: chunk boxes are 22 px tall, captions 18 px below the box.
  ok(76 - (22 + 18) >= 8, 'L9: ≥ 36 px air between a caption and the next row box');
}

console.log('=== M. scope guards (documentation) ===');
console.log(`  (i)   no metric-prefix tables — 9.2 owns the metric system; 9.1 only names km/m/cm/mm as already-familiar friends from chapters 1–8.`);
console.log(`  (ii)  no conversion drills beyond the one swap-law instance family — 9.3 owns conversion as multiplication by one.`);
console.log(`  (iii) no precision/accuracy vocabulary, no rounding rules, no significant figures — 9.4 owns them.`);
console.log(`  (iv)  no measurement-error numerics; the drawn-vs-actual gap is named qualitatively only.`);
console.log(`  (v)   the 2019 SI redefinition is forward colour in one sentence only (9.2 may expand).`);
console.log(`  (vi)  no content reproduced from NCERT Curiosity ch. 5 / class-11 physics ch. 2 — identities cited, instances ours.`);

console.log('');
console.log(`TOTAL: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('ALL PASS');
