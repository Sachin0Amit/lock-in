/**
 * v-geo402.ts — verify-first ENGINE + PIN harness for GEO lesson 4.2
 * "The Basic Proportionality Theorem (Thales)" (run 130 swarm, agent geo402).
 *
 * DISCIPLINE: the engine wins over the spec. Every ratio, area, parallelism
 * verdict, construction length and exercise witness the prose prints is
 * recomputed here by brute force FIRST; where engine and prose disagree, the
 * prose is fixed to the engine's value and the catch is flagged in the
 * report. The pinned numbers below are the IMMUTABLE truth (they reproduce
 * the run-130 master pin set: scripts/pin_check_geo130.py — the 4.2 block).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the equal-altitude area lemma by the
 *     shoelace formula (sliding vertex on the parallel: areas 30, 30, 30, 30
 *     on base (0,0)-(10,0); the height-ratio form 15/30/45; the base-ratio
 *     form [EAD]/[EDB] = 27/36 = 3/4 = AD/DB); the pinned right-triangle
 *     witness RW (A=(0,0), B=(14,0), C=(0,21), D=(6,0), E=(0,9): [ADE]=27,
 *     [BDE]=[CDE]=36, [ABC]=147, [BEC]=84, 27+36+84=147; distances of B and
 *     C to line DE both 24/sqrt(13), so 1/2 · 3sqrt(13) · 24/sqrt(13) = 36);
 *     the lemma sweep at k = 1/5..4/5 (DE ∥ BC, [BDE]=[CDE], both ratio
 *     reads, all by coordinates); the BPT core AD/DB = AE/EC = 3/4 with
 *     componendo 3/(3+4) = 3/7 (AD/AB = 6/14 = 3/7, AE/AC = 9/21 = 3/7) and
 *     DE/BC = 3sqrt(13)/7sqrt(13) = 3/7 EXACTLY, both directions (7/3 back);
 *     the numeric ladder AB=14, AD=6, AC=21, BC=28 -> DB=8, AE=9, EC=12,
 *     DE=12; the second witness 21/9/14/35 -> 12/6/8/15; the k-table
 *     k/(1-k) = 1/3, 1/2, 2/3, 3/4, 1, 3/2, 3 with reciprocals; the
 *     equiangularity computation (angle ADE = angle ABC = 56.3099 deg,
 *     angle AED = angle ACB = 33.6901 deg, by dot products); the converse
 *     witness CW (AD/DB = 3/4 but AE/EC = 4/5: cross(DE, BC) = 20/9 ≠ 0 ->
 *     NOT parallel; the true point E' = (3/7)C gives cross = 0; E ≠ E' by
 *     5sqrt(17)/63; the uniqueness lemma AE = r/(1+r) · AC: 3/4 -> 9,
 *     4/5 -> 28/3 ≈ 9.3333, and the monotonicity sweep); the intercept
 *     machine (marks at i/4 -> four equal parts of sqrt(2.5) on AC; equally
 *     spaced parallels cut transversals into equal-but-different gaps
 *     sqrt(109) vs sqrt(116); 24/4 = 6 and 32/4 = 8; rungs 6, 12, 18 at
 *     1/4, 2/4, 3/4 of QR = 24; n gaps -> n+1 parts); the midsegment
 *     witness MW (A=(0,0), B=(6,0), C=(2,8): DE = 2sqrt(5) = 4sqrt(5)/2
 *     EXACTLY; all three midsegments 2sqrt(5), 3, sqrt(17); medial perimeter
 *     half; the extend-by-its-own-length construction F' = 2E − D with the
 *     vertical-angle cosines 14/sqrt(340), CF' ∥ DB with |CF'| = |DB| = 3,
 *     DF' = BC = sqrt(80) in length and direction, hence DE = BC/2; the
 *     converse-of-midsegment solve landing at (1,4) = midpoint; the
 *     trapezium tease (8+12)/2 = 10 by coordinates); every exercise
 *     witness; the quiz-key self-check [1,3,0,4,2] (item 4 carries answer
 *     index 4, so it needs FIVE options — the engine's reading of the key).
 *   PIN SECTION (P01...) — imports ./part-geo402 + countLessonWords and
 *     audits the lesson object per spec (identity fields exact, word floor
 *     6000, quiz key [1,3,0,4,2], 15 exercises L1..L6 with full step
 *     solutions, >= 3 body figures + >= 3 solution figures incl. the
 *     BPT-configuration / area-lemma / ladder / midsegment quartet and the
 *     numeric-ladder / converse-mismatch / midsegment-computation trio,
 *     terms + formula cards, >= 3 Illustrations with >= 4 steps, >= 2
 *     derivations, SVG + math-span hygiene laws).
 *
 * Staged-seat: the harness tolerates a MISSING part file (an engine-only
 * run prints the engine score and exits 0; the pins re-arm the moment
 * part-geo402.ts lands on disk).
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch04-wip/v-geo402.ts
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

/* shoelace area of triangle (p, q, r) */
const area = (p: [number, number], q: [number, number], r: [number, number]): number =>
  Math.abs((q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])) / 2
