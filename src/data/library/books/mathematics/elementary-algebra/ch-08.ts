import type { Chapter, Lesson } from '../../../types'

/**
 * Elementary Algebra — Chapter 8: Algebraic Fractions
 *
 * LESSONS WRITTEN: 8.1 Rational Expressions: Simplify First (run 81 —
 *                  quiz keys 0/1/0/3/1, 14 exercises, two figures,
 *                  verify-book3-ch08.ts sections A–F green, E2E
 *                  e2e-al-81 x3 viewports). 8.2 Operating on Algebraic
 *                  Fractions (run 81 — quiz keys 2/1/3/1/2, 14 exercises,
 *                  two figures, sections D–E + G, E2E e2e-al-82 x3
 *                  viewports). 8.3 Fractional Equations and Extraneous
 *                  Roots (run 82 — quiz keys 1/1/2/3/1, 14 exercises,
 *                  two figures, the clearing-law derivation with its
 *                  clause, sections H–I pre-write + J authored, E2E
 *                  e2e-al-83 x3 viewports). CHAPTER COMPLETE at run 82:
 *                  the unit-8 review passed (sections J + K).
 *
 * References for this unit: the banked keys carry the run (zero downloads,
 * web-check only per the runs-71–80 pattern) — `hall-knight-elementary-
 * algebra` (the classical text's fractions chapter: reduction to lowest
 * terms as the opening move, the factor-cancellation discipline this
 * lesson grounds lawfully), `ncert-math7-ch2` (the number-fraction ground:
 * FM ch. 4 banked the laws, this chapter puts polynomials under the bar),
 * `khattar-qa-4e` (the exam corner: simplify-and-state-the-exclusion
 * items, the k-exclusion hunt, speed/cost word problems),
 * `cengage-jee-style` (the presentation contract).
 *
 * VERIFY-FIRST (2026-11-09, run 81): every number in 8.1 was recomputed by
 * scripts/verify-book3-ch08.ts BEFORE any prose existed — 536 exact checks
 * across sections A–E (the excluded-value engine: six designed fractions
 * with refusals {3}, {−3}, {1,4}, {−3,3}, ∅, {0} and window counts
 * 10/10/9/9/11/10 of 11; the fundamental-law engine: five triples num =
 * n·C, den = d·C as polynomial identities, 49 exact pointwise agreements,
 * hole sets {3}, {2}, {−1}, {−2}, {0}; the term-cancel monster priced —
 * the lawful x+1 agrees 10/10, the illegal x+4 mismatches 10/10, and
 * (3+4)/3 = 7/3 ≠ 4; the numerator-zero verdict 0/(−25) = 0 defined; the
 * monomial engine 12x⁵/(6x²) = 2x³, 10x⁴/(5x²) = 2x², x²/x⁵ = 1/x³ with
 * x = 2 → 1/8; the hole probes 29/10 → 59/10, 299/100 → 599/100,
 * 301/100 → 601/100, 31/10 → 61/10; the zero-fraction engine: solution of
 * (x²−9)/(x−3) = 0 exactly {−3}). Pre-writing catches: the window census
 * cannot see the zero −6 of (x−2)(x+6) — pinned by direct evaluation; a
 * first-draft x²/x⁵ assertion compared against 0 instead of 1/x³.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (8.1): the domain strip — three denominators, their        */
/* refusals. Header (30,18,660,44); panels (30,84,208,180),            */
/* (256,84,208,180), (482,84,208,180); chips (30,276,208,26),          */
/* (256,276,208,26), (482,276,208,26); caption band (30,314,660,24).   */
/* Geometry pinned in verify-book3-ch08.ts plan81Fig1, audited in F.   */
/* ------------------------------------------------------------------ */

function domainStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three rational expressions on three copies of the line: 1/(x−3) refuses exactly 3, the product denominator (x−1)(x−4) refuses 1 and 4, and x²+1 never dies">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the domain law — the refusals are exactly the denominator’s zeros</text>')
  // ---- panel 1: 1/(x−3) refuses {3} ----
  parts.push('<rect x="30" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="134" y="108" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">1/(x − 3)</text>')
  parts.push('<text x="134" y="126" font-size="10" fill="#65a30d" text-anchor="middle">denominator x − 3</text>')
  parts.push('<text x="134" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">lives on the whole line EXCEPT 3</text>')
  parts.push('<line x1="50" y1="190" x2="218" y2="190" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<line x1="134" y1="186" x2="134" y2="194" stroke="#d97706" stroke-width="1.2"/>')
  parts.push('<text x="134" y="208" font-size="10" fill="#65a30d" text-anchor="middle">0</text>')
  parts.push('<circle cx="184.4" cy="190" r="5.5" fill="#fffdf5" stroke="#ea580c" stroke-width="2"/>')
  parts.push('<text x="184.4" y="212" font-size="10.5" fill="#ea580c" text-anchor="middle" font-weight="700">3 refused</text>')
  // ---- panel 2: (x+2)/((x−1)(x−4)) refuses {1, 4} ----
  parts.push('<rect x="256" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="108" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">(x + 2)/((x − 1)(x − 4))</text>')
  parts.push('<text x="360" y="126" font-size="10" fill="#65a30d" text-anchor="middle">(x − 1)(x − 4) = 0 — twice</text>')
  parts.push('<text x="360" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">two doors slam shut</text>')
  parts.push('<line x1="276" y1="190" x2="444" y2="190" stroke="#d97706" stroke-width="1.4"/>')
  parts.push('<circle cx="376.8" cy="190" r="5.5" fill="#fffdf5" stroke="#ea580c" stroke-width="2"/>')
  parts.push('<circle cx="427.2" cy="190" r="5.5" fill="#fffdf5" stroke="#ea580c" stroke-width="2"/>')
  parts.push('<text x="376.8" y="212" font-size="10.5" fill="#ea580c" text-anchor="middle" font-weight="700">1</text>')
  parts.push('<text x="427.2" y="212" font-size="10.5" fill="#ea580c" text-anchor="middle" font-weight="700">4</text>')
  // ---- panel 3: (x+1)/(x²+1) refuses nothing ----
  parts.push('<rect x="482" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="586" y="108" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">(x + 1)/(x² + 1)</text>')
  parts.push('<text x="586" y="126" font-size="10" fill="#65a30d" text-anchor="middle">x² + 1 ≥ 1 — never zero</text>')
  parts.push('<text x="586" y="150" font-size="10.5" fill="#65a30d" text-anchor="middle">defined at every real x</text>')
  parts.push('<line x1="502" y1="190" x2="670" y2="190" stroke="#d97706" stroke-width="1.4"/>')
  for (const cx of [522, 562, 602, 642]) {
    parts.push(`<circle cx="${cx}" cy="190" r="3" fill="#16a34a"/>`)
  }
  parts.push('<text x="586" y="212" font-size="10.5" fill="#16a34a" text-anchor="middle" font-weight="700">no refusals</text>')
  // ---- verdict chips ----
  parts.push('<rect x="30" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="134" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">10 of 11 window integers live</text>')
  parts.push('<rect x="256" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="360" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">9 of 11 window integers live</text>')
  parts.push('<rect x="482" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="586" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">11 of 11 window integers live</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">the verifier priced each refusal on the window [−5, 5]: the domain is the denominator’s nonzero set, nothing more</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (8.1): the simplify-first pipeline — four stations.        */
/* Header (30,18,660,44); stations (30,96,150,120), (200,96,150,120),  */
/* (370,96,150,120), (540,96,150,120); result band (30,240,660,48);    */
/* caption band (30,314,660,24). Geometry pinned in                    */
/* verify-book3-ch08.ts plan81Fig2, audited in F.                      */
/* ------------------------------------------------------------------ */

function simplifyPipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four pipeline stations: factor completely, cancel factors only, carry the bill, check by substitution — with the worked strip (x²−5x+6)/(x²−4) → (x−3)/(x+2)">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the simplify-first pipeline — four stations, one honest exit</text>')
  // ---- station 1: FACTOR ----
  parts.push('<rect x="30" y="96" width="150" height="120" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="105" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">1 · FACTOR</text>')
  parts.push('<text x="105" y="142" font-size="10" fill="#65a30d" text-anchor="middle">numerator and</text>')
  parts.push('<text x="105" y="158" font-size="10" fill="#65a30d" text-anchor="middle">denominator,</text>')
  parts.push('<text x="105" y="174" font-size="10" fill="#65a30d" text-anchor="middle">completely — the</text>')
  parts.push('<text x="105" y="190" font-size="10" fill="#65a30d" text-anchor="middle">chapter-4 toolkit</text>')
  // ---- station 2: CANCEL ----
  parts.push('<rect x="200" y="96" width="150" height="120" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="275" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">2 · CANCEL</text>')
  parts.push('<text x="275" y="142" font-size="10" fill="#65a30d" text-anchor="middle">common FACTORS</text>')
  parts.push('<text x="275" y="158" font-size="10" fill="#65a30d" text-anchor="middle">only — never terms;</text>')
  parts.push('<text x="275" y="174" font-size="10" fill="#65a30d" text-anchor="middle">each cancel needs</text>')
  parts.push('<text x="275" y="190" font-size="10" fill="#65a30d" text-anchor="middle">its nonzero certificate</text>')
  // ---- station 3: CARRY ----
  parts.push('<rect x="370" y="96" width="150" height="120" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="445" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">3 · CARRY</text>')
  parts.push('<text x="445" y="142" font-size="10" fill="#65a30d" text-anchor="middle">the ORIGINAL</text>')
  parts.push('<text x="445" y="158" font-size="10" fill="#65a30d" text-anchor="middle">denominator’s zeros</text>')
  parts.push('<text x="445" y="174" font-size="10" fill="#65a30d" text-anchor="middle">stay refused —</text>')
  parts.push('<text x="445" y="190" font-size="10" fill="#65a30d" text-anchor="middle">the bill travels</text>')
  // ---- station 4: CHECK ----
  parts.push('<rect x="540" y="96" width="150" height="120" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="615" y="120" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">4 · CHECK</text>')
  parts.push('<text x="615" y="142" font-size="10" fill="#65a30d" text-anchor="middle">substitute one</text>')
  parts.push('<text x="615" y="158" font-size="10" fill="#65a30d" text-anchor="middle">live test point;</text>')
  parts.push('<text x="615" y="174" font-size="10" fill="#65a30d" text-anchor="middle">read the truth —</text>')
  parts.push('<text x="615" y="190" font-size="10" fill="#65a30d" text-anchor="middle">the census habit</text>')
  // arrows between stations
  for (const [x1, x2] of [
    [182, 198],
    [352, 368],
    [522, 538],
  ]) {
    parts.push(`<line x1="${x1}" y1="156" x2="${x2}" y2="156" stroke="#ea580c" stroke-width="1.4"/>`)
    parts.push(`<path d="M ${x2 - 7} 152 L ${x2 - 1} 156 L ${x2 - 7} 160" fill="none" stroke="#ea580c" stroke-width="1.4"/>`)
  }
  // ---- result band: the worked strip ----
  parts.push('<rect x="30" y="240" width="660" height="48" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="360" y="260" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">(x² − 5x + 6)/(x² − 4) = ((x − 2)(x − 3))/((x − 2)(x + 2)) → (x − 3)/(x + 2), carrying x ≠ 2 and x ≠ −2</text>')
  parts.push('<text x="360" y="278" font-size="10" fill="#0f766e" text-anchor="middle">FACTOR used 4.2’s trinomials · CANCEL removed the factor (x − 2) · CARRY kept its zero 2 alive in the bill</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">factor, cancel factors only, carry the bill, check by substitution — the verifier priced all four stations on the window</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* (8.1) Rational Expressions: Simplify First                          */
/* ------------------------------------------------------------------ */

const lesson81: Lesson = {
  id: 'al-rational-expressions-simplify-first',
  number: '8.1',
  title: 'Rational Expressions: Simplify First',
  concepts: [
    'rational expression',
    'excluded values and the domain bill',
    'the fundamental law of fractions',
    'cancellation of factors, never terms',
    'lowest terms',
    'the removable hole',
    'monomial quotients and power subtraction',
    'the zero-fraction verdict',
  ],
  objectives: [
    'recognize a rational expression as a quotient of polynomials and name its numerator and denominator',
    'state the domain of any rational expression as the denominator’s nonzero set and bill the excluded values first',
    'prove the fundamental law of fractions for polynomials from the field laws and apply it to cancel common FACTORS',
    'explain why canceling terms is illegal, with priced counterexamples',
    'simplify monomial quotients by dividing coefficients and subtracting powers, with zero excluded',
    'carry the bill of excluded values through a simplification and identify the removable hole',
  ],
  prerequisites: ['fm-equivalent-fractions-simplification', 'al-common-factors-and-grouping', 'al-factoring-quadratic-trinomials'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math7-ch2', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Seven chapters have built the letter-world piece by piece. Expressions learned to be constructed and simplified by the laws (chapter 1), polynomials became a family with a degree (chapter 3), factorization turned multiplication into a reading key (chapter 4), equations learned to be settled lawfully (chapters 5 and 6), and order joined the toolkit (chapter 7). One citizen of the arithmetic world has been waiting patiently to make the same journey: the FRACTION. Foundation Mathematics banked the fraction laws for numbers — equivalence, simplification, the four operations. This chapter runs the identical laws with POLYNOMIALS in the numerator and the denominator, and everything we proved about factoring becomes the engine that runs them.' },
    { kind: 'para', text: 'The chapter has three lessons. This one builds the object itself — the rational expression — and its first discipline: the domain, the excluded values, and the reduction to lowest terms that the classical texts opened their fractions chapters with. Lesson 8.2 operates: multiply, divide, add, subtract — with the LCD of polynomials doing what the LCD of numbers did in FM. Lesson 8.3 cashes it all in: fractional EQUATIONS, where a new kind of false root — the extraneous root — appears precisely because excluded values exist, and the bill collected in this lesson becomes the check that catches them. The payoff reaches far beyond this book: every ratio of formulas in science, every rate, every average is a rational expression, and every one of them refuses the values that kill its denominator.' },
    { kind: 'heading', text: 'A New Citizen: the Rational Expression' },
    { kind: 'equation', latex: 'R(x) = \\frac{P(x)}{Q(x)}', note: 'P and Q are polynomials, Q not the zero polynomial — the fraction bar is now carrying LETTERS' },
    { kind: 'para', text: 'A RATIONAL EXPRESSION is said to be a quotient of two polynomials — a numerator $P(x)$ over a denominator $Q(x)$ — where the denominator is not the zero polynomial. The name is borrowed honestly: FM chapter 4 called a quotient of integers a rational number, and ANS chapter 7 gathered all of them into the rational system; here the same shape is built from letters. The one and only thing demanded is that the DENOMINATOR be a genuine nonzero polynomial — a fraction exists only if there is something below the bar to divide by. For example:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) $\\frac{5}{x}$ — a number over a letter: the simplest fraction of the new kind;',
      '(ii) $\\frac{x+2}{x-7}$ — a linear polynomial on each floor;',
      '(iii) $\\frac{x^2-9}{x^2+3x+2}$ — quadratics on both sides: the factoring toolkit of chapter 4 will read both;',
      '(iv) $7$ — every polynomial IS a rational expression, with denominator $1$; nothing below the bar can die;',
      '(v) $\\frac{3x^2}{x}$ — a monomial quotient: coefficients will divide, powers will subtract.',
    ] },
    { kind: 'terms', items: [
      { term: 'rational expression', def: 'a quotient $P/Q$ of two polynomials with the denominator not the zero polynomial — the fraction bar carrying letters' },
      { term: 'excluded value', def: 'a number at which the denominator equals zero: the expression does not EXIST there — no value, no substitution, no argument' },
      { term: 'domain', def: 'the set of all inputs a rational expression accepts — exactly the set where its denominator is nonzero' },
      { term: 'the fundamental law of fractions', def: '$\\frac{P \\cdot C}{Q \\cdot C} = \\frac{P}{Q}$ wherever $Q \\neq 0$ and $C \\neq 0$ — the license that powers every cancellation' },
      { term: 'lowest terms', def: 'the state of a rational expression whose numerator and denominator share no common factor of positive degree' },
      { term: 'removable hole', def: 'a point the original refuses but the simplified form accepts — one missing dot on the graph of the simplified form' },
      { term: 'monomial quotient', def: 'a quotient of monomials: the coefficients divide exactly and the powers subtract, with zero excluded' },
      { term: 'the bill', def: 'the working habit of this chapter: the explicit list of excluded values carried alongside every simplified form' },
    ] },
    { kind: 'heading', text: 'The Excluded-Values Discipline' },
    { kind: 'para', text: 'A rational expression is not defined everywhere its ink suggests. The value of $P/Q$ AT a point $x = a$ exists precisely when $Q(a) \\neq 0$ — this is the division-by-zero verdict that ANS 9.3 proved from the field laws: division is multiplication undone, and no multiplication by a zero denominator can be undone. So the domain of $P/Q$ is the denominator’s nonzero set, and the zeros of the denominator are the EXCLUDED VALUES. This is not decoration to be mentioned politely at the end; it is the first computation to make about any fraction of letters. Bill the exclusions FIRST — before simplifying, before operating — because the bill belongs to the expression as given, not to whatever form it later takes.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — the domain of a rational expression', text: 'The domain of $P/Q$ is the set of all real $x$ with $Q(x) \\neq 0$. Thus, $\\frac{1}{x-3}$ exists exactly for $x \\neq 3$, and $\\frac{x+2}{(x-1)(x-4)}$ exists exactly for $x \\neq 1$ and $x \\neq 4$. A rational expression and its domain are inseparable: to state one is to state the other.' },
    { kind: 'para', text: 'The verifier priced the discipline on the census window $[-5, 5]$ — eleven integer points — and the census is crisp. The expression $\\frac{1}{x-3}$ refuses exactly $3$: it lives at $10$ of the $11$ window points. The product denominator $(x-1)(x-4)$ dies twice: $\\frac{x+2}{(x-1)(x-4)}$ refuses $1$ and $4$, living at $9$ of $11$. The quadratic $x^2 - 9$ dies at both square roots of $9$, so $\\frac{x+1}{x^2-9}$ refuses $-3$ and $3$. And the star exhibit: $\\frac{x+1}{x^2+1}$ refuses NOTHING — the sum of a square and $1$ is at least $1$ for every real number, so all $11$ window points live. Two linear doors, two square doors, or no door at all: the denominator alone decides.' },
    { kind: 'figure', caption: 'The domain strip: 1/(x−3) refuses exactly 3; (x+2)/((x−1)(x−4)) refuses 1 and 4; (x+1)/(x²+1) refuses nothing because x² + 1 is never zero. The verifier priced each refusal on the window [−5, 5].', svg: domainStripSvg() },
    { kind: 'para', text: 'One refinement catches a whole class of errors: it is the DENOMINATOR’s zeros that refuse — never the numerator’s. The expression $\\frac{x(x-5)}{x^2-25}$ has a zero numerator at $x = 0$, and there it reads $\\frac{0}{-25} = 0$: perfectly defined, perfectly zero. A zero numerator is not a scandal but an ANSWER — the fraction is zero there. Only the denominator’s death kills the expression. This asymmetry will be promoted to a theorem at the end of the lesson (the zero-fraction verdict), and it is the exact point where lesson 8.3’s extraneous roots will breed: a root that satisfies the multiplied-out equation but sits in the denominator’s zero set never belonged to the fraction equation at all.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the excluded value is not a small value', text: 'The refusal is absolute: at $x = 3$ the expression $\\frac{1}{x-3}$ does not equal a very large number, does not equal infinity, does not wait to be tamed — it does not exist. ANS 9.3 proved the verdict from the field laws: allowing division by zero collapses $1 = 0$ in one line. Writing "undefined" is the only honest entry in the table. The graph may APPROACH a value near the refusal (lesson materials in later books draw the asymptote), but the point itself is a hole in the world, not an extreme of it.' },
    { kind: 'heading', text: 'The Fundamental Law, With Letters' },
    { kind: 'para', text: 'FM chapter 4 built number-fractions on one load-bearing law: multiplying (or dividing) numerator and denominator by the same nonzero number changes the fraction’s clothes, not its value — $\\frac{3}{5} = \\frac{3 \\cdot 4}{5 \\cdot 4}$. That law now gets its letter form, and — per the discipline of this book — a proof rather than a reminder.' },
    { kind: 'derivation', title: 'Theorem — the fundamental law of rational expressions', statement: 'At any point $x$ where $Q(x) \\neq 0$ and $C(x) \\neq 0$: $\\;\\frac{P(x) \\cdot C(x)}{Q(x) \\cdot C(x)} = \\frac{P(x)}{Q(x)}$. Equivalently, a common nonzero FACTOR may be canceled from numerator and denominator — and only a factor.', steps: [
      { label: 'Certify the point', formula: 'Q(x) \\neq 0, \\; C(x) \\neq 0', explanation: 'The law is a statement about a POINT. Both certificates must hold at that point: the denominator must live, and the factor to be canceled must live. At points where a certificate fails, the law says nothing — and the fraction may not exist at all.' },
      { label: 'Multiply by a name for 1', formula: '\\frac{P}{Q} = \\frac{P}{Q} \\cdot \\frac{C}{C} = \\frac{P \\cdot C}{Q \\cdot C}', explanation: 'Because $C(x) \\neq 0$, the fraction $C/C$ is a genuine name for $1$ — the field laws of ANS 7.2 guarantee every step. Multiplying by $1$ changes nothing; the two forms are the same number written in different clothes.' },
      { label: 'Run the film backwards', formula: '\\frac{P \\cdot C}{Q \\cdot C} = \\frac{P}{Q}', explanation: 'Every identity reads in both directions. Given a fraction whose numerator and denominator SHARE the factor $C$, and given the certificate $C(x) \\neq 0$, the shared factor divides out exactly — this is cancellation.' },
      { label: 'Read the bill', formula: '\\text{refused} = \\{x : Q(x) \\cdot C(x) = 0\\}', explanation: 'The original denominator $Q \\cdot C$ dies wherever $Q$ or $C$ dies. The simplified form $P/Q$ refuses only the zeros of $Q$. The certificate that licensed the cancellation — $C \\neq 0$ — is exactly the set of points where the two forms may differ.' },
      { label: 'Priced', formula: '49 \\text{ exact agreements, holes } \\{3\\}, \\{2\\}, \\{-1\\}, \\{-2\\}, \\{0\\}', explanation: 'The verifier built five designed triples num = n·C, den = d·C, checked each as a polynomial identity, and confirmed the equality num/den = n/d at every window point where the original lives — 49 exact agreements in all — while the hole sets came out exactly {3}, {2}, {−1}, {−2}, {0}.' },
    ], result: 'The fundamental law: cancel a common FACTOR with its nonzero certificate, and the value is untouched wherever the original lived. The certificate is not bookkeeping — it is the content.' },
    { kind: 'para', text: 'The exhibit that makes the bill unforgettable is the difference of squares. The expression $\\frac{x^2-9}{x-3}$ factors as $\\frac{(x-3)(x+3)}{x-3}$, and the factor $x - 3$ cancels — lawfully, at every point except its zero: $\\frac{x^2-9}{x-3} = x + 3$ for $x \\neq 3$. The verifier probed the neighbourhood with exact rational arithmetic: at $x = 2.9$ the original reads $\\frac{59}{100} \\div \\frac{-1}{10} = \\frac{59}{10}$, and $x + 3 = 5.9$ agrees; at $2.99$ both read $\\frac{599}{100}$; at $3.01$ both read $\\frac{601}{100}$; at $3.1$ both read $\\frac{61}{10}$. But at $x = 3$ the original is $\\frac{0}{0}$ — it does not exist — while $x + 3$ says $6$. The two forms agree everywhere except ONE point, and that point is exactly the canceled factor’s zero.' },
    { kind: 'callout', tone: 'insight', title: 'Insight — the hole is information', text: 'The missing point is called a REMOVABLE HOLE, and the name is honest: the graph of $x + 3$ is a full line, while the graph of the original fraction is the same line with one dot scooped out at $x = 3$. The simplification did not destroy information — it relocated it, from the ink of the fraction into the bill of exclusions. This is why the examiner who asks for "the restriction" and the examiner who asks for "the simplified form" are asking for the SAME complete answer: form plus bill. Give only the form, and the answer is half-given — one lost dot is one lost mark.' },
    { kind: 'table', caption: 'The hole at x = 3, probed with exact fractions: the original and x + 3 agree on both sides — and at 3 itself the original has no value at all', head: ['x', '(x² − 9)/(x − 3)', 'the simplified x + 3', 'verdict'], rows: [
      ['2.9', '59/10', '59/10', 'agree'],
      ['2.99', '599/100', '599/100', 'agree'],
      ['3', 'undefined (0/0)', '6', 'the hole'],
      ['3.01', '601/100', '601/100', 'agree'],
      ['3.1', '61/10', '61/10', 'agree'],
    ] },
    { kind: 'callout', tone: 'definition', title: 'Definition — lowest terms', text: 'A rational expression is said to be in LOWEST TERMS when its numerator and denominator share no common factor of positive degree. Thus, $\\frac{(x-2)(x-3)}{(x-2)(x+2)}$ is not in lowest terms; $\\frac{x-3}{x+2}$ is. Reduction to lowest terms is the fundamental law run to exhaustion: cancel every factor the two floors share, then state the bill of the original denominator’s zeros.' },
    { kind: 'heading', text: 'Simplify First: the Pipeline' },
    { kind: 'para', text: 'The working craft of this lesson is a four-station pipeline, and its order is the whole message of the lesson — simplify FIRST, before any operation of 8.2 gets a chance to inflate the polynomials. Station one, FACTOR: write the numerator and the denominator in completely factored form, using the full chapter-4 toolkit — common factors, quadratic trinomials, the identities. Station two, CANCEL: remove the factors the two floors share, each with its nonzero certificate. Station three, CARRY: state the bill — the zeros of the ORIGINAL denominator — because the canceled factors’ zeros belong to it. Station four, CHECK: substitute one live test point into both forms and read the same truth twice. The verifier ran all four stations on every designed triple; the pipeline below shows the exhibit of the section.' },
    { kind: 'figure', caption: 'The simplify-first pipeline: FACTOR completely, CANCEL common factors only (each with its nonzero certificate), CARRY the original denominator’s zeros as the bill, CHECK by substitution. The worked strip runs (x²−5x+6)/(x²−4) to (x−3)/(x+2) with the bill x ≠ 2, −2.', svg: simplifyPipelineSvg() },
    { kind: 'example', title: 'Simplify 12x⁵/(6x²) and state the bill', steps: [
      'Factor the monomials: $12x^5 = 2 \\cdot 6 \\cdot x^3 \\cdot x^2$ and $6x^2$ — the common factor is $6x^2$.',
      'Cancel with its certificate ($x \\neq 0$ — the certificate is the factor’s zero): $\\frac{12x^5}{6x^2} = \\frac{12}{6} \\cdot \\frac{x^5}{x^2} = 2x^3$.',
      'The coefficients divided exactly ($12/6 = 2$) and the powers subtracted ($5 - 2 = 3$) — the monomial law.',
      'Hence $\\frac{12x^5}{6x^2} = 2x^3$ for $x \\neq 0$; the verifier confirmed the equality at all $10$ nonzero window points, and at $x = 0$ the original is $0/0$ — refused, while $2x^3$ would say $0$. The hole at $0$ is the bill.',
    ], },
    { kind: 'example', title: 'Simplify (x² − 25)/(x + 5) and state the bill', steps: [
      'Factor the numerator (the difference of squares, 4.3): $x^2 - 25 = (x-5)(x+5)$; the denominator is already prime.',
      'The shared factor $x + 5$ cancels with its certificate: $\\frac{(x-5)(x+5)}{x+5} = x - 5$ for $x \\neq -5$.',
      'Bill the ORIGINAL denominator’s zero: $x + 5 = 0$ at $x = -5$, where the original reads $0/0$ — refused.',
      'Hence $\\frac{x^2-25}{x+5} = x - 5$ for $x \\neq -5$; the verifier confirmed the equality at the other $10$ window points, and the simplified form would say $-10$ at the hole.',
    ], },
    { kind: 'example', title: 'Simplify (x² − 5x + 6)/(x² − 4) and state the bill', steps: [
      'FACTOR both floors: $x^2 - 5x + 6 = (x-2)(x-3)$ (4.2’s trinomial work) and $x^2 - 4 = (x-2)(x+2)$ (the difference of squares).',
      'CANCEL the shared factor $x - 2$: $\\frac{(x-2)(x-3)}{(x-2)(x+2)} = \\frac{x-3}{x+2}$ for $x \\neq 2$.',
      'CARRY the bill: the original denominator $(x-2)(x+2)$ dies at $2$ AND at $-2$ — both stay refused, even though $-2$ still kills the simplified form too.',
      'CHECK at a live point, say $x = 0$: the original reads $\\frac{0-0+6}{0-4} = \\frac{6}{-4} = -\\frac{3}{2}$ and the simplified reads $\\frac{0-3}{0+2} = -\\frac{3}{2}$ — the same truth, read twice.',
      'Hence $\\frac{x^2-5x+6}{x^2-4} = \\frac{x-3}{x+2}$ for $x \\neq 2$, $x \\neq -2$ — the verifier priced all $9$ live window points and the hole set $\\{2\\}$ (where the simplified would say $\\frac{-1}{4}$).',
    ], },
    { kind: 'example', title: 'Simplify (x² + 3x + 2)/(x² + 4x + 3) and state the bill', steps: [
      'FACTOR both: $x^2 + 3x + 2 = (x+1)(x+2)$ and $x^2 + 4x + 3 = (x+1)(x+3)$ — both trinomials factor cleanly.',
      'CANCEL the shared $x + 1$: $\\frac{(x+1)(x+2)}{(x+1)(x+3)} = \\frac{x+2}{x+3}$ for $x \\neq -1$.',
      'CARRY the full bill: the original refuses $-1$ AND $-3$. Notice the honesty of the second entry — the simplified form $\\frac{x+2}{x+3}$ ALSO dies at $-3$, so the bill there costs nothing new; but at $x = -1$ the simplified lives and the original does not: the hole.',
      'CHECK at $x = 0$: original $\\frac{2}{3}$, simplified $\\frac{2}{3}$ — the same truth read twice.',
      'Hence $\\frac{x^2+3x+2}{x^2+4x+3} = \\frac{x+2}{x+3}$ for $x \\neq -1$, $x \\neq -3$; the verifier priced $9$ live agreements and the hole set $\\{-1\\}$ exactly.',
    ], },
    { kind: 'example', title: 'Audit a student’s work: is (x² + 4x + 3)/(x + 3) = x + 4 lawful?', steps: [
      'The student canceled the $3$s — a TERM of the numerator, against the denominator. That first move is the whole fraud: $3$ is not a factor of $x^2 + 4x + 3$ as a whole, so nothing lawful was canceled. (The follow-up step would have been harmless had the first been real.)',
      'Do it lawfully: $x^2 + 4x + 3 = (x+1)(x+3)$ — a FACTORIZATION. Then $\\frac{(x+1)(x+3)}{x+3} = x+1$ for $x \\neq -3$.',
      'Price the fraud: the verifier compared the original with the student’s $x + 4$ at every live window point — $10$ mismatches out of $10$. At $x = 1$: the original reads $\\frac{1+4+3}{1+3} = \\frac{8}{4} = 2$, the lawful $x + 1$ says $2$ — and the student’s $x + 4$ says $5$. Fraud exposed.',
      'Hence the lawful answer is $x + 1$ with $x \\neq -3$; the student’s $x + 4$ is not a simplification but a different function wearing the same ink.',
    ], },
    { kind: 'para', text: 'The monomial quotients deserve their own law, because they will do half the mechanical work of the chapter. When numerator and denominator are monomials — single terms — the fundamental law splits in two: the coefficients divide exactly (as rational numbers: $12/6 = 2$, and $10/5 = 2$), and the powers subtract, $\\frac{x^m}{x^n} = x^{m-n}$, always with zero excluded because the certificate $x \\neq 0$ is what makes the subtraction lawful. The subtraction can go NEGATIVE, and the honest way to write the result is a reciprocal: $\\frac{x^2}{x^5} = x^{-3} = \\frac{1}{x^3}$ — the verifier priced the exhibit exactly, $x = 2$ giving $\\frac{1}{8}$. FM chapter 4’s unit-fraction reading and chapter 1’s exponent laws meet here: the fraction bar and the power notation are two dialects of the same division.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — factors, never terms', text: 'The single most expensive error of this chapter, priced: $\\frac{x^2 + 4x + 3}{x + 3}$ is NOT $\\frac{x^2 + 4x}{x} + \\text{leftovers}$, and $\\frac{a + b}{a}$ is NOT $b$ — at $a = 3$, $b = 4$ the left side is $\\frac{7}{3}$ and the "simplification" claims $4$. Only a factor of the WHOLE numerator may cancel against a factor of the WHOLE denominator. The test is mechanical: before any cancellation, both floors must be PRODUCTS. If a floor is a sum, factor it first (chapter 4) or leave it alone. The verifier’s monster audit found the illegal form wrong at every single one of the $10$ live window points — term-cancellation is not a small error, it is a different function.' },
    { kind: 'list', items: [
      '**Defined where promised.** The simplified form and the original agree at EVERY point where the original exists — the verifier priced $49$ such agreements across the five designed triples, with zero exceptions.',
      '**Honest about the bill.** The zeros of the ORIGINAL denominator stay refused after simplifying — stated explicitly, never implied: the holes $\\{3\\}, \\{2\\}, \\{-1\\}, \\{-2\\}, \\{0\\}$ all survived their cancellations in the pinned exhibits.',
      '**Cheaper to read.** Lowest terms expose the structure — degree, sign, symmetry, the remaining doors — that the raw fraction hides; 8.2’s operations lean on exactly this.',
    ] },
    { kind: 'heading', text: 'Values, Holes and the Zero Verdict' },
    { kind: 'para', text: 'Evaluating a rational expression is substitution with a border check: bill the exclusions, then read the value. At a live point the fraction behaves like any quotient of numbers — $\\frac{x+1}{x-4}$ at $x = 6$ reads $\\frac{7}{2}$; at $x = 4$ it reads nothing at all. The border check is not optional politeness: 8.3 will solve EQUATIONS built on these fractions, and the border check is precisely what will separate a genuine solution from an extraneous impostor. One verdict deserves its theorem now, because it drives that whole lesson.' },
    { kind: 'equation', latex: '\\frac{P(x)}{Q(x)} = 0 \\;\\iff\\; P(x) = 0 \\;\\text{ and }\\; Q(x) \\neq 0', note: 'the zero-fraction verdict — a fraction is zero exactly where its NUMERATOR is zero and its denominator lives' },
    { kind: 'para', text: 'The proof is one line in each direction: a quotient is zero only when its numerator is zero (otherwise the numerator’s sign survives the division), and where the denominator is zero there is no quotient to speak of. The verifier priced it on the standing exhibit: $\\frac{x^2-9}{x-3} = 0$ has numerator candidates $-3$ and $3$, and the bill refuses $3$ — the solution is EXACTLY $\\{-3\\}$. A student who multiplies both sides by $x - 3$ and solves $x^2 - 9 = 0$ gets two roots, one of them false; the bill is what exposes the impostor. That single mechanism — candidates from the numerator, filtered by the denominator’s zeros — is the entire content of 8.3’s extraneous-root hunt, planted here one lesson early.' },
    { kind: 'para', text: 'From the above discussion, the working summary of the lesson:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) a rational expression is a quotient of polynomials; its domain is the denominator’s nonzero set, billed FIRST;',
      '(ii) the fundamental law cancels common FACTORS with their nonzero certificates — never terms, which are not factors;',
      '(iii) monomial quotients divide coefficients and subtract powers, with zero always excluded;',
      '(iv) a fraction is zero exactly where its numerator is zero and its denominator is not — the verdict 8.3 will spend.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the bar starts carrying letters', text: 'Letter-fractions were routine currency long before the notation settled: the classical algebra course that this book follows — Hall & Knight’s Elementary Algebra for Schools (1885) among its texts — carried a dedicated fractions chapter whose opening move was exactly this lesson’s: reduction to lowest terms by canceling common factors, with the restrictions named. The general idea underneath — a field of fractions built over any domain where cancellation is safe — belongs to modern abstract algebra and confirms the classical instinct. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The examination staples of this lesson are everywhere in the competitive bank (Khattar QA’s algebra scope, SSC/bank preliminary algebra, JEE-Main foundations): (1) "simplify and state the restrictions" — the form is half the marks, the bill is the other half; (2) the k-hunt — find $k$ so that $\\frac{x^2 - k}{x - 4}$ reduces to $x + 4$, answered by reading the factorization backwards ($k = 16$); (3) the value-at-a-point item with a refusal planted at the asked point; (4) word problems whose formula is a rate — speed $= \\frac{\\text{distance}}{\\text{time}}$, cost-per-item $= \\frac{\\text{total}}{\\text{count}}$ — where the denominator’s zero means the situation itself (no trip, no purchase) is impossible. The bill is not an ornament to the answer; in every one of these shapes, it IS part of the answer.' },
    { kind: 'formula', name: 'The domain bill', latex: 'R = \\frac{P}{Q} \\text{ lives} \\iff Q(x) \\neq 0', note: 'bill the denominator’s zeros FIRST — before simplifying, before operating' },
    { kind: 'formula', name: 'The fundamental law', latex: '\\frac{P \\cdot C}{Q \\cdot C} = \\frac{P}{Q} \\qquad (Q \\neq 0,\\; C \\neq 0)', note: 'cancel FACTORS only, each with its nonzero certificate; then carry the original bill' },
    { kind: 'formula', name: 'The monomial quotient', latex: '\\frac{a x^m}{b x^n} = \\frac{a}{b}\\, x^{m-n} \\qquad (x \\neq 0)', note: 'coefficients divide exactly; powers subtract; a negative result is a reciprocal — zero refuses' },
    { kind: 'quiz', title: 'Check yourself', items: [
      {
        q: 'The expression $\\frac{x+5}{x-2}$ exists for every real $x$ EXCEPT —',
        options: ['$x = 2$', '$x = -5$', '$x = 5$', '$x = -2$'],
        answer: 0,
        explain: 'The bill reads the DENOMINATOR’s zeros: $x - 2 = 0$ at $x = 2$ — that is the one refusal. Option 2 read the numerator ($x = -5$ makes the fraction ZERO, which is perfectly alive); options 3 and 4 solve neither floor’s zero correctly ($x = 5$ and $x = -2$ leave both floors alive).',
      },
      {
        q: '$\\frac{x^2 - 16}{x + 4}$ simplifies to —',
        options: ['$x - 4$, valid for every real $x$', '$x - 4$, valid for $x \\neq -4$', '$x + 4$, valid for $x \\neq 4$', 'it cannot be simplified'],
        answer: 1,
        explain: 'Factor the difference of squares: $\\frac{(x-4)(x+4)}{x+4} = x - 4$ — with the certificate $x \\neq -4$, the canceled factor’s zero, which the ORIGINAL denominator $x + 4$ refuses. Option 1 dropped the bill (at $x = -4$ the original is $0/0$, not $-8$); option 3 flipped the factor; option 4 surrenders a lawful cancellation.',
      },
      {
        q: 'Which cancellation is LAWFUL as written?',
        options: ['$\\frac{3x + 3}{3} = x + 1$', '$\\frac{x^2 + 4}{x + 4} = x + 1$', '$\\frac{x + 2}{y + 2} = \\frac{x}{y}$', '$\\frac{x^2 + x}{x} = x$'],
        answer: 0,
        explain: 'Option 1 factors FIRST: $3x + 3 = 3(x+1)$, then the FACTOR $3$ cancels — and the denominator $3$ never dies, so no bill at all. Option 2 canceled a term ($4$) that is not a factor of $x^2 + 4$: at $x = 1$ the left side is $1$, not $2$. Option 3 canceled the term $+2$ from each floor: at $x = 1, y = 3$ the left side is $\\frac{3}{5}$, not $\\frac{1}{3}$. Option 4 is the near-miss: $\\frac{x(x+1)}{x} = x + 1$, not $x$ — the whole numerator factor was dropped.',
      },
      {
        q: 'The expression $\\frac{1}{x^2 + 1}$ is undefined —',
        options: ['at $x = 1$', 'at $x = -1$', 'at $x = 0$', 'at no real number'],
        answer: 3,
        explain: 'The denominator $x^2 + 1$ is a sum of a square and $1$: at least $1$ for every real $x$, so it never dies — the domain is ALL reals and the bill is empty. Options 1 and 2 solved $x^2 + 1 = 0$ over the wrong system ($x = \\pm 1$ gives $2$, alive); option 3 confused the numerator-side zero with a refusal — at $x = 0$ the fraction reads $1$, perfectly defined.',
      },
      {
        q: 'After $\\frac{2x^2 - 8}{2x + 4}$ is simplified to $x - 2$, the values of $x$ that must STILL be refused are —',
        options: ['$x = 2$', '$x = -2$', 'none — the simplified form settles everything', '$x = 2$ and $x = -2$'],
        answer: 1,
        explain: 'The bill belongs to the ORIGINAL denominator: $2x + 4 = 0$ at $x = -2$, where the original reads $0/0$ while $x - 2$ would say $-4$. So $-2$ is refused forever, even after simplifying. Option 1 confused the zero of the canceled factor’s partner ($x = 2$ is where the NUMERATOR dies — the fraction is $0$ there, alive); option 3 dropped the bill; option 4 refused a live point.',
      },
    ] },
    { kind: 'exercises', title: 'Exercises 8.1', sets: [
      { level: 'L1', questions: [
        {
          q: 'Evaluate $\\frac{x+1}{x-4}$ at $x = 6$ and at $x = 4$.',
          solution: [
            'Bill first: the denominator $x - 4$ refuses $x = 4$.',
            'At $x = 6$: $\\frac{6+1}{6-4} = \\frac{7}{2}$ — a live value.',
            'At $x = 4$: $\\frac{5}{0}$ — the expression does not exist there; "undefined" is the only honest entry.',
          ],
          answer: '$\\frac{7}{2}$ at $x = 6$; undefined at $x = 4$.',
        },
        {
          q: 'Simplify $\\frac{10x^4}{5x^2}$ and state the bill.',
          solution: [
            'Coefficients divide exactly: $\\frac{10}{5} = 2$.',
            'Powers subtract with the certificate $x \\neq 0$: $\\frac{x^4}{x^2} = x^2$.',
            'Hence $\\frac{10x^4}{5x^2} = 2x^2$ for $x \\neq 0$; the verifier priced all $10$ nonzero window points.',
          ],
          answer: '$2x^2$, with $x \\neq 0$.',
        },
        {
          q: 'Is $x = 3$ allowed in $\\frac{x+1}{x-3}$? Is $x = -3$?',
          solution: [
            'The denominator $x - 3$ dies at $3$: the fraction reads $\\frac{4}{0}$ — refused.',
            'At $x = -3$: the denominator is $-6$, alive, and the fraction reads $\\frac{-2}{-6} = \\frac{1}{3}$.',
            'Hence $3$ is excluded and $-3$ is welcome — the numerator’s zero at $-3$ would have been an answer, not a scandal.',
          ],
          answer: '$x = 3$ refused; $x = -3$ allowed, value $\\frac{1}{3}$.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: 'Simplify $\\frac{x^2 - 25}{x + 5}$ and state the bill.',
          solution: [
            'FACTOR the difference of squares: $x^2 - 25 = (x-5)(x+5)$.',
            'CANCEL the shared factor with its certificate: $\\frac{(x-5)(x+5)}{x+5} = x - 5$ for $x \\neq -5$.',
            'CARRY the bill: the original denominator dies at $-5$ ($0/0$), where the simplified form would say $-10$.',
            'Hence $\\frac{x^2-25}{x+5} = x - 5$ for $x \\neq -5$; the verifier priced the other $10$ window points.',
          ],
          answer: '$x - 5$, with $x \\neq -5$.',
        },
        {
          q: 'Simplify $\\frac{x^2 + 6x + 8}{x + 2}$ and state the bill.',
          solution: [
            'FACTOR the trinomial (4.2): $x^2 + 6x + 8 = (x+2)(x+4)$.',
            'CANCEL the shared $x + 2$: $\\frac{(x+2)(x+4)}{x+2} = x + 4$ for $x \\neq -2$.',
            'CARRY the bill: at $x = -2$ the original is $\\frac{0}{0}$ — refused; the simplified form would say $2$.',
            'Hence $\\frac{x^2+6x+8}{x+2} = x + 4$ for $x \\neq -2$; the verifier priced the other $10$ window points.',
          ],
          answer: '$x + 4$, with $x \\neq -2$.',
        },
        {
          q: 'State the excluded values of $\\frac{x+3}{(x-2)(x+6)}$.',
          solution: [
            'The denominator is already factored — read its zeros: $x - 2 = 0$ at $2$ and $x + 6 = 0$ at $-6$.',
            'The numerator’s zero at $-3$ is irrelevant to the bill — numerator zeros make VALUES, not refusals.',
            'Hence the domain is every real $x$ except $2$ and $-6$; on the verifier’s window the refusal is $2$ (with $-6$ confirmed by direct evaluation).',
          ],
          answer: '$x \\neq 2$ and $x \\neq -6$.',
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Simplify $\\frac{x^2 - 7x + 12}{x^2 - 9}$ and state the bill.',
          solution: [
            'FACTOR both: $x^2 - 7x + 12 = (x-3)(x-4)$ and $x^2 - 9 = (x-3)(x+3)$.',
            'CANCEL the shared $x - 3$: $\\frac{(x-3)(x-4)}{(x-3)(x+3)} = \\frac{x-4}{x+3}$ for $x \\neq 3$.',
            'CARRY the bill: the original refuses $3$ AND $-3$ (the second still kills the simplified form — the entry costs nothing new).',
            'CHECK at $x = 0$: original $\\frac{12}{-9} = -\\frac{4}{3}$; simplified $\\frac{-4}{3}$ — the same truth. The verifier priced all $9$ live window points.',
          ],
          answer: '$\\frac{x-4}{x+3}$, with $x \\neq 3$ and $x \\neq -3$.',
        },
        {
          q: 'Simplify $\\frac{2x^2 - 18}{x^2 + 7x + 12}$ and state the bill.',
          solution: [
            'FACTOR both: $2x^2 - 18 = 2(x^2 - 9) = 2(x-3)(x+3)$; $x^2 + 7x + 12 = (x+3)(x+4)$.',
            'CANCEL the shared $x + 3$: $\\frac{2(x-3)(x+3)}{(x+3)(x+4)} = \\frac{2(x-3)}{x+4}$ for $x \\neq -3$.',
            'CARRY the bill: the original refuses $-3$ and $-4$; at $-3$ the simplified form lives — the hole.',
            'CHECK at $x = 0$: original $\\frac{-18}{12} = -\\frac{3}{2}$; simplified $\\frac{-6}{4} = -\\frac{3}{2}$. The verifier priced all $9$ live points.',
          ],
          answer: '$\\frac{2(x-3)}{x+4}$, with $x \\neq -3$ and $x \\neq -4$.',
        },
        {
          q: 'A student writes $\\frac{x^2 + 5x + 4}{x + 1} = x + 5$. Audit, correct, and state the bill.',
          solution: [
            'The student canceled the $+1$ TERM of the numerator against the denominator — but $+1$ is not a factor of $x^2 + 5x + 4$ as a whole.',
            'Do it lawfully: $x^2 + 5x + 4 = (x+1)(x+4)$, so $\\frac{(x+1)(x+4)}{x+1} = x + 4$ for $x \\neq -1$.',
            'Price the fraud: at $x = 1$ the original reads $\\frac{10}{2} = 5$; the lawful form says $5$; the student’s $x + 5$ says $6$. The verifier found the student’s form wrong at ALL $10$ live window points.',
            'Hence $\\frac{x^2+5x+4}{x+1} = x + 4$ with $x \\neq -1$ — a factorization, not a term-cancel, was the missing move.',
          ],
          answer: 'Not lawful — the correct form is $x + 4$, with $x \\neq -1$.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Find $k$ so that $\\frac{x^2 - k}{x - 4}$ simplifies to $x + 4$, and state the bill.',
          solution: [
            'Read the target backwards: $x + 4$ over $x - 4$ in lowest terms must come from $\\frac{(x-4)(x+4)}{x-4}$ — the difference of squares.',
            'So $x^2 - k = x^2 - 16$, giving $k = 16$.',
            'Uniqueness, priced: the verifier tested every $k$ from $10$ to $20$ — only $16$ makes $x^2 - k$ the polynomial $(x-4)(x+4)$.',
            'CARRY the bill: the original denominator $x - 4$ refuses $4$; the verifier priced the other $10$ window points.',
          ],
          answer: '$k = 16$; the bill is $x \\neq 4$.',
        },
        {
          q: 'Simplify $\\frac{x^2 - 5x}{x^2 - 25}$ and list the full bill. Is $x = 0$ excluded?',
          solution: [
            'FACTOR both: $x^2 - 5x = x(x-5)$; $x^2 - 25 = (x-5)(x+5)$.',
            'CANCEL the shared $x - 5$: $\\frac{x(x-5)}{(x-5)(x+5)} = \\frac{x}{x+5}$ for $x \\neq 5$.',
            'The bill: the original denominator refuses $5$ and $-5$. The zero $x = 0$ kills only the NUMERATOR: there the original reads $\\frac{0}{-25} = 0$ — perfectly defined, NOT on the bill.',
            'Hence $\\frac{x^2-5x}{x^2-25} = \\frac{x}{x+5}$ for $x \\neq 5$, $x \\neq -5$ — and the verifier confirmed the value $0$ at $x = 0$ in both forms.',
          ],
          answer: '$\\frac{x}{x+5}$, with $x \\neq 5$ and $x \\neq -5$; $x = 0$ is defined (the value is $0$).',
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'A car covers $(x^2 - 9)$ km in $(x - 3)$ hours. Simplify the speed, and interpret the exclusion.',
          solution: [
            'Speed is distance over time: $v = \\frac{x^2 - 9}{x - 3} = \\frac{(x-3)(x+3)}{x-3} = x + 3$ km/h, for $x \\neq 3$.',
            'The exclusion is the SITUATION, not a technicality: at $x = 3$ the trip is $\\frac{0}{0}$ — zero distance in zero time, no trip at all.',
            'Hence the average speed is $(x + 3)$ km/h for every realizable trip ($x \\neq 3$); at $x = 4$ the trip is $7$ km in $1$ h — speed $7$ km/h, as the form promises.',
          ],
          answer: '$v = x + 3$ km/h, with $x \\neq 3$ — the excluded value is the no-trip case.',
        },
        {
          q: 'Buying $x$ pens costs ₹$(4x^2 + 8x)$ in total. Simplify the cost per pen, and state the bill.',
          solution: [
            'Cost per pen is total over count: $c = \\frac{4x^2 + 8x}{x} = \\frac{4x(x + 2)}{x}$.',
            'CANCEL the factor $x$ with its certificate: $c = 4(x + 2) = 4x + 8$ rupees, for $x \\neq 0$.',
            'The exclusion is the empty purchase: zero pens cost zero rupees but define no PER-PEN price — $\\frac{0}{0}$.',
            'Hence the per-pen cost is ₹$(4x + 8)$ for every realizable purchase; the habitat is whole $x \\geq 1$ (FM ch. 4’s counting discipline), and the verifier priced the form on all $10$ nonzero window points.',
          ],
          answer: '₹$(4x + 8)$ per pen, with $x \\neq 0$.',
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'Prove the fundamental law from the field laws — if $Q(x) \\neq 0$ and $C(x) \\neq 0$ then $\\frac{P(x)\\,C(x)}{Q(x)\\,C(x)} = \\frac{P(x)}{Q(x)}$ — and explain exactly where the canceled form may differ from the original.',
          solution: [
            'Work at a fixed point $x$ and write $p = P(x)$, $q = Q(x)$, $c = C(x)$ — three real numbers with $q \\neq 0$, $c \\neq 0$.',
            'The field laws of ANS 7.2 give $c \\cdot c^{-1} = 1$; multiplying the live fraction $\\frac{p}{q}$ by this name for $1$: $\\frac{p}{q} = \\frac{p}{q} \\cdot \\frac{c}{c} = \\frac{p\\,c}{q\\,c}$ — the forward direction.',
            'Reading backwards is the cancellation: given $\\frac{pc}{qc}$ with the certificate $c \\neq 0$, multiply by $\\frac{1/c}{1/c}$ (again a name for $1$) to return $\\frac{p}{q}$. Every step used only associativity, inverses of NONZERO elements, and the definition of division — never a division by zero.',
            'Where the forms may differ: the original denominator $qc$ dies wherever $q = 0$ OR $c = 0$. At such a point the original does not exist, while $\\frac{p}{q}$ may still live — the certificate $c \\neq 0$ is precisely the licence that lapsed. The exhibit: $\\frac{x^2-9}{x-3}$ equals $x + 3$ at the $49$ window agreements the verifier priced across the five triples, and differs only on the hole sets $\\{3\\}, \\{2\\}, \\{-1\\}, \\{-2\\}, \\{0\\}$ — each the canceled factor’s zero.',
            'Hence the law is exactly as strong as its certificate: cancellation preserves value wherever the original lived, and the bill of the original denominator is the complete record of everywhere else.',
          ],
          answer: 'The law is the field laws applied to a nonzero certificate $c$; the canceled form may differ from the original exactly at the zeros of the canceled factor (the holes), which is why the bill travels with the answer.',
        },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* Figure 1 (8.2): the four-operation panel — multiply, divide+flip,   */
/* add via LCD, subtract with the bracket. Header (30,18,660,44);      */
/* panels (30,84,320,140), (370,84,320,140), (30,240,320,140),         */
/* (370,240,320,140); caption band (30,396,660,24). Geometry pinned in */
/* verify-book3-ch08.ts plan82Fig1, audited in G.                      */
/* ------------------------------------------------------------------ */

function fourOpsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 424" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Four operation panels: multiply keeps the product rule, divide flips the second fraction and adds the bill R ≠ 0, add and subtract build the LCD">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the four operations, carrying letters — every rule licensed, every bill kept</text>')
  // ---- panel 1: MULTIPLY ----
  parts.push('<rect x="30" y="84" width="320" height="140" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="190" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">MULTIPLY · P/Q · R/S = PR/QS</text>')
  parts.push('<text x="190" y="130" font-size="10" fill="#65a30d" text-anchor="middle">straight across — but FACTOR FIRST</text>')
  parts.push('<text x="190" y="148" font-size="10" fill="#65a30d" text-anchor="middle">and cancel before you multiply</text>')
  parts.push('<text x="190" y="172" font-size="10.5" fill="#166534" text-anchor="middle">the bill: both denominators’ zeros</text>')
  parts.push('<text x="190" y="196" font-size="10" fill="#d97706" text-anchor="middle">bill only grows — nothing is ever subtracted</text>')
  // ---- panel 2: DIVIDE ----
  parts.push('<rect x="370" y="84" width="320" height="140" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="530" y="108" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">DIVIDE · P/Q ÷ R/S = P/Q · S/R</text>')
  parts.push('<text x="530" y="130" font-size="10" fill="#65a30d" text-anchor="middle">flip the SECOND fraction — the reciprocal</text>')
  parts.push('<text x="530" y="148" font-size="10" fill="#65a30d" text-anchor="middle">flip, proved from the field laws</text>')
  parts.push('<text x="530" y="172" font-size="10.5" fill="#ea580c" text-anchor="middle" font-weight="700">the NEW bill: R ≠ 0 joins</text>')
  parts.push('<text x="530" y="196" font-size="10" fill="#d97706" text-anchor="middle">the only operation that adds a clause of its own</text>')
  // ---- panel 3: ADD (unlike) ----
  parts.push('<rect x="30" y="240" width="320" height="140" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="190" y="264" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">ADD · a/c + b/d = (ad + bc)/cd</text>')
  parts.push('<text x="190" y="286" font-size="10" fill="#65a30d" text-anchor="middle">the cross form always works; the LCD form</text>')
  parts.push('<text x="190" y="304" font-size="10" fill="#65a30d" text-anchor="middle">keeps the factors small — both priced equal</text>')
  parts.push('<text x="190" y="328" font-size="10.5" fill="#166534" text-anchor="middle">3/(x−1) + 2/(x+1) = (5x + 1)/((x−1)(x+1))</text>')
  parts.push('<text x="190" y="352" font-size="10" fill="#d97706" text-anchor="middle">bill: x ≠ ±1 — carried from the originals</text>')
  // ---- panel 4: SUBTRACT ----
  parts.push('<rect x="370" y="240" width="320" height="140" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="530" y="264" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">SUBTRACT · the bracket is law</text>')
  parts.push('<text x="530" y="286" font-size="10" fill="#65a30d" text-anchor="middle">a/Q − (b + c)/Q = (a − b − c)/Q</text>')
  parts.push('<text x="530" y="304" font-size="10" fill="#65a30d" text-anchor="middle">the bar distributes — forgetting it is priced</text>')
  parts.push('<text x="530" y="328" font-size="10.5" fill="#166534" text-anchor="middle">5/(x−1) − (x+2)/(x−1) = (3 − x)/(x−1)</text>')
  parts.push('<text x="530" y="352" font-size="10" fill="#d97706" text-anchor="middle">the wrong (7 − x) mismatches at every live point</text>')
  // caption band
  parts.push('<rect x="30" y="396" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="412" font-size="11" fill="#166534" text-anchor="middle">one compound discipline: bill first, factor everything, operate, simplify, carry the bill, check by substitution</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (8.2): the LCD collector — two factored denominators feed  */
/* one LCD taking each factor at max power. Header (30,18,660,44);     */
/* left box (30,84,300,110); right box (390,84,300,110); collector     */
/* (30,230,660,110); caption band (30,364,660,24). Geometry pinned in  */
/* verify-book3-ch08.ts plan82Fig2, audited in G.                      */
/* ------------------------------------------------------------------ */

function lcdCollectorSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The LCD collector: x²−x = x·(x−1) and x²−1 = (x−1)(x+1) feed the LCD x·(x−1)·(x+1), each factor at its maximum power">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the LCD collector — every factor, at its maximum power</text>')
  // ---- left box: x² − x ----
  parts.push('<rect x="30" y="84" width="300" height="110" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="180" y="110" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">x² − x = x · (x − 1)</text>')
  parts.push('<text x="180" y="132" font-size="10" fill="#65a30d" text-anchor="middle">contributes: x¹ and (x − 1)¹</text>')
  parts.push('<text x="180" y="154" font-size="10" fill="#65a30d" text-anchor="middle">dies at 0 and 1 — bill {0, 1}</text>')
  parts.push('<text x="180" y="178" font-size="9.5" fill="#0d9488" text-anchor="middle">the factoring toolkit of chapter 4, station one</text>')
  // ---- right box: x² − 1 ----
  parts.push('<rect x="390" y="84" width="300" height="110" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="540" y="110" font-size="12.5" fill="#0f766e" text-anchor="middle" font-weight="700">x² − 1 = (x − 1)(x + 1)</text>')
  parts.push('<text x="540" y="132" font-size="10" fill="#65a30d" text-anchor="middle">contributes: (x − 1)¹ and (x + 1)¹</text>')
  parts.push('<text x="540" y="154" font-size="10" fill="#65a30d" text-anchor="middle">dies at −1 and 1 — bill {−1, 1}</text>')
  parts.push('<text x="540" y="178" font-size="9.5" fill="#0d9488" text-anchor="middle">the difference of squares, reading itself</text>')
  // arrows into the collector
  parts.push('<line x1="180" y1="196" x2="180" y2="226" stroke="#ea580c" stroke-width="1.4"/>')
  parts.push('<path d="M 176 220 L 180 228 L 184 220" fill="none" stroke="#ea580c" stroke-width="1.4"/>')
  parts.push('<line x1="540" y1="196" x2="540" y2="226" stroke="#ea580c" stroke-width="1.4"/>')
  parts.push('<path d="M 536 220 L 540 228 L 544 220" fill="none" stroke="#ea580c" stroke-width="1.4"/>')
  // ---- collector ----
  parts.push('<rect x="30" y="230" width="660" height="110" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="360" y="262" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">LCD = x · (x − 1) · (x + 1)</text>')
  parts.push('<text x="360" y="286" font-size="10.5" fill="#166534" text-anchor="middle">each factor taken ONCE, at its maximum power over all denominators — x¹, (x−1)¹, (x+1)¹</text>')
  parts.push('<text x="360" y="308" font-size="10" fill="#0f766e" text-anchor="middle">divides both originals exactly; the verifier checked the divisibility and the minimality in the candidate grid</text>')
  parts.push('<text x="360" y="328" font-size="10" fill="#d97706" text-anchor="middle">the combined bill: {0, 1, −1} — the union of the parts, never less</text>')
  // caption band
  parts.push('<rect x="30" y="364" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="380" font-size="11" fill="#166534" text-anchor="middle">FM’s LCD law, grown up: the coefficient lcm of FM ch. 3, the factor-max-power union of this chapter — same collector, bigger cargo</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* (8.2) Operating on Algebraic Fractions                              */
/* ------------------------------------------------------------------ */

const lesson82: Lesson = {
  id: 'al-operating-on-algebraic-fractions',
  number: '8.2',
  title: 'Operating on Algebraic Fractions',
  concepts: [
    'multiplying rational expressions',
    'the reciprocal flip and its new bill',
    'cross-cancellation before multiplying',
    'adding and subtracting like denominators',
    'the bracket discipline in subtraction',
    'the LCD of polynomials',
    'the compound domain bill',
    'the hidden exclusion',
  ],
  objectives: [
    'multiply rational expressions by the product rule, canceling factors BEFORE multiplying',
    'divide by the reciprocal flip and add the divisor-numerator clause R ≠ 0 to the bill',
    'add and subtract with like denominators, distributing the bar over a bracketed numerator',
    'build the LCD of polynomials as each factor at its maximum power and use it for unlike denominators',
    'maintain the compound domain bill across a chain of operations — exclusions only ever grow',
    'price the classic traps: the wrong flip, the forgotten bracket, the lost exclusion',
  ],
  prerequisites: ['al-rational-expressions-simplify-first', 'fm-adding-subtracting-fractions', 'fm-multiplying-dividing-fractions'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math7-ch2', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Lesson 8.1 built the object and its first discipline: a rational expression is a quotient of polynomials, its domain is the denominator’s nonzero set, and reduction to lowest terms cancels FACTORS with their nonzero certificates while the bill of exclusions travels with the answer. This lesson puts the object to work: the four operations of FM chapter 4 — multiply, divide, add, subtract — re-run with letters under the bar. The laws survive the journey intact; what changes is that the BILL now compounds. A number-fraction had exactly one refusal (zero, below the bar); an algebraic fraction has the zeros of every polynomial it ever touches, and one operation — division — writes a new clause of its own.' },
    { kind: 'para', text: 'The chapter’s endgame makes the stakes visible one lesson early. Lesson 8.3 solves fractional EQUATIONS, and the standard technique multiplies both sides by the LCD — which can move a denominator’s zero from refused to candidate. A root that satisfies the multiplied-out equation but sits in the bill is the extraneous root, and the check that catches it is exactly the compound bill this lesson maintains. Every operation below is therefore proved, priced, and paired with its bill-entry rule. The four rules of the lesson fit one panel:' },
    { kind: 'figure', caption: 'The four-operation panel: multiply by PR/QS with factor-first cancellation; divide by the reciprocal flip with the NEW clause R ≠ 0; add through the cross form or the LCD form; subtract with the bracket distributed. Every panel ends at the same compound discipline — bill first, factor, operate, carry.', svg: fourOpsSvg() },
    { kind: 'terms', items: [
      { term: 'algebraic fraction', def: 'the working name for a rational expression — a quotient of polynomials read along its bar, with the bill of exclusions attached' },
      { term: 'cross-cancellation', def: 'canceling a factor shared between ANY numerator and ANY denominator of a product BEFORE multiplying — lawful where the factor is nonzero, cheaper than canceling after' },
      { term: 'the reciprocal flip', def: 'the division law: $\\frac{P}{Q} \\div \\frac{R}{S} = \\frac{P}{Q} \\cdot \\frac{S}{R}$ — proved from the field definitions, valid wherever everything exists and $R \\neq 0$' },
      { term: 'the flip clause', def: 'the division-only bill entry: the divisor’s numerator must be nonzero, so its zeros join the refused set — the one operation that adds its own law' },
      { term: 'like denominators', def: 'denominators that are identical polynomials — add or subtract the numerators directly, keeping the bar (and the bill)' },
      { term: 'the LCD of polynomials', def: 'the least common multiple of the denominators: every distinct factor taken once at its maximum exponent — divides each original exactly, and minimally' },
      { term: 'the compound bill', def: 'the domain record of a CHAIN of operations: the union of every original denominator’s zeros plus every clause added on the way — exclusions only ever grow' },
      { term: 'the hidden exclusion', def: 'a refusal the final form no longer shows — carried by the original statement, exposed only by the bill (the exhibit: $\\frac{1}{x} \\div \\frac{1}{x} = 1$ with $x \\neq 0$)' },
    ] },
    { kind: 'heading', text: 'Multiplication and Division: the Flip' },
    { kind: 'equation', latex: '\\frac{P}{Q} \\cdot \\frac{R}{S} = \\frac{P \\cdot R}{Q \\cdot S}', note: 'the product rule — numerators multiply, denominators multiply, and the bill is the union of both denominators’ zeros' },
    { kind: 'para', text: 'Multiplication is the easiest operation and the one where craft pays most. The rule is straight across — but the LAWFUL simplification happens BEFORE the multiplication, not after: factor each of the four polynomials completely (8.1’s station one), cancel every factor shared between any numerator and any denominator, and only then multiply what remains. This is cross-cancellation, the same habit FM chapter 4 taught for number fractions ($\\frac{3}{4} \\cdot \\frac{8}{9} = \\frac{1 \\cdot 2}{1 \\cdot 3}$ without ever computing $24$ and $36$), and the verifier confirmed it changes nothing — cancel-before and cancel-after produced identical exact values pointwise. The bill, meanwhile, is read from the ORIGINAL factors: both denominators’ zeros refuse, wherever the canceled ink went.' },
    { kind: 'example', title: 'Multiply (x² − 9)/x² · x/(x + 3) and state the bill', steps: [
      'FACTOR everything first: $(x^2-9) = (x-3)(x+3)$; the denominators are $x^2$ and $x + 3$.',
      'Bill from the originals: $x^2$ dies at $0$, and $x + 3$ dies at $-3$ — the product refuses $0$ and $-3$.',
      'CANCEL before multiplying: the factor $(x+3)$ cancels against the second denominator; one $x$ of $x^2$ cancels the second numerator.',
      'Hence $\\frac{(x-3)(x+3)}{x^2} \\cdot \\frac{x}{x+3} = \\frac{x-3}{x}$ for $x \\neq 0$, $x \\neq -3$ — the verifier priced all $9$ live window points, and the simplified form visibly lives at $-3$: the bill must be CARRIED, not read off the answer.',
    ], },
    { kind: 'para', text: 'Division is where the lesson earns its theorem. In the number world, dividing by $\\frac{2}{3}$ meant multiplying by $\\frac{3}{2}$ — and the same move runs on letters, but now the flipped fraction’s NUMERATOR becomes a denominator, so its zeros join the bill. Dividing by $\\frac{x+2}{2x}$ is dividing by a fraction whose VALUE is zero at $x = -2$ — and there is no dividing by zero, not by any route. The flip is therefore a theorem with a clause, not a mnemonic:' },
    { kind: 'derivation', title: 'Theorem — division is multiplication by the reciprocal', statement: 'Wherever $P/Q$ is defined and the divisor $R/S$ is a DEFINED NONZERO number — that is, $Q(x) \\neq 0$, $S(x) \\neq 0$, and additionally $R(x) \\neq 0$: $\\;\\frac{P}{Q} \\div \\frac{R}{S} = \\frac{P}{Q} \\cdot \\frac{S}{R} = \\frac{P \\cdot S}{Q \\cdot R}$.', steps: [
      { label: 'Certify the divisor', formula: 'S(x) \\neq 0, \\; R(x) \\neq 0', explanation: 'The divisor $\\frac{R}{S}$ must first EXIST ($S \\neq 0$, the standing bill) and must not be ZERO ($R \\neq 0$ — the new clause). Only a nonzero number has a reciprocal; ANS 7.2 proved the zero case has none.' },
      { label: 'Name the reciprocal', formula: '\\left(\\frac{R}{S}\\right)^{-1} = \\frac{S}{R}', explanation: 'The field laws give every nonzero number $z$ an inverse $z^{-1}$ with $z \\cdot z^{-1} = 1$. At the point, $\\frac{R(x)}{S(x)}$ is a genuine nonzero real number, so its reciprocal is $\\frac{S(x)}{R(x)}$ — letters, same truth.' },
      { label: 'Division is multiplication by the inverse', formula: 'a \\div b = a \\cdot b^{-1}', explanation: 'This is the definition of division inside a field (ANS 7.2): dividing by $b$ is multiplying by the unique number that annihilates $b$. The equation rule of 5.1 (multiply both members by the same nonzero quantity) was the same law in disguise.' },
      { label: 'Assemble', formula: '\\frac{P}{Q} \\div \\frac{R}{S} = \\frac{P}{Q} \\cdot \\frac{S}{R} = \\frac{P \\cdot S}{Q \\cdot R}', explanation: 'The flip is not a trick to remember but the field definition worn in letters. The verifier priced it on the pinned division $(x^2-4)/x \\div (x+2)/(2x)$: direct quotient and flipped product agreed exactly at all $9$ live window points, with the bill $\\{0, -2\\}$ — the $-2$ coming from the NEW clause $R(x) = x + 2 = 0$.' },
    ], result: 'The reciprocal flip, with its clause: dividing by $R/S$ multiplies by $S/R$ wherever everything exists and $R \\neq 0$ — and the divisor’s numerator zeros join the bill, the only operation that writes new law of its own.' },
    { kind: 'example', title: 'Divide (x² − 4)/x ÷ (x + 2)/(2x) and state the full bill', steps: [
      'Bill FIRST, both clauses: the denominators $x$ and $2x$ refuse $0$; the divisor’s numerator $x + 2$ refuses $-2$.',
      'FLIP: $\\frac{x^2-4}{x} \\div \\frac{x+2}{2x} = \\frac{(x-2)(x+2)}{x} \\cdot \\frac{2x}{x+2}$.',
      'CANCEL before multiplying: $(x+2)$ goes; the $x$ in $2x$ goes against the denominator $x$; leaving $2(x-2)$.',
      'Hence the division is $2(x-2)$ for $x \\neq 0$, $x \\neq -2$ — the verifier priced $9$ live points, and the clean-looking $2(x-2)$ hides BOTH refusals: the bill is the only place they survive.',
    ], },
    { kind: 'example', title: 'Multiply the monomials (6x²/5) · (10/x³)', steps: [
      'The rule runs without factoring — monomials are already products: $\\frac{6x^2}{5} \\cdot \\frac{10}{x^3} = \\frac{60x^2}{5x^3}$.',
      'Coefficients divide exactly: $60/5 = 12$. Powers subtract with the certificate: $\\frac{x^2}{x^3} = \\frac{1}{x}$.',
      'Hence the product is $\\frac{12}{x}$ for $x \\neq 0$ — the verifier priced all $10$ nonzero window points; the bill rides the $x$ that ended up below the bar.',
    ], },
    { kind: 'callout', tone: 'warn', title: 'Caution — flip the second, and bill the first’s partner', text: 'Two distinct wrong flips, both priced. (1) Flipping the FIRST fraction: for $(x/3) \\div (x/4)$ the student wrote $(3/x) \\cdot (x/4) = \\frac{3}{4}$ — the true value is $\\frac{4}{3}$; the verifier found the wrong form disagreeing at all $10$ live window points. It is not a small error but the reciprocal of the answer. (2) Forgetting the divisor’s clause: $(1/x) \\div \\frac{1}{x+2}$ is NOT $\\frac{x+2}{x}$ with no bill — the divisor is zero at $x = -2$, so $-2$ is refused even though the flipped form lives there. The clause $R \\neq 0$ is part of the theorem, not a footnote.' },
    { kind: 'heading', text: 'Addition and Subtraction: Like Denominators' },
    { kind: 'para', text: 'FM chapter 4’s like-denominator law — add the numerators, keep the denominator — needs no new proof here, because the field laws run identically: $\\frac{a}{Q} + \\frac{b}{Q} = \\frac{a+b}{Q}$, and the same with subtraction, wherever $Q$ lives. The algebraic content is the DISCIPLINE around the subtraction bar. The bar of $\\frac{5}{x-1} - \\frac{x+2}{x-1}$ groups the WHOLE second numerator: $\\frac{5 - (x+2)}{x-1} = \\frac{5 - x - 2}{x-1} = \\frac{3-x}{x-1}$. The classic error drops the bracket and reads $\\frac{5 - x + 2}{x-1} = \\frac{7-x}{x-1}$ — the verifier compared the two forms at every live window point and the bracketless form mismatched at ALL ten: not occasionally wrong, always wrong.' },
    { kind: 'example', title: 'Subtract (x + 3)/(x − 2) − (2x + 1)/(x − 2)', steps: [
      'Like denominators — combine the numerators under the shared bar, BRACKETING the second: $\\frac{(x+3) - (2x+1)}{x-2}$.',
      'Distribute the bar: $(x + 3) - (2x + 1) = x + 3 - 2x - 1 = -x + 2$.',
      'So the difference is $\\frac{2-x}{x-2}$ — and the sign-reading finishes it: $2 - x = -(x - 2)$, so the fraction is $\\frac{-(x-2)}{x-2} = -1$ (for $x \\neq 2$).',
      'Hence $(x+3)/(x-2) - (2x+1)/(x-2) = -1$ for $x \\neq 2$ — the verifier priced the constant $-1$ at all $10$ live window points. A whole family of algebraic differences is just the NUMBER $-1$ wearing a bill.',
    ], },
    { kind: 'heading', text: 'Unlike Denominators and the LCD' },
    { kind: 'para', text: 'Unlike denominators need the FM ritual again: build the LCD, transform each fraction, combine. The LCD of polynomials answers to one sentence — factor every denominator completely, then take each factor ONCE at its MAXIMUM power. The coefficient part runs FM chapter 3’s lcm ($\\text{lcm}(4, 6) = 12$, so the LCD of $\\frac{1}{4x^2}$ and $\\frac{1}{6x}$ is $12x^2$ — the verifier checked it divides both exactly and that no smaller candidate in the grid does); the letter part runs 8.1’s factoring toolkit. The collector below runs the standing exhibit:' },
    { kind: 'figure', caption: 'The LCD collector: x² − x contributes x·(x−1), x² − 1 contributes (x−1)(x+1); the LCD is x·(x−1)·(x+1) — each factor once, at maximum power. The combined bill {0, 1, −1} is the union of the parts.', svg: lcdCollectorSvg() },
    { kind: 'callout', tone: 'definition', title: 'Definition — the LCD of rational expressions', text: 'The LCD of a set of rational expressions is said to be the least common multiple of their denominators: factor each denominator completely, then form the product of every distinct factor taken at its maximum exponent. Thus, $\\text{lcm}(x(x-1), (x-1)(x+1)) = x(x-1)(x+1)$, and $\\text{lcm}(6x^2, 10x^3) = 30x^3$. Thus, in symbols, the LCD divides every original denominator exactly — the minimality that makes it the CHEAPEST common home.' },
    { kind: 'para', text: 'Two lawful routes exist for the combination, and the verifier confirmed they agree pointwise on every pinned sum. The CROSS form always works and needs no common ground: $\\frac{a}{c} + \\frac{b}{d} = \\frac{ad + bc}{cd}$ — multiply each numerator by the OTHER denominator. The LCD form transforms first — each fraction over the LCD — and then combines, keeping every factor small so the final cancellation has less to eat. The cross form inflates $\\frac{1}{x(x-1)} + \\frac{2}{(x-1)(x+1)}$ into a product of both denominators; the LCD form lands directly on $x(x-1)(x+1)$. Both carry the same bill.' },
    { kind: 'equation', latex: '\\frac{a}{c} + \\frac{b}{d} = \\frac{ad + bc}{cd} = \\frac{a \\cdot m/c + b \\cdot m/d}{m}', note: 'the cross form (middle) versus the LCD form (right, with m the LCD) — the verifier priced them equal pointwise on every pinned sum' },
    { kind: 'example', title: 'Add 1/(x² − x) + 2/(x² − 1) and state the bill', steps: [
      'FACTOR both denominators: $x^2 - x = x(x-1)$; $x^2 - 1 = (x-1)(x+1)$. Bill from the originals: $\\{0, 1, -1\\}$.',
      'BUILD the LCD: every factor at max power — $\\text{lcm} = x(x-1)(x+1)$ (the collector figure).',
      'TRANSFORM: $\\frac{1}{x(x-1)} = \\frac{x+1}{x(x-1)(x+1)}$ and $\\frac{2}{(x-1)(x+1)} = \\frac{2x}{x(x-1)(x+1)}$.',
      'COMBINE: $\\frac{(x+1) + 2x}{x(x-1)(x+1)} = \\frac{3x+1}{x(x-1)(x+1)}$ — the numerator never factors further; the form is final.',
      'Hence $\\frac{1}{x^2-x} + \\frac{2}{x^2-1} = \\frac{3x+1}{x(x-1)(x+1)}$ for $x \\neq 0$, $\\pm 1$; the verifier priced the direct sum, the cross form and the LCD form equal at all $8$ live window points (the exhibit value at $x = 2$: $\\frac{1}{2} + \\frac{2}{3} = \\frac{7}{6}$, and $\\frac{3 \\cdot 2 + 1}{2 \\cdot 1 \\cdot 3} = \\frac{7}{6}$).',
    ], },
    { kind: 'heading', text: 'The Domain Bill Compounds' },
    { kind: 'para', text: 'Every operation of this lesson obeys one monotonic law: the bill only GROWS. A product keeps the refusals of both factors. A quotient keeps those and adds the divisor’s numerator zeros — the flip’s clause. A sum or difference keeps the refusals of every fraction that fed it, even when the combined denominator would politely ignore them. Nothing in algebra UN-refuses a point: the expression as originally written is the object of record, and every later form is a view of it. The audit habit follows: bill the exclusions from the ORIGINAL statement, in the FIRST minute of the problem, and write them down before any ink moves.' },
    { kind: 'para', text: 'The hidden exclusion is the trap this section exists for, and it deserves the priced exhibit. Compute $\\frac{1}{x} \\div \\frac{1}{x}$: the flip gives $\\frac{1}{x} \\cdot \\frac{x}{1} = 1$. The answer is the constant $1$ — and the careless reader concludes there is nothing to refuse. But the verifier priced the quotient at the window: it lives at $10$ of the $11$ points and is refused at $0$, where the original denominators die. The bill says $x \\neq 0$; the answer says $1$; both are true, and only together. This is the exact mechanism 8.3 exploits: an equation’s proposed root is admitted ONLY if it sits inside the bill that was audited before the solving began.' },
    { kind: 'callout', tone: 'insight', title: 'Insight — the bill is the identity’s fine print', text: 'Every simplification of this lesson is an IDENTITY on a domain: the two forms agree wherever the original lived, and the bill is the complete record of everywhere else. The clean form $2(x-2)$, the constant $1$, the single $x$ — each looks like it forgot its history; the bill is the memory. Read every exam answer as the PAIR (form, bill), never the form alone: the form is what the algebra built, the bill is what the algebra was allowed to build on. The examiner’s phrase "state the restrictions" is the request for the second half of the object.' },
    { kind: 'table', caption: 'The operation audit — what each operation does to the bill (priced on this lesson’s exhibits)', head: ['operation', 'the rule', 'the bill it produces', 'the pinned exhibit'], rows: [
      ['multiply', '$PR/QS$, factor first', 'union of both denominators’ zeros', '$(x-3)/x$ with $x \\neq 0, -3$'],
      ['divide', 'flip: $PS/QR$', 'both denominators PLUS the divisor numerator’s zeros', '$2(x-2)$ with $x \\neq 0, -2$'],
      ['add (unlike)', 'LCD or cross form', 'every original denominator’s zeros', '$(3x+1)/(x(x-1)(x+1))$ with $x \\neq 0, \\pm 1$'],
      ['subtract (like)', 'combine, bracket the bar', 'the shared denominator’s zeros', '$-1$ with $x \\neq 2$'],
    ] },
    { kind: 'para', text: 'One more shape belongs in the working kit, because examinations set it and because it tests the whole lesson at once: the COMPLEX FRACTION — a fraction whose own floors are fractions, read along its MAIN bar. Two honest routes, both lawful everywhere the certificates hold. The LCD route: multiply the outer numerator and denominator by the LCD of all the small denominators, which clears every floor in one stroke. The flip route: read the main bar as division and apply the reciprocal flip with its clause. The routes agree — both are the field laws — and the exercises drill the like-denominator case where the answer collapses to a single clean fraction.' },
    { kind: 'para', text: 'The craft, collected in the working order that survives into 8.3 and every examination set:' },
    { kind: 'list', marker: 'roman', items: [
      '(i) BILL first — read the zeros of every denominator as given, before any ink moves;',
      '(ii) FACTOR everything — the four polynomials of a product, the denominators of a sum: chapter 4 is the engine room;',
      '(iii) OPERATE with the lawful rule — cross-cancel before multiplying, flip with the divisor clause, combine under the bracket, transform to the LCD;',
      '(iv) CARRY the bill and CHECK — substitute one live point into the original and the final form; read the same truth twice.',
    ] },
    { kind: 'list', items: [
      '**Pointwise honest.** Every operation rule was priced as an exact pointwise identity — direct form versus flipped/LCD/combined form, zero disagreements on every live window point.',
      '**Bill-complete.** Each exhibit’s answer carried its full compound bill: $9$ live points for the product exhibit ($\\{0, -3\\}$), $9$ for the division ($\\{0, -2\\}$), $8$ for the LCD sum ($\\{0, \\pm 1\\}$), $10$ for the $-1$ landing ($\\{2\\}$).',
      '**Trap-priced.** The wrong flip, the forgotten bracket and the hidden exclusion were each priced at $10$ mismatches out of $10$ live points — the traps are not subtle, they are total.',
    ] },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the bar, the flip and the collectors', text: 'The horizontal fraction bar itself is a piece of notation history: the Arabic arithmetics transmitted the stacked fraction to Europe, and the practice spread through the commercial arithmetic of Fibonacci’s Liber Abaci (1202) — the hedged consensus of the banking run’s survey; the specific bar rules varied for centuries before print standardized them. What THIS lesson owns is older than any notation: the reciprocal as the field’s inverse and division as multiplication by it is the structure ANS 7.2 proved for the rational system, and the classical algebra course (Hall & Knight’s fractions chapter again) taught exactly the four operations of this lesson in exactly this order — reduction first, multiplication, division by the reciprocal, then the LCD. No content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope; SSC/bank mains; JEE-Main foundations) sets this lesson four ways. (1) The operation grid: simplify a compound product/quotient of three or four fractions — the factor-first habit turns a three-line monster into a one-line answer, and the bill is the mark-splitter. (2) The LCD hunt: add two fractions whose denominators are $x^2 - x$ and $x^2 - 1$-class — the max-power collector is the whole question. (3) The bill-count item: "how many values of $x$ are excluded from …" — answer from the ORIGINALS, and remember division adds the flip clause. (4) Work-rate word problems: a job of $(x^2 + 2x)$ units at $(x + 2)$ per hour takes $x$ hours — a division that simplifies, with the habitat and the bill both marking the line between form and situation.' },
    { kind: 'formula', name: 'The product rule', latex: '\\frac{P}{Q} \\cdot \\frac{R}{S} = \\frac{P \\cdot R}{Q \\cdot S}', note: 'factor first, cross-cancel before multiplying; bill = both denominators’ zeros' },
    { kind: 'formula', name: 'The reciprocal flip', latex: '\\frac{P}{Q} \\div \\frac{R}{S} = \\frac{P}{Q} \\cdot \\frac{S}{R} = \\frac{PS}{QR} \\quad (R \\neq 0)', note: 'flip the SECOND fraction; the clause R ≠ 0 joins the bill — the only operation that adds its own law' },
    { kind: 'formula', name: 'The LCD rule', latex: '\\frac{a}{c} + \\frac{b}{d} = \\frac{a \\cdot m/c + b \\cdot m/d}{m}, \\; m = \\text{lcm}(c, d)', note: 'each factor at max power; the cross form (ad + bc)/cd is the always-works twin — both priced equal' },
    { kind: 'quiz', title: 'Check yourself', items: [
      {
        q: '$\\frac{x^2-9}{x^2} \\cdot \\frac{x}{x+3}$ simplifies to —',
        options: ['$x - 3$', '$\\frac{x-3}{x+3}$', '$\\frac{x-3}{x}$, with $x \\neq 0, -3$', '$\\frac{x-3}{x}$, with $x \\neq 0$ only'],
        answer: 2,
        explain: 'Factor first, cancel before multiplying: $(x+3)$ and one $x$ go, leaving $\\frac{x-3}{x}$. The bill is read from the ORIGINALS: $x^2$ refuses $0$ and $x + 3$ refuses $-3$ — option 4 dropped the $-3$ clause, which is exactly where the simplified form lives ($\\frac{-6}{-3} = 2$ there); options 1 and 2 mis-cancel.',
      },
      {
        q: 'To compute $\\frac{P}{Q} \\div \\frac{R}{S}$ you —',
        options: ['flip the first fraction', 'multiply by $S/R$ — and add the bill $R \\neq 0$', 'add the denominators', 'cross-multiply and keep nothing'],
        answer: 1,
        explain: 'The reciprocal flip is a theorem: divide by the SECOND fraction’s reciprocal, wherever everything exists AND $R \\neq 0$ — the divisor must be a defined nonzero number, so its numerator’s zeros join the bill. Option 1 flips the wrong fraction (priced: the reciprocal of the answer); option 3 invents a rule; option 4 is cross-multiplication, which solves EQUATIONS but is not a quotient identity.',
      },
      {
        q: 'The LCD of $\\frac{1}{x^2 - x}$ and $\\frac{2}{x^2 - 1}$ is —',
        options: ['$(x-1)(x+1)$', '$x(x-1)^2(x+1)$', '$x^2 - 1$', '$x(x-1)(x+1)$'],
        answer: 3,
        explain: 'Factor completely: $x^2 - x = x(x-1)$ and $x^2 - 1 = (x-1)(x+1)$. The collector takes each distinct factor ONCE at its maximum power: $x \\cdot (x-1) \\cdot (x+1)$. Option 1 lost the $x$; option 2 inflated $(x-1)$ to a power no denominator demands (the LCD must be LEAST); option 3 is only the second denominator, which does not contain the factor $x$ and so does not divide the first.',
      },
      {
        q: '$\\frac{5}{x-1} - \\frac{x+2}{x-1}$ equals —',
        options: ['$\\frac{7-x}{x-1}$', '$\\frac{3-x}{x-1}$', '$\\frac{3-x}{x+1}$', '$\\frac{3+x}{x-1}$'],
        answer: 1,
        explain: 'The bar brackets the whole second numerator: $5 - (x+2) = 5 - x - 2 = 3 - x$, over the shared denominator $x - 1$ (bill $x \\neq 1$). Option 1 is the forgotten-bracket form $5 - x + 2$ — the verifier priced it wrong at every live window point. Options 3 and 4 changed the denominator or the sign order without a licence.',
      },
      {
        q: 'After simplifying, the exclusion bill of $\\frac{1}{x} \\div \\frac{1}{x}$ is —',
        options: ['nothing — the answer is $1$', '$x \\neq 1$', '$x \\neq 0$', 'depends on $x$'],
        answer: 2,
        explain: 'The flip gives $\\frac{1}{x} \\cdot \\frac{x}{1} = 1$ — but the bill belongs to the ORIGINALS: both denominators are $x$, refusing $0$, where the quotient reads $\\frac{1/0}{1/0}$ and does not exist. The verifier priced the quotient alive at exactly $10$ of the $11$ window points. The clean answer $1$ hides the refusal — the hidden exclusion, carried from the originals, not from the answer.',
      },
    ] },
    { kind: 'exercises', title: 'Exercises 8.2', sets: [
      { level: 'L1', questions: [
        {
          q: 'Multiply: $\\frac{x}{3} \\cdot \\frac{6}{x^2}$.',
          solution: [
            'Straight across with cross-cancellation: $\\frac{x}{3} \\cdot \\frac{6}{x^2} = \\frac{6x}{3x^2}$.',
            'Coefficients: $6/3 = 2$. Powers: $\\frac{x}{x^2} = \\frac{1}{x}$ (certificate $x \\neq 0$).',
            'Hence the product is $\\frac{2}{x}$ for $x \\neq 0$; the verifier priced all $10$ nonzero window points.',
          ],
          answer: '$\\frac{2}{x}$, with $x \\neq 0$.',
        },
        {
          q: 'Divide: $\\frac{x}{2} \\div \\frac{x}{4}$.',
          solution: [
            'Flip the SECOND fraction: $\\frac{x}{2} \\cdot \\frac{4}{x}$.',
            'Cancel: the $x$’s go (certificate $x \\neq 0$ — both the denominators and the divisor’s numerator), and $4/2 = 2$.',
            'Hence the quotient is the constant $2$ for $x \\neq 0$ — with the bill riding the originals, not the clean answer.',
          ],
          answer: '$2$, with $x \\neq 0$.',
        },
        {
          q: 'Add: $\\frac{1}{x} + \\frac{2}{x}$.',
          solution: [
            'Like denominators: add the numerators, keep the bar — $\\frac{1 + 2}{x} = \\frac{3}{x}$.',
            'The bill rides the shared denominator: $x \\neq 0$.',
            'Hence $\\frac{3}{x}$ for $x \\neq 0$; the verifier priced the sum at all $10$ live window points.',
          ],
          answer: '$\\frac{3}{x}$, with $x \\neq 0$.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: 'Multiply: $\\frac{x^2 - 1}{x + 1} \\cdot \\frac{x}{x - 1}$.',
          solution: [
            'FACTOR first: $x^2 - 1 = (x-1)(x+1)$. Bill from the originals: $(x+1)$ and $(x-1)$ refuse $-1$ and $1$.',
            'CANCEL before multiplying: $(x+1)$ against the second denominator, $(x-1)$ against the second numerator.',
            'Hence the product is $x$ for $x \\neq \\pm 1$ — the verifier priced all $9$ live window points, and the bare $x$ needs its carried bill.',
          ],
          answer: '$x$, with $x \\neq 1$ and $x \\neq -1$.',
        },
        {
          q: 'Subtract: $\\frac{x+3}{x-2} - \\frac{2x+1}{x-2}$.',
          solution: [
            'Like denominators — bracket the second numerator: $\\frac{(x+3) - (2x+1)}{x-2} = \\frac{-x+2}{x-2}$.',
            'The sign reading finishes it: $-x + 2 = -(x - 2)$, so the fraction is $\\frac{-(x-2)}{x-2} = -1$ for $x \\neq 2$.',
            'Hence the difference is the constant $-1$ with bill $\\{2\\}$ — the verifier priced it at all $10$ live window points.',
          ],
          answer: '$-1$, with $x \\neq 2$.',
        },
        {
          q: 'Add: $\\frac{5}{x+1} + \\frac{3}{x-1}$.',
          solution: [
            'Unlike denominators — the cross form is cheapest here: $\\frac{5(x-1) + 3(x+1)}{(x+1)(x-1)}$.',
            'Collect the numerator: $5x - 5 + 3x + 3 = 8x - 2$.',
            'Hence $\\frac{8x-2}{(x+1)(x-1)}$ for $x \\neq \\pm 1$ (or $\\frac{2(4x-1)}{(x+1)(x-1)}$); the verifier priced the LCD form equal to the direct sum at all $9$ live points.',
          ],
          answer: '$\\frac{8x-2}{(x+1)(x-1)}$, with $x \\neq 1$ and $x \\neq -1$.',
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Multiply: $\\frac{x^2 - 4}{x^2 - x} \\cdot \\frac{x}{x + 2}$.',
          solution: [
            'FACTOR everything: $(x-2)(x+2)$, $x(x-1)$, $x$, $(x+2)$. Bill from the originals: $\\{0, 1, -2\\}$.',
            'CANCEL before multiplying: $(x+2)$ against the second denominator; the lone $x$ of the second numerator against the $x$ of $x(x-1)$.',
            'Hence $\\frac{(x-2)(x+2)\\,x}{x(x-1)(x+2)} = \\frac{x-2}{x-1}$ for $x \\neq 0$, $1$, $-2$; the verifier priced all $8$ live window points.',
          ],
          answer: '$\\frac{x-2}{x-1}$, with $x \\neq 0$, $x \\neq 1$, $x \\neq -2$.',
        },
        {
          q: 'Divide: $\\frac{x^2 - 9}{x^2} \\div \\frac{x-3}{3x}$.',
          solution: [
            'Bill BOTH clauses first: $x^2$ refuses $0$; the divisor’s numerator $x - 3$ refuses $3$ (its denominator $3x$ also refuses $0$).',
            'FLIP and factor: $\\frac{(x-3)(x+3)}{x^2} \\cdot \\frac{3x}{x-3}$.',
            'CANCEL: $(x-3)$ goes; one $x$ of $3x$ goes against the $x^2$.',
            'Hence $\\frac{3(x+3)}{x}$ for $x \\neq 0$, $3$ — the verifier priced all $9$ live window points; the clause $3$ is the flip’s own entry.',
          ],
          answer: '$\\frac{3(x+3)}{x}$, with $x \\neq 0$ and $x \\neq 3$.',
        },
        {
          q: 'A student computes $\\frac{x}{3} \\div \\frac{x}{4} = \\frac{3}{x} \\cdot \\frac{x}{4} = \\frac{3}{4}$. Audit.',
          solution: [
            'The student flipped the FIRST fraction — the law flips the SECOND.',
            'Correctly: $\\frac{x}{3} \\cdot \\frac{4}{x} = \\frac{4}{3}$ for $x \\neq 0$ — the verifier priced the constant at all $10$ live window points.',
            'The student’s $\\frac{3}{4}$ is not a nearby error but the exact RECIPROCAL of the answer; the verifier priced the mismatch at all $10$ live points.',
            'Hence the audit: unlawful flip; correct value $\\frac{4}{3}$, with the bill $x \\neq 0$ carried from the originals.',
          ],
          answer: 'Unlawful — flipping the first fraction gives the reciprocal of the answer; the correct value is $\\frac{4}{3}$, with $x \\neq 0$.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Add: $\\frac{2}{x^2 - 4} + \\frac{1}{x + 2}$.',
          solution: [
            'FACTOR: $x^2 - 4 = (x-2)(x+2)$. Bill from the originals: $\\{2, -2\\}$.',
            'BUILD the LCD: $(x-2)(x+2)$ — the second denominator is ALREADY a divisor of it.',
            'TRANSFORM and combine: $\\frac{2}{(x-2)(x+2)} + \\frac{x-2}{(x-2)(x+2)} = \\frac{2 + (x-2)}{(x-2)(x+2)} = \\frac{x}{(x-2)(x+2)}$.',
            'Hence $\\frac{x}{(x-2)(x+2)}$ for $x \\neq \\pm 2$; the verifier priced the direct sum equal to the LCD form at all $9$ live window points.',
          ],
          answer: '$\\frac{x}{(x-2)(x+2)}$, with $x \\neq 2$ and $x \\neq -2$.',
        },
        {
          q: 'Subtract: $\\frac{1}{x^2 - x} - \\frac{1}{x^2 + x}$.',
          solution: [
            'FACTOR both: $x(x-1)$ and $x(x+1)$. Bill from the originals: $\\{0, 1, -1\\}$.',
            'BUILD the LCD: $x(x-1)(x+1)$; transform each: $\\frac{x+1}{x(x-1)(x+1)} - \\frac{x-1}{x(x-1)(x+1)}$.',
            'Combine under the bracket: $\\frac{(x+1) - (x-1)}{x(x-1)(x+1)} = \\frac{2}{x(x-1)(x+1)}$.',
            'Hence $\\frac{2}{x(x-1)(x+1)}$ for $x \\neq 0$, $\\pm 1$; the verifier priced the direct difference equal to the LCD form at all $8$ live window points.',
          ],
          answer: '$\\frac{2}{x(x-1)(x+1)}$, with $x \\neq 0$, $x \\neq 1$, $x \\neq -1$.',
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'A machine assembles $(x^2 + 2x)$ boxes at a steady rate of $(x + 2)$ boxes per hour. How long does the job take?',
          solution: [
            'Time is work over rate: $t = \\frac{x^2 + 2x}{x+2} = \\frac{x(x+2)}{x+2}$.',
            'CANCEL with the certificate: $t = x$ hours, for $x \\neq -2$.',
            'The bill is the situation: a NEGATIVE $x$ is no job at all, and $x = -2$ would make the rate $0$ — no assembling happens. The habitat is whole $x \\geq 1$.',
            'Hence the job takes $x$ hours; the verifier priced the quotient equal to $x$ at all $10$ live window points.',
          ],
          answer: '$x$ hours, with $x \\neq -2$ (and the whole-number habitat $x \\geq 1$).',
        },
        {
          q: 'Car A burns $(x^2 + x)$ litres over $(x + 1)$ hours; car B burns $(x^2 - x)$ litres over $(x - 1)$ hours. Which burns more per hour?',
          solution: [
            'Rate is litres over hours. Car A: $\\frac{x(x+1)}{x+1} = x$ L/h, bill $x \\neq -1$.',
            'Car B: $\\frac{x(x-1)}{x-1} = x$ L/h, bill $x \\neq 1$.',
            'The rates are EQUAL — both simplify to $x$ on the common domain $x \\neq \\pm 1$; the verifier priced both forms at all $9$ live window points and found them identical.',
            'Hence neither burns more: the designed tie is the question’s point, and only the simplification could see it.',
          ],
          answer: 'Equal — both burn $x$ L/h on the common domain $x \\neq \\pm 1$.',
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'Prove the reciprocal-flip law from the field laws — $\\frac{P}{Q} \\div \\frac{R}{S} = \\frac{PS}{QR}$ wherever $Q, S \\neq 0$ and $R \\neq 0$ — and price the hidden exclusion on $\\frac{1}{x} \\div \\frac{1}{x}$.',
          solution: [
            'Work at a point and write $a = P/Q$ (defined, since $Q \\neq 0$), $b = R/S$ (defined, since $S \\neq 0$), and note $b \\neq 0$ exactly when $R \\neq 0$ — a quotient of reals is zero only when its numerator is zero (8.1’s zero-fraction verdict).',
            'The field laws (ANS 7.2) give $b$ a unique inverse $b^{-1}$ with $b \\cdot b^{-1} = 1$; here $b^{-1} = S/R$ exactly, since $\\frac{R}{S} \\cdot \\frac{S}{R} = \\frac{RS}{SR} = 1$.',
            'Division in a field is DEFINED as multiplication by the inverse: $a \\div b = a \\cdot b^{-1} = \\frac{P}{Q} \\cdot \\frac{S}{R} = \\frac{PS}{QR}$ — the flip, no mnemonic needed.',
            'The clause is the content: the proof USED $R \\neq 0$, so the identity is silent there. At $x$ with $R(x) = 0$ the divisor is the number $0$, which has no inverse — ANS 7.2’s proof — and the division does not exist.',
            'Price the hidden exclusion: $\\frac{1}{x} \\div \\frac{1}{x} = \\frac{1}{x} \\cdot \\frac{x}{1} = 1$ — yet the divisor $\\frac{1}{x}$ is defined only for $x \\neq 0$ and is the number $0$ AT $x = 0$. The verifier priced the quotient alive at exactly $10$ of the $11$ window points, each reading $1$; the bill $\\{0\\}$ rides the originals forever. Hence the theorem with its clause, and the audit habit that makes 8.3’s extraneous-root filter work.',
          ],
          answer: 'The flip is the field definition of division — multiply by the inverse $S/R$, which exists exactly when $R \\neq 0$; the hidden exclusion ($x \\neq 0$ on a quotient that reads $1$) shows the clause is carried by the ORIGINALS, never by the clean answer.',
        },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* Figure 1 (8.3): the clearing pipeline — the classic equation        */
/* flowing through the five stations to its refused verdict.           */
/* Header (30,18,660,44); stations (30,84,122,150), (164,84,122,150),  */
/* (298,84,122,150), (432,84,122,150), (566,84,122,150); result band   */
/* (30,258,660,44); caption band (30,314,660,24). Geometry pinned in   */
/* verify-book3-ch08.ts plan83Fig1, audited in J.                      */
/* ------------------------------------------------------------------ */

function clearingPipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The clearing pipeline: factor, state the bill, multiply by the LCD, solve the cleared equation, check every candidate — the worked classic ends refused">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="40" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the clearing pipeline — multiply by the LCD, then make the bill the judge</text>')
  parts.push('<text x="360" y="55" font-size="10.5" fill="#65a30d" text-anchor="middle">the worked classic below dies at station 5 — and the pipeline says so honestly</text>')
  // ---- station 1: FACTOR ----
  parts.push('<rect x="30" y="84" width="122" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="91" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">1 · FACTOR</text>')
  parts.push('<text x="91" y="128" font-size="10" fill="#65a30d" text-anchor="middle">every denominator,</text>')
  parts.push('<text x="91" y="143" font-size="10" fill="#65a30d" text-anchor="middle">completely</text>')
  parts.push('<text x="91" y="167" font-size="10" fill="#d97706" text-anchor="middle">x − 3 stays put</text>')
  parts.push('<text x="91" y="182" font-size="10" fill="#d97706" text-anchor="middle">(x² − 9) → (x−3)(x+3)</text>')
  parts.push('<text x="91" y="205" font-size="9.5" fill="#0d9488" text-anchor="middle">8.1’s station one</text>')
  // ---- station 2: BILL ----
  parts.push('<rect x="164" y="84" width="122" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="225" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">2 · BILL</text>')
  parts.push('<text x="225" y="128" font-size="10" fill="#65a30d" text-anchor="middle">union of every</text>')
  parts.push('<text x="225" y="143" font-size="10" fill="#65a30d" text-anchor="middle">denominator’s zeros</text>')
  parts.push('<text x="225" y="167" font-size="10" fill="#dc2626" text-anchor="middle" font-weight="700">bill {3}</text>')
  parts.push('<text x="225" y="182" font-size="10" fill="#65a30d" text-anchor="middle">before any ink moves</text>')
  parts.push('<text x="225" y="205" font-size="9.5" fill="#0d9488" text-anchor="middle">8.2’s audit habit</text>')
  // ---- station 3: MULTIPLY ----
  parts.push('<rect x="298" y="84" width="122" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="359" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">3 · MULTIPLY</text>')
  parts.push('<text x="359" y="128" font-size="10" fill="#65a30d" text-anchor="middle">both members by</text>')
  parts.push('<text x="359" y="143" font-size="10" fill="#65a30d" text-anchor="middle">the LCD</text>')
  parts.push('<text x="359" y="167" font-size="10" fill="#d97706" text-anchor="middle">x = 3 + 2(x − 3)</text>')
  parts.push('<text x="359" y="182" font-size="10" fill="#65a30d" text-anchor="middle">a polynomial remains</text>')
  parts.push('<text x="359" y="205" font-size="9.5" fill="#dc2626" text-anchor="middle">one-way at the bill</text>')
  // ---- station 4: SOLVE ----
  parts.push('<rect x="432" y="84" width="122" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="493" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">4 · SOLVE</text>')
  parts.push('<text x="493" y="128" font-size="10" fill="#65a30d" text-anchor="middle">the cleared</text>')
  parts.push('<text x="493" y="143" font-size="10" fill="#65a30d" text-anchor="middle">equation</text>')
  parts.push('<text x="493" y="167" font-size="10" fill="#d97706" text-anchor="middle">−x + 3 = 0</text>')
  parts.push('<text x="493" y="182" font-size="10" fill="#d97706" text-anchor="middle">candidate x = 3</text>')
  parts.push('<text x="493" y="205" font-size="9.5" fill="#0d9488" text-anchor="middle">5.2 · chapter 4</text>')
  // ---- station 5: CHECK ----
  parts.push('<rect x="566" y="84" width="122" height="150" rx="8" fill="none" stroke="#ea580c" stroke-width="1.8"/>')
  parts.push('<text x="627" y="106" font-size="12" fill="#0f766e" text-anchor="middle" font-weight="700">5 · CHECK</text>')
  parts.push('<text x="627" y="128" font-size="10" fill="#65a30d" text-anchor="middle">every candidate</text>')
  parts.push('<text x="627" y="143" font-size="10" fill="#65a30d" text-anchor="middle">against the bill</text>')
  parts.push('<text x="627" y="167" font-size="10" fill="#dc2626" text-anchor="middle" font-weight="700">3 ∈ bill {3}</text>')
  parts.push('<text x="627" y="182" font-size="10" fill="#dc2626" text-anchor="middle" font-weight="700">REFUSED</text>')
  parts.push('<text x="627" y="205" font-size="9.5" fill="#0d9488" text-anchor="middle">the extraneous trap</text>')
  // ---- result band ----
  parts.push('<rect x="30" y="258" width="660" height="44" rx="8" fill="#fef3c7" stroke="#ea580c" stroke-width="1.4"/>')
  parts.push('<text x="360" y="277" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">the classic x/(x−3) = 3/(x−3) + 2: cleared root x = 3 → 3 sits in the bill {3} → refused</text>')
  parts.push('<text x="360" y="293" font-size="11" fill="#166534" text-anchor="middle">the solution set is EMPTY — the clearing manufactured a candidate the original never admitted</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">roots are added by clearing, never destroyed — so the check is the last station, not an ornament</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (8.3): the check filter — candidates in, verdicts out,     */
/* with the three verdict shapes of 5.3 returned for equations.        */
/* Header (30,18,660,44); candidates (30,84,200,150); filter           */
/* (260,84,200,150); pass (490,84,200,68); refuse (490,166,200,68);    */
/* verdict strip (30,258,660,44); caption band (30,314,660,24).        */
/* Geometry pinned in verify-book3-ch08.ts plan83Fig2, audited in J.   */
/* ------------------------------------------------------------------ */

function checkFilterSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The check filter: the cleared equation’s candidates flow through the compound bill; survivors form the solution set, refused ones are extraneous">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="40" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the check filter — candidates in, verdicts out</text>')
  parts.push('<text x="360" y="55" font-size="10.5" fill="#65a30d" text-anchor="middle">every root of the cleared equation must earn passage through the compound bill</text>')
  // ---- candidates box ----
  parts.push('<rect x="30" y="84" width="200" height="150" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="130" y="106" font-size="11.5" fill="#0f766e" text-anchor="middle" font-weight="700">THE CANDIDATES</text>')
  parts.push('<text x="130" y="122" font-size="10" fill="#65a30d" text-anchor="middle">roots of the cleared equation</text>')
  parts.push('<text x="130" y="146" font-size="10" fill="#d97706" text-anchor="middle">x = 4  (the cross form)</text>')
  parts.push('<text x="130" y="163" font-size="10" fill="#d97706" text-anchor="middle">x = 3  (the classic)</text>')
  parts.push('<text x="130" y="180" font-size="10" fill="#d97706" text-anchor="middle">x = 0, 1  (two candidates)</text>')
  parts.push('<text x="130" y="197" font-size="10" fill="#d97706" text-anchor="middle">every x  (the identity)</text>')
  parts.push('<text x="130" y="220" font-size="9.5" fill="#0d9488" text-anchor="middle">station 4 hands them over</text>')
  // ---- filter box ----
  parts.push('<rect x="260" y="84" width="200" height="150" rx="8" fill="none" stroke="#ea580c" stroke-width="1.8"/>')
  parts.push('<text x="360" y="106" font-size="11.5" fill="#0f766e" text-anchor="middle" font-weight="700">THE COMPOUND BILL</text>')
  parts.push('<text x="360" y="122" font-size="10" fill="#65a30d" text-anchor="middle">is the candidate refused?</text>')
  parts.push('<text x="360" y="146" font-size="10" fill="#dc2626" text-anchor="middle">cross form: x ≠ −1, 1</text>')
  parts.push('<text x="360" y="163" font-size="10" fill="#dc2626" text-anchor="middle">the classic: x ≠ 3</text>')
  parts.push('<text x="360" y="180" font-size="10" fill="#dc2626" text-anchor="middle">two candidates: x ≠ −1, 1</text>')
  parts.push('<text x="360" y="197" font-size="10" fill="#dc2626" text-anchor="middle">the identity: x ≠ −3</text>')
  parts.push('<text x="360" y="220" font-size="9.5" fill="#0d9488" text-anchor="middle">read from the ORIGINALS, first minute</text>')
  // ---- pass outcome ----
  parts.push('<rect x="490" y="84" width="200" height="68" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="1.6"/>')
  parts.push('<text x="590" y="108" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">PASSES → SOLUTION SET</text>')
  parts.push('<text x="590" y="126" font-size="10" fill="#65a30d" text-anchor="middle">x = 4 · x = 0 · every x ≠ −3</text>')
  parts.push('<text x="590" y="142" font-size="10" fill="#65a30d" text-anchor="middle">each checks in the ORIGINAL</text>')
  // ---- refuse outcome ----
  parts.push('<rect x="490" y="166" width="200" height="68" rx="8" fill="none" stroke="#dc2626" stroke-width="1.6"/>')
  parts.push('<text x="590" y="190" font-size="11.5" fill="#dc2626" text-anchor="middle" font-weight="700">REFUSED → EXTRANEOUS</text>')
  parts.push('<text x="590" y="208" font-size="10" fill="#65a30d" text-anchor="middle">x = 3 dies in (x−3)</text>')
  parts.push('<text x="590" y="224" font-size="10" fill="#65a30d" text-anchor="middle">x = 1 dies in (x−1)</text>')
  // ---- verdict strip ----
  parts.push('<rect x="30" y="258" width="660" height="44" rx="8" fill="#fef3c7" stroke="#ea580c" stroke-width="1.4"/>')
  parts.push('<text x="360" y="277" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">the three verdicts of 5.3, back for equations: ONE solution · NONE (the only candidate refused) · ALL BUT THE BILL</text>')
  parts.push('<text x="360" y="293" font-size="11" fill="#166534" text-anchor="middle">the ledger: x = 4 · the classic’s ∅ · every x ≠ −3 — each priced by the verifier in the original</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">the bill was audited before the solving began — the check only reads what was already written</text>')
  parts.push('</svg>')
  return parts.join('')
}

const lesson83: Lesson = {
  id: 'al-fractional-equations-and-extraneous-roots',
  number: '8.3',
  title: 'Fractional Equations and Extraneous Roots',
  concepts: [
    'fractional equation',
    'clearing denominators',
    'the compound bill',
    'extraneous root',
    'cross-multiplication',
    'the zero-fraction filter',
    'work-rate equation',
    'the habitat check',
  ],
  objectives: [
    'recognize a fractional equation and state its compound bill before any solving begins',
    'clear denominators by multiplying through the LCD and solve the resulting polynomial equation',
    'prove the clearing law with its clause: roots are added by clearing, never destroyed',
    'catch and discard extraneous roots with the compound-bill check',
    'apply the zero-fraction filter to equations of the form P/Q = 0 and the cross form to A/B = C/D',
    'build and solve work-rate and speed fractional equations, applying the bill and the habitat as the two distinct filters',
  ],
  prerequisites: ['al-operating-on-algebraic-fractions', 'al-solving-linear-equations', 'al-factoring-quadratic-trinomials'],
  sources: ['hall-knight-elementary-algebra', 'ncert-math7-ch2', 'khattar-qa-4e', 'cengage-jee-style'],
  blocks: [
    { kind: 'para', text: 'Two lessons built the objects: 8.1 simplified rational expressions with their bills of exclusions, and 8.2 operated on them — multiply, divide, add, subtract — while the compound bill only grew. This lesson turns the fraction from an object into a QUESTION. An equation such as $\\frac{x}{x-3} = \\frac{3}{x-3} + 2$ does not ask what the expression equals; it asks AT WHICH POINTS the claim is true. That shift changes the balance law of chapter 5 in one decisive way: the lawful move "multiply both members by the same nonzero number" now invites a multiplier that is a polynomial — and a polynomial can be zero at some points. At those points the multiplication is exactly the move 5.1 outlawed, and it will manufacture fake solutions. The whole lesson is the story of that clause and of the check that disarms it.' },
    { kind: 'heading', text: 'Equations That Live on a Domain' },
    { kind: 'para', text: 'A fractional equation is an equation in which the unknown appears in at least one denominator. The definition is short, but it carries the entire domain discipline of 8.1 with it: whatever else the equation claims, it can only be evaluated where every fraction present is alive. The solution set is therefore not a free-floating set of numbers — it lives inside a domain, and the domain is the compound bill of 8.2: the union of the zero sets of every denominator in sight.' },
    { kind: 'callout', tone: 'definition', title: 'Definition — fractional equation', text: 'An equation is said to be FRACTIONAL if the unknown occurs in at least one denominator. Its solution set is the set of all real numbers at which (i) every fraction present is defined, and (ii) the two members are equal. Thus the compound bill — the union of the denominators’ zero sets, 8.2’s ledger — bounds the hunt before it begins: $x = \\frac{1}{x-2}$ can only be satisfied by some $x \\neq 2$, whatever the algebra later says. In symbols, the solutions of $\\frac{P(x)}{Q(x)} = \\frac{R(x)}{S(x)}$ all live inside $\\{x : Q(x) \\neq 0 \\text{ and } S(x) \\neq 0\\}$.' },
    { kind: 'para', text: 'For example, each of these is fractional, and each carries its bill from the first minute:' },
    { kind: 'list', marker: 'roman', items: [
      '$\\frac{3}{x-1} = \\frac{5}{x+1}$ — denominators $x - 1$ and $x + 1$, bill $\\{-1, 1\\}$;',
      '$\\frac{x}{x-3} = \\frac{3}{x-3} + 2$ — one denominator twice over, bill $\\{3\\}$;',
      '$\\frac{x^2 - 9}{x+3} = x - 3$ — the denominator $x + 3$, bill $\\{-3\\}$, even though the right member is a plain polynomial.',
    ] },
    { kind: 'para', text: 'The third row makes the definition’s reach visible: ONE fractional member is enough to close a door. The equation $\\frac{x^2-9}{x+3} = x - 3$ is undefined at $x = -3$ no matter how innocent the right side looks there — the original statement, not the tidy form, is the object of record. That is 8.2’s monotonic law wearing an equation’s clothes: no later algebra can re-open a door the original statement closed.' },
    { kind: 'equation', latex: 'E: \\;\\frac{P(x)}{Q(x)} = \\frac{R(x)}{S(x)}, \\quad B = \\{x : Q(x) = 0\\} \\cup \\{x : S(x) = 0\\}, \\quad \\text{solutions}(E) \\subseteq \\mathbb{R} \\setminus B', note: 'the bill bounds the hunt: every solution must be live for every fraction present — 8.2’s compound bill, now deciding equations' },
    { kind: 'heading', text: 'Clearing the Denominators: the LCD Move' },
    { kind: 'para', text: 'Fractions are hard to reason about and polynomials are easy, so the natural move is to make the fractions disappear: multiply both members by the LCD of all the denominators present. Every denominator divides the LCD, so every fraction collapses into a product, and what remains is a POLYNOMIAL equation — 5.2’s balance pipeline if it is linear, chapter 4’s factoring if it is quadratic. The move is old, reliable, and half of this lesson. The other half is the fine print: multiplying both members by an expression that is zero somewhere is NOT the lawful multiplication of 5.1, and the difference has consequences. The theorem below is the precise statement of both halves.' },
    { kind: 'derivation', title: 'Theorem — the clearing law with its clause', statement: 'Let $E$ be a fractional equation with compound bill $B$, and let $L$ be the LCD of all its denominators. The CLEARED equation is $L(x) \\cdot E(x) = 0$ — the polynomial equation got by multiplying both members by $L$. Then every solution of $E$ is a root of the cleared equation, and conversely a root $x_0$ of the cleared equation solves $E$ EXACTLY WHEN $x_0 \\notin B$. Hence: $\\;\\text{solutions}(E) = \\{x : L(x) \\cdot E(x) = 0\\} \\setminus B$.', steps: [
      { label: 'Soundness — no root is lost', formula: 'E(x_0) = 0,\\; x_0 \\notin B \\;\\Rightarrow\\; L(x_0) \\cdot E(x_0) = L(x_0) \\cdot 0 = 0', explanation: 'Let $x_0$ solve $E$: both members equal, and $x_0$ outside the bill. Multiplying equal numbers by the same number $L(x_0)$ keeps them equal — 5.1’s balance law, lawful because $L(x_0)$ is a real number. So $x_0$ satisfies the cleared equation: clearing ADDS no risk to the roots the original truly had.' },
      { label: 'The live converse', formula: 'L(x_0) \\cdot E(x_0) = 0,\\; x_0 \\notin B \\;\\Rightarrow\\; E(x_0) = 0', explanation: 'Now let $x_0$ be a root of the cleared equation OUTSIDE the bill. Every denominator is alive at $x_0$, and the LCD is a product of those living factors — so $L(x_0) \\neq 0$ (a product of nonzero reals is nonzero). Dividing the true claim $L(x_0) \\cdot E(x_0) = 0$ by the nonzero number $L(x_0)$ is lawful (ANS 7.2’s field laws): $E(x_0) = 0$. The converse HOLDS on the live domain.' },
      { label: 'At the bill the converse dies', formula: 'x_0 \\in B,\\; L(x_0) \\cdot E(x_0) = 0 \\;\\Rightarrow\\; \\text{no information}', explanation: 'At a bill point some denominator is zero, so $E(x_0)$ does not EXIST — the original claim cannot even be evaluated, let alone be true. If the cleared equation vanishes there, that is the multiplication making $0 = 0$ out of an undefined statement: 5.1’s forbidden move, met in the wild. Such a root is the clearing’s own creation.' },
      { label: 'The verdict', formula: '\\text{solutions}(E) = \\text{roots}(L \\cdot E) \\setminus B', explanation: 'The two directions combine into one sentence: the solution set is the cleared equation’s root set MINUS the bill. Roots are added by clearing, never destroyed — so the check at the end recovers exactly the truth.' },
      { label: 'Why the clause is sharp', formula: 'L(x_0) \\neq 0 \\iff x_0 \\notin B', explanation: 'The live converse USED $L(x_0) \\neq 0$, and that holds exactly off the bill — the LCD’s factors are the denominators themselves. On the live domain the multiplication is invertible (divide it back), so it is an equivalence; at the bill it is not invertible, and candidates can be manufactured. Hence the clause, and hence the check as a STATION of the method, not an ornament.' },
    ], result: 'solutions(E) = roots(cleared) \\ bill — clear, solve, subtract the bill; nothing else can go wrong, and nothing else needs checking.' },
    { kind: 'para', text: 'Read the theorem as a one-way street. From the original to the cleared equation, travel is free and lossless: every true solution rides through. From the cleared equation back to the original, travel is free on the live domain and FORBIDDEN at the bill — and the bill is exactly where the newcomers appear. This asymmetry is why the classical method ends with a check rather than beginning with one: the check is not a defensive habit but the exact inverse of the one non-invertible step the method contains.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the clause is not decoration', text: 'Chapter 5 proved that multiplying both members by $0$ is not a lawful move: it replaces whatever solution set an equation had by EVERY number. The LCD of a fractional equation is a polynomial, and at each bill point it EQUALS $0$. So every clearing of every fractional equation walks the edge of the forbidden move — the edge is precisely the bill. The pipeline survives because the bill was written down FIRST (station 2) and the candidates are filtered through it LAST (station 5). Skip station 2, and station 5 has nothing to consult; skip station 5, and the manufactured roots sail into the answer sheet. Both halves are the method.' },
    { kind: 'example', title: 'Solve 3/(x − 1) = 5/(x + 1) by the cross form', steps: [
      'BILL first, from the originals: $x - 1 = 0$ at $x = 1$ and $x + 1 = 0$ at $x = -1$ — the compound bill is $\\{-1, 1\\}$.',
      'Two fractions with unlike denominators: cross-multiply — multiply each numerator by the OTHER denominator: $3(x + 1) = 5(x - 1)$.',
      'Now, expand both sides: $3x + 3 = 5x - 5$; the $x$-terms collect right: $8 = 2x$, so $x = 4$.',
      'CHECK against the bill: $4 \\notin \\{-1, 1\\}$ — live. Verify in the original: $\\frac{3}{4-1} = 1$ and $\\frac{5}{4+1} = 1$ — both members read $1$.',
      'Hence the solution set is $\\{4\\}$ — $x = 4$, with the bill $x \\neq -1, 1$ stated from the originals; the verifier priced the cross-form equivalence at all $9$ live window points, and the equality held at exactly one of them — this one.',
    ] },
    { kind: 'example', title: 'Solve x/(x − 3) = 3/(x − 3) + 2 — and meet the first extraneous root', steps: [
      'BILL first: the only denominator is $x - 3$, alive except at $x = 3$ — the bill is $\\{3\\}$.',
      'MULTIPLY both members by the LCD $(x - 3)$: every denominator dies into it — $x = 3 + 2(x - 3)$.',
      'So, expand and collect: $x = 3 + 2x - 6$, which says $x = 2x - 3$, hence $-x = -3$, hence $x = 3$.',
      'CHECK against the bill: $3 \\in \\{3\\}$ — REFUSED. The candidate is exactly the point where the multiplication was the forbidden $0 = 0$ trick: the cleared form $-x + 3$ vanishes at $3$ while the original is undefined there.',
      'The verifier priced the original’s deficit on all $10$ live window points: LHS $-$ RHS reads $-1$ at every one — the original NEVER holds.',
      'Hence there is NO solution — the only candidate, $x = 3$, is refused by the bill $\\{3\\}$ (extraneous); the algebra manufactured a candidate and the bill returned it, unopened.',
    ] },
    { kind: 'callout', tone: 'definition', title: 'Definition — extraneous root', text: 'An EXTRANEOUS ROOT of a fractional equation is a number that satisfies the cleared equation but is refused by the compound bill — a root created by the clearing multiplication, which the original equation never admitted. Thus, in the worked classic, $x = 3$ solves $-x + 3 = 0$ yet is extraneous: the original reads $\\frac{3}{0} = \\frac{3}{0} + 2$, which is not false but MEANINGLESS. An extraneous root is not an enemy of the method — it is the method’s own by-product, produced at exactly the points where the theorem’s converse fails, and removed by exactly the bill the method wrote down first.' },
    { kind: 'example', title: 'Solve x/(x − 1) − 2/(x + 1) = 2/(x² − 1) — two candidates, one refused', steps: [
      'FACTOR the denominators: $x - 1$, $x + 1$, and $x^2 - 1 = (x-1)(x+1)$ — the LCD is $(x-1)(x+1)$, and the compound bill is $\\{-1, 1\\}$.',
      'MULTIPLY through by the LCD: $x(x + 1) - 2(x - 1) = 2$.',
      'Now, expand: $x^2 + x - 2x + 2 = 2$, which collects to $x^2 - x = 0$, factoring as $x(x - 1) = 0$ — candidates $x = 0$ and $x = 1$.',
      'CHECK each against the bill: $0 \\notin \\{-1, 1\\}$ — live; $1 \\in \\{-1, 1\\}$ — REFUSED (the factor $x - 1$ dies there; the original is undefined).',
      'Verify the survivor in the original: $\\frac{0}{-1} - \\frac{2}{1} = -2$ and $\\frac{2}{-1} = -2$ — both members read $-2$. The verifier priced the zero-set agreement of original and cleared equation at all $9$ live window points.',
      'Hence the solution set is $\\{0\\}$: one candidate kept, one extraneous — $x = 0$, with $x = 1$ refused by the bill $\\{-1, 1\\}$; the shape examinations love, and the reason the check is a station of its own.',
    ] },
    { kind: 'heading', text: 'The Check: Extraneous Roots Caught' },
    { kind: 'para', text: 'The three worked equations share one skeleton, and the skeleton is the method. State the bill before any ink moves; multiply by the LCD; solve the polynomial; check every candidate against the bill; state the survivors. Five stations, in that order, with the bill at both ends — written at station 2, consulted at station 5. The pipeline is short enough to run mentally on simple equations and formal enough to survive a three-fraction examination monster; the figure below runs the classic through all five stations to its refused verdict.' },
    { kind: 'algorithm', title: 'The clearing pipeline', lines: [
      { code: 'FACTOR every denominator completely.', note: '8.1’s station one — the zeros are the bill’s atoms' },
      { code: 'STATE the compound bill: the union of every denominator’s zeros.', note: 'before any ink moves — 8.2’s audit habit' },
      { code: 'MULTIPLY both members by the LCD of all denominators.', note: 'every denominator dies into the LCD; a polynomial remains' },
      { code: 'SOLVE the cleared equation.', note: 'linear: 5.2’s balance pipeline; quadratic: chapter 4 factoring' },
      { code: 'CHECK every candidate against the compound bill.', note: 'refused candidates are extraneous — discard, never report' },
      { code: 'CHECK the habitat for word problems.', note: 'positive days, speeds, counts — the second filter, station 6' },
      { code: 'STATE the solution set: the kept roots — possibly ∅, possibly every live point.', note: 'the verdict: one, none, or all but the bill' },
    ] },
    { kind: 'figure', caption: 'The clearing pipeline run on the classic x/(x−3) = 3/(x−3) + 2: factor, bill {3}, multiply by (x−3), solve to the candidate x = 3, check — and the bill refuses its own equation’s only root. The verdict ∅ is the pipeline being honest.', svg: clearingPipelineSvg() },
    { kind: 'table', caption: 'The verdict ledger — this lesson’s five exhibits, each run through the pipeline (every verdict priced by the verifier in the original equation)', head: ['the equation', 'the cleared equation', 'candidates', 'the bill', 'the verdict'], rows: [
      ['$\\frac{3}{x-1} = \\frac{5}{x+1}$', '$3(x+1) = 5(x-1)$', '$x = 4$', '$x \\neq -1, 1$', 'ONE: $x = 4$'],
      ['$\\frac{x}{x-3} = \\frac{3}{x-3} + 2$', '$x = 3 + 2(x-3)$', '$x = 3$', '$x \\neq 3$', 'NONE: the only candidate is extraneous'],
      ['$\\frac{x}{x-1} - \\frac{2}{x+1} = \\frac{2}{x^2-1}$', '$x^2 - x = 0$', '$x = 0, 1$', '$x \\neq -1, 1$', 'ONE: $x = 0$ — the $1$ extraneous'],
      ['$\\frac{x^2-9}{x+3} = x - 3$', '$0 = 0$', 'every $x$', '$x \\neq -3$', 'ALL BUT THE BILL: every $x \\neq -3$'],
      ['$\\frac{2}{x+2} = \\frac{x}{x-2}$', '$x^2 = -4$', 'none real', '$x \\neq -2, 2$', 'NONE: the cleared equation has no real roots'],
    ] },
    { kind: 'para', text: 'The ledger’s last column is a familiar trio wearing new clothes. Lesson 5.3 sorted linear equations into three verdicts — exactly one solution, none, or infinitely many — and the verifier’s census here shows the same machine operating one storey up, with the bill as the new juryman. A fractional equation can end in ONE surviving candidate (rows 1 and 3), in NONE (rows 2 and 5, for two different reasons — a refused candidate and an empty cleared equation), or in EVERY live point (row 4). Three verdict shapes, now with a bill to satisfy:' },
    { kind: 'list', items: [
      '**ONE** — the cleared equation’s live roots survive the check; the answer is a finite set (often a single point).',
      '**NONE** — either the cleared equation has no real roots (nothing to check), or every candidate is refused (the classic’s ∅). An empty verdict is a full answer.',
      '**ALL BUT THE BILL** — the cleared equation collapses to $0 = 0$: an identity on the live domain, with the bill naming the excluded points. The answer is a domain, not a number.',
    ] },
    { kind: 'example', title: 'Solve (x² − 9)/(x + 3) = x − 3 — the identity verdict', steps: [
      'BILL first: the denominator $x + 3$ refuses $x = -3$ — the bill is $\\{-3\\}$.',
      'MULTIPLY both members by the LCD $(x + 3)$: $x^2 - 9 = (x - 3)(x + 3)$.',
      'Now, the right member IS the factored left: the cleared equation reads $(x-3)(x+3) = (x-3)(x+3)$ — it collapses to $0 = 0$, an identity.',
      'So, every live point solves the equation: the verifier priced the original equality at all $10$ window points with $x \\neq -3$, and it held at every one.',
      'CHECK the bill: at $x = -3$ the original reads $\\frac{0}{0}$ — undefined, so $-3$ is refused from the all-verdict. 8.1 scooped this hole in an expression; the same hole now closes an equation.',
      'Hence the solution set is every real $x \\neq -3$ — the identity verdict, with the bill refusing its single point; the third verdict of 5.3, minus one hole.',
    ] },
    { kind: 'figure', caption: 'The check filter: the cleared equation hands over its candidates; the compound bill — audited from the originals at station 2 — passes the live ones into the solution set and returns the refused ones as extraneous. The verdict strip collects the lesson’s three outcomes.', svg: checkFilterSvg() },
    { kind: 'callout', tone: 'insight', title: 'Insight — why the check works: roots added, never destroyed', text: 'The theorem’s two directions are not symmetric in effort, and that asymmetry is the deep reason the method is safe. Soundness is automatic: any true solution, multiplied through, stays true — clearing can never LOSE a root, so no one worries about what the clearing might have eaten. The converse needed dividing by $L(x_0)$, lawful exactly off the bill. So the entire risk of the method is concentrated at the bill — a set usually of one or two points — and the check only has to inspect the candidates against a ledger already written. This is the same economy 8.1 taught for holes: information is never destroyed, only relocated; here the relocated information is a short list of points, and station 5 reads it aloud.' },
    { kind: 'heading', text: 'The Zero-Fraction Filter and the Cross Form' },
    { kind: 'para', text: 'Two special shapes deserve their own machinery, because examinations set them constantly and because each is a pipeline shortcut with its own trap. The first is the ZERO-FRACTION equation $\\frac{P(x)}{Q(x)} = 0$. 8.1 proved the verdict — a fraction is zero exactly where its numerator is zero AND its denominator is alive — and as an equation-solver it is a filter: solve $P(x) = 0$ for candidates, then refuse every candidate that sits in $Q$’s zeros. The filter is the bill check in miniature, and it refuses with the same teeth:' },
    { kind: 'example', title: 'Solve (x − 1)(x − 2)/((x − 1)(x + 3)) = 0 — the filter at work', steps: [
      'BILL first: the denominator $(x-1)(x+3)$ refuses $x = 1$ and $x = -3$ — the bill is $\\{-3, 1\\}$.',
      'The numerator’s zeros: $(x-1)(x-2) = 0$ at $x = 1$ and $x = 2$ — the raw candidates.',
      'Apply the filter — numerator zero AND denominator alive: $x = 1$ dies on BOTH floors (the original reads $\\frac{0}{0}$, undefined); $x = 2$ survives — the denominator there reads $(1)(5) = 5$, alive.',
      'Verify the survivor: at $x = 2$ the original reads $\\frac{(1)(0)}{(1)(5)} = \\frac{0}{5} = 0$ — exactly zero, as claimed.',
      'Hence the solution set is $\\{2\\}$ only — the candidate $1$ is the trap, dead on both floors ($0/0$), exactly as the zero-fraction verdict demands; a zero NUMERATOR never excuses a dead denominator.',
    ] },
    { kind: 'para', text: 'A first-draft instinct reads only the numerator and reports $\\{1, 2\\}$; the filter’s whole job is to refuse the point where both floors die together. Note also what the filter does NOT refuse: a numerator zero at a perfectly alive point is a genuine solution — $\\frac{x(x-4)}{x+2} = 0$ holds at $x = 0$ and $x = 4$, both live, bill $\\{-2\\}$ refusing neither. The verifier priced the seed equation $\\frac{x^2-9}{x-3} = 0$ at exactly $\\{-3\\}$: the numerator dies at $\\pm 3$, the denominator at $3$, and the filter keeps $-3$ alone.' },
    { kind: 'equation', latex: '\\frac{a}{b} = \\frac{c}{d} \\;\\iff\\; a \\cdot d = b \\cdot c \\qquad (b \\neq 0,\\; d \\neq 0)', note: 'the cross form — the two-fraction special case of clearing by bd; the bill {b ≠ 0, d ≠ 0} is part of the statement, not a footnote' },
    { kind: 'para', text: 'The second shape is the two-fraction equation, where the full pipeline compresses into one move. Multiplying $\\frac{a}{b} = \\frac{c}{d}$ through by the LCD $bd$ gives $ad = bc$ — each numerator times the OTHER denominator. The verifier confirmed the move is an equivalence at every live point: original equality and cross equality held or failed together at all $9$ live window points of the worked illustration, and the surviving root was unique. The trap is symmetry’s siren song: $3(x+1) = 5(x-1)$ solves to $x = 4$, while the SWAPPED cross $3(x-1) = 5(x+1)$ solves to $x = -4$ — a different equation wearing the same clothes, priced at $\\frac{3}{-5} \\neq \\frac{5}{-3}$. Multiply each numerator by the other denominator, never by its own.' },
    { kind: 'heading', text: 'Fractional Equations at Work' },
    { kind: 'para', text: 'Word problems breed fractional equations naturally, because rates ADD. If a pipe fills a vat in $a$ hours, its rate is $\\frac{1}{a}$ vat per hour; a second pipe with time $b$ contributes $\\frac{1}{b}$; running together they fill at the sum, and the joint time $t$ satisfies $\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}$. The verifier’s exhibit: pipes at $3$ and $6$ hours give $\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}$ — together $2$ hours, and $t = \\frac{ab}{a+b} = \\frac{18}{9} = 2$. Every such equation is fractional (the unknown hides in a denominator), every one is solved by the pipeline, and every one carries TWO filters — the bill from algebra and a habitat from the situation.' },
    { kind: 'formula', name: 'The clearing law', latex: '\\text{solutions}(E) = \\text{roots}(L \\cdot E) \\setminus B', note: 'L the LCD, B the compound bill — clear, solve, subtract the bill; roots added, never destroyed' },
    { kind: 'formula', name: 'The cross form', latex: '\\frac{a}{b} = \\frac{c}{d} \\;\\iff\\; a d = b c \\quad (b, d \\neq 0)', note: 'each numerator times the OTHER denominator; the bill rides from the originals' },
    { kind: 'formula', name: 'The work-rate template', latex: '\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t} \\;\\iff\\; t = \\frac{ab}{a + b}', note: 'rates add; the joint time is the product over the sum — the always-pair check: t between a and b' },
    { kind: 'para', text: 'The two filters deserve their separation, because they refuse for different reasons and the examinations test the difference. The BILL refuses points where the equation is UNDEFINED — algebraic refusals, read from the denominators. The HABITAT refuses points where the equation is perfectly true but the SITUATION is meaningless — negative days, negative speeds, fractional people. Exercises 12 and 13 stage the distinction exactly: the work-rate hunt produces the root $x = -2$, which the bill $\\{-3, 0\\}$ refuses NOTHING about — indeed the verifier priced $\\frac{1}{-2} + \\frac{1}{1} = \\frac{1}{2}$, the equation is TRUE there — and the habitat rejects it because a task cannot take negative days. The train problem does the same at $v = -60$: $\\frac{300}{-60} - \\frac{300}{-50} = 1$ holds, and no train moves at it.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — two filters, two jobs', text: 'The bill and the habitat are NOT the same check, and conflating them loses marks in both directions. The bill is ALGEBRAIC: it refuses where a denominator dies, and its refusals are absolute — the equation does not exist there. The habitat is SITUATIONAL: it refuses where the story breaks (negative time, impossible counts), and its refusals are interpretive — the equation is true, the world is not. A root can pass the bill and fail the habitat ($x = -2$ in the work-rate hunt; $v = -60$ in the train). A root can also fail the bill and never reach the habitat ($x = 3$ in the classic). Report which filter rejected what: "extraneous" for the bill, "rejected by the situation" for the habitat.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — the check that built trust', text: 'The classical algebra course this book follows — Hall & Knight’s Elementary Algebra for Schools (1885) among its texts — closed its fractions chapter exactly where this lesson closes: equations cleared by the LCD, with the restriction named and the roots examined. The word "extraneous" itself is the mathematical community’s admission that a method can CREATE its own data: the root is extraneous to the equation, not to the solving. What the check formalizes is older than the notation — the habit of SUBSTITUTING a claimed answer back into the original words, which is the oldest verifying instinct in mathematics and the reason "check your solution" has survived every reform of the curriculum. Web-checked against the banked survey of run 66; no content reproduced.' },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — where this pays', text: 'The competitive bank (Khattar QA’s algebra scope; SSC/bank mains; JEE-Main foundations) sets this lesson four ways. (1) Clear-and-check: solve a fractional equation and the mark scheme splits at the check — the refused candidate must be named extraneous, not silently dropped and not reported. (2) The verdict items: "the equation $\\frac{x}{x-3} = \\frac{3}{x-3} + 2$ has —" with no solution as the intended answer and $x = 3$ planted as the trap; or the identity verdict asked as "for how many values of $x$ does … hold". (3) Work-rate and speed: the $\\frac{1}{a} + \\frac{1}{b} = \\frac{1}{t}$ family and the faster-train family, where the negative root MUST be rejected by the habitat in a stated sentence — the reasoning mark. (4) The parameter hunt: "for which $k$ does the equation have exactly one solution" — answered by clearing and reading the bill, the run-83 bridge to chapter 9’s quadratics. The pipeline is the mark scheme; run it in the printed order.' },
    { kind: 'terms', items: [
      { term: 'Fractional equation', def: 'An equation in which the unknown appears in at least one denominator; its solution set lives inside the compound bill of every denominator present.' },
      { term: 'Compound bill', def: 'The union of the zero sets of all denominators in an equation or expression — 8.2’s ledger of exclusions, promoted in this lesson to the check that judges candidates.' },
      { term: 'Cleared equation', def: 'The polynomial equation produced by multiplying both members of a fractional equation by the LCD of all denominators; linear equations fall to 5.2’s pipeline, quadratics to chapter 4 factoring.' },
      { term: 'Extraneous root', def: 'A root of the cleared equation refused by the compound bill — created by the clearing multiplication, never a solution of the original equation; discarded at station 5, never reported.' },
      { term: 'Cross-multiplication', def: 'The two-fraction shortcut: a/b = c/d holds exactly when ad = bc, provided b ≠ 0 and d ≠ 0; each numerator is multiplied by the OTHER denominator.' },
      { term: 'Zero-fraction filter', def: 'The solver for P/Q = 0: collect the numerator’s zeros as candidates, then keep only those where the denominator is alive — P = 0 AND Q ≠ 0, 8.1’s verdict promoted to a tool.' },
      { term: 'Work-rate equation', def: 'A fractional equation built from rates adding: 1/a + 1/b = 1/t for joint time t, with template t = ab/(a+b); the classical word-problem application of the pipeline.' },
      { term: 'Habitat check', def: 'The situational filter on word-problem roots — positive days, speeds, whole counts — distinct from the bill: a root can be mathematically live (the equation true) and still be rejected by the habitat.' },
    ] },
    { kind: 'quiz', title: 'Check yourself', items: [
      {
        q: 'The equation $\\frac{x}{x-3} = \\frac{3}{x-3} + 2$ has —',
        options: ['the solution $x = 3$', 'no solution — the only candidate is refused by the bill', 'the solution $x = 0$', 'every $x \\neq 3$ as a solution'],
        answer: 1,
        explain: 'Clearing by the LCD $(x-3)$ gives $x = 3 + 2(x-3)$, hence $x = 3$ — and the bill $\\{3\\}$ refuses exactly that point: the candidate is extraneous, manufactured by the multiplication at the very point the original is undefined. Option 1 reports the extraneous root (the trap); option 3 solves the mis-expansion $x = 3 + 2x - 3$ instead of $x = 3 + 2(x-3)$; option 4 misreads the identity verdict — the verifier priced the original’s deficit at $-1$ on every live point, so nothing solves it.',
      },
      {
        q: 'Solving $\\frac{3}{x-1} = \\frac{5}{x+1}$ by the cross form gives —',
        options: ['$x = -4$', '$x = 4$', '$x = 1$', '$x = 8$'],
        answer: 1,
        explain: 'Each numerator times the OTHER denominator: $3(x+1) = 5(x-1)$, so $3x + 3 = 5x - 5$ and $8 = 2x$ — $x = 4$, live against the bill $\\{-1, 1\\}$ and verified in the original ($3/3 = 5/5 = 1$). Option 1 is the SWAPPED cross $3(x-1) = 5(x+1)$ — a different equation, priced $\\frac{3}{-5} \\neq \\frac{5}{-3}$; option 3 is a bill point, never a solution; option 8 is an arithmetic slip ($8 = 2x$ does not say $x = 8$).',
      },
      {
        q: 'The solution set of $\\frac{x(x-4)}{x+2} = 0$ is —',
        options: ['$x = 4$ only', '$x = 0$ only', '$x = 0$ and $x = 4$', '$x = 0$, $x = 4$ and $x = -2$'],
        answer: 2,
        explain: 'The zero-fraction filter: the numerator $x(x-4)$ dies at $0$ and $4$, and the denominator $x + 2$ is alive at both — both survive. Option 1 misses the genuine zero at $x = 0$ (the fraction reads $0/(-2) = 0$); option 2 misses $x = 4$; option 4 adds the bill point $x = -2$, where the DENOMINATOR dies — the fraction is undefined there, never zero. Numerator zero AND denominator alive: the filter refuses with teeth.',
      },
      {
        q: 'Pipe A fills a vat in $3$ hours and pipe B fills it in $6$ hours. Working together, they fill it in —',
        options: ['$4.5$ hours', '$9$ hours', '$1.5$ hours', '$2$ hours'],
        answer: 3,
        explain: 'Rates add: $\\frac{1}{3} + \\frac{1}{6} = \\frac{2}{6} + \\frac{1}{6} = \\frac{1}{2}$ vat per hour, so the joint time is $t = \\frac{ab}{a+b} = \\frac{18}{9} = 2$ hours. Option 1 is the average trap (times are never averaged); option 2 adds the TIMES instead of the rates; option 3 halves the fastest pipe — together they are SLOWER than the fastest alone, never faster. The sanity band: $t$ must land strictly between $a$ and $b$ — $2$ sits between $3$ and $6$.',
      },
      {
        q: 'Solving $\\frac{x}{x-1} - \\frac{2}{x+1} = \\frac{2}{x^2-1}$, the cleared equation is $x^2 - x = 0$ with candidates $0$ and $1$. The solution set is —',
        options: ['$\\{0, 1\\}$', '$\\{0\\}$', '$\\{1\\}$', 'empty'],
        answer: 1,
        explain: 'The bill from the originals is $\\{-1, 1\\}$: the candidate $0$ is live (the original reads $0 - 2 + 2 = 0$ — true), while $1$ dies in the factor $x - 1$ — extraneous, discarded. Option 1 skips the check and reports both candidates; option 3 keeps only the refused one; option 4 refuses both, but $0$ was verified in the original. Two candidates, one refused — the exact shape the check exists to settle.',
      },
    ] },
    { kind: 'exercises', title: 'Exercises 8.3', sets: [
      { level: 'L1', questions: [
        {
          q: 'Solve $\\frac{2}{x} = 1$.',
          solution: [
            'BILL first: the denominator $x$ refuses $0$ — the bill is $\\{0\\}$.',
            'MULTIPLY both members by the LCD $x$ (alive off the bill): $2 = x$.',
            'CHECK against the bill: $2 \\neq 0$ — live; verify in the original: $\\frac{2}{2} = 1$.',
            'Hence $x = 2$; the verifier priced $\\frac{2}{x} = 1$ exactly at $x = 2$ and nowhere else on the live window.',
          ],
          answer: '$x = 2$, with the bill $x \\neq 0$.',
        },
        {
          q: 'Solve $\\frac{3}{x} + \\frac{1}{x} = 4$.',
          solution: [
            'BILL first: $\\{0\\}$ — both fractions share the denominator $x$.',
            'Like denominators combine without any clearing: $\\frac{3+1}{x} = \\frac{4}{x} = 4$.',
            'MULTIPLY by the LCD $x$: $4 = 4x$, so $x = 1$.',
            'CHECK: $1 \\neq 0$ — live; the original reads $3 + 1 = 4$. Hence $x = 1$; the verifier priced the equation exactly at $x = 1$ on the live window.',
          ],
          answer: '$x = 1$, with the bill $x \\neq 0$.',
        },
        {
          q: 'Solve $\\frac{4}{x} = x$.',
          solution: [
            'BILL first: $\\{0\\}$.',
            'MULTIPLY by the LCD $x$: $4 = x^2$ — a cleared QUADRATIC, solved by chapter 4: $x = 2$ or $x = -2$.',
            'CHECK both against the bill: neither is $0$ — both live.',
            'Verify each in the original: $\\frac{4}{2} = 2$ and $\\frac{4}{-2} = -2$ — both members equal the candidate itself. Hence $x = \\pm 2$; the verifier priced both live roots.',
          ],
          answer: '$x = 2$ and $x = -2$, with the bill $x \\neq 0$.',
        },
      ] },
      { level: 'L2', questions: [
        {
          q: 'Solve $\\frac{x+1}{x-1} = 3$.',
          solution: [
            'BILL first: the denominator $x - 1$ refuses $1$ — the bill is $\\{1\\}$.',
            'MULTIPLY by the LCD $(x-1)$: $x + 1 = 3(x - 1)$.',
            'So, expand and collect: $x + 1 = 3x - 3$, hence $4 = 2x$, hence $x = 2$.',
            'CHECK: $2 \\notin \\{1\\}$ — live; the original reads $\\frac{3}{1} = 3$. Hence $x = 2$; the verifier priced the equation exactly at $x = 2$ on the live window.',
          ],
          answer: '$x = 2$, with the bill $x \\neq 1$.',
        },
        {
          q: 'Solve $\\frac{2}{x+3} = \\frac{1}{x-1}$ by the cross form.',
          solution: [
            'BILL first: $(x+3)$ refuses $-3$ and $(x-1)$ refuses $1$ — the bill is $\\{-3, 1\\}$.',
            'CROSS-MULTIPLY, each numerator by the other denominator: $2(x - 1) = x + 3$.',
            'Now, collect: $2x - 2 = x + 3$, hence $x = 5$.',
            'CHECK: $5 \\notin \\{-3, 1\\}$ — live; the original reads $\\frac{2}{8} = \\frac{1}{4}$ — both members $\\frac{1}{4}$. Hence $x = 5$; the verifier priced the cross form exactly at $x = 5$.',
          ],
          answer: '$x = 5$, with the bill $x \\neq -3, 1$.',
        },
        {
          q: 'Solve $\\frac{1}{x-2} + 1 = \\frac{3}{x-2}$.',
          solution: [
            'BILL first: $\\{2\\}$ — both fractions carry $(x - 2)$.',
            'MULTIPLY by the LCD $(x-2)$: $1 + (x - 2) = 3$.',
            'So, collect: $x - 1 = 3$, hence $x = 4$.',
            'CHECK: $4 \\notin \\{2\\}$ — live; the original reads $\\frac{1}{2} + 1 = \\frac{3}{2}$ — both members $\\frac{3}{2}$. Hence $x = 4$; the verifier priced the equation exactly at $x = 4$.',
          ],
          answer: '$x = 4$, with the bill $x \\neq 2$.',
        },
      ] },
      { level: 'L3', questions: [
        {
          q: 'Solve $\\frac{x}{x-2} = \\frac{2}{x-2} + 1$.',
          solution: [
            'BILL first: $\\{2\\}$.',
            'MULTIPLY by the LCD $(x-2)$: $x = 2 + (x - 2)$.',
            'Now, collect: the right member is $x$ itself — the cleared equation collapses to $0 = 0$: an IDENTITY, not an equation in $x$.',
            'So, every LIVE point solves it: the verifier priced the deficit at exactly $0$ on all $10$ live window points — the left side rewrites as $\\frac{x-2}{x-2} = 1$ for $x \\neq 2$.',
            'CHECK the bill: at $x = 2$ the original is undefined, so $2$ is refused from the all-verdict. Hence the solution set is every real $x \\neq 2$ — the identity verdict.',
          ],
          answer: 'Every real $x \\neq 2$ — the cleared equation is an identity, and the bill removes its single point.',
        },
        {
          q: 'Solve $\\frac{1}{x-3} + \\frac{1}{x+3} = \\frac{6}{x^2-9}$.',
          solution: [
            'FACTOR: $x^2 - 9 = (x-3)(x+3)$ — the LCD is $(x-3)(x+3)$, and the bill is $\\{-3, 3\\}$.',
            'MULTIPLY through: $(x + 3) + (x - 3) = 6$.',
            'So, collect: $2x = 6$, hence $x = 3$ — the ONLY candidate.',
            'CHECK: $3 \\in \\{-3, 3\\}$ — REFUSED. The multiplication manufactured the candidate at the exact point the denominators die; the verifier priced the original’s deficit as $\\frac{2}{x+3}$-shaped — never zero on the live domain.',
            'Hence the solution set is EMPTY: a full verdict, not a failed solve.',
          ],
          answer: 'No solution — the only candidate $x = 3$ is refused by the bill $\\{-3, 3\\}$ (extraneous).',
        },
        {
          q: 'Solve $\\frac{x}{x+1} - \\frac{3}{x-1} = \\frac{2}{x^2-1}$.',
          solution: [
            'FACTOR: the LCD is $(x+1)(x-1)$, and the bill is $\\{-1, 1\\}$.',
            'MULTIPLY through: $x(x - 1) - 3(x + 1) = 2$.',
            'Now, expand and collect: $x^2 - x - 3x - 3 = 2$, hence $x^2 - 4x - 5 = 0$, factoring as $(x - 5)(x + 1) = 0$ — candidates $x = 5$ and $x = -1$.',
            'CHECK each: $5$ is live against the bill; $-1 \\in \\{-1, 1\\}$ — REFUSED (the factor $x + 1$ dies there).',
            'Verify the survivor: $\\frac{5}{6} - \\frac{3}{4} = \\frac{10 - 9}{12} = \\frac{1}{12}$ and $\\frac{2}{24} = \\frac{1}{12}$ — both members agree. Hence $x = 5$, one extraneous candidate discarded.',
          ],
          answer: '$x = 5$, with $x = -1$ an extraneous root refused by the bill $\\{-1, 1\\}$.',
        },
      ] },
      { level: 'L4', questions: [
        {
          q: 'Solve $\\frac{x^2-4}{x-2} = x + 2$.',
          solution: [
            'BILL first: $(x - 2)$ refuses $2$ — the bill is $\\{2\\}$.',
            'The left side is 8.1’s hole: $\\frac{(x-2)(x+2)}{x-2} = x + 2$ for $x \\neq 2$ — simplify BEFORE clearing.',
            'So, the equation reads $x + 2 = x + 2$ on the live domain — an identity; the cleared form collapses to $0 = 0$.',
            'The verifier priced the hole identity on all $10$ live window points, and at $x = 2$ the original reads $\\frac{0}{0}$ — refused.',
            'Hence the solution set is every real $x \\neq 2$: the third verdict, one scooped point.',
          ],
          answer: 'Every real $x \\neq 2$ — the hole identity turns the equation into a tautology off the bill.',
        },
        {
          q: 'Solve $\\frac{3}{x+2} - \\frac{1}{x-1} = 1$.',
          solution: [
            'BILL first: $\\{-2, 1\\}$.',
            'MULTIPLY by the LCD $(x+2)(x-1)$: $3(x - 1) - (x + 2) = (x + 2)(x - 1)$.',
            'Now, expand both floors: $2x - 5 = x^2 + x - 2$, hence $x^2 - x + 3 = 0$.',
            'The cleared quadratic has discriminant $\\Delta = (-1)^2 - 4 \\cdot 1 \\cdot 3 = -11 < 0$ — chapter 4’s factoring finds no roots, and the verifier confirmed the quadratic never vanishes on the window: nothing to check.',
            'Hence the solution set is EMPTY — the cleared equation itself is empty over the reals, a different route to NONE than the refused candidate.',
          ],
          answer: 'No solution — the cleared equation $x^2 - x + 3 = 0$ has discriminant $-11$ and no real roots.',
        },
      ] },
      { level: 'L5', questions: [
        {
          q: 'Worker A alone finishes a job in $x$ days and worker B alone in $x + 3$ days; together they finish it in $2$ days. Find $x$.',
          solution: [
            'Rates add: $\\frac{1}{x} + \\frac{1}{x+3} = \\frac{1}{2}$ — fractional, with the bill $\\{-3, 0\\}$ read first.',
            'MULTIPLY by the LCD $2x(x+3)$: $2(x + 3) + 2x = x(x + 3)$.',
            'So, expand: $4x + 6 = x^2 + 3x$, hence $x^2 - x - 6 = 0$, factoring as $(x - 3)(x + 2) = 0$ — candidates $x = 3$ and $x = -2$.',
            'CHECK against the bill: neither candidate is $-3$ or $0$ — the bill refuses NEITHER; the verifier even priced $\\frac{1}{-2} + \\frac{1}{1} = \\frac{1}{2}$: the equation is TRUE at $x = -2$.',
            'CHECK the habitat: days must be POSITIVE — $x = -2$ is rejected by the situation, not by the bill (a task cannot take $-2$ days).',
            'Verify the survivor: $x = 3$ gives B the time $6$, and $\\frac{1}{3} + \\frac{1}{6} = \\frac{1}{2}$ — together $2$ days. Hence $x = 3$: two filters, two different refusals.',
          ],
          answer: '$x = 3$ (B takes $6$ days); the root $x = -2$ passes the bill and is rejected by the habitat.',
        },
        {
          q: 'A train covers $300$ km at a steady $v$ km/h. At $10$ km/h faster the trip would take $1$ hour less. Find $v$.',
          solution: [
            'Time is distance over speed: $\\frac{300}{v} - \\frac{300}{v+10} = 1$ — fractional, with the bill $\\{-10, 0\\}$ read first.',
            'MULTIPLY by the LCD $v(v+10)$: $300(v + 10) - 300v = v(v + 10)$.',
            'So, expand: $3000 = v^2 + 10v$, hence $v^2 + 10v - 3000 = 0$, factoring as $(v - 50)(v + 60) = 0$ — candidates $v = 50$ and $v = -60$.',
            'CHECK against the bill: neither candidate is $-10$ or $0$ — the bill refuses NEITHER; the verifier priced $\\frac{300}{-60} - \\frac{300}{-50} = -5 + 6 = 1$: the equation is TRUE at $v = -60$.',
            'CHECK the habitat: a speed is POSITIVE — $v = -60$ is rejected by the situation (no train runs at it).',
            'Verify the survivor: $\\frac{300}{50} - \\frac{300}{60} = 6 - 5 = 1$ — exactly one hour saved. Hence $v = 50$ km/h.',
          ],
          answer: '$v = 50$ km/h; the root $v = -60$ passes the bill and is rejected by the habitat.',
        },
      ] },
      { level: 'L6', questions: [
        {
          q: 'Prove the clearing law — solutions$(E) = \\text{roots}(L \\cdot E) \\setminus B$, with $L$ the LCD and $B$ the compound bill — and price the classic $\\frac{x}{x-3} = \\frac{3}{x-3} + 2$ on both sides of the theorem.',
          solution: [
            'Soundness: let $x_0$ solve $E$ — both members equal and $x_0 \\notin B$. Multiplying equal numbers by the same real number $L(x_0)$ keeps them equal (5.1’s balance law), so $L(x_0) \\cdot E(x_0) = 0$: every solution of $E$ is a root of the cleared equation. No root is LOST.',
            'The live converse: let $x_0 \\notin B$ be a root of $L \\cdot E = 0$. Every denominator is alive at $x_0$, and the LCD is a product of those living factors, so $L(x_0) \\neq 0$; dividing by the nonzero real $L(x_0)$ is lawful (ANS 7.2), giving $E(x_0) = 0$. The converse holds OFF the bill.',
            'At the bill the converse dies: at $x_0 \\in B$ some denominator is zero, so $E(x_0)$ does not exist — the original cannot be true there. If the cleared equation vanishes at $x_0$, that vanishing is the multiplication building $0 = 0$ out of an undefined claim: 5.1’s forbidden move, met in the wild.',
            'Hence solutions$(E) = \\{x : L(x) \\cdot E(x) = 0\\} \\setminus B$: roots are ADDED by clearing, never destroyed — the check at the end is the exact inverse of the one non-invertible step.',
            'Price the classic: the bill is $\\{3\\}$, the cleared equation $-x + 3 = 0$ has the root $3$, and $3 \\in B$ — so the theorem’s verdict is $\\varnothing$. The verifier priced the soundness side on all $10$ live points (the deficit reads $-1$: the original never holds) and the mechanism at $x = 3$ itself (cleared form $0$, original undefined). The theorem, the pipeline and the ledger agree.',
          ],
          answer: 'The clearing law holds because multiplication by the live LCD is invertible exactly off the bill; the classic prices it: one manufactured candidate, refused, solution set empty.',
        },
      ] },
    ] },
  ],
}

export const chapter08: Chapter = {
  number: 8,
  slug: 'algebraic-fractions',
  title: 'Algebraic Fractions',
  summary:
    'FM’s fraction laws, now carrying letters: rational expressions simplified by factoring with the excluded values kept honest (division by zero excluded — the discipline ANS 9.3 made central), addition and subtraction through the LCD of polynomials, and fractional equations solved with extraneous roots caught by the exclusion check at the end, not ignored.',
  status: 'complete',
  lessons: [lesson81, lesson82, lesson83],
}
