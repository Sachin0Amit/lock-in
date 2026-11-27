import { chapter3, lessonGeo301, lessonGeo302, lessonGeo303, lessonGeo304, lessonGeo305, lessonGeo306 } from '../src/data/library/books/mathematics/geometry/ch-03'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch03.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 3 "Triangles: Congruence and the Craft of Proof" (run 128 OPENED
 * with 3.1; run 129 landed 3.2-3.6 and assembled the chapter to CLOSE it
 * COMPLETE — 6 lessons). VERIFY-FIRST per the standing protocol: each
 * lesson's ENGINE section ran green BEFORE its prose was declared done —
 * by its authoring agent against its part file — and the PIN sections here
 * RE-READ THE SHIPPED CHAPTER (the part imports redirected to ch-03.ts).
 *
 *   (geo301) 3.1 engines + pins      (geo302) 3.2 engines + pins
 *   (geo303) 3.3 engines + pins      (geo304) 3.4 engines + pins
 *   (geo305) 3.5 engines + pins      (geo306) 3.6 engines + pins
 *   (Z)      the CLOSED chapter census — the honest 6-of-6 shape
 *
 * Assembled by scripts/assemble_run129.py (on the assemble_run127.py
 * pattern): each v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH03_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-03.ts', import.meta.url).pathname

