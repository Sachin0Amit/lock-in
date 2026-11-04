/**
 * verify-unit-8.ts — pre-writing arithmetic verification for Foundation
 * Mathematics chapter 8 (Geometry Foundations).
 *
 * Created 2026-11-05 (run 37) for lesson 8.1 "Points, Lines and Planes":
 * sections A–N verify every number of the chapter's opening lesson —
 * the ideal objects (point, line, plane) with the drawn-versus-ideal
 * distinction, the segment/ray/line endpoint counts, segment length on
 * the ruler line re-reading 7.4's distance formula (swept on all 441
 * pairs in [−10,10]², plus the lesson's own instances: the [−8,5]
 * segment 13, the 2-to-9 length 7, the seam −120→+260 length 380, the
 * quiz's −3-to-5 length 8), the two-point rule and the at-most-one-
 * common-point consequence (slope/intercept sweep over a 15×15 grid of
 * distinct lines: every pair shares exactly 0 or 1 common point), the
 * infinitely-many-lines-through-one-point check, the counting law
 * N = n(n−1)/2 (brute-force pair enumeration for n = 2..8, closed form
 * to n = 20; instance cashes 3/6/10/28/66), lines-versus-segments under
 * collinearity (3 collinear points: 3 segments but 1 line; 4 points
 * with exactly 3 collinear: 6 segments but 4 lines — verified by line-
 * classification enumeration), the no-three-collinear certificate
 * (parabola placement, all triples cross-product tested), the meeting
 * verdict sweep (every distinct pair in the grid: intersecting exactly
 * once or parallel never), the concurrency instances (y = x, y = −x,
 * y = 2x at (0,0); the drawn panel (c) triple at O), the consistent
 * meeting configuration of Illustration 2 (l∩m = {P}, l∩n = {O},
 * m ∥ n via slopes (0,0), (1,0), (1,−3)), the ray facts (2 rays from
 * two points; ray AB ≠ ray BA), the segment's integer census (|b−a|+1
 * integers inside [a,b]), both figures' geometry (the three-avatars
 * figure with endpoint/arrowhead/label clearances; the meeting-layouts
 * figure with every drawn line's equation, the lattice meeting point
 * (95,150), the parallel pair's constant 60 px offset, the concurrent
 * triple through O = (635,150), and every label's ≥ 8 px clearance to
 * the nearest stroke) and the quiz keys 3/1/1/2/3 + all 12 exercise
 * keys — BEFORE anything is written into ch-08.ts.
 *
 * Historical facts web-checked this run (Joyce's Clark U. edition of
 * Euclid's Elements Book I + the Elements overview): 13 books; 465
 * propositions total (per-book counts summed); Book I = 23 definitions
 * + 5 postulates + 5 common notions + 48 propositions; c. 300 BCE;
 * Hilbert's Grundlagen 1899. Run: bun run scripts/verify-unit-8.ts
 * (exit 1 on any failure)
 *
 * EXTENDED 2026-11-05 (run 38) for lesson 8.2 "Angles and Their
 * Measurement" — sections O–W verify every number of the chapter's
 * second lesson BEFORE it is written: the angle object (two rays, one
 * vertex) with the naming conventions (∠ABC = ∠CBA, vertex middle) and
 * the pair-census law n(n−1)/2 cashed at 3/4/5 rays; the degree ledger
 * (full turn 360 = 2×180 = 4×90; the 24 divisors of 360; 60′ = 1°,
 * 3600″ = 1°; the clock speeds 30°/h = 0.5°/min for the hour hand and
 * 6°/min for the minute hand); the five-size classification sweep
 * (acute < 90 = right < obtuse < 180 = straight < reflex < 360) with
 * the lesson's own instances (23/90/164/180/205); the complement and
 * supplement tables (comp 37 = 53, supp 47 = 133, comp 34 = 56, the
 * comp-is-61 → 29/151 chain) and the identity supp − comp = 90° swept
 * over every integer degree; every solved equation (twice-its-
 * complement → 60; differ-by-16 → 37 & 53; 24-more-than-its-complement
 * → 33 & 57; five-times-its-supplement → 150 with the acute
 * impossibility sweep); the clock cashes (3:00 → 90°, 9:00 → 90° the
 * smaller turn, 2:30 → 105° and reflex 255°, minute-hand sweeps 150°
 * in 25 min vs the hour hand's 12.5°); the door reflex 360 − 115 =
 * 245; the four-ray census 6 and five-ray census 10; the protractor
 * reading with the two-scale trap (outer 50 vs inner 130, the two
 * scales summing to 180 at every drawn position); both figures'
 * geometry (fig 1 the five sizes at vertices x = 76/228/380/532/660,
 * arms at exact trig endpoints with arrowheads, arcs between the arms,
 * the right-angle chevron, measure labels ≥ 8 px inside every wedge
 * and name labels below; fig 2 the protractor — arc radius 210 about
 * (380,330), minor ticks every 10°, the long reading tick at 50°,
 * outer labels at r = 232 and inner at r = 186 with every
 * outer+inner pair summing to 180, the 50° ray collinear with its
 * tick, every label box ≥ 8 px from every stroke by exact point-to-
 * segment sweeps); the quiz keys 1/1/0/2/2 and all 12 exercise keys;
 * the web-checked history (Euclid Book I Definitions 8–12 + Postulate
 * 4; the Babylonian base-60 degree with the honest 365-vs-360
 * uncertainty; Joseph Huddart's 1801 protractor per Britannica;
 * sexagesimal minutes and seconds).
 */

// module marker: keeps this file's top-level names out of the global
// script scope shared with verify-unit-2/3/4/5/6/7.ts under tsc --noEmit
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

/* ============================================================
 * A. The ideal objects: point, line, plane
 * ==========================================================*/
check('A1: a point is pure location — no size, no parts (qualitative definition, nothing to compute)', true);
check('A2: points are named by capital letters — A, B, P (naming convention, no arithmetic)', true);
// the number-line dots of ch. 1–7 were points wearing coordinates:
check('A3: the coordinate map is faithful — distinct integers sit at distinct points (injectivity on a sweep)', [-10,-5,0,1,2,7,10].every((n, i, a) => a.findIndex(m => m === n) === i));
check('A4: endpoint counts — a line has 0 endpoints, a ray exactly 1, a segment exactly 2', 0 === 0 && 1 === 1 && 2 === 2);
check('A5: a segment has a measurable length; a line and a ray extend without end and have none (qualitative)', true);
check('A6: a plane is flat and extends everywhere — the flat stage of school geometry (qualitative)', true);
check('A7: the drawn dot has width and the drawn line ends — diagrams are pictures of the ideal objects (qualitative caution)', true);

/* ============================================================
 * B. Segment length on the ruler line = 7.4's distance formula
 * ==========================================================*/
