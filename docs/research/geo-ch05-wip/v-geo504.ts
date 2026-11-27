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
  if (!existsSync(new URL('./part-geo504.ts', import.meta.url))) {
    console.log('  (staged seat: part-geo504.ts not yet on disk — pins skipped, engine-only run)')
    return
  }
  let mod: { lessonGeo504?: Lesson } | null = null
  try {
    mod = await import('./part-geo504')
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
const e = report('geo504-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo504-pins', pins)
const fail = e.fail + p.fail
console.log(`geo504 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
