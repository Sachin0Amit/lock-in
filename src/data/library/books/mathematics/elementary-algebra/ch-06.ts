import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 6: Simultaneous Linear Equations
 *
 * LESSONS WRITTEN: 6.1 Equations in Two Variables (run 77 — quiz keys
 *                  0/2/1/2/1, 14 exercises, two figures, verify-book3-
 *                  ch06.ts sections A–F green) 6.2 Substitution and
 *                  Elimination (run 77 — quiz keys 0/0/2/1/2, 14
 *                  exercises, two figures, sections D–G green); 6.3
 *                  Consistency: the Geometry of Two Lines + the unit-6
 *                  completion review close the chapter at run 78.
 *
 * References for this unit: the banked keys carry the run (zero downloads,
 * web-check only per the runs-71–76 pattern) — `hall-knight-elementary-
 * algebra` (the classical chapter that NAMED simultaneous linear
 * equations: elimination by substitution and by cross-multiplication,
 * the verify-the-solution habit), `ncert-math10-ch3-pair-linear` (the
 * school canon: Pair of Linear Equations in Two Variables — the ratio
 * trichotomy this chapter prices exactly with cross-products, the
 * graphical consistency reading deferred to 6.3), `khattar-qa-4e` (the
 * exam corner: solve-the-system, find-k verdicts, age/cost/mixture
 * narrations), `cengage-jee-style` (the presentation contract).
 *
 * VERIFY-FIRST (2026-11-09, run 77): every number in 6.1 and 6.2 was
 * recomputed by scripts/verify-book3-ch06.ts BEFORE any prose existed —
 * 9,685,095 exact checks across sections A–E (the full 13⁶ system grid
 * 4,769,856 nondegenerate systems: 4,604,912 unique / 157,504 none /
 * 7,440 infinitely many; the D = 0 sub-grid 64,896 systems: 3,264
 * consistent / 61,632 inconsistent; the substitution and elimination
 * engines agree with Cramer everywhere; the licence engines price the
 * scaling and elimination moves). Pre-writing catches: the age-equation
 * sign slip (f − 2s = 12, not −12), the float-precision mixture check
 * (integer acid units instead), the windowed-census miscounts (9 and 12,
 * not 12 and 9), and the figure-plan overrun of the census band.
 */

/* ------------------------------------------------------------------ */
/* Figure 1 (6.1): the system sieve — a pair must pass BOTH.           */
/* Header (30,18,660,44); eq1 panel (24,92,250,70); eq2 panel          */
/* (446,92,250,70); AND junction (285,108,150,84); survivor box        */
/* (220,240,280,52); caption band (30,306,660,24). Geometry pinned in  */
/* verify-book3-ch06.ts plan61Fig1, audited in F.                      */
/* ------------------------------------------------------------------ */

function systemSieveSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A system of two assertions is a sieve: a pair must pass both">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">a system is a sieve — a pair must pass BOTH assertions</text>')
  // eq1 panel
  parts.push('<rect x="24" y="92" width="250" height="70" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="149" y="120" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">x + y = 10</text>')
  parts.push('<text x="149" y="141" font-size="10.5" fill="#0f766e" text-anchor="middle">the pairs that satisfy it:</text>')
  parts.push('<text x="149" y="155" font-size="10.5" fill="#0f766e" text-anchor="middle">every (s, 10 − s)</text>')
  // eq2 panel
  parts.push('<rect x="446" y="92" width="250" height="70" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="571" y="120" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">x − y = 2</text>')
  parts.push('<text x="571" y="141" font-size="10.5" fill="#0f766e" text-anchor="middle">the pairs that satisfy it:</text>')
  parts.push('<text x="571" y="155" font-size="10.5" fill="#0f766e" text-anchor="middle">every (s + 2, s)</text>')
  // AND junction
  parts.push('<rect x="285" y="108" width="150" height="84" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="360" y="138" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">must satisfy</text>')
  parts.push('<text x="360" y="160" font-size="16" fill="#ea580c" text-anchor="middle" font-weight="700">BOTH</text>')
  parts.push('<text x="360" y="180" font-size="11" fill="#0f766e" text-anchor="middle">the system says AND</text>')
  // arrows: panels into the junction, junction down to the survivor
  parts.push('<line x1="274" y1="127" x2="285" y2="127" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="446" y1="127" x2="435" y2="127" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="360" y1="192" x2="360" y2="234" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 355 231 L 360 240 L 365 231" fill="none" stroke="#d97706" stroke-width="1.5"/>')
  // survivor box
  parts.push('<rect x="220" y="240" width="280" height="52" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="360" y="262" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the survivors: (6, 4)</text>')
  parts.push('<text x="360" y="281" font-size="10.5" fill="#0f766e" text-anchor="middle">exactly one pair passes both tests</text>')
  // caption band
  parts.push('<rect x="30" y="306" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="322" font-size="11" fill="#166534" text-anchor="middle">one assertion: a whole family of pairs · two assertions: only the pairs they agree on</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (6.1): the census strip — one equation, many pairs; the    */
/* system keeps only (6,4). Header (30,18,660,44); eq1 label           */
/* (30,84,110,52); census band (144,84,552,52) holding 9 pair boxes    */
/* (152+60i,92,54,36); second-assertion band (30,156,660,36); eq2      */
/* label (30,210,110,52); survivor box (452,210,54,52); result band    */
/* (30,282,660,52). Geometry pinned in plan61Fig2, audited in F.       */
/* ------------------------------------------------------------------ */

function censusStripSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="One equation has many pairs; the system keeps only the pair (6,4)">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">one equation, many pairs — the system keeps only (6, 4)</text>')
  // eq1 label + census band with the nine positive pair boxes
  parts.push('<rect x="30" y="84" width="110" height="52" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="85" y="106" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">x + y = 10</text>')
  parts.push('<text x="85" y="124" font-size="10" fill="#0f766e" text-anchor="middle">the positive pairs</text>')
  parts.push('<rect x="144" y="84" width="552" height="52" rx="8" fill="none" stroke="#16a34a" stroke-width="1"/>')
  const pairLabels = ['(1, 9)', '(2, 8)', '(3, 7)', '(4, 6)', '(5, 5)', '(6, 4)', '(7, 3)', '(8, 2)', '(9, 1)']
  pairLabels.forEach((lab, i) => {
    const x = 152 + i * 60
    const isSurvivor = i === 5
    parts.push(
      `<rect x="${x}" y="92" width="54" height="36" rx="6" fill="${isSurvivor ? '#ffedd5' : 'none'}" stroke="${isSurvivor ? '#ea580c' : '#5eead4'}" stroke-width="${isSurvivor ? 1.5 : 1}"/>`
    )
    parts.push(`<text x="${x + 27}" y="115" font-size="11" fill="${isSurvivor ? '#ea580c' : '#166534'}" text-anchor="middle" font-weight="${isSurvivor ? 700 : 400}">${lab}</text>`)
  })
  // second-assertion band
  parts.push('<rect x="30" y="156" width="660" height="36" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="179" font-size="12.5" fill="#166534" text-anchor="middle">now add the second assertion x − y = 2 — which pairs pass BOTH?</text>')
  // eq2 label + the survivor box aligned under pair box 6
  parts.push('<rect x="30" y="210" width="110" height="52" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="85" y="232" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">x − y = 2</text>')
  parts.push('<text x="85" y="250" font-size="10" fill="#0f766e" text-anchor="middle">the filter</text>')
  // the eight failed positions: small dashed marks (lines, not rects)
  for (let i = 0; i < 9; i++) {
    if (i === 5) continue
    const cx = 152 + i * 60 + 27
    parts.push(`<line x1="${cx - 8}" y1="236" x2="${cx + 8}" y2="236" stroke="#5eead4" stroke-width="1.5" stroke-dasharray="3 3"/>`)
  }
  parts.push('<rect x="452" y="210" width="54" height="52" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="479" y="227" font-size="12" fill="#ea580c" text-anchor="middle" font-weight="700">(6, 4)</text>')
  parts.push('<text x="479" y="241" font-size="8.5" fill="#0f766e" text-anchor="middle">6 + 4 = 10</text>')
  parts.push('<text x="479" y="253" font-size="8.5" fill="#0f766e" text-anchor="middle">6 − 4 = 2</text>')
  // result band
  parts.push('<rect x="30" y="282" width="660" height="52" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="304" font-size="13" fill="#166534" text-anchor="middle" font-weight="700">the solution set of the system: {(6, 4)} — exactly one pair</text>')
  parts.push('<text x="360" y="324" font-size="10.5" fill="#0f766e" text-anchor="middle">the D-test announces this in advance: D = 1·(−1) − 1·1 = −2 ≠ 0</text>')
  parts.push('</svg>')
  return parts.join('')
}


/* ------------------------------------------------------------------ */
/* Figure 1 (6.2): the substitution flow — five stations with the      */
/* running example. Header (30,18,660,44); stations (40/170/300/430/   */
/* 560, 110, 122, 70); running band (30,220,660,44); check band        */
/* (30,284,660,40). Pinned in plan62Fig1, audited in G.                */
/* ------------------------------------------------------------------ */

function substitutionFlowSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="The substitution pipeline: five stations with the running example flowing through">'
  )
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">substitution — five stations, one running example</text>')
  const stations: [string, string][] = [
    ['1 ISOLATE', 'solve one equation for y'],
    ['2 SUBSTITUTE', 'y into the OTHER equation'],
    ['3 SOLVE', 'the 5.2 pipeline'],
    ['4 BACK-SUBST.', 'carry x back for y'],
    ['5 CHECK', 'both originals'],
  ]
  stations.forEach(([title, sub], i) => {
    const x = 40 + i * 130
    parts.push(`<rect x="${x}" y="110" width="122" height="70" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>`)
    parts.push(`<text x="${x + 61}" y="138" font-size="12" fill="#166534" text-anchor="middle" font-weight="700">${title}</text>`)
    parts.push(`<text x="${x + 61}" y="156" font-size="9.5" fill="#0d9488" text-anchor="middle">${sub}</text>`)
  })
  for (let i = 0; i < 4; i++) {
    const x1 = 40 + i * 130 + 122
    parts.push(`<path d="M ${x1 + 2} 145 L ${x1 + 6} 145" stroke="#65a30d" stroke-width="1.5"/>`)
  }
  // the running example band
  parts.push('<rect x="30" y="220" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="45" y="227" width="200" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="145" y="246" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">x + y = 7, 3x − y = 5</text>')
  parts.push('<rect x="255" y="227" width="195" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="352" y="246" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">y = 7 − x → 4x = 12</text>')
  parts.push('<rect x="460" y="227" width="215" height="30" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="567" y="246" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">x = 3, y = 4 → 9 − 4 = 5</text>')
  // the check band
  parts.push('<rect x="30" y="284" width="660" height="40" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<rect x="170" y="291" width="380" height="26" rx="6" fill="none" stroke="#0d9488" stroke-width="1"/>')
  parts.push('<text x="360" y="308" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">habit — check in BOTH originals: 7 = 7 and 5 = 5</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (6.2): the two methods, one truth — convergence strip.     */
/* Header (30,18,660,44); SUBSTITUTION label (30,84,140,44) + steps    */
/* (30,140,300,44) and (30,196,300,44); ELIMINATION label              */
/* (390,84,140,44) + steps (390,140,300,44) and (390,196,300,44);      */
/* convergence box (240,270,240,52). Pinned in plan62Fig2, audited G.  */
/* ------------------------------------------------------------------ */

function twoMethodsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Substitution and elimination converge on the same unique pair">'
  )
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">two methods, one truth — both roads reach the same pair</text>')
  // substitution track
  parts.push('<rect x="30" y="84" width="140" height="44" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="100" y="111" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">SUBSTITUTION</text>')
  parts.push('<rect x="30" y="140" width="300" height="44" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="180" y="160" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">isolate one unknown (the ± 1 coefficient)</text>')
  parts.push('<text x="180" y="176" font-size="10" fill="#0f766e" text-anchor="middle">substitute into the other · run 5.2</text>')
  parts.push('<rect x="30" y="196" width="300" height="44" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="180" y="216" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">back-substitute for the second unknown</text>')
  parts.push('<text x="180" y="232" font-size="10" fill="#0f766e" text-anchor="middle">the substituted line carries −D</text>')
  // elimination track
  parts.push('<rect x="390" y="84" width="140" height="44" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="460" y="111" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">ELIMINATION</text>')
  parts.push('<rect x="390" y="140" width="300" height="44" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="540" y="160" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">scale by the minimal multipliers</text>')
  parts.push('<text x="540" y="176" font-size="10" fill="#0f766e" text-anchor="middle">m₁ = b₂/g · m₂ = −b₁/g · add memberwise</text>')
  parts.push('<rect x="390" y="196" width="300" height="44" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="540" y="216" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">back-substitute for the second unknown</text>')
  parts.push('<text x="540" y="232" font-size="10" fill="#0f766e" text-anchor="middle">the eliminated line carries ±D/g</text>')
  // convergence
  parts.push('<path d="M 330 240 L 340 262" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 390 240 L 380 262" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<rect x="240" y="270" width="240" height="52" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="360" y="292" font-size="12.5" fill="#166534" text-anchor="middle" font-weight="700">the SAME pair (Dx/D, Dy/D)</text>')
  parts.push('<text x="360" y="310" font-size="10" fill="#0f766e" text-anchor="middle">one theorem in two costumes — when D ≠ 0</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* chapter                                                             */
/* ------------------------------------------------------------------ */

export const chapter06: Chapter = {
  number: 6,
  slug: 'simultaneous-linear-equations',
  title: 'Simultaneous Linear Equations',
  summary:
    'Two unknowns, two assertions, one truth: equations in two variables and their solution sets, substitution and elimination as systematic methods with their equivalence shown, and the consistency verdicts — intersecting, parallel, coincident lines — read both algebraically and geometrically. Word problems (age, mixture, cost) become the natural habitat of the method.',
  status: 'in-progress',
  lessons: [
    {
      id: 'al-equations-in-two-variables',
      number: '6.1',
      title: 'Equations in Two Variables',
      concepts: [
        'linear equation in two variables',
        'solution pair',
        'simultaneous system',
        'solution set of a system',
        'the elimination identities D·x = Dx and D·y = Dy',
        'consistent and inconsistent systems',
        'standard form a·x + b·y = c',
        'the pair census',
      ],
      objectives: [
        'test whether a given pair solves an equation, and whether it solves a system',
        'parametrize the solution family of one linear equation in two variables',
        'read the trichotomy verdict of a system off D, Dx and Dy without solving it',
        'produce the unique solution pair from the elimination identities when D ≠ 0',
        'translate a two-condition story into a system of two linear equations',
      ],
      prerequisites: ['al-the-three-verdicts-one-none-infinitely-many', 'al-solving-linear-equations'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch3-pair-linear', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Chapter 5 taught the grammar of one letter: gather, read the verdict, settle the claim. Every equation there was a sentence about a SINGLE unknown — $x$ alone carried the whole story, and the solution was always a number. This chapter doubles the cast. Put two letters on the stage — $x$ and $y$ — and a linear assertion $a x + b y = c$ no longer asks for one number; it asks for a PAIR, a value of each letter taken together. And one assertion about two unknowns is a very loose claim: it tolerates a whole family of pairs at once. To pin anything down, a second assertion must join the first — and then the question becomes the richest question of elementary algebra: which pairs satisfy BOTH sentences at the same time?' },
        { kind: 'para', text: 'That word — at the same time, simultaneously — is the name of the chapter, and it is doing precise work. A system of simultaneous linear equations is two claims about two unknowns that must both be true of the same pair; solving it is finding every pair on which the two claims agree. The chapter runs in three lessons. This one builds the objects: what a solution pair is, what a system is, and the algebraic trichotomy — exactly one pair, no pair, infinitely many — read off three exact cross-products without solving anything. Lesson 6.2 turns settlement into a craft with two systematic methods, substitution and elimination. Lesson 6.3 draws the picture, where the three verdicts become three ways two straight lines can meet. The geometry is coming; today stays algebraic — but the three doors of 5.3 are already visible behind the notation.' },
        { kind: 'heading', text: 'From One Unknown to Two' },
        { kind: 'para', text: 'Start with a story that one letter cannot comfortably carry. Two numbers have sum 10 and difference 2. Try to force it through a single $x$: you may write $x + (x - 2) = 10$ by naming the smaller number in terms of the larger — workable here, but already a small act of translation, and stories with more entangled conditions will resist it. Give each number its own letter: $x$ for the first, $y$ for the second. The story becomes two plain assertions:' },
        { kind: 'equation', latex: 'x + y = 10, \\qquad x - y = 2', note: 'two sentences, two unknowns, one shared pair of values' },
        { kind: 'para', text: 'Arithmetic ingenuity can still finish the job — add the sentences memberwise and $y$ cancels: $2x = 12$, so $x = 6$ and then $y = 4$; indeed $6 + 4 = 10$ and $6 - 4 = 2$. But notice what the ingenuity did: it found a way to talk about BOTH unknowns at once, then collapsed the pair of claims into one claim about one of them. That collapse is not luck — it is a theorem, and this chapter will prove it and turn it into a method. First the objects themselves deserve their definitions, because everything downstream rests on what the word solution now means.' },
        { kind: 'terms', items: [
          { term: 'Linear equation in two variables', def: 'An assertion $a x + b y = c$ with $(a, b) \\neq (0, 0)$ — the members are built from $x$ and $y$ by multiplying by constants and adding; no products of the two unknowns, no powers.' },
          { term: 'Solution pair', def: 'A pair $(s, t)$ that makes an equation in $x$ and $y$ a true sentence: substituting $s$ for $x$ and $t$ for $y$ leaves $a s + b t = c$, a true statement about numbers.' },
          { term: 'Simultaneous system', def: 'Two linear equations in the same two unknowns, required to hold at once — written as a brace. The solution must pass BOTH tests, not either.' },
          { term: 'Solution of the system', def: 'A pair $(s, t)$ satisfying every equation of the system. The system speaks the conjunction AND: each assertion separately is not enough.' },
          { term: 'Solution set of a system', def: 'The collection of ALL solution pairs. For a linear system it is exactly one of three things: a single pair, no pair, or an infinite family — the trichotomy of this lesson.' },
          { term: 'Elimination identities', def: 'The pair of forced equations $D \\cdot x = D_{x}$ and $D \\cdot y = D_{y}$ that every solution of a system satisfies, with $D$, $D_{x}$, $D_{y}$ exact cross-products of the coefficients — the instruments this lesson prices.' },
          { term: 'Consistent, inconsistent', def: 'A system with at least one solution (exactly one, or infinitely many) is consistent; a system with no solution is inconsistent. The geometry of the naming arrives in 6.3.' },
          { term: 'Equivalent systems', def: 'Systems with the SAME solution set — produced lawfully by scaling one equation by a nonzero constant or adding a multiple of one equation to the other, the moves 6.2 rides.' },
        ] },
        { kind: 'heading', text: 'What a Solution Is Now: a Pair' },
        { kind: 'para', text: 'The definition block above deserves a slow reading, because the species of the answer changed. In chapter 5 a solution was a NUMBER — a point of the line that could be circled, checked, boxed. Here a solution of $x + y = 10$ is a PAIR $(s, t)$: two numbers welded together, one for each letter, judged only as a couple. The pair $(6, 4)$ solves it because $6 + 4 = 10$; the pair $(6, 5)$ does not, and neither does $6$ alone — a value of $x$ with no value of $y$ is not yet a candidate at all. This is the first honest shock of the two-variable world: answers have grown a second coordinate.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — solution pair and the census test', text: 'A pair $(s, t)$ is a solution of $a x + b y = c$ exactly when $a s + b t = c$ is a true numerical sentence. To TEST a candidate pair, substitute into the assertion — nothing more. The same test, applied to BOTH equations of a system, decides whether the pair solves the system.' },
        { kind: 'para', text: 'Now ask how many pairs solve the single assertion $x + y = 10$ — and the answer inverts the habit of a lifetime. Chapter 5 trained the eye to expect one number, or a three-way verdict of one, none, infinitely many. Here there is no suspense at all: ONE linear equation in TWO unknowns always has infinitely many solutions (barring the degenerate dress where both coefficients vanish). The census makes it visible. Run $x$ through any list of values and read off the forced $y$:' },
        { kind: 'list', marker: 'roman', items: [
          'at $x = 1$: the equation demands $y = 9$, and indeed $1 + 9 = 10$ — the pair $(1, 9)$ solves it;',
          'at $x = 6$: $y = 4$, the pair $(6, 4)$ — the pair the chapter opened with;',
          'at $x = 0$: $y = 10$, the pair $(0, 10)$, and at $x = 10$: $y = 0$ — the boundary pairs of the positive census;',
          'at $x = 5.5$: $y = 4.5$ — nothing restricts the pairs to whole numbers;',
          'at $x = -3$: $y = 13$ — nothing restricts them to positives either.',
        ] },
        { kind: 'para', text: 'The census is a window, not a proof — nine or eleven agreements do not exhaust a family, exactly as the six-point census of 5.1 never exhausted an identity. The proof of infinitude is the parametrization. Solving the equation for $y$ gives $y = 10 - x$: for EVERY value $s$ of $x$ there is exactly one forced partner $t = 10 - s$, and the pair $(s, 10 - s)$ satisfies the equation by construction — substitute it and both sides read $s + (10 - s) = 10$. One free parameter, one forced partner, pairs without end. This is the honest shape of one two-variable assertion: not a verdict among three, but a family indexed by a free letter. (The verifier swept this parametrization exactly: for every equation $a x + b y = c$ in a 2,184-equation grid, each parametrized pair satisfied the equation with exact arithmetic.)' },
        { kind: 'example', title: 'The census of x + y = 10, continued — the fractional pairs', steps: [
          'The integer census reads $(1, 9), (2, 8), \\ldots, (9, 1)$ — nine positive pairs, eleven when zero is allowed.',
          'But nothing restricts the pairs to integers: at $x = 5.5$ the equation asks for $y = 4.5$, and $5.5 + 4.5 = 10$ — true.',
          'Hence the parametrization $(s, 10 - s)$ carries EVERY solution: for each value of $s$ there is exactly one forced $t$, and the family never ends.',
        ] },
        { kind: 'para', text: 'One loose assertion, then, is a swarm. The discipline returns the moment a second assertion arrives — and the two together behave like a sieve. Each equation independently admits its own infinite family; the system admits only the pairs that belong to BOTH families. Picture the first equation handing you every $(s, 10 - s)$, the second every $(s + 2, s)$, and the system keeping only the pairs that appear on both lists. For the opening story exactly one pair survives:' },
        { kind: 'figure', caption: 'The system as a sieve: each assertion alone admits an infinite family of pairs, and the system keeps only the pairs that pass both tests — here the single pair (6, 4).', svg: systemSieveSvg() },
        { kind: 'heading', text: 'The Shape of a System' },
        { kind: 'para', text: 'The objects deserve their standard dress. A linear equation in two variables is any assertion that can be written' },
        { kind: 'equation', latex: 'a\\,x + b\\,y = c, \\qquad (a, b) \\neq (0, 0)', note: 'the coefficients a, b, c are constants; the unknowns x and y appear to the first power, never multiplied together' },
        { kind: 'para', text: 'The condition $(a, b) \\neq (0, 0)$ is load-bearing. If both coefficients vanish the assertion degenerates to $0 = c$: for $c = 0$ it is true for every pair in existence (it constrains nothing), and for $c \\neq 0$ it is true for none. Either way it is not a claim ABOUT the pair — it is a claim about nothing, and a system containing it either says nothing new (consistent but redundant) or contradicts arithmetic outright. Every nondegenerate assertion genuinely involves at least one of the two unknowns. A system is then two such assertions, conventionally braced and indexed:' },
        { kind: 'equation', latex: '\\left\\{ \\begin{aligned} a_{1}x + b_{1}y &= c_{1} \\\\ a_{2}x + b_{2}y &= c_{2} \\end{aligned} \\right.', note: 'subscript 1 marks the first equation, subscript 2 the second — six constants in the general dress' },
        { kind: 'para', text: 'The testing habit generalizes without change: a pair $(s, t)$ solves the system exactly when BOTH substitutions hold, $a_{1}s + b_{1}t = c_{1}$ AND $a_{2}s + b_{2}t = c_{2}$. Two worked checks price the habit — one pair that passes both gates, one that passes only the first and therefore fails as a system solution.' },
        { kind: 'example', title: 'Is (2, 3) a solution of the system x + 2y = 8, 3x − y = 3?', steps: [
          'Take the pair into the first assertion: $2 + 2(3) = 8$ — true.',
          'Now the second: $3(2) - 3 = 3$ — true.',
          'Hence the pair passes both tests: $(2, 3)$ is a solution of the system — and the D-test below will say it is the ONLY one.',
        ] },
        { kind: 'example', title: 'Is (4, 3) a solution of the system x + y = 7, x − y = 3?', steps: [
          'First assertion: $4 + 3 = 7$ — true.',
          'Second: $4 - 3 = 1 \\neq 3$ — false.',
          'Hence the pair is NOT a solution of the system: satisfying one equation earns nothing toward the other.',
        ] },
        { kind: 'heading', text: 'Three Verdicts, Again — Now for Pairs' },
        { kind: 'para', text: 'With ONE equation the family was infinite and the story ended before it began. With TWO equations the chapter-5 suspense returns in full: how many pairs pass both tests? The question is empirical first. Sweep the opening system $x + y = 10$, $x - y = 2$ over its census: of the eleven nonnegative pairs on the first list, only $(6, 4)$ also satisfies the second. A different pair of assertions — $x + y = 4$ and $x + y = 7$ — keeps nothing at all, since one pair cannot make $s + t$ equal two different numbers. And a third pair of assertions — $2x + 3y = 6$ with $4x + 6y = 12$ — keeps everything the first admits, because the second assertion is just the first with every member doubled. One survivor, none, infinitely many: the trichotomy of 5.3 has returned, lifted to pairs.' },
        { kind: 'para', text: 'Empirics are not yet a theorem, and the verifier did the counting honestly: over the full grid of systems with all six constants running through $-6$ to $6$ — $13^{6}$ systems, of which 4,769,856 are nondegenerate — exactly 4,604,912 have a unique solution, 157,504 have none, and 7,440 hold for infinitely many pairs. Three classes, no fourth, every system in exactly one. The instruments that decide the class without solving anything are three cross-products, built from the six constants:' },
        { kind: 'equation', latex: 'D = a_{1}b_{2} - a_{2}b_{1}, \\qquad D_{x} = c_{1}b_{2} - c_{2}b_{1}, \\qquad D_{y} = a_{1}c_{2} - a_{2}c_{1}', note: 'exact integer arithmetic throughout — no division, no fractions, no approximation' },
        { kind: 'table', caption: 'The three verdicts of a system, read off the exact cross-products', head: ['the instruments', 'verdict', 'meaning for the pairs', 'exhibit'], rows: [
          ['$D \\neq 0$', 'exactly one', 'the assertions agree at exactly one pair', '$x + y = 10$, $x - y = 2$ gives $(6, 4)$'],
          ['$D = 0$, $D_{x}$ or $D_{y} \\neq 0$', 'none', 'the assertions disagree everywhere', '$x + y = 4$, $x + y = 7$'],
          ['$D = 0$, $D_{x} = D_{y} = 0$', 'infinitely many', 'one assertion dressed twice', '$2x + 3y = 6$, $4x + 6y = 12$'],
        ] },
        { kind: 'para', text: 'The verdict test is deliberately division-free. NCERT reads the same trichotomy through the ratios $a_{1}/a_{2}$, $b_{1}/b_{2}$, $c_{1}/c_{2}$ — instructive, but it stumbles whenever a denominator vanishes. The cross-product form never stumbles: $D = 0$ IS the statement that the two left sides are proportional, and $D_{x} = D_{y} = 0$ (with $D = 0$) IS the statement that the whole equations are proportional — one assertion written twice. On the verifier sub-grid of 64,896 zero-determinant systems, exactly 3,264 were consistent (one assertion doubled) and 61,632 inconsistent: proportionality of the left sides is almost never accompanied by proportionality of the constants.' },
        { kind: 'figure', caption: 'The census strip: the nine positive pairs of x + y = 10, the second assertion filtering them to the single survivor (6, 4) — and the D-test announcing the unique-pair verdict in advance.', svg: censusStripSvg() },
        { kind: 'para', text: 'When $D \\neq 0$ the instruments do more than announce uniqueness — they PRODUCE the pair. The production line is the first great theorem of the chapter, and it is chapter 5 wearing subscripts: eliminate one letter, gather what survives, read the answer.' },
        { kind: 'derivation', title: 'Theorem — the elimination identities and the unique pair', statement: 'For a nondegenerate system $a_{1}x + b_{1}y = c_{1}$, $a_{2}x + b_{2}y = c_{2}$ with the instruments $D$, $D_{x}$, $D_{y}$ as above: every solution pair $(s, t)$ of the system satisfies $D \\cdot s = D_{x}$ and $D \\cdot t = D_{y}$. In particular, if $D \\neq 0$ the system has exactly one solution, $(x, y) = (D_{x}/D,\\; D_{y}/D)$.', steps: [
          { label: 'Kill y', formula: 'b_{2}(a_{1}x + b_{1}y) - b_{1}(a_{2}x + b_{2}y) = b_{2}c_{1} - b_{1}c_{2}', explanation: 'Multiply the first equation by $b_{2}$ (the y-coefficient of the SECOND) and the second by $b_{1}$ (the y-coefficient of the FIRST), then subtract memberwise. The y-terms cancel: $b_{2}b_{1} - b_{1}b_{2} = 0$. The move is lawful — it is scaling plus the elimination move, both licensed below.' },
          { label: 'Read the surviving line', formula: '(a_{1}b_{2} - a_{2}b_{1})\\,x = c_{1}b_{2} - c_{2}b_{1}', explanation: 'What survives is one linear equation in $x$ alone — the gathered form $a \\cdot x = k$ of 5.3, now wearing subscripts. Its gathered coefficient is $D$; its right member is $D_{x}$.' },
          { label: 'Do the same for y', formula: '(a_{1}b_{2} - a_{2}b_{1})\\,y = a_{1}c_{2} - a_{2}c_{1}', explanation: 'Multiply the second equation by $a_{1}$ and the first by $a_{2}$ and subtract; now the x-terms cancel instead, leaving $D \\cdot y = D_{y}$.' },
          { label: 'Divide when allowed', formula: 'D \\neq 0 \\;\\Longrightarrow\\; x = \\frac{D_{x}}{D}, \\quad y = \\frac{D_{y}}{D}', explanation: 'If $D \\neq 0$ the division by $D$ is lawful (the ch. 5 licence: divide by any nonzero). The pair is FORCED — and forced twice over, because every solution must satisfy these very identities, so no second pair can hide.' },
          { label: 'The verdict when D = 0', formula: 'D = 0: \\quad D_{x} = D_{y} = 0 \\Rightarrow \\text{infinitely many; otherwise none}', explanation: 'With $D = 0$ the identities degenerate to $0 = D_{x}$ and $0 = D_{y}$. If both right members vanish, the assertions are proportional — one sentence written twice — and every pair of the family solves the system. If either fails, the identities are false for every pair at once: no solution exists.' },
        ], result: 'D ≠ 0: exactly one solution pair, (Dx/D, Dy/D). D = 0 with Dx = Dy = 0: infinitely many pairs. D = 0 otherwise: no pair. Three doors, and the cross-products announce which one opens — before any solving.' },
        { kind: 'para', text: 'The theorem earns its keep immediately on the opening story. For $x + y = 10$, $x - y = 2$: $D = 1 \\cdot (-1) - 1 \\cdot 1 = -2$, $D_{x} = 10 \\cdot (-1) - 2 \\cdot 1 = -12$, $D_{y} = 1 \\cdot 2 - 1 \\cdot 10 = -8$. Since $D \\neq 0$ the pair is forced: $x = -12 / -2 = 6$, $y = -8 / -2 = 4$ — the same $(6, 4)$ the census found, now produced by identity instead of discovered by luck. The check prices it: $6 + 4 = 10$ and $6 - 4 = 2$, both true in the originals.' },
        { kind: 'example', title: 'Read the verdict and produce the pair: x + 2y = 8, 3x − y = 3', steps: [
          'The instruments: $D = 1 \\cdot (-1) - 3 \\cdot 2 = -7$, $D_{x} = 8 \\cdot (-1) - 3 \\cdot 2 = -14$, $D_{y} = 1 \\cdot 3 - 3 \\cdot 8 = -21$.',
          'Since $D = -7 \\neq 0$, the verdict is exactly one pair — announced before any solving.',
          'Produce it: $x = -14 / -7 = 2$ and $y = -21 / -7 = 3$.',
          'Check in the originals: $2 + 2(3) = 8$ and $3(2) - 3 = 3$ — both true. The pair is $(2, 3)$.',
        ] },
        { kind: 'para', text: 'Two commissions close the theory of the lesson. First, the licencing: everything the theorem did rests on two moves — multiplying ONE equation throughout by a nonzero constant, and adding a multiple of one equation to another. The first preserves each equation individually; the second preserves the system, because a pair satisfying both equations satisfies the new combined one (it is $b_{2}$ times the first plus $-b_{1}$ times the second, both zero), and conversely the combined equation plus the first hands back the second. These are the row moves that 6.2 turns into a method, and the verifier rode them across 236,736 exact checks — scaling never changed a solution set, and no replacement equation ever admitted or expelled a pair.' },
        { kind: 'para', text: 'Second, the word for the two healthy classes. A system with at least one solution — exactly one, or the infinitely-many dress — is called CONSISTENT: its two assertions can be true together. A system with none is INCONSISTENT: the assertions jointly contradict each other, as $x + y = 4$ against $x + y = 7$ does. The naming is doing double duty, and in 6.3 it cashes out geometrically: consistency will turn out to be the statement that two lines meet. For now the words are algebraic labels for the trichotomy doors.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — one true assertion is not two', text: 'The commonest error of the chapter is grading a pair on half the evidence. The pair $(4, 3)$ satisfies $x + y = 7$ perfectly — and is NOT a solution of the system, because the second equation fails. A system solution must pass BOTH tests; a single success proves nothing. Check every equation, every time, in the ORIGINALS.' },
        { kind: 'callout', tone: 'insight', title: 'Insight — the verdict machine of 5.3, lifted to pairs', text: 'Nothing here is new machinery — it is 5.3 re-indexed. The gather $a \\cdot x = k$ becomes the identity $D \\cdot x = D_{x}$; the three doors of the gathered form become the trichotomy of $D$; the collapse-closure (verdicts readable at any station) becomes the row-move licence (moves never change the solution set). The subscripts are the only new alphabet. When 6.2 teaches substitution and elimination as methods, they will be 5.2 in two-part harmony.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — consistent and inconsistent, formally', text: 'A system of linear equations is consistent if its solution set is nonempty — exactly one pair, or infinitely many. It is inconsistent if the solution set is empty. For $D \\neq 0$: consistent with a unique pair. For $D = 0$: consistent exactly when $D_{x} = D_{y} = 0$, inconsistent otherwise.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the chapter that named itself', text: 'The English phrase is the classical one: Hall and Knight teach this material in their Elementary Algebra for Schools (1885) under the heading of Simultaneous Linear Equations, and the name says the pedagogy — the equations are solved TOGETHER, never one after the other. The systematic elimination behind the theorem is far older than the name: the Nine Chapters on the Mathematical Art (Chinese, compiled by the early first century CE) settles systems of three equations in three unknowns on the counting board by exactly the multiply-and-subtract moves of 6.2, and Gabriel Cramer (1750) gave the cross-product formulas their lasting form. The D-instruments of this lesson are that rule of 1750 in exact, division-free dress.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — what the examinations ask of this lesson', text: 'Four shapes recur. (1) Straight settlement: solve a two-equation system — 6.2 makes it mechanical, but the D-formulas already deliver the pair at speed. (2) The find-k verdict: for which $k$ does $x + 2y = 3$, $2x + 4y = k$ have no solution (any $k \\neq 6$) or infinitely many ($k = 6$) — the proportionality reading, priced exactly in 6.2. (3) The word problem: sum-and-difference, age and cost stories become two-assertion systems — L5 below and 6.2 both. (4) The partial-check trap as a distractor: options that satisfy one equation only. Every shape reduces to the instruments $D$, $D_{x}$, $D_{y}$ and the check habit.' },
        { kind: 'heading', text: 'The System, Collected' },
        { kind: 'para', text: 'From the above discussion, the vocabulary and the instruments of this lesson stand as follows:' },
        { kind: 'list', marker: 'roman', items: [
          'a linear equation in two variables is $a x + b y = c$ with $(a, b) \\neq (0, 0)$; its solutions are PAIRS $(s, t)$ with $a s + b t = c$;',
          'one such equation admits infinitely many pairs — the parametrized family $(s, (c - a s)/b)$ when $b \\neq 0$ carries them all;',
          'a simultaneous system requires BOTH assertions to hold of the same pair; the system speaks AND;',
          'the instruments $D = a_{1}b_{2} - a_{2}b_{1}$, $D_{x} = c_{1}b_{2} - c_{2}b_{1}$, $D_{y} = a_{1}c_{2} - a_{2}c_{1}$ decide the trichotomy with no division;',
          'every solution satisfies the elimination identities $D \\cdot x = D_{x}$ and $D \\cdot y = D_{y}$; when $D \\neq 0$ the unique pair is $(D_{x}/D, D_{y}/D)$;',
          'a system is consistent (one or infinitely many pairs) or inconsistent (none); the row moves — scale by nonzero, add a multiple — never change the solution set.',
        ] },
        { kind: 'para', text: 'One bridge closes the lesson. The instruments settle WHAT the answer is and HOW MANY; the next lesson industrializes HOW to get it. Two systematic methods — substitution and elimination — will settle any system the examinations can dress up, and both are already in the room: substitution is the census habit run in reverse, elimination is the identity of this theorem promoted to a routine. Bring 5.2; the methods are its stations played on two instruments at once.' },
        { kind: 'formula', name: 'The standard form', latex: 'a\\,x + b\\,y = c, \\qquad (a, b) \\neq (0, 0)', note: 'linear in both unknowns — no products, no powers' },
        { kind: 'formula', name: 'The verdict instruments', latex: 'D = a_{1}b_{2} - a_{2}b_{1}, \\quad D_{x} = c_{1}b_{2} - c_{2}b_{1}, \\quad D_{y} = a_{1}c_{2} - a_{2}c_{1}', note: 'exact cross-products — the trichotomy with no division' },
        { kind: 'formula', name: 'The unique pair', latex: 'D \\neq 0 \\implies (x, y) = \\left( \\frac{D_{x}}{D}, \\; \\frac{D_{y}}{D} \\right)', note: 'forced by the elimination identities D·x = Dx, D·y = Dy' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'Which of these pairs is a solution of BOTH equations of the system $x + y = 7$, $x - y = 3$?',
            options: ['$(5, 2)$', '$(4, 3)$', '$(5, 3)$', '$(2, 5)$'],
            answer: 0,
            explain: '$(5, 2)$: $5 + 2 = 7$ and $5 - 2 = 3$ — both true. $(4, 3)$ passes the first ($7$) but fails the second ($4 - 3 = 1$). $(5, 3)$ fails the first ($8 \\neq 7$). $(2, 5)$ passes the first but gives $2 - 5 = -3 \\neq 3$. A system solution must pass BOTH tests.',
          },
          {
            q: 'How many pairs $(x, y)$ satisfy the single equation $x + 2y = 12$?',
            options: ['exactly one', 'exactly two', 'infinitely many', 'none'],
            answer: 2,
            explain: 'Solve for $x$: $x = 12 - 2y$. Every value of $y$ produces a partner — $(12, 0)$, $(10, 1)$, $(8, 2)$, $(0, 6)$, $(14, -1)$ … — and each pair checks by construction. One equation in two unknowns leaves one free parameter: the family never ends.',
          },
          {
            q: 'The system $x + y = 4$, $x + y = 7$ has:',
            options: ['exactly one solution', 'no solution', 'infinitely many solutions', 'exactly two solutions'],
            answer: 1,
            explain: 'A single quantity $s + t$ cannot equal both 4 and 7 — the assertions disagree everywhere. In the instruments: $D = 1 \\cdot 1 - 1 \\cdot 1 = 0$ and $D_{x} = 4 \\cdot 1 - 7 \\cdot 1 = -3 \\neq 0$ — the none verdict. The system is inconsistent.',
          },
          {
            q: 'In the system $2x + 3y = 6$, $4x + 6y = 12$, the second equation is the first with every member doubled. The system therefore has:',
            options: ['no solution', 'exactly one solution', 'infinitely many solutions', 'exactly two solutions'],
            answer: 2,
            explain: 'Scaling by 2 never changes a solution set, so the second assertion adds no new demand: every pair satisfying the first automatically satisfies the second. The instruments agree — $D = 2 \\cdot 6 - 4 \\cdot 3 = 0$ and $D_{x} = 6 \\cdot 6 - 12 \\cdot 3 = 0$, $D_{y} = 2 \\cdot 12 - 4 \\cdot 6 = 0$: one assertion dressed twice, infinitely many pairs.',
          },
          {
            q: 'Is $(1, 2)$ a solution of the system $3x + y = 5$, $x + y = 4$?',
            options: ['yes — it satisfies the first equation', 'no — it fails the second equation', 'yes — it satisfies both', 'cannot be told without solving the system'],
            answer: 1,
            explain: 'Test the pair: $3(1) + 2 = 5$ — the first assertion holds. But $1 + 2 = 3 \\neq 4$ — the second fails, and one true assertion earns nothing. The pair is not a solution of the system. (Solving is unnecessary: the D-test says $D = 3 \\cdot 1 - 1 \\cdot 1 = 2 \\neq 0$, so the true solution is unique and is NOT this pair.)',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 6.1', sets: [
          { level: 'L1', questions: [
            {
              q: 'Check whether $(3, 1)$ is a solution of the system $x + y = 4$, $x - y = 2$.',
              solution: [
                'Take the pair into the first assertion: $3 + 1 = 4$ — true.',
                'Now the second: $3 - 1 = 2$ — true.',
                'Hence the pair passes BOTH tests: it is a solution of the system.',
              ],
              answer: 'Yes — $(3, 1)$ satisfies both equations.',
            },
            {
              q: 'Write three different solutions of $x + y = 6$.',
              solution: [
                'Fix a value of $x$ and read off the forced partner $y = 6 - x$: at $x = 0$, $y = 6$.',
                'Take $x = 2$: then $y = 4$, and $2 + 4 = 6$ — true.',
                'Take $x = -1$: then $y = 7$, and $-1 + 7 = 6$ — true.',
                'Hence three solutions are $(0, 6)$, $(2, 4)$ and $(-1, 7)$ — and the family continues without end.',
              ],
              answer: '$(0, 6)$, $(2, 4)$, $(-1, 7)$ — one equation in two unknowns never runs out.',
            },
            {
              q: 'Is $(2, 2)$ a solution of the equation $2x + y = 6$? Is it a solution of the system $2x + y = 6$, $x - y = 1$?',
              solution: [
                'Substitute into the equation: $2(2) + 2 = 6$ — true, so the pair satisfies this assertion.',
                'Substitute into the second equation of the system: $2 - 2 = 0 \\neq 1$ — false.',
                'Hence the pair is a solution of the equation but NOT of the system: one true assertion is not two.',
              ],
              answer: 'Yes for the equation; no for the system.',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'Settle by inspection: $x - y = 1$, $x + y = 9$.',
              solution: [
                'Add the two assertions memberwise: $(x - y) + (x + y) = 1 + 9$, so $2x = 10$.',
                'So $x = 5$; then the first equation gives $y = 4$.',
                'Check in the originals: $5 - 4 = 1$ and $5 + 4 = 9$ — both true.',
              ],
              answer: '$(x, y) = (5, 4)$, checked in both originals.',
            },
            {
              q: 'Is $(4, -1)$ a solution of $2x - 3y = 11$? And of the system $2x - 3y = 11$, $x + y = 3$?',
              solution: [
                'First assertion: $2(4) - 3(-1) = 8 + 3 = 11$ — true.',
                'Second: $4 + (-1) = 3$ — true.',
                'Hence the pair satisfies both: it is a solution of the equation AND of the system.',
              ],
              answer: 'Yes to both — $(4, -1)$ passes each test.',
            },
            {
              q: 'Translate into a system and settle: two numbers have sum 15 and difference 3.',
              solution: [
                'Let the numbers be $x$ (the larger) and $y$ (the smaller). The sum reads $x + y = 15$.',
                'The difference reads $x - y = 3$.',
                'Add the equations: $2x = 18$, so $x = 9$; then $y = 15 - 9 = 6$.',
                'Check: $9 + 6 = 15$ and $9 - 6 = 3$ — both true.',
              ],
              answer: 'The numbers are 9 and 6.',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Settle the system $x + 2y = 10$, $x - y = 1$.',
              solution: [
                'Subtract the second equation from the first: $(x + 2y) - (x - y) = 10 - 1$, so $3y = 9$.',
                'So $y = 3$, and the second equation gives $x = 1 + 3 = 4$.',
                'Check in the originals: $4 + 2(3) = 10$ and $4 - 3 = 1$ — both true.',
              ],
              answer: '$(x, y) = (4, 3)$.',
            },
            {
              q: 'Settle $2x + y = 11$ and $x + y = 8$.',
              solution: [
                'Subtract: $(2x + y) - (x + y) = 11 - 8$, so $x = 3$.',
                'Then $y = 8 - 3 = 5$.',
                'Check: $2(3) + 5 = 11$ and $3 + 5 = 8$ — both true.',
              ],
              answer: '$(x, y) = (3, 5)$.',
            },
            {
              q: 'Settle $x = 2y$ together with $3x + 2y = 12$, and explain why the answer is not a pair of whole numbers.',
              solution: [
                'The first equation hands over $x$ already isolated: substitute $x = 2y$ into the second.',
                'The second becomes $3(2y) + 2y = 12$, so $8y = 12$ and $y = \\frac{3}{2}$.',
                'Then $x = 2 \\cdot \\frac{3}{2} = 3$.',
                'Check: $3 = 2 \\cdot \\frac{3}{2}$ and $3(3) + 2 \\cdot \\frac{3}{2} = 9 + 3 = 12$ — both true.',
                'Hence $(x, y) = (3, \\frac{3}{2})$: the half appears because the two conditions together divide by 8, and nothing restricts solution pairs to whole numbers.',
              ],
              answer: '$(x, y) = (3, \\frac{3}{2})$ — solution pairs may be fractional.',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'For which values of $k$ does the system $x + y = 5$, $2x + 2y = k$ have no solution?',
              solution: [
                'The second equation is the first with every member multiplied by 2 — so the two left sides are proportional and $D = 1 \\cdot 2 - 2 \\cdot 1 = 0$ for EVERY $k$: no unique verdict is possible.',
                'Consistency needs the full proportionality: $D_{x} = 5 \\cdot 2 - k \\cdot 1 = 10 - k$ must vanish, that is $k = 10$.',
                'Hence for $k \\neq 10$ the system has NO solution — the assertions demand two different totals from the same sum.',
                'For $k = 10$ the second assertion is exactly the first doubled: infinitely many pairs instead.',
              ],
              answer: 'Every $k \\neq 10$ gives the none verdict.',
            },
            {
              q: 'For which $k$ does the system $x + y = 5$, $2x + 2y = k$ hold for infinitely many pairs?',
              solution: [
                'As above, $D = 0$ always: the verdict is none or infinitely many, never one.',
                'Infinitely many needs $D_{x} = D_{y} = 0$. From $D_{x} = 10 - k$ this forces $k = 10$ (and $D_{y} = 1 \\cdot k - 2 \\cdot 5 = k - 10$ agrees).',
                'Check at $k = 10$: the second assertion reads $2x + 2y = 10$ — exactly the first with both members doubled. Every pair of the family $y = 5 - x$ passes both.',
                'Hence $k = 10$ and no other value.',
              ],
              answer: '$k = 10$ — the two equations become one assertion dressed twice.',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'The sum of two numbers is 32, and twice the larger exceeds the smaller by 25. Find the numbers.',
              solution: [
                'Let the larger be $x$ and the smaller $y$. The sum reads $x + y = 32$.',
                'Twice the larger exceeds the smaller by 25: $2x - y = 25$.',
                'Add the two equations: $3x = 57$, so $x = 19$.',
                'Then $y = 32 - 19 = 13$. Check: $19 + 13 = 32$ and $2(19) - 13 = 38 - 13 = 25$ — both true.',
              ],
              answer: 'The numbers are 19 and 13.',
            },
            {
              q: 'The digits of a two-digit number sum to 9, and exchanging the digits produces a number 27 less. Find the number.',
              solution: [
                'Let the tens digit be $a$ and the units digit $b$, so the number is $10a + b$. The digit sum reads $a + b = 9$.',
                'Exchanging gives $10b + a = (10a + b) - 27$; cancel $a + b$ from both sides to read $b - a = -3$, that is $a - b = 3$.',
                'Add the two equations: $2a = 12$, so $a = 6$ and then $b = 3$.',
                'Check: the number is 63, the exchange is 36, and $63 - 36 = 27$; the digits sum to 9 — both conditions hold.',
              ],
              answer: 'The number is 63.',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Prove that a system of two nondegenerate linear equations in two unknowns can never have exactly two distinct solutions.',
              solution: [
                'Suppose $(s_{1}, t_{1})$ and $(s_{2}, t_{2})$ are two distinct solutions. Subtract the assertions memberwise: $a_{1}(s_{1} - s_{2}) + b_{1}(t_{1} - t_{2}) = 0$ and $a_{2}(s_{1} - s_{2}) + b_{2}(t_{1} - t_{2}) = 0$.',
                'Multiply the first difference by $b_{2}$ and the second by $b_{1}$, then subtract: $(a_{1}b_{2} - a_{2}b_{1})(s_{1} - s_{2}) = 0$ — that is $D \\cdot (s_{1} - s_{2}) = 0$.',
                'If $D \\neq 0$, then $s_{1} = s_{2}$; the same argument with the $a$-multipliers gives $t_{1} = t_{2}$. The solutions coincide — contradiction with distinctness.',
                'So $D = 0$: the left sides are proportional. If the constants are proportional too ($D_{x} = D_{y} = 0$) the solution set is infinite; if not, it is empty.',
                'Hence the count is 0, 1, or infinitely many — the trichotomy admits no exactly-two door.',
              ],
              answer: 'The trichotomy has no two-door outcome: 0, 1, or infinitely many — never exactly two.',
            },
          ] },
        ] },
      ],
    },
    {
      id: 'al-substitution-and-elimination',
      number: '6.2',
      title: 'Substitution and Elimination',
      concepts: [
        'substitution method',
        'back-substitution',
        'elimination method',
        'minimal multipliers',
        'the ×k dress strike (fractions and decimals)',
        'method choice',
        'equivalence of the two methods',
        'the double check in the originals',
      ],
      objectives: [
        'settle any system with D ≠ 0 by substitution, narrating the five stations',
        'settle any system with D ≠ 0 by elimination, choosing minimal multipliers',
        'clear fractional and decimal dresses with the ×k strike before either method',
        'choose the cheaper method from the shape of the coefficients',
        'translate age, cost and mixture stories into systems and settle them end to end',
      ],
      prerequisites: ['al-equations-in-two-variables', 'al-solving-linear-equations'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch3-pair-linear', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lesson 6.1 built the objects and the instruments: solution pairs, the sieve, the cross-products $D$, $D_{x}$, $D_{y}$ and the theorem that produces the unique pair. The instruments are magnificent for verdicts — but as a daily method they ask you to memorize six signed products, and the examinations dress systems in ways that punish memory. This lesson builds the two systematic methods that settle any system the school and examination canons ask for: SUBSTITUTION, which folds one equation into the other until a single unknown remains, and ELIMINATION, which combines the equations memberwise until one unknown dies. Neither introduces a single new licence — both are 5.2, the lawful-moves pipeline, played on two equations at once under the row licence of 6.1.' },
        { kind: 'para', text: 'The chapter arc makes the division of labour precise. Here: the craft, the methods, the dresses and the word problems they were born to solve. In 6.3: the picture, where the verdicts become lines meeting, running parallel, or lying on top of each other. The running example rides along from 6.1 — the sum-10, difference-2 story, whose system $x + y = 10$, $x - y = 2$ hides the pair $(6, 4)$ — and both methods will reach it, by different roads, to the same pair. That convergence is itself a theorem, and the verifier drove it hard: across 6,952 full substitution chains and 7,465 elimination chains on exact rational arithmetic, both methods returned the Cramer pair every single time.' },
        { kind: 'terms', items: [
          { term: 'Substitution method', def: 'Solve one equation of the system for one unknown, then replace that unknown — everywhere in the OTHER equation — by the expression just found. The other equation becomes a linear equation in one unknown, and 5.2 finishes it.' },
          { term: 'Back-substitution', def: 'Returning the settled value of one unknown into an earlier equation to recover the second — the second half of every solution, without which the method stops at half an answer.' },
          { term: 'Elimination method', def: 'Scaling the two equations so that one unknown carries opposite coefficients, then adding memberwise: the unknown cancels — is eliminated — and the surviving equation holds the other unknown alone.' },
          { term: 'Minimal multipliers', def: 'The smallest integer multipliers that engineer the cancellation: $m_{1} = b_{2}/g$ and $m_{2} = -b_{1}/g$ where $g = \\gcd(b_{1}, b_{2})$ — small numbers, fewer errors, the same verdict.' },
          { term: 'The dress strike', def: 'Clearing fractions and decimals BEFORE the method: multiply each equation through by the LCD of its denominators (or the right power of ten). The 5.2 LCD strike, now applied twice.' },
          { term: 'Method choice', def: 'The decision of which method is cheaper on a given system: an isolated unknown or a coefficient 1 invites substitution; aligned or opposite coefficients invite elimination; everything else yields to minimal-multiplier elimination.' },
          { term: 'The double check', def: 'Substituting the settled pair into BOTH ORIGINAL equations — the originals, not any scaled or cleared dress along the way. A pair that passes one equation only is not a solution (6.1).' },
          { term: 'Equivalent systems', def: 'Systems with the same solution set. Substitution and elimination both work by replacing a system with an equivalent one whose solution is visible — the licence comes from the row moves of 6.1.' },
        ] },
        { kind: 'heading', text: 'Substitution: Solve One, Substitute Everywhere' },
        { kind: 'para', text: 'The idea is the census habit of 6.1 run in reverse. There, a value of $x$ FORCED a value of $y$ through $y = 10 - x$. Substitution promotes that forcing to a method: take whichever equation surrenders an unknown most cheaply, solve it for that unknown, and then — wherever the other equation speaks of that unknown — replace the unknown by the expression. What remains is one equation in one unknown, and chapter 5 already owns the pipeline for that. The five stations:' },
        { kind: 'algorithm', title: 'The substitution pipeline for a system with D ≠ 0', lines: [
          { code: 'ISOLATE — pick the equation where an unknown has coefficient ± 1 (or is already alone); solve for it', note: 'cheap isolation makes every later step small' },
          { code: 'SUBSTITUTE — replace that unknown in the OTHER equation by the expression', note: 'never substitute back into the equation you isolated from — it returns an identity and teaches nothing' },
          { code: 'SOLVE — the result is linear in one unknown: run the 5.2 pipeline', note: 'clear brackets, gather, divide' },
          { code: 'BACK-SUBSTITUTE — carry the settled value into the isolation equation; the second unknown falls out', note: 'the isolation equation is already solved for the shape you need' },
          { code: 'CHECK — substitute the pair into BOTH originals', note: 'the court of law; catches every slip upstream' },
        ], note: 'the method is exact for every nondegenerate system with a unique solution; the derivation below says why nothing is lost' },
        { kind: 'para', text: 'The station names are not decoration — each one is a place the examinations probe. The cleanest starting system is one where the isolation is free:' },
        { kind: 'example', title: 'Settle y = 2x together with x + y = 9 by substitution', steps: [
          'The first equation is ALREADY isolated: $y = 2x$.',
          'Substitute into the second: $x + 2x = 9$, so $3x = 9$.',
          'Solve the one-unknown line: $x = 3$.',
          'Back-substitute: $y = 2 \\cdot 3 = 6$.',
          'Check in the originals: $6 = 2 \\cdot 3$ and $3 + 6 = 9$ — both true.',
        ] },
        { kind: 'para', text: 'When no unknown arrives isolated, isolate the one with the cheapest coefficient — a $\\pm 1$ beats every other choice, because it makes the isolation a single move:' },
        { kind: 'example', title: 'Settle x + y = 7 and 3x − y = 5 by substitution', steps: [
          'The first equation isolates $y$ at the cost of one subtraction: $y = 7 - x$.',
          'Substitute into the second: $3x - (7 - x) = 5$.',
          'Clear the minus and gather: $3x - 7 + x = 5$, so $4x = 12$.',
          'Solve: $x = 3$; back-substitute: $y = 7 - 3 = 4$.',
          'Check in the originals: $3 + 4 = 7$ and $3(3) - 4 = 5$ — both true.',
        ] },
        { kind: 'para', text: 'The distributed minus on the substituted step — $-(7 - x)$ — is exactly the 5.2 caution: it eats both inner signs. Every slip of this lesson is an old slip wearing a new costume, which is why 5.2 is a prerequisite and why the check station is not optional.' },
        { kind: 'derivation', title: 'Theorem — substitution loses nothing', statement: 'Let the system $a_{1}x + b_{1}y = c_{1}$, $a_{2}x + b_{2}y = c_{2}$ have $b_{1} \\neq 0$. The pairs satisfying the system are exactly the pairs $(s, t)$ with $t = (c_{1} - a_{1}s)/b_{1}$ where $s$ solves the substituted equation $a_{2}x + b_{2}(c_{1} - a_{1}x)/b_{1} = c_{2}$. In particular the substituted equation has exactly one solution when $D \\neq 0$, and the method finds every solution — none is lost and none is invented.', steps: [
          { label: 'The isolation is an equivalence', formula: 'b_{1} \\neq 0: \\quad a_{1}x + b_{1}y = c_{1} \\;\\iff\\; y = \\frac{c_{1} - a_{1}x}{b_{1}}', explanation: 'Dividing by $b_{1}$ is a lawful move of chapter 5 — every solution pair of the first equation makes the isolation sentence true, and conversely.' },
          { label: 'Substitution is composition', formula: 'a_{2}s + b_{2}\\,\\frac{c_{1} - a_{1}s}{b_{1}} = c_{2}', explanation: 'A pair satisfies the system exactly when the first equation forces $t = (c_{1} - a_{1}s)/b_{1}$ AND the second holds. Replacing $y$ by that forced expression in the second equation says precisely: the second holds at the forced partner.' },
          { label: 'The substituted line is the gathered system', formula: '(a_{2}b_{1} - a_{1}b_{2})\\,x = c_{2}b_{1} - c_{1}b_{2}', explanation: 'Clearing the inner denominator gives a linear equation in $x$ alone — and multiplying through by $b_{1}$ is exact (nonzero). Its coefficient is $-D$ and its right member is $-D_{x}$: the substituted line IS the elimination identity of 6.1 in another dress.' },
          { label: 'Divide and return', formula: 'x = \\frac{D_{x}}{D}, \\qquad y = \\frac{c_{1} - a_{1}x}{b_{1}}', explanation: 'When $D \\neq 0$ the substituted line has exactly one solution $s$; the isolation equation then hands over exactly one partner $t$. The pair produced satisfies both originals — substitution found THE solution, whole.' },
        ], result: 'Substitution is a re-dressing of the 6.1 theorem: the substituted one-unknown line carries −D as its coefficient, so the method works exactly when D ≠ 0 and returns the same unique pair the identities force. Nothing lost, nothing invented.' },
        { kind: 'heading', text: 'Elimination: Scale, Add, Read' },
        { kind: 'para', text: 'Substitution shines when an unknown surrenders cheaply. When neither does — coefficients like 3 and 7 on both unknowns — substitution drags fractions through every station, and a second method earns its keep. Elimination never solves for anything: it makes the two equations ATTACK each other. Choose the unknown to destroy; scale each equation by the multiplier that gives that unknown opposite coefficients; add the equations memberwise. The chosen unknown cancels to $0$, and the surviving equation is linear in the other unknown alone. The five stations:' },
        { kind: 'algorithm', title: 'The elimination pipeline for a system with D ≠ 0', lines: [
          { code: 'DRESS — clear fractions and decimals first (the ×k strike): every equation in ax + by = c form', note: 'integer coefficients make the multipliers visible' },
          { code: 'CHOOSE — pick the unknown whose coefficients have the smaller product or are already opposites', note: 'the LCM of the two coefficients prices the work' },
          { code: 'SCALE — multiply each equation by its minimal multiplier so the chosen unknown carries opposite coefficients', note: 'm1 = b2/g and m2 = −b1/g with g = gcd: minimal by construction' },
          { code: 'ADD — add the equations memberwise; the chosen unknown cancels; solve the one-unknown line', note: 'this is the row licence of 6.1 at work' },
          { code: 'BACK-SUBSTITUTE and CHECK — the settled value returns through an ORIGINAL equation for the second unknown; then both originals test the pair', note: 'never check in a scaled dress alone' },
        ], note: 'exact for every nondegenerate system with a unique solution — the surviving coefficient is ±D/g, never 0 when D ≠ 0' },
        { kind: 'para', text: 'The running example needs no scaling at all — its y-coefficients are already opposites, $+1$ and $-1$:' },
        { kind: 'example', title: 'Settle x + y = 10 and x − y = 2 by elimination', steps: [
          'The y-coefficients are already opposites: no scaling needed.',
          'Add memberwise: $(x + y) + (x - y) = 10 + 2$, so $2x = 12$.',
          'Solve: $x = 6$.',
          'Back-substitute through the FIRST original: $6 + y = 10$, so $y = 4$.',
          'Check in both originals: $6 + 4 = 10$ and $6 - 4 = 2$ — the pair is $(6, 4)$, the census pair of 6.1, now produced systematically.',
        ] },
        { kind: 'para', text: 'When the coefficients are not yet opposites, the minimal multipliers do the engineering with the smallest possible numbers. To kill $y$ in the general system, scale the first by $b_{2}/g$ and the second by $-b_{1}/g$, where $g$ is the greatest common divisor of $b_{1}$ and $b_{2}$ — the scaled coefficients become $b_{2}b_{1}/g$ and $-b_{1}b_{2}/g$, perfect opposites, and no smaller pair of multipliers achieves it:' },
        { kind: 'example', title: 'Settle 2x + 3y = 8 and 3x − y = 1 by elimination', steps: [
          'Kill $y$: its coefficients are 3 and $-1$, with $g = \\gcd(3, 1) = 1$ — minimal multipliers $m_{1} = 1$, $m_{2} = 3$.',
          'Scale the second equation by 3: $9x - 3y = 3$. The first stays as it is.',
          'Add memberwise: $(2x + 3y) + (9x - 3y) = 8 + 3$, so $11x = 11$.',
          'Solve: $x = 1$; back-substitute through the second original: $3(1) - y = 1$, so $y = 2$.',
          'Check in both originals: $2(1) + 3(2) = 8$ and $3(1) - 2 = 1$ — both true.',
        ] },
        { kind: 'example', title: 'Eliminate x instead: 3x + 2y = 12 and 5x − 2y = 4', steps: [
          'The x-coefficients 3 and 5 would cost multipliers 5 and 3 (products 15); the y-coefficients 2 and $-2$ are ALREADY opposites — eliminate y, not x.',
          'Add memberwise: $(3x + 2y) + (5x - 2y) = 12 + 4$, so $8x = 16$.',
          'Solve: $x = 2$; back-substitute: $3(2) + 2y = 12$, so $y = 3$.',
          'Check in the originals: $3(2) + 2(3) = 12$ and $5(2) - 2(3) = 4$ — both true.',
        ] },
        { kind: 'para', text: 'The choice inside the method — which unknown to kill — is priced by the products of the coefficients: 15 against 4 in that last example, and the smaller product wins. The same pricing decides BETWEEN the methods, and the next figure shows both pipelines side by side with the running example flowing through each.' },
        { kind: 'figure', caption: 'The substitution pipeline: five stations from isolation to the double check, with the running example x + y = 7, 3x − y = 5 flowing through every station to the pair (3, 4).', svg: substitutionFlowSvg() },
        { kind: 'heading', text: 'Dresses First: Fractions and Decimals' },
        { kind: 'para', text: 'The 5.2 discipline transfers verbatim: a system arrives dressed, and the dress is cleared BEFORE any method touches it. Each equation is struck independently — multiply through by the LCD of its own denominators, or by the right power of ten — and the strike is lawful because it is scaling by a nonzero constant, the oldest licence in the book. The fraction dress:' },
        { kind: 'equation', latex: '\\frac{x}{2} + \\frac{y}{3} = 8, \\quad \\frac{x}{6} - \\frac{y}{6} = 1 \\;\\xrightarrow{\\;\\times 6\\;}\\; 3x + 2y = 48, \\quad x - y = 6', note: 'each equation struck by the LCD of its OWN denominators — 6 for both here' },
        { kind: 'para', text: 'The cleared system settles by substitution at speed: the second equation hands over $x = y + 6$, and the first becomes $3(y + 6) + 2y = 48$, so $5y = 30$, $y = 6$, and $x = 12$. The check must visit the ORIGINALS — the fractions included: $12/2 + 6/3 = 6 + 2 = 8$ and $12/6 - 6/6 = 2 - 1 = 1$, both true. The decimal dress strikes the same way when the decimals are exact:' },
        { kind: 'equation', latex: '0.5x + 0.25y = 10, \\quad 0.75x - 0.25y = 5 \\;\\xrightarrow{\\;\\times 4\\;}\\; 2x + y = 40, \\quad 3x - y = 20', note: '×4 clears quarters exactly — 0.5, 0.25 and 0.75 are dyadic, so no rounding is invented' },
        { kind: 'para', text: 'Adding the cleared equations kills $y$ outright: $5x = 60$, so $x = 12$ and $y = 40 - 24 = 16$. Check in the original decimals: $0.5(12) + 0.25(16) = 6 + 4 = 10$ and $0.75(12) - 0.25(16) = 9 - 4 = 5$ — both true. One honesty note rides with the method: the ×4 strike is exact only because the decimals are quarters. A dress like $0.1x + 0.2y = 0.3$ strikes by ×10, also exact in tenths; a dress with genuine non-terminating decimals never appears in honest problems — if you meet one, the problem was mis-stated.' },
        { kind: 'example', title: 'Run the fraction dress end to end: x/2 + y/3 = 8, x/6 − y/6 = 1', steps: [
          'Strike each equation by the LCD of its own denominators: ×6 gives $3x + 2y = 48$ and $x - y = 6$.',
          'The second equation isolates $x$ cheaply: $x = y + 6$.',
          'Substitute into the first cleared equation: $3(y + 6) + 2y = 48$, so $5y + 18 = 48$ and $5y = 30$.',
          'Solve: $y = 6$; back-substitute: $x = 12$.',
          'Check in the ORIGINAL fraction dress: $12/2 + 6/3 = 8$ and $12/6 - 6/6 = 1$ — both true.',
        ] },
        { kind: 'figure', caption: 'The two methods, one truth: substitution isolates and folds, elimination scales and adds — both converge on the same unique pair when D ≠ 0, and both end at the double check.', svg: twoMethodsSvg() },
        { kind: 'heading', text: 'Choosing the Cheaper Method' },
        { kind: 'para', text: 'The methods are tools, not ideologies, and the examinations time you. The decision procedure is short. (1) If an unknown is already isolated, or has a $\\pm 1$ coefficient, SUBSTITUTION starts for free — the isolation station costs nothing. (2) If the coefficients of one unknown are already opposites (or equal), ELIMINATION needs no scaling — the add station fires immediately. (3) If neither, ELIMINATION with minimal multipliers is the mechanical road: two multiplications and an add, with the arithmetic sized by the gcd. (4) If the question asks only for the VERDICT — none, one, infinitely many, or a find-$k$ — skip both methods and read the instruments $D$, $D_{x}$, $D_{y}$ of 6.1. And whatever the road, the settlement ends at the same court: both originals.' },
        { kind: 'example', title: 'One system, both methods: x + 2y = 11 and 2x − y = 7', steps: [
          'SUBSTITUTION: the first equation isolates $x = 11 - 2y$; the second becomes $2(11 - 2y) - y = 7$, so $22 - 5y = 7$, $y = 3$, and $x = 5$.',
          'ELIMINATION: kill $y$ — coefficients $2$ and $-1$ with $g = 1$, so scale the second by 2: $4x - 2y = 14$; add: $5x = 25$, $x = 5$; back-substitute: $y = 3$.',
          'Both roads deliver $(5, 3)$; the check in the originals: $5 + 2(3) = 11$ and $2(5) - 3 = 7$ — both true.',
          'Hence the methods are interchangeable here; substitution cost one isolation, elimination cost one scaling — read the coefficients and pick.',
        ] },
        { kind: 'para', text: 'That the two roads ALWAYS agree is not an observation — it is the theorem of this lesson, and the verifier made it concrete: 6,952 substitution chains and 7,465 minimal-multiplier elimination chains, every one landing on the identical Cramer pair. The reason sits in the derivations: the substituted line carries coefficient $-D$, the eliminated line carries $\\pm D/g$ — both are the SAME elimination identity of 6.1 wearing different algebra, so both solve to $x = D_{x}/D$ and the back-substitutions agree. Two methods, one theorem, one pair.' },
        { kind: 'para', text: 'The methods also earn their habitat in this lesson: word problems. A story with two unknown quantities and two independent conditions translates into a system — name the unknowns, dress each condition as a linear equation, settle by the cheaper method, and CHECK against the STORY, not just the equations. Three classic structures cover most of the examination ground: ages (two people, two moments in time), costs (two goods, two totals) and mixtures (two solutions, one blend). Each gets a full narration here; chapter 11 returns to the genre with the whole toolkit of the book.' },
        { kind: 'example', title: 'Ages: a father is 30 years older than his son; in 12 years he will be twice as old. Find their ages.', steps: [
          'Name the unknowns: father $f$, son $s$ NOW.',
          'Condition 1: $f = s + 30$ — the age gap is constant, so it holds now and forever.',
          'Condition 2: in 12 years, $f + 12 = 2(s + 12)$ — twice the age, and both ages age.',
          'Dress the second: $f + 12 = 2s + 24$, so $f - 2s = 12$.',
          'Substitute $f = s + 30$: $s + 30 - 2s = 12$, so $-s = -18$ and $s = 18$, $f = 48$.',
          'Check against the STORY: $48 = 18 + 30$ now, and in 12 years $60 = 2 \\times 30$ — the father will be exactly twice as old.',
        ] },
        { kind: 'example', title: 'Costs: 3 pens and 2 pencils cost 42 rupees; 5 pens and 4 pencils cost 74. Find each price.', steps: [
          'Name the unknowns: pen $p$, pencil $q$.',
          'The two purchases dress as $3p + 2q = 42$ and $5p + 4q = 74$.',
          'Eliminate $q$: coefficients 2 and 4 with $g = 2$ — minimal multipliers $m_{1} = -2$, $m_{2} = 1$. Scale the first by $-2$: $-6p - 4q = -84$; add the second: $-p = -10$, so $p = 10$.',
          'Back-substitute: $3(10) + 2q = 42$, so $2q = 12$ and $q = 6$.',
          'Check against the STORY: $3(10) + 2(6) = 42$ and $5(10) + 4(6) = 74$ — pens cost 10 rupees, pencils 6.',
        ] },
        { kind: 'example', title: 'Mixture: how many litres of 20 percent and 50 percent acid make 6 litres of 40 percent?', steps: [
          'Name the unknowns: $a$ litres of the 20 percent, $b$ litres of the 50 percent.',
          'Condition 1 (total volume): $a + b = 6$.',
          'Condition 2 (pure acid): $0.2a + 0.5b = 0.4 \\times 6 = 2.4$ — the acid balances.',
          'Strike the second by 10: $2a + 5b = 24$. Substitute $a = 6 - b$: $12 - 2b + 5b = 24$, so $3b = 12$, $b = 4$, $a = 2$.',
          'Check against the STORY: $2 + 4 = 6$ litres, and the acid is $0.4 + 2.0 = 2.4$ litres — exactly 40 percent of 6.',
        ] },
        { kind: 'callout', tone: 'warn', title: 'Caution — substitute into the OTHER equation, and check in the originals', text: 'Two classic wastes of a whole page. (1) Substituting back into the equation you isolated FROM returns $0 = 0$ and teaches nothing — the second equation is the only one that carries information. (2) Checking in a cleared or scaled dress instead of the originals hides dress-making errors: a wrong LCD strike passes its own dressed check and fails the original. The court of final appeal is the system as given.' },
        { kind: 'callout', tone: 'insight', title: 'Insight — the methods are one theorem in two costumes', text: 'Substitution eliminates $y$ by REPLACING it with its forced value; elimination eliminates $y$ by CANCELLING its coefficient. Algebraically both produce the same one-unknown line with coefficient $\\pm D$ — the 6.1 identity $D \\cdot x = D_{x}$. So the choice between methods is never about truth, only about arithmetic weight: count the multiplications each road demands and take the lighter one.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — minimal multipliers', text: 'For eliminating the unknown with coefficients $b_{1}$ and $b_{2}$ (not both zero), let $g = \\gcd(b_{1}, b_{2})$. The minimal multipliers are $m_{1} = b_{2}/g$ and $m_{2} = -b_{1}/g$: they give $m_{1}b_{1} + m_{2}b_{2} = 0$ exactly, and no integer pair of smaller size does. The surviving coefficient is $(a_{1}b_{2} - a_{2}b_{1})/g = D/g$ — nonzero exactly when $D \\neq 0$.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the counting board and the field of a problem', text: 'Elimination is the oldest systematic algorithm in mathematics. The Nine Chapters on the Mathematical Art (China, compiled by the early first century CE) solves systems of up to five equations in its fangcheng chapter by placing the coefficients as counting-rod columns on a board and subtracting multiples of one column from another — elimination, two thousand years before its European name. Karl Friedrich Gauss rebuilt the same move for indefinite systems around 1810 in least-squares work, and every linear-algebra course now teaches it as Gaussian elimination. Substitution as a named classroom method runs through the school tradition — Hall and Knight teach both methods side by side in the simultaneous-equations chapter, exactly the pairing of this lesson.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the methods at examination speed', text: 'The examination shapes of this lesson: (1) straight settlement by the cheaper method — the coefficient reading of the choice procedure is worth seconds per item; (2) find-$k$ verdicts, settled by proportionality without solving ($x + 2y = 3$ against $2x + 4y = k$: none for $k \\neq 6$, infinitely many for $k = 6$); (3) word problems in the three classic structures — ages, costs, mixtures — where the translation is the whole difficulty and the settlement is routine; (4) fractional and decimal dresses, where the strike must precede the method. In competitive papers the systems are engineered for clean answers: if your settlement produces ugly fractions, suspect a sign or an isolation slip and check early.' },
        { kind: 'heading', text: 'The Methods, Collected' },
        { kind: 'para', text: 'From the above discussion, the craft of this lesson stands as follows:' },
        { kind: 'list', marker: 'roman', items: [
          'read the coefficients first: $\\pm 1$ or an isolated unknown invites substitution; opposite or equal coefficients invite elimination; neither invites minimal-multiplier elimination;',
          'clear every dress before the method — LCD for fractions, the right power of ten for exact decimals;',
          'substitution: isolate, substitute into the OTHER equation, run 5.2, back-substitute, check both originals;',
          'elimination: scale by the minimal multipliers $m_{1} = b_{2}/g$, $m_{2} = -b_{1}/g$, add, solve, back-substitute, check both originals;',
          'the two methods always agree — both are the 6.1 identity $D \\cdot x = D_{x}$ in costumes, so both deliver $x = D_{x}/D$, $y = D_{y}/D$ when $D \\neq 0$;',
          'word problems: two unknowns, two independent conditions, one system — then the story itself is the final check.',
        ] },
        { kind: 'para', text: 'One bridge closes the lesson. Every system of this chapter so far was settled BLIND — the algebra never saw what it was doing. Lesson 6.3 opens the eyes: each equation in two variables draws a line, and the three verdicts become three ways two lines can meet — crossing once, running parallel, or lying atop each other. The instruments $D$, $D_{x}$, $D_{y}$ will turn out to be measuring angles, not just counting pairs, and the word consistent will finally show its geometry.' },
        { kind: 'formula', name: 'The substitution pipeline', latex: 'y = \\tfrac{c_{1} - a_{1}x}{b_{1}} \\;\\longrightarrow\\; a_{2}x + b_{2}\\,y_{\\text{forced}} = c_{2} \\;\\longrightarrow\\; (s, t)', note: 'isolate, substitute into the other, solve, back-substitute, check' },
        { kind: 'formula', name: 'The minimal multipliers', latex: 'g = \\gcd(b_{1}, b_{2}): \\quad m_{1} = \\tfrac{b_{2}}{g}, \\; m_{2} = -\\tfrac{b_{1}}{g} \\;\\Longrightarrow\\; m_{1}b_{1} + m_{2}b_{2} = 0', note: 'the elimination strike with the smallest integers; the survivor is ±D/g' },
        { kind: 'formula', name: 'The dress strike', latex: '\\tfrac{x}{2} + \\tfrac{y}{3} = 8 \\;\\xrightarrow{\\times 6}\\; 3x + 2y = 48 \\qquad 0.5x + 0.25y = 10 \\;\\xrightarrow{\\times 4}\\; 2x + y = 40', note: 'each equation struck by the LCD of its own denominators (or the exact power of ten) BEFORE the method' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'To settle the system $2x + 3y = 13$, $x - y = 4$ by substitution, the cheapest first move is:',
            options: ['write $x = y + 4$ from the second equation', 'multiply the first equation by 4', 'add the equations as they stand', 'divide the first equation by 3'],
            answer: 0,
            explain: 'The second equation carries coefficient 1 on $x$ — isolation is free: $x = y + 4$. Substituting into the first gives $2(y + 4) + 3y = 13$, so $5y = 5$, $y = 1$, $x = 5$. Multiplying by 4 costs work without isolating anything; adding as they stand gives $3x + 2y = 17$ — still two unknowns; dividing by 3 produces fractions with no gain.',
          },
          {
            q: 'After eliminating $y$ from $2x + 3y = 8$ and $3x - y = 1$ (the second scaled by 3), the surviving equation is:',
            options: ['$11x = 11$', '$5x = 9$', '$11x = 5$', '$8x = 11$'],
            answer: 0,
            explain: 'The scaled second reads $9x - 3y = 3$; adding memberwise gives $(2 + 9)x + (3 - 3)y = 8 + 3$, that is $11x = 11$, so $x = 1$. The distractor $5x = 9$ subtracts instead of adding; $11x = 5$ adds correctly on the left but subtracts the right members; $8x = 11$ adds the coefficients wrongly.',
          },
          {
            q: 'The system $x + 2y = 3$, $2x + 4y = 6$ has:',
            options: ['exactly one solution', 'no solution', 'infinitely many solutions', 'exactly two solutions'],
            answer: 2,
            explain: 'The second equation is the first with every member doubled — the scaling licence keeps the solution set identical, so the system makes ONE assertion twice. Every pair of the family $x = 3 - 2y$ passes both: $(3, 0)$, $(1, 1)$, $(-1, 2)$, … The instruments agree: $D = 1 \\cdot 4 - 2 \\cdot 2 = 0$ and $D_{x} = 3 \\cdot 4 - 6 \\cdot 2 = 0$, $D_{y} = 1 \\cdot 6 - 2 \\cdot 3 = 0$.',
          },
          {
            q: 'The system $x + 2y = 3$, $2x + 4y = k$ has NO solution exactly when:',
            options: ['$k = 6$', '$k \\neq 6$', '$k = 3$', 'for every $k$'],
            answer: 1,
            explain: 'The left sides are proportional, so $D = 0$ for every $k$: the verdict is none or infinitely many, never one. Consistency needs the constants proportional too: $6 = 2 \\cdot 3$ forces $k = 6$. So $k = 6$ gives infinitely many pairs, and EVERY OTHER value of $k$ — any $k \\neq 6$ — gives none: the second assertion then demands a different total from the same left side.',
          },
          {
            q: 'After settling a system, the check substitutes the pair into:',
            options: ['the easier equation only', 'the equation used for the back-substitution', 'BOTH original equations', 'the scaled equation that eliminated an unknown'],
            answer: 2,
            explain: 'A pair can pass one equation and fail the other (the partial trap of 6.1), and it can pass a cleared or scaled dress while the dress-making itself was wrong — a bad LCD strike survives its own dressed check. The originals are the only complete court: both equations, exactly as the problem gave them.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 6.2', sets: [
          { level: 'L1', questions: [
            {
              q: 'Settle by substitution: $y = x + 2$ and $x + y = 8$.',
              solution: [
                'The first equation is already isolated: $y = x + 2$.',
                'Substitute into the second: $x + (x + 2) = 8$, so $2x = 6$ and $x = 3$.',
                'Back-substitute: $y = 3 + 2 = 5$.',
                'Check in the originals: $5 = 3 + 2$ and $3 + 5 = 8$ — both true.',
              ],
              answer: '$(x, y) = (3, 5)$.',
            },
            {
              q: 'Settle by elimination: $x + y = 14$ and $x - y = 4$.',
              solution: [
                'The y-coefficients are already opposites: add memberwise.',
                '$(x + y) + (x - y) = 14 + 4$, so $2x = 18$ and $x = 9$.',
                'Back-substitute through the first original: $9 + y = 14$, so $y = 5$.',
                'Check: $9 + 5 = 14$ and $9 - 5 = 4$ — both true.',
              ],
              answer: '$(x, y) = (9, 5)$.',
            },
            {
              q: 'Settle by substitution: $y = 3x$ and $x + y = 12$.',
              solution: [
                'The first equation is already isolated: $y = 3x$.',
                'Substitute into the second: $x + 3x = 12$, so $4x = 12$ and $x = 3$.',
                'Back-substitute: $y = 9$.',
                'Check: $9 = 3 \\cdot 3$ and $3 + 9 = 12$ — both true.',
              ],
              answer: '$(x, y) = (3, 9)$.',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'Settle: $x + y = 25$ and $x - y = 7$.',
              solution: [
                'Elimination with no scaling — the y-coefficients are opposites.',
                'Add: $2x = 32$, so $x = 16$.',
                'Back-substitute: $16 + y = 25$, so $y = 9$.',
                'Check: $16 + 9 = 25$ and $16 - 9 = 7$ — both true.',
              ],
              answer: '$(x, y) = (16, 9)$.',
            },
            {
              q: 'Settle: $2x - y = 5$ and $3x + y = 10$.',
              solution: [
                'The y-coefficients are $-1$ and $+1$ — already opposites: add memberwise.',
                '$(2x - y) + (3x + y) = 5 + 10$, so $5x = 15$ and $x = 3$.',
                'Back-substitute through the second original: $3(3) + y = 10$, so $y = 1$.',
                'Check: $2(3) - 1 = 5$ and $3(3) + 1 = 10$ — both true.',
              ],
              answer: '$(x, y) = (3, 1)$.',
            },
            {
              q: 'Settle: $5x + 2y = 21$ and $5x - 2y = 9$.',
              solution: [
                'The x-coefficients are EQUAL — subtract instead of adding (or scale one by $-1$ first).',
                'Subtract the second from the first: $(5x + 2y) - (5x - 2y) = 21 - 9$, so $4y = 12$ and $y = 3$.',
                'Back-substitute: $5x + 6 = 21$, so $x = 3$.',
                'Check: $5(3) + 2(3) = 21$ and $5(3) - 2(3) = 9$ — both true.',
              ],
              answer: '$(x, y) = (3, 3)$.',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Settle by either method: $2x + y = 8$ and $3x - 2y = 5$.',
              solution: [
                'Elimination: kill $y$ — coefficients 1 and $-2$, $g = 1$, minimal multipliers $m_{1} = 2$, $m_{2} = 1$.',
                'Scale the first by 2: $4x + 2y = 16$; add the second: $7x = 21$, so $x = 3$.',
                'Back-substitute through the first original: $2(3) + y = 8$, so $y = 2$.',
                'Check: $2(3) + 2 = 8$ and $3(3) - 2(2) = 5$ — both true.',
              ],
              answer: '$(x, y) = (3, 2)$.',
            },
            {
              q: 'Settle the fraction dress: $\\frac{x}{3} + \\frac{y}{4} = 4$ and $\\frac{x}{6} + \\frac{y}{4} = 3$.',
              solution: [
                'Strike each equation by the LCD of its own denominators: ×12 gives $4x + 3y = 48$ and $2x + 3y = 36$.',
                'The y-coefficients are now equal: subtract — $2x = 12$, so $x = 6$.',
                'Back-substitute: $4(6) + 3y = 48$, so $3y = 24$ and $y = 8$.',
                'Check in the ORIGINAL fractions: $6/3 + 8/4 = 2 + 2 = 4$ and $6/6 + 8/4 = 1 + 2 = 3$ — both true.',
              ],
              answer: '$(x, y) = (6, 8)$, checked in the original dress.',
            },
            {
              q: 'Settle the decimal dress: $0.6x + 0.5y = 8.5$ and $0.4x - 0.5y = 1.5$.',
              solution: [
                'Strike each equation by 10: $6x + 5y = 85$ and $4x - 5y = 15$.',
                'The y-coefficients are opposites: add — $10x = 100$, so $x = 10$.',
                'Back-substitute: $6(10) + 5y = 85$, so $5y = 25$ and $y = 5$.',
                'Check in the original decimals: $0.6(10) + 0.5(5) = 6 + 2.5 = 8.5$ and $0.4(10) - 0.5(5) = 4 - 2.5 = 1.5$ — both true.',
              ],
              answer: '$(x, y) = (10, 5)$, checked in the original dress.',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'Find $k$ so that the system $3x + 4y = 12$, $6x + ky = 24$ holds for infinitely many pairs.',
              solution: [
                'Infinitely many needs full proportionality: the left sides and the constants all in ratio.',
                'The constants: $24 = 2 \\times 12$ — ratio 2. So the left sides must also be in ratio 2: $6 = 2 \\times 3$ (already true) and $k = 2 \\times 4 = 8$.',
                'In the instruments: $D = 3k - 24 = 0$ at $k = 8$, and $D_{x} = 12k - 24 \\cdot 4 = 96 - 96 = 0$, $D_{y} = 3 \\cdot 24 - 6 \\cdot 12 = 0$ — the infinitely-many door.',
                'For $k \\neq 8$, $D \\neq 0$ and the system has exactly one solution instead.',
              ],
              answer: '$k = 8$ — the second equation becomes the first doubled.',
            },
            {
              q: 'A father is 26 years older than his son. In 10 years the father will be three times as old as the son. Find their ages now.',
              solution: [
                'Name the unknowns: father $f$, son $s$ now. Condition 1: $f = s + 26$.',
                'Condition 2: in 10 years, $f + 10 = 3(s + 10)$, which dresses as $f - 3s = 20$.',
                'Substitute: $s + 26 - 3s = 20$, so $-2s = -6$ and $s = 3$, $f = 29$.',
                'Check against the STORY: $29 = 3 + 26$ now; in 10 years $39 = 3 \\times 13$ — the father is exactly three times as old.',
              ],
              answer: 'The son is 3, the father 29.',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'Five pens and three pencils cost 57 rupees; three pens and five pencils cost 47. Find each price.',
              solution: [
                'Name the unknowns: pen $p$, pencil $q$. The purchases dress as $5p + 3q = 57$ and $3p + 5q = 47$.',
                'Add the equations: $8p + 8q = 104$, so $p + q = 13$.',
                'Subtract the second from the first: $2p - 2q = 10$, so $p - q = 5$.',
                'Add the two small equations: $2p = 18$, so $p = 9$ and $q = 4$.',
                'Check against the STORY: $5(9) + 3(4) = 57$ and $3(9) + 5(4) = 47$ — pens 9 rupees, pencils 4.',
              ],
              answer: 'A pen costs 9 rupees, a pencil 4.',
            },
            {
              q: 'How many litres of 30 percent acid and 60 percent acid must be mixed to make 10 litres of 42 percent acid?',
              solution: [
                'Name the unknowns: $a$ litres of 30 percent, $b$ litres of 60 percent.',
                'Volume: $a + b = 10$. Pure acid: $0.3a + 0.6b = 4.2$.',
                'Strike by 10: $3a + 6b = 42$, that is $a + 2b = 14$ after dividing by 3.',
                'Subtract the volume equation: $b = 4$, then $a = 6$.',
                'Check against the STORY: $6 + 4 = 10$ litres; acid $1.8 + 2.4 = 4.2$ litres — exactly 42 percent of 10.',
              ],
              answer: 'Six litres of 30 percent and four of 60 percent.',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Prove that the elimination method is correct: if $D = a_{1}b_{2} - a_{2}b_{1} \\neq 0$, the pair produced by scaling with the minimal multipliers and adding satisfies both equations, and no other pair does.',
              solution: [
                'Let $g = \\gcd(b_{1}, b_{2})$, $m_{1} = b_{2}/g$, $m_{2} = -b_{1}/g$, so $m_{1}b_{1} + m_{2}b_{2} = 0$. Take any solution $(s, t)$ of the system.',
                'Multiply the first equation by $m_{1}$ and the second by $m_{2}$ (lawful — scaling) and add: $(m_{1}a_{1} + m_{2}a_{2})\\,s + (m_{1}b_{1} + m_{2}b_{2})\\,t = m_{1}c_{1} + m_{2}c_{2}$.',
                'The $y$-coefficient vanishes, leaving $(m_{1}a_{1} + m_{2}a_{2})\\,s = m_{1}c_{1} + m_{2}c_{2}$. The surviving coefficient is $D/g \\neq 0$, so EVERY solution has $s = (m_{1}c_{1} + m_{2}c_{2})/(D/g)$ — the method value, forced.',
                'With $s$ forced, any solution has $t = (c_{1} - a_{1}s)/b_{1}$ when $b_{1} \\neq 0$ (and if $b_{1} = 0$, then $a_{1} \\neq 0$ and $t = (c_{1} - a_{1}s)/0$ is impossible — instead $b_{2} \\neq 0$ since $D \\neq 0$, and eq2 forces $t$): one partner, uniquely.',
                'So every solution equals the produced pair; and the produced pair satisfies both equations by construction (the scaled combination is a lawful consequence of them). Hence the method is exact: one pair in, no pair hidden.',
              ],
              answer: 'The eliminated line carries $D/g \\neq 0$ — it forces $s$ for every solution at once, and the back-substitution forces $t$: the method finds the unique pair and nothing else.',
            },
          ] },
        ] },
      ],
    },
  ],
  plannedLessons: ['Consistency: the Geometry of Two Lines'],
}
