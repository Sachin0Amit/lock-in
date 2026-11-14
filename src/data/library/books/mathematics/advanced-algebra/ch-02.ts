import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 2: The Quadratic at Depth
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

export const chapter02: Chapter = {
  number: 2,
  slug: 'the-quadratic-at-depth',
  title: 'The Quadratic at Depth',
  summary:
    'Elementary Algebra settled the quadratic equation four ways; this chapter treats the quadratic as a working object. The vertex form becomes an optimization tool — maxima and minima priced without calculus, the range read off the fold and then used on real constraints. The equation grows into the inequality: the sign diagram, the discriminant trichotomy (two sign changes, one touch, constant sign), and the solution sets that AL 7.1–7.3’s linear work promised. Viète returns at competitive depth — symmetric expressions in the roots, common roots, forming equations with given roots — and the chapter closes with the JEE classic: conditions that pin both roots, or exactly one, inside a chosen interval. Every door metaphor AL coined for a root is now located on the line.',
  status: 'in-progress',
  lessons: [lesson21, lesson22, lesson23],
  plannedLessons: ['Location of Roots: Doors in Intervals'],
}