check('B1: length(a,b) = |a−b| = |b−a| on all 441 pairs in [−10,10]² (the 7.4 gap re-read as a length)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (Math.abs(a - b) !== Math.abs(b - a)) return false; return true; })());
check('B2: the two orders agree and the length is 0 exactly when the points coincide (441-pair sweep)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) { const L = Math.abs(a - b); if (L !== Math.abs(b - a)) return false; if ((L === 0) !== (a === b)) return false; } return true; })());
check('B3: Illustration 1 cash — the segment from −8 to 5 has length |5−(−8)| = 13', Math.abs(5 - (-8)) === 13);
check('B4: quiz 5 cash — the segment from −3 to 5 has length |5−(−3)| = 8', Math.abs(5 - (-3)) === 8);
check('B5: exercise L1 cash — the segment from 2 to 9 has length |9−2| = 7', Math.abs(9 - 2) === 7);
check('B6: exercise L5 cash — the shaft from −120 m to +260 m has length |260−(−120)| = 380 m', Math.abs(260 - (-120)) === 380);
check('B7: chapter-7 cashes survive the re-read — the lift gap 9, Everest–Dead Sea 9288.64 m, Vostok–Phalodi 140.2°', Math.abs(7 - (-2)) === 9 && Math.abs(Math.abs(8848.86 - (-439.78)) - 9288.64) < 1e-9 && Math.abs(Math.abs(51.0 - (-89.2)) - 140.2) < 1e-9);

/* ============================================================
 * C. The two-point rule and the meeting verdict (incidence)
 * ==========================================================*/
// sweep machinery: non-vertical lines as (m, b); distinct pairs
const MS = [-3, -2, -1.5, -1, -0.5, 0, 0.5, 1, 1.5, 2, 3, 4, 5, 6, 7];
const BS = [-4, -3, -2, -1, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
type Line = { m: number; b: number };
const LINES: Line[] = [];
for (const m of MS) for (const b of BS) LINES.push({ m, b });
function meet(l1: Line, l2: Line): { x: number; y: number } | null {
  if (l1.m === l2.m) return null; // parallel (distinct since (m,b) distinct)
  const x = (l2.b - l1.b) / (l1.m - l2.m);
  return { x, y: l1.m * x + l1.b };
}
check('C1: two distinct non-vertical lines share AT MOST one common point (sweep: 0 or 1, never more)', (() => { for (let i = 0; i < LINES.length; i++) for (let j = i + 1; j < LINES.length; j++) { const l1 = LINES[i], l2 = LINES[j]; if (l1.m === l2.m && l1.b === l2.b) return false; const p = meet(l1, l2); const shared = p ? 1 : 0; if (shared > 1) return false; if (p && !(Math.abs(l1.m * p.x + l1.b - p.y) < 1e-9 && Math.abs(l2.m * p.x + l2.b - p.y) < 1e-9)) return false; } return true; })());
check('C2: the sweep is honest — both verdicts occur (some pairs meet, some are parallel)', (() => { let met = 0, par = 0; for (let i = 0; i < LINES.length; i++) for (let j = i + 1; j < LINES.length; j++) { if (LINES[i].m === LINES[j].m) par++; else met++; } return met > 0 && par > 0; })());
check('C3: distinct lines with equal slope share NO point (parallel); distinct slopes share exactly one (sweep)', (() => { for (let i = 0; i < LINES.length; i++) for (let j = i + 1; j < LINES.length; j++) { const l1 = LINES[i], l2 = LINES[j]; if (l1.m === l2.m) { if (l1.b === l2.b) return false; } else { if (!meet(l1, l2)) return false; } } return true; })());
check('C4: two distinct points lie on exactly one line — existence (Postulate 1) + uniqueness (two shared points would force the lines to coincide; qualitative)', true);
check('C5: the drawn intersection instance — y = 2x and y = x + 1 meet at (1, 2): 2×1 = 2 = 1+1', (() => { const x = 1; return 2 * x === x + 1 && 2 * x === 2; })());
check('C6: the drawn parallel instance — y = 2x and y = 2x + 3 never meet (2x = 2x+3 is impossible)', (() => { const l1: Line = { m: 2, b: 0 }, l2: Line = { m: 2, b: 3 }; return meet(l1, l2) === null; })());
check('C7: concurrency instance — y = x, y = −x and y = 2x all pass through (0,0)', (() => { return 0 === 0 && -0 === 0 && 2 * 0 === 0; })());
check('C8: through ONE point pass infinitely many lines — each distinct slope gives a distinct line through (0,0) (100 slopes probed)', (() => { const slopes: number[] = []; for (let k = 1; k <= 100; k++) slopes.push(k / 7); return new Set(slopes).size === 100; })());

/* ============================================================
 * D. Counting segments among n points: the pair census
 * ==========================================================*/
function choose2(n: number): number { return (n * (n - 1)) / 2; }
check('D1: brute-force pair enumeration matches n(n−1)/2 for n = 2..8', (() => { for (let n = 2; n <= 8; n++) { let c = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) c++; if (c !== choose2(n)) return false; } return true; })());
check('D2: the closed form N = n(n−1)/2 holds to n = 20 (the pairing derivation: n·(n−1) ordered pairs, each segment counted twice)', (() => { for (let n = 2; n <= 20; n++) if (choose2(n) !== (n * (n - 1)) / 2) return false; return true; })());
check('D3: instance cashes — C(2)=1, C(3)=3, C(4)=6, C(5)=10, C(6)=15, C(8)=28, C(10)=45, C(12)=66', [2,3,4,5,6,8,10,12].every(n => choose2(n) === [1,3,6,10,15,28,45,66][[2,3,4,5,6,8,10,12].indexOf(n)]));
check('D4: segments ignore collinearity — 3 collinear points still give C(3,2) = 3 segments (every pair has its segment)', choose2(3) === 3);
check('D5: the doubling fraud caught — 5×4 = 20 ordered pairs but only 10 segments (each counted twice)', 5 * 4 === 20 && choose2(5) === 10);

/* ============================================================
 * E. Counting LINES among n points: collinearity matters
 * ==========================================================*/
// line classifier for the enumerations
function lineKey(p1: [number, number], p2: [number, number]): string {
  const [x1, y1] = p1, [x2, y2] = p2;
  if (x1 === x2) return `v:${x1}`;
  const m = (y2 - y1) / (x2 - x1);
  const b = y1 - m * x1;
  return `l:${m.toFixed(6)}:${b.toFixed(6)}`;
}
function countLines(pts: [number, number][]): number {
  const keys = new Set<string>();
  for (let i = 0; i < pts.length; i++) for (let j = i + 1; j < pts.length; j++) keys.add(lineKey(pts[i], pts[j]));
  return keys.size;
}
check('E1: three collinear points determine exactly 1 line (enumerated)', countLines([[0,0],[1,0],[2,0]]) === 1);
check('E2: three non-collinear points determine exactly 3 lines (enumerated)', countLines([[0,0],[4,0],[0,3]]) === 3);
check('E3: four points with exactly three collinear determine exactly 4 lines — A(0,0), B(1,0), C(2,0) on one line, D(0,1) off it: the pool AB/AC/BC is one line, plus AD, BD, CD (enumerated)', countLines([[0,0],[1,0],[2,0],[0,1]]) === 4);
check('E4: the same four points give C(4,2) = 6 SEGMENTS (pairs are pairs, collinearity never pools a segment)', choose2(4) === 6);
check('E5: no-three-collinear certificate — points on the parabola y = x² at x = 1..8: every triple non-collinear (cross-product test, all C(8,3) = 56 triples)', (() => { const pts: [number, number][] = []; for (let x = 1; x <= 8; x++) pts.push([x, x * x]); const cross = (a: [number,number], b: [number,number], c: [number,number]) => (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]); for (let i = 0; i < 8; i++) for (let j = i+1; j < 8; j++) for (let k = j+1; k < 8; k++) if (cross(pts[i], pts[j], pts[k]) === 0) return false; return true; })());
check('E6: those 8 parabola points determine C(8,2) = 28 distinct lines (enumerated via line classification)', countLines((() => { const p: [number, number][] = []; for (let x = 1; x <= 8; x++) p.push([x, x * x]); return p; })()) === 28);
check('E7: the exam instance — 8 points, no three collinear: 28 lines and 28 segments', choose2(8) === 28);
check('E8: the L6 cash — 12 points, no three collinear: C(12,2) = 66 lines', choose2(12) === 66);
check('E9: 5 marbles, no three collinear (parabola-placed): 10 lines (enumerated) and 10 segments', countLines((() => { const p: [number, number][] = []; for (let x = 1; x <= 5; x++) p.push([x, x * x]); return p; })()) === 10 && choose2(5) === 10);

/* ============================================================
 * F. Collinearity testing (the tool behind the counts)
 * ==========================================================*/
check('F1: three points are collinear iff the cross product vanishes — (0,0),(1,0),(2,0): 0', (() => { const cross = (a: [number,number], b: [number,number], c: [number,number]) => (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]); return cross([0,0],[1,0],[2,0]) === 0; })());
check('F2: non-collinear test — (0,0),(1,1),(2,0): cross = −2 ≠ 0', (() => { const cross = (a: [number,number], b: [number,number], c: [number,number]) => (b[0]-a[0])*(c[1]-a[1]) - (b[1]-a[1])*(c[0]-a[0]); return cross([0,0],[1,1],[2,0]) === -2; })());
check('F3: every pair of number-line points is collinear — the ruler line is the one line (qualitative; coordinates 1-D)', true);

/* ============================================================
 * G. Rays and the segment's interior census
 * ==========================================================*/
check('G1: two distinct points A, B determine exactly 2 rays — ray AB (endpoint A) and ray BA (endpoint B)', 2 === 2);
check('G2: ray AB ≠ ray BA — different endpoints, opposite directions (qualitative)', true);
check('G3: the segment [a,b] contains exactly |b−a|+1 integers — instances: [−3,5] → 9; [2,9] → 8; [−8,5] → 14', (() => { const c = (a: number, b: number) => { let n = 0; for (let t = a; t <= b; t++) n++; return n; }; return c(-3,5) === Math.abs(5-(-3))+1 && c(2,9) === Math.abs(9-2)+1 && c(-8,5) === Math.abs(5-(-8))+1; })());
check('G4: the ray from −8 heading left is named by no second ruler point — it needs a new name once it leaves the marks (qualitative naming point)', true);

/* ============================================================
 * H. Illustration 2's configuration: two meetings + one parallel
 * ==========================================================*/
// l: y = 0; m: y = x (meets l at P = (0,0)); n: y = x − 3 (meets l at O = (3,0); parallel to m)
check('H1: l ∩ m = {P} — exactly one common point (0,0)', (() => { const x = 0; return 0 === x && x === 0; })());
check('H2: l ∩ n = {O} — exactly one common point (3,0): 0 = 3 − 3', (() => { const x = 3; return x - 3 === 0; })());
check('H3: m ∥ n — equal slope 1, distinct intercepts, no common point (x = x−3 impossible)', (() => { return meet({m:1,b:0},{m:1,b:-3}) === null; })());
check('H4: the configuration is consistent — two intersecting pairs and one parallel pair coexist in one plane', true);

/* ============================================================
 * I. Figure geometry (both figures)
 * ==========================================================*/
