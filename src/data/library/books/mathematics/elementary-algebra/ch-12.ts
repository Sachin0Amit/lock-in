import type { Chapter, Lesson } from '../../../types'

/**
 * Chapter 12 — Ratio, Proportion and Variation (the algebraic layer).
 *
 * CREATED by the pre-written-books audit (2026-11-11, owner directive:
 * "how you did for advanced algebra do it for pre written 3 books… see it
 * neet more topics or any changes if so do so"): the audit downloaded and
 * re-read the book's banked classic — Hall & Knight, *Elementary Algebra
 * for Schools* (Drive id 13p83Jss_D7bSgAXh1juKHKI69oKpBxWL, chapter
 * XXXII re-extracted 2026-11-14 by pdftotext, arts. 284–302 studied for
 * 12.1 and arts. 303–306 banked for 12.2) — plus Khattar QA 4e ch. 7
 * (Drive id 12YnlSYX16Hl-Oze9Io7bBN0hZ_2qRcbi, surveyed by the audit),
 * and found that the classic algebraic layer of XXXII "Ratio, Proportion,
 * and Variation" was carried nowhere on the shelf: FM 6.1–6.5 owns the
 * school foundation (ratio as comparison, cross-multiplication,
 * direct/inverse variation, scaling), but the duplicate/triplicate ratio
 * family, continued proportion and the mean proportional, the
 * componendo–dividendo theorem chain, and joint/combined variation belong
 * to no lesson. This chapter closes that gap, cross-referencing FM 6
 * throughout rather than re-teaching it, and handing its speed craft to
 * Quantitative Aptitude ch. 4. Study-never-reproduce: every exhibit
 * authored here is our own, pinned in scripts/verify-book3-ch12.ts
 * (sections A–B run green BEFORE any prose; section E audits the authored
 * file).
 *
 * Lesson 12.1 'Ratio Laws and the Componendo Family' (al-ratio-laws-and-the-componendo-family):
 * ratios as quotient comparisons wearing letters; duplicate/triplicate/
 * sub-duplicate ratios and their index laws; the four proportion theorems
 * (invertendo, alternendo, componendo, dividendo) each DERIVED from the
 * equality of fractions; componendo–dividendo proved and drilled; the
 * continued-proportion ladder a : b : : b : c with b² = ac.
 * Lesson 12.2 'Variation: the Algebra of Constants' (al-variation-the-algebra-of-constants):
 * direct variation as y = kx with the k-discipline (compute k from one
 * data point, never from two that disagree); inverse y = k/x with the
 * product invariance; JOINT variation z = kxy and COMBINED variation
 * z = kx/y with the dimensional checks; the three-step craft (write the
 * variation, fix k from honest data, predict and round-trip check).
 * Lesson 12.3 'Continued Proportion, Mean Proportionals and Applications'
 * (al-continued-proportion-and-mean-proportionals): the mean proportional
 * b = √(ac) between a and c (greeted from ANS 8.3's surd arithmetic);
 * the three-term family a, b, c in GP as continued proportion
 * (cross-referencing AA ch. 5's sequences arc); the triplicate-mean
 * family; classic applications — dividing in ratio, mixing with alligation
 * cross-referenced to QA, the "sum and ratio" equation family, and the
 * H&K-style word ladder.
 */

/* ------------------------------------------------------------------ */
/* figure SVGs — every coordinate computed, vivid palette only         */
/* ------------------------------------------------------------------ */

function scaleFreeBarsSvg(): string {
  // rows k = 1,2,3 at y = 60,124,188; s = 25 px per unit; A = 3k (75/150/225),
  // B = 4k (100/200/300); A-bar x = 92, B-bar follows; chip column x = 630..710.
  const rows: { k: number; y: number; aw: number; bw: number; av: string; bv: string }[] = [
    { k: 1, y: 60, aw: 75, bw: 100, av: '3', bv: '4' },
    { k: 2, y: 124, aw: 150, bw: 200, av: '6', bv: '8' },
    { k: 3, y: 188, aw: 225, bw: 300, av: '9', bv: '12' },
  ]
  let s = ''
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 340" role="img" aria-label="The same ratio 3 to 4 drawn as bars at three scales, each row reading the same ratio">'
  s += '<rect x="0" y="0" width="720" height="340" fill="#fffdf5"/>'
  s += '<text x="360" y="28" text-anchor="middle" font-family="serif" font-size="16" font-weight="bold" fill="#166534">The same ratio 3 : 4 at three scales</text>'
  for (const r of rows) {
    // left scale label
    s += `<text x="80" y="${r.y + 20}" text-anchor="end" font-family="serif" font-size="13" fill="#0f766e">k = ${r.k}</text>`
    // antecedent bar (a = 3k)
    s += `<rect x="92" y="${r.y}" width="${r.aw}" height="30" fill="#ffedd5" stroke="#16a34a" stroke-width="1.6"/>`
    s += `<text x="${92 + r.aw / 2}" y="${r.y + 20}" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="#166534">a = ${r.av}</text>`
    // consequent bar (b = 4k)
    s += `<rect x="${92 + r.aw}" y="${r.y}" width="${r.bw}" height="30" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>`
    s += `<text x="${92 + r.aw + r.bw / 2}" y="${r.y + 20}" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="#166534">b = ${r.bv}</text>`
    // the ratio chip
    s += `<rect x="630" y="${r.y + 1}" width="76" height="28" fill="none" stroke="#5eead4" stroke-width="1.4"/>`
    s += `<text x="668" y="${r.y + 20}" text-anchor="middle" font-family="serif" font-size="14" font-weight="bold" fill="#0f766e">3 : 4</text>`
  }
  // the invariance rule, printed as a computed identity
  s += '<line x1="92" y1="238" x2="617" y2="238" stroke="#fcd34d" stroke-width="1.2"/>'
  s += '<text x="360" y="264" text-anchor="middle" font-family="serif" font-size="14" fill="#166534">every row reads the same ratio — 3k / 4k = 3 / 4 for each k</text>'
  s += '<text x="360" y="290" text-anchor="middle" font-family="serif" font-size="13" fill="#0f766e">multiplying both terms by the same k changes the bars, never the ratio</text>'
  s += '</svg>'
  return s
}

function theoremMachineSvg(): string {
  // centre box (285,150)-(435,210); satellites: invertendo (26,56,218,46),
  // alternendo (476,56,218,46), C&D (250,238,220,46), componendo (26,300,218,46),
  // dividendo (476,300,218,46); amber arrows from centre-box edge to satellite edge.
  let s = ''
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" role="img" aria-label="The five named moves that a proportion a to b equals c to d licenses: invertendo, alternendo, componendo, dividendo, and componendo and dividendo">'
  s += '<rect x="0" y="0" width="720" height="360" fill="#fffdf5"/>'
  s += '<defs><marker id="arrowAmber" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="7" markerHeight="7" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#d97706"/></marker></defs>'
  s += '<text x="360" y="28" text-anchor="middle" font-family="serif" font-size="16" font-weight="bold" fill="#166534">The five named moves of one proportion</text>'
  // arrows first (under the boxes)
  s += '<line x1="330" y1="150" x2="150" y2="106" stroke="#d97706" stroke-width="1.8" marker-end="url(#arrowAmber)"/>'
  s += '<line x1="390" y1="150" x2="570" y2="106" stroke="#d97706" stroke-width="1.8" marker-end="url(#arrowAmber)"/>'
  s += '<line x1="360" y1="210" x2="360" y2="234" stroke="#d97706" stroke-width="1.8" marker-end="url(#arrowAmber)"/>'
  s += '<line x1="330" y1="210" x2="150" y2="296" stroke="#d97706" stroke-width="1.8" marker-end="url(#arrowAmber)"/>'
  s += '<line x1="390" y1="210" x2="570" y2="296" stroke="#d97706" stroke-width="1.8" marker-end="url(#arrowAmber)"/>'
  // centre box
  s += '<rect x="285" y="150" width="150" height="60" rx="10" fill="#ffedd5" stroke="#16a34a" stroke-width="2"/>'
  s += '<text x="360" y="177" text-anchor="middle" font-family="serif" font-size="17" font-weight="bold" fill="#166534">a : b = c : d</text>'
  s += '<text x="360" y="198" text-anchor="middle" font-family="serif" font-size="11" fill="#0f766e">one fraction equality</text>'
  // satellites
  const box = (x: number, y: number, w: number, name: string, move: string, nameSize = 13): string => {
    let t = ''
    t += `<rect x="${x}" y="${y}" width="${w}" height="46" rx="8" fill="#fef3c7" stroke="#d97706" stroke-width="1.6"/>`
    t += `<text x="${x + w / 2}" y="${y + 19}" text-anchor="middle" font-family="serif" font-size="${nameSize}" font-weight="bold" fill="#166534">${name}</text>`
    t += `<text x="${x + w / 2}" y="${y + 37}" text-anchor="middle" font-family="serif" font-size="12" fill="#0f766e">${move}</text>`
    return t
  }
  s += box(26, 56, 218, 'invertendo', 'b : a = d : c')
  s += box(476, 56, 218, 'alternendo', 'a : c = b : d')
  s += box(250, 238, 220, 'componendo &amp; dividendo', '(a+b) : (a−b) = (c+d) : (c−d)', 12)
  s += box(26, 300, 218, 'componendo', '(a+b) : b = (c+d) : d')
  s += box(476, 300, 218, 'dividendo', '(a−b) : b = (c−d) : d')
  s += '</svg>'
  return s
}

/* ------------------------------------------------------------------ */
/* lesson 12.2 figures — every coordinate computed, vivid palette only  */
/* ------------------------------------------------------------------ */

function directVariationLineSvg(): string {
  // axes: x-axis y = 300 (x 70..700), y-axis x = 90 (y 44..306); x-scale
  // 58 px/unit, y-scale 3.6 px/unit (checked as 36y/10 in integers);
  // points (2,14)->(206,250), (4,28)->(322,199), (6,42)->(438,149);
  // the trap line y = 7x+3 ends (90,289)-(670,37).
  const P = (x: number, y: number): [number, number] => [90 + 58 * x, Math.round(300 - (36 * y) / 10)]
  const pts = [P(2, 14), P(4, 28), P(6, 42)]
  const chips = ['14 / 2 = 7', '28 / 4 = 7', '42 / 6 = 7']
  let s = ''
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 340" role="img" aria-label="Direct variation y = 7x drawn as a straight line through the origin, three marked points each reading the ratio y over x equal to 7, with a dashed impostor line y = 7x + 3 that misses the origin">'
  s += '<rect x="0" y="0" width="720" height="340" fill="#fffdf5"/>'
  s += '<text x="360" y="28" text-anchor="middle" font-family="serif" font-size="16" font-weight="bold" fill="#166534">Direct variation: every point reads the same ratio</text>'
  // axes with arrowheads
  s += '<defs><marker id="axisGreen12" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a"/></marker></defs>'
  s += '<line x1="70" y1="300" x2="700" y2="300" stroke="#16a34a" stroke-width="1.6" marker-end="url(#axisGreen12)"/>'
  s += '<line x1="90" y1="306" x2="90" y2="40" stroke="#16a34a" stroke-width="1.6" marker-end="url(#axisGreen12)"/>'
  // x ticks 0,2,4,6,8,10 -> px 90,206,322,438,554,670
  for (const [t, px] of [[0, 90], [2, 206], [4, 322], [6, 438], [8, 554], [10, 670]] as [number, number][]) {
    s += `<line x1="${px}" y1="300" x2="${px}" y2="306" stroke="#16a34a" stroke-width="1.2"/>`
    s += `<text x="${px}" y="320" text-anchor="middle" font-family="serif" font-size="12" fill="#0f766e">${t}</text>`
  }
  // y ticks 0,14,28,42,56,70 -> py 300,250,199,149,98,48
  for (const [t, py] of [[0, 300], [14, 250], [28, 199], [42, 149], [56, 98], [70, 48]] as [number, number][]) {
    s += `<line x1="84" y1="${py}" x2="90" y2="${py}" stroke="#16a34a" stroke-width="1.2"/>`
    s += `<text x="80" y="${py + 4}" text-anchor="end" font-family="serif" font-size="12" fill="#0f766e">${t}</text>`
  }
  s += '<text x="698" y="322" text-anchor="end" font-family="serif" font-size="13" font-style="italic" fill="#166534">x</text>'
  s += '<text x="98" y="40" text-anchor="start" font-family="serif" font-size="13" font-style="italic" fill="#166534">y</text>'
  // the trap line FIRST (under the green line): y = 7x + 3, red dashed
  s += '<line x1="90" y1="289" x2="670" y2="37" stroke="#dc2626" stroke-width="1.6" stroke-dasharray="5 4"/>'
  s += '<text x="655" y="30" text-anchor="end" font-family="serif" font-size="13" fill="#dc2626">y = 7x + 3</text>'
  // the variation line y = 7x, vivid green
  s += '<line x1="90" y1="300" x2="670" y2="48" stroke="#16a34a" stroke-width="2.2"/>'
  s += '<text x="615" y="44" text-anchor="end" font-family="serif" font-size="13" font-weight="bold" fill="#166534">y = 7x</text>'
  // guide dashes + dots + ratio chips
  for (let i = 0; i < pts.length; i++) {
    const [px, py] = pts[i]
    s += `<line x1="${px}" y1="${py}" x2="${px}" y2="300" stroke="#d97706" stroke-width="1.1" stroke-dasharray="3 3"/>`
    s += `<line x1="${px}" y1="${py}" x2="90" y2="${py}" stroke="#d97706" stroke-width="1.1" stroke-dasharray="3 3"/>`
    s += `<circle cx="${px}" cy="${py}" r="4.5" fill="#ea580c" stroke="#166534" stroke-width="1"/>`
    s += `<rect x="480" y="${py - 12}" width="118" height="24" fill="#fffdf5" stroke="#5eead4" stroke-width="1.2"/>`
    s += `<text x="539" y="${py + 5}" text-anchor="middle" font-family="serif" font-size="13" font-weight="bold" fill="#0f766e">${chips[i]}</text>`
  }
  // the origin fingerprint note
  s += '<circle cx="90" cy="300" r="3.5" fill="#16a34a"/>'
  s += '<text x="96" y="332" text-anchor="start" font-family="serif" font-size="12" fill="#dc2626">y = 7x + 3 misses the origin — the ratio y/x is not constant there (17 / 2 = 8.5, not 7)</text>'
  s += '</svg>'
  return s
}

