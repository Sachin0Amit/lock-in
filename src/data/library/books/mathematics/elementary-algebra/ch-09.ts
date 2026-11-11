import type { Chapter, Lesson } from '../../../types'

/**
 * Elementary Algebra — Chapter 9: Quadratic Equations
 *
 * LESSONS WRITTEN: 9.1 Quadratics and Factoring Solutions (run 83 —
 *                 quiz keys 1/0/2/3/1, 14 exercises, two figures,
 *                 verify-book3-ch09.ts sections A-C pre-write + F
 *                 authored, E2E e2e-al-91 x3 viewports). 9.2 Completing
 *                 the Square, Derived (run 83 — quiz keys 2/1/0/3/2,
 *                 14 exercises, two figures, sections D-E pre-write +
 *                 G authored, E2E e2e-al-92 x3 viewports). 9.3 The
 *                 Quadratic Formula and the Discriminant (run 84 — quiz
 *                 keys 1/3/2/0/2, 14 exercises, two figures, sections H
 *                 pre-write + J authored, E2E e2e-al-93 x3 viewports).
 *                 9.4 Roots and Coefficients: Viète's Relations (run 84 —
 *                 quiz keys 1/2/3/2/1, 14 exercises, two figures, sections
 *                 I pre-write + K authored, E2E e2e-al-94 x3 viewports).
 *                 The unit-9 completion review passed at run 84 (sections
 *                 L): chapter 9 COMPLETE 4/4.
 *
 * References for this unit: the banked keys carry the run (zero downloads,
 * web-check only per the runs-71–82 pattern) — `hall-knight-elementary-
 * algebra` (the classical quadratics chapter opened with the factoring
 * method and completed the square before the formula), `ncert-math10-ch4-
 * quadratic` (the school canon's chapter: standard form, factoring,
 * completing the square, the formula, the discriminant), `khattar-qa-4e`
 * (the exam corner: factor-speed items, k-hunts, sum-product hunts),
 * `cengage-jee-style` (the presentation contract).
 *
 * VERIFY-FIRST (2026-11-10, run 83): every number in 9.1 and 9.2 was
 * recomputed by scripts/verify-book3-ch09.ts BEFORE any prose existed —
 * 347 exact checks across sections A–E (the factoring-solutions engine:
 * the a ≠ 0 clause, the zero-product law priced BOTH directions pointwise
 * with the half-integer 3/2 blind spot pinned, the S/P readout for eight
 * monic exhibits and three non-monic rebuilds, the forbidden-divide engine
 * x² = 3x → {0, 3} with the lost root priced, the cleared-fractional-
 * equation return 1/x + 1/(x+3) = 1/2 → x² − x − 6 = (x−3)(x+2) → {−2, 3}
 * with the bill {−3, 0} and the habitat {3}; the completing-the-square
 * engine: (x + h)² = x² + 2hx + h² exact for six h-values, the constant
 * inventory c − b²/4 for six exhibits, the square verdict u² = k solvable
 * iff k ≥ 0 with four irrational doors priced in quadratic fields, five
 * pinned solves exact including 1 ± √2 and 1 ± √(5/2) = 1 ± (1/2)√10 and
 * the word problem w(w+4) = 30 → w = −2 + √34). Pre-writing catches: the
 * roots of 3x² − 5x − 2 are −1/3 and 2 (not 5/3 — the verifier refused the
 * first draft); the (x−h)/(x+h) sign convention and the (2+√3)(2−√3) = 4 − 3
 * readout were both pinned wrong before the engines were trusted.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (9.1): the factoring pipeline — four stations, two doors.  */
/* Header (30,18,660,44); stations (30,96,150,150), (200,96,150,150),  */
/* (370,96,150,150), (540,96,150,150); chips (30,266,150,26),          */
/* (200,266,150,26), (370,266,150,26), (540,266,150,26); caption band  */
/* (30,304,660,24). Geometry pinned in verify-book3-ch09.ts plan91Fig1.*/
/* ------------------------------------------------------------------ */

function factoringPipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The factoring pipeline: standard form, factor, the zero-product gate, two linear doors — with the worked strip x² − 7x + 12 = 0 solving as {3, 4}">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the factoring pipeline — one standard form, two lawful doors</text>')
  // ---- station 1: STANDARD FORM ----
  parts.push('<rect x="30" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="105" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">1 · STANDARD FORM</text>')
  parts.push('<text x="105" y="142" font-size="10" fill="#65a30d" text-anchor="middle">ax² + bx + c = 0,</text>')
  parts.push('<text x="105" y="158" font-size="10" fill="#65a30d" text-anchor="middle">a ≠ 0 — the clause</text>')
  parts.push('<text x="105" y="174" font-size="10" fill="#65a30d" text-anchor="middle">that makes it</text>')
  parts.push('<text x="105" y="190" font-size="10" fill="#65a30d" text-anchor="middle">quadratic; move</text>')
  parts.push('<text x="105" y="206" font-size="10" fill="#65a30d" text-anchor="middle">everything left</text>')
  parts.push('<text x="105" y="222" font-size="10" fill="#65a30d" text-anchor="middle">(the balance law)</text>')
  // ---- station 2: FACTOR ----
  parts.push('<rect x="200" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="275" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">2 · FACTOR</text>')
  parts.push('<text x="275" y="142" font-size="10" fill="#65a30d" text-anchor="middle">the chapter-4</text>')
  parts.push('<text x="275" y="158" font-size="10" fill="#65a30d" text-anchor="middle">toolkit on one side:</text>')
  parts.push('<text x="275" y="174" font-size="10" fill="#65a30d" text-anchor="middle">(x − r₁)(x − r₂) = 0</text>')
  parts.push('<text x="275" y="190" font-size="10" fill="#65a30d" text-anchor="middle">a full product of</text>')
  parts.push('<text x="275" y="206" font-size="10" fill="#65a30d" text-anchor="middle">linear factors —</text>')
  parts.push('<text x="275" y="222" font-size="10" fill="#65a30d" text-anchor="middle">zero on the other</text>')
  // ---- station 3: THE GATE ----
  parts.push('<rect x="370" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="445" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">3 · THE GATE</text>')
  parts.push('<text x="445" y="142" font-size="10" fill="#65a30d" text-anchor="middle">the zero-product</text>')
  parts.push('<text x="445" y="158" font-size="10" fill="#65a30d" text-anchor="middle">law: u · v = 0 ⟺</text>')
  parts.push('<text x="445" y="174" font-size="10" fill="#65a30d" text-anchor="middle">u = 0 or v = 0 —</text>')
  parts.push('<text x="445" y="190" font-size="10" fill="#65a30d" text-anchor="middle">each factor opens</text>')
  parts.push('<text x="445" y="206" font-size="10" fill="#65a30d" text-anchor="middle">its own door;</text>')
  parts.push('<text x="445" y="222" font-size="10" fill="#65a30d" text-anchor="middle">proved both ways</text>')
  // ---- station 4: TWO DOORS ----
  parts.push('<rect x="540" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="615" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">4 · TWO DOORS</text>')
  parts.push('<text x="615" y="142" font-size="10" fill="#65a30d" text-anchor="middle">x − r₁ = 0 → x = r₁</text>')
  parts.push('<text x="615" y="158" font-size="10" fill="#65a30d" text-anchor="middle">x − r₂ = 0 → x = r₂</text>')
  parts.push('<text x="615" y="174" font-size="10" fill="#65a30d" text-anchor="middle">two linear solves —</text>')
  parts.push('<text x="615" y="190" font-size="10" fill="#65a30d" text-anchor="middle">a squared factor</text>')
  parts.push('<text x="615" y="206" font-size="10" fill="#65a30d" text-anchor="middle">opens twice onto</text>')
  parts.push('<text x="615" y="222" font-size="10" fill="#65a30d" text-anchor="middle">the same root</text>')
  // ---- connectors ----
  parts.push('<line x1="180" y1="171" x2="200" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="350" y1="171" x2="370" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="520" y1="171" x2="540" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  // ---- chips ----
  parts.push('<rect x="30" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="105" y="283" font-size="10.5" fill="#166534" text-anchor="middle">x² − 7x + 12 = 0</text>')
  parts.push('<rect x="200" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="275" y="283" font-size="10.5" fill="#166534" text-anchor="middle">(x − 3)(x − 4) = 0</text>')
  parts.push('<rect x="370" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="445" y="283" font-size="10.5" fill="#166534" text-anchor="middle">x − 3 = 0 or x − 4 = 0</text>')
  parts.push('<rect x="540" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="615" y="283" font-size="10.5" fill="#166534" text-anchor="middle">{3, 4} — check both</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">STANDARDIZE → FACTOR → GATE → DOORS. The running example lands at {3, 4}; both roots check in the original equation.</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (9.1): the verdict strip — linear vs quadratic. Header     */
/* (30,18,660,44); linear panel (30,84,315,170); quadratic panel       */
/* (375,84,315,170); linear chip (30,266,315,26); quadratic chip       */
/* (375,266,315,26); caption band (30,304,660,24). Geometry pinned in  */
/* verify-book3-ch09.ts plan91Fig2.                                    */
/* ------------------------------------------------------------------ */

function verdictStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The verdict strip: a linear equation opens one door, a quadratic opens at most two — two distinct, one repeated counted twice, or none real">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the verdicts: one door, two doors, no door</text>')
  // ---- linear panel ----
  parts.push('<rect x="30" y="84" width="315" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="187" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">LINEAR · ax + b = 0 (a ≠ 0)</text>')
  parts.push('<text x="187" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">exactly ONE root: x = −b/a</text>')
  parts.push('<text x="187" y="152" font-size="10" fill="#65a30d" text-anchor="middle">5.3’s verdict machine, priced:</text>')
  parts.push('<text x="187" y="172" font-size="10" fill="#65a30d" text-anchor="middle">one (3x + 2 = 0 → −2/3) · none</text>')
  parts.push('<text x="187" y="192" font-size="10" fill="#65a30d" text-anchor="middle">(0x = 5, a contradiction) ·</text>')
  parts.push('<text x="187" y="212" font-size="10" fill="#65a30d" text-anchor="middle">every x (0x = 0, an identity)</text>')
  parts.push('<text x="187" y="236" font-size="10" fill="#d97706" text-anchor="middle">one factor · one door</text>')
  // ---- quadratic panel ----
  parts.push('<rect x="375" y="84" width="315" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="532" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">QUADRATIC · ax² + bx + c = 0 (a ≠ 0)</text>')
  parts.push('<text x="532" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">AT MOST two real roots — two factor doors</text>')
  parts.push('<text x="532" y="152" font-size="10" fill="#65a30d" text-anchor="middle">two distinct: x² − 7x + 12 = 0 → {3, 4}</text>')
  parts.push('<text x="532" y="172" font-size="10" fill="#65a30d" text-anchor="middle">one, counted twice: (x − 3)² = 0 → {3}</text>')
  parts.push('<text x="532" y="192" font-size="10" fill="#65a30d" text-anchor="middle">none real: x² + x + 1 = 0 (the square</text>')
  parts.push('<text x="532" y="212" font-size="10" fill="#65a30d" text-anchor="middle">(x + 1/2)² + 3/4 is never zero)</text>')
  parts.push('<text x="532" y="236" font-size="10" fill="#d97706" text-anchor="middle">two factors · at most two doors</text>')
  // ---- chips ----
  parts.push('<rect x="30" y="266" width="315" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="187" y="283" font-size="10.5" fill="#166534" text-anchor="middle">linear verdicts: one · none · infinitely many</text>')
  parts.push('<rect x="375" y="266" width="315" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="532" y="283" font-size="10.5" fill="#166534" text-anchor="middle">quadratic verdicts: two · one repeated · none real</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">the degree sets the door count: one linear factor — one door; two linear factors — two; a squared factor opens twice onto the same root.</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson91: Lesson = {
  id: 'al-quadratics-and-factoring-solutions',
  number: '9.1',
  title: 'Quadratics and Factoring Solutions',
  concepts: [
    'the quadratic equation and the a ≠ 0 clause',
    'standard form',
    'the zero-product law',
    'solution by factoring',
    'the sum-product readout',
    'the forbidden divide and the lost root',
    'the repeated root, counted twice',
    'the three verdicts: two, one, none real',
  ],
  objectives: [
    'state what makes an equation quadratic — degree 2 with a nonzero leading coefficient — and put any quadratic into standard form lawfully',
    'prove the zero-product law in both directions from the field laws and apply it as the engine of solution by factoring',
    'solve quadratic equations by factoring with the chapter-4 toolkit, including non-monic forms with fractional roots',
    'explain why dividing by the unknown loses a root, with the lost root priced by substitution',
    'read the sum S = r₁ + r₂ and product P = r₁·r₂ off a factored quadratic and run the sum-product hunt backwards',
    'distinguish the three verdicts — two distinct, one repeated (counted twice), none real — and tell when factoring honestly cannot answer',
  ],
  prerequisites: ['al-factoring-quadratic-trinomials', 'al-common-factors-and-grouping', 'al-what-an-equation-is-the-balance-principle', 'al-fractional-equations-and-extraneous-roots'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Eight chapters have assembled everything this one cashes in. The letter-world learned to be built and simplified by the laws (chapter 1), polynomials became a family with a degree and a factorization theory (chapters 3 and 4), equations learned to be settled lawfully (chapter 5), systems of them by elimination (chapter 6), order joined the toolkit (chapter 7), and fractions put polynomials under the bar with their excluded values billed honestly (chapter 8). Now comes the summit of elementary algebra: the QUADRATIC EQUATION — the equation of area, of projectile flight, of every situation where a quantity is squared. Foundation Mathematics promised it, chapter 4 built the factoring engine that solves it, and lesson 8.3 left a debt waiting: the cleared fractional equation 1/x + 1/(x+3) = 1/2 turned into x² − x − 6 = 0, a quadratic — and this chapter now supplies the general method for solving exactly that.' },
    { kind: 'para', text: 'The chapter runs in four lessons. This one solves quadratics by FACTORING — the method the classical texts opened with, powered entirely by the chapter-4 toolkit and one new theorem, the zero-product law. Lesson 9.2 derives COMPLETING THE SQUARE — the identity that answers every monic quadratic, including the ones no factoring can crack, and finally lets √2 be an answer. Lesson 9.3 runs the completed square on general coefficients and PROVES the quadratic formula, with the discriminant as a three-way verdict machine. Lesson 9.4 proves Viète’s roots-and-coefficients relations and puts them to competition work. Every method of this lesson is exact, verifiable, and — per the discipline of this book — priced by a verifier before a word of prose was written.' },
    { kind: 'heading', text: 'The Quadratic Object' },
    { kind: 'equation', latex: 'a x^2 + b x + c = 0 \\qquad (a \\neq 0)', note: 'the quadratic equation in standard form — degree exactly 2, the leading coefficient a refusing to be zero' },
    { kind: 'para', text: 'An equation is said to be QUADRATIC in the variable $x$ if it can be written in the standard form above: one side carrying the polynomial $a x^2 + b x + c$ of degree EXACTLY 2, the other side zero. Both clauses carry weight. The degree-2 clause says an $x^2$ must genuinely appear; the $a \\neq 0$ clause says its coefficient must not be zero — for if $a = 0$, the equation collapses to $b x + c = 0$, a LINEAR equation wearing a quadratic’s clothes. The equation $0 \\cdot x^2 + 2x - 1 = 0$ is just $2x - 1 = 0$: degree 1, one root, chapter 5’s territory. The name is Latin for "square" — quadratus — and the equation is the algebraic record of a square: area problems, distance-time graphs of falling bodies, any situation where a quantity multiplies itself.' },
    { kind: 'list', marker: 'roman', items: [
      '$x^2 - 7x + 12 = 0$ — quadratic ($a = 1$, $b = -7$, $c = 12$): the chapter’s running example',
      '$2x^2 - 7x + 6 = 0$ — quadratic with a NON-MONIC lead ($a = 2$): fractional roots live here',
      '$x^2 = 5x$ — quadratic only after the standard-form move: $x^2 - 5x = 0$ (and the move is mandatory, as this very equation will show)',
      '$0 \\cdot x^2 + 2x - 1 = 0$ — NOT quadratic: the $x^2$ ink is there but $a = 0$ kills it; degree 1, linear',
      '$x^3 - 8 = 0$ — cubic, not quadratic: degree 3 needs its own methods (the factor theorem of chapter 4 cracks it)',
    ] },
    { kind: 'terms', items: [
      { term: 'quadratic equation', def: 'an equation reducible to $a x^2 + b x + c = 0$ with $a \\neq 0$ — degree exactly 2 in one variable. The clause $a \\neq 0$ is part of the definition: without it the equation is linear.' },
      { term: 'standard form', def: 'the arrangement $a x^2 + b x + c = 0$ with everything on one side and zero on the other — the form from which every method of this chapter starts.' },
      { term: 'root (or solution)', def: 'a number $r$ that makes the equation TRUE when substituted: $a r^2 + b r + c = 0$. Checking a claimed root by substitution is the cheapest insurance in algebra.' },
      { term: 'the zero-product law', def: 'for real numbers $u$ and $v$: $u \\cdot v = 0$ if and only if $u = 0$ or $v = 0$ — the theorem that converts a factored equation into two linear equations.' },
      { term: 'repeated root', def: 'when a quadratic factors as $a(x - r)^2$, the single value $r$ is a root "counted twice" — the squared factor opens twice onto the same door.' },
      { term: 'habitat', def: 'the set of values a word problem’s situation actually allows (a length is positive, a filling time is positive) — the filter that picks the answer from the equation’s roots, as in 8.3.' },
    ] },
    { kind: 'heading', text: 'Standard Form First' },
    { kind: 'para', text: 'Every method of this chapter begins with the same move: put the equation in standard form, everything on one side, zero on the other. The move is justified by chapter 5’s balance principle — subtracting the same quantity from both sides preserves the solution set exactly — and the verifier priced the preservation pointwise: $3x^2 = 5x + 2$ holds at precisely the same eleven census points as $3x^2 - 5x - 2 = 0$. The moved form factors as $(3x + 1)(x - 2)$, so its roots are $-\\frac{1}{3}$ and $2$ — and the point of the discipline is that the FACTORING TOOLS of chapter 4 only work on one side of an equation. A product equal to a sum factors for nobody; a product equal to ZERO factors for everybody. Zero is the magic constant of this whole chapter.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the x² ink does not make it quadratic', text: 'Scan for $x^2$ only AFTER the standard-form move. The equation $x^2 = 5x + 2 - 4x - 2$ carries $x^2$ ink on the left, but the right side collects to $x$: the equation is $x^2 = x$, which IS quadratic (roots $0$ and $1$) — but $2x + 1 = x^2 - x^2 + 3$ is $2x - 2 = 0$, linear. Collect everything first, then read the degree of what remains, then check the leading coefficient is not zero. One collection, one degree, one method choice — never a method chosen from the raw ink.' },
    { kind: 'heading', text: 'The Zero-Product Law' },
    { kind: 'para', text: 'Here is the theorem that makes factoring a SOLVING method rather than a parlor trick. Chapter 4 taught how to write a quadratic as a product of linear factors; the zero-product law converts that product back into solutions. It is a biconditional — both directions need proof — and both directions come from the field laws that Arithmetic and Number Systems banked.' },
    { kind: 'derivation', title: 'Theorem — the zero-product law', statement: 'For real numbers $u$ and $v$: $\\;u \\cdot v = 0 \\;\\iff\\; u = 0 \\text{ or } v = 0$.', steps: [
      { label: '(⟸) If a factor is zero', formula: 'u = 0 \\;\\Rightarrow\\; u \\cdot v = 0 \\cdot v = 0', explanation: 'and the same with $v = 0$. This direction is the annihilator property of zero: multiplying by zero destroys any product, which ANS proved from the field laws.' },
      { label: '(⟹) Suppose u · v = 0', formula: 'u \\cdot v = 0,\\; u \\neq 0', explanation: 'we must show $v = 0$. Since $u \\neq 0$, the reciprocal $\\frac{1}{u}$ exists — the multiplicative-inverse law, and the reason the clause "or" is honest.' },
      { label: 'Multiply by the reciprocal', formula: 'v = v \\cdot 1 = v \\cdot \\left(u \\cdot \\tfrac{1}{u}\\right) = (u \\cdot v) \\cdot \\tfrac{1}{u} = 0 \\cdot \\tfrac{1}{u} = 0', explanation: 'associativity and commutativity rearrange the product, the annihilator finishes it. Symmetrically, if $v \\neq 0$ then $u = 0$. Both factors escaping zero is impossible.' },
      { label: 'Both directions hold', formula: 'u \\cdot v = 0 \\;\\iff\\; u = 0 \\;\\text{ or }\\; v = 0', explanation: 'the ⟸ direction never used $u \\neq 0$; the ⟹ direction needed the reciprocal, which exists exactly because a field has no zero divisors. The law is the field structure speaking.' },
    ], result: 'A product of real numbers is zero EXACTLY when at least one factor is zero. With $n$ factors the same proof gives: $u_1 u_2 \\cdots u_n = 0$ iff some $u_i = 0$.' },
    { kind: 'para', text: 'The verifier priced both directions pointwise on the census window: at each of the eleven points $x = -5, \\ldots, 5$, the product $(x-3)(x-4)$ is zero EXACTLY when one of the factors is — the ⟺ held at every point, no exceptions. The census has a blind spot the verifier also caught, and it is worth naming: the non-monic product $(2x - 3)(x - 2)$ vanishes at $x = \\frac{3}{2}$, a half-integer the integer census cannot see at all. The verifier pinned it by direct evaluation: at $x = \\frac{3}{2}$ the first factor reads $2 \\cdot \\frac{3}{2} - 3 = 0$ — dead, so the product is dead, lawfully. Fractional roots are real roots; a root census is only as wide as its window.' },
    { kind: 'heading', text: 'Solution by Factoring' },
    { kind: 'para', text: 'The method now assembles into a four-station pipeline, and its soul is the placement of zero. STATION ONE, STANDARD FORM: move everything to one side so the other side reads exactly $0$. STATION TWO, FACTOR: apply the full chapter-4 toolkit — common factors, quadratic trinomials, the identities — to write that side as a product of linear factors. STATION THREE, THE GATE: invoke the zero-product law, which splits the product equation into one linear equation per factor. STATION FOUR, TWO DOORS: solve each linear equation — chapter 5’s craft, one step each — and CHECK both roots by substitution. The pipeline is short because eight chapters of machinery stand behind it.' },
    { kind: 'figure', caption: 'The factoring pipeline: put the equation in standard form, factor one side completely, let the zero-product law open one door per factor, and solve the two linear equations. The running example x² − 7x + 12 = 0 lands at {3, 4}; a squared factor opens twice onto the same root.', svg: factoringPipelineSvg() },
    { kind: 'para', text: 'The factored form is also a READING DEVICE. Expanding $(x - r_1)(x - r_2)$ gives $x^2 - (r_1 + r_2)x + r_1 r_2$: the coefficient of $x$ is minus the SUM of the roots, and the constant term is their PRODUCT. For $x^2 - 7x + 12$ the readout says the roots sum to $7$ and multiply to $12$ — and $3$ and $4$ pass both tests. This sum-and-product reading runs the hunt backwards in the exercises (find the quadratic whose roots behave so-and-so), and in lesson 9.4 it graduates into Viète’s relations, proved and put to real competition work. For now, use it as a check: the factored form and the expanded form must agree coefficient by coefficient, and the verifier certified exactly that agreement for every exhibit in this lesson.' },
    { kind: 'example', title: 'Solve x² − 7x + 12 = 0 by factoring', steps: [
      'Already in standard form with $a = 1$ — factor the trinomial (4.2): find two numbers with product $12$ and sum $7$: they are $3$ and $4$.',
      'So, $x^2 - 7x + 12 = (x - 3)(x - 4)$ — the verifier certified the expansion coefficient by coefficient.',
      'Now, the zero-product gate: $(x - 3)(x - 4) = 0$ forces $x - 3 = 0$ or $x - 4 = 0$.',
      'Hence $x = 3$ or $x = 4$. Check: $9 - 21 + 12 = 0$ and $16 - 28 + 12 = 0$ — both true.',
      'Hence x = 3 and x = 4.',
    ] },
    { kind: 'example', title: 'Solve x² + 2x − 15 = 0 by factoring', steps: [
      'Two numbers with product $-15$ and sum $2$: the signs differ, and $5$ and $-3$ do it.',
      'So, $x^2 + 2x - 15 = (x + 5)(x - 3)$.',
      'The gate: $x + 5 = 0$ or $x - 3 = 0$.',
      'Hence $x = -5$ or $x = 3$. Check: $25 - 10 - 15 = 0$ and $9 + 6 - 15 = 0$.',
      'Hence x = −5 and x = 3.',
    ] },
    { kind: 'example', title: 'Solve 2x² − 7x + 6 = 0 (non-monic)', steps: [
      'Factor with the 4.2 cross method: $2x^2 - 7x + 6 = (2x - 3)(x - 2)$ — expansion certified: $2x^2 - 4x - 3x + 6$.',
      'The gate: $2x - 3 = 0$ or $x - 2 = 0$.',
      'First door: $2x = 3$, so $x = \\frac{3}{2}$ — the fractional root the integer census cannot see.',
      'Second door: $x = 2$. Check: $2 \\cdot \\frac{9}{4} - \\frac{21}{2} + 6 = \\frac{9}{2} - \\frac{21}{2} + 6 = 0$ and $8 - 14 + 6 = 0$.',
      'Hence x = 3/2 and x = 2.',
    ] },
    { kind: 'example', title: 'Solve 6x² − x − 2 = 0 (non-monic)', steps: [
      'Cross method: $6x^2 - x - 2 = (3x - 2)(2x + 1)$ — expansion certified: $6x^2 + 3x - 4x - 2$.',
      'The gate: $3x - 2 = 0$ or $2x + 1 = 0$.',
      'Hence $x = \\frac{2}{3}$ or $x = -\\frac{1}{2}$. Check: $6 \\cdot \\frac{4}{9} - \\frac{2}{3} - 2 = \\frac{8}{3} - \\frac{2}{3} - 2 = 0$ and $6 \\cdot \\frac{1}{4} + \\frac{1}{2} - 2 = 0$.',
      'Hence x = 2/3 and x = −1/2.',
    ] },
    { kind: 'example', title: 'Audit a student’s work: is x = 3 the full answer to x² = 3x?', steps: [
      'The student divided both sides by $x$ and concluded $x = 3$. The division looks innocent — but dividing by $x$ is lawful only where $x \\neq 0$.',
      'Test the expelled candidate in the ORIGINAL: at $x = 0$ the equation reads $0 = 0$ — TRUE. The root $x = 0$ satisfies the equation and was destroyed by the divide.',
      'Do it lawfully: $x^2 = 3x$ becomes $x^2 - 3x = 0$, factor the common factor (4.1): $x(x - 3) = 0$.',
      'The gate: $x = 0$ or $x - 3 = 0$. Hence $x = 0$ and $x = 3$ both — the student’s answer was half an answer.',
      'Hence Not lawful as a method — the full solution set is {0, 3}, and the divide lost x = 0.',
    ] },
    { kind: 'para', text: 'The audit exhibit deserves its general name: the FORBIDDEN DIVIDE, the exact sibling of 5.1’s forbidden multiply-by-zero. Dividing an equation by an expression containing the unknown is lawful only at the points where that expression is alive — and the points where it is zero are precisely the points the equation might be trying to tell you about. The move that destroys them is factoring: $x^2 = 3x$ has a common factor $x$ on the left after the standard-form move, and the zero-product law turns that factor into the root the division discarded. The same vigilance prices the square-root shortcut: $2x^2 - 8 = 0$ gives $x^2 = 4$, and the honest reading of "$x$ squared is $4$" is $x = \\pm 2$ — TWO doors, because both $2^2 = 4$ and $(-2)^2 = 4$. The answer $x = 2$ alone is half a verdict (and the stranger $x = 4$ prices at $2 \\cdot 16 - 8 = 24 \\neq 0$). Lesson 9.2 makes this two-door square root the centerpiece of its method.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — zero-product needs a zero', text: 'The gate opens only when one side of the equation is exactly $0$. The trap: $(x - 1)(x + 2) = 4$ does NOT give $x = 1$ or $x = -2$ — at those values the left side is $0$, not $4$ (the verifier priced both). Zero-product speaks only about products EQUAL TO ZERO. Expand first: $x^2 + x - 2 = 4$, so $x^2 + x - 6 = 0$, so $(x + 3)(x - 2) = 0$, and the doors give $x = -3$ and $x = 2$. The exercise set drills this until the reflex is automatic.' },
    { kind: 'example', title: 'Solve (x − 1)(x + 2) = 4 lawfully', steps: [
      'Expand the left side: $x^2 + x - 2 = 4$.',
      'Standard form: $x^2 + x - 6 = 0$ — subtract $4$ from both sides (the balance law).',
      'Factor: $(x + 3)(x - 2) = 0$ — product $-6$, sum $1$.',
      'The gate: $x + 3 = 0$ or $x - 2 = 0$. Check: $(-4)(-1) = 4$ and $(1)(4) = 4$ — both true in the ORIGINAL equation.',
      'Hence x = −3 and x = 2.',
    ] },
    { kind: 'para', text: 'With the pipeline running, the verdicts of this chapter’s equations can be laid beside chapter 5’s. A linear equation $ax + b = 0$ with $a \\neq 0$ had exactly one root; its full verdict machine (5.3) also knew "none" (a contradiction like $0x = 5$) and "infinitely many" (an identity like $0x = 0$). A quadratic equation $ax^2 + bx + c = 0$ with $a \\neq 0$ has AT MOST two real roots — the factored form has two linear factors and each contributes at most one door — and its verdicts are: TWO DISTINCT roots, ONE root repeated (counted twice), or NONE real. The degree sets the door count.' },
    { kind: 'table', caption: 'The verdict ledger, priced by the verifier: the door count follows the factored form', head: ['Equation', 'Factored form', 'Roots', 'Verdict'], rows: [
      ['$x^2 - 7x + 12 = 0$', '$(x-3)(x-4) = 0$', '$\\{3, 4\\}$', 'two distinct'],
      ['$2x^2 - 8 = 0$', '$2(x-2)(x+2) = 0$', '$\\{-2, 2\\}$', 'two distinct (the ± square root)'],
      ['$(x-3)^2 = 0$', '$(x-3)(x-3) = 0$', '$\\{3\\}$', 'one, repeated — counted twice'],
      ['$x^2 + x + 1 = 0$', 'no factorization over the integers', '$\\varnothing$', 'none real — $(x+\\frac{1}{2})^2 + \\frac{3}{4} > 0$ always'],
    ] },
    { kind: 'heading', text: 'The Repeated Root and the Honest Limits' },
    { kind: 'para', text: 'The repeated root earns a second look, because it is the verdict students most often misreport. The equation $(x - 3)^2 = 0$ has the single root $x = 3$ — but the FACTOR appears twice, and the honest bookkeeping says "$x = 3$, counted twice". The count matters: the verifier found exactly one distinct root on the whole census window, while the discriminant reading of lesson 9.3 will compute $\\Delta = 36 - 36 = 0$ and read the same story from the coefficients. The k-hunt runs the idea backwards: to make $x^2 + kx + 9$ have a repeated root, the quadratic must be a perfect square — and the sign takes care: $(x - 3)^2 = x^2 - 6x + 9$ has the root $+3$, so $k = -6$ works with root $3$; the mirror $(x + 3)^2 = x^2 + 6x + 9$ gives $k = 6$ with root $-3$. Both signs are honest answers. The exercise set asks the same question of $x^2 + kx + 16$, where $k = \\pm 8$.' },
    { kind: 'para', text: 'Now the honest limits, because factoring does not answer everything. The equation $x^2 + x + 1 = 0$ has no integer root (the verifier scanned the only candidates $\\pm 1$) — and more: it has NO REAL ROOT AT ALL, because the completed-square identity $(x + \\frac{1}{2})^2 + \\frac{3}{4} = x^2 + x + 1$ is exact, a square plus $\\frac{3}{4}$ can never be zero, and the verifier priced the identity at every census point. The equation $x^2 - 4x + 1 = 0$ is the subtler case: it also has no integer root ($1 - 4 + 1 = -2$ and $1 + 4 + 1 = 6$ refuse), yet it DOES have real roots — the verifier certified them exactly as $2 \\pm \\sqrt{3}$ in the number field $\\mathbb{Q}(\\sqrt{3})$. So factoring over the integers answers SOME quadratics; the honest verdict "no factorization exists" divides into two different fates, and telling them apart needs the machinery of the next two lessons.' },
    { kind: 'callout', tone: 'insight', title: 'Insight — the verdict machine grows up', text: 'Chapter 5’s verdict machine sorted linear equations into one, none, infinitely many. The quadratic machine has the same three-shape output with different filling: two distinct, one repeated, none real — and "infinitely many" is impossible, because $a \\neq 0$ pins a genuine square term (a quadratic identity $0 \\cdot x^2 + \\ldots = 0$ would have $a = 0$ and stop being quadratic). The degree sets the door count; the discriminant of lesson 9.3 will read the verdict straight off $\\Delta = b^2 - 4ac$ without factoring at all. When a solved fractional equation clears to a quadratic, THIS is the machine that takes the case.' },
    { kind: 'figure', caption: 'The verdict strip: a linear equation opens one door (with the none and infinitely-many corner cases of 5.3), a quadratic opens at most two — two distinct, one repeated counted twice, or none real. The exhibits are the verifier’s priced ones.', svg: verdictStripSvg() },
    { kind: 'para', text: 'The debt from chapter 8 can now be paid in full. Lesson 8.3 solved the work-rate problem $\\frac{1}{x} + \\frac{1}{x+3} = \\frac{1}{2}$ by clearing denominators: $x(x+3) = 2(x+3) + 2x$, which simplifies to $x^2 - x - 6 = 0$ — a QUADRATIC, as promised. This lesson’s pipeline finishes it: factor $(x - 3)(x + 2) = 0$, doors at $x = 3$ and $x = -2$. The bill $\\{x \\neq 0, -3\\}$ refuses neither candidate, and the verifier confirmed both in the ORIGINAL equation: $\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}$ and $\\frac{1}{-2} + \\frac{1}{1} = \\frac{1}{2}$. The equation has two roots; the word problem’s habitat — a filling time must be positive — keeps $\\{3\\}$ alone, exactly as run 8.3’s habitat reading promised. From this lesson forward, a cleared fractional equation that lands in degree 2 is no longer a dead end: it is this chapter’s daily bread.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'A quadratic equation is $ax^2 + bx + c = 0$ with $a \\neq 0$; put it in standard form FIRST, then read the degree of what remains.',
      'The zero-product law — $uv = 0$ iff $u = 0$ or $v = 0$ — is proved in both directions from the field laws and is the engine that turns factored form into roots.',
      'The pipeline: standard form, factor (chapter 4 toolkit), gate, two linear doors; fractional roots arrive through non-monic factors.',
      'Never divide by the unknown (the lost root $0$ in $x^2 = 3x$) and never open the gate on a nonzero constant ($(x-1)(x+2) = 4$); expand or factor, then gate.',
      'The verdicts are two distinct, one repeated (counted twice), or none real; factoring over the integers answers some quadratics and honestly reports the rest to lesson 9.2.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the factoring-first tradition', text: 'Hall & Knight’s Elementary Algebra for Schools (1885), the classical text this book follows, opened its quadratics chapter exactly where this lesson does: solution by factoring, with the zero-product principle stated as the rule that "the product of two factors can vanish only if one of them vanishes". The method is older still — Brahmagupta’s 7th-century Brāhmasphuṭasiddhānta already solved specific quadratics in factored form — but the general statement waits for the field structure that ANS banked. The harder truth of this lesson, that factoring cannot reach every quadratic, is what drove the next thousand years of method: completing the square, the formula, and the discriminant — this chapter’s next three lessons. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope, SSC/bank preliminaries, JEE-Main foundations) drills this lesson’s shapes relentlessly: (1) factor-speed solves — $x^2 - 7x + 12 = 0$ class items where seconds matter and the sum-product readout does the hunting; (2) the k-hunt — find $k$ so the quadratic has a repeated root ($k = -6$ for $x^2 + kx + 9$) or a given root; (3) the lost-root audit — "solve $x^2 = 3x$" items where the trap answer is $x = 3$ alone; (4) the sum-product hunt — "the roots differ by 3 and multiply to 10, find the quadratic" (there are TWO, $x^2 - 7x + 10$ and $x^2 + 7x + 10$); (5) word problems whose standard form is quadratic — areas, consecutive integers, work rates — where the habitat keeps the sane root. The zero-product law is the most-used theorem in competitive algebra; the exercises drill it both ways.' },
    { kind: 'formula', name: 'The quadratic equation', latex: 'a x^2 + b x + c = 0 \\qquad (a \\neq 0)', note: 'standard form first — collect everything to one side; the a ≠ 0 clause is what makes it quadratic' },
    { kind: 'formula', name: 'The zero-product law', latex: 'u \\cdot v = 0 \\;\\iff\\; u = 0 \\;\\text{ or }\\; v = 0', note: 'proved both directions from the field laws; the gate that turns factored form into roots' },
    { kind: 'formula', name: 'The sum-product readout', latex: '(x - r_1)(x - r_2) = x^2 - (r_1 + r_2)x + r_1 r_2', note: 'coefficient of x is minus the sum, constant is the product — the check and the hunt, growing into Viète in 9.4' },
    { kind: 'quiz', title: 'Check yourself', items: [
      {
        q: 'Which of these is a quadratic equation in one variable?',
        options: ['$2x + 3 = 0$', '$x^2 - 5x + 6 = 0$', '$x^3 - 8 = 0$', '$\\frac{1}{x^2} = 4$'],
        answer: 1,
        explain: 'Option 2 has degree exactly 2 with a nonzero leading coefficient — quadratic. Option 1 is linear (degree 1); option 3 is cubic (degree 3, the factor theorem’s territory); option 4 is not even a polynomial equation as written — the variable sits under the bar, and clearing it changes the object.',
      },
      {
        q: 'The roots of $x^2 - 7x + 12 = 0$ are —',
        options: ['$x = 3$ and $x = 4$', '$x = -3$ and $x = -4$', '$x = 2$ and $x = 6$', '$x = 12$ and $x = 1$'],
        answer: 0,
        explain: 'Factor: $(x - 3)(x - 4) = 0$, doors at $3$ and $4$ (sum $7$, product $12$ — the readout agrees). Option 2 is the classic sign flip: $(-3)(-4) = 12$ but the sum is $-7$; priced at $x = -3$ the equation reads $42 \\neq 0$. Options 3 and 4 have the wrong sum ($8$ and $13$ against $7$).',
      },
      {
        q: 'Solved LAWFULLY, the equation $x^2 = 5x$ has —',
        options: ['exactly one root, $x = 5$', 'exactly one root, $x = 0$', 'two roots, $x = 0$ and $x = 5$', 'no real roots'],
        answer: 2,
        explain: 'Move left: $x^2 - 5x = x(x - 5) = 0$, and the gate opens two doors: $x = 0$ and $x = 5$. Options 1 and 2 come from DIVIDING by $x$ (or by zero-chasing) — the forbidden divide loses the $x = 0$ door, where the original equation reads $0 = 0$, perfectly true.',
      },
      {
        q: 'The equation $2x^2 - 8 = 0$ has roots —',
        options: ['$x = 2$ only', '$x = 4$ only', '$x = \\pm 4$', '$x = 2$ and $x = -2$'],
        answer: 3,
        explain: '$x^2 = 4$ has the two-door answer $x = \\pm 2$ — both check: $2 \\cdot 4 - 8 = 0$ for each. Option 1 drops the $-2$ door (squaring forgets the sign); option 2 never square-roots at all ($x = 4$ prices at $2 \\cdot 16 - 8 = 24 \\neq 0$); option 3 square-roots the wrong number ($\\pm 4$ belongs to $x^2 = 16$).',
      },
      {
        q: 'The equation $(x - 3)^2 = 0$ — the honest verdict is',
        options: ['no real root', 'exactly one distinct root, $x = 3$, counted twice', 'two distinct roots', 'infinitely many roots'],
        answer: 1,
        explain: 'The squared factor opens twice onto the SAME door: $x = 3$ is the single distinct root, counted twice by the factor’s power. Option 1 is wrong ($x = 3$ IS a root — the verifier priced $(0)^2 = 0$); option 3 invents a second distinct root (off the root the square is positive — $9$ at $x = 0$); option 4 is the linear identity’s verdict, impossible here because $a \\neq 0$ pins a genuine square.',
      },
    ] },
    { kind: 'exercises', title: 'Exercises 9.1', sets: [
      { level: 'L1', questions: [
        {
          q: 'Solve $x^2 - 9 = 0$ by factoring.',
          solution: [
            'Recognize the difference of squares (4.3): $x^2 - 9 = (x - 3)(x + 3)$.',
            'The gate: $x - 3 = 0$ or $x + 3 = 0$.',
            'Hence $x = 3$ or $x = -3$. Check: $9 - 9 = 0$ either way — the square kills the sign.',
          ],
          answer: '$x = 3$ and $x = -3$.',
        },
        {
          q: 'Solve $x^2 - 5x = 0$ by factoring.',
          solution: [
            'The common factor $x$ (4.1): $x(x - 5) = 0$.',
            'The gate: $x = 0$ or $x - 5 = 0$.',
            'Hence $x = 0$ and $x = 5$ — the common-factor door is where dividing by $x$ would have gone blind.',
          ],
          answer: '$x = 0$ and $x = 5$.',
        },
        {
          q: 'Show that $x = 2$ is a root of $x^2 + x - 6 = 0$, then find the other root.',
          solution: [
            'Substitute: $4 + 2 - 6 = 0$ — TRUE, so $x = 2$ is a root.',
            'Factor: $x^2 + x - 6 = (x - 2)(x + 3)$ — product $-6$, sum $1$.',
            'The gate: $x - 2 = 0$ or $x + 3 = 0$; hence the partner is $x = -3$. Check: $9 - 3 - 6 = 0$.',
          ],
          answer: '$x = 2$ is a root; the other is $x = -3$.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: 'Solve $x^2 - 7x + 12 = 0$.',
          solution: [
            'Two numbers with product $12$ and sum $7$: $3$ and $4$.',
            'So, $(x - 3)(x - 4) = 0$ and the gate opens $x = 3$, $x = 4$.',
            'Check: $9 - 21 + 12 = 0$ and $16 - 28 + 12 = 0$.',
          ],
          answer: '$x = 3$ and $x = 4$.',
        },
        {
          q: 'Solve $x^2 + 2x - 15 = 0$.',
          solution: [
            'Product $-15$, sum $2$: the pair $5$ and $-3$.',
            'So, $(x + 5)(x - 3) = 0$; the gate gives $x = -5$, $x = 3$.',
            'Check: $25 - 10 - 15 = 0$ and $9 + 6 - 15 = 0$.',
          ],
          answer: '$x = -5$ and $x = 3$.',
        },
        {
          q: 'Solve $x^2 - 25 = 0$, and explain why $x^2 + 25 = 0$ has no real root.',
          solution: [
            'Difference of squares: $(x - 5)(x + 5) = 0$, so $x = \\pm 5$.',
            'For $x^2 + 25 = 0$ we would need $x^2 = -25$ — a square is never negative.',
            'Hence $x^2 + 25 = 0$ has NO real root (the verifier priced $x^2 + 25 \\geq 25$ across the census window); lesson 9.2 turns this square-verdict into a method.',
          ],
          answer: '$x = \\pm 5$; $x^2 + 25 = 0$ has no real solution.',
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Solve $2x^2 - 7x + 6 = 0$.',
          solution: [
            'Cross method: $(2x - 3)(x - 2) = 0$ — expansion $2x^2 - 4x - 3x + 6$ certified.',
            'The gate: $2x - 3 = 0$ or $x - 2 = 0$.',
            'Hence $x = \\frac{3}{2}$ or $x = 2$. Check: $2 \\cdot \\frac{9}{4} - \\frac{21}{2} + 6 = 0$ and $8 - 14 + 6 = 0$.',
          ],
          answer: '$x = \\frac{3}{2}$ and $x = 2$.',
        },
        {
          q: 'Solve $6x^2 - x - 2 = 0$.',
          solution: [
            'Cross method: $(3x - 2)(2x + 1) = 0$ — expansion $6x^2 + 3x - 4x - 2$ certified.',
            'The gate: $3x - 2 = 0$ or $2x + 1 = 0$.',
            'Hence $x = \\frac{2}{3}$ or $x = -\\frac{1}{2}$. Check: $\\frac{8}{3} - \\frac{2}{3} - 2 = 0$ and $\\frac{3}{2} + \\frac{1}{2} - 2 = 0$.',
          ],
          answer: '$x = \\frac{2}{3}$ and $x = -\\frac{1}{2}$.',
        },
        {
          q: 'A student solves $x^2 = 3x$ by dividing both sides by $x$ and answers $x = 3$. Audit, correct, and check.',
          solution: [
            'The division is lawful only where $x \\neq 0$ — and $x = 0$ is exactly a candidate the equation wants to discuss.',
            'Test it in the original: $0 = 0$ — TRUE. The divide destroyed a genuine root.',
            'Lawfully: $x^2 - 3x = 0$, factor $x(x - 3) = 0$, gate: $x = 0$ or $x = 3$.',
            'Hence the full set is $\\{0, 3\\}$; the student’s answer was half of it.',
          ],
          answer: 'Not lawful — the full answer is $x = 0$ and $x = 3$.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Solve $6x^2 + 7x - 3 = 0$.',
          solution: [
            'Cross method: $(2x + 3)(3x - 1) = 0$ — expansion $6x^2 - 2x + 9x - 3$ certified.',
            'The gate: $2x + 3 = 0$ or $3x - 1 = 0$.',
            'Hence $x = -\\frac{3}{2}$ or $x = \\frac{1}{3}$. Check: $6 \\cdot \\frac{9}{4} - \\frac{21}{2} - 3 = 0$ and $6 \\cdot \\frac{1}{9} + \\frac{7}{3} - 3 = 0$.',
          ],
          answer: '$x = -\\frac{3}{2}$ and $x = \\frac{1}{3}$.',
        },
        {
          q: 'Two pipes together fill a vat in 2 hours; one alone takes 3 hours longer than the other. Find each pipe’s solo time. (This is 8.3’s debt, now paid.)',
          solution: [
            'Let the faster pipe take $x$ hours; the slower takes $x + 3$. The rates add: $\\frac{1}{x} + \\frac{1}{x+3} = \\frac{1}{2}$.',
            'Clear the denominators (bill $x \\neq 0$, $-3$): $x(x + 3) = 2(x + 3) + 2x$, which collects to $x^2 - x - 6 = 0$ — the QUADRATIC 8.3 promised.',
            'This chapter’s pipeline: $(x - 3)(x + 2) = 0$, doors $x = 3$ and $x = -2$.',
            'The bill refuses neither; the habitat (a filling time is positive) refuses $-2$. Check $x = 3$: $\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}$ — TRUE in the original.',
          ],
          answer: 'The pipes take 3 hours and 6 hours solo.',
        },
        {
          q: 'Find $k$ so that $x^2 + kx + 9 = 0$ has a repeated root, and state the root.',
          solution: [
            'A repeated root means a perfect square: $(x \\pm 3)^2$, because the constant $9 = 3^2$.',
            'Expand: $(x - 3)^2 = x^2 - 6x + 9$, so $k = -6$ with root $3$; the mirror $(x + 3)^2 = x^2 + 6x + 9$ gives $k = 6$ with root $-3$.',
            'Both signs work — the square does not care which door the sign picks.',
          ],
          answer: '$k = -6$ (root 3) or $k = 6$ (root −3).',
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'Solve $(x - 1)(x + 2) = 4$. (Two wrong doors are waiting.)',
          solution: [
            'Resist the reflex: the right side is $4$, not $0$ — the zero-product gate does NOT open here ($x = 1$ and $x = -2$ make the left side $0 \\neq 4$).',
            'Expand: $x^2 + x - 2 = 4$; standard form: $x^2 + x - 6 = 0$.',
            'Factor: $(x + 3)(x - 2) = 0$; the gate gives $x = -3$ and $x = 2$.',
            'Check in the ORIGINAL: $(-4)(-1) = 4$ and $(1)(4) = 4$ — both true.',
          ],
          answer: '$x = -3$ and $x = 2$ — after expanding, never before.',
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'Two numbers differ by 3 and their product is 10. Find BOTH monic quadratics having such a pair as roots.',
          solution: [
            'Let the smaller root be $t$, the larger $t + 3$. The product: $t(t + 3) = 10$.',
            'Standard form: $t^2 + 3t - 10 = 0$; factor $(t + 5)(t - 2) = 0$; so $t = 2$ or $t = -5$.',
            'Case 1: $t = 2$ gives the pair $\\{2, 5\\}$ — sum $7$, product $10$ — so $x^2 - 7x + 10 = 0$.',
            'Case 2: $t = -5$ gives the pair $\\{-5, -2\\}$ — sum $-7$, product $10$ — so $x^2 + 7x + 10 = 0$.',
            'Both certified by expansion: $(x - 2)(x - 5) = x^2 - 7x + 10$ and $(x + 2)(x + 5) = x^2 + 7x + 10$.',
          ],
          answer: '$x^2 - 7x + 10$ (roots 2, 5) and $x^2 + 7x + 10$ (roots −5, −2).',
        },
      ] },
    ] },
  ],
}


/* ------------------------------------------------------------------ */
/* Figure 3 (9.2): the completing-the-square pipeline. Header          */
/* (30,18,660,44); stations (30,96,150,150), (200,96,150,150),         */
/* (370,96,150,150), (540,96,150,150); chips (30,266,150,26),          */
/* (200,266,150,26), (370,266,150,26), (540,266,150,26); caption band  */
/* (30,304,660,24). Geometry pinned in verify-book3-ch09.ts section E. */
/* ------------------------------------------------------------------ */

function squarePipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The completing-the-square pipeline: make it monic, move the constant, complete with (b/2)², open the ± doors — with the worked strip 2x² − 4x − 3 = 0 landing at x = 1 ± √(5/2)">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the completing-the-square pipeline — four moves to (x + h)² = k</text>')
  // ---- station 1: MAKE IT MONIC ----
  parts.push('<rect x="30" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="105" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">1 · MAKE IT MONIC</text>')
  parts.push('<text x="105" y="142" font-size="10" fill="#65a30d" text-anchor="middle">divide by a — lawful</text>')
  parts.push('<text x="105" y="158" font-size="10" fill="#65a30d" text-anchor="middle">because a ≠ 0 is the</text>')
  parts.push('<text x="105" y="174" font-size="10" fill="#65a30d" text-anchor="middle">defining clause;</text>')
  parts.push('<text x="105" y="190" font-size="10" fill="#65a30d" text-anchor="middle">the solution set is</text>')
  parts.push('<text x="105" y="206" font-size="10" fill="#65a30d" text-anchor="middle">unchanged pointwise</text>')
  parts.push('<text x="105" y="222" font-size="10" fill="#65a30d" text-anchor="middle">(verifier-priced)</text>')
  // ---- station 2: MOVE ----
  parts.push('<rect x="200" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="275" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">2 · MOVE</text>')
  parts.push('<text x="275" y="142" font-size="10" fill="#65a30d" text-anchor="middle">constant to the right</text>')
  parts.push('<text x="275" y="158" font-size="10" fill="#65a30d" text-anchor="middle">by the balance law:</text>')
  parts.push('<text x="275" y="174" font-size="10" fill="#65a30d" text-anchor="middle">x² + px = −q</text>')
  parts.push('<text x="275" y="190" font-size="10" fill="#65a30d" text-anchor="middle">the square will read</text>')
  parts.push('<text x="275" y="206" font-size="10" fill="#65a30d" text-anchor="middle">−q + (p/2)²</text>')
  parts.push('<text x="275" y="222" font-size="10" fill="#65a30d" text-anchor="middle">when completed</text>')
  // ---- station 3: COMPLETE ----
  parts.push('<rect x="370" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="445" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">3 · COMPLETE</text>')
  parts.push('<text x="445" y="142" font-size="10" fill="#65a30d" text-anchor="middle">add (p/2)² to BOTH</text>')
  parts.push('<text x="445" y="158" font-size="10" fill="#65a30d" text-anchor="middle">sides — the added</text>')
  parts.push('<text x="445" y="174" font-size="10" fill="#65a30d" text-anchor="middle">constant of the</text>')
  parts.push('<text x="445" y="190" font-size="10" fill="#65a30d" text-anchor="middle">identity; the left</text>')
  parts.push('<text x="445" y="206" font-size="10" fill="#65a30d" text-anchor="middle">side folds into</text>')
  parts.push('<text x="445" y="222" font-size="10" fill="#65a30d" text-anchor="middle">one exact square</text>')
  // ---- station 4: DOORS ----
  parts.push('<rect x="540" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="615" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">4 · DOORS</text>')
  parts.push('<text x="615" y="142" font-size="10" fill="#65a30d" text-anchor="middle">k &gt; 0: x = −p/2 ± √k</text>')
  parts.push('<text x="615" y="158" font-size="10" fill="#65a30d" text-anchor="middle">k = 0: one, twice</text>')
  parts.push('<text x="615" y="174" font-size="10" fill="#65a30d" text-anchor="middle">k &lt; 0: no real root</text>')
  parts.push('<text x="615" y="190" font-size="10" fill="#65a30d" text-anchor="middle">the square verdict</text>')
  parts.push('<text x="615" y="206" font-size="10" fill="#65a30d" text-anchor="middle">reads the answer</text>')
  parts.push('<text x="615" y="222" font-size="10" fill="#65a30d" text-anchor="middle">off the sign of k</text>')
  // ---- connectors ----
  parts.push('<line x1="180" y1="171" x2="200" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="350" y1="171" x2="370" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="520" y1="171" x2="540" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  // ---- chips ----
  parts.push('<rect x="30" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="105" y="283" font-size="10.5" fill="#166534" text-anchor="middle">2x² − 4x − 3 = 0</text>')
  parts.push('<rect x="200" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="275" y="283" font-size="10.5" fill="#166534" text-anchor="middle">x² − 2x = 3/2</text>')
  parts.push('<rect x="370" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="445" y="283" font-size="10.5" fill="#166534" text-anchor="middle">(x − 1)² = 5/2</text>')
  parts.push('<rect x="540" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="615" y="283" font-size="10.5" fill="#166534" text-anchor="middle">x = 1 ± √(5/2)</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">MONIC → MOVE → COMPLETE → DOORS. The running example 2x² − 4x − 3 = 0 lands at x = 1 ± √(5/2); k = 5/2 &gt; 0, two real doors.</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (9.2): the geometric completion — the missing corner.      */
/* Header (30,18,660,44); the x² square (80,110,170,170); the x·(a/2)  */
/* right strip (250,110,64,170); the x·(a/2) bottom strip              */
/* (80,280,170,64); the (a/2)² corner (250,280,64,64) dashed; the      */
/* result panel (350,110,340,234); caption band (30,364,660,24).       */
/* Geometry pinned in verify-book3-ch09.ts section E (plan92Fig2).     */
/* ------------------------------------------------------------------ */

function geometricCompletionSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The geometric completion: the x² square gains two x·(a/2) strips and the (a/2)² corner completes the literal square (x + a/2)² — priced at x = 5, a = 6: 25 + 30 + 9 = 64 = 8²">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">completing the square — literally: the missing corner</text>')
  // ---- the x² square ----
  parts.push('<rect x="80" y="110" width="170" height="170" fill="#fef3c7" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="165" y="200" font-size="16" fill="#166534" text-anchor="middle" font-weight="700">x²</text>')
  // ---- the right strip ----
  parts.push('<rect x="250" y="110" width="64" height="170" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="282" y="200" font-size="11" fill="#166534" text-anchor="middle" font-weight="700">x · a/2</text>')
  // ---- the bottom strip ----
  parts.push('<rect x="80" y="280" width="170" height="64" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="165" y="317" font-size="11" fill="#166534" text-anchor="middle" font-weight="700">x · a/2</text>')
  // ---- the corner, dashed: the piece to add ----
  parts.push('<rect x="250" y="280" width="64" height="64" fill="none" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="6 4"/>')
  parts.push('<text x="282" y="317" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">(a/2)²</text>')
  // ---- side dimension labels ----
  parts.push('<text x="165" y="102" font-size="11" fill="#d97706" text-anchor="middle">x</text>')
  parts.push('<text x="282" y="102" font-size="11" fill="#d97706" text-anchor="middle">a/2</text>')
  parts.push('<text x="70" y="360" font-size="11" fill="#d97706" text-anchor="middle">x</text>')
  // ---- result panel ----
  parts.push('<rect x="350" y="110" width="340" height="234" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="520" y="140" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">the completed square</text>')
  parts.push('<text x="520" y="168" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">x² + ax + (a/2)² = (x + a/2)²</text>')
  parts.push('<text x="520" y="196" font-size="10.5" fill="#65a30d" text-anchor="middle">the added constant (a/2)² is the corner —</text>')
  parts.push('<text x="520" y="214" font-size="10.5" fill="#65a30d" text-anchor="middle">without it the square is missing exactly one piece</text>')
  parts.push('<text x="520" y="248" font-size="11" fill="#166534" text-anchor="middle" font-weight="700">worked at x = 5, a = 6:</text>')
  parts.push('<text x="520" y="270" font-size="11" fill="#65a30d" text-anchor="middle">25 + 30 + 9 = 64 = 8²</text>')
  parts.push('<text x="520" y="292" font-size="10.5" fill="#65a30d" text-anchor="middle">each strip 5·3 = 15, the corner 3² = 9,</text>')
  parts.push('<text x="520" y="310" font-size="10.5" fill="#65a30d" text-anchor="middle">and (5 + 3)² = 64 — the identity priced</text>')
  parts.push('<text x="520" y="336" font-size="10.5" fill="#0f766e" text-anchor="middle">al-Khwarizmi completed this square</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="364" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="380" font-size="11" fill="#166534" text-anchor="middle">the x² square gains two x·(a/2) strips and the dashed (a/2)² corner — the literal square that the method completes, priced at x = 5, a = 6.</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson92: Lesson = {
  id: 'al-completing-the-square-derived',
  number: '9.2',
  title: 'Completing the Square, Derived',
  concepts: [
    'the completion identity',
    'the added constant (b/2)²',
    'the square verdict: u² = k solvable iff k ≥ 0',
    'the ± doors of the square root',
    'the monic division (a ≠ 0)',
    'irrational roots as answers',
    'the repeated-root collapse',
    'al-Khwarizmi’s geometric completion',
  ],
  objectives: [
    'state and prove the completion identity (x + h)² = x² + 2hx + h² and read off the added constant (b/2)² for any monic quadratic',
    'decompose any monic quadratic as (x + b/2)² + (c − b²/4) and track the added constant honestly',
    'prove and apply the square verdict — u² = k has real solutions exactly when k ≥ 0 — with the ± doors and the k = 0 collapse',
    'run the four-station completing-the-square pipeline on any quadratic, monic or not, deriving each move rather than reciting it',
    'accept irrational roots as full answers — 1 ± √2 — and read the none-real verdict straight off a negative k',
    'connect the method to its geometric origin: the (a/2)² corner that literally completes the square',
  ],
  prerequisites: ['al-quadratics-and-factoring-solutions', 'al-factoring-quadratic-trinomials', 'al-solving-linear-equations', 'ans-the-diagonal-that-broke-the-rationals'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Lesson 9.1 ended on an honest limit: $x^2 - 4x + 1 = 0$ has real roots — the verifier certified them as $2 \\pm \\sqrt{3}$ — but no factorization over the integers will ever find them. Factoring solves the quadratics whose roots are polite; the rest of the family needs a method that works on EVERYONE. This lesson derives that method. It is built on one identity — the oldest, most reused identity in algebra — and the derivation runs the identity in reverse: instead of expanding a square to get a quadratic, we shape a quadratic into a square. The method’s name, COMPLETING THE SQUARE, is not a metaphor: in its original geometric form, a literal square was missing a literal corner, and the method adds it back. Both halves of that sentence get proved and priced below.' },
    { kind: 'para', text: 'The chapter’s arc makes the payoff visible. This lesson derives the method and runs it on concrete equations — including the moment when $\\sqrt{2}$, the number that broke the rationals in ANS chapter 8, finally becomes an ANSWER rather than an exile. Lesson 9.3 runs the same pipeline on general coefficients and PROVES the quadratic formula, with the discriminant reading the verdict off the coefficients. Lesson 9.4 reads roots and coefficients off each other. Every step of this lesson is exact: the verifier recomputed the identity, the inventory, and every root — rational and irrational — before a word of prose existed.' },
    { kind: 'heading', text: 'The Identity That Does the Work' },
    { kind: 'equation', latex: '(x + h)^2 = x^2 + 2 h x + h^2', note: 'the completion identity — exact for every x and every h, a polynomial identity, not a trick' },
    { kind: 'para', text: 'The identity is chapter 4’s square-of-a-sum, read from the other end. Expanded left to right it is routine; the METHOD reads it right to left: any quadratic $x^2 + bx + \\ldots$ can contribute two of the three pieces on the right — $2h = b$ and the square’s leading term — and then OWNS the third piece, $h^2 = \\left(\\frac{b}{2}\\right)^2$, the ADDED CONSTANT. The verifier certified the identity as an exact polynomial equality for six designed values of $h$, including the halves: for $h = \\frac{1}{2}$, $(x + \\frac{1}{2})^2 = x^2 + x + \\frac{1}{4}$, the case that handles $b = 1$. For any monic quadratic $x^2 + bx$, the number to add is always $\\left(\\frac{b}{2}\\right)^2$ — half the middle coefficient, squared.' },
    { kind: 'list', marker: 'roman', items: [
      '$x^2 + 4x$: half of $4$ is $2$, so add $2^2 = 4$ — and indeed $(x + 2)^2 = x^2 + 4x + 4$',
      '$x^2 + 6x$: add $3^2 = 9$; $(x + 3)^2 = x^2 + 6x + 9$',
      '$x^2 - 8x$: half of $-8$ is $-4$, so add $(-4)^2 = 16$; $(x - 4)^2 = x^2 - 8x + 16$',
      '$x^2 + 10x$: add $5^2 = 25$; $(x + 5)^2 = x^2 + 10x + 25$',
      '$x^2 + x$: add $\\left(\\frac{1}{2}\\right)^2 = \\frac{1}{4}$; $(x + \\frac{1}{2})^2 = x^2 + x + \\frac{1}{4}$ — the fraction case, exact',
    ] },
    { kind: 'callout', tone: 'definition', title: 'Definition — completing the square', text: 'To COMPLETE THE SQUARE in a monic quadratic $x^2 + bx + c$ is to add the constant $\\left(\\frac{b}{2}\\right)^2$, so that $x^2 + bx + \\left(\\frac{b}{2}\\right)^2 = \\left(x + \\frac{b}{2}\\right)^2$ becomes an exact square. Thus, $x^2 + 6x + 9 = (x + 3)^2$ is already complete, while $x^2 + 6x$ completes by adding $9$. On an equation, the addition happens on BOTH sides — the balance law of 5.1 keeps it lawful.' },
    { kind: 'heading', text: 'The Constant Inventory' },
    { kind: 'para', text: 'A full quadratic $x^2 + bx + c$ usually does not WANT the added constant — its own constant $c$ is rarely $\\left(\\frac{b}{2}\\right)^2$. The honest bookkeeping is an inventory: add $\\left(\\frac{b}{2}\\right)^2$ and subtract it again in the same breath, leaving a decomposed form $\\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$ whose remainder $c - \\frac{b^2}{4}$ carries everything the square could not absorb. The verifier certified the decomposition as an exact polynomial identity for six designed exhibits, and the ledger below is its readout.' },
    { kind: 'derivation', title: 'Theorem — the completion decomposition', statement: 'For every monic quadratic: $\\;x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$.', steps: [
      { label: 'Expand the square', formula: '\\left(x + \\tfrac{b}{2}\\right)^2 = x^2 + 2 \\cdot \\tfrac{b}{2} x + \\left(\\tfrac{b}{2}\\right)^2 = x^2 + bx + \\tfrac{b^2}{4}', explanation: 'the completion identity with $h = \\frac{b}{2}$ — the middle coefficient lands exactly, which is the whole design of the method.' },
      { label: 'Add the remainder', formula: '\\left(x + \\tfrac{b}{2}\\right)^2 + \\left(c - \\tfrac{b^2}{4}\\right) = x^2 + bx + \\tfrac{b^2}{4} + c - \\tfrac{b^2}{4}', explanation: 'the added and subtracted $\\frac{b^2}{4}$ cancel: the inventory is honest, nothing is created or destroyed.' },
      { label: 'Collect', formula: '= x^2 + bx + c', explanation: 'the decomposition holds as a polynomial identity — for every $x$, not just at roots. The verifier certified it coefficient by coefficient on all six exhibits.' },
    ], result: 'Every monic quadratic is (a perfect square) + (a constant): $x^2 + bx + c = \\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$ — the square absorbs $x^2$ and $bx$ completely, and the remainder $c - \\frac{b^2}{4}$ is the honest leftover.' },
    { kind: 'table', caption: 'The constant inventory, priced by the verifier: the square absorbs x² and bx; the remainder carries the rest', head: ['Quadratic', 'The square', 'Added then removed', 'Remainder $c - \\frac{b^2}{4}$'], rows: [
      ['$x^2 + 6x + 5$', '$(x + 3)^2$', '$9$', '$5 - 9 = -4$'],
      ['$x^2 - 4x + 1$', '$(x - 2)^2$', '$4$', '$1 - 4 = -3$'],
      ['$x^2 + x + 1$', '$(x + \\frac{1}{2})^2$', '$\\frac{1}{4}$', '$1 - \\frac{1}{4} = \\frac{3}{4}$'],
      ['$x^2 - 6x + 9$', '$(x - 3)^2$', '$9$', '$9 - 9 = 0$ — already a square'],
      ['$x^2 + 2x - 5$', '$(x + 1)^2$', '$1$', '$-5 - 1 = -6$'],
      ['$x^2 - 4x - 5$', '$(x - 2)^2$', '$4$', '$-5 - 4 = -9$'],
    ] },
    { kind: 'heading', text: 'The Square Verdict' },
    { kind: 'para', text: 'Completing the square on an EQUATION concentrates the entire problem into one shape: a square equals a constant, $u^2 = k$. Everything now depends on one verdict, and the verdict is the oldest piece of arithmetic in the book: a SQUARE is never negative. The verifier priced it across the census — $u^2 \\geq 0$ at every point, with equality only at $u = 0$. So $u^2 = k$ is solvable over the reals exactly when $k \\geq 0$: for $k < 0$ the solution set is EMPTY (the verifier certified $u^2 = -\\frac{9}{4}$ refuses every window point, and the identity lifts the refusal everywhere); for $k = 0$ the two doors of $\\pm$ collapse onto the single root $u = 0$; and for $k > 0$ there are exactly two solutions, $u = \\pm\\sqrt{k}$ — the pair whose existence is certified by the zero-product law of 9.1 returning: $u^2 - k = (u - \\sqrt{k})(u + \\sqrt{k})$, a product of two linear factors with the two doors built in.' },
    { kind: 'equation', latex: 'u^2 = k \\;\\iff\\; u = \\pm\\sqrt{k} \\quad (k > 0), \\qquad u^2 = 0 \\iff u = 0, \\qquad u^2 = k,\\; k < 0: \\text{ no real solution}', note: 'the square verdict — the sign of k IS the answer; the verifier priced all three branches exactly' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the square root opens TWO doors, and only when k ≥ 0', text: 'The move $u^2 = k \\Rightarrow u = \\pm\\sqrt{k}$ is lawful only for $k \\geq 0$, and the $\\pm$ is not decoration: $u^2 = 16$ gives $u = 4$ AND $u = -4$ — dropping $-4$ is 9.1’s "half a verdict" again. Conversely, $u^2 = -9$ has NO real solution — not $\\pm 3$, not $-3$: the verifier priced $(\\pm 3)^2 = 9$, never $-9$. And when $k = 0$, the two doors land on the same number: $u^2 = 0$ has the single root $u = 0$, counted twice — the repeated-root collapse of 9.1, now derived instead of observed.' },
    { kind: 'heading', text: 'The Pipeline, Derived' },
    { kind: 'para', text: 'The full method is a four-station pipeline, and every station is a theorem already banked. STATION ONE, MAKE IT MONIC: if the leading coefficient is $a \\neq 1$, divide the whole equation by $a$ — lawful because $a \\neq 0$ is the DEFINING clause of a quadratic (9.1), and the verifier priced the division’s honesty pointwise: $2x^2 - 4x - 3 = 0$ and $x^2 - 2x - \\frac{3}{2} = 0$ hold at exactly the same census points. STATION TWO, MOVE: shift the constant to the right side by the balance law. STATION THREE, COMPLETE: add $\\left(\\frac{p}{2}\\right)^2$ (now $p$ is the middle coefficient of the monic form) to BOTH sides — the balance law again — and fold the left side into one exact square. STATION FOUR, DOORS: apply the square verdict, and read the answer off the sign of what stands on the right.' },
    { kind: 'figure', caption: 'The completing-the-square pipeline: make it monic, move the constant right, add (p/2)² to both sides and fold, then read the ± doors off the sign of k. The worked strip runs 2x² − 4x − 3 = 0 to x = 1 ± √(5/2).', svg: squarePipelineSvg() },
    { kind: 'example', title: 'Solve x² + 6x − 7 = 0 by completing the square', steps: [
      'Already monic. Move: $x^2 + 6x = 7$.',
      'Complete: half of $6$ is $3$, add $9$ to both sides: $x^2 + 6x + 9 = 16$.',
      'Fold: $(x + 3)^2 = 16$ — the inventory read: $7 + 9 = 16$, certified.',
      'Doors: $k = 16 > 0$, so $x + 3 = \\pm 4$; hence $x = 1$ or $x = -7$. Check: $1 + 6 - 7 = 0$ and $49 - 42 - 7 = 0$.',
      'Hence x = 1 and x = −7.',
    ] },
    { kind: 'example', title: 'Solve x² − 2x − 1 = 0 by completing the square', steps: [
      'Monic. Move: $x^2 - 2x = 1$.',
      'Complete: half of $-2$ is $-1$, add $1$ to both sides: $x^2 - 2x + 1 = 2$.',
      'Fold: $(x - 1)^2 = 2$ — the exact inventory: $1 + 1 = 2$.',
      'Doors: $k = 2 > 0$, so $x - 1 = \\pm\\sqrt{2}$; hence $x = 1 \\pm \\sqrt{2}$. The verifier certified both roots exactly in $\\mathbb{Q}(\\sqrt{2})$: $(1 + \\sqrt{2})^2 - 2(1 + \\sqrt{2}) - 1 = 0$.',
      'Hence x = 1 ± √2.',
    ] },
    { kind: 'para', text: 'Pause on what just happened, because it is the quiet climax of eight chapters. The equation $x^2 - 2x - 1 = 0$ has no integer root and no rational root — no factoring in any fraction world will ever find its solutions. And yet the solutions EXIST, exactly: $x = 1 \\pm \\sqrt{2}$. Arithmetic and Number Systems chapter 8 proved that $\\sqrt{2}$ is irrational — the diagonal that broke the rationals, exiled from every fraction field. Here the exile ends: $\\sqrt{2}$ is not an approximation to be tolerated but an ANSWER to be written, the exact coordinate of a root. Completing the square is the machine that manufactures such answers on demand — and lesson 9.3 will show it manufactures one for EVERY quadratic.' },
    { kind: 'example', title: 'Solve x² + x + 1 = 0 by completing the square', steps: [
      'Monic. Move: $x^2 + x = -1$.',
      'Complete: half of $1$ is $\\frac{1}{2}$, add $\\frac{1}{4}$ to both sides: $x^2 + x + \\frac{1}{4} = -1 + \\frac{1}{4} = -\\frac{3}{4}$.',
      'Fold: $(x + \\frac{1}{2})^2 = -\\frac{3}{4}$ — certified exact.',
      'Verdict: $k = -\\frac{3}{4} < 0$ — a square can never equal a negative number. The equation has NO real root; 9.1’s honest limit is now a derived verdict, not an observation.',
      'Hence No real solutions — the completed square reads −3/4, and squares refuse to be negative.',
    ] },
    { kind: 'example', title: 'Solve x² − 6x + 9 = 0 by completing the square', steps: [
      'Monic — and already a perfect square: the inventory reads $9 - 9 = 0$.',
      'Move and complete: $x^2 - 6x = -9$; add $9$: $x^2 - 6x + 9 = 0$.',
      'Fold: $(x - 3)^2 = 0$ — k = 0 exactly.',
      'Verdict: the ± doors collapse onto one root: $x = 3$, counted twice. The repeated root of 9.1, now derived from the collapse.',
      'Hence x = 3, a repeated root (counted twice).',
    ] },
    { kind: 'para', text: 'The non-monic case adds one move at the front, and the move is licensed by 9.1’s defining clause. To solve $2x^2 - 4x - 3 = 0$, divide EVERYTHING by $2$ — the coefficient, the middle term, the constant — reaching $x^2 - 2x - \\frac{3}{2} = 0$. The division preserves the solution set exactly (the verifier priced it pointwise on the census: two polynomials related by a nonzero constant factor vanish together), and the monic form is what the completion identity consumes. Fractions in the constants are not a complication but the method working: the pipeline absorbs them without ceremony.' },
    { kind: 'example', title: 'Solve 2x² − 4x − 3 = 0 by completing the square', steps: [
      'Make it monic: divide by $2$ — lawful since $a = 2 \\neq 0$: $x^2 - 2x - \\frac{3}{2} = 0$.',
      'Move: $x^2 - 2x = \\frac{3}{2}$.',
      'Complete: add $1$ (half of $-2$ is $-1$): $(x - 1)^2 = \\frac{3}{2} + 1 = \\frac{5}{2}$ — certified exact.',
      'Doors: $k = \\frac{5}{2} > 0$, so $x - 1 = \\pm\\sqrt{\\frac{5}{2}}$; hence $x = 1 \\pm \\sqrt{\\frac{5}{2}} = 1 \\pm \\frac{\\sqrt{10}}{2}$ — the verifier certified both in $\\mathbb{Q}(\\sqrt{10})$.',
      'Hence x = 1 ± √(5/2), i.e. x = 1 ± √10/2.',
    ] },
    { kind: 'example', title: 'Solve 3x² + 6x − 1 = 0 by completing the square', steps: [
      'Make it monic: divide by $3$: $x^2 + 2x - \\frac{1}{3} = 0$.',
      'Move: $x^2 + 2x = \\frac{1}{3}$.',
      'Complete: add $1$ (half of $2$ is $1$): $(x + 1)^2 = \\frac{1}{3} + 1 = \\frac{4}{3}$.',
      'Doors: $x + 1 = \\pm\\sqrt{\\frac{4}{3}} = \\pm\\frac{2\\sqrt{3}}{3}$; hence $x = -1 \\pm \\frac{2\\sqrt{3}}{3}$. The verifier certified both exactly in $\\mathbb{Q}(\\sqrt{3})$.',
      'Hence x = −1 ± 2√3/3.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Insight — the method that reveals factorizations', text: 'Here is the quiet superpower: completing the square works EVEN WHEN the roots are rational, and in doing so it can REVEAL a factorization the integer scan missed. The equation $x^2 + x - \\frac{3}{4} = 0$ completes to $(x + \\frac{1}{2})^2 = 1$, giving $x = \\frac{1}{2}$ and $x = -\\frac{3}{2}$ — rational roots, certified exact. Multiply back by $4$: $4x^2 + 4x - 3 = (2x - 1)(2x + 3)$, the verifier-certified factorization that 9.1’s integer cross-method could never see (its leading coefficient is a product, its constant a product, but the integers never line up). The square is the deeper object; factoring is sometimes its shadow. The same reading of the completed form — vertex at $x = -\\frac{b}{2}$ — becomes the graph of chapter 10.' },
    { kind: 'para', text: 'It is worth standing back and seeing WHY the pipeline is complete — why no quadratic can escape it. After the monic division and the completion, every equation of the chapter has been funneled into the single shape $(x + h)^2 = k$, and the square verdict splits the world into exactly three cases: $k > 0$ (two real doors), $k = 0$ (one door, repeated), $k < 0$ (no real door). There is no fourth case — a real number is positive, zero, or negative — so the method either SOLVES the equation or PROVES that no real solution exists. The method never stalls, never needs luck, never depends on spotting a clever factorization. What it cannot do is make the roots rational: when $k$ is not a perfect square, the doors open onto irrationals, and the honest answer is written with a square root. Completeness up to the square-root notation — that is the precise promise, and lesson 9.3 will compress the whole pipeline into one formula whose insides are exactly this $k$.' },
    { kind: 'para', text: 'The monic division deserves its own caution, because it is the pipeline’s one move that touches the COEFFICIENTS rather than the unknown. Dividing $2x^2 - 4x - 3 = 0$ by $2$ changes the equation into a different-looking one — different coefficients, different constants, different completed form — yet the SOLUTION SET is untouched, and the verifier priced that claim the only way it can be priced: pointwise, at every census point, $2x^2 - 4x - 3$ and $x^2 - 2x - \\frac{3}{2}$ vanished together. The licence is precisely $a \\neq 0$ — divide by the leading coefficient only because the definition of a quadratic guarantees it is not zero. Dividing by $x$ (9.1’s forbidden divide) touched the unknown and lost a root; dividing by $a$ touches the coefficients and loses nothing. The distinction is worth memorizing: coefficient moves are safe when the clause guarantees the divisor; unknown moves need the zero-product discipline. And the reorder matters — station one is division BECAUSE the completion identity only consumes monic input; run it on $2x^2 - 4x$ directly and the half of $-4$ is $-2$, the square absorbs $x^2 - 4x$ correctly, but the leading $2$ never folds and the pipeline stalls at station three.' },
    { kind: 'heading', text: 'The Word Problem and the Formula Seed' },
    { kind: 'para', text: 'The method’s field test is a problem whose equation has no factoring. A rectangle’s width is $w$; its length exceeds the width by $4$; its area is $30$. The equation: $w(w + 4) = 30$, so $w^2 + 4w - 30 = 0$. The integer scan finds nothing (product $-30$, sums $\\pm 1, \\pm 2, \\pm 3, \\pm 5, \\pm 6, \\pm 10, \\pm 15, \\pm 30$ — none hits $4$). Completing the square: $(w + 2)^2 = 34$, so $w = -2 \\pm \\sqrt{34}$. The verifier certified both roots exactly in $\\mathbb{Q}(\\sqrt{34})$ — the negative one genuinely solves the EQUATION, but the habitat (a width is positive) keeps $w = -2 + \\sqrt{34}$, which the verifier’s scaled-integer square roots place honestly between $3.83$ and $3.831$ (since $5.830^2 < 34 < 5.831^2$). Irrational answers to word problems are not failures of the method; they are the method telling the truth about the world.' },
    { kind: 'example', title: 'A rectangle’s width is 4 less than its length; its area is 30. Find its width exactly.', steps: [
      'Let the width be $w$; the length is $w + 4$. The area: $w(w + 4) = 30$.',
      'Standard form: $w^2 + 4w - 30 = 0$; the integer scan refuses (no pair multiplies to $-30$ and sums to $4$).',
      'Complete: $(w + 2)^2 = 30 + 4 = 34$ — certified exact.',
      'Doors: $w = -2 \\pm \\sqrt{34}$; the habitat (width $> 0$) keeps $w = -2 + \\sqrt{34} \\approx 3.83$.',
      'Check exactly: the verifier priced $(-2 + \\sqrt{34})(2 + \\sqrt{34}) = -4 + 34 = 30$ in $\\mathbb{Q}(\\sqrt{34})$ — the area identity holds at the solution.',
      'Hence w = −2 + √34 (≈ 3.83), the exact width.',
    ] },
    { kind: 'para', text: 'The pipeline also compresses into a formula the moment one runs it on symbols. For a MONIC quadratic $x^2 + bx + c = 0$: move ($x^2 + bx = -c$), complete (add $\\frac{b^2}{4}$): $\\left(x + \\frac{b}{2}\\right)^2 = \\frac{b^2}{4} - c$, doors: $x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$. The verifier certified the compression and its use: for $x^2 + 10x + 9 = 0$ it reads $x = -5 \\pm \\sqrt{25 - 9} = -5 \\pm 4$, giving $\\{-1, -9\\}$ — and indeed $(x + 1)(x + 9) = x^2 + 10x + 9$. This is the SEED of lesson 9.3: run the same four moves on $ax^2 + bx + c = 0$ without dividing first, and the general quadratic formula comes out, discriminant and all.' },
    { kind: 'figure', caption: 'The geometric completion: the x² square gains two x·(a/2) strips; the dashed (a/2)² corner is the added constant that completes the literal square (x + a/2)². Priced at x = 5, a = 6: 25 + 30 + 9 = 64 = 8².', svg: geometricCompletionSvg() },
    { kind: 'para', text: 'The figure is the method’s birth certificate. The big square is $x^2$; the two strips are each $x \\cdot \\frac{a}{2}$; what is missing to make the whole $\\left(x + \\frac{a}{2}\\right)^2$ is exactly the corner $\\left(\\frac{a}{2}\\right)^2$ — the added constant, drawn to scale. At the figure’s values $x = 5$, $a = 6$: the square is $25$, the two strips are $15$ each, the corner is $9$, and the completed square is $8^2 = 64$ — the verifier priced every number. In this form the method was stated by al-Khwarizmi in the ninth century, whose algebra manual completed literal squares with literal geometry; the word ALGORITHM descends from his name, and the equation-manipulation half of this lesson is his al-jabr — the restoring — at work.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'The completion identity $(x + h)^2 = x^2 + 2hx + h^2$ is exact; for $x^2 + bx$ the added constant is $\\left(\\frac{b}{2}\\right)^2$.',
      'Every monic quadratic decomposes as $\\left(x + \\frac{b}{2}\\right)^2 + \\left(c - \\frac{b^2}{4}\\right)$ — the square absorbs the first two terms; the remainder is the honest leftover.',
      'The square verdict: $u^2 = k$ has real solutions iff $k \\geq 0$ — two doors $\\pm\\sqrt{k}$ for $k > 0$, the collapse at $k = 0$, the empty set for $k < 0$.',
      'The pipeline: make monic (divide by $a \\neq 0$), move, complete on both sides, read the doors — every move a banked theorem.',
      'Irrational roots are answers ($1 \\pm \\sqrt{2}$); a negative $k$ is a verdict (no real root); and the monic compression $x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$ is the seed of 9.3’s formula.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the literal square', text: 'Muhammad ibn Musa al-Khwarizmi’s al-Kitab al-mukhtasar fi hisab al-jabr wal-muqabala (c. 825) solved quadratics by drawing the square and its missing corner: to complete $x^2 + 10x$ (his running shape), add $(10/2)^2 = 25$ and read the side $x + 5$. The method in geometric dress predates him in Babylonian tablets and appears in Chinese and Indian sources; al-Khwarizmi’s book gave the subject its NAME (al-jabr → algebra) and, through the Latin Algoritmi, gave the algorithm its name. The nineteenth-century schoolroom reduced the pictures to the identity this lesson proves — but the corner is still there in every $(b/2)^2$. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope, SSC/bank preliminaries, JEE-Main foundations) drills this lesson’s shapes: (1) "complete the square" items — the added constant $\\left(\\frac{b}{2}\\right)^2$ asked cold ($9$ for $x^2 + 6x$); (2) k-hunts — for which $k$ does $x^2 + kx + 16$ have a repeated root (both $\\pm 8$, since $(k/2)^2 = 16$); (3) speed solves on non-monic equations where the divide-then-complete route beats the factoring hunt ($2x^2 - 4x - 3 = 0$); (4) the none-real verdict read off a negative $k$; (5) word problems whose exact answer is irrational — the width $-2 + \\sqrt{34}$ family — where the habitat picks the root and the decimals are honest. The competitive payoff of this lesson is the monic formula $x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$, which solves a monic quadratic in one line; 9.3 generalizes it.' },
    { kind: 'formula', name: 'The completion identity', latex: '(x + h)^2 = x^2 + 2 h x + h^2', note: 'exact for every h; for x² + bx the added constant is (b/2)² — half the middle coefficient, squared' },
    { kind: 'formula', name: 'The monic compression', latex: 'x^2 + bx + c = 0 \\;\\iff\\; x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}', note: 'the four-move pipeline compressed to one line — the seed of the general quadratic formula in 9.3' },
    { kind: 'formula', name: 'The square verdict', latex: 'u^2 = k \\text{ solvable over } \\mathbb{R} \\iff k \\geq 0', note: 'k > 0: two doors ±√k; k = 0: one root counted twice; k < 0: no real solution — squares refuse to be negative' },
    { kind: 'quiz', title: 'Check yourself', items: [
      {
        q: 'To complete the square on $x^2 + 6x$, the number to add is —',
        options: ['$6$', '$3$', '$9$', '$36$'],
        answer: 2,
        explain: 'The added constant is $\\left(\\frac{b}{2}\\right)^2 = 3^2 = 9$, making $(x + 3)^2 = x^2 + 6x + 9$. Option 1 adds $b$ itself (the expansion carries $2h = 6$, not $h^2 = 6$); option 2 is $\\frac{b}{2}$ without the square; option 4 is $b^2$ — the square of the WHOLE coefficient, the classic overshoot.',
      },
      {
        q: 'The equation $x^2 - 4x + 1 = 0$ becomes, after completing the square,',
        options: ['$(x - 2)^2 = 1$', '$(x - 2)^2 = 3$', '$(x - 4)^2 = 1$', '$(x - 2)^2 = -3$'],
        answer: 1,
        explain: 'Move: $x^2 - 4x = -1$; complete with $4$: $(x - 2)^2 = -1 + 4 = 3$ — the verifier certified the decomposition $x^2 - 4x + 1 = (x - 2)^2 - 3$. Option 1 forgot to move the $+1$ first; option 3 halved wrongly ($b = -4$ halves to $-2$, and the moved constant is $-1$, not the added $4$); option 4 slips the sign ($1 - 4 = -3$ subtracts the wrong way).',
      },
      {
        q: 'The equation $u^2 = -9$ has',
        options: ['no real solution — a square is never negative', '$u = -3$', '$u = 3$', '$u = \\pm 3$'],
        answer: 0,
        explain: 'The square verdict is absolute: $u^2 \\geq 0$ for every real $u$, so a negative $k$ refuses every candidate. Options 2–4 all fail the same way: $(\\pm 3)^2 = 9$, never $-9$ — the verifier priced it. Lesson 9.3 will show the SAME equation gains complex solutions; over the reals the honest entry is the empty set.',
      },
      {
        q: 'After dividing $2x^2 - 4x - 3 = 0$ by 2 and completing the square, the equation reads',
        options: ['$(x - 1)^2 = 3$', '$(x - 2)^2 = \\frac{5}{2}$', '$(x - 1)^2 = \\frac{3}{2}$', '$(x - 1)^2 = \\frac{5}{2}$'],
        answer: 3,
        explain: 'Divide by 2: $x^2 - 2x - \\frac{3}{2} = 0$; move: $x^2 - 2x = \\frac{3}{2}$; complete with $1$: $(x - 1)^2 = \\frac{3}{2} + 1 = \\frac{5}{2}$ — certified exact. Option 1 forgot the $+1$ completion ($3/2$ stayed put); option 2 kept the un-divided middle coefficient ($h = -1$ after the divide, not $-2$); option 3 added nothing.',
      },
      {
        q: 'The equation $x^2 + x + 1 = 0$ has',
        options: ['two real roots', 'one repeated real root', 'no real roots — $(x + \\frac{1}{2})^2 = -\\frac{3}{4}$ is impossible', 'exactly one real root, $x = -\\frac{1}{2}$'],
        answer: 2,
        explain: 'Complete: $(x + \\frac{1}{2})^2 = -1 + \\frac{1}{4} = -\\frac{3}{4} < 0$ — the square verdict answers before any formula: no real roots. Option 4 is the near-miss: $x = -\\frac{1}{2}$ is the VERTEX of the completed form, where the quadratic reads its minimum $\\frac{3}{4} \\neq 0$ — the verifier priced the substitution.',
      },
    ] },
    { kind: 'exercises', title: 'Exercises 9.2', sets: [
      { level: 'L1', questions: [
        {
          q: 'Complete the square: $x^2 + 8x + \\square = (x + 4)^2$. What number belongs in the box?',
          solution: [
            'Half of $8$ is $4$; the added constant is $4^2 = 16$.',
            'Check by expanding: $(x + 4)^2 = x^2 + 8x + 16$ — the box is $16$.',
          ],
          answer: '$16$.',
        },
        {
          q: 'Solve $x^2 - 4x - 5 = 0$ by completing the square.',
          solution: [
            'Move: $x^2 - 4x = 5$.',
            'Complete: add $4$ (half of $-4$ is $-2$): $(x - 2)^2 = 9$.',
            'Doors: $x - 2 = \\pm 3$, so $x = 5$ or $x = -1$. Check: $25 - 20 - 5 = 0$ and $1 + 4 - 5 = 0$.',
          ],
          answer: '$x = 5$ and $x = -1$.',
        },
        {
          q: 'Expand $(x + 3)^2$ and confirm it is the completion of $x^2 + 6x$.',
          solution: [
            'Expand by the identity: $(x + 3)^2 = x^2 + 6x + 9$ — $2h = 6$ and $h^2 = 9$, exactly.',
            'So $x^2 + 6x = (x + 3)^2 - 9$: the added constant was $9$, and removing it leaves the original.',
          ],
          answer: '$x^2 + 6x + 9$; the added constant is 9.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: 'Solve $x^2 + 6x - 7 = 0$ by completing the square.',
          solution: [
            'Move: $x^2 + 6x = 7$; complete: add $9$: $(x + 3)^2 = 16$.',
            'Doors: $x + 3 = \\pm 4$; hence $x = 1$ or $x = -7$.',
            'Check: $1 + 6 - 7 = 0$ and $49 - 42 - 7 = 0$.',
          ],
          answer: '$x = 1$ and $x = -7$.',
        },
        {
          q: 'Solve $x^2 - 2x - 1 = 0$ and state the roots exactly.',
          solution: [
            'Move: $x^2 - 2x = 1$; complete: add $1$: $(x - 1)^2 = 2$.',
            'Doors: $x - 1 = \\pm\\sqrt{2}$; hence $x = 1 \\pm \\sqrt{2}$.',
            'The verifier certified both roots exactly in $\\mathbb{Q}(\\sqrt{2})$ — these are ANSWERS, not approximations.',
          ],
          answer: '$x = 1 \\pm \\sqrt{2}$.',
        },
        {
          q: 'Solve $x^2 + x + 1 = 0$ by completing the square.',
          solution: [
            'Move: $x^2 + x = -1$; complete: add $\\frac{1}{4}$: $(x + \\frac{1}{2})^2 = -\\frac{3}{4}$.',
            'The square verdict: a negative $k$ refuses every real candidate.',
            'Hence the equation has no real root — the none-real verdict, derived.',
          ],
          answer: 'No real solutions.',
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Solve $x^2 - 6x + 9 = 0$ by completing the square and interpret the result.',
          solution: [
            'The inventory reads $9 - 9 = 0$: the quadratic IS a square, $(x - 3)^2$.',
            'Completed form: $(x - 3)^2 = 0$ — $k = 0$ exactly.',
            'The ± doors collapse onto one root: $x = 3$, counted twice — the repeated root of 9.1, derived.',
          ],
          answer: '$x = 3$, a repeated root (counted twice).',
        },
        {
          q: 'Solve $2x^2 - 4x - 3 = 0$ by completing the square.',
          solution: [
            'Make monic: divide by $2$ (lawful, $a \\neq 0$): $x^2 - 2x - \\frac{3}{2} = 0$.',
            'Move and complete: $(x - 1)^2 = \\frac{3}{2} + 1 = \\frac{5}{2}$.',
            'Doors: $x = 1 \\pm \\sqrt{\\frac{5}{2}} = 1 \\pm \\frac{\\sqrt{10}}{2}$ — the verifier certified both in $\\mathbb{Q}(\\sqrt{10})$.',
          ],
          answer: '$x = 1 \\pm \\frac{\\sqrt{10}}{2}$.',
        },
        {
          q: 'Solve $3x^2 + 6x - 1 = 0$ by completing the square.',
          solution: [
            'Make monic: divide by $3$: $x^2 + 2x - \\frac{1}{3} = 0$.',
            'Move and complete: $(x + 1)^2 = \\frac{1}{3} + 1 = \\frac{4}{3}$.',
            'Doors: $x = -1 \\pm \\sqrt{\\frac{4}{3}} = -1 \\pm \\frac{2\\sqrt{3}}{3}$ — certified exactly in $\\mathbb{Q}(\\sqrt{3})$.',
          ],
          answer: '$x = -1 \\pm \\frac{2\\sqrt{3}}{3}$.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Solve $x^2 + 2x - 5 = 0$ by completing the square.',
          solution: [
            'Move: $x^2 + 2x = 5$; complete: add $1$: $(x + 1)^2 = 6$.',
            'Doors: $x = -1 \\pm \\sqrt{6}$ — the verifier certified both exactly in $\\mathbb{Q}(\\sqrt{6})$.',
            'Numerically: $\\sqrt{6} \\approx 2.449$, so the roots are approximately $1.449$ and $-3.449$ — decimals for the eye, exact forms for the record.',
          ],
          answer: '$x = -1 \\pm \\sqrt{6}$.',
        },
        {
          q: 'A rectangle’s width is 4 less than its length; its area is 30. Find the exact width and its decimal (honest to the digits).',
          solution: [
            'Width $w$, length $w + 4$: $w(w + 4) = 30$, so $w^2 + 4w - 30 = 0$.',
            'The integer scan refuses — complete the square: $(w + 2)^2 = 34$.',
            'Doors: $w = -2 \\pm \\sqrt{34}$; the habitat (a positive width) keeps $w = -2 + \\sqrt{34}$.',
            'Honest decimals via scaled integers: $5.830^2 < 34 < 5.831^2$, so $w \\approx 3.831$; check exactly: $(-2 + \\sqrt{34})(2 + \\sqrt{34}) = -4 + 34 = 30$.',
          ],
          answer: '$w = -2 + \\sqrt{34} \\approx 3.83$.',
        },
        {
          q: 'For which values of $k$ does $x^2 + kx + 16 = 0$ have a repeated root?',
          solution: [
            'A repeated root means the completion leaves $k = 0$ on the right: the quadratic must BE a square.',
            'The constant $16 = (\\pm 4)^2$, so $(x - 4)^2 = x^2 - 8x + 16$ and $(x + 4)^2 = x^2 + 8x + 16$.',
            'Hence $k = -8$ (root $4$) or $k = 8$ (root $-4$) — equivalently $(k/2)^2 = 16$.',
          ],
          answer: '$k = 8$ or $k = -8$.',
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'Solve $x^2 + x - \\frac{3}{4} = 0$ by completing the square, then exhibit the factorization the integer scan missed.',
          solution: [
            'Move: $x^2 + x = \\frac{3}{4}$; complete: add $\\frac{1}{4}$: $(x + \\frac{1}{2})^2 = 1$.',
            'Doors: $x + \\frac{1}{2} = \\pm 1$, so $x = \\frac{1}{2}$ or $x = -\\frac{3}{2}$ — rational roots, certified exact.',
            'Multiply back by $4$: $4x^2 + 4x - 3 = (2x - 1)(2x + 3)$ — the verifier-certified factorization whose integer cross-method had no integer handles.',
            'The moral: the square finds the roots FIRST; the factorization is the readout, not the requirement.',
          ],
          answer: '$x = \\frac{1}{2}$ and $x = -\\frac{3}{2}$; the hidden factorization is $(2x - 1)(2x + 3)$.',
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'Derive the monic formula $x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$ for $x^2 + bx + c = 0$, and use it on $x^2 + 10x + 9 = 0$.',
          solution: [
            'Move: $x^2 + bx = -c$; complete: add $\\left(\\frac{b}{2}\\right)^2 = \\frac{b^2}{4}$ to both sides.',
            'Fold: $\\left(x + \\frac{b}{2}\\right)^2 = \\frac{b^2}{4} - c$ — the square verdict takes over.',
            'Doors: $x + \\frac{b}{2} = \\pm\\sqrt{\\frac{b^2}{4} - c}$, hence $x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$ — derived, not memorized.',
            'Apply to $x^2 + 10x + 9$: $x = -5 \\pm \\sqrt{25 - 9} = -5 \\pm 4$, so $x = -1$ or $x = -9$.',
            'Check by expansion: $(x + 1)(x + 9) = x^2 + 10x + 9$ — the formula’s verdict certified.',
          ],
          answer: '$x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$; for $x^2 + 10x + 9$: $x = -1, -9$.',
        },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* Figure 3 (9.3): the formula pipeline — five moves, both doors.      */
/* Header (30,18,660,44); stations (30,96,124,150), (166,96,124,150),  */
/* (302,96,124,150), (438,96,124,150), (574,96,124,150); chips         */
/* (30,266,124,26), (166,266,124,26), (302,266,124,26),                */
/* (438,266,124,26), (574,266,124,26); caption band (30,304,660,24).   */
/* Geometry pinned in verify-book3-ch09.ts plan93Fig1.                 */
/* ------------------------------------------------------------------ */

function formulaPipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The formula pipeline: divide by a, move the constant, complete the square, fold, open both doors — with the worked strip 2x² − 7x + 3 = 0 landing at {1/2, 3}">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the formula pipeline — five moves from ax² + bx + c = 0 to both doors</text>')
  // ---- station 1: DIVIDE ----
  parts.push('<rect x="30" y="96" width="124" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="92" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">1 · DIVIDE</text>')
  parts.push('<text x="92" y="142" font-size="10" fill="#65a30d" text-anchor="middle">by a — lawful since</text>')
  parts.push('<text x="92" y="158" font-size="10" fill="#65a30d" text-anchor="middle">a ≠ 0; the zero set</text>')
  parts.push('<text x="92" y="174" font-size="10" fill="#65a30d" text-anchor="middle">cannot move (the</text>')
  parts.push('<text x="92" y="190" font-size="10" fill="#65a30d" text-anchor="middle">census priced it</text>')
  parts.push('<text x="92" y="206" font-size="10" fill="#65a30d" text-anchor="middle">pointwise)</text>')
  // ---- station 2: MOVE ----
  parts.push('<rect x="166" y="96" width="124" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="228" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">2 · MOVE</text>')
  parts.push('<text x="228" y="142" font-size="10" fill="#65a30d" text-anchor="middle">the constant right —</text>')
  parts.push('<text x="228" y="158" font-size="10" fill="#65a30d" text-anchor="middle">the balance law of</text>')
  parts.push('<text x="228" y="174" font-size="10" fill="#65a30d" text-anchor="middle">5.1, still lawful</text>')
  parts.push('<text x="228" y="190" font-size="10" fill="#65a30d" text-anchor="middle">for letters</text>')
  // ---- station 3: COMPLETE ----
  parts.push('<rect x="302" y="96" width="124" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="364" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">3 · COMPLETE</text>')
  parts.push('<text x="364" y="142" font-size="10" fill="#65a30d" text-anchor="middle">add (b/2a)² — half</text>')
  parts.push('<text x="364" y="158" font-size="10" fill="#65a30d" text-anchor="middle">of b/a, squared:</text>')
  parts.push('<text x="364" y="174" font-size="10" fill="#65a30d" text-anchor="middle">the 9.2 identity</text>')
  parts.push('<text x="364" y="190" font-size="10" fill="#65a30d" text-anchor="middle">in general-a dress</text>')
  // ---- station 4: FOLD ----
  parts.push('<rect x="438" y="96" width="124" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="500" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">4 · FOLD</text>')
  parts.push('<text x="500" y="142" font-size="10" fill="#65a30d" text-anchor="middle">(x + b/2a)² =</text>')
  parts.push('<text x="500" y="158" font-size="10" fill="#65a30d" text-anchor="middle">(b² − 4ac)/4a² —</text>')
  parts.push('<text x="500" y="174" font-size="10" fill="#65a30d" text-anchor="middle">the square verdict</text>')
  parts.push('<text x="500" y="190" font-size="10" fill="#65a30d" text-anchor="middle">reads the right side</text>')
  // ---- station 5: DOORS ----
  parts.push('<rect x="574" y="96" width="124" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="636" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">5 · DOORS</text>')
  parts.push('<text x="636" y="142" font-size="10" fill="#65a30d" text-anchor="middle">x = (−b ± √Δ)/2a —</text>')
  parts.push('<text x="636" y="158" font-size="10" fill="#65a30d" text-anchor="middle">THE formula,</text>')
  parts.push('<text x="636" y="174" font-size="10" fill="#65a30d" text-anchor="middle">derived, not</text>')
  parts.push('<text x="636" y="190" font-size="10" fill="#65a30d" text-anchor="middle">memorized</text>')
  // ---- connectors ----
  parts.push('<line x1="154" y1="171" x2="166" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="290" y1="171" x2="302" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="426" y1="171" x2="438" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="562" y1="171" x2="574" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  // ---- chips (the worked strip 2x² − 7x + 3 = 0) ----
  parts.push('<rect x="30" y="266" width="124" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="92" y="283" font-size="10.5" fill="#166534" text-anchor="middle">2x² − 7x + 3 = 0</text>')
  parts.push('<rect x="166" y="266" width="124" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="228" y="283" font-size="10.5" fill="#166534" text-anchor="middle">x² − 7x/2 + 3/2 = 0</text>')
  parts.push('<rect x="302" y="266" width="124" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="364" y="283" font-size="10.5" fill="#166534" text-anchor="middle">x² − 7x/2 = −3/2</text>')
  parts.push('<rect x="438" y="266" width="124" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="500" y="283" font-size="10.5" fill="#166534" text-anchor="middle">(x − 7/4)² = 25/16</text>')
  parts.push('<rect x="574" y="266" width="124" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="636" y="283" font-size="10" fill="#166534" text-anchor="middle">x = (7 ± 5)/4 → {1/2, 3}</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">DIVIDE → MOVE → COMPLETE → FOLD → DOORS. The strip runs 2x² − 7x + 3 = 0 to x = (7 ± 5)/4; both roots check in the original equation.</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (9.3): the discriminant verdict strip — three branches.    */
/* Header (30,18,660,44); panels (30,84,206,170), (257,84,206,170),    */
/* (484,84,206,170); chips (30,266,206,26), (257,266,206,26),          */
/* (484,266,206,26); caption band (30,304,660,24). Geometry pinned in  */
/* verify-book3-ch09.ts plan93Fig2.                                    */
/* ------------------------------------------------------------------ */

function discriminantVerdictSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The discriminant verdict strip: Δ greater than zero opens two doors, Δ zero opens one door counted twice, Δ below zero opens none — priced on x² − 7x + 12, x² − 6x + 9 and x² + x + 1">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the discriminant verdict — Δ = b² − 4ac reads the doors off the coefficients</text>')
  // ---- panel 1: Δ > 0 ----
  parts.push('<rect x="30" y="84" width="206" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="133" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">Δ &gt; 0 — TWO DOORS</text>')
  parts.push('<text x="133" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">x² − 7x + 12:</text>')
  parts.push('<text x="133" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">Δ = 49 − 48 = 1 &gt; 0</text>')
  parts.push('<text x="133" y="168" font-size="10.5" fill="#65a30d" text-anchor="middle">roots (7 ± 1)/2 = {3, 4}</text>')
  parts.push('<line x1="50" y1="215" x2="216" y2="215" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="149.6" cy="215" r="4" fill="#ea580c"/>')
  parts.push('<circle cx="182.8" cy="215" r="4" fill="#ea580c"/>')
  parts.push('<text x="149.6" y="238" font-size="9.5" fill="#d97706" text-anchor="middle">3</text>')
  parts.push('<text x="182.8" y="238" font-size="9.5" fill="#d97706" text-anchor="middle">4</text>')
  // ---- panel 2: Δ = 0 ----
  parts.push('<rect x="257" y="84" width="206" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">Δ = 0 — ONE, TWICE</text>')
  parts.push('<text x="360" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">x² − 6x + 9:</text>')
  parts.push('<text x="360" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">Δ = 36 − 36 = 0</text>')
  parts.push('<text x="360" y="168" font-size="10.5" fill="#65a30d" text-anchor="middle">root −b/2a = 3, counted twice</text>')
  parts.push('<line x1="277" y1="215" x2="443" y2="215" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="360" cy="215" r="4" fill="#ea580c"/>')
  parts.push('<text x="360" y="238" font-size="9.5" fill="#d97706" text-anchor="middle">3 — the two answers collapse</text>')
  // ---- panel 3: Δ < 0 ----
  parts.push('<rect x="484" y="84" width="206" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="587" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">Δ &lt; 0 — NO DOOR</text>')
  parts.push('<text x="587" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">x² + x + 1:</text>')
  parts.push('<text x="587" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">Δ = 1 − 4 = −3 &lt; 0</text>')
  parts.push('<text x="587" y="168" font-size="10.5" fill="#65a30d" text-anchor="middle">(x + 1/2)² + 3/4 &gt; 0 always</text>')
  parts.push('<line x1="504" y1="215" x2="670" y2="215" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<text x="587" y="238" font-size="9.5" fill="#dc2626" text-anchor="middle">the square refuses −3/4 — no hits anywhere</text>')
  // ---- chips ----
  parts.push('<rect x="30" y="266" width="206" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="133" y="283" font-size="10.5" fill="#166534" text-anchor="middle">Δ &gt; 0 → two distinct roots</text>')
  parts.push('<rect x="257" y="266" width="206" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="360" y="283" font-size="10.5" fill="#166534" text-anchor="middle">Δ = 0 → one repeated root</text>')
  parts.push('<rect x="484" y="266" width="206" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="587" y="283" font-size="10.5" fill="#166534" text-anchor="middle">Δ &lt; 0 → none real</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">the sign of Δ IS the verdict — 5.3’s verdict machine, now read straight off a, b, c without solving or factoring anything.</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson93: Lesson = {
  id: 'al-the-quadratic-formula-and-the-discriminant',
  number: '9.3',
  title: 'The Quadratic Formula and the Discriminant',
  concepts: [
    'the quadratic formula, derived',
    'the discriminant Δ = b² − 4ac',
    'the three-way discriminant verdict',
    'the repeated root read −b/2a',
    'quadratic surds and their simplification',
    'the completed-square master identity',
    'solving without solving: existence questions',
  ],
  objectives: [
    'derive the quadratic formula from the completed square on the general form a·x² + bx + c = 0, never recite it',
    'compute the discriminant Δ = b² − 4ac and read the three-way verdict — two distinct, one repeated, none real — straight off its sign',
    'solve quadratics with the formula, including perfect-square discriminants and repeated roots, and simplify quadratic surds lawfully',
    'prove the master identity a·x² + bx + c = a(x + b/2a)² − Δ/(4a) and use it to explain why Δ < 0 means never zero',
    'run k-hunts in one line: repeated roots from Δ = 0, no-real-roots regimes from Δ < 0',
    'answer existence questions (does such a rectangle exist?) by the discriminant before any solving',
  ],
  prerequisites: ['al-completing-the-square-derived', 'al-quadratics-and-factoring-solutions', 'al-the-three-verdicts-one-none-infinitely-many', 'al-fractional-equations-and-extraneous-roots'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Lesson 9.2 ended with a seed: for a MONIC quadratic, the whole solution collapsed to one line, $x = -\\frac{b}{2} \\pm \\sqrt{\\frac{b^2}{4} - c}$. What stands between that line and the tool every examination hall recites is a single division. The general quadratic $ax^2 + bx + c = 0$ carries its leading coefficient $a \\neq 0$ — and the a ≠ 0 clause is exactly the license to divide the whole equation by $a$, because division by zero is the one move the field laws forbid (5.1’s forbidden multiplier, now the forbidden divisor). Divide, and the equation goes monic: $x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$. The verifier divided three designed quadratics by their leading coefficients and re-checked the zero set at all eleven census points — $2x^2 - 7x + 3$ and its monic shadow $x^2 - \\frac{7}{2}x + \\frac{3}{2}$ vanish at exactly the same values of $x$. The lesson of 5.2 repeats one level up: a lawful move on the equation cannot change its answers, and now the monic compression applies verbatim.' },
    { kind: 'para', text: 'So the quadratic formula is not a new method. It is completing the square, performed ONCE, on letters, with the arithmetic carried through exactly — and then never repeated again. This lesson derives it slowly, reads off its built-in verdict machine (the discriminant), learns to simplify the irrational answers it produces, and then uses it to answer questions that never require solving anything at all. By the end, the three lessons of this chapter click together: factoring when the integers cooperate (9.1), completing the square when they do not (9.2), and the formula always (this lesson).' },
    { kind: 'heading', text: 'The Quadratic Formula, Derived' },
    { kind: 'derivation', title: 'Theorem — the quadratic formula', statement: 'For real coefficients with $a \\neq 0$, the equation $ax^2 + bx + c = 0$ holds exactly for $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$.', steps: [
      { label: 'Divide', explanation: 'The clause $a \\neq 0$ licenses dividing every term by $a$: $\\;x^2 + \\frac{b}{a}x + \\frac{c}{a} = 0$ — the monic form, same roots (the verifier priced the preservation pointwise).' },
      { label: 'Move', explanation: 'The balance law of 5.1 carries the constant right: $\\;x^2 + \\frac{b}{a}x = -\\frac{c}{a}$.' },
      { label: 'Complete', explanation: 'Half of $\\frac{b}{a}$ is $\\frac{b}{2a}$; add its square to BOTH sides: $\\;x^2 + \\frac{b}{a}x + \\left(\\frac{b}{2a}\\right)^2 = \\frac{b^2}{4a^2} - \\frac{c}{a}$ — the 9.2 identity in general-a dress.' },
      { label: 'Fold', explanation: 'The left side folds exactly: $\\;\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{b^2 - 4ac}{4a^2}$ — one fraction on the right, its numerator the DISCRIMINANT $\\Delta = b^2 - 4ac$, its denominator the square $(2a)^2$.' },
      { label: 'Verdict', explanation: 'The square verdict of 9.2 takes over. The denominator $4a^2$ is positive (it is a nonzero square), so everything hangs on the sign of $\\Delta$: if $\\Delta < 0$ the right side is negative and no real $x$ exists; if $\\Delta = 0$ the single door collapses; if $\\Delta > 0$ both doors open.' },
      { label: 'Doors', explanation: 'For $\\Delta \\geq 0$: $\\;x + \\frac{b}{2a} = \\pm\\frac{\\sqrt{\\Delta}}{2a}$ (the denominator comes out of the root as $2a$ up to sign — and $-\\frac{b}{2a}$ is the shared centre), hence $\\;x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$. Every letter earned its place.' },
    ], result: '$ax^2 + bx + c = 0 \\;\\iff\\; x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ — the quadratic formula, derived once and forever.' },
    { kind: 'equation', latex: 'x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}, \\qquad \\Delta = b^2 - 4ac, \\qquad a \\neq 0', note: 'the quadratic formula in its working dress — the ± carries two doors when Δ > 0, one when Δ = 0, none when Δ < 0' },
    { kind: 'para', text: 'Read the line slowly once, and it never needs memorizing again. The $-b$ over $2a$ is the axis where the two doors stand — the shared centre $-\\frac{b}{2a}$ that 9.2 already exhibited as the vertex reading. The square root carries $\\Delta = b^2 - 4ac$, the discriminator: everything about the VERDICT lives in its sign, everything about the POSITIONS lives in its size. The $\\pm$ is the honest two-door structure of a square root, the same ± 9.2 defended — dropping the minus door was "half a verdict" there and is half a verdict here. And the $2a$ in the denominator is the scar of the monic division: divide it away mentally and the monic compression of 9.2 reappears.' },
    { kind: 'example', title: 'Solve 2x² − 7x + 3 = 0 with the formula', steps: [
      'Already in standard form: $a = 2$, $b = -7$, $c = 3$ — the sign of $b$ rides INTO the formula, never pre-negated.',
      'Compute, $\\Delta = b^2 - 4ac = (-7)^2 - 4 \\cdot 2 \\cdot 3 = 49 - 24 = 25$.',
      'So, $x = \\frac{-(-7) \\pm \\sqrt{25}}{2 \\cdot 2} = \\frac{7 \\pm 5}{4}$ — the two doors are $\\frac{12}{4}$ and $\\frac{2}{4}$.',
      'Hence $x = 3$ or $x = \\frac{1}{2}$; the verifier priced both in the ORIGINAL polynomial: $2(9) - 21 + 3 = 0$ and $2 \\cdot \\frac{1}{4} - \\frac{7}{2} + 3 = 0$.',
    ] },
    { kind: 'example', title: 'Solve x² − 6x + 8 = 0 with the formula, then cross-check by factoring', steps: [
      '$a = 1$, $b = -6$, $c = 8$: $\\Delta = 36 - 32 = 4$, a perfect square — the formula must agree with 9.1’s factoring.',
      'Doors: $x = \\frac{6 \\pm 2}{2}$, giving $x = 4$ and $x = 2$.',
      'Check by factoring: $x^2 - 6x + 8 = (x - 2)(x - 4)$ — the same roots, two methods, one verdict.',
      'The working rule falls out: when $\\Delta$ is a perfect square and the coefficients are integers, factoring would have been FASTER; the formula is the guarantee that solve-ability never depended on that luck.',
    ] },
    { kind: 'example', title: 'Solve 4x² − 12x + 9 = 0 and explain the single answer', steps: [
      '$\\Delta = (-12)^2 - 4 \\cdot 4 \\cdot 9 = 144 - 144 = 0$ — the discriminant vanishes.',
      'The formula has no choice: $x = \\frac{12 \\pm 0}{8} = \\frac{3}{2}$, one root where the two doors land together.',
      'The fold shows why: $4x^2 - 12x + 9 = (2x - 3)^2$ — a pure square (the verifier certified the expansion), and a square is zero only when its base is.',
      'Hence the verdict "one repeated root": $\\frac{3}{2}$ counted twice, exactly 9.1’s collapse now derived from a coefficient reading rather than a factorization.',
    ] },
    { kind: 'terms', items: [
      { term: 'quadratic formula', def: 'the closed-form solution $x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a}$ of $ax^2 + bx + c = 0$ ($a \\neq 0$), derived by completing the square on the general form — not a memorized incantation but the 9.2 pipeline with the arithmetic done once, on letters.' },
      { term: 'discriminant', def: 'the quantity $\\Delta = b^2 - 4ac$ — the insides of the formula’s square root. Its sign discriminates the verdict: $\\Delta > 0$ two distinct real roots, $\\Delta = 0$ one repeated root, $\\Delta < 0$ no real roots.' },
      { term: 'the three-way discriminant verdict', def: 'the reading of the door count straight off the sign of Δ, without solving or factoring: the quadratic verdict machine of 9.1, now driven by coefficients alone.' },
      { term: 'repeated root', def: 'when Δ = 0 the two formula doors land on the same number $x = -\\frac{b}{2a}$; the root is counted twice because the quadratic folds into a perfect square $a(x - r)^2$ — the multiplicity 9.1 observed and this lesson derives.' },
      { term: 'quadratic surd', def: 'an irrational root of the form $p \\pm q\\sqrt{d}$ with $d$ not a perfect square — the honest output of the formula when Δ is positive but not a square. Simplified by extracting the largest square factor of Δ.' },
      { term: 'the completed-square master identity', def: 'the exact identity $ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}$ — the formula’s derivation compressed into one line, and the reason Δ < 0 forces the quadratic to be never zero (a nonzero square plus a positive constant).' },
    ] },
    { kind: 'heading', text: 'The Discriminant: the Verdict Read off the Coefficients' },
    { kind: 'para', text: 'Look again at the derivation’s pivotal line: $\\left(x + \\frac{b}{2a}\\right)^2 = \\frac{\\Delta}{4a^2}$. The left side is a square — never negative, zero only at the fold point. The denominator $4a^2$ is a positive square. So the entire question "does a real $x$ exist?" is a question about the SIGN of $\\Delta = b^2 - 4ac$, and the question "how many doors?" is the same question. This is 5.3’s verdict machine grown to degree 2: the linear machine sorted equations into one, none, infinitely many AFTER a solve; the discriminant sorts quadratics into two, one, none BEFORE any solve — from the coefficients alone.' },
    { kind: 'table', caption: 'The discriminant ledger, priced by the verifier: the sign of Δ settles the verdict before any solving', head: ['Quadratic', 'Δ = b² − 4ac', 'Sign', 'Verdict', 'The doors'], rows: [
      ['$2x^2 - 7x + 3$', '$49 - 24 = 25$', 'Δ > 0', 'two distinct', '$x = \\frac{7 \\pm 5}{4} = \\{\\frac{1}{2}, 3\\}$'],
      ['$x^2 - 6x + 8$', '$36 - 32 = 4$', 'Δ > 0', 'two distinct', '$x = \\frac{6 \\pm 2}{2} = \\{2, 4\\}$'],
      ['$4x^2 - 12x + 9$', '$144 - 144 = 0$', 'Δ = 0', 'one repeated', '$x = \\frac{12}{8} = \\frac{3}{2}$ twice'],
      ['$x^2 - 2x - 4$', '$4 + 16 = 20$', 'Δ > 0, not a square', 'two, irrational', '$x = 1 \\pm \\sqrt{5}$'],
      ['$x^2 + x + 1$', '$1 - 4 = -3$', 'Δ < 0', 'none real', '$(x + \\frac{1}{2})^2 + \\frac{3}{4} > 0$'],
      ['$x^2 + 2x + 5$', '$4 - 20 = -16$', 'Δ < 0', 'none real', '$(x + 1)^2 + 4 > 0$'],
    ] },
    { kind: 'para', text: 'The ledger’s middle rows deserve a second look. $\\Delta > 0$ does not promise rational roots: $x^2 - 2x - 4$ has $\\Delta = 20$, positive but no one’s square, and its doors open onto $1 \\pm \\sqrt{5}$ — real, distinct, and irrational. The verdict "two real roots" and the verdict "factorable over the integers" are DIFFERENT verdicts; 9.1’s not-factorable engine already met the gap, and the discriminant now measures it exactly: the roots are rational precisely when $\\Delta$ is a perfect square (for monic integer quadratics — the honest scope of the schoolroom read).' },
    { kind: 'callout', tone: 'warn', title: 'Caution — Δ reads STANDARD form', text: 'The discriminant is $b^2 - 4ac$ of the STANDARD form $ax^2 + bx + c = 0$ — coefficients collected left, signs as they sit. The trap: $2x^2 + 5x = -3$ has no constant term on the left YET; read hastily, $c$ looks like $0$ and $\\Delta$ comes out $25$. Collect first: $2x^2 + 5x + 3 = 0$, so $\\Delta = 25 - 24 = 1 > 0$, two doors $x = \\frac{-5 \\pm 1}{4} = \\{-1, -\\frac{1}{2}\\}$ — the verifier priced both. One collection, one Δ, one verdict — never a Δ from the raw ink.' },
    { kind: 'para', text: 'Why does $\\Delta < 0$ guarantee the quadratic is NEVER zero — not just "the formula refuses"? The master identity answers exactly. Expanding the completed square of the derivation and keeping the remainder gives, for every $x$:' },
    { kind: 'equation', latex: 'a x^2 + b x + c \\;=\\; a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}', note: 'the completed-square master identity — exact for every x, the verifier certified it on four designed triples' },
    { kind: 'para', text: 'When $\\Delta < 0$, the shift $-\\frac{\\Delta}{4a}$ is POSITIVE (for $a > 0$; for $a < 0$ both factors flip and the conclusion is unchanged — the verifier ran $2x^2 - 3x + 4$ with $-\\frac{\\Delta}{4a} = \\frac{23}{8} > 0$): a square plus a positive constant can never be zero. When $\\Delta = 0$ the identity is a pure multiple of a square — the repeated-root collapse. When $\\Delta > 0$ the square must cancel a negative shift, which happens at exactly two $x$. One identity, three verdicts, no solving — this is the deepest single line in the chapter.' },
    { kind: 'para', text: 'The formula also has a GEOMETRY, and it is worth one paragraph because chapter 10 will draw it. Read the doors as $x = -\\frac{b}{2a} \\pm \\frac{\\sqrt{\\Delta}}{2a}$: a CENTRE at $-\\frac{b}{2a}$ — the fold point of the completed square — and a RADIUS $\\frac{\\sqrt{\\Delta}}{2a}$ stepping symmetrically both ways from it. The two roots are as symmetric as two numbers can be: their average is the centre, their gap is $\\frac{\\sqrt{\\Delta}}{a}$ (the verifier priced the gap identity $\\Delta/a^2$ on three exhibits, including the irrational $2\\sqrt{3}$ for $x^2 - 4x + 1$). Every fact about the doors is a fact about the centre and the radius — and in lesson 9.4 the SUM of the roots will read the centre directly off the coefficients, no formula needed.' },
    { kind: 'example', title: 'Find every k for which x² + kx + 25 = 0 has a repeated root', steps: [
      'A repeated root means the doors collapse: $\\Delta = k^2 - 4 \\cdot 25 = k^2 - 100 = 0$.',
      'So, $k^2 = 100$, and $k = 10$ or $k = -10$ — BOTH, because $k$ sits inside a square.',
      'Check by expansion: $x^2 + 10x + 25 = (x + 5)^2$ (root $-5$) and $x^2 - 10x + 25 = (x - 5)^2$ (root $5$) — the verifier certified both folds.',
      'The k-hunt that took 9.2 a completion (find $k$ so the square is pure) now takes one discriminant line — that is what "the verdict read off the coefficients" buys.',
    ] },
    { kind: 'example', title: 'Find every k for which 2x² + 4x + k = 0 has no real roots', steps: [
      'No real roots means $\\Delta < 0$: $\\;16 - 8k < 0$.',
      'Solve the LINEAR inequality (7.2’s craft): $k > 2$.',
      'The boundary $k = 2$ collapses: $\\Delta = 0$, the single root $x = -\\frac{4}{4} = -1$ — the verifier priced the one-door collapse.',
      'Below the boundary, $k = 1$: $\\Delta = 8 > 0$, roots $-1 \\pm \\frac{\\sqrt{2}}{2}$ — two irrational doors, certified exact in $\\mathbb{Q}(\\sqrt{2})$. The inequality $k > 2$ is the exact fence between "no doors" and "two doors".',
    ] },
    { kind: 'figure', caption: 'The formula pipeline: divide by a, move the constant, complete the square with (b/2a)², fold, and open the doors the sign of Δ licenses. The worked strip runs 2x² − 7x + 3 = 0 to x = (7 ± 5)/4 = {1/2, 3}.', svg: formulaPipelineSvg() },
    { kind: 'para', text: 'The pipeline’s five stations are the derivation, frozen. Notice what the pipeline does NOT contain: no factoring, no integer hunting, no luck. That is the chapter’s arc completing itself — 9.1 solved when the integers cooperated, 9.2 solved always but freshly each time, and 9.3 solves always with the freshness paid once. In an examination the formula is the DEFAULT; factoring remains a speed optimization to attempt only when the discriminant comes out a perfect square.' },
    { kind: 'heading', text: 'Simplifying the Answers: Quadratic Surds' },
    { kind: 'para', text: 'When $\\Delta$ is positive but not a perfect square, the formula’s output is a quadratic surd — and examination answers are expected SIMPLIFIED. The discipline is the one this book has used since the chapter-4 identities: a square factor comes out of the root whole. $\\sqrt{20} = \\sqrt{4 \\cdot 5} = 2\\sqrt{5}$, $\\sqrt{12} = 2\\sqrt{3}$, $\\sqrt{48} = \\sqrt{16 \\cdot 3} = 4\\sqrt{3}$ (the very root inside 9.2’s non-monic solve), $\\sqrt{60} = 2\\sqrt{15}$. The verifier split nine designed roots by hunting the LARGEST square factor each time — largest, because $\\sqrt{48}$ split lazily as $2\\sqrt{12}$ still hides a square; the discipline is "extract until nothing square remains". A surd left unsimplified is not wrong; it is unfinished.' },
    { kind: 'example', title: 'Solve 3x² − 6x − 2 = 0 and simplify the surd', steps: [
      '$\\Delta = (-6)^2 - 4 \\cdot 3 \\cdot (-2) = 36 + 24 = 60$ — positive, not a square.',
      'Split: $60 = 4 \\cdot 15$, so $\\sqrt{60} = 2\\sqrt{15}$ (the largest square factor is 4).',
      'Doors: $x = \\frac{6 \\pm 2\\sqrt{15}}{6} = 1 \\pm \\frac{\\sqrt{15}}{3}$ — divide EVERYTHING by the 6, numerator included.',
      'The verifier certified both doors exact in $\\mathbb{Q}(\\sqrt{15})$: substituting $1 + \\frac{\\sqrt{15}}{3}$ into $3x^2 - 6x - 2$ cancels to $0$, term by term.',
    ] },
    { kind: 'para', text: 'The division discipline at the last station deserves its own warning, because it is where clean work most often leaks. The door line $x = \\frac{6 \\pm 2\\sqrt{15}}{6}$ divides EVERYTHING by the 6 — the rational part AND the surd coefficient: the answer is $1 \\pm \\frac{\\sqrt{15}}{3}$, not $1 \\pm 2\\sqrt{15}$ (the surd left double-counted) and not $6 \\pm 2\\sqrt{15}$ (nothing divided at all). The verifier met this class before: 9.2’s non-monic solves landed at $1 \\pm \\frac{1}{2}\\sqrt{10}$ and $-1 \\pm \\frac{2}{3}\\sqrt{3}$ — in each, the $2a$ denominator divides both parts, and the same reading in reverse is how the monic check goes: multiply the simplified answer by the discarded $a$ and the original equation must reappear.' },
    { kind: 'para', text: 'Irrational answers are answers. The long exile of $\\sqrt{2}$ from the solution sets of ANS chapter 8 was reversed in 9.2 ($1 \\pm \\sqrt{2}$ as a legitimate landing) and this lesson makes such landings routine: two of the ledger’s six exhibits have irrational doors. The check discipline survives the irrationality — substitute the surd root into the original equation and watch the radical terms cancel (the verifier does this in exact $\\mathbb{Q}(\\sqrt{d})$ arithmetic, where $\\sqrt{15}$ is carried as the pair rational-part-plus-radical-coefficient). What is NEVER allowed is the float shortcut on a proof: $1.66$ is a shadow of $1 + \\frac{\\sqrt{15}}{3}$, useful for a sanity bound, never for a certificate.' },
    { kind: 'heading', text: 'The Rectangle Verdict: Solving Without Solving' },
    { kind: 'para', text: 'Here is the payoff question type that makes the discriminant worth its name. A rectangle has perimeter 20, so if its width is $x$ its length is $10 - x$ and its area is $x(10 - x)$. Can the area be 26? Set up: $x(10 - x) = 26$, standard form $x^2 - 10x + 26 = 0$, and STOP — read the verdict first: $\\Delta = 100 - 104 = -4 < 0$. No real $x$ exists. No such rectangle. The question is answered in one line, without finding any width, because the question was an EXISTENCE question and existence is exactly what the discriminant discriminates. The verifier backed the refusal with the master identity: $x^2 - 10x + 26 = (x - 5)^2 + 1 \\geq 1$ — the area cannot even reach 26, and the square identity shows why 25 is the ceiling.' },
    { kind: 'para', text: 'Now bend the same rectangle through the other two branches, and watch the verdicts carry MEANING. Area 21: $x^2 - 10x + 21 = 0$, $\\Delta = 16 > 0$, doors $x = 3$ and $x = 7$ — two "answers" that are one rectangle read twice ($3 \\times 7$ and $7 \\times 3$). Area 25: $\\Delta = 0$, the single root $x = 5$ — the square, where the two answers collapse into each other, and the geometric meaning of the repeated root is exactly "width equals length". The verifier confirmed over the whole census that $x(10-x) \\leq 25$ with equality only at $x = 5$ — the discriminant did not just count roots, it found the maximum. Existence, uniqueness, optimality: three different questions, one coefficient reading.' },
    { kind: 'figure', caption: 'The discriminant verdict strip: Δ > 0 opens two doors, Δ = 0 opens one door counted twice, Δ < 0 opens none — priced on x² − 7x + 12 (Δ = 1), x² − 6x + 9 (Δ = 0) and x² + x + 1 (Δ = −3).', svg: discriminantVerdictSvg() },
    { kind: 'callout', tone: 'insight', title: 'Insight — the verdict machine, grown up and ahead of its graph', text: 'Chapter 5 sorted linear equations into one, none, infinitely many — but only AFTER solving. Chapter 9’s machine reads the verdict BEFORE any solving: the sign of $\\Delta = b^2 - 4ac$ is the whole story. Two distinct real doors, one door counted twice, or none — and "infinitely many" is impossible because $a \\neq 0$ pins a genuine square term. This is also the chapter’s quiet promise to chapter 10: the parabola $y = ax^2 + bx + c$ crosses the x-axis exactly as many times as $\\Delta$ allows — twice, once (a tangent touch), or never. The discriminant will reappear there as the x-intercept counter; here it already answers existence questions ("is there a rectangle of area 26?") that no amount of graphing answers faster.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'The quadratic formula $x = \\frac{-b \\pm \\sqrt{\\Delta}}{2a}$, $\\Delta = b^2 - 4ac$, is completing the square performed once on $ax^2 + bx + c = 0$ ($a \\neq 0$) — derived, not memorized.',
      'The sign of Δ IS the verdict: $\\Delta > 0$ two distinct real roots, $\\Delta = 0$ one repeated root ($x = -\\frac{b}{2a}$), $\\Delta < 0$ none real — read before solving.',
      'Δ comes from STANDARD form: collect first, then read the coefficients.',
      'Positive but non-square Δ gives irrational doors — simplify surds by extracting the largest square factor (√60 = 2√15), and check surd roots by exact cancellation, never by float.',
      'The master identity $ax^2 + bx + c = a(x + \\frac{b}{2a})^2 - \\frac{\\Delta}{4a}$ explains all three verdicts at once and turns existence questions ("can the area be 26?") into one-line answers.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the formula’s long road to one line', text: 'Brahmagupta’s Brāhmasphuṭasiddhānta (628 CE) gave the rule essentially in words: to the absolute number multiplied by four times the square-coefficient, add the square of the middle coefficient; take the root, subtract the middle coefficient, divide by twice the square-coefficient — the quadratic formula for $ax^2 + bx = c$, seven centuries before symbolic algebra. Al-Khwarizmi (c. 825) still split quadratics into rhetorical CASE types precisely because negative coefficients had no standing; the single formula needed the sign laws (FM ch. 7, ANS ch. 7) and the letter symbolism that Viète and Descartes later banked. The name DISCRIMINANT for $b^2 - 4ac$ was coined by James Joseph Sylvester in 1851, the word doing exactly what this lesson does: discriminating the verdict before the solve. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope, SSC/bank preliminaries, JEE-Main foundations) drills this lesson under the heading "nature of roots": (1) speed solves — when Δ is a perfect square the formula is as fast as factoring and always lawful; (2) nature items — "discriminate without solving" ($x^2 - 4x + k$ for given $k$) are one-line Δ readings; (3) k-hunts — repeated roots from $\\Delta = 0$ (this lesson’s $k = \\pm 10$ shape) and no-real-roots regimes from $\\Delta < 0$ ($k > 2$), frequently chained with a linear-inequality finish; (4) the difference read — for $x^2 + px + q$ the roots differ by $\\sqrt{p^2 - 4q}$, so "the roots differ by $d$" is the condition $p^2 - 4q = d^2$ (the L5 exercise grows into 9.4’s identity); (5) existence word problems — areas, minimums, fencing — where the discriminant answers can-it-exist before what-is-it. The formula is the most-quoted line in school algebra; the discipline this lesson adds is reading its VERDICT before computing its doors.' },
    { kind: 'formula', name: 'The quadratic formula', latex: 'x = \\frac{-b \\pm \\sqrt{b^2 - 4ac}}{2a} \\qquad (a \\neq 0)', note: 'completing the square performed once on the general form — the doors of every quadratic, with no luck required' },
    { kind: 'formula', name: 'The discriminant', latex: '\\Delta = b^2 - 4ac', note: 'the insides of the square root: its sign discriminates the verdict, its size sets the gap between the doors' },
    { kind: 'formula', name: 'The three-way discriminant verdict', latex: '\\Delta > 0: \\text{ two distinct} \\qquad \\Delta = 0: \\text{ one repeated } \\left(x = -\\tfrac{b}{2a}\\right) \\qquad \\Delta < 0: \\text{ none real}', note: 'the 5.3 verdict machine at degree 2, read off the coefficients before any solving' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'For $2x^2 - 7x + 3 = 0$, the discriminant $\\Delta = b^2 - 4ac$ is', options: ['$49$', '$25$', '$1$', '$-25$'], answer: 1, explain: '$\\Delta = (-7)^2 - 4 \\cdot 2 \\cdot 3 = 49 - 24 = 25$. The 49 forgets the $-4ac$ term; the 1 would come from $b = 5$ (the wrong middle coefficient); the $-25$ flips the sign of $\\Delta$ itself — $\\Delta$ can be negative only when $4ac > b^2$, not here.' },
      { q: 'Solving $x^2 - 6x + 8 = 0$ with the formula $x = \\frac{6 \\pm \\sqrt{\\Delta}}{2}$ lands at', options: ['$\\{-2, -4\\}$', '$\\{1, 8\\}$', 'no real roots', '$\\{2, 4\\}$'], answer: 3, explain: '$\\Delta = 36 - 32 = 4$, so $x = \\frac{6 \\pm 2}{2} = \\{4, 2\\}$ — and indeed $(x-2)(x-4) = x^2 - 6x + 8$. The negative pair comes from feeding $-6$ into the $-b$ slot twice; $\\{1, 8\\}$ has product 8 but sum 9; $\\Delta = 4 > 0$ forbids the empty verdict.' },
      { q: 'The roots of $x^2 - 2x - 4 = 0$ are', options: ['$2 \\pm \\sqrt{5}$', '$-1 \\pm \\sqrt{5}$', '$1 \\pm \\sqrt{5}$', 'no real roots'], answer: 2, explain: '$\\Delta = 4 + 16 = 20 = 4 \\cdot 5$, so $x = \\frac{2 \\pm 2\\sqrt{5}}{2} = 1 \\pm \\sqrt{5}$ — the $2\\sqrt{5}$ must divide too. $2 \\pm \\sqrt{5}$ forgets to halve the surd; $-1 \\pm \\sqrt{5}$ reads $-\\frac{b}{2a}$ with the wrong sign ($-b = 2$, positive); $\\Delta = 20 > 0$ forbids the empty verdict.' },
      { q: 'For which values of $k$ does $x^2 + kx + 25 = 0$ have a repeated root?', options: ['$k = \\pm 10$', '$k = 10$ only', '$k = \\pm 5$', '$k = 25$'], answer: 0, explain: 'A repeated root needs $\\Delta = k^2 - 100 = 0$, so $k = 10$ AND $k = -10$ — both expand to perfect squares $(x \\mp 5)^2$. "10 only" drops the second square (the $k$ sits inside a square, so its sign washes out); $k = \\pm 5$ gives $\\Delta = -75$, none real; $k = 25$ gives $\\Delta = 525 > 0$, two distinct.' },
      { q: 'A rectangle of perimeter 20 is asked to have area 26. The discriminant verdict says', options: ['two widths work', 'one width works (the square)', 'no such rectangle — $\\Delta < 0$', 'every width works'], answer: 2, explain: '$x(10 - x) = 26$ standardizes to $x^2 - 10x + 26 = 0$ with $\\Delta = 100 - 104 = -4 < 0$: no real width exists, before any solving. Area 25 is the one-width case ($\\Delta = 0$, the square $x = 5$); area 21 gives the two-width case ($\\{3, 7\\}$, one rectangle read twice); the master identity $(x-5)^2 + 1 \\geq 1$ shows the area never even reaches 26.' },
    ] },
    { kind: 'exercises', title: 'Exercises 9.3', sets: [
      { level: 'L1', questions: [
        { q: 'Compute $\\Delta$ and read the verdict for $x^2 - 5x + 6 = 0$ — before solving.', solution: [
          'Standard form sits ready: $a = 1$, $b = -5$, $c = 6$.',
          'So, $\\Delta = (-5)^2 - 4 \\cdot 1 \\cdot 6 = 25 - 24 = 1 > 0$.',
          'Verdict: two distinct real roots — and since $1$ is a perfect square, they are even rational: $x = \\frac{5 \\pm 1}{2} = \\{2, 3\\}$.',
        ], answer: '$\\Delta = 1 > 0$: two distinct real roots, $x = 2$ and $x = 3$.' },
        { q: 'Compute $\\Delta$ and read the verdict for $x^2 + 4x + 4 = 0$ — before solving.', solution: [
          '$\\Delta = 4^2 - 4 \\cdot 1 \\cdot 4 = 16 - 16 = 0$.',
          'Verdict: one repeated root, at $x = -\\frac{b}{2a} = -\\frac{4}{2} = -2$.',
          'Check the fold: $x^2 + 4x + 4 = (x + 2)^2$ — a pure square, zero only at $x = -2$.',
        ], answer: '$\\Delta = 0$: the repeated root $x = -2$, counted twice.' },
        { q: 'Compute $\\Delta$ and read the verdict for $x^2 + 2x + 5 = 0$ — before solving.', solution: [
          '$\\Delta = 2^2 - 4 \\cdot 1 \\cdot 5 = 4 - 20 = -16 < 0$.',
          'Verdict: no real roots — the formula refuses both doors.',
          'The master identity shows the never-zero guarantee: $x^2 + 2x + 5 = (x + 1)^2 + 4 \\geq 4$.',
        ], answer: '$\\Delta = -16 < 0$: no real roots.' },
      ] },
      { level: 'L2', questions: [
        { q: 'Solve $2x^2 + 5x - 3 = 0$ with the formula.', solution: [
          '$\\Delta = 5^2 - 4 \\cdot 2 \\cdot (-3) = 25 + 24 = 49$ — a perfect square, so the doors are rational.',
          'Doors: $x = \\frac{-5 \\pm 7}{4}$ — the $-b$ slot carries $-5$ with its sign.',
          'Hence $x = \\frac{2}{4} = \\frac{1}{2}$ or $x = \\frac{-12}{4} = -3$.',
          'Check one door in the original: $2 \\cdot \\frac{1}{4} + \\frac{5}{2} - 3 = \\frac{1}{2} + \\frac{5}{2} - 3 = 0$.',
        ], answer: '$x = \\frac{1}{2}$ and $x = -3$.' },
        { q: 'Solve $x^2 - 6x + 8 = 0$ with the formula and cross-check by factoring.', solution: [
          '$\\Delta = 36 - 32 = 4$; doors $x = \\frac{6 \\pm 2}{2}$.',
          'Hence $x = 4$ or $x = 2$.',
          'Cross-check: $x^2 - 6x + 8 = (x - 2)(x - 4)$ — the 9.1 readout confirms the sum 6 and product 8.',
        ], answer: '$x = 2$ and $x = 4$.' },
        { q: 'Solve $4x^2 - 12x + 9 = 0$ and explain why there is only one answer.', solution: [
          '$\\Delta = 144 - 144 = 0$ — the discriminant vanishes.',
          'The formula collapses: $x = \\frac{12}{8} = \\frac{3}{2}$, one root counted twice.',
          'The fold explains it: $4x^2 - 12x + 9 = (2x - 3)^2$, and $(2x - 3)^2 = 0$ forces $x = \\frac{3}{2}$ alone.',
        ], answer: '$x = \\frac{3}{2}$ (repeated) — the quadratic is the square $(2x - 3)^2$.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Solve $x^2 - 2x - 4 = 0$ and simplify the surd.', solution: [
          '$\\Delta = 4 + 16 = 20$ — positive, not a square.',
          'Split: $20 = 4 \\cdot 5$, so $\\sqrt{20} = 2\\sqrt{5}$.',
          'Doors: $x = \\frac{2 \\pm 2\\sqrt{5}}{2} = 1 \\pm \\sqrt{5}$ — divide the surd too.',
          'Field check at $1 + \\sqrt{5}$: $(1 + \\sqrt{5})^2 - 2(1 + \\sqrt{5}) - 4 = 6 + 2\\sqrt{5} - 2 - 2\\sqrt{5} - 4 = 0$ — exact cancellation.',
        ], answer: '$x = 1 \\pm \\sqrt{5}$.' },
        { q: 'Solve $x^2 + 4x + 1 = 0$ and simplify the surd.', solution: [
          '$\\Delta = 16 - 4 = 12$; split $12 = 4 \\cdot 3$, so $\\sqrt{12} = 2\\sqrt{3}$.',
          'Doors: $x = \\frac{-4 \\pm 2\\sqrt{3}}{2} = -2 \\pm \\sqrt{3}$.',
          'Field check at $-2 + \\sqrt{3}$: $(-2 + \\sqrt{3})^2 + 4(-2 + \\sqrt{3}) + 1 = 7 - 4\\sqrt{3} - 8 + 4\\sqrt{3} + 1 = 0$.',
        ], answer: '$x = -2 \\pm \\sqrt{3}$.' },
        { q: 'Solve $3x^2 - 6x - 2 = 0$ and simplify the surd.', solution: [
          '$\\Delta = 36 + 24 = 60$; split $60 = 4 \\cdot 15$, so $\\sqrt{60} = 2\\sqrt{15}$.',
          'Doors: $x = \\frac{6 \\pm 2\\sqrt{15}}{6} = 1 \\pm \\frac{\\sqrt{15}}{3}$.',
          'Field check at $1 + \\frac{\\sqrt{15}}{3}$: $x^2 = 1 + \\frac{2\\sqrt{15}}{3} + \\frac{5}{3} = \\frac{8}{3} + \\frac{2\\sqrt{15}}{3}$, so $3x^2 = 8 + 2\\sqrt{15}$, and $3x^2 - 6x - 2 = 8 + 2\\sqrt{15} - 6 - 2\\sqrt{15} - 2 = 0$ — exact cancellation.',
        ], answer: '$x = 1 \\pm \\frac{\\sqrt{15}}{3}$.' },
      ] },
      { level: 'L4', questions: [
        { q: 'Find every $k$ for which $x^2 + kx + 25 = 0$ has a repeated root, and name the root in each case.', solution: [
          'A repeated root needs $\\Delta = k^2 - 100 = 0$, so $k = \\pm 10$.',
          'For $k = 10$: $x^2 + 10x + 25 = (x + 5)^2$, the repeated root $-5$.',
          'For $k = -10$: $x^2 - 10x + 25 = (x - 5)^2$, the repeated root $5$.',
        ], answer: '$k = 10$ (root $-5$) and $k = -10$ (root $5$).' },
        { q: 'Find every $k$ for which $2x^2 + 4x + k = 0$ has no real roots.', solution: [
          'No real roots means $\\Delta < 0$: $\\;16 - 8k < 0$.',
          'Solve the linear inequality: $k > 2$.',
          'The boundary $k = 2$ collapses to the single root $x = -1$ (priced: $\\Delta = 0$), and $k = 1$ shows the other side with two irrational doors $-1 \\pm \\frac{\\sqrt{2}}{2}$.',
        ], answer: 'Every $k > 2$.' },
        { q: 'A rectangle has perimeter 20. Can its area be 26? 21? 25? Answer each with the discriminant, and interpret the three verdicts.', solution: [
          'Width $x$, length $10 - x$, area $x(10 - x)$: the area-$A$ question is $x^2 - 10x + A = 0$, $\\Delta = 100 - 4A$.',
          'Area 26: $\\Delta = -4 < 0$ — no real width exists; no such rectangle. The master identity confirms: $x^2 - 10x + 26 = (x - 5)^2 + 1 \\geq 1 > 0$.',
          'Area 21: $\\Delta = 16 > 0$, doors $x = 3, 7$ — two answers that are ONE rectangle read twice ($3 \\times 7$).',
          'Area 25: $\\Delta = 0$, the single door $x = 5$ — the square, where width meets length; and $25 - x(10-x) = (x-5)^2$ shows 25 is the exact ceiling.',
        ], answer: '26: impossible ($\\Delta = -4$); 21: $3 \\times 7$; 25: the square $5 \\times 5$ — the maximum area.' },
      ] },
      { level: 'L5', questions: [
        { q: 'The roots of $x^2 + px + 12 = 0$ differ by exactly 1. Find both possible values of $p$ and the roots in each case.', solution: [
          'For a monic quadratic the squared gap between the doors is $\\Delta$ itself: the doors are $\\frac{-p \\pm \\sqrt{p^2 - 48}}{2}$, differing by $\\sqrt{p^2 - 48}$.',
          'Set $\\sqrt{p^2 - 48} = 1$: $p^2 - 48 = 1$, so $p^2 = 49$ and $p = \\pm 7$.',
          'For $p = 7$: $x^2 + 7x + 12 = 0$, doors $\\frac{-7 \\pm 1}{2} = \\{-3, -4\\}$ — differing by 1.',
          'For $p = -7$: $x^2 - 7x + 12 = 0$, doors $\\frac{7 \\pm 1}{2} = \\{4, 3\\}$ — differing by 1 (9.1’s sum-product exhibit, now systematic).',
        ], answer: '$p = 7$ with roots $\\{-3, -4\\}$, or $p = -7$ with roots $\\{3, 4\\}$.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the completed-square master identity $ax^2 + bx + c = a\\left(x + \\frac{b}{2a}\\right)^2 - \\frac{\\Delta}{4a}$, and use it to read the verdict for $2x^2 - 7x + 3$ without solving.', solution: [
          'Expand the right side: $a\\left(x^2 + \\frac{b}{a}x + \\frac{b^2}{4a^2}\\right) - \\frac{\\Delta}{4a} = ax^2 + bx + \\frac{b^2}{4a} - \\frac{\\Delta}{4a}$.',
          'Substitute $\\Delta = b^2 - 4ac$: the remainder becomes $\\frac{b^2 - (b^2 - 4ac)}{4a} = \\frac{4ac}{4a} = c$ — the identity closes exactly.',
          'Apply to $2x^2 - 7x + 3$: $\\Delta = 49 - 24 = 25$, so $2x^2 - 7x + 3 = 2\\left(x - \\frac{7}{4}\\right)^2 - \\frac{25}{8}$ — the verifier certified the expansion term by term.',
          'Read the verdict: the square is $\\geq 0$, the shift $-\\frac{25}{8}$ is negative, so the expression hits zero exactly when $2\\left(x - \\frac{7}{4}\\right)^2 = \\frac{25}{8}$, i.e. the square equals $\\frac{25}{16}$ — possible, at two $x$; and $\\sqrt{\\frac{25}{16}} = \\frac{5}{4}$ names the doors $x = \\frac{7}{4} \\pm \\frac{5}{4} = \\{3, \\frac{1}{2}\\}$.',
        ], answer: 'The identity holds exactly; $2x^2 - 7x + 3 = 2(x - \\frac{7}{4})^2 - \\frac{25}{8}$, verdict two doors at $x = \\frac{1}{2}, 3$.' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* Figure 5 (9.4): the Viète readout machine — four stations.          */
/* Header (30,18,660,44); stations (30,96,150,150), (200,96,150,150),  */
/* (370,96,150,150), (540,96,150,150); chips (30,266,150,26),          */
/* (200,266,150,26), (370,266,150,26), (540,266,150,26); caption band  */
/* (30,304,660,24). Geometry pinned in verify-book3-ch09.ts plan94Fig1.*/
/* ------------------------------------------------------------------ */

function vieteReadoutSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The Viète readout machine: standard form, read off S = −b/a and P = c/a, certify the roots by both tests, rebuild a(x² − Sx + P) — with the worked strip 2x² − 7x + 3 certifying {1/2, 3}">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the Viète readout — the roots’ sum and product, read off the coefficients</text>')
  // ---- station 1: STANDARD FORM ----
  parts.push('<rect x="30" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="105" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">1 · STANDARD FORM</text>')
  parts.push('<text x="105" y="142" font-size="10" fill="#65a30d" text-anchor="middle">ax² + bx + c = 0,</text>')
  parts.push('<text x="105" y="158" font-size="10" fill="#65a30d" text-anchor="middle">a ≠ 0 — every</text>')
  parts.push('<text x="105" y="174" font-size="10" fill="#65a30d" text-anchor="middle">quadratic carries</text>')
  parts.push('<text x="105" y="190" font-size="10" fill="#65a30d" text-anchor="middle">its S and P in</text>')
  parts.push('<text x="105" y="206" font-size="10" fill="#65a30d" text-anchor="middle">plain sight</text>')
  // ---- station 2: READ OFF ----
  parts.push('<rect x="200" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="275" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">2 · READ OFF</text>')
  parts.push('<text x="275" y="142" font-size="10" fill="#65a30d" text-anchor="middle">S = −b/a (the sum),</text>')
  parts.push('<text x="275" y="158" font-size="10" fill="#65a30d" text-anchor="middle">P = c/a (the</text>')
  parts.push('<text x="275" y="174" font-size="10" fill="#65a30d" text-anchor="middle">product) — no</text>')
  parts.push('<text x="275" y="190" font-size="10" fill="#65a30d" text-anchor="middle">solving, no</text>')
  parts.push('<text x="275" y="206" font-size="10" fill="#65a30d" text-anchor="middle">factoring</text>')
  // ---- station 3: CERTIFY ----
  parts.push('<rect x="370" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="445" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">3 · CERTIFY</text>')
  parts.push('<text x="445" y="142" font-size="10" fill="#65a30d" text-anchor="middle">claimed roots must</text>')
  parts.push('<text x="445" y="158" font-size="10" fill="#65a30d" text-anchor="middle">pass BOTH tests:</text>')
  parts.push('<text x="445" y="174" font-size="10" fill="#65a30d" text-anchor="middle">sum S, product P —</text>')
  parts.push('<text x="445" y="190" font-size="10" fill="#65a30d" text-anchor="middle">irrational roots</text>')
  parts.push('<text x="445" y="206" font-size="10" fill="#65a30d" text-anchor="middle">included</text>')
  // ---- station 4: REBUILD ----
  parts.push('<rect x="540" y="96" width="150" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="615" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">4 · REBUILD</text>')
  parts.push('<text x="615" y="142" font-size="10" fill="#65a30d" text-anchor="middle">a(x² − Sx + P) ≡</text>')
  parts.push('<text x="615" y="158" font-size="10" fill="#65a30d" text-anchor="middle">the original —</text>')
  parts.push('<text x="615" y="174" font-size="10" fill="#65a30d" text-anchor="middle">expand and match,</text>')
  parts.push('<text x="615" y="190" font-size="10" fill="#65a30d" text-anchor="middle">coefficient by</text>')
  parts.push('<text x="615" y="206" font-size="10" fill="#65a30d" text-anchor="middle">coefficient</text>')
  // ---- connectors ----
  parts.push('<line x1="180" y1="171" x2="200" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="350" y1="171" x2="370" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="520" y1="171" x2="540" y2="171" stroke="#d97706" stroke-width="1.4"/>')
  // ---- chips (the worked strip 2x² − 7x + 3) ----
  parts.push('<rect x="30" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="105" y="283" font-size="10.5" fill="#166534" text-anchor="middle">2x² − 7x + 3 = 0</text>')
  parts.push('<rect x="200" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="275" y="283" font-size="10.5" fill="#166534" text-anchor="middle">S = 7/2 · P = 3/2</text>')
  parts.push('<rect x="370" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="445" y="283" font-size="10" fill="#166534" text-anchor="middle">{1/2, 3}: 1/2 + 3 = 7/2; 1/2 · 3 = 3/2</text>')
  parts.push('<rect x="540" y="266" width="150" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="615" y="283" font-size="10" fill="#166534" text-anchor="middle">rebuild: 2(x² − 7x/2 + 3/2)</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">STANDARDIZE → READ OFF → CERTIFY → REBUILD. The strip certifies {1/2, 3} with two one-line checks — no solving.</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 6 (9.4): the sign map — three (S, P) regimes. Header         */
/* (30,18,660,44); panels (30,84,206,170), (257,84,206,170),           */
/* (484,84,206,170); chips (30,266,206,26), (257,266,206,26),          */
/* (484,266,206,26); caption band (30,304,660,24). Geometry pinned in  */
/* verify-book3-ch09.ts plan94Fig2.                                    */
/* ------------------------------------------------------------------ */

function signMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The sign map: P above zero with S above zero gives both roots positive, P above zero with S below zero gives both negative, P below zero forces opposite signs and two real roots — priced on three exhibits">'
  )
  // ---- header ----
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the sign map — what S and P reveal before any solving</text>')
  // ---- panel 1: both positive ----
  parts.push('<rect x="30" y="84" width="206" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="133" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">P &gt; 0, S &gt; 0</text>')
  parts.push('<text x="133" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">x² − 7x + 12:</text>')
  parts.push('<text x="133" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">S = 7 &gt; 0, P = 12 &gt; 0</text>')
  parts.push('<text x="133" y="168" font-size="10.5" fill="#65a30d" text-anchor="middle">→ {3, 4} — both positive</text>')
  parts.push('<text x="133" y="190" font-size="10" fill="#d97706" text-anchor="middle">same sign, both +</text>')
  parts.push('<text x="133" y="212" font-size="10" fill="#0f766e" text-anchor="middle">P &gt; 0: same sign;</text>')
  parts.push('<text x="133" y="228" font-size="10" fill="#0f766e" text-anchor="middle">S picks which</text>')
  // ---- panel 2: both negative ----
  parts.push('<rect x="257" y="84" width="206" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">P &gt; 0, S &lt; 0</text>')
  parts.push('<text x="360" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">x² + 7x + 12:</text>')
  parts.push('<text x="360" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">S = −7 &lt; 0, P = 12 &gt; 0</text>')
  parts.push('<text x="360" y="168" font-size="10.5" fill="#65a30d" text-anchor="middle">→ {−3, −4} — both negative</text>')
  parts.push('<text x="360" y="190" font-size="10" fill="#d97706" text-anchor="middle">same sign, both −</text>')
  parts.push('<text x="360" y="212" font-size="10" fill="#0f766e" text-anchor="middle">the mirror of the</text>')
  parts.push('<text x="360" y="228" font-size="10" fill="#0f766e" text-anchor="middle">first panel</text>')
  // ---- panel 3: opposite signs ----
  parts.push('<rect x="484" y="84" width="206" height="170" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="587" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">P &lt; 0 — OPPOSITE SIGNS</text>')
  parts.push('<text x="587" y="132" font-size="10.5" fill="#65a30d" text-anchor="middle">x² − x − 6:</text>')
  parts.push('<text x="587" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">P = −6 &lt; 0 → ac &lt; 0</text>')
  parts.push('<text x="587" y="168" font-size="10.5" fill="#65a30d" text-anchor="middle">→ Δ = b² − 4ac &gt; 0: both real</text>')
  parts.push('<text x="587" y="186" font-size="10.5" fill="#65a30d" text-anchor="middle">→ {3, −2}</text>')
  parts.push('<text x="587" y="212" font-size="10" fill="#dc2626" text-anchor="middle">P &lt; 0 forces Δ &gt; 0 —</text>')
  parts.push('<text x="587" y="228" font-size="10" fill="#dc2626" text-anchor="middle">both real, always</text>')
  // ---- chips ----
  parts.push('<rect x="30" y="266" width="206" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="133" y="283" font-size="10.5" fill="#166534" text-anchor="middle">P &gt; 0, S &gt; 0: both roots +</text>')
  parts.push('<rect x="257" y="266" width="206" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="360" y="283" font-size="10.5" fill="#166534" text-anchor="middle">P &gt; 0, S &lt; 0: both roots −</text>')
  parts.push('<rect x="484" y="266" width="206" height="26" rx="6" fill="#fef3c7" stroke="#fcd34d" stroke-width="1"/>')
  parts.push('<text x="587" y="283" font-size="10.5" fill="#166534" text-anchor="middle">P &lt; 0: mixed signs, Δ &gt; 0 forced</text>')
  // ---- caption band ----
  parts.push('<rect x="30" y="304" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="320" font-size="11" fill="#166534" text-anchor="middle">the product tells the sign story, the sum picks the quadrant; P &lt; 0 proves both roots real, and P = 0 names a zero root</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson94: Lesson = {
  id: 'al-roots-and-coefficients-viete-relations',
  number: '9.4',
  title: 'Roots and Coefficients: Viète’s Relations',
  concepts: [
    'Viète’s relations: S = −b/a, P = c/a',
    'the no-solve certification of roots',
    'building quadratics from S and P',
    'the a-family: infinitely many quadratics, one root set',
    'symmetric functions of the roots',
    'the difference identity (r₁ − r₂)² = Δ/a²',
    'the sign map of the roots',
  ],
  objectives: [
    'prove Viète’s relations S = −b/a and P = c/a from the quadratic formula, and re-prove them by the factor identity',
    'certify claimed roots — rational, irrational, or repeated — against both relations without solving anything',
    'build the monic quadratic with prescribed sum S and product P, and explain the a-family of shared-root quadratics',
    'compute symmetric functions of the roots (α² + β², 1/α + 1/β, (α − β)², α³ + β³) from S and P alone, exactly even for irrational roots',
    'read the sign map: P < 0 forces opposite real roots, P > 0 with S chooses the quadrant',
    'run the competition k-hunts — one root twice the other, roots differing by a given gap — as linear reads on S and P',
  ],
  prerequisites: ['al-the-quadratic-formula-and-the-discriminant', 'al-quadratics-and-factoring-solutions', 'al-completing-the-square-derived', 'al-the-three-verdicts-one-none-infinitely-many'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch4-quadratic', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Lesson 9.1 planted a seed and promised it a harvest: expanding $(x - r_1)(x - r_2) = x^2 - (r_1 + r_2)x + r_1 r_2$ showed the factored form is a READING device — the coefficient of $x$ is minus the sum of the roots, the constant is their product. That seed grew through 9.2’s completed squares and 9.3’s formula, and this lesson harvests it in general: for EVERY quadratic $ax^2 + bx + c = 0$ ($a \\neq 0$), the roots — whether they are integers, fractions, irrational surds, or a repeated collapse — satisfy' },
    { kind: 'derivation', title: 'Theorem — Viète’s relations', statement: 'If $r_1$ and $r_2$ are the roots of $ax^2 + bx + c = 0$ with $a \\neq 0$, then $r_1 + r_2 = -\\frac{b}{a}$ and $r_1 r_2 = \\frac{c}{a}$.', steps: [
      { label: 'Doors', explanation: 'By 9.3’s formula the two roots are $r_1 = \\frac{-b + \\sqrt{\\Delta}}{2a}$ and $r_2 = \\frac{-b - \\sqrt{\\Delta}}{2a}$ (the $\\Delta = 0$ case is the same line with both doors coinciding — the proof survives the collapse).' },
      { label: 'Sum', explanation: 'Add: the $\\pm\\sqrt{\\Delta}$ parts annihilate — $r_1 + r_2 = \\frac{-2b}{2a} = -\\frac{b}{a}$. The surd never survives the addition; that is why the sum needs no irrational arithmetic at all.' },
      { label: 'Product', explanation: 'Multiply — a difference of squares: $r_1 r_2 = \\frac{(-b)^2 - (\\sqrt{\\Delta})^2}{(2a)^2} = \\frac{b^2 - \\Delta}{4a^2} = \\frac{b^2 - (b^2 - 4ac)}{4a^2} = \\frac{4ac}{4a^2} = \\frac{c}{a}$.' },
      { label: 'Cross-proof', explanation: 'The factor identity gives the same reading without the formula: $a(x - r_1)(x - r_2) = a\\left(x^2 - (r_1 + r_2)x + r_1 r_2\\right)$ must EQUAL $ax^2 + bx + c$ coefficient by coefficient (9.1 priced this identity exactly), so $-a(r_1 + r_2) = b$ and $a \\cdot r_1 r_2 = c$.' },
    ], result: '$S = r_1 + r_2 = -\\frac{b}{a}, \\qquad P = r_1 r_2 = \\frac{c}{a}$ — Viète’s relations: the roots’ sum and product live in the coefficients.' },
    { kind: 'equation', latex: 'S = -\\frac{b}{a}, \\qquad P = \\frac{c}{a} \\qquad (a \\neq 0)', note: 'Viète’s relations — read off the standard form with one division each; no solving, no factoring, no formula' },
    { kind: 'para', text: 'Worth pausing on is what the proof DID NOT do: it never solved anything. The sum needed only the $\\pm$ doors to annihilate each other — the symmetry that put them there takes them back; the product needed only the difference-of-squares pattern $(u+v)(u-v) = u^2 - v^2$, the chapter-4 identity wearing its field clothes. Every hard-looking piece of the formula (the surd, the division by $2a$, the sign of $b$) cancels or organizes itself before the answer lands. That is the deepest reason the relations work for EVERY quadratic: they live upstream of the solving, in the algebra of the coefficients themselves — and the $a \\neq 0$ clause quietly licenses the one division each relation carries.' },
    { kind: 'para', text: 'Two readings make the line usable at sight. MONIC quadratics ($a = 1$) need no division at all: $S = -b$ and $P = c$ — the sum is minus the middle coefficient, the product is the constant. Non-monic quadratics divide once: for $2x^2 - 7x + 3$ the readout is $S = \\frac{7}{2}$, $P = \\frac{3}{2}$ — and the verifier re-certified 9.3’s doors $\\{\\frac{1}{2}, 3\\}$ against both: $\\frac{1}{2} + 3 = \\frac{7}{2}$ and $\\frac{1}{2} \\cdot 3 = \\frac{3}{2}$. The relations are the fastest certificate in the chapter: a claimed root set is WRONG if it fails either test, and it is COMPLETE if it passes both (a quadratic cannot hide a third root — 9.1’s two-door bound).' },
    { kind: 'para', text: 'The monic shortcut also closes a loop back to 9.1. There, the sum-product hunt asked for two numbers with a given sum and product — find them, and the trinomial factors. This lesson names the machinery: the hunted numbers ARE $S = -b$ and $P = c$, and the factored form $(x - r_1)(x - r_2)$ is the rebuild read backwards. The 9.1 exercises hunted $S$ and $P$ by intuition; the relations make the hunt a formula — and the verify-first engines of this chapter priced the agreement on eight monic exhibits back in run 83, before any of this prose existed. What was a scanning trick in chapter 4 and a reading device in 9.1 is now a theorem with a proof and a field of applications.' },
    { kind: 'example', title: 'Certify the doors {1/2, 3} for 2x² − 7x + 3 = 0 without solving', steps: [
      'Read off the standard form: $S = -\\frac{-7}{2} = \\frac{7}{2}$, $P = \\frac{3}{2}$.',
      'Sum test: $\\frac{1}{2} + 3 = \\frac{7}{2}$ — passes.',
      'Product test: $\\frac{1}{2} \\cdot 3 = \\frac{3}{2}$ — passes.',
      'Both tests plus the two-door bound certify the set exactly — the same verdict 9.3 reached by the formula and 9.1 would reach by factoring, now reached with zero arithmetic beyond two one-line checks.',
    ] },
    { kind: 'example', title: 'Certify the irrational roots 3 ± √5 of x² − 6x + 4 = 0 — without solving', steps: [
      'Read: $S = 6$, $P = 4$ (monic).',
      'Sum in the field: $(3 + \\sqrt{5}) + (3 - \\sqrt{5}) = 6$ — the surd parts annihilate, exactly as the derivation promised.',
      'Product in the field: $(3 + \\sqrt{5})(3 - \\sqrt{5}) = 9 - 5 = 4$ — a difference of squares, exact.',
      'Hence $3 \\pm \\sqrt{5}$ is the complete root set — certified WITHOUT ever computing $\\sqrt{20}$ or dividing by $2a$. This is the no-solve dividend: the relations hold in the field, so irrational roots certify as cheaply as integer ones.',
    ] },
    { kind: 'example', title: 'Read the roots of x² − 7x = 0 off the relations alone', steps: [
      'The constant term is $0$, so $P = 0$ — the product of the roots vanishes.',
      'A product is zero only when a factor is zero (9.1’s law, proved both directions): one root IS $0$.',
      'The sum then names the other: $S = 7 = 0 + r$, so $r = 7$.',
      'Hence $\\{0, 7\\}$ — the forbidden-divide audit of 9.1 ($x^2 = 3x \\to \\{0, 3\\}$), returned as a coefficient reading: $P = 0$ is the fingerprint of a zero root.',
    ] },
    { kind: 'terms', items: [
      { term: 'Viète’s relations', def: 'the identities $S = r_1 + r_2 = -\\frac{b}{a}$ and $P = r_1 r_2 = \\frac{c}{a}$ binding the roots of $ax^2 + bx + c = 0$ to its coefficients — proved from the formula and re-proved by the factor identity, valid for irrational and repeated roots included.' },
      { term: 'the sum S', def: 'minus the middle coefficient over the leading one. For monic quadratics simply $S = -b$ — the fastest read in algebra.' },
      { term: 'the product P', def: 'the constant term over the leading one. For monic quadratics $P = c$. $P = 0$ fingerprints a zero root; $P < 0$ forces opposite signs and two real roots.' },
      { term: 'symmetric function', def: 'an expression in the roots that survives swapping them — $\\alpha^2 + \\beta^2$, $\\frac{1}{\\alpha} + \\frac{1}{\\beta}$, $(\\alpha - \\beta)^2$, $\\alpha^3 + \\beta^3$. Every symmetric function is computable from S and P alone, no solving.' },
      { term: 'the monic rebuild', def: 'given S and P, the unique monic quadratic with those roots: $x^2 - Sx + P$. Scaling by any $a \\neq 0$ gives the a-family — infinitely many quadratics, one root set.' },
      { term: 'the difference identity', def: '$(r_1 - r_2)^2 = S^2 - 4P = \\frac{\\Delta}{a^2}$ — the squared gap between the roots is the discriminant dressed in relations; the bridge between 9.3’s verdict machine and this lesson’s readout.' },
    ] },
    { kind: 'heading', text: 'Building Quadratics from S and P' },
    { kind: 'para', text: 'The relations run backwards, and the reverse direction is where competitions live. To BUILD a quadratic whose roots behave a prescribed way, translate the behavior into $S$ and $P$, then write the monic rebuild $x^2 - Sx + P$ — its expansion is exactly the $(x - r_1)(x - r_2)$ identity of 9.1 with the roles reversed. The design is honest twice over: the rebuild expands to a genuine quadratic with the prescribed S and P (the verifier certified four rebuilds coefficient by coefficient), and its doors open onto roots that pass both tests. One warning keeps it truthful: S and P determine the MONIC quadratic — multiplying by any $a \\neq 0$ gives $a(x^2 - Sx + P)$, the same roots in a new dress. "Find THE quadratic" in an exam means the monic one unless the examiner says otherwise; the a-family is the honest infinity behind every such answer.' },
    { kind: 'example', title: 'Build the monic quadratic whose roots sum to 2 and multiply to −15', steps: [
      'Translate: $S = 2$, $P = -15$.',
      'Rebuild: $x^2 - Sx + P = x^2 - 2x - 15$.',
      'Verify by factoring: $(x - 5)(x + 3) = x^2 - 2x - 15$ — roots $5$ and $-3$; check the tests: $5 + (-3) = 2$, $5 \\cdot (-3) = -15$.',
      'The a-family: $2x^2 - 4x - 30$, $3x^2 - 6x - 45$, … all share the roots $\\{5, -3\\}$ — the verifier priced the zero-set preservation pointwise across the census.',
    ] },
    { kind: 'example', title: 'Build the quadratic whose roots are 1 ± √2 — 9.2’s answer, designed', steps: [
      'Sum in the field: $(1 + \\sqrt{2}) + (1 - \\sqrt{2}) = 2$, so $S = 2$.',
      'Product in the field: $(1 + \\sqrt{2})(1 - \\sqrt{2}) = 1 - 2 = -1$, so $P = -1$.',
      'Rebuild: $x^2 - 2x - 1$ — exactly the quadratic whose completing-the-square solve gave $1 \\pm \\sqrt{2}$ in lesson 9.2.',
      'The direction reverses honestly: 9.2 SOLVED and landed on surds; here the surds are prescribed and the quadratic is DESIGNED. One identity, both directions — and the verifier certified the field product exactly.',
    ] },
    { kind: 'example', title: 'Build the quadratic with S = 0 and P = 5 — and read it honestly', steps: [
      'Rebuild: $x^2 - 0 \\cdot x + 5 = x^2 + 5$.',
      'Ask the discriminant (9.3): $\\Delta = 0^2 - 20 = -20 < 0$ — no real roots.',
      'The build is not a failure: $x^2 + 5$ is a genuine quadratic carrying $S = 0$ and $P = 5$ for its COMPLEX roots — but over the reals it has no doors, and 9.3’s verdict machine said so before any search.',
      'The lesson: the relations BUILD faithfully even where the real line refuses to answer — designing an impossibility is itself an exact act, and the discriminant is the honesty check.',
    ] },
    { kind: 'para', text: 'The repeated root has its own relation dress. If the roots coincide at $r$, then $S = 2r$ and $P = r^2$ — so $r = \\frac{S}{2}$ and the consistency demand is $\\left(\\frac{S}{2}\\right)^2 = P$. For $x^2 - 6x + 9$: $\\frac{S}{2} = 3$ and $3^2 = 9 = P$ — the collapse certified by the relations alone, no fold needed. The consistency demand is 9.3’s $\\Delta = 0$ in S/P clothing: $\\left(\\frac{S}{2}\\right)^2 - P = \\frac{S^2 - 4P}{4} = \\frac{\\Delta}{4a^2}$ at $a$-scaled size. One collapse, two descriptions — the chapter’s languages agreeing.' },
    { kind: 'heading', text: 'Symmetric Functions: the Competition Payoff' },
    { kind: 'para', text: 'Here is the discipline’s payoff. An expression in the roots is SYMMETRIC when swapping the roots leaves it unchanged — and every symmetric expression is a function of $S$ and $P$ alone, because those two numbers are exactly the symmetric data a quadratic carries. The four workhorses, each verified by the engines in both the relation form and the field form:' },
    { kind: 'para', text: 'One guard keeps the quartet honest: the reciprocal read $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{S}{P}$ divides by $P$, so it speaks only when $P \\neq 0$ — the same excluded-value discipline that 8.1 nailed onto every rational expression and 5.1 nailed onto every balance move. When $P = 0$ a root is zero (the zero-product door), and $\\frac{1}{\\alpha}$ simply does not exist; the relation is not wrong, it is OUT OF SCOPE, and saying so is the correctness. The other three members divide by nothing but $a$ and the ever-safe $2$ — they stand for every quadratic. Guards named before use, scope checked before divide: the fraction craft of chapter 8, now carried inside a theorem.' },
    { kind: 'equation', latex: '\\alpha^2 + \\beta^2 = S^2 - 2P, \\qquad \\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{S}{P}, \\qquad (\\alpha - \\beta)^2 = S^2 - 4P, \\qquad \\alpha^3 + \\beta^3 = S^3 - 3PS', note: 'the symmetric-function quartet — P ≠ 0 for the reciprocal read; the last two ride the difference-of-squares and the cube pattern' },
    { kind: 'para', text: 'Watch them work on $x^2 - 6x + 4$, whose roots $3 \\pm \\sqrt{5}$ are irrational — the point where solving would be slow and the relations are instant. $\\alpha^2 + \\beta^2 = 36 - 8 = 28$: the verifier confirmed $(14 + 6\\sqrt{5}) + (14 - 6\\sqrt{5}) = 28$ in the field, the surds annihilating exactly as promised. $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{6}{4} = \\frac{3}{2}$ — field-checked through the rationalized reciprocals $\\frac{3 \\mp \\sqrt{5}}{4}$. $(\\alpha - \\beta)^2 = 36 - 16 = 20 = (2\\sqrt{5})^2$. $\\alpha^3 + \\beta^3 = 216 - 72 = 144$ — field-checked as $(72 + 32\\sqrt{5}) + (72 - 32\\sqrt{5})$. Four answers, zero solves, every one exact.' },
    { kind: 'table', caption: 'The Viète ledger, priced by the verifier: sum and product certify every kind of root set — rational, irrational, repeated, and the zero-product door', head: ['Quadratic', 'S', 'P', 'The roots', 'Both tests'], rows: [
      ['$2x^2 - 7x + 3$', '$\\frac{7}{2}$', '$\\frac{3}{2}$', '$\\{\\frac{1}{2}, 3\\}$', '$\\frac{7}{2}$, $\\frac{3}{2}$ — pass'],
      ['$x^2 - 6x + 4$', '$6$', '$4$', '$3 \\pm \\sqrt{5}$', '$6$, $9 - 5 = 4$ — pass (in the field)'],
      ['$x^2 - 6x + 9$', '$6$', '$9$', '$\\{3\\}$ repeated', '$\\frac{S}{2} = 3$, $(\\frac{S}{2})^2 = 9$ — pass'],
      ['$3x^2 + 5x - 2$', '$-\\frac{5}{3}$', '$-\\frac{2}{3}$', '$\\{\\frac{1}{3}, -2\\}$', '$-\\frac{5}{3}$, $-\\frac{2}{3}$ — pass'],
      ['$x^2 - 7x$', '$7$', '$0$', '$\\{0, 7\\}$', '$P = 0$ names the zero root'],
    ] },
    { kind: 'callout', tone: 'insight', title: 'Insight — the sign map: reading the roots’ character before they exist', text: 'The product $P$ tells the sign story by itself. $P < 0$ means $c$ and $a$ disagree in sign, so $ac < 0$ and $\\Delta = b^2 - 4ac > b^2 \\geq 0$ — BOTH roots are real, always, no solving needed, and being a negative product they have OPPOSITE signs: $x^2 - x - 6$ carries $P = -6$ and opens onto $\\{3, -2\\}$. $P > 0$ says same signs, and $S$ picks the quadrant: $S > 0$ both positive ($x^2 - 7x + 12$, the pair $\\{3, 4\\}$), $S < 0$ both negative ($x^2 + 7x + 12$, the pair $\\{-3, -4\\}$). $P = 0$ is the zero-root door. Three regimes, read off two coefficients — the 9.3 verdict machine answered HOW MANY; the sign map answers WHAT KIND.' },
    { kind: 'para', text: 'The $P < 0$ branch deserves its proof spelled out, because it is the chapter’s cleanest no-solve theorem. If $P = \\frac{c}{a} < 0$, then $c$ and $a$ have opposite signs, so $ac < 0$ and $-4ac > 0$; hence $\\Delta = b^2 - 4ac = b^2 + (-4ac) > b^2 \\geq 0$ — strictly positive, in fact, since $-4ac$ cannot vanish. Two distinct real doors, GUARANTEED, from the sign of one coefficient ratio. And the doors’ signs are forced too: a negative product of two real numbers demands one negative factor, so the roots straddle zero. The verifier priced the whole chain on $x^2 - x - 6$: $P = -6 < 0$, $\\Delta = 25 > 0$ — forced, not computed — and the doors $\\{3, -2\\}$ straddle zero exactly as the map promises.' },
    { kind: 'figure', caption: 'The Viète readout machine: standardize, read off S = −b/a and P = c/a, certify claimed roots by both tests, and rebuild a(x² − Sx + P) — the strip certifies 9.3’s doors {1/2, 3} with two one-line checks.', svg: vieteReadoutSvg() },
    { kind: 'para', text: 'The readout machine is also the fastest ERROR CATCHER in the chapter. A student who solves $2x^2 - 7x + 3 = 0$ and reports $\\{\\frac{3}{2}, 2\\}$ fails the sum test instantly ($\\frac{3}{2} + 2 = \\frac{7}{2}$ happens to pass — so run the product: $\\frac{3}{2} \\cdot 2 = 3 \\neq \\frac{3}{2}$, REFUSED). A student who drops the minus door of $x^2 - 2x - 4$ and reports only $1 + \\sqrt{5}$ fails the sum test ($1 + \\sqrt{5} \\neq 2$). The relations catch the two classic blunders — the invented root and the half verdict — in one line each, which is why every exercise in this set asks for the tests, not just the roots.' },
    { kind: 'heading', text: 'The Gap Between the Roots' },
    { kind: 'para', text: 'The difference identity also generalizes the ratio hunts. If the roots sit in a fixed ratio $m : n$ (positive integers), name them $m\\alpha$ and $n\\alpha$: the sum reads $(m + n)\\alpha = S$, so $\\alpha = \\frac{S}{m+n}$, and the product names the missing coefficient: $P = mn\\alpha^2 = \\frac{mn\\,S^2}{(m+n)^2}$. The twice-the-other case is $m : n = 1 : 2$; the equal-roots case is $1 : 1$, where $\\alpha = \\frac{S}{2}$ and $P = \\frac{S^2}{4}$ — the repeated-root consistency of the last section, seen as the ratio hunt’s neutral case. One template, every ratio question the examination bank stocks; the exercises work the $1:2$ case end to end.' },
    { kind: 'example', title: 'The k-hunt: one root of x² − 4x + k = 0 is twice the other', steps: [
      'Name the roots $\\alpha$ and $2\\alpha$ (which is which does not matter — the relations are symmetric).',
      'The sum reads $3\\alpha = 4$, so $\\alpha = \\frac{4}{3}$ and the roots are $\\frac{4}{3}$ and $\\frac{8}{3}$.',
      'The product names $k$: $k = 2\\alpha^2 = 2 \\cdot \\frac{16}{9} = \\frac{32}{9}$.',
      'Full check: $x^2 - 4x + \\frac{32}{9}$ has $\\Delta = 16 - \\frac{128}{9} = \\frac{16}{9}$, doors $\\frac{4 \\pm \\frac{4}{3}}{2} = \\{\\frac{4}{3}, \\frac{8}{3}\\}$ — and $\\frac{8}{3} = 2 \\cdot \\frac{4}{3}$ exactly; the gap $\\frac{4}{3}$ matches the difference identity $\\sqrt{\\Delta}/a = \\frac{4}{3}$.',
    ] },
    { kind: 'para', text: 'That last check deserves its own sentence because it closes the chapter’s circle. The gap between the doors is $r_1 - r_2 = \\frac{\\sqrt{\\Delta}}{a}$ — 9.3’s formula read as a distance — and squaring it gives the relation dress: $(r_1 - r_2)^2 = \\frac{\\Delta}{a^2} = S^2 - 4P$. The verifier priced the identity on three exhibits: $x^2 - 7x + 12$ (gap $1 = \\sqrt{1}$), $2x^2 - 7x + 3$ (gap $\\frac{5}{2}$, squared $\\frac{25}{4} = \\frac{\\Delta}{a^2}$), and $x^2 - 4x + 1$ (gap $2\\sqrt{3}$, squared $12 = \\Delta$ — the irrational gap measured exactly in the field). For a monic quadratic "the roots differ by $d$" is therefore the clean condition $p^2 - 4q = d^2$ — 9.3’s L5 exercise ($p = \\pm 7$), now a theorem instead of a trick.' },
    { kind: 'figure', caption: 'The sign map: P < 0 forces opposite signs and both-real roots (Δ > 0 for free); P > 0 means same signs with S picking the quadrant; P = 0 is the zero-root door. Three regimes, two coefficients, no solving.', svg: signMapSvg() },
    { kind: 'para', text: 'And with that, the chapter’s four lessons click into one machine. Chapter 4’s factorization is 9.1’s engine when the integers cooperate; 9.2’s completed square is the method that never refuses and the proof engine behind everything; 9.3’s formula is 9.2 performed once on letters, with the discriminant reading the verdict before the doors; and 9.4’s relations are the formula’s shadow cast back onto the coefficients — sum, product, gap, and sign, all readable without opening a single door. Four methods, one object, zero contradictions: every lesson’s verdicts agree with every other’s, and the verifier priced the agreements exhibit by exhibit. The examination strategy writes itself from the structure: read $S$ and $P$ first, read $\\Delta$ second, and only then choose the cheapest door — factoring when $\\Delta$ is a perfect square, the formula otherwise, and the relations for every question that never needed the roots at all.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      'Viète’s relations: $S = -\\frac{b}{a}$, $P = \\frac{c}{a}$ — proved from the formula (the ± annihilates in the sum, the difference of squares in the product) and re-proved by the factor identity.',
      'Certification without solving: claimed roots must pass BOTH tests; passing both plus the two-door bound is a complete certificate — irrational roots included (the field arithmetic is exact).',
      'Building: prescribed root behavior translates to $(S, P)$; the monic rebuild $x^2 - Sx + P$ carries it; scaling by $a \\neq 0$ gives the a-family with the same roots.',
      'Symmetric functions are functions of $(S, P)$ alone: $\\alpha^2 + \\beta^2 = S^2 - 2P$, $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{S}{P}$, $(\\alpha - \\beta)^2 = S^2 - 4P$, $\\alpha^3 + \\beta^3 = S^3 - 3PS$.',
      'The sign map: $P < 0$ forces opposite real roots ($\\Delta > 0$ for free); $P > 0$ same signs with $S$ picking the quadrant; $P = 0$ the zero root; the gap between roots is $\\sqrt{\\Delta}/a$.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the lawyer who lettered algebra', text: 'François Viète (1540–1603), a French royal lawyer who broke Spanish ciphers on the side, published In artem analyticem isagoge (1591) — the book that gave algebra its letters: consonants for known quantities, vowels for unknowns, and a program of manipulating symbolic forms by lawful rules rather than words. His root-coefficient relations for quadratics and cubics circulated in that school; the GENERAL statement for polynomials of every degree was published by Albert Girard in 1629, which is why historians credit both — the relations carry Viète’s name because his lettering made them stateable at all. Newton’s symmetric-function identities later grew the quartet of this lesson into a general theory. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope, SSC/bank preliminaries, JEE-Main foundations) drills this lesson harder than any other in the chapter, under the heading "roots and coefficients": (1) instant reads — $S$ and $P$ for a given quadratic, one division each; (2) symmetric hunts — $\\alpha^2 + \\beta^2$, $\\frac{1}{\\alpha} + \\frac{1}{\\beta}$, $(\\alpha - \\beta)^2$, $\\alpha^3 + \\beta^3$ computed from $S$ and $P$ without finding the roots, with the reciprocal read guarded by $P \\neq 0$; (3) build items — "form the quadratic whose roots are …", including irrational pairs like $1 \\pm \\sqrt{2}$ where the field product does the work; (4) condition k-hunts — one root twice the other ($3\\alpha = S$, $k = 2\\alpha^2$), roots in a given ratio, roots differing by $d$ ($p^2 - 4q = d^2$ for the monic case); (5) sign-map items — "without solving, state the nature of the roots" answered by $P$ and $S$. The relations are the highest-yield two lines in competitive algebra; every exercise above runs at least one of them.' },
    { kind: 'formula', name: 'Viète’s relations', latex: 'S = r_1 + r_2 = -\\frac{b}{a}, \\qquad P = r_1 r_2 = \\frac{c}{a}', note: 'the roots’ sum and product read off the standard form — monic shortcuts: S = −b, P = c' },
    { kind: 'formula', name: 'The symmetric-function quartet', latex: '\\alpha^2 + \\beta^2 = S^2 - 2P, \\quad \\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{S}{P}, \\quad (\\alpha - \\beta)^2 = S^2 - 4P, \\quad \\alpha^3 + \\beta^3 = S^3 - 3PS', note: 'every symmetric expression in the roots is a function of S and P alone — no solving, exact even for irrational roots' },
    { kind: 'formula', name: 'The difference identity', latex: '(r_1 - r_2)^2 = S^2 - 4P = \\frac{\\Delta}{a^2}', note: 'the squared gap between the doors — 9.3’s discriminant in relation dress; "roots differ by d" ⟺ p² − 4q = d² (monic)' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The sum $S$ of the roots of $3x^2 + 5x - 2 = 0$ is', options: ['$\\frac{5}{3}$', '$-\\frac{5}{3}$', '$5$', '$-\\frac{2}{3}$'], answer: 1, explain: '$S = -\\frac{b}{a} = -\\frac{5}{3}$ — the minus is part of the readout, and the division by $a = 3$ is not optional. $\\frac{5}{3}$ drops the sign; $5$ forgets the divide; $-\\frac{2}{3}$ is $P$ (the product $\\frac{c}{a}$), not $S$.' },
      { q: 'The monic quadratic whose roots sum to 5 and multiply to 6 is', options: ['$x^2 + 5x + 6$', '$x^2 - 5x - 6$', '$x^2 - 5x + 6$', '$x^2 + 5x - 6$'], answer: 2, explain: 'The rebuild is $x^2 - Sx + P = x^2 - 5x + 6$ — the minus rides on $S$, the product lands as-is. $x^2 + 5x + 6$ has $S = -5$; $x^2 - 5x - 6$ has $P = -6$; $x^2 + 5x - 6$ has both wrong. (Its roots are $2$ and $3$ — $2 + 3 = 5$, $2 \\cdot 3 = 6$.)' },
      { q: '$\\alpha, \\beta$ are the roots of $x^2 - 6x + 4$. Without solving, $\\alpha^2 + \\beta^2 =$', options: ['$36$', '$20$', '$44$', '$28$'], answer: 3, explain: '$\\alpha^2 + \\beta^2 = S^2 - 2P = 36 - 8 = 28$. The 36 is $S^2$ alone (forgetting to subtract $2P$); 20 is $(\\alpha - \\beta)^2 = S^2 - 4P$ (the wrong member of the quartet); 44 ADDS $2P$ instead of subtracting.' },
      { q: 'If the product $P = \\frac{c}{a}$ of a quadratic’s roots is negative, the roots', options: ['are both positive', 'are both negative', 'have opposite signs — and both are real', 'cannot exist'], answer: 2, explain: '$P < 0$ means $ac < 0$, so $\\Delta = b^2 - 4ac > b^2 \\geq 0$: both roots are REAL (forced, no solving), and a negative product with nonzero factors means opposite signs — $x^2 - x - 6$ opens onto $\\{3, -2\\}$. Same-sign pairs force $P > 0$; the roots certainly exist.' },
      { q: 'The quadratic with roots $1 \\pm \\sqrt{2}$ — lesson 9.2’s answer — is', options: ['$x^2 + 2x - 1$', '$x^2 - 2x - 1$', '$x^2 - 2x + 1$', '$x^2 + x - 1$'], answer: 1, explain: 'The field reads give $S = (1 + \\sqrt{2}) + (1 - \\sqrt{2}) = 2$ and $P = (1 + \\sqrt{2})(1 - \\sqrt{2}) = 1 - 2 = -1$, so the rebuild is $x^2 - 2x - 1$. $x^2 - 2x + 1$ has $P = +1$ (the sign slip in the difference of squares) and factors as $(x-1)^2$; the $+2x$ forms have $S = -2$.' },
    ] },
    { kind: 'exercises', title: 'Exercises 9.4', sets: [
      { level: 'L1', questions: [
        { q: 'Read $S$ and $P$ for $x^2 - 9x + 20 = 0$, then name the roots they certify.', solution: [
          'Monic: $S = -b = 9$, $P = c = 20$.',
          'Hunt the integer pair with sum $9$ and product $20$: $4$ and $5$.',
          'Both tests: $4 + 5 = 9$, $4 \\cdot 5 = 20$ — the set $\\{4, 5\\}$ is certified.',
        ], answer: '$S = 9$, $P = 20$; the roots are $4$ and $5$.' },
        { q: 'Read $S$ and $P$ for $3x^2 + 5x - 2 = 0$, then certify the claimed roots $\\{\\frac{1}{3}, -2\\}$.', solution: [
          'Divide once: $S = -\\frac{5}{3}$, $P = -\\frac{2}{3}$.',
          'Sum test: $\\frac{1}{3} + (-2) = -\\frac{5}{3}$ — passes.',
          'Product test: $\\frac{1}{3} \\cdot (-2) = -\\frac{2}{3}$ — passes; the set is certified (the verifier also priced both roots in the original polynomial).',
        ], answer: '$S = -\\frac{5}{3}$, $P = -\\frac{2}{3}$; the claimed roots pass both tests.' },
        { q: 'Read $S$ and $P$ for $x^2 - 7x = 0$ and explain what $P = 0$ tells you before any factoring.', solution: [
          'Monic with $c = 0$: $S = 7$, $P = 0$.',
          '$P = 0$ means the product of the roots vanishes — so a root IS $0$ (the zero-product law, 9.1).',
          'The sum names the partner: $7 = 0 + r$, so $r = 7$; the roots are $\\{0, 7\\}$.',
        ], answer: '$S = 7$, $P = 0$: the fingerprint of a zero root — the roots are $0$ and $7$.' },
      ] },
      { level: 'L2', questions: [
        { q: 'A student claims the roots of $x^2 - 7x + 12 = 0$ are $\\{3, 4\\}$. Certify or refuse — no solving.', solution: [
          'Read: $S = 7$, $P = 12$.',
          'Sum: $3 + 4 = 7$ — passes. Product: $3 \\cdot 4 = 12$ — passes.',
          'Two doors cannot hide a third root, so the certified set is complete.',
        ], answer: 'Certified: $\\{3, 4\\}$ passes both tests and the two-door bound.' },
        { q: 'A student claims the roots of $2x^2 - 7x + 3 = 0$ are $\\{\\frac{3}{2}, 2\\}$. Certify or refuse — no solving.', solution: [
          'Read: $S = \\frac{7}{2}$, $P = \\frac{3}{2}$.',
          'Sum: $\\frac{3}{2} + 2 = \\frac{7}{2}$ — passes (the trap: the sum alone is not enough).',
          'Product: $\\frac{3}{2} \\cdot 2 = 3 \\neq \\frac{3}{2}$ — REFUSED. The true doors are $\\{\\frac{1}{2}, 3\\}$ (9.3’s formula verdict).',
        ], answer: 'Refused: the product test fails ($3 \\neq \\frac{3}{2}$); the true roots are $\\frac{1}{2}$ and $3$.' },
        { q: 'Certify the repeated root of $x^2 - 6x + 9 = 0$ using the relations alone.', solution: [
          'Read: $S = 6$, $P = 9$.',
          'The repeated-root consistency: $r = \\frac{S}{2} = 3$, and the demand is $(\\frac{S}{2})^2 = P$ — $9 = 9$, passes.',
          'Hence the root $3$ counted twice — the collapse certified without expanding any square.',
        ], answer: '$\\frac{S}{2} = 3$ and $(\\frac{S}{2})^2 = 9 = P$: the repeated root $3$, certified.' },
      ] },
      { level: 'L3', questions: [
        { q: 'Build the monic quadratic whose roots sum to 2 and multiply to −15, and name its roots.', solution: [
          'Rebuild: $x^2 - 2x - 15$.',
          'Factor to check: $(x - 5)(x + 3)$ — roots $5$ and $-3$.',
          'Both tests: $5 + (-3) = 2 = S$, $5 \\cdot (-3) = -15 = P$ — the design is certified.',
        ], answer: '$x^2 - 2x - 15$, roots $5$ and $-3$.' },
        { q: 'Build the monic quadratic whose roots sum to −1 and multiply to −6.', solution: [
          'Rebuild: $x^2 + x - 6$.',
          'Factor to check: $(x + 3)(x - 2)$ — roots $-3$ and $2$.',
          'Both tests: $-3 + 2 = -1 = S$, $(-3) \\cdot 2 = -6 = P$ — certified.',
        ], answer: '$x^2 + x - 6$, roots $-3$ and $2$.' },
        { q: 'Build the monic quadratic with $S = 0$ and $P = 5$, and read the discriminant verdict on it.', solution: [
          'Rebuild: $x^2 - 0 \\cdot x + 5 = x^2 + 5$.',
          'Discriminant: $\\Delta = 0 - 20 = -20 < 0$ — no real roots (9.3’s verdict, before any search).',
          'The build is faithful: $S = 0$ and $P = 5$ hold for its (complex) roots; over the reals the design describes an impossibility — and says so honestly.',
        ], answer: '$x^2 + 5$; $\\Delta = -20 < 0$ — built, but rootless over the reals.' },
      ] },
      { level: 'L4', questions: [
        { q: 'For $x^2 - 5x + 6 = 0$ compute $\\alpha^2 + \\beta^2$ without solving, then confirm against the roots $2, 3$.', solution: [
          'Read: $S = 5$, $P = 6$.',
          'The relation: $\\alpha^2 + \\beta^2 = S^2 - 2P = 25 - 12 = 13$.',
          'Confirm at the roots: $2^2 + 3^2 = 4 + 9 = 13$ — the relation and the direct computation agree.',
        ], answer: '$\\alpha^2 + \\beta^2 = 13$.' },
        { q: 'For $x^2 - 5x + 6 = 0$ compute $(\\alpha - \\beta)^2$ without solving, and deduce the gap between the roots.', solution: [
          'The relation: $(\\alpha - \\beta)^2 = S^2 - 4P = 25 - 24 = 1$.',
          'The gap is the positive root of the square: $|\\alpha - \\beta| = 1$.',
          'Confirm: $3 - 2 = 1$ — and note $\\sqrt{\\Delta}/a = \\sqrt{1}/1 = 1$, the difference identity agreeing.',
        ], answer: '$(\\alpha - \\beta)^2 = 1$; the gap between the roots is $1$.' },
        { q: 'For $x^2 - 5x + 6 = 0$ compute $\\frac{1}{\\alpha} + \\frac{1}{\\beta}$ without solving, and confirm at the roots.', solution: [
          'The relation (needs $P \\neq 0$ — true here): $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{S}{P} = \\frac{5}{6}$.',
          'Confirm at the roots: $\\frac{1}{2} + \\frac{1}{3} = \\frac{3 + 2}{6} = \\frac{5}{6}$.',
          'The mechanics behind the relation: $\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{\\alpha + \\beta}{\\alpha\\beta} = \\frac{S}{P}$ — one line of fraction craft (8.1’s union), one line of Viète.',
        ], answer: '$\\frac{1}{\\alpha} + \\frac{1}{\\beta} = \\frac{5}{6}$.' },
      ] },
      { level: 'L5', questions: [
        { q: 'One root of $x^2 - 4x + k = 0$ is twice the other. Find $k$ and both roots.', solution: [
          'Name the roots $\\alpha$ and $2\\alpha$: the sum reads $3\\alpha = 4$, so $\\alpha = \\frac{4}{3}$.',
          'The roots are $\\frac{4}{3}$ and $\\frac{8}{3}$; the product names $k$: $k = 2\\alpha^2 = 2 \\cdot \\frac{16}{9} = \\frac{32}{9}$.',
          'Full check: $\\Delta = 16 - \\frac{128}{9} = \\frac{16}{9}$, doors $\\frac{4 \\pm \\frac{4}{3}}{2} = \\{\\frac{4}{3}, \\frac{8}{3}\\}$ — and $\\frac{8}{3} = 2 \\cdot \\frac{4}{3}$ exactly.',
        ], answer: '$k = \\frac{32}{9}$; the roots are $\\frac{4}{3}$ and $\\frac{8}{3}$.' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the difference identity $(r_1 - r_2)^2 = S^2 - 4P = \\frac{\\Delta}{a^2}$, and use it to read the gap between the roots of $x^2 - 4x + 1 = 0$ exactly.', solution: [
          'Subtract the doors of the formula: $r_1 - r_2 = \\frac{-b + \\sqrt{\\Delta}}{2a} - \\frac{-b - \\sqrt{\\Delta}}{2a} = \\frac{2\\sqrt{\\Delta}}{2a} = \\frac{\\sqrt{\\Delta}}{a}$ — the gap is the discriminant’s root, scaled by $a$. Squaring gives the identity; in relation dress, $S^2 - 4P = \\frac{(r_1+r_2)^2 - 4r_1 r_2}{1} = (r_1 - r_2)^2$ by the difference of squares.',
          'Apply to $x^2 - 4x + 1$: $\\Delta = 12$, so the gap is $\\sqrt{12} = 2\\sqrt{3}$ — irrational, and exact.',
          'Field check: the doors are $2 \\pm \\sqrt{3}$; their difference is $2\\sqrt{3}$ and $(2\\sqrt{3})^2 = 12 = \\Delta$ — the verifier certified the field arithmetic.',
          'The systematic read: for a monic $x^2 + px + q$, "the roots differ by $d$" is the condition $p^2 - 4q = d^2$ — 9.3’s $p = \\pm 7$ hunt, now a theorem.',
        ], answer: '$(r_1 - r_2)^2 = S^2 - 4P = \\frac{\\Delta}{a^2}$; the roots of $x^2 - 4x + 1$ differ by $2\\sqrt{3}$.' },
      ] },
    ] },
  ],
}

export const chapter09: Chapter = {
  number: 9,
  slug: 'quadratic-equations',
  title: 'Quadratic Equations',
  summary:
    'The summit, met four ways: solution by factoring, completing the square DERIVED as the identity working in reverse, the quadratic formula PROVED and its discriminant read as a three-way verdict (two real, one repeated, none real — √2 finally an answer, ANS ch. 8’s exile reversed), and Viète’s roots-and-coefficients relations proved and put to competition work.',
  status: 'complete',
  lessons: [lesson91, lesson92, lesson93, lesson94],
}