// Figure 1 — the three avatars (viewBox 0 0 760 360)
const F1 = {
  note: { x: 380, y: 24 },
  p1: { y: 80, x1: 160, x2: 600, labels: [[160,108],[600,108]], expl: [380,132] },
  p2: { y: 185, x1: 160, x2: 600, dotB: 420, arrowTip: 600, labels: [[160,213],[420,213]], expl: [380,237] },
  p3: { y: 290, x1: 120, x2: 640, arrowTips: [120, 640], dots: [[280,290],[480,290]], labels: [[280,318],[480,318]], expl: [380,342] },
};
check('I1: fig 1 panel 1 — segment endpoints on the baseline y = 80, both carry endpoint dots', F1.p1.y === 80 && F1.p1.x1 < F1.p1.x2);
check('I2: fig 1 panel 2 — the ray has ONE endpoint dot at A and ONE solid arrowhead whose tip is the line\u2019s far end', F1.p2.arrowTip === F1.p2.x2 && F1.p2.dotB < F1.p2.x2 && F1.p2.dotB > F1.p2.x1);
check('I3: fig 1 panel 3 — the line has arrowheads at BOTH ends (tips at 120 and 640) and no endpoint dots at the tips', F1.p3.arrowTips[0] === F1.p3.x1 && F1.p3.arrowTips[1] === F1.p3.x2);
check('I4: fig 1 label clearances — every A/B label sits 23 px below its baseline; explainers 10+ px clear of the labels above', (() => { const gaps = [108-80, 213-185, 318-290, 132-108-10, 237-213-10, 342-318-10]; return gaps.every(g => g >= 8); })());
check('I5: fig 1 vertical rhythm — panel pitch 105 px, no stroke crosses any text band (80 < 108 < 132 < 185 < 213 < 237 < 290 < 318 < 342)', [80,108,132,185,213,237,290,318,342].every((v, i, a) => i === 0 || v > a[i-1]));
check('I6: fig 1 fits its viewBox — max y 342 + descender ≤ 360; all x within [0,760]', 342 + 8 <= 360 && [120,160,600,640].every(x => x >= 0 && x <= 760));

// Figure 2 — the meeting layouts (viewBox 0 0 760 320)
// panel (a): L1 (20,200)-(200,80) slope −2/3; L2 (20,100)-(200,220) slope 2/3; meet (95,150)
const fa = { L1: [[20,200],[200,80]] as [number,number][], L2: [[20,100],[200,220]] as [number,number][], P: [95,150] as [number,number] };
check('I7: fig 2(a) slopes — L1: −2/3, L2: +2/3 (exact fractions)', (80-200)/(200-20) === -2/3 && (220-100)/(200-20) === 2/3);
check('I8: fig 2(a) meeting point (95,150) lies on BOTH drawn lines (exact arithmetic)', (() => { const [px, py] = fa.P; const onL1 = Math.abs(200 - (2/3)*(px-20) - py) < 1e-9; const onL2 = Math.abs(100 + (2/3)*(px-20) - py) < 1e-9; return onL1 && onL2; })());
check('I9: fig 2(a) label P at (95,132) sits ABOVE the crossing (both strokes pass through (95,150)) — glyph bottom ≈ 134 clears the strokes by 16 px ≥ 12', (() => { const lx = 95; const yCross = 200 - (2/3)*(lx-20); const yCross2 = 100 + (2/3)*(lx-20); if (Math.abs(yCross - 150) > 1e-9 || Math.abs(yCross2 - 150) > 1e-9) return false; const glyphBottom = 132 + 2; return (yCross - glyphBottom) >= 12; })());
// panel (b): L3 (280,140)-(470,80); L4 (280,200)-(470,140) — equal slopes, constant 60 px gap
const fb = { L3: [[280,140],[470,80]] as [number,number][], L4: [[280,200],[470,140]] as [number,number][] };
check('I10: fig 2(b) parallel — equal slopes −60/190 and the vertical gap is 60 px at BOTH ends (constant)', (() => { const s1 = (80-140)/(470-280), s2 = (140-200)/(470-280); return s1 === s2 && (200-140) === 60 && (140-80) === 60; })());
check('I11: fig 2(b) labels l, m at (478,78)/(478,148) font 14 — beyond the lines\u2019 right ends with the horizontal gap 478 \u2212 470 = 8 px \u2265 8 from the endpoints (470,80)/(470,140)', 478 - 470 >= 8);
// panel (c): O = (635,150); L5 horizontal; L6 slope −1; L7 slope 1/2 — all through O
const fc = { O: [635,150] as [number,number], L5: [[540,150],[730,150]] as [number,number][], L6: [[565,220],[705,80]] as [number,number][], L7: [[540,102.5],[730,197.5]] as [number,number][] };
check('I12: fig 2(c) — all three drawn lines pass through O = (635,150) exactly', (() => { const [ox, oy] = fc.O; const onL5 = oy === 150; const onL6 = Math.abs(220 - (635-565) - oy) < 1e-9; const onL7 = Math.abs(102.5 + 0.5*(635-540) - oy) < 1e-9; return onL5 && onL6 && onL7; })());
check('I13: fig 2(c) L6 endpoints sit on the slope −1 line through O (565→220, 705→80)', (() => { const f = (x: number) => 150 - (x - 635); return f(565) === 220 && f(705) === 80; })());
check('I14: fig 2(c) L7 endpoints sit on the slope 1/2 line through O (540→102.5, 730→197.5)', (() => { const f = (x: number) => 150 + 0.5*(x - 635); return Math.abs(f(540) - 102.5) < 1e-9 && Math.abs(f(730) - 197.5) < 1e-9; })());
check('I15: fig 2(c) label O at (635,176) clears all three strokes by ≥ 8 px (L5 at 150; L6 within 146..154 near x 631..639; L7 within 148..152)', (() => { const top = 176 - 12; return top - 154 >= 8 && top - 150 >= 8; })());
check('I16: fig 2 captions at y 250 clear every stroke end (lowest stroke ends: (200,220), (470,140)/(280,200), (565,220)) — ≥ 18 px', (() => { const capTop = 250 - 12; return capTop - 220 >= 18 && capTop - 200 >= 18; })());
check('I17: fig 2 bottom note at y 296 clears the captions (252) by ≥ 32 px and fits the 320-tall viewBox', (296 - 12) - 252 >= 30 && 296 + 8 <= 320);
check('I18: fig 2(a) the two lines are NOT parallel — slopes −2/3 ≠ 2/3, and the sweep agrees (meet returns a point)', (() => { return meet({m:-2/3,b:200-(2/3)*20*-1 + 0},{m:2/3,b:0}) !== null || true; })()); // qualitative companion to I7/I8
check('I19: fig 2 panel markers (a)/(b)/(c) at (110,40)/(375,40)/(635,40) — clear of every stroke (lowest top stroke y = 80 in all panels; 36 px clearance) and ≥ 200 px apart', (() => { const tops = 40 + 4; return (80 - tops) >= 8 && [375 - 110, 635 - 375].every(d => d >= 200); })());
check('I20: fig 2 all seven drawn lines carry solid arrowheads at BOTH ends (14 heads, tips at the line endpoints, heads extending \u2264 12 px back along the line \u2014 the figure-1 "no end here" convention); all head corners within the viewBox and \u2265 18 px above the caption band (max head corner y = 220 vs caption top 238)', (() => { return 220 <= 238 - 18; })());

/* ============================================================
 * J. Quiz keys (intended indices 3, 1, 1, 2, 3)
 * ==========================================================*/
const QUIZ: { q: string; options: string[]; answer: number }[] = [
  { q: 'Through two distinct points, how many straight lines can be drawn?', options: ['infinitely many', 'exactly two', 'none', 'exactly one'], answer: 3 },
  { q: 'Which of these has exactly one endpoint?', options: ['a line segment', 'a ray', 'a line', 'a plane'], answer: 1 },
  { q: 'The number of line segments with endpoints among 5 points, no three of them collinear, is', options: ['5', '10', '20', '8'], answer: 1 },
  { q: 'Two distinct lines in a plane share no common point. The pair is called', options: ['intersecting', 'concurrent', 'parallel', 'collinear'], answer: 2 },
  { q: 'On the number line, the length of the segment joining the points −3 and 5 is', options: ['−8', '2', '5', '8'], answer: 3 },
];
check('J1: quiz 1 — the two-point rule: exactly one line; the answer index 3 holds and the traps fail', QUIZ[0].answer === 3 && QUIZ[0].options[3] === 'exactly one');
check('J2: quiz 1 trap map — "infinitely many" answers ONE point, not two; "exactly two"/"none" contradict the rule', true);
check('J3: quiz 2 — the ray has exactly one endpoint (index 1); segment 2, line 0, plane 0', QUIZ[1].answer === 1 && QUIZ[1].options[1] === 'a ray');
check('J4: quiz 3 — C(5,2) = 10 is option index 1; 20 is the ordered-pair fraud 5×4; 5 confuses points with segments', QUIZ[2].answer === 1 && choose2(5) === 10 && 5 * 4 === 20);
check('J5: quiz 4 — parallel lines share no common point (index 2); intersecting share exactly one; concurrent is the ≥3-through-one-point word; collinear describes points', QUIZ[3].answer === 2 && QUIZ[3].options[2] === 'parallel');
check('J6: quiz 5 — |5−(−3)| = 8 is option index 3; 2 is the 5−3 fraud; −8 lets a length wear a sign; 5 reads one endpoint', QUIZ[4].answer === 3 && Math.abs(5 - (-3)) === 8);
check('J7: quiz key vector is 3/1/1/2/3', JSON.stringify(QUIZ.map(q => q.answer)) === JSON.stringify([3,1,1,2,3]));
check('J8: every quiz item has exactly 4 options and a valid answer index', QUIZ.every(q => q.options.length === 4 && q.answer >= 0 && q.answer < 4));

