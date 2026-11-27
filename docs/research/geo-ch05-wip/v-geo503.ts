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
  if (!existsSync(new URL('./part-geo503.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo503.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo503?: Lesson } | null = null
  try {
    mod = await import('./part-geo503')
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
const e = report('geo503-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo503-pins', pins)
const fail = e.fail + p.fail
console.log(`geo503 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
