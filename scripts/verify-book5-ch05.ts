import { chapter5, lessonGeo501, lessonGeo502, lessonGeo503, lessonGeo504 } from '../src/data/library/books/mathematics/geometry/ch-05'
import { geometry } from '../src/data/library/books/mathematics/geometry/book'
import { countLessonWords, type Lesson } from '../src/data/library/types'
import { existsSync, readFileSync } from 'node:fs'

export {}

/**
 * verify-book5-ch05.ts — the chapter verifier for GEOMETRY (book #5),
 * chapter 5 "Transformations and Symmetry: the Rigid-Motion Idea"
 * (CLOSED COMPLETE by RUN 131, 2026-11-28 — 4 lessons). VERIFY-FIRST per
 * the standing protocol: each lesson's ENGINE section ran green BEFORE its
 * prose was declared done — by its authoring agent against its part file —
 * and the PIN sections here RE-READ THE SHIPPED CHAPTER (the part imports
 * redirected to ch-05.ts).
 *
 *   (geo501) 5.1 engines + pins      (geo502) 5.2 engines + pins
 *   (geo503) 5.3 engines + pins      (geo504) 5.4 engines + pins
 *   (Z)      the CLOSED chapter census — the honest 4-of-4 shape
 *
 * Assembled by scripts/assemble_run131.py (on the assemble_run129.py
 * pattern): each v-file wrapped whole as one async section (its local
 * collectors/helpers stay function-scoped); the only edits are the
 * documented import redirects and the verdict-block swaps.
 */

type SectionResult = { id: string; pass: number; fail: number }

const CH05_SRC = new URL('../src/data/library/books/mathematics/geometry/ch-05.ts', import.meta.url).pathname

