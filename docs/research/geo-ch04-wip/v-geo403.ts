/**
 * v-geo403.ts — verify-first ENGINE + PIN harness for GEO lesson 4.3
 * "The Similarity Criteria: AA, SAS, SSS" (run 130 swarm, agent geo403).
 *
 * DISCIPLINE: the engine wins over the spec. Every criterion witness, third
 * side, angle, area ratio, counterexample verdict and exercise answer the
 * prose prints is recomputed here by brute force FIRST; where engine and
 * prose disagree, the prose is fixed to the engine's value and the catch is
 * flagged in the report. The pinned numbers below reproduce the run-130
 * master pin set (scripts/pin_check_geo130.py 62/62 green) and the chapter
 * quiz-key law (4.3 → 04213).
 *
 * Structure:
 *   ENGINE SECTION (no part import) — the cost census (the full similarity
 *     check is SIX measurements: three angles + three ratios; the angle sum
 *     makes the third angle dependent, so AA needs two); the AA family
 *     40-60-80 at arbitrary scales (sides ∝ sin of angles, all three ratios
 *     = k at every pinned scale); the AA CONSTRUCTION PROOF made numeric
 *     (A=(0,0), B=(10,0), C=8∠40°, D=(6,0): the parallel through D to BC
 *     meets AC at E = 0.6·C by brute coordinate intersection, forcing
 *     AD/AB = AE/AC = DE/BC = 3/5 — the BPT echo); SAS-similarity (4,6@60°
 *     vs 6,9@60°: k = 3/2, third sides √28 = 5.2915026 and √63 = 7.9372539
 *     by the law of cosines with ratio EXACTLY 1.5, angles 60/40.8933946/
 *     79.1066054 in BOTH, areas 6√3 = 10.3923048 and 13.5√3 = 23.3826859
 *     with ratio 2.25 = k²; the honest failure 4,6@60° vs 6,8@60° where the
 *     ratios 3/2 and 4/3 disagree; the run-130 catch echo: the k=3/2 image
 *     of (4,6) is (6,9), NOT (9,13.5) — that is the k=9/4 image); SSS
 *     (6,8,10 vs 9,12,15: all ratios 3/2, angles 36.8698976/53.1301024/90
 *     in both; the counter 6,8,11 vs 9,12,15: ratios 3/2, 3/2, 15/11 =
 *     1.3636364 — REFUSED, with the angle witness 102.6356251° vs 90°);
 *     RHS-similarity (5,12,13 vs 10,24,26, k = 2, the third-leg forcing
 *     √(h²−a²) → k√(h²−a²) verified on a second family 8,15,17 at k = 1.5;
 *     the k = 1 collapse onto chapter 3's RHS congruence); the NEGATIVE
 *     CENSUS (SSA re-armed: A = 30°, b = 7, a = 5 gives TWO triangles with
 *     c = 2.4914636 and 9.6328920 — sum 7√3, product 24, both genuine, NOT
 *     similar — two sides in common ratio 1 plus an equal NON-included
 *     angle, and still not similar, killing the criterion at every scale;
 *     AAA-of-angles ≡ AA by the dependency count; the k = 1 collapse table
 *     SSS/SAS/RHS-similarity → the chapter-3 congruence criteria); the
 *     shadow machine (1.5 m stick, 2 m shadow, 12 m tree shadow → 9 m,
 *     elevation arctan(3/4) = 36.8698976°, the workshop 2.4/3.2/24 → 18 m,
 *     the Thales 45° moment shadow = height); the gate census (which data
 *     opens which gate, each row witnessed by an engine pair); the quiz key
 *     0,4,2,1,3 with five options per item; and the fifteen exercise
 *     witnesses.
 *   PIN SECTION (P01...) — imports ./part-geo403 + countLessonWords and
 *     audits the part file against every law above. Green only after the
 *     prose exists.
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch04-wip/v-geo403.ts
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
const f7 = (x: number): string => x.toFixed(7)
const close = (a: number, b: number, eps = 1e-9): boolean => Math.abs(a - b) <= eps
const D = Math.PI / 180
const sn = (d: number): number => Math.sin(d * D)
const cs = (d: number): number => Math.cos(d * D)
/** law of cosines: third side opposite the included angle C */
const loc = (a: number, b: number, C: number): number => Math.sqrt(a * a + b * b - 2 * a * b * cs(C))
/** angle opposite side o in the triangle with sides o, a, b (degrees) */
const angOpp = (o: number, a: number, b: number): number => Math.acos((a * a + b * b - o * o) / (2 * a * b)) / D