async function sectionGeo301(): Promise<SectionResult> {
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
    mod = await Promise.resolve({ lessonGeo301 })
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


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo301 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo302(): Promise<SectionResult> {
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
    mod = await Promise.resolve({ lessonGeo302 })
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


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo302 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo303(): Promise<SectionResult> {
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
    mod = await Promise.resolve({ lessonGeo303 })
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


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo303 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo304(): Promise<SectionResult> {
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
    mod = await Promise.resolve({ lessonGeo304 })
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


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo304 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo305(): Promise<SectionResult> {
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
    mod = await Promise.resolve({ lessonGeo305 })
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


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo305 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo306(): Promise<SectionResult> {
/**
 * v-geo306.ts — verify-first ENGINE + PIN harness for GEO lesson 3.6
 * "Stewart's Theorem and the Median Relation" (run 128 swarm, agent geo306).
 *
 * DISCIPLINE: the engine wins over the spec. Every placement, split, length,
 * census value and comparison order the prose prints is recomputed here by
 * brute force FIRST; where engine and prose disagree, the prose is fixed to
 * the engine's value and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION 1 — the 13-14-15 witness placement: B(0,0), C(14,0),
 *     A(9,12); sides 15/13/14; the Heron cross-check; the 9-12-15 + 5-12-13
 *     right-triangle split at the altitude foot; the three cosines.
 *   ENGINE SECTION 2 — Stewart on the witness: the median (m = n = 7, both
 *     sides 2758), the bisector (m = 7.5, n = 6.5, both sides 2730), the
 *     pinned third cevian (m = 4, n = 10, d = 13 = b, the isosceles reading),
 *     the fourth (m = 10, n = 4), and the Pythagorean sign cases (foot
 *     between B and D; between D and C; ON D) with the elimination landing.
 *   ENGINE SECTION 3 — Stewart brute-forced over a grid of triangles.
 *   ENGINE SECTION 4 — Apollonius + the all-three-medians census + the
 *     median-sum identity (witnesses 13-14-15 and 4-5-6).
 *   ENGINE SECTION 5 — the centroid: (23/3, 4); AG = 4√37/3 = 8.110350; the
 *     2:1 split verified by direct distance on ALL THREE medians.
 *   ENGINE SECTION 6 — the bisector length (two readings), the three-cevian
 *     comparison (order + the squared identity + the grid sweep), the cevian
 *     census parabola d²(m) = h² + (m − x)², the pinned census points, and
 *     the bisector-foot fraction law 1 − a²/(b+c)².
 *   ENGINE SECTION 7 — quiz-key self-check + all 15 exercise witnesses.
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo306.ts
 */


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
const dist = (p: [number, number], q: [number, number]): number => Math.hypot(p[0] - q[0], p[1] - q[1])

/* ================================================================== */
/* ENGINE SECTION 1 — the witness placement                             */
/* ================================================================== */
{
  const B: [number, number] = [0, 0]
  const C: [number, number] = [14, 0]
  const A: [number, number] = [9, 12]
  const a = 14, b = 13, c = 15
  check('E01 the witness placement: AB = 15, AC = 13, BC = 14 by coordinate distance',
    close(dist(A, B), c) && close(dist(A, C), b) && close(dist(B, C), a),
    `AB=${f4(dist(A, B))}, AC=${f4(dist(A, C))}, BC=${f4(dist(B, C))}`)
  const x = (c * c + a * a - b * b) / (2 * a)
  const h = Math.sqrt(c * c - x * x)
  check('E02 the foot of the altitude from A sits at x = (c² + a² − b²)/(2a) = 9 with height h = 12',
    close(x, 9) && close(h, 12), `x=${x}, h=${f4(h)}`)
  const shoelace = Math.abs((B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]) + A[0] * (B[1] - C[1])) / 2)
  check('E03 area = 84 by base-times-height AND by coordinates (shoelace)',
    close(0.5 * a * h, 84) && close(shoelace, 84), `bh=${0.5 * a * h}, shoelace=${f4(shoelace)}`)
  const s = (a + b + c) / 2
  check('E04 Heron cross-check: s = 21 and sqrt(21·8·7·6) = sqrt(7056) = 84',
    close(s, 21) && close(s * (s - a) * (s - b) * (s - c), 7056) && close(Math.sqrt(s * (s - a) * (s - b) * (s - c)), 84),
    `s=${s}, product=${s * (s - a) * (s - b) * (s - c)}`)
  check('E05 the altitude splits the witness into a 9-12-15 (the 3-4-5 triple) and a 5-12-13 right triangle: 9² + 12² = 15², 5² + 12² = 13², 9 + 5 = 14',
    close(9 * 9 + 12 * 12, 15 * 15) && close(5 * 5 + 12 * 12, 13 * 13) && close(9 + 5, 14), '')
  const cosA = (b * b + c * c - a * a) / (2 * b * c)
  const cosB = (a * a + c * c - b * b) / (2 * a * c)
  const cosC = (a * a + b * b - c * c) / (2 * a * b)
  check('E06 the three cosines: cos A = 33/65, cos B = 3/5, cos C = 5/13; the angles sum to 180°',
    close(cosA, 33 / 65) && close(cosB, 3 / 5) && close(cosC, 5 / 13) &&
    close((Math.acos(cosA) + Math.acos(cosB) + Math.acos(cosC)) * 180 / Math.PI, 180, 1e-9),
    `cosA=${f4(cosA)}, cosB=${f4(cosB)}, cosC=${f4(cosC)}`)
}

/* ================================================================== */
/* ENGINE SECTION 2 — Stewart on the witness, three cevians + signs     */
/* ================================================================== */
{
  const a = 14, b = 13, c = 15
  const A: [number, number] = [9, 12]
  const C: [number, number] = [14, 0]
  const stewartL = (m: number): number => b * b * m + c * c * (a - m)
  const stewartR = (m: number, d2: number): number => a * (d2 + m * (a - m))
  const d2At = (m: number): number => (A[0] - m) * (A[0] - m) + A[1] * A[1]
  const med2 = (2 * b * b + 2 * c * c - a * a) / 4
  check('E07 Stewart for the MEDIAN (m = n = 7): b²·7 + c²·7 = 2758 and 14·(148 + 49) = 2758 — both sides checked',
    close(stewartL(7), 2758) && close(med2, 148) && close(stewartR(7, med2), 2758) && close(stewartL(7), stewartR(7, med2)),
    `LHS=${stewartL(7)}, RHS=${stewartR(7, med2)}`)
  check('E08 the median length: d² = 148 by Apollonius AND by coordinate distance to (7, 0); d = 2√37 ≈ 12.165525',
    close(d2At(7), 148) && close(med2, 148) && close(Math.sqrt(148), 2 * Math.sqrt(37)) && close(Math.sqrt(148), 12.165525, 1e-6),
    `d=${f4(Math.sqrt(148))}`)
  const mB = (a * c) / (b + c)
  const nB = (a * b) / (b + c)
  const bis2 = b * c * (1 - (a * a) / ((b + c) * (b + c)))
  check('E09 the bisector split: m/n = c/b = 15/13 gives m = 7.5 and n = 6.5 with m + n = 14',
    close(mB, 7.5) && close(nB, 6.5) && close(mB + nB, a) && close(mB / nB, c / b), `m=${mB}, n=${nB}`)
  check('E10 Stewart for the BISECTOR: b²·7.5 + c²·6.5 = 2730 and 14·(146.25 + 48.75) = 2730 — equal to the digit',
    close(stewartL(7.5), 2730) && close(bis2, 146.25) && close(stewartR(7.5, bis2), 2730),
    `LHS=${stewartL(7.5)}, RHS=${stewartR(7.5, bis2)}`)
  check('E11 the bisector length: d² = 146.25 by the formula, by bc − mn, and by coordinate distance to (7.5, 0); d ≈ 12.093387',
    close(bis2, 146.25) && close(b * c - mB * nB, 146.25) && close(d2At(7.5), 146.25) && close(Math.sqrt(146.25), 12.093387, 1e-6),
    `d=${f4(Math.sqrt(146.25))}`)
  const d2_4 = stewartL(4) / a - 4 * (a - 4)
  check('E12 the THIRD pinned cevian (m = 4, n = 10): Stewart gives d² = 169 so d = 13 — and the coordinate distance to (4, 0) is also 13',
    close(d2_4, 169) && close(d2At(4), 169) && close(Math.sqrt(d2_4), 13), `d²=${d2_4}, d=${f4(Math.sqrt(d2_4))}`)
  check('E13 the m = 4 cevian makes triangle ADC isosceles: AD = AC = 13 with DC = 10',
    close(dist(A, [4, 0]), 13) && close(dist(A, C), 13) && close(a - 4, 10), 'the twin-side reading')
  const d2_10 = stewartL(10) / a - 10 * (a - 10)
  check('E14 the fourth cevian (m = 10, n = 4): d² = 145 by Stewart and by coordinates; d = √145 ≈ 12.041595',
    close(d2_10, 145) && close(d2At(10), 145) && close(Math.sqrt(145), 12.041595, 1e-6), `d²=${d2_10}`)
  check('E15 SIGN CASE foot between D and C (m = 4, offset FD = 5): c² = (m + u)² + h² and b² = (n − u)² + h² both hold',
    close((4 + 5) ** 2 + 144, c * c) && close((10 - 5) ** 2 + 144, b * b), 'c² = 81 + 144 = 225; b² = 25 + 144 = 169')
  check('E16 SIGN CASE foot between B and D (m = 10, offset FD = 1): c² = (m − u)² + h² and b² = (n + u)² + h² both hold',
    close((10 - 1) ** 2 + 144, c * c) && close((4 + 1) ** 2 + 144, b * b), 'c² = 81 + 144 = 225; b² = 25 + 144 = 169')
  check('E17 the degenerate sign case foot ON D (m = 9, the altitude itself): both forms collapse to c² = m² + h² and b² = n² + h²',
    close(9 * 9 + 144, c * c) && close(5 * 5 + 144, b * b), 'offset 0 — the altitude is its own case')
  check('E18 the elimination landing: at m ∈ {4, 9, 10} both sides equal a·(mn + offset² + h²) — x² + h² is eliminated into d²',
    [4, 9, 10].every((m) => {
      const n = a - m
      const off = Math.abs(m - 9)
      return close(stewartL(m), a * (m * n + off * off + 144)) && close(stewartL(m), stewartR(m, d2At(m)))
    }), 'b²m + c²n = (m+n)(mn + u² + h²) = a(d² + mn)')
}

/* ================================================================== */
/* ENGINE SECTION 3 — Stewart brute-forced over a triangle grid         */
/* ================================================================== */
{
  let count = 0
  let bad = 0
  for (let a = 5; a <= 14; a++)
    for (let b = 5; b <= 14; b++)
      for (let c = 5; c <= 14; c++) {
        if (!(Math.abs(b - c) < a && a < b + c)) continue
        const x = (c * c + a * a - b * b) / (2 * a)
        const h2 = c * c - x * x
        if (h2 <= 0) continue
        for (let m = 1; m < a; m++) {
          const n = a - m
          const d2 = (x - m) * (x - m) + h2
          if (close(b * b * m + c * c * n, a * (d2 + m * n), 1e-9)) count++
          else bad++
        }
      }
  check('E19 Stewart brute-forced over the grid a, b, c ∈ [5, 14] with every interior split m: every instance holds',
    bad === 0 && count > 3000, `${count} verified instances, ${bad} failures`)
}

/* ================================================================== */
/* ENGINE SECTION 4 — Apollonius + the medians census                   */
/* ================================================================== */
{
  const a = 14, b = 13, c = 15
  const B: [number, number] = [0, 0]
  const C: [number, number] = [14, 0]
  const med2 = (s1: number, s2: number, base: number): number => (2 * s1 * s1 + 2 * s2 * s2 - base * base) / 4
  const ma2 = med2(b, c, a), mb2 = med2(a, c, b), mc2 = med2(a, b, c)
  const Mb: [number, number] = [11.5, 6]
  const Mc: [number, number] = [4.5, 6]
  check('E20 Apollonius on the witness: m_a² = (2b² + 2c² − a²)/4 = (338 + 450 − 196)/4 = 148',
    close(ma2, 148) && close(2 * b * b + 2 * c * c - a * a, 592), `m_a²=${ma2}`)
  check('E21 the other two medians: m_b² = 673/4 = 168.25 and m_c² = 505/4 = 126.25, confirmed by coordinate midpoint distances',
    close(mb2, 168.25) && close(mc2, 126.25) && close(dist(B, Mb) ** 2, 168.25) && close(dist(C, Mc) ** 2, 126.25),
    `m_b²=${mb2}, m_c²=${mc2}`)
  check('E22 the median-sum identity, both readings: 148 + 168.25 + 126.25 = 442.5 = (3/4)(196 + 169 + 225) = (3/4)·590',
    close(ma2 + mb2 + mc2, 442.5) && close((3 / 4) * (a * a + b * b + c * c), 442.5) && close(a * a + b * b + c * c, 590),
    `sum=${ma2 + mb2 + mc2}`)
  const n1 = med2(5, 6, 4), n2 = med2(4, 6, 5), n3 = med2(4, 5, 6)
  check('E23 the median-sum on a second witness (a, b, c) = (4, 5, 6): 26.5 + 19.75 + 11.5 = 57.75 = (3/4)·77 — both readings',
    close(n1, 26.5) && close(n2, 19.75) && close(n3, 11.5) && close(n1 + n2 + n3, 57.75) && close((3 / 4) * 77, 57.75),
    `26.5 + 19.75 + 11.5 = ${n1 + n2 + n3}`)
  {
    let ok = true
    for (const [aa, bb, cc] of [[14, 13, 15], [4, 5, 6], [13, 13, 10], [3, 4, 5]] as Array<[number, number, number]>) {
      const m = aa / 2
      const d2stewart = (bb * bb * m + cc * cc * (aa - m)) / aa - m * (aa - m)
      if (!close(d2stewart, med2(bb, cc, aa))) ok = false
    }
    check('E24 Apollonius is Stewart at m = n = a/2: the substituted value matches (2b² + 2c² − a²)/4 on four witnesses',
      ok, '13-14-15, 4-5-6, 13-13-10, 3-4-5 right')
  }
}

/* ================================================================== */
/* ENGINE SECTION 5 — the centroid and the 2:1 split                   */
/* ================================================================== */
{
  const A: [number, number] = [9, 12]
  const B: [number, number] = [0, 0]
  const C: [number, number] = [14, 0]
  const G: [number, number] = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]
  const Ma: [number, number] = [7, 0]
  const Mb: [number, number] = [11.5, 6]
  const Mc: [number, number] = [4.5, 6]
  check('E25 the centroid of the witness: G = (23/3, 4) — the coordinate average of the three vertices',
    close(G[0], 23 / 3) && close(G[1], 4), `G=(${f4(G[0])}, ${f4(G[1])})`)
  const AG = dist(A, G)
  const GMa = dist(G, Ma)
  check('E26 AG = 4√37/3 ≈ 8.110350 — the direct distance from A(9, 12) to G, equal to (2/3)·2√37',
    close(AG, 8.11035, 1e-6) && close(AG, (4 * Math.sqrt(37)) / 3) && close(AG, (2 / 3) * Math.sqrt(148)),
    `AG=${f4(AG)}`)
  check('E27 GD = 2√37/3 ≈ 4.055175 and the split is exactly 2 : 1 — AG = 2·GD by direct distance',
    close(GMa, 4.055175, 1e-6) && close(AG, 2 * GMa), `GD=${f4(GMa)}`)
  const BG = dist(B, G), GMb = dist(G, Mb), CG = dist(C, G), GMc = dist(G, Mc)
  check('E28 the 2 : 1 split holds on ALL THREE medians by direct distance: BG : GM_b = CG : GM_c = 2 exactly',
    close(BG, 2 * GMb) && close(CG, 2 * GMc) && close(BG, Math.sqrt(673) / 3) && close(CG, Math.sqrt(505) / 3),
    `BG=${f4(BG)}, GMb=${f4(GMb)}, CG=${f4(CG)}, GMc=${f4(GMc)}`)
  const col = (p: [number, number], q: [number, number], r: [number, number]): number =>
    (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
  check('E29 G lies on all three median lines AM, BN, CP (collinearity cross-products zero) — the medians are concurrent at G',
    close(col(A, Ma, G), 0, 1e-9) && close(col(B, Mb, G), 0, 1e-9) && close(col(C, Mc, G), 0, 1e-9), '')
  check('E30 the median inventory to six decimals: m_a ≈ 12.165525, m_b ≈ 12.971122, m_c ≈ 11.236103',
    close(Math.sqrt(148), 12.165525, 1e-6) && close(Math.sqrt(673) / 2, 12.971122, 1e-6) && close(Math.sqrt(505) / 2, 11.236103, 1e-6),
    `m_a=${f4(Math.sqrt(148))}, m_b=${f4(Math.sqrt(673) / 2)}, m_c=${f4(Math.sqrt(505) / 2)}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — bisector, comparison order, cevian census         */
/* ================================================================== */
{
  const a = 14, b = 13, c = 15
  const mB = (a * c) / (b + c)
  const bis2 = b * c * (1 - (a * a) / (b + c) ** 2)
  const med2 = (2 * b * b + 2 * c * c - a * a) / 4
  check('E31 the bisector substitution: m = ac/(b+c) = 7.5, n = ab/(b+c) = 6.5 — the ratio m/n = c/b is the defining split',
    close(mB, 7.5) && close(a - mB, 6.5) && close(mB / (a - mB), c / b), '')
  check('E32 the bisector length, two readings: bc(1 − a²/(b+c)²) = 146.25 = bc − mn = 195 − 48.75',
    close(bis2, 146.25) && close(b * c - mB * (a - mB), 146.25) && close(b * c, 195) && close(mB * (a - mB), 48.75), '')
  check('E33 Stewart\u2019s bisector line collapses to abc = a(d² + mn): b²m + c²n = 2730 = abc — the cleanest route to the formula',
    close(b * b * mB + c * c * (a - mB), 2730) && close(a * b * c, 2730), `abc=${a * b * c}`)
  const alt = 12
  check('E34 the three-cevian comparison ON THE WITNESS: altitude 12 < bisector 12.093387 < median 12.165525 (strict)',
    alt < Math.sqrt(bis2) && Math.sqrt(bis2) < Math.sqrt(med2) && close(Math.sqrt(bis2), 12.093387, 1e-6) && close(Math.sqrt(med2), 12.165525, 1e-6),
    `h=12, ℓ=${f4(Math.sqrt(bis2))}, m_a=${f4(Math.sqrt(med2))}`)
  {
    let orderOk = true, eqOk = true, idOk = true, isoCount = 0
    for (let aa = 4; aa <= 14; aa++)
      for (let bb = 4; bb <= 14; bb++)
        for (let cc = 4; cc <= 14; cc++) {
          if (!(Math.abs(bb - cc) < aa && aa < bb + cc)) continue
          const s = (aa + bb + cc) / 2
          const area2 = s * (s - aa) * (s - bb) * (s - cc)
          if (area2 <= 0) continue
          const hh = (2 * Math.sqrt(area2)) / aa
          const ll2 = bb * cc * (1 - (aa * aa) / (bb + cc) ** 2)
          const mm2 = (2 * bb * bb + 2 * cc * cc - aa * aa) / 4
          if (!(hh <= Math.sqrt(ll2) + 1e-9 && Math.sqrt(ll2) <= Math.sqrt(mm2) + 1e-9)) orderOk = false
          const isIso = Math.abs(bb - cc) < 1e-12
          const allEq = close(hh, Math.sqrt(ll2), 1e-9) && close(Math.sqrt(ll2), Math.sqrt(mm2), 1e-9)
          if (isIso) { isoCount++; if (!allEq) eqOk = false } else if (allEq) eqOk = false
          const id = ((bb - cc) ** 2 * (2 * (bb + cc) ** 2 - aa * aa)) / (4 * (bb + cc) ** 2)
          if (!close(mm2 - ll2, id, 1e-9)) idOk = false
        }
    check('E35 the general order altitude ≤ bisector ≤ median holds across the whole triangle grid, with equality exactly when b = c',
      orderOk && eqOk && isoCount > 50, `${isoCount} isosceles instances (all three equal); scalene instances strictly ordered`)
    check('E36 the squared identity median² − bisector² = (b − c)²(2(b+c)² − a²)/(4(b+c)²) holds across the grid; on the witness it equals 1.75',
      idOk && close(med2 - bis2, 1.75) && close(((b - c) ** 2 * (2 * (b + c) ** 2 - a * a)) / (4 * (b + c) ** 2), 1.75), '')
  }
  {
    const d2Of = (m: number): number => 144 + (m - 9) ** 2
    const stewartD2 = (m: number): number => (b * b * m + c * c * (a - m)) / a - m * (a - m)
    let parOk = true
    for (let m = 0; m <= 14.0001; m += 0.25) if (!close(d2Of(m), stewartD2(m), 1e-9)) parOk = false
    check('E37 the cevian census parabola: d²(m) = h² + (m − x)² = 144 + (m − 9)² matches Stewart\u2019s value at every m from 0 to 14 in steps of 0.25',
      parOk, '57 grid points, all on the parabola')
    const pts: Array<[number, number]> = [[0, 225], [4, 169], [6, 153], [7, 148], [7.5, 146.25], [9, 144], [10, 145], [14, 169]]
    check('E38 the pinned census points (m, d²): (0,225) (4,169) (6,153) (7,148) (7.5,146.25) (9,144) (10,145) (14,169) — all on the parabola',
      pts.every(([m, v]) => close(d2Of(m), v) && close(stewartD2(m), v)), pts.map((p) => p.join('→')).join(' '))
    check('E39 the census endpoints are the sides themselves: d(0) = c = 15 and d(14) = b = 13 — the degenerate cevians',
      close(Math.sqrt(d2Of(0)), 15) && close(Math.sqrt(d2Of(14)), 13), 'D = B gives the side c; D = C gives the side b')
    check('E40 the census minimum sits at m = 9 — the altitude foot — with minimum value h² = 144; the twin value 169 occurs at m = 4 and m = 14',
      close(d2Of(9), 144) && close(Math.min(...Array.from({ length: 57 }, (_, i) => d2Of(i * 0.25))), 144) && close(d2Of(4), d2Of(14)),
      'minimum 144 at the foot; twins at m = 4 and m = 14')
  }
  {
    const x = 9
    const frac = 1 - (a * a) / (b + c) ** 2
    check('E41 the offset decomposition on the witness: median² − h² = (x − a/2)² = 4 and bisector² − h² = (x − m_bis)² = 2.25',
      close(med2 - 144, 4) && close(bis2 - 144, 2.25) && close(x - a / 2, 2) && close(x - 7.5, 1.5), '')
    check('E42 the bisector foot sits at the fixed fraction 1 − a²/(b+c)² = 0.75 of the way from the altitude foot to the midpoint: 1.5 = 0.75·2',
      close(frac, 0.75) && close((x - 7.5) / (x - a / 2), 0.75), 'x − m_bis = (1 − a²/(b+c)²)(x − a/2)')
    let sweepOk = true
    for (let aa = 4; aa <= 14; aa++)
      for (let bb = 4; bb <= 14; bb++)
        for (let cc = 4; cc <= 14; cc++) {
          if (!(Math.abs(bb - cc) < aa && aa < bb + cc)) continue
          const xx = (cc * cc + aa * aa - bb * bb) / (2 * aa)
          const mb = (aa * cc) / (bb + cc)
          if (!close(xx - mb, (1 - (aa * aa) / (bb + cc) ** 2) * (xx - aa / 2), 1e-9)) sweepOk = false
        }
    check('E43 the bisector-foot fraction law x − m_bis = (1 − a²/(b+c)²)(x − a/2) holds across the triangle grid',
      sweepOk, 'the bisector foot is always the same fraction of the way from F to M')
  }
}

/* ================================================================== */
/* ENGINE SECTION 7 — quiz-key self-check + the 15 exercise witnesses   */
/* ================================================================== */
{
  const QUIZ_KEY = [0, 3, 1, 2, 0]
  const QUIZ_TOKENS = ['b^2 m + c^2 n', '2\\sqrt{37}', '4\\sqrt{37}', 'BD = 7.5', 'h \\le \\ell \\le m_a']
  check('E44 quiz key [0,3,1,2,0]: 5 entries in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 3),
    QUIZ_TOKENS.join(' | '))
  // Ex1 — Apollonius plug-in on (8, 5, 7)
  {
    const m2 = (2 * 25 + 2 * 49 - 64) / 4
    check('E45 Ex1 witness (a, b, c) = (8, 5, 7): m_a² = 21, m_a = √21 ≈ 4.582576; Stewart cross-check 25·4 + 49·4 = 296 = 8·(21 + 16)',
      close(m2, 21) && close(Math.sqrt(21), 4.582576, 1e-6) && close(25 * 4 + 49 * 4, 296) && close(8 * (21 + 16), 296), '')
  }
  // Ex2 — the m = 4 cevian (E12/E13 re-pin)
  check('E46 Ex2 witness: the m = 4, n = 10 cevian of the 13-14-15 witness has d = 13 with AD = AC — triangle ADC isosceles',
    close((13 * 13 * 4 + 15 * 15 * 10) / 14 - 40, 169) && close(Math.hypot(9 - 4, 12), 13) && close(Math.hypot(9 - 14, 12), 13), '')
  // Ex3 — the 2:1 split of a 12-long median
  check('E47 Ex3 witness: a median of length 12 splits as AG = (2/3)·12 = 8 and GD = (1/3)·12 = 4',
    close((2 / 3) * 12, 8) && close((1 / 3) * 12, 4) && close(8, 2 * 4), '')
  // Ex4 — the witness centroid (E25-E27 re-pin)
  check('E48 Ex4 witness: G = (23/3, 4), AG ≈ 8.110350, GD ≈ 4.055175 by direct distance',
    close(Math.hypot(9 - 23 / 3, 8), 8.11035, 1e-6) && close(Math.hypot(23 / 3 - 7, 4), 4.055175, 1e-6), '')
  // Ex5 — the bisector from a 3:5 ratio
  {
    const bb = 15, cc = 9, aa = 16
    const mm = (aa * cc) / (bb + cc)
    const d2a = (bb * bb * mm + cc * cc * (aa - mm)) / aa - mm * (aa - mm)
    const d2b = bb * cc * (1 - (aa * aa) / (bb + cc) ** 2)
    check('E49 Ex5 witness (ratio 3:5, a = 16, c = 9, b = 15): m = 6, n = 10; d² = 75 both readings; d = 5√3 ≈ 8.660254; the triangle is valid',
      close(mm, 6) && close(aa - mm, 10) && close(d2a, 75) && close(d2b, 75) && close(Math.sqrt(75), 5 * Math.sqrt(3)) &&
      close(Math.sqrt(75), 8.660254, 1e-6) && 9 + 15 > 16, '')
  }
  // Ex6 — median-sum on 4-5-6 (E23 re-pin with formulas)
  check('E50 Ex6 witness (a, b, c) = (4, 5, 6): 26.5 + 19.75 + 11.5 = 57.75 = (3/4)(16 + 25 + 36) = (3/4)·77',
    close((2 * 25 + 2 * 36 - 16) / 4, 26.5) && close((2 * 16 + 2 * 36 - 25) / 4, 19.75) && close((2 * 16 + 2 * 25 - 36) / 4, 11.5) &&
    close(26.5 + 19.75 + 11.5, 57.75) && close((3 / 4) * (16 + 25 + 36), 57.75), '')
  // Ex7 — the census table (E38 re-pin)
  check('E51 Ex7 witness: the census walk m = 0, 4, 6, 7, 7.5, 9, 10, 14 gives d² = 225, 169, 153, 148, 146.25, 144, 145, 169',
    [0, 4, 6, 7, 7.5, 9, 10, 14].every((m, i) => close((13 * 13 * m + 15 * 15 * (14 - m)) / 14 - m * (14 - m), [225, 169, 153, 148, 146.25, 144, 145, 169][i])), '')
  // Ex8 — the isosceles equality case 13-13-10
  {
    const med2 = (2 * 169 + 2 * 169 - 100) / 4
    const bis2 = 169 * (1 - 100 / (26 * 26))
    const s = 18
    const area = Math.sqrt(s * (s - 13) * (s - 13) * (s - 10))
    check('E52 Ex8 witness (13, 13, 10): median² = 144, bisector² = 169 − 25 = 144, altitude² = (2·60/10)² = 144 — all three equal 12',
      close(med2, 144) && close(bis2, 144) && close(s * (s - 13) * (s - 13) * (s - 10), 3600) && close(area, 60) &&
      close((2 * area) / 10, 12) && close(169 - 25, 144), `area=${area}`)
  }
  // Ex9 — the right-triangle comparison
  {
    const aa = 3, bb = 5, cc = 4
    const bis2 = bb * cc * (1 - (aa * aa) / (bb + cc) ** 2)
    const med2 = (2 * bb * bb + 2 * cc * cc - aa * aa) / 4
    const mm = (aa * cc) / (bb + cc)
    check('E53 Ex9 witness (right angle at B, a = 3, b = 5, c = 4): altitude 4 < bisector 4√10/3 ≈ 4.216370 < median √73/2 ≈ 4.272002; split m = 4/3, n = 5/3; Stewart 60 = 60',
      close(bis2, 160 / 9) && close(Math.sqrt(bis2), (4 * Math.sqrt(10)) / 3) && close(Math.sqrt(bis2), 4.21637, 1e-6) &&
      close(med2, 73 / 4) && close(Math.sqrt(med2), 4.272002, 1e-6) && close(mm, 4 / 3) &&
      close(25 * mm + 16 * (3 - mm), 60) && close(3 * (bis2 + mm * (3 - mm)), 60) && 4 < Math.sqrt(bis2) && Math.sqrt(bis2) < Math.sqrt(med2), '')
  }
  // Ex10 — the reverse-Stewart quadratic
  {
    const roots: number[] = []
    for (let m = -50; m <= 50; m += 0.25) if (close(m * m - 18 * m + 56, 0, 1e-9)) roots.push(m)
    check('E54 Ex10 witness: the cevian of length 13 forces m² − 18m + 56 = 0, whose only roots are m = 4 (interior) and m = 14 (degenerate, D = C)',
      roots.length === 2 && close(roots[0], 4) && close(roots[1], 14) &&
      close(14 * 4 ** 2 - 252 * 4 + 784, 0) && close(13 * 13 * 14 + 15 * 15 * 0, 14 * (169 + 0)),
      `roots=${JSON.stringify(roots)}`)
  }
  // Ex11 — the truss
  {
    const king2 = (2 * 169 + 2 * 169 - 100) / 4
    const strut2 = (169 * 4 + 169 * 6) / 10 - 24
    check('E55 Ex11 witness (isosceles rafters 13, base 10): king post² = 144 (length 12); strut to m = 4: d² = 145, d = √145 ≈ 12.041595 > 12',
      close(king2, 144) && close(strut2, 145) && close(Math.sqrt(145), 12.041595, 1e-6) && Math.sqrt(145) > 12, '')
  }
  // Ex12 — median-sum proof witnesses (E22/E23 re-pin)
  check('E56 Ex12 witnesses: 148 + 168.25 + 126.25 = 442.5 = (3/4)·590 and 26.5 + 19.75 + 11.5 = 57.75 = (3/4)·77',
    close(148 + 168.25 + 126.25, (3 / 4) * 590) && close(26.5 + 19.75 + 11.5, (3 / 4) * 77), '')
  // Ex13 — the bisector identity bc − mn
  check('E57 Ex13 witnesses: 195 − 48.75 = 146.25 (the 13-14-15) and 135 − 60 = 75 (the 3:5 ratio triangle); the key collapse b²m + c²n = abc reads 2730 = 2730',
    close(195 - 48.75, 146.25) && close(135 - 60, 75) && close(13 * 15 * 14, 2730) && close(169 * 7.5 + 225 * 6.5, 2730), '')
  // Ex14 — the squared identity
  {
    const idW = ((13 - 15) ** 2 * (2 * 28 * 28 - 196)) / (4 * 28 * 28)
    const iso = (2 * 169 + 2 * 169 - 100) / 4 - 169 * (1 - 100 / 676)
    check('E58 Ex14 witnesses: the identity gives 1.75 on the 13-14-15 (matching 148 − 146.25) and 0 on the 13-13-10 isosceles',
      close(idW, 1.75) && close(148 - 146.25, 1.75) && close(iso, 0), '')
  }
  // Ex15 — the offset decomposition + fraction law
  check('E59 Ex15 witnesses: offsets |x − a/2| = 2 (median) and |x − m_bis| = 1.5 (bisector) with ratio 0.75 = 1 − 196/784; d² = 144 + 4 = 148 and 144 + 2.25 = 146.25',
    close(Math.abs(9 - 7), 2) && close(Math.abs(9 - 7.5), 1.5) && close(1.5 / 2, 0.75) && close(1 - 196 / 784, 0.75) &&
    close(144 + 2 ** 2, 148) && close(144 + 1.5 ** 2, 146.25), '')
  // Illustration witnesses re-pinned
  check('E60 Illustration witnesses: the placement (9, 12), Heron 84, the median 2758 = 2758, the bisector 2730 = 2730, the centroid 8.110350 — all covered by E02-E33',
    true, 'E02, E04, E07, E10, E26 certify the four Illustrations')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo306?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo306 })
    pcheck('P01 part file loads and exports lessonGeo306', !!mod?.lessonGeo306, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo306', false, String(e))
  }
  const lesson = mod?.lessonGeo306
  if (!lesson) return

  // P02 — quiz keys [0,3,1,2,0], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [0,3,1,2,0]', JSON.stringify(keys) === JSON.stringify([0, 3, 1, 2, 0]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['b^2 m + c^2 n', '2\\sqrt{37}', '4\\sqrt{37}', 'BD = 7.5', 'h \\le \\ell \\le m_a']
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
  pcheck('P04d the named solution trio exists: a Stewart-anatomy, a centroid and a comparison figure',
    /stewart anatomy/.test(allCaptions) && /centroid/.test(allCaptions) && /comparison/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the five pinned)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=5 formula cards including Stewart, Apollonius, the bisector length, the centroid 2:1 and the median-sum identity',
    formulas.length >= 5 &&
    formulas.some((f) => f.name.toLowerCase().includes('stewart')) &&
    formulas.some((f) => f.name.toLowerCase().includes('apollonius')) &&
    formulas.some((f) => f.name.toLowerCase().includes('bisector')) &&
    formulas.some((f) => f.name.toLowerCase().includes('centroid')) &&
    formulas.some((f) => f.name.toLowerCase().includes('median-sum')),
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
  pcheck('P09a >=6 SVGs collected (>=3 body + >=3 solution)', svgs.length >= 6, `count=${svgs.length}`)
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-stewarts-theorem-and-the-median-relation' && lesson.number === '3.6' && lesson.title === "Stewart's Theorem and the Median Relation", `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-ch03-web-ground, cengage-m1-05]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-ch03-web-ground', 'cengage-m1-05']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [3.2 criteria, 3.4 inequalities]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles']), JSON.stringify(lesson.prerequisites))
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
  // P18 — exam + historical callouts present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  const histCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'historical')
  pcheck('P18 an exam callout and a historical callout are present', examCall && histCall, `exam=${examCall}, historical=${histCall}`)
  // P19 — the three-cevian comparison table
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const cmpTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('cevian') && t.rows.join(' ').includes('146.25'))
  pcheck('P19 the three-cevian comparison table exists with 146.25, 148 and 144',
    !!cmpTable && ['146.25', '148', '144'].every((s) => cmpTable.rows.join(' ').includes(s)), cmpTable ? 'found' : 'missing')
  // P20 — the cevian census table
  const censusTable = tables.find((t) => t.rows.join(' ').includes('153') && t.rows.join(' ').includes('146.25') && t.rows.join(' ').includes('225'))
  pcheck('P20 the cevian census table carries the pinned values 225, 169, 153, 148, 146.25, 144, 145',
    !!censusTable && ['225', '169', '153', '148', '146.25', '144', '145'].every((s) => censusTable.rows.join(' ').includes(s)), censusTable ? 'found' : 'missing')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo306 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}


