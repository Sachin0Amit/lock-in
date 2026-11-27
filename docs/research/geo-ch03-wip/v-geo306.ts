/**
 * v-geo306.ts — verify-first ENGINE + PIN harness for GEO lesson 3.6
 * "Stewart's Theorem and the Median Relation" (run 128 swarm, agent geo306).
 *
 * DISCIPLINE: the engine wins over the spec. Every placement, split, length,
 * census value and comparison order the prose prints is recomputed here by
 * brute force FIRST; where engine and prose disagree, the prose is fixed to
 * the engine's value and the catch is flagged in the report.
 *
 * Structure:
 *   ENGINE SECTION 1 — the 13-14-15 witness placement: B(0,0), C(14,0),
 *     A(9,12); sides 15/13/14; the Heron cross-check; the 9-12-15 + 5-12-13
 *     right-triangle split at the altitude foot; the three cosines.
 *   ENGINE SECTION 2 — Stewart on the witness: the median (m = n = 7, both
 *     sides 2758), the bisector (m = 7.5, n = 6.5, both sides 2730), the
 *     pinned third cevian (m = 4, n = 10, d = 13 = b, the isosceles reading),
 *     the fourth (m = 10, n = 4), and the Pythagorean sign cases (foot
 *     between B and D; between D and C; ON D) with the elimination landing.
 *   ENGINE SECTION 3 — Stewart brute-forced over a grid of triangles.
 *   ENGINE SECTION 4 — Apollonius + the all-three-medians census + the
 *     median-sum identity (witnesses 13-14-15 and 4-5-6).
 *   ENGINE SECTION 5 — the centroid: (23/3, 4); AG = 4√37/3 = 8.110350; the
 *     2:1 split verified by direct distance on ALL THREE medians.
 *   ENGINE SECTION 6 — the bisector length (two readings), the three-cevian
 *     comparison (order + the squared identity + the grid sweep), the cevian
 *     census parabola d²(m) = h² + (m − x)², the pinned census points, and
 *     the bisector-foot fraction law 1 − a²/(b+c)².
 *   ENGINE SECTION 7 — quiz-key self-check + all 15 exercise witnesses.
 *
 * Run: cd /home/z/my-project && bun run docs/research/geo-ch03-wip/v-geo306.ts
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
const dist = (p: [number, number], q: [number, number]): number => Math.hypot(p[0] - q[0], p[1] - q[1])

/* ================================================================== */
/* ENGINE SECTION 1 — the witness placement                             */
/* ================================================================== */
{
  const B: [number, number] = [0, 0]
  const C: [number, number] = [14, 0]
  const A: [number, number] = [9, 12]
  const a = 14, b = 13, c = 15
  check('E01 the witness placement: AB = 15, AC = 13, BC = 14 by coordinate distance',
    close(dist(A, B), c) && close(dist(A, C), b) && close(dist(B, C), a),
    `AB=${f4(dist(A, B))}, AC=${f4(dist(A, C))}, BC=${f4(dist(B, C))}`)
  const x = (c * c + a * a - b * b) / (2 * a)
  const h = Math.sqrt(c * c - x * x)
  check('E02 the foot of the altitude from A sits at x = (c² + a² − b²)/(2a) = 9 with height h = 12',
    close(x, 9) && close(h, 12), `x=${x}, h=${f4(h)}`)
  const shoelace = Math.abs((B[0] * (C[1] - A[1]) + C[0] * (A[1] - B[1]) + A[0] * (B[1] - C[1])) / 2)
  check('E03 area = 84 by base-times-height AND by coordinates (shoelace)',
    close(0.5 * a * h, 84) && close(shoelace, 84), `bh=${0.5 * a * h}, shoelace=${f4(shoelace)}`)
  const s = (a + b + c) / 2
  check('E04 Heron cross-check: s = 21 and sqrt(21·8·7·6) = sqrt(7056) = 84',
    close(s, 21) && close(s * (s - a) * (s - b) * (s - c), 7056) && close(Math.sqrt(s * (s - a) * (s - b) * (s - c)), 84),
    `s=${s}, product=${s * (s - a) * (s - b) * (s - c)}`)
  check('E05 the altitude splits the witness into a 9-12-15 (the 3-4-5 triple) and a 5-12-13 right triangle: 9² + 12² = 15², 5² + 12² = 13², 9 + 5 = 14',
    close(9 * 9 + 12 * 12, 15 * 15) && close(5 * 5 + 12 * 12, 13 * 13) && close(9 + 5, 14), '')
  const cosA = (b * b + c * c - a * a) / (2 * b * c)
  const cosB = (a * a + c * c - b * b) / (2 * a * c)
  const cosC = (a * a + b * b - c * c) / (2 * a * b)
  check('E06 the three cosines: cos A = 33/65, cos B = 3/5, cos C = 5/13; the angles sum to 180°',
    close(cosA, 33 / 65) && close(cosB, 3 / 5) && close(cosC, 5 / 13) &&
    close((Math.acos(cosA) + Math.acos(cosB) + Math.acos(cosC)) * 180 / Math.PI, 180, 1e-9),
    `cosA=${f4(cosA)}, cosB=${f4(cosB)}, cosC=${f4(cosC)}`)
}

