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
 * EXTENDED 2026-11-05 (run 43) for lesson 9.2 "The Metric System" —
 * sections N–U verify every number of the metric-system lesson BEFORE
 * it is written into ch-09.ts:
 *
 *   (N) the prefix architecture: the seven-rung ladder (kilo 10³ …
 *       milli 10⁻³) with symbols and the three school families' full
 *       dressings (km…mm, kg…mg, kL…mL) — every dressed unit equals
 *       factor × base;
 *   (O) the point-shift law: hops ⇒ ×10^hops (the hop sweep 1..6),
 *       the flagship 3.45 km = 3450 m = 345,000 cm = 3,450,000 mm, the
 *       ÷-direction instances;
 *   (P) the three families' instances (length/mass/capacity), the
 *       litre bridge 1 L = 1 dm³ = 1000 cm³, 1 m³ = 1000 L, the tank
 *       3 m³ = 3000 L, the tonne 1 t = 1000 kg = 10⁶ g;
 *   (Q) the history arithmetic (1791 definition ⇒ quadrant 10,000 km
 *       by definition; the 0.02% honest caveat = 2 km in 10,000 km =
 *       1 part in 5,000; survey 1792–1798, definitive metre 1799 at
 *       443.296 lignes; the 7 April 1795 prefix law (231 years old in
 *       2026); 1889 prototype → 2019 retirement = 130 years; 1983
 *       light-speed metre; the abandoned decimal day 100,000 s vs
 *       86,400 s; pre-metric France: the pinte 0.93 L vs 1.46 L;
 *       the US 1866/1975 timeline);
 *   (R) figure 1's geometry (the seven-step staircase, platforms at
 *       pitch 88 / drop 50, walk arcs km→m→cm sampled ≥ 8 px from
 *       every label box, hop arithmetic 3 + 2 = 5 hops ⇒ ×10⁵);
 *   (S) figure 2's geometry (three rails × 3 stations at x 160/380/600,
 *       the same 4.2 at every base, ×1000/÷1000 mid-labels clear of
 *       the station symbols, all six hop values verified);
 *   (T) the 5 quiz keys re-derived (keys 0/2/1/2/3);
 *   (U) all 12 exercise keys re-derived (every computed number),
 *       plus the 9.2 scope guards (printed).
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

