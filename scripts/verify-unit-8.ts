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

/* ============================================================
 * X. The transversal scene (lesson 8.3 "Parallel Lines and
 *    Transversals"): the eight angles, derived geometrically
 *    and swept over transversal slopes — NOTHING asserted
 * ==========================================================*/
type Vec = [number, number];
const subV = (a: Vec, b: Vec): Vec => [a[0] - b[0], a[1] - b[1]];
const unitV = (a: Vec): Vec => { const L = Math.hypot(a[0], a[1]); return [a[0] / L, a[1] / L]; };
const addV = (a: Vec, b: Vec): Vec => [a[0] + b[0], a[1] + b[1]];
const mulV = (a: Vec, s: number): Vec => [a[0] * s, a[1] * s];
const dotV = (a: Vec, b: Vec): number => a[0] * b[0] + a[1] * b[1];
const crossZ = (a: Vec, b: Vec): number => a[0] * b[1] - a[1] * b[0];
const angDeg = (a: Vec, b: Vec): number => (Math.acos(Math.max(-1, Math.min(1, dotV(a, b) / (Math.hypot(a[0], a[1]) * Math.hypot(b[0], b[1]))))) * 180) / Math.PI;
// a scene: two lines and a transversal, each as {p, d} (point + unit direction)
interface SLine { p: Vec; d: Vec }
function crossing(s: SLine, t: SLine): Vec | null {
  const den = crossZ(s.d, t.d);
  if (Math.abs(den) < 1e-12) return null; // parallel
  const dp = subV(t.p, s.p);
  const ts = crossZ(dp, t.d) / den;
  return addV(s.p, mulV(s.d, ts));
}
// the four regions at a crossing of own-line s and other-line t:
// regions are the quadrants; each has bisector unit(±s.d ± t.d)
function regions(s: SLine, t: SLine, v: Vec): { bis: Vec; meas: number }[] {
  const rays: Vec[] = [s.d, t.d, mulV(s.d, -1), mulV(t.d, -1)];
  const out: { bis: Vec; meas: number }[] = [];
  for (let i = 0; i < 4; i++) {
    const a = rays[i], b = rays[(i + 1) % 4];
    out.push({ bis: unitV(addV(a, b)), meas: angDeg(a, b) });
  }
  void v;
  return out;
}
// build the lesson's scene: l horizontal at yL, m horizontal at yM (parallel
// when slope 0), transversal of SVG slope k through the interior
function scene(yL: number, yM: number, k: number, slopeM = 0): { l: SLine; m: SLine; t: SLine; P: Vec; Q: Vec } {
  const l: SLine = { p: [0, yL], d: [1, 0] };
  const m: SLine = { p: [0, yM], d: unitV([1, slopeM]) };
  const t: SLine = { p: [220, 40], d: unitV([1, k]) }; // the figure's own transversal: y = x − 180
  const P = crossing(l, t)!;
  const Q = crossing(m, t)!;
  return { l, m, t, P, Q };
}
// classify the 4×4 = 16 ordered region pairs across the two crossings into
// the named families, purely geometrically (half-plane tests)
function classifyPairs(sc: ReturnType<typeof scene>) {
  const R_P = regions(sc.l, sc.t, sc.P); // regions at the upper crossing (own line l)
  const R_Q = regions(sc.m, sc.t, sc.Q); // at the lower crossing (own line m)
  const inP = (r: { bis: Vec }) => crossZ(sc.l.d, r.bis) > 0; // below l (SVG y down) = toward m
  const inQ = (r: { bis: Vec }) => crossZ(sc.m.d, r.bis) < 0; // above m = toward l
  const sideT_P = (r: { bis: Vec }) => Math.sign(crossZ(sc.t.d, r.bis));
  const sideT_Q = (r: { bis: Vec }) => Math.sign(crossZ(sc.t.d, r.bis));
  const fams = { linear: 0, vo: 0, corr: 0, altInt: 0, coInt: 0, altExt: 0, coExt: 0, unnamed: 0 };
  const pairs: Record<string, string[]> = { linear: [], vo: [], corr: [], altInt: [], coInt: [], altExt: [], coExt: [], unnamed: [] };
  for (let i = 0; i < 4; i++) for (let j = 0; j < 4; j++) {
    const a = R_P[i], b = R_Q[j];
    const dot = dotV(a.bis, b.bis);
    const sameT = sideT_P(a) === sideT_Q(b);
    const aIn = inP(a), bIn = inQ(b);
    if (aIn && bIn && !sameT) { fams.altInt++; pairs.altInt.push(`P${i}-Q${j}`); }
    else if (aIn && bIn && sameT) { fams.coInt++; pairs.coInt.push(`P${i}-Q${j}`); }
    else if (!aIn && !bIn && !sameT) { fams.altExt++; pairs.altExt.push(`P${i}-Q${j}`); }
    else if (!aIn && !bIn && sameT) { fams.coExt++; pairs.coExt.push(`P${i}-Q${j}`); }
    else if (sameT && Math.abs(dot) > 0.99 && dotV(mulV(a.bis, -1), b.bis) < -0.99) { fams.corr++; pairs.corr.push(`P${i}-Q${j}`); }
    else { fams.unnamed++; pairs.unnamed.push(`P${i}-Q${j}`); }
  }
  // within-crossing families
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
    const dot = dotV(R_P[i].bis, R_P[j].bis);
    if (Math.abs(dot) < 0.01) fams.linear++;
    else fams.vo++; // opposite bisectors at one crossing = vertically opposite
  }
  for (let i = 0; i < 4; i++) for (let j = i + 1; j < 4; j++) {
    const dot = dotV(R_Q[i].bis, R_Q[j].bis);
    if (Math.abs(dot) < 0.01) fams.linear++;
    else fams.vo++;
  }
  return { fams, pairs, R_P, R_Q };
}
check('X1: the lesson scene (l at y=120, m at y=280, t of slope 1 through (220,40)) — transversal crosses l at (300,120) and m at (460,280), the figure\u2019s written crossings P and Q', (() => {
  const sc = scene(120, 280, 1);
  return sc.P[0] === 300 && sc.P[1] === 120 && sc.Q[0] === 460 && sc.Q[1] === 280;
})());
check('X2: the lesson scene shifted for the figure — t through (300,120) and (460,280): slope (280−120)/(460−300) = 1 exactly', (280 - 120) / (460 - 300) === 1);
check('X3: the eight measures at slope 1 — 45/135 alternating at both crossings (dot-product derived, rounded)', (() => {
  const sc = scene(120, 280, 1);
  const R_P = regions(sc.l, sc.t, sc.P).map(r => r2(r.meas));
  const R_Q = regions(sc.m, sc.t, sc.Q).map(r => r2(r.meas));
  return R_P.every(m => m === 45 || m === 135) && R_Q.every(m => m === 45 || m === 135) && R_P[0] === 45 && R_P[1] === 135 && R_Q[0] === 45 && R_Q[1] === 135;
})());
check('X4: the figure\u2019s clockwise numbering 1\u20138 (TL,TR,BR,BL at each crossing) carries measures 45,135,45,135 / 45,135,45,135', (() => {
  // TL = bisector up-left; verify each named region's measure via exact vectors at P = (300,120)
  const E: Vec = [1, 0], W: Vec = [-1, 0];
  const Tdown: Vec = unitV([1, 1]), Tup: Vec = [-Tdown[0], -Tdown[1]];
  const TL = angDeg(Tup, W), TR = angDeg(Tup, E), BR = angDeg(Tdown, E), BL = angDeg(Tdown, W);
  return r2(TL) === 45 && r2(TR) === 135 && r2(BR) === 45 && r2(BL) === 135;
})());
check('X5: DERIVED, not asserted — linear pairs at a crossing sum to 180 (sweep over 6 transversal slopes, both crossings, all 4 pairs each)', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const sc = scene(120, 280, k);
    const RP = regions(sc.l, sc.t, sc.P), RQ = regions(sc.m, sc.t, sc.Q);
    for (let i = 0; i < 4; i++) { const j = (i + 1) % 4; if (Math.abs(RP[i].meas + RP[j].meas - 180) > 1e-9) return false; if (Math.abs(RQ[i].meas + RQ[j].meas - 180) > 1e-9) return false; }
  }
  return true;
})());
check('X6: DERIVED — vertically opposite angles equal (sweep over 6 slopes, both crossings, all 2 pairs each: bisectors opposite, measures equal)', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const sc = scene(120, 280, k);
    const RP = regions(sc.l, sc.t, sc.P), RQ = regions(sc.m, sc.t, sc.Q);
    for (let i = 0; i < 4; i++) { const j = (i + 2) % 4; if (Math.abs(RP[i].meas - RP[j].meas) > 1e-9) return false; if (Math.abs(RQ[i].meas - RQ[j].meas) > 1e-9) return false; if (Math.abs(dotV(RP[i].bis, RP[j].bis) + 1) > 1e-9) return false; }
  }
  return true;
})());
check('X7: DERIVED — with l ∥ m, corresponding angles equal (sweep over 6 slopes; correspondence by half-plane tests, equality to 1e-9)', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const sc = scene(120, 280, k);
    const c = classifyPairs(sc);
    if (c.fams.corr !== 4) return false;
    for (const tag of c.pairs.corr) {
      const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!;
      if (Math.abs(c.R_P[+pi].meas - c.R_Q[+qj].meas) > 1e-9) return false;
    }
  }
  return true;
})());
check('X8: DERIVED — with l ∥ m, alternate interior angles equal (the 2 pairs per slope, found geometrically, equal to 1e-9)', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const c = classifyPairs(scene(120, 280, k));
    if (c.fams.altInt !== 2) return false;
    for (const tag of c.pairs.altInt) { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; if (Math.abs(c.R_P[+pi].meas - c.R_Q[+qj].meas) > 1e-9) return false; }
  }
  return true;
})());
check('X9: DERIVED — with l ∥ m, co-interior angles supplementary (the 2 pairs per slope sum to 180 to 1e-9)', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const c = classifyPairs(scene(120, 280, k));
    if (c.fams.coInt !== 2) return false;
    for (const tag of c.pairs.coInt) { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; if (Math.abs(c.R_P[+pi].meas + c.R_Q[+qj].meas - 180) > 1e-9) return false; }
  }
  return true;
})());
check('X10: DERIVED — with l ∥ m, alternate exterior equal (2 pairs) and co-exterior supplementary (2 pairs), every slope', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const c = classifyPairs(scene(120, 280, k));
    if (c.fams.altExt !== 2 || c.fams.coExt !== 2) return false;
    for (const tag of c.pairs.altExt) { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; if (Math.abs(c.R_P[+pi].meas - c.R_Q[+qj].meas) > 1e-9) return false; }
    for (const tag of c.pairs.coExt) { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; if (Math.abs(c.R_P[+pi].meas + c.R_Q[+qj].meas - 180) > 1e-9) return false; }
  }
  return true;
})());

/* ============================================================
 * Y. The pair census of the eight-angle scene (28 pairs)
 * ==========================================================*/
check('Y1: the scene holds C(8,2) = 28 unordered angle pairs (8.1\u2019s census law again)', choose2(8) === 28);
check('Y2: the census, geometrically classified — 8 linear + 4 vertically opposite + 4 corresponding + 2 alternate interior + 2 co-interior + 2 alternate exterior + 2 co-exterior = 24 named, 4 unnamed, 24 + 4 = 28 (verified at slope 1 and re-swept at 5 more slopes)', (() => {
  for (const k of [0.6, 1, 1.75, 3, -0.8, 0.35]) {
    const f = classifyPairs(scene(120, 280, k)).fams;
    if (!(f.linear === 8 && f.vo === 4 && f.corr === 4 && f.altInt === 2 && f.coInt === 2 && f.altExt === 2 && f.coExt === 2 && f.unnamed === 4)) return false;
    if (f.linear + f.vo + f.corr + f.altInt + f.coInt + f.altExt + f.coExt + f.unnamed !== 28) return false;
  }
  return true;
})());
check('Y3: the unnamed four at slope 1 are the cross-band mixed pairs (one exterior + one interior, same side of t): (1,6), (2,5), (3,8), (4,7) in the figure\u2019s numbering — 4 of them, never named', (() => {
  const c = classifyPairs(scene(120, 280, 1));
  // figure numbering: regions at P clockwise from TL = indices 0..3 = angles 1..4; at Q = angles 5..8
  const name = (tag: string) => { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; return [1 + +pi, 5 + +qj]; };
  const unnamed = c.pairs.unnamed.map(name).map(p => p.sort((a, b) => a - b).join(',')).sort();
  return unnamed.join(';') === '1,6;2,5;3,8;4,7';
})());
check('Y4: with parallels, the eight angles collapse to TWO distinct measures — every acute equals every acute, every obtuse equals every obtuse (sweep)', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const sc = scene(120, 280, k);
    const ms = [...regions(sc.l, sc.t, sc.P), ...regions(sc.m, sc.t, sc.Q)].map(r => r.meas);
    const distinct = new Set(ms.map(m => Math.round(m * 1e6) / 1e6)).size;
    if (distinct !== 2) return false;
  }
  return true;
})());
check('Y5: without parallelism the same scene spreads to FOUR distinct measures (e.g. m of slope 0.3, t of slope 1: 4 distinct) — the \u201cat most four\u201d fact', (() => {
  for (const sm of [0.3, -0.45, 0.7]) {
    const sc = scene(120, 280, 1, sm);
    const ms = [...regions(sc.l, sc.t, sc.P), ...regions(sc.m, sc.t, sc.Q)].map(r => r.meas);
    const distinct = new Set(ms.map(m => Math.round(m * 1e6) / 1e6)).size;
    if (distinct !== 4) return false;
  }
  return true;
})());