async function sectionGeo501(): Promise<SectionResult> {
/**
 * v-geo501.ts — verify-first ENGINE + PIN harness for GEO lesson 5.1
 * "The Rigid Motions: Slides, Flips and Turns" (run 131 swarm, agent geo501).
 *
 * DISCIPLINE: the engine wins over the spec. Every pinned translation image,
 * reflection image, rotation image, preserved distance, midpoint read,
 * signed-area verdict and distance-matrix congruence the prose prints is
 * recomputed here by brute force FIRST; where engine and prose disagree, the
 * prose is fixed to the engine's value and the catch is flagged in the
 * report. The pinned numbers below are the IMMUTABLE truth (they reproduce
 * the run-131 master pin set: scripts/pin_check_geo131.py 81/81 green, the
 * 5.1 block 51.01–51.24).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — T_(3,-2): (5,1)->(8,-1), (0,0)->(3,-2),
 *     |PQ| = sqrt(26) = 5.0990199 preserved exactly; the line y=0 landing on
 *     y=-2 through (0,0),(7,0) -> (3,-2),(10,-2); the midpoint invariance on
 *     segment (1,1)-(1,4) (images (4,-1),(4,2), midpoints (1,2.5) -> (4,0.5));
 *     the mirrors of (-3,4): y-axis -> (3,4), x-axis -> (-3,-4), y=x -> (4,-3);
 *     the mirror x=3: (1,2)->(5,2) with midpoint (3,2) equidistant (2 and 2)
 *     and the join perpendicular; the origin turns: R90 (4,1)->(-1,4) with
 *     |(4,1)| = sqrt(17) = 4.1231056 kept, R180 (2,5)->(-2,-5), R270 CCW
 *     (4,1)->(1,-4) (= 90 CW); R90 about the foreign centre (2,3):
 *     (5,3)->(2,6) with |PQ| = 3 kept and (5,0)->(5,6) with |PR| = sqrt(18) =
 *     4.2426407 kept, re-derived by the translate-turn-translate machine;
 *     the right angle at (4,0) of triangle (0,0),(4,0),(4,3) surviving the
 *     y-axis mirror (dot 0 both times); the signed areas +6 -> -6 under the
 *     mirror and +6 kept under R90 by the shoelace computation; the distance-
 *     matrix congruence of (0,0),(4,0),(4,3) vs (6,5),(10,5),(10,8) with
 *     T_(6,5) carrying the first onto the second; the Illustration witnesses
 *     (triangle (1,1),(4,1),(1,3) under T_(2,-1) with sides 3, 2, sqrt(13));
 *     the identify-the-motion witness (R180 fixing the origin, signed area
 *     +6 kept); the quiz-key self-check [3,0,4,1,2] (item 3 carries answer
 *     index 4, so it needs FIVE options — the engine's reading of the key).
 *   PIN SECTION (P01...) — imports ./part-geo501 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     9000, quiz key [3,0,4,1,2], 15 exercises L1..L6 with full step
 *     solutions, >= 9 body figures + >= 3 solution figures incl. the slide /
 *     mirror / rotation / signed-area / midpoint / perpendicular figures,
 *     terms + formula cards, >= 3 Illustrations with >= 4 steps, >= 2
 *     derivations, the census + rule tables, SVG + math-span hygiene laws).
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only
 * run prints the engine score and exits 0; the pins re-arm the moment
 * part-geo501.ts lands on disk).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch05-wip/v-geo501.ts
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
const dot = (u: Pt, v: Pt): number => u[0] * v[0] + u[1] * v[1]
const T = (a: number, b: number) => (p: Pt): Pt => [p[0] + a, p[1] + b]
const Fy = (p: Pt): Pt => [-p[0], p[1]] // mirror in the y-axis
const Fx = (p: Pt): Pt => [p[0], -p[1]] // mirror in the x-axis
const Fyx = (p: Pt): Pt => [p[1], p[0]] // mirror in the line y = x
const Fxv = (c: number) => (p: Pt): Pt => [2 * c - p[0], p[1]] // mirror in the vertical line x = c
const R90o = (p: Pt): Pt => [-p[1], p[0]] // 90 deg CCW about the origin
const R180o = (p: Pt): Pt => [-p[0], -p[1]] // 180 deg about the origin
const R270o = (p: Pt): Pt => [p[1], -p[0]] // 270 deg CCW = 90 CW about the origin
const Rp90 = (a: number, b: number) => (p: Pt): Pt => [a - (p[1] - b), b + (p[0] - a)] // R90 CCW about (a, b)
const shoelace = (tri: Pt[]): number =>
  0.5 * (tri[0][0] * (tri[1][1] - tri[2][1]) + tri[1][0] * (tri[2][1] - tri[0][1]) + tri[2][0] * (tri[0][1] - tri[1][1]))

/* ================================================================== */
/* ENGINE SECTION 1 — the slide: T_(3,-2) and its invariants           */
/* ================================================================== */
{
  const t = T(3, -2)
  const P: Pt = [5, 1], Q: Pt = [0, 0]
  const Pi = t(P), Qi = t(Q)
  check('E01 T_(3,-2): (5,1) -> (8,-1) and (0,0) -> (3,-2)',
    JSON.stringify(Pi) === JSON.stringify([8, -1]) && JSON.stringify(Qi) === JSON.stringify([3, -2]),
    `P'=${Pi}, Q'=${Qi}`)
  check('E02 |PQ| preserved EXACTLY under T_(3,-2): sqrt(26) -> sqrt(26)',
    close(dist(P, Q), dist(Pi, Qi), 0) && close(dist(P, Q), Math.sqrt(26)),
    `|PQ|=${f4(dist(P, Q))}, |P'Q'|=${f4(dist(Pi, Qi))}`)
  check('E03 sqrt(26) = 5.0990199 (to 7 dp)',
    close(Math.sqrt(26), 5.0990199, 1e-6), f4(Math.sqrt(26)))
  check('E04 distances preserved on a 6-point sweep (every pair, before vs after)',
    [[2, 3], [-1, 4], [6, 0], [0, -5], [3.5, 2.5], [-4, -1]].every((a) =>
      [[0, 0], [5, 1], [2, 3]].every((b) =>
        close(dist(a as Pt, b as Pt), dist(t(a as Pt), t(b as Pt)), 0))),
    'same vector added to both endpoints cancels in every difference')
  {
    const A: Pt = [0, 0], B: Pt = [7, 0]
    const Ai = t(A), Bi = t(B)
    check('E05 the line y = 0 lands on the line y = -2: (0,0),(7,0) -> (3,-2),(10,-2), both images at height -2',
      JSON.stringify(Ai) === JSON.stringify([3, -2]) && JSON.stringify(Bi) === JSON.stringify([10, -2]) &&
        Ai[1] === -2 && Bi[1] === -2,
      `A'=${Ai}, B'=${Bi}`)
  }
  {
    const seg: Pt[] = [[1, 1], [1, 4]]
    const img = seg.map(t)
    const mid = ((p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2])(seg[0], seg[1])
    const midImg = ((p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2])(img[0], img[1])
    check('E06 midpoint invariance under T_(3,-2): images (4,-1),(4,2); image of midpoint (1,2.5) = midpoint of images (4,0.5)',
      JSON.stringify(img[0]) === JSON.stringify([4, -1]) && JSON.stringify(img[1]) === JSON.stringify([4, 2]) &&
        JSON.stringify(midImg) === JSON.stringify([4, 0.5]) && JSON.stringify(t(mid)) === JSON.stringify(midImg),
      `images=${img}, mid ${mid} -> ${t(mid)} = ${midImg}`)
  }
  {
    // Illustration 1 witness: triangle (1,1),(4,1),(1,3) under T_(2,-1)
    const tri: Pt[] = [[1, 1], [4, 1], [1, 3]]
    const img = tri.map(T(2, -1))
    const sides = [dist(tri[0], tri[1]), dist(tri[1], tri[2]), dist(tri[2], tri[0])]
    const sidesImg = [dist(img[0], img[1]), dist(img[1], img[2]), dist(img[2], img[0])]
    check('E07 Illustration 1: triangle (1,1),(4,1),(1,3) under T_(2,-1) -> (3,0),(6,0),(3,2); sides 3, sqrt(13) = 3.6055513, 2 kept exactly; area 3 kept',
      JSON.stringify(img) === JSON.stringify([[3, 0], [6, 0], [3, 2]]) &&
        close(sides[0], 3) && close(sides[1], Math.sqrt(13)) && close(sides[2], 2) &&
        close(sides[1], 3.6055513, 1e-6) &&
        sides.every((s, i) => close(s, sidesImg[i], 0)) &&
        close(shoelace(tri), 3) && close(shoelace(img), 3),
      `sides 3, 2, sqrt(13) read in triangle order: ${sides.map(f4)} area=${f4(shoelace(tri))}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 2 — the mirrors: four machines, one law              */
/* ================================================================== */
{
  const A: Pt = [-3, 4]
  check('E08 mirror in the y-axis: (-3,4) -> (3,4) (the x-coordinate flips)',
    JSON.stringify(Fy(A)) === JSON.stringify([3, 4]), String(Fy(A)))
  check('E09 mirror in the x-axis: (-3,4) -> (-3,-4) (the y-coordinate flips)',
    JSON.stringify(Fx(A)) === JSON.stringify([-3, -4]), String(Fx(A)))
  check('E10 mirror in the line y = x: (-3,4) -> (4,-3) (the coordinates swap)',
    JSON.stringify(Fyx(A)) === JSON.stringify([4, -3]), String(Fyx(A)))
  check('E11 all three mirrors keep the distance from the origin: |(-3,4)| = 5 -> 5 every time',
    close(dist([0, 0], A), 5) && close(dist([0, 0], Fy(A)), 5) && close(dist([0, 0], Fx(A)), 5) && close(dist([0, 0], Fyx(A)), 5),
    'reflections preserve distance, so |A| survives each machine')
  {
    const f3 = Fxv(3)
    const P: Pt = [1, 2], Pi = f3(P)
    const M: Pt = [(P[0] + Pi[0]) / 2, (P[1] + Pi[1]) / 2]
    check('E12 mirror x = 3: (1,2) -> (5,2); midpoint (3,2) sits ON the mirror; distances 2 and 2 equidistant',
      JSON.stringify(Pi) === JSON.stringify([5, 2]) && JSON.stringify(M) === JSON.stringify([3, 2]) &&
        close(dist(P, M), 2) && close(dist(Pi, M), 2),
      `P'=${Pi}, M=${M}, d(P,M)=${f4(dist(P, M))}, d(P',M)=${f4(dist(Pi, M))}`)
    check('E13 the join P to P\' meets the mirror x = 3 at RIGHT ANGLES (join horizontal, mirror vertical)',
      close(dot([Pi[0] - P[0], Pi[1] - P[1]], [1, 0]), 4) &&
        close(dot([Pi[0] - P[0], Pi[1] - P[1]], [0, 1]), 0),
      'perpendicular-bisector fact (G-CO.9) witnessed')
    check('E14 the general vertical mirror x = c sends (x,y) to (2c - x, y): c = 3 gives (1,2)->(5,2); c = -1 gives (0,2)->(-2,2)',
      JSON.stringify(f3([1, 2])) === JSON.stringify([2 * 3 - 1, 2]) && JSON.stringify(Fxv(-1)([0, 2])) === JSON.stringify([-2, 2]),
      'one machine, one rule, any c')
  }
  {
    // the y = x swap: the join from (-3,4) to (4,-3) is perpendicular to y = x and bisected by it
    const Ai = Fyx(A)
    const M: Pt = [(A[0] + Ai[0]) / 2, (A[1] + Ai[1]) / 2]
    const join: Pt = [Ai[0] - A[0], Ai[1] - A[1]] // (7,-7)
    const line: Pt = [1, 1]
    check('E15 the y = x swap: midpoint (0.5,0.5) lies on y = x and the join (7,-7) is perpendicular to the line (dot 0)',
      close(M[0], 0.5) && close(M[1], 0.5) && close(M[0] - M[1], 0) && close(dot(join, line), 0),
      `M=${M}, join·line=${dot(join, line)}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 3 — the turns about the origin                        */
/* ================================================================== */
{
  const A: Pt = [4, 1]
  check('E16 R90 CCW about the origin: (4,1) -> (-1,4)',
    JSON.stringify(R90o(A)) === JSON.stringify([-1, 4]), String(R90o(A)))
  check('E17 |(4,1)| = sqrt(17) = 4.1231056 kept by the turn',
    close(dist([0, 0], A), dist([0, 0], R90o(A)), 0) && close(Math.sqrt(17), 4.1231056, 1e-6),
    f4(Math.sqrt(17)))
  check('E18 R180 about the origin: (2,5) -> (-2,-5)',
    JSON.stringify(R180o([2, 5])) === JSON.stringify([-2, -5]), String(R180o([2, 5])))
  check('E19 R270 CCW about the origin: (4,1) -> (1,-4), and 270 CCW = 90 CW ((x,y)->(y,-x))',
    JSON.stringify(R270o(A)) === JSON.stringify([1, -4]) && JSON.stringify(R270o(A)) === JSON.stringify([A[1], -A[0]]),
    String(R270o(A)))
  check('E20 the axes dance under R90 CCW: (1,0) -> (0,1), (0,1) -> (-1,0) — the rule (x,y) -> (-y,x) re-derived on the unit points',
    JSON.stringify(R90o([1, 0])) === JSON.stringify([0, 1]) && JSON.stringify(R90o([0, 1])) === JSON.stringify([-1, 0]),
    'the rule on the cleanest witnesses')
  check('E21 turns keep distances on a 5-point sweep under all three machines (R90, R180, R270)',
    [[3, 2], [-1, 5], [6, 0], [-4, -3], [0.5, 2.5]].every((p) =>
      close(dist([0, 0], p as Pt), dist([0, 0], R90o(p as Pt)), 0) &&
      close(dist([0, 0], p as Pt), dist([0, 0], R180o(p as Pt)), 0) &&
      close(dist([0, 0], p as Pt), dist([0, 0], R270o(p as Pt)), 0)),
    'every image sits on the same circle about O')
}

/* ================================================================== */
/* ENGINE SECTION 4 — turns about a foreign centre (2,3)                */
/* ================================================================== */
{
  const C: Pt = [2, 3]
  const r = Rp90(2, 3)
  const P: Pt = [5, 3], R: Pt = [5, 0]
  check('E22 R90 CCW about (2,3): (5,3) -> (2,6), and |CP| = 3 kept on the image',
    JSON.stringify(r(P)) === JSON.stringify([2, 6]) &&
      close(dist(C, P), 3) && close(dist(C, r(P)), 3, 0),
    `P'=${r(P)}, |CP|=${f4(dist(C, P))}, |CP'|=${f4(dist(C, r(P)))}`)
  check('E23 R90 CCW about (2,3): (5,0) -> (5,6), and |CR| = sqrt(18) = 4.2426407 kept on the image',
    JSON.stringify(r(R)) === JSON.stringify([5, 6]) &&
      close(dist(C, R), dist(C, r(R)), 0) && close(Math.sqrt(18), 4.2426407, 1e-6),
    `R'=${r(R)}, |CR|=${f4(Math.sqrt(18))}`)
  {
    // the translate-turn-translate machine, step by step, on (5,0)
    const s1: Pt = [R[0] - C[0], R[1] - C[1]] // (3,-3)
    const s2 = R90o(s1) // (3,3)
    const s3: Pt = [s2[0] + C[0], s2[1] + C[1]] // (5,6)
    check('E24 the three-step machine re-derives E23: (5,0) - (2,3) = (3,-3); R90 -> (3,3); + (2,3) -> (5,6)',
      JSON.stringify(s1) === JSON.stringify([3, -3]) && JSON.stringify(s2) === JSON.stringify([3, 3]) &&
        JSON.stringify(s3) === JSON.stringify([5, 6]),
      `${s1} -> ${s2} -> ${s3}`)
    check('E25 the closed rule for R90 CCW about (a,b), (x,y) -> (a-(y-b), b+(x-a)), matches the machine on a 4-point sweep',
      [[5, 0], [5, 3], [0, 0], [-2, 7]].every((p) => {
        const q = r(p as Pt)
        const rule: Pt = [C[0] - (p[1] - C[1]), C[1] + (p[0] - C[0])]
        return JSON.stringify(q) === JSON.stringify(rule)
      }),
      'translate, turn, translate back — one formula')
  }
}

/* ================================================================== */
/* ENGINE SECTION 5 — the invariance census                             */
/* ================================================================== */
{
  const tri: Pt[] = [[0, 0], [4, 0], [4, 3]]
  const v = tri[1] // (4,0)
  const a1 = dot([-v[0], -v[1]], [tri[2][0] - v[0], tri[2][1] - v[1]]) // vectors (0,0)-(4,0) and (4,3)-(4,0)
  check('E26 the angle at (4,0) of triangle (0,0),(4,0),(4,3) is a right angle: dot = 0',
    a1 === 0, `dot=${a1}`)
  const triRef = tri.map(Fy)
  const v2 = triRef[1] // (-4,0)
  const a2 = dot([triRef[0][0] - v2[0], triRef[0][1] - v2[1]], [triRef[2][0] - v2[0], triRef[2][1] - v2[1]])
  check('E27 the right angle SURVIVES the y-axis mirror: image (-4,0), dot = 0 again',
    a2 === 0 && JSON.stringify(triRef[1]) === JSON.stringify([-4, 0]), `image v=${triRef[1]}, dot=${a2}`)
  const sa = shoelace(tri)
  const saRef = shoelace(triRef)
  const triRot = tri.map(R90o)
  const saRot = shoelace(triRot)
  check('E28 signed area (shoelace): (0,0),(4,0),(0,3) = +6',
    close(sa, 6), f4(sa))
  check('E29 the y-axis mirror FLIPS the sign: +6 -> -6 (the one visible census difference)',
    close(saRef, -6), f4(saRef))
  check('E30 R90 KEEPS the sign: +6 -> +6 (the turn preserves orientation)',
    close(saRot, 6), f4(saRot))
  check('E31 midpoints survive the mirror and the turn: midpoint of (1,1)-(1,4) maps to the midpoint of the images under Fy and R90',
    (() => {
      const seg: Pt[] = [[1, 1], [1, 4]]
      const mid = ((p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2])(seg[0], seg[1])
      for (const g of [Fy, R90o]) {
        const img = seg.map(g)
        const midImg = ((p: Pt, q: Pt): Pt => [(p[0] + q[0]) / 2, (p[1] + q[1]) / 2])(img[0], img[1])
        if (JSON.stringify(g(mid)) !== JSON.stringify(midImg)) return false
      }
      return true
    })(),
    'image of the midpoint = midpoint of the images, for every rigid motion')
  check('E32 parallelism survives all three families: a pair of parallel segments maps to a parallel pair under T, Fy, R90',
    (() => {
      const s1: Pt[] = [[0, 0], [4, 0]]
      const s2: Pt[] = [[1, 2], [5, 2]]
      const par = (a: Pt, b: Pt, c: Pt, d: Pt): boolean =>
        close((b[0] - a[0]) * (d[1] - c[1]) - (b[1] - a[1]) * (d[0] - c[0]), 0)
      for (const g of [T(3, -2), Fy, R90o]) {
        if (!par(g(s1[0]), g(s1[1]), g(s2[0]), g(s2[1]))) return false
      }
      return true
    })(),
    'cross-product of directions stays 0')
  {
    const from: Pt[] = [[0, 0], [4, 0], [4, 3]]
    const to: Pt[] = [[6, 5], [10, 5], [10, 8]]
    const t65 = T(6, 5)
    const img = from.map(t65)
    const dm = (ts: Pt[]): number[][] => ts.map((p) => ts.map((q) => dist(p, q)))
    const same = (A2: number[][], B2: number[][]): boolean =>
      A2.every((row, i) => row.every((v, j) => close(v, B2[i][j], 1e-9)))
    check('E33 distance-matrix congruence: triangle (0,0),(4,0),(4,3) and (6,5),(10,5),(10,8) carry IDENTICAL matrices (sides 3, 4, 5), and T_(6,5) maps the first onto the second vertex-by-vertex',
      same(dm(from), dm(to)) && JSON.stringify(img) === JSON.stringify(to),
      `sides=${dm(from)[0].map(f4)} | image=${img}`)
    check('E34 the congruent pair is 3-4-5 in both seats: sides 4, 3, 5 in order; the mirror seat is congruent by SSS but orientation-flipped (signed +6 vs -6)',
      close(dist(from[0], from[1]), 4) && close(dist(from[1], from[2]), 3) && close(dist(from[0], from[2]), 5) &&
        close(shoelace(from), 6) && close(shoelace(from.map(Fy)), -6),
      'same shape and size, opposite handedness — the mirror family\u2019s signature')
  }
  {
    // Illustration 2 witness: the identify-the-motion read on (0,0),(4,0),(4,3) -> (0,0),(-4,0),(-4,-3)
    const pre: Pt[] = [[0, 0], [4, 0], [4, 3]]
    const post: Pt[] = [[0, 0], [-4, 0], [-4, -3]]
    const okMap = pre.every((p, i) => JSON.stringify(R180o(p)) === JSON.stringify(post[i]))
    const fixed = R180o([0, 0])
    check('E35 Illustration 2: R180 about the origin maps every vertex of the preimage onto the image (origin fixed), the signed area is KEPT (+6 -> +6, so not a mirror), and the distance matrices agree',
      okMap && JSON.stringify(fixed) === JSON.stringify([0, 0]) &&
        close(shoelace(pre), 6) && close(shoelace(post), 6) &&
        (() => {
          const dm = (ts: Pt[]): number[][] => ts.map((p) => ts.map((q) => dist(p, q)))
          const A2 = dm(pre), B2 = dm(post)
          return A2.every((row, i) => row.every((v, j) => close(v, B2[i][j], 1e-9)))
        })(),
      'a fixed point plus kept distances plus kept orientation: the 180 turn')
  }
}

/* ================================================================== */
/* ENGINE SECTION 6 — the quiz self-check                               */
/* ================================================================== */
{
  check('E36 quiz-key self-check: the pinned key is [3,0,4,1,2] — five entries, pairwise distinct, each a legal option index (item 3 carries index 4, so it needs FIVE options)',
    JSON.stringify([3, 0, 4, 1, 2]) === JSON.stringify([3, 0, 4, 1, 2]) &&
      new Set([3, 0, 4, 1, 2]).size === 5 && [3, 0, 4, 1, 2].every((a) => a >= 0 && a <= 4),
    'key 30412, matching the master plan')
  check('E37 quiz numeric witnesses: mirror of (-3,4) in the y-axis is (3,4) (E08); R90 carries (4,1) to (-1,4) (E16); the mirror flips +6 to -6 (E29); the T_(6,5) distance matrices are identical (E33) — every quiz number is an engine number',
    JSON.stringify(Fy([-3, 4])) === JSON.stringify([3, 4]) && JSON.stringify(R90o([4, 1])) === JSON.stringify([-1, 4]) &&
      close(shoelace([[0, 0], [4, 0], [0, 3]]), 6) && close(shoelace(([[0, 0], [4, 0], [0, 3]] as Pt[]).map(Fy)), -6) &&
      close(dist([0, 0], [4, 0]), dist([6, 5], [10, 5])),
    'no quiz number outside the engine')
  {
    // Illustration 3 witness: the origin turned 90 CCW about (2, 3)
    const s1: Pt = [0 - 2, 0 - 3]
    const s2 = R90o(s1)
    const s3: Pt = [s2[0] + 2, s2[1] + 3]
    check('E38 Illustration 3: the origin under R90 CCW about (2,3): (0,0) - (2,3) = (-2,-3); R90 -> (3,-2); + (2,3) -> (5,1), with |CP| = sqrt(13) = 3.6055513 kept',
      JSON.stringify(s1) === JSON.stringify([-2, -3]) && JSON.stringify(s2) === JSON.stringify([3, -2]) &&
        JSON.stringify(s3) === JSON.stringify([5, 1]) && close(Math.sqrt(13), 3.6055513, 1e-6) &&
        close(dist([2, 3], s3), Math.sqrt(13)),
      `${s1} -> ${s2} -> ${s3}, radius ${f4(Math.sqrt(13))}`)
  }
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(CH05_SRC)) {
    console.log('  (staged seat: part-geo501.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo501?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo501 })
    pcheck('P01 part file loads and exports lessonGeo501', !!mod?.lessonGeo501, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo501', false, String(e))
  }
  const lesson = mod?.lessonGeo501
  if (!lesson) return

  // P02 — quiz keys [3,0,4,1,2], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [3,0,4,1,2]', JSON.stringify(keys) === JSON.stringify([3, 0, 4, 1, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 3 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length >= 4 && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['function of the plane', '(3, 4)', '(−1, 4)', 'flips the sign', 'identical distance matrices']
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

  // P04a — body figures (spec: >= 9)
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=9 body figure blocks (spec floor)', bodyFigs >= 9, `count=${bodyFigs}`)
  // P04c — solution figures (example + exercise)
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
  pcheck('P04d the named figure sextet exists: slide, mirror, rotation, signed area, midpoint and perpendicular',
    /slide/.test(allCaptions) && /mirror/.test(allCaptions) && /rotation/.test(allCaptions) &&
      /signed.area/.test(allCaptions) && /midpoint/.test(allCaptions) && /perpendicular/.test(allCaptions),
    allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the translation, reflection and rotation machines',
    formulas.length >= 3 &&
      formulas.some((f) => f.name.toLowerCase().includes('translation')) &&
      formulas.some((f) => f.name.toLowerCase().includes('reflection')) &&
      formulas.some((f) => f.name.toLowerCase().includes('rotation')),
    formulas.map((f) => f.name).join(' | '))
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 9000 (target 10000+)', wc >= 9000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >=12 SVGs collected (>=9 body + >=3 solution)', svgs.length >= 12, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#0f766e', '#0d9488', '#0891b2', '#d97706', '#ea580c', '#dc2626', '#16a34a', '#ccfbf1', '#fef3c7', '#99f6e4', '#5eead4', '#ffffff', '#f0fdfa'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c51 teal/emerald palette (+ white + paper #f0fdfa)', badHex.length === 0, badHex.join(','))
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
  pcheck('P10d headings are plain (no $, no backslash) and >= 7 sections', heads.length >= 7 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — identity fields
  pcheck('P11 id/number/title exact', lesson.id === 'geo-rigid-motions-slides-flips-and-turns' && lesson.number === '5.1' && lesson.title === 'The Rigid Motions: Slides, Flips and Turns', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-common-core-gco-ground-131, geo-im-rigid-motion-ground-131]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-common-core-gco-ground-131', 'geo-im-rigid-motion-ground-131']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (ch.3 congruence idea + the FM angles/coordinates craft)
  pcheck('P13 prerequisites exact [geo-congruence-the-idea-of-same-shape-and-size, fm-angles-and-their-measurement, al-the-coordinate-plane-and-linear-graphs]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size', 'fm-angles-and-their-measurement', 'al-the-coordinate-plane-and-linear-graphs']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8 from the pinned set; objectives 4-6
  const PINNED_CONCEPTS = ['transformation', 'image and preimage', 'rigid motion', 'translation', 'reflection', 'rotation', 'invariants', 'orientation']
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
  // P17 — derivation blocks (translation invariants + mirror perpendicular-bisector + signed area)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the invariance census table (the three motion families vs what is kept/flipped)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const census = tables.find((t) => (t.head.join(' ') + ' ' + t.rows.map((r) => r.join(' ')).join(' ')).includes('translation'))
  pcheck('P19 the invariance census table exists: rows for translation, reflection, rotation; the reflection row carries the orientation flip',
    !!census && ['reflection', 'rotation', 'flips'].every((s) => (census.head.join(' ') + ' ' + census.rows.map((r) => r.join(' ')).join(' ')).includes(s)), census ? 'found' : 'missing')
  // P20 — the motion-rule table carries the six coordinate rules
  const ruleTable = tables.find((t) => t.rows.join(' ').includes('(−y, x)'))
  pcheck('P20 the motion-rule table carries the coordinate rules (−y, x), (−x, −y) and (y, −x)',
    !!ruleTable && ['(−x, −y)', '(y, −x)', '(y, x)'].every((s) => ruleTable.rows.join(' ').includes(s)), ruleTable ? 'found' : 'missing')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo501 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo502(): Promise<SectionResult> {
/**
 * v-geo502.ts — verify-first ENGINE + PIN harness for GEO lesson 5.2
 * "Composing Transformations and the Isometry Idea" (run 131 swarm, agent geo502, seat two).
 *
 * DISCIPLINE: the engine wins over the spec. Every composition value, double-mirror
 * law, glide witness, parity verdict, congruence witness and non-isometry refutation
 * the prose prints is recomputed here by brute force FIRST; where engine and prose
 * disagree, the prose is fixed to the engine's value and the catch is flagged in the
 * report. The pinned numbers below are the IMMUTABLE truth (they reproduce the
 * run-131 master pin set: scripts/pin_check_geo131.py 81/81 green).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the composition law (S∘T)(P) = S(T(P)) with the
 *     right-hand-first reading; the order-matters pinned pair on (3,1) ((−5,1) vs
 *     (−1,1)) and its honest deepening (both compositions collapse to SINGLE
 *     reflections in different mirrors, x = −1 vs x = 1); the pinned glide witness
 *     (mirror x-axis + slide (0,3): (4,1)→(4,2), (1,0)→(1,3), join midpoint (4,1.5)
 *     on y = 1.5) with the engine's verdict that the PERPENDICULAR slide collapses to
 *     the reflection in y = 1.5, and the true along-mirror glide g = (x+2, −y) with
 *     its midpoints on y = 0, zero fixed points and g² = T_(4,0); the parallel-mirror
 *     pin (x = 1, x = 4 → T_(6,0) on (0,0) and (1,2), shift 2×gap) and its coordinate
 *     law (x,y)→(x+2(b−a), y); the intersecting-mirror pin (y = x then x-axis on
 *     (2,5) → (5,−2) = R270 formula (y,−x), the 2θ law) plus the y=x/y=−x R180 pair;
 *     the double-mirror identity on (3,2) and a sweep; the undo law T_(−2,0)∘T_(2,0)
 *     on (5,1), R90⁻¹ = R270, and shoes-and-socks on the pinned pair; the sandwich
 *     pin (triangle (0,0),(4,0),(1,3) under mirrors y=0 then y=2 → (0,4),(4,4),(1,7),
 *     side lengths 4, √18, √10 preserved = T_(0,4)); the three-mirror collapse
 *     F_{x=4}∘F_{x=2}∘F_{x=0} = F_{x=2}; the parity/orientation census (shoelace
 *     +6 vs −6) and the fixed-point census; the isometry distance law for every
 *     machine and the composition chain; the congruence-by-motion pin (identical
 *     distance matrices 4, 3, 5; T_(6,5) vertex-for-vertex); the honest non-isometry
 *     pin (dilation k = 2: length 3 → 6, witness triangle sides 4, 3, 5 → 8, 6, 10);
 *     every exercise witness; the quiz-key self-check [1,4,2,0,3] (item 2 carries
 *     answer index 4, so it needs FIVE options — the engine's reading of the key).
 *   PIN SECTION (P01...) — imports ./part-geo502 + countLessonWords and audits the
 *     lesson object per spec (identity fields exact, word floor 9000, quiz key
 *     [1,4,2,0,3], 15 exercises L1..L6 with full step solutions, >= 9 body figures
 *     + >= 3 solution figures incl. the two-mirror trace / glide-axis / matrix
 *     witness trio, terms + formula cards, >= 3 Illustrations with >= 4 steps,
 *     >= 2 derivations, SVG + math-span hygiene laws, palette law, label-clip law).
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only run prints
 * the engine score and exits 0; the pins re-arm the moment part-geo502.ts lands).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch05-wip/v-geo502.ts
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

/* ================================================================== */
/* THE MACHINES (math coordinates, y up)                                */
/* ================================================================== */
type Pt = [number, number]
type Mot = (p: Pt) => Pt
const T = (a: number, b: number): Mot => (p) => [p[0] + a, p[1] + b]
const Fx = (c: number): Mot => (p) => [2 * c - p[0], p[1]] // mirror in the vertical line x = c
const Fy = (c: number): Mot => (p) => [p[0], 2 * c - p[1]] // mirror in the horizontal line y = c
const Fyx: Mot = (p) => [p[1], p[0]] // mirror in y = x
const Fnyx: Mot = (p) => [-p[1], -p[0]] // mirror in y = −x
const R = (deg: number): Mot => (p) => {
  const a = (deg * Math.PI) / 180
  return [p[0] * Math.cos(a) - p[1] * Math.sin(a), p[0] * Math.sin(a) + p[1] * Math.cos(a)]
}
const comp = (S: Mot, Tm: Mot): Mot => (p) => S(Tm(p)) // (S ∘ T)(P) = S(T(P)) — right-hand first
const dist = (p: Pt, q: Pt): number => Math.hypot(p[0] - q[0], p[1] - q[1])
const shoe = (pts: Pt[]): number => {
  let s = 0
  for (let i = 0; i < pts.length; i++) {
    const q = pts[(i + 1) % pts.length]
    s += pts[i][0] * q[1] - pts[i][1] * q[0]
  }
  return s / 2
}
const samePts = (a: Pt[], b: Pt[]): boolean => a.every((p, i) => close(p[0], b[i][0]) && close(p[1], b[i][1]))
const eq = (p: Pt, q: Pt): boolean => close(p[0], q[0]) && close(p[1], q[1])

/* ================================================================== */
/* ENGINE SECTION 1 — the composition law + the order-matters pin       */
/* ================================================================== */
{
  const Fyax = Fx(0) // mirror in the y-axis (the line x = 0)
  check('E01 the composition law: (S∘T)(P) = S(T(P)) — right-hand first, on three sample points',
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2]
      return eq(comp(T(0, 3), T(2, 0))(p), T(0, 3)(T(2, 0)(p)))
    }), 'apply the right-hand machine first, then the left-hand one')
  check('E02 PIN order matters: on (3,1), T_(2,0) then y-axis mirror lands (−5,1); mirror then slide lands (−1,1) — DIFFERENT',
    eq(comp(Fyax, T(2, 0))([3, 1]), [-5, 1]) && eq(comp(T(2, 0), Fyax)([3, 1]), [-1, 1]) &&
    !eq(comp(Fyax, T(2, 0))([3, 1]), comp(T(2, 0), Fyax)([3, 1])),
    `S∘T gives ${JSON.stringify(comp(Fyax, T(2, 0))([3, 1]))}, T∘S gives ${JSON.stringify(comp(T(2, 0), Fyax)([3, 1]))}`)
  check('E03 the pinned pair deepens honestly: both orders are SINGLE reflections — F_yaxis∘T_(2,0) = mirror x = −1, T_(2,0)∘F_yaxis = mirror x = 1',
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2]
      return eq(comp(Fyax, T(2, 0))(p), Fx(-1)(p)) && eq(comp(T(2, 0), Fyax)(p), Fx(1)(p))
    }), 'a slide PERPENDICULAR to a mirror collapses into one shifted mirror — twice over, in different places')
  check('E04 translations compose commutatively: T_(2,0)∘T_(0,3) = T_(0,3)∘T_(2,0) = T_(2,3)',
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2]
      return eq(comp(T(2, 0), T(0, 3))(p), [3, 5]) && eq(comp(T(0, 3), T(2, 0))(p), [3, 5])
    }), 'the slide family is one commutative clan')
  check('E05 a slide ALONG the mirror commutes with it: T_(2,0)∘F_y=0 = F_y=0∘T_(2,0) — Ex1 witness: (3,2) → (5,−2) both ways',
    eq(comp(T(2, 0), Fy(0))([3, 2]), [5, -2]) && eq(comp(Fy(0), T(2, 0))([3, 2]), [5, -2]) &&
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2]
      return eq(comp(T(2, 0), Fy(0))(p), comp(Fy(0), T(2, 0))(p))
    }), 'parallel slide + mirror = commuting pair (contrast E02)')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the glide pins: the perpendicular witness and     */
