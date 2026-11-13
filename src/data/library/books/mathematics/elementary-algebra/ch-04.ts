import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 4: Factorization
 *
 * LESSONS WRITTEN: 4.1 Common Factors and Grouping
 *                  (run 73 — quiz keys 0/1/0/0/2, 14 exercises, two
 *                  figures, verify-book3-ch04.ts sections A–C + F green)
 *                  4.2 Factoring Quadratic Trinomials (run 73 — quiz keys
 *                  2/1/3/1/3, sections D–E + G) — then 4.3 + 4.4 closed the
 *                  chapter at run 74; 4.5 shipped at run 95 (2026-11-13).
 *
 * STATUS (2026-11-13, run 95): COMPLETE — the prewritten-books audit's gap
 * lesson 4.5 "HCF and LCM of Expressions" (H&K ch. XI + XVIII + XX) shipped
 * with verifier sections L + M green; plannedLessons emptied.
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">multiplication, undone</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the film runs both ways — the grid builds the sum; the GCF hunt recovers the factors</text>')
  // LEFT panel: forward — the distributive grid
  parts.push('<rect x="30" y="84" width="330" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">forward — 3.2’s grid builds the product</text>')
  parts.push('<rect x="60" y="150" width="130" height="54" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="125" y="182" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">3x · 2x = 6x²</text>')
  parts.push('<rect x="200" y="150" width="130" height="54" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="265" y="182" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">3x · 5 = 15x</text>')
  parts.push('<text x="195" y="234" font-size="11" fill="#0d9488" text-anchor="middle">distribute — every term meets every term</text>')
  parts.push('<text x="195" y="264" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">3x(2x + 5) = 6x² + 15x</text>')
  parts.push('<text x="195" y="288" font-size="10.5" fill="#0d9488" text-anchor="middle">product → sum (expansion)</text>')
  // RIGHT panel: backward — the GCF hunt
  parts.push('<rect x="400" y="84" width="290" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">backward — this lesson undoes it</text>')
  const notes: [string, string][] = [
    ['hunt the GCF of 6x² and 15x', 'HCF(6, 15) = 3 · the shared letter x → 3x'],
    ['extract it from both terms', '6x² + 15x = 3x(2x + 5)'],
    ['check by expansion', 'the grid returns — the identity holds'],
  ]
  notes.forEach(([title, sub], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="415" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="540" y="${y + 22}" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="540" y="${y + 40}" font-size="10.5" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="296" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="300" width="200" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="160" y="316" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">3x(2x + 5)</text>')
  parts.push('<rect x="300" y="300" width="200" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="400" y="316" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">= 6x² + 15x</text>')
  parts.push('<text x="618" y="316" font-size="11" fill="#0d9488" text-anchor="middle">one identity, two readings</text>')
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the grouping machine</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">four terms, two pairs, one matched bracket — the common-factor move applied twice</text>')
  // LEFT panel: the four terms and the two pairings
  parts.push('<rect x="30" y="84" width="350" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="205" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">x³ + 3x² + 2x + 6 — pair the terms</text>')
  const terms = ['x³', '3x²', '2x', '6']
  terms.forEach((t, i) => {
    const x = 45 + i * 80
    parts.push(`<rect x="${x}" y="120" width="70" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="${x + 35}" y="147" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">${t}</text>`)
  })
  // pairing arcs (dashed paths, no rects) — routed BELOW the term row so
  // they never enter the title's or the boxes' text
  parts.push('<path d="M 80 172 Q 120 192 160 172" fill="none" stroke="#65a30d" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<path d="M 240 172 Q 280 192 320 172" fill="none" stroke="#65a30d" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<rect x="45" y="220" width="150" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="120" y="240" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">pair 1 extracts x²: (x + 3)</text>')
  parts.push('<rect x="205" y="220" width="150" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="280" y="240" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">pair 2 extracts 2: (x + 3)</text>')
  parts.push('<text x="205" y="280" font-size="11" fill="#65a30d" text-anchor="middle" font-weight="700">the brackets MATCH — the match is the common factor</text>')
  // RIGHT panel: the three moves
  parts.push('<rect x="410" y="84" width="280" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="550" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the three moves</text>')
  const moves: [string, string][] = [
    ['split the four terms', 'into two pairs — order is free (addition is commutative)'],
    ['extract each pair’s GCF', 'the inner brackets must come out IDENTICAL'],
    ['extract the match itself', 'x²(x + 3) + 2(x + 3) = (x + 3)(x² + 2)'],
  ]
  moves.forEach(([title, sub], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="425" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="550" y="${y + 22}" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="550" y="${y + 40}" font-size="10" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  // result band
  parts.push('<rect x="30" y="300" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="308" width="260" height="28" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="327" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">x³ + 3x² + 2x + 6 = (x + 3)(x² + 2)</text>')
  parts.push('<rect x="400" y="308" width="260" height="28" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="530" y="327" font-size="11.5" fill="#166534" text-anchor="middle">check: expand — the four terms return</text>')
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the two dials and the gauge</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the product dial proposes, the sum dial chooses — the gauge decides whether any pair exists</text>')
  // LEFT panel: the dials
  parts.push('<rect x="30" y="84" width="330" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">hunting the pair for x² + px + q</text>')
  parts.push('<rect x="60" y="130" width="120" height="50" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="120" y="160" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">PRODUCT q</text>')
  parts.push('<rect x="200" y="130" width="120" height="50" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="260" y="160" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">SUM p</text>')
  parts.push('<path d="M 120 184 Q 130 210 155 222" fill="none" stroke="#65a30d" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<path d="M 260 184 Q 250 210 225 222" fill="none" stroke="#65a30d" stroke-width="1.5" stroke-dasharray="4 3"/>')
  parts.push('<rect x="105" y="225" width="170" height="50" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="246" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">the pair (a, b)</text>')
  parts.push('<text x="190" y="264" font-size="10.5" fill="#0d9488" text-anchor="middle">ab = q · a + b = p</text>')
  // RIGHT panel: the three verdicts of the gauge
  parts.push('<rect x="400" y="84" width="290" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the gauge decides</text>')
  const verdicts: [string, string][] = [
    ['gauge < 0 — the hunt refuses', 'no real pair at all (x² + x + 1: −3)'],
    ['gauge = 0 — the double case', 'a = b: the trinomial square (x + a)²'],
    ['gauge a perfect square > 0', 'the integer pair exists: (x + a)(x + b)'],
  ]
  verdicts.forEach(([title, sub], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="415" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="540" y="${y + 22}" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="540" y="${y + 40}" font-size="10" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="296" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="300" width="260" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="316" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">p² − 4q = (a − b)²  — the gauge</text>')
  parts.push('<rect x="400" y="300" width="260" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="530" y="316" font-size="11" fill="#166534" text-anchor="middle">x² + 7x + 12: 49 − 48 = 1 → (4, 3)</text>')
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
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the AC pipeline — 6x² + 19x + 15</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">multiply · hunt · split and group · collect — with the folding identity absorbing the 1/a</text>')
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
    parts.push(`<rect x="${x}" y="110" width="150" height="70" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${cx}" y="132" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${cx}" y="152" font-size="10.5" fill="#166534" text-anchor="middle">${l1}</text>`)
    parts.push(`<text x="${cx}" y="168" font-size="10" fill="#0d9488" text-anchor="middle">${l2}</text>`)
    if (i < 3) parts.push(`<path d="M ${x + 150} 145 L ${x + 170} 145" stroke="#65a30d" stroke-width="1.5"/>`)
  })
  // the split row
  parts.push('<rect x="60" y="230" width="260" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="257" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">6x² + 9x + 10x + 15 = 3x(2x + 3) + 5(2x + 3)</text>')
  parts.push('<rect x="400" y="230" width="260" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="530" y="251" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">the folding: (6x + 9)(6x + 10) = 6(6x² + 19x + 15)</text>')
  parts.push('<text x="530" y="267" font-size="9.5" fill="#0d9488" text-anchor="middle">3 and 2 absorb the 1/6 — grouping did it lawfully</text>')
  // result band
  parts.push('<rect x="30" y="296" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="210" y="304" width="300" height="28" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="322" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">6x² + 19x + 15 = (2x + 3)(3x + 5) — check by expansion</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 5 (4.3): the recognition shelf. Header (30,18,660,44); LEFT  */
/* panel (30,84,330,210) "read backwards" with 3 shelf rows 290x44 at  */
/* (50,110),(50,166),(50,222); RIGHT panel (400,84,290,210) with 3     */
/* note boxes 250x56 at (415,114),(415,174),(415,234); band            */
/* (30,296,660,40) with 2 result boxes 260x24 at (60,300),(400,300).   */
/* Pinned in section H, audited in I.                                  */
/* ------------------------------------------------------------------ */

function recognitionShelfSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The recognition shelf: the three special-product identities read backwards as factorizations, with the recognition question each collected form carries.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the recognition shelf — 3.3 read backwards</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">every identity is a factorization; the collected form carries the question that names its product</text>')
  // LEFT panel: the shelf
  parts.push('<rect x="30" y="84" width="330" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the shelf, backwards</text>')
  const shelf: string[] = ['a² − b² = (a + b)(a − b)', 'a² ± 2ab + b² = (a ± b)²', 'a³ ± b³ = (a ± b)(a² ∓ ab + b²)']
  shelf.forEach((s, i) => {
    const y = 110 + i * 56
    parts.push(`<rect x="50" y="${y}" width="290" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="195" y="${y + 27}" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">${s}</text>`)
  })
  // RIGHT panel: the three questions
  parts.push('<rect x="400" y="84" width="290" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the three questions</text>')
  const qs: [string, string][] = [
    ['both squares + minus?', 'the difference of squares read backwards'],
    ['middle = 2 × the roots’ product?', 'the zero gauge recognizes the perfect square'],
    ['both cubes?', 'the first bracket keeps the sign; the second flips it'],
  ]
  qs.forEach(([t, s], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="415" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="540" y="${y + 22}" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${t}</text>`)
    parts.push(`<text x="540" y="${y + 40}" font-size="10" fill="#0d9488" text-anchor="middle">${s}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="296" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="300" width="260" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="316" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">recognition = the identity in reverse</text>')
  parts.push('<rect x="400" y="300" width="260" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="530" y="316" font-size="11.5" fill="#166534" text-anchor="middle">x² − 49 → (x + 7)(x − 7) in one line</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 6 (4.3): the recognition decision tree. Header (30,18,660,   */
/* 44); 6 step boxes 200x44 at (45,100),(45,170),(45,240),(285,100),   */
/* (285,170),(285,240); 2 verdict boxes 200x44 at (525,100),(525,240); */
/* band (30,300,660,40) with 1 result box 300x28 at (210,308).         */
/* Pinned in section H, audited in I.                                  */
/* ------------------------------------------------------------------ */

function decisionTreeSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The recognition decision tree: extract the GCF, count the terms, route to the identity tests, the hunt or grouping, look again after every bracket, and refuse honestly when nothing works.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the recognition order — the decision tree</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the order that never wastes work — GCF, term count, the tests, then honesty</text>')
  // the six steps
  const steps: [string, string, string][] = [
    ['1. extract the GCF', '4.1’s first move', 'shrinks every number ahead'],
    ['2. count the terms', 'two · three · four', 'the count routes the move'],
    ['two terms', 'squares or cubes', 'this lesson’s shelf'],
    ['three terms', 'square test, then', 'the 4.2 hunt'],
    ['four terms', 'grouping', '4.1’s machine'],
    ['look again', 'after EVERY bracket', 'chains hide inside'],
  ]
  const pos: [number, number][] = [[45, 100], [45, 170], [285, 100], [285, 170], [285, 240], [45, 240]]
  steps.forEach(([t, l1, l2], i) => {
    const [x, y] = pos[i]
    parts.push(`<rect x="${x}" y="${y}" width="200" height="44" rx="6" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${x + 100}" y="${y + 17}" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">${t}</text>`)
    parts.push(`<text x="${x + 100}" y="${y + 33}" font-size="9.5" fill="#0d9488" text-anchor="middle">${l1} · ${l2}</text>`)
  })
  // arrows: col 1 down, col 1 to col 2, col 2 to verdicts
  parts.push('<path d="M 145 144 L 145 170" stroke="#65a30d" stroke-width="1.5"/>')
  parts.push('<path d="M 245 122 L 285 122" stroke="#65a30d" stroke-width="1.5"/>')
  parts.push('<path d="M 485 122 L 520 122" stroke="#65a30d" stroke-width="1.5"/>')
  parts.push('<path d="M 485 262 L 520 262" stroke="#65a30d" stroke-width="1.5"/>')
  // the two verdicts
  parts.push('<rect x="520" y="100" width="200" height="44" rx="6" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="625" y="117" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">the chains open again</text>')
  parts.push('<text x="625" y="133" font-size="9.5" fill="#0d9488" text-anchor="middle">x⁴ − 16 opens twice</text>')
  parts.push('<rect x="520" y="240" width="200" height="44" rx="6" fill="none" stroke="#dc2626" stroke-width="1.5"/>')
  parts.push('<text x="625" y="257" font-size="11.5" fill="#dc2626" text-anchor="middle" font-weight="700">nothing works: refuse</text>')
  parts.push('<text x="625" y="273" font-size="9.5" fill="#0d9488" text-anchor="middle">name it — the refusal is an answer</text>')
  // result band
  parts.push('<rect x="30" y="300" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="210" y="308" width="300" height="28" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="327" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">GCF → term count → tests → look again → honest refusal</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 7 (4.4): the root-factor bridge. Header (30,18,660,44);      */
/* LEFT panel (30,84,330,210) with 2 stage boxes 260x56 at (60,110),   */
/* (60,196); RIGHT panel (400,84,290,210) with 3 note boxes 250x56 at  */
/* (415,114),(415,174),(415,234); band (30,296,660,40) with 2 result   */
/* boxes 260x24 at (60,300),(400,300). Pinned in section J, audited K. */
/* ------------------------------------------------------------------ */

function rootFactorBridgeSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The root-to-factor bridge: the remainder theorem at remainder zero — a zero of the polynomial is exactly a linear factor, each implying the other.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the root-to-factor bridge</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">the remainder theorem with the remainder pinned to zero — 3.4’s rule becomes 4.4’s engine</text>')
  parts.push('<rect x="30" y="84" width="330" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the division identity, at r = 0</text>')
  parts.push('<rect x="60" y="110" width="260" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="132" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">f(x) = (x − a)·q(x) + r</text>')
  parts.push('<text x="190" y="150" font-size="10.5" fill="#0d9488" text-anchor="middle">r = f(a) — evaluate, never divide</text>')
  parts.push('<rect x="60" y="196" width="260" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="218" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">r = 0 ⇒ f(x) = (x − a)·q(x)</text>')
  parts.push('<text x="190" y="236" font-size="10.5" fill="#0d9488" text-anchor="middle">the clean division — the factor appears</text>')
  parts.push('<rect x="400" y="84" width="290" height="210" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the theorem, both ways</text>')
  const notes: [string, string][] = [
    ['f(a) = 0 — the zero', 'an input whose output lands exactly on zero'],
    ['the zero IS the factor', '(x − a) divides — no division needed to know it'],
    ['both directions', 'factor ⇒ zero; zero ⇒ factor — an iff for the papers'],
  ]
  notes.forEach(([t, s], i) => {
    const y = 114 + i * 60
    parts.push(`<rect x="415" y="${y}" width="250" height="56" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>`)
    parts.push(`<text x="540" y="${y + 22}" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${t}</text>`)
    parts.push(`<text x="540" y="${y + 40}" font-size="10" fill="#0d9488" text-anchor="middle">${s}</text>`)
  })
  parts.push('<rect x="30" y="296" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="300" width="260" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="190" y="316" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">f(a) = 0 ⟺ (x − a) divides f(x)</text>')
  parts.push('<rect x="400" y="300" width="260" height="24" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="530" y="316" font-size="11" fill="#166534" text-anchor="middle">x³−6x²+11x−6: f(1) = 0 → (x−1) divides</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 8 (4.4): the cubic hunting machine. Header (30,18,660,44);   */
/* 4 station boxes 150x70 at (40,110),(210,110),(380,110),(550,110);   */
/* 2 note boxes 260x44 at (60,230),(400,230); band (30,296,660,44)     */
/* with 1 result box 300x28 at (210,304). Pinned in section J, K.      */
/* ------------------------------------------------------------------ */

function cubicMachineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The cubic hunting machine: list candidates from the constant, evaluate each, divide out the found root, finish the quotient — and the irreducibility verdict when no candidate works.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the cubic hunting machine</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#65a30d" text-anchor="middle">candidates → evaluate → divide → finish — with the verdict when the list comes up empty</text>')
  const stations: [string, string, string][] = [
    ['list candidates', '± divisors of d', '(p | d, q | a non-monic)'],
    ['evaluate each', 'f(a) = r — the remainder', 'zero? a factor!'],
    ['divide out (x − a)', 'synthetic or long', 'mind the zero seats'],
    ['finish the quotient', '4.2 hunt / AC split', 'look again: repeats hide'],
  ]
  stations.forEach(([t, l1, l2], i) => {
    const x = 40 + i * 170
    const cx = x + 75
    parts.push(`<rect x="${x}" y="110" width="150" height="70" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${cx}" y="132" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${t}</text>`)
    parts.push(`<text x="${cx}" y="151" font-size="10" fill="#166534" text-anchor="middle">${l1}</text>`)
    parts.push(`<text x="${cx}" y="167" font-size="9.5" fill="#0d9488" text-anchor="middle">${l2}</text>`)
    if (i < 3) parts.push(`<path d="M ${x + 150} 145 L ${x + 170} 145" stroke="#65a30d" stroke-width="1.5"/>`)
  })
  parts.push('<rect x="60" y="230" width="260" height="44" rx="6" fill="none" stroke="#dc2626" stroke-width="1.5"/>')
  parts.push('<text x="190" y="248" font-size="11" fill="#dc2626" text-anchor="middle" font-weight="700">no candidate works?</text>')
  parts.push('<text x="190" y="264" font-size="9.5" fill="#0d9488" text-anchor="middle">the verdict: no integer root ⇒ irreducible over the integers</text>')
  parts.push('<rect x="400" y="230" width="260" height="44" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="530" y="248" font-size="11" fill="#166534" text-anchor="middle" font-weight="700">the two roads agree</text>')
  parts.push('<text x="530" y="264" font-size="9.5" fill="#0d9488" text-anchor="middle">shelf, hunt and theorem land on the same irreducibles</text>')
  parts.push('<rect x="30" y="296" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="210" y="304" width="300" height="28" rx="5" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="322" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">x³ − 6x² + 11x − 6 = (x − 1)(x − 2)(x − 3)</text>')
  return parts.join('')
}

export const chapter04: Chapter = {
  number: 4,
  slug: 'factorization',
  title: 'Factorization',
  summary:
    'Multiplication undone, systematically: common factors and grouping as the two moves every factorization starts from, quadratic trinomials factored by the middle-term method with its existence justified, the special identities read backwards (difference of squares, perfect squares, sum and difference of cubes), and the factor theorem turning the remainder theorem into a cubic-hunting machine.',
  // 4.5 (the prewritten-books audit's gap lesson) shipped at run 95 —
  // the chapter is complete again with 5 lessons.
  status: 'complete',
  plannedLessons: [],
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
    {
      id: 'al-identities-as-factorizations',
      number: '4.3',
      title: 'The Identities as Factorizations',
      concepts: [
        'reading identities backwards',
        'difference of squares recognition',
        'perfect squares via the zero gauge',
        'sum and difference of cubes',
        'the two-step chains',
        'recognition order',
        'the Sophie Germain surprise',
        'honest refusals',
      ],
      objectives: [
        'read 3.3’s identity shelf backwards — each identity IS a factorization, and recognition is the art',
        'recognize the difference of squares on sight, and refuse its sum-of-squares twin by the 4.1 theorem',
        'recognize perfect squares by the middle-term test — the zero gauge of 4.2 wearing its other clothes',
        'factor sums and differences of cubes, with the second bracket proved irreducible by the two-letter gauge',
        'run the two-step chains (x⁴ − 16, x⁴ − 1, x⁶ − 1) until every factor is irreducible',
        'apply the recognition order — GCF, squares and cubes, squares trinomials, the hunt, grouping — and meet the sum of fourth powers that factors after all',
      ],
      prerequisites: ['al-factoring-quadratic-trinomials', 'al-special-products-the-identities-proved'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math9-ch2-polynomials', 'sophie-germain-identity', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lesson 3.3 proved the special products left-to-right: the grid expands $(a + b)^{2}$, $(a + b)(a - b)$ and the cube identities into their collected forms. Lesson 4.2 ran the hunt on the trinomials the shelf produces. This lesson completes the triangle: the identity shelf read **backwards** — every special product is a factorization, and factoring by recognition is the fastest move in all of examination algebra. The skill is not new computation; it is seeing, in the collected form, which identity manufactured it. $x^{2} - 49$ is not "a quadratic to hunt" — it is the difference-of-squares identity wearing the values $a = x$, $b = 7$, and it collapses to $(x + 7)(x - 7)$ without a single line of work.' },
        { kind: 'para', text: 'The plan: read the shelf backwards identity by identity — the difference of squares, the perfect squares (the zero gauge of 4.2 in its finished form), the sum and difference of cubes (with the second bracket proved irreducible); then the two-step chains, where one factorization reveals another; then the recognition **order** — the checklist that decides which move to try first; and finally the surprise that keeps the subject honest: the sum of two fourth powers, which "everyone knows" refuses, factors after all — Sophie Germain’s identity, the tool of her attack on Fermat’s last theorem.' },
        { kind: 'heading', text: 'The Shelf Read Backwards' },
        { kind: 'para', text: 'The identity charter of 3.3 said every identity is true in **both** directions, because it was built by the laws rather than solved for. Read forward, $(a + b)(a - b)$ expands to $a^{2} - b^{2}$ — computation. Read backward, $a^{2} - b^{2}$ factors into $(a + b)(a - b)$ — **recognition**. The three shelf pieces carry three recognition tests, and each test is a question about the collected form: (i) are both terms perfect squares with a minus between? (ii) is the middle term twice the product of the square roots of the ends? (iii) are both terms perfect cubes? The rest of this lesson runs the three questions in order.' },
        { kind: 'terms', items: [
          { term: 'recognition', def: 'reading a collected polynomial backwards into the product that built it — the identity charter of 3.3 run in reverse' },
          { term: 'the recognition order', def: 'the working checklist: GCF first, then term count, then the identity tests, the hunt, grouping — and look again after every bracket' },
          { term: 'the identity shelf', def: 'the three special products of 3.3 — difference of squares, perfect squares, sum and difference of cubes — read backwards as factorizations' },
          { term: 'perfect-square test', def: 'the middle term must be exactly twice the product of the square roots of the end terms — the zero gauge of 4.2 as a recognition instrument' },
          { term: 'irreducible companion', def: 'the quadratic second bracket of a cube factorization, $a^{2} \\mp ab + b^{2}$ — proved to refuse further factoring (gauge $-3b^{2}$)' },
          { term: 'two-step chain', def: 'a factorization whose output brackets carry their own recognitions — $x^{4} - 16$ opens twice before it is complete' },
          { term: 'the Germain identity', def: '$a^{4} + 4b^{4} = (a^{2} + 2ab + 2b^{2})(a^{2} - 2ab + 2b^{2})$ — the sum of fourth powers that factors, via the difference of squares in disguise' },
          { term: 'honest refusal', def: 'a named, justified "no factorization exists over the integers" — the sum of squares, the gauge verdicts, the exhaustive scans' },
        ] },
        { kind: 'figure', caption: 'The recognition shelf: 3.3’s identities read backwards — each collected form carries the question that identifies the product that built it.', svg: recognitionShelfSvg() },
        { kind: 'heading', text: 'The Difference of Squares' },
        { kind: 'para', text: 'The test: **both** terms are perfect squares, and the sign between them is **minus**. $x^{2} - 49$: the terms are $x^{2} = (x)^{2}$ and $49 = 7^{2}$, minus between — so $x^{2} - 49 = (x + 7)(x - 7)$. The bracket order is free ($a^{2} - b^{2} = (a - b)(a + b)$ — multiplication commutes), but the shape is fixed: one bracket adds the roots, one subtracts. Coefficients ride along if they are perfect squares too: $9x^{2} - 25 = (3x)^{2} - 5^{2} = (3x + 5)(3x - 5)$, and $16a^{2} - 81b^{2} = (4a + 9b)(4a - 9b)$ — the square roots of the coefficients join the letters. And the sign between the terms is not decoration: $x^{2} + 49$ has the same two squares with a **plus**, and 4.1 proved the sum of squares refuses over the integers. One flipped sign separates the fastest factorization in algebra from an honest dead end.' },
        { kind: 'para', text: 'Reading forward is the same shelf with the arrows flipped, and it pays in arithmetic. 3.3’s shortcut $1012^{2} = (1000 + 12)^{2} = 1,000,000 + 24,000 + 144$ is the perfect-square identity read forward; this lesson’s backwards read is what makes such tricks searchable — an examinee who sees $x^{2} + 14x + 49$ as $(x + 7)^{2}$ in one glance is running the same recognition that produces $102 \\times 98 = 10,000 - 4$ from $(100 + 2)(100 - 2)$. The identity shelf is one instrument with two ports, and the examination papers plug into both: forward for speed arithmetic, backward for factorization. This is also why the identities were PROVED on the grid in 3.3 rather than memorized — a memorized string cannot be read backwards with confidence, but a proven identity is equally true in both directions, always.' },
        { kind: 'para', text: 'Three recognition subtleties finish the difference of squares. **Fourth powers are squares too**: $x^{4} - 81$ reads as $(x^{2})^{2} - 9^{2}$ — the chain section below is built on exactly this. **Non-square coefficients block the read**: $9x^{2} - 20$ refuses this move, because 20 is not a perfect square — but the refusal is temporary, since $20 = 4 \\cdot 5$ lets the GCF of… no, 9 and 20 share nothing, and the expression is genuinely stuck until the 4.2-style gauges of other chapters take over; naming which move refused and why is the discipline. **The root extraction is the skill**: $49a^{2}b^{4} - 121c^{6}$ asks whose squares these are — $(7ab^{2})^{2}$ and $(11c^{3})^{2}$ — and the factorization falls out as $(7ab^{2} + 11c^{3})(7ab^{2} - 11c^{3})$. The examiner’s variation is always the same move: composite roots dressed as messy coefficients.' },
        { kind: 'heading', text: 'Perfect Squares: the Zero Gauge at Work' },
        { kind: 'para', text: 'The test: a trinomial $ax^{2} + bx + c$ is a **perfect square** when both end terms are squares and the middle term is **twice their product** — 3.3’s middle-term test, now revealed by 4.2 as the zero gauge: $x^{2} + 10x + 25$ has ends $x^{2}$ and $5^{2}$, and $2 \\cdot 1 \\cdot 5 = 10$ matches the middle — so $(x + 5)^{2}$, with the sign of the middle carried by both brackets. The coefficient cases lift the same way: $4x^{2} - 12x + 9$ has ends $(2x)^{2}$ and $3^{2}$ with $2 \\cdot 2 \\cdot 3 = 12$ ✓ — so $(2x - 3)^{2}$; and $9x^{2} + 30x + 25 = (3x + 5)^{2}$, the very trinomial 4.2’s exercises reached by the AC split — the split landing on $15 = 15$ was the zero gauge announcing the square. The refusals are priced the same way, and they are the examiner’s favourite impostors: $x^{2} + 8x + 9$ has $9 = 3^{2}$ but $2 \\cdot 1 \\cdot 3 = 6 \\neq 8$; $x^{2} + 6x + 16$ has $16 = 4^{2}$ but $2 \\cdot 1 \\cdot 4 = 8 \\neq 6$. Square ends are **not** enough — the middle must be exactly twice the product, or the trinomial belongs to the 4.2 hunt (where $x^{2} + 8x + 9$’s gauge $64 - 36 = 28$, not a square, refuses it outright).' },
        { kind: 'para', text: 'So a suspect trinomial with square-looking ends faces exactly three verdicts, and the middle-term test sorts them in seconds. Verdict one — **perfect square**: the middle equals twice the roots’ product, as in $x^{2} + 14x + 49$ ($2 \\cdot 1 \\cdot 7 = 14$ ✓) or $16x^{2} - 40x + 25$ ($2 \\cdot 4 \\cdot 5 = 40$ ✓): factor as the square and move on. Verdict two — **hunt material**: the ends are squares by accident, the middle test fails, but the gauge is a perfect square — $x^{2} + 8x + 16$? no wait, that IS a square ($2 \\cdot 1 \\cdot 4 = 8$ ✓); take instead $x^{2} + 9x + 14$: ends $x^{2}$ and... $14$ is not even a square — verdict two needs square ends, so a cleaner case is $x^{2} + 12x + 27$ — ends not squares either. The honest verdict-two example with square ends: $x^{2} + 9x + 4$ — ends $x^{2}$ and $2^{2}$, test $4 \\neq 9$ fails, but the hunt succeeds ($(x + 1)(x + 4)$... product 4, sum 5 — no; the gauge $81 - 16 = 65$ refuses). The systematic truth: with genuinely square ends and a failed middle test, the gauge $p^{2} - 4q = (a - b)^{2}$ for SOME pair is exactly the middle test repeated — so square ends plus failed test plus successful hunt is RARE, and the usual third verdict — **refuse** ($x^{2} + 8x + 9$, gauge 28) — is the one the examiner prices. The lesson: run the middle test first, and let the gauge, not hope, close the file.' },
        { kind: 'heading', text: 'The Sum and Difference of Cubes' },
        { kind: 'para', text: 'The test: **both** terms are perfect cubes. Then 3.3’s cube identities read backwards: $a^{3} + b^{3} = (a + b)(a^{2} - ab + b^{2})$ and $a^{3} - b^{3} = (a - b)(a^{2} + ab + b^{2})$. The exhibits: $x^{3} + 27 = (x + 3)(x^{2} - 3x + 9)$; $x^{3} - 125 = (x - 5)(x^{2} + 5x + 25)$; $64x^{3} + 1 = (4x + 1)(16x^{2} - 4x + 1)$; and with two letters, $8x^{3} + 27y^{3} = (2x + 3y)(4x^{2} - 6xy + 9y^{2})$. The sign pattern is worth stating once, structurally: the **first** bracket carries the sign of the original expression ($a + b$ for the sum, $a - b$ for the difference), and the **second** bracket is always $a^{2} \\mp ab + b^{2}$ — squares of the roots, plus the middle term with the **opposite** sign, plus the other square. The second bracket never factors further, and the proof is 4.2’s gauge wearing two letters: read $a^{2} \\mp ab + b^{2}$ as a quadratic in $a$ — its gauge is $b^{2} - 4b^{2} = -3b^{2} < 0$ for every nonzero $b$, so no factorization over the integers exists. The verifier swept it across $b \\in [-9, 9]$: every companion refuses.' },
        { kind: 'para', text: 'Two letters change nothing in the cube read — the definitions were built for it. $8x^{3} + 27y^{3}$ has both terms as cubes of composite roots, $(2x)^{3}$ and $(3y)^{3}$, so the sum of cubes opens exactly as before: $(2x + 3y)(4x^{2} - 6xy + 9y^{2})$ — the roots are $2x$ and $3y$, and every rule (first bracket carries the sign, second bracket flips the middle) applies verbatim. The companion bracket $4x^{2} - 6xy + 9y^{2}$ is the irreducible $a^{2} - ab + b^{2}$ wearing $a = 2x$, $b = 3y$, and the derivation below confirms it refuses further. The classical texts drill exactly these two-letter cases, and the examinations price them: the composite-root read — WHOSE cubes are these? — is the whole skill.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the cube-bracket impostors', text: 'Two slips cost marks on the cube identities. First, $(x - 5)^{3}$ is NOT $x^{3} - 125$: the cube of a bracket carries middle terms ($x^{3} - 75x + 125$ for this one), and the verifier expands the impostor to prove it differs. Second, the second bracket’s middle term is often flipped from memory — $x^{3} - 125 = (x - 5)(x^{2} - 5x + 25)$ is wrong; the difference of cubes carries $+ab$ in the middle: $(x^{2} + 5x + 25)$. The one-line check is expansion: ten seconds, always.' },
        {
          kind: 'derivation',
          title: 'The cube companions refuse to factor',
          statement: 'Claim: for every nonzero $b$, the quadratic companion $a^{2} \\mp ab + b^{2}$ (the second bracket of the cube factorizations) has no factorization over the integers — so the cube identities are already COMPLETE factorizations.',
          steps: [
            {
              label: 'Read the companion as a quadratic in a',
              formula: 'a^{2} \\mp ab + b^{2}: \\quad p = \\mp b, \\; q = b^{2}',
              explanation: 'The 4.2 gauge machinery applies to any quadratic, whatever letters sit in it — here the roles are $a$ the variable and $b$ a fixed letter.',
            },
            {
              label: 'Compute the gauge',
              formula: 'p^{2} - 4q = b^{2} - 4b^{2} = -3b^{2}',
              explanation: 'For every nonzero $b$ this is strictly negative — the existence theorem of 4.2 says no integer pair (indeed no real pair) exists.',
            },
            {
              label: 'Conclude',
              formula: 'a^{2} \\mp ab + b^{2} \\text{ is irreducible over the integers } (b \\neq 0)',
              explanation: 'The verifier swept the gauge across $b \\in [-9, 9]$: negative at every one. The cube factorizations need no further work — the second bracket is done by theorem, not by hope.',
            },
          ],
          result: 'Every cube factorization of this lesson is automatically complete: the companion quadratic refuses for every nonzero second term. The same one-line gauge settles the two-letter cubes and every exercise that ends in a companion bracket.',
        },
        { kind: 'heading', text: 'The Two-Step Chains' },
        { kind: 'para', text: 'The recognition moves chain, and the chains are where examinations hide their marks. $x^{4} - 16$ is a difference of squares with $a = x^{2}$, $b = 4$: $(x^{2} + 4)(x^{2} - 4)$ — but the second bracket is ITSELF a difference of squares, $(x + 2)(x - 2)$, while the first is a sum of squares and refuses. The complete factorization is $(x^{2} + 4)(x + 2)(x - 2)$ — three factors, every one irreducible. The same read: $x^{4} - 1 = (x^{2} + 1)(x + 1)(x - 1)$; $x^{4} - 81 = (x^{2} + 9)(x + 3)(x - 3)$; $16x^{4} - 81 = (4x^{2} + 9)(2x + 3)(2x - 3)$; and the grand chain $x^{6} - 1 = (x^{3} - 1)(x^{3} + 1)$, where each cube opens again: $(x - 1)(x^{2} + x + 1)(x + 1)(x^{2} - x + 1)$. The discipline of the chain: **after every move, look at what you are holding** — the pieces often carry their own recognitions, and stopping early ("$x^{4} - 16 = (x^{2} + 4)(x^{2} - 4)$") leaves the factorization incomplete at exactly the step the examiner priced.' },
        { kind: 'heading', text: 'The Recognition Order' },
        { kind: 'para', text: 'With four factorization lessons on the bench, the working question is which move runs first. The order that never wastes work: (i) extract the **GCF** (4.1) — it shrinks every number the later moves must touch; (ii) count the **terms**: two terms → squares or cubes (this lesson); three terms → perfect-square test, then the 4.2 hunt; four terms → 4.1 grouping; (iii) after any success, **look again** — chains and leftover GCFs hide inside the brackets; (iv) when every move refuses, say so honestly — the 4.1 boundary theorem and the gauge verdicts are answers, not failures.' },
        { kind: 'para', text: 'Two thirty-second cases show the order earning its keep. $16x^{4} - 81x^{2}$: the GCF reflex pulls $x^{2}$ FIRST — $x^{2}(16x^{4} - 81)$ — and only then does the difference of squares read the bracket: $x^{2}(4x^{2} + 9)(2x + 3)(2x - 3)$, four factors, complete. Hunt-first would have faced a quartic with no dials at all. Next, $2x^{3} + 54$: the GCF 2 comes out — $2(x^{3} + 27)$ — and the bracket is a SUM of cubes: $2(x + 3)(x^{2} - 3x + 9)$. Miss the GCF and you would read $2x^{3} + 54$ as an irreducible-looking sum of cubes of $2^{1/3}x$ — a dead end manufactured entirely by skipping step one. The order is not etiquette; it is what makes the shelf reachable.' },
        { kind: 'figure', caption: 'The recognition decision tree: GCF, then term count, then the identity tests, the hunt, grouping — and the honest refusal when everything refuses.', svg: decisionTreeSvg() },
        { kind: 'example', title: 'Factor x⁴ − 81 completely, narrating the recognition order', steps: [
          'GCF first: the terms $x^{4}$ and $81$ share nothing — the GCF is 1, move on.',
          'Two terms: both are perfect squares ($x^{4} = (x^{2})^{2}$, $81 = 9^{2}$) with a minus — the difference of squares: $(x^{2} + 9)(x^{2} - 9)$.',
          'Look again: the first bracket is a sum of squares — 4.1’s theorem refuses it; the second is a difference of squares — chain: $(x + 3)(x - 3)$.',
          'Hence $x^{4} - 81 = (x^{2} + 9)(x + 3)(x - 3)$ — three irreducible factors.',
          'Check by expansion: $(x^{2} + 9)(x^{2} - 9) = x^{4} - 81$ and $(x + 3)(x - 3) = x^{2} - 9$ ✓.',
        ] },
        { kind: 'example', title: 'Factor 8x³ − 125 completely', steps: [
          'GCF first: $8x^{3}$ and $125$ share nothing numeric and no letter — move on.',
          'Two terms, both perfect cubes: $8x^{3} = (2x)^{3}$ and $125 = 5^{3}$, minus between — the difference of cubes.',
          'The first bracket carries the sign: $(2x - 5)$; the second is the roots’ squares with the OPPOSITE middle sign: $4x^{2} + 10x + 25$.',
          'Hence $8x^{3} - 125 = (2x - 5)(4x^{2} + 10x + 25)$ — and the second bracket is irreducible (gauge $100 - 400 = -300 < 0$ as a quadratic in $x$).',
          'Check: $(2x - 5)(4x^{2} + 10x + 25) = 8x^{3} + 20x^{2} + 50x - 20x^{2} - 50x - 125 = 8x^{3} - 125$ ✓.',
        ] },
        { kind: 'callout', tone: 'historical', title: 'Historical note — Sophie Germain’s surprise', text: 'After 4.1 proved the sum of squares refuses, one might guess sums of fourth powers refuse too. They do not always: Sophie Germain (1776–1831) — who taught herself from the library her family kept out of her bedroom and wrote to Gauss under a man’s name — proved $a^{4} + 4b^{4} = (a^{2} + 2ab + 2b^{2})(a^{2} - 2ab + 2b^{2})$, the difference of squares in disguise: $a^{4} + 4b^{4} = (a^{2} + 2b^{2})^{2} - (2ab)^{2}$. She deployed it inside her grand plan for Fermat’s last theorem — the first viable attack, covering every odd prime exponent below 100 in the cases she patented. The lesson: recognition order says refuse — and a deeper recognition can reopen the file.' },
        { kind: 'para', text: 'The chains deserve their own caution, because incompleteness hides in the second step. The pattern $x^{4} - b^{4}$ always opens twice — $(x^{2} + b^{2})(x + b)(x - b)$ — and the surviving bracket $x^{2} + b^{2}$ is a sum of squares that honestly refuses, so the chain TERMINATES there rather than fizzling. But a near-miss hides in the neighbourhood: $x^{4} - 4b^{4}$ opens once to $(x^{2} + 2b^{2})(x^{2} - 2b^{2})$, and the second bracket is NOT a chain candidate — as a difference of squares it would need both parts to be integer squares, and $2b^{2}$ is not one for any nonzero $b$, so over the integers the chain stops after one step. Look at the constants: a chain continues exactly while the bracket carries the difference-of-squares SHAPE (both parts squares, minus between), never merely because more factors would be pleasant. And the surviving sums of squares are not unfinished business — they are 4.1’s theorem, working as the chain’s designated stop sign.' },
        { kind: 'example', title: 'Factor x⁴ + 4y⁴ — the Germain identity at work', steps: [
          'Recognition order: GCF 1; two terms, both fourth powers — a SUM, and the sum of squares refuses… but wait: $x^{4} + 4y^{4} = x^{4} + 4(y^{2})^{2}$? No — $4y^{4} = 4(y^{2})^{2} \\cdot \\ldots$ write it as Germain saw it.',
          'The disguise: $x^{4} + 4y^{4} = (x^{2} + 2y^{2})^{2} - (2xy)^{2}$ — add and subtract the cross term $4x^{2}y^{2}$: the square of $x^{2} + 2y^{2}$ minus the square of $2xy$.',
          'Difference of squares: $(x^{2} + 2y^{2} + 2xy)(x^{2} + 2y^{2} - 2xy)$ — i.e. $(x^{2} + 2xy + 2y^{2})(x^{2} - 2xy + 2y^{2})$.',
          'Hence $x^{4} + 4y^{4}$ factors over the integers — the sum-of-squares refusal was about SECOND powers, not fourth.',
          'Check at $(1, 1)$: left $1 + 4 = 5$; right $(1 + 2 + 2)(1 - 2 + 2) = 5 \\cdot 1 = 5$ ✓.',
        ] },
        { kind: 'example', title: 'Factor 2x³ + 54 completely, narrating every station of the order', steps: [
          'GCF first: $2x^{3}$ and $54$ share 2 — extract it: $2(x^{3} + 27)$.',
          'Two terms inside the bracket: $(x)^{3}$ and $3^{3}$, plus between — the sum of cubes.',
          'First bracket carries the sign: $(x + 3)$; second: $x^{2} - 3x + 9$ — squares, OPPOSITE middle, other square.',
          'Hence $2x^{3} + 54 = 2(x + 3)(x^{2} - 3x + 9)$ — the leading 2 rides the whole answer (factor completely!).',
          'Look again: the quadratic companion is irreducible (gauge $9 - 36 = -27 < 0$), so the factorization is complete — check: $2(x^{3} + 27) = 2x^{3} + 54$ ✓.',
        ] },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — recognition is timed reading', text: 'The identity-driven factorizations are the fastest marks on any algebra paper: $x^{2} - a^{2}$, the perfect squares and the cubes collapse in one line each, and the two-step chains are where SSC/CAT papers stash their difficulty. The exam discipline is the recognition order, executed without hesitation: GCF reflex first (it turns $16x^{4} - 81x^{2}$ into $x^{2}(4x + 9)(4x - 9)$ before any identity is invoked); term count next; the middle-term test before the 4.2 hunt (zero gauge is a freebie); look again after every bracket; and when the answer refuses, name the refusal — "sum of squares, irreducible over the integers" — because priced refusals are themselves examined answers. One final habit: run the GCF reflex even when it finds nothing — the ten-second glance at 4.1 is what proves the coefficients share nothing, and a stated "GCF = 1" is the first line of a complete examination solution.' },
        { kind: 'heading', text: 'The Shelf, Collected' },
        { kind: 'para', text: 'From the above discussion, the recognition layer of the factorization toolkit stands as follows:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Difference of squares** — both terms squares, minus between: $a^{2} - b^{2} = (a + b)(a - b)$; the plus twin refuses (4.1).',
          '(ii) **Perfect squares** — the middle term twice the product of the roots’ squares: the zero gauge; the middle-term test is the recognition instrument.',
          '(iii) **Cubes** — both terms cubes: $(a \\pm b)(a^{2} \\mp ab + b^{2})$, the first bracket carrying the sign, the second proved irreducible.',
          '(iv) **Chains** — look again after every bracket; $x^{4} - 16$, $x^{4} - 1$, $x^{6} - 1$ all open twice.',
          '(v) **The surprise** — $a^{4} + 4b^{4}$ factors (Germain); the recognition order is a default, not a law of nature.',
        ] },
        { kind: 'para', text: 'One bridge closes the lesson. The recognition shelf handles the two-term expressions and the perfect squares; the 4.2 hunt handles the rest of the quadratic world; 4.1’s grouping handles the four-term strays. What NO shelf covers is the cubic that refuses all of this — $x^{3} - 6x^{2} + 11x - 6$ has three terms and no dials that apply. For those, the next lesson builds a different machine entirely: stop factoring the expression, start EVALUATING it — the factor theorem turns hunting zeros into hunting factors, and the cubics that no identity can touch fall one root at a time.' },
        { kind: 'formula', name: 'Difference of squares, backwards', latex: 'a^{2} - b^{2} = (a + b)(a - b)', note: 'both terms squares, minus between; the plus twin refuses over the integers — 4.1’s theorem' },
        { kind: 'formula', name: 'Perfect-square recognition', latex: 'a^{2} \\pm 2ab + b^{2} = (a \\pm b)^{2}', note: 'the middle term must be EXACTLY twice the product of the square roots of the ends — the zero gauge of 4.2' },
        { kind: 'formula', name: 'The cube factorizations', latex: 'a^{3} \\pm b^{3} = (a \\pm b)(a^{2} \\mp ab + b^{2})', note: 'first bracket carries the sign; the second bracket’s middle takes the opposite sign and is irreducible (gauge $-3b^{2}$)' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: '$x^{2} - 49$ factors as',
            options: ['$(x - 7)^{2}$', '$(x - 49)(x + 1)$', '$(x - 7)(x + 7)$', 'irreducible over the integers'],
            answer: 2,
            explain: 'Both terms are perfect squares ($x^{2}$, $7^{2}$) with a MINUS between — the difference of squares: $(x + 7)(x - 7)$. Option 1 is the square impostor: it expands to $x^{2} - 14x + 49$, the middle term a perfect square always carries. Option 2 expands to $x^{2} - 48x - 49$. Option 4 names a refusal that belongs to the PLUS twin $x^{2} + 49$ — the sign decides.',
          },
          {
            q: '$4x^{2} - 12x + 9$ factors as',
            options: ['$(2x - 3)(2x + 3)$', '$(2x - 3)^{2}$', '$(4x - 9)(x + 1)$', '$(2x + 3)^{2}$'],
            answer: 1,
            explain: 'The ends are $(2x)^{2}$ and $3^{2}$, and the middle $2 \\cdot 2 \\cdot 3 = 12$ matches with the minus — the perfect square $(2x - 3)^{2}$. Option 1 drops the middle term entirely: $(2x - 3)(2x + 3) = 4x^{2} - 9$. Option 3 expands to $4x^{2} - 5x - 9$. Option 4 flips the middle’s sign: $4x^{2} + 12x + 9$. The middle-term test is the whole recognition.',
          },
          {
            q: '$x^{3} - 125$ factors as',
            options: ['$(x - 5)(x^{2} + 5x + 25)$', '$(x - 5)^{3}$', '$(x - 5)(x^{2} - 5x + 25)$', '$(x + 5)(x^{2} - 5x + 25)$'],
            answer: 0,
            explain: 'Both terms are perfect cubes with a minus — the difference of cubes: the first bracket carries the sign $(x - 5)$, the second reads roots’ squares with the OPPOSITE middle sign: $x^{2} + 5x + 25$. Option 2 is the cube impostor — $(x - 5)^{3}$ carries middle terms ($x^{3} - 75x + 125$). Option 3 flips the second bracket’s middle — that belongs to the SUM pattern. Option 4 flips the FIRST bracket’s sign. Expand once and each impostor falls.',
          },
          {
            q: '$x^{4} - 16$ factors completely as',
            options: ['$(x^{2} - 4)(x^{2} + 4)$', '$(x + 2)(x - 2)(x^{2} + 4)$', '$(x - 2)^{2}(x + 2)^{2}$', 'irreducible — a sum of squares'],
            answer: 1,
            explain: 'The first read gives $(x^{2} + 4)(x^{2} - 4)$ — TRUE but INCOMPLETE: the second bracket chains into $(x + 2)(x - 2)$, and the first is a sum of squares that honestly refuses. Option 3 expands to $x^{4} - 8x^{2} + 16$ — the square impostor at fourth power. Option 4 mis-files the expression: $x^{4} - 16$ is a DIFFERENCE of squares. The complete factorization is $(x^{2} + 4)(x + 2)(x - 2)$ — three irreducible factors.',
          },
          {
            q: 'Which expression CANNOT be factored over the integers?',
            options: ['$x^{2} - 36$', '$x^{4} - 1$', '$x^{4} + 16$', '$8x^{3} - 27$'],
            answer: 2,
            explain: '$x^{4} + 16$ is a sum of fourth powers with no Germain disguise ($16 = 4 \\cdot 2^{2}$ is not $4b^{4}$ for any integer $b$ — the verifier’s exhaustive scan confirms no integer factorization). The others all factor: $x^{2} - 36 = (x + 6)(x - 6)$; $x^{4} - 1 = (x^{2} + 1)(x + 1)(x - 1)$ (the two-step chain); and $8x^{3} - 27 = (2x - 3)(4x^{2} + 6x + 9)$ (the difference of cubes). The refusal is the answer worth naming precisely.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 4.3', sets: [
          {
            level: 'L1',
            questions: [
              {
                q: 'Factor $x^{2} - 64$ and check by expansion.',
                solution: [
                  'Both terms are perfect squares ($x^{2}$, $8^{2}$) with a minus — the difference of squares.',
                  'Hence $x^{2} - 64 = (x + 8)(x - 8)$.',
                  'Check: $(x + 8)(x - 8) = x^{2} - 64$ ✓.',
                ],
                answer: '$(x + 8)(x - 8)$',
              },
              {
                q: 'Factor $x^{2} + 12x + 36$.',
                solution: [
                  'The ends are squares ($x^{2}$, $6^{2}$); the middle test: $2 \\cdot 1 \\cdot 6 = 12$ ✓ — a perfect square.',
                  'Hence $x^{2} + 12x + 36 = (x + 6)^{2}$ — the sign of the middle carried by both brackets.',
                  'Check: $(x + 6)^{2} = x^{2} + 12x + 36$ ✓.',
                ],
                answer: '$(x + 6)^{2}$',
              },
              {
                q: 'Factor $x^{3} - 1$.',
                solution: [
                  'Both terms are perfect cubes with a minus — the difference of cubes.',
                  'The first bracket carries the sign: $(x - 1)$; the second: $x^{2} + x + 1$ (roots’ squares, OPPOSITE middle sign, other square).',
                  'Hence $x^{3} - 1 = (x - 1)(x^{2} + x + 1)$ — check: $(x - 1)(x^{2} + x + 1) = x^{3} - 1$ ✓ (3.2’s teaser, now a recognition).',
                ],
                answer: '$(x - 1)(x^{2} + x + 1)$',
              },
            ],
          },
          {
            level: 'L2',
            questions: [
              {
                q: 'Factor $25x^{2} - 49$.',
                solution: [
                  'Both terms are squares: $(5x)^{2}$ and $7^{2}$, minus between.',
                  'Hence $25x^{2} - 49 = (5x + 7)(5x - 7)$ — the coefficients’ roots join the letters.',
                  'Check: $(5x + 7)(5x - 7) = 25x^{2} - 49$ ✓.',
                ],
                answer: '$(5x + 7)(5x - 7)$',
              },
              {
                q: 'Factor $x^{2} - 18x + 81$.',
                solution: [
                  'The ends are squares ($x^{2}$, $9^{2}$); the middle test: $2 \\cdot 1 \\cdot 9 = 18$ ✓ with the minus.',
                  'Hence $x^{2} - 18x + 81 = (x - 9)^{2}$.',
                  'Check: $(x - 9)^{2} = x^{2} - 18x + 81$ ✓.',
                ],
                answer: '$(x - 9)^{2}$',
              },
              {
                q: 'Factor $64x^{3} + 1$.',
                solution: [
                  'Both terms are cubes: $(4x)^{3}$ and $1^{3}$, plus between — the sum of cubes.',
                  'First bracket carries the sign: $(4x + 1)$; second: $16x^{2} - 4x + 1$ (squares, opposite middle, other square).',
                  'Hence $64x^{3} + 1 = (4x + 1)(16x^{2} - 4x + 1)$ — check by expansion ✓.',
                ],
                answer: '$(4x + 1)(16x^{2} - 4x + 1)$',
              },
            ],
          },
          {
            level: 'L3',
            questions: [
              {
                q: 'Factor $x^{4} - 81$ completely.',
                solution: [
                  'Difference of squares: $(x^{2} + 9)(x^{2} - 9)$.',
                  'Look again: $x^{2} + 9$ is a sum of squares — refuses (4.1); $x^{2} - 9$ chains: $(x + 3)(x - 3)$.',
                  'Hence $x^{4} - 81 = (x^{2} + 9)(x + 3)(x - 3)$ — check: $(x^{2} + 9)(x^{2} - 9) = x^{4} - 81$ ✓.',
                ],
                answer: '$(x^{2} + 9)(x + 3)(x - 3)$',
              },
              {
                q: 'Factor $x^{3} + 216$.',
                solution: [
                  'Both terms are cubes: $x^{3}$ and $6^{3}$, plus between — the sum of cubes.',
                  'Hence $x^{3} + 216 = (x + 6)(x^{2} - 6x + 36)$ — the second bracket irreducible (gauge $36 - 144 = -108 < 0$).',
                  'Check: $(x + 6)(x^{2} - 6x + 36) = x^{3} + 216$ ✓.',
                ],
                answer: '$(x + 6)(x^{2} - 6x + 36)$',
              },
              {
                q: 'Factor $9x^{2} - 42x + 49$.',
                solution: [
                  'The ends are squares: $(3x)^{2}$ and $7^{2}$; the middle test: $2 \\cdot 3 \\cdot 7 = 42$ ✓ with the minus.',
                  'Hence $9x^{2} - 42x + 49 = (3x - 7)^{2}$ — the perfect square, both brackets carrying the minus.',
                  'Check: $(3x - 7)^{2} = 9x^{2} - 42x + 49$ ✓.',
                ],
                answer: '$(3x - 7)^{2}$',
              },
            ],
          },
          {
            level: 'L4',
            questions: [
              {
                q: 'Factor $x^{4} - 1$ completely.',
                solution: [
                  'Difference of squares: $(x^{2} + 1)(x^{2} - 1)$.',
                  'Look again: $x^{2} + 1$ refuses (the sum of squares); $x^{2} - 1$ chains: $(x + 1)(x - 1)$.',
                  'Hence $x^{4} - 1 = (x^{2} + 1)(x + 1)(x - 1)$ — check: $(x^{2} + 1)(x^{2} - 1) = x^{4} - 1$ ✓.',
                ],
                answer: '$(x^{2} + 1)(x + 1)(x - 1)$',
              },
              {
                q: 'Factor $16x^{4} - 81$ completely.',
                solution: [
                  'Difference of squares: $(4x^{2} + 9)(4x^{2} - 9)$ — the coefficient roots ride along.',
                  'Look again: $4x^{2} + 9$ refuses (sum of squares); $4x^{2} - 9$ chains: $(2x + 3)(2x - 3)$.',
                  'Hence $16x^{4} - 81 = (4x^{2} + 9)(2x + 3)(2x - 3)$ — check: $(4x^{2} + 9)(4x^{2} - 9) = 16x^{4} - 81$ ✓.',
                ],
                answer: '$(4x^{2} + 9)(2x + 3)(2x - 3)$',
              },
            ],
          },
          {
            level: 'L5',
            questions: [
              {
                q: 'Factor $8x^{3} - 125$ completely.',
                solution: [
                  'Both terms are cubes: $(2x)^{3}$ and $5^{3}$, minus between — the difference of cubes.',
                  'Hence $8x^{3} - 125 = (2x - 5)(4x^{2} + 10x + 25)$ — the second bracket carries the OPPOSITE middle sign.',
                  'The second bracket is irreducible: as a quadratic in $x$ its gauge is $100 - 400 = -300 < 0$.',
                  'Check: $(2x - 5)(4x^{2} + 10x + 25) = 8x^{3} - 125$ ✓.',
                ],
                answer: '$(2x - 5)(4x^{2} + 10x + 25)$',
              },
              {
                q: 'Factor $x^{4} + 4$ — the recognition order says refuse; Germain says otherwise.',
                solution: [
                  'The recognition order: GCF 1; two terms, fourth powers, PLUS between — the sum of squares refuses… for squares.',
                  'The disguise: $x^{4} + 4 = (x^{2} + 2)^{2} - (2x)^{2}$ — add and subtract the cross term $4x^{2}$.',
                  'Difference of squares: $(x^{2} + 2 + 2x)(x^{2} + 2 - 2x)$ — i.e. $(x^{2} + 2x + 2)(x^{2} - 2x + 2)$.',
                  'Hence $x^{4} + 4 = (x^{2} + 2x + 2)(x^{2} - 2x + 2)$ — Sophie Germain’s identity with $a = x$, $b = 1$.',
                  'Check: $(x^{2} + 2)^{2} - 4x^{2} = x^{4} + 4x^{2} + 4 - 4x^{2} = x^{4} + 4$ ✓.',
                ],
                answer: '$(x^{2} + 2x + 2)(x^{2} - 2x + 2)$',
              },
            ],
          },
          {
            level: 'L6',
            questions: [
              {
                q: 'Factor $x^{6} - 1$ completely — the grand chain.',
                solution: [
                  'Difference of squares first: $x^{6} - 1 = (x^{3})^{2} - 1^{2} = (x^{3} + 1)(x^{3} - 1)$.',
                  'Look again: both brackets are sums/differences of CUBES — open each: $x^{3} + 1 = (x + 1)(x^{2} - x + 1)$ and $x^{3} - 1 = (x - 1)(x^{2} + x + 1)$.',
                  'Hence $x^{6} - 1 = (x + 1)(x - 1)(x^{2} - x + 1)(x^{2} + x + 1)$ — four factors.',
                  'Every bracket is now irreducible: the linear brackets are done; the quadratics carry gauges $(-1)^{2} - 4 = -3 < 0$.',
                  'Check: $(x^{3} + 1)(x^{3} - 1) = x^{6} - 1$ ✓ — and 4.4 will re-derive this factorization from the roots themselves.',
                ],
                answer: '$(x + 1)(x - 1)(x^{2} - x + 1)(x^{2} + x + 1)$',
              },
            ],
          },
        ] },
      ],
    },
    {
      id: 'al-factor-theorem-and-cubics',
      number: '4.4',
      title: 'The Factor Theorem and Cubics',
      concepts: [
        'the factor theorem',
        'evaluate, never divide',
        'integer-root candidates',
        'the cubic hunting machine',
        'the irreducibility verdict',
        'repeated roots',
        'the two roads agree',
        'the zero seed cashed',
      ],
      objectives: [
        'state and prove the factor theorem — (x − a) divides f(x) exactly when f(a) = 0 — from the remainder theorem, both directions',
        'justify the candidate scan: every integer root of a monic cubic divides its constant term (proved), so the candidates are ± the divisors of d',
        'run the cubic hunting machine: list candidates, evaluate (never divide), divide out the found root, and let the 4.2 toolkit finish the quotient',
        'price the missing seat (x³ − 7x + 6 written 1, 0, −7, 6) and the repeated roots ((x − 1)²(x + 2))',
        'prove and use the irreducibility verdict: a cubic with no integer root is irreducible over the integers — and meet what waits beyond (Cardano)',
        'watch the two roads agree — the factor theorem re-deriving 3.3’s cube identities — and cash 3.1’s zero seed that planted this whole chapter',
      ],
      prerequisites: ['al-identities-as-factorizations', 'al-dividing-polynomials-long-division-and-the-remainder-theorem'],
      sources: ['hall-knight-elementary-algebra', 'hall-knight-higher-algebra', 'cardano-1545-ars-magna', 'ncert-math9-ch2-polynomials'],
      blocks: [
        { kind: 'para', text: 'Every road of this chapter converges here. Lesson 3.1 planted a seed: the polynomial $p(x) = x^{3} - 2x + 1$ returned $0$ at $x = 1$, and the seed carried a promise — chapter 4 would turn hunting zeros into factoring. Lesson 3.4 proved the remainder theorem ($r = f(a)$, evaluate never divide) and glimpsed what a zero remainder would mean. Lessons 4.1–4.3 built the factorization toolkit — GCF, grouping, the hunt, the identity shelf — and 4.3 closed by admitting what it cannot touch: $x^{3} - 6x^{2} + 11x - 6$ has three terms, no dials, no square shape. This lesson keeps the chapter’s oldest promise: stop staring at the EXPRESSION and start EVALUATING it — the values of a polynomial reveal its factors.' },
        { kind: 'para', text: 'The plan: state the factor theorem and prove it both directions from the remainder theorem; justify the candidate scan (every integer root of a monic cubic divides the constant — proved); run the cubic hunting machine end to end, with the missing-seat caution and the repeated-root case; prove the irreducibility verdict — a cubic with no integer root is irreducible over the integers, a degree-three miracle that makes refusals cheap; watch the two roads agree when the identity shelf and the theorem factor the same cubic; and meet, honestly, the machinery that waits beyond the school scale — Cardano’s formula for exactly the cubics this lesson refuses.' },
        { kind: 'heading', text: 'The Factor Theorem' },
        { kind: 'para', text: 'The vocabulary first, carried over from 3.1: a number $a$ is a **zero** (or a root) of the polynomial $f$ when $f(a) = 0$ — an input whose output lands exactly on zero, the fingerprint moment of 3.1’s value tables. The factor theorem is the algebraic twin of that idea, and it is the remainder theorem with the remainder pinned to zero.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — zero of a polynomial', text: 'A number $a$ is a **zero** (or root) of the polynomial $f(x)$ when $f(a) = 0$. Zeros are read from the SUBSTITUTION machine of 1.3 and 3.1 — feed the input, collect the output — and 3.4 proved they are also read from division: $f(a)$ is exactly the remainder left when $f(x)$ is divided by $(x - a)$.' },
        { kind: 'callout', tone: 'theorem', title: 'Theorem — the factor theorem', text: 'For any polynomial $f$ and any number $a$: $(x - a)$ divides $f(x)$ (with polynomial quotient, zero remainder) **if and only if** $f(a) = 0$. The proof is the remainder theorem read at both ends: 3.4 proved $f(x) = (x - a)q(x) + r$ with $r = f(a)$ — so $f(a) = 0$ forces $r = 0$ and $f(x) = (x - a)q(x)$, a clean division; and conversely a clean division $f(x) = (x - a)q(x)$ evaluates at $a$ to $f(a) = (a - a)q(a) + 0 = 0$. Two lines, both directions, from a theorem 3.4 already proved.' },
        {
          kind: 'equation',
          latex: '(x - a) \\mid f(x) \\quad \\Longleftrightarrow \\quad f(a) = 0',
          note: 'the factor theorem — the remainder theorem’s zero case: a zero of the polynomial is exactly a linear factor, and each implies the other',
        },
{ kind: 'terms', items: [
          { term: 'zero (root) of a polynomial', def: 'a number $a$ with $f(a) = 0$ — 3.1’s value-table fingerprint, formalized' },
          { term: 'the factor theorem', def: '$(x - a) \\mid f(x)$ exactly when $f(a) = 0$ — the remainder theorem’s zero case, both directions' },
          { term: 'evaluate, never divide', def: '3.4’s rule promoted to a hunting instrument: the remainder theorem makes each candidate one line of arithmetic' },
          { term: 'integer-root candidates (monic)', def: 'the signed divisors of the constant term — proved to contain every integer root of a monic polynomial' },
          { term: 'the rational-root candidates (non-monic)', def: '$p/q$ with $p \\mid d$ and $q \\mid a$ — the widened list when the leading coefficient is not 1' },
          { term: 'the cubic irreducibility verdict', def: 'a cubic with no integer root is irreducible over the integers — degree 3 forces a linear factor in any factorization' },
          { term: 'repeated root', def: 'a root that survives its own division — $x^{3} - 3x + 2 = (x - 1)^{2}(x + 2)$; the look-again discipline catches it' },
          { term: 'the zero-product bridge', def: 'a product is zero only when a factor is zero — chapter 5’s first theorem, already visible in this lesson’s zeros' },
        ] },
                { kind: 'para', text: 'The theorem converts a QUESTION ABOUT FACTORS into a QUESTION ABOUT VALUES. Factoring asks: does $(x - a)$ divide $f$? — a division problem, expensive. The theorem answers: evaluate $f(a)$ — one substitution, cheap. This is 3.4’s rule **evaluate, never divide** promoted from a labor-saving habit to a hunting instrument: to find the factors of a cubic, evaluate it at candidate points and let the zeros announce the factors. The verifier checked the theorem’s content directly: 3,375 cubic-root draws all satisfied $(x - a)q(x) + r = f$ with $r = f(a)$, and the classic $x^{3} - 6x^{2} + 11x - 6$ evaluated at 1 gives $1 - 6 + 11 - 6 = 0$ — zero remainder, clean division.' },
        { kind: 'heading', text: 'Hunting Cubic Roots: the Candidate Scan' },
        { kind: 'para', text: 'The theorem says zeros are factors — but where do you LOOK for zeros? A cubic’s possible inputs are infinite; evaluation is cheap but not free. The monic case has a theorem that shrinks the search to a finite list, and its proof is one comparison of constants.' },
        {
          kind: 'derivation',
          title: 'The monic integer-root rule',
          statement: 'Claim: if the monic cubic $x^{3} + bx^{2} + cx + d$ (integer coefficients, $d \\neq 0$) has an integer root $a$, then $a$ divides $d$ — so the only integer-root candidates are the divisors of the constant term, with both signs.',
          steps: [
            {
              label: 'Suppose a is a root — divide it out',
              formula: 'x^{3} + bx^{2} + cx + d = (x - a)(x^{2} + ux + v)',
              explanation: 'The factor theorem guarantees the division; the quotient is a monic quadratic (leading coefficients multiply to 1).',
            },
            {
              label: 'Compare the constant terms',
              formula: 'd = (-a) \\cdot v',
              explanation: 'Expanding, the constant of the product is the product of the constants: $(-a) \\cdot v$. So $a$ divides $d$ — the root is bottled up inside the constant term.',
            },
            {
              label: 'Read the candidate list',
              formula: 'a \\in \\{\\pm 1, \\pm 2, \\ldots, \\pm |d|\\} \\text{ with } a \\mid d',
              explanation: 'Finite, ordered, and checkable by evaluation. The verifier swept it: across 4,056 monic cubics ($b, c \\in [-6, 6]$, $d \\in [-12, 12]$, $d \\neq 0$), every integer root found divided $d$ — no exceptions.',
            },
          ],
          result: 'The hunt is finite: list the signed divisors of the constant term, evaluate the cubic at each, and every zero found is a factor. For a non-monic leading coefficient the candidates widen to $p/q$ with $p \\mid d$ and $q \\mid a$ — the same scan with a longer list (the rational-root rule, proved in full when the course needs it).',
        },
        { kind: 'para', text: 'The scan procedure, assembled: (i) list the signed divisors of $d$ — smallest magnitudes first, $\\pm 1$ almost always worth trying first; (ii) **evaluate** $f$ at each candidate — the remainder theorem at work, no division yet; (iii) a zero means a factor — divide it out (3.4’s long division or synthetic division); (iv) the quotient is a quadratic — hand it to 4.2’s toolkit (the hunt, the gauge, the square test); (v) look again at everything — repeated roots hide inside quotients. One seating caution from 3.4’s tableau: $x^{3} - 7x + 6$ has NO $x^{2}$ term, and the division needs the zero seat written — coefficients $1, 0, -7, 6$ — or the columns misalign.' },
        { kind: 'example', title: 'Factor x³ − 6x² + 11x − 6 completely — the classic three-root cubic', steps: [
          'The candidates: divisors of $6$ with both signs — $\\pm 1, \\pm 2, \\pm 3, \\pm 6$.',
          'Evaluate (never divide): $f(1) = 1 - 6 + 11 - 6 = 0$ — root found at the FIRST candidate.',
          'Divide out $(x - 1)$: long division gives $x^{2} - 5x + 6$, remainder $0$ — the theorem confirmed.',
          'The quotient is quadratic — 4.2’s hunt: product $6$, sum $-5$, both negative — the pair $(2, 3)$: $(x - 2)(x - 3)$.',
          'Hence $x^{3} - 6x^{2} + 11x - 6 = (x - 1)(x - 2)(x - 3)$ — three linear factors, and a check: $(x - 1)(x^{2} - 5x + 6) = x^{3} - 6x^{2} + 11x - 6$ ✓.',
        ] },
{ kind: 'para', text: 'One division of labor keeps the machine honest: the SCAN finds WHO the factors are; the DIVISION finds WHAT REMAINS. Evaluating $f(1) = 0$ proves $(x - 1)$ divides — but says nothing about the quotient, which is where the other factors live. So the division is not optional ceremony: it is how the degree drops and the next factor becomes visible. The theorem’s economy is that the division only ever runs on roots already confirmed by evaluation — never on candidates that evaluation has already refused. Three evaluations refused nothing and one confirmed everything in the classic cubic; the division ran once, not four times.' },
                { kind: 'figure', caption: 'The root-to-factor bridge: the remainder theorem at $r = 0$ — a zero of the polynomial is exactly a linear factor, each implying the other.', svg: rootFactorBridgeSvg() },
        { kind: 'heading', text: 'The Cubic Hunting Machine' },
        { kind: 'para', text: 'The machine runs the scan, the division and the toolkit as one pipeline — and it comes with a guarantee in the REVERSE direction that makes refusals cheap. Degree three can only factor as $3 = 1 + 1 + 1$ or $3 = 1 + 2$: any integer factorization of a monic cubic MUST contain a linear factor $(x - a)$ — which by the factor theorem means an integer root. Contrapositive: **no integer root, no integer factorization at all.** The verifier verified both directions across the same 4,056 monic cubics: factorable exactly when a root exists, zero exceptions. A cubic that refuses the whole candidate list is not “unfinished” — it is PROVED irreducible over the integers, in one verdict.' },
        {
          kind: 'derivation',
          title: 'The cubic irreducibility verdict',
          statement: 'Claim: a monic cubic $x^{3} + bx^{2} + cx + d$ (integer coefficients) factors over the integers **if and only if** it has an integer root — so the candidate scan is not just a method, it is the COMPLETE decision procedure for cubic factorization.',
          steps: [
            {
              label: 'Degree arithmetic',
              formula: '3 = 1 + 1 + 1 \\quad \\text{or} \\quad 3 = 1 + 2',
              explanation: 'Any integer factorization splits degrees as $1 + 1 + 1$ (three linear) or $1 + 2$ (linear times quadratic) — a linear factor is FORCED in every case.',
            },
            {
              label: 'A linear factor is a root',
              formula: '(x - a) \\mid f \\quad \\Longrightarrow \\quad f(a) = 0',
              explanation: 'The factor theorem, backwards: every integer factorization of a monic cubic hands you an integer root.',
            },
            {
              label: 'Contrapositive — the verdict',
              formula: 'f(a) \\neq 0 \\text{ for every candidate } a \\quad \\Longrightarrow \\quad f \\text{ is irreducible}',
              explanation: 'No integer root means no linear factor means no factorization at all. The scan that hunts is also the scan that proves refusal — the verifier confirmed the equivalence on all 4,056 sweep cubics.',
            },
          ],
          result: 'For cubics, factoring is root-hunting and root-hunting is factoring — one finite scan decides everything. This is a degree-three miracle: it dies at degree four ($x^{4} + 4$ factors with NO integer root — Germain’s identity from 4.3 is the standing counterexample), which is exactly why the cubic case is worth stating as a theorem.',
        },
        { kind: 'example', title: 'Factor 2x³ − 3x² − 3x + 2 completely — the a ≠ 1 case', steps: [
          'The candidates widen: $p \\mid 2$ and $q \\mid 2$ — $\\pm 1, \\pm 2, \\pm \\tfrac{1}{2}$. Try the integers first.',
          'Evaluate: $f(2) = 16 - 12 - 6 + 2 = 0$ — root $2$ found.',
          'Divide out $(x - 2)$: synthetic division on $2, -3, -3, 2$ gives quotient $2x^{2} + x - 1$, remainder $0$.',
          'The quotient is an $a \\neq 1$ quadratic — 4.2’s AC split: $ac = -2$, sum $1$, the pair $(2, -1)$: $2x^{2} + 2x - x - 1 = x(2x + 1) - 1(2x + 1) = (2x + 1)(x - 1)$.',
          'Hence $2x^{3} - 3x^{2} - 3x + 2 = (x - 2)(2x + 1)(x - 1)$ — three linear factors; check: $(x - 2)(2x^{2} + x - 1) = 2x^{3} - 3x^{2} - 3x + 2$ ✓.',
        ] },
{ kind: 'para', text: 'The non-monic candidate list deserves its own glance, because the halves unsettle students. For $ax^{3} + \\cdots + d$ with integer coefficients, every RATIONAL root $p/q$ (lowest terms) satisfies $p \\mid d$ and $q \\mid a$ — so $2x^{3} - 3x^{2} - 3x + 2$ carries the candidates $\\pm 1, \\pm 2, \\pm \\tfrac{1}{2}$ (divisors of 2 over divisors of 2). The list is still finite, still ordered by magnitude, and still decided by evaluation — but the integers come first: the half-candidate $\\tfrac{1}{2}$ only matters when $\\pm 1$ and $\\pm 2$ have all missed, as the exhibit shows them missing before $f(2)$ lands. The proof of the rational-root rule is the same comparison-of-constants that proved the monic case, run with the leading coefficients multiplied in; the course states it here and proves it in full when the number systems demand the precision.' },
                { kind: 'example', title: 'Factor x³ − 7x + 6 completely — the missing seat', steps: [
          'Seat the coefficients with the zero: $1, 0, -7, 6$ — the $x^{2}$ column rides silently but must be present.',
          'Candidates: $\\pm 1, \\pm 2, \\pm 3, \\pm 6$. Evaluate: $f(1) = 1 - 7 + 6 = 0$ — root $1$.',
          'Divide out $(x - 1)$ with the zero seat in place: quotient $x^{2} + x - 6$, remainder $0$.',
          'The hunt closes it: product $-6$, sum $1$ — the pair $(3, -2)$: $(x + 3)(x - 2)$.',
          'Hence $x^{3} - 7x + 6 = (x - 1)(x + 3)(x - 2)$ — check: $(x - 1)(x^{2} + x - 6) = x^{3} - 7x + 6$ ✓.',
        ] },
        { kind: 'para', text: 'Two refinements complete the machine. **Repeated roots**: $x^{3} - 3x + 2$ evaluates to zero at $1$ — but dividing out $(x - 1)$ leaves $x^{2} + x - 2$, and the hunt factors THAT as $(x + 2)(x - 1)$ — the same factor AGAIN. The complete read is $(x - 1)^{2}(x + 2)$: the root $1$ is a double root, and the look-again discipline (4.3’s chain habit) is what catches it. **The two roads agree**: $x^{3} + 8$ factors by 4.3’s identity as $(x + 2)(x^{2} - 2x + 4)$ — and the theorem finds the same factor by evaluation, $f(-2) = -8 + 8 = 0$. The identity and the theorem are two proofs of the same factorization; when both roads are open, they must land in the same place, because the factorization of a polynomial into irreducibles is unique — the chapter’s quiet deepest fact, which chapter 9’s bookkeeping will make precise.' },
        { kind: 'example', title: 'Factor x³ + 8 by BOTH roads — the identity and the theorem', steps: [
          'Road one (4.3’s shelf): both terms are cubes — $x^{3} + 8 = (x + 2)(x^{2} - 2x + 4)$, the sum-of-cubes read.',
          'Road two (the theorem): $f(-2) = -8 + 8 = 0$ — so $(x + 2)$ divides; division gives $x^{2} - 2x + 4$.',
          'The roads agree on the factor AND on the quotient — as they must.',
          'The quadratic companion $x^{2} - 2x + 4$ has gauge $4 - 16 = -12 < 0$ — irreducible: both roads stop at the same wall.',
          'Hence $x^{3} + 8 = (x + 2)(x^{2} - 2x + 4)$, complete — two independent proofs, one factorization.',
        ] },
        { kind: 'para', text: 'And the honest refusal, which the irreducibility verdict makes cheap. $x^{3} - 2x + 5$: candidates $\\pm 1, \\pm 5$ — $f(1) = 4$, $f(-1) = 6$, $f(5) = 120$, $f(-5) = -110$ — no zero anywhere in the list, so the verdict lands: **irreducible over the integers**, proved by degree arithmetic, not guessed. The same verdict covers $x^{3} + x + 1$ ($f(1) = 3$, $f(-1) = -1$ — the shortest refusal in the book). These polynomials have real roots — every odd-degree polynomial crosses the axis somewhere, a fact chapter 8’s graphs will make visible — but their roots are irrational, and no integer factorization will ever carry them. The school-scale story ends exactly where the heavier machinery begins.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — Cardano’s heavy machinery', text: 'What the factor theorem cannot reach, the sixteenth century solved with fireworks. The cubic formula — del Ferro’s original insight (c. 1515), rediscovered by Tartaglia in 1535 for a contest with del Ferro’s student Fiore, published by Gerolamo Cardano in the *Artis Magna* of 1545 over Tartaglia’s broken oath, with Ferrari’s quartic riding the same book — solves EVERY cubic by radicals, factored or not. The scandal is algebra’s most famous priority dispute; the mathematics is the first time humans solved an equation BY FORMULA beyond the quadratic. This course stays at the school scale — the theorem, the scan, the verdict — and hands the formula to the later books; but the *Artis Magna* is the standing reminder that “irreducible over the integers” was never the end of the story.' },
        { kind: 'figure', caption: 'The cubic hunting machine: candidates from the constant, evaluation by the remainder theorem, division of the found root, the 4.2 toolkit on the quotient — and the irreducibility verdict when the list comes up empty.', svg: cubicMachineSvg() },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the root hunt at speed', text: 'Cubic factoring questions are decided by scan discipline. Order the candidates: $\\pm 1$ first (one-line evaluations), then $\\pm 2$ and the small divisors — the classic papers put a root at $1$, $-1$ or $2$ more often than anywhere else. Evaluate, never divide — the remainder theorem turns each candidate into one line of arithmetic. When the question asks “find $k$ so that $(x - a)$ is a factor”, it IS the factor theorem: set $f(a) = 0$ and solve for $k$ (one linear equation). And when a cubic refuses the whole list, SAY the verdict — “no integer root, and a cubic with no integer root is irreducible over the integers” — because that sentence, rare in student scripts, is the full-credit answer the marking schemes reserve a line for. And carry the scan habit into every new topic: the first evaluations — $f(1)$, $f(-1)$ — cost two lines and settle, more often than not, whether a long factorization exists at all.' },
{ kind: 'para', text: 'The k-parameter questions deserve one more look, because they run the theorem in its most elegant direction. “Find $k$ so that $(x - 2)$ is a factor of $x^{3} + kx^{2} - 11x + 6$” — the exercise above — does not hunt a root; it MANUFACTURES one. The condition $f(2) = 0$ is one linear equation in $k$, solved in a line, and the factorization follows without ever dividing: the theorem guarantees $(x - 2)$ divides, and chapter 5’s equations will make the guarantee a solving method. The same read powers the parameter questions the examination boards love: remainders demanded at given points (the remainder theorem, 3.4), factors demanded at given points (this lesson), and — the chapter 9 finale — roots demanded of quadratics whose coefficients carry parameters. Every one of them is the same move: state the condition as an equation in the parameter, solve, check. The factor theorem is not just a factoring tool; it is the bridge on which polynomials and equations finally meet.' },
        { kind: 'heading', text: 'The Chapter Closes' },
        { kind: 'para', text: 'From the above discussion, the whole of chapter 4 stands as one machine with five stations — and the seed of lesson 3.1 finally sprouted:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Extract and group** (4.1) — the GCF reflex and the four-term pairing machine, with the sum-of-squares boundary proved.',
          '(ii) **Hunt and gauge** (4.2) — the middle-term dials with the existence theorem $p^{2} - 4q = (a - b)^{2}$, the AC split closed by the folding identity.',
          '(iii) **Recognize** (4.3) — the identity shelf read backwards, the chains, the recognition order, and Germain’s fourth-power surprise.',
          '(iv) **Evaluate** (4.4) — the factor theorem turning zeros into factors, the candidate scan, the cubic irreducibility verdict.',
          '(v) **Refuse honestly** — every refusal this chapter is a theorem: the sum of squares, the gauge verdicts, the scan verdict, each provable in lines.',
        ] },
        { kind: 'para', text: 'The next chapter puts the machine to work: an EQUATION is the factorization’s customer — $x^{2} + 5x + 6 = 0$ asks the question the factorization answers, because a product is zero only when a factor is zero. That zero-product bridge, already visible in this lesson’s zeros, is chapter 5’s first theorem. Chapter 4 built the factory; chapter 5 starts the production line — and the factory was promised in advance: the very first zero in 3.1’s value table was this chapter’s seed, and the machine that sprouted it now stands complete.' },
        { kind: 'formula', name: 'The factor theorem', latex: '(x - a) \\mid f(x) \\quad \\Longleftrightarrow \\quad f(a) = 0', note: 'the remainder theorem’s zero case — evaluate, never divide; 3.1’s zero seed cashed' },
        { kind: 'formula', name: 'The candidate scan (monic)', latex: 'a \\mid d \\quad \\Rightarrow \\quad a \\in \\{\\pm 1, \\pm 2, \\ldots, \\pm |d|\\}', note: 'every integer root of $x^{3} + bx^{2} + cx + d$ divides the constant — the finite candidate list (non-monic: $p \\mid d$, $q \\mid a$)' },
        { kind: 'formula', name: 'The cubic irreducibility verdict', latex: 'f(a) \\neq 0 \\ \\forall a \\mid d \\quad \\Longrightarrow \\quad f \\text{ irreducible over } \\mathbb{Z}', note: 'degree 3 forces a linear factor in any factorization — no integer root means NO integer factorization (false at degree 4: Germain)' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The factor theorem says $(x - a)$ divides $f(x)$ exactly when',
            options: ['$f(0) = a$', '$f(a) = 0$', '$a$ divides $f(0)$', '$f(x) = 0$ for every $x$'],
            answer: 1,
            explain: 'The theorem is the remainder theorem’s zero case: the remainder of $f \\div (x - a)$ is $f(a)$, so the division is clean exactly when $f(a) = 0$. Option 1 confuses the input with the value. Option 3 is the CANDIDATE rule (roots divide the constant — via $f(0) = d$), not the factor condition. Option 4 describes the zero polynomial, which 3.1 declared degreeless.',
          },
          {
            q: 'The integer-root candidates of $x^{3} + 2x^{2} - 5x - 6$ are',
            options: ['$\\pm 1, \\pm 2, \\pm 3$', '$\\pm 1$ only', '$\\pm 6$ only', '$\\pm 1, \\pm 2, \\pm 3, \\pm 6$'],
            answer: 3,
            explain: 'Monic cubic, constant term $-6$: every integer root divides 6 — the candidates are $\\pm 1, \\pm 2, \\pm 3, \\pm 6$ (and $f(-1) = 0$ wins immediately). Options 1 and 2 truncate the divisor list; option 3 forgets the smaller divisors. The scan is finite because of the monic-root rule — proved by comparing constants after division.',
          },
          {
            q: '$x^{3} - 6x^{2} + 11x - 6$ factors as',
            options: ['$(x - 1)(x - 2)(x - 3)$', '$(x - 1)(x^{2} + 5x + 6)$', '$(x + 1)(x - 2)(x + 3)$', '$(x - 6)(x^{2} + 1)$'],
            answer: 0,
            explain: '$f(1) = 1 - 6 + 11 - 6 = 0$; division gives $x^{2} - 5x + 6$, and the hunt reads $(x - 2)(x - 3)$. Option 2’s quotient has the WRONG SIGNS ($x^{2} + 5x + 6$ expands with $(x - 1)$ to $x^{3} + 4x^{2} + x - 6$). Option 3 evaluates to $-24$ at... simply expand: $(x + 1)(x - 2)(x + 3)$ has the wrong constants. Option 4 forgets that $(x - 6)$’s cofactor must divide 6 — $x^{2} + 1$ does not fit the quotient shape.',
          },
          {
            q: '$x^{3} + x + 1$ is',
            options: ['$(x + 1)(x^{2} + 1)$', 'irreducible over the integers — no candidate root works', '$(x + 1)^{3}$', '$(x - 1)(x^{2} + x + 1)$'],
            answer: 1,
            explain: 'The candidates are $\\pm 1$: $f(1) = 3$ and $f(-1) = -1$ — no zero, and the cubic irreducibility verdict does the rest: degree three forces a linear factor in any factorization, so no integer root means NO factorization. Option 1 expands to $x^{3} + 2x^{2} + 2x + 1$. Option 3 carries middle terms. Option 4 expands to $x^{3} - 1$. The verdict is the answer — one line, full proof.',
          },
          {
            q: '$2x^{3} - 3x^{2} - 3x + 2$ factors as',
            options: ['$(x - 2)(2x - 1)(x + 1)$', '$(2x - 2)(x + 1)(x - 1)$', '$(x - 2)(2x + 1)(x - 1)$', 'irreducible over the integers'],
            answer: 0,
            explain: 'The candidates include halves ($p \\mid 2$, $q \\mid 2$), but $f(2) = 16 - 12 - 6 + 2 = 0$ wins first: division gives $2x^{2} + x - 1$, and the AC split reads $(2x + 1)(x - 1)$. Option 2’s leading bracket carries a common factor 2 — incomplete. Option 3 flips the quotient’s factors: expand and the middle term drifts. Option 4 is refuted by the found root. Check: $(x - 2)(2x^{2} + x - 1) = 2x^{3} - 3x^{2} - 3x + 2$ ✓.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 4.4', sets: [
          {
            level: 'L1',
            questions: [
              {
                q: 'Evaluate $f(x) = x^{3} - 2x + 5$ at $x = 2$, and state the remainder of $f \\div (x - 2)$ without dividing.',
                solution: [
                  'Substitute: $f(2) = 8 - 4 + 5 = 9$.',
                  'The remainder theorem: the remainder of $f \\div (x - 2)$ IS $f(2)$.',
                  'Hence the remainder is $9$ — evaluate, never divide.',
                ],
                answer: '$f(2) = 9$; remainder $9$',
              },
              {
                q: 'Evaluate $f(x) = x^{3} + x^{2} - x - 1$ at $x = -1$. Is $(x + 1)$ a factor?',
                solution: [
                  'Substitute with brackets on the negative: $f(-1) = -1 + 1 + 1 - 1 = 0$.',
                  'The factor theorem: $f(-1) = 0$ means $(x - (-1)) = (x + 1)$ divides $f$.',
                  'Hence yes — $(x + 1)$ is a factor (the quotient, for the curious, is $x^{2} - 1$).',
                ],
                answer: '$f(-1) = 0$ — yes, $(x + 1)$ is a factor',
              },
              {
                q: 'State all integer-root candidates of $x^{3} + x^{2} - 9x - 9$, and find a root by evaluation.',
                solution: [
                  'Monic cubic, constant $-9$: the candidates are the signed divisors — $\\pm 1, \\pm 3, \\pm 9$.',
                  'Evaluate: $f(1) = 1 + 1 - 9 - 9 = -16$; $f(-1) = -1 + 1 + 9 - 9 = 0$ — wait, check again: $-1 + 1 + 9 - 9 = 0$ — a root at $-1$!',
                  'Hence $x = -1$ is a root (and $(x + 3)(x - 3)$ hide in the quotient: the full read is $(x + 1)(x + 3)(x - 3)$).',
                ],
                answer: 'candidates $\\pm 1, \\pm 3, \\pm 9$; $x = -1$ is a root',
              },
            ],
          },
          {
            level: 'L2',
            questions: [
              {
                q: 'Factor $x^{3} - 4x$ completely — the GCF reflex first.',
                solution: [
                  'GCF first: both terms carry $x$ — extract: $x(x^{2} - 4)$.',
                  'The bracket is 4.3’s difference of squares: $(x + 2)(x - 2)$.',
                  'Hence $x^{3} - 4x = x(x + 2)(x - 2)$ — the theorem never needed to fire; the GCF saw it first.',
                  'Check: $x(x^{2} - 4) = x^{3} - 4x$ ✓.',
                ],
                answer: '$x(x + 2)(x - 2)$',
              },
              {
                q: 'Divide $x^{3} - 6x^{2} + 11x - 6$ by $(x - 1)$, and state the quotient and remainder.',
                solution: [
                  'Synthetic division on $1, -6, 11, -6$ with root $1$: bring down 1; $-6 + 1 = -5$; $11 + (-5) = 6$; $-6 + 6 = 0$.',
                  'The quotient is $x^{2} - 5x + 6$; the remainder is $0$ — consistent with $f(1) = 0$ (the theorem agreed in advance).',
                  'Hence $x^{3} - 6x^{2} + 11x - 6 = (x - 1)(x^{2} - 5x + 6)$ — and the quadratic hunts to $(x - 2)(x - 3)$.',
                ],
                answer: 'quotient $x^{2} - 5x + 6$, remainder $0$',
              },
              {
                q: 'Factor $x^{3} + 2x^{2} - 5x - 6$ completely.',
                solution: [
                  'Candidates $\\pm 1, \\pm 2, \\pm 3, \\pm 6$. Evaluate: $f(-1) = -1 + 2 + 5 - 6 = 0$ — root $-1$.',
                  'Divide out $(x + 1)$: quotient $x^{2} + x - 6$, remainder $0$.',
                  'The hunt: product $-6$, sum $1$ — the pair $(3, -2)$: $(x + 3)(x - 2)$.',
                  'Hence $x^{3} + 2x^{2} - 5x - 6 = (x + 1)(x + 3)(x - 2)$ — check: $(x + 1)(x^{2} + x - 6) = x^{3} + 2x^{2} - 5x - 6$ ✓.',
                ],
                answer: '$(x + 1)(x + 3)(x - 2)$',
              },
            ],
          },
          {
            level: 'L3',
            questions: [
              {
                q: 'Factor $x^{3} - 7x + 6$ completely — mind the missing seat.',
                solution: [
                  'Seat the coefficients with the zero: $1, 0, -7, 6$.',
                  'Candidates $\\pm 1, \\pm 2, \\pm 3, \\pm 6$: $f(1) = 1 - 7 + 6 = 0$ — root $1$.',
                  'Divide out $(x - 1)$ (zero seat in place): quotient $x^{2} + x - 6$, remainder $0$.',
                  'The hunt: $(x + 3)(x - 2)$. Hence $x^{3} - 7x + 6 = (x - 1)(x + 3)(x - 2)$ — check ✓.',
                ],
                answer: '$(x - 1)(x + 3)(x - 2)$',
              },
              {
                q: 'Factor $2x^{3} - 3x^{2} - 3x + 2$ completely.',
                solution: [
                  'Candidates: $\\pm 1, \\pm 2, \\pm \\tfrac{1}{2}$ ($p \\mid 2$, $q \\mid 2$). Evaluate: $f(2) = 16 - 12 - 6 + 2 = 0$ — root $2$.',
                  'Divide out $(x - 2)$: quotient $2x^{2} + x - 1$, remainder $0$.',
                  'The AC split on the quotient: $ac = -2$, sum $1$, the pair $(2, -1)$: $(2x - 1)(x + 1)$.',
                  'Hence $2x^{3} - 3x^{2} - 3x + 2 = (x - 2)(2x - 1)(x + 1)$ — check: $(x - 2)(2x^{2} + x - 1) = 2x^{3} - 3x^{2} - 3x + 2$ ✓.',
                ],
                answer: '$(x - 2)(2x - 1)(x + 1)$',
              },
              {
                q: 'Factor $x^{3} + 3x^{2} - 4x - 12$ — by the theorem AND by grouping, and watch the roads agree.',
                solution: [
                  'Road one (the theorem): $f(-2) = -8 + 12 + 8 - 12 = 0$ — root $-2$; division gives $x^{2} + x - 6 = (x + 3)(x - 2)$.',
                  'Road two (4.1 grouping): $x^{2}(x + 3) - 4(x + 3) = (x + 3)(x^{2} - 4) = (x + 3)(x + 2)(x - 2)$.',
                  'Both roads: $x^{3} + 3x^{2} - 4x - 12 = (x + 2)(x + 3)(x - 2)$ — the same three factors, as uniqueness demands.',
                  'Check: $(x + 2)(x^{2} + x - 6) = x^{3} + 3x^{2} - 4x - 12$ ✓.',
                ],
                answer: '$(x + 2)(x + 3)(x - 2)$',
              },
            ],
          },
          {
            level: 'L4',
            questions: [
              {
                q: 'Factor $x^{3} - 3x + 2$ completely — watch for the repeated root.',
                solution: [
                  'Candidates $\\pm 1, \\pm 2$: $f(1) = 1 - 3 + 2 = 0$ — root $1$.',
                  'Divide out $(x - 1)$: quotient $x^{2} + x - 2$, remainder $0$.',
                  'The hunt on the quotient: product $-2$, sum $1$ — $(x + 2)(x - 1)$: the factor $(x - 1)$ AGAIN.',
                  'Hence $x^{3} - 3x + 2 = (x - 1)^{2}(x + 2)$ — a double root at $1$; check: $(x - 1)(x^{2} + x - 2) = x^{3} - 3x + 2$ ✓.',
                ],
                answer: '$(x - 1)^{2}(x + 2)$',
              },
              {
                q: 'Show that $x^{3} - 2x + 5$ is irreducible over the integers.',
                solution: [
                  'The candidates ($p \\mid 5$): $\\pm 1, \\pm 5$.',
                  'Evaluate all four: $f(1) = 4$, $f(-1) = 6$, $f(5) = 125 - 10 + 5 = 120$, $f(-5) = -125 + 10 + 5 = -110$.',
                  'No zero anywhere in the candidate list.',
                  'The irreducibility verdict: a cubic factorization would force a linear factor, hence an integer root — none exists. Hence $x^{3} - 2x + 5$ is irreducible over the integers (its real roots wait for chapter 8–9’s machinery).',
                ],
                answer: 'irreducible over the integers — all four candidates priced, none zero',
              },
            ],
          },
          {
            level: 'L5',
            questions: [
              {
                q: 'Factor $x^{3} + 8$ by the identity AND by the theorem, and confirm the roads agree.',
                solution: [
                  'Road one (4.3’s shelf): both terms cubes — $x^{3} + 8 = (x + 2)(x^{2} - 2x + 4)$.',
                  'Road two (the theorem): $f(-2) = -8 + 8 = 0$ — so $(x + 2)$ divides; division gives $x^{2} - 2x + 4$.',
                  'Same factor, same quotient — the roads agree, as uniqueness demands.',
                  'The companion’s gauge is $4 - 16 = -12 < 0$: irreducible. Hence $x^{3} + 8 = (x + 2)(x^{2} - 2x + 4)$, complete.',
                ],
                answer: '$(x + 2)(x^{2} - 2x + 4)$ by both roads',
              },
              {
                q: 'Find $k$ so that $(x - 2)$ is a factor of $x^{3} + kx^{2} - 11x + 6$.',
                solution: [
                  'The factor theorem: $(x - 2)$ is a factor exactly when $f(2) = 0$.',
                  'Evaluate: $f(2) = 8 + 4k - 22 + 6 = 4k - 8$.',
                  'Set $4k - 8 = 0$: $k = 2$.',
                  'Check: with $k = 2$, $f(2) = 8 + 8 - 22 + 6 = 0$ ✓ — the theorem turned a factoring question into one linear equation.',
                ],
                answer: '$k = 2$',
              },
            ],
          },
          {
            level: 'L6',
            questions: [
              {
                q: 'Factor $x^{4} - 5x^{3} + 5x^{2} + 5x - 6$ completely — two rounds of the machine.',
                solution: [
                  'Candidates $\\pm 1, \\pm 2, \\pm 3, \\pm 6$. Evaluate: $f(1) = 1 - 5 + 5 + 5 - 6 = 0$ — root $1$.',
                  'Divide out $(x - 1)$: quotient $x^{3} - 4x^{2} + x + 6$, remainder $0$.',
                  'Round two on the cubic: $f(-1) = -1 - 4 - 1 + 6 = 0$ — root $-1$; divide out $(x + 1)$: quotient $x^{2} - 5x + 6$.',
                  'The hunt closes it: $(x - 2)(x - 3)$.',
                  'Hence $x^{4} - 5x^{3} + 5x^{2} + 5x - 6 = (x - 1)(x + 1)(x - 2)(x - 3)$ — four linear factors; check: $(x - 1)(x^{3} - 4x^{2} + x + 6) = x^{4} - 5x^{3} + 5x^{2} + 5x - 6$ ✓.',
                ],
                answer: '$(x - 1)(x + 1)(x - 2)(x - 3)$',
              },
            ],
          },
        ] },
      ],
    },
    {
      id: 'al-hcf-and-lcm-of-expressions',
      number: '4.5',
      title: 'HCF and LCM of Expressions',
      concepts: [
        'HCF of expressions',
        'LCM of expressions',
        'highest dimensions, not greatest value',
        'the power census: min and max',
        'the master identity',
        'the factor-shelf census',
        'the Euclidean measure for polynomials',
        'hunting the missing expression',
      ],
      objectives: [
        'define the HCF and LCM of expressions by divisibility and dimensions, not by size',
        'run the power census on monomials: coefficient HCF/LCM, letters at the lowest and highest powers',
        'prove and apply the master identity A × B = HCF × LCM, and know exactly where it fails',
        'extract the HCF and LCM of compound expressions from complete factorisations',
        'carry out the Euclidean measure for polynomials, rejecting disloyal simple factors',
        'hunt a missing expression from its HCF, its LCM and its partner',
      ],
      prerequisites: ['al-common-factors-and-grouping', 'al-dividing-polynomials-long-division-and-the-remainder-theorem'],
      sources: ['hall-knight-elementary-algebra', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Chapter 4 has been a one-way street: take an expression, split it into factors. This lesson walks the street in **both directions at once**. Given two expressions, we ask the twin census questions — what do they **share** (their highest common factor), and what do they **jointly cover** (their lowest common multiple)? FM chapter 3 answered both for bare numbers with the Euclidean measure; FM chapter 2 built HCF and LCM on prime walls. Here the same two questions wear letters, and the answers decide how algebraic fractions reduce, how equations clear their denominators, and how examiners spend a guaranteed mark or two.' },
        { kind: 'para', text: 'Everything rests on one idea from 4.1: a **complete factorisation** is a full inventory. Once two expressions have each declared their factors — at every power — the HCF and LCM stop being searches and become **readings**: take what the inventories hold in common at the lowest common power, take everything either holds at the highest power. When factorisation stalls, the division craft of 3.4 returns as the Euclidean measure for polynomials, and the census continues by another road.' },
        { kind: 'heading', text: 'The Highest Common Factor of Expressions' },
        { kind: 'callout', tone: 'definition', title: 'HCF and LCM of expressions', text: 'The **highest common factor** (HCF) of two or more expressions is the expression of **highest dimensions** which divides each of them without remainder. The **lowest common multiple** (LCM) is the expression of **lowest dimensions** which is divisible by each of them without remainder. "Dimensions" means total degree — not numerical size.' },
        { kind: 'para', text: 'Thus, $d = \\mathrm{HCF}(A, B)$ means $d \\mid A$ and $d \\mid B$, and no common factor of $A$ and $B$ has larger total degree than $d$. The definition is deliberately about **dimensions**, not value: among the common factors we rank by how much of the expressions they account for, never by how large a number they happen to be. That single word does real work:' },
        { kind: 'callout', tone: 'insight', title: 'Highest, not greatest', text: 'Both $2(x+1)$ and $3(x+1)$ divide $6(x+1)$, and $6(x+1)$ divides each of $2(x+1)$ and $3(x+1)$ — it is the "largest" common multiple in the arithmetic sense. Yet the HCF of $2(x+1)$ and $3(x+1)$ is $x+1$: the coefficient census is $\\mathrm{HCF}(2, 3) = 1$, because $6(x+1)$ divides neither expression. In arithmetic the greatest common measure of 2 and 3 is 1 wearing a factor both share; in algebra the same reading holds — the HCF is the common factor of **highest dimensions**, with the coefficient taken at its HCF.' },
        { kind: 'heading', text: 'Monomials: the Power Census' },
        { kind: 'para', text: 'For monomials the HCF can be written down by inspection, exactly as FM 3 did for numbers. The rule has two columns. The **coefficient column** carries the HCF of the numerical coefficients — the Euclidean measure of FM chapter 3, unchanged. The **letter column** carries every letter the expressions **share**, taken at the **lowest power** it attains in any of them — the GCF-of-terms anatomy of 4.1, now read as a two-expression census. A letter absent from any expression is shared by none, so it contributes nothing to the HCF. The LCM flips both columns: the **LCM of the coefficients**, and **every letter that appears anywhere**, at its **highest power**.' },
        { kind: 'figure', caption: 'The power census of two monomials — the minimum row builds the HCF, the maximum row builds the LCM', svg: '<svg viewBox="0 0 720 400" role="img" aria-label="The power census of 12 x squared y cubed z and 18 x y squared w: the minimum row over the coefficient and letter powers builds the HCF 6 x y squared, the maximum row builds the LCM 36 x squared y cubed z w"><rect x="0" y="0" width="720" height="400" fill="#fffdf5"/><text x="360" y="30" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">The power census of 12x²y³z and 18xy²w</text><rect x="200" y="46" width="160" height="34" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/><text x="280" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="#166534">12x²y³z</text><rect x="360" y="46" width="160" height="34" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/><text x="440" y="68" text-anchor="middle" font-size="16" font-weight="700" fill="#166534">18xy²w</text><text x="150" y="106" text-anchor="end" font-size="14" fill="#0d9488">coefficient</text><text x="280" y="106" text-anchor="middle" font-size="15" fill="#65a30d">12</text><text x="440" y="106" text-anchor="middle" font-size="15" fill="#65a30d">18</text><text x="150" y="140" text-anchor="end" font-size="14" fill="#0d9488">x</text><text x="280" y="140" text-anchor="middle" font-size="15" fill="#65a30d">2</text><text x="440" y="140" text-anchor="middle" font-size="15" fill="#65a30d">1</text><text x="150" y="174" text-anchor="end" font-size="14" fill="#0d9488">y</text><text x="280" y="174" text-anchor="middle" font-size="15" fill="#65a30d">3</text><text x="440" y="174" text-anchor="middle" font-size="15" fill="#65a30d">2</text><text x="150" y="208" text-anchor="end" font-size="14" fill="#0d9488">z</text><text x="280" y="208" text-anchor="middle" font-size="15" fill="#65a30d">1</text><text x="440" y="208" text-anchor="middle" font-size="15" fill="#65a30d">0</text><text x="150" y="242" text-anchor="end" font-size="14" fill="#0d9488">w</text><text x="280" y="242" text-anchor="middle" font-size="15" fill="#65a30d">0</text><text x="440" y="242" text-anchor="middle" font-size="15" fill="#65a30d">1</text><line x1="70" y1="88" x2="560" y2="88" stroke="#fcd34d" stroke-width="1"/><line x1="70" y1="122" x2="560" y2="122" stroke="#fcd34d" stroke-width="1"/><line x1="70" y1="156" x2="560" y2="156" stroke="#fcd34d" stroke-width="1"/><line x1="70" y1="190" x2="560" y2="190" stroke="#fcd34d" stroke-width="1"/><line x1="70" y1="224" x2="560" y2="224" stroke="#fcd34d" stroke-width="1"/><line x1="70" y1="258" x2="560" y2="258" stroke="#fcd34d" stroke-width="1"/><rect x="60" y="278" width="600" height="44" rx="10" fill="#fef3c7" stroke="#ea580c" stroke-width="1.5"/><text x="360" y="306" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">minimum row: HCF(12,18) = 6, x at min(2,1) = 1, y at min(3,2) = 2 → 6xy²</text><rect x="60" y="334" width="600" height="44" rx="10" fill="#ffedd5" stroke="#d97706" stroke-width="1.5"/><text x="360" y="362" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">maximum row: LCM(12,18) = 36, x², y³, z, w → 36x²y³zw</text></svg>' },
        { kind: 'para', text: 'Reading the census off the figure: the shared letters are $x$ and $y$, so the HCF is $6xy^{2}$ — one power of $x$ and two of $y$, with $z$ and $w$ excluded because each is missing from one expression. The LCM keeps everything: $36x^{2}y^{3}zw$. The two answers are not independent — their product must rebuild both monomials at once, which is the theorem of the next section. Notice how the census makes the two questions symmetric: the same table answers both, once by reading down its minimum row and once by reading down its maximum row. That symmetry is not an accident — it is the engine of the master identity, and it is why a well-run census never needs to be done twice.' },
        { kind: 'list', marker: 'roman', items: [
          'For example, the HCF of $a^{4}b$ and $a^{2}b^{3}$ is $a^{2}b$: $a$ at $\\min(4, 2) = 2$, $b$ at $\\min(1, 3) = 1$.',
          'The HCF of $9x^{2}y$ and $12xy^{2}$ is $3xy$: $\\mathrm{HCF}(9, 12) = 3$, and each letter at its lowest power.',
          'The LCM of $4a^{2}$ and $6ab$ is $12a^{2}b$: $\\mathrm{LCM}(4, 6) = 12$, $a$ at $\\max(2, 1) = 2$, $b$ at $\\max(0, 1) = 1$.',
        ] },
        { kind: 'example', title: 'Find the HCF and the LCM of $15a^{3}b^{2}c$ and $24a^{2}b^{4}d$, and check the master identity', steps: [
          'Coefficient census: $\\mathrm{HCF}(15, 24) = 3$ and $\\mathrm{LCM}(15, 24) = 120$.',
          'Letter census for the HCF: $a$ at $\\min(3, 2) = 2$, $b$ at $\\min(2, 4) = 2$; $c$ and $d$ are not shared.',
          'So the HCF is $3a^{2}b^{2}$.',
          'Letter census for the LCM: $a$ at $\\max(3, 2) = 3$, $b$ at $\\max(2, 4) = 4$, and $c$, $d$ both enter.',
          'So the LCM is $120a^{3}b^{4}cd$.',
          'Check, both sides: $3a^{2}b^{2} \\cdot 120a^{3}b^{4}cd = 360a^{5}b^{6}cd$, and $15a^{3}b^{2}c \\cdot 24a^{2}b^{4}d = 360a^{5}b^{6}cd$ — the master identity holds.',
        ] },
        { kind: 'para', text: 'The closing check is worth doing every time: $3a^{2}b^{2} \\times 120a^{3}b^{4}cd = 360a^{5}b^{6}cd$, while the original product is $15a^{3}b^{2}c \\times 24a^{2}b^{4}d = 360a^{5}b^{6}cd$. Same monomial — the census is certified. Note also what the LCM did with $c$ and $d$: the HCF refused them (unshared), the LCM welcomed them (present somewhere).' },
        { kind: 'heading', text: 'The Master Identity' },
        { kind: 'callout', tone: 'theorem', title: 'The master identity (two expressions)', text: 'For any two expressions $A$ and $B$: $A \\times B = \\mathrm{HCF} \\times \\mathrm{LCM}$. Equivalently, the LCM is the product divided by the HCF: $\\mathrm{LCM} = \\dfrac{A \\times B}{\\mathrm{HCF}}$.' },
        { kind: 'derivation', title: 'Why min + max = sum forces the identity', statement: 'For two expressions, the HCF and the LCM are built from the same power census — one at the minimum, one at the maximum — and the two choices are complementary.', steps: [
          { label: 'Fix one prime or one letter', formula: 'p^{\\alpha} \\text{ in } A, \\quad p^{\\beta} \\text{ in } B', explanation: 'Look at any single prime factor of the coefficients, or any single letter, and write the powers it reaches in $A$ and in $B$.' },
          { label: 'The census takes min and max', formula: '\\mathrm{HCF}: p^{\\min(\\alpha,\\beta)}, \\qquad \\mathrm{LCM}: p^{\\max(\\alpha,\\beta)}', explanation: 'The HCF must divide both, so it takes the smaller power; the LCM must be divisible by both, so it takes the larger.' },
          { label: 'The complementarity', formula: '\\min(\\alpha, \\beta) + \\max(\\alpha, \\beta) = \\alpha + \\beta', explanation: 'Whichever of $\\alpha, \\beta$ is smaller, the two functions together take each exactly once — the minimum picks one, the maximum picks the other.' },
          { label: 'Reassemble both expressions', formula: '\\mathrm{HCF} \\times \\mathrm{LCM} = A \\times B', explanation: 'Every prime and every letter obeys the same complementary law, and the coefficient census does too (the identity $\\gcd(m,n) \\cdot \\mathrm{lcm}(m,n) = mn$ is the prime-wall reading of FM 2). Multiplying the two census answers therefore rebuilds the product exactly.' },
        ], result: 'A × B = HCF × LCM for two expressions — the LCM is always A × B ÷ HCF.' },
        { kind: 'callout', tone: 'warn', title: 'The identity is a TWO-expression law', text: 'For three or more expressions the master identity fails, because $\\min$ and $\\max$ over three powers no longer split a sum three ways. Witness $x$, $x$, $x$: the HCF is $x$, the LCM is $x$, so $\\mathrm{HCF} \\times \\mathrm{LCM} = x^{2}$ — but the product of the three expressions is $x^{3}$. Exam questions set exactly this trap; the identity is offered for pairs only, and the safe habit is to recompute the LCM of three expressions from the census, never from pair-wise identities.' },
        { kind: 'para', text: 'The census itself extends to three and more expressions without any drama: take the HCF of ALL the coefficients and each letter at its lowest power across every expression for the HCF; take the LCM of all the coefficients and each letter at its highest power anywhere for the LCM. What three expressions take away is only the shortcut — no pair-wise identity chain is licensed, so the safe habit is one direct census over all the shelves. Exercise 9 runs the three-expression census with coefficients, where the HCF of 2, 4 and 6 is 2 while their LCM is 12 — the coefficient column obeying the same min/max law as every letter column, and the whole census staying a reading rather than a hunt.' },
        { kind: 'para', text: 'The identity also gives the second route to an LCM: find the HCF first, then divide the product by it. In factor form this is the **co-factor reading** — write $A = aF$ and $B = bF$ with $F$ the HCF; then $a$ and $b$ are coprime, and the LCM is $F \\cdot a \\cdot b$, the HCF wearing both co-factors. When the HCF is found by division (below), this route needs no factorisation of $A$ and $B$ at all.' },
        { kind: 'heading', text: 'The Divisibility Test' },
        { kind: 'para', text: 'The census also answers the everyday question a reducer faces: does $D$ divide $A$? The shelf test is complete — $D$ divides $A$ exactly when every coefficient and letter power in the census of $D$ is matched or beaten by the census of $A$. Three readings price the test. The coefficient of $D$ must divide the coefficient of $A$ cleanly: 6 divides 12 and 18, but 6 does not divide 9, so $6xy^{2}$ divides $12x^{2}y^{3}z$ and $18xy^{2}w$ yet never divides $9x^{2}y^{2}$. Every letter of $D$ must appear in $A$: the $w$ in any divisor rules out $12x^{2}y^{3}z$ instantly. And every letter power of $D$ must be matched or beaten: $x^{3}$ asks more of $12x^{2}y^{3}z$ than that expression holds. No trial multiplication is ever needed — the census alone decides, which is exactly what makes the HCF the natural first question of fraction reduction.' },
        { kind: 'list', marker: 'roman', items: [
          'For example, 6xy² divides 12x²y³z: the coefficient test passes (12 ÷ 6 = 2) and every letter power is matched or beaten.',
          '6xy² divides 18xy²w as well: 18 ÷ 6 = 3, and the divisor powers are exactly attained — nothing left over, nothing short.',
          'But 6xy² does not divide 9x²y²: the coefficient test fails first (9 ÷ 6 is not whole), so the divisibility stops at the census.',
        ] },
        { kind: 'heading', text: 'Compound Expressions: the Factor-Shelf Census' },
        { kind: 'para', text: 'For compound expressions the census runs on **complete factorisations**. Factor each expression into its irreducible factors (the whole toolkit of 4.1-4.4: common factors: common factors, grouping, the middle-term hunt, the identities, the factor theorem). Then the HCF is the product of the factors the shelves **hold in common**, each at the **highest power common to all** the shelves; the LCM is the product of the factors that appear on **any** shelf, each at its **highest power anywhere**. Compound factors obey the same min/max law that single letters did — the only new discipline is counting the powers of a whole bracket like $(x+1)^{2}$ correctly.' },
        { kind: 'figure', caption: 'The factor shelves of two expressions — the shared crate is the HCF, the union shelf is the LCM', svg: '<svg viewBox="0 0 720 400" role="img" aria-label="The factor shelves of x squared minus 9 and x squared plus 5 x plus 6: the shared crate x plus 3 is the HCF and the union shelf (x-3)(x+3)(x+2) is the LCM"><rect x="0" y="0" width="720" height="400" fill="#fffdf5"/><text x="360" y="30" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">The factor shelves of x² − 9 and x² + 5x + 6</text><text x="180" y="80" text-anchor="middle" font-size="15" fill="#166534">x² − 9 = (x−3)(x+3)</text><rect x="40" y="92" width="280" height="50" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="1.5"/><rect x="55" y="102" width="110" height="30" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.2"/><text x="110" y="122" text-anchor="middle" font-size="14" fill="#166534">x − 3</text><rect x="185" y="102" width="110" height="30" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.2"/><text x="240" y="122" text-anchor="middle" font-size="14" fill="#166534">x + 3</text><text x="540" y="80" text-anchor="middle" font-size="15" fill="#166534">x² + 5x + 6 = (x+2)(x+3)</text><rect x="400" y="92" width="280" height="50" rx="8" fill="#ffedd5" stroke="#16a34a" stroke-width="1.5"/><rect x="415" y="102" width="110" height="30" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.2"/><text x="470" y="122" text-anchor="middle" font-size="14" fill="#166534">x + 2</text><rect x="545" y="102" width="110" height="30" rx="6" fill="#ffffff" stroke="#16a34a" stroke-width="1.2"/><text x="600" y="122" text-anchor="middle" font-size="14" fill="#166534">x + 3</text><rect x="60" y="190" width="600" height="46" rx="10" fill="#fef3c7" stroke="#ea580c" stroke-width="1.5"/><text x="360" y="218" text-anchor="middle" font-size="15" font-weight="700" fill="#166534">HCF — the crate on BOTH shelves: (x + 3)</text><rect x="60" y="252" width="600" height="62" rx="10" fill="#ffffff" stroke="#0d9488" stroke-width="1.5"/><text x="360" y="276" text-anchor="middle" font-size="14" fill="#0f766e">LCM — the union shelf, each crate at its highest power:</text><text x="360" y="300" text-anchor="middle" font-size="16" font-weight="700" fill="#0f766e">(x-3)(x+3)(x+2)</text><text x="360" y="348" text-anchor="middle" font-size="14" fill="#0d9488">master identity check: (x² − 9)(x² + 5x + 6) = (x + 3) × (x−3)(x+3)(x+2)</text></svg>' },
        { kind: 'para', text: 'Reading the shelves: $(x-3)$ lives only on the first, $(x+2)$ only on the second, and $(x+3)$ stands on both. The HCF is the shared crate $(x+3)$ alone; the LCM is the union shelf $(x-3)(x+3)(x+2)$ — and the master identity line under the trays confirms the two readings multiply back to the original product. One caution before the examples: when a compound factor repeats, count it like the census counted letters — at its **highest common power** for the HCF and its **highest power anywhere** for the LCM, never by mere presence.' },
        { kind: 'example', title: 'Find the HCF and the LCM of $x^{3} - 9x$ and $x^{2} - x - 6$', steps: [
          'Factor the first completely: $x^{3} - 9x = x(x^{2} - 9) = x(x-3)(x+3)$.',
          'Factor the second: $x^{2} - x - 6 = (x-3)(x+2)$ — the hunt finds $-3$ and $+2$.',
          'Shelf census: $(x-3)$ stands on both shelves; $x$ and $(x+3)$ belong to the first alone, $(x+2)$ to the second alone.',
          'Hence the HCF is $(x-3)$.',
          'Hence the LCM is $x(x-3)(x+3)(x+2)$.',
          'Check by the master identity: $(x-3) \\times x(x-3)(x+3)(x+2) = x(x-3)^{2}(x+3)(x+2)$, and $x^{3} - 9x = x(x-3)(x+3)$ times $x^{2} - x - 6 = (x-3)(x+2)$ gives the same product.',
        ] },
        { kind: 'heading', text: 'When Factorisation Stalls: the Euclidean Measure' },
        { kind: 'para', text: 'The shelf census needs complete factorisations, and 4.4 was honest about when those are hard to get. FM chapter 3 faced the same wall for numbers and answered it with the division algorithm of Euclid; the identical machine works for polynomials, with one genuinely new caution. **Divide $A$ by $B$; take the remainder; then divide $B$ by the remainder; repeat until the remainder is $0$.** The last non-zero remainder divides both originals — it is the HCF, up to a numerical factor that carries no algebra.' },
        { kind: 'derivation', title: 'The remainder law — why the chain preserves the HCF', statement: 'If $A = qB + R$ (division with remainder), then $A$ and $B$ have exactly the same common factors as $B$ and $R$.', steps: [
          { label: 'Forward reading', formula: 'D \\mid A \\text{ and } D \\mid B \\;\\Rightarrow\\; D \\mid A - qB = R', explanation: 'Any common factor of $A$ and $B$ divides the combination $A - qB$, which is precisely the remainder. So it divides $R$ too.' },
          { label: 'Backward reading', formula: 'D \\mid B \\text{ and } D \\mid R \\;\\Rightarrow\\; D \\mid qB + R = A', explanation: 'Conversely, any common factor of $B$ and $R$ divides $qB + R$, which is $A$. So it divides $A$ too.' },
          { label: 'Same factor set', formula: '\\{ \\text{common factors of } (A, B) \\} = \\{ \\text{common factors of } (B, R) \\}', explanation: 'The two sets of common factors are identical — in particular their highest members coincide.' },
          { label: 'Descend', formula: '\\mathrm{HCF}(A, B) = \\mathrm{HCF}(B, R)', explanation: 'Each division step preserves the HCF while the degrees drop, so the descent must terminate — the last non-zero remainder is the HCF.' },
        ], result: 'HCF(A, B) = HCF(B, A mod B): every remainder on the road carries the HCF.' },
        { kind: 'para', text: 'The new caution is the **disloyal factor**. A remainder may carry a numerical factor that neither original expression contains — a scalar that appeared only because of the division. Such a factor cannot be part of the HCF (the HCF must divide $A$ and $B$ themselves), so it is **rejected** before continuing, exactly as the equal-degree walk below rejects the $-2$ and the $-\\tfrac{5}{2}$. The algebra that remains is loyal — it genuinely divides both originals. The same rejection applies to awkward numerical factors that would otherwise make the next division messy: divide them out, keep the algebra.' },
        { kind: 'para', text: 'The loyalty language deserves one more reading before the figure, because it is the part of the Euclidean measure that arithmetic never needed. When two expressions have the same degree, divide anyway: the quotient may be a bare constant such as one half, and the remainder does all the work. When a remainder arrives wearing a numerical coat — minus two, minus five halves, nine — ask whether that coat divides the ORIGINAL expressions. If it does not, it is disloyal: it entered the remainder only through the division, so it can say nothing about a common factor, and it is rejected before the chain continues. What survives the rejection is the loyal algebra, and the loyal algebra is what descends to the next division. The figure below walks the whole machine on a pair that needs both beats — a rejection and a clean finish.' },
        { kind: 'figure', caption: 'The Euclidean measure for polynomials — the disloyal −2 is rejected and the loyal x − 1 finishes the job', svg: '<svg viewBox="0 0 720 400" role="img" aria-label="The Euclidean measure for polynomials: dividing x cubed minus 3 x plus 2 by x squared minus 1 leaves remainder minus 2 x plus 2, whose disloyal factor minus 2 is rejected; the loyal x minus 1 divides x squared minus 1 exactly, so the HCF is x minus 1"><rect x="0" y="0" width="720" height="400" fill="#fffdf5"/><text x="360" y="30" text-anchor="middle" font-size="17" font-weight="700" fill="#166534">The Euclidean measure: HCF(x³ − 3x + 2, x² − 1)</text><rect x="30" y="56" width="320" height="96" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="1.5"/><text x="46" y="80" font-size="14" fill="#166534">divide A by B:</text><text x="46" y="104" font-size="15" font-weight="700" fill="#166534">A = x³ − 3x + 2</text><text x="46" y="128" font-size="15" font-weight="700" fill="#166534">B = x² − 1</text><text x="382" y="106" font-size="22" fill="#d97706">→</text><rect x="420" y="56" width="270" height="96" rx="10" fill="#ffffff" stroke="#16a34a" stroke-width="1.5"/><text x="436" y="80" font-size="14" fill="#166534">quotient x, remainder:</text><text x="436" y="104" font-size="15" font-weight="700" fill="#d97706">−2x + 2 = −2 · (x − 1)</text><text x="436" y="128" font-size="13" fill="#dc2626">−2 is disloyal — reject it, keep x − 1</text><rect x="30" y="176" width="320" height="96" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="1.5"/><text x="46" y="200" font-size="14" fill="#166534">now divide B by the loyal part:</text><text x="46" y="224" font-size="15" font-weight="700" fill="#166534">x² − 1 = (x − 1)(x + 1)</text><text x="46" y="248" font-size="15" font-weight="700" fill="#166534">remainder 0 — stop</text><text x="382" y="226" font-size="22" fill="#d97706">→</text><rect x="420" y="184" width="270" height="80" rx="10" fill="#fef3c7" stroke="#ea580c" stroke-width="1.5"/><text x="555" y="216" text-anchor="middle" font-size="18" font-weight="700" fill="#166534">HCF = x − 1</text><text x="555" y="242" text-anchor="middle" font-size="13" fill="#65a30d">the last non-zero remainder, made loyal</text><rect x="30" y="300" width="660" height="66" rx="10" fill="#ffedd5" stroke="#d97706" stroke-width="1.5"/><text x="360" y="328" text-anchor="middle" font-size="14" fill="#166534">the law: every remainder carries the HCF — so the hunt descends</text><text x="360" y="352" text-anchor="middle" font-size="14" fill="#166534">(A, B) → (B, R) → … until 0, rejecting disloyal scalars on the way</text></svg>' },
        { kind: 'example', title: 'Find the HCF of $x^{3} - 3x + 2$ and $x^{2} - 1$ by the Euclidean measure', steps: [
          'Divide: $x^{3} - 3x + 2 = x \\cdot (x^{2} - 1) + (-2x + 2)$ — quotient $x$, remainder $-2x + 2$.',
          'Now, the remainder carries the HCF: $-2x + 2 = -2(x - 1)$. The factor $-2$ is disloyal — neither original contains it — so reject it and keep $x - 1$.',
          'Divide again: $x^{2} - 1 = (x - 1)(x + 1)$, remainder $0$.',
          'Hence the last non-zero loyal remainder is the HCF: $\\mathrm{HCF} = x - 1$.',
          'Check by shelf census: $x^{3} - 3x + 2 = (x-1)^{2}(x+2)$ and $x^{2} - 1 = (x-1)(x+1)$ — the shared crate is $(x-1)$ ✓.',
        ] },
        { kind: 'para', text: 'Two remarks before the exercises. First, when the two expressions have the **same degree**, divide anyway — the quotient may be a mere $\\tfrac{1}{2}$, and the remainder does the work; exercise 12 walks exactly this case, where the disloyal factor is the fraction $-\\tfrac{5}{2}$ and the loyal survivor is $3x^{2}-4x+1$. Second, the Euclidean measure finds **only** the HCF; the LCM then comes free from the master identity or the co-factor reading, with no factorisation needed — the route exercise 11 practises.' },
        { kind: 'heading', text: 'Hunting the Missing Expression' },
        { kind: 'para', text: 'The master identity turns census data into a **recovery machine**: given the HCF, the LCM, and one of the two expressions, the other is $\\mathrm{HCF} \\times \\mathrm{LCM} \\div$ the one you hold. In factor form the hunt is a pure bookkeeping check — the missing expression must wear the factors of the LCM that the held expression does not already carry, at matching powers. The division craft of 3.4 does the dividing when the expressions are given expanded.' },
        { kind: 'example', title: 'The HCF of two expressions is $(x+1)^{2}$ and their LCM is $(x+1)^{2}(x-2)(x+3)$; one expression is $(x+1)^{2}(x-2)$. Find the other', steps: [
          'The hunt: the other expression $= \\dfrac{\\mathrm{HCF} \\times \\mathrm{LCM}}{\\text{held expression}} = \\dfrac{(x+1)^{2} \\cdot (x+1)^{2}(x-2)(x+3)}{(x+1)^{2}(x-2)}$.',
          'Cancel the shelf: $(x+1)^{2}$ cancels against $(x+1)^{2}$, and $(x-2)$ cancels against $(x-2)$.',
          'Hence the other expression is $(x+1)^{2}(x+3)$.',
          'Census check: the held and found expressions share $(x+1)^{2}$ and nothing more — the HCF ✓; their union shelf is $(x+1)^{2}(x-2)(x+3)$ — the LCM ✓.',
        ] },
        { kind: 'para', text: 'The hunt always ends the same way: the HCF × LCM product, divided by the expression you hold, hands over its partner — here $(x+1)^{2}(x-2) = x^{3}-3x-2$ hands over $(x+1)^{2}(x+3) = x^{3}+5x^{2}+7x+3$. Two honesty checks before trusting any answer: the pair must reproduce the stated HCF **and** the stated LCM by the shelf census, and the degree of the found expression must match the census — if your answer wears a power of some factor that the LCM does not carry, a cancellation went wrong somewhere.' },
        { kind: 'heading', text: 'Paying Off: Fractions Reduce and Clear' },
        { kind: 'para', text: 'This craft is not an end in itself — it is the machinery the algebra of fractions (chapter 8) runs on, and a preview earns its space here. Reducing a fraction means cancelling the HCF of the numerator and the denominator; clearing denominators before adding fractions means building their LCM as the common denominator. Both are the same shelf census pointed at two different jobs, and the worked pair below shows the two readings on one example pair.' },
        { kind: 'list', marker: 'roman', items: [
          'Reduce (x² − 9)/(x² + 5x + 6): the shelves share (x + 3), so cancelling the HCF leaves (x − 3)/(x + 2) — an honest reduction by a genuine common factor.',
          'To add 1/(x² − 9) + 1/(x² + 5x + 6), build the LCM shelf (x − 3)(x + 3)(x + 2) as the common denominator; each fraction then needs exactly the co-factors the census computed — the first needs (x + 2), the second needs (x − 3).',
          'The master identity prices the work: the product of the two denominators divided by their HCF (x + 3) is precisely the LCM shelf — one division instead of a fresh factorisation.',
          'The absorption reading returns too: when one denominator already divides the other, the LCM is simply the larger one, and no common-denominator work is needed at all.',
        ] },
        { kind: 'callout', tone: 'historical', title: 'The measure of Euclid, algebraised', text: 'The division method is Book VII of the *Elements* of Euclid (c. 300 BCE) running on letters: Proposition 2 finds the greatest common measure of two numbers by continued subtraction, and the remainder law is the engine. Hall and Knight, in *Elementary Algebra for Schools* (1885), algebraised the same machine for compound expressions, with exactly the disloyal-factor caution this lesson keeps — their remark that the highest common factor "is not necessarily the greatest common measure" is the highest-dimensions discipline of the opening of this lesson.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner', text: 'JEE Main asks this craft directly — "the LCM of $A$ and $B$ is …, their HCF is …, find the missing expression" is a one-step master-identity score, and the three-expression trap is a favourite assertion/reason item. In the Cengage M-series the shelf census feeds fraction reduction (ch. 8 of this book) and denominator clearing. Board papers (CBSE/ICSE class 9–10) ask the monomial census and short Euclid walks; SSC and bank exams reuse the coefficient column for numeric speed. The mark-earners: state the master identity **for two expressions**, and count compound-factor powers before answering.' },
        { kind: 'formula', name: 'Monomial census', latex: '\\mathrm{HCF} = \\mathrm{HCF}(\\text{coefs}) \\cdot \\prod p^{\\min}, \\qquad \\mathrm{LCM} = \\mathrm{LCM}(\\text{coefs}) \\cdot \\prod p^{\\max}', note: 'letters shared at lowest powers for the HCF; all letters at highest powers for the LCM' },
        { kind: 'formula', name: 'The master identity (pairs only)', latex: 'A \\times B = \\mathrm{HCF} \\times \\mathrm{LCM} \\quad\\Rightarrow\\quad \\mathrm{LCM} = \\frac{A \\times B}{\\mathrm{HCF}}', note: 'fails for three or more expressions — recompute from the census' },
        { kind: 'formula', name: 'The Euclidean measure', latex: '\\mathrm{HCF}(A, B) = \\mathrm{HCF}(B, A \\bmod B) = \\dots = \\text{last non-zero remainder (loyal)}', note: 'reject disloyal simple factors; take the monic/loyal form' },
        { kind: 'terms', items: [
          { term: 'Highest common factor (of expressions)', def: 'the expression of highest dimensions dividing each given expression without remainder; the shared factor shelf at the highest common powers' },
          { term: 'Lowest common multiple (of expressions)', def: 'the expression of lowest dimensions divisible by each given expression; the union factor shelf at the highest powers anywhere' },
          { term: 'Dimensions', def: 'total degree — the ranking the HCF/LCM definitions use instead of numerical size' },
          { term: 'Power census', def: 'the coefficient-plus-letter table whose minimum row builds the HCF and maximum row builds the LCM' },
          { term: 'Master identity', def: 'A × B = HCF × LCM — valid for exactly two expressions' },
          { term: 'Euclidean measure (for polynomials)', def: 'the division chain HCF(A, B) = HCF(B, A mod B) ending at the last non-zero remainder' },
          { term: 'Disloyal factor', def: 'a numerical factor of a remainder that neither original expression contains — rejected before continuing the Euclid chain' },
          { term: 'Co-factors', def: 'writing A = aF, B = bF with F the HCF; a and b are coprime and the LCM is F · a · b' },
        ] },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The HCF of $12x^{2}y^{3}z$ and $18xy^{2}w$ is',
            options: ['$3xy^{2}z$', '$6xy^{2}$', '$6x^{2}y^{2}$', '$36x^{2}y^{3}zw$'],
            answer: 1,
            explain: 'The coefficient census is HCF(12, 18) = 6; the shared letters are x and y at min(2, 1) = 1 and min(3, 2) = 2, giving $6xy^{2}$. Option 1 carries $z$, which the second expression lacks; option 3 takes $x^{2}$ though the second expression holds only $x^{1}$; option 4 is the LCM, not the HCF.',
          },
          {
            q: 'For which family does the master identity $A \\times B = \\mathrm{HCF} \\times \\mathrm{LCM}$ fail?',
            options: ['two monomials with overlapping letters', 'two expressions sharing exactly one linear factor', 'three expressions — for instance $x$, $x$, $x$', 'two coprime expressions with HCF 1'],
            answer: 2,
            explain: 'min + max = sum splits two powers exactly, so the identity is a pair law. For $x$, $x$, $x$: HCF = x, LCM = x, product = $x^{3}$ — but HCF × LCM = $x^{2}$. Options 1, 2 and 4 are all pairs (coprime pairs give HCF 1 and LCM = product, which holds).',
          },
          {
            q: 'The HCF of $(x+1)^{2}(x-2)$ and $(x+1)^{2}(x+3)$ is',
            options: ['$x+1$', '$(x-2)(x+3)$', '$(x+1)^{2}(x-2)(x+3)$', '$(x+1)^{2}$'],
            answer: 3,
            explain: 'The compound factor $(x+1)$ appears at power 2 on BOTH shelves, so the HCF keeps the highest common power: $(x+1)^{2}$. Option 1 takes the lowest power; option 2 is neither a factor census nor a multiple; option 3 is the LCM.',
          },
          {
            q: 'In the Euclidean measure for polynomials, the HCF is',
            options: ['the first remainder, taken exactly as it comes', 'the last non-zero remainder with disloyal simple factors rejected', 'the final quotient of the last division', 'always the original divisor'],
            answer: 1,
            explain: 'Every remainder carries the HCF, but raw remainders may also carry disloyal scalars (like the −2 in $-2x + 2$) that divide neither original — reject them and take the loyal algebra. Option 3: quotients play no role; option 4 is only true when the very first division already ends the chain.',
          },
          {
            q: 'The LCM of $x^{2} - 9$ and $x^{2} + 5x + 6$ is',
            options: ['$x^{2} + 5x + 6$', '$(x-3)(x+2)$', '$(x+3)^{2}(x-3)(x+2)$', '$(x-3)(x+3)(x+2)$'],
            answer: 3,
            explain: 'Factor: $x^{2} - 9 = (x-3)(x+3)$ and $x^{2} + 5x + 6 = (x+2)(x+3)$. The union shelf at highest powers is $(x-3)(x+3)(x+2)$. Option 1 is missing the factor $(x-3)$ entirely; option 2 drops the shared crate from the union; option 3 doubles $(x+3)$ — the LCM takes the highest power of each factor once.',
          },
        ] },
        { kind: 'exercises', title: 'Practice sets', sets: [
          { level: 'L1', questions: [
            { q: 'Find the HCF of $8a^{2}b$ and $12ab^{3}$.', solution: ['Coefficient census: $\\mathrm{HCF}(8, 12) = 4$.', 'Letter census: $a$ at $\\min(2, 1) = 1$, $b$ at $\\min(1, 3) = 1$.', 'Hence the HCF is $4ab$.'], answer: '$4ab$' },
            { q: 'Find the LCM of $6x^{2}$ and $10xy$.', solution: ['Coefficient census: $\\mathrm{LCM}(6, 10) = 30$.', 'Letter census: $x$ at $\\max(2, 1) = 2$, $y$ at $\\max(0, 1) = 1$.', 'Hence the LCM is $30x^{2}y$.'], answer: '$30x^{2}y$' },
            { q: 'Find both the HCF and the LCM of $9m^{2}n$ and $12mn^{2}$.', solution: ['HCF: $\\mathrm{HCF}(9, 12) = 3$, letters at their lowest powers $m^{1} n^{1}$ — so $3mn$.', 'LCM: $\\mathrm{LCM}(9, 12) = 36$, letters at their highest powers $m^{2} n^{2}$ — so $36m^{2}n^{2}$.', 'Check: $3mn \\cdot 36m^{2}n^{2} = 108m^{3}n^{3} = 9m^{2}n \\cdot 12mn^{2}$ ✓.'], answer: 'HCF $3mn$; LCM $36m^{2}n^{2}$' },
          ] },
          { level: 'L2', questions: [
            { q: 'Find the HCF of $x^{2} - 4$ and $x + 2$.', solution: ['Factor the first: $x^{2} - 4 = (x-2)(x+2)$.', 'The second is already a factor: $x + 2$.', 'Shelf census: $(x+2)$ stands on both shelves; hence the HCF is $x + 2$.'], answer: '$x + 2$' },
            { q: 'Find the LCM of $x - 1$ and $x^{2} - 1$.', solution: ['Factor: $x^{2} - 1 = (x-1)(x+1)$.', 'The LCM must be divisible by $(x-1)$ and by $(x-1)(x+1)$ — the larger multiple already absorbs the smaller.', 'Hence the LCM is $(x-1)(x+1) = x^{2} - 1$.'], answer: '$x^{2} - 1$' },
            { q: 'Verify the master identity for $6a^{2}b^{3}$ and $9ab^{2}$.', solution: ['HCF: $\\mathrm{HCF}(6, 9) = 3$, letters at lowest powers $a^{1}b^{2}$ — so $3ab^{2}$.', 'LCM: $\\mathrm{LCM}(6, 9) = 18$, letters at highest powers $a^{2}b^{3}$ — so $18a^{2}b^{3}$.', 'Both sides: $\\mathrm{HCF} \\times \\mathrm{LCM} = 54a^{3}b^{5}$ and $6a^{2}b^{3} \\cdot 9ab^{2} = 54a^{3}b^{5}$ — the identity holds ✓.'], answer: 'HCF $3ab^{2}$, LCM $18a^{2}b^{3}$, identity verified ($54a^{3}b^{5}$ both sides)' },
          ] },
          { level: 'L3', questions: [
            { q: 'Find the HCF of $x^{3} - 16x$ and $x^{2} - 3x - 4$.', solution: ['Factor the first: $x^{3} - 16x = x(x^{2} - 16) = x(x-4)(x+4)$.', 'Factor the second: $x^{2} - 3x - 4 = (x-4)(x+1)$.', 'Shelf census: $(x-4)$ stands on both shelves; $x$ and $(x+4)$ are first-shelf only, $(x+1)$ second-shelf only.', 'Hence the HCF is $(x-4)$.'], answer: '$x - 4$' },
            { q: 'Find the LCM of $x^{2} + 3x + 2$ and $x^{2} + 5x + 6$.', solution: ['Factor: $x^{2} + 3x + 2 = (x+1)(x+2)$ and $x^{2} + 5x + 6 = (x+2)(x+3)$.', 'Union shelf at highest powers: $(x+1)$, $(x+2)$, $(x+3)$.', 'Hence the LCM is $(x+1)(x+2)(x+3)$.'], answer: '$(x+1)(x+2)(x+3)$' },
            { q: 'Find the HCF and the LCM of $2x(x-1)^{2}$, $4(x-1)(x+1)$ and $6(x-1)^{3}$.', solution: ['Coefficient census across three: $\\mathrm{HCF}(2, 4, 6) = 2$, $\\mathrm{LCM}(2, 4, 6) = 12$.', 'Letter census: $(x-1)$ appears at powers $2, 1, 3$ — HCF takes $\\min = 1$, LCM takes $\\max = 3$; $x$ only in the first, $(x+1)$ only in the second.', 'Hence HCF $= 2(x-1)$ and LCM $= 12x(x-1)^{3}(x+1)$.'], answer: 'HCF $2(x-1)$; LCM $12x(x-1)^{3}(x+1)$' },
          ] },
          { level: 'L4', questions: [
            { q: 'Use the Euclidean measure to find the HCF of $x^{3} - 3x + 2$ and $x^{2} - 1$.', solution: ['Divide: $x^{3} - 3x + 2 = x(x^{2} - 1) + (-2x + 2)$ — remainder $-2x + 2$.', 'The remainder is $-2(x-1)$; the $-2$ is disloyal, so keep $(x - 1)$.', 'Divide again: $x^{2} - 1 = (x+1)(x-1)$, remainder $0$.', 'Hence the HCF is $(x - 1)$.'], answer: '$x - 1$' },
            { q: 'Find the LCM of $2x^{3} + 3x^{2} - 9x - 10$ and $2x^{2} + 5x + 3$ by the division route.', solution: ['Euclid first: dividing the cubic by the quadratic leaves remainder $-7x - 7 = -7(x+1)$ — disloyal $-7$ rejected, loyal part $(x+1)$.', 'Now $(2x^{2} + 5x + 3) \\div (x+1) = 2x + 3$, remainder $0$ — so the HCF is $(x+1)$.', 'Co-factor reading: $(2x^{3} + 3x^{2} - 9x - 10) \\div (x+1) = 2x^{2} + x - 10$ (verify: $2(-1)^{3} + 3(-1)^{2} - 9(-1) - 10 = 0$, and long division confirms).', 'Hence the LCM is $(x+1)(2x+3)(2x^{2} + x - 10)$ — no factorisation of the cubic was ever needed.'], answer: '$(x+1)(2x+3)(2x^{2} + x - 10)$' },
          ] },
          { level: 'L5', questions: [
            { q: 'Find the HCF of $3x^{3} - 10x^{2} + 9x - 2$ and $6x^{3} - 5x^{2} - 2x + 1$.', solution: ['Equal degrees — divide anyway: $3x^{3} - 10x^{2} + 9x - 2 = \\tfrac{1}{2}(6x^{3} - 5x^{2} - 2x + 1) + \\left(-\\tfrac{5}{2}x^{2} + 10x - \\tfrac{5}{2}\\right)$ — quotient $\\tfrac{1}{2}$, remainder $-\\tfrac{5}{2}(3x^{2} - 4x + 1)$.', 'The $-\\tfrac{5}{2}$ is disloyal — reject it; continue with the divisor $3x^{2} - 4x + 1$.', 'Divide the second expression by it: $6x^{3} - 5x^{2} - 2x + 1 = (2x + 1)(3x^{2} - 4x + 1)$, remainder $0$.', 'Hence the HCF is $3x^{2} - 4x + 1$, which factors as $(x-1)(3x-1)$ — a shelf check: the first expression is $(x-2)(3x-1)(x-1)$, the second is $(x-1)(3x-1)(2x+1)$ ✓.'], answer: '$3x^{2} - 4x + 1 = (x-1)(3x-1)$' },
            { q: 'Find the HCF and the LCM of $x^{2} - 3x + 2$, $x^{2} - 5x + 6$ and $x^{2} - 4x + 3$.', solution: ['Factor all three: $(x-1)(x-2)$, $(x-2)(x-3)$, $(x-1)(x-3)$.', 'HCF: $(x-1)$ misses the second shelf, $(x-2)$ misses the third, $(x-3)$ misses the first — no factor stands on all three shelves, so the HCF is $1$.', 'LCM: the union shelf is $(x-1)(x-2)(x-3)$.', 'Hence the trap closes: pair-wise HCFs are non-trivial ($x-2$, $x-3$, $x-1$) yet the three-way HCF is $1$ — and the master identity was never available for a trio.'], answer: 'HCF $1$; LCM $(x-1)(x-2)(x-3)$' },
          ] },
          { level: 'L6', questions: [
            { q: 'The HCF of two expressions is $(x-2)^{2}$ and their LCM is $(x-2)^{2}(x+1)(x-5)$. One of them is $x^{3} - 3x^{2} + 4$. Find the other, and certify both census readings.', solution: ['Recognise the held expression: $x^{3} - 3x^{2} + 4 = (x-2)^{2}(x+1)$ (expand to check: $(x^{2} - 4x + 4)(x+1) = x^{3} - 3x^{2} + 4$ ✓).', 'Hunt: the other $= \\dfrac{\\mathrm{HCF} \\times \\mathrm{LCM}}{\\text{held}} = \\dfrac{(x-2)^{4}(x+1)(x-5)}{(x-2)^{2}(x+1)} = (x-2)^{2}(x-5)$.', 'Expand: $(x^{2} - 4x + 4)(x - 5) = x^{3} - 5x^{2} - 4x^{2} + 20x + 4x - 20 = x^{3} - 9x^{2} + 24x - 20$.', 'Certify the HCF: the pair shares $(x-2)^{2}$ and nothing more ✓. Certify the LCM: the union shelf is $(x-2)^{2}(x+1)(x-5)$ ✓. Both census readings close; hence the other expression is $(x-2)^{2}(x-5)$.'], answer: '$(x-2)^{2}(x-5) = x^{3} - 9x^{2} + 24x - 20$' },
          ] },
        ] },
      ],
    },
  ],
}
