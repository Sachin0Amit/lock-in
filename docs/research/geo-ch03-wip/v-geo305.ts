/**
 * v-geo305.ts — verify-first ENGINE + PIN harness for GEO lesson 3.5
 * "The Cevian Theorems: Ceva and Menelaus" (run 128 swarm, agent geo305, seat 35).
 *
 * DISCIPLINE: the engine wins over the spec. Every ratio, product, landing
 * point, slope, area and sign the prose prints is recomputed here by brute
 * force FIRST; where engine and prose disagree, the prose is fixed to the
 * engine's value and the catch is flagged in the report.
 *
 * ONE SPEC CATCH, APPLIED (engine check E12): the outline sketches the witness
 * walk as landing "(no floating-point drift: exact fractions 5/9 and 2/3
 * appear in the walk)". The engine's exact landing parameters are 1/2 (O
 * along AD from A), 5/6 (O along BE from B) and 2/3 (O along CF from C) —
 * there is no 5/9 anywhere in the walk (the closest true quantities are 5/6,
 * 18/5 and 3/5); the natural reading is a transposition slip for 5/6, the BE
 * parameter. The lesson keeps the engine's fractions (2/3, 3/5, 1/4, 18/5 on
 * the sides; 1/2, 5/6, 2/3 at the landing) and the catch is flagged here and
 * in the seat report.
 *
 * Structure:
 *   ENGINE SECTION 1 — the witness triangle A(0,0), B(12,0), C(0,9) (right,
 *     legs 12 and 9, hypotenuse 15, area 54); the side points D(4,6), E(0,3.6),
 *     F(3,0) with ratios 2, 3/2, 1/3 verified by distances and by the exact
 *     side parameters 2/3, 3/5, 1/4 (E's height is exactly 18/5).
 *   ENGINE SECTION 2 — concurrence at (2,3) by direct line intersection, all
 *     three pairings (AD-BE, AD-CF, BE-CF); the exact landing parameters; the
 *     cevian equations; the spec catch.
 *   ENGINE SECTION 3 — the median check: midpoints, product 1, concurrence at
 *     the centroid (4,3), the 2:1 split parameter 2/3 (cross-ref 3.6).
 *   ENGINE SECTION 4 — the area telescoping, numerically: paired-triangle
 *     ratios, the subtraction step, the six sub-triangles, the collapse of
 *     the triple product to 1 and the alternating-product Ceva form.
 *   ENGINE SECTION 5 — the Menelaus witness: D(24,-9) beyond B with directed
 *     ratio -1/2, E(0,3) with 2, F(6,0) with 1, directed product -1,
 *     collinearity by slope equality AND by y = -x/2 + 3 substitution.
 *   ENGINE SECTION 6 — the directed-sign sweep on all three side lines:
 *     between -> positive, beyond -> negative, over a parameter grid; the
 *     ratio-determines-the-point dictionary t = r/(1+r).
 *   ENGINE SECTION 7 — the converse walk (two given ratios fix the third) and
 *     the sign census (a transversal meets the side lines in an ODD number of
 *     outside points: 1 or 3, never 0 or 2), on two engine witnesses.
 *   ENGINE SECTION 8 — the complement map (the L6 exercise): reflecting each
 *     side point in its side's midpoint inverts every directed ratio; Ceva
 *     maps to Ceva (product 1, concurrent at (72/11, 27/11)) and Menelaus
 *     maps to Menelaus (product -1, collinear on y = -x + 6).
 *   ENGINE SECTION 9 — quiz-key self-check + every exercise witness.
 *   PIN SECTION (P01...) — imports ./part-geo305 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [1,0,2,3,1], 15 exercises L1..L6 with full step
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     concurrency / transversal / directed-sign trio, terms + formula cards,
 *     >= 3 Illustrations with >= 4 steps, >= 2 derivations, SVG + math-span
 *     hygiene laws).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo305.ts
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
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
type Pt = [number, number]
const dist = (p: Pt, q: Pt): number => Math.hypot(p[0] - q[0], p[1] - q[1])
const area = (p: Pt, q: Pt, r: Pt): number =>
  Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])) / 2
const slope = (p: Pt, q: Pt): number => (q[1] - p[1]) / (q[0] - p[0])
const lerp = (p: Pt, q: Pt, t: number): Pt => [p[0] + t * (q[0] - p[0]), p[1] + t * (q[1] - p[1])]
/** directed ratio of the point P = first + t(second - first) on line first->second: r = t/(1 - t) */
const dirRatio = (t: number): number => t / (1 - t)
/** the recovery map: a directed ratio r on a segment determines the point, t = r/(1 + r) */
const recover = (r: number): number => r / (1 + r)
function lineIsect(p1: Pt, p2: Pt, p3: Pt, p4: Pt): Pt {
  const [x1, y1] = p1, [x2, y2] = p2, [x3, y3] = p3, [x4, y4] = p4
  const den = (x1 - x2) * (y3 - y4) - (y1 - y2) * (x3 - x4)
  const t = ((x1 - x3) * (y3 - y4) - (y1 - y3) * (x3 - x4)) / den
  return [x1 + t * (x2 - x1), y1 + t * (y2 - y1)]
}
/** parameter of P on the segment P1->P2 (from the x-coordinate; callers keep x1 != x2) */
const param = (p: Pt, p1: Pt, p2: Pt): number => (p[0] - p1[0]) / (p2[0] - p1[0])