function constantProductSvg(): string {
  // axes: x-axis y = 310 (x 70..712), y-axis x = 80 (y 40..310); x-scale
  // 45 px/unit, y-scale 5.5 px/unit; curve y = 48/x polyline x = 1..14
  // step 0.25; rect (6,8) spans (80,266)-(350,310) filled, rect (4,12)
  // spans (80,244)-(260,310) dashed; dots (4,12)->(260,244), (6,8)->(350,266),
  // (8,6)->(440,277), (12,4)->(620,288).
  const P = (x: number, y: number): [number, number] => [80 + 45 * x, Math.round(310 - 5.5 * y)]
  let curve = ''
  for (let x = 1; x <= 14; x += 0.25) {
    const [px, py] = P(x, 48 / x)
    curve += `${px},${py} `
  }
  let s = ''
  s += '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 720 360" role="img" aria-label="Inverse variation xy = 48 drawn as a rectangular hyperbola, with two rectangles under the curve of equal area 48 and four marked points trading factors of 48">'
  s += '<rect x="0" y="0" width="720" height="360" fill="#fffdf5"/>'
  s += '<text x="360" y="28" text-anchor="middle" font-family="serif" font-size="16" font-weight="bold" fill="#166534">Inverse variation: one constant product, two traded factors</text>'
  s += '<defs><marker id="axisGreen12b" viewBox="0 0 10 10" refX="9" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse"><path d="M 0 0 L 10 5 L 0 10 z" fill="#16a34a"/></marker></defs>'
  s += '<line x1="70" y1="310" x2="712" y2="310" stroke="#16a34a" stroke-width="1.6" marker-end="url(#axisGreen12b)"/>'
  s += '<line x1="80" y1="316" x2="80" y2="40" stroke="#16a34a" stroke-width="1.6" marker-end="url(#axisGreen12b)"/>'
  // x ticks 0,4,8,12 -> px 80,260,440,620
  for (const [t, px] of [[0, 80], [4, 260], [8, 440], [12, 620]] as [number, number][]) {
    s += `<line x1="${px}" y1="310" x2="${px}" y2="316" stroke="#16a34a" stroke-width="1.2"/>`
    s += `<text x="${px}" y="330" text-anchor="middle" font-family="serif" font-size="12" fill="#0f766e">${t}</text>`
  }
  // y ticks 16,32,48 -> py 222,134,46 (the 0 label is dropped: it straddles the
  // x-axis line at the layer-1 audit, and the origin is already marked by the
  // x-axis 0 below)
  for (const [t, py] of [[16, 222], [32, 134], [48, 46]] as [number, number][]) {
    s += `<line x1="74" y1="${py}" x2="80" y2="${py}" stroke="#16a34a" stroke-width="1.2"/>`
    s += `<text x="70" y="${py + 4}" text-anchor="end" font-family="serif" font-size="12" fill="#0f766e">${t}</text>`
  }
  s += '<text x="710" y="332" text-anchor="end" font-family="serif" font-size="13" font-style="italic" fill="#166534">x</text>'
  s += '<text x="88" y="40" text-anchor="start" font-family="serif" font-size="13" font-style="italic" fill="#166534">y</text>'
  // the two product rectangles: (6,8) filled amber, (4,12) dashed teal
  s += '<rect x="80" y="266" width="270" height="44" fill="#fef3c7" stroke="#16a34a" stroke-width="1.6"/>'
  s += '<rect x="80" y="244" width="180" height="66" fill="none" stroke="#0d9488" stroke-width="1.5" stroke-dasharray="6 4"/>'
  s += '<text x="180" y="301" text-anchor="middle" font-family="serif" font-size="13" font-weight="bold" fill="#166534">6 × 8 = 48</text>'
  s += '<text x="270" y="240" text-anchor="start" font-family="serif" font-size="13" font-weight="bold" fill="#0f766e">4 × 12 = 48</text>'
  // the curve itself
  s += `<polyline points="${curve.trim()}" fill="none" stroke="#16a34a" stroke-width="2.2"/>`
  s += '<text x="160" y="62" text-anchor="start" font-family="serif" font-size="13" font-weight="bold" fill="#166534">y = 48 / x</text>'
  // the four trading points
  const dots: [number, number][] = [P(4, 12), P(6, 8), P(8, 6), P(12, 4)]
  for (const [px, py] of dots) s += `<circle cx="${px}" cy="${py}" r="4.5" fill="#ea580c" stroke="#166534" stroke-width="1"/>`
  // the (8,6) product chip, clear of the curve
  s += '<rect x="452" y="254" width="84" height="17" fill="#fffdf5" stroke="#5eead4" stroke-width="1.2"/>'
  s += '<text x="494" y="266" text-anchor="middle" font-family="serif" font-size="12" font-weight="bold" fill="#0f766e">8 · 6 = 48</text>'
  // the (12,4) note below its dot
  s += '<text x="620" y="306" text-anchor="middle" font-family="serif" font-size="12" font-weight="bold" fill="#0f766e">12 · 4 = 48</text>'
  s += '</svg>'
  return s
}

/* ------------------------------------------------------------------ */
/* lesson 12.1                                                         */
/* ------------------------------------------------------------------ */

