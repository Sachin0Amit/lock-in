import type { Chapter, Lesson } from '../../../types'

/**
 * Advanced Algebra — Chapter 3: Complex Numbers: the New Rung
 *
 * LESSONS WRITTEN: 3.1 "The Closure Failure That Forces i" (run 105 —
 *                  the chapter OPENS; book.ts pins 3.2 Conjugate and
 *                  Modulus, 3.3 Negative Discriminants, 3.4 The Argand
 *                  Plane, 3.5 De Moivre/Roots of Unity as the remaining
 *                  planned lessons). Verify-first sections A–F green
 *                  BEFORE prose (106/0 — the closure-failure engines incl.
 *                  the 275/351 grid census, the iota cycle laws, the
 *                  pair-construction consistency sweep on all 6,561
 *                  integer quadruples, the field-law survival census,
 *                  the pinned Illustration exhibits incl. Bombelli's
 *                  (2+i)³ = 2+11i and the quarter-turn square orbit; the
 *                  engines caught 4 real errors pre-prose: a FOIL-route
 *                  sign slip, an (1−i)⁸ exponent error (the draft computed
 *                  the sixth power), and a float-equality lesson on the
 *                  reciprocal sweep); quiz keys [3, 1, 0, 2, 3]; 15
 *                  exercises L1–L6 with full worked solutions; 2 figures
 *                  — the extension ladder (five rungs, each born from a
 *                  closure failure) and the Argand quarter-turn orbit of
 *                  z = 2 + i (the square of side √10 with the ×i rotation
 *                  arc); 3 derivations (the multiplication rule forced by
 *                  FOIL + i² = −1, the division rule by conjugating the
 *                  denominator, the quarter-turn law with its two
 *                  certificates); 5 formula cards; 11 Illustrations; 5
 *                  hosted m2-03 folds served (Complex Numbers +
 *                  Complex Number chapter-umbrellas by the arc, Imaginary
 *                  Number + Equality of Complex Numbers glossary terms
 *                  used in prose, Algebraic Operations on Complex Numbers
 *                  as the named section with formal definition + worked
 *                  examples). The D < 0 doors are NAMED as 3.3's promise,
 *                  never cashed here; the modulus is named as 3.2's.)
 *
 * CROSS-REFERENCES: opens on AL 9.3's discriminant trichotomy (its third
 * verdict is the failure being repaired), ANS 7.2's field-law survival
 * discipline and ANS 8.1's ladder rung (√2 — the last proved closure
 * failure before this one), and AA 2.R's exit (the D rail handed
 * forward). Bombelli 1572 carries the historical engine. Lesson 3.2
 * (Conjugate and Modulus) cashes the seeds planted here.
 */

/* ------------------------------------------------------------------ */
/* figures                                                             */
/* ------------------------------------------------------------------ */

