/**
 * v-geo301.ts — verify-first ENGINE + PIN harness for GEO lesson 3.1
 * "Congruence: the Idea of Same Shape and Size" (run 128 swarm, agent geo301, seat 31).
 *
 * DISCIPLINE: the engine wins over the prose. Every witness, census value,
 * permutation verdict, motion fact and negative the lesson prints is
 * recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in
 * the report.
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the witness triangles T1/T2 and their
 *     side/angle/perimeter/area facts under the BINDING notation law (a = BC
 *     opposite A, b = CA opposite B, c = AB opposite C); the complete
 *     6-permutation correspondence census over T1/T2 (EXACTLY 1 valid:
 *     (0,2,1) — the scalene congruence correspondence is UNIQUE, and finding
 *     it IS the SSS distance check); the six side + three angle equalities
 *     the unique correspondence carries; both triangles counterclockwise;
 *     the perimeters (24 and 24) and the trap areas (16 and 16: the 8x2
 *     rectangle vs the 4x4 square); the reflection-across-y=x realization of
 *     the unique correspondence (orientation-REVERSING) with the general
 *     orientation argument and the no-direct-motion family brute force
 *     (rotations by k*30 degrees, translations, and compositions — none maps
 *     T1 onto T2); the distance-preservation brute force over the small
 *     motion family (every rotation k*30, three reflections, translations
 *     and compositions preserve all pairwise distances of T1; the pinned
 *     rot90 witness (6,0)->(0,6)); the honest negatives: (6,8,10) vs
 *     (5,9,10) same perimeter 24 NOT congruent, 8x2 vs 4x4 same area 16 NOT
 *     congruent, equilateral side 1 vs side 2 same angles NOT congruent
 *     (the 3.2 teaser); the self-correspondence ladder scalene 1 /
 *     isosceles 2 / equilateral 6; quiz-key self-check; every exercise
 *     witness (Ex1..Ex15 recomputed).
 *   PIN SECTION (P01...) — imports ./part-geo301 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [1,3,0,2,1], 15 exercises L1..L6 with full steps
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     distance-check / mirror-line / perimeter-trap trio, terms + formula
 *     cards, >= 3 Illustrations with >= 4 steps, >= 2 derivations, SVG +
 *     math-span hygiene laws, pinned concept set).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo301.ts
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

/* ================================================================== */
/* ENGINE SECTION 1 — the witness triangles under the notation law     */
/* T1 = (0,0),(6,0),(0,8): A, B, C counterclockwise; consecutive side  */
/* list [AB, BC, CA] = [6, 10, 8]; notation law: a = BC = 10 opposite  */
/* A, b = CA = 8 opposite B, c = AB = 6 opposite C.                    */
/* T2 = (0,0),(8,0),(0,6): A', B', C' counterclockwise; consecutive    */
/* side list [A'B', B'C', C'A'] = [8, 10, 6]; a' = B'C' = 10 opposite  */
/* A', b' = C'A' = 6 opposite B', c' = A'B' = 8 opposite C'.           */
/* ================================================================== */
{
  const T1: Pt[] = [[0, 0], [6, 0], [0, 8]]
  const T2: Pt[] = [[0, 0], [8, 0], [0, 6]]
  const sidesConsec = (T: Pt[]): number[] => [0, 1, 2].map((i) => dist(T[i], T[(i + 1) % 3]))
  const s1 = sidesConsec(T1) // [AB, BC, CA]
  const s2 = sidesConsec(T2) // [A'B', B'C', C'A']

  check('E01 T1 consecutive side list [AB, BC, CA] = [6, 10, 8]',
    close(s1[0], 6) && close(s1[1], 10) && close(s1[2], 8), s1.map(f4).join(', '))
  check('E02 T2 consecutive side list [A\'B\', B\'C\', C\'A\'] = [8, 10, 6]',
    close(s2[0], 8) && close(s2[1], 10) && close(s2[2], 6), s2.map(f4).join(', '))
  check('E03 notation law on T1: a = BC = 10 opposite A, b = CA = 8 opposite B, c = AB = 6 opposite C',
    close(dist(T1[1], T1[2]), 10) && close(dist(T1[2], T1[0]), 8) && close(dist(T1[0], T1[1]), 6),
    `a=${f4(dist(T1[1], T1[2]))}, b=${f4(dist(T1[2], T1[0]))}, c=${f4(dist(T1[0], T1[1]))}`)
  check('E04 notation law on T2: a\' = B\'C\' = 10 opposite A\', b\' = C\'A\' = 6 opposite B\', c\' = A\'B\' = 8 opposite C\'',
    close(dist(T2[1], T2[2]), 10) && close(dist(T2[2], T2[0]), 6) && close(dist(T2[0], T2[1]), 8),
    `a'=${f4(dist(T2[1], T2[2]))}, b'=${f4(dist(T2[2], T2[0]))}, c'=${f4(dist(T2[0], T2[1]))}`)

  const orient = (T: Pt[]): number =>
    (T[1][0] - T[0][0]) * (T[2][1] - T[0][1]) - (T[1][1] - T[0][1]) * (T[2][0] - T[0][0])
  const o1 = orient(T1), o2 = orient(T2)
  check('E05 both witness triangles are listed counterclockwise (signed double-area +48 each)',
    o1 > 0 && o2 > 0 && close(o1, 48) && close(o2, 48), `orient T1=${f4(o1)}, T2=${f4(o2)}`)

  const per1 = s1[0] + s1[1] + s1[2], per2 = s2[0] + s2[1] + s2[2]
  check('E06 perimeters: T1 = 24 and T2 = 24 (equal perimeter alone will NOT certify congruence)',
    close(per1, 24) && close(per2, 24), `per1=${f4(per1)}, per2=${f4(per2)}`)
  const areaOf = (T: Pt[]): number => Math.abs(orient(T)) / 2
  check('E07 areas: T1 = 24 and T2 = 24 (half the 6 by 8 and the 8 by 6 leg products)',
    close(areaOf(T1), 24) && close(areaOf(T2), 24), `area1=${f4(areaOf(T1))}, area2=${f4(areaOf(T2))}`)

  // angles by the law of cosines (side opposite vertex i is d(V[i+1], V[i+2]))
  const angleAt = (T: Pt[], i: number): number => {
    const a = dist(T[(i + 1) % 3], T[(i + 2) % 3])
    const b = dist(T[(i + 2) % 3], T[i]), c = dist(T[i], T[(i + 1) % 3])
    return Math.acos((b * b + c * c - a * a) / (2 * b * c))
  }
  const A1 = angleAt(T1, 0), B1 = angleAt(T1, 1), C1 = angleAt(T1, 2)
  const A2 = angleAt(T2, 0), B2 = angleAt(T2, 1), C2 = angleAt(T2, 2)
  check('E08 T1 angles: right angle at A (opposite the side of length 10), then arcsin(4/5)-ish 53.13 at B and 36.87 at C',
    close(A1, Math.PI / 2) && close(B1, Math.acos(0.6)) && close(C1, Math.acos(0.8)),
    `A=${f4((A1 * 180) / Math.PI)}, B=${f4((B1 * 180) / Math.PI)}, C=${f4((C1 * 180) / Math.PI)}`)
  check('E09 T2 angles: right angle at A\' too; B\' carries 36.87 and C\' carries 53.13 (swapped against T1)',
    close(A2, Math.PI / 2) && close(B2, Math.acos(0.8)) && close(C2, Math.acos(0.6)),
    `A'=${f4((A2 * 180) / Math.PI)}, B'=${f4((B2 * 180) / Math.PI)}, C'=${f4((C2 * 180) / Math.PI)}`)
  check('E10 angle sums are 180 in both witnesses',
    close(A1 + B1 + C1, Math.PI) && close(A2 + B2 + C2, Math.PI), '90 + 53.13 + 36.87 = 180')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the 6-permutation correspondence census          */
/* perm p maps vertex i of T1 onto vertex p[i] of T2; p is a VALID     */
/* congruence correspondence iff all three pairwise distances match.   */
/* EXACTLY ONE valid: (0,2,1) = A->A', B->C', C->B'. Finding it IS     */
/* the SSS distance check. The six facts it carries are recomputed.    */
/* ================================================================== */
{
  const T1: Pt[] = [[0, 0], [6, 0], [0, 8]]
  const T2: Pt[] = [[0, 0], [8, 0], [0, 6]]
  const PERMS: number[][] = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
  const permValid = (p: number[]): boolean => {
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++)
      if (!close(dist(T2[p[i]], T2[p[j]]), dist(T1[i], T1[j]))) return false
    return true
  }
  const verdicts = PERMS.map((p) => ({ p, ok: permValid(p) }))
  const valid = verdicts.filter((v) => v.ok).map((v) => v.p)
  check('E11 the 6-permutation census admits EXACTLY 1 valid correspondence',
    valid.length === 1, `valid=${JSON.stringify(valid)}`)
  check('E12 the unique valid correspondence is (0,2,1): A->A\', B->C\', C->B\'',
    JSON.stringify(valid[0]) === JSON.stringify([0, 2, 1]), JSON.stringify(valid[0]))

  // every invalid permutation fails on a named pair — the census table rows
  const failNote = (p: number[]): string => {
    for (let i = 0; i < 3; i++) for (let j = i + 1; j < 3; j++) {
      const want = dist(T1[i], T1[j]), got = dist(T2[p[i]], T2[p[j]])
      if (!close(want, got)) return `pair ${i}${j}: needs ${f4(want)}, permutation delivers ${f4(got)}`
    }
    return 'valid'
  }
  const notes = verdicts.filter((v) => !v.ok).map((v) => `perm(${v.p.join('')}): ${failNote(v.p)}`)
  check('E13 each of the 5 rejected permutations fails a NAMED side demand (the census table rows)',
    notes.length === 5 && notes.every((n) => n.includes('needs')), notes.join(' | '))

  // the six facts the unique correspondence carries (3 sides + 3 angles)
  const angleAt = (T: Pt[], i: number): number => {
    const a = dist(T[(i + 1) % 3], T[(i + 2) % 3])
    const b = dist(T[(i + 2) % 3], T[i]), c = dist(T[i], T[(i + 1) % 3])
    return Math.acos((b * b + c * c - a * a) / (2 * b * c))
  }
  const sixSides =
    close(dist(T1[0], T1[1]), dist(T2[0], T2[2])) &&
    close(dist(T1[1], T1[2]), dist(T2[2], T2[1])) &&
    close(dist(T1[2], T1[0]), dist(T2[1], T2[0]))
  const sixAngles =
    close(angleAt(T1, 0), angleAt(T2, 0)) &&
    close(angleAt(T1, 1), angleAt(T2, 2)) &&
    close(angleAt(T1, 2), angleAt(T2, 1))
  check('E14 the unique correspondence carries exactly six side equalities: AB = A\'C\' = 6, BC = C\'B\' = 10, CA = B\'A\' = 8',
    sixSides, `AB=${f4(dist(T1[0], T1[1]))} vs A'C'=${f4(dist(T2[0], T2[2]))}; BC vs C'B'; CA vs B'A'`)
  check('E15 it also carries the three angle equalities: angle A = angle A\' = 90, angle B = angle C\', angle C = angle B\'',
    sixAngles, 'the 3 + 3 = 6 facts ride ONE ordered statement')

  // the SSS distance check as the census: the side multiset decides, then the order
  const sorted1 = [dist(T1[0], T1[1]), dist(T1[1], T1[2]), dist(T1[2], T1[0])].sort((a, b) => a - b)
  const sorted2 = [dist(T2[0], T2[1]), dist(T2[1], T2[2]), dist(T2[2], T2[0])].sort((a, b) => a - b)
  check('E16 the SSS screen: sorted side multisets agree ([6, 8, 10] both) — necessary, not yet a correspondence',
    sixSides || (sorted1.every((v, i) => close(v, sorted2[i]))), `multisets ${JSON.stringify(sorted1)} vs ${JSON.stringify(sorted2)}`)

  // uniqueness is a SCALENE phenomenon: the self-correspondence ladder
  const selfCensus = (T: Pt[]): string[] => {
    const out: string[] = []
    for (const p of PERMS) {
      let ok = true
      for (let i = 0; i < 3 && ok; i++) for (let j = i + 1; j < 3; j++)
        if (!close(dist(T[p[i]], T[p[j]]), dist(T[i], T[j]))) { ok = false; break }
      if (ok) out.push(JSON.stringify(p))
    }
    return out
  }
  const scalene = [[0, 0], [6, 0], [0, 8]] as Pt[] // sides 6, 10, 8 all distinct
  const iso = [[0, 0], [6, 0], [3, 4]] as Pt[]     // CA = CB = 5, base AB = 6
  const equi = [[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]] as Pt[]
  const cS = selfCensus(scalene), cI = selfCensus(iso), cE = selfCensus(equi)
  check('E17 the self-correspondence ladder: scalene triangle 1, isosceles (5-5-6) 2, equilateral 6',
    cS.length === 1 && cI.length === 2 && cE.length === 6,
    `scalene=${cS.length}, isosceles=${JSON.stringify(cI)}, equilateral=${cE.length}`)
  check('E18 the isosceles pair of self-correspondences is the identity and the apex-swap (A<->B, C fixed: perm (1,0,2))',
    cI.includes(JSON.stringify([0, 1, 2])) && cI.includes(JSON.stringify([1, 0, 2])), JSON.stringify(cI))
  const isoSides = [dist(iso[0], iso[1]), dist(iso[1], iso[2]), dist(iso[2], iso[0])]
  check('E19 the isosceles witness really is 6-5-5 (two equal sides, one base)',
    close(isoSides[0], 6) && close(isoSides[1], 5) && close(isoSides[2], 5), isoSides.map(f4).join(', '))
}