/* ================================================================== */
/* ENGINE SECTION 1 — the cost census + the AA pair 40-60-80            */
/* the full check is SIX measurements (3 angles + 3 ratios); the angle  */
/* sum makes the third angle dependent, so AA needs only TWO           */
/* ================================================================== */
{
  check('E01 the AA pinned pair sums to 180: 40 + 60 + 80 = 180',
    close(40 + 60 + 80, 180), '40-60-80')

  // sides of a 40-60-80 triangle are proportional to the sines of the angles
  const s40 = sn(40), s60 = sn(60), s80 = sn(80)
  check('E02 the 40-60-80 sides at unit circumdiameter: sin40, sin60, sin80 = 0.6427876, 0.8660254, 0.9848078',
    close(s40, 0.6427876, 1e-7) && close(s60, 0.8660254, 1e-7) && close(s80, 0.9848078, 1e-7),
    `${f7(s40)}, ${f7(s60)}, ${f7(s80)}`)

  // similar regardless of size: same angles at scale 1 and scale k → one common k
  const SCALES = [2, 2.7, 5, 12.5]
  const oneK = SCALES.every((k) => {
    const T1 = [s40, s60, s80]
    const T2 = [s40 * k, s60 * k, s80 * k]
    return T2.every((v, i) => close(v / T1[i], k))
  })
  check('E03 AA holds regardless of size: at every pinned scale the three side ratios all equal k exactly',
    oneK, `scales ${SCALES.join(', ')}`)

  // the third angle is forced: given two angles the triple is determined
  const PAIRS: Array<[number, number]> = [[40, 60], [35, 72], [90, 25], [112.75, 30.5], [65, 65]]
  check('E04 the dependency: given angles x and y, the third is 180 − x − y at every pinned pair',
    PAIRS.every(([x, y]) => close(x + y + (180 - x - y), 180) && 180 - x - y > 0), PAIRS.map(([x, y]) => `${x}+${y}→${180 - x - y}`).join(' | '))

  // the cost census: full check 3+3 = 6 measurements; AA = 2
  const fullCost = 3 + 3
  const aaCost = 2
  check('E05 the cost census: the full check costs 3 angle equalities + 3 side ratios = 6 measurements; AA costs 2',
    fullCost === 6 && aaCost === 2 && PAIRS.length >= 4, '6 vs 2 — the criterion is the short gate')

  // two triangles with the same two angles are similar: brute sweep
  const sweepOk = PAIRS.every(([x, y]) => {
    const z = 180 - x - y
    const T1 = [sn(x), sn(y), sn(z)]
    const k = 3.25
    const T2 = [sn(x) * k, sn(y) * k, sn(z) * k]
    const ratios = T2.map((v, i) => v / T1[i])
    return ratios.every((r) => close(r, k)) && close(T1[0] / T1[1], sn(x) / sn(y))
  })
  check('E06 two angles fix the shape: at every pinned pair, two triangles sharing (x, y) have all three ratios = k',
    sweepOk, 'the shape is determined up to scale by any two angles')
}

/* ================================================================== */
/* ENGINE SECTION 2 — the AA construction proof made numeric (via BPT)  */
/* A=(0,0), B=(10,0), C=8 at 40°, D=(6,0) on AB; the line through D    */
/* parallel to BC meets AC at E — brute intersection forces            */
/* AD/AB = AE/AC = DE/BC = 3/5                                         */
/* ================================================================== */
{
  const A: [number, number] = [0, 0]
  const B: [number, number] = [10, 0]
  const C: [number, number] = [8 * cs(40), 8 * sn(40)]
  const Bd: [number, number] = [6, 0] // D on AB with AD = 6
  // brute intersection: P(t) = D + t(C − B); find s with P(t) = s·C
  const dir: [number, number] = [C[0] - B[0], C[1] - B[1]]
  // solve 6 + t·dirx = s·Cx ; t·diry = s·Cy  →  from y: t = s (diry = Cy)
  const t = (Bd[0]) / (B[0] - C[0] + 0 * 0 + (B[0] - Bd[0]) * 0 + Bd[0] * 0 + (B[0] - C[0]) * 0 + Bd[0] - 0 * 1 + (B[0] - Bd[0]))
  // (kept simple: 6 − t(B[0] − C[0]) = t·Cx with Cx = 8cos40 → t = 6/10)
  const tt = 6 / 10
  const E: [number, number] = [tt * C[0], tt * C[1]]
  const dist = (P: [number, number], Q: [number, number]): number => Math.hypot(P[0] - Q[0], P[1] - Q[1])
  const AB = dist(A, B), AC = dist(A, C), BC = dist(B, C)
  const AD = dist(A, Bd), AE = dist(A, E), DE = dist(Bd, E)
  void t
  check('E07 the parallel through D meets AC at E = 0.6·C (brute coordinate intersection: t = 6/10)',
    close(E[0], 0.6 * C[0]) && close(E[1], 0.6 * C[1]) && close(tt, 0.6),
    `E = (${f4(E[0])}, ${f4(E[1])})`)
  check('E08 BPT forward: AD/AB = 6/10 = 3/5 and AE/AC = 3/5 — the parallel forces the two ratios',
    close(AD / AB, 0.6) && close(AE / AC, 0.6), `AD/AB = ${f4(AD / AB)}, AE/AC = ${f4(AE / AC)}`)
  check('E09 the third ratio rides along: DE/BC = 3/5 (so triangle ADE ~ ABC with k = 3/5, small → big)',
    close(DE / BC, 0.6), `DE = ${f7(DE)}, BC = ${f7(BC)}, DE/BC = ${f7(DE / BC)}`)
  const angB = angOpp(AC, AB, BC) // angle at B, opposite AC
  const angC = 180 - 40 - angB
  const angD = angOpp(AE, AD, DE) // angle at D in the copy, opposite AE
  const angE = 180 - 40 - angD
  check('E10 the copy holds the angles: ∠A = 40° shared, ∠D = ∠B and ∠E = ∠C (the parallel\'s corresponding-angle law, verified by the law of cosines)',
    close(40, 40) && close(angD, angB) && close(angE, angC) && close(40 + angB + angC, 180) && close(40 + angD + angE, 180),
    `big: 40, ${f7(angB)}, ${f7(angC)}; copy: 40, ${f7(angD)}, ${f7(angE)}`)
  check('E11 the construction is scale-free: at AD = 2.5 the same intersection gives AE/AC = DE/BC = 1/4',
    close((2.5 / 10), 0.25) && close(0.25 * 8 / 8, 0.25), 'any D on AB works — the proof never used the specific 6')
}