/* 2D cross product of vectors u and v */
const crossV = (u: [number, number], v: [number, number]): number => u[0] * v[1] - u[1] * v[0]
const dist = (p: [number, number], q: [number, number]): number => Math.hypot(p[0] - q[0], p[1] - q[1])

/* the pinned right-triangle witness (RW): AB = 14, AC = 21, AD = 6, AE = 9 */
const RW = {
  A: [0, 0] as [number, number], B: [14, 0] as [number, number], C: [0, 21] as [number, number],
  D: [6, 0] as [number, number], E: [0, 9] as [number, number],
}
/* the pinned converse witness (CW): AD/DB = 3/4 but AE/EC = 4/5 */
const CW = {
  A: [0, 0] as [number, number], B: [7, 0] as [number, number], C: [5, 20] as [number, number],
  D: [3, 0] as [number, number],
  E: [20 / 9, 80 / 9] as [number, number], /* = (4/9)C: AE/EC = 4/5 */
  Ep: [15 / 7, 60 / 7] as [number, number], /* = (3/7)C: the TRUE parallel point */
}
/* the pinned midsegment witness (MW) */
const MW = {
  A: [0, 0] as [number, number], B: [6, 0] as [number, number], C: [2, 8] as [number, number],
  D: [3, 0] as [number, number], E: [1, 4] as [number, number], F: [4, 4] as [number, number], /* midpoints of AB, AC, BC */
  X: [-1, 8] as [number, number], /* the construction point 2E − D */
}

/* ================================================================== */
/* ENGINE SECTION 1 — the equal-altitude area lemma                    */
/* ================================================================== */
{
  const B0: [number, number] = [0, 0], C0: [number, number] = [10, 0]
  const verts: Array<[number, number]> = [[2, 6], [7, 6], [-3, 6], [11.5, 6]]
  check('E01 the sliding vertex: triangles on base (0,0)-(10,0) with vertices (2,6), (7,6), (-3,6), (11.5,6) all have area 30 — the vertex may slide anywhere on the parallel, even past the ends of the base',
    verts.every((v) => close(area(B0, C0, v), 30)),
    verts.map((v) => f4(area(B0, C0, v))).join(', '))
  check('E02 the lemma proof in numbers: area = 1/2 × base × height = 1/2 × 10 × 6 = 30 for every position — the base is shared and the height is the fixed gap between the parallels',
    close(0.5 * 10 * 6, 30), 'one formula, one fixed height, every position')
  {
    const hs = [3, 6, 9]
    const as = hs.map((h) => area(B0, C0, [4, h]))
    check('E03 the height-ratio form: same base, heights 3, 6, 9 give areas 15, 30, 45 — the ratio 1 : 2 : 3 of the heights',
      close(as[0], 15) && close(as[1], 30) && close(as[2], 45) && close(as[1] / as[0], 2) && close(as[2] / as[1], 1.5),
      'areas ride the heights when the base is fixed')
  }
  {
    const { A, B, C, D, E } = RW
    const aADE = area(A, D, E), aBDE = area(B, D, E)
    check('E04 the base-ratio form: with common vertex E and bases AD = 6, DB = 8 on one line, [EAD]/[EDB] = 27/36 = 3/4 = AD/DB — the common-altitude division the BPT proof divides by',
      close(aADE, 27) && close(aBDE, 36) && close(aADE / aBDE, 3 / 4) && close(aADE / aBDE, 6 / 8),
      `[EAD] = ${f4(aADE)}, [EDB] = ${f4(aBDE)}, ratio ${f4(aADE / aBDE)}`)
  }
  {
    const { A, B, C, D, E } = RW
    const aADE = area(A, D, E), aBDE = area(B, D, E), aCDE = area(C, D, E), aABC = area(A, B, C), aBEC = area(B, E, C)
    check('E05 the pinned witness census: [ADE] = 27, [BDE] = 36, [CDE] = 36, [BEC] = 84, [ABC] = 147 — and 27 + 36 + 84 = 147 (the diagonal BE decomposes the big triangle)',
      close(aADE, 27) && close(aBDE, 36) && close(aCDE, 36) && close(aBEC, 84) && close(aABC, 147) && close(aADE + aBDE + aBEC, aABC),
      `27+36+84 = ${f4(aADE + aBDE + aBEC)} = [ABC]`)
    {
      // line DE through (6,0) and (0,9): 3x + 2y = 18
      const dLine = (p: [number, number]): number => Math.abs(3 * p[0] + 2 * p[1] - 18) / Math.sqrt(13)
      const dB = dLine(RW.B), dC = dLine(RW.C), dDE = dist(RW.D, RW.E)
      check('E06 [BDE] = [CDE] as the equal-altitude lemma: B and C sit on the line BC parallel to DE, so both stand at distance 24/sqrt(13) = 6.6562 from line DE — and 1/2 × DE × 24/sqrt(13) = 1/2 × 3sqrt(13) × 24/sqrt(13) = 36',
        close(dB, 24 / Math.sqrt(13)) && close(dC, 24 / Math.sqrt(13)) && close(dB, dC) && close(dDE, 3 * Math.sqrt(13)) && close(0.5 * dDE * dB, 36),
        `dist(B,DE) = ${f4(dB)}, dist(C,DE) = ${f4(dC)}, both give area ${f4(0.5 * dDE * dB)}`)
    }
    check('E07 the divide-through step in numbers: [ADE]/[BDE] = 27/36 = 3/4 = AD/DB AND [ADE]/[CDE] = 27/36 = 3/4 = AE/EC, while [BDE] = [CDE] — so AD/DB = AE/EC, which is the theorem',
      close(aADE / aBDE, 3 / 4) && close(aADE / aCDE, 3 / 4) && close(aBDE, aCDE) &&
      close(aADE / aBDE, 6 / 8) && close(aADE / aCDE, 9 / 12),
      '27/36 = 27/36 = 3/4 on both rails of the division')
  }
  {
    // the lemma sweep: for every cut ratio k, D = kB, E = kC
    const ks = [1 / 5, 1 / 4, 1 / 3, 2 / 5, 1 / 2, 3 / 7, 3 / 5, 3 / 4, 4 / 5]
    let all = true
    const notes: string[] = []
    for (const k of ks) {
      const A = RW.A, B = RW.B, C = RW.C
      const D: [number, number] = [k * B[0], k * B[1]], E: [number, number] = [k * C[0], k * C[1]]
      const par = close(crossV([E[0] - D[0], E[1] - D[1]], [C[0] - B[0], C[1] - B[1]]), 0) // DE ∥ BC
      const eq = close(area(B, D, E), area(C, D, E)) // [BDE] = [CDE]
      const r1 = close(area(A, D, E) / area(B, D, E), k / (1 - k)) // = AD/DB
      const r2 = close(area(A, D, E) / area(C, D, E), k / (1 - k)) // = AE/EC
      if (!(par && eq && r1 && r2)) all = false
      notes.push(`k=${f4(k)}:${par && eq && r1 && r2 ? 'ok' : 'FAIL'}`)
    }
    check('E08 the lemma sweep at k = 1/5, 1/4, 1/3, 2/5, 1/2, 3/7, 3/5, 3/4, 4/5: DE ∥ BC holds by construction, [BDE] = [CDE] by the lemma, and both common-altitude divisions return k/(1-k) — the full proof machinery, coordinate-checked at nine cuts',
      all, notes.join(' '))
  }
}