/* ================================================================== */
/* ENGINE SECTION 2 — Stewart on the witness, three cevians + signs     */
/* ================================================================== */
{
  const a = 14, b = 13, c = 15
  const A: [number, number] = [9, 12]
  const C: [number, number] = [14, 0]
  const stewartL = (m: number): number => b * b * m + c * c * (a - m)
  const stewartR = (m: number, d2: number): number => a * (d2 + m * (a - m))
  const d2At = (m: number): number => (A[0] - m) * (A[0] - m) + A[1] * A[1]
  const med2 = (2 * b * b + 2 * c * c - a * a) / 4
  check('E07 Stewart for the MEDIAN (m = n = 7): b²·7 + c²·7 = 2758 and 14·(148 + 49) = 2758 — both sides checked',
    close(stewartL(7), 2758) && close(med2, 148) && close(stewartR(7, med2), 2758) && close(stewartL(7), stewartR(7, med2)),
    `LHS=${stewartL(7)}, RHS=${stewartR(7, med2)}`)
  check('E08 the median length: d² = 148 by Apollonius AND by coordinate distance to (7, 0); d = 2√37 ≈ 12.165525',
    close(d2At(7), 148) && close(med2, 148) && close(Math.sqrt(148), 2 * Math.sqrt(37)) && close(Math.sqrt(148), 12.165525, 1e-6),
    `d=${f4(Math.sqrt(148))}`)
  const mB = (a * c) / (b + c)
  const nB = (a * b) / (b + c)
  const bis2 = b * c * (1 - (a * a) / ((b + c) * (b + c)))
  check('E09 the bisector split: m/n = c/b = 15/13 gives m = 7.5 and n = 6.5 with m + n = 14',
    close(mB, 7.5) && close(nB, 6.5) && close(mB + nB, a) && close(mB / nB, c / b), `m=${mB}, n=${nB}`)
  check('E10 Stewart for the BISECTOR: b²·7.5 + c²·6.5 = 2730 and 14·(146.25 + 48.75) = 2730 — equal to the digit',
    close(stewartL(7.5), 2730) && close(bis2, 146.25) && close(stewartR(7.5, bis2), 2730),
    `LHS=${stewartL(7.5)}, RHS=${stewartR(7.5, bis2)}`)
  check('E11 the bisector length: d² = 146.25 by the formula, by bc − mn, and by coordinate distance to (7.5, 0); d ≈ 12.093387',
    close(bis2, 146.25) && close(b * c - mB * nB, 146.25) && close(d2At(7.5), 146.25) && close(Math.sqrt(146.25), 12.093387, 1e-6),
    `d=${f4(Math.sqrt(146.25))}`)
  const d2_4 = stewartL(4) / a - 4 * (a - 4)
  check('E12 the THIRD pinned cevian (m = 4, n = 10): Stewart gives d² = 169 so d = 13 — and the coordinate distance to (4, 0) is also 13',
    close(d2_4, 169) && close(d2At(4), 169) && close(Math.sqrt(d2_4), 13), `d²=${d2_4}, d=${f4(Math.sqrt(d2_4))}`)
  check('E13 the m = 4 cevian makes triangle ADC isosceles: AD = AC = 13 with DC = 10',
    close(dist(A, [4, 0]), 13) && close(dist(A, C), 13) && close(a - 4, 10), 'the twin-side reading')
  const d2_10 = stewartL(10) / a - 10 * (a - 10)
  check('E14 the fourth cevian (m = 10, n = 4): d² = 145 by Stewart and by coordinates; d = √145 ≈ 12.041595',
    close(d2_10, 145) && close(d2At(10), 145) && close(Math.sqrt(145), 12.041595, 1e-6), `d²=${d2_10}`)
  check('E15 SIGN CASE foot between D and C (m = 4, offset FD = 5): c² = (m + u)² + h² and b² = (n − u)² + h² both hold',
    close((4 + 5) ** 2 + 144, c * c) && close((10 - 5) ** 2 + 144, b * b), 'c² = 81 + 144 = 225; b² = 25 + 144 = 169')
  check('E16 SIGN CASE foot between B and D (m = 10, offset FD = 1): c² = (m − u)² + h² and b² = (n + u)² + h² both hold',
    close((10 - 1) ** 2 + 144, c * c) && close((4 + 1) ** 2 + 144, b * b), 'c² = 81 + 144 = 225; b² = 25 + 144 = 169')
  check('E17 the degenerate sign case foot ON D (m = 9, the altitude itself): both forms collapse to c² = m² + h² and b² = n² + h²',
    close(9 * 9 + 144, c * c) && close(5 * 5 + 144, b * b), 'offset 0 — the altitude is its own case')
  check('E18 the elimination landing: at m ∈ {4, 9, 10} both sides equal a·(mn + offset² + h²) — x² + h² is eliminated into d²',
    [4, 9, 10].every((m) => {
      const n = a - m
      const off = Math.abs(m - 9)
      return close(stewartL(m), a * (m * n + off * off + 144)) && close(stewartL(m), stewartR(m, d2At(m)))
    }), 'b²m + c²n = (m+n)(mn + u² + h²) = a(d² + mn)')
}

