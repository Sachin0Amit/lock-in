import type { Chapter, Lesson } from '../../../types'

/**
 * Elementary Algebra — Chapter 10: Graphs of Equations
 *
 * LESSONS WRITTEN: 10.1 The Coordinate Plane and Linear Graphs (run 85 —
 *                 quiz keys 2/1/1/2/2, 14 exercises, two figures — the
 *                 addressing map + the graph of 3x + 2y = 6, the ordered-pair
 *                 address read pointwise on a 10-point census, the intercept
 *                 doors of ax + by = c, THE graph-as-solution-set identity
 *                 priced both directions with the exact determinant, the
 *                 horizontal/vertical families, and the drawn elimination —
 *                 the crossing (5/2, −3/4) is 6.2's answer made visible).
 *                 10.2 Slope: the Steepness Theorem (run 85 — quiz keys
 *                 0/1/2/2/0, 14 exercises, two figures — the steepness
 *                 staircase + the two-line verdict strip, the slope engine
 *                 with the honest vertical refusal, the steepness theorem
 *                 priced on all 6 pairwise slopes of the four census points,
 *                 the similar-triangle read, the readout m = −a/b, the
 *                 parallel condition, the fare and Fahrenheit rates, the
 *                 k-hunt k = −2/3 with the honest k = 0 vertical edge).
 *                 10.3 'The Parabola: Quadratic Graphs and Vertices' (run 86 —
 *                 quiz keys 0/2/0/2/1, 14 exercises, two figures — the
 *                 workhorse parabola + the three-verdict strip, the census
 *                 table priced pointwise, the fold identity 2(x − 7/4)² − 25/8
 *                 certified by expansion and pointwise, the vertex (7/4, −25/8)
 *                 priced as minimum by the sign of a, the axis x = 7/4
 *                 mirror-priced with the twin pairs, the x-intercept verdicts
 *                 two/touch/none cross-priced against the factorizations, the
 *                 horizontal-probe hinge Δ_k = Δ + 4ak flipping exactly at the
 *                 vertex height, the second differences constant 2a with the
 *                 secant bend −5, −1, 3, 7 — 10.2's steepness bending, the
 *                 opens-down companion y = −x² + 4x + 5 with vertex (2, 9) a
 *                 maximum) + THE UNIT-10 COMPLETION REVIEW PASSED — chapter 10
 *                 COMPLETE 3/3.
 *
 * VERIFY-FIRST (2026-11-10, run 86): every number in 10.3 was recomputed by
 * scripts/verify-book3-ch10.ts sections G (pre-write, before any prose) and
 * H (authored battery) BEFORE it entered the lesson — 937 checks green at
 * the pre-write gate. Pre-writing catches: the W×W census of the workhorse
 * holds exactly 4 integer points, not 5 — (4, 7) sits on the curve but out
 * the window top; the k-scan levels −3 and −2 lie ABOVE the vertex height
 * −25/8 = −3.125, so the horizontal lines y = −3 and y = −2 cut the bowl
 * TWICE (the count flips exactly at the vertex, and a near-miss level still
 * cuts); the tangent-touch twins read f(1 + t) = t² for every t, so the
 * touch curve is its own mirror battery.
 *
 * VERIFY-FIRST (2026-11-10, run 85): every number in 10.1 and 10.2 was
 * recomputed by scripts/verify-book3-ch10.ts BEFORE any prose existed —
 * 350 pre-write checks across sections A–C (the coordinate-plane engines:
 * the 10-point addressing census with the no-quadrant axis reads, the
 * intercept engine (c/a, 0) and (0, c/b), the through-origin doors (b, −a),
 * THE graph-as-solution-set identity priced BOTH directions pointwise with
 * exact determinants on 8 on-line + 4 off-line census points and the whole
 * 11×11 window, the one-door vertical probes, the drawn elimination with
 * the doubled and conflicting pairs; the slope engines: the vertical guard
 * refusing to divide honestly, the steepness theorem on all C(4,2) = 6
 * pairwise slopes, the similar-triangle scale factors 3/2 = 3/2, the
 * readout m = −a/b cross-priced against the intercept walk, the two-line
 * verdicts ∅ / one / all, the fare rate 12/km with the d = 7 prediction,
 * the Fahrenheit 9/5 scale with 98.6 and the −40 meeting, the parallel
 * through (1, 6), the perpendicular doorway product −1, the k-hunt
 * k = −2/3 and the k = 0 edge). Pre-writing catches: the W×W census of
 * 3x + 2y = 6 holds exactly 3 integer solutions (x even, |y| ≤ 5) — not 5,
 * (−2, 6) and (−4, 9) sit outside the window; the c = 0 line collapses both
 * intercepts onto the origin so the intercept walk must be replaced by the
 * origin door walk.
 *
 * References for this unit: the banked keys carry the run (zero downloads,
 * web-check only per the runs-71–84 pattern) — `hall-knight-elementary-
 * algebra` (the classical graphical chapters: coordinates as addresses,
 * the straight line graphed from its equation), `ncert-math10-ch4-
 * quadratic` (the school canon's graphing of the parabola — 10.3's ground,
 * cited ahead), `khattar-qa-4e` (the exam corner: slope reads, parallel
 * hunts, rate lines), `cengage-jee-style` (the presentation contract).
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (10.1): the addressing map — the plane, its quadrants,     */
/* and the census dots. Header (30,18,660,40); quadrant chips          */
/* (100,78,120,44), (320,78,120,44), (100,306,120,44), (320,306,120,44);*/
/* info boxes (480,96,200,64), (480,210,200,64); caption band          */
/* (30,358,660,30). Origin (245,205), 26 px per unit. Geometry pinned  */
/* in verify-book3-ch10.ts plan101Fig1.                                */
/* ------------------------------------------------------------------ */

function addressingMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The coordinate plane: two perpendicular axes through the origin O, the four quadrants labelled with their sign reads, and one census dot per quadrant carrying its ordered-pair address">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the coordinate plane — every point carries exactly one address</text>')
  // ---- axes (lines, so crossings stay lawful) ----
  parts.push('<line x1="55" y1="205" x2="445" y2="205" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="453,205 441,200 441,210" fill="#0d9488"/>')
  parts.push('<text x="460" y="210" font-size="13" fill="#0f766e" font-style="italic">x</text>')
  parts.push('<line x1="245" y1="355" x2="245" y2="70" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="245,62 240,74 250,74" fill="#0d9488"/>')
  parts.push('<text x="252" y="76" font-size="13" fill="#0f766e" font-style="italic">y</text>')
  // ---- unit ticks ----
  const xt = [271, 297, 323, 349, 375, 219, 193, 167, 141]
  for (const tx of xt) parts.push(`<line x1="${tx}" y1="201" x2="${tx}" y2="209" stroke="#0d9488" stroke-width="1"/>`)
  const yt = [179, 153, 127, 101, 231, 257, 283, 309]
  for (const ty of yt) parts.push(`<line x1="241" y1="${ty}" x2="249" y2="${ty}" stroke="#0d9488" stroke-width="1"/>`)
  // ---- origin ----
  parts.push('<circle cx="245" cy="205" r="3.5" fill="#ea580c"/>')
  parts.push('<text x="236" y="224" font-size="11" fill="#d97706" text-anchor="end">O (0, 0)</text>')
  // ---- quadrant chips ----
  parts.push('<rect x="100" y="78" width="120" height="44" rx="6" fill="#ffedd5"/>')
  parts.push('<text x="160" y="98" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">QII</text>')
  parts.push('<text x="160" y="114" font-size="11" fill="#d97706" text-anchor="middle">(−, +)</text>')
  parts.push('<rect x="320" y="78" width="120" height="44" rx="6" fill="#ffedd5"/>')
  parts.push('<text x="380" y="98" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">QI</text>')
  parts.push('<text x="380" y="114" font-size="11" fill="#d97706" text-anchor="middle">(+, +)</text>')
  parts.push('<rect x="100" y="306" width="120" height="44" rx="6" fill="#ffedd5"/>')
  parts.push('<text x="160" y="326" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">QIII</text>')
  parts.push('<text x="160" y="342" font-size="11" fill="#d97706" text-anchor="middle">(−, −)</text>')
  parts.push('<rect x="320" y="306" width="120" height="44" rx="6" fill="#ffedd5"/>')
  parts.push('<text x="380" y="326" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">QIV</text>')
  parts.push('<text x="380" y="342" font-size="11" fill="#d97706" text-anchor="middle">(+, −)</text>')
  // ---- info boxes ----
  parts.push('<rect x="480" y="96" width="200" height="64" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="580" y="116" font-size="11" fill="#166534" text-anchor="middle">the axes and the origin</text>')
  parts.push('<text x="580" y="132" font-size="11" fill="#166534" text-anchor="middle">belong to no quadrant —</text>')
  parts.push('<text x="580" y="148" font-size="11" fill="#166534" text-anchor="middle">the sign read stops there</text>')
  parts.push('<rect x="480" y="210" width="200" height="64" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="580" y="230" font-size="11" fill="#166534" text-anchor="middle">every point ↔ exactly one</text>')
  parts.push('<text x="580" y="246" font-size="11" fill="#166534" text-anchor="middle">ordered pair — the address;</text>')
  parts.push('<text x="580" y="262" font-size="11" fill="#166534" text-anchor="middle">order matters: (2, 5) ≠ (5, 2)</text>')
  // ---- census dots, one per quadrant ----
  parts.push('<circle cx="297" cy="75" r="5" fill="#ea580c"/>')
  parts.push('<text x="305" y="72" font-size="11" fill="#d97706">(2, 5)</text>')
  parts.push('<circle cx="141" cy="179" r="5" fill="#ea580c"/>')
  parts.push('<text x="133" y="172" font-size="11" fill="#d97706" text-anchor="end">(−4, 1)</text>')
  parts.push('<circle cx="323" cy="257" r="5" fill="#ea580c"/>')
  parts.push('<text x="333" y="252" font-size="11" fill="#d97706">(3, −2)</text>')
  parts.push('<circle cx="219" cy="283" r="5" fill="#ea580c"/>')
  parts.push('<text x="211" y="278" font-size="11" fill="#d97706" text-anchor="end">(−1, −3)</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="358" width="660" height="30" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="378" font-size="11.5" fill="#0f766e" text-anchor="middle">one address per point, one point per address — the plane becomes a ledger of ordered pairs</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (10.1): the graph of 3x + 2y = 6 — the solution set drawn. */
/* Header (30,18,660,40); identity panel (500,96,180,168); caption     */
/* band (30,338,660,42). Origin (200,245), 26 px per unit; the line    */
/* through (−2,6)→(148,89) and (4,−3)→(304,323); the dashed partner    */
/* x − 2y = 4 through (148,323) and (356,219); crossing (265,264.5).   */
/* Geometry pinned in verify-book3-ch10.ts plan101Fig2.                */
/* ------------------------------------------------------------------ */

function graphIdentitySvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The graph of 3x + 2y = 6 drawn through its intercepts (2, 0) and (0, 3), with census dots on the line, red crosses off it, and the teal crossing (5/2, −3/4) where the dashed line x − 2y = 4 meets it">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">graphing 3x + 2y = 6 — the line IS the solution set</text>')
  // ---- axes ----
  parts.push('<line x1="60" y1="245" x2="470" y2="245" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="478,245 466,240 466,250" fill="#0d9488"/>')
  parts.push('<text x="476" y="250" font-size="13" fill="#0f766e" font-style="italic">x</text>')
  parts.push('<line x1="200" y1="330" x2="200" y2="80" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="200,72 195,84 205,84" fill="#0d9488"/>')
  parts.push('<text x="207" y="76" font-size="13" fill="#0f766e" font-style="italic">y</text>')
  // ---- unit ticks ----
  const xt2 = [226, 252, 278, 304, 174, 148, 122, 96]
  for (const tx of xt2) parts.push(`<line x1="${tx}" y1="241" x2="${tx}" y2="249" stroke="#0d9488" stroke-width="1"/>`)
  const yt2 = [219, 193, 167, 141, 115, 89, 271, 297, 323]
  for (const ty of yt2) parts.push(`<line x1="196" y1="${ty}" x2="204" y2="${ty}" stroke="#0d9488" stroke-width="1"/>`)
  parts.push('<text x="192" y="258" font-size="11" fill="#d97706" text-anchor="end">O</text>')
  // ---- the second line (dashed): x − 2y = 4 ----
  parts.push('<line x1="148" y1="323" x2="356" y2="219" stroke="#0d9488" stroke-width="2" stroke-dasharray="7,5"/>')
  // ---- the main line: 3x + 2y = 6 ----
  parts.push('<line x1="148" y1="89" x2="304" y2="323" stroke="#16a34a" stroke-width="2.5"/>')
  // ---- red crosses: census points OFF the line ----
  parts.push('<line x1="222" y1="215" x2="230" y2="223" stroke="#dc2626" stroke-width="2"/>')
  parts.push('<line x1="222" y1="223" x2="230" y2="215" stroke="#dc2626" stroke-width="2"/>')
  parts.push('<line x1="274" y1="215" x2="282" y2="223" stroke="#dc2626" stroke-width="2"/>')
  parts.push('<line x1="274" y1="223" x2="282" y2="215" stroke="#dc2626" stroke-width="2"/>')
  parts.push('<line x1="250" y1="167" x2="258" y2="175" stroke="#dc2626" stroke-width="2"/>')
  parts.push('<line x1="250" y1="175" x2="258" y2="167" stroke="#dc2626" stroke-width="2"/>')
  // ---- dots ON the line ----
  parts.push('<circle cx="200" cy="167" r="5" fill="#ea580c"/>')
  parts.push('<text x="208" y="162" font-size="11" fill="#d97706">(0, 3)</text>')
  parts.push('<circle cx="252" cy="245" r="5" fill="#ea580c"/>')
  parts.push('<text x="260" y="235" font-size="11" fill="#d97706">(2, 0)</text>')
  parts.push('<circle cx="304" cy="323" r="5" fill="#ea580c"/>')
  parts.push('<text x="312" y="318" font-size="11" fill="#d97706">(4, −3)</text>')
  parts.push('<circle cx="148" cy="89" r="5" fill="#ea580c"/>')
  parts.push('<text x="140" y="84" font-size="11" fill="#d97706" text-anchor="end">(−2, 6)</text>')
  // ---- the crossing of the two lines ----
  parts.push('<circle cx="265" cy="264.5" r="6" fill="#0d9488"/>')
  // ---- identity panel ----
  parts.push('<rect x="500" y="96" width="180" height="168" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="590" y="116" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">the identity, priced</text>')
  parts.push('<text x="590" y="136" font-size="10.5" fill="#166534" text-anchor="middle">every solution of the</text>')
  parts.push('<text x="590" y="152" font-size="10.5" fill="#166534" text-anchor="middle">equation sits ON the line;</text>')
  parts.push('<text x="590" y="168" font-size="10.5" fill="#166534" text-anchor="middle">every point OF the line</text>')
  parts.push('<text x="590" y="184" font-size="10.5" fill="#166534" text-anchor="middle">satisfies the equation —</text>')
  parts.push('<text x="590" y="200" font-size="10.5" fill="#166534" text-anchor="middle">det = 0 ⟺ on the line,</text>')
  parts.push('<text x="590" y="216" font-size="10.5" fill="#166534" text-anchor="middle">checked on 12 census points</text>')
  parts.push('<text x="590" y="232" font-size="10.5" fill="#166534" text-anchor="middle">+ the whole 11 × 11 window</text>')
  parts.push('<text x="590" y="248" font-size="10.5" fill="#0f766e" text-anchor="middle" font-weight="700">(5/2, −3/4): the crossing</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="338" width="660" height="42" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="354" font-size="11.5" fill="#0f766e" text-anchor="middle">the line is the whole solution set — every orange dot satisfies the equation, every red cross fails it;</text>')
  parts.push('<text x="360" y="371" font-size="11.5" fill="#0f766e" text-anchor="middle">the teal dot is elimination’s answer (5/2, −3/4), where the dashed line x − 2y = 4 crosses — 5.3, made visible.</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* figure helper for lesson 10.1 — the walls and the vertical probes  */
/* (topic-depth rule: the Graph-as-Solution-Set Identity section needs */
/* its own figure — the walls picture the identity's own paras promise) */
/* ------------------------------------------------------------------ */

function wallProbesSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two panels: the horizontal wall y equals 2 and the vertical wall x equals minus one crossing in the single address minus one comma two, and the line y equals 2x plus 1 pierced exactly once by each of three vertical probes at h equals minus two, zero and three">',
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the walls and the probes — one-variable equations, drawn upright</text>')
  // ---- LEFT PANEL: the walls y = 2 and x = −1 (no panel titles — the
  // header band and the caption band carry the panel naming, and titles at
  // this height collide with the axis-arrow labels)
  parts.push('<line x1="60" y1="245" x2="336" y2="245" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="344,245 332,240 332,250" fill="#0d9488"/>')
  parts.push('<text x="352" y="250" font-size="13" fill="#0f766e" font-style="italic">x</text>')
  parts.push('<line x1="200" y1="80" x2="200" y2="310" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="200,72 195,84 205,84" fill="#0d9488"/>')
  parts.push('<text x="207" y="76" font-size="13" fill="#0f766e" font-style="italic">y</text>')
  parts.push('<text x="192" y="258" font-size="11" fill="#d97706" text-anchor="end">O</text>')
  // the horizontal wall y = 2 and the vertical wall x = −1
  parts.push('<line x1="64" y1="189" x2="336" y2="189" stroke="#16a34a" stroke-width="3"/>')
  parts.push('<text x="90" y="182" font-size="13" fill="#166534" font-weight="700">y = 2</text>')
  parts.push('<line x1="172" y1="84" x2="172" y2="308" stroke="#16a34a" stroke-width="3"/>')
  parts.push('<text x="178" y="96" font-size="13" fill="#166534" font-weight="700">x = −1</text>')
  // riders and the crossing
  parts.push('<circle cx="312" cy="189" r="5" fill="#ea580c"/>')
  parts.push('<text x="312" y="178" font-size="11" fill="#d97706" text-anchor="middle">(4, 2)</text>')
  parts.push('<circle cx="172" cy="301" r="5" fill="#ea580c"/>')
  parts.push('<text x="180" y="305" font-size="11" fill="#d97706">(−1, −2)</text>')
  parts.push('<circle cx="172" cy="189" r="6" fill="#0d9488"/>')
  parts.push('<text x="182" y="184" font-size="11" fill="#d97706">(−1, 2)</text>')
  parts.push('<text x="200" y="324" font-size="11.5" fill="#0f766e" text-anchor="middle">two walls cross in exactly ONE address</text>')
  // ---- RIGHT PANEL: y = 2x + 1 probed at h = −2, 0, 3 ----
  parts.push('<line x1="384" y1="245" x2="676" y2="245" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="684,245 672,240 672,250" fill="#0d9488"/>')
  parts.push('<text x="692" y="250" font-size="13" fill="#0f766e" font-style="italic">x</text>')
  parts.push('<line x1="540" y1="80" x2="540" y2="320" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="540,72 535,84 545,84" fill="#0d9488"/>')
  parts.push('<text x="547" y="76" font-size="13" fill="#0f766e" font-style="italic">y</text>')
  // (no origin label on the right panel — its seat is the h = 0 probe’s own foot)
  // the line y = 2x + 1 from (−2, −3) to (3, 7)
  parts.push('<line x1="468" y1="293" x2="648" y2="133" stroke="#16a34a" stroke-width="2.5"/>')
  parts.push('<text x="620" y="190" font-size="12" fill="#166534" font-weight="700">y = 2x + 1</text>')
  // the three probes (dashed amber) and their meets (teal dots) — the
  // h = 0 probe coincides with the y-axis itself, so it is drawn as THICK
  // amber dashes riding the axis (a thin dash would vanish under it)
  parts.push('<line x1="468" y1="245" x2="468" y2="293" stroke="#d97706" stroke-width="1.6" stroke-dasharray="6,4"/>')
  parts.push('<line x1="540" y1="245" x2="540" y2="229" stroke="#d97706" stroke-width="4" stroke-dasharray="6,4"/>')
  parts.push('<line x1="648" y1="245" x2="648" y2="133" stroke="#d97706" stroke-width="1.6" stroke-dasharray="6,4"/>')
  parts.push('<circle cx="468" cy="293" r="5" fill="#0d9488"/>')
  parts.push('<circle cx="540" cy="229" r="5" fill="#0d9488"/>')
  parts.push('<circle cx="648" cy="133" r="5" fill="#0d9488"/>')
  parts.push('<text x="440" y="263" font-size="11" fill="#d97706" text-anchor="end">h = −2</text>')
  parts.push('<text x="532" y="263" font-size="11" fill="#d97706" text-anchor="end">h = 0</text>')
  parts.push('<text x="656" y="263" font-size="11" fill="#d97706">h = 3</text>')
  parts.push('<text x="468" y="311" font-size="11" fill="#d97706" text-anchor="middle">(−2, −3)</text>')
  parts.push('<text x="528" y="225" font-size="11" fill="#d97706" text-anchor="end">(0, 1)</text>')
  parts.push('<text x="636" y="120" font-size="11" fill="#d97706" text-anchor="end">(3, 7)</text>')
  parts.push('<text x="560" y="280" font-size="11.5" fill="#0f766e" text-anchor="middle">one meet per probe — 5.3’s one door, drawn</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="338" width="660" height="42" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="354" font-size="11.5" fill="#0f766e" text-anchor="middle">left: y = 2 and x = −1 are solution sets drawn — two walls crossing in the single address (−1, 2);</text>')
  parts.push('<text x="360" y="371" font-size="11.5" fill="#0f766e" text-anchor="middle">right: each vertical probe meets y = 2x + 1 exactly once — the h = 0 probe rides the y-axis itself.</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson101: Lesson = {
  id: 'al-the-coordinate-plane-and-linear-graphs',
  number: '10.1',
  title: 'The Coordinate Plane and Linear Graphs',
  concepts: [
    'ordered pairs as addresses',
    'the coordinate plane and its four quadrants',
    'the origin and the axes',
    'graphing ax + by = c by intercepts',
    'the graph-as-solution-set identity',
    'horizontal and vertical lines',
    'the crossing of two lines as elimination’s answer',
  ],
  objectives: [
    'name every point of the plane by exactly one ordered pair and read the four quadrants off the signs of the coordinates',
    'graph ax + by = c by its intercepts (c/a, 0) and (0, c/b) — and by a second point when the line runs through the origin',
    'prove the graph-as-solution-set identity pointwise on a census: a point satisfies the equation exactly when it lies on the line',
    'read the horizontal line y = k and the vertical line x = h as the graphs of one-variable equations',
    'see a simultaneous pair’s elimination answer as the visible crossing point of two lines — and the doubled and conflicting pairs as coincident and parallel lines',
    'explain what the coordinate plane buys: every equation in two variables becomes a picture, and every picture a question about solutions',
  ],
  prerequisites: ['al-equations-in-two-variables', 'al-substitution-and-elimination', 'al-consistency-the-geometry-of-two-lines', 'al-the-three-verdicts-one-none-infinitely-many'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Chapter 6 solved pairs of equations in two variables by substitution and elimination, and its last lesson promised that the answer had a SHAPE: two lines, and their crossing. This lesson delivers the paper that promise is drawn on. The coordinate plane is not a new algebra — it is the same solution sets of chapter 5 and 6, laid out so that every solution is a PLACE you can point to. The tool that does it is almost indecently simple: an ordered pair of numbers $(x, y)$ used as an ADDRESS. The first number measures along the horizontal axis, the second along the vertical, and the pair $(x, y)$ names the one point those two measurements meet at. That is the whole machine.' },
    { kind: 'para', text: 'But simple machines deserve careful audits, and this lesson runs them. The verifier priced a designed 10-point census pointwise: each point read into its quadrant by the signs of its coordinates, with the origin and the axis points belonging to NO quadrant — the sign read has nothing to say when a coordinate is zero. It priced the one-to-one read (distinct ordered pairs are distinct addresses — order matters, $(2, 5) \\neq (5, 2)$). And it proved the lesson’s central identity, the one everything else stands on: for the line $3x + 2y = 6$, a census point satisfies the equation EXACTLY when it lies on the line through the intercepts — checked in both directions, with an exact determinant, on eight on-line points, four off-line points, and the whole $11 \\times 11$ integer window around the origin.' },
    { kind: 'heading', text: 'Ordered Pairs as Addresses' },
    { kind: 'para', text: 'Draw two number lines — the same honest lines of ANS chapter 8 — perpendicular, crossing at each line’s zero. The horizontal one is the $x$-axis, the vertical one the $y$-axis, and their crossing is the origin $O = (0, 0)$. To name a point $P$ of the plane: drop from $P$ to the $x$-axis and read the number landed on — call it $x$, the first coordinate; then read off the $y$-axis the height of $P$ — call it $y$. The ordered pair $(x, y)$ is the ADDRESS of $P$. The word ordered carries weight: $(2, 5)$ and $(5, 2)$ are DIFFERENT addresses, naming two different points — the first sits two steps right and five up, the second five right and two up. A pair is a route description, and routes do not survive swapping their steps.' },
    { kind: 'para', text: 'Read the four open regions the axes cut the plane into, counting anticlockwise from the upper right: quadrant I where both coordinates are positive, II where $x < 0 < y$, III where both are negative, IV where $x > 0 > y$. The verifier walked a designed census through the sign read and priced each point: $(2, 5)$ and $(6, 7)$ in I, $(-4, 1)$ in II, $(-3, -2)$ and $(-2, -6)$ in III, $(3, -2)$ and $(4, -1)$ in IV. And the census honest-servers: $(0, 4)$ sits on the $y$-axis, $(-5, 0)$ on the $x$-axis, $(0, 0)$ is the origin itself — each carries BOTH a zero coordinate, so each belongs to no quadrant at all. The quadrants are open rooms; the axes are the walls.' },
    { kind: 'table', caption: 'The addressing census, priced pointwise: the sign read names the quadrant, and a zero coordinate refuses it', head: ['Address', 'Signs', 'Region', 'Why'], rows: [
      ['$(2, 5)$', '(+, +)', 'quadrant I', 'right and up — both coordinates positive'],
      ['$(6, 7)$', '(+, +)', 'quadrant I', 'same signs, same room, different point'],
      ['$(-4, 1)$', '(−, +)', 'quadrant II', 'left and up — $x$ negative, $y$ positive'],
      ['$(-3, -2)$', '(−, −)', 'quadrant III', 'left and down — both negative'],
      ['$(-2, -6)$', '(−, −)', 'quadrant III', 'same room as $(-3, -2)$, distinct address'],
      ['$(3, -2)$', '(+, −)', 'quadrant IV', 'right and down — $x$ positive, $y$ negative'],
      ['$(4, -1)$', '(+, −)', 'quadrant IV', 'same room as $(3, -2)$, distinct address'],
      ['$(0, 4)$', '(0, +)', 'the $y$-axis', 'a zero coordinate — no quadrant'],
      ['$(-5, 0)$', '(−, 0)', 'the $x$-axis', 'a zero coordinate — no quadrant'],
      ['$(0, 0)$', '(0, 0)', 'the origin', 'both zero — the axes’ crossing itself'],
    ] },
    { kind: 'figure', caption: 'The addressing map: two perpendicular axes through O, the four quadrants labelled by their sign reads — and one census dot per quadrant carrying its ordered-pair address. The axes and the origin belong to no quadrant.', svg: addressingMapSvg() },
    { kind: 'terms', items: [
      { term: 'coordinate plane', def: 'the plane equipped with two perpendicular number lines (the axes) crossing at their zeros, so that every point of the plane carries exactly one ordered-pair address $(x, y)$ and every ordered pair names exactly one point.' },
      { term: 'ordered pair', def: 'the address $(x, y)$: first measure $x$ along the $x$-axis, then $y$ along the $y$-direction. Order is load-bearing — $(2, 5)$ and $(5, 2)$ are different addresses.' },
      { term: 'origin', def: 'the point $O = (0, 0)$ where the axes cross — the zero of both coordinates, and the natural base camp for every walk on the plane.' },
      { term: 'quadrant', def: 'one of the four open regions cut by the axes: I $(+, +)$, II $(−, +)$, III $(−, −)$, IV $(+, −)$, read anticlockwise from the upper right. Points on an axis belong to no quadrant.' },
      { term: 'x-intercept / y-intercept', def: 'for a line, the door where it crosses the $x$-axis (the point $(c/a, 0)$ of $ax + by = c$) and the door where it crosses the $y$-axis ($(0, c/b)$) — the two readings that graph the line.' },
      { term: 'graph of an equation', def: 'the set of ALL points whose coordinates satisfy the equation — for a linear equation $ax + by = c$ ($a, b$ not both zero), a straight line: the graph-as-solution-set identity of this lesson.' },
    ] },
    { kind: 'heading', text: 'Graphing a Linear Equation by Its Intercepts' },
    { kind: 'para', text: 'Now put chapter 6’s objects on the paper. An equation $ax + by = c$ with $a, b$ not both zero has a SOLUTION SET — all the pairs $(x, y)$ that satisfy it — and the graph of the equation is that solution set drawn: every solution plotted as its point, the whole family at once. For a linear equation the family is a straight line, and two of its members are free: the doors where the line crosses the axes. At the $x$-axis the height is zero, so substitute $y = 0$ and read $ax = c$: the door is $\\left(\\frac{c}{a}, 0\\right)$ — priced only when $a \\neq 0$. At the $y$-axis substitute $x = 0$: the door is $\\left(0, \\frac{c}{b}\\right)$, priced when $b \\neq 0$. Two doors pin a straight line completely — that is 6.3’s geometry speaking: a line is determined by two of its points.' },
    { kind: 'example', title: 'Graph 3x + 2y = 6 by its intercepts', steps: [
      'Set $y = 0$: $3x = 6$, so $x = 2$ — the $x$-intercept $(2, 0)$; the verifier substituted back: $3 \\cdot 2 + 2 \\cdot 0 = 6$.',
      'Set $x = 0$: $2y = 6$, so $y = 3$ — the $y$-intercept $(0, 3)$; substitution: $0 + 6 = 6$.',
      'Rule the two doors on the plane and draw the one straight line through them.',
      'Hence the graph: every solution of $3x + 2y = 6$ is a point of this line, and the next section proves the converse — every point of the line is a solution.',
    ] },
    { kind: 'example', title: 'Graph x − 2y = 4 by its intercepts', steps: [
      'Set $y = 0$: $x = 4$ — the door $(4, 0)$; check: $4 - 0 = 4$.',
      'Set $x = 0$: $-2y = 4$, so $y = -2$ — the door $(0, -2)$; check: $0 + 4 = 4$. The sign is honest: the line meets the $y$-axis BELOW the origin.',
      'Draw the line through $(4, 0)$ and $(0, -2)$.',
      'This is the partner line of the chapter: it will cross $3x + 2y = 6$ at exactly the point elimination predicted, and the crossing is drawn in the figure below.',
    ] },
    { kind: 'para', text: 'The intercept doors have a gap, and the gap is instructive. When $c = 0$ the two doors COLLAPSE: $\\frac{c}{a} = 0$ and $\\frac{c}{b} = 0$ both read the origin, and one point pins no line. A through-origin equation such as $2x - 3y = 0$ needs a second point found by hand — and the verifier priced two lawful doors: $(3, 2)$, since $2 \\cdot 3 - 3 \\cdot 2 = 0$, and $(-3, -2)$, since $-6 + 6 = 0$. In general, for $ax + by = 0$ the pairs $(b, -a)$ and $(-b, a)$ always serve, because $ab - ab = 0$. The collapse is not a failure of the method; it is the method reporting a fact — the line runs through the base camp itself.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — a door is a point, not a number', text: 'The intercepts of $3x + 2y = 6$ are the POINTS $(2, 0)$ and $(0, 3)$ — not the bare numbers 2 and 3. The trap runs deep because the algebra feels identical: "set $y = 0$" produces a NUMBER, but only the PAIR records where the door sits. Write the intercepts as $(5, 0)$ and $(0, 2)$ for $2x + 5y = 10$, never as "5 and 2" — on the plane, a number is not a place. The same discipline guards the axes themselves: the $x$-axis is the set of points $(t, 0)$, the $y$-axis the set $(0, t)$, and confusing the two mirrors every address wrongly.' },
    { kind: 'heading', text: 'The Graph-as-Solution-Set Identity' },
    { kind: 'para', text: 'Here is the theorem the whole chapter rests on — the precise statement that the drawn line and the algebraic solution set are THE SAME OBJECT, with nothing left over on either side. For the line $\\ell$ through the intercepts of $ax + by = c$ and any point $P$ of the plane: $P$ satisfies the equation exactly when $P$ lies on $\\ell$. The verifier proved both readings pointwise on the census of $3x + 2y = 6$. The on-line side: each of $(0, 3)$, $(2, 0)$, $(4, -3)$, $(-2, 6)$, $(1, \\frac{3}{2})$, $(-4, 9)$, $(6, -6)$ and the crossing point $\\left(\\frac{5}{2}, -\\frac{3}{4}\\right)$ satisfies the equation (exact rational arithmetic, no floats), AND each is exactly collinear with the intercept pair $(2, 0)$, $(0, 3)$ — the determinant $x_1(y_2 - y_3) + x_2(y_3 - y_1) + x_3(y_1 - y_2)$, which is twice the triangle’s area, came out zero every time. The off-line side: each of $(1, 1)$, $(3, 1)$, $(0, 0)$, $(2, 3)$ FAILS the equation ($3 + 2 = 5$, $9 + 2 = 11$, $0$, $12$ — none equal to 6) AND the same determinant refuses to vanish: off the equation, off the line. Even the whole $11 \\times 11$ integer window agreed: exactly three of its points — $(0, 3)$, $(2, 0)$, $(4, -3)$ — satisfy the equation, and exactly those three are collinear with the doors.' },
    { kind: 'equation', latex: 'ax + by = c \\;\\text{ holds at } (x, y) \\;\\iff\\; (x, y) \\text{ lies on the line through } \\left(\\tfrac{c}{a}, 0\\right) \\text{ and } \\left(0, \\tfrac{c}{b}\\right)', note: 'the graph-as-solution-set identity — the equation and the line are one object named twice; the verifier priced both directions pointwise' },
    { kind: 'para', text: 'The identity deserves a slow read, because it is the bridge of the whole book. From algebra to geometry: every solution you can compute (chapter 5’s balance moves, chapter 6’s elimination) lands on the drawn line — solving has a PICTURE. From geometry to algebra: every point your pencil meets on the line answers the equation — the picture has an ALGEBRA, and you can interrogate it without solving anything. When the next lesson asks "which of these lines is steeper?", it will read the answer off pairs of points, because the identity guarantees those pairs are points OF the equation. When chapter 9’s discriminant promised that the parabola crosses the $x$-axis as many times as $\\Delta$ allows, it was this identity, one degree up, that was being promised.' },
    { kind: 'para', text: 'Two one-variable equations complete the picture, and they are the walls talking. The equation $y = 2$ has solution set "every pair with height 2": the verifier priced $(−3, 2)$, $(0, 2)$, $(4, 2)$ in and $(0, 3)$, $(2, 0)$, $(−2, −2)$ out — its graph is the HORIZONTAL line at height 2. The equation $x = -1$ has solution set "every pair at position $-1$": $(−1, 5)$, $(−1, 0)$, $(−1, −4)$ in, $(−2, 0)$ and $(3, 1)$ out — the VERTICAL line at position $-1$. These are the graphs of one-variable equations read on the two-dimensional paper: a horizontal line is the equation $y = k$ wearing its full solution set, a vertical line is $x = h$. And the grid they build is rigid in the best way: the verifier priced the probes — every horizontal $y = k$ meets every vertical $x = h$ in exactly one point $(h, k)$, no more, no fewer. Addresses exist because that lock never jams.' },
    { kind: 'para', text: 'The vertical probes hide a deeper read that 5.3 already taught you to love. Take any non-vertical line, say $y = 2x + 1$ from next lesson’s family, and probe it with $x = h$: the meet is $(h, 2h + 1)$ — the verifier priced $h = -2, 0, 3$, landing $(-2, -3)$, $(0, 1)$, $(3, 7)$, one meet each, each satisfying the equation exactly. Every vertical probe meets the line EXACTLY once. That is 5.3’s verdict machine — a linear equation in one variable has exactly one solution unless the variable is gone — now standing upright on the plane: the "one door" is the single point where the probe pierces the line. Keep the image; the parabola of 10.3 will bend it beautifully.' },
    { kind: 'figure', caption: 'The identity’s two supporting pictures. Left: the one-variable equations drawn as walls — $y = 2$ is its whole solution set as a horizontal wall ((4, 2) rides it, (−1, −2) rides the vertical wall $x = -1$), and the two walls cross in exactly ONE address, (−1, 2): the grid lock that makes addresses exist at all. Right: a non-vertical machine, $y = 2x + 1$, probed vertically at $h = -2, 0, 3$ — each probe meets the line exactly once, at (−2, −3), (0, 1), (3, 7); the $h = 0$ probe is the y-axis itself, drawn as the thick amber dashes riding it. That is 5.3’s "one solution unless the variable is gone", now standing upright on the plane as the single point where the probe pierces the line.', svg: wallProbesSvg() },
    { kind: 'heading', text: 'Two Lines: the Crossing Is Elimination’s Answer' },
    { kind: 'para', text: 'Now collect chapter 6’s debt. The pair $3x + 2y = 6$ and $x - 2y = 4$ was solved in 6.2 by elimination: add the equations and the $y$-terms annihilate — $(3x + x) + (2y - 2y) = 4x$, while $6 + 4 = 10$ — so $4x = 10$, $x = \\frac{5}{2}$, and back-substitution gives $y = -\\frac{3}{4}$. The verifier re-priced the answer $\\left(\\frac{5}{2}, -\\frac{3}{4}\\right)$ in both equations exactly, then did something new: it priced the point’s COLLINEARITY with each line’s intercept pair. With $(2, 0)$ and $(0, 3)$: determinant zero. With $(4, 0)$ and $(0, -2)$: determinant zero. The elimination answer lies on BOTH drawn lines — it is their crossing, visible on the paper. The algebra of 6.2 and the geometry of this lesson agree to the last fraction, because both describe the same solution set (the identity, run twice).' },
    { kind: 'example', title: 'Solve the pair 3x + 2y = 6, x − 2y = 4 and point at the answer', steps: [
      'Add the equations: $4x = 10$, so $x = \\frac{5}{2}$ — the $y$-terms annihilated (6.2’s craft).',
      'Back-substitute into $x - 2y = 4$: $2y = \\frac{5}{2} - 4 = -\\frac{3}{2}$, so $y = -\\frac{3}{4}$.',
      'Check in the first equation: $3 \\cdot \\frac{5}{2} + 2 \\cdot \\left(-\\frac{3}{4}\\right) = \\frac{15}{2} - \\frac{3}{2} = 6$ — exact.',
      'Hence the solution $\\left(\\frac{5}{2}, -\\frac{3}{4}\\right)$ — and on the graph, the single point where the two drawn lines cross (the teal dot of the figure).',
    ] },
    { kind: 'para', text: 'And 5.3’s three verdicts? They were two-line statements all along, and the plane shows it. The pair $3x + 2y = 6$ with $6x + 4y = 12$ eliminates to $0 = 0$ — the second equation is the first written twice, the lines COINCIDE, and "infinitely many solutions" means every point of one drawn line is a crossing. The pair $3x + 2y = 6$ with $3x + 2y = 10$ eliminates to $0 = 4$ — false always — and on the paper the two lines are PARALLEL: same direction, never meeting, "no solution" means the crossing does not exist. The verifier priced both eliminations exactly. When the next lesson defines slope, it will explain these two pictures with one number each — but the pictures themselves are already honest: one line drawn twice, two lines that never touch.' },
    { kind: 'figure', caption: 'The graph of 3x + 2y = 6 through its intercept doors (2, 0) and (0, 3), with the census dots that satisfy it and the red crosses that fail it; the dashed partner x − 2y = 4 crosses at the teal dot (5/2, −3/4) — elimination’s answer, drawn.', svg: graphIdentitySvg() },
    { kind: 'callout', tone: 'insight', title: 'Insight — what the plane buys, and what it costs', text: 'Before this lesson, an equation in two variables was a STRING of algebra whose solutions were pairs of numbers computed one at a time. Now the whole solution set is an OBJECT you can hold: a line, with doors, crossings, and direction. Questions flip from computational to visual — "do these meet?" becomes "do the lines cross?", "how many solutions?" becomes "one crossing, none, or the same line twice?" The cost is a new discipline: the plane is only as honest as its addresses, and the identity is only as strong as its proof. That is why this lesson proved the identity with exact determinants instead of asserting it — the picture is a THEOREM, not a decoration. Next lesson adds the one number that measures a line’s direction, and the two-line verdicts of 5.3 become one-line reads.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'An ordered pair $(x, y)$ is an address: first coordinate along the $x$-axis, second along the $y$ — order matters, and each point carries exactly one.',
      'The sign read names the quadrant — I $(+, +)$, II $(−, +)$, III $(−, −)$, IV $(+, −)$ — and a zero coordinate means the axes, which belong to no quadrant.',
      'The graph of $ax + by = c$ is its whole solution set drawn: a straight line through the doors $\\left(\\frac{c}{a}, 0\\right)$ and $\\left(0, \\frac{c}{b}\\right)$ — replaced by a found second point when $c = 0$ collapses both doors onto the origin.',
      'The graph-as-solution-set identity: a point satisfies the equation exactly when it lies on the line — priced both directions with exact determinants.',
      '$y = k$ graphs horizontal, $x = h$ vertical; every vertical probe meets a non-vertical line exactly once — 5.3’s one door, drawn.',
      'A simultaneous pair’s elimination answer is the visible crossing of the two lines; $0 = 0$ is one line drawn twice, $0 = c$ ($c \\neq 0$) is two lines that never meet.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the synthesis of algebra and geometry', text: 'The coordinate plane is usually credited to René Descartes, whose La Géométrie (1637) attached algebra to the classical geometry of the Greeks; Pierre de Fermat reached the same synthesis a few years earlier in manuscript (his Ad locos planos et solidos isagogē circulated from the 1630s but was printed only in 1679), and the honest credit is shared. The folklore of the bedridden young Descartes watching a fly walk the ceiling and asking how to state its position with numbers is just that — folklore, unattested in his writings — but it encodes the real idea: a position is an address, and an address is numbers. What Descartes and Fermat saw was this lesson’s identity in generality: every first- or second-degree equation in two variables is a locus, a drawn shape, so every algebra problem has a geometric face and every geometric construction an algebraic one. The vocabulary crystallized later — Leibniz seems to have coined "coordinates" in 1692, from the Latin for "arranged together". Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The school canon (NCERT class 9’s coordinate geometry chapter, class 10’s linear graphs) examines this lesson directly: naming quadrants from signs, plotting points, reading intercepts off a drawn line, and the short-answer favourite "the point $(0, -3)$ lies on which axis?" (the $y$-axis — a zero first coordinate). The competitive bank (Khattar QA’s algebra scope, SSC and bank preliminaries, JEE-Main foundations) drills: (1) intercept reads at speed — the doors of $2x + 5y = 10$ are $(5, 0)$ and $(0, 2)$, one substitution each; (2) point-on-line tests — "does $(4, -3)$ lie on $3x + 2y = 6$?" is one substitution, not a graph; (3) crossing coordinates — solve the pair by elimination and state the intersection (this lesson’s $\\left(\\frac{5}{2}, -\\frac{3}{4}\\right)$ shape); (4) collinearity of three points — the determinant zero test, or the slope test of the next lesson; (5) the special families — "the graph of $x = -1$ is a vertical line" answered in one line. The graph is also the examiner’s LIE DETECTOR: a factoring slip that survives algebra often dies on sight when the "line" bends.' },
    { kind: 'formula', name: 'The intercept doors of ax + by = c', latex: 'x\\text{-door } \\left(\\tfrac{c}{a}, 0\\right), \\qquad y\\text{-door } \\left(0, \\tfrac{c}{b}\\right) \\qquad (a, b \\neq 0)', note: 'two doors pin the line — set y = 0, then x = 0; when c = 0 both doors collapse onto the origin and a found second point replaces them' },
    { kind: 'formula', name: 'The graph-as-solution-set identity', latex: '(x, y) \\text{ satisfies } ax + by = c \\;\\iff\\; (x, y) \\text{ lies on the line}', note: 'the equation and the line are one object — the bridge this book crosses from algebra into geometry' },
    { kind: 'formula', name: 'The special families', latex: 'y = k: \\text{ horizontal} \\qquad x = h: \\text{ vertical} \\qquad \\text{each probe meets once}', note: 'one-variable equations graph as walls; every vertical probe pierces a non-vertical line exactly once — 5.3’s verdict, drawn' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The point $(-3, -2)$ sits in', options: ['quadrant I', 'quadrant II', 'quadrant III', 'quadrant IV'], answer: 2, explain: 'Both coordinates are negative — the sign read $(−, −)$ names quadrant III. Quadrant II is $(−, +)$ (left and UP, like $(-4, 1)$); quadrant IV is $(+, −)$; quadrant I is all positive. And a point with a ZERO coordinate would be on an axis, in no quadrant at all.' },
      { q: 'The $x$-intercept of $2x + 5y = 10$ is', options: ['$(0, 2)$', '$(5, 0)$', '$(2, 0)$', '$(10, 0)$'], answer: 1, explain: 'Set $y = 0$: $2x = 10$, so the door is $(5, 0)$ — and the verifier substituted back: $10 + 0 = 10$. $(0, 2)$ is the $y$-intercept (the roles swapped); $(2, 0)$ is the $x$-intercept of $3x + 2y = 6$, a different line; $(10, 0)$ reads the constant instead of dividing by $a = 2$. An intercept is a POINT, never a bare number.' },
      { q: 'Which point lies on the graph of $3x + 2y = 6$?', options: ['$(1, 1)$', '$(4, -3)$', '$(2, 3)$', '$(0, 2)$'], answer: 1, explain: 'Substitute: $3 \\cdot 4 + 2 \\cdot (-3) = 12 - 6 = 6$ — satisfied, so the identity puts it on the line (the verifier collinearised it too: determinant zero with the intercepts). $(1, 1)$ gives $5$, $(2, 3)$ gives $12$, $(0, 2)$ gives $4$ — none equal 6, so all three sit off the line, among the red crosses of the figure.' },
      { q: 'The graph of the equation $x = -1$ is', options: ['a horizontal line', 'the $x$-axis', 'the vertical line through $-1$ on the $x$-axis', 'a single point'], answer: 2, explain: '$x = -1$ says "first coordinate $-1$, second coordinate free": the verifier priced $(-1, 5)$, $(-1, 0)$, $(-1, -4)$ all in — the full vertical wall at position $-1$. A horizontal line would be $y = k$; the $x$-axis is $y = 0$; a single point is no equation’s whole graph here — every vertical probe point qualifies.' },
      { q: 'The lines $3x + 2y = 6$ and $x - 2y = 4$ cross at', options: ['$(2, 0)$', '$(0, 3)$', '$\\left(\\frac{5}{2}, -\\frac{3}{4}\\right)$', 'they never cross'], answer: 2, explain: 'Elimination (6.2): adding kills $y$, giving $4x = 10$, so $x = \\frac{5}{2}$ and $y = -\\frac{3}{4}$ — the verifier satisfied BOTH equations and collinearised the point with both lines’ doors. $(2, 0)$ and $(0, 3)$ are the FIRST line’s own intercepts, not crossings; "never cross" would need the parallel picture — $0 = 4$ after elimination — which this pair refuses.' },
    ] },
    { kind: 'exercises', title: 'Exercises 10.1', sets: [
      { level: 'L1', questions: [
        { q: 'Name the quadrant of $(4, 7)$, $(-6, 2)$, $(-3, -5)$ and $(8, -2)$.', solution: [
          'Read the signs: $(4, 7)$ is $(+, +)$ — right and up.',
          'So, $(-6, 2)$ is $(−, +)$ and $(-3, -5)$ is $(−, −)$; $(8, -2)$ is $(+, −)$.',
          'Hence the four rooms in order: I, II, III, IV.',
        ], answer: 'I, II, III, IV respectively.' },
        { q: 'Do $(0, 4)$ and $(4, 0)$ name the same point? Explain.', solution: [
          'The address is ORDERED: first along $x$, then along $y$.',
          '$(0, 4)$ measures zero right and four up — it sits on the $y$-axis; $(4, 0)$ measures four right and zero up — on the $x$-axis.',
          'Hence they are different points: the verifier priced both addresses distinct, as it did for every census pair.',
        ], answer: 'No — order matters; they sit on different axes.' },
        { q: 'State the intercepts of $x + y = 5$ as points, and check each.', solution: [
          'Set $y = 0$: $x = 5$ — the door $(5, 0)$; check: $5 + 0 = 5$.',
          'Set $x = 0$: $y = 5$ — the door $(0, 5)$; check: $0 + 5 = 5$.',
          'Hence the line runs door to door, and any third point — say $(2, 3)$ — must satisfy $2 + 3 = 5$ to ride on it.',
        ], answer: '$(5, 0)$ and $(0, 5)$.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Graph $2x + 5y = 10$ by its intercepts, and name two more points of the line.', solution: [
          'Doors: $y = 0$ gives $(5, 0)$; $x = 0$ gives $(0, 2)$ — the verifier substituted both back.',
          'More points: try $y = -2$: $2x - 10 = 10$, so $x = 10$ — $(10, -2)$; try $y = 4$: $2x + 20 = 10$, so $x = -5$ — $(-5, 4)$.',
          'Check both: $20 - 10 = 10$ and $-10 + 20 = 10$ — exact.',
          'Hence the graph is the line through the two doors, carrying $(10, -2)$ and $(-5, 4)$ as priced passengers.',
        ], answer: 'Doors $(5, 0)$ and $(0, 2)$; also $(10, -2)$ and $(-5, 4)$.' },
        { q: 'The equation $2x - 3y = 0$: why do the intercepts fail, and what replaces them?', solution: [
          'Here $c = 0$, so both doors read $\\left(\\frac{0}{2}, 0\\right) = (0, 0)$ and $\\left(0, \\frac{0}{-3}\\right) = (0, 0)$ — they collapse onto the origin.',
          'One point pins no line; find a second point by hand: $(3, 2)$ works since $6 - 6 = 0$, and so does $(-3, -2)$ since $-6 + 6 = 0$.',
          'Hence the graph is the line through the origin and $(3, 2)$ — the verifier priced both walk doors on the general rule $(b, -a)$, $(-b, a)$.',
        ], answer: 'Both doors collapse to $(0, 0)$; the found point $(3, 2)$ replaces them.' },
        { q: 'Which of $(3, 1)$, $(1, 3)$, $(-1, 4)$, $(6, -1)$ lie on $x + 2y = 5$?', solution: [
          'Substitute each: $(3, 1)$: $3 + 2 = 5$ — yes.',
          '$(1, 3)$: $1 + 6 = 7$; $(-1, 4)$: $-1 + 8 = 7$; $(6, -1)$: $6 - 2 = 4$.',
          'Hence only $(3, 1)$ satisfies — the identity puts it on the line and leaves the other three off.',
        ], answer: 'Only $(3, 1)$.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Prove the identity on a mini-census: show that $(5, 0)$, $(0, \\frac{5}{2})$, $(1, 2)$, $(3, 1)$ and $(7, -1)$ all lie on the line of $x + 2y = 5$, and that $(2, 2)$ does not.', solution: [
          'Each candidate: $5 + 0 = 5$; $0 + 5 = 5$; $1 + 4 = 5$; $3 + 2 = 5$; $7 - 2 = 5$ — all five satisfy.',
          'Collinearity with the doors $(5, 0)$, $(0, \\frac{5}{2})$: the verifier computed the area determinant for each and got zero every time.',
          '$(2, 2)$: $2 + 4 = 6 \\neq 5$ — it fails the equation, and its determinant is nonzero: off the line.',
          'Hence satisfies ⟺ on the line, both directions, on this census — the identity in miniature.',
        ], answer: 'All five on the line (det = 0); $(2, 2)$ off.' },
        { q: 'Graph $y = 3$ and $x = 2$ on one pair of axes. Where do they meet, and how many times?', solution: [
          '$y = 3$ is the horizontal wall at height 3 — every point $(t, 3)$; $x = 2$ is the vertical wall at position 2 — every point $(2, t)$.',
          'A meet needs both: $(2, 3)$ — and the verifier priced the grid lock: exactly one such point, no more.',
          'Hence every horizontal meets every vertical exactly once — the lock that makes addresses possible.',
        ], answer: 'They meet exactly once, at $(2, 3)$.' },
        { q: 'Find the intercepts of $4x - 3y = 12$ and verify that the walk from $(0, -4)$ by (run 3, rise 4) lands on the line.', solution: [
          'Doors: $y = 0$ gives $x = 3$ — $(3, 0)$; $x = 0$ gives $y = -4$ — $(0, -4)$; both substituted back exactly.',
          'Walk: from $(0, -4)$, run $+3$ and rise $+4$ lands at $(3, 0)$ — the other door itself.',
          'Check the landing: $4 \\cdot 3 - 3 \\cdot 0 = 12$ — satisfied.',
          'Hence the doors are two steps of one walk — the observation next lesson turns into a number.',
        ], answer: 'Doors $(3, 0)$ and $(0, -4)$; the walk lands on $(3, 0)$.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve the pair $2x + y = 8$, $x - y = 1$ by elimination, and verify the answer is the visible crossing of the two graphs.', solution: [
          'Add: $3x = 9$, so $x = 3$; back-substitute: $y = 2$.',
          'Check both: $6 + 2 = 8$ and $3 - 2 = 1$ — exact.',
          'Doors: the first line runs $(4, 0)$ to $(0, 8)$; the second $(1, 0)$ to $(0, -1)$.',
          'Collinearity: the verifier got determinant zero for $(3, 2)$ against both door pairs — the answer sits on BOTH lines: the crossing, drawn.',
        ], answer: '$(3, 2)$ — the crossing of the two graphs.' },
        { q: 'For which $k$ does the pair $x + 2y = 5$, $2x + 4y = k$ have infinitely many solutions, and for which none? Say what each case looks like on the plane.', solution: [
          'Double the first equation: $2x + 4y = 10$ — the second must say the same thing.',
          'Subtract: $0 = k - 10$. If $k = 10$: $0 = 0$ always — the second equation is the first written twice.',
          'On the plane: one line drawn twice — COINCIDENT, every point a crossing: infinitely many.',
          'If $k \\neq 10$: $0 = $ nonzero, false always — the equations conflict, and on the plane two distinct lines with the same direction: PARALLEL, no crossing, none. (The verifier priced both eliminations.)',
        ], answer: '$k = 10$: coincident lines, infinitely many; $k \\neq 10$: parallel lines, none.' },
        { q: 'Are $A(1, 1)$, $B(3, 5)$, $C(2, 3)$ collinear? Which one is the odd one out if any?', solution: [
          'The line through $A$ and $B$: check $C$ against the doors’ determinant — the verifier computed it exactly: zero.',
          'So all three lie on one line — nobody is odd out; in fact $C = (2, 3)$ is the MIDPOINT of $A$ and $B$: $\\left(\\frac{1+3}{2}, \\frac{1+5}{2}\\right) = (2, 3)$.',
          'Each point satisfies $y = 2x - 1$: $1 = 2 - 1$, $5 = 6 - 1$, $3 = 4 - 1$ — the equation of the line all three ride.',
          'Hence collinear, with $C$ the halfway address.',
        ], answer: 'Yes — all three on $y = 2x - 1$; $C$ is the midpoint.' },
      ] },
      { level: 'L5', questions: [
        { q: 'A line has equation $by = c$ with $b, c \\neq 0$. What is its graph, where are its intercepts, and which quadrants does it visit when $c/b > 0$? When $c/b < 0$?', solution: [
          'Divide by $b$: $y = \\frac{c}{b}$ — the horizontal wall at height $\\frac{c}{b}$ (the $a = 0$ family: the equation never mentions $x$).',
          'Doors: the $y$-intercept is $\\left(0, \\frac{c}{b}\\right)$; there is NO $x$-intercept — the wall runs parallel to the $x$-axis and never crosses it.',
          'If $\\frac{c}{b} > 0$: the wall sits ABOVE the $x$-axis, visiting quadrant II on the left and I on the right (the verifier priced the sign read at height 2).',
          'If $\\frac{c}{b} < 0$: below, visiting III and IV.',
        ], answer: 'The horizontal line $y = c/b$; $y$-door only; above: II and I, below: III and IV.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: a line through two distinct points $(x_1, y_1)$, $(x_2, y_2)$ with $x_1 \\neq x_2$ meets every vertical probe $x = h$ exactly once, and its points are exactly $y = y_1 + \\frac{(y_2 - y_1)(x - x_1)}{x_2 - x_1}$. Verify the formula on the eight on-line census points of $3x + 2y = 6$.', solution: [
          'The formula gives, for each $x$, ONE $y$: the probe $x = h$ meets the line exactly at $\\left(h, y_1 + \\frac{(y_2 - y_1)(h - x_1)}{x_2 - x_1}\\right)$ — existence and uniqueness in one line (the denominator is the clause $x_1 \\neq x_2$).',
          'The formula IS an equation of the line: rearrange to $\\frac{y - y_1}{y_2 - y_1} = \\frac{x - x_1}{x_2 - x_1}$ — both sides the same ratio of steps (the verifier cross-multiplied exactly).',
          'For $3x + 2y = 6$ with doors $(2, 0)$, $(0, 3)$: $y = 0 + \\frac{(3 - 0)(x - 2)}{0 - 2} = 3 - \\frac{3}{2}(x - 2)$, i.e. $y = 6 - \\frac{3}{2}x$ — multiply by 2: $2y = 12 - 3x$, the original equation.',
          'The verifier ran the formula at all eight on-line census points — $(0, 3)$, $(2, 0)$, $(4, -3)$, $(-2, 6)$, $(1, \\frac{3}{2})$, $(-4, 9)$, $(6, -6)$, $(\\frac{5}{2}, -\\frac{3}{4})$ — every read exact.',
          'Hence the line meets each vertical probe once — 5.3’s one door, proved on the plane.',
        ], answer: 'One meet per probe at $y = y_1 + \\frac{(y_2 - y_1)(h - x_1)}{x_2 - x_1}$; all 8 census reads exact.' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* Figure 3 (10.2): the steepness theorem — the line y = 2x + 1 with   */
/* two congruent rise/run staircases. Header (30,18,660,40); theorem   */
/* panel (470,88,220,150); caption band (30,330,660,46). Origin        */
/* (110,290), 22 px per unit; the line (99,290)→(209,70); staircases   */
/* at (0,1)→(2,5) and (2,5)→(4,9). Geometry pinned in                  */
/* verify-book3-ch10.ts plan102Fig1.                                   */
/* ------------------------------------------------------------------ */

function steepnessSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The line y = 2x + 1 with four census dots and two rise/run staircases — (0,1) to (2,5) and (2,5) to (4,9) — each pricing run 2, rise 4, slope 2: the climb per step does not depend on the step">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the steepness theorem — the climb per step does not depend on the step</text>')
  // ---- axes ----
  parts.push('<line x1="40" y1="290" x2="310" y2="290" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="318,290 306,285 306,295" fill="#0d9488"/>')
  parts.push('<text x="326" y="295" font-size="13" fill="#0f766e" font-style="italic">x</text>')
  parts.push('<line x1="110" y1="320" x2="110" y2="66" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<polygon points="110,58 105,70 115,70" fill="#0d9488"/>')
  parts.push('<text x="117" y="64" font-size="13" fill="#0f766e" font-style="italic">y</text>')
  // ---- unit ticks ----
  const xt3 = [132, 154, 176, 198]
  for (const tx of xt3) parts.push(`<line x1="${tx}" y1="286" x2="${tx}" y2="294" stroke="#0d9488" stroke-width="1"/>`)
  const yt3 = [246, 202, 158, 114, 312]
  for (const ty of yt3) parts.push(`<line x1="106" y1="${ty}" x2="114" y2="${ty}" stroke="#0d9488" stroke-width="1"/>`)
  parts.push('<text x="102" y="304" font-size="11" fill="#d97706" text-anchor="end">O</text>')
  // ---- the line y = 2x + 1 ----
  parts.push('<line x1="99" y1="290" x2="209" y2="70" stroke="#16a34a" stroke-width="2.5"/>')
  // ---- staircase 1: (0,1) → (2,5) ----
  parts.push('<line x1="110" y1="268" x2="154" y2="268" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>')
  parts.push('<line x1="154" y1="268" x2="154" y2="180" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>')
  parts.push('<text x="130" y="280" font-size="10.5" fill="#d97706" text-anchor="middle">run 2</text>')
  parts.push('<text x="162" y="254" font-size="10.5" fill="#d97706">rise 4</text>')
  // ---- staircase 2: (2,5) → (4,9) ----
  parts.push('<line x1="154" y1="180" x2="198" y2="180" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>')
  parts.push('<line x1="198" y1="180" x2="198" y2="92" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4,3"/>')
  parts.push('<text x="204" y="176" font-size="10.5" fill="#d97706">run 2</text>')
  parts.push('<text x="204" y="140" font-size="10.5" fill="#d97706">rise 4</text>')
  // ---- census dots ----
  parts.push('<circle cx="110" cy="268" r="5" fill="#ea580c"/>')
  parts.push('<text x="100" y="276" font-size="11" fill="#d97706" text-anchor="end">(0, 1)</text>')
  parts.push('<circle cx="132" cy="224" r="5" fill="#ea580c"/>')
  parts.push('<circle cx="154" cy="180" r="5" fill="#ea580c"/>')
  parts.push('<text x="166" y="194" font-size="11" fill="#d97706">(2, 5)</text>')
  parts.push('<circle cx="198" cy="92" r="5" fill="#ea580c"/>')
  parts.push('<text x="212" y="88" font-size="11" fill="#d97706">(4, 9)</text>')
  // ---- theorem panel ----
  parts.push('<rect x="470" y="88" width="220" height="150" rx="6" fill="#fef3c7" stroke="#d97706" stroke-width="1"/>')
  parts.push('<text x="580" y="110" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">the steepness theorem</text>')
  parts.push('<text x="580" y="130" font-size="10.5" fill="#166534" text-anchor="middle">pick ANY two points of the</text>')
  parts.push('<text x="580" y="146" font-size="10.5" fill="#166534" text-anchor="middle">line: m = rise/run is the</text>')
  parts.push('<text x="580" y="162" font-size="10.5" fill="#166534" text-anchor="middle">same number — here 2, all</text>')
  parts.push('<text x="580" y="178" font-size="10.5" fill="#166534" text-anchor="middle">6 pairs priced exact;</text>')
  parts.push('<text x="580" y="194" font-size="10.5" fill="#166534" text-anchor="middle">the triangles scale (3/2,</text>')
  parts.push('<text x="580" y="210" font-size="10.5" fill="#166534" text-anchor="middle">3/2) so the ratio cannot</text>')
  parts.push('<text x="580" y="226" font-size="10.5" fill="#166534" text-anchor="middle">move — m belongs to the line</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="330" width="660" height="46" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="348" font-size="11.5" fill="#0f766e" text-anchor="middle">whichever pair of points prices the climb — (0,1) to (2,5) or (2,5) to (4,9) — the ratio is rise/run = 4/2 = 2;</text>')
  parts.push('<text x="360" y="366" font-size="11.5" fill="#0f766e" text-anchor="middle">the scaled pair (1,3) to (4,9) gives 6/3 = 2 as well — the slope belongs to the line, not to the pair chosen.</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (10.2): the two-line verdict strip — parallel, meet once,  */
/* coincident. Header (30,18,660,40); panels (30,76,205,200),          */
/* (245,76,205,200), (460,76,230,200); caption band (30,292,660,28).   */
/* Geometry pinned in verify-book3-ch10.ts plan102Fig2.                */
/* ------------------------------------------------------------------ */

function verdictStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three verdict panels for a pair of lines: parallel — same slope, different intercept, no crossing; meet once — different slopes, one crossing at (2, 5); coincident — one line written twice, every point a crossing">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">two lines, three verdicts — the slope reads them before any solving</text>')
  // ---- panel 1: PARALLEL ----
  parts.push('<rect x="30" y="76" width="205" height="200" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="132" y="100" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">1 · PARALLEL — none</text>')
  parts.push('<text x="132" y="120" font-size="10.5" fill="#0f766e" text-anchor="middle">same slope, different intercept</text>')
  parts.push('<line x1="60" y1="240" x2="205" y2="140" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<line x1="60" y1="266" x2="205" y2="166" stroke="#d97706" stroke-width="2"/>')
  parts.push('<text x="64" y="136" font-size="10" fill="#16a34a">y = 2x + 1</text>')
  parts.push('<text x="172" y="268" font-size="10" fill="#d97706">y = 2x − 3</text>')
  parts.push('<text x="96" y="254" font-size="10.5" fill="#dc2626">1 = −3, false → ∅</text>')
  // ---- panel 2: MEET ONCE ----
  parts.push('<rect x="245" y="76" width="205" height="200" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="347" y="96" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">2 · MEET ONCE — one</text>')
  parts.push('<text x="347" y="116" font-size="10.5" fill="#0f766e" text-anchor="middle">different slopes, one meet</text>')
  parts.push('<line x1="265" y1="255" x2="410" y2="127.5" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<line x1="265" y1="140" x2="425" y2="240" stroke="#d97706" stroke-width="2"/>')
  parts.push('<circle cx="341.7" cy="187.8" r="9" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<circle cx="341.7" cy="187.8" r="5.5" fill="#ea580c"/>')
  parts.push('<text x="252" y="120" font-size="10" fill="#16a34a">y = 2x + 1</text>')
  parts.push('<text x="252" y="196" font-size="10" fill="#16a34a">y = 2x + 1</text>')
  parts.push('<text x="268" y="180" font-size="10" fill="#d97706">(2, 5)</text>')
  parts.push('<text x="438" y="270" font-size="10" fill="#d97706" text-anchor="end">y = −x + 7</text>')
  parts.push('<text x="300" y="252" font-size="10.5" fill="#0f766e">different slopes meet once</text>')
  // ---- panel 3: COINCIDENT ----
  parts.push('<rect x="460" y="76" width="230" height="200" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="575" y="100" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">3 · COINCIDENT — all</text>')
  parts.push('<text x="575" y="120" font-size="10.5" fill="#0f766e" text-anchor="middle">one line, written twice</text>')
  parts.push('<line x1="490" y1="253" x2="665" y2="103" stroke="#16a34a" stroke-width="2.5"/>')
  parts.push('<line x1="490" y1="259" x2="665" y2="109" stroke="#d97706" stroke-width="1.5" stroke-dasharray="3,4"/>')
  parts.push('<text x="535" y="246" font-size="10" fill="#d97706">4x − 2y + 2 = 0</text>')
  parts.push('<text x="500" y="272" font-size="10" fill="#16a34a">y = 2x + 1</text>')
  parts.push('<text x="590" y="204" font-size="10.5" fill="#0f766e">every point</text>')
  parts.push('<text x="590" y="220" font-size="10.5" fill="#0f766e">is a crossing</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="292" width="660" height="28" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="303" font-size="10.5" fill="#0f766e" text-anchor="middle">5.3’s three verdicts, now drawn:</text>')
  parts.push('<text x="360" y="317" font-size="10.5" fill="#0f766e" text-anchor="middle">same slope different intercept → NONE (∅) · different slopes → meet once, at (2, 5) · the same line twice → ALL points</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson102: Lesson = {
  id: 'al-slope-the-steepness-theorem',
  number: '10.2',
  title: 'Slope: the Steepness Theorem',
  concepts: [
    'slope m = rise over run',
    'the steepness theorem (point-choice independence)',
    'the slope of horizontal and vertical lines',
    'the coefficient readout m = −a/b',
    'the parallel condition m₁ = m₂',
    'the slope-intercept form y = mx + b',
    'slope as a rate',
  ],
  objectives: [
    'define slope from two points as m = (y₂ − y₁)/(x₂ − x₁) and compute it exactly, signs included',
    'prove the steepness theorem: the slope does not depend on which two points of the line you pick — the similar-triangle read',
    'read m = −a/b and the y-intercept c/b straight off ax + by = c, and cross-check against the intercept walk',
    'distinguish the special slopes: m = 0 on a horizontal line, and UNDEFINED on a vertical line — the zero-division guard kept honest',
    'prove the parallel condition for non-vertical lines — parallel exactly when m₁ = m₂ — and read 5.3’s three two-line verdicts off the slopes',
    'price a rate (rupees per km, degrees per °C) as a slope and use the rate to predict',
  ],
  prerequisites: ['al-the-coordinate-plane-and-linear-graphs', 'al-consistency-the-geometry-of-two-lines', 'al-the-three-verdicts-one-none-infinitely-many', 'al-solving-linear-inequalities'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Last lesson put every solution set on the paper and left one property unmeasured: DIRECTION. Two lines can both pass through the origin and still have nothing else in common; two lines can run side by side forever without meeting. The single number that measures a line’s direction — its steepness, its tilt, its climb per step — is the SLOPE, and this lesson derives it properly: defined from two points, PROVED independent of the pair you pick (the steepness theorem), read straight off the coefficients, and then put to work as the judge of 5.3’s three two-line verdicts. The verifier priced every claim on designed census lines in exact rational arithmetic before a word of this prose existed.' },
    { kind: 'para', text: 'The definition rides on last lesson’s walk. To climb from a point $P_1 = (x_1, y_1)$ to a point $P_2 = (x_2, y_2)$ of a line, you step RUN along the $x$-direction ($x_2 - x_1$) and RISE along the $y$-direction ($y_2 - y_1$). The slope is the ratio:' },
    { kind: 'equation', latex: 'm \\;=\\; \\frac{\\text{rise}}{\\text{run}} \\;=\\; \\frac{y_2 - y_1}{x_2 - x_1}, \\qquad x_1 \\neq x_2', note: 'the slope between two distinct points — the clause x₁ ≠ x₂ is the vertical guard, and it is load-bearing (see below)' },
    { kind: 'para', text: 'The clause $x_1 \\neq x_2$ is not decoration — it is the same forbidden division 5.1 policed. If the run is zero, the two points sit on one vertical line $x = x_1$, the rise is climb with no advance, and the ratio $\\frac{\\text{rise}}{0}$ is undefined: the field laws refuse it, and so does this book. The verifier’s slope engine REFUSED to divide when the guard fired — no float, no approximation, no "infinity": the vertical line’s slope is honestly UNDEFINED, and the refusal is the theorem. Watch the same guard return in 10.3, where it will explain why a parabola needs no such clause at all.' },
    { kind: 'heading', text: 'The Steepness Theorem' },
    { kind: 'para', text: 'Here is the theorem that makes the slope WORTH having. Take the line $y = 2x + 1$ and its four census points $(0, 1)$, $(1, 3)$, $(2, 5)$, $(4, 9)$ — the verifier first confirmed each sits on the line exactly. Now price the slope from EVERY pair of the four: $\\binom{4}{2} = 6$ pairs, and all six ratios came out $2$. From $(0, 1)$ to $(2, 5)$: $\\frac{5 - 1}{2 - 0} = \\frac{4}{2} = 2$. From $(1, 3)$ to $(4, 9)$: $\\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$. From $(0, 1)$ to $(4, 9)$: $\\frac{8}{4} = 2$. All six — every pair, every order (reversing the pair flips both rise and run, and the minuses cancel: $\\frac{-6}{-3} = 2$). The second designed line $y = -\\frac{3}{2}x + 4$ through $(0, 4)$, $(2, 1)$, $(4, -2)$ priced $-\\frac{3}{2}$ on all three pairs. The slope does not care which two points you borrow: it belongs to the LINE.' },
    { kind: 'derivation', title: 'Theorem — the slope is the same from every pair of points', statement: 'If $P_1, P_2, P_3, P_4$ are points of one non-vertical line, then $\\frac{y_2 - y_1}{x_2 - x_1} = \\frac{y_4 - y_3}{x_4 - x_3}$: the rise/run ratio is independent of the pair chosen.', steps: [
      { label: 'Same line', explanation: 'The equation of the line is $y = mx + b$ for some fixed $m$ and $b$ (this is the readout derived in the next section — or, read forward, the definition of the line’s own ratio).' },
      { label: 'Price pair 1', explanation: 'Pair $P_1, P_2$ on the line: $y_2 - y_1 = (mx_2 + b) - (mx_1 + b) = m(x_2 - x_1)$ — the intercept $b$ cancels, exactly.' },
      { label: 'Price pair 2', explanation: 'Pair $P_3, P_4$: the same cancellation gives $y_4 - y_3 = m(x_4 - x_3)$ — the same $m$, because the line is one equation.' },
      { label: 'Divide', explanation: 'Both pairs have nonzero run (non-vertical clause), so $\\frac{y_2 - y_1}{x_2 - x_1} = m = \\frac{y_4 - y_3}{x_4 - x_3}$ — the ratios are the same number $m$.' },
      { label: 'The geometry', explanation: 'The two rise/run rectangles between the pairs are SIMILAR: scaling the run by any factor scales the rise by the same factor (the verifier priced it: runs 2 and 3 scale by $\\frac{3}{2}$, and the rises 4 and 6 scale by exactly $\\frac{3}{2}$ too). Similar rectangles have equal ratios — the theorem in one picture.' },
    ], result: 'The slope of a non-vertical line is a property of the LINE — every pair of its points prices the same m. This is the steepness theorem.' },
    { kind: 'figure', caption: 'The steepness staircase on y = 2x + 1: two rise/run rectangles, (0,1)→(2,5) and (2,5)→(4,9), each pricing run 2, rise 4 — slope 2; the scaled pair (1,3)→(4,9) prices 6/3 = 2 as well. The slope belongs to the line.', svg: steepnessSvg() },
    { kind: 'para', text: 'The theorem upgrades the definition from a computation to a DESCRIPTION. Slope is not "a ratio you compute from two points"; it is THE steepness of the line, which any two points happen to reveal — the way any two readings of a thermometer reveal the temperature. That is why the same letter $m$ can sit in the equation $y = mx + b$: the line is exactly the family of points $(x, mx + b)$, one point per $x$ — the "exactly one vertical probe meet" of last lesson, now with a name for the tilt.' },
    { kind: 'terms', items: [
      { term: 'slope', def: 'the number $m = \\frac{y_2 - y_1}{x_2 - x_1}$ priced from any two distinct points of a non-vertical line — the rise per unit of run. By the steepness theorem it is a property of the line, not of the pair.' },
      { term: 'rise / run', def: 'the vertical step $y_2 - y_1$ and the horizontal step $x_2 - x_1$ in the walk from one point of the line to another; the slope is their ratio.' },
      { term: 'the steepness theorem', def: 'the slope computed from ANY pair of points of a line is the same — proved by the cancellation of the intercept (and seen geometrically as similar rise/run rectangles).' },
      { term: 'slope-intercept form', def: 'the dress $y = mx + b$: the coefficient $m$ is the slope, the constant $b$ is the $y$-intercept — the line’s direction and door, read off one equation.' },
      { term: 'the parallel condition', def: 'two DISTINCT non-vertical lines are parallel exactly when their slopes are equal ($m_1 = m_2$): same climb per step, never meeting. Vertical lines are parallel to each other by the same walk with no run.' },
      { term: 'rate', def: 'a slope carrying units — rupees per kilometre, degrees Fahrenheit per degree Celsius. The steepness theorem says a true rate is constant along its line: that is what makes linear prediction lawful.' },
    ] },
    { kind: 'heading', text: 'Reading the Slope off the Coefficients' },
    { kind: 'para', text: 'Most equations arrive in the standard dress $ax + by = c$, not $y = mx + b$ — and the slope is one lawful move away. Solve for $y$ (the balance law, $b \\neq 0$): $by = c - ax$, so $y = -\\frac{a}{b}x + \\frac{c}{b}$. Reading the slope-intercept dress directly:' },
    { kind: 'equation', latex: 'ax + by = c \\;\\iff\\; y = -\\frac{a}{b}\\,x + \\frac{c}{b}, \\qquad m = -\\frac{a}{b}, \\quad y\\text{-door } \\left(0, \\tfrac{c}{b}\\right) \\quad (b \\neq 0)', note: 'the coefficient readout — the slope is minus the ratio of the coefficients, and the constant term is the y-door; the verifier cross-priced it against the intercept walk' },
    { kind: 'para', text: 'The verifier ran the cross-check on last lesson’s exhibits, because a readout that disagrees with a walked measurement is a broken readout. For $3x + 2y = 6$: the readout says $m = -\\frac{3}{2}$; the intercept walk $(0, 3) \\to (2, 0)$ prices $\\frac{0 - 3}{2 - 0} = -\\frac{3}{2}$ — agreement. For $x - 2y = 4$: readout $m = -\\frac{1}{-2} = \\frac{1}{2}$, walk $(0, -2) \\to (4, 0)$ prices $\\frac{0 - (-2)}{4 - 0} = \\frac{2}{4} = \\frac{1}{2}$ — agreement. For $2x - 3y = 0$: readout $m = -\\frac{2}{-3} = \\frac{2}{3}$, and the origin walk $(0, 0) \\to (3, 2)$ prices $\\frac{2}{3}$ — agreement, with the through-origin line carrying no constant term, exactly as $c = 0$ predicts. Two minus signs live in this readout and both are load-bearing: the minus on $\\frac{a}{b}$, and whatever sign $b$ itself carries.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the minus belongs to the readout', text: 'The slope of $3x + 2y = 6$ is $-\\frac{3}{2}$, not $\\frac{3}{2}$: the line FALLS 3 for every 2 of run — from $(0, 3)$ to $(2, 0)$ the height DROPS. The classic slip is dropping the minus and then "explaining" the fall by flipping the run; the honest bookkeeping is $m = -\\frac{a}{b}$ with $a, b$ in their Standard-form seats. The same discipline catches the double sign: for $x - 2y = 4$ the readout is $-\\frac{1}{-2} = +\\frac{1}{2}$ — the two minuses annihilate, and the line RISES. One collection, one readout, one sign check.' },
    { kind: 'para', text: 'The special slopes fall out of the same formulas, and they are the boundary of the whole family. Horizontal $y = k$ (the $a = 0$ case): $m = -\\frac{0}{b} = 0$ — zero rise per run, the flat line; the verifier priced $\\frac{2 - 2}{4 - (-3)} = 0$ on the wall $y = 2$. Vertical $x = h$ (the $b = 0$ case): the readout DIVIDES BY ZERO — the guard fires, and the slope is UNDEFINED, the honest verdict the engine refused to fake. So the slope numbers the non-vertical world completely: positive $m$ climbs (rise positive over positive run), negative $m$ falls, $m = 0$ is flat, and the vertical wall stands outside the numbering — every non-vertical line meets it, but no $m$ measures it.' },
    { kind: 'heading', text: 'The Parallel Condition and the Two-Line Verdicts' },
    { kind: 'para', text: 'Now the payoff: 5.3’s three verdicts and 6.3’s two-line geometry, judged by one number. The verifier staged the three cases on designed pairs. PARALLEL: $y = 2x + 1$ and $y = 2x - 3$ — same slope $2$, different intercepts ($1 \\neq -3$); equating them for a crossing gives $2x + 1 = 2x - 3$, which collects to $1 = -3$ — FALSE for every $x$, the solution set is $\\emptyset$: 5.3’s "none", drawn as two lines that run in the same direction forever and never touch. COINCIDENT: $y = 2x + 1$ and $4x - 2y + 2 = 0$ — dividing the second by $-2$ returns the first EXACTLY ($\\frac{4}{-2} = -2$, $\\frac{-2}{-2} = 1$, $\\frac{2}{-2} = -1$: $y = 2x + 1$); the elimination runs to $0 = 0$, every $x$ serves: 5.3’s "infinitely many", one line written twice. MEET ONCE: $y = 2x + 1$ and $y = -x + 7$ — slopes $2$ and $-1$ DIFFER; equating gives $3x = 6$, so $x = 2$ and $y = 5$: the crossing $(2, 5)$, verified in both equations exactly. Different slopes, one meet — always, by the same linear-equation logic.' },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the parallel condition', text: 'Two distinct non-vertical lines are parallel if and only if their slopes are equal: $m_1 = m_2$. Proof: if $m_1 = m_2$ with different intercepts, equating the lines gives $m_1x + b_1 = m_1x + b_2$, which forces $b_1 = b_2$ — false by distinctness, so no crossing exists (parallel). Conversely, if $m_1 \\neq m_2$, the equation $m_1x + b_1 = m_2x + b_2$ is linear with the nonzero coefficient $m_1 - m_2$, so it has exactly one solution — the lines meet (5.3’s one-door verdict). The verifier staged all three cases exactly.' },
    { kind: 'para', text: 'Read the theorem once more and notice what it does to chapter 6: the elimination verdicts ($0 = 0$, $0 = c$, a genuine solution) were computed per pair — now the SLOPES predict the verdict before any elimination: equal slopes with different intercepts promise $\\emptyset$; different slopes promise exactly one meet; and proportionality of the whole equation (all three ratios $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$ equal — the doubled equation’s fingerprint, priced exactly as $\\frac{3}{6} = \\frac{2}{4} = \\frac{6}{12} = \\frac{1}{2}$) promises the same line. The $k$-hunt is the competitive favourite: the verifier hunted $k$ so that $2x + ky = 4$ parallels $y = 3x + 1$ — the readout gives $m = -\\frac{2}{k} = 3$, so $k = -\\frac{2}{3}$ (the line is $6x - 2y = 12$, walking $(0, -6) \\to (2, 0)$ at slope $3$, intercept $-6 \\neq 1$: distinct, parallel, $\\emptyset$). And the honest edge: $k = 0$ makes the first equation $2x = 4$ — the VERTICAL line $x = 2$, undefined slope, and it MEETS $y = 3x + 1$ at $(2, 7)$: a vertical line is parallel to no non-vertical line.' },
    { kind: 'example', title: 'Through (1, 6): the parallel and the perpendicular door', steps: [
      'The parallel to $y = 2x + 1$ through $(1, 6)$: same slope $2$, so $y = 2x + b$ with $6 = 2 \\cdot 1 + b$, giving $b = 4$: the line $y = 2x + 4$.',
      'The verifier walked $(0, 4) \\to (1, 6)$: slope $\\frac{6 - 4}{1 - 0} = 2$ — parallel confirmed, and distinct (intercept $4 \\neq 1$): it never meets $y = 2x + 1$.',
      'The perpendicular through the same point: slope $-\\frac{1}{2}$ (the negative reciprocal — $2 \\cdot \\left(-\\frac{1}{2}\\right) = -1$), giving $y = -\\frac{1}{2}x + \\frac{13}{2}$.',
      'Check: $-\\frac{1}{2} \\cdot 1 + \\frac{13}{2} = 6$ — the point serves; the product $-1$ is the perpendicular doorway, whose full proof rides in Coordinate Geometry — this book banks the read and labels the door.',
    ] },
    { kind: 'heading', text: 'Slope as a Rate' },
    { kind: 'para', text: 'The slope’s deepest disguise is a RATE, and the steepness theorem is the reason rates can be trusted. A taxi charges 50 rupees to flag down plus 12 rupees per kilometre: the fare line $F = 50 + 12d$ passes $(0, 50)$ and $(3, 86)$ — the verifier priced the slope $\\frac{86 - 50}{3 - 0} = \\frac{36}{3} = 12$, and the units ride along: 12 rupees PER KILOMETRE. The rate predicts without re-solving: at $d = 7$, $F = 50 + 84 = 134$. The steepness theorem is the promise that the per-km price is the same at every kilometre — a TRUE rate is constant along its line, which is exactly why linear word problems predict lawfully and why a fare that "changes with distance travelled" would refuse to graph as one line.' },
    { kind: 'example', title: 'The Celsius–Fahrenheit line: a rate of 9/5 and a meeting at −40', steps: [
      'Two fixed points of the conversion: $(0, 32)$ (freezing) and $(100, 212)$ (boiling) — both on the Fahrenheit scale of Celsius.',
      'Slope: $m = \\frac{212 - 32}{100 - 0} = \\frac{180}{100} = \\frac{9}{5}$ — nine Fahrenheit degrees per five Celsius degrees, a true rate.',
      'The line: $F = \\frac{9}{5}C + 32$; the verifier verified $C = 37$: $F = \\frac{333}{5} + 32 = \\frac{493}{5} = 98.6$ — body temperature, read off the line.',
      'Where the scales agree: solve $C = \\frac{9}{5}C + 32$, so $-\\frac{4}{5}C = 32$ and $C = -40$; check: $\\frac{9}{5}(-40) + 32 = -72 + 32 = -40$ — the meeting point, priced exactly.',
    ] },
    { kind: 'figure', caption: 'The two-line verdict strip: parallel (same slope, different intercept — equating gives 1 = −3, the set ∅), meet once (different slopes — the crossing (2, 5), ringed), coincident (one line written twice — every point a crossing). 5.3’s three verdicts, drawn.', svg: verdictStripSvg() },
    { kind: 'callout', tone: 'insight', title: 'Insight — one number, three verdicts, and the parabola ahead', text: 'Chapter 6 needed a full elimination per pair to count crossings; this lesson counts them from the slopes alone — $m_1 = m_2$ with $b_1 \\neq b_2$ is "none", $m_1 \\neq m_2$ is "one", proportionality is "all". That is the same upgrade 9.3 made: the discriminant read a quadratic’s verdict off its coefficients before any solving, and the slope reads a pair of lines’ verdict off theirs. The pattern — VERDICTS LIVE IN COEFFICIENTS — is the book’s deepest recurring idea, and it has one more act: 10.3 graphs the parabola $y = ax^2 + bx + c$, where chapter 9’s discriminant counts the $x$-intercepts exactly, and the vertex sits at the centre $x = -\\frac{b}{2a}$ that 9.3’s formula already named. The straight lines of this lesson are the firm ground that graph measures the bend against.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'The slope between two distinct points is $m = \\frac{y_2 - y_1}{x_2 - x_1}$ — rise over run, signs and all, with the clause $x_1 \\neq x_2$ the honest vertical guard.',
      'The steepness theorem: every pair of a line’s points prices the same $m$ (the intercept cancels; the rise/run rectangles are similar) — the slope belongs to the line.',
      'The readout: $ax + by = c$ has $m = -\\frac{a}{b}$ and $y$-door $(0, \\frac{c}{b})$ ($b \\neq 0$); the intercept walk must agree with it.',
      'Horizontal is $m = 0$; vertical is UNDEFINED — the guard fired, and the refusal is the answer.',
      'Parallel (distinct, non-vertical) ⟺ $m_1 = m_2$; different slopes meet exactly once; the fully proportional pair is one line twice — 5.3’s verdicts from coefficients.',
      'A rate is a slope with units, and the steepness theorem is why it predicts: 12 rupees per km, $\\frac{9}{5}$ degrees per degree, one line each.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — measuring steepness before the plane', text: 'Steepness was measured as a RATIO long before it was measured as a coordinate computation: the builders of ramps, roofs and roads spoke in "gradients" like "1 in 20" — one unit of climb for twenty of run — and the convention survives today on railway signage and in road-grading tables, a rise-over-run definition in period dress. The word slope entered English mathematics writing in the nineteenth century; the same idea reached calculus earlier as the "tangent of the angle of inclination", and the trigonometric identity $m = \\tan\\theta$ (for the angle $\\theta$ the line makes with the positive $x$-axis) is the bridge this book’s Coordinate Geometry successor will formalize. What the coordinate plane added was the theorem this lesson proved: the ratio is the SAME from every pair of points — one number per line, not one per measurement. The notation $m$ for slope has no recorded single origin; the running (and unverified) classroom legend that it honours one man or another is folklore — the honest statement is that the letter settled into American textbooks in the 1800s and stayed. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope, SSC and bank preliminaries, JEE-Main foundations) drills this lesson under "straight lines — basics": (1) two-point slopes at speed — $\\frac{y_2 - y_1}{x_2 - x_1}$ with signs kept, and the instant classifications (uphill, downhill, flat, vertical); (2) parallel hunts — "find $k$ so that $2x + ky = 4$ is parallel to $3x - y = 7$" is the readout $-\\frac{2}{k} = 3$ in one line (this lesson’s $k = -\\frac{2}{3}$ shape, the $k = 0$ vertical edge a favourite trick option); (3) the crossing pair — "do $2x + 3y = 8$ and $4x + 6y = 13$ intersect?" needs no solving: proportional $a, b$ with non-proportional $c$ is the parallel verdict, $\\emptyset$; (4) rate lines — cost/charge word problems where the slope is the unit price and the intercept the flag-fall (this lesson’s fare and Fahrenheit shapes); (5) collinearity of three points — equal slopes across two pairs, the cleanest test of 10.1’s determinant read. The school canon (NCERT class 9–10) asks gentler cousins: read $m$ and $b$ off $y = mx + c$, and plot from the intercepts. Every one of these items is a coefficient read — the exam is testing whether you know the verdict lives in the coefficients.' },
    { kind: 'formula', name: 'The slope from two points', latex: 'm = \\frac{y_2 - y_1}{x_2 - x_1} \\qquad (x_1 \\neq x_2)', note: 'rise over run — the vertical clause is the honest guard, and by the steepness theorem the pair does not matter' },
    { kind: 'formula', name: 'The coefficient readout', latex: 'ax + by = c \\;\\Longrightarrow\\; m = -\\frac{a}{b}, \\quad y\\text{-door } \\left(0, \\tfrac{c}{b}\\right) \\qquad (b \\neq 0)', note: 'the slope-intercept dress y = mx + b in one lawful move — the minus belongs to the readout' },
    { kind: 'formula', name: 'The parallel condition and the verdicts', latex: 'm_1 = m_2,\\; b_1 \\neq b_2: \\text{ parallel } (\\emptyset) \\quad\\cdot\\quad m_1 \\neq m_2: \\text{ meet once} \\quad\\cdot\\quad \\text{proportional}: \\text{ one line}', note: '5.3’s three verdicts read off the coefficients before any solving — the 9.3 pattern, one degree lower' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The slope through $(1, 3)$ and $(4, 9)$ is', options: ['$2$', '$\\frac{3}{2}$', '$6$', '$\\frac{1}{2}$'], answer: 0, explain: '$m = \\frac{9 - 3}{4 - 1} = \\frac{6}{3} = 2$ — rise over run, exactly. $\\frac{3}{2}$ inverts the ratio (run over rise); $6$ is the rise alone with the run forgotten; $\\frac{1}{2}$ is the reciprocal slip. Reversing the pair gives $\\frac{3 - 9}{1 - 4} = \\frac{-6}{-3} = 2$ — the two minuses cancel, the same slope.' },
      { q: 'The slope of the line $3x + 2y = 6$ is', options: ['$\\frac{3}{2}$', '$-\\frac{3}{2}$', '$\\frac{2}{3}$', '$-\\frac{2}{3}$'], answer: 1, explain: 'The readout $m = -\\frac{a}{b} = -\\frac{3}{2}$ — and the intercept walk agrees: $(0, 3) \\to (2, 0)$ prices $\\frac{0 - 3}{2 - 0} = -\\frac{3}{2}$, the line FALLS. $\\frac{3}{2}$ drops the minus (the readout’s sign is load-bearing); $\\frac{2}{3}$ and $-\\frac{2}{3}$ invert the ratio. The verifier cross-priced the readout against the walk on three lines.' },
      { q: 'A vertical line', options: ['has slope 0', 'has slope 1', 'has no slope — undefined, because the run is 0', 'has slope −1'], answer: 2, explain: 'Between two points of $x = h$ the run $x_2 - x_1$ is 0, and division by zero is the one move the field laws forbid — the verifier’s engine REFUSED to divide, and the refusal is the honest answer. Slope 0 is the HORIZONTAL line’s (zero rise, nonzero run); 1 and −1 measure ordinary tilts.' },
      { q: 'The lines $y = 2x + 1$ and $y = 2x - 3$ are', options: ['the same line', 'meeting exactly once', 'parallel — they never meet', 'perpendicular'], answer: 2, explain: 'Same slope 2, different intercepts: equating for a crossing gives $2x + 1 = 2x - 3$, which collects to $1 = -3$ — false for every $x$, the solution set is $\\emptyset$ (the verifier priced it). The same line would need the same intercept; one meet needs different slopes; perpendicular needs the product $-1$, and here $2 \\cdot 2 = 4$.' },
      { q: 'The Celsius→Fahrenheit line through $(0, 32)$ and $(100, 212)$ has slope', options: ['$\\frac{9}{5}$', '$\\frac{5}{9}$', '$180$', '$32$'], answer: 0, explain: '$m = \\frac{212 - 32}{100 - 0} = \\frac{180}{100} = \\frac{9}{5}$ — nine Fahrenheit degrees per five Celsius degrees, a true rate. $\\frac{5}{9}$ is the inverse read (Celsius per Fahrenheit — the other scale’s rate); $180$ is the rise alone; $32$ is the intercept $b$ (the freezing door), not the tilt. The verifier used the rate to price $C = 37 \\to 98.6$ and the meeting at $-40$.' },
    ] },
    { kind: 'exercises', title: 'Exercises 10.2', sets: [
      { level: 'L1', questions: [
        { q: 'Compute the slope through $(0, 1)$, $(2, 5)$, and through $(0, 4)$, $(2, 1)$. Say what each sign means.', solution: [
          'First pair: $m = \\frac{5 - 1}{2 - 0} = \\frac{4}{2} = 2$ — positive: the line CLIMBS.',
          'Second pair: $m = \\frac{1 - 4}{2 - 0} = \\frac{-3}{2} = -\\frac{3}{2}$ — negative: the line FALLS.',
          'Hence uphill at 2, downhill at $\\frac{3}{2}$ per step of run — the signs are the direction, the sizes the steepness.',
        ], answer: '$m = 2$ (uphill) and $m = -\\frac{3}{2}$ (downhill).' },
        { q: 'Find the slope of $y = 5$ between two of its points; then attempt the slope of $x = 3$ and state honestly what happens.', solution: [
          'Two points of $y = 5$: $(-2, 5)$ and $(7, 5)$: $m = \\frac{5 - 5}{7 - (-2)} = \\frac{0}{9} = 0$ — flat.',
          'Two points of $x = 3$: $(3, 1)$ and $(3, 8)$: the run is $3 - 3 = 0$.',
          '$\\frac{8 - 1}{0}$ asks for division by zero — the guard refuses; no slope exists.',
          'Hence horizontal is $m = 0$; vertical is UNDEFINED — the honest verdict, not a big number.',
        ], answer: '$y = 5$: $m = 0$; $x = 3$: undefined (run 0).' },
        { q: 'Read $m$ and $b$ from $y = \\frac{1}{2}x - 4$, and name the $y$-intercept point.', solution: [
          'The dress is already slope-intercept: $m = \\frac{1}{2}$, $b = -4$.',
          'The $y$-door: set $x = 0$ — $(0, -4)$, below the origin, exactly as the minus says.',
          'Hence the line climbs half a step of rise per step of run starting from $(0, -4)$ — walk to $(2, -3)$ to feel it: $\\frac{-3 - (-4)}{2 - 0} = \\frac{1}{2}$.',
        ], answer: '$m = \\frac{1}{2}$, $b = -4$, $y$-door $(0, -4)$.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Where do $y = -x + 7$ and $y = 2x + 1$ meet? Verify the answer in both equations.', solution: [
          'Equate: $-x + 7 = 2x + 1$, so $3x = 6$ and $x = 2$.',
          'Then $y = 2 \\cdot 2 + 1 = 5$ — the candidate $(2, 5)$.',
          'Check in the first: $-2 + 7 = 5$; in the second: $4 + 1 = 5$ — both exact (the verifier priced both).',
          'Hence the meet is $(2, 5)$ — different slopes promise exactly one, and here it is.',
        ], answer: '$(2, 5)$ — verified in both equations.' },
        { q: 'Find the slope of $2x - 3y = 0$ two ways: by the coefficient readout, and by walking its points $(3, 2)$ and $(-3, -2)$.', solution: [
          'Readout: $m = -\\frac{a}{b} = -\\frac{2}{-3} = \\frac{2}{3}$ — the two minuses annihilate.',
          'Walk $(0, 0) \\to (3, 2)$: $\\frac{2 - 0}{3 - 0} = \\frac{2}{3}$; walk $(3, 2) \\to (-3, -2)$: $\\frac{-2 - 2}{-3 - 3} = \\frac{-4}{-6} = \\frac{2}{3}$.',
          'Hence readout and both walks agree — the steepness theorem holding on a through-origin line.',
        ], answer: '$m = \\frac{2}{3}$, priced three ways.' },
        { q: 'Walk the line $3x + 2y = 6$: from $(0, 3)$ take three steps of (run 2, rise −3) and verify every landing.', solution: [
          'The readout: $m = -\\frac{3}{2}$ — so run 2 must pair with rise $-3$.',
          'Step 1: $(0, 3) \\to (2, 0)$ — the $x$-door itself; check: $6 + 0 = 6$.',
          'Step 2: $(2, 0) \\to (4, -3)$; check: $12 - 6 = 6$. Step 3: $(4, -3) \\to (6, -6)$; check: $18 - 12 = 6$.',
          'Hence the doors are steps of one walk — the slope was hiding in last lesson’s graph all along.',
        ], answer: 'Landings $(2, 0)$, $(4, -3)$, $(6, -6)$ — all on the line.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Prove the steepness theorem on $y = 2x + 1$: list all $\\binom{4}{2} = 6$ pairs of its points $(0, 1)$, $(1, 3)$, $(2, 5)$, $(4, 9)$ and price each slope.', solution: [
          'Pairs and ratios: $(0,1),(1,3)$: $\\frac{2}{1} = 2$; $(0,1),(2,5)$: $\\frac{4}{2} = 2$; $(0,1),(4,9)$: $\\frac{8}{4} = 2$.',
          '$(1,3),(2,5)$: $\\frac{2}{1} = 2$; $(1,3),(4,9)$: $\\frac{6}{3} = 2$; $(2,5),(4,9)$: $\\frac{4}{2} = 2$.',
          'The scaled read: runs 2 and 3 scale by $\\frac{3}{2}$, rises 4 and 6 scale by $\\frac{3}{2}$ — similar rectangles, equal ratios.',
          'Hence all six slopes equal 2 — the theorem priced exhaustively (the verifier ran the same six).',
        ], answer: 'All 6 pairwise slopes are 2 — the slope belongs to the line.' },
        { q: 'Classify each pair — parallel, coincident, or meeting — and justify by slopes: (a) $y = \\frac{1}{2}x + 2$ vs $y = \\frac{1}{2}x - 1$; (b) $x - y = 0$ vs $2x - 2y = 0$; (c) $y = 3x$ vs $y = -3x$.', solution: [
          '(a) Slopes $\\frac{1}{2}$ and $\\frac{1}{2}$ equal, intercepts $2 \\neq -1$: PARALLEL — equating gives $3 = 0$, false: $\\emptyset$.',
          '(b) The second is the first times 2 (the verifier priced $\\frac{1}{2} = \\frac{-1}{-2} = \\frac{0}{0}$’s fingerprint: proportional coefficients): COINCIDENT — every point.',
          '(c) Slopes $3$ and $-3$ differ: MEET — equating gives $6x = 0$, the origin $(0, 0)$, which both lines carry.',
          'Hence none / all / one — 5.3’s verdicts read off the slopes, no elimination needed.',
        ], answer: '(a) parallel ∅; (b) coincident (all); (c) meet at $(0, 0)$.' },
        { q: 'A taxi charges 50 rupees flag-fall plus 12 per kilometre. Price the rate from the two rides $(0, 50)$ and $(3, 86)$, then predict the fare at 7 km.', solution: [
          'Rate: $m = \\frac{86 - 50}{3 - 0} = \\frac{36}{3} = 12$ rupees per km — the units ride the ratio.',
          'The line: $F = 50 + 12d$; the intercept 50 is the flag-fall, the slope the per-km price.',
          'Predict: $F(7) = 50 + 84 = 134$ — no new ride needed.',
          'Hence the steepness theorem at work: the rate is the same at every kilometre, so the prediction is lawful.',
        ], answer: '$m = 12$/km; the 7 km fare is 134 rupees.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find every $k$ for which $2x + ky = 4$ is parallel to $y = 3x + 1$, and examine the edge $k = 0$ honestly.', solution: [
          'Readout: the first line has $m = -\\frac{2}{k}$ (for $k \\neq 0$); the second has $m = 3$.',
          'Parallel needs $-\\frac{2}{k} = 3$, so $k = -\\frac{2}{3}$; then the line is $6x - 2y = 12$, i.e. $y = 3x - 6$ — same slope, intercept $-6 \\neq 1$: distinct and parallel, the set $\\emptyset$.',
          'The edge $k = 0$: the equation becomes $2x = 4$ — the VERTICAL line $x = 2$, slope undefined.',
          'Hence vertical is parallel to NO non-vertical line: it MEETS $y = 3x + 1$ at $(2, 7)$ (the verifier priced $6 + 1 = 7$) — the guard fired lawfully, and the meet exists.',
        ], answer: '$k = -\\frac{2}{3}$; at $k = 0$ the line is vertical and meets at $(2, 7)$.' },
        { q: 'On the Fahrenheit line $F = \\frac{9}{5}C + 32$: verify $F(37) = 98.6$, then find the temperature where the scales agree.', solution: [
          'Verify: $\\frac{9}{5} \\cdot 37 = \\frac{333}{5} = 66.6$, so $F = 66.6 + 32 = 98.6$ — exact in fifths: $\\frac{493}{5}$.',
          'The scales agree where $C = F$: solve $C = \\frac{9}{5}C + 32$, so $-\\frac{4}{5}C = 32$ and $C = -40$.',
          'Check: $\\frac{9}{5}(-40) + 32 = -72 + 32 = -40$ — both scales read the same number.',
          'Hence $-40$ is the meeting — the crossing of the conversion line with the diagonal $F = C$, priced exactly.',
        ], answer: '$F(37) = 98.6$; the scales meet at $-40$.' },
        { q: 'Are $A(0, 1)$, $B(2, 5)$, $C(5, 11)$ collinear? Use slopes, and cross-check with the equation of the line.', solution: [
          'Slope $AB$: $\\frac{5 - 1}{2 - 0} = 2$. Slope $BC$: $\\frac{11 - 5}{5 - 2} = \\frac{6}{3} = 2$. Slope $AC$: $\\frac{11 - 1}{5 - 0} = 2$.',
          'All three ratios equal — $B$ and $C$ sit on the line through $A$ with slope 2: collinear.',
          'The line: $y = 2x + 1$ (through $A$: $b = 1$); check $B$: $5 = 4 + 1$; check $C$: $11 = 10 + 1$ — exact.',
          'Hence collinear by the slope test — the cleanest of the three-point tests.',
        ], answer: 'Yes — all three on $y = 2x + 1$.' },
      ] },
      { level: 'L5', questions: [
        { q: 'Through $(1, 6)$, find the line parallel to $y = 2x + 1$ and the line perpendicular to it (slope the negative reciprocal — the product read, whose proof rides in Coordinate Geometry). Verify both pass through $(1, 6)$ and that the slopes multiply to $-1$.', solution: [
          'Parallel: same slope 2 — $y = 2x + b$ with $6 = 2 + b$, so $b = 4$: the line $y = 2x + 4$.',
          'Distinctness: intercepts $4 \\neq 1$ — so the parallel never meets $y = 2x + 1$ (the verifier walked $(0, 4) \\to (1, 6)$ at slope 2).',
          'Perpendicular: slope $-\\frac{1}{2}$ (since $2 \\cdot (-\\frac{1}{2}) = -1$) — $y = -\\frac{1}{2}x + b$ with $6 = -\\frac{1}{2} + b$, so $b = \\frac{13}{2}$: the line $y = -\\frac{1}{2}x + \\frac{13}{2}$.',
          'Checks: $-\\frac{1}{2} + \\frac{13}{2} = 6$ — the point serves; the product $2 \\cdot (-\\frac{1}{2}) = -1$ — the door labelled.',
        ], answer: 'Parallel $y = 2x + 4$; perpendicular $y = -\\frac{1}{2}x + \\frac{13}{2}$; product $-1$.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: two distinct lines $a_1x + b_1y = c_1$ and $a_2x + b_2y = c_2$ with all coefficients nonzero are parallel exactly when $a_1 b_2 = a_2 b_1$ (slope equality cross-multiplied), coincident exactly when additionally $a_1 c_2 = a_2 c_1$, and meet exactly once otherwise. Verify on the three designed pairs of this chapter.', solution: [
          'Slopes: $m_1 = -\\frac{a_1}{b_1}$, $m_2 = -\\frac{a_2}{b_2}$; equality $-\\frac{a_1}{b_1} = -\\frac{a_2}{b_2}$ cross-multiplies (both $b$ nonzero) to $a_1 b_2 = a_2 b_1$ — the parallel test with no division.',
          'If also $a_1 c_2 = a_2 c_1$: with $a_1 b_2 = a_2 b_1$ the ratios $\\frac{a_1}{a_2} = \\frac{b_1}{b_2} = \\frac{c_1}{c_2}$ agree — the second equation is the first scaled: COINCIDENT (the verifier priced $\\frac{3}{6} = \\frac{2}{4} = \\frac{6}{12} = \\frac{1}{2}$ on $3x + 2y = 6$ vs $6x + 4y = 12$).',
          'Otherwise (distinct, equal slopes): equating forces the false $b_1 = b_2$-read — the elimination runs to a false $0 = c$: PARALLEL, $\\emptyset$ (priced on $3x + 2y = 6$ vs $3x + 2y = 10$: $3 \\cdot 2 = 3 \\cdot 2$ but $6 \\neq 10$).',
          'And $a_1 b_2 \\neq a_2 b_1$ means $m_1 \\neq m_2$: the meet-once case (priced on $3x + 2y = 6$ vs $x - 2y = 4$: $3 \\cdot (-2) = -6 \\neq 2 = 1 \\cdot 2$, crossing $\\left(\\frac{5}{2}, -\\frac{3}{4}\\right)$).',
          'Hence the three verdicts are three coefficient reads — 5.3’s machine, cross-multiplied.',
        ], answer: 'Parallel ⟺ $a_1b_2 = a_2b_1$; coincident iff also $a_1c_2 = a_2c_1$; else one meet — all three pairs priced.' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* The chapter                                                         */
/* ------------------------------------------------------------------ */

/* ------------------------------------------------------------------ */
/* Figure 1 (10.3): the workhorse parabola y = 2x² − 7x + 3. Header    */
/* (30,18,660,40); fold-identity panel (500,96,180,168); caption band  */
/* (30,338,660,42). Origin (150,240), 45 px per unit in x, 20 px per   */
/* unit in y; the curve exits the top at (118, 60) and (339.5, 60)     */
/* through the vertex (228.75, 302.5) — Bézier control (228.75, 545);  */
/* axis of symmetry dashed at x = 228.75. Doors (172.5, 240),          */
/* (285, 240); y-intercept (150, 180); census dots (195, 280),         */
/* (240, 300), (330, 100); twins (262.5, 280), (217.5, 300). Geometry  */
/* pinned in verify-book3-ch10.ts plan103Fig1.                         */
/* ------------------------------------------------------------------ */

function parabolaWorkhorseSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The graph of y = 2x squared minus 7x plus 3: an upward bowl through the doors (1/2, 0) and (3, 0), folding at the vertex (7/4, minus 25/8) on the dashed axis of symmetry x = 7/4, with the y-intercept (0, 3), the census dots and the amber twin pairs">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the graph of y = 2x² − 7x + 3 — the bowl, its vertex, its axis, its doors and its twins</text>')
  // ---- axes ----
  parts.push('<line x1="60" y1="240" x2="455" y2="240" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<polygon points="455,240 447,236 447,244" fill="#16a34a"/>')
  parts.push('<line x1="150" y1="340" x2="150" y2="65" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<polygon points="150,65 146,73 154,73" fill="#16a34a"/>')
  parts.push('<text x="462" y="244" font-size="11" fill="#166534">x</text>')
  parts.push('<text x="144" y="74" font-size="11" fill="#166534" text-anchor="end">y</text>')
  parts.push('<text x="138" y="256" font-size="10" fill="#65a30d">O</text>')
  // x ticks (−1, 2, 4 kept clear of the door labels)
  for (const [px, lab] of [[105, '−1'], [240, '2'], [330, '4']] as [number, string][]) {
    parts.push(`<line x1="${px}" y1="237" x2="${px}" y2="243" stroke="#16a34a" stroke-width="1"/>`)
    parts.push(`<text x="${px}" y="256" font-size="10" fill="#65a30d" text-anchor="middle">${lab}</text>`)
  }
  // y ticks
  for (const [py, lab] of [[84, '8'], [124, '6'], [164, '4'], [204, '2'], [284, '−2'], [324, '−4']] as [number, string][]) {
    parts.push(`<line x1="147" y1="${py}" x2="153" y2="${py}" stroke="#16a34a" stroke-width="1"/>`)
    parts.push(`<text x="116" y="${py + 4}" font-size="10" fill="#65a30d" text-anchor="end">${lab}</text>`)
  }
  // ---- the axis of symmetry (dashed) ----
  parts.push('<line x1="228.75" y1="66" x2="228.75" y2="334" stroke="#0d9488" stroke-width="1.4" stroke-dasharray="5 4"/>')
  parts.push('<text x="234" y="78" font-size="10.5" fill="#0f766e">x = 7/4</text>')
  // ---- the curve (quadratic Bézier through the vertex) ----
  parts.push('<path d="M 118 60 Q 228.75 545 339.5 60" fill="none" stroke="#16a34a" stroke-width="2.4"/>')
  parts.push('<text x="352" y="100" font-size="11" fill="#166534">y = 2x² − 7x + 3</text>')
  // ---- the doors ----
  parts.push('<circle cx="172.5" cy="240" r="5" fill="#ea580c"/>')
  parts.push('<text x="166" y="268" font-size="10.5" fill="#d97706" text-anchor="end">(1/2, 0)</text>')
  parts.push('<circle cx="285" cy="240" r="5" fill="#ea580c"/>')
  parts.push('<text x="292" y="262" font-size="10.5" fill="#d97706" text-anchor="middle">(3, 0)</text>')
  // ---- the y-intercept ----
  parts.push('<circle cx="150" cy="180" r="5" fill="#ea580c"/>')
  parts.push('<text x="140" y="190" font-size="10.5" fill="#d97706" text-anchor="end">(0, 3)</text>')
  // ---- the vertex ----
  parts.push('<circle cx="228.75" cy="302.5" r="6" fill="none" stroke="#ea580c" stroke-width="1.8"/>')
  parts.push('<circle cx="228.75" cy="302.5" r="3.5" fill="#ea580c"/>')
  parts.push('<text x="220" y="320" font-size="10.5" fill="#d97706" text-anchor="end">(7/4, −25/8)</text>')
  // ---- census dots ----
  parts.push('<circle cx="195" cy="280" r="4" fill="#0d9488"/>')
  parts.push('<text x="188" y="296" font-size="10" fill="#0f766e" text-anchor="end">(1, −2)</text>')
  parts.push('<circle cx="240" cy="300" r="4" fill="#0d9488"/>')
  parts.push('<text x="248" y="314" font-size="10" fill="#0f766e">(2, −3)</text>')
  parts.push('<circle cx="330" cy="100" r="4" fill="#0d9488"/>')
  parts.push('<text x="338" y="118" font-size="10" fill="#0f766e">(4, 7)</text>')
  // ---- the twins (amber, open) ----
  parts.push('<circle cx="262.5" cy="280" r="4" fill="none" stroke="#d97706" stroke-width="1.6"/>')
  parts.push('<text x="272" y="292" font-size="10" fill="#d97706">(5/2, −2)</text>')
  parts.push('<circle cx="217.5" cy="300" r="4" fill="none" stroke="#d97706" stroke-width="1.6"/>')
  // ---- fold-identity panel ----
  parts.push('<rect x="500" y="96" width="180" height="168" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="590" y="118" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">the fold identity</text>')
  parts.push('<text x="590" y="140" font-size="11.5" fill="#0f766e" text-anchor="middle">y = 2(x − 7/4)² − 25/8</text>')
  parts.push('<text x="590" y="162" font-size="10.5" fill="#65a30d" text-anchor="middle">vertex (7/4, −25/8)</text>')
  parts.push('<text x="590" y="178" font-size="10.5" fill="#65a30d" text-anchor="middle">a = 2 &gt; 0 — a minimum</text>')
  parts.push('<text x="590" y="198" font-size="10.5" fill="#0f766e" text-anchor="middle">Δ = 25 &gt; 0 — two doors</text>')
  parts.push('<text x="590" y="214" font-size="10.5" fill="#0f766e" text-anchor="middle">(1/2, 0) and (3, 0)</text>')
  parts.push('<text x="590" y="234" font-size="10.5" fill="#65a30d" text-anchor="middle">axis of symmetry</text>')
  parts.push('<text x="590" y="250" font-size="10.5" fill="#65a30d" text-anchor="middle">x = 7/4 — the mirror</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="338" width="660" height="42" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="356" font-size="11.5" fill="#0f766e" text-anchor="middle">the workhorse parabola — the vertex (7/4, −25/8) is the fold point, the axis x = 7/4 mirrors every twin</text>')
  parts.push('<text x="360" y="372" font-size="11.5" fill="#0f766e" text-anchor="middle">the doors (1/2, 0) and (3, 0) are Δ = 25’s two roots drawn; the amber rings are the designed twin pairs</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (10.3): the three-verdict strip — the x-intercept verdicts */
/* of 9.3 drawn. Header (30,18,660,40); verdict panels (30,76,205,200),*/
/* (245,76,205,200), (460,76,230,200); caption band (30,292,660,28).   */
/* Panel axes at y = 230; the two-door bowl Q 135 390 crosses at       */
/* (108, 230) and (162, 230); the touch bowl Q 347 352 meets at        */
/* (347, 230) only; the none bowl Q 575 210 floats above. Geometry     */
/* pinned in verify-book3-ch10.ts plan103Fig2.                         */
/* ------------------------------------------------------------------ */

function xVerdictsStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three small bowls showing the x-intercept verdicts: y = 2x squared minus 7x plus 3 crosses the axis twice, y = x minus 1 squared touches it once, and y = x squared plus 1 never meets it">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="44" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the x-intercept verdicts of 9.3, drawn — two doors, one tangent touch, none</text>')
  // ---- panel 1: TWO DOORS ----
  parts.push('<rect x="30" y="76" width="205" height="200" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="132" y="98" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">1 · TWO DOORS — Δ &gt; 0</text>')
  parts.push('<text x="132" y="116" font-size="10.5" fill="#0f766e" text-anchor="middle">y = 2x² − 7x + 3</text>')
  parts.push('<line x1="45" y1="230" x2="220" y2="230" stroke="#16a34a" stroke-width="1.3"/>')
  parts.push('<path d="M 62 108 Q 135 390 208 108" fill="none" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<circle cx="108.2" cy="230" r="4.5" fill="#ea580c"/>')
  parts.push('<text x="108" y="250" font-size="10" fill="#d97706" text-anchor="end">(1/2, 0)</text>')
  parts.push('<circle cx="161.8" cy="230" r="4.5" fill="#ea580c"/>')
  parts.push('<text x="160" y="250" font-size="10" fill="#d97706" text-anchor="start">(3, 0)</text>')
  parts.push('<text x="132" y="266" font-size="10.5" fill="#dc2626" text-anchor="middle">two meets — two roots</text>')
  // ---- panel 2: TANGENT TOUCH ----
  parts.push('<rect x="245" y="76" width="205" height="200" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="347" y="98" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">2 · TANGENT TOUCH — Δ = 0</text>')
  parts.push('<text x="347" y="116" font-size="10.5" fill="#0f766e" text-anchor="middle">y = (x − 1)²</text>')
  parts.push('<line x1="260" y1="230" x2="435" y2="230" stroke="#16a34a" stroke-width="1.3"/>')
  parts.push('<path d="M 277 108 Q 347 352 417 108" fill="none" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<circle cx="347" cy="230" r="4.5" fill="#ea580c"/>')
  parts.push('<text x="347" y="248" font-size="10" fill="#d97706" text-anchor="middle">(1, 0)</text>')
  parts.push('<text x="347" y="266" font-size="10.5" fill="#dc2626" text-anchor="middle">one meet — the vertex rests on the axis</text>')
  // ---- panel 3: NONE ----
  parts.push('<rect x="460" y="76" width="230" height="200" rx="6" fill="none" stroke="#0d9488" stroke-width="1.2"/>')
  parts.push('<text x="575" y="98" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">3 · NONE — Δ &lt; 0</text>')
  parts.push('<text x="575" y="116" font-size="10.5" fill="#0f766e" text-anchor="middle">y = x² + 1</text>')
  parts.push('<line x1="475" y1="230" x2="680" y2="230" stroke="#16a34a" stroke-width="1.3"/>')
  parts.push('<path d="M 492 120 Q 575 210 658 120" fill="none" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<circle cx="575" cy="165" r="4.5" fill="#ea580c"/>')
  parts.push('<text x="575" y="200" font-size="10" fill="#d97706" text-anchor="middle">vertex (0, 1) — the bowl floats above</text>')
  parts.push('<text x="575" y="248" font-size="10.5" fill="#dc2626" text-anchor="middle">no meet — no real roots</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="292" width="660" height="28" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="311" font-size="11.5" fill="#0f766e" text-anchor="middle">Δ &gt; 0 two doors · Δ = 0 one tangent touch · Δ &lt; 0 none — 9.3’s ledger, drawn</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson103: Lesson = {
  id: 'al-the-parabola-quadratic-graphs-and-vertices',
  number: '10.3',
  title: 'The Parabola: Quadratic Graphs and Vertices',
  concepts: [
    'the parabola as the graph of a quadratic',
    'the table of values and the integer census',
    'the fold identity — completing the square, drawn',
    'the vertex and the axis of symmetry',
    'minimum and maximum values by the sign of a',
    'the x-intercept verdicts of the discriminant',
    'horizontal probes meet at most twice',
    'second differences and the bending slope',
  ],
  objectives: [
    'graph y = ax² + bx + c from its table of values and read the census honestly, including which integer points sit outside a given window',
    'certify the fold identity y = a(x + b/2a)² − Δ/(4a) by expansion and read the vertex (−b/2a, −Δ/(4a)) straight off it',
    'decide minimum versus maximum by the sign of a, and prove the extreme value with the gap-is-the-square read',
    'mirror-price the axis of symmetry x = −b/2a pointwise: f(v + t) = f(v − t), with the twin pairs midpointing on the axis',
    'count the meets of any horizontal probe y = k by the shifted discriminant Δ + 4ak, flipping exactly at the vertex height',
    'reconcile the x-intercept verdicts (two doors, one tangent touch, none) with the factorization and the discriminant ledger of chapter 9',
    'watch 10.2’s steepness theorem bend along the curve through the constant second differences 2a — the honest doorway to calculus',
  ],
  prerequisites: [
    'al-completing-the-square-derived',
    'al-the-quadratic-formula-and-the-discriminant',
    'al-the-coordinate-plane-and-linear-graphs',
    'al-slope-the-steepness-theorem',
  ],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Chapter 9 solved the quadratic equation four ways — factoring, completing the square, the formula, and Viète’s relations — and every way ended in NUMBERS: roots, a discriminant, a sum and a product. This lesson gives those numbers a SHAPE. The workhorse is the chapter’s own example: $y = 2x^2 - 7x + 3$, the very polynomial whose roots $\\frac{1}{2}$ and $3$ the formula produced in 9.3. Its graph is a PARABOLA — a smooth bowl that dives to a lowest point and climbs again — and on that bowl every chapter-9 number becomes a visible place: the roots are the doors where the bowl crosses the $x$-axis, the discriminant counts those doors, and the "centre" $\\frac{-b}{2a}$ of 9.3’s completed square turns out to be the bowl’s fold point itself. 10.1 drew the line — the graph of degree 1; this lesson draws the graph of degree 2 and watches the straight story bend.' },
    { kind: 'para', text: 'The discipline is the one this book always runs. The verifier priced everything BEFORE any prose existed: the table of values pointwise at eight integer inputs, the fold identity by exact expansion and at every census point, the vertex as a certified minimum, the mirror symmetry on five offsets and four twin pairs, the probe counts on a designed level scan. Two catches are worth banking up front. The census window $W \\times W$ holds exactly FOUR integer points of the bowl, not five — $(4, 7)$ sits on the curve but out the window top ($7 > 5$). And the level scan caught its own author: the horizontal line $y = -3$ looks like a near-miss below the doors, but $-3 > -\\frac{25}{8} = -3.125$, so it CUTS the bowl twice — the count flips exactly at the vertex height, and a near-miss level still cuts.' },
    { kind: 'heading', text: 'The Table of Values and the Census' },
    { kind: 'para', text: 'Graphing a quadratic starts exactly where 10.1 started with the line: make solutions, plot them, look. For $y = 2x^2 - 7x + 3$ the honest machine is the TABLE OF VALUES — one row per chosen input $x$, each row computing the three terms separately so nothing is done in the head. The verifier built the table for $x = -2$ to $5$ and priced every cell exactly; the resulting eight points already show the bowl: the heights fall from 25 to the bottom near $x = \\frac{7}{4}$ and climb again to 18. Four of the rows happen to land inside the census window $|x| \\le 5$, $|y| \\le 5$ — the fourth-and-halfth catch being that the row $x = 4$ gives height 7, ON the curve but ABOVE the window: a point can be a solution and still not be drawn inside a chosen frame. The census is honest about what it holds and what it does not.' },
    { kind: 'table', caption: 'The table of values of y = 2x² − 7x + 3, every cell priced exactly by the verifier: the heights fall to the fold near x = 7/4 and climb again', head: ['$x$', '$2x^2$', '$-7x$', '$3$', '$y$', 'on the curve?'], rows: [
      ['$-2$', '$8$', '$14$', '$3$', '$25$', 'yes — far above any small window'],
      ['$-1$', '$2$', '$7$', '$3$', '$12$', 'yes — above the window top'],
      ['$0$', '$0$', '$0$', '$3$', '$3$', 'yes — the y-intercept $(0, 3)$'],
      ['$1$', '$2$', '$-7$', '$3$', '$-2$', 'yes — inside the window'],
      ['$2$', '$8$', '$-14$', '$3$', '$-3$', 'yes — inside the window'],
      ['$3$', '$18$', '$-21$', '$3$', '$0$', 'yes — a door: $(3, 0)$'],
      ['$4$', '$32$', '$-28$', '$3$', '$7$', 'yes — but $7 > 5$: out the window top'],
      ['$5$', '$50$', '$-35$', '$3$', '$18$', 'yes — far above again'],
    ] },
    { kind: 'figure', caption: 'The workhorse parabola y = 2x² − 7x + 3 — the vertex (7/4, −25/8) is the fold point, the dashed axis x = 7/4 mirrors every twin, the doors (1/2, 0) and (3, 0) are Δ = 25’s two roots drawn, and the amber rings are the designed twin pairs.', svg: parabolaWorkhorseSvg() },
    { kind: 'terms', items: [
      { term: 'parabola', def: 'the graph of a quadratic $y = ax^2 + bx + c$ with $a \\neq 0$: a smooth symmetric bowl, opening upward when $a > 0$ and downward when $a < 0$ — never a straight line, and every vertical probe meets it exactly once.' },
      { term: 'vertex', def: 'the fold point $\\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right)$ where the bowl turns: the MINIMUM height when $a > 0$, the MAXIMUM when $a < 0$. The verifier priced the workhorse’s vertex at $\\left(\\frac{7}{4}, -\\frac{25}{8}\\right)$.' },
      { term: 'axis of symmetry', def: 'the vertical line $x = -\\frac{b}{2a}$ through the vertex: every point of the bowl has a twin at the same height on the other side, and $f\\left(v + t\\right) = f\\left(v - t\\right)$ exactly for every offset $t$.' },
      { term: 'minimum / maximum value', def: 'the vertex height $-\\frac{\\Delta}{4a}$: the smallest value $ax^2 + bx + c$ ever takes (for $a > 0$) or the largest (for $a < 0$), because the fold identity writes the polynomial as a square plus exactly that constant.' },
      { term: 'tangent touch', def: 'the Δ = 0 picture: the bowl’s vertex rests exactly ON the $x$-axis, the two doors of Δ > 0 fused into one meet — 9.3’s middle verdict, now visible as a kissing point.' },
      { term: 'second difference', def: 'the difference OF the differences of consecutive values: constant and equal to $2a$ on any quadratic. A line’s first differences are constant; a parabola’s SECOND ones are — the signature of degree 2, and 10.2’s slope bending by exactly $2a$ per step.' },
    ] },
    { kind: 'heading', text: 'The Fold Identity and the Vertex' },
    { kind: 'para', text: 'Now 9.2’s craft does the drawing. Completing the square on the workhorse: $2x^2 - 7x + 3 = 2\\left(x^2 - \\frac{7}{2}x\\right) + 3 = 2\\left(x - \\frac{7}{4}\\right)^2 + 3 - 2 \\cdot \\frac{49}{16} = 2\\left(x - \\frac{7}{4}\\right)^2 - \\frac{25}{8}$. The verifier certified the fold three ways: the cross term $2 \\cdot 2 \\cdot \\left(-\\frac{7}{4}\\right) = -7$ survives exactly, the constant closes $\\frac{49}{8} - \\frac{25}{8} = \\frac{24}{8} = 3$, and at all eight census inputs the fold form prices the SAME height as the original — no float decided any of it. In general the same move gives the FOLD IDENTITY, the master identity of 9.3 wearing a $y$:' },
    { kind: 'equation', latex: 'y = ax^2 + bx + c \\;=\\; a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}, \\qquad \\Delta = b^2 - 4ac', note: 'the fold identity — the whole graph is one square (which can only fold) plus one constant (which only lifts); expand it back and the cross term returns bx, the constants return c', },
    { kind: 'para', text: 'The identity reads the whole geometry off the coefficients. The square term $a\\left(x + \\frac{b}{2a}\\right)^2$ is zero at exactly one input, $x = -\\frac{b}{2a}$ — 9.3’s centre — and positive everywhere else when $a > 0$: so the polynomial’s smallest value is the constant it folds to, $-\\frac{\\Delta}{4a}$, taken AT the centre. The verifier priced the gap pointwise: $f(x) - \\left(-\\frac{25}{8}\\right) = 2\\left(x - \\frac{7}{4}\\right)^2 \\ge 0$ at every census input, zero only at $x = \\frac{7}{4}$. That is the vertex $\\left(\\frac{7}{4}, -\\frac{25}{8}\\right)$, a MINIMUM because $a = 2 > 0$ — the bowl opens upward. Flip the sign of $a$ and every word flips with it: the square contributes $a(x - v)^2 \\le 0$, the vertex is the MAXIMUM, the bowl opens downward. The sign of $a$ is the opening; the vertex is the extreme; the identity is the proof of both at once.' },
    { kind: 'example', title: 'Graph y = x² + 4x + 7 by completing the square and read its smallest value', steps: [
      'Half of $\\frac{b}{a} = 4$ is 2: $x^2 + 4x + 7 = (x + 2)^2 + 7 - 4 = (x + 2)^2 + 3$.',
      'Check the fold by expansion: $(x+2)^2 + 3 = x^2 + 4x + 4 + 3$ — exact.',
      'The square is never negative, so $y \\ge 3$ always, with equality at $x = -2$: vertex $(-2, 3)$, a minimum.',
      'Hence the bowl floats entirely above the axis — and the discriminant agrees: $\\Delta = 16 - 28 = -12 < 0$, no doors, exactly as a minimum height of $3 > 0$ demands.',
    ] },
    { kind: 'example', title: 'Graph y = −x² + 4x + 5 and read its largest value', steps: [
      'Here $a = -1 < 0$: the bowl opens DOWN, so the vertex will be a maximum.',
      'Fold: $-x^2 + 4x + 5 = -(x^2 - 4x) + 5 = -(x - 2)^2 + 4 + 5 = -(x - 2)^2 + 9$.',
      'The verifier expanded the fold back exactly and priced the vertex $(2, 9)$: the square $-(x-2)^2 \\le 0$, so $y \\le 9$ with equality at $x = 2$ — a maximum of 9.',
      'The doors: $\\Delta = 16 + 20 = 36 > 0$, roots $-1$ and $5$ — and the readout agrees through the sign of $a$: $-\\frac{\\Delta}{4a} = -\\frac{36}{-4} = 9$. The doors $(-1, 0)$ and $(5, 0)$ midpoint on the axis: $\\frac{-1 + 5}{2} = 2$.',
    ] },
    { kind: 'derivation', title: 'The vertex formula, derived from the completed square', statement: 'Claim: for $y = ax^2 + bx + c$ with $a \\neq 0$, the vertex sits at $\\left(-\\frac{b}{2a},\\; -\\frac{\\Delta}{4a}\\right)$ — a minimum if $a > 0$, a maximum if $a < 0$.', steps: [
      { label: 'Factor out a', formula: 'ax^2 + bx + c = a\\left(x^2 + \\tfrac{b}{a}x\\right) + c', explanation: 'lawful for any $a \\neq 0$ — 9.2’s opening move; the constant $c$ waits outside while the square is built.' },
      { label: 'Complete the square inside', formula: 'a\\left(x^2 + \\tfrac{b}{a}x\\right) = a\\left(x + \\tfrac{b}{2a}\\right)^2 - \\tfrac{b^2}{4a}', explanation: 'half of $\\frac{b}{a}$ is $\\frac{b}{2a}$; the square adds $\\frac{b^2}{4a^2}$ inside the bracket, so the correction $a \\cdot \\frac{b^2}{4a^2} = \\frac{b^2}{4a}$ is subtracted back.' },
      { label: 'Rejoin the constant', formula: 'y = a\\left(x + \\tfrac{b}{2a}\\right)^2 + \\tfrac{4ac - b^2}{4a} = a\\left(x + \\tfrac{b}{2a}\\right)^2 - \\tfrac{b^2 - 4ac}{4a}', explanation: 'writing $c = \\frac{4ac}{4a}$ lets the constant join the correction under one denominator — and the numerator is the discriminant up to sign.' },
      { label: 'Read the constant as the discriminant', formula: '\\tfrac{4ac - b^2}{4a} = -\\tfrac{\\Delta}{4a}', explanation: 'the fold identity, derived and not recited — 9.3’s master identity wearing a $y$.' },
      { label: 'Now the extreme', formula: 'a\\left(x + \\tfrac{b}{2a}\\right)^2 \\ge 0 \\text{ for } a > 0, \\quad \\le 0 \\text{ for } a < 0', explanation: 'the signed square vanishes exactly when $x = -\\frac{b}{2a}$; if $a > 0$ the right side is minimized there — minimum $-\\frac{\\Delta}{4a}$ — and if $a < 0$ it is maximized there — maximum $-\\frac{\\Delta}{4a}$.' },
      { label: 'Hence', formula: '\\text{vertex } \\left(-\\tfrac{b}{2a},\\; -\\tfrac{\\Delta}{4a}\\right)', explanation: 'both coordinates at once, the opening decided by nothing but the sign of $a$ — the verifier certified it on the workhorse ($\\frac{7}{4}, -\\frac{25}{8}$), the floating bowl $(0, 1)$, and the down-bowl $(2, 9)$.' },
    ], result: 'the vertex of y = ax² + bx + c is (−b/2a, −Δ/(4a)) — minimum for a > 0, maximum for a < 0; the fold identity is the proof and the readout in one line' },
    { kind: 'para', text: 'The formula earns its keep the moment the coefficients are known and the square is tedious. For $y = 3x^2 - 6x + 1$ the readout gives $x = \\frac{6}{6} = 1$ and height $3 - 6 + 1 = -2$: vertex $(1, -2)$, minimum, opening up — and the door question is settled by the discriminant alone, $\\Delta = 36 - 12 = 24 > 0$, two doors, without touching the square. But the derivation is the part to remember, because it explains WHY the readout has the shape it has: $\\frac{-b}{2a}$ is where the square vanishes, and $-\\frac{\\Delta}{4a}$ is what the polynomial collapses to when it does. 9.3’s centre and 9.3’s discriminant were always the vertex’s coordinates in disguise.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — two signs discipline the vertex readout', text: 'The vertex formula is a double negative waiting to happen. For the workhorse, $b = -7$ and $a = 2$, so $-\\frac{b}{2a} = -\\frac{-7}{4} = +\\frac{7}{4}$ — the vertex sits at POSITIVE $\\frac{7}{4}$ even though $b$ is negative. Write the substitution in full every time: $-\\frac{b}{2a}$, then $-\\frac{(-7)}{4}$, then $\\frac{7}{4}$. The same discipline guards the height: $-\\frac{\\Delta}{4a}$ with $\\Delta = 25$, $a = 2$ reads $-\\frac{25}{8}$, negative because a positive discriminant over a positive $a$ must lift the bowl’s bottom BELOW the axis for doors to exist. And when $a < 0$ both reads flip sign together — the down-bowl $y = -x^2 + 4x + 5$ has $-\\frac{b}{2a} = -\\frac{4}{-2} = 2$ and $-\\frac{\\Delta}{4a} = -\\frac{36}{-4} = +9$. One rushed sign and the vertex teleports to the wrong quadrant; the verifier priced all three readouts exactly because this is exactly where quick work dies.' },
    { kind: 'heading', text: 'The Axis of Symmetry and the Twins' },
    { kind: 'para', text: 'Look again at the fold: $y = a\\left(x - v\\right)^2 + h$ with $v = -\\frac{b}{2a}$ and $h = -\\frac{\\Delta}{4a}$. The square depends on $x$ only through $(x - v)^2$ — and a square cannot tell $x - v$ from $-(x - v)$. Substitute $v + t$ and $v - t$: both give $(v + t - v)^2 = t^2$ and $(v - t - v)^2 = (-t)^2 = t^2$ — the SAME square, so the SAME height. The verifier mirror-priced the workhorse on five offsets: $f\\left(\\frac{7}{4} + \\frac{1}{4}\\right) = f\\left(\\frac{7}{4} - \\frac{1}{4}\\right) = -2$, and the same exact equality at $t = \\frac{1}{2}, \\frac{3}{4}, \\frac{5}{4}, \\frac{9}{4}$. The bowl is symmetric about the vertical line $x = v$ — the AXIS OF SYMMETRY — and the proof is one line: the fold shows the polynomial depends on $x$ only through the distance $|x - v|$.' },
    { kind: 'para', text: 'The mirror has a census consequence the figure draws in amber: every height is taken TWICE (or once, at the vertex itself), by twin points symmetric about the axis. The verifier priced four designed pairs: $(0, 3)$ with $\\left(\\frac{7}{2}, 3\\right)$, $(1, -2)$ with $\\left(\\frac{5}{2}, -2\\right)$, $\\left(\\frac{3}{2}, -3\\right)$ with $(2, -3)$, and the doors themselves $\\left(\\frac{1}{2}, 0\\right)$ with $(3, 0)$ — each pair satisfying the curve exactly, each pair’s midpoint landing on $\\frac{7}{4}$ to the last fraction. That last fact is the exam workhorse: the roots of a quadratic SUM to $-\\frac{b}{a}$ (9.4’s Viète readout), so their midpoint is $\\frac{r_1 + r_2}{2} = -\\frac{b}{2a}$ — the axis IS the roots’ midpoint. Graphically: the two doors are mirror twins, and the vertex sits exactly halfway between them, at the bowl’s bottom.' },
    { kind: 'heading', text: 'The Probe Verdicts: At Most Twice' },
    { kind: 'para', text: 'Now run 5.3’s verdict machine on the new curve, in both directions. VERTICAL probes first: the line $x = h$ meets the parabola where $y = 2h^2 - 7h + 3$ — one input, one computed output, EXACTLY one meet, for every $h$. The verifier priced eight probes from $x = -2$ to $5$, each landing on a single point. Nothing has changed from the line: a function-style equation in $x$ answers each vertical probe once. The graph-as-solution-set identity of 10.1 survives one degree up: the bowl IS the solution set of $y = 2x^2 - 7x + 3$, point by point — every census point on the curve satisfies the equation, and the equation produces no point off the curve.' },
    { kind: 'para', text: 'HORIZONTAL probes are where degree 2 changes the verdict machine. The line $y = k$ meets the bowl where $2x^2 - 7x + 3 = k$ — that is, where $2x^2 - 7x + (3 - k) = 0$: a QUADRATIC in $x$, with a discriminant of its own. The verifier computed it exactly: $\\Delta_k = (-7)^2 - 4 \\cdot 2 \\cdot (3 - k) = 49 - 24 + 8k = 25 + 8k$. So the meets are counted by $\\Delta_k$: two when $k > -\\frac{25}{8}$, one when $k = -\\frac{25}{8}$, none when $k < -\\frac{25}{8}$. The hinge is the vertex height. The scan that caught its own author: the levels $k = -5, -4$ pass UNDER the bowl (no meets), the level $k = -\\frac{25}{8}$ grazes the vertex once, but $k = -3$ — which looks like another under-pass — sits at $-3 > -3.125$, ABOVE the hinge, and cuts the bowl TWICE. Levels $0, 3, 5$ all cut twice as well: five of the eight scanned levels are two-meet levels. A quadratic has at most two roots against ANY level — 9.3’s trichotomy, exhaustive, now drawn as the count of crossings.' },
    { kind: 'equation', latex: 'y = k \\text{ meets } y = ax^2 + bx + c \\quad \\text{as the verdict on } \\;\\Delta_k = \\Delta + 4ak\\; : \\quad \\text{two} \\iff k > -\\tfrac{\\Delta}{4a},\\;\\; \\text{one} \\iff k = -\\tfrac{\\Delta}{4a},\\;\\; \\text{none} \\iff k < -\\tfrac{\\Delta}{4a}', note: 'the shifted discriminant — the meet count flips exactly at the vertex height −Δ/(4a); for a < 0 all three inequalities reverse and the hinge is still the vertex' },
    { kind: 'figure', caption: 'The three x-intercept verdicts of 9.3, drawn as bowls: y = 2x² − 7x + 3 crosses twice (Δ = 25), y = (x − 1)² rests its vertex on the axis once (Δ = 0), and y = x² + 1 floats clear (Δ = −4).', svg: xVerdictsStripSvg() },
    { kind: 'callout', tone: 'theorem', title: 'Theorem — the horizontal-probe trichotomy', text: 'Let $a \\neq 0$ and let $h = -\\frac{\\Delta}{4a}$ be the vertex height. For any level $k$, the equation $ax^2 + bx + c = k$ has exactly two real solutions when $k$ is on the far side of $h$ from the opening, exactly one when $k = h$, and none when $k$ is between $h$ and the opening’s far end. Proof: $ax^2 + bx + c - k = 0$ is quadratic with discriminant $\\Delta_k = b^2 - 4a(c - k) = \\Delta + 4ak$ — a linear function of $k$ vanishing exactly at $k = -\\frac{\\Delta}{4a} = h$; the sign of $\\Delta_k$ decides two/one/none by 9.3’s verdict machine, and $\\text{sign}(\\Delta_k) = \\text{sign}(a) \\cdot \\text{sign}(k - h)$, which fixes each case. The verifier priced the trichotomy exhaustively on the workhorse’s level scan: five two-levels, one tangent level, two none-levels, every level in exactly one case.' },
    { kind: 'para', text: 'With the machine running, 9.3’s ledger becomes a picture, and the figure above draws it as three bowls. The workhorse ($\\Delta = 25 > 0$) crosses the $x$-axis at its two doors $\\left(\\frac{1}{2}, 0\\right)$ and $(3, 0)$ — and the verifier cross-priced those doors against the FACTORIZATION $(2x - 1)(x - 3)$, whose expansion returns the workhorse coefficient for coefficient: the roots of 9.3 and the crossing points of 10.3 are the same objects named by algebra and by geometry. The touch curve $y = (x - 1)^2$ ($\\Delta = 0$) rests its vertex exactly on the axis — one meet, and the mirror battery comes free: $f(1 + t) = t^2 = f(1 - t)$ for every $t$, the bowl its own twin generator. The floating bowl $y = x^2 + 1$ ($\\Delta = -4$) never meets the axis, its minimum height $1$ being exactly the gap the master identity predicted. Three discriminant verdicts, three pictures, one identity explaining all of them: $a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}$ shows the square reaching $\\frac{\\Delta}{4a}$ at two inputs, one input, or never, according to the sign of $\\Delta$.' },
    { kind: 'para', text: 'And 10.2? Its steepness theorem said every secant of a LINE has the same slope. On the bowl that story bends, honestly. The secant slopes between consecutive census points climb: $(0, 3)$ to $(1, -2)$ gives $\\frac{-5}{1} = -5$; $(1, -2)$ to $(2, -3)$ gives $\\frac{-1}{1} = -1$; $(2, -3)$ to $(3, 0)$ gives $\\frac{3}{1} = 3$; $(3, 0)$ to $(4, 7)$ gives $\\frac{7}{1} = 7$. Four different slopes — the curve steepens as it climbs out of the bowl, first rising less and less negatively, then more and more positively. The arithmetic signature: the first differences $-5, -1, 3, 7$ are NOT constant (a line’s would be), but their differences — the SECOND differences — are constant $4, 4, 4 = 2a$. Every quadratic climbs its secants by exactly $2a$ per step. Follow that climb to its limit — steps shrinking toward zero — and the slope settles to a single number at each point: the honest doorway to calculus, which this book leaves exactly where you can see it.' },
    { kind: 'example', title: 'A rectangle has perimeter 20. Which width maximizes its area?', steps: [
      'Let the width be $x$; then the length is $10 - x$, so the area is $A = x(10 - x) = -x^2 + 10x$ — a quadratic with $a = -1 < 0$: opens down, so the vertex is a maximum.',
      'Read the vertex: $-\\frac{b}{2a} = -\\frac{10}{-2} = 5$, and $A(5) = -25 + 50 = 25$.',
      'Cross-check by the discriminant readout: $\\Delta = 100 - 0 = 100$, so $-\\frac{\\Delta}{4a} = -\\frac{100}{-4} = 25$ — the same maximum.',
      'Hence the square (width 5, length 5) captures the largest area, 25 — and 9.3’s census maximum returns as a rectangle: among all rectangles of a fixed perimeter, the square is the area champion.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Insight — what the parabola buys, and what it whispers', text: 'The line answered "where?"; the parabola answers "how high, how low, and where exactly does it turn?". Extreme-value questions — best area, best price, greatest height — are vertex questions, and the fold identity settles them with a coefficient read instead of a hunt. The whispers are for later courses: the constant second differences are the discrete shadow of acceleration; the bending secants, taken to shrinking steps, become the tangent slope that calculus will name $2ax + b$; and the horizontal-probe hinge is the precursor of every range question ever asked of a function. None of that is needed now — but the bowl you can draw today is the object those ideas attach to, and every number on it (vertex, axis, doors, twins) has already been priced exactly.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'The graph of $y = ax^2 + bx + c$ ($a \\neq 0$) is a parabola: a symmetric bowl opening upward when $a > 0$ and downward when $a < 0$ — built honestly from a table of values, with the census reported as it is, window and all.',
      'The fold identity $y = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}$ (9.2’s square, 9.3’s master identity wearing a $y$) expands back exactly and prices the whole geometry.',
      'The vertex is $\\left(-\\frac{b}{2a}, -\\frac{\\Delta}{4a}\\right)$: the minimum for $a > 0$, the maximum for $a < 0$ — proved by the gap $f(x) - \\left(-\\frac{\\Delta}{4a}\\right) = a\\left(x + \\frac{b}{2a}\\right)^2$ being a signed square.',
      'The axis of symmetry is $x = -\\frac{b}{2a}$: $f(v + t) = f(v - t)$ exactly, twin points share heights, and the two doors midpoint on the axis (Viète’s sum, drawn).',
      'A vertical probe meets the bowl exactly once; a horizontal probe $y = k$ meets it two, one, or zero times as $\\Delta_k = \\Delta + 4ak$ is positive, zero, or negative — the count flips exactly at the vertex height, and no level ever meets a quadratic more than twice.',
      'The secant slopes bend by the constant second differences $2a$ — 10.2’s steepness theorem bending along the curve, the honest doorstep of calculus.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the curve with a name older than its graph', text: 'The parabola was named by Apollonius of Perga (c. 200 BC) in his Conics — παράβολος, "applied alongside", one of three siblings (ellipse, parabola, hyperbola) that the Greeks met as slices of a cone, two thousand years before any coordinate plane. The graph you drew in this lesson had to wait for Descartes and Fermat (10.1’s synthesis, 1637) to exist at all: a curve AS an equation. In between, the curve did physics quietly — Galileo’s Two New Sciences (1638) showed that a projectile flies on a parabola, the first law of motion stated as a shape. And the curve posed the problem that seeded calculus: what is the TANGENT at a point of a parabola? Fermat and Descartes both built methods for it in the 1630s (Descartes’ answer sparked his famous dispute with Fermat), and the method that won — slopes of shrinking secants, exactly this lesson’s bending table — became Newton and Leibniz’s differential calculus. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The school canon examines this lesson directly: NCERT class 10’s quadratic chapter asks for the graph of a given quadratic and the roots read off it (the doors), and class 11’s functions work asks for vertex, opening and range (the vertex height to +∞ for $a > 0$). The competitive bank (Khattar QA’s quadratic scope, SSC and bank preliminaries, JEE-Main foundations) drills: (1) the vertex readout at speed — vertex of $2x^2 - 7x + 3$ is $\\left(\\frac{7}{4}, -\\frac{25}{8}\\right)$, one substitution each; (2) max/min by the sign of $a$ — "the minimum value of $x^2 + 4x + 7$ is $3$" answered by completing the square, no calculus; (3) the displacement verdict — "for which $k$ does $x^2 - 4x + k$ touch the $x$-axis once?" is $\\Delta = 0$, $k = 4$; (4) range questions — the horizontal-probe hinge read backwards; (5) symmetry shortcuts — the vertex sits at the roots’ midpoint, so the sum of the roots locates the axis without solving (9.4’s $S = -\\frac{b}{a}$ at work). And the examiner’s favourite trap remains the double negative: $-\\frac{b}{2a}$ with $b < 0$ is POSITIVE — write the substitution in full.' },
    { kind: 'formula', name: 'The fold identity', latex: 'y = ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}, \\qquad \\Delta = b^2 - 4ac', note: '9.2’s completed square and 9.3’s master identity wearing a y — the whole geometry of the parabola in one line' },
    { kind: 'formula', name: 'The vertex and the axis', latex: '\\text{vertex } \\left(-\\frac{b}{2a},\\; -\\frac{\\Delta}{4a}\\right), \\qquad \\text{axis } x = -\\frac{b}{2a}, \\qquad \\text{opening: } a > 0 \\text{ up (min)}, \\; a < 0 \\text{ down (max)}', note: 'derived from the fold, not recited: the vertex is where the square vanishes, the height is what remains' },
    { kind: 'formula', name: 'The horizontal-probe hinge', latex: 'y = k \\text{ meets the bowl as } \\Delta_k = \\Delta + 4ak \\text{ reads: two} \\iff k > -\\tfrac{\\Delta}{4a}, \\; \\text{one} \\iff k = -\\tfrac{\\Delta}{4a}, \\; \\text{none} \\iff k < -\\tfrac{\\Delta}{4a}', note: 'the meet count flips exactly at the vertex height; at most two meets against any level — 5.3’s machine, bent by degree 2' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The vertex of $y = 2x^2 - 7x + 3$ sits at', options: ['$\\left(\\frac{7}{4}, -\\frac{25}{8}\\right)$', '$\\left(-\\frac{7}{4}, \\frac{25}{8}\\right)$', '$\\left(\\frac{7}{4}, \\frac{25}{8}\\right)$', '$\\left(\\frac{3}{2}, -3\\right)$'], answer: 0, explain: 'The readout: $-\\frac{b}{2a} = -\\frac{-7}{4} = \\frac{7}{4}$ (the double negative is the trap) and $-\\frac{\\Delta}{4a} = -\\frac{25}{8}$ with $\\Delta = 49 - 24 = 25$. Option B flips BOTH signs; option C drops the minus on the height — but $a > 0$ means the vertex is BELOW the census, a minimum; option D is the census point $(2, -3)$’s neighbourhood, not the fold — the verifier certified $f(7/4) = -25/8$ and the gap $f(x) + 25/8 = 2(x - 7/4)^2 \\ge 0$ at every census input.' },
      { q: 'The parabola $y = x^2 - 2x + 1$ meets the $x$-axis', options: ['never', 'at two points', 'at exactly one point — the vertex $(1, 0)$ rests on the axis', 'at $(0, 1)$ and $(2, 0)$'], answer: 2, explain: 'The discriminant: $\\Delta = 4 - 4 = 0$ — 9.3’s middle verdict, the two doors fused into one tangent touch, and the fold $y = (x-1)^2$ shows the square vanishing only at $x = 1$. "Never" is the $\\Delta < 0$ picture ($y = x^2 + 1$’s); "two points" needs $\\Delta > 0$; $(0, 1)$ is the $y$-intercept, not an $x$-meet, and $(2, 0)$ fails substitution: $4 - 4 + 1 = 1 \\neq 0$. The verifier priced the touch and its twins $f(1 + t) = t^2$ exactly.' },
      { q: '$y = -x^2 + 4x + 5$ opens ___ and its vertex $(2, 9)$ is therefore a ___', options: ['downward; maximum', 'downward; minimum', 'upward; maximum', 'upward; minimum'], answer: 0, explain: '$a = -1 < 0$: the square term $-(x - 2)^2$ is never positive, so $y \\le 9$ with equality at $x = 2$ — the fold $-(x-2)^2 + 9$ prices it exactly. Upward would need $a > 0$; a minimum would need the square POSITIVE away from the vertex ($a > 0$’s picture). The verifier also priced the doors $(-1, 0)$ and $(5, 0)$, midpointing on the axis $x = 2$ — a maximum bowl hanging from its two doors.' },
      { q: 'The horizontal line $y = k$ meets $y = 2x^2 - 7x + 3$ exactly once when', options: ['$k = 0$', '$k = 3$', '$k = -\\frac{25}{8}$', '$k = \\frac{25}{8}$'], answer: 2, explain: 'The shifted discriminant $\\Delta_k = \\Delta + 4ak = 25 + 8k$ vanishes exactly at $k = -\\frac{25}{8}$ — the vertex height, where the level grazes the bowl’s bottom once. $k = 0$ is the $x$-axis itself: $\\Delta_k = 25 > 0$, the two doors; $k = 3$ passes through the $y$-intercept and cuts twice ($\\Delta_k = 49$); $\\frac{25}{8}$ is far above — also two cuts. The verifier’s scan caught even the plausible-looking $k = -3$: since $-3 > -3.125$, it cuts TWICE — only exactly $-\\frac{25}{8}$ gives one meet.' },
      { q: 'The axis of symmetry of $y = -x^2 + 4x + 5$ is', options: ['$x = 9$', '$x = 2$', '$x = -2$', '$x = 5$'], answer: 1, explain: 'The axis is $x = -\\frac{b}{2a} = -\\frac{4}{-2} = 2$ — the vertex’s first coordinate, and the doors’ midpoint: $\\frac{-1 + 5}{2} = 2$ (Viète’s sum $S = 4$, halved). $x = 9$ is the vertex HEIGHT (a $y$-value, not an axis); $x = -2$ flips the sign of $\\frac{b}{2a}$; $x = 5$ is one door, not the mirror line — the verifier mirror-priced $f(2 + t) = f(2 - t)$ exactly and midpointed the twin pairs on 2.' },
    ] },
    { kind: 'exercises', title: 'Exercises 10.3', sets: [
      { level: 'L1', questions: [
        { q: 'Build the table of values of $y = x^2 - 2x - 3$ for $x = -1, 0, 1, 2, 3$, and read the axis of symmetry off the equal heights.', solution: [
          'Row by row: $f(-1) = 1 + 2 - 3 = 0$, $f(0) = -3$, $f(1) = 1 - 2 - 3 = -4$, $f(2) = 4 - 4 - 3 = -3$, $f(3) = 9 - 6 - 3 = 0$.',
          'Equal heights: $f(-1) = f(3) = 0$ and $f(0) = f(2) = -3$ — twin pairs.',
          'The axis passes through each pair’s midpoint: $\\frac{-1 + 3}{2} = 1$ and $\\frac{0 + 2}{2} = 1$ — agree.',
          'Hence the axis of symmetry is $x = 1$, and the vertex (the one unpaired height) sits at $(1, -4)$.',
        ], answer: 'values 0, −3, −4, −3, 0; the axis is x = 1 (both twin pairs midpoint there), vertex (1, −4).' },
        { q: 'Read the vertex, the axis and the opening of $y = (x - 2)^2 - 5$, and state the smallest value the expression ever takes.', solution: [
          'The fold is already done: the square $(x - 2)^2 \\ge 0$ vanishes only at $x = 2$.',
          'So the vertex is $(2, -5)$, the axis is $x = 2$, and $a = 1 > 0$ says the bowl opens upward.',
          'The smallest value is the fold’s constant: $-5$, taken at $x = 2$.',
          'Check the readout against the expansion: $(x-2)^2 - 5 = x^2 - 4x + 4 - 5 = x^2 - 4x - 1$, so $-\\frac{b}{2a} = \\frac{4}{2} = 2$ and $-\\frac{\\Delta}{4a} = -\\frac{16 + 4}{4} = -5$ — agree.',
        ], answer: 'vertex (2, −5), axis x = 2, opens up, minimum value −5.' },
        { q: 'State the $y$-intercept and the opening of $y = 3x^2 - 6x + 1$, and decide WITHOUT solving whether it meets the $x$-axis.', solution: [
          'At $x = 0$: $y = 1$ — the $y$-intercept is $(0, 1)$; the intercept read of 10.1, one degree up.',
          '$a = 3 > 0$: the bowl opens upward.',
          'Doors are a discriminant question: $\\Delta = (-6)^2 - 4 \\cdot 3 \\cdot 1 = 36 - 12 = 24 > 0$.',
          'Hence two doors — no solving needed; and the readout locates the vertex: $x = \\frac{6}{6} = 1$, height $-\\frac{24}{12} = -2$, below the axis, exactly why two doors must exist.',
        ], answer: 'y-intercept (0, 1); opens upward; Δ = 24 > 0 — two doors, vertex (1, −2).' },
      ] },
      { level: 'L2', questions: [
        { q: 'By the vertex readout, find the vertex of $y = x^2 - 6x + 5$, then check it against the doors $(1, 0)$ and $(5, 0)$.', solution: [
          'Readout: $x = -\\frac{b}{2a} = \\frac{6}{2} = 3$; $\\Delta = 36 - 20 = 16$; height $-\\frac{16}{4} = -4$. Vertex $(3, -4)$, a minimum.',
          'Door check: the doors’ midpoint is $\\frac{1 + 5}{2} = 3$ — the axis, exactly where the readout put the vertex.',
          'Height check: $-\\frac{\\Delta}{4a} = -\\frac{16}{4} = -4$, and the fold agrees: $(x - 3)^2 - 4 = x^2 - 6x + 5$, exact.',
          'Hence the bowl hangs from its two doors through the bottom $(3, -4)$ — all three reads one object.',
        ], answer: 'vertex (3, −4) — midpointed by the doors (1, 0), (5, 0) and confirmed by the fold (x − 3)² − 4.' },
        { q: 'Find the vertex of $y = -2x^2 + 8x - 5$ and say what kind of extreme it is.', solution: [
          '$a = -2 < 0$: opens downward — the vertex will be a MAXIMUM.',
          'Readout: $x = -\\frac{8}{-4} = 2$; $\\Delta = 64 - 40 = 24$; height $-\\frac{24}{-8} = 3$.',
          'Vertex $(2, 3)$ — verify by substitution: $-8 + 16 - 5 = 3$, exact.',
          'Hence the largest value of $-2x^2 + 8x - 5$ is 3, at $x = 2$; every other input prices lower.',
        ], answer: 'vertex (2, 3), a maximum (a = −2 < 0).' },
        { q: 'Complete the square on $y = x^2 + 4x + 7$ and state the smallest value the expression ever takes; reconcile with the discriminant.', solution: [
          'Half of 4 is 2: $x^2 + 4x + 7 = (x + 2)^2 + 7 - 4 = (x + 2)^2 + 3$.',
          'The verifier expanded the fold back exactly: $(x+2)^2 + 3 = x^2 + 4x + 4 + 3$ — closes.',
          'The square is $\\ge 0$, so $y \\ge 3$ with equality at $x = -2$: the smallest value is 3, vertex $(-2, 3)$, minimum.',
          'Reconcile: $\\Delta = 16 - 28 = -12 < 0$ — no doors, which a bowl floating at minimum height $3 > 0$ must show; and $-\\frac{\\Delta}{4a} = \\frac{12}{4} = 3$, the same 3.',
        ], answer: '(x + 2)² + 3; minimum value 3 at x = −2; Δ = −12 < 0 — no doors, consistent.' },
      ] },
      { level: 'L3', questions: [
        { q: 'On $y = 2x^2 - 7x + 3$, find the twin of $(1, -2)$ and the twin of $(0, 3)$, and check each twin by substitution.', solution: [
          'The axis is $x = \\frac{7}{4}$, so a point at $x$ twins to $x’ = \\frac{7}{2} - x$ (twice the axis minus $x$).',
          'Twin of $x = 1$: $x’ = \\frac{7}{2} - 1 = \\frac{5}{2}$; substitution: $2 \\cdot \\frac{25}{4} - \\frac{35}{2} + 3 = \\frac{25}{2} - \\frac{35}{2} + 3 = -5 + 3 = -2$ — same height, twin $\\left(\\frac{5}{2}, -2\\right)$.',
          'Twin of $x = 0$: $x’ = \\frac{7}{2}$; substitution: $2 \\cdot \\frac{49}{4} - \\frac{49}{2} + 3 = \\frac{49}{2} - \\frac{49}{2} + 3 = 3$ — twin $\\left(\\frac{7}{2}, 3\\right)$.',
          'Midpoint checks: $\\frac{1 + 5/2}{2} = \\frac{7}{4}$ and $\\frac{0 + 7/2}{2} = \\frac{7}{4}$ — both pairs midpoint on the axis exactly (the verifier priced all four designed pairs).',
        ], answer: 'the twins are (5/2, −2) and (7/2, 3); both pairs midpoint on x = 7/4 and satisfy the curve exactly.' },
        { q: 'Where does the horizontal line $y = 1$ meet $y = 2x^2 - 7x + 3$? Count the meets by discriminant and give their formula read.', solution: [
          'Set $2x^2 - 7x + 3 = 1$: the meet equation is $2x^2 - 7x + 2 = 0$.',
          'Shifted discriminant: $\\Delta_1 = 49 - 16 = 33$ — or by the hinge formula $\\Delta + 4a \\cdot 1 = 25 + 8 = 33$, agree.',
          '$\\Delta_1 = 33 > 0$: two meets (and indeed $1 > -\\frac{25}{8}$, above the hinge).',
          'Formula read: $x = \\frac{7 \\pm \\sqrt{33}}{4}$ — two irrational meets, priced by 9.3’s formula on the shifted constant.',
        ], answer: 'two meets at x = (7 ± √33)/4 (Δ₁ = 33 > 0).' },
        { q: 'Does $y = x^2 + x + 1$ ever meet the $x$-axis? Give the vertex and reconcile with the discriminant.', solution: [
          'Discriminant first: $\\Delta = 1 - 4 = -3 < 0$ — no real roots, no doors: the bowl never meets the axis.',
          'Vertex readout: $x = -\\frac{1}{2}$; height $f\\left(-\\frac{1}{2}\\right) = \\frac{1}{4} - \\frac{1}{2} + 1 = \\frac{3}{4}$.',
          'The minimum height is $\\frac{3}{4} > 0$ — the bowl floats, exactly why no meet is possible.',
          'Hence the two reads agree: $\\Delta < 0$ and a positive minimum are the same fact said twice (the fold: $\\left(x + \\frac{1}{2}\\right)^2 + \\frac{3}{4}$).',
        ], answer: 'never — Δ = −3 < 0; vertex (−1/2, 3/4) floats the bowl above the axis.' },
      ] },
      { level: 'L4', questions: [
        { q: 'For which $k$ does $y = x^2 - 4x + k$ touch the $x$-axis exactly once?', solution: [
          'A single touch is $\\Delta = 0$: $16 - 4k = 0$.',
          'So $k = 4$ — the constant that lifts the fold exactly onto the axis.',
          'Check: $x^2 - 4x + 4 = (x - 2)^2$, vertex $(2, 0)$ resting on the axis — the touch, drawn.',
          'Hence $k = 4$; any larger $k$ floats the bowl ($\\Delta < 0$), any smaller drops two doors ($\\Delta > 0$) — the hinge walked in $k$.',
        ], answer: 'k = 4 (then y = (x − 2)², vertex (2, 0) resting on the axis).' },
        { q: 'Compute the second differences of $y = 3x^2 - 2x + 1$ along $x = 0, 1, 2, 3$, and read $2a$ off them.', solution: [
          'Values: $f(0) = 1$, $f(1) = 2$, $f(2) = 9$, $f(3) = 22$.',
          'First differences: $2 - 1 = 1$, $9 - 2 = 7$, $22 - 9 = 13$ — not constant (no line here).',
          'Second differences: $7 - 1 = 6$, $13 - 7 = 6$ — constant 6.',
          'Hence $2a = 6$, i.e. $a = 3$ — the leading coefficient read off the table, no formula touched.',
        ], answer: 'values 1, 2, 9, 22; first differences 1, 7, 13; second differences 6, 6 — 2a = 6, a = 3.' },
        { q: 'Find the slopes of the three secants of $y = x^2 - 2x - 3$ between the census points $x = 0, 1, 2, 3$, and describe the climb.', solution: [
          'Values (L1’s table): $f(0) = -3$, $f(1) = -4$, $f(2) = -3$, $f(3) = 0$.',
          'Secant slopes: $\\frac{-4 - (-3)}{1} = -1$; $\\frac{-3 - (-4)}{1} = 1$; $\\frac{0 - (-3)}{1} = 3$.',
          'The climb: $-1 \\to 1 \\to 3$ — up by 2 each step.',
          'Hence the second difference is $2 = 2a$ with $a = 1$ — 10.2’s steepness theorem bending by exactly $2a$ per step, the honest signature of degree 2.',
        ], answer: 'secant slopes −1, 1, 3 — climbing by 2 = 2a each step.' },
      ] },
      { level: 'L5', questions: [
        { q: 'A rectangle has perimeter 20. Express its area as a quadratic in the width $x$, find the area-maximizing width by the vertex readout, and state the maximum area.', solution: [
          'Width $x$, length $10 - x$: the area is $A(x) = x(10 - x) = -x^2 + 10x$ — a quadratic with $a = -1 < 0$, opening down.',
          'So the vertex is a maximum: $x = -\\frac{b}{2a} = -\\frac{10}{-2} = 5$.',
          'Height: $A(5) = 25$ — or by the discriminant readout $-\\frac{\\Delta}{4a} = -\\frac{100}{-4} = 25$, agree.',
          'Hence the maximum area is 25 at width 5, length 5 — the square; and 9.3’s census maximum returns as geometry: among all rectangles of a given perimeter, the square is the champion.',
        ], answer: 'A(x) = x(10 − x) = −x² + 10x; width 5 (a square); maximum area 25.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: the horizontal line $y = k$ meets $y = ax^2 + bx + c$ ($a \\neq 0$) exactly twice when $k$ lies beyond the vertex height on the opening’s side, exactly once when $k = -\\frac{\\Delta}{4a}$, and never on the other side — then verify all three verdicts on the workhorse at $k = -4$, $k = -\\frac{25}{8}$ and $k = 5$.', solution: [
          'The meet equation is $ax^2 + bx + (c - k) = 0$, quadratic in $x$ with discriminant $\\Delta_k = b^2 - 4a(c - k) = \\Delta + 4ak$ — a LINEAR function of $k$, vanishing at $k = -\\frac{\\Delta}{4a}$: the hinge.',
          '$\\text{sign}(\\Delta_k)$ decides the count by 9.3’s machine: positive — two roots; zero — one; negative — none; and $\\text{sign}(\\Delta_k) = \\text{sign}(a)\\cdot\\text{sign}(k - h)$ with $h = -\\frac{\\Delta}{4a}$, so the cases split exactly at the vertex height (for $a > 0$: two when $k > h$, none when $k < h$; for $a < 0$ both reverse).',
          'At most twice is now structural: a quadratic cannot have more than two roots against ANY level — the trichotomy is exhaustive on every $k$.',
          'Workhorse verdicts: $k = -4$ gives $\\Delta_k = 25 - 32 = -7 < 0$ — no meet (the level passes under the bowl, since $-4 < -\\frac{25}{8}$); $k = -\\frac{25}{8}$ gives $\\Delta_k = 0$ — one meet, the vertex itself; $k = 5$ gives $\\Delta_k = 25 + 40 = 65 > 0$ — two meets at $x = \\frac{7 \\pm \\sqrt{65}}{4}$.',
          'Hence the theorem: the meet count flips exactly at the vertex height, and no horizontal probe ever meets a parabola more than twice.',
        ], answer: 'Δ_k = Δ + 4ak vanishes exactly at the vertex height −Δ/(4a); workhorse verdicts: none at k = −4, one at k = −25/8, two at k = 5.' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* The chapter                                                         */
/* ------------------------------------------------------------------ */

export const chapter10: Chapter = {
  number: 10,
  slug: 'graphs-of-equations',
  title: 'Graphs of Equations',
  summary:
    'Every solution made visible: the coordinate plane built properly (ordered pairs as addresses), linear equations graphed and slope derived as rate — with the parallel condition proved — and the parabola graphed through completing the square, the vertex formula derived, and the graph’s x-intercepts connected to the discriminant’s verdicts of chapter 9.',
  status: 'complete',
  lessons: [lesson101, lesson102, lesson103],
}