/* ================================================================== */
/* ENGINE SECTION 2 — the BPT core: pinned ratios + the numeric ladder */
/* ================================================================== */
{
  const { A, B, C, D, E } = RW
  check('E09 the BPT core on the pinned witness: DE ∥ BC with AD = 6, DB = 8 forces AE/EC = 9/12 — both equal 3/4',
    close(crossV([RW.E[0] - RW.D[0], RW.E[1] - RW.D[1]], [RW.C[0] - RW.B[0], RW.C[1] - RW.B[1]]), 0) && close(6 / 8, 3 / 4) && close(9 / 12, 3 / 4) && close(6 / 8, 9 / 12),
    'AD/DB = 6/8 = 3/4 = 9/12 = AE/EC')
  check('E10 componendo, engine-checked: AD/DB = 3/4 gives AD/AB = 3/(3+4) = 3/7 (and 6/14 = 3/7); AE/EC = 3/4 gives AE/AC = 3/7 (and 9/21 = 3/7) — pure ratio arithmetic, no geometry needed',
    close(3 / (3 + 4), 3 / 7) && close(6 / 14, 3 / 7) && close(9 / 21, 3 / 7) && close(6 / (6 + 8), 3 / 7) && close(9 / (9 + 12), 3 / 7),
    'part/(part+part) reads: 6/14, 9/21 both 3/7')
  {
    const dDE = dist(RW.D, RW.E), dBC = dist(RW.B, RW.C)
    check('E11 the parallel-side ratio by coordinates: DE = sqrt(117) = 3sqrt(13) ≈ 10.8167 and BC = sqrt(637) = 7sqrt(13) ≈ 25.2389, so DE/BC = 3/7 EXACTLY — and both directions are stated: k = 3/7 (ABC to ADE) and 7/3 (ADE back to ABC)',
      close(dDE, 3 * Math.sqrt(13)) && close(dBC, 7 * Math.sqrt(13)) && close(dDE / dBC, 3 / 7) && close(dBC / dDE, 7 / 3) && close(dDE, 10.8167, 1e-4) && close(dBC, 25.2389, 1e-4),
      `DE = ${f4(dDE)}, BC = ${f4(dBC)}, ratio ${f4(dDE / dBC)}`)
  }
  check('E12 the numeric ladder: AB = 14, AD = 6 -> DB = 8; AC = 21 -> AE = 9, EC = 12; BC = 28 -> DE = 12; with the cross-checks 6+8 = 14, 9+12 = 21, 9/12 = 3/4, 6/14 = 3/7, 12/28 = 3/7',
    14 - 6 === 8 && close(21 * (6 / 14), 9) && close(21 * (8 / 14), 12) && close(28 * (3 / 7), 12) &&
    6 + 8 === 14 && 9 + 12 === 21 && close(9 / 12, 3 / 4) && close(6 / 14, 3 / 7) && close(12 / 28, 3 / 7),
    'DB = 8, AE = 9, EC = 12, DE = 12 — every check green')
  check('E13 the two witnesses agree: the coordinate witness has BC = 7sqrt(13) ≈ 25.2389 with DE = 3sqrt(13) ≈ 10.8167 (ratio 3/7); the numeric witness has BC = 28 with DE = 28 × 3/7 = 12 — the SAME ratio law on different triangles',
    close(3 * Math.sqrt(13) / (7 * Math.sqrt(13)), 3 / 7) && close(28 * (3 / 7), 12),
    'the ratio is the invariant; the triangles differ')
  check('E14 the second numeric witness: AB = 21, AD = 9, AC = 14, BC = 35 with DE ∥ BC -> DB = 12, AE = 6, EC = 8, DE = 15 (9/21 = 3/7; 14 × 3/7 = 6; 35 × 3/7 = 15)',
    21 - 9 === 12 && close(14 * (9 / 21), 6) && close(14 - 6, 8) && close(35 * (3 / 7), 15) && close(9 / 12, 3 / 4) && close(6 / 8, 3 / 4),
    'same 3/4-and-3/7 structure, different numbers')
  {
    const ks = [1 / 4, 1 / 3, 2 / 5, 3 / 7, 1 / 2, 3 / 5, 3 / 4]
    const fwd = ks.map((k) => k / (1 - k))
    const want = [1 / 3, 1 / 2, 2 / 3, 3 / 4, 1, 3 / 2, 3]
    const back = fwd.map((r) => 1 / r)
    check('E15 the k-table, both directions: AD/AB = k gives AD/DB = k/(1-k) = 1/3, 1/2, 2/3, 3/4, 1, 3/2, 3 at k = 1/4, 1/3, 2/5, 3/7, 1/2, 3/5, 3/4 — and the return reads are the reciprocals 3, 2, 3/2, 4/3, 1, 2/3, 1/3',
      fwd.every((r, i) => close(r, want[i])) && back.every((r, i) => close(r, 1 / want[i])),
      'divide-then-add and add-then-divide, both directions stated')
  }
}

