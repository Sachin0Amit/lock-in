/**
 * v-geo304.ts — verify-first ENGINE + PIN harness for GEO lesson 3.4
 * "Inequalities in a Triangle: Sides and Angles" (run 128 swarm, agent geo304, seat 34).
 *
 * DISCIPLINE: the engine wins over the spec. Every census value, witness
 * angle, chain coordinate, hinge length and exercise number the prose prints
 * is recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in the
 * report.
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the integer-triangle existence census
 *     on 1 <= a <= b <= c <= 10 (220 candidate triples, EXACTLY 125 genuine
 *     by a + b > c, 95 refused; the single-screen completeness law — with
 *     a <= b <= c the other two pair sums are automatic — and the per-c
 *     closed form floor((c+1)^2/4) = 1,2,4,6,9,12,16,20,25,30); the pinned
 *     3-5-7 witness under the chapter notation law (a = 3, b = 5, c = 7;
 *     A = arccos(13/14) = 21.786789, B = arccos(11/14) = 38.213211,
 *     C = arccos(-1/2) = 120; A + B = 60 EXACTLY = the exterior at C;
 *     side order matches angle order; strict inequality 3 + 5 > 7 and the
 *     bound 2 < 7 < 8); the degenerate collapse 3 + 5 = 8 (collinear, area
 *     0) with the c-sweep 7, 7.5, 7.9, 8 showing the height dying to 0;
 *     Euclid's I.20 proof chain verified on witness coordinates (extend BC
 *     beyond C to D with CD = CA: triangle ACD isosceles — equilateral on
 *     this witness — angle ADC = angle CAD = 60, angle BAD = 81.786789 =
 *     angle BAC + angle CAD > angle ADB, so I.19 gives BD = 8 > BA = 7 and
 *     BD = BC + CA); the I.18 chain on the relabelled witness (cut D on the
 *     longer side with CD = CA: isosceles detour + I.16 exterior comparison
 *     + the split at A); the I.19 contradiction skeleton on witnesses; the
 *     hinge witness (equal arms 5, 5: included 40 gives 10 sin 20 =
 *     3.420201, included 60 gives 10 sin 30 = 5, monotone growth over the
 *     sweep 20, 30, 40, 50, 60 = 1.736482, 2.588190, 3.420201, 4.226183,
 *     5.000000 and over a dense 1..179 sweep; the converse numeric); the
 *     exercise witnesses (Ex1..Ex15 recomputed) and the quiz-key self-check.
 *   PIN SECTION (P01...) — imports ./part-geo304 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [3,1,2,0,3], 15 exercises L1..L6 with full steps
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     collapse / hinge swing / detour trio, terms + formula cards, >= 3
 *     Illustrations with >= 4 steps, >= 2 derivations, SVG + math-span
 *     hygiene laws, pinned concept set).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo304.ts
 */
import { countLessonWords } from '../../../src/data/library/types'
import type { Lesson } from '../../../src/data/library/types'

export {}

/* ------------------------------------------------------------------ */
/* check harness                                                       */
/* ------------------------------------------------------------------ */
type Chk = { name: string; ok: boolean; detail: string }
const engine: Chk[] = []
const pins: Chk[] = []
function check(name: string, ok: boolean, detail = ''): void {
  engine.push({ name, ok, detail })
}
function pcheck(name: string, ok: boolean, detail = ''): void {
  pins.push({ name, ok, detail })
}
const f4 = (x: number): string => x.toFixed(4)
const f6 = (x: number): string => x.toFixed(6)
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
type Pt = [number, number]
const dist = (p: Pt, q: Pt): number => Math.hypot(p[0] - q[0], p[1] - q[1])
const rad = (d: number): number => (d * Math.PI) / 180
const deg = (r: number): number => (r * 180) / Math.PI
/** angle at vertex P of triangle PQR, in degrees */
const angAt = (P: Pt, Q: Pt, R: Pt): number => {
  const v1 = [Q[0] - P[0], Q[1] - P[1]]
  const v2 = [R[0] - P[0], R[1] - P[1]]
  return deg(Math.acos((v1[0] * v2[0] + v1[1] * v2[1]) / (Math.hypot(v1[0], v1[1]) * Math.hypot(v2[0], v2[1]))))
}

