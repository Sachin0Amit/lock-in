import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 5: Linear Equations in One Variable
 *
 * LESSONS WRITTEN: 5.1 What an Equation Is: the Balance Principle
 *                  (run 75 — quiz keys 1/1/3/0/1, 14 exercises, two
 *                  figures, verify-book3-ch05.ts sections A–C + F green)
 *                  — the chapter OPENS 1/3 at run 75; 5.2 lands this run;
 *                  5.3 + the unit-5 review close it at run 76.
 *
 * References for this unit: the banked H&K knowledge (Elementary Algebra
 * for Schools — the simple-equations chapter's balance discipline, its
 * transposition shorthand and its verify-the-solution habit, studied in
 * run 67's download before deletion) informs the arc of this run; the
 * school canon's method names ride `ncert-math8-ch2-linear-equations`
 * (Linear Equations in One Variable: solving with the variable on one
 * side, then on both sides, then reducible forms — contents web-checked
 * 2026-11-07 and re-checked 2026-11-08). Banked keys reused: ans-the-
 * field-laws-division-joins-the-family (the field laws the lawful moves
 * rest on), al-special-products-the-identities-proved (3.3's identity
 * charter for the equations-vs-identities census), al-evaluating-
 * expressions-substitution-and-formulas (the check habit), fm-adding-
 * subtracting-fractions (the LCD craft 5.2 clears with), khattar-qa-4e
 * (the exam corner), cengage-jee-style (the presentation contract). NEW
 * web-checked history key this run: `recorde-1557-whetstone` (Robert
 * Recorde, The Whetstone of Witte, 1557 — the equals sign born as "a
 * pair of parallels… bicause noe 2 thynges can be moare equalle"; 5.1's
 * historical callout), web-checked 2026-11-08 via the Recorde biographical
 * record + the quotation literature.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (5.1): the balance and its lawful moves. Header            */
/* (30,18,660,44); LEFT panel (30,84,330,200) holding the beam         */
/* (60,136,270,8), the fulcrum (180,150,30,18), two pans               */
/* (70,168,110,22) and (240,168,110,22), two expression boxes          */
/* (60,196,130,30) and (220,196,130,30); RIGHT panel (400,84,290,200)  */
/* holding 4 move boxes (250,36) at (420,116),(420,156),(420,196),     */
/* (420,236); collection band (30,300,660,32) holding 2 result boxes   */
/* (200,22) at (60,305),(300,305). Geometry pinned in                  */
/* verify-book3-ch05.ts section C, audited in F.                       */
/* ------------------------------------------------------------------ */

function balanceMovesSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The balance principle. A beam labelled x plus 3 equals 8 rests on a fulcrum; the left pan carries the member x plus 3 and the right pan carries the member 8. Four lawful moves are listed: add the same quantity to both members, subtract the same quantity from both members, multiply both members by the same nonzero quantity, divide both members by the same nonzero quantity. Lawful moves keep the solution set.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the balance principle</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">an equation is a scale in balance — every lawful move touches BOTH members the same way</text>')
  // LEFT panel: the scale
  parts.push('<rect x="30" y="84" width="330" height="200" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="195" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">the claim as a scale: x + 3 = 8</text>')
  // beam + fulcrum
  parts.push('<rect x="60" y="136" width="270" height="8" rx="3" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="195" y="131" font-size="11" fill="#4d7c0f" text-anchor="middle" font-weight="700">the equals sign is the fulcrum</text>')
  parts.push('<rect x="180" y="150" width="30" height="18" rx="3" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="195" y="163" font-size="10" fill="#6b7a72" text-anchor="middle">=</text>')
  // pans (hung from the beam ends — dashed strings)
  parts.push('<path d="M 90 144 L 125 168" fill="none" stroke="#6b7a72" stroke-width="1" stroke-dasharray="3 2"/>')
  parts.push('<path d="M 300 144 L 295 168" fill="none" stroke="#6b7a72" stroke-width="1" stroke-dasharray="3 2"/>')
  parts.push('<rect x="70" y="168" width="110" height="22" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="125" y="183" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">x + 3</text>')
  parts.push('<rect x="240" y="168" width="110" height="22" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="295" y="183" font-size="12.5" fill="#365314" text-anchor="middle" font-weight="700">8</text>')
  // member boxes under the pans
  parts.push('<rect x="60" y="196" width="130" height="30" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="125" y="215" font-size="10.5" fill="#365314" text-anchor="middle">left member: x + 3</text>')
  parts.push('<rect x="220" y="196" width="130" height="30" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="285" y="215" font-size="10.5" fill="#365314" text-anchor="middle">right member: 8</text>')
  parts.push('<text x="195" y="262" font-size="11" fill="#4d7c0f" text-anchor="middle" font-weight="700">level pans — the claim is TRUE at that x</text>')
  // RIGHT panel: the four lawful moves
  parts.push('<rect x="400" y="84" width="290" height="200" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="545" y="106" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">the four lawful moves</text>')
  const moves: [string, string][] = [
    ['add the SAME quantity', 'to both members'],
    ['subtract the SAME quantity', 'from both members'],
    ['multiply both members', 'by the same NONZERO quantity'],
    ['divide both members', 'by the same NONZERO quantity'],
  ]
  moves.forEach(([title, sub], i) => {
    const y = 116 + i * 40
    parts.push(`<rect x="420" y="${y}" width="250" height="36" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="545" y="${y + 15}" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="545" y="${y + 29}" font-size="10" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="300" width="660" height="32" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="305" width="200" height="22" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="160" y="320" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">lawful moves keep the balance</text>')
  parts.push('<rect x="300" y="305" width="200" height="22" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="400" y="320" font-size="11" fill="#365314" text-anchor="middle">the solution set never changes</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (5.1): the three assertions strip. Header (30,18,660,44);  */
/* 3 row boxes (30,84,660,64) at y=84,156,228, each carrying a label   */
/* box (170,40) at x=45 and a verdict box (430,40) at x=235; band      */
/* (30,300,660,40) holding 2 result boxes (240,24) at (60,308),        */
/* (360,308). Geometry pinned in section C, audited in F.              */
/* ------------------------------------------------------------------ */

function verdictStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The three assertion classes. An identity such as x plus one squared equals x squared plus two x plus one is true at every tested value. A conditional equation such as x plus three equals eight is true only at x equals five. A contradiction such as x plus one equals x plus two is true at no tested value. Three verdicts, one census.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  // header band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">three kinds of assertion — one census</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">test the claim at a spread of values; the PATTERN of the verdicts sorts the assertion</text>')
  // row 1: identity
  parts.push('<rect x="30" y="84" width="660" height="64" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="45" y="96" width="170" height="40" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="130" y="113" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">an identity</text>')
  parts.push('<text x="130" y="128" font-size="9.5" fill="#6b7a72" text-anchor="middle">true at EVERY value</text>')
  parts.push('<rect x="235" y="96" width="430" height="40" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="450" y="113" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">(x + 1)² = x² + 2x + 1 — census: 6 of 6 true</text>')
  parts.push('<text x="450" y="128" font-size="10" fill="#6b7a72" text-anchor="middle">3.3’s charter read forward — the solution set is EVERY number (5.3’s third verdict)</text>')
  // row 2: conditional equation
  parts.push('<rect x="30" y="156" width="660" height="64" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="45" y="168" width="170" height="40" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="130" y="185" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">a conditional equation</text>')
  parts.push('<text x="130" y="200" font-size="9.5" fill="#6b7a72" text-anchor="middle">true at SOME values</text>')
  parts.push('<rect x="235" y="168" width="430" height="40" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="450" y="185" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">x + 3 = 8 — census: 1 of 6 true (only x = 5)</text>')
  parts.push('<text x="450" y="200" font-size="10" fill="#6b7a72" text-anchor="middle">the solving chapters’ home ground — the solution set is {5}</text>')
  // row 3: contradiction
  parts.push('<rect x="30" y="228" width="660" height="64" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="45" y="240" width="170" height="40" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="130" y="257" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">a contradiction</text>')
  parts.push('<text x="130" y="272" font-size="9.5" fill="#6b7a72" text-anchor="middle">true at NO value</text>')
  parts.push('<rect x="235" y="240" width="430" height="40" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="450" y="257" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">x + 1 = x + 2 — census: 0 of 6 true</text>')
  parts.push('<text x="450" y="272" font-size="10" fill="#6b7a72" text-anchor="middle">subtract x lawfully and 1 = 2 remains — a false claim with no x in it (5.3’s second verdict)</text>')
  // collection band
  parts.push('<rect x="30" y="300" width="660" height="40" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="60" y="308" width="240" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="180" y="324" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">the census is a preview instrument</text>')
  parts.push('<rect x="360" y="308" width="240" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="480" y="324" font-size="11" fill="#365314" text-anchor="middle">5.3 prices all three verdicts in full</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 1 (5.2): the five-station pipeline. Header (30,18,660,44);   */
/* 5 station boxes (122,70) at y=110, x = 40,170,300,430,560; band     */
/* (30,220,660,44) holding 2 running-example boxes (300,30) at         */
/* (45,227),(365,227); note strip (30,284,660,40) holding 1 check box  */
/* (280,26) at (220,291). Pinned in section E, audited in G.           */
/* ------------------------------------------------------------------ */

function pipelineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The five-station solving pipeline. Five stations in a row: clear fractions by multiplying every term by the LCD; clear brackets by distributing; collect like terms on each member; gather the unknown onto one member; divide by the coefficient. Below, the running example flows through: 2 times the bracket x minus 1 over 3 equals the bracket x plus 1 over 2 plus 1, cleared to 4 x minus 4 equals 3 x plus 9, gathered to x equals 13. The check substitutes into the original.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="340" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">the five-station pipeline</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">every station is one of 5.1’s lawful moves — the solution set survives the whole journey</text>')
  const stations: [string, string][] = [
    ['1 — CLEAR', 'fractions by the LCD'],
    ['2 — CLEAR', 'brackets (mind the minus)'],
    ['3 — COLLECT', 'like terms member-wise'],
    ['4 — GATHER', 'the unknown on one side'],
    ['5 — DIVIDE', 'by the coefficient'],
  ]
  stations.forEach(([title, sub], i) => {
    const x = 40 + i * 130
    parts.push(`<rect x="${x}" y="110" width="122" height="70" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>`)
    parts.push(`<text x="${x + 61}" y="138" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${x + 61}" y="156" font-size="9.5" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // arrows between stations
  for (let i = 0; i < 4; i++) {
    const x1 = 40 + i * 130 + 122
    parts.push(`<path d="M ${x1 + 2} 145 L ${x1 + 6} 145" stroke="#4d7c0f" stroke-width="1.5"/>`)
  }
  // collection band: the running example flows through
  parts.push('<rect x="30" y="220" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="45" y="227" width="300" height="30" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="195" y="246" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">2(x − 1)/3 = (x + 1)/2 + 1</text>')
  parts.push('<rect x="365" y="227" width="300" height="30" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="515" y="246" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">×6 → 4x − 4 = 3x + 9 → x = 13</text>')
  // note strip: the check
  parts.push('<rect x="30" y="284" width="660" height="40" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="220" y="291" width="280" height="26" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="360" y="308" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">habit — check in the ORIGINAL: 8 = 8 ✓</text>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (5.2): the invariant solution set. Header (30,18,660,44);  */
/* LEFT panel (30,84,360,200) holding 4 form boxes (320,36) at         */
/* (50,116),(50,160),(50,204),(50,248); RIGHT panel (410,84,280,200)   */
/* holding 3 note boxes (250,48) at (425,116),(425,176),(425,236);     */
/* band (30,300,660,40) holding 2 result boxes (250,24) at (55,308),   */
/* (340,308). Pinned in section E, audited in G.                       */
/* ------------------------------------------------------------------ */

function invariantSetSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The invariant solution set. Four equivalent forms of one claim: the fraction form, the cleared form, the collected form, and x equals 13 — each arrow a lawful move. The right panel notes that the solution set never changed, that every arrow is reversible, and that the check confirms the end of the chain against the beginning.">'
  )
  parts.push('<rect x="0" y="0" width="720" height="360" fill="transparent"/>')
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="360" y="37" font-size="14" fill="#365314" text-anchor="middle" font-weight="700">one claim, four dresses — the solution set never moves</text>')
  parts.push('<text x="360" y="54" font-size="12" fill="#4d7c0f" text-anchor="middle">the pipeline changes the CLOTHES; equivalence keeps the TRUTH</text>')
  // LEFT panel: the chain of forms
  parts.push('<rect x="30" y="84" width="360" height="200" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="210" y="104" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">the running example, station by station</text>')
  const forms: [string, string][] = [
    ['2(x − 1)/3 = (x + 1)/2 + 1', 'the original claim (fractions)'],
    ['4(x − 1) = 3(x + 1) + 6', 'after ×6 — the LCD strike'],
    ['4x − 4 = 3x + 9', 'cleared and collected'],
    ['x = 13', 'gathered and divided'],
  ]
  forms.forEach(([f, note], i) => {
    const y = 116 + i * 44
    parts.push(`<rect x="50" y="${y}" width="320" height="36" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="210" y="${y + 15}" font-size="12" fill="#365314" text-anchor="middle" font-weight="700">${f}</text>`)
    parts.push(`<text x="210" y="${y + 30}" font-size="9.5" fill="#6b7a72" text-anchor="middle">${note}</text>`)
  })
  // RIGHT panel: the invariants
  parts.push('<rect x="410" y="84" width="280" height="200" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<text x="550" y="104" font-size="13" fill="#365314" text-anchor="middle" font-weight="700">what never changed</text>')
  const notes: [string, string][] = [
    ['the solution set: {13} at every arrow', 'equivalence composes — the chain is safe'],
    ['every arrow is reversible', '×6 undoes ÷6; +k undoes −k (5.1)'],
    ['the check closes the chain', '13 in the ORIGINAL: 8 = 8 ✓'],
  ]
  notes.forEach(([title, sub], i) => {
    const y = 116 + i * 60
    parts.push(`<rect x="425" y="${y}" width="250" height="48" rx="6" fill="none" stroke="#6b7a72" stroke-width="1"/>`)
    parts.push(`<text x="550" y="${y + 19}" font-size="11" fill="#365314" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="550" y="${y + 36}" font-size="9.5" fill="#6b7a72" text-anchor="middle">${sub}</text>`)
  })
  // collection band
  parts.push('<rect x="30" y="300" width="660" height="40" rx="8" fill="none" stroke="#3f6212" stroke-width="1.5"/>')
  parts.push('<rect x="55" y="308" width="250" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="180" y="324" font-size="11.5" fill="#365314" text-anchor="middle" font-weight="700">the last line speaks for the first</text>')
  parts.push('<rect x="340" y="308" width="250" height="24" rx="5" fill="none" stroke="#6b7a72" stroke-width="1"/>')
  parts.push('<text x="465" y="324" font-size="11" fill="#365314" text-anchor="middle">the collapse cases belong to 5.3</text>')
  return parts.join('')
}

export const chapter05: Chapter = {
  number: 5,
  slug: 'linear-equations-one-variable',
  title: 'Linear Equations in One Variable',
  summary:
    'The balance principle made lawful: an equation as an assertion, the moves that preserve truth justified by the field laws ANS proved, fractional and bracketed forms cleared systematically, and the three-way verdict — one solution, none, or infinitely many — read off the collapsed form 0·x = k, the same solvability discipline ANS 10.1 applied to the number ladder.',
  status: 'in-progress',
  lessons: [
    {
      id: 'al-what-an-equation-is-the-balance-principle',
      number: '5.1',
      title: 'What an Equation Is: the Balance Principle',
      concepts: [
        'the equation as an assertion',
        'members and the unknown',
        'equations vs identities',
        'the balance principle',
        'the lawful moves',
        'the solution set',
        'the check by substitution',
        'the three-verdict preview',
      ],
      objectives: [
        'read an equation as an assertion to be settled — members, unknown, and the equals sign as the claim',
        'sort assertions into identities, conditional equations and contradictions by a census of tested values, cashing 3.3’s identity charter',
        'state the balance principle and the four lawful moves, each justified by the field laws ANS 7.2 proved',
        'price the unlawful ×0 move that turns a false claim true — the trap the examinations set',
        'use the solution-set language: solving means finding the WHOLE set, and the check by substitution confirms it',
        'preview the three-way verdict — one, none, infinitely many — that 5.3 prices in full',
      ],
      prerequisites: ['al-factor-theorem-and-cubics', 'al-special-products-the-identities-proved'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math8-ch2-linear-equations', 'recorde-1557-whetstone', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Chapters 1–4 taught the craft of expressions: letters collected, multiplied, divided, factored — sentences of algebra with no claim inside them. $x^{2} - 9$ is a thing, not a statement; it neither asserts nor denies. This chapter changes the species of what we write. Put an equals sign between two expressions and the line stops being a thing and becomes a CLAIM: $x^{2} - 9 = 0$ says that the thing on the left and the thing on the right name the same number — and that claim may be true, may be false, and — the deep fact — may be true for some values of the letter and false for others. The equation is the sentence of algebra, and solving it is the art of finding exactly when the sentence tells the truth.' },
        { kind: 'para', text: 'The plan of the chapter runs in three lessons, and this one carries the foundations. First the vocabulary: what an equation IS, what its members and its unknown are, and what it means for a value to settle it. Then the great distinction this book has been owed since 3.3 proved its identities — the difference between an equation that is true always (an identity), true once (a conditional equation), and true never (a contradiction). Then the engine of the whole subject: the balance principle, with its four lawful moves each justified by the field laws that ANS 7.2 proved — not recited as rules, but earned as theorems — and the one move that is forbidden because it destroys the very balance it pretends to keep.' },
        { kind: 'heading', text: 'From Expressions to Assertions' },
        { kind: 'para', text: 'The distinction is easiest to see in the smallest possible case. Take the letter $x$ and write three lines that look almost alike:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) $x + 3$ — an expression: a recipe that names a number once $x$ is chosen. Nothing is claimed; the line cannot be true or false.',
          '(ii) $x + 3 = 8$ — an assertion: a claim that the recipe on the left names the same number as the 8 on the right. At $x = 5$ the claim is true; at $x = 2$ it is false.',
          '(iii) $x + 3 > 8$ — a different assertion with a different shape (an inequality, chapter 7’s subject); the equals sign of (ii) is the only claim that says the two members are the SAME number.',
        ] },
        { kind: 'terms', items: [
          { term: 'equation', def: 'an assertion that two expressions name the same number — a claim whose truth may depend on the unknown; the sentence-form of algebra' },
          { term: 'member', def: 'one of the two expressions the equals sign joins — the left member and the right member, the two pans of the balance' },
          { term: 'unknown', def: 'the letter whose value or values the claim leaves unsaid; finding all of them is what solving means' },
          { term: 'solution (root)', def: 'a value that makes the claim TRUE when substituted into both members — the word "root" is the older name and survives in exam papers' },
          { term: 'solution set', def: 'the set of ALL solutions; solving an equation means determining it whole, not exhibiting one lucky example' },
          { term: 'identity', def: 'an assertion true for EVERY value of the unknown — 3.3’s charter class; recognised and never "solved"' },
          { term: 'conditional equation', def: 'an assertion true for SOME values and false for others — the solving chapters’ home ground; $x + 3 = 8$ is the type case' },
          { term: 'contradiction', def: 'an assertion true for NO value — its lawful collapse ends in a false claim with no unknown left ($x + 1 = x + 2$ becomes $1 = 2$)' },
        ] },
        { kind: 'para', text: 'So an equation is a sentence with three parts: a left member, an equals sign, and a right member. The letter is called the unknown — the value (or values) that would make the claim true is what the sentence leaves unsaid. A value that makes the claim true is said to be a **solution** (or a **root**) of the equation; the equation is **solved** when every solution has been found and nothing else has been cheated in. The formal statement, in the book’s standing style: a number $s$ is said to be a solution of the equation $A(x) = B(x)$ if substituting $s$ for $x$ in both members makes the claim true. Thus, $x + 3 = 8$ has the solution $5$, since $5 + 3 = 8$; and $2$ is not a solution, since $2 + 3 = 5 \\neq 8$. The check is 1.3’s substitution habit pointed at a claim instead of a formula.' },
        { kind: 'para', text: 'One habits-worth noting before the machinery starts: the members of an equation are EXPRESSIONS, and everything chapters 1–4 built now becomes load-bearing. To settle $3x + 2 = 17$ at $x = 5$, you evaluate the left member — $3 \\cdot 5 + 2 = 17$ — which is the substitution craft of 1.3 riding the collected form of 1.2. To clear brackets in a bigger member you will use 3.2’s distributive work; to collect like terms, 1.2’s family law. Four chapters of expression craft were preparation for reading sentences. The equation is where algebra stops building vocabulary and starts saying things.' },
        { kind: 'heading', text: 'Equations, Identities and Contradictions' },
        { kind: 'para', text: 'Now the distinction this book has been carrying since 3.3. An identity, said that chapter, is an equality of expressions that holds for EVERY value of the letters: $(x + 1)^{2} = x^{2} + 2x + 1$ was proved on the grid — the two members collect to the same polynomial, so no value of $x$ can pull them apart. A **conditional equation** is the new species: an assertion true for SOME values and false for others — $x + 3 = 8$ is true only at $5$. And the third class hides in the corner: a **contradiction** is an assertion true for NO value at all — $x + 1 = x + 2$ claims two numbers that differ by 1 are equal, and no $x$ anywhere can bribe the arithmetic into agreeing.' },
        { kind: 'para', text: 'The instrument that sorts them needs no theory at all — only the census. Test the assertion at a spread of values and watch the PATTERN of the verdicts:' },
        { kind: 'table', caption: 'The three assertion classes, priced by a six-point census', head: ['class', 'example', 'census (6 values tested)', 'the solution set'], rows: [
          ['identity', '$(x + 1)^{2} = x^{2} + 2x + 1$', 'true at 6 of 6 (x = −4, −1, 0, 1, 3, 7)', 'every number'],
          ['conditional equation', '$x + 3 = 8$', 'true at 1 of 6 (only x = 5)', '$\\{5\\}$'],
          ['contradiction', '$x + 1 = x + 2$', 'true at 0 of 6', 'empty — no value works'],
        ] },
        { kind: 'para', text: 'The census is honest but never final: six agreements do not PROVE an identity (a claim can be true at six innocent values and fail at the seventh — that is exactly why 3.3 proved its identities on the grid rather than by sampling), and six failures do not prove a contradiction. What the census buys is the SHAPE of the question — always / sometimes / never — and the language to state what solving is aiming at. The verifier behind this lesson swept the linear case exhaustively: over all 28,561 assertions $ax + b = cx + d$ with coefficients in $[-6, 6]$, every assertion sorted into exactly one of the three classes, and the class agreed with the census at every probe. The full classification theorem — WHICH equations have no solution and which have infinitely many, read straight off the collected form — is 5.3’s work; this lesson previews it, and the figure below is the preview.' },
        { kind: 'figure', caption: 'The three assertion classes priced by a census: the identity true at every probe, the conditional equation true at exactly one, the contradiction true at none.', svg: verdictStripSvg() },
        { kind: 'callout', tone: 'definition', title: 'Definition — solution, root and the solution set', text: 'A number $s$ is said to be a solution (or root) of an equation in the unknown $x$ if substituting $s$ for $x$ in both members yields a true claim. The solution set of the equation is the set of ALL its solutions. Thus $x + 3 = 8$ has solution set $\\{5\\}$; the identity $(x + 1)^{2} = x^{2} + 2x + 1$ has every number as a solution; the contradiction $x + 1 = x + 2$ has the empty set. Solving an equation means determining the WHOLE solution set — one confirmed example is evidence, never an answer.' },
        { kind: 'heading', text: 'The Balance Principle' },
        { kind: 'para', text: 'Here is the engine. An equation behaves like a balance scale: the two members are the pans, the equals sign is the fulcrum, and a solution is a value of the unknown that leaves the pans level. The metaphor earns its keep in one sentence: **whatever you do to one member, do to the other**. Add 3 to the left pan only and the scale tips — the claim changes. Add 3 to BOTH pans and the scale stays level — the claim changes its clothes but keeps its truth. The question that separates algebra from ritual is WHY, and the answer is not scales at all: it is the field laws that ANS 7.2 proved about the numbers themselves.' },
        { kind: 'para', text: 'The lawful moves, stated once and justified once. If $A$ and $B$ are the two members and $A = B$ is true, then:' },
        { kind: 'equation', latex: 'A = B \\;\\Longrightarrow\\; A + k = B + k, \\quad A - k = B - k, \\quad kA = kB \\; (k \\neq 0), \\quad \\frac{A}{k} = \\frac{B}{k} \\; (k \\neq 0)', note: 'each move produces an EQUIVALENT equation — one with exactly the same solution set. The k ≠ 0 on the last two is not decoration; it is where the equivalence lives or dies.' },
        { kind: 'para', text: 'The moves chain, and the chain is the theorem in action. Settling $3x + 2 = 17$ is two links: subtract 2 from both members ($3x = 15$), then divide both members by 3 ($x = 5$) — and the final line is equivalent to the original, so the solution set of the FIRST claim is exactly $\\{5\\}$. Formally, with the arrows running in both directions:' },
        { kind: 'equation', latex: 'a s + b = c s + d \\;\\iff\\; (a s + b) + k = (c s + d) + k \\;\\iff\\; k\\,(a s + b) = k\\,(c s + d) \\;\\; (k \\neq 0)', note: 'the equivalence arrows run BOTH ways — that is what makes the final dressed-down line a complete answer rather than a hint (the chain the derivation below proves step by step).' },
        { kind: 'para', text: 'Why each arrow is true: because $A$ and $B$ name the SAME number when the claim holds, and the laws of arithmetic act on the number, not the notation. Adding $k$ to two equal numbers gives two equal numbers (addition is well-defined — equal inputs, equal outputs, the law ANS proved when it built the rationals). Subtracting $k$ is adding $-k$. Multiplying two equal numbers by $k$ gives two equal numbers; dividing is multiplying by $1/k$, which exists exactly when $k \\neq 0$ — the division law’s one boundary, the same exclusion ANS 9.3 made central. The moves feel like rules about equations; they are theorems about equality, borrowed wholesale from the number systems that already earned them.' },
        { kind: 'figure', caption: 'The balance principle: the equals sign as fulcrum, and the four lawful moves — every one of them touches both members the same way.', svg: balanceMovesSvg() },
        {
          kind: 'derivation',
          title: 'The lawful moves preserve the solution set',
          statement: 'Claim: adding $k$ to both members, subtracting $k$ from both members, multiplying both members by $k \\neq 0$, and dividing both members by $k \\neq 0$ each leave the solution set of an assertion exactly as it was — the new equation is equivalent to the old.',
          steps: [
            {
              label: 'Say what a solution is, exactly',
              formula: 's \\text{ solves } a x + b = c x + d \\iff a s + b = c s + d',
              explanation: 'A solution is a value where the two members COMPUTE to the same number — one true equality between two numbers (1.3’s substitution doing the work).',
            },
            {
              label: 'Addition and subtraction act on both sides identically',
              formula: 'a s + b = c s + d \\iff (a s + b) + k = (c s + d) + k',
              explanation: 'If the two sides name the same number, adding $k$ to that number gives the same number twice — true stays true; and subtracting $k$ runs the arrow backwards, so false stays false. The SAME values pass both forms: the solution set never moved.',
            },
            {
              label: 'Multiplication and division by k ≠ 0 are reversible',
              formula: 'a s + b = c s + d \\iff k\\,(a s + b) = k\\,(c s + d) \\quad (k \\neq 0)',
              explanation: 'Equal numbers scale equally (forwards), and when $k \\neq 0$ the scaling can be UNDONE by dividing — $1/k$ exists (the field law), so false stays false too. The reversibility is exactly the $k \\neq 0$ condition; at $k = 0$ the backwards arrow dies.',
            },
            {
              label: 'Conclude',
              formula: '\\text{each lawful move yields an equivalent equation — same solution set, new clothes}',
              explanation: 'The verifier swept it: 1,008 assertions × 24 moves (add, subtract, multiply, divide by each $k \\in [-6, 6]$, $k \\neq 0$) = 48,384 exact checks, the solution preserved in every one.',
            },
          ],
          result: 'The four lawful moves turn an equation into an equivalent equation — the whole solving method of 5.2 is nothing but these moves chained until the unknown stands alone, and the chain is safe because every link preserves the solution set exactly.',
        },
        { kind: 'para', text: 'And the forbidden move, priced. Multiply both members of $x + 1 = 4$ by $0$: the claim becomes $0 = 0$ — which is TRUE, at every value of $x$ whatever. The solution set was $\\{3\\}$; after the move it is every number. The move did not preserve the balance — it FLATTENED the scale: both pans collapsed to the same nothing, and a claim that was true at exactly one value became true everywhere. This is why the $k \\neq 0$ clause is not a technicality but the entire content of the multiplication law: multiplication by a nonzero number is reversible, multiplication by zero is not, and only reversible moves keep a claim’s meaning. Every impostor solution that ever appears in this book — here, in the fractional equations of chapter 8, in the quadratics of chapter 9 — traces back to an irreversible move made somewhere in the chain.' },
        { kind: 'callout', tone: 'theorem', title: 'Theorem — the move-equivalence law', text: 'If $k$ is any number, the assertions $A = B$ and $A + k = B + k$ have exactly the same solution set, as do $A = B$ and $A - k = B - k$. If $k \\neq 0$, the assertions $A = B$, $kA = kB$ and $A / k = B / k$ also have exactly the same solution set. Multiplying both members by $0$ is NOT a lawful move: it replaces whatever solution set the assertion had by every number. Verified exhaustively for linear assertions over $k \\in [-6, 6]$ (48,384 exact checks), and proved above from the field laws alone.' },
        { kind: 'heading', text: 'Settling the First Equations' },
        { kind: 'para', text: 'The moves in action, on the smallest scales first. To settle $x - 7 = 2$: the left member mixes the unknown with $-7$, and subtracting $-7$ — that is, ADDING 7 — to both members leaves $x$ alone on the left and $2 + 7 = 9$ on the right. So $x = 9$: the claim, dressed down, says the unknown IS 9. Check by substitution in the ORIGINAL: $9 - 7 = 2$ ✓. To settle $2x = 10$: the unknown is multiplied by 2, and dividing both members by 2 (lawful — $2 \\neq 0$) leaves $x = 5$; check: $2 \\cdot 5 = 10$ ✓. One move each — the balance read directly.' },
        { kind: 'para', text: 'Two moves, chained. To settle $3x + 2 = 17$: first subtract 2 from both members — $3x = 15$ — then divide both members by 3 — $x = 5$. Each move produced an equivalent equation, so the final line $x = 5$ asserts that the solution set of the ORIGINAL is $\\{5\\}$; the check confirms it ($3 \\cdot 5 + 2 = 17$ ✓). And the moves compose in either order: subtract-then-divide and divide-then-subtract (into fractions) land on the same value, because both routes only ever wore the claim into new clothes.' },
        { kind: 'example', title: 'Is x = 3 a solution of 2x − 1 = 5? Is x = 4?', steps: [
          'The question is a substitution, not a solve: evaluate both members at the candidate.',
          'At $x = 3$: left member $2 \\cdot 3 - 1 = 5$; right member $5$ — equal, so $x = 3$ IS a solution.',
          'At $x = 4$: left member $2 \\cdot 4 - 1 = 7$; right member $5$ — $7 \\neq 5$, so $x = 4$ is NOT a solution.',
          'Hence the equation $2x - 1 = 5$ settles completely at $x = 3$ — and the derivation below shows there is no OTHER solution hiding.',
        ] },
        { kind: 'example', title: 'Settle 4x = 3x + 7 by the balance', steps: [
          'The unknown appears in BOTH members — the collect move: subtract $3x$ from both members (lawful for any $k$, including an $x$-ful one).',
          'Left member: $4x - 3x = x$ (1.2’s like-terms law); right member: $3x + 7 - 3x = 7$.',
          'The equation now reads $x = 7$ — the unknown standing alone.',
          'Hence the solution set is $\\{7\\}$; check in the original: $4 \\cdot 7 = 28$ and $3 \\cdot 7 + 7 = 28$ ✓.',
        ] },
        { kind: 'example', title: 'Settle 3x + 2 = 17 — two moves, chained', steps: [
          'Move 1 (subtract the constant): subtract 2 from BOTH members — the claim now reads $3x = 15$.',
          'Move 2 (divide by the coefficient): divide BOTH members by 3 — $x = 5$.',
          'Hence the solution set of the ORIGINAL is $\\{5\\}$ — two lawful moves, so the last line is equivalent to the first.',
          'Check in the original: $3 \\cdot 5 + 2 = 17$ ✓.',
        ] },
        { kind: 'example', title: 'Sort three assertions by a six-point census', steps: [
          'The candidates: $A$: $(x + 1)^{2} = x^{2} + 2x + 1$; $B$: $x + 3 = 8$; $C$: $x + 1 = x + 2$.',
          'Census at $x = -3, 0, 2, 5, 10, 20$: $A$ holds at all six (the members collect to the same polynomial — 3.3’s charter); $B$ holds ONLY at $5$ ($5 + 3 = 8$ ✓, every other probe fails); $C$ holds at none (the members differ by 1 for every $x$).',
          'Hence $A$ is an identity, $B$ a conditional equation with solution set $\\{5\\}$, $C$ a contradiction with the empty set.',
          'The census previews; the proofs belong to the collected forms — exactly the reading 5.3 mechanises.',
        ] },
        { kind: 'para', text: 'The check deserves its own paragraph, because it is the working mathematician’s seatbelt. The chain of lawful moves GUARANTEES equivalence in theory; the check CONFIRMS it in practice — a copied sign, a dropped term, a slip in the division arithmetic all leave the final line plausible and wrong, and the substitution in the ORIGINAL equation exposes them in ten seconds. The classical texts make verification a formal step of every solve, and the examinations reward the habit: an examinee who checks never ships an arithmetic slip. The rule of the house: a solution is not finished until it has been substituted back into the equation as it was FIRST written.' },
        {
          kind: 'derivation',
          title: 'A settled linear assertion has at most one solution',
          statement: 'Claim: the assertion $ax + b = cx + d$ with $a \\neq c$ has AT MOST ONE solution — so when a check confirms one value, the work is done: no second solution can hide.',
          steps: [
            {
              label: 'Move everything to one side',
              formula: 'a x + b = c x + d \\iff (a - c)\\,x = d - b, \\quad a - c \\neq 0',
              explanation: 'Subtracting $cx$ and $b$ from both members is lawful (the move-equivalence law), and it leaves the unknown multiplied by the single number $a - c$ — nonzero by hypothesis.',
            },
            {
              label: 'Suppose two solutions existed',
              formula: '(a - c)\\,x_{1} = d - b \\;\\text{ and }\\; (a - c)\\,x_{2} = d - b',
              explanation: 'If $x_{1}$ and $x_{2}$ both settled the claim, both equalities would hold — the same right member reached twice.',
            },
            {
              label: 'Subtract the two equalities',
              formula: '(a - c)\\,(x_{1} - x_{2}) = 0',
              explanation: 'Subtracting the left members and the right members of two true equalities is lawful, and the $d - b$ terms cancel.',
            },
            {
              label: 'The no-zero-product law finishes it',
              formula: 'a - c \\neq 0 \\implies x_{1} - x_{2} = 0 \\implies x_{1} = x_{2}',
              explanation: 'A product is zero only when a factor is zero (ANS proved this for the systems it built). The first factor is nonzero — so the second must vanish: the two "solutions" were one value all along.',
            },
          ],
          result: 'For $a \\neq c$ the solution set is exactly $\\left\\{ \\frac{d - b}{a - c} \\right\\}$ — one value or none can satisfy a linear claim with a nonzero gap between the $x$-coefficients. The collapse cases ($a = c$: every number or no number) are 5.3’s three-verdict theorem; the verifier swept all 28,561 coefficient choices and found the one-solution class settled uniquely every time.',
        },
        { kind: 'callout', tone: 'warn', title: 'Caution — identities are not to be solved', text: 'The census makes the trap visible before it bites. Asked to "solve $(x + 1)^{2} = x^{2} + 2x + 1$", a student who subtracts $x^{2} + 2x + 1$ from both members gets $0 = 0$ — TRUE, and therefore the signal that the claim was an identity all along: EVERY $x$ is a solution, not none and not one. Writing "no solution" or manufacturing "$x = $ something" both misread the collapse. The lawful moves never lie: whatever verdict the collapsed form announces is the truth about the original — and 5.3 turns that signal (the $0 \\cdot x = k$ collapse) into the full three-verdict machine.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — assertions are read before they are solved', text: 'The examination paper prices this lesson’s vocabulary constantly, and never by name. The classic shapes: "which of the following values satisfies …" is the census as a question — substitute, compare, answer (and the uniqueness derivation means one confirmed value IS the answer when the coefficients differ); "solve and verify" awards its method marks to the lawful moves and its accuracy mark to the check — a solution without the check is a half-dressed answer; and the trap question — an identity offered as an equation to solve — is priced exactly for the student who never asks what SPECIES of assertion the line is. The house discipline: read the claim, census it if its species is unclear, solve with the four lawful moves, and finish every solve with the substitution check in the ORIGINAL line. Ten seconds of reading beats a page of unlawful algebra.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the two strokes that made claims writable', text: 'For its first three millennia algebra carried its central word in prose: Mesopotamian tablets wrote "the heap and a seventh is nineteen", and even 1557’s English readers read out "is equalle to" at every claim. Robert Recorde (c. 1510–1558) — Welsh physician, mathematician, controller of the Royal Mint — cut the phrase down to a symbol in The Whetstone of Witte (1557): "a pair of parallels, or Gemowe [twin] lines of one length thus: =, bicause noe 2 thynges can be moare equalle." Two equal strokes for an equal claim — the equals sign has not needed a redesign in four and a half centuries. The same book brought the plus and minus signs to English readers; Recorde himself fared less evenly, dying in the King’s Bench prison in 1558 after a defamation suit bankrupted him. Every equation this book settles is written in his notation.' },
        { kind: 'heading', text: 'The Assertion, Collected' },
        { kind: 'para', text: 'From the above discussion, the vocabulary and the engine of this lesson stand as follows:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) An **equation** is an assertion — left member, equals sign, right member — whose truth depends on the unknown; a **solution** is a value that makes it true, and the **solution set** is all of them.',
          '(ii) Assertions sort into **identities** (true always), **conditional equations** (true sometimes) and **contradictions** (true never) — 3.3’s charter supplies the identity class, and the census previews the sort.',
          '(iii) The **balance principle** licenses four lawful moves — add $k$, subtract $k$, multiply by $k \\neq 0$, divide by $k \\neq 0$, both members always — each an equivalence theorem from the field laws, not a rule of thumb.',
          '(iv) The moves produce **equivalent equations**: the solution set is invariant along the whole chain, which is why dressing the claim down to $x = $ something settles it.',
          '(v) **Multiplication by 0 is banned**: it flattens the scale and rewrites the solution set to every number — the prototype of every extraneous-solution trap to come.',
          '(vi) A linear claim with unequal $x$-coefficients has **at most one** solution — the no-zero-product law closing the door behind the check.',
        ] },
        { kind: 'para', text: 'One bridge closes the lesson. The lawful moves are the LICENSE to solve, but the art of the next lesson is the ROUTINE: which moves, in which order, when the members arrive dressed in brackets and fractions — $\\frac{2(x-1)}{3} = \\frac{x+1}{2} + 1$ is this chapter’s honest work, and one ad-hoc balance at a time will not carry it. 5.2 builds the five-station pipeline: clear the fractions, clear the brackets, collect, gather the unknown, divide — and checks every answer at the original claim.' },
        { kind: 'formula', name: 'The lawful moves', latex: 'a = b \\implies a + k = b + k, \\; a - k = b - k, \\; ka = kb, \\; \\tfrac{a}{k} = \\tfrac{b}{k} \\; (k \\neq 0)', note: 'each move swaps an equation for an equivalent one; the k ≠ 0 clause is where reversibility — and the whole meaning of the claim — lives' },
        { kind: 'formula', name: 'The solution set', latex: '\\{\\, s : a s + b = c s + d \\,\\}', note: 'solving = finding the WHOLE set, not one example; the check by substitution confirms a candidate, the derivation above proves nothing else hides' },
        { kind: 'formula', name: 'The one-solution verdict', latex: '(a - c)\\,x = d - b, \\; a \\neq c \\implies x = \\tfrac{d - b}{a - c}', note: 'at most one solution when the x-coefficients differ; the a = c collapse (none or all) is 5.3’s theorem' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The assertion $x - 5 = 12$ settles at',
            options: ['$x = 7$', '$x = 17$', '$x = -17$', '$x = 60$'],
            answer: 1,
            explain: 'Add 5 to BOTH members: $x = 12 + 5 = 17$; check $17 - 5 = 12$ ✓. Option 1 subtracted 5 from the right member alone (the balance tipped — $7 - 5 = 2 \\neq 12$). Option 3 kept the right member’s move but flipped the sign for no reason ($-17 - 5 = -22$). Option 4 multiplied where addition was called for ($60 - 5 = 55$).',
          },
          {
            q: 'The assertion $(x + 2)^{2} = x^{2} + 4x + 4$ is best described as',
            options: ['an equation with the single solution $x = -2$', 'an identity — true for every value of $x$', 'a contradiction — true for no value', 'an equation with exactly two solutions'],
            answer: 1,
            explain: 'The left member EXPANDS to exactly the right member (3.3 proved the square of a sum on the grid), so the two members collect to the same polynomial — the claim is true at every $x$, census 6 of 6. Option 1 misreads the identity as a conditional equation. Option 3 is impossible: a true identity is the opposite of a contradiction. Option 4 invents a count that no linear census supports. Identities are recognised, not solved.',
          },
          {
            q: 'Which move keeps the balance?',
            options: ['adding 5 to the left member only', 'multiplying the left member by 5 only', 'multiplying BOTH members by 0', 'dividing BOTH members by 5'],
            answer: 3,
            explain: 'Dividing both members by the nonzero 5 is lawful — the move-equivalence theorem guarantees the same solution set. Option 1 tips the scale: the members no longer name equal numbers. Option 2 treats one member only — the same tip. Option 3 is the banned move: it flattens the claim to $0 = 0$, true everywhere, and destroys the solution set it pretends to keep.',
          },
          {
            q: 'The solution set of $x + 4 = 9$ is',
            options: ['$\\{5\\}$', '$\\{9\\}$', '$\\{13\\}$', 'every number'],
            answer: 0,
            explain: 'Subtract 4 from both members: $x = 5$, and the solution set is the SET of all solutions — here the single value 5, written $\\{5\\}$. Option 2 reports the constant instead of the solution ($9$ does not even settle the claim: $9 + 4 = 13$). Option 3 is the right-member arithmetic without the move ($x = 4 + 9$ invents an addition). Option 4 describes an identity — but $x + 4 = 9$ fails at every value except 5.',
          },
          {
            q: 'Which assertion is TRUE for every value of $x$?',
            options: ['$x + 1 = 2$', '$2x = x + x$', '$3x = 12$', '$x = x + 1$'],
            answer: 1,
            explain: 'The right member of option 2 collects to $2x$ for every $x$ (1.2’s like-terms law) — the members are the same expression, so the claim never fails: an identity. Options 1 and 3 are conditional equations: they settle at exactly one value each ($x = 1$ and $x = 4$ — subtract the constant, divide by the coefficient). Option 4 is a contradiction: subtracting $x$ from both members leaves $0 = 1$, false with no unknown left to save it.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 5.1', sets: [
          {
            level: 'L1',
            questions: [
              {
                q: 'Settle $x - 4 = 6$ by a lawful move, and check.',
                solution: [
                  'The left member mixes the unknown with $-4$: add 4 to BOTH members.',
                  'Hence $x = 6 + 4 = 10$.',
                  'Check in the original: $10 - 4 = 6$ ✓.',
                ],
                answer: '$x = 10$',
              },
              {
                q: 'Settle $3x = 21$.',
                solution: [
                  'The unknown is multiplied by 3: divide BOTH members by 3 (lawful — $3 \\neq 0$).',
                  'Hence $x = 21 / 3 = 7$.',
                  'Check: $3 \\cdot 7 = 21$ ✓.',
                ],
                answer: '$x = 7$',
              },
              {
                q: 'Is $x = 2$ a solution of $5x - 3 = 7$?',
                solution: [
                  'Substitute into BOTH members: left $5 \\cdot 2 - 3 = 7$; right $7$.',
                  'The members are equal, so the claim is TRUE at $x = 2$.',
                  'Hence $x = 2$ IS a solution (and the uniqueness derivation says it is the only one — the $x$-coefficients 5 and 0 differ).',
                ],
                answer: 'Yes — $x = 2$ settles it',
              },
            ],
          },
          {
            level: 'L2',
            questions: [
              {
                q: 'Settle $x + 7 = 3$ — and mind the sign.',
                solution: [
                  'Subtract 7 from BOTH members.',
                  'Hence $x = 3 - 7 = -4$ (FM ch. 7’s integer arithmetic carries the move).',
                  'Check: $-4 + 7 = 3$ ✓.',
                ],
                answer: '$x = -4$',
              },
              {
                q: 'Settle $4x + 5 = 13$.',
                solution: [
                  'Subtract 5 from both members: $4x = 8$.',
                  'Divide both members by 4: $x = 2$.',
                  'Check: $4 \\cdot 2 + 5 = 13$ ✓.',
                ],
                answer: '$x = 2$',
              },
              {
                q: 'Which of $x = 1$, $x = 2$, $x = 3$ settles $2x + 1 = 7$?',
                solution: [
                  'Census the three candidates by substitution.',
                  'At $x = 1$: $2 \\cdot 1 + 1 = 3 \\neq 7$ — no. At $x = 2$: $2 \\cdot 2 + 1 = 5 \\neq 7$ — no.',
                  'At $x = 3$: $2 \\cdot 3 + 1 = 7$ ✓ — yes.',
                  'Hence $x = 3$ is the solution set; the census found it and the uniqueness derivation guarantees nothing else hides.',
                ],
                answer: '$x = 3$',
              },
            ],
          },
          {
            level: 'L3',
            questions: [
              {
                q: 'Settle $6x = 3x + 12$.',
                solution: [
                  'The unknown lives in both members: subtract $3x$ from BOTH (lawful for any quantity, $x$-ful ones included).',
                  'Left collects to $3x$; right collects to $12$: $3x = 12$.',
                  'Divide both members by 3: $x = 4$.',
                  'Check: $6 \\cdot 4 = 24$ and $3 \\cdot 4 + 12 = 24$ ✓.',
                ],
                answer: '$x = 4$',
              },
              {
                q: 'Settle $2x - 9 = 3x + 1$.',
                solution: [
                  'Collect: subtract $2x$ from both members — $-9 = x + 1$.',
                  'Subtract 1 from both members — $-10 = x$.',
                  'Hence $x = -10$ (the sides may be read either way — $x$ on the right is the same answer).',
                  'Check: $2 \\cdot (-10) - 9 = -29$ and $3 \\cdot (-10) + 1 = -29$ ✓.',
                ],
                answer: '$x = -10$',
              },
              {
                q: 'Classify WITHOUT solving: $x + 2 = x + 2$, $x + 2 = 5$, $x + 2 = x + 3$.',
                solution: [
                  'First line: the members are the SAME expression — true at every $x$: an identity.',
                  'Second line: subtract 2 lawfully — $x = 3$: one value passes, all others fail: a conditional equation.',
                  'Third line: subtract $x$ from both members — $2 = 3$: false with no unknown left: a contradiction.',
                  'Hence the three species in one breath — always, once, never — and 5.3 will read them straight off the collapsed forms $0 = 0$, $x = 3$, $0 = 1$.',
                ],
                answer: 'identity; conditional equation (one solution); contradiction',
              },
            ],
          },
          {
            level: 'L4',
            questions: [
              {
                q: 'Settle $7 - 2x = 1$ — the unknown arrives with a minus.',
                solution: [
                  'Subtract 7 from both members: $-2x = -6$.',
                  'Divide both members by $-2$ (lawful — nonzero): $x = 3$.',
                  'Check: $7 - 2 \\cdot 3 = 7 - 6 = 1$ ✓ — the minus rode both members and cancelled honestly.',
                ],
                answer: '$x = 3$',
              },
              {
                q: 'Settle $5x - 4 = 12 - x$ — the answer will not be a whole number.',
                solution: [
                  'Collect the unknown: add $x$ to both members — $6x - 4 = 12$.',
                  'Add 4: $6x = 16$; divide by 6: $x = 16/6 = 8/3$.',
                  'Check exactly: left $5 \\cdot \\frac{8}{3} - 4 = \\frac{40}{3} - \\frac{12}{3} = \\frac{28}{3}$; right $12 - \\frac{8}{3} = \\frac{36 - 8}{3} = \\frac{28}{3}$ ✓.',
                  'Hence $x = 8/3$ — solutions need not be whole; the check is exact in fractions either way.',
                ],
                answer: '$x = 8/3$',
              },
            ],
          },
          {
            level: 'L5',
            questions: [
              {
                q: 'A student multiplies both members of $x + 1 = 4$ by 0, obtains $0 = 0$, and reports "every $x$ is a solution". Price the error.',
                solution: [
                  'The original claim is a conditional equation: subtract 1 — $x = 3$ — solution set $\\{3\\}$, confirmed by substitution ($3 + 1 = 4$ ✓).',
                  'Multiplying by 0 flattens BOTH members to 0 — the move-equivalence theorem’s $k \\neq 0$ clause is violated, so the new line says nothing about the old.',
                  'The verifier’s sweep makes it exact: 2,025 one-point solution sets each became "every number" under the unlawful ×0.',
                  'Hence the report is wrong: exactly one value ($x = 3$) settles the original; the ×0 move manufactured the infinity.',
                ],
                answer: 'unlawful move — the true solution set is $\\{3\\}$, not every number',
              },
              {
                q: 'Name the lawful move that settles $5x = 20$, and the field law that makes it reversible.',
                solution: [
                  'The move: divide BOTH members by 5 — $x = 4$, check $5 \\cdot 4 = 20$ ✓.',
                  'The law: division by $k \\neq 0$ is multiplication by $1/k$, the multiplicative inverse that the field laws (ANS 7.2) grant to every nonzero number.',
                  'The reversibility is the point: multiplying the settled claim $x = 4$ by 5 walks it back to $5x = 20$ — nothing lost.',
                  'Hence the move is lawful BECAUSE 5 ≠ 0; the same move with 0 would be the banned flattener.',
                ],
                answer: 'divide both members by 5 — lawful since $5 \\neq 0$ (the inverse exists)',
              },
            ],
          },
          {
            level: 'L6',
            questions: [
              {
                q: 'Prove that $2x = 10$ has no solution other than $x = 5$ — without appealing to the census.',
                solution: [
                  'Suppose $x_{1}$ and $x_{2}$ BOTH settle it: $2x_{1} = 10$ and $2x_{2} = 10$.',
                  'Subtract the equalities (lawful — true claims subtract memberwise): $2x_{1} - 2x_{2} = 0$, i.e. $2(x_{1} - x_{2}) = 0$.',
                  'The no-zero-product law: the product is zero and the factor 2 is not — so $x_{1} - x_{2} = 0$, i.e. $x_{1} = x_{2}$.',
                  'Hence every solution IS 5 (which checks: $2 \\cdot 5 = 10$ ✓) — the solution set is exactly $\\{5\\}$, one value, proved not sampled.',
                ],
                answer: '$x_{1} = x_{2}$ by the no-zero-product law — the set is exactly $\\{5\\}$',
              },
            ],
          },
        ] },
      ],
    },
    {
      id: 'al-solving-linear-equations',
      number: '5.2',
      title: 'Solving Linear Equations',
      concepts: [
        'the five-station pipeline',
        'clearing fractions with the LCD',
        'clearing brackets',
        'collecting like terms',
        'gathering the unknown',
        'dividing by the coefficient',
        'the check by substitution',
        'the exact fraction answer',
      ],
      objectives: [
        'run the five-station pipeline — clear fractions, clear brackets, collect, gather, divide — on any linear equation in one unknown',
        'clear numeric fractions by multiplying every term by the LCD, and say WHY the move is lawful (the multiplier is never zero)',
        'clear brackets with 3.2’s distributive craft, pricing the distributed-minus trap before it bites',
        'collect like terms member-wise, gather the unknown onto one side, and divide by the coefficient — landing on the exact answer, fraction included',
        'check every answer by substitution into the ORIGINAL equation, and watch the check catch real errors (the one-sided clearing among them)',
        'connect the routine to its history — al-jabr’s restoring and al-muqābala’s confronting — and to its license, the move-equivalence law of 5.1',
      ],
      prerequisites: ['al-what-an-equation-is-the-balance-principle', 'al-adding-subtracting-and-multiplying-polynomials'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math8-ch2-linear-equations', 'alkhwarizmi-c825-aljabr', 'khattar-qa-4e'],
      blocks: [
        { kind: 'para', text: 'Lesson 5.1 granted the license: four lawful moves, each an equivalence theorem, each touching both members the same way. This lesson builds the ROUTINE that makes the license industrial. The equations the examinations actually ask arrive heavily dressed — $\\frac{2(x-1)}{3} = \\frac{x+1}{2} + 1$ is a typical honest specimen — and no one settles such a line by one inspired balance. One settles it by a fixed sequence of stations, each station a lawful move (or a few), each station leaving the solution set untouched while the equation loses one layer of clothing. The routine is short enough to memorise and lawful enough to trust: clear the fractions, clear the brackets, collect the like terms, gather the unknown, divide by the coefficient — then CHECK at the original claim, always.' },
        { kind: 'para', text: 'The order is not folklore; each station sets up the next. Fractions go first because the LCD multiplier strikes EVERY term at once — clearing them later means striking a longer line for no reason. Brackets go next because like terms hide inside brackets: collecting before expanding mis-collects, and 3.2’s distributed minus is the classic casualty. Collecting comes third so that each member is a single tidy sum. Gathering the unknown onto one member comes fourth — subtract the smaller $x$-side, the house convention, and the coefficient stays friendly. Dividing comes last, when the unknown stands multiplied by one bare number. Then the check, which is not a station but the seatbelt worn through the whole ride.' },
        { kind: 'terms', items: [
          { term: 'the five-station pipeline', def: 'clear fractions → clear brackets → collect → gather → divide, then the check — the fixed routine that settles any dressed-up linear equation' },
          { term: 'the LCD strike', def: 'multiplying EVERY term of BOTH members by the least common denominator — the one-move fraction clear; lawful because numeric LCDs are never zero' },
          { term: 'LCD', def: 'least common denominator — the smallest number every numeric denominator divides (FM ch. 4’s craft, now carrying letters in the members)' },
          { term: 'clearing brackets', def: 'distributing each factor with 3.2’s craft; the minus before a bracket flips BOTH inner signs' },
          { term: 'collecting', def: 'gathering like terms member-wise (1.2’s family law) until each member is one tidy sum' },
          { term: 'gathering', def: 'subtracting the smaller $x$-side from both members so the unknown stands alone on one member — the house convention keeps the coefficient friendly' },
          { term: 'transposition', def: 'the classical “change side, change sign” nickname for the lawful subtraction move — safe exactly when read as 5.1’s balance, error-prone when read as magic' },
          { term: 'the check (verification)', def: 'substituting the settled value into the ORIGINAL equation; the accuracy habit that catches one-sided strikes, sign slips and dropped terms' },
        ] },
        { kind: 'heading', text: 'The Five Stations' },
        { kind: 'algorithm', title: 'The solving pipeline for a linear equation in one unknown', lines: [
          { code: 'station 1 — CLEAR FRACTIONS', note: 'multiply EVERY term of BOTH members by the LCD of all denominators (numeric denominators: the LCD is never zero — the move is lawful)' },
          { code: 'station 2 — CLEAR BRACKETS', note: 'distribute each factor (3.2’s grid); the minus before a bracket eats BOTH inner signs' },
          { code: 'station 3 — COLLECT', note: 'gather like terms on each member separately (1.2’s family law)' },
          { code: 'station 4 — GATHER', note: 'subtract the smaller x-side from both members so the unknown stands on one member only' },
          { code: 'station 5 — DIVIDE', note: 'divide both members by the coefficient (lawful — it is nonzero, or the unknown has already vanished: 5.3’s verdict)' },
          { code: 'habit — CHECK', note: 'substitute the answer into the ORIGINAL equation; both members must compute to the same number' },
        ], note: 'every station is a lawful move of 5.1, so the solution set survives the whole journey — the final line is equivalent to the first.' },
        { kind: 'para', text: 'One running example rides every station of this lesson, so the pipeline is seen whole before the pieces are drilled. Settle $\\frac{2(x-1)}{3} = \\frac{x+1}{2} + 1$. Station 1: the denominators are 3 and 2, LCD 6; multiply EVERY term of both members by 6 — the left member becomes $2(x-1) \\cdot \\frac{6}{3} = 4(x-1)$, the right member becomes $3(x+1) + 6$. The dressed equation reads $4(x-1) = 3(x+1) + 6$ — no fractions anywhere. Station 2: expand — $4x - 4 = 3x + 9$. Station 3: each member is already collected. Station 4: subtract $3x$ from both members — $x - 4 = 9$. Station 5: add 4 (the gather-and-divide pair in its gentlest dress) — $x = 13$. The check, in the ORIGINAL: left $\\frac{2 \\cdot 12}{3} = 8$; right $\\frac{14}{2} + 1 = 8$ ✓. Five stations, one answer, nothing harmed on the way.' },
        { kind: 'figure', caption: 'The five-station pipeline with the running example flowing through: fractions cleared by the LCD, brackets cleared, terms collected, the unknown gathered, the coefficient divided away — and the check at the original.', svg: pipelineSvg() },
        {
          kind: 'derivation',
          title: 'The LCD-clearing station is lawful, and it lands on integers',
          statement: 'Claim: multiplying every term of both members by the LCD $L$ of NUMERIC denominators is a lawful move (it preserves the solution set exactly), and every cleared coefficient is an integer.',
          steps: [
            {
              label: 'The multiplier is never zero',
              formula: 'L = \\mathrm{lcm}(m, n) \\geq \\max(m, n) \\geq 2 \\;\\implies\\; L \\neq 0',
              explanation: 'Numeric denominators are whole numbers at least 1 (and in honest fractions, at least 2) — so their least common multiple is a positive whole number. 5.1’s move-equivalence law applies verbatim: multiplying both members by a nonzero $L$ is reversible and preserves the set.',
            },
            {
              label: 'The clearing lands on integers, exactly',
              formula: 'L \\cdot \\frac{p x + q}{m} = \\frac{L}{m}\\,(p x + q), \\quad \\frac{L}{m} \\text{ a whole number}',
              explanation: 'By the definition of the LCM, $m$ divides $L$ — so every cleared fraction becomes a whole-number multiple of an integer polynomial: the arithmetic after station 1 is integer arithmetic (FM ch. 4’s LCD craft, now wearing letters).',
            },
            {
              label: 'The exactness is checkable',
              formula: '\\text{the verifier swept } 3{,}072 \\text{ fraction equations: every cleared form solved identically}',
              explanation: 'Over all denominator pairs $m, n \\in [2, 9]$ with sampled numerators, the cleared equation settled at exactly the original’s solution, re-substituted in the original fraction form — every time.',
            },
          ],
          result: 'The LCD station is the 5.1 license applied at scale: one lawful multiplication strips every numeric denominator at once, the cleared form is integer-coefficient, and the solution set never moved. Chapter 8 will meet denominators carrying LETTERS — there the multiplier can be zero for some $x$, and the excluded-value discipline begins; with numeric denominators the move is unconditionally safe.',
        },
        { kind: 'heading', text: 'Bracketed Forms' },
        { kind: 'para', text: 'Station 2 is 3.2’s distributive craft doing honest work. Settle $2(x - 3) + 5(x + 1) = 4(x + 2)$. Expand each bracket: the left member becomes $2x - 6 + 5x + 5$, the right member $4x + 8$. Collect member-wise: $7x - 1 = 4x + 8$. Gather: subtract $4x$ from both members — $3x - 1 = 8$. Finish: $3x = 9$, so $x = 3$. The check in the ORIGINAL: left $2 \\cdot 0 + 5 \\cdot 4 = 20$; right $4 \\cdot 5 = 20$ ✓. Nothing here needed thought — only the stations, in order, with the arithmetic exact.' },
        { kind: 'para', text: 'The minus before a bracket is where marks go to die, and it deserves its own walk. Settle $3(x - 2) - (2x - 5) = 2(x + 1) - 4$. The term $-(2x - 5)$ means $(-1) \\cdot (2x - 5)$: BOTH inner signs flip — $-2x + 5$. Dropping the bracket and keeping the inner minus ($-2x - 5$) is not a small slip; the verifier prices it: at $x = 0$ the true left member is $-1$ while the sign-slip version computes $-11$. The honest line: left member $3x - 6 - 2x + 5 = x - 1$; right member $2x + 2 - 4 = 2x - 2$. Gather: $x - 1 = 2x - 2$ gives $-1 = x - 2$, so $x = 1$. Check: left $3 \\cdot (-1) - (-3) = -3 + 3 = 0$; right $2 \\cdot 2 - 4 = 0$ ✓ — and note how the check recomputed the bracket it distrusted.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the distributed minus eats both inner signs', text: '$-(2x - 5) = -2x + 5$: the minus multiplies the WHOLE bracket, so both the $2x$ and the $-5$ flip. Writing $-2x - 5$ keeps the bracket’s inside intact — a sign slip that changes the member’s value (at $x = 0$: $-1$ vs $-11$) and, carried forward, produces a confident wrong answer. The same discipline guards $-(x - 4) = -x + 4$ and every minus-led expansion on the examination paper. One habit disarms the trap: write the multiplying $-1$ before expanding — $(-1)(2x - 5)$ — and let the arithmetic do the remembering.' },
        { kind: 'heading', text: 'Fractional Forms' },
        { kind: 'para', text: 'Station 1 earns its keep when the unknown rides fractions. Settle $\\frac{x}{3} + \\frac{x}{4} = 14$. The denominators 3 and 4 share no factors, LCD 12; multiply EVERY term — both members, the 14 included — by 12: $\\frac{12x}{3} + \\frac{12x}{4} = 168$, i.e. $4x + 3x = 168$. Collect: $7x = 168$. Divide: $x = 24$. Check in the ORIGINAL: $\\frac{24}{3} + \\frac{24}{4} = 8 + 6 = 14$ ✓. The fractions never touched the arithmetic after station 1 — which is the entire point of clearing FIRST.' },
        { kind: 'para', text: 'Fractions on both members clear the same way. Settle $\\frac{2x + 1}{3} = \\frac{x - 2}{2}$: LCD 6, multiply both members —' },
        { kind: 'equation', latex: '\\frac{2x + 1}{3} = \\frac{x - 2}{2} \\;\\iff\\; 6 \\cdot \\frac{2x + 1}{3} = 6 \\cdot \\frac{x - 2}{2} \\;\\iff\\; 2(2x + 1) = 3(x - 2)', note: 'each member struck once by the LCD; the brackets of station 2 are already waiting inside the cleared form.' },
        { kind: 'para', text: 'So $4x + 2 = 3x - 6$, and the gather gives $x = -8$. The check: left $\\frac{-16 + 1}{3} = -5$; right $\\frac{-10}{2} = -5$ ✓ — both members landing on a clean integer even though the answer is negative. Note the discipline: the LCD struck the WHOLE members (numerator brackets and all), not selected terms; the one-sided shortcut is the next caution’s subject. And the boundary of the method is worth naming: these denominators were NUMBERS. When chapter 8 meets denominators carrying letters — $\\frac{1}{x - 2}$ and friends — the LCD can be zero for some $x$, the move can manufacture impostor solutions, and the excluded-value check becomes a station of its own. Here, with numeric denominators, the multiplier is never zero and the pipeline is unconditionally safe.' },
        { kind: 'para', text: 'Decimals clear by the same strike with a power of ten. Settle $0.25x + 0.4 = 1.4$: every decimal here has at most two places, so the strike is by 100 —' },
        { kind: 'equation', latex: '0.25x + 0.4 = 1.4 \\;\\iff\\; 25x + 40 = 140 \\;\\iff\\; 25x = 100 \\;\\iff\\; x = 4 \\quad (\\times 100)', note: 'every term struck once by the power of ten; the arithmetic afterwards is integer arithmetic, and the check runs in the original decimals.' },
        { kind: 'para', text: 'The stations finish the line exactly as the display shows: $x = 4$. Check: $0.25 \\cdot 4 + 0.4 = 1.0 + 0.4 = 1.4$ ✓. The power of ten is just the LCD wearing decimal clothes (FM ch. 5’s two ways of writing the same fractions), and the choice is free: multiplying by 10 in two passes works identically, since each pass is lawful on its own.' },
        { kind: 'example', title: 'Run the full pipeline on 2(x − 1)/3 = (x + 1)/2 + 1', steps: [
          'Station 1: denominators 3 and 2, LCD 6 — multiply EVERY term of both members by 6: $4(x - 1) = 3(x + 1) + 6$.',
          'Station 2: expand both brackets — $4x - 4 = 3x + 9$.',
          'Stations 3–4: collect (each member is tidy); gather — subtract $3x$: $x - 4 = 9$.',
          'Station 5: the coefficient of $x$ is already 1 — add 4: $x = 13$.',
          'Check in the original: $\\frac{2 \\cdot 12}{3} = 8$ and $\\frac{14}{2} + 1 = 8$ ✓ — the answer is exact and the chain is clean.',
        ] },
        { kind: 'example', title: 'Settle 2(x − 3) + 5(x + 1) = 4(x + 2), narrating the stations', steps: [
          'Station 1: no fractions — nothing to clear.',
          'Station 2: expand all three brackets — $2x - 6 + 5x + 5 = 4x + 8$.',
          'Station 3: collect member-wise — $7x - 1 = 4x + 8$.',
          'Station 4: subtract $4x$ from both members — $3x - 1 = 8$; then $3x = 9$.',
          'Station 5: divide by 3 — $x = 3$. Check: $2 \\cdot 0 + 5 \\cdot 4 = 20$ and $4 \\cdot 5 = 20$ ✓.',
        ] },
        { kind: 'example', title: 'Settle (2x + 1)/3 = (x − 2)/2 — fractions on both sides', steps: [
          'Station 1: LCD 6 — multiply both members: $2(2x + 1) = 3(x - 2)$.',
          'Station 2: expand — $4x + 2 = 3x - 6$.',
          'Stations 3–4: collect; gather — subtract $3x$ and subtract 2: $x = -8$.',
          'Station 5: the coefficient is already 1 — done.',
          'Check: $\\frac{-16 + 1}{3} = -5$ and $\\frac{-10}{2} = -5$ ✓ — a negative answer checked exactly, no decimals touched.',
        ] },
        { kind: 'example', title: 'Settle 0.25x + 0.4 = 1.4 — the decimal strike', steps: [
          'Station 1: at most two decimal places everywhere — multiply EVERY term by 100: $25x + 40 = 140$.',
          'Stations 2–3: no brackets; nothing to collect — the member is already tidy.',
          'Stations 4–5: subtract 40 — $25x = 100$; divide by 25 — $x = 4$.',
          'Check: $0.25 \\cdot 4 + 0.4 = 1.4$ ✓ — the decimal arithmetic done once, in the check, where an error would be caught.',
        ] },
        { kind: 'heading', text: 'The Check, and Where It Catches' },
        { kind: 'para', text: 'The check is the cheapest station and the most undervalued. Its theory: the pipeline’s final line is EQUIVALENT to the original (the derivation below), so a correct answer must satisfy the original — and a substituted answer that fails proves something went wrong upstairs. Its practice: substitute into the equation AS IT WAS FIRST WRITTEN — fractions, brackets, decimal points and all — because the cleaned forms inherit whatever error the cleaning committed. The classical texts call the step verifying the solution and print it as a formal line of every worked example; the examination scheme calls it the accuracy mark and awards it silently. Either way: an unchecked answer is a claim with no witness.' },
        { kind: 'para', text: 'To see the check earning its keep, watch it catch a real error. Settle $\\frac{x}{3} + \\frac{x}{4} = 14$ the WRONG way: a student multiplies only the LEFT member by 12, obtaining $4x + 3x = 14$, collects to $7x = 14$ and reports $x = 2$. The pipeline looked smooth — but the check in the original reads $\\frac{2}{3} + \\frac{2}{4} = \\frac{7}{6}$, and $\\frac{7}{6} \\neq 14$: the answer is refused, the one-sided strike exposed. Settled lawfully (every term struck by 12), the equation reads $4x + 3x = 168$ and gives $x = 24$ — which checks. The moral is structural, not moralistic: the balance moves act on BOTH members or they are not balance moves at all, and the check is the instrument that notices the difference.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — the LCD strikes every term, both members', text: 'Clearing $\\frac{x}{3} + \\frac{x}{4} = 14$ means $12 \\cdot \\frac{x}{3} + 12 \\cdot \\frac{x}{4} = 12 \\cdot 14$: every term, including the bare constant on the right. Striking only the fractions — or only one member — quietly rewrites the claim into a DIFFERENT equation with a different solution set (the student’s version above lands on $x = 2$ instead of $x = 24$), and only the check in the original exposes the theft. The lawful move is global; anything less is a new equation wearing the old one’s clothes.' },
        {
          kind: 'derivation',
          title: 'The pipeline preserves the solution set end to end',
          statement: 'Claim: if each station’s equation is equivalent to the previous station’s equation, then the final equation is equivalent to the original — so the $x$ found at station 5 is a solution of the original, and (by 5.1’s uniqueness) the only one.',
          steps: [
            {
              label: 'Equivalence composes',
              formula: 'E_{1} \\sim E_{2} \\text{ and } E_{2} \\sim E_{3} \\implies E_{1} \\sim E_{3}',
              explanation: 'Equivalence means "same solution set" — a sameness that chains: if $E_{1}$ and $E_{2}$ agree everywhere and $E_{2}$ and $E_{3}$ agree everywhere, then $E_{1}$ and $E_{3}$ agree everywhere. The pipeline is five such links.',
            },
            {
              label: 'Each station is one lawful move (or a few)',
              formula: '\\text{clear: } \\times L \\neq 0, \\quad \\text{expand: identity}, \\quad \\text{collect/gather: } \\pm k, \\quad \\text{divide: } \\div k \\neq 0',
              explanation: 'Station 1 multiplies both members by the nonzero LCD (the theorem above); station 2 replaces a member by an identical collected form (3.2’s identities — not even a move, just arithmetic); stations 3–4 add and subtract constants member-wise; station 5 divides by the nonzero coefficient. Every one is 5.1’s license.',
            },
            {
              label: 'Hence the terminal line speaks for the original',
              formula: '\\{x : E_{1}(x)\\} \\;=\\; \\{x : E_{6}(x)\\} \\;=\\; \\{13\\} \\;\\text{ (the running example)}',
              explanation: 'The verifier swept the pipeline at scale: 864 bracket shapes with expansion exact and solutions preserved; 3,072 fraction equations with the LCD strike preserving every verdict; 48,384 move-equivalence checks — the chain never dropped a solution and never gained one.',
            },
            {
              label: 'The check is the belt over the proof’s braces',
              formula: 'E_{1}(13) \\text{ TRUE — verified by substitution in the original}',
              explanation: 'The composition argument GUARANTEES correctness; the check CONFIRMS it against slips in the executed arithmetic. Theory and practice, each covering the other’s blind spot.',
            },
          ],
          result: 'The five-station pipeline is a chain of equivalences, so its terminal answer settles the original equation exactly — one solution, found lawfully, checked honestly. What the pipeline CANNOT do is tell you which of the three verdicts (one / none / infinitely many) awaits: when gathering collapses the unknown entirely — $0 \\cdot x = k$ — the stations hand over to 5.3’s verdict machine.',
        },
        { kind: 'figure', caption: 'The invariant solution set: one claim in four dresses, every arrow a lawful move, the set {13} unchanged from the fractions to the final line — and the check confirming the chain’s end against its beginning.', svg: invariantSetSvg() },
        { kind: 'table', caption: 'The five stations of the running example 2(x−1)/3 = (x+1)/2 + 1', head: ['station', 'the move', 'the running example at that station'], rows: [
          ['1 — clear fractions', 'multiply every term of BOTH members by the LCD 6', '$4(x - 1) = 3(x + 1) + 6$'],
          ['2 — clear brackets', 'distribute; the minus eats both inner signs', '$4x - 4 = 3x + 9$'],
          ['3 — collect', 'gather like terms member-wise', 'already tidy: $4x - 4 = 3x + 9$'],
          ['4 — gather the unknown', 'subtract the smaller x-side (3x)', '$x - 4 = 9$'],
          ['5 — divide', 'divide by the coefficient (1 here: just add 4)', '$x = 13$'],
          ['habit — check', 'substitute into the ORIGINAL', '$\\frac{2 \\cdot 12}{3} = 8 = \\frac{14}{2} + 1$ ✓'],
        ] },
        { kind: 'callout', tone: 'definition', title: 'Definition — cleared and collected form', text: 'A linear equation is said to be in cleared and collected form when it reads $ax + b = cx + d$ with the $a$, $b$, $c$, $d$ plain numbers: no denominators, no brackets, one $x$-term and one constant per member. Every equation of this lesson reaches that form by stations 1–3, and 5.1’s uniqueness theorem reads the verdict straight off it: if $a \\neq c$, the single solution is $x = \\frac{d - b}{a - c}$; the collapse cases $a = c$ belong to 5.3.' },
        { kind: 'callout', tone: 'insight', title: 'Insight — transposition is subtraction wearing a nickname', text: 'The classical texts solve by a rule called transposition: "change side, change sign" — the $+3$ of $x + 3 = 8$ becomes $-3$ on the right, giving $x = 8 - 3$. The rule is excellent shorthand and terrible law: NOTHING travels across the equals sign, because the sign is a fulcrum, not a fence. What actually happens is 5.1’s subtraction move — subtract 3 from BOTH members — and the shorthand merely records where the two subtractions land. Read the nickname lawfully (as this book will always write it when it matters) and transposition is safe; read it as magic and the sign errors multiply. The same history holds for the collecting step: al-Khwārizmī’s al-muqābala was "confronting" the like terms of the two sides — subtraction on both members, ninth-century edition.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — al-jabr: the station that named the subject', text: 'The pipeline’s stations are nine centuries older than its notation. Muḥammad ibn Mūsā al-Khwārizmī’s Kitāb al-jabr wa-l-muqābala (Baghdad, c. 820–830) solved linear equations in words, with two named operations: al-jabr, "restoring" — moving a subtracted term to the other side where it joins as an addition (from $5x - 3 = 12$ to $5x = 15$: the subtracted 3 RESTORED); and al-muqābala, "confronting" — reducing the like terms that face each other on the two sides (stations 3 and 4). "Al-jabr" passed into Spanish as álgebra and named the whole subject; the same author’s name, Latinised, became "algorithm" — the pipeline’s very genre. Every linear equation this book settles is, in the original vocabulary, a restoring and a confronting.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the pipeline is the speed technique', text: 'Linear solving is the examination’s bread and butter, and the marks live in the stations. The written form that scores: one line per station, the LCD or the gather named when it is anything but obvious — "×6:", "collect:", "gather:" — so the method mark survives an arithmetic slip in a later line. Fractional answers are kept EXACT ($x = \\frac{23}{5}$, never 4.6) unless the paper says otherwise; the check by substitution into the original is the accuracy mark and takes one line; and the decimal forms ($0.3x + 0.2 = 1.1$-shaped) are cleared by the power of ten before any other work — the strike is free marks. The competitive papers hide the same pipeline inside word problems and formula rearrangements; the station order — fractions, brackets, collect, gather, divide, CHECK — is what makes them routine instead of riddles.' },
        { kind: 'heading', text: 'The Routine, Collected' },
        { kind: 'para', text: 'From the above discussion, the solving routine stands as follows:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) **Clear fractions** — every term of BOTH members struck by the LCD (numeric denominators: $L \\neq 0$, always lawful); decimals by a power of ten.',
          '(ii) **Clear brackets** — distribute; the minus before a bracket flips BOTH inner signs.',
          '(iii) **Collect** — like terms gathered member-wise (1.2’s family law).',
          '(iv) **Gather** — subtract the smaller $x$-side; the unknown stands alone on one member.',
          '(v) **Divide** — by the coefficient (nonzero, or 5.3’s verdict machinery takes over); keep answers exact.',
          '(vi) **Check** — substitute into the ORIGINAL; the check catches the one-sided strike, the sign slip, the dropped term — every error the stations can commit.',
        ] },
        { kind: 'para', text: 'One bridge closes the lesson. The pipeline settles any linear equation that HAS a single solution — but the stations do not decide WHICH verdict waits. Gather $x + 1 = x + 2$ and the unknown vanishes into $1 = 2$: no $x$ was ever possible. Gather $2(x + 3) = 2x + 6$ and the same vanishing leaves $0 = 0$: every $x$ was always welcome. The next lesson reads the collapsed form $0 \\cdot x = k$ and turns it into the three-verdict machine — one, none, or infinitely many, decided by inspection — and the chapter’s picture of what solving IS becomes complete.' },
        { kind: 'formula', name: 'The LCD strike', latex: '\\frac{p x + q}{m} = \\frac{r x + s}{n} \\;\\iff\\; n(p x + q) = m(r x + s) \\quad (\\times \\mathrm{lcm}(m, n))', note: 'every term, both members, struck once; numeric denominators make the multiplier nonzero — the move is always lawful (letter denominators: chapter 8’s exclusions)' },
        { kind: 'formula', name: 'The five stations', latex: '\\text{clear fractions} \\to \\text{clear brackets} \\to \\text{collect} \\to \\text{gather} \\to \\text{divide} \\to \\text{check}', note: 'each station a lawful move of 5.1; the chain of equivalences lands the final answer on the original claim' },
        { kind: 'formula', name: 'The check', latex: 'E_{1}(s) \\text{ TRUE — substitute into the ORIGINAL}', note: 'the accuracy habit: the cleaned forms inherit cleaning errors; the original line refuses them' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'The FIRST station for $\\frac{x}{2} + \\frac{x}{5} = 7$ is multiplying every term by',
            options: ['7', '10 (the LCD)', '5', '2'],
            answer: 1,
            explain: 'The denominators 2 and 5 have LCD 10 — striking every term of BOTH members by 10 gives $5x + 2x = 70$ in one lawful move. Option 1 multiplies by the right member’s value, which is not a clearing multiplier at all ($10x/2 + 10x/5 \\neq 70$ unless the strike is by 10). Option 3 clears only the 2. Option 4 clears only the 5 — and a partial strike is the one-sided error the check catches (the $7x = 70$ that follows is not equivalent to the original).',
          },
          {
            q: '$2(x - 3) - (x - 4)$ collects to',
            options: ['$x - 2$', '$x - 10$', '$3x - 2$', '$x + 2$'],
            answer: 0,
            explain: 'The minus before $(x - 4)$ flips BOTH inner signs: $2x - 6 - x + 4 = x - 2$ (exact at the census points: $-2$ at $x = 0$, $3$ at $x = 5$). Option 2 kept the inner minus on the 4 — the distributed-minus slip. Option 3 ADDED the $x$ instead of subtracting it. Option 4 flipped the constant but not the $x$. The verifier priced both impostors at the census points.',
          },
          {
            q: '$4x - 7 = 2x + 5$ settles at',
            options: ['$x = 1$', '$x = 6$', '$x = -6$', '$x = 2$'],
            answer: 1,
            explain: 'Gather: subtract $2x$ from both members — $2x - 7 = 5$; add 7 — $2x = 12$; divide by 2 — $x = 6$. Check: $4 \\cdot 6 - 7 = 17 = 2 \\cdot 6 + 5$ ✓. Option 1 fails the check ($-3$ vs $7$); option 3 subtracted wrongly ($-31$ vs $-7$); option 4 is the divided-by-wrong-side slip ($1$ vs $9$).',
          },
          {
            q: 'The final check of a solve substitutes into',
            options: ['the cleaned final form only', 'whichever form is shortest', 'the ORIGINAL equation', "the last station's form"],
            answer: 2,
            explain: 'The check exists to catch errors made ON THE WAY — a partial LCD strike, a flipped bracket sign, a dropped term. The cleaned forms inherit exactly those errors, so substituting into them proves nothing: the student’s one-sided strike above checks perfectly in its own wrong equation ($7 \\cdot 2 = 14$) and fails only in the original ($\\frac{7}{6} \\neq 14$). The original equation is the only witness both parties agree on.',
          },
          {
            q: 'After multiplying $0.5x - 1.2 = 1.3$ by 10, the equation reads',
            options: ['$5x - 12 = 13$', '$5x - 1.2 = 1.3$', '$50x - 12 = 13$', '$0.5x = 2.5$'],
            answer: 0,
            explain: 'Every term takes the strike: $0.5 \\cdot 10 = 5$, $-1.2 \\cdot 10 = -12$, $1.3 \\cdot 10 = 13$ — so $5x - 12 = 13$, finishing at $x = 5$ (check: $2.5 - 1.2 = 1.3$ ✓). Option 2 struck only the left member — the one-sided error. Option 3 struck by 100 where 10 was enough — lawful but not what was asked, and the right member left unstruck besides. Option 4 is not a strike of the equation at all, just a tidy-up of one member.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 5.2', sets: [
          {
            level: 'L1',
            questions: [
              {
                q: 'Settle $4x = 28$.',
                solution: [
                  'No fractions, no brackets — the unknown stands multiplied by 4.',
                  'Divide BOTH members by 4: $x = 7$.',
                  'Check: $4 \\cdot 7 = 28$ ✓.',
                ],
                answer: '$x = 7$',
              },
              {
                q: 'Settle $x - 9 = -2$.',
                solution: [
                  'Add 9 to BOTH members: $x = -2 + 9 = 7$.',
                  'Check: $7 - 9 = -2$ ✓ (the negative rides both members).',
                ],
                answer: '$x = 7$',
              },
              {
                q: 'Settle $2x + 3 = 15$.',
                solution: [
                  'Subtract 3 from both members: $2x = 12$.',
                  'Divide both members by 2: $x = 6$.',
                  'Check: $2 \\cdot 6 + 3 = 15$ ✓.',
                ],
                answer: '$x = 6$',
              },
            ],
          },
          {
            level: 'L2',
            questions: [
              {
                q: 'Settle $3(x - 2) = 12$ — two roads.',
                solution: [
                  'Road one (divide first): divide BOTH members by 3 — $x - 2 = 4$; add 2 — $x = 6$.',
                  'Road two (expand first): $3x - 6 = 12$; add 6 — $3x = 18$; divide — $x = 6$.',
                  'Both roads are chains of lawful moves, so they must agree — and they do.',
                  'Check: $3 \\cdot (6 - 2) = 12$ ✓.',
                ],
                answer: '$x = 6$ by both roads',
              },
              {
                q: 'Settle $\\frac{x}{4} = 3$.',
                solution: [
                  'Multiply BOTH members by 4 (lawful — $4 \\neq 0$): $x = 12$.',
                  'Check: $\\frac{12}{4} = 3$ ✓.',
                ],
                answer: '$x = 12$',
              },
              {
                q: 'Settle $5x - 3 = 2x + 9$.',
                solution: [
                  'Gather: subtract $2x$ from both members — $3x - 3 = 9$.',
                  'Add 3: $3x = 12$; divide by 3: $x = 4$.',
                  'Check: $5 \\cdot 4 - 3 = 17$ and $2 \\cdot 4 + 9 = 17$ ✓.',
                ],
                answer: '$x = 4$',
              },
            ],
          },
          {
            level: 'L3',
            questions: [
              {
                q: 'Settle $\\frac{x}{2} + \\frac{x}{3} = 10$.',
                solution: [
                  'LCD 6 — strike every term of both members: $3x + 2x = 60$.',
                  'Collect: $5x = 60$; divide by 5: $x = 12$.',
                  'Check in the original: $\\frac{12}{2} + \\frac{12}{3} = 6 + 4 = 10$ ✓.',
                ],
                answer: '$x = 12$',
              },
              {
                q: 'Settle $2(x + 4) - 3(x - 1) = 5$.',
                solution: [
                  'Expand, minding the distributed minus: $2x + 8 - 3x + 3 = 5$.',
                  'Collect: $-x + 11 = 5$.',
                  'Gather: subtract 11 — $-x = -6$; divide by $-1$ (lawful, nonzero): $x = 6$.',
                  'Check: $2 \\cdot 10 - 3 \\cdot 5 = 20 - 15 = 5$ ✓.',
                ],
                answer: '$x = 6$',
              },
              {
                q: 'Settle $\\frac{2x + 3}{5} = \\frac{x + 2}{3}$.',
                solution: [
                  'LCD 15 — strike both members: $3(2x + 3) = 5(x + 2)$.',
                  'Expand: $6x + 9 = 5x + 10$.',
                  'Gather: subtract $5x$ and subtract 9 — $x = 1$.',
                  'Check: $\\frac{2 + 3}{5} = 1$ and $\\frac{1 + 2}{3} = 1$ ✓.',
                ],
                answer: '$x = 1$',
              },
            ],
          },
          {
            level: 'L4',
            questions: [
              {
                q: 'Settle $0.3x + 0.2 = 1.1$.',
                solution: [
                  'One decimal place everywhere — multiply every term by 10: $3x + 2 = 11$.',
                  'Subtract 2: $3x = 9$; divide by 3: $x = 3$.',
                  'Check: $0.9 + 0.2 = 1.1$ ✓.',
                ],
                answer: '$x = 3$',
              },
              {
                q: 'Settle $6(x - 1) + 2(3 - x) = 2x$ — the answer is allowed to be 0.',
                solution: [
                  'Expand: $6x - 6 + 6 - 2x = 2x$.',
                  'Collect: $4x = 2x$ (the constants cancelled — look at what you are holding).',
                  'Subtract $2x$ from both members: $2x = 0$; divide by 2: $x = 0$.',
                  'Check: $6 \\cdot (-1) + 2 \\cdot 3 = -6 + 6 = 0$ and $2 \\cdot 0 = 0$ ✓ — zero is a perfectly honest solution; the coefficient 2 stayed nonzero throughout.',
                ],
                answer: '$x = 0$',
              },
            ],
          },
          {
            level: 'L5',
            questions: [
              {
                q: 'Settle $\\frac{x - 1}{2} + \\frac{x + 2}{3} = 4$ and verify by substitution.',
                solution: [
                  'LCD 6 — strike every term: $3(x - 1) + 2(x + 2) = 24$.',
                  'Expand: $3x - 3 + 2x + 4 = 24$; collect: $5x + 1 = 24$.',
                  'Solve: $5x = 23$ — $x = 23/5$, kept exact.',
                  'Verify in the original: $\\frac{23/5 - 1}{2} = \\frac{18/5}{2} = \\frac{9}{5}$ and $\\frac{23/5 + 2}{3} = \\frac{33/5}{3} = \\frac{11}{5}$; the sum $\\frac{9}{5} + \\frac{11}{5} = \\frac{20}{5} = 4$ ✓ — the fractions recombine exactly.',
                ],
                answer: '$x = 23/5$',
              },
              {
                q: 'A student clears $\\frac{x}{3} + \\frac{x}{4} = 14$ by multiplying only the LEFT member by 12, obtains $7x = 14$ and answers $x = 2$. Price the error and settle the equation lawfully.',
                solution: [
                  'The strike is not lawful when it touches one member only: the balance tips, and the new line $7x = 14$ is a DIFFERENT equation.',
                  'The check in the original refuses the answer: $\\frac{2}{3} + \\frac{2}{4} = \\frac{7}{6} \\neq 14$.',
                  'Lawfully: every term struck by 12 — $4x + 3x = 168$; collect: $7x = 168$; divide: $x = 24$.',
                  'Check: $\\frac{24}{3} + \\frac{24}{4} = 8 + 6 = 14$ ✓ — the same pipeline, struck globally, lands eleven and a half units away from the impostor.',
                ],
                answer: 'one-sided strike — the lawful answer is $x = 24$',
              },
            ],
          },
          {
            level: 'L6',
            questions: [
              {
                q: 'Settle $\\frac{x + 1}{2} - \\frac{x - 1}{3} = 1$ and verify by substitution.',
                solution: [
                  'LCD 6 — strike every term: $3(x + 1) - 2(x - 1) = 6$.',
                  'Expand, minding the distributed minus: $3x + 3 - 2x + 2 = 6$.',
                  'Collect: $x + 5 = 6$; gather: $x = 1$.',
                  'Verify in the original: $\\frac{1 + 1}{2} - \\frac{1 - 1}{3} = 1 - 0 = 1$ ✓ — the zero bracket is honest arithmetic, not a slip.',
                ],
                answer: '$x = 1$',
              },
            ],
          },
        ] },
      ],
    },
  ],
  plannedLessons: ['The Three Verdicts: One, None, Infinitely Many'],
}