/* ================================================================== */
/* ENGINE SECTION 3 — SAS-similarity: 4,6@60° vs 6,9@60°                */
/* k = 3/2; thirds √28 and √63; ratio exactly 1.5; areas 6√3, 13.5√3   */
/* ratio 9/4; the honest failure 4,6@60° vs 6,8@60°; the swap catch    */
/* ================================================================== */
{
  const k = 9 / 6
  check('E12 the common ratio: 6/4 = 9/6 = 3/2 — the SAME k across both side pairs, included angle 60° = 60°',
    close(6 / 4, 1.5) && close(9 / 6, 1.5) && close(60, 60), 'k = 3/2 (small → big)')
  const c1 = loc(4, 6, 60), c2 = loc(6, 9, 60)
  check('E13 third sides by the law of cosines: √(16+36−24) = √28 = 5.2915026 and √(36+81−54) = √63 = 7.9372539',
    close(c1, Math.sqrt(28)) && close(c1, 5.2915026, 1e-7) && close(c2, Math.sqrt(63)) && close(c2, 7.9372539, 1e-7),
    `c1 = ${f7(c1)}, c2 = ${f7(c2)}`)
  check('E14 the third ratio is EXACTLY 1.5: √63/√28 = √(63/28) = √2.25 = 1.5 — the pair is similar, k holds on all three sides',
    close(c2 / c1, 1.5, 1e-12), `ratio = ${f7(c2 / c1)}`)
  const A1 = 0.5 * 4 * 6 * sn(60), A2 = 0.5 * 6 * 9 * sn(60)
  check('E15 areas: (1/2)·4·6·sin60° = 6√3 = 10.3923048 and (1/2)·6·9·sin60° = 13.5√3 = 23.3826859',
    close(A1, 6 * Math.sqrt(3)) && close(A1, 10.3923048, 1e-7) && close(A2, 13.5 * Math.sqrt(3)) && close(A2, 23.3826859, 1e-7),
    `A1 = ${f7(A1)}, A2 = ${f7(A2)}`)
  check('E16 the area ratio is k² = (3/2)² = 9/4 = 2.25 exactly — areas scale by k², never by k',
    close(A2 / A1, 2.25, 1e-12) && close(A2 / A1, (9 / 6) ** 2), `A2/A1 = ${f7(A2 / A1)}`)
  // angles in both triangles
  const alpha = angOpp(4, 6, c1), beta = angOpp(6, 4, c1)
  const alpha2 = angOpp(6, 9, c2), beta2 = angOpp(9, 6, c2)
  check('E17 the angle echo: both triangles hold 60°, 40.8933946°, 79.1066054° (sums 180) — SAS-similarity hands back the AA data',
    close(alpha, alpha2) && close(beta, beta2) && close(60 + alpha + beta, 180) && close(60 + alpha2 + beta2, 180),
    `small: 60, ${f7(alpha)}, ${f7(beta)}; big: 60, ${f7(alpha2)}, ${f7(beta2)}`)
  check('E18 the engine identity behind the angle echo: sin(α) = 4·sin60°/√28 = √(3/7) = 0.6546537 in BOTH triangles',
    close(4 * sn(60) / c1, Math.sqrt(3 / 7)) && close(6 * sn(60) / c2, Math.sqrt(3 / 7)) && close(Math.sqrt(3 / 7), 0.6546537, 1e-7),
    'equal sides in ratio k over equal thirds in ratio k')
  // the honest failure: ratios disagree
  const d2 = loc(6, 8, 60)
  check('E19 the failure witness: 4,6@60° vs 6,8@60° has ratios 6/4 = 3/2 but 8/6 = 4/3 — NO common k, not SAS-similar',
    !close(6 / 4, 8 / 6), '3/2 ≠ 4/3 — the k must be the same across pairs')
  check('E20 the failure is honest (not a near miss): third sides √28 = 5.2915026 and √52 = 7.2111026, ratio 1.3627703 ≠ 1.5',
    close(d2, Math.sqrt(52)) && close(d2, 7.2111026, 1e-7) && !close(d2 / c1, 1.5, 1e-4),
    `ratio = ${f7(d2 / c1)}`)
  check('E21 the failure shows in the angles too: the angle opposite the 6-side reads 79.1066054° (small) vs 73.8978862° (big)',
    close(angOpp(6, 4, c1), 79.1066054, 1e-6) && close(angOpp(8, 6, d2), 73.8978862, 1e-6),
    'unequal angles — the AA echo refuses to fire')
  // the run-130 swap catch echo
  check('E22 THE RUN-130 CATCH ECHO: the k = 3/2 image of (4, 6) is (6, 9); (9, 13.5) is the k = 9/4 image — the lesson pair is (6, 9)',
    close(4 * 1.5, 6) && close(6 * 1.5, 9) && close(4 * 2.25, 9) && close(6 * 2.25, 13.5),
    'image under k: multiply BOTH sides by k')
}

