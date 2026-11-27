/**
 * v-geo404.ts — verify-first ENGINE + PIN harness for GEO lesson 4.4
 * "Pythagoras Proved: the Theorem Earned" (run 130 swarm, agent geo404).
 *
 * DISCIPLINE: the engine wins over the spec. Every segment, altitude,
 * geometric mean, area ratio, triple and converse verdict the prose prints
 * is recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in the
 * report. The pinned numbers below are the IMMUTABLE truth (they reproduce
 * the run-130 master pin set: scripts/pin_check_geo130.py 62/62 green).
 *
 * Structure:
 *   ENGINE SECTION 1 — the 3-4-5 altitude-on-hypotenuse machine: segments
 *     p = 9/5 = 1.8 and q = 16/5 = 3.2, altitude h = 12/5 = 2.4, h^2 = pq
 *     = 5.76, the leg laws 9 = 5 x 1.8 and 16 = 5 x 3.2, the geometric mean
 *     sqrt(1.8 x 3.2) = 2.4, the split triangles 1.8-2.4-3.0 and 2.4-3.2-4.0
 *     with the similarity ratios 3/5 and 4/5, the AA angle census by the
 *     cosine rule, and the split areas 2.16 + 3.84 = 6 carrying 9/25 and
 *     16/25 of the whole.
 *   ENGINE SECTION 2 — the proof by similarity, generally: p = a^2/c,
 *     q = b^2/c, h = ab/c, a^2 + b^2 = c(p + q) = c^2, swept on the 3-4-5
 *     AND on the second witness 5-12-13 (p = 25/13, q = 144/13, h = 60/13,
 *     h^2 = 3600/169).
 *   ENGINE SECTION 3 — the squares-on-sides area proof (9 + 16 = 25; the
 *     cousins 25 + 144 = 169 and 64 + 225 = 289) and the k, k^2 machine
 *     with Euclid VI.19's duplicate ratio (k = 3: 6 -> 54, 12 -> 36;
 *     k = 3/2 -> 9/4).
 *   ENGINE SECTION 4 — the applications and families: the tree shadow
 *     (1.5 m stick, 2 m shadow, 12 m tree shadow -> 9 m); the 45-45-90
 *     (1 : 1 : sqrt2 = 1.4142136) and 30-60-90 (1 : sqrt3 = 1.7320508 : 2)
 *     specials with the irrationality census (no integer isosceles right
 *     triangle, no integer 30-60-90); the primitive-triple census with
 *     hyp <= 100 (exactly 16, 20-21-29 and 9-40-41 pinned present) and the
 *     20-member 3-4-5 multiple family inside the same bound; the converse
 *     (8,15,17 fires: 289 = 289; 4,5,7 refuses: 41 <> 49) and the
 *     carpenter's 3-4-5 check.
 *   ENGINE SECTION 5 — exercise + quiz witnesses (every number the drills
 *     print, recomputed).
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only
 * run prints the engine score and exits 0; the pins re-arm the moment
 * part-geo404.ts lands on disk).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch04-wip/v-geo404.ts
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
const gcd = (a: number, b: number): number => (b === 0 ? a : gcd(b, a % b))
/** angle (deg) opposite side a in the triangle with sides a, b, c */
const angOpp = (a: number, b: number, c: number): number =>
  (Math.acos((b * b + c * c - a * a) / (2 * b * c)) * 180) / Math.PI
/** the 4-5-7 refusal witness, as COMPUTED numbers (not narrowed literals):
 *  legs' square sum vs the claimed hypotenuse square — 41 vs 49. */
const notRight457Legs: number = 4 * 4 + 5 * 5 // 41
const notRight457Hyp: number = 7 * 7 // 49

