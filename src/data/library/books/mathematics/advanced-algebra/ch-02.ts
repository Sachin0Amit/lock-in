import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 2: The Quadratic at Depth
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

export const chapter02: Chapter = {
  number: 2,
  slug: 'the-quadratic-at-depth',
  title: 'The Quadratic at Depth',
  summary:
    'Elementary Algebra settled the quadratic equation four ways; this chapter treats the quadratic as a working object. The vertex form becomes an optimization tool — maxima and minima priced without calculus, the range read off the fold and then used on real constraints. The equation grows into the inequality: the sign diagram, the discriminant trichotomy (two sign changes, one touch, constant sign), and the solution sets that AL 7.1–7.3’s linear work promised. Viète returns at competitive depth — symmetric expressions in the roots, common roots, forming equations with given roots — and the chapter closes with the JEE classic: conditions that pin both roots, or exactly one, inside a chosen interval. Every door metaphor AL coined for a root is now located on the line.',
  status: 'in-progress',
  lessons: [lesson21],
  plannedLessons: ['Quadratic Inequalities and the Sign Diagram', 'Symmetric Reads and Common Roots', 'Location of Roots: Doors in Intervals'],
}
