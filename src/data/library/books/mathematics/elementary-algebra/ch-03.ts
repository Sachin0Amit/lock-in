import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 3: Polynomials
 *
 * LESSONS WRITTEN: 3.1 What a Polynomial Is: Terms, Degree and Family
 *                  (run 71 — quiz keys 1/0/1/1/0, 14 exercises, two
 *                  figures, verify-book3-ch03.ts sections A–G + H green)
 *                  3.2 Adding, Subtracting and Multiplying Polynomials
 *                  — authored this run's second lesson (section I)
 *
 * References for this unit: the Drive copy `Elementary-Algebra_text.pdf`
 * is H. S. Hall & S. R. Knight, *Elementary Algebra for Schools*
 * (Macmillan, first edition 1885; this 1942 reprint) — its chapter V
 * "Multiplication" (book pp. 27 ff.) and the Art. 24–26 definitions of
 * dimension, degree and homogeneous expressions informed the arc of this
 * run: the family defined term-by-term on the 2.1–2.2 exponent laws
 * (nonnegative integer exponents only — the honest boundary kept), degree
 * read off the letter parts, arithmetic on polynomials built from the
 * field laws and the collection law of 1.2, the degree-of-a-product
 * theorem proved by the leading-coefficient argument, and the first
 * special products PROVED by the distributive grid (the 2.1 census
 * teaser cashed). Banked keys reused: ncert-math9-ch2-polynomials (the
 * school canon's degree/classification arc), cengage-jee-style (the
 * presentation contract), khattar-qa-4e (the exam-corner shapes).
 * New web-checked keys: descartes-1637-geometrie (3.1's historical
 * callout — the superscript exponent notation standardized in print),
 * al-karaji-binomial-triangle (3.2's historical callout — the binomial
 * coefficient rows centuries before Pascal). One download this run (the
 * H&K Elementary 23 MB, for the ch. V arc study) — working copy deleted
 * after the run's E2E (storage law); no content reproduced, exposition
 * original.
 *
 * Every number of lessons 3.1–3.2 was pre-verified by
 * scripts/verify-book3-ch03.ts (sections A–G, 115 checks ALL GREEN before
 * any prose; the pre-writing pass caught nine of the author's own slips —
 * the missing unit-coefficient suppression in the stringifier, a
 * constant-vs-linear polyD slip, a four-term census miscount, two shared
 * evaluation values, the drop-case construction and two exercise
 * parameterizations — all corrected before writing). Sections H (authored
 * 3.1) and I (authored 3.2) import the chapter file directly.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (3.1): the anatomy of a term + the family gallery.         */
/* Header band (30,18,660,44); LEFT panel (30,90,320,220) with 3 label */
/* boxes 270x44 at x=44, y=124/186/248; RIGHT panel (390,90,300,220)   */
/* with 5 row boxes 280x28 at x=400, y=130+32i; footer text y=336.     */
/* Geometry pinned in verify-book3-ch03.ts section G, audited in H.    */
/* ------------------------------------------------------------------ */

function termAnatomySvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Left: the anatomy of a term, a minus seven x to the fourth dissected into its coefficient minus seven, its base letter x and its degree four. Right: the family gallery, five polynomials from monomial to the zero polynomial, each tagged with its degree.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the anatomy of a term, and the family album</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">every polynomial is a sum of terms — each term is a number carrying a power</text>')
  // LEFT panel: anatomy of −7x⁴
  parts.push('<rect x="30" y="90" width="320" height="220" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="190" y="112" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">anatomy: −7x⁴</text>')
  const anatomyRows: [string, string][] = [
    ['coefficient: −7', 'the number of copies — never counted toward degree'],
    ['base letter: x', 'the variable, the only seat exponents may sit on'],
    ['degree: 4', 'the exponent on the letter — a nonnegative integer'],
  ]
  anatomyRows.forEach(([title, sub], i) => {
    const y = 124 + i * 62
    parts.push(`<rect x="44" y="${y}" width="270" height="44" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${44 + 135}" y="${y + 18}" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${44 + 135}" y="${y + 34}" font-size="10.5" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // RIGHT panel: the family gallery
  parts.push('<rect x="390" y="90" width="300" height="220" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="540" y="112" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">the family album</text>')
  const gallery: [string, string][] = [
    ['5x² — monomial', 'one term · degree 2'],
    ['x + 3 — binomial', 'two terms · degree 1'],
    ['x² + 2x + 1 — trinomial', 'three terms · degree 2'],
    ['8 — constant', 'one term · degree 0'],
    ['0 — the zero polynomial', 'degreeless in this course'],
  ]
  gallery.forEach(([name, tag], i) => {
    const y = 130 + i * 32
    parts.push(`<rect x="400" y="${y}" width="280" height="28" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${400 + 140}" y="${y + 18}" font-size="11.5" fill="#365314" text-anchor="middle">${name} · ${tag}</text>`)
  })
  // footer
  parts.push('<text x="360" y="336" font-size="11.5" fill="#6b7a72" text-anchor="middle">names by shape (term count) and by degree — the two questions every polynomial answers</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (3.1): the polynomial sieve. Header (30,18,660,44); five   */
/* rows at y=96/138/180/222/264: expression box (40,y,300,34) + verdict*/
/* pill (360,y,84,34) + reason text (no rect); footer text y=316.      */
/* ------------------------------------------------------------------ */

function polynomialSieveSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The polynomial sieve: five expressions pass or fail the family test. x cubed minus two x plus one passes, the constant eight passes, one over x fails for its negative exponent, root x fails for its fractional exponent, and two to the power x fails because the variable sits in the exponent.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the polynomial sieve</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">one question only: does every letter part carry a nonnegative integer exponent?</text>')
  const rows: [string, string, string][] = [
    ['x³ − 2x + 1', 'PASS', 'exponents 3, 1, 0 — all nonnegative integers'],
    ['8', 'PASS', 'the constant 8 = 8x⁰ — exponent 0 is legal (2.2)'],
    ['1/x', 'FAIL', '1/x = x⁻¹ — exponent −1 is not a nonnegative integer'],
    ['√x', 'FAIL', '√x = x^½ — exponent ½ is not an integer'],
    ['2^x', 'FAIL', 'the variable sits in the EXPONENT — a different family'],
  ]
  rows.forEach(([expr, verdict, reason], i) => {
    const y = 96 + i * 42
    parts.push(`<rect x="40" y="${y}" width="300" height="34" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${40 + 150}" y="${y + 22}" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">${expr}</text>`)
    const pill = verdict === 'PASS' ? 'PASS' : 'FAIL'
    const ink = verdict === 'PASS' ? '#3f6212' : '#7c2d12'
    parts.push(`<rect x="360" y="${y}" width="84" height="34" rx="17" fill="none" stroke="${ink}" stroke-width="1.5"/>`)
    parts.push(`<text x="402" y="${y + 22}" font-size="12.5" fill="${ink}" text-anchor="middle" font-weight="700">${pill}</text>`)
    parts.push(`<text x="462" y="${y + 22}" font-size="11" fill="#6b7a72" text-anchor="start">${reason}</text>`)
  })
  parts.push('<text x="360" y="316" font-size="11.5" fill="#6b7a72" text-anchor="middle">the boundary lives in the exponent of the letter part — never in the coefficient</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (3.2): the distributive grid for (2x+3)(x−4). Header       */
/* (30,18,660,44); LEFT panel (30,84,350,170) with 4 cell boxes 130x54 */
/* at (60,130),(200,130),(60,192),(200,192); RIGHT panel (410,84,280,  */
/* 170) with 2 note boxes 250x56 at (425,110),(425,180); collection    */
/* band (30,272,660,40) with 3 boxes 200x24 at x=44/260/476, y=280.    */
/* Geometry pinned in section G, audited in I.                         */
/* ------------------------------------------------------------------ */

function distributiveGridSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The distributive grid for two x plus three times x minus four: four cells, two x squared, minus eight x, three x, minus twelve, collected into two x squared minus five x minus twelve.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the distributive grid: (2x + 3)(x − 4)</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">every term of the first meets every term of the second — four cells, then collect</text>')
  // LEFT panel: the 2×2 grid
  parts.push('<rect x="30" y="84" width="350" height="170" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="205" y="106" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">the four cells</text>')
  parts.push('<text x="125" y="126" font-size="12" fill="#4d7c0f" text-anchor="middle">× | x        −4   (columns of x − 4)</text>')
  const cells: [number, number, string, string][] = [
    [60, 130, '2x²', '2x · x'],
    [200, 130, '−8x', '2x · (−4)'],
    [60, 192, '3x', '3 · x'],
    [200, 192, '−12', '3 · (−4)'],
  ]
  for (const [cx, cy, big, small] of cells) {
    parts.push(`<rect x="${cx}" y="${cy}" width="130" height="54" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${cx + 65}" y="${cy + 24}" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">${big}</text>`)
    parts.push(`<text x="${cx + 65}" y="${cy + 42}" font-size="10.5" fill="#6b7a72" text-anchor="middle">${small}</text>`)
  }
  // RIGHT panel: why the grid is lawful
  parts.push('<rect x="410" y="84" width="280" height="170" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="550" y="106" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">why every cell is legal</text>')
  const notes: [string, string][] = [
    ['distributivity twice', 'a(b + c) = ab + ac, applied twice — AL 1.1’s field law'],
    ['the exponent laws run it', '2x · x = 2x² — coefficients multiply, exponents add (2.1)'],
  ]
  notes.forEach(([title, sub], i) => {
    const y = 110 + i * 70
    parts.push(`<rect x="425" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="550" y="${y + 22}" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="550" y="${y + 40}" font-size="9.5" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="272" width="660" height="40" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  const collected: [number, string][] = [
    [44, 'x²:  2x²'],
    [260, 'x:  −8x + 3x = −5x'],
    [476, '1:  −12'],
  ]
  for (const [cx, label] of collected) {
    parts.push(`<rect x="${cx}" y="280" width="200" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${cx + 100}" y="296" font-size="11.5" fill="#365314" text-anchor="middle">${label}</text>`)
  }
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (3.2): the convolution columns of (x+2)(x+3). Header       */
/* (30,18,660,44); four product boxes 180x50 at (60,90),(270,90),      */
/* (60,150),(270,150); three column panels 180x90 at (60,220),         */
/* (270,220),(480,220); footer text y=336.                             */
/* ------------------------------------------------------------------ */

function convolutionColumnsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The convolution columns of x plus two times x plus three: the four products, x times x equals x squared, x times three equals three x, two times x equals two x, two times three equals six, land in three columns by their degree, giving x squared, five x and six.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the convolution columns: (x + 2)(x + 3)</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">four products, three landing zones — each product falls into the column of its degree</text>')
  const prods: [number, number, string, string][] = [
    [60, 90, 'x · x = x²', 'degree 2'],
    [270, 90, 'x · 3 = 3x', 'degree 1'],
    [60, 150, '2 · x = 2x', 'degree 1'],
    [270, 150, '2 · 3 = 6', 'degree 0'],
  ]
  for (const [px, py, big, small] of prods) {
    parts.push(`<rect x="${px}" y="${py}" width="180" height="50" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${px + 90}" y="${py + 22}" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">${big}</text>`)
    parts.push(`<text x="${px + 90}" y="${py + 40}" font-size="10.5" fill="#6b7a72" text-anchor="middle">${small}</text>`)
  }
  const cols: [number, string, string][] = [
    [60, 'x² column', 'gathers 1 · 1 = 1'],
    [270, 'x column', 'gathers 3 + 2 = 5'],
    [480, '1 column', 'gathers 2 · 3 = 6'],
  ]
  for (const [cx, title, sub] of cols) {
    parts.push(`<rect x="${cx}" y="220" width="180" height="90" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>`)
    parts.push(`<text x="${cx + 90}" y="252" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${cx + 90}" y="274" font-size="11" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  }
  parts.push('<text x="360" y="336" font-size="11.5" fill="#6b7a72" text-anchor="middle">the diagonal is the collection: products of equal degree-sum share a column — x² + 5x + 6</text>')
  return parts.join('')
}

export const chapter03: Chapter = {
  number: 3,
  slug: 'polynomials',
  title: 'Polynomials',
  summary:
    'The first algebraic family: what a polynomial is (terms, degree, classification by shape), arithmetic on polynomials — addition, subtraction and the distributive grid of multiplication — the special products (a ± b)² and (a + b)(a − b) PROVED by distribution and then used as identities, and division: long division as ANS’s division algorithm wearing letters, with the remainder theorem proved and the factor theorem glimpsed.',
  status: 'in-progress',
  lessons: [
    {
      id: 'al-what-a-polynomial-is-terms-degree-and-family',
      number: '3.1',
      title: 'What a Polynomial Is: Terms, Degree and Family',
      concepts: [
        'the polynomial family',
        'terms, coefficients and letter parts',
        'degree of a term',
        'degree of a polynomial',
        'monomial, binomial, trinomial, multinomial',
        'constant, linear, quadratic, cubic',
        'evaluating a polynomial',
        'the nonnegative-integer exponent boundary',
      ],
      objectives: [
        'define a polynomial term-by-term — a coefficient carrying a nonnegative integer power of the letter',
        'read the anatomy of any term: coefficient, base letter, degree — and price why the coefficient never counts toward degree',
        'classify polynomials by shape (monomial, binomial, trinomial, multinomial) and by degree (constant, linear, quadratic, cubic)',
        'run the sieve: say exactly why 1/x, √x and 2^x are not polynomials, and why constants are',
        'evaluate a polynomial at any value with the substitution machine, and build its value table',
        'collect like terms at family scale and arrange answers in standard form',
      ],
      prerequisites: ['al-expressions-terms-like-terms', 'al-powers-and-the-laws-of-exponents'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math9-ch2-polynomials', 'cengage-jee-style', 'descartes-1637-geometrie'],
      blocks: [
        { kind: 'para', text: 'Lesson 1.1 taught a letter to stand for a number; Lesson 1.2 taught copies of that letter to combine under the collection law; and chapter 2 taught the letter’s powers to behave — the product, quotient and tower laws proved by counting copies, then repaired to cover zero and negative exponents. Every ingredient of a new object now sits on the bench. This chapter assembles them into the first algebraic **family**: not one expression but a controlled collection of them, built to a single blueprint, so that addition, subtraction and multiplication can be defined once and work everywhere. The family is the **polynomial**, and it is the workhorse of all school algebra — every equation solved in chapters 5, 6 and 9 of this book is a polynomial question wearing different clothes.' },
        { kind: 'para', text: 'The plan of this lesson: define the polynomial honestly, term by term, with the 2.1–2.2 exponent laws doing the defining work; read the anatomy of a term (coefficient, letter part, degree) and the anatomy of a polynomial (degree, shape names); run the sieve that separates polynomials from their neighbours — $1/x$, $\\sqrt{x}$ and $2^{x}$ all fail, and the definition will say exactly why; and then evaluate, collect and arrange — the three working skills everything later depends on. Lesson 1.2’s like-terms sieve re-enters at family scale, and the substitution machine of Lesson 1.3 gets its promotion from evaluating expressions to interrogating whole families.' },
        { kind: 'heading', text: 'What a Polynomial Is: the Definition' },
        { kind: 'para', text: 'The definition follows the classical texts closely in spirit, because every law of the next lessons hangs off its exact wording. A **polynomial in $x$** is an expression built by adding **terms**, where each term is a number (its **coefficient**) carrying a **nonnegative integer power** of $x$. Hall and Knight’s elementary course puts it as a sum of products of letters and numbers; the modern school course (NCERT class 9) says the same thing in the language of exponents: the powers of the letter that may appear are $x^{0}, x^{1}, x^{2}, x^{3}, \\ldots$ and nothing else.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — polynomial in x', text: 'A polynomial in $x$ is a sum of terms, each of the form $a x^{k}$ where $a$ is a number (the coefficient of the term) and $k$ is a nonnegative integer (its degree). Thus $3x^{2} - 5x + 2$ is a polynomial — its terms are $3x^{2}$, $-5x$ and $2$ — and so is the single term $7x^{3}$, and so is the bare constant $8$. Every exponent that appears on the letter must be one of $0, 1, 2, 3, \\ldots$.' },
        {
          kind: 'equation',
          latex: 'p(x) = a_{n}x^{n} + a_{n-1}x^{n-1} + \\cdots + a_{1}x + a_{0}, \\quad a_{n} \\neq 0',
          note: 'the general polynomial of degree n — the coefficients aₙ, …, a₀ are fixed numbers, the letter x is the variable, and the exponents run down the nonnegative integers',
        },
        { kind: 'para', text: 'Read the definition twice, once for what it admits and once for what it refuses. It admits: sums (any number of terms), differences (subtraction is adding the negative — the coefficients may be any numbers, FM chapter 7’s integers included), and bare numbers (a term with the letter absent — the next section shows the absent letter is really $x^{0}$). It refuses: anything whose letter part carries an exponent outside $\\{0, 1, 2, \\ldots\\}$ — so $1/x$, $\\sqrt{x}$ and $x^{2}\\sqrt{x}$ are not polynomials, and neither is $2^{x}$, which hides the letter in the wrong seat entirely. The refusal is not taste; it is what makes the arithmetic of the next lesson work — the collection law and the degree theorem both read the exponents as counts, and counts must be whole.' },
        { kind: 'heading', text: 'The Anatomy of a Term' },
        { kind: 'para', text: 'A term $-7x^{4}$ has three parts, and each part answers a different question. The **coefficient** $-7$ answers *how many copies* — it is the number doing the carrying, and Lesson 1.1’s coefficient anatomy applies unchanged. The **base letter** $x$ answers *copying what* — the variable, the only seat where exponents are allowed to sit. The **degree** of the term is the exponent on the letter — here $4$ — and in a term with several letters the degree is the **sum** of the letter exponents: $3x^{2}y^{3}$ has degree $2 + 3 = 5$, degree 2 in $x$ and degree 3 in $y$. The classical texts (Hall and Knight art. 24) call this sum the *dimensions* of the term and say it in one breath: the product $abc$ is of three dimensions, $ax^{2}$ of three, and — the sentence that disciplines everything later — **a numerical coefficient is not counted**.' },
        {
          kind: 'table',
          caption: 'The anatomy of five terms — coefficient, letter part, degree, and the reading of each',
          head: ['Term', 'Coefficient', 'Letter part', 'Degree', 'The reading'],
          rows: [
            ['$3x^{2}$', '3', '$x^{2}$', '2', 'three copies of $x^{2}$'],
            ['$-7x^{4}$', '$-7$', '$x^{4}$', '4', 'minus seven copies of $x^{4}$ — the sign rides the coefficient'],
            ['$x^{3}$', '1', '$x^{3}$', '3', 'one copy — the coefficient 1 is never printed'],
            ['$5$', '5', '$x^{0}$', '0', 'five copies of $x^{0}$ — a constant term (below)'],
            ['$2xy^{3}$', '2', '$xy^{3}$', '4', 'two copies; degree $1 + 3 = 4$ across two letters'],
          ],
        },
        { kind: 'para', text: 'The fourth row deserves its own sentence, because it is chapter 2 paying a dividend. Why is the bare number $5$ a legal term? Because Lesson 2.2 *derived* $x^{0} = 1$ for every nonzero letter value — the zero exponent was forced by the product law, not decreed. So $5 = 5 \\cdot 1 = 5x^{0}$: a constant **is** a term of degree 0, the exponent-zero seat of the family. The ladder FM 1.1 climbed silently (the ones seat of place value) and chapter 2 repaired formally now becomes structural: the constant term of a polynomial is the degree-zero term, sitting at the bottom of the degree order exactly as the ones seat sits at the bottom of place value. Every polynomial, however tall, stands on a constant.' },
        {
          kind: 'derivation',
          title: 'Every constant is a degree-zero term',
          statement: 'Claim: for any number $a$, the bare constant $a$ is the term $a x^{0}$, of degree 0 — so constants are legal terms of the family without a new rule.',
          steps: [
            {
              label: 'The zero-exponent theorem',
              formula: 'x^{0} = 1 \\quad (x \\neq 0)',
              explanation: 'Lesson 2.2 derived this — the product law needs $x^{0} \\cdot x = x^{0 + 1} = x$, and only the identity 1 multiplies without changing. It was forced, not chosen.',
            },
            {
              label: 'Multiply the constant by the identity',
              formula: 'a = a \\cdot 1 = a \\cdot x^{0} = a x^{0}',
              explanation: 'Substituting the theorem: the bare constant $a$ and the term $a x^{0}$ are the same object at every value of the letter.',
            },
            {
              label: 'Read the degree',
              formula: '\\deg(a x^{0}) = 0',
              explanation: 'The exponent on the letter is 0, and by the anatomy rule the degree of a term is the exponent (the coefficient never counts).',
            },
          ],
          result: 'Every number is a degree-0 term of the family — constants need no special permission, only the zero exponent that chapter 2 already earned.',
        },
        { kind: 'para', text: 'One member of the family refuses to be read by the anatomy, and honesty requires naming it: the **zero polynomial**, the expression $0$ itself. Its degree would be the highest exponent *carrying a nonzero coefficient* — and it has none. The school canon (NCERT class 9) states the degree of a nonzero constant polynomial is 0, and leaves the zero polynomial without a degree; this course does the same. The zero polynomial is still a polynomial — it is the empty sum, the family’s additive identity — but questions like "what is its degree?" are refused rather than answered by convention, exactly as $0^{0}$ was refused in chapter 2. A boundary kept honestly twice is a habit, not an accident.' },
        { kind: 'heading', text: 'The Family Album: Names by Shape and by Degree' },
        { kind: 'para', text: 'Polynomials are named twice over, and the two namings answer different questions. By **shape** — how many terms survive collection: one term is a **monomial**, two a **binomial**, three a **trinomial**, and beyond three the classical name is simply **multinomial** (some books say quadrinomial for four, but the classical texts stop the Latin prefixes at three and let *multinomial* carry the rest). By **degree** — how high the highest nonzero exponent sits: the names are **constant** (degree 0), **linear** (degree 1), **quadratic** (degree 2), **cubic** (degree 3), and then **quartic** (degree 4) and **quintic** (degree 5) as the Latin ordinals take over. Both namings are read off the *collected* form — the sieve below runs first, names second.' },
        {
          kind: 'table',
          caption: 'The two namings — shape by collected term count, family name by degree',
          head: ['Polynomial', 'Terms', 'Shape name', 'Degree', 'Degree name'],
          rows: [
            ['$5x^{2}$', '1', 'monomial', '2', 'quadratic'],
            ['$x + 3$', '2', 'binomial', '1', 'linear'],
            ['$x^{2} + 2x + 1$', '3', 'trinomial', '2', 'quadratic'],
            ['$x^{3} - 8$', '2', 'binomial', '3', 'cubic'],
            ['$8$', '1', 'monomial', '0', 'constant'],
          ],
        },
        { kind: 'para', text: 'The word *quadratic* is worth its own sentence, because examination papers lean on it. It comes from the Latin *quadratus*, square — a quadratic polynomial is a *square-degree* polynomial, its highest term an $x^{2}$. The same root gives *quadrature* (squaring a region) and the quadratic formula its name in chapter 9. Hall and Knight’s generation often said **biquadratic** for degree 4 (a *square of a square*, $x^{4} = (x^{2})^{2}$ — the tower law of 2.1 visible inside the name); modern syllabi say quartic, and both names describe the same family member. Do not confuse the shape name with the degree name: $x^{3} - 8$ above is a binomial **and** a cubic — shape counts terms, degree reads exponents, and neither hears the other.' },
        { kind: 'figure', caption: 'The anatomy of a term dissected (left) and the family album (right): every polynomial is named by its collected shape and by its degree.', svg: termAnatomySvg() },
        { kind: 'heading', text: 'What Is NOT a Polynomial: the Honest Boundary' },
        { kind: 'para', text: 'A family is defined by its refusals as much as its admissions, so the sieve must run before the names stick. Take the three commonest neighbours and price each against the definition. $1/x$: rewrite it with a negative exponent, $1/x = x^{-1}$, and the exponent $-1$ is not a nonnegative integer — refused. $\\sqrt{x}$: rewrite it as $x^{1/2}$ (the fractional exponent the permanence ladder deferred in 2.2), and $1/2$ is not an integer — refused. $2^{x}$: here the letter sits in the **exponent**, not the base — the definition requires the letter to be what gets copied, and $2^{x}$ copies 2 by a *variable* number of copies, which no fixed exponent can express. That expression belongs to the growth family this series met in 2.1’s compounding census ($2^{n}$ against $n^{2}$); it is a power, not a polynomial, and the two families answer different questions.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the boundary lives in the exponent, never in the coefficient', text: 'The sieve reads only the **letter part** of each term. The coefficient may be any number whatsoever — negative, fractional, a large decimal — because the coefficient is just the number of copies. $\\tfrac{1}{2}x^{2}$ is a perfectly good term (half a copy of $x^{2}$), and $x^{2} + \\tfrac{1}{2}$ is a perfectly good polynomial. But $\\tfrac{1}{2}x^{2} + \\sqrt{x}$ is not: the first term passes, the second carries the fractional exponent $1/2$. The same expression can be half-in and half-out — every term is sieved individually, and one refusal refuses the whole sum.' },
        { kind: 'figure', caption: 'The polynomial sieve: five expressions, one question — does every letter part carry a nonnegative integer exponent?', svg: polynomialSieveSvg() },
        { kind: 'para', text: 'Two letters change nothing in the definition and only enrich the degree reading. A polynomial in $x$ and $y$ is a sum of terms like $2xy^{3}$, each term’s degree the **sum** of its letter exponents; the degree of the whole is still the highest term degree. One classical idea returns here and will matter in chapter 4: an expression all of whose terms share one degree is **homogeneous** — $x^{2} + 3xy + y^{2}$ has every term at total degree 2 (2, then $1 + 1$, then 2), and it is homogeneous of degree 2 in Hall and Knight’s exact sense. Keep the word; it earns its keep the moment factorization begins.' },
        { kind: 'heading', text: 'Evaluating a Polynomial: the Substitution Machine at Family Scale' },
        { kind: 'para', text: 'Lesson 1.3 built the substitution machine: feed a value to the letter, run the arithmetic in the lawful order, collect a number. A polynomial is that machine given a name and a family card. The notation $p(x)$ names the machine — read it "*p* of $x$", a function of the letter, not $p$ times $x$ — and $p(3)$ is the output when the input 3 is substituted. Nothing new is computed: evaluation is still substitution plus the order of operations (FM 2.8), the sign law of FM chapter 7 riding the arithmetic, and chapter 2’s exponents making the powers cheap. What is new is the *habit*: because a polynomial is a whole family of terms evaluated together, its value table becomes its fingerprint.' },
        { kind: 'example', title: 'Simplify 2x³ + 5x² − x³ + 7 − 3x + 2x², then state its shape, its degree and its standard form', steps: [
          'Take the collection first, degree by degree: the $x^{3}$ terms collect as $2 - 1 = 1$, giving $x^{3}$.',
          'Now, the $x^{2}$ terms: $5 + 2 = 7$, giving $7x^{2}$.',
          'The $x$ term stands alone at $-3x$ (no partner to collect with — unlike degrees, unlike terms), and the constant is $7$.',
          'So, the collected form is $x^{3} + 7x^{2} - 3x + 7$.',
          'Hence: four terms — a multinomial; highest exponent 3 — degree 3, a cubic; and written highest-first it is already in standard form.',
        ] },
        { kind: 'example', title: 'Build the value table of p(x) = x³ − 2x + 1 at x = −2, x = 1 and x = 3', steps: [
          'Take $x = -2$: substitute with the sign law in force — $p(-2) = (-2)^{3} - 2(-2) + 1 = -8 + 4 + 1 = -3$.',
          'Take $x = 1$: $p(1) = 1 - 2 + 1 = 0$ — the output lands exactly on zero.',
          'Take $x = 3$: $p(3) = 27 - 6 + 1 = 22$.',
          'Hence the three outputs are $-3$, $0$ and $22$; the zero at $x = 1$ is this chapter’s seed — an input whose output is 0 is called a zero of the polynomial, and chapter 4 turns hunting zeros into factorization.',
        ] },
        { kind: 'para', text: 'The full table over $x = -3$ to $3$ reads $-20, -3, 2, 1, 0, 5, 22$ — non-monotone, dipping through its zero at $x = 1$. Two lessons follow from one table. First, the machine view of 1.3 scales: a polynomial is *known* when its outputs are known, and two polynomials that disagree anywhere are different polynomials — the table is an identity card. Second, the zero at $x = 1$ is not a curiosity: where a polynomial’s output crosses zero, its graph (chapter 8’s subject) crosses the axis, and its algebra (chapter 4) gains a factor. The value table is the bridge between the algebra of this book and the geometry of the next.' },
        { kind: 'heading', text: 'The Like-Terms Sieve Re-enters' },
        { kind: 'para', text: 'Lesson 1.2 proved the collection law — $3x + 2x = 5x$ because three copies of $x$ plus two copies of $x$ is five copies — and drew the line that made the law lawful: only **like terms** collect, and likeness is sameness of letter part. At family scale the same law reads exponents instead of bare letters: $5x^{2}$ and $3x^{2}$ are like (both carry copies of $x^{2}$) and collect to $8x^{2}$; $5x^{2}$ and $3x^{3}$ are unlike — copies of $x^{2}$ and copies of $x^{3}$ are different blocks, and the classical texts say it flatly (Hall and Knight art. 26): different powers of the same letter are unlike terms, so $5x^{2} + 3x^{3}$ must remain two terms. The verifier swept the line: 42 degree pairs crossed with 16 coefficient pairs, 672 checks, not one collapse.' },
        {
          kind: 'derivation',
          title: 'The collection law for powers',
          statement: 'Claim: for any numbers $a, b$ and any degree $k \\geq 0$, $a x^{k} + b x^{k} = (a + b)x^{k}$ — like terms collect by adding coefficients, the exponents untouched.',
          steps: [
            {
              label: 'Both terms are copies of the same block',
              formula: 'a x^{k} + b x^{k}',
              explanation: 'Whatever $x^{k}$ evaluates to, both terms carry copies of that one block — the likeness the collection law demands.',
            },
            {
              label: 'Factor the common block (distributivity)',
              formula: '(a + b) x^{k}',
              explanation: 'The distributive law of the field (ANS 7.2, restated for letters in AL 1.1): $a c + b c = (a + b)c$ with the block $x^{k}$ in the role of $c$. This is exactly 1.2’s proof with $x^{2}$-style blocks in the copy seat.',
            },
            {
              label: 'Verify at chosen numbers',
              formula: '5x^{2} + 3x^{2} = 8x^{2} \\text{ at } x = 2{:} \\; 20 + 12 = 32 = 8 \\cdot 4',
              explanation: 'The sweep discipline of 1.1 at desk scale: both sides give 32, and the verifier’s 567-check grid found no exception.',
            },
          ],
          result: 'Like terms collect by adding coefficients — $a x^{k} + b x^{k} = (a + b)x^{k}$ — and unlike terms never do.',
        },
        { kind: 'para', text: 'Collection is also what makes the **standard form** possible. A polynomial is in standard form when its collected terms are written in order of degree — highest first (**descending powers**, the working convention) or lowest first (**ascending powers**, what the older texts use when long division enters in 3.4). The uncollected mess $7x + 3x^{3} - 5 + 2x^{2}$ and the standard form $3x^{3} + 2x^{2} + 7x - 5$ are the same polynomial wearing the same terms in different clothes — and arranging them by degree is what lets the eye (and the next lesson’s column work) find like terms at a glance.' },
        { kind: 'para', text: 'One counting consequence of the sieve closes the section, because it disciplines what "a lot of terms" can mean. A polynomial of degree $n$ in $x$ has, after collection, **at most $n + 1$ terms**: its terms carry degrees drawn from $\\{0, 1, \\ldots, n\\}$ — that is $n + 1$ possible degrees — and two terms of the same degree would have collected into one. The bound is tight: $1 + x + x^{2} + x^{3} + x^{4}$ has all five degrees occupied and is exactly a five-term quartic. An examination question offering a "six-term polynomial of degree 4" is offering a contradiction — either a term hides a like partner waiting to collect, or the degree is not 4.' },
        { kind: 'example', title: 'Run the sieve: which of x² + ½x, 4 − y⁻² and 3t² + t³ are polynomials, and why?', steps: [
          'Take $x^{2} + \\tfrac{1}{2}x$: exponents 2 and 1 — both nonnegative integers; the coefficient $\\tfrac{1}{2}$ is legal (coefficients may be any number). A polynomial — binomial, degree 2.',
          'Take $4 - y^{-2}$: the second term is $-y^{-2}$, exponent $-2$ — not a nonnegative integer. Refused, whatever the first term does: one failing term fails the sum.',
          'Take $3t^{2} + t^{3}$: exponents 2 and 3 — legal. A polynomial: two terms, so a binomial of degree 3 (shape counts terms; degree reads exponents).',
          'Hence the first and third are polynomials; the middle one fails on its exponent, not on its coefficient.',
        ] },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the notation this page is printed in', text: 'Every superscript on this page descends from one book: René Descartes’ *La Géométrie* (1637), where the unknown’s powers were written $x, x^{2}, x^{3}, \\ldots$ with raised numerals — essentially the notation standardized in print that algebra still uses (earlier writers had stacked abbreviations and special symbols for each power; Descartes’ single device, paired with his choice of $x, y, z$ for unknowns, made the whole system portable). The vocabulary is older and more ordinary than it sounds: *monomial*, *binomial* and *polynomial* are Greek-and-Latin hybrids counting *nomial* — terms — the way *polygon* counts angles. Hall and Knight’s 1885 course still teaches both the words and the notation exactly as this lesson does.' },
        { kind: 'para', text: 'Where the family goes next: Lesson 3.2 teaches it to add, subtract and multiply — and proves the one theorem (degree of a product) that makes the algebra of the rest of the book predictable. Chapter 4 runs the whole story backwards (factorization), chapter 5 settles equations, and chapter 8 draws the tables this lesson began. The polynomial is the object every later chapter assumes; the definition above is the load-bearing wall.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'The polynomial-identification and degree questions are reliable marks when the definition is owned exactly. The recurring shapes: classify by shape and degree ($3x^{2} - 5x + 2$ — trinomial, quadratic); state the degree without expanding a product (owned in full in 3.2 — already usable: $(x+1)(x+2)(x+3)$ has degree $1+1+1 = 3$); catch the NOT-polynomial ($1/x$, $\\sqrt{x}$, $2^{x}$, and the sneaky $x + \\sqrt{x}$ — one failing term fails the sum); evaluate at a point with the sign law ($p(x) = x^{3} - 2x + 1$ at $x = -1$ gives $2$ — signs ride in brackets); and arrange in descending powers. Competitive papers add the constant-degree trap (the degree of a nonzero constant is 0), the zero-polynomial refusal ("degree undefined" is the answer, not 0), and count-the-possible-terms items — a degree-4 polynomial has at most 5 collected terms. The check-by-substitution habit stays: every collected form was verified at a chosen value in this lesson’s illustrations.' },
        { kind: 'terms', items: [
          { term: 'Polynomial', def: 'A sum of terms, each a coefficient carrying a nonnegative integer power of the letter ($a x^{k}$, $k \\in \\{0, 1, 2, \\ldots\\}$). The family every later chapter of this book works in.' },
          { term: 'Term', def: 'One coefficient-times-power building block of a polynomial — AL 1.2’s term, now with the letter part carrying an exponent. A term’s degree is its total letter-exponent count.' },
          { term: 'Coefficient', def: 'The number of copies a term carries — any number at all, never counted toward the degree. AL 1.1’s coefficient, unchanged at family scale.' },
          { term: 'Degree of a term', def: 'The sum of the letter exponents: $\\deg(3x^{2}y^{3}) = 5$. Hall and Knight call this the term’s *dimensions*; a numerical coefficient is never counted.' },
          { term: 'Degree of a polynomial', def: 'The highest degree among its collected nonzero terms — 2 for $3x^{2} - 5x + 2$. The zero polynomial has no degree in this course.' },
          { term: 'Monomial · binomial · trinomial · multinomial', def: 'The shape names: one, two, three collected terms — and multinomial beyond. Shape counts terms; it says nothing about degree.' },
          { term: 'Constant · linear · quadratic · cubic', def: 'The degree names: 0, 1, 2, 3 — then quartic, quintic. *Quadratic* from quadratus, square; the older texts say biquadratic for degree 4.' },
          { term: 'Standard form', def: 'The collected terms written in degree order — descending powers by convention, ascending when division arrives in 3.4. Same polynomial, same terms, lawful order.' },
        ] },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: 'In the term $-7x^{4}$, the coefficient is',
              options: ['7', '$-7$', '4', '$x^{4}$'],
              answer: 1,
              explain: 'The coefficient is the number of copies, sign included: $-7$. Option 7 dropped the sign — the coefficient is any number, negative ones included (FM ch. 7’s integers carry it). Option 4 is the exponent (the degree, not the coefficient), and $x^{4}$ is the letter part. The anatomy rule: coefficient never counts toward degree; here the degree is 4 and the coefficient is $-7$.',
            },
            {
              q: 'The degree of $5x^{3} - 8x^{2} + x - 11$ is',
              options: ['3', '2', '11', '6'],
              answer: 0,
              explain: 'The degree is the highest collected exponent carrying a nonzero coefficient: 3. Option 2 read the next term down; 11 read the constant as if magnitude mattered (degree reads exponents, not sizes); 6 added the exponents $3 + 2 + 1$ — the sum-the-exponents misread, which is a degree-of-a-product move (3.2’s theorem) meeting a sum, where it does not apply.',
            },
            {
              q: 'Which of these is NOT a polynomial?',
              options: ['$x^{2} + 3x + 1$', '$\\tfrac{1}{x} + 3$', '$x^{3} - x$', '7'],
              answer: 1,
              explain: '$\\tfrac{1}{x} = x^{-1}$ carries exponent $-1$ — not a nonnegative integer — so it fails the sieve, and one failing term fails the whole sum. The others all pass: $x^{2} + 3x + 1$ (exponents 2, 1, 0), $x^{3} - x$ (3, 1), and the bare constant 7 (degree 0, legal by the zero-exponent theorem of 2.2). Note where the boundary sits: in the letter part’s exponent, never in the coefficient.',
            },
            {
              q: 'If $p(x) = x^{3} - 2x + 1$, then $p(3)$ equals',
              options: ['21', '22', '26', '25'],
              answer: 1,
              explain: '$p(3) = 27 - 6 + 1 = 22$. The distractors are the three substitution slips: 21 dropped the constant $+1$; 26 read $2x$ as 2 (the coefficient walked off — $2 \\cdot 3$, not 2); 25 made both slips. The sign law and the order of operations (FM 2.8) did all the work: cube first, then the product, then the sum.',
            },
            {
              q: 'In DESCENDING powers, $7x + 3x^{3} - 5 + 2x^{2}$ is written',
              options: ['$3x^{3} + 2x^{2} + 7x - 5$', '$-5 + 7x + 2x^{2} + 3x^{3}$', '$2x^{2} + 3x^{3} + 7x - 5$', '$3x^{3} + 7x + 2x^{2} - 5$'],
              answer: 0,
              explain: 'Descending means highest exponent first: $3x^{3}$, then $2x^{2}$, then $7x$, then the constant $-5$. Option 2 is ASCENDING (lowest first — lawful, but not what was asked); option 3 swapped the $x^{3}$ and $x^{2}$ positions; option 4 dropped $2x^{2}$ out of order between $7x$ and $-5$. The rearrangement changes nothing algebraically — collection already happened — it only orders the terms.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises 3.1',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Classify each by shape and by degree: $4x^{2}$, $x^{2} - 9$, $x^{2} + 5x + 6$.',
                  solution: [
                    'Take $4x^{2}$: one collected term — a monomial; highest exponent 2 — quadratic.',
                    'Take $x^{2} - 9$: two terms — a binomial; exponent 2 — quadratic.',
                    'Take $x^{2} + 5x + 6$: three terms — a trinomial; exponent 2 — quadratic.',
                    'Hence all three are quadratics; only the shape names differ.',
                  ],
                  answer: 'monomial, binomial, trinomial — all of degree 2 (quadratic)',
                },
                {
                  q: 'State the degree of $8x^{5} - 3x + 2$, of $-y^{7}$, and of $12$.',
                  solution: [
                    'Take $8x^{5} - 3x + 2$: the collected exponents are 5, 1, 0 — the highest is 5.',
                    'Take $-y^{7}$: one term, exponent 7 — the minus rides the coefficient and never touches the degree.',
                    'Take $12$: a nonzero constant — degree 0 (the zero-exponent term, 2.2’s theorem).',
                    'Hence 5, 7 and 0.',
                  ],
                  answer: '$8x^{5} - 3x + 2$ has degree 5; $-y^{7}$ degree 7; $12$ degree 0',
                },
                {
                  q: 'Evaluate $p(x) = 2x^{2} - 3x + 1$ at $x = 2$ and at $x = -1$.',
                  solution: [
                    'Take $x = 2$: $p(2) = 2 \\cdot 4 - 3 \\cdot 2 + 1 = 8 - 6 + 1 = 3$.',
                    'Take $x = -1$: brackets on the negatives — $p(-1) = 2 \\cdot 1 + 3 + 1 = 6$.',
                    'Hence 3 and 6 — and note $p(-1)$ came out larger than $p(2)$: value tables need not climb.',
                  ],
                  answer: '$p(2) = 3$, $p(-1) = 6$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Arrange $5x - 4x^{3} + 7 - x^{2}$ in descending powers.',
                  solution: [
                    'Collect first — no like partners exist, so the terms stand as they are.',
                    'Now, order by degree: the cubic term $-4x^{3}$ leads, then $-x^{2}$, then $5x$, then the constant $7$.',
                    'Hence $-4x^{3} - x^{2} + 5x + 7$ — the minus signs ride their coefficients into their degree seats.',
                  ],
                  answer: '$-4x^{3} - x^{2} + 5x + 7$',
                },
                {
                  q: 'Simplify $6x^{2} - 4x + 2x^{2} + 9 - x + 3$.',
                  solution: [
                    'Take the $x^{2}$ terms: $6 + 2 = 8$, giving $8x^{2}$.',
                    'Take the $x$ terms: $-4 - 1 = -5$, giving $-5x$ (both ride minus signs into the collection).',
                    'Take the constants: $9 + 3 = 12$.',
                    'Hence $8x^{2} - 5x + 12$ — a trinomial of degree 2 in standard form.',
                  ],
                  answer: '$8x^{2} - 5x + 12$',
                },
                {
                  q: 'Which of these are polynomials? $x^{2} + \\tfrac{1}{2}x$, $4 - y^{-2}$, $3t^{2} + t^{3}$.',
                  solution: [
                    'Take $x^{2} + \\tfrac{1}{2}x$: exponents 2 and 1, coefficient $\\tfrac{1}{2}$ legal — a polynomial.',
                    'Take $4 - y^{-2}$: exponent $-2$ on the letter — refused (the coefficient 4 is innocent; the exponent is the failure).',
                    'Take $3t^{2} + t^{3}$: exponents 2 and 3 — a polynomial.',
                    'Hence the first and third pass; the middle fails on its exponent.',
                  ],
                  answer: 'the first and third are polynomials; $4 - y^{-2}$ is not',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Build the value table of $q(x) = x^{2} - 4x$ for $x = 0, 1, 2, 3, 4$.',
                  solution: [
                    'Take $x = 0$: $q(0) = 0$.',
                    'Take $x = 1$: $q(1) = 1 - 4 = -3$.',
                    'Take $x = 2$: $q(2) = 4 - 8 = -4$ — the table’s lowest point so far.',
                    'Take $x = 3$: $q(3) = 9 - 12 = -3$ — climbing back.',
                    'Take $x = 4$: $q(4) = 16 - 16 = 0$.',
                    'Hence $0, -3, -4, -3, 0$ — a symmetric valley around $x = 2$: the quadratic dips to its minimum and returns. Graphs (chapter 8) draw exactly this.',
                  ],
                  answer: '$0, -3, -4, -3, 0$ — symmetric around $x = 2$',
                },
                {
                  q: 'State the degree (in all letters, and in $x$) of $5x^{2}y^{3}$, $-2xy^{4}$ and $7x^{2}y$.',
                  solution: [
                    'Take $5x^{2}y^{3}$: letter exponents $2 + 3 = 5$; in $x$ alone, 2. The coefficient 5 never counts.',
                    'Take $-2xy^{4}$: $1 + 4 = 5$; in $x$ alone, 1.',
                    'Take $7x^{2}y$: $2 + 1 = 3$; in $x$ alone, 2.',
                    'Hence 5, 5, 3 across both letters — and the degree-in-one-letter reading is what long division (3.4) will use.',
                  ],
                  answer: 'degrees 5, 5, 3; in $x$ alone: 2, 1, 2',
                },
                {
                  q: 'Write a polynomial of degree 4 with exactly three terms and constant term $-7$. (Many answers.)',
                  solution: [
                    'The requirements: some term must carry $x^{4}$ (that fixes the degree), the collected term count must be 3, and the degree-0 coefficient must be $-7$.',
                    'Now, choose $x^{4} - 2x - 7$: degrees 4, 1, 0 — three terms, highest 4, constant $-7$.',
                    'Check it against the definition: every exponent nonnegative — legal; coefficient of $x^{4}$ is 1 (nonzero, so the degree claim holds).',
                    'Hence $x^{4} - 2x - 7$ works — degree 4, three terms, constant $-7$; alternatives differ only in the coefficients chosen.',
                  ],
                  answer: '$x^{4} - 2x - 7$ (among many others)',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Build the value table of $r(x) = x^{3} - 2x + 1$ for $x = -2, -1, 0, 1, 2$, and find every $x$ in that set where $r(x) = 0$.',
                  solution: [
                    'Take $x = -2$: $-8 + 4 + 1 = -3$.',
                    'Take $x = -1$: $-1 + 2 + 1 = 2$.',
                    'Take $x = 0$: $0 - 0 + 1 = 1$.',
                    'Take $x = 1$: $1 - 2 + 1 = 0$ — a zero of the polynomial.',
                    'Take $x = 2$: $8 - 4 + 1 = 5$.',
                    'Hence the table reads $-3, 2, 1, 0, 5$ and the only zero in the set is $x = 1$ — the seed chapter 4 harvests into a factor $(x - 1)$.',
                  ],
                  answer: '$-3, 2, 1, 0, 5$; the zero is $x = 1$',
                },
                {
                  q: 'Simplify $3x^{2} - 5 + 2x - x^{2} + 4 + x^{3}$ and state the degree of the collected form.',
                  solution: [
                    'Take the $x^{3}$ terms: only $+x^{3}$ — it stands alone.',
                    'Take the $x^{2}$ terms: $3 - 1 = 2$, giving $2x^{2}$.',
                    'Take the $x$ terms: just $2x$; take the constants: $-5 + 4 = -1$.',
                    'So, the collected form is $x^{3} + 2x^{2} + 2x - 1$ — four terms, and the new degree-3 term was hiding uncollected among the mess.',
                    'Hence degree 3: collection can RAISE the readable degree of a messy page, because the highest term may arrive unpartnered and unbilled.',
                  ],
                  answer: '$x^{3} + 2x^{2} + 2x - 1$, degree 3',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'How many polynomials of degree exactly 2 can be built from the terms $x^{2}$, $x$, $1$ if every coefficient comes from $\\{1, 2, 3\\}$ and all three terms must appear?',
                  solution: [
                    'Take the structure: each of the three degree seats ($2, 1, 0$) must carry one coefficient from $\\{1, 2, 3\\}$ — three choices, independently.',
                    'Now, count: $3 \\times 3 \\times 3 = 27$.',
                    'Check the boundary cases: choosing all 1s gives $x^{2} + x + 1$ (legal, degree 2, three terms); choosing all 3s gives $3x^{2} + 3x + 3$ (degree 2 — the common factor 3 does not change the degree).',
                    'Hence 27 — and the verifier enumerated all 27 and found every one degree-2 with three nonzero terms.',
                  ],
                  answer: '27',
                },
                {
                  q: 'Find a polynomial of degree 2 with leading coefficient 1 that gives the value 0 at both $x = 1$ and $x = 2$.',
                  solution: [
                    'Hunt by construction: the polynomial must vanish at 1 and at 2 — try the product of the two vanishing factors $(x - 1)(x - 2)$.',
                    'Now, expand by the coming lesson’s grid (or term-by-term): $x(x-2) - 1(x-2) = x^{2} - 2x - x + 2 = x^{2} - 3x + 2$.',
                    'Check both requirements: leading coefficient 1 — yes; $p(1) = 1 - 3 + 2 = 0$ and $p(2) = 4 - 6 + 2 = 0$ — yes, both.',
                    'Hence $x^{2} - 3x + 2$ — the hunt that chapter 4 turns into the factor theorem’s machine.',
                  ],
                  answer: '$x^{2} - 3x + 2$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'A polynomial of degree 4 in $x$ is fully collected. Explain why it has at most five terms, demonstrate the bound being met, and then collect $2x^{2} + 3x^{4} - x^{2} + 7x^{4} - 5x^{2} + 1$ and count its terms.',
                  solution: [
                    'Take the pigeonhole first: every collected term of a degree-4 polynomial carries one of the degrees $\\{0, 1, 2, 3, 4\\}$ — five possible degrees, and like degrees collected, so at most five terms.',
                    'Demonstrate the bound met: $1 + x + x^{2} + x^{3} + x^{4}$ — five terms, every degree occupied, degree 4. No degree-4 polynomial can have six.',
                    'Now, collect the given mess degree by degree: $x^{4}$ terms $3 + 7 = 10$; the $x^{2}$ terms $2 - 1 - 5 = -4$; the constant $1$; no $x^{3}$ or $x$ terms at all.',
                    'So, the collected form is $10x^{4} - 4x^{2} + 1$ — three terms out of the six printed.',
                    'Hence the mess spent six lines to say what three terms say: collection is compression, and the five-seat pigeonhole is the compression’s limit.',
                  ],
                  answer: 'at most 5 terms (degrees $0..4$); $1+x+x^{2}+x^{3}+x^{4}$ meets the bound; the mess collects to $10x^{4} - 4x^{2} + 1$',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'A polynomial in x', latex: 'p(x) = a_{n}x^{n} + a_{n-1}x^{n-1} + \\cdots + a_{1}x + a_{0}, \\; a_{n} \\neq 0', note: 'every exponent a nonnegative integer; degree $n$; the constant $a_{0}$ is the degree-0 term' },
        { kind: 'formula', name: 'Degree of a term', latex: '\\deg(c\\,x^{k}) = k, \\qquad \\deg(c\\,x^{a}y^{b}) = a + b', note: 'the coefficient $c$ never counts — the degree is the letter-exponent sum' },
      ],
    },
    {
      id: 'al-adding-subtracting-and-multiplying-polynomials',
      number: '3.2',
      title: 'Adding, Subtracting and Multiplying Polynomials',
      concepts: [
        'closure of the polynomial family',
        'addition as like-term collection',
        'subtraction distributes the minus',
        'the distributive grid',
        'the convolution columns',
        'leading coefficient and leading term',
        'the degree-of-a-product theorem',
        'the first special products',
      ],
      objectives: [
        'add and subtract polynomials by degree-aligned column work, and prove the pointwise principle (f ± g)(x) = f(x) ± g(x)',
        'multiply monomials, monomials by polynomials, and polynomials by polynomials on the distributive grid',
        'collect the grid’s products on the convolution diagonal — the coefficient of xᵏ gathers every pair of degrees summing to k',
        'prove deg(fg) = deg f + deg g by the leading-coefficient argument, and price the drop cases of deg(f ± g)',
        'prove (a + b)² and (a + b)(a − b) by the grid, cashing the cross-term census of chapter 2',
        'state the closure theorem — sums, differences and products stay in the family; quotients do not',
      ],
      prerequisites: ['al-what-a-polynomial-is-terms-degree-and-family', 'al-powers-and-the-laws-of-exponents'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math9-ch2-polynomials', 'al-karaji-binomial-triangle', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lesson 3.1 defined the family: sums of terms, each term a coefficient carrying a nonnegative integer power of the letter. A family you cannot do arithmetic with is only a display case, so this lesson teaches polynomials to **add, subtract and multiply** — and proves along the way that the results stay in the family. That last claim is the quiet theorem underneath everything: ANS chapter 7 proved the rationals closed under the field operations, and this lesson proves the polynomials closed under three of them (addition, subtraction, multiplication — division waits for 3.4 and earns its own chapter). Closure is what makes the algebra *predictable*: every later manipulation, from collecting an equation to factoring a cubic, happens inside the family and produces family members.' },
        { kind: 'para', text: 'The plan: addition first, as the collection law of 1.2 scaled up to whole polynomials; subtraction second, as addition wearing a distributed minus (the one move students most often half-do, and the lesson will census why); multiplication third and largest — the **distributive grid**, where every term of the first polynomial meets every term of the second, with the exponent laws of chapter 2 powering every single cell. Then the payoff theorem: the degree of a product is the **sum** of the degrees, proved by the leading-coefficient argument. And finally the first special products — $(a+b)^{2}$ and $(a+b)(a-b)$ — proved here by the grid, exactly as the chapter 2 census promised, and cashed in full as identities in 3.3.' },
        { kind: 'heading', text: 'Adding Polynomials: the Collection Law at Family Scale' },
        { kind: 'para', text: 'Adding two polynomials is nothing new — it is Lesson 1.2’s collection law applied to several letter-parts at once. The law of that lesson: like terms collect by adding coefficients, unlike terms stand apart. A polynomial brings its terms along in degree order, so the working habit is **column alignment**: write the two polynomials with like degrees in the same column and collect each column separately. Take $f(x) = 3x^{2} - 5x + 2$ and $g(x) = x^{2} + 4x - 6$: the $x^{2}$ column collects $3 + 1 = 4$, the $x$ column collects $-5 + 4 = -1$, and the constant column collects $2 - 6 = -4$ — so the sum is $4x^{2} - x - 4$. Every coefficient moved; no exponent changed; the sum is a polynomial again.' },
        {
          kind: 'table',
          caption: 'The column alignment for the sum and the difference of f = 3x² − 5x + 2 and g = x² + 4x − 6',
          head: ['Degree', 'f(x)', 'g(x)', 'f(x) + g(x)', 'f(x) − g(x)'],
          rows: [
            ['$x^{2}$', '3', '1', '$3 + 1 = 4$', '$3 - 1 = 2$'],
            ['$x^{1}$', '$-5$', '4', '$-5 + 4 = -1$', '$-5 - 4 = -9$'],
            ['$x^{0}$', '2', '$-6$', '$2 - 6 = -4$', '$2 - (-6) = 8$'],
          ],
        },
        { kind: 'para', text: 'Why is column work *lawful*, not just tidy? Because addition commutes and associates (the field laws of ANS 7.2, restated for letters in AL 1.1), the terms of the two polynomials may be re-ordered and re-grouped in any way — and grouping by degree is exactly the re-grouping that puts like terms together. The result is a principle worth naming, because it is how the reader should *understand* polynomial addition rather than memorize it: the sum polynomial is the one whose every coefficient is the sum of the corresponding coefficients. Equivalently — and this is the sentence chapter 8 will draw pictures of — **addition is pointwise**.' },
        {
          kind: 'equation',
          latex: '(f + g)(x) = f(x) + g(x), \\qquad (f - g)(x) = f(x) - g(x)',
          note: 'the pointwise principle — the family’s sum and difference are computed at every input by computing the two polynomials separately and combining the outputs',
        },
        { kind: 'para', text: 'The verifier ran the pointwise principle over a deterministic family of 30 polynomials against one another — 900 pairs, 17 test inputs each, 15,300 BigInt-exact checks per operation — with zero failures, and it held at $x = \\tfrac{1}{2}$ too (fraction inputs, exact fractions out). One consequence deserves attention before the names stick: **the sum of two polynomials can have a smaller degree than either**, and only when their leading degrees match. If $\\deg f \\neq \\deg g$, the higher-degree term has no partner to cancel — the sum keeps the larger degree. If $\\deg f = \\deg g$, the two leading coefficients may add to zero and the top floor collapses: $(x^{3} - x) + (-x^{3} + 2x) = x$ drops degree 3 to degree 1, and $x^{3} + (-x^{3}) = 0$ drops it all the way to the degreeless zero polynomial. The sweep confirmed the rule in both directions: every degree drop in the 900-pair sample sat on an equal-degree pair, and every zero sum was exactly a negation.' },
        { kind: 'heading', text: 'Subtracting: the Minus Reaches Every Term' },
        { kind: 'para', text: 'Subtraction is addition of the negation — and the negation of a polynomial is the polynomial with **every** coefficient negated (that is what makes $f + (-f) = 0$, the cancellation the sweep verified). So to subtract, the minus must be distributed through the whole second polynomial before the columns are collected. The working sentence: $f - g = f + (-1) \\cdot g$, and multiplying a polynomial by $-1$ flips the sign of every term — the distributive law again, this time with $-1$ as the multiplier. For the pair above: $(3x^{2} - 5x + 2) - (x^{2} + 4x - 6)$ becomes $3x^{2} - 5x + 2 - x^{2} - 4x + 6$, and the columns collect to $2x^{2} - 9x + 8$. Note the last column carefully: $2 - (-6) = 8$, the double negative turning positive — FM chapter 7’s sign rules doing exactly the work they were built for.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the half-flip error, priced', text: 'The classic subtraction error is flipping only the FIRST term of the bracket and reading the rest unchanged: $(3x^{2} - 5x + 2) - (x^{2} + 4x - 6)$ misread as $3x^{2} - 5x + 2 - x^{2} + 4x - 6$ gives $2x^{2} - x - 4$ — which is not the difference at all (it is the sum wearing one flipped sign: compare the table’s two columns). The rule the census supports: a minus in front of a bracket flips EVERY sign inside — the number of flips equals the number of terms. Examination papers set this trap routinely, always with a last-term double negative like the $-(-6)$ here, because that is where the half-flip lands.' },
        { kind: 'example', title: 'Compute the sum and the difference of 3x² − 5x + 2 and x² + 4x − 6, and verify both pointwise at x = 2', steps: [
          'Take the sum by columns: $x^{2}$ collects $3 + 1 = 4$; $x$ collects $-5 + 4 = -1$; constants collect $2 - 6 = -4$ — sum $4x^{2} - x - 4$.',
          'Take the difference by columns after distributing the minus: $3 - 1 = 2$; $-5 - 4 = -9$; $2 - (-6) = 8$ — difference $2x^{2} - 9x + 8$.',
          'Check the sum pointwise at $x = 2$: $f(2) = 12 - 10 + 2 = 4$, $g(2) = 4 + 8 - 6 = 6$, and $(f+g)(2) = 16 - 2 - 4 = 10 = 4 + 6$.',
          'Check the difference pointwise at $x = 2$: $(f-g)(2) = 8 - 18 + 8 = -2$ and $f(2) - g(2) = 4 - 6 = -2$ — agreement.',
          'Hence the sum $4x^{2} - x - 4$ and the difference $2x^{2} - 9x + 8$, both verified at a chosen value — the substitution machine as lie detector.',
        ] },
        { kind: 'heading', text: 'Multiplying: the Distributive Grid' },
        { kind: 'para', text: 'Multiplication starts one step below the family and climbs. **Monomial times monomial** is chapter 2’s product law wearing coefficients: $4x \\cdot 3x^{2} = 12x^{3}$ — coefficients multiply ($4 \\cdot 3 = 12$), exponents add ($1 + 2 = 3$). The sign law rides along: $(-2x)(5x) = -10x^{2}$. **Monomial times polynomial** distributes the monomial across every term: $3x^{2}(2x - 5) = 6x^{3} - 15x^{2}$ — each cell is a monomial-monomial product, and the monomial’s degree adds to each term’s degree. **Polynomial times polynomial** applies distributivity once more: every term of the first must meet every term of the second. Hall and Knight’s chapter V organizes exactly this climb — simple multipliers first, compound multipliers once the rule of signs and the law of indices are banked — and the climb’s whole engine is the one field law AL 1.1 banked: $a(b + c) = ab + ac$.' },
        { kind: 'para', text: 'The compound case deserves its own picture, the **distributive grid**: write the two polynomials on the edges of a rectangle, one term per row and one per column, and let each cell carry the product of its row term and its column term. For $(2x + 3)(x - 4)$ the grid has four cells: $2x^{2}$, $-8x$, $3x$, $-12$. The grid makes two things visible at once. First, **why** every product must appear — the distributive law applied twice leaves no term unmet, four factors of the first against two of the second making exactly $2 \\times 2 = 4$ cells (in general, $m$ terms times $n$ terms make $mn$ cells, before collection). Second, **where** the cells land: each product’s degree is the sum of the two degrees, so products of the same degree-sum land in the same column and — the collection law again — gather there as like terms.' },
        { kind: 'figure', caption: 'The distributive grid for (2x + 3)(x − 4): four lawful cells, then the columns collect — 2x², the x-column gathering −8x + 3x = −5x, and the constant −12.', svg: distributiveGridSvg() },
        { kind: 'para', text: 'The two-term-times-two-term case is famous enough to have its own nickname: **FOIL** — First, Outer, Inner, Last. The nickname is honest but partial: it names the four cells of a $2 \\times 2$ grid in traversal order, and examination papers use the word freely. This book keeps the grid as the primary object and treats FOIL as its special case, because the grid *generalizes* — three terms against two need a $3 \\times 2$ grid, FOIL has nothing to say there — and because the grid shows the collection happening by degree, which is where the next theorem lives.' },
        { kind: 'para', text: 'Watch the columns collect on $(x + 2)(x + 3)$. The four products are $x \\cdot x = x^{2}$, $x \\cdot 3 = 3x$, $2 \\cdot x = 2x$, $2 \\cdot 3 = 6$ — and they land in three columns. The $x^{2}$ column gathers only $1 \\cdot 1$: one cell. The $x$ column gathers two cells, $1 \\cdot 3 + 2 \\cdot 1 = 5$: the coefficient of $x$ in the product is the sum of the two diagonal products. The constant column gathers $2 \\cdot 3 = 6$. In general the coefficient of $x^{k}$ in a product collects **every** pair of degrees that sum to $k$ — the diagonal rule the figure shows, and the formula the verifier checked cell by cell.' },
        { kind: 'figure', caption: 'The convolution columns of (x + 2)(x + 3): four products fall into three landing zones by degree — x² gathers 1·1, x gathers 1·3 + 2·1 = 5, and the constant gathers 2·3 = 6.', svg: convolutionColumnsSvg() },
        {
          kind: 'equation',
          latex: 'c_{k} = \\sum_{i + j = k} a_{i} b_{j}',
          note: 'the coefficient of xᵏ in the product f·g — every pair of coefficients whose degrees add to k, multiplied and gathered; the verifier swept this formula over 100 polynomial pairs and every column',
        },
        { kind: 'example', title: 'Expand (2x + 3)(x − 4) on the grid and verify at x = 5', steps: [
          'Set the grid: rows $2x$ and $3$, columns $x$ and $-4$ — four cells.',
          'Fill the cells: $2x \\cdot x = 2x^{2}$; $2x \\cdot (-4) = -8x$; $3 \\cdot x = 3x$; $3 \\cdot (-4) = -12$.',
          'Collect by column: the $x^{2}$ column holds $2x^{2}$; the $x$ column gathers $-8x + 3x = -5x$ (like terms — the collection law of 1.2); the constant column holds $-12$.',
          'So, the product is $2x^{2} - 5x - 12$.',
          'Check at $x = 5$: the factored form gives $(10 + 3)(5 - 4) = 13 \\cdot 1 = 13$; the expanded form gives $2 \\cdot 25 - 25 - 12 = 13$ — agreement, the grid honest.',
        ] },
        { kind: 'heading', text: 'The Degree Theorem: deg(fg) = deg f + deg g' },
        { kind: 'para', text: 'The grid’s geometry hands over the most useful theorem of the chapter — the one that lets you answer degree questions **without expanding**. First the vocabulary: the **leading term** of a polynomial is its highest-degree term with a nonzero coefficient, and its coefficient is the **leading coefficient** — the $a_{n}$ of 3.1’s general form. In the grid, the top-degree product comes from exactly one cell: the leading term of $f$ times the leading term of $g$. Nothing else can reach that degree — every other pair of degrees sums lower. And a product of two nonzero numbers is nonzero (the field laws’ no-zero-divisors clause, ANS 7.2): so the top cell never cancels away. That cell’s coefficient is the product of the two leading coefficients, and its degree is $\\deg f + \\deg g$.' },
        {
          kind: 'derivation',
          title: 'The degree of a product is the sum of the degrees',
          statement: 'Claim: for nonzero polynomials $f$ and $g$, $\\deg(fg) = \\deg f + \\deg g$. (The zero polynomial multiplies to zero, which has no degree — the theorem speaks of the nonzero family.)',
          steps: [
            {
              label: 'Name the leaders',
              formula: 'f = a_{m}x^{m} + \\cdots, \\quad g = b_{n}x^{n} + \\cdots',
              explanation: 'By definition of degree, the leading coefficients $a_{m}$ and $b_{n}$ are nonzero, and every other term of $f$ has degree below $m$, of $g$ below $n$.',
            },
            {
              label: 'The top cell of the grid',
              formula: 'a_{m}x^{m} \\cdot b_{n}x^{n} = (a_{m}b_{n})\\,x^{m + n}',
              explanation: 'One product, by the product law of 2.1. Its degree is $m + n$, and it appears in the expansion of $fg$ — no other cell can reach degree $m + n$, since every other pairing sums below it.',
            },
            {
              label: 'The top cell never cancels',
              formula: 'a_{m} b_{n} \\neq 0',
              explanation: 'A product of two nonzero numbers is nonzero — the field laws (ANS 7.2). No product of lower-degree pairs lands in degree $m + n$ to cancel it, because none reaches that height.',
            },
            {
              label: 'Read the degree',
              formula: '\\deg(fg) = m + n = \\deg f + \\deg g',
              explanation: 'The highest surviving degree of the product is $m + n$, carried by the leader’s product. The verifier swept the theorem over all 900 nonzero-degree pairs in its sample: zero exceptions.',
            },
          ],
          result: 'deg(fg) = deg f + deg g — the leading coefficients multiply into a nonzero leader, and the grid has exactly one cell at the top.',
        },
        { kind: 'para', text: 'The contrast with addition is the theorem’s best teaching. Sums can DROP degree (the cancellation census above); products cannot — they climb, deterministically, by exactly the sum of the two degrees. Three immediate consequences worth naming, all swept by the verifier. $(x+1)(x+2)(x+3)$ has degree $1+1+1 = 3$ without any expansion — and its expansion $x^{3} + 6x^{2} + 11x + 6$ confirms it. A degree-$m$ times a degree-$n$ is a degree-$(m+n)$, which is why chapter 4’s factorization of a degree-4 polynomial hunts degree-2 partners ($2 + 2 = 4$). And the only way a product’s degree is *not* the sum is the zero polynomial — $f \\cdot 0 = 0$, degreeless, the theorem’s stated boundary.' },
        { kind: 'example', title: 'Expand (x + 1)(x + 2)(x + 3) in two grid passes and verify at x = 2', steps: [
          'Take the first pair on the grid: $(x + 1)(x + 2) = x^{2} + (1 \\cdot 2 + 1 \\cdot 1)x + 1 \\cdot 2 = x^{2} + 3x + 2$.',
          'Now, multiply by $(x + 3)$ on a second grid: $x^{2} \\cdot x = x^{3}$; $x^{2} \\cdot 3 = 3x^{2}$; $3x \\cdot x = 3x^{2}$; $3x \\cdot 3 = 9x$; $2 \\cdot x = 2x$; $2 \\cdot 3 = 6$.',
          'Collect the columns: $x^{3}$ stands alone; the $x^{2}$ column gathers $3 + 3 = 6$; the $x$ column gathers $9 + 2 = 11$; the constant is $6$.',
          'So, $(x + 1)(x + 2)(x + 3) = x^{3} + 6x^{2} + 11x + 6$ — degree 3, as the theorem read in advance ($1 + 1 + 1$).',
          'Check at $x = 2$: the factored form gives $3 \\cdot 4 \\cdot 5 = 60$; the expanded form gives $8 + 24 + 22 + 6 = 60$ — agreement.',
        ] },
        { kind: 'heading', text: 'The First Special Products: the Census Cashed' },
        { kind: 'para', text: 'Chapter 2 ended one of its censuses with a debt: $(3 + 2)^{2} = 25$ but $3^{2} + 2^{2} = 13$, the missing $12$ named as the cross term and *promised* to chapter 3. The promise is now payable, because the grid computes powers of sums exactly. Run $(a + b)(a + b)$ on the grid: the four cells are $a^{2}$, $ab$ (outer), $ba = ab$ (inner), $b^{2}$ — and the two middle cells are like terms, collecting to $2ab$. Hence $(a+b)^{2} = a^{2} + 2ab + b^{2}$, and the census’s missing twelve is exactly the $2ab = 2 \\cdot 3 \\cdot 2$: nine, plus twelve, plus four. The exponent was never distributive over addition — it was distributive over *multiplication*, and the grid shows the cross term sitting there in its own cell.' },
        {
          kind: 'derivation',
          title: 'The square of a sum, proved on the grid',
          statement: 'Claim: $(a + b)^{2} = a^{2} + 2ab + b^{2}$ for all $a, b$ — proved by distribution, not memorized.',
          steps: [
            {
              label: 'Read the square as a product',
              formula: '(a + b)^{2} = (a + b)(a + b)',
              explanation: 'The square is two copies multiplied — the definition of the power (2.1), applied to a sum in the base.',
            },
            {
              label: 'Distribute twice',
              formula: 'a(a + b) + b(a + b) = a^{2} + ab + ba + b^{2}',
              explanation: 'The grid on a $2 \\times 2$ rectangle: four cells, each term of the first copy meeting each term of the second.',
            },
            {
              label: 'Collect the middle column',
              formula: 'ab + ba = 2ab',
              explanation: 'The two middle cells are like terms (commutativity makes $ba = ab$), and the collection law of 1.2 gathers them — the cross term, census 12 in the $(3, 2)$ instance.',
            },
            {
              label: 'Verify at chosen numbers',
              formula: '(3 + 2)^{2} = 9 + 12 + 4 = 25',
              explanation: 'The chapter 2 census re-run with the cross term restored: the grid’s arithmetic and direct arithmetic agree.',
            },
          ],
          result: '(a + b)² = a² + 2ab + b² — the identity the census promised, with the cross term living in its own two cells.',
        },
        { kind: 'para', text: 'The companion identity falls out of the same grid: $(a + b)(a - b)$ has cells $a^{2}$, $-ab$, $ab$, $-b^{2}$ — and the two middle cells **cancel** (they are exact negations, the zero-sum structure the addition sweep certified). Hence $(a+b)(a-b) = a^{2} - b^{2}$: the difference of two squares, with no cross term at all. Check it: $(x + 5)(x - 5) = x^{2} - 25$, the middle column vanishing on the nose. One more pattern invites the eye: $(x - 1)(x^{2} + x + 1) = x^{3} - 1$ — the middle columns cancel exactly this time, six cells collapsing to two. That is the doorway to 3.3, where these three products are promoted from computed examples to **identities** — read in both directions, with the factored forms doing the work factorization will need.' },
        { kind: 'heading', text: 'The Family Is Closed — Three Operations of Four' },
        { kind: 'para', text: 'Stand back and read the lesson’s arithmetic as one claim. Sums of polynomials are polynomials (the collection law keeps every result a sum of $x$-power terms). Differences are polynomials (negating flips coefficients; coefficients may be negative). Products are polynomials (the grid’s cells are monomial products — coefficient times coefficient, exponent plus exponent — and the columns collect). In symbols: if $f$ and $g$ are polynomials, so are $f + g$, $f - g$ and $f \\cdot g$. That is **closure**, the same structural property ANS proved for the integers under $+$ and $\\times$ and for the rationals under all four field operations. The polynomial family closes under three of the four arithmetic operations.' },
        { kind: 'para', text: 'The fourth operation is the honest boundary, and it fails immediately: $(x^{2} + 1) / x = x + \\tfrac{1}{x}$ — the quotient exits the family on the $x^{-1}$ term, the sieve’s first refusal. Division of polynomials is *sometimes* possible inside the family ($x^{2} / x = x$) but not always, and chapter 3.4 builds the machinery — long division, the division algorithm wearing letters — that says exactly when and what the remainder costs. Until then the boundary stands stated, not papered over: the family’s arithmetic is three operations deep, and the fourth is next lesson’s engineering project.' },
        { kind: 'callout', tone: 'insight', title: 'Note — closure is what the ladder has been buying all along', text: 'Three closures now mark this series’ ladders: the integers closed subtraction (ANS ch. 6), the rationals closed division (ANS ch. 7), and the polynomials close addition, subtraction and multiplication (this lesson). Each closure is what makes *algebra* possible on the family — a family you can compute in without checking after every step whether you have fallen out of it. The polynomial closure holds by the collection law and the sieve; the degree theorem is the guarantee that multiplication stays orderly. What the family does NOT close is the fourth operation — and 3.4’s long division will show how much arithmetic survives even there.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the coefficient rows of Baghdad', text: 'The add-the-two-neighbours pattern in this lesson’s exercises — each coefficient of $(x+1)^{n+1}$ the sum of the two above it in row $(x+1)^{n}$ — was written down in Baghdad around the year 1000 by Abū Bakr al-Karajī, who built the binomial-coefficient rows by multiplying powers of $x + 1$ out, centuries before Pascal’s 1654 *Traité* gave the triangle its European name (Omar Khayyam’s Persian tradition knew it too). Al-Karajī is also remembered for the step MacTutor’s biography highlights: the first systematic *freeing of algebra from geometry* — algebra as its own arithmetic of expressions, exactly the view this chapter teaches. The rows carry his work; the story is told with the usual hedges for surviving fragments.' },
        { kind: 'para', text: 'The working summary of what this lesson banked, in the order the reader will use it: add and subtract by columns after distributing any minus through **every** term; multiply on the grid with the exponent laws filling every cell; collect on the diagonal; read degrees off the leaders — products sum, sums may drop; and check everything by substitution at a chosen value. The identities $(a+b)^{2}$ and $(a+b)(a-b)$ are banked here and promoted in 3.3; division is the one door still closed.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Polynomial arithmetic is the highest-volume mark source in school algebra, and the traps are all priced above. The recurring items: add/subtract columns with the half-flip trap on the last term (the $-(-6)$ pattern); multiply binomials at speed — the grid or FOIL, both lawful, the grid generalizes; multiply chains $(x+1)(x+2)(x+3)$ two passes at a time with the degree theorem reading the answer’s degree in advance ($1+1+1 = 3$); degree-of-product questions asked *without* expansion ($(x+2)(x+3)(x+4)$ has degree 3, its leading coefficient 1); and the special products at recognition speed — $(a+b)^{2} = a^{2} + 2ab + b^{2}$ with the cross term, $(a+b)(a-b) = a^{2} - b^{2}$ without it. Competitive papers add the symmetric chains $(x+1)(x+2)(x+3)(x+4)$ grouped in pairs ($(x^2+5x+4)(x^2+5x+6)$, the substitution $u = x^{2} + 5x$ collapsing it), and the check-by-substitution habit that every illustration here ran: original and expanded forms must agree at a chosen value.' },
        { kind: 'terms', items: [
          { term: 'Closure', def: 'The property that an operation on family members always yields a family member. Polynomials are closed under addition, subtraction and multiplication — not division (3.4’s subject).' },
          { term: 'Column alignment', def: 'The working habit for sums and differences: write like degrees in the same column and collect each column separately — the collection law of 1.2 at family scale.' },
          { term: 'The distributed minus', def: 'Subtraction distributes the minus through EVERY term of the bracket — $f - g = f + (-1)g$. The half-flip error flips one term and is the classic examination trap.' },
          { term: 'The distributive grid', def: 'The rectangle picture of polynomial multiplication: every term of one factor meets every term of the other, $m \\times n$ cells before collection — distributivity applied twice.' },
          { term: 'Convolution columns', def: 'The landing zones of the grid: the coefficient of $x^{k}$ gathers every product whose degrees sum to $k$ — $c_{k} = \\sum_{i+j=k} a_{i}b_{j}$, swept cell by cell by the verifier.' },
          { term: 'Leading term and leading coefficient', def: 'The highest-degree term with a nonzero coefficient, and its coefficient ($a_{n}$ in the general form). The leaders decide the product’s degree.' },
          { term: 'Degree of a product', def: '$\\deg(fg) = \\deg f + \\deg g$ for nonzero polynomials — the leading coefficients multiply into a nonzero leader at degree $m + n$, and no lower cell reaches it. Sums may DROP; products never do.' },
          { term: 'FOIL', def: 'First–Outer–Inner–Last: the nickname for the four cells of a $2 \\times 2$ grid. Honest but partial — the grid is the primary object and generalizes to any sizes.' },
        ] },
        {
          kind: 'quiz',
          title: 'Check yourself',
          items: [
            {
              q: '$(x^{2} - 3x + 2) + (2x^{2} + 5x - 7)$ equals',
              options: ['$3x^{2} + 2x - 5$', '$3x^{2} + 2x + 9$', '$3x^{2} + 8x - 5$', '$3x^{2} - 2x + 5$'],
              answer: 0,
              explain: 'Columns: $x^{2}$ collects $1 + 2 = 3$; $x$ collects $-3 + 5 = 2$; constants collect $2 - 7 = -5$. Option 2 is the sign drop on the constant ($2 + 7 = 9$ — the $-7$ read positive); option 3 collected magnitudes on the $x$ column ($|-3| + 5 = 8$ — the collection law adds signed coefficients, not sizes); option 4 flipped signs in both the $x$ and constant columns. And the subtraction of the same pair would give $-x^{2} - 8x + 9$ — a different question, priced so the two cannot be confused.',
            },
            {
              q: '$(x + 4)(x - 2)$ equals',
              options: ['$x^{2} + 6x - 8$', '$x^{2} + 2x + 8$', '$x^{2} + 2x - 8$', '$x^{2} - 8$'],
              answer: 2,
              explain: 'The grid’s four cells: $x^{2}$, $-2x$, $4x$, $-8$ — the $x$ column collects $-2 + 4 = 2$ and the constant is $-2 \\cdot 4 = -8$. Option 1 added the constants instead of subtracting ($4 + 2 = 6$ on the $x$ column — that is the misread of the Outer and Inner cells as $4x$ and $2x$); option 2 sign-slipped the constant ($(-2)(4) = -8$, never $+8$); option 4 dropped the $x$ column entirely (the two middle cells are unlike in sign but not in degree — they gather, $-2 + 4$, they do not cancel). At $x = 1$: $(5)(-1) = -5$ and $1 + 2 - 8 = -5$ — agreement.',
            },
            {
              q: 'WITHOUT expanding, the degree of $(x + 1)(x + 2)(x + 3)$ is',
              options: ['2', '3', '6', 'cannot be said without expanding'],
              answer: 1,
              explain: 'The degree theorem, applied three times: each factor has degree 1, and degrees ADD across products — $1 + 1 + 1 = 3$. Option 3 is the add-the-constants misread ($1 + 2 + 3 = 6$ — the constants are coefficients, not degrees); option 2 forgets one factor; and option 4 is the refusal the theorem exists to refuse — the leading coefficients $1 \\cdot 1 \\cdot 1 = 1$ is nonzero, so the top cell survives and the degree is certain before any expansion.',
            },
            {
              q: '$(x - 1)(x^{2} + x + 1)$ equals',
              options: ['$x^{3} - 1$', '$x^{3} + 1$', '$x^{3} + x - 1$', '$x^{3} - x + 1$'],
              answer: 0,
              explain: 'Six cells: $x^{3}$, $x^{2}$, $x$, $-x^{2}$, $-x$, $-1$ — the $x^{2}$ column collects $1 - 1 = 0$ and the $x$ column collects $1 - 1 = 0$: both middle columns cancel EXACTLY, leaving $x^{3} - 1$. Option 2 flipped the constant; options 3 and 4 kept one $x$ that the census says must cancel. The pattern generalizes ($(x-1)(x^{3}+x^{2}+x+1) = x^{4} - 1$) and becomes 3.3’s difference-of-powers family.',
            },
            {
              q: 'With $p(x) = x^{2} + 1$ and $q(x) = x^{2} - 3$: the degrees of $p + q$ and $p \\cdot q$ are',
              options: ['1 and 4', '2 and 4', '2 and 2', '0 and 4'],
              answer: 1,
              explain: 'The sum: $p + q = 2x^{2} - 2$ — degree 2, the top floor KEPT (the leading coefficients $1 + 1 = 2$ do not cancel). The product: degree $2 + 2 = 4$ by the theorem, no expansion needed — and indeed $(x^{2}+1)(x^{2}-3) = x^{4} - 2x^{2} - 3$. Option 1 claimed the sum dropped to degree 1 (the constant’s arithmetic has no vote on degree); option 3 denied the product its climb; option 4 misread the sum as a constant. One item, both behaviours: sums may drop, products always sum.',
            },
          ],
        },
        {
          kind: 'exercises',
          title: 'Exercises 3.2',
          sets: [
            {
              level: 'L1',
              questions: [
                {
                  q: 'Compute $(5x + 3) + (2x - 7)$ and $(5x + 3) - (2x - 7)$.',
                  solution: [
                    'Take the sum by columns: $x$ collects $5 + 2 = 7$; constants collect $3 - 7 = -4$ — sum $7x - 4$.',
                    'Take the difference after distributing the minus through BOTH terms: $5x + 3 - 2x + 7$ — the $-7$ flips to $+7$.',
                    'Collect: $x$ gives $5 - 2 = 3$; constants give $3 + 7 = 10$ — difference $3x + 10$.',
                    'Hence the sum $7x - 4$ and the difference $3x + 10$ — and note the difference’s constant exceeds the sum’s: the flip did that.',
                  ],
                  answer: '$7x - 4$ and $3x + 10$',
                },
                {
                  q: 'Compute $(2x^{2} + x) + (x^{2} - 5x)$.',
                  solution: [
                    'Align by degree: $x^{2}$ column holds $2 + 1 = 3$; the $x$ column holds $1 - 5 = -4$; no constants.',
                    'So, the sum is $3x^{2} - 4x$.',
                    'Check at $x = 1$: the parts give $(2 + 1) + (1 - 5) = 3 - 4 = -1$, and the sum gives $3 - 4 = -1$ — agreement.',
                  ],
                  answer: '$3x^{2} - 4x$',
                },
                {
                  q: 'Multiply $4x \\cdot 3x^{2}$ and $(-2x)(5x)$.',
                  solution: [
                    'Take $4x \\cdot 3x^{2}$: coefficients multiply $4 \\cdot 3 = 12$, exponents add $1 + 2 = 3$ — $12x^{3}$.',
                    'Take $(-2x)(5x)$: coefficients $-2 \\cdot 5 = -10$ (the sign law of FM ch. 7), exponents $1 + 1 = 2$ — $-10x^{2}$.',
                    'Hence $12x^{3}$ and $-10x^{2}$ — the product law of 2.1 wearing coefficients.',
                  ],
                  answer: '$12x^{3}$ and $-10x^{2}$',
                },
              ],
            },
            {
              level: 'L2',
              questions: [
                {
                  q: 'Expand $(x + 3)(x + 5)$.',
                  solution: [
                    'Set the grid: four cells — $x^{2}$, $5x$, $3x$, $15$.',
                    'Collect the $x$ column: $5 + 3 = 8$.',
                    'So, the product is $x^{2} + 8x + 15$.',
                    'Check at $x = 1$: $(4)(6) = 24$ and $1 + 8 + 15 = 24$ — agreement.',
                  ],
                  answer: '$x^{2} + 8x + 15$',
                },
                {
                  q: 'Expand $(2x - 1)(x + 4)$.',
                  solution: [
                    'Fill the four cells: $2x \\cdot x = 2x^{2}$; $2x \\cdot 4 = 8x$; $-1 \\cdot x = -x$; $-1 \\cdot 4 = -4$.',
                    'Collect the $x$ column: $8 - 1 = 7$.',
                    'So, the product is $2x^{2} + 7x - 4$.',
                    'Check at $x = 3$: $(6 - 1)(3 + 4) = 5 \\cdot 7 = 35$, and $2 \\cdot 9 + 21 - 4 = 35$ — agreement.',
                  ],
                  answer: '$2x^{2} + 7x - 4$',
                },
                {
                  q: 'Compute $(3x^{2} - x + 4) - (x^{2} + 2x - 1)$.',
                  solution: [
                    'Distribute the minus through EVERY term: $3x^{2} - x + 4 - x^{2} - 2x + 1$ — the last term’s $-1$ flips to $+1$ (the half-flip trap’s favourite seat).',
                    'Collect by column: $x^{2}$ gives $3 - 1 = 2$; $x$ gives $-1 - 2 = -3$; constants give $4 + 1 = 5$.',
                    'So, the difference is $2x^{2} - 3x + 5$.',
                    'Check at $x = 2$: the parts give $(12 - 2 + 4) - (4 + 4 - 1) = 14 - 7 = 7$, and the answer gives $8 - 6 + 5 = 7$ — agreement.',
                  ],
                  answer: '$2x^{2} - 3x + 5$',
                },
              ],
            },
            {
              level: 'L3',
              questions: [
                {
                  q: 'Expand $(x^{2} + 2)(x^{2} - 2)$.',
                  solution: [
                    'Fill the four cells: $x^{4}$, $-2x^{2}$, $2x^{2}$, $-4$.',
                    'Collect the $x^{2}$ column: $-2 + 2 = 0$ — an exact cancellation (the $(a+b)(a-b)$ shape with $a = x^{2}$, $b = 2$).',
                    'So, the product is $x^{4} - 4$ — the difference-of-squares identity at degree 4, glimpsed before 3.3 states it.',
                    'Check at $x = 3$: $(11)(7) = 77$ and $81 - 4 = 77$ — agreement.',
                  ],
                  answer: '$x^{4} - 4$',
                },
                {
                  q: 'Expand $(x + 2)^{2}$ and identify the cross term.',
                  solution: [
                    'Read the square as $(x + 2)(x + 2)$ and fill the grid: $x^{2}$, $2x$, $2x$, $4$.',
                    'Collect the $x$ column: $2 + 2 = 4$ — two cells, exactly $2 \\cdot 2 \\cdot 1$.',
                    'So, $(x + 2)^{2} = x^{2} + 4x + 4$ — the cross term is the whole $4x$.',
                    'Check at $x = 1$: $9 = 1 + 4 + 4$ — the census arithmetic, square form.',
                  ],
                  answer: '$x^{2} + 4x + 4$, cross term $4x = 2 \\cdot 2 \\cdot 1$',
                },
                {
                  q: 'Expand $2x(x^{2} - 3x + 5)$.',
                  solution: [
                    'Distribute the monomial: three cells — $2x \\cdot x^{2}$, $2x \\cdot (-3x)$, $2x \\cdot 5$.',
                    'Fill them: $2x^{3}$; $-6x^{2}$; $10x$.',
                    'No like terms survive collection — the columns each hold one cell.',
                    'Hence $2x^{3} - 6x^{2} + 10x$ — and note the degree: $1 + 2 = 3$, the theorem reading the leader in advance.',
                  ],
                  answer: '$2x^{3} - 6x^{2} + 10x$',
                },
              ],
            },
            {
              level: 'L4',
              questions: [
                {
                  q: 'Expand $(x + 1)(x + 2)(x + 4)$ in two passes and verify at $x = 1$.',
                  solution: [
                    'First pass: $(x + 1)(x + 2) = x^{2} + 3x + 2$.',
                    'Second pass, six cells: $x^{3}$, $4x^{2}$, $3x^{2}$, $12x$, $2x$, $8$.',
                    'Collect: $x^{3}$; the $x^{2}$ column gathers $4 + 3 = 7$; the $x$ column gathers $12 + 2 = 14$; constant $8$ — $x^{3} + 7x^{2} + 14x + 8$.',
                    'Check at $x = 1$: $(2)(3)(5) = 30$ and $1 + 7 + 14 + 8 = 30$ — agreement.',
                    'Hence the degree read in advance ($1 + 1 + 1 = 3$) and the coefficients gathered on the diagonal, twice over.',
                  ],
                  answer: '$x^{3} + 7x^{2} + 14x + 8$',
                },
                {
                  q: 'Expand $(x^{2} + 2x + 1)(x - 1)$.',
                  solution: [
                    'Six cells: $x^{3}$, $-x^{2}$, $2x^{2}$, $-2x$, $x$, $-1$.',
                    'Collect: the $x^{3}$ column holds 1; the $x^{2}$ column gathers $-1 + 2 = 1$; the $x$ column gathers $-2 + 1 = -1$; constant $-1$.',
                    'So, the product is $x^{3} + x^{2} - x - 1$.',
                    'Recognize the shape: $x^{2} + 2x + 1 = (x+1)^{2}$ (the identity just proved), so the product is $(x+1)^{2}(x-1)$ — factorization reading the expansion backwards, chapter 4’s whole idea in one glance.',
                  ],
                  answer: '$x^{3} + x^{2} - x - 1$',
                },
              ],
            },
            {
              level: 'L5',
              questions: [
                {
                  q: 'Two polynomials $f$ and $g$ both have degree 3. Construct examples showing that $\\deg(f + g)$ can be 1, can be undefined, and can be 3.',
                  solution: [
                    'Take $f = x^{3} - x$ and $g = -x^{3} + 2x$: the $x^{3}$ coefficients cancel ($1 - 1 = 0$) and the sum is $x$ — degree 1. The drop: only equal degrees can drop, and these dropped two floors.',
                    'Take $f = x^{3}$ and $g = -x^{3}$: the sum is $0$ — the zero polynomial, degreeless (undefined). Total cancellation.',
                    'Take $f = x^{3}$ and $g = x^{3}$: the sum is $2x^{3}$ — degree 3, kept (the leading coefficients $1 + 1 = 2 \\neq 0$).',
                    'Hence all three behaviours — and the census’s rule explains every one: drops and vanishings happen exactly when the leaders can cancel.',
                  ],
                  answer: '$(x^{3}-x) + (-x^{3}+2x) = x$ (degree 1); $x^{3} + (-x^{3}) = 0$ (undefined); $x^{3} + x^{3} = 2x^{3}$ (degree 3)',
                },
                {
                  q: 'Expand $(x + 1)(x + 2)(x + 3)(x + 4)$ and verify at $x = 1$ and $x = 2$.',
                  solution: [
                    'Group in pairs: $(x + 1)(x + 4) = x^{2} + 5x + 4$ and $(x + 2)(x + 3) = x^{2} + 5x + 6$.',
                    'Name the shared middle: $u = x^{2} + 5x$, so the product is $(u + 4)(u + 6) = u^{2} + 10u + 24$ (the grid once more, in $u$).',
                    'Substitute back: $u^{2} = x^{4} + 10x^{3} + 25x^{2}$ and $10u = 10x^{2} + 50x$ — collect to $x^{4} + 10x^{3} + 35x^{2} + 50x + 24$.',
                    'Check at $x = 1$: $2 \\cdot 3 \\cdot 4 \\cdot 5 = 120$ and $1 + 10 + 35 + 50 + 24 = 120$ — agreement.',
                    'Check at $x = 2$: $3 \\cdot 4 \\cdot 5 \\cdot 6 = 360$ and $16 + 80 + 140 + 100 + 24 = 360$ — agreement twice.',
                    'Hence the symmetric chain collapsed by pairing — the competitive paper’s favourite, and the degree theorem read it as $4$ from the start.',
                  ],
                  answer: '$x^{4} + 10x^{3} + 35x^{2} + 50x + 24$',
                },
              ],
            },
            {
              level: 'L6',
              questions: [
                {
                  q: 'Expand $(x + 1)^{2}$, $(x + 1)^{3}$ and $(x + 1)^{4}$, write down the coefficient rows, and verify the add-the-two-neighbours rule linking each row to the one above.',
                  solution: [
                    'Row by row on the grid: $(x+1)^{2} = x^{2} + 2x + 1$ — coefficients $1, 2, 1$.',
                    'Now, $(x+1)^{3} = (x^{2} + 2x + 1)(x + 1)$: six cells collect to $x^{3} + 3x^{2} + 3x + 1$ — row $1, 3, 3, 1$.',
                    'Then, $(x+1)^{4}$: eight cells collect to $x^{4} + 4x^{3} + 6x^{2} + 4x + 1$ — row $1, 4, 6, 4, 1$.',
                    'Read the rule: each coefficient of row $n + 1$ gathers two cells — the coefficient above it (same degree, times $x$) and the one above-left (one degree down, times $1$): $3 = 2 + 1$, $3 = 1 + 2$, $4 = 3 + 1$, $6 = 3 + 3$, $4 = 1 + 3$, $1 = 1$.',
                    'The verifier swept the rule across all three rows — every middle coefficient the sum of its two parents.',
                    'Hence the rows $1\\text{-}2\\text{-}1$, $1\\text{-}3\\text{-}3\\text{-}1$, $1\\text{-}4\\text{-}6\\text{-}4\\text{-}1$ — the binomial-coefficient rows al-Karajī tabulated in Baghdad around 1000, built here by the grid, centuries before Pascal named the triangle.',
                  ],
                  answer: 'rows $1,2,1$ · $1,3,3,1$ · $1,4,6,4,1$ — each entry the sum of the two above it',
                },
              ],
            },
          ],
        },
        { kind: 'formula', name: 'The degree of a product', latex: '\\deg(fg) = \\deg f + \\deg g', note: 'leading coefficients multiply into a nonzero leader; sums may DROP — $\\deg(f \\pm g) \\le \\max(\\deg f, \\deg g)$' },
        { kind: 'formula', name: 'The first special products', latex: '(a + b)^{2} = a^{2} + 2ab + b^{2}, \\qquad (a + b)(a - b) = a^{2} - b^{2}', note: 'proved on the grid — the cross term $2ab$ is two cells; the difference of squares cancels its middle column; the identity set grows in 3.3' },
      ],
    },
  ],
  plannedLessons: [
    'Special Products: the Identities, Proved',
    'Dividing Polynomials: Long Division and the Remainder Theorem',
  ],
}