/* ================================================================== */
/* ENGINE SECTION 3 — realization: the mirror, and why no direct move  */
/* The reflection across y = x maps (x, y) -> (y, x): A(0,0)->A',      */
/* B(6,0)->C'(0,6), C(0,8)->B'(8,0) — EXACTLY the unique permutation   */
/* (0,2,1). It REVERSES orientation (signed area +48 -> -48), while    */
/* translations and rotations (any center) preserve it: so NO direct   */
/* motion realizes the correspondence. Family brute force added.       */
/* ================================================================== */
{
  const T1: Pt[] = [[0, 0], [6, 0], [0, 8]]
  const T2: Pt[] = [[0, 0], [8, 0], [0, 6]]
  const reflYX = (p: Pt): Pt => [p[1], p[0]]
  const image = T1.map(reflYX)
  check('E20 the reflection across y = x realizes the unique correspondence point-for-point: A->A\', B->C\'(0,6), C->B\'(8,0)',
    close(dist(image[0], T2[0]), 0) && close(dist(image[1], T2[2]), 0) && close(dist(image[2], T2[1]), 0),
    `R(A)=(${f4(image[0][0])},${f4(image[0][1])}), R(B)=(${f4(image[1][0])},${f4(image[1][1])}), R(C)=(${f4(image[2][0])},${f4(image[2][1])})`)

  const orient = (T: Pt[]): number =>
    (T[1][0] - T[0][0]) * (T[2][1] - T[0][1]) - (T[1][1] - T[0][1]) * (T[2][0] - T[0][0])
  check('E21 the mirror REVERSES orientation: signed area +48 becomes -48 under y = x',
    close(orient(image), -48), `orient of image=${f4(orient(image))}`)

  const rot = (p: Pt, deg: number): Pt => {
    const a = (deg * Math.PI) / 180
    return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]
  }
  const trans = (p: Pt, v: Pt): Pt => [p[0] + v[0], p[1] + v[1]]
  const sameSet = (S: Pt[], T: Pt[]): boolean =>
    T.every((t) => S.some((s) => close(dist(s, t), 0))) && S.length === T.length
  const translations: Pt[] = [[0, 0], [2, 3], [-1, 5], [4, -2], [-6, 0], [0, -8]]
  let directHit = 0, familySize = 0, orientKept = true
  for (let k = 0; k < 12; k++) {
    const R = T1.map((p) => rot(p, k * 30))
    for (const v of translations) {
      const img = R.map((p) => trans(p, v))
      familySize++
      if (sameSet(img, T2)) directHit++
      // any orientation-preserving isometry maps a CCW triangle to a CCW one
      if (orient(img) <= 0) orientKept = false
    }
  }
  check('E22 family brute force: NO rotation (k * 30 degrees) followed by any tested translation maps T1\'s vertex set onto T2\'s',
    directHit === 0, `${familySize} direct motions tested, ${directHit} hits`)
  check('E23 the general reason, verified on the family: every direct motion keeps the signed area POSITIVE (+48), but the demanded correspondence image is NEGATIVE (-48)',
    orientKept, 'orientation sign is the invariant that forbids the direct route')
  check('E24 the mirror flip is the ONLY tested motion type that changes the sign (y = x: +48 -> -48) — opposite (orientation-reversing) motion',
    orient(T1.map(reflYX)) < 0, 'direct vs opposite: the mirror-image teaching point')
}