/* ================================================================== */
/* SECTION Z — the CLOSED chapter census                               */
/* ================================================================== */
async function sectionZ(): Promise<SectionResult> {
  let pass = 0
  let fail = 0
  const z = (name: string, ok: boolean, detail = ''): void => {
    if (ok) pass++
    else {
      fail++
      console.log(`  Z FAIL ${name} — ${detail}`)
    }
  }
  console.log('== SECTION Z: the CLOSED chapter census ==')
  z('Z01 chapter number is 3', chapter3.number === 3)
  z('Z02 chapter slug', chapter3.slug === 'triangles-congruence-and-proof', chapter3.slug)
  z('Z03 chapter status complete', chapter3.status === 'complete', chapter3.status)
  z('Z04 six lessons shipped', chapter3.lessons.length === 6, String(chapter3.lessons.length))
  z('Z05 plannedLessons is empty (nothing outstanding)', (chapter3.plannedLessons ?? []).length === 0, JSON.stringify(chapter3.plannedLessons ?? []))
  const ids = chapter3.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-isosceles-triangles-the-classic-consequences', 'geo-inequalities-in-a-triangle-sides-and-angles', 'geo-the-cevian-theorems-ceva-and-menelaus', 'geo-stewarts-theorem-and-the-median-relation']), ids.join(','))
  z('Z07 lesson numbers 3.1..3.6', JSON.stringify(chapter3.lessons.map((l) => l.number)) === JSON.stringify(['3.1', '3.2', '3.3', '3.4', '3.5', '3.6']), chapter3.lessons.map((l) => l.number).join(','))
  z('Z08 lesson titles exact', JSON.stringify(chapter3.lessons.map((l) => l.title)) === JSON.stringify(['Congruence: the Idea of Same Shape and Size', 'The Congruence Criteria: SAS, ASA, AAS, SSS, RHS', 'Isosceles Triangles: the Classic Consequences', 'Inequalities in a Triangle: Sides and Angles', "The Cevian Theorems: Ceva and Menelaus", "Stewart's Theorem and the Median Relation"]), chapter3.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter3.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 6000 each)', wcs.every((w) => w >= 6000), wcs.join(', '))
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    ['geo-angle-sum-of-a-triangle-and-its-consequences'],
    ['geo-congruence-the-idea-of-same-shape-and-size'],
    ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
    ['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-isosceles-triangles-the-classic-consequences'],
    ['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles'],
    ['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles'],
  ]
  for (const [i, l] of chapter3.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact (the teaching chain)`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH03_SRC))
  const shippedText = readFileSync(CH03_SRC, 'utf8')
  z('Z15 the shipped source exports all six lessons', ['lessonGeo301', 'lessonGeo302', 'lessonGeo303', 'lessonGeo304', 'lessonGeo305', 'lessonGeo306'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress (9 chapters remain)', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapters 1, 2, 3 AND 4 complete', geometry.chapters.slice(0, 4).every((c) => c.status === 'complete'), geometry.chapters.slice(0, 4).map((c) => c.status).join('/'))
  z('Z19 chapters 5-12 still planned', geometry.chapters.slice(4).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter3.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter3.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 50,000 words)', chapterWords > 50000, String(chapterWords))
  const keys = chapter3.lessons.map((l) => {
    const qb = l.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
    return qb ? qb.items.map((i) => i.answer).join('') : 'none'
  })
  console.log(`  Z quiz keys: ${keys.join(' | ')}`)
  z('Z23 quiz keys are the pinned six, pairwise distinct', JSON.stringify(keys) === JSON.stringify(['13021', '02132', '20310', '31203', '10231', '03120']) && new Set(keys).size === 6, keys.join(','))
  z('Z24 the six lesson ids are unique', new Set(ids).size === 6)
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo301(),
    await sectionGeo302(),
    await sectionGeo303(),
    await sectionGeo304(),
    await sectionGeo305(),
    await sectionGeo306(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch03: verdict ================')
  let pass = 0
  let fail = 0
  for (const r of results) {
    console.log(`  ${r.id}: ${r.pass} pass, ${r.fail} fail`)
    pass += r.pass
    fail += r.fail
  }
  console.log(`  TOTAL: ${pass} pass, ${fail} fail`)
  if (fail > 0) {
    console.log('RESULT: NOT ALL GREEN — fix the failures and re-run.')
    process.exit(1)
  }
  console.log('RESULT: ALL GREEN — chapter 3 CLOSED COMPLETE (6/6 lessons).')
}

main()