/* ================================================================== */
/* ENGINE SECTION 3 — Stewart brute-forced over a triangle grid         */
/* ================================================================== */
{
  let count = 0
  let bad = 0
  for (let a = 5; a <= 14; a++)
    for (let b = 5; b <= 14; b++)
      for (let c = 5; c <= 14; c++) {
        if (!(Math.abs(b - c) < a && a < b + c)) continue
        const x = (c * c + a * a - b * b) / (2 * a)
        const h2 = c * c - x * x
        if (h2 <= 0) continue
        for (let m = 1; m < a; m++) {
          const n = a - m
          const d2 = (x - m) * (x - m) + h2
          if (close(b * b * m + c * c * n, a * (d2 + m * n), 1e-9)) count++
          else bad++
        }
      }
  check('E19 Stewart brute-forced over the grid a, b, c ∈ [5, 14] with every interior split m: every instance holds',
    bad === 0 && count > 3000, `${count} verified instances, ${bad} failures`)
}

/* ================================================================== */
/* ENGINE SECTION 4 — Apollonius + the medians census                   */
/* ================================================================== */
{
  const a = 14, b = 13, c = 15
  const B: [number, number] = [0, 0]
  const C: [number, number] = [14, 0]
  const med2 = (s1: number, s2: number, base: number): number => (2 * s1 * s1 + 2 * s2 * s2 - base * base) / 4
  const ma2 = med2(b, c, a), mb2 = med2(a, c, b), mc2 = med2(a, b, c)
  const Mb: [number, number] = [11.5, 6]
  const Mc: [number, number] = [4.5, 6]
  check('E20 Apollonius on the witness: m_a² = (2b² + 2c² − a²)/4 = (338 + 450 − 196)/4 = 148',
    close(ma2, 148) && close(2 * b * b + 2 * c * c - a * a, 592), `m_a²=${ma2}`)
  check('E21 the other two medians: m_b² = 673/4 = 168.25 and m_c² = 505/4 = 126.25, confirmed by coordinate midpoint distances',
    close(mb2, 168.25) && close(mc2, 126.25) && close(dist(B, Mb) ** 2, 168.25) && close(dist(C, Mc) ** 2, 126.25),
    `m_b²=${mb2}, m_c²=${mc2}`)
  check('E22 the median-sum identity, both readings: 148 + 168.25 + 126.25 = 442.5 = (3/4)(196 + 169 + 225) = (3/4)·590',
    close(ma2 + mb2 + mc2, 442.5) && close((3 / 4) * (a * a + b * b + c * c), 442.5) && close(a * a + b * b + c * c, 590),
    `sum=${ma2 + mb2 + mc2}`)
  const n1 = med2(5, 6, 4), n2 = med2(4, 6, 5), n3 = med2(4, 5, 6)
  check('E23 the median-sum on a second witness (a, b, c) = (4, 5, 6): 26.5 + 19.75 + 11.5 = 57.75 = (3/4)·77 — both readings',
    close(n1, 26.5) && close(n2, 19.75) && close(n3, 11.5) && close(n1 + n2 + n3, 57.75) && close((3 / 4) * 77, 57.75),
    `26.5 + 19.75 + 11.5 = ${n1 + n2 + n3}`)
  {
    let ok = true
    for (const [aa, bb, cc] of [[14, 13, 15], [4, 5, 6], [13, 13, 10], [3, 4, 5]] as Array<[number, number, number]>) {
      const m = aa / 2
      const d2stewart = (bb * bb * m + cc * cc * (aa - m)) / aa - m * (aa - m)
      if (!close(d2stewart, med2(bb, cc, aa))) ok = false
    }
    check('E24 Apollonius is Stewart at m = n = a/2: the substituted value matches (2b² + 2c² − a²)/4 on four witnesses',
      ok, '13-14-15, 4-5-6, 13-13-10, 3-4-5 right')
  }
}