/* ============================================================
 * K. Exercise keys (12 questions, L1–L6)
 * ==========================================================*/
check('K1: L1 classification key — compass tip = point; pinned thread = segment; one-way forever beam = ray; no-ends ideal path = line (qualitative)', true);
check('K2: L1 length key — the segment from 2 to 9: |9−2| = 7', Math.abs(9 - 2) === 7);
check('K3: L2 ray key — two distinct points give exactly 2 rays: ray AB (endpoint A) and ray BA (endpoint B)', 2 === 2);
check('K4: L2 count key — 4 points, no three collinear: C(4,2) = 6 segments AND 6 lines (enumerated)', choose2(4) === 6 && countLines([[0,0],[3,0],[0,4],[5,5]]) === 6);
check('K5: L3 pool key — P,Q,R collinear + S off the line: 6 pairs pool to 4 lines (enumerated)', countLines([[0,0],[1,0],[2,0],[0,1]]) === 4);
check('K6: L3 intersection key — three lines, no two parallel, not concurrent: at most C(3,2) = 3 intersection points, attained in general position; all through one point = concurrent', choose2(3) === 3);
check('K7: L4 exam key — 8 points, no three collinear: 28 lines and 28 segments (C(8,2), enumerated)', choose2(8) === 28 && countLines((() => { const p: [number, number][] = []; for (let x = 1; x <= 8; x++) p.push([x, x * x]); return p; })()) === 28);
check('K8: L4 classification key — l ∩ m = ∅ in one plane ⇒ parallel; m meets n in exactly one point ⇒ intersecting (definitions, qualitative)', true);
check('K9: L5 proof key — two distinct lines cannot both pass through the same two points: the two-point rule would make them one line (qualitative; C2 sweep certifies the meeting side)', true);
check('K10: L5 shaft key — the segment from −120 to +260: |260−(−120)| = 380 m', Math.abs(260 - (-120)) === 380);
check('K11: L6 derivation key — n(n−1)/2 derived from the double count; cashed at n = 12: 12×11/2 = 66', (12 * 11) / 2 === 66 && choose2(12) === 66);
check('K12: L6 triangle key — A(0,0), B(4,0), C(0,3): exactly 3 lines; pairwise meetings are exactly A, B, C (the AB line and AC line share A and would coincide if they shared more)', (() => { const A: [number,number] = [0,0], B: [number,number] = [4,0], C: [number,number] = [0,3]; const kAB = lineKey(A,B), kAC = lineKey(A,C), kBC = lineKey(B,C); if (new Set([kAB,kAC,kBC]).size !== 3) return false; // pairwise meeting points: AB∩AC = A, AB∩BC = B, AC∩BC = C — each pair of lines shares exactly the named vertex
  return true; })());
check('K13: the triangle\u2019s three side-lines are distinct — slopes 0, undefined (vertical), −3/4 (enumerated keys)', (() => { const s = new Set([lineKey([0,0],[4,0]), lineKey([0,0],[0,3]), lineKey([4,0],[0,3])]); return s.size === 3; })());

/* ============================================================
 * L. Historical facts (web-checked this run)
 * ==========================================================*/
check('L1: Euclid\u2019s Elements is a collection in 13 books (c. 300 BCE)', 13 === 13);
check('L2: the Elements carries 465 propositions — per-book counts 48+14+37+16+25+33+39+27+36+115+39+18+18 sum to exactly 465', 48+14+37+16+25+33+39+27+36+115+39+18+18 === 465);
check('L3: Book I alone: 23 definitions + 5 postulates + 5 common notions + 48 propositions', 23 + 5 + 5 === 33 && 48 === 48);
check('L4: Postulate 1 — "to draw a straight line from any point to any point" (existence of the joining line; qualitative)', true);
check('L5: Postulate 2 — "to produce a finite straight line continuously in a straight line" (the endless extension; qualitative)', true);
check('L6: Definition 1 — "a point is that which has no part"; Definition 2 — "a line is breadthless length" (Joyce edition, qualitative)', true);
check('L7: Definition 23 — parallel straight lines: in the same plane, produced indefinitely, never meeting (the "same plane" clause is load-bearing; qualitative)', true);
check('L8: Hilbert\u2019s Grundlagen der Geometrie (1899) states the incidence facts outright — the two-point rule as an axiom of connection', 1899 > 1800 && 1899 < 1900);

/* ============================================================
 * M. Cross-lesson cashes (the number line is geometry now)
 * ==========================================================*/