function extensionLadderSvg(): string {
  // five rising rungs left-to-right; each box carries the system glyph,
  // its name, the failure that forced it and the number it needed; the
  // top rung (ℂ — this chapter) is highlighted orange
  const rungs: Array<{ glyph: string; name: string; birth: string; needs: string; hl: boolean }> = [
    { glyph: 'ℕ', name: 'the naturals', birth: 'counting', needs: 'the ground floor', hl: false },
    { glyph: 'ℤ', name: 'the integers', birth: 'x + 5 = 3', needs: 'needs −2', hl: false },
    { glyph: 'ℚ', name: 'the rationals', birth: '3x = 7', needs: 'needs 7/3', hl: false },
    { glyph: 'ℝ', name: 'the reals', birth: 'x² = 2', needs: 'needs √2', hl: false },
    { glyph: 'ℂ', name: 'complex numbers', birth: 'x² + 1 = 0', needs: 'needs i', hl: true },
  ]
  const BW = 118
  const BH = 74
  const GAPX = 26
  const RISE = 52
  let boxes = ''
  let arrows = ''
  rungs.forEach((r, i) => {
    const x = 8 + i * (BW + GAPX)
    const y = 238 - i * RISE
    const stroke = r.hl ? '#ea580c' : '#16a34a'
    const fill = r.hl ? '#ffedd5' : '#fef3c7'
    boxes +=
      `<rect x="${x}" y="${y}" width="${BW}" height="${BH}" rx="9" fill="${fill}" stroke="${stroke}" stroke-width="2"/>` +
      `<text x="${x + BW / 2}" y="${y + 26}" font-size="19" font-weight="700" text-anchor="middle" fill="#166534">${r.glyph}</text>` +
      `<text x="${x + BW / 2}" y="${y + 41}" font-size="10" text-anchor="middle" fill="#0d9488">${r.name}</text>` +
      `<text x="${x + BW / 2}" y="${y + 57}" font-size="11.5" font-weight="700" text-anchor="middle" fill="#65a30d">${r.birth}</text>` +
      `<text x="${x + BW / 2}" y="${y + 69}" font-size="10" text-anchor="middle" fill="#166534">${r.needs}</text>`
    if (i < rungs.length - 1) {
      const x1 = x + BW + 3
      const y1 = y + BH / 2 - 6
      const x2 = x + BW + GAPX - 7
      const y2 = y + BH / 2 - RISE + 8
      arrows +=
        `<path d="M${x1} ${y1} L${x2} ${y2}" stroke="#d97706" stroke-width="2.2" fill="none"/>` +
        `<polygon points="0,0 -10,3 -7,-7" transform="translate(${x2},${y2}) rotate(-67)" fill="#d97706"/>`
    }
  })
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The extension ladder of number systems: five rising boxes for the naturals, integers, rationals, reals and complex numbers. Each box names the closure failure that forced the next system: x plus 5 equals 3 forced the integers (needs minus 2), 3x equals 7 forced the rationals (needs 7 thirds), x squared equals 2 forced the reals (needs root 2), and x squared plus 1 equals 0 forces the complex numbers (needs i). The complex box at the top is highlighted. Amber arrows climb left to right; a caption states that every rung keeps the field laws the rungs below already proved.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the extension ladder — every rung repairs a closure failure</text>
  ${boxes}
  ${arrows}
  <text x="360" y="332" font-size="11" text-anchor="middle" fill="#0f766e">every rung keeps the field laws the rungs below already proved — the survival discipline ANS 7.2 banked</text>
</svg>`
}

function argandOrbitSvg(): string {
  // left: the complex plane O = (290, 168), unit 34 px; the orbit square of
  // z = 2 + i under multiplication by i, the dashed radii, one rotation arc;
  // right: the pair-map note panel
  const OX = 290
  const OY = 168
  const U = 34
  const px = (x: number): number => OX + U * x
  const py = (y: number): number => OY - U * y
  const pts: Array<[number, number]> = [
    [2, 1],
    [-1, 2],
    [-2, -1],
    [1, -2],
  ]
  const cols = ['#16a34a', '#d97706', '#0d9488', '#ea580c']
  const labels = ['z = 2 + i', 'iz = −1 + 2i', 'i²z = −2 − i', 'i³z = 1 − 2i']
  const labelPos: Array<[number, number, string]> = [
    [px(2) + 8, py(1) - 4, 'start'],
    [px(-1) - 8, py(2) - 12, 'end'],
    [px(-2) - 8, py(-1) + 20, 'end'],
    [px(1) + 8, py(-2) + 16, 'start'],
  ]
  let sides = ''
  let dots = ''
  let tags = ''
  pts.forEach((p, i) => {
    const q = pts[(i + 1) % 4]
    sides += `<line x1="${px(p[0])}" y1="${py(p[1])}" x2="${px(q[0])}" y2="${py(q[1])}" stroke="#65a30d" stroke-width="2.2"/>`
    dots += `<circle cx="${px(p[0])}" cy="${py(p[1])}" r="4.6" fill="${cols[i]}"/>`
    tags +=
      `<text x="${labelPos[i][0]}" y="${labelPos[i][1]}" font-size="11.5" font-weight="700" text-anchor="${labelPos[i][2]}" fill="${cols[i]}">${labels[i]}</text>` +
      `<path d="M${OX} ${OY} L${px(p[0])} ${py(p[1])}" stroke="currentColor" stroke-width="1" stroke-dasharray="3 4" opacity="0.5" fill="none"/>`
  })
  const axX1 = px(-3.3)
  const axX2 = px(3.3)
  const axY1 = py(3.3)
  const axY2 = py(-3.3)
  // the rotation arc: radius 46 from the direction of z (26.57°) to the
  // direction of iz (116.57°), anticlockwise, with an arrowhead
  const arcStartX = OX + 46 * Math.cos((26.57 * Math.PI) / 180)
  const arcStartY = OY - 46 * Math.sin((26.57 * Math.PI) / 180)
  const arcEndX = OX + 46 * Math.cos((116.57 * Math.PI) / 180)
  const arcEndY = OY - 46 * Math.sin((116.57 * Math.PI) / 180)
  return `<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Argand plane showing the quarter-turn orbit of z equals 2 plus i. The four points z at (2, 1), iz at (minus 1, 2), i squared z at (minus 2, minus 1) and i cubed z at (1, minus 2) are joined by the four sides of a square centred at the origin, each side labelled by one multiplication by i. Dashed radii of length root 5 run from the origin to every vertex. A teal arc with an arrowhead near the origin shows the anticlockwise right-angle turn. A side panel states the pair map: multiplying by i sends (x, y) to (minus y, x), the distance to the origin is kept, the arrows are perpendicular, and the orbit is a square with squared side 2 times 2 squared plus 1 squared equals 10.">
  <text x="360" y="24" font-size="13" font-weight="700" text-anchor="middle" fill="currentColor">the quarter-turn orbit of z = 2 + i — one multiplication by i per side</text>
  <g stroke="currentColor" stroke-width="0.8" opacity="0.6">
    <path d="M${axX1} ${OY}H${axX2} M${OX} ${axY1}V${axY2}"/>
  </g>
  <text x="${axX2 - 4}" y="${OY - 8}" font-size="11" text-anchor="end" fill="currentColor" opacity="0.85">Re</text>
  <text x="${OX + 8}" y="${axY1 + 12}" font-size="11" fill="currentColor" opacity="0.85">Im</text>
  <g font-size="10" text-anchor="middle" fill="currentColor" opacity="0.85">
    <text x="${px(-2)}" y="${OY + 14}">−2</text>
    <text x="${px(-1) - 4}" y="${OY + 11}">−1</text>
    <text x="${px(1)}" y="${OY + 14}">1</text>
    <text x="${px(2)}" y="${OY + 14}">2</text>
    <text x="${OX - 8}" y="${py(2) + 4}" text-anchor="end">2</text>
    <text x="${OX - 8}" y="${py(1) + 4}" text-anchor="end">1</text>
    <text x="${OX - 8}" y="${py(-1) + 4}" text-anchor="end">−1</text>
    <text x="${OX - 8}" y="${py(-2) + 4}" text-anchor="end">−2</text>
  </g>
  ${tags}
  ${sides}
  <path d="M${arcStartX.toFixed(1)} ${arcStartY.toFixed(1)} A 46 46 0 0 0 ${arcEndX.toFixed(1)} ${arcEndY.toFixed(1)}" stroke="#0d9488" stroke-width="2" fill="none"/>
  <polygon points="0,0 -10,3 -6,-7" transform="translate(${arcEndX.toFixed(1)},${arcEndY.toFixed(1)}) rotate(153)" fill="#0d9488"/>
  <text x="${(OX + 56 * Math.cos((71.6 * Math.PI) / 180)).toFixed(1)}" y="${(OY - 56 * Math.sin((71.6 * Math.PI) / 180)).toFixed(1)}" font-size="12.5" font-weight="700" text-anchor="middle" fill="#0f766e">× i</text>
  ${dots}
  <rect x="470" y="60" width="236" height="150" rx="9" fill="#fef3c7" stroke="#0d9488" stroke-width="2"/>
  <text x="484" y="84" font-size="12.5" font-weight="700" fill="#166534">the pair map</text>
  <g font-size="11" fill="#166534">
    <text x="484" y="108">× i sends (x, y) to (−y, x)</text>
    <text x="484" y="130">distance to O kept: x² + y²</text>
    <text x="484" y="152">arrows perpendicular: x(−y) + yx = 0</text>
    <text x="484" y="176">so the orbit is a square:</text>
    <text x="484" y="196" font-weight="700" fill="#65a30d">side² = 2(2² + 1²) = 10</text>
  </g>
  <g font-size="10.5" fill="#0f766e">
    <text x="470" y="236">the dashed radii all carry |z| = √5 —</text>
    <text x="470" y="252">each vertex is the last one turned a right</text>
    <text x="470" y="268">angle about O, at the same distance.</text>
  </g>
  <text x="360" y="330" font-size="11" text-anchor="middle" fill="#0f766e">multiplying by i turns every position arrow a right angle anticlockwise — distance kept, direction turned; four turns close the square</text>
</svg>`
}

/* ------------------------------------------------------------------ */
/* lesson 3.1                                                          */
/* ------------------------------------------------------------------ */

const lesson31: Lesson = {
  id: 'aa-the-closure-failure-that-forces-i',
  number: '3.1',
  title: 'The Closure Failure That Forces i',
  concepts: [
    'the closure failure: x² + 1 = 0 has no real door, and it is the norm (275/351 of a census grid)',
    'the extension ladder ℕ ⊂ ℤ ⊂ ℚ ⊂ ℝ ⊂ ℂ — every rung repairs a failure and keeps the laws',
    'the imaginary unit i (iota) with i² = −1 and the mod-4 cycle of its powers',
    'complex numbers as ordered pairs: standard form a + bi, componentwise equality',
    'the four operations with the field-law survival census',
    'the conjugate seeds: z + z̄ = 2Re(z), zz̄ = a² + b², no zero divisors',
    'the Argand plane and multiplication by i as a quarter-turn',
  ],
  objectives: [
    'explain why x² + 1 = 0 has no real solution and why the D < 0 case is the norm, not an exception',
    'place ℂ on the extension ladder and state the survival discipline every rung obeys',
    'reduce any integral power of i by the mod-4 cycle, forwards and backwards',
    'read a complex number as a pair, split an equality into two real equations, and name Re(z), Im(z) honestly',
    'add, subtract, multiply and divide complex numbers, deriving the multiplication and division rules rather than quoting them',
    'use the conjugate seeds for bookkeeping and prove that ℂ has no zero divisors',
    'multiply by i as a quarter-turn and certify the orbit square',
  ],
  prerequisites: ['al-the-quadratic-formula-and-the-discriminant', 'ans-the-diagonal-that-broke-the-rationals', 'ans-the-field-laws-division-joins-the-family', 'aa-unit-review-the-quadratic-at-depth'],
  sources: ['cengage-m2-03', 'cengage-jee-style', 'ncert-math11-ch4-complex-numbers', 'openstax-college-algebra'],
  blocks: [
    { kind: 'para', text: 'AL 9.3 closed the quadratic formula with a trichotomy: $D > 0$ two real doors, $D = 0$ one double door, $D < 0$ — and for the third verdict it could only say "no real roots", a refusal, not an answer. AA 2.R ended the chapter by naming exactly what was being handed forward: the discriminant rail\'s negative stretch, the doors the formula promises but the real line cannot host. This chapter climbs to those doors. It begins with the smallest equation that exposes the failure, counts how common the failure is, and then does what Arithmetic and Number Systems did at every rung of the number tower: it BUILDS the system in which the failure disappears — not by decree, but by construction, with every law that already held surviving intact.' },
    { kind: 'para', text: 'The build follows the honest order. First the failure itself: $x^2 + 1 = 0$, and a census showing that families with no real door are the norm, not a curiosity. Then the ladder: $\\mathbb{N} \\subset \\mathbb{Z} \\subset \\mathbb{Q} \\subset \\mathbb{R}$, each rung born from a closure failure — the discipline ANS proved rung by rung — with one more rung waiting. Then the new number $i$ (iota) and the arithmetic of its powers. Then the real work: complex numbers as ORDERED PAIRS, built so that equality is honest and $i^2 = -1$ is a theorem of the multiplication rule rather than a slogan; the four operations on the form $a + bi$; the field-law survival census that certifies the build. The conjugate arrives as bookkeeping — three seed identities that lesson 3.2 will cash into machinery — and the Argand plane gives the pair its first picture: multiplication by $i$ as a quarter-turn.' },

    { kind: 'heading', text: 'The Failure, Counted' },
    { kind: 'para', text: 'Why can $x^2 + 1 = 0$ have no real solution? Not because the algebra is clumsy — because a real square has a sign it cannot shed: for every real $x$, $x^2 \\geq 0$, so $x^2 + 1 \\geq 1 > 0$ at every seat of the line. The equation asks for a number whose square is $-1$; the real numbers contain none. In AL 9.3\'s language the discriminant reads $D = 0^2 - 4 \\cdot 1 \\cdot 1 = -4 < 0$, and the trichotomy\'s third verdict applies: the door the formula points to sits off the line entirely.' },
    { kind: 'example', title: 'Count the real doors of the family x² − 6x + k = 0 at k = 5, 8, 9, 10, 11, 12, and name the boundary seat', steps: [
      'The discriminant of $x^2 - 6x + k$ is $D = (-6)^2 - 4k = 36 - 4k$ — the middle coefficient is fixed, so $k$ alone moves the door count.',
      'At $k = 5$: $D = 16 > 0$, two real doors; at $k = 8$: $D = 4 > 0$, still two. At $k = 9$: $D = 0$, the double door $x = 3$ — the vertex parks exactly on the axis, the seat AA 2.1\'s range law called the touching case.',
      'At $k = 10, 11, 12$: $D = -4, -8, -12$, all negative — no real doors; the whole parabola floats above the axis with least value $-D/4 = k - 9 > 0$, the vertex read of AA 2.1 returning one last time.',
      'Hence, the family carries $2, 2, 1, 0, 0, 0$ real doors across the six seats, and $k = 9$ is the exact boundary: below it the doors are real, above it they are gone — the formula\'s promise unkept.',
    ] },
    { kind: 'para', text: 'How typical is the failure? Take a small honest census: every family $ax^2 + bx + c$ with $a \\in \\{1, 2, 3\\}$, $b$ from $-6$ to $6$, and $c$ from $1$ to $9$ — $351$ families in all. Recompute $D = b^2 - 4ac$ for each: **275 of them, about 78.3%, have $D < 0$**. The upward parabola parked above the axis — modest middle coefficient, healthy constant term — is not a curiosity of engineered examples; in this grid it is the MAJORITY case. The verdict "no real roots" is not an exception the real line graciously tolerates. It is a closure failure: the operation the quadratic formula needs — taking the square root of a negative discriminant — is an operation the real numbers do not have.' },
    { kind: 'callout', tone: 'insight', title: 'A closure failure, in ANS\u2019s exact sense', text: 'ANS defined a closure failure operationally: a number system is closed under an operation when every admissible input returns an output inside the system, and each failure forced a new rung of the tower. $\\mathbb{N}$ failed at subtraction, $\\mathbb{Z}$ at division, $\\mathbb{Q}$ at completeness — the $\\sqrt{2}$ diagonal. Here $\\mathbb{R}$ fails at squaring backwards: no real input returns a negative output. The repair follows the same discipline as every earlier rung: extend honestly, keep every law, prove the survival.' },
    { kind: 'para', text: 'One completed square says the same thing about the family\'s cleanest member. $x^2 + x + 1 = \\left(x + \\tfrac{1}{2}\\right)^2 + \\tfrac{3}{4}$: a square — never negative — plus a positive constant, so the expression bottoms at $\\tfrac{3}{4} > 0$ and never touches the axis. This is the $D = -3$ witness AA 2.R named when it handed this chapter its inheritance. The failure is structural, and it is time to repair it the way the tower was always built: one honest rung at a time.' },

    { kind: 'heading', text: 'The Extension Ladder' },
    { kind: 'para', text: 'The repair is not a new trick — it is the oldest pattern in the tower. Look at how every previous rung was born:' },
    { kind: 'list', marker: 'roman', items: [
      'in $\\mathbb{N}$, the equation $x + 5 = 3$ has no solution — counting numbers cannot walk backwards — so adjoining the negatives builds $\\mathbb{Z}$;',
      'in $\\mathbb{Z}$, the equation $3x = 7$ has no solution — integers cannot split into parts — so adjoining the fractions builds $\\mathbb{Q}$;',
      'in $\\mathbb{Q}$, the equation $x^2 = 2$ has no solution — no fraction squares to $2$, the diagonal that broke the rationals (ANS 8.1) — so adjoining the irrationals completes the line $\\mathbb{R}$;',
      'in $\\mathbb{R}$, the equation $x^2 + 1 = 0$ has no solution — no real square is negative — and adjoining one new number builds $\\mathbb{C}$, this chapter\'s work.',
    ] },
    { kind: 'figure', caption: 'The extension ladder: five systems, each rung built to repair the closure failure of the one below — ℤ to close subtraction, ℚ to close division, ℝ to close the gaps (x² = 2), ℂ to close negative squares (x² + 1 = 0). The top rung is this chapter; the survival discipline (every law kept) is the ladder\u2019s construction law.', svg: extensionLadderSvg() },
    { kind: 'para', text: 'The pattern has a discipline, and ANS 7.2 named it: the new rung must keep every law the old rungs proved. $\\mathbb{Z}$ did not break addition to gain subtraction; $\\mathbb{Q}$ did not break order to gain division; $\\mathbb{R}$ did not break the field laws to fill the gaps. Whatever we adjoin for $x^2 + 1 = 0$ must do the same: commutativity, associativity, distributivity, identities, inverses — the whole field-law family — must survive, and this lesson\'s verifier will sweep every one of them on exact integer grids. The smallest admissible repair needs only one new object: a single number whose square is $-1$.' },
    { kind: 'callout', tone: 'definition', title: 'The imaginary unit', text: 'The IMAGINARY UNIT is a new number, denoted $i$ (from the Greek letter iota), adjoined to $\\mathbb{R}$ with the single law $i^2 = -1$. For a positive real $k$, the square root of $-k$ then exists on the new rung: $\\sqrt{-k} = \\sqrt{k}\\, i$. A real multiple of $i$ — a number $bi$ with $b \\neq 0$ — is called an IMAGINARY NUMBER: its square is $-b^2 < 0$. Thus, $\\sqrt{-4} = 2i$ and $\\sqrt{-25} = 5i$.' },
    { kind: 'callout', tone: 'warn', title: 'The two-negative-surds fraud', text: 'The surd law $\\sqrt{a}\\sqrt{b} = \\sqrt{ab}$ holds only when AT LEAST ONE of $a, b$ is non-negative. Apply it to two negatives and it manufactures absurdity: the fraud route reads $\\sqrt{-3}\\,\\sqrt{-12} = \\sqrt{36} = 6$; the honest route converts both surds first, $\\sqrt{3}\\,i \\cdot \\sqrt{12}\\,i = \\sqrt{36}\\, i^2 = -6$. The same "argument" proves $6 = -6$ — one illegal move is the whole difference.' },
    { kind: 'example', title: 'Express √(−4)·√9 and √(−3)·√(−12) in the form a + bi', steps: [
      'First product: exactly ONE factor is negative, so the surd split is legal — $\\sqrt{-4} \\cdot \\sqrt{9} = 2i \\cdot 3 = 6i$, purely imaginary.',
      'Second product: BOTH factors are negative, so convert each surd before multiplying — $\\sqrt{-3}\\,\\sqrt{-12} = \\sqrt{3}\\,i \\cdot \\sqrt{12}\\,i = \\sqrt{36}\\, i^2 = 6(-1) = -6$.',
      'Price the fraud for contrast: the illegal shortcut reads $\\sqrt{(-3)(-12)} = \\sqrt{36} = 6 \\neq -6$ — it fails exactly when both radicands are negative.',
      'Hence, $\\sqrt{-4}\\sqrt{9} = 6i$ and $\\sqrt{-3}\\sqrt{-12} = -6$: one negative factor keeps $i$ single; two negative factors pay the $i^2 = -1$ toll.',
    ] },
    { kind: 'formula', name: 'The negative-surd law', latex: '\\sqrt{-k} = \\sqrt{k}\\, i \\quad (k > 0)', note: 'convert first, combine never: √a·√b = √(ab) only when at least one of a, b is non-negative — two negative radicands pay the i² = −1 toll.' },

    { kind: 'heading', text: 'Integral Powers of Iota' },
    { kind: 'para', text: 'One law, $i^2 = -1$, generates the whole economy of $i$\'s powers. Multiply along: $i^1 = i$, $i^2 = -1$, $i^3 = i^2 \\cdot i = -i$, $i^4 = i^2 \\cdot i^2 = (-1)(-1) = 1$ — and at $i^4$ the clock restarts, because multiplying by $i^4$ is multiplying by $1$. For any larger exponent the division algorithm reduces it: write $n = 4q + r$ with $0 \\leq r \\leq 3$; then $i^n = i^{4q+r} = (i^4)^q\\, i^r = i^r$. Negative exponents obey the same cycle backwards — $1/i = -i$, because $i \\cdot (-i) = -i^2 = 1$ — so the entire economy of $i$\'s powers is four values.' },
    { kind: 'table', caption: 'The iota cycle: the division algorithm collapses every integral power to one of four values.', head: ['exponent $n \\bmod 4$', '$0$', '$1$', '$2$', '$3$'], rows: [
      ['$i^n$', '$1$', '$i$', '$-1$', '$-i$'],
    ] },
    { kind: 'example', title: 'Evaluate i²⁰²⁶ + i²⁰²⁷ + i²⁰²⁸ + i²⁰²⁹', steps: [
      'Reduce each exponent mod 4: $2026 = 4 \\cdot 506 + 2$, and $2027 \\equiv 3$, $2028 \\equiv 0$, $2029 \\equiv 1$, so the block reads $(-1) + (-i) + 1 + i$.',
      'The terms cancel in pairs: $(-1) + 1 = 0$ and $(-i) + i = 0$.',
      'Or factor the block outright: $i^{2026}(1 + i + i^2 + i^3) = i^{2026}(1 + i - 1 - i) = 0$ — no arithmetic at all beyond the cycle.',
      'Hence, $i^{2026} + i^{2027} + i^{2028} + i^{2029} = 0$.',
    ] },
    { kind: 'example', title: 'Evaluate i⁹⁹ and 1/i¹⁰¹', steps: [
      '$99 = 4 \\cdot 24 + 3$, so $i^{99} = i^3 = -i$.',
      '$101 = 4 \\cdot 25 + 1$, so $i^{101} = i$; then $\\dfrac{1}{i^{101}} = \\dfrac{1}{i} = -i$, since $i \\cdot (-i) = -i^2 = 1$.',
      'Both answers land on $-i$, from opposite directions: the power climbs to $i^3$ directly, the reciprocal walks backwards around the same four-step cycle.',
      'Hence, $i^{99} = -i$ and $1/i^{101} = -i$.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Any four consecutive powers sum to zero', text: 'The factored route is the general law: $i^n + i^{n+1} + i^{n+2} + i^{n+3} = i^n(1 + i + i^2 + i^3) = 0$ for EVERY integer $n$. Four turns of the wheel always balance — and $1 + i + i^2 + i^3 = 0$ is no accident: it says the four fourth roots of unity have their centre of mass at the origin, the first hint of the spokes lesson 3.5 will mount on the unit circle.' },
    { kind: 'formula', name: 'The iota cycle', latex: 'i^{4q+r} = i^r, \\qquad 0 \\leq r \\leq 3', note: 'the division algorithm collapses every integral power of i to one of 1, i, −1, −i; negative exponents follow the same cycle (1/i = −i).' },

    { kind: 'heading', text: 'Complex Numbers: the Pair Construction' },
    { kind: 'para', text: 'What, honestly, IS the object "$a + bi$"? The reference module\'s own caution is exactly right: you cannot literally ADD a real number to an imaginary one — as raw types they do not meet, and the $+$ in "$a + bi$" is a connector, not yet an operation. The honest answer is the one ANS gave for fractions: define the new object as a PAIR of old objects, then earn the notation back. A fraction is a pair $(p, q)$ read as $p/q$; a complex number is a pair $(a, b)$ read as $a + bi$. The pair definition is what makes the algebra — especially equality — precise instead of decorative.' },
    { kind: 'callout', tone: 'definition', title: 'Complex number, standard form, real and imaginary parts', text: 'A COMPLEX NUMBER is an ordered pair $z = (a, b)$ of real numbers, displayed in STANDARD FORM as $z = a + bi$. The REAL PART of $z$ is the number $\\mathrm{Re}(z) = a$; the IMAGINARY PART is $\\mathrm{Im}(z) = b$ — a real number, not $bi$. The set of all complex numbers is $\\mathbb{C} = \\{(a, b) : a, b \\in \\mathbb{R}\\}$. If $b = 0$ the number is PURELY REAL; if $a = 0$ (with $b \\neq 0$) it is PURELY IMAGINARY. The reals embed as the pairs $(a, 0)$, so $\\mathbb{R} \\subset \\mathbb{C}$. Thus, $3 + 4i$, $5 = 5 + 0i$, $-2i = 0 - 2i$ and $\\sqrt{2} + \\tfrac{1}{2}i$ are all complex numbers.' },
    { kind: 'terms', items: [
      { term: 'Imaginary number', def: 'a real multiple $bi$ (with $b \\neq 0$) of the imaginary unit — a number whose square $-b^2$ is negative; "imaginary" is a historical label, not a verdict on existence.' },
      { term: 'Imaginary unit (iota)', def: 'the new number $i$, adjoined to the reals to repair the closure failure $x^2 + 1 = 0$, carrying the single law $i^2 = -1$.' },
      { term: 'Complex number', def: 'an ordered pair $(a, b)$ of real numbers written in standard form $a + bi$; the set of all of them is $\\mathbb{C}$.' },
      { term: 'Real part', def: 'for $z = a + bi$, the real number $a$, written $\\mathrm{Re}(z)$.' },
      { term: 'Imaginary part', def: 'for $z = a + bi$, the real number $b$ (not $bi$), written $\\mathrm{Im}(z)$.' },
      { term: 'Standard form', def: 'the display $a + bi$ with the real part first — every complex number has exactly one, because the pair is the object and the display is its name.' },
      { term: 'Equality of complex numbers', def: 'the componentwise law: $a_1 + b_1 i = a_2 + b_2 i$ if and only if $a_1 = a_2$ and $b_1 = b_2$ — two complex numbers are equal exactly when their real and imaginary parts agree.' },
      { term: 'Conjugate', def: 'for $z = a + bi$, the mirror twin $\\bar{z} = a - bi$ — the reflection of $z$ in the real axis of the Argand plane.' },
      { term: 'Argand plane', def: 'the coordinate plane that carries complex numbers as points: $(a, b)$ is the number $a + bi$, the horizontal axis is real, the vertical axis imaginary.' },
    ] },
    { kind: 'para', text: 'The notation is earned, not decreed. Treat $i$ as the NAME of the pair $(0, 1)$ and let the multiplication rule below do the work: $i \\cdot (a, 0) = (0, a)$ — the pair we write $ai$ — and $(a, b) = (a, 0) + (0, b) = a + bi$, which is exactly the decomposition the standard form displays. The check that the letter deserves its law is then one line of the rule: $(0, 1) \\cdot (0, 1) = (-1, 0)$, that is, $i^2 = -1$ comes out as a THEOREM of the multiplication rule, not an extra assumption.' },
    { kind: 'callout', tone: 'theorem', title: 'Equality of complex numbers', text: 'Two complex numbers are equal exactly when their components agree: $a_1 + b_1 i = a_2 + b_2 i \\iff a_1 = a_2 \\ \\text{and}\\ b_1 = b_2$. Thus, equality of complex numbers is equality of PAIRS — one equation in standard form is always two real equations. This is the law the whole theory of equations leans on: every "find the unknown complex number" problem is a system of two real ones in disguise.' },
    { kind: 'example', title: 'Find the real x and y with (2x − 1) + (y + 2)i = 3 + 5i', steps: [
      'Equality of complex numbers splits the statement into two real equations: the real parts give $2x - 1 = 3$; the imaginary parts give $y + 2 = 5$.',
      'Solve each: $2x = 4$ so $x = 2$; and $y = 3$.',
      'Substitute back as a check: $(2 \\cdot 2 - 1) + (3 + 2)i = 3 + 5i$ — both components agree.',
      'Hence, $x = 2$ and $y = 3$.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'The imaginary part is b, not bi', text: 'For $z = 3 + 5i$, the imaginary part is $\\mathrm{Im}(z) = 5$ — a real number — while $5i$ is the imaginary NUMBER occupying the second slot of the pair. Examiners price this confusion constantly: the imaginary part of $4 - 7i$ is $-7$, and writing $-7i$ is the priced error.' },

    { kind: 'heading', text: 'Algebraic Operations on Complex Numbers' },
    { kind: 'para', text: 'Now the operations — and the design brief is ANS 7.2\'s survival discipline: whatever rules we write, the field laws must hold on the new pairs. Write $z_1 = a + bi$ and $z_2 = c + di$ with $a, b, c, d$ real.' },
    { kind: 'callout', tone: 'definition', title: 'The four operations', text: 'ADDITION: $z_1 + z_2 = (a + c) + (b + d)i$ — the components add. SUBTRACTION: $z_1 - z_2 = (a - c) + (b - d)i$. MULTIPLICATION: $z_1 z_2 = (ac - bd) + (ad + bc)i$. DIVISION: for $z_2 \\neq 0$, $\\dfrac{z_1}{z_2} = \\dfrac{(ac + bd) + (bc - ad)i}{c^2 + d^2}$. Closure is immediate — every output is another pair of reals, so $\\mathbb{C}$ is closed under all four — and the reals keep their own arithmetic: on pairs $(a, 0)$ and $(c, 0)$ the rules return exactly $(a + c, 0)$ and $(ac, 0)$.' },
    { kind: 'derivation', title: 'Why the multiplication rule is forced', statement: 'The pair rule $(a + bi)(c + di) = (ac - bd) + (ad + bc)i$ is not one choice among many — it is what the notation already demands, with the single substitution $i^2 = -1$ doing all the work.', steps: [
      { label: 'Expand as for any two binomials', formula: '(a + bi)(c + di) = ac + adi + bci + bdi^2', explanation: 'the distributive law multiplies every term of the first bracket by every term of the second — four products, exactly as in $(x + 2)(x + 3)$.' },
      { label: 'Apply the one law', formula: 'bdi^2 = bd(-1) = -bd', explanation: 'this is the ONLY place the new number enters: every product of complex numbers reduces by exactly one substitution discipline, $i^2 = -1$.' },
      { label: 'Collect the real and imaginary parts', formula: '(ac - bd) + (ad + bc)i', explanation: 'the two real terms $ac$ and $-bd$ combine into the new real part; the two middle terms $ad\\,i$ and $bc\\,i$ share the letter $i$ and combine into its coefficient.' },
    ], result: 'The FOIL chain and the pair rule are the same statement — the verifier expanded both routes on all $6{,}561$ integer quadruples $a, b, c, d \\in \\{-4, \\ldots, 4\\}$ with zero mismatches. The letter\'s own law falls out as the special case $a = 0, b = 1, c = 0, d = 1$: $(0, 1)^2 = (-1, 0)$, that is, $i^2 = -1$.' },
    { kind: 'example', title: 'Compute (3 − 2i)(2 + 5i) by the FOIL route and by the pair rule', steps: [
      'FOIL route: $3 \\cdot 2 + 3 \\cdot 5i - 2i \\cdot 2 - 2i \\cdot 5i = 6 + 15i - 4i - 10i^2$; the substitution pays the last term: $-10(-1) = +10$.',
      'Collect: the real part $6 + 10 = 16$ and the imaginary part $15i - 4i = 11i$, so the product is $16 + 11i$.',
      'Pair rule: $(ac - bd) + (ad + bc)i$ with $a = 3, b = -2, c = 2, d = 5$ gives $(6 - (-10)) + (15 + (-4))i = 16 + 11i$ — the same line, pre-collected.',
      'Hence, $(3 - 2i)(2 + 5i) = 16 + 11i$ by both routes.',
    ] },
    { kind: 'table', caption: 'The field-law survival census — every law ANS 7.2 catalogued holds on the new rung (each row swept on exact integer grids in the verifier before this prose was written).', head: ['Law', 'Statement on $\\mathbb{C}$', 'Witness'], rows: [
      ['commutativity of $+$', '$z_1 + z_2 = z_2 + z_1$', '$(3-2i) + (2+5i) = (2+5i) + (3-2i) = 5 + 3i$'],
      ['commutativity of $\\times$', '$z_1 z_2 = z_2 z_1$', 'both orders give $16 + 11i$'],
      ['associativity ($+$ and $\\times$)', '$(z_1 + z_2) + z_3 = z_1 + (z_2 + z_3)$, likewise $\\times$', 'every roster triple agrees, e.g. $((3-2i) + (2+5i)) + (-1+4i) = (3-2i) + (1+9i)$'],
      ['distributivity', '$z_1(z_2 + z_3) = z_1 z_2 + z_1 z_3$', 'the roster triples and the $5^4$ integer grid agree'],
      ['identities and inverses', '$0$ and $1$ work; every $z \\neq 0$ has $1/z = \\bar{z}/(z\\bar{z})$', '$1/(3+4i) = (3-4i)/25$'],
      ['no zero divisors', '$z_1 z_2 = 0 \\Rightarrow z_1 = 0$ or $z_2 = 0$', 'certificate: $(a^2+b^2)(c^2+d^2) = 0$ forces a factor to vanish'],
    ] },
    { kind: 'para', text: 'The census is the point ANS 7.2 made about $\\mathbb{Q}$: a field is not whatever happens to have addition and multiplication — it is what KEEPS the laws. Every row of the table was swept on exact integer grids before this prose existed: commutativity on the $7^4$ grid, associativity over every roster triple, distributivity on the roster and a $5^4$ grid, the conjugate-route reciprocal for every non-zero integer pair, and the no-zero-divisors certificate $|z_1 z_2|^2 = (a_1^2 + b_1^2)(a_2^2 + b_2^2)$, exact in integers. The new rung does not break the tower — that is the ladder\'s whole discipline, and it is what separates this construction from a notation game.' },
    { kind: 'example', title: 'Evaluate the power chain (1+i)², (1+i)⁴, (1+i)⁶ and (1+i)⁸', steps: [
      'Base move: $(1+i)^2 = 1 + 2i + i^2 = 1 + 2i - 1 = 2i$ — the substitution collapses the square to a single imaginary term.',
      'Square it again: $(1+i)^4 = (2i)^2 = 4i^2 = -4$, real. And once more: $(1+i)^8 = (-4)^2 = 16$.',
      'The sixth power rides between them: $(1+i)^6 = (1+i)^4 (1+i)^2 = (-4)(2i) = -8i$.',
      'Hence, $(1+i)^2 = 2i$, $(1+i)^4 = -4$, $(1+i)^6 = -8i$, $(1+i)^8 = 16$ — and by the mirror computation $(1-i)^2 = -2i$, $(1-i)^8 = 16$, so $(1+i)^8 + (1-i)^8 = 32$.',
    ] },
    { kind: 'derivation', title: 'The division rule: conjugate the denominator', statement: 'For $z_2 = c + di \\neq 0$, the quotient $z_1/z_2$ is computed by multiplying numerator and denominator by $\\overline{z_2} = c - di$ — the CONJUGATE of the denominator — which turns the denominator into the real number $c^2 + d^2 > 0$.', steps: [
      { label: 'Multiply by the conjugate over itself', formula: '\\frac{a+bi}{c+di} \\cdot \\frac{c-di}{c-di}', explanation: 'the factor equals $1$, so the value is unchanged; its purpose is purely structural — the new denominator will carry no letter at all.' },
      { label: 'The denominator turns real', formula: '(c+di)(c-di) = c^2 - d^2 i^2 = c^2 + d^2', explanation: 'the cross terms $cdi$ and $-cdi$ cancel, and $i^2 = -1$ flips the sign of the remaining $d^2$ term — a number times its conjugate is always real, and positive unless the number is $0$.' },
      { label: 'Expand the numerator', formula: '(a+bi)(c-di) = (ac + bd) + (bc - ad)i', explanation: 'FOIL with the same single substitution; watch the sign pattern — the real part ADDS the $bd$ term, because $-bdi^2$ pays $+bd$.' },
      { label: 'Divide componentwise by the real denominator', formula: '\\frac{a+bi}{c+di} = \\frac{ac+bd}{c^2+d^2} + \\frac{bc-ad}{c^2+d^2}\\,i', explanation: 'the denominator is now an ordinary positive real, so each component of the numerator simply scales — division has become real division.' },
    ], result: '$\\dfrac{a+bi}{c+di} = \\dfrac{(ac+bd) + (bc-ad)i}{c^2 + d^2}$ — the rule. The engine inside it is the conjugate, whose bookkeeping lesson 3.2 turns into the machinery of the modulus.' },
    { kind: 'example', title: 'Express (7 + i)/(3 + 4i) in standard form', steps: [
      'Conjugate the denominator: multiply by $\\dfrac{3-4i}{3-4i}$; the denominator becomes $3^2 + 4^2 = 25$, real and positive.',
      'Numerator: $(7+i)(3-4i) = 21 - 28i + 3i - 4i^2 = 21 + 4 - 25i = 25 - 25i$, the $-4i^2$ term paying $+4$.',
      'So $\\dfrac{7+i}{3+4i} = \\dfrac{25 - 25i}{25} = 1 - i$.',
      'Hence, $\\dfrac{7+i}{3+4i} = 1 - i$, confirmed by the multiplication check $(3+4i)(1-i) = 3 - 3i + 4i - 4i^2 = 7 + i$ — the original numerator returns.',
    ] },
    { kind: 'example', title: 'Solve (1 + i)x² − 2x + (1 − i) = 0, where the coefficients themselves are complex', steps: [
      'The quadratic formula AL 9.3 derived never used that the coefficients were real — run it as-is with $a = 1+i$, $b = -2$, $c = 1-i$.',
      'Discriminant: $D = b^2 - 4ac = 4 - 4(1+i)(1-i)$; and $(1+i)(1-i) = 1 - i^2 = 2$, the conjugate product already real, so $D = 4 - 8 = -4$.',
      'Square root of the discriminant, on the new rung: $\\sqrt{-4} = 2i$, so $x = \\dfrac{2 \\pm 2i}{2(1+i)} = \\dfrac{1 \\pm i}{1+i}$.',
      'Plus branch: $\\dfrac{1+i}{1+i} = 1$. Minus branch: $\\dfrac{1-i}{1+i} = \\dfrac{(1-i)^2}{(1+i)(1-i)} = \\dfrac{-2i}{2} = -i$.',
      'Hence, $x = 1$ or $x = -i$ — substitution confirms both: at $x = -i$, $(1+i)(-i)^2 - 2(-i) + (1-i) = -(1+i) + 2i + 1 - i = 0$, and $x = 1$ checks the same way.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Where this sits in the examinations', text: 'JEE Main\'s algebra unit names complex numbers and quadratic equations explicitly: the four operations and the iota cycle are the single-correct staples, division-by-conjugating and complex-coefficient quadratics like the last Illustration appear as short-answer and assertion items, and NCERT class 11 ch. 4 carries the same arc at school depth (standard form, equality, the operations). The items in this lesson are exam-style — our own designs, labelled honestly, never lifted from any paper.' },
    { kind: 'formula', name: 'Multiplication of complex numbers', latex: '(a+bi)(c+di) = (ac-bd) + (ad+bc)i', note: 'FOIL, then the single substitution i² = −1; the pair rule and the notation agree by construction.' },
    { kind: 'formula', name: 'Division of complex numbers', latex: '\\frac{a+bi}{c+di} = \\frac{(ac+bd)+(bc-ad)i}{c^2+d^2}', note: 'conjugate the denominator; the bottom becomes the real c² + d² > 0 unless the divisor is zero.' },

    { kind: 'heading', text: 'The Conjugate: Bookkeeping Seeds' },
    { kind: 'para', text: 'One object did quiet work in every division: the mirrored denominator $c - di$. It deserves a name now, because lesson 3.2 builds its whole machinery on it.' },
    { kind: 'callout', tone: 'definition', title: 'Conjugate', text: 'The CONJUGATE of $z = a + bi$ is $\\bar{z} = a - bi$ — the same real part, the imaginary part with its sign flipped. On the Argand plane below it is the reflection of $z$ in the real axis. Thus, $\\overline{3+4i} = 3-4i$ and $\\overline{2-3i} = 2+3i$, and a purely real number is its own conjugate.' },
    { kind: 'example', title: 'For z = 3 + 4i, compute z + z̄, z − z̄ and zz̄', steps: [
      'Sum: $z + \\bar{z} = (3+4i) + (3-4i) = 6$ — purely real, exactly double the real part; the imaginary parts cancel by the flip.',
      'Difference: $z - \\bar{z} = (3+4i) - (3-4i) = 8i$ — purely imaginary, double the imaginary part times $i$.',
      'Product: $(3+4i)(3-4i) = 9 - 12i + 12i - 16i^2 = 9 + 16 = 25$ — real, positive, and exactly $3^2 + 4^2$, the Pythagorean square of the components.',
      'Hence, $z + \\bar{z} = 6$, $z - \\bar{z} = 8i$ and $z\\bar{z} = 25$.',
    ] },
    { kind: 'callout', tone: 'theorem', title: 'The conjugate seeds', text: 'For every $z = a + bi$: (i) $z + \\bar{z} = 2a = 2\\,\\mathrm{Re}(z)$; (ii) $z - \\bar{z} = 2bi = 2i\\,\\mathrm{Im}(z)$; (iii) $z\\bar{z} = a^2 + b^2$ — real, $\\geq 0$, and zero only at $z = 0$; (iv) $z = \\bar{z}$ exactly when $z$ is purely real; (v) $z + \\bar{z} = 0$ exactly when $z$ is purely imaginary. Lesson 3.2 cashes seed (iii) into the MODULUS $|z| = \\sqrt{z\\bar{z}}$ — the distance reading — and rides it to the triangle inequality.' },
    { kind: 'para', text: 'Seed (iii) already proves something the tower cares about: $\\mathbb{C}$ has no zero divisors. Suppose $z_1 z_2 = 0$; multiply both sides by $\\bar{z_1}\\bar{z_2}$ and regroup the left by associativity and commutativity: $(z_1 \\bar{z_1})(z_2 \\bar{z_2}) = (a_1^2 + b_1^2)(a_2^2 + b_2^2)$, a product of non-negative real numbers. A product of non-negative reals vanishes only when a factor does — $a_1^2 + b_1^2 = 0$ forces $z_1 = 0$, and likewise for $z_2$. The same identity, written $|z_1 z_2|^2 = |z_1|^2 |z_2|^2$ as the verifier\'s certificate does, is the seed of the modulus law $|z_1 z_2| = |z_1||z_2|$ that 3.2 states and 3.4 will watch become rotation-and-scaling.' },
    { kind: 'formula', name: 'The conjugate seeds', latex: 'z + \\bar{z} = 2\\,\\mathrm{Re}(z), \\quad z - \\bar{z} = 2i\\,\\mathrm{Im}(z), \\quad z\\bar{z} = a^2+b^2 \\geq 0', note: 'the mirror twin\u2019s three bookkeeping laws; zz̄ = 0 only at z = 0, and |zw|² = |z|²|w|² is the no-zero-divisors certificate.' },

    { kind: 'heading', text: 'The Argand Plane: the First Picture' },
    { kind: 'para', text: 'A complex number is a pair $(a, b)$ — and a pair of reals is a POINT on a coordinate plane. Plot $z = a + bi$ at the point $(a, b)$: the horizontal axis carries the real part (the REAL AXIS), the vertical carries the imaginary part (the IMAGINARY AXIS), and the resulting picture is the ARGAND PLANE. Purely real numbers live on the real axis, purely imaginary ones on the imaginary axis, and $0$ sits at their crossing. That is the whole representation — the deep geometry (polar form, the argument, multiplication as rotation-and-scaling) is lesson 3.4\'s territory, entered through 3.2\'s modulus. One law, though, belongs to THIS lesson, because it is pure algebra of the letter $i$: what multiplication by $i$ does to the picture.' },
    { kind: 'figure', caption: 'The Argand plane and the quarter-turn: the orbit of z = 2 + i under multiplication by i — z, iz = −1 + 2i, i²z = −2 − i, i³z = 1 − 2i — forms a square of side √10 centred at the origin. Multiplying by i sends (x, y) to (−y, x): distance to the origin kept, right angle turned.', svg: argandOrbitSvg() },
    { kind: 'derivation', title: 'Multiplication by i is a quarter-turn', statement: 'For any $z = x + yi$, the product $iz = -y + xi$ is the point obtained by rotating $z$ about the origin through a right angle anticlockwise.', steps: [
      { label: 'Multiply out', formula: 'iz = i(x + yi) = ix + yi^2 = -y + xi', explanation: 'one substitution $i^2 = -1$; the real part of the product is the OLD imaginary part negated, and the imaginary part is the old real part.' },
      { label: 'Read the pair map', formula: '(x, y) \\mapsto (-y, x)', explanation: 'rotation through $90^\\circ$ anticlockwise sends the point $(x, y)$ to exactly $(-y, x)$ — the coordinates trade places and one sign flips.' },
      { label: 'Distance preserved', formula: '(-y)^2 + x^2 = x^2 + y^2', explanation: 'the moved point keeps its squared distance to the origin — a rotation, not a stretch. (The stretch, when it comes, is multiplication by a general complex number — 3.4\'s story.)' },
      { label: 'Right angle certified', formula: 'x(-y) + yx = 0', explanation: 'the dot product of the old and new position vectors vanishes: the arrow from $0$ to $z$ and the arrow from $0$ to $iz$ are perpendicular.' },
    ], result: 'Every multiplication by $i$ turns the plane anticlockwise by $\\tfrac{\\pi}{2}$ — and by $-i$ clockwise, its mirror $-iz = y - xi$. The orbit of any $z \\neq 0$ under $i, i^2, i^3$ is therefore a SQUARE centred at the origin: the verifier certifies the side law $\\text{side}^2 = 2(a^2+b^2)$ and the vanishing dot products on the $9 \\times 9$ integer grid.' },
    { kind: 'example', title: 'Show that z = 2 + i, iz, i²z, i³z are the vertices of a square', steps: [
      'The orbit: $z = 2+i$; $iz = i(2+i) = -1+2i$; $i^2 z = -(2+i) = -2-i$; $i^3 z = -i(2+i) = 1-2i$ — the quarter-turn sends $(2,1) \\mapsto (-1,2) \\mapsto (-2,-1) \\mapsto (1,-2)$.',
      'Side from $z$ to $iz$: difference $(-3, 1)$, squared length $9 + 1 = 10$. Side from $iz$ to $i^2z$: difference $(-1, -3)$, squared length $1 + 9 = 10$ — and the same $10$ for the remaining two sides by the turn\'s symmetry.',
      'Right angles: consecutive side vectors $(-3, 1)$ and $(-1, -3)$ have dot product $3 - 3 = 0$; so does every consecutive pair.',
      'Hence, the four orbit points are the vertices of a square with side $\\sqrt{10}$ centred at the origin — the general law $\\text{side}^2 = 2(a^2+b^2) = 2(2^2+1^2)$ read on the witness.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Bombelli\u2019s wild thought, 1572', text: 'Cardan\'s formula (1545) could solve the cubic $x^3 = 15x + 4$ — but only by passing through $\\sqrt{-121}$: the formula\'s buried constant reads $2 \\pm 11i$ in this chapter\'s language, while the equation visibly owns the honest real root $x = 4$ ($64 = 60 + 4$). Rafael Bombelli, in his 1572 Algebra, proposed the "wild thought": treat $\\sqrt{-1}$ as an object with RULES and compute anyway. Guess $\\sqrt[3]{2 + 11i} = 2 + i$ — check: $(2+i)^3 = (3+4i)(2+i) = 2 + 11i$ — and its mirror $\\sqrt[3]{2-11i} = 2 - i$; the two cube roots then add to $4$, the real root, exactly as the formula promised. That is the honest historical engine of $i$: not the school equation $x^2 + 1 = 0$, which nobody needed, but the cubic refusing to yield a REAL answer without complex bookkeeping. The letter earned its citizenship by work — which is why it stayed.' },
    { kind: 'para', text: 'The rung is built and certified. What waits above it, in order: lesson 3.2 turns the conjugate\'s seeds into machinery — the modulus as a distance, the full properties list, the triangle inequality; lesson 3.3 returns to AL 9.3\'s trichotomy and keeps its promise, computing the $D < 0$ doors and proving that real coefficients force them in conjugate pairs; lesson 3.4 reads the Argand plane in polar coordinates and watches multiplication become rotation-and-scaling; lesson 3.5 mounts the unit circle\'s equal spokes — De Moivre and the roots of unity, where $1 + i + i^2 + i^3 = 0$ finally shows its hand. The tower has a new storey, and nothing below it broke.' },

    { kind: 'quiz', title: 'Check yourself: the closure failure and the new rung', items: [
      { q: 'The value of $i^{2027}$ is:', options: ['$1$', '$i$', '$-1$', '$-i$'], answer: 3, explain: 'Reduce the exponent mod 4: $2027 = 4 \\cdot 506 + 3$, so $i^{2027} = i^3 = -i$ (option D). Option A is the residue-0 value ($i^4$\'s), option B the residue-1 value, option C the residue-2 value — each distractor is one wrong remainder read.' },
      { q: '$\\sqrt{-3} \\cdot \\sqrt{-12}$ equals:', options: ['$6$', '$-6$', '$6i$', '$-6i$'], answer: 1, explain: 'Both radicands are negative, so convert each surd first: $\\sqrt{3}\\,i \\cdot \\sqrt{12}\\,i = \\sqrt{36}\\, i^2 = -6$ (option B). Option A is the fraud route $\\sqrt{(-3)(-12)} = \\sqrt{36}$ — the exact absurdity the Caution prices. Options C and D keep a stray $i$: the product of two purely imaginary numbers is real.' },
      { q: 'If $(2x - 1) + (y+2)i = 3 + 5i$ with $x, y$ real, then:', options: ['$(x, y) = (2, 3)$', '$(x, y) = (2, 5)$', '$(x, y) = (1, 3)$', '$(x, y) = (3, 2)$'], answer: 0, explain: 'Equality of complex numbers splits the statement into two real equations: $2x - 1 = 3$ gives $x = 2$, and $y + 2 = 5$ gives $y = 3$ (option A). Option B solves the imaginary equation as $y + 2 = 7$; option C solves $2x - 1 = 1$; option D swaps the two answers between the components.' },
      { q: '$\\dfrac{7+i}{3+4i}$ equals:', options: ['$1 + i$', '$-1 + i$', '$1 - i$', '$\\dfrac{7}{3} + \\dfrac{1}{4}i$'], answer: 2, explain: 'Conjugate the denominator: $\\dfrac{(7+i)(3-4i)}{3^2+4^2} = \\dfrac{25 - 25i}{25} = 1 - i$ (option C). Option A flips the imaginary sign — the $(7+i)(3+4i)$ expansion; option B flips both signs; option D is the "split the fraction" fraud — $(a+bi)/(c+di)$ is not $a/c + (b/d)i$, the most-priced beginner error.' },
      { q: 'For every complex number $z$, the product $z\\bar{z}$ is:', options: ['real, but possibly negative', 'purely imaginary', 'real only when $z$ is real', 'real and $\\geq 0$, zero only at $z = 0$'], answer: 3, explain: '$z\\bar{z} = a^2 + b^2$, a sum of squares — real, never negative, and zero exactly when $a = b = 0$ (option D). Option A confuses the sign flip with the whole product: the flip hits the CROSS terms, which cancel; option B describes $z - \\bar{z}$, the other seed; option C misses that $a^2 + b^2$ is real for every $z$, not just purely real ones.' },
    ] },

    { kind: 'exercises', title: 'Exercises 3.1', sets: [
      { level: 'L1', questions: [
        { q: 'Express $\\sqrt{-50}$, $\\sqrt{-27}$ and $\\sqrt{-8}$ in terms of $i$.', solution: [
          'Pull the negative out as the unit and extract the largest square: $\\sqrt{-50} = \\sqrt{50}\\,i = 5\\sqrt{2}\\,i$, since $50 = 25 \\cdot 2$.',
          'Same move twice: $\\sqrt{-27} = \\sqrt{27}\\,i = 3\\sqrt{3}\\,i$ (largest square $9$), and $\\sqrt{-8} = \\sqrt{8}\\,i = 2\\sqrt{2}\\,i$ (largest square $4$).',
          'Each result is purely imaginary — the real part is $0$ throughout, and each square $(5\\sqrt{2}\\,i)^2 = -50$ checks the extraction.',
        ], answer: '$\\sqrt{-50} = 5\\sqrt{2}\\,i$, $\\sqrt{-27} = 3\\sqrt{3}\\,i$, $\\sqrt{-8} = 2\\sqrt{2}\\,i$' },
        { q: 'Evaluate $i^{134} + i^{136} + i^{138} + i^{140}$.', solution: [
          'Reduce each exponent mod 4: $134 \\equiv 2$, $136 \\equiv 0$, $138 \\equiv 2$, $140 \\equiv 0$.',
          'So the sum reads $(-1) + 1 + (-1) + 1$ — the even-stride alternation of the cycle.',
          'The pairs cancel: $(-1) + 1 = 0$ twice over.',
        ], answer: '$0$' },
      ] },
      { level: 'L2', questions: [
        { q: 'Express $\\dfrac{4+3i}{2-i}$ in the form $a + bi$.', solution: [
          'Conjugate the denominator: multiply by $\\dfrac{2+i}{2+i}$; the bottom turns into $2^2 + 1^2 = 5$.',
          'Numerator: $(4+3i)(2+i) = 8 + 4i + 6i + 3i^2 = 8 - 3 + 10i = 5 + 10i$.',
          'So the quotient is $\\dfrac{5+10i}{5} = 1 + 2i$.',
          'Check by multiplication: $(2-i)(1+2i) = 2 + 4i - i - 2i^2 = 4 + 3i$ — the original numerator returns.',
        ], answer: '$1 + 2i$' },
        { q: 'Find the real $x, y$ with $(3x + 2) + (y - 4)i = 8 - 3i$.', solution: [
          'Equality splits into components: the real parts give $3x + 2 = 8$; the imaginary parts give $y - 4 = -3$.',
          'First: $3x = 6$, so $x = 2$. Second: $y = 1$.',
          'Substitute back: $(3 \\cdot 2 + 2) + (1 - 4)i = 8 - 3i$ — both components agree.',
        ], answer: '$x = 2,\\ y = 1$' },
      ] },
      { level: 'L3', questions: [
        { q: 'Compute $(3-2i)(2+5i)$ by both routes — the FOIL expansion and the pair rule — and confirm they agree.', solution: [
          'FOIL: $6 + 15i - 4i - 10i^2 = 6 + 10 + 11i$ after the substitution pays $-10(-1) = +10$.',
          'Pair rule: $(ac - bd) + (ad + bc)i$ with $a = 3, b = -2, c = 2, d = 5$ gives $(6 - (-10)) + (15 - 4)i = 16 + 11i$.',
          'The rule pre-collects exactly what FOIL produces — the two routes are one statement, as the derivation proved.',
        ], answer: '$16 + 11i$ by both routes' },
        { q: 'Evaluate $(1+i)^6$.', solution: [
          'Base move: $(1+i)^2 = 1 + 2i + i^2 = 2i$.',
          'Then $(1+i)^6 = (2i)^3 = 8i^3 = -8i$.',
          'The result is purely imaginary — odd multiples of the base square keep the letter, even multiples shed it (the fourth power was $-4$, real).',
        ], answer: '$-8i$' },
        { q: 'For $z = 3 + 4i$, compute $z + \\bar{z}$, $z - \\bar{z}$ and $z\\bar{z}$, and state which of the three can never be negative.', solution: [
          'Sum: $(3+4i) + (3-4i) = 6$; difference: $(3+4i) - (3-4i) = 8i$; product: $9 + 16 = 25$.',
          'The product is the sum of squares $a^2 + b^2$ — real and $\\geq 0$ for every $z$, zero only at the origin.',
          'The sum can be any real number (twice the real part) and the difference any purely imaginary one — only the product carries the sign discipline.',
        ], answer: '$z+\\bar{z} = 6$, $z-\\bar{z} = 8i$, $z\\bar{z} = 25$; the product is never negative' },
      ] },
      { level: 'L4', questions: [
        { q: 'Solve $x^2 + (1+i)x + i = 0$.', solution: [
          'Run the quadratic formula with $a = 1$, $b = 1+i$, $c = i$ — nothing in AL 9.3\'s derivation required real coefficients.',
          'Discriminant: $D = (1+i)^2 - 4i = 2i - 4i = -2i$.',
          'A square root of $-2i$: $(1-i)^2 = 1 - 2i + i^2 = -2i$, so $\\sqrt{D} = \\pm(1-i)$.',
          'Roots: $x = \\dfrac{-(1+i) \\pm (1-i)}{2}$ — plus branch $\\dfrac{-2i}{2} = -i$; minus branch $\\dfrac{-2}{2} = -1$.',
          'Check $x = -1$: $1 - (1+i) + i = 0$. Check $x = -i$: $(-i)^2 + (1+i)(-i) + i = -1 - i + 1 + i = 0$.',
        ], answer: '$x = -1$ or $x = -i$' },
        { q: 'Express $\\dfrac{1}{1-i} + \\dfrac{1}{1+i}$ in standard form.', solution: [
          'First term: multiply by $\\dfrac{1+i}{1+i}$ — the denominator turns into $1^2 + 1^2 = 2$, so $\\dfrac{1}{1-i} = \\dfrac{1+i}{2}$.',
          'Second term, the mirror conjugation: $\\dfrac{1}{1+i} = \\dfrac{1-i}{2}$.',
          'Add: $\\dfrac{(1+i) + (1-i)}{2} = \\dfrac{2}{2} = 1$ — the two terms are conjugates, and a number plus its conjugate is twice its real part.',
        ], answer: '$1$' },
        { q: 'Find every complex $z$ with $z + \\bar{z} = 8$ and $z\\bar{z} = 25$.', solution: [
          'Write $z = a + bi$; the seeds read $z + \\bar{z} = 2a$ and $z\\bar{z} = a^2 + b^2$.',
          'So $2a = 8$ gives $a = 4$; then $16 + b^2 = 25$ gives $b^2 = 9$, so $b = \\pm 3$.',
          'Hence, $z = 4 + 3i$ or $z = 4 - 3i$ — a conjugate PAIR, and that is no accident: both conditions are conjugation-symmetric, so the solution set must be mirror-closed.',
        ], answer: '$z = 4 + 3i$ or $z = 4 - 3i$' },
      ] },
      { level: 'L5', questions: [
        { q: 'Bombelli\u2019s check: show that $(2+i)^3 = 2 + 11i$, deduce the value of $\\sqrt[3]{2+11i} + \\sqrt[3]{2-11i}$, and verify that this value is a root of $x^3 = 15x + 4$.', solution: [
          '$(2+i)^2 = 3 + 4i$; multiply once more: $(3+4i)(2+i) = 6 + 3i + 8i + 4i^2 = 2 + 11i$.',
          'By the mirror computation (flip the sign of $i$ throughout): $(2-i)^3 = 2 - 11i$.',
          'So $\\sqrt[3]{2+11i} + \\sqrt[3]{2-11i} = (2+i) + (2-i) = 4$.',
          'Check the root: $4^3 = 64$ and $15 \\cdot 4 + 4 = 64$ — the equation balances.',
        ], answer: 'the cube-root expression equals $4$, and $4^3 = 15 \\cdot 4 + 4$' },
        { q: 'Prove from the pair rules that multiplication of complex numbers is commutative: $z_1 z_2 = z_2 z_1$ for all $z_1, z_2$.', solution: [
          'Write $z_1 = (a, b)$ and $z_2 = (c, d)$; the rule gives $z_1 z_2 = (ac - bd,\\ ad + bc)$.',
          'In the other order: $z_2 z_1 = (ca - db,\\ cb + da)$.',
          'Compare components: $ac = ca$ and $bd = db$ by commutativity of REAL multiplication, so the real parts agree; likewise $ad = da$ and $bc = cb$, so the imaginary parts agree.',
        ], answer: '$z_1 z_2 = z_2 z_1$ for all complex numbers — inherited componentwise from ℝ, nothing new assumed' },
        { q: 'Find all natural numbers $n$ for which $1 + i^2 + i^4 + \\dots + i^{2n} = 1$.', solution: [
          'Even powers only: $i^{2k} = (i^2)^k = (-1)^k$, so the sum is $1 - 1 + 1 - \\dots + (-1)^n$ — $n + 1$ alternating terms.',
          'Pair them from the left: each pair $1 - 1$ cancels, leaving the last term unpaired exactly when $n$ is even.',
          'So the closed form is $\\dfrac{1 + (-1)^n}{2}$: it equals $1$ when $n$ is even and $0$ when $n$ is odd.',
        ], answer: 'precisely the even $n$' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove: for any complex $z \\neq 0$, the four points $z, iz, i^2z, i^3z$ are the vertices of a square.', solution: [
          'Write $z = a + bi \\neq 0$; the quarter-turn sends $(a, b) \\mapsto (-b, a) \\mapsto (-a, -b) \\mapsto (b, -a)$ — the orbit closes after exactly four turns.',
          'First side vector, from $z$ to $iz$: $\\mathbf{s_1} = (-(a+b),\\ a-b)$; second, from $iz$ to $i^2z$: $\\mathbf{s_2} = (b-a,\\ -(a+b))$ — which is $\\mathbf{s_1}$ turned by a right angle.',
          'Squared lengths: $|\\mathbf{s_1}|^2 = (a+b)^2 + (a-b)^2 = 2(a^2 + b^2)$ and $|\\mathbf{s_2}|^2 = (b-a)^2 + (a+b)^2 = 2(a^2+b^2)$ — all four sides share the length, each being the previous one turned.',
          'Perpendicularity: $\\mathbf{s_1} \\cdot \\mathbf{s_2} = -(a+b)(b-a) + (a-b)(-(a+b)) = (a^2 - b^2) + (b^2 - a^2) = 0$.',
        ], answer: 'always a square — sides $\\sqrt{2(a^2+b^2)}$, centre at the origin' },
        { q: 'Prove that $\\mathbb{C}$ has no zero divisors: $z_1 z_2 = 0$ forces $z_1 = 0$ or $z_2 = 0$.', solution: [
          'Suppose $z_1 z_2 = 0$ with $z_1 = a + bi$ and $z_2 = c + di$; multiply both sides by $\\bar{z_1}\\bar{z_2}$, legal by associativity and commutativity.',
          'The left side regroups: $(z_1 \\bar{z_1})(z_2 \\bar{z_2}) = (a^2 + b^2)(c^2 + d^2)$, using the conjugate seed twice.',
          'So $(a^2 + b^2)(c^2 + d^2) = 0$ — a product of non-negative REAL numbers.',
          'A product of non-negative reals vanishes only when a factor does: $a^2 + b^2 = 0$ forces $a = b = 0$, that is $z_1 = 0$; likewise $c^2 + d^2 = 0$ forces $z_2 = 0$.',
        ], answer: '$z_1 z_2 = 0 \\Rightarrow z_1 = 0$ or $z_2 = 0$ (the certificate also shows $|z_1z_2|^2 = |z_1|^2|z_2|^2$)' },
      ] },
    ] },
  ],
}

export const chapter03: Chapter = {
  number: 3,
  slug: 'complex-numbers',
  title: 'Complex Numbers: the New Rung',
  summary:
    'Arithmetic and Number Systems proved the extension-ladder discipline — every new number family born from a closure failure, repaired on purpose. This chapter climbs the most famous rung: x² + 1 = 0 has no real door, so a number i is forced with i² = −1, and the algebra of a + bi is built so the whole field-law family survives (the honest sanity ANS 7.2 banked). The conjugate and modulus arrive as bookkeeping — z z̄ = |z|², division by conjugating, |z| as a distance with the triangle inequality — and the Argand plane is read algebraically (addition as the parallelogram, multiplication as rotation-and-scaling) with the deep geometry left to later books. The payoff: the quadratic formula keeps its promise for every discriminant, and real coefficients are shown to force complex doors in conjugate pairs. De Moivre’s theorem and the nth roots of unity — the unit circle’s equal spokes — with their properties (primitive roots, the cyclotomic equations) banked as the module’s depth engine.',
  status: 'in-progress',
  lessons: [lesson31],
  plannedLessons: [
    'Conjugate and Modulus',
    'Negative Discriminants: the Doors Turn Complex',
    'The Argand Plane: Polar Form and the Argument',
    'De Moivre, Roots of Unity and the Complex Loci',
  ],
}
