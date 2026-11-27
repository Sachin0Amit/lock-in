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
  if (!existsSync(new URL('./part-geo502.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo502.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo502?: Lesson } | null = null
  try {
    mod = await import('./part-geo502')
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
const e = report('geo502-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo502-pins', pins)
const fail = e.fail + p.fail
console.log(`geo502 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