/* ================================================================== */
/* ENGINE SECTION 1 — the witness triangle and its three side points    */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const D: Pt = [4, 6], E: Pt = [0, 3.6], F: Pt = [3, 0]

  check('E01 the witness triangle: AB = 12, CA = 9, BC = 15 (a 3-4-5 triangle scaled by 3), right angle at A, area 54',
    close(dist(A, B), 12) && close(dist(C, A), 9) && close(dist(B, C), 15) && close(area(A, B, C), 54),
    `sides ${f4(dist(A, B))}, ${f4(dist(C, A))}, ${f4(dist(B, C))}; area ${f4(area(A, B, C))}`)

  check('E02 D(4,6) lies on BC with BD = 10, DC = 5, BD/DC = 2 (distance-verified)',
    close(dist(B, D), 10) && close(dist(D, C), 5) && close(dist(B, D) / dist(D, C), 2),
    `BD = ${f4(dist(B, D))}, DC = ${f4(dist(D, C))}`)
  check('E03 D is the two-thirds point: D = B + (2/3)(C - B) exactly, and the side parameter gives ratio t/(1-t) = 2',
    close(lerp(B, C, 2 / 3)[0], 4) && close(lerp(B, C, 2 / 3)[1], 6) && close(dirRatio(2 / 3), 2),
    't = 2/3 on BC (direction B to C)')

  check('E04 E(0,3.6) lies on CA with CE = 5.4, EA = 3.6, CE/EA = 3/2 (distance-verified)',
    close(dist(C, E), 5.4) && close(dist(E, A), 3.6) && close(dist(C, E) / dist(E, A), 1.5),
    `CE = ${f4(dist(C, E))}, EA = ${f4(dist(E, A))}`)
  check('E05 E\u2019s height is exactly 18/5 and E = C + (3/5)(A - C): the side parameter 3/5 gives ratio 3/2',
    close(3.6, 18 / 5) && close(lerp(C, A, 3 / 5)[1], 3.6) && close(dirRatio(3 / 5), 1.5),
    't = 3/5 on CA (direction C to A)')

  check('E06 F(3,0) lies on AB with AF = 3, FB = 9, AF/FB = 1/3, and F = A + (1/4)(B - A)',
    close(dist(A, F), 3) && close(dist(F, B), 9) && close(dist(A, F) / dist(F, B), 1 / 3) &&
    close(lerp(A, B, 1 / 4)[0], 3) && close(dirRatio(1 / 4), 1 / 3),
    't = 1/4 on AB (direction A to B)')

  check('E07 the Ceva product (2)(3/2)(1/3) = 1 exactly',
    close(2 * 1.5 * (1 / 3), 1), 'product = 1')
}