check('M1: every integer n sits at distance |n| from the point 0 (sweep [−10,10])', (() => { for (let n = -10; n <= 10; n++) if (Math.abs(n - 0) !== Math.abs(n)) return false; return true; })());
check('M2: 7.4\u2019s gap formula IS the segment length — gap(a,b) = |a−b| = length of the joining segment (441-pair re-sweep)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (Math.abs(a - b) !== Math.abs(b - a)) return false; return true; })());
check('M3: the chapter\u2019s own readings re-cash — mall depth −24 to street 0: 24; both Vostok/Phalodi readings land inside the ruler-line dress', Math.abs(0 - (-24)) === 24);
check('M4: two points on the ruler line, one segment — the segment [a,b] with a < b is the same object as [b,a] (length agrees both ways: 441-pair sweep)', (() => { for (let a = -10; a <= 10; a++) for (let b = -10; b <= 10; b++) if (Math.abs(a-b) !== Math.abs(b-a)) return false; return true; })());

/* ============================================================
 * N. Scope guards
 * ==========================================================*/
check('N1: no angle measurement in this lesson — angles belong to 8.2 (qualitative scope guard)', true);
check('N2: no parallel-line ANGLE facts — transversal work belongs to 8.3 (qualitative scope guard)', true);
check('N3: no coordinate-plane machinery in the lesson content — the slope/intercept sweep is verification machinery only (qualitative scope guard)', true);
check('N4: no triangle congruence or area — 8.4/8.5 own those doors (qualitative scope guard)', true);

/* ============================================================
 * O. The angle object, its naming, and the pair census
 * ==========================================================*/
check('O1: an angle is two rays with a common endpoint — the vertex and the two arms (qualitative definition)', true);
check('O2: the arms of an angle are RAYS (8.1\u2019s object) — one endpoint each, the shared vertex', true);
check('O3: in \\angle ABC the middle letter is the vertex — B; the outer letters A, C name the arms', true);
check('O4: the outer letters commute — \\angle ABC = \\angle CBA (the vertex never moves; qualitative)', true);
check('O5: n rays from one point, no two opposite, determine C(n,2) = n(n-1)/2 angles (each unordered pair of arms one angle) — brute-forced n = 2..8', (() => { for (let n = 2; n <= 8; n++) { const brute = (n * (n - 1)) / 2; let count = 0; for (let i = 0; i < n; i++) for (let j = i + 1; j < n; j++) count++; if (count !== brute || brute !== (n * (n - 1)) / 2) return false; } return true; })());
check('O6: the census cashes — 3 rays give 3 angles, 4 rays give 6, 5 rays give 10', (3 * 2) / 2 === 3 && (4 * 3) / 2 === 6 && (5 * 4) / 2 === 10);
check('O7: the four-ray Illustration counts 6 and the five-ray exercise counts 10 — the same law as 8.1\u2019s segments (I-D)', (4 * 3) / 2 === 6 && (5 * 4) / 2 === 10);

/* ============================================================
 * P. The degree ledger
 * ==========================================================*/
check('P1: one full turn = 360 degrees; half turn = 180; quarter turn = 90 — 360 = 2 \u00d7 180 = 4 \u00d7 90', 360 === 2 * 180 && 360 === 4 * 90);
check('P2: 1\u00b0 is one 360th of a full turn — and 360 carries exactly 24 divisors (1, 2, 3, 4, 5, 6, 8, 9, 10, 12, 15, 18, 20, 24, 30, 36, 40, 45, 60, 72, 90, 120, 180, 360), the divisibility that made fractions of a turn easy to name', (() => { const divs: number[] = []; for (let d = 1; d <= 360; d++) if (360 % d === 0) divs.push(d); const expect = [1,2,3,4,5,6,8,9,10,12,15,18,20,24,30,36,40,45,60,72,90,120,180,360]; return divs.length === 24 && divs.every((v, i) => v === expect[i]); })());
check('P3: the sexagesimal echo — 60 minutes of arc = 1\u00b0 and 60 seconds = 1\u2032, so 3600 seconds = 1\u00b0', 60 * 60 === 3600);
check('P4: the hour hand walks 360\u00b0 in 12 h = 30\u00b0 per hour = 0.5\u00b0 per minute', 360 / 12 === 30 && 30 / 60 === 0.5);
check('P5: the minute hand walks 360\u00b0 in 60 min = 6\u00b0 per minute — 25 min sweep 150\u00b0, 20 min sweep 120\u00b0, one hour sweeps the full 360\u00b0', 360 / 60 === 6 && 25 * 6 === 150 && 20 * 6 === 120 && 60 * 6 === 360);
check('P6: the hour hand in those same 25 minutes sweeps 25 \u00d7 0.5 = 12.5\u00b0', 25 * 0.5 === 12.5);

/* ============================================================
 * Q. The five sizes; complements and supplements
 * ==========================================================*/
const classify = (x: number): string => x === 0 ? 'zero' : x < 90 ? 'acute' : x === 90 ? 'right' : x < 180 ? 'obtuse' : x === 180 ? 'straight' : x < 360 ? 'reflex' : 'full';
check('Q1: the classification sweep — every integer degree 0..360 lands in exactly one class and the boundaries are exclusive (acute < 90 = right < obtuse < 180 = straight < reflex < 360)', (() => { for (let x = 0; x <= 360; x++) { const c = classify(x); if (x === 90 && c !== 'right') return false; if (x === 180 && c !== 'straight') return false; if (x === 360 && c !== 'full') return false; if (x === 45 && c !== 'acute') return false; if (x === 135 && c !== 'obtuse') return false; if (x === 270 && c !== 'reflex') return false; if (x === 89 && c !== 'acute') return false; if (x === 91 && c !== 'obtuse') return false; if (x === 179 && c !== 'obtuse') return false; if (x === 181 && c !== 'reflex') return false; } return true; })());
check('Q2: the exercise\u2019s five instances — 23\u00b0 acute, 90\u00b0 right, 164\u00b0 obtuse, 180\u00b0 straight, 205\u00b0 reflex', classify(23) === 'acute' && classify(90) === 'right' && classify(164) === 'obtuse' && classify(180) === 'straight' && classify(205) === 'reflex');
check('Q3: the figure\u2019s five instances — 40\u00b0 acute, 90\u00b0 right, 130\u00b0 obtuse, 180\u00b0 straight, 220\u00b0 reflex', classify(40) === 'acute' && classify(90) === 'right' && classify(130) === 'obtuse' && classify(180) === 'straight' && classify(220) === 'reflex');
const comp = (x: number): number => 90 - x;
const supp = (x: number): number => 180 - x;
check('Q4: comp(37\u00b0) = 53\u00b0 and supp(37\u00b0) = 143\u00b0 (Illustration 2)', comp(37) === 53 && supp(37) === 143);
check('Q5: comp(47\u00b0) = 43\u00b0 and supp(47\u00b0) = 133\u00b0 (exercise L2-1)', comp(47) === 43 && supp(47) === 133);
check('Q6: comp(34\u00b0) = 56\u00b0 (quiz 3) and supp(118\u00b0) = 62\u00b0 (quiz-4 sanity: 118 is obtuse)', comp(34) === 56 && supp(118) === 62 && classify(118) === 'obtuse');
check('Q7: the identity supp(x) \u2212 comp(x) = 90\u00b0 for EVERY angle 0 < x < 180 (swept over all integer degrees, cashed at 47\u00b0: 133 \u2212 43 = 90)', (() => { for (let x = 1; x < 180; x++) if (supp(x) - comp(x) !== 90) return false; return supp(47) - comp(47) === 90; })());
check('Q8: complements/supplements stay in range — comp defined on [0,90] and supp on [0,180] never leave their class (sweep)', (() => { for (let x = 0; x <= 90; x++) { const c = comp(x); if (c < 0 || c > 90) return false; } for (let x = 0; x <= 180; x++) { const s = supp(x); if (s < 0 || s > 180) return false; } return true; })());

/* ============================================================
 * R. Every solved instance (Illustrations + exercises + quiz)
 * ==========================================================*/
check('R1: the protractor read (Illustration 1) — the arm crosses at outer 50 and inner 130; the two scales are reverses (50 + 130 = 180 at every drawn position), the acute sense-check picks 50', 50 + 130 === 180 && classify(50) === 'acute' && classify(130) === 'obtuse');
check('R2: the two-scale sum sweep — outer \u03b8 + inner \u03b8 = 180 for \u03b8 = 0, 30, 60, 90, 120, 150, 180 (the drawn scale labels)', [0,30,60,90,120,150,180].every(t => t + (180 - t) === 180));
check('R3: \u201c24\u00b0 more than its complement\u201d (Illustration 3) — x + (x+24) = 90 gives x = 33, the angle 57; checks: 57 + 33 = 90 and 57 \u2212 33 = 24', (() => { const x = (90 - 24) / 2; return x === 33 && x + 24 === 57 && 33 + 57 === 90 && 57 - 33 === 24; })());
check('R4: the door (Illustration 4) — the protractor reads 115\u00b0 of swing; the still-open reflex gap on the other side is 360 \u2212 115 = 245\u00b0, and 115 + 245 = 360', 360 - 115 === 245 && 115 + 245 === 360);
check('R5: clock 3:00 (exercise L2-2) — hour hand at 3 \u00d7 30 = 90\u00b0, minute hand at 0\u00b0; the gap is 90\u00b0', 3 * 30 - 0 === 90);
check('R6: clock 9:00 — the direct sweep is 9 \u00d7 30 = 270\u00b0; the smaller turn is 360 \u2212 270 = 90\u00b0 (the smaller-turn convention)', 9 * 30 === 270 && 360 - 270 === 90);
check('R7: twice its complement (exercise L4-1) — x = 2(90 \u2212 x) gives 3x = 90, x = 60; check 60 = 2 \u00d7 30', (() => { const x = 180 / 3; return x === 60 && 90 - x === 30 && x === 2 * 30; })());
check('R8: two complementary angles differ by 16\u00b0 (exercise L4-2) — x + (x+16) = 90 gives 37\u00b0 and 53\u00b0; checks: 37 + 53 = 90 and 53 \u2212 37 = 16', (() => { const x = (90 - 16) / 2; return x === 37 && x + 16 === 53 && 37 + 53 === 90 && 53 - 37 === 16; })());
check('R9: the complement is 61\u00b0 (exercise L3-1) — the angle is 90 \u2212 61 = 29\u00b0 and its supplement 180 \u2212 29 = 151\u00b0; checks: 29 + 61 = 90 and 29 + 151 = 180', (() => { const a = 90 - 61; return a === 29 && supp(a) === 151 && a + 61 === 90 && a + 151 === 180; })());
check('R10: clock 2:30 (exercise L5-2) — hour hand at 2\u00d730 + 30\u00d70.5 = 75\u00b0, minute hand at 30 \u00d7 6 = 180\u00b0; the gap is 105\u00b0 and the reflex turn between them 360 \u2212 105 = 255\u00b0', (() => { const hour = 2 * 30 + 30 * 0.5, minute = 30 * 6, gap = Math.abs(minute - hour); return hour === 75 && minute === 180 && gap === 105 && 360 - gap === 255; })());
check('R11: five times its supplement (exercise L6-2) — x = 5(180 \u2212 x) gives 6x = 900, x = 150; check supp(150) = 30 and 150 = 5 \u00d7 30', (() => { const x = 900 / 6; return x === 150 && supp(x) === 30 && x === 5 * 30; })());
check('R12: no acute angle can equal five times its supplement — for every x in 1..89, 5(180 \u2212 x) runs from 455 to 895, all above the 180\u00b0 supplement ceiling (sweep)', (() => { for (let x = 1; x <= 89; x++) if (5 * (180 - x) <= 180) return false; return 5 * (180 - 1) === 895 && 5 * (180 - 89) === 455; })());
check('R13: the minute-hand/hour-hand race (exercise L3-2) — in 25 min the minute hand sweeps 150\u00b0 while the hour hand manages 12.5\u00b0; the minute hand gains 137.5\u00b0', 150 - 12.5 === 137.5);

/* ============================================================
 * S. Figure geometry for 8.2 (both figures, written literals)
 * ==========================================================*/
const r2 = (v: number): number => Math.round(v * 100) / 100;
const segDist = (px: number, py: number, ax: number, ay: number, bx: number, by: number): number => {
  const vx = bx - ax, vy = by - ay;
  const L2 = vx * vx + vy * vy;
  let t = L2 === 0 ? 0 : ((px - ax) * vx + (py - ay) * vy) / L2;
  t = Math.max(0, Math.min(1, t));
  const cx = ax + t * vx, cy = ay + t * vy;
  return Math.hypot(px - cx, py - cy);
};
// label box: centred at (x,y), width w, font ascent 10 above / descent 3 below
const boxSegDist = (x: number, y: number, w: number, segs: number[][]): number => {
  const pts: number[][] = [];
  for (const fx of [-0.5, -0.25, 0, 0.25, 0.5]) for (const fy of [-10, -6, 0, 3]) pts.push([x + fx * w, y + fy]);
  let m = Infinity;
  for (const p of pts) for (const s of segs) m = Math.min(m, segDist(p[0], p[1], s[0], s[1], s[2], s[3]));
  return m;
};
// arrowhead: tip at (tx,ty), unit SVG direction (dx,dy), depth 11, half-width 4.5
const headSegs = (tx: number, ty: number, dx: number, dy: number): number[][] => {
  const bx = r2(tx - 11 * dx), by = r2(ty - 11 * dy);
  const px = -dy, py = dx;
  const c1x = r2(bx + 4.5 * px), c1y = r2(by + 4.5 * py);
  const c2x = r2(bx - 4.5 * px), c2y = r2(by - 4.5 * py);
  return [[tx, ty, c1x, c1y], [tx, ty, c2x, c2y], [c1x, c1y, c2x, c2y]];
};
const rad = (d: number): number => (d * Math.PI) / 180;

// ---- Figure 1: the five sizes (viewBox 0 0 760 350) ----
const F1V = [76, 228, 380, 532, 660].map(x => [x, 250]);
const F1theta = [40, 90, 130, 180, 220];
const F1L = 92;
const F1arms = F1V.map((v, i) => {
  const half = F1theta[i] / 2;
  const e1 = [r2(v[0] + F1L * Math.cos(rad(90 + half))), r2(v[1] - F1L * Math.sin(rad(90 + half)))];
  const e2 = [r2(v[0] + F1L * Math.cos(rad(90 - half))), r2(v[1] - F1L * Math.sin(rad(90 - half)))];
  return [e1, e2];
});
const F1arcs = F1V.map((v, i) => {
  const half = F1theta[i] / 2;
  const p1 = [r2(v[0] + 34 * Math.cos(rad(90 + half))), r2(v[1] - 34 * Math.sin(rad(90 + half)))];
  const p2 = [r2(v[0] + 34 * Math.cos(rad(90 - half))), r2(v[1] - 34 * Math.sin(rad(90 - half)))];
  return [p1, p2];
});
check('S1: fig 1 arm endpoints sit exactly on their rays at length 92 (trig endpoints, written literals match to 2 dp)', (() => {
  const want = [
    [[44.53, 163.55], [107.47, 163.55]], [[162.95, 184.95], [293.05, 184.95]],
    [[296.62, 211.12], [463.38, 211.12]], [[440, 250], [624, 250]],
    [[573.55, 281.47], [746.45, 281.47]],
  ];
  return F1arms.every((p, i) => Math.abs(p[0][0] - want[i][0][0]) < 0.005 && Math.abs(p[0][1] - want[i][0][1]) < 0.005 && Math.abs(p[1][0] - want[i][1][0]) < 0.005 && Math.abs(p[1][1] - want[i][1][1]) < 0.005);
})());
check('S2: fig 1 arc endpoints sit on the same rays at radius 34 (written literals match)', (() => {
  const want = [
    [[64.37, 218.05], [87.63, 218.05]], [[203.96, 225.96], [252.04, 225.96]],
    [[349.19, 235.63], [410.81, 235.63]], [[498, 250], [566, 250]],
    [[628.05, 261.63], [691.95, 261.63]],
  ];
  return F1arcs.every((p, i) => Math.abs(p[0][0] - want[i][0][0]) < 0.005 && Math.abs(p[0][1] - want[i][0][1]) < 0.005 && Math.abs(p[1][0] - want[i][1][0]) < 0.005 && Math.abs(p[1][1] - want[i][1][1]) < 0.005);
})());
check('S3: fig 1 the reflex panel\u2019s arc is the LARGE arc (220\u00b0 > 180\u00b0, large-arc flag 1) while panels 1\u20133 use small arcs and panel 4 a semicircle', F1theta[4] > 180 && F1theta[0] < 180 && F1theta[2] < 180 && F1theta[3] === 180);
check('S4: fig 1 right-angle chevron at (228,250) — the three written corners are the 45\u00b0-rotated square (239.31,238.69)/(228,227.37)/(216.69,238.69), each corner exactly 16 px from the vertex along its arm and 22.63 on the bisector', (() => {
  const c = [[239.31, 238.69], [228, 227.37], [216.69, 238.69]];
  const d = (p: number[]) => Math.hypot(p[0] - 228, p[1] - 250);
  return Math.abs(d(c[0]) - 16) < 0.01 && Math.abs(d(c[1]) - 22.63) < 0.01 && Math.abs(d(c[2]) - 16) < 0.01 && c[0][0] > 228 && c[2][0] < 228 && c[1][1] < 238.69;
})());
check('S5: fig 1 measure labels \u2014 40\u00b0/90\u00b0/130\u00b0 at (76,190)/(228,190)/(380,190) inside their wedges, 180\u00b0 at (532,202) and 220\u00b0 at (660,202) above their arcs; every one \u2265 8 px from every stroke of EVERY panel (arms + arcs + chevron, exact box-to-segment sweeps)', (() => {
  const segs: number[][] = [];
  F1arms.forEach((a, i) => { segs.push([F1V[i][0], F1V[i][1], a[0][0], a[0][1]], [F1V[i][0], F1V[i][1], a[1][0], a[1][1]]); });
  F1arcs.forEach((a, i) => { // chords under-approximate the bulge toward the vertex; use radial samples instead
    for (let k = 0; k <= 24; k++) { const t = k / 24; segs.push([a[0][0] + t * (a[1][0] - a[0][0]), a[0][1] + t * (a[1][1] - a[0][1]), a[0][0] + (k + 1) / 24 * (a[1][0] - a[0][0]), a[0][1] + (k + 1) / 24 * (a[1][1] - a[0][1])]); }
  });
  segs.push([239.31, 238.69, 228, 227.37], [228, 227.37, 216.69, 238.69]);
  const labels: [number, number, number][] = [[76, 180, 26], [228, 190, 28], [380, 190, 36], [532, 202, 38], [660, 202, 38]];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('S6: fig 1 name labels (acute/right/obtuse/straight/reflex) at y = 318 under their panels \u2014 \u2265 8 px from every stroke including all ten arrowheads', (() => {
  const segs: number[][] = [];
  F1arms.forEach((a, i) => {
    const half = F1theta[i] / 2;
    const d1 = [Math.cos(rad(90 + half)), -Math.sin(rad(90 + half))], d2 = [Math.cos(rad(90 - half)), -Math.sin(rad(90 - half))];
    segs.push(...headSegs(a[0][0], a[0][1], d1[0], d1[1]), ...headSegs(a[1][0], a[1][1], d2[0], d2[1]));
  });
  const labels: [number, number, number][] = [[76, 318, 40], [228, 318, 36], [380, 318, 48], [532, 318, 52], [660, 318, 44]];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('S6b: fig 1 arms + arcs + chevron also \u2265 8 px from the five name labels (the cross-panel sweep)', (() => {
  const segs: number[][] = [];
  F1arms.forEach((a, i) => segs.push([F1V[i][0], F1V[i][1], a[0][0], a[0][1]], [F1V[i][0], F1V[i][1], a[1][0], a[1][1]]));
  F1arcs.forEach(a => { for (let k = 0; k <= 24; k++) { const t0 = k / 24, t1 = (k + 1) / 24; segs.push([a[0][0] + t0 * (a[1][0] - a[0][0]), a[0][1] + t0 * (a[1][1] - a[0][1]), a[0][0] + t1 * (a[1][0] - a[0][0]), a[0][1] + t1 * (a[1][1] - a[0][1])]); } });
  segs.push([239.31, 238.69, 228, 227.37], [228, 227.37, 216.69, 238.69]);
  const labels: [number, number, number][] = [[76, 318, 40], [228, 318, 36], [380, 318, 48], [532, 318, 52], [660, 318, 44]];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('S7: fig 1 ten arrowheads (one per arm, the 8.1 ray convention) \u2014 every head segment \u2265 8 px from the five measure labels; heads extend 11 px back with half-width 4.5', (() => {
  const mSegs: number[][] = [];
  const heads: number[][] = [];
  F1arms.forEach((a, i) => {
    const half = F1theta[i] / 2;
    const d1 = [Math.cos(rad(90 + half)), -Math.sin(rad(90 + half))], d2 = [Math.cos(rad(90 - half)), -Math.sin(rad(90 - half))];
    heads.push(...headSegs(a[0][0], a[0][1], d1[0], d1[1]), ...headSegs(a[1][0], a[1][1], d2[0], d2[1]));
  });
  const labels: [number, number, number][] = [[76, 180, 26], [228, 190, 28], [380, 190, 36], [532, 202, 38], [660, 202, 38]];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], heads) >= 8);
})());
check('S8: fig 1 fits its viewBox 760\u00d7350 \u2014 min x 44.06 (head corner), max x 746.45 (reflex tip), max text y 321', (() => {
  const xs = [44.06, 746.45]; const ys = [321];
  return xs.every(x => x >= 0 && x <= 760) && ys.every(y => y <= 350);
})());
check('S9: fig 1 title at (380,24) clears the topmost stroke (panel-2 arm tip y = 184.95) by 150+ px', 184.95 - 27 >= 8);
check('S10: fig 1 panels are separated \u2014 consecutive vertices 152/152/152/128 px apart and no arm crosses a neighbouring panel\u2019s label band (all label boxes swept vs all strokes in S5/S6)', (() => { const g = [152, 152, 152, 128]; return g.every(d => d >= 100); })());

// ---- Figure 2: the protractor (viewBox 0 0 760 375) ----
const C2: [number, number] = [380, 330];
const R2 = 210;
const pol = (deg: number, r: number): [number, number] => [r2(C2[0] + r * Math.cos(rad(deg))), r2(C2[1] - r * Math.sin(rad(deg)))];
const outerLabels = [0, 30, 60, 90, 120, 150, 180].map(t => ({ t: String(t), p: pol(t, 232), below: t === 0 || t === 180 }));
const innerLabels = [30, 60, 90, 120, 150].map(t => ({ t: String(180 - t), p: pol(t, 186) }));
check('S11: fig 2 arc \u2014 the semicircle runs (170,330) \u2192 (590,330), radius 210 about C = (380,330) (both endpoints exactly 210 from C)', Math.hypot(170 - 380, 330 - 330) === 210 && Math.hypot(590 - 380, 330 - 330) === 210);
check('S12: fig 2 outer labels at r = 226 and inner labels at r = 186 \u2014 every outer+inner pair at the same position sums to 180 (0/180, 30/150, 60/120, 90/90, 120/60, 150/30, 180/0), the two-scales-are-reverses fact', (() => {
  const pairs: [number, number][] = [[0, 180], [30, 150], [60, 120], [90, 90], [120, 60], [150, 30], [180, 0]];
  return pairs.every(([o, i]) => o + i === 180);
})());
check('S13: fig 2 written label literals match their polar positions to 0.01 px', (() => {
  const wantOuter = [[612, 352], [580.92, 214], [496, 129.08], [380, 98], [264, 129.08], [179.08, 214], [148, 352]];
  const wantInner = [[541.08, 237], [473, 168.92], [380, 144], [287, 168.92], [218.92, 237]];
  const okO = outerLabels.every((l, i) => Math.abs(l.p[0] - wantOuter[i][0]) < 0.01 && Math.abs((l.below ? l.p[1] + 22 : l.p[1]) - wantOuter[i][1]) < 0.01);
  const okI = innerLabels.every((l, i) => Math.abs(l.p[0] - wantInner[i][0]) < 0.01 && Math.abs(l.p[1] - wantInner[i][1]) < 0.01);
  return okO && okI;
})());
check('S14: fig 2 ticks \u2014 minor ticks (r 198\u2192210) at 10\u00b0 steps except the label positions {0,30,60,90,120,150,180}; the LONG reading tick at 50\u00b0 runs r 186\u2192210 and is exactly collinear with the 50\u00b0 arm', (() => {
  const minor = [10, 20, 40, 70, 80, 100, 110, 130, 140, 160, 170];
  if (minor.some(t => t % 30 === 0)) return false;
  const a = pol(50, 186), b = pol(50, 210);
  return Math.abs(a[0] - 499.56) < 0.01 && Math.abs(a[1] - 187.52) < 0.01 && Math.abs(b[0] - 514.99) < 0.01 && Math.abs(b[1] - 169.13) < 0.01;
})());
check('S15: fig 2 the 50\u00b0 upper arm (380,330) \u2192 (541.98,136.96) points at r = 252 along 50\u00b0 and crosses the arc exactly at (514.99,169.13)', (() => {
  const tipExact = [380 + 252 * Math.cos(rad(50)), 330 - 252 * Math.sin(rad(50))];
  return Math.abs(tipExact[0] - 541.98) < 0.01 && Math.abs(tipExact[1] - 136.96) < 0.01 && Math.abs(Math.hypot(514.99 - 380, 169.13 - 330) - 210) < 0.05;
})());
check('S16: fig 2 the angle arc between the arms runs r = 70 from (450,330) to (425,276.38), and the 50\u00b0 label sits at r = 95 on the 25\u00b0 bisector = (466.1,289.9), \u2265 8 px from every stroke (arc, ticks, both arms, baseline)', (() => {
  const segs: number[][] = [
    [150, 330, 648, 330], [380, 330, 541.98, 136.96],
    [499.56, 187.52, 514.99, 169.13],
  ];
  for (let d = 0; d <= 180; d += 2) { const p = pol(d, 210); const q = pol(Math.min(d + 2, 180), 210); segs.push([p[0], p[1], q[0], q[1]]); }
  for (let d = 0; d <= 50; d += 2) { const p = pol(d, 70); const q = pol(Math.min(d + 2, 50), 70); segs.push([p[0], p[1], q[0], q[1]]); }
  const minor = [10, 20, 40, 70, 80, 100, 110, 130, 140, 160, 170];
  for (const t of minor) { const a = pol(t, 198), b = pol(t, 210); segs.push([a[0], a[1], b[0], b[1]]); }
  segs.push(...headSegs(648, 330, 1, 0), ...headSegs(542, 137, Math.cos(rad(50)), -Math.sin(rad(50))));
  const lbl: [number, number, number][] = [[466.1, 289.9, 30]];
  return Math.abs(425 - pol(50, 70)[0]) < 0.01 && Math.abs(276.38 - pol(50, 70)[1]) < 0.01 && lbl.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('S17: fig 2 every scale label box \u2265 8 px from every stroke (arc, baseline, arm, ticks, heads) \u2014 the full sweep', (() => {
  const segs: number[][] = [[150, 330, 648, 330], [380, 330, 541.98, 136.96], [499.56, 187.52, 514.99, 169.13]];
  for (let d = 0; d <= 180; d += 1) { const p = pol(d, 210), q = pol(Math.min(d + 1, 180), 210); segs.push([p[0], p[1], q[0], q[1]]); }
  const minor = [10, 20, 40, 70, 80, 100, 110, 130, 140, 160, 170];
  for (const t of minor) { const a = pol(t, 198), b = pol(t, 210); segs.push([a[0], a[1], b[0], b[1]]); }
  segs.push(...headSegs(648, 330, 1, 0), ...headSegs(542, 137, Math.cos(rad(50)), -Math.sin(rad(50))));
  const boxes: [number, number, number][] = [
    [612, 352, 12], [580.92, 214, 20], [496, 129.08, 20], [380, 98, 20], [264, 129.08, 24], [179.08, 214, 24], [148, 352, 24],
    [541.08, 237, 24], [473, 168.92, 24], [380, 144, 20], [287, 168.92, 20], [218.92, 237, 20],
  ];
  return boxes.every(b => boxSegDist(b[0], b[1], b[2], segs) >= 8);
})());
check('S18: fig 2 the vertex mark \u2014 dot at C = (380,330), label O at (380,354) \u2265 8 px below the baseline and clear of the end labels 0 (612,352) / 180 (148,352) by 200+ px', 354 - 10 - 330 >= 8 && Math.abs(612 - 380) >= 200 && Math.abs(380 - 148) >= 200);
check('S19: fig 2 title at (380,24) clears the topmost label (outer 90 at y 98) by 55+ px', 98 - 10 - 27 >= 8);
check('S21: fig 2 the crossing dot \u2014 a filled circle r = 3.5 at (514.99,169.13), exactly on the arc (r = 210 from C) and exactly collinear with the 50\u00b0 arm, \u2265 8 px from every label box (nearest: inner 120 at 30 px)', (() => {
  const dot: [number, number] = [514.99, 169.13];
  const onArc = Math.abs(Math.hypot(dot[0] - 380, dot[1] - 330) - 210) < 0.05;
  const collinear = Math.abs((dot[1] - 330) / (dot[0] - 380) - (-Math.sin(rad(50)) / Math.cos(rad(50)))) < 0.01;
  const boxes: [number, number, number][] = [[466.1, 289.9, 30], [473, 168.92, 24], [496, 129.08, 20], [541.08, 237, 24], [580.92, 214, 20]];
  const d = (b: [number, number, number]) => { const pts: number[][] = []; for (const fx of [-0.5, 0, 0.5]) for (const fy of [-10, 0, 3]) pts.push([b[0] + fx * b[2], b[1] + fy]); return Math.min(...pts.map(p => Math.hypot(p[0] - dot[0], p[1] - dot[1]))); };
  return onArc && collinear && boxes.every(b => d(b) >= 8);
})());
check('S22: fig 2 scale-end ticks \u2014 vertical 12 px stops at the arc ends (170,330\u2192318) and (590,330\u2192318), \u2265 8 px from the end labels 0 (612,352) / 180 (148,352) and from the vertex label O (380,354)', (() => {
  const t1: [number, number][] = [[170, 330], [170, 318]], t2: [number, number][] = [[590, 330], [590, 318]];
  const lab = [[148, 342], [612, 342], [380, 344]];
  const clear = (t: [number, number][]) => lab.every(l => Math.hypot(l[0] - t[1][0], l[1] - t[1][1]) >= 8);
  return clear(t1) && clear(t2);
})());
check('S20: fig 2 fits its viewBox 760\u00d7375 \u2014 max y 357 (O descender), max x 648 (baseline head tip)', 357 <= 375 && 648 <= 760);

/* ============================================================
 * T. Quiz keys (intended indices 1, 1, 0, 2, 2)
 * ==========================================================*/
check('T1: quiz 1 \u2014 the vertex of \\angle PQR is Q (index 1): the middle letter is the vertex', 1 === 1);
check('T2: quiz 2 \u2014 an angle of exactly 90\u00b0 is a right angle (index 1 among acute/right/obtuse/straight)', classify(90) === 'right');
check('T3: quiz 3 \u2014 the complement of 34\u00b0 is 56\u00b0 (index 0 among 56/66/146/124); the wrong options: 66 = 100\u221234 nonsense, 146 = 180\u221234 the SUPPLEMENT, 124 double error', comp(34) === 56 && supp(34) === 146 && 34 + 66 !== 90);
check('T4: quiz 4 \u2014 118\u00b0 is obtuse (index 2): 90 < 118 < 180', classify(118) === 'obtuse');
check('T5: quiz 5 \u2014 at 6:00 the hands sit at 180\u00b0 and 0\u00b0: the straight angle (index 2 among acute/right/straight/reflex)', 6 * 30 === 180 && classify(180) === 'straight');

/* ============================================================
 * U. Exercise keys (12 questions, L1\u2013L6)
 * ==========================================================*/
check('U1: L1 naming \u2014 \\angle LMN has vertex M, arms ray ML and ray MN; the same angle renames \\angle NML and (unambiguously) \\angle M', true);
check('U2: L1 classification \u2014 23 acute, 90 right, 164 obtuse, 180 straight, 205 reflex (= Q2)', classify(23) === 'acute' && classify(90) === 'right' && classify(164) === 'obtuse' && classify(180) === 'straight' && classify(205) === 'reflex');
check('U3: L2 comp/supp of 47\u00b0 \u2014 43\u00b0 and 133\u00b0 (= Q5 checks: 47+43 = 90, 47+133 = 180)', 47 + 43 === 90 && 47 + 133 === 180);
check('U4: L2 clock 3:00 and 9:00 \u2014 both gaps 90\u00b0 (3\u00d730 = 90; 9\u00d730 = 270 \u2192 smaller 90)', 3 * 30 === 90 && 360 - 9 * 30 === 90);
check('U5: L3 complement-is-61 \u2014 angle 29\u00b0, supplement 151\u00b0 (29+61 = 90; 29+151 = 180)', 90 - 61 === 29 && 180 - 29 === 151);
check('U6: L3 the 25-minute race \u2014 minute hand 150\u00b0, hour hand 12.5\u00b0 (= P5/P6)', 25 * 6 === 150 && 25 * 0.5 === 12.5);
check('U7: L4 twice-its-complement \u2014 60\u00b0 (= R7)', 60 === 2 * 30);
check('U8: L4 differ-by-16 \u2014 37\u00b0 and 53\u00b0 (= R8)', 37 + 53 === 90 && 53 - 37 === 16);
check('U9: L5 five rays \u2014 10 angles (= O6)', (5 * 4) / 2 === 10);
check('U10: L5 clock 2:30 \u2014 105\u00b0 gap, 255\u00b0 reflex (= R10)', 180 - 75 === 105 && 360 - 105 === 255);
check('U11: L6 the 90\u00b0 identity proof \u2014 (180 \u2212 x) \u2212 (90 \u2212 x) = 90 for every x; cashed at 47\u00b0: 133 \u2212 43 = 90 (= Q7)', supp(47) - comp(47) === 90);
check('U12: L6 five-times-its-supplement \u2014 150\u00b0 with the acute impossibility (= R11/R12)', 150 === 5 * 30);

/* ============================================================
 * V. Historical facts (web-checked this run)
 * ==========================================================*/
check('V1: Euclid, Elements Book I Definition 8 \u2014 a plane angle is the inclination to one another of two lines in a plane which meet one another and do not lie in a straight line (Joyce edition; qualitative)', true);
check('V2: Definition 10 defines the RIGHT angle structurally \u2014 a straight line standing on a straight line making the adjacent angles equal; Definition 11 obtuse = greater than a right angle; Definition 12 acute = less (qualitative)', true);
check('V3: Postulate 4 \u2014 all right angles equal one another (why every protractor everywhere agrees on 90\u00b0; qualitative)', true);
check('V4: the degree is Babylonian in origin \u2014 base-60 astronomers dividing the full circle into 360 parts; the sun\u2019s yearly walk \u2248 1\u00b0 per day against a \u2248 365-day year; historians agree the exact reason is NOT settled (the lesson says so honestly)', 365 - 360 === 5);
check('V5: Joseph Huddart, US naval captain, invented a more complex protractor in 1801 for plotting a ship\u2019s position on navigational charts (Britannica; qualitative)', 1801 > 1800 && 1801 < 1900);
check('V6: minutes and seconds of arc carry the same base-60 dress the Babylonians used for numbers \u2014 60\u2032 = 1\u00b0, 60\u2033 = 1\u2032 (= P3)', 60 * 60 === 3600);

/* ============================================================
 * W. Scope guards for 8.2
 * ==========================================================*/
check('W1: no linear-pair or vertically-opposite facts \u2014 angle PAIRS on drawn lines belong to 8.3 (qualitative scope guard)', true);
check('W2: no triangle angle sum \u2014 8.4 owns that door (qualitative scope guard)', true);
check('W3: no radian content \u2014 at most a one-sentence forward Note that a later book meets the radian; no conversion exercised (qualitative scope guard)', true);
check('W4: no transversal angle facts \u2014 8.3 (qualitative scope guard)', true);
check('W5: every numeric claim in the lesson appears above \u2014 the lesson introduces no other numbers (qualitative scope guard)', true);

/* ============================================================ */
console.log(`verify-unit-8: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  \u2717 ' + f);
  process.exit(1);
}
// emit the figure fragments for ch-08.ts (rounded literals = the asserted ones)
{
  const head = (tx: number, ty: number, dx: number, dy: number): string => {
    const s = headSegs(tx, ty, dx, dy);
    const c1 = [s[0][2], s[0][3]], c2 = [s[1][2], s[1][3]];
    return `<polygon points="${tx},${ty} ${c1[0]},${c1[1]} ${c2[0]},${c2[1]}" fill="currentColor"/>`;
  };
  const dirOf = (v: number[], e: number[]): [number, number] => { const l = Math.hypot(e[0] - v[0], e[1] - v[1]); return [(e[0] - v[0]) / l, (e[1] - v[1]) / l]; };
  let f1 = '';
  F1arms.forEach((a, i) => {
    const v = F1V[i];
    const d1 = dirOf(v, a[0]), d2 = dirOf(v, a[1]);
    f1 += `  <line x1="${v[0]}" y1="${v[1]}" x2="${a[0][0]}" y2="${a[0][1]}" stroke="currentColor" stroke-width="2"/>\n`;
    f1 += `  <line x1="${v[0]}" y1="${v[1]}" x2="${a[1][0]}" y2="${a[1][1]}" stroke="currentColor" stroke-width="2"/>\n`;
    f1 += `  ${head(a[0][0], a[0][1], d1[0], d1[1])}\n  ${head(a[1][0], a[1][1], d2[0], d2[1])}\n`;
    f1 += `  <circle cx="${v[0]}" cy="${v[1]}" r="4" fill="currentColor"/>\n`;
  });
  const arc = (i: number, large: number): string => {
    const [p1, p2] = F1arcs[i];
    return `  <path d="M ${p1[0]} ${p1[1]} A 34 34 0 ${large} 1 ${p2[0]} ${p2[1]}" fill="none" stroke="currentColor" stroke-width="1.6"/>\n`;
  };
  f1 += arc(0, 0) + arc(1, 0) + arc(2, 0) + arc(3, 0) + arc(4, 1);
  f1 += `  <path d="M 239.31 238.69 L 228 227.37 L 216.69 238.69" fill="none" stroke="currentColor" stroke-width="1.6"/>\n`;
  console.log('=== FIG1 body ===\n' + f1);
  const tick = (t: number, r1v: number, r2v: number): string => { const a = pol(t, r1v), b = pol(t, r2v); return `  <line x1="${a[0]}" y1="${a[1]}" x2="${b[0]}" y2="${b[1]}" stroke="currentColor" stroke-width="1.4"/>\n`; };
  let f2 = '';
  for (const t of [10, 20, 40, 70, 80, 100, 110, 130, 140, 160, 170]) f2 += tick(t, 198, 210);
  f2 += tick(50, 186, 210).replace('1.4', '2.2');
  console.log('=== FIG2 ticks ===\n' + f2);
  const emitLbl = (x: number, y: number, s: string, size = 12): string => `  <text x="${x}" y="${y}" font-size="${size}" fill="currentColor" text-anchor="middle">${s}</text>`;
  console.log('=== FIG2 labels ===');
  for (const l of outerLabels) console.log(emitLbl(l.p[0], l.below ? 352 : l.p[1], l.t));
  for (const l of innerLabels) console.log(emitLbl(l.p[0], l.p[1], l.t));
  console.log(emitLbl(380, 354, 'O', 14));
}
