import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 4: Factorization
 *
 * LESSONS WRITTEN: 4.1 Common Factors and Grouping
 *                  (run 73 — quiz keys 0/1/0/0/2, 14 exercises, two
 *                  figures, verify-book3-ch04.ts sections A–C + F green)
 *                  4.2 Factoring Quadratic Trinomials (run 73 — quiz keys
 *                  2/1/3/1/3, sections D–E + G) — the chapter OPENS 2/4
 *                  at run 73; 4.3 + 4.4 + the unit-4 review close it at
 *                  run 74.
 *
 * References for this unit: the Drive copy `Elementary-Algebra_text.pdf`
 * is H. S. Hall & S. R. Knight, *Elementary Algebra for Schools*
 * (Macmillan, first edition 1885; this 1942 reprint) — its chapter on
 * "Factorisation" (book pp. 85 ff.: resolution into factors, the simple
 * cases by inspection) informed the arc of this run: factoring as
 * multiplication undone on the 3.2–3.3 shelf, the GCF-of-terms anatomy
 * (FM ch. 3's HCF wearing letters), grouping with the regrouping
 * discipline, the monic middle-term hunt with the gauge p² − 4q justified,
 * and the AC split closing by grouping. Banked keys reused:
 * ncert-math9-ch2-polynomials (the zero/factor bridge), ncert-math8-
 * ch12-factorisation (the school canon's factorisation methods of §12.2),
 * euclid-elements-book-vii (the greatest-common-measure history),
 * khattar-qa-4e (the exam-corner shapes), cengage-jee-style (the
 * presentation contract), harriot-1631-praxis (the products-first view —
 * 4.2's history callout).
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (4.1): the reversible film. Header (30,18,660,44); LEFT    */
/* panel (30,84,330,220) "forward" with 2 cell boxes 130x54 at        */
/* (60,150),(200,150); RIGHT panel (400,84,290,220) "backward" with 3  */
/* note boxes 250x56 at (415,104),(415,168),(415,232); band           */
/* (30,284,660,40) with 2 result boxes 200x24 at (60,292),(300,292).  */
/* Geometry pinned in verify-book3-ch04.ts section C, audited in F.   */
/* ------------------------------------------------------------------ */

function reversibleFilmSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Multiplication undone. Forward: the distributive grid builds 6 x squared plus 15 x from 3 x times the bracket 2 x plus 5. Backward: the GCF hunt reads the built sum back into its factors.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">multiplication, undone</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">the film runs both ways — the grid builds the sum; the GCF hunt recovers the factors</text>')
  // LEFT panel: forward — the distributive grid
  parts.push('<rect x="30" y="84" width="330" height="210" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">forward — 3.2’s grid builds the product</text>')
  parts.push('<rect x="60" y="150" width="130" height="54" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="125" y="182" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">3x · 2x = 6x²</text>')
  parts.push('<rect x="200" y="150" width="130" height="54" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="265" y="182" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">3x · 5 = 15x</text>')
  parts.push('<text x="195" y="234" font-size="11" fill="#6b7a72" text-anchor="middle">distribute — every term meets every term</text>')
  parts.push('<text x="195" y="264" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">3x(2x + 5) = 6x² + 15x</text>')
  parts.push('<text x="195" y="288" font-size="10.5" fill="#6b7a72" text-anchor="middle">product → sum (expansion)</text>')
  // RIGHT panel: backward — the GCF hunt
  parts.push('<rect x="400" y="84" width="290" height="210" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">backward — this lesson undoes it</text>')
  const notes: [string, string][] = [
    ['hunt the GCF of 6x² and 15x', 'HCF(6, 15) = 3 · the shared letter x → 3x'],
    ['extract it from both terms', '6x² + 15x = 3x(2x + 5)'],
    ['check by expansion', 'the grid returns — the identity holds'],
  ]
  notes.forEach(([title, sub], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="415" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="540" y="${y + 22}" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="540" y="${y + 40}" font-size="10.5" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="296" width="660" height="40" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="300" width="200" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="160" y="316" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">3x(2x + 5)</text>')
  parts.push('<rect x="300" y="300" width="200" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="400" y="316" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">= 6x² + 15x</text>')
  parts.push('<text x="618" y="316" font-size="11" fill="#6b7a72" text-anchor="middle">one identity, two readings</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (4.1): the grouping machine. Header (30,18,660,44); LEFT   */
/* panel (30,84,350,220) with 4 term boxes 70x44 at (45,120),(125,120),*/
/* (205,120),(285,120) + 2 pairing bands 150x30 at (45,220),(205,220); */
/* RIGHT panel (410,84,280,220) with 3 note boxes 250x56 at (425,104), */
/* (425,168),(425,232); band (30,284,660,44) with 2 result boxes       */
/* 260x28 at (60,292),(400,292). Pinned in section C, audited in F.    */
/* ------------------------------------------------------------------ */

function groupingMachineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The grouping machine for x cubed plus 3 x squared plus 2 x plus 6. The four terms split into two pairs, each pair extracts its own common factor, and the two inner brackets match — so the match itself is a common factor. Result: the bracket x plus 3 times the bracket x squared plus 2.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the grouping machine</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">four terms, two pairs, one matched bracket — the common-factor move applied twice</text>')
  // LEFT panel: the four terms and the two pairings
  parts.push('<rect x="30" y="84" width="350" height="210" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="205" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">x³ + 3x² + 2x + 6 — pair the terms</text>')
  const terms = ['x³', '3x²', '2x', '6']
  terms.forEach((t, i) => {
    const x = 45 + i * 80
    parts.push(`<rect x="${x}" y="120" width="70" height="44" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="${x + 35}" y="147" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">${t}</text>`)
  })
  // pairing arcs (dashed paths, no rects) — routed BELOW the term row so
  // they never enter the title's or the boxes' text
  parts.push('<path d="M 80 172 Q 120 192 160 172" fill="none" stroke="#4d7c0f" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<path d="M 240 172 Q 280 192 320 172" fill="none" stroke="#4d7c0f" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<rect x="45" y="220" width="150" height="30" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="120" y="240" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">pair 1 extracts x²: (x + 3)</text>')
  parts.push('<rect x="205" y="220" width="150" height="30" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="280" y="240" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">pair 2 extracts 2: (x + 3)</text>')
  parts.push('<text x="205" y="280" font-size="11" fill="#4d7c0f" text-anchor="middle" font-weight="700">the brackets MATCH — the match is the common factor</text>')
  // RIGHT panel: the three moves
  parts.push('<rect x="410" y="84" width="280" height="210" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="550" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">the three moves</text>')
  const moves: [string, string][] = [
    ['split the four terms', 'into two pairs — order is free (addition is commutative)'],
    ['extract each pair’s GCF', 'the inner brackets must come out IDENTICAL'],
    ['extract the match itself', 'x²(x + 3) + 2(x + 3) = (x + 3)(x² + 2)'],
  ]
  moves.forEach(([title, sub], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="425" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="550" y="${y + 22}" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="550" y="${y + 40}" font-size="10" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // result band
  parts.push('<rect x="30" y="300" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="308" width="260" height="28" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="190" y="327" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">x³ + 3x² + 2x + 6 = (x + 3)(x² + 2)</text>')
  parts.push('<rect x="400" y="308" width="260" height="28" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="530" y="327" font-size="11.5" fill="#365314" text-anchor="middle">check: expand — the four terms return</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 3 (4.2): the two dials and the gauge. Header (30,18,660,44); */
/* LEFT panel (30,84,330,210) with 2 dial boxes 120x50 at (60,130),    */
/* (200,130) + 1 pair box 170x50 at (105,225); RIGHT panel             */
/* (400,84,290,210) with 3 verdict note boxes 250x56 at (415,114),     */
/* (415,174),(415,234); band (30,296,660,40) with 2 result boxes       */
/* 260x24 at (60,300),(400,300). Pinned in section E, audited in G.    */
/* ------------------------------------------------------------------ */

function huntDialsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The middle-term hunt as two dials: the product dial q proposes candidate pairs, the sum dial p chooses, and the gauge p squared minus 4 q decides whether the integer pair exists at all. Three verdicts: gauge negative refuses, gauge zero is the double square, gauge a positive perfect square yields the pair.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the two dials and the gauge</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">the product dial proposes, the sum dial chooses — the gauge decides whether any pair exists</text>')
  // LEFT panel: the dials
  parts.push('<rect x="30" y="84" width="330" height="210" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">hunting the pair for x² + px + q</text>')
  parts.push('<rect x="60" y="130" width="120" height="50" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="120" y="160" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">PRODUCT q</text>')
  parts.push('<rect x="200" y="130" width="120" height="50" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="260" y="160" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">SUM p</text>')
  parts.push('<path d="M 120 184 Q 130 210 155 222" fill="none" stroke="#4d7c0f" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<path d="M 260 184 Q 250 210 225 222" fill="none" stroke="#4d7c0f" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<rect x="105" y="225" width="170" height="50" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="190" y="246" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">the pair (a, b)</text>')
  parts.push('<text x="190" y="264" font-size="10.5" fill="#6b7a72" text-anchor="middle">ab = q · a + b = p</text>')
  // RIGHT panel: the three verdicts of the gauge
  parts.push('<rect x="400" y="84" width="290" height="210" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">the gauge decides</text>')
  const verdicts: [string, string][] = [
    ['gauge < 0 — the hunt refuses', 'no real pair at all (x² + x + 1: −3)'],
    ['gauge = 0 — the double case', 'a = b: the trinomial square (x + a)²'],
    ['gauge a perfect square > 0', 'the integer pair exists: (x + a)(x + b)'],
  ]
  verdicts.forEach(([title, sub], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="415" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="540" y="${y + 22}" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="540" y="${y + 40}" font-size="10" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="296" width="660" height="40" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="300" width="260" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="190" y="316" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">p² − 4q = (a − b)²  — the gauge</text>')
  parts.push('<rect x="400" y="300" width="260" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="530" y="316" font-size="11" fill="#365314" text-anchor="middle">x² + 7x + 12: 49 − 48 = 1 → (4, 3)</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 4 (4.2): the AC pipeline. Header (30,18,660,44); 4 station   */
/* boxes 150x70 at (40,110),(210,110),(380,110),(550,110); 2 split     */
/* boxes 260x44 at (60,230),(400,230); band (30,296,660,44) with 1     */
/* result box 300x28 at (210,304). Pinned in section E, audited in G.  */
/* ------------------------------------------------------------------ */

function acPipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The AC split pipeline for 6 x squared plus 19 x plus 15. Four stations: multiply a and c to get 90; hunt two numbers with sum 19 and product 90, namely 9 and 10; split the middle term and group; collect the product 2 x plus 3 times 3 x plus 5, checked by expansion. The folding identity absorbs the one sixth.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the AC pipeline — 6x² + 19x + 15</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">multiply · hunt · split and group · collect — with the folding identity absorbing the 1/a</text>')
  // the four stations
  const stations: [string, string, string][] = [
    ['multiply', 'a · c = 6 · 15 = 90', 'the AC dial'],
    ['hunt', 'sum 19 · product 90', 'the pair: 9 and 10'],
    ['split + group', '6x² + 9x + 10x + 15', '4.1’s machine closes'],
    ['collect', '(2x + 3)(3x + 5)', 'check: expand ✓'],
  ]
  stations.forEach(([title, l1, l2], i) => {
    const x = 40 + i * 170
    const cx = x + 75
    parts.push(`<rect x="${x}" y="110" width="150" height="70" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>`)
    parts.push(`<text x="${cx}" y="132" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${cx}" y="152" font-size="10.5" fill="#365314" text-anchor="middle">${l1}</text>`)
    parts.push(`<text x="${cx}" y="168" font-size="10" fill="#6b7a72" text-anchor="middle">${l2}</text>`)
    if (i < 3) parts.push(`<path d="M ${x + 150} 145 L ${x + 170} 145" stroke="#4d7c0f" stroke-width="1.5"/>`)
  })
  // the split row
  parts.push('<rect x="60" y="230" width="260" height="44" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="190" y="257" font-size="10.5" fill="#365314" text-anchor="middle" font-weight="700">6x² + 9x + 10x + 15 = 3x(2x + 3) + 5(2x + 3)</text>')
  parts.push('<rect x="400" y="230" width="260" height="44" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="530" y="251" font-size="10.5" fill="#365314" text-anchor="middle" font-weight="700">the folding: (6x + 9)(6x + 10) = 6(6x² + 19x + 15)</text>')
  parts.push('<text x="530" y="267" font-size="9.5" fill="#6b7a72" text-anchor="middle">3 and 2 absorb the 1/6 — grouping did it lawfully</text>')
  // result band
  parts.push('<rect x="30" y="296" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="210" y="304" width="300" height="28" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="360" y="322" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">6x² + 19x + 15 = (2x + 3)(3x + 5) — check by expansion</text>')
  return parts.join('')
}

export const chapter04: Chapter = {
  number: 4,
  slug: 'factorization',
  title: 'Factorization',
  summary:
    'Multiplication undone, systematically: common factors and grouping as the two moves every factorization starts from, quadratic trinomials factored by the middle-term method with its existence justified, the special identities read backwards (difference of squares, perfect squares, sum and difference of cubes), and the factor theorem turning the remainder theorem into a cubic-hunting machine.',
  status: 'in-progress',
  lessons: [
    {
      id: 'al-common-factors-and-grouping',
      number: '4.1',
      title: 'Common Factors and Grouping',
      concepts: [
        'factoring: multiplication undone',
        'the common factor',
        'the greatest common factor of terms',
        'complete factorization',
        'relatively prime terms',
        'factor by grouping',
        'the regrouping discipline',
        'the sum-of-squares boundary',
      ],
      objectives: [
        'read the distributive law backwards — ca + cb = c(a + b) as the first factorization',
        'compute the GCF of terms: the HCF of the coefficients wearing the shared letters at their lowest powers',
        'extract the complete GCF, refuse partial extractions, and price the sign convention on negative leading coefficients',
        'factor four-term expressions by grouping — pairing, the distributed minus, and the reorder when the natural pairing hides the match',
        'state and use the honest boundary: a sum of squares refuses to factor over the integers, and say exactly why',
        'check every factorization by expansion — the identity charter of 3.3 made into a habit',
      ],
      prerequisites: ['al-adding-subtracting-and-multiplying-polynomials', 'fm-highest-common-factor'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math9-ch2-polynomials', 'euclid-elements-book-vii', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lessons 3.2 and 3.3 taught multiplication to run forward: the distributive grid built sums from products, and the special identities built them faster. This chapter runs the film backwards. Given the **sum** — the built polynomial — the question becomes: what product was it built from? That question is **factorization**, and it is the load-bearing move of the rest of this book: the equations of chapters 5 and 9 are solved by it, the fractions of chapter 8 are simplified by it, and the exam papers price it by the second. The chapter opens with the two moves that start every factorization — extracting the **common factor** and **grouping** — and closes with the honest boundary: the expressions that refuse to factor at all.' },
        { kind: 'para', text: 'The plan of this lesson: read the distributive law backwards and define the trade precisely; build the **greatest common factor of terms** — FM chapter 3’s HCF wearing letters — and learn to extract it *completely*, signs priced; then group four-term expressions into two pairs whose inner brackets match, reordering when the natural pairing hides the match; and finally prove the boundary theorem — the sum of squares that refuses — with an argument that already uses this lesson’s own machinery. Every claim is checked the same way: by expansion, because every factorization is an identity in 3.3’s exact sense.' },
        { kind: 'heading', text: 'Factoring: the Film Run Backwards' },
        { kind: 'para', text: 'The definition follows the classical texts in spirit (Hall and Knight open their factorisation chapter by "resolving into factors"), but the precision comes from 3.3’s identity charter. A **factorization over the integers** writes a polynomial as a **product** of polynomials of lower degree with integer coefficients — and the sentence must be an **identity**: true for every value of the letter, not an equation to be solved. Thus $x^{3} + 3x^{2} + 2x + 6 = (x + 3)(x^{2} + 2)$ is a factorization; $x^{2} = 9$ is not — that is an equation, a *question*, while a factorization is a *statement of manufacture*.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — factorization over the integers', text: 'To **factor** a polynomial over the integers is to write it as a product of two or more polynomials with integer coefficients, each of lower degree than the original. The factorization is **complete** when no factor can be factored further over the integers. Symbolically: if $f = g \\cdot h$ with $\\deg g, \\deg h < \\deg f$ and all three carrying integer coefficients, then $g$ and $h$ are factors of $f$ — and the equality holds for every value of the letters, because it was built by the laws, not solved for.' },
        { kind: 'para', text: 'Direction bookkeeping keeps the trade honest. **Expansion** (3.2) runs product → sum: it is computation, always possible, always ending in one collected polynomial. **Factoring** runs sum → product: it is *recognition*, sometimes possible, and its success is not guaranteed — this lesson ends at the wall of expressions that refuse. The two directions meet in the check: every factorization claims an identity, so expanding the claimed factors must return the original polynomial exactly. That check costs ten seconds and is the cheapest insurance in all of examination mathematics; this book runs it on every example, and the verify-first discipline ran it on every number before the prose existed.' },
        {
          kind: 'equation',
          latex: 'ca + cb = c(a + b)',
          note: 'the distributive law of 3.2 — read left-to-right it distributes and builds a sum; read right-to-left it is the first factorization: the common factor c extracted from both terms',
        },
        { kind: 'para', text: 'Read right-to-left, the distributive law says: when two terms **share** a factor $c$, that shared factor may be pulled out once, leaving the *unshared parts* in a bracket. The move is the exact mirror of 1.2’s collection law: collection added copies of the same block ($3x + 2x = 5x$); extraction divides copies of a shared block back out ($6x^{2} + 15x = 3x(2x + 5)$ — three copies of $2x + 5$). The question that gives the move its power is the one FM chapter 3 already taught you to ask about numbers: not just *any* shared factor, but the **greatest** one.' },
        { kind: 'heading', text: 'The Greatest Common Factor of Terms' },
        { kind: 'para', text: 'When the terms share a factor, the extraction should take the **greatest common factor** — the GCF — in one pull. For terms with letters, the GCF has a two-part anatomy, and both parts are old friends. The **coefficient part** is the HCF of the coefficients — FM chapter 3’s two-column Euclidean measure, unchanged. The **letter part** is every letter the terms *share*, taken at the **lowest power** it attains in any term. The contrast with the product law is worth printing in a box in your head: multiplying monomials **adds** exponents (3.2’s $x^{3} \\cdot x^{2} = x^{5}$); finding the GCF takes the **minimum**. The GCF is what the terms have in common — and no term can contribute a power it does not have.' },
        {
          kind: 'table',
          caption: 'The anatomy of the GCF of terms — HCF of coefficients, shared letters at their lowest powers',
          head: ['Terms', 'HCF of coefficients', 'Shared letters at lowest powers', 'GCF', 'Leftover bracket'],
          rows: [
            ['$12x^{3},\\ 18x^{2}$', '6', '$x^{2}$ — the lower of 3 and 2', '$6x^{2}$', '$2x,\\ 3$'],
            ['$6x^{2}y^{3},\\ 9xy^{2},\\ 3x^{2}y^{2}$', '3', '$x$ (min 2, 1, 2) and $y^{2}$ (min 3, 2, 2)', '$3xy^{2}$', '$2xy,\\ -3,\\ x$'],
            ['$4x^{2},\\ 7x^{5}$', '1', '$x^{2}$ — the lower of 2 and 5', '$x^{2}$', '$4,\\ 7x^{3}$'],
            ['$4x^{2},\\ 7y^{3}$', '1', 'none — no letter is shared', '1', 'the terms themselves'],
          ],
        },
        { kind: 'para', text: 'The third row earns a second look: the coefficients 4 and 7 share nothing, yet the GCF is still $x^{2}$ — the *letter* part can rescue an extraction even when the numeric part is empty. The fourth row is the honest null case: with no shared coefficient and no shared letter, the GCF is $1$ and "extracting" it changes nothing — an expression whose terms share nothing has no common-factor factorization, and other moves (or refusals) take over. Two rows also smuggle in a habit: whatever the GCF, the leftover bracket is written by **dividing** each term — and the check by expansion confirms the division did not lose anything.' },
        {
          kind: 'derivation',
          title: 'The extracted GCF is complete',
          statement: 'Claim: if $g$ is the true GCF of the terms $t_{1}, \\ldots, t_{n}$ — the HCF of the coefficients and each shared letter at its lowest power — then extracting it leaves a bracket $r_{1} + \\cdots + r_{n}$ (with $t_{i} = g \\cdot r_{i}$) whose terms are **relatively prime**: no coefficient HCF above 1, no letter shared by all of them.',
          steps: [
            {
              label: 'Suppose the leftovers still shared a common factor',
              formula: 'p \\mid r_{1},\\ p \\mid r_{2},\\ \\ldots',
              explanation: 'Say a prime $p$ divided every leftover coefficient — or, in the letter part, some letter $x$ sat at power ≥ 1 in every leftover term.',
            },
            {
              label: 'Then a bigger common factor existed',
              formula: 'pg \\mid t_{i} \\quad \\text{for every } i',
              explanation: 'Multiplying $g$ by $p$ (or appending one more copy of $x$) would give a common factor of ALL the original terms — bigger than the GCF.',
            },
            {
              label: 'That contradicts the definition of greatest',
              formula: 'g = \\operatorname{GCF}(t_{1}, \\ldots, t_{n})',
              explanation: 'The coefficient part came from the HCF, which nothing bigger divides (FM ch. 3); the letter part took the minimum power, which no term exceeds.',
            },
          ],
          result: 'Extracting the true GCF exhausts the commonality: the leftover bracket is relatively prime, and the factorization is complete. Any smaller pull leaves a bracket that still shares — incomplete work the examiner will price.',
        },
        { kind: 'terms', items: [
          { term: 'factor', def: 'a polynomial (or number) that divides another exactly — for $f = g \\cdot h$, both $g$ and $h$ are factors of $f$' },
          { term: 'factorization over the integers', def: 'writing a polynomial as a product of lower-degree polynomials with integer coefficients; the equality is an identity, true for every value' },
          { term: 'complete factorization', def: 'a factorization in which no factor can be factored further over the integers — the instruction "factor completely" demands it' },
          { term: 'common factor', def: 'a factor shared by every term of an expression; extracted once via the distributive law read backwards: $ca + cb = c(a + b)$' },
          { term: 'greatest common factor (GCF) of terms', def: 'the HCF of the coefficients together with each shared letter at its lowest power — FM ch. 3’s HCF wearing letters' },
          { term: 'relatively prime terms', def: 'terms sharing no factor above 1 — the state of a leftover bracket after the complete GCF has been extracted' },
          { term: 'factor by grouping', def: 'factoring a four-term expression by splitting it into two pairs, extracting each pair’s GCF, and extracting the matched bracket that remains' },
          { term: 'sum of squares', def: 'an expression of the form $x^{2} + k^{2}$ (or $x^{2} + y^{2}$) — the canonical refusal: it has no factorization over the integers (proved below)' },
        ] },
        { kind: 'example', title: 'Factor 12x³ + 18x² completely, and check by expansion', steps: [
          'Take the coefficients first: HCF(12, 18) = 6 — FM ch. 3’s two-column measure, unchanged by the letters.',
          'Now, the letters: both terms carry $x$, at powers 3 and 2 — the shared letter part is the LOWER power, $x^{2}$.',
          'So, the GCF is $6x^{2}$, and extracting: $12x^{3} + 18x^{2} = 6x^{2}(2x) + 6x^{2}(3) = 6x^{2}(2x + 3)$.',
          'Check by expansion (the habit): $6x^{2} \\cdot 2x = 12x^{3}$ and $6x^{2} \\cdot 3 = 18x^{2}$ — the original returns exactly.',
          'Hence $12x^{3} + 18x^{2} = 6x^{2}(2x + 3)$, and the bracket $2x + 3$ is relatively prime: the factorization is complete.',
        ] },
        { kind: 'para', text: 'Two smaller pulls would also have produced **true** identities — $3x(4x^{2} + 6x)$ and $2x(6x^{2} + 9x)$ both expand back to $12x^{3} + 18x^{2}$ — but neither is a *complete* factorization: the first bracket still carries $2x$, the second still carries $3x$. The instruction "factor completely" (every examination board’s wording) means the GCF, all of it, once. And when the leading coefficient is negative, the convention is to extract a **negative** GCF, so the remaining bracket leads positive: $-4x^{3} + 6x^{2} = -2x^{2}(2x - 3)$ — check it: $-2x^{2} \\cdot 2x = -4x^{3}$ and $-2x^{2} \\cdot (-3) = 6x^{2}$ ✓. The sign rides the GCF, exactly as FM chapter 7’s sign law rides every product.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — extract the WHOLE GCF', text: 'A partial extraction is not an error of arithmetic — it is an error of **stopping**. $3x(4x^{2} + 6x)$ is a true identity, and it still loses marks, because the bracket $4x^{2} + 6x$ visibly shares $2x$. The test is one glance: do the leftover terms still share a coefficient or a letter? If yes, extract again — or better, take the full GCF in the first pull. The same glance catches the sign slip: after extracting a negative GCF, the bracket must lead positive; if it still leads negative, the extraction was not the full GCF.' },
        { kind: 'example', title: 'Factor 6x²y³ − 9xy² + 3x²y² completely', steps: [
          'Take the coefficients: HCF(6, 9, 3) = 3.',
          'Now, the letters: $x$ appears in all three terms at powers 2, 1, 2 — take the minimum, $x^{1}$; $y$ appears at powers 3, 2, 2 — take the minimum, $y^{2}$.',
          'So, the GCF is $3xy^{2}$, and extracting term by term: $6x^{2}y^{3} \\div 3xy^{2} = 2xy$, then $-9xy^{2} \\div 3xy^{2} = -3$, then $3x^{2}y^{2} \\div 3xy^{2} = x$.',
          'Hence $6x^{2}y^{3} - 9xy^{2} + 3x^{2}y^{2} = 3xy^{2}(2xy + x - 3)$ — note the third term leaves a bare $x$: the $y$ divides out completely.',
          'Check by expansion: $3xy^{2} \\cdot 2xy = 6x^{2}y^{3}$, $3xy^{2} \\cdot x = 3x^{2}y^{2}$, $3xy^{2} \\cdot (-3) = -9xy^{2}$ — all three terms return.',
        ] },
        { kind: 'figure', caption: 'Multiplication undone: forward, 3.2’s grid builds 6x² + 15x from 3x(2x + 5); backward, the GCF hunt reads the built sum back into its factors — one identity, two readings.', svg: reversibleFilmSvg() },
        { kind: 'heading', text: 'Factoring by Grouping: Four Terms, Two Brackets' },
        { kind: 'para', text: 'The common-factor hunt needs the terms to share — and many four-term expressions share nothing *all together* while their **pairs** share plenty. Take $x^{3} + 3x^{2} + 2x + 6$: no factor is common to all four terms, but the first pair $x^{3} + 3x^{2}$ shares $x^{2}$ and the second pair $2x + 6$ shares $2$. Extract pair by pair and watch what surfaces: $x^{2}(x + 3) + 2(x + 3)$. The two inner brackets are **identical** — and an identical bracket is itself a common factor, of the two-pair sum. Extract it: $(x + 3)(x^{2} + 2)$. The move is called **factoring by grouping**, and it is nothing new: it is the common-factor extraction applied twice, the second time to a bracket.' },
        {
          kind: 'derivation',
          title: 'The grouping machine, both directions',
          statement: 'Claim: for any letters or numbers $a, b, x, y$, the identity $ax + ay + bx + by = (x + y)(a + b)$ holds — and each direction is one application of the distributive law.',
          steps: [
            {
              label: 'Split into pairs and extract each pair’s GCF',
              formula: 'ax + ay + bx + by = a(x + y) + b(x + y)',
              explanation: 'The first pair shares $a$, the second shares $b$ — two ordinary common-factor extractions.',
            },
            {
              label: 'The inner brackets match — extract the match',
              formula: 'a(x + y) + b(x + y) = (x + y)(a + b)',
              explanation: 'Now $(x + y)$ itself is the common factor of the two remaining terms; the distributive law applies with a bracket in the coefficient seat — the letters may carry brackets, 3.2’s grid does not care.',
            },
            {
              label: 'Read backwards, the same line is the expansion',
              formula: '(x + y)(a + b) = ax + ay + bx + by',
              explanation: 'Distribute twice: $x$ over $a + b$, then $y$ over $a + b$ — the four-term sum returns, so the identity holds in both directions by the same law.',
            },
          ],
          result: 'Grouping is the distributive law run twice — once for each pair, once for the match. The whole method lives or dies on one condition: the two inner brackets must be IDENTICAL after extraction. When they are, the factorization is forced; when they are not, the pairing (or the order of the terms) is wrong — not the idea.',
        },
        {
          kind: 'equation',
          latex: 'ax + ay + bx + by = (x + y)(a + b)',
          note: 'the grouping identity — the match condition is the whole method: after each pair extracts its GCF, the two inner brackets must agree letter for letter',
        },
        { kind: 'example', title: 'Factor x³ + 3x² + 2x + 6 by grouping', steps: [
          'Split into pairs: $(x^{3} + 3x^{2}) + (2x + 6)$ — the natural order already puts the sharers together.',
          'Extract from each pair: $x^{2}(x + 3) + 2(x + 3)$ — the first pair shares $x^{2}$, the second shares $2$.',
          'The inner brackets match: both read $x + 3$ — so extract the match itself.',
          'Hence $x^{3} + 3x^{2} + 2x + 6 = (x + 3)(x^{2} + 2)$.',
          'Check by expansion: $(x + 3)(x^{2} + 2) = x^{3} + 3x^{2} + 2x + 6$ — the four original terms return, and the bracket $x^{2} + 2$ refuses further (below): the factorization is complete.',
        ] },
        { kind: 'para', text: 'Two disciplines make the method reliable on ugly inputs. **The sign discipline:** when the second pair begins with a minus, extract a negative GCF so the brackets still match — $x^{3} + x^{2} - 4x - 4$ groups as $x^{2}(x + 1) - 4(x + 1)$, the distributed minus of 3.2 carrying the sign, and the match $x + 1$ extracts as before. **The regrouping discipline:** addition is commutative, so the *order the terms arrive in* is not the order you must pair them in. The expression $2x^{3} + 3 + x^{2} + 6x$ looks dead as printed — the first pair $2x^{3} + 3$ shares nothing — but reordered as $2x^{3} + x^{2} + 6x + 3$ it groups instantly: $x^{2}(2x + 1) + 3(2x + 1) = (2x + 1)(x^{2} + 3)$. If the natural pairing refuses to match, try pairing first-with-third and second-with-fourth; a four-term grouping exercise is a promise that *some* pairing works.' },
        { kind: 'example', title: 'Factor x³ + x² − 4x − 4 completely', steps: [
          'Split into pairs: $(x^{3} + x^{2}) + (-4x - 4)$.',
          'Extract from the first pair: $x^{2}(x + 1)$. From the second: $-4(x + 1)$ — the distributed minus carries the sign: $-4x - 4 = -4(x + 1)$.',
          'The brackets match: $x^{2}(x + 1) - 4(x + 1) = (x + 1)(x^{2} - 4)$.',
          'And 3.3’s difference of squares takes over: $x^{2} - 4 = (x + 2)(x - 2)$.',
          'Hence $x^{3} + x^{2} - 4x - 4 = (x + 1)(x + 2)(x - 2)$ — two moves chained: grouping, then the identity. Check: $(x + 1)(x^{2} - 4) = x^{3} + x^{2} - 4x - 4$ ✓.',
        ] },
        { kind: 'figure', caption: 'The grouping machine: four terms, two pairs, one matched bracket — split, extract each pair’s GCF, and the match itself becomes the common factor.', svg: groupingMachineSvg() },
        { kind: 'heading', text: 'The Honest Boundary: What Refuses to Factor' },
        { kind: 'para', text: 'A fair account of factoring must name the wall as precisely as it names the moves. The most famous refusal sits right next to the most famous success: the **difference** of squares factors ($x^{2} - y^{2} = (x + y)(x - y)$ — 3.3’s identity), but the **sum** of squares does not — not over the integers, not with any amount of cleverness. The proof is short and uses only this lesson’s own machinery: assume the factorization exists and compare parts.' },
        { kind: 'callout', tone: 'theorem', title: 'Theorem — the sum of squares refuses, over the integers', text: 'For every nonzero integer $k$, the polynomial $x^{2} + k^{2}$ cannot be written as $(x + a)(x + b)$ with integers $a, b$ — nor, similarly, can $x^{2} + y^{2}$ be written as $(x + my)(x + ny)$ with integers $m, n$. Suppose $(x + a)(x + b) = x^{2} + k^{2}$ held: comparing the $x$ coefficient and the constant gives $a + b = 0$ and $ab = k^{2}$. The first forces $b = -a$, so $ab = -a^{2} \\leq 0$ — but $k^{2} > 0$. Contradiction: no such integers exist. The two-letter version compares the same way: $x^{2} + (m + n)xy + mn\\,y^{2} = x^{2} + y^{2}$ needs $m + n = 0$ and $mn = 1$, that is $-m^{2} = 1$ — refused by the same one-line contradiction.' },
        { kind: 'para', text: 'Read the proof once more as *method*, because 4.2 turns it into a machine: "compare the parts of the claimed product with the parts of the given polynomial" is exactly the middle-term comparison that will factor $x^{2} + 7x + 12$ next lesson. Here it **refuses**: the sum of two squares has its parts in the wrong shape for any integer bracket. And the refusal is honest in both directions — it does not say the sum of squares can never be written as a product in any larger number system (the door marked $i$, where $x^{2} + 1 = (x + i)(x - i)$, opens in a later book); it says the factorization **over the integers** does not exist, which is the only claim an integer-factoring chapter can make.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the sign decides, and the impostors are priced', text: 'The neighbour expressions refuse for *different* reasons, and the examiner owns one of each. $x^{2} - 9$ factors — the difference of squares. $x^{2} + 9$ refuses — the sum of squares, this section’s theorem. $x^{2} + 4x + 4$ factors — a perfect square in disguise, $(x + 2)^{2}$. And $(x + 3)^{2}$ is **not** $x^{2} + 9$: expanding gives $x^{2} + 6x + 9$, the middle term that the square always carries (3.3’s corner-cut square). When an expression refuses every move this chapter owns, say so and stop — a written "irreducible over the integers, by the sum-of-squares comparison" is a full-credit answer; a fake factorization is none.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the oldest common factor', text: 'The GCF of terms is a 2,300-year-old algorithm wearing letters. Euclid’s *Elements*, Book VII, propositions 1–2 find the "greatest common measure" of two numbers by repeated reciprocal subtraction — the method FM chapter 3 met as the Euclidean algorithm, and the one quietly running whenever HCF(12, 18) = 6 is measured out here. Euclid spoke of *measures* of magnitudes, not of lettered terms; the leap of treating $6x^{2}$ as something whose "common measure" with $18x^{2}$ can be taken the same way is the 9th-century translation of arithmetic into algebra — and this lesson is that translation, still running.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — why factoring is timed currency', text: 'In SSC, CAT and board examinations, factorization is rarely asked as its own question — it is the *first move* of a hundred other questions: every quadratic equation of chapter 9 opens with "factor if possible", every simplification of chapter 8 needs the factors of numerator and denominator, and identity-based arithmetic (3.3) is factoring read backwards. The exam habits this lesson banks: extract the GCF **before** any cleverness (it halves every number you will meet); run the check by expansion on every answer (ten seconds, zero marks lost to sign slips); and when an expression refuses, name the refusal precisely — "sum of squares, irreducible over the integers" — because the refusal is itself the tested skill.' },
        { kind: 'heading', text: 'The Toolkit So Far: Two Moves and a Habit' },
        { kind: 'para', text: 'From the above discussion, the working toolkit of factorization stands as follows — everything chapter 4 adds from here is built on these three lines and one boundary:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Extract the complete GCF** — HCF of the coefficients, shared letters at their lowest powers, signs priced; the leftover bracket is relatively prime, and the glance-test confirms it.',
          '(ii) **Group four terms into two pairs** — extract each pair’s GCF, demand identical inner brackets, reorder when the printed order hides the match, and extract the match itself.',
          '(iii) **Check by expansion** — every factorization is an identity (3.3’s charter), and expansion returns the original polynomial exactly or exposes the slip.',
          '(iv) **Respect the boundary** — sums of squares refuse over the integers, proved by the middle-term comparison; a precise refusal beats a fake factorization every time.',
        ] },
        { kind: 'formula', name: 'The common-factor extraction', latex: 'ca + cb = c(a + b)', note: 'the distributive law read backwards; $c$ is the GCF of the terms — and the check is the same law read forwards' },
        { kind: 'formula', name: 'The GCF of terms', latex: '\\operatorname{GCF}\\big(c_{1}x^{a}y^{b},\\ c_{2}x^{d}y^{e}\\big) = \\operatorname{HCF}(c_{1}, c_{2})\\, x^{\\min(a, d)} y^{\\min(b, e)}', note: 'coefficients take the HCF (FM ch. 3); shared letters sit at their LOWEST powers — the product law adds exponents, the GCF takes the minimum' },
        { kind: 'formula', name: 'The grouping machine', latex: 'ax + ay + bx + by = (x + y)(a + b)', note: 'two extracts make the inner brackets match; the match is itself the common factor — reorder the four terms first if the printed order hides the pairing' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The GCF of $12x^{3}$ and $18x^{2}$ is',
            options: ['$6x^{2}$', '$3x$', '$6x^{3}$', '$2x^{2}$'],
            answer: 0,
            explain: 'The coefficient part is HCF(12, 18) = 6, and the shared letter sits at the LOWER power, $x^{2}$. Option 2 dropped the coefficient to 3 and the power to 1 — it is *a* common factor but not the greatest. Option 3 took the HIGHER power $x^{3}$, which $18x^{2}$ does not even carry. Option 4 found the right letter part but missed the coefficient 6. And the complete extraction leaves $6x^{2}(2x + 3)$ — the bracket relatively prime.',
          },
          {
            q: 'Factor $-4x^{3} + 6x^{2}$ completely:',
            options: ['$2x^{2}(-2x + 3)$', '$-2x^{2}(2x - 3)$', '$-2x^{2}(2x + 3)$', '$x^{2}(-4x + 6)$'],
            answer: 1,
            explain: 'The GCF is $-2x^{2}$ — negative, so the bracket leads positive: $-2x^{2}(2x - 3)$, checked by $-2x^{2} \\cdot 2x = -4x^{3}$ and $-2x^{2} \\cdot (-3) = 6x^{2}$. Option 1 is the SAME identity with the sign left inside the bracket — true, but it breaks the convention that the extracted GCF carries the sign. Option 3 flips the bracket’s constant: it expands to $-4x^{3} - 6x^{2}$, the $+6x^{2}$ lost. Option 4 is a true but INCOMPLETE extraction — the bracket still shares 2.',
          },
          {
            q: '$x^{3} + 3x^{2} + 2x + 6$ factors as',
            options: ['$(x + 3)(x^{2} + 2)$', '$(x + 2)(x^{2} + 3)$', '$(x + 6)(x^{2} + 2)$', '$(x + 1)(x^{2} + 6)$'],
            answer: 0,
            explain: 'Grouping: $x^{2}(x + 3) + 2(x + 3) = (x + 3)(x^{2} + 2)$. The trap is option 2 — $(x + 2)(x^{2} + 3)$ expands to $x^{3} + 2x^{2} + 3x + 6$: the SAME ingredients with the middle terms trading seats, which is why the check-by-expansion is not optional. Option 3 expands to $x^{3} + 6x^{2} + 2x + 12$ and option 4 to $x^{3} + x^{2} + 6x + 6$ — both fail the middle terms.',
          },
          {
            q: 'After extracting $3xy^{2}$ from $6x^{2}y^{3} - 9xy^{2} + 3x^{2}y^{2}$, the bracket reads',
            options: ['$2xy + x - 3$', '$2xy - 3 + xy$', '$2x^{2}y^{2} + x - 3$', '$2xy - 9 + x$'],
            answer: 0,
            explain: 'Divide term by term: $6x^{2}y^{3} \\div 3xy^{2} = 2xy$; $3x^{2}y^{2} \\div 3xy^{2} = x$ — the $y$ divides out COMPLETELY, leaving a bare $x$; $-9xy^{2} \\div 3xy^{2} = -3$. Option 2 over-divides the third term to $xy$ (the common mistake this exhibit is built to catch); option 3 never divided the powers at all; option 4 forgot to divide the middle term ($-9$ instead of $-3$). The check by expansion prices every option in seconds.',
          },
          {
            q: 'Which expression CANNOT be factored over the integers?',
            options: ['$x^{2} - 9$', '$x^{3} + x^{2} + 2x + 2$', '$x^{2} + 4$', '$x^{2} - 4x + 4$'],
            answer: 2,
            explain: '$x^{2} + 4$ is the sum of squares: the middle-term comparison needs $a + b = 0$, $ab = 4$, forcing $-a^{2} = 4$ — refused. The others all factor: $x^{2} - 9 = (x + 3)(x - 3)$ (the difference of squares); $x^{3} + x^{2} + 2x + 2 = x^{2}(x + 1) + 2(x + 1) = (x + 1)(x^{2} + 2)$ (grouping); and $x^{2} - 4x + 4 = (x - 2)^{2}$ (3.3’s trinomial square). The sign in the middle decides the first pair; the middle terms decide the rest.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 4.1', sets: [
          {
            level: 'L1',
            questions: [
              {
                q: 'Factor $5x + 15$ and check by expansion.',
                solution: [
                  'Take the GCF: HCF(5, 15) = 5, and no letter is shared (15 carries none).',
                  'Extract: $5x + 15 = 5(x + 3)$.',
                  'Check: $5 \\cdot x + 5 \\cdot 3 = 5x + 15$ — the original returns.',
                  'Hence $5(x + 3)$, complete — the bracket $x + 3$ shares nothing further.',
                ],
                answer: '$5(x + 3)$',
              },
              {
                q: 'Factor $8x^{2} - 12x$ completely.',
                solution: [
                  'Take the coefficients: HCF(8, 12) = 4; the letters share $x$ at the lower power 1.',
                  'So, the GCF is $4x$.',
                  'Extract: $8x^{2} - 12x = 4x(2x - 3)$.',
                  'Check: $4x \\cdot 2x = 8x^{2}$ and $4x \\cdot (-3) = -12x$ ✓ — and the bracket $2x - 3$ is relatively prime.',
                ],
                answer: '$4x(2x - 3)$',
              },
              {
                q: 'Factor $6y^{3} + 9y^{2}$ completely.',
                solution: [
                  'Take the coefficients: HCF(6, 9) = 3; the letters share $y$ at the lower power 2.',
                  'So, the GCF is $3y^{2}$.',
                  'Extract: $6y^{3} + 9y^{2} = 3y^{2}(2y + 3)$.',
                  'Check: $3y^{2} \\cdot 2y = 6y^{3}$ and $3y^{2} \\cdot 3 = 9y^{2}$ ✓.',
                ],
                answer: '$3y^{2}(2y + 3)$',
              },
            ],
          },
          {
            level: 'L2',
            questions: [
              {
                q: 'Factor $-3x^{2} + 12x$ completely, with the sign convention honoured.',
                solution: [
                  'The leading term is negative, so extract a NEGATIVE GCF: the GCF of magnitude is $3x$ — take $-3x$.',
                  'Divide term by term: $-3x^{2} \\div (-3x) = x$ and $12x \\div (-3x) = -4$.',
                  'Hence $-3x^{2} + 12x = -3x(x - 4)$ — the bracket leads positive.',
                  'Check: $-3x \\cdot x = -3x^{2}$ and $-3x \\cdot (-4) = 12x$ ✓.',
                ],
                answer: '$-3x(x - 4)$',
              },
              {
                q: 'Factor $10a^{2}b^{3} - 15ab^{2}$ completely.',
                solution: [
                  'Coefficients: HCF(10, 15) = 5. Letters: $a$ appears at powers 2 and 1 — take $a$; $b$ at powers 3 and 2 — take $b^{2}$.',
                  'So, the GCF is $5ab^{2}$.',
                  'Extract: $10a^{2}b^{3} \\div 5ab^{2} = 2ab$ and $-15ab^{2} \\div 5ab^{2} = -3$.',
                  'Hence $10a^{2}b^{3} - 15ab^{2} = 5ab^{2}(2ab - 3)$ — check: $5ab^{2} \\cdot 2ab = 10a^{2}b^{3}$, $5ab^{2} \\cdot (-3) = -15ab^{2}$ ✓.',
                ],
                answer: '$5ab^{2}(2ab - 3)$',
              },
              {
                q: 'Factor $14m^{3}n^{2} + 21m^{2}n^{3}$ completely.',
                solution: [
                  'Coefficients: HCF(14, 21) = 7. Letters: $m$ at min(3, 2) = 2; $n$ at min(2, 3) = 2.',
                  'So, the GCF is $7m^{2}n^{2}$.',
                  'Extract: $14m^{3}n^{2} \\div 7m^{2}n^{2} = 2m$ and $21m^{2}n^{3} \\div 7m^{2}n^{2} = 3n$.',
                  'Hence $14m^{3}n^{2} + 21m^{2}n^{3} = 7m^{2}n^{2}(2m + 3n)$ — check by expansion ✓.',
                ],
                answer: '$7m^{2}n^{2}(2m + 3n)$',
              },
            ],
          },
          {
            level: 'L3',
            questions: [
              {
                q: 'Factor $x^{3} + x^{2} + 3x + 3$ by grouping.',
                solution: [
                  'Split into pairs: $(x^{3} + x^{2}) + (3x + 3)$.',
                  'Extract each pair: $x^{2}(x + 1) + 3(x + 1)$.',
                  'The brackets match — extract the match: $(x + 1)(x^{2} + 3)$.',
                  'Check: $(x + 1)(x^{2} + 3) = x^{3} + x^{2} + 3x + 3$ ✓, and $x^{2} + 3$ refuses further (the sum-of-squares comparison with $k^{2} = 3$ — no integer bracket).',
                ],
                answer: '$(x + 1)(x^{2} + 3)$',
              },
              {
                q: 'Factor $6x^{3} - 9x^{2} + 4x - 6$ by grouping.',
                solution: [
                  'Split into pairs: $(6x^{3} - 9x^{2}) + (4x - 6)$.',
                  'Extract each pair: $3x^{2}(2x - 3) + 2(2x - 3)$.',
                  'The brackets match — hence $(2x - 3)(3x^{2} + 2)$.',
                  'Check: $(2x - 3)(3x^{2} + 2) = 6x^{3} - 9x^{2} + 4x - 6$ ✓.',
                ],
                answer: '$(2x - 3)(3x^{2} + 2)$',
              },
              {
                q: 'Factor $2x^{3} + 3 + x^{2} + 6x$ — reorder the terms first.',
                solution: [
                  'As printed, the natural pairs $(2x^{3} + 3)$ and $(x^{2} + 6x)$ share nothing — reorder: $2x^{3} + x^{2} + 6x + 3$ (addition is commutative, so the polynomial is unchanged).',
                  'Split and extract: $x^{2}(2x + 1) + 3(2x + 1)$.',
                  'The brackets match — hence $(2x + 1)(x^{2} + 3)$.',
                  'Check: $(2x + 1)(x^{2} + 3) = 2x^{3} + x^{2} + 6x + 3$ — the same four terms as printed, reordered ✓.',
                ],
                answer: '$(2x + 1)(x^{2} + 3)$',
              },
            ],
          },
          {
            level: 'L4',
            questions: [
              {
                q: 'Factor $x^{3} + x^{2} - 4x - 4$ completely, chaining the identities of 3.3.',
                solution: [
                  'Group and extract: $x^{2}(x + 1) - 4(x + 1) = (x + 1)(x^{2} - 4)$.',
                  'The difference of squares takes over: $x^{2} - 4 = (x + 2)(x - 2)$.',
                  'Hence $x^{3} + x^{2} - 4x - 4 = (x + 1)(x + 2)(x - 2)$ — three linear factors, all irreducible.',
                  'Check: $(x + 1)(x^{2} - 4) = x^{3} + x^{2} - 4x - 4$ and $(x + 2)(x - 2) = x^{2} - 4$ ✓.',
                ],
                answer: '$(x + 1)(x + 2)(x - 2)$',
              },
              {
                q: 'Factor $18x^{3} + 9x^{2} - 2x - 1$ completely.',
                solution: [
                  'Group and extract: $9x^{2}(2x + 1) - 1(2x + 1) = (2x + 1)(9x^{2} - 1)$ — the second pair’s GCF is $-1$, the distributed minus carrying the sign.',
                  'The difference of squares again: $9x^{2} - 1 = (3x + 1)(3x - 1)$.',
                  'Hence $18x^{3} + 9x^{2} - 2x - 1 = (2x + 1)(3x + 1)(3x - 1)$.',
                  'Check: $(2x + 1)(9x^{2} - 1) = 18x^{3} + 9x^{2} - 2x - 1$ ✓.',
                ],
                answer: '$(2x + 1)(3x + 1)(3x - 1)$',
              },
            ],
          },
          {
            level: 'L5',
            questions: [
              {
                q: 'Factor $x^{2}y^{2} + x^{2} + y^{2} + 1$ by grouping.',
                solution: [
                  'Split into pairs: $(x^{2}y^{2} + x^{2}) + (y^{2} + 1)$.',
                  'Extract each pair: $x^{2}(y^{2} + 1) + 1(y^{2} + 1)$ — the second pair’s GCF is the bare 1, and that still counts.',
                  'The brackets match — hence $(y^{2} + 1)(x^{2} + 1)$.',
                  'Check: $(y^{2} + 1)(x^{2} + 1) = x^{2}y^{2} + x^{2} + y^{2} + 1$ ✓ — and each bracket is a sum of squares that refuses further.',
                ],
                answer: '$(y^{2} + 1)(x^{2} + 1)$',
              },
              {
                q: 'Explain why $x^{2} + 9$ cannot be factored over the integers, and factor its twin $x^{2} - 9$.',
                solution: [
                  'Suppose $x^{2} + 9 = (x + a)(x + b)$: comparing parts forces $a + b = 0$ and $ab = 9$.',
                  'Then $b = -a$, so $ab = -a^{2} \\leq 0$ — but $9 > 0$: contradiction. The sum of squares refuses.',
                  'The twin flips the sign: $x^{2} - 9$ needs $ab = -9$ with $a + b = 0$ — that is $-a^{2} = -9$, so $a = \\pm 3$.',
                  'Hence $x^{2} - 9 = (x + 3)(x - 3)$ — the difference of squares, 3.3’s identity, agreeing with the comparison method.',
                ],
                answer: '$x^{2} + 9$ is irreducible over the integers; $x^{2} - 9 = (x + 3)(x - 3)$',
              },
            ],
          },
          {
            level: 'L6',
            questions: [
              {
                q: 'Factor $x^{4} + x^{3} + x + 1$ completely — the chain runs through grouping and 3.3.',
                solution: [
                  'Group and extract: $x^{3}(x + 1) + 1(x + 1) = (x + 1)(x^{3} + 1)$.',
                  'The sum of cubes — 3.3’s identity — takes over: $x^{3} + 1 = (x + 1)(x^{2} - x + 1)$.',
                  'Hence $x^{4} + x^{3} + x + 1 = (x + 1)^{2}(x^{2} - x + 1)$.',
                  'Check: $(x + 1)(x^{3} + 1) = x^{4} + x^{3} + x + 1$ and $(x + 1)(x^{2} - x + 1) = x^{3} + 1$ ✓; the quadratic $x^{2} - x + 1$ has gauge $1 - 4 = -3 < 0$ — it refuses (and 4.2 prices that gauge).',
                ],
                answer: '$(x + 1)^{2}(x^{2} - x + 1)$',
              },
            ],
          },
        ] },
      ],
    },
    {
      id: 'al-factoring-quadratic-trinomials',
      number: '4.2',
      title: 'Factoring Quadratic Trinomials',
      concepts: [
        'the middle-term hunt',
        'the product dial and the sum dial',
        'the existence gauge p² − 4q',
        'sign pricing of the pair',
        'the AC split',
        'the folding identity',
        'the GCF-first rule',
        'check by expansion',
      ],
      objectives: [
        'run the middle-term hunt on x² + px + q: find two integers whose product is q and whose sum is p',
        'state and prove the gauge — the pair exists over the integers exactly when p² − 4q is a perfect square — and read its three verdicts',
        'price the signs of the pair from the signs of p and q before hunting',
        'factor ax² + bx + c (a ≠ 1) by the AC split, and close the split with 4.1’s grouping machine',
        'extract the GCF first, recognize the 3.3 squares as the hunt’s double case, and refuse honestly when the gauge says no',
        'verify every factorization by expansion — the ten-second identity check',
      ],
      prerequisites: ['al-common-factors-and-grouping', 'al-special-products-the-identities-proved'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math8-ch12-factorisation', 'khattar-qa-4e', 'harriot-1631-praxis'],
      blocks: [
        { kind: 'para', text: 'Lesson 3.3 proved the middle-term rule left-to-right: $(x + a)(x + b) = x^{2} + (a + b)x + ab$, every middle term the sum of the two constants, every constant their product — and banked a preview: given $x^{2} + 7x + 12$, hunt two numbers whose product is 12 and whose sum is 7. This lesson cashes that preview in full. The **middle-term hunt** is the daily bread of examination algebra: every quadratic equation of chapter 9 opens with it, every simplification of chapter 8 leans on it, and the CAT/SSC papers time it in seconds. But this course does not stop at the procedure — it proves **when the hunt can succeed at all**, with a gauge that chapter 9 will meet again under a new name.' },
        { kind: 'para', text: 'The plan: read the hunt as two dials — a product dial and a sum dial — and run it on the monic trinomials $x^{2} + px + q$; then prove the **gauge** $p^{2} - 4q$, which decides in one computation whether an integer pair exists; price the signs of the pair before hunting; and finally face the case where the leading coefficient is not 1 — the **AC split** — whose closure is 4.1’s grouping machine and whose honest refusal is the same wall this chapter keeps hitting, now with a number attached.' },
        { kind: 'heading', text: 'The Middle-Term Hunt: Two Dials' },
        { kind: 'para', text: 'The definition is the expansion rule read backwards, with the 3.3 identity charter standing behind it. A **monic** quadratic — leading coefficient exactly 1 — is said to **factor over the integers** if it can be written as $(x + a)(x + b)$ with integers $a, b$; expanding forces those integers to satisfy two conditions at once, one reading each dial.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — the middle-term hunt', text: 'To factor $x^{2} + px + q$ over the integers is to find integers $a, b$ with $a + b = p$ and $ab = q$; when they exist, $x^{2} + px + q = (x + a)(x + b)$. The **product dial** $q$ proposes the candidate pairs, and the **sum dial** $p$ chooses among them — the identity is true for every value of $x$ because it was forced by 3.3’s expansion rule, not solved for.' },
        {
          kind: 'equation',
          latex: 'x^{2} + px + q = (x + a)(x + b) \\quad \\Longleftrightarrow \\quad a + b = p, \\;\\; ab = q',
          note: 'the hunt’s contract — expand the right side and compare parts: the middle coefficient is the SUM of the sought integers, the constant their PRODUCT',
        },
        { kind: 'para', text: 'The two dials divide the labor. The **product dial** $q$ is a finite list: its factor pairs (with signs) are the only candidates. The **sum dial** $p$ is the judge: at most one pair survives it. Take $q = 12$: the positive pairs are $(1, 12)$, $(2, 6)$ and $(3, 4)$, with sums 13, 8 and 7 — so three different quadratics with the same constant term factor differently, and one dial-table reads them all off.' },
        {
          kind: 'table',
          caption: 'One product dial, four quadratics — the pairs the dial proposes and the sums that choose',
          head: ['Quadratic', 'Product q', 'Pair (a, b)', 'Sum a + b', 'Factorization'],
          rows: [
            ['$x^{2} + 13x + 12$', '12', '$(1, 12)$', '13', '$(x + 1)(x + 12)$'],
            ['$x^{2} + 8x + 12$', '12', '$(2, 6)$', '8', '$(x + 2)(x + 6)$'],
            ['$x^{2} + 7x + 12$', '12', '$(3, 4)$', '7', '$(x + 3)(x + 4)$'],
            ['$x^{2} - 8x + 12$', '12', '$(-2, -6)$', '$-8$', '$(x - 2)(x - 6)$'],
          ],
        },
        { kind: 'para', text: 'The last row is the sign discipline arriving early: a positive product can be made by two positives or two negatives, and it is the **sum** that decides which — $p = -8$ forces both negative. The full sign pricing gets its own section below, because it is where every hunt either speeds up or slips.' },
        { kind: 'terms', items: [
          { term: 'middle-term hunt', def: 'factoring $x^{2} + px + q$ by finding integers $a, b$ with $a + b = p$ and $ab = q$ — then $x^{2} + px + q = (x + a)(x + b)$' },
          { term: 'product dial', def: 'the constant term $q$, read as its finite list of factor pairs — the only candidates the hunt may consider' },
          { term: 'sum dial', def: 'the middle coefficient $p$, which chooses among the product dial’s candidates — at most one pair survives it' },
          { term: 'existence gauge', def: 'the number $p^{2} - 4q$: the integer pair exists exactly when it is a perfect square (zero included); proved this lesson, named the discriminant in chapter 9' },
          { term: 'AC split (middle-term break-up)', def: 'factoring $ax^{2} + bx + c$ by hunting two numbers with sum $b$ and product $ac$, splitting the middle term with them, and closing by grouping' },
          { term: 'folding identity', def: '$(ax + r)(ax + s) = a(ax^{2} + bx + c)$ whenever $r + s = b$ and $rs = ac$ — the guarantee that the split always closes; the half-brackets’ GCFs absorb the $1/a$' },
          { term: 'primitive trinomial', def: 'a trinomial whose coefficients share no common factor above 1 — the form the hunt should always be run on (extract the GCF first)' },
          { term: 'irreducible over the integers', def: 'admitting no factorization into lower-degree integer polynomials — stated honestly whenever the gauge refuses, never faked' },
        ] },
        { kind: 'heading', text: 'The Gauge: When the Hunt Must Succeed' },
        { kind: 'para', text: 'The dials are a search, and searches can fail. The honest question — the one a course must answer before drilling the procedure — is: **when does the pair exist?** For $x^{2} + 7x + 12$ it does; for $x^{2} + 5x + 8$ it seems not to; is that a failure of patience or a mathematical impossibility? The answer is exact, and it falls out of one algebraic identity: subtract four times the product from the square of the sum and watch the cross terms collapse.' },
        {
          kind: 'derivation',
          title: 'The gauge — when the hunt must succeed',
          statement: 'Claim: $x^{2} + px + q$ factors as $(x + a)(x + b)$ with integers $a, b$ **if and only if** $p^{2} - 4q$ is a perfect square $d^{2}$; and then $a = \\frac{p + d}{2}$, $b = \\frac{p - d}{2}$, which are integers automatically.',
          steps: [
            {
              label: 'Only if: compute the gauge from a known pair',
              formula: 'p^{2} - 4q = (a + b)^{2} - 4ab = a^{2} - 2ab + b^{2} = (a - b)^{2}',
              explanation: 'If the pair exists, the gauge is the SQUARE of their difference — 3.3’s square of a difference wearing $p$ and $q$. So a successful hunt forces the gauge to be a perfect square.',
            },
            {
              label: 'If: recover the pair from the gauge',
              formula: 'a = \\frac{p + d}{2}, \\qquad b = \\frac{p - d}{2}',
              explanation: 'Conversely suppose $p^{2} - 4q = d^{2}$ with $d \\geq 0$. These two candidates have sum $p$; their product is $\\frac{p^{2} - d^{2}}{4} = \\frac{4q}{4} = q$ — exactly the contract.',
            },
            {
              label: 'Parity — the candidates are integers',
              formula: 'p^{2} - d^{2} = 4q \\; \\Rightarrow \\; p \\equiv d \\pmod{2}',
              explanation: 'If $p$ and $d$ had opposite parity, $p^{2} - d^{2}$ would be odd — but it equals $4q$, which is even. Same parity means $\\frac{p \\pm d}{2}$ are integers: no extra condition, the parity is forced.',
            },
          ],
          result: 'The hunt succeeds over the integers exactly when the gauge $p^{2} - 4q$ is a perfect square (zero included) — and the pair, when it exists, is forced: $a, b = \\frac{p \\pm d}{2}$. Chapter 9 will meet $p^{2} - 4q$ again as the discriminant; the gauge is its first appearance.',
        },
        { kind: 'para', text: 'The gauge reads the hunt in one line and hands down one of three verdicts. $x^{2} + 7x + 12$: gauge $49 - 48 = 1 = 1^{2}$, the pair $\\frac{7 \\pm 1}{2} = 4, 3$ — success. $x^{2} + 5x + 6$: gauge $25 - 24 = 1$, the pair $3, 2$ — success. $x^{2} + 5x + 8$: gauge $25 - 32 = -7$, **negative** — no pair of real numbers at all, the refusal is absolute. $x^{2} + x + 1$: gauge $1 - 4 = -3$, refused the same way. And the third verdict, the subtle one: $x^{2} + 9x + 6$ has gauge $81 - 24 = 57$ — **positive but not a perfect square** — so a real pair exists but not an integer one; the factorization over the integers does not exist, and chapter 9’s formula will say exactly what does. The zero gauge is the sweetest verdict: $x^{2} + 6x + 9$ has gauge $36 - 36 = 0$, forcing $a = b = 3$ — the **trinomial square** $(x + 3)^{2}$, and 3.3’s middle-term test ($2 \\cdot 1 \\cdot 3 = 6$ ✓) is this same gauge wearing its other clothes.' },
        { kind: 'callout', tone: 'insight', title: 'One instrument, three names', text: 'The gauge $p^{2} - 4q$, the middle-term test of 3.3, and chapter 9’s discriminant are the same computation at three stations of the course. Here it decides whether an integer pair exists; in 4.3 it decides whether a trinomial is a perfect square ($d = 0$); in chapter 9 it decides how many real roots a quadratic equation has. When one number does three jobs, examination questions about any of them are the same question wearing different uniforms — and $d^{2} = (a - b)^{2}$ is the line that unifies them.' },
        { kind: 'para', text: 'Sign pricing turns the hunt from a search into a decision. Two rules, both forced by the contract $ab = q$, $a + b = p$. **When $q > 0$:** the pair shares one sign — positives if $p > 0$, negatives if $p < 0$ (a positive product from a negative sum: $x^{2} - 8x + 12 = (x - 2)(x - 6)$). **When $q < 0$:** the signs are opposite, and the one with the **larger absolute value** carries the sign of $p$ — $x^{2} + 2x - 15$ hunts to $(x + 5)(x - 3)$ (5 outranks 3, and $p = +2$ is positive), while $x^{2} - 2x - 15$ gives $(x - 5)(x + 3)$ (same pair, the minus now carried by 5). Price the signs first and the candidate list shrinks to a glance.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — price the signs BEFORE you hunt', text: 'The classic slip is hunting magnitudes first and sprinkling signs afterwards: $(x - 5)(x - 3)$ "feels right" for $x^{2} - 2x - 15$ until expansion gives $x^{2} - 8x + 15$ — right magnitudes, wrong everything else. The contract is a system: the product fixes whether the signs AGREE ($q > 0$) or OPPOSE ($q < 0$), and only then does the sum say which way they point. One pricing pass before the hunt; one expansion check after it. Both take seconds; together they are invincible.' },
        { kind: 'figure', caption: 'The two dials and the gauge: the product dial proposes candidate pairs, the sum dial chooses — and the gauge $p^{2} - 4q = (a - b)^{2}$ decides in advance whether any integer pair exists at all.', svg: huntDialsSvg() },
        { kind: 'heading', text: 'The a ≠ 1 Case: the AC Split' },
        { kind: 'para', text: 'The moment the leading coefficient stops being 1 — $6x^{2} + 19x + 15$, say — the hunt needs a third dial, and the classical method adds it with one multiplication. The method is the **AC split**: multiply $a \\cdot c$, hunt two numbers with the same roles as before (sum $b$, product $ac$), **split the middle term** with them, and let 4.1’s grouping machine finish. School traditions name it freely — many Indian texts call it the **middle-term break-up**; American texts call it the **AC method** — and the name does not matter, because the machine is 4.1’s, fed new numbers.' },
        { kind: 'example', title: 'Factor 6x² + 19x + 15 by the AC split', steps: [
          'Take the AC product: $a \\cdot c = 6 \\cdot 15 = 90$; hunt two numbers with sum $19$ and product $90$.',
          'The product dial of 90: $9 \\times 10$ gives $90$, and $9 + 10 = 19$ — found.',
          'So, split the middle term: $6x^{2} + 19x + 15 = 6x^{2} + 9x + 10x + 15$.',
          'Group, with 4.1’s machine: $3x(2x + 3) + 5(2x + 3) = (2x + 3)(3x + 5)$ — the brackets match.',
          'Hence $6x^{2} + 19x + 15 = (2x + 3)(3x + 5)$ — check by expansion: $2x \\cdot 3x = 6x^{2}$; $2x \\cdot 5 + 3 \\cdot 3x = 10x + 9x = 19x$; $3 \\cdot 5 = 15$ ✓.',
        ] },
        { kind: 'para', text: 'Why should splitting at 9 and 10 always close? The honest answer is an identity — and it explains, in passing, the mysterious classroom instruction to "cancel each half-bracket". Suppose integers $r, s$ satisfy $r + s = b$ and $rs = ac$. Then the product $(ax + r)(ax + s)$ expands to $a^{2}x^{2} + a(r + s)x + rs = a^{2}x^{2} + abx + ac$ — exactly $a$ times the original trinomial. Dividing by $a$:' },
        {
          kind: 'equation',
          latex: '(ax + r)(ax + s) = a\\,(ax^{2} + bx + c), \\qquad r + s = b, \\;\\; rs = ac',
          note: 'the folding identity — the split provably builds a times the trinomial; the factorization is the same line divided by a, and grouping is how the division is done lawfully',
        },
        { kind: 'para', text: 'In the exhibit: $(6x + 9)(6x + 10) = 6(6x^{2} + 19x + 15)$ — and the division by 6 is absorbed because $6x + 9 = 3(2x + 3)$ and $6x + 10 = 2(3x + 5)$, with $3 \\cdot 2 = 6$. **The folding**: the half-brackets carry common factors, and extracting them (4.1’s first move, twice) accounts for the $1/a$ exactly. Grouping is not a lucky trick that happens to close the split — it is the folding, done lawfully, one GCF at a time.' },
        {
          kind: 'derivation',
          title: 'Why the AC split always closes',
          statement: 'Claim: if integers $r, s$ satisfy $r + s = b$ and $rs = ac$, then $ax^{2} + bx + c = \\frac{1}{a}(ax + r)(ax + s)$ — an identity over the rationals — and when the half-brackets carry common factors, the $\\frac{1}{a}$ folds in, leaving an integer factorization.',
          steps: [
            {
              label: 'Expand the split product',
              formula: '(ax + r)(ax + s) = a^{2}x^{2} + a(r + s)x + rs',
              explanation: 'Pure 3.2 distribution — every term of the first bracket meets every term of the second.',
            },
            {
              label: 'Apply the split contract',
              formula: 'a^{2}x^{2} + abx + ac = a(ax^{2} + bx + c)',
              explanation: 'The contract $r + s = b$, $rs = ac$ turns the expansion into exactly $a$ times the trinomial — so dividing by $a$ returns it.',
            },
            {
              label: 'The folding is the GCF move',
              formula: '6x + 9 = 3(2x + 3), \\quad 6x + 10 = 2(3x + 5), \\quad 3 \\cdot 2 = 6',
              explanation: 'In the exhibit the half-brackets share 3 and 2; extracting them contributes $3 \\cdot 2 = 6$, which absorbs the $\\frac{1}{6}$ — an integer factorization with no fractions left.',
            },
          ],
          result: 'The AC split is the grouping machine fed the two numbers the contract guarantees: split, extract, fold. And the existence of the split is not luck either — for primitive trinomials the verifier proved it equivalent to integer factorability over a sweep of thousands of cases, the same theorem 4.1’s refusals hinted at.',
        },
        { kind: 'para', text: 'One discipline comes before the hunt, every time. The trinomial $18x^{2} + 21x + 6$ has $ac = 108$ and the pair hunt drags through 108’s factors — but the coefficients share 3, and extracting first shrinks the problem to $3(6x^{2} + 7x + 2)$, whose $ac = 12$ hunts instantly to 4 and 3: $18x^{2} + 21x + 6 = 3(2x + 1)(3x + 2)$. A trinomial whose coefficients share no common factor is called **primitive**; the rule is: reduce to primitive first, hunt second. The numbers stay small, the sign pricing stays visible, and the answer stays complete — the leading 3 must reappear in the final answer, or the factorization is not worth its ink.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — extract the GCF first, then hunt', text: 'Hunting on an unreduced trinomial wastes the search and can mislead: $ac = 108$ offers eight positive pairs, $ac = 12$ offers two. Worse, an unreduced hunt can end in brackets that still share — $(6x + 3)(3x + 2)$ expands correctly to $18x^{2} + 21x + 6$ but is INCOMPLETE, because 3 still divides the first bracket. "Factor completely" is the standing instruction: GCF, then hunt, then the glance-test on every bracket, then — and only then — the expansion check.' },
        { kind: 'para', text: 'Speed on the split comes from two legal shortcuts, both provable in one line. **The parity shortcut:** if $ac$ is odd and $b$ is odd, the split refuses instantly — an odd product forces both $r$ and $s$ odd, and two odd numbers sum to EVEN, which can never be the odd $b$. So $2x^{2} + 5x + 3$ ($ac = 6$, even) may hunt, but an odd-product, odd-middle trinomial like $3x^{2} + 5x + 1$ ($ac = 3$, $b = 5$) can be refused without listing a single pair. **The squares table:** the perfect squares up to $15^{2} = 225$ must surface on sight, because the AC dial keeps landing on them ($90$ is not one, $225$ is). Neither shortcut replaces the gauge — both are the gauge, read at a glance before the pencil moves.' },
        { kind: 'example', title: 'Factor 3x² + 14x + 8 by the AC split', steps: [
          'Take the AC product: $a \\cdot c = 3 \\cdot 8 = 24$; hunt two numbers with sum $14$ and product $24$.',
          'The product dial of 24: $12 \\times 2$ gives $24$, and $12 + 2 = 14$ — found.',
          'So, split: $3x^{2} + 14x + 8 = 3x^{2} + 12x + 2x + 8$.',
          'Group: $3x(x + 4) + 2(x + 4) = (x + 4)(3x + 2)$ — the brackets match.',
          'Hence $3x^{2} + 14x + 8 = (x + 4)(3x + 2)$ — check: $3x \\cdot x = 3x^{2}$; $3x \\cdot 4 + 2 \\cdot x = 14x$; $2 \\cdot 4 = 8$ ✓.',
        ] },
        { kind: 'example', title: 'Factor 6x² + x − 15, with the signs priced', steps: [
          'Take the AC product: $a \\cdot c = 6 \\cdot (-15) = -90$ — negative, so the pair has OPPOSITE signs.',
          'The sum dial: $p = 1$, so the positive partner has the larger magnitude. Hunt: $10$ and $-9$ give $10 + (-9) = 1$ and $10 \\cdot (-9) = -90$ — found.',
          'So, split: $6x^{2} + x - 15 = 6x^{2} + 10x - 9x - 15$.',
          'Group with the sign discipline: $2x(3x + 5) - 3(3x + 5) = (3x + 5)(2x - 3)$.',
          'Hence $6x^{2} + x - 15 = (3x + 5)(2x - 3)$ — check: $3x \\cdot 2x = 6x^{2}$; $-9x + 10x = x$; $5 \\cdot (-3) = -15$ ✓.',
        ] },
        { kind: 'para', text: 'And the refusals are priced by the same gauge, now reading $b^{2} - 4ac$. The trinomial $6x^{2} + 5x + 9$ has gauge $25 - 216 = -191$: negative, so no real pair exists — the AC hunt dies on the product dial (the pairs of 54 sum to 55, 29, 21 and 15, never 5, and the gauge already said it never could). The trinomial $3x^{2} + 7x + 3$ has gauge $49 - 36 = 13$ — positive but not a perfect square: a real pair exists, an integer one does not, and the honest answer is "irreducible over the integers". These are not failures of effort; they are theorems, and chapter 9’s formula will factor exactly these over the reals — the promise made to every refusal.' },
        { kind: 'figure', caption: 'The AC pipeline: multiply · hunt · split and group · collect — with the folding identity $(6x + 9)(6x + 10) = 6(6x^{2} + 19x + 15)$ showing why grouping always closes the split.', svg: acPipelineSvg() },
        { kind: 'callout', tone: 'historical', title: 'Historical note — Harriot’s products-first view', text: 'Thomas Harriot (1560–1621), the founder of the English school of algebra, worked the direction of this lesson before anyone else: his manuscripts — assembled by his editors into *Artis Analyticae Praxis* (1631, published after his death) — build polynomials as **products of linear factors** and only then read off the expanded form, comparing terms between the two shapes. That products-first habit is exactly the middle-term hunt anticipated three decades before Descartes’ *Geometry* gave it its printed notation; the hunt of this lesson is Harriot’s machine run backwards, on his terms, at school scale.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the split at speed', text: 'The AC split is the single most-drilled move in competitive algebra, and the speed comes from banked tables: the products and sums of small integers must surface without counting (Khattar’s chapters call it the factorization drill for a reason). The exam habits: price the signs from $q$ and $p$ before listing pairs; reduce to primitive first (the GCF reflex of 4.1); for $a \\neq 1$, check the pair against $ac$, not $c$; and expand to check — the ten seconds that protect every mark. Every quadratic equation in chapter 9 begins with this lesson’s move; the papers simply pay it earlier.' },
        { kind: 'heading', text: 'The Toolkit Complete for Quadratics' },
        { kind: 'para', text: 'From the above discussion, the quadratic factorization toolkit stands complete — four moves and a habit, with the gauge standing over them all:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Extract the GCF first** — reduce to the primitive trinomial; the leading factor returns in the final answer.',
          '(ii) **Run the monic hunt** — product dial proposes, sum dial chooses, signs priced before the list is read.',
          '(iii) **Run the AC split for a ≠ 1** — multiply to $ac$, hunt sum $b$ product $ac$, split, and let grouping close it; the folding identity guarantees the closure.',
          '(iv) **Read the gauge** — $b^{2} - 4ac$ a perfect square (zero included) means the integer pair exists; negative or non-square means refuse, honestly, and wait for chapter 9.',
          '(v) **Check by expansion** — the identity charter: the claimed product must return the trinomial exactly, or the answer is not an answer.',
        ] },
        { kind: 'formula', name: 'The middle-term hunt', latex: 'x^{2} + px + q = (x + a)(x + b) \\quad \\Longleftrightarrow \\quad a + b = p, \\;\\; ab = q', note: 'the product dial $q$ proposes the pairs; the sum dial $p$ chooses — signs priced before the hunt' },
        { kind: 'formula', name: 'The existence gauge', latex: 'p^{2} - 4q = (a - b)^{2}', note: 'the integer pair exists exactly when the gauge is a perfect square (zero = the double case); chapter 9 calls $p^{2} - 4q$ the discriminant' },
        { kind: 'formula', name: 'The AC split', latex: 'ax^{2} + bx + c: \\quad r + s = b, \\;\\; rs = ac \\; \\Rightarrow \\; ax^{2} + bx + c = \\tfrac{1}{a}(ax + r)(ax + s)', note: 'split at $r$ and $s$, then group — the folding identity is the guarantee, and the half-brackets’ GCFs absorb the $1/a$' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'In the middle-term hunt for $x^{2} + 8x + 12$, the pair $(a, b)$ is',
            options: ['$(3, 4)$', '$(1, 12)$', '$(2, 6)$', '$(-2, -6)$'],
            answer: 2,
            explain: 'The product dial of 12 offers $(1, 12)$, $(2, 6)$, $(3, 4)$ and their negative cousins; the sum dial $p = 8$ chooses $(2, 6)$. Option 1 is the pair for the OTHER $q = 12$ quadratic — $x^{2} + 7x + 12$ — its sum is 7. Option 2 sums to 13. Option 4 has the right product but the wrong sign of the sum: $-8$ would belong to $x^{2} - 8x + 12$, since $q > 0$ with $p = +8$ forces both members positive.',
          },
          {
            q: '$x^{2} - 2x - 15$ factors as',
            options: ['$(x + 5)(x + 3)$', '$(x - 5)(x + 3)$', '$(x - 5)(x - 3)$', '$(x + 15)(x - 1)$'],
            answer: 1,
            explain: 'Here $q = -15 < 0$: opposite signs; the larger magnitude carries $p = -2$, so the pair is $-5$ and $+3$. Option 1 expands to $x^{2} + 8x + 15$ — right magnitudes, both signs up. Option 3 expands to $x^{2} - 8x + 15$ — a positive product, already wrong against $q = -15$. Option 4 expands to $x^{2} + 14x - 15$ — the extreme pair of the dial, chosen by no sum. The check: $(x - 5)(x + 3) = x^{2} - 2x - 15$ ✓.',
          },
          {
            q: 'The gauge of $x^{2} + 5x + 8$ is',
            options: ['$32 - 25 = 7$', '$25 + 32 = 57$', '$25 - 40 = -15$', '$25 - 32 = -7$: the hunt refuses'],
            answer: 3,
            explain: 'The gauge is $p^{2} - 4q = 25 - 4 \\cdot 8 = 25 - 32 = -7$, negative — so no real pair exists and the factorization over the integers is refused absolutely. Option 1 flipped the subtraction; option 2 flipped the sign of $4q$; option 3 computed $p \\cdot q = 40$ instead of $4q = 32$. A negative gauge is not a failure of patience — it is the theorem saying the pair does not exist (chapter 9’s formula will say what does).',
          },
          {
            q: '$6x^{2} + 19x + 15$ factors as',
            options: ['$(6x + 5)(x + 3)$', '$(2x + 3)(3x + 5)$', '$(3x + 5)(3x + 3)$', '$(2x + 5)(3x + 3)$'],
            answer: 1,
            explain: 'The AC product is 90; the pair $(9, 10)$ has sum 19; the split $6x^{2} + 9x + 10x + 15$ groups to $(2x + 3)(3x + 5)$. Option 1 expands to $6x^{2} + 23x + 15$ — the sum dial overshot by 4. Option 3 expands to $9x^{2} + 24x + 15$ — the leading coefficient is 9, not 6. Option 4 expands to $6x^{2} + 21x + 15$ — middle term 21, the classic near-miss pair $(5, 6)$ priced against $ac = 90$ in vain. Expand every option and the slips surface in seconds.',
          },
          {
            q: 'Factor $18x^{2} + 21x + 6$ completely',
            options: ['$(6x + 3)(3x + 2)$', '$3(3x + 1)(2x + 2)$', '$(9x + 6)(2x + 1)$', '$3(2x + 1)(3x + 2)$'],
            answer: 3,
            explain: 'GCF first: $18x^{2} + 21x + 6 = 3(6x^{2} + 7x + 2)$, and the primitive hunt ($ac = 12$, the pair 4 and 3) gives $(2x + 1)(3x + 2)$. Options 1 and 3 both expand to the original — but they are INCOMPLETE: 3 still divides the first bracket, and "factor completely" refuses them. Option 2 expands to $18x^{2} + 24x + 6$ — the middle term drifted. The full answer keeps the leading 3: $3(2x + 1)(3x + 2)$, every bracket primitive.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 4.2', sets: [
          {
            level: 'L1',
            questions: [
              {
                q: 'Factor $x^{2} + 9x + 20$ (state the gauge too).',
                solution: [
                  'The gauge: $9^{2} - 4 \\cdot 20 = 81 - 80 = 1 = 1^{2}$ — a perfect square, the pair exists.',
                  'The pair: $\\frac{9 \\pm 1}{2} = 5$ and $4$ — product 20, sum 9.',
                  'Hence $x^{2} + 9x + 20 = (x + 4)(x + 5)$.',
                  'Check: $(x + 4)(x + 5) = x^{2} + 9x + 20$ ✓.',
                ],
                answer: '$(x + 4)(x + 5)$',
              },
              {
                q: 'Factor $x^{2} - 11x + 24$.',
                solution: [
                  'Price the signs: $q = 24 > 0$ and $p = -11 < 0$ — both members negative.',
                  'The dial: $3 \\times 8 = 24$ and $3 + 8 = 11$ — the magnitudes.',
                  'Hence $x^{2} - 11x + 24 = (x - 3)(x - 8)$.',
                  'Check: $x^{2} - 8x - 3x + 24 = x^{2} - 11x + 24$ ✓.',
                ],
                answer: '$(x - 3)(x - 8)$',
              },
              {
                q: 'Factor $x^{2} + 3x - 28$.',
                solution: [
                  'Price the signs: $q = -28 < 0$ — opposite signs; $p = +3$, so the positive partner has the larger magnitude.',
                  'The dial of 28: $7 \\times 4 = 28$, difference $7 - 4 = 3$ — the pair $+7$ and $-4$.',
                  'Hence $x^{2} + 3x - 28 = (x + 7)(x - 4)$.',
                  'Check: $x^{2} - 4x + 7x - 28 = x^{2} + 3x - 28$ ✓.',
                ],
                answer: '$(x + 7)(x - 4)$',
              },
            ],
          },
          {
            level: 'L2',
            questions: [
              {
                q: 'Factor $x^{2} - 6x + 9$, and name the gauge verdict.',
                solution: [
                  'The gauge: $36 - 36 = 0$ — the double case.',
                  'So, $a = b = \\frac{-6}{2} = -3$: the trinomial square.',
                  'Hence $x^{2} - 6x + 9 = (x - 3)^{2}$ — 3.3’s identity re-derived by the hunt.',
                  'Check: $(x - 3)^{2} = x^{2} - 6x + 9$ ✓, and the middle-term test agrees: $2 \\cdot 1 \\cdot (-3) = -6$ ✓.',
                ],
                answer: '$(x - 3)^{2}$',
              },
              {
                q: 'Factor both $x^{2} + 5x + 6$ and $x^{2} + 7x + 6$ — one dial, two sums.',
                solution: [
                  'Both share the product dial $q = 6$: pairs $(1, 6)$, $(2, 3)$, and negatives.',
                  'Take $x^{2} + 5x + 6$: the sum dial chooses $(2, 3)$ — $x^{2} + 5x + 6 = (x + 2)(x + 3)$.',
                  'Take $x^{2} + 7x + 6$: the sum dial chooses $(1, 6)$ — $x^{2} + 7x + 6 = (x + 1)(x + 6)$.',
                  'Checks: $(x + 2)(x + 3) = x^{2} + 5x + 6$ ✓ and $(x + 1)(x + 6) = x^{2} + 7x + 6$ ✓ — one dial, two different quadratics.',
                ],
                answer: '$(x + 2)(x + 3)$ and $(x + 1)(x + 6)$',
              },
              {
                q: 'Use the gauge to show that $x^{2} + x + 1$ and $x^{2} + 4x + 6$ refuse to factor over the integers.',
                solution: [
                  'Take $x^{2} + x + 1$: the gauge is $1 - 4 = -3 < 0$ — no real pair exists, refusal absolute.',
                  'Take $x^{2} + 4x + 6$: the gauge is $16 - 24 = -8 < 0$ — refused the same way.',
                  'Both are honest refusals by the theorem: the gauge is 3.3’s $(a - b)^{2}$, and no square is negative.',
                  'Hence neither trinomial factors over the integers — chapter 9’s formula will factor them over the reals, and the discriminant will say exactly how.',
                ],
                answer: 'gauges $-3$ and $-8$, both negative — both irreducible over the integers',
              },
            ],
          },
          {
            level: 'L3',
            questions: [
              {
                q: 'Factor $2x^{2} + 7x + 3$ by the AC split.',
                solution: [
                  'The AC product: $a \\cdot c = 2 \\cdot 3 = 6$; hunt two numbers with sum 7, product 6 — the pair 6 and 1.',
                  'Split: $2x^{2} + 7x + 3 = 2x^{2} + 6x + x + 3$.',
                  'Group: $2x(x + 3) + 1(x + 3) = (x + 3)(2x + 1)$ — the brackets match.',
                  'Hence $2x^{2} + 7x + 3 = (2x + 1)(x + 3)$ — check: $2x \\cdot x + 2x \\cdot 3 + 1 \\cdot x + 3 = 2x^{2} + 7x + 3$ ✓.',
                ],
                answer: '$(2x + 1)(x + 3)$',
              },
              {
                q: 'Factor $4x^{2} + 13x + 9$ by the AC split.',
                solution: [
                  'The AC product: $4 \\cdot 9 = 36$; hunt two numbers with sum 13, product 36 — the pair 9 and 4.',
                  'Split: $4x^{2} + 13x + 9 = 4x^{2} + 9x + 4x + 9$.',
                  'Group: $x(4x + 9) + 1(4x + 9) = (4x + 9)(x + 1)$ — the brackets match.',
                  'Hence $4x^{2} + 13x + 9 = (4x + 9)(x + 1)$ — check: $4x^{2} + 4x + 9x + 9 = 4x^{2} + 13x + 9$ ✓.',
                ],
                answer: '$(4x + 9)(x + 1)$',
              },
              {
                q: 'Factor $10x^{2} - 3x - 4$, with the signs priced.',
                solution: [
                  'The AC product: $10 \\cdot (-4) = -40$ — negative, opposite signs; $p = -3$, so the negative partner has the larger magnitude.',
                  'The dial of 40: $8 \\times 5 = 40$ — the pair $-8$ and $+5$ (sum $-3$, product $-40$).',
                  'Split: $10x^{2} - 3x - 4 = 10x^{2} - 8x + 5x - 4$.',
                  'Group: $2x(5x - 4) + 1(5x - 4) = (5x - 4)(2x + 1)$ — check: $10x^{2} + 5x - 8x - 4 = 10x^{2} - 3x - 4$ ✓.',
                ],
                answer: '$(5x - 4)(2x + 1)$',
              },
            ],
          },
          {
            level: 'L4',
            questions: [
              {
                q: 'Factor $9x^{2} + 30x + 25$, and name the 4.3 bridge it lands on.',
                solution: [
                  'The AC product: $9 \\cdot 25 = 225$; hunt two numbers with sum 30, product 225 — the pair 15 and 15.',
                  'Split: $9x^{2} + 30x + 25 = 9x^{2} + 15x + 15x + 25$.',
                  'Group: $3x(3x + 5) + 5(3x + 5) = (3x + 5)^{2}$ — the split landed on a perfect square.',
                  'Hence $9x^{2} + 30x + 25 = (3x + 5)^{2}$ — check: $9x^{2} + 15x + 15x + 25$ ✓; the gauge is zero ($900 - 900$), and 4.3 reads the identities as factorizations in exactly this direction.',
                ],
                answer: '$(3x + 5)^{2}$',
              },
              {
                q: 'Factor $8x^{2} - 22x + 15$ by the AC split.',
                solution: [
                  'The AC product: $8 \\cdot 15 = 120$ — positive with $p = -22 < 0$: both members negative.',
                  'The dial of 120: $12 \\times 10 = 120$ and $12 + 10 = 22$ — the pair $-12$ and $-10$.',
                  'Split: $8x^{2} - 22x + 15 = 8x^{2} - 12x - 10x + 15$.',
                  'Group: $4x(2x - 3) - 5(2x - 3) = (2x - 3)(4x - 5)$ — check: $8x^{2} - 10x - 12x + 15 = 8x^{2} - 22x + 15$ ✓.',
                ],
                answer: '$(2x - 3)(4x - 5)$',
              },
            ],
          },
          {
            level: 'L5',
            questions: [
              {
                q: 'Factor $6x^{3} + 21x^{2} + 15x$ completely — the GCF reflex first.',
                solution: [
                  'The GCF of all three terms: $3x$ — extract it before any hunting: $3x(2x^{2} + 7x + 5)$.',
                  'The primitive hunt: $ac = 10$, sum 7 — the pair 5 and 2.',
                  'Split and group: $2x^{2} + 7x + 5 = 2x^{2} + 5x + 2x + 5 = x(2x + 5) + 1(2x + 5) = (2x + 5)(x + 1)$.',
                  'Hence $6x^{3} + 21x^{2} + 15x = 3x(x + 1)(2x + 5)$ — check: $3x \\cdot (x + 1)(2x + 5) = 3x(2x^{2} + 7x + 5)$ ✓, all brackets primitive.',
                ],
                answer: '$3x(x + 1)(2x + 5)$',
              },
              {
                q: 'Show the gauge refuses $3x^{2} + 7x + 3$, then factor its neighbour $3x^{2} + 7x + 2$.',
                solution: [
                  'Take $3x^{2} + 7x + 3$: the gauge is $49 - 4 \\cdot 9 = 13$ — positive but not a perfect square, so no integer pair exists (a real pair does; chapter 9 finds it).',
                  'Take $3x^{2} + 7x + 2$: the gauge is $49 - 24 = 25 = 5^{2}$ — the pair $\\frac{7 \\pm 5}{2} = 6, 1$ on the AC dial ($ac = 6$).',
                  'Split and group: $3x^{2} + 7x + 2 = 3x^{2} + 6x + x + 2 = 3x(x + 2) + 1(x + 2) = (x + 2)(3x + 1)$.',
                  'Check: $(x + 2)(3x + 1) = 3x^{2} + 7x + 2$ ✓ — one constant of separation turned a refusal into a factorization.',
                ],
                answer: '$3x^{2} + 7x + 3$ irreducible over the integers (gauge 13); $3x^{2} + 7x + 2 = (x + 2)(3x + 1)$',
              },
            ],
          },
          {
            level: 'L6',
            questions: [
              {
                q: 'Factor $6x^{4} - 7x^{3} + 2x^{2}$ completely — chain the moves.',
                solution: [
                  'The GCF of all three terms: $x^{2}$ — extract: $x^{2}(6x^{2} - 7x + 2)$.',
                  'The primitive hunt: $ac = 12$, sum $-7$, both negative — the pair $-4$ and $-3$.',
                  'Split and group: $6x^{2} - 7x + 2 = 6x^{2} - 4x - 3x + 2 = 2x(3x - 2) - 1(3x - 2) = (3x - 2)(2x - 1)$.',
                  'Hence $6x^{4} - 7x^{3} + 2x^{2} = x^{2}(3x - 2)(2x - 1)$ — check: $x^{2} \\cdot (6x^{2} - 7x + 2) = 6x^{4} - 7x^{3} + 2x^{2}$ ✓; three factors, every one irreducible.',
                ],
                answer: '$x^{2}(3x - 2)(2x - 1)$',
              },
            ],
          },
        ] },
      ],
    },
  ],
  plannedLessons: ['The Identities as Factorizations', 'The Factor Theorem and Cubics'],
}