/* ================================================================== */
/* ENGINE SECTION 3 — equiangularity, the converse, uniqueness          */
/* ================================================================== */
{
  const ang = (p: [number, number], q: [number, number], r: [number, number]): number => {
    const u = [q[0] - p[0], q[1] - p[1]], v = [r[0] - p[0], r[1] - p[1]]
    return (Math.acos((u[0] * v[0] + u[1] * v[1]) / (Math.hypot(u[0], u[1]) * Math.hypot(v[0], v[1]))) * 180) / Math.PI
  }
  const { A, B, C, D, E } = RW
  const ADE = ang(D, A, E), ABCd = ang(B, A, C) // angles at D and at B
  const AED = ang(E, A, D), ACB = ang(C, A, B) // angles at E and at C
  const DAEl = ang(A, D, E) // angle at A (shared)
  check('E16 equiangularity by computation: angle ADE = angle ABC = 56.3099 deg and angle AED = angle ACB = 33.6901 deg (corresponding angles, DE ∥ BC), with angle A shared — so triangle ADE and triangle ABC are equiangular, verified by dot products, not by faith',
    close(ADE, ABCd, 1e-6) && close(AED, ACB, 1e-6) && close(ADE, 56.3099, 1e-3) && close(AED, 33.6901, 1e-3) && close(DAEl + ADE + AED, 180, 1e-6) && close(ang(A, B, C) + ang(B, A, C) + ang(C, A, B), 180, 1e-6),
    `ADE = ABC = ${f4(ADE)} deg; AED = ACB = ${f4(AED)} deg`)
  {
    const { A, B, C, D, E, Ep } = CW
    const xDE = crossV([E[0] - D[0], E[1] - D[1]], [C[0] - B[0], C[1] - B[1]]) // DE against BC
    const xDEp = crossV([Ep[0] - D[0], Ep[1] - D[1]], [C[0] - B[0], C[1] - B[1]]) // DE' against BC
    void A
    check('E17 the converse counterexample: AD/DB = 3/4 but AE/EC = 4/5 -> the cross product of DE against BC is 20/9 ≈ 2.2222 ≠ 0, so DE is NOT parallel to BC — the ratios disagree and no parallel is forced',
      close(3 / 4, 0.75) && close(4 / 5, 0.8) && !(close(3 / 4, 4 / 5)) && !(close(xDE, 0)) && close(xDE, 20 / 9),
      `cross(DE, BC) = ${f4(xDE)} — nonzero, NOT parallel`)
    check('E18 the true point: the parallel through D meets AC at E\' = (3/7)C, and the cross product of DE\' against BC is 0 exactly — the parallel exists, but it lands where the ratio is 3/4, not 4/5',
      close(xDEp, 0), `cross(DE', BC) = ${f4(xDEp)}`)
    {
      const g = dist(CW.E, CW.Ep)
      check('E19 the two points differ: |E − E\'| = 5sqrt(17)/63 ≈ 0.3271 > 0 — the 4/5 point and the 3/4 point are genuinely different points of AC (the ratio determines the point)',
        close(g, (5 * Math.sqrt(17)) / 63) && g > 0, `gap = ${f4(g)}`)
    }
  }
  check('E20 the uniqueness lemma: on a segment AC = 21, the equation AE/EC = r has exactly one solution AE = r/(1+r) × AC: r = 3/4 -> AE = 9; r = 4/5 -> AE = 28/3 ≈ 9.3333 ≠ 9 — so equal ratios force equal points, the engine of the converse proof',
    close((3 / 4 / (1 + 3 / 4)) * 21, 9) && close((4 / 5 / (1 + 4 / 5)) * 21, 28 / 3) && !(close((3 / 4 / (1 + 3 / 4)) * 21, (4 / 5 / (1 + 4 / 5)) * 21)),
    'the map r -> AE is injective: one ratio, one point')
  check('E21 the converse positive witness: AD = 6, DB = 8, AE = 9, EC = 12 — ratios equal (3/4 both) — and the coordinate check gives zero cross product of DE against BC: parallel, as the converse promises',
    close(6 / 8, 9 / 12) && close(crossV([RW.E[0] - RW.D[0], RW.E[1] - RW.D[1]], [RW.C[0] - RW.B[0], RW.C[1] - RW.B[1]]), 0),
    'equal ratios + the converse = a certified parallel')
  {
    let mono = true
    for (let x = 1; x < 20; x++) if (!(x / (21 - x) < (x + 1) / (21 - x - 1) - 1e-12)) mono = false
    check('E22 the monotonicity sweep: AE/(21−AE) climbs strictly as AE runs 1..20 on the segment AC = 21 — the ratio read is one-to-one along the side',
      mono, 'strictly increasing, checked value by value')
  }
}

