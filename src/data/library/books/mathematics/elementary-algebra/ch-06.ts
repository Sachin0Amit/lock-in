import type { Chapter } from '../../../types'

/**
 * Elementary Algebra — Chapter 6: Simultaneous Linear Equations
 *
 * LESSONS WRITTEN: 6.1 Equations in Two Variables (run 77 — quiz keys
 *                  0/2/1/2/1, 14 exercises, two figures, verify-book3-
 *                  ch06.ts sections A–F green) 6.2 Substitution and
 *                  Elimination (run 77 — quiz keys 0/0/2/1/2, 14
 *                  exercises, two figures, sections D–G green); 6.3
 *                  Consistency: the Geometry of Two Lines (run 78 — quiz
 *                  keys 0/1/2/1/3, 14 exercises, two figures, the
 *                  meeting-theorem derivation); 6.4 One Linear, One
 *                  Quadratic (run 96 — the prewritten-books audit's gap B
 *                  closed: the substitution pipeline, the three verdicts,
 *                  the tangent condition k² = (1+m²)r², the symmetric
 *                  identity bank, quiz keys 1/2/1/0/1, 14 exercises, two
 *                  figures, sections L/M green) — the chapter re-COMPLETE
 *                  4/4 at run 96.
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

/* ------------------------------------------------------------------ */
/* Figure 1 (6.3): the three meetings gallery — crossing, parallel,    */
/* coincident. Title band (30,18,660,44); panels (30,84,208,180),      */
/* (256,84,208,180), (482,84,208,180); verdict chips (30,276,208,26),  */
/* (256,276,208,26), (482,276,208,26); caption band (30,314,660,24).   */
/* Geometry pinned in verify-book3-ch06.ts plan63Fig1, audited in J.   */
/* ------------------------------------------------------------------ */

function threeMeetingsSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Two lines can cross at one point, run parallel with no shared point, or be the same line sharing every point">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">two lines, three ways to meet — the verdicts of 5.3 become geometry</text>')
  // ---- panel 1: crossing (x + y = 10, x − y = 2) ----
  parts.push('<rect x="30" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="134" y="104" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">CROSSING</text>')
  parts.push('<text x="134" y="118" font-size="9.5" fill="#65a30d" text-anchor="middle">x + y = 10 · x − y = 2</text>')
  // axes
  parts.push('<line x1="46" y1="228" x2="224" y2="228" stroke="#d97706" stroke-width="1"/>')
  parts.push('<line x1="62" y1="134" x2="62" y2="248" stroke="#d97706" stroke-width="1"/>')
  // the two lines and the meeting point
  parts.push('<line x1="66" y1="146" x2="216" y2="206" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<line x1="66" y1="216" x2="216" y2="136" stroke="#ea580c" stroke-width="2"/>')
  parts.push('<circle cx="141" cy="176" r="4.5" fill="#ea580c"/>')
  parts.push('<text x="112" y="222" font-size="9" fill="#166534" text-anchor="middle">y = −x + 10</text>')
  parts.push('<text x="182" y="132" font-size="9" fill="#166534" text-anchor="middle">y = x − 2</text>')
  // ---- panel 2: parallel (x + y = 4, x + y = 7) ----
  parts.push('<rect x="256" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="360" y="104" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">PARALLEL</text>')
  parts.push('<text x="360" y="118" font-size="9.5" fill="#65a30d" text-anchor="middle">x + y = 4 · x + y = 7</text>')
  parts.push('<line x1="272" y1="228" x2="450" y2="228" stroke="#d97706" stroke-width="1"/>')
  parts.push('<line x1="288" y1="134" x2="288" y2="248" stroke="#d97706" stroke-width="1"/>')
  parts.push('<line x1="292" y1="140" x2="442" y2="200" stroke="#16a34a" stroke-width="2"/>')
  parts.push('<line x1="292" y1="180" x2="442" y2="240" stroke="#ea580c" stroke-width="2"/>')
  parts.push('<text x="330" y="132" font-size="9" fill="#166534" text-anchor="middle">x + y = 4</text>')
  parts.push('<text x="336" y="256" font-size="9" fill="#166534" text-anchor="middle">x + y = 7</text>')
  // ---- panel 3: coincident (2x + 3y = 6, 4x + 6y = 12) ----
  parts.push('<rect x="482" y="84" width="208" height="180" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="586" y="104" font-size="11" fill="#0f766e" text-anchor="middle" font-weight="700">COINCIDENT</text>')
  parts.push('<text x="586" y="118" font-size="9.5" fill="#65a30d" text-anchor="middle">2x + 3y = 6 · 4x + 6y = 12</text>')
  parts.push('<line x1="498" y1="228" x2="676" y2="228" stroke="#d97706" stroke-width="1"/>')
  parts.push('<line x1="514" y1="134" x2="514" y2="248" stroke="#d97706" stroke-width="1"/>')
  parts.push('<line x1="518" y1="150" x2="668" y2="210" stroke="#16a34a" stroke-width="4"/>')
  parts.push('<line x1="518" y1="150" x2="668" y2="210" stroke="#ea580c" stroke-width="1.4" stroke-dasharray="6 5"/>')
  // sample shared points along the single line
  parts.push('<circle cx="538" cy="158" r="3" fill="#0d9488"/>')
  parts.push('<circle cx="593" cy="175" r="3" fill="#0d9488"/>')
  parts.push('<circle cx="648" cy="192" r="3" fill="#0d9488"/>')
  parts.push('<text x="558" y="136" font-size="9" fill="#166534" text-anchor="middle">2x + 3y = 6</text>')
  parts.push('<text x="600" y="222" font-size="9" fill="#166534" text-anchor="middle">4x + 6y = 12</text>')
  // ---- verdict chips ----
  parts.push('<rect x="30" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="134" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">one shared point — (6, 4)</text>')
  parts.push('<rect x="256" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="360" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">no shared point — parallel</text>')
  parts.push('<rect x="482" y="276" width="208" height="26" rx="6" fill="#ffedd5" stroke="#ea580c" stroke-width="1.2"/>')
  parts.push('<text x="586" y="293" font-size="10.5" fill="#166534" text-anchor="middle" font-weight="700">every point shared — one line</text>')
  // caption band
  parts.push('<rect x="30" y="314" width="660" height="24" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="330" font-size="11" fill="#166534" text-anchor="middle">the three meetings ARE the three verdicts: crossing ↔ one · parallel ↔ none · coincident ↔ infinitely many</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (6.3): the slope machine — the D-instruments decide the    */
/* meeting. Title band (30,18,660,44); start (30,92,170,60); decision  */
/* d1 (250,92,180,60); result R1 (480,92,210,60); decision d2          */
/* (250,190,180,60); result R2 (480,190,210,60); result R3             */
/* (250,270,180,52); caption band (30,334,660,22). Geometry pinned in  */
/* verify-book3-ch06.ts plan63Fig2, audited in J.                      */
/* ------------------------------------------------------------------ */

function slopeMachineSvg(): string {
  const parts: string[] = []
  parts.push(
    '<svg viewBox="0 0 720 360" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A decision machine: compare slopes, then intercepts; the D-instruments decide the meeting">'
  )
  // title band
  parts.push('<rect x="30" y="18" width="660" height="44" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="46" font-size="15" fill="#166534" text-anchor="middle" font-weight="700">the slope machine — two questions, three outcomes</text>')
  // start box
  parts.push('<rect x="30" y="92" width="170" height="60" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="115" y="113" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">two lines, dressed</text>')
  parts.push('<text x="115" y="131" font-size="10.5" fill="#0f766e" text-anchor="middle">y = m1·x + k1</text>')
  parts.push('<text x="115" y="147" font-size="10.5" fill="#0f766e" text-anchor="middle">y = m2·x + k2</text>')
  // decision 1
  parts.push('<rect x="250" y="92" width="180" height="60" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="340" y="113" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">slopes equal?</text>')
  parts.push('<text x="340" y="131" font-size="10.5" fill="#0f766e" text-anchor="middle">is m1 = m2 ?</text>')
  parts.push('<text x="340" y="147" font-size="10" fill="#d97706" text-anchor="middle">(the D = 0 test)</text>')
  // result 1
  parts.push('<rect x="480" y="92" width="210" height="60" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="585" y="113" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">EXACTLY ONE MEETING</text>')
  parts.push('<text x="585" y="131" font-size="10.5" fill="#0f766e" text-anchor="middle">the crossing (Dx/D, Dy/D)</text>')
  parts.push('<text x="585" y="147" font-size="10" fill="#65a30d" text-anchor="middle">verdict one — solve and check</text>')
  // decision 2
  parts.push('<rect x="250" y="190" width="180" height="60" rx="8" fill="none" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<text x="340" y="211" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">intercepts equal?</text>')
  parts.push('<text x="340" y="229" font-size="10.5" fill="#0f766e" text-anchor="middle">is k1 = k2 ?</text>')
  parts.push('<text x="340" y="245" font-size="10" fill="#d97706" text-anchor="middle">(the Dx = 0 test)</text>')
  // result 2
  parts.push('<rect x="480" y="190" width="210" height="60" rx="8" fill="none" stroke="#dc2626" stroke-width="1.5"/>')
  parts.push('<text x="585" y="211" font-size="11.5" fill="#dc2626" text-anchor="middle" font-weight="700">NEVER MEET</text>')
  parts.push('<text x="585" y="229" font-size="10.5" fill="#0f766e" text-anchor="middle">parallel, distinct — no point</text>')
  parts.push('<text x="585" y="245" font-size="10" fill="#65a30d" text-anchor="middle">the none verdict — say it honestly</text>')
  // result 3
  parts.push('<rect x="250" y="270" width="180" height="52" rx="8" fill="#ffedd5" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="340" y="290" font-size="11.5" fill="#166534" text-anchor="middle" font-weight="700">THE SAME LINE</text>')
  parts.push('<text x="340" y="308" font-size="10.5" fill="#0f766e" text-anchor="middle">every point shared — infinitely many</text>')
  // arrows
  parts.push('<line x1="200" y1="122" x2="244" y2="122" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 238 117 L 246 122 L 238 127" fill="none" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="430" y1="122" x2="474" y2="122" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 468 117 L 476 122 L 468 127" fill="none" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="452" y="86" font-size="9.5" fill="#ea580c" text-anchor="middle" font-weight="700">NO · D ≠ 0</text>')
  parts.push('<line x1="340" y1="152" x2="340" y2="184" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 335 178 L 340 186 L 345 178" fill="none" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="350" y="172" font-size="9.5" fill="#ea580c" text-anchor="start" font-weight="700">YES · D = 0</text>')
  parts.push('<line x1="430" y1="220" x2="474" y2="220" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 468 215 L 476 220 L 468 225" fill="none" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="452" y="184" font-size="9.5" fill="#ea580c" text-anchor="middle" font-weight="700">NO · Dx ≠ 0</text>')
  parts.push('<line x1="340" y1="250" x2="340" y2="264" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<path d="M 335 258 L 340 266 L 345 258" fill="none" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="350" y="262" font-size="9.5" fill="#ea580c" text-anchor="start" font-weight="700">YES · Dx = 0</text>')
  // caption band
  parts.push('<rect x="30" y="334" width="660" height="22" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="349" font-size="10.5" fill="#166534" text-anchor="middle">the D-instruments of 6.1 are the slope and intercept tests — one theorem, two languages</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 1 (6.4): the three verdicts — the c-slider family against   */
/* y = x².  viewBox 720×400; plot window x ∈ [−2.5, 3.5],             */
/* y ∈ [−2.5, 9.5]; px(x) = 60 + (x+2.5)·100, py(y) = 354 − (y+2.5)·25 */
/* (geometry pinned in verify-book3-ch06.ts plan64Fig1).              */
/* ------------------------------------------------------------------ */

function threeVerdictsSvg(): string {
  const px = (x: number): number => 60 + (x + 2.5) * 100
  const py = (y: number): number => 354 - (y + 2.5) * 25
  const parts: string[] = []
  parts.push('<svg viewBox="0 0 720 400" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Three parallel lines against the parabola y equals x squared: a secant meeting it twice, a tangent touching once, an outsider missing entirely">')
  // title band
  parts.push('<rect x="30" y="12" width="660" height="34" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="34" font-size="14" fill="#166534" text-anchor="middle" font-weight="700">the c-slider family against the parabola y = x² — three verdicts</text>')
  // axes
  parts.push('<line x1="310" y1="54" x2="310" y2="354" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<line x1="60" y1="291.5" x2="660" y2="291.5" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<line x1="160" y1="288" x2="160" y2="295" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="360" y1="288" x2="360" y2="295" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="560" y1="288" x2="560" y2="295" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="160" y="306" font-size="10" fill="#0f766e" text-anchor="middle">−2</text>')
  parts.push('<text x="360" y="306" font-size="10" fill="#0f766e" text-anchor="middle">1</text>')
  parts.push('<text x="560" y="306" font-size="10" fill="#0f766e" text-anchor="middle">3</text>')
  parts.push('<line x1="305" y1="266.5" x2="313" y2="266.5" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="305" y1="66.5" x2="313" y2="66.5" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="300" y="270" font-size="10" fill="#0f766e" text-anchor="end">1</text>')
  parts.push('<text x="300" y="70" font-size="10" fill="#0f766e" text-anchor="end">9</text>')
  // the parabola y = x²
  const pts: string[] = []
  for (let i = 0; i <= 111; i++) {
    const x = -2.5 + i * 0.05
    pts.push(px(x).toFixed(1) + ',' + py(x * x).toFixed(1))
  }
  parts.push('<polyline points="' + pts.join(' ') + '" fill="none" stroke="#0d9488" stroke-width="2.5"/>')
  // the c-slider family (all slope 2): secant / tangent / outsider
  parts.push('<line x1="60" y1="341.5" x2="585" y2="54" stroke="#16a34a" stroke-width="2.5"/>')
  parts.push('<line x1="185" y1="354" x2="660" y2="141.5" stroke="#ea580c" stroke-width="2.5"/>')
  parts.push('<line x1="235" y1="354" x2="660" y2="166.5" stroke="#dc2626" stroke-width="2" stroke-dasharray="8 5"/>')
  // contact dots
  parts.push('<circle cx="210" cy="266.5" r="5" fill="#16a34a"/>')
  parts.push('<circle cx="610" cy="66.5" r="5" fill="#16a34a"/>')
  parts.push('<circle cx="410" cy="266.5" r="5.5" fill="#ea580c"/>')
  // dot labels
  parts.push('<text x="204" y="262" font-size="11" fill="#166534" text-anchor="end">(−1, 1)</text>')
  parts.push('<text x="618" y="70" font-size="11" fill="#166534" text-anchor="start">(3, 9)</text>')
  parts.push('<text x="396" y="262" font-size="11" fill="#166534" text-anchor="end">(1, 1)</text>')
  // the three verdict chips
  parts.push('<rect x="64" y="50" width="176" height="20" rx="5" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="152" y="64" font-size="10" fill="#166534" text-anchor="middle" font-weight="700">y = 2x + 3 · Δ = 16 &gt; 0 · TWO</text>')
  parts.push('<rect x="64" y="76" width="176" height="20" rx="5" fill="none" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="152" y="90" font-size="10" fill="#166534" text-anchor="middle" font-weight="700">y = 2x − 1 · Δ = 0 · TANGENT</text>')
  parts.push('<rect x="64" y="102" width="176" height="20" rx="5" fill="none" stroke="#dc2626" stroke-width="1.5"/>')
  parts.push('<text x="152" y="116" font-size="10" fill="#166534" text-anchor="middle" font-weight="700">y = 2x − 2 · Δ = −4 &lt; 0 · NONE</text>')
  // caption band
  parts.push('<rect x="30" y="362" width="660" height="26" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="379" font-size="10.5" fill="#166534" text-anchor="middle">one line, one quadratic, one discriminant — the reduced equation x² − mx − c = 0 prices every meeting</text>')
  parts.push('</svg>')
  return parts.join('')
}

/* ------------------------------------------------------------------ */
/* Figure 2 (6.4): the tangent strip — the parallel family            */
/* 3x + 4y = c against the circle x² + y² = 25.  viewBox 720×460;     */
/* window x ∈ [−7, 7], y ∈ [−6.5, 6.5], equal scale 30 px/unit;       */
/* px(x) = 150 + (x+7)·30, py(y) = 420 − (y+6.5)·30; circle centre   */
/* (360, 225), radius 150 (pinned in verify-book3-ch06.ts            */
/* plan64Fig2).                                                        */
/* ------------------------------------------------------------------ */

function tangentStripSvg(): string {
  const parts: string[] = []
  parts.push('<svg viewBox="0 0 720 460" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="A circle of radius 5 against three parallel lines 3x + 4y = 20, 25 and 30: the secant cuts twice, the tangent touches once at (3,4), the outsider misses">')
  // title band
  parts.push('<rect x="30" y="8" width="660" height="30" rx="8" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="360" y="28" font-size="13.5" fill="#166534" text-anchor="middle" font-weight="700">the tangent strip — the family 3x + 4y = c against the circle x² + y² = 25</text>')
  // axes (x-axis trimmed to 545 to clear the (24/5, 7/5) label)
  parts.push('<line x1="360" y1="45" x2="360" y2="420" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<line x1="165" y1="225" x2="545" y2="225" stroke="#0d9488" stroke-width="1.5"/>')
  parts.push('<line x1="210" y1="221" x2="210" y2="229" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="510" y1="221" x2="510" y2="229" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="195" y="242" font-size="10" fill="#0f766e" text-anchor="middle">−5</text>')
  parts.push('<text x="525" y="242" font-size="10" fill="#0f766e" text-anchor="middle">5</text>')
  parts.push('<line x1="355" y1="375" x2="365" y2="375" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<line x1="355" y1="75" x2="365" y2="75" stroke="#d97706" stroke-width="1.5"/>')
  parts.push('<text x="348" y="388" font-size="10" fill="#0f766e" text-anchor="end">−5</text>')
  parts.push('<text x="348" y="66" font-size="10" fill="#0f766e" text-anchor="end">5</text>')
  // the circle
  parts.push('<circle cx="360" cy="225" r="150" fill="none" stroke="#0d9488" stroke-width="2.5"/>')
  // the parallel family (all slope −3/4): secant / tangent / outsider
  parts.push('<line x1="320" y1="45" x2="540" y2="210" stroke="#16a34a" stroke-width="2.5"/>')
  parts.push('<line x1="370" y1="45" x2="540" y2="172.5" stroke="#ea580c" stroke-width="2.5"/>')
  parts.push('<line x1="420" y1="45" x2="540" y2="135" stroke="#dc2626" stroke-width="2" stroke-dasharray="8 5"/>')
  // contact dots
  parts.push('<circle cx="360" cy="75" r="5" fill="#16a34a"/>')
  parts.push('<circle cx="504" cy="183" r="5" fill="#16a34a"/>')
  parts.push('<circle cx="450" cy="105" r="5.5" fill="#ea580c"/>')
  // dot labels
  parts.push('<text x="330" y="68" font-size="11" fill="#166534" text-anchor="end">(0, 5)</text>')
  parts.push('<text x="460" y="94" font-size="11" fill="#166534" text-anchor="start">(3, 4)</text>')
  parts.push('<text x="556" y="232" font-size="11" fill="#166534" text-anchor="start">(24/5, 7/5)</text>')
  // the three verdict chips
  parts.push('<rect x="64" y="56" width="150" height="22" rx="5" fill="none" stroke="#16a34a" stroke-width="1.5"/>')
  parts.push('<text x="139" y="71" font-size="9.5" fill="#166534" text-anchor="middle" font-weight="700">3x + 4y = 20 · TWO</text>')
  parts.push('<rect x="64" y="86" width="150" height="22" rx="5" fill="none" stroke="#ea580c" stroke-width="1.5"/>')
  parts.push('<text x="139" y="101" font-size="9.5" fill="#166534" text-anchor="middle" font-weight="700">3x + 4y = 25 · TANGENT</text>')
  parts.push('<rect x="64" y="116" width="150" height="22" rx="5" fill="none" stroke="#dc2626" stroke-width="1.5"/>')
  parts.push('<text x="139" y="131" font-size="9.5" fill="#166534" text-anchor="middle" font-weight="700">3x + 4y = 30 · NONE</text>')
  // caption band
  parts.push('<rect x="30" y="424" width="660" height="26" rx="6" fill="none" stroke="#16a34a" stroke-width="1"/>')
  parts.push('<text x="360" y="441" font-size="10.5" fill="#166534" text-anchor="middle">the law: k² &lt; (1+m²)r² two · k² = (1+m²)r² tangent · k² &gt; (1+m²)r² none — here c² vs 625</text>')
  parts.push('</svg>')
  return parts.join('')
}

export const chapter06: Chapter = {
  number: 6,
  slug: 'simultaneous-linear-equations',
  title: 'Simultaneous Linear Equations',
  summary:
    'Two unknowns, two assertions, one truth: equations in two variables and their solution sets, substitution and elimination as systematic methods with their equivalence shown, and the consistency verdicts — intersecting, parallel, coincident lines — read both algebraically and geometrically. Word problems (age, mixture, cost) become the natural habitat of the method.',
  // 6.4 shipped at run 96 (the 2026-11-11 audit's AL gap B closed —
  // H&K XXVI ground) — the chapter re-completes at 4 lessons; ch. 12
  // (ratio-proportion-variation) is the next AL unit per the audit's queue.
  status: 'complete',
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
    {
      id: 'al-consistency-the-geometry-of-two-lines',
      number: '6.3',
      title: 'Consistency: the Geometry of Two Lines',
      concepts: [
        'the line dress y = (c − ax)/b',
        'slope of a linear equation',
        'y-intercept',
        'parallel lines',
        'coincident lines',
        'consistent and inconsistent systems',
        'the meeting theorem',
        'lattice points and hidden crossings',
      ],
      objectives: [
        'dress any linear equation with b ≠ 0 as a line y = m·x + k and read off its slope and y-intercept',
        'decide how two lines meet — crossing, parallel, coincident — from slopes and intercepts alone, verticals included',
        're-derive the D-instruments of 6.1 as the slope and intercept tests',
        'locate the meeting point by line algebra and recognize it as the Cramer pair of 6.1',
        'read the three verdicts of 5.3 as the three ways two lines can meet',
      ],
      prerequisites: ['al-substitution-and-elimination', 'al-equations-in-two-variables'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch3-pair-linear', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Lesson 6.2 left you with two methods and one promise: substitution and elimination always agree, because both are lawful readings of the same elimination identities $D \\cdot x = D_{x}$ and $D \\cdot y = D_{y}$. But a reader who worked the exhibits may have felt something deeper stirring underneath. The census of 6.1 counted the pairs satisfying $x + y = 10$ — $(1, 9), (2, 8), (3, 7), \\ldots$ — and they did not scatter: they marched in a perfect line, each pair one step right and one step down from the last. That straightness was not a coincidence of this example. Every linear equation in two unknowns draws a straight line, and every pair that satisfies it lives on that line. This lesson draws the picture in full — and the picture does not merely decorate the algebra. It explains it.' },
        { kind: 'para', text: 'The destination is a double-reading of everything chapter 6 has built. Solving a system becomes finding where two lines meet. The three verdicts of 5.3 — exactly one, none, infinitely many — return as the three ways two lines can behave: they cross at one point, they run parallel and never meet, or they are the same line sharing every point. The instruments $D$, $D_{x}$, $D_{y}$ return as the slope-difference and intercept-difference detectors. Even the method of 6.2 acquires a face: elimination is what you get when you slide both lines into a common dress and subtract. One theorem, two languages — and by the end you will read either fluently.' },
        { kind: 'heading', text: 'The Line Dress' },
        { kind: 'para', text: 'Take any linear equation $a x + b y = c$ and suppose first that $b \\neq 0$. Then $b$ is a nonzero number, and the inverse law of ANS 7.2 lets you divide both members by it — twice, lawfully. Subtract $a x$ from both members (the balance move of 5.1, now carrying two letters), divide by $b$, and the equation is solved for $y$:' },
        { kind: 'equation', latex: 'a x + b y = c \\;\\iff\\; y = -\\frac{a}{b}\\,x + \\frac{c}{b} \\qquad (b \\neq 0)', note: 'the line dress: one coefficient of the slope m = −a/b and one bare number k = c/b, the value where the line meets the y-axis.' },
        { kind: 'para', text: 'The dressed form $y = m \\cdot x + k$ is the algebraic signature of a straight line: for every $+1$ step in $x$, the value of $y$ changes by exactly $m$ — the slope — and when $x = 0$ the value of $y$ is exactly $k$ — the y-intercept. You have already met a dressed line without the name: the census ladder of 6.1, the pairs $(s, 10 - s)$ of $x + y = 10$, steps down by 1 as $s$ steps up by 1 — slope $-1$, intercept $10$, and the ladder was the line, sampled pair by pair. The verifier behind this lesson dressed all $2{,}028$ equations $a x + b y = c$ over $[-6, 6]$ with $b \\neq 0$ and confirmed the dress is lossless: the windowed census of each original and the census of its dress agree exactly, and $7{,}225$ spot identities $m \\cdot s + k = (c - a s)/b$ all hold as exact fractions.' },
        { kind: 'para', text: 'One honest exception: if $b = 0$ the dress refuses — dividing by $b$ is division by zero, excluded by ANS 9.3. The equation collapses to $a x = c$ with $a \\neq 0$, forcing $x = c/a$ while $y$ stays free: a vertical line, the set of all pairs with one fixed x-coordinate. Verticals have no slope in the $m$-sense — "how $y$ responds to a step in $x$" has no answer when $x$ cannot step — but they are real lines, they meet every non-vertical line exactly once, and the instrument table below prices them without any division at all.' },
        { kind: 'terms', items: [
          { term: 'Line dress', def: 'The form $y = m \\cdot x + k$ of a linear equation with $b \\neq 0$, obtained by solving for $y$: $y = -\\frac{a}{b} x + \\frac{c}{b}$. The dress is equivalent to the original — every pair satisfying one satisfies the other.' },
          { term: 'Slope', def: 'The number $m = -a/b$: how much $y$ changes per unit step of $x$ along the line. A slope of $2$ climbs two units per step right; a slope of $-1$ descends one; a slope of $0$ is level.' },
          { term: 'Y-intercept', def: 'The number $k = c/b$: the y-value where the line crosses the y-axis (the point $(0, k)$), read off the dress as the constant term.' },
          { term: 'Vertical line', def: 'The line $x = c/a$ (an equation with $b = 0$, $a \\neq 0$): all pairs with one fixed x-coordinate. It has no slope in the m-sense and meets every non-vertical line exactly once.' },
          { term: 'Intersecting (crossing) lines', def: 'Two lines with different slopes: they share exactly one point, and the system they form has exactly one solution — the meeting point read as a pair.' },
          { term: 'Parallel lines', def: 'Two lines with the same slope but different intercepts: they share no point at all, and the system they form has no solution. Distinct verticals ($x = 3$ and $x = 5$) are parallel in the same honest sense.' },
          { term: 'Coincident lines', def: 'Two equations dressing the SAME line — same slope and same intercept: every point of the line is shared, and the system has infinitely many solutions. One equation is a scalar multiple of the other.' },
          { term: 'Hidden crossing', def: 'A meeting point with a non-integer coordinate, such as $(2, \\tfrac{1}{2})$: exactly one real pair solves the system, but no lattice point does — the integer-pair census of 6.1 finds nothing, while the geometry crosses all the same.' },
        ] },
        { kind: 'example', title: 'Read the line dress — slope and intercept at a glance', steps: [
          '$x + y = 10$: subtract $x$ — $y = -x + 10$. Slope $-1$, intercept $10$; the census ladder of 6.1 was this line.',
          '$2x + 3y = 6$: subtract $2x$ and divide by $3$ — $y = -\\tfrac{2}{3}x + 2$. Slope $-\\tfrac{2}{3}$, intercept $2$: three steps right cost two steps down.',
          '$3x - y = 3$: add $y$, subtract $3$ — $y = 3x - 3$. Slope $3$ (steep climb), intercept $-3$ (crosses the y-axis below the origin).',
          '$x = 3$: $b = 0$ — the dress refuses. This is the vertical line through $x = 3$; no $m$, no $k$, every $y$ welcome at that one $x$.',
          'Hence — Slopes $-1, -\\tfrac{2}{3}, 3$ and a vertical — read straight off $m = -a/b$ and $k = c/b$ wherever $b \\neq 0$.',
        ] },
        { kind: 'para', text: 'Why trust that the dress really is a line and not just a formula? The slope law makes it mechanical: from any point $(s, m s + k)$ on the dressed line, step to $s + 1$ and the dressed value moves to $m(s + 1) + k = (m s + k) + m$ — the same change $m$, at every starting point, forever. Constant change per equal step is exactly what a straight ladder is; 6.1’s census families were ladders because their equations were linear. A curve would change its step; the dress cannot. This is also the first Whisper of chapter 10, where the coordinate plane is built in full — here the plane is only as wide as the census window, and the lines live on it already.' },
        { kind: 'heading', text: 'Three Ways Two Lines Meet' },
        { kind: 'para', text: 'Now put two dressed lines in one picture and ask the only question a system can ask: which pairs satisfy BOTH? A pair satisfying both is a point on both lines — a shared point. And two distinct straight lines in the plane can share points in exactly three patterns, with no fourth possibility: they cross at exactly one point, they run parallel and share none, or they are the same line and share all of them. The trichotomy of 5.3 — one verdict, none, infinitely many — was this geometry speaking algebra all along. 5.3 read the verdict off one gathered coefficient; this lesson reads the same verdict off two slopes and two intercepts.' },
        { kind: 'para', text: 'Run the gallery. First case: the lines $y = -x + 10$ and $y = x - 2$ (the chapter’s opening pair). Their slopes differ, so as $x$ marches right the first descends while the second climbs — the gap between them closes, passes through zero at exactly one $x$, and reopens on the other side. One crossing, at $(6, 4)$. Second case: $x + y = 4$ and $x + y = 7$ dress as $y = -x + 4$ and $y = -x + 7$ — same slope, so the lines rise and fall together, forever $3$ apart in the y-direction. The gap never closes: parallel, no shared pair, the none verdict. Third case: $2x + 3y = 6$ and $4x + 6y = 12$ dress identically as $y = -\\tfrac{2}{3}x + 2$ — the second equation was the first doubled all along, and the "two" lines are one line wearing two coats: every point shared, infinitely many pairs.' },
        { kind: 'figure', caption: 'The three meetings, drawn: crossing lines share exactly one point, parallel lines share none, coincident equations draw one line twice. The verdicts of 5.3 were this picture all along.', svg: threeMeetingsSvg() },
        { kind: 'table', caption: 'The three meetings, the three verdicts, one instrument set', head: ['the lines do', 'the 5.3 verdict', 'the instruments', 'the type case'], rows: [
          ['cross at one point', 'exactly one solution', '$D \\neq 0$', '$x + y = 10$ and $x - y = 2$ cross at $(6, 4)$'],
          ['run parallel, never meet', 'no solution', '$D = 0$, $D_x \\neq 0$', '$x + y = 4$ and $x + y = 7$ — the sum cannot be both'],
          ['are the same line', 'infinitely many solutions', '$D = D_x = D_y = 0$', '$2x + 3y = 6$ and $4x + 6y = 12$'],
        ] },
        { kind: 'example', title: 'Classify three systems without solving them', steps: [
          'System (i): $x + y = 10$ and $x - y = 2$. Dresses: $y = -x + 10$ and $y = x - 2$. Slopes $-1$ and $1$ differ — crossing, one meeting point.',
          'System (ii): $x + y = 4$ and $x + y = 7$. Dresses: $y = -x + 4$ and $y = -x + 7$. Slopes equal at $-1$, intercepts $4 \\neq 7$ — parallel, no meeting point.',
          'System (iii): $2x + 3y = 6$ and $4x + 6y = 12$. Dresses: $y = -\\tfrac{2}{3}x + 2$ twice over. Slopes equal AND intercepts equal — the same line, every point shared.',
          'No solving was needed: two comparisons per system — slopes first, then intercepts — and the whole verdict is read.',
          'Hence — (i) crossing — one pair; (ii) parallel — none; (iii) coincident — infinitely many.',
        ] },
        { kind: 'heading', text: 'The Meeting Theorem' },
        { kind: 'para', text: 'The gallery suggests a law, and the law deserves a proof. Claim: two non-vertical lines meet exactly once precisely when their slopes differ; equal slopes with unequal intercepts never meet; equal slopes with equal intercepts are one line. And the meeting point, when it exists, is not just A point — it is the Cramer pair, delivered by the elimination identities of 6.1. The proof costs one subtraction and two exact fractions; it is the moment this chapter’s two languages become one theorem.' },
        { kind: 'derivation', title: 'Theorem — the meeting theorem: slopes decide, Cramer locates', statement: 'For two equations $a_{1}x + b_{1}y = c_{1}$, $a_{2}x + b_{2}y = c_{2}$ with $b_{1} b_{2} \\neq 0$, dressing as the lines $y = m_{1} x + k_{1}$ and $y = m_{2} x + k_{2}$: the lines meet exactly once iff $D = a_{1} b_{2} - a_{2} b_{1} \\neq 0$ (the slopes differ), the meeting point is the Cramer pair $\\left(\\frac{D_{x}}{D}, \\frac{D_{y}}{D}\\right)$, and within $D = 0$ the intercept test $D_{x}$ splits parallel (never meet) from coincident (the same line).', steps: [
          { label: 'Dress both lines', formula: 'y = -\\tfrac{a_{1}}{b_{1}} x + \\tfrac{c_{1}}{b_{1}} = m_{1} x + k_{1}, \\qquad y = m_{2} x + k_{2}', explanation: 'Both divisions are lawful — $b_{1}, b_{2} \\neq 0$ — so each equation becomes a line: slope $m = -a/b$, intercept $k = c/b$. A meeting point of the system is a point on both lines at once.' },
          { label: 'Set the dresses equal', formula: 'm_{1} x + k_{1} = m_{2} x + k_{2} \\;\\iff\\; (m_{1} - m_{2}) \\cdot x = k_{2} - k_{1}', explanation: 'A shared point makes the two dressed values equal memberwise — gather, exactly as 5.3 taught. One linear equation in one unknown: the verdict machine, met again inside the geometry.' },
          { label: 'Price the two gaps', formula: 'm_{1} - m_{2} = \\frac{-a_{1} b_{2} + a_{2} b_{1}}{b_{1} b_{2}} = -\\frac{D}{b_{1} b_{2}}, \\qquad k_{2} - k_{1} = \\frac{c_{2} b_{1} - c_{1} b_{2}}{b_{1} b_{2}} = -\\frac{D_{x}}{b_{1} b_{2}}', explanation: 'Two exact common-denominator computations. The slope gap is $D$ wearing the scale $b_{1} b_{2}$; the intercept gap is $D_{x}$ in the same dress — the instruments of 6.1 ARE the geometry.' },
          { label: 'Read the meeting line', formula: '-\\frac{D}{b_{1} b_{2}} \\cdot x = -\\frac{D_{x}}{b_{1} b_{2}} \\;\\iff\\; D \\cdot x = D_{x}', explanation: 'Multiply both members by $-b_{1} b_{2}$ — lawful, nonzero — and the gathered meeting line IS the first elimination identity of 6.1, arrived at from pure geometry with nothing eliminated.' },
          { label: 'Divide when D ≠ 0', formula: 'D \\neq 0 \\;\\Longrightarrow\\; x = \\frac{D_{x}}{D}, \\qquad y = m_{1} x + k_{1} = \\frac{D_{y}}{D}', explanation: 'The machine divides: the x-coordinate is forced, and substituting back prices the y-coordinate at the second identity. The crossing is the Cramer pair, and it is unique — every meeting must satisfy the same gathered line, and a linear claim with nonzero coefficient allows one value only (5.3, door one).' },
          { label: 'The verdict when D = 0', formula: 'D = 0: \\quad D_{x} \\neq 0 \\Rightarrow \\text{parallel — none}; \\qquad D_{x} = 0 \\Rightarrow k_{1} = k_{2} \\Rightarrow \\text{coincident}', explanation: 'The gathered claim collapses to $0 \\cdot x = D_{x}$ — 5.3’s doors two and three. $D_{x} \\neq 0$: false with no unknown, no meeting — parallel. $D_{x} = 0$: true for every $x$, and with $b_{1} b_{2} \\neq 0$ it forces $k_{1} = k_{2}$ exactly — equal slopes AND equal intercepts: the dresses agree, the lines coincide.' },
        ], result: 'Two non-vertical lines meet exactly once iff D ≠ 0 — the slopes differ; D = 0 with Dx ≠ 0 is parallel (none); D = Dx = 0 is coincident (every point) — and the crossing, when it exists, is the Cramer pair (Dx/D, Dy/D).' },
        { kind: 'equation', latex: 'm_{1} - m_{2} = -\\frac{D}{b_{1} b_{2}}, \\qquad k_{2} - k_{1} = -\\frac{D_{x}}{b_{1} b_{2}}, \\qquad x^{*} = \\frac{k_{2} - k_{1}}{m_{1} - m_{2}} = \\frac{D_{x}}{D}', note: 'the meeting theorem in one line (b1·b2 ≠ 0): the slope gap carries D, the intercept gap carries Dx — the instruments of 6.1 ARE the geometry.' },
        { kind: 'para', text: 'Pause on what just happened. In 6.1 the instruments $D$, $D_{x}$, $D_{y}$ were born as bookkeeping for elimination — cross-products of coefficients, priced over a grid of $4{,}769{,}856$ systems. The derivation above never eliminated anything: it dressed two lines, subtracted, and the SAME instruments fell out as the slope gap and the intercept gap. That is what it means for two languages to describe one theorem. The verifier made the agreement exhaustive rather than exemplary: over the coarse grid of a million-odd crossing systems, the line-algebra crossing $\\left(\\frac{k_{2} - k_{1}}{m_{1} - m_{2}}, \\ldots\\right)$ equals the Cramer pair exactly — as fractions, everywhere, $822{,}016$ sloped crossings and $194{,}688$ vertical ones, no exceptions.' },
        { kind: 'example', title: 'Find the crossing by line algebra — then meet Cramer there', steps: [
          'System: $x + 2y = 8$ and $3x - y = 3$ — the 6.1 trichotomy’s fourth row, now with faces.',
          'Dress: $y = -\\tfrac{1}{2}x + 4$ (slope $-\\tfrac{1}{2}$, intercept $4$) and $y = 3x - 3$ (slope $3$, intercept $-3$).',
          'Set the dresses equal: $-\\tfrac{1}{2}x + 4 = 3x - 3$, so $7 = \\tfrac{7}{2} x$ and $x = 2$; then $y = 3(2) - 3 = 3$.',
          'Cramer agrees: $D = 1(-1) - 3(2) = -7$, $D_{x} = 8(-1) - 3(2) = -14$, $D_{y} = 1(3) - 3(8) = -21$ — so $(D_{x}/D, D_{y}/D) = (2, 3)$.',
          'Check in both originals: $2 + 2(3) = 8$ and $3(2) - 3 = 3$ — both true.',
          'Hence — The lines cross at $(2, 3)$ — line algebra and Cramer land on the same pair, as the theorem promises.',
        ] },
        { kind: 'para', text: 'A word on what the picture adds to the methods of 6.2. Elimination now has a visible meaning: dressing both equations and subtracting is comparing the two lines in a common language, and the "leftover" $D \\cdot x = D_{x}$ is the gathered meeting line. Substitution is walking one line until it meets the other. The double check of 6.2 — substituting into both originals — is verifying that the claimed point truly lies on BOTH lines, the geometric sine qua non. Nothing in the methods changes; everything in the methods becomes seeable.' },
        { kind: 'heading', text: 'Verticals, Horizontals and the Hidden Crossings' },
        { kind: 'para', text: 'The theorem was stated for non-vertical lines, and the honest debt is now paid. A vertical line $x = c/a$ meets every non-vertical line exactly once — the vertical fixes the x-coordinate, the sloped line hands over the y: $x = 3$ with $2x - y = 1$ meets at $(3, 5)$, no assembly required. Two verticals, though, are another story: $x = 3$ and $x = 5$ have $D = a_{1} b_{2} - a_{2} b_{1} = 0$ identically (both $b$’s are zero), $D_{x} = 0$ identically too — and the verdict is carried by $D_{y} = a_{1} c_{2} - a_{2} c_{1}$ alone: $D_{y} \\neq 0$ for the distinct pair (parallel, never meeting), $D_{y} = 0$ exactly when the two verticals are the same line in two dresses ($x = 3$ and $2x = 6$). The verifier confirms the pattern is complete: over the full grid, a $D = 0$ system is ALWAYS both-non-vertical or both-vertical — one vertical against one sloped line is mathematically incapable of $D = 0$, which is the algebra of "a vertical meets every non-vertical line".' },
        { kind: 'para', text: 'Horizontals hide a second subtlety. Two distinct horizontal lines ($y = 2$ and $y = 5$, say) are parallel — but here $D_{y} = a_{1} c_{2} - a_{2} c_{1} = 0$ identically, because both $a$’s are zero: the $D_{y}$ test falls silent and $D_{x}$ alone decides. The law behind it was verified over every parallel-distinct pair in the grid: when $D = 0$, the identity $b_{1} D_{y} = -a_{1} D_{x}$ holds exactly, so $D_{y}$ vanishes precisely when $a_{1} = 0$ — the horizontal case. No single instrument is sacred; the trichotomy of 6.1 (some instrument nonzero ⟺ none verdict) is what survives every special case, exactly as the type-case table promised.' },
        { kind: 'para', text: 'And now the honesty that pictures alone would hide: the meeting point need not be a lattice point. The system $x + 2y = 3$ and $x - 2y = 1$ dresses as $y = -\\tfrac{1}{2} x + \\tfrac{3}{2}$ and $y = \\tfrac{1}{2} x - \\tfrac{1}{2}$ — different slopes, so the lines cross exactly once, at $(2, \\tfrac{1}{2})$. Yet the integer-pair census of 6.1, swept over all $625$ pairs in $[-12, 12]^{2}$, finds NOTHING: no integer pair passes both tests, because the unique real solution is not an integer pair. The verifier counted this over the whole coarse grid: $222{,}592$ of the $1{,}016{,}704$ crossing systems cross at lattice points visible to the census — about $22$ percent — and the other $794{,}112$ cross between the lattice points, exactly one real meeting each, invisible to any integer sweep. The geometry sees every crossing; the lattice census only sees the ones that land on grid points. Both instruments are honest; neither is the other.' },
        { kind: 'example', title: 'The hidden crossing — one real meeting, no integer pair', steps: [
          'System: $x + 2y = 3$ and $x - 2y = 1$. Dresses: $y = -\\tfrac{1}{2}x + \\tfrac{3}{2}$ and $y = \\tfrac{1}{2}x - \\tfrac{1}{2}$.',
          'Set equal: $-\\tfrac{1}{2}x + \\tfrac{3}{2} = \\tfrac{1}{2}x - \\tfrac{1}{2}$, so $2 = x$; then $y = \\tfrac{1}{2}(2) - \\tfrac{1}{2} = \\tfrac{1}{2}$.',
          'Elimination sees it faster: the $y$-coefficients are opposites — add memberwise, $2x = 4$, so $x = 2$ and $y = \\tfrac{1}{2}$.',
          'Check in both originals: $2 + 2 \\cdot \\tfrac{1}{2} = 3$ and $2 - 2 \\cdot \\tfrac{1}{2} = 1$ — both true, exactly.',
          'The census of 6.1 swept $625$ integer pairs and found zero solutions — the meeting hides at a half-coordinate between the lattice points.',
          'Hence — The lines cross exactly once, at $(2, \\tfrac{1}{2})$ — a real meeting the integer census cannot see.',
        ] },
        { kind: 'example', title: 'Verticals and horizontals at the machine', steps: [
          'System (i): $x = 3$ and $2x - y = 1$. The vertical fixes $x = 3$; the sloped line hands over $y = 2(3) - 1 = 5$. Meeting: $(3, 5)$. Instruments: $D = 1(-1) - 2(0) = -1 \\neq 0$ — a vertical against a sloped line always crosses.',
          'System (ii): $x = 3$ and $x = 5$. Two verticals: $D = 0$ and $D_{x} = 0$ identically; $D_{y} = 1(5) - 1(3) = 2 \\neq 0$ — parallel, never meeting. No x is both 3 and 5.',
          'System (iii): $y = 2$ and $2y = 4$. Both horizontal, same line: every point shared. The second equation is the first doubled.',
          'System (iv): $y = 2$ and $y = 5$. Distinct horizontals: $D = 0$, and $D_{x} = 2(1) - 5(1) = -3 \\neq 0$ decides — parallel. Here $D_{y} = 0$ identically; the $D_{x}$ test does the work.',
          'Hence — A vertical meets every non-vertical line once; two verticals (like two horizontals) are parallel unless they are the same line.',
        ] },
        { kind: 'callout', tone: 'warn', title: 'Caution — same slope is not the same line', text: 'The classic geometry error is announcing "coincident" the moment the slopes agree. Equal slopes make the lines PARALLEL; coincident — every point shared — needs the intercepts equal too, and the check is one subtraction: $k_{1} - k_{2} = -D_{x}/(b_{1} b_{2})$, so equal intercepts ⟺ $D_{x} = 0$. The mirror error is manufacturing a meeting for parallel lines: $x + y = 4$ and $x + y = 7$ have no shared pair, and any "solution" is a lie — the gathered claim $0 = 3$ is false with no unknown left (5.3’s door two). And when a crossing IS found, the double check of 6.2 keeps its full force: the claimed point must satisfy BOTH originals — the $(2, \\tfrac{1}{2})$ check above passed exactly, in fractions, not in rounded decimals.' },
        { kind: 'heading', text: 'The k-Family Slide and the Collected Machine' },
        { kind: 'para', text: 'The find-k questions of 6.1 and 6.2 now get their picture. Take the family $2x + 2y = k$ against the fixed line $x + y = 4$. The left sides are proportional for EVERY $k$ — $D = 1 \\cdot 2 - 2 \\cdot 1 = 0$ identically — so the sliding line always keeps the slope $-1$ of the fixed line. What moves with $k$ is the intercept: $k_{2} = k/2$, and the intercept gap is $k_{2} - k_{1} = k/2 - 4 = (k - 8)/2 = -D_{x}/(b_{1} b_{2})$ with $D_{x} = 8 - k$. So the sliding line is parallel for every $k \\neq 8$ — forever $3$ units off when $k = 2$, forever $(20 - 8)/2 = 6$ off when $k = 20$ — and at exactly $k = 8$ the intercepts agree, the gap closes, and the slider lands ON the fixed line: coincident. The family is a line sliding across the plane, keeping its tilt; the question "for which $k$ do the lines share every point?" is the question "when does the slide arrive?" — and the instrument answers: when $D_{x} = 0$.' },
        { kind: 'equation', latex: '2 x + 2 y = k \\;\\text{ against }\\; x + y = 4: \\quad D = 0 \\text{ identically}, \\quad D_{x} = 8 - k \\;\\implies\\; \\begin{cases} k \\neq 8 & \\text{parallel — the slide never arrives} \\\\ k = 8 & \\text{coincident — the slide lands on the fixed line} \\end{cases}', note: 'the k-family slide: the slope is locked by the proportional left sides (D = 0 for every k); the intercept gap (8 − k)/2 carries the whole story — one number separates forever-apart from the same line.' },
        { kind: 'example', title: '6.2’s find-k question, seen as geometry', steps: [
          'System: $3x + 4y = 12$ and $6x + k y = 24$ (the 6.2 exercise, re-seen).',
          'Slopes: $m_{1} = -\\tfrac{3}{4}$; $m_{2} = -\\tfrac{6}{k}$ for $k \\neq 0$. Equal slopes ⟺ $\\tfrac{6}{k} = \\tfrac{3}{4}$ ⟺ $k = 8$.',
          'At $k = 8$: the constants are proportional too — $24 = 2 \\times 12$ with the left sides in ratio 2 — so the second line LIES ON the first: coincident, every point shared.',
          'At $k \\neq 8$: slopes differ — the lines cross exactly once, and NO value of $k$ makes them parallel: the constants double along with the left side, so $D = 0$ and $D_{x} \\neq 0$ never co-occur here.',
          'Hence — $k = 8$ coincides; every other $k$ crosses exactly once — parallel is impossible in this family.',
        ] },
        { kind: 'figure', caption: 'The slope machine: two questions — slopes equal? intercepts equal? — and the three outcomes, with the D-instruments of 6.1 printed on the arrows. One theorem, two languages.', svg: slopeMachineSvg() },
        { kind: 'callout', tone: 'insight', title: 'Insight — the census, revisited with eyes open', text: 'Every number this chapter has banked now has a face. The full-grid verdicts of 6.1 — $4{,}604{,}912$ unique, $157{,}504$ none, $7{,}440$ infinitely many — split geometrically, verified exactly: the $164{,}944$ same-slope ($D = 0$) systems are $157{,}504$ parallel pairs and $7{,}440$ coincident ones, the parallel class itself splitting into $134{,}000$ non-vertical pairs, $23{,}504$ double-vertical pairs and the horizontals hiding inside the count with their $D_{y}$ asleep. The one-verdict class is the class of different slopes — every one of the $4.6$ million crossings verified to land exactly on its Cramer pair. Even the verdict machine of 5.3 reappears inside the derivation: the meeting line $(m_{1} - m_{2}) x = k_{2} - k_{1}$ IS a gathered linear equation, and the three doors of 5.3 open onto the three meetings. Nothing new was needed; everything old became visible.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — consistent and inconsistent, the geometry pays its debt', text: 'A system is said to be consistent when it has at least one solution — the crossing case (exactly one) and the coincident case (infinitely many) alike; it is said to be inconsistent when it has none — the parallel case. 6.1 coined these words and promised the geometry; here it is: consistent systems are exactly those whose lines share at least one point, and the inconsistent ones are exactly the parallel pairs. When the two equations of a consistent system are the same line in two dresses — one a scalar multiple of the other — the equations are said to be dependent, and the infinite family of solutions is the one line’s census, exactly the parametrized families 6.1 built. A crossing system’s equations are independent: neither is a consequence of the other, and the meeting point is the unique pair of numbers that answers both.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — Descartes’s wedding of algebra and geometry', text: 'The double-reading you just learned has a birthday: 1637, when René Descartes’s *La Géométrie* — published as an appendix to his *Discourse on Method* — married the two oldest children of mathematics. Before Descartes, algebra was a calculus of quantities and geometry a science of figures; after him, every equation could be drawn and every curve could be written. The line dress of this lesson is the wedding’s first fruit: $a x + b y = c$ IS a line, and the Greeks’ straight lines ARE linear equations. Even the ancient hierarchy of postulates enters the algebra: that two distinct lines meet in at most one point is the plane’s parallel doctrine, and this lesson’s $D = 0$ is exactly where the algebra voices it — equal slopes, the meeting refused, no coefficient left to divide by. Two centuries later mathematicians discovered geometries where the doctrine fails and parallels behave differently; in those worlds $D = 0$ would not mean "never meet". On the flat plane of this course — the plane your census lives on — the theorem holds because the number laws hold, and the picture is their portrait.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the graphical questions, priced', text: 'The examinations ask this lesson’s content in four shapes. One: the graphical solve — draw both lines, read the crossing — where the marks live in correct intercepts and slopes, and the answer must be checked in both equations (a read-off is a claim, not a proof). Two: the parallel/coincident find-k — "for which $k$ do $x + 2y = 5$ and $2x + k y = 6$ never meet?" — answered by $D = k - 4 = 0$ (so $k = 4$) AND the confirming $D_{x} \\neq 0$; the school canon’s ratio test — $\\tfrac{a_{1}}{a_{2}} = \\tfrac{b_{1}}{b_{2}} \\neq \\tfrac{c_{1}}{c_{2}}$ for parallel, with all three ratios equal for coincident — is this lesson’s cross-products spoken as fractions (6.1 re-priced them exactly; the geometry is what the ratios MEAN). Three: the consistency vocabulary — one-line answers quoting the table: parallel ⟺ inconsistent, crossing or coincident ⟺ consistent. Four: the hidden-crossing trap — a system whose crossing is fractional, where the full-credit solution carries the fraction ($x = \\tfrac{14}{5}$, $y = \\tfrac{9}{5}$) and the half-credit trap is rounding it to a lattice pair that satisfies NEITHER equation. The NCERT class-10 graphical method is this whole lesson in miniature, and chapter 10 will draw the plane properly; here the discipline is reading meetings off dresses at speed, with instruments confirming.' },
        { kind: 'para', text: 'From the above discussion, the collected machine stands as follows — the whole chapter in one instrument set:' },
        { kind: 'list', marker: 'roman', items: [
          '(i) Every equation $a x + b y = c$ with $b \\neq 0$ dresses as a line $y = -\\tfrac{a}{b} x + \\tfrac{c}{b}$: slope $m = -a/b$, intercept $k = c/b$; $b = 0$ is the vertical $x = c/a$.',
          '(ii) Two non-vertical lines meet exactly once iff their slopes differ — $D \\neq 0$ — and the meeting point is the Cramer pair $(D_{x}/D, D_{y}/D)$: the slope gap carries $D$, the intercept gap carries $D_{x}$.',
          '(iii) Equal slopes ($D = 0$) split by the intercepts: unequal ($D_{x} \\neq 0$) — parallel, the none verdict; equal — coincident, the infinitely-many verdict. Verticals defer to $D_{y}$; horizontals to $D_{x}$; the trichotomy survives every special case.',
          '(iv) The three meetings ARE the three verdicts of 5.3 and the three classes of 6.1 — one theorem spoken in geometry, in algebra, and in instruments.',
          '(v) The census sees lattice crossings only; about $22$ percent of crossings in the verifier’s grid are lattice-visible, the rest hide between grid points — one real meeting each, no integer pair.',
        ] },
        { kind: 'para', text: 'One bridge closes the chapter — and points at the next. A line does more than collect its own points: it CUTS the plane in two, one point on the line, whole regions on either side. Every question this chapter asked was a point question — which pair, how many pairs. Chapter 7 asks the region question: not "where does the balance sit" but "which side of the line" — $x + y < 10$, budgets that must not overflow, margins that must be beaten. Order joins algebra, the number line of ANS chapter 8 grows up into half-planes, and the line this lesson drew becomes the boundary the inequalities live against. The balance settles points; the next chapter teaches it to rule regions.' },
        { kind: 'formula', name: 'The line dress', latex: 'a x + b y = c \\;\\iff\\; y = -\\frac{a}{b}\\,x + \\frac{c}{b} \\quad (b \\neq 0)', note: 'slope m = −a/b, y-intercept k = c/b; b = 0 gives the vertical x = c/a — no slope, all y' },
        { kind: 'formula', name: 'The meeting theorem', latex: 'm_{1} - m_{2} = -\\frac{D}{b_{1} b_{2}}, \\quad k_{2} - k_{1} = -\\frac{D_{x}}{b_{1} b_{2}}, \\quad (x^{*}, y^{*}) = \\left(\\frac{D_{x}}{D}, \\frac{D_{y}}{D}\\right)', note: 'equal slopes ⟺ D = 0; equal intercepts ⟺ Dx = 0; the crossing is the Cramer pair — line algebra and elimination are one theorem' },
        { kind: 'formula', name: 'The geometry trichotomy', latex: '\\begin{cases} D \\neq 0 & \\text{crossing — exactly one meeting point} \\\\ D = 0,\\ D_{x} \\neq 0 & \\text{parallel — no meeting point (inconsistent)} \\\\ D = D_{x} = D_{y} = 0 & \\text{coincident — every point shared} \\end{cases}', note: 'verticals defer to Dy, horizontals to Dx — the trichotomy of 6.1 survives every special case' },
        { kind: 'quiz', title: 'Check yourself', items: [
          {
            q: 'Dress $2x + 3y = 6$ as a line $y = m \\cdot x + k$.',
            options: ['$y = -\\tfrac{2}{3}x + 2$', '$y = \\tfrac{2}{3}x + 2$', '$y = -\\tfrac{3}{2}x + 6$', '$y = 2x - 3$'],
            answer: 0,
            explain: 'The dress divides by $b = 3$: $y = \\tfrac{6 - 2x}{3} = -\\tfrac{2}{3}x + 2$. Option 2 flips the slope’s sign — $m = -a/b = -\\tfrac{2}{3}$, not $+\\tfrac{2}{3}$; option 3 swaps the roles, reading the slope as $-b/a$ and the intercept as $c$; option 4 is not a dress at all — the equation solved for $y$ never produces $y = 2x - 3$.',
          },
          {
            q: 'Two non-vertical lines carry the same slope but different intercepts. They meet —',
            options: ['in exactly one point', 'nowhere — they are parallel', 'at every point', 'in exactly two points'],
            answer: 1,
            explain: 'Equal slopes with unequal intercepts is the parallel case: $D = 0$ with $D_{x} \\neq 0$, the lines rising together forever apart. One meeting point needs $D \\neq 0$ (different slopes); every point needs the SAME intercept too (coincident); and two distinct straight lines cannot share two points — two points would force the same slope AND the same intercept.',
          },
          {
            q: 'The vertical line $x = 4$ and the horizontal line $y = -1$ meet at —',
            options: ['$(4, 1)$', '$(-1, 4)$', '$(4, -1)$', 'nowhere — vertical and horizontal lines are parallel'],
            answer: 2,
            explain: 'The vertical fixes the x-coordinate at $4$; the horizontal fixes the y-coordinate at $-1$; the shared point is $(4, -1)$. Option 1 flips the sign of the y-value; option 2 swaps the coordinates — the pair $(x, y)$ lists $x$ first; option 4 is the parallel verdict, but a vertical meets every non-vertical line exactly once — here $D = 1 \\cdot 1 - 0 \\cdot 0 = 1 \\neq 0$, the crossing instrument.',
          },
          {
            q: 'For which $k$ does $2x + 2y = k$ share EVERY point with $x + y = 4$?',
            options: ['$k = 4$', '$k = 8$', '$k = 2$', 'no value of $k$ — the lines can never coincide'],
            answer: 1,
            explain: 'The left sides are proportional for every $k$ ($D = 0$ identically — same slope $-1$), so coinciding needs the constants proportional too: $k = 2 \\times 4 = 8$, the second equation the first doubled. At $k = 4$ or $k = 2$ the lines stay parallel distinct ($D_{x} = 8 - k \\neq 0$); and $k = 8$ IS a value — the slide lands exactly on the fixed line.',
          },
          {
            q: '$x + 2y = 3$ and $x - 2y = 1$ cross at $(2, \\tfrac{1}{2})$. What does the integer-pair census of 6.1 find?',
            options: ['exactly that pair — it is a solution after all', 'two pairs, one on each line', 'infinitely many pairs, as always when lines cross', 'nothing — the crossing hides between lattice points'],
            answer: 3,
            explain: 'The crossing is the UNIQUE solution and its y-coordinate is a half — no integer pair satisfies both equations (the verifier swept all $625$ windowed pairs: zero hits). Option 1 is impossible: a pair on one line only fails the other test; option 2 describes coincident lines, but these slopes differ; option 3 contradicts uniqueness — a crossing system with two integer solutions would have two meeting points.',
          },
        ] },
        { kind: 'exercises', title: 'Exercises 6.3', sets: [
          { level: 'L1', questions: [
            {
              q: 'Dress $x + y = 6$ as a line and read off the slope and the y-intercept.',
              solution: [
                'Subtract $x$ from both members: $y = 6 - x$, that is $y = -x + 6$.',
                'Read: slope $m = -1$, intercept $k = 6$ — the line crosses the y-axis at $(0, 6)$.',
                'Check the instruments: $m = -a/b = -1/1 = -1$ and $k = c/b = 6/1 = 6$ — agreeing.',
              ],
              answer: '$y = -x + 6$: slope $-1$, intercept $6$.',
            },
            {
              q: 'Dress $2x - y = 4$ and read off the slope and the y-intercept.',
              solution: [
                'Add $y$ to both members, subtract $4$: $y = 2x - 4$.',
                'Read: slope $m = 2$, intercept $k = -4$ — the crossing with the y-axis is at $(0, -4)$.',
                'Check by instruments: $m = -a/b = -2/(-1) = 2$ and $k = c/b = 4/(-1) = -4$ — agreeing.',
              ],
              answer: '$y = 2x - 4$: slope $2$, intercept $-4$.',
            },
            {
              q: 'Dress $y + 3 = 0$. What kind of line is it?',
              solution: [
                'The equation is $0 \\cdot x + 1 \\cdot y = -3$: $a = 0$, $b = 1$, $c = -3$.',
                'Dress: $y = -3$ — slope $m = -a/b = 0$, intercept $k = -3$.',
                'Slope zero: a horizontal line, level at height $-3$; every $x$ welcome, but $y$ is pinned.',
              ],
              answer: '$y = -3$ — the horizontal line at height $-3$ (slope $0$, intercept $-3$).',
            },
          ] },
          { level: 'L2', questions: [
            {
              q: 'Classify without solving: $x + y = 6$ and $x + y = 9$.',
              solution: [
                'Dresses: $y = -x + 6$ and $y = -x + 9$.',
                'Slopes equal ($-1$ both — $D = 1 - 1 = 0$); intercepts $6 \\neq 9$ ($D_{x} = 6 - 9 = -3 \\neq 0$).',
                'Same slope, different intercepts: parallel — no shared point, the none verdict.',
              ],
              answer: 'Parallel — the system has no solution.',
            },
            {
              q: 'Classify without solving: $x + y = 6$ and $2x + 2y = 12$.',
              solution: [
                'Dresses: $y = -x + 6$ and, dividing the second by 2, $y = -x + 6$ — the SAME dress.',
                'Slopes equal and intercepts equal: $D = D_{x} = D_{y} = 0$.',
                'The second equation is the first doubled: coincident — every point of the line is shared, infinitely many pairs.',
              ],
              answer: 'Coincident — infinitely many solutions (one line in two dresses).',
            },
            {
              q: 'Classify, and find the meeting point: $x + y = 6$ and $2x - y = 3$.',
              solution: [
                'Dresses: $y = -x + 6$ (slope $-1$) and $y = 2x - 3$ (slope $2$) — slopes differ, crossing.',
                'Set the dresses equal: $-x + 6 = 2x - 3$, so $9 = 3x$ and $x = 3$; then $y = 3$.',
                'Check in both originals: $3 + 3 = 6$ and $2(3) - 3 = 3$ — both true.',
              ],
              answer: 'Crossing — the lines meet at $(3, 3)$.',
            },
          ] },
          { level: 'L3', questions: [
            {
              q: 'Find the crossing of $2x + y = 7$ and $x - y = 2$ by line algebra; confirm with Cramer.',
              solution: [
                'Dresses: $y = -2x + 7$ (slope $-2$, intercept $7$) and $y = x - 2$ (slope $1$, intercept $-2$).',
                'Set equal: $-2x + 7 = x - 2$, so $9 = 3x$ and $x = 3$; then $y = 3 - 2 = 1$.',
                'Cramer agrees: $D = 2(-1) - 1(1) = -3$, $D_{x} = 7(-1) - 2(1) = -9$, $D_{y} = 2(2) - 1(7) = -3$ — so $(D_{x}/D, D_{y}/D) = (3, 1)$.',
                'Check in both originals: $2(3) + 1 = 7$ and $3 - 1 = 2$ — both true.',
              ],
              answer: 'The lines cross at $(3, 1)$.',
            },
            {
              q: 'Find the crossing of $3x + 2y = 12$ and $x - y = 1$ — and say what the integer census sees.',
              solution: [
                'Dresses: $y = -\\tfrac{3}{2}x + 6$ and $y = x - 1$ — slopes $-\\tfrac{3}{2}$ and $1$ differ: crossing exactly once.',
                'Set equal: $-\\tfrac{3}{2}x + 6 = x - 1$, so $7 = \\tfrac{5}{2}x$ and $x = \\tfrac{14}{5}$; then $y = \\tfrac{14}{5} - 1 = \\tfrac{9}{5}$.',
                'Check in both originals, exactly: $\\tfrac{42}{5} + \\tfrac{18}{5} = \\tfrac{60}{5} = 12$ and $\\tfrac{14}{5} - \\tfrac{9}{5} = \\tfrac{5}{5} = 1$ — both true.',
                'The meeting is fractional — the lattice census finds NO integer pair; the crossing hides between grid points (one real meeting, honestly reported).',
              ],
              answer: 'The lines cross at $\\left(\\tfrac{14}{5}, \\tfrac{9}{5}\\right)$ — no integer pair solves the system.',
            },
            {
              q: 'Find the meeting of $x = 2$ and $3x + y = 8$.',
              solution: [
                'The vertical line fixes $x = 2$ — no dressing needed on that side.',
                'Feed $x = 2$ into the sloped line: $3(2) + y = 8$, so $y = 2$.',
                'Check: $3(2) + 2 = 8$ — true; and $(2, 2)$ has the vertical’s x-coordinate by construction.',
                'Instruments agree: $D = 1(1) - 3(0) = 1 \\neq 0$ — a vertical meets every non-vertical line exactly once.',
              ],
              answer: 'The lines meet at $(2, 2)$.',
            },
          ] },
          { level: 'L4', questions: [
            {
              q: 'For which $k$ do $x + 2y = 5$ and $2x + k y = 6$ never meet? What happens for every other $k$?',
              solution: [
                'Never meeting needs parallel: $D = 1 \\cdot k - 2 \\cdot 2 = k - 4 = 0$, so $k = 4$.',
                'Confirm the intercept gap refuses to close: at $k = 4$, $D_{x} = 5(4) - 6(2) = 8 \\neq 0$ — parallel distinct, honestly none.',
                'For $k \\neq 4$: $D \\neq 0$ — different slopes, exactly one crossing; for instance $k = 5$ gives $D = 1$, $D_{x} = 13$, $D_{y} = -4$: the meeting $(13, -4)$, checked in both originals ($13 - 8 = 5$; $26 - 20 = 6$).',
              ],
              answer: '$k = 4$ — parallel, no meeting; every $k \\neq 4$ crosses exactly once.',
            },
            {
              q: 'The line $2x + 2y = k$ slides against $x + y = 4$. For which $k$ does it land ON the fixed line, and what is it doing for every other $k$?',
              solution: [
                'The left sides are proportional for every $k$: $D = 1(2) - 2(1) = 0$ identically — the slider always keeps slope $-1$.',
                'The intercept gap is what moves: $D_{x} = 4(2) - k(1) = 8 - k$; coincident needs $D_{x} = 0$, that is $k = 8$.',
                'At $k = 8$ the slider reads $2x + 2y = 8$ — the fixed line $x + y = 4$ doubled: every point shared.',
                'For $k \\neq 8$: parallel, forever $(8 - k)/2$ away in the y-direction — at $k = 2$ three units below, at $k = 20$ six above.',
              ],
              answer: '$k = 8$ — coincident; every other $k$ holds the slider parallel, $(8 - k)/2$ units off.',
            },
          ] },
          { level: 'L5', questions: [
            {
              q: 'A line of slope $2$ passes through $(0, -1)$; a line of slope $-1$ passes through $(0, 4)$. Where do they meet?',
              solution: [
                'Slope plus intercept builds the dress directly: the first is $y = 2x - 1$; the second is $y = -x + 4$.',
                'Set equal: $2x - 1 = -x + 4$, so $3x = 5$ and $x = \\tfrac{5}{3}$; then $y = 2 \\cdot \\tfrac{5}{3} - 1 = \\tfrac{7}{3}$.',
                'Check in both dresses: $2 \\cdot \\tfrac{5}{3} - 1 = \\tfrac{10}{3} - \\tfrac{3}{3} = \\tfrac{7}{3}$ and $-\\tfrac{5}{3} + 4 = \\tfrac{-5 + 12}{3} = \\tfrac{7}{3}$ — both true.',
                'The meeting is fractional — hidden from the lattice, exactly as the theory allows.',
              ],
              answer: 'The lines meet at $\\left(\\tfrac{5}{3}, \\tfrac{7}{3}\\right)$.',
            },
            {
              q: 'Three lines: $y = x + 1$, $y = -x + 5$ and $y = x - 3$. Which pairs meet, where, and which never?',
              solution: [
                'Slopes: $1$, $-1$, $1$. The first and third share their slope — check their intercepts: $1 \\neq -3$ — parallel, never meeting.',
                'First against second: $x + 1 = -x + 5$, so $2x = 4$, $x = 2$, $y = 3$ — meeting at $(2, 3)$. Check: $3 = 2 + 1$ and $3 = -2 + 5$ — both true.',
                'Second against third: $-x + 5 = x - 3$, so $2x = 8$, $x = 4$, $y = 1$ — meeting at $(4, 1)$. Check: $1 = 4 - 3$ and $1 = -4 + 5$ — both true.',
                'So the picture is a triangle’s corners: two crossings and one refused meeting — the parallel pair never contributes a vertex.',
              ],
              answer: 'The first and second meet at $(2, 3)$; the second and third at $(4, 1)$; the first and third are parallel — no meeting.',
            },
          ] },
          { level: 'L6', questions: [
            {
              q: 'Prove the meeting theorem: for $b_{1} b_{2} \\neq 0$, the systems with $D \\neq 0$ are exactly those whose two lines have different slopes, and the line-algebra crossing equals the Cramer pair.',
              solution: [
                'Dress both: $y = m_{1} x + k_{1}$ and $y = m_{2} x + k_{2}$ with $m = -a/b$ and $k = c/b$ — lawful divisions since $b_{1}, b_{2} \\neq 0$.',
                'A meeting point satisfies both dresses memberwise, hence the gathered claim $(m_{1} - m_{2}) x = k_{2} - k_{1}$ — one linear equation in one unknown, 5.3’s machine.',
                'Price the gaps: $m_{1} - m_{2} = \\frac{-a_{1} b_{2} + a_{2} b_{1}}{b_{1} b_{2}} = -\\frac{D}{b_{1} b_{2}}$ and $k_{2} - k_{1} = \\frac{c_{2} b_{1} - c_{1} b_{2}}{b_{1} b_{2}} = -\\frac{D_{x}}{b_{1} b_{2}}$ — exact fractions, no approximation anywhere.',
                'The gathered claim is therefore $-\\frac{D}{b_{1} b_{2}} x = -\\frac{D_{x}}{b_{1} b_{2}}$, which multiplies (lawfully, $b_{1} b_{2} \\neq 0$) to $D \\cdot x = D_{x}$ — the first elimination identity of 6.1, reached from pure geometry.',
                'If $D \\neq 0$: every meeting has $x = D_{x}/D$, and $y = m_{1} x + k_{1}$ prices out at $D_{y}/D$ — so the meeting exists, is unique, and IS the Cramer pair; different slopes force the single crossing.',
                'If $D = 0$: the slopes are equal (the gaps show it), the gathered claim collapses to $0 \\cdot x = D_{x}$ — no meeting when $D_{x} \\neq 0$, and when $D_{x} = 0$ the intercepts agree too ($k_{1} = k_{2}$ exactly), so the dresses coincide and every point is shared. Hence $D \\neq 0$ characterizes the crossing systems, and the crossing equals Cramer — the two languages are one theorem.',
              ],
              answer: 'The slope gap is $-D/(b_{1}b_{2})$ and the intercept gap $-D_{x}/(b_{1}b_{2})$: the meeting machine reads $D \\cdot x = D_{x}$ — so $D \\neq 0$ means different slopes and a unique Cramer crossing; $D = 0$ splits into parallel ($D_{x} \\neq 0$) and coincident ($D_{x} = 0$).',
            },
          ] },
        ] },
      ],
    },
    {
      id: 'al-one-linear-one-quadratic',
      number: '6.4',
      title: 'One Linear, One Quadratic',
      concepts: [
        'mixed system',
        'solution pair census',
        'the substitution pipeline',
        'reduced quadratic',
        'discriminant verdict',
        'tangent condition',
        'symmetric conversion',
        'extraneous pair',
      ],
      objectives: [
        'settle a one-linear-one-quadratic system by the substitution pipeline, checking every pair in the originals',
        'read the three verdicts — secant, tangent, outsider — off the reduced discriminant, for a parabola or a circle',
        'derive and use the tangent condition k² = (1+m²)r²',
        'convert symmetric systems into sums and products through the identity bank',
        'settle sum-and-product word problems — rectangles, gardens, number pairs',
        'detect and discard extraneous pairs produced by squaring a given equation',
      ],
      prerequisites: ['al-substitution-and-elimination', 'al-the-quadratic-formula-and-the-discriminant', 'al-roots-and-coefficients-viete-relations'],
      sources: ['hall-knight-elementary-algebra', 'ncert-math10-ch3-pair-linear', 'khattar-qa-4e', 'cengage-jee-style'],
      blocks: [
        { kind: 'para', text: 'Chapter 6 has settled one world completely: two assertions, both linear, one truth. The census of 6.1, the methods of 6.2, the geometry of 6.3 — every instrument assumed both equations were lines. But the questions that arrive uninvited are rarely so polite. A rectangle is fenced with 14 metres of border and its diagonal measures 5 metres: the border reads $2(x + y) = 14$, a linear assertion, while the diagonal reads $x^2 + y^2 = 25$ by Pythagoras — a quadratic one. A straight track must just graze a circular lake. The sum of two numbers is fixed, and so is the sum of their squares. In every case the system is **mixed**: one equation of the first degree, one of the second.' },
        { kind: 'para', text: 'The old discipline survives untouched. A pair $(s, t)$ is a solution of the system exactly when it passes BOTH tests — the sieve of 6.1 with one straight panel and one curved. What changes is the census itself. A linear-and-linear system, the chapter proved, has one pair, none, or infinitely many. A linear-and-quadratic system has **at most two**. The reason is already banked in 9.3: substitution collapses the system to a single quadratic in one unknown, and a quadratic owns at most two roots. This lesson prices that collapse honestly — as a theorem, as a geometry, and as an art.' },
        { kind: 'callout', tone: 'definition', title: 'Definition — mixed system and its solution pairs', text: 'A system of two equations in $x$ and $y$ is called a **mixed system** when one member is linear and the other is of higher degree. A pair $(s, t)$ solves the mixed system when it satisfies BOTH members — the census test of 6.1, unchanged. Thus, for $y = x - 1$ with $x^2 + y^2 = 25$, the pair $(4, 3)$ is a solution because $4 - 3 = 1$ and $4^2 + 3^2 = 25$ are both true sentences, while $(0, -1)$ passes the line ($0 - (-1) = 1$) but fails the circle ($0 + 1 = 1 \\neq 25$) — half the evidence, no solution.' },
        { kind: 'para', text: 'For example, the mixed systems this lesson will settle include every one of these shapes, and the list is worth reading twice before any machinery is built:' },
        { kind: 'list', marker: 'roman', items: [
          'the linear $y = x - 1$ with the circle $x^2 + y^2 = 25$ — two pairs, one in each sign country;',
          'the linear $x + y = 8$ with the product $xy = 15$ — two pairs, the Viète twins $(3, 5)$ and $(5, 3)$;',
          'the parabola $y = x^2$ with the line $y = 2x - 2$ — no pair at all: the reduced discriminant is $-4$, and the line misses the curve forever.',
        ] },
        { kind: 'heading', text: 'The Substitution Pipeline: Solve the Linear, Feed the Quadratic' },
        { kind: 'para', text: 'The pipeline is one discipline, never a menu of tricks. Take the LINEAR member — it alone isolates an unknown cleanly — solve it for one variable, and substitute the result INTO the quadratic. The quadratic welcomes the substitution: it is built from squares and products, so a linear expression for $y$ leaves it a quadratic in $x$ alone. That **reduced quadratic** is the whole system compressed into one unknown, and 9.3’s machinery — factor it, complete its square, or quote the formula — prices it completely. Every root of the reduced equation buys back exactly one pair through the linear member; that is the whole method, and the theorem below says it loses nothing.' },
        { kind: 'derivation', title: 'Theorem — substitution loses nothing', statement: 'For the mixed system with linear member $a x + b y = c$ ($b \\neq 0$) and quadratic member $q(x, y) = 0$: the solution pairs of the system are exactly the pairs $\\left(s, \\tfrac{c - a s}{b}\\right)$ where $s$ runs over the roots of the reduced equation $q\\left(x, \\tfrac{c - a x}{b}\\right) = 0$. When the reduced equation is genuinely quadratic, the system owns exactly as many pairs as it has real roots — two, one, or none.', steps: [
          { label: 'Isolate the linear member', formula: 'b \\neq 0 \\;\\Longrightarrow\\; y = \\tfrac{c - a x}{b}', explanation: 'Lawfully divide: since $b \\neq 0$, the linear member says $y = \\tfrac{c - a x}{b}$ — 5.2’s balance move, one unknown isolated. This is the only division of the whole pipeline.' },
          { label: 'The linear member speaks once', formula: 't = \\tfrac{c - a s}{b}', explanation: 'A pair $(s, t)$ satisfies the linear member exactly when $t = \\tfrac{c - a s}{b}$: the whole content of the linear member flows through this one formula — the substitution theorem of 6.2, re-read.' },
          { label: 'Substitute into the quadratic', formula: 'q\\!\\left(x, \\tfrac{c - a x}{b}\\right) = 0', explanation: 'Such a pair satisfies the quadratic member exactly when $q\\left(s, \\tfrac{c - a s}{b}\\right) = 0$ — a sentence about $s$ alone: the reduced equation.' },
          { label: 'The converse direction', explanation: 'Every root $s$ of the reduced equation manufactures the pair $\\left(s, \\tfrac{c - a s}{b}\\right)$, and both displayed sentences hold — so it solves the system. Nothing is lost and nothing invented: the correspondence is one-for-one.' },
          { label: 'The degree audit', explanation: 'Substituting a linear expression for $y$ into a degree-2 expression in $x$ and $y$ leaves degree at most 2 in $x$: the reduced equation is a quadratic (or, in degenerate dresses, a linear or constant sentence — priced honestly below).' },
          { label: 'Hence the census', explanation: 'Two real roots — two pairs; a double root — one pair, the tangent case; no real root — no pair at all. The verdict vocabulary is 9.3’s discriminant trichotomy, transferred from single equations to systems.' },
        ], result: 'the mixed system’s pairs are the reduced equation’s roots, one for one — at most two' },
        { kind: 'example', title: 'Settle y = x − 1 together with x² + y² = 25', steps: [
          'The linear member is already isolated — feed it straight into the quadratic.',
          'Substitute: $x^2 + (x - 1)^2 = 25$, and expand honestly: $x^2 + x^2 - 2x + 1 = 25$, so $2x^2 - 2x - 24 = 0$.',
          'Halve: $x^2 - x - 12 = 0$, which factors as $(x - 4)(x + 3) = 0$ — the roots $x = 4$ and $x = -3$.',
          'Back-substitute each root through the linear: $y = 4 - 1 = 3$ and $y = -3 - 1 = -4$ — the candidate pairs $(4, 3)$ and $(-3, -4)$.',
          'Check in BOTH originals: $16 + 9 = 25$ with $4 - 3 = 1$; $9 + 16 = 25$ with $-3 - (-4) = 1$ — four true sentences, two genuine pairs.',
          'Hence the system owns exactly two pairs — $(4, 3)$ and $(-3, -4)$ — one in each sign country.',
        ], },
        { kind: 'example', title: 'A rectangle has perimeter 14 and diagonal 5 — find its sides', steps: [
          'Name the sides $x$ and $y$. The border gives the linear member $2(x + y) = 14$; Pythagoras on the diagonal gives the quadratic member $x^2 + y^2 = 25$.',
          'Halve the linear: $x + y = 7$, so $y = 7 - x$ — the pipeline input.',
          'Substitute: $x^2 + (7 - x)^2 = 25$, so $2x^2 - 14x + 49 = 25$, that is $x^2 - 7x + 12 = 0$.',
          'Factor: $(x - 3)(x - 4) = 0$ — the roots $3$ and $4$; back-substitution gives the partner $4$ then $3$: the two orders of the same rectangle.',
          'Check: perimeter $2(3 + 4) = 14$ and diagonal-squared $9 + 16 = 25$ — both true, so the sides are 3 and 4. (Section 4 below does the same system in two lines with the symmetric shortcut.)',
        ], },
        { kind: 'callout', tone: 'warn', title: 'Caution — the direction of the pipeline, and the court of originals', text: 'Two reliable ways to waste a page. First, running the pipeline backwards — solving the QUADRATIC for $y$ and substituting into the linear — buries you in surds for no gain: the linear member is the one that isolates cleanly, so solve IT. Second, grading candidate pairs inside the reduced dress: the reduced equation only counts roots, and a root whose manufactured pair fails an original (a sign slip in the back-substitution, say) is a false pair. Every pair is checked in the system AS GIVEN — the habit of 6.2, with its full force here.' },
        { kind: 'para', text: 'One boundary case deserves honest words. If the linear member is horizontal — $y = k$ — and the quadratic is the product $xy = P$, the reduced equation is $k x = P$: linear, not quadratic, and the system owns exactly one pair, $\\left(\\tfrac{P}{k}, k\\right)$. Push further — $y = 0$ against $xy = 5$ — and the reduced sentence is $0 = 5$, false outright: no pair. And $y = 0$ against $xy = 0$ says $0 = 0$: every $x$ works, infinitely many pairs. The "at most two" census needs the reduced equation genuinely quadratic; the degenerate dresses are settled by inspection, exactly as 5.3’s gathered forms taught. The chapter verifier swept 19,656 mixed systems across three quadratic families — circles, parabolas, products — and every rational-rooted pair checked in both originals: the bijection held everywhere, with the degenerate roads catalogued, not discovered by accident.' },
        { kind: 'heading', text: 'The Three Verdicts: A Line Against A Parabola' },
        { kind: 'para', text: 'Geometry pays its debt to the pipeline. Dress the linear member as a line and read the quadratic member as its graph — here the parabola $y = x^2$ of 10.3. A meeting of the two graphs IS a solution pair: the same point satisfies both assertions at once. Substitute the line $y = mx + c$ into the parabola and the meeting question collapses to one quadratic:' },
        { kind: 'equation', latex: 'x^2 - m x - c = 0, \\qquad \\Delta = m^2 + 4 c \\tag{1}', note: 'the reduced equation of the line $y = mx + c$ against the parabola $y = x^2$ — every meeting is a root, every root a meeting' },
        { kind: 'para', text: 'The discriminant (1) is the whole verdict instrument. $\\Delta > 0$: two roots, two meetings — the line is a **secant**. $\\Delta = 0$: one double root, one meeting — the line is a **tangent**. $\\Delta < 0$: no real root, no meeting — the line is an **outsider**. Over the grid of slopes $m \\in [-4, 4]$ against intercepts $c \\in [-6, 6]$ the chapter verifier swept all 117 verdicts: 72 secants, 5 tangents, 40 outsiders — and the five tangent posts are exactly the pairs with $m^2 = -4c$, namely $(0, 0)$, $(\\pm 2, -1)$, $(\\pm 4, -4)$. Tangency is not a coincidence to be noticed; it is a post to be computed.' },
        { kind: 'figure', svg: threeVerdictsSvg(), caption: 'The c-slider family: three parallel lines of slope 2 against $y = x^2$. The secant $y = 2x + 3$ meets at $(-1, 1)$ and $(3, 9)$; the tangent $y = 2x - 1$ touches at $(1, 1)$; the outsider $y = 2x - 2$ misses forever — three verdicts, one discriminant.' },
        { kind: 'table', caption: 'The verdict table — the c-slider y = 2x + c against y = x², priced by the reduced discriminant', head: ['the line', 'the reduced equation', '$\\Delta$', 'the verdict', 'the meetings'], rows: [
          ['$y = 2x + 3$', '$x^2 - 2x - 3 = 0$', '16', 'secant — two', '$(-1, 1)$ and $(3, 9)$'],
          ['$y = 2x - 1$', '$x^2 - 2x + 1 = 0$', '0', 'tangent — one', '$(1, 1)$, a double root'],
          ['$y = 2x - 2$', '$x^2 - 2x + 2 = 0$', '-4', 'outsider — none', 'no real root, no meeting'],
        ] },
        { kind: 'example', title: 'Classify the three lines against y = x² without solving — then settle the secant', steps: [
          'All three carry slope $2$ — the c-slider family $y = 2x + c$. The reduced equation is $x^2 - 2x - c = 0$ with $\\Delta = 4 + 4c$.',
          'Now, $c = 3$ gives $\\Delta = 16 > 0$ — a secant, two meetings. $c = -1$ gives $\\Delta = 0$ — the tangent post, one meeting. $c = -2$ gives $\\Delta = -4 < 0$ — an outsider, none.',
          'Settle the secant: $x^2 - 2x - 3 = 0$ factors as $(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$; the parabola prices the partners $y = 9$ and $y = 1$.',
          'Check both meetings: $9 = 2(3) + 3$ and $9 = 3^2$; $1 = 2(-1) + 3$ and $1 = (-1)^2$ — every sentence true.',
          'Hence: the secant $y = 2x + 3$ meets the parabola at $(3, 9)$ and $(-1, 1)$; the tangent $y = 2x - 1$ touches at $(1, 1)$; the outsider never meets — and the slider sits at tangency exactly when $c = -1$.',
        ], },
        { kind: 'callout', tone: 'insight', title: 'Insight — the discriminant is a distance-to-tangency gauge', text: 'Fix the slope $m$ and slide the intercept $c$: $\\Delta = m^2 + 4c$ grows exactly as fast as $c$ does. The line rises, and the verdicts walk in order — outsider, tangent, secant — with the tangent post at $c = -m^2/4$. Nothing new was computed: 9.3’s discriminant trichotomy simply changed employers, from counting roots of one equation to counting meetings of two. That is the pattern of the whole chapter, and of the next section too: every instrument is an old instrument in new dress.' },
        { kind: 'heading', text: 'The Tangent Condition: A Line Against A Circle' },
        { kind: 'para', text: 'The circle $x^2 + y^2 = r^2$ is the second classic quadratic member. Substitute the line $y = mx + k$ and the geometry of 6.3 gains a curved citizen: the reduced equation is $(1 + m^2) x^2 + 2mkx + (k^2 - r^2) = 0$ — genuinely quadratic for every slope whatsoever, since $1 + m^2 \\geq 1 > 0$: no degenerate road exists against a circle. Its discriminant simplifies remarkably, and the simplification IS the law — the tangent condition $k^2 = (1 + m^2) r^2$, derived below.' },
        { kind: 'derivation', title: 'Theorem — the tangent condition', statement: 'The line $y = mx + k$ meets the circle $x^2 + y^2 = r^2$ ($r > 0$) exactly twice when $k^2 < (1 + m^2) r^2$, exactly once — tangentially — when $k^2 = (1 + m^2) r^2$, and never when $k^2 > (1 + m^2) r^2$. In the tangent case the contact point is the foot of the perpendicular from the centre to the line.', steps: [
          { label: 'Substitute the line into the circle', formula: 'x^2 + (mx + k)^2 = r^2 \\;\\Longrightarrow\\; (1 + m^2) x^2 + 2mkx + (k^2 - r^2) = 0', explanation: 'A genuine quadratic, since $1 + m^2 \\geq 1 > 0$ whatever the slope — no degenerate road exists against a circle.' },
          { label: 'Price the discriminant', formula: '\\tfrac{\\Delta}{4} = (1 + m^2) r^2 - k^2', explanation: 'The discriminant is $(2mk)^2 - 4(1 + m^2)(k^2 - r^2)$; divide by 4 and unfold — the $m^2 k^2$ and $k^2$ terms cancel exactly, leaving a comparison of two squares.' },
          { label: 'Read the three verdicts', explanation: '$k^2 < (1 + m^2) r^2$ — positive discriminant, two contacts, the line is a secant; equality — zero discriminant, one contact, a tangent; $k^2 > (1 + m^2) r^2$ — negative, an outsider.' },
          { label: 'Locate the tangent contact', formula: 'x = \\tfrac{-mk}{1 + m^2}, \\quad y = \\tfrac{k}{1 + m^2}', explanation: 'In the tangent case the double root is $x = \\tfrac{-mk}{1 + m^2}$, and back-substitution prices the partner $y = \\tfrac{k}{1 + m^2}$ — the foot of the perpendicular dropped from the centre to the line, since $m \\cdot \\tfrac{-mk}{1+m^2} + k = \\tfrac{k}{1+m^2}$ holds memberwise.' },
          { label: 'The foot is the nearest point', explanation: 'Every other point of the line completes a right triangle with that foot, so it lies strictly farther from the centre than the foot does — and Pythagoras prices the foot-distance at $\\tfrac{|k|}{\\sqrt{1 + m^2}}$.' },
          { label: 'The geometry corroborates', formula: '\\tfrac{k^2}{1 + m^2} = r^2 \\iff k^2 = (1 + m^2) r^2', explanation: 'Tangency is the borderline: nearest distance exactly $r$. Squaring, $\\tfrac{k^2}{1 + m^2} = r^2$ — which is the condition again. The algebra and the geometry agree, sentence by sentence.' },
        ], result: 'the tangent condition $k^2 = (1 + m^2) r^2$' },
        { kind: 'figure', svg: tangentStripSvg(), caption: 'The tangent strip: the parallel family $3x + 4y = c$ against the circle $x^2 + y^2 = 25$. The secant $c = 20$ cuts at $(0, 5)$ and $(24/5, 7/5)$; the tangent $c = 25$ touches at $(3, 4)$ — the 3-4-5 witness; the outsider $c = 30$ misses. In this dress the law reads $c^2$ against 625.' },
        { kind: 'example', title: 'The family 3x + 4y = c against x² + y² = 25 — read the verdicts, then settle the secant', steps: [
          'Dress the family: $y = -\\tfrac{3}{4} x + \\tfrac{c}{4}$ — one slope $m = -\\tfrac{3}{4}$, sliding intercept $k = \\tfrac{c}{4}$. The condition compares $k^2 = \\tfrac{c^2}{16}$ against $\\left(1 + \\tfrac{9}{16}\\right) \\cdot 25 = \\tfrac{625}{16}$: multiply through by 16 and the verdict reads $c^2$ against $625$.',
          'Now, $c = 20$: $400 < 625$ — a secant. $c = 25$: $625 = 625$ — the tangent post. $c = 30$: $900 > 625$ — an outsider. The whole family is priced without solving anything.',
          'Settle the secant $3x + 4y = 20$: substitute $y = \\tfrac{20 - 3x}{4}$ into the circle, so $16x^2 + (20 - 3x)^2 = 400$.',
          'Expand: $16x^2 + 400 - 120x + 9x^2 = 400$, so $25x^2 - 120x = 0$ — the constant cancels itself.',
          'Factor: $5x(5x - 24) = 0$, so $x = 0$ or $x = \\tfrac{24}{5}$; back-substitution prices the partners $5$ and $\\tfrac{7}{5}$ — the contacts $(0, 5)$ and $\\left(\\tfrac{24}{5}, \\tfrac{7}{5}\\right)$.',
          'Check both: $3(0) + 4(5) = 20$ with $0 + 25 = 25$; $3 \\cdot \\tfrac{24}{5} + 4 \\cdot \\tfrac{7}{5} = \\tfrac{72 + 28}{5} = 20$ with $\\tfrac{576 + 49}{25} = \\tfrac{625}{25} = 25$ — every sentence true.',
          'The tangent post itself: $3x + 4y = 25$ touches at $(3, 4)$ — the 3-4-5 witness, on the circle ($9 + 16 = 25$) and on the line ($3 \\cdot 3 + 4 \\cdot 4 = 25$) in the same breath.',
          'Hence the secant contacts are $(0, 5)$ and $\\left(\\tfrac{24}{5}, \\tfrac{7}{5}\\right)$, and the tangent post touches at $(3, 4)$.',
        ], },
        { kind: 'para', text: 'The family has a second tangent post: $c = -25$ touches at $(-3, -4)$, the mirror witness — $(-3)^2 + (-4)^2 = 25$ and $3(-3) + 4(-4) = -25$. The condition $c^2 = 625$ is indifferent to sign, and the circle enjoys its tangents on both sides. Any find-the-tangent question has this shape twice over: square the condition and read BOTH posts, or half the answer is silently missing.' },
        { kind: 'heading', text: 'The Symmetric Shortcut: Sums, Products and the Identity Bank' },
        { kind: 'para', text: 'Many mixed systems are **symmetric** — swap $x$ and $y$ and the system does not notice ($x + y = 7$ and $x^2 + y^2 = 25$ are both indifferent to the swap). For these, the pipeline is legal but wasteful. The classical art — Hall and Knight teach it as the ruling idea of their chapter — is to convert: stop treating $x$ and $y$ separately, and price the SUM $S = x + y$ and the PRODUCT $P = xy$ instead. The identity bank does the converting; Viète (9.4) does the finishing.' },
        { kind: 'table', caption: 'The identity bank — every conversion row verified over the integer window in the chapter verifier', head: ['the system hands', 'the identity prices', 'the recovery', 'a verified instance'], rows: [
          ['$x + y = S$ and $x^2 + y^2 = Q$', '$(x + y)^2 = x^2 + y^2 + 2xy$', '$xy = \\tfrac{S^2 - Q}{2}$', '$S = 7$, $Q = 25$ → $xy = 12$'],
          ['$x + y = S$ and $xy = P$', 'Viète (9.4)', '$t^2 - St + P = 0$', '$S = 8$, $P = 15$ → $t = 3, 5$'],
          ['$x - y = D$ and $xy = P$', '$x = t$, $y = t - D$', '$t^2 - Dt - P = 0$', '$D = 2$, $P = 15$ → $t = 5, -3$'],
          ['$x^2 + y^2 = Q$ and $xy = P$', '$(x + y)^2 = Q + 2P$', 'the ± road (below)', '$Q = 58$, $P = 21$ → four pairs'],
          ['$x + y = S$ and $x^2 - y^2 = E$', '$x^2 - y^2 = (x + y)(x - y)$', '$x - y = \\tfrac{E}{S}$', '$S = 12$, $E = 24$ → $(7, 5)$'],
        ] },
        { kind: 'equation', latex: 't^2 - (x + y)\\, t + xy = 0 \\tag{2}', note: 'the Viète landing: the two numbers are the roots of their own sum-and-product polynomial' },
        { kind: 'example', title: 'Settle x + y = 8, xy = 15 — both roads, one theorem', steps: [
          'The Viète road: the numbers are the roots of $t^2 - 8t + 15 = 0$, which factors as $(t - 3)(t - 5) = 0$ — the numbers are 3 and 5, and the pairs read $(3, 5)$ and $(5, 3)$.',
          'The substitution road: $y = 8 - x$ into $xy = 15$ gives $x(8 - x) = 15$, that is $x^2 - 8x + 15 = 0$ — the SAME reduced equation, dressed in $x$ instead of $t$.',
          'The two methods are one theorem: the pipeline’s reduced equation IS the Viète polynomial of the symmetric system.',
          'Check both pairs: $3 + 5 = 8$ with $3 \\cdot 5 = 15$; and with the coordinates swapped, the same sentences — hence the pairs $(3, 5)$ and $(5, 3)$, both orders genuine.',
        ], },
        { kind: 'example', title: 'The rectangle of the second Illustration, at symmetric speed', steps: [
          'The system was $x + y = 7$ with $x^2 + y^2 = 25$, after halving the perimeter.',
          'The recovery row: $xy = \\tfrac{7^2 - 25}{2} = \\tfrac{49 - 25}{2} = 12$ — the identity hands the product over.',
          'The Viète landing: $t^2 - 7t + 12 = 0$ factors as $(t - 3)(t - 4) = 0$ — the sides are 3 and 4.',
          'Check: $3 + 4 = 7$ and $9 + 16 = 25$ — perimeter 14, diagonal 5, exactly as promised. Two lines of work where the pipeline took five.',
        ], },
        { kind: 'para', text: 'When NEITHER member is linear, the identity bank manufactures one. Take $x^2 + y^2 = 58$ with $xy = 21$: $(x + y)^2 = 58 + 2 \\cdot 21 = 100$, so $x + y = 10$ or $x + y = -10$ — two linear roads now, each Viète-priced. The $+10$ road: $t^2 - 10t + 21 = (t - 3)(t - 7)$, the pairs $(3, 7)$ and $(7, 3)$. The $-10$ road: $t^2 + 10t + 21 = (t + 3)(t + 7)$, the pairs $(-3, -7)$ and $(-7, -3)$. All four check in both originals — $9 + 49 = 58$ with product 21, in either order and either sign. The ± census is honest work, not double-counting: the squaring genuinely lost the sign, and both recoveries are real.' },
        { kind: 'callout', tone: 'warn', title: 'Caution — squaring manufactures the mirror branch', text: 'The power that pays in the ± road is the power that betrays in this one. The system GIVES $x + y = 7$ together with $x^2 + y^2 = 25$. A student squares the given linear (to reach the identity), obtains $(x + y)^2 = 49$, and proceeds with BOTH branches. The $-7$ branch’s pairs, $(-3, -4)$ and $(-4, -3)$, pass the circle beautifully — $9 + 16 = 25$ — and even carry $xy = 12$. But they fail the ORIGINAL: their sum is $-7$, not $7$. They are **extraneous pairs**: manufactured by the squaring step, killed by the check. When a step is not reversible — squaring, clearing a denominator — every branch it spawns must be re-admitted through the original’s door. The court of originals, 6.2’s law, now guards systems.' },
        { kind: 'heading', text: 'The Discipline: The Court of Originals and the Examinations' },
        { kind: 'example', title: 'Grade the claimed answer: four pairs for x + y = 7, x² + y² = 25', steps: [
          'The claim cites the ± census: $(3, 4)$, $(4, 3)$, $(-3, -4)$, $(-4, -3)$ — "because $(x + y)^2 = 49$ gives $x + y = \\pm 7$."',
          'The flaw is upstream: the linear $x + y = 7$ was GIVEN. Squaring it manufactured a mirror branch the original never licensed.',
          'Grade the first two candidates: $3 + 4 = 7$ with $9 + 16 = 25$, and the same swapped — genuine.',
          'Grade the mirrors: $(-3) + (-4) = -7 \\neq 7$ — they fail the given linear outright; whatever else they pass, they are extraneous.',
          'The honest census: exactly two pairs — and the verifier’s windowed census over $[-12, 12]^2$ confirms that no fifth candidate hides anywhere.',
        ], },
        { kind: 'para', text: 'The word problems of this lesson wear two dresses. The garden: perimeter 34 metres, diagonal 13 metres — $x + y = 17$ with $x^2 + y^2 = 169$, so $xy = \\tfrac{289 - 169}{2} = 60$ and $t^2 - 17t + 60 = 0$ prices the sides at 5 and 12 metres. Khattar’s examination word problems lean on the same conversion — two numbers with a fixed sum and a fixed product, ages whose sum and product are both narrated, costs that multiply into a bill. The translation layer is 11.1’s five-station pipeline; the settlement layer is this lesson.' },
        { kind: 'para', text: 'One boundary, stated honestly. General PAIRS of quadratics — the homogeneous art (put $y = mx$ and solve for the ratio first), the artifices (spotting $(x + 2y)^2 + 3(x + 2y) - 40 = 0$ hiding inside a member) — belong to the harder classical theory that Hall and Knight’s chapter continues into, and to later books of this shelf. This lesson owns the mixed systems and the symmetric conversions — which is where the examinations live, and where every harder art returns for its final answers. When the two-quadratic world opens, it will re-use every instrument banked here: the identity bank, the Viète landing, the court of originals.' },
        { kind: 'callout', tone: 'historical', title: 'Historical note — the chapter that taught the art', text: 'Hall and Knight teach exactly this material as Chapter XXVI of Elementary Algebra for Schools (1885), under the heading Simultaneous Quadratic Equations: the substitution pipeline for one linear with one quadratic, and then the symmetric art — "our object is to solve the proposed equations symmetrically, by finding the values of x + y and xy," in their own words. The tangent art is far older: Apollonius of Perga (c. 200 BCE) devoted his Tangencies to lines just touching circles — the condition $k^2 = (1 + m^2) r^2$ is his theme in algebraic dress, two millennia before Descartes (1637 — 6.3’s wedding of algebra and geometry) made such translations routine.' },
        { kind: 'callout', tone: 'exam', title: 'Exam corner — the four shapes that recur', text: 'One: straight settlement — a mixed system by the pipeline or the symmetric road (Khattar QA; SSC and bank mains staples). Two: the find-c tangency — "for which c does $3x + 4y = c$ touch $x^2 + y^2 = 25$?" — answered by the condition alone, $c = \\pm 25$, no solving, seconds of work; the same shape against a parabola reads $\\Delta = 0$ instead. Three: the sum-and-product word problem — the rectangle from perimeter and diagonal, numbers from sum and product, the garden of this lesson at L5. Four: the verdict count — "how many times does the line meet the parabola?" — one discriminant, one answer, and the options price the classic misreads (the tangent claimed for a near-miss, the double root counted twice). In every shape the marks live in the discipline: substitute in the right direction, convert before you compute, and check every pair in the originals.' },
        { kind: 'terms', items: [
          { term: 'mixed system', def: 'a system of two equations in which one member is linear and the other is of higher degree' },
          { term: 'reduced equation', def: 'the single quadratic in one unknown produced by substituting the linear member into the quadratic; its roots are the first coordinates of the pairs' },
          { term: 'discriminant verdict', def: 'the pair-count of a mixed system read off the reduced equation discriminant: two, one, or none' },
          { term: 'secant', def: 'a line meeting a curve in two points — the positive-discriminant verdict' },
          { term: 'tangent line', def: 'a line meeting a curve in exactly one point — the zero-discriminant verdict, a double root' },
          { term: 'outsider', def: 'a line that never meets the curve — the negative-discriminant verdict' },
          { term: 'symmetric system', def: 'a system unchanged by swapping x and y; it converts into the sum and product of the unknowns' },
          { term: 'sum-and-product method', def: 'solving a symmetric system through the Viète landing t² − (x+y)t + xy = 0' },
          { term: 'extraneous pair', def: 'a candidate pair produced by a non-reversible step, such as squaring, that fails the original system when checked' },
        ] },
        { kind: 'formula', name: 'The substitution pipeline', latex: 'y = \\tfrac{c - a x}{b} \\;\\longrightarrow\\; q\\!\\left(x, \\tfrac{c - a x}{b}\\right) = 0', note: 'solve the LINEAR member, substitute INTO the quadratic — the reduced equation prices the whole system, root for pair' },
        { kind: 'formula', name: 'The product recovery', latex: 'xy = \\tfrac{(x + y)^2 - (x^2 + y^2)}{2}', note: 'the identity-bank row that turns a sum and a squares-sum into the product' },
        { kind: 'formula', name: 'The Viète landing', latex: 't^2 - (x + y)\\, t + xy = 0', note: 'the two numbers are the roots — the 9.4 machine transferred to systems' },
        { kind: 'formula', name: 'The parabola verdict', latex: '\\Delta = m^2 + 4 c', note: 'line y = mx + c against y = x² — the reduced equation x² − mx − c = 0 decides two, one, or none' },
        { kind: 'formula', name: 'The tangent condition', latex: 'k^2 = (1 + m^2)\\, r^2', note: 'line y = mx + k against circle x² + y² = r² — equality is tangency, and the contact is the perpendicular foot' },
        { kind: 'quiz', title: 'Check yourself', items: [
          { q: 'The system $x + y = 5$, $xy = 6$ has how many solution pairs?', options: ['one: $(2, 3)$ only', 'two: $(2, 3)$ and $(3, 2)$', 'four: $(\\pm 2, \\pm 3)$ in all sign combinations', 'none — a sum and a product cannot both be fixed'], answer: 1, explain: 'Viète prices it: $t^2 - 5t + 6 = (t - 2)(t - 3)$, so the numbers are 2 and 3 — and BOTH orders solve, since the equations only see the sum and the product. Option 0 forgets the mirror pair; option 2 over-generates sign branches (the pair $(-2, -3)$ has sum $-5$, not 5 — the extraneous trap of Section 4); option 3 denies a theorem that just ran.' },
          { q: 'How many times does the line $y = 2x - 2$ meet the parabola $y = x^2$?', options: ['two times', 'one time — it is tangent', 'never', 'infinitely many times'], answer: 2, explain: 'The reduced equation is $x^2 - 2x + 2 = 0$ with $\\Delta = 4 - 8 = -4 < 0$: no real root, no meeting — the outsider verdict. Option 1 is the classic near-miss read: the tangent post of this slider is $c = -1$ ($\\Delta = 0$ at $y = 2x - 1$), one unit above; option 0 counts roots that do not exist; a line and a parabola can never share more than two points, so option 3 is impossible by the bijection.' },
          { q: 'For which $c$ does the line $3x + 4y = c$ touch the circle $x^2 + y^2 = 25$ exactly once?', options: ['20', '25', '30', '15'], answer: 1, explain: 'The dress is $y = -\\tfrac{3}{4}x + \\tfrac{c}{4}$, so the condition compares $\\tfrac{c^2}{16}$ with $\\tfrac{625}{16}$: tangency needs $c^2 = 625$, and $25^2 = 625$ exactly. Option 0 is the secant ($400 < 625$ — it cuts at $(0, 5)$ and $(24/5, 7/5)$); option 2 the outsider ($900 > 625$); option 4 another secant ($225 < 625$).' },
          { q: 'Given $x + y = 7$ and $x^2 + y^2 = 25$, the product $xy$ is', options: ['12', '-12', '24', '49'], answer: 0, explain: 'The recovery row: $xy = \\tfrac{(x+y)^2 - (x^2 + y^2)}{2} = \\tfrac{49 - 25}{2} = 12$. Option 2 is the un-halved $2xy = 24$ — the most common slip on this row; option 1 is a sign error; option 4 quotes the sum’s square, not the product.' },
          { q: 'Squaring the equation $x + y = 7$ during a solution produces the branch $x + y = -7$. What must happen to the pairs it produces?', options: ['keep them — squaring made them legitimate', 'discard them — they fail the original $x + y = 7$ when checked', 'keep only their first coordinates', 'average them with the $+7$ pairs'], answer: 1, explain: 'The mirror branch’s pairs (for instance $(-3, -4)$) can pass every OTHER sentence in sight — the circle, even the product — but their sum is $-7$, and the original linear says $7$. Squaring is not reversible: branches it spawns must re-enter through the original’s door or be discarded. Options 0, 2 and 3 all launder an extraneous pair into the answer, which is exactly how full-mark solutions lose half their marks.' },
        ] },
        { kind: 'exercises', title: 'Exercises 6.4', sets: [
          { level: 'L1', questions: [
            { q: 'Settle the system $y = x - 1$, $x^2 + y^2 = 25$ — every pair, checked.', solution: [
              'The linear member is isolated already: substitute $y = x - 1$ into the circle.',
              'So $x^2 + (x - 1)^2 = 25$, that is $2x^2 - 2x - 24 = 0$; halve to $x^2 - x - 12 = 0$.',
              'Factor: $(x - 4)(x + 3) = 0$, so $x = 4$ or $x = -3$.',
              'Back-substitute: $y = 3$ and $y = -4$ — the candidates $(4, 3)$ and $(-3, -4)$.',
              'Check in the originals: $16 + 9 = 25$ with $4 - 3 = 1$; $9 + 16 = 25$ with $-3 - (-4) = 1$ — both pairs genuine.',
            ], answer: '$(4, 3)$ and $(-3, -4)$' },
            { q: 'Settle $x + y = 8$, $xy = 15$ by the Viète road, then by substitution — and say what you notice.', solution: [
              'Viète: the numbers are the roots of $t^2 - 8t + 15 = 0 = (t - 3)(t - 5)$, so the pairs are $(3, 5)$ and $(5, 3)$.',
              'Substitution: $y = 8 - x$ gives $x(8 - x) = 15$, that is $x^2 - 8x + 15 = 0$ — the same reduced equation, letter for letter.',
              'What you notice: the two roads are one theorem — the pipeline’s reduced equation IS the Viète polynomial of the symmetric system.',
              'Check: $3 + 5 = 8$ with $3 \\cdot 5 = 15$; the swapped pair passes the same sentences.',
            ], answer: '$(3, 5)$ and $(5, 3)$ — the two methods share one reduced equation' },
            { q: 'How many times does the line $y = 2x + 3$ meet the parabola $y = x^2$? Find every meeting.', solution: [
              'Substitute: $x^2 = 2x + 3$, so $x^2 - 2x - 3 = 0$ with $\\Delta = 4 + 12 = 16 > 0$ — two meetings.',
              'Factor: $(x - 3)(x + 1) = 0$, so $x = 3$ or $x = -1$; the parabola prices $y = 9$ and $y = 1$.',
              'The meetings: $(3, 9)$ and $(-1, 1)$.',
              'Check: $9 = 2(3) + 3$ and $1 = 2(-1) + 3$ — both on the line, both on the curve.',
            ], answer: 'twice — at $(3, 9)$ and $(-1, 1)$' },
          ] },
          { level: 'L2', questions: [
            { q: 'Settle $x - y = 2$, $xy = 15$.', solution: [
              'Write $x = t$, so $y = t - 2$; the product reads $t(t - 2) = 15$.',
              'So $t^2 - 2t - 15 = 0$, which factors as $(t - 5)(t + 3) = 0$ — the roots $5$ and $-3$.',
              'The pairs: $(5, 3)$ and $(-3, -5)$.',
              'Check: $5 - 3 = 2$ with $5 \\cdot 3 = 15$; $-3 - (-5) = 2$ with $(-3)(-5) = 15$ — both genuine.',
            ], answer: '$(5, 3)$ and $(-3, -5)$' },
            { q: 'Settle $x + y = 7$, $x^2 + y^2 = 25$ by the symmetric conversion.', solution: [
              'The recovery row: $xy = \\tfrac{(x+y)^2 - (x^2 + y^2)}{2} = \\tfrac{49 - 25}{2} = 12$.',
              'The Viète landing: $t^2 - 7t + 12 = 0 = (t - 3)(t - 4)$.',
              'The pairs: $(3, 4)$ and $(4, 3)$.',
              'Check: $9 + 16 = 25$ with sum $7$, in both orders — genuine.',
            ], answer: '$(3, 4)$ and $(4, 3)$' },
            { q: 'A rectangle is fenced with 14 metres of border and its diagonal measures 5 metres. Find its sides.', solution: [
              'Name the sides $x, y$: the border gives $2(x + y) = 14$; the diagonal gives $x^2 + y^2 = 25$.',
              'Halve the linear: $x + y = 7$; the recovery prices $xy = \\tfrac{49 - 25}{2} = 12$.',
              'Viète: $t^2 - 7t + 12 = (t - 3)(t - 4)$ — the sides are 3 and 4.',
              'Check: $2(3 + 4) = 14$ and $3^2 + 4^2 = 25 = 5^2$ — the fence and the diagonal both agree.',
            ], answer: 'the sides are 3 m and 4 m' },
          ] },
          { level: 'L3', questions: [
            { q: 'Settle $x^2 + y^2 = 58$, $xy = 21$ — the full ± census.', solution: [
              'Neither member is linear, so manufacture one: $(x + y)^2 = 58 + 2 \\cdot 21 = 100$, so $x + y = 10$ or $x + y = -10$.',
              'The $+10$ road: $t^2 - 10t + 21 = (t - 3)(t - 7)$ — the pairs $(3, 7)$ and $(7, 3)$.',
              'The $-10$ road: $t^2 + 10t + 21 = (t + 3)(t + 7)$ — the pairs $(-3, -7)$ and $(-7, -3)$.',
              'Check all four: $9 + 49 = 58$ with product 21, in either order and either sign — all genuine.',
              'Hence four pairs — the sign of the sum was honestly lost by the squaring, and both recoveries are real.',
            ], answer: '$(3, 7)$, $(7, 3)$, $(-3, -7)$, $(-7, -3)$ — four genuine pairs' },
            { q: 'Settle $3x + 4y = 20$, $x^2 + y^2 = 25$ — every contact, in exact fractions.', solution: [
              'The pipeline: $y = \\tfrac{20 - 3x}{4}$ into the circle, so $16x^2 + (20 - 3x)^2 = 400$.',
              'Expand: $16x^2 + 400 - 120x + 9x^2 = 400$, so $25x^2 - 120x = 0$ — the constant cancels.',
              'Factor: $5x(5x - 24) = 0$, so $x = 0$ or $x = \\tfrac{24}{5}$; back-substitute to $y = 5$ and $y = \\tfrac{7}{5}$.',
              'Check: $3(0) + 4(5) = 20$ with $0 + 25 = 25$; $3 \\cdot \\tfrac{24}{5} + 4 \\cdot \\tfrac{7}{5} = \\tfrac{72 + 28}{5} = 20$ with $\\tfrac{576 + 49}{25} = 25$ — both contacts genuine.',
            ], answer: '$(0, 5)$ and $\\left(\\tfrac{24}{5}, \\tfrac{7}{5}\\right)$' },
            { q: 'For which values of $c$ does the line $3x + 4y = c$ touch the circle $x^2 + y^2 = 25$ exactly once? Where does each touch land?', solution: [
              'Dress the family: $y = -\\tfrac{3}{4}x + \\tfrac{c}{4}$ — the condition compares $\\tfrac{c^2}{16}$ against $\\left(1 + \\tfrac{9}{16}\\right) \\cdot 25 = \\tfrac{625}{16}$.',
              'Tangency needs equality: $c^2 = 625$, so $c = 25$ or $c = -25$ — the two tangent posts of the family.',
              'At $c = 25$ the contact is $(3, 4)$: on the circle ($9 + 16 = 25$) and on the line ($3 \\cdot 3 + 4 \\cdot 4 = 25$).',
              'At $c = -25$ the mirror contact is $(-3, -4)$: $(-3)^2 + (-4)^2 = 25$ and $3(-3) + 4(-4) = -25$ — both sentences true.',
              'Every other $c$ is a secant ($c^2 < 625$) or an outsider ($c^2 > 625$) — the family is completely priced.',
            ], answer: '$c = 25$ touching at $(3, 4)$, and $c = -25$ touching at $(-3, -4)$' },
          ] },
          { level: 'L4', questions: [
            { q: 'A student reports four pairs for the system $x + y = 7$, $x^2 + y^2 = 25$: $(3, 4)$, $(4, 3)$, $(-3, -4)$, $(-4, -3)$, "because $(x + y)^2 = 49$ gives $x + y = \\pm 7$." Grade the answer.', solution: [
              'The derivation flaw: the linear $x + y = 7$ was GIVEN — squaring it manufactured the mirror branch $x + y = -7$ that the original never licensed.',
              'Grade the first two: $3 + 4 = 7$ and $9 + 16 = 25$ — genuine.',
              'Grade the mirrors: $(-3) + (-4) = -7 \\neq 7$ — they fail the given linear outright; whatever else they pass, they are extraneous.',
              'The honest census: exactly two pairs — the windowed census over $[-12, 12]^2$ confirms no fifth candidate exists.',
              'Verdict: half right, and the wrong half is the half that costs marks — the check in the originals is the grading itself.',
            ], answer: 'two genuine pairs; $(-3, -4)$ and $(-4, -3)$ are extraneous — the squared branch contradicts the given linear' },
            { q: 'The line $y = 2x + c$ is to touch the parabola $y = x^2$ exactly once. Find $c$ and the contact point.', solution: [
              'Substitute: $x^2 - 2x - c = 0$ with $\\Delta = 4 + 4c$; tangency needs $\\Delta = 0$, so $c = -1$.',
              'The double root: $x^2 - 2x + 1 = (x - 1)^2$, so $x = 1$ — one root, one meeting.',
              'The contact: $y = 1^2 = 1$ (or $y = 2(1) - 1$ — both dresses agree).',
              'Check: $1 = 2(1) - 1$ and $1 = 1^2$ — the tangent post of the slider is the point $(1, 1)$; slide $c$ above $-1$ and the line cuts twice, below and it never returns.',
            ], answer: '$c = -1$, touching at $(1, 1)$' },
          ] },
          { level: 'L5', questions: [
            { q: 'A rectangular garden is fenced with 34 metres of border; its diagonal path measures 13 metres. Find the side lengths.', solution: [
              'Name the sides $x, y$: $2(x + y) = 34$ and $x^2 + y^2 = 169$ — halve the linear to $x + y = 17$.',
              'The recovery: $xy = \\tfrac{17^2 - 169}{2} = \\tfrac{289 - 169}{2} = 60$.',
              'Viète: $t^2 - 17t + 60 = (t - 5)(t - 12)$ — the sides are 5 and 12 metres.',
              'Check: $2(5 + 12) = 34$ and $25 + 144 = 169 = 13^2$ — border and diagonal both agree.',
            ], answer: 'the sides are 5 m and 12 m' },
            { q: 'Two numbers have squares-sum 50 and product 7. Find every such pair.', solution: [
              'Manufacture the linear: $(x + y)^2 = 50 + 14 = 64$, so $x + y = 8$ or $x + y = -8$.',
              'The $+8$ road: $t^2 - 8t + 7 = (t - 1)(t - 7)$ — the pairs $(1, 7)$ and $(7, 1)$.',
              'The $-8$ road: $t^2 + 8t + 7 = (t + 1)(t + 7)$ — the pairs $(-1, -7)$ and $(-7, -1)$.',
              'Check all four: $1 + 49 = 50$ with product 7; and the negatives carry the same squares and the same product — all four genuine.',
              'Hence four pairs — both signs of the sum are real, exactly as the ± census promises.',
            ], answer: '$(1, 7)$, $(7, 1)$, $(-1, -7)$, $(-7, -1)$' },
          ] },
          { level: 'L6', questions: [
            { q: 'Prove the tangent condition: the line $y = mx + k$ meets the circle $x^2 + y^2 = r^2$ exactly once if and only if $k^2 = (1 + m^2) r^2$; and show that the contact is the foot of the perpendicular from the centre.', solution: [
              'Substitute the line into the circle: $x^2 + (mx + k)^2 = r^2$ gathers to $(1 + m^2) x^2 + 2mkx + (k^2 - r^2) = 0$ — genuinely quadratic, since $1 + m^2 \\geq 1 > 0$.',
              'The discriminant: $(2mk)^2 - 4(1 + m^2)(k^2 - r^2) = 4\\left[(1 + m^2) r^2 - k^2\\right]$ — the $m^2 k^2$ and $k^2$ terms cancel exactly, leaving a difference of two squares.',
              'Exactly one meeting means exactly one root: the discriminant vanishes, which is $k^2 = (1 + m^2) r^2$. Conversely, that equality forces the double root — the two directions of the iff are the two signs of one number.',
              'The double root is $x = \\tfrac{-mk}{1 + m^2}$, and back-substitution gives $y = \\tfrac{k}{1 + m^2}$ — a pair that lies on the line memberwise.',
              'That pair is the foot of the perpendicular from the centre: every other point of the line completes a right triangle with the foot, hence lies strictly farther from the centre.',
              'Pythagoras prices the foot-distance at $\\tfrac{|k|}{\\sqrt{1 + m^2}}$; in the tangent case it equals $r$ — the nearest distance is exactly the radius, the borderline where meeting turns to touching.',
            ], answer: 'tangency $\\iff k^2 = (1 + m^2) r^2$, the contact $\\left(\\tfrac{-mk}{1 + m^2}, \\tfrac{k}{1 + m^2}\\right)$ being the perpendicular foot' },
          ] },
        ] },
      ],
    },
  ],
  // 6.4 shipped at run 96 — the 2026-11-11 audit gap is closed, the
  // chapter re-completes at 4 lessons; ch. 12 (ratio-proportion-variation)
  // is the next AL unit per the audit's queue.
  plannedLessons: [],
}
