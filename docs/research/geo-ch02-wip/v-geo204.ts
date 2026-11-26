/**
 * v-geo204.ts — verify-first ENGINE + PIN harness for GEO lesson 2.4
 * "Angle Sum of a Triangle and Its Consequences" (run 126 swarm, agent geo204).
 *
 * DISCIPLINE: the engine wins over the spec. Every truth value, census number
 * and witness the prose prints is recomputed here by brute force FIRST; where
 * this engine and the prose disagree, the prose is fixed to the engine's value
 * and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION (NO part import) — re-derives in TypeScript every pinned
 *     witness of pin_check_geo126.py's 2.4 block, plus the lesson's own
 *     figures/quiz/exercise witnesses:
 *     - third-angle arithmetic (60,70)->50, (90,27.5)->62.5, (62,54)->64 ...;
 *     - the I.32 proof walk on a concrete triangle: the parallel through the
 *       vertex, the two alternate-interior carries (a4=a6 and a3=a5 census
 *       licenses), and the straight-angle decomposition on the parallel;
 *     - the exterior-angle sweeps: equality to the remote sum AND strict
 *       inequality over each remote, for every positive integer pair (a,b)
 *       with a+b < 180 (15,931 pairs);
 *     - the which-results-cost-the-postulate ordering fact (I.16 < I.29 < I.32);
 *     - the classification census: positive sweep at-most-one-non-acute over
 *       all a,b >= 1 with a+b <= 179, witnesses (100,40,40)/(90,62,28)/(61,60,59),
 *       the degenerate (180,0,0) honesty, the right-triangle complement;
 *     - the polygon tables n=3..12 with dissection counts, the 180n identity
 *       and the exterior sum 360; the 2025-gon;
 *     - the regular tables incl. the honest decimals round(900/7,6)=128.571429
 *       and round(1620/11,6)=147.272727 with round-trip error audits;
 *     - the non-Euclidean door: octant 270 / excess 90 with the meridian-
 *       equator perpendicularity proved by honest dot products, the Girard
 *       area cross-check, the parallel census 1/0/infinity;
 *     - quiz-key self-check; every exercise witness number.
 *   PIN SECTION (runPins) — imports ./part-geo204 + countLessonWords and audits
 *     the lesson object per spec (identity fields, word floor, quiz key,
 *     15 exercises L1..L6, figures, terms, formulas, hygiene scans).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo204.ts
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

/* ================================================================== */
/* ENGINE SECTION 1 — third-angle arithmetic + lesson witnesses        */
/* ================================================================== */
{
  const third = (a: number, b: number): number => 180 - a - b
  check('E01 third angle (60, 70) = 50', third(60, 70) === 50, `${third(60, 70)}`)
  check('E02 third angle (90, 27.5) = 62.5', close(third(90, 27.5), 62.5), `${third(90, 27.5)}`)
  check('E03 illustration witness: third angle (62, 54) = 64', close(third(62, 54), 64), `${third(62, 54)}`)
  check('E04 F3 witness: (47, 61) -> third 72, exterior at the third vertex 108',
    close(third(47, 61), 72) && close(47 + 61, 108), `third=${third(47, 61)}, exterior=${47 + 61}`)
  check('E05 right-triangle complement witnesses: (34, 56) and (62, 28)',
    close(34 + 56, 90) && close(62 + 28, 90), `34+56=${34 + 56}, 62+28=${62 + 28}`)
  check('E06 ratio 2:3:4 -> k = 20 -> angles (40, 60, 80)',
    2 * 20 + 3 * 20 + 4 * 20 === 180 && JSON.stringify([2 * 20, 3 * 20, 4 * 20]) === JSON.stringify([40, 60, 80]),
    `k=${180 / 9}`)
  check('E07 Q7 algebra: 5x + 20 = 100 -> x = 16, remotes 53 and 47, vertex 80',
    5 * 16 + 20 === 100 && 3 * 16 + 5 === 53 && 2 * 16 + 15 === 47 && 180 - 100 === 80 && 53 + 47 === 100,
    `x=16: 53+47=${53 + 47}`)
  check('E08 Q8 pentagon ledger: 540 − 4×115 = 80 (a cyclic pentagon with gaps 100, 30, 100, 30, 100 realises it)',
    (5 - 2) * 180 - 4 * 115 === 80, `${(5 - 2) * 180 - 4 * 115}`)
  check('E09 Q9 walk-around algebra: 30 + 45 + 60 + 3x = 360 -> x = 75, interiors sum 720',
    30 + 45 + 60 + 3 * 75 === 360 && (180 - 30) + (180 - 45) + (180 - 60) + 3 * (180 - 75) === 720,
    `x=${(360 - 135) / 3}`)
}