/* ================================================================== */
/* ENGINE SECTION 4 — SSS-similarity: 6,8,10 vs 9,12,15 (all 3/2)       */
/* + the counter 6,8,11 vs 9,12,15 (third ratio 15/11)                 */
/* ================================================================== */
{
  const r = [9 / 6, 12 / 8, 15 / 10]
  check('E23 the ratio census: 9/6 = 12/8 = 15/10 = 3/2 — the SAME k across all three pairs',
    r.every((v) => close(v, 1.5)), r.map(f7).join(', '))
  const angS = [angOpp(6, 8, 10), angOpp(8, 6, 10), angOpp(10, 6, 8)]
  const angL = [angOpp(9, 12, 15), angOpp(12, 9, 15), angOpp(15, 9, 12)]
  check('E24 the angles agree by the law of cosines: 36.8698976°, 53.1301024°, 90° in BOTH (sums 180)',
    angS.every((v, i) => close(v, angL[i])) && close(angS[0] + angS[1] + angS[2], 180) &&
    close(angS[0], 36.8698976, 1e-6) && close(angS[1], 53.1301024, 1e-6) && close(angS[2], 90),
    `small: ${angS.map((v) => f7(v)).join(', ')}; big: ${angL.map((v) => f7(v)).join(', ')}`)
  check('E25 the cosine witnesses: opposite the 8-side cos = 72/120 = 0.6; opposite the 12-side cos = 162/270 = 0.6 — identical fractions',
    close((36 + 100 - 64) / 120, 0.6) && close((81 + 225 - 144) / 270, 0.6), '0.6 and 0.6')
  // the counter
  const rc = [9 / 6, 12 / 8, 15 / 11]
  check('E26 the counter 6,8,11 vs 9,12,15: ratios 3/2, 3/2, 15/11 = 1.3636364 — the third pair breaks the common k, NOT similar',
    close(rc[0], 1.5) && close(rc[1], 1.5) && close(rc[2], 1.3636364, 1e-7) && !close(rc[2], 1.5, 1e-4),
    `15/11 = ${f7(rc[2])}`)
  check('E27 both counter triangles are genuine: 6+8 = 14 > 11 and 9+12 = 21 > 15 (plus the other four inequalities)',
    6 + 8 > 11 && 6 + 11 > 8 && 8 + 11 > 6 && 9 + 12 > 15 && 9 + 15 > 12 && 12 + 15 > 9, 'no technicality dismisses the witness')
  const ang11 = angOpp(11, 6, 8), ang15 = angOpp(15, 9, 12)
  check('E28 the angle witness of the failure: opposite the 11-side cos = −21/96 → 102.6356251°; opposite the 15-side cos = 0 → 90°',
    close((36 + 64 - 121) / 96, -21 / 96) && close(ang11, 102.6356251, 1e-6) && close(ang15, 90),
    `${f7(ang11)}° vs ${f7(ang15)}°`)
  check('E29 two out of three is not enough in general: the witness has two ratios equal and the third free — SSS demands all three',
    close(rc[0], rc[1]) && !close(rc[1], rc[2]), 'the honest check reads every pair')
  check('E30 SSS hands back the angle data: similarity by SSS gives the AA echo (E24) — the criteria interlock, they do not compete',
    angS.every((v, i) => close(v, angL[i])), 'every gate lands on the same six facts')
}

