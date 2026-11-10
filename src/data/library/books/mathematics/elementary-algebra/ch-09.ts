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
 *                 G authored, E2E e2e-al-92 x3 viewports).
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

export const chapter09: Chapter = {
  number: 9,
  slug: 'quadratic-equations',
  title: 'Quadratic Equations',
  summary:
    'The summit, met four ways: solution by factoring, completing the square DERIVED as the identity working in reverse, the quadratic formula PROVED and its discriminant read as a three-way verdict (two real, one repeated, none real — √2 finally an answer, ANS ch. 8’s exile reversed), and Viète’s roots-and-coefficients relations proved and put to competition work.',
  status: 'in-progress',
  lessons: [lesson91, lesson92],
  plannedLessons: [
    'The Quadratic Formula and the Discriminant',
    'Roots and Coefficients: Viète’s Relations',
  ],
}