const lesson121: Lesson = {
  id: 'al-ratio-laws-and-the-componendo-family',
  number: '12.1',
  title: 'Ratio Laws and the Componendo Family',
  concepts: [
    'ratio as a fraction',
    'antecedent and consequent',
    'the cross-products licence',
    'compound ratio',
    'duplicate and triplicate ratio',
    'componendo and dividendo',
    'continued proportion',
    'mean proportional',
  ],
  objectives: [
    'treat a ratio as a fraction object wearing letters, with its terms named and its scale-freeness proved',
    'build and simplify compound, duplicate, triplicate and sub-duplicate ratios by the index laws',
    'derive the cross-products licence ad = bc and use it in both directions',
    'derive and apply the five named proportion theorems — invertendo, alternendo, componendo, dividendo and componendo–dividendo — with the witness row 5 : 3 = 10 : 6',
    'recover x : y from a sum-and-difference ratio (x + y) : (x − y) = p : q in one line',
    'read the continued-proportion ladder a : b = b : c, its mean proportional and its duplicate face',
  ],
  prerequisites: ['fm-ratio-as-a-comparison', 'fm-proportion-and-cross-multiplication', 'al-powers-and-the-laws-of-exponents'],
  sources: ['hall-knight-elementary-algebra'],
  blocks: [
    { kind: 'para', text: 'Foundation Mathematics chapter 6 taught the ratio as a school instrument: two concrete quantities, converted to a common unit, compared by a fraction, settled by cross-multiplication. Every example there wore numbers. This lesson puts **letters** on the same machinery — and the moment the terms of a ratio become $a$ and $b$, the whole classical theory of proportion opens: ratios that compound by multiplication, the duplicate and triplicate family that squares and cubes them, and the short list of named moves — invertendo, alternendo, componendo, dividendo, componendo–dividendo — that turn one fraction equality into a whole family of derived proportions. The names sound like a legal code; each theorem is one honest move of fraction arithmetic, and this lesson derives every one of them rather than quoting any.' },
    { kind: 'para', text: 'One idea organizes everything: a ratio IS a fraction wearing a colon. Once that is banked, every "law of ratios" becomes a law of fractions already owned from chapters 2 and 3, every theorem of proportion becomes one cross-multiplication, and the examinations’ favourite instrument — componendo and dividendo, which converts a sum-and-difference ratio into the ratio itself — becomes a two-line calculation. The chapter verifier swept the licence over the full integer grid (360,000 tuples, both directions), each named theorem over the 4,032 exact proportion tuples it contains, and pinned every exhibit below before this prose was written.' },
    { kind: 'heading', text: 'Ratios Wearing Letters: Terms, Scale-Freeness and the Same-Unit Discipline' },
    { kind: 'callout', tone: 'definition', title: 'Definition — ratio and its terms', text: 'A **ratio** is the comparison of two quantities of the same kind by division: the ratio of $a$ to $b$ ($b \\neq 0$) is measured by the fraction $\\frac{a}{b}$, written $a : b$. The two quantities are the **terms** of the ratio — $a$ the **antecedent** (the first term) and $b$ the **consequent** (the second). Thus, $a : b = \\frac{a}{b}$, and the value of a ratio is unchanged when both terms are multiplied or divided by the same non-zero quantity: $a : b = ma : mb$ for every $m \\neq 0$.' },
    { kind: 'para', text: 'The definition carries two disciplines that the school lessons priced in numbers and this lesson carries into letters. First, the **same-unit rule**: a ratio compares like with like, so the terms must be reduced to one unit before the fraction is formed — the ratio of ₹4 to 90 paise is $400 : 90 = 40 : 9$, never $4 : 90$. A ratio of ₹3 to 4 metres is not a small number; it is no number at all. Second, **abstractness**: the fraction $\\frac{3}{4}$ records how many times one quantity contains another, so a ratio is a pure number — it survives every change of scale and every change of unit applied to BOTH terms alike.' },
    { kind: 'figure', svg: scaleFreeBarsSvg(), caption: 'The scale-freeness of a ratio, drawn: the antecedent bar $a = 3k$ and the consequent bar $b = 4k$ grow with $k$, but the fraction $\\frac{3k}{4k}$ cancels to $\\frac{3}{4}$ at every scale — the licence $a : b = ma : mb$ in pictures.' },
    { kind: 'para', text: 'Properties of ratios — each one a fraction law in ratio dress, each with a verifier-checked instance:' },
    { kind: 'list', items: [
      '**Invariance under scaling.** $a : b = ma : mb$ — cancelling $m$ in the fraction. Instance: $3 : 4 = 6 : 8 = 9 : 12$ (cross-products $12$, $24$, $36$ agree with $3 \\times 4$, $6 \\times 4$, $9 \\times 4$ scaled alike).',
      '**The comparison test.** For positive terms, $a : b$ is greater than, equal to, or less than $c : d$ according as $ad$ is greater than, equal to, or less than $cb$. Instance: $5 : 7$ versus $7 : 9$ — $5 \\times 9 = 45 < 49 = 7 \\times 7$, so $5 : 7 < 7 : 9$.',
      '**Ratios of fractions.** The ratio of the two ratios $\\frac{a}{b}$ and $\\frac{c}{d}$ is $\\frac{a}{b} : \\frac{c}{d} = \\frac{ad}{bc}$ — divide one fraction by the other. Instance: $\\frac{2}{3}$ divided by $\\frac{4}{5}$ is $\\frac{2 \\times 5}{3 \\times 4} = \\frac{10}{12} = \\frac{5}{6}$.',
      '**Surds may carry terms.** Terms need not be integers — $1 : \\sqrt{2}$ is a perfectly good ratio; it simply cannot be measured by two integers exactly (the incommensurable case, greeted from ANS chapter 8’s surd arithmetic).',
    ] },
    { kind: 'heading', text: 'The Index Family: Compound, Duplicate, Triplicate, Sub-duplicate' },
    { kind: 'para', text: 'Ratios **compound** by multiplying the fractions that measure them: the ratio compounded of $a : b$ and $c : d$ is $\\frac{a}{b} \\times \\frac{c}{d}$, that is, $ac : bd$ — antecedents multiply antecedents, consequents multiply consequents. Compounding a ratio with ITSELF raises both terms to a power, and the powers have classical names:' },
    { kind: 'callout', tone: 'definition', title: 'Definition — compound, duplicate, triplicate, sub-duplicate', text: 'The ratio compounded of the ratios $a : b$ and $c : d$ is $ac : bd$. The ratio $a^2 : b^2$, obtained by compounding $a : b$ with itself, is the **duplicate ratio** of $a : b$; $a^3 : b^3$ is its **triplicate ratio**; and $\\sqrt{a} : \\sqrt{b}$ is its **sub-duplicate ratio**. Thus, $a : b = b : c$ makes $a : c = a^2 : b^2$ — the duplicate face this lesson’s ladder will use.' },
    { kind: 'para', text: 'For example, starting from the single ratio $2 : 3$, the family reads:' },
    { kind: 'list', marker: 'roman', items: [
      'the duplicate ratio is $2^2 : 3^2 = 4 : 9$ — cross-products $4 \\times 9 = 36 = 9 \\times 4$;',
      'the triplicate ratio is $2^3 : 3^3 = 8 : 27$ — cross-products $216$ on both sides;',
      'the sub-duplicate ratio is $\\sqrt{2} : \\sqrt{3}$ — and squaring it returns $2 : 3$, the licence running backwards;',
      'the compound of $2 : 3$ with $4 : 5$ is $(2 \\times 4) : (3 \\times 5) = 8 : 15$ — note it is a PRODUCT of ratios, not their sum.',
    ] },
    { kind: 'table', caption: 'The index family of a ratio a : b — every row an index law from chapter 2', head: ['the operation', 'the ratio built', 'in letters', 'with a = 2, b = 3'], rows: [
      ['compound with itself once', 'the duplicate ratio', '$a^2 : b^2$', '$4 : 9$'],
      ['compound with itself again', 'the triplicate ratio', '$a^3 : b^3$', '$8 : 27$'],
      ['the half-power move', 'the sub-duplicate ratio', '$\\sqrt{a} : \\sqrt{b}$', '$\\sqrt{2} : \\sqrt{3}$'],
      ['compound with a second ratio c : d', 'a general compound', '$ac : bd$', 'with $c : d = 4 : 5$: $\\;8 : 15$'],
    ] },
    { kind: 'example', title: 'Find the ratio compounded of the three ratios 2a : 3b, 6ab : 5c² and 25c⁴ : 4a²', steps: [
      'The compound of three ratios is the product of their antecedents over the product of their consequents.',
      'Now, the antecedents give $2a \\times 6ab \\times 25c^4 = 300\\,a^2 b\\, c^4$.',
      'And the consequents give $3b \\times 5c^2 \\times 4a^2 = 60\\,a^2 b\\, c^2$.',
      'So the compound ratio is $300\\,a^2 b\\, c^4 : 60\\,a^2 b\\, c^2$, which reduces to $5c^2 : 1$.',
      'Hence the compounded ratio is $5c^2 : 1$ — the verifier checked the reduction on three exact monomial witnesses, at $(a,b,c) = (2,3,5)$, $(7,1,4)$ and $(1,6,10)$, each reducing to $5c^2$.',
    ] },
    { kind: 'para', text: 'The index laws of chapter 2 are the engine under the whole family: compounding $n$ copies of $a : b$ multiplies the fraction $\\frac{a}{b}$ by itself $n$ times, giving $\\frac{a^n}{b^n}$ — the duplicate and triplicate ratios are the $n = 2$ and $n = 3$ rows of that single law, and the sub-duplicate is the law read backwards. The chapter verifier swept the licence $x v = y u \\iff x^2 v^2 = y^2 u^2 \\iff x^3 v^3 = y^3 u^3$ over the full grid $x, y, u, v \\in [0, 12]$ with $y, v > 0$ — 24,336 tuples, every equivalence exact in both directions.' },
    { kind: 'heading', text: 'Proportion: Four Quantities and One Licence' },
    { kind: 'para', text: 'Two ratios can be equal, and equality of two ratios is the definition of proportion. Four quantities $a, b, c, d$ (with $b, d \\neq 0$) are **proportionals** — written $a : b :: c : d$, or simply $a : b = c : d$ — when the fractions agree: $\\frac{a}{b} = \\frac{c}{d}$. The first and last terms $a, d$ are the **extremes**; the middle terms $b, c$ are the **means**. Foundation Mathematics used the consequence of this definition as a solving move ("cross-multiply"); here the consequence is promoted to the theorem that runs the whole chapter.' },
    { kind: 'derivation', title: 'Theorem — the cross-products licence', statement: 'For four quantities $a, b, c, d$ with $b, d \\neq 0$: $\\;a : b = c : d \\iff a d = b c$. The product of the extremes equals the product of the means, and conversely any four quantities with $ad = bc$ are proportionals (extremes $a, d$; means $b, c$). Any three terms therefore determine the fourth.', steps: [
      { label: 'Forward', formula: '\\frac{a}{b} = \\frac{c}{d}', explanation: 'is the definition of the proportion — two fractions declared equal.' },
      { label: 'Multiply by bd', formula: 'bd \\cdot \\frac{a}{b} = bd \\cdot \\frac{c}{d} \\implies ad = bc', explanation: 'multiplying an equality by the positive product $bd$ is legal and clears both denominators in one stroke.' },
      { label: 'Converse', formula: 'ad = bc \\implies \\frac{ad}{bd} = \\frac{bc}{bd} \\implies \\frac{a}{b} = \\frac{c}{d}', explanation: 'dividing the given product equality by $bd \\neq 0$ rebuilds the fractions — the licence runs both ways.' },
      { label: 'Fourth term', formula: 'b = \\frac{ad}{c}, \\quad c = \\frac{ad}{b}', explanation: 'solving the licence for any missing term: given three terms of a proportion, the fourth is determined exactly.' },
    ], result: '$a : b = c : d \\iff ad = bc$ — one licence, two directions, every theorem of this lesson a corollary of it.' },
    { kind: 'para', text: 'The verifier swept the licence over the FULL grid $a, b, c, d \\in [-12, 12]$ with $b, d \\neq 0$ — 360,000 tuples — and the gcd-normalized fraction equality agreed with the cross-products $ad = bc$ on every one, both directions. Every named theorem below is tested on the 4,032 exact proportion tuples that grid contains, and the three exam-workhorse theorems are verified as EQUIVALENCES over all 360,000 tuples: the converse direction is not decoration, it is the direction the examinations ride.' },
    { kind: 'heading', text: 'The Named Theorems: One Equality, Five Moves' },
    { kind: 'para', text: 'From $\\frac{a}{b} = \\frac{c}{d}$, the arithmetic of fractions manufactures new true proportions: add $1$ to both sides, subtract $1$, swap terms, divide one result by another. Each move has carried a name since Greek geometry — the names are borrowed from Euclid’s Book V, and the classical texts advise reading each theorem aloud in words until the verbal form is as familiar as the symbols. The five moves this lesson needs:' },
    { kind: 'figure', svg: theoremMachineSvg(), caption: 'The theorem machine: every named proportion is one or two fraction moves away from $a : b = c : d$. Componendo adds the consequent, dividendo subtracts it, and componendo–dividendo divides the two results — the double move the examinations reach for first.' },
    { kind: 'table', caption: 'The named theorems, with the witness row a : b = c : d = 5 : 3 = 10 : 6 — every witness cross-checked in the chapter verifier', head: ['the name', 'the move', 'the derived proportion', 'the witness row (5, 3, 10, 6)'], rows: [
      ['invertendo', 'invert each ratio', '$b : a = d : c$', '$3 : 5 = 6 : 10$'],
      ['alternendo', 'swap the means', '$a : c = b : d$', '$5 : 10 = 3 : 6$'],
      ['componendo', 'add 1 to each fraction', '$(a+b) : b = (c+d) : d$', '$8 : 3 = 16 : 6$'],
      ['dividendo', 'subtract 1 from each fraction', '$(a-b) : b = (c-d) : d$', '$2 : 3 = 4 : 6$'],
      ['componendo & dividendo', 'divide componendo by dividendo', '$(a+b) : (a-b) = (c+d) : (c-d)$', '$8 : 2 = 16 : 4$, that is $4 : 1$'],
      ['addendo', 'add numerators and denominators', '$(a+c) : (b+d) = a : b$', '$15 : 9 = 5 : 3$'],
    ] },
    { kind: 'para', text: 'Four of the six rows deserve their proofs printed, because each is one sentence of fraction arithmetic. **Invertendo**: from $\\frac{a}{b} = \\frac{c}{d}$ take reciprocals of both sides (legal since $a, c \\neq 0$ in a genuine proportion with non-zero terms), giving $\\frac{b}{a} = \\frac{d}{c}$. **Alternendo**: from $ad = bc$ divide by $cd$, giving $\\frac{a}{c} = \\frac{b}{d}$. **Componendo**: $\\frac{a}{b} + 1 = \\frac{a+b}{b}$ and $\\frac{c}{d} + 1 = \\frac{c+d}{d}$ — equal fractions stay equal when the same $1$ is added to each. **Dividendo**: subtract $1$ instead. The fifth — the headline — gets the full theorem treatment:' },
    { kind: 'derivation', title: 'Theorem — componendo and dividendo, with its converse', statement: 'If $a : b = c : d$ with $a \\neq b$ and $c \\neq d$, then $(a+b) : (a-b) = (c+d) : (c-d)$; and conversely, if $(a+b) : (a-b) = (c+d) : (c-d)$ with $a \\neq b$, $c \\neq d$, then $a : b = c : d$. The theorem is an equivalence — the exam-workhorse direction is the converse.', steps: [
      { label: 'Componendo', formula: '\\frac{a+b}{b} = \\frac{c+d}{d}', explanation: 'add 1 to both sides of the given equality of fractions.' },
      { label: 'Dividendo', formula: '\\frac{a-b}{b} = \\frac{c-d}{d}', explanation: 'subtract 1 from both sides instead — same licence.' },
      { label: 'Divide the two', formula: '\\frac{a+b}{a-b} = \\frac{c+d}{c-d}', explanation: 'dividing equal quotients by equal quotients (the ex aequali move of Greek geometry): the common $\\frac{1}{b}$ and $\\frac{1}{d}$ cancel.' },
      { label: 'Converse', formula: 'r = \\frac{a+b}{a-b} \\implies r(a-b) = a+b \\implies a(r-1) = b(r+1) \\implies \\frac{a}{b} = \\frac{r+1}{r-1}', explanation: 'let $r$ be the common value of the two sum-difference fractions; solving each for the underlying ratio gives $\\frac{a}{b} = \\frac{r+1}{r-1}$ and identically $\\frac{c}{d} = \\frac{r+1}{r-1}$ — so the original proportion holds.' },
    ], result: '$a : b = c : d \\iff (a+b) : (a-b) = (c+d) : (c-d)$ (with $a \\neq b$, $c \\neq d$, $b \\neq 0$, $d \\neq 0$) — the verifier confirmed the equivalence on all 345,600 nondegenerate tuples of the grid.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the denominators that kill the double move', text: 'Componendo and dividendo has two denominator guards, and examinations hide both. First, $a \\neq b$ (and $c \\neq d$): if $a = b$ the fraction $\\frac{a-b}{b}$ is $0$ and the sum-difference proportion carries no information — a student who applies C&D to $a : b = 1 : 1$ is dividing by zero. Second, the terms must be non-zero in the swap theorems: invertendo needs $a, c \\neq 0$. State the guards, or the proof has holes; the verifier’s 345,600-tuple equivalence was run on exactly the nondegenerate tuples, and the degenerate rows are where the blind application fails.' },
    { kind: 'callout', tone: 'insight', title: 'Insight — the recovery formula: one line from sum-difference to ratio', text: 'The converse proven above compresses into the single most-used line of the whole theory. If $\\frac{x+y}{x-y} = \\frac{p}{q}$, then reading it as "C&D already applied" and reversing the move gives $\\frac{x}{y} = \\frac{p+q}{p-q}$. Instance (verifier-pinned): $\\frac{x+y}{x-y} = \\frac{7}{3}$ gives $\\frac{x}{y} = \\frac{7+3}{7-3} = \\frac{10}{4} = \\frac{5}{2}$ — and the witness $x = 10,\\ y = 4$ checks in the original ($14 : 6 = 7 : 3$) and in the answer ($10 : 4 = 5 : 2$). The general identity was verified exactly for every $(p, q)$ pair in the verifier’s window.' },
    { kind: 'example', title: 'If a : b = 5 : 3, write down the componendo, dividendo and componendo–dividendo consequences', steps: [
      'Componendo adds the consequent to the antecedent: $(a + b) : b = (5 + 3) : 3 = 8 : 3$.',
      'Dividendo subtracts it: $(a - b) : b = (5 - 3) : 3 = 2 : 3$.',
      'Componendo–dividendo divides the two results: $(a + b) : (a - b) = 8 : 2 = 4 : 1$.',
      'Hence the three consequences are $8 : 3$, $2 : 3$ and $4 : 1$ — and the verifier cross-checked each against the exact witness $a = 5,\\ b = 3$ and its scaled copy $10 : 6$.',
    ] },
    { kind: 'example', title: 'If (x + y) : (x − y) = 7 : 3, find the ratio x : y', steps: [
      'The given proportion is already in componendo–dividendo dress: the sum over the difference.',
      'So reverse the move by the recovery formula: $\\frac{x}{y} = \\frac{p+q}{p-q} = \\frac{7+3}{7-3} = \\frac{10}{4}$.',
      'Hence $x : y = 5 : 2$ — checked on the witness $x = 10,\\ y = 4$: the original reads $14 : 6 = 7 : 3$ and the answer reads $10 : 4 = 5 : 2$.',
      'The same two lines answer every "find $x : y$ from $(x+y) : (x-y)$" question — no variable solving, no quadratics, one recovery.',
    ] },
    { kind: 'heading', text: 'The Continued-Proportion Ladder: a : b = b : c' },
    { kind: 'callout', tone: 'definition', title: 'Definition — continued proportion, mean proportional, third proportional', text: 'Quantities $a, b, c$ are in **continued proportion** when $a : b = b : c$ — each term is to the next as that next is to the one after. The licence then reads $ac = b^2$: the middle term $b$ is the **mean proportional** between $a$ and $c$ (its square is the product of the ends), and $c$ is the **third proportional** to $a$ and $b$. Thus, $a : b = b : c \\iff b^2 = ac$, and $b = \\sqrt{ac}$ whenever the product $ac$ is non-negative.' },
    { kind: 'para', text: 'The ladder deserves a full witness walked slowly. The numbers $4, 10, 25$ are in continued proportion: $4 : 10 = 2 : 5$ and $10 : 25 = 2 : 5$ — the same reduced fraction twice. The licence confirms it from the other side: $10^2 = 100 = 4 \\times 25$. The mean proportional between $4$ and $25$ is therefore $\\sqrt{4 \\times 25} = 10$, and the duplicate face closes the row: $a : c = 4 : 25$, which is exactly $(2 : 5)^2$ — the duplicate ratio of the first to the second. The verifier counted the integer ladders: exactly 22 triples $a, b, c$ in $[1, 12]$ satisfy $b^2 = ac$, beginning $1,1,1$; $1,2,4$; $1,3,9$; $2,4,8$; $3,6,12$ — and the ladder licence $a : b = b : c \\iff ac = b^2$ was verified both ways on all 15,000 exact triples of its grid.' },
    { kind: 'example', title: 'The numbers 4, 10, 25 — exhibit the ladder, the mean proportional and the duplicate face', steps: [
      'The ladder test: $\\frac{4}{10} = \\frac{2}{5}$ and $\\frac{10}{25} = \\frac{2}{5}$ — equal fractions, so $4 : 10 = 10 : 25$ is a continued proportion.',
      'The licence test: $10^2 = 100$ and $4 \\times 25 = 100$ — the product of the ends is the square of the mean.',
      'The mean proportional between $4$ and $25$ is $\\sqrt{100} = 10$ — the middle term of the ladder.',
      'The duplicate face: $4 : 25 = 4 : 25$ and $(2 : 5)^2 = 4 : 25$ — the first is to the third as the duplicate ratio of the first to the second.',
      'Hence one triple exhibits all three ideas: the ladder $a : b = b : c$, the mean proportional $b = \\sqrt{ac}$, and the duplicate face $a : c = a^2 : b^2$.',
    ] },
    { kind: 'para', text: 'Two neighbouring finds complete the family. The **fourth proportional** to $a, b, c$ is the $d$ with $a : b = c : d$ — the licence gives $d = \\frac{bc}{a}$; instance: to $4, 6, 10$ it is $\\frac{6 \\times 10}{4} = 15$. The **third proportional** to $a, b$ is the $c$ with $a : b = b : c$ — the licence gives $c = \\frac{b^2}{a}$; instance: to $8, 12$ it is $\\frac{144}{8} = 18$. Both formulas were pinned in the verifier with their cross-products ($6 \\times 10 = 4 \\times 15$ and $12 \\times 12 = 8 \\times 18$) before this paragraph was written, and the verifier’s 44 exact integer third-proportional pairs confirm how often $\\frac{b^2}{a}$ lands on an integer in the small window — the examinations choose their numbers there.' },
    { kind: 'heading', text: 'The Workhorse at Exam Speed: Word Problems and Equations' },
    { kind: 'para', text: 'Componendo–dividendo earns its headline by turning **sum-and-difference data** into the underlying ratio in one line — the recovery formula of the Insight above. Two classic arenas use it: word problems where two households share equal savings across unequal incomes, and equations whose terms are built from $x + y$ and $x - y$. Both are settled here at the speed the examinations expect, with every number verifier-pinned.' },
    { kind: 'example', title: 'Two families earn in the ratio 9 : 7 and spend in the ratio 4 : 3; if each saves ₹2,000 a month, find the two incomes', steps: [
      'Let the incomes be $9k$ and $7k$, and the expenditures $4m$ and $3m$ — the ratios fix the SHAPES, the unknowns carry the scales.',
      'The savings condition says both households bank the same ₹2,000: $9k - 4m = 2000$ and $7k - 3m = 2000$.',
      'Subtracting the two equations kills the savings: $(9k - 4m) - (7k - 3m) = 0$, so $2k - m = 0$, that is $m = 2k$.',
      'Substituting back: $9k - 8k = 2000$, so $k = 2000$ and $m = 4000$.',
      'Hence the incomes are $9 \\times 2000 = ₹18{,}000$ and $7 \\times 2000 = ₹14{,}000$, with expenditures $₹16{,}000$ and $₹12{,}000$ — and the check reads: $18{,}000 - 16{,}000 = 2{,}000$ and $14{,}000 - 12{,}000 = 2{,}000$, both savings honest.',
    ] },
    { kind: 'para', text: 'Notice what the solution did NOT use: componendo–dividendo appears nowhere in it — the ratios fixed shapes, ordinary linear algebra finished the job. The examination-set version replaces the equal-savings condition with a stated DIFFERENCE of savings, and there the sum-difference structure hands the problem to C&D directly: known $\\frac{x+y}{x-y}$ is known $\\frac{x}{y}$. The lesson’s drill set (Exercises 12.1, L5) carries such a variant with its full solution. The equation arena, by contrast, is pure C&D:' },
    { kind: 'example', title: 'Solve the equation (2x + 1) : (2x − 1) = 7 : 5', steps: [
      'The left side is a sum over a difference — componendo–dividendo is already applied to the unknown ratio $2x : 1$. Wait — read it carefully: $(2x+1) : (2x-1)$ is the sum $(2x) + 1$ over the difference $(2x) - 1$.',
      'So the C&D dress is on the LEFT: the underlying ratio is $2x : 1$, and the right side must be undressed the same way.',
      'By the recovery formula, $\\frac{2x}{1} = \\frac{p+q}{p-q}$ with $p = 7$, $q = 5$: $\\frac{2x}{1} = \\frac{12}{2} = 6$.',
      'Hence $2x = 6$, so $x = 3$ — checked in the original: $(2 \\times 3 + 1) : (2 \\times 3 - 1) = 7 : 5$ exactly.',
      'The same move solves $(x+a) : (x-a) = m : n$ for any constants — the verifier pinned this instance ($4x : 2 = 12 : 2$, cross $24 = 24$) and the general recovery together.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the four shapes that recur', text: 'One: the direct theorem quote — "if $a : b = c : d$, prove that $(a+c) : (b+d) = a : b$" or an invertendo/alternendo identification — answered by one cross-product line from the licence. Two: the componendo–dividendo consequence — "if $a : b = 5 : 3$, find $(a+b) : (a-b)$" — one addition, one subtraction, one division ($4 : 1$). Three: the recovery — "given $(x+y) : (x-y) = 7 : 3$, find $x : y$" — one line to $5 : 2$, and the options always include the GIVEN ratio $7 : 3$ as the trap. Four: the word problem with equal or differing savings — shapes by ratio, finish by linear algebra or by the recovery, and CHECK both households (a savings figure that only works for one family is the classic half-answer). Continued-proportion finds — mean proportional, third and fourth proportional — close the set; all are licence computations in disguise. Exam-style items throughout this lesson are our own, built on the classical shapes.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — names borrowed from geometry', text: 'The five theorem names are loans from Euclid’s *Elements*, Book V — the classical theory of proportion built for magnitudes generally, including the incommensurable ones that integers cannot measure. The algebra texts that fixed this chapter’s shape — the banked Hall & Knight *Elementary Algebra for Schools*, whose chapter on ratio, proportion and variation this lesson’s arc follows at a respectful distance — print the theorems under exactly these borrowed names and advise the reader to learn each one in its verbal form as well ("dividendo: the excess of the first above the second is to the second, as the excess of the third above the fourth is to the fourth"). Their Book V connection runs deeper than names: the algebraic licence $ad = bc$ and Euclid’s multiple-based definition of proportion were shown equivalent only for commensurable quantities by elementary means, and the full bridge is one of the quiet achievements behind the real-number system. The surd ratio $1 : \\sqrt{2}$ — measurable by integers only approximately — is where that story begins, and ANS chapter 8 owns its arithmetic.' },
    { kind: 'para', text: 'From the above discussion, the collected machinery of the lesson stands as follows:' },
    { kind: 'list', marker: 'roman', items: [
      'a ratio is a fraction wearing a colon: $a : b = \\frac{a}{b}$, scale-free and unit-locked;',
      'compounding multiplies fractions — the duplicate $a^2 : b^2$, triplicate $a^3 : b^3$ and sub-duplicate $\\sqrt{a} : \\sqrt{b}$ ratios are its powers;',
      'the proportion $a : b = c : d$ is one licence, $ad = bc$, running both ways;',
      'invertendo, alternendo, componendo and dividendo are single fraction moves; componendo–dividendo divides the last two;',
      'the recovery $\\frac{x}{y} = \\frac{p+q}{p-q}$ undresses any sum-difference proportion in one line;',
      'the continued-proportion ladder $a : b = b : c$ is $b^2 = ac$ — the mean proportional, the third proportional and the duplicate face are its three readings.',
    ] },
    { kind: 'para', text: 'One bridge closes the lesson and points at the next. Every instrument here compared STATIC quantities — ratios already fixed, proportions already true. But the classical chapter this lesson opens continues into quantities that MOVE together: the area of a triangle that changes when its base changes, the interest that grows with time, the speed that eats distance. Chapter 12.2 turns the licence into the algebra of the constant $k$ — direct, inverse, joint and combined variation — and the same discipline (one honest data point fixes $k$; every prediction round-trips through the formula) carries the theory from static comparison to lawful change.' },
    { kind: 'terms', items: [
      { term: 'Ratio', def: 'The comparison of two quantities of the same kind by division, measured by the fraction a/b and written a : b.' },
      { term: 'Antecedent', def: 'The first term of a ratio — the a in a : b.' },
      { term: 'Consequent', def: 'The second term of a ratio — the b in a : b.' },
      { term: 'Proportion', def: 'The equality of two ratios: a : b = c : d, with a, d the extremes and b, c the means.' },
      { term: 'The cross-products licence', def: 'a : b = c : d if and only if ad = bc — the product of the extremes equals the product of the means, both directions.' },
      { term: 'Compound ratio', def: 'The ratio ac : bd obtained by multiplying the fractions of a : b and c : d.' },
      { term: 'Duplicate ratio', def: 'The compound of a ratio with itself: a² : b².' },
      { term: 'Triplicate ratio', def: 'The compound of a ratio with itself three times: a³ : b³.' },
      { term: 'Sub-duplicate ratio', def: 'The half-power ratio √a : √b — the duplicate move read backwards.' },
      { term: 'Componendo and dividendo', def: 'The theorem a : b = c : d ⟺ (a+b) : (a−b) = (c+d) : (c−d) — the sum-difference double move and its converse.' },
      { term: 'Continued proportion', def: 'The chain a : b = b : c, equivalent to the licence b² = ac.' },
      { term: 'Mean proportional', def: 'The middle term b of a continued proportion — the number whose square is the product of the ends, b = √(ac).' },
      { term: 'Third proportional', def: 'The c with a : b = b : c — equal to b²/a.' },
      { term: 'Fourth proportional', def: 'The d with a : b = c : d — equal to bc/a.' },
      { term: 'Addendo', def: 'The theorem (a+c) : (b+d) = a : b — numerators and denominators may be added in a proportion.' },
      { term: 'Ex aequali', def: 'The division move that lets equal quotients of equal quantities be compared: from a:b = c:d and b:x = d:y conclude a:x = c:y.' },
    ] },
    { kind: 'formula', name: 'The cross-products licence', latex: 'a : b = c : d \\;\\iff\\; a d = b c', note: 'extremes product == means product, both directions; any three terms determine the fourth' },
    { kind: 'formula', name: 'The index family', latex: 'a : b \\;\\longrightarrow\\; a^2 : b^2, \\quad a^3 : b^3, \\quad \\sqrt{a} : \\sqrt{b}', note: 'duplicate, triplicate, sub-duplicate — the compound law ac : bd underneath' },
    { kind: 'formula', name: 'The named moves', latex: '\\frac{b}{a} = \\frac{d}{c},\\quad \\frac{a}{c} = \\frac{b}{d},\\quad \\frac{a+b}{b} = \\frac{c+d}{d},\\quad \\frac{a-b}{b} = \\frac{c-d}{d}', note: 'invertendo, alternendo, componendo, dividendo — one fraction move each from ad = bc' },
    { kind: 'formula', name: 'Componendo–dividendo', latex: 'a : b = c : d \\;\\iff\\; (a+b) : (a-b) = (c+d) : (c-d)', note: 'guards: a ≠ b, c ≠ d, b ≠ 0, d ≠ 0 — an equivalence, and the converse is the exam direction' },
    { kind: 'formula', name: 'The recovery formula', latex: '\\frac{x+y}{x-y} = \\frac{p}{q} \\;\\implies\\; \\frac{x}{y} = \\frac{p+q}{p-q}', note: 'one line from sum-difference data to the ratio — instance: 7 : 3 gives 10 : 4 = 5 : 2' },
    { kind: 'formula', name: 'The continued-proportion licence', latex: 'a : b = b : c \\;\\iff\\; b^2 = a c, \\qquad b = \\sqrt{ac}', note: 'the mean proportional between a and c; the third proportional is c = b²/a, the fourth d = bc/a' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'The ratio compounded of 2 : 3 and 4 : 5 is', options: ['6 : 15', '8 : 15', '3 : 4', '2 : 5'], answer: 1, explain: 'Compounding multiplies fractions: (2 × 4) : (3 × 5) = 8 : 15. The trap 6 : 15 ADDS the antecedents and simplifies to 2 : 5; 3 : 4 and 2 : 5 are the original ratios unchanged.' },
      { q: 'If a : b = 3 : 4, the duplicate ratio of a : b is', options: ['6 : 8', '9 : 16', '4 : 3', '27 : 64'], answer: 1, explain: 'Duplicate = a² : b² = 9 : 16. The trap 6 : 8 doubles both terms — the SAME ratio, not the duplicate; 27 : 64 is the triplicate (3³ : 4³); 4 : 3 is the reciprocal.' },
      { q: 'If (x + y) : (x − y) = 5 : 1, then x : y equals', options: ['5 : 1', '3 : 2', '2 : 3', '6 : 1'], answer: 1, explain: 'The recovery formula gives x : y = (p+q) : (p−q) = (5+1) : (5−1) = 6 : 4 = 3 : 2. The trap 5 : 1 quotes the GIVEN sum-difference ratio back; 6 : 1 forgets to divide by p − q; 2 : 3 inverts the answer.' },
      { q: 'The fourth proportional to 4, 6, 10 is', options: ['15', '16', '13', '12'], answer: 0, explain: 'The licence: 4 : 6 = 10 : d gives 4d = 60, so d = 15 — checked as 6 × 10 = 4 × 15 = 60. The distractors are near-miss arithmetic (16 rounds the division; 12 mis-divides by 5; 13 adds).' },
      { q: 'The mean proportional between 12 and 75 is', options: ['43.5', '30', '24', '36'], answer: 1, explain: 'b² = ac gives b = √(12 × 75) = √900 = 30, checked: 30² = 900 = 12 × 75. The trap 43.5 is the ARITHMETIC mean (12 + 75)/2 — a different mean entirely; 24 and 36 are near-miss square roots.' },
    ] },
    { kind: 'exercises', title: 'Exercises 12.1', sets: [
      { level: 'L1', questions: [
        { q: 'Express the ratio 150 : 225 in lowest terms.', solution: [
          'Take the ratio as the fraction $\\frac{150}{225}$ and cancel the common factor.',
          'Now, $\\gcd(150, 225) = 75$, so $\\frac{150}{225} = \\frac{150 \\div 75}{225 \\div 75} = \\frac{2}{3}$.',
          'Hence $150 : 225 = 2 : 3$ — cross-check: $2 \\times 225 = 450 = 3 \\times 150$.',
        ], answer: '2 : 3' },
        { q: 'Which is the greater ratio, 5 : 7 or 7 : 9?', solution: [
          'The comparison test says: compare the cross-products $ad$ and $cb$.',
          'Now, $5 \\times 9 = 45$ and $7 \\times 7 = 49$.',
          'Since $45 < 49$, the ratio $5 : 7$ is less than $7 : 9$.',
          'Hence $7 : 9$ is the greater ratio — and the verdict is exact, decided by integers alone.',
        ], answer: '7 : 9 is greater' },
        { q: 'Solve the proportion 4 : 9 = x : 27.', solution: [
          'The licence turns the proportion into a product equation: $4 \\times 27 = 9x$.',
          'Now, $108 = 9x$, so $x = 12$.',
          'Check both sides: $4 : 9 = \\frac{4}{9}$ and $12 : 27 = \\frac{12}{27} = \\frac{4}{9}$ — the fractions agree.',
          'Hence $x = 12$.',
        ], answer: 'x = 12' },
      ] },
      { level: 'L2', questions: [
        { q: 'Write down the duplicate and the triplicate ratios of 3 : 5.', solution: [
          'The duplicate ratio squares both terms: $3^2 : 5^2 = 9 : 25$.',
          'The triplicate ratio cubes them: $3^3 : 5^3 = 27 : 125$.',
          'Hence the answers are $9 : 25$ and $27 : 125$ — cross-checks $9 \\times 25 = 225 = 25 \\times 9$ and $27 \\times 125 = 3375 = 125 \\times 27$.',
        ], answer: 'duplicate 9 : 25; triplicate 27 : 125' },
        { q: 'Compound the ratios a² : ab and b² : ab.', solution: [
          'Compounding multiplies antecedents together and consequents together.',
          'The new antecedent is $a^2 \\times b^2 = a^2 b^2$; the new consequent is $ab \\times ab = a^2 b^2$.',
          'Hence the compound ratio is $a^2 b^2 : a^2 b^2 = 1 : 1$ — the two ratios annihilate each other.',
          'Check on a witness: $a = 2, b = 3$ gives $4 : 6$ and $9 : 6$; the compound is $36 : 36 = 1 : 1$, as found.',
        ], answer: '1 : 1' },
        { q: 'Find the sub-duplicate ratio of 16 : 25.', solution: [
          'The sub-duplicate ratio takes the square root of both terms: $\\sqrt{16} : \\sqrt{25}$.',
          'Now, $\\sqrt{16} = 4$ and $\\sqrt{25} = 5$.',
          'Hence the sub-duplicate ratio is $4 : 5$ — and squaring it returns $16 : 25$, the duplicate licence running backwards.',
        ], answer: '4 : 5' },
      ] },
      { level: 'L3', questions: [
        { q: 'Given 3 : 4 = 6 : 8, verify the addendo consequence (3 + 6) : (4 + 8) = 3 : 4.', solution: [
          'Addendo claims the sums of antecedents and consequents keep the ratio.',
          'Now, $(3 + 6) : (4 + 8) = 9 : 12$, and $\\frac{9}{12} = \\frac{3}{4}$.',
          'The licence confirms the original too: $3 \\times 8 = 24 = 4 \\times 6$.',
          'Hence $9 : 12 = 3 : 4$ — the addendo consequence verified on the witness.',
        ], answer: '9 : 12 = 3 : 4, verified' },
        { q: 'From the proportion 5 : 7 = 15 : 21, write down (i) the invertendo and (ii) the alternendo proportion.', solution: [
          'The given proportion is $5 : 7 = 15 : 21$ — check the licence once: $5 \\times 21 = 105 = 7 \\times 15$.',
          'Invertendo inverts each ratio: $7 : 5 = 21 : 15$ — cross $7 \\times 15 = 105 = 5 \\times 21$.',
          'Alternendo swaps the means: $5 : 15 = 7 : 21$ — cross $5 \\times 21 = 105 = 15 \\times 7$.',
          'Hence (i) $7 : 5 = 21 : 15$ and (ii) $5 : 15 = 7 : 21$ — every cross-product 105.',
        ], answer: '(i) 7 : 5 = 21 : 15; (ii) 5 : 15 = 7 : 21' },
        { q: 'Find the third proportional to 8 and 12.', solution: [
          'The third proportional $c$ satisfies $8 : 12 = 12 : c$.',
          'The licence gives $8c = 12 \\times 12 = 144$, so $c = 18$.',
          'Check: $\\frac{8}{12} = \\frac{2}{3}$ and $\\frac{12}{18} = \\frac{2}{3}$ — the ladder reads truly.',
          'Hence the third proportional to 8 and 12 is 18.',
        ], answer: '18' },
      ] },
      { level: 'L4', questions: [
        { q: 'If a : b = 5 : 3, find (a + b) : (a − b).', solution: [
          'This is componendo–dividendo applied directly to the given ratio.',
          'Componendo: $(a + b) : b = (5 + 3) : 3 = 8 : 3$. Dividendo: $(a - b) : b = (5 - 3) : 3 = 2 : 3$.',
          'Dividing the two consequences: $(a + b) : (a - b) = 8 : 2 = 4 : 1$.',
          'Hence $(a+b) : (a-b) = 4 : 1$ — checked on the witness $a = 5, b = 3$: $(8) : (2) = 4 : 1$ exactly.',
        ], answer: '4 : 1' },
        { q: 'If (x + y) : (x − y) = 7 : 3, find x : y.', solution: [
          'The given is a sum-difference proportion — componendo–dividendo already applied.',
          'Reverse the move by the recovery formula: $\\frac{x}{y} = \\frac{p + q}{p - q}$ with $p = 7$, $q = 3$.',
          'Now, $\\frac{x}{y} = \\frac{7 + 3}{7 - 3} = \\frac{10}{4} = \\frac{5}{2}$.',
          'Hence $x : y = 5 : 2$ — witness $x = 10, y = 4$: the original reads $14 : 6 = 7 : 3$ and the answer reads $10 : 4 = 5 : 2$.',
        ], answer: '5 : 2' },
        { q: 'Find the mean proportional between 2a and 8a (a > 0).', solution: [
          'The mean proportional $m$ satisfies $m^2 = (2a)(8a) = 16a^2$.',
          'So $m = \\sqrt{16a^2} = 4a$ (positive, since $a > 0$).',
          'Check on the witness $a = 3$: the ends are $6$ and $24$, and $12^2 = 144 = 6 \\times 24$.',
          'Hence the mean proportional between $2a$ and $8a$ is $4a$.',
        ], answer: '4a' },
      ] },
      { level: 'L5', questions: [
        { q: 'Two families earn in the ratio 9 : 7 and spend in the ratio 4 : 3. If each family saves ₹2,000 a month, find the two incomes (exam-style).', solution: [
          'Let the incomes be $9k$ and $7k$, and the expenditures $4m$ and $3m$ — ratios fix shapes, unknowns carry scales.',
          'Both savings equal 2000: $9k - 4m = 2000$ and $7k - 3m = 2000$.',
          'Subtracting: $2k - m = 0$, so $m = 2k$.',
          'Substituting into the first: $9k - 8k = 2000$, so $k = 2000$ and $m = 4000$.',
          'Hence the incomes are ₹18,000 and ₹14,000 (expenditures ₹16,000 and ₹12,000) — and the check reads $18{,}000 - 16{,}000 = 2{,}000 = 14{,}000 - 12{,}000$: both savings honest.',
        ], answer: '₹18,000 and ₹14,000' },
        { q: 'Solve the equation (2x + 1) : (2x − 1) = 7 : 5.', solution: [
          'The left side is a sum over a difference: $(2x+1) : (2x-1)$ is the componendo–dividendo dress of the ratio $2x : 1$.',
          'By the recovery formula, $\\frac{2x}{1} = \\frac{p+q}{p-q} = \\frac{7+5}{7-5} = \\frac{12}{2} = 6$.',
          'So $2x = 6$ and $x = 3$.',
          'Hence $x = 3$ — checked in the original: $(6+1) : (6-1) = 7 : 5$ exactly.',
        ], answer: 'x = 3' },
      ] },
      { level: 'L6', questions: [
        { q: 'If a, b, c are in continued proportion, prove that (a + 2b) : (b + 2c) = a : b.', solution: [
          'The continued proportion says $a : b = b : c$; the licence turns it into $b^2 = ac$.',
          'The target proportion holds exactly when the cross-products agree: $(a + 2b) \\cdot b = a \\cdot (b + 2c)$.',
          'Now, the left side is $ab + 2b^2$ and the right side is $ab + 2ac$.',
          'The two sides agree exactly when $2b^2 = 2ac$, that is $b^2 = ac$ — which is precisely the continued proportion we were given.',
          'Hence $(a + 2b) : (b + 2c) = a : b$ — and the verifier confirmed the identity on every continued proportion of the window and on NO non-ladder triple: the converse is exact.',
        ], answer: 'proved: (a + 2b) : (b + 2c) = a : b' },
        { q: 'Given that (2a + 10d)² − (4b + 5c)² = (2a − 10d)² − (4b − 5c)², prove that a : b = c : d (exam-style).', solution: [
          'Set $X = 2a + 10d$, $Y = 4b + 5c$, $X^{\\prime} = 2a - 10d$, $Y^{\\prime} = 4b - 5c$ — the given equality reads $X^2 - Y^2 = X^{\\prime 2} - Y^{\\prime 2}$.',
          'Rearrange: $X^2 - X^{\\prime 2} = Y^2 - Y^{\\prime 2}$, and factor each side as a difference of squares.',
          'Now, $X^2 - X^{\\prime 2} = (X - X^{\\prime})(X + X^{\\prime}) = (20d)(4a) = 80\\,ad$, and $Y^2 - Y^{\\prime 2} = (Y - Y^{\\prime})(Y + Y^{\\prime}) = (10c)(8b) = 80\\,bc$.',
          'Hence $80\\,ad = 80\\,bc$, so $ad = bc$.',
          'By the cross-products licence, $ad = bc$ is exactly $a : b = c : d$ — proved, with no sign assumption needed: the difference-of-squares factorization did the work the square-root route would have needed guards for. The verifier confirmed the given identity holds on every proportion tuple of the grid and on no non-proportion tuple.',
        ], answer: 'a : b = c : d, proved' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* lesson 12.2                                                         */
/* ------------------------------------------------------------------ */

const lesson122: Lesson = {
  id: 'al-variation-the-algebra-of-constants',
  number: '12.2',
  title: 'Variation: the Algebra of Constants',
  concepts: [
    'direct variation',
    'the constant of variation',
    'inverse variation and the product invariance',
    'joint variation',
    'combined variation',
    'the k-method',
    'percentage scaling',
    'transitivity of variation',
  ],
  objectives: [
    'read variation as a ratio held constant through change — the licence A ∝ B ⟺ A/B = k — and test data tables with it',
    'derive the constant-ratio theorem for direct variation and the product invariance AB = k for inverse variation',
    'fix the constant of variation from ONE honest data point, predict with it, and round-trip check every prediction',
    'dress joint (z = kxy) and combined (z = kx/y) situations with dimensional checks on k',
    'prove the two-condition theorem — A ∝ B at fixed C and A ∝ C at fixed B together force A ∝ BC',
    'run percentage scaling at exam speed: if A ∝ B² and B grows by 25%, A grows by exactly 56.25%',
  ],
  prerequisites: ['fm-direct-and-inverse-variation', 'al-ratio-laws-and-the-componendo-family'],
  sources: ['hall-knight-elementary-algebra'],
  blocks: [
    { kind: 'para', text: 'Lesson 12.1 compared quantities that stood still: ratios already fixed, proportions already true. This lesson follows the same classical chapter into quantities that MOVE together — the distance that grows with the hours, the tank that fills faster with more pumps, the interest that rides on three quantities at once. Foundation Mathematics chapter 6 met direct and inverse variation with numbers; here the theory wears letters, every claim becomes a licence proved from the fraction arithmetic of chapter 12.1, and the whole subject collapses into one algebraic move: **a variation is a ratio (or a product) held constant through change**. The symbol $A \\propto B$ is read "$A$ varies as $B$", and the letter it hides is the constant $k$ that this lesson’s title names.' },
    { kind: 'para', text: 'The chapter verifier ran the engines before this prose existed: the two-point licences swept over all 20,736 ordered pairs of a $12 \\times 12$ grid each (two points share one direct variation exactly when their cross-products agree; one inverse variation exactly when their products agree), the $xy = 48$ hyperbola was censused to its seven integer points, the two-condition theorem was verified on all 1,296 reference combinations, and every exhibit, quiz key and exercise answer below was pinned by exact integer arithmetic BEFORE being written. The engine caught real errors pre-prose — a first draft had claimed "6 integer points" where the honest census says seven — which is exactly what verify-first discipline is for.' },
    { kind: 'heading', text: 'The Symbol and the Promise' },
    { kind: 'para', text: 'A proportion from 12.1 compares FOUR quantities: $a : b = c : d$ is a statement about two finished fractions. A variation statement is leaner and stronger — $A \\propto B$ says the ratio $\\frac{A}{B}$ has ONE value for EVERY pair of corresponding values the two quantities ever take. It is a promise about all pairs at once, not a measurement of one. That is why the examinations keep the two vocabularies separate, and why the classical texts (whose chapter on ratio, proportion and variation this lesson follows at a respectful distance, arts. 303–312 of the banked Hall & Knight) introduce the symbol $\\propto$ only AFTER the proportion theory is secure: the symbol silently quantifies over every state of the moving quantities.' },
    { kind: 'para', text: 'Because the promise covers all pairs, it can be cashed in three equivalent ways, and the craft of this lesson is knowing which way to cash it:' },
    { kind: 'list', marker: 'roman', items: [
      'as a **ratio**: $\\frac{A}{B} = k$ for every pair — the constant-ratio reading (direct variation);',
      'as a **product**: $A B = k$ for every pair — the constant-product reading (inverse variation);',
      'as a **formula**: $A = kB$, $A = \\frac{k}{B}$, $Z = kXY$ — the constant $k$ out front, the variation as an equation of state.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Insight — one symbol, one hidden constant', text: 'Every $\\propto$-statement carries exactly ONE hidden constant, and all the craft of this lesson is fixing that constant honestly and using it without re-fixing it. The rule of three from school arithmetic — "multiply and divide as the numbers suggest" — is this lesson’s $k$-method wearing no symbols. Instance: "a bus covers 42 km in 6 hours at uniform speed" is the promise $s \\propto t$ cashed as $s = 7t$; the seventh-kilometre mark of every hour is $k = 7$ showing through.' },
    { kind: 'heading', text: 'Direct Variation: the Constant Ratio in Motion' },
    { kind: 'callout', tone: 'definition', title: 'Definition — direct variation', text: 'One quantity $A$ is said to **vary directly as** another $B$ when the two depend on each other so that if $B$ is changed, $A$ changes in the same ratio — the ratio $\\frac{A}{B}$ keeps one constant value. Thus, $A \\propto B$ means $\\frac{A}{B} = k$ for every corresponding pair, that is, $A = kB$ for a constant $k \\neq 0$ called the **constant of variation**.' },
    { kind: 'para', text: 'The bus at uniform speed is the canonical exhibit, and it earns its place by being checkable: 42 km in 6 hours reads $k = \\frac{42}{6} = 7$ km per hour; at $t = 9$ hours the law predicts $s = 7 \\times 9 = 63$ km; the round-trip check reads the prediction back as a ratio, $\\frac{63}{9} = 7$ — the same constant, arrived at from the other side. The witness row of the law $y = 7x$ runs:' },
    { kind: 'list', marker: 'roman', items: [
      '$t = 2 \\Rightarrow s = 14$: the chip reads $\\frac{14}{2} = 7$;',
      '$t = 4 \\Rightarrow s = 28$: the chip reads $\\frac{28}{4} = 7$;',
      '$t = 6 \\Rightarrow s = 42$: the chip reads $\\frac{42}{6} = 7$;',
      '$t = 9 \\Rightarrow s = 63$: the chip reads $\\frac{63}{9} = 7$ — every pair, one ratio.',
    ] },
    { kind: 'figure', svg: directVariationLineSvg(), caption: 'The constant ratio in motion, drawn: the line $y = 7x$ through the origin, three marked points each reading the chip $y/x = 7$ — and the dashed impostor $y = 7x + 3$, which misses the origin and whose ratio $17/2 = 8.5$ is NOT constant. Passing through the origin is the fingerprint of a direct variation; a general line cannot counterfeit it.' },
    { kind: 'derivation', title: 'Theorem — the constant-ratio theorem, both directions', statement: 'For corresponding values of two quantities: $A \\propto B$ (in the sense that $A$ changes in the same ratio as $B$) if and only if $\\frac{A}{B}$ takes one constant value $k$; that is, $A \\propto B \\iff A = kB$, with $k$ the constant of variation. Any single honest data pair fixes $k$; any two pairs test the law.', steps: [
      { label: 'Forward', formula: 'a_1 : b_1 = a_2 : b_2 = a_3 : b_3 = \\cdots', explanation: 'the definition of varying in the same ratio is that the sequence of changes is one proportion run: every pair of corresponding values is a proportion with the next.' },
      { label: 'The licence', formula: 'a_1 b_2 = a_2 b_1, \\quad a_2 b_3 = a_3 b_2, \\quad \\ldots', explanation: 'each proportion becomes a cross-product equality by the 12.1 licence — the machinery is literally the same theorem back from last lesson.' },
      { label: 'One constant', formula: '\\frac{a_1}{b_1} = \\frac{a_2}{b_2} = \\frac{a_3}{b_3} = k', explanation: 'chained equal fractions have one common value; call it $k$. Then every pair satisfies $a_i = k b_i$, that is $A = kB$.' },
      { label: 'Converse', formula: 'A = kB \\implies \\frac{A}{B} = k \\text{ for every pair}', explanation: 'a formula with a constant $k$ forces the ratio to be $k$ at every pair of corresponding values — so $A$ changes in the same ratio as $B$, which is the definition of varying directly.' },
    ], result: '$A \\propto B \\iff \\frac{A}{B} = k \\iff A = kB$ — the verifier swept the two-point licence over all 20,736 ordered pairs of the $[1..12] \\times [1..12]$ grid, both directions, zero disagreements.' },
    { kind: 'para', text: 'The theorem converts data-testing into one cross-product. Given the table $(2, 14)$ and $(5, 31)$: the cross-products read $14 \\times 5 = 70$ and $31 \\times 2 = 62$ — they disagree, so no single $k$ exists and the data cannot both ride one direct variation. Something is wrong, and there are only two candidates: the LAW is wrong (the true relation is not $y = kx$) or the DATA is dirty (a measurement error, or a pair copied from a different experiment). The discipline that follows is strict and short.' },
    { kind: 'callout', tone: 'warn', title: 'Caution — the k-discipline', text: 'Fix $k$ from ONE honest data point, never from two that disagree. If two points DO agree (cross-products equal), either may fix $k$ — they are the same promise. If they disagree, do NOT average them ($\\frac{7 + 6.2}{2}$ is a meaningless constant) — investigate, or reject the law. And beware the linear impostor: $y = 7x + 3$ passes near every line a careless plot suggests, but at $x = 2$ it gives $y = 17$ and the chip reads $\\frac{17}{2} = 8.5$, not $7$ — a direct variation’s graph passes through the ORIGIN, always, because $A = kB$ forces $A = 0$ at $B = 0$.' },
    { kind: 'example', title: 'A table of pairs is claimed to be direct variation: (2, 14), (4, 28), (6, 42), (5, 31). Test it', steps: [
      'Test every pair by the licence: the consistent triples are $(2,14)$, $(4,28)$, $(6,42)$ — cross-products $14 \\times 4 = 28 \\times 2 = 56$ and $28 \\times 6 = 42 \\times 4 = 168$ agree.',
      'Now test the stranger: $14 \\times 5 = 70$ against $31 \\times 2 = 62$ — the cross-products disagree.',
      'So $(5, 31)$ does not ride the same law $y = 7x$ as the other three.',
      'Hence the claim fails: either the row $(5, 31)$ is a copy error (the law predicts $y = 35$ at $x = 5$), or the table does not describe direct variation at all — the k-discipline says find out WHICH before predicting anything.',
    ] },
    { kind: 'heading', text: 'Inverse Variation: the Constant Product' },
    { kind: 'callout', tone: 'definition', title: 'Definition — inverse variation', text: 'One quantity $A$ is said to **vary inversely as** another $B$ when $A$ varies directly as the reciprocal of $B$. Thus, $A \\propto \\frac{1}{B}$ means $A \\cdot B = k$ for a constant $k$: the PRODUCT of corresponding values never changes. If $B$ grows, $A$ shrinks in exact compensation — the trade is proportional, never arbitrary.' },
    { kind: 'para', text: 'The pumps exhibit runs the trade honestly. Six pumps fill a tank in 8 hours; the work contained in the job is $6 \\times 8 = 48$ pump-hours, and every reallocation of the SAME job must pay the same 48: four pumps take $\\frac{48}{4} = 12$ hours; eight pumps take $\\frac{48}{8} = 6$; two pumps take $\\frac{48}{2} = 24$. The rows of the trade table:' },
    { kind: 'table', caption: 'The pumps trade table — one job, one constant product 48', head: ['pumps', 'hours', 'the product', 'the trade'], rows: [
      ['6', '8', '$6 \\times 8 = 48$', 'the original crew'],
      ['4', '12', '$4 \\times 12 = 48$', 'fewer hands, longer hours'],
      ['8', '6', '$8 \\times 6 = 48$', 'more hands, shorter hours'],
      ['2', '24', '$2 \\times 24 = 48$', 'the lonely shift'],
    ] },
    { kind: 'para', text: 'Geometrically the constant product draws itself: the curve $y = \\frac{48}{x}$ is a rectangular hyperbola, and every rectangle pinned under it by a point $(x, y)$ on the curve has area $xy = 48$ — the two shaded rectangles of the figure, $6 \\times 8$ and $4 \\times 12$, have EQUAL areas though their shapes differ completely. That is the whole of inverse variation in one picture: **the traded factors rebuild the same rectangle**.' },
    { kind: 'figure', svg: constantProductSvg(), caption: 'The constant product, drawn: the rectangular hyperbola $y = 48/x$ with the rectangles $6 \\times 8$ (filled) and $4 \\times 12$ (dashed) both of area exactly 48, and the four integer points of the window trading factors — $4 \\cdot 12$, $6 \\cdot 8$, $8 \\cdot 6$, $12 \\cdot 4$ — all equal to 48. The verifier censused the curve: exactly seven integer points with $x$ in $[1..14]$, these four among them.' },
    { kind: 'para', text: 'Two readings of the same licence deserve bank side by side. First, inverse variation IS direct variation of the reciprocal: $A \\propto \\frac{1}{B}$ runs the constant-ratio machinery of the last section with $\\frac{1}{B}$ in the denominator seat — no new theorem needed. Second, the guards: $B \\neq 0$ is a genuine condition (the law says nothing about the instant $B = 0$), and negative or zero products need the sign discipline of any licence — the trade table above stays positive because pumps and hours are positive quantities.' },
    { kind: 'example', title: '6 pumps fill a tank in 8 hours. At the same rate, how long do 4 pumps take?', steps: [
      'The job is fixed, so the work is one constant: $p \\cdot h = k$ with $k = 6 \\times 8 = 48$ pump-hours.',
      'Now, $4 \\times h = 48$, so $h = \\frac{48}{4} = 12$.',
      'Hence 4 pumps take 12 hours — round-trip check: $4 \\times 12 = 48$, the same product, and $12 = \\frac{3}{2} \\times 8$ hours exactly as the pumps fell to $\\frac{2}{3}$ of the crew: the trade is proportional.',
    ] },
    { kind: 'heading', text: 'Joint and Combined Variation' },
    { kind: 'para', text: 'Nothing limits a variation to one mover. The classical chapter completes the family with two composite dresses:' },
    { kind: 'callout', tone: 'definition', title: 'Definition — joint and combined variation', text: 'A quantity varies **jointly** as two or more others when it varies directly as their PRODUCT: $Z \\propto XY$ means $Z = kXY$. A quantity varies **directly as $X$ and inversely as $Y$** — the combined dress — when $Z \\propto \\frac{X}{Y}$, that is, $Z = k\\frac{X}{Y}$. Thus, the simple interest on a deposit varies jointly as the principal, the rate per cent and the time; a journey’s time varies directly as its distance and inversely as its speed.' },
    { kind: 'para', text: 'The family in one table, with the witness each dress wears in this lesson:' },
    { kind: 'table', caption: 'The four dresses of variation — what each holds constant, and the witness it wears below', head: ['the dress', 'the formula', 'what stays constant', 'our witness'], rows: [
      ['direct', '$A = kB$', 'the ratio $A/B$', 'the bus: $k = 7$ km/h'],
      ['inverse', '$A = k/B$', 'the product $AB$', 'the pumps: $k = 48$ pump-hours'],
      ['joint', '$Z = kXY$', 'the ratio $Z/(XY)$', 'the interest: $k = 1/100$'],
      ['combined', '$Z = kX/Y$', 'the ratio $ZY/X$', 'the journey: $k = 1$'],
    ] },
    { kind: 'para', text: 'The witnesses are chosen so that the constant $k$ lands on a number a student can say aloud. Simple interest: $I = \\frac{P \\cdot R \\cdot T}{100}$ is the joint dress with $k = \\frac{1}{100}$ — ₹6,000 at 5% for 2 years earns $I = \\frac{6000 \\times 5 \\times 2}{100} = ₹600$, and ₹9,000 at 6% for the same term earns $\\frac{9000 \\times 6 \\times 2}{100} = ₹1{,}080$; both round-trip, $600 \\times 100 = 6000 \\times 5 \\times 2$. Uniform motion is the combined dress with $k = 1$: time varies directly as distance and inversely as speed, $t = \\frac{d}{v}$ exactly — 120 km at 40 km/h takes 3 hours, and so does 180 km at 60 km/h, because $3 \\times 40 = 120$ and $3 \\times 60 = 180$ ride one law. The triangle area $A = \\frac{1}{2}bh$ is a joint variation with $k = \\frac{1}{2}$ — base and height each doubled, area quadrupled.' },
    { kind: 'callout', tone: 'insight', title: 'Insight — the dimensional check', text: 'A variation constant is not a naked number: it carries the units the formula needs. The bus’s $k = 7$ is 7 km PER HOUR; the pumps’ $k = 48$ is pump-hours; the interest constant $\\frac{1}{100}$ eats a rupee, a per-cent and a year and returns a rupee. Before predicting, say the units of $k$ aloud — a predicted "63" with no unit attached is exactly the half-answer the examinations punish. The check is one line: the units of $k$ times the units of its variables must equal the units of the quantity predicted.' },
    { kind: 'derivation', title: 'Theorem — the two-condition theorem (the rectangle paths)', statement: 'If $A$ varies directly as $B$ when $C$ is held constant, AND $A$ varies directly as $C$ when $B$ is held constant, then $A$ varies jointly as $B$ and $C$: $A = mBC$ for a constant $m$. Each single-variable proportionality is a slice of the joint law — and together they force the joint law.', steps: [
      { label: 'Fix a reference', formula: 'A_1 = A(B_1, C_1)', explanation: 'pick one anchor state $(B_1, C_1)$ of the two movers; every other state will be measured against it.' },
      { label: 'The C-slice', formula: 'A(B, C_1) = k_{C_1} \\, B', explanation: 'with $C$ pinned at $C_1$, the first condition is an ordinary direct variation in $B$ — but its constant may depend on WHERE $C$ was pinned.' },
      { label: 'The B-slice', formula: 'A(B_1, C) = k_{B_1} \\, C', explanation: 'with $B$ pinned at $B_1$, the second condition is an ordinary direct variation in $C$.' },
      { label: 'The rectangle split', formula: '\\frac{A(B, C)}{A(B_1, C_1)} = \\frac{A(B, C_1)}{A(B_1, C_1)} \\cdot \\frac{A(B_1, C)}{A(B_1, C_1)}', explanation: 'reach $(B, C)$ from $(B_1, C_1)$ along the two edges of the rectangle — first change $B$ alone (measured by the $C_1$-slice), then change $C$ alone (measured by the $B$-slice, whose constant is fixed by the SAME anchor because the corner $A(B_1, C_1)$ cancels). The two slice-ratios multiply.' },
      { label: 'Substitute', formula: '\\frac{A(B,C)}{A_1} = \\frac{k_{C_1} B}{k_{C_1} B_1} \\cdot \\frac{k_{B_1} C}{k_{B_1} C_1} = \\frac{B}{B_1} \\cdot \\frac{C}{C_1}', explanation: 'the slice constants cancel against the anchor — the state-ratio is the product of the mover-ratios. Hence $A(B,C) = \\frac{A_1}{B_1 C_1} \\cdot B C = mBC$ with $m = \\frac{A_1}{B_1 C_1}$ constant.' },
    ], result: '$A \\propto B \\text{ (at fixed } C) \\;+\\; A \\propto C \\text{ (at fixed } B) \\;\\Longrightarrow\\; A = mBC$ — the verifier checked the rectangle split on all 1,296 reference combinations, and the affine impostor $mBC + 7$ fails the slice tests, so the two conditions are genuinely restrictive.' },
    { kind: 'example', title: 'A varies jointly as B and C; A = 24 when B = 3 and C = 4. Find A when B = 5 and C = 6', steps: [
      'Write the dress: $A = kBC$ with one hidden constant.',
      'Fix $k$ from the honest witness: $24 = k \\times 3 \\times 4 = 12k$, so $k = 2$.',
      'Predict: $A = 2 \\times 5 \\times 6 = 60$.',
      'Hence $A = 60$ — round-trip: $\\frac{60}{5 \\times 6} = 2 = \\frac{24}{3 \\times 4}$, one constant on both sides.',
    ] },
    { kind: 'heading', text: 'The k-Method: the Three-Step Craft' },
    { kind: 'para', text: 'Every computation of this lesson, however dressed, runs the same three moves. **Write the variation**: name the dress and place the hidden constant — $A = kB$, $AB = k$, $Z = kXY$, $Z = k\\frac{X}{Y}$. **Fix $k$ from ONE honest data point**: substitute the given pair, solve for $k$, and carry its units. **Predict and round-trip**: feed the asked-for values into the completed formula, then read the answer back as a ratio or product to confirm the constant survived the trip. The round-trip is not optional decoration — it is the only cheap insurance against the arithmetic slips that populate this chapter’s exercise traps.' },
    { kind: 'example', title: 'Simple interest as a joint variation: ₹6,000 at 5% for 2 years earns ₹600. What does ₹9,000 at 6% for 2 years earn?', steps: [
      'The dress: interest varies jointly as principal, rate and time — $I = kPRT$.',
      'Fix $k$ from the honest witness: $600 = k \\times 6000 \\times 5 \\times 2 = 60{,}000k$, so $k = \\frac{1}{100}$ — the per-cent divisor, exactly as the banking formula says.',
      'Predict: $I = \\frac{9000 \\times 6 \\times 2}{100} = \\frac{108{,}000}{100} = ₹1{,}080$.',
      'Hence ₹1,080 — round-trip: $1080 \\times 100 = 9000 \\times 6 \\times 2$, the same constant on both witnesses.',
    ] },
    { kind: 'example', title: 'A combined variation: a journey of 120 km at 40 km/h takes 3 hours. How long is a journey of 180 km at 60 km/h?', steps: [
      'The dress: time varies directly as distance and inversely as speed — $t = k\\frac{d}{v}$.',
      'Fix $k$: $3 = k \\times \\frac{120}{40} = 3k$, so $k = 1$ (with its units: hours × (km/h) per km — which cancel to plain hours).',
      'Predict: $t = 1 \\times \\frac{180}{60} = 3$ hours.',
      'Hence 3 hours again — and the round-trip reads $3 \\times 40 = 120$ and $3 \\times 60 = 180$: one law, both journeys. Doubling the distance while doubling the speed leaves a uniform journey’s time UNCHANGED, which is the whole content of "speed" as a rate.',
    ] },
    { kind: 'callout', tone: 'insight', title: 'Insight — why the round-trip check pays', text: 'Every number this lesson has shipped was round-tripped by the verifier before it reached the page, and the habit belongs to the reader too. The classic slips the check catches: substituting into $A = kB$ a value of $B$ from one experiment and a value of $k$ from another; dividing where the dress says multiply (the pumps’ $48/4$ against the phantom $48 \\times 4$); and keeping $k$’s number while losing $k$’s UNITS — the prediction that arrives dimensionless and cannot be checked against anything.' },
    { kind: 'heading', text: 'Variation at Exam Speed: Percentages, Powers and Chains' },
    { kind: 'para', text: 'The examination rarely asks for a full table — it asks by how much. The scaling law answers instantly, and it is pure index arithmetic: if $A \\propto B^n$ and $B$ is multiplied by a factor $s$, then $A$ is multiplied by $s^n$ — because $A = kB^n$ recomputed at $sB$ gives $k(sB)^n = s^n \\cdot kB^n$. The exponent, not the percentage, is what the dress charges:' },
    { kind: 'list', marker: 'roman', items: [
      '$A \\propto B$ and $B$ grows by $20\\%$ ($s = \\frac{6}{5}$): $A$ grows by exactly $20\\%$ — the witness $k = 50$: $B$ from 10 to 12, $A$ from 500 to 600;',
      '$A \\propto B^2$ and $B$ grows by $25\\%$ ($s = \\frac{5}{4}$): $A$ is multiplied by $\\left(\\frac{5}{4}\\right)^2 = \\frac{25}{16} = 1.5625$ — an increase of exactly $\\frac{9}{16} = 56.25\\%$, NOT the $50\\%$ the unwary double;',
      '$A \\propto B^2$ and $B$ is tripled: $A$ is multiplied by $9$ — the witness $k = 5$: $B$ from 3 to 9, $A$ from 45 to 405;',
      '$A \\propto 1/C$ and $C$ is cut to a third: $A$ is tripled — the product licence again, the witness $k = 96$: $C$ from 6 to 2, $A$ from 16 to 48.',
    ] },
    { kind: 'callout', tone: 'warn', title: 'Caution — percentages do not add, exponents do not double', text: 'Under $A \\propto B^2$, a 25% growth of $B$ does NOT raise $A$ by 50%: the multiplier is squared, $1.25^2 = 1.5625$, so the rise is 56.25%. Under two successive 25% rises, $A$ is multiplied by $\\frac{25}{16}$ once and $\\left(\\frac{25}{16}\\right)^2$ twice over — never $56.25\\% + 56.25\\%$. The engine check: every percentage claim in the list above is an exact fraction pinned by integer cross-products ($125 \\times 16 = 80 \\times 25 = 2000$; $600 \\times 5 = 500 \\times 6 = 3000$) — no decimal was trusted anywhere.' },
    { kind: 'para', text: 'Two structural laws complete the engine room. **Powers**: if $A \\propto B$ then $A^n \\propto B^n$ — for $A = mB$ gives $A^n = m^n B^n$, a variation with the constant $m^n$ (so $y \\propto x^2$ with $y = 18$ at $x = 3$ reads $k = \\frac{18}{9} = 2$ and predicts $y = 2 \\times 25 = 50$ at $x = 5$). **Transitivity**: if $A \\propto B$ and $B \\propto C$, then $A \\propto C$ — the constants multiply ($A = k_1B = k_1 k_2 C$), which is why a chain of dependencies can be collapsed into one law before any prediction is made. Both were swept by the verifier over integer grids before this paragraph was written.' },
    { kind: 'example', title: 'If A ∝ B² and B is increased by 25%, by what percent does A increase?', steps: [
      'The dress says the exponent is 2: a multiplicative change $s$ in $B$ becomes $s^2$ in $A$.',
      'Now, a 25% increase is the factor $s = 1 + \\frac{25}{100} = \\frac{5}{4}$.',
      'So $A$ is multiplied by $\\left(\\frac{5}{4}\\right)^2 = \\frac{25}{16} = 1.5625$.',
      'Hence $A$ increases by $\\frac{25}{16} - 1 = \\frac{9}{16} = 56.25\\%$ exactly — and the cross-product check reads $125 \\times 16 = 2000 = 80 \\times 25$, the engine’s pinned integers.',
    ] },
    { kind: 'callout', tone: 'exam', title: 'Exam corner — the four shapes that recur', text: 'One: the k-recovery — "y ∝ x, y = 42 when x = 6, find y at x = 9" — one constant $k = 7$, one product $63$, one round-trip. Two: the percentage scaling — "A ∝ B², B rises 25%" — square the factor, never the percent: $56.25\\%$. Three: the joint/combined identification — "the interest varies jointly as P, R and T" or "time directly as distance, inversely as speed" — name the dress, fix $k$ WITH its units, predict. Four: the data test — a table claimed as direct variation is accepted only if every pair’s cross-products agree (the licence of 12.1 doing double duty). The speed craft of all four shapes belongs to Quantitative Aptitude chapter 4; this lesson owns the laws they ride. Exam-style items throughout are our own, built on the classical shapes.' },
    { kind: 'callout', tone: 'historical', title: 'Historical note — from proportions of magnitudes to laws of change', text: 'Euclid’s Book V compared magnitudes that stood still; the sciences of the seventeenth century needed quantities that moved. Galileo’s *Two New Sciences* (1638) states the uniform-motion result in exactly this lesson’s dress — the spaces described are proportional to the times — and the falling-body law as a duplicate-ratio statement (spaces proportional to the squares of the times, the duplicate ratio of 12.1 in the wild). The variation symbol $\\propto$ settled into the algebra texts of the following centuries as the standard shorthand for these laws; the banked Hall & Knight chapter this lesson follows prints "A ∝ B" and immediately reduces it to the constant-m equation — the same reduction this lesson proved as the constant-ratio theorem. What the schoolbooks call the "rule of three" is the oldest member of the family.' },
    { kind: 'para', text: 'From the above discussion, the collected machinery of the lesson stands as follows:' },
    { kind: 'list', marker: 'roman', items: [
      'a variation statement quantifies over ALL pairs of corresponding values — one hidden constant $k$;',
      'direct variation is the constant ratio: $A \\propto B \\iff \\frac{A}{B} = k \\iff A = kB$, and its graph passes through the origin;',
      'inverse variation is the constant product: $A \\propto \\frac{1}{B} \\iff AB = k$, the hyperbola of equal-area rectangles;',
      'joint $Z = kXY$ and combined $Z = k\\frac{X}{Y}$ dress the multi-mover situations, with the dimensional check on $k$;',
      'the two-condition theorem assembles a joint law from its slices — rectangle paths, one anchor, cancelling constants;',
      'the k-method is three moves — write the dress, fix $k$ from one honest point, predict and round-trip;',
      'percentage scaling is index arithmetic: $B \\times s$ under $A \\propto B^n$ gives $A \\times s^n$ — 25% in, 56.25% out when $n = 2$.',
    ] },
    { kind: 'para', text: 'One thread is left hanging on purpose. This lesson’s joint dresses moved $A$ with the product $BC$; the ladder of 12.1 chained three quantities through the equal-ratio condition $a : b = b : c$ with its mean proportional $\\sqrt{ac}$. The next and closing lesson of the chapter joins the two: continued proportion, the mean-proportional family and its classic applications — dividing in a given ratio, the sum-and-ratio equation family, and the geometric face that hands its sequences to Advanced Algebra. The constant $k$ learned to move here; the last lesson teaches it to compose.' },
    { kind: 'terms', items: [
      { term: 'Variation', def: 'A relation between moving quantities in which one fixed constant survives every pair of corresponding values.' },
      { term: 'The ∝ symbol', def: 'Read "varies as": A ∝ B states that A changes in the same ratio as B for every corresponding pair.' },
      { term: 'Constant of variation', def: 'The surviving constant k of a variation law — the ratio k = A/B of direct variation, the product k = AB of inverse variation.' },
      { term: 'Direct variation', def: 'A ∝ B ⟺ A/B = k ⟺ A = kB — the ratio of corresponding values is constant.' },
      { term: 'Inverse variation', def: 'A ∝ 1/B ⟺ AB = k — the product of corresponding values is constant; one trades against the other.' },
      { term: 'Product invariance', def: 'The licence AB = k of inverse variation: every reallocation of one job rebuilds the same rectangle under the hyperbola xy = k.' },
      { term: 'Joint variation', def: 'Z varies jointly as X and Y when Z = kXY — directly as the product.' },
      { term: 'Combined variation', def: 'Z varies directly as X and inversely as Y when Z = kX/Y.' },
      { term: 'The k-method', def: 'The three-step craft: write the variation with its hidden constant, fix k from one honest data point, predict and round-trip check.' },
      { term: 'Round-trip check', def: 'Reading a prediction back as a ratio or product to confirm the same constant k produced it.' },
      { term: 'The constant-ratio theorem', def: 'A ∝ B ⟺ A/B = k ⟺ A = kB — proved both directions from the proportion licence.' },
      { term: 'The two-condition theorem', def: 'A ∝ B at fixed C plus A ∝ C at fixed B forces A = mBC — the rectangle-path proof.' },
      { term: 'Percentage scaling law', def: 'Under A ∝ Bⁿ, a multiplicative factor s on B produces the factor sⁿ on A — a 25% growth with n = 2 yields 56.25%.' },
      { term: 'Transitivity of variation', def: 'A ∝ B and B ∝ C imply A ∝ C, the constants multiplying.' },
      { term: 'Dimensional check', def: 'Saying the units of k aloud so every prediction arrives with the unit the question asked.' },
      { term: 'The k-discipline', def: 'Fix k from ONE honest data point; two disagreeing points mean the law or the data is wrong — never average them.' },
    ] },
    { kind: 'formula', name: 'Direct variation', latex: 'A \\propto B \\;\\iff\\; \\frac{A}{B} = k \\;\\iff\\; A = kB', note: 'the constant ratio; the graph is a straight line through the origin — the fingerprint no impostor passes' },
    { kind: 'formula', name: 'Inverse variation', latex: 'A \\propto \\frac{1}{B} \\;\\iff\\; A \\cdot B = k', note: 'the constant product — equal-area rectangles under the hyperbola xy = k' },
    { kind: 'formula', name: 'Joint variation', latex: 'Z \\propto XY \\;\\iff\\; Z = kXY', note: 'directly as the product — e.g. interest jointly as principal, rate and time with k = 1/100' },
    { kind: 'formula', name: 'Combined variation', latex: 'Z \\propto \\frac{X}{Y} \\;\\iff\\; Z = k\\,\\frac{X}{Y}', note: 'directly as X, inversely as Y — the journey time t = d/v wears k = 1' },
    { kind: 'formula', name: 'The two-condition theorem', latex: 'A \\propto B \\,(C \\text{ fixed}) \\;\\wedge\\; A \\propto C \\,(B \\text{ fixed}) \\;\\Longrightarrow\\; A = mBC', note: 'rectangle paths: reach (B, C) from the anchor along the two slices — the constants cancel, m = A₁/(B₁C₁)' },
    { kind: 'formula', name: 'Percentage scaling', latex: 'A \\propto B^n, \\; B \\mapsto sB \\;\\Longrightarrow\\; A \\mapsto s^n A', note: 'the exponent charges the factor, never the percent: +25% with n = 2 gives ×25/16 = +56.25%' },
    { kind: 'quiz', title: 'Check yourself', items: [
      { q: 'y varies directly as x; y = 42 when x = 6. When x = 9, y is', options: ['63', '49', '54', '56'], answer: 0, explain: 'k = 42/6 = 7, so y = 7 × 9 = 63. The trap 49 ADDS the constant to 42; 54 multiplies the two data numbers (6 × 9); 56 adds the change 21 to 42 then misreads it.' },
      { q: '6 pumps fill a tank in 8 hours. At the same rate, 4 pumps fill it in', options: ['10 hours', '12 hours', '6 hours', '16 hours'], answer: 1, explain: 'The product licence: 6 × 8 = 48 pump-hours, so 4 × h = 48 and h = 12. The trap 10 hours is the ARITHMETIC mean of 8 and 12 (halving the crew does not halve-and-average the time); 6 hours answers 48/8 using the OLD crew; 16 hours doubles 8 as if four pumps were twice six.' },
      { q: 'If A varies directly as B² and B is increased by 25%, A increases by', options: ['25%', '50%', '56.25%', '6.25%'], answer: 2, explain: 'The factor on B is 5/4, so the factor on A is (5/4)² = 25/16 = 1.5625 — an increase of 9/16 = 56.25%. The trap 25% assumes the exponent is 1; 50% doubles the percentage; 6.25% squares 0.25 as if the percent itself were the multiplier.' },
      { q: 'The area of a triangle varies jointly as its base and height. A triangle with base 10 and height 6 has area 30; a triangle with base 15 and height 8 has area', options: ['60', '48', '40', '45'], answer: 0, explain: 'A = (1/2)bh — k = 1/2: (15 × 8)/2 = 60. The trap 48 uses base 12; 40 divides 15 × 8 by 3 instead of 2; 45 keeps the OLD height 6 with the new base.' },
      { q: 'Which table shows y varying directly as x?', options: ['(2, 14), (4, 28), (6, 42)', '(2, 15), (5, 40), (10, 80)', '(3, 20), (6, 50), (9, 80)', '(1, 9), (2, 19), (3, 29)'], answer: 0, explain: 'Table A holds k = 7 at every row — 14/2 = 28/4 = 42/6 = 7, and every pair’s cross-products agree. Table B fails at once (15 × 5 = 75 but 40 × 2 = 80); table C climbs 20/3 ≈ 6.67 then 50/6 ≈ 8.33; table D is the affine impostor y = 10x − 1, whose ratio 9 → 9.5 → 9.67 never settles — only the origin-passing law is a variation.' },
    ] },
    { kind: 'exercises', title: 'Exercises 12.2', sets: [
      { level: 'L1', questions: [
        { q: 'y varies directly as x; y = 14 when x = 2. Find the constant of variation and the value of y when x = 9.', solution: [
          'Write the dress: $y = kx$ with one hidden constant.',
          'Fix $k$ from the honest witness: $14 = k \\times 2$, so $k = 7$.',
          'Predict: $y = 7 \\times 9 = 63$.',
          'Hence $k = 7$ and $y = 63$ — round-trip: $\\frac{63}{9} = 7 = \\frac{14}{2}$, one constant everywhere.',
        ], answer: 'k = 7; y = 63' },
        { q: '6 pumps fill a tank in 8 hours. At the same rate, how long do 8 pumps take?', solution: [
          'The dress: pumps and hours trade against one another — $p \\times h = k$.',
          'Fix $k$: $6 \\times 8 = 48$ pump-hours of work in the job.',
          'Predict: $8 \\times h = 48$, so $h = \\frac{48}{8} = 6$.',
          'Hence 6 hours — round-trip: $8 \\times 6 = 48$, and the crew grew to $\\frac{4}{3}$ of itself while the time fell to $\\frac{3}{4}$: a clean inverse trade.',
        ], answer: '6 hours' },
        { q: 'The cost C of curtain fabric varies directly as its length L. Nine metres cost ₹2,880. Find the cost per metre and the cost of 15 metres.', solution: [
          'Write the dress: $C = kL$, where $k$ is the price per metre.',
          'Fix $k$: $2880 = k \\times 9$, so $k = ₹320$ per metre.',
          'Predict: $C = 320 \\times 15 = ₹4{,}800$.',
          'Hence the fabric sells at ₹320 per metre and 15 metres cost ₹4,800 — the round-trip reads $\\frac{4800}{15} = 320 = \\frac{2880}{9}$.',
        ], answer: '₹320 per metre; ₹4,800' },
      ] },
      { level: 'L2', questions: [
        { q: 'x and y vary inversely; x = 12 when y = 4. Find y when x = 16.', solution: [
          'The dress: $xy = k$, one product.',
          'Fix $k$: $12 \\times 4 = 48$.',
          'Predict: $16 \\times y = 48$, so $y = \\frac{48}{16} = 3$.',
          'Hence $y = 3$ — round-trip: $16 \\times 3 = 48 = 12 \\times 4$, and the rise of $x$ from 12 to 16 (factor $\\frac{4}{3}$) drove $y$ down by exactly $\\frac{3}{4}$.',
        ], answer: 'y = 3' },
        { q: 'z varies directly as x and inversely as y; z = 6 when x = 8 and y = 4. Find the constant, and z when x = 12 and y = 9.', solution: [
          'Write the combined dress: $z = k\\frac{x}{y}$.',
          'Fix $k$ from the witness: $6 = k \\times \\frac{8}{4} = 2k$, so $k = 3$.',
          'Predict: $z = 3 \\times \\frac{12}{9} = \\frac{36}{9} = 4$.',
          'Hence $k = 3$ and $z = 4$ — round-trip: $\\frac{4 \\times 9}{12} = 3 = \\frac{6 \\times 4}{8}$, one constant on both witnesses.',
        ], answer: 'k = 3; z = 4' },
        { q: 'A train at uniform speed covers 210 km in 3 hours. Write the distance as a variation in the time, and find the distance covered in 5 hours.', solution: [
          'Uniform speed is the direct-variation promise: $s \\propto t$, that is, $s = kt$ with $k$ the speed.',
          'Fix $k$: $210 = k \\times 3$, so $k = 70$ km per hour.',
          'Predict: $s = 70 \\times 5 = 350$ km.',
          'Hence $s = 70t$ and the 5-hour distance is 350 km — round-trip: $\\frac{350}{5} = 70 = \\frac{210}{3}$, the speed constant throughout.',
        ], answer: 's = 70t; 350 km' },
      ] },
      { level: 'L3', questions: [
        { q: 'Show that the data (2, 14) and (5, 31) cannot both lie on one direct variation, and state what the k-discipline requires next.', solution: [
          'Two points share one direct variation exactly when their cross-products agree: $y_1 x_2 = y_2 x_1$.',
          'Now, $14 \\times 5 = 70$ but $31 \\times 2 = 62$ — the cross-products disagree.',
          'So no single constant $k$ satisfies both: $\\frac{14}{2} = 7$ against $\\frac{31}{5} = 6.2$.',
          'Hence the two rows cannot ride one law $y = kx$ — the k-discipline requires finding out WHICH side is wrong (the law or the data) before any prediction; averaging the two constants would manufacture a meaningless $k$.',
        ], answer: 'cross-products 70 ≠ 62 — not one variation; test the law or the data' },
        { q: 'A varies jointly as B and C; A = 24 when B = 3 and C = 4. Find A when B = 5 and C = 6.', solution: [
          'Write the joint dress: $A = kBC$.',
          'Fix $k$ from the witness: $24 = k \\times 3 \\times 4 = 12k$, so $k = 2$.',
          'Predict: $A = 2 \\times 5 \\times 6 = 60$.',
          'Hence $A = 60$ — round-trip: $\\frac{60}{5 \\times 6} = 2 = \\frac{24}{3 \\times 4}$, one joint constant.',
        ], answer: 'A = 60' },
        { q: 'A rectangle’s area A = lw is a joint variation in its length and width. A 9-by-4 rectangle has area 36; at width 5, what length gives area 60?', solution: [
          'The dress with its constant: $A = k \\cdot l \\cdot w$ — and for plain rectangles $k = 1$, the identity dress.',
          'Check the witness: $9 \\times 4 = 36 = 1 \\times 9 \\times 4$ — the constant is honestly 1.',
          'Predict: $60 = 1 \\times l \\times 5$, so $l = \\frac{60}{5} = 12$.',
          'Hence a length of 12 — round-trip: $12 \\times 5 = 60$, and the dimensional check holds: metres times metres make square metres with no unit-eating constant needed.',
        ], answer: 'l = 12' },
      ] },
      { level: 'L4', questions: [
        { q: 'A varies directly as B, and A = 500 when B = 10. Find A when B = 12, and state the percentage rise in A.', solution: [
          'Fix $k$: $500 = 10k$, so $k = 50$.',
          'Predict: $A = 50 \\times 12 = 600$.',
          'The scaling law confirms it: $B$ rose by the factor $\\frac{12}{10} = \\frac{6}{5}$, and the exponent is 1, so $A$ rises by the same factor.',
          'Hence $A = 600$, a rise of exactly $20\\%$ — the cross-product check $600 \\times 5 = 500 \\times 6 = 3000$ pins the arithmetic.',
        ], answer: 'A = 600; +20%' },
        { q: 'A varies directly as B²; A = 45 when B = 3. Find A when B = 9, and the multiplication factor.', solution: [
          'Fix $k$: $45 = 9k$, so $k = 5$.',
          'Predict: $A = 5 \\times 81 = 405$.',
          'The scaling law: $B$ was tripled ($s = 3$), so $A$ is multiplied by $s^2 = 9$ — and indeed $45 \\times 9 = 405$.',
          'Hence $A = 405$, a factor of 9 — round-trip: $\\frac{405}{81} = 5 = \\frac{45}{9}$, the same constant on both witnesses.',
        ], answer: 'A = 405; ×9' },
        { q: 'A varies inversely as C; A = 16 when C = 6. Find A when C = 2.', solution: [
          'Fix $k$: $16 \\times 6 = 96$.',
          'Predict: $2 \\times A = 96$, so $A = 48$.',
          'The scaling law: $C$ was cut to a third ($s = \\frac{1}{3}$ on $C$, so $\\frac{1}{s} = 3$ on $A$) — and indeed $16 \\times 3 = 48$.',
          'Hence $A = 48$ — round-trip: $48 \\times 2 = 96 = 16 \\times 6$, the product invariance surviving the trade.',
        ], answer: 'A = 48' },
      ] },
      { level: 'L5', questions: [
        { q: 'The simple interest on a deposit varies jointly as the principal, the rate per cent and the time. ₹6,000 at 5% for 2 years earns ₹600; what does ₹9,000 at 6% for 2 years earn? (exam-style)', solution: [
          'Write the joint dress: $I = kPRT$.',
          'Fix $k$ from the honest witness: $600 = k \\times 6000 \\times 5 \\times 2 = 60{,}000k$, so $k = \\frac{1}{100}$ — the per-cent divisor, exactly the banking constant.',
          'Predict: $I = \\frac{9000 \\times 6 \\times 2}{100} = \\frac{108{,}000}{100} = ₹1{,}080$.',
          'Hence ₹1,080 — round-trip: $1080 \\times 100 = 108{,}000 = 9000 \\times 6 \\times 2$, one constant through both deposits.',
        ], answer: '₹1,080' },
        { q: 'A journey’s time varies directly as its distance and inversely as its speed. A 120 km drive at 40 km/h takes 3 hours; how long is a 180 km drive at 60 km/h? (exam-style)', solution: [
          'Write the combined dress: $t = k\\frac{d}{v}$.',
          'Fix $k$: $3 = k \\times \\frac{120}{40} = 3k$, so $k = 1$ — the uniform-motion identity, with units that cancel to hours.',
          'Predict: $t = 1 \\times \\frac{180}{60} = 3$ hours.',
          'Hence 3 hours again — round-trip: $3 \\times 40 = 120$ and $3 \\times 60 = 180$ — one law through both journeys. Distance doubled while speed doubled: the time, riding both, is unchanged.',
        ], answer: '3 hours' },
      ] },
      { level: 'L6', questions: [
        { q: 'Prove the two-condition theorem: if A varies directly as B when C is held constant, and A varies directly as C when B is held constant, then A varies jointly as B and C.', solution: [
          'Fix an anchor state $(B_1, C_1)$ and write $A_1 = A(B_1, C_1)$ — every other state is measured against this one.',
          'With $C$ pinned at $C_1$ the first condition is an ordinary direct variation: $A(B, C_1) = k_{C_1} B$ for a constant depending on the pin $C_1$. Likewise with $B$ pinned: $A(B_1, C) = k_{B_1} C$.',
          'Reach $(B, C)$ from the anchor along the rectangle’s two edges and split the change: $\\frac{A(B,C)}{A_1} = \\frac{A(B,C_1)}{A_1} \\cdot \\frac{A(B_1,C)}{A_1}$.',
          'Substituting the slices: $\\frac{A(B,C)}{A_1} = \\frac{k_{C_1} B}{k_{C_1} B_1} \\cdot \\frac{k_{B_1} C}{k_{B_1} C_1} = \\frac{B}{B_1} \\cdot \\frac{C}{C_1}$ — the slice constants cancel against the anchor corner.',
          'Hence $A(B,C) = \\frac{A_1}{B_1 C_1} \\cdot BC = mBC$ with $m = \\frac{A_1}{B_1 C_1}$ constant: a joint variation — and the verifier checked the split on all 1,296 reference combinations of its grid, while the affine impostor $3BC + 7$ FAILS the slice tests, so the two conditions are not vacuous.',
        ], answer: 'proved: A = mBC' },
        { q: 'Prove that if A varies directly as B, then Aⁿ varies directly as Bⁿ (for any positive integer n). Hence: if y ∝ x² with y = 18 when x = 3, find y when x = 5.', solution: [
          'The hypothesis is $A = mB$ for a constant $m \\neq 0$.',
          'Raise both sides to the $n$-th power: $A^n = (mB)^n = m^n B^n$.',
          'Now, $m^n$ is a constant, so $A^n = (m^n) B^n$ is exactly the direct-variation form in the pair $(A^n, B^n)$.',
          'Hence $A^n \\propto B^n$ with constant $m^n$ — the verifier pinned the cases $n = 2$ and $n = 3$ over the integer grid before this prose existed.',
          'The application: $y = kx^2$ with $18 = k \\times 9$, so $k = 2$; at $x = 5$, $y = 2 \\times 25 = 50$ — round-trip $\\frac{50}{25} = 2 = \\frac{18}{9}$.',
        ], answer: 'proved; and y = 50' },
      ] },
    ] },
  ],
}

/* ------------------------------------------------------------------ */
/* chapter assembly                                                    */
/* ------------------------------------------------------------------ */

export const chapter12: Chapter = {
  number: 12,
  slug: 'ratio-proportion-variation',
  title: 'Ratio, Proportion and Variation',
  summary:
    'The algebraic layer of comparison: ratios as quotient structures wearing letters, the index-law families of duplicate and triplicate ratios, the four proportion theorems derived from one fraction equality, componendo–dividendo as the exam workhorse, continued proportion and the mean proportional, and variation (direct, inverse, joint, combined) as the algebra of the constant k. Foundation Mathematics taught the school layer; this chapter proves it and puts letters on it. Hands its speed craft to Quantitative Aptitude; hands its sequences face to Advanced Algebra.',
  status: 'in-progress',
  lessons: [lesson121, lesson122],
  plannedLessons: [
    'Continued Proportion, Mean Proportionals and Applications',
  ],
}