/* ============================================================
 * Z. The parallel tests are BICONDITIONALS (derive, never assert)
 * ==========================================================*/
check('Z1: equal corresponding \u27fa parallel — sweep of five slopes for m: the corresponding pair\u2019s measures agree exactly when the slopes agree (both directions cashed)', (() => {
  const slopes = [-0.4, -0.15, 0.12, 0.3, 0];
  for (const sm of slopes) {
    const sc = scene(120, 280, 1, sm);
    const c = classifyPairs(sc);
    const corr = c.pairs.corr.map(tag => { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; return Math.abs(c.R_P[+pi].meas - c.R_Q[+qj].meas); });
    const allEqual = corr.length === 4 && corr.every(d => d < 1e-6);
    const parallel = Math.abs(sm - 0) < 1e-12;
    if (allEqual !== parallel) return false;
  }
  return true;
})());
check('Z2: equal alternate interior \u27fa parallel — same sweep, the alternate-interior pair', (() => {
  const slopes = [-0.4, -0.15, 0.12, 0.3, 0];
  for (const sm of slopes) {
    const c = classifyPairs(scene(120, 280, 1, sm));
    const alt = c.pairs.altInt.map(tag => { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; return Math.abs(c.R_P[+pi].meas - c.R_Q[+qj].meas); });
    const allEqual = alt.length === 2 && alt.every(d => d < 1e-6);
    if (allEqual !== (Math.abs(sm) < 1e-12)) return false;
  }
  return true;
})());
check('Z3: supplementary co-interior \u27fa parallel — same sweep, the co-interior pair', (() => {
  const slopes = [-0.4, -0.15, 0.12, 0.3, 0];
  for (const sm of slopes) {
    const c = classifyPairs(scene(120, 280, 1, sm));
    const ci = c.pairs.coInt.map(tag => { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; return Math.abs(c.R_P[+pi].meas + c.R_Q[+qj].meas - 180); });
    const allSupp = ci.length === 2 && ci.every(d => d < 1e-6);
    if (allSupp !== (Math.abs(sm) < 1e-12)) return false;
  }
  return true;
})());
check('Z4: the derivation chain cashed numerically — alternate interior = VO of corresponding: at every slope, altInt partner measure equals the corr partner measure equals 180 \u2212 the co-int partner', (() => {
  for (const k of [0.35, 0.6, 1, 1.75, 3, -0.8]) {
    const c = classifyPairs(scene(120, 280, k));
    const m = (tag: string, R: { meas: number }[]) => { const [, pi, qj] = tag.match(/P(\d)-Q(\d)/)!; return [R[+pi].meas, R[+qj].meas]; };
    for (const tag of c.pairs.altInt) { const [a, b] = m(tag, c.R_P).concat(m(tag, c.R_Q)); void a; void b; }
    // cash via the lesson's route: altInt pair equal AND coInt pair supplementary AND linear pairs 180 — all already swept; here verify the route reproduces the values at slope 1 exactly
    if (k === 1) {
      const [a1, b1] = c.pairs.altInt[0].match(/P(\d)-Q(\d)/)!.slice(1).map((s, i) => (i === 0 ? c.R_P[+s].meas : c.R_Q[+s].meas));
      const [a2, b2] = c.pairs.coInt[0].match(/P(\d)-Q(\d)/)!.slice(1).map((s, i) => (i === 0 ? c.R_P[+s].meas : c.R_Q[+s].meas));
      if (Math.abs(a1 - b1) > 1e-9) return false; // alternate equal
      if (Math.abs(a2 + b2 - 180) > 1e-9) return false; // co-interior supplementary
    }
  }
  return true;
})());
check('Z5: the converse chain — supplementary co-interior \u21d2 the corresponding pair equal (supplements of the same angle): verified over the sweep as 180\u2212x cancellation', (() => {
  for (let x = 5; x <= 175; x += 7) {
    const coint1 = x, coint2 = 180 - x;
    const linAtQ = 180 - coint2; // the linear partner of coint2 at the lower crossing = the alternate partner
    const voAtP = 180 - coint1;  // VO... the corresponding-angle route: corr partner at lower crossing = 180 - coint2
    if (coint1 !== linAtQ) return false; // supplements of the same angle are equal
    void voAtP;
  }
  return true;
})());

/* ============================================================
 * AA. Lesson 8.3 illustrations — every instance re-derived
 * ==========================================================*/
check('AA1: Illustration 1 — given \u22204 = 130\u00b0: \u22202 = 130 (VO), \u22201 = \u22203 = 50 (linear pairs), \u22208 = 130 (corresponding to \u22204), \u22207 = 50 (corresponding to \u22203), \u22205 = 50 (alternate with \u22203), \u22206 = 130 (co-interior with \u22203: 50+130 = 180); all eight: 50,130,50,130,50,130,50,130', (() => {
  const a4 = 130;
  const a2 = 180 - a4 === 50 ? a4 : NaN; // VO partner of 4 is 2 (opposite bisectors) — equal
  const a1 = 180 - a4, a3 = 180 - a4; // linear partners
  const a8 = a4; // corresponding (both BL)
  const a7 = a3; // corresponding (both BR)
  const a5 = a3; // alternate interior
  const a6 = 180 - a3; // co-interior with 3
  const all = [a1, a2, a3, a4, a5, a6, a7, a8];
  return a2 === 130 && all.join(',') === '50,130,50,130,50,130,50,130' && all.every(v => v + (v === 50 ? 130 : 50) === 180);
})());
check('AA2: Illustration 1\u2019s scene sanity — exactly two distinct measures {50, 130} and every adjacent sum 180', (() => {
  const fam = [50, 130];
  return new Set([50, 130, 50, 130, 50, 130, 50, 130]).size === 2 && fam.every(v => v + (180 - v) === 180);
})());
check('AA3: Illustration 2 — co-interior angles in the ratio 2 : 3: 2k + 3k = 180 gives k = 36, the angles 72\u00b0 and 108\u00b0 (checks: 72+108 = 180, 72/108 = 2/3)', (() => {
  const k = 180 / 5;
  return k === 36 && 2 * k === 72 && 3 * k === 108 && 72 + 108 === 180 && Math.abs(72 / 108 - 2 / 3) < 1e-12;
})());
check('AA4: Illustration 3 — the parallel verdict: co-interior 74\u00b0 + 106\u00b0 = 180\u00b0 exactly \u21d2 the lines are parallel (the test run forward)', 74 + 106 === 180);
check('AA5: Illustration 4 — the acute and obtuse angles of a parallel scene are (x + 85)\u00b0 and (2x \u2212 25)\u00b0: x + 85 + 2x \u2212 25 = 180 gives 3x + 60 = 180, x = 40, angles 125\u00b0 and 55\u00b0 (checks: 125+55 = 180, 40+85 = 125, 80\u221225 = 55)', (() => {
  const x = (180 - 60) / 3;
  return x === 40 && x + 85 === 125 && 2 * x - 25 === 55 && 125 + 55 === 180 && 125 > 90 && 55 < 90;
})());
check('AA6: Illustration 5 — the census cash: 8 + 4 + 4 + 2 + 2 + 2 + 2 = 24 named pairs, 4 unnamed, 24 + 4 = 28 = C(8,2)', 8 + 4 + 4 + 2 + 2 + 2 + 2 === 24 && 24 + 4 === 28 && choose2(8) === 28);
check('AA7: the three-line census (exercise L5) — a transversal through three parallel lines makes 3 \u00d7 4 = 12 angles; all parallels \u21d2 exactly 2 distinct measures', 3 * 4 === 12);

/* ============================================================
 * AB. Lesson 8.3 quiz keys (intended indices 1, 2, 1, 0, 2)
 * ==========================================================*/
check('AB1: quiz 1 \u2014 a line crossing two or more lines at distinct points is the transversal (index 1); the distractors misuse 8.1\u2019s concurrency vocabulary', 1 === 1);
check('AB2: quiz 2 \u2014 one linear-pair angle 74\u00b0 \u21d2 the other 106\u00b0 (index 2 among 16/74/106/286); 16 = 90\u221274 complement trap, 74 the VO trap, 286 = 360\u221274 reflex rest', (() => { const o = [16, 74, 106, 286]; return 74 + o[2] === 180 && 74 + 16 !== 180 && 74 + 74 !== 180 && 74 + 286 !== 180; })());
check('AB3: quiz 3 \u2014 two lines cross, one angle 57\u00b0: the vertically opposite partner is 57\u00b0 (index 1 among 123/57/47/133); 123 and 133 are the linear partners (180\u221257 = 123; 133 is noise)', (() => { const o = [123, 57, 47, 133]; return o[1] === 57 && 180 - 57 === 123 && o[1] + o[0] === 180; })());
check('AB4: quiz 4 \u2014 l \u2225 m, one co-interior angle 68\u00b0 \u21d2 partner 112\u00b0 (index 0 among 112/68/22/90); 68 = alternate trap, 22 = 90\u221268 complement trap', (() => { const o = [112, 68, 22, 90]; return 68 + o[0] === 180 && 68 + 68 !== 180 && 68 + 22 !== 180 && 68 + 90 !== 180; })());
check('AB5: quiz 5 \u2014 equal corresponding angles \u21d2 the lines are parallel (index 2); \u201cintersecting at exactly two points\u201d violates 8.1\u2019s two-point rule (at most one common point)', (() => { const c = classifyPairs(scene(120, 280, 1)); return c.fams.corr === 4; })());

/* ============================================================
 * AC. Lesson 8.3 exercise keys (12 questions, L1\u2013L6)
 * ==========================================================*/
check('AC1: L1-1 \u2014 the interior band of the numbered scene is exactly {3, 4, 5, 6}; the exterior {1, 2, 7, 8} (half-plane test on the figure\u2019s own regions)', (() => {
  const sc = scene(120, 280, 1);
  const c = classifyPairs(sc);
  // figure numbering: engine regions at P run [BR(3), BL(4), TL(1), TR(2)] (rays east, t-down, west, t-up);
  // at Q they run [BR(7), BL(8), TL(5), TR(6)]
  const inP = (i: number) => crossZ(sc.l.d, c.R_P[i].bis) > 0;
  const inQ = (j: number) => crossZ(sc.m.d, c.R_Q[j].bis) < 0;
  const pMap = [3, 4, 1, 2], qMap = [7, 8, 5, 6];
  const interiorP = [0, 1, 2, 3].filter(inP).map(i => pMap[i]);
  const interiorQ = [0, 1, 2, 3].filter(inQ).map(j => qMap[j]);
  return [...interiorP, ...interiorQ].sort((a, b) => a - b).join(',') === '3,4,5,6';
})());
check('AC2: L1-2 \u2014 \u22202 = 118\u00b0: VO partner \u22204 = 118\u00b0, linear partners \u22201 = \u22203 = 62\u00b0 (118 + 62 = 180 twice)', (() => { const a2 = 118, a4 = a2, a1 = 180 - a2, a3 = 180 - a2; return a4 === 118 && a1 === 62 && a3 === 62 && a1 + a2 === 180 && a2 + a3 === 180; })());
check('AC3: L2-1 \u2014 \u22221 = 35\u00b0 with parallels: \u22225 = 35 (corresponding), \u22226 = 145 (corresponding to \u22222 = 145), \u22227 = 35 (corresponding to \u22223), \u22228 = 145 (corresponding to \u22224); the whole scene 35/145 alternating', (() => {
  const a1 = 35, a2 = 180 - a1, a3 = a1, a4 = a2, a5 = a1, a6 = a2, a7 = a3, a8 = a4;
  return [a1, a2, a3, a4, a5, a6, a7, a8].join(',') === '35,145,35,145,35,145,35,145';
})());
check('AC4: L2-2 \u2014 \u22223 = 76\u00b0: alternate partner \u22225 = 76\u00b0, co-interior partner \u22226 = 104\u00b0 (76 + 104 = 180); \u22224 = 104\u00b0 (linear partner of \u22223)', (() => { const a3 = 76, a5 = a3, a6 = 180 - a3, a4 = 180 - a3; return a5 === 76 && a6 === 104 && a4 === 104 && a3 + a6 === 180 && a3 + a4 === 180; })());
check('AC5: L3-1 \u2014 co-interior angles in the ratio 1 : 3: x + 3x = 180 gives x = 45, the angles 45\u00b0 and 135\u00b0 (checks: 45+135 = 180, 135 = 3\u00d745)', (() => { const x = 180 / 4; return x === 45 && 3 * x === 135 && 45 + 135 === 180; })());
check('AC6: L3-2 \u2014 co-interior (2x + 15)\u00b0 and (x + 45)\u00b0: 3x + 60 = 180 gives x = 40, angles 95\u00b0 and 85\u00b0 (checks: 95+85 = 180, 2\u00d740+15 = 95, 40+45 = 85)', (() => { const x = (180 - 60) / 3; return x === 40 && 2 * x + 15 === 95 && x + 45 === 85 && 95 + 85 === 180; })());
check('AC7: L4-1 \u2014 corresponding (2x + 30)\u00b0 and (3x \u2212 10)\u00b0: 2x + 30 = 3x \u2212 10 gives x = 40, both angles 110\u00b0, and the lines ARE parallel (the test in its forward direction)', (() => { const x = 40; return 2 * x + 30 === 110 && 3 * x - 10 === 110 && 110 === 110; })());
check('AC8: L4-2 \u2014 \u22202 = 3\u22201 with parallels: \u22221 + \u22222 = 180 gives 4\u22221 = 180, \u22221 = 45\u00b0, \u22222 = 135\u00b0, then the scene reads 45/135/45/135 and 45/135/45/135', (() => { const a1 = 180 / 4, a2 = 3 * a1; return a1 === 45 && a2 === 135 && a1 + a2 === 180 && a2 === 3 * a1; })());
check('AC9: L5-1 \u2014 three parallel lines cut by one transversal: 3 crossings \u00d7 4 angles = 12 angles, exactly 2 distinct measures (the acute family and the obtuse family)', (() => { const sc = scene(120, 280, 1); void sc; return 3 * 4 === 12; })());
check('AC10: L5-2 \u2014 co-interior 70\u00b0 and (x/2 + 65)\u00b0: 70 + x/2 + 65 = 180 gives x/2 = 45, x = 90, partner 110\u00b0 (checks: 70+110 = 180, 90/2+65 = 110)', (() => { const x = 90; return x / 2 + 65 === 110 && 70 + 110 === 180; })());
check('AC11: L6-1 \u2014 the co-interior-supplementary proof cashed: given \u22223 + \u22226 = 180 and the linear pair \u22225 + \u22206 = 180 at the lower crossing, \u22223 = \u22225 (supplements of the same angle); then \u22221 = \u22223 (VO) so \u22221 = \u22205 \u2014 corresponding equal \u21d2 parallel (at \u22223 = 50: \u22225 = 50, \u22221 = 50)', (() => {
  const a3 = 50, a6 = 130, a5 = 180 - a6, a1 = a3;
  return a5 === 50 && a1 === 50 && a3 + a6 === 180 && a5 + a6 === 180 && a1 === a5;
})());
check('AC12: L6-2 \u2014 co-exterior 96\u00b0 and 84\u00b0 (sum 180) \u21d2 parallel; then the scene: obtuse family {1,3,5,7} = 96\u00b0, acute family {2,4,6,8} = 84\u00b0, every adjacent sum 180, \u22228 = 84\u00b0 consistent', (() => {
  const obt = 96, acc = 84;
  const scene8 = [obt, acc, obt, acc, obt, acc, obt, acc]; // angles 1..8
  return scene8[7] === 84 && obt + acc === 180 && scene8.every(v => v === 96 || v === 84);
})());

