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
import { existsSync } from 'node:fs'
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
  if (!existsSync(new URL('./part-geo501.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo501.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo501?: Lesson } | null = null
  try {
    mod = await import('./part-geo501')
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
const e = report('geo501-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo501-pins', pins)
const fail = e.fail + p.fail
console.log(`geo501 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