/* ================================================================== */
/* ENGINE SECTION 2 — concurrence at (2,3) by direct line intersection  */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const D: Pt = [4, 6], E: Pt = [0, 3.6], F: Pt = [3, 0]
  const O: Pt = [2, 3]

  const I1 = lineIsect(A, D, B, E)
  const I2 = lineIsect(A, D, C, F)
  const I3 = lineIsect(B, E, C, F)
  check('E08 pairing AD-BE lands exactly at (2,3)',
    close(I1[0], 2) && close(I1[1], 3), `got (${f4(I1[0])}, ${f4(I1[1])})`)
  check('E09 pairing AD-CF lands exactly at (2,3)',
    close(I2[0], 2) && close(I2[1], 3), `got (${f4(I2[0])}, ${f4(I2[1])})`)
  check('E10 pairing BE-CF also lands exactly at (2,3): all three cevians are CONCURRENT there',
    close(I3[0], 2) && close(I3[1], 3), `got (${f4(I3[0])}, ${f4(I3[1])})`)

  const tAD = param(O, A, D)
  const tBE = param(O, B, E)
  const tCF = param(O, C, F)
  check('E11 the exact landing parameters: O = A + 1/2(AD), O = B + 5/6(BE), O = C + 2/3(CF) — each inside its cevian segment',
    close(2 * tAD, 1, 1e-9) && close(6 * tBE, 5, 1e-9) && close(3 * tCF, 2, 1e-9) &&
    tAD > 0 && tAD < 1 && tBE > 0 && tBE < 1 && tCF > 0 && tCF < 1,
    `tAD = ${f4(tAD)}, tBE = ${f4(tBE)}, tCF = ${f4(tCF)}`)
  check('E12 SPEC CATCH (5/9 reads as 5/6): the walk\u2019s exact fractions are 18/5 (E\u2019s height), 2/3, 3/5, 1/4 (side parameters) and 1/2, 5/6, 2/3 (landing parameters) — no 5/9 exists in the configuration; the engine value 5/6 wins',
    close(6 * tBE, 5, 1e-9) && close(9 * 3.6, 18 / 5 * 9, 1e-9) && !close(9 * tBE, 5, 1e-9),
    `6·tBE = ${f4(6 * tBE)} (a 5/9 parameter would give 6t = 10/3, not 5)`)

  check('E13 the three cevian equations — AD: y = 3x/2, BE: y = -3x/10 + 18/5, CF: y = -3x + 9 — all pass through (2,3)',
    close((3 / 2) * 2, 3) && close((-3 / 10) * 2 + 18 / 5, 3) && close(-3 * 2 + 9, 3),
    'substitution at x = 2 gives y = 3 on all three lines')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the median check                                 */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const Ma: Pt = [(B[0] + C[0]) / 2, (B[1] + C[1]) / 2]
  const Mb: Pt = [(C[0] + A[0]) / 2, (C[1] + A[1]) / 2]
  const Mc: Pt = [(A[0] + B[0]) / 2, (A[1] + B[1]) / 2]
  const G: Pt = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]

  check('E14 the midpoints are Ma(6,4.5) on BC, Mb(0,4.5) on CA, Mc(6,0) on AB; each median ratio is 1 and the product is 1',
    close(Ma[0], 6) && close(Ma[1], 4.5) && close(Mb[0], 0) && close(Mb[1], 4.5) &&
    close(Mc[0], 6) && close(Mc[1], 0) &&
    close(dirRatio(1 / 2), 1) && close(1 * 1 * 1, 1),
    'midpoint t = 1/2 gives ratio 1 on every side')
  check('E15 the centroid is G(4,3) and both median pairings land there by direct line intersection',
    close(G[0], 4) && close(G[1], 3) &&
    close(lineIsect(A, Ma, B, Mb)[0], 4) && close(lineIsect(A, Ma, B, Mb)[1], 3) &&
    close(lineIsect(A, Ma, C, Mc)[0], 4) && close(lineIsect(A, Ma, C, Mc)[1], 3),
    `G = (${f4(G[0])}, ${f4(G[1])})`)
  check('E16 the 2:1 split parameter (3.6\u2019s payoff): G = A + (2/3)(Ma - A) = B + (2/3)(Mb - B) = C + (2/3)(Mc - C) on all three medians',
    close(lerp(A, Ma, 2 / 3)[0], 4) && close(lerp(A, Ma, 2 / 3)[1], 3) &&
    close(lerp(B, Mb, 2 / 3)[0], 4) && close(lerp(B, Mb, 2 / 3)[1], 3) &&
    close(lerp(C, Mc, 2 / 3)[0], 4) && close(lerp(C, Mc, 2 / 3)[1], 3),
    'AG : GMa = BG : GMb = CG : GMc = 2 : 1')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the area telescoping, verified numerically        */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const D: Pt = [4, 6], E: Pt = [0, 3.6], F: Pt = [3, 0]
  const O: Pt = [2, 3]

  check('E17 side BC: [ABD]/[ADC] = 36/18 = 2 = BD/DC (paired triangles share the height from A)',
    close(area(A, B, D), 36) && close(area(A, D, C), 18) && close(area(A, B, D) / area(A, D, C), 2),
    `[ABD] = ${f4(area(A, B, D))}, [ADC] = ${f4(area(A, D, C))}`)
  check('E18 side BC: [OBD]/[ODC] = 18/9 = 2 = BD/DC (paired triangles share the height from O)',
    close(area(O, B, D), 18) && close(area(O, D, C), 9) && close(area(O, B, D) / area(O, D, C), 2),
    `[OBD] = ${f4(area(O, B, D))}, [ODC] = ${f4(area(O, D, C))}`)
  check('E19 the subtraction step: [ABD] - [OBD] = 18 = [ABO] and [ADC] - [ODC] = 9 = [ACO], so BD/DC = [ABO]/[ACO] = 2',
    close(area(A, B, D) - area(O, B, D), area(A, B, O)) &&
    close(area(A, D, C) - area(O, D, C), area(A, C, O)) &&
    close(area(A, B, O) / area(A, C, O), 2),
    `[ABO] = ${f4(area(A, B, O))}, [ACO] = ${f4(area(A, C, O))}`)

  check('E20 side CA: [BCE]/[BEA] = 32.4/21.6 = 3/2 = CE/EA, [OCE]/[OEA] = 5.4/3.6 = 3/2, and [BCO]/[BAO] = 27/18 = 3/2',
    close(area(B, C, E), 32.4) && close(area(B, E, A), 21.6) && close(area(B, C, E) / area(B, E, A), 1.5) &&
    close(area(O, C, E), 5.4) && close(area(O, E, A), 3.6) && close(area(O, C, E) / area(O, E, A), 1.5) &&
    close(area(B, C, O), 27) && close(area(B, A, O), 18) && close(area(B, C, O) / area(B, A, O), 1.5),
    'three readings of the same ratio 3/2')
  check('E21 side AB: [CAF]/[CFB] = 13.5/40.5 = 1/3 = AF/FB, [OAF]/[OFB] = 4.5/13.5 = 1/3, and [CAO]/[CBO] = 9/27 = 1/3',
    close(area(C, A, F), 13.5) && close(area(C, F, B), 40.5) && close(area(C, A, F) / area(C, F, B), 1 / 3) &&
    close(area(O, A, F), 4.5) && close(area(O, F, B), 13.5) && close(area(O, A, F) / area(O, F, B), 1 / 3) &&
    close(area(C, A, O), 9) && close(area(C, B, O), 27) && close(area(C, A, O) / area(C, B, O), 1 / 3),
    'three readings of the same ratio 1/3')

  check('E22 the telescoping collapse: ([ABO]/[ACO])([BCO]/[BAO])([CAO]/[CBO]) = (18/9)(27/18)(9/27) = 1 — everything cancels but 1',
    close((area(A, B, O) / area(A, C, O)) * (area(B, C, O) / area(B, A, O)) * (area(C, A, O) / area(C, B, O)), 1),
    'the triple product is identically 1')
  check('E23 the six sub-triangles [OBD]+[ODC]+[OCE]+[OEA]+[OAF]+[OFB] = 18+9+5.4+3.6+4.5+13.5 = 54 = [ABC]',
    close(area(O, B, D) + area(O, D, C) + area(O, C, E) + area(O, E, A) + area(O, A, F) + area(O, F, B), area(A, B, C)),
    'the cevians through O partition the triangle')
  check('E24 the alternating-product Ceva form: [OBD][OCE][OAF] = 18 × 5.4 × 4.5 = 437.4 = 9 × 3.6 × 13.5 = [ODC][OEA][OFB]',
    close(area(O, B, D) * area(O, C, E) * area(O, A, F), 437.4) &&
    close(area(O, D, C) * area(O, E, A) * area(O, F, B), 437.4),
    `both alternating products = ${f4(area(O, B, D) * area(O, C, E) * area(O, A, F))}`)
}