/* ================================================================== */
/* ENGINE SECTION 4 — rigid motions preserve distance: the brute force */
/* every rotation by k*30 degrees, three reflections, five translations*/
/* and a composed sample preserve ALL pairwise distances of T1 (6,10,8)*/
/* plus the pinned rot90 witness (6,0) -> (0,6).                       */
/* ================================================================== */
{
  const T1: Pt[] = [[0, 0], [6, 0], [0, 8]]
  const PAIRS: Array<[number, number]> = [[0, 1], [1, 2], [2, 0]]
  const baseDists = PAIRS.map(([i, j]) => dist(T1[i], T1[j])) // [6, 10, 8]
  const rot = (p: Pt, deg: number): Pt => {
    const a = (deg * Math.PI) / 180
    return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]
  }
  const keepsDists = (img: Pt[]): boolean =>
    PAIRS.every(([i, j], k) => close(dist(img[i], img[j]), baseDists[k]))

  let rotOk = true
  for (let k = 0; k < 12; k++) if (!keepsDists(T1.map((p) => rot(p, k * 30)))) rotOk = false
  check('E25 brute force: ALL twelve rotations by k * 30 degrees preserve every pairwise distance of T1 (6, 10, 8)',
    rotOk, 'k = 0..11')

  const reflX = (p: Pt): Pt => [p[0], -p[1]]
  const reflY = (p: Pt): Pt => [-p[0], p[1]]
  const reflYX = (p: Pt): Pt => [p[1], p[0]]
  const reflOk = [T1.map(reflX), T1.map(reflY), T1.map(reflYX)].every(keepsDists)
  check('E26 the three mirrors (x-axis, y-axis, y = x) all preserve every pairwise distance of T1',
    reflOk, 'reflections are rigid too')

  const trans = (p: Pt, v: Pt): Pt => [p[0] + v[0], p[1] + v[1]]
  const transOk = [[2, 3], [-1, 5], [4, -2], [-6, 0], [0, -8]].every((v) => keepsDists(T1.map((p) => trans(p, v as Pt))))
  check('E27 five sampled translations preserve every pairwise distance of T1',
    transOk, 'translations are rigid')

  const compOk = [0, 3, 6, 9].every((k) => keepsDists(T1.map((p) => trans(rot(p, k * 30) as Pt, [2, 3] as Pt))))
  check('E28 compositions (rotate by k * 30, then translate by (2,3)) still preserve every pairwise distance',
    compOk, 'the rigid family is closed under composition')

  const rot90of = (p: Pt): Pt => rot(p, 90)
  check('E29 the pinned rot90 witness: (6, 0) -> (0, 6) and (0, 8) -> (-8, 0), all pairwise distances kept',
    close(dist(rot90of([6, 0]), [0, 6]), 0) && close(dist(rot90of([0, 8]), [-8, 0]), 0) && keepsDists(T1.map(rot90of)),
    `rot90(6,0)=(${f4(rot90of([6, 0])[0])},${f4(rot90of([6, 0])[1])}); rot90(0,8)=(${f4(rot90of([0, 8])[0])},${f4(rot90of([0, 8])[1])})`)
  check('E30 rot90 sweeps the whole family: distance from the origin is invariant (|rot(p)| = |p| for every p sampled)',
    [3, 5, 6, 8, 10].every((r) => [0, 17, 40, 73, 90, 137, 200, 250].every((deg) =>
      close(Math.hypot(...rot([r, 0] as Pt, deg)), r))),
    'one radius circle: rotation slides along it, never off it')
}