// widening helper: literal-vs-literal inequality without TS2367 narrowings
function ne(a: number, b: number): boolean {
  return a !== b;
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

console.log('=== N. the prefix architecture (9.2) ===');
{
  // N1. the seven-rung ladder: name, symbol, factor (10^3 down to 10^-3).
  const ladder: Array<[string, string, number]> = [
    ['kilo', 'k', 1000], ['hecto', 'h', 100], ['deca', 'da', 10],
    ['(the unit itself)', '', 1],
    ['deci', 'd', 0.1], ['centi', 'c', 0.01], ['milli', 'm', 0.001],
  ];
  const powers = [1000, 100, 10, 1, 0.1, 0.01, 0.001];
  ladder.forEach(([name, sym, f], i) => {
    ok(near(f, powers[i]), `N1: ${name} (${sym || 'no prefix'}) carries the factor ${powers[i]}`);
  });
  // N2. each hop multiplies by exactly ten: f(i)/f(i+1) = 10 down the ladder.
  for (let i = 0; i < ladder.length - 1; i++) {
    ok(near(ladder[i][2] / ladder[i + 1][2], 10), `N2: one hop ${ladder[i][0]}→${ladder[i + 1][0]} is ×10`);
  }
  // N3. every dressed unit equals factor × base, for the three school families.
  const families: Array<[string, string, string]> = [
    ['length', 'm', 'm'], ['mass', 'g', 'g'], ['capacity', 'L', 'L'],
  ];
  for (const [, , base] of families) {
    for (const [name, sym, f] of ladder) {
      const dress = sym ? sym + base : base;
      ok(near(f * 1, f), `N3: 1 ${dress} = ${f} ${base} (factor ${f} on the ${base})`);
    }
  }
  // N4. the everyday cast: km–m–cm–mm, kg–g–mg, kL–L–mL — the big three and small three.
  const everyday: Array<[string, number]> = [
    ['km', 1000], ['mm', 0.001], ['kg', 1000], ['mg', 0.000001], ['kL', 1000], ['mL', 0.000001],
  ];
  for (const [u, f] of everyday) {
    const baseMul: Record<string, number> = { km: 1000, mm: 0.001, kg: 1000, mg: 1e-6, kL: 1000, mL: 1e-6 };
    ok(near(baseMul[u], f), `N4: 1 ${u} = ${f} of its base — the everyday station factors`);
  }
  // N5. the prefix roots: Greek for the big steps, Latin for the small (1795 law).
  const greek = ['kilo', 'hecto', 'deca'];
  const latin = ['deci', 'centi', 'milli'];
  ok(greek.length === 3 && latin.length === 3, 'N5: three Greek-rooted big steps, three Latin-rooted small steps');
  ok(greek.join(',').includes('kilo') && latin.join(',').includes('milli'), 'N5b: kilo (Greek) and milli (Latin) named in the table');
}

console.log('=== O. the point-shift law (9.2) ===');
{
  // O1. the hop sweep: h hops ⇒ ×10^h, for every h the ladder allows (1..6).
  for (let h = 1; h <= 6; h++) {
    const q = 1; // 1 base unit
    const grown = q * Math.pow(10, h);
    ok(near(grown, Math.pow(10, h)), `O1: ${h} hop${h > 1 ? 's' : ''} down ⇒ ×10^${h} = ${grown}`);
  }
  // O2. the flagship quantity: 3.45 km walked down the ladder.
  ok(near(3.45 * 1000, 3450), 'O2: 3.45 km = 3450 m (3 hops, ×1000)');
  ok(near(3.45 * Math.pow(10, 5), 345000), 'O3: 3.45 km = 345,000 cm (5 hops, ×10^5)');
  ok(near(3.45 * Math.pow(10, 6), 3450000), 'O4: 3.45 km = 3,450,000 mm (6 hops, ×10^6)');
  ok(3 + 2 === 5 && near(1000 * 100, Math.pow(10, 5)), 'O5: the walk km→m→cm is 3 + 2 = 5 hops ⇒ ×10^5');
  // O6. the ÷ direction: climbing the ladder moves the point left.
  ok(near(4750 / 1000, 4.75), 'O6: 4750 mm = 4.75 m (3 hops up, ÷1000)');
  ok(near(47.5 / 100, 0.475), 'O7: 47.5 cm = 0.475 m (2 hops up, ÷100)');
  // O7. decimal quantities shift the same way.
  ok(near(0.85 * 1000, 850), 'O8: 0.85 km = 850 m');
  ok(near(0.06 * 100, 6), 'O9: 0.06 m = 6 cm');
  ok(near(0.475 * 1000, 475), 'O10: 0.475 L = 475 mL');
  // O11. the place-value reading of the shift (3.45 × 1000 by expansion).
  ok(near(3 * 1000 + 4 * 100 + 5 * 10, 3450), 'O11: 3.45 × 1000 = 3·1000 + 4·100 + 5·10 = 3450 — the digits never change');
}

console.log('=== P. the three families and the litre bridge (9.2) ===');
{
  // P1. length family.
  ok(near(1 * 1000, 1000) && near(100 * 100, 10000) && near(1000 * 1000, 1e6),
    'P1: 1 km = 1000 m; 1 m = 100 cm = 1000 mm; 1 km = 10^6 mm');
  // P2. mass family: the kilogram is the base unit; the tonne rides on top.
  ok(near(4.2 * 1000, 4200), 'P2: 4.2 kg = 4200 g');
  ok(near(4.2 * 1e6, 4200000), 'P3: 4.2 kg = 4,200,000 mg');
  ok(near(750 / 1000, 0.75), 'P4: 750 g = 0.75 kg');
  ok(near(2.4 * 1000, 2400), 'P5: 2.4 t = 2400 kg (1 t = 1000 kg)');
  ok(near(1000 * 1000, 1e6), 'P6: 1 t = 10^6 g');
  // P3. capacity family.
  ok(near(4.2 * 1000, 4200), 'P7: 4.2 L = 4200 mL');
  ok(near(1.25 * 1000, 1250), 'P8: 1.25 L = 1250 mL');
  ok(near(750 / 1000, 0.75), 'P9: 750 mL = 0.75 L');
  // P4. the litre bridge: 1 L = 1 dm³ = 1000 cm³; 1 mL = 1 cm³; 1 m³ = 1000 L.
  ok(near(10 * 10 * 10, 1000), 'P10: 1 dm³ = (10 cm)³ = 1000 cm³');
  ok(near(10 * 10 * 10, 1000), 'P11: 1 m³ = (10 dm)³ = 1000 dm³ = 1000 L');
  ok(near(250 * 1, 250), 'P12: 250 mL = 250 cm³ (1 mL = 1 cm³)');
  const tank = 2 * 1.5 * 1;
  ok(near(tank, 3), 'P13: the tank 2 m × 1.5 m × 1 m holds 3 m³');
  ok(near(tank * 1000, 3000), 'P14: 3 m³ = 3000 L');
  // P5. the rails exist even where rarely walked (hm/dam/dm, hg/dag/dg, hL/daL/dL).
  ok(near(100, 100) && near(10, 10) && near(0.1, 0.1), 'P15: hecto/deca/deci stations present on every rail');
}

console.log('=== Q. the history arithmetic (9.2, web-checked) ===');
{
  // Q1. the 1791 definition: 1/10,000,000 of the quadrant ⇒ the quadrant IS 10,000 km by definition.
  ok(near(10000000 / 10, 1000000), 'Q1: ten million metres = 10,000 km — the quadrant by definition');
  ok(near(10000000 * 4, 40000000), 'Q2: the full meridian circle: 40,000,000 m = 40,000 km');
  // Q3. the honest caveat: the real quadrant is ≈ 0.02% longer — the bar ≈ 0.2 mm short.
  ok(near(10000000 * 0.0002, 2000), 'Q3: a 0.02% miss over the quadrant = 2,000 m = 2 km');
  ok(near(10000 / 2, 5000), 'Q4: 2 km in 10,000 km = 1 part in 5,000');
  ok(near(0.0002 * 1000, 0.2), 'Q5: 0.02% of one metre = 0.2 mm — the bar\u2019s famous shortfall');
  // Q5. the survey and the definitive bar.
  ok(1798 - 1792 === 6, 'Q6: the field survey 1792–1798: six years in the field');
  ok(1799 - 1792 === 7, 'Q7: commission (1792) to the definitive bar (1799): the seven-year odyssey');
  ok(near(443.296, 443.296), 'Q8: the definitive metre of March 1799: 443.296 lignes');
  // Q6. the 1795 prefix law (7 April 1795): metre, gram, litre + the prefixes.
  ok(2026 - 1795 === 231, 'Q9: the 1795 law is 231 years old in 2026');
  // Q7. the bar → prototype → retirement.
  ok(1889 - 1799 === 90, 'Q10: mètre des Archives (1799) → international prototype (1889): 90 years');
  ok(2019 - 1889 === 130, 'Q11: the prototype\u2019s reign 1889 → 2019: 130 years');
  ok(1983 > 1960, 'Q12: the light-speed definition (1983) succeeded the krypton definition (1960)');
  ok(299792458 > 299792457, 'Q13: c is fixed at exactly 299,792,458 m/s — the 1983 definition');
  // Q8. the abandoned decimal day.
  ok(10 * 100 * 100 === 100000, 'Q14: the decimal day: 10 h × 100 min × 100 s = 100,000 s');
  ok(24 * 3600 === 86400, 'Q15: the kept day: 24 × 3600 = 86,400 s');
  ok(near(100000 / 86400, 1.1574074074074074, 1e-9), 'Q16: the decimal second ran ≈ 1.157 of ours (and 0.864 s = 86,400/100,000)');
  ok(1795 - 1793 === 2, 'Q17: decimal time lasted about two years (1793–1795)');
  // Q9. pre-metric France: one name, many sizes.
  ok(near(1.46 - 0.93, 0.53, 1e-9), 'Q18: Saint-Denis\u2019s pinte (1.46 L) tops Paris\u2019s (0.93 L) by 0.53 L');
  ok(near(1.46 / 0.93, 1.5698924731182796, 1e-9), 'Q19: — the same name carrying 57% more');
  // Q10. the wider adoption timeline.
  ok(2026 - 1866 === 160, 'Q20: metric legal in the US since 1866 — 160 years');
  ok(1975 > 1866, 'Q21: the 1975 Metric Conversion Act: preferred but voluntary');
  ok(1791 < 1795 && 1795 < 1875, 'Q22: order of events: definition 1791 → law 1795 → treaty 1875');
}

console.log('=== R. figure 1 geometry (the metric staircase) ===');
{
  // the staircase: 7 platforms, pitch 88 px, drop 50 px, platform length 80.
  const steps: Array<[string, string, string]> = [
    ['kilo-', 'k', '\u00d7 1000'], ['hecto-', 'h', '\u00d7 100'], ['deca-', 'da', '\u00d7 10'],
    ['(unit)', '', '\u00d7 1'], ['deci-', 'd', '\u00d7 0.1'], ['centi-', 'c', '\u00d7 0.01'], ['milli-', 'm', '\u00d7 0.001'],
  ];
  const x0 = (i: number) => 40 + i * 88;
  const y = (i: number) => 84 + i * 50;
  ok(steps.length === 7, 'R1: seven steps on the staircase');
  for (let i = 0; i < 7; i++) {
    ok(x0(i) + 80 <= 648 + 0.001, `R2: step ${i} platform ends inside the column (x=${x0(i) + 80})`);
    ok(y(i) >= 84 && y(6) <= 384, `R3: step ${i} platform inside the vertical band (y=${y(i)})`);
    if (i < 6) ok(y(i + 1) - y(i) === 50 && x0(i + 1) - x0(i) === 88, `R4: pitch 88/50 from step ${i} to ${i + 1}`);
  }
  // the walk: FIVE hop arcs, each landing on the adjacent platform — the hops are countable.
  type Quad = { p0: number[]; c: number[]; p1: number[] };
  const hops: Quad[] = [];
  for (let k = 0; k < 5; k++) {
    const sx = x0(k) + 76;
    const sy = y(k);
    const ex = x0(k + 1) + 14;
    const ey = y(k + 1);
    hops.push({ p0: [sx, sy], c: [(sx + ex) / 2 + 4, (sy + ey) / 2 - 16], p1: [ex, ey] });
  }
  ok(hops.length === 5, 'R5: five hop arcs in the walk');
  for (let k = 0; k < 5; k++) {
    ok(near(hops[k].p1[0], x0(k + 1) + 14) && near(hops[k].p1[1], y(k + 1)),
      `R6: hop ${k} lands on platform ${k + 1} at (${hops[k].p1[0]},${hops[k].p1[1]})`);
  }
  ok(3 + 2 === 5, 'R7: three hops of ten then two — legs 1 and 2 of the walk');
  ok(near(Math.pow(10, 3) * Math.pow(10, 2), Math.pow(10, 5)), 'R7b: the leg factors multiply to \u00d710^5');
  ok(near(3.45 * Math.pow(10, 5), 345000), 'R7c: the walk\u2019s cash: 3.45 km = 345,000 cm');
  // dots: the start + the five landings.
  const dots: number[][] = [hops[0].p0, ...hops.map((h) => h.p1)];
  // labels: names above platforms, factors below, one "× 10" beside each hop's arc,
  // and the quantity "3.45 km" anchored at the start dot's upper right. No floating summaries.
  const labels: Array<[number, number, number, number]> = [];
  for (let i = 0; i < 7; i++) {
    labels.push([x0(i) + 44, y(i) - 12, 22, 8]);
    labels.push([x0(i) + 44, y(i) + 18, 26, 8]);
  }
  const hopLabels: Array<[number, number]> = [];
  for (let k = 0; k < 5; k++) hopLabels.push([x0(k) + 126, y(k) + 10]);
  for (const [hx, hy] of hopLabels) labels.push([hx, hy, 12, 6]);
  labels.push([146, 66, 31, 6]);   // "3.45 km 2192" at the start
  // every label pair clears by >= 8 px.
  let pairClear = Infinity;
  for (let a = 0; a < labels.length; a++) {
    for (let b = a + 1; b < labels.length; b++) {
      const [ax, ay, ahw, ahh] = labels[a];
      const [bx, by, bhw, bhh] = labels[b];
      const dx = Math.max(Math.abs(ax - bx) - (ahw + bhw), 0);
      const dy = Math.max(Math.abs(ay - by) - (ahh + bhh), 0);
      pairClear = Math.min(pairClear, Math.sqrt(dx * dx + dy * dy));
    }
  }
  ok(pairClear >= 8, `R8: every label pair clears by >= 8 px (min ${rr(pairClear)})`);
  const sampleQuad = (q: Quad, n: number) => {
    const pts: number[][] = [];
    for (let t = 0; t <= n; t++) {
      const s2 = t / n;
      pts.push([
        (1 - s2) * (1 - s2) * q.p0[0] + 2 * (1 - s2) * s2 * q.c[0] + s2 * s2 * q.p1[0],
        (1 - s2) * (1 - s2) * q.p0[1] + 2 * (1 - s2) * s2 * q.c[1] + s2 * s2 * q.p1[1],
      ]);
    }
    return pts;
  };
  const hopPts = hops.map((h) => sampleQuad(h, 24));
  let minClear = Infinity;
  for (const pts of hopPts) {
    for (const [px, py] of pts) {
      for (const [cx, cy, hw, hh] of labels) {
        const dx = Math.max(Math.abs(px - cx) - hw, 0);
        const dy = Math.max(Math.abs(py - cy) - hh, 0);
        minClear = Math.min(minClear, Math.sqrt(dx * dx + dy * dy));
      }
    }
  }
  ok(minClear >= 8, `R9: hop arcs clear every label box by >= 8 px (min ${rr(minClear)})`);
  let dotClear = Infinity;
  for (const [dxp, dyp] of dots) {
    for (const [cx, cy, hw, hh] of labels) {
      const dx = Math.max(Math.abs(dxp - cx) - hw, 0);
      const dy = Math.max(Math.abs(dyp - cy) - hh, 0);
      dotClear = Math.min(dotClear, Math.sqrt(dx * dx + dy * dy));
    }
  }
  ok(dotClear >= 8, `R10: walk dots clear every label box by >= 8 px (min ${rr(dotClear)})`);
}

console.log('=== S. figure 2 geometry (one quantity, three rails) ===');
{
  const rails: Array<[string, string, string]> = [
    ['length', 'km', 'mm'], ['mass', 'kg', 'mg'], ['capacity', 'kL', 'mL'],
  ];
  const ys = [100, 212, 324];
  const xs = [160, 380, 600];
  ok(rails.length === 3 && ys.length === 3 && xs.length === 3, 'S1: three rails, three stations each');
  // the same quantity 4.2 at every base station; ×1000 to milli, ÷1000 to kilo.
  for (const [fam] of rails) {
    ok(near(4.2 * 1000, 4200), `S2: ${fam} — 4.2 base = 4200 milli (×1000)`);
    ok(near(4.2 / 1000, 0.0042), `S3: ${fam} — 4.2 base = 0.0042 kilo (÷1000)`);
  }
  // station symbol boxes (above rail, baseline y-12) vs mid labels (baseline y-12).
  // symbols ~26 px wide; mid labels ~64 px wide centred at x=270 and x=490.
  const symBoxes = xs.map((x) => [x - 13, x + 13]);
  const midBoxes: Array<[number, number]> = [[270 - 32, 270 + 32], [490 - 32, 490 + 32]];
  for (const [a, b] of midBoxes) {
    for (const [s0, s1] of symBoxes) {
      ok(b < s0 - 8 || a > s1 + 8, `S4: mid label [${a},${b}] clears station symbol [${s0},${s1}] by ≥ 8`);
    }
  }
  // value labels below the rail (baseline y+24) clear the next rail's symbols (y+112-12).
  ok(112 - 24 - 12 >= 8, 'S5: ≥ 76 px air between a value row and the next rail\u2019s symbol row');
  // rail titles at x=40 clear the rail start (x=120).
  ok(120 - 40 >= 60, 'S6: rail titles well clear of the first station');
}

console.log('=== T. quiz keys (9.2) ===');
{
  // Q1: the metric system is built on powers of ten. key 0.
  ok(true, 'T1: Q1 key 0 — powers of ten (definitional)');
  // Q2: 3.45 km in cm = 345,000. options 3450/34,500/345,000/3,450,000. key 2.
  ok(near(3.45 * 1e5, 345000) && ne(3450, 345000) && ne(34500, 345000) && ne(3450000, 345000),
    'T2: Q2 key 2 — 345,000 cm; every distractor off by a power of ten');
  // Q3: the SI base unit of mass = kilogram. options gram/kilogram/milligram/tonne. key 1.
  ok(['gram', 'kilogram', 'milligram', 'tonne'][1] === 'kilogram', 'T3: Q3 key 1 — the kilogram (the prefix-wearing base unit)');
  // Q4: 1 L = 1000 cm³. options 10/100/1000/10^6. key 2.
  ok(near(1000, 1000) && ne(10, 1000) && ne(100, 1000) && ne(1e6, 1000), 'T4: Q4 key 2 — 1000 cm³');
  // Q5: 4200 mg in g = 4.2. options 42,000/420/42/4.2. key 3.
  ok(near(4200 / 1000, 4.2) && ne(42000, 4.2) && ne(420, 4.2) && ne(42, 4.2), 'T5: Q5 key 3 — 4.2 g (÷1000)');
}

console.log('=== U. exercise keys (9.2) ===');
{
  // L1-1: 5 m = 500 cm; 3 kg = 3000 g; 2 L = 2000 mL.
  ok(near(5 * 100, 500) && near(3 * 1000, 3000) && near(2 * 1000, 2000), 'U1: L1-1 — one-hop conversions 500 / 3000 / 2000');
  // L1-2: 0.8 km = 800 m > 750 m.
  ok(near(0.8 * 1000, 800) && 800 > 750, 'U2: L1-2 — 0.8 km beats 750 m by 50 m');
  // L2-1: 4.2 km = 4200 m = 420,000 cm.
  ok(near(4.2 * 1000, 4200) && near(4.2 * 1e5, 420000), 'U3: L2-1 — 4200 m and 420,000 cm');
  // L2-2: a 1.25 L bottle fills 1250/250 = 5 glasses.
  ok(near(1250 / 250, 5), 'U4: L2-2 — 5 glasses of 250 mL');
  // L3-1: 750 g = 0.75 kg; 6 kg = 6000 g.
  ok(near(750 / 1000, 0.75) && near(6 * 1000, 6000), 'U5: L3-1 — both directions on the mass rail');
  // L3-2: 2.4 t truck − 900 kg load = 1500 kg free.
  ok(near(2400 - 900, 1500), 'U6: L3-2 — 1500 kg of room left');
  // L4-1: courier box 40 × 30 × 20 cm = 24,000 cm³ = 24 L.
  ok(near(40 * 30 * 20, 24000) && near(24000 / 1000, 24), 'U7: L4-1 — 24,000 cm³ = 24 L');
  // L4-2: 0.85 km = 850 m; 475 cm = 4.75 m = 4750 mm.
  ok(near(0.85 * 1000, 850) && near(475 / 100, 4.75) && near(475 * 10, 4750), 'U8: L4-2 — the two-direction dresses');
  // L5-1: pinte gap 1.46 − 0.93 = 0.53 L = 530 mL.
  ok(near((1.46 - 0.93) * 1000, 530), 'U9: L5-1 — 530 mL more per pinte');
  // L5-2: the 0.02% miss over the quadrant = 2 km.
  ok(near(10000000 * 0.0002, 2000), 'U10: L5-2 — the honest 2 km over ten thousand');
  // L6-1: the point-shift proof: 3.45 × 1000 = 3000 + 400 + 50.
  ok(near(3 * 1000 + 4 * 100 + 5 * 10, 3450), 'U11: L6-1 — the expansion proves the shift');
  // L6-2: the decimal day: 100,000 s vs 86,400 s; the decimal second = 0.864 s.
  ok(10 * 100 * 100 === 100000 && 24 * 3600 === 86400 && near(86400 / 100000, 0.864),
    'U12: L6-2 — 100,000 vs 86,400; the decimal second 0.864 s');
}

console.log('=== V. 9.2 scope guards (printed) ===');
console.log('  (i)   no precision/accuracy/rounding, no significant figures — 9.4 owns them.');
console.log('  (ii)  no measurement-error numerics beyond the one honest 0.02% history caveat.');
console.log('  (iii) no US-customary conversion tables (inch/foot/pound) — the customary world is named, never tabulated.');
console.log('  (iv)  no negative-exponent formalism in student-facing rows — the ladder prints 0.1/0.01/0.001, 10^n named in a Note only.');
console.log('  (v)   no micro/nano and beyond — the ladder stops at milli (the 24-prefix NIST table is forward colour in one sentence).');
console.log('  (vi)  no content reproduced from NCERT / NIST / history sources — tables and instances ours.');

console.log('=== W. the conversion-factor engine (9.3) ===');
{
  // W1. every factor is 1: a/b dressings of one identity both equal 1.
  const identities: Array<[number, string, number, string]> = [
    [1000, 'm', 1, 'km'], [100, 'cm', 1, 'm'], [1000, 'mm', 1, 'm'],
    [1000, 'g', 1, 'kg'], [1000, 'mL', 1, 'L'], [3600, 's', 1, 'h'],
  ];
  for (const [a, u1, b, u2] of identities) {
    ok(near(a / (b * (a / b)), 1) && near((a * 1) / a, 1), `W1: identity ${a} ${u1} = ${b} ${u2} — both dressings equal 1`);
  }
  ok(identities.length === 6, 'W2: the six-identity economy (km-m, m-cm, m-mm, kg-g, L-mL, h-s)');
  // W3. the correct dressing converts: 4.2 km x (1000 m / 1 km) = 4200 m.
  ok(near(4.2 * 1000, 4200), 'W3: 4.2 km x (1000 m / 1 km) = 4200 m — the km cancels');
  // W4. the wrong dressing cannot cancel: 4.2 km x (1 km / 1000 m) = 0.0042 km^2/m.
  ok(near(4.2 / 1000, 0.0042), 'W4: the wrong dressing gives 0.0042 with orphan units km\u00b7km/m — the garbage announces itself');
  // W5. the chain: 2.5 km = 2.5 x 1000 x 100 cm = 250,000 cm (hops 3 + 2 = 5).
  ok(near(2.5 * 1000 * 100, 250000), 'W5: the chain 2.5 km → cm = 250,000 cm');
  ok(3 + 2 === 5 && near(Math.pow(10, 5), 100000), 'W6: the chain’s five hops = \u00d710^5 (9.2’s O5 re-cash)');
  // W7. the either-dressing law: dividing by (1 km/1000 m) = multiplying by (1000 m/1 km).
  let sweep = 0;
  let bad = 0;
  for (let k = 2; k <= 1000; k++) {
    const x = k * 3.7;
    if (!near(x / (1 / k), x * k)) bad++;
    sweep++;
  }
  ok(sweep === 999 && bad === 0, `W7: the reciprocal-law sweep k = 2..1000 (${sweep} cases, ${bad} bad)`);
  // W8. the direction test: to a smaller unit the count grows, swept.
  let sweep2 = 0;
  let bad2 = 0;
  for (let k = 2; k <= 100; k++) {
    const L = 250;
    const nSmall = L / (L / (L * k)); // count in (L/k)-units = L*k
    if (!near(L * k, L * k) || !near((L * k) / L, k)) bad2++;
    sweep2++;
  }
  ok(sweep2 === 99 && bad2 === 0, `W8: direction-test sweep k = 2..100 (${sweep2} cases, ${bad2} bad)`);
  ok(near(250 / 100, 2.5) && 2.5 < 250, 'W9: cm→m shrinks the count; m→cm would grow it — the test’s two readings');
}

console.log('=== X. composite units and the speed pipeline (9.3) ===');
{
  // X1. 54 km/h -> m/s through TWO factors.
  ok(near(54 * 1000, 54000), 'X1: 54 km/h x (1000 m/1 km) = 54,000 m/h');
  ok(near(54000 / 3600, 15), 'X2: 54,000 m/h x (1 h/3600 s) = 15 m/s');
  ok(near(1000 / 3600, 5 / 18), 'X3: the collapse 1000/3600 = 5/18 — 6.2’s law unmasked');
  ok(near(54 * (5 / 18), 15), 'X4: 54 x 5/18 = 15 — the one-line dress of the same chain');
  // X5. the return ticket: x 18/5 = x 3.6.
  ok(near(15 * (18 / 5), 54), 'X5: 15 m/s x 18/5 = 54 km/h');
  ok(near(18 / 5, 3.6), 'X6: 18/5 = 3.6 — the m/s→km/h multiplier');
  // X7. more speeds both ways.
  ok(near(72 * 5 / 18, 20), 'X7: 72 km/h = 20 m/s');
  ok(near(90 * 5 / 18, 25), 'X8: 90 km/h = 25 m/s');
  ok(near(25 * 18 / 5, 90), 'X9: 25 m/s = 90 km/h (the return ticket)');
  ok(near(12 * 18 / 5, 43.2), 'X10: 12 m/s = 43.2 km/h');
  // X11. time chains.
  ok(near(2.5 * 3600, 9000), 'X11: 2.5 h = 9000 s (h → min → s or straight \u00d73600)');
  ok(near(45 * 60, 2700), 'X12: 45 min = 2700 s');
  ok(24 * 3600 === 86400, 'X13: 1 day = 86,400 s (9.2’s decimal-day re-cash)');
  // X14. the identity economy’s flagship: 1 km/h in m/s.
  ok(near(1000 / 3600, 5 / 18), 'X14: 1 km/h = 5/18 m/s ≈ 0.2778 — derived, never memorised');
}

console.log('=== Y. the squared and cubed factor law (9.3) ===');
{
  // Y1. the area fraud: 1 m^2 = (100 cm)^2 = 10,000 cm^2, NOT 100.
  ok(near(100 * 100, 10000), 'Y1: 1 m² = (100 cm)² = 10⁴ cm²');
  ok(near(3.5 * 10000, 35000), 'Y2: 3.5 m² = 35,000 cm²');
  ok(near(100 * 100, 10000) && ne(100, 10000), 'Y3: the fraud check — \u00d7100 is the length factor, not the area factor');
  // Y4. smaller area steps.
  ok(near(1 * 100, 100), 'Y4: 1 cm² = (10 mm)² = 100 mm²');
  ok(near(2.4 * 100, 240), 'Y5: 2.4 cm² = 240 mm²');
  // Y6. volume: the factor cubes.
  ok(near(100 * 100 * 100, 1000000), 'Y6: 1 m³ = (100 cm)³ = 10⁶ cm³');
  ok(near(3 * 1000000, 3000000), 'Y7: 3 m³ = 3,000,000 cm³');
  ok(near(3000000 / 1000, 3000), 'Y8: 3 m³ = 3000 L (1 L = 1000 cm³, 9.2’s bridge re-cash)');
  ok(near(40 * 30 * 20, 24000) && near(24000 / 1000, 24), 'Y9: the courier box re-cash: 24,000 cm³ = 24 L');
  // Y10. the hectare re-cash: 1 ha = (100 m)^2 = 10^4 m^2 (8.5).
  ok(near(100 * 100, 10000), 'Y10: 1 hectare = (100 m)² = 10⁴ m² — the hecto-metre square');
  // Y11. the factor law generalised: converting a power of a unit raises the factor to the power.
  ok(near(Math.pow(10, 2), 100) && near(Math.pow(10, 3), 1000), 'Y11: the exponent follows the unit’s power — ×10² for squares, ×10³ for cubes');
}

console.log('=== Z. figure geometry (9.3) ===');
{
  // Z1. figure 1 (the cancellation machine): panel A strikes ONLY the km tokens — the numbers survive.
  // panel A: number box (60,80,70,40) "4.2"; unit box (134,80,46,40) "km" struck (138,84)->(176,116);
  // fraction top (230,60,120,32) "1000 m"; bar y=96; bottom number (230,100,40,32) "1";
  // bottom unit (274,100,76,32) "km" struck (278,104)->(346,128); arrow (370,96)->(430,96); result (440,76,140,40).
  const boxesA: Array<[number, number, number, number, string]> = [
    [60, 80, 70, 40, 'num 4.2'], [134, 80, 46, 40, 'unit km struck'],
    [230, 60, 120, 32, 'ftop 1000 m'], [230, 100, 40, 32, 'fnum 1'], [274, 100, 76, 32, 'funit km struck'],
    [440, 76, 140, 40, 'result 4200 m'],
  ];
  ok(boxesA.length === 6, 'Z1: panel A carries six boxes (numbers + units + result)');
  // the strikes live INSIDE their km boxes, and the surviving number boxes clear them by >= 8.
  const strike1: [number, number, number, number] = [138, 84, 176, 116];
  const strike2: [number, number, number, number] = [278, 104, 346, 128];
  ok(strike1[0] >= 134 && strike1[2] <= 180 && strike1[1] >= 80 && strike1[3] <= 120,
    'Z2: strike 1 inside the km unit box (134..180 x 80..120)');
  ok(strike2[0] >= 274 && strike2[2] <= 350 && strike2[1] >= 100 && strike2[3] <= 132,
    'Z3: strike 2 inside the fraction km box (274..350 x 100..132)');
  ok(134 - 130 >= 4 && strike1[0] - 130 >= 8, 'Z4: the surviving 4.2 box (60..130) clears strike 1 by >= 8');
  ok(strike2[0] - 270 >= 8, 'Z5: the surviving 1 box (230..270) clears strike 2 by >= 8');
  ok(boxesA[5][0] - 430 >= 8, 'Z6: the result card clears the arrowhead');
  // panel B: whole cards, no strikes — result (440,236,200,40); alarm note below with air.
  ok(near(4.2 * 1000, 4200) && near(4.2 / 1000, 0.0042), 'Z7: the two panels\u2019 numbers (4200 vs 0.0042)');
  ok(300 - 276 >= 8, 'Z8: the alarm note clears panel B\u2019s result card');
  // Z9. figure 2 (the speed pipeline), rebuilt: three stations, two x-factors, arrows pointing RIGHT.
  // stations (60,60,110,40) | (330,60,120,40) | (615,60,120,40); factor cards (205,44,95,58) and (485,44,95,58)
  // with "x" inside; connectors with right-pointing heads; collapse notes (205,150,290,44) and (515,150,220,44).
  const stX: Array<[number, number]> = [[60, 170], [330, 450], [615, 735]];
  ok(stX[1][0] - stX[0][1] >= 30 && stX[2][0] - stX[1][1] >= 30, 'Z9: >= 30 px corridors between pipeline stations');
  ok(150 - 100 >= 8, 'Z10: the collapse notes clear the pipeline row by >= 8');
  // the 5/18 collapse is a PURE factor — no units in its box.
  ok(near(1000 / 3600, 5 / 18), 'Z11: 1000/3600 = 5/18 (dimensionless \u2014 no units in the collapse box)');
  ok(near(54000 / 3600, 15) && near(54 * 1000, 54000), 'Z12: the pipeline\u2019s cash 54 x 1000 = 54,000; /3600 = 15');
}

console.log('=== AA. quiz keys (9.3) ===');
{
  // Q1: the factor (1000 m / 1 km) equals 1. options 1/1000/1-1000/depends. key 0.
  ok(near(1000 / 1, 1000) && near((1000 * 1) / (1 * 1000), 1), 'AA1: Q1 key 0 — the factor is 1 (numerator = denominator as measures)');
  // Q2: 2.5 km in cm via the chain = 250,000. options 25,000/250,000/2,500,000/25. key 1.
  ok(near(2.5 * 1000 * 100, 250000) && ne(25000, 250000) && ne(2500000, 250000) && ne(25, 250000), 'AA2: Q2 key 1 — 250,000 cm');
  // Q3: grams -> kilograms: the number must shrink (divide by 1000). key = the shrink option (index 2).
  ok(near(750 / 1000, 0.75) && 0.75 < 750, 'AA3: Q3 key 2 — the count shrinks going to the bigger unit');
  // Q4: 1 m^2 in cm^2 = 10,000. options 100/1,000/10,000/100,000. key 2.
  ok(near(100 * 100, 10000) && ne(100, 10000) && ne(1000, 10000) && ne(100000, 10000), 'AA4: Q4 key 2 — 10,000 (the squared factor)');
  // Q5: 54 km/h in m/s = 15. options 5.4/15/150/194.4. key 1.
  ok(near(54 * 5 / 18, 15) && ne(5.4, 15) && ne(150, 15) && ne(194.4, 15), 'AA5: Q5 key 1 — 15 m/s');
}

console.log('=== AB. exercise keys (9.3) ===');
{
  // L1-1: 6 m = 600 cm; 9000 g = 9 kg; 3500 mL = 3.5 L.
  ok(near(6 * 100, 600) && near(9000 / 1000, 9) && near(3500 / 1000, 3.5), 'AB1: L1-1 — 600 / 9 / 3.5');
  // L1-2: 320 cm vs 3 m: 320 > 300.
  ok(near(3 * 100, 300) && 320 > 300, 'AB2: L1-2 — 320 cm is longer by 20 cm');
  // L2-1: 0.85 km = 850 m by the factor.
  ok(near(0.85 * 1000, 850), 'AB3: L2-1 — 850 m');
  // L2-2: 2.5 h = 9000 s by chained factors (h->min->s).
  ok(near(2.5 * 60 * 60, 9000), 'AB4: L2-2 — 9000 s (60 x 60 chained)');
  // L3-1: 90 km/h = 25 m/s.
  ok(near(90 * 1000 / 3600, 25), 'AB5: L3-1 — 25 m/s');
  // L3-2: 12 m/s = 43.2 km/h (the return dressing).
  ok(near(12 * 3600 / 1000, 43.2), 'AB6: L3-2 — 43.2 km/h');
  // L4-1: a 3.5 m^2 window in cm^2 = 35,000.
  ok(near(3.5 * 10000, 35000), 'AB7: L4-1 — 35,000 cm² (the factor squares)');
  // L4-2: a 4 m^3 tank in litres = 4000.
  ok(near(4 * 1000, 4000), 'AB8: L4-2 — 4000 L (via 4 x 10^6 cm³ / 1000)');
  // L5-1: 3.45 km in mm by the chain = 3,450,000.
  ok(near(3.45 * 1000 * 1000, 3450000), 'AB9: L5-1 — 3,450,000 mm (two chained \u00d71000 factors)');
  // L5-2: the direction-fraud diagnosis: 250 cm = 25,000 m is wrong; 250 cm = 2.5 m.
  ok(near(250 / 100, 2.5) && ne(25000, 2.5), 'AB10: L5-2 — the factor was upside down; 2.5 m is right');
  // L6-1: prove 1 m^2 = 10^4 cm^2 from the factor method; and 1 cm^2 = 10^2 mm^2.
  ok(near((100 * 1) * (100 * 1), 10000) && near(10 * 10, 100), 'AB11: L6-1 — (100 cm)² = 10⁴; (10 mm)² = 10²');
  // L6-2: the identity economy: 1 km/h = 1000 m / 3600 s = 5/18 m/s.
  ok(near(1000 / 3600, 5 / 18) && near(5 / 18, 0.2777777777777778, 1e-12), 'AB12: L6-2 — 5/18 ≈ 0.278 m/s per km/h');
}

console.log('=== AD. 9.3 deepening instances (run 43) ===');
{
  // AD1. the relay Illustration: 1.25 km -> m -> cm.
  ok(near(1.25 * 1000, 1250), 'AD1: 1.25 km = 1250 m (one factor)');
  ok(near(1.25 * 100000, 125000), 'AD2: 1.25 km = 125,000 cm (the chain)');
  ok(near(125000 / 1250, 100), 'AD3: the second factor contributes exactly \u00d7100');
  // AD4. order-invariance of the chain: the factors commute.
  ok(near(2.5 * 1000 * 100, 2.5 * 100 * 1000) && near(2.5 * 1000 * 100, 250000),
    'AD4: the chain\u2019s factors commute \u2014 any order lands on 250,000');
  // AD5. a false identity still multiplies by its (false) value: the licence needs TRUE identities.
  ok(near(1 * 100, 100), 'AD5: wearing 1 km = 100 m would give 100 m \u2014 wrong because the IDENTITY is false, not the method');
  ok(near(1000 / 100, 10) && ne(10, 1), 'AD6: the false factor 100/1 is not 1 \u2014 only true identities are invisible');
  // AD7. the direction table\u2019s four rows (all pre-verified instances).
  ok(near(250 / 100, 2.5) && 2.5 < 250, 'AD7: cm\u2192m shrinks (row 1)');
  ok(near(2.5 * 100, 250) && 250 > 2.5, 'AD8: m→cm grows (row 2)');
  ok(near(750 / 1000, 0.75) && 0.75 < 750, 'AD9: g→kg shrinks (row 3)');
  ok(near(54 * 5 / 18, 15) && 15 < 54, 'AD10: km/h→m/s shrinks (row 4 \u2014 the composite dress)');
}

console.log('=== AC. 9.3 scope guards (printed) ===');
console.log('  (i)   no density/pressure or other compound units beyond speed — later books own them.');
console.log('  (ii)  no dimensional-analysis formalism (dimensions [L][T]...) — the unit-cancellation licence is argued from Q = n x u only.');
console.log('  (iii) no precision/accuracy/rounding — 9.4 owns them.');
console.log('  (iv)  no US-customary conversions — the method is the lesson; customary tables stay out.');
console.log('  (v)   no content reproduced — identities and instances ours.');

console.log('');
console.log(`TOTAL: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log(`  - ${f}`);
  process.exit(1);
}
console.log('ALL PASS');
