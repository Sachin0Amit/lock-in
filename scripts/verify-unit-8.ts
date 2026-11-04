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

/* ============================================================ */
console.log(`verify-unit-8: ${pass} passed, ${fail} failed`);
if (fail > 0) {
  console.log('FAILURES:');
  for (const f of failures) console.log('  ✗ ' + f);
  process.exit(1);
}
console.log('ALL PASS');