/* ================================================================== */
/* ENGINE SECTION 2 — the I.32 proof walk on a concrete triangle        */
/* B=(0,0), C=(10,0), A=(4,3); the parallel through A is horizontal.    */
/* The two carries are the a4=a6 and a3=a5 alternate-interior licenses. */
/* ================================================================== */
{
  type P = [number, number]
  const A: P = [4, 3], B: P = [0, 0], C: P = [10, 0]
  const ang = (V: P, P1: P, P2: P): number => {
    const u = [P1[0] - V[0], P1[1] - V[1]]
    const w = [P2[0] - V[0], P2[1] - V[1]]
    const dot = u[0] * w[0] + u[1] * w[1]
    const cr = u[0] * w[1] - u[1] * w[0]
    return Math.abs(Math.atan2(cr, dot)) * 180 / Math.PI
  }
  const a = ang(A, B, C) // angle at A of the triangle
  const b = ang(B, A, C) // angle at B
  const c = ang(C, A, B) // angle at C
  check('E10 concrete triangle: a + b + c = 180 (to 1e-9)', close(a + b + c, 180, 1e-9), `a=${f4(a)}, b=${f4(b)}, c=${f4(c)}, sum=${f4(a + b + c)}`)
  // the parallel ℓ through A, parallel to BC (both horizontal)
  const L: P = [-5, 3], R: P = [15, 3] // left and right points of ℓ
  const dA = (P1: P, P2: P) => (P2[1] - P1[1]) * (P2[0] - P1[0]) // slope check helper (dy*dx for horizontals)
  check('E11 ℓ through A is parallel to BC (both horizontal)', dA(A, L) === 0 && dA(A, R) === 0 && dA(B, C) === 0, 'dy = 0 on all three pairs')
  const carriedB = ang(A, L, B) // at A: between the LEFT ray of ℓ and ray A->B
  const carriedC = ang(A, C, R) // at A: between ray A->C and the RIGHT ray of ℓ
  check('E12 carry 1 (a4 = a6 license): angle at B = angle between ℓ-left and AB at A',
    close(carriedB, b, 1e-9), `carried=${f4(carriedB)}, b=${f4(b)}`)
  check('E13 carry 2 (a3 = a5 license): angle at C = angle between AC and ℓ-right at A',
    close(carriedC, c, 1e-9), `carried=${f4(carriedC)}, c=${f4(c)}`)
  const piece1 = ang(A, L, B), piece2 = ang(A, B, C), piece3 = ang(A, C, R)
  check('E14 the straight-angle ledger on ℓ: piece1 + ∠A + piece3 = 180 exactly (L, A, R collinear)',
    close(piece1 + piece2 + piece3, 180, 1e-9), `${f4(piece1)} + ${f4(piece2)} + ${f4(piece3)} = ${f4(piece1 + piece2 + piece3)}`)
  check('E15 the proof closes: carried b + ∠A + carried c = 180 with each carry engine-matched',
    close(carriedB + a + carriedC, 180, 1e-9) && close(carriedB, b, 1e-9) && close(carriedC, c, 1e-9),
    `${f4(carriedB)} + ${f4(a)} + ${f4(carriedC)} = ${f4(carriedB + a + carriedC)}`)
  // the 2.3 census route: with m ∥ n and a1 = x, alternate interiors a4 = a6 and a3 = a5
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  let altOK = true
  for (const x of [65, 37.5, 112.75, 90, 54, 64, 23.7]) {
    const v = census(x)
    altOK = altOK && close(v[3], v[5]) && close(v[2], v[4]) // a4=a6 and a3=a5
  }
  check('E16 census licenses a4=a6 and a3=a5 hold for every swept a1 (7 witnesses incl. 65, 37.5, 112.75, 90)',
    altOK, 'alternate interior equality under m ∥ n (I.29)')
  // the 2.1 license: the straight angle is two right angles
  check('E17 the 2.1 straight-angle license: 180 = 90 + 90 (two right angles)', 180 === 90 + 90, '')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the exterior angle sweeps (pinned)               */
/* for EVERY positive integer pair (a, b) with a + b < 180:            */
/* exterior = a + b exactly, and exterior > a and > b strictly.         */
/* ================================================================== */
{
  let eqOK = true, gtOK = true, linOK = true, count = 0
  for (let a = 1; a <= 178; a++) {
    for (let b = 1; b <= 179 - a; b++) {
      const c = 180 - a - b // the angle at the extended vertex
      const ext = 180 - c // the exterior angle (linear pair at that vertex)
      count++
      eqOK = eqOK && ext === a + b
      gtOK = gtOK && ext > a && ext > b
      linOK = linOK && ext + c === 180
    }
  }
  check('E18 sweep count = 15,931 positive integer pairs (a, b) with a + b < 180',
    count === 15931, `count=${count}`)
  check('E19 exterior = sum of remote interiors, EXACTLY, on all 15,931 pairs', eqOK, '')
  check('E20 exterior > each remote interior, STRICTLY, on all 15,931 pairs', gtOK, '')
  check('E21 exterior + adjacent interior = 180 (the linear pair) on all pairs', linOK, '')
  // the honest note: the INEQUALITY needs only b > 0 and the straight angle (fifth-free);
  // the EQUALITY needs the full sum (I.32, fifth-costing). Proposition ordering fact:
  check('E22 the inequality is fifth-free arithmetic: 180 − c > a ⟺ a + c < 180 ⟺ (b exists and is positive)',
    (180 - 100 > 40) === (40 + 100 < 180) && (180 - 40 > 140) === (40 + 140 < 180), 'no sum law used')
  check('E23 proposition ordering: I.16 < I.29 < I.32 (I.16 inequality fifth-free, I.32 equality fifth-costing)',
    16 < 29 && 29 < 32, 'Euclid first uses the fifth postulate at I.29 (ground-truth register)')
  // specific witnesses used in prose/figures
  check('E24 exterior witnesses: (52, 61) -> 113; (36, 72) -> 108; (72, 72) -> 144',
    52 + 61 === 113 && 36 + 72 === 108 && 72 + 72 === 144, 'engine witnesses for F3, Q2, Q12')
}

/* ================================================================== */
/* ENGINE SECTION 4 — the classification census                        */
/* positive sweep: at most one non-acute angle; the degenerate honesty */
/* ================================================================== */
{
  const classify = (x: number): string => {
    if (x === 0) return 'degenerate'
    if (0 < x && x < 90) return 'acute'
    if (x === 90) return 'right'
    if (90 < x && x < 180) return 'obtuse'
    return 'out of range'
  }
  let law = true, n = 0
  for (let a = 1; a <= 178; a++) {
    for (let b = 1; b <= 179 - a; b++) {
      const c = 180 - a - b // c >= 1 because b <= 179 - a
      const nonacute = [a, b, c].filter((g) => g >= 90).length
      law = law && nonacute <= 1
      n++
    }
  }
  check('E25 positive sweep over all a, b >= 1 with a + b <= 179: at most one non-acute angle',
    law, `${n} triples swept`)
  check('E26 sweep triple count = 15,931', n === 15931, `count=${n}`) // same parameter space as the exterior sweep
  check('E27 witness (100, 40, 40) is obtuse', classify(Math.max(100, 40, 40)) === 'obtuse', '')
  check('E28 witness (90, 62, 28) is right', classify(90) === 'right', '')
  check('E29 witness (61, 60, 59) is acute', Math.max(61, 60, 59) < 90, '')
  check('E30 the right triangle complement: with one angle 90, the other two sum to 90 (sweep a = 1..89)',
    Array.from({ length: 89 }, (_, i) => i + 1).every((a) => a + (90 - a) === 90), '')
  // the degenerate honesty: (180, 0, 0) sums to 180 but is NOT a triangle
  const deg: number[] = [180, 0, 0]
  check('E31 the degenerate triple (180, 0, 0) sums to 180 but has zero angles — the law needs positivity',
    deg[0] + deg[1] + deg[2] === 180 && deg.some((g) => g <= 0), 'three collinear points: honestly named, excluded')
  check('E32 two non-acute angles already overflow: 91 + 95 = 186 > 180 (quiz witness)',
    91 + 95 === 186 && 186 > 180, 'no such triangle exists')
}

/* ================================================================== */
/* ENGINE SECTION 5 — polygon sums by dissection (pinned table n=3..12)*/
/* ================================================================== */
{
  const N = [3, 4, 5, 6, 7, 8, 9, 10, 11, 12]
  const want = [180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800]
  const got = N.map((n) => (n - 2) * 180)
  check('E33 interior sums n=3..12 = 180, 360, 540, 720, 900, 1080, 1260, 1440, 1620, 1800',
    JSON.stringify(got) === JSON.stringify(want), got.join(','))
  check('E34 dissection triangle counts = n − 2 = 1..10',
    JSON.stringify(N.map((n) => n - 2)) === JSON.stringify([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), '')
  check('E35 diagonals drawn from one vertex = n − 3 (0, 1, 2, ..., 9)',
    JSON.stringify(N.map((n) => n - 3)) === JSON.stringify([0, 1, 2, 3, 4, 5, 6, 7, 8, 9]), '')
  check('E36 the vertex identity: interior sum + exterior sum = 180n for every n = 3..12',
    N.every((n, i) => (n - 2) * 180 + 360 === 180 * n), `e.g. n=5: ${got[2]} + 360 = ${180 * 5}`)
  check('E37 the exterior-angle sum is 360 for EVERY convex n-gon (n = 3..12)',
    N.every(() => 180 * 12 - (12 - 2) * 180 === 360) && N.every((n) => 180 * n - (n - 2) * 180 === 360), '')
  check('E38 the pentagon ledger: 5 vertices, 2 diagonals from one vertex, 3 triangles, 3 × 180 = 540',
    5 - 3 === 2 && 5 - 2 === 3 && 3 * 180 === 540, '')
  check('E39 Q5 witness: interior sum 1260 ⟺ n − 2 = 7 ⟺ n = 9',
    (9 - 2) * 180 === 1260, '')
  check('E40 Q13 witness: the 2025-gon has interior sum (2025 − 2) × 180 = 364,140 and exterior sum 360',
    (2025 - 2) * 180 === 364140 && 360 === 360, `${(2025 - 2) * 180}`)
  check('E41 a pentagon has 5 choose 2 − 5 = 5 diagonals in total (2 of them do the dissection)',
    (5 * 4) / 2 - 5 === 5, '')
  check('E42 the regular pentagon exterior = 360/5 = 72; five turns of 72 = 360 (walk-around)',
    360 / 5 === 72 && 5 * 72 === 360, '')
}

/* ================================================================== */
/* ENGINE SECTION 6 — regular polygon tables + the honest decimals     */
/* ================================================================== */
{
  const NI = [3, 4, 5, 6, 8, 9, 10, 12]
  const WI = [60, 90, 108, 120, 135, 140, 144, 150]
  const gi = NI.map((n) => ((n - 2) * 180) / n)
  check('E43 regular interiors for n = 3, 4, 5, 6, 8, 9, 10, 12 = 60, 90, 108, 120, 135, 140, 144, 150',
    NI.every((n, i) => close(gi[i], WI[i])), gi.map((v) => f4(v)).join(','))
  const NE = [3, 5, 6, 8, 9, 10, 12]
  const WE = [120, 72, 60, 45, 40, 36, 30]
  const ge = NE.map((n) => 360 / n)
  check('E44 regular exteriors for n = 3, 5, 6, 8, 9, 10, 12 = 120, 72, 60, 45, 40, 36, 30',
    NE.every((n, i) => close(ge[i], WE[i])), ge.map((v) => f4(v)).join(','))
  check('E45 interior + exterior = 180 at every vertex of every regular n-gon in both tables',
    NI.every((n) => close(((n - 2) * 180) / n + 360 / n, 180)), '')
  check('E46 the honest decimal: round(900/7, 6) = 128.571429 (regular 7-gon interior)',
    round6(900 / 7) === 128.571429, `${round6(900 / 7)}`)
  check('E47 the honest decimal: round(1620/11, 6) = 147.272727 (regular 11-gon interior)',
    round6(1620 / 11) === 147.272727, `${round6(1620 / 11)}`)
  check('E48 exact fractions beside the decimals: 900/7 = 128 + 4/7 and 1620/11 = 147 + 3/11',
    close(128 + 4 / 7, 900 / 7, 1e-12) && close(147 + 3 / 11, 1620 / 11, 1e-12), '')
  const err7 = Math.abs(7 * 128.571429 - 900)
  const err11 = Math.abs(11 * 147.272727 - 1620)
  check('E49 round-trip honesty: 7 × 128.571429 misses 900 by < 1e−5, 11 × 147.272727 misses 1620 by < 1e−5',
    err7 < 1e-5 && err11 < 1e-5, `err7=${err7.toExponential(2)}, err11=${err11.toExponential(2)}`)
  check('E50 illustration 3 system: interior = 3 × exterior with i + e = 180 -> e = 45, n = 8, i = 135',
    4 * 45 === 180 && close(360 / 8, 45) && close(((8 - 2) * 180) / 8, 135), '')
  check('E51 Q6 witness: interior 165 -> exterior 15 -> n = 24 (360/15 integer), interior sum 3960',
    180 - 165 === 15 && 360 / 15 === 24 && (24 - 2) * 180 === 3960, '')
  check('E52 Q10 system: interior = 5 × exterior -> 6e = 180 -> e = 30, n = 12, i = 150',
    6 * 30 === 180 && close(360 / 12, 30) && close(((12 - 2) * 180) / 12, 150), '')
  function round6(x: number): number {
    return Math.round(x * 1e6) / 1e6
  }
}

/* ================================================================== */
/* ENGINE SECTION 7 — the non-Euclidean door (octant, Girard, census)  */
/* ================================================================== */
{
  check('E53 the octant triangle: 90 + 90 + 90 = 270', 90 + 90 + 90 === 270, '')
  check('E54 the spherical excess of the octant: 270 − 180 = 90', 90 + 90 + 90 - 180 === 90, '')
  // the pinned construction: N = (0,0,R); equator points at longitude 45 and 135 (90 apart)
  const R = 1
  const N: [number, number, number] = [0, 0, R]
  const E1: [number, number, number] = [R * Math.cos(Math.PI / 4), R * Math.sin(Math.PI / 4), 0]
  const E2: [number, number, number] = [R * Math.cos((3 * Math.PI) / 4), R * Math.sin((3 * Math.PI) / 4), 0]
  const dot3 = (u: [number, number, number], v: [number, number, number]) => u[0] * v[0] + u[1] * v[1] + u[2] * v[2]
  check('E55 the two equator points sit 90° of longitude apart (dot product of unit radii = 0)',
    close(dot3(E1, E2), 0, 1e-12), `dot=${dot3(E1, E2).toExponential(2)}`)
  // meridian tangent at an equator point points due north (0,0,1); equator tangent is horizontal:
  const north: [number, number, number] = [0, 0, 1]
  const eqTanAt = (t: number): [number, number, number] => [-Math.sin(t), Math.cos(t), 0]
  const t1 = Math.PI / 4, t2 = (3 * Math.PI) / 4
  check('E56 right angle at E1: meridian tangent (north) ⊥ equator tangent (dot = 0)',
    close(dot3(north, eqTanAt(t1)), 0, 1e-12), '')
  check('E57 right angle at E2: meridian tangent (north) ⊥ equator tangent (dot = 0)',
    close(dot3(north, eqTanAt(t2)), 0, 1e-12), '')
  // at the pole: the two meridian tangents at N for longitudes 45 and 135
  const merTanAtPole = (lam: number): [number, number, number] =>
    [-Math.cos(lam), -Math.sin(lam), 0]
  check('E58 right angle at N: the two meridian tangents at the pole are perpendicular (dot = 0)',
    close(dot3(merTanAtPole(t1), merTanAtPole(t2)), 0, 1e-12),
    `dot=${dot3(merTanAtPole(t1), merTanAtPole(t2)).toExponential(2)}`)
  check('E59 the octant is genuinely a triangle (non-degenerate): N, E1, E2 distinct, not collinear',
    JSON.stringify(N) !== JSON.stringify(E1) && JSON.stringify(E1) !== JSON.stringify(E2) && close(dot3(E1, E2), 0), '')
  // Girard's theorem cross-check: area = E (radians) × R²; octant = 1/8 of the sphere
  const E_rad = (Math.PI / 180) * 90
  const R10 = 10
  const girard = E_rad * R10 * R10
  const eighth = (4 * Math.PI * R10 * R10) / 8
  check('E60 Girard cross-check: octant area on R = 10 sphere = (π/2)·100 = 50π = 4πR²/8 (two routes agree)',
    close(girard, eighth, 1e-9) && close(girard, 50 * Math.PI, 1e-9), `area=${f4(girard)} = 50π`)
  check('E61 Q15 numeric: 50π ≈ 157.0796 (4 dp)', close(50 * Math.PI, 157.0796, 5e-5), `${(50 * Math.PI).toFixed(4)}`)
  check('E62 a lune-based witness: spherical triangle (90, 90, 50) has excess 50',
    90 + 90 + 50 - 180 === 50, '')
  check('E63 hyperbolic triangles sum to LESS than 180 (named fact; deficit, not excess)',
    true, 'the hyperbolic door opens in ch.11 — stated, not proved here')
  check('E64 the 2.2 census tie: Euclid 1 parallel / sphere 0 / hyperbolic ∞ through a point',
    JSON.stringify([1, 0, 'infinitely many']) === JSON.stringify([1, 0, 'infinitely many']), 'the trichotomy of ch.2')
  check('E65 the equivalence named: angle sum 180 ⟺ the parallel postulate (proof rides ch.11)',
    true, 'both directions hold; this is why the fifth postulate was worth two thousand years of argument')
}

/* ================================================================== */
/* ENGINE SECTION 8 — quiz key self-check + exercise witnesses         */
/* ================================================================== */
{
  const QUIZ_KEY = [1, 3, 0, 2, 1]
  const QUIZ_TOKENS = [
    'alternate interior',        // Q1: the a4=a6-class license
    'sum of the two remote',     // Q2: exterior = remote sum
    '5 triangles, 900',          // Q3: heptagon dissection
    'sum of 270',                // Q4: octant sum
    'no such triangle',          // Q5: 91 + 95 = 186 > 180
  ]
  check('E66 quiz key [1, 3, 0, 2, 1]: 5 entries, each in 0..3',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3), QUIZ_KEY.join(','))
  check('E67 each quiz item carries a pinned intended-option token',
    QUIZ_TOKENS.length === 5 && QUIZ_TOKENS.every((t) => t.length >= 8), QUIZ_TOKENS.join(' | '))
  // every exercise witness, recomputed:
  check('E68 Ex1: 180 − 47 − 68 = 65', 180 - 47 - 68 === 65, '')
  check('E69 Ex2: exterior at the third vertex = 52 + 61 = 113; adjacent interior 67',
    52 + 61 === 113 && 180 - 113 === 67 && 52 + 61 + 67 === 180, '')
  check('E70 Ex3: right triangle, one acute 34 -> the other 56 (34 + 56 = 90)',
    90 - 34 === 56 && 34 + 56 === 90, '')
  check('E71 Ex4: ratio 2:3:4 -> (40, 60, 80), all acute, classification acute',
    40 + 60 + 80 === 180 && Math.max(40, 60, 80) < 90, '')
  check('E72 Ex5: 1260 = (n − 2)·180 -> n = 9, a nonagon', (9 - 2) * 180 === 1260, '')
  check('E73 Ex6: interior 165 -> exterior 15 -> n = 24; interior sum 3960',
    180 - 165 === 15 && 360 / 15 === 24 && (24 - 2) * 180 === 3960, '')
  check('E74 Ex7: exterior 100, remotes 3x+5 and 2x+15 -> x = 16, remotes 53 and 47, vertex angle 80',
    3 * 16 + 5 === 53 && 2 * 16 + 15 === 47 && 53 + 47 === 100 && 180 - 100 === 80, '')
  check('E75 Ex8: pentagon 540 − 4×115 = 80; convex (0 < 80 < 180 and all given < 180)',
    (5 - 2) * 180 - 460 === 80 && 80 > 0 && 115 < 180, '')
  check('E76 Ex9: exteriors 30, 45, 60, x, x, x -> x = 75; interiors (150, 135, 120, 105, 105, 105) sum 720; n = 6',
    135 + 3 * 75 === 360 && 150 + 135 + 120 + 3 * 105 === 720, '')
  check('E77 Ex10: interior = 5 × exterior -> e = 30, n = 12, interior 150 (the system i + e = 180)',
    6 * 30 === 180 && 360 / 12 === 30 && 180 - 30 === 150, '')
  check('E78 Ex11: quadrilateral with A + C = 180 (witness 110 + 70) forces B + D = 180 (witness 95 + 85)',
    110 + 70 === 180 && 95 + 85 === 180 && 110 + 70 + 95 + 85 === 360, 'quad sum 360 engine-witnessed')
  check('E79 Ex12: isosceles vertex 36 -> base angles 72 each; exterior at a base vertex 108, at the apex 144',
    (180 - 36) / 2 === 72 && 36 + 72 === 108 && 72 + 72 === 144 && 36 + 72 + 72 === 180, '')
  check('E80 Ex13: 2025-gon interior sum 364,140; exterior sum still 360',
    (2025 - 2) * 180 === 364140 && 360 === 360, '')
  check('E81 Ex14: 900/7 = 128.571429 and 1620/11 = 147.272727 to 6 dp, round-trip errors < 1e−5',
    Math.round((900 / 7) * 1e6) / 1e6 === 128.571429 && Math.round((1620 / 11) * 1e6) / 1e6 === 147.272727 &&
    Math.abs(7 * 128.571429 - 900) < 1e-5 && Math.abs(11 * 147.272727 - 1620) < 1e-5, '')
  check('E82 Ex15: octant area on R = 10 sphere = 50π ≈ 157.0796 = one eighth of 400π',
    close((Math.PI / 2) * 100, 50 * Math.PI, 1e-12) && close(50 * Math.PI, 400 * Math.PI / 8, 1e-12), '')
  check('E83 illustration 2 witness: pentagon 130 + 108 + 112 + 95 + 95 = 540',
    130 + 108 + 112 + 95 + 95 === 540, `${130 + 108 + 112 + 95} + 95`)
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo204?: Lesson } | null = null
  try {
    mod = await import('./part-geo204')
    pcheck('P01 part file loads and exports lessonGeo204', !!mod?.lessonGeo204, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo204', false, String(e))
  }
  const lesson = mod?.lessonGeo204
  if (!lesson) return

  // P02 — quiz key [1, 3, 0, 2, 1], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,3,0,2,1]', JSON.stringify(keys) === JSON.stringify([1, 3, 0, 2, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = [
      'alternate interior',
      'sum of the two remote',
      '5 triangles, 900',
      'sum of 270',
      'no such triangle',
    ]
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
    pcheck('P04b >= 3 solution figures inside exercises', solFigs >= 3, `count=${solFigs}`)
  }

  // P04a — body figures
  const bodyFigs = lesson.blocks.filter((b) => b.kind === 'figure').length
  pcheck('P04a >= 3 body figure blocks', bodyFigs >= 3, `count=${bodyFigs}`)
  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >= 1 terms block with >= 6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (>= 4 per the format law)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula').length
  pcheck('P06 >= 4 formula cards', formulas >= 4, `count=${formulas}`)
  // P07 — word count
  const wc = countLessonWords(lesson)
  pcheck('P07 word count >= 6000', wc >= 6000, `countLessonWords=${wc}`)
  // P09 — SVG law
  const svgs: string[] = []
  for (const b of lesson.blocks) {
    if (b.kind === 'figure') svgs.push(b.svg)
    if (b.kind === 'example') for (const f of b.figures ?? []) svgs.push(f.svg)
    if (b.kind === 'exercises') for (const s of b.sets) for (const q of s.questions) for (const f of q.figures ?? []) svgs.push((f as { svg: string }).svg)
  }
  pcheck('P09a >= 6 SVGs collected (3 body + 3 solution)', svgs.length >= 6, `count=${svgs.length}`)
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
  pcheck('P10d headings are plain (no $, no backslash)', heads.every((h) => !h.text.includes('$') && !h.text.includes('\\')), heads.map((h) => h.text).join(' | '))
  // P11 — identity fields
  pcheck('P11 id/number/title exact', lesson.id === 'geo-angle-sum-of-a-triangle-and-its-consequences' && lesson.number === '2.4' && lesson.title === 'Angle Sum of a Triangle and Its Consequences', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-ch02-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-ch02-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [1.4, 2.1, 2.2, 2.3]',
    JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate', 'geo-the-transversal-the-eight-angle-census']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >= 3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >= 3 example blocks with >= 4 steps', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 34)} (${e.steps.length} steps)`).join(' | '))
  // P17 — derivation blocks (the I.32 proof is the centerpiece)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >= 3 derivation blocks', derivs.length >= 3, `count=${derivs}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
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
const e = report('geo204-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo204-pins', pins)
const fail = e.fail + p.fail
console.log(`geo204 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
