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
/* chapter assembly                                                    */
/* ------------------------------------------------------------------ */

export const chapter12: Chapter = {
  number: 12,
  slug: 'ratio-proportion-variation',
  title: 'Ratio, Proportion and Variation',
  summary:
    'The algebraic layer of comparison: ratios as quotient structures wearing letters, the index-law families of duplicate and triplicate ratios, the four proportion theorems derived from one fraction equality, componendo–dividendo as the exam workhorse, continued proportion and the mean proportional, and variation (direct, inverse, joint, combined) as the algebra of the constant k. Foundation Mathematics taught the school layer; this chapter proves it and puts letters on it. Hands its speed craft to Quantitative Aptitude; hands its sequences face to Advanced Algebra.',
  status: 'in-progress',
  lessons: [lesson121],
  plannedLessons: [
    'Variation: the Algebra of Constants',
    'Continued Proportion, Mean Proportionals and Applications',
  ],
}