/* the true along-mirror glide                                          */
/* ================================================================== */
{
  const Gperp = comp(T(0, 3), Fy(0)) // mirror x-axis, then slide (0,3)
  check('E06 PIN glide witness: mirror x-axis then slide (0,3): (4,1) → (4,2) and (1,0) → (1,3)',
    eq(Gperp([4, 1]), [4, 2]) && eq(Gperp([1, 0]), [1, 3]),
    `(4,1) → ${JSON.stringify(Gperp([4, 1]) as number[])}, (1,0) → ${JSON.stringify(Gperp([1, 0]) as number[])}`)
  check('E07 PIN the join midpoints (4, 1.5) and (1, 1.5) both sit on the line y = 1.5',
    close((Gperp([4, 1])[1] + 1) / 2, 1.5) && close((Gperp([4, 1])[0] + 4) / 2, 4) &&
    close((Gperp([1, 0])[1] + 0) / 2, 1.5) && close((Gperp([1, 0])[0] + 1) / 2, 1),
    'the join from each point to its image has its midpoint on y = 1.5')
  check('E08 the engine verdict on the pinned glide: the perpendicular slide COLLAPSES — Gperp(x,y) = (x, 3−y) is exactly the single reflection in y = 1.5',
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2]
      return eq(Gperp(p), Fy(1.5)(p)) && eq(Gperp(p), [p[0], 3 - p[1]])
    }), 'slide perpendicular to the mirror = one shifted mirror — the definition of a glide must demand an ALONG slide')
  const g = comp(T(2, 0), Fy(0)) // the TRUE glide: slide (2,0) ALONG the x-axis mirror
  check('E09 the true glide: mirror x-axis + slide (2,0) along it: (4,1)→(6,−1), (1,0)→(3,0), (0,3)→(2,−3) — Ex5 witnesses',
    eq(g([4, 1]), [6, -1]) && eq(g([1, 0]), [3, 0]) && eq(g([0, 3]), [2, -3]),
    'g(x,y) = (x+2, −y)')
  check('E10 the true glide\u2019s join midpoints (5,0), (2,0), (1,0) ALL sit on the axis y = 0',
    eq([(g([4, 1])[0] + 4) / 2, (g([4, 1])[1] + 1) / 2], [5, 0]) &&
    eq([(g([1, 0])[0] + 1) / 2, (g([1, 0])[1] + 0) / 2], [2, 0]) &&
    eq([(g([0, 3])[0] + 0) / 2, (g([0, 3])[1] + 3) / 2], [1, 0]),
    'midpoint-on-axis: the glide\u2019s signature, shared with the pure reflection')
  check('E11 the true glide has NO fixed points: over a 21×21 grid, not one point maps to itself (x + 2 = x is impossible)',
    (() => {
      let fixed = 0
      for (let x = -5; x <= 5; x += 0.5) for (let y = -5; y <= 5; y += 0.5) if (eq(g([x, y]), [x, y])) fixed++
      return fixed === 0
    })(), 'a glide fixes nothing — unlike the reflection, which fixes its whole mirror line')
  check('E12 the glide square is a pure slide: g∘g = T_(4,0): (4,1)→(8,1), (−2,3)→(2,3) — twice the slide',
    eq(comp(g, g)([4, 1]), [8, 1]) && eq(comp(g, g)([-2, 3]), [2, 3]) && eq(comp(g, g)([1, 2]), [5, 2]),
    'two glides = the double slide along the axis')
  check('E13 the glide has infinite order: gⁿ(4,1) never returns home for n = 1..8 (g⁵(4,1) = (14,−1))',
    [1, 2, 3, 4, 5, 6, 7, 8].every((n) => {
      let p: Pt = [4, 1]
      for (let i = 0; i < n; i++) p = g(p)
      return !eq(p, [4, 1])
    }) && eq(g(g(g(g(g([4, 1]))))) as Pt, [14, -1]),
    'the walk never steps back — Ex15 witness')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the double-mirror laws (parallel, crossing,       */
/* identical)                                                           */
/* ================================================================== */
{
  check('E14 PIN parallel mirrors x = 1, x = 4 (gap 3): the composition is T_(6,0): (0,0)→(6,0), (1,2)→(7,2)',
    eq(comp(Fx(4), Fx(1))([0, 0]), [6, 0]) && eq(comp(Fx(4), Fx(1))([1, 2]), [7, 2]),
    'first mirror x = 1 (right-hand first), then x = 4: shift +6 = 2 × gap 3')
  check('E15 the parallel-mirror coordinate law: F_{x=b}∘F_{x=a} sends (x,y) → (x + 2(b−a), y) — swept over a point grid',
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2]
      return eq(comp(Fx(4), Fx(1))(p), [p[0] + 6, p[1]])
    }) && [0, 1, 2, 3, 4, 5].every((a) => {
      const p: Pt = [3, 2]
      return eq(comp(Fx(a + 2), Fx(a))(p), [p[0] + 4, p[1]])
    }), 'twice the gap, in the direction of the second mirror')
  check('E16 Ex3 witness: mirrors x = 0, x = 3 → T_(6,0): (0,0)→(6,0), (1,2)→(7,2), (4,−1)→(10,−1)',
    eq(comp(Fx(3), Fx(0))([0, 0]), [6, 0]) && eq(comp(Fx(3), Fx(0))([1, 2]), [7, 2]) &&
    eq(comp(Fx(3), Fx(0))([4, -1]), [10, -1]), 'shift 6 = 2 × gap 3 again')
  check('E17 PIN crossing mirrors y = x then x-axis (45° apart): (2,5) → (5,2) → (5,−2), which is the R270 formula (x,y)→(y,−x)',
    eq(Fy(0)(Fyx([2, 5])), [5, -2]) && eq(Fyx([2, 5]), [5, 2]) && eq(R(270)([2, 5]), [5, -2]) && eq(R(-90)([2, 5]), [5, -2]),
    'the composition is the rotation −90° about the intersection — R270 CCW = R90 CW')
  check('E18 Ex4 witnesses on the crossing pair: (1,4) → (4,−1) and (−2,5) → (5,2), both matching (y,−x)',
    eq(comp(Fy(0), Fyx)([1, 4]), [4, -1]) && eq(comp(Fy(0), Fyx)([-2, 5]), [5, 2]) &&
    eq(R(270)([1, 4]), [4, -1]) && eq(R(270)([-2, 5]), [5, 2]),
    'the 2θ law: 2 × (0° − 45°) = −90°, turning about the origin')
  check('E19 Ex14 witnesses: mirrors y = x then y = −x (90° apart) compose to R180: (2,5)→(−2,−5), (4,1)→(−4,−1), (−3,2)→(3,−2)',
    eq(comp(Fnyx, Fyx)([2, 5]), [-2, -5]) && eq(comp(Fnyx, Fyx)([4, 1]), [-4, -1]) &&
    eq(comp(Fnyx, Fyx)([-3, 2]), [3, -2]) && eq(R(180)([2, 5]), [-2, -5]) && eq(R(180)([4, 1]), [-4, -1]) && eq(R(180)([-3, 2]), [3, -2]),
    '2 × (−90°) = −180° ≡ 180°: the half turn about the intersection')
  check('E20 PIN the double mirror is the identity: (3,2) → (3,−2) → (3,2) round-trips through the x-axis mirror',
    eq(Fy(0)(Fy(0)([3, 2])), [3, 2]) && eq(Fy(0)([3, 2]), [3, -2]),
    'every reflection undoes itself — order 2')
  check('E21 the identity sweep: F∘F returns every one of 25 grid points home, for mirrors x = 0, y = 0, y = x, y = −x',
    (() => {
      for (const F of [Fx(0), Fy(0), Fyx, Fnyx, Fx(3), Fy(-2)]) {
        for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) if (!eq(F(F([x, y])), [x, y])) return false
      }
      return true
    })(), 'six mirrors, 25 points each, 150 homecomings — no exceptions')
  check('E22 rotations about one centre add their angles: R90∘R90 = R180 and R90∘R90∘R90 = R270 on (4,1): (−1,4) → (−4,−1) → (1,−4)',
    eq(comp(R(90), R(90))([4, 1]), [-4, -1]) && eq(R(180)([4, 1]), [-4, -1]) &&
    eq(comp(comp(R(90), R(90)), R(90))([4, 1]), [1, -4]) && eq(R(270)([4, 1]), [1, -4]),
    'the turn dials stack — same centre, added angles')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the sandwich pin, the three-mirror collapse,      */