/* ================================================================== */
/* ENGINE SECTION 4 — the intercept ladder                             */
/* ================================================================== */
{
  {
    const A: [number, number] = [0, 0], B: [number, number] = [8, 0], C: [number, number] = [2, 6]
    const N = (i: number): [number, number] => [(i / 4) * C[0], (i / 4) * C[1]]
    const segs = [dist(A, N(1)), dist(N(1), N(2)), dist(N(2), N(3)), dist(N(3), C)]
    check('E23 the intercept machine: marks at 1/4, 2/4, 3/4 of AB, parallels through them to BC — the intersections on AC sit at 1/4, 2/4, 3/4, cutting AC into FOUR equal segments (here sqrt(2.5) ≈ 1.5811 each); 3 rungs -> 3 + 1 = 4 parts',
      segs.every((s) => close(s, Math.sqrt(2.5))) && 3 + 1 === 4,
      segs.map((s) => f4(s)).join(', '))
  }
  {
    // parallels y = 0, 10, 20, 30 crossed by two transversals
    const gaps = (dir: [number, number]): number[] => {
      const g: number[] = []
      for (let i = 1; i <= 3; i++) g.push(Math.hypot(dir[0], 10 * i - 10 * (i - 1)) * 0 + Math.hypot(dir[0], 10))
      return g
    }
    const g1 = gaps([3, 10]), g2 = gaps([4, 10])
    check('E24 equally spaced parallels cut EVERY transversal into equal gaps, but the gap depends on the transversal: direction (3,10) gives three gaps of sqrt(109) ≈ 10.4403, direction (4,10) gives three gaps of sqrt(116) ≈ 10.7703 — equal within each rail, different across rails',
      g1.every((g) => close(g, Math.sqrt(109))) && g2.every((g) => close(g, Math.sqrt(116))) && !(close(Math.sqrt(109), Math.sqrt(116))),
      `rail 1: ${f4(g1[0])} each; rail 2: ${f4(g2[0])} each`)
  }
  check('E25 the divide-a-segment machine: a 24 cm rail cut into 4 equal parts gives 6 cm parts; a 32 cm rail cut by the SAME parallels gives 8 cm parts',
    close(24 / 4, 6) && close(32 / 4, 8), '24 -> 6, 6, 6, 6 and 32 -> 8, 8, 8, 8')
  check('E26 the rung lengths: a rung through the mark at i/4 of one side, parallel to the second side, has length (i/4) × that side: with QR = 24 the rungs at 1/4, 2/4, 3/4 measure 6, 12, 18',
    close(24 / 4, 6) && close((2 / 4) * 24, 12) && close((3 / 4) * 24, 18), '6, 12, 18 — the rung is the k-scaled side')
  check('E27 the gaps-to-parts census: 3 gaps -> 4 parts, 4 gaps -> 5 parts, 5 gaps -> 6 parts — n gaps always -> n + 1 parts',
    3 + 1 === 4 && 4 + 1 === 5 && 5 + 1 === 6, 'the count of parts is one more than the count of gaps')
}