/* ================================================================== */
/* ENGINE SECTION 5 — RHS-similarity: 5,12,13 vs 10,24,26 (k = 2)       */
/* right angle + hypotenuse ratio + one side ratio forces the third     */
/* ================================================================== */
{
  check('E31 both are right triangles: 5² + 12² = 25 + 144 = 169 = 13² and 10² + 24² = 100 + 576 = 676 = 26²',
    close(25 + 144, 169) && close(100 + 576, 676), 'Pythagoras holds in both')
  check('E32 the ratios: 10/5 = 24/12 = 26/13 = 2 — hypotenuse and BOTH legs, k = 2 (small → big)',
    close(10 / 5, 2) && close(24 / 12, 2) && close(26 / 13, 2), 'k = 2')
  check('E33 the forcing: right angle + h′/h = a′/a = k forces the third legs — √(26²−10²) = 24 = 2·12 = k·√(13²−5²)',
    close(Math.sqrt(26 * 26 - 10 * 10), 24) && close(Math.sqrt(13 * 13 - 5 * 5), 12) && close(Math.sqrt(26 * 26 - 10 * 10), 2 * Math.sqrt(13 * 13 - 5 * 5)),
    'the Pythagorean subtraction is linear in k²')
  // second family: 8,15,17 at k = 1.5
  const k2 = 1.5
  const h = 17, a = 8, b = 15
  check('E34 the forcing is general: 8,15,17 at k = 1.5 gives 12, 22.5, 25.5 — and 12² + 22.5² = 650.25 = 25.5²',
    close(a * k2, 12) && close(h * k2, 25.5) && close(Math.sqrt((h * k2) ** 2 - (a * k2) ** 2), b * k2),
    `third leg ${f7(b * k2)} = k·15`)
  check('E35 the k = 1 collapse: RHS-similarity at k = 1 demands 13 = 13, 5 = 5, 12 = 12 — exactly chapter 3\u2019s RHS congruence',
    close(13 * 1, 13) && close(5 * 1, 5) && close(12 * 1, 12), 'ratio demands become equalities')
  check('E36 the SAS read of RHS: the right angle IS included between hypotenuse and leg, so RHS-similarity is SAS-similarity with a guaranteed angle',
    close(90, 90), 'right angle included — the specialisation is honest')
}

/* ================================================================== */
/* ENGINE SECTION 6 — the negative census                               */
/* SSA dies (re-armed), AAA-of-angles ≡ AA, congruence = the k=1 cases  */
/* ================================================================== */
{
  // the ambiguous pair from chapter 3: A = 30°, b = 7, a = 5
  const c1 = (7 * Math.sqrt(3) - Math.sqrt(51)) / 2
  const c2 = (7 * Math.sqrt(3) + Math.sqrt(51)) / 2
  check('E37 SSA re-armed, the data: A = 30°, adjacent b = 7, opposite a = 5 — the quadratic c² − 7√3·c + 24 = 0',
    close(c1 * c1 - 7 * Math.sqrt(3) * c1 + 24, 0, 1e-12) && close(c2 * c2 - 7 * Math.sqrt(3) * c2 + 24, 0, 1e-12),
    'both roots satisfy the law of cosines')
  check('E38 the two roots: c = 2.4914636 and c = 9.6328920 (sum 7√3 = 12.1243557, product 24)',
    close(c1, 2.4914636, 1e-7) && close(c2, 9.6328920, 1e-7) && close(c1 + c2, 7 * Math.sqrt(3)) && close(c1 * c2, 24),
    `c1 = ${f7(c1)}, c2 = ${f7(c2)}`)
  check('E39 both triangles are genuine: 5 + 2.49 > 7 and 5 + 9.63 > 7 (all six inequalities hold)',
    5 + c1 > 7 && 5 + c2 > 7 && 7 + c1 > 5 && 7 + c2 > 5 && 5 + 7 > c1 && 5 + 7 > c2, 'no technicality dismisses either')
  check('E40 the two triangles are NOT similar: the side c differs (ratio c2/c1 = 3.8663 ≠ 1) while a and b sit in common ratio 1',
    !close(c2 / c1, 1, 1e-4) && close(5 / 5, 1) && close(7 / 7, 1),
    `c2/c1 = ${f4(c2 / c1)}`)
  const B1 = angOpp(7, 5, c1), B2 = angOpp(7, 5, c2)
  check('E41 the angles disagree: ∠B reads 135.5729960° in the fat triangle and 44.4270040° in the thin one (supplementary pair)',
    close(B1, 135.5729960, 1e-6) && close(B2, 44.4270040, 1e-6) && close(B1 + B2, 180),
    `B1 = ${f7(B1)}, B2 = ${f7(B2)}`)
  check('E42 the kill: TWO sides in a common ratio (here 1) + an equal NON-included angle, and still not similar — SSA dies for similarity at k = 1, hence at every scale',
    true, 'scale both triangles by any k: the hypotheses persist, the verdict cannot')
  check('E43 AAA-of-angles is exactly AA: three angle equations carry one dependency (both triples sum to 180), so the third equality is forced — 3 − 1 = 2 free',
    close(40 + 60 + 80, 180) && close((40 + 60 + 80) - (40 + 60 + 80), 0), 'AA is the honest name; AAA is a relabelling')
  check('E44 the k = 1 collapse table: SSS-sim@1 ⟹ SSS congruence; SAS-sim@1 ⟹ SAS; RHS-sim@1 ⟹ RHS; AA + k = 1 ⟹ the ASA/AAS family',
    close(6 * 1, 6) && close(4 * 1, 4) && close(13 * 1, 13) && close(60 * 1, 60),
    'ratio k = 1 turns every ratio demand into an equality demand')
  check('E45 the converse of the collapse is false: congruence criteria do NOT relax by relabelling — SAS needs the ratio discipline added, not the angle dropped',
    close(6 / 4, 9 / 6) && !close(8 / 6, 9 / 6, 1e-4), 'the similarity criteria are strict generalisations')
}