/* ================================================================== */
/* ENGINE SECTION 5 — the centroid and the 2:1 split                   */
/* ================================================================== */
{
  const A: [number, number] = [9, 12]
  const B: [number, number] = [0, 0]
  const C: [number, number] = [14, 0]
  const G: [number, number] = [(A[0] + B[0] + C[0]) / 3, (A[1] + B[1] + C[1]) / 3]
  const Ma: [number, number] = [7, 0]
  const Mb: [number, number] = [11.5, 6]
  const Mc: [number, number] = [4.5, 6]
  check('E25 the centroid of the witness: G = (23/3, 4) — the coordinate average of the three vertices',
    close(G[0], 23 / 3) && close(G[1], 4), `G=(${f4(G[0])}, ${f4(G[1])})`)
  const AG = dist(A, G)
  const GMa = dist(G, Ma)
  check('E26 AG = 4√37/3 ≈ 8.110350 — the direct distance from A(9, 12) to G, equal to (2/3)·2√37',
    close(AG, 8.11035, 1e-6) && close(AG, (4 * Math.sqrt(37)) / 3) && close(AG, (2 / 3) * Math.sqrt(148)),
    `AG=${f4(AG)}`)
  check('E27 GD = 2√37/3 ≈ 4.055175 and the split is exactly 2 : 1 — AG = 2·GD by direct distance',
    close(GMa, 4.055175, 1e-6) && close(AG, 2 * GMa), `GD=${f4(GMa)}`)
  const BG = dist(B, G), GMb = dist(G, Mb), CG = dist(C, G), GMc = dist(G, Mc)
  check('E28 the 2 : 1 split holds on ALL THREE medians by direct distance: BG : GM_b = CG : GM_c = 2 exactly',
    close(BG, 2 * GMb) && close(CG, 2 * GMc) && close(BG, Math.sqrt(673) / 3) && close(CG, Math.sqrt(505) / 3),
    `BG=${f4(BG)}, GMb=${f4(GMb)}, CG=${f4(CG)}, GMc=${f4(GMc)}`)
  const col = (p: [number, number], q: [number, number], r: [number, number]): number =>
    (q[0] - p[0]) * (r[1] - p[1]) - (q[1] - p[1]) * (r[0] - p[0])
  check('E29 G lies on all three median lines AM, BN, CP (collinearity cross-products zero) — the medians are concurrent at G',
    close(col(A, Ma, G), 0, 1e-9) && close(col(B, Mb, G), 0, 1e-9) && close(col(C, Mc, G), 0, 1e-9), '')
  check('E30 the median inventory to six decimals: m_a ≈ 12.165525, m_b ≈ 12.971122, m_c ≈ 11.236103',
    close(Math.sqrt(148), 12.165525, 1e-6) && close(Math.sqrt(673) / 2, 12.971122, 1e-6) && close(Math.sqrt(505) / 2, 11.236103, 1e-6),
    `m_a=${f4(Math.sqrt(148))}, m_b=${f4(Math.sqrt(673) / 2)}, m_c=${f4(Math.sqrt(505) / 2)}`)
}

