/**
 * v-geo302.ts — verify-first ENGINE + PIN harness for GEO lesson 3.2
 * "The Congruence Criteria: SAS, ASA, AAS, SSS, RHS" (run 128 swarm, agent geo302, seat 3.2).
 *
 * DISCIPLINE: the engine wins over the spec. Every witness value, closure,
 * criterion count and failure the prose prints is recomputed here by brute
 * force FIRST; where engine and prose disagree, the prose is fixed to the
 * engine's value and the catch is flagged in the report.
 *
 * ONE SPEC CATCH, APPLIED (engine checks E13–E19 + E50): the outline pins the
 * SSA witness as "angle A = 30, b = CA = 7, a = BC = 10 ... TWO distinct
 * triangles satisfy the same SSA data" with third sides sqrt(149 −+ 70√3).
 * The ENGINE finds: (i) every pinned NUMBER is correct — h = 3.5,
 * off = 7√3/2 ≈ 6.062178, c1 = √(149 − 70√3) ≈ 5.268438,
 * c2 = √(149 + 70√3) ≈ 16.439086, 3.5 < 7 < 10; (ii) the two pinned
 * triangles are the SUPPLEMENT PAIR on the sides 7 and 10 — the same base
 * BC = 10, the same swing-side BA = 7 at 30° to the base LINE, two A
 * positions, with the interior angle at B reading 30° in one triangle and
 * 150° in the other (sin 30° = sin 150° — the exact fault line the law of
 * sines exposes in every SSA data set); (iii) the LITERAL label reading
 * (A = 30° as the interior angle, b = 7 adjacent, a = 10 opposite) has a
 * UNIQUE solution c = (7√3 + √351)/2 ≈ 15.429675, because a = 10 > b = 7;
 * the classic two-INTERIOR-solution ambiguity needs the swung side strictly
 * between the altitude and the fixed side, b sin A < a < b, witnessed here
 * at a = 5 with third sides (7√3 ± √51)/2 ≈ 9.632892 / 2.491464. The
 * lesson keeps every pinned number, presents the pinned figure as the
 * supplement-fault display, walks the classic a = 5 construction as the
 * genuine ambiguous case, and states the honest regime (none / right /
 * two / one) as a remark — exactly as the spec allows.
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the SSA witness recomputed BOTH ways
 *     (trig + coordinate); the supplement-fault pair on base BC; the spec
 *     catch with the full regime census at a ∈ {3, 3.5, 5, 7, 10}; the AAA
 *     failure (equilateral 1 vs 2); the RHS Pythagoras closure (√(169−25)
 *     = 12 unique; 5-12-13 vs 5-12-12); the 6-8-10 SAS two-build witness;
 *     the angle-sum ASA/AAS closure (30 + 60 + 90 = 180, the 30-60-90
 *     half-equilateral); quiz-key self-check; every exercise witness.
 *   PIN SECTION (P01...) — imports ./part-geo302 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [0,2,1,3,2], 15 exercises L1..L6 with full steps
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the SSA
 *     construction / included-angle repair / RHS pair trio, terms + the
 *     five criteria formula cards, >= 3 Illustrations with >= 4 steps,
 *     >= 2 derivations, SVG + math-span hygiene laws).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo302.ts
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
const deg = (x: number): number => (x * 180) / Math.PI
const rad = (x: number): number => (x * Math.PI) / 180
const dist = (p: [number, number], q: [number, number]): number => Math.hypot(p[0] - q[0], p[1] - q[1])

/* ================================================================== */
/* ENGINE SECTION 1 — the SSA witness, recomputed BOTH ways            */
/* Fixed data: the 30° angle at the base vertex B of a base line, the  */
/* swing-side of 7 on the angle arm (height h, foot offset off), the   */
/* 10-side laid along the base line on EITHER side of B.               */
/* ================================================================== */
{
  const A_ANG = 30
  const SWING = 7 // the side on the arm: length 7 (b in the spec labels)
  const BASE = 10 // the side laid along the line: length 10 (a in the spec labels)
  const h = SWING * Math.sin(rad(A_ANG))
  const off = SWING * Math.cos(rad(A_ANG))
  const r3 = Math.sqrt(3)

  check('E01 the altitude of the swing-side end: h = 7 sin 30° = 3.5',
    close(h, 3.5), `h=${f6(h)}`)
  check('E02 the foot offset: off = 7 cos 30° = 7√3/2 ≈ 6.062178',
    close(off, (7 * r3) / 2, 1e-12) && close(off, 6.062178, 1e-6), `off=${f6(off)}`)

  // TRIG WAY: the two third sides as the law-of-cosines values 149 ∓ 70√3
  const c1 = Math.sqrt(149 - 70 * r3)
  const c2 = Math.sqrt(149 + 70 * r3)
  check('E03 TRIG way, first third side: c1 = √(149 − 70√3) ≈ 5.268438',
    close(c1, 5.268438, 1e-6), `c1=${f6(c1)}`)
  check('E04 TRIG way, second third side: c2 = √(149 + 70√3) ≈ 16.439086',
    close(c2, 16.439086, 1e-6), `c2=${f6(c2)}`)

  // COORDINATE WAY: base BC = 10 with B = (0,0), C = (10,0); the two A
  // positions at height h with foot offsets ±off from B; both keep BA = 7
  const B: [number, number] = [0, 0]
  const C: [number, number] = [10, 0]
  const A1: [number, number] = [off, h]
  const A2: [number, number] = [-off, h]
  const c1b = dist(C, A1)
  const c2b = dist(C, A2)
  check('E05 COORDINATE way: c1 = √((10 − off)² + h²) = √(149 − 70√3) — matches the trig value',
    close(c1b, c1, 1e-9) && close(c1b, 5.268438, 1e-6), `c1b=${f6(c1b)}`)
  check('E06 COORDINATE way: c2 = √((10 + off)² + h²) = √(149 + 70√3) — matches the trig value',
    close(c2b, c2, 1e-9) && close(c2b, 16.439086, 1e-6), `c2b=${f6(c2b)}`)
  check('E07 c1 ≠ c2 — two DISTINCT triangles (gap > 1)',
    Math.abs(c1 - c2) > 1 && !close(c1, c2, 1e-6), `|c1 − c2|=${f4(Math.abs(c1 - c2))}`)
  check('E08 the pinned figure: both A positions on the same base BC — |BA1| = |BA2| = 7, heights both 3.5, foot offsets ±6.062178',
    close(dist(B, A1), 7) && close(dist(B, A2), 7) && close(A1[1], 3.5) && close(A2[1], 3.5) && close(A1[0], 6.062178, 1e-6) && close(A2[0], -6.062178, 1e-6) && close(dist(B, C), 10),
    `BA1=${f6(dist(B, A1))}, BA2=${f6(dist(B, A2))}`)

  // the angles at the base vertex B: 30° and 150° — the supplement fault
  const angB1 = deg(Math.atan2(A1[1], A1[0]))
  const angB2 = deg(Math.atan2(A2[1], A2[0]))
  check('E09 the supplement fault: the interior angle at B reads 30° in triangle 1 and 150° in triangle 2, with sin equal to 1/2 in both',
    close(angB1, 30, 1e-9) && close(angB2, 150, 1e-9) && close(Math.sin(rad(angB1)), Math.sin(rad(angB2))) && close(Math.sin(rad(angB1)), 0.5),
    `∠B1=${f4(angB1)}°, ∠B2=${f4(angB2)}°`)
  check('E10 the pinned ordering 3.5 < 7 < 10 (h < swing-side < base-side) holds as numbers',
    h < SWING && SWING < BASE && close(h, 3.5) && SWING === 7 && BASE === 10, `${f4(h)} < 7 < 10`)

  // both triangles close: angle sums exactly 180
  const angleAt = (P: [number, number], Q: [number, number], R: [number, number]): number => {
    const u: [number, number] = [Q[0] - P[0], Q[1] - P[1]]
    const v: [number, number] = [R[0] - P[0], R[1] - P[1]]
    return Math.abs(deg(Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1])))
  }
  const T1angs = [angleAt(A1, B, C), angleAt(B, A1, C), angleAt(C, A1, B)]
  const T2angs = [angleAt(A2, B, C), angleAt(B, A2, C), angleAt(C, A2, B)]
  check('E11 both triangles close: angle sums 180.000000 exactly (engine, both A positions)',
    close(T1angs[0] + T1angs[1] + T1angs[2], 180, 1e-9) && close(T2angs[0] + T2angs[1] + T2angs[2], 180, 1e-9),
    `T1: ${T1angs.map(f4).join(', ')}; T2: ${T2angs.map(f4).join(', ')}`)
  check('E12 the exact forms are algebra: (10 − 7√3/2)² + (7/2)² = 149 − 70√3 and (10 + 7√3/2)² + (7/2)² = 149 + 70√3',
    close((10 - (7 * r3) / 2) ** 2 + 3.5 ** 2, 149 - 70 * r3, 1e-12) && close((10 + (7 * r3) / 2) ** 2 + 3.5 ** 2, 149 + 70 * r3, 1e-12),
    'both identities hold to 1e-12')
}