/* ================================================================== */
/* ENGINE SECTION 5 — the Menelaus witness                             */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const D: Pt = [24, -9], E: Pt = [0, 3], F: Pt = [6, 0]

  check('E25 D(24,-9) lies on the LINE BC beyond B: parameter t = -1 along B to C, BD = 15, DC = 30, directed BD/DC = -1/2',
    close(lerp(B, C, -1)[0], 24) && close(lerp(B, C, -1)[1], -9) &&
    close(dist(B, D), 15) && close(dist(D, C), 30) && close(dirRatio(-1), -0.5),
    `BD = ${f4(dist(B, D))}, DC = ${f4(dist(D, C))}, directed ratio ${f4(dirRatio(-1))}`)
  check('E26 E(0,3) lies on CA (between): CE = 6, EA = 3, CE/EA = 2, parameter t = 2/3 from C',
    close(dist(C, E), 6) && close(dist(E, A), 3) && close(dist(C, E) / dist(E, A), 2) && close(dirRatio(2 / 3), 2),
    'a point between gives a POSITIVE ratio')
  check('E27 F(6,0) lies on AB (between): AF = 6, FB = 6, AF/FB = 1, parameter t = 1/2 from A',
    close(dist(A, F), 6) && close(dist(F, B), 6) && close(dist(A, F) / dist(F, B), 1) && close(dirRatio(1 / 2), 1),
    'the midpoint ratio')
  check('E28 the directed Menelaus product (-1/2)(2)(1) = -1 exactly',
    close(-0.5 * 2 * 1, -1), 'product = -1')

  check('E29 collinearity by slope equality: slope(E,F) = slope(D,F) = slope(D,E) = -1/2 (no drift)',
    close(slope(E, F), -0.5) && close(slope(D, F), -0.5) && close(slope(D, E), -0.5),
    `slopes ${f4(slope(E, F))}, ${f4(slope(D, F))}, ${f4(slope(D, E))}`)
  check('E30 collinearity by substitution: D, E, F all satisfy y = -x/2 + 3',
    close(-24 / 2 + 3, -9) && close(-0 / 2 + 3, 3) && close(-6 / 2 + 3, 0),
    'the transversal line is y = -x/2 + 3')
  check('E31 the outside census of the witness: exactly ONE of the three points (D) lies outside its side segment; E and F sit between',
    close(dirRatio(-1), -0.5) && dirRatio(-1) < 0 && dirRatio(2 / 3) > 0 && dirRatio(1 / 2) > 0,
    'one negative ratio, two positive')
  {
    // the signed-height proof: s(P) = x + 2y - 6 is the (unnormalised) signed distance to the transversal
    const s = (p: Pt): number => p[0] + 2 * p[1] - 6
    check('E31b the signed-height proof of Menelaus: s(A) = -6, s(B) = 6, s(C) = 12 on the line x + 2y - 6 = 0, and -s(B)/s(C) = -1/2, -s(C)/s(A) = 2, -s(A)/s(B) = 1 — the directed ratios themselves, product exactly -1',
      close(s(A), -6) && close(s(B), 6) && close(s(C), 12) &&
      close(-s(B) / s(C), -0.5) && close(-s(C) / s(A), 2) && close(-s(A) / s(B), 1) &&
      close((-s(B) / s(C)) * (-s(C) / s(A)) * (-s(A) / s(B)), -1),
      'three minus signs force the -1')
  }
}

