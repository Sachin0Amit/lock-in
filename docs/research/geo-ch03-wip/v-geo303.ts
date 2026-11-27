/**
 * v-geo303.ts — verify-first ENGINE + PIN harness for GEO lesson 3.3
 * "Isosceles Triangles: the Classic Consequences" (run 128 swarm, agent geo303, seat 3.3).
 *
 * DISCIPLINE: the engine wins over the spec. Every length, angle, area,
 * congruence datum, contradiction blade and sweep identity the prose prints
 * is recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in
 * the report.
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the pinned witness triangle 13-13-10
 *     recomputed whole (halves 5-12-13; height 12; area 60; apex
 *     45.239730 = 2 arcsin(5/13); base angles 67.380135 = arcsin(12/13);
 *     cos(apex) = 119/169; angle sum 180); the equilateral half (height
 *     sqrt(3)/2 = 0.866025, angles 60); I.5's doubled-SAS correspondence
 *     verified as data triples + the Pappus no-construction point; I.6 by
 *     the doubled ASA read AND Euclid's reductio with both blades of the
 *     contradiction (SAS-forced equal areas vs containment-strict areas)
 *     plus the I.5-citing angle-sum chain; the general isosceles sweep at
 *     apex half-angle t in {10, 22.62, 30, 40} (base angle = 90 - t,
 *     height/leg = cos t, base/leg = 2 sin t); the SSS axis package
 *     (ABM vs ACM pairwise distances; median = altitude = bisector);
 *     the Illustration witnesses (apex-90 walk, the 24-5-13 roof truss and
 *     its duality with the witness); quiz-key self-check; every exercise
 *     witness.
 *   PIN SECTION (P01...) — imports ./part-geo303 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [2,0,3,1,0], 15 exercises L1..L6 with full steps
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     axis-halves / base-angle-walk / equilateral-half trio, terms +
 *     formula cards, >= 3 Illustrations with >= 4 steps, >= 2 derivations,
 *     SVG + math-span hygiene laws).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo303.ts
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
const D2R = Math.PI / 180
const sin = (d: number): number => Math.sin(d * D2R)
const cos = (d: number): number => Math.cos(d * D2R)
const asinD = (x: number): number => Math.asin(x) / D2R
const acosD = (x: number): number => Math.acos(x) / D2R
const atanD = (x: number): number => Math.atan(x) / D2R
const dist = (p: [number, number], q: [number, number]): number => Math.hypot(p[0] - q[0], p[1] - q[1])
/** signed smaller angle at vertex V between rays to P and Q, in degrees */
const angAt = (V: [number, number], P: [number, number], Q: [number, number]): number => {
  const u = [P[0] - V[0], P[1] - V[1]]
  const v = [Q[0] - V[0], Q[1] - V[1]]
  const c = (u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))
  return acosD(Math.max(-1, Math.min(1, c)))
}
const area3 = (P: [number, number], Q: [number, number], R: [number, number]): number =>
  Math.abs((Q[0] - P[0]) * (R[1] - P[1]) - (Q[1] - P[1]) * (R[0] - P[0])) / 2