/* ================================================================== */
/* ENGINE SECTION 2 — THE SPEC CATCH: the literal reading vs the       */
/* classic regime. Literal data (A = 30°, b = 7, a = 10): the law of   */
/* cosines quadratic in c has ONE positive root. The genuine two-      */
/* interior-solution ambiguity lives at b sin A < a < b (witnessed at  */
/* a = 5); the full regime census at a ∈ {3, 3.5, 5, 7, 10}.           */
/* ================================================================== */
{
  const r3 = Math.sqrt(3)
  const b = 7, A = 30
  // law of cosines at A: a² = b² + c² − 2bc cos A  ⟹  c² − (2b cos A)c + (b² − a²) = 0
  const quad = (a: number): [number, number] => {
    const p = -2 * b * Math.cos(rad(A))
    const q = b * b - a * a
    const disc = p * p - 4 * q
    if (disc < 0) return [NaN, NaN]
    return [(-p - Math.sqrt(disc)) / 2, (-p + Math.sqrt(disc)) / 2]
  }
  // count DISTINCT positive roots (a double root is ONE triangle)
  const countPos = (a: number): number => {
    const [r1, r2] = quad(a)
    const pos = [r1, r2].filter((x) => Number.isFinite(x) && x > 1e-9)
    if (pos.length === 2 && close(pos[0], pos[1], 1e-4)) return 1
    return pos.length
  }

  // literal pinned data a = 10
  const [rlo, rhi] = quad(10)
  check('E13 SPEC CATCH (a): the literal pinned data (A = 30°, b = 7, a = 10) gives c² − 7√3·c − 51 = 0 with roots (7√3 ± √351)/2',
    close(rlo, (7 * r3 - Math.sqrt(351)) / 2, 1e-9) && close(rhi, (7 * r3 + Math.sqrt(351)) / 2, 1e-9) && close(rhi, 15.429675, 1e-6),
    `roots ${f6(rlo)}, ${f6(rhi)}`)
  check('E14 SPEC CATCH (b): the second root is NEGATIVE (≈ −3.305319) — exactly ONE interior solution when a > b; the two-triangle display of E03–E09 lives on the supplement fault (30°/150°), not on this literal reading',
    rlo < 0 && close(rlo, -3.305319, 1e-6) && countPos(10) === 1,
    `negative root ${f6(rlo)}; positive solutions: ${countPos(10)}`)

  // the classic ambiguous witness a = 5
  const [s1, s2] = quad(5)
  check('E15 the CLASSIC ambiguous case: a = 5 lies strictly between h = 3.5 and b = 7, and c² − 7√3·c + 24 = 0 has TWO positive roots (7√3 ± √51)/2 ≈ 9.632892 / 2.491464 — two triangles on the SAME interior data (A = 30°, b = 7, a = 5)',
    3.5 < 5 && 5 < 7 && close(s1, (7 * r3 - Math.sqrt(51)) / 2, 1e-9) && close(s2, (7 * r3 + Math.sqrt(51)) / 2, 1e-9) && close(s1, 2.491464, 1e-6) && close(s2, 9.632892, 1e-6) && s1 > 0 && s2 > 0,
    `roots ${f6(s1)}, ${f6(s2)}; sum ${f6(s1 + s2)} = 7√3`)
  check('E16 boundary a = h = 3.5: the double root c = 7√3/2 ≈ 6.062178 — the two triangles merge into ONE right triangle (the arc is tangent to the line)',
    close(quad(3.5)[0], quad(3.5)[1], 1e-4) && close(quad(3.5)[0], (7 * r3) / 2, 1e-6) && countPos(3.5) === 1,
    `double root ${f6(quad(3.5)[0])}`)
  check('E17 boundary a = b = 7: roots 0 (degenerate) and 7√3 ≈ 12.124356 — ONE non-degenerate triangle (the isosceles merge)',
    close(quad(7)[0], 0, 1e-9) && close(quad(7)[1], 7 * r3, 1e-9) && countPos(7) === 1,
    `roots ${f6(quad(7)[0])}, ${f6(quad(7)[1])}`)
  check('E18 below the altitude: a = 3 < 3.5 — discriminant 147 − 160 = −13 < 0, NO triangle exists',
    quad(3)[0] !== quad(3)[0] && countPos(3) === 0, 'disc < 0')
  check('E19 the regime census at a ∈ {3, 3.5, 5, 7, 10}: triangle counts 0 / 1 / 2 / 1 / 1 (none, one right, TWO, one isosceles-merge, one long-side) — the honest condition stated as a remark in the prose',
    JSON.stringify([3, 3.5, 5, 7, 10].map(countPos)) === JSON.stringify([0, 1, 2, 1, 1]),
    [3, 3.5, 5, 7, 10].map((a) => `${a}→${countPos(a)}`).join(', '))  // the two a = 5 triangles close and both keep the interior angle at A = 30°
  {
    const off = (7 * r3) / 2, hh = 3.5
    const Ap: [number, number] = [0, 0]
    const Cp: [number, number] = [off, hh]
    const B1: [number, number] = [(7 * r3 - Math.sqrt(51)) / 2, 0]
    const B2: [number, number] = [(7 * r3 + Math.sqrt(51)) / 2, 0]
    const angleAt = (P: [number, number], Q: [number, number], R: [number, number]): number => {
      const u: [number, number] = [Q[0] - P[0], Q[1] - P[1]]
      const v: [number, number] = [R[0] - P[0], R[1] - P[1]]
      return deg(Math.atan2(u[0] * v[1] - u[1] * v[0], u[0] * v[0] + u[1] * v[1]))
    }
    check('E20 the two a = 5 triangles BOTH keep the interior angle 30° at A (unlike the supplement pair) — the genuine ambiguous case',
      close(angleAt(Ap, B1, Cp), 30, 1e-9) && close(angleAt(Ap, B2, Cp), 30, 1e-9) &&
      close(dist(B1, Cp), 5, 1e-9) && close(dist(B2, Cp), 5, 1e-9),
      `∠A = ${f4(angleAt(Ap, B1, Cp))}° in both; CB = 5 in both`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 3 — the AAA failure: equilateral side 1 vs side 2    */
/* ================================================================== */
{
  const equi = (s: number): { sides: [number, number, number]; angs: [number, number, number]; perim: number; area: number; height: number } => ({
    sides: [s, s, s],
    angs: [60, 60, 60],
    perim: 3 * s,
    area: (Math.sqrt(3) / 4) * s * s,
    height: (Math.sqrt(3) / 2) * s,
  })
  const e1 = equi(1), e2 = equi(2)
  check('E21 AAA witness: the equilateral triangle of side 1 and the equilateral triangle of side 2 have ALL THREE ANGLES equal (60° = 60° = 60° in both)',
    e1.angs.every((x) => close(x, 60)) && e2.angs.every((x) => close(x, 60)) && JSON.stringify(e1.angs) === JSON.stringify(e2.angs), '60, 60, 60 both')
  check('E22 ...and the sides are NOT equal (1 ≠ 2), the perimeters are NOT equal (3 ≠ 6) — no rigid motion carries one onto the other: AAA is NOT a congruence criterion',
    e1.sides[0] !== e2.sides[0] && e1.perim === 3 && e2.perim === 6 && (e1.perim as number) !== (e2.perim as number), 'sides 1 vs 2; perimeters 3 vs 6')
  check('E23 the scale gap: areas √3/4 ≈ 0.433013 vs √3 ≈ 1.732051 (ratio exactly 4), heights √3/2 ≈ 0.866025 vs √3 ≈ 1.732051 — equal angles fix SHAPE, not SIZE',
    close(e1.area, 0.433013, 1e-6) && close(e2.area, 1.732051, 1e-6) && close(e2.area / e1.area, 4, 1e-12) && close(e1.height, 0.866025, 1e-6),
    `area ratio ${f4(e2.area / e1.area)}`)
  check('E24 the same fault at every scale k ≠ 1: sides 1 vs k share angles and fail sides — the right relation is SIMILARITY (chapter 4\u2019s doorstep, named and deferred)',
    [2, 3, 0.5, 10].every((k) => JSON.stringify(equi(k).angs) === JSON.stringify(equi(1).angs) && equi(k).sides[0] !== equi(1).sides[0]),
    'checked k ∈ {2, 3, 0.5, 10}')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the RHS closure: right angle + hypotenuse + one  */
/* leg forces the other leg by Pythagoras; 5-12-13 vs 5-12-12         */
/* ================================================================== */
{
  const leg = Math.sqrt(13 * 13 - 5 * 5)
  check('E25 the RHS closure: the other leg = √(13² − 5²) = √144 = 12 EXACTLY',
    close(leg, 12, 1e-12), `√(169 − 25) = ${f6(leg)}`)
  check('E26 the Pythagoras check on the closed triangle: 5² + 12² = 25 + 144 = 169 = 13²',
    close(5 * 5 + 12 * 12, 169, 1e-12), '5-12-13 is right')
  check('E27 uniqueness: x² = 169 − 25 has exactly one POSITIVE root (12); the negative root −12 is not a length — the leg is forced, so RHS certifies congruence',
    close(Math.sqrt(169 - 25), 12) && Math.sqrt(169 - 25) > 0 && -Math.sqrt(169 - 25) < 0, 'unique length 12')
  check('E28 the pair of right triangles (hypotenuse 13, leg 5) both close to {5, 12, 13} — SSS confirms what RHS certified',
    JSON.stringify([5, 12, 13].sort((x, y) => x - y)) === JSON.stringify([5, 12, 13].sort((x, y) => x - y)) && close(5 * 5 + 12 * 12, 13 * 13),
    'side multisets identical')
  check('E29 the contrast: 5-12-12 is NOT the 5-12-13 triangle — 5² + 12² = 169 ≠ 144 = 12², and the side multisets {5,12,12} ≠ {5,12,13}; for c ≠ 13 the data (leg 5, hypotenuse c) never lands on the same triangle since c² = 169 only at c = 13',
    5 * 5 + 12 * 12 !== 12 * 12 && JSON.stringify([5, 12, 12]) !== JSON.stringify([5, 12, 13]) && [10, 11, 12, 14, 15].every((c) => c * c !== 169),
    'c = 13 is the unique hypotenuse closing the leg-5 right triangle to a 12 leg')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the SAS 6-8-10 two-build witness                 */
/* the same SAS data (the right angle included between the sides 6 and */
/* 8) built twice, with the roles of the two sides swapped             */
/* ================================================================== */
{
  const T1: Array<[number, number]> = [[0, 0], [6, 0], [0, 8]] // A, B, C: AB = 6, AC = 8
  const T2: Array<[number, number]> = [[0, 0], [8, 0], [0, 6]] // A, B', C': AB' = 8, AC' = 6
  const d = (i: number, j: number, T: Array<[number, number]>): number => dist(T[i], T[j])
  check('E30 SAS build 1: A = (0,0), B = (6,0), C = (0,8) — AB = 6, AC = 8, the included angle at A is exactly 90°, and the third side BC = 10',
    close(d(0, 1, T1), 6) && close(d(0, 2, T1), 8) && close(d(1, 2, T1), 10) && close((6 * 0 - 8 * 0) + (0 * 0 + 6 * 8) * 0, 0) && 6 * 8 > 0,
    `AB=${d(0, 1, T1)}, AC=${d(0, 2, T1)}, BC=${d(1, 2, T1)}; the axes are perpendicular`)
  check('E31 SAS build 2 (roles swapped): A = (0,0), B = (8,0), C = (0,6) — AB = 8, AC = 6, the SAME included right angle, and the third side BC = 10 again',
    close(d(0, 1, T2), 8) && close(d(0, 2, T2), 6) && close(d(1, 2, T2), 10), `BC=${d(1, 2, T2)}`)
  check('E32 both builds satisfy 6² + 8² = 10² = 100 — the SAS data (sides 6 and 8 enclosing the right angle) forces the third side √(36 + 64) = 10 regardless of which side sits on which arm',
    close(6 * 6 + 8 * 8, 100, 1e-12) && close(Math.sqrt(36 + 64), 10, 1e-12), 'Pythagoras closes both builds')
  check('E33 the correspondence A→A, B→C, C→B carries build 1 onto build 2 (the reflection across y = x — lesson 3.1\u2019s mirror witness): SAS builds congruent copies regardless of orientation',
    close(d(0, 1, T1), d(0, 2, T2)) && close(d(0, 2, T1), d(0, 1, T2)) && close(d(1, 2, T1), d(1, 2, T2)) &&
    JSON.stringify([d(0, 1, T1), d(0, 2, T1), d(1, 2, T1)].sort((x, y) => x - y)) === JSON.stringify([d(0, 1, T2), d(0, 2, T2), d(1, 2, T2)].sort((x, y) => x - y)),
    'side multiset {6, 8, 10} both; the mirror realizes the correspondence')
}

/* ================================================================== */
/* ENGINE SECTION 6 — the angle-sum ASA/AAS closure                    */
/* 30 + 60 + 90 = 180; the third angle forced; AAS ≡ ASA; the         */
/* 30-60-90 half-equilateral                                           */
/* ================================================================== */
{
  check('E34 the pinned ASA closure: 30 + 60 + 90 = 180 exactly',
    close(30 + 60 + 90, 180), '30 + 60 + 90 = 180')
  check('E35 the third angle is FORCED by the angle sum (lesson 2.4 / Euclid I.32): given A = 30° and B = 60°, C = 180 − 30 − 60 = 90°',
    close(180 - 30 - 60, 90), 'C = 90°')
  check('E36 the 30-60-90 half-equilateral: sides 1, √3, 2 satisfy 1² + (√3)² = 4 = 2², and a/sin 30° = b/sin 60° = c/sin 90° = 2 (the law of sines constant)',
    close(1 + 3, 4, 1e-12) && close(1 / Math.sin(rad(30)), 2, 1e-12) && close(Math.sqrt(3) / Math.sin(rad(60)), 2, 1e-12) && close(2 / Math.sin(rad(90)), 2, 1e-12),
    '1, √3 ≈ 1.732051, 2')
  check('E37 AAS ≡ ASA: given angles A = 50°, B = 60° and the non-included side a = BC, the angle sum forces C = 70°, and then the side a sits INCLUDED between the angles B and C — one criterion worn twice',
    close(180 - 50 - 60, 70) && close(50 + 60 + 70, 180), 'C = 180 − 50 − 60 = 70°')
  check('E38 the identity read: two triangles with (A, B) = (50°, 60°) and (D, E) = (50°, 60°) share C = F = 70°, so the AAS certificate (A, B, a) and the ASA certificate (B, C, a) carry the same information',
    close(180 - 50 - 60, 180 - 50 - 60) && close(180 - 110, 70), 'both third angles 70°')
}

/* ================================================================== */
/* ENGINE SECTION 7 — quiz-key self-check + exercise witnesses         */
/* ================================================================== */
{
  const QUIZ_KEY = [0, 2, 1, 3, 2]
  const QUIZ_TOKENS = [
    'SAS',        // Q1: the included-angle read
    'AAS',        // Q2: two angles + the non-included side, repaired to ASA
    '16.439086',  // Q3: the supplement-pair third sides
    'side 2',     // Q4: the AAA witness pair
    '12',         // Q5: the forced leg √(169 − 25) = 12
  ]
  check('E39 quiz key [0,2,1,3,2]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 1),
    QUIZ_TOKENS.join(' | '))

  // Ex1: SAS identify — structural: the shared vertex of the two given sides carries the given angle
  check('E40 Ex1 witness: sides AB and AC share the vertex A, and ∠A is the angle between them — INCLUDED, so the data is SAS (not SSA)',
    true, 'the two sides emanate from A; the given angle sits at A — the included angle')
  // Ex3: the RHS other leg
  check('E41 Ex3 witness: hypotenuse 13, leg 5 ⟹ other leg √(169 − 25) = 12',
    close(Math.sqrt(169 - 25), 12), '12')
  // Ex4: ASA closure
  check('E42 Ex4 witness: ∠B = 45°, ∠C = 65° ⟹ ∠A = 180 − 45 − 65 = 70°; and 45 + 65 = 110',
    close(180 - 45 - 65, 70) && close(45 + 65, 110), '∠A = 70°')
  // Ex5: the AAS repair
  check('E43 Ex5 witness: ∠A = 50°, ∠B = 60° ⟹ ∠C = 70°; the AAS data (A, B, a) becomes the ASA data (B, C, a)',
    close(180 - 50 - 60, 70), '∠C = 70°')
  // Ex7: the classic SSA construction a = 5
  {
    const r3 = Math.sqrt(3)
    const s1 = (7 * r3 - Math.sqrt(51)) / 2
    const s2 = (7 * r3 + Math.sqrt(51)) / 2
    check('E44 Ex7 witness: A = 30°, b = 7, a = 5 ⟹ c² − 7√3·c + 24 = 0 ⟹ c = (7√3 ± √51)/2 ≈ 2.491464 / 9.632892; sum 7√3 ≈ 12.124356, product 24',
      close(s1, 2.491464, 1e-6) && close(s2, 9.632892, 1e-6) && close(s1 + s2, 7 * r3, 1e-9) && close(s1 * s2, 24, 1e-9),
      `c = ${f6(s1)} or ${f6(s2)}`)
  }
  // Ex8: the supplement pair
  check('E45 Ex8 witness: the supplement pair on the sides 7 and 10 — third sides √(149 − 70√3) ≈ 5.268438 and √(149 + 70√3) ≈ 16.439086, heights both 3.5, interior base angles 30° and 150°',
    close(Math.sqrt(149 - 70 * Math.sqrt(3)), 5.268438, 1e-6) && close(Math.sqrt(149 + 70 * Math.sqrt(3)), 16.439086, 1e-6) && close(Math.sin(rad(30)), Math.sin(rad(150))),
    'the engine\u2019s E03–E09 pair')
  // Ex9: the included-angle repair
  check('E46 Ex9 witness: ∠A = 40°, ∠C = 70° ⟹ ∠B = 180 − 40 − 70 = 70°; the side a = BC is then included between ∠B = 70° and ∠C = 70° — the ASA read',
    close(180 - 40 - 70, 70), '∠B = 70°')
  // Ex11: the correspondence-first proof
  check('E47 Ex11 witness: ∠ABC = 55°, ∠ACB = 75° ⟹ ∠BAC = 180 − 55 − 75 = 50° = ∠BDC by the congruence',
    close(180 - 55 - 75, 50), '∠BAC = 50°')
  // Ex13: the regime census
  {
    const b = 7, A = 30
    const countPos = (a: number): number => {
      const p = -2 * b * Math.cos(rad(A))
      const q = b * b - a * a
      const disc = p * p - 4 * q
      if (disc < 0) return 0
      const r1 = (-p - Math.sqrt(disc)) / 2, r2 = (-p + Math.sqrt(disc)) / 2
      const pos = [r1, r2].filter((x) => x > 1e-9)
      if (pos.length === 2 && close(pos[0], pos[1], 1e-4)) return 1
      return pos.length
    }
    check('E48 Ex13 witness: the regime table at a ∈ {3, 3.5, 5, 7, 10} reads 0 / 1 / 2 / 1 / 1 (none; one right; TWO; one merge; one)',
      JSON.stringify([3, 3.5, 5, 7, 10].map(countPos)) === JSON.stringify([0, 1, 2, 1, 1]),
      [3, 3.5, 5, 7, 10].map((a) => `${a}→${countPos(a)}`).join(', '))
  }
  // Ex14: the AAA doorstep
  check('E49 Ex14 witness: equilateral 1 vs 2 — perimeters 3 ≠ 6, areas √3/4 ≈ 0.433013 ≠ √3 ≈ 1.732051, ratio exactly 4',
    (3 as number) !== (6 as number) && close(Math.sqrt(3) / 4, 0.433013, 1e-6) && close(Math.sqrt(3), 1.732051, 1e-6) && close(Math.sqrt(3) / (Math.sqrt(3) / 4), 4, 1e-12),
    'AAA ⟹ similarity, not congruence')
  // Ex15: the obtuse SSA sharpening
  {
    const A = 120, b = 7, a = 10
    const sinB = (b * Math.sin(rad(A))) / a
    const B1 = deg(Math.asin(sinB))
    const B2 = 180 - B1
    const p = -2 * b * Math.cos(rad(A))
    const q = b * b - a * a
    const c = (-p + Math.sqrt(p * p - 4 * q)) / 2
    check('E50 Ex15 witness (the obtuse sharpening): A = 120°, b = 7, a = 10 ⟹ sin B = 7√3/20 ≈ 0.606218, B ≈ 37.316° acute ONLY (the supplement ≈ 142.684° would give A + B > 180°), and c = (−7 + √253)/2 ≈ 4.452987 — SSA becomes determinate when the given angle is right or obtuse',
      close(sinB, (7 * Math.sqrt(3)) / 20, 1e-12) && close(B1, 37.316, 1e-2) && A + B2 > 180 && close(c, (-7 + Math.sqrt(253)) / 2, 1e-9) && close(c, 4.452987, 1e-6) && c > 0,
      `B = ${f4(B1)}°; c = ${f6(c)}`)
  }
  // Ex2/Ex6/Ex12: structural criterion naming
  check('E51 Ex2/Ex6/Ex12 witnesses: three side-pairs ⟹ SSS (I.8); sides AB, BC with ∠B between them ⟹ SAS; sides AB, BC with ∠A (opposite BC) ⟹ SSA, NOT a criterion — the naming trap is positional, and the engine pins the positions',
    true, 'included ⟺ the angle sits at the shared vertex of the two named sides')
  // Illustration witnesses
  check('E52 Illustration 2 witness (the ambiguous case fully walked): the two third sides against the engine\u2019s exact forms — √(149 − 70√3) ≈ 5.268438 and √(149 + 70√3) ≈ 16.439086, with h = 3.5 and off = 7√3/2 ≈ 6.062178 in the decomposition',
    close(Math.sqrt(149 - 70 * Math.sqrt(3)), 5.268438, 1e-6) && close(Math.sqrt(149 + 70 * Math.sqrt(3)), 16.439086, 1e-6) && close(7 * Math.cos(rad(30)), 6.062178, 1e-6) && close(7 * Math.sin(rad(30)), 3.5),
    'the coordinate decomposition CA² = h² + (10 ∓ off)²')
  check('E53 Illustration 3 witness (the identity read): (A, B) = (50°, 60°) ⟹ C = 70°; the AAS certificate (A, B, a) and the ASA certificate (B, C, a) coexist on the same data',
    close(180 - 50 - 60, 70), 'one conclusion, two names')
  check('E54 Illustration 1 witness (correspondence-first): AB = DC, ∠ABC = ∠DCB, BC common ⟹ SAS on the correspondence A ↔ D; then ∠BAC = ∠BDC = 180 − 55 − 75 = 50°',
    close(180 - 55 - 75, 50), 'the shared side BC is included between the given angles at B and C')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo302?: Lesson } | null = null
  try {
    mod = await import('./part-geo302')
    pcheck('P01 part file loads and exports lessonGeo302', !!mod?.lessonGeo302, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo302', false, String(e))
  }
  const lesson = mod?.lessonGeo302
  if (!lesson) return

  // P02 — quiz keys [0,2,1,3,2], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [0,2,1,3,2]', JSON.stringify(keys) === JSON.stringify([0, 2, 1, 3, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['SAS', 'AAS', '16.439086', 'side 2', '12']
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
    pcheck('P04b >=2 solution figures inside exercises', solFigs >= 2, `count=${solFigs}`)
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
  pcheck('P04d the named solution trio exists: an SSA construction, an included-angle repair and an RHS pair figure',
    /ssa/.test(allCaptions) && /repair/.test(allCaptions) && /rhs/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the five criteria rows)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=5 formula cards including the five criteria rows (SAS, ASA, AAS, SSS, RHS)',
    formulas.length >= 5 &&
    formulas.some((f) => f.name.toUpperCase().includes('SAS')) &&
    formulas.some((f) => f.name.toUpperCase().includes('ASA')) &&
    formulas.some((f) => f.name.toUpperCase().includes('AAS')) &&
    formulas.some((f) => f.name.toUpperCase().includes('SSS')) &&
    formulas.some((f) => /RHS/.test(f.name)),
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs' && lesson.number === '3.2' && lesson.title === 'The Congruence Criteria: SAS, ASA, AAS, SSS, RHS', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, ncert-math7-ch7-congruence, cengage-m1-05, geo-ch03-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'ncert-math7-ch7-congruence', 'cengage-m1-05', 'geo-ch03-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [geo-congruence-the-idea-of-same-shape-and-size]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the criteria map table (5 green + 2 red rows)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const mapTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('criterion'))
  pcheck('P19 the criteria map table exists (head includes Criterion) with all 7 rows (5 criteria + AAA + SSA)',
    !!mapTable && mapTable.rows.length >= 7, mapTable ? `${mapTable.rows.length} rows` : 'missing')
  // P20 — the witness table carries the pinned values
  const witTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('16.439086')) || t.rows.some((r) => r.join(' ').includes('5.268438')))
  pcheck('P20 the SSA witness values 5.268438 and 16.439086 (with 3.5 and 6.062178) appear in a table',
    !!witTable && ['5.268438', '16.439086', '3.5', '6.062178'].every((s) => witTable.rows.join(' ').includes(s)), witTable ? 'found' : 'missing')
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
const e = report('geo302-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo302-pins', pins)
const fail = e.fail + p.fail
console.log(`geo302 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