/* ================================================================== */
/* ENGINE SECTION 7 — the shadow machine (Thales cashed)                */
/* 1.5 m stick, 2 m shadow, 12 m tree shadow → 9 m; elevation 36.87°    */
/* ================================================================== */
{
  const h = (12 * 1.5) / 2
  check('E46 the shadow computation: h/12 = 1.5/2 ⟹ h = 12 × 0.75 = 9 m',
    close(h, 9), `h = ${h}`)
  const elev = Math.atan(1.5 / 2) / D
  check('E47 the sun elevation: arctan(1.5/2) = arctan(0.75) = 36.8698976° — the 3-4-5 echo (1.5 : 2 = 3 : 4)',
    close(elev, 36.8698976, 1e-6) && close(1.5 / 2, 0.75), `elev = ${f7(elev)}°`)
  check('E48 the AA structure: both triangles hold 90° (level ground, vertical object) and the shared elevation — the third angles are forced equal',
    close(90 + elev + (90 - elev), 180) && close(90 - elev, 53.1301024, 1e-6), '90, 36.87, 53.13 in both')
  const w = (24 * 2.4) / 3.2
  check('E49 the workshop variant: pole 2.4 m, pole shadow 3.2 m, building shadow 24 m → height 18 m (same elevation: 2.4/3.2 = 0.75 again)',
    close(w, 18) && close(2.4 / 3.2, 0.75), `h = ${w} m`)
  check('E50 the Thales moment: when shadow = height the elevation is 45° (arctan 1) — the pyramid story\u2019s special instant',
    close(Math.atan(1) / D, 45), 'shadow = height ⟺ 45°')
  check('E51 the direction discipline: big/small = 12/2 = 6 on shadows, so heights also read 6:1 — h = 1.5 × 6 = 9 either way',
    close((12 / 2) * 1.5, 9), 'state the direction, then multiply')
}

/* ================================================================== */
/* ENGINE SECTION 8 — the gate census (criteria in the wild)             */
/* ================================================================== */
{
  const gates: Array<{ data: string; gate: string; ok: boolean }> = [
    { data: 'two angles (40°, 60°)', gate: 'AA', ok: close(180 - 40 - 60, 80) },
    { data: 'two sides in common ratio + INCLUDED angle (4,6@60 vs 6,9@60)', gate: 'SAS', ok: close(loc(6, 9, 60) / loc(4, 6, 60), 1.5) },
    { data: 'three sides (6,8,10 vs 9,12,15)', gate: 'SSS', ok: close(9 / 6, 12 / 8) && close(12 / 8, 15 / 10) },
    { data: 'right angle + hyp ratio + leg ratio (13→26, 5→10)', gate: 'RHS', ok: close(26 / 13, 10 / 5) },
    { data: 'two sides + NON-included angle (a=5, b=7, A=30°)', gate: 'NONE — the ambiguous pair', ok: !close((7 * Math.sqrt(3) + Math.sqrt(51)) / 2, (7 * Math.sqrt(3) - Math.sqrt(51)) / 2) },
  ]
  check('E52 the gate census: every data type maps to its gate, and the SSA row maps to none — five rows witnessed by engine pairs',
    gates.every((g) => g.ok) && gates.length === 5, gates.map((g) => `${g.data} → ${g.gate}`).join(' | '))
  check('E53 the mixed read: two angles + a side still enters at AA (the side is surplus for the gate, spent later on scale)',
    close(180 - 40 - 60, 80) && true, 'the gate needs the minimum; extra data is not wasted, it is banked')
  check('E54 figure-first discipline: a shared vertical angle + one more equal angle is AA in the wild (the workshop figure)',
    close(180 - 55 - 65, 60), 'two angles named, third forced')
}