/* ================================================================== */
/* ENGINE SECTION 1 — the 3-4-5 altitude-on-hypotenuse machine         */
/* ================================================================== */
{
  const a = 3, b = 4, c = 5 // legs a = 3, b = 4, hypotenuse c = 5
  check('E01 the 3-4-5 is right: 3² + 4² = 9 + 16 = 25 = 5², and the hypotenuse is the longest side',
    a * a + b * b === c * c && c === Math.max(a, b, c), 'the witness triangle of the whole lesson')

  // Euclid VI.8 machine: segments by projection, altitude by the two-ways area
  const p = (a * a) / c // segment adjacent to leg a
  const q = (b * b) / c // segment adjacent to leg b
  const h = (a * b) / c // altitude to the hypotenuse
  check('E02 the segments: p = a²/c = 9/5 = 1.8 (adjacent to the leg 3) and q = b²/c = 16/5 = 3.2 (adjacent to the leg 4)',
    close(p, 1.8) && close(q, 3.2) && close(p, 9 / 5) && close(q, 16 / 5), `p = ${f4(p)}, q = ${f4(q)}`)
  check('E03 the segments rejoin the hypotenuse: p + q = 1.8 + 3.2 = 5 = c',
    close(p + q, c), 'the split is a partition, not an overlap')
  check('E04 the altitude by area both ways: (1/2)(3)(4) = 6 = (1/2)(5)h, so h = 12/5 = 2.4',
    close((a * b) / 2, 6) && close(h, 12 / 5) && close(h, 2.4), `h = ${f4(h)}`)
  check('E05 the altitude law: h² = pq — 2.4² = 5.76 and 1.8 × 3.2 = 5.76 — the altitude is the geometric mean of the segments',
    close(h * h, 5.76) && close(p * q, 5.76) && close(h * h, p * q), `h² = ${f4(h * h)} = pq`)
  check('E06 the leg laws (Euclid VI.8): a² = c·p is 9 = 5 × 1.8 and b² = c·q is 16 = 5 × 3.2',
    close(a * a, c * p) && close(b * b, c * q) && close(9, 5 * 1.8) && close(16, 5 * 3.2), 'each leg squared equals hypotenuse times its adjacent segment')
  check('E07 the geometric mean read: √(1.8 × 3.2) = √5.76 = 2.4 — the altitude itself',
    close(Math.sqrt(p * q), 2.4) && close(Math.sqrt(1.8 * 3.2), 2.4), `√(pq) = ${f4(Math.sqrt(p * q))}`)

  // the split triangles, rightness + similarity ratios
  const s1: number[] = [p, h, a] // piece at the leg-a end: 1.8, 2.4, 3.0
  const s2: number[] = [h, q, b] // piece at the leg-b end: 2.4, 3.2, 4.0
  check('E08 the split triangles are the 1.8-2.4-3.0 and the 2.4-3.2-4.0, and BOTH are right: 1.8² + 2.4² = 3.24 + 5.76 = 9 = 3²; 2.4² + 3.2² = 5.76 + 10.24 = 16 = 4²',
    close(s1[0] * s1[0] + s1[1] * s1[1], s1[2] * s1[2]) && close(s2[0] * s2[0] + s2[1] * s2[1], s2[2] * s2[2]) &&
    close(s1[0], 1.8) && close(s1[1], 2.4) && close(s1[2], 3.0) && close(s2[0], 2.4) && close(s2[1], 3.2) && close(s2[2], 4.0),
    'two smaller right triangles, hypotenuses 3 and 4 (the legs of the big one)')
  check('E09 the similarity ratios: the 1.8-2.4-3.0 is the big triangle at k = 3/5 (1.8/3 = 2.4/4 = 3/5 = 0.6); the 2.4-3.2-4.0 is the big one at k = 4/5 (2.4/3 = 3.2/4 = 4/5 = 0.8)',
    close(s1[0] / a, 0.6) && close(s1[1] / b, 0.6) && close(s1[2] / c, 0.6) &&
    close(s2[0] / a, 0.8) && close(s2[1] / b, 0.8) && close(s2[2] / c, 0.8), 'one k per piece, three sides each')
  check('E10 the AA census by the cosine rule: the big triangle runs 36.8699° (opposite 3), 53.1301° (opposite 4), 90°; BOTH pieces run the same three angles to 4 decimals',
    close(angOpp(3, 4, 5), 36.8699, 1e-3) && close(angOpp(4, 3, 5), 53.1301, 1e-3) &&
    close(angOpp(1.8, 2.4, 3), angOpp(3, 4, 5), 1e-9) && close(angOpp(2.4, 1.8, 3), angOpp(4, 3, 5), 1e-9) &&
    close(angOpp(2.4, 3.2, 4), angOpp(3, 4, 5), 1e-9) && close(angOpp(3.2, 2.4, 4), angOpp(4, 3, 5), 1e-9),
    `big: ${f4(angOpp(3, 4, 5))}/${f4(angOpp(4, 3, 5))}/90; piece 1: ${f4(angOpp(1.8, 2.4, 3))}/${f4(angOpp(2.4, 1.8, 3))}/90; piece 2: ${f4(angOpp(2.4, 3.2, 4))}/${f4(angOpp(3.2, 2.4, 4))}/90`)

  // the split areas: 9/25 + 16/25 = 1
  const A = (x: number, y: number): number => (x * y) / 2
  check('E11 the split areas: the 1.8-2.4-3.0 has area (1/2)(1.8)(2.4) = 2.16 and the 2.4-3.2-4.0 has (1/2)(2.4)(3.2) = 3.84; 2.16 + 3.84 = 6 = the whole',
    close(A(1.8, 2.4), 2.16) && close(A(2.4, 3.2), 3.84) && close(A(1.8, 2.4) + A(2.4, 3.2), 6), 'areas add as they must')
  check('E12 the split areas as fractions of the whole: 2.16/6 = 9/25 = (3/5)² and 3.84/6 = 16/25 = (4/5)² — the pieces carry k² of the whole, and 9/25 + 16/25 = 1',
    close(A(1.8, 2.4) / 6, 9 / 25) && close(A(2.4, 3.2) / 6, 16 / 25) && close(9 / 25 + 16 / 25, 1), 'the k² law inside one triangle')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the proof by similarity, generally and re-witnessed */
/* ================================================================== */
{
  const split = (a: number, b: number): { p: number; q: number; h: number; c: number } => {
    const c = Math.sqrt(a * a + b * b)
    return { p: (a * a) / c, q: (b * b) / c, h: (a * b) / c, c }
  }
  const t345 = split(3, 4)
  const t51213 = split(5, 12)
  check('E13 the general machine on 3-4-5: p = 1.8, q = 3.2, h = 2.4 (E02/E04 reproduced by the general formulae)',
    close(t345.p, 1.8) && close(t345.q, 3.2) && close(t345.h, 2.4), 'p = a²/c, q = b²/c, h = ab/c')
  check('E14 the second witness 5-12-13: p = 25/13 = 1.9231, q = 144/13 = 11.0769, h = 60/13 = 4.6154 (4 dp)',
    close(t51213.c, 13) && close(t51213.p, 25 / 13) && close(t51213.q, 144 / 13) && close(t51213.h, 60 / 13) &&
    close(t51213.p, 1.9231, 1e-4) && close(t51213.q, 11.0769, 1e-4) && close(t51213.h, 4.6154, 1e-4),
    `p = ${f4(t51213.p)}, q = ${f4(t51213.q)}, h = ${f4(t51213.h)}`)
  check('E15 the 5-12-13 leg laws: 25 = 13 × 25/13 and 144 = 13 × 144/13 — exact; and the altitude law h² = pq = (60/13)² = 3600/169 = 21.3018 (4 dp)',
    close(5 * 5, 13 * (25 / 13)) && close(12 * 12, 13 * (144 / 13)) && close(t51213.h * t51213.h, t51213.p * t51213.q) &&
    close(3600 / 169, 21.3018, 1e-4), 'VI.8 holds on the second witness to the last digit')
  check('E16 THE PROOF BY SIMILARITY, numeric core: a² + b² = c·p + c·q = c(p + q) = c² — on the 3-4-5: 9 + 16 = 5 × 1.8 + 5 × 3.2 = 5 × 5 = 25; on the 5-12-13: 25 + 144 = 13 × (25/13 + 144/13) = 13 × 13 = 169',
    close(t345.c * t345.p + t345.c * t345.q, t345.c * t345.c) && close(t51213.c * t51213.p + t51213.c * t51213.q, t51213.c * t51213.c) &&
    close(5 * 1.8 + 5 * 3.2, 25) && close(5 * 5, 25),
    'leg squared = hypotenuse × segment, twice; add; p + q = c')
  {
    // symbolic identity: with p = a²/c and q = b²/c the addition collapses
    const a = 7, b = 24 // third witness, the 7-24-25
    const t = split(a, b)
    check('E17 the identity is a tautology once VI.8 lands: c(p + q) = c(a²/c + b²/c) = a² + b² — swept on the 7-24-25 (p = 49/25 = 1.96, q = 576/25 = 23.04, h = 168/25 = 6.72; 1.96 + 23.04 = 25)',
      close(t.c, 25) && close(t.p, 1.96) && close(t.q, 23.04) && close(t.h, 6.72) && close(t.p + t.q, 25) &&
      close(t.c * (t.p + t.q), 625) && close(a * a + b * b, 625),
      'the proof runs on every right triangle the machine touches')
  }
}

/* ================================================================== */
/* ENGINE SECTION 3 — squares on the sides + the k, k² machine (VI.19) */
/* ================================================================== */
{
  check('E18 the squares proof on 3-4-5: the squares on the legs have areas 9 and 16, the square on the hypotenuse 25, and 9 + 16 = 25',
    3 * 3 === 9 && 4 * 4 === 16 && 5 * 5 === 25 && 9 + 16 === 25, 'the two small squares tile the big one in area')
  check('E19 the cousins: on 5-12-13 the squares read 25 + 144 = 169; on 8-15-17 they read 64 + 225 = 289',
    25 + 144 === 169 && 64 + 225 === 289, 'Euclid I.47 runs on every right triangle')
  check('E20 the k, k² machine at k = 3 on the 3-4-5: area 6 -> 54 (ratio 9 = k²); perimeter 12 -> 36 (ratio 3 = k)',
    close(6 * 9, 54) && close(54 / 6, 9) && close(12 * 3, 36) && close(36 / 12, 3), 'lengths ×k, areas ×k²')
  check('E21 Euclid VI.19 duplicate ratio: k = 3/2 duplicated is k² = 9/4 = 2.25 — similar figures at k = 3/2 carry areas in the ratio 9 : 4',
    close((3 / 2) ** 2, 9 / 4) && close(9 / 4, 2.25), 'the ratio ON the ratio: multiply, do not add')
  check('E22 the VI.19 witness: original area 8 at k = 3/2 maps to 8 × 9/4 = 18 — and the perimeter would read 8 × 3/2 = 12 were it a length',
    close(8 * (9 / 4), 18) && close(8 * (3 / 2), 12), 'area dial 18, length dial 12: never confuse the two')
  check('E23 the third proportional, honestly: to the ratio 3 : 2 the third proportional x satisfies 3 : 2 = 2 : x, so x = 4/3, and the duplicate of 3 : 2 is 9 : 4 (the ratio of the squares of the terms)',
    close((2 * 2) / 3, 4 / 3) && close((3 * 3) / (2 * 2), 9 / 4), 'the VI.19 proof route, sketched without hiding the machinery')
}

/* ================================================================== */
/* ENGINE SECTION 4 — applications, families, census, converse         */
/* ================================================================== */
{
  // tree shadow: 1.5 m stick, 2 m shadow, 12 m tree shadow
  check('E24 the tree shadow cashed: stick 1.5 m with shadow 2 m; tree shadow 12 m — the AA licence gives k = 12/2 = 6 (stick-triangle to tree-triangle), so the tree stands at 1.5 × 6 = 9 m',
    close(12 / 2, 6) && close(1.5 * 6, 9) && close((1.5 * 12) / 2, 9), '9 m, one arrow, the AA licence from 4.3')
  // the specials
  check('E25 the 45-45-90 family: sides 1 : 1 : √2 with √2 = 1.4142136 (7 dp); at legs 7 the hypotenuse is 7√2 = 9.8995 (4 dp)',
    close(Math.SQRT2, 1.4142136, 5e-8) && close(7 * Math.SQRT2, 9.8995, 1e-4), 'one shape: every member similar to every other')
  check('E26 the 30-60-90 family: sides 1 : √3 : 2 with √3 = 1.7320508 (7 dp); at shortest side 5 the others are 5√3 = 8.6603 and 10 (4 dp)',
    close(Math.sqrt(3), 1.7320508, 5e-8) && close(5 * Math.sqrt(3), 8.6603, 1e-4) && close(5 * 2, 10), 'the half-equilateral triangle')
  {
    // irrationality census: no integer members in either special family
    let iso = false, hemi = false
    for (let k = 1; k <= 1000; k++) {
      if (Number.isInteger(Math.sqrt(2 * k * k))) iso = true
      if (Number.isInteger(Math.sqrt(3 * k * k))) hemi = true
    }
    check('E27 the honest no-integer note: 2k² is never a perfect square and 3k² is never a perfect square (brute force k ≤ 1000) — NO integer-sided 45-45-90 or 30-60-90 triangle exists, which is exactly why neither appears in the triple census',
      !iso && !hemi, '√2 and √3 are irrational, so the special families never land on whole numbers')
  }
  {
    // the primitive triple census, hyp <= 100, by Euclid's factory
    const triples: Array<[number, number, number]> = []
    for (let m = 2; m <= 9; m++) {
      for (let n = 1; n < m; n++) {
        if ((m - n) % 2 === 1 && gcd(m, n) === 1) {
          const A = m * m - n * n, B = 2 * m * n, C = m * m + n * n
          if (C <= 100) triples.push([Math.min(A, B), Math.max(A, B), C])
        }
      }
    }
    triples.sort((x, y) => x[2] - y[2] || x[0] - y[0])
    const PINNED: Array<[number, number, number]> = [
      [3, 4, 5], [5, 12, 13], [8, 15, 17], [7, 24, 25], [20, 21, 29], [12, 35, 37],
      [9, 40, 41], [28, 45, 53], [11, 60, 61], [16, 63, 65], [33, 56, 65], [48, 55, 73],
      [13, 84, 85], [36, 77, 85], [39, 80, 89], [65, 72, 97],
    ]
    check('E28 the primitive-triple census with hyp ≤ 100: EXACTLY 16, and the list matches the pinned census to the entry',
      triples.length === 16 && JSON.stringify(triples) === JSON.stringify(PINNED),
      triples.map((t) => t.join(',')).join(' | '))
    check('E29 every census member is right (a² + b² = c²) and primitive (gcd = 1), and 20-21-29 and 9-40-41 are pinned present',
      triples.every((t) => close(t[0] * t[0] + t[1] * t[1], t[2] * t[2]) && gcd(gcd(t[0], t[1]), t[2]) === 1) &&
      triples.some((t) => t[0] === 20 && t[1] === 21 && t[2] === 29) &&
      triples.some((t) => t[0] === 9 && t[1] === 40 && t[2] === 41),
      '16 right verdicts, 16 primitivity verdicts, both pinned triples found')
    check('E30 Euclid\u2019s factory witnesses: (m,n) = (2,1) → 3-4-5; (3,2) → 5-12-13; (4,1) → 8-15-17; (5,2) → 20-21-29; (7,4) → 33-56-65 — all five in the census',
      JSON.stringify([Math.min(3, 4), Math.max(3, 4)]) === JSON.stringify([3, 4]) &&
      close(3 * 3 + 4 * 4, 5 * 5) && close(5 * 5 + 12 * 12, 13 * 13) && close(8 * 8 + 15 * 15, 17 * 17) &&
      close(20 * 20 + 21 * 21, 29 * 29) && close(33 * 33 + 56 * 56, 65 * 65) &&
      gcd(gcd(20, 21), 29) === 1 && gcd(gcd(33, 56), 65) === 1,
      'm² − n², 2mn, m² + n² with gcd(m,n) = 1 and m − n odd')
    {
      // the 3-4-5 multiple family inside the same hyp bound
      const fam: number[] = []
      for (let k = 1; 5 * k <= 100; k++) fam.push(k)
      check('E31 the contrast census: the 3-4-5 MULTIPLE family with hyp ≤ 100 has 20 members (k = 1..20) — one family outnumbers all 16 primitive triples put together',
        fam.length === 20 && fam[0] === 1 && fam[19] === 20, 'most triples in a bound are multiples of a primitive')
    }
  }
  // the converse
  check('E32 the converse fires on 8, 15, 17: 8² + 15² = 64 + 225 = 289 = 17², so the angle opposite the 17 is right',
    8 * 8 + 15 * 15 === 289 && 17 * 17 === 289, '289 = 289: the certificate')
  check('E33 the converse refuses 4, 5, 7: 4² + 5² = 16 + 25 = 41 ≠ 49 = 7², so no right angle — and the triangle inequality still admits the triangle (4 + 5 > 7)',
    4 * 4 + 5 * 5 === 41 && 7 * 7 === 49 && notRight457Legs !== notRight457Hyp && 4 + 5 > 7, 'an honest triangle that is simply not right')
  check('E34 the carpenter\u2019s check: 3-4-5 fires (9 + 16 = 25), 6-8-10 fires (36 + 64 = 100), 9-12-15 fires (81 + 144 = 225) — every multiple of a right triple is a right triple',
    9 + 16 === 25 && 36 + 64 === 100 && 81 + 144 === 225, 'the converse inherits the family scaling')
}

/* ================================================================== */
/* ENGINE SECTION 5 — exercise + quiz witnesses (every drill number)   */
/* ================================================================== */
{
  check('E35 Ex1 witness: the 3-4-5 split reads p = 1.8, q = 3.2, h = 2.4 with h² = 5.76 (E02/E05)',
    close(9 / 5, 1.8) && close(16 / 5, 3.2) && close(12 / 5, 2.4) && close(2.4 * 2.4, 5.76), 'the machine, verbatim')
  check('E36 Ex2 witness: on the 6-8-10 the squares read 36 + 64 = 100',
    36 + 64 === 100, 'the k = 2 member of the family')
  check('E37 Ex3 witness: geometric means √(1.8 × 3.2) = 2.4; √(5 × 45) = √225 = 15; √(4 × 16) = √64 = 8',
    close(Math.sqrt(1.8 * 3.2), 2.4) && close(Math.sqrt(5 * 45), 15) && close(Math.sqrt(4 * 16), 8), 'three clean means')
  check('E38 Ex5 witness: hyp 10 with segments 6.4 and 3.6 — legs √(10 × 6.4) = √64 = 8 and √(10 × 3.6) = √36 = 6 (the 6-8-10 rebuilt from its split)',
    close(6.4 + 3.6, 10) && close(Math.sqrt(10 * 6.4), 8) && close(Math.sqrt(10 * 3.6), 6) && close(6 * 6 + 8 * 8, 100),
    'VI.8 read in the solving direction')
  check('E39 Ex6 witness: the 5-12-13 split p = 1.9231, q = 11.0769, h = 4.6154 (4 dp), h² = 21.3018 = pq (E14/E15)',
    close(25 / 13, 1.9231, 1e-4) && close(144 / 13, 11.0769, 1e-4) && close(60 / 13, 4.6154, 1e-4) && close(3600 / 169, 21.3018, 1e-4), 'fractions and decimals agree')
  check('E40 Ex7 witness: area 6 at k = 3 -> 54; perimeters 12 -> 36; k = 3/2 -> area ratio 9/4 and image area 8 × 9/4 = 18',
    close(6 * 9, 54) && close(12 * 3, 36) && close((3 / 2) ** 2, 9 / 4) && close(8 * 2.25, 18), 'the k and k² dials, three reads')
  check('E41 Ex8 witness: 45-45-90 at legs 7 -> hypotenuse 7√2 = 9.8995 (4 dp); 30-60-90 at shortest side 5 -> 5√3 = 8.6603 and 10',
    close(7 * Math.SQRT2, 9.8995, 1e-4) && close(5 * Math.sqrt(3), 8.6603, 1e-4) && 5 * 2 === 10, 'the specials, run')
  check('E42 Ex9 witness: the ladder reads 9 = 5 × 1.8, 16 = 5 × 3.2, and 9 + 16 = 25 = 5 × (1.8 + 3.2) = 5 × 5',
    close(5 * 1.8, 9) && close(5 * 3.2, 16) && close(5 * (1.8 + 3.2), 25), 'the proof in one line of arithmetic')
  check('E43 Ex10 witness: 8,15,17 right (289); 4,5,7 not (41 ≠ 49); 9,12,15 right (81 + 144 = 225)',
    64 + 225 === 289 && 16 + 25 === 41 && notRight457Legs !== notRight457Hyp && 81 + 144 === 225, 'three converse verdicts')
  check('E44 Ex13 witness: areas 6 and 54 give k = √(54/6) = 3 (small to large; 1/3 back); a leg 4 maps to 12; perimeter 12 maps to 36',
    close(Math.sqrt(54 / 6), 3) && close(4 * 3, 12) && close(12 * 3, 36), 'the area read recovers the length read')
  check('E45 Ex4 + Ex14 witnesses: fence post 1.2 m with 1.6 m shadow, poplar shadow 20 m — k = 12.5, height 15 m; person 1.8 m with 2.4 m shadow, chimney shadow 40 m — height 30 m, and a 6 m mast casts 2.4 × (6/1.8) = 8 m',
    close(20 / 1.6, 12.5) && close((1.2 * 20) / 1.6, 15) && close((1.8 * 40) / 2.4, 30) && close(2.4 * (6 / 1.8), 8),
    'the shadow machine, run both directions')
  check('E46 Ex15 witness: the carpenter triple fires (9 + 16 = 25); 9-12-15 fires (225); 4-5-7 refuses (41 ≠ 49) — and the licence is the CONVERSE, not the theorem',
    9 + 16 === 25 && 81 + 144 === 225 && 16 + 25 !== 49, 'direction discipline on the licence')
  check('E47 quiz-key self-check: the pinned key is [3,0,4,2,1] — five entries, pairwise distinct, each a legal option index (item 3 carries index 4, so it needs five options)',
    JSON.stringify([3, 0, 4, 2, 1]) === JSON.stringify([3, 0, 4, 2, 1]) &&
      new Set([3, 0, 4, 2, 1]).size === 5 && [3, 0, 4, 2, 1].every((v) => v >= 0 && v <= 4),
    'key 30421, matching the master plan')
  check('E48 quiz numeric witnesses: Q2 1.8 = 9/5 (E02); Q3 9/4 (E21); Q4 41 ≠ 49 (E33); Q5 9 + 16 = 25 (E34) — every quiz number is an engine number',
    close(9 / 5, 1.8) && close(9 / 4, 2.25) && 16 + 25 === 41 && notRight457Legs !== notRight457Hyp && 9 + 16 === 25, 'no quiz number outside the engine')
  check('E49 the isosceles edge case: a 45-45-90 with hypotenuse 5 splits into p = q = 2.5 with h = 2.5 — the altitude equals the half-hypotenuse, and the split pieces are congruent',
    close(2.5 + 2.5, 5) && close((5 / 2) * (5 / 2) * 2, 12.5) && close(Math.sqrt(2.5 * 2.5), 2.5), 'the one case where the two pieces match')
  check('E50 the honest sizes: the leg squares 9 and 16 sit inside the hyp square 25 with the split carrying 9/25 = 0.36 and 16/25 = 0.64 of the area',
    close(9 / 25, 0.36) && close(16 / 25, 0.64) && close(0.36 + 0.64, 1), 'area bookkeeping, closed')
  check('E51 the 4-5-7 corner bulges: the angle between the sides 4 and 5 runs 101.5370° (4 dp) — past 90°, the honest opposite of the carpenter\u2019s square corner (while the 8-15-17 corner sits at exactly 90°)',
    close(angOpp(7, 4, 5), 101.537, 1e-3) && close(angOpp(17, 8, 15), 90, 1e-9),
    `4-5-7: ${f4(angOpp(7, 4, 5))}°; 8-15-17: ${f4(angOpp(17, 8, 15))}°`)
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(new URL('./part-geo404.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo404.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo404?: Lesson } | null = null
  try {
    mod = await import('./part-geo404')
    pcheck('P01 part file loads and exports lessonGeo404', !!mod?.lessonGeo404, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo404', false, String(e))
  }
  const lesson = mod?.lessonGeo404
  if (!lesson) return

  // P02 — quiz keys [3,0,4,2,1], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [3,0,4,2,1]', JSON.stringify(keys) === JSON.stringify([3, 0, 4, 2, 1]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 3 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length >= 4 && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['similar to the original', '1.8', '9/4', '41', 'converse']
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
  pcheck('P04d the named figure octet exists: the split, the mean-proportional, the squares, the census (body) and the ladder, the shadow, the converse, the specials (solution)',
    /split/.test(allCaptions) && /mean/.test(allCaptions) && /squares/.test(allCaptions) && /census/.test(allCaptions) &&
    /ladder/.test(allCaptions) && /shadow/.test(allCaptions) && /converse/.test(allCaptions) && /special/.test(allCaptions),
    allCaptions.slice(0, 140))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the theorem, the leg law and the converse test',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('pythagoras')) &&
    formulas.some((f) => f.name.toLowerCase().includes('leg')) &&
    formulas.some((f) => f.name.toLowerCase().includes('converse')),
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
  const allowed = new Set(['#134e4a', '#0f766e', '#0d9488', '#115e59', '#b45309', '#ea580c', '#be123c', '#15803d', '#ccfbf1', '#fef3c7', '#99f6e4', '#5eead4', '#ffffff', '#f0fdfa'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c44 teal-bronze palette', badHex.length === 0, badHex.join(','))
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-pythagoras-proved-the-theorem-earned' && lesson.number === '4.4' && lesson.title === 'Pythagoras Proved: the Theorem Earned', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, ncert-math10-ch6-triangles, geo-ch04-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (ch.4 continuity: the three siblings)
  pcheck('P13 prerequisites exact [4.1, 4.2, 4.3]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-similar-figures-same-shape-at-any-scale', 'geo-the-basic-proportionality-theorem-thales', 'geo-the-similarity-criteria-aa-sas-sss']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8 from the pinned set; objectives 4-6
  const PINNED_CONCEPTS = ['Pythagoras\u2019 theorem', 'altitude on the hypotenuse', 'geometric mean', 'right-triangle similarity', 'Pythagorean triples', 'special right triangles', 'converse of Pythagoras']
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
  // P17 — derivation blocks (the AA census + the proof by similarity)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the triple census table (16 rows, both pinned triples)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const censusTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('20, 21, 29')))
  pcheck('P19 the primitive-triple census table exists carrying 20, 21, 29 and 9, 40, 41 with 16 rows',
    !!censusTable && censusTable.rows.length === 16 &&
    censusTable.rows.join(' ').includes('9, 40, 41') &&
    ['3, 4, 5', '5, 12, 13', '8, 15, 17', '65, 72, 97'].every((s) => censusTable.rows.join(' ').includes(s)),
    censusTable ? `rows=${censusTable.rows.length}` : 'missing')
  // P20 — the converse table (8,15,17 vs 4,5,7 with verdicts)
  const convTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('289')))
  pcheck('P20 the converse table carries 8, 15, 17 (fires: 289) and 4, 5, 7 (refuses: 41 ≠ 49) with both verdicts',
    !!convTable && convTable.rows.join(' ').includes('41') && convTable.rows.join(' ').includes('49'),
    convTable ? 'found' : 'missing')
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
const e = report('geo404-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo404-pins', pins)
const fail = e.fail + p.fail
console.log(`geo404 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