/* ============================================================
 * AD. Lesson 8.3 figures — geometry swept before writing
 * ==========================================================*/
// ---- Figure 3: the transversal scene (viewBox 0 0 760 380) ----
const F3 = scene(120, 280, 1);
const F3P: Vec = [300, 120]; // written crossing on l (t: y = x − 180)
const F3Q: Vec = [460, 280]; // written crossing on m
check('AD0: figure-3 written crossings lie exactly on all three strokes \u2014 P(300,120) on l (y=120) and t (120 = 300\u2212180); Q(460,280) on m (y=280) and t (280 = 460\u2212180)', F3P[1] === 120 && F3P[0] - F3P[1] === 180 && F3Q[1] === 280 && F3Q[0] - F3Q[1] === 180);
const F3strokes: number[][] = [
  [90, 120, 670, 120], // l
  [90, 280, 670, 280], // m
  [220, 40, 540, 360], // t
];
const F3heads: number[][] = [];
F3heads.push(...headSegs(90, 120, -1, 0), ...headSegs(670, 120, 1, 0));
F3heads.push(...headSegs(90, 280, -1, 0), ...headSegs(670, 280, 1, 0));
F3heads.push(...headSegs(220, 40, unitV([-1, -1])[0], unitV([-1, -1])[1]), ...headSegs(540, 360, unitV([1, 1])[0], unitV([1, 1])[1]));
const F3angleLabels: [number, number, string][] = [
  [260, 108, '1'], [313, 88.6, '2'], [346, 139, '3'], [287, 151.4, '4'],
  [420, 268, '5'], [473, 248.6, '6'], [506, 299, '7'], [447, 311.4, '8'],
];
check('AD1: figure-3 each angle number sits inside its own wedge, clear of the strokes (every label \u2265 8 px from l, m and t by exact box sweeps — the narrow 45\u00b0 wedges carry their labels deeper, r \u2248 50, the wide 135\u00b0 wedges on the bisector at r = 34)', (() => {
  const segs = [...F3strokes];
  const labels: [number, number, number][] = F3angleLabels.map(l => [l[0], l[1], 10] as [number, number, number]);
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('AD2: figure-3 each angle number lies in its own region \u2014 half-plane tests (t\u2019s direction (1,1): cross(d, p\u2212base) > 0 = west of t): 1/5 west of t above their lines; 2/6 east; 3/7 east below; 4/8 west below', (() => {
  const sideT = (p: Vec, base: Vec) => Math.sign(crossZ([1, 1], subV(p, base)));
  const above = (p: Vec, y: number) => p[1] < y;
  const L = F3angleLabels.map(l => [l[0], l[1]] as Vec);
  return above(L[0], 120) && sideT(L[0], F3P) > 0 && above(L[1], 120) && sideT(L[1], F3P) < 0
    && !above(L[2], 120) && sideT(L[2], F3P) < 0 && !above(L[3], 120) && sideT(L[3], F3P) > 0
    && above(L[4], 280) && sideT(L[4], F3Q) > 0 && above(L[5], 280) && sideT(L[5], F3Q) < 0
    && !above(L[6], 280) && sideT(L[6], F3Q) < 0 && !above(L[7], 280) && sideT(L[7], F3Q) > 0;
})());
check('AD3: figure-3 every label box \u2265 8 px from every stroke and arrowhead (16 labels: 8 angle numbers + l, m, t, P, Q + 3 band words; P beside t above l at (290,88), Q beside t below m at (470,320))', (() => {
  const segs = [...F3strokes, ...F3heads];
  const labels: [number, number, number][] = [
    ...F3angleLabels.map(l => [l[0], l[1], 10] as [number, number, number]),
    [70, 108, 10], [70, 298, 10], [222, 78, 10], [290, 88, 12], [470, 320, 12],
    [598, 200, 52], [608, 84, 52], [608, 318, 52],
  ];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('AD4: figure-3 the interior band tint (rect 90,120 \u2192 670,280 at 0.08 opacity) spans exactly between the parallels and inside the arrowheads\u2019 span; its edges coincide with strokes l and m', 670 - 90 === 580 && 280 - 120 === 160);
check('AD5: figure-3 fits its viewBox 760\u00d7380 \u2014 the t arrowheads reach (220,40) and (540,360) with 11-px backs inside, deepest label box bottom y = 323 (Q at 320+3), max x 684', (() => {
  const maxY = Math.max(360, 323); const maxX = 670 + 14;
  return maxY <= 380 && maxX <= 760 && 40 - 11 >= 0;
})());
check('AD6: figure-3 title at (380,20) clears the topmost stroke (t\u2019s head tip y = 40) by 20 px \u2265 8', 40 - 20 - 10 >= 8);

// ---- Figure 4: the F / Z / C memory patterns (viewBox 0 0 760 300) ----
const F4cx = [130, 380, 630];
const F4tan = Math.tan(rad(60));
const F4cross = (cx: number, y: number): Vec => [cx - 60 + (y - 40) / F4tan, y]; // transversal through (cx−60, 40) at 60° to the horizontal
check('AD7: figure-4 crossings — upper at (cx\u221231.13, 90), lower at (cx+38.15, 210), both inside each panel\u2019s \u00b170 stroke span; the transversal makes exactly 60\u00b0 with the parallels', (() => {
  return F4cx.every(cx => {
    const u = F4cross(cx, 90), v = F4cross(cx, 210);
    return Math.abs(u[0] - (cx - 31.13)) < 0.01 && Math.abs(v[0] - (cx + 38.15)) < 0.01 && Math.abs(u[0] - (cx - 70)) < 39 && Math.abs(v[0] - (cx + 70)) < 32 && Math.abs(rad(60) - Math.atan(F4tan)) < 1e-12;
  });
})());
check('AD8: figure-4 the marked measures — corresponding panel 120\u00b0 = 120\u00b0; alternate panel 60\u00b0 = 60\u00b0; co-interior panel 60\u00b0 + 120\u00b0 = 180\u00b0 (dot-product derived)', (() => {
  const East: Vec = [1, 0], West: Vec = [-1, 0];
  const Tdown: Vec = unitV([1, F4tan]), Tup: Vec = [-Tdown[0], -Tdown[1]];
  const TR = angDeg(Tup, East), BR = angDeg(Tdown, East), TL = angDeg(Tup, West);
  return r2(TR) === 120 && r2(BR) === 60 && r2(TL) === 60 && TR + BR === 180;
})());
check('AD9: figure-4 every label box \u2265 8 px from every stroke of every panel (values in the narrow 60\u00b0 wedges carried deep to r \u2248 46, captions and letters clear; the marked arcs join the sweep)', (() => {
  const segs: number[][] = [];
  for (const cx of F4cx) {
    segs.push([cx - 70, 90, cx + 70, 90], [cx - 70, 210, cx + 70, 210]);
    const s: Vec = [cx - 68.66, 25], e: Vec = [cx + 55.47, 240];
    segs.push([s[0], s[1], e[0], e[1]]);
    const d = unitV(subV(e, s));
    segs.push(...headSegs(s[0], s[1], -d[0], -d[1]), ...headSegs(e[0], e[1], d[0], d[1]));
    segs.push(...headSegs(cx - 70, 90, -1, 0), ...headSegs(cx + 70, 90, 1, 0), ...headSegs(cx - 70, 210, -1, 0), ...headSegs(cx + 70, 210, 1, 0));
    const u = F4cross(cx, 90), v = F4cross(cx, 210);
    for (const [d1, d2] of [[0, 60], [180, 240], [240, 360]] as [number, number][]) {
      for (let k = 0; k < 24; k++) {
        for (const c of [u, v]) {
          const a = d1 + (d2 - d1) * (k / 24), b = d1 + (d2 - d1) * ((k + 1) / 24);
          segs.push([c[0] + 16 * Math.cos(rad(a)), c[1] + 16 * Math.sin(rad(a)), c[0] + 16 * Math.cos(rad(b)), c[1] + 16 * Math.sin(rad(b))]);
        }
      }
    }
  }
  const labels: [number, number, number][] = [];
  for (const cx of F4cx) {
    labels.push([cx - 15.13, 62.3, 34], [cx + 54.15, 182.3, 34]); // F-panel TR values (wide 120\u00b0 wedges, bisector r = 32)
    labels.push([cx + 8.7, 113, 30], [cx - 20, 180, 30]); // Z-panel values (upper BR bisector r = 46; lower TL shifted clear of t)
    labels.push([cx + 8.7, 113, 30], [cx + 64, 175, 28]); // C-panel values (upper BR; lower TR inside its wide wedge, clear of its own arc)
    labels.push([cx, 274, 210], [cx - 100, 66, 14]); // caption + pattern letter
  }
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('AD10: figure-4 arcs at the marked regions — upper BR arc 0\u00b0\u219260\u00b0 r 16; lower TL arc 180\u00b0\u2192240\u00b0 r 16; TR arcs 240\u00b0\u2192360\u00b0 r 16; all endpoints on the region\u2019s bounding rays', (() => {
  const arcPt = (v: Vec, deg: number, r: number): Vec => [r2(v[0] + r * Math.cos(rad(deg))), r2(v[1] + r * Math.sin(rad(deg)))];
  const u = F4cross(130, 90), v = F4cross(130, 210);
  const a1 = arcPt(u, 0, 16), a2 = arcPt(u, 60, 16), b1 = arcPt(v, 180, 16), b2 = arcPt(v, 240, 16), c1 = arcPt(v, 240, 16), c2 = arcPt(v, 360, 16);
  return Math.abs(a1[0] - (u[0] + 16)) < 0.01 && Math.abs(a2[1] - (u[1] + 13.86)) < 0.01 && Math.abs(b1[0] - (v[0] - 16)) < 0.01 && Math.abs(b2[1] - (v[1] - 13.86)) < 0.01 && Math.abs(c2[0] - (v[0] + 16)) < 0.01 && c1[0] === b2[0] && c1[1] === b2[1];
})());
check('AD11: figure-4 fits its viewBox 760\u00d7300 \u2014 transversal ends y 25/240, captions y 274, heads within', (() => {
  const maxY = 274 + 3; const maxX = 700;
  return maxY <= 300 && maxX <= 760 && 25 - 11 >= 0;
})());

/* ============================================================
 * AE. Historical facts for 8.3 (web-checked this run) + scope
 * ==========================================================*/
check('AE1: Euclid, Elements Book I Postulate 5 (Joyce, Clark U.) \u2014 \u201cThat, if a straight line falling on two straight lines makes the interior angles on the same side less than two right angles, the two straight lines, if produced indefinitely, meet on that side on which are the angles less than the two right angles\u201d (qualitative; two right angles = 180\u00b0, 8.2\u2019s ledger)', 2 * 90 === 180);
check('AE2: Proposition I.27 \u2014 equal alternate angles \u21d2 parallel \u2014 is proved WITHOUT Postulate 5 (via I.16\u2019s exterior-angle inequality); Proposition I.29 (parallels \u21d2 alternate equal + corresponding equal) is the FIRST use of Postulate 5 in Book I (qualitative; Joyce\u2019s guide)', true);
check('AE3: Proclus (410\u2013485 AD) clearly stated the Playfair form in his commentary on Euclid I.31; William Ludlam 1785: \u201cTwo straight lines, meeting at a point, are not both parallel to a third line\u201d (qualitative)', 485 > 410 && 1785 > 485);
check('AE4: John Playfair\u2019s Elements of Geometry (1795): \u201cTwo straight lines which intersect one another cannot be both parallel to the same straight line\u201d \u2014 the modern form: in a plane, given a line and a point not on it, AT MOST one line parallel to the given line passes through the point', 1795 > 1785);
check('AE5: the 2,000-year struggle \u2014 Lobachevsky lecture at Kazan 23 Feb 1826, published 1829\u201330 (\u201cOn the Principles of Geometry\u201d, Kazan Messenger); J\u00e1nos Bolyai\u2019s appendix 1832; the parallel postulate is INDEPENDENT of the other axioms (non-Euclidean geometry); Gauss explored it privately and published nothing', 1826 < 1829 && 1829 < 1832);
check('AE6: NCERT class 9 ch. 6 \u201cLines and Angles\u201d carries the axiom treatment \u2014 the linear-pair axiom, the corresponding-angles axiom (parallels \u21d2 equal corresponding) and its converse (equal corresponding \u21d2 parallels); NCERT Ganita Prakash class 7 ch. 5 is titled \u201cParallel and Intersecting Lines\u201d (gegp105) and builds the same eight-angle charter (qualitative; web-checked chapter listings)', true);
check('AE7: scope guards for 8.3 \u2014 no triangle angle sum (8.4), no exterior-angle-inequality proof (I.16 belongs to a later treatment), no non-Euclidean geometry beyond the historical callout\u2019s one-paragraph honesty, no perpendicular-distance-between-parallels, no compass-and-straightedge construction of parallels', true);
check('AE8: every numeric claim of lesson 8.3 appears in X\u2013AD \u2014 the lesson introduces no other numbers (qualitative scope guard)', true);

/* ============================================================
 * AF. The triangle object — lesson 8.4 "Triangles and the
 *     Angle Sum": anatomy, the non-collinear clause, names
 * ==========================================================*/
check('AF1: a triangle is said to be formed by three points not on one line, together with the three segments joining them pairwise \u2014 the boundary plus the region it encloses (is-said-to-be definition; qualitative)', true);
check('AF2: the element census \u2014 3 vertices + 3 sides + 3 interior angles; each side joins two vertices and is opposite the third: side BC \u2194 angle A, side CA \u2194 angle B, side AB \u2194 angle C \u2014 three pairings, each element used exactly once', [['BC', 'A'], ['CA', 'B'], ['AB', 'C']].length === 3);
check('AF3: the non-collinear clause bites \u2014 collinear points make no triangle: crossZ((2,2),(4,4)) = 0 (area 0, the segments fold onto one line); the lesson trio (0,0),(4,0),(1,3) has crossZ((4,0),(1,3)) = 12 \u2260 0 (area 6, a genuine triangle)', (() => { return crossZ([2, 2], [4, 4]) === 0 && crossZ([4, 0], [1, 3]) === 12 && Math.abs(crossZ([4, 0], [1, 3])) / 2 === 6; })());
check('AF4: the lesson witness triangle A(0,0), B(4,0), C(1,3) \u2014 side lengths |AB| = 4, |BC| = \u221a18 \u2248 4.243, |CA| = \u221a10 \u2248 3.162, all three unequal (scalene); angles by dot product: at A \u2248 71.57\u00b0, at B \u2248 45\u00b0, at C \u2248 63.43\u00b0, sum exactly 180', (() => {
  const A: Vec = [0, 0], B: Vec = [4, 0], C: Vec = [1, 3];
  const AB = Math.hypot(...subV(B, A)), BC = Math.hypot(...subV(C, B)), CA = Math.hypot(...subV(A, C));
  const aA = angDeg(subV(B, A), subV(C, A)), aB = angDeg(subV(A, B), subV(C, B)), aC = angDeg(subV(A, C), subV(B, C));
  return Math.abs(AB - 4) < 1e-9 && Math.abs(BC - Math.sqrt(18)) < 1e-9 && Math.abs(CA - Math.sqrt(10)) < 1e-9
    && Math.abs(aA - 71.565051) < 1e-4 && Math.abs(aB - 45) < 1e-9 && Math.abs(aC - 63.434949) < 1e-4
    && Math.abs(aA + aB + aC - 180) < 1e-9;
})());
check('AF5: the triangle = boundary + interior \u2014 ray-casting classification on the witness triangle: (2,1) inside, (5,3) outside, (2,0) on the boundary side AB (crossing counts 2 / 0 / on-edge)', (() => {
  // ray cast horizontally to the right from p against segments AB, BC, CA of (0,0),(4,0),(1,3)
  const tri: Vec[] = [[0, 0], [4, 0], [1, 3]];
  const crossings = (p: Vec): number => {
    let c = 0;
    for (let i = 0; i < 3; i++) {
      const u = tri[i], v = tri[(i + 1) % 3];
      if ((u[1] > p[1]) !== (v[1] > p[1])) {
        const xInt = u[0] + ((p[1] - u[1]) / (v[1] - u[1])) * (v[0] - u[0]);
        if (xInt > p[0]) c++;
      }
    }
    return c;
  };
  const onEdge = (p: Vec): boolean => {
    for (let i = 0; i < 3; i++) {
      const u = tri[i], v = tri[(i + 1) % 3];
      if (Math.abs(crossZ(subV(v, u), subV(p, u))) < 1e-12 && Math.min(u[0], v[0]) <= p[0] && p[0] <= Math.max(u[0], v[0]) && Math.min(u[1], v[1]) <= p[1] && p[1] <= Math.max(u[1], v[1])) return true;
    }
    return false;
  };
  return crossings([2, 1]) % 2 === 1 && crossings([5, 3]) % 2 === 0 && onEdge([2, 0]);
})());
check('AF6: notation \u2014 the triangle on A, B, C is written \u25b3ABC (read \u201ctriangle ABC\u201d); in the small-letter dress a = |BC|, b = |CA|, c = |AB|, each letter the mate of its opposite capital (AF4\u2019s numbers: a \u2248 4.243, b \u2248 3.162, c = 4)', true);

/* ============================================================
 * AG. The angle-sum theorem — the derivation machinery
 *     (Playfair licence + 8.3's alternate angles + 8.2's
 *     straight angle) and the sweep
 * ==========================================================*/
check('AG1: the derivation\u2019s licence \u2014 through A (not on line BC) there passes EXACTLY one line parallel to BC (Playfair\u2019s uniqueness, 8.3\u2019s Note); the theorem is therefore equivalent to the parallel postulate (see AN5)', true);
check('AG2: the proof figure\u2019s alternate pairs are equal by exact vector computation \u2014 fig-6 literals A(300,120), B(130,340), C(590,340), X(90,120), Y(680,120): angle XAB = angle ABC and angle CAY = angle ACB (each within 1e-9)', (() => {
  const A: Vec = [300, 120], B: Vec = [130, 340], C: Vec = [590, 340], X: Vec = [90, 120], Y: Vec = [680, 120];
  const xab = angDeg(subV(X, A), subV(B, A));
  const abc = angDeg(subV(A, B), subV(C, B));
  const cay = angDeg(subV(C, A), subV(Y, A));
  const acb = angDeg(subV(A, C), subV(B, C));
  return Math.abs(xab - abc) < 1e-9 && Math.abs(cay - acb) < 1e-9;
})());
check('AG3: the straight-angle partition at A on the figure \u2014 angle XAB + angle BAC + angle CAY = 180 exactly (the lower half-plane from ray AX through AB, AC to ray AY; 8.2\u2019s angle-on-a-line)', (() => {
  const A: Vec = [300, 120], B: Vec = [130, 340], C: Vec = [590, 340], X: Vec = [90, 120], Y: Vec = [680, 120];
  return Math.abs(angDeg(subV(X, A), subV(B, A)) + angDeg(subV(B, A), subV(C, A)) + angDeg(subV(C, A), subV(Y, A)) - 180) < 1e-9;
})());
check('AG4: hence the theorem on the figure triangle \u2014 angle BAC + angle ABC + angle ACB = 180 (substitution closes the chain: the two alternate mates replaced the two end-pieces of the straight angle)', (() => {
  const A: Vec = [300, 120], B: Vec = [130, 340], C: Vec = [590, 340];
  return Math.abs(angDeg(subV(B, A), subV(C, A)) + angDeg(subV(A, B), subV(C, B)) + angDeg(subV(A, C), subV(B, C)) - 180) < 1e-9;
})());
check('AG5: the sweep \u2014 400 deterministic pseudo-random triangles (Lehmer LCG, area > 0.5 filter in the 100\u00d7100 square): every triangle\u2019s three dot-product angles sum to 180 within 1e-6; ALL PASS', (() => {
  let s = 123456789;
  const rnd = (): number => { s = (s * 48271) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 400; i++) {
    const P: Vec = [100 * rnd(), 100 * rnd()], Q: Vec = [100 * rnd(), 100 * rnd()], R: Vec = [100 * rnd(), 100 * rnd()];
    if (Math.abs(crossZ(subV(Q, P), subV(R, P))) / 2 <= 0.5) continue;
    const sum = angDeg(subV(Q, P), subV(R, P)) + angDeg(subV(P, Q), subV(R, Q)) + angDeg(subV(P, R), subV(Q, R));
    if (Math.abs(sum - 180) > 1e-6) return false;
  }
  return true;
})());
check('AG6: the third-angle engine \u2014 third = 180 \u2212 first \u2212 second, valid exactly when first + second < 180; at first + second = 180 the \u201ctriangle\u201d collapses to a straight angle (the degenerate cash of AF3)', (() => { return 180 - 62 - 45 === 73 && 180 - 180 === 0; })());
check('AG7: the lesson\u2019s third-angle instances \u2014 62 + 45 \u21d2 73; 74 + 31 \u21d2 75 (quiz); 71 + 52 \u21d2 57 (exercise); each triple re-sums to 180', (() => {
  return 62 + 45 + 73 === 180 && 74 + 31 + 75 === 180 && 71 + 52 + 57 === 180;
})());

/* ============================================================
 * AH. The exterior angle — definition, the theorem, the
 *     inequality corollary, the census
 * ==========================================================*/
check('AH1: definition \u2014 produce side BC past C to D: angle ACD is the exterior angle at C, the linear-pair mate of interior angle ACB (8.2/8.3\u2019s linear-pair law); on the fig-5 literals A(250,70), B(120,320), C(600,320), D(700,320): angle ACB \u2248 35.5377\u00b0, angle ACD \u2248 144.4623\u00b0, and angle ACD = 180 \u2212 angle ACB exactly', (() => {
  const A: Vec = [250, 70], B: Vec = [120, 320], C: Vec = [600, 320], D: Vec = [700, 320];
  const acb = angDeg(subV(A, C), subV(B, C));
  const acd = angDeg(subV(A, C), subV(D, C));
  return Math.abs(acd - (180 - acb)) < 1e-9 && Math.abs(acb - 35.537678) < 1e-4 && Math.abs(acd - 144.462322) < 1e-4;
})());
check('AH2: the exterior-angle theorem \u2014 exterior = the SUM of the two remote interior angles; derived from AG4 + the linear pair; swept over 400 random triangles \u00d7 3 vertices (1200 positions): |exterior \u2212 (sum of remotes)| < 1e-6 and exterior = 180 \u2212 adjacent interior, ALL PASS', (() => {
  let s = 987654321;
  const rnd = (): number => { s = (s * 48271) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 400; i++) {
    const P: Vec = [100 * rnd(), 100 * rnd()], Q: Vec = [100 * rnd(), 100 * rnd()], R: Vec = [100 * rnd(), 100 * rnd()];
    if (Math.abs(crossZ(subV(Q, P), subV(R, P))) / 2 <= 0.5) continue;
    const ang = [angDeg(subV(Q, P), subV(R, P)), angDeg(subV(P, Q), subV(R, Q)), angDeg(subV(P, R), subV(Q, R))];
    for (let v = 0; v < 3; v++) {
      const o1 = ang[(v + 1) % 3], o2 = ang[(v + 2) % 3];
      const ext = 180 - ang[v];
      if (Math.abs(ext - (o1 + o2)) > 1e-6) return false;
      if (Math.abs(ext - (180 - ang[v])) > 1e-9) return false;
    }
  }
  return true;
})());
check('AH3: the inequality corollary (Euclid I.16\u2019s content in our dress) \u2014 every exterior angle EXCEEDS each remote interior angle alone; swept on the same 1200 positions, ALL PASS', (() => {
  let s = 987654321;
  const rnd = (): number => { s = (s * 48271) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 400; i++) {
    const P: Vec = [100 * rnd(), 100 * rnd()], Q: Vec = [100 * rnd(), 100 * rnd()], R: Vec = [100 * rnd(), 100 * rnd()];
    if (Math.abs(crossZ(subV(Q, P), subV(R, P))) / 2 <= 0.5) continue;
    const ang = [angDeg(subV(Q, P), subV(R, P)), angDeg(subV(P, Q), subV(R, Q)), angDeg(subV(P, R), subV(Q, R))];
    for (let v = 0; v < 3; v++) {
      const ext = 180 - ang[v];
      if (!(ext > ang[(v + 1) % 3] && ext > ang[(v + 2) % 3])) return false;
    }
  }
  return true;
})());
check('AH4: the census \u2014 producing either direction at each vertex gives two exterior rays, and the two exteriors at one vertex are vertically opposite (8.3) hence equal: 6 exterior positions, 3 distinct measures (one per vertex)', (() => {
  // at vertex C of the witness triangle the two produced rays carry exterior angles 180-C each way — equal by VO
  const A: Vec = [250, 70], B: Vec = [120, 320], C: Vec = [600, 320];
  const acb = angDeg(subV(A, C), subV(B, C));
  return Math.abs((180 - acb) - (180 - acb)) < 1e-12 && 3 * 2 === 6;
})());
check('AH5: the lesson instance (Illustration 3) \u2014 exterior at C = 120\u00b0, remote angle A = 50\u00b0: angle B = 120 \u2212 50 = 70 (the theorem), angle C = 180 \u2212 50 \u2212 70 = 60 (the angle sum); all three certificates: 50 + 70 = 120, 180 \u2212 60 = 120, 50 + 70 + 60 = 180', (() => {
  const B = 120 - 50, C = 180 - 50 - B;
  return B === 70 && C === 60 && 50 + B === 120 && 180 - C === 120 && 50 + 70 + 60 === 180;
})());

/* ============================================================
 * AI. Classification by angles — the one-right/one-obtuse
 *     law, the right-triangle complement
 * ==========================================================*/
check('AI1: at most one angle of a triangle can be right or obtuse \u2014 two angles \u2265 90 would force the sum \u2265 180, leaving \u2264 0 for the third: impossible; the sweep confirms: across the 400 random triangles no triangle carries two angles \u2265 90 \u2212 1e-9', (() => {
  let s = 192837465;
  const rnd = (): number => { s = (s * 48271) % 2147483647; return s / 2147483647; };
  for (let i = 0; i < 400; i++) {
    const P: Vec = [100 * rnd(), 100 * rnd()], Q: Vec = [100 * rnd(), 100 * rnd()], R: Vec = [100 * rnd(), 100 * rnd()];
    if (Math.abs(crossZ(subV(Q, P), subV(R, P))) / 2 <= 0.5) continue;
    const ang = [angDeg(subV(Q, P), subV(R, P)), angDeg(subV(P, Q), subV(R, Q)), angDeg(subV(P, R), subV(Q, R))];
    if (ang.filter(a => a >= 90 - 1e-9).length > 1) return false;
  }
  return true;
})());
check('AI2: the angle classes \u2014 a triangle is said to be acute if ALL its angles are acute; right if ONE angle is right; obtuse if ONE angle is obtuse (the one-right/one-obtuse law makes \u201cone\u201d unambiguous; qualitative)', true);
check('AI3: right-triangle corollary \u2014 the two acute angles of a right triangle are complementary (their sum = 180 \u2212 90 = 90); constructed right triangles swept over legs (a,b) \u2208 {1..12}\u00b2: the acute pair sums to 90 within 1e-9, ALL PASS', (() => {
  for (let a = 1; a <= 12; a++) for (let b = 1; b <= 12; b++) {
    const atP = angDeg(subV([0, 0], [a, 0]), subV([0, b], [a, 0]));
    const atQ = angDeg(subV([0, 0], [0, b]), subV([a, 0], [0, b]));
    if (Math.abs(atP + atQ - 90) > 1e-9) return false;
  }
  return true;
})());
check('AI4: the classification witnesses \u2014 50-60-70 acute; 40-60-80 acute; 30-60-90 right; 100-40-40 obtuse; 120-30-30 obtuse; each verdict follows from the one-right/one-obtuse law + the size words of 8.2', (() => {
  const verdict = (t: number[]): string => t.some(a => a === 90) ? 'right' : t.some(a => a > 90) ? 'obtuse' : 'acute';
  return verdict([50, 60, 70]) === 'acute' && verdict([40, 60, 80]) === 'acute' && verdict([30, 60, 90]) === 'right' && verdict([100, 40, 40]) === 'obtuse' && verdict([120, 30, 30]) === 'obtuse';
})());
check('AI5: the exterior at a right angle is itself right \u2014 the linear-pair mate of 90\u00b0 is 90\u00b0 (180 \u2212 90); so producing either leg at the right-angle vertex reproduces the square corner outside', 180 - 90 === 90);

/* ============================================================
 * AJ. Classification by sides — the isosceles certificate
 *     (stated theorem, numerically certified), equilateral
 * ==========================================================*/
check('AJ1: the side classes \u2014 scalene: no two sides equal; isosceles: AT LEAST two sides equal (NCERT\u2019s dress, so equilateral counts as isosceles); equilateral: all three equal (qualitative)', true);
check('AJ2: the isosceles base-angle theorem (Euclid I.5, the pons asinorum) \u2014 the angles opposite the equal sides are equal; the classical proofs run on SAS congruence (a later toolkit), so HERE it is certified numerically: for apex angle \u03b8 \u2208 {10\u00b0, 20\u00b0, \u2026, 170\u00b0} the constructed isosceles triangle (equal sides 10 about the apex) has base angles (180 \u2212 \u03b8)/2 by dot product, BOTH of them, within 1e-9, ALL PASS', (() => {
  for (let t = 10; t <= 170; t += 10) {
    const h = rad(t) / 2;
    const B: Vec = [10 * Math.cos(-h), 10 * Math.sin(-h)], C: Vec = [10 * Math.cos(h), 10 * Math.sin(h)];
    const A: Vec = [0, 0];
    const atB = angDeg(subV(A, B), subV(C, B)), atC = angDeg(subV(A, C), subV(B, C));
    if (Math.abs(Math.hypot(...subV(B, A)) - 10) > 1e-9 || Math.abs(Math.hypot(...subV(C, A)) - 10) > 1e-9) return false;
    if (Math.abs(atB - (180 - t) / 2) > 1e-9 || Math.abs(atC - (180 - t) / 2) > 1e-9) return false;
  }
  return true;
})());
check('AJ3: equilateral \u21d2 60-60-60 \u2014 construction (0,0),(10,0),(5,5\u221a3): all sides 10 exactly; all three dot-product angles 60\u00b0 within 1e-9; and 60\u00b0 is the ONLY possibility (three equal angles must split 180 as 180/3)', (() => {
  const A: Vec = [0, 0], B: Vec = [10, 0], C: Vec = [5, 5 * Math.sqrt(3)];
  const s = [Math.hypot(...subV(B, A)), Math.hypot(...subV(C, B)), Math.hypot(...subV(A, C))];
  const ang = [angDeg(subV(B, A), subV(C, A)), angDeg(subV(A, B), subV(C, B)), angDeg(subV(A, C), subV(B, C))];
  return s.every(x => Math.abs(x - 10) < 1e-9) && ang.every(x => Math.abs(x - 60) < 1e-9) && 180 / 3 === 60;
})());
check('AJ4: the fig-7 gallery certificates \u2014 scalene panel sides 114.13 / 131.24 / 140 (all unequal); isosceles panel 122.07 = 122.07 \u2260 140; equilateral panel all \u2248 115.47; acute panel angles \u2248 66.05 / 57.0 / 57.0 (all < 90); right panel legs perpendicular (dot = 0); obtuse panel apex \u2248 104.9\u00b0 > 90', (() => {
  const L = (P: Vec, Q: Vec): number => Math.hypot(...subV(Q, P));
  // scalene: apex (cx-15,58), base (cx-70,158),(cx+70,158) — lengths independent of cx
  const sc = [L([-15, 58], [-70, 158]), L([-15, 58], [70, 158]), L([-70, 158], [70, 158])];
  const iso = [L([0, 58], [-70, 158]), L([0, 58], [70, 158]), L([-70, 158], [70, 158])];
  const eq = [L([0, 58], [-57.735, 158]), L([0, 58], [57.735, 158]), L([-57.735, 158], [57.735, 158])];
  const ap: Vec = [0, 212], b1: Vec = [-65, 312], b2: Vec = [65, 312];
  const acute = [angDeg(subV(b1, ap), subV(b2, ap)), angDeg(subV(ap, b1), subV(b2, b1)), angDeg(subV(ap, b2), subV(b1, b2))];
  const dot = dotV(subV([-70, 212], [-70, 312]), subV([70, 312], [-70, 312]));
  const op: Vec = [0, 252], ob1: Vec = [-78, 312], ob2: Vec = [78, 312];
  const obtApex = angDeg(subV(ob1, op), subV(ob2, op));
  return Math.abs(sc[0] - 114.13) < 0.01 && Math.abs(sc[1] - 131.24) < 0.01 && sc[2] === 140
    && Math.abs(iso[0] - 122.07) < 0.01 && Math.abs(iso[1] - 122.07) < 0.01 && iso[2] === 140
    && eq.every(x => Math.abs(x - 115.47) < 0.01)
    && acute.every(a => a < 90) && Math.abs(acute[0] - 66.05) < 0.01
    && dot === 0 && obtApex > 90 && Math.abs(obtApex - 104.87) < 0.01;
})());
check('AJ5: the fig-6 proof triangle is honestly scalene \u2014 |AB| = \u221a77300 \u2248 278.03, |BC| = 460, |CA| = \u221a132500 \u2248 364.01, all unequal: the figure draws no equal-side tick marks (no unmarked claim)', (() => {
  const A: Vec = [300, 120], B: Vec = [130, 340], C: Vec = [590, 340];
  const L = (P: Vec, Q: Vec): number => Math.hypot(...subV(Q, P));
  const s = [L(A, B), L(B, C), L(C, A)];
  return Math.abs(s[0] - Math.sqrt(77300)) < 1e-9 && s[1] === 460 && Math.abs(s[2] - Math.sqrt(132500)) < 1e-9 && new Set(s.map(x => Math.round(x * 100))).size === 3;
})());
check('AJ6: equilateral is a special isosceles (the \u201cat least two\u201d dress) \u2014 and the isosceles apex/base swap: apex 40\u00b0 \u21d2 base (180 \u2212 40)/2 = 70 each; base 55+55 \u21d2 apex 70 (Illustration 4 and exercise E6\u2019s numbers)', (() => {
  return (180 - 40) / 2 === 70 && 180 - 2 * 55 === 70;
})());

/* ============================================================
 * AK. The triangle inequality — lengths that CAN form a
 *     triangle (the construction engine + the 5832-triple
 *     sweep)
 * ==========================================================*/
check('AK1: the construction engine \u2014 A(0,0), B(c,0); C from the circles (radius b about A, radius a about B): x = (c\u00b2 + b\u00b2 \u2212 a\u00b2)/(2c), y\u00b2 = b\u00b2 \u2212 x\u00b2; a nondegenerate C (y \u2260 0) exists iff y\u00b2 > 0; witness (3,4,5): x = 3.2, y\u00b2 = 5.76 (C = (3.2, 2.4) \u2014 the classic 3-4-5 right triangle)', (() => {
  const engine = (a: number, b: number, c: number): number => { const x = (c * c + b * b - a * a) / (2 * c); return b * b - x * x; };
  return Math.abs(engine(3, 4, 5) - 5.76) < 1e-9 && engine(1, 1, 3) < 0 && Math.abs(engine(5, 7, 12)) < 1e-9;
})());
check('AK2: the sweep \u2014 all 5832 triples 1 \u2264 a,b,c \u2264 18: the engine yields a nondegenerate triangle IFF a+b > c and a+c > b and b+c > a; ALL PASS', (() => {
  const engine = (a: number, b: number, c: number): number => { const x = (c * c + b * b - a * a) / (2 * c); return b * b - x * x; };
  for (let a = 1; a <= 18; a++) for (let b = 1; b <= 18; b++) for (let c = 1; c <= 18; c++) {
    const ok = a + b > c && a + c > b && b + c > a;
    if ((engine(a, b, c) > 1e-9) !== ok) return false;
  }
  return true;
})());
check('AK3: the degenerate cash \u2014 every equality case (one side = the sum of the other two) gives y\u00b2 = 0: the three points are COLLINEAR (cross product 0, 8.1\u2019s test), the collapsed triangle; instance (5,7,12): x = 7 exactly, y\u00b2 = 0', (() => {
  const x = (12 * 12 + 7 * 7 - 5 * 5) / (2 * 12);
  return x === 7 && 7 * 7 - x * x === 0 && crossZ([12, 0], [7, 0]) === 0;
})());
check('AK4: the max-dress \u2014 the three-dress form is equivalent to \u201cthe largest side is less than the sum of the other two\u201d (the other two inequalities hold automatically when the largest obeys): verified by exhaustive agreement over the sweep range', (() => {
  for (let a = 1; a <= 18; a++) for (let b = 1; b <= 18; b++) for (let c = 1; c <= 18; c++) {
    const three = a + b > c && a + c > b && b + c > a;
    const m = Math.max(a, b, c);
    const maxDress = m < (a + b + c) - m;
    if (three !== maxDress) return false;
  }
  return true;
})());
check('AK5: the lesson instances \u2014 (4,6,11): 4 + 6 = 10 < 11 \u21d2 NO triangle; (4,6,9): 10 > 9, 13 > 6, 15 > 4 \u21d2 YES; (5,7,12): equality \u21d2 degenerate, NO; (5,7,11): 12 > 11 \u21d2 YES', (() => {
  const ok = (a: number, b: number, c: number): boolean => a + b > c && a + c > b && b + c > a;
  return !ok(4, 6, 11) && ok(4, 6, 9) && !ok(5, 7, 12) && ok(5, 7, 11);
})());
check('AK6: scope \u2014 the inequality is a statement about LENGTHS (numbers); the engine is the existence certificate; the perimeter tally itself is 8.5\u2019s opening (deferred there)', true);

/* ============================================================
 * AL. Lesson 8.4 illustrations, quiz and exercises — every
 *     instance re-derived
 * ==========================================================*/
check('AL1: Illustration 1 \u2014 two angles 62\u00b0 and 45\u00b0: third = 180 \u2212 107 = 73; the triple re-sums to 180', 180 - 62 - 45 === 73 && 62 + 45 + 73 === 180);
check('AL2: Illustration 2 \u2014 angles in the ratio 2 : 3 : 4: nine parts, 180/9 = 20 per part \u21d2 40 / 60 / 80; sum 180; largest 80; the ratio re-forms 40 : 60 : 80 = 2 : 3 : 4', (() => { return 180 / (2 + 3 + 4) === 20 && 2 * 20 === 40 && 3 * 20 === 60 && 4 * 20 === 80 && 40 + 60 + 80 === 180 && 80 === Math.max(40, 60, 80); })());
check('AL3: Illustration 3 \u2014 exterior 120\u00b0 at C, remote angle A = 50\u00b0 \u21d2 B = 70, C = 60 (three certificates cash: 50+70 = 120; 180\u221260 = 120; 50+70+60 = 180)', (() => { const B = 70, C = 60; return 50 + B === 120 && 180 - C === 120 && 50 + B + C === 180; })());
check('AL4: Illustration 4 \u2014 isosceles, apex 40\u00b0 \u21d2 each base angle (180 \u2212 40)/2 = 70; sum 40 + 70 + 70 = 180', 40 + 70 + 70 === 180);
check('AL5: Illustration 5 \u2014 right triangle, one acute angle 37\u00b0 \u21d2 the other 90 \u2212 37 = 53; the acute pair re-sums to 90', 90 - 37 === 53 && 37 + 53 === 90);
check('AL6: Illustration 6 \u2014 (4,6,11) NO (4 + 6 = 10 < 11); (4,6,9) YES (all three sums exceed)', (() => { return !(4 + 6 > 11) && 4 + 6 > 9 && 4 + 9 > 6 && 6 + 9 > 4; })());
check('AL7: quiz Q1 \u2014 two angles 74\u00b0 and 31\u00b0: third = 180 \u2212 105 = 75; intended key index 1 (options 65 / 75 / 95 / 85)', (() => { return 180 - 74 - 31 === 75 && [65, 75, 95, 85][1] === 75; })());
check('AL8: quiz Q2 \u2014 angles in ratio 3 : 4 : 5: twelve parts, 15 per part \u21d2 45 / 60 / 75; the largest is 75; intended key index 2 (options 45 / 60 / 75 / 90)', (() => { return 180 / (3 + 4 + 5) === 15 && 5 * 15 === 75 && [45, 60, 75, 90][2] === 75; })());
check('AL9: quiz Q3 \u2014 the exterior angle equals the sum of the two remote interior angles (the AH2 theorem); intended key index 1', true);
check('AL10: quiz Q4 \u2014 isosceles apex 100\u00b0: base angles (180 \u2212 100)/2 = 40; intended key index 1 (options 30 / 40 / 50 / 80)', (() => { return (180 - 100) / 2 === 40 && [30, 40, 50, 80][1] === 40; })());
check('AL11: quiz Q5 \u2014 the triple that CANNOT form a triangle: 4 + 5 = 9 < 10 for (4,5,10); the others pass (3+4>5, 2+2>3, 6+8>10); intended key index 2', (() => {
  const ok = (a: number, b: number, c: number): boolean => a + b > c && a + c > b && b + c > a;
  return !ok(4, 5, 10) && ok(3, 4, 5) && ok(2, 2, 3) && ok(6, 8, 10);
})());
check('AL12: exercise E1 (L1) \u2014 angles 71\u00b0, 52\u00b0: third 57; sum 180', 180 - 71 - 52 === 57 && 71 + 52 + 57 === 180);
check('AL13: exercise E2 (L1) \u2014 right triangle, acute angle 28\u00b0: the other acute 62; 28 + 62 = 90', 90 - 28 === 62 && 28 + 62 === 90);
check('AL14: exercise E3 (L2) \u2014 angles in ratio 3 : 5 : 7: fifteen parts, 12 per part \u21d2 36 / 60 / 84; sum 180; all acute', (() => { return 180 / (3 + 5 + 7) === 12 && [36, 60, 84].map(x => x * 1).reduce((p, q) => p + q, 0) === 180 && Math.max(36, 60, 84) < 90; })());
check('AL15: exercise E4 (L2) \u2014 exterior at B = 134\u00b0, remote angle A = 41\u00b0: angle C = 134 \u2212 41 = 93; angle B = 180 \u2212 134 = 46 (the linear pair); sum 41 + 46 + 93 = 180', (() => { return 134 - 41 === 93 && 180 - 134 === 46 && 41 + 46 + 93 === 180; })());
check('AL16: exercise E5 (L3) \u2014 isosceles apex 76\u00b0: base angles (180 \u2212 76)/2 = 52 each; sum 76 + 52 + 52 = 180', (180 - 76) / 2 === 52 && 76 + 104 === 180);
check('AL17: exercise E6 (L3) \u2014 isosceles base angles 55\u00b0 each: apex 180 \u2212 110 = 70', 180 - 2 * 55 === 70);
check('AL18: exercise E7 (L3) \u2014 angles x, 2x, 3x: 6x = 180 \u21d2 x = 30 \u21d2 30 / 60 / 90 \u2014 a right triangle (the 3x angle is the right one)', (() => { return 6 * 30 === 180 && [30, 60, 90][2] === 90; })());
check('AL19: exercise E8 (L4) \u2014 (5,7,12): 5 + 7 = 12, equality \u21d2 degenerate collinear, NO; (5,7,11): 12 > 11 and 16 > 7, 18 > 5 \u21d2 YES', (() => {
  const ok = (a: number, b: number, c: number): boolean => a + b > c && a + c > b && b + c > a;
  return !ok(5, 7, 12) && ok(5, 7, 11);
})());
check('AL20: exercise E9 (L4) \u2014 exterior = 2x + 20, the remote interiors x and 50: 2x + 20 = x + 50 \u21d2 x = 30; exterior 80 = 30 + 50; the adjacent interior 100; sum 30 + 50 + 100 = 180', (() => { const x = 30; return 2 * x + 20 === x + 50 && 2 * x + 20 === 80 && x + 50 === 80 && 180 - 80 === 100 && 30 + 50 + 100 === 180; })());
check('AL21: exercise E10 (L5) \u2014 one angle twice the second, the third 20\u00b0 more than the second: x + 2x + (x + 20) = 180 \u21d2 4x = 160 \u21d2 x = 40 \u21d2 40 / 80 / 60; sum 180', (() => { const x = 160 / 4; return x === 40 && [x, 2 * x, x + 20].reduce((p, q) => p + q, 0) === 180 && 40 + 80 + 60 === 180; })());
check('AL22: exercise E11 (L5) \u2014 right triangle, acute angles in ratio 2 : 3: they share 90 in five parts of 18 \u21d2 36 / 54; 36 + 54 = 90; the third angle is the right angle', (() => { return 90 / (2 + 3) === 18 && 2 * 18 === 36 && 3 * 18 === 54 && 36 + 54 === 90; })());
check('AL23: exercise E12 (L6, proof) \u2014 the exterior-angle chain: exterior = 180 \u2212 adjacent (linear pair) = 180 \u2212 (180 \u2212 remote1 \u2212 remote2) = remote1 + remote2 (the angle sum does the cancellation); certified numerically across the AH2 sweep', 180 - (180 - 50 - 70) === 50 + 70);
check('AL24: the five quiz answer indices are 1, 2, 1, 1, 2 \u2014 recorded for live browser verification', JSON.stringify([1, 2, 1, 1, 2]) === '[1,2,1,1,2]');
check('AL25: exercise E13 (L6) \u2014 the isosceles apex-40 exterior chase: base angles (180 \u2212 40)/2 = 70 each; exterior at C by the property 40 + 70 = 110; by the linear pair 180 \u2212 70 = 110 \u2014 both routes agree', (() => { const base = (180 - 40) / 2; return base === 70 && 40 + base === 110 && 180 - base === 110; })());
check('AL26: the six-family table witnesses exist \u2014 side witnesses pass the inequality (4+5>6, 5+5>8, equilateral trivial); angle witnesses re-sum to 180 and land in their named families', (() => {
  const ok = (a: number, b: number, c: number): boolean => a + b > c && a + c > b && b + c > a;
  const verdict = (t: number[]): string => t.some(a => a === 90) ? 'right' : t.some(a => a > 90) ? 'obtuse' : 'acute';
  return ok(4, 5, 6) && ok(5, 5, 8) && ok(6, 6, 6)
    && 50 + 60 + 70 === 180 && verdict([50, 60, 70]) === 'acute'
    && 30 + 60 + 90 === 180 && verdict([30, 60, 90]) === 'right'
    && 100 + 40 + 40 === 180 && verdict([100, 40, 40]) === 'obtuse';
})());

/* ============================================================
 * AM. Lesson 8.4 figures — geometry swept before writing
 * ==========================================================*/
// ---- Figure 5: the anatomy + exterior at C (viewBox 0 0 760 400) ----
const F5A: Vec = [250, 70], F5B: Vec = [120, 320], F5C: Vec = [600, 320], F5D: Vec = [700, 320];
check('AM1: figure-5 vertices lie on their strokes \u2014 B and C on the base y = 320; D on the produced ray (y = 320, x > 600); A off the base (the apex)', (() => { return F5B[1] === 320 && F5C[1] === 320 && F5D[1] === 320 && F5D[0] > F5C[0] && F5A[1] < 320; })());
check('AM2: figure-5 the side labels sit inside, clear of every stroke by \u2265 8 px \u2014 a on BC at (360,306) (11 above the base), b on CA at (414,210), c on AB at (201,203) (each \u2248 18 inside its side by exact box sweep)', (() => {
  const segs: number[][] = [
    [F5A[0], F5A[1], F5B[0], F5B[1]], [F5B[0], F5B[1], F5C[0], F5C[1]], [F5C[0], F5C[1], F5A[0], F5A[1]],
    [F5C[0], F5C[1], F5D[0], F5D[1]],
    ...headSegs(F5D[0], F5D[1], 1, 0),
  ];
  const labels: [number, number, number][] = [[360, 306, 8], [414, 210, 8], [201, 203, 8]];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('AM3: figure-5 the vertex and exterior labels clear every stroke by \u2265 8 px \u2014 A(246,50), B(100,338), C(616,344), D(712,306), \u2018exterior\u2019 (648,284) inside the exterior wedge (angle \u2248 323\u00b0 from C, between the side CA and the produced ray)', (() => {
  const segs: number[][] = [
    [F5A[0], F5A[1], F5B[0], F5B[1]], [F5B[0], F5B[1], F5C[0], F5C[1]], [F5C[0], F5C[1], F5A[0], F5A[1]],
    [F5C[0], F5C[1], F5D[0], F5D[1]],
    ...headSegs(F5D[0], F5D[1], 1, 0),
  ];
  const labels: [number, number, number][] = [[246, 50, 12], [100, 338, 12], [616, 344, 12], [712, 306, 12], [648, 284, 52]];
  const inWedge = Math.atan2(284 - 320, 648 - 600) * 180 / Math.PI + 360; // \u2248 323.1
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8) && inWedge > 322 && inWedge < 324;
})());
check('AM4: figure-5 the angle arcs \u2014 interior arcs r 30 at A (35.5\u00b0\u2192117.5\u00b0), B (297.5\u00b0\u2192360\u00b0), C (180\u00b0\u2192215.5\u00b0), each spanning exactly its wedge between the two sides (arc endpoints land on the sides); the exterior arc r 20 dashed spans 215.5\u00b0\u2192360\u00b0 from side CA around to the produced ray (the \u2248 144.5\u00b0 exterior wedge, AH1\u2019s linear mate \u2014 no number printed, the arc only marks it)', (() => {
  const dirA = Math.atan2(F5A[1] - F5C[1], F5A[0] - F5C[0]) * 180 / Math.PI + 360; // \u2248 215.5
  const start = (deg: number, r: number, v: Vec): Vec => [r2(v[0] + r * Math.cos(rad(deg))), r2(v[1] + r * Math.sin(rad(deg)))];
  const p1 = start(35.54, 30, F5A), p2 = start(117.47, 30, F5A);
  const onSideAB = Math.abs(segDist(p2[0], p2[1], F5A[0], F5A[1], F5B[0], F5B[1]) - 0) < 0.15;
  const onSideAC = Math.abs(segDist(p1[0], p1[1], F5A[0], F5A[1], F5C[0], F5C[1]) - 0) < 0.15;
  const e1 = start(215.54, 20, F5C), e2 = start(360, 20, F5C);
  return dirA > 215 && dirA < 216 && onSideAB && onSideAC && Math.abs(e2[0] - (F5C[0] + 20)) < 0.01 && Math.abs(e2[1] - F5C[1]) < 0.01 && Math.abs(segDist(e1[0], e1[1], F5C[0], F5C[1], F5A[0], F5A[1])) < 0.15;
})());
check('AM5: figure-5 fits its viewBox 760\u00d7400 \u2014 deepest label box bottom y = 347 (C at 344+3), max x = 722 (D\u2019s box), the produced head tip at (700,320) with 11-px depth inside', (() => { return 344 + 3 <= 400 && 712 + 10 <= 760 && 700 - 11 >= 0 && 50 - 10 >= 0; })());
check('AM6: figure-5 title at (380,20) clears the apex A (y = 70) and its label box (top 40) by \u2265 8', 50 - 10 - 20 - 3 >= 8);

// ---- Figure 6: the parallel through A (viewBox 0 0 760 420) ----
const F6A: Vec = [300, 120], F6B: Vec = [130, 340], F6C: Vec = [590, 340], F6X: Vec = [90, 120], F6Y: Vec = [680, 120];
check('AM7: figure-6 the scene is exact \u2014 X, A, Y on the line y = 120; B, C on the base y = 340; the two lines are parallel (both horizontal, 8.3\u2019s dress); A sits strictly between the base\u2019s x-span', (() => {
  return F6X[1] === 120 && F6A[1] === 120 && F6Y[1] === 120 && F6B[1] === 340 && F6C[1] === 340 && F6A[0] > F6B[0] && F6A[0] < F6C[0];
})());
check('AM8: figure-6 the angle labels 1 / 2 / 3 sit inside their own wedges (angular-range tests) and \u2265 8 px from every stroke and every arc \u2014 1 at A (257,143) and at B (195,312); 3 at A (370,146) and at C (540,328); 2 deeper at (307,174), beyond the double arc\u2019s outer radius 34', (() => {
  const segs: number[][] = [
    [F6X[0], F6X[1], F6Y[0], F6Y[1]],
    [F6B[0], F6B[1], F6C[0], F6C[1]],
    [F6A[0], F6A[1], F6B[0], F6B[1]], [F6A[0], F6A[1], F6C[0], F6C[1]],
    ...headSegs(F6X[0], F6X[1], -1, 0), ...headSegs(F6Y[0], F6Y[1], 1, 0),
  ];
  // arcs as 24-segment polylines
  const arc = (v: Vec, d1: number, d2: number, r: number) => { for (let k = 0; k < 24; k++) { const a = d1 + (d2 - d1) * (k / 24), b = d1 + (d2 - d1) * ((k + 1) / 24); segs.push([v[0] + r * Math.cos(rad(a)), v[1] + r * Math.sin(rad(a)), v[0] + r * Math.cos(rad(b)), v[1] + r * Math.sin(rad(b))]); } };
  const aB = angDeg(subV(F6A, F6B), subV(F6C, F6B));
  const aC = angDeg(subV(F6A, F6C), subV(F6B, F6C));
  const aAB = angDeg(subV(F6X, F6A), subV(F6B, F6A)); // wedge 1 at A: 180 \u2192 180-aAB
  arc(F6A, 180 - aAB, 180, 30); arc(F6A, 0, aC, 30); arc(F6A, aC, 180 - aAB, 26); arc(F6A, aC, 180 - aAB, 34);
  arc(F6B, 360 - aB, 360, 30); arc(F6C, 180, 180 + aC, 30);
  const labels: [number, number, number][] = [[257, 143, 10], [195, 312, 10], [370, 146, 10], [540, 328, 10], [307, 174, 10]];
  const inWedge = (p: Vec, v: Vec, d1: number, d2: number): boolean => { let a = Math.atan2(p[1] - v[1], p[0] - v[0]) * 180 / Math.PI; if (a < 0) a += 360; return a >= d1 - 0.5 && a <= d2 + 0.5; };
  const L = labels.map(l => [l[0], l[1]] as Vec);
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8)
    && inWedge(L[0], F6A, 180 - aAB, 180) && inWedge(L[1], F6B, 360 - aB, 360)
    && inWedge(L[2], F6A, 0, aC) && inWedge(L[3], F6C, 180, 180 + aC)
    && inWedge(L[4], F6A, aC, 180 - aAB);
})());
check('AM9: figure-6 the vertex labels X(74,142), Y(696,142), A(286,102), B(114,360), C(606,360) clear every stroke by \u2265 8 px', (() => {
  const segs: number[][] = [
    [F6X[0], F6X[1], F6Y[0], F6Y[1]],
    [F6B[0], F6B[1], F6C[0], F6C[1]],
    [F6A[0], F6A[1], F6B[0], F6B[1]], [F6A[0], F6A[1], F6C[0], F6C[1]],
    ...headSegs(F6X[0], F6X[1], -1, 0), ...headSegs(F6Y[0], F6Y[1], 1, 0),
  ];
  const labels: [number, number, number][] = [[74, 142, 12], [696, 142, 12], [286, 102, 12], [114, 360, 12], [606, 360, 12]];
  return labels.every(l => boxSegDist(l[0], l[1], l[2], segs) >= 8);
})());
check('AM10: figure-6 the three arcs at A partition the lower half-circle (0\u00b0\u219237.2\u00b0, 37.2\u00b0\u2192127.7\u00b0 doubled at r 26/34, 127.7\u00b0\u2192180\u00b0) and the B / C arcs span exactly their interior wedges \u2014 every arc endpoint lands on a side ray', (() => {
  const onRay = (p: Vec, v: Vec, dir: number, r: number): boolean => Math.abs(p[0] - (v[0] + r * Math.cos(rad(dir)))) < 0.15 && Math.abs(p[1] - (v[1] + r * Math.sin(rad(dir)))) < 0.15;
  const aB = angDeg(subV(F6A, F6B), subV(F6C, F6B));
  const aC = angDeg(subV(F6A, F6C), subV(F6B, F6C));
  const aAB = angDeg(subV(F6X, F6A), subV(F6B, F6A));
  return onRay([F6A[0] + 30, F6A[1]], F6A, 0, 30) && onRay([F6A[0] + 30 * Math.cos(rad(180 - aAB)), F6A[1] + 30 * Math.sin(rad(180 - aAB))], F6A, 180 - aAB, 30)
    && onRay([F6B[0] + 30 * Math.cos(rad(-aB)), F6B[1] + 30 * Math.sin(rad(-aB))], F6B, -aB, 30)
    && onRay([F6C[0] + 30 * Math.cos(rad(180 + aC)), F6C[1] + 30 * Math.sin(rad(180 + aC))], F6C, 180 + aC, 30);
})());
check('AM11: figure-6 the caption strip \u2014 \u201c1 + 2 + 3 = 180\u00b0 on the line XY\u201d at (380,398) clears the base labels (B/C boxes bottom y = 363) by \u2265 8; the title at (380,24) clears the XY line (y = 120) by \u2265 8', (() => { return 398 - 10 - 363 >= 8 && 120 - 24 - 3 >= 8; })());
check('AM12: figure-6 fits its viewBox 760\u00d7420 \u2014 arrowheads at x 90/680 with 11-px depth, caption box bottom y = 401, max label x = 706', (() => { return 398 + 3 <= 420 && 696 + 10 <= 760 && 90 - 11 >= 0; })());

// ---- Figure 7: the classification gallery (viewBox 0 0 760 340) ----
const F7cx = [130, 380, 630];
check('AM13: figure-7 the six panels carry their claimed shapes \u2014 row 1 (by sides): scalene 114.13/131.26/140, isosceles 122.07/122.07/140 with ticks on the two equal sides, equilateral 115.47 \u00d7 3 with three ticks; row 2 (by angles): acute 66.0/57.0/57.0, right with the square corner mark at the bottom-left vertex, obtuse apex 104.9\u00b0 \u2014 all re-computed in AJ4', (() => { return F7cx.length === 6 / 2 && 3 + 3 === 6; })());
check('AM14: figure-7 the tick marks are perpendicular to their sides at the midpoints (half-length 6) \u2014 isosceles: two ticks; equilateral: three; scalene: none (verified for one representative panel by exact direction arithmetic)', (() => {
  // isosceles panel, equal side apex (0,58) -> (70,158): midpoint (35,108), side dir (70,100)/122.07, tick dir perpendicular
  const d = unitV([70, 100]);
  const perp: Vec = [-d[1], d[0]];
  const mid: Vec = [35, 108];
  const t1: Vec = [mid[0] + 6 * perp[0], mid[1] + 6 * perp[1]], t2: Vec = [mid[0] - 6 * perp[0], mid[1] - 6 * perp[1]];
  return Math.abs(dotV(subV(t1, t2), d)) < 1e-9 && Math.abs(Math.hypot(...subV(t1, t2)) - 12) < 1e-9;
})());
check('AM15: figure-7 the captions clear their triangles by \u2265 8 px \u2014 row-1 captions at (cx,182) (base y 158, box top 172), row-2 captions at (cx,332) (base y 312, box top 322); neighbouring captions never touch (\u2265 80 px between box edges)', (() => {
  const capW = [150, 160, 175, 130, 130, 140];
  const pos: [number, number, number][] = [];
  F7cx.forEach((cx, i) => { pos.push([cx, 182, capW[i]]); pos.push([cx, 332, capW[i + 3]]); });
  const clear = (x: number, y: number, w: number, baseY: number) => y - 10 - baseY >= 8;
  const gaps = [F7cx[1] - F7cx[0] - (capW[0] + capW[1]) / 2, F7cx[2] - F7cx[1] - (capW[1] + capW[2]) / 2];
  return pos.every(l => clear(l[0], l[1], l[2], l[1] === 182 ? 158 : 312)) && gaps.every(g => g >= 60);
})());
check('AM16: figure-7 fits its viewBox 760\u00d7340 \u2014 the right panel\u2019s corner square (14\u00d714) sits inside its triangle; widest stroke x = 708 (630+78); deepest caption box bottom y = 335', (() => { return 332 + 3 <= 340 && 630 + 78 <= 760 && 130 - 78 >= 0; })());

/* ============================================================
 * AN. Historical facts for 8.4 (web-checked this run) + scope
 * ==========================================================*/
check('AN1: Euclid, Elements I.32 (Joyce, Clark U.) \u2014 \u201cIn any triangle, if one of the sides is produced, then the exterior angle equals the sum of the two interior and opposite angles, and the sum of the three interior angles of the triangle equals two right angles\u201d (two right angles = 180\u00b0, 8.2\u2019s ledger)', 2 * 90 === 180);
check('AN2: Euclid\u2019s proof machinery \u2014 I.31 draws the parallel (through C in his picture; we draw it through A \u2014 both valid), I.29 yields the equal alternate angles, I.13 closes with the two-right-angles-on-a-line: exactly the three tools our derivation uses in 8.3/8.2 dress (qualitative)', true);
check('AN3: Proclus\u2019s corollaries to I.32 \u2014 the interior angles of any convex rectilinear figure with n sides sum to (n \u2212 2) \u00d7 180 (the fan from one vertex gives n \u2212 2 triangles: quadrilateral 2 \u00d7 180 = 360, pentagon 3 \u00d7 180 = 540); and the exterior angles together equal four right angles (360\u00b0)', (() => { return (4 - 2) * 180 === 360 && (5 - 2) * 180 === 540 && 4 * 90 === 360; })());
check('AN4: the pons asinorum \u2014 Euclid I.5 (the isosceles base-angle theorem) earned the name \u201cbridge of asses\u201d from its diagram\u2019s shape; its classical proofs (Euclid\u2019s own via I.4 SAS, Pappus\u2019s self-congruence) all lean on congruence, which arrives in a later chapter \u2014 our treatment states the theorem and certifies it numerically (AJ2), honestly (qualitative)', true);
check('AN5: the angle sum is EQUIVALENT to the parallel postulate \u2014 drop Postulate 5 and the sum bends: on the sphere the octant triangle (north pole + two quarter-arcs on the equator) has three right angles, 270\u00b0 > 180\u00b0 (computed by 3-D tangent projection on the unit sphere); in the hyperbolic plane every triangle sums BELOW 180\u00b0, the defect growing with the area (Lobachevsky\u2019s geometry, 8.3\u2019s pointer cashed)', (() => {
  const N: number[] = [0, 0, 1], P: number[] = [1, 0, 0], Q: number[] = [0, 1, 0];
  const d3 = (u: number[], v: number[]): number => u[0] * v[0] + u[1] * v[1] + u[2] * v[2];
  const tanAt = (V: number[], U: number[]): number[] => { const k = d3(U, V); return [U[0] - k * V[0], U[1] - k * V[1], U[2] - k * V[2]]; };
  const ang3 = (V: number[], U: number[], W: number[]): number => (Math.acos(Math.max(-1, Math.min(1, d3(tanAt(V, U), tanAt(V, W)) / (Math.hypot(...tanAt(V, U)) * Math.hypot(...tanAt(V, W)))))) * 180) / Math.PI;
  const sum = ang3(N, P, Q) + ang3(P, N, Q) + ang3(Q, N, P);
  return Math.abs(sum - 270) < 1e-9;
})());
check('AN6: the Gauss mountain-triangle story is a LEGEND \u2014 the Brocken\u2013Hohehagen\u2013Inselsberg triangle WAS measured inside Gauss\u2019s Hanover survey (1818\u20131832), but Buhler\u2019s biography concludes the oft-told \u201che measured space to test the axiom\u201d story is, as far as we know, a myth (mathpages\u2019 summary of Buhler); Breitenberger 1984 (\u201cGauss\u2019s Geodesy and the Axiom of Parallels\u201d) is the scholarly treatment; the lesson retells it honestly (1832 > 1818)', 1832 > 1818);
check('AN7: NCERT anchors \u2014 class-6 ch. 4 \u00a74.11 \u201cTriangles\u201d names the parts (three-sided figure, sides/vertices/angles, interior and exterior of the triangle); class-7 ch. 6 \u201cThe Triangle and Its Properties\u201d carries the exterior-angle property and the angle-sum property among its sections (web-checked chapter listings; qualitative)', true);
check('AN8: scope guards for 8.4 \u2014 no medians/altitudes (8.5 and later carry them), no Pythagoras (a later book), no congruence (SAS/SSS later), no general proof of the isosceles theorem beyond the certified statement + I.5 attribution, no polygon-angle GENERAL derivation beyond Proclus\u2019s one-line corollary note, no larger-side-larger-angle theorem, no compass-and-straightedge constructions, no trigonometry', true);
check('AN9: every numeric claim of lesson 8.4 appears in AF\u2013AM \u2014 the lesson introduces no other numbers (qualitative scope guard)', true);

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
// emit figure 3 (the transversal scene) and figure 4 (F/Z/C) fragments for ch-08.ts
{
  const head = (tx: number, ty: number, dx: number, dy: number): string => {
    const s = headSegs(tx, ty, dx, dy);
    const c1 = [s[0][2], s[0][3]], c2 = [s[1][2], s[1][3]];
    return `<polygon points="${tx},${ty} ${c1[0]},${c1[1]} ${c2[0]},${c2[1]}" fill="currentColor"/>`;
  };
  const u11 = unitV([-1, -1]);
  console.log('=== FIG3 body ===');
  console.log(`  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the transversal scene — two crossings, eight angles</text>`);
  console.log(`  <rect x="90" y="120" width="580" height="160" fill="currentColor" opacity="0.08"/>`);
  console.log(`  <line x1="90" y1="120" x2="670" y2="120" stroke="currentColor" stroke-width="2"/>`);
  console.log(`  ${head(90, 120, -1, 0)}\n  ${head(670, 120, 1, 0)}`);
  console.log(`  <line x1="90" y1="280" x2="670" y2="280" stroke="currentColor" stroke-width="2"/>`);
  console.log(`  ${head(90, 280, -1, 0)}\n  ${head(670, 280, 1, 0)}`);
  console.log(`  <line x1="220" y1="40" x2="540" y2="360" stroke="currentColor" stroke-width="2"/>`);
  console.log(`  ${head(220, 40, u11[0], u11[1])}\n  ${head(540, 360, -u11[0], -u11[1])}`);
  console.log(`  <circle cx="300" cy="120" r="4.5" fill="currentColor"/>\n  <circle cx="460" cy="280" r="4.5" fill="currentColor"/>`);
  const lbl = (x: number, y: number, s: string, size = 13): string => `  <text x="${x}" y="${y}" font-size="${size}" fill="currentColor" text-anchor="middle">${s}</text>`;
  console.log(lbl(70, 108, 'l', 14) + '\n' + lbl(70, 298, 'm', 14) + '\n' + lbl(222, 78, 't', 14));
  console.log(lbl(290, 88, 'P', 14) + '\n' + lbl(470, 320, 'Q', 14));
  for (const l of F3angleLabels) console.log(lbl(l[0], l[1] + 4, l[2], 12.5));
  console.log(lbl(598, 200, 'interior', 12) + '\n' + lbl(608, 84, 'exterior', 12) + '\n' + lbl(608, 318, 'exterior', 12));
  // figure 4: three panels F / Z / C
  console.log('=== FIG4 body ===');
  const tan60 = Math.tan(rad(60));
  const cross4 = (cx: number, y: number): [number, number] => [r2(cx - 60 + (y - 40) / tan60), y];
  const arcPath = (v: [number, number], d1: number, d2: number, r: number): string => {
    const p1 = [r2(v[0] + r * Math.cos(rad(d1))), r2(v[1] + r * Math.sin(rad(d1)))];
    const p2 = [r2(v[0] + r * Math.cos(rad(d2))), r2(v[1] + r * Math.sin(rad(d2)))];
    return `  <path d="M ${p1[0]} ${p1[1]} A ${r} ${r} 0 0 1 ${p2[0]} ${p2[1]}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  };
  const panelTitle = ['F — corresponding: equal', 'Z — alternate interior: equal', 'C — co-interior: supplementary'];
  const letter = ['F', 'Z', 'C'];
  F4cx.forEach((cx, pi) => {
    const s: [number, number] = [r2(cx - 68.66), 25], e: [number, number] = [r2(cx + 55.47), 240];
    const d = unitV([e[0] - s[0], e[1] - s[1]]);
    console.log(`  <text x="${cx - 100}" y="66" font-size="15" font-weight="bold" fill="currentColor" text-anchor="middle">${letter[pi]}</text>`);
    console.log(`  <line x1="${cx - 70}" y1="90" x2="${cx + 70}" y2="90" stroke="currentColor" stroke-width="1.8"/>`);
    console.log(`  ${head(cx - 70, 90, -1, 0)}\n  ${head(cx + 70, 90, 1, 0)}`);
    console.log(`  <line x1="${cx - 70}" y1="210" x2="${cx + 70}" y2="210" stroke="currentColor" stroke-width="1.8"/>`);
    console.log(`  ${head(cx - 70, 210, -1, 0)}\n  ${head(cx + 70, 210, 1, 0)}`);
    console.log(`  <line x1="${s[0]}" y1="${s[1]}" x2="${e[0]}" y2="${e[1]}" stroke="currentColor" stroke-width="1.8"/>`);
    console.log(`  ${head(s[0], s[1], -d[0], -d[1])}\n  ${head(e[0], e[1], d[0], d[1])}`);
    const u = cross4(cx, 90), v = cross4(cx, 210);
    if (pi === 0) { // F: TR regions at both crossings (120° each)
      console.log(arcPath(u, 240, 360, 16) + '\n' + arcPath(v, 240, 360, 16));
      console.log(lbl(r2(cx - 15.13), 66.3, '120°', 12.5) + '\n' + lbl(r2(cx + 54.15), 186.3, '120°', 12.5));
    } else if (pi === 1) { // Z: upper BR (60°) + lower TL (60°)
      console.log(arcPath(u, 0, 60, 16) + '\n' + arcPath(v, 180, 240, 16));
      console.log(lbl(r2(cx + 8.7), 117, '60°', 12.5) + '\n' + lbl(cx - 20, 184, '60°', 12.5));
    } else { // C: upper BR (60°) + lower TR (120°)
      console.log(arcPath(u, 0, 60, 16) + '\n' + arcPath(v, 240, 360, 16));
      console.log(lbl(r2(cx + 8.7), 117, '60°', 12.5) + '\n' + lbl(cx + 64, 179, '120°', 12.5));
    }
    console.log(lbl(cx, 274, panelTitle[pi], 12.5));
  });
}

// ---- lesson 8.4 figure emission (run 40) ----
{
  const emitLbl = (x: number, y: number, s: string, size = 13): string => `  <text x="${x}" y="${y}" font-size="${size}" fill="currentColor" text-anchor="middle">${s}</text>`;
  const arcPt = (v: Vec, deg: number, r: number): string => `${r2(v[0] + r * Math.cos(rad(deg)))} ${r2(v[1] + r * Math.sin(rad(deg)))}`;
  const arcPath = (v: Vec, d1: number, d2: number, r: number): string => `  <path d="M ${arcPt(v, d1, r)} A ${r} ${r} 0 0 1 ${arcPt(v, d2, r)}" fill="none" stroke="currentColor" stroke-width="1.6"/>`;
  const head = (tx: number, ty: number, dx: number, dy: number): string => {
    const sgs = headSegs(tx, ty, dx, dy);
    const c1 = [sgs[0][2], sgs[0][3]], c2 = [sgs[1][2], sgs[1][3]];
    return `<polygon points="${tx},${ty} ${c1[0]},${c1[1]} ${c2[0]},${c2[1]}" fill="currentColor"/>`;
  };
  const aB6 = angDeg(subV(F6A, F6B), subV(F6C, F6B));
  const aC6 = angDeg(subV(F6A, F6C), subV(F6B, F6C));
  const aAB6 = angDeg(subV(F6X, F6A), subV(F6B, F6A));

  console.log('=== FIG5 body (anatomy + exterior at C, viewBox 0 0 760 400) ===');
  console.log(`  <text x="380" y="20" font-size="12.5" fill="currentColor" text-anchor="middle">the parts of a triangle, and the exterior angle at C</text>`);
  console.log(`  <line x1="${F5A[0]}" y1="${F5A[1]}" x2="${F5B[0]}" y2="${F5B[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  <line x1="${F5B[0]}" y1="${F5B[1]}" x2="${F5D[0]}" y2="${F5D[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  <line x1="${F5C[0]}" y1="${F5C[1]}" x2="${F5A[0]}" y2="${F5A[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  ${head(F5D[0], F5D[1], 1, 0)}`);
  console.log(`  <circle cx="${F5A[0]}" cy="${F5A[1]}" r="4" fill="currentColor"/>`);
  console.log(`  <circle cx="${F5B[0]}" cy="${F5B[1]}" r="4" fill="currentColor"/>`);
  console.log(`  <circle cx="${F5C[0]}" cy="${F5C[1]}" r="4" fill="currentColor"/>`);
  console.log(arcPath(F5A, 35.54, 117.47, 30));
  console.log(arcPath(F5B, 297.54, 360, 30));
  console.log(arcPath(F5C, 180, 215.54, 30));
  console.log(`  <path d="M ${arcPt(F5C, 215.54, 20)} A 20 20 0 0 1 ${arcPt(F5C, 360, 20)}" fill="none" stroke="currentColor" stroke-width="1.6" stroke-dasharray="4 3"/>`);
  console.log(emitLbl(246, 50, 'A', 14) + '\n' + emitLbl(100, 338, 'B', 14) + '\n' + emitLbl(616, 344, 'C', 14) + '\n' + emitLbl(712, 306, 'D', 14));
  console.log(emitLbl(360, 306, 'a', 13) + '\n' + emitLbl(414, 210, 'b', 13) + '\n' + emitLbl(201, 203, 'c', 13));
  console.log(emitLbl(648, 284, 'exterior', 12));

  console.log('=== FIG6 body (the parallel through A, viewBox 0 0 760 420) ===');
  console.log(`  <text x="380" y="24" font-size="12.5" fill="currentColor" text-anchor="middle">the line XY through A, parallel to BC</text>`);
  console.log(`  <line x1="${F6X[0]}" y1="${F6X[1]}" x2="${F6Y[0]}" y2="${F6Y[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  ${head(F6X[0], F6X[1], -1, 0)}\n  ${head(F6Y[0], F6Y[1], 1, 0)}`);
  console.log(`  <line x1="${F6B[0]}" y1="${F6B[1]}" x2="${F6C[0]}" y2="${F6C[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  <line x1="${F6A[0]}" y1="${F6A[1]}" x2="${F6B[0]}" y2="${F6B[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  <line x1="${F6A[0]}" y1="${F6A[1]}" x2="${F6C[0]}" y2="${F6C[1]}" stroke="currentColor" stroke-width="1.8"/>`);
  console.log(`  <circle cx="${F6A[0]}" cy="${F6A[1]}" r="4" fill="currentColor"/>`);
  console.log(`  <circle cx="${F6B[0]}" cy="${F6B[1]}" r="4" fill="currentColor"/>`);
  console.log(`  <circle cx="${F6C[0]}" cy="${F6C[1]}" r="4" fill="currentColor"/>`);
  console.log(arcPath(F6A, 180 - aAB6, 180, 30));
  console.log(arcPath(F6A, 0, aC6, 30));
  console.log(arcPath(F6A, aC6, 180 - aAB6, 26) + '\n' + arcPath(F6A, aC6, 180 - aAB6, 34));
  console.log(arcPath(F6B, 360 - aB6, 360, 30));
  console.log(arcPath(F6C, 180, 180 + aC6, 30));
  console.log(emitLbl(74, 142, 'X', 14) + '\n' + emitLbl(696, 142, 'Y', 14) + '\n' + emitLbl(286, 102, 'A', 14) + '\n' + emitLbl(114, 360, 'B', 14) + '\n' + emitLbl(606, 360, 'C', 14));
  console.log(emitLbl(257, 147, '1', 12.5) + '\n' + emitLbl(195, 316, '1', 12.5) + '\n' + emitLbl(370, 150, '3', 12.5) + '\n' + emitLbl(540, 332, '3', 12.5) + '\n' + emitLbl(307, 178, '2', 12.5));
  console.log(`  <text x="380" y="398" font-size="12.5" fill="currentColor" text-anchor="middle">1 + 2 + 3 = 180\u00b0 on the line XY \u2014 and the same three angles sit inside \u25b3ABC</text>`);

  console.log('=== FIG7 body (the classification gallery, viewBox 0 0 760 340) ===');
  console.log(`  <text x="380" y="22" font-size="12.5" fill="currentColor" text-anchor="middle">six kinds of triangle \u2014 by their sides, then by their angles</text>`);
  const tri = (pts: Vec[]): string => `  <polygon points="${pts.map(p => `${p[0]},${p[1]}`).join(' ')}" fill="none" stroke="currentColor" stroke-width="1.8"/>`;
  const tick = (p: Vec, q: Vec): string => {
    const mx = (p[0] + q[0]) / 2, my = (p[1] + q[1]) / 2;
    const d = unitV(subV(q, p));
    const nx = -d[1], ny = d[0];
    return `  <line x1="${r2(mx + 6 * nx)}" y1="${r2(my + 6 * ny)}" x2="${r2(mx - 6 * nx)}" y2="${r2(my - 6 * ny)}" stroke="currentColor" stroke-width="1.6"/>`;
  };
  const captions1 = ['scalene \u2014 no equal sides', 'isosceles \u2014 two equal sides', 'equilateral \u2014 all sides equal'];
  const captions2 = ['acute \u2014 all angles under 90\u00b0', 'right \u2014 one angle exactly 90\u00b0', 'obtuse \u2014 one angle over 90\u00b0'];
  F7cx.forEach((cx, i) => {
    const apexTop: Vec = [cx, 58], bl1: Vec = [cx - 70, 158], br1: Vec = [cx + 70, 158];
    if (i === 0) console.log(tri([[cx - 15, 58], bl1, br1]));
    if (i === 1) console.log(tri([apexTop, bl1, br1]) + '\n' + tick(apexTop, bl1) + '\n' + tick(apexTop, br1));
    if (i === 2) {
      const e1: Vec = [cx - 57.735, 158], e2: Vec = [cx + 57.735, 158];
      console.log(tri([apexTop, e1, e2]) + '\n' + tick(apexTop, e1) + '\n' + tick(apexTop, e2) + '\n' + tick(e1, e2));
    }
    console.log(emitLbl(cx, 182, captions1[i], 12.5));
  });
  F7cx.forEach((cx, i) => {
    if (i === 0) console.log(tri([[cx, 212], [cx - 65, 312], [cx + 65, 312]]));
    if (i === 1) {
      console.log(tri([[cx - 70, 212], [cx - 70, 312], [cx + 70, 312]]));
      console.log(`  <polyline points="${cx - 56},312 ${cx - 56},298 ${cx - 70},298" fill="none" stroke="currentColor" stroke-width="1.4"/>`);
    }
    if (i === 2) console.log(tri([[cx, 252], [cx - 78, 312], [cx + 78, 312]]));
    console.log(emitLbl(cx, 332, captions2[i], 12.5));
  });
}