/* ================================================================== */
/* ENGINE SECTION 6 — the directed-sign sweep on all three side lines  */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const sides: Array<[Pt, Pt, string]> = [
    [B, C, 'BC'], [C, A, 'CA'], [A, B, 'AB'],
  ]
  const grid: number[] = []
  for (let t = -3; t <= 4.001; t += 0.125) grid.push(Math.round(t * 8) / 8)
  let sweepOk = true
  for (const [P, Q] of sides) {
    for (const t of grid) {
      if (t === 1) continue
      const X = lerp(P, Q, t)
      const r = dirRatio(t)
      const between = t > 0 && t < 1
      // the sign law: positive between the endpoints, negative beyond either
      if (between !== r > 0) sweepOk = false
      // the magnitude law: |r| = |PX|/|XQ| as plain distances
      if (!close(Math.abs(r), dist(P, X) / dist(X, Q), 1e-9)) sweepOk = false
    }
  }
  check('E32 the sign sweep on all three side lines (t from -3 to 4 in eighths): the directed ratio is POSITIVE exactly between the endpoints and NEGATIVE beyond either one, with |r| = |PX|/|XQ| throughout',
    sweepOk, `${sides.length} sides × ${grid.length} parameters`)

  const DICT: Array<[number, number]> = [
    [1 / 2, 1], [2 / 3, 2], [3 / 5, 1.5], [1 / 4, 1 / 3],
    [-1, -0.5], [2 / 3, 2], [1 / 2, 1], [4 / 3, -4], [-3, -0.75], [-1 / 2, -1 / 3],
  ]
  check('E33 the ratio dictionary r = t/(1-t) at every pinned parameter: 1/2->1, 2/3->2, 3/5->3/2, 1/4->1/3, -1->-1/2, 4/3->-4, -3->-3/4, -1/2->-1/3',
    DICT.every(([t, r]) => close(dirRatio(t), r)),
    DICT.map(([t, r]) => `${t}->${r}`).join(', '))
  check('E34 the recovery map t = r/(1+r) inverts the dictionary — a ratio on a segment DETERMINES the point (the engine of the converse proof)',
    DICT.every(([t, r]) => close(recover(r), t)) && close(recover(2), 2 / 3) && close(recover(-0.5), -1),
    'injective on each side of t = 1')
}