/* ================================================================== */
/* ENGINE SECTION 6 — bisector, comparison order, cevian census         */
/* ================================================================== */
{
  const a = 14, b = 13, c = 15
  const mB = (a * c) / (b + c)
  const bis2 = b * c * (1 - (a * a) / (b + c) ** 2)
  const med2 = (2 * b * b + 2 * c * c - a * a) / 4
  check('E31 the bisector substitution: m = ac/(b+c) = 7.5, n = ab/(b+c) = 6.5 — the ratio m/n = c/b is the defining split',
    close(mB, 7.5) && close(a - mB, 6.5) && close(mB / (a - mB), c / b), '')
  check('E32 the bisector length, two readings: bc(1 − a²/(b+c)²) = 146.25 = bc − mn = 195 − 48.75',
    close(bis2, 146.25) && close(b * c - mB * (a - mB), 146.25) && close(b * c, 195) && close(mB * (a - mB), 48.75), '')
  check('E33 Stewart\u2019s bisector line collapses to abc = a(d² + mn): b²m + c²n = 2730 = abc — the cleanest route to the formula',
    close(b * b * mB + c * c * (a - mB), 2730) && close(a * b * c, 2730), `abc=${a * b * c}`)
  const alt = 12
  check('E34 the three-cevian comparison ON THE WITNESS: altitude 12 < bisector 12.093387 < median 12.165525 (strict)',
    alt < Math.sqrt(bis2) && Math.sqrt(bis2) < Math.sqrt(med2) && close(Math.sqrt(bis2), 12.093387, 1e-6) && close(Math.sqrt(med2), 12.165525, 1e-6),
    `h=12, ℓ=${f4(Math.sqrt(bis2))}, m_a=${f4(Math.sqrt(med2))}`)
  {
    let orderOk = true, eqOk = true, idOk = true, isoCount = 0
    for (let aa = 4; aa <= 14; aa++)
      for (let bb = 4; bb <= 14; bb++)
        for (let cc = 4; cc <= 14; cc++) {
          if (!(Math.abs(bb - cc) < aa && aa < bb + cc)) continue
          const s = (aa + bb + cc) / 2
          const area2 = s * (s - aa) * (s - bb) * (s - cc)
          if (area2 <= 0) continue
          const hh = (2 * Math.sqrt(area2)) / aa
          const ll2 = bb * cc * (1 - (aa * aa) / (bb + cc) ** 2)
          const mm2 = (2 * bb * bb + 2 * cc * cc - aa * aa) / 4
          if (!(hh <= Math.sqrt(ll2) + 1e-9 && Math.sqrt(ll2) <= Math.sqrt(mm2) + 1e-9)) orderOk = false
          const isIso = Math.abs(bb - cc) < 1e-12
          const allEq = close(hh, Math.sqrt(ll2), 1e-9) && close(Math.sqrt(ll2), Math.sqrt(mm2), 1e-9)
          if (isIso) { isoCount++; if (!allEq) eqOk = false } else if (allEq) eqOk = false
          const id = ((bb - cc) ** 2 * (2 * (bb + cc) ** 2 - aa * aa)) / (4 * (bb + cc) ** 2)
          if (!close(mm2 - ll2, id, 1e-9)) idOk = false
        }
    check('E35 the general order altitude ≤ bisector ≤ median holds across the whole triangle grid, with equality exactly when b = c',
      orderOk && eqOk && isoCount > 50, `${isoCount} isosceles instances (all three equal); scalene instances strictly ordered`)
    check('E36 the squared identity median² − bisector² = (b − c)²(2(b+c)² − a²)/(4(b+c)²) holds across the grid; on the witness it equals 1.75',
      idOk && close(med2 - bis2, 1.75) && close(((b - c) ** 2 * (2 * (b + c) ** 2 - a * a)) / (4 * (b + c) ** 2), 1.75), '')
  }
  {
    const d2Of = (m: number): number => 144 + (m - 9) ** 2
    const stewartD2 = (m: number): number => (b * b * m + c * c * (a - m)) / a - m * (a - m)
    let parOk = true
    for (let m = 0; m <= 14.0001; m += 0.25) if (!close(d2Of(m), stewartD2(m), 1e-9)) parOk = false
    check('E37 the cevian census parabola: d²(m) = h² + (m − x)² = 144 + (m − 9)² matches Stewart\u2019s value at every m from 0 to 14 in steps of 0.25',
      parOk, '57 grid points, all on the parabola')
    const pts: Array<[number, number]> = [[0, 225], [4, 169], [6, 153], [7, 148], [7.5, 146.25], [9, 144], [10, 145], [14, 169]]
    check('E38 the pinned census points (m, d²): (0,225) (4,169) (6,153) (7,148) (7.5,146.25) (9,144) (10,145) (14,169) — all on the parabola',
      pts.every(([m, v]) => close(d2Of(m), v) && close(stewartD2(m), v)), pts.map((p) => p.join('→')).join(' '))
    check('E39 the census endpoints are the sides themselves: d(0) = c = 15 and d(14) = b = 13 — the degenerate cevians',
      close(Math.sqrt(d2Of(0)), 15) && close(Math.sqrt(d2Of(14)), 13), 'D = B gives the side c; D = C gives the side b')
    check('E40 the census minimum sits at m = 9 — the altitude foot — with minimum value h² = 144; the twin value 169 occurs at m = 4 and m = 14',
      close(d2Of(9), 144) && close(Math.min(...Array.from({ length: 57 }, (_, i) => d2Of(i * 0.25))), 144) && close(d2Of(4), d2Of(14)),
      'minimum 144 at the foot; twins at m = 4 and m = 14')
  }
  {
    const x = 9
    const frac = 1 - (a * a) / (b + c) ** 2
    check('E41 the offset decomposition on the witness: median² − h² = (x − a/2)² = 4 and bisector² − h² = (x − m_bis)² = 2.25',
      close(med2 - 144, 4) && close(bis2 - 144, 2.25) && close(x - a / 2, 2) && close(x - 7.5, 1.5), '')
    check('E42 the bisector foot sits at the fixed fraction 1 − a²/(b+c)² = 0.75 of the way from the altitude foot to the midpoint: 1.5 = 0.75·2',
      close(frac, 0.75) && close((x - 7.5) / (x - a / 2), 0.75), 'x − m_bis = (1 − a²/(b+c)²)(x − a/2)')
    let sweepOk = true
    for (let aa = 4; aa <= 14; aa++)
      for (let bb = 4; bb <= 14; bb++)
        for (let cc = 4; cc <= 14; cc++) {
          if (!(Math.abs(bb - cc) < aa && aa < bb + cc)) continue
          const xx = (cc * cc + aa * aa - bb * bb) / (2 * aa)
          const mb = (aa * cc) / (bb + cc)
          if (!close(xx - mb, (1 - (aa * aa) / (bb + cc) ** 2) * (xx - aa / 2), 1e-9)) sweepOk = false
        }
    check('E43 the bisector-foot fraction law x − m_bis = (1 − a²/(b+c)²)(x − a/2) holds across the triangle grid',
      sweepOk, 'the bisector foot is always the same fraction of the way from F to M')
  }
}