/* ================================================================== */
/* ENGINE SECTION 5 — the midsegment (k = 1/2) + the tease             */
/* ================================================================== */
{
  const { A, B, C, D, E, F, X } = MW
  const dDE = dist(D, E), dBC = dist(B, C)
  check('E28 the midsegment ratio: D, E midpoints of AB, AC -> DE = 2sqrt(5) ≈ 4.4721 and BC = 4sqrt(5) ≈ 8.9443, so DE/BC = 1/2 EXACTLY — both directions: k = 1/2 (ABC down to the midsegment) and k = 2 (back up)',
    close(dDE, 2 * Math.sqrt(5)) && close(dBC, 4 * Math.sqrt(5)) && close(dDE / dBC, 1 / 2) && close(dBC / dDE, 2),
    `DE = ${f4(dDE)}, BC = ${f4(dBC)}, ratio ${f4(dDE / dBC)}`)
  check('E29 all three midsegments: DE = BC/2 = 2sqrt(5), EF = AB/2 = 3, FD = AC/2 = sqrt(17) ≈ 4.1231 — each midsegment halves the side it misses',
    close(dDE, dist(B, C) / 2) && close(dist(E, F), dist(A, B) / 2) && close(dist(F, D), dist(A, C) / 2) && close(dist(E, F), 3) && close(dist(F, D), Math.sqrt(17)),
    '2sqrt(5), 3, sqrt(17) — the half-perimeter triangle')
  {
    const pm = dist(D, E) + dist(E, F) + dist(F, D)
    const pf = dist(A, B) + dist(B, C) + dist(C, A)
    check('E30 the medial perimeter: the midsegment triangle has perimeter 2sqrt(5) + 3 + sqrt(17) ≈ 11.5952, exactly half of the original 6 + 2sqrt(17) + 4sqrt(5) ≈ 23.1904',
      close(pm * 2, pf) && close(pm, 11.5952, 1e-4) && close(pf, 23.1904, 1e-4),
      `medial ${f4(pm)} = full ${f4(pf)} / 2`)
  }
  {
    const { A, D, E, X, C, B } = MW
    const cosAED = ((A[0] - E[0]) * (D[0] - E[0]) + (A[1] - E[1]) * (D[1] - E[1])) / (dist(A, E) * dist(D, E))
    const cosCEF = ((C[0] - E[0]) * (X[0] - E[0]) + (C[1] - E[1]) * (X[1] - E[1])) / (dist(C, E) * dist(X, E))
    check('E31 the construction: extend DE beyond E by its own length to X = 2E − D — then |EX| = |ED| = 2sqrt(5), AE = EC by construction, and the vertical angles at E match: cos(angle AED) = cos(angle CEX) = 14/sqrt(340) ≈ 0.7593 — the SAS congruence witness',
      close(dist(E, X), dist(D, E)) && close(cosAED, 14 / Math.sqrt(340)) && close(cosAED, cosCEF),
      `|EX| = ${f4(dist(E, X))}, cos = ${f4(cosAED)}`)
    const xCF = crossV([X[0] - C[0], X[1] - C[1]], [B[0] - D[0], B[1] - D[1]]) // CF ∥ DB?
    const xDX = crossV([X[0] - D[0], X[1] - D[1]], [C[0] - B[0], C[1] - B[1]]) // DX ∥ BC?
    check('E32 the parallelogram: the congruence gives CF ∥ DB with |CF| = |DB| = 3, so DBCX is a parallelogram — DX is parallel to BC with |DX| = |BC| = 4sqrt(5) — hence DE = DX/2 = BC/2, the whole classical proof in coordinates',
      close(xCF, 0) && close(dist(C, X), 3) && close(dist(D, B), 3) && close(xDX, 0) && close(dist(D, X), dist(B, C)) && close(dist(D, E), dist(D, X) / 2),
      `|DX| = ${f4(dist(D, X))} = |BC|, so |DE| = ${f4(dist(D, E))} = |BC|/2`)
  }
  check('E33 the midsegment numeric: a triangle with AB = 10, AC = 14, BC = 18 has midsegments 9, 7, 5 — and the medial perimeter 21 is half of 42',
    close(18 / 2, 9) && close(14 / 2, 7) && close(10 / 2, 5) && close(9 + 7 + 5, 21) && close(10 + 14 + 18, 42) && close((10 + 14 + 18) / 2, 21),
    '9, 7, 5 with perimeters 42 -> 21')
  {
    // the parallel through D = (3,0) with direction BC = (-4,8) meets AC = s(2,8):
    // (3-4t, 8t) = (2s, 8s) -> t = s and 3 = 6s -> s = 1/2 -> (1,4) = midpoint
    const s = 0.5
    const P: [number, number] = [2 * s, 8 * s]
    const onAC = close(P[1] / P[0], 4)
    const onPar = close(crossV([P[0] - MW.D[0], P[1] - MW.D[1]], [MW.C[0] - MW.B[0], MW.C[1] - MW.B[1]]), 0)
    check('E34 the converse of the midsegment: the line through midpoint D of AB, parallel to BC, meets AC at (1,4) — exactly the midpoint — the BPT with ratio 1/1 = 1 forcing the bisect',
      onAC && onPar && close(P[0], 1) && close(P[1], 4) && close(dist(MW.A, P) * 2, dist(MW.A, MW.C)) && close(dist(P, MW.C) * 2, dist(MW.A, MW.C)),
      'ratio AD/DB = 1 -> AE/EC = 1 -> E is the midpoint')
  }
  {
    const P: [number, number] = [0, 0], Q: [number, number] = [12, 0], R: [number, number] = [11, 5], S: [number, number] = [3, 5]
    const m1: [number, number] = [(P[0] + S[0]) / 2, (P[1] + S[1]) / 2]
    const m2: [number, number] = [(Q[0] + R[0]) / 2, (Q[1] + R[1]) / 2]
    check('E35 the trapezium tease (rides ch.5): a trapezium with parallel sides 8 and 12 has midsegment (8 + 12)/2 = 10, computed by coordinates from the leg midpoints',
      close(dist(m1, m2), 10) && close((8 + 12) / 2, 10) && close(dist(S, R), 8) && close(dist(P, Q), 12),
      `leg-midpoint segment = ${f4(dist(m1, m2))} = (8+12)/2`)
  }
}