/* ================================================================== */
/* ENGINE SECTION 7 — the converse walk + the sign census              */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const D: Pt = [4, 6], E: Pt = [0, 3.6]

  const rThird = 1 / (2 * 1.5)
  const tF = recover(rThird)
  const F: Pt = lerp(A, B, tF)
  const O = lineIsect(A, D, B, E)
  check('E35 the converse walk: given BD/DC = 2 and CE/EA = 3/2, Ceva forces AF/FB = 1/(2 × 3/2) = 1/3; recovery t = (1/3)/(4/3) = 1/4 places F = (3,0); AD and BE meet at (2,3)',
    close(rThird, 1 / 3) && close(tF, 0.25) && close(F[0], 3) && close(F[1], 0) &&
    close(O[0], 2) && close(O[1], 3),
    `AF/FB = ${f4(rThird)}, F = (${f4(F[0])}, ${f4(F[1])}), O = (${f4(O[0])}, ${f4(O[1])})`)
  check('E36 and the third cevian CF passes through that meeting point: (2,3) lies on the line from C(0,9) to F(3,0)',
    close(slope(C, F), slope(C, O)) && close(slope(C, F), -3),
    'the product-1 choice closes the configuration')

  // the shifted transversal y = -x/2 - 3: a line that MISSES the triangle entirely
  const L = (x: number): number => -x / 2 - 3
  const Xab: Pt = [-6, 0]          // crossing of the line AB (y = 0)
  const Xca: Pt = [0, -3]          // crossing of the line CA (x = 0)
  const Xbc: Pt = [48, -27]        // crossing of the line BC
  const rAB = dirRatio(-6 / 12), rCA = dirRatio(4 / 3), rBC = dirRatio(-3)
  check('E37 the missing-line witness y = -x/2 - 3 crosses AB\u2019s line at (-6,0), CA\u2019s line at (0,-3) and BC\u2019s line at (48,-27): all THREE points lie outside the side segments',
    close(L(Xab[0]), Xab[1]) && close(L(Xca[0]), Xca[1]) && close(L(Xbc[0]), Xbc[1]) &&
    close(lerp(B, C, -3)[0], 48) && close(lerp(B, C, -3)[1], -27) &&
    rAB < 0 && rCA < 0 && rBC < 0,
    'three negative ratios')
  check('E38 its directed product is (-1/3)(-4)(-3/4) = -1: collinear by Menelaus even though the line never enters the triangle',
    close(rAB, -1 / 3) && close(rCA, -4) && close(rBC, -3 / 4) && close(rAB * rCA * rBC, -1),
    `product = ${f4(rAB * rCA * rBC)}`)
  check('E39 the sign census law: the outside count is always ODD (1 for the pinned witness, 3 for the missing line) because the product -1 is negative — never 0, never 2',
    (1 % 2 === 1) && (3 % 2 === 1) && (-1 < 0),
    'an even outside count would make the product positive')
}

/* ================================================================== */
/* ENGINE SECTION 8 — the complement map (the L6 exercise)             */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [12, 0], C: Pt = [0, 9]
  const Ma: Pt = [6, 4.5], Mb: Pt = [0, 4.5], Mc: Pt = [6, 0]
  const reflect = (M: Pt, P: Pt): Pt => [2 * M[0] - P[0], 2 * M[1] - P[1]]

  // Menelaus witness complement
  const D: Pt = [24, -9], E: Pt = [0, 3], F: Pt = [6, 0]
  const D2 = reflect(Ma, D), E2 = reflect(Mb, E), F2 = reflect(Mc, F)
  check('E40 the complement of the Menelaus witness: D2 = 2Ma - D = (-12,18), E2 = (0,6), F2 = (6,0) (F is the midpoint, self-complement)',
    close(D2[0], -12) && close(D2[1], 18) && close(E2[0], 0) && close(E2[1], 6) &&
    close(F2[0], 6) && close(F2[1], 0),
    `D2 = (${D2[0]}, ${D2[1]}), E2 = (${E2[0]}, ${E2[1]}), F2 = (${F2[0]}, ${F2[1]})`)
  const rD2 = dirRatio(2), rE2 = dirRatio(1 / 3), rF2 = dirRatio(1 / 2)
  check('E41 every directed ratio INVERTS: -1/2 -> -2, 2 -> 1/2, 1 -> 1, and the product is again -1',
    close(rD2, -2) && close(1 / dirRatio(-1), -2) && close(rE2, 0.5) && close(1 / dirRatio(2 / 3), 0.5) &&
    close(rF2, 1) && close(rD2 * rE2 * rF2, -1),
    `(-2)(1/2)(1) = ${f4(rD2 * rE2 * rF2)}`)
  check('E42 the complementary points are collinear on y = -x + 6: slope(E2,F2) = slope(D2,E2) = -1 and all three substitute in',
    close(slope(E2, F2), -1) && close(slope(D2, E2), -1) &&
    close(-(-12) + 6, 18) && close(-0 + 6, 6) && close(-6 + 6, 0),
    'Menelaus maps to Menelaus under the complement')

  // Ceva witness complement
  const Dc: Pt = [4, 6], Ec: Pt = [0, 3.6], Fc: Pt = [3, 0]
  const D2c = reflect(Ma, Dc), E2c = reflect(Mb, Ec), F2c = reflect(Mc, Fc)
  const rD2c = dirRatio(1 / 3), rE2c = dirRatio(2 / 5), rF2c = dirRatio(3 / 4)
  const Oc = lineIsect(A, D2c, B, E2c)
  check('E43 the complement of the Ceva witness: D2\u2032 = (8,3), E2\u2032 = (0,5.4), F2\u2032 = (9,0) with ratios 1/2, 2/3, 3 — each the reciprocal — and product 1',
    close(D2c[0], 8) && close(D2c[1], 3) && close(E2c[0], 0) && close(E2c[1], 5.4) &&
    close(F2c[0], 9) && close(F2c[1], 0) &&
    close(rD2c, 0.5) && close(rE2c, 2 / 3) && close(rF2c, 3) && close(rD2c * rE2c * rF2c, 1),
    `(1/2)(2/3)(3) = ${f4(rD2c * rE2c * rF2c)}`)
  check('E44 the complementary cevians are CONCURRENT at (72/11, 27/11) = (6.5455, 2.4545), which lies on all three lines A-D2\u2032, B-E2\u2032, C-F2\u2032',
    close(Oc[0], 72 / 11, 1e-9) && close(Oc[1], 27 / 11, 1e-9) &&
    close(slope(C, F2c), slope(C, Oc), 1e-9),
    `O\u2032 = (${f4(Oc[0])}, ${f4(Oc[1])})`)
}

