import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 3: Polynomials
 *
 * LESSONS WRITTEN: 3.1 What a Polynomial Is: Terms, Degree and Family
 *                  (run 71 — quiz keys 1/0/1/1/0, 14 exercises, two
 *                  figures, verify-book3-ch03.ts sections A–G + H green)
 *                  3.2 Adding, Subtracting and Multiplying Polynomials
 *                  (run 71 — quiz keys 0/2/1/0/1, section I)
 *                  3.3 Special Products: the Identities, Proved
 *                  (run 72 — quiz keys 1/2/0/1/1, sections J + K)
 *                  3.4 Dividing Polynomials: Long Division and the
 *                  Remainder Theorem (run 72 — quiz keys 0/1/2/0/1,
 *                  sections L + M) — chapter COMPLETE 4/4 at run 72
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the anatomy of a term, and the family album</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">every polynomial is a sum of terms — each term is a number carrying a power</text>')
  // LEFT panel: anatomy of −7x⁴
  parts.push('<rect x="30" y="90" width="320" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="190" y="112" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">anatomy: −7x⁴</text>')
  const anatomyRows: [string, string][] = [
    ['coefficient: −7', 'the number of copies — never counted toward degree'],
    ['base letter: x', 'the variable, the only seat exponents may sit on'],
    ['degree: 4', 'the exponent on the letter — a nonnegative integer'],
  ]
  anatomyRows.forEach(([title, sub], i) => {
    const y = 124 + i * 62
    parts.push(`<rect x="44" y="${y}" width="270" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${44 + 135}" y="${y + 18}" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${44 + 135}" y="${y + 34}" font-size="10.5" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  // RIGHT panel: the family gallery
  parts.push('<rect x="390" y="90" width="300" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="540" y="112" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the family album</text>')
  const gallery: [string, string][] = [
    ['5x² — monomial', 'one term · degree 2'],
    ['x + 3 — binomial', 'two terms · degree 1'],
    ['x² + 2x + 1 — trinomial', 'three terms · degree 2'],
    ['8 — constant', 'one term · degree 0'],
    ['0 — the zero polynomial', 'degreeless in this course'],
  ]
  gallery.forEach(([name, tag], i) => {
    const y = 130 + i * 32
    parts.push(`<rect x="400" y="${y}" width="280" height="28" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${400 + 140}" y="${y + 18}" font-size="11.5" fill="#166534" text-anchor="middle">${name} · ${tag}</text>`)
  })
  // footer
  parts.push('<text x="360" y="336" font-size="11.5" fill="#0d9488" text-anchor="middle">names by shape (term count) and by degree — the two questions every polynomial answers</text>')
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the polynomial sieve</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">one question only: does every letter part carry a nonnegative integer exponent?</text>')
  const rows: [string, string, string][] = [
    ['x³ − 2x + 1', 'PASS', 'exponents 3, 1, 0 — all nonnegative integers'],
    ['8', 'PASS', 'the constant 8 = 8x⁰ — exponent 0 is legal (2.2)'],
    ['1/x', 'FAIL', '1/x = x⁻¹ — exponent −1 is not a nonnegative integer'],
    ['√x', 'FAIL', '√x = x^½ — exponent ½ is not an integer'],
    ['2^x', 'FAIL', 'the variable sits in the EXPONENT — a different family'],
  ]
  rows.forEach(([expr, verdict, reason], i) => {
    const y = 96 + i * 42
    parts.push(`<rect x="40" y="${y}" width="300" height="34" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${40 + 150}" y="${y + 22}" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">${expr}</text>`)
    const pill = verdict === 'PASS' ? 'PASS' : 'FAIL'
    const ink = verdict === 'PASS' ? '#16a34a' : '#dc2626'
    parts.push(`<rect x="360" y="${y}" width="84" height="34" rx="17" fill="none" stroke="${ink}" stroke-width="1.5"/>`)
    parts.push(`<text x="402" y="${y + 22}" font-size="12.5" fill="${ink}" text-anchor="middle" font-weight="700">${pill}</text>`)
    parts.push(`<text x="462" y="${y + 22}" font-size="11" fill="#0d9488" text-anchor="start">${reason}</text>`)
  })
  parts.push('<text x="360" y="316" font-size="11.5" fill="#0d9488" text-anchor="middle">the boundary lives in the exponent of the letter part — never in the coefficient</text>')
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the distributive grid: (2x + 3)(x − 4)</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">every term of the first meets every term of the second — four cells, then collect</text>')
  // LEFT panel: the 2×2 grid
  parts.push('<rect x="30" y="84" width="350" height="170" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="205" y="106" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">the four cells</text>')
  parts.push('<text x="125" y="126" font-size="12" fill="#65a30d" text-anchor="middle">× | x        −4   (columns of x − 4)</text>')
  const cells: [number, number, string, string][] = [
    [60, 130, '2x²', '2x · x'],
    [200, 130, '−8x', '2x · (−4)'],
    [60, 192, '3x', '3 · x'],
    [200, 192, '−12', '3 · (−4)'],
  ]
  for (const [cx, cy, big, small] of cells) {
    parts.push(`<rect x="${cx}" y="${cy}" width="130" height="54" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${cx + 65}" y="${cy + 24}" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">${big}</text>`)
    parts.push(`<text x="${cx + 65}" y="${cy + 42}" font-size="10.5" fill="#0d9488" text-anchor="middle">${small}</text>`)
  }
  // RIGHT panel: why the grid is lawful
  parts.push('<rect x="410" y="84" width="280" height="170" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="550" y="106" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">why every cell is legal</text>')
  const notes: [string, string][] = [
    ['distributivity twice', 'a(b + c) = ab + ac, applied twice — AL 1.1’s field law'],
    ['the exponent laws run it', '2x · x = 2x² — coefficients multiply, exponents add (2.1)'],
  ]
  notes.forEach(([title, sub], i) => {
    const y = 110 + i * 70
    parts.push(`<rect x="425" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="550" y="${y + 22}" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="550" y="${y + 40}" font-size="9.5" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="272" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  const collected: [number, string][] = [
    [44, 'x²:  2x²'],
    [260, 'x:  −8x + 3x = −5x'],
    [476, '1:  −12'],
  ]
  for (const [cx, label] of collected) {
    parts.push(`<rect x="${cx}" y="280" width="200" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${cx + 100}" y="296" font-size="11.5" fill="#166534" text-anchor="middle">${label}</text>`)
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the convolution columns: (x + 2)(x + 3)</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">four products, three landing zones — each product falls into the column of its degree</text>')
  const prods: [number, number, string, string][] = [
    [60, 90, 'x · x = x²', 'degree 2'],
    [270, 90, 'x · 3 = 3x', 'degree 1'],
    [60, 150, '2 · x = 2x', 'degree 1'],
    [270, 150, '2 · 3 = 6', 'degree 0'],
  ]
  for (const [px, py, big, small] of prods) {
    parts.push(`<rect x="${px}" y="${py}" width="180" height="50" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${px + 90}" y="${py + 22}" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">${big}</text>`)
    parts.push(`<text x="${px + 90}" y="${py + 40}" font-size="10.5" fill="#0d9488" text-anchor="middle">${small}</text>`)
  }
  const cols: [number, string, string][] = [
    [60, 'x² column', 'gathers 1 · 1 = 1'],
    [270, 'x column', 'gathers 3 + 2 = 5'],
    [480, '1 column', 'gathers 2 · 3 = 6'],
  ]
  for (const [cx, title, sub] of cols) {
    parts.push(`<rect x="${cx}" y="220" width="180" height="90" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${cx + 90}" y="252" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${cx + 90}" y="274" font-size="11" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  }
  parts.push('<text x="360" y="336" font-size="11.5" fill="#0d9488" text-anchor="middle">the diagonal is the collection: products of equal degree-sum share a column — x² + 5x + 6</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 5 (3.3): the corner-cut square — (a−b)² drawn. Header        */
/* (30,18,660,44); LEFT panel (30,84,340,220); big a-square            */
/* (70,96,200,200); vertical b-strip (245,96,25,200); horizontal       */
/* b-strip (70,271,200,25); corner overlap (245,271,25,25); RIGHT      */
/* panel (400,84,290,220) with 3 note boxes 260x56 at (415,108),       */
/* (415,170),(415,240); footer text y=336. Geometry pinned in J-7,     */
/* audited in K.                                                       */
/* ------------------------------------------------------------------ */

function cornerCutSquareSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The square of a difference drawn: a square of side a cut by a vertical strip and a horizontal strip of width b, leaving the inner square of side a minus b, so a minus b squared equals a squared minus two a b plus b squared.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the corner-cut square: (a − b)²</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the a×a square, cut by two b-strips — the corner counted twice, added back</text>')
  // LEFT panel: the square with its strips
  parts.push('<rect x="30" y="84" width="340" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="155" y="108" font-size="12" fill="#65a30d" text-anchor="middle">a</text>')
  parts.push('<text x="257" y="108" font-size="12" fill="#dc2626" text-anchor="middle">b</text>')
  parts.push('<text x="58" y="200" font-size="12" fill="#65a30d" text-anchor="middle">a</text>')
  parts.push('<text x="58" y="288" font-size="12" fill="#dc2626" text-anchor="middle">b</text>')
  parts.push('<rect x="70" y="96" width="200" height="200" rx="2" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="245" y="96" width="25" height="200" rx="2" fill="none" stroke="#dc2626" stroke-width="1.2"/>')
  parts.push('<rect x="70" y="271" width="200" height="25" rx="2" fill="none" stroke="#dc2626" stroke-width="1.2"/>')
  parts.push('<rect x="245" y="271" width="25" height="25" rx="2" fill="none" stroke="#dc2626" stroke-width="1.5"/>')
  parts.push('<path d="M 70 96 L 245 96 L 245 271 L 70 271 Z" fill="none" stroke="#65a30d" stroke-width="1.2" stroke-dasharray="5 4"/>')
  parts.push('<text x="155" y="178" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">(a − b)²</text>')
  parts.push('<text x="155" y="196" font-size="10.5" fill="#0d9488" text-anchor="middle">the inner square, side a − b</text>')
  parts.push('<text x="257" y="152" font-size="11" fill="#dc2626" text-anchor="middle">ab</text>')
  parts.push('<text x="170" y="288" font-size="11" fill="#dc2626" text-anchor="middle">ab</text>')
  parts.push('<text x="257" y="288" font-size="11" fill="#dc2626" text-anchor="middle">b²</text>')
  // RIGHT panel: the subtraction-with-a-debt readout
  parts.push('<rect x="400" y="84" width="290" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="545" y="100" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">reading the areas</text>')
  const notes: [string, string][] = [
    ['take away the two strips', 'a² − ab − ab = a² − 2ab — but the corner b² left with both'],
    ['give the corner back', 'a² − 2ab + b² — the overlap was subtracted twice, added once'],
    ['check it at a = 7, b = 3', '(7−3)² = 16 and 49 − 42 + 9 = 16 — agreement'],
  ]
  notes.forEach(([title, sub], i) => {
    const y = 108 + i * 66
    parts.push(`<rect x="415" y="${y}" width="260" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="545" y="${y + 22}" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="545" y="${y + 40}" font-size="9.5" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  parts.push('<text x="360" y="336" font-size="11.5" fill="#0d9488" text-anchor="middle">the dashed inner square is the answer: (a − b)² = a² − 2ab + b² — the middle term arrives NEGATIVE</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 6 (3.3): the cube identities on the grid. Header             */
/* (30,18,660,44); LEFT panel (30,84,330,180) with 6 cell boxes 90x44  */
/* at x=60/160/260, y=110/170; RIGHT panel (360,84,330,180) with 6     */
/* cells at x=390/490/590, y=110/170; collection band (30,284,660,44)  */
/* with 2 result boxes 260x28 at (60,292),(400,292); footer y=346.     */
/* Geometry pinned in J-7, audited in K.                               */
/* ------------------------------------------------------------------ */

function cubeGridsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The cube identities on the grid: a plus b times a squared minus a b plus b squared gives six cells whose middle four cancel, leaving a cubed plus b cubed; and a minus b times a squared plus a b plus b squared likewise leaves a cubed minus b cubed.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the cube identities, six cells each</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the 3.2 teaser at family scale — four middle cells cancel, two survive</text>')
  // LEFT panel: (a+b)(a² − ab + b²)
  parts.push('<rect x="30" y="84" width="330" height="180" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="195" y="104" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">(a + b)(a² − ab + b²)</text>')
  const leftCells: [number, number, string][] = [
    [60, 110, 'a³'],
    [160, 110, '−a²b'],
    [260, 110, 'ab²'],
    [60, 170, 'a²b'],
    [160, 170, '−ab²'],
    [260, 170, 'b³'],
  ]
  for (const [cx, cy, label] of leftCells) {
    parts.push(`<rect x="${cx}" y="${cy}" width="90" height="44" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${cx + 45}" y="${cy + 27}" font-size="12" fill="#166534" text-anchor="middle">${label}</text>`)
  }
  // RIGHT panel: (a−b)(a² + ab + b²)
  parts.push('<rect x="360" y="84" width="330" height="180" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="525" y="104" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">(a − b)(a² + ab + b²)</text>')
  const rightCells: [number, number, string][] = [
    [390, 110, 'a³'],
    [490, 110, 'a²b'],
    [590, 110, 'ab²'],
    [390, 170, '−a²b'],
    [490, 170, '−ab²'],
    [590, 170, '−b³'],
  ]
  for (const [cx, cy, label] of rightCells) {
    parts.push(`<rect x="${cx}" y="${cy}" width="90" height="44" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${cx + 45}" y="${cy + 27}" font-size="12" fill="#166534" text-anchor="middle">${label}</text>`)
  }
  // collection band
  parts.push('<rect x="30" y="284" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="292" width="260" height="28" rx="5" fill="none" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<text x="190" y="311" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">middle four cancel → a³ + b³</text>')
  parts.push('<rect x="400" y="292" width="260" height="28" rx="5" fill="none" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<text x="530" y="311" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">middle four cancel → a³ − b³</text>')
  parts.push('<text x="360" y="346" font-size="11.5" fill="#0d9488" text-anchor="middle">the same cancellation the (x − 1)(x² + x + 1) = x³ − 1 teaser showed — now with letters, at every value</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 7 (3.4): the long-division tableau. Header (30,18,660,44);   */
/* LEFT panel (30,84,410,220) carrying the tableau as text lines +     */
/* thin rules (no inner rects); RIGHT panel (470,84,220,220) with 4    */
/* step boxes 190x44 at (485,100)/(485,152)/(485,204)/(485,256);       */
/* footer text y=336. Geometry pinned in L-7, audited in M.            */
/* ------------------------------------------------------------------ */

function divisionTableauSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The long-division tableau of x squared plus eleven x plus thirty divided by x plus six: divide the leaders, multiply the whole divisor, subtract, bring down, repeat — quotient x plus five, remainder zero.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the long-division tableau: (x² + 11x + 30) ÷ (x + 6)</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">divide the leaders · multiply the whole divisor · subtract · bring down · repeat</text>')
  // LEFT panel: the tableau, drawn as text lines + thin rules
  parts.push('<rect x="30" y="84" width="410" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="252" y="112" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">the work, arranged in descending powers</text>')
  parts.push('<text x="52" y="146" font-size="13.5" fill="#166534">x + 6 ) x² + 11x + 30 ( x + 5</text>')
  parts.push('<text x="52" y="176" font-size="13.5" fill="#166534">x² +  6x</text>')
  parts.push('<line x1="50" y1="184" x2="230" y2="184" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="52" y="206" font-size="13.5" fill="#166534">5x + 30</text>')
  parts.push('<text x="52" y="236" font-size="13.5" fill="#166534">5x + 30</text>')
  parts.push('<line x1="50" y1="244" x2="230" y2="244" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="52" y="270" font-size="13.5" fill="#dc2626" font-weight="700">0   ← the remainder: the division is EXACT</text>')
  parts.push('<text x="52" y="292" font-size="10.5" fill="#0d9488">check: (x + 6)(x + 5) = x² + 11x + 30 — agreement</text>')
  // RIGHT panel: the four moves
  parts.push('<rect x="470" y="84" width="220" height="220" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="580" y="90" font-size="12" fill="#166534" text-anchor="middle"> </text>')
  const steps: [string, string][] = [
    ['1 · divide the leaders', 'x² ÷ x = x — the first quotient term'],
    ['2 · multiply the WHOLE divisor', 'x(x + 6) = x² + 6x, written under'],
    ['3 · subtract', '11x − 6x = 5x — the leader dies'],
    ['4 · bring down, repeat', '30 comes down; 5x ÷ x = 5; stop at 0'],
  ]
  steps.forEach(([title, sub], i) => {
    const y = 100 + i * 52
    parts.push(`<rect x="485" y="${y}" width="190" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="580" y="${y + 18}" font-size="11" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="580" y="${y + 34}" font-size="9" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  parts.push('<text x="360" y="336" font-size="11.5" fill="#0d9488" text-anchor="middle">the quotient rides on the bracket at ( x + 5 — the same shelf the arithmetic long division of FM ch. 2 used</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 8 (3.4): the remainder theorem map. Header (30,18,660,44);   */
/* 4 boxes (40,110,170,56) f(x), (260,110,170,56) the divisor gate,    */
/* (480,88,180,50) quotient, (480,178,180,50) remainder; verdict band  */
/* (30,272,660,40) with 2 band boxes 180x24 at (60,280),(300,280);     */
/* footer text y=340. Geometry pinned in L-7, audited in M.            */
/* ------------------------------------------------------------------ */

function remainderMapSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The remainder theorem map: dividing f of x by x minus a gives a quotient and a constant remainder; substituting x equals a kills the product term, so the remainder is f of a — evaluate, never divide.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the remainder theorem: r = f(a)</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the division identity, evaluated at the one value that kills the product term</text>')
  // the four stations
  parts.push('<rect x="40" y="110" width="170" height="56" rx="8" fill="none" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<text x="125" y="132" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">f(x)</text>')
  parts.push('<text x="125" y="152" font-size="9.5" fill="#0d9488" text-anchor="middle">the dividend — any polynomial</text>')
  parts.push('<rect x="260" y="110" width="170" height="56" rx="8" fill="none" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<text x="345" y="132" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">÷ (x − a)</text>')
  parts.push('<text x="345" y="152" font-size="9.5" fill="#0d9488" text-anchor="middle">the divisor gate — linear, monic</text>')
  parts.push('<rect x="480" y="88" width="180" height="50" rx="8" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="570" y="110" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">q(x) — the quotient</text>')
  parts.push('<text x="570" y="128" font-size="9.5" fill="#0d9488" text-anchor="middle">degree deg f − 1</text>')
  parts.push('<rect x="480" y="178" width="180" height="50" rx="8" fill="none" stroke="#dc2626" stroke-width="1.2"/>')
  parts.push('<text x="570" y="200" font-size="12.5" fill="#dc2626" text-anchor="middle" font-weight="700">r — the remainder</text>')
  parts.push('<text x="570" y="218" font-size="9.5" fill="#0d9488" text-anchor="middle">a CONSTANT — deg r &lt; 1</text>')
  // flows
  parts.push('<line x1="210" y1="138" x2="256" y2="138" stroke="#65a30d" stroke-width="1.4"/>')
  parts.push('<line x1="430" y1="126" x2="476" y2="116" stroke="#65a30d" stroke-width="1.4"/>')
  parts.push('<line x1="430" y1="152" x2="476" y2="200" stroke="#dc2626" stroke-width="1.4"/>')
  // the evaluation arrow: x = a kills the product term
  parts.push('<path d="M 345 170 C 345 240, 420 250, 470 218" fill="none" stroke="#65a30d" stroke-width="1.4" stroke-dasharray="6 4"/>')
  parts.push('<polygon points="478,213 473.4,220.5 469.2,213.7" fill="#65a30d"/>')
  parts.push('<text x="292" y="232" font-size="11" fill="#65a30d" font-weight="700">at x = a :</text>')
  // verdict band
  parts.push('<rect x="30" y="272" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="280" width="180" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="150" y="296" font-size="10.5" fill="#166534" text-anchor="middle">f(a) = 0 · q(a) + r</text>')
  parts.push('<rect x="300" y="280" width="180" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="390" y="296" font-size="10.5" fill="#166534" text-anchor="middle">the product term DIES at x = a</text>')
  parts.push('<rect x="535" y="280" width="140" height="24" rx="5" fill="none" stroke="#16a34a" stroke-width="1.2"/>')
  parts.push('<text x="605" y="296" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">so r = f(a)</text>')
  parts.push('<text x="360" y="340" font-size="11.5" fill="#0d9488" text-anchor="middle">evaluate, never divide — the substitution machine of 1.3, promoted to a theorem</text>')
  return parts.join('')
}

export const chapter03: Chapter = {
  number: 3,
  slug: 'polynomials',
  title: 'Polynomials',
  summary:
    'The first algebraic family: what a polynomial is (terms, degree, classification by shape), arithmetic on polynomials — addition, subtraction and the distributive grid of multiplication — the special products (a ± b)² and (a + b)(a − b) PROVED by distribution and then used as identities, and division: long division as ANS’s division algorithm wearing letters, with the remainder theorem proved and the factor theorem glimpsed.',
  status: 'complete',
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
    {
      id: 'al-special-products-the-identities-proved',
        number: '3.3',
        title: 'Special Products: the Identities, Proved',
        concepts: [
          'identity: true for every value',
          'reading identities in both directions',
          'the square of a difference',
          'sum and difference of cubes',
          'trinomial squares and the middle-term test',
          'the middle-term rule for (x+a)(x+b)',
          'identity-based shortcut arithmetic',
          'the multinomial square',
        ],
        objectives: [
          'state what an identity is — a sentence true for EVERY value of the letters — and distinguish identities from equations by testing values',
          'read each square identity in both directions: expand the product form, and recognize the expanded form back into its product',
          'derive (a − b)² twice — on the grid and by substituting −b into the square of a sum — and draw the corner-cut square that carries it',
          'prove the sum and difference of cubes on the grid, cashing the (x − 1)(x² + x + 1) = x³ − 1 teaser of 3.2',
          'apply the middle-term test to recognize trinomial squares and to refuse the impostors, and compute squares and products of numbers by identity instead of by column multiplication',
        ],
        prerequisites: ['al-adding-subtracting-and-multiplying-polynomials', 'al-powers-and-the-laws-of-exponents'],
        sources: ['hall-knight-elementary-algebra', 'ncert-math9-ch2-polynomials', 'euclid-elements-ii4', 'cengage-jee-style'],
        blocks: [
          { kind: 'para', text: 'Lesson 3.2 proved two products and left them sitting at the end of the lesson like completed calculations: $(a+b)^{2} = a^{2} + 2ab + b^{2}$ and $(a+b)(a-b) = a^{2} - b^{2}$. This lesson promotes them. A product proved once for particular letters is a computation; a sentence true for **every** value the letters can take is an **identity** — and identities are the working capital of algebra. The distinction is 1.1’s expression-versus-equation census, one rung higher: $x^{2} = 9$ is a *sentence true for some values* (an equation — true at $x = 3$ and $x = -3$, false at $x = 4$), while $(x+1)^{2} = x^{2} + 2x + 1$ is a *sentence true for all values* (an identity). Test it anywhere: $x = 5$ gives $36 = 36$; $x = -4$ gives $9 = 9$; $x = \\tfrac{1}{2}$ gives $\\tfrac{9}{4} = \\tfrac{9}{4}$. The verifier swept both sentences across every integer in $[-8, 8]$: the equation failed at 14 of the 17 values, the identity failed at none.' },
          { kind: 'para', text: 'Why does the promotion matter? Because a sentence true for every value can be **read in both directions**. Read left-to-right, $(a+b)^{2} = a^{2} + 2ab + b^{2}$ is an *expansion machine*: it replaces a square of a sum by a trinomial without setting up a grid. Read right-to-left, it is a *recognition machine*: a trinomial of the right shape collapses into a square. The left-to-right direction computes faster; the right-to-left direction is the seed of all of chapter 4, where reading products backwards gets its formal name — factorization. This lesson builds the full shelf of identities, proves every one of them on the grid, and then cashes them where they pay: recognizing shapes, and doing arithmetic on numbers by identity instead of by columns.' },
          { kind: 'callout', tone: 'definition', title: 'Definition — identity', text: 'An **identity** is a sentence about expressions that is true for every value the letters may take. To mark the strength, mathematics often writes the two sides with a three-barred sign: $(a+b)^{2} \\equiv a^{2} + 2ab + b^{2}$ — read “is identically equal to”. The test that separates an identity from a mere equation is *substitution*: an identity survives every substitution; an equation survives only the values in its solution set. One substitution proving two sides equal never proves an identity — it only fails to refute it. Proof of an identity needs the laws (here, the distributive grid), not examples.' },
          { kind: 'para', text: 'The plan of the lesson: first the two banked identities, restated as two-way sentences and joined by their missing sibling — the square of a difference, derived twice. Then the degree-three shelf: the sum and difference of cubes, proved on the grid and cashing 3.2’s closing teaser exactly. Then the recognition skills — trinomial squares and the middle-term test that admits or refuses them — and the middle-term rule for products of the form $(x+a)(x+b)$. Finally the identities go to work on plain numbers: squares and products computed by identity, the way examination speed rounds demand and the way Hall and Knight’s chapter teaches them.' },
          { kind: 'heading', text: 'The Square Identities: One Shelf, Both Directions' },
          { kind: 'para', text: 'The square of a sum is banked from 3.2, proved cell by cell: the four products of $(a+b)(a+b)$ are $a^{2}$, $ab$, $ba$ and $b^{2}$, the two middle cells are like terms, and they collect to $2ab$. The square of a difference sits one sign away — and one sign is exactly where students slip, so this lesson derives it **twice**, by two independent routes, and then draws it.' },
          {
            kind: 'derivation',
            title: 'The square of a difference, derived twice',
            statement: 'Claim: for all letters $a$ and $b$, $(a - b)^{2} = a^{2} - 2ab + b^{2}$.',
            steps: [
              {
                label: 'Route one — the grid',
                formula: 'a \\cdot a + a \\cdot (-b) + (-b) \\cdot a + (-b)(-b) = a^{2} - ab - ab + b^{2}',
                explanation: 'Four cells of $(a - b)(a - b)$, the sign law of FM ch. 7 on the last cell — the corner square arrives POSITIVE.',
              },
              {
                label: 'Collect the middle column',
                formula: '-ab - ab = -2ab',
                explanation: 'The cross term survives but arrives NEGATIVE — two negative cells collecting, the exact mirror of the square of a sum.',
              },
              {
                label: 'Route two — substitution',
                formula: '(a - b)^{2} = (a + (-b))^{2} = a^{2} + 2a(-b) + (-b)^{2}',
                explanation: 'Write the difference as a sum and run the banked identity of 3.2 on it — the sign law carrying every coefficient.',
              },
              {
                label: 'Both routes land together',
                formula: '(a - b)^{2} = a^{2} - 2ab + b^{2}',
                explanation: 'The verifier swept the sentence over all 289 pairs $(a, b)$ in $[-8, 8]^{2}$ with zero failures.',
              },
            ],
            result: '(a − b)² = a² − 2ab + b² — the middle term is −2ab: two negative cells collecting.',
          },
          { kind: 'para', text: 'The grid route has a picture worth keeping. Start with the $a \\times a$ square (area $a^{2}$). To leave only the square of side $a - b$, cut away a vertical strip of width $b$ (area $ab$) and a horizontal strip of height $b$ (area $ab$). But the corner square $b \\times b$ sat inside **both** strips — it was removed twice, so one of those removals must be paid back: $a^{2} - ab - ab + b^{2} = a^{2} - 2ab + b^{2}$. The figure below draws exactly this — and it is one of the oldest pictures in mathematics: Euclid’s *Elements*, Book II, Proposition 4 proves the square of a sum as exactly such a cut-up square, twenty-three centuries before superscripts.' },
          { kind: 'figure', caption: 'The corner-cut square: cutting a strip of width b from each edge of the a×a square leaves the inner square (a − b)² — and the two strips double-count the b² corner, which must be added back.', svg: cornerCutSquareSvg() },
          { kind: 'example', title: 'Expand (3x − 4y)² and (5x + 2)(5x − 2), and verify both at x = 1, y = 1', steps: [
            'Take $(3x - 4y)^{2}$ by the identity with $a = 3x$, $b = 4y$: the square of the first is $9x^{2}$; twice the product is $2 \\cdot 3x \\cdot 4y = 24xy$ and arrives negative; the square of the second is $16y^{2}$.',
            'So, $(3x - 4y)^{2} = 9x^{2} - 24xy + 16y^{2}$.',
            'Take $(5x + 2)(5x - 2)$ by the difference-of-squares identity: $(5x)^{2} - 2^{2} = 25x^{2} - 4$ — no middle term at all.',
            'Check at $x = 1$, $y = 1$: the square gives $(3 - 4)^{2} = 1$, and the expansion gives $9 - 24 + 16 = 1$ — agreement.',
            'Check the product at $x = 1$: $(5 + 2)(5 - 2) = 7 \\cdot 3 = 21$, and the expansion gives $25 - 4 = 21$ — agreement.',
            'Hence both identities did in one line what a grid would do in four cells — and the checks certify the readings.',
          ] },
          {
            kind: 'equation',
            latex: '(a \\pm b)^{2} = a^{2} \\pm 2ab + b^{2}, \\qquad (a + b)(a - b) = a^{2} - b^{2}',
            note: 'the square shelf — the double sign is the whole message: the cross term shares the sign of the bracket, and the difference-of-squares product has no cross term to share one',
          },
          { kind: 'para', text: 'One more product belongs on the square shelf, less famous but used constantly: the product of any two binomials with the same letter part. On the grid, $(x + a)(x + b)$ has cells $x^{2}$, $bx$, $ax$ and $ab$ — the middle column collects $(a + b)x$ and the corner is $ab$. This is the **middle-term rule**, and it is Hall and Knight’s printed form of “the product of any two binomials”: the first term of the product is the product of the first terms, the last is the product of the second terms, and the middle coefficient is the *sum of the second terms taken with their proper signs*.' },
          {
            kind: 'equation',
            latex: '(x + a)(x + b) = x^{2} + (a + b)x + ab',
            note: 'the middle-term rule — the verifier swept it symbolically over all 325 pairs a in [0,12], b in [−12,12]',
          },
          { kind: 'para', text: 'The rule’s real power is the right-to-left read: given $x^{2} + 7x + 12$, hunt two numbers whose product is $12$ and whose sum is $7$ — the pair $3$ and $4$ — and the trinomial collapses to $(x + 3)(x + 4)$ without any grid at all. This hunt (and the proof that it always succeeds when the roots behave) is chapter 4’s opening business; here the left-to-right direction is banked and the backwards glance is the preview.' },
          {
            kind: 'table',
            caption: 'The identity shelf of this lesson — every row proved on the grid, every row read in both directions',
            head: ['Identity', 'Read left → right', 'Read right → left'],
            rows: [
              ['$a^{2} + 2ab + b^{2}$ from $(a+b)^{2}$', 'square of a sum: cross term $+2ab$', 'trinomial square (plus shape)'],
              ['$a^{2} - 2ab + b^{2}$ from $(a-b)^{2}$', 'square of a difference: cross term $-2ab$', 'trinomial square (minus shape)'],
              ['$a^{2} - b^{2}$ from $(a+b)(a-b)$', 'sum times difference: middle cancels', 'difference of squares'],
              ['$x^{2} + (a+b)x + ab$ from $(x+a)(x+b)$', 'middle-term rule: sum on the middle, product at the end', 'factor hunt for two numbers'],
              ['$a^{3} + b^{3}$ from $(a+b)(a^{2}-ab+b^{2})$', 'sum of cubes: four cells cancel', 'sum-of-cubes shape'],
              ['$a^{3} - b^{3}$ from $(a-b)(a^{2}+ab+b^{2})$', 'difference of cubes: four cells cancel', 'difference-of-cubes shape'],
            ],
          },
          { kind: 'callout', tone: 'insight', title: 'Note — the backwards read is where the speed lives', text: 'The left-to-right read expands; the right-to-left read *computes*. To price $61 \\times 59$, notice $61 = 60 + 1$ and $59 = 60 - 1$: the difference-of-squares identity gives $61 \\times 59 = 60^{2} - 1 = 3\\,600 - 1 = 3\\,599$ — no column multiplication, no carrying. The same read in symbols is chapter 4’s $a^{2} - b^{2} = (a+b)(a-b)$; here it is already a working calculator. The habit to build: whenever two numbers sit equally far from a comfortable round number, the middle of the identity does the work.' },
          { kind: 'heading', text: 'The Cube Identities: the Grid at Degree Three' },
          { kind: 'para', text: 'Lesson 3.2 closed with a teaser: $(x - 1)(x^{2} + x + 1) = x^{3} - 1$, six cells collapsing to two. The teaser now becomes a theorem with letters in both seats. Run the grid on $(a + b)(a^{2} - ab + b^{2})$: the six cells are $a^{3}$, $-a^{2}b$, $ab^{2}$, $a^{2}b$, $-ab^{2}$, $b^{3}$ — and the middle four cancel in two exact pairs ($-a^{2}b + a^{2}b = 0$ and $ab^{2} - ab^{2} = 0$), the same exact-negation structure that empties the middle column of the difference-of-squares product. Two cells survive: $a^{3}$ and $b^{3}$.' },
          {
            kind: 'derivation',
            title: 'The sum of cubes, proved on the grid',
            statement: 'Claim: for all letters $a$ and $b$, $(a + b)(a^{2} - ab + b^{2}) = a^{3} + b^{3}$ (and the companion $(a - b)(a^{2} + ab + b^{2}) = a^{3} - b^{3}$).',
            steps: [
              {
                label: 'Fill the six cells',
                formula: 'a(a^{2} - ab + b^{2}) + b(a^{2} - ab + b^{2}) = a^{3} - a^{2}b + ab^{2} + a^{2}b - ab^{2} + b^{3}',
                explanation: 'From $a$: $a^{3}$, $-a^{2}b$, $ab^{2}$; from $b$: $a^{2}b$, $-ab^{2}$, $b^{3}$ — the distributive law, twice.',
              },
              {
                label: 'Collect — four cells cancel',
                formula: '-a^{2}b + a^{2}b = 0, \\qquad ab^{2} - ab^{2} = 0',
                explanation: 'The middle four cells are two exact-negation pairs — the same structure that empties the middle column of $(a+b)(a-b)$.',
              },
              {
                label: 'What survives',
                formula: 'a^{3} + b^{3}',
                explanation: 'The leading corner and the far corner — everything between them cancelled.',
              },
              {
                label: 'The companion with the minus in front',
                formula: '(a - b)(a^{2} + ab + b^{2}) = a^{3} - a^{2}b + ab^{2} - a^{2}b + ab^{2} - b^{3} = a^{3} - b^{3}',
                explanation: 'Cells $a^{3}$, $a^{2}b$, $ab^{2}$, $-a^{2}b$, $-ab^{2}$, $-b^{3}$ — the same four cancellations, the surviving corner carrying the minus: $a^{3} - b^{3}$. The 3.2 teaser $(x-1)(x^{2}+x+1) = x^{3}-1$ is the case $a = x$, $b = 1$ — now a theorem’s corollary.',
              },
              {
                label: 'Sweep',
                formula: '289 \\text{ pairs, zero failures}',
                explanation: 'Both sentences held symbolically for every $b$ in $[-8, 8]$ and pointwise at all 289 pairs $(a, b)$ — no exceptions.',
              },
            ],
            result: '(a + b)(a² − ab + b²) = a³ + b³ and (a − b)(a² + ab + b²) = a³ − b³ — the cube identities.',
          },
          { kind: 'figure', caption: 'The cube identities on the grid: each product has six cells, the middle four cancel in exact pairs, and two survive — a³ + b³ from the first grid, a³ − b³ from the second.', svg: cubeGridsSvg() },
          { kind: 'para', text: 'Read the factor shapes carefully — they are the identities’ most misquoted feature. The trinomial in the sum-of-cubes product carries the **opposite** sign in its middle seat ($a^{2} - ab + b^{2}$); the trinomial in the difference-of-cubes product carries **all plus** ($a^{2} + ab + b^{2}$). A memory that survives checking: the middle seat’s sign is the one that makes the four cells cancel — change it and nothing cancels. Test the misquote: $(a+b)(a^{2}+ab+b^{2})$ has middle cells $a^{2}b, ab^{2}, a^{2}b, ab^{2}$ collecting to $2a^{2}b + 2ab^{2}$ — no cancellation, no identity.' },
          { kind: 'example', title: 'Expand (x + 4)(x² − 4x + 16) and (x − 3)(x² + 3x + 9), and verify both at x = 2', steps: [
            'Recognize the sum-of-cubes shape: $a = x$, $b = 4$ — the bracket is $a^{2} - ab + b^{2} = x^{2} - 4x + 16$.',
            'So, the product is $a^{3} + b^{3} = x^{3} + 64$ — one line, no grid.',
            'Recognize the difference-of-cubes shape: $a = x$, $b = 3$ — the bracket is $a^{2} + ab + b^{2} = x^{2} + 3x + 9$.',
            'So, the product is $x^{3} - 27$.',
            'Check both at $x = 2$: the first gives $(6)(4 - 8 + 16) = 6 \\cdot 12 = 72$ and $2^{3} + 64 = 72$ — agreement.',
            'Check the second: $(-1)(4 + 6 + 9) = -19$ and $8 - 27 = -19$ — agreement. Hence both reads certified at a chosen value.',
          ] },
          { kind: 'heading', text: 'Recognizing Trinomial Squares: the Middle-Term Test' },
          { kind: 'para', text: 'The square identities read backwards give a recognition skill: a trinomial of the shape **first squared, plus twice the product, plus last squared** is a perfect square. The test has three readings and all three must pass: the first and last terms are genuine squares (their square roots are the bracket’s two terms), and the middle coefficient is exactly **twice the product of those roots** — with the middle’s sign matching the bracket’s sign. Take $x^{2} + 6x + 9$: the roots are $x$ and $3$, and twice their product is $2 \\cdot x \\cdot 3 = 6x$ — the middle agrees, so $x^{2} + 6x + 9 = (x + 3)^{2}$. Take $4x^{2} - 12x + 9$: the roots are $2x$ and $3$, twice the product is $2 \\cdot 2x \\cdot 3 = 12x$, the middle arrives negative — so $4x^{2} - 12x + 9 = (2x - 3)^{2}$. The sign of the middle term is not an obstacle; it is information — it names the bracket’s sign.' },
          { kind: 'para', text: 'The test also *refuses*, and refusals are where examination marks are defended. The trinomial $x^{2} + 8x + 9$ has square ends ($9 = 3^{2}$) but the middle candidate is $2 \\cdot 1 \\cdot 3 = 6$, not $8$ — refused: it is not a square, and no amount of wishing moves the $8$. Likewise $x^{2} + 6x + 16$ ($16 = 4^{2}$, but $2 \\cdot 4 = 8 \\neq 6$) and $x^{2} + 5x + 25$ ($2 \\cdot 5 = 10 \\neq 5$). The middle-term test is a theorem in both directions: a trinomial square passes it, and a trinomial that fails it is not a square — because the square identity fixes the middle coefficient exactly.' },
          { kind: 'callout', tone: 'warn', title: 'Caution — the square still does not distribute, and the middle term carries the sign', text: 'Two traps, both priced. First, the oldest error in the book: $(a+b)^{2} \\neq a^{2} + b^{2}$. Chapter 2’s census caught it ($3^{2} + 2^{2} = 13$ but $(3+2)^{2} = 25$); at $a = 7, b = 3$: $7^{2} + 3^{2} = 58$ against $10^{2} = 100$ — the missing $42$ is the cross term $2 \\cdot 7 \\cdot 3$. Second, the sign of the middle term: $(a - b)^{2} = a^{2} - 2ab + b^{2}$ has a NEGATIVE middle but a POSITIVE last term — because $(-b)^{2} = b^{2}$. The wrong read $(a-b)^{2} = a^{2} - 2ab - b^{2}$ fails at every substitution: at $a = 5, b = 3$ it claims $16 - 9 = 7$ against the true $(5-3)^{2} = 4$. The last term of a square is never negative.' },
          { kind: 'para', text: 'Recognition extends past two terms. The **multinomial square** — the square of any sum — collects every pairwise cross term. For three letters the grid gives $(a + b + c)^{2} = a^{2} + b^{2} + c^{2} + 2ab + 2ac + 2bc$: three square cells and three doubled products, one for each pair of letters (the verifier swept all 343 points of $[-3,3]^{3}$). Hall and Knight print exactly this as their extension of the square rules. And the difference of squares chains: $x^{4} - 16$ is $(x^{2})^{2} - 4^{2}$, so it factors as $(x^{2} + 4)(x^{2} - 4)$ — and the second bracket is ITSELF a difference of squares, giving $(x^{2} + 4)(x + 2)(x - 2)$. The identities compose; chapter 4 will mine exactly this vein.' },
          { kind: 'example', title: 'Recognize which of x² + 6x + 9, x² + 6x + 16 and 4x² − 12x + 9 are trinomial squares, and read each that passes back into its bracket', steps: [
            'Test $x^{2} + 6x + 9$: roots $x$ and $3$ (from $1$ and $9$); twice the product $2 \\cdot 1 \\cdot 3 = 6$ — the middle agrees. PASSES.',
            'Read backwards: $x^{2} + 6x + 9 = (x + 3)^{2}$ — the sign of the middle names the bracket.',
            'Test $x^{2} + 6x + 16$: roots would be $x$ and $4$ (from $16$); twice their product is $8$, not $6$ — FAILS the middle-term test.',
            'So, $x^{2} + 6x + 16$ is not a trinomial square (it does factor — chapter 4 finds $(x+2)(x+8)$ — but that is a different skill; the square test only certifies squares).',
            'Test $4x^{2} - 12x + 9$: roots $2x$ and $3$; twice the product $12$, arriving negative — PASSES.',
            'Read backwards: $4x^{2} - 12x + 9 = (2x - 3)^{2}$, and check at $x = 1$: $(2 - 3)^{2} = 1$ and $4 - 12 + 9 = 1$ — agreement.',
          ] },
          { kind: 'heading', text: 'Shortcut Arithmetic: the Identities Compute Numbers' },
          { kind: 'para', text: 'The identities do not know the difference between letters and numbers — substitute numbers and they still hold, which is exactly what an identity MEANS. Hall and Knight’s chapter turns this into speed arithmetic, and the competitive examinations still set it. To square $1012$, read it as $1000 + 12$: $(1000 + 12)^{2} = 1000^{2} + 2 \\cdot 1000 \\cdot 12 + 12^{2} = 1\\,000\\,000 + 24\\,000 + 144 = 1\\,024\\,144$. To square $98$, read $100 - 2$: $10\\,000 - 400 + 4 = 9\\,604$. To price $102 \\times 98$, notice the pair sits either side of $100$: $(100 + 2)(100 - 2) = 10\\,000 - 4 = 9\\,996$. In each case the identity replaced a column multiplication — and every such computation is *checkable* by squaring the plain way, which is how the verifier certified all of them.' },
          { kind: 'example', title: 'Compute 1012², 98² and 102 × 98 by identity, checking one of them by column arithmetic', steps: [
            'Square $1012$ as $(1000 + 12)^{2}$: squares $1\\,000\\,000$ and $144$, cross term $2 \\cdot 1000 \\cdot 12 = 24\\,000$ — total $1\\,024\\,144$.',
            'Square $98$ as $(100 - 2)^{2}$: $10\\,000 - 2 \\cdot 100 \\cdot 2 + 4 = 10\\,000 - 400 + 4 = 9\\,604$.',
            'Price $102 \\times 98$ as $(100 + 2)(100 - 2) = 100^{2} - 2^{2} = 10\\,000 - 4 = 9\\,996$.',
            'Check the first by column multiplication: $1012 \\times 1012 = 1012 \\cdot 1000 + 1012 \\cdot 12 = 1\\,012\\,000 + 12\\,144 = 1\\,024\\,144$ — agreement.',
            'Hence three computations at identity speed, one certified the slow way — the check habit survives even when the shortcut works.',
          ] },
          { kind: 'para', text: 'The same substitution habit prices harder shapes. To square $205$: $(200 + 5)^{2} = 40\\,000 + 2\\,000 + 25 = 42\\,025$. To square $999$: $(1000 - 1)^{2} = 1\\,000\\,000 - 2\\,000 + 1 = 998\\,001$. And the middle-term rule prices products of numbers both just below a round base: $61 \\times 59 = (60+1)(60-1) = 3\\,599$, and $55 \\times 45 = (50+5)(50-5) = 2\\,500 - 25 = 2\\,475$. None of these is a trick — each is an identity evaluated at numbers, which is why each can be checked and why each will still be true tomorrow.' },
          { kind: 'callout', tone: 'historical', title: 'Historical note — Euclid cuts the square', text: 'The corner-cut figure of this lesson is twenty-three centuries old. Euclid’s *Elements* (c. 300 BC), Book II, Proposition 4, proves that “if a straight line is cut at random, the square on the whole equals the squares on the segments plus twice the rectangle contained by the segments” — the square of a sum, proved by areas because Greek mathematics carried its algebra in geometry: lengths were lines, products were rectangles, and a “square” was literally one. Proposition 7 does the same honour to the square of a difference. What this lesson does with letters and a grid, Euclid did with compass and straightedge — and the figure still teaches the identity better than the symbols alone. Book II’s propositions are, in the words of modern commentators, geometric algebra: the identities of this lesson, drawn.' },
          { kind: 'para', text: 'The lesson’s working summary: the shelf now holds six identities, every one proved on the grid and swept by the verifier at hundreds of values; every one reads in both directions; and the recognition tests — middle-term test for squares, the cube bracket’s sign pattern — decide which read applies. What the shelf buys tomorrow: chapter 4 reverses the whole lesson formally, as factorization, with the factor theorem doing the hunting. The identities will be waiting, already proved, already swept.' },
          { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Special products are the highest-yield identities in school and competitive algebra — the marks come from speed with correctness. The recurring items: expand squares of binomials at sight ($9x^{2} - 24xy + 16y^{2}$ from $(3x-4y)^{2}$ — coefficients square, cross term doubles); price difference-of-squares products instantly ($(2x+3)(2x-3) = 4x^{2}-9$); apply the middle-term rule to $(x+a)(x+b)$ shapes; recognize trinomial squares by the middle-term test and REFUSE the impostors ($x^{2}+8x+9$ looks close and is not); compute $1012^{2}$, $98^{2}$, $102 \\times 98$-class shortcuts by identity; and quote the cube brackets with their signs exactly ($a^{2} \\pm ab + b^{2}$ with the middle seat opposite for sums). Competitive papers add the multinomial square ($101^{2} + 2 \\cdot 101 \\cdot 99 + 99^{2}$ read as $(101+99)^{2} = 40\\,000$ — the identity run backwards on numbers) and two-step differences of squares ($x^{4} - 16$). Every answer stays checkable by substitution — the habit each illustration here ran.' },
          { kind: 'terms', items: [
            { term: 'Identity', def: 'A sentence true for EVERY value of the letters — written with $\\equiv$ when the strength matters. Proved by the laws (the grid), never by examples; tested by substitution, which can refute but never prove.' },
            { term: 'Trinomial square', def: 'A trinomial of the shape $a^{2} \\pm 2ab + b^{2}$ — the expansion of a square bracket. Recognized by the middle-term test: the middle coefficient must be twice the product of the square roots of the end terms.' },
            { term: 'The middle-term test', def: 'The recognition rule for trinomial squares: first and last terms genuine squares, middle coefficient exactly $2ab$ (sign included). Failing it is a proof of NOT-square, since the identity fixes the middle exactly.' },
            { term: 'The middle-term rule', def: '$(x + a)(x + b) = x^{2} + (a+b)x + ab$ — the product of any two same-letter binomials: product of firsts, sum of seconds in the middle, product of seconds at the end.' },
            { term: 'Difference of squares', def: '$(a+b)(a-b) = a^{2} - b^{2}$ — the no-cross-term identity. Reads backwards as the fastest factorization in algebra, and chains ($x^{4} - 16$) when the factors stay squares.' },
            { term: 'Sum of cubes', def: '$(a+b)(a^{2} - ab + b^{2}) = a^{3} + b^{3}$ — the bracket’s middle seat carries the OPPOSITE sign, exactly the sign that makes the grid’s four middle cells cancel.' },
            { term: 'Difference of cubes', def: '$(a-b)(a^{2} + ab + b^{2}) = a^{3} - b^{3}$ — the bracket is all-plus, and the surviving corner carries the minus.' },
            { term: 'Multinomial square', def: 'The square of a sum of any size: every square term plus twice every pairwise product — $(a+b+c)^{2} = a^{2}+b^{2}+c^{2}+2ab+2ac+2bc$, swept by the verifier over all of $[-3,3]^{3}$.' },
          ] },
          {
            kind: 'quiz',
            title: 'Check yourself',
            items: [
              {
                q: '$(x - 5)^{2}$ equals',
                options: ['$x^{2} - 25$', '$x^{2} - 10x + 25$', '$x^{2} + 10x + 25$', '$x^{2} + 5x + 25$'],
                answer: 1,
                explain: 'The square of a difference with $a = x$, $b = 5$: $x^{2} - 2 \\cdot x \\cdot 5 + 5^{2}$. Option 1 is the missing-cross-term error (the $(a+b)^{2} = a^{2}+b^{2}$ fallacy — $x^{2}-25$ is a difference of squares, a DIFFERENT sentence); option 3 flipped the bracket’s sign (the middle of $(x-5)^{2}$ must be negative); option 4 halved the cross term and flipped the last ($2 \\cdot 1 \\cdot 5 = 10$, never $5$; and $(-5)^{2} = 25$, never $-25$). Check at $x = 7$: $(2)^{2} = 4$ and $49 - 70 + 25 = 4$ — agreement.',
              },
              {
                q: '$(2x + 3)(2x - 3)$ equals',
                options: ['$4x^{2} + 9$', '$4x^{2} - 6x - 9$', '$4x^{2} - 9$', '$2x^{2} - 9$'],
                answer: 2,
                explain: 'Sum times difference: $(2x)^{2} - 3^{2} = 4x^{2} - 9$ — the middle column cancels exactly ($+6x - 6x$). Option 1 added the squares (the same fallacy again, now with a sign); option 2 kept half the middle column (the cells $+6x$ and $-6x$ are exact negations — they leave nothing behind); option 4 dropped the coefficient’s square ($(2x)^{2} = 4x^{2}$, never $2x^{2}$ — the exponent law, not the two). Check at $x = 1$: $(5)(-1) = -5$ and $4 - 9 = -5$ — agreement.',
              },
              {
                q: '$x^{3} + 8$ equals',
                options: ['$(x + 2)(x^{2} - 2x + 4)$', '$(x + 2)(x^{2} + 2x + 4)$', '$(x + 2)^{3}$', '$(x + 2)(x^{2} - 4x + 4)$'],
                answer: 0,
                explain: 'Sum of cubes with $a = x$, $b = 2$: the bracket is $a^{2} - ab + b^{2} = x^{2} - 2x + 4$ — OPPOSITE sign in the middle seat. Option 2 is the all-plus bracket (that belongs to the DIFFERENCE of cubes; expand it and the middle cells fail to cancel — you get $x^{3} + 6x^{2} + 12x + 8$-class noise, here $x^{3}+6x^{2}+12x+8$ against the true $x^{3}+8$); option 3 is the cube of the bracket ($(x+2)^{3} = x^{3} + 6x^{2} + 12x + 8$, the multinomial square plus one more degree — not $x^{3}+8$); option 4 borrowed the difference-of-squares bracket’s shape ($-4x$), which cancels nothing here. Check at $x = 1$: $(3)(1 - 2 + 4) = 9$ and $1 + 8 = 9$ — agreement.',
              },
              {
                q: 'Using the identity with $(50 - 3)^{2}$: the value of $47^{2}$ is',
                options: ['$2\\,219$', '$2\\,209$', '$2\\,409$', '$2\\,251$'],
                answer: 1,
                explain: '$(50 - 3)^{2} = 2\\,500 - 2 \\cdot 50 \\cdot 3 + 9 = 2\\,500 - 300 + 9 = 2\\,209$. Option 1 slipped the addition ($2\\,500 - 300 + 9$ mis-collected as $2\\,219$); option 3 mis-subtracted the cross term ($2\\,500 - 91$ — as if the identity were $a^{2} - (a+b)$... the cross term is $2ab = 300$, not $91$); option 4 kept the wrong last term ($2\\,500 - 300 + 51$ — the $9$ is $3^{2}$, not $51$). The plain check: $47 \\cdot 47 = 47 \\cdot 50 - 47 \\cdot 3 = 2\\,350 - 141 = 2\\,209$ — agreement.',
              },
              {
                q: 'Which of these IS a trinomial square?',
                options: ['$x^{2} + 8x + 9$', '$x^{2} + 10x + 25$', '$x^{2} + 5x + 25$', '$x^{2} + 12x + 25$'],
                answer: 1,
                explain: 'The middle-term test on each: option 1 has square ends ($3^{2} = 9$) but the middle should be $2 \\cdot 3 = 6$, not $8$ — refused; option 2 has roots $x$ and $5$, and $2 \\cdot 1 \\cdot 5 = 10$ — PASSES: $x^{2} + 10x + 25 = (x+5)^{2}$; option 3 has the right last term ($5^{2}$) but the middle should be $2 \\cdot 5 = 10$, not $5$ — refused; option 4 again has ends $x^{2}, 25$ and middle should be $10$, not $12$ — refused. Two of the impostors even carry a perfect-square last term — the test exists precisely because looking square is not being square.',
              },
            ],
          },
          {
            kind: 'exercises',
            title: 'Exercises 3.3',
            sets: [
              {
                level: 'L1',
                questions: [
                  {
                    q: 'Expand $(x + 7)^{2}$.',
                    solution: [
                      'Apply the square of a sum with $a = x$, $b = 7$: squares $x^{2}$ and $49$, cross term $2 \\cdot x \\cdot 7 = 14x$.',
                      'So, $(x + 7)^{2} = x^{2} + 14x + 49$.',
                      'Check at $x = 1$: $8^{2} = 64$ and $1 + 14 + 49 = 64$ — agreement.',
                    ],
                    answer: '$x^{2} + 14x + 49$',
                  },
                  {
                    q: 'Expand $(x - 9)^{2}$.',
                    solution: [
                      'Apply the square of a difference: the cross term arrives negative — $-2 \\cdot x \\cdot 9 = -18x$; the last term $(-9)^{2} = 81$ stays POSITIVE.',
                      'So, $(x - 9)^{2} = x^{2} - 18x + 81$.',
                      'Check at $x = 10$: $1^{2} = 1$ and $100 - 180 + 81 = 1$ — agreement.',
                    ],
                    answer: '$x^{2} - 18x + 81$',
                  },
                  {
                    q: 'Expand $(x + 4)(x - 4)$.',
                    solution: [
                      'Sum times difference — the middle column cancels by construction.',
                      'So, $(x + 4)(x - 4) = x^{2} - 16$.',
                      'Check at $x = 3$: $(7)(-1) = -7$ and $9 - 16 = -7$ — agreement.',
                    ],
                    answer: '$x^{2} - 16$',
                  },
                ],
              },
              {
                level: 'L2',
                questions: [
                  {
                    q: 'Expand $(2x + 5)^{2}$.',
                    solution: [
                      'Squares of the parts: $(2x)^{2} = 4x^{2}$ and $5^{2} = 25$ (the exponent law on the first, the field laws on the second).',
                      'Cross term: $2 \\cdot 2x \\cdot 5 = 20x$.',
                      'So, $(2x + 5)^{2} = 4x^{2} + 20x + 25$.',
                      'Check at $x = 1$: $7^{2} = 49$ and $4 + 20 + 25 = 49$ — agreement.',
                    ],
                    answer: '$4x^{2} + 20x + 25$',
                  },
                  {
                    q: 'Expand $(3a - 2b)^{2}$.',
                    solution: [
                      'Squares: $(3a)^{2} = 9a^{2}$; $(-2b)^{2} = 4b^{2}$ — the sign law makes the last term positive.',
                      'Cross term: $2 \\cdot 3a \\cdot (-2b) = -12ab$.',
                      'So, $(3a - 2b)^{2} = 9a^{2} - 12ab + 4b^{2}$.',
                      'Check at $a = 2$, $b = 1$: $(6 - 2)^{2} = 16$ and $36 - 24 + 4 = 16$ — agreement.',
                    ],
                    answer: '$9a^{2} - 12ab + 4b^{2}$',
                  },
                  {
                    q: 'Expand $(4x + 7)(4x - 7)$.',
                    solution: [
                      'Sum times difference with $a = 4x$, $b = 7$: the middle cancels; the squares are $(4x)^{2} = 16x^{2}$ and $49$.',
                      'So, $(4x + 7)(4x - 7) = 16x^{2} - 49$.',
                      'Check at $x = 1$: $11 \\cdot (-3) = -33$ and $16 - 49 = -33$ — agreement.',
                    ],
                    answer: '$16x^{2} - 49$',
                  },
                ],
              },
              {
                level: 'L3',
                questions: [
                  {
                    q: 'Expand $(x + 3)(x + 8)$ by the middle-term rule.',
                    solution: [
                      'Firsts: $x \\cdot x = x^{2}$. Seconds’ product: $3 \\cdot 8 = 24$. Seconds’ sum: $3 + 8 = 11$ on the middle.',
                      'So, $(x + 3)(x + 8) = x^{2} + 11x + 24$.',
                      'Check at $x = 1$: $4 \\cdot 9 = 36$ and $1 + 11 + 24 = 36$ — agreement.',
                    ],
                    answer: '$x^{2} + 11x + 24$',
                  },
                  {
                    q: 'Expand $(x - 5)(x + 12)$ and watch the signs on the middle term.',
                    solution: [
                      'Seconds with their proper signs: $-5$ and $+12$ — sum $7$, product $-60$.',
                      'So, $(x - 5)(x + 12) = x^{2} + 7x - 60$ — the middle takes the SUM of the signed seconds.',
                      'Check at $x = 2$: $(-3)(14) = -42$ and $4 + 14 - 60 = -42$ — agreement.',
                    ],
                    answer: '$x^{2} + 7x - 60$',
                  },
                  {
                    q: 'Expand $(2x + 3)(3x - 4)$ — the general two-binomial product.',
                    solution: [
                      'Four cells: $2x \\cdot 3x = 6x^{2}$; $2x \\cdot (-4) = -8x$; $3 \\cdot 3x = 9x$; $3 \\cdot (-4) = -12$.',
                      'Collect the middle: $-8x + 9x = +x$ — the cells are unlike in coefficient, like in degree: they gather, $1x$.',
                      'So, $(2x + 3)(3x - 4) = 6x^{2} + x - 12$.',
                      'Check at $x = 1$: $5 \\cdot (-1) = -5$ and $6 + 1 - 12 = -5$ — agreement.',
                    ],
                    answer: '$6x^{2} + x - 12$',
                  },
                ],
              },
              {
                level: 'L4',
                questions: [
                  {
                    q: 'Expand $(x + 3)(x^{2} - 3x + 9)$ by the cube identity and verify at $x = 2$.',
                    solution: [
                      'Recognize the sum-of-cubes bracket with $a = x$, $b = 3$: $a^{2} - ab + b^{2} = x^{2} - 3x + 9$ — the middle seat opposite.',
                      'So, the product is $a^{3} + b^{3} = x^{3} + 27$.',
                      'Check at $x = 2$: $(5)(4 - 6 + 9) = 5 \\cdot 7 = 35$, and $2^{3} + 27 = 35$ — agreement.',
                      'Hence the identity did in one line what the grid does in six cells — the four middle cells cancelled unseen.',
                    ],
                    answer: '$x^{3} + 27$',
                  },
                  {
                    q: 'Expand $(x - 2)(x^{2} + 2x + 4)$ and state which identity it is.',
                    solution: [
                      'The bracket is all-plus: the difference-of-cubes shape with $a = x$, $b = 2$.',
                      'So, the product is $x^{3} - 8$ — the surviving corner carries the minus.',
                      'Check at $x = 3$: $(1)(9 + 6 + 4) = 19$ and $27 - 8 = 19$ — agreement.',
                      'Note the family: $x^{3} - 8 = x^{3} - 2^{3}$ — the identity priced a specific difference of cubes.',
                    ],
                    answer: '$x^{3} - 8$ (the difference-of-cubes identity)',
                  },
                ],
              },
              {
                level: 'L5',
                questions: [
                  {
                    q: 'Compute $998^{2}$ by identity, and check it by column arithmetic.',
                    solution: [
                      'Read $998 = 1000 - 2$ and apply the square of a difference: $1\\,000\\,000 - 2 \\cdot 1000 \\cdot 2 + 4$.',
                      'Collect: $1\\,000\\,000 - 4\\,000 + 4 = 996\\,004$.',
                      'Check by columns: $998 \\cdot 998 = 998 \\cdot 1000 - 998 \\cdot 2 = 998\\,000 - 1\\,996 = 996\\,004$ — agreement.',
                      'Hence $998^{2} = 996\\,004$ at identity speed, certified the slow way.',
                    ],
                    answer: '$996\\,004$',
                  },
                  {
                    q: 'Price $55 \\times 45$ by the difference-of-squares identity.',
                    solution: [
                      'The pair sits either side of $50$: $55 = 50 + 5$ and $45 = 50 - 5$.',
                      'Apply $(a+b)(a-b) = a^{2} - b^{2}$: $50^{2} - 5^{2} = 2\\,500 - 25$.',
                      'So, $55 \\times 45 = 2\\,475$.',
                      'Check by columns: $55 \\cdot 45 = 55 \\cdot 40 + 55 \\cdot 5 = 2\\,200 + 275 = 2\\,475$ — agreement.',
                    ],
                    answer: '$2\\,475$',
                  },
                ],
              },
              {
                level: 'L6',
                questions: [
                  {
                    q: 'Expand $(x + 2y + 3)^{2}$ as a multinomial square and verify at $x = 1$, $y = 1$.',
                    solution: [
                      'Three square terms: $x^{2}$, $(2y)^{2} = 4y^{2}$, $3^{2} = 9$.',
                      'Three doubled pairs: $2 \\cdot x \\cdot 2y = 4xy$; $2 \\cdot x \\cdot 3 = 6x$; $2 \\cdot 2y \\cdot 3 = 12y$ — one per pair of letters.',
                      'So, $(x + 2y + 3)^{2} = x^{2} + 4y^{2} + 9 + 4xy + 6x + 12y$.',
                      'Check at $x = 1$, $y = 1$: the bracket reads $(1 + 2 + 3)^{2} = 36$, and the expansion collects $1 + 4 + 9 + 4 + 6 + 12 = 36$ — agreement.',
                      'Hence the pattern: $n$ terms make $n$ squares and $\\tfrac{n(n-1)}{2}$ doubled pairs — three terms give three of each.',
                    ],
                    answer: '$x^{2} + 4y^{2} + 9 + 4xy + 6x + 12y$',
                  },
                ],
              },
            ],
          },
          { kind: 'formula', name: 'The square identities', latex: '(a \\pm b)^{2} = a^{2} \\pm 2ab + b^{2}, \\qquad (a+b)(a-b) = a^{2} - b^{2}', note: 'the cross term shares the bracket’s sign; the last term of a square is NEVER negative; the sum-times-difference has no cross term' },
          { kind: 'formula', name: 'The cube identities', latex: '(a + b)(a^{2} - ab + b^{2}) = a^{3} + b^{3}, \\qquad (a - b)(a^{2} + ab + b^{2}) = a^{3} - b^{3}', note: 'the trinomial’s middle seat carries the OPPOSITE sign for sums, all-plus for differences — exactly the sign that cancels the grid' },
          { kind: 'formula', name: 'The middle-term rule', latex: '(x + a)(x + b) = x^{2} + (a + b)x + ab', note: 'product of firsts, sum of signed seconds in the middle, product of seconds at the end — read backwards, the factor hunt of chapter 4' },
        ],
      },
      {
        id: 'al-dividing-polynomials-long-division-and-the-remainder-theorem',
        number: '3.4',
        title: 'Dividing Polynomials: Long Division and the Remainder Theorem',
        concepts: [
          'the division identity f = d·q + r',
          'long division on descending powers',
          'zero coefficients for missing degrees',
          'the index law for division',
          'the stop rule: deg r < deg d',
          'the remainder theorem r = f(a)',
          'the factor theorem glimpsed',
          'ascending powers and detached coefficients',
        ],
        objectives: [
          'divide monomials by the index law — coefficients divide, exponents subtract — and divide polynomials by monomials term by term',
          'run the long-division algorithm on polynomials arranged in descending (or ascending) powers, filling zero coefficients for missing degrees',
          'state and prove the division identity f = d·q + r with deg r < deg d, and price why the quotient-remainder pair is unique',
          'prove the remainder theorem from the division identity and use it to read remainders off values — evaluate, never divide',
          'glimpse the factor theorem — f(a) = 0 forces (x − a) to divide f — as chapter 4’s opening engine',
        ],
        prerequisites: ['al-adding-subtracting-and-multiplying-polynomials', 'ans-division-with-rest-the-division-algorithm'],
        sources: ['hall-knight-elementary-algebra', 'ncert-math9-ch2-polynomials', 'ruffini-synthetic-division', 'cengage-jee-style'],
        blocks: [
          { kind: 'para', text: 'Lesson 3.2 closed with an honest boundary: the polynomial family closes under addition, subtraction and multiplication — but division was refused. Not refused outright, though: $x^{2}/x = x$ stayed inside the family, while $(x^{2}+1)/x$ fell out on the $x^{-1}$ term. Division of polynomials is *sometimes* possible, and when it is not, something arithmetic-shaped survives anyway — a quotient, a remainder, and an identity connecting them. This lesson builds that machinery. It is ANS 2.1’s division algorithm wearing letters: $a = b \\cdot q + r$ with $0 \\le r < b$ becomes $f = d \\cdot q + r$ with $\\deg r < \\deg d$, and the resemblance runs deep — the same existence, the same uniqueness, the same stop rule, the same remainder arithmetic that ANS 10.2 turned into checksums.' },
          { kind: 'para', text: 'The plan: monomial division first, where the index law of chapter 2 does all the work (coefficients divide, exponents subtract). Then the full algorithm — long division of polynomials — arranged in descending powers per Hall and Knight’s four-step rule, with zero coefficients holding the seats of missing degrees. Then the two theorems the machine earns: the **division identity** $f = d \\cdot q + r$ with $\\deg r < \\deg d$ (with uniqueness), and the **remainder theorem** — the astonishing shortcut that the remainder on dividing by $x - a$ is just $f(a)$, evaluation with the work skipped. The lesson closes at chapter 4’s door: when that remainder is zero, the divisor is a *factor* — factorization, the next chapter’s whole subject, announcing itself inside a division algorithm.' },
          { kind: 'heading', text: 'Division in the Family: the Index Law First' },
          { kind: 'para', text: 'Division is the inverse of multiplication — Hall and Knight’s chapter opens with exactly this definition: the quotient is *that which, when multiplied by the divisor, produces the dividend*. For monomials, chapter 2’s product law runs backwards. Since $x^{5} = x^{2} \\cdot x^{3}$, dividing $36x^{5}$ by $6x^{2}$ must give $6x^{3}$: the coefficients divide ($36/6 = 6$) and the exponents **subtract** ($5 - 2 = 3$). This is the **index law for division** — $a^{m} \\div a^{n} = a^{m-n}$ — the law whose curious edge case ($a^{3} \\div a^{3} = a^{0}$, “what is a zero exponent?”) forced chapter 2.2’s repair. Here it pays rent routinely: $35x^{6} \\div 7x^{2} = 5x^{4}$, and the sign law rides along as always — $(-54y^{4}) \\div 9y = -6y^{3}$.' },
          { kind: 'para', text: 'Two letters divide per letter: $48a^{4}b^{3} \\div 8a^{2}b = 6a^{2}b^{2}$ — the $a$-exponents subtract ($4 - 2$), the $b$-exponents subtract ($3 - 1$), coefficients divide ($48/8$). And a polynomial divides by a monomial **term by term**, each term running the same law: $(12x^{3} + 18x^{2}) \\div 6x^{2} = 2x + 3$, checked by multiplying back — $6x^{2}(2x + 3) = 12x^{3} + 18x^{2}$. The check habit is not decoration: it is the *definition* of division (quotient times divisor equals dividend) doing its job.' },
          { kind: 'para', text: 'But term-by-term division has a boundary the careful reader already smells: every term must *contain* the divisor’s letter part. $(7x^{2} + 5) \\div x$ divides the first term to $7x$ but chokes on the constant — there is no $x$ in $5$ to cancel. When the divisor is itself a compound expression ($x + 6$, not just $x$), term-by-term is hopeless from the first move. What survives is the general machine — the same one that divides 9,437 by 38 in FM chapter 2, wearing letters instead of digits.' },
          { kind: 'heading', text: 'Long Division: the Algorithm, Wearing Letters' },
          { kind: 'para', text: 'The algorithm’s contract: both polynomials arranged in **descending powers of a common letter** (ascending works too — Hall and Knight demonstrate it and this lesson returns to it), missing degrees filled with explicit zero coefficients, then the four moves repeated: **divide the leaders, multiply the whole divisor, subtract, bring down** — stopping when the working remainder’s degree drops **below** the divisor’s. The zero-filling is not bureaucracy: the columns must align by degree or the subtractions mix unlike terms, exactly as digit columns must align by place value in FM’s arithmetic.' },
          { kind: 'figure', caption: 'The long-division tableau for (x² + 11x + 30) ÷ (x + 6): divide the leaders (x² ÷ x = x), multiply the whole divisor, subtract, bring down, repeat — quotient x + 5, remainder 0.', svg: divisionTableauSvg() },
          { kind: 'example', title: 'Divide x² + 11x + 30 by x + 6, and check by multiplication', steps: [
            'Arrange both in descending powers (already so), and divide the leaders: $x^{2} \\div x = x$ — the first quotient term.',
            'Multiply the WHOLE divisor by $x$: $x(x + 6) = x^{2} + 6x$, written under the dividend.',
            'Subtract: $(x^{2} + 11x) - (x^{2} + 6x) = 5x$ — the leader dies; bring down the $+30$: the working remainder is $5x + 30$.',
            'Repeat: $5x \\div x = 5$ — the next quotient term; multiply the whole divisor: $5(x + 6) = 5x + 30$; subtract: $0$.',
            'The remainder is $0$ — below degree 1, the stop rule fires. Quotient $x + 5$, remainder $0$.',
            'Check by multiplication: $(x + 6)(x + 5) = x^{2} + 5x + 6x + 30 = x^{2} + 11x + 30$ — agreement, the definition satisfied.',
          ] },
          { kind: 'example', title: 'Divide x³ + 2x² − 5x + 3 by x − 2, and verify the remainder theorem at x = 2', steps: [
            'Divide the leaders: $x^{3} \\div x = x^{2}$; multiply the whole divisor: $x^{2}(x - 2) = x^{3} - 2x^{2}$; subtract: $4x^{2}$ remains of the first two columns; bring down $-5x$: working $4x^{2} - 5x$.',
            'Again: $4x^{2} \\div x = 4x$; multiply: $4x(x - 2) = 4x^{2} - 8x$; subtract: $3x$; bring down $+3$: working $3x + 3$.',
            'Again: $3x \\div x = 3$; multiply: $3(x - 2) = 3x - 6$; subtract: $9$ — degree 0, below the divisor’s degree 1: STOP.',
            'So, the quotient is $x^{2} + 4x + 3$ and the remainder is $9$.',
            'Now the theorem this lesson will prove: the remainder on dividing by $x - 2$ should be $f(2) = 8 + 8 - 10 + 3 = 9$ — agreement, without dividing at all.',
          ] },
          { kind: 'para', text: 'The non-exact case is the norm, not the exception — and the stop rule is what makes it honest. Hall and Knight’s art. 54: when the division is not exact, carry on **until the remainder is of lower dimensions than the divisor** — lower total degree in the letter part. The remainder is then too small to hide another copy of the divisor: any further subtraction would go negative, the same impossibility that stops FM’s digit division. Division by $x^{3}$, say, must stop by degree 2; division by a linear $x - a$ must stop by degree 0 — the remainder is a bare number.' },
          { kind: 'callout', tone: 'warn', title: 'Caution — zero coefficients for the missing degrees', text: 'The classic long-division wreck: dividing $x^{4} + 16$ by $x + 2$ without writing the missing powers. The dividend must be read $x^{4} + 0x^{3} + 0x^{2} + 0x + 16$ — three explicit zero seats — or the bring-downs misalign and the subtractions mix degrees. Done properly: quotient $x^{3} - 2x^{2} + 4x - 8$ with remainder $32$ — and the remainder theorem confirms it instantly: $f(-2) = 16 + 16 = 32$. Skipped seats do not merely inconvenience; they produce confidently wrong quotients, the polynomial twin of FM’s place-value misalignment. Zero coefficients are cheap; wrong columns are not.' },
          { kind: 'para', text: 'The arrangement itself is a choice. Descending powers is the working default, but Hall and Knight demonstrate the **ascending** arrangement on exactly the kind of divisor that descends handles awkwardly — a divisor written with its constant first. Their example: divide $15a^{4} + 2a^{3} - 39a^{2} - 16a + 10$ by $2 - 4a - 5a^{2}$, ascending, and the quotient reads $5 + 2a - 3a^{2}$ with remainder $0$ — the same work run from the small end. The direction is a bookkeeping preference; the identity it serves does not care.' },
          { kind: 'example', title: 'Divide 15a⁴ + 2a³ − 39a² − 16a + 10 by 2 − 4a − 5a², arranging ascending, and check', steps: [
            'Arrange both in ASCENDING powers of $a$: dividend $10 - 16a - 39a^{2} + 2a^{3} + 15a^{4}$; divisor $2 - 4a - 5a^{2}$.',
            'Divide the leaders: $10 \\div 2 = 5$ — first quotient term; multiply the whole divisor: $5(2 - 4a - 5a^{2}) = 10 - 20a - 25a^{2}$; subtract: $4a - 14a^{2}$ remains; bring down $2a^{3}$.',
            'Again: $4a \\div 2 = 2a$; multiply: $2a(2 - 4a - 5a^{2}) = 4a - 8a^{2} - 10a^{3}$; subtract: $-6a^{2} + 12a^{3}$; bring down $15a^{4}$.',
            'Again: $-6a^{2} \\div 2 = -3a^{2}$; multiply: $-3a^{2}(2 - 4a - 5a^{2}) = -6a^{2} + 12a^{3} + 15a^{4}$; subtract: $0$ — exact.',
            'So, the quotient is $5 + 2a - 3a^{2}$ with remainder $0$.',
            'Check by multiplication: $(2 - 4a - 5a^{2})(5 + 2a - 3a^{2}) = 10 - 16a - 39a^{2} + 2a^{3} + 15a^{4}$ — agreement (the verifier ran this product term by term).',
          ] },
          { kind: 'heading', text: 'The Division Identity: f = d·q + r' },
          { kind: 'para', text: 'Strip the tableau of its layout and one sentence remains — the sentence ANS 2.1 proved for numbers, now with polynomials in every seat: **dividend equals divisor times quotient plus remainder**, with the remainder strictly smaller than the divisor. In family language:' },
          {
            kind: 'equation',
            latex: 'f(x) = d(x) \\cdot q(x) + r(x), \\qquad \\deg r < \\deg d',
            note: 'the division identity — the family-scale division algorithm; the zero polynomial counts as remainder r = 0, and deg d = 0 divisors (nonzero constants) leave remainder 0 — exact division by a constant',
          },
          {
            kind: 'derivation',
            title: 'The division identity — why the algorithm always delivers',
            statement: 'Claim: for polynomials $f$ and $d \\neq 0$ there exist polynomials $q$ and $r$ with $f = d \\cdot q + r$ and $\\deg r < \\deg d$; and the pair $(q, r)$ with that bound is unique.',
            steps: [
              {
                label: 'Existence — the algorithm terminates',
                formula: '\\deg(\\text{working remainder}) \\text{ drops every pass}',
                explanation: 'Each pass subtracts a copy of the divisor timed to kill the current leader: the working remainder’s degree falls by at least 1 every move, so after finitely many passes its degree is below $\\deg d$ — the art. 54 stop rule is a termination proof wearing work clothes.',
              },
              {
                label: 'The accumulated partial quotients',
                formula: 'f = d \\cdot (q_{1} + q_{2} + \\cdots) + r',
                explanation: 'Each pass subtracted $d \\cdot q_{i}$; collecting the partial quotients $q_{i}$ into one $q$ and rearranging gives $f = d \\cdot q + r$ — the tableau is the identity, laid out in rows.',
              },
              {
                label: 'Uniqueness — the degree argument',
                formula: 'd \\cdot (q - q\\prime) = r\\prime - r',
                explanation: 'If $f = dq + r = dq\\prime + r\\prime$ too, then $d(q - q\\prime) = r\\prime - r$. If $q \\neq q\\prime$, the left side has degree $\\deg d + \\deg(q - q\\prime) \\ge \\deg d$ (3.2’s degree theorem — products never drop), while the right side has degree below $\\deg d$ — contradiction. So $q = q\\prime$, and then $r = r\\prime$.',
              },
              {
                label: 'The sweep',
                formula: '1{,}200 \\text{ pairs, zero failures}',
                explanation: 'The verifier ran the full algorithm on 60 dividends against 20 monic divisors — 1,200 pairs — checking $f = dq + r$ and $\\deg r < \\deg d$ on every one, and swept 200 perturbed quotients to confirm none but the true $q$ admits a low remainder.',
              },
            ],
            result: 'f = d·q + r with deg r < deg d — existence by the algorithm, uniqueness by the degree theorem.',
          },
          { kind: 'para', text: 'A curiosity falls out of the identity, and it is the divisor-square case: $(x^{2} + x + 1)^{2} = x^{4} + 2x^{3} + 3x^{2} + 2x + 1$ — 3.3’s multinomial square — so dividing that quartic by $x^{2} + x + 1$ must give the divisor itself back, remainder $0$. Dividend equals divisor times divisor: the identity with $q = d$. The verifier ran it through the algorithm and the quotient returned untouched — a small lie-detector test for the whole machinery. And H&K’s “referred to later” three-letter division lands here too: $a^{3} + b^{3} + c^{3} - 3abc \\div (a + b + c)$ comes out $a^{2} + b^{2} + c^{2} - ab - bc - ca$ exactly — the identity the symmetric polynomials of later courses will keep citing.' },
          { kind: 'heading', text: 'The Remainder Theorem: Evaluation With the Work Skipped' },
          { kind: 'para', text: 'Now the payoff theorem — the one that makes the division algorithm worth having built. Divide $f$ by the linear divisor $x - a$. The identity gives $f(x) = (x - a) \\cdot q(x) + r(x)$ with $\\deg r < \\deg d = 1$: the remainder has degree below 1, so $r$ is a **constant** — a bare number wearing no letters at all. That constant has nowhere to hide: substitute $x = a$ into the identity and the product term dies on the spot, because $(a - a) \\cdot q(a) = 0$ whatever the quotient is.' },
          {
            kind: 'derivation',
            title: 'The remainder theorem, proved',
            statement: 'Claim: the remainder on dividing $f(x)$ by $x - a$ is $f(a)$ — the value of $f$ at $a$, read without dividing.',
            steps: [
              {
                label: 'Run the identity with d = x − a',
                formula: 'f(x) = (x - a) \\cdot q(x) + r(x), \\qquad \\deg r < 1',
                explanation: 'The stop rule pins the remainder’s degree below 1 — so $r$ is a constant $c$ (the zero polynomial included: an exact division leaves $c = 0$).',
              },
              {
                label: 'Substitute x = a — the 1.3 machine, promoted',
                formula: 'f(a) = (a - a) \\cdot q(a) + c = 0 \\cdot q(a) + c = c',
                explanation: 'The substitution kills the product term entirely — the quotient’s value is irrelevant, multiplied by zero. This is the check-by-substitution habit of every lesson so far, now a THEOREM: the value at $a$ was the remainder all along.',
              },
              {
                label: 'Read it in both directions',
                formula: 'r = f(a) \\quad \\text{and} \\quad f(a) = 0 \\Leftrightarrow r = 0',
                explanation: 'Left to right: to find the remainder, evaluate. Right to left: $f$ divides exactly by $x - a$ exactly when $f(a) = 0$ — the second half is the FACTOR THEOREM, and it is chapter 4’s opening engine.',
              },
              {
                label: 'The sweep',
                formula: '360 \\text{ pairs, zero failures}',
                explanation: 'The verifier divided 40 dividends by $x - a$ for every $a$ in $[-4, 4]$ — 360 divisions — and every constant remainder equalled $f(a)$, BigInt-exact.',
              },
            ],
            result: 'r = f(a) — the remainder is the value; evaluation replaces division.',
          },
          {
            kind: 'equation',
            latex: '\\operatorname{rem}_{x - a} f \\; = \\; f(a)',
            note: 'the remainder theorem in one line — the verifier swept it over 360 (dividend, a) pairs; the zero case is the factor theorem: f(a) = 0 forces (x − a) to divide f(x)',
          },
          { kind: 'figure', caption: 'The remainder theorem map: f = (x − a)·q + r with r constant — substitute x = a, the product term dies, and r = f(a). Evaluate, never divide.', svg: remainderMapSvg() },
          { kind: 'example', title: 'Read three remainders without dividing, and one with', steps: [
            'Remainder of $x^{3} - 2x + 1$ on dividing by $x - 1$: $f(1) = 1 - 2 + 1 = 0$ — the remainder is $0$.',
            'Zero remainder means exact division: indeed $x^{3} - 2x + 1 = (x - 1)(x^{2} + x - 1)$ — the polynomial whose value table opened 3.1, and whose $p(1) = 0$ seed this lesson now cashes: the seed was the factor theorem speaking.',
            'Remainder on dividing by $x + 2$? Write the divisor as $x - (-2)$: the theorem reads $f(-2) = -8 + 4 + 1 = -3$ — mind the sign: $x + 2$ evaluates at $-2$.',
            'Remainder of $x^{4} + 16$ on dividing by $x + 2$: $f(-2) = 16 + 16 = 32$ — agreeing with the long division’s remainder, work skipped.',
            'Hence the habit the exam rewards: BEFORE dividing, evaluate — if the remainder is all you need, the division never needs doing.',
          ] },
          { kind: 'para', text: 'The ledger gathers the chapter’s divisions in one view — five rows, every one verified by the script before this lesson was written, every remainder cross-checked by the theorem:' },
          {
            kind: 'table',
            caption: 'The division ledger of chapter 3 — every row verified by script, every remainder cross-read by r = f(a)',
            head: ['Dividend f', 'Divisor d', 'Quotient q', 'Remainder r', 'The theorem’s check'],
            rows: [
              ['$x^{2} + 11x + 30$', '$x + 6$', '$x + 5$', '$0$', '$f(-6) = 36 - 66 + 30 = 0$'],
              ['$x^{3} + 2x^{2} - 5x + 3$', '$x - 2$', '$x^{2} + 4x + 3$', '$9$', '$f(2) = 8 + 8 - 10 + 3 = 9$'],
              ['$x^{3} - 2x + 1$', '$x - 1$', '$x^{2} + x - 1$', '$0$', '$f(1) = 1 - 2 + 1 = 0$ — the 3.1 seed'],
              ['$x^{4} + 16$', '$x + 2$', '$x^{3} - 2x^{2} + 4x - 8$', '$32$', '$f(-2) = 16 + 16 = 32$'],
              ['$15a^{4} + 2a^{3} - 39a^{2} - 16a + 10$', '$2 - 4a - 5a^{2}$', '$5 + 2a - 3a^{2}$', '$0$', 'checked by multiplication'],
            ],
          },
          { kind: 'heading', text: 'The Factor Theorem Glimpsed: Chapter 4’s Door' },
          { kind: 'para', text: 'The remainder theorem’s second half deserves its own name, and mathematics gives it one: the **factor theorem**. If $f(a) = 0$, the remainder on dividing by $x - a$ is $0$ — so $f(x) = (x - a) \\cdot q(x)$ exactly: $x - a$ is a **factor** of $f$. And conversely, if $x - a$ divides $f$, then $f(a) = (a - a) \\cdot q(a) = 0$. One sentence each way: $f(a) = 0$ **if and only if** $(x - a)$ divides $f(x)$. The hunting licence is immediate — to factor a polynomial, hunt values that annihilate it. Test $x^{3} - 7x + 6$: at $x = 1$ it reads $1 - 7 + 6 = 0$ — so $(x - 1)$ is a factor, and long division delivers $x^{2} + x - 6$ for the next chapter to split further.' },
          { kind: 'para', text: 'That is where this chapter ends and the next begins — deliberately at the door, not through it. Chapter 4 turns the whole identity shelf of 3.3 plus this hunting licence into **factorization**: common factors, the middle-term hunt run in earnest, the identities read backwards as formulas, and the factor theorem doing systematic work on cubics. The polynomials’ fourth operation is now fully mapped: division never leaves the family without leaving a receipt — quotient, remainder, and the identity binding them — and when the receipt reads zero, multiplication is undone and the family’s products give back their factors.' },
          { kind: 'callout', tone: 'insight', title: 'Note — the check-by-substitution habit was always this theorem', text: 'Every lesson in this book has ended its illustrations with “check at a chosen value”. This lesson explains why the habit keeps working: evaluating an expanded form and its factored form at the same point compares two remainders against the SAME divisor — agreement is the division identity’s uniqueness in disguise. ANS 10.2’s casting-out-nines was the same theorem on numbers: the residue of a sum is the sum of the residues, because evaluation is a ring operation. Evaluation is not a trick appended to algebra; it is the shadow the division identity casts on every value.' },
          { kind: 'callout', tone: 'historical', title: 'Historical note — detached coefficients and Ruffini’s rows', text: 'The tableau’s letters are load-bearing only for the beginner: every coefficient of the quotient is computed from coefficients alone — the letters ride along untouched. Hall and Knight print this observation as the method of **detached coefficients** (their arts. 45 and 51), turning $x^{2} + 11x + 30 \\div x + 6$ into the bare row $1, 11, 30 \\div 1, 6$. Pushed further the rows compact into the scheme credited to Paolo Ruffini in the first decade of the nineteenth century (sources date his paper to 1804, with a fuller treatment later in the decade): bring the lead coefficient down, multiply by the divisor’s root, add — synthetic division, the machine-era shortcut that powers today’s polynomial code. The algorithm this lesson teaches is the full-width original; the rows are its compressed descendant, waiting in chapter 4’s toolkit.' },
          { kind: 'para', text: 'The lesson’s working summary: monomials divide by the index law (coefficients divide, exponents subtract, per letter); polynomials divide by the four-move algorithm on aligned powers with zero seats filled; the receipts bind as $f = d \\cdot q + r$ with $\\deg r < \\deg d$, uniquely; linear divisors hand their remainders over by evaluation alone ($r = f(a)$); and zero remainders are factors announcing themselves. Division, refused in 3.2, is hereby domesticated.' },
          { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'Polynomial division is a reliable marks engine once the moves are owned. The recurring items: monomial divisions at speed ($48a^{4}b^{3} \\div 8a^{2}b$ — per-letter exponents); long division with the zero-seat trap ($x^{4} + 16 \\div x + 2$ — fill $0x^{3}, 0x^{2}, 0x$ or misalign); find $k$ so the remainder takes a given value ($x^{3} + kx^{2} - 5x + 3$ leaving remainder $1$ at $x + 1$ — evaluate: $k + 7 = 1$, so $k = -6$); remainder-theorem one-liners (remainder of $2x^{3} - 5x + 1$ at $x + 1$ — evaluate at $-1$: $4$); quotient-degree reads without dividing (degree $5 \\div$ degree $2$ gives degree $3$); and show-that items — $x - 3$ divides $x^{3} - 6x^{2} + 11x - 6$ because $f(3) = 0$, then long division yields $x^{2} - 3x + 2$. Competitive papers add the factor-theorem root hunt on cubics (test $x = \\pm 1$ first — the divisors of the constant term) and the divisor-square curiosity ($x^{4} + 2x^{3} + 3x^{2} + 2x + 1 \\div x^{2} + x + 1$). Every answer checks by multiplication — the definition itself.' },
          { kind: 'terms', items: [
            { term: 'Index law for division', def: '$a^{m} \\div a^{n} = a^{m-n}$ — coefficients divide, exponents subtract, per letter. The product law of 2.1 run backwards; its edge case $a^{m} \\div a^{m} = a^{0} = 1$ is 2.2’s repair paying rent.' },
            { term: 'Long division of polynomials', def: 'The four-move algorithm — divide the leaders, multiply the WHOLE divisor, subtract, bring down — repeated on powers-aligned polynomials until the working remainder’s degree drops below the divisor’s.' },
            { term: 'Zero coefficients', def: 'The explicit $0x^{k}$ seats filling missing degrees before dividing ($x^{4} + 16 = x^{4} + 0x^{3} + 0x^{2} + 0x + 16$). Skipping them misaligns the columns — the classic wreck.' },
            { term: 'The stop rule', def: 'Carry the division on until the remainder is of lower degree than the divisor (H&K art. 54) — the point where no further copy of the divisor can be subtracted. It is also the algorithm’s termination proof.' },
            { term: 'The division identity', def: '$f = d \\cdot q + r$ with $\\deg r < \\deg d$ — the family-scale division algorithm, ANS 2.1 wearing letters. Existence by the algorithm, uniqueness by the degree theorem (products never drop).' },
            { term: 'The remainder theorem', def: 'The remainder on dividing $f(x)$ by $x - a$ is $f(a)$ — a constant, read by evaluation alone. Proof: the identity’s product term dies at $x = a$.' },
            { term: 'The factor theorem', def: '$f(a) = 0$ if and only if $(x - a)$ divides $f(x)$ — the remainder theorem’s zero case, and chapter 4’s hunting licence: annihilating values are factor finders.' },
            { term: 'Detached coefficients', def: 'The observation that the algorithm’s arithmetic never touches the letters — coefficients alone suffice (H&K arts. 45/51), compacting to Ruffini’s synthetic rows. The tableau is the readable form; the rows are the machine form.' },
          ] },
          {
            kind: 'quiz',
            title: 'Check yourself',
            items: [
              {
                q: '$(x^{2} + 7x + 12) \\div (x + 4)$ equals',
                options: ['$x + 3$', '$x - 3$', '$x + 8$', '$x^{2} + 3$'],
                answer: 0,
                explain: 'Leaders: $x^{2} \\div x = x$; subtract $x(x + 4) = x^{2} + 4x$ from $x^{2} + 7x$: $3x$ remains; bring down $12$; $3x \\div x = 3$; subtract $3(x + 4) = 3x + 12$: remainder $0$. Option 2 fails the check — $(x + 4)(x - 3) = x^{2} + x - 12$, not the dividend; option 3 added instead of subtracting on the second pass ($7 + 4$ is not a legal move — subtraction kills the leader); option 4 has the wrong degree entirely (deg f − deg d = 1, the degree arithmetic of 3.1/3.2). And the factor-theorem read: $f(-4) = 16 - 28 + 12 = 0$ — exact, as promised.',
              },
              {
                q: 'The remainder when $x^{3} - 2x + 5$ is divided by $x - 1$ is',
                options: ['$3$', '$4$', '$5$', '$6$'],
                answer: 1,
                explain: 'The remainder theorem: evaluate at $x = 1$ — $f(1) = 1 - 2 + 5 = 4$. No division needed. Option 1 dropped the constant’s sign on the way ($1 - 2 + 5$ mis-collected); option 3 reported the constant term alone (the theorem evaluates the WHOLE polynomial); option 4 slipped the arithmetic ($1 - 2 = -1$, then $-1 + 5 = 4$, never $6$). Check by long division if doubtful — the quotient $x^{2} + x - 1$ leaves exactly $4$.',
              },
              {
                q: 'In the division identity $f = d \\cdot q + r$, the remainder must satisfy',
                options: ['$\\deg r < \\deg q$', '$r$ is always $0$', '$\\deg r < \\deg d$', '$\\deg r = \\deg f$'],
                answer: 2,
                explain: 'The stop rule IS the theorem: the remainder’s degree sits strictly below the divisor’s — that is what makes the pair unique and the remainder unable to hide another copy of $d$. Option 1 compares against the wrong polynomial (the quotient’s degree is irrelevant to the bound); option 2 forgets the inexact case — $x^{3} + 2x^{2} - 5x + 3 \\div x - 2$ leaves $9$; option 4 inverts the whole point (the remainder is the SMALLEST polynomial that completes the identity, below $d$, not at $f$’s height).',
              },
              {
                q: 'Which of these polynomials has $(x + 3)$ as a factor?',
                options: ['$x^{2} - 9$', '$x^{2} + 9$', '$x^{2} - 3x$', '$x^{3} - 27$'],
                answer: 0,
                explain: 'The factor theorem: $(x + 3)$ is a factor exactly when $f(-3) = 0$ — mind the sign, the divisor is $x - (-3)$. Option 1: $(-3)^{2} - 9 = 0$ — YES (indeed $x^{2} - 9 = (x + 3)(x - 3)$, the difference of squares of 3.3 read backwards); option 2: $9 + 9 = 18 \\neq 0$; option 3: $9 + 9 = 18 \\neq 0$; option 4: $-27 - 27 = -54 \\neq 0$ — that one wants $(x - 3)$, not $(x + 3)$. The sign of the divisor’s constant is the sign the evaluation flips.',
              },
              {
                q: 'A polynomial of degree 5 is divided by a polynomial of degree 2. The degree of the quotient is',
                options: ['$5$', '$3$', '$2$', '$10$'],
                answer: 1,
                explain: 'The degree arithmetic of the division identity: $\\deg f = \\deg(d \\cdot q) + \\deg r$-speak — since $\\deg r < \\deg d$, the quotient carries $\\deg f - \\deg d = 5 - 2 = 3$. Option 1 forgot that division moves the leader DOWN; option 3 reported the divisor’s degree; option 4 multiplied instead of divided (the 3.2 theorem’s opposite direction). The remainder, if any, has degree at most $1$ — the ledger’s fourth row is the worked instance.',
              },
            ],
          },
          {
            kind: 'exercises',
            title: 'Exercises 3.4',
            sets: [
              {
                level: 'L1',
                questions: [
                  {
                    q: 'Divide $36x^{5}$ by $6x^{2}$.',
                    solution: [
                      'Coefficients divide: $36 \\div 6 = 6$; exponents subtract: $5 - 2 = 3$ — the index law for division.',
                      'So, $36x^{5} \\div 6x^{2} = 6x^{3}$.',
                      'Check by multiplication: $6x^{2} \\cdot 6x^{3} = 36x^{5}$ — agreement, the definition satisfied.',
                    ],
                    answer: '$6x^{3}$',
                  },
                  {
                    q: 'Divide $-54y^{4}$ by $9y$.',
                    solution: [
                      'Coefficients: $-54 \\div 9 = -6$ (the sign law — unlike signs give minus); exponents: $4 - 1 = 3$.',
                      'So, $-54y^{4} \\div 9y = -6y^{3}$.',
                      'Check: $9y \\cdot (-6y^{3}) = -54y^{4}$ — agreement.',
                    ],
                    answer: '$-6y^{3}$',
                  },
                  {
                    q: 'Divide $48a^{4}b^{3}$ by $8a^{2}b$.',
                    solution: [
                      'Per letter: the $a$-exponents subtract $4 - 2 = 2$; the $b$-exponents subtract $3 - 1 = 2$; coefficients $48 \\div 8 = 6$.',
                      'So, $48a^{4}b^{3} \\div 8a^{2}b = 6a^{2}b^{2}$.',
                      'Check: $8a^{2}b \\cdot 6a^{2}b^{2} = 48a^{4}b^{3}$ — agreement, both letters honest.',
                    ],
                    answer: '$6a^{2}b^{2}$',
                  },
                ],
              },
              {
                level: 'L2',
                questions: [
                  {
                    q: 'Divide $(12x^{3} + 18x^{2})$ by $6x^{2}$.',
                    solution: [
                      'Term by term: $12x^{3} \\div 6x^{2} = 2x$; $18x^{2} \\div 6x^{2} = 3$.',
                      'So, the quotient is $2x + 3$.',
                      'Check: $6x^{2}(2x + 3) = 12x^{3} + 18x^{2}$ — agreement.',
                    ],
                    answer: '$2x + 3$',
                  },
                  {
                    q: 'Divide $(10x^{4} - 15x^{2} + 5x)$ by $5x$.',
                    solution: [
                      'Term by term — note the zero seat for $x^{3}$: $10x^{4} \\div 5x = 2x^{3}$; $-15x^{2} \\div 5x = -3x$; $5x \\div 5x = 1$.',
                      'So, the quotient is $2x^{3} - 3x + 1$.',
                      'Check: $5x(2x^{3} - 3x + 1) = 10x^{4} - 15x^{2} + 5x$ — agreement, the missing degree surviving the round trip.',
                    ],
                    answer: '$2x^{3} - 3x + 1$',
                  },
                  {
                    q: 'Divide $(9a^{3}b^{2} - 6a^{2}b)$ by $3a^{2}b$.',
                    solution: [
                      'Term by term: $9a^{3}b^{2} \\div 3a^{2}b = 3ab$; $-6a^{2}b \\div 3a^{2}b = -2$.',
                      'So, the quotient is $3ab - 2$.',
                      'Check: $3a^{2}b(3ab - 2) = 9a^{3}b^{2} - 6a^{2}b$ — agreement.',
                    ],
                    answer: '$3ab - 2$',
                  },
                ],
              },
              {
                level: 'L3',
                questions: [
                  {
                    q: 'Divide $(x^{2} + 9x + 20)$ by $(x + 5)$ by long division.',
                    solution: [
                      'Divide the leaders: $x^{2} \\div x = x$; multiply the whole divisor: $x(x + 5) = x^{2} + 5x$; subtract: $4x$; bring down $20$.',
                      'Again: $4x \\div x = 4$; multiply: $4(x + 5) = 4x + 20$; subtract: $0$ — exact.',
                      'So, the quotient is $x + 4$ with remainder $0$.',
                      'Check: $(x + 5)(x + 4) = x^{2} + 9x + 20$ — agreement; and the theorem’s read: $f(-5) = 25 - 45 + 20 = 0$.',
                    ],
                    answer: '$x + 4$, remainder $0$',
                  },
                  {
                    q: 'Divide $(x^{2} - 3x - 28)$ by $(x + 4)$ by long division.',
                    solution: [
                      'Leaders: $x^{2} \\div x = x$; multiply: $x(x + 4) = x^{2} + 4x$; subtract: $-7x$; bring down $-28$.',
                      'Again: $-7x \\div x = -7$; multiply: $-7(x + 4) = -7x - 28$; subtract: $0$ — exact.',
                      'So, the quotient is $x - 7$ with remainder $0$.',
                      'Check: $(x + 4)(x - 7) = x^{2} - 3x - 28$ — agreement; $f(-4) = 16 + 12 - 28 = 0$.',
                    ],
                    answer: '$x - 7$, remainder $0$',
                  },
                  {
                    q: 'Divide $(2x^{2} + 5x - 3)$ by $(2x - 1)$.',
                    solution: [
                      'Leaders: $2x^{2} \\div 2x = x$; multiply the WHOLE divisor: $x(2x - 1) = 2x^{2} - x$; subtract: $6x$; bring down $-3$.',
                      'Again: $6x \\div 2x = 3$; multiply: $3(2x - 1) = 6x - 3$; subtract: $0$ — exact (a non-monic divisor, handled by dividing leading COEFFICIENTS).',
                      'So, the quotient is $x + 3$ with remainder $0$.',
                      'Check: $(2x - 1)(x + 3) = 2x^{2} + 6x - x - 3 = 2x^{2} + 5x - 3$ — agreement.',
                    ],
                    answer: '$x + 3$, remainder $0$',
                  },
                ],
              },
              {
                level: 'L4',
                questions: [
                  {
                    q: 'Find the remainder when $(x^{3} + 3x^{2} - 4x + 2)$ is divided by $(x - 2)$ — without dividing.',
                    solution: [
                      'The remainder theorem: the remainder is $f(a)$ with $a = 2$.',
                      'Evaluate: $f(2) = 8 + 12 - 8 + 2 = 14$.',
                      'So, the remainder is $14$ — no division performed.',
                      'Check honestly: long division gives quotient $x^{2} + 5x + 6$ and remainder $14$ — and $(x - 2)(x^{2} + 5x + 6) + 14 = x^{3} + 3x^{2} - 4x + 2$ — agreement.',
                    ],
                    answer: '$14$',
                  },
                  {
                    q: 'Find the remainder when $(2x^{3} - 5x + 1)$ is divided by $(x + 1)$ — and mind the sign.',
                    solution: [
                      'Write the divisor as $x - (-1)$: the theorem evaluates at $a = -1$.',
                      'Evaluate: $f(-1) = -2 + 5 + 1 = 4$ — the zero seat for $x^{2}$ riding quietly.',
                      'So, the remainder is $4$.',
                      'Check: long division gives quotient $2x^{2} - 2x - 3$ and remainder $4$ — $(x + 1)(2x^{2} - 2x - 3) + 4 = 2x^{3} - 5x + 1$ — agreement.',
                    ],
                    answer: '$4$',
                  },
                ],
              },
              {
                level: 'L5',
                questions: [
                  {
                    q: 'Find $k$ so that $(x^{3} + kx^{2} - 5x + 3)$ leaves remainder $1$ when divided by $(x + 1)$.',
                    solution: [
                      'The remainder theorem with $a = -1$: the remainder is $f(-1) = -1 + k + 5 + 3 = k + 7$.',
                      'Set it equal to the demanded $1$: $k + 7 = 1$.',
                      'So, $k = -6$.',
                      'Check: with $k = -6$, $f(-1) = -1 - 6 + 5 + 3 = 1$ — the condition met (and $k = -5$ would leave $2$ — the near miss priced).',
                    ],
                    answer: '$k = -6$',
                  },
                  {
                    q: 'Show that $(x - 3)$ is a factor of $(x^{3} - 6x^{2} + 11x - 6)$, and find the quotient.',
                    solution: [
                      'The factor theorem: evaluate $f(3) = 27 - 54 + 33 - 6 = 0$ — the remainder is $0$, so $(x - 3)$ divides.',
                      'Long division: $x^{3} \\div x = x^{2}$; subtract $x^{3} - 3x^{2}$: $-3x^{2}$; $-3x^{2} \\div x = -3x$; subtract $-3x^{2} + 9x$: $2x$; $2x \\div x = 2$; subtract $2x - 6$: $0$.',
                      'So, $x^{3} - 6x^{2} + 11x - 6 = (x - 3)(x^{2} - 3x + 2)$ — quotient $x^{2} - 3x + 2$, remainder $0$.',
                      'Hence the hunting licence used once: chapter 4 will hunt the quadratic further.',
                    ],
                    answer: '$(x - 3)$ is a factor; quotient $x^{2} - 3x + 2$',
                  },
                ],
              },
              {
                level: 'L6',
                questions: [
                  {
                    q: 'Divide $(x^{4} - 1)$ by $(x + 1)$ and by $(x - 1)$, and state which identity of 3.3 the pair of results proves.',
                    solution: [
                      'Divide by $(x + 1)$: leaders $x^{4} \\div x = x^{3}$; subtract $x^{4} + x^{3}$: $-x^{3}$; continue: $-x^{2}$, $+x$, $-1$ — quotient $x^{3} - x^{2} + x - 1$, remainder $0$.',
                      'Divide by $(x - 1)$: the mirrored run gives quotient $x^{3} + x^{2} + x + 1$, remainder $0$ — the factor theorem agrees ($f(1) = f(-1) = 0$).',
                      'Multiply back both ways: $(x + 1)(x^{3} - x^{2} + x - 1) = x^{4} - 1$ and $(x - 1)(x^{3} + x^{2} + x + 1) = x^{4} - 1$.',
                      'Now, multiply the two divisors: $(x + 1)(x - 1) = x^{2} - 1$ — so $x^{4} - 1 = (x^{2} - 1)(x^{3} + x^{2} + x + 1) \\div (x^{2} + x + 1)$-style regrouping lands on the difference-of-squares chain: $x^{4} - 1 = (x^{2} + 1)(x^{2} - 1)$, verified by the script.',
                      'Hence the pair of divisions proves the two-step difference of squares $x^{4} - 1 = (x^{2} + 1)(x + 1)(x - 1)$ — 3.3’s chained identity, now earned from division.',
                    ],
                    answer: 'quotients $x^{3} - x^{2} + x - 1$ and $x^{3} + x^{2} + x + 1$, both remainder $0$ — proving $x^{4} - 1 = (x^{2} + 1)(x^{2} - 1)$',
                  },
                ],
              },
            ],
          },
          { kind: 'formula', name: 'The index law for division', latex: 'a^{m} \\div a^{n} = a^{m - n}', note: 'coefficients divide, exponents subtract — per letter; the edge case $a^{m} \\div a^{m} = a^{0} = 1$ is 2.2’s repair cashed' },
          { kind: 'formula', name: 'The division identity', latex: 'f(x) = d(x) \\cdot q(x) + r(x), \\qquad \\deg r < \\deg d', note: 'the family-scale division algorithm — existence by the four moves, uniqueness by the degree theorem; ANS 2.1 wearing letters' },
          { kind: 'formula', name: 'The remainder theorem', latex: '\\text{remainder of } f \\div (x - a) \\; = \\; f(a)', note: 'evaluate, never divide — and its zero case is the factor theorem: $f(a) = 0 \\Leftrightarrow (x - a) \\mid f(x)$ (ch. 4’s door)' },
        ],
      },
    ],
  plannedLessons: [],
}