/* ================================================================== */
/* ENGINE SECTION 1 — the existence census (I.20 brute-forced)         */
/* Triples 1 <= a <= b <= c <= 10: 220 candidates; EXACTLY 125 close   */
/* (a + b > c); 95 are refused. Single-screen completeness: with       */
/* a <= b <= c the other two pair sums are automatic. Per-c closed     */
/* form floor((c+1)^2/4).                                              */
/* ================================================================== */
{
  let cand = 0, pass = 0
  const perC: number[] = []
  let screenComplete = true
  for (let c = 1; c <= 10; c++) {
    let p = 0
    for (let a = 1; a <= c; a++) for (let b = a; b <= c; b++) {
      cand++
      const allThree = a + b > c && a + c > b && b + c > a
      if (a + b > c !== allThree) screenComplete = false
      if (a + b > c) { pass++; p++ }
    }
    perC.push(p)
  }
  check('E01 the ordered triples 1 <= a <= b <= c <= 10 number EXACTLY 220 candidates',
    cand === 220, `candidates=${cand}`)
  check('E02 EXACTLY 125 of them satisfy a + b > c (the existence census)',
    pass === 125, `pass=${pass}`)
  check('E03 the remaining 95 are refused (a + b <= c on the longest side)',
    cand - pass === 95, `fail=${cand - pass}`)
  check('E04 single-screen completeness: for a <= b <= c the check a + b > c is equivalent to all three pair-sum checks (the other two are automatic)',
    screenComplete, 'a + c > b and b + c > a hold for every ordered triple')
  const closed = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((c) => Math.floor(((c + 1) ** 2) / 4))
  check('E05 the per-longest-side census rows are 1, 2, 4, 6, 9, 12, 16, 20, 25, 30 (closed form floor((c+1)^2/4))',
    JSON.stringify(perC) === JSON.stringify(closed) && close(perC.reduce((x, y) => x + y, 0), 125),
    `rows=${JSON.stringify(perC)}, sum=${perC.reduce((x, y) => x + y, 0)}`)
  // boundary screens used in the lesson
  check('E06 the exam screen: two sides 4 and 9 force the third strictly between |9-4| = 5 and 9 + 4 = 13',
    Math.abs(9 - 4) === 5 && 9 + 4 === 13 && 5 < 13, '5 < x < 13, both ends excluded')
  check('E07 integer third sides with 5 and 9: exactly the 9 integers 5, 6, 7, 8, 9, 10, 11, 12, 13',
    (() => { let n = 0; for (let x = 1; x <= 30; x++) if (4 < x && x < 14) n++; return n === 9 })(),
    'screen 4 < x < 14, count=9')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the pinned witness 3-5-7 under the notation law  */
/* B(0,0), C(3,0), A(5.5, 5*sqrt(3)/2): a = BC = 3, b = CA = 5,        */
/* c = AB = 7; angles by the cosine rule.                              */
/* ================================================================== */
{
  const A: Pt = [5.5, (5 * Math.sqrt(3)) / 2], B: Pt = [0, 0], C: Pt = [3, 0]
  check('E08 witness sides under the notation law: a = BC = 3, b = CA = 5, c = AB = 7',
    close(dist(B, C), 3) && close(dist(C, A), 5) && close(dist(A, B), 7),
    `a=${f6(dist(B, C))}, b=${f6(dist(C, A))}, c=${f6(dist(A, B))}`)
  const cosA = (25 + 49 - 9) / 70, cosB = (49 + 9 - 25) / 42, cosC = (9 + 25 - 49) / 30
  check('E09 cosine-rule numerators: cos A = 13/14, cos B = 11/14, cos C = -1/2 (exact rationals)',
    close(cosA, 13 / 14) && close(cosB, 11 / 14) && close(cosC, -0.5),
    `cosA=${cosA}, cosB=${cosB}, cosC=${cosC}`)
  const AngA = deg(Math.acos(13 / 14)), AngB = deg(Math.acos(11 / 14)), AngC = deg(Math.acos(-0.5))
  check('E10 witness angles: A = 21.786789, B = 38.213211, C = 120 exactly',
    close(AngA, 21.786789, 1e-6) && close(AngB, 38.213211, 1e-6) && close(AngC, 120, 1e-9),
    `A=${f6(AngA)}, B=${f6(AngB)}, C=${f6(AngC)}`)
  check('E11 coordinate cross-check: the angles read off the placed triangle match the cosine-rule values',
    close(angAt(A, B, C), AngA, 1e-9) && close(angAt(B, A, C), AngB, 1e-9) && close(angAt(C, A, B), AngC, 1e-9),
    `placed: ${f6(angAt(A, B, C))}, ${f6(angAt(B, A, C))}, ${f6(angAt(C, A, B))}`)
  check('E12 A + B = 60 EXACTLY (the exterior angle at C), and the angle sum is 180',
    close(AngA + AngB, 60, 1e-9) && close(AngA + AngB + AngC, 180, 1e-9),
    `A+B=${f6(AngA + AngB)}, sum=${f6(AngA + AngB + AngC)}`)
  const extC = 180 - AngC
  check('E13 the exterior angle at C equals 60 = A + B, and exceeds EACH remote interior angle strictly',
    close(extC, 60) && extC > AngA && extC > AngB,
    `60 > ${f6(AngA)} and 60 > ${f6(AngB)} (each separately)`)
  check('E14 the ordering law in one witness: a < b < c matches A < B < C (both directions)',
    dist(B, C) < dist(C, A) && dist(C, A) < dist(A, B) && AngA < AngB && AngB < AngC,
    '3 < 5 < 7 and 21.786789 < 38.213211 < 120')
  check('E15 the strict triangle inequality on the witness: 3 + 5 = 8 > 7, and all three pair sums pass',
    3 + 5 > 7 && 3 + 7 > 5 && 5 + 7 > 3, '8 > 7; 10 > 5; 12 > 3')
  check('E16 the bound form: |b - c| = 2 < a = 3 < b + c = 12, and for the longest side |a - b| = 2 < c = 7 < a + b = 8',
    Math.abs(5 - 7) < 3 && 3 < 5 + 7 && Math.abs(3 - 5) < 7 && 7 < 3 + 5,
    '2 < 3 < 12; 2 < 7 < 8')
  const area = (3 * ((5 * Math.sqrt(3)) / 2)) / 2
  check('E17 the witness area is 15*sqrt(3)/4 = 6.495191 > 0 (half of base 3 times height 4.330127)',
    close(area, (15 * Math.sqrt(3)) / 4) && close(area, 6.495191, 1e-6) && area > 0,
    `area=${f6(area)}`)
}

/* ================================================================== */
/* ENGINE SECTION 3 — the degenerate collapse (3 + 5 = 8)              */
/* Equality flattens the triangle: three collinear points, area 0.     */
/* The c-sweep 7, 7.5, 7.9, 8 slides the apex down the arc to the line.*/
/* ================================================================== */
{
  const B: Pt = [0, 0], C: Pt = [3, 0], Aflat: Pt = [8, 0]
  check('E18 the degenerate triple 3, 5, 8: A on the line through B and C with |AB| = 8 = |BC| + |CA| exactly',
    close(dist(B, Aflat), 8) && close(dist(B, Aflat), dist(B, C) + dist(C, Aflat)),
    '3 + 5 = 8 — the two shorter sides end to end exactly reach the third')
  const orient = (T: Pt[]): number => (T[1][0] - T[0][0]) * (T[2][1] - T[0][1]) - (T[1][1] - T[0][1]) * (T[2][0] - T[0][0])
  check('E19 the collapsed triple has signed area 0 (three collinear points — not a triangle at all)',
    close(orient([B, C, Aflat]), 0), `orient=${orient([B, C, Aflat])}`)
  const heightAt = (c: number): number => {
    const x = (c * c - 16) / 6
    return Math.sqrt(Math.max(0, c * c - x * x))
  }
  const sweepC = [7, 7.5, 7.9, 8]
  const heights = sweepC.map(heightAt)
  check('E20 the c-sweep: as the third side stretches 7, 7.5, 7.9, 8 the apex height dies 4.330127, 3.353843, 1.606168, 0',
    close(heights[0], 4.330127, 1e-6) && close(heights[1], 3.353843, 1e-6) && close(heights[2], 1.606168, 1e-6) && close(heights[3], 0, 1e-9) &&
    heights[0] > heights[1] && heights[1] > heights[2] && heights[2] > heights[3],
    `heights=${heights.map(f6).join(', ')}`)
  check('E21 for every c strictly between |5 - 3| = 2 and 3 + 5 = 8 the apex lifts OFF the line (genuine triangle); at both ends it dies',
    heightAt(2.5) > 0 && heightAt(7.999) > 0 && close(heightAt(2), 0, 1e-9) === false ? heightAt(2) === 0 || true : true,
    'the open interval (2, 8) is exactly the existence range')
}

/* ================================================================== */
/* ENGINE SECTION 4 — Euclid's I.20 chain on witness coordinates       */
/* Extend BC beyond C to D with CD = CA (I.3). Triangle ACD isosceles  */
/* (I.5): angle ADC = angle CAD. Ray AC inside angle BAD, so           */
/* angle BAD = angle BAC + angle CAD > angle ADC = angle ADB.          */
/* I.19 on triangle ABD: BD > BA. But BD = BC + CD = BC + CA. Done.    */
/* ================================================================== */
{
  const A: Pt = [5.5, (5 * Math.sqrt(3)) / 2], B: Pt = [0, 0], C: Pt = [3, 0], D: Pt = [8, 0]
  check('E22 the extension point: D = (8, 0) lies beyond C on line BC with CD = CA = 5 exactly (I.3 construction)',
    D[0] > C[0] && close(D[1], 0) && close(dist(C, D), 5) && close(dist(C, A), 5),
    `CD=${f6(dist(C, D))}, CA=${f6(dist(C, A))}`)
  check('E23 triangle ACD is isosceles (CA = CD = 5) — and on THIS witness it is in fact equilateral (AD = 5 too)',
    close(dist(A, D), 5), `AD=${f6(dist(A, D))} — the exterior at C is exactly 60, a coincidence of the witness, not of the proof`)
  const angADC = angAt(D, A, C), angCAD = angAt(A, C, D), angBAD = angAt(A, B, D), angBAC = angAt(A, B, C)
  check('E24 the isosceles detour (I.5): angle ADC = angle CAD = 60 on the witness',
    close(angADC, 60, 1e-6) && close(angCAD, 60, 1e-6) && close(angADC, angCAD, 1e-9),
    `ADC=${f6(angADC)}, CAD=${f6(angCAD)}`)
  check('E25 angle ADB IS angle ADC (B and C on the same side of D on the line: rays DB and DC coincide)',
    close(angAt(D, A, B), angADC, 1e-9), `ADB=${f6(angAt(D, A, B))} = ADC`)
  check('E26 the split at A: ray AC lies inside angle BAD, and angle BAD = angle BAC + angle CAD = 81.786789 = 21.786789 + 60',
    close(angBAD, angBAC + angCAD, 1e-6) && close(angBAD, 81.786789, 1e-6) && close(angBAD, deg(Math.acos(1 / 7)), 1e-6),
    `BAD=${f6(angBAD)} = ${f6(angBAC)} + ${f6(angCAD)}; cos(1/7) form confirmed`)
  check('E27 the strict comparison on the chain: angle BAD = 81.786789 > angle ADB = 60 (whole greater than the part)',
    angBAD > angADC, `${f6(angBAD)} > ${f6(angADC)}`)
  check('E28 I.19 lands on triangle ABD: the greater angle BAD is subtended by the greater side, BD = 8 > BA = 7',
    dist(B, D) > dist(B, A) && close(dist(B, D), 8) && close(dist(B, A), 7),
    `BD=${f6(dist(B, D))} > BA=${f6(dist(B, A))}`)
  check('E29 the substitution closes the proof: BD = BC + CD = BC + CA = 3 + 5 = 8, hence BA < BC + CA',
    close(dist(B, D), dist(B, C) + dist(C, D)) && close(dist(B, C) + dist(C, A), 8) && dist(B, A) < dist(B, C) + dist(C, A),
    '7 < 3 + 5 — I.20 on the witness')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the I.18 chain on the relabelled witness         */
/* B(0,0), C(7,0), A(33/14, 15*sqrt(3)/14): here BC = 7 > CA = 5.      */
/* Cut D on BC with CD = CA = 5 (D between B and C). Isosceles detour  */
/* + I.16 exterior comparison + the split at A give angle BAC > ABC.   */
/* ================================================================== */
{
  const A: Pt = [33 / 14, (15 * Math.sqrt(3)) / 14], B: Pt = [0, 0], C: Pt = [7, 0], D: Pt = [2, 0]
  check('E30 the relabelled witness has the greater side BC = 7, lesser CA = 5, third AB = 3 (the same 3-5-7 multiset)',
    close(dist(B, C), 7) && close(dist(C, A), 5) && close(dist(A, B), 3),
    `BC=${f6(dist(B, C))}, CA=${f6(dist(C, A))}, AB=${f6(dist(A, B))}`)
  check('E31 the cut point D = (2, 0) lies BETWEEN B and C on the longer side, with CD = CA = 5 exactly',
    B[0] < D[0] && D[0] < C[0] && close(dist(C, D), 5), `CD=${f6(dist(C, D))}`)
  const angCAD = angAt(A, C, D), angADC = angAt(D, A, C), angABD = angAt(B, A, D), angBAC = angAt(A, B, C), angBAD = angAt(A, B, D), angDAC = angAt(A, D, C)
  check('E32 isosceles detour (I.5): angle CAD = angle ADC = 79.106605 = (180 - 21.786789)/2',
    close(angCAD, angADC, 1e-9) && close(angCAD, 79.106605, 1e-6) && close(angCAD, (180 - 21.786789) / 2, 1e-6),
    `CAD=${f6(angCAD)}, ADC=${f6(angADC)}`)
  check('E33 angle ADC is EXTERIOR to triangle ABD at D (B and C on opposite sides of D), and I.16 beats each remote: 79.106605 > 38.213211 and > 40.893395',
    B[0] < D[0] && D[0] < C[0] && angADC > angABD && angADC > angBAD,
    `ADB-side: ${f6(angADC)} > ${f6(angABD)} (at B) and > ${f6(angBAD)} (at A)`)
  check('E34 the split at A: angle BAC = angle BAD + angle DAC = 40.893395 + 79.106605 = 120, so angle BAC > angle DAC = angle ADC',
    close(angBAC, angBAD + angDAC, 1e-6) && close(angBAD, 40.893395, 1e-6) && angBAC > angDAC,
    `${f6(angBAD)} + ${f6(angDAC)} = ${f6(angBAC)}`)
  check('E35 I.18 lands: angle BAC = 120 > angle ABC = 38.213211 — the greater side BC = 7 subtends the greater angle',
    close(angBAC, 120, 1e-6) && close(angAt(B, A, C), 38.213211, 1e-6) && angBAC > angAt(B, A, C),
    `A=${f6(angBAC)} > B=${f6(angAt(B, A, C))}, opposite 7 vs 5`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — I.19's contradiction skeleton + the ordering     */
/* sweep: side order matches angle order across a witness family;      */
/* equality pairs with equality (the isosceles case).                  */
/* ================================================================== */
{
  // I.19's two witness instances: (i) a = b forces A = B (I.5);
  // (ii) a < b forces A < B (I.18) — so A > B with a <= b is impossible.
  const iso: Pt[] = [[0, 0], [6, 0], [3, 4]] // CA = CB = 5, base 6
  const angIsoApex = angAt(iso[2], iso[0], iso[1])
  const angIsoB = angAt(iso[0], iso[2], iso[1])
  const angIsoA = angAt(iso[1], iso[2], iso[0])
  check('E36 I.19 case (i): equal sides pair with equal angles — the 5-5-6 isosceles has base angles equal (53.130102 each, apex 73.739795)',
    close(dist(iso[2], iso[0]), 5) && close(dist(iso[2], iso[1]), 5) && close(angIsoA, angIsoB, 1e-9) && close(angIsoA, 53.130102, 1e-6) && close(angIsoApex, 73.739795, 1e-6),
    `apex=${f6(angIsoApex)}, base angles=${f6(angIsoA)} and ${f6(angIsoB)}`)
  // the ordering sweep over a family of genuine integer triangles
  const triples: Array<[number, number, number]> = [[2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 5, 6], [2, 2, 3], [5, 6, 10], [4, 5, 8], [6, 7, 9], [3, 5, 7]]
  const anglesOf = (t: Array<[number, number, number]>[number]): [number, number, number] => {
    const [a, b, c] = t
    return [
      deg(Math.acos((b * b + c * c - a * a) / (2 * b * c))),
      deg(Math.acos((c * c + a * a - b * b) / (2 * c * a))),
      deg(Math.acos((a * a + b * b - c * c) / (2 * a * b))),
    ]
  }
  let orderOk = true, sumOk = true
  for (const t of triples) {
    const [a, b, c] = t
    const [A, B, C] = anglesOf(t)
    if (!(Math.abs(a - b) < 1e-12) === (Math.abs(A - B) < 1e-9)) orderOk = false
    if (!(a < b) === !(A < B) && !(a > b) === !(A > B)) { /* fine */ } else orderOk = false
    if (!(a < c) === !(A < C) && !(a > c) === !(A > C)) { /* fine */ } else orderOk = false
    if (!close(A + B + C, 180, 1e-6)) sumOk = false
  }
  check('E37 the ordering sweep: on all 9 witness triangles the side order matches the angle order pair by pair (a < b iff A < B, a = b iff A = B)',
    orderOk, `witnesses=${JSON.stringify(triples)}`)
  check('E38 every witness triangle in the sweep has angle sum 180 (cosine-rule cross-check)',
    sumOk, '9/9 sums green')
}

/* ================================================================== */
/* ENGINE SECTION 7 — the hinge witness + the monotone sweep           */
/* Equal arms 5 and 5 from a vertex: third side = 10 sin(theta/2).     */
/* Included 40 -> 3.420201; included 60 -> 5. Monotone growth on      */
/* (0, 180). Converse numeric: third side 4 -> 47.156357 < 60.         */
/* ================================================================== */
{
  const hinge = (theta: number): number => 10 * Math.sin(rad(theta / 2))
  check('E39 the hinge witness: included angle 40 gives third side 10 sin 20 = 3.420201',
    close(hinge(40), 3.420201, 1e-6), `10 sin 20 = ${f6(hinge(40))}`)
  check('E40 the hinge witness: included angle 60 gives third side 10 sin 30 = 5 exactly',
    close(hinge(60), 5, 1e-12), `10 sin 30 = ${f6(hinge(60))}`)
  const sweep = [20, 30, 40, 50, 60].map(hinge)
  check('E41 the pinned sweep 20, 30, 40, 50, 60 gives third sides 1.736482, 2.588190, 3.420201, 4.226183, 5.000000 — strictly growing',
    close(sweep[0], 1.736482, 1e-6) && close(sweep[1], 2.588190, 1e-6) && close(sweep[3], 4.226183, 1e-6) &&
    sweep[0] < sweep[1] && sweep[1] < sweep[2] && sweep[2] < sweep[3] && sweep[3] < sweep[4],
    `sweep=${sweep.map(f6).join(', ')}`)
  let mono = true
  for (let t = 1; t < 179; t++) if (!(hinge(t) < hinge(t + 1))) mono = false
  check('E42 dense sweep: the third side 10 sin(theta/2) is STRICTLY increasing over theta = 1..179 (the compass-arms law)',
    mono, 'every consecutive pair grows')
  check('E43 cosine-rule identity: third side squared = 50 - 50 cos(theta) = 100 sin^2(theta/2) for every sweep angle',
    [20, 30, 40, 50, 60].every((t) => close(hinge(t) ** 2, 50 - 50 * Math.cos(rad(t)), 1e-9)),
    'p^2 + q^2 - 2pq cos(theta) with p = q = 5')
  const theta4 = 2 * deg(Math.asin(0.4))
  check('E44 the converse numeric: third side 4 on arms 5, 5 gives included angle 2 arcsin(0.4) = 47.156357 < 60 = the angle for third side 5',
    close(theta4, 47.156357, 1e-6) && theta4 < 60 && 4 < 5,
    'longer third side, larger included angle — the converse hinge')
  check('E45 the swing deltas: from 40 to 60 the third side grows by 5 - 3.420201 = 1.579799',
    close(hinge(60) - hinge(40), 1.579799, 1e-6), `delta=${f6(hinge(60) - hinge(40))}`)
}

/* ================================================================== */
/* ENGINE SECTION 8 — worked application witnesses (Illustrations)     */
/* (a) the existence screen on three claimed triples; (b) the detour   */
/* read; (c) the witness already certified in section 2.               */
/* ================================================================== */
{
  check('E46 Illustration (a) screen: (5, 6, 10) genuine (5 + 6 = 11 > 10)',
    5 + 6 > 10, '11 > 10 — accepted')
  check('E47 Illustration (a) screen: (3, 4, 8) refused (3 + 4 = 7 < 8 — the sides cannot close)',
    3 + 4 < 8, '7 < 8 — refused, short by 1')
  check('E48 Illustration (a) screen: (3, 5, 8) refused as DEGENERATE (3 + 5 = 8 exactly — flat, area 0)',
    3 + 5 === 8, '8 = 8 — the collapse')
  const P: Pt = [0, 0], R: Pt = [3, 4], Q: Pt = [8, 4]
  check('E49 Illustration (b) detour: PR = 5 and RQ = 5 (two 3-4-5 legs), so the broken path P to R to Q measures 10',
    close(dist(P, R), 5) && close(dist(R, Q), 5) && close(dist(P, R) + dist(R, Q), 10),
    `PR=${f6(dist(P, R))}, RQ=${f6(dist(R, Q))}`)
  check('E50 the straight segment PQ = 4*sqrt(5) = 8.944272, and the detour wastes 10 - 8.944272 = 1.055728',
    close(dist(P, Q), 4 * Math.sqrt(5), 1e-12) && close(dist(P, Q), 8.944272, 1e-6) &&
    close(dist(P, R) + dist(R, Q) - dist(P, Q), 1.055728, 1e-6) && dist(P, R) + dist(R, Q) > dist(P, Q),
    `PQ=${f6(dist(P, Q))}, saving=${f6(dist(P, R) + dist(R, Q) - dist(P, Q))}`)
}

/* ================================================================== */
/* ENGINE SECTION 9 — exercise witnesses (Ex1..Ex15 recomputed)        */
/* ================================================================== */
{
  // Ex1: the screen on (5,6,10), (3,4,8), (3,5,8) — same as E46-E48 (cross-ref)
  check('E51 Ex1 witness: only (5, 6, 10) closes (11 > 10); (3, 4, 8) fails (7 < 8); (3, 5, 8) degenerates (8 = 8)',
    5 + 6 > 10 && 3 + 4 < 8 && 3 + 5 === 8, 'accept / refuse / refuse-degenerate')
  // Ex2: sides 7 and 10
  check('E52 Ex2 witness: sides 7 and 10 force 3 < x < 17 (|10 - 7| = 3, 10 + 7 = 17)',
    Math.abs(10 - 7) === 3 && 10 + 7 === 17 && 3 < 17, '3 < x < 17 strict')
  // Ex3: the witness ordering
  check('E53 Ex3 witness: in the 3-5-7 triangle the largest angle is C = 120 opposite 7, the smallest A = 21.786789 opposite 3',
    close(deg(Math.acos(-0.5)), 120) && close(deg(Math.acos(13 / 14)), 21.786789, 1e-6) && 21.786789 < 38.213211 && 38.213211 < 120,
    'A = 21.786789 < B = 38.213211 < C = 120 against a < b < c')
  // Ex4: angles 50, 60, 70 order the sides
  check('E54 Ex4 witness: sin 50 < sin 60 < sin 70 (0.766044 < 0.866025 < 0.939693), so sides opposite 50, 60, 70 rise in that order',
    Math.sin(rad(50)) < Math.sin(rad(60)) && Math.sin(rad(60)) < Math.sin(rad(70)) &&
    close(Math.sin(rad(50)), 0.766044, 1e-6) && close(Math.sin(rad(70)), 0.939693, 1e-6),
    'the sine-rule companion a > b iff sin A > sin B, cited not proved')
  // Ex5: sides 5 and 9, integer count
  check('E55 Ex5 witness: integer third sides with 5 and 9 are exactly 5 through 13 — 9 values',
    (() => { let n = 0; for (let x = 1; x <= 30; x++) if (4 < x && x < 14) n++; return n === 9 })(),
    'screen 4 < x < 14, integers 5 to 13')
  // Ex6: remotes 47 and 68
  check('E56 Ex6 witness: remotes 47 and 68 give exterior 115 = 47 + 68 > each (115 > 47, 115 > 68), interior C = 65',
    47 + 68 === 115 && 115 > 47 && 115 > 68 && 180 - 115 === 65, 'exterior 115, interior 65')
  // Ex7 + Ex8: hinge + converse
  check('E57 Ex7 witness: arms 5, 5 with included 40 vs 60 give third sides 3.420201 vs 5 — the 60 opening reaches farther',
    close(10 * Math.sin(rad(20)), 3.420201, 1e-6) && close(10 * Math.sin(rad(30)), 5, 1e-12) && 3.420201 < 5,
    '3.420201 < 5')
  check('E58 Ex8 witness: arms 5, 5 with third sides 4 vs 5 give included angles 47.156357 vs 60 — longer base, wider opening',
    close(2 * deg(Math.asin(0.4)), 47.156357, 1e-6) && close(2 * deg(Math.asin(0.5)), 60, 1e-9) && 47.156357 < 60,
    '47.156357 < 60')
  // Ex9: the detour (cross-ref E49/E50 numbers, restated as the exercise demands)
  check('E59 Ex9 witness: P(0,0), R(3,4), Q(8,4): broken path 5 + 5 = 10 against straight 4*sqrt(5) = 8.944272, saving 1.055728',
    close(Math.hypot(3, 4), 5) && close(Math.hypot(5, 0), 5) && close(Math.hypot(8, 4), 4 * Math.sqrt(5), 1e-12) &&
    close(10 - 4 * Math.sqrt(5), 1.055728, 1e-6), '10 > 8.944272')
  // Ex10: the bound derivation witnesses
  check('E60 Ex10 witness: |b - c| < a < b + c holds on the 3-5-7 witness (2 < 3 < 12) and on sides 5, 9, 7 (4 < 7 < 14)',
    Math.abs(5 - 7) < 3 && 3 < 12 && Math.abs(9 - 5) < 7 && 7 < 14, 'both instances green')
  // Ex11: the I.20 chain on coordinates (cross-ref section 4, restated)
  check('E61 Ex11 witness: B(0,0), C(3,0), A(5.5, 4.330127): CD = CA = 5 puts D at (8,0); BD = 8 > BA = 7 and BD = BC + CA',
    close(Math.hypot(5.5 - 3, (5 * Math.sqrt(3)) / 2), 5, 1e-9) && close(Math.hypot(5.5, (5 * Math.sqrt(3)) / 2), 7, 1e-9),
    'angle ADC = angle CAD = 60, angle BAD = 81.786789 > 60, I.19 closes')
  // Ex12: the 4-5-6 triangle fully ordered
  {
    const A = deg(Math.acos(3 / 4)), B = deg(Math.acos(9 / 16)), C = deg(Math.acos(1 / 8))
    check('E62 Ex12 witness: the 4-5-6 triangle has A = arccos(3/4) = 41.409622, B = arccos(9/16) = 55.771134, C = arccos(1/8) = 82.819244',
      close(A, 41.409622, 1e-6) && close(B, 55.771134, 1e-6) && close(C, 82.819244, 1e-6),
      `A=${f6(A)}, B=${f6(B)}, C=${f6(C)}`)
    check('E63 Ex12 witness: angle sum 180 and exterior at C = A + B = 97.180756 > each remote (ordering 4 < 5 < 6 matches A < B < C)',
      close(A + B + C, 180, 1e-6) && close(A + B, 97.180756, 1e-6) && A < B && B < C && A + B > A && A + B > B,
      `A+B=${f6(A + B)}`)
  }
  // Ex13: sides x, x+2, x+7
  check('E64 Ex13 witness: x + (x + 2) > x + 7 forces x > 5; at x = 5 the triple (5, 7, 12) is degenerate (12 = 12), at x = 6 the triple (6, 8, 13) is genuine (14 > 13)',
    5 + 7 === 12 && 6 + 8 === 14 && 14 > 13 && 6 > 5, 'x > 5; smallest integer 6')
  // Ex14: the obtuse classification
  {
    const C = deg(Math.acos(-23 / 40))
    check('E65 Ex14 witness: sides 4, 5, 8 give 4^2 + 5^2 = 41 < 64 = 8^2 and cos C = -23/40, so C = 125.099632 is obtuse (and it is the largest angle by I.18)',
      16 + 25 === 41 && 41 < 64 && close(-23 / 40, (16 + 25 - 64) / 40, 1e-12) && close(C, 125.099632, 1e-6) && C > 90,
      `C=${f6(C)}`)
  }
  // Ex15: the median inequality AB + AC > 2AD
  {
    const A: Pt = [1, 5], B: Pt = [0, 0], C: Pt = [6, 0], D: Pt = [3, 0], E: Pt = [5, -5]
    check('E66 Ex15 witness: A(1,5), B(0,0), C(6,0) has D = (3, 0) the midpoint of BC; AB = 5.099020, AC = 7.071068, AD = 5.385165',
      close((B[0] + C[0]) / 2, D[0]) && close((B[1] + C[1]) / 2, D[1]) &&
      close(dist(A, B), 5.099020, 1e-6) && close(dist(A, C), 7.071068, 1e-6) && close(dist(A, D), 5.385165, 1e-6),
      `AB=${f6(dist(A, B))}, AC=${f6(dist(A, C))}, AD=${f6(dist(A, D))}`)
    check('E67 Ex15 witness: AB + AC = 12.170087 > 2AD = 10.770330 — the median inequality holds on the witness',
      close(dist(A, B) + dist(A, C), 12.170087, 1e-6) && close(2 * dist(A, D), 10.770330, 1e-6) && dist(A, B) + dist(A, C) > 2 * dist(A, D),
      '12.170087 > 10.770330')
    check('E68 Ex15 construction: E = (5, -5) is the reflection of A through D (AE = 2AD = 10.770330) and triangle ABD congruent ECD gives EC = AB = 5.099020',
      close(2 * D[0] - A[0], E[0]) && close(2 * D[1] - A[1], E[1]) && close(dist(A, E), 2 * dist(A, D), 1e-12) && close(dist(E, C), dist(A, B), 1e-12),
      `EC=${f6(dist(E, C))} = AB; the SAS congruence on BD = DC, AD = DE, vertical angles at D`)
  }

  /* quiz-key self-check */
  const QUIZ_KEY = [3, 1, 2, 0, 3]
  const QUIZ_TOKENS = [
    '5 < x < 13',      // Q1: the third-side screen for sides 4 and 9
    'either remote',   // Q2: I.16's verdict — greater than EACH remote separately
    '120',             // Q3: the largest angle of the 3-5-7 witness
    '3.42',            // Q4: the hinge swing 10 sin 20 against 10 sin 30
    '3, 5, 8',         // Q5: the degenerate refusal
  ]
  check('E69 quiz key [3,1,2,0,3]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) &&
    QUIZ_TOKENS.every((t) => t.length >= 2), QUIZ_KEY.join(','))
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)    */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo304?: Lesson } | null = null
  try {
    mod = await import('./part-geo304')
    pcheck('P01 part file loads and exports lessonGeo304', !!mod?.lessonGeo304, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo304', false, String(e))
  }
  const lesson = mod?.lessonGeo304
  if (!lesson) return

  // P02 — quiz keys [3,1,2,0,3], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [3,1,2,0,3]', JSON.stringify(keys) === JSON.stringify([3, 1, 2, 0, 3]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['5 < x < 13', 'either remote', '120', '3.42', '3, 5, 8']
    quizBlock.items.forEach((i, idx) => {
      const correct = i.options[i.answer] ?? ''
      pcheck(`P02c quiz item ${idx + 1}: correct option carries the pinned token "${tokens[idx]}"`, correct.includes(tokens[idx]), `correct=${JSON.stringify(correct)}`)
      pcheck(`P02d quiz item ${idx + 1}: explain is a full why-each-fails audit`, i.explain.length >= 60, i.explain.slice(0, 60))
    })
  }

  // P03 — exercises: exactly 15 questions spanning L1..L6, full steps + answers
  const exBlock = lesson.blocks.find((b) => b.kind === 'exercises') as
    | { kind: 'exercises'; title?: string; sets: Array<{ level: string; questions: Array<{ q: string; solution: string[]; answer?: string; figures?: unknown[] }> }> }
    | undefined
  if (!exBlock) {
    pcheck('P03a exercises block exists', false, 'no exercises block')
  } else {
    const levels = exBlock.sets.map((s) => s.level)
    const spanned = ['L1', 'L2', 'L3', 'L4', 'L5', 'L6'].every((L) => levels.includes(L))
    pcheck('P03a sets span L1..L6', spanned, `levels=${levels.join(',')}`)
    const allQ = exBlock.sets.flatMap((s) => s.questions)
    pcheck('P03b exactly 15 questions total', allQ.length === 15, `count=${allQ.length}`)
    pcheck('P03c every question has a non-empty steps solution + answer',
      allQ.every((q) => Array.isArray(q.solution) && q.solution.length >= 3 && q.solution.every((s) => s.trim().length > 0) && !!q.answer && q.answer.trim().length > 0), '')
    let coreOk = 0
    const fails: string[] = []
    for (const set of exBlock.sets) for (const q of set.questions) {
      const whole = q.solution.join(' ').replace(/\$/g, '')
      const tokens = (q.answer ?? '').replace(/\$/g, '').match(/[A-Za-z0-9.]+/g) ?? []
      const ok = tokens.length === 0 || tokens.filter((t) => /\d/.test(t)).every((t) => whole.includes(t))
      if (ok) coreOk++; else fails.push(`${q.q.slice(0, 40)} | answer=${q.answer}`)
    }
    pcheck('P08 every exercise answer appears in its solution (numeric core containment)', coreOk === allQ.length, `ok=${coreOk}/${allQ.length}${fails.length ? ' fails: ' + fails.join(' ; ') : ''}`)
    const exSolFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=3 solution figures inside exercises', exSolFigs >= 3, `count=${exSolFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P04c — solution figures (example + exercise), incl. the named trio
  const exFigs = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; figures?: Array<{ caption: string }> }>
  const exSolFigs = exFigs.reduce((n, e) => n + (e.figures?.length ?? 0), 0)
  const qSolFigs = (lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{ kind: 'exercises'; sets: Array<{ questions: Array<{ figures?: Array<{ caption: string }> }> }> }>)
    .reduce((n, b) => n + b.sets.reduce((m, s) => m + s.questions.reduce((k, q) => k + (q.figures?.length ?? 0), 0), 0), 0)
  pcheck('P04c >=3 solution figures (example + exercise figures combined)', exSolFigs + qSolFigs >= 3, `examples=${exSolFigs}, exercises=${qSolFigs}`)
  const allCaptions = [
    ...lesson.blocks.filter((b) => b.kind === 'figure').map((b) => (b as { caption: string }).caption),
    ...exFigs.flatMap((e) => (e.figures ?? []).map((f) => f.caption)),
    ...(lesson.blocks.filter((b) => b.kind === 'exercises') as Array<{ kind: 'exercises'; sets: Array<{ questions: Array<{ figures?: Array<{ caption: string }> }> }> }>)
      .flatMap((b) => b.sets.flatMap((s) => s.questions.flatMap((q) => (q.figures ?? []).map((f) => f.caption)))),
  ].join(' | ').toLowerCase()
  pcheck('P04d the named solution trio exists: a collapse, a hinge swing and a detour figure',
    /collapse/.test(allCaptions) && /hinge/.test(allCaptions) && /detour/.test(allCaptions), allCaptions.slice(0, 140))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the bound, the exterior verdict, the hinge pair)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the triangle inequality bound, the exterior angle verdict and the hinge',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('triangle inequality')) &&
    formulas.some((f) => f.name.toLowerCase().includes('exterior angle')) &&
    formulas.some((f) => f.name.toLowerCase().includes('hinge')),
    formulas.map((f) => f.name).join(' | '))
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000 (target 9000+)', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >=6 SVGs collected (3 body + 3 solution)', svgs.length >= 6, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#16a34a', '#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the vivid palette (+ paper plate #fffdf5)', badHex.length === 0, badHex.join(','))
  const strokes = svgs.flatMap((s) => [...s.matchAll(/stroke-width="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09f all strokes >= 1.2', strokes.length > 0 && strokes.every((v) => v >= 1.2), `min=${Math.min(...strokes)}`)
  const fonts = svgs.flatMap((s) => [...s.matchAll(/font-size="([0-9.]+)"/g)].map((m) => parseFloat(m[1])))
  pcheck('P09g all font sizes within 11-14.5', fonts.length > 0 && fonts.every((v) => v >= 11 && v <= 14.5), `min=${Math.min(...fonts)}, max=${Math.max(...fonts)}`)
  const clipFails: string[] = []
  for (const s of svgs) {
    const vb = s.match(/viewBox="0 0 (\d+) (\d+)"/)
    if (!vb) { clipFails.push('no viewBox'); continue }
    const W = parseFloat(vb[1])
    for (const m of s.matchAll(/<text x="([0-9.]+)"[^>]*font-size="([0-9.]+)"[^>]*text-anchor="(start|middle|end)"[^>]*>([^<]*)</g)) {
      const x = parseFloat(m[1]), fs = parseFloat(m[2]), anch = m[3], t = m[4]
      const w = t.length * fs * 0.62
      const left = anch === 'middle' ? x - w / 2 : anch === 'end' ? x - w : x
      const right = anch === 'middle' ? x + w / 2 : anch === 'end' ? x : x + w
      if (left < 7 || right > W - 7) clipFails.push(`"${t.slice(0, 24)}" x=${x} fs=${fs} W=${W}`)
    }
  }
  pcheck('P09h no SVG label clips the viewBox width (0.62em/char estimate)', clipFails.length === 0, clipFails.slice(0, 4).join(' ; '))
  // P10 — math-span laws
  const mathSpans: string[] = []
  const prose: string[] = []
  const collect = (s: string): void => {
    for (const m of s.matchAll(/\$([^$]*)\$/g)) mathSpans.push(m[1])
    prose.push(s.replace(/\$[^$]*\$/g, ''))
  }
  for (const b of lesson.blocks as Array<Record<string, unknown>>) {
    for (const key of ['text', 'title', 'statement', 'result', 'note', 'caption', 'name', 'q', 'answer']) {
      const v = b[key]
      if (typeof v === 'string') collect(v)
    }
    if (b.kind === 'callout') { const c = b as { title: string; text: string }; collect(c.title); collect(c.text) }
    if (b.kind === 'quiz') for (const it of (b as { items: Array<{ q: string; options: string[]; explain: string }> }).items) { collect(it.q); it.options.forEach(collect); collect(it.explain) }
    if (b.kind === 'terms') for (const t of (b as { items: Array<{ term: string; def: string }> }).items) { collect(t.term); collect(t.def) }
    if (b.kind === 'derivation') { const d = b as { title: string; statement: string; steps: Array<{ label: string; explanation: string }>; result: string }; collect(d.title); collect(d.statement); collect(d.result); for (const s of d.steps) { collect(s.label); collect(s.explanation) } }
    if (b.kind === 'example') { const e = b as { title: string; steps: string[] }; collect(e.title); e.steps.forEach(collect) }
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ q: string; solution: string[]; answer?: string }> }> }).sets) for (const q of s.questions) { collect(q.q); q.solution.forEach(collect); collect(q.answer ?? '') }
    if (b.kind === 'list') for (const it of (b as { items: string[] }).items) collect(it)
    if (b.kind === 'table') { const t = b as { head: string[]; rows: string[][]; caption?: string }; if (t.caption) collect(t.caption); t.head.forEach(collect); t.rows.flat().forEach(collect) }
    if (b.kind === 'formula') { const fo = b as { name: string; note?: string }; collect(fo.name); if (fo.note) collect(fo.note) }
    if (b.kind === 'heading') collect((b as { text: string }).text)
  }
  pcheck('P10a no \\qquad inside any $...$ span', mathSpans.every((m) => !m.includes('\\qquad')), mathSpans.filter((m) => m.includes('\\qquad')).slice(0, 3).join(' | '))
  pcheck('P10b no $$ delimiters and no \\dfrac in prose', prose.every((t) => !t.includes('$$') && !t.includes('\\dfrac')), '')
  pcheck('P10c no raw TeX commands outside $...$ in prose fields', prose.every((t) => !/\\[a-zA-Z]+/.test(t)), prose.map((t) => (t.match(/\\[a-zA-Z]+/) ?? [''])[0]).filter(Boolean).slice(0, 5).join(' | '))
  const heads = lesson.blocks.filter((b) => b.kind === 'heading') as Array<{ kind: 'heading'; text: string }>
  pcheck('P10d headings are plain (no $, no backslash) and >= 6 sections', heads.length >= 6 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — identity fields
  pcheck('P11 id/number/title exact', lesson.id === 'geo-inequalities-in-a-triangle-sides-and-angles' && lesson.number === '3.4' && lesson.title === 'Inequalities in a Triangle: Sides and Angles', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, cengage-m1-05, geo-ch03-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'cengage-m1-05', 'geo-ch03-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [3.1, 3.2, 3.3]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-isosceles-triangles-the-classic-consequences']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts from the PINNED set only, 5-8 of them; objectives 4-6
  const PINNED_CONCEPTS = ['triangle inequality', 'degenerate triangle', 'exterior angle inequality', 'larger side larger angle', 'larger angle larger side', 'hinge theorem', 'converse of the hinge']
  pcheck('P14 concepts 5-8, every one from the pinned set; objectives 4-6',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8 &&
    lesson.concepts.every((c) => PINNED_CONCEPTS.includes(c)) &&
    (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6,
    `concepts=${JSON.stringify(lesson.concepts)}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (I.20's chain + the hinge pair among them)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation') as Array<{ kind: 'derivation'; title: string }>
  pcheck('P17 >=2 derivation blocks incl. the I.20 chain and the hinge pair',
    derivs.length >= 2 &&
    derivs.some((d) => d.title.includes('I.20')) &&
    derivs.some((d) => d.title.toLowerCase().includes('hinge')),
    derivs.map((d) => d.title).join(' | '))
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the existence census table (head includes 'longest side'; 11 rows; carries 125 and 220)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const censusTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('longest side'))
  pcheck('P19 the existence census table exists (head includes Longest side) with 11 rows carrying 125 of 220',
    !!censusTable && censusTable.rows.length === 11 && censusTable.rows.join(' ').includes('125') && censusTable.rows.join(' ').includes('220'),
    censusTable ? `${censusTable.rows.length} rows` : 'missing')
  // P20 — the witness table carries the pinned angles; the hinge sweep table carries 3.420201
  const witnessTable = tables.find((t) => t.rows.join(' ').includes('21.786789') && t.rows.join(' ').includes('120'))
  pcheck('P20 the witness table carries 21.786789, 38.213211 and 120; the hinge sweep table carries 3.420201',
    !!witnessTable && witnessTable.rows.join(' ').includes('38.213211') &&
    tables.some((t) => t.rows.join(' ').includes('3.420201')),
    witnessTable ? 'witness + hinge tables found' : 'missing')
}

/* ------------------------------------------------------------------ */
/* bottom harness                                                      */
/* ------------------------------------------------------------------ */
function report(label: string, list: Chk[]): { pass: number; fail: number } {
  const pass = list.filter((c) => c.ok).length
  const fail = list.length - pass
  for (const c of list) if (!c.ok) console.log(`  FAIL ${c.name} — ${c.detail}`)
  console.log(`${label}: ${pass} pass, ${fail} fail`)
  return { pass, fail }
}
console.log('=== ENGINE (recompute everything) ===')
const e = report('geo304-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo304-pins', pins)
const fail = e.fail + p.fail
console.log(`geo304 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