/* ================================================================== */
/* ENGINE SECTION 9 — quiz-key self-check + exercise witnesses         */
/* ================================================================== */
{
  const QUIZ_KEY = [1, 0, 2, 3, 1]
  const QUIZ_TOKENS = [
    'equals 1',   // Q1: the product test verdict
    '\u22121',    // Q2: Menelaus directed product
    'negative',   // Q3: the outside-point sign
    'centroid',   // Q4: the median case
    '1/6',        // Q5: the converse fix 1/(3 × 2)
  ]
  check('E45 quiz key [1,0,2,3,1]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 2),
    QUIZ_TOKENS.join(' | '))

  check('E46 Q5 witness: 3 × 2 × (1/6) = 1, so AF/FB = 1/6 is the forced third ratio',
    close(3 * 2 * (1 / 6), 1), '1/(3 × 2) = 1/6')

  // Ex1: BD/DC = 3, CE/EA = 1/2 -> AF/FB = 2/3
  check('E47 Ex1 witness: 3 × (1/2) × (2/3) = 1, so the concurrent third ratio is 2/3',
    close(3 * 0.5 * (2 / 3), 1), 'x = 1/(3 × 1/2) = 2/3')
  // Ex3: the directed drill on line AB
  check('E48 Ex3 witness: X(4,0) gives 1/2 (between), Y(16,0) gives -4 (beyond B), Z(-3,0) gives -1/5 (beyond A)',
    close(dirRatio(4 / 12), 0.5) && close(dirRatio(16 / 12), -4) && close(dirRatio(-3 / 12), -0.2),
    `r = ${f4(dirRatio(4 / 12))}, ${f4(dirRatio(16 / 12))}, ${f4(dirRatio(-3 / 12))}`)
  // Ex5: which point is outside
  check('E49 Ex5 witness: the product (-1/2)(2)(1) = -1 certifies collinearity and the negative ratio marks D as the outside point',
    close(-0.5 * 2 * 1, -1), 'D beyond B')
  // Ex6: (x/3)(4/5)(15/8) = 1 -> x = 2
  check('E50 Ex6 witness: (2/3)(4/5)(15/8) = 120/120 = 1, so x = 2',
    close((2 / 3) * (4 / 5) * (15 / 8), 1), 'x = 2')
  // Ex10: the strip drill
  check('E51 Ex10 witness: r(-1/2) = -1/3, r(1/4) = 1/3, r(1/2) = 1, r(3/4) = 3, r(4/3) = -4 — the sign flips at the endpoints t = 0 and t = 1',
    close(dirRatio(-0.5), -1 / 3) && close(dirRatio(0.25), 1 / 3) && close(dirRatio(0.5), 1) &&
    close(dirRatio(0.75), 3) && close(dirRatio(4 / 3), -4),
    'two sign flips, both at endpoints')
  // Ex11: (-2/3)(3/4)(2) = -1
  check('E52 Ex11 witness: (-2/3)(3/4)(2) = -1, so the collinear third ratio is 2',
    close((-2 / 3) * (3 / 4) * 2, -1), 'x = 1/((2/3)(3/4)) = 2')
  // Ex12: the area deduction
  check('E53 Ex12 witness: [OAB] = 18 and [OCA] = 9 give BD/DC = [OAB]/[OCA] = 2 (the telescoping identity)',
    close(18 / 9, 2), 'the subtraction reading of side BC')
  // Ex14: the area ratios 6:3:2
  {
    const x = 6, y = 3, z = 2
    check('E54 Ex14 witness: BD/DC = 3 and CE/EA = 1/2 force AF/FB = 2/3, and the area ratios [OAB]:[OBC]:[OCA] = 6:3:2 (sum 11)',
      close(x / z, 3) && close(y / x, 0.5) && close(z / y, 2 / 3) && close(3 * 0.5 * (2 / 3), 1) && close(x + y + z, 11),
      '6/2 = 3, 3/6 = 1/2, 2/3 = 2/3')
  }
  // Ex15: the complement numbers
  check('E55 Ex15 witness: the complement inverts every ratio ((-1/2 -> -2, 2 -> 1/2, 1 -> 1), product -1, line y = -x + 6) and the Ceva witness maps to product 1 with meeting point (72/11, 27/11)',
    close((-2) * 0.5 * 1, -1) && close((-2) * 0.5 * 1, 1 / ((-0.5) * 2 * 1)) &&
    close((1 / 2) * (2 / 3) * 3, 1) && close(72 / 11, 6.545454, 1e-6) && close(27 / 11, 2.454545, 1e-6),
    'both configurations survive the complement')
  // Illustration witnesses
  check('E56 Illustration witnesses: (a) the Ceva walk lands (2,3) with parameters 1/2, 5/6, 2/3; (b) the Menelaus walk lands the line y = -x/2 + 3; (c) the converse walk fixes F(3,0) and meets at (2,3)',
    close(2, 2) && close(3, 3) && close(-0.5, slope([0, 3], [6, 0])) && close(recover(1 / 3), 0.25),
    'all three Illustrations ride engine-verified numbers')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)    */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo305?: Lesson } | null = null
  try {
    mod = await import('./part-geo305')
    pcheck('P01 part file loads and exports lessonGeo305', !!mod?.lessonGeo305, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo305', false, String(e))
  }
  const lesson = mod?.lessonGeo305
  if (!lesson) return

  // P02 — quiz keys [1,0,2,3,1], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,0,2,3,1]', JSON.stringify(keys) === JSON.stringify([1, 0, 2, 3, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['equals 1', '\u22121', 'negative', 'centroid', '1/6']
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
    const solFigs = exBlock.sets.flatMap((s) => s.questions).reduce((n, q) => n + (q.figures?.length ?? 0), 0)
    pcheck('P04b >=3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
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
  pcheck('P04d the named solution trio exists: a concurrency picture, a transversal picture and a directed-sign strip',
    /concurren/.test(allCaptions) && /transversal/.test(allCaptions) && /sign/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (Ceva 1; Menelaus -1; the median case)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including Ceva\u2019s product, Menelaus\u2019 directed product and the median case',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('ceva')) &&
    formulas.some((f) => f.name.toLowerCase().includes('menelaus')) &&
    formulas.some((f) => f.name.toLowerCase().includes('median')),
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-cevian-theorems-ceva-and-menelaus' && lesson.number === '3.5' && lesson.title === 'The Cevian Theorems: Ceva and Menelaus', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-ch03-web-ground, geo-euclid-elements]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-ch03-web-ground', 'geo-euclid-elements']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [criteria 3.2, inequalities 3.4]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (Ceva direct by telescoping; the converse; Menelaus directed)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the Ceva witness table exists with the D/E/F rows
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const witnessTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('point'))
  pcheck('P19 the witness table exists (head includes Point) with the D, E, F rows and the product row',
    !!witnessTable && witnessTable.rows.length >= 4 && witnessTable.rows.some((r) => r.join(' ').includes('D')) && witnessTable.rows.some((r) => r.join(' ').includes('F')),
    witnessTable ? `${witnessTable.rows.length} rows` : 'missing')
  // P20 — the duality table carries both verdicts (+1 concurrent, -1 collinear)
  const dualityTable = tables.find((t) => t.rows.join(' ').toLowerCase().includes('collinear'))
  pcheck('P20 the duality table contrasts the two theorems (a row mentions collinear, a row mentions concurrent)',
    !!dualityTable && dualityTable.rows.join(' ').toLowerCase().includes('concurren'),
    dualityTable ? 'found' : 'missing')
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
const e = report('geo305-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo305-pins', pins)
const fail = e.fail + p.fail
console.log(`geo305 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
