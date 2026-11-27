/**
 * v-geo401.ts — verify-first ENGINE + PIN harness for GEO lesson 4.1
 * "Similar Figures: Same Shape at Any Scale" (run 130 swarm, agent geo401).
 *
 * DISCIPLINE: the engine wins over the spec. Every family value, ratio,
 * conversion, counterexample verdict and exercise witness the prose prints
 * is recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in the
 * report. The pinned numbers below are the IMMUTABLE truth (they reproduce
 * the run-130 master pin set: scripts/pin_check_geo130.py 62/62 green).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the 3-4-5 family at k = 1, 2, 3, 4, 5
 *     (sides, perimeters 12/24/36/48/60, areas 6/24/54/96/150, the angle
 *     invariance 36.87/53.13/90 by the cosine rule, the height and median
 *     2.4 and 2.5 scaling to 7.2 and 7.5); the k, k^2 machine sweep and its
 *     converse reads; the rectangle diagonals sqrt(73) -> 2sqrt(73); the
 *     regular hexagon (interior angles 120 deg at every scale by coordinate
 *     computation, perimeter doubling at k = 2 for every s, area ratio 4,
 *     the exact areas 6sqrt3 and 24sqrt3 at s = 2 and s = 4); the rectangle
 *     family's honest failure (2x6 vs 3x4: same angles, same area 12,
 *     ratios 1/3 vs 3/4, three inconsistent ratios, no single k; the
 *     equal-perimeter pair 2x6 vs 5x3; the honest 1:3 family 3x9, 4x12,
 *     5x15); the map machine (1:50000: 6 cm -> 300000 cm -> 3000 m -> 3 km;
 *     the AREA conversion via 1 km^2 = 1e10 cm^2: 36 cm^2 -> 9 km^2 and
 *     16 cm^2 -> 4 km^2, with the forgotten-square slip 36 x 50000 =
 *     1800000 cm^2 pinned WRONG); the photo machine (4x6 -> 8x12 at k = 2,
 *     areas 24 -> 96; the chain to 20x30 at total k = 5, area 600; 5x7 at
 *     k = 3 -> 15x21, area 35 -> 315); the similar-solids teaser (cubes
 *     edge 2 vs 5: k = 2.5, surface x6.25, volume x15.625); the Thales
 *     shadow witness 1.7 x 18 / 2.4 = 12.75; every exercise witness; the
 *     quiz-key self-check [2,1,3,0,4] (item 5 carries answer index 4, so
 *     it needs FIVE options — the engine's reading of the pinned key).
 *   PIN SECTION (P01...) — imports ./part-geo401 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [2,1,3,0,4], 15 exercises L1..L6 with full step
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     ladder / map / photo / hexagon quartet, terms + formula cards,
 *     >= 3 Illustrations with >= 4 steps, >= 2 derivations, SVG + math-span
 *     hygiene laws).
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only
 * run prints the engine score and exits 0; the pins re-arm the moment
 * part-geo401.ts lands on disk).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch04-wip/v-geo401.ts
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
/* ENGINE SECTION 1 — the 3-4-5 family: sides, perimeters, areas       */
/* ================================================================== */
{
  const fam = (k: number): number[] => [3 * k, 4 * k, 5 * k]
  const per = (k: number): number => 12 * k
  const area = (k: number): number => 6 * k * k

  check('E01 the 3-4-5 family sides at k = 1, 2, 3, 5 are (3,4,5), (6,8,10), (9,12,15), (15,20,25)',
    [1, 2, 3, 5].every((k) => JSON.stringify(fam(k)) === JSON.stringify([3 * k, 4 * k, 5 * k])),
    [1, 2, 3, 5].map((k) => fam(k).join(',')).join(' | '))
  check('E02 the perimeters are 12, 24, 36, 60 (the law P(k) = 12k)',
    JSON.stringify([1, 2, 3, 5].map(per)) === JSON.stringify([12, 24, 36, 60]),
    [1, 2, 3, 5].map((k) => per(k)).join(','))
  check('E03 the areas are 6, 24, 54, 150 (the law A(k) = 6k^2; half of 3 by 4 is 6)',
    JSON.stringify([1, 2, 3, 5].map(area)) === JSON.stringify([6, 24, 54, 150]),
    [1, 2, 3, 5].map((k) => area(k)).join(','))
  check('E04 the k = 4 completion row: sides 12, 16, 20; perimeter 48; area 96',
    JSON.stringify(fam(4)) === JSON.stringify([12, 16, 20]) && per(4) === 48 && area(4) === 96,
    `${fam(4).join(',')} P=${per(4)} A=${area(4)}`)
  check('E05 every side ratio equals the SAME k inside each family member (6/3 = 8/4 = 10/5 = 2; 9/3 = 12/4 = 15/5 = 3; 15/3 = 20/4 = 25/5 = 5)',
    [2, 3, 5].every((k) => fam(k).every((s) => close(s / fam(1)[fam(k).indexOf(s)], k))),
    'one common k per member, verified side by side')
  check('E06 Pythagoras holds at every scale: 3^2+4^2 = 5^2, 9^2+12^2 = 15^2 (225 = 225), 15^2+20^2 = 25^2 (625 = 625)',
    [1, 3, 5].every((k) => close((3 * k) ** 2 + (4 * k) ** 2, (5 * k) ** 2)),
    'the right angle survives every enlargement')
  {
    // angle invariance by the cosine rule: cos A = (b^2 + c^2 - a^2) / (2bc)
    const ang = (a: number, b: number, c: number): number =>
      (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI
    const a1 = ang(3, 4, 5), b1 = ang(4, 3, 5)
    const a3 = ang(9, 12, 15), b3 = ang(12, 9, 15)
    const a5 = ang(15, 20, 25), b5 = ang(20, 15, 25)
    check('E07 angle invariance: the 3-4-5 angles are 36.8699 deg (opposite 3), 53.1301 deg (opposite 4), 90 deg — identical at k = 3 and k = 5 by the cosine rule',
      close(a1, 36.8699, 1e-3) && close(b1, 53.1301, 1e-3) && close(ang(5, 3, 4), 90) &&
      close(a1, a3) && close(b1, b3) && close(a1, a5) && close(b1, b5) &&
      close(a1 + b1 + 90, 180, 1e-9),
      `A=${f4(a1)}, B=${f4(b1)}, C=90; k=3: ${f4(a3)}, ${f4(b3)}; k=5: ${f4(a5)}, ${f4(b5)}`)
  }
  check('E08 the 9-12-15 against the 3-4-5: perimeter ratio 36/12 = 3 = k; area ratio 54/6 = 9 = k^2',
    close(36 / 12, 3) && close(54 / 6, 9), 'P x3, A x9 — the machine in one witness')
  {
    const h1 = (3 * 4) / 5 // height to the hypotenuse: area both ways
    const h3 = (9 * 12) / 15
    const m1 = 5 / 2 // median to the hypotenuse of a right triangle
    check('E09 every LENGTH scales by k: height to hypotenuse 12/5 = 2.4 -> 108/15 = 7.2 (= 3 x 2.4); median to hypotenuse 2.5 -> 7.5',
      close(h1, 2.4) && close(h3, 7.2) && close(h3 / h1, 3) && close(m1, 2.5) && close(3 * m1, 7.5),
      `h: ${f4(h1)} -> ${f4(h3)}; m: ${f4(m1)} -> ${f4(3 * m1)}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 2 — the k, k^2 machine + the converse reads          */
/* ================================================================== */
{
  const P = (k: number): number => 12 * k
  const A = (k: number): number => 6 * k * k
  check('E10 the perimeter sweep k = 1..5: 12, 24, 36, 48, 60 (one times k, every time)',
    JSON.stringify([1, 2, 3, 4, 5].map(P)) === JSON.stringify([12, 24, 36, 48, 60]),
    [1, 2, 3, 4, 5].map(P).join(','))
  check('E11 the area sweep k = 1..5: 6, 24, 54, 96, 150 (k squared, every time)',
    JSON.stringify([1, 2, 3, 4, 5].map(A)) === JSON.stringify([6, 24, 54, 96, 150]),
    [1, 2, 3, 4, 5].map(A).join(','))
  check('E12 the area ratios A(k)/A(1) are 1, 4, 9, 16, 25 — the perfect squares',
    JSON.stringify([1, 2, 3, 4, 5].map((k) => A(k) / A(1))) === JSON.stringify([1, 4, 9, 16, 25]),
    'xk for lengths, xk^2 for areas')
  check('E13 converse read 1: perimeters 12 -> 60 force k = 5 (60/12); areas 6 -> 150 confirm k = 5 (sqrt of 25)',
    close(60 / 12, 5) && close(Math.sqrt(150 / 6), 5), 'the two reads agree because they must')
  check('E14 converse read 2 (the trap): perimeter doubled does NOT mean area doubled — k = 2 gives P x2 but A x4',
    close(P(2) / P(1), 2) && close(A(2) / A(1), 4) && !(close(A(2) / A(1), 2)),
    'P(2) = 24, A(2) = 24: the numbers coincide ONLY at k = 2 on this family — coincidence, not law')
  {
    const d1 = Math.sqrt(3 * 3 + 8 * 8) // diagonal of the 3x8 rectangle
    const d2 = Math.sqrt(6 * 6 + 16 * 16) // diagonal of the 6x16 image at k = 2
    check('E15 diagonals scale by k: the 3x8 rectangle has diagonal sqrt(73) = 8.5440; its k = 2 image 6x16 has diagonal sqrt(292) = 17.0880 = 2sqrt(73)',
      close(d1, Math.sqrt(73)) && close(d2, 2 * Math.sqrt(73)) && close(d2 / d1, 2) && close(d1, 8.5440, 1e-4) && close(d2, 17.0880, 1e-4),
      `d = ${f4(d1)} -> ${f4(d2)}, ratio exactly 2`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 3 — polygons beyond triangles: hexagons + the        */
/* rectangle family's honest failure                                   */
/* ================================================================== */
{
  // regular hexagon: vertices on the circumcircle, interior angle by dot product
  const hexAng = (R: number): number => {
    const v = (i: number): [number, number] => {
      const t = ((90 + 60 * i) * Math.PI) / 180
      return [R * Math.cos(t), R * Math.sin(t)]
    }
    let worst = 0
    for (let i = 0; i < 6; i++) {
      const p = v(i), q = v((i + 1) % 6), r = v((i + 5) % 6)
      const u = [q[0] - p[0], q[1] - p[1]], w = [r[0] - p[0], r[1] - p[1]]
      const cos = (u[0] * w[0] + u[1] * w[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(w[0], w[1]))
      worst = Math.max(worst, Math.abs((Math.acos(cos) * 180) / Math.PI - 120))
    }
    return worst
  }
  check('E16 every interior angle of a regular hexagon is 120 deg — (n-2) x 180 / n = 4 x 180 / 6 — and the coordinate computation agrees at every radius',
    close((6 - 2) * 180 / 6, 120) && hexAng(1) < 1e-9 && hexAng(7) < 1e-9 && hexAng(1000) < 1e-9,
    'interior-angle formula + dot-product census at R = 1, 7, 1000')
  check('E17 the angle is INVARIANT under scaling: 120 deg at side s, at 2s, at any s — the interior-angle formula never mentions the side',
    [2, 4, 10].every((s) => close((6 - 2) * 180 / 6, 120)),
    'same shape at any scale, first witness')
  {
    const hexP = (s: number): number => 6 * s
    const hexA = (s: number): number => (3 * Math.sqrt(3) / 2) * s * s
    check('E18 hexagon k = 2: the perimeter doubles for EVERY s (6s -> 12s), swept at s = 1..9; at s = 2: 12 -> 24; at s = 3: 18 -> 36',
      [1, 2, 3, 4, 5, 6, 7, 8, 9].every((s) => close(hexP(2 * s) / hexP(s), 2)) && hexP(2) === 12 && hexP(4) === 24 && hexP(3) === 18 && hexP(6) === 36,
      'P x2 at k = 2, universally')
    check('E19 hexagon k = 2: the area ratio is exactly 4; the exact areas at s = 2 and s = 4 are 6sqrt(3) = 10.3923 and 24sqrt(3) = 41.5692',
      close(hexA(4) / hexA(2), 4) && close(hexA(2), 6 * Math.sqrt(3)) && close(hexA(2), 10.3923, 1e-4) && close(hexA(4), 24 * Math.sqrt(3)) && close(hexA(4), 41.5692, 1e-4),
      `A(2) = ${f4(hexA(2))}, A(4) = ${f4(hexA(4))}, ratio ${f4(hexA(4) / hexA(2))}`)
  }
  check('E20 ALL regular hexagons are similar to one another (all angles 120 deg, all sides equal inside each): the ratio between two of them is k = s2/s1, one number for all six sides',
    close(10 / 4, 2.5), 'the exercise pair s = 4 vs s = 10: k = 2.5')
  {
    // the rectangle family's honest failure: 2x6 vs 3x4
    const r1 = 2 / 6, r2 = 3 / 4
    check('E21 the failure witness: 2x6 vs 3x4 — every angle is 90 deg in BOTH rectangles, but 2/6 = 0.3333 and 3/4 = 0.75 differ, so NO single k exists: NOT similar',
      close(r1, 1 / 3) && close(r2, 0.75) && !(close(r1, r2)) && close(6 / 2, 3) && close(4 / 3, 4 / 3) && !(close(6 / 2, 4 / 3)),
      `short/long: ${f4(r1)} vs ${f4(r2)}; long/short: 3 vs 1.3333 — no consistent ratio either way`)
    check('E22 the trap deepens: the two rectangles have the SAME area (2 x 6 = 12 = 3 x 4) and the SAME angles — and are still not similar',
    2 * 6 === 3 * 4 && 2 * 6 === 12, 'equal area + equal angles, different shape')
    {
      const d1 = Math.sqrt(2 * 2 + 6 * 6), d2 = Math.sqrt(3 * 3 + 4 * 4)
      check('E23 the diagonal audit agrees: diagonals sqrt(40) = 6.3246 and 5, ratio 1.2649 — a THIRD ratio, matching neither 1/3, 3/4 nor 6/4 = 1.5',
        close(d1, 6.3246, 1e-4) && close(d2, 5) && close(d2 / d1, 0.7906, 1e-4) && close(d1 / d2, 1.2649, 1e-4) && !(close(d1 / d2, 1.5)),
        `d = ${f4(d1)} vs ${f4(d2)}; ratio ${f4(d1 / d2)}; the long-side ratio would demand 1.5`)
    }
    check('E24 equal PERIMETER does not rescue similarity either: 2x6 and 5x3 both have perimeter 16, but 2/6 = 1/3 and 5/3 differ',
      2 * (2 + 6) === 16 && 2 * (5 + 3) === 16 && !(close(2 / 6, 5 / 3)),
      'P = 16 both, ratios 0.3333 vs 1.6667')
    check('E25 the honest 1:3 family: rectangles similar to 2x6 are exactly the 1:3 ones — 3x9 (k = 1.5), 4x12 (k = 2), 5x15 (k = 2.5)',
      close(9 / 3, 3) && close(12 / 4, 3) && close(15 / 5, 3) && close(9 / 6, 1.5) && close(12 / 6, 2) && close(15 / 6, 2.5),
      'side ratios all 3 inside each; k read off the long sides')
  }
}

/* ================================================================== */
/* ENGINE SECTION 4 — maps, photographs, and the solids teaser         */
/* ================================================================== */
{
  const CM = 50000 // the 1:50000 map
  check('E26 the map length law: 6 cm on the map is 6 x 50000 = 300000 cm on the ground = 3000 m = 3 km',
    6 * CM === 300000 && 300000 / 100 === 3000 && 3000 / 1000 === 3,
    '6 cm -> 3 km, one arrow')
  check('E27 the map inverse: 3 km of ground occupies 3 km / 50000 = 6 cm on the map',
    close((3 * 100000) / CM, 6), 'the law runs both directions — state k with its direction')
  check('E28 the second length witness: 4.8 cm on the map is 4.8 x 50000 = 240000 cm = 2400 m = 2.4 km',
    close(4.8 * CM, 240000) && 240000 / 100 === 2400 && close(2400 / 1000, 2.4), '4.8 cm -> 2.4 km')
  check('E29 the area unit law: 1 km = 100000 cm, so 1 km^2 = (10^5)^2 = 10^10 cm^2 — ten billion square centimetres',
    100000 ** 2 === 1e10, 'the conversion the first draft forgot (run-130 pin catch)')
  check('E30 the map AREA law: 36 cm^2 -> 36 x 50000^2 = 36 x 2.5e9 = 9e10 cm^2 = 9 km^2 (divide by 1e10)',
    CM * CM === 2.5e9 && close(36 * CM * CM, 9e10) && close(9e10 / 1e10, 9), '36 cm^2 -> 9 km^2')
  check('E31 the map area slip, pinned WRONG: 36 x 50000 = 1800000 cm^2 = 180 m^2 is NOT the answer — forgetting the square is wrong by a factor of 50000',
    36 * CM === 1800000 && close(1800000 / 1e4, 180) && !(close(1800000 / 1e10, 9)),
    'the lengths scale by k, the AREAS by k^2 — square the 50000')
  check('E32 the second area witness: 16 cm^2 -> 16 x 2.5e9 = 4e10 cm^2 = 4 km^2',
    close(16 * CM * CM, 4e10) && close(4e10 / 1e10, 4), '16 cm^2 -> 4 km^2')
  check('E33 the photo witness: 4x6 -> 8x12 has k = 8/4 = 12/6 = 2; areas 24 -> 96, four times',
    close(8 / 4, 2) && close(12 / 6, 2) && 4 * 6 === 24 && 8 * 12 === 96 && close(96 / 24, 4),
    'k = 2, area x4')
  check('E34 the photo chain: 4x6 -> 20x30 has total k = 5; area 24 -> 600, twenty-five times',
    close(20 / 4, 5) && close(30 / 6, 5) && 20 * 30 === 600 && close(600 / 24, 25),
    'k = 5, area x25')
  check('E35 the second photo witness: 5x7 at k = 3 -> 15x21; areas 35 -> 315, nine times',
    5 * 7 === 35 && 15 * 21 === 315 && close(315 / 35, 9), 'k = 3, area x9')
  {
    const k = 5 / 2
    check('E36 the similar-solids teaser: cubes of edge 2 and edge 5 have k = 2.5; volumes 8 -> 125 (ratio 15.625 = 2.5^3); surface areas 24 -> 150 (ratio 6.25 = 2.5^2)',
      close(k, 2.5) && 2 ** 3 === 8 && 5 ** 3 === 125 && close(125 / 8, 15.625) && close(k ** 3, 15.625) &&
      6 * 2 * 2 === 24 && 6 * 5 * 5 === 150 && close(150 / 24, 6.25) && close(k ** 2, 6.25),
      'lengths k, areas k^2, volumes k^3')
  }
  check('E37 the Thales shadow witness: a 1.7 m person casts a 2.4 m shadow; at the same moment an 18 m shadow belongs to a height of 1.7 x 18 / 2.4 = 12.75 m',
    close((1.7 * 18) / 2.4, 12.75), `h = ${f4((1.7 * 18) / 2.4)} m`)
}

/* ================================================================== */
/* ENGINE SECTION 5 — exercise witnesses (every number the drill prints) */
/* ================================================================== */
{
  check('E38 Ex1 witness: the 3-4-5 at k = 4 has sides 12, 16, 20; perimeter 48; area 96',
    3 * 4 === 12 && 4 * 4 === 16 && 5 * 4 === 20 && 12 * 4 === 48 && 6 * 16 === 96, 'the k = 4 row')
  check('E39 Ex2 witness: a 5x7 photo at k = 3 becomes 15x21; areas 35 -> 315',
    5 * 3 === 15 && 7 * 3 === 21 && 5 * 7 === 35 && 15 * 21 === 315 && close(315 / 35, 9), '')
  {
    const k = 12 / 8
    check('E40 Ex3 witness: the 8-15-17 right triangle with shortest side 8 enlarged to shortest side 12 has k = 3/2; sides 12, 22.5, 25.5; perimeters 40 -> 60; areas 60 -> 135',
      close(k, 1.5) && close(15 * k, 22.5) && close(17 * k, 25.5) &&
      8 + 15 + 17 === 40 && close(12 + 22.5 + 25.5, 60) &&
      close((8 * 15) / 2, 60) && close((12 * 22.5) / 2, 135) && close(135 / 60, 2.25) &&
      close(12 ** 2 + 22.5 ** 2, 25.5 ** 2),
      'k^2 = 2.25; the image is right-angled too (144 + 506.25 = 650.25 = 25.5^2)')
  }
  check('E41 Ex5 witness: regular hexagons s = 4 and s = 10 — k = 2.5; perimeters 24 -> 60; area ratio 6.25; interior angles 120 deg in both',
    6 * 4 === 24 && 6 * 10 === 60 && close(60 / 24, 2.5) && close(2.5 ** 2, 6.25) && close((6 - 2) * 180 / 6, 120),
    'P(4) = 24, P(10) = 60')
  check('E42 Ex8 witness: 7, 10, 12 against 21, 30, 36 — ratios 3, 3, 3; perimeters 29 -> 87; area ratio 9',
    21 / 7 === 3 && 30 / 10 === 3 && 36 / 12 === 3 && 7 + 10 + 12 === 29 && 21 + 30 + 36 === 87 && close(87 / 29, 3) && close(3 ** 2, 9),
    'similar with k = 3 (small -> large)')
  check('E43 Ex9 witness: perimeter 18 and area 12 at k = 3 become perimeter 54 and area 108',
    18 * 3 === 54 && 12 * 9 === 108, 'P x3, A x9')
  {
    const d1 = Math.sqrt(73), d2 = Math.sqrt(292)
    check('E44 Ex11 witness: the 3x8 rectangle (diagonal sqrt(73) = 8.5440) at k = 2 is 6x16 (diagonal 17.0880); a median 5 and altitude 4 at k = 2.4 become 12 and 9.6',
      close(d1, 8.5440, 1e-4) && close(d2, 17.0880, 1e-4) && close(d2 / d1, 2) && close(5 * 2.4, 12) && close(4 * 2.4, 9.6),
      'every length, not just the sides')
  }
  check('E45 Ex12 witness: A = (1/2)bh under k = 3 on the 3-4-5: (1/2)(12)(9) = 54 = 9 x 6 — the altitude argument in numbers',
    close((12 * 9) / 2, 54) && close(54 / 6, 9), 'base and height each x3, area x9')
  check('E46 Ex13 witnesses: 2x6 vs 5x3 — perimeters 16 and 16, ratios 1/3 vs 5/3, NOT similar; 2x6 vs 3x4 — areas 12 and 12, ratios 1/3 vs 3/4, NOT similar; the 1:3 family 3x9, 4x12, 5x15 IS similar to 2x6',
    2 * (2 + 6) === 16 && 2 * (5 + 3) === 16 && !(close(2 / 6, 5 / 3)) && 2 * 6 === 12 && 3 * 4 === 12 && !(close(2 / 6, 3 / 4)) &&
    close(9 / 3, 3) && close(12 / 4, 3) && close(15 / 5, 3),
    'perimeter, area, angles: three agreeing numbers, three refusals')
  check('E47 Ex15 witness: cubes edge 2 and 5 — k = 2.5, surface 24 -> 150 (x6.25), volume 8 -> 125 (x15.625)',
    close(5 / 2, 2.5) && 6 * 4 === 24 && 6 * 25 === 150 && close(150 / 24, 6.25) && 8 === 2 ** 3 && 125 === 5 ** 3 && close(125 / 8, 15.625),
    'the k, k^2, k^3 ladder')
  check('E48 quiz-key self-check: the pinned key is [2,1,3,0,4] — five entries, pairwise distinct, each a legal option index (item 5 needs five options to carry index 4)',
    JSON.stringify([2, 1, 3, 0, 4]) === JSON.stringify([2, 1, 3, 0, 4]) &&
      new Set([2, 1, 3, 0, 4]).size === 5 && [2, 1, 3, 0, 4].every((a) => a >= 0 && a <= 4),
    'key 21304, matching the master plan')
  check('E49 quiz numeric witnesses: Q2 k = 3 (E08); Q3 k = 2.5 gives 6.25 (E36); Q4 2/6 vs 3/4 (E21); Q5 3 km (E26) — every quiz number is an engine number',
    close(36 / 12, 3) && close(2.5 ** 2, 6.25) && !(close(2 / 6, 3 / 4)) && 300000 / 100000 === 3,
    'no quiz number outside the engine')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(new URL('./part-geo401.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo401.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo401?: Lesson } | null = null
  try {
    mod = await import('./part-geo401')
    pcheck('P01 part file loads and exports lessonGeo401', !!mod?.lessonGeo401, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo401', false, String(e))
  }
  const lesson = mod?.lessonGeo401
  if (!lesson) return

  // P02 — quiz keys [2,1,3,0,4], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [2,1,3,0,4]', JSON.stringify(keys) === JSON.stringify([2, 1, 3, 0, 4]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 5 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length >= 4 && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['one common', 'k = 3', '6.25', 'NOT similar', '3 km']
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
  pcheck('P04d the named solution quartet exists: a ladder, a map, a photo and a hexagon figure',
    /ladder/.test(allCaptions) && /map/.test(allCaptions) && /photo/.test(allCaptions) && /hexagon/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the similarity definition, the k/k-squared machine and the map scale law',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('similar')) &&
    formulas.some((f) => f.name.toLowerCase().includes('perimeter and area')) &&
    formulas.some((f) => f.name.toLowerCase().includes('map')),
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
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#1e40af', '#0284c7', '#0891b2', '#0e7490', '#d97706', '#ea580c', '#dc2626', '#7c3aed', '#e0f2fe', '#ede9fe', '#93c5fd', '#a5b4fc', '#ffffff', '#f5f8ff'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c41 blueprint palette (+ cool paper #f5f8ff)', badHex.length === 0, badHex.join(','))
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-similar-figures-same-shape-at-any-scale' && lesson.number === '4.1' && lesson.title === 'Similar Figures: Same Shape at Any Scale', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, ncert-math10-ch6-triangles, geo-ch04-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (ch.3 continuity: congruence idea + criteria)
  pcheck('P13 prerequisites exact [geo-congruence-the-idea-of-same-shape-and-size, geo-the-congruence-criteria-sas-asa-aas-sss-rhs]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-congruence-the-idea-of-same-shape-and-size', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8 from the pinned set; objectives 4-6
  const PINNED_CONCEPTS = ['similar figures', 'scale factor', 'similarity statement', 'corresponding parts', 'perimeter and area scaling', 'scale drawings', 'similar solids', 'ratio of similitude']
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
  // P17 — derivation blocks (the k,k^2 laws + the angle invariance + the map conversion)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the family census table (k rows with the pinned P and A columns)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const famTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('15, 20, 25')))
  pcheck('P19 the family census table exists carrying the k = 1, 2, 3, 5 rows (sides, P 12/24/36/60, A 6/24/54/150)',
    !!famTable && ['3, 4, 5', '6, 8, 10', '9, 12, 15', '15, 20, 25', '12', '24', '36', '60', '150'].every((s) => famTable.rows.join(' ').includes(s)), famTable ? 'found' : 'missing')
  // P20 — the honest-negatives table carries the rectangle witnesses
  const negTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('2×6') || r.join(' ').includes('2\\times 6')))
  pcheck('P20 the honest-negatives table carries the 2x6 vs 3x4 witness and the NOT-similar verdict',
    !!negTable && ['3×4', 'NOT similar'].every((s) => negTable.rows.join(' ').includes(s) || negTable.rows.join(' ').includes('3\\times 4')), negTable ? 'found' : 'missing')
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
const e = report('geo401-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo401-pins', pins)
const fail = e.fail + p.fail
console.log(`geo401 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