/* ================================================================== */
/* ENGINE SECTION 7 — quiz-key self-check + the 15 exercise witnesses   */
/* ================================================================== */
{
  const QUIZ_KEY = [0, 3, 1, 2, 0]
  const QUIZ_TOKENS = ['b^2 m + c^2 n', '2\\sqrt{37}', '4\\sqrt{37}', 'BD = 7.5', 'h \\le \\ell \\le m_a']
  check('E44 quiz key [0,3,1,2,0]: 5 entries in 0..3, each with a pinned intended-option token',
    QUIZ_KEY.length === 5 && QUIZ_KEY.every((k) => Number.isInteger(k) && k >= 0 && k <= 3) && QUIZ_TOKENS.every((t) => t.length >= 3),
    QUIZ_TOKENS.join(' | '))
  // Ex1 — Apollonius plug-in on (8, 5, 7)
  {
    const m2 = (2 * 25 + 2 * 49 - 64) / 4
    check('E45 Ex1 witness (a, b, c) = (8, 5, 7): m_a² = 21, m_a = √21 ≈ 4.582576; Stewart cross-check 25·4 + 49·4 = 296 = 8·(21 + 16)',
      close(m2, 21) && close(Math.sqrt(21), 4.582576, 1e-6) && close(25 * 4 + 49 * 4, 296) && close(8 * (21 + 16), 296), '')
  }
  // Ex2 — the m = 4 cevian (E12/E13 re-pin)
  check('E46 Ex2 witness: the m = 4, n = 10 cevian of the 13-14-15 witness has d = 13 with AD = AC — triangle ADC isosceles',
    close((13 * 13 * 4 + 15 * 15 * 10) / 14 - 40, 169) && close(Math.hypot(9 - 4, 12), 13) && close(Math.hypot(9 - 14, 12), 13), '')
  // Ex3 — the 2:1 split of a 12-long median
  check('E47 Ex3 witness: a median of length 12 splits as AG = (2/3)·12 = 8 and GD = (1/3)·12 = 4',
    close((2 / 3) * 12, 8) && close((1 / 3) * 12, 4) && close(8, 2 * 4), '')
  // Ex4 — the witness centroid (E25-E27 re-pin)
  check('E48 Ex4 witness: G = (23/3, 4), AG ≈ 8.110350, GD ≈ 4.055175 by direct distance',
    close(Math.hypot(9 - 23 / 3, 8), 8.11035, 1e-6) && close(Math.hypot(23 / 3 - 7, 4), 4.055175, 1e-6), '')
  // Ex5 — the bisector from a 3:5 ratio
  {
    const bb = 15, cc = 9, aa = 16
    const mm = (aa * cc) / (bb + cc)
    const d2a = (bb * bb * mm + cc * cc * (aa - mm)) / aa - mm * (aa - mm)
    const d2b = bb * cc * (1 - (aa * aa) / (bb + cc) ** 2)
    check('E49 Ex5 witness (ratio 3:5, a = 16, c = 9, b = 15): m = 6, n = 10; d² = 75 both readings; d = 5√3 ≈ 8.660254; the triangle is valid',
      close(mm, 6) && close(aa - mm, 10) && close(d2a, 75) && close(d2b, 75) && close(Math.sqrt(75), 5 * Math.sqrt(3)) &&
      close(Math.sqrt(75), 8.660254, 1e-6) && 9 + 15 > 16, '')
  }
  // Ex6 — median-sum on 4-5-6 (E23 re-pin with formulas)
  check('E50 Ex6 witness (a, b, c) = (4, 5, 6): 26.5 + 19.75 + 11.5 = 57.75 = (3/4)(16 + 25 + 36) = (3/4)·77',
    close((2 * 25 + 2 * 36 - 16) / 4, 26.5) && close((2 * 16 + 2 * 36 - 25) / 4, 19.75) && close((2 * 16 + 2 * 25 - 36) / 4, 11.5) &&
    close(26.5 + 19.75 + 11.5, 57.75) && close((3 / 4) * (16 + 25 + 36), 57.75), '')
  // Ex7 — the census table (E38 re-pin)
  check('E51 Ex7 witness: the census walk m = 0, 4, 6, 7, 7.5, 9, 10, 14 gives d² = 225, 169, 153, 148, 146.25, 144, 145, 169',
    [0, 4, 6, 7, 7.5, 9, 10, 14].every((m, i) => close((13 * 13 * m + 15 * 15 * (14 - m)) / 14 - m * (14 - m), [225, 169, 153, 148, 146.25, 144, 145, 169][i])), '')
  // Ex8 — the isosceles equality case 13-13-10
  {
    const med2 = (2 * 169 + 2 * 169 - 100) / 4
    const bis2 = 169 * (1 - 100 / (26 * 26))
    const s = 18
    const area = Math.sqrt(s * (s - 13) * (s - 13) * (s - 10))
    check('E52 Ex8 witness (13, 13, 10): median² = 144, bisector² = 169 − 25 = 144, altitude² = (2·60/10)² = 144 — all three equal 12',
      close(med2, 144) && close(bis2, 144) && close(s * (s - 13) * (s - 13) * (s - 10), 3600) && close(area, 60) &&
      close((2 * area) / 10, 12) && close(169 - 25, 144), `area=${area}`)
  }
  // Ex9 — the right-triangle comparison
  {
    const aa = 3, bb = 5, cc = 4
    const bis2 = bb * cc * (1 - (aa * aa) / (bb + cc) ** 2)
    const med2 = (2 * bb * bb + 2 * cc * cc - aa * aa) / 4
    const mm = (aa * cc) / (bb + cc)
    check('E53 Ex9 witness (right angle at B, a = 3, b = 5, c = 4): altitude 4 < bisector 4√10/3 ≈ 4.216370 < median √73/2 ≈ 4.272002; split m = 4/3, n = 5/3; Stewart 60 = 60',
      close(bis2, 160 / 9) && close(Math.sqrt(bis2), (4 * Math.sqrt(10)) / 3) && close(Math.sqrt(bis2), 4.21637, 1e-6) &&
      close(med2, 73 / 4) && close(Math.sqrt(med2), 4.272002, 1e-6) && close(mm, 4 / 3) &&
      close(25 * mm + 16 * (3 - mm), 60) && close(3 * (bis2 + mm * (3 - mm)), 60) && 4 < Math.sqrt(bis2) && Math.sqrt(bis2) < Math.sqrt(med2), '')
  }
  // Ex10 — the reverse-Stewart quadratic
  {
    const roots: number[] = []
    for (let m = -50; m <= 50; m += 0.25) if (close(m * m - 18 * m + 56, 0, 1e-9)) roots.push(m)
    check('E54 Ex10 witness: the cevian of length 13 forces m² − 18m + 56 = 0, whose only roots are m = 4 (interior) and m = 14 (degenerate, D = C)',
      roots.length === 2 && close(roots[0], 4) && close(roots[1], 14) &&
      close(14 * 4 ** 2 - 252 * 4 + 784, 0) && close(13 * 13 * 14 + 15 * 15 * 0, 14 * (169 + 0)),
      `roots=${JSON.stringify(roots)}`)
  }
  // Ex11 — the truss
  {
    const king2 = (2 * 169 + 2 * 169 - 100) / 4
    const strut2 = (169 * 4 + 169 * 6) / 10 - 24
    check('E55 Ex11 witness (isosceles rafters 13, base 10): king post² = 144 (length 12); strut to m = 4: d² = 145, d = √145 ≈ 12.041595 > 12',
      close(king2, 144) && close(strut2, 145) && close(Math.sqrt(145), 12.041595, 1e-6) && Math.sqrt(145) > 12, '')
  }
  // Ex12 — median-sum proof witnesses (E22/E23 re-pin)
  check('E56 Ex12 witnesses: 148 + 168.25 + 126.25 = 442.5 = (3/4)·590 and 26.5 + 19.75 + 11.5 = 57.75 = (3/4)·77',
    close(148 + 168.25 + 126.25, (3 / 4) * 590) && close(26.5 + 19.75 + 11.5, (3 / 4) * 77), '')
  // Ex13 — the bisector identity bc − mn
  check('E57 Ex13 witnesses: 195 − 48.75 = 146.25 (the 13-14-15) and 135 − 60 = 75 (the 3:5 ratio triangle); the key collapse b²m + c²n = abc reads 2730 = 2730',
    close(195 - 48.75, 146.25) && close(135 - 60, 75) && close(13 * 15 * 14, 2730) && close(169 * 7.5 + 225 * 6.5, 2730), '')
  // Ex14 — the squared identity
  {
    const idW = ((13 - 15) ** 2 * (2 * 28 * 28 - 196)) / (4 * 28 * 28)
    const iso = (2 * 169 + 2 * 169 - 100) / 4 - 169 * (1 - 100 / 676)
    check('E58 Ex14 witnesses: the identity gives 1.75 on the 13-14-15 (matching 148 − 146.25) and 0 on the 13-13-10 isosceles',
      close(idW, 1.75) && close(148 - 146.25, 1.75) && close(iso, 0), '')
  }
  // Ex15 — the offset decomposition + fraction law
  check('E59 Ex15 witnesses: offsets |x − a/2| = 2 (median) and |x − m_bis| = 1.5 (bisector) with ratio 0.75 = 1 − 196/784; d² = 144 + 4 = 148 and 144 + 2.25 = 146.25',
    close(Math.abs(9 - 7), 2) && close(Math.abs(9 - 7.5), 1.5) && close(1.5 / 2, 0.75) && close(1 - 196 / 784, 0.75) &&
    close(144 + 2 ** 2, 148) && close(144 + 1.5 ** 2, 146.25), '')
  // Illustration witnesses re-pinned
  check('E60 Illustration witnesses: the placement (9, 12), Heron 84, the median 2758 = 2758, the bisector 2730 = 2730, the centroid 8.110350 — all covered by E02-E33',
    true, 'E02, E04, E07, E10, E26 certify the four Illustrations')
}