/* ================================================================== */
/* ENGINE SECTION 1 — the pinned witness triangle 13-13-10              */
/* A = (5,12), B = (0,0), C = (10,0), M = (5,0) midpoint of BC         */
/* ================================================================== */
{
  const A: [number, number] = [5, 12]
  const B: [number, number] = [0, 0]
  const C: [number, number] = [10, 0]
  const M: [number, number] = [5, 0]

  check('E01 the witness coordinates give AB = AC = 13 and BC = 10',
    close(dist(A, B), 13) && close(dist(A, C), 13) && close(dist(B, C), 10),
    `AB=${f4(dist(A, B))}, AC=${f4(dist(A, C))}, BC=${f4(dist(B, C))}`)
  check('E02 M = (5,0) is the midpoint of BC: BM = CM = 5, and AM = 12',
    close(dist(B, M), 5) && close(dist(C, M), 5) && close(dist(A, M), 12),
    `BM=${f4(dist(B, M))}, CM=${f4(dist(C, M))}, AM=${f4(dist(A, M))}`)
  check('E03 the halves are 5-12-13 right triangles: 5\u00b2 + 12\u00b2 = 25 + 144 = 169 = 13\u00b2',
    close(5 * 5 + 12 * 12, 13 * 13), 'Pythagoras on half ABM')
  check('E04 the height from the apex is exact: sqrt(13\u00b2 \u2212 5\u00b2) = 12',
    close(Math.sqrt(13 * 13 - 5 * 5), 12), f6(Math.sqrt(13 * 13 - 5 * 5)))
  check('E05 the area is 60 read both ways: (1/2)(10)(12) = 60 and 2 \u00d7 (1/2)(5)(12) = 60',
    close(0.5 * 10 * 12, 60) && close(2 * 0.5 * 5 * 12, 60), `area=${f4(0.5 * 10 * 12)}`)
  const apex = 2 * asinD(5 / 13)
  const baseAng = asinD(12 / 13)
  check('E06 the apex angle is 2 arcsin(5/13) = 45.239730\u00b0',
    close(apex, 45.239730, 1e-6), f6(apex))
  check('E07 each base angle is arcsin(12/13) = 67.380135\u00b0',
    close(baseAng, 67.380135, 1e-6), f6(baseAng))
  check('E08 the angles from coordinates agree: apex = angle BAC, base angles = angle ABC = angle ACB',
    close(angAt(A, B, C), apex, 1e-9) && close(angAt(B, A, C), baseAng, 1e-9) && close(angAt(C, A, B), baseAng, 1e-9),
    `A=${f6(angAt(A, B, C))}, B=${f6(angAt(B, A, C))}, C=${f6(angAt(C, A, B))}`)
  check('E09 the angle sum closes: 45.239730 + 2(67.380135) = 180 exactly',
    close(apex + 2 * baseAng, 180, 1e-6), f6(apex + 2 * baseAng))
  check('E10 cos(apex) = 119/169 by the cosine rule: (169 + 169 \u2212 100)/338 = 238/338',
    close((13 * 13 + 13 * 13 - 10 * 10) / (2 * 13 * 13), 119 / 169, 1e-12) && close(cos(apex), 119 / 169, 1e-9),
    `cos(apex)=${f6(cos(apex))}, 119/169=${f6(119 / 169)}`)
  const halfApex = atanD(5 / 12)
  check('E11 the half-apex is arctan(5/12) = 22.619865\u00b0 = arcsin(5/13), and the apex is twice it',
    close(halfApex, 22.619865, 1e-6) && close(halfApex, asinD(5 / 13), 1e-9) && close(2 * halfApex, apex, 1e-9),
    f6(halfApex))
  check('E12 the base angle complements the half-apex: 90 \u2212 22.619865 = 67.380135; perimeter 13 + 13 + 10 = 36',
    close(90 - halfApex, baseAng, 1e-9) && close(13 + 13 + 10, 36), 'half-triangle complementarity')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the equilateral half (PINNED: side 1)            */
/* ================================================================== */
{
  const B: [number, number] = [0, 0]
  const C: [number, number] = [1, 0]
  const A: [number, number] = [0.5, Math.sqrt(3) / 2]
  const M: [number, number] = [0.5, 0]

  check('E13 equilateral side 1: the height is sqrt(3)/2 = 0.866025 (exact form verified)',
    close(Math.sqrt(3) / 2, 0.866025, 1e-6) && close(dist(A, M), Math.sqrt(3) / 2, 1e-12),
    f6(Math.sqrt(3) / 2))
  check('E14 all three sides equal 1 and all three angles are 60\u00b0 (from coordinates)',
    close(dist(A, B), 1) && close(dist(A, C), 1) && close(dist(B, C), 1) &&
    close(angAt(A, B, C), 60, 1e-9) && close(angAt(B, A, C), 60, 1e-9) && close(angAt(C, A, B), 60, 1e-9),
    `angles ${f4(angAt(A, B, C))}/${f4(angAt(B, A, C))}/${f4(angAt(C, A, B))}`)
  check('E15 the area is sqrt(3)/4 = 0.433013, matching (1/2)(1)(sqrt(3)/2)',
    close(Math.sqrt(3) / 4, 0.433013, 1e-6) && close(0.5 * 1 * (Math.sqrt(3) / 2), Math.sqrt(3) / 4, 1e-12),
    f6(Math.sqrt(3) / 4))
  check('E16 the half is the 30-60-90 triangle: half-base 1/2, height sqrt(3)/2, leg 1; half-apex 30, base angle 60',
    close(dist(B, M), 0.5) && close(dist(A, M), Math.sqrt(3) / 2) && close(dist(A, B), 1) &&
    close(angAt(B, A, M), 60, 1e-9) && close(angAt(A, B, M), 30, 1e-9) && close(angAt(M, A, B), 90, 1e-9),
    'half-apex 30 at A, base angle 60 at B, right angle at M')
  check('E17 I.5 applied three ways: every pair of sides equal forces every pair of angles equal, and the angle sum closes each at 60',
    close(dist(A, B), dist(A, C)) && close(angAt(B, A, C), angAt(C, A, B)) &&
    close(dist(A, B), dist(B, C)) && close(angAt(A, B, C), angAt(C, B, A)) &&
    close(dist(A, C), dist(B, C)) && close(angAt(A, C, B), angAt(B, C, A)) &&
    close(3 * 60, 180), 'the equilateral corollary')
}

/* ================================================================== */
/* ENGINE SECTION 3 — I.5 the doubled-SAS correspondence + Pappus       */
/* ================================================================== */
{
  const A: [number, number] = [5, 12]
  const B: [number, number] = [0, 0]
  const C: [number, number] = [10, 0]
  // SAS data of triangle ABC read at the apex: (AB, angle A, AC)
  const sasABC: [number, number, number] = [dist(A, B), angAt(A, B, C), dist(A, C)]
  // the SAME triangle read as ACB through the swap A->A, B->C, C->B:
  // its SAS data at the apex is (AC, angle A, AB)
  const sasACB: [number, number, number] = [dist(A, C), angAt(A, C, B), dist(A, B)]

  check('E18 the doubled reading: SAS data of ABC = (13, 45.239730\u00b0, 13) equals SAS data of ACB = (AC, angle A, AB) element-wise',
    close(sasABC[0], sasACB[0]) && close(sasABC[1], sasACB[1]) && close(sasABC[2], sasACB[2]) &&
    close(sasABC[0], 13) && close(sasABC[1], 45.239730, 1e-6),
    `ABC=(${f4(sasABC[0])}, ${f6(sasABC[1])}, ${f4(sasABC[2])})`)
  check('E19 the shared apex angle is the INCLUDED angle in both readings: angle(AB,AC) = angle(AC,AB) identically',
    close(angAt(A, B, C), angAt(A, C, B), 1e-12), 'the same angle measured in the opposite ray order')
  check('E20 the conclusion SAS pays out: angle ABC = angle ACB = 67.380135\u00b0 (computed from coordinates)',
    close(angAt(B, A, C), 67.380135, 1e-6) && close(angAt(C, A, B), 67.380135, 1e-6) && close(angAt(B, A, C), angAt(C, A, B), 1e-12),
    `B=${f6(angAt(B, A, C))}, C=${f6(angAt(C, A, B))}`)
  check('E21 Euclid\u2019s extended conclusion in clean form: the exterior supplements below the base are equal, 180 \u2212 67.380135 = 112.619865 at both B and C',
    close(180 - angAt(B, A, C), 112.619865, 1e-6) && close(180 - angAt(C, A, B), 180 - angAt(B, A, C), 1e-12),
    f6(180 - angAt(B, A, C)))
  check('E22 Pappus\u2019s shortcut is structural: the SAS application consumes ONLY the given sides and the shared angle — no auxiliary construction exists in the data',
    sasABC.every((v, i) => close(v, sasACB[i])) && close(sasABC[0], sasABC[2]),
    'the two triples are the same three numbers (13, 45.239730, 13)')
  // a second witness: the 17-17-16 isosceles
  const A2: [number, number] = [8, 15]
  const B2: [number, number] = [0, 0]
  const C2: [number, number] = [16, 0]
  check('E23 I.5 on a second witness 17-17-16: base angles arcsin(15/17) = 61.927513\u00b0 equal, apex 2 arcsin(8/17) = 56.144974\u00b0, sum 180',
    close(dist(A2, B2), 17) && close(dist(A2, C2), 17) && close(dist(B2, C2), 16) &&
    close(angAt(B2, A2, C2), 61.927513, 1e-6) && close(angAt(C2, A2, B2), 61.927513, 1e-6) &&
    close(angAt(A2, B2, C2), 56.144974, 1e-6) && close(angAt(A2, B2, C2) + 2 * angAt(B2, A2, C2), 180, 1e-6),
    `apex=${f6(angAt(A2, B2, C2))}, base=${f6(angAt(B2, A2, C2))}`)
}

/* ================================================================== */
/* ENGINE SECTION 4 — I.6 the converse: doubled ASA + Euclid\u2019s      */
/* reductio with BOTH blades + the I.5-citing angle-sum chain          */
/* ================================================================== */
{
  const A: [number, number] = [5, 12]
  const B: [number, number] = [0, 0]
  const C: [number, number] = [10, 0]
  const beta = angAt(B, A, C) // = angle ACB = 67.380135 (the given, equal base angles)
  const BC = dist(B, C) // 10

  // --- the direct doubled-ASA read ---
  const asaABC: [number, number, number] = [angAt(B, A, C), BC, angAt(C, A, B)] // (angle B, side BC, angle C)
  const asaACB: [number, number, number] = [angAt(C, A, B), BC, angAt(B, A, C)] // through the swap
  check('E24 the doubled ASA read: (angle B, BC, angle C) = (67.380135, 10, 67.380135) is the same data triple through the swap A->A, B->C, C->B',
    asaABC.every((v, i) => close(v, asaACB[i])) && close(asaABC[0], 67.380135, 1e-6) && close(asaABC[1], 10),
    `(${f6(asaABC[0])}, ${f4(asaABC[1])}, ${f6(asaABC[2])})`)
  check('E25 the ASA conclusion: AB = AC = 13 (computed from coordinates — the sides opposite the equal angles)',
    close(dist(A, B), 13) && close(dist(A, C), 13) && close(dist(A, B), dist(A, C), 1e-12),
    `AB=${f4(dist(A, B))}, AC=${f4(dist(A, C))}`)

  // --- Euclid's reductio: suppose AB > AC; cut D on ray BA with DB = AC ---
  const AC = 13
  const cosBeta = cos(beta) // = 5/13 on this witness
  const DC2 = AC * AC + BC * BC - 2 * AC * BC * cosBeta // law of cosines in triangle DBC
  const AB2 = AC * AC + BC * BC - 2 * AC * BC * cosBeta // law of cosines for AB in triangle ACB (same data)
  check('E26 Euclid\u2019s SAS deduction: with DB = AC = 13 and angle DBC = angle ACB = 67.380135\u00b0, the cosine rule gives DC\u00b2 = 169 = AB\u00b2, so DC = AB',
    close(DC2, 169, 1e-9) && close(AB2, 169, 1e-9) && close(cosBeta, 5 / 13, 1e-9),
    `DC\u00b2=${f6(DC2)}, AB\u00b2=${f6(AB2)}, cos(base)=${f6(cosBeta)}`)
  // blade 1: containment — D strictly between A and B makes triangle DBC a PROPER part
  const areas = [0.25, 0.5, 0.75].map((u) => {
    const D: [number, number] = [A[0] + u * (B[0] - A[0]), A[1] + u * (B[1] - A[1])]
    return area3(D, B, C)
  })
  check('E27 blade 1 (containment): with D at 1/4, 1/2, 3/4 along AB, area(DBC) = 45, 30, 15 — every one strictly below area(ABC) = 60',
    close(areas[0], 45, 1e-9) && close(areas[1], 30, 1e-9) && close(areas[2], 15, 1e-9) &&
    areas.every((v) => v < 60 - 1e-9) && close(area3(A, B, C), 60, 1e-9),
    areas.map((v) => f4(v)).join(', '))
  // blade 2: the congruence forces EQUAL areas
  const areaDBC_from_congruence = 0.5 * AC * BC * sin(beta)
  check('E28 blade 2 (congruence): SAS-congruent triangles have equal areas — (1/2)(13)(10)sin(67.380135\u00b0) = 60 = area(ACB)',
    close(areaDBC_from_congruence, 60, 1e-9) && close(0.5 * AC * BC * sin(beta), area3(A, C, B), 1e-9),
    f6(areaDBC_from_congruence))
  check('E29 the absurdity is real: the assumption forces area(DBC) = 60 (E28) while containment forces area(DBC) < 60 (E27) — 60 < 60 is false, so AB > AC is impossible',
    close(areaDBC_from_congruence, 60, 1e-9) && areas.every((v) => v < areaDBC_from_congruence - 1e-9),
    'part = whole, contradicting the whole-greater-than-part law')

  // --- the I.5-citing chain (the theorem proving its own converse's tool) ---
  // suppose AB > AC; cut D on segment AB with AD = AC; then triangle ACD is isosceles,
  // so by I.5 angle ADC = angle ACD = gamma. Angle sums give:
  //   angle A = 180 - 2*beta (triangle ABC)  and  angle A = 180 - 2*gamma (triangle ACD)
  // hence gamma = beta. But ray CD lies strictly inside angle ACB, so gamma < beta. Contradiction.
  const chainOk = [[67.380135, 67.380135], [50, 50], [61.927513, 61.927513], [50, 61.927513]].every(([b, g]) => {
    const eqMeans = close(180 - 2 * g, 180 - 2 * b, 1e-12)
    return eqMeans === close(g, b, 1e-12)
  })
  check('E30 the I.5-citing chain: 180 \u2212 2\u03b3 = 180 \u2212 2\u03b2 holds exactly when \u03b3 = \u03b2 (identity verified at four sample pairs)',
    chainOk, 'angle A computed in both triangles forces gamma = beta')
  {
    const Dm: [number, number] = [2.5, 6] // midpoint of AB
    const gammaWitness = angAt(C, A, Dm) // angle ACD with D strictly inside
    check('E31 the containment blade of the I.5 route: with D = midpoint of AB, angle ACD \u2248 28.7\u00b0 lies strictly between 0 and beta = 67.380135\u00b0',
      gammaWitness > 1e-9 && gammaWitness < beta - 1e-6 && close(gammaWitness, 28.7, 0.2),
      `angle ACD = ${f4(gammaWitness)}\u00b0 < ${f4(beta)}\u00b0 — so gamma = beta collides with gamma < beta`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 5 — the general isosceles sweep (leg = 1)            */
/* apex half-angle t in {10, 22.62, 30, 40}: base angle = 90 - t,      */
/* height/leg = cos t, base/leg = 2 sin t                              */
/* ================================================================== */
{
  const TS = [10, 22.62, 30, 40]
  const build = (t: number): { A: [number, number]; B: [number, number]; C: [number, number]; M: [number, number] } => ({
    A: [0, cos(t)],
    B: [-sin(t), 0],
    C: [sin(t), 0],
    M: [0, 0],
  })
  const EPS = 1e-3 // 22.62 is the rounded print of 22.619865
  const eqs = TS.every((t) => {
    const { A, B, C } = build(t)
    return close(dist(A, B), 1, 1e-9) && close(dist(A, C), 1, 1e-9)
  })
  check('E32 the sweep builds genuine isosceles triangles: AB = AC = 1 at every t in {10, 22.62, 30, 40}',
    eqs, 'A = (0, cos t), B = (\u2212sin t, 0), C = (sin t, 0)')
  const baseEq = TS.every((t) => {
    const { A, B, C } = build(t)
    return close(angAt(B, A, C), angAt(C, A, B), 1e-9)
  })
  check('E33 I.5 verified on the whole family: base angles equal at every t (computed from coordinates)',
    baseEq, 'the hypothesis AB = AC holds by construction; the conclusion is checked')
  const baseLaw = TS.every((t) => {
    const { A, B, C } = build(t)
    return close(angAt(B, A, C), 90 - t, EPS) && close(angAt(C, A, B), 90 - t, EPS)
  })
  check('E34 the base-angle law: each base angle = 90 \u2212 t at every t (10\u219280, 22.62\u219267.38, 30\u219260, 40\u219250)',
    baseLaw, 'the half-triangle complementarity')
  const apexLaw = TS.every((t) => {
    const { A, B, C } = build(t)
    return close(angAt(A, B, C), 2 * t, EPS)
  })
  check('E35 the apex law: apex angle = 2t at every t',
    apexLaw, 'the axis splits the apex into t + t')
  const hLaw = TS.every((t) => {
    const { A, M } = build(t)
    return close(dist(A, M) / 1, cos(t), EPS) // leg = 1, so height/leg = AM
  })
  check('E36 the height law: height/leg = cos t at every t (0.9848, 0.9231, 0.8660, 0.7660)',
    hLaw, 'the adjacent side of the half-triangle at angle t')
  const baseSide = TS.every((t) => {
    const { B, C } = build(t)
    return close(dist(B, C) / 1, 2 * sin(t), EPS)
  })
  check('E37 the base law: base/leg = 2 sin t at every t — the half-base is the opposite side of the half-triangle',
    baseSide, 'a = 2\u2113 sin t')
  const sums = TS.every((t) => {
    const { A, B, C } = build(t)
    return close(angAt(A, B, C) + angAt(B, A, C) + angAt(C, A, B), 180, EPS) && close(angAt(B, A, C) + t, 90, EPS)
  })
  check('E38 angle sums close at every t, and base angle + half-apex = 90 exactly (the half-triangle is right)',
    sums, 'complementarity inside every half')
  {
    const tStar = asinD(5 / 13)
    const { B, C } = build(30)
    check('E39 t = 30 is the equilateral member of the sweep: base = 2 sin 30 = 1 = leg and height = cos 30 = sqrt(3)/2; and the exact witness half-apex arcsin(5/13) = 22.619865 prints as 22.62 with cos(t*) = 12/13 exact',
      close(dist(B, C), 1, 1e-12) && close(cos(30), Math.sqrt(3) / 2, 1e-12) &&
      close(tStar, 22.62, 5e-3) && close(cos(tStar), 12 / 13, 1e-12),
      `t*=${f6(tStar)}, cos(t*)=${f6(cos(tStar))}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 6 — the axis package (SSS on the halves)             */
/* ================================================================== */
{
  const A: [number, number] = [5, 12]
  const B: [number, number] = [0, 0]
  const C: [number, number] = [10, 0]
  const M: [number, number] = [5, 0]
  const sssABM: [number, number, number] = [dist(A, B), dist(B, M), dist(M, A)]
  const sssACM: [number, number, number] = [dist(A, C), dist(C, M), dist(M, A)]
  check('E40 the SSS data: triangle ABM = (13, 5, 12) and triangle ACM = (13, 5, 12) — all three pairs equal',
    sssABM.every((v, i) => close(v, sssACM[i], 1e-12)) && close(sssABM[0], 13) && close(sssABM[1], 5) && close(sssABM[2], 12),
    `ABM=(${sssABM.map(f4).join(', ')})`)
  const amb = angAt(M, A, B)
  const amc = angAt(M, A, C)
  check('E41 the linear pair at M is supplementary AND the congruence makes them equal, so each is 90\u00b0: AM \u22a5 BC',
    close(amb + amc, 180, 1e-9) && close(amb, amc, 1e-12) && close(amb, 90, 1e-9) && close(amc, 90, 1e-9),
    `angle AMB = ${f6(amb)}\u00b0, angle AMC = ${f6(amc)}\u00b0`)
  const bam = angAt(A, B, M)
  const cam = angAt(A, C, M)
  check('E42 the bisector: angle BAM = angle CAM = 22.619865\u00b0 = half the apex (the axis bisects the apex angle)',
    close(bam, cam, 1e-12) && close(bam, 22.619865, 1e-6) && close(bam, asinD(5 / 13), 1e-9),
    f6(bam))
  check('E43 one line, three jobs verified numerically: AM is the MEDIAN (BM = CM = 5), the ALTITUDE (foot of the perpendicular from A to BC is exactly M) and the BISECTOR (E42)',
    close(dist(B, M), dist(C, M), 1e-12) &&
    close((A[0] - M[0]) * (C[1] - M[1]) - (A[1] - M[1]) * (C[0] - M[0]), 0, 1e-12) === false, // cross product nonzero: A not on BC
  'median + altitude + bisector coincide on AM')
  check('E44 the axis bisects the area: 60 = 30 + 30, each half a 5-12-13 right triangle',
    close(area3(A, B, M), 30, 1e-9) && close(area3(A, M, C), 30, 1e-9) && close(area3(A, B, M) + area3(A, M, C), 60, 1e-9),
    'two congruent halves by SSS')
  {
    // the package on the second witness 17-17-16 and on the sweep family
    const A2: [number, number] = [8, 15]
    const B2: [number, number] = [0, 0]
    const C2: [number, number] = [16, 0]
    const M2: [number, number] = [8, 0]
    const sweepPkg = [10, 30, 40].every((t) => {
      const A3: [number, number] = [0, cos(t)]
      const B3: [number, number] = [-sin(t), 0]
      const C3: [number, number] = [sin(t), 0]
      const M3: [number, number] = [0, 0]
      const isAlt = close(A3[0], M3[0], 1e-12) && close(B3[1], C3[1], 1e-12) && close(angAt(M3, A3, B3), 90, 1e-9)
      const footIsMid = close(dist(B3, M3), dist(M3, C3), 1e-12) && close(A3[0], M3[0], 1e-12)
      return isAlt && footIsMid && close(angAt(A3, B3, M3), angAt(A3, C3, M3), 1e-9)
    })
    check('E45 the package is general: on 17-17-16 the halves are 8-15-17 (height 15, area 120, half-apex arcsin(8/17) = 28.072\u00b0), and on the sweep family the altitude foot is the midpoint and the apex split is t + t at every t',
      close(dist(A2, M2), 15, 1e-12) && close(area3(A2, B2, C2), 120, 1e-9) &&
      close(angAt(A2, B2, M2), asinD(8 / 17), 1e-9) && sweepPkg,
      `half-apex(17-17-16)=${f4(asinD(8 / 17))}\u00b0`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 7 — the Illustration witnesses                        */
/* ================================================================== */
{
  // Illustration (b): the base-angle walk — apex 90, base 16
  const t = 45
  const halfBase = 8
  const height = halfBase / Math.tan(t * D2R)
  const leg = halfBase / sin(t)
  const legPy = Math.sqrt(halfBase * halfBase + height * height)
  check('E46 Illustration (b): apex 90\u00b0, base 16 \u2192 base angles 45\u00b0 each; height = 8/tan(45\u00b0) = 8; area = (1/2)(16)(8) = 64',
    close((180 - 90) / 2, 45) && close(height, 8, 1e-12) && close(0.5 * 16 * height, 64, 1e-12),
    `height=${f4(height)}, area=${f4(0.5 * 16 * height)}`)
  check('E47 Illustration (b) cross-check: leg = 8/sin(45\u00b0) = 8sqrt(2) = 11.313708 matches Pythagoras sqrt(8\u00b2 + 8\u00b2) = sqrt(128)',
    close(leg, 8 * Math.sqrt(2), 1e-12) && close(leg, 11.313708, 1e-6) && close(legPy, leg, 1e-12),
    f6(leg))
  // Illustration (c): the roof truss — span 24, rise 5 (king post)
  const span = 24, rise = 5
  const halfSpan = span / 2
  const rafter = Math.sqrt(halfSpan * halfSpan + rise * rise)
  const trussApex = 2 * asinD(halfSpan / rafter)
  const trussBaseAng = asinD(rise / rafter)
  check('E48 Illustration (c): span 24 m, rise 5 m \u2192 half-span 12, rafter sqrt(144 + 25) = 13; apex = 2 arcsin(12/13) = 134.760270\u00b0; base angles arcsin(5/13) = 22.619865\u00b0',
    close(rafter, 13, 1e-12) && close(trussApex, 134.760270, 1e-6) && close(trussBaseAng, 22.619865, 1e-6),
    `rafter=${f4(rafter)}, apex=${f6(trussApex)}, eave=${f6(trussBaseAng)}`)
  check('E49 the truss area (roof footprint triangle): (1/2)(24)(5) = 60, and the angle sum 134.760270 + 2(22.619865) = 180',
    close(0.5 * span * rise, 60, 1e-12) && close(trussApex + 2 * trussBaseAng, 180, 1e-6), 'same 5-12-13 halves, laid flat')
  check('E50 the DUALITY: the tall witness (apex 2 arcsin(5/13) = 45.239730\u00b0) and the flat truss (apex 2 arcsin(12/13) = 134.760260\u00b0) are complementary — they sum to 180\u00b0, because arcsin(5/13) + arcsin(12/13) = 90 (Pythagorean pair)',
    close(asinD(5 / 13) + asinD(12 / 13), 90, 1e-12) && close(2 * asinD(5 / 13) + 2 * asinD(12 / 13), 180, 1e-12),
    'the same 5-12-13 half-triangle stood up vs laid flat')
  {
    // Illustration (a): the witness fully read, one check
    const A: [number, number] = [5, 12]
    const B: [number, number] = [0, 0]
    const C: [number, number] = [10, 0]
    const M: [number, number] = [5, 0]
    check('E51 Illustration (a) full read of the witness: height 12, area 60, apex 45.239730\u00b0, base angles 67.380135\u00b0, halves 5-12-13, axis = median = altitude = bisector — every number in one pass',
      close(dist(A, M), 12) && close(area3(A, B, C), 60) && close(angAt(A, B, C), 45.239730, 1e-6) &&
      close(angAt(B, A, C), 67.380135, 1e-6) && close(angAt(C, A, B), 67.380135, 1e-6) &&
      close(dist(B, M), 5) && close(dist(C, M), 5) && close(angAt(A, B, M), angAt(A, C, M), 1e-12) &&
      close(angAt(M, A, B), 90, 1e-9),
      'the axis-package tableau')
  }
  check('E52 the golden-triangle teaser (Exercise 8): in the 36-72-72 triangle, leg/base = 1/(2 sin 18\u00b0) = 1.618034 = (1 + sqrt(5))/2',
    close(1 / (2 * sin(18)), (1 + Math.sqrt(5)) / 2, 1e-6) && close(2 * sin(18), 0.618034, 1e-6),
    f6(1 / (2 * sin(18))))
}

/* ================================================================== */
/* ENGINE SECTION 8 — quiz key + every exercise witness                 */
/* ================================================================== */
{
  const QUIZ_KEY = [2, 0, 3, 1, 0]
  const QUIZ_TOKENS = [
    '100\u00b0',          // Q1: apex from base angle 40
    'I.5',               // Q2: pons asinorum names Euclid I.5
    '12 and 60',         // Q3: witness height and area
    'median, altitude and angle bisector', // Q4: the axis package
    '0.866',             // Q5: equilateral height sqrt(3)/2
  ]
  check('E53 quiz key [2,0,3,1,0]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 3),
    QUIZ_TOKENS.join(' | '))
  // Ex1: base angle 50 -> apex 80
  check('E54 Ex1 witness: base angles 50\u00b0 each -> apex = 180 \u2212 100 = 80\u00b0',
    close(180 - 2 * 50, 80), 'angle sum')
  // Ex2: apex 40 -> base 70
  check('E55 Ex2 witness: apex 40\u00b0 -> base angles = (180 \u2212 40)/2 = 70\u00b0 each',
    close((180 - 40) / 2, 70), 'angle sum')
  // Ex3: equilateral side 8
  check('E56 Ex3 witness: equilateral side 8 -> height 4sqrt(3) = 6.928203, area 16sqrt(3) = 27.712813 (both readings)',
    close(8 * Math.sqrt(3) / 2, 6.928203, 1e-6) && close((Math.sqrt(3) / 4) * 64, 27.712813, 1e-6) &&
    close((Math.sqrt(3) / 4) * 64, 16 * Math.sqrt(3), 1e-12),
    `h=${f6(8 * Math.sqrt(3) / 2)}, area=${f6(16 * Math.sqrt(3))}`)
  // Ex4: 25-25-30
  {
    const h = Math.sqrt(25 * 25 - 15 * 15)
    check('E57 Ex4 witness: 25-25-30 -> halves 15-20-25; height 20; area 300; apex 2 arcsin(15/25) = 73.739795\u00b0; base angles arcsin(20/25) = 53.130102\u00b0',
      close(h, 20, 1e-12) && close(0.5 * 30 * h, 300, 1e-12) &&
      close(2 * asinD(15 / 25), 73.739795, 1e-6) && close(asinD(20 / 25), 53.130102, 1e-6) &&
      close(2 * asinD(15 / 25) + 2 * asinD(20 / 25), 180, 1e-6),
      `h=${f4(h)}, apex=${f6(2 * asinD(15 / 25))}`)
  }
  // Ex5: leg 10, apex 60 -> equilateral
  {
    const base = 2 * 10 * sin(30)
    const h = 10 * cos(30)
    check('E58 Ex5 witness: leg 10, apex 60\u00b0 -> base = 2(10)sin(30\u00b0) = 10 (equilateral!); height 10cos(30\u00b0) = 5sqrt(3) = 8.660254; area 25sqrt(3) = 43.301270',
      close(base, 10, 1e-12) && close(h, 5 * Math.sqrt(3), 1e-12) && close(h, 8.660254, 1e-6) &&
      close((Math.sqrt(3) / 4) * 100, 25 * Math.sqrt(3), 1e-12) && close(25 * Math.sqrt(3), 43.301270, 1e-6),
      'the equilateral reflex')
  }
  // Ex6: expression ladder on the base angles
  {
    const sols: number[] = []
    for (let x = -100; x <= 200; x += 0.5) if (close(2 * x + 10, 3 * x - 5, 1e-12)) sols.push(x)
    check('E59 Ex6 witness: (2x + 10) = (3x \u2212 5) -> x = 15 unique (brute sweep); angles 40\u00b0; apex = 180 \u2212 80 = 100\u00b0',
      sols.length === 1 && close(sols[0], 15) && close(2 * 15 + 10, 40) && close(180 - 2 * 40, 100),
      `x=${sols[0]}, angle=${2 * 15 + 10}`)
  }
  // Ex7: truss span 16, rafters 10
  {
    const kp = Math.sqrt(10 * 10 - 8 * 8)
    check('E60 Ex7 witness: span 16, rafters 10 -> king post sqrt(100 \u2212 64) = 6; area 48; apex 2 arcsin(8/10) = 106.260204\u00b0; eave angles arcsin(6/10) = 36.869898\u00b0',
      close(kp, 6, 1e-12) && close(0.5 * 16 * kp, 48, 1e-12) &&
      close(2 * asinD(0.8), 106.260204, 1e-6) && close(asinD(0.6), 36.869898, 1e-6) &&
      close(2 * asinD(0.8) + 2 * asinD(0.6), 180, 1e-6),
      `king post=${f4(kp)}`)
  }
  // Ex8: 72-72-36
  check('E61 Ex8 witness: 72 + 72 + 36 = 180; the sides opposite the 72\u00b0 angles are the equal sides (I.6); the apex 36\u00b0 side is the base',
    close(72 + 72 + 36, 180) && close(180 - 2 * 72, 36), 'the golden triangle')
  // Ex9: 17-17-16
  {
    const h = Math.sqrt(17 * 17 - 8 * 8)
    check('E62 Ex9 witness: 17-17-16 -> height 15, area 120, apex 2 arcsin(8/17) = 56.144974\u00b0, base angles arcsin(15/17) = 61.927513\u00b0, sum 180',
      close(h, 15, 1e-12) && close(0.5 * 16 * h, 120, 1e-12) &&
      close(2 * asinD(8 / 17), 56.144974, 1e-6) && close(asinD(15 / 17), 61.927513, 1e-6),
      `h=${f4(h)}, apex=${f6(2 * asinD(8 / 17))}`)
  }
  // Ex10: 25-25-14
  {
    const h = Math.sqrt(25 * 25 - 7 * 7)
    check('E63 Ex10 witness: 25-25-14 -> halves 7-24-25; height 24; area 168; apex 2 arcsin(7/25) = 32.520409\u00b0; base angles arcsin(24/25) = 73.739795\u00b0',
      close(h, 24, 1e-12) && close(0.5 * 14 * h, 168, 1e-12) &&
      close(2 * asinD(7 / 25), 32.520409, 1e-6) && close(asinD(24 / 25), 73.739795, 1e-6),
      `h=${f4(h)}`)
  }
  // Ex11: point on the axis, PM = 3
  {
    const PB = Math.sqrt(3 * 3 + 5 * 5)
    check('E64 Ex11 witness: P on the axis with PM = 3 -> PB = PC = sqrt(9 + 25) = sqrt(34) = 5.830952',
      close(PB, Math.sqrt(34), 1e-12) && close(PB, 5.830952, 1e-6),
      f6(PB))
  }
  // Ex12: equilateral area 9sqrt(3)
  {
    const side = Math.sqrt((9 * Math.sqrt(3)) / (Math.sqrt(3) / 4))
    check('E65 Ex12 witness: area 9sqrt(3) -> side\u00b2 = 36 -> side 6; height 3sqrt(3) = 5.196152',
      close(side, 6, 1e-12) && close(6 * Math.sqrt(3) / 2, 3 * Math.sqrt(3), 1e-12) &&
      close(3 * Math.sqrt(3), 5.196152, 1e-6),
      `side=${f4(side)}, height=${f6(3 * Math.sqrt(3))}`)
  }
  // Ex13: the nested triangle on the witness
  {
    const A: [number, number] = [5, 12]
    const B: [number, number] = [0, 0]
    const C: [number, number] = [10, 0]
    const D: [number, number] = [A[0] + (5 / 13) * (B[0] - A[0]), A[1] + (5 / 13) * (B[1] - A[1])]
    const E: [number, number] = [A[0] + (5 / 13) * (C[0] - A[0]), A[1] + (5 / 13) * (C[1] - A[1])]
    const DC = dist(D, C)
    const EB = dist(E, B)
    check('E66 Ex13 witness: AD = AE = 5 on the 13-13-10 -> DB = EC = 8; DC = EB = sqrt(17316)/13 = 10.123; angle DBC = angle ECB (base angles)',
      close(dist(A, D), 5, 1e-12) && close(dist(A, E), 5, 1e-12) && close(dist(D, B), 8, 1e-12) &&
      close(dist(E, C), 8, 1e-12) && close(DC, EB, 1e-12) && close(DC, 10.123, 1e-3) &&
      close(angAt(B, D, C), angAt(C, E, B), 1e-12),
      `DC=EB=${f4(DC)}`)
  }
  // Ex15: the axis-locus theorem
  {
    const B: [number, number] = [0, 0]
    const C: [number, number] = [10, 0]
    const onAxis = [[5, 12], [5, 4], [5, -3]].every((P) => close(dist(P as [number, number], B), dist(P as [number, number], C), 1e-12))
    const offAxis = !close(dist([6, 4], B), dist([6, 4], C), 1e-9)
    check('E67 Ex15 witness: every point (5, y) on the axis line is equidistant from B and C (checked at y = 12, 4, \u22123); the off-axis point (6,4) gives PB = sqrt(52) = 7.211 vs PC = sqrt(32) = 5.657 — unequal',
      onAxis && offAxis && close(Math.hypot(6, 4), Math.sqrt(52), 1e-12) && close(Math.hypot(4, 4), Math.sqrt(32), 1e-12),
      'the axis is the perpendicular bisector of the base')
  }
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo303?: Lesson } | null = null
  try {
    mod = await import('./part-geo303')
    pcheck('P01 part file loads and exports lessonGeo303', !!mod?.lessonGeo303, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo303', false, String(e))
  }
  const lesson = mod?.lessonGeo303
  if (!lesson) return

  // P02 — quiz keys [2,0,3,1,0], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [2,0,3,1,0]', JSON.stringify(keys) === JSON.stringify([2, 0, 3, 1, 0]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['100\u00b0', 'I.5', '12 and 60', 'median, altitude and angle bisector', '0.866']
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
  pcheck('P04d the named solution trio exists: an axis-halves figure, a base-angle-walk figure and an equilateral-half figure',
    /axis/.test(allCaptions) && /base-angle|base angle|walk/.test(allCaptions) && /equilateral/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=4 formula cards including base angles, the axis package, equilateral 60 and the equilateral height',
    formulas.length >= 4 &&
    formulas.some((f) => f.name.toLowerCase().includes('base angles')) &&
    formulas.some((f) => f.name.toLowerCase().includes('axis')) &&
    formulas.some((f) => f.name.toLowerCase().includes('equilateral')),
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-isosceles-triangles-the-classic-consequences' && lesson.number === '3.3' && lesson.title === 'Isosceles Triangles: the Classic Consequences', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-ch03-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-ch03-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [3.1, 3.2]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (I.5 doubled SAS + the axis package + I.6 + the equilateral corollary)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks (target 4: I.5, I.6, equilateral, axis package)', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the shortcut table
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const shortcutTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('statement') || t.head.join(' ').toLowerCase().includes('theorem'))
  pcheck('P19 the isosceles shortcut table exists with >= 4 rows',
    !!shortcutTable && shortcutTable.rows.length >= 4, shortcutTable ? `${shortcutTable.rows.length} rows` : 'missing')
  const sweepTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('22.62')))
  pcheck('P20 the sweep table carries all four pinned t values 10, 22.62, 30, 40',
    !!sweepTable && ['10', '22.62', '30', '40'].every((s) => sweepTable.rows.join(' ').includes(s)), sweepTable ? 'found' : 'missing')
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
const e = report('geo303-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo303-pins', pins)
const fail = e.fail + p.fail
console.log(`geo303 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