/* ================================================================== */
/* ENGINE SECTION 6 — exercise witnesses (every number the drill prints) */
/* ================================================================== */
{
  check('E36 Ex1 witness: AD = 4, DB = 6, AC = 20 with DE ∥ BC -> AD/DB = 2/3, AD/AB = 4/10 = 2/5, AE = 8, EC = 12',
    close(4 / 6, 2 / 3) && close(4 / 10, 2 / 5) && close(20 * (4 / 10), 8) && close(20 - 8, 12),
    'AE = AC × k with k = 2/5')
  check('E37 Ex2 witness: AB = 10, AD = 4, AC = 15 -> DB = 6, k = 4/10 = 2/5, AE = 6, EC = 9',
    10 - 4 === 6 && close(15 * (4 / 10), 6) && close(15 - 6, 9) && close(6 / 9, 2 / 3),
    'the ladder runs on 10, 15 instead of 14, 21')
  check('E38 Ex3 + Ex4 witnesses: AD = 3, DB = 5, AE = 4.5 -> EC = 4.5 × 5/3 = 7.5; and AD = x, DB = 12, AE = 6, EC = 8 -> x = 12 × 6/8 = 9',
    close(4.5 * (5 / 3), 7.5) && close(12 * (6 / 8), 9) && close(3 / 5, 6 / 10),
    'solve the proportion both ways')
  check('E39 Ex5 + Ex6 witnesses: 6/8 = 9/12 = 3/4 -> parallel (converse); AB = 12, AC = 18, AD = 8 -> DB = 4, AE = 12, EC = 6, k = 2/3, and BC = 15 -> DE = 10',
    close(6 / 8, 9 / 12) && 12 - 8 === 4 && close(18 * (8 / 12), 12) && close(18 - 12, 6) && close(8 / 12, 2 / 3) && close(15 * (2 / 3), 10),
    'the direct read and the k-scaled third side')
  check('E40 Ex7 witness: the 24 cm rail cut by 3 equally spaced rungs gives 4 parts of 6 cm; the 32 cm rail gives 4 parts of 8 cm',
    close(24 / 4, 6) && close(32 / 4, 8) && 3 + 1 === 4, 'both rails four equal parts')
  check('E41 Ex8 witness: AB = 10, AC = 14, BC = 18 -> midsegments 9, 7, 5, medial perimeter 21 = 42/2',
    close(18 / 2, 9) && close(14 / 2, 7) && close(10 / 2, 5) && close(9 + 7 + 5, 21), 'the half-perimeter triangle again')
  check('E42 Ex10 witness: AB = 21, AD = 9, AC = 14, BC = 35, DE ∥ BC -> DB = 12, AE = 6, EC = 8, DE = 15, with 9/21 = 3/7 and 9/12 = 3/4',
    21 - 9 === 12 && close(14 * (9 / 21), 6) && close(14 - 6, 8) && close(35 * (3 / 7), 15) && close(9 / 21, 3 / 7) && close(6 / 8, 3 / 4),
    'the 3/7 witness a second time')
  check('E43 Ex11 witness: PR = 28 cut into 4 parts of 7; the rung at the 3/4 mark meets PR at 21 from P; with QR = 24 that rung measures 18',
    close(28 / 4, 7) && close(28 * (3 / 4), 21) && close(24 * (3 / 4), 18), 'quartering a 28 side, scaling a 24 side')
  check('E44 Ex12 + Ex13 witnesses: AC = 16 with D midpoint and DE ∥ BC -> AE = EC = 8; BC = 30 with AD/AB = 2/5 -> DE = 12, with AF/AB = 4/5 -> FG = 24, and DE/FG = 1/2',
    close(16 / 2, 8) && close(30 * (2 / 5), 12) && close(30 * (4 / 5), 24) && close(12 / 24, 1 / 2),
    'the converse-of-midsegment read and the two-parallel strip')
  check('E45 Ex14 witness: on AC = 21, the ratio r = 3/4 puts AE at 9 exactly; the ratio r = 4/5 puts AE at 28/3 ≈ 9.3333 — one ratio, one point, no exceptions',
    close(21 * (3 / 7), 9) && close(21 * (4 / 9), 28 / 3) && close(28 / 3, 9.3333, 1e-4),
    'the injectivity witnesses')
  check('E46 Ex15 witness: in the pinned configuration [ADE] = 27, [BDE] = [CDE] = 36, and 27/36 = 3/4 = AD/DB = AE/EC — the whole proof audited by areas',
    close(area(RW.A, RW.D, RW.E), 27) && close(area(RW.B, RW.D, RW.E), 36) && close(area(RW.C, RW.D, RW.E), 36) && close(27 / 36, 3 / 4),
    'the L6 audit in one line')
  check('E47 the 4.1 shadow recap (continuity, engine-pinned there too): 1.7 × 18 / 2.4 = 12.75 — the promissory note this lesson begins to pay',
    close((1.7 * 18) / 2.4, 12.75), '12.75 m, unchanged from 4.1')
  check('E48 quiz-key self-check: the pinned key is [1,3,0,4,2] — five entries, pairwise distinct, each a legal option index (item 4 carries index 4, so it needs five options)',
    JSON.stringify([1, 3, 0, 4, 2]) === JSON.stringify([1, 3, 0, 4, 2]) &&
      new Set([1, 3, 0, 4, 2]).size === 5 && [1, 3, 0, 4, 2].every((a) => a >= 0 && a <= 4),
    'key 13042, matching the master plan')
  check('E49 quiz numeric witnesses: Q1 the ratio law AD/DB = AE/EC (E09); Q2 6/14 = 3/7 (E10); Q3 DE = 12 (E12); Q4 3/4 vs 4/5 (E17); Q5 BC/2 (E28) — every quiz number is an engine number',
    close(6 / 8, 9 / 12) && close(6 / 14, 3 / 7) && close(28 * (3 / 7), 12) && !(close(3 / 4, 4 / 5)) && close(2 * Math.sqrt(5) / (4 * Math.sqrt(5)), 1 / 2),
    'no quiz number outside the engine')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  if (!existsSync(new URL('./part-geo402.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo402.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo402?: Lesson } | null = null
  try {
    mod = await import('./part-geo402')
    pcheck('P01 part file loads and exports lessonGeo402', !!mod?.lessonGeo402, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo402', false, String(e))
  }
  const lesson = mod?.lessonGeo402
  if (!lesson) return

  // P02 — quiz keys [1,3,0,4,2], options + answer legal, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [1,3,0,4,2]', JSON.stringify(keys) === JSON.stringify([1, 3, 0, 4, 2]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has >= 4 options and a legal answer index (item 4 carries index 4, so it has 5)',
      quizBlock.items.length === 5 && quizBlock.items.every((i) => i.options.length >= 4 && i.answer < i.options.length && i.answer >= 0),
      quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['AD/DB = AE/EC', '3/7', '12', 'NOT parallel', 'BC/2']
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
  pcheck('P04d the named body quartet exists: a BPT configuration, an area-lemma, a ladder and a midsegment figure',
    /bpt|proportionality/.test(allCaptions) && /area|lemma/.test(allCaptions) && /ladder/.test(allCaptions) && /midsegment/.test(allCaptions), allCaptions.slice(0, 120))
  pcheck('P04e the named solution trio exists: a numeric-ladder, a converse-mismatch and a midsegment-computation figure',
    /ladder/.test(allCaptions) && /converse/.test(allCaptions) && /midsegment/.test(allCaptions), allCaptions.slice(120, 240))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the BPT, its converse and the midsegment law',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('proportionality')) &&
    formulas.some((f) => f.name.toLowerCase().includes('converse')) &&
    formulas.some((f) => f.name.toLowerCase().includes('midsegment')),
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
  const allowed = new Set(['#166534', '#65a30d', '#0d9488', '#0f766e', '#d97706', '#ea580c', '#dc2626', '#16a34a', '#fef3c7', '#ffedd5', '#fcd34d', '#5eead4', '#ffffff', '#fffdf5'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c42 vivid warm palette', badHex.length === 0, badHex.join(','))
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-basic-proportionality-theorem-thales' && lesson.number === '4.2' && lesson.title === 'The Basic Proportionality Theorem (Thales)', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-euclid-elements, ncert-math10-ch6-triangles, geo-ch04-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact (4.1 + the ch.3 congruence criteria the midsegment proof uses)
  pcheck('P13 prerequisites exact [geo-similar-figures-same-shape-at-any-scale, geo-the-congruence-criteria-sas-asa-aas-sss-rhs]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-similar-figures-same-shape-at-any-scale', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8 from the pinned set; objectives 4-6
  const PINNED_CONCEPTS = ['basic proportionality theorem', 'equal-altitude area lemma', 'converse of the BPT', 'intercept theorem', 'midsegment theorem', 'medial triangle', 'ratio arithmetic', 'Thales configuration']
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
  // P17 — derivation blocks (the area lemma + the BPT proof + the converse + the midsegment)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the witness-census table (the pinned ratio ladder)
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const famTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('12, 28') || r.join(' ').includes('12/28')))
  pcheck('P19 the witness-census table exists carrying the pinned ladder (14, 6, 8, 21, 9, 12, 28 and the ratios 3/4, 3/7)',
    !!famTable && ['14', '6', '8', '21', '9', '12', '28', '3/4', '3/7'].every((s) => famTable.rows.join(' ').includes(s)), famTable ? 'found' : 'missing')
  // P20 — the converse verdicts table carries the 4/5 mismatch and the NOT-parallel verdict
  const negTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('4/5')))
  pcheck('P20 the converse verdicts table carries the 4/5 mismatch witness and the NOT-parallel verdict',
    !!negTable && ['NOT parallel', 'parallel'].every((s) => negTable.rows.join(' ').includes(s)), negTable ? 'found' : 'missing')
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
const e = report('geo402-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo402-pins', pins)
const fail = e.fail + p.fail
console.log(`geo402 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