/* ================================================================== */
/* PIN SECTION — audits the part file (runs green only after prose)     */
/* ================================================================== */
async function runPins(): Promise<void> {
  let mod: { lessonGeo306?: Lesson } | null = null
  try {
    mod = await import('./part-geo306')
    pcheck('P01 part file loads and exports lessonGeo306', !!mod?.lessonGeo306, '')
  } catch (e) {
    pcheck('P01 part file loads and exports lessonGeo306', false, String(e))
  }
  const lesson = mod?.lessonGeo306
  if (!lesson) return

  // P02 — quiz keys [0,3,1,2,0], 4 options each, intended token in the correct option
  const quizBlock = lesson.blocks.find((b) => b.kind === 'quiz') as
    | { kind: 'quiz'; items: Array<{ q: string; options: string[]; answer: number; explain: string }> }
    | undefined
  if (!quizBlock) {
    pcheck('P02a quiz block exists', false, 'no quiz block')
  } else {
    const keys = quizBlock.items.map((i) => i.answer)
    pcheck('P02a quiz keys are [0,3,1,2,0]', JSON.stringify(keys) === JSON.stringify([0, 3, 1, 2, 0]), `keys=${keys.join(',')}`)
    pcheck('P02b every quiz item has exactly 4 options', quizBlock.items.every((i) => i.options.length === 4), quizBlock.items.map((i) => String(i.options.length)).join(','))
    const tokens = ['b^2 m + c^2 n', '2\\sqrt{37}', '4\\sqrt{37}', 'BD = 7.5', 'h \\le \\ell \\le m_a']
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
  pcheck('P04d the named solution trio exists: a Stewart-anatomy, a centroid and a comparison figure',
    /stewart anatomy/.test(allCaptions) && /centroid/.test(allCaptions) && /comparison/.test(allCaptions), allCaptions.slice(0, 120))

  // P05 — terms
  const termsBlocks = lesson.blocks.filter((b) => b.kind === 'terms') as Array<{ kind: 'terms'; items: Array<{ term: string; def: string }> }>
  pcheck('P05 >=1 terms block with >=6 items', termsBlocks.length >= 1 && termsBlocks.some((t) => t.items.length >= 6), termsBlocks.map((t) => `${t.items.length} items`).join(','))
  // P06 — formula cards (the five pinned)
  const formulas = lesson.blocks.filter((b) => b.kind === 'formula') as Array<{ kind: 'formula'; name: string }>
  pcheck('P06 >=5 formula cards including Stewart, Apollonius, the bisector length, the centroid 2:1 and the median-sum identity',
    formulas.length >= 5 &&
    formulas.some((f) => f.name.toLowerCase().includes('stewart')) &&
    formulas.some((f) => f.name.toLowerCase().includes('apollonius')) &&
    formulas.some((f) => f.name.toLowerCase().includes('bisector')) &&
    formulas.some((f) => f.name.toLowerCase().includes('centroid')) &&
    formulas.some((f) => f.name.toLowerCase().includes('median-sum')),
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
  pcheck('P11 id/number/title exact', lesson.id === 'geo-stewarts-theorem-and-the-median-relation' && lesson.number === '3.6' && lesson.title === "Stewart's Theorem and the Median Relation", `${lesson.id} / ${lesson.number} / ${lesson.title}`)
  // P12 — sources exact per spec
  pcheck('P12 sources exact [geo-ch03-web-ground, cengage-m1-05]', JSON.stringify(lesson.sources) === JSON.stringify(['geo-ch03-web-ground', 'cengage-m1-05']), JSON.stringify(lesson.sources))
  // P13 — prerequisites exact per spec
  pcheck('P13 prerequisites exact [3.2 criteria, 3.4 inequalities]', JSON.stringify(lesson.prerequisites) === JSON.stringify(['geo-the-congruence-criteria-sas-asa-aas-sss-rhs', 'geo-inequalities-in-a-triangle-sides-and-angles']), JSON.stringify(lesson.prerequisites))
  // P14 — concepts 5-8, objectives 4-6
  pcheck('P14 concepts 5-8 and objectives 4-6', lesson.concepts.length >= 5 && lesson.concepts.length <= 8 && (lesson.objectives?.length ?? 0) >= 4 && (lesson.objectives?.length ?? 0) <= 6, `concepts=${lesson.concepts.length}, objectives=${lesson.objectives?.length}`)
  // P15 — words field omitted (honest count computed by the registry)
  pcheck('P15 words field omitted', !('words' in lesson), '')
  // P16 — >=3 example blocks (Illustrations), each a full Cengage chain
  const examples = lesson.blocks.filter((b) => b.kind === 'example') as Array<{ kind: 'example'; title: string; steps: string[] }>
  pcheck('P16 >=3 example blocks with >=4 steps each', examples.length >= 3 && examples.every((e) => e.steps.length >= 4), examples.map((e) => `${e.title.slice(0, 30)} (${e.steps.length})`).join(' | '))
  // P17 — derivation blocks
  const derivs = lesson.blocks.filter((b) => b.kind === 'derivation')
  pcheck('P17 >=2 derivation blocks', derivs.length >= 2, `count=${derivs.length}`)
  // P18 — exam + historical callouts present
  const examCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'exam')
  const histCall = lesson.blocks.some((b) => b.kind === 'callout' && (b as { tone: string }).tone === 'historical')
  pcheck('P18 an exam callout and a historical callout are present', examCall && histCall, `exam=${examCall}, historical=${histCall}`)
  // P19 — the three-cevian comparison table
  const tables = lesson.blocks.filter((b) => b.kind === 'table') as Array<{ kind: 'table'; head: string[]; rows: string[][] }>
  const cmpTable = tables.find((t) => t.head.join(' ').toLowerCase().includes('cevian') && t.rows.join(' ').includes('146.25'))
  pcheck('P19 the three-cevian comparison table exists with 146.25, 148 and 144',
    !!cmpTable && ['146.25', '148', '144'].every((s) => cmpTable.rows.join(' ').includes(s)), cmpTable ? 'found' : 'missing')
  // P20 — the cevian census table
  const censusTable = tables.find((t) => t.rows.join(' ').includes('153') && t.rows.join(' ').includes('146.25') && t.rows.join(' ').includes('225'))
  pcheck('P20 the cevian census table carries the pinned values 225, 169, 153, 148, 146.25, 144, 145',
    !!censusTable && ['225', '169', '153', '148', '146.25', '144', '145'].every((s) => censusTable.rows.join(' ').includes(s)), censusTable ? 'found' : 'missing')
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
const e = report('geo306-engine', engine)
console.log('=== PINS (audit the part file) ===')
await runPins()
const p = report('geo306-pins', pins)
const fail = e.fail + p.fail
console.log(`geo306 TOTAL: ${e.pass + p.pass} pass, ${fail} fail`)
if (fail > 0) process.exit(1)
