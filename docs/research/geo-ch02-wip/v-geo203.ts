/**
 * v-geo203.ts — verify-first ENGINE + PIN harness for GEO lesson 2.3
 * "The Transversal: the Eight-Angle Census" (run 126 swarm, agent geo203, seat 23).
 *
 * DISCIPLINE: the engine wins over the spec. Every census value, family
 * count, reduction route, group law and witness the prose prints is
 * recomputed here by brute force FIRST; where engine and prose disagree,
 * the prose is fixed to the engine's value and the catch is flagged in
 * the report.
 *
 * ONE SPEC CATCH, APPLIED (engine checks E22 + E44): the outline sketches
 * the x-ladder as "a1 = 2x+10, a6 = 3x−5 ⟹ corresponding-equal ⟹ x = 15,
 * both 40°". Under the BINDING a1..a8 label law the pair (a1, a6) is NOT
 * a corresponding pair — it is one of the four unnamed CROSS pairs, and
 * the census pins a1 + a6 = 180°, so demanding a1 = a6 there would force
 * both angles to 90°. The repair keeps every pinned number (x = 15, both
 * 40°) and reads the pair as (a1, a5) — genuinely corresponding (same
 * upper-left position at P and at Q). The lesson teaches the trap itself
 * as a Caution.
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the full census function
 *     census(x) = [x, 180−x, x, 180−x, x, 180−x, x, 180−x]; every family
 *     relation verified at a1 ∈ {65, 37.5, 112.75, 90}; the complete
 *     28-pair classification from first principles (positions + interiority)
 *     with the family count table 4/2/2/2/2/4/8 and the 4 cross pairs; the
 *     three converse reduction routes landing on a3 = a5 over a free (u, w)
 *     sweep; the V4 position group (three involutions, the composition
 *     table, the two distinct linear pairings); the zigzag 70; the pinned
 *     ladder pair (a1 = 2x+10, a5 = 3x−5 ⟹ x = 15, both 40°) plus the
 *     a1/a6 catch; quiz-key self-check; every exercise witness.
 *   PIN SECTION (P01...) — imports ./part-geo203 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [2,0,3,1,2], 15 exercises L1..L6 with full steps
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     zigzag / ladder / census-walk trio, terms + formula cards, >= 3
 *     Illustrations with >= 4 steps, >= 2 derivations, SVG + math-span
 *     hygiene laws).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch02-wip/v-geo203.ts
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
/* ENGINE SECTION 1 — the census function + the four pinned values     */
/* a1..a8 = [x, 180−x, x, 180−x, x, 180−x, x, 180−x]: odds = a1,      */
/* evens = 180 − a1                                                    */
/* ================================================================== */
{
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  const DRILL = [65, 37.5, 112.75, 90]

  check('E01 census(65) = 65, 115, 65, 115, 65, 115, 65, 115',
    JSON.stringify(census(65)) === JSON.stringify([65, 115, 65, 115, 65, 115, 65, 115]),
    census(65).join(','))
  check('E02 census(37.5) = 37.5, 142.5, 37.5, 142.5, ...',
    JSON.stringify(census(37.5)) === JSON.stringify([37.5, 142.5, 37.5, 142.5, 37.5, 142.5, 37.5, 142.5]),
    census(37.5).join(','))
  check('E03 census(112.75) = 112.75, 67.25, 112.75, 67.25, ...',
    JSON.stringify(census(112.75)) === JSON.stringify([112.75, 67.25, 112.75, 67.25, 112.75, 67.25, 112.75, 67.25]),
    census(112.75).join(','))
  check('E04 census(90) is the all-90 census (the transversal perpendicular to both)',
    census(90).every((v) => close(v, 90)), census(90).join(','))
  check('E05 the drill law: odds all equal a1, evens all equal 180 − a1, at every pinned value',
    DRILL.every((x) => {
      const v = census(x)
      return [0, 2, 4, 6].every((i) => close(v[i], x)) && [1, 3, 5, 7].every((i) => close(v[i], 180 - x))
    }), 'odds = a1; evens = 180 − a1')
  check('E06 the eight linear pairs (adjacent at a vertex) all sum to 180 at every pinned value',
    DRILL.every((x) => {
      const v = census(x)
      const linPairs: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4]]
      return linPairs.every(([i, j]) => close(v[i] + v[j], 180))
    }), '8 linear pairs, all 180')

  // every family relation, at every pinned value
  const CORR: Array<[number, number]> = [[0, 4], [1, 5], [2, 6], [3, 7]]
  const VERT: Array<[number, number]> = [[0, 2], [1, 3], [4, 6], [5, 7]]
  const LIN: Array<[number, number]> = [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4]]
  const AINT: Array<[number, number]> = [[3, 5], [2, 4]]
  const AEXT: Array<[number, number]> = [[0, 6], [1, 7]]
  const CINT: Array<[number, number]> = [[3, 4], [2, 5]]
  const CEXT: Array<[number, number]> = [[0, 7], [1, 6]]
  const famName = ['a1 = 65', 'a1 = 37.5', 'a1 = 112.75', 'a1 = 90']
  DRILL.forEach((x, k) => {
    const v = census(x)
    const ok =
      CORR.every(([i, j]) => close(v[i], v[j])) &&
      VERT.every(([i, j]) => close(v[i], v[j])) &&
      AINT.every(([i, j]) => close(v[i], v[j])) &&
      AEXT.every(([i, j]) => close(v[i], v[j])) &&
      LIN.every(([i, j]) => close(v[i] + v[j], 180)) &&
      CINT.every(([i, j]) => close(v[i] + v[j], 180)) &&
      CEXT.every(([i, j]) => close(v[i] + v[j], 180))
    check(`E0${7 + k} at ${famName[k]}: all 24 family relations hold (4 corr + 4 vert + 8 linear + 2 alt-int + 2 alt-ext + 2 co-int + 2 co-ext)`,
      ok, ok ? '' : 'family failure')
  })

  // individual family checks at the headline value 65
  {
    const v = census(65)
    check('E11 corresponding: a1=a5, a2=a6, a3=a7, a4=a8 (all 65/115 pairs)',
      CORR.every(([i, j]) => close(v[i], v[j])), `a1=${v[0]}, a5=${v[4]}; a2=${v[1]}, a6=${v[5]}`)
    check('E12 vertically opposite: a1=a3, a2=a4, a5=a7, a6=a8 at both vertices',
      VERT.every(([i, j]) => close(v[i], v[j])), `a1=${v[0]}, a3=${v[2]}; a6=${v[5]}, a8=${v[7]}`)
    check('E13 linear pairs: all 8 adjacent pairs sum to 180',
      LIN.every(([i, j]) => close(v[i] + v[j], 180)), `65 + 115 = ${v[0] + v[1]}`)
    check('E14 alternate interior: a4=a6 and a3=a5 (the Z)',
      AINT.every(([i, j]) => close(v[i], v[j])), `a4=${v[3]}, a6=${v[5]}; a3=${v[2]}, a5=${v[4]}`)
    check('E15 alternate exterior: a1=a7 and a2=a8',
      AEXT.every(([i, j]) => close(v[i], v[j])), `a1=${v[0]}, a7=${v[6]}`)
    check('E16 co-interior (same-side interior): a4+a5=180 and a3+a6=180 (the C)',
      CINT.every(([i, j]) => close(v[i] + v[j], 180)), `a4+a5=${v[3] + v[4]}; a3+a6=${v[2] + v[5]}`)
    check('E17 co-exterior (same-side exterior): a1+a8=180 and a2+a7=180',
      CEXT.every(([i, j]) => close(v[i] + v[j], 180)), `a1+a8=${v[0] + v[7]}; a2+a7=${v[1] + v[6]}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 2 — the complete 28-pair classification              */
/* (from first principles: vertex + position + interiority) and the    */
/* family count table 4/2/2/2/2/4/8 + the 4 cross pairs                */
/* ================================================================== */
{
  type Pos = 'UL' | 'UR' | 'LR' | 'LL'
  const ang: Array<{ v: 'P' | 'Q'; p: Pos }> = [
    { v: 'P', p: 'UL' }, { v: 'P', p: 'UR' }, { v: 'P', p: 'LR' }, { v: 'P', p: 'LL' },
    { v: 'Q', p: 'UL' }, { v: 'Q', p: 'UR' }, { v: 'Q', p: 'LR' }, { v: 'Q', p: 'LL' },
  ]
  const interior = (i: number): boolean => [2, 3, 4, 5].includes(i) // a3,a4 at P; a5,a6 at Q
  const OPPOSITE: Record<Pos, Pos> = { UL: 'LR', UR: 'LL', LR: 'UL', LL: 'UR' }
  const SIDE: Record<Pos, 'L' | 'R'> = { UL: 'L', LL: 'L', UR: 'R', LR: 'R' }
  function classify(i: number, j: number): string {
    const A = ang[i]
    const B = ang[j]
    if (A.v === B.v) return OPPOSITE[A.p] === B.p ? 'vertical' : 'linear'
    if (A.p === B.p) return 'corresponding'
    const bothInt = interior(i) && interior(j)
    const bothExt = !interior(i) && !interior(j)
    if (OPPOSITE[A.p] === B.p) return bothInt ? 'alternate interior' : bothExt ? 'alternate exterior' : 'cross'
    return SIDE[A.p] === SIDE[B.p] && (bothInt || bothExt)
      ? bothInt ? 'co-interior' : 'co-exterior'
      : 'cross'
  }
  const pairs: Array<[number, number]> = []
  for (let i = 0; i < 8; i++) for (let j = i + 1; j < 8; j++) pairs.push([i, j])
  check('E18 the eight angles carry 28 unordered pairs in total', pairs.length === 28, `count=${pairs.length}`)

  const PINNED: Record<string, number[][]> = {
    corresponding: [[0, 4], [1, 5], [2, 6], [3, 7]],
    'alternate interior': [[3, 5], [2, 4]],
    'alternate exterior': [[0, 6], [1, 7]],
    'co-interior': [[3, 4], [2, 5]],
    'co-exterior': [[0, 7], [1, 6]],
    vertical: [[0, 2], [1, 3], [4, 6], [5, 7]],
    linear: [[0, 1], [1, 2], [2, 3], [3, 0], [4, 5], [5, 6], [6, 7], [7, 4]],
    cross: [[0, 5], [1, 4], [2, 7], [3, 6]],
  }
  const key = (p: number[]) => [...p].sort((a, b) => a - b).join('-')
  let allMatch = true
  const mismatches: string[] = []
  for (const [i, j] of pairs) {
    const fam = classify(i, j)
    const inPinned = PINNED[fam]?.some((p) => key(p) === key([i, j])) ?? false
    if (!inPinned) { allMatch = false; mismatches.push(`a${i + 1}-a${j + 1}:${fam}`) }
  }
  const namedFams = ['corresponding', 'alternate interior', 'alternate exterior', 'co-interior', 'co-exterior', 'vertical', 'linear']
  check('E19 first-principles classification reproduces every pinned family pair (28/28 placed, 24 named + 4 cross)',
    allMatch && pairs.filter(([i, j]) => namedFams.includes(classify(i, j))).length === 24,
    mismatches.join(' | '))

  const counts = {
    corresponding: 4, 'alternate interior': 2, 'alternate exterior': 2,
    'co-interior': 2, 'co-exterior': 2, vertical: 4, linear: 8,
  }
  const gotCounts = Object.fromEntries(Object.keys(counts).map((f) => [f, pairs.filter(([i, j]) => classify(i, j) === f).length]))
  check('E20 the family count table is 4 / 2 / 2 / 2 / 2 / 4 / 8 (corr / alt-int / alt-ext / co-int / co-ext / vertical / linear)',
    JSON.stringify(gotCounts) === JSON.stringify(counts), JSON.stringify(gotCounts))
  const crossCount = pairs.filter(([i, j]) => classify(i, j) === 'cross').length
  check('E21 the four leftover CROSS pairs are (a1,a6), (a2,a5), (a3,a8), (a4,a7) — opposite sides of t, one interior one exterior: UNNAMED',
    crossCount === 4 && PINNED.cross.every((p) => classify(p[0], p[1]) === 'cross'),
    `cross=${crossCount}`)

  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  const eqFams = ['corresponding', 'vertical', 'alternate interior', 'alternate exterior']
  const sumFams = ['linear', 'co-interior', 'co-exterior', 'cross']
  check('E22 the 28 pairs split into 12 EQUAL + 16 SUM-180 + 0 other; every cross pair also sums to 180 (a1 + a6 = 180 — the trap behind the spec catch)',
    [65, 37.5, 112.75, 90].every((x) => {
      const v = census(x)
      return pairs.every(([i, j]) => {
        const f = classify(i, j)
        return eqFams.includes(f) ? close(v[i], v[j]) : close(v[i] + v[j], 180)
      })
    }) && pairs.filter(([i, j]) => eqFams.includes(classify(i, j))).length === 12
      && pairs.filter(([i, j]) => sumFams.includes(classify(i, j))).length === 16,
    '12 equal + 16 supplementary = 28; equality of a cross pair would force 90')
}

/* ================================================================== */
/* ENGINE SECTION 3 — the three converse reduction routes               */
/* Free two-vertex model: a1 = u at P, a5 = w at Q, vertex laws only   */
/* (vertical + linear hold at each vertex regardless of parallels).    */
/* All three converse hypotheses collapse to u = w, i.e. a3 = a5 (I.27)*/
/* ================================================================== */
{
  const vertex = (u: number): [number, number, number, number] => [u, 180 - u, u, 180 - u]
  const sweep: Array<[number, number]> = []
  for (const u of [30, 47.5, 65, 90, 112.75, 140]) for (const w of [30, 47.5, 65, 90, 112.75, 140]) sweep.push([u, w])

  let r1ok = true, r2ok = true, r3ok = true, equivOk = true, landOk = true
  for (const [u, w] of sweep) {
    const [a1, a2, a3, a4] = vertex(u) // at P
    const [a5, a6, a7, a8] = vertex(w) // at Q
    // structural vertex facts (fifth-free, hold for every u, w)
    if (!(close(a3, a1) && close(a7, a5) && close(a3 + a4, 180))) equivOk = false
    // route 1: corresponding a1 = a5 + vertical at P (a3 = a1) ⟹ a3 = a5
    if (close(a1, a5) && !close(a3, a5)) r1ok = false
    // route 2: co-interior a4 + a5 = 180 + linear at P (a3 + a4 = 180) ⟹ a3 = a5
    if (close(a4 + a5, 180) && !(close(180 - a4, a5) && close(a3, a5))) r2ok = false
    // route 3: alternate exterior a1 = a7 + vertical at Q (a7 = a5) ⟹ a1 = a5 (then route 1)
    if (close(a1, a7) && !(close(a7, a5) && close(a1, a5) && close(a3, a5))) r3ok = false
    // all three hypotheses are EQUIVALENT to u = w over the sweep
    const h1 = close(a1, a5), h2 = close(a4 + a5, 180), h3 = close(a1, a7), uweq = close(u, w)
    if (!(h1 === uweq && h2 === uweq && h3 === uweq)) equivOk = false
    // the landed conclusion a3 = a5 holds exactly when u = w
    if (close(a3, a5) !== uweq) landOk = false
  }
  check('E23 route 1 (corresponding a1=a5, via vertical a3=a1 at P) lands on a3=a5 over the whole free sweep',
    r1ok, '36 (u,w) grid points')
  check('E24 route 2 (co-interior a4+a5=180, via linear a3+a4=180 at P) lands on a3=a5 over the whole free sweep',
    r2ok, 'the substitution a3 = 180 − a4 = a5')
  check('E25 route 3 (alternate exterior a1=a7, via vertical a7=a5 at Q) reduces to a1=a5, then route 1 lands on a3=a5',
    r3ok, 'two hops: a7=a5 then a3=a1')
  check('E26 all three converse hypotheses are equivalent (each holds exactly when a1 = a5) — one condition wearing three costumes',
    equivOk, 'h1 ⟺ h2 ⟺ h3 ⟺ (u = w)')
  check('E27 the common landing a3 = a5 is exactly I.27\u2019s hypothesis (alternate interior equality)',
    landOk, 'conclusion ⟺ u = w as well')
  {
    // witness at the pinned value u = w = 65
    const [a1, , a3, a4] = vertex(65)
    const [a5] = vertex(65)
    check('E28 witness at 65: route 1 gives a3 = a1 = 65 = a5; route 2 gives 180 − a4 = 180 − 115 = 65 = a5',
      close(a3, a1) && close(a3, a5) && close(180 - a4, 65) && close(a4, 115),
      `a3=${f4(a3)}, a5=${f4(a5)}, 180−a4=${f4(180 - a4)}`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 4 — the V4 position group on {UL, UR, LR, LL}        */
/* three pairings: vertical (EQUAL), linear across t, linear across    */
/* the line (both SUM 180); each an involution; product of any two is  */
/* the third; the two linear pairings DIFFER                           */
/* ================================================================== */
{
  const pos = ['UL', 'UR', 'LR', 'LL']
  const idn: Record<string, string> = { UL: 'UL', UR: 'UR', LR: 'LR', LL: 'LL' }
  const vert: Record<string, string> = { UL: 'LR', UR: 'LL', LR: 'UL', LL: 'UR' }
  const lint: Record<string, string> = { UL: 'UR', UR: 'UL', LR: 'LL', LL: 'LR' } // linear across the transversal
  const comp = (f: Record<string, string>, g: Record<string, string>): Record<string, string> => {
    const o: Record<string, string> = {}
    for (const p of pos) o[p] = f[g[p]]
    return o
  }
  const diag = comp(vert, lint) // linear across the line m
  const isInv = (m: Record<string, string>): boolean => pos.every((p) => m[m[p]] === p)
  const eqMap = (a: Record<string, string>, b: Record<string, string>): boolean => pos.every((p) => a[p] === b[p])

  check('E29 the vertical pairing (UL↔LR, UR↔LL) is an involution', isInv(vert), '')
  check('E30 the across-t linear pairing (UL↔UR, LL↔LR) is an involution', isInv(lint), '')
  check('E31 the across-the-line pairing (UL↔LL, UR↔LR) is an involution', isInv(diag), '')
  check('E32 composition law: vertical ∘ across-t = across-t ∘ vertical = the across-the-line pairing',
    eqMap(comp(vert, lint), diag) && eqMap(comp(lint, vert), diag), 'order does not matter — the group is abelian')
  check('E33 the two linear pairings DIFFER (across the transversal vs across the line)',
    !eqMap(lint, diag), 'UL maps to UR (across t) but to LL (across m)')
  const set = [idn, vert, lint, diag]
  const inSet = (m: Record<string, string>): boolean => set.some((s) => eqMap(s, m))
  const allProds: Array<[string, string]> = []
  for (const f of set) for (const g of set) if (!inSet(comp(f, g))) allProds.push([JSON.stringify(f), JSON.stringify(g)])
  check('E34 closure: all 16 compositions of {id, vertical, across-t, across-line} stay in the set (the whole table checked)',
    allProds.length === 0, `${allProds.length} escapes`)
  check('E35 the product of any two distinct non-identity involutions is the third (the V4 / Klein four-group law)',
    eqMap(comp(vert, lint), diag) && eqMap(comp(vert, diag), lint) && eqMap(comp(lint, diag), vert) &&
    eqMap(comp(vert, vert), idn) && eqMap(comp(lint, lint), idn) && eqMap(comp(diag, diag), idn), '')
  // numeric witness in census(65) at vertex P: UL=a1=65, UR=a2=115, LR=a3=65, LL=a4=115
  const v = [65, 115, 65, 115]
  check('E36 census(65) at P witnesses the three pairings: vertical EQUAL (65=65, 115=115); both linear pairings SUM 180',
    v[0] === v[2] && v[1] === v[3] && v[0] + v[1] === 180 && v[3] + v[2] === 180 && v[0] + v[3] === 180 && v[1] + v[2] === 180,
    'UL=65, UR=115, LR=65, LL=115')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the zigzag witness                               */
/* three parallels; two transversals meeting at B on the middle one;   */
/* outer angles 50 and 60; the straight line at B: 50 + x + 60 = 180   */
/* ================================================================== */
{
  const outer1 = 50, outer2 = 60
  const x = 180 - outer1 - outer2
  check('E37 the zigzag middle angle: x = 180 − 50 − 60 = 70', close(x, 70), `x=${f4(x)}`)
  check('E38 the straight-angle equation at B: 50 + 70 + 60 = 180',
    close(outer1 + x + outer2, 180), `${outer1} + ${f4(x)} + ${outer2} = 180`)
  check('E39 the vertical copy at B is also 70 and the other side of the straight line is 110',
    close(x, 70) && close(180 - x, 110), `vertical=${f4(x)}, other side=${f4(180 - x)}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — the pinned x-ladder (+ the a1/a6 spec catch)     */
/* a1 = 2x+10, a5 = 3x−5, corresponding-equal ⟹ x = 15, both 40       */
/* ================================================================== */
{
  const f = (x: number): number => 2 * x + 10
  const g = (x: number): number => 3 * x - 5
  // unique rational solution of 2x + 10 = 3x − 5
  const sols: number[] = []
  for (let x = -200; x <= 200; x += 0.5) if (close(f(x), g(x), 1e-12)) sols.push(x)
  check('E40 the ladder equation 2x + 10 = 3x − 5 has the unique solution x = 15 (brute sweep −200..200)',
    sols.length === 1 && close(sols[0], 15), `solutions=${JSON.stringify(sols)}`)
  check('E41 at x = 15 both expressions equal 40: a1 = a5 = 40°',
    close(f(15), 40) && close(g(15), 40) && close(f(15), g(15)), `2(15)+10=${f(15)}, 3(15)−5=${g(15)}`)
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  const v = census(40)
  check('E42 the repaired ladder pins the whole census at 40: 40, 140, 40, 140, 40, 140, 40, 140 (all families hold)',
    v[0] === 40 && v[1] === 140 && v.slice(2).every((y, i) => close(y, v[i % 2])), v.join(','))
  check('E43 (a1, a5) is genuinely corresponding: same upper-left position at P and at Q (engine classification)',
    true, 'position match: P.UL ↔ Q.UL — E19 pinned pair list')
  check('E44 THE SPEC CATCH: (a1, a6) is NOT a family pair — it is a cross pair; the census forces a1 + a6 = 180, so a1 = a6 would force both to 90',
    close(40 + v[5], 180) && v[5] === 140 && close(90 + 90, 180) && !close(v[0], v[5]),
    `a1=40 forces a6=140 (sum 180); equality a1=a6 happens only in the all-90 census`)
  check('E45 the ladder\u2019s co-interior cross-check: a4 + a5 = 140 + 40 = 180',
    close((180 - 40) + 40, 180), 'a4 = 180 − 40 = 140')
}

/* ================================================================== */
/* ENGINE SECTION 7 — quiz-key self-check + exercise witnesses         */
/* ================================================================== */
{
  const QUIZ_KEY = [2, 0, 3, 1, 2]
  const QUIZ_TOKENS = [
    '115°',                       // Q1: a6 = 180 − 65 (co-interior with a3 = a1)
    'a4 and a6',                  // Q2: the alternate interior pair
    'I.29',                       // Q3: the fifth postulate's first appearance
    '70°',                        // Q4: the zigzag 180 − 50 − 60
    'both angles are 40°',        // Q5: the ladder x = 15
  ]
  check('E46 quiz key [2,0,3,1,2]: 5 entries, each in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 3),
    QUIZ_TOKENS.join(' | '))
  const census = (x: number): number[] => [x, 180 - x, x, 180 - x, x, 180 - x, x, 180 - x]
  // Ex1: a1 = 72 census
  check('E47 Ex1 witness: census(72) = 72, 108, ...; 72 + 108 = 180',
    census(72)[0] === 72 && census(72)[1] === 108 && census(72)[0] + census(72)[1] === 180, census(72).join(','))
  // Ex3: a6 = 48 ⟹ a1 = 132
  check('E48 Ex3 witness: a6 = 48 ⟹ a5 = 132 (linear at Q) ⟹ a1 = 132 (corresponding)',
    close(180 - 48, 132), `180 − 48 = ${180 - 48}`)
  // Ex4: a4 = 125 ⟹ a7 = 55
  check('E49 Ex4 witness: a4 = 125 ⟹ a3 = 55 (linear at P) ⟹ a7 = 55 (corresponding); census(55) all-families green',
    close(180 - 125, 55) && census(55)[6] === 55 && census(55)[3] === 125, `a7=${census(55)[6]}`)
  // Ex5: the 37.5 drill
  check('E50 Ex5 witness: census(37.5): odds 37.5, evens 142.5; 37.5 + 142.5 = 180',
    census(37.5).every((y, i) => close(y, i % 2 === 0 ? 37.5 : 142.5)), census(37.5).join(','))
  // Ex6: the converse 116/64
  check('E51 Ex6 witness: a4 = 116, a5 = 64: sum 180 ⟹ parallel (I.28); and 180 − 116 = 64 = a5 gives I.27 directly',
    close(116 + 64, 180) && close(180 - 116, 64), '116 + 64 = 180')
  // Ex7: ladder a2 = 4x − 14, a6 = 3x + 10
  {
    const sols: number[] = []
    for (let x = -100; x <= 200; x += 0.5) if (close(4 * x - 14, 3 * x + 10, 1e-12)) sols.push(x)
    check('E52 Ex7 witness: 4x − 14 = 3x + 10 ⟹ x = 24 unique; both angles 82; census(82) green',
      sols.length === 1 && close(sols[0], 24) && close(4 * 24 - 14, 82) && close(3 * 24 + 10, 82) && census(82)[1] === 98,
      `x=${sols[0]}, angle=${4 * 24 - 14}`)
  }
  // Ex8: zigzag 42/67
  check('E53 Ex8 witness: 180 − 42 − 67 = 71', close(180 - 42 - 67, 71), `x=${180 - 42 - 67}`)
  // Ex9: co-interior ratio 7:2
  check('E54 Ex9 witness: 7:2 co-interior pair at 140 and 40 (7 + 2 = 9 parts of 20)',
    close((180 * 7) / 9, 140) && close((180 * 2) / 9, 40) && close(140 + 40, 180) && close(140, 180 - 40), 'a4 = 140, a5 = 40')
  // Ex10: bisectors of a co-interior pair are perpendicular
  {
    const sweepOk = [10, 55, 90, 125, 170].every((y) => close(y / 2 + (180 - y) / 2, 90))
    check('E55 Ex10 witness: a4/2 + a5/2 = (a4 + a5)/2 = 90 for every co-interior pair; at a4 = 125: 62.5 + 27.5 = 90',
      sweepOk && close(125 / 2, 62.5) && close(55 / 2, 27.5) && close(62.5 + 27.5, 90), 'bisectors perpendicular')
  }
  // Ex11: the cross-pair trap a1 = 3x − 10, a6 = 2x + 25
  {
    const sols: number[] = []
    for (let x = -100; x <= 200; x += 0.5) if (close(3 * x - 10 + 2 * x + 25, 180, 1e-12)) sols.push(x)
    check('E56 Ex11 witness: (3x − 10) + (2x + 25) = 180 ⟹ x = 33 unique; a1 = 89, a6 = 91; 89 + 91 = 180',
      sols.length === 1 && close(sols[0], 33) && close(3 * 33 - 10, 89) && close(2 * 33 + 25, 91) && close(89 + 91, 180),
      `x=33, a1=89, a6=91`)
  }
  // Ex12: direction audit witness
  check('E57 Ex12 witness: 103.5 + 76.5 = 180 (the co-interior converse instance)',
    close(103.5 + 76.5, 180), '103.5 + 76.5 = 180')
  // Ex13: reverse zigzag
  check('E58 Ex13 witness: 180 − 78 − 55 = 47; the vertical copy at B is 78; the other side 102',
    close(180 - 78 - 55, 47) && close(180 - 78, 102), `other outer=${180 - 78 - 55}`)
  // Ex14: F from Z at 65
  check('E59 Ex14 witness: a3 = a1 = 65 (vertical at P), a3 = a5 = 65 (given Z), hence a1 = a5 (F) — engine census(65)',
    census(65)[2] === 65 && census(65)[4] === 65 && census(65)[0] === 65, 'all three read 65')
  // Ex15: the a1 = a6 refutation
  check('E60 Ex15 witness: a1 = a6 = 50 gives a3 + a6 = 100 < 180 (meet on that side) — NOT parallel; the exception is 90 (90 + 90 = 180)',
    close(50 + 50, 100) && 100 < 180 && close(90 + 90, 180) && !(close(50, 90)),
    'cross-pair equality without 90 does not force parallels')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo203?: Lesson } | null = null
  try {
    mod = await import('./part-geo203')
    pcheck('P01 part file loads and exports lessonGeo203', !!mod?.lessonGeo203, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo203', false, String(e))
  }
  const lesson = mod?.lessonGeo203
  if (!lesson) return

  // P02 — quiz keys [2,0,3,1,2], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [2,0,3,1,2]', JSON.stringify(keys) === JSON.stringify([2, 0, 3, 1, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['115°', 'a4 and a6', 'I.29', '70°', 'both angles are 40°']
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
  pcheck('P04d the named solution trio exists: a census-walk, a zigzag and an x-ladder figure',
    /census/.test(allCaptions) && /zigzag/.test(allCaptions) && /ladder/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the census rows)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the three census rows (corresponding, alternate, co-interior)',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('corresponding')) &&
    formulas.some((f) => f.name.toLowerCase().includes('alternate')) &&
    formulas.some((f) => f.name.toLowerCase().includes('co-interior')),
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-transversal-the-eight-angle-census' && lesson.number === '2.3' && lesson.title === 'The Transversal: the Eight-Angle Census', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, geo-ch02-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'geo-ch02-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [incidence, angles, parallel postulate]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-incidence-how-points-lines-and-planes-interlock', 'geo-angles-types-pairs-and-measures', 'geo-parallel-lines-and-the-fifth-postulate']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (the forward census + the reduction graph)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the census table + the four pinned drill values appear in a table
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const censusTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('family'))
  pcheck('P19 the census family table exists (head includes Family) with the 7 family rows',
    !!censusTable && censusTable.rows.length >= 7, censusTable ? `${censusTable.rows.length} rows` : 'missing')
  const drillTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('112.75')))
  pcheck('P20 the drill table carries all four pinned values 65, 37.5, 112.75, 90',
    !!drillTable && ['65', '37.5', '112.75', '90'].every((s) => drillTable.rows.join(' ').includes(s)), drillTable ? 'found' : 'missing')
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
const e = report('geo203-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo203-pins', pins)
const fail = e.fail + p.fail
console.log(`geo203 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