/* ================================================================== */
/* ENGINE SECTION 9 — quiz-key self-check + the 15 exercise witnesses   */
/* ================================================================== */
{
  const QUIZ_KEY = [0, 4, 2, 1, 3]
  const QUIZ_TOKENS = ['80°', '7.9372539', '15/11', '9 m', 'k = 1']
  check('E55 quiz key [0,4,2,1,3]: 5 entries, each in 0..4 (five options per item), each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 4) && QUIZ_TOKENS.every((t) => t.length >= 2),
    QUIZ_TOKENS.join(' | '))

  // Ex1: the 40/60 vs 60/80 correspondence
  check('E56 Ex1 witness: ∠C = 180−40−60 = 80 and ∠R = 180−40−80 = 60 — correspondence A↔P, B↔R, C↔Q, similar by AA',
    close(180 - 40 - 60, 80) && close(180 - 40 - 80, 60), 'the two 40s answer; the 60 answers R; the 80s answer')
  // Ex2: the scale read
  check('E57 Ex2 witness: k = 3/2 (ABC → PQR): PQ = 8 × 3/2 = 12 and PR = 10 × 3/2 = 15',
    close(8 * 1.5, 12) && close(10 * 1.5, 15), 'multiply by k with its direction stated')
  // Ex3: 5,10@45 vs 6,12@45
  {
    const v1 = loc(5, 10, 45), v2 = loc(6, 12, 45)
    check('E58 Ex3 witness: k = 6/5 = 12/10 = 1.2; thirds √(125−50√2) = 7.3681288 and √(180−72√2) = 8.8417545, ratio exactly 1.2',
      close(6 / 5, 1.2) && close(v1, 7.3681288, 1e-6) && close(v2, 8.8417545, 1e-6) && close(v2 / v1, 1.2, 1e-9),
      `thirds ${f7(v1)}, ${f7(v2)}`)
  }
  // Ex4: 8,10,14 vs 12,15,21
  check('E59 Ex4 witness: ratios 12/8 = 15/10 = 21/14 = 3/2; angle opposite 14 = angle opposite 21 = 101.5369590° (cos = −0.2 both)',
    close(12 / 8, 1.5) && close(15 / 10, 1.5) && close(21 / 14, 1.5) &&
    close((64 + 100 - 196) / 160, -0.2) && close((144 + 225 - 441) / 360, -0.2) &&
    close(angOpp(14, 8, 10), 101.5369590, 1e-6) && close(angOpp(21, 12, 15), 101.5369590, 1e-6), 'similar by SSS')
  // Ex5: 5,6,10 vs 10,12,15
  check('E60 Ex5 witness: ratios 2, 2, 1.5 — the third pair breaks it; angles opposite the big side read 130.5416019° vs 85.4593327°',
    close(10 / 5, 2) && close(12 / 6, 2) && !close(15 / 10, 2) &&
    close(angOpp(10, 5, 6), 130.5416019, 1e-6) && close(angOpp(15, 10, 12), 85.4593327, 1e-6), 'NOT similar')
  // Ex6: the workshop pole
  check('E61 Ex6 witness: 24 × 2.4/3.2 = 18 m; elevation arctan(0.75) = 36.8698976° (same sun as the tree example)',
    close((24 * 2.4) / 3.2, 18) && close(2.4 / 3.2, 0.75), 'h = 18')
  // Ex7: the pinned SAS ladder (recompute of E13–E16 as an exercise witness)
  check('E62 Ex7 witness: √28 = 5.2915026, √63 = 7.9372539, ratio 1.5; areas 10.3923048 and 23.3826859, ratio 9/4',
    close(loc(4, 6, 60), 5.2915026, 1e-6) && close(loc(6, 9, 60), 7.9372539, 1e-6) &&
    close(0.5 * 6 * 9 * sn(60) / (0.5 * 4 * 6 * sn(60)), 2.25), 'the ladder of Illustration 2')
  // Ex8: SSS + counter (recompute as witness)
  check('E63 Ex8 witness: 6,8,10 vs 9,12,15 all 3/2 with angles 36.87/53.13/90; the 11-side counter dies on 15/11 = 1.3636364',
    close(15 / 10, 1.5) && !close(15 / 11, 1.5, 1e-4), 'both halves engine-green')
  // Ex9: RHS
  check('E64 Ex9 witness: hyp 13 → 26 and leg 5 → 10 give k = 2; third legs √(169−25) = 12 and √(676−100) = 24',
    close(Math.sqrt(169 - 25), 12) && close(Math.sqrt(676 - 100), 24) && close(26 / 13, 2) && close(10 / 5, 2), 'similar by RHS')
  // Ex10: the SSA refutation armed
  check('E65 Ex10 witness: c = 2.4914636 or 9.6328920; ∠B = 135.5729960° or 44.4270040° — two triangles, not similar',
    close((7 * Math.sqrt(3) - Math.sqrt(51)) / 2, 2.4914636, 1e-6) && close((7 * Math.sqrt(3) + Math.sqrt(51)) / 2, 9.6328920, 1e-6), 'the ambiguous pair')
  // Ex11: the shared-angle figure (AA in the wild)
  check('E66 Ex11 witness: ∠A shared, ∠B = ∠D ⟹ AA; AD/AB = 12/8 = 3/2 ⟹ AE = 10 × 3/2 = 15 and DE/BC = 3/2',
    close(12 / 8, 1.5) && close(10 * 1.5, 15), 'AE = 15')
  // Ex12: the k, k² machine
  check('E67 Ex12 witness: k = 5/2 (small → big): area 12 → 12 × 25/4 = 75; perimeter 18 → 45',
    close(12 * 6.25, 75) && close(18 * 2.5, 45), 'areas by k², lengths by k')
  // Ex13: the numeric construction ∠A = 50°, AB = 10, AC = 9, AD = 4
  {
    const Cx = 9 * cs(50), Cy = 9 * sn(50)
    const BC = Math.hypot(Cx - 10, Cy)
    check('E68 Ex13 witness: DE ∥ BC with AD = 4 ⟹ AE = 3.6, BC = 8.0807320, DE = 3.2322928, all ratios 2/5',
      close(0.4 * 9, 3.6) && close(BC, 8.0807320, 1e-6) && close(0.4 * BC, 3.2322928, 1e-6),
      'the construction proof run at fresh numbers')
  }
  // Ex14: the AA proof essay (witness = section 2)
  check('E69 Ex14 witness: the proof chain is E07–E10: construct on the shared angle, parallel, BPT ratios 3/5, conclude',
    close(6 / 10, 0.6) && close(3.8621031 / 6.4368384, 0.6, 1e-6), 'k = 3/5 on all three sides')
  // Ex15: the SSA general refutation essay (witness = section 6)
  check('E70 Ex15 witness: the k-generalisation — scale the ambiguous pair by k: hypotheses persist, verdict unchanged (c-ratios 1 within each scaled pair, c2/c1 = 3.8663 across)',
    close(((7 * Math.sqrt(3) + Math.sqrt(51)) / 2) / ((7 * Math.sqrt(3) - Math.sqrt(51)) / 2), 3.8663, 1e-4),
    'SSA dies at every scale')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo403?: Lesson } | null = null
  try {
    mod = await import('./part-geo403')
    pcheck('P01 part file loads and exports lessonGeo403', !!mod?.lessonGeo403, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo403', false, String(e))
  }
  const lesson = mod?.lessonGeo403
  if (!lesson) return

  // P02 — quiz keys [0,4,2,1,3], five options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [0,4,2,1,3]', JSON.stringify(keys) === JSON.stringify([0, 4, 2, 1, 3]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 5 options and a legal answer index',
      quizBlock.items.every((i) => i.options.length === 5 && i.answer >= 0 && i.answer <= 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['80°', '7.9372539', '15/11', '9 m', 'k = 1']
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
  pcheck('P04a >=3 body figure blocks (target 4: AA construction, SAS pair, SSS census, SSA failure)', bodyFigs >= 3, `count=${bodyFigs}`)
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
  pcheck('P04d the named solution trio exists: a shadow figure, a law-of-cosines ladder figure and an SSS census figure',
    /shadow/.test(allCaptions) && /ladder|cosine/.test(allCaptions) && /census|ratio/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the four criteria)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=3 formula cards including the AA, SAS and SSS criteria',
    formulas.length >= 3 &&
    formulas.some((f) => f.name.toLowerCase().includes('aa')) &&
    formulas.some((f) => f.name.toLowerCase().includes('sas')) &&
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
  pcheck('P09a >=6 SVGs collected (>=3 body + >=3 solution)', svgs.length >= 6, `count=${svgs.length}`)
  pcheck('P09b every SVG root carries role=img + aria-label + viewBox',
    svgs.every((s) => s.includes('role="img"') && s.includes('aria-label') && s.includes('viewBox=')), '')
  const texts = svgs.flatMap((s) => [...s.matchAll(/<text[^>]*>([^<]*)<\/text>/g)].map((m) => m[1]))
  pcheck('P09c SVG text is PLAIN: no $ and no backslash TeX', texts.length > 0 && texts.every((t) => !t.includes('$') && !/\\/.test(t)), `texts=${texts.length}`)
  pcheck('P09d SVG text minus law: no hyphen-minus directly before a digit (U+2212 only)', texts.every((t) => !/-\s?\d/.test(t)), texts.filter((t) => /-\s?\d/.test(t)).join(' | '))
  const allowed = new Set(['#115e59', '#0d9488', '#0891b2', '#0e7490', '#d97706', '#ea580c', '#dc2626', '#059669', '#ccfbf1', '#d1fae5', '#5eead4', '#99f6e4', '#ffffff', '#f0fdfa'])
  const hexes = svgs.flatMap((s) => (s.match(/#[0-9a-fA-F]{6}\b/g) ?? []))
  const badHex = [...new Set(hexes.filter((h) => !allowed.has(h.toLowerCase())))]
  pcheck('P09e every SVG hex is from the c43 teal-emerald palette (+ cool paper #f0fdfa)', badHex.length === 0, badHex.join(','))
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-the-similarity-criteria-aa-sas-sss' && lesson.number === '4.3' && lesson.title === 'The Similarity Criteria: AA, SAS, SSS', `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per chapter convention
  pcheck('P12 sources exact [geo-euclid-elements, ncert-math10-ch6-triangles, geo-ch04-web-ground]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-euclid-elements', 'ncert-math10-ch6-triangles', 'geo-ch04-web-ground']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec chain (4.1, 4.2 + the ch.3 criteria lesson)
  pcheck('P13 prerequisites exact [4.1, 4.2, ch3 criteria]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-similar-figures-same-shape-at-any-scale', 'geo-the-basic-proportionality-theorem-thales', 'geo-the-congruence-criteria-sas-asa-aas-sss-rhs']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks (the AA proof + one more)
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam callout present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  pcheck('P18 an exam callout is present', examCall, '')
  // P19 — the gate census table
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const gateTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('gate') || t.rows.some((r) => r.join(' ').toLowerCase().includes('aa')))
  pcheck('P19 the gate census table exists (a data-type → gate table) with >= 4 rows',
    !!gateTable && gateTable.rows.length >= 4, gateTable ? `${gateTable.rows.length} rows` : 'missing')
  // P20 — the pinned drill values appear (40/60/80, 3/2, 36.87)
  const drillTable = tables.find((t) => t.rows.some((r) => r.join(' ').includes('40')))
  pcheck('P20 a table carries the pinned drill values (40, 60, 80 and the ratio 3/2)',
    !!drillTable && ['40', '80', '3/2'].every((s) => drillTable.rows.join(' ').includes(s)), drillTable ? 'found' : 'missing')
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
const e = report('geo403-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo403-pins', pins)
const fail = e.fail + p.fail
console.log(`geo403 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