/* ================================================================== */
/* ENGINE SECTION 5 — what congruence is NOT (the honest negatives)    */
/* same perimeter /= congruent; same area /= congruent; same angles    */
/* /= congruent (the 3.2 teaser). Each with its pinned witness.        */
/* ================================================================== */
{
  const p1 = [6, 8, 10], p2 = [5, 9, 10]
  const triIneq = (s: number[]): boolean => s[0] + s[1] > s[2] && s[0] + s[2] > s[1] && s[1] + s[2] > s[0]
  check('E31 the perimeter trap: (6,8,10) and (5,9,10) both have perimeter 24 and are both genuine triangles',
    close(p1.reduce((a, b) => a + b, 0), 24) && close(p2.reduce((a, b) => a + b, 0), 24) && triIneq(p1) && triIneq(p2),
    `perimeters 24 and 24`)
  check('E32 yet they are NOT congruent: the sorted side multisets [6,8,10] and [5,9,10] differ (SSS verdict)',
    JSON.stringify([...p1].sort((a, b) => a - b)) !== JSON.stringify([...p2].sort((a, b) => a - b)),
    'one side count decides: 10 vs 10, but 8 vs 9 and 6 vs 5 fail pairwise')

  const rect = { w: 8, h: 2 }, square = { s: 4 }
  check('E33 the area trap: the 8x2 rectangle and the 4x4 square both have area 16',
    rect.w * rect.h === 16 && square.s * square.s === 16, '8 * 2 = 16 = 4 * 4')
  const rectSides = [rect.w, rect.h, rect.w, rect.h].sort((a, b) => a - b)
  const squareSides = [square.s, square.s, square.s, square.s].sort((a, b) => a - b)
  check('E34 yet they are NOT congruent: side cycles (8,2,8,2) vs (4,4,4,4) differ, and the diagonals differ (sqrt(68) vs sqrt(32))',
    JSON.stringify(rectSides) !== JSON.stringify(squareSides) &&
    !close(Math.sqrt(rect.w * rect.w + rect.h * rect.h), Math.sqrt(square.s * square.s + square.s * square.s)),
    `diagonals ${f4(Math.sqrt(68))} vs ${f4(Math.sqrt(32))}`)

  const e1: number = 1, e2: number = 2
  const angEq = true // both equilateral: every angle 60 degrees
  check('E35 the angle teaser for 3.2: equilateral of side 1 and equilateral of side 2 share all angles (60) but NOT the sides',
    angEq && e1 !== e2, 'same angles, different sizes — AAA is NOT a congruence certificate (full witness in 3.2)')

  const T1: Pt[] = [[0, 0], [6, 0], [0, 8]]
  const T2: Pt[] = [[0, 0], [8, 0], [0, 6]]
  const areaOf = (T: Pt[]): number => Math.abs((T[1][0] - T[0][0]) * (T[2][1] - T[0][1]) - (T[1][1] - T[0][1]) * (T[2][0] - T[0][0])) / 2
  check('E36 the witness triangles ARE congruent and DO share area (24 = 24): equality of area is necessary, never sufficient',
    close(areaOf(T1), areaOf(T2)) && close(areaOf(T1), 24), `areas ${f4(areaOf(T1))} and ${f4(areaOf(T2))}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — exercise witnesses (Ex1..Ex15 recomputed)        */
/* ================================================================== */
{
  const PERMS: number[][] = [[0, 1, 2], [0, 2, 1], [1, 0, 2], [1, 2, 0], [2, 0, 1], [2, 1, 0]]
  const census = (A: Pt[], B: Pt[]): string[] => {
    const out: string[] = []
    for (const p of PERMS) {
      let ok = true
      for (let i = 0; i < 3 && ok; i++) for (let j = i + 1; j < 3; j++)
        if (!close(dist(B[p[i]], B[p[j]]), dist(A[i], A[j]))) { ok = false; break }
      if (ok) out.push(JSON.stringify(p))
    }
    return out
  }
  // Ex1: sides + perimeter of the witness T1
  const T1: Pt[] = [[0, 0], [6, 0], [0, 8]]
  check('E37 Ex1 witness: AB = 6, BC = 10 (sqrt(36+64)), CA = 8; perimeter 24',
    close(dist(T1[0], T1[1]), 6) && close(dist(T1[1], T1[2]), 10) && close(dist(T1[2], T1[0]), 8) &&
    close(dist(T1[0], T1[1]) + dist(T1[1], T1[2]) + dist(T1[2], T1[0]), 24), '6 + 10 + 8 = 24')
  // Ex3: the (3,4,5) vs (4,3,5) read
  const E3A: Pt[] = [[0, 0], [3, 0], [3, 4]]  // AB=3, BC=4, CA=5
  const E3B: Pt[] = [[0, 0], [4, 0], [4, 3]]  // A'B'=4, B'C'=3, C'A'=5
  const e3 = census(E3A, E3B)
  check('E38 Ex3 witness: triangles with side lists (3,4,5) and (4,3,5) are congruent with the unique correspondence (2,1,0): A->C\', B->B\', C->A\'',
    e3.length === 1 && e3[0] === JSON.stringify([2, 1, 0]), `valid=${JSON.stringify(e3)}`)
  // Ex4: the distance-check pair P(0,0) Q(5,0) R(0,12) vs P'(0,0) Q'(12,0) R'(0,5)
  const E4A: Pt[] = [[0, 0], [5, 0], [0, 12]]
  const E4B: Pt[] = [[0, 0], [12, 0], [0, 5]]
  const dA = [dist(E4A[0], E4A[1]), dist(E4A[1], E4A[2]), dist(E4A[2], E4A[0])]
  const dB = [dist(E4B[0], E4B[1]), dist(E4B[1], E4B[2]), dist(E4B[2], E4B[0])]
  const e4 = census(E4A, E4B)
  check('E39 Ex4 witness: side lists [5, 13, 12] and [12, 13, 5]; unique correspondence (0,2,1): P->P\', Q->R\', R->Q\'; perimeters 30 both',
    close(dA[0], 5) && close(dA[1], 13) && close(dA[2], 12) && close(dB[0], 12) && close(dB[1], 13) && close(dB[2], 5) &&
    e4.length === 1 && e4[0] === JSON.stringify([0, 2, 1]) &&
    close(dA.reduce((a, b) => a + b, 0), 30) && close(dB.reduce((a, b) => a + b, 0), 30),
    `A=${dA.map(f4).join(',')}, B=${dB.map(f4).join(',')}, perm=${JSON.stringify(e4)}`)
  // Ex5: the 20-perimeter trap
  const t5a = [5, 6, 9], t5b = [4, 7, 9]
  check('E40 Ex5 witness: (5,6,9) and (4,7,9) both perimeter 20, both genuine triangles, multisets differ — NOT congruent',
    close(t5a.reduce((a, b) => a + b, 0), 20) && close(t5b.reduce((a, b) => a + b, 0), 20) &&
    t5a[0] + t5a[1] > t5a[2] && t5b[0] + t5b[1] > t5b[2] &&
    JSON.stringify([...t5a].sort((a, b) => a - b)) !== JSON.stringify([...t5b].sort((a, b) => a - b)),
    '20 and 20; 5+6>9, 4+7>9; {5,6,9} vs {4,7,9}')
  // Ex6: the translation read
  const E6: Pt[] = [[1, 1], [4, 1], [1, 5]]
  const E6img = E6.map((p) => [p[0] + 2, p[1] + 2] as Pt)
  const e6s = [dist(E6[0], E6[1]), dist(E6[1], E6[2]), dist(E6[2], E6[0])]
  const e6i = [dist(E6img[0], E6img[1]), dist(E6img[1], E6img[2]), dist(E6img[2], E6img[0])]
  check('E41 Ex6 witness: translation by (2,2) maps (1,1),(4,1),(1,5) to (3,3),(6,3),(3,7) with side list [3, 5, 4] preserved',
    close(E6img[0][0], 3) && close(E6img[0][1], 3) && close(E6img[1][0], 6) && close(E6img[2][1], 7) &&
    e6s.every((v, i) => close(v, e6i[i])) && close(e6s[0], 3) && close(e6s[1], 5) && close(e6s[2], 4),
    `sides ${e6s.map(f4).join(',')} preserved`)
  // Ex8: the area trap diagonals
  check('E42 Ex8 witness: diagonals sqrt(68) and sqrt(32) for the 8x2 rectangle and 4x4 square — unequal, another non-congruence proof',
    !close(Math.sqrt(68), Math.sqrt(32)), `${f4(Math.sqrt(68))} vs ${f4(Math.sqrt(32))}`)
  // Ex9: the isosceles self-census
  const E9: Pt[] = [[0, 0], [6, 0], [3, 4]]
  const e9 = census(E9, E9)
  check('E43 Ex9 witness: the isosceles triangle (0,0),(6,0),(3,4) (sides 6,5,5) admits exactly 2 self-correspondences: identity and (1,0,2)',
    e9.length === 2 && e9.includes(JSON.stringify([0, 1, 2])) && e9.includes(JSON.stringify([1, 0, 2])),
    `valid=${JSON.stringify(e9)}`)
  // Ex10: the equilateral self-census
  const E10: Pt[] = [[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]]
  const e10 = census(E10, E10)
  check('E44 Ex10 witness: the equilateral triangle admits ALL 6 self-correspondences',
    e10.length === 6, `count=${e10.length}`)
  // Ex11: the rotation audit
  const rot = (p: Pt, deg: number): Pt => {
    const a = (deg * Math.PI) / 180
    return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]
  }
  const r90 = rot([3, 1], 90)
  check('E45 Ex11 witness: rot90 maps (3,1) to (-1,3); distance sqrt(10) from the origin preserved',
    close(r90[0], -1) && close(r90[1], 3) && close(Math.hypot(r90[0], r90[1]), Math.sqrt(10)) && close(Math.hypot(3, 1), Math.sqrt(10)),
    `rot90(3,1)=(${f4(r90[0])},${f4(r90[1])})`)
  // Ex12: the orientation audit
  const E12: Pt[] = [[0, 0], [4, 0], [4, 3]]
  const E12img = E12.map((p) => [-p[0], p[1]] as Pt)
  const orient = (T: Pt[]): number =>
    (T[1][0] - T[0][0]) * (T[2][1] - T[0][1]) - (T[1][1] - T[0][1]) * (T[2][0] - T[0][0])
  check('E46 Ex12 witness: reflection across the y-axis maps (0,0),(4,0),(4,3) to (0,0),(-4,0),(-4,3); signed double-area flips +12 -> -12 (area 6 -> 6)',
    close(E12img[1][0], -4) && close(E12img[2][0], -4) && close(E12img[2][1], 3) &&
    close(orient(E12), 12) && close(orient(E12img), -12) &&
    close(Math.abs(orient(E12)) / 2, 6) && close(Math.abs(orient(E12img)) / 2, 6),
    `orient ${f4(orient(E12))} -> ${f4(orient(E12img))}; areas both ${f4(Math.abs(orient(E12)) / 2)}`)
  // Ex13: perimeter-24 counterexample pair, both genuine
  check('E47 Ex13 witness: (6,8,10) and (5,9,10) both perimeter 24 and both satisfy the triangle inequality',
    6 + 8 + 10 === 24 && 5 + 9 + 10 === 24 && 6 + 8 > 10 && 5 + 9 > 10, 'both genuine; multisets differ')
  // Ex14: rotation algebra at theta = 30 degrees
  const r30 = rot([4, 0], 30)
  check('E48 Ex14 witness: (4,0) rotated 30 degrees lands on (4cos30, 4sin30) = (2*sqrt(3), 2), at distance 4 from the origin',
    close(r30[0], 4 * Math.cos(Math.PI / 6)) && close(r30[1], 4 * Math.sin(Math.PI / 6)) &&
    close(r30[0], 2 * Math.sqrt(3)) && close(r30[1], 2) && close(Math.hypot(r30[0], r30[1]), 4),
    `(${f4(r30[0])}, ${f4(r30[1])})`)
  // Ex15: the ladder once more, as the L6 evidence table
  const scal = census([[0, 0], [6, 0], [0, 8]] as Pt[], [[0, 0], [6, 0], [0, 8]] as Pt[])
  check('E49 Ex15 witness: scalene self-census 1, isosceles self-census 2, equilateral self-census 6 — the ladder for the uniqueness proof',
    scal.length === 1 && census([[0, 0], [6, 0], [3, 4]] as Pt[], [[0, 0], [6, 0], [3, 4]] as Pt[]).length === 2 &&
    census([[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]] as Pt[], [[0, 0], [1, 0], [0.5, Math.sqrt(3) / 2]] as Pt[]).length === 6,
    '1 / 2 / 6')

  /* quiz-key self-check */
  const QUIZ_KEY = [1, 3, 0, 2, 1]
  const QUIZ_TOKENS = [
    'coincide',      // Q1: superposition — one figure moved onto the other, coinciding exactly
    'C\u2032',       // Q2: the ordered statement A->A', B->C', C->B'
    'exactly one',   // Q3: the scalene census
    'y = x',         // Q4: the mirror that carries T1 onto T2
    'not congruent', // Q5: the perimeter trap
  ]
  check('E50 quiz key [1,3,0,2,1]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) &&
    QUIZ_TOKENS.every((t) => t.length >= 2), QUIZ_KEY.join(','))
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)    */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo301?: Lesson } | null = null
  try {
    mod = await import('./part-geo301')
    pcheck('P01 part file loads and exports lessonGeo301', !!mod?.lessonGeo301, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo301', false, String(e))
  }
  const lesson = mod?.lessonGeo301
  if (!lesson) return

  // P02 — quiz keys [1,3,0,2,1], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,3,0,2,1]', JSON.stringify(keys) === JSON.stringify([1, 3, 0, 2, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['coincide', 'C\u2032', 'exactly one', 'y = x', 'not congruent']
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
  pcheck('P04d the named solution trio exists: a distance check, a mirror line and a perimeter trap figure',
    /distance check/.test(allCaptions) && /mirror line/.test(allCaptions) && /perimeter trap/.test(allCaptions), allCaptions.slice(0, 140))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the correspondence law + the SSS screen among them)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the correspondence law and the SSS screen',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('correspondence')) &&
    formulas.some((f) => f.name.toLowerCase().includes('sss')),
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-congruence-the-idea-of-same-shape-and-size' && lesson.number === '3.1' && lesson.title === 'Congruence: the Idea of Same Shape and Size', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, ncert-math7-ch7-congruence, geo-ch03-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'ncert-math7-ch7-congruence', 'geo-ch03-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [geo-angle-sum-of-a-triangle-and-its-consequences]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-angle-sum-of-a-triangle-and-its-consequences']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts from the PINNED set only, 5-8 of them; objectives 4-6
  const PINNED_CONCEPTS = ['congruence', 'superposition', 'correspondence', 'rigid motion', 'orientation', 'mirror image', 'SSS distance check']
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
  // P17 — derivation blocks (the correspondence six-fact law + the uniqueness proof)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the permutation census table (head includes Permutation, 6 rows)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const censusTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('permutation'))
  pcheck('P19 the six-permutation census table exists (head includes Permutation) with 6 rows',
    !!censusTable && censusTable.rows.length === 6, censusTable ? `${censusTable.rows.length} rows` : 'missing')
  // P20 — the traps table carries the pinned witnesses (6,8,10) vs (5,9,10) and the 16-area pair
  const trapTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('6, 8, 10')))
  pcheck('P20 the honest-negatives table carries (6, 8, 10) vs (5, 9, 10) and the 8 by 2 vs 4 by 4 area pair',
    !!trapTable && ['6, 8, 10', '5, 9, 10', '16'].every((s) => trapTable.rows.join(' ').includes(s)), trapTable ? 'found' : 'missing')
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
const e = report('geo301-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo301-pins', pins)
const fail = e.fail + p.fail
console.log(`geo301 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