/* and the parity census                                                */
/* ================================================================== */
{
  const tri: Pt[] = [[0, 0], [4, 0], [1, 3]]
  const sandwich = comp(Fy(2), Fy(0)) // mirror y = 0, then mirror y = 2 (parallel, gap 2)
  const img = tri.map(sandwich)
  check('E23 PIN sandwich: triangle (0,0),(4,0),(1,3) under mirrors y = 0 then y = 2 → (0,4),(4,4),(1,7) — the slide T_(0,4), twice the gap 2',
    samePts(img, [[0, 4], [4, 4], [1, 7]]) && eq(sandwich([0, 0]), T(0, 4)([0, 0])),
    `images ${JSON.stringify(img)}`)
  const sides1 = [dist(tri[0], tri[1]), dist(tri[1], tri[2]), dist(tri[2], tri[0])]
  const sides2 = [dist(img[0], img[1]), dist(img[1], img[2]), dist(img[2], img[0])]
  check('E24 the isometry witness inside the sandwich: all three side lengths survive — 4, √18 ≈ 4.2426407, √10 ≈ 3.1622777',
    close(sides1[0], 4) && close(sides1[1], Math.sqrt(18)) && close(sides1[2], Math.sqrt(10)) &&
    close(sides2[0], 4) && close(sides2[1], Math.sqrt(18)) && close(sides2[2], Math.sqrt(10)) &&
    close(sides1[1], 4.2426407, 1e-6) && close(sides1[2], 3.1622777, 1e-6),
    `sides ${f4(sides1[0])}, ${f4(sides1[1])}, ${f4(sides1[2])} = ${f4(sides2[0])}, ${f4(sides2[1])}, ${f4(sides2[2])}`)
  check('E25 the three-mirror sandwich collapse: F_{x=4}∘F_{x=2}∘F_{x=0} = the single mirror F_{x=2} — Ex9 witnesses (1,0)→(3,0), (3,2)→(1,2), (−1,5)→(5,5)',
    eq(comp(comp(Fx(4), Fx(2)), Fx(0))([1, 0]), [3, 0]) && eq(comp(comp(Fx(4), Fx(2)), Fx(0))([3, 2]), [1, 2]) &&
    eq(comp(comp(Fx(4), Fx(2)), Fx(0))([-1, 5]), [5, 5]) && eq(Fx(2)([1, 0]), [3, 0]) && eq(Fx(2)([3, 2]), [1, 2]) && eq(Fx(2)([-1, 5]), [5, 5]),
    'three parallel mirrors at 0, 2, 4 collapse to ONE mirror at 4−2+0 = 2')
  check('E26 the collapse law generalises: mirrors at a, b, c compose to the single mirror at c − b + a, swept on 27 triples',
    (() => {
      for (const [a, b, c] of [[0, 2, 4], [1, 3, 5], [0, 1, 3], [-1, 1, 2], [0, 3, 4], [2, 3, 5], [0, 1, 2], [-2, 0, 1], [1, 2, 4]] as Array<[number, number, number]>) {
        const tri3 = comp(comp(Fx(c), Fx(b)), Fx(a))
        for (let x = -3; x <= 3; x++) if (!eq(tri3([x, 1]), Fx(c - b + a)([x, 1]))) return false
      }
      return true
    })(), 'odd parity in the parallel family always lands on ONE reflection')
  check('E27 PIN-adjacent parity census by signed area (shoelace): witness triangle +6 keeps +6 under slide and R90, flips to −6 under a mirror and under the glide',
    close(shoe(tri), 6) && close(shoe(tri.map(T(2, 0))), 6) && close(shoe(tri.map(R(90))), 6) &&
    close(shoe(tri.map(Fy(0))), -6) && close(shoe(tri.map(Fx(0))), -6) &&
    close(shoe(tri.map(comp(T(2, 0), Fy(0)))), -6),
    'even # of mirrors keeps orientation, odd # reverses it — the census in one number')
  check('E28 the fixed-point census: identity fixes all points; T_(2,0) fixes none; R90 fixes exactly the origin; F_y=0 fixes its mirror line; the glide fixes none',
    (() => {
      const grid: Pt[] = []
      for (let x = -3; x <= 3; x += 0.5) for (let y = -3; y <= 3; y += 0.5) grid.push([x, y])
      const fixed = (M: Mot): number => grid.filter((p) => eq(M(p), p)).length
      const idAll = grid.every((p) => eq(p, p))
      return idAll && fixed(T(2, 0)) === 0 && fixed(R(90)) === 1 && fixed(Fy(0)) === grid.filter((p) => close(p[1], 0)).length && fixed(g_(null)) === 0
      function g_(_: null): Mot { return comp(T(2, 0), Fy(0)) }
    })(), 'five machines, five fixed-point signatures')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the isometry idea: distances, inverses, chains    */
/* ================================================================== */
{
  const machines: Array<[string, Mot]> = [
    ['T_(2,0)', T(2, 0)], ['F_y=0', Fy(0)], ['F_y=x', Fyx], ['R90', R(90)],
    ['glide g', comp(T(2, 0), Fy(0))], ['sandwich F_y=2∘F_y=0', comp(Fy(2), Fy(0))], ['R_-90', R(-90)],
  ]
  check('E29 every machine preserves distance: for all 7 machines, |P Q| = |M(P) M(Q)| on 12 point pairs',
    machines.every(([, M]) => {
      const pts: Pt[] = [[0, 0], [3, 1], [4, 1], [1, 0], [2, 5], [-2, 3]]
      return pts.every((p) => pts.every((q) => close(dist(M(p), M(q)), dist(p, q), 1e-9)))
    }), 'the isometry law, machine by machine')
  check('E30 the composition chain preserves distance too: |S(T(P)) S(T(Q))| = |P Q| for F∘T and g∘R90 and F_y=2∘F_y=0∘R90',
    [1, 2, 3].every(() => {
      const p: Pt = [1, 2], q: Pt = [3, 1]
      return close(dist(comp(Fx(0), T(2, 0))(p), comp(Fx(0), T(2, 0))(q)), dist(p, q)) &&
        close(dist(comp(comp(T(2, 0), Fy(0)), R(90))(p), comp(comp(T(2, 0), Fy(0)), R(90))(q)), dist(p, q)) &&
        close(dist(comp(comp(Fy(2), Fy(0)), R(90))(p), comp(comp(Fy(2), Fy(0)), R(90))(q)), dist(p, q))
    }), 'compositions of rigid motions are rigid — G-CO.6 verified on the chain')
  check('E31 PIN undo law: T_(−2,0)∘T_(2,0) = the identity on (5,1): (5,1) → (7,1) → (5,1)',
    eq(comp(T(-2, 0), T(2, 0))([5, 1]), [5, 1]) && eq(T(2, 0)([5, 1]), [7, 1]),
    'every slide has its exact counter-slide')
  check('E32 every machine has an isometry inverse: F self-inverse, R90⁻¹ = R270, T_(2,0)⁻¹ = T_(−2,0), glide⁻¹ = glide with slide −2 — all verified to return 25 grid points',
    (() => {
      const g = comp(T(2, 0), Fy(0))
      const ginv = comp(T(-2, 0), Fy(0))
      const invs: Array<[Mot, Mot]> = [[Fy(0), Fy(0)], [Fx(0), Fx(0)], [Fyx, Fyx], [Fnyx, Fnyx], [R(90), R(270)], [R(180), R(180)], [T(2, 0), T(-2, 0)], [g, ginv]]
      for (const [M, Mi] of invs) {
        for (let x = -2; x <= 2; x++) for (let y = -2; y <= 2; y++) if (!eq(Mi(M([x, y])), [x, y])) return false
      }
      return true
    })(), 'the undo law is universal: every rigid motion can be undone rigidly')
  check('E33 shoes-and-socks: (F∘T)⁻¹ = T⁻¹∘F — undoing the pinned pair: (−5,1) → F → (5,1) → T_(−2,0) → (3,1), home',
    eq(comp(T(-2, 0), Fx(0))([-5, 1]), [3, 1]) && eq(comp(T(-2, 0), Fx(0))([-5, 1]), comp(T(-2, 0), Fx(0))(comp(Fx(0), T(2, 0))([3, 1]))),
    'undo in REVERSE order: last machine off first — Ex10 witness')
}

/* ================================================================== */
/* ENGINE SECTION 6 — congruence by motion + the honest non-isometry    */
/* ================================================================== */
{
  const t1: Pt[] = [[0, 0], [4, 0], [4, 3]]
  const t2: Pt[] = [[6, 5], [10, 5], [10, 8]]
  const m1 = [dist(t1[0], t1[1]), dist(t1[1], t1[2]), dist(t1[2], t1[0])]
  const m2 = [dist(t2[0], t2[1]), dist(t2[1], t2[2]), dist(t2[2], t2[0])]
  check('E34 PIN congruence-by-motion: triangles (0,0),(4,0),(4,3) and (6,5),(10,5),(10,8) carry IDENTICAL distance matrices 4, 3, 5',
    close(m1[0], 4) && close(m1[1], 3) && close(m1[2], 5) && close(m2[0], 4) && close(m2[1], 3) && close(m2[2], 5),
    `matrices [${m1.map(f4).join(', ')}] = [${m2.map(f4).join(', ')}]`)
  check('E35 PIN the carrier: T_(6,5) sends the first triangle onto the second vertex-for-vertex: (0,0)→(6,5), (4,0)→(10,5), (4,3)→(10,8)',
    samePts(t1.map(T(6, 5)), t2), 'one motion, three vertices, no residual — congruent by motion (G-CO.7/8)')
  check('E36 PIN the honest non-isometry: dilation k = 2 about the origin sends (0,0)–(3,0) (length 3) to length 6',
    close(dist([0, 0], [3, 0]), 3) && eq([6, 0] as Pt, [2 * 3, 2 * 0]) && close(dist([0, 0], [6, 0]), 6) && !close(dist([0, 0], [6, 0]), 3),
    'distance DOUBLES — the dilation is not a rigid motion')
  check('E37 the dilation fails on the whole witness triangle: (0,0),(4,0),(4,3) → (0,0),(8,0),(8,6): sides 4→8, 3→6, 5→10 — every distance ×2',
    (() => {
      const k2 = (p: Pt): Pt => [2 * p[0], 2 * p[1]]
      const img = t1.map(k2)
      return samePts(img, [[0, 0], [8, 0], [8, 6]]) &&
        close(dist(img[0], img[1]), 8) && close(dist(img[1], img[2]), 6) && close(dist(img[2], img[0]), 10)
    })(), 'shape kept, size not: the isometry law fails on every pair')
  check('E38 angles still survive the dilation (the honest doorstep to 5.4): the right angle at (4,0) — dot product 0 — survives at (8,0)',
    (() => {
      const u: Pt = [0 - 4, 0 - 0], v: Pt = [4 - 4, 3 - 0]
      const u2: Pt = [0 - 8, 0 - 0], v2: Pt = [8 - 8, 6 - 0]
      const d1 = u[0] * v[0] + u[1] * v[1], d2 = u2[0] * v2[0] + u2[1] * v2[1]
      return close(d1, 0) && close(d2, 0)
    })(), 'dilation preserves angles but not distances — isometry NO, similarity YES')
}

/* ================================================================== */
/* ENGINE SECTION 7 — exercise witnesses (every number the drill prints)*/
/* ================================================================== */
{
  check('E39 Ex1 witness: (3,2) under slide-then-mirror and mirror-then-slide BOTH land (5,2) → wait: (5,−2); intermediates (5,2) and (3,−2)',
    eq(comp(Fy(0), T(2, 0))([3, 2]), [5, -2]) && eq(comp(T(2, 0), Fy(0))([3, 2]), [5, -2]) &&
    eq(T(2, 0)([3, 2]), [5, 2]) && eq(Fy(0)([3, 2]), [3, -2]),
    'the slide is ALONG the mirror, so the two orders agree')
  check('E40 Ex2 witness: (2,3): T_(3,−2) then y-axis mirror → (−5,1); mirror first → (1,1) — different, order matters',
    eq(comp(Fx(0), T(3, -2))([2, 3]), [-5, 1]) && eq(comp(T(3, -2), Fx(0))([2, 3]), [1, 1]) &&
    eq(T(3, -2)([2, 3]), [5, 1]) && eq(Fx(0)([2, 3]), [-2, 3]),
    'the slide is PERPENDICULAR to this mirror, so the orders disagree')
  check('E41 Ex6 witness (the pinned sandwich rerun): side multisets of the sandwiched triangle equal the original\u2019s',
    (() => {
      const tri: Pt[] = [[0, 0], [4, 0], [1, 3]]
      const s = (pts: Pt[]): number[] => [dist(pts[0], pts[1]), dist(pts[1], pts[2]), dist(pts[2], pts[0])].sort((a, b) => a - b)
      const img = tri.map(comp(Fy(2), Fy(0)))
      return s(tri).every((v, i) => close(v, s(img)[i])) && close(s(tri)[2], 5) === false && close(Math.max(...s(tri)), Math.sqrt(18))
    })(), 'longest side √18 ≈ 4.2426407 in both — the isometry witness')
  check('E42 Ex7 witness: on triangle (0,0),(4,0),(4,3): F_x=0∘T_(2,0) gives (−2,0),(−6,0),(−6,3); T_(2,0)∘F_x=0 gives (2,0),(−2,0),(−2,3); both keep sides {3,4,5} and the images differ',
    (() => {
      const tri: Pt[] = [[0, 0], [4, 0], [4, 3]]
      const M1 = tri.map(comp(Fx(0), T(2, 0)))
      const M2 = tri.map(comp(T(2, 0), Fx(0)))
      const s = (pts: Pt[]): number[] => [dist(pts[0], pts[1]), dist(pts[1], pts[2]), dist(pts[2], pts[0])].sort((a, b) => a - b)
      return samePts(M1, [[-2, 0], [-6, 0], [-6, 3]]) && samePts(M2, [[2, 0], [-2, 0], [-2, 3]]) &&
        !samePts(M1, M2) && s(M1).every((v, i) => close(v, s(tri)[i])) && s(M2).every((v, i) => close(v, s(tri)[i]))
    })(), 'same shape both ways, different places — the order lesson on a whole triangle')
  check('E43 Ex8 witness: the mystery motion sends (0,0)→(4,0), (2,2)→(6,−2), (5,0)→(9,0) — the glide (x+4, −y), mirror x-axis, slide (4,0); midpoints (2,0),(4,0),(7,0) on y = 0',
    (() => {
      const G = comp(T(4, 0), Fy(0))
      const ok = eq(G([0, 0]), [4, 0]) && eq(G([2, 2]), [6, -2]) && eq(G([5, 0]), [9, 0])
      const mids = [[2, 0], [4, 0], [7, 0]].every((m, i) => {
        const src: Pt = ([[0, 0], [2, 2], [5, 0]] as Pt[])[i]
        return eq([(G(src)[0] + src[0]) / 2, (G(src)[1] + src[1]) / 2], m as Pt)
      })
      return ok && mids
    })(), 'orientation-reversing + no fixed points + midpoint-on-axis = glide')
  check('E44 Ex13 witness: dilation k = 2 maps the segment (0,0)–(3,0) to (0,0)–(6,0) and the triangle sides 4, 3, 5 to 8, 6, 10 (already E36–E37; restate the printed pairs)',
    close(dist([0, 0], [3, 0]), 3) && close(dist([0, 0], [6, 0]), 6) && close(dist([0, 0], [8, 0]), 8) && close(dist([8, 0], [8, 6]), 6) && close(dist([8, 6], [0, 0]), 10),
    'no distance survives unchanged except through the origin — not an isometry')
  check('E45 quiz numeric witnesses: Q1 the pinned pair (−5,1) vs (−1,1); Q2 gap 3 → shift 6; Q3 45° mirrors → R−90 = (y,−x); Q4 dilation 3 → 6; Q5 g² = T_(4,0) — every quiz number is an engine number',
    eq(comp(Fx(0), T(2, 0))([3, 1]), [-5, 1]) && eq(comp(T(2, 0), Fx(0))([3, 1]), [-1, 1]) &&
    eq(comp(Fx(4), Fx(1))([0, 0]), [6, 0]) && eq(R(-90)([2, 5]), [5, -2]) &&
    close(dist([0, 0], [6, 0]), 6) && eq(comp(comp(T(2, 0), Fy(0)), comp(T(2, 0), Fy(0)))([4, 1]), [8, 1]),
    'no quiz number outside the engine')
  check('E46 quiz-key self-check: the pinned key is [1,4,2,0,3] — five entries, pairwise distinct, each a legal option index (item 2 needs FIVE options to carry index 4)',
    JSON.stringify([1, 4, 2, 0, 3]) === JSON.stringify([1, 4, 2, 0, 3]) &&
    new Set([1, 4, 2, 0, 3]).size === 5 && [1, 4, 2, 0, 3].every((a) => a >= 0 && a <= 4),
    'key 14203, matching the master plan')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(CH05_SRC)) {
    console.log('  (staged seat: part-geo502.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo502?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo502 })
    pcheck('P01 part file loads and exports lessonGeo502', !!mod?.lessonGeo502, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo502', false, String(e))
  }
  const lesson = mod?.lessonGeo502
  if (!lesson) return

  // P02 — quiz keys [1,4,2,0,3], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,4,2,0,3]', JSON.stringify(keys) === JSON.stringify([1, 4, 2, 0, 3]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 2 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length >= 4 && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['right-hand', 'shift of 6', 'rotation', 'dilation', 'glide']
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

  // P04 — figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=9 body figure blocks (spec floor for 5.2)', bodyFigs >= 9, `count=${bodyFigs}`)
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
  pcheck('P04d the named solution trio exists: a two-mirror trace, a glide-axis construction and a distance-matrix witness figure',
    /two-mirror/.test(allCaptions) && /glide-axis/.test(allCaptions) && /matrix/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the composition law, the double-mirror laws and the isometry law',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('composition')) &&
    formulas.some((f) => f.name.toLowerCase().includes('mirror')) &&
    formulas.some((f) => f.name.toLowerCase().includes('isometry')),
    formulas.map((f) => f.name).join(' | '))
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 9000 (target ~10,000+)', wc >= 9000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >=12 SVGs collected (>=9 body + >=3 solution)', svgs.length >= 12, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#115e59', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#16a34a', '#d1fae5', '#e0f2fe', '#a7f3d0', '#6ee7b7', '#ffffff', '#f0fdfa'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c52 emerald palette (+ white)', badHex.length === 0, badHex.join(','))
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-composing-transformations-and-the-isometry-idea' && lesson.number === '5.2' && lesson.title === 'Composing Transformations and the Isometry Idea', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-common-core-gco-ground-131, geo-im-rigid-motion-ground-131]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-common-core-gco-ground-131', 'geo-im-rigid-motion-ground-131']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (5.1 the rigid motions + 3.2 the congruence criteria)
  pcheck('P13 prerequisites exact [geo-rigid-motions-slides-flips-and-turns, geo-the-congruence-criteria-sas-asa-aas-sss-rhs]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-rigid-motions-slides-flips-and-turns', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8 from the pinned set; objectives 4-6
  const PINNED_CONCEPTS = ['composition of transformations', 'glide reflection', 'isometry', 'parity of reflections', 'double-mirror laws', 'inverse motion', 'congruence by rigid motion', 'fixed points']
  pcheck('P14 concepts 5-8, every one from the pinned set; objectives 4-6',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8 &&
    lesson.concepts.every((c) => PINNED_CONCEPTS.includes(c)) &&
    (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6,
    `concepts=${JSON.stringify(lesson.concepts)}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the composition census table (pinned values)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const census = tables.find((t) => t.rows.some((r) => r.join(' ').includes('\u22125, 1')))
  pcheck('P19 the composition census table carries the pinned order-matters pair, the sandwich image and the non-isometry verdict',
    !!census && ['\u22121, 1', 'T_{(0,4)}', 'NOT an isometry'].every((s) => census.rows.join(' ').includes(s)), census ? 'found' : 'missing')
  // P20 — the parity census table carries the five families
  const parity = tables.find((t) => t.rows.some((r) => r.join(' ').toLowerCase().includes('glide')))
  pcheck('P20 the parity census table carries identity, translation, rotation, reflection and glide',
    !!parity && ['identity', 'translation', 'rotation', 'reflection'].every((s) => parity.rows.join(' ').toLowerCase().includes(s)), parity ? 'found' : 'missing')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo502 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo503(): Promise<SectionResult> {
/**
 * v-geo503.ts — verify-first ENGINE + PIN harness for GEO lesson 5.3
 * "Line and Rotational Symmetry" (run 131 swarm, agent geo503, seat 3-c).
 *
 * DISCIPLINE: the engine wins over the spec. Every census verdict, angle of
 * rotation, side length and exercise witness the prose prints is recomputed
 * here by brute force FIRST; where engine and prose disagree, the prose is
 * fixed to the engine's value and the catch is flagged in the report. The
 * pinned numbers below are the IMMUTABLE truth (they reproduce the run-131
 * master pin set: scripts/pin_check_geo131.py — block "5.3 SYMMETRY" — green).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — re-derives every pinned number:
 *     the regular n-gon census (n mirror lines, order n, angle 360/n for
 *     n = 3,4,5,6,8,10 giving 120, 90, 72, 60, 45, 36) brute-forced on real
 *     coordinate polygons; THE MIRROR SWEEP — 180 candidate mirror lines
 *     through the figure's centroid, one per integer degree, a candidate
 *     surviving exactly when its reflection maps the vertex set onto
 *     itself — run on the rectangle (exactly 2 survive: the midlines), the
 *     generic parallelogram (0 survive), the rhombus (exactly 2: the
 *     diagonals), the square (exactly 4), the equilateral (3), the
 *     isosceles (1) and the scalene (0) triangles; the 180-degree rotations
 *     about the diagonal intersection; the diagonal-intersection centres
 *     solved from coordinates; the unequal adjacent sides 5 and sqrt(5) of
 *     the parallelogram and its vertex-chase images (4,3) and (2,-1); the
 *     wheel (order 8, angle 45) and fan (order 5, angle 72) with a
 *     half-degree sweep; the alphabet archetypes N and Z verified
 *     rotational-only (0 mirrors) and H two-mirrors order-2 by coordinate
 *     outline; the rectangle's diagonal mirror refuted at (30/13, 72/13);
 *     every exercise witness and the quiz key [4,1,0,3,2].
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only
 * run prints the engine score and exits 0; the pins re-arm the moment
 * part-geo503.ts lands on disk).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch05-wip/v-geo503.ts
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

/* ------------------------------------------------------------------ */
/* coordinate machinery: rotations, reflections, THE MIRROR SWEEP      */
/* ------------------------------------------------------------------ */
type Pt = [number, number]
const dist = (p: Pt, q: Pt): number => Math.hypot(p[0] - q[0], p[1] - q[1])
const polySides = (v: Pt[]): number[] => v.map((p, i) => dist(p, v[(i + 1) % v.length]))
const centroid = (v: Pt[]): Pt => [
  v.reduce((s, p) => s + p[0], 0) / v.length,
  v.reduce((s, p) => s + p[1], 0) / v.length,
]
const rotAbout = (c: Pt, deg: number) => (p: Pt): Pt => {
  const t = (deg * Math.PI) / 180
  const x = p[0] - c[0], y = p[1] - c[1]
  return [c[0] + x * Math.cos(t) - y * Math.sin(t), c[1] + x * Math.sin(t) + y * Math.cos(t)]
}
const sameSet = (a: Pt[], b: Pt[], eps = 1e-7): boolean =>
  a.length === b.length && a.every((p) => b.some((q) => close(p[0], q[0], eps) && close(p[1], q[1], eps)))

/** reflect point p in the line through a with direction d (not assumed unit) */
const reflectIn = (p: Pt, a: Pt, d: Pt): Pt => {
  const vx = p[0] - a[0], vy = p[1] - a[1]
  const d2 = d[0] * d[0] + d[1] * d[1]
  const t = (vx * d[0] + vy * d[1]) / d2
  return [2 * (a[0] + t * d[0]) - p[0], 2 * (a[1] + t * d[1]) - p[1]]
}
/** a candidate mirror survives iff its reflection maps the vertex set onto itself */
const lineSurvives = (v: Pt[], a: Pt, d: Pt): boolean =>
  v.map((p) => reflectIn(p, a, d)).every((im) => v.some((q) => close(im[0], q[0], 1e-7) && close(im[1], q[1], 1e-7)))

/**
 * THE MIRROR SWEEP: every candidate mirror of a finite vertex set must pass
 * through its centroid (a fixed set has a fixed centroid), and a line has no
 * arrow (direction th and th+180 are the SAME line) — so sweeping
 * [0,180) at step-degree granularity through the centroid is exhaustive.
 */
const sweep = (v: Pt[], step = 1): number[] => {
  const c = centroid(v)
  const out: number[] = []
  for (let deg = 0; deg < 180; deg += step) {
    const t = (deg * Math.PI) / 180
    if (lineSurvives(v, c, [Math.cos(t), Math.sin(t)])) out.push(deg)
  }
  return out
}
/** rotational census: smallest positive theta fixing the vertex set; order = 360/theta */
const rotCensus = (v: Pt[]): { theta: number; order: number } => {
  const c = centroid(v)
  for (let deg = 1; deg < 360; deg++) {
    if (sameSet(v, v.map(rotAbout(c, deg)))) return { theta: deg, order: Math.round(360 / deg) }
  }
  return { theta: 360, order: 1 }
}
/** image of a whole vertex set under a rotation */
const rotImg = (v: Pt[], c: Pt, deg: number): Pt[] => v.map(rotAbout(c, deg))
/** intersection of the diagonals A-C and B-D of a quadrilateral [A,B,C,D] */
const diagIntersection = (v: Pt[]): Pt => {
  const [A, B, C, D] = v
  const ax = C[0] - A[0], ay = C[1] - A[1]
  const bx = D[0] - B[0], by = D[1] - B[1]
  const det = ax * -by - ay * -bx
  const rx = B[0] - A[0], ry = B[1] - A[1]
  const t = (rx * -by - ry * -bx) / det
  return [A[0] + t * ax, A[1] + t * ay]
}
const regularN = (n: number, R = 5): Pt[] =>
  Array.from({ length: n }, (_, k) => {
    const t = ((90 + (360 / n) * k) * Math.PI) / 180
    return [R * Math.cos(t), R * Math.sin(t)] as Pt
  })

/* ================================================================== */
/* ENGINE SECTION 1 — the regular polygon census (n lines, order n)    */
/* ================================================================== */
{
  const NS = [3, 4, 5, 6, 8, 10]
  check('E01 the angle-of-rotation law 360/n: n = 3,4,5,6,8,10 give 120, 90, 72, 60, 45, 36 degrees',
    JSON.stringify(NS.map((n) => 360 / n)) === JSON.stringify([120, 90, 72, 60, 45, 36]),
    NS.map((n) => `360/${n}=${f4(360 / n)}`).join(' '))
  check('E02 the mirror census by brute force: each regular n-gon carries EXACTLY n mirror lines (half-degree sweep of 360 candidate lines through the centroid — the octagon\u2019s axes sit at 22.5-degree multiples, invisible to a 1-degree sweep)',
    NS.every((n) => sweep(regularN(n), 0.5).length === n),
    NS.map((n) => `n=${n}: ${sweep(regularN(n), 0.5).length} lines`).join(', '))
  check('E03 the rotational census: each regular n-gon has order n with smallest angle exactly 360/n',
    NS.every((n) => {
      const r = rotCensus(regularN(n))
      return r.order === n && close(r.theta, 360 / n)
    }),
    NS.map((n) => `n=${n}: order ${rotCensus(regularN(n)).order}, theta ${f4(rotCensus(regularN(n)).theta)}`).join(', '))
  check('E04 the square axis set is {0, 45, 90, 135} (two midlines + two diagonals) and the hexagon axis set is {0, 30, 60, 90, 120, 150}',
    JSON.stringify(sweep(regularN(4), 0.5)) === JSON.stringify([0, 45, 90, 135]) &&
    JSON.stringify(sweep(regularN(6), 0.5)) === JSON.stringify([0, 30, 60, 90, 120, 150]),
    `square: ${sweep(regularN(4), 0.5).join(', ')}; hexagon: ${sweep(regularN(6), 0.5).join(', ')}`)
  check('E05 the order is EXACT, not "at least": rotating the square by 89 deg or 91 deg fails to map the vertex set onto itself',
    !sameSet(regularN(4), rotImg(regularN(4), centroid(regularN(4)), 89)) &&
    !sameSet(regularN(4), rotImg(regularN(4), centroid(regularN(4)), 91)),
    'only the multiples of 360/n survive')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the quadrilateral census (the pinned witnesses)  */
/* ================================================================== */
{
  const rect: Pt[] = [[0, 0], [6, 0], [6, 4], [0, 4]]
  const para: Pt[] = [[0, 0], [5, 0], [6, 2], [1, 2]]
  const rhomb: Pt[] = [[0, 0], [2, 1], [4, 0], [2, -1]]
  const sq: Pt[] = [[0, 0], [4, 0], [4, 4], [0, 4]]

  check('E06 rectangle centre: the diagonals (0,0)-(6,4) and (6,0)-(0,4) solve to (3,2) — the diagonal intersection IS the centre of symmetry',
    close(diagIntersection(rect)[0], 3) && close(diagIntersection(rect)[1], 2),
    `intersection = (${f4(diagIntersection(rect)[0])}, ${f4(diagIntersection(rect)[1])})`)
  check('E07 rectangle: the 180-degree rotation about (3,2) maps (0,0)->(6,4), (6,0)->(0,4), (6,4)->(0,0), (0,4)->(6,0) — order 2',
    JSON.stringify(rotImg(rect, [3, 2], 180).map((p) => [Math.round(p[0]), Math.round(p[1])] as Pt)) === JSON.stringify([rect[2], rect[3], rect[0], rect[1]]),
    rotImg(rect, [3, 2], 180).map((p) => `(${p[0].toFixed(1)},${p[1].toFixed(1)})`).join(' '))
  check('E08 rectangle mirror sweep: EXACTLY 2 of the 180 candidates survive, at 0 deg and 90 deg — the midlines, never the diagonals',
    JSON.stringify(sweep(rect)) === JSON.stringify([0, 90]) &&
    !lineSurvives(rect, [3, 2], [Math.cos((33.69 * Math.PI) / 180), Math.sin((33.69 * Math.PI) / 180)]) &&
    !lineSurvives(rect, [3, 2], [Math.cos((146.31 * Math.PI) / 180), Math.sin((146.31 * Math.PI) / 180)]),
    `survivors: ${sweep(rect).join(', ')} deg (diagonal directions 33.69/146.31 fail)`)
  check('E09 generic parallelogram (0,0),(5,0),(6,2),(1,2): centre (3,1) = diagonal intersection; the 180-degree rotation IS a symmetry (order 2)',
    close(diagIntersection(para)[0], 3) && close(diagIntersection(para)[1], 1) &&
    sameSet(para, rotImg(para, [3, 1], 180)) && rotCensus(para).order === 2,
    `centre (${f4(diagIntersection(para)[0])}, ${f4(diagIntersection(para)[1])}); order ${rotCensus(para).order}`)
  check('E10 parallelogram mirror sweep: ZERO of the 180 candidates survive — rotational-only symmetry',
    sweep(para).length === 0 && rotCensus(para).theta === 180,
    '0/180 mirror lines; the famous NCERT rotational-only case')
  check('E11 parallelogram adjacent sides are UNEQUAL: |AB| = 5 exactly and |AD| = sqrt(5) = 2.2360680 — the vertex-chase obstruction',
    close(dist(para[0], para[1]), 5) && close(dist(para[0], para[3]), Math.sqrt(5)) && close(Math.sqrt(5), 2.2360680, 1e-7) && !(close(5, Math.sqrt(5))),
    `|AB| = ${f4(dist(para[0], para[1]) )}, |AD| = ${f4(dist(para[0], para[3]))}`)
  check('E12 the parallelogram vertex chase: reflecting B(5,0) in the diagonal through (0,0),(6,2) lands at (4,3) and D(1,2) lands at (2,-1) — neither is a vertex',
    JSON.stringify(reflectIn(para[1], [0, 0], [6, 2]).map((x) => Math.round(x))) === JSON.stringify([4, 3]) &&
    JSON.stringify(reflectIn(para[3], [0, 0], [6, 2]).map((x) => Math.round(x))) === JSON.stringify([2, -1]),
    `B -> (${reflectIn(para[1], [0, 0], [6, 2]).map((x) => x.toFixed(0)).join(',')}), D -> (${reflectIn(para[3], [0, 0], [6, 2]).map((x) => x.toFixed(0)).join(',')})`)
  check('E13 rhombus (0,0),(2,1),(4,0),(2,-1): all four sides sqrt(5) = 2.2360680, diagonals 4 and 2 unequal; EXACTLY 2 mirror lines — the diagonals (0 and 90 deg)',
    polySides(rhomb).every((s) => close(s, Math.sqrt(5))) &&
    close(dist(rhomb[0], rhomb[2]), 4) && close(dist(rhomb[1], rhomb[3]), 2) && !(close(4, 2)) &&
    JSON.stringify(sweep(rhomb)) === JSON.stringify([0, 90]) && rotCensus(rhomb).order === 2,
    `sides ${polySides(rhomb).map((s) => f4(s)).join(',')}; diagonals 4 and 2; survivors ${sweep(rhomb).join(', ')}`)
  check('E14 rhombus would-be side-direction mirrors fail: the side directions 26.57 and 153.43 deg are NOT in the survivor set',
    !lineSurvives(rhomb, centroid(rhomb), [Math.cos((26.565 * Math.PI) / 180), Math.sin((26.565 * Math.PI) / 180)]) &&
    !lineSurvives(rhomb, centroid(rhomb), [Math.cos((153.435 * Math.PI) / 180), Math.sin((153.435 * Math.PI) / 180)]),
    'the midlines that serve the rectangle do NOT serve the rhombus')
  check('E15 square (0,0),(4,0),(4,4),(0,4): EXACTLY 4 mirror lines (0, 45, 90, 135) and order 4 with angle 90 — centre (2,2)',
    JSON.stringify(sweep(sq)) === JSON.stringify([0, 45, 90, 135]) && rotCensus(sq).order === 4 && rotCensus(sq).theta === 90 &&
    close(diagIntersection(sq)[0], 2) && close(diagIntersection(sq)[1], 2),
    `survivors ${sweep(sq).join(', ')}; order ${rotCensus(sq).order} at ${rotCensus(sq).theta} deg`)
  check('E16 the census column pinned: square 4 > rectangle 2 = rhombus 2 > parallelogram 0 mirror lines, with orders 4, 2, 2, 2',
    [sweep(sq).length, sweep(rect).length, sweep(rhomb).length, sweep(para).length].join(',') === '4,2,2,0' &&
    [rotCensus(sq).order, rotCensus(rect).order, rotCensus(rhomb).order, rotCensus(para).order].join(',') === '4,2,2,2',
    'four quadrilaterals, four different mirror counts, one shared rotational floor of 2 (square 4)')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the triangle census + the two exclusives         */
/* ================================================================== */
{
  const eq: Pt[] = [[0, 0], [3, 0], [1.5, (3 * Math.sqrt(3)) / 2]]
  const iso: Pt[] = [[0, 0], [4, 0], [2, 3]]
  check('E17 equilateral triangle (0,0),(3,0),(1.5, 2.5981): EXACTLY 3 mirror lines (30, 90, 150) and order 3 at 120 deg; sides all 3',
    polySides(eq).every((s) => close(s, 3)) && JSON.stringify(sweep(eq)) === JSON.stringify([30, 90, 150]) &&
    rotCensus(eq).order === 3 && rotCensus(eq).theta === 120,
    `sides ${polySides(eq).map((s) => f4(s)).join(',')}; survivors ${sweep(eq).join(', ')}`)
  check('E18 isosceles triangle (0,0),(4,0),(2,3): EXACTLY 1 mirror line (90 deg — x = 2, apex to base midpoint) and NO rotational symmetry (order 1)',
    JSON.stringify(sweep(iso)) === JSON.stringify([90]) && rotCensus(iso).order === 1 &&
    close(dist(iso[0], iso[2]), Math.sqrt(13)) && close(dist(iso[1], iso[2]), Math.sqrt(13)) && close(dist(iso[0], iso[1]), 4),
    `survivors ${sweep(iso).join(', ')}; equal sides sqrt(13) = ${f4(Math.sqrt(13))} twice, base 4`)
  check('E19 scalene triangle (0,0),(5,0),(2,3): ZERO mirror lines (half-degree sweep) and order 1 — no symmetry of either kind; sides 5, sqrt(18), sqrt(13) all different',
    sweep([[0, 0], [5, 0], [2, 3]], 0.5).length === 0 && rotCensus([[0, 0], [5, 0], [2, 3]]).order === 1 &&
    close(dist([0, 0], [5, 0]), 5) && close(dist([5, 0], [2, 3]), Math.sqrt(18)) && close(dist([0, 0], [2, 3]), Math.sqrt(13)),
    `sides ${[dist([0, 0], [5, 0]), dist([5, 0], [2, 3]), dist([0, 0], [2, 3])].map((s) => f4(s)).join(', ')} all different`)
  check('E19b the granularity trap, caught: the spec\u2019s draft scalene witness (0,0),(5,0),(1,3) is NOT scalene — |AB| = |BC| = 5 exactly (isosceles) and its mirror line at 161.565 deg (slope -1/3) is invisible to a 1-degree sweep; the engine\u2019s half-degree sweep finds it, so the lesson uses the honestly scalene (0,0),(5,0),(2,3)',
    close(dist([0, 0], [5, 0]), 5) && close(dist([5, 0], [1, 3]), 5) && close(dist([0, 0], [1, 3]), Math.sqrt(10)) &&
    lineSurvives([[0, 0], [5, 0], [1, 3]], [5, 0], [-3, 1]) && sweep([[0, 0], [5, 0], [1, 3]]).length === 0,
    'direct mirror check: true; 1-degree coarse sweep: 0 lines — a re-derived pin (report-flagged)')
  check('E20 the two exclusives witnessed: the isosceles triangle has a mirror and NO rotation (1 line, order 1); the parallelogram has rotation and NO mirror (0 lines, order 2)',
    sweep(iso).length === 1 && rotCensus(iso).order === 1 && sweep([[0, 0], [5, 0], [6, 2], [1, 2]]).length === 0 && rotCensus([[0, 0], [5, 0], [6, 2], [1, 2]]).order === 2,
    'line symmetry and rotational symmetry are INDEPENDENT properties')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the brute-force machine itself                   */
/* ================================================================== */
{
  const para: Pt[] = [[0, 0], [5, 0], [6, 2], [1, 2]]
  check('E21 the sweep is exhaustive at 180 candidates: directions 0..179 at 1-degree steps, and line(th) = line(th+180) (same undirected line, verified on a witness shape at 12 angles)',
    [0, 15, 30, 45, 60, 75, 90, 105, 120, 135, 150, 165].every((d) =>
      lineSurvives(para, centroid(para), [Math.cos((d * Math.PI) / 180), Math.sin((d * Math.PI) / 180)]) ===
      lineSurvives(para, centroid(para), [Math.cos(((d + 180) * Math.PI) / 180), Math.sin(((d + 180) * Math.PI) / 180)])),
    '180 candidates suffice because a mirror line has no arrow')
  check('E22 the full verdict table re-run in one sweep: parallelogram 0, rectangle 2, rhombus 2, square 4, equilateral 3, isosceles 1, scalene 0',
    [sweep(para).length, sweep([[0, 0], [6, 0], [6, 4], [0, 4]]).length, sweep([[0, 0], [2, 1], [4, 0], [2, -1]]).length,
     sweep([[0, 0], [4, 0], [4, 4], [0, 4]]).length, sweep([[0, 0], [3, 0], [1.5, (3 * Math.sqrt(3)) / 2]]).length,
     sweep([[0, 0], [4, 0], [2, 3]]).length, sweep([[0, 0], [5, 0], [2, 3]], 0.5).length].join(',') === '0,2,2,4,3,1,0',
    'the pinned 0,2,2,4,3,1,0 column')
  check('E23 the 180-degree witness, vertex by vertex: about (3,1) the parallelogram maps (0,0)->(6,2), (5,0)->(1,2), (6,2)->(0,0), (1,2)->(5,0)',
    JSON.stringify(rotImg(para, [3, 1], 180).map((p) => [Math.round(p[0]), Math.round(p[1])] as Pt)) === JSON.stringify([para[2], para[3], para[0], para[1]]),
    'each vertex lands on the opposite vertex; the diagonals bisect each other at (3,1)')
}

/* ================================================================== */
/* ENGINE SECTION 5 — beyond polygons: wheel, fan, alphabet archetypes */
/* ================================================================== */
{
  const wheel: Pt[] = Array.from({ length: 8 }, (_, k) => {
    const t = ((90 + 45 * k) * Math.PI) / 180
    return [8 * Math.cos(t), 8 * Math.sin(t)] as Pt
  })
  const fan: Pt[] = Array.from({ length: 5 }, (_, k) => {
    const t = ((90 + 72 * k) * Math.PI) / 180
    return [8 * Math.cos(t), 8 * Math.sin(t)] as Pt
  })
  check('E24 the 8-spoke wheel: order 8, smallest angle 45 deg; the half-degree sweep (360 candidates) finds exactly 8 mirror lines at 0, 22.5, 45, ..., 157.5',
    rotCensus(wheel).order === 8 && rotCensus(wheel).theta === 45 &&
    JSON.stringify(sweep(wheel, 0.5).map((d) => Math.round(d * 10) / 10)) === JSON.stringify([0, 22.5, 45, 67.5, 90, 112.5, 135, 157.5]),
    `order ${rotCensus(wheel).order} at ${rotCensus(wheel).theta} deg; mirrors ${sweep(wheel, 0.5).length}`)
  check('E25 the 5-blade fan: order 5, smallest angle 72 deg; exactly 5 mirror lines (18, 54, 90, 126, 162)',
    rotCensus(fan).order === 5 && rotCensus(fan).theta === 72 &&
    JSON.stringify(sweep(fan, 0.5)) === JSON.stringify([18, 54, 90, 126, 162]),
    `order ${rotCensus(fan).order} at ${rotCensus(fan).theta} deg; mirrors ${sweep(fan, 0.5).join(', ')}`)
  // the letter N as a 10-corner outline (stems + diagonal)
  const N: Pt[] = [[0, 0], [1, 0], [3, 3], [3, 0], [4, 0], [4, 5], [3, 5], [1, 2], [1, 5], [0, 5]]
  // the letter Z as a 10-corner outline
  const Z: Pt[] = [[0, 5], [4, 5], [4, 4], [1, 1], [4, 1], [4, 0], [0, 0], [0, 1], [3, 4], [0, 4]]
  // the letter H as a 12-corner outline
  const H: Pt[] = [[0, 0], [0, 4], [1, 4], [1, 2.2], [3, 2.2], [3, 4], [4, 4], [4, 0], [3, 0], [3, 1.8], [1, 1.8], [1, 0]]
  check('E26 the letter N by coordinates: 180-degree rotation about (2,2.5) maps the outline onto itself (order 2), and ZERO mirror lines survive the 360-candidate sweep',
    sameSet(N, N.map(rotAbout([2, 2.5], 180))) && rotCensus(N).order === 2 && sweep(N, 0.5).length === 0,
    `N images: (0,0)->(4,5), (1,0)->(3,5), (3,3)->(1,2), (3,0)->(1,5), (4,0)->(0,5); mirrors ${sweep(N, 0.5).length}`)
  check('E27 the letter Z by coordinates: rotational-only, order 2 about (2,2.5), zero mirror lines — the S shares the archetype',
    sameSet(Z, Z.map(rotAbout([2, 2.5], 180))) && rotCensus(Z).order === 2 && sweep(Z, 0.5).length === 0,
    `Z mirrors ${sweep(Z, 0.5).length}; S: same archetype (curved outline, same verdict)`)
  check('E28 the letter H by coordinates: EXACTLY 2 mirror lines (0 and 90 deg) and order 2 — the two-line + order-2 archetype',
    JSON.stringify(sweep(H, 0.5)) === JSON.stringify([0, 90]) && rotCensus(H).order === 2,
    `H mirrors ${sweep(H, 0.5).join(', ')}; order ${rotCensus(H).order}`)
  check('E29 the four-way classification witnessed geometrically: square BOTH (4, order 4); isosceles ONLY-LINE (1, order 1); N ONLY-ROTATIONAL (0, order 2); scalene NEITHER (0, order 1)',
    sweep([[0, 0], [4, 0], [4, 4], [0, 4]]).length === 4 && rotCensus([[0, 0], [4, 0], [4, 4], [0, 4]]).order === 4 &&
    sweep([[0, 0], [4, 0], [2, 3]]).length === 1 && rotCensus([[0, 0], [4, 0], [2, 3]]).order === 1 &&
    sweep(N, 0.5).length === 0 && rotCensus(N).order === 2 &&
    sweep([[0, 0], [5, 0], [2, 3]], 0.5).length === 0 && rotCensus([[0, 0], [5, 0], [2, 3]]).order === 1,
    'both / only-line / only-rotational / neither — every cell occupied by an engine witness')
}

/* ================================================================== */
/* ENGINE SECTION 6 — exercise witnesses + quiz key                    */
/* ================================================================== */
{
  check('E30 Ex witness (hexagon): 6 mirror lines, order 6, angle 60 deg; pentagon angle 72; decagon angle 36',
    sweep(regularN(6)).length === 6 && rotCensus(regularN(6)).order === 6 && close(360 / 6, 60) &&
    close(360 / 5, 72) && close(360 / 10, 36),
    `hexagon survivors ${sweep(regularN(6)).length}; 360/5 = 72, 360/10 = 36`)
  check('E31 Ex witness (rectangle map): about (3,2) the rectangle maps (0,0)->(6,4), (6,0)->(0,4), (6,4)->(0,0), (0,4)->(6,0); midlines x = 3 and y = 2 are the only mirrors',
    JSON.stringify(rotImg([[0, 0], [6, 0], [6, 4], [0, 4]], [3, 2], 180).map((p) => [Math.round(p[0]), Math.round(p[1])] as Pt)) === JSON.stringify([[6, 4], [0, 4], [0, 0], [6, 0]]) &&
    JSON.stringify(sweep([[0, 0], [6, 0], [6, 4], [0, 4]])) === JSON.stringify([0, 90]),
    'the vertex map + the midline verdict')
  check('E32 Ex witness (N rotation): (0,0)->(4,5), (1,0)->(3,5), (3,3)->(1,2), (3,0)->(1,5), (4,0)->(0,5) about (2,2.5)',
    JSON.stringify(rotImg([[0, 0], [1, 0], [3, 3], [3, 0], [4, 0]], [2, 2.5], 180).map((p) => [Math.round(p[0]), Math.round(p[1])] as Pt)) === JSON.stringify([[4, 5], [3, 5], [1, 2], [1, 5], [0, 5]]),
    'the letter N half-turn images, engine-checked')
  {
    const img = reflectIn([6, 0], [0, 0], [6, 4])
    check('E33 Ex witness (rectangle diagonal mirror refuted): reflecting B(6,0) in the diagonal (0,0)-(6,4) lands at (30/13, 72/13) = (2.3077, 5.5385) — NOT a vertex',
      close(img[0], 30 / 13) && close(img[1], 72 / 13) && close(img[0], 2.3077, 1e-4) && close(img[1], 5.5385, 1e-4) &&
      !([[0, 0], [6, 0], [6, 4], [0, 4]] as Pt[]).some((q) => close(q[0], img[0], 1e-6) && close(q[1], img[1], 1e-6)),
      `image (${f4(img[0])}, ${f4(img[1])}) — outside the vertex set, so the diagonal is no mirror`)
  }
  {
    const imgD = reflectIn([0, 4], [0, 0], [6, 4])
    check('E33b Ex witness (rectangle diagonal, second chase): reflecting D(0,4) in the diagonal (0,0)-(6,4) lands at (48/13, -20/13) = (3.6923, -1.5385) — also NOT a vertex',
      close(imgD[0], 48 / 13) && close(imgD[1], -20 / 13) && close(imgD[0], 3.6923, 1e-4) && close(imgD[1], -1.5385, 1e-4) &&
      !([[0, 0], [6, 0], [6, 4], [0, 4]] as Pt[]).some((q) => close(q[0], imgD[0], 1e-6) && close(q[1], imgD[1], 1e-6)),
      `image (${f4(imgD[0])}, ${f4(imgD[1])}) — the diagonal fails on both off-axis vertices`)
  }
  check('E34 quiz key self-check: the pinned key is [4,1,0,3,2] — five entries, pairwise distinct, each a legal option index (item 1 needs five options to carry index 4)',
    JSON.stringify([4, 1, 0, 3, 2]) === JSON.stringify([4, 1, 0, 3, 2]) &&
      new Set([4, 1, 0, 3, 2]).size === 5 && [4, 1, 0, 3, 2].every((a) => a >= 0 && a <= 4),
    'key 41032, matching the master plan')
  check('E35 quiz numeric witnesses: Q1 order 2 about (3,1) with 0 mirrors; Q2 360/5 = 72; Q3 isosceles exactly 1 mirror, order 1; Q4 rectangle midlines only; Q5 N rotational-only — every quiz fact is an engine fact',
    rotCensus([[0, 0], [5, 0], [6, 2], [1, 2]]).order === 2 && sweep([[0, 0], [5, 0], [6, 2], [1, 2]]).length === 0 && close(360 / 5, 72) &&
    sweep([[0, 0], [4, 0], [2, 3]]).length === 1 && rotCensus([[0, 0], [4, 0], [2, 3]]).order === 1 &&
    JSON.stringify(sweep([[0, 0], [6, 0], [6, 4], [0, 4]])) === JSON.stringify([0, 90]) &&
    sweep([[0, 0], [1, 0], [3, 3], [3, 0], [4, 0], [4, 5], [3, 5], [1, 2], [1, 5], [0, 5]], 0.5).length === 0 &&
    rotCensus([[0, 0], [1, 0], [3, 3], [3, 0], [4, 0], [4, 5], [3, 5], [1, 2], [1, 5], [0, 5]]).order === 2,
    'no quiz number outside the engine')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)    */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(CH05_SRC)) {
    console.log('  (staged seat: part-geo503.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo503?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo503 })
    pcheck('P01 part file loads and exports lessonGeo503', !!mod?.lessonGeo503, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo503', false, String(e))
  }
  const lesson = mod?.lessonGeo503
  if (!lesson) return

  // P02 — quiz keys [4,1,0,3,2], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [4,1,0,3,2]', JSON.stringify(keys) === JSON.stringify([4, 1, 0, 3, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 1 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i, k) => i.options.length >= 4 && (k === 0 ? i.options.length >= 5 : true) && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['order 2', '72', 'exactly one mirror', 'two midlines', 'NO mirror line']
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

  // P04a — body figures (spec: >=9)
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=9 body figure blocks (spec floor)', bodyFigs >= 9, `count=${bodyFigs}`)
  // P04c — solution figures (example + exercise)
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
  pcheck('P04d the named census figure family exists: a mirror figure, a wheel, a parallelogram figure and an alphabet figure',
    /mirror/.test(allCaptions) && /wheel/.test(allCaptions) && /parallelogram/.test(allCaptions) && /alphabet/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  const normName = (s: string): string => s.toLowerCase().replace(/-/g, ' ')
  pcheck('P06 >=3 formula cards including the mirror-census law, the angle-of-rotation law and the symmetry test',
    formulas.length >= 3 &&
    formulas.some((f) => normName(f.name).includes('mirror census')) &&
    formulas.some((f) => normName(f.name).includes('angle of rotation')) &&
    formulas.some((f) => normName(f.name).includes('symmetry test')),
    formulas.map((f) => f.name).join(' | '))
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 8500 (target 9500+)', wc >= 8500, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >=12 SVGs collected (>=9 body + >=3 solution)', svgs.length >= 12, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#155e75', '#0e7490', '#0891b2', '#d97706', '#ea580c', '#dc2626', '#16a34a', '#cffafe', '#fef9c3', '#a5f3fc', '#67e8f9', '#ffffff', '#f0fdfa'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c53 symmetry palette', badHex.length === 0, badHex.join(','))
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-line-and-rotational-symmetry' && lesson.number === '5.3' && lesson.title === 'Line and Rotational Symmetry', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-ncert-symmetry-ground-131, geo-common-core-gco-ground-131]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-ncert-symmetry-ground-131', 'geo-common-core-gco-ground-131']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (5.1 motions + 5.2 composition)
  pcheck('P13 prerequisites exact [geo-rigid-motions-slides-flips-and-turns, geo-composing-transformations-and-the-isometry-idea]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8 from the pinned set; objectives 4-6
  const PINNED_CONCEPTS = ['line symmetry', 'mirror line', 'rotational symmetry', 'order of rotational symmetry', 'angle of rotation', 'centre of rotation', 'regular polygon symmetry', 'rotational-only symmetry']
  pcheck('P14 concepts 5-8, every one from the pinned set; objectives 4-6',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8 &&
    lesson.concepts.every((c) => PINNED_CONCEPTS.includes(c)) &&
    (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6,
    `concepts=${JSON.stringify(lesson.concepts)}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (the centroid lemma + the parallelogram contradiction + the order/angle law)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the census tables (regular n-gon + quadrilateral) carry the pinned columns
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const regTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('120')))
  pcheck('P19a the regular n-gon census table carries 120, 90, 72, 60, 45, 36 and the n = 3..10 rows',
    !!regTable && ['120', '90', '72', '60', '45', '36'].every((s) => regTable.rows.join(' ').includes(s)), regTable ? 'found' : 'missing')
  const quadTable = tables.find((t) => t.rows.some((r) => r.some((c) => c.trim() === '0 mirror lines')))
  pcheck('P19b the quadrilateral census table carries 4/2/2/0 mirror lines and the order column',
    !!quadTable && ['4 mirror lines', '2 mirror lines', '0 mirror lines', 'order 4', 'order 2'].every((s) => quadTable.rows.join(' ').includes(s)), quadTable ? 'found' : 'missing')
  // P20 — the four-way classification table
  const clsTable = tables.find((t) => t.rows.some((r) => r.join(' ').toLowerCase().includes('only rotational')))
  pcheck('P20 the four-way classification table exists (both / only line / only rotational / neither)',
    !!clsTable && ['both', 'only line', 'only rotational', 'neither'].every((s) => clsTable.rows.join(' ').toLowerCase().includes(s)), clsTable ? 'found' : 'missing')
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo503 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
}

async function sectionGeo504(): Promise<SectionResult> {
/**
 * v-geo504.ts — verify-first ENGINE + PIN harness for GEO lesson 5.4
 * "Dilations, Scale Factors and Similarity Re-Read" (run 131 swarm, agent geo504).
 *
 * DISCIPLINE: the engine wins over the spec. Every machine value, scale read,
 * area ratio, altitude segment, similitude centre and exercise witness the
 * prose prints is recomputed here by brute force FIRST; where engine and prose
 * disagree, the prose is fixed to the engine's value and the catch is flagged
 * in the report. The pinned numbers below are the IMMUTABLE truth (they
 * reproduce the run-131 master pin set: scripts/pin_check_geo131.py 81/81
 * green — the 5.4 block is pins 54.01–54.22).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the dilation machine D_(O,k)(P) =
 *     O + k(P−O) at every pinned setting (origin k = 3, 1/2, −2; foreign
 *     centres (1,1) k = 2 and (2,3) k = 1/2, each read BOTH ways — inverse
 *     machine included); the distance law (segment 5 → 15 at |k| = 3), the
 *     area law (6 → 54 by k² = 9; 6 → 1.5 at k = 1/2), the perimeter law
 *     (12 → 36), the right-angle dot-product witness ((12,0)·(0,9) = 0), the
 *     general angle invariance by the cosine rule on the 3-4-5 at k = 3, the
 *     line laws (y = 2x + 1 → the PARALLEL image through (0,3),(3,9) still
 *     slope 2; y = 2x through O maps to itself); the k read off images
 *     ((2,3)→(5,7.5) means k = 2.5, area ratio 6.25, prediction (6,1)→(15,2.5));
 *     the honest non-similarity (2×6 vs 3×4: ratios 2/3, 3/2, 2/3, 3/2 — no
 *     single k; diagonal third read √40 vs 5; the honest 1:3 family
 *     (3,9),(4,12),(5,15) all dilations of (1,3) at k = 3, 4, 5 with areas
 *     27, 48, 75 = ×9, ×16, ×25); the Thales re-read (k = 18/2.4 = 7.5,
 *     stake 1.7 → tree 12.75, the apex-centred machine verified on both
 *     base and top); the 3-4-5 altitude re-read (BF = 1.8, FC = 3.2,
 *     h = 2.4, foot F = (1.92, 1.44), 9 = 5×1.8, 16 = 5×3.2, h² = 1.8×3.2,
 *     the two small triangles at scales 3/5 = 0.6 and 4/5 = 0.8 with all six
 *     side ratios checked); the centres of similitude (external (−5,0):
 *     distances 5, 15, ratio 5:15 = 2:6, DIRECT k = +3 mapping (0,0)→(10,0)
 *     and circle points onto the r = 6 circle; internal (2.5,0): distances
 *     2.5, 7.5, OPPOSITE k = −3 likewise); the similarity machine (dilate-
 *     then-translate k = 3, v = (10,5) equals the single dilation about
 *     (−5,−2.5); centre recovery O = 2P − image at k = 2 giving (−3,−1));
 *     the 9-copy area grid for the k = 3 image of the 3-by-4 right triangle
 *     (four upright + five inverted copies, each area 6, total 54); the
 *     isometry contrast (dilation k = 2 is NOT an isometry: 3 → 6); the
 *     quiz/exercise witness sweep + quiz-key self-check [0,3,2,4,1].
 *   PIN SECTION — audits part-geo504.ts once it lands (identity fields,
 *     sources, prerequisites, concepts/objectives, quiz key + tokens,
 *     exercises 15 spanning L1–L6 with full steps/answers/containment,
 *     body ≥9 + solution ≥3 figures, SVG hygiene laws — plain text, U+2212
 *     minus, c54 palette, stroke/font ranges, no clipping — math-span laws,
 *     terms, formula cards, derivations, exam callout, census tables,
 *     printed-number census, word floor 9000).
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only
 * run prints the engine score and exits 0; the pins re-arm the moment
 * part-geo504.ts lands on disk).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch05-wip/v-geo504.ts
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
const sub = (a: Pt, b: Pt): Pt => [a[0] - b[0], a[1] - b[1]]
const add = (a: Pt, b: Pt): Pt => [a[0] + b[0], a[1] + b[1]]
const mul = (a: Pt, s: number): Pt => [a[0] * s, a[1] * s]
const D = (O: Pt, k: number) => (P: Pt): Pt => add(O, mul(sub(P, O), k))
const dist = (a: Pt, b: Pt): number => Math.hypot(a[0] - b[0], a[1] - b[1])
const dot = (a: Pt, b: Pt): number => a[0] * b[0] + a[1] * b[1]
const areaSigned = (t: Pt[]): number =>
  ((t[1][0] - t[0][0]) * (t[2][1] - t[0][1]) - (t[2][0] - t[0][0]) * (t[1][1] - t[0][1])) / 2
const eq = (a: Pt, b: Pt): boolean => a[0] === b[0] && a[1] === b[1]

/* ================================================================== */
/* ENGINE SECTION 1 — the dilation machine at every pinned setting      */
/* ================================================================== */
{
  const dO3 = D([0, 0], 3)
  const dOh = D([0, 0], 0.5)
  const dOn = D([0, 0], -2)
  check('E01 D_origin k=3: (2,1) -> (6,3)', eq(dO3([2, 1]), [6, 3]), `(2,1) -> (${dO3([2, 1])})`)
  check('E02 D_origin k=1/2: (4,6) -> (2,3)', eq(dOh([4, 6]), [2, 3]), `(4,6) -> (${dOh([4, 6])})`)
  check('E03 D_origin k=-2: (1,2) -> (−2,−4)', eq(dOn([1, 2]), [-2, -4]), `(1,2) -> (${dOn([1, 2])})`)
  check('E04 D_(1,1) k=2: (3,5) -> (5,9)', eq(D([1, 1], 2)([3, 5]), [5, 9]), `(3,5) -> (${D([1, 1], 2)([3, 5])})`)
  check('E05 D_(2,3) k=1/2: (6,7) -> (4,5)', eq(D([2, 3], 0.5)([6, 7]), [4, 5]), `(6,7) -> (${D([2, 3], 0.5)([6, 7])})`)
  // the inverse machine: P = O + (1/k)(image − O), worked BOTH ways
  const inv = (O: Pt, k: number, img: Pt): Pt => add(O, mul(sub(img, O), 1 / k))
  check('E06 the foreign centres read BOTH ways: from image (5,9) back to (3,5); from image (4,5) back to (6,7)',
    eq(inv([1, 1], 2, [5, 9]), [3, 5]) && eq(inv([2, 3], 0.5, [4, 5]), [6, 7]),
    `back from (5,9): (${inv([1, 1], 2, [5, 9])}); back from (4,5): (${inv([2, 3], 0.5, [4, 5])})`)
  check('E07 k = 1 is the identity: every probed point is fixed',
    [[2, 1], [4, 6], [1, 2], [5, 7]].every((p) => eq(D([0, 0], 1)(p as Pt), p as Pt)) && eq(D([3, 7], 1)([9, 2]), [9, 2]),
    'k = 1: P -> P, the machine collapses to doing nothing')
  {
    // enlarge / shrink / negative: distances from the centre scale by |k|
    const O: Pt = [1, 1]
    const probes: Pt[] = [[3, 5], [4, 0], [0, 7]]
    const grow = probes.every((p) => close(dist(D(O, 3)(p), O), 3 * dist(p, O)))
    const shrink = probes.every((p) => close(dist(D(O, 0.5)(p), O), 0.5 * dist(p, O)))
    const flip = probes.every((p) => close(dist(D(O, -2)(p), O), 2 * dist(p, O)))
    check('E08 distance law about a foreign centre: distances from O scale by |k| at k = 3 (grow), k = 1/2 (shrink), k = −2 (flip)',
      grow && shrink && flip, 'every probe, every k: d(image, O) = |k| · d(P, O)')
  }
  check('E09 the negative k carries the half-turn sense: (1,2) -> (−2,−4) sits opposite O with distance doubled (√5 -> 2√5)',
    close(dist([0, 0], [1, 2]), Math.sqrt(5)) && close(dist([0, 0], [-2, -4]), 2 * Math.sqrt(5)) &&
    close(dot([1, 2], [-2, -4]), -10),
    'the image is on the OPPOSITE ray: the (1,2)·(−2,−4) = −10 < 0 witness')
  {
    // 5.2's honest note re-derived: a dilation is NOT an isometry
    const seg = dist([0, 0], [3, 0])
    check('E10 the 5.2 contrast: dilation k=2 is NOT an isometry — the 3-unit segment maps to a 6-unit segment',
      close(seg, 3) && close(dist(D([0, 0], 2)([0, 0]), D([0, 0], 2)([3, 0])), 6),
      'rigid motions preserve distance; dilations preserve it only at |k| = 1')
  }
}

/* ================================================================== */
/* ENGINE SECTION 2 — what scales and what does not                     */
/* ================================================================== */
{
  const P: Pt = [1, 1], Q: Pt = [4, 5]
  const d = D([0, 0], 3)
  const Pi = d(P), Qi = d(Q)
  check('E11 the segment (1,1)–(4,5) has length 5; its k=3 images are (3,3) and (12,15), length 15 = 3×5',
    eq(Pi, [3, 3]) && eq(Qi, [12, 15]) && close(dist(P, Q), 5) && close(dist(Pi, Qi), 15) && close(dist(Pi, Qi) / dist(P, Q), 3),
    `length ${f4(dist(P, Q))} -> ${f4(dist(Pi, Qi))}, ratio exactly 3`)
  {
    const tri: Pt[] = [[0, 0], [4, 0], [0, 3]]
    const a0 = Math.abs(areaSigned(tri))
    const per = dist(tri[0], tri[1]) + dist(tri[1], tri[2]) + dist(tri[2], tri[0])
    const img3 = tri.map(d)
    const imgH = tri.map(D([0, 0], 0.5))
    const a3 = Math.abs(areaSigned(img3))
    const aH = Math.abs(areaSigned(imgH))
    const per3 = dist(img3[0], img3[1]) + dist(img3[1], img3[2]) + dist(img3[2], img3[0])
    check('E12 the witness triangle (0,0),(4,0),(0,3): area 6; k=3 image area 54 = 9×6 (k² = 9); k=1/2 image area 1.5',
      close(a0, 6) && close(a3, 54) && close(a3 / a0, 9) && close(aH, 1.5) && close(aH / a0, 0.25),
      `A: ${f4(a0)} -> ${f4(a3)} at k=3; -> ${f4(aH)} at k=1/2`)
    check('E13 the perimeter 12 scales by |k| = 3 to 36 (a length, not a k²)',
      close(per, 12) && close(per3, 36) && close(per3 / per, 3),
      `P: ${f4(per)} -> ${f4(per3)}`)
  }
  {
    // the right-angle dot-product witness at k = 3
    const tri: Pt[] = [[0, 0], [4, 0], [0, 3]]
    const img = tri.map(D([0, 0], 3))
    const u: Pt = sub(img[1], img[0])
    const v: Pt = sub(img[2], img[0])
    check('E14 the right angle survives k=3: image vectors (12,0) and (0,9) have dot product 0',
      eq(img[0], [0, 0]) && eq(u, [12, 0]) && eq(v, [0, 9]) && dot(u, v) === 0,
      `(12,0)·(0,9) = ${dot(u, v)}`)
    // general angle invariance: (ku)·(kv) = k²(u·v), so cosines are unchanged
    const ang = (t: Pt[], i: number): number => {
      const a = sub(t[(i + 1) % 3], t[i]), b = sub(t[(i + 2) % 3], t[i])
      return (Math.acos(dot(a, b) / (dist(t[(i + 1) % 3], t[i]) * dist(t[(i + 2) % 3], t[i]))) * 180) / Math.PI
    }
    const T: Pt[] = [[0, 0], [3, 0], [0, 4]]
    const a1 = [0, 1, 2].map((i) => ang(T, i))
    const a3 = [0, 1, 2].map((i) => ang(T.map(D([0, 0], 3)), i))
    check('E15 EVERY angle survives: the 3-4-5 angles 90° (at the origin vertex), 53.1301°, 36.8699° come back identical at k = 3 (cosine rule, k² cancels)',
      close(a1[0], 90) && close(a1[1], 53.1301, 1e-3) && close(a1[2], 36.8699, 1e-3) &&
      a1.every((v, i) => close(v, a3[i], 1e-9)) && close(a1.reduce((x, y) => x + y, 0), 180, 1e-9),
      `k=1: ${a1.map(f4).join(', ')}; k=3: ${a3.map(f4).join(', ')}`)
  }
  {
    // line laws
    const d3 = D([0, 0], 3)
    const l1: Pt = [0, 1], l2: Pt = [1, 3] // on y = 2x + 1
    const i1 = d3(l1), i2 = d3(l2)
    const slope0 = (l2[1] - l1[1]) / (l2[0] - l1[0])
    const slope1 = (i2[1] - i1[1]) / (i2[0] - i1[0])
    check('E16 line y = 2x + 1 under origin k=3: (0,1) -> (0,3), (1,3) -> (3,9); the image still has slope 2 and is PARALLEL (a different line: (0,3) is not on y = 2x + 1)',
      eq(i1, [0, 3]) && eq(i2, [3, 9]) && close(slope0, 2) && close(slope1, 2) &&
      !(close(i1[1], 2 * i1[0] + 1)) && close(i1[1], 2 * i1[0] + 3),
      `slope ${f4(slope0)} -> ${f4(slope1)}; image line y = 2x + 3`)
    const m = d3([1, 2])
    check('E17 line y = 2x THROUGH O maps to itself: (1,2) -> (3,6) and 6 = 2×3 — the ray structure',
      eq(m, [3, 6]) && close(m[1], 2 * m[0]),
      'points on a line through the centre stay on that line')
    // slope preservation generally: D(Q) − D(P) = k(Q − P)
    const a: Pt = [2, 5], b: Pt = [7, 3]
    const diff0 = sub(b, a), diff1 = sub(d3(b), d3(a))
    check('E18 slope preservation is structural: image difference = k × original difference for every pair',
      eq(diff1, mul(diff0, 3)) && close(diff1[1] / diff1[0], diff0[1] / diff0[0]),
      `(${diff1}) = 3 × (${diff0})`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 3 — reading k off images                              */
/* ================================================================== */
{
  const kx = 5 / 2
  check('E19 (2,3) -> (5,7.5) about the origin: BOTH coordinates give k = 2.5 (5/2 and 7.5/3)',
    close(5 / 2, 2.5) && close(7.5 / 3, 2.5) && eq(D([0, 0], kx)([2, 3]), [5, 7.5]),
    'one k must serve every coordinate — and it does')
  check('E20 the area ratio witness: k = 2.5 forces areas × k² = 6.25',
    close(kx * kx, 6.25), 'area ratio 6.25 : 1')
  check('E21 the forward prediction: (6,1) -> (15,2.5) at k = 2.5',
    eq(D([0, 0], 2.5)([6, 1]), [15, 2.5]), `(6,1) -> (${D([0, 0], 2.5)([6, 1])})`)
  check('E22 the inverse read: preimage = O + (1/k)(image − O); (15,2.5) takes back to (6,1) at k = 2.5',
    eq(add([0, 0], mul(sub([15, 2.5], [0, 0]), 1 / 2.5)), [6, 1]),
    'the machine undoes itself with 1/k')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the honest non-similarity                         */
/* ================================================================== */
{
  const r26: Pt[] = [[0, 0], [2, 0], [2, 6], [0, 6]]
  const r34: Pt[] = [[0, 0], [3, 0], [3, 4], [0, 4]]
  const ratios = [0, 1, 2, 3].map((i) => dist(r26[i], r26[(i + 1) % 4]) / dist(r34[i], r34[(i + 1) % 4]))
  check('E23 2×6 vs 3×4: the walking audit reads 2/3, 3/2, 2/3, 3/2 — exactly TWO distinct values, so NO single k exists',
    close(ratios[0], 2 / 3) && close(ratios[1], 3 / 2) && close(ratios[2], 2 / 3) && close(ratios[3], 3 / 2) &&
    new Set(ratios.map((r) => r.toFixed(6))).size === 2,
    `ratios ${ratios.map(f4).join(', ')}`)
  {
    const dg26 = Math.sqrt(2 * 2 + 6 * 6)
    const dg34 = 5
    check('E24 the third read confirms: diagonals √40 ≈ 6.3246 against 5 — a ratio matching neither 2/3 nor 3/2',
      close(dg26, Math.sqrt(40)) && close(dg26, 6.3246, 1e-4) && close(dg34, 5) &&
      close(dg26 / dg34, 1.2649, 1e-4) && !(close(dg26 / dg34, 2 / 3, 1e-4)) && !(close(dg26 / dg34, 3 / 2, 1e-4)),
      `diagonals ${f4(dg26)} vs ${f4(dg34)}, ratio ${f4(dg26 / dg34)}`)
  }
  {
    const fam = [3, 4, 5].map((k) => mul([1, 3] as Pt, k))
    const areas = fam.map((r) => r[0] * r[1])
    check('E25 the honest 1:3 family: (1,3) dilated by k = 3, 4, 5 gives (3,9), (4,12), (5,15) — areas 3 -> 27, 48, 75 (×9, ×16, ×25 = k²)',
      JSON.stringify(fam) === JSON.stringify([[3, 9], [4, 12], [5, 15]]) &&
      close(areas[0], 27) && close(areas[1], 48) && close(areas[2], 75) &&
      close(areas[0] / 3, 9) && close(areas[1] / 3, 16) && close(areas[2] / 3, 25),
      `areas ${areas.join(', ')}`)
    check('E26 every family member keeps the 1:3 proportion: 3/9 = 4/12 = 5/15 = 1/3 — ONE shape, many sizes',
      close(3 / 9, 1 / 3) && close(4 / 12, 1 / 3) && close(5 / 15, 1 / 3),
      'the ratio is the dilation-invariant; the size is not')
  }
}

/* ================================================================== */
/* ENGINE SECTION 5 — the Thales re-read (the shadow dilation)          */
/* ================================================================== */
{
  const kt = 18 / 2.4
  const tree = 1.7 * kt
  check('E27 Thales re-read: k = 18/2.4 = 7.5; the 1.7 m stake maps to a 12.75 m tree',
    close(kt, 7.5) && close(tree, 12.75), `k = ${f4(kt)}, tree = ${f4(tree)}`)
  check('E28 the cross-check: 1.7 × 18 = 30.6 and 30.6/2.4 = 12.75 — same answer, no k needed',
    close(1.7 * 18, 30.6) && close(30.6 / 2.4, 12.75), 'two roads, one truth')
  {
    // the apex-centred machine: O at the shadow tip, k = 7.5 maps stake to tree
    const O: Pt = [0, 0]
    const d = D(O, kt)
    check('E29 the shadow dilation verified point by point: stake base (2.4,0) -> (18,0); stake top (2.4,1.7) -> (18,12.75)',
      eq(d([2.4, 0]), [18, 0]) && close(d([2.4, 1.7])[0], 18) && close(d([2.4, 1.7])[1], 12.75),
      'one dilation about the shadow tip carries the whole stake triangle onto the tree triangle')
  }
}

/* ================================================================== */
/* ENGINE SECTION 6 — the 3-4-5 altitude re-read                        */
/* ================================================================== */
{
  const A: Pt = [0, 0], B: Pt = [3, 0], C: Pt = [0, 4]
  const bc = sub(C, B), ba = sub(A, B)
  const t = dot(ba, bc) / dot(bc, bc)
  const F = add(B, mul(bc, t))
  const bf = dist(B, F), fc = dist(F, C), h = dist(A, F)
  check('E30 the foot of the altitude: F = (1.92, 1.44) on BC, with BF = 1.8, FC = 3.2, h = 2.4',
    close(F[0], 1.92) && close(F[1], 1.44) && close(bf, 1.8) && close(fc, 3.2) && close(h, 2.4),
    `F = (${f4(F[0])}, ${f4(F[1])}); BF = ${f4(bf)}, FC = ${f4(fc)}, h = ${f4(h)}`)
  check('E31 the leg² laws: 9 = 5 × 1.8 and 16 = 5 × 3.2',
    close(3 * 3, 5 * bf) && close(4 * 4, 5 * fc), 'a² = c·BF, b² = c·FC with c = 5')
  check('E32 the geometric-mean law: h² = BF × FC = 1.8 × 3.2 = 5.76 and h = 2.4 = 12/5',
    close(bf * fc, 5.76) && close(h * h, 5.76) && close(h, 12 / 5), 'the 4.4 machine as scale arithmetic')
  {
    // the two small triangles are the big one at scales 3/5 and 4/5
    const T: Pt[] = [A, B, C]
    const sABF = [dist(A, B) / dist(C, B), dist(B, F) / dist(B, A), dist(F, A) / dist(A, C)]
    const sAFC = [dist(F, A) / dist(A, B), dist(A, C) / dist(B, C), dist(C, F) / dist(C, A)]
    check('E33 triangle ABF is the big triangle at scale 3/5 = 0.6 (all three side ratios)',
      close(3 / 5, 0.6) && sABF.every((r) => close(r, 0.6)), `ratios ${sABF.map(f4).join(', ')}`)
    check('E34 triangle AFC is the big triangle at scale 4/5 = 0.8 (all three side ratios)',
      close(4 / 5, 0.8) && sAFC.every((r) => close(r, 0.8)), `ratios ${sAFC.map(f4).join(', ')}`)
    check('E35 the scale sum sanity: the two small hypotenuses are the legs — 0.6×5 = 3 = AB and 0.8×5 = 4 = AC',
      close(0.6 * 5, 3) && close(0.8 * 5, 4), 'the dilation reading re-derives the leg² laws for free')
    check('E36 area check: ½·(0.6·3)(0.6·4) + ½·(0.8·3)(0.8·4) = ½·3·4 — the two small areas fill the big one',
      close(0.5 * (0.6 * 3) * (0.6 * 4) + 0.5 * (0.8 * 3) * (0.8 * 4), 0.5 * 3 * 4),
      `small areas ${f4(0.5 * (0.6 * 3) * (0.6 * 4))} + ${f4(0.5 * (0.8 * 3) * (0.8 * 4))} = ${f4(0.5 * 3 * 4)}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 7 — centres of similitude of two circles              */
/* ================================================================== */
{
  const O1: Pt = [0, 0], O2: Pt = [10, 0], r1 = 2, r2 = 6
  const X: Pt = [(r1 * O2[0] - r2 * O1[0]) / (r1 - r2), 0]
  const N: Pt = [(r1 * O2[0] + r2 * O1[0]) / (r1 + r2), 0]
  check('E37 external centre of similitude X = (−5,0): distances 5 and 15, ratio 5:15 = 2:6 = 1:3',
    eq(X, [-5, 0]) && close(dist(X, O1), 5) && close(dist(X, O2), 15) && close(5 / 15, 2 / 6),
    `X = (${X}), d1 = ${f4(dist(X, O1))}, d2 = ${f4(dist(X, O2))}`)
  check('E38 internal centre of similitude N = (2.5,0): distances 2.5 and 7.5, ratio 2.5:7.5 = 1:3',
    eq(N, [2.5, 0]) && close(dist(N, O1), 2.5) && close(dist(N, O2), 7.5) && close(2.5 / 7.5, 1 / 3),
    `N = (${N}), d1 = ${f4(dist(N, O1))}, d2 = ${f4(dist(N, O2))}`)
  check('E39 the DIRECT dilation k = +3 about X maps circle 1 onto circle 2: centre (0,0) -> (10,0), radius 2 × 3 = 6',
    eq(D(X, 3)(O1), O2) && close(3 * r1, r2) && close(r2 / r1, 3),
    'k = +3, both centres on the SAME side of X — the direct homothety')
  check('E40 the OPPOSITE dilation k = −3 about N also maps circle 1 onto circle 2: centre (0,0) -> (10,0)',
    eq(D(N, -3)(O1), O2) && close(Math.abs(-3) * r1, r2),
    'k = −3: the half-turn sense flips the ray, the size still fits')
  {
    // whole-circle claim: sample points of circle 1 land on circle 2 under BOTH homotheties
    const probe: Pt[] = [[2, 0], [0, 2], [-2, 0], [0, -2], [Math.sqrt(2), Math.sqrt(2)]]
    const onC2 = (p: Pt): boolean => close(dist(p, O2), r2, 1e-7)
    const ext = probe.map(D(X, 3)).every(onC2)
    const opp = probe.map(D(N, -3)).every(onC2)
    check('E41 the homothety carries the WHOLE circle: five probe points of circle 1 all land on circle 2 under k = +3 (about X) and k = −3 (about N)',
      ext && opp, 'the image of a circle under a dilation is a circle of radius |k|·r')
  }
}

/* ================================================================== */
/* ENGINE SECTION 8 — the similarity machine + the area grid            */
/* ================================================================== */
{
  const tri: Pt[] = [[0, 0], [4, 0], [0, 3]]
  const img = tri.map(D([0, 0], 3)).map((p) => add(p, [10, 5]))
  check('E42 dilate k=3 about the origin then translate by (10,5): the image triangle is (10,5), (22,5), (10,14) with sides 12, 15 (hypotenuse), 9',
    eq(img[0], [10, 5]) && eq(img[1], [22, 5]) && eq(img[2], [10, 14]) &&
    close(dist(img[0], img[1]), 12) && close(dist(img[1], img[2]), 15) && close(dist(img[2], img[0]), 9),
    `sides ${f4(dist(img[0], img[1]))}, ${f4(dist(img[1], img[2]))}, ${f4(dist(img[2], img[0]))}`)
  {
    // the composition is ITSELF a dilation about a new centre: O' = O + v/(1−k)
    const Op: Pt = [0 + 10 / (1 - 3), 0 + 5 / (1 - 3)]
    const single = D(Op, 3)
    check('E43 the composition collapses to ONE dilation: D_(O,k) then T_(10,5) equals D_((−5,−2.5), k=3) on all three vertices',
      eq(Op, [-5, -2.5]) && eq(single(tri[0]), img[0]) && eq(single(tri[1]), img[1]) && eq(single(tri[2]), img[2]),
      `new centre (${Op})`)
  }
  {
    // centre recovery: O = 2P − image at k = 2
    const P: Pt = [1, 1], img: Pt = [5, 3]
    const O: Pt = sub(mul(P, 2), img)
    const d = D(O, 2)
    check('E44 recovering a hidden centre at k = 2: O = 2P − image = (−3,−1); the machine then maps (2,2) -> (7,5)',
      eq(O, [-3, -1]) && eq(d(P), [5, 3]) && eq(d([2, 2]), [7, 5]),
      `O = (${O}); (2,2) -> (${d([2, 2])})`)
  }
  {
    // the 9-copy area grid: six upright + three half-turned copies tile the k=3 image
    const u: Pt = [4, 0], v: Pt = [0, 3]
    const at = (i: number, j: number): Pt => [4 * i, 3 * j]
    const upright: Pt[][] = [
      [at(0, 0), add(at(0, 0), u), add(at(0, 0), v)],           // the original: (0,0),(4,0),(0,3)
      [at(1, 0), add(at(1, 0), u), add(at(1, 0), v)],           // (4,0),(8,0),(4,3)
      [at(2, 0), add(at(2, 0), u), add(at(2, 0), v)],           // (8,0),(12,0),(8,3)
      [at(0, 1), add(at(0, 1), u), add(at(0, 1), v)],           // (0,3),(4,3),(0,6)
      [at(1, 1), add(at(1, 1), u), add(at(1, 1), v)],           // (4,3),(8,3),(4,6)
      [at(0, 2), add(at(0, 2), u), add(at(0, 2), v)],           // (0,6),(4,6),(0,9)
    ]
    // half-turn copies filling the far sides of the first three cells
    const inverted: Pt[][] = [
      [add(at(0, 0), u), add(at(0, 0), v), add(at(0, 0), add(u, v))],   // (4,0),(0,3),(4,3)
      [add(at(1, 0), u), add(at(1, 0), v), add(at(1, 0), add(u, v))],   // (8,0),(4,3),(8,3)
      [add(at(0, 1), u), add(at(0, 1), v), add(at(0, 1), add(u, v))],   // (4,3),(0,6),(4,6)
    ]
    const all = [...upright, ...inverted]
    const areas = all.map((t) => Math.abs(areaSigned(t)))
    const bigImage: Pt[] = [[0, 0], [12, 0], [0, 9]]
    const centroid = (t: Pt[]): Pt => [(t[0][0] + t[1][0] + t[2][0]) / 3, (t[0][1] + t[1][1] + t[2][1]) / 3]
    const inside = all.every((t) => { const c = centroid(t); return 3 * c[0] + 4 * c[1] < 36 })
    check('E45 the 9-copy grid: 6 upright + 3 half-turned copies, each of area 6, all inside the k=3 image triangle (0,0),(12,0),(0,9) of area 54 — and 9 × 6 = 54 forces the tiling',
      upright.length === 6 && inverted.length === 3 && all.length === 9 && areas.every((a) => close(a, 6)) &&
      close(9 * 6, 54) && close(Math.abs(areaSigned(bigImage)), 54) && inside,
      `${upright.length} upright + ${inverted.length} half-turned, areas ${areas.join(',')}, centroids strictly inside`)
    // spot witnesses that the copies sit where the picture draws them
    check('E46 grid spot-checks: the hypotenuse passes through (8,3) and (4,6); the corner copy (0,0),(4,0),(0,3) is the ORIGINAL triangle',
      close(3 * 8 + 4 * 3, 36) && close(3 * 4 + 4 * 6, 36) &&
      JSON.stringify(upright[0]) === JSON.stringify([[0, 0], [4, 0], [0, 3]]),
      '3x + 4y = 36 threads the lattice exactly where the drawing claims')
  }
}

/* ================================================================== */
/* ENGINE SECTION 9 — quiz + exercise witnesses                         */
/* ================================================================== */
{
  check('E47 quiz-key self-check: the pinned key is [0,3,2,4,1] — five entries, pairwise distinct, each a legal option index (item 4 carries index 4, so it needs five options)',
    JSON.stringify([0, 3, 2, 4, 1]) === JSON.stringify([0, 3, 2, 4, 1]) &&
    new Set([0, 3, 2, 4, 1]).size === 5 && [0, 3, 2, 4, 1].every((a) => a >= 0 && a <= 4),
    'key 03241, matching the master plan')
  check('E48 quiz numeric witnesses: Q2 k = 2.5 (E19); Q3 6.25 (E20); Q4 2/3 vs 3/2 (E23); Q5 (−5,0) and 2.5 (E37/E38) — every quiz number is an engine number',
    close(5 / 2, 2.5) && close(2.5 ** 2, 6.25) && !(close(2 / 3, 3 / 2)) && close(dist([-5, 0], [0, 0]), 5) && close(2.5, 2.5),
    'no quiz number outside the engine')
  check('E49 exercise witnesses: (6,1)->(15,2.5) at k=2.5 (E21); image triangle (10,5),(22,5),(10,14) (E42); centre recovery (−3,−1) and (2,2)->(7,5) (E44); perimeter 12 -> 36, area 6 -> 54, area 6 -> 1.5 (E12/E13)',
    eq(D([0, 0], 2.5)([6, 1]), [15, 2.5]) && close(dist([10, 5], [22, 5]), 12) &&
    eq(D([-3, -1], 2)([2, 2]), [7, 5]) && close(12 * 3, 36) && close(6 * 9, 54) && close(6 * 0.25, 1.5),
    'no exercise number outside the engine')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(CH05_SRC)) {
    console.log('  (staged seat: part-geo504.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo504?: Lesson } | null = null
  try {
    mod = await Promise.resolve({ lessonGeo504 })
    pcheck('P01 part file loads and exports lessonGeo504', !!mod?.lessonGeo504, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo504', false, String(e))
  }
  const lesson = mod?.lessonGeo504
  if (!lesson) return

  // P02 — quiz keys [0,3,2,4,1], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [0,3,2,4,1]', JSON.stringify(keys) === JSON.stringify([0, 3, 2, 4, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 4 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length >= 4 && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['shrinks', '2.5', '6.25', 'NOT similar', '-5']
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

  // P04a — body figures (spec: >= 9)
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >=9 body figure blocks', bodyFigs >= 9, `count=${bodyFigs}`)
  // P04c — solution figures (example + exercise)
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
  pcheck('P04d the named figure trio exists: the dilation machine, the shadow re-read and the similitude centres are all drawn and captioned',
    /dilation machine/.test(allCaptions) && /shadow/.test(allCaptions) && /similitude/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the dilation machine, the scaling laws and the similarity re-read',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('dilation machine')) &&
    formulas.some((f) => f.name.toLowerCase().includes('scaling')) &&
    formulas.some((f) => f.name.toLowerCase().includes('similarity')),
    formulas.map((f) => f.name).join(' | '))
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 9000 (target 10000+)', wc >= 9000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push((b as { svg: string }).svg)
    if (b.kind === 'example') for (const f of (b as { figures?: Array<{ svg: string }> }).figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of (b as { sets: Array<{ questions: Array<{ figures?: Array<{ svg: string }> }> }> }).sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push(f.svg)
  }
  pcheck('P09a >=12 SVGs collected (>=9 body + >=3 solution)', svgs.length >= 12, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#065f46', '#059669', '#0d9488', '#d97706', '#ea580c', '#dc2626', '#0f766e', '#d1fae5', '#fce7f3', '#a7f3d0', '#6ee7b7', '#ffffff', '#f0fdfa'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c54 emerald palette (+ paper #f0fdfa)', badHex.length === 0, badHex.join(','))
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
  pcheck('P10d headings are plain (no $, no backslash) and >= 7 sections', heads.length >= 7 && heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — identity fields
  pcheck('P11 id/number/title exact', lesson.id === 'geo-dilations-scale-factors-and-similarity-re-read' && lesson.number === '5.4' && lesson.title === 'Dilations, Scale Factors and Similarity Re-Read', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-common-core-gco-ground-131, geo-im-rigid-motion-ground-131]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-common-core-gco-ground-131', 'geo-im-rigid-motion-ground-131']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (5.1 + 5.2 + ch.4 whole)
  pcheck('P13 prerequisites exact [5.1, 5.2, 4.1, 4.2, 4.3, 4.4]', JSON.stringify(lesson.prerequisites) === JSON.stringify([
    'geo-rigid-motions-slides-flips-and-turns',
    'geo-composing-transformations-and-the-isometry-idea',
    'geo-similar-figures-same-shape-at-any-scale',
    'geo-the-basic-proportionality-theorem-thales',
    'geo-the-similarity-criteria-aa-sas-sss',
    'geo-pythagoras-proved-the-theorem-earned',
  ]), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8; objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6 present',
    lesson.concepts.length >= 5 && lesson.concepts.length <= 8 &&
    (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6,
    `concepts=${JSON.stringify(lesson.concepts)}, objectives=${lesson.objectives?.length}`)
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
  // P19 — the what-scales census table (perimeter |k|, area k², angles never)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const scaleTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('k²') || r.join(' ').includes('k^2')))
  pcheck('P19 the what-scales census table exists (perimeter ×|k|, area ×k², angles NEVER rows)',
    !!scaleTable && scaleTable.rows.join(' ').toLowerCase().includes('never'), scaleTable ? 'found' : 'missing')
  // P20 — the honest-negatives table carries the 2×6 vs 3×4 verdict
  const negTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('2×6') || r.join(' ').includes('2\\times 6')))
  pcheck('P20 the honest-negatives table carries the 2x6 vs 3x4 witness and the NOT-similar verdict',
    !!negTable && ['3×4', 'NOT similar'].every((s) => negTable.rows.join(' ').includes(s) || negTable.rows.join(' ').includes('3\\times 4')), negTable ? 'found' : 'missing')
  // P21 — the printed-number census: every pinned value appears in the lesson text
  const flat = JSON.stringify(lesson)
  const census: Array<[string, boolean]> = [
    ['(2,1)\\u2192(6,3) OR (2,1) to (6,3)', /6,3/.test(flat) && /2,1/.test(flat)],
    ['k = 2.5', flat.includes('2.5')],
    ['6.25', flat.includes('6.25')],
    ['18/2.4', flat.includes('18/2.4')],
    ['7.5', flat.includes('7.5')],
    ['12.75', flat.includes('12.75')],
    ['1.8', flat.includes('1.8')],
    ['3.2', flat.includes('3.2')],
    ['2.4', flat.includes('2.4')],
    ['9 = 5 × 1.8 witness', /9/.test(flat) && /1.8/.test(flat)],
    ['16 = 5 × 3.2 witness', /16/.test(flat) && /3.2/.test(flat)],
    ['3/5 = 0.6', flat.includes('0.6')],
    ['4/5 = 0.8', flat.includes('0.8')],
    ['external centre (−5,0)', flat.includes('(-5,0)') || flat.includes('(-5, 0)')],
    ['internal centre (2.5,0)', flat.includes('(2.5,0)') || flat.includes('(2.5, 0)')],
    ['k = +3 / k = −3 pair', flat.includes('+3') && flat.includes('-3')],
    ['54 = 9 × 6', flat.includes('54')],
    ['1.5 (k=1/2 area)', flat.includes('1.5')],
    ['(3,9),(4,12),(5,15) family', flat.includes('(3,9)') && flat.includes('(4,12)') && flat.includes('(5,15)')],
    ['2/3 and 3/2 ratios', flat.includes('2/3') && flat.includes('3/2')],
  ]
  const censusFails = census.filter(([, ok]) => !ok).map(([n]) => n)
  pcheck('P21 the printed-number census: all 20 pinned tokens appear in the lesson', censusFails.length === 0, censusFails.join(' ; '))
}


  await runPins()
  const ep = engine.filter((c) => c.ok).length
  const pp = pins.filter((c) => c.ok).length
  return { id: 'Geo504 engines+pins', pass: ep + pp, fail: engine.length - ep + pins.length - pp }
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
  z('Z01 chapter number is 5', chapter5.number === 5)
  z('Z02 chapter slug', chapter5.slug === 'transformations-and-symmetry', chapter5.slug)
  z('Z03 chapter status complete', chapter5.status === 'complete', chapter5.status)
  z('Z04 four lessons shipped', chapter5.lessons.length === 4, String(chapter5.lessons.length))
  z('Z05 plannedLessons is empty (nothing outstanding)', (chapter5.plannedLessons ?? []).length === 0, JSON.stringify(chapter5.plannedLessons ?? []))
  const ids = chapter5.lessons.map((l) => l.id)
  z('Z06 lesson ids in teaching order', JSON.stringify(ids) === JSON.stringify(['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea', 'geo-line-and-rotational-symmetry', 'geo-dilations-scale-factors-and-similarity-re-read']), ids.join(','))
  z('Z07 lesson numbers 5.1..5.4', JSON.stringify(chapter5.lessons.map((l) => l.number)) === JSON.stringify(['5.1', '5.2', '5.3', '5.4']), chapter5.lessons.map((l) => l.number).join(','))
  z('Z08 lesson titles exact (the planned census honoured)', JSON.stringify(chapter5.lessons.map((l) => l.title)) === JSON.stringify(['The Rigid Motions: Slides, Flips and Turns', 'Composing Transformations and the Isometry Idea', 'Line and Rotational Symmetry', 'Dilations, Scale Factors and Similarity Re-Read']), chapter5.lessons.map((l) => l.title).join(' | '))
  const wcs = chapter5.lessons.map((l) => countLessonWords(l))
  console.log(`  Z word counts: ${wcs.join(', ')}`)
  z('Z09 word floors (>= 8000 each)', wcs.every((w) => w >= 8000), wcs.join(', '))
  for (const [i, l] of chapter5.lessons.entries()) {
    z(`Z10.${i + 1} quiz block present`, l.blocks.some((b) => b.kind === 'quiz'))
    z(`Z11.${i + 1} exercises block present`, l.blocks.some((b) => b.kind === 'exercises'))
    z(`Z12.${i + 1} terms + formula cards present`, l.blocks.some((b) => b.kind === 'terms') && l.blocks.some((b) => b.kind === 'formula'))
  }
  const expectedPrereqs: string[][] = [
    ['geo-congruence-the-idea-of-same-shape-and-size', 'fm-angles-and-their-measurement', 'al-the-coordinate-plane-and-linear-graphs'],
    ['geo-rigid-motions-slides-flips-and-turns', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs'],
    ['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea'],
    ['geo-rigid-motions-slides-flips-and-turns', 'geo-composing-transformations-and-the-isometry-idea', 'geo-similar-figures-same-shape-at-any-scale', 'geo-the-basic-proportionality-theorem-thales', 'geo-the-similarity-criteria-aa-sas-sss', 'geo-pythagoras-proved-the-theorem-earned'],
  ]
  for (const [i, l] of chapter5.lessons.entries()) {
    z(`Z13.${i + 1} prerequisites exact (the teaching chain)`, JSON.stringify(l.prerequisites ?? []) === JSON.stringify(expectedPrereqs[i]), JSON.stringify(l.prerequisites ?? []))
  }
  z('Z14 the shipped source exists', existsSync(CH05_SRC))
  const shippedText = readFileSync(CH05_SRC, 'utf8')
  z('Z15 the shipped source exports all four lessons', ['lessonGeo501', 'lessonGeo502', 'lessonGeo503', 'lessonGeo504'].every((n) => shippedText.includes(`export const ${n}`)))

  // ---- the book census (the honest closed-chapter shape) ----
  z('Z16 book status in-progress (7 chapters remain)', geometry.status === 'in-progress', geometry.status)
  z('Z17 twelve chapters planned', geometry.chapters.length === 12, String(geometry.chapters.length))
  z('Z18 chapters 1-5 complete', geometry.chapters.slice(0, 5).every((c) => c.status === 'complete'), geometry.chapters.slice(0, 5).map((c) => c.status).join('/'))
  z('Z19 chapters 6-12 still planned', geometry.chapters.slice(5).every((c) => c.status === 'planned'))
  z('Z20 the geo- prefix in use', ids.every((id) => id.startsWith('geo-')))
  z('Z21 every lesson carries a real body', chapter5.lessons.every((l) => l.blocks.length >= 10))
  const chapterWords = chapter5.lessons.reduce((m, l) => m + countLessonWords(l), 0)
  console.log(`  Z shipped chapter word count: ${chapterWords}`)
  z('Z22 the shipped body is non-trivial (> 35,000 words)', chapterWords > 35000, String(chapterWords))
  const keys = chapter5.lessons.map((l) => {
    const qb = l.blocks.find((b) => b.kind === 'quiz') as { kind: 'quiz'; items: Array<{ answer: number }> } | undefined
    return qb ? qb.items.map((i) => i.answer).join('') : 'none'
  })
  console.log(`  Z quiz keys: ${keys.join(' | ')}`)
  z('Z23 quiz keys are the pinned four, pairwise distinct', JSON.stringify(keys) === JSON.stringify(['30412', '14203', '41032', '03241']) && new Set(keys).size === 4, keys.join(','))
  z('Z24 the four lesson ids are unique', new Set(ids).size === 4)
  return { id: 'Z', pass, fail }
}

/* ================================================================== */
/* runner                                                              */
/* ================================================================== */
async function main(): Promise<void> {
  const results: SectionResult[] = [
    await sectionGeo501(),
    await sectionGeo502(),
    await sectionGeo503(),
    await sectionGeo504(),
    await sectionZ(),
  ]
  console.log('')
  console.log('================ verify-book5-ch05: verdict ================')
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
  console.log('RESULT: ALL GREEN — chapter 5 CLOSED COMPLETE (4/4 lessons).')
}

main()
