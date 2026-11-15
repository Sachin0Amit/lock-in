import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 2: The Quadratic at Depth
 *
 * LESSONS WRITTEN: 2.R "Unit Review: The Quadratic at Depth" (run 104 —
 *                  the chapter CLOSES COMPLETE: 2.1–2.4 + 2.R. Verify-first
 *                  section N green BEFORE prose (3,278/0 — the two master
 *                  tables re-swept, the four cross-lesson witnesses
 *                  re-audited: the fence, the sign ladder, the Viète
 *                  inventory, the census family; the engines caught four
 *                  real pin errors pre-prose incl. the chapter's formula
 *                  inventory being 22 cards, not 21); authored-audit O
 *                  3,341/0; quiz keys [1, 1, 2, 1, 0]; the 15-part mixed
 *                  bench L1–L6 with every answer recomputed (the honest
 *                  single-seat wall demand m = 1, the P = 1 collapse
 *                  y²−8y+4, the range (1,3] with its degenerate endpoint,
 *                  the α⁵+β⁵ identity witnessed by 11 and 724, the
 *                  weights-law proof on (0,3)); 2 figures — the chapter
 *                  wiring diagram (four readings on the arc road, the two
 *                  promises, the D rail, the exit to ch. 3) and the
 *                  one-machine-four-readings plate (x²−4x+3 carrying the
 *                  vertex, sign, Viète and location verdicts at once); 8
 *                  formula cards consolidating the 22; the four m2-02
 *                  folds re-asserted; e2e 45/45 × 3 viewports, overlap
 *                  0/2 after three real fixes, domvalues CLEAN, VLM PASS
 *                  on both figures in both themes. The exit hands the
 *                  D < 0 doors to chapter 3 'Complex Numbers: the New
 *                  Rung' — never started in the same run.)
 *
 * LESSONS WRITTEN: 2.3 "Symmetric Reads and Common Roots" (run 102 —
 *                  quiz keys [2, 1, 0, 2, 0], 15 exercises L1–L6, two
 *                  figures — the mirror read of x² − 6x + 5 = 0 (roots 1
 *                  and 5 at the true tick scale, the amber dashed mirror
 *                  at x = 3, the dot-to-dot sum bracket, the 1×5 product
 *                  rectangle, four symmetric-read tags) and the shared-door
 *                  pair (f₁ = x² − 4x + 3 doors 1,3 / f₂ = x² − 2x − 3
 *                  doors −1,3 with the amber ring on the common door 3 and
 *                  the cross tag 6² = 36 = 18 × 2); hosts BOTH m2-02 folds —
 *                  'Repeated Roots: When the Two Doors Coincide' as a named
 *                  section (formal definition callout + the perfect-square
 *                  discriminant D = (2a − b − c)² of (a−b)x² + (b−c)x +
 *                  (c−a) with the AP verdict 2a = b + c and the GP-duplicate
 *                  ax² + 2bx + c tie-in d/a, e/b, f/c in AP) and the
 *                  'Condition for Both Common Roots' example-family with
 *                  THREE worked examples (the ℕ-minimum 15 on the non-real
 *                  x² + 4x + 10; the m-hunt with the honest census {−7, 6} —
 *                  m = −7 shares ONE root, only m = 6 is proportional; the
 *                  add-and-subtract three-equation system landing on
 *                  a = −8, b = −9 with the (x − 4)² repeated-seat tie-in);
 *                  the symmetric inventory priced no-solve on 3x² − 9x + 2
 *                  (23/3, 21, √57/3, 9/2, 23/2, 521/9), the power-sum
 *                  recurrence with the Lucas engine (T₅ = 11; the collapse
 *                  T₁₅ + T₁₁ = T₂·T₁₃ = 1563), the transformation engine run
 *                  by BOTH routes on the running equation x² − 4x + 1 (the
 *                  α²+1 elimination through y = 4x), the coefficient-reversal
 *                  law and its palindrome census, the reduced-equation trick,
 *                  the same-ratio theorem p²c = b²q, and the one-common-root
 *                  determinant condition derived and certified on a
 *                  160,000-pair integer grid; 6 formula cards.
 *
 * LESSONS WRITTEN: 2.2 "Quadratic Inequalities and the Sign Diagram" (run 101 —
 *                  quiz keys [1, 1, 1, 0, 0], 14 exercises L1–L6, two figures —
 *                  the sign ladder of x² − 7x + 10 = (x − 2)(x − 5) (parabola,
 *                  fenced zeros 2 and 5, the + − + band, shaded solution rays)
 *                  and the four-condition checklist audited on x² − 5x + 6 over
 *                  (1, 4) with the counter-case x² − 5x + 4 whose roots sit ON
 *                  the walls; hosts BOTH m2-02 folds as named subsections —
 *                  'Graphical Interpretation of the Zero of an Expression'
 *                  (definition callout + the between-roots derivation + the
 *                  zeros/sign read Illustration) and 'The Domain of an Equation'
 *                  (definition callout + the √(x² − 5x) domain and √(x + 6) = x
 *                  extraneous-census Illustrations); the four-step sign-diagram
 *                  recipe with the whole-line verdicts and the flip discipline;
 *                  the four-condition location system with the drills (both roots
 *                  of x² − 4x + m > 1 ⟺ 3 < m ≤ 4; x² + bx + 4 < 0 on (1, 2)
 *                  ⟺ b ≤ −5 with the endpoint-touch honesty; exactly one root of
 *                  x² − 5x + c in (0, 1) ⟺ 0 < c < 4; opposite signs of
 *                  x² + (m−1)x + (m−5) ⟺ m < 5 with the free discriminant
 *                  (m−3)² + 12; x² + mx + 3 negative at some positive x ⟺
 *                  m < −2√3); the five-question location table; the interleaving
 *                  gem at (1, 2, 4, 7) with the four-value bracket F(1) = 6λ,
 *                  F(2) = −2μ, F(4) = −6λ, F(7) = 18μ and the 35-pair grid
 *                  verdict; 5 formula cards.
 *
 * LESSONS WRITTEN: 2.1 "Vertex Form at Work: Maxima and Minima" (run 100 —
 *                  quiz keys [1, 1, 2, 1, 2], 14 exercises L1–L6, two
 *                  figures — the three-position trio of one upward opening
 *                  (x² − 4x + 7 / (x − 2)² / x² − 4x + 3 sharing the axis
 *                  x = 2, with the range brackets) and the 24 m fence with
 *                  its area parabola A(x) = x(12 − x) and the three sample
 *                  rectangles 4×8, 6×6, 9×3; the quadratic stops being an
 *                  equation and becomes an expression: the completion
 *                  identity ax² + bx + c = a(x + b/2a)² − D/4a² derived,
 *                  the vertex (−b/2a, −D/4a) and the range law both
 *                  directions, the six sign cases tabulated with the
 *                  conjunctive always-sign law (f ≥ 0 ∀x ⟺ a > 0 AND
 *                  D ≤ 0), the least-n parameter family (n = 5, with the
 *                  n = 4 witness (x+1)(x+5) dying at x = −3), the fence
 *                  and sum-20 optimization exhibits, the two-family gap
 *                  problem (max f < min g ⟺ a² + 2a − 13 < 0 ⟺ a ∈
 *                  (−1−√14, −1+√14), largest natural a = 2), the vertex
 *                  reconstruction, and the discriminant-range method —
 *                  x + 1/x ≥ 2 (x > 0, attained at 1, with the honest
 *                  forward pointer to chapter 4's AM–GM), the rational
 *                  (2x² + 3x + 6)/(x² + x + 1) with range
 *                  [(13 − 2√13)/3, (13 + 2√13)/3] ≈ [1.930, 6.737]
 *                  attained by the double-root seats, and the two-variable
 *                  bound x² + 4y² − 6x + 5 = 0 ⇒ x ∈ [1, 5], y ∈ [−1, 1]
 *                  with all four bound witnesses).
 *
 * VERIFY-FIRST (2026-11-15, run 100): every number above was recomputed by
 * scripts/verify-book4-ch02.ts BEFORE any prose existed — 232 pre-writing
 * checks green (sections A–E: the vertex engine with the completion
 * identity expanded on a 6×5×4 coefficient sweep, the optimization engine,
 * the discriminant-range engine with fine float sweeps agreeing with the
 * exact bounds, the inequality/location engine, and the pinned quiz +
 * exercise keys). The engines caught the author's own draft errors
 * pre-prose: the least-n discriminant line (−4n² + 8n + 48 < 0 ⟺
 * n² − 2n − 12 > 0 ⟺ n > 1 + √13, not 1 + √10) and the completed-form
 * vertex read. Research: the Drive M2-02 module "Theory of Equations"
 * (id 1b4ZfmNHpNaN3LBbJWDx0tp9fINUUM1m6, vision-transcribed printed
 * pp. 2.9–2.11, 2.13–2.16, 2.28–2.31, 2.36–2.38 at the 2.N = PDF N+2
 * offset) + JEE Main 2026 syllabus web-checks — the master plan is
 * docs/research/AA_CH02_MASTER_PLAN.md.
 *
 * CROSS-REFERENCES: opens on AL 9.2's completed square
 * (al-completing-the-square-derived), AL 10.3's parabola
 * (al-the-parabola-quadratic-graphs-and-vertices) and AL 9.3's
 * discriminant (al-the-quadratic-formula-and-the-discriminant); the
 * AM–GM re-derivation of x + 1/x ≥ 2 is chapter 4's door, named once.
 * Chapter 2 stands 1/4 after this run (2.2 next, then 2.3, 2.4, then the
 * unit review and the chapter close on the completing run).
 */

/* ------------------------------------------------------------------ */
/* figures                                                             */
/* ------------------------------------------------------------------ */

function vertexTrioSvg(): string {
  // one panel: O = (250, 285), unit 32 px; three upward parabolas on the
  // shared axis x = 2 — f1 = x²−4x+7 (teal, min 3), f2 = (x−2)² (amber,
  // min 0), f3 = x²−4x+3 (lime, min −1, roots 1 and 3)
  const OX = 250, OY = 285, U = 32
  const px = (x: number): number => OX + U * x
  const py = (y: number): number => OY - U * y
  const path = (f: (x: number) => number, x0: number, x1: number, cap: number): string => {
    const pts: string[] = []
    for (let x = x0; x <= x1 + 1e-9; x += 0.1) {
      const y = f(x)
      if (y <= cap) pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`)
    }
    return `<polyline points="${pts.join(' ')}" fill="none" stroke-width="2.4"/>`
  }
  const f1 = (x: number): number => (x - 2) * (x - 2) + 3
  const f2 = (x: number): number => (x - 2) * (x - 2)
  const f3 = (x: number): number => (x - 1) * (x - 3)
  const legendRow = (y: number, color: string, label: string, sub: string): string =>
    `<circle cx="470" cy="${y - 4}" r="5" fill="${color}"/><text x="484" y="${y}" font-size="12.5" font-weight="700" fill="currentColor">${label}</text><text x="484" y="${y + 15}" font-size="11" fill="currentColor" opacity="0.85">${sub}</text>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three upward parabolas sharing the axis x = 2: x squared minus 4x plus 7 with D negative, minimum 3, entirely above the x-axis; (x minus 2) squared with D zero, touching at 2; x squared minus 4x plus 3 with D positive, dipping to minus 1 between roots 1 and 3. The range brackets annotate each minimum. The legend names the three positions of one opening.">
  <text x="250" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">one opening, three positions — the family y = (x−2)² + k</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
    <path d="M${px(-0.9)} ${OY}H${px(4.9)} M${OX} ${py(7.9)}V${py(-1.4)}"/>
  </g>
  <text x="${px(4.9) - 2}" y="${OY + 17}" font-size="11" text-anchor="end" opacity="0.85">x</text>
  <text x="${OX + 8}" y="44" font-size="11" opacity="0.85">y</text>
  <g font-size="10.5" text-anchor="middle" fill="currentColor" opacity="0.85">
    <text x="${OX - 10}" y="${OY + 17}" text-anchor="end">0</text>
    <text x="${px(2)}" y="${OY + 17}">2</text>
    <text x="${px(3)}" y="${OY + 17}">3</text>
    <text x="${px(4)}" y="${OY + 17}">4</text>
    <text x="${OX + 12}" y="${py(1) + 4}" text-anchor="start">1</text>
    <text x="${OX + 12}" y="${py(5) + 4}" text-anchor="start">5</text>
  </g>
  <path d="M${px(2)} ${OY}V${py(7.9)}" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 4" opacity="0.55" fill="none"/>
  <text x="372" y="336" font-size="10.5" text-anchor="start" fill="currentColor" opacity="0.85">axis x = 2</text>
  <g stroke="#0d9488" fill="none">${path(f1, 0, 4, 7.5)}</g>
  <g stroke="#d97706" fill="none" stroke-dasharray="6 3">${path(f2, 0, 4.45, 7.5)}</g>
  <g stroke="#65a30d" fill="none">${path(f3, -0.15, 4.15, 7.5)}</g>
  <g fill="currentColor">
    <circle cx="${px(2)}" cy="${py(3)}" r="4.2" fill="#0d9488"/>
    <circle cx="${px(2)}" cy="${py(0)}" r="4.2" fill="#d97706"/>
    <circle cx="${px(2)}" cy="${py(-1)}" r="4.2" fill="#65a30d"/>
    <circle cx="${px(1)}" cy="${OY}" r="3.4" fill="#65a30d"/>
    <circle cx="${px(3)}" cy="${OY}" r="3.4" fill="#65a30d"/>
  </g>
  <g font-size="11" fill="currentColor" font-weight="700">
    <text x="282" y="${py(3) - 6}" text-anchor="end">min 3</text>
    <text x="282" y="${py(0) - 7}" text-anchor="end">min 0</text>
    <text x="${px(2)}" y="334" text-anchor="middle">min −1</text>
  </g>
  <g font-size="12.5" font-weight="700" fill="currentColor">
    <text x="470" y="60">the three positions of one opening</text>
  </g>
  ${legendRow(88, '#0d9488', 'a > 0, D < 0 — all above', 'f₁: range [3, ∞), positive everywhere')}
  ${legendRow(126, '#d97706', 'a > 0, D = 0 — touches', 'f₂: range [0, ∞), one zero at x = 2')}
  ${legendRow(164, '#65a30d', 'a > 0, D > 0 — dips below', 'f₃: negative between roots 1 and 3')}
  <g font-size="11.5" fill="currentColor" opacity="0.92">
    <text x="470" y="205">the range bracket rides the minimum:</text>
    <text x="470" y="224" font-weight="700">a > 0 ⇒ [−D/4a, ∞)</text>
    <text x="470" y="243" font-weight="700">a < 0 ⇒ (−∞, −D/4a]</text>
    <text x="470" y="266">every range question is a vertex</text>
    <text x="470" y="282">question in disguise.</text>
  </g>
</svg>`
}

function fenceAreaSvg(): string {
  // left panel: the area parabola A(x) = x(12-x), O = (235, 288), unit
  // (6.4, 6.4) px; right panel: three sample rectangles at 13 px per metre
  const OX = 235, OY = 288, UX = 6.4, UY = 6.4
  const px = (x: number): number => OX + UX * x
  const py = (y: number): number => OY - UY * y
  const pts: string[] = []
  for (let x = 0; x <= 12.001; x += 0.25) pts.push(`${px(x).toFixed(1)},${py(x * (12 - x)).toFixed(1)}`)
  const rect = (x: number, y: number, x0: number, y0: number, w: number, h: number, color: string, label: string, area: string): string =>
    `<rect x="${x0}" y="${y0}" width="${w}" height="${h}" fill="none" stroke="${color}" stroke-width="2"/>` +
    `<text x="${x0 + w / 2}" y="${y0 - 6}" font-size="11" text-anchor="middle" fill="${color}" font-weight="700">${label}</text>` +
    `<text x="${x0 + w / 2}" y="${y0 + h / 2 + 4}" font-size="11.5" text-anchor="middle" fill="currentColor" font-weight="700">${area}</text>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: the area parabola A of x equals x times 12 minus x for a 24 metre fence, opening downward with vertex (6, 36); the pinned seats A(4) = 32 and A(9) = 27 sit below the peak, and the dashed drop from 36 to the axis marks the lost height at any off-vertex width. Right: the three sample rectangles drawn to scale — 4 by 8 with area 32, the highlighted 6 by 6 square with area 36, and 9 by 3 with area 27 — the vertex is the best rectangle.">
  <text x="${OX + 76}" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">A(x) = x(12 − x)</text>
  <text x="575" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">three rectangles, one fence</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
    <path d="M${px(-0.4)} ${OY}H${px(12.4)} M${OX} ${py(38.5)}V${OY}"/>
  </g>
  <text x="225" y="46" font-size="11" text-anchor="end" opacity="0.85">A</text>
  <g font-size="10.5" text-anchor="middle" fill="currentColor" opacity="0.85">
    <text x="${OX}" y="${OY + 14}">0</text>
    <text x="${px(4)}" y="${OY + 14}">4</text>
    <text x="${px(6)}" y="${OY + 14}">6</text>
    <text x="${px(9)}" y="${OY + 14}">9</text>
    <text x="${px(12)}" y="${OY + 14}">12</text>
    <text x="${OX - 8}" y="${py(32) + 4}" text-anchor="end">32</text>
    <text x="${OX - 8}" y="${py(36) + 4}" text-anchor="end">36</text>
  </g>
  <polyline points="${pts.join(' ')}" fill="none" stroke="#65a30d" stroke-width="2.6"/>
  <path d="M${px(6)} ${OY}V${py(36)}" stroke="currentColor" stroke-width="0.9" stroke-dasharray="3 4" opacity="0.55" fill="none"/>
  <g fill="#65a30d">
    <circle cx="${px(6)}" cy="${py(36)}" r="4.6"/>
    <circle cx="${px(4)}" cy="${py(32)}" r="3.8"/>
    <circle cx="${px(9)}" cy="${py(27)}" r="3.8"/>
    <circle cx="${px(2)}" cy="${py(20)}" r="3.2"/>
    <circle cx="${px(10)}" cy="${py(20)}" r="3.2"/>
  </g>
  <g font-size="11" fill="currentColor" font-weight="700">
    <text x="${px(6)}" y="${py(36) - 9}" text-anchor="middle">vertex (6, 36)</text>
  </g>
  <g stroke="currentColor" stroke-width="1" stroke-dasharray="3 3" opacity="0.6" fill="none">
    <path d="M330 74 L265 81"/>
    <path d="M330 114 L296 112"/>
    <path d="M330 152 L302 158"/>
    <path d="M330 152 L252 158"/>
  </g>
  <g font-size="11" fill="currentColor" font-weight="700">
    <text x="334" y="78">A(4) = 32</text>
    <text x="334" y="118">A(9) = 27</text>
    <text x="334" y="156">A(2) = A(10) = 20</text>
  </g>
  <g font-size="11" fill="currentColor" opacity="0.92">
    <text x="334" y="172">the symmetry: x and 12 − x trade</text>
    <text x="334" y="186">places — the vertex picks the winner</text>
  </g>
  <g>
    ${rect(4, 8, 470, 56, 52, 104, '#0d9488', '4 × 8', 'A = 32 m²')}
    ${rect(4, 8, 545, 72, 78, 78, '#65a30d', '6 × 6 — the vertex', 'A = 36 m²')}
    ${rect(4, 8, 646, 92, 54, 27, '#d97706', '', 'A = 27 m²')}
    <text x="646" y="86" font-size="11" text-anchor="middle" fill="#d97706" font-weight="700">9 × 3</text>
  </g>
  <g font-size="11.5" fill="currentColor" opacity="0.92">
    <text x="470" y="205">every 24-metre fence owns the same</text>
    <text x="470" y="222">perimeter — but the AREA is a quadratic</text>
    <text x="470" y="239">in the width, and its vertex picks the</text>
    <text x="470" y="256" font-weight="700">winner: the square 6 × 6.</text>
    <text x="470" y="280">max A = −D/4a = −(−576)/4(−1) = 36</text>
  </g>
</svg>`
}

function pencilFixedPointSvg(): string {
  // the census family's pencil: every member of x^2 - (m+1)x + 3m - 5
  // passes through the fixed point (3, 1); walls at x = 1 and x = 3.
  // window: x in [-3, 7] -> px 60..660; y in [-6.5, 9.5] -> py 325..35
  const px = (x: number): number => 60 + (x + 3) * 60
  const py = (y: number): number => 35 + (9.5 - y) * 18.125
  const members: Array<[number, string, string]> = [
    [0, '#0d9488', 'm = 0: x² − x − 5'],
    [3, '#d97706', 'm = 3: (x − 2)²'],
    [5, '#65a30d', 'm = 5: (x − 3)² + 1'],
    [7, '#ea580c', 'm = 7: (x − 4)²'],
  ]
  const curves: string[] = []
  for (const [m, color] of members) {
    const pts: string[] = []
    for (let x = -3; x <= 7.001; x += 0.1) {
      const y = x * x - (m + 1) * x + 3 * m - 5
      if (y >= -6.5 && y <= 9.5) pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`)
    }
    curves.push(`<polyline points="${pts.join(' ')}" fill="none" stroke="${color}" stroke-width="2.4"/>`)
  }
  const dot = (x: number, color: string): string =>
    `<circle cx="${px(x).toFixed(1)}" cy="${py(0).toFixed(1)}" r="4.5" fill="#fffdf5" stroke="${color}" stroke-width="2.4"/>`
  return `<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four members of the family x squared minus m plus 1 times x plus 3m minus 5, all passing through the fixed point (3, 1), with dashed walls at x equals 1 and x equals 3. The member m equals 0 crosses the axis at the doors minus 1.79 and 2.79; m equals 3 touches at the double door 2; m equals 7 touches at the double door 4; m equals 5 floats above with its vertex exactly at the fixed point.">
  <rect x="0" y="0" width="720" height="360" fill="#fffdf5"/>
  <text x="360" y="22" font-size="15" font-weight="700" text-anchor="middle" fill="#166534">the pencil of x² − (m+1)x + 3m − 5 — every member through (3, 1)</text>
  <g stroke="#16a34a" stroke-width="2"><path d="M60 ${py(0)}H660 M${px(0)} 35V325"/></g>
  <text x="${px(0) + 6}" y="46" font-size="12" fill="#0f766e">y</text>
  <text x="648" y="${py(0) + 16}" font-size="12" fill="#0f766e">x</text>
  ${curves.join('\n  ')}
  <g stroke="#d97706" stroke-width="1.6" stroke-dasharray="5 4">
    <path d="M${px(1)} 60V305"/><path d="M${px(3)} 60V305"/>
  </g>
  <text x="${px(1)}" y="52" font-size="13" font-weight="700" fill="#d97706" text-anchor="middle">wall k₁ = 1</text>
  <text x="${px(3)}" y="52" font-size="13" font-weight="700" fill="#d97706" text-anchor="middle">wall k₂ = 3</text>
  ${dot(-1.7905, '#0d9488')}${dot(2.7905, '#0d9488')}${dot(2, '#d97706')}${dot(4, '#ea580c')}
  <circle cx="${px(3)}" cy="${py(1)}" r="6.5" fill="none" stroke="#dc2626" stroke-width="3"/>
  <text x="${px(3) + 12}" y="${py(1) - 8}" font-size="13" font-weight="700" fill="#dc2626">the fixed point (3, 1)</text>
  <g font-size="12" fill="#1c1917">
    <text x="528" y="240" fill="#0d9488" font-weight="700">m = 0: x² − x − 5 (doors −1.79, 2.79)</text>
    <text x="528" y="258" fill="#d97706" font-weight="700">m = 3: (x − 2)² (double door 2)</text>
    <text x="528" y="276" fill="#65a30d" font-weight="700">m = 5: (x − 3)² + 1 (no real doors)</text>
    <text x="528" y="294" fill="#ea580c" font-weight="700">m = 7: (x − 4)² (double door 4)</text>
    <text x="528" y="318" font-size="11.5" fill="#0f766e">f(3) = 1 for EVERY m — the m = 5</text>
    <text x="528" y="333" font-size="11.5" fill="#0f766e">member parks its vertex right here</text>
  </g>
  <text x="360" y="346" font-size="12.5" text-anchor="middle" fill="#0f766e">the wall 3 never falls between the doors — the graph is above the axis there for every m</text>
</svg>`
}

function interleavingDoorsSvg(): string {
  // the four doors a < b < c < d on one line: the bracketed zones the
  // census prices, the concrete mu = 2, lambda = 3 doors, and the
  // linear-case seat x* = 19/5.
  // window: x in [-4.5, 10.5] -> px 60..660; the line at y = 200
  const px = (x: number): number => 60 + (x + 4.5) * 40
  const LINE = 200
  const door = (x: number, label: string): string =>
    `<circle cx="${px(x)}" cy="${LINE}" r="6" fill="#65a30d"/>` +
    `<text x="${px(x)}" y="${LINE + 26}" font-size="13" font-weight="700" fill="#166534" text-anchor="middle">${label}</text>`
  const bracket = (x1: number, x2: number, y: number, color: string, label: string): string =>
    `<path d="M${px(x1)} ${y} H${px(x2)}" stroke="${color}" stroke-width="2.4" fill="none"/>` +
    `<path d="M${px(x1)} ${y - 6} v12 M${px(x2)} ${y - 6} v12" stroke="${color}" stroke-width="2.4" fill="none"/>` +
    `<text x="${(px(x1) + px(x2)) / 2}" y="${y - 12}" font-size="12" font-weight="700" fill="${color}" text-anchor="middle">${label}</text>`
  return `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A number line carrying the four doors a equals minus 1, b equals 2, c equals 5, d equals 7. Above the line, amber brackets over the intervals from minus 1 to 2 and from 5 to 7, labeled lambda mu greater than zero puts one door in each. Below the line, a teal bracket over 2 to 5 labeled lambda mu less than zero puts one door there, with escape arrows pointing left beyond minus 1 and right beyond 7. Orange dots mark the concrete instance mu equals 2 lambda equals 3 at approximately 1.08 and 5.92. A lime dot marks the linear case seat 19 over 5 equals 3.8 between 2 and 5.">
  <rect x="0" y="0" width="720" height="380" fill="#fffdf5"/>
  <text x="360" y="24" font-size="15" font-weight="700" text-anchor="middle" fill="#166534">the interleaving census on the doors −1 &lt; 2 &lt; 5 &lt; 7</text>
  <g stroke="#16a34a" stroke-width="2.2"><path d="M60 ${LINE}H660"/></g>
  <g stroke="#5eead4" stroke-width="1">
    ${[-4, -3, -2, 0, 1, 3, 4, 6, 8, 9, 10].map((x) => `<path d="M${px(x)} ${LINE - 5}v10"/>`).join('')}
  </g>
  ${door(-1, 'a = −1')}${door(2, 'b = 2')}${door(5, 'c = 5')}${door(7, 'd = 7')}
  ${bracket(-1, 2, 130, '#d97706', 'λμ &gt; 0: one door in (a, b)')}
  ${bracket(5, 7, 130, '#d97706', 'one door in (c, d)')}
  ${bracket(2, 5, 275, '#0d9488', 'λμ &lt; 0: one door in (b, c)')}
  <g stroke="#0d9488" stroke-width="2.4" fill="none">
    <path d="M${px(-1)} 300 H${px(-4)}"/><path d="M${px(-4)} 300 l10 -6 v12 z" fill="#0d9488"/>
    <path d="M${px(7)} 300 H${px(10)}"/><path d="M${px(10)} 300 l-10 -6 v12 z" fill="#0d9488"/>
  </g>
  <text x="${px(-2.9)}" y="322" font-size="11.5" font-weight="700" fill="#0d9488" text-anchor="middle">μ+λ &gt; 0: the escaper</text>
  <text x="${px(-2.9)}" y="336" font-size="11.5" fill="#0f766e" text-anchor="middle">leaves LEFT (&lt; a)</text>
  <text x="${px(8.9)}" y="322" font-size="11.5" font-weight="700" fill="#0d9488" text-anchor="middle">μ+λ &lt; 0: the escaper</text>
  <text x="${px(8.9)}" y="336" font-size="11.5" fill="#0f766e" text-anchor="middle">leaves RIGHT (&gt; d)</text>
  <circle cx="${px(1.0813)}" cy="${LINE}" r="5.5" fill="#ea580c"/>
  <circle cx="${px(5.9187)}" cy="${LINE}" r="5.5" fill="#ea580c"/>
  <text x="${px(1.0813)}" y="${LINE - 14}" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="middle">≈ 1.08</text>
  <text x="${px(5.9187)}" y="${LINE - 14}" font-size="11.5" font-weight="700" fill="#ea580c" text-anchor="middle">≈ 5.92</text>
  <text x="360" y="96" font-size="12" fill="#0f766e" text-anchor="middle">the concrete instance μ = 2, λ = 3: F = 5x² − 35x + 32, doors (35 ± 3√65)/10</text>
  <g stroke="#65a30d" stroke-width="1.6" stroke-dasharray="4 3"><path d="M${px(3.8)} 196 V168"/></g>
  <circle cx="${px(3.8)}" cy="176" r="5.5" fill="#65a30d"/>
  <text x="${px(3.8)}" y="160" font-size="12" font-weight="700" fill="#166534" text-anchor="middle">x* = 19/5 = 3.8</text>
  <text x="${px(3.8)}" y="145" font-size="11" fill="#0f766e" text-anchor="middle">the μ+λ = 0 seat</text>
  <text x="360" y="368" font-size="12" fill="#0f766e" text-anchor="middle">degenerate seats: λ = 0 puts the doors exactly on a and c; μ = 0 exactly on b and d</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 2.1                                                          */
/* ------------------------------------------------------------------ */

const lesson21: Lesson = {
  id: 'aa-vertex-form-at-work-maxima-and-minima',
  number: '2.1',
  title: 'Vertex Form at Work: Maxima and Minima',
  concepts: [
    'the completion identity: ax² + bx + c = a(x + b/2a)² − D/4a',
    'the vertex (−b/2a, −D/4a) and the axis x = −b/2a',
    'the range law: a > 0 ⇒ [−D/4a, ∞), a < 0 ⇒ (−∞, −D/4a]',
    'the six sign cases and the always-sign law: a > 0 AND D ≤ 0',
    'max/min without calculus: the squared term is the whole argument',
    'the two-family gap: max f < min g as a quadratic condition on the parameter',
    'the discriminant-range method: real solutions force D ≥ 0',
  ],
  objectives: [
    'derive the completion identity and read the vertex and axis from any quadratic in seconds',
    'state the range law in both directions and apply it without completing the square twice',
    'decide always-positive / always-negative questions with the conjunctive law, never half of it',
    'solve fence, number-pair and two-family optimization problems by locating the vertex',
    'rebuild a quadratic from its vertex and one value',
    'find the range of rational quadratic expressions by the discriminant method, with attainment checked',
  ],
  prerequisites: ['al-completing-the-square-derived', 'al-the-parabola-quadratic-graphs-and-vertices', 'al-the-quadratic-formula-and-the-discriminant'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'ncert-math10-ch4-quadratic', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra settled the quadratic EQUATION: AL 9.1 factored it, AL 9.2 completed its square, AL 9.3 ran the formula, AL 9.4 read its roots through Viète. This chapter treats the quadratic EXPRESSION $ax^2 + bx + c$ as a working object — and the examination\'s deeper question is not "where does it vanish?" but "how large can it BE?" The least value of $x^2 - 4x + 7$, the largest area a 24-metre fence can enclose, the parameter $k$ that keeps a family positive at every seat — none of these is an equation question, and none of them waits for calculus. They all answer to one completed square.' },
    { kind: 'para', text: 'The tool is already banked: AL 9.2 derived completing the square as the equation-solving move. Here the same identity is read as a STRUCTURE theorem — it displays the quadratic as (a square) + (a constant), and a square has a floor or a ceiling that no algebra below it can breach. Everything in this lesson — the vertex, the range, the max/min, the always-sign law, the optimization exhibits — is one reading or another of that single display.' },

    { kind: 'heading', text: 'The Completion Identity and the Vertex' },
    { kind: 'derivation', title: 'The completion identity', statement: 'Every quadratic $f(x) = ax^2 + bx + c$ with $a \\neq 0$ can be written as $f(x) = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{D}{4a}$, where $D = b^2 - 4ac$ is the discriminant AL 9.3 banked.', steps: [
      { label: 'Factor the leading coefficient', formula: 'f(x) = a\\left[x^2 + \\frac{b}{a}x\\right] + c', explanation: 'pull $a$ out of the first two terms so the bracket is monic and AL 9.2\'s completion applies inside it.' },
      { label: 'Complete the square inside the bracket', formula: 'f(x) = a\\left[\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{b^2}{4a^2}\\right] + c', explanation: 'add and subtract $\\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2}$ — the added square is exactly what the monic bracket needs.' },
      { label: 'Distribute and regroup the constants', formula: 'f(x) = a\\left(x + \\frac{b}{2a}\\right)^2 + c - \\frac{b^2}{4a}', explanation: 'the outer $a$ multiplies both bracket terms; the constants collect into one lump.' },
      { label: 'Name the lump with the discriminant', formula: 'c - \\frac{b^2}{4a} = \\frac{4ac - b^2}{4a} = -\\frac{b^2 - 4ac}{4a} = -\\frac{D}{4a}', explanation: 'the collected constant is AL 9.3\'s discriminant in disguise — the same $D$ that counts the doors now prices the vertex height.' },
    ], result: '$f(x) = a\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{D}{4a}$ — the identity holds for every $a \\neq 0$, and the verifier expanded it across a coefficient sweep to keep the algebra honest.' },
    { kind: 'callout', tone: 'definition', title: 'Vertex and axis', text: 'The VERTEX of the parabola $y = ax^2 + bx + c$ is the point $\\left(-\\dfrac{b}{2a},\\ -\\dfrac{D}{4a}\\right)$ — the unique seat where the squared term vanishes. The AXIS is the vertical line $x = -\\dfrac{b}{2a}$: the completed form shows $f$ depends on $x$ only through $\\left(x + \\dfrac{b}{2a}\\right)^2$, so $f(x) = f\\left(-\\dfrac{b}{a} - x\\right)$ and the graph is the mirror image of itself across that line. AL 10.3 drew this symmetry graphically; the completed form is its algebra.' },
    { kind: 'para', text: 'The identity is a reading machine. Whatever $x$ does, the squared term $a\\left(x + \\frac{b}{2a}\\right)^2$ is $\\geq 0$ when $a > 0$ and $\\leq 0$ when $a < 0$ — and it hits its extreme exactly once, at $x = -\\frac{b}{2a}$. So the whole behaviour of $f$ concentrates at one seat: for $a > 0$ the expression bottoms out there, for $a < 0$ it peaks there, and the bottom or peak value is the constant term $-\\frac{D}{4a}$. For example, $f(x) = x^2 - 4x + 7$ has $a = 1$, $b = -4$, $D = 16 - 28 = -12$, so the vertex sits at $\\left(-\\frac{-4}{2},\\ -\\frac{-12}{4}\\right) = (2, 3)$ — and the completed form says the same thing in one line, $f(x) = (x - 2)^2 + 3$.' },
    { kind: 'example', title: 'Find the minimum value of f(x) = x² − 4x + 7 and the x at which it occurs', steps: [
      'Complete the square: $f(x) = x^2 - 4x + 7 = (x - 2)^2 + 4 - 4 + 7 = (x - 2)^2 + 3$.',
      'A square is never negative: $(x - 2)^2 \\geq 0$ at every seat, with equality exactly when $x = 2$.',
      'Thus, $f(x) = (x - 2)^2 + 3 \\geq 3$, and the value 3 is ATTAINED — at $x = 2$, where the square vanishes.',
      'The discriminant agrees: $D = (-4)^2 - 4 \\cdot 1 \\cdot 7 = -12$, and $-\\frac{D}{4a} = \\frac{12}{4} = 3$ — the vertex read and the completion read are the same statement.',
      'The verifier\'s integer sweep from $-10$ to $10$ confirms: the minimum 3 occurs uniquely at $x = 2$, with $f(0) = 7$ and $f(4) = 7$ the symmetric shoulder seats. Thus, the minimum value is 3, attained at $x = 2$.',
    ] },

    { kind: 'heading', text: 'The Range Law' },
    { kind: 'callout', tone: 'theorem', title: 'The range law for a quadratic expression', text: 'For $f(x) = ax^2 + bx + c$ with $a \\neq 0$: if $a > 0$, the range of $f$ is $\\left[-\\dfrac{D}{4a},\\ \\infty\\right)$ — every value $\\geq -\\frac{D}{4a}$ is taken, the minimum is ATTAINED at $x = -\\frac{b}{2a}$, and nothing smaller ever occurs. If $a < 0$, the range is $\\left(-\\infty,\\ -\\dfrac{D}{4a}\\right]$ — the maximum $-\\frac{D}{4a}$ is attained at the same seat. Thus, in both cases the extreme value is $-\\frac{D}{4a}$ and the sign of $a$ alone decides whether it is a floor or a ceiling.' },
    { kind: 'para', text: 'Why the two directions are not two facts but one: the completed form $f(x) = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}$ makes the expression a scaled square plus a constant. For $a > 0$ the square\'s contribution is a non-negative quantity — it can grow without bound (send $|x|$ to infinity) but it cannot go below zero — so the values of $f$ are exactly the numbers $-\\frac{D}{4a}$ and everything above. For $a < 0$ the contribution flips sign: unbounded below, capped above. The range law is the square\'s one-sidedness, stated in interval language.' },
    { kind: 'figure', caption: 'One opening, three positions. All three machines share the axis $x = 2$ and the opening $a = 1 > 0$; only the discriminant changes. Teal: $f_1 = x^2 - 4x + 7$ with $D = -12 < 0$ — the parabola floats entirely above the x-axis, minimum 3, range $[3, \\infty)$. Amber: $f_2 = (x - 2)^2$ with $D = 0$ — the graph touches the axis at the single seat $x = 2$, minimum 0, range $[0, \\infty)$. Lime: $f_3 = x^2 - 4x + 3 = (x-1)(x-3)$ with $D = 4 > 0$ — the graph dips to its minimum $-1$ between the roots 1 and 3, and the sign there is negative. The range bracket rides the minimum in every case: for $a > 0$ the range is $[-D/4a, \\infty)$, and $a < 0$ flips it.', svg: vertexTrioSvg() },
    { kind: 'para', text: 'The figure prices the vocabulary this lesson needs for the sign census ahead. "All above" ($a > 0$, $D < 0$) means the expression is positive at every seat — the equation $f(x) = 0$ has no real doors, and AL 9.3\'s discriminant verdict was announcing exactly this. "Touches" ($a > 0$, $D = 0$) means non-negative with a single zero. "Dips below" ($a > 0$, $D > 0$) means the sign alternates: positive outside the root pair, negative between. The three positions of one upward opening are the whole visual grammar of the next lesson\'s sign diagrams.' },
    { kind: 'example', title: 'Find the maximum value of g(x) = −x² + 6x − 5 and read it straight off the discriminant', steps: [
      'Here $a = -1 < 0$: the opening is downward, so the expression has a MAXIMUM, located at the vertex $x = -\\frac{b}{2a} = -\\frac{6}{-2} = 3$.',
      'The extreme value by the range law: $-\\frac{D}{4a}$ with $D = 36 - 20 = 16$ gives $-\\frac{16}{-4} = 4$.',
      'Confirm by completing the square: $g(x) = -(x^2 - 6x) - 5 = -\\left[(x - 3)^2 - 9\\right] - 5 = 4 - (x - 3)^2$. The square is $\\geq 0$, so $g(x) \\leq 4$, attained exactly at $x = 3$.',
      'The roots 1 and 5 (from $g(x) = -(x - 1)(x - 5)$) bracket the positive band — $g(2) = g(4) = 3$ inside, $g(0) = g(6) = -5$ outside — the two-family shape the next illustration will exploit. Thus, the maximum value is 4, attained at $x = 3$.',
    ] },

    { kind: 'heading', text: 'The Six Sign Cases and the Always-Sign Law' },
    { kind: 'para', text: 'Cross the opening\'s sign with the discriminant\'s three states and six verdicts fall out — each one a small picture, each one an examination staple. The table reads each cell off the completed form: the square contributes according to the sign of $a$, the discriminant decides whether the constant $-\\frac{D}{4a}$ sits above, on, or below the axis.' },
    { kind: 'table', caption: 'The six sign cases of ax² + bx + c, every verdict read off the completed form', head: ['case', 'the picture', 'the verdict'], rows: [
      ['$a > 0$, $D < 0$', 'upward, floats above', '$f(x) > 0$ for every real $x$ — range $\\left[-\\frac{D}{4a}, \\infty\\right)$ entirely positive'],
      ['$a > 0$, $D = 0$', 'upward, touches once', '$f(x) \\geq 0$ with $f = 0$ only at $x = -\\frac{b}{2a}$'],
      ['$a > 0$, $D > 0$', 'upward, dips below', '$f > 0$ outside the roots, $f < 0$ between them'],
      ['$a < 0$, $D > 0$', 'downward, arches above', '$f > 0$ between the roots, $f < 0$ outside'],
      ['$a < 0$, $D = 0$', 'downward, touches once', '$f(x) \\leq 0$ with $f = 0$ only at $x = -\\frac{b}{2a}$'],
      ['$a < 0$, $D < 0$', 'downward, hangs below', '$f(x) < 0$ for every real $x$ — range $\\left(-\\infty, -\\frac{D}{4a}\\right]$ entirely negative'],
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The always-sign law', text: '$f(x) = ax^2 + bx + c$ satisfies $f(x) \\geq 0$ for all real $x$ if and only if $a > 0$ AND $D \\leq 0$; it satisfies $f(x) \\leq 0$ for all real $x$ if and only if $a < 0$ AND $D \\leq 0$. Both conditions are needed — the opening buys the side of the axis, the discriminant buys the (non-)crossing, and neither buys the other\'s half. (Equality in $D \\leq 0$ is allowed: the touching case still never goes negative.)' },
    { kind: 'callout', tone: 'warn', title: 'The conjunctive trap', text: 'Half the law is not the law. $x^2 - 4x + 3$ has $a = 1 > 0$ yet $f(2) = -1$ — a positive opening with two real doors dips below. And $-(x - 2)^2 + 1$ has $D = 4 > 0$ for its inner quadratic yet peaks at $+1$ — a negative opening with doors can still reach positive ground. Examinations set exactly these two half-law traps; the verdict question "for which $k$ is $x^2 + kx + 16 > 0$ for all real $x$?" wants the conjunction $D = k^2 - 64 < 0$, that is $|k| < 8$, with the boundary $k = \\pm 8$ EXCLUDED because the touching case gives $f = 0$, not $f > 0$.' },
    { kind: 'example', title: 'Find the least natural number n for which (n − 3)x² + 6x + (n + 1) > 0 for every real x', steps: [
      'The always-sign law demands BOTH: leading coefficient positive, $n - 3 > 0$, and discriminant negative, $D = 36 - 4(n - 3)(n + 1) < 0$.',
      'Expand the discriminant: $(n - 3)(n + 1) = n^2 - 2n - 3$, so $D = 36 - 4n^2 + 8n + 12 = -4n^2 + 8n + 48$. The demand $D < 0$ becomes $n^2 - 2n - 12 > 0$.',
      'The boundary: $n = 1 + \\sqrt{13} \\approx 4.606$ (the other root $1 - \\sqrt{13}$ is negative), so the demand reads $n > 1 + \\sqrt{13}$ — the least natural candidate is $n = 5$, which also clears $n > 3$.',
      'Check $n = 5$: the expression is $2x^2 + 6x + 6 = 2(x^2 + 3x + 3)$, and the inner discriminant is $9 - 12 = -3 < 0$ — positive at every seat (the verifier\'s sweep agrees).',
      'Check $n = 4$ fails: the expression is $x^2 + 6x + 5 = (x + 1)(x + 5)$, negative between its roots — the witness $x = -3$ gives $9 - 18 + 5 = -4 < 0$.',
      '∴ The least natural n is 5.,'
    ] },

    { kind: 'heading', text: 'Max and Min at Work: Optimization' },
    { kind: 'para', text: 'The word problems of this ground are all one move: name a quantity, express it as a quadratic in one variable, locate the vertex — and the maxima and minima the syllabus prices follow in the same breath. The square term then does the arguing — it can only push the expression one way, and it pushes hardest (in the extreme direction) exactly at the vertex. No calculus appears, none is needed; this is the max/min machinery the syllabus prices BEFORE the derivative exists, and chapter 4\'s AM–GM will re-derive some of it from a second, independent engine.' },
    { kind: 'example', title: 'A 24-metre fence encloses a rectangle. Find the greatest area it can enclose', steps: [
      'Name the width $x$; the perimeter fixes the length at $12 - x$. The area is $A(x) = x(12 - x) = 12x - x^2$.',
      'Complete the square: $A(x) = -(x^2 - 12x) = -\\left[(x - 6)^2 - 36\\right] = 36 - (x - 6)^2$.',
      'The square is $\\geq 0$, so $A(x) \\leq 36$, attained exactly when $x = 6$ — the rectangle is a square.',
      'The discriminant read agrees: $a = -1$, $D = 144$, $-\\frac{D}{4a} = -\\frac{144}{-4} = 36$. And the pinned seats price the shape: $A(4) = 32$, $A(9) = 27$, $A(2) = A(10) = 20$ — the symmetry $x \\leftrightarrow 12 - x$ trades the sides and the vertex picks the winner.',
      '∴ Greatest area 36 m², achieved by the 6 × 6 square.,'
    ] },
    { kind: 'figure', caption: 'The fence exhibit drawn. Left: the area parabola $A(x) = x(12 - x)$ with its vertex $(6, 36)$ and the pinned seats $A(4) = 32$, $A(9) = 27$; the dashed drop marks how far any off-vertex width falls below the peak. Right: the three sample rectangles at one scale — 4 × 8 gives 32 m², the highlighted 6 × 6 square gives 36 m², 9 × 3 gives 27 m². The vertex IS the best rectangle: among all rectangles of a fixed perimeter, the square maximizes the area, and the completed square is the proof.', svg: fenceAreaSvg() },
    { kind: 'example', title: 'Two numbers have sum 20. Find their greatest possible product', steps: [
      'Let the numbers be $x$ and $20 - x$; the product is $P(x) = x(20 - x) = 100 - (x - 10)^2$.',
      'The square is $\\geq 0$, so $P(x) \\leq 100$, attained at $x = 10$ — the two numbers are equal.',
      'Witnesses price the shape: $P(6) = 84$ and $P(15) = 75$ both sit below the peak; the same equality condition will return in chapter 4 as the AM–GM inequality\'s two-number case.',
      '∴ Greatest product 100, at the equal pair 10 and 10.,'
    ] },
    { kind: 'example', title: 'f(x) = a − (x − 1)² − 2 and g(x) = (x − a)² + 11 − a − a². Find the largest natural number a for which the maximum of f is smaller than the minimum of g', steps: [
      'The extremes are vertex reads: $\\max f = a - 2$ (at $x = 1$, where the downward square vanishes) and $\\min g = 11 - a - a^2$ (at $x = a$, where the upward square vanishes).',
      'The demand $\\max f < \\min g$ reads $a - 2 < 11 - a - a^2$, that is $a^2 + 2a - 13 < 0$.',
      'The boundary roots are $a = -1 \\pm \\sqrt{14}$, so the condition holds exactly for $a \\in \\left(-1 - \\sqrt{14},\\ -1 + \\sqrt{14}\\right) \\approx (-4.742,\\ 2.742)$.',
      'The natural numbers in the gap are 1 and 2 — the largest is $a = 2$. Verify both ends: at $a = 2$, $\\max f = 0 < 5 = \\min g$; at $a = 3$, $\\max f = 1 \\geq -1 = \\min g$, the gap has closed.',
      '∴ The largest natural a is 2.,'
    ] },

    { kind: 'heading', text: 'Rebuilding the Expression from the Vertex' },
    { kind: 'para', text: 'The vertex form $f(x) = a(x - h)^2 + k$ makes the reconstruction questions almost visual: the vertex hands over $(h, k)$ directly, one further value prices $a$, and the expansion finishes the job. This is the exam\'s favourite "find the quadratic" format, and the completed form is the honest route — no simultaneous-equation grind, one unknown.' },
    { kind: 'example', title: 'A quadratic has vertex (−1, 4) and passes through (1, 2). Find it, and give its range', steps: [
      'Vertex form: $f(x) = a(x + 1)^2 + 4$ — the vertex $(h, k) = (-1, 4)$ is already installed.',
      'Price $a$ at the given seat: $f(1) = a \\cdot 4 + 4 = 2$, so $4a = -2$ and $a = -\\frac{1}{2}$.',
      'Thus, $f(x) = -\\frac{1}{2}(x + 1)^2 + 4 = -\\frac{x^2}{2} - x + \\frac{7}{2}$ — expand to check: $-\\frac{1}{2}(x^2 + 2x + 1) + 4 = -\\frac{x^2}{2} - x - \\frac{1}{2} + 4$. ✓',
      'The range law with $a = -\\frac{1}{2} < 0$: the expression peaks at the vertex, so the range is $(-\\infty, 4]$ — the maximum 4 is attained at $x = -1$ and nothing larger ever occurs.',
      '∴ f(x) = −½(x + 1)² + 4 = −x²/2 − x + 7/2, with range (−∞, 4].,'
    ] },

    { kind: 'heading', text: 'The Discriminant-Range Method' },
    { kind: 'para', text: 'Some range questions hide the quadratic inside a FRACTION, where completing one square is not available. The method that unlocks them is a change of question: to find the values $y$ taken by an expression in $x$, write the equation expression $= y$ and ask for which $y$ it has a REAL solution $x$. A quadratic in $x$ has real solutions exactly when its discriminant is $\\geq 0$ — so the range falls out of $D_y \\geq 0$, a quadratic inequality in $y$ that lesson 2.2 will solve systematically and that the case table above already solves informally.' },
    { kind: 'callout', tone: 'insight', title: 'The licence and its check', text: 'The method needs the equation expression $= y$ to be genuinely equivalent to "$y$ is a taken value". Two checks keep it honest: the denominator must never vanish on the domain (an always-positive or always-negative denominator — itself an always-sign-law verdict), and the endpoints of the $D_y \\geq 0$ interval must be ATTAINED — when a coefficient of $x^2$ vanishes at an endpoint the equation degenerates, and only a direct substitution settles whether that endpoint survives.' },
    { kind: 'example', title: 'Show that x + 1/x ≥ 2 for every positive real x, and find where equality holds', steps: [
      'Set $y = x + \\frac{1}{x}$ and clear the denominator (legal — $x > 0$ never vanishes): $yx = x^2 + 1$, that is $x^2 - yx + 1 = 0$.',
      'This quadratic in $x$ has a real solution exactly when $D = y^2 - 4 \\geq 0$, that is $|y| \\geq 2$.',
      'For $x > 0$ the value $y = x + \\frac{1}{x}$ is itself positive, so the branch $y \\geq 2$ is the honest one: every positive $x$ produces $y \\geq 2$.',
      'Equality: $y = 2$ makes $D = 0$, the double root $x = \\frac{y}{2} = 1$ — and indeed $1 + \\frac{1}{1} = 2$. For $x < 0$ the same argument reads $y \\leq -2$, the mirrored branch.',
      'The verifier\'s witnesses agree: $2 + \\frac{1}{2} = 2.5$ and $5 + \\frac{1}{5} = 5.2$ both clear the bound, and $y = \\frac{3}{2}$ ($D = \\frac{9}{4} - 4 < 0$) is attained by no real $x$. Chapter 4 will re-derive this bound from the arithmetic–geometric mean inequality — a second engine for the same truth.',
      '∴ x + 1/x ≥ 2 for x > 0, with equality exactly at x = 1.,'
    ] },
    { kind: 'example', title: 'Find the range of f(x) = (2x² + 3x + 6)/(x² + x + 1)', steps: [
      'The denominator is safe: $x^2 + x + 1$ has $D = 1 - 4 = -3 < 0$ with positive leading coefficient — positive at every seat, so division is legal and no value is excluded.',
      'Set $y = f(x)$ and clear: $y(x^2 + x + 1) = 2x^2 + 3x + 6$, that is $(2 - y)x^2 + (3 - y)x + (6 - y) = 0$.',
      'Real $x$ demands $D_y = (3 - y)^2 - 4(2 - y)(6 - y) \\geq 0$. Expand: $9 - 6y + y^2 - 4(12 - 8y + y^2) = -3y^2 + 26y - 39 \\geq 0$.',
      'Solve the boundary quadratic $3y^2 - 26y + 39 = 0$: $y = \\frac{26 \\pm \\sqrt{676 - 468}}{6} = \\frac{26 \\pm \\sqrt{208}}{6} = \\frac{13 \\pm 2\\sqrt{13}}{3}$, so the candidate interval is $\\left[\\frac{13 - 2\\sqrt{13}}{3},\\ \\frac{13 + 2\\sqrt{13}}{3}\\right] \\approx [1.930,\\ 6.737]$.',
      'Attainment: throughout the open interval the equation in $x$ is a genuine quadratic with $D_y > 0$ — both endpoints have $D_y = 0$, each attained at its double root $x = -\\frac{3 - y}{2(2 - y)}$ (numerically $x \\approx -7.606$ for the minimum and $x \\approx -0.394$ for the maximum). The special value $y = 2$ degenerates the equation to the LINEAR $x + 4 = 0$ — and $x = -4$ works: $f(-4) = \\frac{26}{13} = 2$. Every point of the interval is taken; the range is exactly $\\left[\\frac{13 - 2\\sqrt{13}}{3},\\ \\frac{13 + 2\\sqrt{13}}{3}\\right]$.',
      'The verifier\'s fine sweep over $[-15, 15]$ agrees to four decimals, and the witnesses $f(0) = 6$, $f(1) = \\frac{11}{3}$, $f(-1) = 5$ all sit inside.',
      '∴ Range = [(13 − 2√13)/3, (13 + 2√13)/3] ≈ [1.930, 6.737].,'
    ] },
    { kind: 'example', title: 'The equation x² + 4y² − 6x + 5 = 0 is satisfied by real x and y. Show that x lies between 1 and 5 and y between −1 and 1', steps: [
      'View the equation as a quadratic in $x$: $x^2 - 6x + (4y^2 + 5) = 0$. Real $x$ demands $D = 36 - 4(4y^2 + 5) = 16 - 16y^2 \\geq 0$, so $y^2 \\leq 1$ and $-1 \\leq y \\leq 1$.',
      'View it as a quadratic in $y$: $4y^2 + (x^2 - 6x + 5) = 0$ demands $-(x^2 - 6x + 5) \\geq 0$, that is $(x - 1)(x - 5) \\leq 0$ — hence $1 \\leq x \\leq 5$.',
      'All four bounds are ATTAINED: $(3, 1)$ and $(3, -1)$ satisfy $9 + 4 - 18 + 5 = 0$; $(1, 0)$ and $(5, 0)$ satisfy $1 - 6 + 5 = 0$ and $25 - 30 + 5 = 0$. No bound is a phantom.',
      'The method generalizes: any mixed quadratic constraint can be interrogated one variable at a time, each interrogation a discriminant condition on the other.',
      '∴ 1 ≤ x ≤ 5 and −1 ≤ y ≤ 1, every bound attained.,'
    ] },

    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'The JEE Main algebra unit names this ground verbatim — quadratic expressions and their extrema, the discriminant\'s role in ranges, and "conditions for a quadratic to be always positive". Expect four question families: the least/greatest value of a quadratic or a rational quadratic expression (the $D_y \\geq 0$ method), the parameter hunt "find $k$ so the expression is positive for all real $x$" (the conjunctive law, with the $D = 0$ boundary settled by the strictness of the demand), the vertex-given reconstruction, and the word problem family (fence/area, number pairs, the two-family gap) — across JEE Main/Advanced, CUET and the state CETs, in single-correct and numerical-value formats alike. The EXAM_REGISTRY maps the shelf\'s coverage.' },
    { kind: 'callout', tone: 'historical', title: 'The square is older than the symbol', text: 'Completing the square is al-Khwārizmī\'s own move — his c. 825 CE algebra text solves $x^2 + 10x = 39$ by LITERALLY completing a geometric square, adding the $25$ L-shaped gnomon to the $x \\times (x + 10)$ rectangle. The vertex form is his diagram with the geometry stripped away: the expression $a(x + \\frac{b}{2a})^2 - \\frac{D}{4a}$ says in symbols what his figure showed in areas — every quadratic hides a perfect square, and finding it prices the extreme. The optimization reading had to wait for the calculus; the completion never did.' },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The vertex of the parabola y = x² − 4x + 7 is', options: ['(−2, 3)', '(2, 3)', '(2, −3)', '(4, 7)'], answer: 1, explain: '$-\\frac{b}{2a} = \\frac{4}{2} = 2$ and $D = 16 - 28 = -12$ so $-\\frac{D}{4a} = 3$ — or complete the square: $(x - 2)^2 + 3$. (−2, 3) flips the axis seat; (2, −3) flips the extreme\'s sign; (4, 7) is the shoulder seat $f(4)$, not the vertex.' },
      { q: 'For a quadratic with a < 0, the range is', options: ['[−D/4a, ∞)', '(−∞, −D/4a]', '(−∞, ∞)', 'decided by the roots, not by the sign of a'], answer: 1, explain: 'A downward opening caps the values at the vertex: the range is everything AT OR BELOW $-\\frac{D}{4a}$ — e.g. $-x^2 + 6x - 5$ peaks at $-\\frac{16}{-4} = 4$. The upward bracket is the $a > 0$ law; all of $\\mathbb{R}$ belongs to no quadratic; the last option denies the completed form.' },
      { q: 'x² + kx + 16 > 0 for every real x exactly when', options: ['|k| > 8', '|k| ≥ 8', '|k| < 8', 'no such k exists'], answer: 2, explain: 'The always-sign law demands $a > 0$ (true here) AND $D = k^2 - 64 < 0$, that is $|k| < 8$. The strict demand excludes the touching boundary $k = \\pm 8$ (there $f$ reaches $0$); $|k| > 8$ is the sign-reversed read.' },
      { q: 'The largest natural number a for which max(a − (x−1)² − 2) < min((x−a)² + 11 − a − a²) is', options: ['1', '2', '3', 'no natural number works'], answer: 1, explain: '$\\max f = a - 2$ and $\\min g = 11 - a - a^2$; the demand reads $a^2 + 2a - 13 < 0$, true exactly for $a \\in (-1-\\sqrt{14},\\ -1+\\sqrt{14}) \\approx (-4.742, 2.742)$ — naturals 1 and 2 qualify, 3 fails ($1 \\geq -1$).' },
      { q: 'The range of f(x) = (2x² + 3x + 6)/(x² + x + 1) is', options: ['all of ℝ', '[2, 6]', '[(13 − 2√13)/3, (13 + 2√13)/3]', '[1, 4]'], answer: 2, explain: 'The denominator is always positive ($D = -3$); clearing and demanding real $x$ gives $-3y^2 + 26y - 39 \\geq 0$, whose boundary roots are $\\frac{13 \\pm 2\\sqrt{13}}{3} \\approx 1.930,\\ 6.737$. [2, 6] is a plausible impostor — 2 IS in the range ($f(-4) = 2$) but is not an endpoint.' },
    ] },

    { kind: 'exercises', title: 'Exercises 2.1', sets: [
      { level: 'L1', questions: [
        { q: 'Complete the square for x² + 6x + 5, and state its vertex and minimum value.', solution: [
          'Half the middle coefficient: $\\left(\\frac{6}{2}\\right)^2 = 9$. Add and subtract: $x^2 + 6x + 5 = (x + 3)^2 - 9 + 5 = (x + 3)^2 - 4$.',
          'Read the vertex: $(-3, -4)$ — the squared term vanishes at $x = -3$ and the constant rides there.',
          'A square is never negative, so $(x + 3)^2 - 4 \\geq -4$ with equality at $x = -3$: the minimum is $-4$, attained.',
          'The discriminant read agrees: $D = 36 - 20 = 16$ and $-\\frac{D}{4a} = -\\frac{16}{4} = -4$.',
        ], answer: '(x + 3)² − 4; vertex (−3, −4); minimum −4 at x = −3.' },
        { q: 'Find the range of f(x) = x² − 8x + 15.', solution: [
          '$D = 64 - 60 = 4$ and $a = 1 > 0$: the range law gives $\\left[-\\frac{D}{4a}, \\infty\\right) = [-1, \\infty)$.',
          'The completed form confirms: $f(x) = (x - 4)^2 - 1 \\geq -1$, attained at $x = 4$.',
          'Cross-check with the roots 3 and 5: the vertex sits at their midpoint 4, one unit below the axis — the dip is real.',
        ], answer: 'Range [−1, ∞), minimum −1 at x = 4.' },
        { q: 'Find the maximum value of g(x) = −x² + 4x + 1 and where it occurs.', solution: [
          'Complete the square: $g(x) = -(x^2 - 4x) + 1 = -\\left[(x - 2)^2 - 4\\right] + 1 = 5 - (x - 2)^2$.',
          'The square is $\\geq 0$, so $g(x) \\leq 5$, attained exactly at $x = 2$.',
          'The discriminant read: $D = 16 + 4 = 20$, $-\\frac{D}{4a} = -\\frac{20}{-4} = 5$. Both engines agree.',
        ], answer: 'Maximum 5 at x = 2.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Is x² + 6x + 11 positive for every real x? Justify with the always-sign law.', solution: [
          'The law demands both halves: $a = 1 > 0$ ✓, and $D = 36 - 44 = -8 < 0$ ✓.',
          'The conjunction holds, so $f(x) > 0$ at every seat — the completed form $f(x) = (x + 3)^2 + 2$ shows why: even at its lowest the expression stands 2 above the axis.',
          'The verifier\'s sweep agrees; note the minimum is 2, NOT 11 or −8 — the discriminant prices the dip, the constant term does not.',
        ], answer: 'Yes — a > 0 and D = −8 < 0; minimum 2 at x = −3.' },
        { q: 'A 40-metre fence encloses a rectangle. Find the greatest possible area.', solution: [
          'Width $x$, length $20 - x$; area $A(x) = x(20 - x) = 100 - (x - 10)^2$.',
          'The square is $\\geq 0$, so $A(x) \\leq 100$, attained at $x = 10$.',
          'The winner is again the square, $10 \\times 10$ — for any fixed perimeter the square maximizes area, and the vertex is the proof.',
        ], answer: '100 m², achieved by the 10 × 10 square.' },
        { q: 'A quadratic has vertex (2, −3) and passes through (0, 1). Find it.', solution: [
          'Vertex form: $f(x) = a(x - 2)^2 - 3$ — the vertex installs itself.',
          'Price $a$ at $(0, 1)$: $a \\cdot 4 - 3 = 1$, so $a = 1$.',
          'Thus, $f(x) = (x - 2)^2 - 3 = x^2 - 4x + 1$. Check: $f(0) = 1$ ✓ and the vertex read $f(2) = -3$ ✓.',
        ], answer: 'f(x) = (x − 2)² − 3 = x² − 4x + 1.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the least value of 3x² + 6x + 11.', solution: [
          'Complete the square with the leading coefficient OUT: $3x^2 + 6x + 11 = 3\\left[(x + 1)^2 - 1\\right] + 11 = 3(x + 1)^2 + 8$.',
          'The square is $\\geq 0$, so the expression is $\\geq 8$, attained at $x = -1$.',
          'Discriminant check: $D = 36 - 132 = -96$ and $-\\frac{D}{4a} = \\frac{96}{12} = 8$. ✓',
        ], answer: 'Least value 8, at x = −1.' },
        { q: 'The quadratic x² − 6x + k has minimum value −2. Find k and the range of the expression.', solution: [
          'The minimum of $x^2 - 6x + k$ is $k - 9$ (complete the square: $(x - 3)^2 + k - 9$).',
          'Set $k - 9 = -2$: $k = 7$. The expression is $x^2 - 6x + 7$ with range $[-2, \\infty)$.',
          'Verify: at $x = 3$, $9 - 18 + 7 = -2$ ✓; the discriminant $D = 36 - 28 = 8$ gives $-\\frac{8}{4} = -2$ ✓.',
        ], answer: 'k = 7; range [−2, ∞).', },
        { q: 'Two numbers differ by 6. Find their least possible product.', solution: [
          'Let the numbers be $x$ and $x + 6$; the product is $P(x) = x^2 + 6x = (x + 3)^2 - 9$.',
          'The square is $\\geq 0$, so $P(x) \\geq -9$, attained at $x = -3$ — the pair is $-3$ and $3$.',
          'Note the honest shape: a product can be NEGATIVE when the numbers straddle zero, and its least value sits at the symmetric pair. The maximum does not exist (the parabola opens upward — it climbs without bound).',
        ], answer: 'Least product −9, at the pair −3 and 3.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the range of f(x) = (x + 2)/(x² + 3x + 3).', solution: [
          'The denominator is safe: $x^2 + 3x + 3$ has $D = 9 - 12 = -3 < 0$ with $a = 1 > 0$ — positive everywhere (the always-sign law).',
          'Set $y = f(x)$ and clear: $y(x^2 + 3x + 3) = x + 2$, that is $yx^2 + (3y - 1)x + (3y - 2) = 0$.',
          'Real $x$ demands $D_y = (3y - 1)^2 - 4y(3y - 2) \\geq 0$: expand to $-3y^2 + 2y + 1 \\geq 0$, that is $3y^2 - 2y - 1 \\leq 0$, that is $(3y + 1)(y - 1) \\leq 0$. The quadratic in $y$ opens upward, so the product is non-positive BETWEEN its roots: $-\\frac{1}{3} \\leq y \\leq 1$.',
          'Attainment: $y = 1$ gives $(x + 1)^2 = 0$, so $x = -1$ works ($f(-1) = \\frac{1}{1} = 1$); $y = -\\frac{1}{3}$ gives $x^2 + 6x + 9 = 0$, so $x = -3$ works ($f(-3) = \\frac{-1}{3}$). The range is exactly $\\left[-\\frac{1}{3},\\ 1\\right]$ — the verifier\'s fine sweep agrees.',
        ], answer: 'Range [−1/3, 1], both endpoints attained.' },
        { q: 'For which m is x² + 4x + m never negative?', solution: [
          '"Never negative" means $f(x) \\geq 0$ for all real $x$ — the always-sign law with the NON-strict demand.',
          'The law: $a = 1 > 0$ ✓ and $D = 16 - 4m \\leq 0$, that is $m \\geq 4$.',
          'The boundary $m = 4$ is INCLUDED: the expression $(x + 2)^2$ touches zero at $x = -2$ but never goes below — the touching case satisfies "never negative" while failing "always positive". The strictness of the demand settles the endpoint.',
        ], answer: 'm ≥ 4.' },
        { q: 'Find the largest natural number a for which max f < min g, where f(x) = a − (x − 1)² − 2 and g(x) = (x − a)² + 11 − a − a².', solution: [
          'Vertex reads: $\\max f = a - 2$ at $x = 1$; $\\min g = 11 - a - a^2$ at $x = a$.',
          'The demand $a - 2 < 11 - a - a^2$ rearranges to $a^2 + 2a - 13 < 0$.',
          'Roots $-1 \\pm \\sqrt{14}$: the condition holds for $a \\in \\left(-1 - \\sqrt{14},\\ -1 + \\sqrt{14}\\right) \\approx (-4.742, 2.742)$.',
          'Naturals 1 and 2 qualify ($a = 2$: $0 < 5$ ✓); $a = 3$ fails ($1 \\geq -1$). The largest is $a = 2$ — the verifier\'s census over the naturals agrees.',
        ], answer: 'a = 2.' },
      ] },
      { level: 'L5', questions: [
        { q: 'Real numbers x and y satisfy x² + 4y² − 6x + 5 = 0. Find the exact interval of possible x values and of possible y values.', solution: [
          'As a quadratic in $x$: $x^2 - 6x + (4y^2 + 5) = 0$ needs $D = 36 - 4(4y^2 + 5) = 16 - 16y^2 \\geq 0$, so $y^2 \\leq 1$: $y \\in [-1, 1]$.',
          'As a quadratic in $y$: $4y^2 = -(x^2 - 6x + 5)$ needs the right side $\\geq 0$: $(x - 1)(x - 5) \\leq 0$, so $x \\in [1, 5]$.',
          'Attainment witnesses: $(3, \\pm 1)$ for the $y$-bounds, $(1, 0)$ and $(5, 0)$ for the $x$-bounds — all four are honest seats on the curve, none is a phantom bound.',
        ], answer: 'x ∈ [1, 5] and y ∈ [−1, 1].' },
        { q: 'Find the least natural number n for which (n − 3)x² + 6x + (n + 1) > 0 for every real x.', solution: [
          'The strict always-sign law: $n - 3 > 0$ AND $D = 36 - 4(n - 3)(n + 1) < 0$.',
          'The discriminant expands to $-4n^2 + 8n + 48$; the demand reads $n^2 - 2n - 12 > 0$, true for $n > 1 + \\sqrt{13} \\approx 4.606$.',
          'So $n \\geq 5$. Check $n = 5$: $2x^2 + 6x + 6 = 2(x^2 + 3x + 3)$, inner $D = -3 < 0$ — positive everywhere. Check $n = 4$ fails: $x^2 + 6x + 5 = (x + 1)(x + 5)$ is negative between its roots (witness $x = -3$: $-4$).',
        ], answer: 'The least natural n is 5.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Find every real m for which x² + mx + 3 is negative for at least one POSITIVE x.', solution: [
          'Note $f(0) = 3 > 0$ always — the expression starts positive at the origin, so "negative somewhere positive" needs the graph to CROSS the positive x-axis: a positive root.',
          'Crossing demands $D = m^2 - 12 > 0$: $|m| > 2\\sqrt{3} \\approx 3.464$.',
          'The larger root is $\\frac{-m + \\sqrt{m^2 - 12}}{2}$. It is positive exactly when $\\sqrt{m^2 - 12} > m$, which forces $m < 0$ (for $m > 0$ the square-root term is smaller than $m$ and the root is negative; for $m < 0$ it is automatic).',
          'Combine: $m < -2\\sqrt{3}$. Witnesses: $m = -4$ gives roots 1 and 3 with $f(2) = -1 < 0$ ✓; $m = -3.4$ has $D = 11.56 - 12 < 0$ (never negative) ✗; $m = +4$ has roots $-1$ and $-3$, both negative — $f(1) = 8 > 0$ ✗. The verifier\'s census agrees.',
        ], answer: 'm < −2√3 ≈ −3.464.' },
      ] },
    ] },

    { kind: 'formula', name: 'The completion identity', latex: 'ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}, \\qquad D = b^2 - 4ac', note: 'the whole lesson in one line — every range, vertex and sign verdict is a reading of it' },
    { kind: 'formula', name: 'Vertex and axis', latex: '\\text{vertex } \\left(-\\frac{b}{2a},\\ -\\frac{D}{4a}\\right), \\qquad \\text{axis } x = -\\frac{b}{2a}', note: 'the squared term vanishes exactly there; AL 10.3\'s symmetry made algebraic' },
    { kind: 'formula', name: 'The range law', latex: 'a > 0 \\Rightarrow \\text{range } \\left[-\\frac{D}{4a}, \\infty\\right); \\qquad a < 0 \\Rightarrow \\text{range } \\left(-\\infty, -\\frac{D}{4a}\\right]', note: 'the sign of a alone decides floor or ceiling; the extreme is always attained' },
    { kind: 'formula', name: 'The always-sign law', latex: 'f \\geq 0\\ \\forall x \\iff a > 0 \\text{ and } D \\leq 0; \\qquad f \\leq 0\\ \\forall x \\iff a < 0 \\text{ and } D \\leq 0', note: 'the conjunction — opening buys the side, discriminant buys the (non-)crossing' },
    { kind: 'formula', name: 'The discriminant-range method', latex: 'y = \\frac{P(x)}{Q(x)} \\text{ real-taken} \\iff D_y \\geq 0 \\text{ (with } Q \\neq 0 \\text{ and endpoints attained)}', note: 'demand a real solution x; check the denominator and the degenerate endpoints' },
  ],
}

/* ------------------------------------------------------------------ */
/* chapter assembly                                                    */
/* ------------------------------------------------------------------ */

const lesson22: Lesson = {
  id: 'aa-quadratic-inequalities-and-the-sign-diagram',
  number: '2.2',
  title: 'Quadratic Inequalities and the Sign Diagram',
  concepts: [
    'the zero of an expression equals the root of the equation equals the x-intercept of the graph',
    'the between-roots law: outside positive, between negative (a > 0)',
    'the four-step sign-diagram recipe and its three special answers',
    'the domain check: radicands and denominators before any squaring',
    'the four-condition location system for pinning both roots inside an interval',
    'the one-sign-change condition: exactly one root in (k₁, k₂)',
    'the interleaving lemma: a real root for every μ, λ',
  ],
  objectives: [
    'solve any quadratic inequality in seconds with the sign ladder, strict and non-strict alike',
    'state the three special answers (all ℝ, one excluded seat, the empty set) for the D < 0 and D = 0 families',
    'run the domain check before solving radical or fractional equations and census the extraneous seats',
    'decide both-roots-inside, interval-inside, exactly-one and opposite-sign questions with the honest condition sets',
    'prove and apply the interleaving lemma with the four-value sign bracket',
  ],
  prerequisites: ['al-solving-linear-inequalities', 'al-the-parabola-quadratic-graphs-and-vertices', 'aa-vertex-form-at-work-maxima-and-minima'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'ncert-math10-ch4-quadratic', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'AL 7 solved linear inequalities by moving seats on the number line, and its ch. 9–10 work drew parabolas and read their vertices; lesson 2.1 turned the quadratic into an expression whose extreme values and six sign cases were priced from the completed form. This lesson cashes all of that into the fastest tool in the chapter: the SIGN DIAGRAM. The question "where is $ax^2 + bx + c$ positive?" stops being an algebra problem and becomes a two-second read off a marked line. Then the lesson crosses the bridge the examination actually examines most: the LOCATION of the roots — not where the expression is positive, but which regions of the line the doors (roots) themselves occupy relative to a chosen interval. The plan: first the zeros of an expression and their graphical meaning, then the sign diagram with its special answers, then the domain discipline that radical and fractional equations demand, then the four-condition location system with its honest shortcuts, and finally the interleaving lemma — the cleanest sign-bracket argument on the shelf.' },

    { kind: 'heading', text: 'Graphical Interpretation of the Zero of an Expression' },
    { kind: 'para', text: 'Everything in this lesson hangs on one small vocabulary split. The EQUATION $f(x) = 0$ asks for the seats where $f$ vanishes; the EXPRESSION $f(x)$ itself asks where it is positive and where negative. The seats where the expression vanishes are its zeros, and the graph ties the two questions together: a zero of the expression is exactly an $x$-intercept of the parabola. This is why 2.1\'s vertex work and AL 10.3\'s graph work pay off here — the same curve that priced a minimum also fences the sign.' },
    { kind: 'callout', tone: 'definition', title: 'Zero of an expression', text: 'A real number $z$ is said to be a ZERO of the expression $f(x)$ if $f(z) = 0$. When $f$ is regarded as the function $y = f(x)$, the zeros are exactly the $x$-coordinates of the points where the graph meets the $x$-axis. Thus, zeros of the expression, roots of the equation $f(x) = 0$, and $x$-intercepts of the parabola are one census read three ways: $f(z) = 0 \\Leftrightarrow (z, 0)$ lies on the graph $y = f(x)$.' },
    { kind: 'para', text: 'The graphical picture decides the sign question the moment the zeros are known. An upward parabola with two distinct zeros $\\alpha < \\beta$ meets the axis at exactly those two seats; between them it must dip below, and outside them it rides above. That is a theorem, not a picture habit, and it deserves its derivation.' },
    { kind: 'derivation', title: 'The between-roots sign theorem', statement: 'Let $f(x) = ax^2 + bx + c$ with $a > 0$ and two distinct real zeros $\\alpha < \\beta$ (so $D > 0$). Then $f(x) < 0$ exactly for $\\alpha < x < \\beta$, and $f(x) > 0$ exactly for $x < \\alpha$ or $x > \\beta$.', steps: [
      { label: 'Start from the completed form', formula: 'f(x) = a\\left[\\left(x + \\dfrac{b}{2a}\\right)^2 - \\dfrac{D}{4a^2}\\right]', explanation: 'The completion identity 2.1 derived; the squared term vanishes exactly at the axis seat $h = -\\frac{b}{2a}$.' },
      { label: 'Name the half-gap', formula: 'h = -\\dfrac{b}{2a}, \\qquad s = \\dfrac{\\sqrt{D}}{2a}', explanation: 'Since $D > 0$ the square root is real, and the two zeros sit symmetrically about $h$: $\\alpha = h - s$ and $\\beta = h + s$.' },
      { label: 'Refactor around the zeros', formula: 'f(x) = a\\left[(x - h)^2 - s^2\\right] = a(x - h - s)(x - h + s) = a(x - \\alpha)(x - \\beta)', explanation: 'A difference of squares factors; the completed form becomes the factored form with named doors.' },
      { label: 'Read the sign by the product', formula: 'f(x) = a\\,(x - \\alpha)(x - \\beta)', explanation: 'For $\\alpha < x < \\beta$ the factor $(x - \\alpha)$ is positive while $(x - \\beta)$ is negative, so the product is negative and multiplying by $a > 0$ keeps it negative. For $x < \\alpha$ both factors are negative, and for $x > \\beta$ both are positive — the product is positive in both outer bands.' },
    ], result: 'Thus, between its two zeros an upward parabola lies below the axis and outside them above: $f < 0 \\Leftrightarrow \\alpha < x < \\beta$ and $f > 0 \\Leftrightarrow x < \\alpha$ or $x > \\beta$.' },
    { kind: 'callout', tone: 'theorem', title: 'The between-roots law (a > 0)', text: 'For $a > 0$ and distinct real zeros $\\alpha < \\beta$: $(x - \\alpha)(x - \\beta) < 0 \\Leftrightarrow \\alpha < x < \\beta$, and $(x - \\alpha)(x - \\beta) > 0 \\Leftrightarrow x < \\alpha$ or $x > \\beta$. Outside positive, between negative. For $a < 0$ every verdict flips — which is why the flip discipline of the next section insists on multiplying through by $-1$ first.' },
    { kind: 'example', title: 'Read the zeros and the sign of f(x) = x² − 7x + 10 from its graph', steps: [
      'Zeros: $x^2 - 7x + 10 = (x - 2)(x - 5)$ vanishes at $x = 2$ and $x = 5$; the discriminant $D = 49 - 40 = 9 > 0$ certifies two distinct doors.',
      'Graphically the parabola meets the $x$-axis exactly at $(2, 0)$ and $(5, 0)$ and nowhere else.',
      'Between the doors the completed form $f(x) = (x - 3.5)^2 - 2.25$ dips below the axis: $f(3.5) = -2.25$ is the lowest seat.',
      'Outside the doors the expression is positive: $f(0) = 10$ and $f(7) = 10$ are the nearest integer witnesses.',
      'Hence, the three-region census is settled by two zeros and one test seat — the graph does the rest.',
    ] },
    { kind: 'para', text: 'For a downward opening the same curve, flipped, reverses every verdict: $-x^2 + 2x + 3$ has zeros $-1$ and $3$ and is POSITIVE between them, negative outside. Rather than memorizing a second law, the discipline of the next section normalizes every inequality to $a > 0$ before any ladder is drawn.' },

    { kind: 'heading', text: 'The Sign Diagram' },
    { kind: 'para', text: 'The sign diagram (examination books call it the sign chart or the wavy-curve method for its higher-degree generalizations) rests on one honest observation: a parabola can cross the axis only at a zero, so between consecutive zeros it stays on one side. The sign can therefore change ONLY at the zeros — two fences for a quadratic — and one test seat per region settles the whole line. The recipe is four moves long.' },
    { kind: 'list', ordered: true, items: [
      'Standard form — move every term to one side so the inequality reads $ax^2 + bx + c > 0$ (or $\\geq$, $<$, $\\leq$) with the other side $0$.',
      'Real zeros — factor or use the formula; if $D < 0$ stop early, the whole-line verdicts below apply.',
      'The sign ladder — mark the zeros on the line; for $a > 0$ write $+, -, +$ left to right (the between-roots law), or test one seat per region.',
      'The union answer — collect the regions the inequality claims; strict inequalities leave the zeros out, non-strict ones take them in.',
    ] },
    { kind: 'example', title: 'Solve (x − 2)(x − 5) > 0 by the sign diagram', steps: [
      'The expression already sits in standard form with $a = 1 > 0$, and the zeros are the fence posts $x = 2$ and $x = 5$.',
      'Now, the ladder: an upward parabola is above the axis outside its root pair, so the sign bands run $+$, $-$, $+$ from left to right.',
      'The strict inequality $> 0$ claims the two positive bands and leaves the doors themselves out — there the value is $0$, not positive.',
      'Witnesses: $f(0) = 10 > 0$, $f(3.5) = -2.25 < 0$, $f(7) = 10 > 0$, exactly as the ladder promised.',
      'Hence, the solution set is $x < 2$ or $x > 5$.',
    ] },
    { kind: 'figure', caption: 'The sign diagram of x² − 7x + 10 = (x − 2)(x − 5): the parabola meets the axis at the fenced zeros 2 and 5, dips negative between them, and the solution bands of the inequality p(x) > 0 shade the two outer rays.', svg: '<svg viewBox="0 0 720 340" role="img" aria-label="Sign diagram of x squared minus 7 x plus 10 with roots 2 and 5, sign band plus minus plus, solution rays shaded" xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="720" height="340" fill="#fffdf5"/><text x="360" y="22" text-anchor="middle" font-size="15" font-weight="bold" fill="#166534">the sign diagram of x² − 7x + 10 = (x − 2)(x − 5)</text><line x1="60" y1="198" x2="666" y2="198" stroke="#16a34a" stroke-width="2"/><path d="M 60 198 L 60 30" stroke="#16a34a" stroke-width="2"/><text x="70" y="40" font-size="13" fill="#0f766e">y</text><text x="652" y="216" font-size="13" fill="#0f766e">x</text><polyline points="20.6,53.6 40.3,74.0 60.0,93.0 79.7,110.7 99.4,127.1 119.1,142.2 138.8,156.0 158.4,168.5 178.1,179.6 197.8,189.5 217.5,198.0 237.2,205.2 256.9,211.1 276.6,215.7 296.2,219.0 315.9,221.0 335.6,221.6 355.3,221.0 375.0,219.0 394.7,215.7 414.4,211.1 434.1,205.2 453.8,198.0 473.4,189.5 493.1,179.6 512.8,168.5 532.5,156.0 552.2,142.2 571.9,127.1 591.6,110.7 611.2,93.0 630.9,74.0 650.6,53.6" fill="none" stroke="#0d9488" stroke-width="2.5"/><text x="92" y="42" font-size="13" fill="#0f766e">y = x² − 7x + 10</text><line x1="217.5" y1="198" x2="217.5" y2="255" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="453.75" y1="198" x2="453.75" y2="255" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3"/><circle cx="217.5" cy="198" r="5" fill="#fffdf5" stroke="#ea580c" stroke-width="2.5"/><circle cx="453.75" cy="198" r="5" fill="#fffdf5" stroke="#ea580c" stroke-width="2.5"/><circle cx="335.6" cy="221.6" r="4" fill="#0d9488"/><text x="335.6" y="238" text-anchor="middle" font-size="12" fill="#0f766e">vertex (3.5, −2.25)</text><text x="211.5" y="248" text-anchor="end" font-size="14" font-weight="bold" fill="#d97706">2</text><text x="459.75" y="248" text-anchor="start" font-size="14" font-weight="bold" fill="#d97706">5</text><rect x="60" y="255" width="157.5" height="30" fill="#ffedd5"/><rect x="217.5" y="255" width="236.25" height="30" fill="#fffdf5" stroke="#fcd34d" stroke-width="1"/><rect x="453.75" y="255" width="236.25" height="30" fill="#ffedd5"/><text x="138.75" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#166534">+</text><text x="335.6" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#dc2626">−</text><text x="571.9" y="276" text-anchor="middle" font-size="20" font-weight="bold" fill="#166534">+</text><circle cx="217.5" cy="255" r="4.5" fill="#fffdf5" stroke="#d97706" stroke-width="2"/><circle cx="453.75" cy="255" r="4.5" fill="#fffdf5" stroke="#d97706" stroke-width="2"/><text x="360" y="308" text-anchor="middle" font-size="14" fill="#166534" font-weight="bold">reads: x &lt; 2 or x &gt; 5 — the shaded rays; the open doors 2 and 5 stay out</text></svg>' },
    { kind: 'example', title: 'Solve −x² + 2x + 3 ≥ 0', steps: [
      'The leading coefficient is $-1 < 0$; multiply through by $-1$ and flip the inequality: $x^2 - 2x - 3 \\leq 0$.',
      'Factor: $(x + 1)(x - 3) \\leq 0$, doors at $-1$ and $3$.',
      'Between the doors the upward parabola $x^2 - 2x - 3$ is negative, and the non-strict inequality invites the doors in.',
      'Check at $x = 0$ in the original: $-0 + 0 + 3 = 3 \\geq 0$ — the middle band, as predicted.',
      'Hence, the solution set is $-1 \\leq x \\leq 3$.',
    ] },
    { kind: 'para', text: 'Two families end the recipe early, because their ladders have no fences to climb. When $D < 0$ the parabola never meets the axis, so one sign owns the whole line; when $D = 0$ the parabola touches at one seat and lifts off, and only that seat behaves differently.' },
    { kind: 'example', title: 'The three special verdicts', steps: [
      '(i) $(x - 3)^2 > 0$: the square touches zero only at $x = 3$, so every seat except $3$ qualifies — the answer is "$x \\neq 3$".',
      '(ii) $x^2 + x + 1 \\leq 0$: $D = 1 - 4 = -3 < 0$ with $a = 1 > 0$, so the expression is positive everywhere and never meets the axis — no solution.',
      '(iii) $-x^2 - x - 1 < 0$: the same inner quadratic negated — now negative everywhere, so every real seat qualifies.',
      'Thus, the $D < 0$ and $D = 0$ families answer in whole-line currency: all of $\\mathbb{R}$, one excluded seat, or the empty set, decided by the sign of $a$ and the strictness of the inequality.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The flip discipline', text: 'Multiplying an inequality by $-1$ flips the inequality sign AND reverses the parabola\'s opening — do both or neither. The classic ruin: from $-x^2 + 2x + 3 \\geq 0$ writing $x^2 - 2x - 3 \\geq 0$ and answering $x \\leq -1$ or $x \\geq 3$ — the complement of the true answer. And never divide by $a$ to "simplify": its sign is the whole trap. Dividing by $a^2$ is always safe; multiplying by $-1$ with the flip is the standard move.' },

    { kind: 'heading', text: 'The Domain of an Equation' },
    { kind: 'para', text: 'Solving an equation means finding the seats that satisfy it — but only the seats where every operation in the equation is even defined can be candidates. Checking that set first is the domain discipline, and it is not bureaucracy: it kills wrong candidates before they are born and catches the ones squaring creates. The two demands that matter for quadratics are the radicand and the denominator.' },
    { kind: 'callout', tone: 'definition', title: 'Domain of an equation', text: 'The DOMAIN of an equation in $x$ is the set of real numbers $x$ for which every operation appearing in the equation is defined. A real number solves the equation only if it lies in the domain AND satisfies it; candidates outside the domain are rejected before any algebra runs. Thus, the solution set of an equation is always a subset of its domain — the domain is the fence the search runs inside.' },
    { kind: 'para', text: 'For example, the quadratic inequality returns in two costumes:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) a square root $\\sqrt{\\text{quadratic}}$ demands the radicand $\\geq 0$ — a quadratic inequality in disguise, solved by the sign diagram;',
      '(ii) a denominator $\\frac{1}{\\text{quadratic}}$ demands the quadratic $\\neq 0$ — the zeros are barred, and everything else is legal;',
      '(iii) squaring both sides of an equation can admit seats the original never held — the census below catches them.',
    ] },
    { kind: 'example', title: 'Find the domain of g(x) = √(x² − 5x)', steps: [
      'The radical demands a non-negative radicand: $x^2 - 5x \\geq 0$.',
      'Factor: $x(x - 5) \\geq 0$ — doors at $0$ and $5$, upward opening.',
      'Ladder: the product is non-negative outside the pair and negative inside.',
      'Witness: at $x = 2$ the radicand is $2 \\cdot (-3) = -6$, and $\\sqrt{-6}$ is not real — the strip $(0, 5)$ is barred.',
      'Hence, the domain is $x \\leq 0$ or $x \\geq 5$.',
    ] },
    { kind: 'example', title: 'Solve √(x + 6) = x, with the extraneous-root census', steps: [
      'Domain pre-census: $x + 6 \\geq 0$ gives $x \\geq -6$, and because a square root is never negative the seat must also satisfy $x \\geq 0$.',
      'Square both sides: $x + 6 = x^2$, so $x^2 - x - 6 = 0$ and $(x - 3)(x + 2) = 0$ — the candidates are $3$ and $-2$.',
      'Census: $\\sqrt{3 + 6} = \\sqrt{9} = 3$ — the seat $x = 3$ survives.',
      'But, $\\sqrt{-2 + 6} = \\sqrt{4} = 2 \\neq -2$ — the seat $x = -2$ was created by the squaring and also fails the $x \\geq 0$ pre-census.',
      'Hence, $x = 3$ is the one and only solution — the census was not decoration: without it the answer would be wrong.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Extraneous roots are census failures', text: 'Squaring is a one-way door: $A = B$ forces $A^2 = B^2$, but $A^2 = B^2$ does not force $A = B$ — the seats with $A = -B$ sneak in. The census (substitute every candidate back into the ORIGINAL equation) is part of the solution, never an optional extra. AL\'s fractional-equations lesson banked the linear version of this discipline; the radical version above is its quadratic-age cousin.' },

    { kind: 'heading', text: 'The Location Bridge: The Four-Condition System' },
    { kind: 'para', text: 'The sign diagram answers "where is the expression positive". A different family of questions asks about the DOORS themselves: are both roots inside a chosen interval $(k_1, k_2)$? Is the whole interval inside the root pair? Does exactly one root cross it? Do the roots sit on opposite sides of a wall? These are the location-of-roots questions, and the examination syllabus names them explicitly. They are answered by reading $f$ at the walls of the interval and at the axis — never by computing the roots themselves.' },
    { kind: 'callout', tone: 'theorem', title: 'The four-condition system', text: 'Both roots of $f(x) = ax^2 + bx + c = 0$ lie in the open interval $(k_1, k_2)$ if and only if ALL FOUR hold: (i) $D \\geq 0$ — real doors exist (with $D = 0$ the double root must also lie inside); (ii) $a \\cdot f(k_1) > 0$; (iii) $a \\cdot f(k_2) > 0$ — multiplying by $a$ normalizes the wall reads so both openings speak the same language: each wall lies OUTSIDE the root pair; (iv) $k_1 < -\\frac{b}{2a} < k_2$ — the axis sits between the walls, so the pair straddles the middle instead of parking both doors left or right of the interval.' },
    { kind: 'para', text: 'Each condition earns its keep. Without (i) the answer can be vacuous (no doors at all); without (ii)+(iii) a wall may sit between the doors; without (iv) both doors can sit left of $k_1$ (both wall values positive, axis outside). The worked drill that follows runs the system, and the figure beside it audits every gate on a passing example.' },
    { kind: 'example', title: 'Find every m for which both roots of x² − 4x + m exceed 1', steps: [
      'Three gates, one per condition of the system: real roots, the wall $1$ outside the pair, the axis clear of the wall.',
      'Real roots: $D = 16 - 4m \\geq 0$, so $m \\leq 4$.',
      'Wall outside: $f(1) = 1 - 4 + m = m - 3 > 0$, so $m > 3$.',
      'Axis: $-\\frac{b}{2a} = 2 > 1$ — automatic here, no restriction.',
      'Hence $3 < m \\leq 4$: at $m = 4$ the double root $2$ still exceeds $1$; at $m = 3$ a root lands exactly on the wall; at $m = 4.5$ there are no roots at all.',
      'Witness inside the range: $m = 3.5$ gives roots $2 \\pm \\frac{\\sqrt{2}}{2} \\approx 1.293$ and $2.707$ — both clear of $1$.',
    ] },
    { kind: 'figure', caption: 'The four-condition checklist audited on f(x) = x² − 5x + 6 over the interval (1, 4): all four gates pass (green), while the counter-case x² − 5x + 4 fails exactly the two wall checks — its roots 1 and 4 sit ON the walls of the open interval.', svg: '<svg viewBox="0 0 720 340" role="img" aria-label="Left: parabola x squared minus 5 x plus 6 with both roots inside the walls 1 and 4. Right: the four passing checks and the failing counter-case." xmlns="http://www.w3.org/2000/svg"><rect x="0" y="0" width="720" height="340" fill="#fffdf5"/><text x="225" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="#166534">f(x) = x² − 5x + 6, both roots inside (1, 4)</text><rect x="121" y="35" width="195" height="205" fill="#ffedd5" opacity="0.45"/><line x1="30" y1="224.6" x2="420" y2="224.6" stroke="#16a34a" stroke-width="2"/><path d="M 30 224.6 L 30 35" stroke="#16a34a" stroke-width="2"/><polyline points="30.0,99.1 43.0,116.3 56.0,132.3 69.0,147.1 82.0,160.6 95.0,172.9 108.0,184.0 121.0,193.8 134.0,202.5 147.0,209.8 160.0,216.0 173.0,220.9 186.0,224.6 199.0,227.1 212.0,228.3 225.0,228.3 238.0,227.1 251.0,224.6 264.0,220.9 277.0,216.0 290.0,209.8 303.0,202.5 316.0,193.8 329.0,184.0 342.0,172.9 355.0,160.6 368.0,147.1 381.0,132.3 394.0,116.3 407.0,99.1 420.0,80.6" fill="none" stroke="#0d9488" stroke-width="2.5"/><line x1="121" y1="35" x2="121" y2="240" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3"/><line x1="316" y1="35" x2="316" y2="240" stroke="#d97706" stroke-width="1.5" stroke-dasharray="4 3"/><text x="115" y="252" text-anchor="end" font-size="13" font-weight="bold" fill="#d97706">1</text><text x="322" y="252" text-anchor="start" font-size="13" font-weight="bold" fill="#d97706">4</text><circle cx="186" cy="224.6" r="5" fill="#16a34a"/><circle cx="251" cy="224.6" r="5" fill="#16a34a"/><text x="186" y="212" text-anchor="middle" font-size="12" fill="#166534">root 2</text><text x="251" y="212" text-anchor="middle" font-size="12" fill="#166534">root 3</text><circle cx="218.5" cy="228.3" r="3.5" fill="#0d9488"/><text x="218.5" y="256" text-anchor="middle" font-size="11" fill="#0f766e">axis 2.5</text><text x="580" y="22" text-anchor="middle" font-size="14" font-weight="bold" fill="#166534">the four checks for (1, 4)</text><circle cx="470" cy="52" r="9" fill="#16a34a"/><text x="470" y="57" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">1</text><text x="488" y="57" font-size="13" fill="#1c1917">D = 25 − 24 = 1 &gt; 0 — real roots</text><circle cx="470" cy="92" r="9" fill="#16a34a"/><text x="470" y="97" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">2</text><text x="488" y="97" font-size="13" fill="#1c1917">a·f(1) = 2 &gt; 0 — wall 1 outside</text><text x="488" y="112" font-size="11" fill="#0f766e">a = 1, f(1) = 1 − 5 + 6 = 2</text><circle cx="470" cy="132" r="9" fill="#16a34a"/><text x="470" y="137" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">3</text><text x="488" y="137" font-size="13" fill="#1c1917">a·f(4) = 2 &gt; 0 — wall 4 outside</text><text x="488" y="152" font-size="11" fill="#0f766e">f(4) = 16 − 20 + 6 = 2</text><circle cx="470" cy="172" r="9" fill="#16a34a"/><text x="470" y="177" text-anchor="middle" font-size="12" font-weight="bold" fill="#ffffff">4</text><text x="488" y="177" font-size="13" fill="#1c1917">axis 2.5 ∈ (1, 4) — pair straddles</text><text x="470" y="215" font-size="13" font-weight="bold" fill="#dc2626">counter-case x² − 5x + 4 = (x−1)(x−4):</text><text x="470" y="235" font-size="12.5" fill="#dc2626">roots 1 and 4 sit ON the walls — a·f(1) = 0</text><text x="470" y="253" font-size="12.5" fill="#dc2626">and a·f(4) = 0 fail; D and the axis pass.</text><text x="580" y="285" text-anchor="middle" font-size="12.5" fill="#0f766e">the wall checks are the ones that catch it</text></svg>' },
    { kind: 'para', text: 'The mirror question — the whole INTERVAL inside the root pair — is cheaper than the system, and the honesty of when it is cheaper matters. For $a > 0$, the interval $(k_1, k_2)$ sits inside the root pair exactly when both wall values are at most zero; no axis check and no discriminant check are needed, because two negative wall reads already force the pair to straddle the interval. The subtlety lives at the endpoints: an open interval forgives a root parked exactly on its wall, a closed one does not.' },
    { kind: 'example', title: 'Find every b for which x² + bx + 4 < 0 throughout the open interval (1, 2)', steps: [
      'This is the mirror question: the INTERVAL must live inside the ROOT PAIR, so both walls must read negative.',
      'Read the walls: $f(1) = b + 5 \\leq 0$ and $f(2) = 2b + 8 \\leq 0$.',
      'So, $b \\leq -5$ and $b \\leq -4$; the tighter gate is $b \\leq -5$.',
      'No axis check, no discriminant check: two wall signs already force the pair to straddle $(1, 2)$ — the honest asymmetry of the system.',
      'Endpoint honesty: $b = -5$ places a root exactly at $x = 1$; the open interval never visits that seat, so $b = -5$ survives here — the closed interval $[1, 2]$ would demand $b < -5$.',
      'Near-miss witness: $b = -4.9$ leaves the sliver $(1,\\ 1.034\\ldots)$ positive — $f(1.0005) \\approx 0.0986 > 0$ — so $f(2) < 0$ alone was never enough.',
    ] },

    { kind: 'heading', text: 'Location Drills: The Four Classic Questions' },
    { kind: 'para', text: 'Four question shapes account for nearly every location exercise the examinations set. Each has a decisive condition — one sign read where the full four-condition system is overkill, a case analysis where the half-line replaces the interval. The drills below are the patterns to memorize as shapes, not as answers.' },
    { kind: 'example', title: 'Find every c for which exactly one root of x² − 5x + c lies in (0, 1)', steps: [
      'Exactly one crossing inside the interval means $f$ changes sign across it: read the walls.',
      '$f(0) = c$ and $f(1) = c - 4$; the change demands $f(0) > 0$ and $f(1) < 0$: $0 < c < 4$.',
      'Two roots inside $(0, 1)$ is impossible under these reads — then both walls would be positive.',
      'Boundary witnesses: $c = 0$ puts a root at $0$ itself; $c = 4$ gives roots $1$ and $4$, leaving $(0, 1)$ empty.',
      'Inside witness: $c = 3$ gives roots $\\frac{5 - \\sqrt{13}}{2} \\approx 0.697$ (inside) and $\\frac{5 + \\sqrt{13}}{2} \\approx 4.303$ (outside).',
    ] },
    { kind: 'example', title: 'Find every m for which x² + (m − 1)x + (m − 5) has roots of opposite sign', steps: [
      'Opposite signs mean a negative product of roots; for $x^2 + px + q$ the product of roots is $q$.',
      'Here $q = m - 5 < 0$: $m < 5$.',
      'Discriminant census: $D = (m - 1)^2 - 4(m - 5) = (m - 3)^2 + 12 > 0$ for every $m$ — real roots come free, no second gate.',
      'Boundary witness: $m = 5$ gives roots $0$ and $-4$; zero is neither positive nor negative, so the strict inequality is honest.',
      'For example, $m = 4$: roots $\\frac{-3 \\pm \\sqrt{13}}{2} \\approx -3.303$ and $0.303$ — opposite signs.',
    ] },
    { kind: 'example', title: 'Find every m for which x² + mx + 3 takes a negative value at some positive x', steps: [
      'With $a = 1 > 0$ the negative values live strictly between the roots: we need two distinct roots and at least one of them positive.',
      'Distinct roots: $D = m^2 - 12 > 0$, so $m < -2\\sqrt{3}$ or $m > 2\\sqrt{3}$.',
      'Larger root positive: $\\frac{-m + \\sqrt{m^2 - 12}}{2} > 0$ forces $m < 0$ — a positive $m$ parks both roots on the negative side.',
      'Intersecting the two gates: $m < -2\\sqrt{3} \\approx -3.464$.',
      'Witnesses: $m = -4$ gives roots $1$ and $3$ with $f(2) = -1 < 0$; the near-miss $m = -3.4$ has $D = 11.56 - 12 < 0$ and is never negative anywhere; $m = +4$ has roots $-1$ and $-3$, both negative, and $f(1) = 8 > 0$.',
    ] },
    { kind: 'table', caption: 'The four location questions, the conditions that actually decide them, and this lesson\'s drills.', head: ['The question asked', 'The decisive condition', 'This lesson\'s drill'], rows: [
      ['both roots inside (k₁, k₂)', 'D ≥ 0, a·f(k₁) > 0, a·f(k₂) > 0, k₁ < −b/2a < k₂ — all four', 'x² − 4x + m, both roots > 1 ⟺ 3 < m ≤ 4'],
      ['the interval (k₁, k₂) inside the root pair (f < 0 there, a > 0)', 'f(k₁) ≤ 0 and f(k₂) ≤ 0 — open interval; strict < for closed', 'x² + bx + 4 < 0 on (1, 2) ⟺ b ≤ −5'],
      ['exactly one root inside (k₁, k₂)', 'f(k₁) · f(k₂) < 0 — one sign change', 'x² − 5x + c, one root in (0, 1) ⟺ 0 < c < 4'],
      ['roots on opposite sides of the wall k', 'a·f(k) < 0 (for k = 0: product of roots < 0)', 'x² + (m−1)x + (m−5) ⟺ m < 5'],
      ['a negative value somewhere for x > 0 (a > 0)', 'D > 0 AND the larger root positive', 'x² + mx + 3 ⟺ m < −2√3 ≈ −3.464'],
    ] },
    { kind: 'callout', tone: 'exam', title: 'Where the examinations live', text: 'The JEE Main syllabus names "quadratic equations and inequalities … location of roots" verbatim, and this section is exactly that line. The four-condition system with its honest skippable gates (the mirror question needs no axis check; the opposite-sign question needs no discriminant check) is where a two-second answer separates from a wrong one — the classic multiple-choice distractors are precisely the answers produced by running the checks in the wrong direction or forgetting an endpoint touch. All drills above are exam-style items; none is a reproduced past-paper question.' },
    { kind: 'callout', tone: 'insight', title: 'Why the wall reads carry so much', text: 'Every condition above is a sign diagram read in disguise. "Both roots inside $(k_1, k_2)$" says: the walls sit in the outer positive bands and the axis does not escape the interval. "Exactly one root inside" says: the two walls sit in different bands, so their signs disagree. Once the sign ladder is second nature, the location system stops being a memorized list and becomes geometry read through five numbers: $D$, $f(k_1)$, $f(k_2)$, and the axis seat.' },

    { kind: 'heading', text: 'The Interleaving Gem' },
    { kind: 'para', text: 'One result deserves its own section, because it is the purest display of the sign bracket — and a known lemma (as an exercise, it asks to show it; as a proof, it is four evaluations long). Let $a < b < c < d$ be four points on the line and consider $F(x) = \\mu(x - a)(x - c) + \\lambda(x - b)(x - d)$ for real parameters $\\mu, \\lambda$. Then no matter how $\\mu$ and $\\lambda$ are chosen (not both zero), the equation $F(x) = 0$ has a real root.' },
    { kind: 'example', title: 'The interleaving lemma at (1, 2, 4, 7): show that F(x) = μ(x − 1)(x − 4) + λ(x − 2)(x − 7) = 0 has a real root for every real μ, λ', steps: [
      'Read the four seats: $F(1) = 6\\lambda$, $F(2) = -2\\mu$, $F(4) = -6\\lambda$, $F(7) = 18\\mu$.',
      'Case $\\lambda \\neq 0$: $F(1) \\cdot F(4) = -36\\lambda^2 < 0$ — the values at $1$ and $4$ disagree in sign, so a root lies in $(1, 4)$.',
      'Case $\\mu \\neq 0$: $F(2) \\cdot F(7) = -36\\mu^2 < 0$ — another sign change, this time across $(2, 7)$.',
      'At least one case always fires when $(\\mu, \\lambda) \\neq (0, 0)$, so a real root always exists.',
      'When $\\mu\\lambda > 0$ both brackets fire on the disjoint intervals $(1, 4)$ and $(2, 7)$: two distinct real roots.',
      'Degenerate seats named: $\\mu = 0$ gives the roots $2, 7$; $\\lambda = 0$ gives the roots $1, 4$; $\\lambda = -\\mu$ collapses $F$ to the line $\\mu(4x - 10)$ with root $\\frac{5}{2}$.',
      'The verifier grid sweep agrees: all 35 non-zero $(\\mu, \\lambda)$ pairs carry a real root; exactly the 30 pairs with $\\mu\\lambda > 0$ carry two.',
    ] },
    { kind: 'para', text: 'The engine behind the gem is worth naming. Each parameter survives in exactly one bracket: $\\lambda$ lives in the pair $(F(a), F(c))$ because $\\mu$ vanishes there, and $\\mu$ lives in $(F(b), F(d))$ because $\\lambda$ vanishes there. The interleaving order $a < b < c < d$ makes each surviving pair disagree in sign — $(a - b)(a - d)$ is positive while $(c - b)(c - d)$ is negative, and symmetrically. A sign change across an interval forces a real crossing (the parabola cannot jump the axis), which is the same honesty the sign diagram runs on. The lemma is the location bridge with the parameters wearing the boots.' },

    { kind: 'formula', name: 'The between-roots law', latex: 'a > 0:\\quad (x - \\alpha)(x - \\beta) < 0 \\Leftrightarrow \\alpha < x < \\beta, \\qquad (x - \\alpha)(x - \\beta) > 0 \\Leftrightarrow x < \\alpha \\ \\text{or}\\ x > \\beta', note: 'Outside positive, between negative — the whole sign diagram for an upward parabola with two doors.' },
    { kind: 'formula', name: 'The whole-line verdicts', latex: 'D < 0:\\ a > 0 \\Rightarrow f > 0\\ \\forall x,\\quad a < 0 \\Rightarrow f < 0\\ \\forall x; \\qquad D = 0:\\ f(x) > 0 \\Leftrightarrow x \\neq -\\tfrac{b}{2a}\\ (a > 0)', note: 'All of ℝ, one excluded seat, or the empty set — decided by the sign of a and the strictness.' },
    { kind: 'formula', name: 'The four-condition location system', latex: '\\text{both roots in } (k_1, k_2) \\Leftrightarrow D \\geq 0 \\ \\wedge\\ a f(k_1) > 0 \\ \\wedge\\ a f(k_2) > 0 \\ \\wedge\\ k_1 < -\\tfrac{b}{2a} < k_2', note: 'Real doors, both walls outside the pair, the axis between the walls.' },
    { kind: 'formula', name: 'The one-sign-change condition', latex: '\\text{exactly one root in } (k_1, k_2) \\Leftrightarrow f(k_1) \\cdot f(k_2) < 0', note: 'A sign change pins exactly one crossing; two roots inside would make the wall values agree.' },
    { kind: 'formula', name: 'The flip law', latex: 'a < 0:\\ \\text{multiply the inequality by } -1 \\text{ and flip its sign first}', note: 'Never divide by a — its sign is the trap; a² is always safe to divide by.' },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The solution set of x² − 7x + 10 < 0 is', options: ['x < 2 or x > 5', '2 < x < 5', '2 ≤ x ≤ 5', 'empty'], answer: 1, explain: 'Zeros 2 and 5 with $a = 1 > 0$: the between-roots law puts the negative values strictly between the doors. The first option is the complement read (the $> 0$ answer); the third wrongly includes the doors, where the value is 0, not negative; the empty-set verdict belongs to the $D < 0$ family, and here $D = 9 > 0$.' },
      { q: '(x − 3)² > 0 holds exactly when', options: ['for all real x', 'x ≠ 3', 'x > 3', 'never'], answer: 1, explain: 'The square vanishes only at $x = 3$ and is strictly positive everywhere else — the lone-exclusion answer. "All real x" forgets the vanishing seat; "$x > 3$" keeps only the right band; "never" denies that a square is positive off its zero.' },
      { q: 'Both roots of x² − 4x + m exceed 1 exactly when', options: ['m < 3', '3 < m ≤ 4', 'm ≤ 4', '3 ≤ m ≤ 4'], answer: 1, explain: 'The system gives $D = 16 - 4m \\geq 0$ ($m \\leq 4$), $f(1) = m - 3 > 0$ ($m > 3$), and the axis $2 > 1$ free — so $3 < m \\leq 4$. "$m \\leq 4$" admits $m = 3$, where a root sits exactly at 1; "$3 \\leq m \\leq 4$" repeats that error; "$m < 3$" inverts the wall read.' },
      { q: 'The roots of x² + (m − 1)x + (m − 5) are opposite in sign exactly when', options: ['m < 5', 'm > 5', 'm ≤ 5', '0 < m < 5'], answer: 0, explain: 'Opposite signs force a negative product of roots: $m - 5 < 0$, so $m < 5$ — and the discriminant $(m-3)^2 + 12$ is positive for every $m$, so no second gate exists. "$m > 5$" and "$m \\leq 5$" mishandle the boundary: at $m = 5$ the roots are $0$ and $-4$, and zero is neither sign; the extra lower bound in the last option is pure decoration.' },
      { q: 'For a < b < c < d, the equation μ(x − a)(x − c) + λ(x − b)(x − d) = 0 has', options: ['a real root for every real μ, λ (not both zero)', 'real roots only when μλ > 0', 'real roots only when μ = λ', 'no real roots for some pairs μ, λ'], answer: 0, explain: 'The four-value bracket certifies a sign change whenever either parameter is non-zero: $F(a)F(c)$ is negative when $\\lambda \\neq 0$ and $F(b)F(d)$ is negative when $\\mu \\neq 0$. The $\\mu\\lambda > 0$ condition prices the TWO-root case, not existence; $\\mu = \\lambda$ is one special seat among all pairs; and the verifier grid sweep found real roots for all 35 non-zero pairs.' },
    ] },
    { kind: 'exercises', title: 'Exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Solve x² − 7x + 10 > 0.', solution: [
          'Standard form is already in place: $x^2 - 7x + 10 > 0$ with $a = 1 > 0$.',
          'Zeros: $x^2 - 7x + 10 = (x - 2)(x - 5)$, so the doors sit at $x = 2$ and $x = 5$.',
          'Ladder: outside the pair an $a > 0$ parabola rides above the axis, so the sign runs $+$, $-$, $+$.',
          'The inequality asks for the positive regions, and the endpoints are strict — at the doors the value is 0, not positive.',
        ], answer: '$x < 2$ or $x > 5$' },
        { q: 'Solve −x² + 2x + 3 ≥ 0.', solution: [
          'The leading coefficient is $a = -1 < 0$: multiply by $-1$ and flip the inequality.',
          'Now, $x^2 - 2x - 3 \\leq 0$, which factors as $(x + 1)(x - 3) \\leq 0$.',
          'Between the doors $-1$ and $3$ an upward parabola is negative; the inequality is non-strict, so the doors join the answer.',
          'Check the flipped read at $x = 0$: the original gives $3 \\geq 0$ — inside the pair, as promised.',
        ], answer: '$-1 \\leq x \\leq 3$' },
        { q: 'Solve (x − 3)² > 0 and (x − 3)² ≥ 0.', solution: [
          'A square is never negative, so $(x - 3)^2 \\geq 0$ holds at every seat.',
          'The strict version needs a genuinely positive value: the square vanishes only at $x = 3$.',
          'Hence the strict inequality excludes exactly that one seat, while the non-strict one keeps all of $\\mathbb{R}$.',
        ], answer: '$(x-3)^2 > 0$ for $x \\neq 3$; $(x-3)^2 \\geq 0$ for all real $x$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve x² + x + 1 ≤ 0.', solution: [
          'Compute the discriminant: $D = 1 - 4 = -3 < 0$ with $a = 1 > 0$.',
          'So, the expression is positive at every seat and never touches the axis.',
          'The set where it is $\\leq 0$ is therefore empty.',
        ], answer: 'no solution (the answer set is $\\varnothing$)' },
        { q: 'Solve −x² − x − 1 < 0.', solution: [
          'Write the expression as $-(x^2 + x + 1)$: the inner quadratic has $D = 1 - 4 = -3 < 0$ with $a = 1 > 0$.',
          'So, $x^2 + x + 1 > 0$ for all real $x$, and multiplying by $-1$ turns every value negative.',
          'Hence the inequality holds everywhere — no seats to exclude.',
        ], answer: 'all real $x$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find the domain of f(x) = √(x² − 5x).', solution: [
          'The square root demands a non-negative radicand: $x^2 - 5x \\geq 0$.',
          'Factor: $x(x - 5) \\geq 0$, doors at $0$ and $5$, upward opening.',
          'The between-roots law puts the non-negative regions outside the pair.',
          'Witness inside: at $x = 2$ the radicand is $2 \\cdot (-3) = -6 < 0$ — the whole strip $(0, 5)$ is barred.',
        ], answer: '$x \\leq 0$ or $x \\geq 5$' },
        { q: 'Solve √(x + 6) = x.', solution: [
          'Domain first: $x + 6 \\geq 0$, and since a square root is never negative any solution must also have $x \\geq 0$.',
          'Square both sides: $x + 6 = x^2$, so $x^2 - x - 6 = 0$, giving $(x - 3)(x + 2) = 0$ and the candidates $x = 3$, $x = -2$.',
          'Census: $x = 3$ gives $\\sqrt{9} = 3$ — it survives.',
          'But, $x = -2$ gives $\\sqrt{4} = 2 \\neq -2$: a squared equation admitted a seat the original never held — and $-2$ fails the $x \\geq 0$ pre-census anyway.',
        ], answer: '$x = 3$ (the seat $x = -2$ is extraneous)' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find every m for which both roots of x² − 4x + m exceed 1.', solution: [
          'Three conditions, one per gate: real roots, the wall 1 outside the pair, the axis to the right of 1.',
          'Real roots: $D = 16 - 4m \\geq 0$, so $m \\leq 4$.',
          'Wall outside: $f(1) = m - 3 > 0$, so $m > 3$.',
          'Axis: $-\\frac{b}{2a} = 2 > 1$ holds for every $m$ — no restriction.',
          'Hence the intersection is $3 < m \\leq 4$: at $m = 4$ the double root 2 still exceeds 1; at $m = 3$ a root sits exactly on the wall.',
        ], answer: '$3 < m \\leq 4$' },
        { q: 'Find every b for which x² + bx + 4 < 0 for all x in the open interval (1, 2).', solution: [
          'Here the interval must sit INSIDE the root pair — so both walls carry the negative sign.',
          'Compute: $f(1) = b + 5 \\leq 0$ and $f(2) = 2b + 8 \\leq 0$.',
          'So, $b \\leq -5$ and $b \\leq -4$; the tighter bound wins: $b \\leq -5$.',
          'No axis or discriminant check is needed — the two wall reads already force the pair to straddle $(1, 2)$.',
          'Endpoint honesty: $b = -5$ puts a root exactly at 1; the open interval never visits it, so $b = -5$ survives. The closed variant $[1, 2]$ would demand $b < -5$.',
          'Witness sweep: $b = -6$ gives $f < 0$ across $(1, 2)$; $b = -4.9$ leaves the sliver $(1,\\ 1.034\\ldots)$ positive — $f(1.0005) \\approx 0.0986 > 0$.',
        ], answer: '$b \\leq -5$' },
        { q: 'Find every c for which exactly one root of x² − 5x + c lies in (0, 1).', solution: [
          'A sign change across the interval pins exactly one crossing: read the walls.',
          '$f(0) = c > 0$ and $f(1) = c - 4 < 0$ give $0 < c < 4$.',
          'Why exactly one, not two: two roots inside $(0, 1)$ would make $f$ positive at BOTH walls — contradicting $f(1) < 0$.',
          'Boundary witnesses: $c = 0$ puts a root at 0 itself; $c = 4$ gives roots 1 and 4 — both leave the open interval empty-handed.',
          'For example, $c = 3$: roots $\\frac{5 - \\sqrt{13}}{2} \\approx 0.697$ inside and $\\frac{5 + \\sqrt{13}}{2} \\approx 4.303$ outside — exactly one.',
        ], answer: '$0 < c < 4$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Find every m for which the roots of x² + (m − 1)x + (m − 5) have opposite signs.', solution: [
          'Opposite signs of the roots mean the product of roots is negative; for $x^2 + px + q$ the product is $q$.',
          'Here the product is $m - 5$, so $m - 5 < 0$: $m < 5$.',
          'Discriminant census: $D = (m - 1)^2 - 4(m - 5) = m^2 - 6m + 21 = (m - 3)^2 + 12 > 0$ for every $m$ — real roots come free.',
          'Boundary witness: $m = 5$ gives roots 0 and −4; zero is neither sign, so the strict $m < 5$ is honest.',
          'For example, $m = 4$: roots $\\frac{-3 \\pm \\sqrt{13}}{2} \\approx -3.303$ and $0.303$ — opposite signs, as promised.',
        ], answer: '$m < 5$' },
        { q: 'Find every m for which x² + mx + 3 is negative at some positive x.', solution: [
          'With $a = 1 > 0$, negative values live strictly between the roots: we need two distinct roots and at least one of them positive.',
          'Distinct roots: $D = m^2 - 12 > 0$, so $m < -2\\sqrt{3}$ or $m > 2\\sqrt{3}$.',
          'Larger root $= \\frac{-m + \\sqrt{m^2 - 12}}{2} > 0$ forces $m < 0$ (for $m \\geq 0$ both roots are negative or $D$ closes).',
          'Intersecting the two gates: $m < -2\\sqrt{3} \\approx -3.464$.',
          'Witness: $m = -4$ gives roots 1 and 3 with $f(2) = -1 < 0$; the near-miss $m = -3.4$ has $D = 11.56 - 12 < 0$ — never negative anywhere.',
        ], answer: '$m < -2\\sqrt{3}$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Let a = 1, b = 2, c = 4, d = 7 and F(x) = μ(x − 1)(x − 4) + λ(x − 2)(x − 7). Show that F(x) = 0 has a real root for every real μ, λ (not both zero), and identify when there are two.', solution: [
          'Read the four seats: $F(1) = 6\\lambda$, $F(2) = -2\\mu$, $F(4) = -6\\lambda$, $F(7) = 18\\mu$.',
          'Case $\\lambda \\neq 0$: $F(1) \\cdot F(4) = -36\\lambda^2 < 0$ — a sign change across $(1, 4)$, so a root sits there.',
          'Case $\\mu \\neq 0$: $F(2) \\cdot F(7) = -36\\mu^2 < 0$ — another root sits in $(2, 7)$.',
          'So, at least one bracket fires whenever $(\\mu, \\lambda) \\neq (0, 0)$, and a sign change across an interval forces a real crossing.',
          'When $\\mu\\lambda > 0$ both brackets fire on the disjoint intervals $(1, 4)$ and $(2, 7)$: two distinct real roots.',
          'Degenerate seats named: $\\mu = 0$ gives roots 2, 7; $\\lambda = 0$ gives roots 1, 4; $\\lambda = -\\mu$ collapses $F$ to the line $\\mu(4x - 10)$ with root $\\frac{5}{2}$.',
          'The verifier grid confirms: all 35 non-zero $(\\mu, \\lambda)$ pairs carry a real root; exactly the 30 pairs with $\\mu\\lambda > 0$ carry two.',
        ], answer: 'a real root exists for every $(\\mu, \\lambda) \\neq (0, 0)$; two distinct real roots exactly when $\\mu\\lambda > 0$' },
        { q: 'Prove that both roots of x² − 2ax + a² − 1 lie in (−1, 2) if and only if 0 < a < 1.', solution: [
          'Factor honestly instead of running the system blind: $x^2 - 2ax + a^2 - 1 = (x - a)^2 - 1 = (x - a - 1)(x - a + 1)$.',
          'So, the roots are $a - 1$ and $a + 1$ — a fixed gap of 2 straddling $a$.',
          'Both inside $(-1, 2)$: $a - 1 > -1$ and $a + 1 < 2$, giving $a > 0$ and $a < 1$.',
          'Wall witnesses: $a = 0$ puts the root $-1$ on the left wall; $a = 1$ puts the root $2$ on the right wall — the open interval excludes both seats.',
          'For example, $a = \\frac{1}{2}$: roots $-\\frac{1}{2}$ and $\\frac{3}{2}$, both inside.',
          'Hence the condition is exactly $0 < a < 1$, and the discriminant $4 > 0$ needs no separate gate — the factorization carried it.',
        ], answer: 'both roots lie in $(-1, 2)$ exactly for $0 < a < 1$' },
      ] },
    ] },
  ],
}

const lesson23: Lesson = {
  id: 'aa-symmetric-reads-and-common-roots',
  number: '2.3',
  title: 'Symmetric Reads and Common Roots',
  concepts: [
    "Viète's two reads price everything — the roots themselves never need solving",
    'a symmetric function of the roots is readable from S and P alone',
    'the transformation of an equation: the S′/P′ route audited by the substitution route',
    'the power-sum recurrence: any αᵏ + βᵏ by iteration (the Lucas engine)',
    'the repeated root: D = 0 collapses both doors onto the vertex seat −b/2a',
    'the one-common-root determinant condition: big cross squared = small crosses product',
    'the both-common proportionality: a₁/a₂ = b₁/b₂ = c₁/c₂',
  ],
  objectives: [
    'price any symmetric expression in the roots — α² + β², α³ + β³, |α − β|, α/β + β/α, α⁴ + β⁴ — exactly from S and P, without solving anything',
    'iterate the power-sum recurrence to price high powers of the roots, and recognise the Fibonacci-family engine inside x² − x − 1',
    'rebuild an equation whose roots are a designed function of the original roots by both the S′/P′ route and the substitution route, using one as an audit of the other',
    'state and apply the one-common-root determinant condition and the both-common proportionality condition, with the honest census of when one shared door is NOT two',
    'certify repeated roots through the perfect-square discriminant and the vertex seat, and run the add-and-subtract census on a three-equation system',
  ],
  prerequisites: ['al-roots-and-coefficients-viete-relations', 'aa-vertex-form-at-work-maxima-and-minima', 'aa-quadratic-inequalities-and-the-sign-diagram'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'ncert-math10-ch4-quadratic', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'AL 9.4 planted Viète\'s two reads at school depth: the sum $-b/a$ and the product $c/a$ certify roots and build quadratics without solving anything. Lesson 2.1 turned the quadratic into an expression and priced its extremes; 2.2 fenced its sign and located its doors. This lesson turns the PAIR of roots itself into a working object. Three instruments are added. First, the symmetric reads: every expression in the roots that survives the swap $\\alpha \\leftrightarrow \\beta$ is computable from $S$ and $P$ alone — a census of formulas this lesson derives, tabulates and applies at competitive depth. Second, the transformation engine: an equation whose roots are a designed function of the original roots is rebuilt by two independent routes, each auditing the other. Third, the shared-door census: when do two quadratic equations own a common root, and when do they own both? That last question — untouched by every earlier lesson — carries the examination\'s favourite determinant condition and its even-favourite proportionality verdict, and the repeated-root census (both doors collapsed onto one seat) supplies the boundary cases. One running equation, $x^2 - 4x + 1 = 0$ with its roots $2 \\pm \\sqrt{3}$, threads through all three instruments.' },

    { kind: 'heading', text: 'Viète\'s Two Reads and the Reconstruction Law' },
    { kind: 'para', text: 'The factor theorem already did the quiet work. If $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$ ($a \\neq 0$), then the polynomial factors completely:' },
    { kind: 'equation', latex: 'ax^2 + bx + c = a(x - \\alpha)(x - \\beta) = a\\left[x^2 - (\\alpha + \\beta)x + \\alpha\\beta\\right]' },
    { kind: 'para', text: 'Comparing the coefficient of $x$ and the constant term with the left side — divide the bracket by $a$ first, so the leading coefficient matches — gives the two reads AL 9.4 named after François Viète, who introduced the letter-symbol algebra that made such statements writable (1591):' },
    { kind: 'callout', tone: 'definition', title: 'Viète\'s relations', text: 'If $\\alpha$ and $\\beta$ are the roots of $ax^2 + bx + c = 0$ with $a \\neq 0$, the SUM and PRODUCT of the roots are said to be given by Viète\'s relations: $\\alpha + \\beta = -\\dfrac{b}{a} = -\\dfrac{\\text{coefficient of } x}{\\text{coefficient of } x^2}$ and $\\alpha\\beta = \\dfrac{c}{a} = \\dfrac{\\text{constant term}}{\\text{coefficient of } x^2}$. The reads hold for every root type — integer, fraction, irrational surd, repeated, even non-real — because the factorisation is an identity, not a census of nice cases.' },
    { kind: 'para', text: 'Thus, with $S = \\alpha + \\beta$ and $P = \\alpha\\beta$: $S = -b/a$, $P = c/a$. The reconstruction law runs the arrow backwards. For example, an equation whose roots are prescribed:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) a MONIC quadratic with prescribed sum $S$ and product $P$ is $x^2 - Sx + P = 0$ — expand $x^2 - (\\alpha + \\beta)x + \\alpha\\beta$ and read the signs;',
      '(ii) the GENERAL family is $a(x^2 - Sx + P) = 0$ for any $a \\neq 0$ — AL 9.4\'s a-family: infinitely many equations share one root set, and the examination\'s answer is the monic one unless a coefficient is demanded;',
      '(iii) the reads and the reconstruction compose: any root-information question is a question about $S$ and $P$, and any $S$, $P$ question is a coefficient read.',
    ] },
    { kind: 'example', title: 'Form the quadratic equation whose roots are 3 and −7', steps: [
      'Sum and product first, never the equation: $S = 3 + (-7) = -4$ and $P = 3 \\times (-7) = -21$.',
      'The monic reconstruction law: $x^2 - Sx + P = 0$.',
      'Substituting: $x^2 - (-4)x + (-21) = 0$, that is $x^2 + 4x - 21 = 0$.',
      'Check by factoring: $(x - 3)(x + 7) = x^2 + 4x - 21$ — both claimed roots vanish it.',
      'Hence, $x^2 + 4x - 21 = 0$.',
    ] },
    { kind: 'example', title: 'Find α + β + αβ for the equation 3x² − 9x + 2 = 0 without solving it', steps: [
      'The reads: $S = -\\dfrac{-9}{3} = 3$ and $P = \\dfrac{2}{3}$.',
      'The demand is $S + P$: the two reads add directly.',
      'So, $S + P = 3 + \\dfrac{2}{3} = \\dfrac{11}{3}$.',
      'Notice what never happened: the roots $\\dfrac{9 \\pm \\sqrt{57}}{6}$ were never computed. This is AL 9.4\'s no-solve discipline running at full depth — every symmetric demand collapses to coefficient arithmetic.',
      'Hence, $\\alpha + \\beta + \\alpha\\beta = \\dfrac{11}{3}$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'The no-solve licence has one honest boundary', text: 'The reads price every SYMMETRIC demand. An asymmetric one — "which root is larger?", "is $\\alpha > 2$?" — cannot be answered from $S$ and $P$ alone, because swapping the roots leaves the reads unchanged while flipping the answer. Lesson 2.2\'s sign machinery is the tool for location questions; the present lesson\'s tools own the value questions. Knowing which family a demand belongs to is half the examination\'s battle.' },

    { kind: 'heading', text: 'Symmetric Functions of the Roots' },
    { kind: 'callout', tone: 'definition', title: 'Symmetric function of the roots', text: 'An expression $E(\\alpha, \\beta)$ in the roots is said to be a SYMMETRIC FUNCTION of the roots if it is unchanged when the roots are interchanged: $E(\\alpha, \\beta) = E(\\beta, \\alpha)$. Thus, $\\alpha^2 + \\beta^2$, $\\alpha^3 + \\beta^3$ and $|\\alpha - \\beta|$ are symmetric (addition and absolute value commute with the swap), while $\\alpha - \\beta$ and $\\alpha^2 + \\beta^3$ are not (each changes sign or shape under the swap). The structural fact this lesson cashes: every symmetric function of two roots is expressible in terms of $S$ and $P$ alone.' },
    { kind: 'para', text: 'The inventory below is the working toolkit. Each line is derived, not asserted — the derivations are two-line expansions, and the verifier has certified every numeric value on the lesson\'s own exhibits.' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\alpha^2 + \\beta^2 = S^2 - 2P$, from $(\\alpha + \\beta)^2 = \\alpha^2 + \\beta^2 + 2\\alpha\\beta$;',
      '(ii) $\\alpha^3 + \\beta^3 = S^3 - 3PS$, from $\\alpha^3 + \\beta^3 = (\\alpha + \\beta)^3 - 3\\alpha\\beta(\\alpha + \\beta)$;',
      '(iii) $(\\alpha - \\beta)^2 = S^2 - 4P$, from $(\\alpha - \\beta)^2 = (\\alpha + \\beta)^2 - 4\\alpha\\beta$ — the SQUARE is symmetric, so it is readable; and $|\\alpha - \\beta| = \\sqrt{S^2 - 4P} = \\dfrac{\\sqrt{D}}{|a|}$, the bridge to AL 9.3\'s discriminant;',
      '(iv) $\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta} = \\dfrac{S}{P}$, one common denominator — licensed only when $P \\neq 0$;',
      '(v) $\\dfrac{\\alpha}{\\beta} + \\dfrac{\\beta}{\\alpha} = \\dfrac{\\alpha^2 + \\beta^2}{\\alpha\\beta} = \\dfrac{S^2 - 2P}{P}$, again demanding $P \\neq 0$;',
      '(vi) $\\alpha^4 + \\beta^4 = (\\alpha^2 + \\beta^2)^2 - 2\\alpha^2\\beta^2 = (S^2 - 2P)^2 - 2P^2$ — square the read for the squares, then subtract the doubled product;',
      '(vii) $\\sqrt{\\alpha} + \\sqrt{\\beta} = \\sqrt{\\alpha + \\beta + 2\\sqrt{\\alpha\\beta}} = \\sqrt{S + 2\\sqrt{P}}$ — honest ONLY when $\\alpha, \\beta \\geq 0$ (square roots demand non-negative seats).',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The asymmetric census', text: 'Two near-misses ruin this section. $\\alpha - \\beta$ is NOT symmetric — its square is; so the readable object is $(\\alpha - \\beta)^2$, and recovering $|\\alpha - \\beta|$ from it is fine while recovering the SIGNED difference is not (which root is larger is location information, and the reads deliberately destroy it). And $\\sqrt{\\alpha} + \\sqrt{\\beta}$ demands $\\alpha, \\beta \\geq 0$ BEFORE the formula applies — for $x^2 - 6x + 5 = 0$ with roots $1, 5$ it is licensed ($\\sqrt{1} + \\sqrt{5}$), but for $x^2 - 4x + 1 = 0$ with root $2 - \\sqrt{3} \\approx 0.268 > 0$ it survives, while a product $P < 0$ equation kills it outright. State the licence whenever the square-root read is used.' },
    { kind: 'example', title: 'Price every read in the inventory for 3x² − 9x + 2 = 0, without solving', steps: [
      'The reads: $S = 3$, $P = \\dfrac{2}{3}$.',
      '(i) $\\alpha^2 + \\beta^2 = S^2 - 2P = 9 - \\dfrac{4}{3} = \\dfrac{23}{3}$.',
      '(ii) $\\alpha^3 + \\beta^3 = S^3 - 3PS = 27 - 3 \\cdot \\dfrac{2}{3} \\cdot 3 = 27 - 6 = 21$.',
      '(iii) $(\\alpha - \\beta)^2 = S^2 - 4P = 9 - \\dfrac{8}{3} = \\dfrac{19}{3}$, so $|\\alpha - \\beta| = \\sqrt{\\dfrac{19}{3}} = \\dfrac{\\sqrt{57}}{3}$.',
      '(iv) $\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta} = \\dfrac{S}{P} = \\dfrac{3}{2/3} = \\dfrac{9}{2}$ — licensed, $P = 2/3 \\neq 0$.',
      '(v) $\\dfrac{\\alpha}{\\beta} + \\dfrac{\\beta}{\\alpha} = \\dfrac{S^2 - 2P}{P} = \\dfrac{23/3}{2/3} = \\dfrac{23}{2}$.',
      '(vi) $\\alpha^4 + \\beta^4 = (S^2 - 2P)^2 - 2P^2 = \\left(\\dfrac{23}{3}\\right)^2 - \\dfrac{8}{9} = \\dfrac{529 - 8}{9} = \\dfrac{521}{9}$.',
      'The verifier certifies each read against the formula roots $\\dfrac{9 \\pm \\sqrt{57}}{6}$ to nine decimal places — two routes, one census.',
      'Hence, $\\dfrac{23}{3},\\ 21,\\ \\dfrac{\\sqrt{57}}{3},\\ \\dfrac{9}{2},\\ \\dfrac{23}{2},\\ \\dfrac{521}{9}$ in inventory order.',
    ] },
    { kind: 'para', text: 'One further engine prices the demands the inventory does not reach: HIGH POWERS. Since $\\alpha$ satisfies its own equation, $a\\alpha^2 + b\\alpha + c = 0$, every power of $\\alpha$ above the second can be REDUCED to a linear expression in $\\alpha$ — iterate the reduction and the sum $\\alpha^k + \\beta^k$ follows.' },
    { kind: 'callout', tone: 'theorem', title: 'The power-sum recurrence', text: 'For roots of $ax^2 + bx + c = 0$ ($a \\neq 0$), every power obeys $\\alpha^{k+2} = -\\dfrac{b}{a}\\alpha^{k+1} - \\dfrac{c}{a}\\alpha^{k}$ for all $k \\geq 0$ (multiply the root equation through by $\\alpha^k$ and divide by $a$; likewise for $\\beta$). Adding the two recurrences: the power sum $T_k = \\alpha^k + \\beta^k$ satisfies $T_{k+2} = -\\dfrac{b}{a}T_{k+1} - \\dfrac{c}{a}T_{k}$ with seeds $T_0 = 2$, $T_1 = S$. Thus, any power sum — however high the exponent — is two coefficient ratios iterated.' },
    { kind: 'example', title: 'Re-derive α³ + β³ for 3x² − 9x + 2 = 0 by the recurrence, then price α⁵ + β⁵ for x² − x − 1 = 0', steps: [
      'Reduction first: $3\\alpha^2 - 9\\alpha + 2 = 0$ gives $\\alpha^2 = 3\\alpha - \\dfrac{2}{3}$.',
      'Multiply through by $\\alpha$: $\\alpha^3 = 3\\alpha^2 - \\dfrac{2}{3}\\alpha = 3\\left(3\\alpha - \\dfrac{2}{3}\\right) - \\dfrac{2}{3}\\alpha = \\dfrac{25}{3}\\alpha - 2$.',
      'Summing the twin: $\\alpha^3 + \\beta^3 = \\dfrac{25}{3}(\\alpha + \\beta) - 4 = \\dfrac{25}{3} \\cdot 3 - 4 = 21$ — the inventory\'s answer, by a second independent route.',
      'Now the famous cousin: $x^2 - x - 1 = 0$ has $S = 1$, $P = -1$, recurrence $T_{k+2} = T_{k+1} + T_k$.',
      'Seeds $T_0 = 2$, $T_1 = 1$; iterate: $3, 4, 7, 11, 18, 29, \\ldots$ — the LUCAS numbers, the Fibonacci recurrence with different seeds.',
      'So, $T_5 = \\alpha^5 + \\beta^5 = 11$: a demand that looks like fifteen lines of expansion collapses to seven additions.',
      'Hence, $\\alpha^3 + \\beta^3 = 21$ (recurrence route); $\\alpha^5 + \\beta^5 = 11$ for $x^2 - x - 1 = 0$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Why the recurrence beats the formula sheet', text: 'The inventory (i)–(vi) covers exponents up to four; the recurrence covers ALL of them. An examination demand like "find $\\alpha^{15} + \\beta^{15} + \\alpha^{11} + \\beta^{11}$, given $\\alpha, \\beta$ are the roots of $x^2 - x - 1 = 0$" is a recurrence question wearing a costume: since $\\alpha\\beta = -1$, we have $\\alpha^2\\beta^2 = 1$, so $\\alpha^{11} = \\alpha^{13}\\beta^2$ and $\\beta^{11} = \\alpha^2\\beta^{13}$ — the numerator factors as $(\\alpha^2 + \\beta^2)(\\alpha^{13} + \\beta^{13})$, the tower collapses onto $T_2 = S^2 - 2P = 3$, and $T_{15} + T_{11} = 3 \\cdot 521 = 1563$ (the verifier pins it). Iterate when the exponent is large; quote the inventory when it is small.' },

    { kind: 'heading', text: 'Forming Equations: Reconstruction and Transformation' },
    { kind: 'para', text: 'The reconstruction law builds an equation from $S$ and $P$ directly. The deeper craft — and the examination\'s real target — is the TRANSFORMATION of an equation: given $f(x) = 0$ with roots $\\alpha, \\beta$, find the equation whose roots are $g(\\alpha), g(\\beta)$ for a designed function $g$. Two independent routes exist, and running BOTH is the discipline that survives checking:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) the S′/P′ ROUTE: price the new sum $S\' = g(\\alpha) + g(\\beta)$ and the new product $P\' = g(\\alpha)\\,g(\\beta)$ symbolically from $S$ and $P$, then write $x^2 - S\'x + P\' = 0$ — the reconstruction law applied to the transformed pair;',
      '(ii) the SUBSTITUTION ROUTE: express the old root in terms of the new one ($y = g(x)$ inverted to $x = h(y)$) and substitute into $f(x) = 0$ — the new equation in $y$ falls out directly;',
      '(iii) the routes are independent: if they disagree, one has an algebra slip — find it before shipping either.',
    ] },
    { kind: 'example', title: 'The running equation: x² − 4x + 1 = 0. Find the equation whose roots are α² + 1 and β² + 1 — by both routes', steps: [
      'Reads: $S = 4$, $P = 1$; so $\\alpha^2 + \\beta^2 = S^2 - 2P = 14$.',
      'S′/P′ route — the new sum: $S\' = (\\alpha^2 + 1) + (\\beta^2 + 1) = 14 + 2 = 16$.',
      'The new product: $P\' = \\alpha^2\\beta^2 + (\\alpha^2 + \\beta^2) + 1 = P^2 + 14 + 1 = 1 + 15 = 16$.',
      'Route one lands: $y^2 - 16y + 16 = 0$.',
      'Substitution route: let $y = x^2 + 1$. On the solution set, $x^2 - 4x + 1 = 0$ rearranges to $x^2 + 1 = 4x$, so $y = 4x$ — the designed function COLLAPSES to a line on the seats that matter.',
      'Substitute $x = y/4$ into the original: $\\dfrac{y^2}{16} - y + 1 = 0$, that is $y^2 - 16y + 16 = 0$.',
      'The verifier checks the agreement numerically at both seats: $\\alpha^2 + 1 \\approx 14.93$ and $\\beta^2 + 1 \\approx 1.07$ sum to $16$ and multiply to $16$.',
      'Hence, $y^2 - 16y + 16 = 0$, certified by two independent routes.',
    ] },
    { kind: 'example', title: 'The roots of x² − 6x + 8 = 0 are each increased by 2. Form the new equation', steps: [
      'Base reads: $S = 6$, $P = 8$; the roots are $2$ and $4$ (factorable, worth noticing).',
      'S′/P′ route: $S\' = (\\alpha + 2) + (\\beta + 2) = 6 + 4 = 10$; $P\' = (\\alpha + 2)(\\beta + 2) = P + 2S + 4 = 8 + 12 + 4 = 24$.',
      'New equation: $y^2 - 10y + 24 = 0$.',
      'Substitution route: $y = x + 2$ means $x = y - 2$; insert: $(y - 2)^2 - 6(y - 2) + 8 = y^2 - 10y + 24$.',
      'Check the seats: the new roots should be $4$ and $6$ — and indeed $(4)^2 - 10(4) + 24 = 0$, $(6)^2 - 10(6) + 24 = 0$.',
      'Hence, $y^2 - 10y + 24 = 0$ (roots $4$ and $6$).',
    ] },
    { kind: 'example', title: 'Form the equation whose roots are the reciprocals of the roots of 3x² − 9x + 2 = 0', steps: [
      'S′/P′ route: $S\' = \\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta} = \\dfrac{S}{P} = \\dfrac{9}{2}$ and $P\' = \\dfrac{1}{\\alpha\\beta} = \\dfrac{3}{2}$ — licensed, $P = 2/3 \\neq 0$.',
      'New equation: $y^2 - \\dfrac{9}{2}y + \\dfrac{3}{2} = 0$, cleared: $2y^2 - 9y + 3 = 0$.',
      'Read the pattern: the coefficients $3, -9, 2$ became $2, -9, 3$ — REVERSED. That is the general law: reciprocating the roots reverses the coefficient triple (when $c \\neq 0$), because $\\dfrac{1}{\\alpha}, \\dfrac{1}{\\beta}$ are the roots of $cx^2 + bx + a = 0$.',
      'The palindrome census: a quadratic with $a = c$ is its OWN reciprocal equation. For example, $2x^2 + 5x + 2 = 0$ has roots $-2$ and $-\\dfrac{1}{2}$ — a reciprocal pair summing to $-\\dfrac{5}{2}$ — so reversing $2, 5, 2$ changes nothing.',
      'Hence, $2x^2 - 9x + 3 = 0$ — the coefficient reversal.',
    ] },
    { kind: 'example', title: 'Given α² = 4α − 1 and β² = 4β − 1 with α ≠ β, find the equation whose roots are α/β and β/α', steps: [
      'The reduced-equation trick first: both $\\alpha$ and $\\beta$ satisfy $x^2 = 4x - 1$, that is $x^2 - 4x + 1 = 0$ — the lesson\'s running equation, and since $\\alpha \\neq \\beta$ they are precisely its two roots.',
      'So, $S = 4$ and $P = 1$ — the reads, with no solving.',
      'New sum: $\\dfrac{\\alpha}{\\beta} + \\dfrac{\\beta}{\\alpha} = \\dfrac{S^2 - 2P}{P} = \\dfrac{16 - 2}{1} = 14$.',
      'New product: $\\dfrac{\\alpha}{\\beta} \\cdot \\dfrac{\\beta}{\\alpha} = 1$.',
      'New equation: $y^2 - 14y + 1 = 0$ — its roots are $7 \\pm 4\\sqrt{3}$, and the verifier confirms $\\dfrac{2 + \\sqrt{3}}{2 - \\sqrt{3}} = (2 + \\sqrt{3})^2 = 7 + 4\\sqrt{3}$.',
      'Hence, $y^2 - 14y + 1 = 0$.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The same-ratio condition', text: 'The roots of $x^2 + px + q = 0$ and of $x^2 + bx + c = 0$ are in the same ratio if and only if $p^2 c = b^2 q$. The mechanism: equal ratios $\\alpha/\\beta = \\gamma/\\delta$ imply, by componendo and dividendo, $\\dfrac{(\\alpha + \\beta)^2}{(\\alpha - \\beta)^2} = \\dfrac{(\\gamma + \\delta)^2}{(\\gamma - \\delta)^2}$, and substituting the reads turns each side into $\\dfrac{S^2}{S^2 - 4P}$ — cross-multiplying gives $\\dfrac{q}{p^2} = \\dfrac{c}{b^2}$. For example, $x^2 - 5x + 6 = 0$ (roots $2, 3$) and $x^2 - 10x + 24 = 0$ (roots $4, 6$) both carry the ratio $2:3$, and indeed $25 \\times 24 = 600 = 100 \\times 6$.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'The JEE Main algebra syllabus names "relations between roots and coefficients" and "symmetric functions of roots" verbatim, and the question families are exactly this section\'s toolkit: the no-solve symmetric evaluation (one or two inventory lines), the transformed-equation demand (shifted, scaled, reciprocated, squared — the S′/P′ route), the high-power costume (the recurrence), and the same-ratio or given-relation parameter hunt. Single-correct and numerical-value formats both appear across JEE Main/Advanced, CUET and the state CETs; the EXAM_REGISTRY maps the shelf\'s coverage.' },

    { kind: 'heading', text: 'Repeated Roots: When the Two Doors Coincide' },
    { kind: 'callout', tone: 'definition', title: 'Repeated root (double root)', text: 'A real number $x_0$ is said to be a REPEATED ROOT (or double root) of $ax^2 + bx + c = 0$ when the two roots of the equation coincide at $x_0$. Algebraically this happens exactly when $D = b^2 - 4ac = 0$, and the repeated seat is forced to the vertex position: $x_0 = -\\dfrac{b}{2a}$. Thus, $f(x) = a(x - x_0)^2$ — the factor theorem with both factors equal — and 2.2\'s touching case is exactly this census: one door, visited twice.' },
    { kind: 'para', text: 'Two independent tests certify a repeated seat, and using both is the discipline: (i) the discriminant test $D = 0$; (ii) the seat test — the claimed seat $x_0$ satisfies the equation AND equals $-b/2a$. The vertex link is the geometric face of the algebra: 2.1\'s completion puts the minimum (or maximum) value $-D/4a$ at $-b/2a$, and $D = 0$ drops that value to zero — the parabola touches the axis exactly where its extreme sits. The census questions examinations set are richer: they hide the repeated root inside a FAMILY of equations with lettered coefficients, and the discriminant — after expansion — turns out to be a perfect square.' },
    { kind: 'example', title: 'Show that (a − b)x² + (b − c)x + (c − a) = 0 has a repeated root if and only if a is the arithmetic mean of b and c (a ≠ b)', steps: [
      'One root is free: $f(1) = (a - b) + (b - c) + (c - a) = 0$, so $x = 1$ always satisfies the equation.',
      'The discriminant: $D = (b - c)^2 - 4(a - b)(c - a)$.',
      'Expand honestly: $b^2 - 2bc + c^2 - 4ac + 4a^2 + 4bc - 4ab = 4a^2 + b^2 + c^2 + 2bc - 4ab - 4ac$.',
      'Recognise the square: $D = (2a - b - c)^2$ — ALWAYS non-negative, and zero exactly when $2a = b + c$.',
      'The repeated seat when $D = 0$: $x_0 = -\\dfrac{b - c}{2(a - b)} = \\dfrac{c - b}{2(a - b)}$; with $2a = b + c$ this lands on $x_0 = 1$, the free root — both doors collapse onto it.',
      'Witness: $(a, b, c) = (3, 2, 4)$ — $2(3) = 2 + 4$ — gives $x^2 - 2x + 1 = (x - 1)^2$, the repeated seat $1$. Non-witness $(3, 2, 5)$ gives $x^2 - 3x + 2 = (x - 1)(x - 2)$, distinct doors.',
      'Hence, repeated root $\\Leftrightarrow 2a = b + c$ ($a$ is the mean of $b$ and $c$); $D = (2a - b - c)^2$ is a perfect square.',
    ] },
    { kind: 'example', title: 'a, b, c are in geometric progression. Show that ax² + 2bx + c = 0 has a repeated root, and find when dx² + 2ex + f = 0 shares that seat', steps: [
      'GP means $b^2 = ac$. The discriminant: $D = 4b^2 - 4ac = 4(b^2 - ac) = 0$.',
      'So the equation has a repeated root, and it is the vertex seat $x_0 = -\\dfrac{2b}{2a} = -\\dfrac{b}{a}$.',
      'Witness: $(a, b, c) = (1, 2, 4)$ gives $x^2 + 4x + 4 = (x + 2)^2$, repeated seat $-2 = -b/a$.',
      'Sharing question: $dx^2 + 2ex + f = 0$ shares the seat $-b/a$ exactly when $d\\left(-\\dfrac{b}{a}\\right)^2 + 2e\\left(-\\dfrac{b}{a}\\right) + f = 0$.',
      'Clear the denominator $a^2$ and use $b^2 = ac$: $dac - 2eba + fa^2 = 0$, that is $dc + af = 2be$ after dividing by $a$.',
      'Divide by $bc$ (nonzero): $\\dfrac{d}{a} + \\dfrac{f}{c} = 2\\dfrac{e}{b}$ — the three ratios $d/a$, $e/b$, $f/c$ are in ARITHMETIC progression.',
      'Witness for the sharing: $(d, e, f) = (3, 5, 8)$ — ratios $3, 2.5, 2$, differences $-0.5$ — and indeed $3x^2 + 10x + 8$ vanishes at $x = -2$. Non-witness $(3, 5, 9)$: $3(4) - 20 + 9 = 1 \\neq 0$ — the seat is not shared.',
      'Hence, $D = 0$ with repeated seat $-b/a$; the seat is shared $\\Leftrightarrow d/a,\\ e/b,\\ f/c$ are in AP.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'A repeated seat is still ONE seat', text: 'The census trap: two equations sharing a repeated root share exactly ONE root — the seat is a single point even though its own equation counts it twice. Sharing a repeated seat is a one-common-root situation (next section\'s condition applies verbatim); it becomes a both-common situation only when the coefficient triples are ALSO proportional — for example $x^2$ and $2x^2$, where the proportionality $1/2 = 0/0$... is ill-posed and the honest check is the factorisation: both are $a\\,x^2 = a(x - 0)^2$, identical up to scale. Never answer "two roots common" from a shared double seat alone; the m-hunt in the next section prices the difference exactly.' },

    { kind: 'heading', text: 'Common Roots I: One Shared Door' },
    { kind: 'para', text: 'Two quadratic equations, $a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$, each own up to two doors. The census question: when do they share one? The answer is a condition on the six coefficients — derived by treating the unknown common seat as the unknown of a LINEAR system.' },
    { kind: 'callout', tone: 'definition', title: 'Common root', text: 'A real number $x_0$ is said to be a COMMON ROOT of the equations $f_1(x) = 0$ and $f_2(x) = 0$ if it satisfies both: $f_1(x_0) = 0$ AND $f_2(x_0) = 0$. Thus, the common roots are exactly the intersection of the two root sets — the doors both equations own.' },
    { kind: 'derivation', title: 'The one-common-root condition', statement: 'Let $\\alpha$ be a common root of $a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$. Then $(c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1)$, and the common seat is $\\alpha = \\dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}$ (when $a_1b_2 - a_2b_1 \\neq 0$).', steps: [
      { label: 'Name the unknowns', formula: 'a_1\\alpha^2 + b_1\\alpha + c_1 = 0, \\qquad a_2\\alpha^2 + b_2\\alpha + c_2 = 0', explanation: 'the common seat satisfies both equations — a pair of LINEAR equations in the two unknowns $\\alpha^2$ and $\\alpha$.' },
      { label: 'Eliminate the square', formula: '(a_2b_1 - a_1b_2)\\alpha + (a_2c_1 - a_1c_2) = 0', explanation: 'multiply the first equation by $a_2$, the second by $a_1$, subtract — the $\\alpha^2$ terms cancel.' },
      { label: 'Solve for the seat', formula: '\\alpha = \\dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}', explanation: 'signs normalised — the common seat is a ratio of coefficient crosses, licensed when $a_1b_2 - a_2b_1 \\neq 0$.' },
      { label: 'Eliminate the seat instead', formula: '\\alpha^2 = \\dfrac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}', explanation: 'multiply the first equation by $b_2$, the second by $b_1$, subtract — now the $\\alpha$ terms cancel.' },
      { label: 'Impose consistency', formula: '\\left(\\dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}\\right)^2 = \\dfrac{b_1c_2 - b_2c_1}{a_1b_2 - a_2b_1}', explanation: 'the two expressions price the SAME seat, so they must agree — this is the whole condition.' },
      { label: 'Clear the denominator', formula: '(c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1)', explanation: 'the boxed condition — and the verifier certifies it over a 160,000-pair integer grid against brute-force root intersection.' },
    ], result: '$(c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1)$ — with the common seat $\\alpha = \\dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}$ when the denominator cross is nonzero.' },
    { kind: 'callout', tone: 'insight', title: 'The cross arrangement, in our own words', text: 'Write the coefficient triples in two rows — $(a_1, b_1, c_1)$ over $(a_2, b_2, c_2)$. The condition reads: the square of the OUTER cross product ($c$ against $a$) equals the product of the two INNER cross products ($b$ against $c$, and $a$ against $b$). The arrangement is a bookkeeping device, not a substitute for the algebra — the derivation above is what earns the condition, and the derivation is what repairs it when an examination phrases the triples in a different order.' },
    { kind: 'example', title: 'The figure\'s pair: show that x² − 4x + 3 = 0 and x² − 2x − 3 = 0 share a root, and find it two ways', steps: [
      'The crosses: outer $c_1a_2 - c_2a_1 = 3(1) - (-3)(1) = 6$; inner $b_1c_2 - b_2c_1 = (-4)(-3) - (-2)(3) = 18$ and $a_1b_2 - a_2b_1 = (1)(-2) - (1)(-4) = 2$.',
      'The condition: $6^2 = 36$ and $18 \\times 2 = 36$ — it holds, so a common root exists.',
      'The formula: $\\alpha = \\dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1} = \\dfrac{6}{2} = 3$.',
      'The audit by factoring: $x^2 - 4x + 3 = (x - 1)(x - 3)$ and $x^2 - 2x - 3 = (x - 3)(x + 1)$ — the shared door is $3$, the private doors $1$ and $-1$.',
      'Both methods agree, and the figure draws the pair: two parabolas crossing the axis at a common seat.',
      'Hence, shared door $x = 3$ (condition $36 = 36$; formula and factorisation agree).',
    ] },
    { kind: 'example', title: 'Find every k for which x² − 6x + 8 = 0 and x² + kx − 10 = 0 have a common root', steps: [
      'Route one — the seats: $x^2 - 6x + 8 = (x - 2)(x - 4)$, so the candidates are $2$ and $4$.',
      'Seat $2$ in the second equation: $4 + 2k - 10 = 0$, so $k = 3$.',
      'Seat $4$: $16 + 4k - 10 = 0$, so $k = -\\dfrac{3}{2}$.',
      'Route two — the condition: outer cross $c_1a_2 - c_2a_1 = 8 + 10 = 18$; inner $b_1c_2 - b_2c_1 = 60 - 8k$ and $a_1b_2 - a_2b_1 = k + 6$.',
      'The condition: $324 = (60 - 8k)(k + 6)$, which expands to $8k^2 - 12k - 36 = 0$, that is $2k^2 - 3k - 9 = 0$.',
      'Factor: $(2k + 3)(k - 3) = 0$, so $k = 3$ or $k = -\\dfrac{3}{2}$ — the same two answers, route-independent.',
      'The substitution route found the seats; the determinant route found the parameter — together they are the audit.',
      'Hence, $k = 3$ (shared seat $2$) or $k = -\\dfrac{3}{2}$ (shared seat $4$).',
    ] },

    { kind: 'heading', text: 'Common Roots II: Both Doors Shared' },
    { kind: 'callout', tone: 'theorem', title: 'The proportionality condition', text: 'The equations $a_1x^2 + b_1x + c_1 = 0$ and $a_2x^2 + b_2x + c_2 = 0$ (all coefficients in proportion non-degenerate) have BOTH roots common if and only if the coefficient triples are proportional: $\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}$. The reason is structural: proportionality makes the two polynomials scalar multiples of one factorisation $a(x - \\alpha)(x - \\beta)$ — AL 9.4\'s a-family, two members of it. Conversely, if both roots are common, each equation is $a_i(x - \\alpha)(x - \\beta) = 0$, and the triples inherit the ratio $a_1/a_2$ throughout.' },
    { kind: 'para', text: 'Two census notes force the both-common verdict in settings where proportionality is not visible at a glance — and both are conjugate arguments:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) REAL coefficients, a shared NON-REAL root: a non-real root of a real-coefficient quadratic arrives with its conjugate — the roots of $ax^2 + bx + c$ are a conjugate pair whenever $D < 0$. So a second real-coefficient equation sharing the non-real root shares its conjugate too: both roots common, and the triples must be proportional.',
      '(ii) RATIONAL coefficients, a shared IRRATIONAL root $p + \\sqrt{q}$: the conjugate surd $p - \\sqrt{q}$ is the other root of the first equation (the irrational pair is forced by rational arithmetic), so the second equation sharing $p + \\sqrt{q}$ shares $p - \\sqrt{q}$ as well — again both common. No two distinct rational-coefficient quadratics share exactly one irrational surd of this shape.',
    ] },
    { kind: 'example', title: 'x² + 4x + 10 = 0 has non-real roots. If ax² + bx + c = 0 with a, b, c ∈ ℕ shares a root, find the least value of a + b + c', steps: [
      'The first equation\'s discriminant: $D = 16 - 40 = -24 < 0$ — both roots non-real.',
      'The shared root is therefore non-real; the second equation has REAL (indeed natural) coefficients, so census note (i) applies: both roots are common.',
      'Proportionality: $(a, b, c) = \\lambda(1, 4, 10)$ for some scalar $\\lambda$.',
      'Naturality: $\\lambda \\in \\mathbb{N}$ — so $(a, b, c) = (1, 4, 10), (2, 8, 20), (3, 12, 30), \\ldots$',
      'The sums: $15, 30, 45, \\ldots$ — the least is $15$ at $\\lambda = 1$ (itself, i.e. the same equation).',
      'The verifier brute-forces every natural triple with $a + b + c < 15$ and confirms none is proportional to $(1, 4, 10)$.',
      'Hence, least $a + b + c = 15$, at $(a, b, c) = (1, 4, 10)$.',
    ] },
    { kind: 'example', title: 'Find every m for which x² + mx + 6 = 0 and x² + 6x + m = 0 have both roots common — and contrast with the one-shared census', steps: [
      'Both common demands proportionality: $\\dfrac{1}{1} = \\dfrac{m}{6} = \\dfrac{6}{m}$.',
      'The first ratio pins the scale: $\\dfrac{m}{6} = 1$ gives $m = 6$; the second $\\dfrac{6}{m} = 1$ agrees — $m = 6$, and the equations coincide ($x^2 + 6x + 6 = 0$, $D = 12 > 0$: real shared doors).',
      'The contrast — the one-shared census: a brute-force sweep over $m \\in [-20, 20]$ finds TWO sharing values, $m = -7$ and $m = 6$.',
      'At $m = -7$: $x^2 - 7x + 6 = (x - 1)(x - 6)$ and $x^2 + 6x - 7 = (x + 7)(x - 1)$ — exactly ONE shared seat, $x = 1$; the ratios $1, -7/6, -6/7$ are not all equal, so proportionality fails.',
      'The determinant condition agrees at $m = -7$: outer cross $6 + 7 = 13$, inner crosses $49 - 36 = 13$ and $6 + 7 = 13$ — $13^2 = 13 \\times 13$, the one-common verdict.',
      'One shared door is NOT two: $m = -7$ and $m = 6$ share, but only $m = 6$ shares BOTH.',
      'Hence, both common $\\Leftrightarrow m = 6$; the one-shared census is $\\{-7, 6\\}$ — the standing witness that the conditions differ.',
    ] },
    { kind: 'example', title: 'The equations x² + ax + 16 = 0, x² + bx + 20 = 0 and x² + (a + b)x + 52 = 0 have a common positive root. Find a and b', steps: [
      'Let the common root be $r$. Then: $r^2 + ar + 16 = 0$, $r^2 + br + 20 = 0$, $r^2 + (a + b)r + 52 = 0$.',
      'Add the first two: $2r^2 + (a + b)r + 36 = 0$.',
      'Subtract this from the third: $-r^2 + 16 = 0$ — the $a$, $b$ terms cancel: $r^2 = 16$.',
      'So, $r = \\pm 4$; the demand is the POSITIVE root: $r = 4$.',
      'Back-substitute: $16 + 4a + 16 = 0$ gives $a = -8$; $16 + 4b + 20 = 0$ gives $b = -9$.',
      'Audit the third: $16 + 4(-17) + 52 = 0$ ✓. The root sets: $x^2 - 8x + 16 = (x - 4)^2$ — the common root is a REPEATED seat there; $x^2 - 9x + 20 = (x - 4)(x - 5)$; $x^2 - 17x + 52 = (x - 4)(x - 13)$.',
      'The full census: the only positive root common to all three is $4$ — and the repeated-seat witness shows why "one shared seat" language was the honest frame all along.',
      'Hence, $a = -8$, $b = -9$ (common positive root $4$; the first equation holds it doubly).',
    ] },
    { kind: 'callout', tone: 'warn', title: 'One shared ≠ both shared — the exam trap', text: 'The $m$-hunt above is the trap in miniature: TWO values of $m$ produce a shared door, ONE produces a shared pair. An examination option set that offers $m = \\pm 6$ (the square-root reflex on $m^2 = 36$ from misapplied cross-multiplication) is pricing exactly this confusion — at $m = -6$ the equations $x^2 - 6x + 6$ (roots $3 \\pm \\sqrt{3}$) and $x^2 + 6x - 6$ (roots $-3 \\pm \\sqrt{15}$) share nothing. The certificate for "both common" is PROPORTIONALITY, never a squared equation alone; the determinant condition certifies "at least one common", and proportionality is the extra gate that upgrades the verdict.' },
    { kind: 'callout', tone: 'exam', title: 'Where this is examined', text: 'Common roots appear across JEE Main/Advanced, CUET and state CETs in four costumes: the determinant-condition hunt (find the parameter), the proportionality verdict (both roots common — often via the non-real or irrational conjugate notes), the cyclic trio (one shared seat across three equations, the $f(1) = 0$ free root), and the three-equation add-and-subtract census. Single-correct options love the one-shared-both-shared distinction this lesson priced; the EXAM_REGISTRY maps the coverage.' },

    { kind: 'figure', caption: 'The mirror read of x² − 6x + 5 = 0 — roots 1 and 5 mirror about 3; the sum bracket, the product rectangle and the symmetric-read tags are all coefficient reads.', svg: `<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The roots 1 and 5 of x squared minus 6 x plus 5 mirror about 3; the sum bracket, the product rectangle and three symmetric-read tags"><rect x="0" y="0" width="720" height="360" fill="#fffdf5"/><text x="30" y="34" font-size="17" font-weight="bold" fill="#166534">the mirror read of x² − 6x + 5 = 0</text><line x1="60" y1="200" x2="660" y2="200" stroke="#16a34a" stroke-width="1.6"/><path d="M 660 200 l -10 -4 l 0 8 z" fill="#16a34a"/><line x1="135" y1="196" x2="135" y2="204" stroke="#65a30d" stroke-width="1.4"/><line x1="285" y1="196" x2="285" y2="204" stroke="#65a30d" stroke-width="1.4"/><line x1="435" y1="196" x2="435" y2="204" stroke="#65a30d" stroke-width="1.4"/><line x1="585" y1="196" x2="585" y2="204" stroke="#65a30d" stroke-width="1.4"/><text x="135" y="222" font-size="13" fill="#65a30d" text-anchor="middle">0</text><text x="285" y="222" font-size="13" fill="#65a30d" text-anchor="middle">2</text><text x="435" y="222" font-size="13" fill="#65a30d" text-anchor="middle">4</text><text x="585" y="222" font-size="13" fill="#65a30d" text-anchor="middle">6</text><circle cx="210" cy="200" r="6" fill="#16a34a"/><circle cx="510" cy="200" r="6" fill="#16a34a"/><text x="210" y="248" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">α = 1</text><text x="510" y="248" font-size="14" font-weight="bold" fill="#166534" text-anchor="middle">β = 5</text><line x1="360" y1="90" x2="360" y2="200" stroke="#d97706" stroke-width="1.6" stroke-dasharray="6 4"/><text x="360" y="78" font-size="13" fill="#d97706" text-anchor="middle">mirror x = 3 = −b/2a</text><line x1="210" y1="120" x2="510" y2="120" stroke="#ea580c" stroke-width="1.6"/><path d="M 210 120 l 10 -4 l 0 8 z" fill="#ea580c"/><path d="M 510 120 l -10 -4 l 0 8 z" fill="#ea580c"/><text x="360" y="56" font-size="14" font-weight="bold" fill="#ea580c" text-anchor="middle">S = α + β = 6</text><rect x="530" y="120" width="24" height="24" fill="#5eead4" stroke="#0d9488" stroke-width="1.2"/><rect x="554" y="120" width="24" height="24" fill="#5eead4" stroke="#0d9488" stroke-width="1.2"/><rect x="578" y="120" width="24" height="24" fill="#5eead4" stroke="#0d9488" stroke-width="1.2"/><rect x="602" y="120" width="24" height="24" fill="#5eead4" stroke="#0d9488" stroke-width="1.2"/><rect x="626" y="120" width="24" height="24" fill="#5eead4" stroke="#0d9488" stroke-width="1.2"/><text x="596" y="163" font-size="13" fill="#0f766e" text-anchor="middle">P = αβ = 5</text><text x="596" y="106" font-size="12" fill="#0d9488" text-anchor="middle">the 1 × 5 rectangle</text><text x="470" y="278" font-size="13" fill="#65a30d">α² + β² = S² − 2P = 36 − 10 = 26</text><text x="470" y="300" font-size="13" fill="#65a30d">|α − β| = √(S² − 4P) = √16 = 4</text><text x="470" y="322" font-size="13" fill="#65a30d">1/α + 1/β = S/P = 6/5</text><text x="30" y="278" font-size="13" fill="#65a30d">α / β + β / α =</text><text x="30" y="300" font-size="13" fill="#65a30d">(S² − 2P)/P</text><text x="30" y="322" font-size="13" fill="#65a30d">= 26/5</text><text x="360" y="348" font-size="12" fill="#0d9488" text-anchor="middle">the pair (1, 5) mirrors about 3 — every symmetric read is a coefficient read</text></svg>` },

    { kind: 'figure', caption: 'Two parabolas, one shared door — f₁ = x² − 4x + 3 (doors 1, 3) and f₂ = x² − 2x − 3 (doors −1, 3) meet the axis together at x = 3; the cross condition 6² = 36 = 18 × 2 certifies the share.', svg: `<svg viewBox="0 0 720 380" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The parabolas f1 equals x squared minus 4 x plus 3 with doors 1 and 3, and f2 equals x squared minus 2 x minus 3 with doors minus 1 and 3, sharing the door at 3; the cross condition 6 squared equals 18 times 2"><rect x="0" y="0" width="720" height="380" fill="#fffdf5"/><text x="30" y="30" font-size="17" font-weight="bold" fill="#166534">two parabolas, one shared door: f₁(3) = f₂(3) = 0</text><line x1="60" y1="220" x2="680" y2="220" stroke="#d97706" stroke-width="1.4"/><path d="M 680 220 l -10 -4 l 0 8 z" fill="#d97706"/><line x1="285" y1="40" x2="285" y2="350" stroke="#d97706" stroke-width="1.4"/><path d="M 285 40 l -4 10 l 8 0 z" fill="#d97706"/><line x1="210" y1="216" x2="210" y2="224" stroke="#d97706" stroke-width="1.2"/><line x1="360" y1="216" x2="360" y2="224" stroke="#d97706" stroke-width="1.2"/><line x1="435" y1="216" x2="435" y2="224" stroke="#d97706" stroke-width="1.2"/><line x1="510" y1="216" x2="510" y2="224" stroke="#d97706" stroke-width="1.2"/><line x1="585" y1="216" x2="585" y2="224" stroke="#d97706" stroke-width="1.2"/><text x="210" y="240" font-size="12" fill="#d97706" text-anchor="middle">−1</text><text x="360" y="240" font-size="12" fill="#d97706" text-anchor="middle">1</text><text x="435" y="240" font-size="12" fill="#d97706" text-anchor="middle">2</text><text x="510" y="240" font-size="12" fill="#d97706" text-anchor="middle">3</text><text x="585" y="240" font-size="12" fill="#d97706" text-anchor="middle">4</text><text x="292" y="58" font-size="12" fill="#d97706">y</text><polyline points="247,115 285,160 322,195 360,220 397,235 435,240 472,235 510,220 547,195 585,160 622,115" fill="none" stroke="#16a34a" stroke-width="2.4"/><polyline points="135,120 172,175 210,220 247,255 285,280 322,295 360,300 397,295 435,280 472,255 510,220 547,175 585,120" fill="none" stroke="#0d9488" stroke-width="2.4"/><circle cx="510" cy="220" r="8" fill="none" stroke="#ea580c" stroke-width="2.4"/><circle cx="510" cy="220" r="3" fill="#ea580c"/><circle cx="360" cy="220" r="4.5" fill="#16a34a"/><circle cx="210" cy="220" r="4.5" fill="#0d9488"/><text x="520" y="198" font-size="14" font-weight="bold" fill="#ea580c">shared door x = 3</text><text x="360" y="272" font-size="12" fill="#166534" text-anchor="middle">door 1</text><text x="200" y="272" font-size="12" fill="#0f766e" text-anchor="middle">door −1</text><text x="435" y="262" font-size="12" fill="#166534" text-anchor="middle">f₁ vertex (2, −1)</text><text x="360" y="322" font-size="12" fill="#0f766e" text-anchor="middle">f₂ vertex (1, −4)</text><line x1="470" y1="60" x2="500" y2="60" stroke="#16a34a" stroke-width="2.4"/><text x="508" y="65" font-size="13" fill="#166534">f₁ = x² − 4x + 3 (doors 1, 3)</text><line x1="470" y1="84" x2="500" y2="84" stroke="#0d9488" stroke-width="2.4"/><text x="508" y="89" font-size="13" fill="#0f766e">f₂ = x² − 2x − 3 (doors −1, 3)</text><text x="360" y="371" font-size="13" fill="#0d9488" text-anchor="middle">the crosses: outer 6, inner 18 and 2 — 6² = 36 = 18 × 2, the one-common condition holds</text></svg>` },

    { kind: 'terms', items: [
      { term: "Viète's relations", def: "The reads $\\alpha + \\beta = -b/a$ and $\\alpha\\beta = c/a$ tying the root pair of $ax^2 + bx + c = 0$ to its coefficients — derived from the factorisation $a(x - \\alpha)(x - \\beta)$ and valid for every root type." },
      { term: 'symmetric function of the roots', def: 'An expression $E(\\alpha, \\beta)$ unchanged by the swap $\\alpha \\leftrightarrow \\beta$; every such expression is computable from $S$ and $P$ alone, while asymmetric expressions (like the signed $\\alpha - \\beta$) are not.' },
      { term: 'transformation of an equation', def: 'Rebuilding the equation whose roots are $g(\\alpha), g(\\beta)$ for a designed $g$ — by the S′/P′ route, the substitution route, or both routes run as mutual audits.' },
      { term: 'power-sum recurrence', def: 'The iteration $T_{k+2} = -\\tfrac{b}{a}T_{k+1} - \\tfrac{c}{a}T_k$ with $T_0 = 2$, $T_1 = S$, pricing every power sum $\\alpha^k + \\beta^k$ from the coefficients alone.' },
      { term: 'repeated root (double root)', def: 'The coincident seat $x_0 = -b/2a$ occurring exactly when $D = 0$; the factorisation collapses to $a(x - x_0)^2$ and the parabola touches the axis at its vertex.' },
      { term: 'common root', def: 'A real seat satisfying two equations at once; certified for one shared door by the determinant condition $(c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1)$.' },
      { term: 'proportionality condition', def: 'The both-common certificate $a_1/a_2 = b_1/b_2 = c_1/c_2$ — the two equations are scalar multiples of one factorisation (members of AL 9.4\'s a-family).' },
    ] },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'For the equation $3x^2 - 9x + 2 = 0$, what is $\\alpha + \\beta + \\alpha\\beta$?', options: ['$-\\dfrac{11}{3}$', '$3$', '$\\dfrac{11}{3}$', '$\\dfrac{2}{3}$'], answer: 2, explain: 'The reads are $S = -\\frac{-9}{3} = 3$ and $P = \\frac{2}{3}$, so the demand is $S + P = \\frac{11}{3}$. The option $-\\frac{11}{3}$ is the sign reflex on the minus in $-b/a$ — the minus belongs to the DEFINITION and has already been applied to the coefficient $-9$; $3$ prices only the sum and $\\frac{2}{3}$ only the product, while the demand asked for both reads added. No solving ever needed — that is the whole point of the section.' },
      { q: 'If $\\alpha, \\beta$ are the roots of $x^2 - 6x + 5 = 0$, then $\\alpha^2 + \\beta^2$ equals:', options: ['$16$', '$26$', '$36$', '$46$'], answer: 1, explain: '$S = 6$, $P = 5$, so $\\alpha^2 + \\beta^2 = S^2 - 2P = 36 - 10 = 26$. Each distractor is a real formula misremembered: $16$ is $(\\alpha - \\beta)^2 = S^2 - 4P$ — a different symmetric read; $36$ is $S^2$ alone (dropping the $-2P$); $46$ adds $2P$ instead of subtracting. The roots themselves ($1$ and $5$) would give $1 + 25 = 26$, but the no-solve route prices it in one line.' },
      { q: 'The equation whose roots are the reciprocals of the roots of $2x^2 + 5x + 2 = 0$ is:', options: ['$2x^2 + 5x + 2 = 0$ itself', '$x^2 + 5x + 2 = 0$', '$2x^2 - 5x + 2 = 0$', '$x^2 - 5x + 2 = 0$'], answer: 0, explain: 'Reciprocating the roots reverses the coefficient triple — here $(2, 5, 2)$ reversed is $(2, 5, 2)$: a PALINDROME, so the equation is its own reciprocal. Concretely the roots are $-2$ and $-\\frac{1}{2}$, a reciprocal pair, so the reciprocal equation has the same root set. $x^2 + 5x + 2$ drops the leading coefficient; the two $-5x$ options flip the middle sign, which the reversal never touches. The reversal law needs $c \\neq 0$ — satisfied here.' },
      { q: 'The equations $x^2 - 5x + 6 = 0$ and $x^2 - 7x + 12 = 0$ have which common root?', options: ['no common root', '$2$', '$3$', '$4$'], answer: 2, explain: 'Factoring: $(x - 2)(x - 3)$ has doors $\\{2, 3\\}$ and $(x - 3)(x - 4)$ has doors $\\{3, 4\\}$ — the intersection is $\\{3\\}$. The determinant condition agrees: the outer cross $6 - 12 = -6$ squares to $36$, and the inner crosses $(-60 + 42) = -18$ and $(-7 + 5) = -2$ multiply to $36$. Root $2$ belongs only to the first equation and $4$ only to the second — each distractor is one equation\'s private door.' },
      { q: 'Both roots of $x^2 + mx + 6 = 0$ and $x^2 + 6x + m = 0$ are common. Then m equals:', options: ['$6$ only', '$\\pm 6$', '$36$', 'no such $m$'], answer: 0, explain: 'Both common forces proportionality $\\frac{1}{1} = \\frac{m}{6} = \\frac{6}{m}$, giving $m = 6$ — and at $m = 6$ the equations coincide with $D = 12 > 0$. The tempting $\\pm 6$ is the square-root reflex on $m^2 = 36$ from a misapplied cross-multiplication: at $m = -6$ the ratios are $1, -1, -1$ — NOT proportional — and $x^2 - 6x + 6$ (roots $3 \\pm \\sqrt{3}$) shares nothing with $x^2 + 6x - 6$ (roots $-3 \\pm \\sqrt{15}$). The lesson\'s census found $m = -7$ shares ONE root — one shared door is not two.' },
    ] },

    { kind: 'exercises', title: 'Exercises 2.3', sets: [
      { level: 'L1', questions: [
        { q: 'For $5x^2 - 12x + 4 = 0$, find $\\alpha^2 + \\beta^2$ without solving the equation.', solution: [
          'The reads: $S = \\dfrac{12}{5}$ and $P = \\dfrac{4}{5}$.',
          'The inventory line (i): $\\alpha^2 + \\beta^2 = S^2 - 2P$.',
          'Substitute: $\\dfrac{144}{25} - \\dfrac{8}{5} = \\dfrac{144 - 40}{25} = \\dfrac{104}{25}$.',
          'Check by formula roots $\\dfrac{6 \\pm \\sqrt{14}}{5}$: their squares sum to $\\dfrac{104}{25}$ — the verifier certifies it to nine decimals.',
        ], answer: '$\\dfrac{104}{25}$' },
        { q: 'Form the quadratic equation whose roots are $3$ and $-7$.', solution: [
          'Sum: $S = 3 + (-7) = -4$. Product: $P = 3(-7) = -21$.',
          'The reconstruction law: $x^2 - Sx + P = 0$.',
          'Substituting: $x^2 + 4x - 21 = 0$.',
          'Factor audit: $(x - 3)(x + 7)$ expands to exactly that.',
        ], answer: '$x^2 + 4x - 21 = 0$' },
      ] },
      { level: 'L2', questions: [
        { q: 'For $2x^2 - 7x + 5 = 0$, find $\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta} + \\alpha\\beta$.', solution: [
          'The reads: $S = \\dfrac{7}{2}$, $P = \\dfrac{5}{2}$ — and $P \\neq 0$, so the reciprocal read is licensed.',
          '$\\dfrac{1}{\\alpha} + \\dfrac{1}{\\beta} = \\dfrac{S}{P} = \\dfrac{7/2}{5/2} = \\dfrac{7}{5}$.',
          'The demand adds $P$: $\\dfrac{7}{5} + \\dfrac{5}{2} = \\dfrac{14 + 25}{10} = \\dfrac{39}{10}$.',
        ], answer: '$\\dfrac{39}{10}$' },
        { q: 'The roots of $x^2 - 6x + 8 = 0$ are each increased by 2. Form the new equation.', solution: [
          'New sum: $S\' = S + 4 = 6 + 4 = 10$ (each root contributes $+2$).',
          'New product: $P\' = (\\alpha + 2)(\\beta + 2) = P + 2S + 4 = 8 + 12 + 4 = 24$.',
          'New equation: $y^2 - 10y + 24 = 0$.',
          'Substitution audit: $x = y - 2$ into the original gives $(y-2)^2 - 6(y-2) + 8 = y^2 - 10y + 24$ — same equation, routes agree (the new roots are $4$ and $6$).',
        ], answer: '$y^2 - 10y + 24 = 0$' },
      ] },
      { level: 'L3', questions: [
        { q: 'For $2x^2 - 9x + 8 = 0$, find $|\\alpha - \\beta|$.', solution: [
          'The reads: $S = \\dfrac{9}{2}$, $P = 4$.',
          'The difference square: $(\\alpha - \\beta)^2 = S^2 - 4P = \\dfrac{81}{4} - 16 = \\dfrac{17}{4}$.',
          'The absolute value: $|\\alpha - \\beta| = \\sqrt{\\dfrac{17}{4}} = \\dfrac{\\sqrt{17}}{2}$.',
          'Audit: the formula roots $\\dfrac{9 \\pm \\sqrt{17}}{4}$ differ by exactly $\\dfrac{2\\sqrt{17}}{4} = \\dfrac{\\sqrt{17}}{2}$ — agree.',
        ], answer: '$\\dfrac{\\sqrt{17}}{2}$' },
        { q: 'The equation $x^2 - 13x + c = 0$ has consecutive positive integer roots. Find c.', solution: [
          'Consecutive roots $n, n+1$: the gap is $1$, so $(\\alpha - \\beta)^2 = 1$.',
          'The difference identity: $S^2 - 4P = 169 - 4c = 1$.',
          'So, $c = \\dfrac{168}{4} = 42$.',
          'Audit: $x^2 - 13x + 42 = (x - 6)(x - 7)$ — consecutive indeed.',
        ], answer: '$c = 42$ (roots $6$ and $7$)' },
        { q: 'Find every $k$ for which $x^2 - 6x + 8 = 0$ and $x^2 + kx - 10 = 0$ have a common root.', solution: [
          'Factor the first: $(x - 2)(x - 4)$ — candidate seats $2$ and $4$.',
          'Seat $2$: $4 + 2k - 10 = 0$ gives $k = 3$.',
          'Seat $4$: $16 + 4k - 10 = 0$ gives $k = -\\dfrac{3}{2}$.',
          'Determinant audit: the condition $18^2 = (60 - 8k)(k + 6)$ expands to $2k^2 - 3k - 9 = 0 = (2k+3)(k-3)$ — the same two values, route-independent.',
        ], answer: '$k = 3$ (shared seat $2$) or $k = -\\dfrac{3}{2}$ (shared seat $4$)' },
      ] },
      { level: 'L4', questions: [
        { q: 'The squared difference of the roots of $x^2 - px + 30 = 0$ is $49$. Find every possible p.', solution: [
          'Reads: $S = p$, $P = 30$.',
          'The difference identity: $(\\alpha - \\beta)^2 = S^2 - 4P = p^2 - 120 = 49$.',
          'So, $p^2 = 169$ and $p = \\pm 13$.',
          'Audit $p = 13$: $x^2 - 13x + 30 = (x - 3)(x - 10)$ — gap $7$, square $49$ ✓. Audit $p = -13$: $x^2 + 13x + 30 = (x + 3)(x + 10)$ — same gap.',
        ], answer: '$p = \\pm 13$' },
        { q: 'For $3x^2 - 6x + 2 = 0$, form the equation whose roots are $\\alpha^2$ and $\\beta^2$.', solution: [
          'Reads: $S = 2$, $P = \\dfrac{2}{3}$; the squares read: $\\alpha^2 + \\beta^2 = S^2 - 2P = 4 - \\dfrac{4}{3} = \\dfrac{8}{3}$.',
          'New product: $\\alpha^2\\beta^2 = P^2 = \\dfrac{4}{9}$.',
          'New equation: $y^2 - \\dfrac{8}{3}y + \\dfrac{4}{9} = 0$, cleared by $9$: $9y^2 - 24y + 4 = 0$.',
          'Numeric audit: the roots $1 \\pm \\tfrac{\\sqrt{3}}{3}$ square to $\\approx 2.488$ and $\\approx 0.179$, which are exactly the roots of $9y^2 - 24y + 4$ — the verifier agrees to nine decimals.',
        ], answer: '$9y^2 - 24y + 4 = 0$' },
        { q: 'If $a + b + c = 0$ (all nonzero), show that the three cyclic equations $ax^2 + bx + c = 0$, $bx^2 + cx + a = 0$ and $cx^2 + ax + b = 0$ share the root $1$. Verify on $(a, b, c) = (1, 2, -3)$.', solution: [
          'Evaluate each left side at $x = 1$: $a + b + c$, $b + c + a$, $c + a + b$ — all three equal $0$ by hypothesis.',
          'So, $x = 1$ is a root of all three equations: one shared seat across the trio.',
          'Witness $(1, 2, -3)$: $x^2 + 2x - 3 = (x - 1)(x + 3)$; $2x^2 - 3x + 1 = (2x - 1)(x - 1)$; $-3x^2 + x + 2 = -(3x + 2)(x - 1)$.',
          'Each carries the door $1$ (plus private doors $-3$, $\\tfrac{1}{2}$, $-\\tfrac{2}{3}$) — the $f(1) = 0$ free-root device, the same one the repeated-root section used.',
        ], answer: '$x = 1$ satisfies each cyclic equation when $a + b + c = 0$ (witness verified)' },
      ] },
      { level: 'L5', questions: [
        { q: 'x² + 4x + 10 = 0 has non-real roots. If ax² + bx + c = 0 with a, b, c ∈ ℕ shares a root of it, find the least value of a + b + c.', solution: [
          'Discriminant: $D = 16 - 40 = -24 < 0$ — both roots non-real.',
          'The shared root is non-real; the second equation has real coefficients, so its roots are a conjugate pair and BOTH roots are common.',
          'Both common forces proportionality: $(a, b, c) = \\lambda(1, 4, 10)$ with $\\lambda \\in \\mathbb{N}$.',
          'The sums: $15\\lambda$ — the least is $15$ at $\\lambda = 1$.',
          'Brute-force audit: no natural triple with sum below $15$ is proportional to $(1, 4, 10)$ — the verifier confirms over all triples up to $30^3$.',
        ], answer: '$15$' },
        { q: 'Show that there is no real k for which $2x^2 + 3x + 5 = 0$ and $2x^2 + kx - 5 = 0$ have a common root.', solution: [
          'The first discriminant: $D_1 = 9 - 40 = -31 < 0$ — non-real roots only.',
          'A shared root would be non-real, forcing both roots common (real coefficients on the second equation), hence proportionality.',
          'Proportionality demands $\\dfrac{2}{2} = \\dfrac{3}{k} = \\dfrac{5}{-5}$: the last ratio is $-1$ while the first is $1$ — already a contradiction.',
          'The determinant route agrees: outer cross $5(2) - (-5)(2) = 20$ squares to $400$; inner $(3)(-5) - 5k = -15 - 5k$ and $2k - 6$; the condition $(-15 - 5k)(2k - 6) = 400$ expands to $-10(k^2 - 9) = 400$, that is $k^2 = -31$ — no real seat.',
          'Both routes certify: no real $k$ exists.',
        ], answer: 'no real $k$ exists ($k^2 = -31$ by the condition; proportionality contradicted directly)' },
        { q: 'Show that $(a - b)x^2 + (b - c)x + (c - a) = 0$ has equal roots if and only if $2a = b + c$, and verify on a witness.', solution: [
          'The free root first: $f(1) = (a - b) + (b - c) + (c - a) = 0$, so $x = 1$ always satisfies it.',
          'The discriminant: $D = (b - c)^2 - 4(a - b)(c - a)$, which expands to $4a^2 + b^2 + c^2 + 2bc - 4ab - 4ac$.',
          'Recognise: $D = (2a - b - c)^2$ — a perfect square, non-negative always, zero exactly at $2a = b + c$.',
          'So, equal roots $\\Leftrightarrow D = 0 \\Leftrightarrow 2a = b + c$, and the double seat is the free root $1$.',
          'Witness $(3, 2, 4)$: $2(3) = 2 + 4$ ✓, and the equation is $x^2 - 2x + 1 = (x - 1)^2$. Non-witness $(3, 2, 5)$: $x^2 - 3x + 2 = (x-1)(x-2)$, distinct.',
        ], answer: 'equal roots $\\Leftrightarrow 2a = b + c$; $D = (2a - b - c)^2$; witness $(3, 2, 4)$' },
      ] },
      { level: 'L6', questions: [
        { q: 'The equations x² + ax + 16 = 0, x² + bx + 20 = 0 and x² + (a + b)x + 52 = 0 have a common positive root. Find a and b, and name the structure the first equation hides.', solution: [
          'Let $r$ be the common root; write all three: $r^2 + ar + 16 = 0$, $r^2 + br + 20 = 0$, $r^2 + (a+b)r + 52 = 0$.',
          'Add the first two: $2r^2 + (a + b)r + 36 = 0$.',
          'Subtract from the third: $-r^2 + 16 = 0$ — the lettered terms cancel: $r^2 = 16$, so $r = \\pm 4$.',
          'The positive demand: $r = 4$. Back-substitute: $a = -\\dfrac{32}{4} = -8$ and $b = -\\dfrac{36}{4} = -9$.',
          'Audit the third: $16 + 4(-17) + 52 = 0$ ✓.',
          'The structure: $x^2 - 8x + 16 = (x - 4)^2$ — the common root is a REPEATED seat of the first equation, held doubly there and singly by the other two (roots $\\{4, 5\\}$ and $\\{4, 13\\}$): one shared seat, counted with multiplicity only in its own house.',
        ], answer: '$a = -8$, $b = -9$; the first equation is $(x - 4)^2$' },
        { q: 'Prove that the roots of $x^2 + px + q = 0$ and $x^2 + bx + c = 0$ are in the same ratio only if $p^2 c = b^2 q$, and verify the witness $(-5, 6, -10, 24)$.', solution: [
          'Same ratio means $\\dfrac{\\alpha}{\\beta} = \\dfrac{\\gamma}{\\delta}$ for the respective root pairs.',
          'Componendo and dividendo on both sides: $\\dfrac{\\alpha + \\beta}{\\alpha - \\beta} = \\dfrac{\\gamma + \\delta}{\\gamma - \\delta}$, hence $\\dfrac{(\\alpha + \\beta)^2}{(\\alpha - \\beta)^2} = \\dfrac{(\\gamma + \\delta)^2}{(\\gamma - \\delta)^2}$.',
          'Substitute the reads: each side is $\\dfrac{S^2}{S^2 - 4P}$ — so $\\dfrac{p^2}{p^2 - 4q} = \\dfrac{b^2}{b^2 - 4c}$.',
          'Cross-multiply and cancel $p^2b^2$ from both: $-4p^2c = -4b^2q$, that is $p^2c = b^2q$.',
          'Witness $(-5, 6, -10, 24)$: $x^2 - 5x + 6 = (x - 2)(x - 3)$ and $x^2 - 10x + 24 = (x - 4)(x - 6)$ — both carry the ratio $2 : 3$, and $25 \\times 24 = 600 = 100 \\times 6$ ✓.',
        ], answer: '$p^2 c = b^2 q$; witness ratios $2:3$ and $2:3$ with $600 = 600$' },
      ] },
    ] },

    { kind: 'formula', name: "Viète's two reads", latex: '\\alpha + \\beta = -\\dfrac{b}{a}, \\qquad \\alpha\\beta = \\dfrac{c}{a}', note: 'Valid for every root type — the factorisation $a(x - \\alpha)(x - \\beta)$ is an identity, so the reads never need the roots computed.' },
    { kind: 'formula', name: 'The reconstruction law', latex: 'x^2 - Sx + P = 0', note: 'The monic equation with prescribed sum and product; the general family $a(x^2 - Sx + P) = 0$ shares the same root set (the a-family).' },
    { kind: 'formula', name: 'The symmetric inventory', latex: '\\alpha^2+\\beta^2 = S^2-2P;\\quad \\alpha^3+\\beta^3 = S^3-3PS;\\quad (\\alpha-\\beta)^2 = S^2-4P;\\quad \\dfrac{1}{\\alpha}+\\dfrac{1}{\\beta} = \\dfrac{S}{P};\\quad \\dfrac{\\alpha}{\\beta}+\\dfrac{\\beta}{\\alpha} = \\dfrac{S^2-2P}{P};\\quad \\alpha^4+\\beta^4 = (S^2-2P)^2-2P^2', note: 'Every symmetric read in one card; the square-root read $\\sqrt{S + 2\\sqrt{P}}$ is licensed only when $\\alpha, \\beta \\geq 0$.' },
    { kind: 'formula', name: 'The power-sum recurrence', latex: 'T_{k+2} = -\\dfrac{b}{a}\\,T_{k+1} - \\dfrac{c}{a}\\,T_k, \\qquad T_0 = 2,\\ T_1 = S', note: 'Prices any $\\alpha^k + \\beta^k$ by iteration — the engine behind the high-power costumes (and the Lucas numbers inside $x^2 - x - 1 = 0$).' },
    { kind: 'formula', name: 'The one-common-root condition', latex: '(c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1), \\qquad \\alpha = \\dfrac{c_1a_2 - c_2a_1}{a_1b_2 - a_2b_1}', note: 'The outer cross squared equals the product of the two inner crosses; the common seat is a ratio of crosses.' },
    { kind: 'formula', name: 'The both-common proportionality + the repeated seat', latex: '\\dfrac{a_1}{a_2} = \\dfrac{b_1}{b_2} = \\dfrac{c_1}{c_2}; \\qquad D = 0 \\Rightarrow x_0 = -\\dfrac{b}{2a}', note: 'Proportionality is the only both-common certificate (the conjugate notes force it for non-real/irrational shared roots); a repeated seat is still ONE shared door.' },
  ],
}

/* ------------------------------------------------------------------ */
/* lesson 2.4                                                          */
/* ------------------------------------------------------------------ */

const lesson24: Lesson = {
  id: 'aa-location-of-roots-doors-in-intervals',
  number: '2.4',
  title: 'Location of Roots: Doors in Intervals',
  concepts: [
    'the k-system: one a·f(k) principle answers every location question',
    'the master census: one family, fifteen verdicts, three boundary seats',
    'the fixed point of a pencil: f(3) = 1 settles a verdict before it is asked',
    'roots between roots: evaluate the outer quadratic at the inner walls',
    'the substitution bridge: the range of the substitution IS the wall',
    "Rolle's read — and its two honesty notes",
    'the interleaving census: λμ decides which bracket holds each door',
    'the wall demands and the add-the-walls certificate',
  ],
  objectives: [
    'read all six location rows — both roots beyond a wall, a wall between the roots, exactly one inside, both inside, both walls between — from the single a·f(k) principle, knowing exactly when the discriminant check may be skipped',
    'run a complete fifteen-part census on a one-parameter family, pricing every verdict including the empty ones and the boundary seats honestly',
    'locate the doors of one quadratic between the doors of another by evaluating the outer at the inner walls',
    'carry location questions through substitutions — t = x² + 2x + 3 with its [2, ∞) range, t = cos x with its [−1, 1] range — because the range is the wall',
    "state Rolle's between-roots corollary and the antiderivative trick, and respect both honesty notes: agreeing signs force nothing, and a derivative root does not force two straddling doors",
    'price the full interleaving census — where each door sits for every sign pattern of μ and λ — and certify for-all-x interval demands with the add-the-walls certificate',
  ],
  prerequisites: ['aa-vertex-form-at-work-maxima-and-minima', 'aa-quadratic-inequalities-and-the-sign-diagram', 'al-the-parabola-quadratic-graphs-and-vertices'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'ncert-math10-ch4-quadratic', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra gave every root its door metaphor; lesson 2.2 fenced the sign bands and built the four-condition bridge for the single question "are BOTH doors inside a chosen interval?". This lesson completes the location craft. First the six location questions — both doors beyond a wall, a wall between the doors, exactly one door inside, both inside, both walls between the doors — collapse into ONE principle, the k-system, whose every row is read off the sign of $a \\cdot f(k)$. Then one carefully designed family faces all fifteen location questions at once, and the census exposes three honest boundary seats the formula routes miss. The doors then meet two deeper games: the doors of ONE quadratic bracketing the doors of ANOTHER, and the substitution bridges that hide walls inside quartics and trigonometric equations — where the range of the substitution quietly becomes the wall. The chapter closes its arc with Rolle\'s read: between two doors of a function sits a turning seat of its derivative, the antiderivative trick that turns a coefficient identity into a located root, and the two honesty notes that keep the whole craft truthful. One running family, $x^2 - (m+1)x + 3m - 5$, threads the lesson; its fixed point $(3, 1)$ will settle verdicts before they are asked.' },

    { kind: 'heading', text: 'The k-System: One Principle, Every Question' },
    { kind: 'para', text: 'Fix $f(x) = ax^2 + bx + c$ with $a \\neq 0$, and fix a number $k$ — a WALL on the number line. The location question is always some version of: where do the doors $\\alpha, \\beta$ stand relative to the wall? Lesson 2.2 answered the both-inside version with four conditions and justified each from the sign diagram. The deeper observation is that all six standard versions flow from one algebraic fact.' },
    { kind: 'callout', tone: 'definition', title: 'Location of roots and the wall', text: 'The LOCATION OF ROOTS question for $ax^2 + bx + c = 0$ asks for the position of its real doors relative to fixed numbers $k, k_1, k_2$ (called WALLS) — for example "both roots exceed $k$", "exactly one root lies in $(k_1, k_2)$". Thus, "both roots of $f$ lie in $(k_1, k_2)$" means $k_1 < \\alpha$ and $\\beta < k_2$ with the doors counted twice at a double root, and "the wall $k$ lies between the roots" means $\\alpha < k < \\beta$ strictly.' },
    { kind: 'callout', tone: 'theorem', title: 'The a·f(k) principle', text: 'Let $f(x) = ax^2 + bx + c$ ($a \\neq 0$) have real doors $\\alpha \\leq \\beta$. Then $a \\cdot f(k) = a^2(k - \\alpha)(k - \\beta)$, so $a \\cdot f(k) > 0$ exactly when $k$ lies OUTSIDE the open interval $(\\alpha, \\beta)$, and $a \\cdot f(k) < 0$ exactly when $k$ lies strictly BETWEEN the doors. The $a^2$ factor is why the test reads $a \\cdot f(k)$ rather than $f(k)$: multiplying by the leading coefficient strips the opening direction out of the comparison.' },
    { kind: 'derivation', title: 'Why the a·f(k) read works', statement: "For real doors α ≤ β, the sign of a·f(k) is the sign of (k − α)(k − β) — the wall's position relative to the door pair, independent of the parabola's opening.", steps: [
      { label: 'Factor', formula: 'f(x) = a(x - \\alpha)(x - \\beta)', explanation: 'The factor theorem writes the quadratic through its doors whenever they are real — this is the same identity that carried Viète\'s reads in lesson 2.3.' },
      { label: 'Evaluate at the wall', formula: 'a \\cdot f(k) = a^2 (k - \\alpha)(k - \\beta)', explanation: 'Multiply both sides by $a$; the leading coefficient now appears squared.' },
      { label: 'Sign of the square', formula: 'a^2 > 0', explanation: 'A nonzero square is positive, so the SIGN of $a \\cdot f(k)$ is the sign of the product $(k - \\alpha)(k - \\beta)$ — the opening direction of the parabola has left the problem entirely.' },
      { label: 'Read the product', formula: '(k - \\alpha)(k - \\beta) > 0 \\iff k < \\alpha \\text{ or } k > \\beta', explanation: 'A product of two reals is positive exactly when both factors share a sign: both positive ($k$ right of the larger door) or both negative ($k$ left of the smaller door). Between the doors the factors disagree and the product is negative.' },
      { label: 'Conclude', formula: 'a \\cdot f(k) > 0 \\iff k \\notin (\\alpha, \\beta), \\quad a \\cdot f(k) < 0 \\iff \\alpha < k < \\beta', explanation: 'One identity prices every wall test. The axis condition rides along: $-\\tfrac{b}{2a} = \\tfrac{\\alpha + \\beta}{2}$ is the midpoint of the doors, so comparing the axis with a wall compares the door-pair\'s centre with it.' },
    ], result: 'a \\cdot f(k) = a^2(k - \\alpha)(k - \\beta):\\quad a \\cdot f(k) > 0 \\iff k \\text{ outside the doors},\\quad a \\cdot f(k) < 0 \\iff k \\text{ between them}' },
    { kind: 'para', text: 'The principle assembles the whole system. "Both doors beyond $k$" wants $k$ outside the pair AND on the correct side — hence the axis condition $-\\tfrac{b}{2a} > k$ (or $< k$). "Both doors in $(k_1, k_2)$" wants both walls outside the pair with the pair between them — hence $a \\cdot f(k_1) > 0$, $a \\cdot f(k_2) > 0$ and $k_1 < -\\tfrac{b}{2a} < k_2$. And the between-rows need no discriminant check at all.' },
    { kind: 'table', caption: 'The k-system: every location question as conditions on the coefficients (the exam table, one principle deep)', head: ['the question', 'the conditions', 'D check?'], rows: [
      ['both roots $> k$', '$D \\geq 0$, $\\;a \\cdot f(k) > 0$, $\\;-\\tfrac{b}{2a} > k$', 'yes'],
      ['both roots $< k$', '$D \\geq 0$, $\\;a \\cdot f(k) > 0$, $\\;-\\tfrac{b}{2a} < k$', 'yes'],
      ['$k$ between the roots ($\\alpha < k < \\beta$)', '$a \\cdot f(k) < 0$', 'NO — a sign change forces two real doors'],
      ['exactly one root in $(k_1, k_2)$', '$f(k_1) \\cdot f(k_2) < 0$', 'NO — the sign change certifies it (boundary seat: see the caution below)'],
      ['both roots in $(k_1, k_2)$', '$D \\geq 0$, $\\;a \\cdot f(k_1) > 0$, $\\;a \\cdot f(k_2) > 0$, $\\;k_1 < -\\tfrac{b}{2a} < k_2$', 'yes'],
      ['both walls between the roots ($\\alpha < k_1 < k_2 < \\beta$)', '$a \\cdot f(k_1) < 0$ and $a \\cdot f(k_2) < 0$', 'NO — both sign changes certify it'],
      ['roots of opposite sign ($\\alpha < 0 < \\beta$)', '$a \\cdot f(0) < 0$, i.e. $ac < 0$', 'NO — the row above at $k = 0$'],
    ] },
    { kind: 'callout', tone: 'warn', title: 'The D-skip is earned, not free', text: 'The three rows marked NO genuinely need no discriminant: $a \\cdot f(k) < 0$ means the continuous curve takes a value of sign opposite to its leading coefficient, so it must cross the axis — two real doors exist automatically (this is the intermediate value theorem wearing its algebra hat). The rows marked YES are different: $a \\cdot f(k) > 0$ is ALSO satisfied by a parabola that never dips to the axis at all. The family $x^2 - 2x + 5$ passes every wall test at $k = 1$ and $k = 5$ ($f(1) = 4$, $f(5) = 20$, axis $1$) while owning NO real doors ($D = -16$). Drop the discriminant from those rows and the always-positive impostors walk straight in.' },
    { kind: 'callout', tone: 'warn', title: 'The boundary seat the product test misses', text: 'The exactly-one row reads $f(k_1) \\cdot f(k_2) < 0$, which catches the generic picture: one wall between the doors, the other outside. But a door sitting exactly ON a wall gives $f(k_i) = 0$, and then the honest count must be done by hand: a door on the open edge of $(k_1, k_2)$ does NOT lie inside, while its partner might. The census below manufactures this seat at $m = \\tfrac{5}{2}$ — watch it arrive, and price it honestly when it does.' },
    { kind: 'example', title: 'Read x² − 9x + 20 against the walls 2 and 6 in both directions', steps: [
      'Factor first: $x^2 - 9x + 20 = (x - 4)(x - 5)$, so the doors are $4$ and $5$ — real, distinct, axis $4.5$.',
      'Both-inside, table route: $D = 81 - 80 = 1 \\geq 0$ ✓; $a \\cdot f(2) = 4 - 18 + 20 = 6 > 0$ ✓ (wall 2 outside-left); $a \\cdot f(6) = 36 - 54 + 20 = 2 > 0$ ✓ (wall 6 outside-right); $2 < 4.5 < 6$ ✓.',
      'Hence, both doors lie in $(2, 6)$ — four green checks, the 2.2 bridge crossing on the first try.',
      'Now, the k-relative read on the same machine with wall $k = 3$: $a \\cdot f(3) = 9 - 27 + 20 = 2 > 0$ and axis $4.5 > 3$, so both doors exceed $3$.',
      'Counter-case for the same question: $x^2 - 6x + 5 = (x - 1)(x - 5)$ against wall $3$: $f(3) = 9 - 18 + 5 = -4 < 0$, so $3$ sits BETWEEN the doors — the both-beyond read fails before the axis is even consulted.',
      'Hence, the table prices both directions: membership checks and failure checks are the same rows read forwards and backwards.',
    ],},
    { kind: 'callout', tone: 'exam', title: 'Where the examinations take this', text: 'The JEE Main syllabus line for this chapter names "location of roots" explicitly — between the discriminant work of 2.1, the sign diagram of 2.2 and this lesson\'s k-system sits the entire examined craft. The standard patterns: a parameter family put through a multi-part census; "find the values of k so that exactly one root lies in an interval"; the both-roots-inside interval hunt with the axis condition as the silent eliminator; and the at-least-one-root questions that resolve into one sign product. Every one of them is a row of the table above — the skill being recognising WHICH row the words describe.' },

    { kind: 'heading', text: 'The Master Census: One Family, Fifteen Questions' },
    { kind: 'para', text: 'The examination\'s favourite location vehicle is a ONE-PARAMETER FAMILY put through many questions at once. This lesson\'s family is designed for the purpose:' },
    { kind: 'equation', latex: 'f(x) = x^2 - (m + 1)x + 3m - 5, \\qquad m \\in \\mathbb{R}', note: 'where $D = (m+1)^2 - 4(3m - 5) = (m - 3)(m - 7)$, the sum is $m + 1$, the product is $3m - 5$, and the axis is $\\tfrac{m+1}{2}$' },
    { kind: 'para', text: 'Before any question is asked, one gift falls out. Collect the $m$-terms: $f(x) = (x^2 - x - 5) + m(3 - x)$. At $x = 3$ the $m$-coefficient $3 - x$ vanishes and $f(3) = 9 - 3 - 5 = 1$ — for EVERY $m$. All the parabolas of the family pass through the single point $(3, 1)$: a PENCIL of curves rotating about a fixed point. The walls for the census are chosen at $1$ and $3$; note also the two double-root seats: $m = 3$ collapses the family to $(x - 2)^2$ (door $2$) and $m = 7$ to $(x - 4)^2$ (door $4$).' },
    { kind: 'callout', tone: 'insight', title: 'The fixed point prices verdicts before they are asked', text: 'A pencil\'s fixed point is free information. Since $f(3) = 1 > 0$ for every $m$, the wall $3$ can NEVER lie strictly between the doors — the graph is above the axis at $3$ always, so $3$ sits outside the open door-interval for every family member. One evaluation has already answered the fifteenth census question below. Fixed points turn location questions into readings instead of computations.' },
    { kind: 'example', title: 'Census part (i)–(iii): the discriminant reads', steps: [
      'The discriminant: $D = (m - 3)(m - 7)$, a parabola in $m$ opening upward with zeros $3$ and $7$.',
      '(i) Real and distinct doors need $D > 0$: $m \\in (-\\infty, 3) \\cup (7, \\infty)$.',
      '(ii) Equal doors need $D = 0$: $m \\in \\{3, 7\\}$ — the double seats $(x - 2)^2$ and $(x - 4)^2$.',
      '(iii) No real doors need $D < 0$: $m \\in (3, 7)$ — the family floats above the axis there.',
      'Hence, the discriminant census: distinct on $(-\\infty, 3) \\cup (7, \\infty)$, equal exactly at $\\{3, 7\\}$, non-real on $(3, 7)$.',
    ],},
    { kind: 'example', title: 'Census part (iv)–(viii): the sign reads', steps: [
      '(iv) Opposite signs mean the product is negative: $3m - 5 < 0$, so $m < \\tfrac{5}{3}$. No discriminant check — an opposite-sign product already forces real doors (the row at $k = 0$).',
      '(v) Equal magnitude, opposite sign means the sum vanishes: $m + 1 = 0$ so $m = -1$, PROVIDED the doors are real: $D = (-4)(-8) = 32 > 0$ ✓. The witness: $f(x) = x^2 - 8$, doors $\\pm 2\\sqrt{2}$. This seat EXISTS — a census honesty worth checking, since many designed families have this part empty.',
      '(vi) Both positive needs sum $> 0$ AND product $> 0$ AND $D \\geq 0$: $m > -1$, $m > \\tfrac{5}{3}$, and $m \\leq 3$ or $m \\geq 7$.',
      'Intersecting: $m \\in \\left(\\tfrac{5}{3},\\ 3\\right] \\cup [7, \\infty)$ — the double seat $m = 3$ (door $2 > 0$) and $m = 7$ (door $4 > 0$) both count.',
      '(vii) Both negative needs sum $< 0$ AND product $> 0$: $m < -1$ AND $m > \\tfrac{5}{3}$ — EMPTY. The sum door and the product door never open together: no $m$ sends both roots negative. An empty verdict is still a verdict.',
      '(viii) At least one positive = (iv) or (vi), plus the product-zero seat: at $m = \\tfrac{5}{3}$ the doors are $0$ and $\\tfrac{8}{3}$ — the second one positive, so the seat qualifies. Collecting: $m \\in (-\\infty, 3] \\cup [7, \\infty)$.',
      'Hence, the sign census — and notice (viii) is EXACTLY the real-door set of (i)–(ii): because both-negative is impossible for this family, every real member owns a positive door.',
    ],},
    { kind: 'example', title: 'Census part (ix)–(xi): the single-wall reads at k = 1', steps: [
      '(ix) The wall $1$ between the doors: $f(1) < 0$. Compute $f(1) = 1 - (m + 1) + 3m - 5 = 2m - 5$.',
      'So, $2m - 5 < 0$ gives $m < \\tfrac{5}{2}$ — and no discriminant check: a negative value at the wall forces two real doors straddling it.',
      '(x) Both doors exceed $1$: $a \\cdot f(1) > 0$ and axis $> 1$ and $D \\geq 0$: $m > \\tfrac{5}{2}$, $\\tfrac{m+1}{2} > 1$ (i.e. $m > 1$), and $m \\leq 3$ or $m \\geq 7$.',
      'Intersecting: $m \\in \\left(\\tfrac{5}{2},\\ 3\\right] \\cup [7, \\infty)$ — the wall test does the real work; the axis demand is swallowed by $m > \\tfrac{5}{2}$.',
      '(xi) Both doors below $1$: $a \\cdot f(1) > 0$ wants $m > \\tfrac{5}{2}$, while axis $< 1$ wants $m < 1$ — EMPTY. The honest reason: whenever the axis sits left of $1$ ($m < 1$), $f(1) = 2m - 5 < -3 < 0$, so the wall is already BETWEEN the doors.',
      'Hence, the single-wall census: between-roots on $(-\\infty, \\tfrac{5}{2})$, both-beyond on $(\\tfrac{5}{2}, 3] \\cup [7, \\infty)$, both-below never.',
    ],},
    { kind: 'example', title: 'Census part (xii)–(xv): the interval reads on (1, 3)', steps: [
      '(xii) Exactly one door in $(1, 3)$: the product test $f(1) \\cdot f(3) < 0$. Since $f(3) = 1$ always, this is $(2m - 5) \\cdot 1 < 0$, i.e. $m < \\tfrac{5}{2}$.',
      'But now the boundary seat arrives: at $m = \\tfrac{5}{2}$ the doors are $1$ and $\\tfrac{5}{2}$ — the door $1$ sits ON the open edge (not inside), while $\\tfrac{5}{2}$ IS inside. The honest count: exactly one door inside. So the full verdict is $m \\leq \\tfrac{5}{2}$, with the seat $m = \\tfrac{5}{2}$ added by hand — the product test reads $0$ there and stays silent.',
      '(xiii) Both doors in $(1, 3)$: $D \\geq 0$, $f(1) > 0$, $f(3) = 1 > 0$, and $1 < \\tfrac{m+1}{2} < 3$. The axis condition unwinds to $1 < m < 5$; the walls give $m > \\tfrac{5}{2}$; the discriminant gives $m \\leq 3$ or $m \\geq 7$.',
      'Intersecting: $m \\in \\left(\\tfrac{5}{2},\\ 3\\right]$ — non-empty, and the double seat $m = 3$ (both doors at $2$) qualifies because a double door inside counts twice.',
      '(xiv) At least one door in $(1, 3)$ = (xii) or (xiii), boundary seats included: $(-\\infty, \\tfrac{5}{2}] \\cup (\\tfrac{5}{2}, 3] = (-\\infty, 3]$. For every $m \\leq 3$ some door sits inside; for $m \\in (3, 7)$ there are no doors at all; for $m \\geq 7$ both doors sit at or beyond $4$.',
      '(xv) One door beyond $3$, the other below $1$: this wants BOTH walls between the doors — $f(1) < 0$ and $f(3) < 0$. But $f(3) = 1 > 0$ for every $m$: the fixed point keeps the graph above the axis at the wall $3$, so the wall $3$ can never fall between the doors. EMPTY — and the pencil\'s geometry, not a computation, is the reason.',
      'Hence, the interval census — with two empty verdicts, each carrying its own reason, and one boundary seat the product test could not see.',
    ],},
    { kind: 'figure', caption: 'The census family as a pencil. Four members of $x^2 - (m+1)x + 3m - 5$ — all passing through the fixed point $(3, 1)$. Teal, $m = 0$: doors $-1.79$ and $2.79$, so the wall $1$ sits between them and exactly one door lies in $(1, 3)$. Amber, $m = 3$: the double door $2$, both doors inside $(1, 3)$. Orange, $m = 7$: the double door $4$, both doors beyond the wall $3$ — the axis split of the fixed-point law. Lime, $m = 5$: the vertex parks exactly ON the fixed point and the member owns no real doors at all. The dashed walls stand at $1$ and $3$; the ring marks $(3, 1)$, where every member\'s graph passes — above the axis, always, which is precisely why the wall $3$ never falls between the doors.', svg: pencilFixedPointSvg() },
    { kind: 'para', text: 'One more deep read closes the census. Questions (ix) and (xii) — "the wall $1$ between the doors" and "exactly one door in $(1, 3)$" — returned the same family of answers, and the picture says why: the fixed point pins the LARGER door strictly below $3$ for every $m \\leq 3$, so whenever the wall $1$ is between the doors, the larger door automatically lands in $(1, 3)$. On a generic family the two questions differ; here they coincide except at the single seat $m = \\tfrac{5}{2}$, where the wall-door $1$ sits exactly on the interval\'s open edge: "between the roots" says no (the door equals the wall), "exactly one inside" says yes (the partner $\\tfrac{5}{2}$ is in). Boundary seats are where location questions come apart — and where honest counting earns its keep.' },
    { kind: 'callout', tone: 'insight', title: 'The fixed-point law, stated precisely', text: 'For every $m$ for which the family has real doors, the wall $3$ lies OUTSIDE the open door interval — the pair never straddles $3$. The axis then splits the verdict: for $m \\leq 3$ the axis $\\tfrac{m+1}{2} \\leq 2 < 3$ and both doors lie below $3$; for $m \\geq 7$ the axis $\\geq 4 > 3$ and both doors lie above $3$. Proof shape: $f(3) = 1 > 0$ puts $3$ outside the open interval $(\\alpha, \\beta)$; since $\\alpha \\leq \\text{axis} \\leq \\beta$, the axis side of $3$ decides which side the whole pair sits on. The exercise ladder asks for this proof with the case split done honestly.' },

    { kind: 'heading', text: 'Roots Between Roots: Two Quadratics' },
    { kind: 'para', text: 'The next game lifts the wall idea one level: instead of fixed numbers as walls, use the DOORS OF A SECOND QUADRATIC. When does $x^2 - 10x + 21 = (x - 3)(x - 7)$ have both its doors between the doors of another equation? The method is the walls-between row in reverse: evaluate the OUTER quadratic at the INNER doors. If the outer curve is negative at both inner doors (with the outer opening upward), both inner doors sit inside the outer\'s door interval.' },
    { kind: 'example', title: 'Find every m for which the doors of x² − 10x + 21 lie between the doors of 2x² − (3m+4)x + 2m² − 11m + 26', steps: [
      'Name the outer family $g(x) = 2x^2 - (3m + 4)x + 2m^2 - 11m + 26$; it opens upward ($a = 2 > 0$).',
      'The demand: both inner doors $3$ and $7$ strictly inside the outer door interval — the walls-between row with the walls now being doors.',
      'Evaluate the outer at the inner walls: $g(3) = 18 - 9(3m + 4)/2 \\cdot 2 + 2m^2 - 11m + 26$. Compute directly: $g(3) = 2m^2 - 20m + 32 = 2(m - 2)(m - 8)$.',
      'And $g(7) = 2m^2 - 32m + 96 = 2(m - 4)(m - 12)$.',
      'Both must be negative: $2(m - 2)(m - 8) < 0$ gives $m \\in (2, 8)$; $2(m - 4)(m - 12) < 0$ gives $m \\in (4, 12)$.',
      'Intersecting: $m \\in (4, 8)$ — and no discriminant check is needed for $g$: a negative value of an upward parabola forces two real doors.',
      'Witness $m = 6$: $g(x) = 2x^2 - 22x + 32 = 2(x^2 - 11x + 16)$, doors $\\tfrac{11 \\pm \\sqrt{57}}{2} \\approx 1.72$ and $9.27$ — indeed $1.72 < 3 < 7 < 9.27$.',
      'Boundary honesty: at $m = 4$, $g(7) = 0$ — an outer door sits exactly ON the wall $7$, so "strictly between" fails; at $m = 8$, $g(3) = 0$ likewise.',
      'Hence, $m \\in (4, 8)$, with both boundary seats excluded by strictness.',
    ],},
    { kind: 'callout', tone: 'insight', title: 'Evaluate the outer at the inner', text: 'The between-quadratics method is one sentence: treat the inner equation\'s doors as walls and run the walls-between row on the outer equation. The inner doors are usually factorable by design (choose them!), so the wall values come out as clean factored expressions in the parameter — and the negativity of the outer at those walls makes its own discriminant check unnecessary. The design freedom is real: this exhibit\'s coefficients were built backward from the wanted verdicts $(2,8)$ and $(4,12)$.' },

    { kind: 'heading', text: 'Disguised Walls: Substitution Bridges' },
    { kind: 'para', text: 'The hardest-looking location questions hide their walls inside a substitution. The principle that survives every disguise: THE RANGE OF THE SUBSTITUTION IS THE WALL. A quartic in $x$ that is secretly a quadratic in $t = x^2 + 2x + 3$ has a real door exactly when the $t$-quadratic has a door in $[2, \\infty)$ — because $t = (x + 1)^2 + 2$ covers $[2, \\infty)$ EXACTLY as $x$ runs over the reals. A trigonometric quadratic in $\\cos x$ has a real solution exactly when its $t$-quadratic has a door in $[-1, 1]$.' },
    { kind: 'example', title: 'For which a does (x² + 2x + 6)² − (a − 2)(x² + 2x + 3)(x² + 2x + 6) + (a − 3)(x² + 2x + 3)² = 0 have at least one real root?', steps: [
      'Substitute $t = x^2 + 2x + 3$; then $x^2 + 2x + 6 = t + 3$, and the equation reads $(t + 3)^2 - (a - 2)t(t + 3) + (a - 3)t^2 = 0$.',
      'Expand and collect: $t^2 + 6t + 9 - (a - 2)(t^2 + 3t) + (a - 3)t^2 = (12 - 3a)t + 9 = 0$ — the $t^2$ terms cancel by design, leaving a LINEAR collapse.',
      'So, $t = \\dfrac{3}{a - 4}$ (for $a \\neq 4$; at $a = 4$ the equation reads $9 = 0$ and has no root at all).',
      'The range is the wall: $t$ must lie in $[2, \\infty)$, so $\\dfrac{3}{a - 4} \\geq 2$.',
      'Solve the wall: $\\dfrac{3}{a - 4} \\geq 2 \\iff \\dfrac{11 - 2a}{a - 4} \\geq 0 \\iff a \\in \\left(4, \\tfrac{11}{2}\\right]$ — the pole at $a = 4$ is open, the zero at $\\tfrac{11}{2}$ is closed.',
      'Witness $a = 5$: $t = 3$, so $x^2 + 2x + 3 = 3$ gives $x \\in \\{0, -2\\}$ ✓. Exclusion $a = 3$: $t = -3$, below the wall — and indeed the original expression becomes $3(x^2 + 2x + 6) > 0$, never zero.',
      'The boundary $a = \\tfrac{11}{2}$ is the gem: $t = 2$ EXACTLY — the minimum of the substitution. Then $x^2 + 2x + 3 = 2$ forces $(x + 1)^2 = 0$, the single root $x = -1$: the $t$-door sits on the wall and the quartic touches zero tangentially. Boundary seats on substitution walls are tangent moments.',
      'Hence, $a \\in \\left(4, \\tfrac{11}{2}\\right]$, the right end being the tangent seat $x = -1$.',
    ],},
    { kind: 'example', title: 'For which k does cos²x − k cos x − 2 = 0 have a real solution?', steps: [
      'Substitute $t = \\cos x \\in [-1, 1]$ — the range is the wall, now a CLOSED finite interval.',
      'The $t$-quadratic $t^2 - kt - 2$ has product $-2 < 0$ of its roots: one positive door $\\tfrac{k + \\sqrt{k^2 + 8}}{2}$ and one negative door $\\tfrac{k - \\sqrt{k^2 + 8}}{2}$, always real ($D = k^2 + 8 > 0$).',
      'The positive door lands in $[-1, 1]$ exactly when $\\tfrac{k + \\sqrt{k^2 + 8}}{2} \\leq 1$, i.e. $\\sqrt{k^2 + 8} \\leq 2 - k$ — which forces $k \\leq 2$ and, on squaring, $k^2 + 8 \\leq 4 - 4k + k^2$, i.e. $k \\leq -1$.',
      'The negative door lands in $[-1, 1]$ exactly when $\\tfrac{k - \\sqrt{k^2 + 8}}{2} \\geq -1$, i.e. $\\sqrt{k^2 + 8} \\leq k + 2$ — forcing $k \\geq -2$ and, on squaring, $8 \\leq 4k + 4$, i.e. $k \\geq 1$.',
      'So, a real solution exists for $k \\leq -1$ (the positive door inside) OR $k \\geq 1$ (the negative door inside): $|k| \\geq 1$.',
      'Witnesses: $k = -1$ gives $t^2 + t - 2 = (t + 2)(t - 1)$, door $t = 1 = \\cos x$ at $x = 0$ ✓; $k = 1$ gives $t^2 - t - 2 = (t - 2)(t + 1)$, door $t = -1 = \\cos x$ at $x = \\pi$ ✓. Exclusion $k = 0$: doors $\\pm\\sqrt{2}$, both outside $[-1, 1]$ — no solution.',
      'Hence, $|k| \\geq 1$ — with BOTH branches needed: each sign of $k$ smuggles one door into the wall interval.',
    ],},
    { kind: 'callout', tone: 'insight', title: 'The range is the wall — closed or open matters', text: 'Every substitution bridge is the same three moves: substitute, solve the collapsed equation, then price the door against the substitution\'s RANGE. The range\'s endpoint behaviour decides the boundary seats: $t = x^2 + 2x + 3$ ATTAINS its minimum $2$ (at $x = -1$), so a $t$-door at $2$ is a real, tangential solution; $t = \\cos x$ attains both endpoints $\\pm 1$, so doors at the wall count. A substitution whose extremum is not attained would make the corresponding seat empty — check attainment before certifying a boundary.' },

    { kind: 'heading', text: "Rolle's Read and Its Honesty" },
    { kind: 'para', text: 'The last instrument is not about quadratics — it is about EVERY polynomial, and it locates roots by counting TURNS. A polynomial\'s graph is continuous (no jumps) and smooth (a unique tangent at every point). Michel Rolle\'s 1691 observation: if such a curve starts and ends a stretch at the SAME height, it must have turned somewhere in between.' },
    { kind: 'callout', tone: 'theorem', title: "Rolle's theorem (the algebra reader's form)", text: "If $y = f(x)$ is continuous on $[a, b]$, differentiable on $(a, b)$, and $f(a) = f(b)$, then there is at least one seat $c \\in (a, b)$ with $f'(c) = 0$ — a horizontal tangent, a TURNING SEAT. The polynomial corollary this lesson cashes: between any two distinct roots of $f(x) = 0$ sits at least one root of $f'(x) = 0$. Polynomials inherit both hypotheses free of charge: continuity and differentiability everywhere." },
    { kind: 'example', title: "Between the doors of (x − 1)(x − 3)(x − 5), locate the turning seats", steps: [
      'Expand to keep the derivative honest: $f(x) = x^3 - 9x^2 + 23x - 15$.',
      'The doors: $f(1) = f(3) = f(5) = 0$ — three doors, two gaps $(1, 3)$ and $(3, 5)$.',
      "Differentiate: $f'(x) = 3x^2 - 18x + 23$, itself a quadratic with $D = 324 - 276 = 48 > 0$ — two real seats.",
      "The seats: $x = \\dfrac{18 \\pm \\sqrt{48}}{6} = 3 \\pm \\dfrac{2\\sqrt{3}}{3} \\approx 1.845$ and $4.155$.",
      'Check the corollary: $1 < 1.845 < 3$ ✓ and $3 < 4.155 < 5$ ✓ — one turning seat per gap, exactly as promised.',
      'Hence, the seats $3 \\pm \\tfrac{2\\sqrt{3}}{3}$ — one between each consecutive pair of doors.',
    ],},
    { kind: 'para', text: 'The examination runs the corollary BACKWARDS through an antiderivative: to LOCATE a root of $ax^2 + bx + c = 0$, invent the cubic whose derivative it is, and engineer equal endpoint values.' },
    { kind: 'example', title: 'Given 4a + 3b + 3c = 0, prove ax² + bx + c = 0 has a root in (0, 2)', steps: [
      'Build the antiderivative: $F(x) = \\dfrac{a}{3}x^3 + \\dfrac{b}{2}x^2 + cx + d$ — then $F\'(x) = ax^2 + bx + c$, exactly the given quadratic.',
      'Price the endpoints: $F(0) = d$ and $F(2) = \\dfrac{8a}{3} + 2b + 2c + d = \\dfrac{2(4a + 3b + 3c)}{3} + d = d$, by the given identity.',
      'So, $F(0) = F(2)$ — and $F$ is a polynomial, continuous and differentiable everywhere.',
      "By Rolle's theorem there is a seat $c^* \\in (0, 2)$ with $F'(c^*) = 0$ — that is, $a(c^*)^2 + bc^* + c = 0$.",
      'Hence, the quadratic owns a door strictly inside $(0, 2)$ — located without ever solving it.',
      'Witness $(a, b, c) = (3, -4, 0)$: $4(3) + 3(-4) + 0 = 0$ ✓, and $3x^2 - 4x = x(3x - 4)$ has its doors at $0$ and $\\tfrac{4}{3}$ — the interior door $\\tfrac{4}{3} \\in (0, 2)$, as promised.',
    ],},
    { kind: 'callout', tone: 'insight', title: 'The weights are the interval', text: 'The endpoint identity $F(\\ell) = F(0)$ reads $\\dfrac{a\\ell^3}{3} + \\dfrac{b\\ell^2}{2} + c\\ell = 0$, which after clearing fractions is $2a\\ell^2 + 3b\\ell + 6c = 0$. So the antiderivative trick has a general law: $ax^2 + bx + c = 0$ has a door in $(0, \\ell)$ whenever $2a\\ell^2 + 3b\\ell + 6c = 0$. The classical seat $\\ell = 1$ carries the weights $2, 3, 6$; the lesson\'s seat $\\ell = 2$ gives $4, 3, 3$; the exercise ladder\'s seat $\\ell = 3$ gives $6, 3, 2$. The weights ARE the interval in disguise — recognising them in a problem statement is the whole tell.' },
    { kind: 'callout', tone: 'warn', title: 'Honesty note 1: agreeing signs force nothing', text: 'A sign CHANGE across an interval forces a root — that is the intermediate value theorem, and it is why the $a \\cdot f(k) < 0$ rows skip the discriminant. But the converse is FALSE, and the trap is set every year: $g(-2) = g(2) = 3 > 0$ for $g(x) = x^2 - 1$, yet BOTH doors $\\pm 1$ sit inside $(-2, 2)$. Meanwhile $h(x) = x^2 + 1$ has the same agreeing signs and NO doors at all. Agreeing endpoint signs settle nothing: the doors may be two, one, or none. Every "no sign change" verdict needs a different instrument — the discriminant, the vertex, or a monotonicity argument.' },
    { kind: 'callout', tone: 'warn', title: 'Honesty note 2: the reverse Rolle read fails', text: "The corollary runs ONE way: two doors of $f$ force a turning seat of $f'$ between them. A turning seat of $f'$ does NOT force two doors of $f$ straddling it. Witness $f(x) = x^3 + 1 = (x + 1)(x^2 - x + 1)$: the derivative $f'(x) = 3x^2$ has the seat $x = 0$, yet $f$ owns exactly ONE real door, $x = -1$ — nothing straddles $0$. The one-way street is structural: turns can happen above or below the axis; only IVT-grade sign information pins doors." },
    { kind: 'example', title: 'Run both honesty witnesses to the end', steps: [
      'Witness A (doors despite agreeing signs): $g(x) = x^2 - 1$ on $(-2, 2)$: $g(-2) = g(2) = 3$, signs agree — yet $g(-1) = g(1) = 0$ with both doors strictly inside.',
      'Witness B (no doors, same signature): $h(x) = x^2 + 1$ on $(-2, 2)$: $h(-2) = h(2) = 5$, signs agree — and $D = -4 < 0$, no real doors anywhere.',
      'The pair teaches the read: agreeing signs admit BOTH verdicts, so they certify NEITHER.',
      "The reverse-Rolle witness alongside: $f(x) = x^3 + 1$ has $f'(x) = 3x^2$ with the seat $0$; the single door is $-1$, sitting LEFT of the seat — no straddle in sight.",
      'Hence, sign data locates doors only through CHANGES; turn data locates doors only through PAIRS OF DOORS. Both one-way, both honest.',
    ],},

    { kind: 'heading', text: 'The Interleaving Census: Where Each Door Sits' },
    { kind: 'para', text: 'Lesson 2.2 proved the interleaving gem: for $a < b < c < d$, the equation $\\mu(x - a)(x - c) + \\lambda(x - b)(x - d) = 0$ has a real root for every real $\\mu$ and $\\lambda$. This lesson takes the gem deeper and prices WHERE each door sits — the full census, degenerate seats included. The witnesses are fresh: $a = -1$, $b = 2$, $c = 5$, $d = 7$.' },
    { kind: 'callout', tone: 'theorem', title: 'The four-value sign bracket', text: 'For $F(x) = \\mu(x - a)(x - c) + \\lambda(x - b)(x - d)$ with $a < b < c < d$, the four door evaluations read $F(a) = \\lambda(a - b)(a - d)$, $F(b) = \\mu(b - a)(b - c)$, $F(c) = \\lambda(c - b)(c - d)$, $F(d) = \\mu(d - a)(d - c)$. On the witnesses $(-1, 2, 5, 7)$: $F(-1) = 24\\lambda$, $F(2) = -9\\mu$, $F(5) = -6\\lambda$, $F(7) = 16\\mu$ — the signs walk $\\lambda, -\\mu, -\\lambda, \\mu$ down the line.' },
    { kind: 'derivation', title: 'The sign walk, door by door', statement: "For a < b < c < d, the four door evaluations of F(x) = μ(x − a)(x − c) + λ(x − b)(x − d) carry the signs λ, −μ, −λ, μ — which brackets a real door into a specific interval for every sign pattern of μ and λ.", steps: [
      { label: 'At the first door', formula: 'F(a) = \\lambda(a - b)(a - d)', explanation: 'The $\\mu$-term vanishes at $x = a$ (its factor $x - a$). Both remaining factors are negative ($a < b$, $a < d$), so their product is positive: $F(a)$ carries the sign of $\\lambda$ — at the witness, $(-3)(-8) = 24$.' },
      { label: 'At the second door', formula: 'F(b) = \\mu(b - a)(b - c)', explanation: 'Now the $\\lambda$-term vanishes. The factors straddle zero ($b - a > 0$, $b - c < 0$), so $F(b)$ carries the sign of $-\\mu$ — at the witness, $(3)(-3) = -9$.' },
      { label: 'At the third door', formula: 'F(c) = \\lambda(c - b)(c - d)', explanation: 'The $\\mu$-term vanishes again (factor $x - c$). The factors straddle zero ($c - b > 0$, $c - d < 0$): $F(c)$ carries the sign of $-\\lambda$ — at the witness, $(3)(-2) = -6$.' },
      { label: 'At the fourth door', formula: 'F(d) = \\mu(d - a)(d - c)', explanation: 'The $\\lambda$-term vanishes; both factors positive ($d > a$, $d > c$): $F(d)$ carries the sign of $\\mu$ — at the witness, $(8)(2) = 16$.' },
      { label: 'Bracket the pairs', formula: 'F(a)F(b) < 0 \\iff \\lambda\\mu > 0, \\quad F(c)F(d) < 0 \\iff \\lambda\\mu > 0', explanation: 'Adjacent evaluations at $a, b$ (and at $c, d$) carry opposite signs exactly when $\\lambda$ and $\\mu$ share a sign — one root brackets into $(a, b)$ and one into $(c, d)$ by the intermediate value theorem. When $\\lambda\\mu < 0$, instead $F(b)F(c) < 0$: the bracket falls on $(b, c)$.' },
    ], result: '\\text{signs } F(a), F(b), F(c), F(d) = \\lambda,\\ -\\mu,\\ -\\lambda,\\ \\mu \\text{ — the census falls out by pairing}' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\lambda\\mu > 0$ (with $\\mu + \\lambda \\neq 0$): one door in $(a, b)$ and one in $(c, d)$ — both doors bracketed inside $(a, d)$;',
      '(ii) $\\lambda\\mu < 0$ with $\\mu + \\lambda > 0$: one door in $(b, c)$, and the ESCAPER door leaves left ($< a$);',
      '(iii) $\\lambda\\mu < 0$ with $\\mu + \\lambda < 0$: one door in $(b, c)$, and the escaper leaves right ($> d$);',
      '(iv) $\\lambda = 0$: the doors sit exactly on $a$ and $c$; $\\mu = 0$: exactly on $b$ and $d$;',
      '(v) $\\mu + \\lambda = 0$ (both nonzero): the quadratic collapses to a LINE — and its single door $x^* = \\dfrac{bd - ac}{b + d - a - c}$ still lands strictly inside $(b, c)$.',
    ] },
    { kind: 'example', title: 'Price the instance μ = 2, λ = 3 on the doors (−1, 2, 5, 7)', steps: [
      'Assemble: $F(x) = 2(x + 1)(x - 5) + 3(x - 2)(x - 7) = 2(x^2 - 4x - 5) + 3(x^2 - 9x + 14)$.',
      'Collect: $F(x) = 5x^2 - 35x + 32$, with $D = 1225 - 640 = 585 = 9 \\times 65$.',
      'The doors: $x = \\dfrac{35 \\pm 3\\sqrt{65}}{10} \\approx 1.081$ and $5.919$.',
      'The census said $\\lambda\\mu = 6 > 0$ puts one door in $(-1, 2)$ and one in $(5, 7)$: indeed $-1 < 1.081 < 2$ ✓ and $5 < 5.919 < 7$ ✓.',
      'Hence, the four-value bracket priced both doors to their intervals BEFORE any quadratic formula ran — the formula only confirmed the addresses.',
    ],},
    { kind: 'example', title: 'The linear collapse μ + λ = 0: price the single door and prove it stays in (b, c)', steps: [
      'Take $\\mu = 1, \\lambda = -1$ on the witnesses: $F(x) = (x + 1)(x - 5) - (x - 2)(x - 7) = (x^2 - 4x - 5) - (x^2 - 9x + 14) = 5x - 19$.',
      'The quadratic terms cancel — ONE door: $x^* = \\tfrac{19}{5} = 3.8$, and $2 < 3.8 < 5$ ✓.',
      'The general law: for $a < b < c < d$ the collapsed equation gives $x^* = \\dfrac{bd - ac}{b + d - a - c}$.',
      'Prove the address: $x^* - b = \\dfrac{bd - ac - b(b + d - a - c)}{b + d - a - c} = \\dfrac{(b - a)(c - b)}{b + d - a - c}$, a quotient of positives — so $x^* > b$.',
      'And $x^* - c = \\dfrac{(d - c)(b - c)}{b + d - a - c}$, positive over positive with $b - c < 0$ — so $x^* < c$.',
      'Hence, the linear door always lands strictly inside $(b, c)$: the four doors collapse to one, but it keeps the middle address.',
    ],},
    { kind: 'figure', caption: 'The interleaving census on the doors $-1 < 2 < 5 < 7$. Above the line: the amber brackets $(a, b)$ and $(c, d)$ — where $\\lambda\\mu > 0$ plants one door each (the orange dots mark the instance $\\mu = 2, \\lambda = 3$ at $\\approx 1.08$ and $\\approx 5.92$). Below the line: the teal bracket $(b, c)$ — where $\\lambda\\mu < 0$ plants one door, while the ESCAPER leaves the picture entirely: left of $a$ when $\\mu + \\lambda > 0$, right of $d$ when $\\mu + \\lambda < 0$. The lime dot at $x^* = 19/5 = 3.8$ is the linear-case seat $\\mu + \\lambda = 0$ — the collapsed single door, still holding the middle address. The degenerate seats sit exactly ON the doors: $\\lambda = 0$ gives $a$ and $c$; $\\mu = 0$ gives $b$ and $d$.', svg: interleavingDoorsSvg() },

    { kind: 'heading', text: 'For All x on an Interval: The Wall Demands' },
    { kind: 'para', text: 'The mirror image of "some door in the interval" is "the expression keeps one sign on the WHOLE interval". Lesson 2.2 met the shape $f < 0$ on $(1, 2)$ with both walls between the doors; the system here is the same, read as wall DEMANDS: for an upward quadratic, $f < 0$ on the open interval $(k_1, k_2)$ exactly when $f(k_1) \\leq 0$ and $f(k_2) \\leq 0$ — the non-strict signs honestly absorbing the seats where a door sits exactly ON an open wall.' },
    { kind: 'example', title: 'Find every m for which x² − (m+2)x + 5m + 1 < 0 for all x in (2, 4) — and its disguise 4ᵗ − (m+2)·2ᵗ + 5m + 1 < 0 for all t in (1, 2)', steps: [
      'The wall demands: $f(2) = 4 - 2(m + 2) + 5m + 1 = 3m + 1$ and $f(4) = 16 - 4(m + 2) + 5m + 1 = m + 9$.',
      'Both demands: $3m + 1 \\leq 0$ gives $m \\leq -\\tfrac{1}{3}$, and $m + 9 \\leq 0$ gives $m \\leq -9$.',
      'Intersecting: $m \\leq -9$. Witness $m = -9$: the member is $x^2 + 7x - 44 = (x + 11)(x - 4)$ — door ON the wall $4$, negative on all of the open interval, so the boundary seat genuinely qualifies.',
      'Exclusion $m = -8$: $f(4) = 1 > 0$ — the demand fails at the right wall.',
      'The disguise: $x = 2^t$ maps $t \\in (1, 2)$ onto $x \\in (2, 4)$ EXACTLY (the exponential is strictly increasing and continuous), so $4^t - (m + 2) \\cdot 2^t + 5m + 1 < 0$ for all $t \\in (1, 2)$ is the SAME demand — the substitution\'s range is the wall, again.',
      'Hence, $m \\leq -9$ in both costumes — the boundary seat $m = -9$ carrying the door exactly on the open wall.',
    ],},
    { kind: 'example', title: 'Show that no real a makes 4ᵗ − (a − 1)·2ᵗ + 3a < 0 for all t in (1, 2)', steps: [
      'Substitute $x = 2^t \\in (2, 4)$: the demand becomes $g(x) = x^2 - (a - 1)x + 3a < 0$ for all $x \\in (2, 4)$.',
      'The wall demands: $g(2) = 4 - 2(a - 1) + 3a = 6 + a$ and $g(4) = 16 - 4(a - 1) + 3a = 20 - a$.',
      'Both would need $6 + a \\leq 0$ (so $a \\leq -6$) AND $20 - a \\leq 0$ (so $a \\geq 20$) — the two demands pull opposite ways.',
      'The certificate: ADD the two demands — $(6 + a) + (20 - a) = 26 \\leq 0$. The parameter CANCELS, and what remains is a positive constant demanded non-positive: impossible for every $a$ at once.',
      'Hence, no real $a$ exists — and the impossibility is structural (a constant clash), not a failure of search.',
    ],},
    { kind: 'callout', tone: 'insight', title: 'The add-the-walls certificate', text: 'When a parameter enters the two wall demands with OPPOSITE signs — one demand reads "parameter ≥ something", the other "parameter ≤ something else" — add the demands: the parameter cancels and a CONSTANT must satisfy the combined inequality. If that constant verdict is false (like $26 \\leq 0$), the demand is impossible for EVERY parameter value — proven in one line, no case analysis. Design tell: the parameter\'s wall-coefficient flips sign between the walls exactly when the wall pair straddles the coefficient\'s flip seat $c_1$ (here $x = 3$, between the walls $2$ and $4$).' },
    { kind: 'callout', tone: 'exam', title: 'The examination pattern for this section', text: 'Interval-sign demands appear in three costumes: the bare quadratic (asked directly), the exponential disguise ($2^t, 3^t$ mapping $t$-intervals onto $x$-walls), and the two-variable costume (lesson 2.1\'s discriminant-range method). The route is always the same: price the two wall values, impose both demands, and when the demands clash — add them and read the constant. The no-solution verdict ("no such parameter exists") is a fully creditable answer; the certificate is what earns it.' },

    { kind: 'terms', items: [
      { term: 'location of roots', def: 'The family of questions about where the real doors of $ax^2 + bx + c = 0$ sit relative to fixed walls $k, k_1, k_2$ — beyond a wall, between walls, one inside, both inside — all read from the $a \\cdot f(k)$ principle.' },
      { term: 'wall', def: 'A fixed number $k$ against which the doors are located; the between-rows read $a \\cdot f(k) < 0$ (no discriminant needed), the both-rows read $a \\cdot f(k) > 0$ with the axis and $D \\geq 0$.' },
      { term: 'the k-system', def: 'The six-row master table of location conditions, every row generated by the identity $a \\cdot f(k) = a^2(k - \\alpha)(k - \\beta)$ together with the axis midpoint read $-\\tfrac{b}{2a} = \\tfrac{\\alpha + \\beta}{2}$.' },
      { term: 'fixed point of a family (pencil)', def: 'A point through which EVERY member of a one-parameter family passes — found by collecting the parameter terms and seating them at zero. The census family\'s pencil point $(3, 1)$ settles wall questions before they are computed.' },
      { term: 'the range-is-the-wall principle', def: 'A substitution $t = g(x)$ carries location questions over intact once its range is priced: the $t$-equation\'s doors must lie in range$(g)$, and the range\'s endpoint attainment decides the boundary seats (tangent moments).' },
      { term: 'turning seat', def: 'A point $c$ with $f\'(c) = 0$ — a horizontal tangent. Rolle\'s theorem guarantees one between any two doors of a polynomial; the reverse implication fails ($x^3 + 1$).' },
      { term: 'the antiderivative trick', def: 'To locate a door of $ax^2 + bx + c = 0$ in $(0, \\ell)$, use $F(x) = \\tfrac{a}{3}x^3 + \\tfrac{b}{2}x^2 + cx$ with $F\' = f$ and engineer $F(\\ell) = F(0)$, which reads $2a\\ell^2 + 3b\\ell + 6c = 0$ — the weights are the interval.' },
      { term: 'the wall demands', def: 'For an upward quadratic, $f < 0$ on the OPEN interval $(k_1, k_2)$ exactly when $f(k_1) \\leq 0$ and $f(k_2) \\leq 0$; when the parameter enters oppositely, the add-the-walls certificate settles impossibility in one line.' },
    ] },

    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'Take f(x) = 2x² − 12x + 16, whose doors 2 and 4 both lie in (1, 5). Which option is a COMPLETE set of checks certifying "both roots in (1, 5)" for a general quadratic?', options: ['D ≥ 0 and a·f(1) > 0', 'D ≥ 0, a·f(1) > 0, a·f(5) > 0 and 1 < −b/2a < 5', 'a·f(1) > 0 and a·f(5) > 0', 'D > 0 and 1 < −b/2a < 5'], answer: 1, explain: 'The both-inside row demands all four: real doors, both walls outside the pair, and the axis between the walls. Option A admits $2(x-2)(x-9)$: $D = 196 > 0$ and $a \\cdot f(1) = 2 \\times 16 > 0$, yet door 9 escapes — the missing right-wall and axis checks. Option C admits $x^2 - 2x + 5$: both wall values positive, axis 1 hmm the axis $-\\tfrac{-2}{2} = 1$ sits ON the left wall, and there are NO real doors at all. Option D admits $(x - 1)(x - 2)$: axis 1.5 inside, $D = 1 > 0$, but door 1 sits ON the open wall — excluded.' },
      { q: 'For which location question can the discriminant check be skipped entirely?', options: ['both roots greater than k', 'both roots inside (k₁, k₂)', 'exactly one root inside (k₁, k₂)', 'the roots are real and distinct'], answer: 2, explain: 'The exactly-one row reads $f(k_1) \\cdot f(k_2) < 0$ — a sign change between the walls, which forces two real distinct doors by continuity before any discriminant is computed. The both-rows genuinely need $D \\geq 0$: the always-positive family $x^2 - 2x + 5$ passes every wall and axis test while owning no doors. And "real and distinct" IS the discriminant question.' },
      { q: 'Every member of the family x² − (m+1)x + 3m − 5 passes through one fixed point. Which?', options: ['(1, −3)', '(3, 1)', '(5, 3)', '(0, −5)'], answer: 1, explain: 'Collect the parameter: $f(x) = (x^2 - x - 5) + m(3 - x)$, and the $m$-coefficient vanishes at $x = 3$, leaving $f(3) = 9 - 3 - 5 = 1$ for every $m$ — the pencil point $(3, 1)$. The impostors vary with $m$: $f(1) = 2m - 5$ (which is $-3$ only at $m = 1$), $f(5) = 15 - 2m$, $f(0) = 3m - 5$.' },
      { q: 'g(x) = x² − 1 satisfies g(−2) = g(2) = 3 > 0. What follows about the roots of g in (−2, 2)?', options: ['g has no root in (−2, 2)', 'g must have at least one root in (−2, 2)', 'nothing — agreeing endpoint signs alone settle no root count', 'g has exactly two roots in (−2, 2)'], answer: 2, explain: 'Agreeing signs force NOTHING: $x^2 - 1$ happens to own both doors $\\pm 1$ inside (two roots), while $x^2 + 1$ has the same agreeing signs and no roots at all, and $(x^2 - 1)(x^2 - 4)$ agrees in sign at $\\pm 3$ with FOUR roots inside. Only a sign CHANGE forces a root. Here the doors happen to be inside — true, but not FORCED, and "exactly two" is likewise unforced.' },
      { q: 'On the doors −1 < 2 < 5 < 7, the equation μ(x + 1)(x − 5) + λ(x − 2)(x − 7) = 0 with μ = 2, λ = 3 must have a root in which interval?', options: ['(−1, 2)', '(2, 5)', '(7, ∞)', '(−∞, −1)'], answer: 0, explain: '$\\lambda\\mu = 6 > 0$, so the four-value sign bracket plants one door in $(a, b) = (-1, 2)$ and one in $(c, d) = (5, 7)$ — concretely $F = 5x^2 - 35x + 32$ with doors $\\approx 1.081$ and $5.919$. The middle bracket $(2, 5)$ receives a door only when $\\lambda\\mu < 0$; the outer regions receive the ESCAPER door, again only when $\\lambda\\mu < 0$.' },
    ] },

    { kind: 'exercises', sets: [
      { level: 'L1', questions: [
        { q: 'Locate the doors of x² − 8x + 12 = (x − 2)(x − 6) against the walls 3 and 5: does either door lie in (3, 5)?', solution: [
          'The walls first: $f(3) = 9 - 24 + 12 = -3 < 0$ and $f(5) = 25 - 40 + 12 = -3 < 0$.',
          'Both wall values negative with $a = 1 > 0$: BOTH walls lie between the doors — the walls-between row.',
          'So, neither door is in $(3, 5)$: the doors $2$ and $6$ sit outside, one per side.',
          'Hence, both walls between the doors; no door inside $(3, 5)$.',
        ], answer: 'both walls 3 and 5 lie between the doors 2 and 6 (f(3) = f(5) = −3 < 0); neither door is in (3, 5)' },
        { q: 'Do both doors of x² − 10x + 23 lie in (2, 6)? Run the full four checks.', solution: [
          'Check 1, real doors: $D = 100 - 92 = 8 > 0$ ✓.',
          'Check 2, left wall: $f(2) = 4 - 20 + 23 = 7 > 0$ ✓ — wall 2 outside the pair.',
          'Check 3, right wall: $f(6) = 36 - 60 + 23 = -1 < 0$ ✗ — wall 6 is BETWEEN the doors.',
          'So, the verdict is already NO; the axis check ($5 \\in (2, 6)$ ✓) cannot rescue a failed wall.',
          'The doors themselves: $5 \\pm \\sqrt{2} \\approx 3.59$ and $6.41$ — the right door escapes past $6$.',
          'Hence, NO — the door 5 + √2 ≈ 6.41 lies outside (2, 6); the right-wall check fails.',
        ], answer: 'no — f(6) = −1 < 0 fails the right wall; the door 5 + √2 escapes the interval' },
      ] },
      { level: 'L2', questions: [
        { q: 'How many integers a have both doors of x² − 2ax + a² − 4 = 0 inside (0, 9)?', solution: [
          'Factor the shape: $x^2 - 2ax + a^2 - 4 = (x - a)^2 - 4 = (x - a - 2)(x - a + 2)$ — the doors are $a - 2$ and $a + 2$, a fixed gap of 4 straddling $a$.',
          'Both inside the open interval: $a - 2 > 0$ and $a + 2 < 9$, i.e. $a > 2$ and $a < 7$.',
          'So, $a \\in \\{3, 4, 5, 6\\}$ — with the boundary seats honestly excluded: $a = 2$ puts door $0$ ON the left wall; $a = 7$ puts door $9$ ON the right wall.',
          'Hence, four integers: 3, 4, 5, 6.',
        ], answer: '4 — the integers {3, 4, 5, 6} (doors a ± 2; the wall seats a = 2, a = 7 excluded)' },
        { q: 'Find every k for which the doors of 3x² − 5x + k = 0 are opposite in sign.', solution: [
          'Opposite signs read the product: $\\tfrac{k}{3} < 0$, i.e. $k < 0$.',
          'No discriminant check — an opposite-sign product already forces two real doors straddling $0$.',
          'Audit at the boundary: $k = 0$ gives doors $0$ and $\\tfrac{5}{3}$ — one door AT the origin, not opposite signs; excluded by the strict read.',
          'Hence, $k < 0$ — the one-condition wonder, straight from the $k = 0$ row of the system.',
        ], answer: 'k < 0 (the product k/3 < 0; no D check needed)' },
      ] },
      { level: 'L3', questions: [
        { q: 'Find every m for which both doors of x² − 6x + m = 0 exceed 2.', solution: [
          'The three checks: $D \\geq 0$, $a \\cdot f(2) > 0$, axis $> 2$.',
          'Discriminant: $36 - 4m \\geq 0$, so $m \\leq 9$.',
          'Wall: $f(2) = 4 - 12 + m = m - 8 > 0$, so $m > 8$.',
          'Axis: $3 > 2$ ✓ always — free.',
          'Intersecting: $8 < m \\leq 9$. The seat $m = 9$ is the double door $3 > 2$ ✓; the seat $m = 8$ puts a door exactly AT $2$ and is excluded.',
          'Hence, $m \\in (8, 9]$ — with the double-door seat in and the wall seat out.',
        ], answer: 'm ∈ (8, 9] (m = 9 is the double door 3; m = 8 puts a door on the wall)' },
        { q: 'Find every m for which exactly one door of x² − 8x + m = 0 lies in (2, 4).', solution: [
          'The product test: $f(2) \\cdot f(4) < 0$. Compute $f(2) = 4 - 16 + m = m - 12$ and $f(4) = 16 - 32 + m = m - 16$.',
          'So, $(m - 12)(m - 16) < 0$ gives $12 < m < 16$.',
          'Boundary honesty, left seat: $m = 12$ gives doors $2$ and $6$ — door $2$ ON the left wall (not inside), door $6$ outside: ZERO doors inside, excluded.',
          'Boundary honesty, right seat: $m = 16$ gives the double door $4$, ON the right wall — zero inside, excluded.',
          'Witness $m = 14$: doors $4 \\pm \\sqrt{2} \\approx 2.59$ and $5.41$ — exactly the one door $2.59$ inside ✓.',
          'Hence, $m \\in (12, 16)$ — both boundary seats excluded, no silent additions.',
        ], answer: '12 < m < 16 (m = 12: door on the left wall, zero inside; m = 16: double door on the right wall)' },
        { q: 'For how many integers m in [−6, 6] does x² − (m+1)x + 3m − 5 = 0 have NO real door?', solution: [
          'The family\'s discriminant: $D = (m - 3)(m - 7)$.',
          'No real door: $D < 0$, i.e. $3 < m < 7$.',
          'Intersect with the integer window $[-6, 6]$: $m \\in \\{4, 5, 6\\}$.',
          'Hence, three integers — the pencil floats above the axis exactly between the double-root seats $m = 3$ and $m = 7$.',
        ], answer: '3 — the integers {4, 5, 6} (D = (m−3)(m−7) < 0 on (3, 7))' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find every m for which the doors of x² − 6x + 8 = 0 lie between the doors of x² − (m+1)x + 2m − 10 = 0.', solution: [
          'The inner doors: $x^2 - 6x + 8 = (x - 2)(x - 4)$ — walls at $2$ and $4$.',
          'Evaluate the outer at the inner walls: $g(2) = 4 - 2(m + 1) + 2m - 10 = -8 < 0$ — for EVERY $m$: the left wall is auto-satisfied.',
          'And $g(4) = 16 - 4(m + 1) + 2m - 10 = 2 - 2m < 0$ exactly when $m > 1$.',
          'So, $m > 1$ — and the negativity at the walls makes the outer\'s own discriminant check unnecessary.',
          'Witness $m = 2$: $g(x) = x^2 - 3x - 6$, doors $\\tfrac{3 \\pm \\sqrt{33}}{2} \\approx -1.37$ and $4.37$ — indeed $-1.37 < 2 < 4 < 4.37$ ✓.',
          'Boundary: $m = 1$ puts an outer door exactly ON the wall $4$ — excluded by strictness. Exclusion $m = 0$: doors $\\approx -2.70$ and $3.70$, and the wall $4$ escapes the pair.',
          'Hence, $m > 1$ — one wall free by design, the other carrying the whole verdict.',
        ], answer: 'm > 1 (g(2) = −8 < 0 always; g(4) = 2 − 2m < 0 ⟺ m > 1; witness m = 2 with outer doors (3 ± √33)/2)' },
        { q: 'Find every k for which (x² + 2x + 4)² = k(x² + 2x + 3) has a real solution.', solution: [
          'Substitute $t = x^2 + 2x + 3 = (x + 1)^2 + 2 \\in [2, \\infty)$ — the range is the wall, and $x^2 + 2x + 4 = t + 1$.',
          'The equation becomes $(t + 1)^2 = kt$, i.e. $t^2 + (2 - k)t + 1 = 0$ — product of doors $1$, so the doors (when real) are reciprocals.',
          'Real doors: $(2 - k)^2 - 4 \\geq 0$, i.e. $k \\leq 0$ or $k \\geq 4$. For $k \\leq 0$ both doors are $\\leq 0 < 2$ — below the wall, no $x$-solution.',
          'For $k \\geq 4$: the larger door must reach the wall: $\\tfrac{(k - 2) + \\sqrt{(k - 2)^2 - 4}}{2} \\geq 2$.',
          'Solve: $\\sqrt{(k - 2)^2 - 4} \\geq 4 - k$ needs $k \\geq 4$ (else the right side is negative while the left is a root — then impossible), and squaring gives $(k - 2)^2 - 4 \\geq (4 - k)^2$, i.e. $-8 \\geq -12k + 12$, so $k \\geq \\tfrac{5}{2}$ — already true.',
          'Refine honestly at the boundary: $k = 4$ gives the double door $t = 1 < 2$ ✗ (recheck: $t^2 - 2t + 1 = (t - 1)^2$). The door crosses the wall $2$ exactly at $k = \\tfrac{9}{2}$: $t^2 - \\tfrac{5}{2}t + 1 = (t - 2)(t - \\tfrac{1}{2})$ — door $2$ attained at $x = -1$.',
          'Hence, $k \\geq \\tfrac{9}{2}$ — the boundary is the tangent seat $x = -1$, and every $k > \\tfrac{9}{2}$ gives two $x$-solutions riding the larger $t$-door.',
        ], answer: 'k ≥ 9/2 — at k = 9/2 the t-door sits exactly on the wall t = 2 (the tangent seat x = −1); k = 4 is the impostor with double door t = 1 < 2' },
        { q: 'Find every k for which sin²x − (k + 2)sin x + k + 2 = 0 has at least one real solution.', solution: [
          'Substitute $t = \\sin x \\in [-1, 1]$ — the range is the wall, closed and attained.',
          'The $t$-quadratic: $f(t) = t^2 - (k + 2)t + (k + 2)$. One free read: $f(1) = 1 - (k + 2) + (k + 2) = 1 > 0$ — the right wall value is CONSTANT positive.',
          'A door in $[-1, 1]$ therefore happens either with $f(-1) \\leq 0$ (the left wall value non-positive: a sign change on $[-1, 1]$) or with both doors inside.',
          'Left wall: $f(-1) = 1 + (k + 2) + (k + 2) = 2k + 5 \\leq 0$ gives $k \\leq -\\tfrac{5}{2}$ — door at or left of $-1$... the seat $k = -\\tfrac{5}{2}$ puts a door exactly AT $-1$ (i.e. $\\sin x = -1$, solvable) ✓ included.',
          'Both inside: $f(-1) > 0$, axis $\\tfrac{k + 2}{2} \\in (-1, 1)$, $D = (k + 2)(k - 2) \\geq 0$: intersecting $-\\tfrac{5}{2} < k < -2$ with $k \\leq -2$ or $k \\geq 2$ and $-4 < k < 0$ gives $\\left(-\\tfrac{5}{2}, -2\\right]$.',
          'Collecting: $k \\leq -\\tfrac{5}{2}$ together with $\\left(-\\tfrac{5}{2}, -2\\right]$ gives $k \\leq -2$.',
          'Witnesses: $k = -2$ gives $t^2 = 0$, the double door $t = 0$ (i.e. $\\sin x = 0$) ✓; $k = -3$ gives $t^2 + t - 1$, door $\\tfrac{\\sqrt{5} - 1}{2} \\approx 0.618$ inside ✓; exclusions: $k = -1$ has $D = -3 < 0$ (no doors), $k = 2$ has the double door $t = 2$ outside.',
          'Hence, $k \\leq -2$ — the closed left wall honestly included via the seat $k = -\\tfrac{5}{2}$.',
        ], answer: 'k ≤ −2 (f(1) = 1 always; the verdict collects the sign change k ≤ −5/2 and the both-inside band (−5/2, −2])' },
      ] },
      { level: 'L5', questions: [
        { q: 'Given 6a + 3b + 2c = 0 (with a ≠ 0), prove that ax² + bx + c = 0 has a door in (0, 3), and verify on a witness.', solution: [
          'Build the antiderivative: $F(x) = \\tfrac{a}{3}x^3 + \\tfrac{b}{2}x^2 + cx + d$, so $F\'(x) = ax^2 + bx + c$.',
          'Endpoint values: $F(0) = d$ and $F(3) = 9a + \\tfrac{9b}{2} + 3c + d = \\tfrac{3}{2}(6a + 3b + 2c) + d = d$ by the given identity.',
          "So, $F(0) = F(3)$, and Rolle's theorem plants a seat $c^* \\in (0, 3)$ with $F'(c^*) = 0$ — a door of the quadratic inside the open interval.",
          'The weights check: this is the general law $2a\\ell^2 + 3b\\ell + 6c = 0$ at $\\ell = 3$ — weights $6, 3, 2$.',
          'Witness $(a, b, c) = (1, -4, 3)$: $6 - 12 + 6 = 0$ ✓, and $x^2 - 4x + 3 = (x - 1)(x - 3)$ has its OPEN-interval door at $1 \\in (0, 3)$ — the second door sits exactly ON the endpoint $3$, outside the open interval, exactly as Rolle promises a strictly interior seat.',
          'Hence, the door is located without solving: the weights were the interval in disguise.',
        ], answer: 'F(3) − F(0) = (3/2)(6a + 3b + 2c) = 0, so Rolle plants a door of ax² + bx + c in (0, 3); witness (1, −4, 3) → x² − 4x + 3 with interior door 1' },
        { q: 'For a < b < c < d, prove that μ(x − a)(x − c) + λ(x − b)(x − d) = 0 has a real door for every real μ and λ — the full degenerate census included.', solution: [
          'The four evaluations: $F(a) = \\lambda(a - b)(a - d)$, $F(b) = \\mu(b - a)(b - c)$, $F(c) = \\lambda(c - b)(c - d)$, $F(d) = \\mu(d - a)(d - c)$.',
          'Signs: $F(a)$ carries the sign of $\\lambda$ (both factors negative), $F(b)$ of $-\\mu$ (straddle), $F(c)$ of $-\\lambda$ (straddle), $F(d)$ of $\\mu$ (both positive).',
          'Case $\\lambda\\mu > 0$: $F(a)$ and $F(b)$ disagree, so a door sits in $(a, b)$ by continuity; likewise $F(c)$ and $F(d)$ disagree, a second door in $(c, d)$.',
          'Case $\\lambda\\mu < 0$: $F(b)$ and $F(c)$ disagree — one door in $(b, c)$. Being quadratic (if $\\mu + \\lambda \\neq 0$), its other door is real too; the census locates it outside $(a, d)$.',
          'Degenerate seats: $\\lambda = 0$ leaves $\\mu(x - a)(x - c) = 0$ with doors exactly $a$ and $c$; $\\mu = 0$ leaves doors $b$ and $d$; and $\\mu + \\lambda = 0$ collapses to a line whose single door still lies in $(b, c)$ (the factored-difference law).',
          'Hence, every $(\\mu, \\lambda)$ — including the three degenerate shapes — owns at least one real door: the sign walk covers all of $\\mathbb{R}^2$.',
        ], answer: 'the four-value sign bracket (λ, −μ, −λ, μ) brackets a door for every sign pattern; λ = 0, μ = 0 and μ + λ = 0 carry their own explicit doors' },
        { q: 'Show that no real a makes 4ᵗ − (a − 1)·2ᵗ + 3a < 0 for all t in (1, 2).', solution: [
          'Substitute $x = 2^t$: $t \\in (1, 2)$ maps onto $x \\in (2, 4)$ exactly (strictly increasing, continuous).',
          'The demand: $g(x) = x^2 - (a - 1)x + 3a < 0$ for all $x \\in (2, 4)$.',
          'Wall demands for the upward parabola: $g(2) = 4 - 2(a - 1) + 3a = 6 + a \\leq 0$ and $g(4) = 16 - 4(a - 1) + 3a = 20 - a \\leq 0$.',
          'The first demands $a \\leq -6$; the second $a \\geq 20$ — opposite directions, no common ground.',
          'The certificate: add the demands — $(6 + a) + (20 - a) = 26 \\leq 0$, a false constant verdict independent of $a$.',
          'Hence, no real $a$ exists — one line, the parameter cancelled, the clash structural.',
        ], answer: 'no real a — adding the wall demands gives (6 + a) + (20 − a) = 26 ≤ 0, impossible for every a' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the fixed-point law for the census family: whenever x² − (m+1)x + 3m − 5 = 0 has real doors, the wall 3 never lies strictly between them — and the axis splits the verdict (m ≤ 3: both doors below 3; m ≥ 7: both doors above 3).', solution: [
          'The fixed point: collecting parameters, $f(x) = (x^2 - x - 5) + m(3 - x)$, so $f(3) = 1 > 0$ for EVERY $m$.',
          'Suppose the doors are real, $\\alpha \\leq \\beta$. If $3$ lay strictly between them, the upward parabola would be negative at $3$ — but $f(3) = 1 > 0$. Contradiction: $3 \\notin (\\alpha, \\beta)$ always.',
          'Split by the axis $= \\tfrac{\\alpha + \\beta}{2}$. Real doors mean $D = (m - 3)(m - 7) \\geq 0$, i.e. $m \\leq 3$ or $m \\geq 7$.',
          'Case $m \\leq 3$: the axis $\\tfrac{m + 1}{2} \\leq 2 < 3$. Since $\\beta \\geq$ axis does not help directly, argue from the door side: $\\alpha \\leq \\text{axis} \\leq 2 < 3$, so $\\alpha < 3$; and $3 \\notin (\\alpha, \\beta)$ with $\\alpha < 3 < \\beta$ impossible — hence $\\beta \\leq 3$; equality $\\beta = 3$ would force $f(3) = 0$, excluded. So $\\beta < 3$: both doors below.',
          'Case $m \\geq 7$: the axis $\\tfrac{m + 1}{2} \\geq 4 > 3$, so $\\beta \\geq$ axis $> 3$, i.e. $\\beta > 3$; and $3 \\notin (\\alpha, \\beta)$ forces $\\alpha \\geq 3$; equality excluded as before. So $\\alpha > 3$: both doors above.',
          'Hence, the wall 3 never falls between the doors; the axis position decides which side the whole pair sits on — the pencil\'s geometry doing the work of a dozen computations.',
        ], answer: 'f(3) = 1 > 0 for every m keeps 3 outside the open door interval; axis ≤ 2 (m ≤ 3) forces both doors below 3, axis ≥ 4 (m ≥ 7) forces both above' },
        { q: 'For a < b < c < d with μ + λ = 0 (both nonzero), prove that the single door x* = (bd − ac)/(b + d − a − c) of μ(x − a)(x − c) + λ(x − b)(x − d) = 0 satisfies b < x* < c, and verify on the witnesses (−1, 2, 5, 7).', solution: [
          'With $\\lambda = -\\mu \\neq 0$, divide out $\\mu$: the equation reads $(x - a)(x - c) - (x - b)(x - d) = 0$.',
          'Expand both squares: $(x^2 - (a + c)x + ac) - (x^2 - (b + d)x + bd) = (b + d - a - c)x + (ac - bd) = 0$ — linear, since the $x^2$ terms cancel.',
          'So, $x^* = \\dfrac{bd - ac}{b + d - a - c}$; note the denominator is positive: $b - a > 0$ and $d - c > 0$.',
          'The first factored difference: $x^* - b = \\dfrac{bd - ac - b(b + d - a - c)}{b + d - a - c} = \\dfrac{ab + bc - b^2 - ac}{b + d - a - c} = \\dfrac{(b - a)(c - b)}{b + d - a - c}$ — positive over positive, so $x^* > b$.',
          'The second: $x^* - c = \\dfrac{bd - ac - c(b + d - a - c)}{b + d - a - c} = \\dfrac{bd - bc - cd + c^2}{b + d - a - c} = \\dfrac{(d - c)(b - c)}{b + d - a - c}$ — negative over positive, so $x^* < c$.',
          'Witness $(-1, 2, 5, 7)$: $x^* = \\dfrac{(2)(7) - (-1)(5)}{2 + 7 + 1 - 5} = \\dfrac{19}{5} = 3.8 \\in (2, 5)$ ✓ — and directly, $F(x) = 5x - 19$ indeed vanishes at $3.8$.',
          'Hence, the collapsed door keeps the middle address: $b < x^* < c$ for every strictly interleaved quartet.',
        ], answer: 'x* − b = (b−a)(c−b)/(b+d−a−c) > 0 and x* − c = (d−c)(b−c)/(b+d−a−c) < 0; witness x* = 19/5 = 3.8 ∈ (2, 5)' },
      ] },
    ] },

    { kind: 'formula', name: 'The k-system (the location master table)', latex: 'a \\cdot f(k) = a^2(k - \\alpha)(k - \\beta)', note: 'One identity prices every wall: $a \\cdot f(k) > 0$ outside the doors, $< 0$ between them. Both-beyond adds the axis sign; both-inside adds both walls plus the axis; the between-rows need no discriminant.' },
    { kind: 'formula', name: 'Both roots in (k₁, k₂)', latex: 'D \\geq 0, \\quad a \\cdot f(k_1) > 0, \\quad a \\cdot f(k_2) > 0, \\quad k_1 < -\\tfrac{b}{2a} < k_2', note: 'The 2.2 bridge, now one row of the system. The double root inside counts as both; a door ON an open wall is outside.' },
    { kind: 'formula', name: 'Exactly one root in (k₁, k₂)', latex: 'f(k_1) \\cdot f(k_2) < 0', note: 'The sign change certifies real distinct doors and the one-inside count — but a door exactly ON a wall reads 0 and needs the honest hand count (the census seat m = 5/2).' },
    { kind: 'formula', name: 'The interleaving census', latex: 'F(a) \\sim \\lambda,\\; F(b) \\sim -\\mu,\\; F(c) \\sim -\\lambda,\\; F(d) \\sim \\mu; \\quad x^* = \\tfrac{bd - ac}{b + d - a - c} \\in (b, c)', note: '$\\lambda\\mu > 0$: doors in $(a,b)$ and $(c,d)$. $\\lambda\\mu < 0$: one in $(b,c)$, the escaper outside $(a,d)$ (left if $\\mu + \\lambda > 0$, right if $< 0$). $\\mu + \\lambda = 0$: the single linear door $x^*$, always in $(b, c)$.' },
    { kind: 'formula', name: 'The antiderivative weights law', latex: '2a\\ell^2 + 3b\\ell + 6c = 0 \\;\\Longrightarrow\\; ax^2 + bx + c \\text{ has a door in } (0, \\ell)', note: 'Rolle on $F(x) = \\tfrac{a}{3}x^3 + \\tfrac{b}{2}x^2 + cx$: $F(\\ell) = F(0)$. The weights are the interval: $\\ell = 1$ gives $2, 3, 6$; $\\ell = 2$ gives $4, 3, 3$; $\\ell = 3$ gives $6, 3, 2$.' },
    { kind: 'formula', name: 'The wall demands and the add-the-walls certificate', latex: 'a > 0:\\; f < 0 \\text{ on } (k_1, k_2) \\iff f(k_1) \\leq 0 \\wedge f(k_2) \\leq 0; \\qquad f(k_1) + f(k_2) = \\text{const} \\leq 0 \\Rightarrow \\text{impossible}', note: 'The non-strict wall signs absorb the door-on-open-wall seats honestly; when the parameter enters the two demands with opposite signs, their sum cancels it — a false constant verdict certifies no-solution in one line.' },
  ],
}


/* ------------------------------------------------------------------ */
/* lesson 2.R figures                                                  */
/* ------------------------------------------------------------------ */

function chapterArcSvg(): string {
  // the chapter wiring diagram: four lesson boxes on the arc road, the
  // two promises below, the D-companion rail, and the exit bar
  const box = (x: number, head: string, sub: string, l1: string, l2: string, l3: string): string =>
    `<rect x="${x}" y="48" width="158" height="96" rx="10" fill="#16a34a" fill-opacity="0.06" stroke="#16a34a" stroke-width="1.6"/>` +
    `<text x="${x + 79}" y="70" font-size="12" font-weight="700" text-anchor="middle" fill="#166534">${head}</text>` +
    `<text x="${x + 79}" y="88" font-size="10.5" font-style="italic" text-anchor="middle" fill="#65a30d">${sub}</text>` +
    `<text x="${x + 79}" y="106" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.9">${l1}</text>` +
    `<text x="${x + 79}" y="122" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.9">${l2}</text>` +
    `<text x="${x + 79}" y="138" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.9">${l3}</text>`
  const arrow = (x0: number): string =>
    `<line x1="${x0}" y1="96" x2="${x0 + 9}" y2="96" stroke="#d97706" stroke-width="2"/>` +
    `<polygon points="${x0 + 14},96 ${x0 + 7},92.5 ${x0 + 7},99.5" fill="#d97706"/>`
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The chapter wiring diagram. Four lesson boxes ride the amber arc road: 2.1 the vertex prices the expression, 2.2 the sign diagram fences it, 2.3 Viète's reads mine the roots, 2.4 the k-system locates them. Two promise nodes below: 2.1's x plus 1 over x at least 2 waits for chapter 4's AM-GM; 2.2's interleaving gem is cashed at depth by 2.4's census. A teal rail records the discriminant as the constant companion across all four lessons, and the orange exit bar hands the negative-discriminant doors to chapter 3's complex rung.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the chapter as one machine — the quadratic interrogated four ways</text>
  ${box(12, '2.1 · the vertex', 'the EXPRESSION priced', 'completion · vertex/range', 'six sign cases · always-sign', 'D-method ranges')}
  ${arrow(172)}
  ${box(186, '2.2 · the sign diagram', 'the expression FENCED', 'between-roots law · flips', 'domain of an equation', 'the four-condition bridge')}
  ${arrow(346)}
  ${box(360, '2.3 · Viète\u2019s reads', 'the ROOTS mined', 'S, P · the six-read inventory', 'recurrence · transforms', 'repeated · common roots')}
  ${arrow(520)}
  ${box(534, '2.4 · the k-system', 'the ROOTS located', 'a·f(k) master table', 'census · bridges · Rolle', 'walls · add-the-walls')}
  <path d="M91 144 L162 164" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
  <path d="M265 144 L542 164" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="4 3" fill="none"/>
  <rect x="12" y="164" width="300" height="56" rx="8" fill="#d97706" fill-opacity="0.07" stroke="#d97706" stroke-width="1.3"/>
  <text x="162" y="182" font-size="10.5" font-weight="700" text-anchor="middle" fill="#b45309">the promise forward</text>
  <text x="162" y="198" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.92">2.1\u2019s x + 1/x \u2265 2 \u2014 chapter 4\u2019s AM\u2013GM</text>
  <text x="162" y="213" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.92">will re-derive it from a second engine</text>
  <rect x="392" y="164" width="300" height="56" rx="8" fill="#d97706" fill-opacity="0.07" stroke="#d97706" stroke-width="1.3"/>
  <text x="542" y="182" font-size="10.5" font-weight="700" text-anchor="middle" fill="#b45309">the promise cashed late</text>
  <text x="542" y="198" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.92">2.2 proved the interleaving gem \u2014</text>
  <text x="542" y="213" font-size="10" text-anchor="middle" fill="currentColor" opacity="0.92">2.4 ran the census at depth</text>
  <rect x="12" y="228" width="680" height="34" rx="8" fill="#0d9488" fill-opacity="0.07" stroke="#0d9488" stroke-width="1.4"/>
  <text x="352" y="249" font-size="11" text-anchor="middle" fill="#0f766e">D = b\u00b2 \u2212 4ac \u2014 the constant companion: sign verdicts \u00b7 fence counts \u00b7 repeated seats \u00b7 the D-skip honesty</text>
  <rect x="12" y="282" width="680" height="34" rx="8" fill="#ea580c" fill-opacity="0.07" stroke="#ea580c" stroke-width="1.4"/>
  <text x="352" y="303" font-size="11" text-anchor="middle" fill="#ea580c">the exit: the D &lt; 0 doors get theirs \u2014 chapter 3 climbs the complex rung \u00b7 the hall prices one machine with four questions</text>
</svg>`
}

function fourReadingsSvg(): string {
  // one machine y = x² − 4x + 3, annotated by all four readings; the
  // legend panel carries the four rows
  const OX = 250, OY = 238, U = 44, UY = 48
  const px = (x: number): number => OX + U * x
  const py = (y: number): number => OY - UY * y
  const pts: string[] = []
  for (let x = -0.4; x <= 4.4 + 1e-9; x += 0.08) {
    const y = (x - 1) * (x - 3)
    if (y <= 3.85) pts.push(`${px(x).toFixed(1)},${py(y).toFixed(1)}`)
  }
  const legendRow = (y: number, color: string, label: string, sub: string): string =>
    `<circle cx="478" cy="${y - 4}" r="5" fill="${color}"/><text x="488" y="${y}" font-size="11.5" font-weight="700" fill="currentColor">${label}</text><text x="488" y="${y + 15}" font-size="10.5" fill="currentColor" opacity="0.85">${sub}</text>`
  // the negative region between the curve and the axis, drawn as the
  // TRUE region path (the curve itself bounds it) so the axis tick labels
  // 1, 2, 3 sit outside the shading
  const bandPts: string[] = []
  for (let x = 1; x <= 3 + 1e-9; x += 0.08) bandPts.push(`${px(x).toFixed(1)},${py((x - 1) * (x - 3)).toFixed(1)}`)
  const bandPath = `M${px(1).toFixed(1)},${OY} L${bandPts.join(' L')} Z`
  return `<svg viewBox="0 0 720 348" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One machine carrying all four readings: the parabola y equals x squared minus 4x plus 3 with vertex at (2, minus 1) and range bracket minus 1 to infinity; the zeros 1 and 3 fenced with the negative band shaded between them; the Viète tags S equals 4 and P equals 3 in the legend; the walls 0 and 4 with a times f positive at both, and both doors inside the interval 0 to 4 marked by the bottom bracket. The legend lists the four readings with their verdicts on this machine.">
  <text x="250" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">one machine, four readings \u2014 y = x\u00b2 \u2212 4x + 3</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
    <path d="M${px(-0.5)} ${OY}H${px(4.5)}"/>
    <path d="M${OX} ${py(3.8)}V${py(-1.2)}"/>
  </g>
  <g font-size="10.5" text-anchor="middle" fill="currentColor" opacity="0.85">
    <text x="${px(0) - 10}" y="${OY + 19}" text-anchor="end">0</text>
    <text x="${px(1)}" y="${OY + 19}">1</text>
    <text x="${px(2)}" y="${OY + 19}">2</text>
    <text x="${px(3)}" y="${OY + 19}">3</text>
    <text x="${px(4)}" y="${OY + 19}">4</text>
    <text x="${OX - 10}" y="${py(-1) + 4}" text-anchor="end">\u22121</text>
  </g>
  <path d="${bandPath}" fill="#dc2626" fill-opacity="0.09" stroke="none"/>
  <text x="${px(2)}" y="276" font-size="11" font-weight="700" text-anchor="middle" fill="#dc2626">f &lt; 0</text>
  <g font-size="12" font-weight="700" fill="#16a34a">
    <text x="${px(0.55)}" y="226">+</text>
    <text x="${px(3.6)}" y="226">+</text>
  </g>
  <path d="M${px(4)} ${py(3.5)}V244 M${px(4)} 262V294" stroke="#0d9488" stroke-width="1.4" stroke-dasharray="4 4" fill="none"/>
  <text x="256" y="60" font-size="10.5" text-anchor="start" fill="#0f766e">a\u00b7f(0) = 3 &gt; 0</text>
  <text x="418" y="60" font-size="10.5" text-anchor="end" fill="#0f766e">a\u00b7f(4) = 3 &gt; 0</text>
  <g stroke="#16a34a" fill="none" stroke-width="2.4">
    <polyline points="${pts.join(' ')}"/>
  </g>
  <g fill="#ea580c">
    <circle cx="${px(1)}" cy="${OY}" r="4"/>
    <circle cx="${px(3)}" cy="${OY}" r="4"/>
  </g>
  <circle cx="${px(2)}" cy="${py(-1)}" r="4.5" fill="#d97706"/>
  <text x="${px(2)}" y="308" font-size="11" font-weight="700" text-anchor="middle" fill="currentColor">vertex (2, \u22121) \u00b7 range [\u22121, \u221e)</text>
  <path d="M${px(0)} 320H${px(4)} M${px(0)} 317V323 M${px(4)} 317V323" stroke="#0d9488" stroke-width="1.4" fill="none"/>
  <text x="${px(2)}" y="336" font-size="10.5" font-weight="700" text-anchor="middle" fill="#0f766e">both doors inside (0, 4)</text>
  <g font-size="12.5" font-weight="700" fill="currentColor">
    <text x="472" y="48">the four readings</text>
  </g>
  ${legendRow(72, '#16a34a', '2.1 \u00b7 the vertex read', 'range [\u22121, \u221e), vertex (2, \u22121)')}
  ${legendRow(108, '#dc2626', '2.2 \u00b7 the sign read', 'f &lt; 0 exactly on (1, 3)')}
  ${legendRow(144, '#d97706', '2.3 \u00b7 the Vi\u00e8te read', 'S = 4, P = 3, |\u03b1 \u2212 \u03b2| = 2')}
  ${legendRow(180, '#0d9488', '2.4 \u00b7 the location read', 'a\u00b7f(0) &gt; 0, a\u00b7f(4) &gt; 0, seat 2 \u2208 (0, 4)')}
  <g font-size="11.5" fill="currentColor" opacity="0.92">
    <text x="472" y="216">the same machine answers</text>
    <text x="472" y="232">all four \u2014 every chapter</text>
    <text x="472" y="248">question is one of these</text>
    <text x="472" y="264">readings wearing a costume.</text>
  </g>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 2.R — Unit Review: The Quadratic at Depth                   */
/* ------------------------------------------------------------------ */

const lessonReview: Lesson = {
  id: 'aa-unit-review-the-quadratic-at-depth',
  number: '2.R',
  title: 'Unit Review: The Quadratic at Depth',
  concepts: [
    'the arc of the chapter: the quadratic as a working object — priced as an expression, fenced by its sign, mined for its roots, pinned by location',
    'the four readings: vertex, sign, Viète, location — one machine, four questions',
    'the two master tables reunited: the six sign cases and the k-system',
    'the cross-lesson witnesses: the fence, the sign ladder, the Viète inventory, the census family',
    'the formula inventory: twenty-two cards consolidated to eight load-bearing laws',
    'the mixed census: examination items that price several lessons in one question',
  ],
  objectives: [
    'hold the whole chapter in one hand — the wiring of its four lessons and where each promise was cashed',
    'name which of the four readings a question wants, and run it at examination speed',
    'recall the master tables and the formula shelf without re-deriving them',
    'solve mixed items that price several lessons in one question — the way the hall actually prices a chapter',
  ],
  prerequisites: ['aa-vertex-form-at-work-maxima-and-minima', 'aa-quadratic-inequalities-and-the-sign-diagram', 'aa-symmetric-reads-and-common-roots', 'aa-location-of-roots-doors-in-intervals'],
  sources: ['cengage-m2-02', 'cengage-jee-style', 'ncert-math10-ch4-quadratic', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'Elementary Algebra closed its quadratic with four doors to the same roots: factoring, completing the square, the formula, the graph. This chapter opened the same object again and interrogated it — not as an equation to settle but as a machine to question. The expression was priced for its extremes, the sign fenced into bands, the roots mined without solving, the roots pinned inside intervals. Four lessons, one object, four readings. This review gathers the four readings back into one hand.' },
    { kind: 'para', text: 'A review in this book does two things and refuses a third. It RE-MAPS the chapter — the arc, the promises made early and cashed late, the two master tables that reunite the sign census with the location system. And it runs a MIXED census: the witnesses below deliberately price several lessons in one exhibit, because that is exactly how an examination prices a chapter — one machine arrives, and every reading the book owns is asked of it in turn. What the review refuses: re-proving what the lessons already proved. Every derivation below is one line of recall with a pointer to its lesson; nothing is re-derived at length.' },
    { kind: 'para', text: 'The map first, then the tables, then the witnesses, then the mixed bench. Read the wiring diagram once before the exercises and once after: the second reading should look shorter.' },

    { kind: 'heading', text: 'The Arc: Four Readings, One Object' },
    { kind: 'para', text: 'Lesson 2.1 stopped treating the quadratic as an equation and priced it as an EXPRESSION: the completion identity $ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}$ turned every range question into a vertex question, the six sign cases tabulated what the completed form already says, the always-sign law demanded BOTH halves ($a > 0$ AND $D \\leq 0$), and the discriminant-range method priced the fraction-dressed quadratics the vertex alone cannot reach. Lesson 2.2 grew the equation into the inequality: the zero of an expression fenced off the sign bands, the sign diagram read them at examination speed, the domain of an equation taught where operations are licensed at all, and the four-condition location system built the first bridge from sign to position.' },
    { kind: 'para', text: 'Lesson 2.3 mined the roots without solving: Viète\u2019s $S$ and $P$, the six-read inventory priced no-solve, the power-sum recurrence reaching the high powers, the reconstruction and transformation engines, the repeated-seat discipline ($2a = b + c$ on the arithmetic-progression family), and the common-root census with its determinant condition and proportionality verdict. Lesson 2.4 pinned the roots in intervals: the $a \\cdot f(k)$ principle assembled every location question into one master table, the fixed point priced verdicts before they were asked, the substitution bridges hid the walls inside other machines, and Rolle\u2019s theorem — read backwards through an antiderivative — certified doors the algebra alone could not. Two promises crossed the arc: the interleaving gem PROVED in 2.2 and PRICED at census depth in 2.4; and 2.1\u2019s $x + \\frac{1}{x} \\geq 2$ still waits for chapter 4\u2019s AM\u2013GM to re-derive it from a second, independent engine.' },
    { kind: 'figure', svg: chapterArcSvg(), caption: 'The chapter wiring diagram. The amber road is the sequential arc — each lesson hands the next a deeper question about the same machine: the expression priced, then fenced, then its roots mined, then located. The dashed teal connectors mark the two promise crossings (2.1\u2019s bound waiting for chapter 4; 2.2\u2019s gem cashed by 2.4). The teal rail names the discriminant — the one number all four lessons consult. Read it twice: before the exercises as a map, after them as a checklist.' },
    { kind: 'callout', tone: 'definition', title: 'The four readings of a quadratic', text: 'Every question this chapter settles is one of four readings of the one machine $f(x) = ax^2 + bx + c$ (with $a \\neq 0$): the VERTEX read (what does the machine attain — ranges and extremes, the completed form $a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{D}{4a}$ speaking); the SIGN read (where is the machine positive, negative, zero — the fenced bands between doors); the VIÈTE read (what do the roots sum and multiply to — $S = -\\frac{b}{a}$, $P = \\frac{c}{a}$, the symmetric census priced without solving); and the LOCATION read (where do the doors sit on the line — the $a \\cdot f(k)$ wall discipline). Thus the first move on any quadratic question is a diagnosis: name the reading, then run the table that owns it.' },
    { kind: 'derivation', title: 'Why the four readings are one reading', statement: 'The completed form generates all four readings — they are one identity wearing four different questions.', steps: [
      { label: 'The completed form', formula: 'f(x) = a\\left(x + \\tfrac{b}{2a}\\right)^2 - \\tfrac{D}{4a}', explanation: 'the squared term is $\\geq 0$ when $a > 0$ (and $\\leq 0$ when $a < 0$), so the machine is pushed hardest exactly at the vertex — the VERTEX read is the identity read at its extreme seat.' },
      { label: 'The sign at any seat', formula: 'f(k) = a\\left(k + \\tfrac{b}{2a}\\right)^2 - \\tfrac{D}{4a}', explanation: 'the same identity evaluated away from the vertex: when $D > 0$ the square term changes sign across the two doors, fencing the line into bands — the SIGN read is the identity evaluated between and beyond the fences.' },
      { label: 'The coefficients\u2019 arithmetic', formula: 'f(x) = a(x - \\alpha)(x - \\beta) = a\\big(x^2 - Sx + P\\big)', explanation: 'the factor theorem rebuilds the same object from its doors, and comparing coefficients is Viète — the VIÈTE read is the identity read coefficient by coefficient.' },
      { label: 'The wall evaluation', formula: 'a \\cdot f(k) = a^2(k - \\alpha)(k - \\beta)', explanation: 'multiplying by $a$ makes the product read the DOORS directly: positive outside the pair, negative between, for either opening — the LOCATION read is the sign read priced per wall.' },
    ], result: 'One completed form, four questions — attain, sign, sum-and-product, position — and the review\u2019s mixed census asks them in combination.' },

    { kind: 'heading', text: 'The Master Tables Reunited' },
    { kind: 'para', text: 'Strip the chapter of its prose and two tables remain — the two the examinations actually price. The first settles every SIGN question; the second settles every POSITION question; and the bridge between them is the discriminant, the chapter\u2019s constant companion. Both were engine-swept again before this page was written: every row below is a verdict the verifier re-ran on a 601-seat grid, not a memory transcribed.' },
    { kind: 'table', caption: 'The six sign cases of ax² + bx + c — the first master table, reunited from 2.1', head: ['case', 'the picture', 'the verdict'], rows: [
      ['$a > 0$, $D < 0$', 'upward, floats above', '$f(x) > 0$ for every real $x$ — range $\\left[-\\frac{D}{4a}, \\infty\\right)$ entirely positive'],
      ['$a > 0$, $D = 0$', 'upward, touches once', '$f(x) \\geq 0$ with $f = 0$ only at $x = -\\frac{b}{2a}$'],
      ['$a > 0$, $D > 0$', 'upward, dips below', '$f > 0$ outside the roots, $f < 0$ between them'],
      ['$a < 0$, $D > 0$', 'downward, arches above', '$f > 0$ between the roots, $f < 0$ outside'],
      ['$a < 0$, $D = 0$', 'downward, touches once', '$f(x) \\leq 0$ with $f = 0$ only at $x = -\\frac{b}{2a}$'],
      ['$a < 0$, $D < 0$', 'downward, hangs below', '$f(x) < 0$ for every real $x$ — range $\\left(-\\infty, -\\frac{D}{4a}\\right]$ entirely negative'],
    ] },
    { kind: 'table', caption: 'The k-system — the second master table, reunited from 2.4: every location question as conditions on the coefficients', head: ['the question', 'the conditions', 'D check?'], rows: [
      ['both roots $> k$', '$D \\geq 0$, $\\;a \\cdot f(k) > 0$, $\\;-\\tfrac{b}{2a} > k$', 'yes'],
      ['both roots $< k$', '$D \\geq 0$, $\\;a \\cdot f(k) > 0$, $\\;-\\tfrac{b}{2a} < k$', 'yes'],
      ['$k$ between the roots ($\\alpha < k < \\beta$)', '$a \\cdot f(k) < 0$', 'NO — a sign change forces two real doors'],
      ['exactly one root in $(k_1, k_2)$', '$f(k_1) \\cdot f(k_2) < 0$', 'NO — the sign change certifies it (boundary seat: see the caution below)'],
      ['both roots in $(k_1, k_2)$', '$D \\geq 0$, $\\;a \\cdot f(k_1) > 0$, $\\;a \\cdot f(k_2) > 0$, $\\;k_1 < -\\tfrac{b}{2a} < k_2$', 'yes'],
      ['both walls between the roots ($\\alpha < k_1 < k_2 < \\beta$)', '$a \\cdot f(k_1) < 0$ and $a \\cdot f(k_2) < 0$', 'NO — both sign changes certify it'],
      ['roots of opposite sign ($\\alpha < 0 < \\beta$)', '$a \\cdot f(0) < 0$, i.e. $ac < 0$', 'NO — the row above at $k = 0$'],
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The a·f(k) principle', text: 'For $f(x) = ax^2 + bx + c$ and any wall $k$: the sign of $a \\cdot f(k)$ says which side of the door pair the wall sits on — $a \\cdot f(k) > 0$ means $k$ lies OUTSIDE the pair (both doors on one side), $a \\cdot f(k) < 0$ means $k$ lies BETWEEN the doors — and this verdict is INDEPENDENT of the opening, because multiplying by $a$ prices the doors, not the curve. Thus $a \\cdot f(k) < 0$ needs no discriminant check (the crossing is forced), while $a \\cdot f(k) > 0$ always does: the impostor family $x^2 - 2x + 5$ passes the wall tests at $k = 1$ and $k = 5$ ($f = 4$ and $20$) while owning no doors at all ($D = -16$).' },
    { kind: 'para', text: 'The two tables are one reading in different dress. $D$ counts the doors — two, one-touch, none; the sign rows say where the machine sits relative to the axis between those doors; the k-system rows say where any WALL sits relative to the doors. And the honesty notes travel with the tables as one lesson: the conjunctive trap of 2.1 (half the always-sign law is not the law) and the D-skip trap of 2.4 (skipping $D$ is earned, not free) are the SAME trap seen from the two ends of the chapter — a condition quietly dropped is a counter-witness quietly admitted. The boundary caution rides with them: a door sitting exactly ON a wall makes $f(k) = 0$, and the honest count is then done by hand — the open interval keeps such a door outside.' },
    { kind: 'callout', tone: 'insight', title: 'D — the constant companion', text: 'The discriminant is the chapter\u2019s through-line. In 2.1 it graded the sign verdicts (the six cases); in 2.2 it counted the fences for the sign diagram; in 2.3 its non-negativity priced the hunts (both doors real, the m-censuses) and its vanishing certified repeated seats; in 2.4 it demanded admission in the YES-rows of the k-system and was earned out of the NO-rows. One discipline carries forward: whenever a verdict skips $D$, be able to say WHY in one line — the sign change forces the crossing, or the negative value forces the dip. $D$ is the doors\u2019 reality certificate; skipping it is a right that must be earned, never a corner that may be cut.' },

    { kind: 'heading', text: 'The Cross-Lesson Witnesses, Re-Audited' },
    { kind: 'para', text: 'Four exhibits carried the chapter\u2019s weight — one anchored in each lesson — and a review earns its keep by re-auditing them TOGETHER: each is verified once more by the engine, and each now prices more than the lesson that introduced it. The fence taught the vertex; here it also runs a sign read and a discriminant read. The sign ladder taught the bands; here it also carries Viète and the wall tests. The inventory taught the no-solve census; here it stands as the chapter\u2019s arithmetic core. The census family taught location; here its fixed point prices every m-question before it is asked.' },
    { kind: 'example', title: 'One machine, four readings: f(x) = x² − 4x + 3 = (x − 1)(x − 3)', steps: [
      'The vertex read (2.1): $f(x) = (x-2)^2 - 1$ — vertex $(2, -1)$, range $[-1, \\infty)$; the machine dips exactly one unit below the axis, and $D = 4 > 0$ says it crosses twice.',
      'The sign read (2.2): $f < 0$ exactly on $(1, 3)$ — the between-roots band for an upward machine; $f \\geq 0$ on the two outer rays, with the fence seats $1$ and $3$ themselves owning $f = 0$, which $\\geq$ keeps and $>$ drops.',
      'The Viète read (2.3): $S = 4$, $P = 3$, $|\\alpha - \\beta| = \\sqrt{16 - 12} = 2$ — priced without solving, and honestly cross-checked: the doors are indeed $1$ and $3$.',
      'The location read (2.4): both doors inside $(0, 4)$ — $a \\cdot f(0) = 3 > 0$ (the wall 0 outside-left), $a \\cdot f(4) = 3 > 0$ (the wall 4 outside-right), seat $2 \\in (0, 4)$, $D = 4 \\geq 0$: four green checks, the bridge crossing on the first try.',
      'And a fifth read rides free (2.3\u2019s figure pair): $x^2 - 4x + 3$ and $x^2 - 2x - 3$ share the door $3$, and the one-common-root condition certifies it — $6^2 = 36 = 18 \\times 2$. Hence ONE machine, and every lesson in the chapter owns a question about it — the figure below annotates all four readings on this single curve.',
    ] },
    { kind: 'figure', svg: fourReadingsSvg(), caption: 'One machine, annotated by all four readings: the vertex $(2, -1)$ with its range bracket; the fenced zeros $1$ and $3$ with the negative band shaded between them; the Viète tags $S = 4$, $P = 3$, $|\\alpha - \\beta| = 2$ in the legend; the walls $0$ and $4$ (the y-axis itself is the wall $x = 0$) with $a \\cdot f > 0$ at both, and the bracket certifying both doors inside $(0, 4)$. The legend\u2019s four rows are the chapter\u2019s whole claim: the same machine answers all four.' },
    { kind: 'example', title: 'The fence re-audited: A(x) = x(12 − x), the area machine of the 24-metre fence', steps: [
      'The vertex read (2.1, as taught): $A(x) = 36 - (x-6)^2$ — greatest area $36$ at the $6 \\times 6$ square; the sample rectangles $4 \\times 8$ and $8 \\times 4$ fence $32$ each, and $9 \\times 3$ fences $27$.',
      'The sign read (2.2, added): $A(x) > 32 \\iff (x-6)^2 < 4 \\iff x \\in (4, 8)$ — the widths that BEAT the $32$ of the $4 \\times 8$ rectangle are exactly the widths between the two widths that TIE it. The fence question and the sign-band question are the same question in two costumes.',
      'The discriminant read (2.1\u2019s range method, cashed): the widths that fence area $A$ are the doors of $x^2 - 12x + A = 0$, whose discriminant reads $144 - 4A$ — real widths exactly when $A \\leq 36$, the double width $6$ exactly when $A = 36$, and NO width when $A = 37$.',
      'Hence the area bound IS a discriminant bound: the vertex engine and the D-method are two costumes of one completion — and the fence, the chapter\u2019s first exhibit, is also its deepest.',
    ] },
    { kind: 'example', title: 'The census family re-audited: f(x) = x² − (m+1)x + 3m − 5, the fifteen-question machine', steps: [
      'The fixed point (2.4): at $x = 3$ the $m$-terms cancel — $f(3) = 9 - 12 + 9 - 5 = 1$ for EVERY $m$; the whole family pivots through $(3, 1)$. One line of collecting: $f(x) = (x^2 - x - 5) + m(3 - x)$, and the parameter dies at $x = 3$.',
      'The doors: $D = (m-3)(m-7)$ — real doors exactly on $m \\leq 3$ or $m \\geq 7$; and the wall $3$ NEVER falls between the doors, whatever the questioner hoped, because $f(3) = 1 > 0$ always (the fixed-point law: some verdicts are priced before they are asked).',
      'A positive-doors hunt, honestly run: both doors positive demands $S = m+1 > 0$ AND $P = 3m - 5 > 0$ AND $D \\geq 0$ — the intersection $\\frac{5}{3} < m \\leq 3$ or $m \\geq 7$. The witnesses: $m = 2$ gives the doors $\\frac{3 \\pm \\sqrt{5}}{2} \\approx 0.38,\\ 2.62$ (both positive); $m = 6$ owns $D = -3 < 0$, no doors at all — excluded before sign is even asked; $m = 8$ gives $\\frac{9 \\pm \\sqrt{5}}{2} \\approx 3.38,\\ 5.62$.',
      'Hence the family\u2019s lesson: 2.1\u2019s always-sign CONJUNCTION and 2.4\u2019s WALL discipline shake hands here — every m-census ends as an intersection of half-lines, and the boundary seats ($m = 3$, $m = 7$) are always the doors\u2019 own births and deaths.',
    ] },
    { kind: 'example', title: 'The interleaving instance, solved and banded: 2(x + 1)(x − 5) + 3(x − 2)(x − 7) = 0', steps: [
      'The expansion: $2(x^2 - 4x - 5) + 3(x^2 - 9x + 14) = 5x^2 - 35x + 32$ — one quadratic after all.',
      'The four-value bracket (2.2, before solving): $F(-1) = 72 > 0$, $F(2) = -18 < 0$, $F(5) = -18 < 0$, $F(7) = 32 > 0$ — the $+\\;-\\;-\\;+$ walk forces one door in each inner band before anything is solved.',
      'The doors (2.4, the census run): $x = \\frac{35 \\pm 3\\sqrt{65}}{10}$ — that is, $\\approx 1.08$ and $\\approx 5.92$, landing in $(-1, 2)$ and $(5, 7)$ exactly as the bracket promised; the escaper sign $\\mu + \\lambda = 5 > 0$ keeps the outer bands positive, so nothing rides past $-1$ or $7$.',
      'Hence the interleaving census of 2.4, run on the gem 2.2 proved — one principle, two lessons, zero accidents (and the verifier re-checked all four bracket values and both bands before this line was written).',
    ] },
    { kind: 'callout', tone: 'insight', title: 'How the witnesses interlock', text: 'The fence\u2019s area bound is the discriminant-range method in work clothes; the ladder\u2019s bands are Viète\u2019s doors wearing signs; the census family\u2019s verdicts are the always-sign conjunction intersected with the wall conditions; the interleaving instance is the sign bracket producing the location census. Nothing in the chapter stands alone — and neither does the chapter: AL\u2019s door metaphor became a discipline, 1.R\u2019s machine grammar became four questions, and the function zoo\u2019s editing rules priced every transformation the transformation engine ran.' },

    { kind: 'heading', text: 'The Laws Worth Recalling' },
    { kind: 'para', text: 'The chapter deposited twenty-two formula cards — five from 2.1, five from 2.2, six from 2.3, six from 2.4 — and the reader\u2019s formula-sheet page aggregates them automatically. Eight of them are load-bearing: the laws the next chapters will actually reach for, each re-verified by the chapter\u2019s engine before this page was written. The cards first, the vocabulary after:' },
    { kind: 'formula', name: 'The completion identity and the vertex', latex: 'a\\left(x + \\tfrac{b}{2a}\\right)^2 - \\tfrac{D}{4a} = ax^2 + bx + c, \\qquad \\text{vertex}\\ \\left(-\\tfrac{b}{2a},\\ -\\tfrac{D}{4a}\\right)', note: 'a > 0: range [−D/4a, ∞); a < 0: range (−∞, −D/4a] — every extreme is one completion away' },
    { kind: 'formula', name: 'The always-sign law', latex: 'f \\geq 0\\ \\forall x \\iff a > 0 \\wedge D \\leq 0; \\qquad f \\leq 0\\ \\forall x \\iff a < 0 \\wedge D \\leq 0', note: 'the conjunction IS the law — either half alone admits the counter-witness (x² − 4x + 3 dips; −(x − 2)² + 1 peaks)' },
    { kind: 'formula', name: 'The between-roots sign law', latex: 'a > 0:\\ f > 0 \\iff x \\notin [\\alpha, \\beta]; \\qquad a \\cdot f(k) < 0 \\iff \\alpha < k < \\beta \\ \\ \\text{(any } a\\text{)}', note: 'the flip discipline: a < 0 reverses every between-read; a·f(k) < 0 needs no D-check — the crossing is forced' },
    { kind: 'formula', name: 'Viète and the inventory', latex: 'S = -\\tfrac{b}{a},\\ P = \\tfrac{c}{a}; \\qquad \\alpha^2 + \\beta^2 = S^2 - 2P,\\quad \\alpha^3 + \\beta^3 = S^3 - 3PS,\\quad (\\alpha - \\beta)^2 = S^2 - 4P', note: 'the no-solve licence: price the symmetric questions before ever opening the formula' },
    { kind: 'formula', name: 'The power-sum recurrence', latex: 'T_0 = 2, \\qquad T_1 = S, \\qquad T_{k+2} = S\\,T_{k+1} - P\\,T_k', note: 'the Lucas engine — α⁵ + β⁵ = S⁵ − 5PS³ + 5P²S, and every higher power likewise' },
    { kind: 'formula', name: 'The common-root conditions', latex: 'f_1, f_2 \\text{ share a door} \\iff (c_1a_2 - c_2a_1)^2 = (b_1c_2 - b_2c_1)(a_1b_2 - a_2b_1); \\qquad \\text{both doors} \\iff (a_1, b_1, c_1) \\propto (a_2, b_2, c_2)', note: 'one shared is a determinant equation; both shared is proportionality — never confuse the two censuses' },
    { kind: 'formula', name: 'The k-system, condensed', latex: '\\text{both in } (k_1, k_2):\\ D \\geq 0,\\ a\\!\\cdot\\! f(k_1) > 0,\\ a\\!\\cdot\\! f(k_2) > 0,\\ k_1 < -\\tfrac{b}{2a} < k_2; \\qquad \\text{exactly one: } f(k_1) \\cdot f(k_2) < 0', note: 'the a·f(k) principle prices the side; a door ON a wall is always counted by hand' },
    { kind: 'formula', name: 'The antiderivative weights law', latex: '2a\\ell^2 + 3b\\ell + 6c = 0 \\ \\Rightarrow\\ \\text{a door in } (0, \\ell) \\quad \\text{(Rolle on } F = \\tfrac{a}{3}x^3 + \\tfrac{b}{2}x^2 + cx\\text{)}', note: 'the weights are the interval in disguise: 18a + 9b + 6c = 0 sends the door into (0, 3)' },
    { kind: 'terms', items: [
      { term: 'the four readings', def: 'every quadratic question is a vertex, sign, Vi\u00e8te or location question — name the reading first, then run the table that owns it.' },
      { term: 'zero of an expression vs root of an equation', def: 'the seats where f vanishes are the zeros of the expression; the same seats are the roots of f(x) = 0 — the equation asks for them, the sign question fences them.' },
      { term: 'sign diagram', def: 'the number line with fences at the zeros and the +/\u2212 bands between them — the wavy-curve method\u2019s quadratic case.' },
      { term: 'symmetric function of the roots', def: 'an expression in \u03b1 and \u03b2 unchanged under the swap \u03b1 \u2194 \u03b2 — exactly the functions S and P price without solving.' },
      { term: 'wall', def: 'a fixed number k interrogated against the doors: between them, beyond them, or carrying exactly one of them on its face.' },
      { term: 'the a\u00b7f(k) principle', def: 'multiply f(k) by the leading sign a: the sign of a\u00b7f(k) says which side of the door pair the wall k sits on — positive outside, negative between, for either opening.' },
      { term: 'fixed point of a family', def: 'a seat where the parameter cancels — f(3) = 1 for every m in the census family — pricing whole classes of questions before they are asked.' },
    ] },

    { kind: 'heading', text: 'The Traps the Hall Sets' },
    { kind: 'para', text: 'The chapter\u2019s own caution shelf, compressed to the six traps the examination hall actually sets — each is one lesson\u2019s discipline pointed at one wrong instinct:' },
    { kind: 'list', marker: 'roman', items: [
      '**The conjunctive trap** — half of the always-sign law is not the law: $x^2 - 4x + 3$ opens upward yet $f(2) = -1$; the verdict demands $a > 0$ AND $D \\leq 0$ together (2.1).',
      '**The endpoint-touch honesty** — a double door counts for \u201cexceeds\u201d ($m = 4$ in the canonical drill: $(x-2)^2$, the door 2 exceeds 1), while a door ON a wall does not lie in the OPEN interval ($c = 0$ and $c = 10$ of the bench below: doors 0 and 2 sit on the walls themselves) (2.2, 2.4).',
      '**The asymmetric census** — $\\alpha - \\beta$ is not symmetric, so the readable object is its square; and the square-root reads ($\\sqrt{\\alpha} + \\sqrt{\\beta}$) demand their licence first (2.3).',
      '**One shared \u2260 both shared** — the m-census $\\{-7, 6\\}$ of 2.3: $m = -7$ shares ONE root while only $m = 6$ makes the pair proportional — the determinant condition and proportionality answer different questions.',
      '**The D-skip is earned, not free** — $x^2 - 2x + 5$ passes the wall tests at $k = 1$ and $k = 5$ ($f = 4$, $20$) yet owns no doors ($D = -16$); skip $D$ only where the sign change forces the crossing (2.4).',
      '**The degenerate endpoint** — the rational range $(1, 3]$: the discriminant method says $1 \\leq y \\leq 3$, but at $y = 1$ the quadratic in $x$ degenerates to $-4 = 0$ — the boundary is never attained, and the honest range drops it (2.1).',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The one warning that carries forward', text: 'Chapter 3 climbs the extension ladder to the negative discriminant: the $D < 0$ cases this chapter kept meeting and filing away get theirs — a number $i$ forced by $x^2 + 1 = 0$, the conjugate bookkeeping, and the doors turning complex in conjugate pairs. Every verdict discipline of this chapter (the conjunction, the census, the wall honesty, the boundary seats) reappears there on the new rung. Carry the toolkit intact — the quadratic at depth was the rehearsal, not the end.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — how a chapter is actually priced', text: 'All exam-style items in this book are our own, honestly labelled: none is reproduced from an official paper. The chapter\u2019s census of shapes: extreme-value and range questions (completion or the discriminant method); always-sign parameter hunts (the conjunctive law); inequality solving (all four case families, strict and non-strict, union answers); the Vi\u00e8te inventory priced no-solve; reconstruction and transformation of equations; repeated-seat and common-root censuses; location systems (both roots, exactly one, opposite signs, interval-interior); interleaving and two-quadratic items; rational ranges with endpoint honesty; two-variable bounds. The mixed bench below prices every one of these families, several per item — exactly the way a hall prices a chapter. Every number in it was recomputed by the verifier before it was written.' },
    { kind: 'callout', tone: 'historical', title: 'The two-century arc', text: 'The chapter\u2019s two engines carry its history. Completing the square is al-Khw\u0101rizm\u012b\u2019s move (Baghdad, c. 820): his al-jabr restored the broken pieces of an area before reading them, and the vertex form is that restoration priced for extremes. The symmetric reads are Vi\u00e8te\u2019s (published 1615, posthumously, in De aequationum recognitione et emendatione): the coefficients, he saw, already carry the roots\u2019 sum and product. The location drills — walls, censuses, interleaving — are the modern examination hall\u2019s own dialect, resting on the intermediate value theorem of the nineteenth century. Three centuries of craft, one chapter.' },

    { kind: 'heading', text: 'The Chapter Closes' },
    { kind: 'para', text: 'And so the chapter closes. Elementary Algebra handed this book a settled equation; the book returned the favour by interrogating it four ways. The expression was priced (every range a vertex question), fenced (every sign question a door question), mined (every symmetric question a coefficient question), and pinned (every location question a wall question). AL\u2019s door metaphor became a discipline; 1.R\u2019s machine grammar became four questions; and the whole family of $D < 0$ cases the chapter kept meeting and filing away — the floating parabolas, the non-real doors of the census hunts — becomes the next chapter\u2019s opening business: the doors turn complex, the ladder climbs, $i$ is forced. The quadratic at depth is done; the quadratic beyond the real line begins.' },
    { kind: 'para', text: 'Use the review honestly and it will diagnose you. Attempt the mixed bench WITHOUT looking back at the lessons; every miss names its lesson by its shape — a missed conjunction sends you to 2.1, a missed endpoint to 2.2, a missed licence to 2.3, a missed boundary seat to 2.4. The five quiz questions are the chapter in miniature: one vertex, one sign, one inventory read, one location drill, one fixed point. Score them honestly, revisit exactly what the misses name, and the chapter is yours.' },
    { kind: 'quiz', title: 'Check yourself \u2014 the chapter in five questions', items: [
      { q: 'The range of f(x) = 2x\u00b2 \u2212 8x + 3 is', options: ['(\u2212\u221e, \u22125]', '[\u22125, \u221e)', '[3, \u221e)', '[0, \u221e)'], answer: 1, explain: 'Completing: $2x^2 - 8x + 3 = 2(x-2)^2 - 5$, an upward machine with floor $-5$ — the range is $[-5, \\infty)$. Option 0 reverses the direction (an upward machine owns a floor, not a ceiling); option 2 reads the y-intercept $f(0) = 3$ as the floor; option 4 overreaches the \u201csquare is never negative\u201d instinct — true only when the vertex lifts to 0.' },
      { q: 'The solution of (x \u2212 1)(x \u2212 4) \u2265 0 is', options: ['1 \u2264 x \u2264 4', 'x \u2264 1 or x \u2265 4', 'x < 1 or x > 4', '1 < x < 4'], answer: 1, explain: 'The upward machine is positive outside its doors $1$ and $4$, zero ON them — and $\\geq 0$ keeps those seats: $x \\leq 1$ or $x \\geq 4$. Option 0 is the between-band inverted ($f < 0$ lives there); option 2 needlessly drops the seats where $f = 0$, which $\\geq$ keeps; option 3 is the strict interior, doubly wrong.' },
      { q: 'If \u03b1 and \u03b2 are the roots of x\u00b2 \u2212 6x + 4 = 0, then \u03b1\u00b2 + \u03b2\u00b2 equals', options: ['36', '24', '28', '20'], answer: 2, explain: '$S = 6$, $P = 4$, so $\\alpha^2 + \\beta^2 = S^2 - 2P = 36 - 8 = 28$. Option 0 is $S^2$ alone (forgets the $-2P$); option 1 subtracts $2 \\cdot 6$ — the coefficient $b$ misread as the product; option 3 is $S^2 - 4P$ — the DIFFERENCE square $(\\alpha - \\beta)^2$, the classic near-miss between the two inventory reads.' },
      { q: 'Both roots of x\u00b2 \u2212 4x + m = 0 exceed 1 exactly when', options: ['m > 3', '3 < m \u2264 4', 'm \u2264 4', 'm \u2265 3'], answer: 1, explain: 'The three rows: $D = 16 - 4m \\geq 0$ (so $m \\leq 4$), $a \\cdot f(1) = m - 3 > 0$ (so $m > 3$), seat $2 > 1$ always — together $3 < m \\leq 4$, with $m = 4$ included because its double door $2$ exceeds 1. Option 0 forgets the ceiling: $m = 5$ owns no doors at all ($D = -4$); option 2 forgets the wall test: $m = 0$ owns door 0; option 3 forgets the strictness: $m = 3$ owns door 1, which does not EXCEED 1.' },
      { q: 'For every real m, the curve y = x\u00b2 \u2212 (m+1)x + 3m \u2212 5 passes through the fixed point', options: ['(3, 1)', '(1, 3)', '(\u22123, 1)', '(3, \u22121)'], answer: 0, explain: 'At $x = 3$ the $m$-terms cancel: $f(3) = 9 - 12 + 9 - 5 = 1$ — the whole family pivots through $(3, 1)$. Option 1 swaps the coordinates; options 2 and 3 flip signs — the fixed point is found by CANCELLING the parameter, and only $x = 3$ kills it in the collected form $(x^2 - x - 5) + m(3 - x)$.' },
    ] },
    { kind: 'exercises', title: 'Exercises 2.R \u2014 the mixed bench', sets: [
      { level: 'L1', questions: [
        { q: 'Complete the square for f(x) = 2x\u00b2 \u2212 8x + 3 and read off its vertex and range.', solution: [
          'The completion: $2x^2 - 8x + 3 = 2(x^2 - 4x) + 3 = 2(x - 2)^2 - 8 + 3 = 2(x - 2)^2 - 5$.',
          'So the vertex is $(2, -5)$ and, the opening being upward, the range is $[-5, \\infty)$.',
          'The discriminant cross-check: $D = 64 - 24 = 40$, and $-\\frac{D}{4a} = -\\frac{40}{8} = -5$ — two routes, one floor.',
        ], answer: 'vertex (2, \u22125); range [\u22125, \u221e)' },
        { q: 'Solve x\u00b2 \u2212 x + 3 < 0 over the reals.', solution: [
          'The discriminant: $D = 1 - 12 = -11 < 0$ with $a = 1 > 0$ — the machine is positive at every seat.',
          'Equivalently the completed floor: $x^2 - x + 3 = \\left(x - \\frac{1}{2}\\right)^2 + \\frac{11}{4} \\geq \\frac{11}{4} > 0$.',
          'So the inequality owns no solution — the empty set is an honest answer, and whole-line-verdict questions plant it on purpose.',
        ], answer: 'no solution (the empty set)' },
      ] },
      { level: 'L2', questions: [
        { q: 'The roots of 2x\u00b2 \u2212 7x + 3 = 0 are \u03b1 and \u03b2. Write down \u03b1 + \u03b2, \u03b1\u03b2 and \u03b1\u00b2 + \u03b2\u00b2, without solving.', solution: [
          'Vi\u00e8te: $S = \\alpha + \\beta = \\frac{7}{2}$ and $P = \\alpha\\beta = \\frac{3}{2}$ — priced straight off the coefficients.',
          'The inventory: $\\alpha^2 + \\beta^2 = S^2 - 2P = \\frac{49}{4} - 3 = \\frac{37}{4}$.',
          'The honest cross-check (the licence allows it here): the doors are $\\frac{1}{2}$ and $3$, and $\\frac{1}{4} + 9 = \\frac{37}{4}$ \u2713.',
        ], answer: 'S = 7/2, P = 3/2, \u03b1\u00b2 + \u03b2\u00b2 = 37/4' },
        { q: 'Two numbers have sum 12. Find (i) their greatest possible product and (ii) the least possible value of the sum of their squares.', solution: [
          '(i) Name the pair $x$ and $12 - x$: the product is $x(12 - x) = 36 - (x - 6)^2 \\leq 36$, attained at $x = 6$.',
          '(ii) The square-sum: $x^2 + (12 - x)^2 = 2(x - 6)^2 + 72 \\geq 72$, also at $x = 6$.',
          'So the same seat maximizes the product and minimizes the square-sum — the balanced pair, both times.',
        ], answer: 'greatest product 36; least square-sum 72 — both at (6, 6)' },
      ] },
      { level: 'L3', questions: [
        { q: 'For f(x) = x\u00b2 \u2212 7x + 10: (i) solve f(x) < 0; (ii) write down S and P for its roots; (iii) find |\u03b1 \u2212 \u03b2| \u2014 all without the quadratic formula.', solution: [
          '(i) The fences sit at the factor seats $f(x) = (x - 2)(x - 5)$, so $f < 0$ exactly between them: $x \\in (2, 5)$.',
          '(ii) Vi\u00e8te: $S = 7$, $P = 10$ — priced straight off the coefficients.',
          '(iii) $|\\alpha - \\beta| = \\sqrt{S^2 - 4P} = \\sqrt{49 - 40} = 3$ — and honestly, the doors 2 and 5 agree.',
        ], answer: '(i) (2, 5); (ii) S = 7, P = 10; (iii) 3' },
        { q: 'Form the quadratic equation whose roots are the reciprocals of the roots of 4x\u00b2 \u2212 12x + 5 = 0.', solution: [
          'The reversal law: for $ax^2 + bx + c$ with no zero root, the reciprocal equation is $cx^2 + bx + a = 0$ — swap the end coefficients, keep the middle.',
          'Here: $4x^2 - 12x + 5 \\to 5x^2 - 12x + 4 = 0$.',
          'The census check: the original doors are $\\frac{1}{2}$ and $\\frac{5}{2}$; their reciprocals $2$ and $\\frac{2}{5}$ are exactly the doors of $5x^2 - 12x + 4 = (5x - 2)(x - 2)$ \u2713.',
        ], answer: '5x\u00b2 \u2212 12x + 4 = 0' },
        { q: 'Find every c for which x\u00b2 \u2212 7x + c = 0 has exactly one root in the open interval (0, 2).', solution: [
          'The seat $\\frac{7}{2} = 3.5$ never enters $(0, 2)$, so BOTH doors inside is impossible — the only route is one in, one out: a sign change across the walls.',
          'The product test: $f(0) \\cdot f(2) < 0$ with $f(0) = c$ and $f(2) = 4 - 14 + c = c - 10$, so $c(c - 10) < 0$, that is $0 < c < 10$.',
          'The boundary honesty: at $c = 0$ the doors are $0$ and $7$ — door 0 sits ON the wall, not inside; at $c = 10$ the doors are $2$ and $5$ — door 2 sits ON the other wall. Both excluded by the OPEN interval, exactly as the strict product demands.',
          'The witness: $c = 4$ gives the doors $\\frac{7 \\pm \\sqrt{33}}{2} \\approx 0.63$ and $6.37$ — exactly one inside \u2713.',
        ], answer: '0 < c < 10' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find the range of f(x) = (x\u00b2 + 2x + 7)/(x\u00b2 + 2x + 3).', solution: [
          'The disguise: $f(x) = 1 + \\frac{4}{(x + 1)^2 + 2}$ — and $(x + 1)^2 + 2 \\geq 2 > 0$, so $0 < \\frac{4}{(x+1)^2 + 2} \\leq 2$.',
          'So $1 < f(x) \\leq 3$: the top $3$ is attained at $x = -1$ (the denominator\u2019s vertex seat, the double-root seat of the D-method); the bottom $1$ is approached as the square climbs, never attained.',
          'The discriminant route agrees, with its endpoint honesty: $(y - 1)x^2 + (2y - 2)x + (3y - 7) = 0$ has a real door exactly when $-8(y - 1)(y - 3) \\geq 0$, that is $1 \\leq y \\leq 3$ — and at $y = 1$ the equation degenerates to $-4 = 0$, so the boundary is empty there. The range is $(1, 3]$.',
        ], answer: '(1, 3]' },
        { q: 'Find every m for which both roots of x\u00b2 \u2212 (m+2)x + 2m + 1 = 0 exceed 1.', solution: [
          'The k-system rows: $D = (m+2)^2 - 4(2m + 1) = m^2 - 4m = m(m - 4) \\geq 0$; $a \\cdot f(1) = 1 - (m + 2) + 2m + 1 = m > 0$; the seat $\\frac{m + 2}{2} > 1$.',
          'The seat demands $m > 0$, which kills the $m \\leq 0$ branch of $D \\geq 0$ — leaving $m \\geq 4$.',
          'The boundary honesty: at $m = 4$ the machine is $(x - 3)^2$, the double door $3$ exceeds 1 — INCLUDED, and $a \\cdot f(1) = 4 > 0$ holds. At $m = 2$ the machine $x^2 - 4x + 5$ owns $D = -4$: no doors at all — the impostor the discriminant row exists to catch.',
        ], answer: 'm \u2265 4' },
        { q: 'Find every k for which x\u00b2 + kx \u2212 6 = 0 shares a root with x\u00b2 \u2212 5x + 6 = 0 \u2014 and name the shared door in each case.', solution: [
          'The census discipline: the second machine\u2019s doors are $2$ and $3$; test each as a door of the first.',
          'Door 2: $4 + 2k - 6 = 0$ gives $k = 1$ — the machines $x^2 + x - 6 = (x + 3)(x - 2)$ and $x^2 - 5x + 6$ share the door 2.',
          'Door 3: $9 + 3k - 6 = 0$ gives $k = -1$ — $x^2 - x - 6 = (x - 3)(x + 2)$ shares the door 3.',
          'And ONE shared is all there is: proportionality fails ($(1, k, -6)$ against $(1, -5, 6)$), so the both-common verdict is off the table — the determinant condition would price it if asked.',
        ], answer: 'k = 1 (shares door 2) or k = \u22121 (shares door 3)' },
      ] },
      { level: 'L5', questions: [
        { q: 'Find every m for which t\u00b2 \u2212 (m+3)t + 2m + 1 < 0 for all t in the open interval (1, 3) \u2014 and note carefully what the answer turns out to be.', solution: [
          'The wall demands (2.4): an upward machine is negative throughout an open interval exactly when it is nonpositive at BOTH walls — $f(1) \\leq 0$ and $f(3) \\leq 0$ (the convexity certificate: the curve hangs below its chord, and strictness inside is earned by the two-root structure).',
          'The reads: $f(1) = 1 - (m + 3) + 2m + 1 = m - 1$ and $f(3) = 9 - 3(m + 3) + 2m + 1 = 1 - m$.',
          'So the demands read $m \\leq 1$ AND $m \\geq 1$ — the intersection is the SINGLE seat $m = 1$. The answer is a point, not a band — rare, honest, and worth seeing once.',
          'The check: at $m = 1$ the machine is $t^2 - 4t + 3 = (t - 1)(t - 3)$, negative strictly between its doors 1 and 3 — exactly the interval asked for; at any $m \\neq 1$ one wall flips and the demand dies (the verifier swept 31 m-seats to confirm it).',
        ], answer: 'm = 1, and only m = 1' },
        { q: '\u03b1 and \u03b2 are the roots of x\u00b2 \u2212 4x + 1 = 0. Form the equation whose roots are \u03b1 + 1/\u03b2 and \u03b2 + 1/\u03b1.', solution: [
          'The collapse: $P = \\alpha\\beta = 1$, so $\\frac{1}{\\beta} = \\alpha$ and $\\frac{1}{\\alpha} = \\beta$ — the new roots are $\\alpha + \\alpha = 2\\alpha$ and $\\beta + \\beta = 2\\beta$. The product-unity seat collapses the reciprocal read — worth recognizing at sight.',
          'The new symmetric reads: $S\u2019 = 2(\\alpha + \\beta) = 2S = 8$ and $P\u2019 = 4\\alpha\\beta = 4$.',
          'So the equation is $y^2 - 8y + 4 = 0$.',
          'The cross-check: the original doors are $2 \\pm \\sqrt{3}$, so the new doors are $4 \\pm 2\\sqrt{3} = 2(2 \\pm \\sqrt{3})$ — and $(4 + 2\\sqrt{3}) + (4 - 2\\sqrt{3}) = 8$, $(4 + 2\\sqrt{3})(4 - 2\\sqrt{3}) = 16 - 12 = 4$ \u2713.',
        ], answer: 'y\u00b2 \u2212 8y + 4 = 0' },
        { q: 'Solve 3(x + 1)(x \u2212 5) + 2(x \u2212 2)(x \u2212 7) = 0, and name the door band each root lands in.', solution: [
          'The expansion: $3(x^2 - 4x - 5) + 2(x^2 - 9x + 14) = 5x^2 - 30x + 13$.',
          'The four-value bracket before solving: $F(-1) = 48 > 0$, $F(2) = -27 < 0$, $F(5) = -12 < 0$, $F(7) = 48 > 0$ — the $+\\;-\\;-\\;+$ walk forces one door in each inner band already.',
          'The doors: $x = \\frac{30 \\pm \\sqrt{900 - 260}}{10} = \\frac{15 \\pm 4\\sqrt{10}}{5}$ — that is, $\\approx 0.47$ and $\\approx 5.53$.',
          'The banding: $0.47 \\in (-1, 2)$ and $5.53 \\in (5, 7)$ — exactly as the bracket promised; and the escaper sign $\\mu + \\lambda = 5 > 0$ keeps the outer bands positive, so nothing rides past $-1$ or $7$.',
        ], answer: 'x = (15 \u00b1 4\u221a10)/5 \u2248 0.47 and 5.53 \u2014 one door in (\u22121, 2), one in (5, 7)' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove that \u03b1\u2075 + \u03b2\u2075 = S\u2075 \u2212 5PS\u00b3 + 5P\u00b2S, where S = \u03b1 + \u03b2 and P = \u03b1\u03b2, and check the identity on both witnesses: x\u00b2 \u2212 x \u2212 1 = 0 and x\u00b2 \u2212 4x + 1 = 0.', solution: [
          'The recurrence engine: the monic form of the equation is $x^2 = Sx - P$, so every root satisfies $\\alpha^{k+2} = S\\alpha^{k+1} - P\\alpha^k$, and likewise for $\\beta$; summing the two gives $T_{k+2} = S\\,T_{k+1} - P\\,T_k$ with $T_0 = 2$ and $T_1 = S$.',
          'Running the engine: $T_2 = S^2 - 2P$, $T_3 = S^3 - 3PS$, $T_4 = S^4 - 4PS^2 + 2P^2$, and $T_5 = S\\,T_4 - P\\,T_3 = S^5 - 5PS^3 + 5P^2S$ — the terms collect exactly as claimed, and the identity stands proved.',
          'Witness one, $x^2 - x - 1 = 0$: $S = 1$, $P = -1$, so $T_5 = 1 + 5 + 5 = 11$ — the Lucas number $L_5$, the recurrence\u2019s most famous seat.',
          'Witness two, $x^2 - 4x + 1 = 0$: $S = 4$, $P = 1$, so $T_5 = 1024 - 320 + 20 = 724$ — and the engine\u2019s own ladder ($T_2 = 14$, $T_3 = 52$, $T_4 = 194$, $T_5 = 724$) agrees with the powers of $2 \\pm \\sqrt{3}$, which the verifier checked to nine decimal places.',
        ], answer: 'proved \u2014 witnesses 11 (the Lucas number) and 724' },
        { q: 'Given that 18a + 9b + 6c = 0, prove that the equation ax\u00b2 + bx + c = 0 has a root in the open interval (0, 3).', solution: [
          'Invent the antiderivative whose derivative IS the machine: $F(x) = \\frac{a}{3}x^3 + \\frac{b}{2}x^2 + cx$, so that $F\u2019(x) = ax^2 + bx + c$ — the weights are the interval in disguise.',
          'The two ends: $F(0) = 0$, and $F(3) = 9a + \\frac{9b}{2} + 3c = \\frac{18a + 9b + 6c}{2} = 0$ — the given condition is EXACTLY $2\\,F(3) = 0$.',
          'So $F(0) = F(3)$, and Rolle\u2019s theorem hands over a seat $x^* \\in (0, 3)$ with $F\u2019(x^*) = 0$, that is $ax^{*2} + bx^* + c = 0$ — a root inside the open interval, as demanded.',
          'The witness: $a = 1$, $b = 0$, $c = -3$ satisfies $18 + 0 - 18 = 0$, and $x^2 - 3 = 0$ owns the door $\\sqrt{3} \\approx 1.73 \\in (0, 3)$ \u2713; the verifier swept 39 weighted machines and every one owned its door.',
        ], answer: 'proved \u2014 Rolle on F = ax\u00b3/3 + bx\u00b2/2 + cx with F(0) = F(3) = 0' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* chapter assembly                                                    */
/* ------------------------------------------------------------------ */

export const chapter02: Chapter = {
  number: 2,
  slug: 'the-quadratic-at-depth',
  title: 'The Quadratic at Depth',
  summary:
    'Elementary Algebra settled the quadratic equation four ways; this chapter treats the quadratic as a working object. The vertex form becomes an optimization tool — maxima and minima priced without calculus, the range read off the fold and then used on real constraints. The equation grows into the inequality: the sign diagram, the discriminant trichotomy (two sign changes, one touch, constant sign), and the solution sets that AL 7.1–7.3’s linear work promised. Viète returns at competitive depth — symmetric expressions in the roots, common roots, forming equations with given roots — and the chapter closes with the JEE classic: conditions that pin both roots, or exactly one, inside a chosen interval. Every door metaphor AL coined for a root is now located on the line.',
  status: 'complete',
  lessons: [lesson21, lesson22, lesson23, lesson24, lessonReview],
  plannedLessons: [],
}
